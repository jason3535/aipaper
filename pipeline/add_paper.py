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
sys.path.insert(0, str(BASE)); import arxiv_html   # arXiv 原生 HTML 提取(含显示公式+图)
GLOSS=json.load(open(BASE/"glossary.json",encoding="utf-8")) if (BASE/"glossary.json").exists() else {}
GT="\n".join(f"  {k} → {v}" for k,v in GLOSS.items() if not k.startswith("_"))
KEY=os.environ.get("DEEPSEEK_API_KEY") or sys.exit("需要 DEEPSEEK_API_KEY")
URL="https://api.deepseek.com/chat/completions"
OP=urllib.request.build_opener(urllib.request.ProxyHandler({}))   # 绕系统代理(DeepSeek 直连)
OPX=urllib.request.build_opener(urllib.request.ProxyHandler({'http':'http://127.0.0.1:7890','https':'http://127.0.0.1:7890'}))  # arXiv/ar5iv 走代理(直连 IP 已被限)
HDR={"User-Agent":"AIPaper/0.1 (research reader)"}

def call(system,user,mx=8000):
    body=json.dumps({"model":"deepseek-v4-flash","messages":[{"role":"system","content":system},
        {"role":"user","content":user}],"response_format":{"type":"json_object"},
        "max_tokens":mx,"temperature":0.2}).encode()
    last=None
    for a in range(3):
        try:
            req=urllib.request.Request(URL,data=body,headers={"Content-Type":"application/json","Authorization":f"Bearer {KEY}"})
            content=json.load(OP.open(req,timeout=180))["choices"][0]["message"]["content"]
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                # DeepSeek 常在数学论文译文里裸输出 LaTeX 反斜杠(\mathcal 等),把非法转义补成 \\
                return json.loads(re.sub(r'\\(?![\\/"bfnrtu])', r'\\\\', content))
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

def pdf_sections(aid):
    """PDF 兜底(arxiv HTML/ar5iv 都无正文时):下载 arXiv PDF → pdftotext → 按节/段切。
    正文会有 PDF 抽取的常见毛病(单词打散/公式乱),交给 translate_section 的 TR_SYS 清理重构。"""
    import subprocess, tempfile
    url=f"https://arxiv.org/pdf/{aid}"
    with tempfile.TemporaryDirectory() as td:
        pdf=os.path.join(td,"p.pdf")
        try:
            data=OPX.open(urllib.request.Request(url,headers=HDR),timeout=90).read()
            open(pdf,"wb").write(data)
        except Exception as e:
            print("  PDF 下载失败:",str(e)[:60],file=sys.stderr); return []
        if os.path.getsize(pdf)<5000: return []
        # -layout 保留双栏阅读顺序(默认模式会把左右栏逐行交错成乱码)
        txt=subprocess.run(["pdftotext","-layout","-nopgbrk",pdf,"-"],capture_output=True,text=True).stdout
    # 合并断行(连字符续行 + 普通换行→空格),按空行分段
    txt=re.sub(r"-\n(\w)",r"\1",txt)
    lines=txt.split("\n")
    secs=[]; cur={"sec":"Abstract","paras":[]}; buf=[]
    HEAD=re.compile(r"^\s*(\d{1,2}(?:\.\d{1,2})?)\.?\s+([A-Z][A-Za-z].{2,50})\s*$")
    def flush_buf():
        if buf:
            p=re.sub(r"\s+"," "," ".join(buf)).strip()
            if len(p)>60 and not p.lower().startswith(("figure","table","fig.")): cur["paras"].append(p)
        buf.clear()
    for ln in lines:
        m=HEAD.match(ln)
        if m and len(ln.strip())<55:                 # 新节标题
            flush_buf()
            if cur["paras"]: secs.append(cur)
            cur={"sec":f"{m.group(1)} {m.group(2).strip()}","paras":[]}
        elif not ln.strip():
            flush_buf()
        else:
            buf.append(ln.strip())
    flush_buf()
    if cur["paras"]: secs.append(cur)
    # 参考文献砍除:很多 PDF 没有独立 References 标题(直接接正文后)。用引文特征识别并砍掉末尾一连串引文段。
    CITE_PATS=[r"\bpp\.\s*\d", r"arXiv:\s*\d", r"\bet\s+al", r"\bvol\.\s*\d", r"\bdoi:",
               r"\bIn\s+Proc", r"\bIn\s+Int", r"\bIn\s+Adv", r"Conf\.\s", r"Trans\.\s",
               r"NeurIPS|ICML|CVPR|ICLR|ECCV|EMNLP"]
    def is_cite(p):
        if not re.search(r"(19|20)\d{2}", p): return False
        return any(re.search(x, p) for x in CITE_PATS)
    for s in secs:
        ps=s["paras"]
        # 从末尾往前砍连续引文(允许中间夹 1 个非引文,避免误停)
        cut=len(ps); miss=0
        for i in range(len(ps)-1,-1,-1):
            if is_cite(ps[i]): cut=i; miss=0
            else:
                miss+=1
                if miss>=2: break
        if cut<len(ps) and (len(ps)-cut)>=3:   # 至少连着 3 段引文才认定为参考文献区
            s["paras"]=ps[:cut]
    out=[]
    for s in secs:
        if re.match(r"\s*(references|acknowledg|bibliography)",s["sec"],re.I): break
        if s["paras"]: out.append(s)
    # 超大论文(150页级)段落数千,单次翻译必超时。截取前 CAP 段核心正文(保证能完成),并标注。
    CAP=180; tot=0; capped=[]
    for s in out:
        if tot>=CAP: break
        take=s["paras"][:CAP-tot]; tot+=len(take)
        capped.append({"sec":s["sec"],"paras":take})
    if tot<sum(len(s["paras"]) for s in out):
        capped.append({"sec":"Note","paras":[f"[This is a very long paper; the reader shows the first {tot} paragraphs of the main text. See the original PDF for the full content.]"]})
    return capped

