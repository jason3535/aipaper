#!/usr/bin/env python3
"""pdf_crop_figs.py — arXiv HTML 没有可用图时的兜底:从 PDF 页面按图注位置裁出插图(矢量图也能拿到)。

pdfimages 只能拿内嵌位图,ML 论文的曲线/示意图多是矢量,提不出来;add_pdf_pagefigs 整页渲染又太粗。
这里用 pdftotext -bbox-layout 找每页「Figure N:」图注块,图在图注**上方**(ML 论文惯例):
  水平范围 = 图注宽过版心 60% 就取整个版心,否则取图注所在栏;
  上界 = 同栏内图注上方最近的「正文块」(≥2 行且行宽 ≥ 栏宽 70%)/图注/表注/顶格节标题/页眉的底边,没有就到版心顶;
pdftoppm 按 200dpi 渲染该区域 → PIL 裁白边 → 太矮(<60px)的丢弃(图注在图上方的版式会落到这里)。
同一图号只取第一次出现的页(附录常复用「Figure 1」字样做引用)。
  extract(pdf_path) -> [(fignum, png_bytes, caption_en)]
"""
import html, io, re, subprocess, tempfile, os
from PIL import Image, ImageChops

CAPRX = re.compile(r"^(?:Figure|Fig\.|FIGURE)\s*(\d+)\s*(?:[:.|]|\s+[A-Z])")   # 「Figure 1 Overall…」(Seed 系无冒号)
TABRX = re.compile(r"^Table\s*\d+\s*[:.|]")
HEADRX = re.compile(r"^(?:[A-Z]|\d+(?:\.\d+)*)\.?\s+[A-Z][A-Za-z-]+(?:\s+\S+){0,8}$")   # 「G CIFAR-10 ResNet samples」「4.2 Results」
NUMHEAD = re.compile(r"^\d+(?:\.\d+)+\s+[A-Z]")        # 「2.3 Model Architecture」:带点编号的节标题不论缩进
RUNHEAD = re.compile(r"^\d+\s|\s\d+$")                    # 页眉行首/行尾带页码(或年份);图顶的列标签没有
SECNO = re.compile(r"^(?:[A-Z]|\d+(?:\.\d+)*|[A-Z]\.\d+(?:\.\d+)*)\.?$")   # 节号单独成块(「2.3」「G」),标题在右边另一块
DPI = 200


def blocks_of(pdf, pg):
    x = subprocess.run(["pdftotext", "-f", str(pg), "-l", str(pg), "-bbox-layout", pdf, "-"],
                       capture_output=True, text=True).stdout
    pm = re.search(r'<page width="([\d.]+)" height="([\d.]+)"', x)
    if not pm:
        return None, None, []
    W, H = float(pm.group(1)), float(pm.group(2))
    out = []
    for bm in re.finditer(r'<block xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</block>', x, re.S):
        lines = []
        for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="[\d.]+" xMax="([\d.]+)"[^>]*>(.*?)</line>', bm.group(5), re.S):
            words = [html.unescape(w) for w in re.findall(r">([^<]*)</word>", lm.group(3))]
            lines.append((float(lm.group(1)), float(lm.group(2)), " ".join(words)))
        out.append(dict(x0=float(bm.group(1)), y0=float(bm.group(2)), x1=float(bm.group(3)), y1=float(bm.group(4)),
                        lines=lines, text=" ".join(l[2] for l in lines)))
    return W, H, out


