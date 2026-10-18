"""QA-only frozen Tilda reference. Never used by the independent page."""
from pathlib import Path
from lxml import html
import zipfile,json,sys,gzip,re,base64,mimetypes
from urllib.parse import urlsplit
root=Path(__file__).resolve().parent
with zipfile.ZipFile(sys.argv[1]) as z:
 manifest=json.loads(z.read('manifest.json'));urls={r['url']:r['path'] for r in manifest if r.get('path')}
 def raw(u):
  k=urls.get(u) or next((n for n in z.namelist() if n.startswith(urlsplit(u).netloc+urlsplit(u).path+'__') or n==urlsplit(u).netloc+urlsplit(u).path),None)
  if not k:return None
  b=z.read(k);return gzip.decompress(b) if b.startswith(b'\x1f\x8b') else b
 def data(u):
  b=raw(u)
  return 'data:'+(mimetypes.guess_type(urlsplit(u).path)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(b).decode() if b else u
 def css(s):return re.sub(r'url\(\s*([\'\"]?)(https?://[^)\'\"]+)\1\s*\)',lambda m:'url("'+data(m[2])+'")',s)
 d=html.fromstring(z.read('bemusic-odi.ru/programma-loyalnosti-be-music'))
 for l in d.xpath('//link[@rel="stylesheet"]'):
  s=html.Element('style');s.text=css(raw(l.get('href')).decode());l.getparent().replace(l,s)
 for script in d.xpath('//script[@src]'):
  b=raw(script.get('src'))
  if b is None:script.getparent().remove(script);continue
  script.attrib.clear();script.text=b.decode().replace('</script','<\\/script')
 for st in d.xpath('//style'):st.text=css(st.text or '')
 for el in d.iter():
  if not isinstance(el.tag,str):continue
  for a in ['src','data-original','data-content-cover-bg']:
   u=el.get(a,'')
   if 'tildacdn.' in u:el.set(a,data(u))
  if el.get('style'):el.set('style',css(el.get('style')))
 # Browser cannot frame the live source. This copy is a QA fixture, including original runtime.
 head=d.find('head');meta=html.Element('meta',name='robots',content='noindex,nofollow');head.append(meta)
 (root/'qa-loyalty-reference.html').write_text(html.tostring(d,encoding='unicode',doctype='<!doctype html>'))
 print((root/'qa-loyalty-reference.html').stat().st_size)
