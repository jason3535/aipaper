#!/usr/bin/env python3
"""filing_flow.py — 「流式 HTML」招股书(Donnelley/RR 排版:<P>/<B>/<I>/<TABLE>,无绝对定位)还原成 节/段。
与 filing_parse.py(Workiva 版式 HTML)输出同构:[{"sec":…, "paras":[…]}],由 filing_parse.parse 自动分流。
规则:
  - 居中 + 整段粗体 + 全大写 的 <P> = 章;左对齐整段粗体短行(≤110 字,不以句号结尾)= 节;整段粗斜体短行 = 小标题(#### )
  - 正文 <P> 一段一段;<TABLE> 每 <TR> 一行、格用 ` · ` 连、行用换行连成一个表格段;「•」+文字 两格的表行是项目符号 → `- `
  - 丢:页码行、「Table of Contents」页眉、目录(从第一个 SUMMARY/ABOUT THIS PROSPECTUS/LETTER 章起算正文)
"""
import html, re
from html.parser import HTMLParser

SMALL = {'of', 'and', 'the', 'for', 'to', 'in', 'on', 'about', 'regarding', 'our', 'with', 'a', 'an', 'or', 'by', 'at', 'from', 'as'}


def smart_title(t):
    if not t.isupper():
        return t
    ws = t.lower().split()
    return ' '.join(w if (i and w in SMALL) else (w.upper() if w in ('ai', 'ipo', 'gaap', 'sec', 'u.s.', 'llc', 'gpu', 'gpus') else w.capitalize()) for i, w in enumerate(ws))


class P(HTMLParser):
    """把文档线性化成 blocks:('p', text, bold, italic, center) / ('row', [cells]) / ('tbl_end',)"""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.blocks = []
        self.p = None          # 当前段:dict(parts=[(text,bold,italic)], center)
        self.b = self.i = 0    # <B>/<I> 嵌套深度
        self.in_td = False
        self.td = []           # 当前格的文字
        self.row = None
        self.tdepth = 0
        self.skip = 0          # <h5> 等页眉

    def handle_starttag(self, tag, attrs):
        a = dict((k.lower(), (v or '')) for k, v in attrs)
        tag = tag.lower()
        if tag in ('b', 'strong'):
            self.b += 1
        elif tag in ('i', 'em'):
            self.i += 1
        elif tag == 'p':
            self.flush_p()
            st = a.get('style', '').lower()
            self.p = dict(parts=[], center=a.get('align', '').lower() == 'center' or 'text-align:center' in st.replace(' ', ''))
        elif tag == 'table':
            self.flush_p()
            self.tdepth += 1
        elif tag == 'tr' and self.tdepth:
            self.row = []
        elif tag == 'td' and self.tdepth:
            self.in_td, self.td = True, []
        elif tag in ('h5', 'h4', 'h3', 'h2', 'h1'):
            self.flush_p()
            self.skip += 1
        elif tag == 'br':
            if self.in_td:
                self.td.append(' ')
            elif self.p is not None:
                self.p['parts'].append((' ', False, False))
        if 'font-weight:bold' in a.get('style', '').replace(' ', '').lower() and tag in ('font', 'span', 'p'):
            self.b += 1
            a['_b'] = '1'
        self._stack.append((tag, a)) if hasattr(self, '_stack') else setattr(self, '_stack', [(tag, a)])

    def handle_endtag(self, tag):
        tag = tag.lower()
        # 回溯样式加粗
        st = getattr(self, '_stack', [])
        for k in range(len(st) - 1, -1, -1):
            if st[k][0] == tag:
                if st[k][1].get('_b'):
                    self.b -= 1
                del st[k:]
                break
        if tag in ('b', 'strong'):
            self.b = max(0, self.b - 1)
        elif tag in ('i', 'em'):
            self.i = max(0, self.i - 1)
        elif tag == 'p':
            self.flush_p()
        elif tag == 'td' and self.tdepth:
            t = re.sub(r'\s+', ' ', ''.join(self.td)).strip()
            if self.row is not None:
                self.row.append(t)
            self.in_td = False
        elif tag == 'tr' and self.tdepth:
            if self.row is not None:
                cells = [c for c in self.row if c and c not in ('$', '(')] if not any(c for c in self.row) else self.row
                self.blocks.append(('row', self.row))
            self.row = None
        elif tag == 'table':
            self.tdepth = max(0, self.tdepth - 1)
            self.blocks.append(('tbl_end',))
        elif tag in ('h5', 'h4', 'h3', 'h2', 'h1'):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, d):
        if self.skip:
            return
        if self.in_td:
            self.td.append(d)
        elif self.p is not None:
            self.p['parts'].append((d, self.b > 0, self.i > 0))
        elif self.tdepth == 0 and d.strip():
            # <P> 外的裸文字(少见)
            self.blocks.append(('p', re.sub(r'\s+', ' ', d).strip(), False, False, False))

    def flush_p(self):
        if self.p is None:
            return
        parts = self.p['parts']
        text = re.sub(r'\s+', ' ', ''.join(t for t, _, _ in parts)).strip()
        if text:
            letters = [(b, i) for t, b, i in parts if t.strip()]
            bold = bool(letters) and all(b for b, _ in letters)
            ital = bool(letters) and all(i for _, i in letters)
            self.blocks.append(('p', text, bold, ital, self.p['center']))
        self.p = None


