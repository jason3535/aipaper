// 为每篇论文生成静态预渲染分享页 p/<id>/index.html(带该篇 OG 元标签 + 跳回 SPA),
// 让微信/社交分享链接预览显示「论文标题/摘要」而非千篇一律的首页卡片。另出 sitemap.xml。
// 内容更新(新增论文/改标题)后重跑: node pipeline/build_share_pages.js
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'),SITE='https://aipaper.jasonlin.tech';
const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const PAPERS=JSON.parse(h.match(/const PAPERS = (\[[\s\S]*?\]);/)[1]);
const PEOPLE=eval('('+h.match(/const PEOPLE=(\{[\s\S]*?\n\});/)[1]+')');
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const PDIR=path.join(ROOT,'p');fs.rmSync(PDIR,{recursive:true,force:true});fs.mkdirSync(PDIR,{recursive:true});
let n=0;
PAPERS.forEach(p=>{
  const pe=PEOPLE[p.pid]||{};
  const title=`${esc(p.tZh||p.tEn)} · ${esc(pe.zh||pe.en||'')} — AI Paper`;
  let kp='';
  try{const d=JSON.parse(fs.readFileSync(path.join(ROOT,'data',p.id+'.json'),'utf8'));
    const c0=d.insights&&d.insights.contrib&&d.insights.contrib[0];
    if(c0&&c0.zh)kp='｜核心贡献：'+esc(c0.zh);}catch(e){}
  const desc=esc(p.sZh||p.sEn||'')+kp;
  const hash=`${SITE}/#/paper/${p.id}`;
  const url=`${SITE}/p/${p.id}/`;
  const html=`<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="AI Paper · 双语论文阅读站">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE}/assets/og.png">
<link rel="canonical" href="${hash}">
<meta http-equiv="refresh" content="0;url=${hash}">
<script>location.replace(${JSON.stringify(hash)}+(location.search||''));</script>
<style>body{font-family:-apple-system,system-ui,"PingFang SC",sans-serif;background:#fff;color:#1d1d1f;display:grid;place-items:center;height:100vh;margin:0}a{color:#0071e3}</style>
</head><body><p>正在前往《${esc(p.tZh||p.tEn)}》…&nbsp;<a href="${hash}">未跳转?点此进入</a></p></body></html>`;
  fs.mkdirSync(path.join(PDIR,p.id),{recursive:true});
  fs.writeFileSync(path.join(PDIR,p.id,'index.html'),html);
  n++;
});
// sitemap.xml(首页 + 各论文分享页)
const urls=[`${SITE}/`,...PAPERS.map(p=>`${SITE}/p/${p.id}/`)];
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`+
  urls.map(u=>`  <url><loc>${u}</loc></url>`).join('\n')+`\n</urlset>\n`);
console.log('生成分享页',n,'个 (p/<id>/index.html) + sitemap.xml',urls.length,'条');
