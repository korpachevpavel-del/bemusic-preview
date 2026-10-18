from pathlib import Path
import re, base64, mimetypes, hashlib, json, shutil, zipfile

root = Path(__file__).resolve().parent
src = root / 'github-preview' if (root / 'github-preview').is_dir() else root
out = root / 'bemusic-release-v48'
out.mkdir(exist_ok=True)
html = (src / 'index.html').read_text()
css = re.findall(r'<link[^>]+href="([^" ]+\.css(?:\?[^" ]*)?)"[^>]*>', html)
scripts = re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>', html)
assets = ['form-logo.jpg','quiz-icon.png','header-telegram.png','header-vk.png','header-instagram.png']
vocal_html=(src/'vokal-v-odincovo.html').read_text()
vocal_css=re.findall(r'<link[^>]+href="([^" ]+\.css(?:\?[^" ]*)?)"[^>]*>',vocal_html)
vocal_js=re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>',vocal_html)
vocal_assets=[p.name for p in src.glob('vocal-*') if p.is_file() and p.suffix not in ['.css','.js']]
guitar_html=(src/'igra-na-gitare-v-odincovo.html').read_text()
guitar_css=re.findall(r'<link[^>]+href="([^" ]+\.css(?:\?[^" ]*)?)"[^>]*>',guitar_html)
guitar_js=re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>',guitar_html)
guitar_assets=[p.name for p in src.glob('guitar-*') if p.is_file() and p.suffix not in ['.css','.js']]
piano_html=(src/'igra-na-fortepiano-v-odincovo.html').read_text()
piano_css=re.findall(r'<link[^>]+href="([^" ]+\.css(?:\?[^" ]*)?)"[^>]*>',piano_html)
piano_js=re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>',piano_html)
piano_assets=[p.name for p in src.glob('piano-*') if p.is_file() and p.suffix not in ['.css','.js']]
kids_html=(src/'kids.html').read_text()
kids_css=re.findall(r'<link[^>]+href="([^" ]+\.css(?:\?[^" ]*)?)"[^>]*>',kids_html)
kids_js=re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>',kids_html)
def referenced_assets(text,css_files):
    for css_file in css_files:text+='\n'+(src/css_file.split('?',1)[0]).read_text()
    return sorted(set(re.findall(r'(?:vocal|guitar|piano|kids)-[a-f0-9]{16}\.[A-Za-z0-9]+',text)))
guitar_assets=referenced_assets(guitar_html,guitar_css)
piano_assets=referenced_assets(piano_html,piano_css)
kids_assets=referenced_assets(kids_html,kids_css)
files = ['policy-layout-v48.css','programma-loyalnosti-be-music.html','loyalty-layout-v47.css','loyalty-page-v47.js','kids.html','igra-na-fortepiano-v-odincovo.html','igra-na-gitare-v-odincovo.html','index.html','privacy.html','email.html','vokal-v-odincovo.html'] + css + scripts + assets + vocal_css + vocal_js + vocal_assets + guitar_css + guitar_js + guitar_assets + piano_css + piano_js + piano_assets + kids_css + kids_js + kids_assets
files = sorted(set(p.split('?',1)[0].removeprefix('./') for p in files))
missing = [p for p in files if not (src / p).is_file()]
if missing:
    raise RuntimeError(f'Missing resources: {missing}')
for name in files:
    shutil.copyfile(src / name, out / name)

