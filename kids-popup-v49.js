(()=>{'use strict';
// Source #popup:order7 belongs only to the lower kids enquiry button.
const root=document.querySelector('#bm.kids-page');if(!root)return;
let intakeRequested=false;
window.addEventListener('click',event=>{
 const trigger=event.target.closest('[data-order]');if(!trigger)return;
 intakeRequested=trigger.hasAttribute('data-kids-intake');
 root.querySelector('#dialog').style.setProperty('--kids-close-color',trigger.getAttribute('data-kids-close')||'#074ebc');
},true);
new MutationObserver(()=>{
  if(!intakeRequested)return;
  const dialog=root.querySelector('#dialog.order-dialog[open]'),form=dialog?.querySelector('.order-form');
  if(!form||dialog.classList.contains('gift-dialog'))return;
  intakeRequested=false;
  if(form.querySelector('[name="Возраст"]'))return;
  const consent=form.querySelector('.order-consent');
  const age=document.createElement('label');age.textContent='Возраст';
  const input=document.createElement('input');input.type='text';input.name='Возраст';input.required=true;age.append(input);
  const group=document.createElement('div');group.className='order-choice-group';group.setAttribute('role','group');group.setAttribute('aria-label','Какое направление интересно?');
  const title=document.createElement('div');title.className='order-choice-title';title.textContent='Какое направление интересно?';group.append(title);
  const list=document.createElement('div');list.className='order-choice-list';group.append(list);
  for(const text of ['Вокал','Игра на гитаре','Игра на фортепиано','Пока не знаю']){
   const label=document.createElement('label');label.className='order-choice';const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.name='Какое направление интересно?';checkbox.value=text;label.append(checkbox,document.createTextNode(text));list.append(label);
  }
  form.insertBefore(age,consent);form.insertBefore(group,consent);
}).observe(root.querySelector('#dialog'),{childList:true,subtree:true,attributes:true,attributeFilter:['open']});
})();
