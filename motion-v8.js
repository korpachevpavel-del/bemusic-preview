(()=>{'use strict';
const root=document.getElementById('bm');
const tickers=[...root.querySelectorAll('.ticker')];
const observed=[];
for(const ticker of tickers){
  ticker.classList.add('motion-ticker');
  const track=document.createElement('div');track.className='ticker-track';
  const item=document.createElement('div');item.className='ticker-item';
  for(const text of ['ГИТАРА','ВОКАЛ','ФОРЕПИАНО','BE MUSIC ДЛЯ ДЕТЕЙ']){
    const word=document.createElement('span');word.className='ticker-word';word.textContent=text;
    const dot=document.createElement('span');dot.className='ticker-dot';dot.setAttribute('aria-hidden','true');
    item.append(word,dot);
  }
  track.append(item);ticker.replaceChildren(track);
  function measure(){
    const measured=item.getBoundingClientRect().width;if(!measured)return;
    const distance=Math.floor(measured);if(!distance)return;
    const count=Math.ceil(ticker.clientWidth/distance)+2;
    while(track.children.length<count){const copy=item.cloneNode(true);copy.setAttribute('aria-hidden','true');track.append(copy)}
    while(track.children.length>count)track.lastElementChild.remove();
    track.style.setProperty('--ticker-distance',distance+'px');
    track.style.setProperty('--ticker-duration',(distance/50)+'s');
  }
  new ResizeObserver(measure).observe(ticker);document.fonts.ready.then(measure);measure();ticker.classList.add('motion-active');
}
const gradient=root.querySelector('#s886675297');if(gradient)observed.push(gradient);
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('motion-active');observer.unobserve(entry.target)}}});
observed.forEach(element=>observer.observe(element));
})();
