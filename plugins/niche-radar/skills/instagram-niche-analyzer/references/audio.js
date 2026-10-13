// Run on an audio page (https://www.instagram.com/reels/audio/AUDIO_ID/) once the grid has loaded.
// Reads the reuse count and the remake grid from the page itself (no network calls) and saves the result
// in localStorage under __nicheAudio[AUDIO_ID]. Returns a short summary string.
(function(){
  const id=location.pathname.split('/').filter(Boolean).pop();
  const main=document.querySelector('main'); if(!main||!main.innerText.trim()) return id+' not loaded';
  const num=s=>{if(!s)return null; const m=String(s).replace(/,/g,'').match(/([\d.]+)\s*([km])?/i); if(!m)return null; return Math.round(parseFloat(m[1])*({k:1e3,m:1e6}[(m[2]||'').toLowerCase()]||1));};
  const t=main.innerText; const usesText=(t.match(/([\d.,]+\s*[KkMm]?)\s+reels/)||[])[1]||null;
  const lines=t.split('\n').map(s=>s.trim()).filter(Boolean);
  const seen=new Set();
  const rows=[...main.querySelectorAll('a[href*="/reel/"]')].map(a=>{const code=a.getAttribute('href').split('/').filter(Boolean).pop();
    const v=(a.innerText||'').split('\n').map(s=>s.trim()).find(s=>/^[\d.,]+[km]?$/i.test(s)); return {code,views:num(v)};})
    .filter(x=>x.code&&!seen.has(x.code)&&seen.add(x.code));
  const r={id,title:lines[1]||'',owner:lines[2]||'',uses:num(usesText),usesText,rows};
  let all={}; try{all=JSON.parse(localStorage.getItem('__nicheAudio')||'{}')}catch(e){}
  all[id]=r; try{localStorage.setItem('__nicheAudio',JSON.stringify(all))}catch(e){}
  return id+' uses '+usesText+' remakes '+rows.length+' title '+r.title.slice(0,30);
})()
