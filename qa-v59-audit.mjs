// Run only inside the documented CUA runtime. Application DOM is read-only.
export function read(n){
 const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y,w:r.width,h:r.height,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,scrollTop:e.scrollTop,transform:s.transform,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight}};
 const original=n.classList.contains('t-popup'),bio=n.querySelector(original?'.t390__descr':'.teacher-bio');
 return{open:original?n.classList.contains('t-popup_show'):n.open,titleText:n.querySelector(original?'.t390__title':'h3')?.textContent.trim(),outer:rect(n),wrapper:rect(n.querySelector(original?'.t390__wrapper':'[data-dialog]')),uptitle:rect(n.querySelector(original?'.t390__uptitle':'.teacher-uptitle')),title:rect(n.querySelector(original?'.t390__title':'h3')),bio:rect(bio),action:rect(n.querySelector(original?'.t390__btn-wrapper':'.teacher-action')),button:rect(n.querySelector(original?'.t390__btn-wrapper a':'.teacher-action a')),lists:Array.from(bio?.querySelectorAll('ul,li,p')||[]).map(e=>({text:e.textContent.replace(/\s+/g,''),rect:rect(e)})),images:n.querySelectorAll('img').length};
}
export function compare(a,b){
 const diffs=[];if(!a.open||!b.open||!a.wrapper.h||!b.wrapper.h)diffs.push(['not-open']);if(a.titleText.replace(/\s/g,'').toUpperCase()!==b.titleText.replace(/\s/g,'').toUpperCase())diffs.push(['title']);
 for(const k of ['wrapper','uptitle','title','bio','action','button'])for(const d of ['x','y','w','h'])if(Math.abs(a[k][d]-b[k][d])>1)diffs.push([k,d,a[k][d],b[k][d]]);
 for(const d of ['scrollHeight','clientHeight'])if(a.outer[d]!==b.outer[d])diffs.push(['outer',d,a.outer[d],b.outer[d]]);
 if(a.lists.length!==b.lists.length)diffs.push(['list-count']);
 for(let j=0;j<Math.min(a.lists.length,b.lists.length);j++){if(a.lists[j].text!==b.lists[j].text)diffs.push(['list-text',j]);for(const d of ['x','y','w','h'])if(Math.abs(a.lists[j].rect[d]-b.lists[j].rect[d])>1)diffs.push(['list',j,d,a.lists[j].rect[d],b.lists[j].rect[d]])}
 return diffs;
}
export function audit({pool,rows,fs,path,write}){
 const hook=i=>i===0?'teacher3':i===6?'teacher6':'teacher7';
 return{
 async open(indices){await Promise.all(pool.map(async(p,j)=>{const i=indices[j];await p.own.locator('.mobile-menu-note').waitFor({state:'attached'});const b=p.own.locator('[data-bio="'+i+'"]');await(i<6?b.first():b.last()).press('Enter');await p.src.locator('[href="#popup:'+hook(i)+'"]').first().press('Enter');await p.tab.getAXState({emit:false})}))},
 async save(indices){const batch=await Promise.all(pool.map(async(p,j)=>{const i=indices[j],source=await p.src.locator('.t-popup[data-tooltip-hook="#popup:'+hook(i)+'"]').evaluate(read),preview=await p.own.locator('dialog').evaluate(read);return{page:p.page,width:p.width,index:i,source,preview,diffs:compare(source,preview)}}));rows.push(...batch);await fs.writeFile(path,JSON.stringify(rows,null,2));write(batch.map(r=>({page:r.page,width:r.width,index:r.index,diffs:r.diffs})))},
 async close(){await Promise.all(pool.map(async p=>{await p.own.locator('dialog').press('Escape');await p.src.locator('.t-popup_show').press('Escape');await p.tab.getAXState({emit:false})}))},
 async navigate(page,widths){await Promise.all(pool.map(async(p,j)=>{p.page=page;p.width=widths[j];await p.tab.goto('https://korpachevpavel-del.github.io/bemusic-preview/qa-comprehensive-v55.html?page='+page+'&width='+p.width+'&pass=v59-finish-22');await p.tab.getAXState({emit:false})}))}
 }
}
