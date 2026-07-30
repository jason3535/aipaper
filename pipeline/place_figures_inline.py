#!/usr/bin/env python3
"""place_figures_inline.py — 把论文末尾「Figures」画廊里的图,按图号插到正文首次引用「Figure N / 图 N」的段落之后。
匹配不到引用的图,仍保留在末尾画廊。用法: python place_figures_inline.py <id> ..."""
import json, re, sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"


def fignum(fig):
    """从 capEn 'Figure N (...)' 取图号(=pdfimages 提取序);作为该图的编号。"""
    m = re.search(r"Figure\s+(\d+)", fig.get("capEn", ""))
    return int(m.group(1)) if m else None


def refs_num(text, n):
    return bool(re.search(rf"\b[Ff]ig(?:ure)?\.?\s*{n}\b|图\s*{n}\b", text or ""))


def process(pid):
    fp = DATA / f"{pid}.json"
    d = json.loads(fp.read_text(encoding="utf-8"))
    figsec = next((s for s in d["full"] if s.get("sec") == "Figures"), None)
    if not figsec:
        print(f"  {pid}: 无 Figures 画廊,跳过"); return
    figs = [it for it in figsec.get("items", []) if it.get("t") == "fig"]
    body = [s for s in d["full"] if s.get("sec") != "Figures"]
    # 统一把各节转成 items(便于插图)
    for s in body:
        if "items" not in s:
            s["items"] = [{"t": "para", "en": p.get("en", ""), "zh": p.get("zh", "")} for p in s.get("paras", [])]
            s.pop("paras", None)
    placed, leftover = set(), []
    for fig in figs:
        n = fignum(fig)
        done = False
        if n is not None:
            for s in body:
                for i, it in enumerate(s["items"]):
                    if it.get("t") == "para" and (refs_num(it.get("en", ""), n) or refs_num(it.get("zh", ""), n)):
                        s["items"].insert(i + 1, fig); placed.add(id(fig)); done = True; break
                if done: break
        if not done:
            leftover.append(fig)
    d["full"] = body
    if leftover:   # 没匹配到引用的图仍放末尾画廊
        d["full"].append({"sec": "Figures", "secZh": "论文插图", "items": leftover})
    fp.write_text(json.dumps(d, ensure_ascii=False), encoding="utf-8")
    print(f"  {pid}: 内联放置 {len(placed)} 张, 末尾保留 {len(leftover)} 张")


if __name__ == "__main__":
    for pid in sys.argv[1:]:
        process(pid)
