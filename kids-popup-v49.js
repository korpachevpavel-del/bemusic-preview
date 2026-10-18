(()=>{'use strict';
// Source #popup:order7 belongs only to the lower kids enquiry button.
const root=document.querySelector('#bm.kids-page');if(!root)return;
window.addEventListener('click',event=>{
 if(!event.target.closest('[data-kids-intake]'))return;
 queueMicrotask(()=>{
  const dialog=root.querySelector('#dialog.order-dialog[open]'),form=dialog?.querySelector('.order-form');
  if(!form||dialog.classList.contains('gift-dialog')||form.querySelector('[name="Возраст"]'))return;
  const consent=form.querySelector('.order-consent');
  const age=document.createElement('label');age.textContent='Возраст';
  const input=document.createElement('input');input.type='text';input.name='Возраст';input.required=true;age.append(input);
  const group=document.createElement('div');group.className='order-choice-group';group.setAttribute('role','group');group.setAttribute('aria-label','Какое направление интересно?');
  const title=document.createElement('div');title.className='order-choice-title';title.textContent='Какое направление интересно?';group.append(title);
  for(const text of ['Вокал','Игра на гитаре','Игра на фортепиано','Пока не знаю']){
   const label=document.createElement('label');label.className='order-choice';const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.name='Какое направление интересно?';checkbox.value=text;label.append(checkbox,document.createTextNode(text));group.append(label);
  }
  form.insertBefore(age,consent);form.insertBefore(group,consent);
 });
},true);
})();
