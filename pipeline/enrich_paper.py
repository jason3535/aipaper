#!/usr/bin/env python3
"""enrich_paper.py — 给已收录论文补「图片 + 公式 + 附录」,做成有序的富内容流。
复用已有译文(段落 en→zh),只新译附录段落与图注;公式取 LaTeX(前端 MathJax 渲染)。
写回 data/<id>.json 的 full=[{sec,secZh,items:[{t:'para',en,zh}|{t:'fig',src,capEn,capZh}|{t:'eq',tex}]}]。
用法: python enrich_paper.py <id|all> ...   需 DEEPSEEK_API_KEY。"""
import json,os,re,sys,time,urllib.request
from concurrent.futures import ThreadPoolExecutor,as_completed
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent; DATA=ROOT/"data"
OP=urllib.request.build_opener(urllib.request.ProxyHandler({}))
OPX=urllib.request.build_opener(urllib.request.ProxyHandler({'http':'http://127.0.0.1:7890','https':'http://127.0.0.1:7890'}))
KEY=os.environ.get("DEEPSEEK_API_KEY") or sys.exit("需要 DEEPSEEK_API_KEY")
IMG="https://ar5iv.labs.arxiv.org"
clean=lambda s:re.sub(r"\s+"," ",re.sub(r"<[^>]+>","",s)).strip()

def call(system,user,mx=8000):
    body=json.dumps({"model":"deepseek-chat","messages":[{"role":"system","content":system},{"role":"user","content":user}],
        "response_format":{"type":"json_object"},"max_tokens":mx,"temperature":0.2}).encode()
    for a in range(3):
        try:
            req=urllib.request.Request("https://api.deepseek.com/chat/completions",data=body,
                headers={"Content-Type":"application/json","Authorization":f"Bearer {KEY}"})
            return json.loads(json.load(OP.open(req,timeout=180))["choices"][0]["message"]["content"])
        except Exception as e: time.sleep(2+a*3)
    return {}

def rich_sections(aid):
    html=OPX.open(urllib.request.Request(f"https://ar5iv.org/abs/{aid}",headers={"User-Agent":"AIPaper/0.1"}),timeout=60).read().decode("utf-8","ignore")
    # cut off bibliography/references onward (keep appendix which precedes it)
    cut=re.search(r'<(section|div)[^>]*class="[^"]*ltx_bibliography',html)
    if cut: html=html[:cut.start()]
    tok=re.compile(r'<h([2-3])[^>]*>(.*?)</h\1>'
        r'|<figure[^>]*class="[^"]*ltx_figure[^"]*"[^>]*>(.*?)</figure>'
        r'|<table[^>]*class="[^"]*ltx_equation[^"]*"[^>]*>(.*?)</table>'
        r'|<p[^>]*class="ltx_p"[^>]*>(.*?)</p>',re.S)
    secs=[]; cur={"sec":"Abstract","items":[]}
    for m in tok.finditer(html):
        h,fig,eq,p=m.group(2),m.group(3),m.group(4),m.group(5)
        if h is not None:
            t=clean(h)
            if re.match(r'^\s*references\s*$',t,re.I): break
            if cur["items"]: secs.append(cur)
            cur={"sec":t,"items":[]}
        elif fig is not None:
            im=re.search(r'<img[^>]+src="([^"]+)"',fig); cap=re.search(r'<figcaption[^>]*>(.*?)</figcaption>',fig,re.S)
            if im:
                src=im.group(1); src=(IMG+src) if src.startswith("/") else src
                cur["items"].append({"t":"fig","src":src,"capEn":clean(cap.group(1)) if cap else ""})
        elif eq is not None:
            mt=re.search(r'alttext="([^"]*)"',eq)
            tex=(mt.group(1) if mt else "").strip()
            if tex and len(tex)>1: cur["items"].append({"t":"eq","tex":tex})
        elif p is not None:
            t=clean(p)
            if len(t)>40 and not t.lower().startswith(("figure","table")): cur["items"].append({"t":"para","en":t})
    if cur["items"]: secs.append(cur)
    return secs

TR=f"""你是 AI 论文译者。给定 JSON 数组(英文段落或图注),逐条译成准确通顺的学术中文,与输入等长一一对应。保留术语英文缩写与数学符号。只输出 JSON:{{"zh":["...","..."]}}"""
SEC=f"""把给定英文小节标题数组译为简洁中文,等长对应。只输出 JSON:{{"zh":["..."]}}"""

def enrich(pid_id):
    f=DATA/f"{pid_id}.json"
    if not f.exists(): print("  缺",pid_id,file=sys.stderr); return
    d=json.load(open(f,encoding="utf-8")); aid=d["arxiv"]
    secs=rich_sections(aid)
    if not secs: print(f"  {pid_id} ar5iv 无正文,跳过",file=sys.stderr); return
    # reuse existing translations: en(normalized)->zh from old full.paras
    old={}
    oldsec={}
    for s in (d.get("full") or []):
        oldsec[s.get("sec","")]=s.get("secZh","")
        for pa in s.get("paras",[]): old[re.sub(r"\s+","",pa.get("en",""))]=pa.get("zh","")
    # collect new texts to translate (appendix paras + captions) + new sec titles
    need=[]; refs=[]
    for s in secs:
        for it in s["items"]:
            if it["t"]=="para":
                k=re.sub(r"\s+","",it["en"])
                if k in old: it["zh"]=old[k]
                else: need.append(it["en"]); refs.append(("para",it))
            elif it["t"]=="fig":
                need.append(it["capEn"] or "(figure)"); refs.append(("cap",it))
    newsecs=[s for s in secs if s["sec"] not in oldsec]
    # translate new texts in chunks
    for i in range(0,len(need),20):
        chunk=need[i:i+20]; r=call(TR,json.dumps(chunk,ensure_ascii=False)); zh=r.get("zh",[])
        for (kind,it),z in zip(refs[i:i+20],zh):
            if kind=="para": it["zh"]=z
            else: it["capZh"]=z
    # ensure all paras/figs have zh
    for s in secs:
        s["secZh"]=oldsec.get(s["sec"]) or ""
        for it in s["items"]:
            if it["t"]=="para" and "zh" not in it: it["zh"]=""
            if it["t"]=="fig" and "capZh" not in it: it["capZh"]=""
    # translate missing sec titles
    miss=[s for s in secs if not s["secZh"]]
    if miss:
        r=call(SEC,json.dumps([s["sec"] for s in miss],ensure_ascii=False)); zh=r.get("zh",[])
        for s,z in zip(miss,zh): s["secZh"]=z or s["sec"]
    d["full"]=[{"sec":s["sec"],"secZh":s["secZh"],"items":s["items"]} for s in secs]
    json.dump(d,open(f,"w"),ensure_ascii=False)
    nf=sum(1 for s in secs for it in s["items"] if it["t"]=="fig")
    ne=sum(1 for s in secs for it in s["items"] if it["t"]=="eq")
    print(f"  {pid_id}: {len(secs)}节 图{nf} 公式{ne} 段{sum(1 for s in secs for it in s['items'] if it['t']=='para')}",file=sys.stderr)

def main():
    args=sys.argv[1:]
    ids=[p.stem for p in sorted(DATA.glob("*.json")) if p.stem!="index"] if (not args or args==["all"]) else args
    for pid_id in ids: enrich(pid_id)
    print("完成",file=sys.stderr)

if __name__=="__main__": main()
