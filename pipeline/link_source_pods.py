#!/usr/bin/env python3
"""link_source_pods.py — 播客解读文 → 原播客 单集级互链(写进内联 PAPERS 的 srcPod 字段)。

背景(2026-11-21):Zvi《On Dwarkesh Patel's November 2026 Podcast With Paul Christiano》是对一期
播客的逐段评论,原播客 christiano-dwarkesh-2026 就在 AI Podcast 站上,但两站互链只按「人」匹配
(PAPER2POD[pid]),作者是 Zvi,于是这篇评论文页上没有任何指向原播客的入口。

匹配规则(宁缺毋滥,只对博客/长文,不碰 arXiv):
  1. 文章英文标题里出现该集嘉宾全名(撇号/大小写归一);
  2. 且标题里出现该集节目名的关键词(Dwarkesh / Lex Fridman / …)或 podcast|interview|conversation;
  3. 播客日期在文章日期之前 0~60 天(评论文总是在节目之后写)。
多集命中取日期最近的一集。srcPod = {"id","pod","person"},app.js 阅读页与静态分享页据此渲染「收听原播客」。
用法: python3 pipeline/link_source_pods.py [--dry-run]
"""
import json, re, sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "app.js"
POD_INDEX = Path.home() / "CascadeProjects" / "aipodcast" / "mcp-data" / "index.json"
N = lambda s: re.sub(r"\s+", " ", (s or "").replace("’", "'").lower()).strip()
STOPW = {"the", "podcast", "show", "with", "and", "a", "of", "ai"}

def pod_keys(pod_en):
    """节目名里的识别词:「Dwarkesh Podcast」→ dwarkesh;「Lex Fridman Podcast」→ lex fridman。"""
    words = [w for w in re.findall(r"[a-z0-9']+", N(pod_en)) if w not in STOPW]
    return [" ".join(words)] if words else []

def d(s):
    try: return date.fromisoformat(s[:10])
    except Exception: return None

def main():
    dry = "--dry-run" in sys.argv
    if not POD_INDEX.exists():
        print(f"  ⚠ 找不到播客索引 {POD_INDEX},跳过"); return
    eps = json.load(open(POD_INDEX))["episodes"]
    h = APP.read_text(encoding="utf-8")
    a = h.index("const PAPERS = "); b = h.index("/* PAPERS_END */")
    papers = json.loads(h[a + len("const PAPERS = "):b].rstrip().rstrip(";").rstrip())
    changed = 0; linked = 0
    for p in papers:
        if p.get("arxiv") or not p.get("srcUrl"):
            continue
        t = N(p.get("tEn")); pd = d(p.get("date") or "")
        best = None
        if pd:
            for e in eps:
                nm = N(e.get("person"))
                if len(nm) < 5 or nm not in t: continue
                if not (any(k and k in t for k in pod_keys(e.get("podEn"))) or re.search(r"podcast|interview|conversation", t)):
                    continue
                ed = d(e.get("date") or "")
                if not ed or not (0 <= (pd - ed).days <= 60): continue
                if best is None or ed > d(best["date"]): best = e
        want = {"id": best["id"], "pod": best.get("podEn") or "", "person": best.get("person") or ""} if best else None
        if want: linked += 1; print(f"  {p['id']} → {best['id']}")
        if p.get("srcPod") != want:
            if want: p["srcPod"] = want
            else: p.pop("srcPod", None)
            changed += 1
    print(f"  原播客互链 {linked} 篇(本次变更 {changed})")
    if changed and not dry:
        h = h[:a] + "const PAPERS = " + json.dumps(papers, ensure_ascii=False) + ";\n/* PAPERS_END */" + h[b + len("/* PAPERS_END */"):]
        APP.write_text(h, encoding="utf-8")

if __name__ == "__main__":
    main()
