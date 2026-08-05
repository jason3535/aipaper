/* 生成 data/people.json —— 给 MCP(mcp.jasonlin.tech)的「学者」这一层用。
   此前 MCP 只有 search_papers/get_paper,外部 Agent 无法列举/按人取纸站学者,
   只能拿作者名做子串匹配。结构对齐 aipodcast 的 mcp-data/people.json。
   机构实体(ORG_ENTITIES,如 openai/deepseek)标 org:true,便于调用方区分真人与团队署名。*/
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
/* 数据与逻辑 2026-08-04 从 index.html 拆到了 app.js(首屏瘦身),PAPERS/PEOPLE 都在那边 */
const h = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

const PAPERS = JSON.parse(h.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const PEOPLE = eval('(' + h.match(/const PEOPLE\s*=\s*(\{[\s\S]*?\n\});/)[1] + ')');
const ORG_ENTITIES = new Set(eval('(' + h.match(/const ORG_ENTITIES=new Set\((\[[^\]]*\])\)/)[1] + ')'));
/* 这两个 map 是 JS 对象字面量(键不带引号、值单引号),不能 JSON.parse */
const PAPER2POD = eval('(' + h.match(/const PAPER2POD=(\{[\s\S]*?\});/)[1] + ')');
const PAPER_GRAPH = eval('(' + h.match(/const PAPER_GRAPH=(\{[\s\S]*?\});/)[1] + ')');

const byPid = {};
PAPERS.forEach(p => (byPid[p.pid] = byPid[p.pid] || []).push(p));

const people = Object.keys(PEOPLE).map(pid => {
  const v = PEOPLE[pid];
  const ps = (byPid[pid] || []).slice().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const o = {
    pid, en: v.en, zh: v.zh, tiEn: v.tiEn, tiZh: v.tiZh, fields: v.fields || [],
    bioEn: v.bioEn, bioZh: v.bioZh, isOrg: ORG_ENTITIES.has(pid),
    papers: ps.map(p => ({ id: p.id, tEn: p.tEn, tZh: p.tZh, date: p.date, arxiv: p.arxiv || '', org: p.org || '', cites: p.cites == null ? null : p.cites })),
  };
  if (PAPER2POD[pid]) o.podcast = 'https://aipodcast.jasonlin.tech/#/person/' + PAPER2POD[pid];
  if (PAPER_GRAPH[pid]) o.graph = 'https://ai.jasonlin.tech/?node=' + PAPER_GRAPH[pid];
  return o;
}).filter(p => p.papers.length)
  .sort((a, b) => b.papers.length - a.papers.length);

/* 写入前门禁(同 build_index.js 的理由):PEOPLE/PAPERS 一旦被挪出 app.js 或正则失配,
   这里会安静地产出一个人少一半的 people.json,而 MCP 的 list_scholars 就跟着缩水。 */
const OUT = path.join(ROOT, 'data', 'people.json');
let prev = null;
try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e) {}
const bio = people.filter(p => (p.bioEn || '').trim() && (p.bioZh || '').trim()).length / Math.max(people.length, 1);
const bad = [];
if (prev && people.length < prev.count * 0.98) bad.push(`学者数 ${people.length} 比上一版 ${prev.count} 少了 >2%`);
if (bio < 0.9) bad.push(`双语简介完整率 ${(bio * 100).toFixed(1)}% < 90%`);
if (bad.length && !process.argv.includes('--force')) {
  console.error('✗ 门禁不过,people.json 未写入:\n  ' + bad.join('\n  ') +
    '\n  先确认 app.js 里的 PAPERS/PEOPLE 是否还在原位、正则是否还匹配得上;确属真实变化加 --force。');
  process.exit(1);
}
fs.writeFileSync(OUT, JSON.stringify({ count: people.length, people }));
console.log('people.json:', people.length, 'scholars,', people.filter(p => p.isOrg).length, 'org entities');
