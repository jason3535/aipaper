#!/usr/bin/env python3
"""gen_feed.py — 生成 RSS(/feed.xml):按 addedAt(收录时间)倒序取最近 30 篇论文/文章。
纯静态，零后端,与 build_share_pages.js 同批跑。用法: python3 gen_feed.py"""
import json, re, io, calendar
from datetime import datetime, timezone
from email.utils import formatdate
from pathlib import Path

BASE = Path(__file__).resolve().parent
ROOT = BASE.parent
SITE = "https://aipaper.jasonlin.tech"

html = io.open(ROOT / "app.js", encoding="utf-8").read()
papers = json.loads(re.search(r"const PAPERS\s*=\s*(\[.*?\]);", html, re.S).group(1))


def added_ts(p):
    s = p.get("addedAt") or ""
    try:
        dt = datetime.strptime(s, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
        return calendar.timegm(dt.timetuple())
    except Exception:
        return 0


rows = sorted(((added_ts(p), p) for p in papers if p.get("addedAt")),
              key=lambda x: -x[0])[:30]


def esc(s):
    return (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


items = []
for t, p in rows:
    ctx = esc(p.get("org") or p.get("venue") or "")
    title = esc(p.get("tZh") or p.get("tEn"))
    if ctx:
        title += f" — {ctx}"
    desc = esc(p.get("sZh") or p.get("sEn") or "")
    items.append(f"""  <item>
    <title>{title}</title>
    <link>{SITE}/p/{p['id']}/</link>
    <guid isPermaLink="true">{SITE}/p/{p['id']}/</guid>
    <pubDate>{formatdate(t)}</pubDate>
    <description>{desc}</description>
  </item>""")

feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>AI Paper · 双语论文全文</title>
  <link>{SITE}/</link>
  <atom:link href="{SITE}/feed.xml" rel="self" type="application/rss+xml"/>
  <description>著名 AI 学者的代表论文与长文，逐段中英对照 · 核心贡献 · 论文问答</description>
  <language>zh-cn</language>
  <lastBuildDate>{formatdate(rows[0][0] if rows else None)}</lastBuildDate>
{chr(10).join(items)}
</channel>
</rss>
"""
io.open(ROOT / "feed.xml", "w", encoding="utf-8").write(feed)
print(f"feed.xml: {len(items)} 条(按 addedAt)")
