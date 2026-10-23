// Read-only geometry of matching design elements, relative to their layout boards.
export function readPage(body){
 const own=!!body.querySelector('#bm'),doc=body.ownerDocument;
 const elements=Array.from(body.querySelectorAll(own?'.el[data-design-element],.tn-elem[data-elem-id]':'.tn-elem[data-elem-id]')).map(e=>{
  const section=e.closest('.scene,.r'),parent=e.parentElement,r=e.getBoundingClientRect(),p=parent.getBoundingClientRect();
  return{key:(section?.id?.replace(/^s(?=\d)/,'rec')||'')+'/'+(e.getAttribute('data-design-element')||e.getAttribute('data-elem-id')),x:r.x,y:r.y-p.y,w:r.width,h:r.height,text:(e.querySelector('.tn-atom,.paint')||e).innerText?.replace(/\s+/g,' ').trim()||''};
 });
 const records=Array.from(body.querySelectorAll(own?'.scene[id],.r[id]':'.r[id]')).map(e=>({id:e.id.replace(/^s(?=\d)/,'rec'),h:e.getBoundingClientRect().height}));
 const native=[];const main=!!body.querySelector(own?'#s1169111761':'#rec1169111761');
 if(main)for(const [key,source,preview] of [['quiz',['#rec886675207'],'.quiz-section'],['reviews',['#rec886675237','#rec886675240'],'.review-section'],['teachers',['#rec1171635366'],'.teacher-section'],['video',['#rec1130558256'],'.about-video'],['faq',['#rec886675300'],'.faq-section'],['contacts',['#rec886675309'],'.contact-section']]){const es=own?[body.querySelector(preview)]:source.map(x=>body.querySelector(x));if(es.every(Boolean))native.push({key,h:es.reduce((sum,e)=>sum+e.getBoundingClientRect().height,0)});}
 const footer=body.querySelector(own?'.foot':'#rec887170189');if(footer)native.push({key:'footer',h:footer.getBoundingClientRect().height});
 const events=body.querySelector(own?'.events':'#rec886675315');
 return{width:doc.documentElement.clientWidth,scrollWidth:doc.documentElement.scrollWidth,height:doc.documentElement.scrollHeight,elements,records,native,events:events?{h:events.getBoundingClientRect().height,text:events.innerText,hasPreloader:!!events.querySelector('.js-feed-preloader')}:null};
}
export function comparePages(a,b){
 const m=new Map(a.elements.map(e=>[e.key,e])),rm=new Map(a.records.map(e=>[e.id,e]));const diffs=[],recordDiffs=[],textDiffs=[];let matched=0;
 for(const e of b.elements){const s=m.get(e.key);if(!s||e.w<=1||e.h<=1||s.w<=1||s.h<=1||e.x>=b.width||e.x+e.w<=0||s.x>=a.width||s.x+s.w<=0)continue;matched++;for(const k of ['x','y','w','h'])if(Math.abs(e[k]-s[k])>1)diffs.push({key:e.key,axis:k,source:s[k],preview:e[k]});if(e.text!==s.text)textDiffs.push({key:e.key,source:s.text,preview:e.text});}
 for(const e of b.records){const s=rm.get(e.id);if(s&&Math.abs(s.h-e.h)>1)recordDiffs.push({id:e.id,source:s.h,preview:e.h});}
 const nm=new Map(a.native.map(e=>[e.key,e]));const nativeDiffs=b.native.filter(e=>nm.has(e.key)&&Math.abs(e.h-nm.get(e.key).h)>1).map(e=>({key:e.key,source:nm.get(e.key).h,preview:e.h}));return{matched,diffs,recordDiffs,nativeDiffs,textDiffs,heightDelta:b.height-a.height,externalFeedStateDifference:!!a.events&&a.events.text!==b.events?.text,horizontalOverflow:b.scrollWidth>b.width};
}
export function pageAudit({pool,rows,fs,path,write}){return{async save(){for(const p of pool){const source=await p.src.locator('body').evaluate(readPage),preview=await p.own.locator('body').evaluate(readPage),comparison=comparePages(source,preview);rows.push({page:p.page,width:p.width,source,preview,...comparison});write({page:p.page,width:p.width,matched:comparison.matched,diffs:comparison.diffs.slice(0,3),recordDiffs:comparison.recordDiffs,nativeDiffs:comparison.nativeDiffs,textDiffs:comparison.textDiffs.slice(0,3),heightDelta:comparison.heightDelta,externalFeedStateDifference:comparison.externalFeedStateDifference,overflow:comparison.horizontalOverflow});}await fs.writeFile(path,JSON.stringify(rows,null,2));}};}
