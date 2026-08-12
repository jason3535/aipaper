#!/usr/bin/env python3
"""add_article.py — 把 Anthropic/OpenAI 等机构官网的研究文章做成站内双语全文。

现有 add_paper.py 只支持 arXiv/ar5iv;本脚本用 Jina Reader(r.jina.ai)把任意文章页
渲染成干净 markdown → 解析分节/段落 → 复用 add_paper 的 DeepSeek 逐段翻译 + 贡献/局限。
写 data/<id>.json(含 srcUrl/srcLabel,无 arxiv/cites) + 插入 index.html 的 PAPERS[]。

用法:
  python add_article.py --url https://openai.com/index/deliberative-alignment/ \
    --pid openai --org OpenAI --label "OpenAI Research" --fields safety [--slug deliberative-alignment] [--title "..."]
注意:--pid 必须已在 PEOPLE 中(openai/anthropic/deepseek 等机构号已存在)。需 DEEPSEEK_API_KEY。
"""
import argparse, json, re, sys, gzip, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from add_paper import call, translate_section, INS_SYS, meta_zh, load_papers, ROOT, HTML, OPX
from zh_space import space_obj

def fetch_md(url):
    req = urllib.request.Request("https://r.jina.ai/" + url,
                                 headers={"User-Agent": "Mozilla/5.0", "X-Return-Format": "markdown"})
    r = OPX.open(req, timeout=120); raw = r.read()
    if r.headers.get("Content-Encoding") == "gzip": raw = gzip.decompress(raw)
    return raw.decode("utf-8", "ignore")

# 已知坑:deepmind.google 的页面开头会带产品导航菜单(Genie/Gemini/Gemma 连写的短语段),
# Jina 抓下来像正文。收录 DeepMind 后务必人工检查 full[0] 是否导航垃圾,是则整节删除并重建 absEn/absZh。
STOP = re.compile(r"^#{1,4}\s+(related|footnotes?|references|acknowledg|read the|share|citation|appendix|more news|sign up|subscribe|policy memo|authors?|contributors?|further reading|explore more|стать)", re.I)

"""Substack/Newsletter 站的页面骨架(订阅框、站标图、页脚版权)会被 Jina 当正文抓下来,
   而且往往正好落在第一节 —— 于是 absEn(取首节前 3 段)变成"Discover more from…/
   By subscribing you agree…",线上出现过 4 篇这样的假摘要。这里在翻译前先剥掉。"""
CHROME_SEC = re.compile(
    r"^\s*!?\[?Image\b|substackcdn\.com|substack-post-media|^\s*Ready for more\?\s*$|"
    r"^\s*Discover more from\b|\(https?://",   # 标题里带 URL 的一律是站标/订阅框(正文小标题不会这样)
    re.I)
CHROME_PARA = re.compile(
    r"^\s*(Discover more from\b|By subscribing,? you agree\b|Thanks for reading\b|Share this post\b|"
    r"Subscribe\s*$|Continue reading\b|©\s*\d{4}[^\n]{0,80}(Privacy|Terms|Substack)|"
    r"This site requires JavaScript|Type your email|Already have an account\?)", re.I)

def _ptext(p):
    """paras 在翻译前是纯字符串、翻译后是 {en,zh} dict —— strip_chrome 两个阶段都会被调,
    必须兼容两种形态(2026-08-09 教训:只按 dict 写,主流程翻译前调用直接 AttributeError,
    而当时的回归验证拿的是翻译后的数据,形态不对等于没验)。"""
    return p if isinstance(p, str) else (p.get("en") or "")

def strip_chrome(secs):
    out = []
    for s in secs:
        if CHROME_SEC.search(s.get("sec") or ""):
            continue
        ps = [p for p in s["paras"] if not CHROME_PARA.match(_ptext(p).strip())]
        if ps:
            s = {**s, "paras": ps}
            out.append(s)
    return out or secs   # 全被剥光说明规则误伤,宁可原样返回

ABS_SYS = """你是技术编辑。基于给定文章正文,写一段英文摘要(abstract),3-5 句、120-200 词:
说清文章讲了什么、核心论点、给读者的结论。只依据正文,不杜撰,不写元评论,不用 markdown。
只输出 JSON: {"absEn":"..."}"""

def pick_abs(full):
    """摘要取"第一节前 3 段"太脆:首节常是目录/致谢/一句话导语。
    改成扫全篇,取头几段真正的散文(≥120 字、不是编号目录行)。"""
    toc = re.compile(r"^\s*\d+[.)]\s|^\s*(Table of Contents|Contents)\s*$", re.I)
    out = []
    for s in full:
        for p in s["paras"]:
            t = _ptext(p).strip()
            if len(t) >= 120 and not toc.match(t):
                out.append(t)
                if len(out) == 3: return " ".join(out)[:1200]
    return (" ".join(out) or " ".join(p["en"] for p in full[0]["paras"][:3]))[:1200]

