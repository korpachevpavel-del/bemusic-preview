(()=>{'use strict';
const root=document.getElementById('bm'),saved=root.querySelector('.static-map');
if(saved){
  const panel=document.createElement('div');panel.className='map-panel';
  const tools=document.createElement('div');tools.className='map-tools';tools.setAttribute('role','group');tools.setAttribute('aria-label','Вид карты');
  const interactive=document.createElement('button'),picture=document.createElement('button');
  interactive.type=picture.type='button';interactive.textContent='Интерактивная карта';picture.textContent='Карта-картинка';
  tools.append(interactive,picture);
  const stage=document.createElement('div');stage.className='map-stage';stage.id='studio-map';
  interactive.setAttribute('aria-controls',stage.id);picture.setAttribute('aria-controls',stage.id);
  const outside=document.createElement('a');outside.className='map-outside';outside.href=saved.href;outside.target='_blank';outside.rel='noopener';outside.textContent='Открыть в Яндекс Картах';
  saved.replaceWith(panel);panel.append(tools,stage,outside);
  let frame;
  function showMap(){
    if(!frame){frame=document.createElement('iframe');frame.title='BE MUSIC — Молодёжная улица, 46';frame.src='https://yandex.com/map-widget/v1/?ll=37.271110%2C55.677194&pt=37.27111%2C55.677194&z=16';frame.loading='lazy';frame.referrerPolicy='strict-origin-when-cross-origin';frame.allowFullscreen=true;}
    stage.replaceChildren(frame);interactive.setAttribute('aria-pressed','true');picture.setAttribute('aria-pressed','false');
  }
  function showPicture(){stage.replaceChildren(saved);interactive.setAttribute('aria-pressed','false');picture.setAttribute('aria-pressed','true');}
  interactive.addEventListener('click',showMap);picture.addEventListener('click',showPicture);showMap();
}
const events=root.querySelector('#blog .wrap');
if(events){
  const notice=events.querySelector('p');
  if(notice){notice.textContent='Новости студии в наших соцсетях';notice.className='events-social-caption';notice.removeAttribute('style');}
  const links=document.createElement('div');links.className='events-social-links';
  for(const [name,url] of [['ВКонтакте','https://vk.com/bemusic_odi'],['Telegram','https://t.me/bemusic_odi']]){
    const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener';a.textContent=name;links.append(a);
  }
  events.append(links);
}
})();
