// SEO/GEO 静态预渲染:为每篇论文生成 p/<id>/(真实正文 + JSON-LD ScholarlyArticle),
// 每位学者/机构实体生成 pp/<pid>/(hub),首页注入结构化数据,产出 sitemap.xml + llms.txt。
// 静态页含真实可抓取内容(不再只是跳转壳),正文顶部有「打开互动全文版」链接回 SPA。
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..'),SITE='https://aipaper.jasonlin.tech';
const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const PAPERS=JSON.parse(h.match(/const PAPERS = (\[[\s\S]*?\]);/)[1]);
const PEOPLE=eval('('+h.match(/const PEOPLE=(\{[\s\S]*?\n\});/)[1]+')');
const esc=s=>(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const jl=o=>`<script type="application/ld+json">${JSON.stringify(o).replace(/</g,'\\u003c')}</script>`;
const full=id=>{try{return JSON.parse(fs.readFileSync(path.join(ROOT,'data',id+'.json'),'utf8'));}catch(e){return{};}};
const CSS=`:root{--ink:#1d1d1f;--sub:#6e6e73;--line:#e6e6ea;--acc:#0a76e9}*{box-sizing:border-box}body{font-family:-apple-system,"SF Pro Text",system-ui,"PingFang SC",sans-serif;color:var(--ink);background:#fff;margin:0;line-height:1.62}.wrap{max-width:760px;margin:0 auto;padding:34px 22px 80px}nav.bc{font-size:13px;color:var(--sub);margin-bottom:20px}nav.bc a{color:var(--sub);text-decoration:none}h1{font-size:26px;line-height:1.28;margin:.2em 0 .1em;letter-spacing:-.02em}.en-t{font-size:16px;color:var(--sub);margin:0 0 10px}.meta{font-size:14px;color:var(--sub);margin:8px 0 22px}.meta a{color:var(--acc);text-decoration:none}.cta{display:inline-block;margin:6px 0 26px;padding:10px 18px;background:var(--acc);color:#fff;border-radius:980px;font-size:14px;font-weight:600;text-decoration:none}h2{font-size:16px;margin:30px 0 10px;padding-top:8px;border-top:1px solid var(--line)}.zh{margin:.35em 0}.en{margin:.15em 0 1em;color:var(--sub);font-size:14.5px}ul{padding-left:1.1em}li{margin:.5em 0}.p-list a{color:var(--ink)}footer{margin-top:44px;padding-top:16px;border-top:1px solid var(--line);font-size:12px;color:var(--sub)}footer a{color:var(--sub)}`;
const page=(title,desc,url,ogtype,bodyHtml,ld)=>`<!doctype html><html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${ogtype}">
<meta property="og:site_name" content="AI Paper · 双语论文阅读站">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE}/assets/og.png">
${ld.map(jl).join('\n')}
<style>${CSS}</style></head><body><div class="wrap">${bodyHtml}
<footer>© AI Paper · <a href="${SITE}/">aipaper.jasonlin.tech</a> — 著名 AI 学者的代表论文,逐段中英对照。论文正文/摘要版权归原作者与 arXiv,译文 AI 生成仅供参考,应权利人要求即下架(linzheng3535@gmail.com)。</footer>
</div></body></html>`;

const byPid={};PAPERS.forEach(p=>(byPid[p.pid]=byPid[p.pid]||[]).push(p));
const PDIR=path.join(ROOT,'p');fs.rmSync(PDIR,{recursive:true,force:true});fs.mkdirSync(PDIR,{recursive:true});
const HDIR=path.join(ROOT,'pp');fs.rmSync(HDIR,{recursive:true,force:true});fs.mkdirSync(HDIR,{recursive:true});
let n=0;
PAPERS.forEach(p=>{
  const pe=PEOPLE[p.pid]||{};
  const d=full(p.id);
  const contrib=(d.insights&&d.insights.contrib)||[],limits=(d.insights&&d.insights.limits)||[];
  const secs=(d.full||[]).map(s=>({en:s.sec||'',zh:s.secZh||''})).filter(s=>s.en||s.zh);
  const title=`${esc(p.tZh||p.tEn)} · ${esc(pe.zh||pe.en||'')} — AI Paper`;
  const kp=contrib[0]&&contrib[0].zh?'｜核心贡献：'+esc(contrib[0].zh):'';
  const desc=esc(p.sZh||p.sEn||'')+kp;
  const url=`${SITE}/p/${p.id}/`,hash=`${SITE}/#/paper/${p.id}`,person=`${SITE}/pp/${p.pid}/`;
  const srcUrl=p.arxiv?`https://arxiv.org/abs/${p.arxiv}`:(p.srcUrl||'');
  const srcLbl=p.arxiv?`arXiv:${p.arxiv}`:(p.srcLabel||'原文');
  const li=arr=>arr.map(x=>`<li><span class="zh">${esc(x.zh)}</span><br><span class="en">${esc(x.en)}</span></li>`).join('');
  const body=`<nav class="bc"><a href="${SITE}/">AI Paper</a> › <a href="${person}">${esc(pe.zh||pe.en||'')}</a> › 论文</nav>
<h1>${esc(p.tZh||p.tEn)}</h1><p class="en-t">${esc(p.tEn)}</p>
<p class="meta"><a href="${person}">${esc(pe.zh||'')} ${esc(pe.en||'')}</a> · ${esc(p.org||'')} · ${esc(p.date||'')}${srcUrl?` · <a href="${esc(srcUrl)}" rel="nofollow">${esc(srcLbl)} ↗</a>`:''}${p.cites!=null?` · 被引 ${p.cites}`:''}</p>
<a class="cta" href="${hash}">打开互动全文版（逐段中英对照 + 图/公式 + 论文问答）→</a>
${(d.absZh||p.sZh||d.absEn||p.sEn)?`<h2>摘要 · Abstract</h2><p class="zh">${esc(d.absZh||p.sZh||'')}</p><p class="en">${esc(d.absEn||p.sEn||'')}</p>`:''}
${contrib.length?`<h2>核心贡献 · Key contributions</h2><ul>${li(contrib)}</ul>`:''}
${limits.length?`<h2>局限 · Limitations</h2><ul>${li(limits)}</ul>`:''}
${secs.length?`<h2>论文章节 · Sections（共 ${secs.length}）</h2><ul>${secs.map(s=>`<li><span class="zh">${esc(s.zh)}</span> <span class="en">${esc(s.en)}</span></li>`).join('')}</ul>`:''}
<p style="margin-top:26px"><a class="cta" href="${hash}">阅读逐段中英对照全文 →</a></p>`;
  const art={"@context":"https://schema.org","@type":"ScholarlyArticle",headline:p.tEn,alternativeHeadline:p.tZh,name:p.tEn,url,datePublished:p.date,inLanguage:["en","zh"],abstract:d.absEn||p.sEn||p.sZh,description:p.sEn||p.sZh,keywords:(p.fields||[]).join(', '),author:{"@type":"Person",name:pe.en,jobTitle:pe.tiEn,url:person},isPartOf:{"@type":"WebSite",name:"AI Paper",url:SITE}};
  if(p.org)art.sourceOrganization={"@type":"Organization",name:p.org};
  if(srcUrl)art.sameAs=srcUrl;
  if(p.cites!=null)art.interactionStatistic={"@type":"InteractionCounter",interactionType:"https://schema.org/CiteAction",userInteractionCount:p.cites};
  const ld=[art,{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"AI Paper",item:SITE+"/"},{"@type":"ListItem",position:2,name:pe.zh||pe.en||'',item:person},{"@type":"ListItem",position:3,name:p.tZh||p.tEn,item:url}]}];
  fs.mkdirSync(path.join(PDIR,p.id),{recursive:true});
  fs.writeFileSync(path.join(PDIR,p.id,'index.html'),page(title,desc,url,'article',body,ld));
  n++;
});
// 学者/实体 hub 页
let pn=0;
Object.keys(byPid).forEach(pid=>{
  const pe=PEOPLE[pid]||{};if(!pe.en)return;
  const ps=byPid[pid].slice().sort((a,b)=>(b.cites||0)-(a.cites||0));
  const url=`${SITE}/pp/${pid}/`;
  const title=`${esc(pe.zh||'')} ${esc(pe.en||'')} 的代表论文（${ps.length} 篇）— AI Paper`;
  const desc=esc(((pe.zh||'')+' '+(pe.en||'')+'：'+(pe.tiZh||pe.tiEn||'')+'。收录 '+ps.length+' 篇双语论文全文——'+(pe.bioZh||'')).slice(0,180));
  const body=`<nav class="bc"><a href="${SITE}/">AI Paper</a> › ${esc(pe.zh||pe.en||'')}</nav>
<h1>${esc(pe.zh||'')} ${esc(pe.en||'')}</h1><p class="en-t">${esc(pe.tiZh||'')} · ${esc(pe.tiEn||'')}</p>
${pe.bioZh?`<p class="zh">${esc(pe.bioZh)}</p><p class="en">${esc(pe.bioEn||'')}</p>`:''}
<a class="cta" href="${SITE}/#/person/${pid}">在 AI Paper 查看 TA 的全部论文 →</a>
<h2>收录的 ${ps.length} 篇论文（按被引排序）</h2>
<ul class="p-list">${ps.map(p=>`<li><a href="${SITE}/p/${p.id}/">${esc(p.tZh||p.tEn)}</a> — ${esc(p.org||'')} · ${esc(p.date||'')}${p.cites!=null?` · 被引 ${p.cites}`:''}</li>`).join('')}</ul>`;
  const ld=[{"@context":"https://schema.org","@type":"ProfilePage",mainEntity:{"@type":"Person",name:pe.en,alternateName:pe.zh,jobTitle:pe.tiEn,description:pe.bioEn,url}},
    {"@context":"https://schema.org","@type":"ItemList",itemListElement:ps.map((p,i)=>({"@type":"ListItem",position:i+1,url:`${SITE}/p/${p.id}/`,name:p.tEn}))},
    {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"AI Paper",item:SITE+"/"},{"@type":"ListItem",position:2,name:pe.zh||pe.en||'',item:url}]}];
  fs.mkdirSync(path.join(HDIR,pid),{recursive:true});
  fs.writeFileSync(path.join(HDIR,pid,'index.html'),page(title,desc,url,'profile',body,ld));
  pn++;
});
// sitemap
const today=new Date().toISOString().slice(0,10);
const urls=[[`${SITE}/`,today],
  ...Object.keys(byPid).filter(pid=>PEOPLE[pid]).map(pid=>{const ds=byPid[pid].map(p=>(p.date||today)).sort().reverse();return [`${SITE}/pp/${pid}/`,(ds[0]||today).slice(0,10)];}),
  ...PAPERS.map(p=>[`${SITE}/p/${p.id}/`,((p.date||today)+'').slice(0,10)])];
