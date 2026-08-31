# -*- coding: utf-8 -*-
"""Çeviri parçalarını birleştir, doğrula, nihai CSV/JSON üret."""
import csv, json, os, re, sys, glob, collections, unicodedata

SC = os.path.dirname(os.path.abspath(__file__))
TR = os.path.join(SC, 'tr')
DATA = '/mnt/windows/Users/LinkinqArk/Desktop/Workspace/word-app/data'

items = json.load(open(os.path.join(TR, 'items.json'), encoding='utf-8'))
SIZE = 120
ids = {}
for n in range((len(items) + SIZE - 1) // SIZE):
    for j, it in enumerate(items[n*SIZE:(n+1)*SIZE]):
        ids[f'{n:03d}-{j:03d}'] = it

trans = {}
id_issue = []
for n in range((len(items) + SIZE - 1) // SIZE):
    fp = os.path.join(TR, 'out', f'chunk_{n:03d}.tsv')
    if not os.path.exists(fp):
        id_issue.append((f'{n:03d}', 'DOSYA YOK'))
        continue
    lines = [l.rstrip('\n') for l in open(fp, encoding='utf-8') if l.strip()]
    expected = [f'{n:03d}-{j:03d}' for j in range(len(items[n*SIZE:(n+1)*SIZE]))]
    if len(lines) != len(expected):
        id_issue.append((f'{n:03d}', f'satır {len(lines)} != {len(expected)}'))
    got_ids = [l.split('\t')[0].strip() for l in lines]
    if got_ids[:len(expected)] != expected:
        id_issue.append((f'{n:03d}', f'id sütunu farklı (ilk: {got_ids[0]}) -> sıra ile eşlendi'))
    for j, l in enumerate(lines):
        if j >= len(expected):
            break
        parts = l.split('\t')
        tr = ' '.join(p.strip() for p in parts[1:]).strip() if len(parts) > 1 else ''
        if tr:
            trans[expected[j]] = re.sub(r'\s+', ' ', tr)
for c, m in id_issue:
    print(f'NOT chunk {c}: {m}')

# doğrulama turundan gelen düzeltmeleri uygula
nfix, skipped = 0, []
for fp in sorted(glob.glob(os.path.join(TR, 'fix', '*.tsv'))):
    base = os.path.basename(fp)
    chk = os.path.join(TR, 'chk', base)
    chk_ids = [l.split('\t')[0].strip() for l in open(chk, encoding='utf-8') if l.strip()]
    for l in open(fp, encoding='utf-8'):
        p = [x.strip() for x in l.rstrip('\n').split('\t')]
        if len(p) < 2 or not p[1]:
            continue
        gid = p[0]
        if gid not in ids:
            if gid.isdigit() and 1 <= int(gid) <= len(chk_ids):
                gid = chk_ids[int(gid) - 1]          # satır numarası olarak yazılmış
            else:
                skipped.append((base, p[0]))
                continue
        new_tr = re.sub(r'\s+', ' ', ' '.join(p[1:]).strip())
        if trans.get(gid) != new_tr:
            trans[gid] = new_tr
            nfix += 1
print('uygulanan düzeltme:', nfix, '| çözülemeyen:', len(skipped), skipped[:5])

missing = [g for g in ids if g not in trans]
print(f'çeviri: {len(trans)}/{len(ids)}  eksik: {len(missing)}')
if missing:
    with open(os.path.join(TR, 'missing.tsv'), 'w', encoding='utf-8') as f:
        for g in sorted(missing):
            it = ids[g]
            lemma = (it['artikel'] + ' ' if it['artikel'] else '') + it['wort']
            f.write('\t'.join([g, lemma, it['formen'][:40], it['typ'], it['bsp']]) + '\n')
    print('eksikler tr/missing.tsv dosyasına yazıldı')

# --- kalite kontrolleri ---
DE_ONLY = re.compile(r'[äßÄ]')
warn = collections.defaultdict(list)
for g, tr in trans.items():
    it = ids[g]
    if DE_ONLY.search(tr):
        warn['almanca_harf'].append((it['wort'], tr))
    if tr.lower() == it['wort'].lower():
        warn['cevrilmemis'].append((it['wort'], tr))
    if len(tr) > 70:
        warn['cok_uzun'].append((it['wort'], tr))
    if re.search(r'\b(the|and|for|with|from)\b', tr.lower()):
        warn['ingilizce'].append((it['wort'], tr))
for k, v in warn.items():
    print(f'UYARI {k}: {len(v)}  örn: {v[:4]}')

if missing:
    sys.exit(1)

# --- tam CSV'ye türkçe sütunu ekle ---
key2tr = {}
for g, tr in trans.items():
    it = ids[g]
    key2tr[(it['wort'], it['artikel'])] = tr

rows = list(csv.DictReader(open(os.path.join(DATA, 'goethe_wortschatz.csv'), encoding='utf-8')))
fields = ['niveau', 'wort', 'artikel', 'turkce', 'formen', 'typ', 'beispiele', 'eintrag', 'quelle']
out = []
for r in rows:
    r['turkce'] = key2tr.get((r['wort'], r['artikel']), '')
    out.append({k: r.get(k, '') for k in fields})
empty = sum(1 for r in out if not r['turkce'])
print('CSV satırı:', len(out), '| türkçesi boş:', empty)


def write(path, data, enc, delim):
    with open(path, 'w', encoding=enc, newline='') as f:
        w = csv.DictWriter(f, fieldnames=fields, delimiter=delim)
        w.writeheader()
        w.writerows(data)


write(os.path.join(DATA, 'goethe_wortschatz.csv'), out, 'utf-8', ',')
write(os.path.join(DATA, 'goethe_wortschatz_excel.csv'), out, 'utf-8-sig', ';')
for lv, tag in [('A1 (Fit in Deutsch 1)', 'a1_fit_in_deutsch_1'), ('A1 (Start Deutsch 1)', 'a1_start_deutsch_1'),
                ('A2', 'a2'), ('B1', 'b1')]:
    write(os.path.join(DATA, f'goethe_{tag}.csv'), [r for r in out if r['niveau'] == lv], 'utf-8', ',')

# --- uygulama için tekilleştirilmiş JSON ---
app = []
for i, it in enumerate(items):
    g = [k for k, v in ids.items() if v is it][0]
    app.append(dict(id=i + 1, de=it['wort'], artikel=it['artikel'], tr=trans.get(g, ''),
                    formen=it['formen'], typ=it['typ'], niveau=sorted(it['niveaus'])[0],
                    beispiel=it['bsp']))
os.makedirs(os.path.join(DATA, 'app'), exist_ok=True)
json.dump(app, open(os.path.join(DATA, 'app', 'words.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=0)
write(os.path.join(DATA, 'app', 'words.csv'),
      [{**{k: '' for k in fields}, 'wort': a['de'], 'artikel': a['artikel'], 'turkce': a['tr'],
        'formen': a['formen'], 'typ': a['typ'], 'niveau': a['niveau'], 'beispiele': a['beispiel']} for a in app],
      'utf-8', ',')
print('uygulama verisi:', len(app), 'benzersiz kelime')