TR_SYS=f"""你是 AI 论文的专业编辑兼译者。输入是一篇论文某一节的若干段落(JSON 数组),可能来自 PDF 抽取——单词常被空格打散、数学公式常被 OCR 错乱。对每一段做两件事,与输入段落**一一对应、等长**:
1) en:清理并重构英文原文——修复被打散的单词(如 "act i vat i on"→"activation")、还原通顺英文;数学公式重构为规范 LaTeX。
2) zh:译成准确通顺的学术中文,保留术语英文缩写(Transformer、attention、GPU 等)。
可用 Markdown(如 **强调**、列表)组织结构。严格用术语表。
**公式铁律(务必遵守)**:LaTeX 里的反斜杠 \\ 一律用符号 ⟐ 代替,绝不出现真正的反斜杠。行内公式包在 ⟐( ... ⟐),独立公式包在 ⟐[ ... ⟐]。命令也用 ⟐:如 ⟐frac{{a}}{{b}}、⟐sum、⟐alpha、⟐beta、⟐theta、⟐nabla、⟐partial。示例:能量写成 ⟐(E = -⟐sum_{{i<j}} w_{{ij}} s_i s_j⟐)。
只输出 JSON:{{"secZh":"该节中文小标题","en":["清理后英文1",...],"zh":["中文1",...]}}
术语表:
{GT}"""

def translate_items(sec):
    """arxiv HTML 路径:翻译 para item,eq/fig item 原位保留。返回 {sec,secZh,items:[...]}"""
    items=sec["items"]
    para_idx=[i for i,it in enumerate(items) if it.get("t")=="para"]
    texts=[items[i]["en"] for i in para_idx]
    if not texts:
        return {"sec":sec["sec"],"secZh":sec["sec"],"items":items}
    BATCH=5; chunks=[texts[i:i+BATCH] for i in range(0,len(texts),BATCH)]
    res=[None]*len(chunks)
    with ThreadPoolExecutor(max_workers=5) as ex:   # 节内批次并行(大节提速)
        futs={ex.submit(call,TR_SYS,f"节标题: {sec['sec']}\n段落: "+json.dumps(c,ensure_ascii=False),12000):ci for ci,c in enumerate(chunks)}
        for f in as_completed(futs):
            ci=futs[f]
            try: res[ci]=f.result()
            except Exception: res[ci]={"en":chunks[ci],"zh":[""]*len(chunks[ci])}   # 单批失败回退原文,不拖垮整篇
    en_out=[]; zh=[]; secZh=None
    for ci,r in enumerate(res):
        chunk=chunks[ci]
        if secZh is None: secZh=r.get("secZh",sec["sec"])
        en=r.get("en",[]); z=r.get("zh",[])
        if len(en)!=len(chunk): en=(en+chunk)[:len(chunk)]
        if len(z)!=len(chunk): z=(z+[""]*len(chunk))[:len(chunk)]
        en_out.extend([(x or "").replace("⟐","\\") for x in en])
        zh.extend([(x or "").replace("⟐","\\") for x in z])
    out=[dict(it) for it in items]
    for k,i in enumerate(para_idx):
        out[i]={"t":"para","en":en_out[k],"zh":zh[k]}
    return {"sec":sec["sec"],"secZh":secZh or sec["sec"],"items":out}

