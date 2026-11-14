#!/usr/bin/env python3
"""backfill_article_figs.py — 给已收录的博客/长文补图,**不重译正文**。

背景(2026-11-14):add_article 以前把图片行一律丢掉,图注当普通段落收进正文 →
站内所有博客类文章(Anthropic Engineering、Lilian Weng、Raschka…)都是纯文字。
add_article 已修(新收的会带图);本脚本补存量:

  重抓原文 markdown → 用新版 parse_md 找出每张「带图注」的图 + 它前面那一段
  → 在已存正文里按「前一段」文本相似度定位,插在它之后
  → 图注若当年被收成了普通段落:把那段删掉、直接复用它的中文当 capZh(不用再译)
  → 图片下载转 WebP 进图床仓库(与 add_paper 同规则)
  → 含图的节转成 items 结构;记 srcFigs(原文图数),audit_paper 会拦「插不进去的图」

  python3 pipeline/backfill_article_figs.py --scan            只统计每篇原文有几张带图注的图
  python3 pipeline/backfill_article_figs.py <id> ...          补图(写 data/<id>.json)
  python3 pipeline/backfill_article_figs.py --all             所有 0 图且原文有图的文章
跑完:图床仓库 ~/CascadeProjects/aipaper-figs commit+push,再跑本仓库 postingest.sh <ids>。
需 DEEPSEEK_API_KEY(仅图注无现成中文时调用)+ Clash 代理。
"""
import json, re, sys
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import add_article as A

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"


def norm(t):
    t = re.sub(r"\*\*|__|`|\[([^\]]*)\]\([^)]*\)", r"\1", t or "")
    return re.sub(r"\s+", " ", t).strip().lower()


def sim(a, b):
    a, b = norm(a)[:240], norm(b)[:240]
    if not a or not b: return 0.0
    return SequenceMatcher(None, a, b).ratio()


def articles():
    """所有非 arXiv、带 srcUrl 的条目(从 data 文件判断,内联 PAPERS 可能被瘦身)。"""
    out = []
    for f in sorted(DATA.glob("*.json")):
        if f.name in ("summaries.json",): continue
        try: d = json.load(open(f, encoding="utf-8"))
        except Exception: continue
        if not isinstance(d, dict) or d.get("arxiv") or not d.get("srcUrl") or not d.get("full"): continue
        out.append((d["id"], d))
    return out


def nfigs(d):
    return sum(1 for s in d["full"] for it in (s.get("items") or []) if it.get("t") == "fig")


def src_figs(url):
    """返回 [(anchor_text, fig_dict)],anchor = 原文里紧挨在图前的正文段(没有则 None)。"""
    md = A.fetch_md(url)
    _, _, secs = A.parse_md(md)
    secs = A.strip_chrome(secs)
    out, prev = [], None
    for s in secs:
        for p in s["paras"]:
            if A.is_fig(p):
                out.append((prev, json.loads(p[len(A.FIG_TAG):])))
            elif not str(p).startswith("```"):
                prev = p
    return out


def flat(full):
    """[(sec_idx, para_idx, en, zh)] —— 只看 paras 结构的节(items 节是已经处理过的)。"""
    return [(si, pi, p.get("en", ""), p.get("zh", "")) for si, s in enumerate(full)
            for pi, p in enumerate(s.get("paras") or [])]


