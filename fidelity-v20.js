(()=>{'use strict';
const root=document.getElementById('bm');
const pages=new Set(['vokal-v-odincovo','igra-na-gitare-v-odincovo','igra-na-fortepiano-v-odincovo','kids']);
root.querySelectorAll('[data-program]').forEach(link=>{
 const page=link.dataset.program;if(!pages.has(page))return;
 link.href=['vokal-v-odincovo','igra-na-gitare-v-odincovo','igra-na-fortepiano-v-odincovo','kids'].includes(page)?'./'+page+'.html':'https://bemusic-odi.ru/'+page;
 link.removeAttribute('data-program');
});
const loyaltyUrl='https://bemusic-odi.ru/programma-loyalnosti-be-music';
root.querySelectorAll('a[href="#loyalty"]').forEach(link=>link.href=loyaltyUrl);
const details=root.querySelector('details#loyalty');
if(details){const link=document.createElement('a');link.href=loyaltyUrl;link.textContent=details.querySelector('summary').textContent;details.replaceWith(link)}
})();