def translate_section(sec):
    paras=sec["paras"]
    if not paras: return {"sec":sec["sec"],"secZh":sec["sec"],"paras":[]}
    # 分节差的 PDF 会出现「一节几十上百段」,一次翻译会超 token 被截断(JSON 报错)。按 10 段分批。
    # en 也重新清理(修 PDF 打散/公式转 LaTeX),故同时收集 en_out。
    BATCH=5; chunks=[paras[i:i+BATCH] for i in range(0,len(paras),BATCH)]   # 批次并行,大节提速
    res=[None]*len(chunks)
    with ThreadPoolExecutor(max_workers=5) as ex:
        futs={ex.submit(call,TR_SYS,f"节标题: {sec['sec']}\n段落: "+json.dumps(c,ensure_ascii=False),12000):ci for ci,c in enumerate(chunks)}
        for f in as_completed(futs):
            ci=futs[f]
            try: res[ci]=f.result()
            except Exception: res[ci]={"en":chunks[ci],"zh":[""]*len(chunks[ci])}   # 单批失败回退原文,不拖垮整篇
    en_out=[]; zh=[]; secZh=None
    for ci,r in enumerate(res):
        chunk=chunks[ci]
        if secZh is None: secZh=r.get("secZh",sec["sec"])
        en=r.get("en",[]); z=r.get("zh",[])
        if len(en)!=len(chunk): en=(en+chunk)[:len(chunk)]   # 清理失败回退原文
        if len(z)!=len(chunk): z=(z+[""]*len(chunk))[:len(chunk)]
        en_out.extend([(x or "").replace("⟐","\\") for x in en])
        zh.extend([(x or "").replace("⟐","\\") for x in z])
    return {"sec":sec["sec"],"secZh":secZh or sec["sec"],"paras":[{"en":e,"zh":z} for e,z in zip(en_out,zh)]}

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
    ap.add_argument("--force-pdf",action="store_true",help="跳过HTML/ar5iv直接PDF抽正文(HTML为残缺页时用)")
    a=ap.parse_args(); aid=a.arxiv.strip()
    pid=a.pid; pid_id=f"{pid}-{aid}"
    print(f"[1/4] arXiv 元数据 {aid}",file=sys.stderr)
    title,summ,pub,authors,cat=arxiv_meta(aid)
    figdir=str(ROOT/"assets"/"paperfigs"/pid_id)
    print(f"[2/4] arXiv 原生 HTML 正文(含显示公式+图)",file=sys.stderr)
    def _nparas(ss):
        return sum(len(x.get('items',x.get('paras',[]))) for x in (ss or []))
    if a.force_pdf:   # HTML 为残缺页(只含部分节)时强制 PDF
        print("   --force-pdf → 直接 PDF 抽正文",file=sys.stderr); secs=pdf_sections(aid); use_items=False
    else:
        secs=arxiv_html.extract(aid,figdir=figdir); use_items=bool(secs)
        if _nparas(secs)<6:   # arXiv HTML 无/占位页 → 退回 ar5iv
            print("   arxiv HTML 无 → 退回 ar5iv",file=sys.stderr); secs=ar5iv_sections(aid); use_items=False
        if _nparas(secs)<6:   # ar5iv 也是占位页(<6段) → PDF 兜底
            print("   ar5iv 无正文 → PDF 兜底(pdftotext)",file=sys.stderr); secs=pdf_sections(aid); use_items=False
    if not secs:
        print("   ⚠️ 所有正文源均失败,仅摘要",file=sys.stderr); secs=[]
    cnt=sum(len(s.get('items',s.get('paras',[]))) for s in secs)
    print(f"   {len(secs)} 节 / {cnt} 块(items={use_items})",file=sys.stderr)
    print(f"[3/4] 逐段翻译 + 贡献/局限 + 元信息",file=sys.stderr)
    full=[None]*len(secs); tr=translate_items if use_items else translate_section
    with ThreadPoolExecutor(max_workers=3) as ex:   # 节级并发 3 × 批次并发 5 = 最多 15 并发
        futs={ex.submit(tr,s):i for i,s in enumerate(secs)}
        for f in as_completed(futs): full[futs[f]]=f.result()
    para_ens=lambda s:[it["en"] for it in s.get("items",[]) if it.get("t")=="para"] or [p["en"] for p in s.get("paras",[])]
    ctx=title+"\n"+summ+"\n"+" ".join(e for s in full for e in para_ens(s))[:60000]
    try: ins=call(INS_SYS,ctx,mx=6000)
    except Exception: ins={"contrib":[],"limits":[]}    # 限流失败不拖垮整篇(正文已译好,别丢)
    try: m=meta_zh(title,summ)
    except Exception: m={}
    fields=[x.strip() for x in a.fields.split(",") if x.strip()]
    pid=a.pid; pid_id=f"{pid}-{aid}"
    paper={"id":pid_id,"pid":pid,"arxiv":aid,"date":pub,"venue":cat,"fields":fields,
           "tEn":title,"tZh":m.get("tZh",title),"sEn":m.get("sEn",""),"sZh":m.get("sZh",""),
           "absEn":summ,"absZh":m.get("absZh",""),"insights":ins,
           "addedAt":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())}   # 收录时间戳(首页按此排最新)
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
