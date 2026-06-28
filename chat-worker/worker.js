/**
 * AI Paper — 论文问答代理 (Cloudflare Worker, 流式)
 * POST {q, id?, mode?}
 *   mode 'paper'(默认,需 id): 就该篇论文全文回答,引用 [#节号]。
 *   mode 'all': 全站——DeepSeek 从论文目录选相关论文,综合其贡献/局限回答,引用 [@id]。
 * 数据从 raw.githubusercontent 拉(不依赖自定义域名/Pages)。密钥 secret DEEPSEEK_KEY。
 */
const DATA = 'https://raw.githubusercontent.com/jason3535/aipaper/master/data';
const ALLOW = new Set(['https://aipaper.jasonlin.tech','http://localhost:8099','http://127.0.0.1:8099','null']);
const MAX_Q = 500, MAX_CTX = 46000, mem = {};
const cors = o => ({ 'Access-Control-Allow-Origin': ALLOW.has(o) ? o : 'https://aipaper.jasonlin.tech',
  'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin' });
async function getJSON(path){ if(mem[path])return mem[path]; const url=`${DATA}/${path}`,c=caches.default;
  let r=await c.match(url); if(!r){ r=await fetch(url,{cf:{cacheTtl:600}}); if(r.ok)await c.put(url,r.clone()); }
  if(!r.ok)return null; const j=await r.json(); mem[path]=j; return j; }
function paperContext(p){ let out=[`摘要: ${p.absEn||''}`],n=0;
  (p.full||[]).forEach((s,i)=>{ const blk=`[#${i}] ${s.sec}\n`+(s.paras||[]).map(x=>x.en).join(' ')+'\n';
    if(n+blk.length<=MAX_CTX){ out.push(blk); n+=blk.length; } });
  return out.join('\n'); }
async function dsOnce(env,messages,mx){ const r=await fetch('https://api.deepseek.com/chat/completions',{method:'POST',
    headers:{'Authorization':`Bearer ${env.DEEPSEEK_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'deepseek-chat',messages,temperature:0.1,max_tokens:mx||300,response_format:{type:'json_object'}})});
  if(!r.ok)throw new Error('DeepSeek '+r.status); return JSON.parse((await r.json()).choices[0].message.content); }
async function dsStream(env,messages,write){ const r=await fetch('https://api.deepseek.com/chat/completions',{method:'POST',
    headers:{'Authorization':`Bearer ${env.DEEPSEEK_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({model:'deepseek-chat',messages,temperature:0.2,max_tokens:1200,stream:true})});
  if(!r.ok){ await write('（出错:DeepSeek '+r.status+'）'); return; }
  const rd=r.body.getReader(),dec=new TextDecoder(); let buf='';
  for(;;){ const{done,value}=await rd.read(); if(done)break; buf+=dec.decode(value,{stream:true}); let i;
    while((i=buf.indexOf('\n'))>=0){ const line=buf.slice(0,i).trim(); buf=buf.slice(i+1);
      if(!line.startsWith('data:'))continue; const d=line.slice(5).trim(); if(d==='[DONE]')return;
      try{ const c=JSON.parse(d).choices[0].delta.content; if(c)await write(c); }catch(_){} } } }
export default { async fetch(req,env){
  const origin=req.headers.get('Origin')||'',co=cors(origin);
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers:co});
  if(req.method!=='POST')return new Response('POST only',{status:405,headers:co});
  if(origin&&!ALLOW.has(origin))return new Response('forbidden',{status:403,headers:co});
  let b; try{ b=await req.json(); }catch{ return jerr('bad json',400,co); }
  const q=(b.q||b.question||'').toString().slice(0,MAX_Q).trim();
  const mode=b.mode==='all'?'all':'paper';
  if(!q)return jerr('缺少 q',400,co);
  let sys;
  if(mode==='paper'){
    const p=await getJSON(`${(b.id||'').replace(/[^a-z0-9.\-]/gi,'')}.json`);
    if(!p)return jerr('论文不存在',404,co);
    sys=`你是「AI Paper」单篇论文问答助手。下面是论文《${p.tEn||''}》的摘要与正文,每节前有 [#序号]。
规则:只据这篇论文回答,不编造;关键论断后用 [#序号] 标注出处;论文没讲到就说「这篇论文没有涉及」;用提问语言、简洁、先给结论。
论文:
${paperContext(p)}`;
  } else {
    const idx=await getJSON('index.json'); if(!idx)return jerr('目录不可用',503,co);
    const ps=idx.papers||[]; const catalog=ps.map(e=>`${e.id} | ${e.person} | ${e.tEn} | ${e.sEn||''}`).join('\n');
    let picked=[];
    try{ const sel=await dsOnce(env,[{role:'system',content:`下面是论文目录(id | 作者 | 标题 | 一句话). 据问题挑最相关≤6篇,只输出 JSON {"ids":["..."]}。\n${catalog}`},{role:'user',content:q}],400);
      picked=(sel.ids||[]).filter(id=>ps.find(e=>e.id===id)).slice(0,6); }catch(_){}
    if(!picked.length)picked=ps.slice(0,5).map(e=>e.id);
    const ctx=picked.map(id=>{ const e=ps.find(x=>x.id===id); if(!e)return'';
      return `[@${e.id}] ${e.person}《${e.tEn}》(${e.date})\n核心贡献:\n`+(e.contrib||[]).map(x=>'  · '+x).join('\n')+`\n局限:\n`+(e.limits||[]).map(x=>'  ! '+x).join('\n'); }).join('\n\n');
    sys=`你是「AI Paper」全站问答助手。下面是若干论文的「核心贡献/局限」,每段前有 [@id]。
规则:综合这些材料回答,对比不同论文;每个论断后用 [@id] 标注来源;材料没有的不编;用提问语言,先结论再展开。
材料:
${ctx}`;
  }
  const msgs=[{role:'system',content:sys},{role:'user',content:q}];
  const{readable,writable}=new TransformStream(); const w=writable.getWriter(),enc=new TextEncoder();
  (async()=>{ try{ await dsStream(env,msgs,t=>w.write(enc.encode(t))); }
    catch(e){ try{ await w.write(enc.encode('（出错:'+(e.message||e)+'）')); }catch(_){} }
    finally{ try{ w.close(); }catch(_){} } })();
  return new Response(readable,{headers:{...co,'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});
} };
function jerr(m,s,co){ return new Response(JSON.stringify({error:m}),{status:s,headers:{...co,'Content-Type':'application/json'}}); }
