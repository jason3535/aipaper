/* 生成 data/related.json —— 文末「接着读」的相关度来源。
   原来的推荐只看 8 个粗领域标签是否重合,而 428 篇都挂着 nlp,区分度约等于零,
   最终顺序其实由"时间接近 + 随机抖动"决定(Zvi 的评论随笔被推来 Aya 技术报告)。
   这里离线做一遍 BM25:把 标题(中英) + 一句话摘要 + 核心贡献 当作文档,
   为每篇取 Top-12 最相似的,前端直接读,零 LLM 成本、结果确定可复现。 */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const h = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
const PAPERS = JSON.parse(h.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const SUMM = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'summaries.json'), 'utf8'));
const IDX = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'index.json'), 'utf8')).papers;
const CONTRIB = Object.fromEntries(IDX.map(p => [p.id, (p.contrib || []).join(' ')]));

const STOP = new Set(('a an the of for and or to in on with by we our this that these those is are be as at from it its'
  + ' using use used via new novel paper study propose proposed method model models approach results show shows'
  + ' can not more than which their they also however such into over between both while when what how why'
  + ' large small based first second three two one 的 了 和 与 在 是 我们 一个 这个 通过 提出 方法 模型 实验 结果 本文').split(/\s+/));

const tok = s => (s || '').toLowerCase()
  .replace(/[^a-z0-9一-鿿]+/g, ' ')
  .split(/\s+/)
  .flatMap(w => /[一-鿿]/.test(w)                   // 中文按 2-gram 切,英文整词
    ? Array.from({ length: Math.max(0, w.length - 1) }, (_, i) => w.slice(i, i + 2))
    : [w])
  .filter(w => w.length > 1 && w.length < 24 && !STOP.has(w));

const docs = PAPERS.map(p => {
  const s = SUMM[p.id] || {};
  const text = [p.tEn, p.tZh, p.sEn || s.sEn, p.sZh || s.sZh, CONTRIB[p.id]].filter(Boolean).join(' ');
  return { id: p.id, pid: p.pid, art: !p.arxiv, terms: tok(text) };
});

// ---- BM25 ----
const N = docs.length, df = new Map();
docs.forEach(d => new Set(d.terms).forEach(t => df.set(t, (df.get(t) || 0) + 1)));
const avgdl = docs.reduce((a, d) => a + d.terms.length, 0) / N;
const k1 = 1.5, b = 0.75;
const idf = t => Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
const vecs = docs.map(d => {
  const tf = new Map();
  d.terms.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
  const v = new Map();
  for (const [t, f] of tf) {
    if (df.get(t) < 2 || df.get(t) > N * 0.35) continue;      // 只出现一次的词无用,超高频词是噪声
    v.set(t, idf(t) * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.terms.length / avgdl)));
  }
  let norm = 0; for (const x of v.values()) norm += x * x;
  norm = Math.sqrt(norm) || 1;
  for (const [t, x] of v) v.set(t, x / norm);
  return v;
});
// 倒排索引,避免 571×571 全比
const inv = new Map();
vecs.forEach((v, i) => v.forEach((w, t) => { if (!inv.has(t)) inv.set(t, []); inv.get(t).push([i, w]); }));

const K = 12;
const out = {};
docs.forEach((d, i) => {
  const sc = new Map();
  vecs[i].forEach((w, t) => (inv.get(t) || []).forEach(([j, w2]) => {
    if (j !== i) sc.set(j, (sc.get(j) || 0) + w * w2);
  }));
  out[d.id] = [...sc.entries()]
    .sort((a, b2) => b2[1] - a[1])
    .slice(0, K)
    .map(([j, s]) => ({ id: docs[j].id, s: +s.toFixed(3) }));
});

const OUT = path.join(ROOT, 'data', 'related.json');
let prev = null; try { prev = JSON.parse(fs.readFileSync(OUT, 'utf8')); } catch (e) {}
const covered = Object.values(out).filter(v => v.length >= 4).length;
if (covered < docs.length * 0.95 && !process.argv.includes('--force')) {
  console.error(`✗ 门禁不过,related.json 未写入:只有 ${covered}/${docs.length} 篇拿到 ≥4 条相关(疑似分词或数据源出错)`);
  process.exit(1);
}
fs.writeFileSync(OUT, JSON.stringify(out));
console.log('related.json:', docs.length, 'papers |', covered, '篇有 ≥4 条相关 |',
  Math.round(fs.statSync(OUT).size / 1024) + 'KB' + (prev ? ` | 上版 ${Object.keys(prev).length} 篇` : ''));
