#!/usr/bin/env python3
"""add_filing.py — 把 SEC 招股书(S-1 等)整份收成站内双语全文。

和 add_article 的区别:招股书是法律/财务文本,**英文原文一字不改**(add_paper 的 TR_SYS 会"清理重构"英文,
这里不能用),只逐段补中文;表格段保留换行和 ` · ` 分隔,数字原样照抄,并逐段核对数字没被改。
解析见 filing_parse.py。翻译结果按批缓存到 data/.filing_cache/<id>.json,中断后重跑会接着翻。

用法:
  python3 pipeline/add_filing.py --htm ~/Downloads/anthropic-s1/anthropic_S-1_2026-10-26.htm \
    --id anthropic-s1-2026 --pid anthropic --org Anthropic --date 2026-10-26 \
    --title "Anthropic, PBC — Form S-1 Registration Statement (IPO Prospectus)" \
    --url https://www.sec.gov/Archives/edgar/data/2130357/000162828026067168/anthropicpbc-sx1.htm \
    --label "SEC Form S-1" --fields nlp
需 DEEPSEEK_API_KEY(播客站 .env)。DeepSeek 同一 key 别同时跑两个进程。
"""
import argparse, hashlib, json, re, sys, threading, time
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from add_paper import call, load_papers, ROOT, HTML  # noqa: E402
from add_article import ABS_SYS  # noqa: E402
from filing_parse import parse  # noqa: E402
from zh_space import space_obj  # noqa: E402

GLOSS = """Class A/N/T/E/F common stock → A/N/T/E/F 类普通股
prospectus → 招股说明书;registration statement → 注册声明;underwriters → 承销商;selling stockholders → 出售股东
Long-Term Benefit Trust (LTBT) → 长期利益信托(LTBT);Trustees → 受托人;Founder LLC → 创始人有限责任公司
public benefit corporation (PBC) → 公益公司(PBC);Company Purpose → 公司宗旨
CSP (cloud service provider) → 云服务商(CSP);compute → 算力;compute multipliers → 算力乘数
Net Revenue Retention → 净收入留存率;TTM → 过去十二个月(TTM);RSU → 限制性股票单位(RSU);SAFE → 未来股权简单协议(SAFE)
convertible promissory notes → 可转换本票;redeemable convertible preferred stock → 可赎回可转换优先股
stock-based compensation → 股权激励费用;Adjusted Operating Income → 调整后经营利润;non-GAAP → 非 GAAP
Virtual Collaborators → 虚拟协作者;frontier AI → 前沿 AI;Powerful AI → 强大 AI;closing the loop → 闭环
lock-up → 锁定期;controlled company → 受控公司;forward-looking statements → 前瞻性陈述
Claude、Claude Code、Claude Cowork、Opus、AWS、Trainium、TPU 等产品/公司名保留英文"""

SYS = f"""你是资深证券法律与财务翻译,正在把美国 SEC 招股说明书(S-1)逐段译成简体中文。
输入是 JSON 数组,每个元素是一段英文原文。输出与输入**等长、一一对应**的中文数组。
规则:
1. 准确、正式、通顺,用中国证券文件惯用表述;不增删、不总结、不解释。
2. **数字、金额、百分比、日期、股数一律原样照抄**(保留 $ 符号、千分位逗号、括号负数,如 $(1,531)、16,286、50.1%),绝不换算成"亿/万"。
3. `[__]` 是招股书里尚未填写的空白,原样保留。
4. 保留 Markdown 前缀:行首 `#### `、`- `、`**…**` 原样保留在译文对应位置。
5. 表格段(含换行和 ` · ` 分隔):逐行翻译,**行数和每行的 ` · ` 格数与原文完全一致**,只翻译文字格,数字格照抄。
6. 术语表:
{GLOSS}
只输出 JSON:{{"zh":["译文1","译文2",...]}}"""

NUM = re.compile(r"\d[\d,]*(?:\.\d+)?")


def nums(t):
    return Counter(n.replace(",", "") for n in NUM.findall(t))


def nums_ok(e, z):
    """英文里的每个数字都要在译文里出现(译文可以多:September 30 → 9 月 30 日 会多出 9)。
    表格段还要求行数与每行的 ` · ` 格数一致,否则前端按表格渲染时列会错位。"""
    if nums(e) - nums(z):
        return False
    if '\n' in e or ' · ' in e:
        el, zl = e.split('\n'), z.split('\n')
        if len(el) != len(zl) or any(a.count(' · ') != b.count(' · ') for a, b in zip(el, zl)):
            return False
    return True