def process(pid, d):
    figs = src_figs(d["srcUrl"])
    if not figs:
        print(f"  {pid}: 原文无带图注的图"); return 0, 0
    full = d["full"]
    rows = flat(full)
    inserts = {}          # (si, pi) -> [fig items] 插在该段之后;(si, -1) 插在节首
    drop = set()
    caps_need = []
    placed = 0
    last = (0, -1)
    for anchor, f in figs:
        # 1) 图注是否当年被收成了段落 → 删段、复用中文
        cap_zh = ""
        best_c = max(rows, key=lambda r: sim(f["cap"], r[2])) if f["cap"] and rows else None
        if best_c and sim(f["cap"], best_c[2]) >= 0.82 and (best_c[0], best_c[1]) not in drop:
            drop.add((best_c[0], best_c[1])); cap_zh = best_c[3]
        # 2) 定位:前一段最相似的已存段,且不早于上一张图的位置(保持原文顺序)
        pos = None
        if anchor:
            cands = [r for r in rows if (r[0], r[1]) >= last and (r[0], r[1]) not in drop]
            if cands:
                b = max(cands, key=lambda r: sim(anchor, r[2]))
                if sim(anchor, b[2]) >= 0.6: pos = (b[0], b[1])
        if pos is None and best_c and cap_zh:
            pos = (best_c[0], best_c[1])       # 没有可靠锚点时,放在原图注段的位置
        if pos is None and f["cap"] and rows:
            # 再退一步:前一段在清洗/翻译里变了样配不上,就按「图后面那段」定位,插在它前面
            cands = [r for r in rows if (r[0], r[1]) >= last and (r[0], r[1]) not in drop]
            if cands:
                b = max(cands, key=lambda r: sim(f["cap"], r[2]))
                if sim(f["cap"], b[2]) >= 0.6: pos = (b[0], b[1] - 1)
        if pos is None and not placed and rows:
            pos = (rows[0][0], -1)             # 开头几张都配不上(多为文首主图):放在正文最前
            print(f"    ↳ 近似定位(文首):{(f['cap'] or f['alt'])[:60]}")
        if pos is None and placed:
            pos = last                         # 实在配不上:紧跟上一张已定位的图,保持原文顺序、位置相邻
            print(f"    ↳ 近似定位(跟随上一张图):{(f['cap'] or f['alt'])[:60]}")
        if pos is None:
            print(f"    ⚠ 定位失败:{(f['cap'] or f['alt'])[:70]}"); continue
        item = {"t": "fig", "src": f["src"], "origSrc": f["src"], "capEn": f["cap"] or f["alt"], "capZh": cap_zh}
        if not cap_zh: caps_need.append(item)
        inserts.setdefault(pos, []).append(item)
        last = pos; placed += 1
    if not placed:
        d["srcFigs"] = len(figs); return len(figs), 0
    # 3) 缺中文的图注批量译
    if caps_need:
        caps = [it["capEn"] for it in caps_need]; zh = []
        for i in range(0, len(caps), 10):
            ch = caps[i:i + 10]
            z = ((A.call(A.CAP_SYS, json.dumps(ch, ensure_ascii=False), 6000) or {}).get("zh") or [])
            zh += (z + [""] * len(ch))[:len(ch)]
        for it, z in zip(caps_need, zh): it["capZh"] = z
    # 4) 上图床
    allf = [it for v in inserts.values() for it in v]
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=4) as ex:
        hosted = list(ex.map(lambda it: A.host_fig(it["origSrc"]), allf))
    for it, h in zip(allf, hosted):
        if h: it["src"] = h
    # 5) 重建含图的节为 items
    touched = {si for si, _ in inserts} | {si for si, _ in drop}
    for si in sorted(touched):
        s = full[si]
        items = list(inserts.get((si, -1), []))
        for pi, p in enumerate(s.get("paras") or []):
            if (si, pi) not in drop: items.append({"t": "para", **p})
            items += inserts.get((si, pi), [])
        s["items"] = items; s.pop("paras", None)
    d["srcFigs"] = len(figs)
    A.space_obj(full)
    json.dump(d, open(DATA / f"{pid}.json", "w", encoding="utf-8"), ensure_ascii=False)
    print(f"  ✓ {pid}: 原文 {len(figs)} 图,插入 {placed}(复用旧图注中文 {placed - len(caps_need)},新译 {len(caps_need)})")
    return len(figs), placed


def clean(pid, d):
    """第一轮补图后的清洗:删非正文图(头像/logo/图标/按钮)、[#] 永久链接图注置空、修嵌套链接吞进 src 的 URL;
    按新版过滤规则重抓原文,重算 srcFigs(只数正文图)。"""
    removed = fixed = 0
    for s in d["full"]:
        if "items" not in s: continue
        keep = []
        for it in s["items"]:
            if it.get("t") == "fig":
                o = it.get("origSrc") or it.get("src") or ""
                if ")](" in o:
                    o = o.split(")](")[0]; it["origSrc"] = o
                    if not it["src"].startswith(A.FIGHOST): it["src"] = o
                    fixed += 1
                if (it.get("capEn") or "").strip() in ("#", "¶", "§", "[]"):
                    it["capEn"] = ""; it["capZh"] = ""; fixed += 1
                if A.junk_fig(o, it.get("capEn") or ""):
                    removed += 1; continue
            keep.append(it)
        s["items"] = keep
    try: n = len(src_figs(d["srcUrl"]))
    except Exception as e: print(f"  ⚠ {pid} 重抓失败,srcFigs 不改: {e}"); n = d.get("srcFigs", 0)
    d["srcFigs"] = n
    json.dump(d, open(DATA / f"{pid}.json", "w", encoding="utf-8"), ensure_ascii=False)
    print(f"  {pid}: 删非正文图 {removed},修 {fixed},原文正文图 {n},现有 {nfigs(d)}", flush=True)


def main():
    args = sys.argv[1:]
    if not args: sys.exit(__doc__)
    arts = dict(articles())
    if args[0] == "--clean":
        for pid, d in arts.items():
            if "srcFigs" in d: clean(pid, d)
        return
    if args[0] == "--scan":
        tot = 0
        for pid, d in arts.items():
            if nfigs(d): continue
            try: n = len(src_figs(d["srcUrl"]))
            except Exception as e: print(f"{pid}\tERR {e}"); continue
            tot += bool(n); print(f"{pid}\t{n}", flush=True)
        print(f"共 {len(arts)} 篇文章,原文有图 {tot} 篇"); return
    ids = [pid for pid, d in arts.items() if not nfigs(d)] if args[0] == "--all" else args
    for pid in ids:
        if pid not in arts: print(f"  ✗ {pid} 不是文章或无 data"); continue
        try: process(pid, arts[pid])
        except Exception as e: print(f"  ✗ {pid}: {e}")


if __name__ == "__main__":
    main()
