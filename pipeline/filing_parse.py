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
用法:python3 filing_parse.py <s1.htm> [--dump out.json] [--no-blanks(424B4 终稿)]
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
        bolds = []
        for fst, t in FONT.findall(inner):
            t = html.unescape(re.sub(r'<[^>]+>', '', t)).replace('\xa0', ' ')
            if not t.strip():
                continue
            fs = num(r'font-size:([\d.]+)pt', fst, 9.5)
            left = dleft + num(r'left:([\d.]+)pt', fst, 0.0)
            width = num(r'width:([\d.]+)pt', fst, len(t) * fs * 0.48)
            if size is None:
                size, bold, italic = fs, 'bold' in fst, 'italic' in fst
            if len(t.strip()) > 1:
                bolds.append('bold' in fst)
            cells.append([left, left + width, t])
        if bolds:
            bold = all(bolds)  # run-in 小标题(只开头几个词粗)不算粗体行
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


SMALL = {'of', 'and', 'the', 'for', 'to', 'in', 'on', 'about', 'regarding', 'our', 'with', 'a', 'an', 'or', 'by', 'at', 'from', 'as'}


def smart_title(t):
    """全大写章名转标题式:RISK FACTORS → Risk Factors;小词小写;已有大小写的原样。"""
    if not t.isupper():
        return t
    ws = t.lower().split()
    return ' '.join(w if (i and w in SMALL) else (w.upper() if w in ('ai', 'ipo', 'gaap', 'sec', 'u.s.', 'llc', 'cs-3') else w.capitalize()) for i, w in enumerate(ws))


