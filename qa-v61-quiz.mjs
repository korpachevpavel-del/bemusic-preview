export function readQuiz(n){
 const own=n.id==='quiz',box=n.querySelector(own?'.quiz':'.t-quiz__quiz'),base=box.getBoundingClientRect();
 const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{x:r.x-base.x,y:r.y-base.y,w:r.width,h:r.height,font:s.fontSize,line:s.lineHeight,padding:s.padding,margin:s.margin,box:s.boxSizing};};
 const selectors=own?['.quiz','.quiz>h2','.quiz>h2 span','.quiz>h2 img','.quiz>div','.quiz-options','.quiz-options h3','.quiz-footer-buttons button:last-child','.quiz-bottom']:['.t-quiz__quiz','.t-quiz__header','.t-quiz__quiz-description-title','.t-quiz__quiz-description-icon','.t-quiz__content-wrapper','.t-step-form__step_active','.t-input-title','.t-quiz__btn-next','.t-quiz__footer'];
 return{height:n.getBoundingClientRect().height,parts:selectors.map(s=>({selector:s,rect:rect(n.querySelector(s))})),headerChildren:Array.from(n.querySelector(own?'.quiz>h2':'.t-quiz__quiz-description').children).map(e=>({tag:e.tagName,cls:e.className,text:e.innerText?.slice(0,80)}))};
}
