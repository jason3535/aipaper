#!/usr/bin/env python3
"""add_pdf_figures.py — 给 PDF 来源的论文补图:pdfimages 提取 PDF 内嵌图片 → 存到 assets/paperfigs/<id>/
→ 作为末尾「论文插图 / Figures」节的 fig items 插进 data/<id>.json(不动已有译文)。

PDF 图是内嵌的、无网页 URL(Jina 抓不到),故单独用 poppler 的 pdfimages 提取并托管在本仓库(GitHub Pages)。
过滤:跳过过小(疑似 logo/图标)与极端长条(分隔线)。用法:
  python add_pdf_figures.py <paper-id> <pdf-url>
需要系统装 poppler(pdfimages/pdftoppm)。"""
import json, os, re, subprocess, sys, tempfile, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
FIGDIR = ROOT / "assets" / "paperfigs"
OPX = urllib.request.build_opener(urllib.request.ProxyHandler(
    {'http': 'http://127.0.0.1:7890', 'https': 'http://127.0.0.1:7890'}))


def extract(pid, pdf_url):
    dst = FIGDIR / pid
    dst.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        pdf = os.path.join(td, "p.pdf")
        try:
            data = OPX.open(urllib.request.Request(pdf_url, headers={"User-Agent": "Mozilla/5.0"}), timeout=90).read()
        except Exception:
            data = urllib.request.urlopen(pdf_url, timeout=90).read()
        open(pdf, "wb").write(data)
        # -list 拿每张图的页码/尺寸,过滤小图/长条
        lst = subprocess.run(["pdfimages", "-list", pdf], capture_output=True, text=True).stdout.splitlines()
        keep = []
        for ln in lst[2:]:
            f = ln.split()
            if len(f) < 5: continue
            try:
                page, num, w, h = int(f[0]), int(f[1]), int(f[3]), int(f[4])
            except ValueError:
                continue
            if w < 120 or h < 90: continue                    # 太小 = logo/图标
            if max(w, h) / max(1, min(w, h)) > 8: continue     # 长条 = 分隔线/页眉
            keep.append((num, page, w, h))
        if not keep:
            return []
        # 提取全部图为 png 到临时目录,再挑 keep 的
        subprocess.run(["pdfimages", "-png", pdf, os.path.join(td, "im")], capture_output=True)
        figs = []
        for i, (num, page, w, h) in enumerate(keep, 1):
            cand = os.path.join(td, f"im-{num:03d}.png")
            if not os.path.exists(cand):
                cand = os.path.join(td, f"im-{num}.png")
            if not os.path.exists(cand):
                continue
            out = dst / f"fig{i}.png"
            subprocess.run(["cp", cand, str(out)], check=False)
            figs.append({"i": i, "page": page, "file": f"fig{i}.png"})
    return figs


def main():
    if len(sys.argv) < 3:
        sys.exit("用法: add_pdf_figures.py <paper-id> <pdf-url>")
    pid, url = sys.argv[1], sys.argv[2]
    fp = DATA / f"{pid}.json"
    d = json.loads(fp.read_text(encoding="utf-8"))
    figs = extract(pid, url)
    if not figs:
        print(f"  {pid}: 未提取到合适插图"); return
    items = [{"t": "fig",
              "src": f"/assets/paperfigs/{pid}/{f['file']}",
              "capEn": f"Figure {f['i']} (from page {f['page']})",
              "capZh": f"图 {f['i']}（原文第 {f['page']} 页）"} for f in figs]
    # 去掉可能已存在的插图节,重建
    d["full"] = [s for s in d.get("full", []) if s.get("sec") != "Figures"]
    d["full"].append({"sec": "Figures", "secZh": "论文插图", "items": items})
    fp.write_text(json.dumps(d, ensure_ascii=False), encoding="utf-8")
    print(f"  {pid}: 插入 {len(figs)} 张图 → assets/paperfigs/{pid}/")


if __name__ == "__main__":
    main()