fs.writeFileSync(path.join(ROOT,'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`+
  urls.map(([u,d])=>`  <url><loc>${u}</loc><lastmod>${d}</lastmod></url>`).join('\n')+`\n</urlset>\n`);
// llms.txt
const scholars=Object.keys(byPid).filter(pid=>PEOPLE[pid]);
const llms=`# AI Paper · 双语论文阅读站\n\n> 著名 AI 学者与他们的里程碑论文——逐段中英对照全文 + 图/公式/附录 + 核心贡献 + 被引数 + 论文问答。A bilingual reading site of famous AI scholars and their landmark papers — paragraph-by-paragraph English↔Chinese full text, figures/equations, key contributions, citation counts, and paper Q&A.\n\n站点: ${SITE}/\n规模: ${scholars.length} 位学者 / ${PAPERS.length} 篇论文\n每篇静态页含: 双语摘要、核心贡献、局限、章节;互动版含逐段中英对照全文 + 图/公式 + 单篇/全站问答。\n\n## 学者 Scholars\n${scholars.sort((a,b)=>byPid[b].length-byPid[a].length).slice(0,120).map(pid=>{const pe=PEOPLE[pid];return `- [${pe.en}${pe.zh?' / '+pe.zh:''}](${SITE}/pp/${pid}/): ${(pe.tiEn||'').replace(/\n/g,' ')} — ${byPid[pid].length} 篇`;}).join('\n')}\n\n## 高被引论文 Most-cited papers\n${PAPERS.slice().filter(p=>p.cites!=null).sort((a,b)=>(b.cites||0)-(a.cites||0)).slice(0,50).map(p=>{const pe=PEOPLE[p.pid]||{};return `- [${p.tEn}](${SITE}/p/${p.id}/) — ${pe.en||''}, ${p.org||''}, 被引 ${p.cites}`;}).join('\n')}\n\n## 数据接口\n- sitemap: ${SITE}/sitemap.xml\n- 论文检索目录: ${SITE}/data/index.json\n`;
fs.writeFileSync(path.join(ROOT,'llms.txt'),llms);
console.log('分享页',n,'篇 + 学者 hub',pn,'个 + sitemap',urls.length,'条 + llms.txt');
