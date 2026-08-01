#!/usr/bin/env python3
"""fill_missing_zh.py — 补翻 data/<id>.json 里有 en 无 zh 的段落(PDF 兜底论文常见:
DeepSeek 每 chunk 返回译文短于输入,尾段丢中文且英文保留 PDF 乱码)。
用小 chunk(6 段)重翻,模型顺带清理英文乱码,写回 en+zh。用法: python fill_missing_zh.py <id> [<id>...]"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from add_paper import call, TR_SYS

import re as _re
def _is_prose(en):
    """判断段落是否为真正的散文(值得翻译)。纯公式/表格/数字网格/参数转储
    翻译无意义,且 DeepSeek 对其常返回空响应触发大量重试拖慢整体——直接跳过。"""
    en=(en or "").strip()
    if not en: return False
    words=_re.findall(r'[A-Za-z]{3,}', en)
    alpha=sum(c.isalpha() or c.isspace() for c in en)/max(len(en),1)
    return len(words)>=8 and alpha>0.5

def fill(fid):
    f=f"data/{fid}.json"
    d=json.load(open(f,encoding="utf-8"))
    total=filled=skipped=0
    for s in d.get("full",[]):
        key="items" if "items" in s else "paras"
        arr=s.get(key,[])
        # items 结构:只补 t==para;paras 结构:全是段落。仅翻散文,公式/表格碎片跳过
        if key=="items":
            cand=[(i,it) for i,it in enumerate(arr) if it.get("t")=="para" and not (it.get("zh","") or "").strip()]
        else:
            cand=[(i,it) for i,it in enumerate(arr) if not (it.get("zh","") or "").strip()]
        targets=[(i,it) for i,it in cand if _is_prose(it.get("en",""))]
        skipped+=len(cand)-len(targets)
        total+=len(targets)
        def apply(chunk, r):
            nonlocal filled
            en=r.get("en",[]); zh=r.get("zh",[]); n=0
            for j,(idx,it) in enumerate(chunk):
                if j<len(zh) and zh[j].strip():
                    # ⟐ 是 TR_SYS 里 LaTeX 反斜杠的占位符,写回前必须还原(与 add_paper 一致)
                    it["zh"]=zh[j].replace("⟐","\\")
                    if j<len(en) and en[j].strip(): it["en"]=en[j].replace("⟐","\\")
                    filled+=1; n+=1
            return n
        for b in range(0,len(targets),3):   # 小 chunk(3)减少单段公式拖垮整批
            chunk=targets[b:b+3]
            texts=[it.get("en","") for _,it in chunk]
            try:
                r=call(TR_SYS, f"节标题: {s.get('sec','')}\n段落: "+json.dumps(texts,ensure_ascii=False), 6000)
                got=apply(chunk,r)
            except Exception:
                got=0
            if got<len(chunk):   # 整批/部分失败 → 逐段兜底(单段几乎总能成)
                for k,(idx,it) in enumerate(chunk):
                    if (it.get("zh","") or "").strip(): continue
                    try:
                        r1=call(TR_SYS, f"节标题: {s.get('sec','')}\n段落: "+json.dumps([it.get("en","")],ensure_ascii=False), 4000)
                        apply([chunk[k]], r1)
                    except Exception as e:
                        print(f"  单段失败 {fid}:", str(e)[:40], file=sys.stderr)
    json.dump(d, open(f,"w",encoding="utf-8"), ensure_ascii=False)
    print(f"{fid}: 补翻 {filled}/{total} (跳过公式碎片 {skipped})", file=sys.stderr)
    return filled

if __name__=="__main__":
    for fid in sys.argv[1:]:
        fill(fid)
    print("FILL_DONE", file=sys.stderr)
