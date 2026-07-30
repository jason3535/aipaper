#!/usr/bin/env python3
"""add_pdf_pagefigs.py — 扫描版论文补图:pdfimages 提不出独立图,改用 pdftotext 逐页找「Figure N」图注所在页,
pdftoppm 把那些页整页渲染成图片,按图号插到正文首次引用处。用法: python add_pdf_pagefigs.py <id> <pdf-url>"""
import json, os, re, subprocess, sys, tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
FIGDIR = ROOT / "assets" / "paperfigs"
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 "
      "(KHTML, like Gecko) Version/17.0 Safari/605.1.15")
# 图注模式:行首/独立的「Figure N」「Fig. N」后跟句点/冒号/说明,尽量避开正文「see Figure N」
CAP = re.compile(r"(?:^|\n)\s*(?:Figure|Fig\.?|FIGURE)\s+(\d+)\s*[\.:—\-]", re.M)


def refs_num(text, n):
    return bool(re.search(rf"\b[Ff]ig(?:ure)?\.?\s*{n}\b|图\s*{n}\b", text or ""))


def main():
    pid, url = sys.argv[1], sys.argv[2]
    fp = DATA / f"{pid}.json"
    d = json.loads(fp.read_text(encoding="utf-8"))
    dst = FIGDIR / pid; dst.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        pdf = os.path.join(td, "p.pdf")
        subprocess.run(["curl", "-sL", "--noproxy", "*", "-A", UA, "-o", pdf, "--max-time", "90", url], check=False)
        if not os.path.exists(pdf) or os.path.getsize(pdf) < 5000:
            print(f"  {pid}: PDF 下载失败"); return
        npages = 0
        info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
        mm = re.search(r"Pages:\s+(\d+)", info)
        if mm: npages = int(mm.group(1))
        # 逐页找图注 → {fignum: page}
        fig_page = {}
        for pg in range(1, npages + 1):
            txt = subprocess.run(["pdftotext", "-f", str(pg), "-l", str(pg), "-layout", pdf, "-"],
                                 capture_output=True, text=True).stdout
            for m in CAP.finditer(txt):
                n = int(m.group(1))
                fig_page.setdefault(n, pg)   # 该图号第一次出现图注的页
        if not fig_page:
            print(f"  {pid}: 未在页面文字层找到图注(Figure N)"); return
        # 渲染这些页
        figs = []
        for n, pg in sorted(fig_page.items()):
            subprocess.run(["pdftoppm", "-png", "-r", "130", "-f", str(pg), "-l", str(pg),
                            pdf, os.path.join(td, "pg")], capture_output=True)
            cand = [f for f in os.listdir(td) if f.startswith("pg") and f.endswith(".png")]
            src = None
            for f in cand:
                if f"-{pg:02d}." in f or f"-{pg}." in f or f.endswith(f"{pg}.png"):
                    src = os.path.join(td, f); break
            if not src and cand: src = os.path.join(td, sorted(cand)[0])
            if not src: continue
            out = dst / f"fig{n}.png"
            subprocess.run(["cp", src, str(out)], check=False)
            for f in cand:
                try: os.remove(os.path.join(td, f))
                except OSError: pass
            figs.append({"n": n, "page": pg, "file": f"fig{n}.png"})
    # 转 items + 内联插图
    body = d["full"]
    for s in body:
        if "items" not in s:
            s["items"] = [{"t": "para", "en": p.get("en", ""), "zh": p.get("zh", "")} for p in s.get("paras", [])]
            s.pop("paras", None)
    placed, leftover = 0, []
    for f in figs:
        fig = {"t": "fig", "src": f"/assets/paperfigs/{pid}/{f['file']}",
               "capEn": f"Figure {f['n']} (full page {f['page']} from original scan)",
               "capZh": f"图 {f['n']}（原文第 {f['page']} 页整页扫描）"}
        done = False
        for s in body:
            for i, it in enumerate(s["items"]):
                if it.get("t") == "para" and (refs_num(it.get("en", ""), f["n"]) or refs_num(it.get("zh", ""), f["n"])):
                    s["items"].insert(i + 1, fig); placed += 1; done = True; break
            if done: break
        if not done: leftover.append(fig)
    if leftover:
        body.append({"sec": "Figures", "secZh": "论文插图（原文扫描页）", "items": leftover})
    fp.write_text(json.dumps(d, ensure_ascii=False), encoding="utf-8")
    print(f"  {pid}: 渲染 {len(figs)} 个图注页, 内联 {placed} 张, 末尾 {len(leftover)} 张")


if __name__ == "__main__":
    main()
