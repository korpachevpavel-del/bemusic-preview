(()=>{'use strict';
 const root=document.querySelector('#teacher');
 const description='Наставник по вокалу для детей и взрослых';
 root.querySelectorAll('.teacher-card').forEach(card=>{
  const heading=card.querySelector('h3'),name=heading.textContent.replace(/\s+/g,' ').trim().toUpperCase(),p=card.querySelector('p');
  if(name==='АНТОН ОРЛОВ')heading.innerHTML='АНТОН<br>ОРЛОВ';
  if(name==='МАРИЯ ДЕЕВА')heading.innerHTML='МАРИЯ<br>ДЕЕВА';
  if(name==='КАТЕРИНА ИЛИЧ'||name==='МАРИЯ ЕПИФАНОВА')p.textContent=description;
  if(name==='АННА МАЙКОГЛУЯН')p.innerHTML='Наставник по игре<br>на фортепиано для детей и взрослых';
  if(name==='МАРИЯ ДЕЕВА')p.textContent='Наставник по игре на фортепиано для детей и взрослых';
  if(name==='ЕЛЕНА БОЧЕНКОВА')p.textContent='Наставник по игре на гитаре для детей и взрослых';
 });
 root.querySelectorAll('.arrow').forEach(button=>{button.innerHTML='<svg aria-hidden="true" viewBox="0 0 10.6 18"><polyline fill="none" stroke="white" stroke-width="2" points="1,1 9,9 1,17"/></svg>'});
})();
