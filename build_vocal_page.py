"""Build independent vocal page from the recorded public snapshot.
Usage: python3 build_vocal_page.py /path/to/BEMUSIC_SITE_SNAPSHOT_2026-10-12.zip
No Tilda JavaScript is included in the result.
"""
from pathlib import Path
from lxml import html, etree
from copy import deepcopy
import zipfile, json, re, hashlib, mimetypes, sys, gzip
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parent
snapshot=Path(sys.argv[1])
z=zipfile.ZipFile(snapshot)
manifest=json.loads(z.read('manifest.json'))
urls={r['url']:r['path'] for r in manifest if r.get('path')}
missing=set(); assets={}
def local_url(url):
    url=url.strip().strip('"\'')
    if url.startswith(('data:','#')): return url
    if url.startswith('//'):url='https:'+url
    key=urls.get(url)
    if key is None:
        raw=urlsplit(url); stem=raw.netloc+raw.path
        key=next((n for n in z.namelist() if n==stem or n.startswith(stem+'__')),None)
    if not key:
        missing.add(url);return url
    data=z.read(key);suffix=Path(urlsplit(url).path).suffix or '.bin'
    name='vocal-'+hashlib.sha256(data).hexdigest()[:16]+suffix
    (ROOT/name).parent.mkdir(exist_ok=True);(ROOT/name).write_bytes(data);assets[url]=name
    return './'+name

def urls_in(text):
    return re.sub(r'url\(\s*([\'\"]?)(https?://[^)\'\"]+)\1\s*\)',lambda m:'url("'+local_url(m[2])+'")',text)

def clean(e):
    e=deepcopy(e)
    for x in list(e.xpath('.//script|.//style|.//noscript')):x.getparent().remove(x)
    for x in e.iter():
        if not isinstance(x.tag,str):continue
        for k in list(x.attrib):
            if k.startswith('on'):del x.attrib[k]
        if x.get('data-original') and x.tag=='img':x.set('src',x.get('data-original'))
        for a in ['src','data-original']:
            u=x.get(a)
            if u and ('tildacdn.' in u or 'tilda.ws/img' in u):x.set(a,local_url(u))
        if x.get('style'):x.set('style',urls_in(x.get('style')))
        if x.tag=='a':
            u=x.get('href','')
            if '#popup:order' in u:x.set('href','#trial');x.set('data-order','gift' if 'order2' in u and 'ПОДАР' in x.text_content().upper() else 'trial')
    return e
source=html.fromstring(z.read('bemusic-odi.ru/vokal-v-odincovo'))
main=html.fromstring((ROOT/'index.html').read_bytes())
page=html.Element('html',lang='ru');head=etree.SubElement(page,'head');etree.SubElement(head,'meta',charset='utf-8');etree.SubElement(head,'meta',name='viewport',content='width=device-width,initial-scale=1');etree.SubElement(head,'meta',name='robots',content='noindex,nofollow')
etree.SubElement(head,'title').text=source.xpath('//title')[0].text
# Reuse the verified fonts, header, teachers, dialogs, contact section and footer.
(ROOT/'bemusic-shared-v43.css').write_text(main.xpath('//head/style')[0].text)
etree.SubElement(head,'link',rel='stylesheet',href='./bemusic-shared-v43.css')
for link in main.xpath('//head/link[@rel="stylesheet"]'):head.append(deepcopy(link))
css=[]
for link in source.xpath('//head/link[@rel="stylesheet"]'):
 u=link.get('href')
 if 'tilda-grid' in u or 'tilda-blocks-page' in u:
  key=urls.get(u) or next(n for n in z.namelist() if n.startswith(urlsplit(u).netloc+urlsplit(u).path))
  css.append(urls_in((gzip.decompress(z.read(key)) if z.read(key).startswith(b'\x1f\x8b') else z.read(key)).decode()).replace('#allrecords','#bm').replace("'mix'",'BMOriginal').replace('"mix"','BMOriginal'))
body=etree.SubElement(page,'body');bm=etree.SubElement(body,'main',id='bm',attrib={'class':'vocal-page t-records'})
mainroot=main.get_element_by_id('bm')
header=deepcopy(mainroot.xpath('./header')[0]);bm.append(header)
etree.SubElement(bm,'span',id='top')
selected=['1169096806','1130437516','1130461571','1130437531','1130437541','1130437546','1130437556','1130437561','1130437566','1130437576','1130437581','1130496191','1130437586','1130437591','1130573096','1130569141','1130437596']
zero=[]
for rid in selected:
 orig=source.get_element_by_id('rec'+rid)
 for st in orig.xpath('.//style'):css.append(urls_in(st.text or '').replace("'mix'",'BMOriginal').replace('"mix"','BMOriginal'))
 e=clean(orig);bm.append(e)
 if orig.get('data-record-type')=='396':zero.append(e)