def chunks_of(paras, budget=3200, maxn=12):
    out, cur, n = [], [], 0
    for i, p in enumerate(paras):
        if cur and (n + len(p) > budget or len(cur) >= maxn):
            out.append(cur)
            cur, n = [], 0
        cur.append(i)
        n += len(p)
    if cur:
        out.append(cur)
    return out


class Cache:
    def __init__(self, path):
        self.path, self.lock = path, threading.Lock()
        self.d = json.loads(path.read_text()) if path.exists() else {}
        self.dirty = 0

    def get(self, k):
        return self.d.get(k)

    def put(self, k, v):
        with self.lock:
            self.d[k] = v
            self.dirty += 1
            if self.dirty >= 10:
                self.flush()

    def flush(self):
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(self.d, ensure_ascii=False))
        tmp.replace(self.path)
        self.dirty = 0


def key(texts):
    return hashlib.sha1(json.dumps(texts, ensure_ascii=False).encode()).hexdigest()


def tr_batch(texts):
    r = call(SYS, json.dumps(texts, ensure_ascii=False), mx=8000)
    zh = r.get("zh", [])
    return zh if len(zh) == len(texts) else None


def translate(texts, cache):
    """一批:整批译 → 长度不符或数字对不上的段落单段重译;返回 (zh 列表, 数字不符的段号)。"""
    k = key(texts)
    hit = cache.get(k)
    if hit:
        return hit["zh"], hit["bad"]
    zh = None
    for _ in range(2):
        try:
            zh = tr_batch(texts)
        except Exception:
            zh = None
        if zh:
            break
    zh = zh or [""] * len(texts)
    bad = []
    for i, (e, z) in enumerate(zip(texts, zh)):
        if z.strip() and nums_ok(e, z):
            continue
        fixed = None
        for _ in range(2):
            try:
                one = tr_batch([e])
                if one and one[0].strip():
                    fixed = one[0]
                    if nums_ok(e, fixed):
                        break
            except Exception:
                pass
        if fixed:
            zh[i] = fixed
        if not zh[i].strip() or not nums_ok(e, zh[i]):
            bad.append(i)
    cache.put(k, {"zh": zh, "bad": bad})
    return zh, bad


INS = """你是证券分析编辑。读招股说明书的摘要与关键财务信息,提炼两组要点,输出 JSON:
{"contrib":[{"en":"...","zh":"..."}],"limits":[{"en":"...","zh":"..."}]}
- contrib(核心看点):业务、增长、财务与治理上最重要的事实,5-6 条,带原文数字。
- limits(主要风险):招股书披露的最重要风险与投资者需要注意的结构性限制,4-5 条。
每条 en≤25 词 + 地道中文 zh,只依据原文、不杜撰、数字照抄。只输出 JSON。"""

META = """你是财经编辑。输入招股说明书的英文标题与英文摘要,产出 JSON:
{"tZh":"中文标题","sEn":"一句话英文核心要点","sZh":"一句话中文核心要点","absZh":"摘要的地道中文翻译(数字照抄)"}。只输出 JSON。"""


