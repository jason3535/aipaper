#!/usr/bin/env python3
"""首屏瘦身：把 index.html 内联 PAPERS 里的 absEn/absZh/insights 剥掉。

这三个字段只在论文详情页用到，而详情页本来就懒加载 data/<id>.json（含完整副本），
内联纯属重复（~1.3MB）。幂等，可重复跑；每次 bulk_ingest/add_paper 合并新论文后
都要重跑一次（新合并进来的论文会带全量字段）。

用法: python3 pipeline/slim_index.py
"""
import json, re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IDX = os.path.join(ROOT, 'index.html')
STRIP = ('absEn', 'absZh', 'insights')

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

new_block = json.dumps(papers, ensure_ascii=False, separators=(',', ':'))
src = src[:m.start(1)] + new_block + src[m.end(1):]
open(IDX, 'w', encoding='utf-8').write(src)
print(f'PAPERS 内联: {before/1e6:.2f}MB -> {len(new_block)/1e6:.2f}MB，共 {len(papers)} 篇')
