#!/usr/bin/env python3
"""fix_filing_tables.py — 把招股书里「译文行数/格数与英文不一致」的表格段逐行重译,保证前端表格列不错位。
策略:整段重译不可靠(模型爱合并表头行),改成 行→格 两级:先按行批量译,行内格数不对的再逐格译(纯数字格原样照抄)。
用法:set -a; source pipeline/.env; set +a; python3 pipeline/fix_filing_tables.py <id>...
"""
import json, re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from add_filing import tr_batch  # noqa: E402
from zh_space import space_obj, space_zh  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
NUM = re.compile(r'^[\s$€(（)）\d,.%\-—–]*$')


def misaligned(e, z):
    el, zl = e.split('\n'), z.split('\n')
    return len(el) != len(zl) or any(a.count(' · ') != b.count(' · ') for a, b in zip(el, zl))


def tr_rows(rows):
    """逐行译;格数不对的行再逐格译。返回与 rows 等长的中文行。"""
    try:
        zh = tr_batch(rows) or []
    except Exception:
        zh = []
    out = []
    for i, r in enumerate(rows):
        z = zh[i] if i < len(zh) else ''
        if z and z.count(' · ') == r.count(' · '):
            out.append(z)
            continue
        cells = r.split(' · ')
        todo = [c for c in cells if not NUM.match(c) and c.strip()]
        tz = {}
        if todo:
            try:
                res = tr_batch(todo) or []
                tz = {c: (res[k] if k < len(res) and res[k].strip() else c) for k, c in enumerate(todo)}
            except Exception:
                tz = {}
        out.append(' · '.join(tz.get(c, c) for c in cells))
    return out


def main():
    for pid in [a for a in sys.argv[1:] if not a.startswith('--')]:
        f = ROOT / 'data' / f'{pid}.json'
        j = json.loads(f.read_text())
        n = fixed = 0
        for s in j['full']:
            for p in s['paras']:
                e = p['en']
                if not ('\n' in e or ' · ' in e):
                    continue
                p['zh'] = re.sub(r'(?<=[）”])·', ' ·', p['zh'])
                p['zh'] = re.sub(r'·(?=[（“])', '· ', p['zh'])
                if not misaligned(e, p['zh']):
                    continue
                n += 1
                rows = e.split('\n')
                zrows = tr_rows(rows)
                cand = '\n'.join(zrows)
                if not misaligned(e, cand):
                    p['zh'] = space_zh(cand)
                    if misaligned(e, p['zh']):      # 规范器若动了格界,退回未规范版本
                        p['zh'] = cand
                    fixed += 1
        space_obj(j)
        f.write_text(json.dumps(j, ensure_ascii=False))
        print(f'{pid}: 错位表格段 {n},修好 {fixed}', file=sys.stderr)


if __name__ == '__main__':
    main()