def parse_md(md, title_hint=""):
    pub = ""
    mt = re.search(r"Published Time:\s*(\S+)", md)
    if mt: pub = mt.group(1)[:10]
    title = title_hint
    if not title:
        m = re.search(r"^Title:\s*(.+)$", md, re.M)
        if m: title = re.sub(r"\s*[|\-–—]\s*(OpenAI|Anthropic|Transformer Circuits).*$", "", m.group(1)).strip()
    idx = md.find("Markdown Content:")
    body = md[idx + len("Markdown Content:"):] if idx >= 0 else md
    secs = []; cur = {"sec": "Overview", "paras": []}
    for ln in body.split("\n"):
        s = ln.strip()
        if not s: continue
        h = re.match(r"^(#{1,4})\s+(.+)$", s)
        if h:
            if STOP.match(s): break
            head = re.sub(r"[*_`\[\]]", "", h.group(2)).strip()
            if h.group(1) == "#" and title and head.lower() == title.lower(): continue
            if not title and h.group(1) == "#": title = head; continue
            if cur["paras"]: secs.append(cur)
            cur = {"sec": head, "paras": []}
            continue
        if s.startswith("![") or s in ("---", "***", "___") or s.startswith(("|", ">", "[](")) \
           or re.match(r"^\[[^\]]*\]\([^)]*\)$", s) \
           or re.search(r"twitter\.com/intent|linkedin\.com/share|facebook\.com/sharer|mailto:", s, re.I): continue
        t = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", s)
        t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)          # 链接留文字
        t = re.sub(r"\*\*|__|`|^#+\s*|^>\s*", "", t).strip()
        if len(t) > 40: cur["paras"].append(t)
    if cur["paras"]: secs.append(cur)
    return title, pub, secs

# ---- 反向模式(中文原生内容):中文原文 → 英文译文 ----
TR_SYS_REV = """你是专业译者。输入是一篇中文文章某一节的若干中文段落(JSON 数组)。
逐段译成准确、通顺、地道的英文,**与输入等长、一一对应**。保留专有名词(人名/公司/产品,如 DeepSeek、AGI、AGI)。
另给该节的英文小标题 secEn。只输出 JSON:{"secEn":"...","en":["para1 English","para2 English",...]}"""

def translate_section_rev(sec):
    """中文段落 → 英文;返回 sec(英文标题)/secZh(中文原标题)/paras[{en:英译, zh:中文原文}]。"""
    paras = sec["paras"]
    if not paras: return {"sec": sec["sec"], "secZh": sec["sec"], "paras": []}
    BATCH = 8; en_out = []; secEn = None   # 分节差/长实录会出现一节上百段,分批防超 token 截断
    for i in range(0, len(paras), BATCH):
        chunk = paras[i:i+BATCH]
        r = call(TR_SYS_REV, f"节标题: {sec['sec']}\n段落: " + json.dumps(chunk, ensure_ascii=False), mx=12000)
        if secEn is None: secEn = r.get("secEn", sec["sec"])
        en = r.get("en", [])
        if len(en) != len(chunk): en = (en + [""] * len(chunk))[:len(chunk)]
        en_out.extend(en)
    return {"sec": secEn or sec["sec"], "secZh": sec["sec"],
            "paras": [{"en": e, "zh": z} for e, z in zip(en_out, paras)]}

