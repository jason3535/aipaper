#!/usr/bin/env python3
"""gen_kindle_api.py — 给 Kindle / BOOX 上 KOReader 的 SimpleUI 插件(AI Podcast 魔改版)底栏「论文」页供列表。
接口形状与 aipodcast 站 pipeline/gen_kindle_api.py 完全一致,插件只换 ORIGIN:
  kindle/api/entries                 最新 200 篇(按论文日期倒序)
  kindle/api/channels                学者 = 频道,category = 首个领域(插件按领域分组)
  kindle/api/sources/<pid>/entries   单个学者全部论文
正文不在这里生成:插件点开时直接取 /data/<id>.json(逐段双语+图+公式)在设备上排版。
GitHub Pages 忽略查询串,?limit= 照样命中这些无扩展名文件。
读 data/<id>.json + data/people.json。用法: python3 pipeline/gen_kindle_api.py"""
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://aipaper.jasonlin.tech"
OUT = ROOT / "kindle" / "api"
LATEST = 200

people = {p["pid"]: p for p in json.loads((ROOT / "data" / "people.json").read_text(encoding="utf-8"))["people"]}
papers = []
for f in sorted((ROOT / "data").glob("*.json")):
    if f.name in ("index.json", "people.json", "related.json", "summaries.json"):
        continue
    d = json.loads(f.read_text(encoding="utf-8"))
    if not isinstance(d, dict) or not d.get("id") or not d.get("pid"):
        continue
    papers.append(d)


def ts(date):
    try:
        return int(datetime.strptime(date[:10], "%Y-%m-%d").replace(tzinfo=timezone.utc).timestamp() * 1000)
    except (TypeError, ValueError):
        return 0


def name(pid):
    p = people.get(pid, {})
    return p.get("zh") or p.get("en") or pid


def first_fig(d):
    for sec in d.get("full") or []:
        for it in sec.get("items") or []:
            if it.get("t") == "fig" and str(it.get("src", "")).startswith("https://"):
                return it["src"]
    return ""


def entry(d):
    org = d.get("org") or ""
    who = name(d["pid"])
    return {
        "id": d["id"], "sourceId": d["pid"],
        "sourceName": who + (f" · {org}" if org and org != who else ""),
        "title": d.get("tEn") or d.get("tZh") or d["id"],
        "titleZh": d.get("tZh") or d.get("tEn") or d["id"],
        "published": f"{(d.get('date') or '')[:10]}T00:00:00.000Z", "publishedTs": ts(d.get("date") or ""),
        "link": f"{SITE}/p/{d['id']}/",
        "image": first_fig(d),
        "summary": d.get("sEn") or "", "summaryZh": d.get("sZh") or "",
    }


papers.sort(key=lambda d: (d.get("date") or "", d["id"]), reverse=True)
by_pid = {}
for d in papers:
    by_pid.setdefault(d["pid"], []).append(d)

# 频道顺序:最近有新论文的学者排前面
sources = []
for pid, items in by_pid.items():
    fields = people.get(pid, {}).get("fields") or items[0].get("fields") or ["deep-learning"]
    sources.append({"id": pid, "name": name(pid), "category": fields[0], "siteUrl": f"{SITE}/#/person/{pid}"})

if OUT.exists():
    shutil.rmtree(OUT)               # 全量重建:删掉的学者/论文不留残档
(OUT / "sources").mkdir(parents=True)


def dump(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


dump(OUT / "entries", {"entries": [entry(d) for d in papers[:LATEST]]})
dump(OUT / "channels", {"sources": sources, "updated": datetime.now(timezone.utc).isoformat()})
for pid, items in by_pid.items():
    dump(OUT / "sources" / pid / "entries", {"entries": [entry(d) for d in items]})

size = sum(f.stat().st_size for f in OUT.rglob("*") if f.is_file())
print(f"kindle api: {min(LATEST, len(papers))} latest / {len(sources)} scholars / {size // 1024} KB")
