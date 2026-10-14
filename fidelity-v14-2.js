(()=>{'use strict';
 const header=document.querySelector('#bm .mobile-header'),social=document.createElement('div');social.className='mobile-header-social';social.setAttribute('role','group');social.setAttribute('aria-label','Социальные сети BE MUSIC');
 [['Telegram','https://t.me/bemusic_odi','header-telegram.png'],['ВКонтакте','https://vk.ru/bemusic_odi','header-vk.png'],['Instagram','https://www.instagram.com/bemusic_odi','header-instagram.png']].forEach(([name,url,asset])=>{const a=document.createElement('a'),img=document.createElement('img');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',name);img.src='./'+asset;img.alt='';img.width=35;img.height=35;a.append(img);social.append(a)});header.append(social);
 const intro=document.querySelector('#bm .faq-layout>div:first-child>p');if(intro)intro.innerHTML=intro.innerHTML.replace('для вас','для Вас');
 document.querySelectorAll('#bm .footgrid>div:last-child>p').forEach(p=>{if(!p.innerHTML.includes('Наименование:'))p.innerHTML=p.innerHTML.replace('ПАО Сбербанк','Наименование: ПАО Сбербанк')});
})();
