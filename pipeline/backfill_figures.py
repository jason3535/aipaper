#!/usr/bin/env python3
"""backfill_figures.py — 给「正文引用了 Figure N、库里却一张图都没有」的 arXiv 论文补图,不动已有译文。

2026-10-28 审计:44 篇 arXiv 论文 0 图(Llama 3 / Gemini / InstructGPT 系 Anthropic 报告等),
多是收录时 arxiv.org/html 还没渲染或走了 PDF/摘要兜底。现在 HTML 大多有了。

流程:arxiv.org/html/<id>(不行再 ar5iv.labs;都没图再走 pdf_crop_figs 从 PDF 按图注裁)→ 取顶层 <figure class=ltx_figure>(表格不要)
→ 子图多张就横向拼成一张 → 1400px/q86 WebP 写进图床仓库 ~/CascadeProjects/aipaper-figs
  (文件名 = md5(原图 URL)[:16],与历史 3020 张同一规则,figs.jasonlin.tech 由 GitHub Pages 托管)
→ 图注 DeepSeek 译中文 → 作为「Figures」画廊节追加 → place_figures_inline 按图号插到首次引用段之后。

  python backfill_figures.py <paper-id> ...      需 DEEPSEEK_API_KEY;arXiv 走 Clash(7890)
  python backfill_figures.py --scan              列出 0 图且引用 ≥3 张图的 arXiv 论文
跑完要去图床仓库 commit+push,再跑本仓库 postingest。
"""
import hashlib, io, json, os, re, subprocess, sys, tempfile, urllib.request
from pathlib import Path
from urllib.parse import urljoin

from bs4 import BeautifulSoup
from PIL import Image

sys.path.insert(0, str(Path(__file__).resolve().parent))
from add_paper import call
import place_figures_inline
import pdf_crop_figs

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data"
FIGREPO = Path.home() / "CascadeProjects" / "aipaper-figs"
FIGHOST = "https://figs.jasonlin.tech/"
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15"}
OPX = urllib.request.build_opener(urllib.request.ProxyHandler(
    {"http": "http://127.0.0.1:7890", "https": "http://127.0.0.1:7890"}))


def get(url, tries=3):
    for _ in range(tries):
        try:
            return OPX.open(urllib.request.Request(url, headers=UA), timeout=60).read()
        except Exception:
            pass
    return None


def page(aid):
    for u in (f"https://arxiv.org/html/{aid}", f"https://arxiv.org/html/{aid}v1", f"https://ar5iv.labs.arxiv.org/html/{aid}"):
        b = get(u)
        if b and b"ltx_figure" in b and b"ltx_abstract" in b:   # ar5iv 无渲染时会 302 到摘要页
            return b.decode("utf-8", "ignore"), u
    return None, None


def all_figs(full):
    return [it for s in full for it in (s.get("items") or []) if it.get("t") == "fig"]


def fig_refs(full):
    txt = " ".join((it.get("en") or "") for s in full for it in (s.get("items") or s.get("paras") or []) if isinstance(it, dict))
    return len(set(re.findall(r"\b(?:Figure|Fig\.)\s*(\d+)", txt)))


SVG2PNG = Path.home() / ".graph-og-build" / "svg2png.mjs"   # playwright-core + 本机缓存的 headless chromium
_RASTER = {}


def raster_svgs(urls):
    """SVG(LaTeXML 用 <object> 嵌的 matplotlib 图)PIL 打不开,ImageMagick 渲字体又很糟:
    整篇的 SVG 一次性交给 Chromium 截图,结果缓存进 _RASTER[url]=png bytes。"""
    urls = [u for u in urls if u.lower().endswith(".svg") and u not in _RASTER]
    if not urls:
        return
    with tempfile.TemporaryDirectory() as td:
        args = []
        for i, u in enumerate(urls):
            b = get(u)
            if b:
                open(os.path.join(td, f"{i}.svg"), "wb").write(b)
                args += [os.path.join(td, f"{i}.svg"), os.path.join(td, f"{i}.png")]
        if args:
            subprocess.run(["node", str(SVG2PNG)] + args, cwd=SVG2PNG.parent, capture_output=True, timeout=900)
        for i, u in enumerate(urls):
            fp = os.path.join(td, f"{i}.png")
            if os.path.exists(fp):
                _RASTER[u] = open(fp, "rb").read()


