#!/usr/bin/env python3
"""首屏瘦身：把 app.js 内联 PAPERS 里的重字段剥掉。

1) absEn/absZh/insights —— 只在论文详情页用，而详情页本来就懒加载 data/<id>.json
   （含完整副本），内联纯属重复（~1.3MB）。
2) sEn/sZh（一句话摘要）—— 全站只有两个用途：首页 hero 那一篇的引文兜底、以及搜索
   匹配（列表卡片根本不显示它）。却占 app.js 的 37%（gzip 62KB）。现在抽到
   data/summaries.json，前端打开搜索面板时才拉；hero 用的那篇（按 addedAt 最新）
   连同前 KEEP_SUMM 篇保留内联，保证首页不用等网络。

幂等，可重复跑；每次 bulk_ingest/add_paper 合并新论文后都要重跑一次
（新合并进来的论文会带全量字段）。

用法: python3 pipeline/slim_index.py
"""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IDX = os.path.join(ROOT, 'app.js')
STRIP = ('absEn', 'absZh', 'insights')
SUMM = ('sEn', 'sZh')        # 抽到 data/summaries.json,搜索时才拉
KEEP_SUMM = 6                # 按 addedAt 最新的这几篇保留内联(首页 hero 用)

src = open(IDX, encoding='utf-8').read()
m = re.search(r'const PAPERS = (\[.*?\]);', src, re.S)
if not m:
    sys.exit('PAPERS 块没找到')
papers = json.loads(m.group(1))

before = len(m.group(1))
for p in papers:
    # 校验懒加载文件存在且含被剥字段，缺了就不剥（防止详情页丢内容）
    fp = os.path.join(ROOT, 'data', p['id'] + '.json')
    try:
        d = json.load(open(fp, encoding='utf-8'))
    except Exception:
        print('跳过（无 data 文件）:', p['id']); continue
    if not (d.get('absEn') and d.get('insights')):
        print('跳过（data 文件缺字段）:', p['id']); continue
    for k in STRIP:
        p.pop(k, None)

# ---- sEn/sZh 抽到 data/summaries.json,只保留最新几篇内联(首页 hero 要用) ----
keep = {p['id'] for p in sorted(papers, key=lambda x: x.get('addedAt') or '', reverse=True)[:KEEP_SUMM]}
summ_path = os.path.join(ROOT, 'data', 'summaries.json')
try:
    summ = json.load(open(summ_path, encoding='utf-8'))
except Exception:
    summ = {}
moved = 0
for p in papers:
    if p['id'] in keep:
        continue
    got = {k: p.pop(k) for k in SUMM if p.get(k)}
    if got:
        summ.setdefault(p['id'], {}).update(got)
        moved += 1
    elif p['id'] not in summ:
        # 已经抽过的:确保 summaries.json 里有,否则搜索会漏掉这篇
        pass
ids = {p['id'] for p in papers}
for k in [k for k in summ if k not in ids]:
    del summ[k]                       # 清理已删除的论文
json.dump(summ, open(summ_path, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

new_block = json.dumps(papers, ensure_ascii=False, separators=(',', ':'))
src = src[:m.start(1)] + new_block + src[m.end(1):]
open(IDX, 'w', encoding='utf-8').write(src)
print(f'PAPERS 内联: {before/1e6:.2f}MB -> {len(new_block)/1e6:.2f}MB，共 {len(papers)} 篇 | '
      f'摘要抽出 {moved} 篇 → data/summaries.json({os.path.getsize(summ_path)//1024}KB),'
      f'保留内联 {len(keep)} 篇')