# The teacher slider is shared by the original home and vocal page.
teacher=deepcopy(main.get_element_by_id('teacher'))
labels=source.get_element_by_id('rec1171635366').xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," t-btnflex__text ")]/text()')
for button,label in zip(teacher.xpath('.//*[@data-bio]'),labels):
 for child in list(button):button.remove(child)
 button.text=label.strip()
bm.append(teacher)
rid='1130529986';orig=source.get_element_by_id('rec'+rid)
for st in orig.xpath('.//style'):css.append(urls_in(st.text or '').replace("'mix'",'BMOriginal').replace('"mix"','BMOriginal'))
e=clean(orig);bm.append(e);zero.append(e)
for id_ in ['contacts','s887169985'] :bm.append(deepcopy(main.get_element_by_id(id_)))
bm.append(deepcopy(mainroot.xpath('./footer')[0]));bm.append(deepcopy(main.get_element_by_id('dialog')))
# Generate browser-native responsive coordinates from source design data.
def val(e,k,bp):
 v=e.get('data-field-'+k+'-value')
 for n in [960,640,480,320]:
  if bp<=n and e.get(f'data-field-{k}-res-{n}-value') is not None:v=e.get(f'data-field-{k}-res-{n}-value')
 return v
for rec in zero:
 board=rec.xpath('.//*[@data-artboard-recid and contains(@class,"artboard")]')[0]
 for bp in [1200,960,640,480,320]:
  grid=bp;h=board.get('data-artboard-height')
  for n in [960,640,480,320]:
   if bp<=n and board.get(f'data-artboard-height-res-{n}') is not None:h=board.get(f'data-artboard-height-res-{n}')
  rules=[f'#{rec.get("id")} .t396__artboard{{height:{h}px}}']
  for el in board.xpath('.//*[@data-elem-id]'):
   props={}; w=val(el,'width',bp) or '0';hu=val(el,'heightunits',bp) or 'px';wu=val(el,'widthunits',bp) or 'px';hh=val(el,'height',bp) or '0';container=val(el,'container',bp) or 'grid'
   props['width']=w+'px' if wu=='px' else (w+'%' if container=='window' else str(float(w)*grid/100)+'px')
   # Autoheight text matches the atom's natural line box, rather than design metadata.
   props['height']=hh+hu if el.get('data-elem-type')!='text' or val(el,'textfit',bp)=='fixedsize' else 'auto'
   left=val(el,'left',bp) or '0';top=val(el,'top',bp) or '0';axis=val(el,'axisx',bp) or 'left';ay=val(el,'axisy',bp) or 'top';lu=val(el,'leftunits',bp) or 'px';tu=val(el,'topunits',bp) or 'px'
   if axis=='center':props['left']=f'calc(50% + {left}{lu})';props['transform']='translateX(-50%)'
   elif axis=='right':props['left']=f'calc(50% + {grid/2}px - {props["width"]} + {left}{lu})' if container=='grid' else f'calc(100% - {props["width"]} + {left}{lu})'
   else:props['left']=f'calc(50% - {grid/2}px + {left}{lu})' if container=='grid' else left+lu
   props['top']=top+tu if ay=='top' else f'calc({float(h)/2 if ay=="center" else float(h)}px - {float(hh)/2 if ay=="center" else float(hh)}px + {top}{tu})'
   rules.append('#'+rec.get('id')+' .tn-elem[data-elem-id="'+el.get('data-elem-id')+'"]{'+''.join(k+':'+v+';' for k,v in props.items())+'}')
  text='\n'.join(rules)
  css.append(text if bp==1200 else '@media(max-width:'+str({960:1199,640:959,480:639,320:479}[bp])+'px){'+text+'}')