def meta_rev(zh_title, en_abs):
    return call('你是编辑,输入一篇中文文章的中文标题与其英文摘要,产出 JSON:{"tEn":"精炼英文标题","sEn":"一句话英文核心 takeaway","sZh":"一句话中文核心 takeaway"}。只输出 JSON。',
                f"中文标题: {zh_title}\n英文摘要: {en_abs}")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True); ap.add_argument("--pid", required=True)
    ap.add_argument("--fields", required=True); ap.add_argument("--org", default="")
    ap.add_argument("--label", default=""); ap.add_argument("--slug", default="")
    ap.add_argument("--title", default=""); ap.add_argument("--date", default="")
    ap.add_argument("--reverse", action="store_true", help="中文原生内容:中文原文→英文译文(默认英文→中文)")
    ap.add_argument("--md-file", default="", help="跳过 Jina,用本地已抓好的 markdown(Jina 对部分页面持续返回残缺渲染,curl r.jina.ai 手动抓全后从文件走)")
    a = ap.parse_args()
    url = a.url.strip()
    slug = a.slug or re.sub(r"[^a-z0-9-]", "", url.rstrip("/").split("/")[-1].lower())[:48]
    pid_id = f"{a.pid}-{slug}"
    if a.md_file:
        print(f"[1/4] 读本地 markdown {a.md_file}", file=sys.stderr)
        md = open(a.md_file, encoding="utf-8").read()
    else:
        print(f"[1/4] Jina Reader 抓取 {url}", file=sys.stderr)
        md = fetch_md(url)
    title, pub, secs = parse_md(md, a.title)
    n0 = sum(len(s["paras"]) for s in secs)
    secs = strip_chrome(secs)
    n1 = sum(len(s["paras"]) for s in secs)
    if n1 < n0: print(f"   剥掉订阅框/页脚等骨架 {n0-n1} 段", file=sys.stderr)
    if pub and not re.match(r"^\d{4}-\d{2}-\d{2}$", pub):
        pub = ""                     # "Wed," 这类碎片宁可空掉走默认,别进库
    pub = a.date or pub or "2025-01-01"
    print(f"   标题: {title[:60]} | {pub} | {len(secs)} 节 / {sum(len(s['paras']) for s in secs)} 段", file=sys.stderr)
    if sum(len(s["paras"]) for s in secs) < 3:
        sys.exit("  ✗ 正文过短,抓取可能失败,放弃")
    print(f"[2/4] 逐段翻译{'(中→英 反向)' if a.reverse else '(英→中)'}", file=sys.stderr)
    tf = translate_section_rev if a.reverse else translate_section
    full = [None] * len(secs)
    with ThreadPoolExecutor(max_workers=5) as ex:
        futs = {ex.submit(tf, s): i for i, s in enumerate(secs)}
        for f in as_completed(futs): full[futs[f]] = f.result()
    print(f"[3/4] 贡献/局限 + 元信息", file=sys.stderr)
    # 摘要:优先让模型基于正文写一段(启发式取前几段被 Substack 骨架/目录坑过两次),
    # 失败再退回 pick_abs 的"前几段散文"。
    _body = " ".join(p["en"] for s in full for p in s["paras"])[:12000]
    try:
        absEn = (call(ABS_SYS, title + "\n" + _body, mx=1200).get("absEn") or "").strip() or pick_abs(full)
    except Exception:
        absEn = pick_abs(full)
    ctx = title + "\n" + absEn + "\n" + " ".join(p["en"] for s in full for p in s["paras"])[:60000]
    ins = call(INS_SYS, ctx, mx=6000)
    fields = [x.strip() for x in a.fields.split(",") if x.strip()]
    if a.reverse:   # 中文原生:title 是中文,tEn 需生成,absZh=中文原文
        absZh = " ".join(p["zh"] for p in full[0]["paras"][:3])[:1200]   # 反向模式:中文原文即摘要
        m = meta_rev(title, absEn)
        tEn, tZh = m.get("tEn", title), title
    else:
        absZh = None; m = meta_zh(title, absEn); tEn, tZh = title, m.get("tZh", title)
    paper = {"id": pid_id, "pid": a.pid, "date": pub, "venue": a.label or "Research",
             "org": a.org, "fields": fields, "tEn": tEn, "tZh": tZh,
             "sEn": m.get("sEn", ""), "sZh": m.get("sZh", ""), "absEn": absEn,
             "absZh": absZh if a.reverse else m.get("absZh", ""),
             "insights": ins, "srcUrl": url, "srcLabel": a.label or a.org or "Article",
             "addedAt": __import__("time").strftime("%Y-%m-%dT%H:%M:%SZ", __import__("time").gmtime())}
    space_obj(paper); space_obj(full)   # 中英文之间补空格(盘古之白),写盘/内联前统一做
    print(f"[4/4] 写 data/{pid_id}.json + index.html", file=sys.stderr)
    json.dump({**paper, "authors": [a.org] if a.org else [], "full": full},
              open(ROOT / "data" / f"{pid_id}.json", "w"), ensure_ascii=False)
    h = HTML.read_text(encoding="utf-8")
    if f"'{a.pid}'" not in h: print(f"  ⚠️ PEOPLE 里没有 '{a.pid}'", file=sys.stderr)
    papers, ai, bi = load_papers(h)
    papers = [p for p in papers if p.get("id") != pid_id] + [paper]
    papers.sort(key=lambda p: p.get("date", ""), reverse=True)
    h = h[:ai] + "const PAPERS = " + json.dumps(papers, ensure_ascii=False) + ";\n/* PAPERS_END */" + h[bi + len("/* PAPERS_END */"):]
    HTML.write_text(h, encoding="utf-8")
    import subprocess as _sp; _sp.run([sys.executable, str(ROOT / "pipeline" / "slim_index.py")], check=False)  # 首屏瘦身(剥重复字段)
    print(f"完成: {pid_id} | {len(secs)} 节 | 贡献{len(ins.get('contrib',[]))}/局限{len(ins.get('limits',[]))}", file=sys.stderr)

if __name__ == "__main__":
    main()
