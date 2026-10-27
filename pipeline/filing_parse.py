#!/usr/bin/env python3
"""filing_parse.py — 把 SEC EDGAR 上「PDF 转出来的」招股书 HTML(每行一个绝对定位 div)还原成 节/段。

EDGAR 的 S-1 常是 Workiva/Toppan 从 PDF 导出的版式 HTML:没有 <p>/<h2>,每一行文字是一个
`<div style="top:…pt">`,里面若干 `<font style="font-size:…;font-weight:…;left:…;width:…">`。
还原规则:
  - 20pt 粗体 = 章(Risk Factors 等),12pt 粗体 = 节;两者都开新 sec(节名「章 · 节」不好读,只用节名)
  - 10pt 粗体 = 小标题,单独成段并加 `#### ` 前缀
  - 同一字号相邻行、行距 ≤ 1.45×行高 → 同一段;跨页时上一行没以句末标点结尾就续接
  - 一行里 font 之间有 >8pt 的横向空隙 = 表格行;连续表格行合成一个段(行用换行、格用 ` · ` 连)
  - 丢:页码、「Table of Contents」页眉、封面和目录(从第一个 20pt 章标题之后的第二次出现起算)
输出 [{"sec":…, "paras":[…]}],供 add_filing.py 翻译。
用法:python3 filing_parse.py <s1.htm> [--dump out.json]
"""
import html, json, re, sys

DIV = re.compile(r'<div style="([^"]*)">(.*?)</div>', re.S)
FONT = re.compile(r'<font style="([^"]*)">(.*?)</font>', re.S)


def num(pat, s, d=None):
    m = re.search(pat, s)
    return float(m.group(1)) if m else d


def lines(src):
    """逐行产出 dict(top, size, bold, italic, cells=[(left,right,text)])。
    表格常常一格一个 div,所以 top 相同的相邻 div 合成一行。"""
    row = None
    for ln in _divs(src):
        if row and abs(ln['top'] - row['top']) < 0.8:
            row['cells'] += ln['cells']
            row['justify'] = row['justify'] or ln['justify']
            row['size'] = max(row['size'], ln['size']) if row['size'] < 11.5 else row['size']
            continue
        if row:
            yield row
        row = ln
    if row:
        yield row


def _divs(src):
    for st, inner in DIV.findall(src):
        top = num(r'top:([\d.]+)pt', st)
        dleft = num(r'(?<![-\w])left:([\d.]+)pt', st, 0.0)  # 表格格子的 div 自带横向偏移
        cells = []
        size = bold = italic = None
        for fst, t in FONT.findall(inner):
            t = html.unescape(re.sub(r'<[^>]+>', '', t)).replace('\xa0', ' ')
            if not t.strip():
                continue
            fs = num(r'font-size:([\d.]+)pt', fst, 9.5)
            left = dleft + num(r'left:([\d.]+)pt', fst, 0.0)
            width = num(r'width:([\d.]+)pt', fst, len(t) * fs * 0.48)
            if size is None:
                size, bold, italic = fs, 'bold' in fst, 'italic' in fst
            cells.append([left, left + width, t])
        if cells and top is not None:
            yield dict(top=top, size=size, bold=bold, italic=italic, cells=cells, justify='justify' in st)


def merge_cells(cells, size):
    """把同一行里连着的 font 拼起来;隔开 >8pt 的视为不同表格格子(或正文里的空白占位)。
    font 边界常落在单词中间(「referen」「ces」),所以只有横向空隙 > 0.25 字号才补空格。"""
    out = []
    for l, r, t in sorted(cells):
        g = l - out[-1][1] if out else 0
        if out and g <= 8 and t.strip() not in ('$', '$(', '(') and not re.match(r'^\s*\$\s*$', t):
            sep = ' ' if g > size * 0.25 and not out[-1][2].endswith(' ') and not t.startswith(' ') else ''
            out[-1][1] = r
            out[-1][2] += sep + t
        else:
            out.append([l, r, t])
    return [re.sub(r'\s+', ' ', c[2]).strip() for c in out if c[2].strip()]


