"""Compile source desktop header geometry; retain the agreed mobile/640px shell."""
from pathlib import Path
from lxml import html
import zipfile,sys
root=Path(__file__).resolve().parent
with zipfile.ZipFile(sys.argv[1]) as z:source=html.fromstring(z.read('bemusic-odi.ru/programma-loyalnosti-be-music'))
record=source.get_element_by_id('rec1087328151');elements=record.xpath('.//*[@data-elem-id]')
buttons=[e for e in elements if e.get('data-elem-type')=='button'];logo=elements[0];socials=elements[-4:-1]
selectors=['.directions-toggle','a[href="./index.html#sertifikat"]','a[href="./programma-loyalnosti-be-music.html"]','a[href="./index.html#teacher"]','a[href="./index.html#otzyvy"]','a[href="./index.html#contacts"]']
def val(e,k,bp):
 v=e.get('data-field-'+k+'-value')
 for n in [960,640,480,320]:
  if bp<=n and e.get(f'data-field-{k}-res-{n}-value') is not None:v=e.get(f'data-field-{k}-res-{n}-value')
 return v
css=['/* Source header geometry. Original loyalty body is empty. */']
for bp,minw,maxw,height in [(1200,1200,None,70),(960,960,1199,90),(640,641,959,130)]:
 rules=[f'#bm .sticky-head,#bm .desktop-header{{height:{height}px}}', '#bm .desktop-header{display:block;position:relative;width:100%;max-width:none;padding:0;margin:0}', '#bm .desktop-header nav,#bm .desktop-header .socials{position:static;display:block;transform:none;margin:0;padding:0}', '#bm .desktop-header nav>a,#bm .desktop-header nav>.directions-toggle{position:absolute;display:block;align-content:center;text-align:center;margin:0;padding:0;transform:none;border:0;color:#1f1f1f;background:none;font:400 15px/15px BMOriginal,Arial,sans-serif}']
 for el,selector in zip(buttons,selectors):
  left=val(el,'left',bp);top=float(val(el,'top',bp));w=val(el,'width',bp);h=float(val(el,'height',bp))
  rules.append(f'#bm .desktop-header nav>{selector}'+'{'+f'left:calc(50% - {bp/2:g}px + {left}px);top:{height/2-h/2+top:g}px;width:{w}px;height:{h:g}px'+'}')
 lw=val(logo,'width',bp);lx=val(logo,'left',bp);ly=float(val(logo,'top',bp))
 rules.append(f'#bm .desktop-header>a'+'{'+f'position:absolute;left:{lx}px;top:{height/2+ly:g}px;width:{lw}px;height:auto;transform:translateY(-50%);margin:0'+'}')
 rules.append('#bm .desktop-header>a>img{width:100%;height:auto;display:block}')
 # Source last three social shapes are Instagram, VK, Telegram.
 for el,name in zip(socials,['Instagram','ВКонтакте','Telegram']):
  left=val(el,'left',bp);top=val(el,'top',bp)
  rules.append(f'#bm .desktop-header .socials>a[aria-label="{name}"]'+'{'+f'position:absolute;left:calc(50% - {bp/2:g}px + {left}px);top:{top}px;width:35px;height:35px;margin:0'+'}')
  rules.append(f'#bm .desktop-header .socials>a[aria-label="{name}"]>img'+'{width:35px;height:35px}')
 rules.append(f'#bm .desktop-header .directions-menu'+'{left:calc(50% - '+str(bp/2)+'px + '+str(val(buttons[0],'left',bp))+'px);top:'+str(height)+'px}')
 media=f'@media(min-width:{minw}px)'+(f' and (max-width:{maxw}px)' if maxw else '')
 css.append(media+'{\n'+'\n'.join(rules)+'\n}')
(root/'loyalty-layout-v47.css').write_text('\n'.join(css)+'\n')
