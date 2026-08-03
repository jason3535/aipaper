/* 生成 data/index.json —— Ask / 检索 / MCP search_papers 的目录。
   注意:contrib/limits/absEn 必须回落到 data/<id>.json 读,不能只读内联 PAPERS ——
   slim_index.py 早把这些字段从内联里剥掉了(首屏瘦身),照旧只读内联的话
   557/558 篇的「核心贡献」都是空的(MCP 搜索结果一直缺这块,2026-08-03 修)。*/
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const h=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const PAPERS=JSON.parse(h.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const PEOPLE=eval('('+h.match(/const PEOPLE\s*=\s*(\{[\s\S]*?\n\});/)[1]+')');
let miss=0;
const papers=PAPERS.map(p=>{
  let d={};
  try{ d=JSON.parse(fs.readFileSync(path.join(ROOT,'data',p.id+'.json'),'utf8')); }catch(e){ miss++; }
  const ins=p.insights||d.insights||{};
  /* 不放 absEn:chat-worker 选片只用 标题+一句话,MCP search_papers 也不返回摘要,
     放进来白白让目录大一倍(全文摘要要用的话 get_paper 里有)。*/
  return {id:p.id,person:(PEOPLE[p.pid]||{}).en||p.pid,tEn:p.tEn,tZh:p.tZh,sEn:p.sEn,date:p.date,
    contrib:(ins.contrib||[]).map(x=>x.en),limits:(ins.limits||[]).map(x=>x.en)};
});
fs.writeFileSync(path.join(ROOT,'data','index.json'),JSON.stringify({papers}));
console.log('index.json:',papers.length,'papers |',papers.filter(x=>x.contrib.length).length,'含核心贡献 |',
  papers.filter(x=>x.limits.length).length,'含局限'+(miss?` | ${miss} 篇缺 data 文件`:''));