def trim(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    box = ImageChops.difference(im, bg).convert("L").point(lambda v: 255 if v > 18 else 0).getbbox()
    return im.crop(box) if box else None


def render(pdf, pg, x0, y0, x1, y1):
    k = DPI / 72
    with tempfile.TemporaryDirectory() as td:
        out = os.path.join(td, "r")
        subprocess.run(["pdftoppm", "-f", str(pg), "-l", str(pg), "-r", str(DPI), "-png", "-singlefile",
                        "-x", str(int(x0 * k)), "-y", str(int(y0 * k)), "-W", str(int((x1 - x0) * k)),
                        "-H", str(int((y1 - y0) * k)), pdf, out], capture_output=True)
        if not os.path.exists(out + ".png"):
            return None
        im = Image.open(out + ".png").convert("RGB")
        im.load()
        return im


def extract(pdf):
    info = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
    npages = int((re.search(r"Pages:\s+(\d+)", info) or [0, 0])[1])
    seen, res = set(), []
    for pg in range(1, npages + 1):
        W, H, bl = blocks_of(pdf, pg)
        if not bl:
            continue
        L, R = min(b["x0"] for b in bl), max(b["x1"] for b in bl)       # 版心
        T = min(b["y0"] for b in bl)
        tw = R - L
        # 书的页眉「2. LEARNING IN HIGH DIMENSIONS | 7」章名与页码分属两块:同一行旁边有个纯数字块就是页眉
        pageno_beside = lambda o: any(q is not o and q["text"].strip().isdigit() and abs(q["y0"] - o["y0"]) < 4 for q in bl)
        for b in bl:
            m = CAPRX.match(b["text"])
            if not m:
                continue
            n = int(m.group(1))
            if n in seen:
                continue
            cw = b["x1"] - b["x0"]
            if cw > 0.6 * tw:
                cx0, cx1 = L, R
            elif (b["x0"] + b["x1"]) / 2 < (L + R) / 2:
                cx0, cx1 = L, (L + R) / 2
            else:
                cx0, cx1 = (L + R) / 2, R
            colw = cx1 - cx0
            top = T
            for o in bl:
                if o is b or o["y1"] > b["y0"] + 1 or o["x1"] < cx0 or o["x0"] > cx1:
                    continue
                body = len(o["lines"]) >= 2 and sum(l[1] - l[0] for l in o["lines"]) / len(o["lines"]) >= 0.7 * colw
                header = o["y1"] < 0.09 * H or (len(o["lines"]) == 1 and o["y0"] - T < 4 and (RUNHEAD.search(o["text"]) or pageno_beside(o)))   # 页眉(「Under review … ICLR」/书的章名|页码)
                heading = len(o["lines"]) == 1 and (NUMHEAD.match(o["text"]) or abs(o["x0"] - cx0) < 6 and (HEADRX.match(o["text"]) or SECNO.match(o["text"])))
                if body or header or heading or CAPRX.match(o["text"]) or TABRX.match(o["text"]):
                    top = max(top, o["y1"])
            if b["y0"] - top < 30:          # 图注上方没空间:图在图注下方或根本不是图,放弃
                continue
            lh = 3      # bbox 的 yMin 不含上伸部,多让 3pt 免得带进图注首行
            im = render(pdf, pg, cx0 - 4, top + 1, cx1 + 4, b["y0"] - lh)
            im = trim(im) if im else None
            if not im or im.height < 60 or im.width < 120:
                continue
            cap = b["text"]
            if len(cap) < 16:                # 「Fig. 2.」单独成块(Signal Processing Magazine 版式):接上紧随其后的说明块
                nxt = min((o for o in bl if o["y0"] >= b["y0"] - 1 and o is not b and o["x0"] < b["x1"] + 40),
                          key=lambda o: (abs(o["y0"] - b["y0"]), o["x0"]), default=None)
                if nxt and abs(nxt["y0"] - b["y0"]) < 14:
                    cap += " " + nxt["text"]
            cap = re.sub(r"(\w)- (\w)", r"\1\2", cap)
            seen.add(n)
            buf = io.BytesIO()
            if max(im.size) > 1400:
                im.thumbnail((1400, 1400))
            im.save(buf, "WEBP", quality=86)
            res.append((n, buf.getvalue(), cap, pg))
    return res


if __name__ == "__main__":
    import sys
    pdf, outdir = sys.argv[1], sys.argv[2]
    os.makedirs(outdir, exist_ok=True)
    for n, b, cap, pg in extract(pdf):
        open(os.path.join(outdir, f"fig{n:02d}.webp"), "wb").write(b)
        print(f"Fig {n} p{pg}: {cap[:90]}")
