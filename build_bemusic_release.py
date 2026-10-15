from pathlib import Path
import re, base64, mimetypes, hashlib, json, shutil, zipfile

root = Path(__file__).resolve().parent
src = root / 'github-preview' if (root / 'github-preview').is_dir() else root
out = root / 'bemusic-release-v31'
out.mkdir(exist_ok=True)
html = (src / 'index.html').read_text()
css = re.findall(r'<link[^>]+href="([^" ]+\.css)"[^>]*>', html)
scripts = re.findall(r'<script[^>]+src="([^"]+)"[^>]*></script>', html)
assets = ['form-logo.jpg','quiz-icon.png','header-telegram.png','header-vk.png','header-instagram.png']
files = ['index.html','privacy.html','email.html'] + css + scripts + assets
files = sorted(set(p.removeprefix('./') for p in files))
missing = [p for p in files if not (src / p).is_file()]
if missing:
    raise RuntimeError(f'Missing resources: {missing}')
for name in files:
    shutil.copyfile(src / name, out / name)

def inline_css(match):
    path = re.search(r'href="([^"]+)"', match.group()).group(1)
    return '<style>\n' + (src / path).read_text() + '\n</style>'

def inline_js(match):
    path = re.search(r'src="([^"]+)"', match.group()).group(1)
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

standalone = re.sub(r'<link[^>]+href="[^" ]+\.css"[^>]*>', inline_css, html)
standalone = re.sub(r'<script[^>]+src="[^"]+"[^>]*></script>', inline_js, standalone)
assert not re.search(r'<script[^>]+src=', standalone)
assert not re.search(r'<link[^>]+href="[^" ]+\.css"', standalone)
assert not re.search(r'(?:static|js|fonts)\.tildacdn\.', standalone)
(out / 'BEMUSIC_STANDALONE.html').write_text(standalone)
shutil.copyfile(root / 'BEMUSIC_AUDIT.md', out / 'BEMUSIC_AUDIT.md')
(out / 'README.md').write_text('''# BE MUSIC — автономный комплект v31\n\nОткройте BEMUSIC_STANDALONE.html в браузере. CSS, JavaScript, изображения и шрифты встроены в этот файл. Политики privacy.html и email.html лежат рядом.\n\nДля редактирования используйте index.html и его отдельные файлы. Комплект содержит только активные зависимости, без старых редакций и исходного Tilda runtime.\n\nИнтернет нужен для встроенных видео VK, карты Яндекса и внешних ссылок. Страницы направлений и лояльности пока открываются на bemusic-odi.ru. Отправка заявок отключена. Это не полная офлайн-копия внешних сервисов или внутренних страниц.\n\nПроверено в облачном Chrome. Проверка на физическом iPhone/Safari не проводилась. Полная попиксельная идентичность не заявляется. Подробнее — BEMUSIC_AUDIT.md.\n''')
manifest = {p.name: {'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(out.iterdir()) if p.is_file() and p.name != 'MANIFEST.json'}
(out / 'MANIFEST.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
archive = root / 'BEMUSIC_RELEASE_v31.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for path in sorted(out.iterdir()):
        z.write(path, path.name)
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
print(json.dumps({'active_source_files':len(files),'archive_bytes':archive.stat().st_size,'standalone_bytes':(out/'BEMUSIC_STANDALONE.html').stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}))
