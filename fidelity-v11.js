(()=>{'use strict';
const root=document.getElementById('bm');
const saved=root.querySelector('.static-map');
if(saved){const stage=document.createElement('div');stage.className='map-stage';const frame=document.createElement('iframe');frame.title='BE MUSIC — Молодёжная улица, 46';frame.src='https://yandex.com/map-widget/v1/?ll=37.271110%2C55.677194&pt=37.27111%2C55.677194&z=16';frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;frame.addEventListener('error',()=>stage.replaceChildren(saved));stage.append(frame);saved.replaceWith(stage);}
const events=root.querySelector('#blog .wrap');if(events){const notice=events.querySelector('p');if(notice)notice.remove();const error=document.createElement('div');error.className='feed-error';const label=document.createElement('span');label.textContent='Feed not found.';error.append(label);events.append(error);}
const video=root.querySelector('#about-video .reviewframe');if(video){function measure(){const height=Math.ceil(video.getBoundingClientRect().width*9/16)+'px';if(video.style.height!==height)video.style.height=height}new ResizeObserver(measure).observe(video);measure();}
const icons=root.querySelectorAll('[data-design-element="1734436374971"],[data-design-element="1734436722549"],[data-design-element="1734436492208"]');const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('design-motion-visible');observer.unobserve(entry.target)}});icons.forEach(icon=>observer.observe(icon));
})();
