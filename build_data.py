"""Export only the public parameter tables from the reviewed comparison.
Run from this directory: python3 build_data.py
No manuscript code is executed. No private audit text is copied.
"""
from pathlib import Path
import re
import json

here = Path(__file__).resolve().parent
root = here.parents[1]
source = (root / 'docs/external_djematene_2026_10_14.md').read_text(encoding='utf-8')
def tuples(text):
    return [list(map(int, x)) for x in re.findall(r'\((\d+),(\d+),(\d+),(\d+)\)', text)]
shared = tuples(source.split('Normalised to 2k < v:')[1].split('They also claim')[0])
project = tuples(source.split('70 pairs (2k < v):')[1].split('The 48 of draft')[0])
assert len(shared) == len({tuple(x) for x in shared}) == 35
assert len(project) == len({tuple(x) for x in project}) == 70
assert set(map(tuple, shared)) <= set(map(tuple, project))
data = {'snapshot': '2026-10-15', 'sources': ['https://zenodo.org/records/23305123', 'https://zenodo.org/records/23281359'],
        'rows': [{'params': x, 'shared': x in shared} for x in project]}
(here / 'data.js').write_text('// Public table snapshot; provenance in SOURCE_NOTES.md.\nvar SRG_DATA = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\nif (typeof module !== "undefined") module.exports = SRG_DATA;\n', encoding='utf-8')
print('Exported 70 pairs; 35 shared with Djematene.')