def parse(src, blanks=True):
    """blanks=True:S-1 初稿里横向空隙是未填数字,标 [__];424B4 终稿没有空白,传 False 用空格连。
    版式两种:① Anthropic 式——章 20pt 粗/节 12pt 粗;② SpaceX/Cerebras 式(flat)——通篇 10pt,
    章=居中大写粗体行,节=左对齐短粗体行,小标题=粗斜体短行。按有没有 ≥19pt 的粗体行自动判定。"""
    if src.count('position:absolute') < 50 and src.lower().count('<p') > 500:   # Donnelley 流式 HTML(CoreWeave 等)
        from filing_flow import parse as flow_parse
        return flow_parse(src)
    all_lines = list(lines(src))
    flat = sum((ln['size'] or 0) >= 19 and ln['bold'] for ln in all_lines) < 3  # 封面上一两行大字不算
    seen_toc = False
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
                # font 边界粘连:「Costs.The Sun」「2025decreased」「millionto」补空格(排除 U.S./M.Eng. 这类缩写)
                txt = re.sub(r'(?<=[a-z]{2}[.:;!?])(?=[A-Z][a-z])', ' ', txt)
                txt = re.sub(r'(?<=\d)(?=(?:decreased|increased|compared|to|and|from|was|were|of)\b)', ' ', txt)
                txt = re.sub(r'\b(million|billion|thousand)(?=[a-z])', r'\1 ', txt)
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

    for ln in all_lines:
        size, bold = ln['size'], ln['bold']
        left = min(c[0] for c in ln['cells'])
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
        leader = any('....' in c for c in cells)  # 「Per share........ $2.25」点线引导行 = 表格行
        if leader:
            cells = [c for c in (re.sub(r'\s*\.{4,}\s*', ' ', c).strip() for c in cells) if c]
            if not cells:
                continue
        # 正文行里的横向空隙 = 招股书里还没填的数字(「$     」),用 [__] 标出来,别当成表格
        prose = len(cells) > 1 and (ln['justify'] or max(map(len, cells)) >= 60) and size > 7.5
        if prose:
            cells = [(' [__] ' if blanks else ' ').join(cells)]
        text = ' '.join(cells)
        # 页眉页脚
        if text in ('Table of Contents',) and size < 20 or re.fullmatch(r'(F-)?\d{1,3}|[ivx]+|II-\d+', text):
            continue
        if flat:
            one = len(cells) == 1 and 9.5 <= size < 11.5 and bold
            caps = one and not ln['italic'] and left >= 150 and len(text) < 90 and \
                re.fullmatch(r"[A-Z0-9 ,.'’&\-—–:;()/]+", text) and len(re.findall('[A-Z]', text)) >= 3
            if caps:  # 居中大写粗体 = 章(封面上的也长这样:目录之后的第一章才算正文,创始人信/术语表在摘要前也要)
                if not started:
                    if 'TABLE OF CONTENTS' in text:
                        seen_toc = True
                        continue
                    if not (seen_toc or 'SUMMARY' in text or 'ABOUT THIS PROSPECTUS' in text):
                        continue
                    started = True
                new_sec(smart_title(text))
                prev = ln
                continue
            if not started:
                continue
            if one and not ln['italic'] and left < 120 and len(text) <= 110 and not text.endswith(('.', ',', ';', ':')) \
                    and not text.startswith(('•', '◦', '(', '$')) and not re.search(r'\d{4}|\.{4}', text):  # 节
                if prev and prev['bold'] and not prev['italic'] and 0 < ln['top'] - prev['top'] < size * 1.6 and cur and not cur['paras'] and not para:
                    cur['sec'] += ' ' + text
                else:
                    new_sec(smart_title(text))
                prev = ln
                continue
            if one and ln['italic'] and len(text) < 80 and not text.endswith(('.', ',', ';', ':')) and not text.startswith(('•', '◦')):
                flush()
                para_kind = 'sub'
                para.append(text)
                flush()
                prev = ln
                continue
        if not flat and size >= 19 and bold:  # 章
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
        if not flat and 11.5 <= size < 19 and bold and len(cells) == 1:  # 节
            if prev and prev['size'] == size and prev['bold'] and 0 < ln['top'] - prev['top'] < size * 1.6 and cur and not cur['paras'] and not para:
                cur['sec'] += ' ' + text  # 多行节标题续接
            else:
                new_sec(text)
            prev = ln
            continue
        gap0 = ln['top'] - prev['top'] if prev else 999
        # 表格格子的 div 各有自己的坐标系(top 是相对格子的),同一逻辑行会散成几条「行」:
        # 纯数字行(「$ 7.85」)并回上一表格行;小写开头的折行(「to this offering」)续接上一行的科目名
        numeric = all(re.fullmatch(r'[\$\(\)\d,.\-—–%\s]+', c) for c in cells)
        wrap = para_kind == 'table' and para and cells[0][:1].islower() and left < 30 and not re.search(r'\d', para[-1].split(' · ')[-1][-6:])
        is_table = (len(cells) > 1 or 5.6 < size <= 7.5 or leader or wrap or (numeric and para_kind == 'table' and para) or
                    # 表格里只有一格的行(「Operating expenses:」、折行的科目名)别把表切断
                    para_kind == 'table' and not ln['justify'] and len(text) < 120 and 0 < gap0 < size * 2.4)
        is_sub = not flat and 9.8 <= size < 11.5 and bold and len(cells) == 1
        gap = ln['top'] - prev['top'] if prev else 999
        same_flow = prev is not None and abs(prev['size'] - size) < 0.6 and prev['bold'] == bold
        if is_table:
            if para_kind != 'table':
                flush()
                para_kind = 'table'
            if para and numeric:
                para[-1] += ' · ' + ' · '.join(cells)
            elif para and wrap:
                para[-1] = para[-1] + ' ' + cells[0] + (' · ' + ' · '.join(cells[1:]) if len(cells) > 1 else '')
            else:
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
    secs = parse(src, blanks='--no-blanks' not in sys.argv)
    n = sum(len(s['paras']) for s in secs)
    ch = sum(len(p) for s in secs for p in s['paras'])
    print(f'{len(secs)} 节 / {n} 段 / {ch // 1000}k 字符', file=sys.stderr)
    if '--dump' in sys.argv:
        json.dump(secs, open(sys.argv[sys.argv.index('--dump') + 1], 'w'), ensure_ascii=False, indent=1)
