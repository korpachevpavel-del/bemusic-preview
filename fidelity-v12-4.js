(()=>{'use strict';
 const root=document.querySelector('#teacher');
 const contactTitle=document.querySelector('#contacts h2');contactTitle.querySelector('br')?.replaceWith(document.createTextNode(' '));
 const copy=document.querySelector('#contacts .contact-copy'),text=document.createElement('div');text.className='contact-native-text';text.innerHTML='<strong>Мы находимся в самом центре города: </strong><br>г. Одинцово, Молодёжная ул., 46, БЦ «Альянс», офис 326, этаж 3<br><strong>Наша студия открыта для Вас ежедневно:</strong> <br>с понедельника по воскресенье 10:00-20:00<br><br><strong>Удобно на авто:</strong> на территории бизнес-центра большая бесплатная <span style="color:#074ebc">(!) </span><span style="color:#1f1f1f">парковка, а также рядом есть </span>крытая платная парковка<br><br><strong>Нам можно позвонить:</strong> <br><a href="tel:+79152541818">+7 (915) 254-18-18</a><br><br><strong>И написать в соц.сетях</strong><br><span style="font-size:14px">*Присутствует упоминание социальной сети МЕТА,&nbsp;деятельность которой запрещена на территории РФ</span>';copy.querySelectorAll(':scope>p').forEach(p=>p.remove());copy.prepend(text);
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
 root.querySelectorAll('.teacher-card .cta').forEach(button=>{const label=document.createElement('span');label.textContent=button.textContent;button.replaceChildren(label)});
 root.querySelectorAll('.arrow').forEach(button=>{button.innerHTML='<svg aria-hidden="true" viewBox="0 0 10.6 18"><polyline fill="none" stroke="white" stroke-width="2" points="1,1 9,9 1,17"/></svg>'});
})();
