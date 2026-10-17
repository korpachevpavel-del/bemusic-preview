(()=>{'use strict';
const root=document.getElementById('bm');
// Native links, menus and dialogs reuse the checked home-page components.
root.querySelectorAll('.directions-menu [data-program]').forEach(a=>{const p=a.dataset.program;a.href=p==='vokal-v-odincovo'?'./vokal-v-odincovo.html':'https://bemusic-odi.ru/'+p;a.removeAttribute('data-program')});
root.querySelectorAll('a[href="#loyalty"]').forEach(a=>a.href='https://bemusic-odi.ru/programma-loyalnosti-be-music');
root.querySelectorAll('a[href*="#popup:order"]').forEach(a=>{a.href='#trial';a.dataset.order='trial'});
const gift=root.querySelector('#rec1130529986 [data-order]');if(gift)gift.dataset.order='gift';
root.querySelectorAll('.t1119__trigger-button').forEach(button=>{const panel=document.getElementById(button.getAttribute('aria-controls'));button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));panel.hidden=open;button.closest('.t1119__accordion').classList.toggle('t1119__opened',!open)})});
const more=root.querySelector('#rec1130573096 button,#rec1130573096 a');if(more)more.addEventListener('click',e=>{e.preventDefault();root.querySelector('#rec1130569141').style.display='block';root.querySelector('#rec1130573096').hidden=true});
root.querySelectorAll('.tn-atom__videoiframe[data-vkvideoid],.t-video-lazyload').forEach(box=>{
 const value=box.dataset.vkvideoid||box.dataset.videolazyId||'',match=value.match(/(-?\d+)_(\d+)/);if(!match)return;
 const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;const iframe=document.createElement('iframe');iframe.src='https://vkvideo.ru/video_ext.php?oid='+match[1]+'&id='+match[2]+'&hd=2';iframe.title='Видео студии BE MUSIC';iframe.allow='autoplay; encrypted-media; fullscreen; picture-in-picture';iframe.allowFullscreen=true;box.append(iframe);observer.disconnect()},{rootMargin:'300px'});observer.observe(box);
});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const spinning=root.querySelectorAll('[data-animate-sbs-opts*="360"]');const spinObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vocal-spinning');spinObserver.unobserve(e.target)}}));spinning.forEach(e=>spinObserver.observe(e));
if(!reduced.matches){const pending=[...root.querySelectorAll('.tn-elem[data-animate-style]')];const reveal=e=>{e.style.opacity='';const style=e.dataset.animateStyle;const from={opacity:0},to={opacity:1};if(style==='zoomin'){from.scale='0.9';to.scale='1'}else if(style==='fadeinup'){from.translate='0 '+(e.dataset.animateDistance||50)+'px';to.translate='0 0'}e.animate([from,to],{duration:1000*Number(e.dataset.animateDuration||2),delay:1000*Number(e.dataset.animateDelay||0),easing:'cubic-bezier(0.19,1,0.22,1)'})};pending.forEach(e=>e.style.opacity='0');setTimeout(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){reveal(e.target);observer.unobserve(e.target)}}));pending.forEach(e=>{const top=e.getBoundingClientRect().top;if(top<-500)e.style.opacity='';else if(top<innerHeight)reveal(e);else observer.observe(e)})},1500);root.addEventListener('focusin',e=>{const el=e.target.closest('.tn-elem');if(el)el.style.opacity=''})}
})();
