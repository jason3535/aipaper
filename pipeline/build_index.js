const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const PAPERS=JSON.parse(h.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const PEOPLE=eval('('+h.match(/const PEOPLE\s*=\s*(\{[\s\S]*?\n\});/)[1]+')');
const papers=PAPERS.map(p=>({id:p.id,person:(PEOPLE[p.pid]||{}).en||p.pid,tEn:p.tEn,tZh:p.tZh,sEn:p.sEn,date:p.date,
  contrib:((p.insights||{}).contrib||[]).map(x=>x.en),limits:((p.insights||{}).limits||[]).map(x=>x.en),absEn:p.absEn}));
fs.writeFileSync(path.join(ROOT,'data','index.json'),JSON.stringify({papers}));
console.log('index.json:',papers.length,'papers');
