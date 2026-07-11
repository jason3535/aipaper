#!/usr/bin/env python3
"""bulk_ingest.py — 并行批量收录论文(直接产出富内容:逐段双语 + 图片 + 公式 + 附录)。
输入: JSON 文件 [{"pid","arxiv","fields","org"}...]。并行翻译,各写 data/<id>.json,
进度追加到 /tmp/wave_done.jsonl;最后用 merge 一次性把元数据并入 index.html。
用法: python bulk_ingest.py /tmp/wave_papers.json [workers]    需 DEEPSEEK_API_KEY。
      python bulk_ingest.py --merge                            把 wave_done.jsonl 并入 index.html
"""
import json,os,re,sys,time,urllib.request,threading
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from enrich_paper import rich_sections
from add_paper import arxiv_meta, call as ds_call
ROOT=Path(__file__).resolve().parent.parent; DATA=ROOT/"data"; HTML=ROOT/"index.html"
DONE=Path("/tmp/wave_done.jsonl")
GLOSS=json.load(open(Path(__file__).resolve().parent/"glossary.json",encoding="utf-8"))
GT="\n".join(f"  {k} → {v}" for k,v in GLOSS.items() if not k.startswith("_"))
TR_SYS=f"你是 AI 论文译者。给定 JSON 英文数组(段落或图注),逐条译成准确通顺的学术中文,与输入等长一一对应,保留术语英文缩写与数学符号,严格用术语表。只输出 JSON:{{\"zh\":[...]}}\n术语表:\n{GT}"
SEC_SYS="把英文小节标题数组译为简洁中文,等长对应。只输出 JSON:{\"zh\":[...]}"
INS_SYS=f'你是 AI 论文编辑,读标题/摘要/正文,输出 JSON:{{"contrib":[{{"en":"...","zh":"..."}}],"limits":[{{"en":"...","zh":"..."}}]}}。contrib(核心贡献)4-6条,limits(局限/边界)3-5条,每条en<=22词+地道zh,不杜撰,严格术语表。\n术语表:\n{GT}'
META_SYS='产出元信息 JSON:{"tZh":"中文标题","sEn":"一句话英文takeaway","sZh":"一句话中文takeaway","absZh":"摘要地道中文翻译"}。只输出 JSON。'
lock=threading.Lock()

def translate_list(texts):
    out=[None]*len(texts)
    for i in range(0,len(texts),20):
        ch=texts[i:i+20]; r=ds_call(TR_SYS,json.dumps(ch,ensure_ascii=False),mx=8000); zh=r.get("zh",[])
        zh=(zh+[""]*len(ch))[:len(ch)]
        for j,z in enumerate(zh): out[i+j]=z
    return out

def do_paper(rec):
    pid,aid=rec["pid"],rec["arxiv"]; pid_id=f"{pid}-{aid}"
    if (DATA/f"{pid_id}.json").exists(): return (pid_id,"skip")
    try:
        title,summ,pub,authors,cat=arxiv_meta(aid)
        secs=rich_sections(aid)   # items: para/fig/eq, incl appendix
        # collect translatable: para en, fig capEn ; + sec titles
        texts=[]; refs=[]
        for s in secs:
            for it in s["items"]:
                if it["t"]=="para": texts.append(it["en"]); refs.append(("p",it))
                elif it["t"]=="fig": texts.append(it.get("capEn") or "(figure)"); refs.append(("c",it))
        zh=translate_list(texts) if texts else []
        for (k,it),z in zip(refs,zh):
            if k=="p": it["zh"]=z
            else: it["capZh"]=z
        if secs:
            sr=ds_call(SEC_SYS,json.dumps([s["sec"] for s in secs],ensure_ascii=False),mx=3000).get("zh",[])
            sr=(sr+[""]*len(secs))[:len(secs)]
            for s,z in zip(secs,sr): s["secZh"]=z or s["sec"]
        ctx=title+"\n"+summ+"\n"+" ".join(it["en"] for s in secs for it in s["items"] if it["t"]=="para")[:60000]
        ins=ds_call(INS_SYS,ctx,mx=4000); m=ds_call(META_SYS,f"标题: {title}\n摘要: {summ}")
        date=pub; org=rec.get("org",""); fields=rec.get("fields") or ["deep-learning"]
        meta={"id":pid_id,"pid":pid,"arxiv":aid,"date":date,"venue":cat,"org":org,"fields":fields,
              "tEn":title,"tZh":m.get("tZh",title),"sEn":m.get("sEn",""),"sZh":m.get("sZh",""),
              "absEn":summ,"absZh":m.get("absZh",""),"insights":ins}
        full=[{"sec":s["sec"],"secZh":s.get("secZh",s["sec"]),"items":s["items"]} for s in secs]
        json.dump({**meta,"authors":authors,"full":full},open(DATA/f"{pid_id}.json","w"),ensure_ascii=False)
        with lock:
            open(DONE,"a").write(json.dumps(meta,ensure_ascii=False)+"\n")
        return (pid_id,f"{len(secs)}节/{sum(1 for s in secs for it in s['items'] if it['t']=='fig')}图")
    except Exception as e:
        return (pid_id,"ERR "+str(e)[:60])

def merge():
    metas={}
    for ln in open(DONE,encoding="utf-8"):
        m=json.loads(ln); metas[m["id"]]=m
    h=HTML.read_text(encoding="utf-8")
    a=h.index("const PAPERS = ");b=h.index("/* PAPERS_END */")
    P=json.loads(h[a+len("const PAPERS = "):b].rstrip().rstrip(";").rstrip())
    have=set(p["id"] for p in P)
    add=[m for k,m in metas.items() if k not in have]
    P=P+add; P.sort(key=lambda p:p.get("date",""),reverse=True)
    h=h[:a]+"const PAPERS = "+json.dumps(P,ensure_ascii=False)+";\n/* PAPERS_END */"+h[b+len("/* PAPERS_END */"):]
    HTML.write_text(h,encoding="utf-8")
    print(f"merged {len(add)} papers -> index.html (total {len(P)})",file=sys.stderr)
    import subprocess as _sp, sys as _sys, os as _os; _sp.run([_sys.executable, _os.path.join(_os.path.dirname(_os.path.abspath(__file__)), "slim_index.py")], check=False)

def main():
    if sys.argv[1]=="--merge": merge(); return
    recs=json.load(open(sys.argv[1],encoding="utf-8"))
    workers=int(sys.argv[2]) if len(sys.argv)>2 else 4
    print(f"bulk ingest {len(recs)} papers, {workers} workers",file=sys.stderr)
    done=0
    with ThreadPoolExecutor(max_workers=workers) as ex:
        for pid_id,st in ex.map(do_paper,recs):
            done+=1; print(f"  [{done}/{len(recs)}] {pid_id}: {st}",file=sys.stderr)
    merge()
    print("ALL_DONE_BULK",file=sys.stderr)

if __name__=="__main__": main()
