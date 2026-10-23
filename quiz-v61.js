(()=>{'use strict';const quiz=document.querySelector('#bm .quiz');if(!quiz)return;
const title=quiz.querySelector('h2'),icon=quiz.querySelector(':scope>img'),area=quiz.querySelector('[data-quiz-area]');
// Keep natural desktop wrapping while preserving the original mobile line break.
title.querySelector('br')?.after(document.createTextNode(' '));
function update(){if(matchMedia('(min-width:641px)').matches){icon.style.left='45px';icon.style.top=(title.getBoundingClientRect().height/2-13)+'px'}else{icon.style.left='';icon.style.top=matchMedia('(max-width:639px)').matches?(title.getBoundingClientRect().height/2-13)+'px':''}
const next=area.querySelector('.quiz-next');if(next&&!next.querySelector('svg'))next.innerHTML='<span>ДАЛЕЕ</span><svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3.75 9h10.5M9 3.75 14.25 9 9 14.25" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
}
new ResizeObserver(update).observe(title);new MutationObserver(update).observe(area,{childList:true});document.fonts.ready.then(update);update();})();
