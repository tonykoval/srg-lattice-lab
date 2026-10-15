"""Check local links and create a clean, repository-ready ZIP (no QA profile)."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import zipfile

root = Path(__file__).resolve().parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, 'duplicate id: ' + attrs['id']
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])
page = Page()
page.feed((root / 'index.html').read_text(encoding='utf-8'))
for link in page.links:
    url = urlsplit(link)
    if url.scheme or url.netloc:
        continue
    if url.path:
        assert (root / unquote(url.path)).is_file(), 'missing asset: ' + link
    elif url.fragment:
        assert url.fragment in page.ids, 'missing anchor: ' + link
files = ['index.html', 'style.css', 'math.js', 'app.js', 'data.js', 'favicon.svg',
         '.nojekyll', '.gitignore', 'README.md', 'SOURCE_NOTES.md', 'test.cjs',
         'build_data.py', 'package.py', 'qa.cjs']
archive = root.parent / 'srg-lattice-lab.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for name in files:
        z.write(root / name, name)
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert set(z.namelist()) == set(files)
print(f'PASS: {len(page.ids)} unique HTML IDs; all local assets and anchors resolve.')
print(f'Packaged {len(files)} files, {archive.stat().st_size:,} bytes: {archive}')
