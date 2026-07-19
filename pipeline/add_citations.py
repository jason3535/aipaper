#!/usr/bin/env python3
"""add_citations.py — 给每篇论文补「被引用数」(Semantic Scholar,按 arXiv id,已合并预印本/正式版).
写进 index.html 的 PAPERS[] 与 data/<id>.json 的 `cites` 字段。无参数,扫全部论文。"""
import json,re,sys,time,urllib.request,urllib.error
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent; HTML=ROOT/"index.html"
OP=urllib.request.build_opener(urllib.request.ProxyHandler({}))

def ss_cites(aid):
    url=f"https://api.semanticscholar.org/graph/v1/paper/arXiv:{aid}?fields=citationCount"
    for a in range(7):
        try:
            d=json.load(OP.open(urllib.request.Request(url,headers={"User-Agent":"AIPaper/0.1"}),timeout=30))
            return d.get("citationCount")
        except urllib.error.HTTPError as e:
            if e.code in (429,503): time.sleep(5+a*5); continue
            return None
        except Exception: time.sleep(4);
    return None

def load_papers(h):
    a=h.index("const PAPERS = "); b=h.index("/* PAPERS_END */")
    return json.loads(h[a+len("const PAPERS = "):b].rstrip().rstrip(";").rstrip()), a, b

def main():
    h=HTML.read_text(encoding="utf-8")
    papers,ai,bi=load_papers(h)
    only=set(sys.argv[1:])
    for p in papers:
        if only and p.get("arxiv") not in only and p["id"] not in only: continue
        c=ss_cites(p["arxiv"])
        if c is not None:
            p["cites"]=c
            dj=ROOT/"data"/f"{p['id']}.json"
            if dj.exists():
                d=json.load(open(dj,encoding="utf-8")); d["cites"]=c; json.dump(d,open(dj,"w"),ensure_ascii=False)
            print(f"  {p['arxiv']:14} {c:>8}  {p['tEn'][:40]}",file=sys.stderr)
        else:
            print(f"  {p['arxiv']:14}   (无数据) {p['tEn'][:40]}",file=sys.stderr)
        time.sleep(4)
    h=h[:ai]+"const PAPERS = "+json.dumps(papers,ensure_ascii=False)+";\n/* PAPERS_END */"+h[bi+len("/* PAPERS_END */"):]
    HTML.write_text(h,encoding="utf-8")
    got=sum(1 for p in papers if p.get("cites") is not None)
    print(f"完成: {got}/{len(papers)} 篇有被引数",file=sys.stderr)

if __name__=="__main__": main()
