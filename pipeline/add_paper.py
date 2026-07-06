#!/usr/bin/env python3
"""add_paper.py — 把一篇 arXiv 论文做成站内双语全文(逐段中英对照 + 核心贡献/局限)并写进 index.html。

流程: arXiv API 取元数据 → ar5iv 取正文(按节/段) → DeepSeek 逐段翻译 + 提炼贡献/局限
     → 写 data/<id>.json(全文) + 把元数据(不含全文)插入 index.html 的 PAPERS[]。
依赖: DEEPSEEK_API_KEY。用法:
  python add_paper.py --arxiv 2205.14135 --pid tridao --fields efficiency,nlp
注意: --pid 必须已在 index.html 的 PEOPLE 中。
"""
import argparse, json, os, re, sys, time, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
BASE=Path(__file__).resolve().parent; ROOT=BASE.parent; HTML=ROOT/"index.html"
GLOSS=json.load(open(BASE/"glossary.json",encoding="utf-8")) if (BASE/"glossary.json").exists() else {}
GT="\n".join(f"  {k} → {v}" for k,v in GLOSS.items() if not k.startswith("_"))
KEY=os.environ.get("DEEPSEEK_API_KEY") or sys.exit("需要 DEEPSEEK_API_KEY")
URL="https://api.deepseek.com/chat/completions"
OP=urllib.request.build_opener(urllib.request.ProxyHandler({}))   # 绕系统代理(DeepSeek 直连)
OPX=urllib.request.build_opener(urllib.request.ProxyHandler({'http':'http://127.0.0.1:7890','https':'http://127.0.0.1:7890'}))  # arXiv/ar5iv 走代理(直连 IP 已被限)
HDR={"User-Agent":"AIPaper/0.1 (research reader)"}

def call(system,user,mx=8000):
    body=json.dumps({"model":"deepseek-chat","messages":[{"role":"system","content":system},
        {"role":"user","content":user}],"response_format":{"type":"json_object"},
        "max_tokens":mx,"temperature":0.2}).encode()
    last=None
    for a in range(3):
        try:
            req=urllib.request.Request(URL,data=body,headers={"Content-Type":"application/json","Authorization":f"Bearer {KEY}"})
            return json.loads(json.load(OP.open(req,timeout=180))["choices"][0]["message"]["content"])
        except Exception as e: last=e; time.sleep(2+a*3)
    raise RuntimeError(str(last)[:120])

def arxiv_meta(aid):
    x=OPX.open(urllib.request.Request(f"http://export.arxiv.org/api/query?id_list={aid}",headers=HDR),timeout=40).read().decode()
    me=re.search(r"<entry>(.*?)</entry>",x,re.S); x=me.group(1) if me else x   # 只取条目,不要 feed 标题
    g=lambda t:(re.search(rf"<{t}>(.*?)</{t}>",x,re.S) or [None,""])[1]
    title=re.sub(r"\s+"," ",g("title")).strip()
    summ=re.sub(r"\s+"," ",g("summary")).strip()
    pub=g("published")[:10]
    authors=re.findall(r"<author>\s*<name>(.*?)</name>",x,re.S)
    cat=(re.search(r'<arxiv:primary_category[^>]*term="([^"]+)"',x) or [None,""])[1]
    return title,summ,pub,authors,cat

def ar5iv_sections(aid):
    try:
        html=OPX.open(urllib.request.Request(f"https://ar5iv.org/abs/{aid}",headers=HDR),timeout=60).read().decode("utf-8","ignore")
    except Exception as e:
        print("  ar5iv 失败,仅用摘要:",str(e)[:60],file=sys.stderr); return []
    # 顺序扫描:遇到 h2/h3 切节,收集其下的 ltx_p 段落
    toks=re.findall(r'<h[2-3][^>]*>(.*?)</h[2-3]>|<p[^>]*class="ltx_p"[^>]*>(.*?)</p>',html,re.S)
    clean=lambda s:re.sub(r"\s+"," ",re.sub(r"<[^>]+>","",s)).strip()
    secs=[]; cur={"sec":"Abstract","paras":[]}
    for h,p in toks:
        if h:
            t=clean(h)
            if cur["paras"]: secs.append(cur)
            cur={"sec":t,"paras":[]}
        elif p:
            t=clean(p)
            if len(t)>40 and not t.lower().startswith(("figure","table")): cur["paras"].append(t)
    if cur["paras"]: secs.append(cur)
    # 合并过短的节,丢弃 References 之后
    out=[]
    for s in secs:
        if re.match(r"(references|acknowledg|appendix)",s["sec"],re.I): break
        out.append(s)
    return out

