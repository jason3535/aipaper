// 批量补全后处理:①回填 addedAt/cites(add_paper 会重置)到 data 文件 + PAPERS[];②报告仍空的论文。
// 用法: node pipeline/reingest_postfix.js
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const orig = JSON.parse(fs.readFileSync("/tmp/empty_papers.json"));  // 补全前的 addedAt/cites 快照

function blockCount(d) {
  return (d.full || []).reduce((a, s) => a + ((s.items || s.paras || []).length), 0);
}

const h = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const a = h.indexOf("const PAPERS = "), b = h.indexOf("/* PAPERS_END */");
const papers = JSON.parse(h.slice(a + 15, b).trim().replace(/;$/, ""));
const byId = Object.fromEntries(papers.map(p => [p.id, p]));

let filled = 0, empty = [], restored = 0;
for (const o of orig) {
  const fp = path.join(ROOT, "data", o.id + ".json");
  let d; try { d = JSON.parse(fs.readFileSync(fp)); } catch (e) { empty.push(o.id + "(无data)"); continue; }
  const n = blockCount(d);
  if (n >= 5) {
    filled++;
    // 回填 addedAt/cites 到 data 文件
    if (o.addedAt) d.addedAt = o.addedAt;
    if (o.cites != null) d.cites = o.cites;
    fs.writeFileSync(fp, JSON.stringify(d));
    // 回填到 PAPERS[]
    const p = byId[o.id];
    if (p) {
      if (o.addedAt) p.addedAt = o.addedAt;
      if (o.cites != null) p.cites = o.cites;
      restored++;
    }
  } else {
    empty.push(o.id + `(${n}块)`);
  }
}

// 写回 index.html PAPERS
const nh = h.slice(0, a) + "const PAPERS = " + JSON.stringify(papers) + ";\n/* PAPERS_END */" + h.slice(b + "/* PAPERS_END */".length);
fs.writeFileSync(path.join(ROOT, "app.js"), nh);

console.log(`补全成功: ${filled}/${orig.length} | 回填 addedAt/cites: ${restored}`);
console.log(`仍空(需 PDF 手工/换源): ${empty.length}`);
empty.forEach(e => console.log("  " + e));