# Shared header interactions without assumptions about home-only sections.
base=main.xpath('//script[not(@src)]')[0].text.split('const bios=')[0]+'})();'
(ROOT/'vocal-base-v43.js').write_text(base)
scripts=['vocal-base-v43.js','fidelity-v5-7.js?v=42','vocal-common-v43.js','vocal-shared-v43.js','fidelity-v11-2.js?v=38','fidelity-v12-4.js','fidelity-v14-2.js','fidelity-v16-3.js?v=42-2','menu-v33.js?v=4','vocal-page-v43.js?v=47-1']
common=(ROOT/'fidelity-v6-2.js').read_text()
common=common.replace("root.querySelector('.quiz-section').id='quiz';root.querySelector('.about-video').id='about-video';root.querySelector('.faq-section').id='faq';",'')
common=common.replace('a[href="#type"]','a[href="#type"],a[href="./index.html#type"]')
(ROOT/'vocal-common-v43.js').write_text(common)

shared=(ROOT/'quiz-layout-v24.js').read_text()
start=shared.index("root.querySelector('.ticker').classList.add('first-ticker');")
end=shared.index("const teacherTrack",start)
shared=shared[:start]+shared[end:]
shared=shared.replace("nav.querySelector('a[href=\"'+href+'\"]')","nav.querySelector('a[href=\"'+href+'\"],a[href=\"./index.html'+href+'\"]')")
shared=shared.replace(".footgrid a[href=\"#sertifikat\"]",".footgrid a[href=\"#sertifikat\"],.footgrid a[href=\"./index.html#sertifikat\"]")
(ROOT/'vocal-shared-v43.js').write_text(shared)

for name in scripts:etree.SubElement(body,'script',src='./'+name)
# Restore explicit document links in shared sections; only vocal is local so far.
for a in bm.xpath('.//a[@href]'):
 u=a.get('href')
 if u=='#top':a.set('href','./index.html')
 elif u.startswith('#') and not u.startswith(('#popup','#trial')) and not a.get('data-bio') and not a.get('data-order') and not u in ['#teacher','#contacts']:a.set('href','./index.html'+u)
 if u in ['https://bemusic-odi.ru/vokal-v-odincovo','/vokal-v-odincovo']:a.set('href','./vokal-v-odincovo.html')
 if a.get('data-program')=='vokal-v-odincovo':a.set('href','./vokal-v-odincovo.html');a.attrib.pop('data-program',None)
css.append('''#bm .desktop-header nav>a{color:#1f1f1f}#bm .t396 .tn-atom{font-family:BMOriginal,Arial,sans-serif}#bm .t396 h1,#bm .t396 h2,#bm .t396 h3{margin:0}#bm .t396__carrier,#bm .t396__filter{height:100%}#bm .tn-atom__img{height:auto}#bm .r{position:relative}#bm .r .t-btnflex{font-family:BMOriginal,Arial,sans-serif;line-height:1.4}#bm .t550__digit:empty::before{content:counter(vocal-step)}#bm .t550{counter-reset:vocal-step}#bm .t550__col{counter-increment:vocal-step}#bm .tn-atom iframe{display:block;width:100%;height:100%;border:0}#bm .t-video-lazyload{aspect-ratio:16/9;width:100%}#bm .t-video-lazyload iframe{width:100%;height:100%;border:0}#bm #rec1130569141{display:none}#bm .vocal-spinning .tn-atom{animation:vocal-spin 5s linear infinite}@keyframes vocal-spin{to{rotate:360deg}}@media(prefers-reduced-motion:reduce){#bm .vocal-spinning .tn-atom{animation:none}}''')
(ROOT/'vocal-layout-v43.css').write_text(re.sub(r'(?<![-\w])mix(?![-\w])','BMOriginal','\n'.join(css)));etree.SubElement(head,'link',rel='stylesheet',href='./vocal-layout-v43.css?v=43-7')
etree.SubElement(head,'link',rel='stylesheet',href='./direction-faq-v53.css?v=53-1')
etree.SubElement(head,'link',rel='stylesheet',href='./direction-trial-v54.css?v=54-2')
etree.SubElement(head,'link',rel='stylesheet',href='./fidelity-v55.css?v=55-1')
etree.SubElement(head,'link',rel='stylesheet',href='./fidelity-v56.css?v=56-2')
result=html.tostring(page,encoding='unicode',doctype='<!doctype html>')
(ROOT/'vokal-v-odincovo.html').write_text(result)
print(json.dumps({'assets':len(set(assets.values())),'zero_scenes':len(zero),'zero_elements':sum(len(r.xpath('.//*[@data-elem-id]')) for r in zero),'missing':sorted(missing),'html_bytes':len(result.encode())},ensure_ascii=False))
if missing:raise SystemExit('Missing source assets')