TR_SYS=f"""你是 AI 论文的专业译者。输入是一篇 AI 论文某一节的若干英文段落(JSON 数组)。
逐段译成准确、通顺的学术中文,**与输入等长、一一对应**。保留术语英文缩写(如 Transformer、attention、GPU),数学符号照搬。严格用术语表。
另给该节的中文小标题 secZh。只输出 JSON:{{"secZh":"...","zh":["第1段中文","第2段中文",...]}}
术语表:
{GT}"""

def translate_section(sec):
    paras=sec["paras"]
    if not paras: return {"sec":sec["sec"],"secZh":sec["sec"],"paras":[]}
    r=call(TR_SYS,f"节标题: {sec['sec']}\n段落: "+json.dumps(paras,ensure_ascii=False),mx=8000)
    zh=r.get("zh",[]);
    if len(zh)!=len(paras): zh=(zh+[""]*len(paras))[:len(paras)]
    return {"sec":sec["sec"],"secZh":r.get("secZh",sec["sec"]),"paras":[{"en":e,"zh":z} for e,z in zip(paras,zh)]}

INS_SYS=f"""你是 AI 论文编辑。读论文标题、摘要与正文,提炼两组要点,输出 JSON:
{{"contrib":[{{"en":"...","zh":"..."}}],"limits":[{{"en":"...","zh":"..."}}]}}
- contrib(核心贡献):这篇论文最重要的创新与结论,4-6 条。
- limits(局限与争议):方法的限制、适用边界或后续被质疑之处,3-5 条(没有则合理推断其边界)。
每条 en≤22 词 + 地道中文 zh,基于真实内容不杜撰。严格用术语表。只输出 JSON。
术语表:
{GT}"""

def meta_zh(title,summ):
    return call("""你是 AI 论文编辑,产出元信息 JSON:{"tZh":"中文标题","sEn":"一句话英文核心takeaway","sZh":"一句话中文核心takeaway","absZh":"摘要的地道中文翻译"}。只输出 JSON。""",
                f"标题: {title}\n摘要: {summ}")

def load_papers(h):
    a=h.index("const PAPERS = "); b=h.index("/* PAPERS_END */")
    return json.loads(h[a+len("const PAPERS = "):b].rstrip().rstrip(";").rstrip()), a, b

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--arxiv",required=True); ap.add_argument("--pid",required=True)
    ap.add_argument("--fields",required=True)
    a=ap.parse_args(); aid=a.arxiv.strip()
    print(f"[1/4] arXiv 元数据 {aid}",file=sys.stderr)
    title,summ,pub,authors,cat=arxiv_meta(aid)
    print(f"[2/4] ar5iv 正文",file=sys.stderr)
    secs=ar5iv_sections(aid)
    print(f"   {len(secs)} 节 / {sum(len(s['paras']) for s in secs)} 段",file=sys.stderr)
    print(f"[3/4] 逐段翻译 + 贡献/局限 + 元信息",file=sys.stderr)
    full=[None]*len(secs)
    with ThreadPoolExecutor(max_workers=5) as ex:
        futs={ex.submit(translate_section,s):i for i,s in enumerate(secs)}
        for f in as_completed(futs): full[futs[f]]=f.result()
    ctx=title+"\n"+summ+"\n"+" ".join(p["en"] for s in full for p in s["paras"])[:60000]
    ins=call(INS_SYS,ctx,mx=4000); m=meta_zh(title,summ)
    fields=[x.strip() for x in a.fields.split(",") if x.strip()]
    pid=a.pid; pid_id=f"{pid}-{aid}"
    paper={"id":pid_id,"pid":pid,"arxiv":aid,"date":pub,"venue":cat,"fields":fields,
           "tEn":title,"tZh":m.get("tZh",title),"sEn":m.get("sEn",""),"sZh":m.get("sZh",""),
           "absEn":summ,"absZh":m.get("absZh",""),"insights":ins}
    print(f"[4/4] 写 data/{pid_id}.json + index.html",file=sys.stderr)
    json.dump({**paper,"authors":authors,"full":full},open(ROOT/"data"/f"{pid_id}.json","w"),ensure_ascii=False)
    h=HTML.read_text(encoding="utf-8")
    if f"'{pid}'" not in h: print(f"  ⚠️ PEOPLE 里没有 '{pid}'",file=sys.stderr)
    papers,ai,bi=load_papers(h)
    papers=[p for p in papers if p.get("id")!=pid_id]+[paper]
    papers.sort(key=lambda p:p.get("date",""),reverse=True)
    h=h[:ai]+"const PAPERS = "+json.dumps(papers,ensure_ascii=False)+";\n/* PAPERS_END */"+h[bi+len("/* PAPERS_END */"):]
    HTML.write_text(h,encoding="utf-8")
    print(f"完成: {pid_id} | {len(secs)} 节 | 贡献{len(ins.get('contrib',[]))}/局限{len(ins.get('limits',[]))}",file=sys.stderr)

if __name__=="__main__": main()
