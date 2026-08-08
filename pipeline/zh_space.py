# -*- coding: utf-8 -*-
"""中英文混排加空格(盘古之白):CJK 与半角字母/数字之间补一个空格。

跳过行内公式($...$、\\(...\\)、\\[...\\])与 HTML 标签,不改动其内部;
只在 CJK 与 [A-Za-z0-9] 直接相邻时插空格,全角标点旁不加。
"""
import re

CJK = r'〇㐀-䶿一-鿿豈-﫿'
_R1 = re.compile(f'([{CJK}])([A-Za-z0-9])')
_R2 = re.compile(f'([A-Za-z0-9])([{CJK}])')
_PROT = re.compile(r'(\$[^$\n]{1,300}\$|\\\([^)\n]{1,300}\\\)|\\\[.{1,600}?\\\]|<[^<>\n]{1,300}>)')
_HAS = re.compile(f'[{CJK}]')

# 数据里承载中文展示文本的字段(data/<id>.json 与 app.js 内联共用这套名字)
ZH_KEYS = {'tZh', 'sZh', 'absZh', 'secZh', 'zh', 'capZh', 'tiZh', 'bioZh'}


def space_zh(s):
    if not isinstance(s, str) or not _HAS.search(s):
        return s
    parts = _PROT.split(s)
    out = []
    for i, seg in enumerate(parts):
        if i % 2 == 0:
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
