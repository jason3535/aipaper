#!/usr/bin/env python3
"""arxiv_html.py — 从 arXiv 原生 HTML(arxiv.org/html/<id>, LaTeXML 渲染)有序提取正文。
产出 sections=[{sec, items:[{t:'para',en}|{t:'eq',tex}|{t:'fig',src,capEn}]}]。

要点(相对旧 ar5iv 抓取的修复):
- 源换成 arxiv.org/html(ar5iv.org 已重定向到摘要页,拿不到正文);
- 显示公式(<table class=ltx_equation*> / <math display=block>)按序作为 eq item 保留——旧管线整块丢弃;
- 行内公式 <math> → \\(annotation\\) 就地保留;
- 图 <figure class=ltx_figure> 下载 img 到 assets/paperfigs/<id>/ 并作为 fig item 内联。
无 arxiv HTML 的论文(老论文/未渲染)返回 None,交给 PDF 兜底。
"""
import html as H
import os
import re
import subprocess
import urllib.request
from bs4 import BeautifulSoup

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15"}
_OPX = urllib.request.build_opener(urllib.request.ProxyHandler(
    {"http": "http://127.0.0.1:7890", "https": "http://127.0.0.1:7890"}))


def fetch(aid):
    """返回 (html, base_url) 或 None。依次试 无版本/v1/v2/v3。"""
    for suf in ["", "v1", "v2", "v3"]:
        url = f"https://arxiv.org/html/{aid}{suf}"
        try:
            r = _OPX.open(urllib.request.Request(url, headers=UA), timeout=60)
            doc = r.read().decode("utf-8", "ignore")
            if doc.count('class="ltx_p"') >= 3:      # 真有正文(非摘要页/404)
                page = r.geturl()                     # 跟随重定向后的实际页面 URL(含版本号)
                return doc, page if page.endswith("/") else page + "/"
        except Exception:
            continue
    return None


def _tex_from_math(math):
    """取 <math> 的 LaTeX:优先 annotation(application/x-tex),退回 alttext。清掉 \\displaystyle。"""
    ann = math.find("annotation", attrs={"encoding": "application/x-tex"})
    tex = ann.get_text() if ann else (math.get("alttext") or "")
    tex = H.unescape(tex).replace("\\displaystyle", "").strip()
    return re.sub(r"\s+", " ", tex)


def _para_text(p):
    """段落文本,行内 <math> 就地换成 \\( latex \\)。"""
    out = "".join(_walk_inline(el) for el in p.children)
    out = re.sub(r"\s*\[\s*\]", "", out)              # 去掉引用被删后留下的空 []
    return re.sub(r"\s+", " ", out).strip()


def _walk_inline(el):
    name = getattr(el, "name", None)
    if name is None:                                  # NavigableString
        return str(el)
    if name == "math":
        return f" \\({_tex_from_math(el)}\\) "
    if name == "cite":                                # 参考文献引用:丢弃(bibkey 不适合正文展示)
        return ""
    if name == "sup" and "ltx_note" in (el.get("class") or []):
        return ""
    return "".join(_walk_inline(c) for c in el.children)


def _eq_tex(node):
    """把一个 equation 块(table/div)内所有 math 拼成 LaTeX。
    每行的多个 math 单元用 & 对齐(LaTeXML 把 lhs/=/rhs 拆成独立单元),多行用 \\ 分隔,
    含对齐/多行的整体包进 \\begin{aligned}(否则裸 \\ 在 \\[..\\] 里不成立、= 也不对齐)。"""
    rows = node.find_all("tr") if node.name == "table" else [node]
    out_rows = []
    for row in rows:
        cells = [t for t in (_tex_from_math(m) for m in row.find_all("math")) if t]
        if cells:
            out_rows.append(" & ".join(cells) if len(cells) > 1 else cells[0])
    if not out_rows:
        return ""
    if len(out_rows) > 1 or " & " in out_rows[0]:
        return "\\begin{aligned} " + " \\\\ ".join(out_rows) + " \\end{aligned}"
    return out_rows[0].strip()