def parse(src):
    secs, cur = [], None
    para, para_kind = [], None  # para_kind: 'text' | 'sub' | 'table'
    para_bold = False
    prev = None
    started = False
    chapters_seen = {}

    def flush():
        nonlocal para, para_kind, para_bold
        if para and cur is not None:
            if para_kind == 'table':
                txt = '\n'.join(para)
            else:
                txt = re.sub(r'\s+', ' ', ' '.join(para)).strip()
                txt = re.sub(r'(\w)- (\w)', r'\1-\2', txt)  # 行尾连字符
                if para_kind == 'sub':
                    txt = '#### ' + txt
                elif para_bold and not txt.startswith(('•', '◦')):
                    txt = '**' + txt + '**'
            if txt and not re.fullmatch(r'[\d\s|·—–-]*', txt):
                cur['paras'].append(txt)
        para, para_kind = [], None

    def new_sec(name):
        nonlocal cur
        flush()
        if cur and cur['paras']:
            secs.append(cur)
        cur = {'sec': name, 'paras': []}

    for ln in lines(src):
        size, bold = ln['size'], ln['bold']
        if size >= 11.5:  # 标题:font 边界落在词中间,直接拼原文
            t = re.sub(r'\s+', ' ', ''.join(c[2] for c in sorted(ln['cells']))).strip()
            cells = [re.sub(r'([a-z])([A-Z])', r'\1 \2', t)] if t else []
        else:
            cells = merge_cells(ln['cells'], size)
            # 「$」「(」单独一格时并到后面的数字上
            fixed = []
            for c in cells:
                if fixed and fixed[-1] in ('$', '(', '$(', '•', '◦'):
                    fixed[-1] = fixed[-1] + ('' if fixed[-1] in ('$', '(', '$(') else ' ') + c
                else:
                    fixed.append(c)
            cells = fixed
        if not cells:
            continue
        # 正文行里的横向空隙 = 招股书里还没填的数字(「$     」),用 [__] 标出来,别当成表格
        prose = len(cells) > 1 and (ln['justify'] or max(map(len, cells)) >= 60) and size > 7.5
        if prose:
            cells = [' [__] '.join(cells)]
        text = ' '.join(cells)
        # 页眉页脚
        if text in ('Table of Contents',) and size < 20 or re.fullmatch(r'(F-)?\d{1,3}|[ivx]+|II-\d+', text):
            continue
        if size >= 19 and bold:  # 章
            chapters_seen[text] = chapters_seen.get(text, 0) + 1
            if not started:
                # 目录里各章名是 8.5pt,封面后第一个 20pt 章名就是正文开始(Table of Contents 本身除外)
                if text == 'Table of Contents':
                    continue
                started = True
            new_sec(text)
            prev = ln
            continue
        if not started:
            continue
        if 11.5 <= size < 19 and bold and len(cells) == 1:  # 节
            if prev and prev['size'] == size and prev['bold'] and 0 < ln['top'] - prev['top'] < size * 1.6 and cur and not cur['paras'] and not para:
                cur['sec'] += ' ' + text  # 多行节标题续接
            else:
                new_sec(text)
            prev = ln
            continue
        gap0 = ln['top'] - prev['top'] if prev else 999
        is_table = (len(cells) > 1 or 5.6 < size <= 7.5 or
                    # 表格里只有一格的行(「Operating expenses:」、折行的科目名)别把表切断
                    para_kind == 'table' and not ln['justify'] and len(text) < 120 and 0 < gap0 < size * 2.4)
        is_sub = 9.8 <= size < 11.5 and bold and len(cells) == 1
        gap = ln['top'] - prev['top'] if prev else 999
        same_flow = prev is not None and abs(prev['size'] - size) < 0.6 and prev['bold'] == bold
        if is_table:
            if para_kind != 'table':
                flush()
                para_kind = 'table'
            para.append(' · '.join(cells))
        elif is_sub:
            if para_kind == 'sub' and same_flow and 0 < gap < size * 1.6:
                para.append(text)
            else:
                flush()
                para_kind = 'sub'
                para.append(text)
        else:
            bullet = text.startswith(('•', '◦'))
            cont = (para_kind == 'text' and same_flow and not bullet and
                    ((0 < gap <= size * 1.45) or
                     (gap < 0 and para and not re.search(r'[.:;!?”)]\s*$', para[-1]))))
            if not cont:
                flush()
                para_kind = 'text'
                para_bold = bold
            para.append(text)
        prev = ln
    flush()
    if cur and cur['paras']:
        secs.append(cur)
    # 收尾:小标题/粗体/列表前缀成 markdown
    for s in secs:
        out = []
        for p in s['paras']:
            if '\n' in p:
                out.append(p)
                continue
            if p.startswith(('•', '◦')):
                p = '- ' + p[1:].strip()
            out.append(p)
        s['paras'] = out
    return secs


if __name__ == '__main__':
    src = open(sys.argv[1], encoding='utf-8', errors='ignore').read()
    secs = parse(src)
    n = sum(len(s['paras']) for s in secs)
    ch = sum(len(p) for s in secs for p in s['paras'])
    print(f'{len(secs)} 节 / {n} 段 / {ch // 1000}k 字符', file=sys.stderr)
    if '--dump' in sys.argv:
        json.dump(secs, open(sys.argv[sys.argv.index('--dump') + 1], 'w'), ensure_ascii=False, indent=1)
