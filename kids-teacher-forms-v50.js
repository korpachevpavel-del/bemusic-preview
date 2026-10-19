(()=>{'use strict';
const root=document.querySelector('#bm.kids-page'),dialog=root?.querySelector('#dialog');if(!dialog)return;
const gradient='linear-gradient(0.25turn,rgba(39,176,246,1) 0%,rgba(207,40,245,1) 100%)';
// Source teacher3/1/8/2/5/6/7/10 -> order8/9/10/11/12/14/15/17.
// Missing/broken source targets retain the existing working fallback.
const profiles={0:['#074ebc','solid'],1:['#cf28f5','gradient'],2:['#27b0f6','gradient'],3:['#27b0f6','gradient'],4:['#27b0f6','gradient'],6:['#27b0f6','gradient'],7:['#cf28f5','gradient'],9:['#cf28f5','gradient']};
let teacher=null;
window.addEventListener('click',event=>{
 const bio=event.target.closest('[data-bio]');if(bio)teacher=Number(bio.dataset.bio);
 const trigger=event.target.closest('[data-order]');if(trigger)dialog.style.setProperty('--kids-submit-background',trigger.dataset.kidsSubmit==='solid'?'none':gradient);
},true);
new MutationObserver(()=>{
 if(!dialog.classList.contains('teacher-dialog'))return;
 const link=dialog.querySelector('.teacher-action [data-order]'),profile=profiles[teacher];
 if(!link||!profile)return;
 if(link.dataset.kidsClose!==profile[0])link.dataset.kidsClose=profile[0];
 if(link.dataset.kidsSubmit!==profile[1])link.dataset.kidsSubmit=profile[1];
}).observe(dialog,{childList:true,subtree:true});
})();