def main():
    ap = argparse.ArgumentParser()
    for a in ("htm", "id", "pid", "org", "date", "title", "url", "label", "fields"):
        ap.add_argument("--" + a, required=a not in ("org", "label"))
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--only-parse", action="store_true")
    ap.add_argument("--final", action="store_true", help="424B4 终稿:没有未填空白,横向空隙不标 [__]")
    a = ap.parse_args()

    secs = parse(open(Path(a.htm).expanduser(), encoding="utf-8", errors="ignore").read(), blanks=not a.final)
    np_ = sum(len(s["paras"]) for s in secs)
    print(f"[1/4] 解析:{len(secs)} 节 / {np_} 段 / {sum(len(p) for s in secs for p in s['paras']) // 1000}k 字符", file=sys.stderr)
    if a.only_parse:
        return

    cache_dir = ROOT / "data" / ".filing_cache"
    cache_dir.mkdir(exist_ok=True)
    cache = Cache(cache_dir / f"{a.id}.json")
    jobs = []  # (节号, [段号], [文本])
    for si, s in enumerate(secs):
        for idxs in chunks_of(s["paras"]):
            jobs.append((si, idxs, [s["paras"][i] for i in idxs]))
    todo = sum(1 for j in jobs if not cache.get(key(j[2])))
    print(f"[2/4] 翻译:{len(jobs)} 批(缓存命中 {len(jobs) - todo},待译 {todo}),{a.workers} 线程", file=sys.stderr)
    zh_of = [[""] * len(s["paras"]) for s in secs]
    bad_all = []
    t0, done = time.time(), 0
    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        futs = {ex.submit(translate, j[2], cache): j for j in jobs}
        for f in as_completed(futs):
            si, idxs, texts = futs[f]
            zh, bad = f.result()
            for k, i in enumerate(idxs):
                zh_of[si][i] = zh[k]
            bad_all += [(secs[si]["sec"], texts[b][:80]) for b in bad]
            done += 1
            if done % 20 == 0 or done == len(jobs):
                el = time.time() - t0
                print(f"   {done}/{len(jobs)} 批  {el / 60:.1f} 分钟  数字不符/空 {len(bad_all)} 段", file=sys.stderr, flush=True)
    cache.flush()

    # 节标题:一次性批量译
    heads = [s["sec"] for s in secs]
    hz = []
    for i in range(0, len(heads), 60):
        part = heads[i:i + 60]
        r = tr_batch(part) or part
        hz += r
    full = [{"sec": s["sec"], "secZh": hz[i] or s["sec"],
             "paras": [{"en": e, "zh": z} for e, z in zip(s["paras"], zh_of[i])]}
            for i, s in enumerate(secs)]

    print("[3/4] 摘要/看点/元信息", file=sys.stderr)
    # 摘要/看点取「Prospectus Summary」起的 16 节(终稿前面常是术语表/创始人信,拿它们做摘要会跑偏);没有就取开头 12 节
    k = next((i for i, s in enumerate(secs) if re.search(r"prospectus summary|^summary$", s["sec"], re.I)), None)
    first = " ".join(p for s in (secs[k:k + 16] if k is not None else secs[:12]) for p in s["paras"])
    absEn = (call(ABS_SYS, a.title + "\n" + first[:14000], mx=1200).get("absEn") or "").strip()
    ins = call(INS, a.title + "\n" + absEn + "\n" + first[:50000], mx=6000)
    m = call(META, f"标题: {a.title}\n摘要: {absEn}")
    paper = {"id": a.id, "pid": a.pid, "date": a.date, "venue": a.label or "SEC Filing", "org": a.org or "",
             "fields": [x.strip() for x in a.fields.split(",") if x.strip()],
             "tEn": a.title, "tZh": m.get("tZh", a.title), "sEn": m.get("sEn", ""), "sZh": m.get("sZh", ""),
             "absEn": absEn, "absZh": m.get("absZh", ""), "insights": ins,
             "srcUrl": a.url, "srcLabel": a.label or "SEC", "addedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())}
    space_obj(paper)
    space_obj(full)
    print(f"[4/4] 写 data/{a.id}.json + PAPERS", file=sys.stderr)
    json.dump({**paper, "authors": [a.org] if a.org else [], "full": full},
              open(ROOT / "data" / f"{a.id}.json", "w"), ensure_ascii=False)
    h = HTML.read_text(encoding="utf-8")
    papers, ai, bi = load_papers(h)
    papers = [p for p in papers if p.get("id") != a.id] + [paper]
    papers.sort(key=lambda p: p.get("date", ""), reverse=True)
    h = h[:ai] + "const PAPERS = " + json.dumps(papers, ensure_ascii=False) + ";\n/* PAPERS_END */" + h[bi + len("/* PAPERS_END */"):]
    HTML.write_text(h, encoding="utf-8")
    import subprocess
    subprocess.run([sys.executable, str(ROOT / "pipeline" / "slim_index.py")], check=False)
    zc = sum(1 for s in full for p in s["paras"] if p["zh"].strip()) / max(1, np_)
    print(f"完成:{a.id} | 中文覆盖 {zc:.1%} | 数字不符/空 {len(bad_all)} 段", file=sys.stderr)
    for sec, t in bad_all[:30]:
        print(f"   ⚠ [{sec[:30]}] {t}", file=sys.stderr)


if __name__ == "__main__":
    main()
