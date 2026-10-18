"""Restore source policy/consent presentation without rewriting their text."""
from pathlib import Path
from copy import deepcopy
from lxml import html,etree
from urllib.parse import urlsplit
import zipfile,json,gzip,re,hashlib,sys
root=Path(__file__).resolve().parent
z=zipfile.ZipFile(sys.argv[1]);manifest=json.loads(z.read('manifest.json'));urls={r['url']:r['path'] for r in manifest if r.get('path')}
base=html.fromstring((root/'programma-loyalnosti-be-music.html').read_bytes());assets=set()
def raw_url(u):
 key=urls.get(u)
 if not key:
  p=urlsplit(u);stem=p.netloc+p.path;key=next(n for n in z.namelist() if n==stem or n.startswith(stem+'__'))
 return z.read(key)
def local_url(u):
 data=raw_url(u);suffix=Path(urlsplit(u).path).suffix;digest=hashlib.sha256(data).hexdigest()[:16]
 for prefix in ['vocal','guitar','piano','kids','policy']:
  candidate=root/(prefix+'-'+digest+suffix)
  if candidate.is_file() and candidate.read_bytes()==data:assets.add(candidate.name);return './'+candidate.name
 name='policy-'+digest+suffix;(root/name).write_bytes(data);assets.add(name);return './'+name
def css_urls(s):return re.sub(r'url\(\s*([\'\"]?)(https?://[^)\'\"]+)\1\s*\)',lambda m:'url("'+local_url(m[2])+'")',s)
css=[]
for name,ids in [('privacy',['rec886479424','rec886479427']),('email',['rec886478986','rec886478983'])]:
 source=html.fromstring(z.read('bemusic-odi.ru/'+name));page=deepcopy(base);page.find('head/title').text=source.find('head/title').text
 bm=page.get_element_by_id('bm');bm.set('class','policy-page t-records');separator=page.get_element_by_id('s887169985')
 for rid in ids:
  rec=deepcopy(source.get_element_by_id(rid))
  for e in list(rec.xpath('.//script|.//noscript')):e.getparent().remove(e)
  for e in rec.iter():
   if not isinstance(e.tag,str):continue
   for k in list(e.attrib):
    if k.startswith('on'):del e.attrib[k]
  separator.addprevious(rec)
  assert ''.join(source.get_element_by_id(rid).itertext())==''.join(rec.itertext()),rid
 etree.SubElement(page.find('head'),'link',rel='stylesheet',href='./policy-layout-v48.css?v=48-2')
 (root/(name+'.html')).write_text(html.tostring(page,encoding='unicode',doctype='<!doctype html>'))
 if name=='privacy':
  for link in source.xpath('//head/link[@rel="stylesheet"]'):
   u=link.get('href')
   if not any(k in u for k in ['tilda-grid','tilda-blocks-page']):continue
   b=raw_url(u);b=gzip.decompress(b) if b[:2]==b'\x1f\x8b' else b
   css.append(css_urls(b.decode()).replace('#allrecords','#bm'))
text='\n'.join(css);text=re.sub(r'(?<![-\w])mix(?![-\w])','BMOriginal',text)
text+='\n@media(min-width:961px){#bm.policy-page .t017 .t-col,#bm.policy-page .t004 .t-col{box-sizing:content-box}}\n'
(root/'policy-layout-v48.css').write_text(text)
print(json.dumps({'text_preserved':True,'assets':sorted(assets),'css_bytes':len(text.encode())}))
