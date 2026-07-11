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

def fetch_md(url):
    req = urllib.request.Request("https://r.jina.ai/" + url,
                                 headers={"User-Agent": "Mozilla/5.0", "X-Return-Format": "markdown"})
    r = OPX.open(req, timeout=120); raw = r.read()
    if r.headers.get("Content-Encoding") == "gzip": raw = gzip.decompress(raw)
    return raw.decode("utf-8", "ignore")

# 已知坑:deepmind.google 的页面开头会带产品导航菜单(Genie/Gemini/Gemma 连写的短语段),
# Jina 抓下来像正文。收录 DeepMind 后务必人工检查 full[0] 是否导航垃圾,是则整节删除并重建 absEn/absZh。
STOP = re.compile(r"^#{1,4}\s+(related|footnotes?|references|acknowledg|read the|share|citation|appendix|more news|sign up|subscribe|policy memo|authors?|contributors?|further reading|explore more|стать)", re.I)

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

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True); ap.add_argument("--pid", required=True)
    ap.add_argument("--fields", required=True); ap.add_argument("--org", default="")
    ap.add_argument("--label", default=""); ap.add_argument("--slug", default="")
    ap.add_argument("--title", default=""); ap.add_argument("--date", default="")
    a = ap.parse_args()
    url = a.url.strip()
    slug = a.slug or re.sub(r"[^a-z0-9-]", "", url.rstrip("/").split("/")[-1].lower())[:48]
    pid_id = f"{a.pid}-{slug}"
    print(f"[1/4] Jina Reader 抓取 {url}", file=sys.stderr)
    md = fetch_md(url)
    title, pub, secs = parse_md(md, a.title)
    pub = a.date or pub or "2025-01-01"
    print(f"   标题: {title[:60]} | {pub} | {len(secs)} 节 / {sum(len(s['paras']) for s in secs)} 段", file=sys.stderr)
    if sum(len(s["paras"]) for s in secs) < 3:
        sys.exit("  ✗ 正文过短,抓取可能失败,放弃")
    print(f"[2/4] 逐段翻译", file=sys.stderr)
    full = [None] * len(secs)
    with ThreadPoolExecutor(max_workers=5) as ex:
        futs = {ex.submit(translate_section, s): i for i, s in enumerate(secs)}
        for f in as_completed(futs): full[futs[f]] = f.result()
    print(f"[3/4] 贡献/局限 + 元信息", file=sys.stderr)
    absEn = " ".join(p["en"] for p in full[0]["paras"][:3])[:1200]
    ctx = title + "\n" + absEn + "\n" + " ".join(p["en"] for s in full for p in s["paras"])[:60000]
    ins = call(INS_SYS, ctx, mx=4000)
    m = meta_zh(title, absEn)
    fields = [x.strip() for x in a.fields.split(",") if x.strip()]
    paper = {"id": pid_id, "pid": a.pid, "date": pub, "venue": a.label or "Research",
             "org": a.org, "fields": fields, "tEn": title, "tZh": m.get("tZh", title),
             "sEn": m.get("sEn", ""), "sZh": m.get("sZh", ""), "absEn": absEn, "absZh": m.get("absZh", ""),
             "insights": ins, "srcUrl": url, "srcLabel": a.label or a.org or "Article"}
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
