(()=>{'use strict';
const root=document.getElementById('bm');
const logo=root.querySelector('.mobile-header img');
root.querySelectorAll('.reviewbox,.about-video .reviewframe').forEach(link=>{
  const review=link.classList.contains('reviewbox');
  const frame=review?link.querySelector('.reviewframe'):link;
  const cover=document.createElement('div');cover.className='video-cover';cover.setAttribute('aria-hidden','true');
  if(!review){
    const original=root.querySelector('.gallery img');
    if(original){const photo=original.cloneNode(false);photo.className='video-cover-photo';photo.alt='';cover.append(photo)}
    cover.classList.add('studio-cover');
  }
  if(logo){const mark=logo.cloneNode(false);mark.className='video-cover-logo';mark.alt='';cover.append(mark)}
  const label=document.createElement('span');label.className='video-cover-label';label.textContent=review?link.querySelector('p').textContent:'Музыкальная студия в Одинцово';cover.append(label);
  frame.prepend(cover);frame.classList.add('has-video-cover');
});
})();
