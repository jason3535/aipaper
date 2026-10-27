# -*- coding: utf-8 -*-
"""中英文混排加空格(盘古之白):CJK 与半角字母/数字之间补一个空格。

跳过行内公式($...$、\\(...\\)、\\[...\\])与 HTML 标签,不改动其内部;
只在 CJK 与 [A-Za-z0-9] 直接相邻时插空格,全角标点旁不加。
"""
import re

CJK = r'〇㐀-䶿一-鿿豈-﫿'
_R1 = re.compile(f'([{CJK}])([A-Za-z0-9])')
_R2 = re.compile(f'([A-Za-z0-9])([{CJK}])')
# $…$ 只当公式:金额($1,000 / $(2) / $—)不算,否则两个金额之间的整句都会被当公式跳过
_PROT = re.compile(r'(\$(?![\d(\[_—–\-\s])[^$\n]{1,300}\$|\\\([^)\n]{1,300}\\\)|\\\[.{1,600}?\\\]|<[^<>\n]{1,300}>)')
_HAS = re.compile(f'[{CJK}]')

# 数据里承载中文展示文本的字段(data/<id>.json 与 app.js 内联共用这套名字)
ZH_KEYS = {'tZh', 'sZh', 'absZh', 'secZh', 'zh', 'capZh', 'tiZh', 'bioZh'}


# ---- 中文标点规范(2026-10-27):DeepSeek 译文常混用半角标点 ----
# 中文语境 = 相邻字符是 CJK 或全角标点。半角 , ; : ? ! . 在中文语境改全角;括号/引号只要一侧挨着中文或内含中文就改全角。
# 数字千分位(1,000)、负数 $(1,531)、序号 (i)/(3)、时间(10:30)、英文句子内部、URL、公式、代码不动。
_FW = '，。；：！？（）“”‘’、《》—…'
_CTX = f'[{CJK}{re.escape(_FW)}]'
_P_COMMA = re.compile(rf'(?<={_CTX}) ?,(?! ?\d{{3}}\b)| ?,(?= ?{_CTX})')
_P_SEMI = re.compile(rf'(?<={_CTX}) ?;| ?;(?= ?{_CTX})')
_P_COLON = re.compile(rf'(?<={_CTX}) ?:(?!//)|(?<!\d) ?:(?= ?{_CTX})')
_P_Q = re.compile(rf'(?<={_CTX}) ?\?')
_P_EX = re.compile(rf'(?<={_CTX}) ?!')
_P_DOT = re.compile(rf'(?<=[{CJK}])\.(?=\s|$|[{CJK}”）])')   # 中文句末的英文句号(「等.」也算)
_P_PAREN = re.compile(r' ?\(([^()\n]{1,200})\) ?')
_P_SP1 = re.compile(rf'(?<=[{re.escape(_FW)}]) +(?=[{CJK}{re.escape(_FW)}A-Za-z0-9])')
_P_SP2 = re.compile(rf'(?<=[{CJK}A-Za-z0-9]) +(?=[，。；：！？）”])')
_CJK_RE = re.compile(f'[{CJK}]')
_CTX_RE = re.compile(_CTX)
_URL = re.compile(r'(https?://\S+|`[^`\n]+`)')
_KEEP = re.compile(r'^(?:[\d,.\s%$\-—–]+|[ivx]{1,4}|[a-zA-Z]|\d{1,3}[a-z]?)$')  # 数字/负数/序号括号保持半角


def _near(s, i, step):
    """s[i] 向 step 方向跳过空格后的那个字符('' 表示越界)。"""
    while 0 <= i < len(s) and s[i] == ' ':
        i += step
    return s[i] if 0 <= i < len(s) else ''


def _paren(m):
    inner = m.group(1)
    if _KEEP.match(inner.strip()):
        return m.group(0)
    s = m.string
    left, right = _near(s, m.start() - 1, -1), _near(s, m.end(), 1)
    if _CJK_RE.search(inner) or (left and _CTX_RE.match(left)) or (right and _CTX_RE.match(right)):
        g = m.group(0)
        # 两侧原有的空格:挨着中文/全角标点的去掉,挨着英文、数字、「·」分隔符的保留(表格格界「） · 」不能吃掉)
        pre = ' ' if g.startswith(' ') and left == '·' else ''
        post = ' ' if g.endswith(' ') and (right == '·' or right.isalnum()) else ''
        return pre + '（' + inner.strip() + '）' + post
    return m.group(0)


def _quotes(s):
    """成对的英文双引号:内含中文,或一侧挨着中文 → “ ”。奇数个引号不动。"""
    if s.count('"') % 2:
        return s
    out, pos = [], 0
    idx = [i for i, ch in enumerate(s) if ch == '"']
    for a, b in zip(idx[0::2], idx[1::2]):
        inner = s[a + 1:b]
        left, right = _near(s, a - 1, -1), _near(s, b + 1, 1)
        if _CJK_RE.search(inner) or (left and _CTX_RE.match(left)) or (right and _CTX_RE.match(right)):
            out.append(s[pos:a] + '“' + inner.strip() + '”')
            pos = b + 1
    out.append(s[pos:])
    return ''.join(out)


def punct_zh(s):
    if not isinstance(s, str) or not _HAS.search(s):
        return s
    segs = _URL.split(s)
    for i in range(0, len(segs), 2):
        t = segs[i]
        t = _P_COMMA.sub('，', t)
        t = _P_SEMI.sub('；', t)
        t = _P_COLON.sub('：', t)
        t = _P_Q.sub('？', t)
        t = _P_EX.sub('！', t)
        t = _quotes(t)
        t = _P_DOT.sub('。', t)
        t = _P_PAREN.sub(_paren, t)
        t = _P_SP1.sub('', t)
        t = _P_SP2.sub('', t)
        segs[i] = t
    return ''.join(segs)


def space_zh(s):
    if not isinstance(s, str) or not _HAS.search(s):
        return s
    parts = _PROT.split(s)
    out = []
    for i, seg in enumerate(parts):
        if i % 2 == 0:
            seg = punct_zh(seg)
            seg = _R1.sub(r'\1 \2', seg)
            seg = _R2.sub(r'\1 \2', seg)
        out.append(seg)
    return ''.join(out)


def space_obj(o):
    """就地规范化 dict/list 中 ZH_KEYS 字段,返回同一对象,方便在写盘处内联包一层。"""
    if isinstance(o, dict):
        for k, v in o.items():
            if isinstance(v, str):
                if k in ZH_KEYS:
                    o[k] = space_zh(v)
            else:
                space_obj(v)
    elif isinstance(o, list):
        for v in o:
            space_obj(v)
    return o
