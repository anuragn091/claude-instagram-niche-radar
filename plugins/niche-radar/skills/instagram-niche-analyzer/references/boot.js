(function(){
if(window.__nicheBoot) return 'already';
window.__nicheBoot=true; window.__cap=[];
const oo=XMLHttpRequest.prototype.open, os=XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open=function(m,u){this.__u=u;return oo.apply(this,arguments)};
XMLHttpRequest.prototype.send=function(){this.addEventListener('load',()=>{try{if(/graphql|api\/v1/.test(this.__u)) window.__cap.push({u:String(this.__u).split('?')[0],t:this.responseText})}catch(e){}});return os.apply(this,arguments)};
const of=window.fetch; window.fetch=async function(i,o){const res=await of.apply(this,arguments);try{const u=typeof i==='string'?i:i.url;if(/graphql|api\/v1/.test(u)){res.clone().text().then(t=>window.__cap.push({u:u.split('?')[0],t}))}}catch(e){}return res};
const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
window.__items=load('__nicheKW'); window.__grid=load('__nicheGrid'); window.__prof=load('__nicheProf'); window.__log=[];
window.__eachJSON=function(t,f){let ok=false;try{f(JSON.parse(t));ok=true}catch(e){} if(!ok){for(const line of t.split('\n')){try{f(JSON.parse(line))}catch(e){}}}};
window.__walkK=function(o,d,src){ if(!o||typeof o!=='object'||d>45) return;
 if(typeof o.code==='string'&&o.code.length>=10&&(o.taken_at!==undefined||o.like_count!==undefined)){
 const it=window.__items[o.code]||{code:o.code,src:[]}; const u=o.user||o.owner||{};
 const set=(k,v)=>{if(v!==undefined&&v!==null) it[k]=v};
 set('user',u.username); set('ts',o.taken_at); set('likes',o.like_count); set('comments',o.comment_count);
 set('cap',o.caption?.text?.slice(0,400)); set('mtype',o.media_type); set('dur',o.video_duration);
 const cm=o.clips_metadata, mi=cm?.music_info?.music_asset_info; set('audio', mi?((mi.title||'')+' / '+(mi.display_artist||'')):(cm?.original_sound_info?'Original audio':undefined));
 set('audioId', cm?.original_sound_info?.audio_asset_id || mi?.audio_cluster_id); set('audioType', cm?.audio_type); set('audioOwner', cm?.original_sound_info?.ig_artist?.username || mi?.display_artist);
 if(cm){ let tr; const ft=(x,d)=>{ if(!x||typeof x!=='object'||d>6||tr!==undefined) return; if(x.is_trending_in_clips!==undefined) tr=x.is_trending_in_clips; for(const k in x) ft(x[k],d+1); }; ft(cm,0); set('audioTrend',tr); }
 set('loc',o.location?.name); set('locpk',o.location?.pk);
 if(src&&!it.src.includes(src)) it.src.push(src); window.__items[o.code]=it; }
 for(const k in o) window.__walkK(o[k],d+1,src); };
window.__walkG=function(o,d,user){ if(!o||typeof o!=='object'||d>45) return;
 if(o.username&&o.follower_count!==undefined) window.__prof[o.username]={fol:o.follower_count,posts:o.media_count,name:(o.full_name||'').slice(0,50)};
 if(typeof o.code==='string'&&o.code.length>=10&&(o.play_count!==undefined||o.ig_play_count!==undefined)){
 const g=window.__grid[o.code]||{code:o.code}; g.user=o.user?.username||o.owner?.username||g.user||user;
 g.play=o.play_count??o.ig_play_count; g.likes=o.like_count??g.likes; g.comments=o.comment_count??g.comments;
 g.pinned=!!(o.clips_tab_pinned_user_ids&&o.clips_tab_pinned_user_ids.length)||g.pinned||false;
 window.__grid[o.code]=g; }
 for(const k in o) window.__walkG(o[k],d+1,user); };
window.__nav=function(path,needle,timeoutMs){ window.__cap=[]; let res; const p=new Promise(r=>{res=r});
 window.__cap.push=function(x){Array.prototype.push.call(this,x); if(x.t&&x.t.includes(needle)) res('ok')};
 const fb=setTimeout(()=>res('timeout'),timeoutMs||20000);
 history.pushState({},'',path); dispatchEvent(new PopStateEvent('popstate',{state:{}}));
 return p.then(v=>{clearTimeout(fb);return v}); };
window.__kw=async function(q){ const how=await window.__nav('/explore/search/keyword/?q='+encodeURIComponent(q),'taken_at');
 window.__cap.forEach(c=>window.__eachJSON(c.t,j=>window.__walkK(j,0,'kw:'+q))); save('__nicheKW',window.__items);
 return q+' '+how+' total '+Object.keys(window.__items).length; };
window.__creator=async function(user){ const how=await window.__nav('/'+user+'/reels/','play_count');
 window.__cap.forEach(c=>window.__eachJSON(c.t,j=>window.__walkG(j,0,user))); save('__nicheGrid',window.__grid); save('__nicheProf',window.__prof);
 return user+' '+how+' reels '+Object.values(window.__grid).filter(g=>g.user===user).length+' fol '+(window.__prof[user]?.fol); };
window.__loc=async function(path){ const how=await window.__nav(path,'taken_at');
 window.__cap.forEach(c=>window.__eachJSON(c.t,j=>window.__walkK(j,0,'loc:'+path))); save('__nicheKW',window.__items);
 return path+' '+how+' total '+Object.keys(window.__items).length; };
window.__queue=async function(kind,list){ window.__busy=true; for(const x of list){ try{window.__log.push(await (kind==='kw'?window.__kw(x):kind==='loc'?window.__loc(x):window.__creator(x)))}catch(e){window.__log.push(x+' ERR '+e.message)} } window.__busy=false; };
window.__dump=function(text){ let el=document.getElementById('__dump'); if(!el){el=document.createElement('article');el.id='__dump';document.body.prepend(el)} el.textContent='DUMPSTART '+text+' DUMPEND'; return el.textContent.length; };
window.__clean=s=>(s||'').replace(/https?:\/\/\S+/g,'[link]').replace(/\S+\.(com|in|io|ly|ee|co|me|ai)\/\S*/g,'[link]').replace(/[=&?¦⏎]/g,' ').replace(/\s+/g,' ');
window.__timeline=async function(user){ const how=await window.__nav('/'+user+'/','taken_at',20000); window.__cap.forEach(c=>window.__eachJSON(c.t,j=>window.__walkK(j,0,'tl'))); save('__nicheKW',window.__items); return user+' tl '+how; };
window.__tlq=async function(list){ window.__busy=true; for(const u of list){ try{window.__log.push(await window.__timeline(u))}catch(e){window.__log.push(u+' ERR')} } window.__busy=false; };
return 'booted kw '+Object.keys(window.__items).length+' grid '+Object.keys(window.__grid).length;
})()
