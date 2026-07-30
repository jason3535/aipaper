// 全库完整性审计:断句(疑似公式/内容被吞)、缺公式、图缺口、内容过少
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const files = fs.readdirSync(path.join(ROOT, "data")).filter(f => f.endsWith(".json") && f !== "index.json");

// 段落 EN 结尾不是终止标点且长度>15 → 疑似公式/内容被吞
const endsBad = t => {
  t = (t || "").trim();
  if (t.length < 15) return false;
  const c = t.slice(-1);
  return !/[.!?:"”』】\)）\]…,;]/.test(c);
};
const refMax = t => {
  let m = 0, r;
  const re = /\b[Ff]ig(?:ure)?\.?\s*(\d+)|图\s*(\d+)/g;
  while ((r = re.exec(t || ""))) { const n = +(r[1] || r[2]); if (n > m) m = n; }
  return m;
};

let rows = [];
for (const f of files) {
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(ROOT, "data", f))); }
  catch (e) { rows.push({ id: f.replace(".json", ""), err: "JSON坏" }); continue; }
  const full = d.full || [];
  let paras = 0, figs = 0, eqs = 0, dang = 0, alltext = "";
  const isArt = !d.arxiv && !d.arxiv;
  for (const s of full) {
    const items = s.items || (s.paras ? s.paras.map(p => ({ t: "para", en: p.en })) : []);
    for (const it of items) {
      if (it.t === "fig") figs++;
      else if (it.t === "eq") eqs++;
      else { paras++; if (endsBad(it.en)) dang++; alltext += " " + (it.en || ""); }
    }
  }
  const maxref = refMax(alltext);
  const figGap = maxref > figs ? maxref - figs : 0;
  rows.push({ id: f.replace(".json", ""), sec: full.length, paras, figs, eqs, dang, maxref, figGap });
}

const bad = rows.filter(r => !r.err);
console.log("总论文:", bad.length, " JSON坏:", rows.filter(r => r.err).length);
console.log("断句嫌疑 dang>=1:", bad.filter(r => r.dang >= 1).length);
console.log("断句严重 dang>=3:", bad.filter(r => r.dang >= 3).length);
console.log("引用图>现有图 figGap>=1:", bad.filter(r => r.figGap >= 1).length);
console.log("内容极少 paras<=3:", bad.filter(r => r.paras <= 3).length);
console.log("\n=== 断句最严重 Top25 ===");
bad.sort((a, b) => b.dang - a.dang).slice(0, 25).forEach(r =>
  console.log(`${String(r.dang).padStart(3)}断 ${String(r.eqs).padStart(3)}公式 ${r.figGap}缺图 ${String(r.paras).padStart(3)}段 [${r.id}]`));
console.log("\n=== 图缺口 Top15 ===");
bad.filter(r => r.figGap >= 1).sort((a, b) => b.figGap - a.figGap).slice(0, 15).forEach(r =>
  console.log(`引用到图${r.maxref}/有${r.figs}图 缺${r.figGap} [${r.id}]`));
console.log("\n=== 内容极少 (paras<=3) ===");
bad.filter(r => r.paras <= 3).sort((a, b) => a.paras - b.paras).slice(0, 20).forEach(r =>
  console.log(`${r.paras}段 ${r.sec}节 [${r.id}]`));

// 导出全量供后续处理
fs.writeFileSync(path.join(__dirname, "audit_result.json"), JSON.stringify(bad, null, 0));
