// Read-only DOM measurements, executed through documented CUA locators.
export function readForm(n){
 const original=n.classList.contains('t-popup');
 const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x,y:r.y,w:r.width,h:r.height,size:s.fontSize,line:s.lineHeight,weight:s.fontWeight,color:s.color,background:s.backgroundImage};};
 const pairs=[['.t-popup__container','[data-dialog]'],['.t702__img','.order-logo'],['.t702__wrapper','.order-content'],['.t702__title','h3'],['.t702__descr','.order-description'],['form','form'],['.t-form__submit button','button[type="submit"]']];
 const select=s=>Array.from(n.querySelectorAll(s));
 return{open:original?n.classList.contains('t-popup_show'):n.open,outer:{h:n.clientHeight,scroll:n.scrollHeight},parts:pairs.map(p=>rect(n.querySelector(p[original?0:1]))),text:select(original?'.t702__title,.t702__descr,.t-input-title,.t-input-group_cb .t-checkbox__control span':'h3,.order-description,form>label:not(.order-consent),.order-choice-title,.order-consent span').map(e=>e.textContent.replace(/\s+/g,' ').trim()),inputs:select('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not(.js-form-spec-comments),textarea').map(e=>({type:e.getAttribute('type'),value:e.value,rect:rect(e)})),consents:select(original?'.t-input-group_cb .t-checkbox__control span':'.order-consent span').map(rect),choices:select(original?'.t-input-group_rd label':'.order-choice').map(e=>({text:e.textContent.replace(/\s+/g,' ').trim(),rect:rect(e)})),disabled:n.querySelector('button[type="submit"]')?.disabled};
}
export function compareForms(a,b){
 const d=[];const check=(x,y,k)=>{if(!x||!y){if(x!==y)d.push([k,'missing']);return;}for(const axis of ['x','y','w','h'])if(Math.abs(x[axis]-y[axis])>1)d.push([k,axis,x[axis],y[axis]]);};
 if(!a.open||!b.open)d.push(['not-open']);if(!b.disabled)d.push(['submit-enabled']);
 a.parts.forEach((p,i)=>check(p,b.parts[i],'part'+i));
 for(const k of ['inputs','consents','choices']){if(a[k].length!==b[k].length)d.push([k,'count',a[k].length,b[k].length]);a[k].forEach((p,i)=>{const q=b[k][i];if(!q)return;check(p.rect||p,q.rect||q,k+i);if(k==='inputs'&&(p.value||q.value))d.push([k,i,'not-blank']);if(k==='choices'&&p.text!==q.text)d.push([k,i,'text']);});}
 if(JSON.stringify(a.text)!==JSON.stringify(b.text))d.push(['text']);
 if(a.outer.h!==b.outer.h||a.outer.scroll!==b.outer.scroll)d.push(['scroll',a.outer,b.outer]);return d;
}
export function formAudit({pool,rows,fs,path,write}){return{
 async open(type){for(const p of pool){await p.own.locator('.mobile-menu-note').waitFor({state:'attached'});const trigger=p.src.locator(type==='gift'?'a[href="#popup:order21"]':'a[href^="#popup:order"]').filter({visible:true}).first();p.formHook=await trigger.getAttribute('href');await trigger.click();await p.own.locator('[data-order="'+type+'"]').filter({visible:true}).first().click();await p.tab.getAXState({emit:false});
 const actual=await p.own.locator('dialog').evaluate(n=>({open:n.open,gift:n.classList.contains('gift-dialog')}));
 if(!actual.open||actual.gift!==(type==='gift'))throw Error('Preview form not open with expected type: '+p.page+' '+p.width);
 }},
 async save(type){const batch=await Promise.all(pool.map(async p=>{const source=await p.src.locator('.t-popup[data-tooltip-hook="'+p.formHook+'"]').last().evaluate(readForm),preview=await p.own.locator('dialog').evaluate(readForm);return{page:p.page,width:p.width,type,source,preview,diffs:compareForms(source,preview)};}));rows.push(...batch);await fs.writeFile(path,JSON.stringify(rows,null,2));write(batch.map(r=>({page:r.page,width:r.width,type,diffs:r.diffs})));},
 async close(){for(const p of pool){if(await p.own.locator('dialog[open]').count()){await p.own.locator('dialog[open]').press('Escape');await p.tab.getAXState({emit:false});if(await p.own.locator('dialog[open]').count())throw Error('Preview did not close');}if(await p.src.locator('.t-popup_show').count()){await p.src.locator('.t-popup_show').last().press('Escape');await p.tab.getAXState({emit:false});}}}
};}