def compose(urls):
    ims = []
    for u in urls[:6]:
        b = _RASTER.get(u) or (None if u.lower().endswith(".svg") else get(u))
        if not b:
            continue
        try:
            im = Image.open(io.BytesIO(b))
            im.load()
        except Exception:
            continue        # svg 等 PIL 打不开的跳过
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            bg = Image.new("RGB", im.size, "white"); bg.paste(im, mask=im.split()[-1]); im = bg
        ims.append(im.convert("RGB"))
    if not ims:
        return None
    if len(ims) > 1:   # 子图横向拼(统一高度),和原文 subfigure 版式接近
        hh = min(max(i.height for i in ims), 900)
        ims = [i.resize((max(1, i.width * hh // i.height), hh)) for i in ims]
        out = Image.new("RGB", (sum(i.width for i in ims) + 16 * (len(ims) - 1), hh), "white")
        x = 0
        for i in ims:
            out.paste(i, (x, 0)); x += i.width + 16
        ims = [out]
    im = ims[0]
    if im.width < 120 or im.height < 60:
        return None
    if max(im.size) > 1400:
        im.thumbnail((1400, 1400))
    buf = io.BytesIO(); im.save(buf, "WEBP", quality=86)
    return buf.getvalue()


def extract(aid):
    html, base = page(aid)
    if not html:
        return []
    soup = BeautifulSoup(html, "html.parser")
    bt = soup.find("base")
    base = urljoin(base, bt["href"]) if bt and bt.get("href") else base   # 相对路径按页面 URL 解析(不补斜杠)
    tops = [f for f in soup.select("figure.ltx_figure") if not f.find_parent("figure")]
    srcs_of = lambda fig: [urljoin(base, x.get("src") or x.get("data")) for x in fig.find_all(["img", "object"])
                           if (x.get("src") or x.get("data"))]
    raster_svgs([u for f in tops for u in srcs_of(f)])
    out = []
    for fig in tops:
        caps = fig.find_all("figcaption")       # 外层图注在子图图注之后,取直系的,没有就取最后一个
        cap = fig.find("figcaption", recursive=False) or (caps[-1] if caps else None)
        capEn = re.sub(r"\s+", " ", cap.get_text()).strip() if cap else ""
        m = re.match(r"(?:Figure|Fig\.)\s*(\d+)\s*[:.]?\s*", capEn)
        if not m:
            continue                            # 无图号的(装饰图/算法框)放不回正文,不要
        srcs = srcs_of(fig)
        if not srcs:
            continue
        orig = srcs[0]
        h = hashlib.md5(orig.encode()).hexdigest()[:16]
        dst = FIGREPO / f"{h}.webp"
        if not dst.exists():
            b = compose(srcs)
            if not b:
                continue
            dst.write_bytes(b)
        out.append({"t": "fig", "src": FIGHOST + f"{h}.webp", "capEn": f"Figure {m.group(1)}: " + capEn[m.end():][:600],
                    "origSrc": orig})
    return out


PDF_SKIP = {"2104.13478": {11}}   # 人工看过裁得不干净的(书的旁注栏把正文一起框进来)


def extract_pdf(aid):
    """HTML 没图时的兜底:arxiv.org/pdf 按图注位置裁图(pdf_crop_figs),矢量图也能拿到。"""
    b = get(f"https://arxiv.org/pdf/{aid}")
    if not b or not b.startswith(b"%PDF"):
        return []
    out = []
    with tempfile.TemporaryDirectory() as td:
        pdf = os.path.join(td, "p.pdf")
        open(pdf, "wb").write(b)
        for n, img, cap, pg in pdf_crop_figs.extract(pdf):
            if n in PDF_SKIP.get(aid, ()):
                continue
            orig = f"https://arxiv.org/pdf/{aid}#page={pg}&fig={n}"
            h = hashlib.md5(orig.encode()).hexdigest()[:16]
            dst = FIGREPO / f"{h}.webp"
            if not dst.exists():
                dst.write_bytes(img)
            m = re.match(r"(?:Figure|Fig\.|FIGURE)\s*\d+\s*[:.|]?\s*", cap)
            out.append({"t": "fig", "src": FIGHOST + f"{h}.webp", "capEn": f"Figure {n}: " + cap[m.end():][:600],
                        "origSrc": orig})
    return out


CAP_SYS = """你是 AI 论文译者。把输入的论文图注(JSON 数组)逐条译成准确地道的中文,等长一一对应;
「Figure N:」译作「图 N：」,公式/变量/模型名保留原文。只输出 JSON:{"zh":["...", ...]}"""


def translate(caps):
    out = []
    for i in range(0, len(caps), 10):
        chunk = caps[i:i + 10]
        z = (call(CAP_SYS, json.dumps(chunk, ensure_ascii=False), 6000) or {}).get("zh") or []
        out += (z + [""] * len(chunk))[:len(chunk)]
    return out


def process(pid):
    fp = DATA / f"{pid}.json"
    d = json.loads(fp.read_text(encoding="utf-8"))
    if all_figs(d["full"]):
        return f"{pid}: 已有图,跳过"
    aid = d.get("arxiv")
    if not aid:
        return f"{pid}: 非 arXiv,跳过"
    figs, how = extract(aid), "HTML"
    if not figs:
        figs, how = extract_pdf(aid), "PDF 裁图"
    if not figs:
        return f"{pid}: arXiv HTML/PDF 都无可用图"
    seen, uniq = set(), []
    for f in figs:                           # 同一图号只留第一张
        n = place_figures_inline.fignum(f)
        if n in seen:
            continue
        seen.add(n); uniq.append(f)
    for f, z in zip(uniq, translate([f["capEn"] for f in uniq])):
        f["capZh"] = z
    d["full"] = [s for s in d["full"] if s.get("sec") != "Figures"] + [{"sec": "Figures", "secZh": "论文插图", "items": uniq}]
    fp.write_text(json.dumps(d, ensure_ascii=False), encoding="utf-8")
    place_figures_inline.process(pid)
    return f"{pid}: 补图 {len(uniq)} 张({how})"


def scan():
    rows = []
    for fp in sorted(DATA.glob("*.json")):
        try:
            d = json.loads(fp.read_text(encoding="utf-8"))
        except Exception:
            continue
        if isinstance(d, dict) and d.get("arxiv") and d.get("full") and not all_figs(d["full"]):
            r = fig_refs(d["full"])
            if r >= 3:
                rows.append((r, d["id"]))
    return [i for _, i in sorted(rows, reverse=True)]


if __name__ == "__main__":
    if sys.argv[1:] == ["--scan"]:
        print("\n".join(scan()))
        sys.exit()
    for pid in sys.argv[1:]:
        try:
            print(process(pid), flush=True)
        except Exception as e:
            print(f"{pid}: ✗ {str(e)[:120]}", flush=True)
