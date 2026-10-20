"""Build the intentionally empty source loyalty page with checked independent shell.
The shell is the rendered independent v46 header/footer, captured before this build.
No Tilda runtime or invented loyalty terms are included.
"""
from pathlib import Path
from lxml import html,etree
from copy import deepcopy
import json
root=Path(__file__).resolve().parent
main=html.fromstring((root/'index.html').read_bytes())
shell=json.loads((root/'loyalty-shell-v47.json').read_text())
page=html.Element('html',lang='ru');head=etree.SubElement(page,'head')
etree.SubElement(head,'meta',charset='utf-8');etree.SubElement(head,'meta',name='viewport',content='width=device-width,initial-scale=1');etree.SubElement(head,'meta',name='robots',content='noindex,nofollow');etree.SubElement(head,'title').text='Программа лояльности'
etree.SubElement(head,'link',rel='stylesheet',href='./bemusic-shared-v43.css')
for link in main.xpath('//head/link[@rel="stylesheet"]'):head.append(deepcopy(link))
etree.SubElement(head,'link',rel='stylesheet',href='./loyalty-layout-v47.css?v=47-3')
body=etree.SubElement(page,'body');bm=etree.SubElement(body,'div',id='bm',attrib={'class':'loyalty-page'})
header=html.fromstring(shell['header'])
nav=header.xpath('.//*[contains(@class,"mobile-header")]//nav')[0]
nav.getparent().replace(nav,html.fromstring(shell['mobile_nav']))
mobile=header.xpath('.//*[contains(@class,"mobile-header")]')[0]
if not mobile.xpath('.//*[contains(@class,"mobile-header-social")]'):
 social=etree.SubElement(mobile,'div',attrib={'class':'mobile-header-social','role':'group','aria-label':'Социальные сети BE MUSIC'})
 for label,url,asset in [('Telegram','https://t.me/bemusic_odi','header-telegram.png'),('ВКонтакте','https://vk.ru/bemusic_odi','header-vk.png'),('Instagram','https://www.instagram.com/bemusic_odi','header-instagram.png')]:
  a=etree.SubElement(social,'a',href=url,target='_blank',rel='noopener noreferrer',attrib={'aria-label':label});etree.SubElement(a,'img',src='./'+asset,alt='',width='35',height='35')
bm.append(header)
bm.append(deepcopy(main.get_element_by_id('s887169985')))
bm.append(html.fromstring(shell['footer']))
for a in bm.xpath('.//a[@href]'):
 u=a.get('href')
 if u=='https://bemusic-odi.ru/programma-loyalnosti-be-music':a.set('href','./programma-loyalnosti-be-music.html')
 elif u.startswith('#'):a.set('href','./index.html'+u)
for b in bm.xpath('.//button[contains(@class,"directions-toggle")]'):b.set('aria-expanded','false')
for m in bm.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," directions-menu ")]'):m.set('hidden','hidden')
for d in bm.xpath('.//details'):d.attrib.pop('open',None)
for e in bm.xpath('.//*[@style]'):
 if e.get('class')=='directions-menu':e.attrib.pop('style',None)
for name in ['loyalty-page-v47.js?v=47-1','menu-v33.js?v=4']:etree.SubElement(body,'script',src='./'+name)
etree.SubElement(head,'link',rel='stylesheet',href='./fidelity-v55.css?v=55-1')
etree.SubElement(head,'link',rel='stylesheet',href='./fidelity-v56.css?v=56-3')
etree.SubElement(head,'link',rel='stylesheet',href='./fidelity-v57.css?v=57-2')
(root/'programma-loyalnosti-be-music.html').write_text(html.tostring(page,encoding='unicode',doctype='<!doctype html>'))
print('Built source-equivalent empty loyalty page')
