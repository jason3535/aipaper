/* audit_paper.js — 新收条目的质检门禁(对标 aipodcast 的 audit_completeness,但这是硬门禁)。
   用法: node pipeline/audit_paper.js <id> [<id>...]   任一条 FAIL → 退出码 1,postingest 不提交。
   审计维度都来自真踩过的事故:
   - Substack 骨架当正文/摘要(Discover more/By subscribing…)  - ⟐ 反斜杠占位符残留
   - 中文覆盖过低(静默丢译)                                   - absEn 为空或为垃圾
   - 内联 PAPERS 没挂上(写了 data 文件但没进目录)              - 日期非 YYYY-MM-DD(Jina 假日期)
   - summaries.json 缺 sEn(搜索/MCP 摘要吃空值) */
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const ids = process.argv.slice(2).filter(x => x !== "--warn-only");
const WARN_ONLY = process.argv.includes("--warn-only");
if (!ids.length) { console.error("用法: node pipeline/audit_paper.js <id> [...ids] [--warn-only]"); process.exit(2); }

const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const PAPERS = JSON.parse(app.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const byId = Object.fromEntries(PAPERS.map(p => [p.id, p]));
let SUMM = {};
try { SUMM = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "summaries.json"), "utf8")); } catch (e) {}

const CHROME = /Discover more from|By subscribing,? you agree|Type your email|Already have an account\?|Ready for more\?/i;
let fails = 0, warns = 0;

for (const id of ids) {
  const errs = [], ws = [];
  const p = byId[id];
  if (!p) errs.push("内联 PAPERS 里没有这条(data 写了但目录没挂上?)");
  let d = null;
  try { d = JSON.parse(fs.readFileSync(path.join(ROOT, "data", id + ".json"), "utf8")); }
  catch (e) { errs.push("data/<id>.json 缺失或 JSON 坏"); }
  if (d) {
    const full = d.full || [];
    const paras = [];
    for (const s of full) for (const it of (s.items || s.paras || []))
      if ((it.t || "para") === "para") paras.push(it);
    if (!full.length) errs.push("full 为空");
    if (paras.length < 5) errs.push(`正文仅 ${paras.length} 段(<5,疑似抓取失败)`);
    const en = paras.filter(x => ((x.en ?? x) + "").trim()).length;
    const zh = paras.filter(x => (x.zh || "").trim()).length;
    if (paras.length && en / paras.length < 0.95) errs.push(`EN 覆盖 ${(en * 100 / paras.length | 0)}% < 95%`);
    if (paras.length && zh / paras.length < 0.6) errs.push(`ZH 覆盖 ${(zh * 100 / paras.length | 0)}% < 60%(静默丢译?)`);
    else if (paras.length && zh / paras.length < 0.9) ws.push(`ZH 覆盖 ${(zh * 100 / paras.length | 0)}%(<90%,可 fill_missing_zh 补)`);
    const blob = JSON.stringify(d);
    if (blob.includes("⟐")) errs.push("含 ⟐ 占位符残留(反斜杠没还原)");
    if (CHROME.test(blob)) errs.push("含 Substack 订阅框/页脚残留");
    if (!(d.absEn || "").trim()) errs.push("absEn 为空");
    else if (CHROME.test(d.absEn)) errs.push("absEn 是订阅框垃圾");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date || "")) errs.push(`date 非法: ${JSON.stringify(d.date)}(Jina 假日期?)`);
    const ins = d.insights || {};
    if ((ins.contrib || []).length < 3) ws.push(`核心贡献仅 ${(ins.contrib || []).length} 条`);
    const sEn = (p && p.sEn) || (SUMM[id] || {}).sEn || d.sEn;
    if (!(sEn || "").trim()) errs.push("一句话摘要 sEn 缺失(搜索/MCP 会吃空值)");
  }
  const tag = errs.length ? "✗ FAIL" : ws.length ? "⚠ WARN" : "✓ PASS";
  console.log(`${tag}  ${id}`);
  for (const e of errs) console.log(`        ✗ ${e}`);
  for (const w of ws) console.log(`        ⚠ ${w}`);
  if (errs.length) fails++;
  if (ws.length) warns++;
}
console.log(`\naudit_paper: ${ids.length} 条 | FAIL ${fails} | WARN ${warns}`);
if (fails && !WARN_ONLY) process.exit(1);
