(()=>{'use strict';
 const root=document.getElementById('bm'),quiz=root.querySelector('.quiz'),icon=quiz.querySelector(':scope>img');
 icon.src='./quiz-icon.png';
 function positionQuizIcon(){if(matchMedia('(max-width:639px)').matches)icon.style.top=(quiz.querySelector('h2').getBoundingClientRect().height/2-13)+'px';else icon.style.top=''}
 new ResizeObserver(positionQuizIcon).observe(quiz.querySelector('h2'));document.fonts.ready.then(positionQuizIcon);positionQuizIcon();
 const frames=[...root.querySelectorAll('.reviewbox .reviewframe')];function sizeReviews(){frames.forEach(frame=>{const width=frame.getBoundingClientRect().width;if(width>0){const height=Math.round(width*9/16)+'px';if(frame.style.height!==height)frame.style.setProperty('height',height,'important')}})}const reviewSizer=new ResizeObserver(sizeReviews);frames.forEach(frame=>reviewSizer.observe(frame));document.fonts.ready.then(sizeReviews);sizeReviews();
 const footer=root.querySelector('.foot');footer.querySelectorAll('.footgrid>div:nth-child(2)>a').forEach(a=>{a.textContent=a.textContent.replace(/^—\s*/,'-')});
 const copyright=footer.querySelector('.footgrid>div:first-child>p:last-child');if(copyright)copyright.textContent=copyright.textContent.replace('2024–2025','2024-2025');
})();
