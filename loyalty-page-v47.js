(()=>{'use strict';
const root=document.getElementById('bm'),header=root.querySelector('.mobile-header'),details=header.querySelector('details');
let active=null;
function closeMenus(){root.querySelectorAll('.directions-menu').forEach(m=>m.hidden=true);root.querySelectorAll('.directions-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));active=null}
root.querySelectorAll('.directions-toggle').forEach(button=>{const menu=root.querySelector('#'+button.getAttribute('aria-controls'));button.addEventListener('click',()=>{const open=menu.hidden;closeMenus();menu.hidden=!open;button.setAttribute('aria-expanded',String(open));if(open)active={button,menu}})});
root.addEventListener('click',e=>{if(e.target.closest('a')){closeMenus();if(e.target.closest('.mobile-header nav'))details.open=false}});
document.addEventListener('click',e=>{if(!e.target.closest('.directions-menu,.directions-toggle'))closeMenus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){const b=active.button;closeMenus();b.focus()}if(e.key==='ArrowDown'&&e.target.classList.contains('directions-toggle')){e.preventDefault();if(!active)e.target.click();active?.menu.querySelector('a')?.focus()}});
const updateHeader=()=>header.classList.toggle('is-visible',window.scrollY>400||details.open);window.addEventListener('scroll',updateHeader,{passive:true});details.addEventListener('toggle',updateHeader);updateHeader();
})();