def merge_num_cells(cells):
    """「$」「(」并到后面的数字;「)」「)%」并到前面;空格丢掉。"""
    out = []
    for c in cells:
        c = c.replace('\xa0', ' ').strip()
        if not c:
            continue
        if c in ('$', '(', '$(') or re.fullmatch(r'\$\s*\(?', c):
            out.append(c)
            continue
        if out and out[-1] in ('$', '(', '$(') or (out and re.fullmatch(r'\$\s*\(?', out[-1])):
            out[-1] = out[-1].replace(' ', '') + c
            continue
        if re.fullmatch(r'\)%?|%|\)\s*%', c) and out:
            out[-1] += c.replace(' ', '')
            continue
        out.append(c)
    return out


def parse(src):
    p = P()
    p.feed(src)
    secs, cur = [], None
    started = False
    tbl = []        # 当前表格的行
    bullets = []    # 当前连续的项目符号(来自表格)

    def new_sec(name):
        nonlocal cur
        flush_tbl()
        if cur and cur['paras']:
            secs.append(cur)
        cur = {'sec': name, 'paras': []}

    def flush_tbl():
        nonlocal tbl
        if tbl and cur is not None:
            rows = [' · '.join(r) for r in tbl if r]
            if rows:
                cur['paras'].append('\n'.join(rows) if len(rows) > 1 else rows[0])
        tbl = []

    for blk in p.blocks:
        if blk[0] == 'row':
            cells = merge_num_cells(blk[1])
            if not cells:
                continue
            if started and cur is not None:
                if len(cells) == 2 and cells[0] in ('•', '◦', '–', '-', '●'):
                    flush_tbl()
                    cur['paras'].append('- ' + cells[1])
                elif len(cells) == 1 and cur is not None and not tbl:
                    cur['paras'].append(cells[0])   # 单格表 = 普通段(常见于缩进文字)
                else:
                    tbl.append(cells)
            continue
        if blk[0] == 'tbl_end':
            flush_tbl()
            continue
        _, text, bold, ital, center = blk
        if re.fullmatch(r'(F-)?\d{1,3}|[ivx]+|II-\d+|Table of Contents', text):
            continue
        caps = bold and center and len(text) < 90 and re.fullmatch(r"[A-Z0-9 ,.'’&\-—–:;()/]+", text) and len(re.findall('[A-Z]', text)) >= 3
        if caps:
            if not started:
                if not re.search(r'SUMMARY|ABOUT THIS PROSPECTUS|LETTER|GLOSSARY', text):
                    continue
                started = True
            new_sec(smart_title(text))
            continue
        if not started:
            continue
        flush_tbl()
        if bold and not ital and not center and len(text) <= 110 and not text.endswith(('.', ',', ';', ':')):
            new_sec(text)
            continue
        if bold and ital and len(text) < 90 and not text.endswith(('.', ',', ';', ':')):
            cur['paras'].append('#### ' + text)
            continue
        if cur is None:
            continue
        if bold:
            text = '**' + text + '**'
        if text.startswith(('•', '◦')):
            text = '- ' + text[1:].strip()
        # 跨页续段:小写开头的正文段,并回前面最近一个没写完的正文段(中间隔着的是页脚脚注)
        if re.match(r'^[a-z]', text) and not bold:
            for k in range(len(cur['paras']) - 1, max(-1, len(cur['paras']) - 7), -1):
                q = cur['paras'][k]
                if '\n' in q or q.startswith(('#', '-', '**')) or re.match(r'^\(?\d{1,2}\)?\s', q):
                    continue   # 表格/标题/项目符号/脚注「(1) …」跳过,继续往前找没写完的正文段
                if not re.search(r'[.:;!?”)]\s*$', q):
                    cur['paras'][k] = q + ' ' + text
                    text = None
                break
            if text is None:
                continue
        cur['paras'].append(text)
    flush_tbl()
    if cur and cur['paras']:
        secs.append(cur)
    return secs


if __name__ == '__main__':
    import json, sys
    secs = parse(open(sys.argv[1], encoding='utf-8', errors='ignore').read())
    print(f"{len(secs)} 节 / {sum(len(s['paras']) for s in secs)} 段", file=sys.stderr)
    if '--dump' in sys.argv:
        json.dump(secs, open(sys.argv[sys.argv.index('--dump') + 1], 'w'), ensure_ascii=False, indent=1)
