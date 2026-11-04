/* gate_fast.js — 推送前就能跑的只读门禁,postingest.sh 第 8 步与 verify_site.py 共用。
   不写文件、不调用 aipodcast 仓库。
   用法:
     node pipeline/gate_fast.js              抽查静态页埋点 + app.js 语法 + 版本号
     node pipeline/gate_fast.js <id> [...]    再强制检查这些分享页的埋点(缺页即失败)
   任一项失败 → 退出码 1。 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const ROOT = path.resolve(__dirname, "..");
const extra = process.argv.slice(2).filter(x => x && !x.startsWith("-"));

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

const appPath = path.join(ROOT, "app.js");
const indexPath = path.join(ROOT, "index.html");
let app;
try { app = fs.readFileSync(appPath, "utf8"); }
catch (e) { fail("  ✗ 读不到 app.js"); }

try { new Function(app); console.log("  app.js 语法 OK"); }
catch (e) { fail("  ✗ app.js 语法错误: " + e.message); }

const hash = crypto.createHash("md5").update(app).digest("hex").slice(0, 10);
const index = fs.readFileSync(indexPath, "utf8");
const m = index.match(/app\.js\?v=([a-f0-9]+)/);
if (!m || m[1] !== hash) {
  fail("  ✗ index.html 的 app.js?v=" + (m && m[1]) + " ≠ app.js md5 " + hash + " —— 跑 node pipeline/build_share_pages.js");
}
console.log("  app.js 版本号与内容一致(" + hash + ")");

/* 静态页埋点:两条流都得在。掉了不会报错、页面照常渲染,只是从此再也分不清爬虫。
   抽查口径与原先写在 postingest.sh 里的那段一致。 */
function beaconOk(file) {
  const h = fs.readFileSync(file, "utf8");
  return /stats\.jasonlin\.tech/.test(h) && /post\(.view.\)/.test(h) && /post\(.read.\)/.test(h);
}
const bad = [];
for (const [dir, n] of [["p", 6], ["pp", 6]]) {
  const dirp = path.join(ROOT, dir);
  const ids = fs.readdirSync(dirp).filter(x => fs.existsSync(path.join(dirp, x, "index.html")));
  const step = Math.max(1, Math.floor(ids.length / n));
  for (const id of ids.filter((_, i) => i % step === 0).slice(0, n)) {
    if (!beaconOk(path.join(dirp, id, "index.html"))) bad.push(dir + "/" + id);
  }
}
if (bad.length) {
  fail("  ✗ 静态页埋点缺失或缺 read 流:" + bad.slice(0, 3).join("、") +
    "\n    → build_share_pages.js 还在读 aipodcast 仓库的 pipeline/beacon.js 吗?");
}
console.log("  静态页埋点:抽查 12 页,view+read 两条流齐全");

const missingPage = [];
const missingBeacon = [];
for (const id of extra) {
  const file = path.join(ROOT, "p", id, "index.html");
  if (!fs.existsSync(file)) { missingPage.push(id); continue; }
  if (!beaconOk(file)) missingBeacon.push(id);
}
if (missingPage.length) {
  fail("  ✗ 分享页不存在: " + missingPage.slice(0, 8).join("、") + " —— 跑 node pipeline/build_share_pages.js");
}
if (missingBeacon.length) {
  fail("  ✗ 这些分享页埋点缺失或缺 read 流: " + missingBeacon.slice(0, 8).join("、"));
}
if (extra.length) console.log("  指定分享页埋点 OK(" + extra.length + " 篇)");