def _iter_blocks(el):
    """按文档顺序产出块元素(header/para/eq/fig);命中块后不再递归进入,避免重复。"""
    name = getattr(el, "name", None)
    if name is None:
        return
    cls = el.get("class") or []
    is_header = name in ("h1", "h2", "h3", "h4") and any("ltx_title" in c for c in cls)
    is_eq = name in ("table", "div") and any("ltx_equation" in c for c in cls)
    is_fig = name == "figure" and "ltx_figure" in cls
    is_para = name == "p" and "ltx_p" in cls
    if is_header or is_eq or is_fig or is_para:
        yield el
        return
    for c in el.children:
        yield from _iter_blocks(c)


def extract(aid, figdir=None):
    """返回 sections 或 None。figdir:图片下载目录(assets/paperfigs/<id>)。"""
    got = fetch(aid)
    if not got:
        return None
    doc, base = got
    soup = BeautifulSoup(doc, "html.parser")
    art = soup.find("article") or soup.find("div", class_="ltx_page_content") or soup
    secs = []
    cur = {"sec": "Abstract", "items": []}
    fig_i = 0

    def flush(title=None):
        if cur["items"]:
            secs.append({"sec": cur["sec"], "items": cur["items"][:]})
        cur["items"].clear()
        if title is not None:
            cur["sec"] = title

    for el in _iter_blocks(art):
        cls = el.get("class") or []
        name = el.name
        if name in ("h1", "h2", "h3", "h4"):
            flush(re.sub(r"\s+", " ", el.get_text()).strip())
            continue
        if name in ("table", "div"):                  # 显示公式
            tex = _eq_tex(el)
            if tex and len(tex) > 2:
                cur["items"].append({"t": "eq", "tex": tex})
            continue
        if name == "figure":
            img = el.find("img")
            if img and img.get("src"):
                cap = el.find("figcaption")
                capen = re.sub(r"\s+", " ", cap.get_text()).strip() if cap else ""
                fig_i += 1
                local = _dl_fig(base, img["src"], aid, fig_i, figdir)
                if local:
                    cur["items"].append({"t": "fig", "src": local, "capEn": capen[:300]})
            continue
        if name == "p":                               # 段落(含行内公式)
            t = _para_text(el)
            if len(t) > 25 and not t.lower().startswith(("figure", "table")):
                cur["items"].append({"t": "para", "en": t})
    flush()

    out = []                                          # 丢弃 References 及之后
    for s in secs:
        if re.match(r"\s*(references|acknowledg|appendix|bibliography)", s["sec"], re.I):
            break
        if s["items"]:
            out.append(s)
    return out or None


def _dl_fig(base, src, aid, n, figdir):
    if not figdir:
        return None
    os.makedirs(figdir, exist_ok=True)
    from urllib.parse import urljoin
    url = src if src.startswith("http") else urljoin(base, src.lstrip("./"))
    ext = os.path.splitext(src)[1].lower() or ".png"
    if ext not in (".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"):
        ext = ".png"
    out = os.path.join(figdir, f"fig{n}{ext}")
    try:
        subprocess.run(["curl", "-sL", "--max-time", "40", "-A", UA["User-Agent"], "-o", out, url],
                       check=False)
        if os.path.exists(out) and os.path.getsize(out) > 800:
            return f"/assets/paperfigs/{aid_dir(aid, figdir)}/fig{n}{ext}"
    except Exception:
        pass
    return None


def aid_dir(aid, figdir):
    return os.path.basename(figdir.rstrip("/"))


if __name__ == "__main__":
    import json
    import sys
    secs = extract(sys.argv[1], figdir=sys.argv[2] if len(sys.argv) > 2 else None)
    if not secs:
        print("无 arxiv HTML(需 PDF 兜底)"); sys.exit(1)
    p = e = f = 0
    for s in secs:
        for it in s["items"]:
            if it["t"] == "eq": e += 1
            elif it["t"] == "fig": f += 1
            else: p += 1
    print(f"节 {len(secs)} | 段 {p} | 公式 {e} | 图 {f}")
    print(json.dumps(secs[:2], ensure_ascii=False)[:800])