def inline_css(match):
    path = re.search(r'href="([^"]+)"', match.group()).group(1).split('?',1)[0]
    text=(src/path).read_text()
    def embed_asset(m):
        name=m.group(2).removeprefix('./')
        file=src/name
        if not file.is_file():raise RuntimeError('Missing CSS asset: '+name)
        return 'url("data:'+(mimetypes.guess_type(name)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(file.read_bytes()).decode()+'")'
    text=re.sub(r'url\(\s*([\'\"]?)(\.?/?vocal-[^)\'\"]+)\1\s*\)',embed_asset,text)
    return '<style>\n' + text + '\n</style>'

def inline_js(match):
    path = re.search(r'src="([^"]+)"', match.group()).group(1).split('?',1)[0]
    text = (src / path).read_text()
    for asset in assets:
        data = 'data:' + mimetypes.guess_type(asset)[0] + ';base64,' + base64.b64encode((src / asset).read_bytes()).decode()
        for quote in ["'", '"']:
            for prefix in ['', './']:
                text = text.replace(quote + prefix + asset + quote, quote + data + quote)
    if Path(path).name == 'fidelity-v14-2.js':
        text = text.replace("img.src='./'+asset", 'img.src=asset')
    if '</script' in text.lower():
        raise RuntimeError(f'Unsafe embedded closing tag: {path}')
    return '<script>\n' + text + '\n</script>'

standalone = re.sub(r'<link[^>]+href="[^" ]+\.css(?:\?[^" ]*)?"[^>]*>', inline_css, html)
standalone = re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>', inline_js, standalone)
assert not re.search(r'<script[^>]+src=', standalone)
assert not re.search(r'<link[^>]+href="[^" ]+\.css(?:\?[^" ]*)?"', standalone)
assert not re.search(r'(?:static|js|fonts)\.tildacdn\.', standalone)
(out / 'BEMUSIC_STANDALONE.html').write_text(standalone)

vocal_standalone=re.sub(r'<link[^>]+href="[^" ]+\.css(?:\?[^" ]*)?"[^>]*>',inline_css,vocal_html)
vocal_standalone=re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>',inline_js,vocal_standalone)
for name in vocal_assets:
    data='data:'+(mimetypes.guess_type(name)[0] or 'application/octet-stream')+';base64,'+base64.b64encode((src/name).read_bytes()).decode()
    vocal_standalone=vocal_standalone.replace('./'+name,data)
assert not re.search(r'<script[^>]+src=',vocal_standalone)
assert not re.search(r'(?:static|js|fonts)\.tildacdn\.',vocal_standalone)
(out/'VOCAL_STANDALONE.html').write_text(vocal_standalone)

shutil.copyfile(root / 'BEMUSIC_AUDIT.md', out / 'BEMUSIC_AUDIT.md')
(out / 'README.md').write_text('''# BE MUSIC — автономный комплект v48\n\nОткройте index.html в браузере. Политики privacy.html и email.html лежат рядом. Автономные просмотры BEMUSIC_STANDALONE.html и VOCAL_STANDALONE.html опубликованы отдельно; в ZIP не включены, чтобы не дублировать встроенные ресурсы.\n\nДля редактирования используйте index.html и его отдельные файлы. Комплект содержит только активные зависимости, без старых редакций и исходного Tilda runtime.\n\nИнтернет нужен для встроенных видео VK, карты Яндекса и внешних ссылок. Страница вокала перенесена в vokal-v-odincovo.html, её отдельный автономный просмотр — VOCAL_STANDALONE.html. Страница гитары перенесена в igra-na-gitare-v-odincovo.html. Страница фортепиано перенесена в igra-na-fortepiano-v-odincovo.html. Детская страница перенесена в kids.html. Страница программы лояльности перенесена в programma-loyalnosti-be-music.html; исходная страница содержит только шапку и футер, условия не добавлялись. Тексты документов сохранены из оригинала без редакции. VK и Яндекс подключаются из официальных внешних сервисов; загрузка зависит от сети и видимости блока. Отправка заявок отключена. Это не полная офлайн-копия внешних сервисов или внутренних страниц.\n\nПроверено в облачном Chrome. Проверка на физическом iPhone/Safari не проводилась. Полная попиксельная идентичность не заявляется. Подробнее — BEMUSIC_AUDIT.md.\n''')
manifest = {p.name: {'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(out.iterdir()) if p.is_file() and p.name not in ['MANIFEST.json','BEMUSIC_STANDALONE.html','VOCAL_STANDALONE.html']}
(out / 'MANIFEST.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
archive = root / 'BEMUSIC_RELEASE_v48.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for path in sorted(out.iterdir()):
        if path.name not in ['BEMUSIC_STANDALONE.html','VOCAL_STANDALONE.html']: z.write(path, path.name)
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
print(json.dumps({'active_source_files':len(files),'archive_bytes':archive.stat().st_size,'standalone_bytes':(out/'BEMUSIC_STANDALONE.html').stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}))
