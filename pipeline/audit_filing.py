#!/usr/bin/env python3
"""audit_filing.py — 招股书(及任何长文)收录后的结构自检门禁。postingest.sh 对新收 id 自动跑;FAIL 即中止。

查的都是 2026-10-27 实际踩过的坑,每一条对应一次返工:
  1. 中文里的半角标点(,;:  括号/引号)——译文混用半角,整页观感差
  2. 小写字母开头的长正文段——跨页被脚注切断的段落
  3. 表格段译文行数/格数与英文不一致——前端按表格渲染会错位
  4. 表格格界粘连「）·」——标点规范器吃掉分隔符空格
  5. 正文段里残留点线引导「......」——表格行没切开
用法:python3 pipeline/audit_filing.py <id>... [--strict]
阈值:半角标点 > 0.5% 段 / 小写开头长段 > 3% / 表格错位 > 15% / 粘连 > 0 / 点线 > 0 → FAIL;否则 WARN 列出数字。
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CJK = r'[一-鿿]'


def audit(pid):
    j = json.loads((ROOT / 'data' / f'{pid}.json').read_text())
    # items 结构(论文 / 带图文章)只取 t==para 的段;图、公式不参与半角标点/断段检查
    ps = [p for s in j.get('full', []) for p in (s.get('items') or s.get('paras') or []) if isinstance(p, dict) and p.get('t', 'para') == 'para']
    n = max(1, len(ps))
    half = sum(len(re.findall(CJK + r'[,;:](?!\d)', p['zh'])) + len(re.findall(r'\([^()\n]*' + CJK + r'[^()\n]*\)', p['zh'])) for p in ps)
    # 小写开头但不是断段的三类(2026-11-08 Zvi/Willison 博客误报):推文署名「roon (OpenAI): …」「j⧉nus: …」、
    # 小写品牌/工具名(spaCy、iPhone)、命令行(llm -f …)。只认「像句子续写」的:首词纯小写字母且不带冒号署名。
    def _broken(t):
        if not re.match(r'^[a-z]', t) or '\n' in t or len(t) <= 40: return False
        if re.match(r'^\S{1,40}( \([^)]{1,60}\))?:\s', t): return False      # 推文/对话署名
        w = t.split()[0]
        if re.search(r'[A-Z]', w) or re.match(r'^[a-z][\w.-]*\s+-{1,2}\w', t): return False   # spaCy/iPhone、命令行
        return True
    low = sum(1 for p in ps if _broken(p['en']))
    tbl = [p for p in ps if '\n' in p['en'] or ' · ' in p['en']]
    mis = 0
    for p in tbl:
        el, zl = p['en'].split('\n'), p['zh'].split('\n')
        mis += len(el) != len(zl) or any(a.count(' · ') != b.count(' · ') for a, b in zip(el, zl))
    glue = sum(len(re.findall(r'[）”]·|·[（“]', p['zh'])) for p in ps)
    dots = sum(1 for p in ps if '\n' not in p['en'] and '.....' in p['en'])
    fails = []
    if half > n * 0.005: fails.append(f'半角标点 {half}')
    if low > n * 0.03: fails.append(f'小写开头长段 {low}')
    if tbl and mis > len(tbl) * 0.15: fails.append(f'表格译文错位 {mis}/{len(tbl)}')
    if glue: fails.append(f'格界粘连 {glue}')
    if dots: fails.append(f'点线引导残留 {dots}')
    info = f'{len(ps)} 段 | 半角标点 {half} | 小写开头 {low} | 表格 {len(tbl)}(错位 {mis}) | 粘连 {glue} | 点线 {dots}'
    return fails, info


if __name__ == '__main__':
    ids = [a for a in sys.argv[1:] if not a.startswith('--')]
    bad = 0
    for i in ids:
        if not (ROOT / 'data' / f'{i}.json').exists():
            continue
        fails, info = audit(i)
        print(('✗ FAIL' if fails else '✓ PASS') + f'  {i}  {info}' + (('  ← ' + '; '.join(fails)) if fails else ''))
        bad += bool(fails)
    sys.exit(1 if bad else 0)
