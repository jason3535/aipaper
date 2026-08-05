/* 生成 data/index.json —— Ask / 检索 / MCP search_papers 的目录。
   注意:contrib/limits/absEn 必须回落到 data/<id>.json 读,不能只读内联 PAPERS ——
   slim_index.py 早把这些字段从内联里剥掉了(首屏瘦身),照旧只读内联的话
   557/558 篇的「核心贡献」都是空的(MCP 搜索结果一直缺这块,2026-08-03 修)。*/
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
const h=fs.readFileSync(path.join(ROOT,'app.js'),'utf8');
const PAPERS=JSON.parse(h.match(/const PAPERS = ([\s\S]*?);\s*\n\/\* PAPERS_END \*\//)[1]);
const PEOPLE=eval('('+h.match(/const PEOPLE\s*=\s*(\{[\s\S]*?\n\});/)[1]+')');
/* 一句话摘要 2026-08-05 起也从 app.js 抽到了 data/summaries.json(首屏瘦身),
   和 insights 同一个坑:只读内联的话 559/565 篇的 sEn 会变空,
   MCP search_papers 的摘要和 Ask 的选片依据就全没了。*/
let SUMM={};
try{ SUMM=JSON.parse(fs.readFileSync(path.join(ROOT,'data','summaries.json'),'utf8')); }catch(e){}
let miss=0;
const papers=PAPERS.map(p=>{
  let d={};
  try{ d=JSON.parse(fs.readFileSync(path.join(ROOT,'data',p.id+'.json'),'utf8')); }catch(e){ miss++; }
  const ins=p.insights||d.insights||{};
  /* 不放 absEn:chat-worker 选片只用 标题+一句话,MCP search_papers 也不返回摘要,
     放进来白白让目录大一倍(全文摘要要用的话 get_paper 里有)。*/
  const sEn=p.sEn||(SUMM[p.id]||{}).sEn||d.sEn||'';
  return {id:p.id,person:(PEOPLE[p.pid]||{}).en||p.pid,tEn:p.tEn,tZh:p.tZh,sEn,date:p.date,
    contrib:(ins.contrib||[]).map(x=>x.en),limits:(ins.limits||[]).map(x=>x.en)};
});
/* ===== 写入前门禁 =====
   两天内已经三次同一个模式:某个字段被抽出 app.js 做首屏瘦身,而脚本还在读内联块,
   于是静默产出一堆空字段(insights 空过、sEn 差点空)。这些字段喂的是 MCP 与 Ask,
   页面上看不出来,只能靠门禁拦。规则:绝对非空率跌破下限、或比上一版倒退 >2 个点,
   都不写文件、非零退出。确属真实变化(如批量收录无贡献的短文)时用 --force 放行。 */
const OUT=path.join(ROOT,'data','index.json');
const filled=(arr,k)=>arr.filter(x=>Array.isArray(x[k])?x[k].length:(x[k]||'').trim()).length;
let prev=null;
try{ prev=JSON.parse(fs.readFileSync(OUT,'utf8')).papers; }catch(e){}
const bad=[];
for(const [k,floor] of [['sEn',0.95],['contrib',0.95],['limits',0.90]]){
  const r=filled(papers,k)/papers.length;
  const p0=prev&&prev.length?filled(prev,k)/prev.length:null;
  if(r<floor)              bad.push(`${k} 非空率 ${(r*100).toFixed(1)}% < 下限 ${floor*100}%`);
  else if(p0!==null&&r<p0-0.02) bad.push(`${k} 非空率 ${(r*100).toFixed(1)}%,比上一版 ${(p0*100).toFixed(1)}% 倒退`);
}
if(prev&&papers.length<prev.length*0.98) bad.push(`篇数 ${papers.length} 比上一版 ${prev.length} 少了 >2%`);
if(bad.length&&!process.argv.includes('--force')){
  console.error('✗ 门禁不过,index.json 未写入:\n  '+bad.join('\n  ')+
    '\n  最常见原因:该字段刚被抽出 app.js(见本文件头部注释),脚本还在读内联块 → 补回落再跑。'+
    '\n  确认是真实变化就加 --force。');
  process.exit(1);
}
fs.writeFileSync(OUT,JSON.stringify({papers}));
console.log('index.json:',papers.length,'papers |',filled(papers,'contrib'),'含核心贡献 |',
  filled(papers,'limits'),'含局限 |',filled(papers,'sEn'),'含摘要'+(miss?` | ${miss} 篇缺 data 文件`:''));
