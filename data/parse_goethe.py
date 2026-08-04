# -*- coding: utf-8 -*-
"""Goethe-Zertifikat Wortlisten (PDF) -> CSV, UTF-8, Umlaute/ß erhalten."""
import re, html, subprocess, collections, csv, os, sys

WORD = re.compile(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>')
PAGE = re.compile(r'<page width="([\d.]+)" height="([\d.]+)">')

NOISE = re.compile(r'^(WORTLISTE|ZERTIFIKAT|GOETHE-ZERTIFIKAT|INVENTARE|Inventare|ALPHABETISCHER|WORTSCHATZ|'
                   r'\d?\s*Alphabetische[rs]?( Wortschatz)?|Wortschatz|VS_[\w]*|[AB][12]_\w+|[A-ZÄÖÜ]|\d{1,3}|→|●|■)$')

CONFIG = {
    # level: (pdf, first_page, last_page, columns [(head_x0, head_x1/ex_x0, ex_x1)], entry_mode)
    'A1 (Fit in Deutsch 1)': dict(pdf='A1_Fit1.pdf', pages=(9, 21),
                                  cols=[(138, 228, 600)], mode='every'),
    'A1 (Start Deutsch 1)':  dict(pdf='A1_SD1.pdf',  pages=(9, 27),
                                  cols=[(138, 228, 600)], mode='every'),
    'A2':                    dict(pdf='A2.pdf',      pages=(8, 31),
                                  cols=[(28, 100, 300), (300, 370, 600)], mode='gap'),
    'B1':                    dict(pdf='B1.pdf',      pages=(16, 102),
                                  cols=[(28, 125, 310), (310, 405, 600)], mode='gap'),
}
Y_MIN, Y_MAX = 55.0, 786.0


def read_words(pdf, first, last):
    out = subprocess.run(['pdftotext', '-enc', 'UTF-8', '-bbox-layout', '-f', str(first),
                          '-l', str(last), pdf, '-'], capture_output=True, text=True).stdout
    page, res = first - 1, []
    for ln in out.split('\n'):
        if PAGE.search(ln):
            page += 1
            continue
        m = WORD.search(ln)
        if m:
            x0, y0, x1, y1, t = m.groups()
            t = html.unescape(t).strip()
            if t:
                res.append((page, float(x0), float(y0), float(x1), t))
    return res


def build_lines(words, x0, x1):
    """Words within [x0,x1) -> list of (y, text) lines, sorted."""
    buckets = collections.defaultdict(list)
    for _p, wx, wy, _wx1, t in words:
        if x0 <= wx < x1 and Y_MIN <= wy <= Y_MAX:
            buckets[round(wy / 3.0)].append((wy, wx, t))
    lines = []
    for _k, ws in buckets.items():
        ws.sort(key=lambda w: w[1])
        text = ' '.join(t for _y, _x, t in ws)
        lines.append((min(w[0] for w in ws), text))
    lines.sort()
    # merge lines that ended up in adjacent 3pt buckets
    merged = []
    for y, t in lines:
        if merged and y - merged[-1][0] < 4.0:
            merged[-1] = (merged[-1][0], merged[-1][1] + ' ' + t)
        else:
            merged.append((y, t))
    return merged


def dehyphen(parts):
    """Join wrapped lines, undoing end-of-line hyphenation."""
    out = ''
    for p in parts:
        p = p.strip()
        if not p:
            continue
        if out.endswith('-') and not out.endswith((' -', '(-')) and p[:1].islower():
            out = out[:-1] + p
        elif out:
            out += ' ' + p
        else:
            out = p
    return re.sub(r'\s+', ' ', out).strip()


def line_pitch(all_gaps):
    """Base line pitch = smallest frequently occurring gap (wrapped lines)."""
    c = collections.Counter(g for g in all_gaps if 3 <= g <= 60)
    if not c:
        return 11.0
    top = max(c.values())
    return min(g for g, n in c.items() if n >= 0.10 * top)


def column_lines(words, page, hx0, hx1, ex1):
    pw = [w for w in words if w[0] == page]
    heads = [(y, t) for y, t in build_lines(pw, hx0, hx1) if not NOISE.match(t)]
    exs = [(y, t) for y, t in build_lines(pw, hx1, ex1) if not NOISE.match(t)]
    return heads, exs


def parse_column(heads, exs, mode, threshold):
    if not heads:
        return []
    entries = []                       # [start_y, [head parts], [example parts]]
    last_y = None
    for y, t in heads:
        if entries and mode == 'gap' and last_y is not None and (y - last_y) <= threshold:
            entries[-1][1].append(t)
        else:
            entries.append([y, [t], []])
        last_y = y
    starts = [e[0] for e in entries]
    for y, t in exs:
        idx = 0
        for i, s in enumerate(starts):
            if y >= s - 4.0:
                idx = i
            else:
                break
        entries[idx][2].append(t)
    return [(dehyphen(h), dehyphen(x)) for _y, h, x in entries]


SUBSPLIT = re.compile(r'(?<![/(,])\s+(?=(?:der|die|das)\s+[A-ZÄÖÜ])')


def split_subentries(raw):
    parts = [p.strip() for p in SUBSPLIT.split(raw) if p.strip()]
    return parts if len(parts) > 1 else [raw]


ART = {'r': 'der', 'e': 'die', 's': 'das', 'der': 'der', 'die': 'die', 'das': 'das'}


def split_entry(raw):
    """-> (headword, article, forms/plural)"""
    s = re.sub(r'\s+', ' ', raw).strip().strip('|,;: ')
    s = re.sub(r'^r, e, s ', '', s)
    s = s.replace(';', ',')
    m = re.match(r'^(r|e|s|der|die|das)\s+(.*)$', s)
    art = ''
    if m and (m.group(1) in ('der', 'die', 'das') or re.match(r'^[A-ZÄÖÜ(]', m.group(2))):
        art, s = ART[m.group(1)], m.group(2)
    head, rest = s, ''
    if ',' in s:
        head, rest = s.split(',', 1)
    else:
        toks = s.split(' ')
        # Mehrwortausdruck ohne Komma ("auf jeden Fall", "als ob") komplett behalten
        if len(toks) > 1 and (toks[1].startswith('(') or len(toks) > 4):
            head, rest = toks[0], ' '.join(toks[1:])
    head = head.strip(' ,;:/')
    m = re.match(r'^\(?sich\)? (.+)$', head)
    if m:
        head = 'sich ' + m.group(1)
    return head, art, rest.strip(' ,;')


def word_type(art, rest, head):
    if art:
        return 'Nomen'
    if re.search(r'\b(hat|ist|hatte|war)\s+\w+', rest) or re.search(r'\b\w+t,\s', rest + ' '):
        return 'Verb'
    if head.endswith(('en', 'ern', 'eln')) and rest and ',' in rest:
        return 'Verb'
    return 'Sonstiges'


def main(pdfdir, outdir):
    rows = []
    for level, c in CONFIG.items():
        pdf = os.path.join(pdfdir, c['pdf'])
        first, last = c['pages']
        words = read_words(pdf, first, last)
        pages = sorted({w[0] for w in words})
        cache, gaps = {}, []
        for p in pages:
            for col in c['cols']:
                heads, exs = column_lines(words, p, *col)
                cache[(p, col)] = (heads, exs)
                ys = [y for y, _ in heads]
                gaps += [round(b - a) for a, b in zip(ys, ys[1:])]
        thr = line_pitch(gaps) * 1.2
        n0 = len(rows)
        for p in pages:
            for col in c['cols']:
                heads, exs = cache[(p, col)]
                for raw, ex in parse_column(heads, exs, c['mode'], thr):
                    if not raw or len(raw) < 2 or NOISE.match(raw):
                        continue
                    for part in split_subentries(raw):
                        head, art, rest = split_entry(part)
                        if not head or not re.search(r'[A-Za-zÄÖÜäöüß]', head):
                            continue
                        rows.append(dict(niveau=level, wort=head, artikel=art,
                                         formen=rest, eintrag=part,
                                         typ=word_type(art, rest, head),
                                         beispiele=ex, quelle=c['pdf']))
        print(f'{level:24s} {len(rows)-n0:5d} Einträge  (Zeilenraster {thr/1.2:.0f}pt, Schwelle {thr:.1f}pt)')
    # verirrte Fortsetzungszeilen ("hat gearbeitet", "-weise") an den Vor-Eintrag hängen
    CONT = re.compile(r'^(hat|ist|war|hatte|wird|sind|haben)\s+\w+$|^[-¨/]')
    fixed = []
    for r in rows:
        if fixed and CONT.match(r['eintrag']) and fixed[-1]['niveau'] == r['niveau']:
            prev = fixed[-1]
            prev['eintrag'] = (prev['eintrag'] + ' ' + r['eintrag']).strip()
            prev['formen'] = (prev['formen'] + ' ' + r['eintrag']).strip(' ,')
            prev['beispiele'] = ' '.join(x for x in (prev['beispiele'], r['beispiele']) if x)
            continue
        fixed.append(r)
    rows = fixed

    # dedupe identical (level, entry)
    seen, uniq = set(), []
    for r in rows:
        k = (r['niveau'], r['eintrag'], r['beispiele'][:40])
        if k in seen:
            continue
        seen.add(k)
        uniq.append(r)
    os.makedirs(outdir, exist_ok=True)
    fields = ['niveau', 'wort', 'artikel', 'formen', 'typ', 'beispiele', 'eintrag', 'quelle']

    def write(path, data, enc, delim):
        with open(path, 'w', encoding=enc, newline='') as f:
            w = csv.DictWriter(f, fieldnames=fields, delimiter=delim, quoting=csv.QUOTE_MINIMAL)
            w.writeheader()
            w.writerows(data)

    write(os.path.join(outdir, 'goethe_wortschatz.csv'), uniq, 'utf-8', ',')
    write(os.path.join(outdir, 'goethe_wortschatz_excel.csv'), uniq, 'utf-8-sig', ';')
    for level, c in CONFIG.items():
        tag = re.sub(r'[^a-z0-9]+', '_', level.lower()).strip('_')
        write(os.path.join(outdir, f'goethe_{tag}.csv'),
              [r for r in uniq if r['niveau'] == level], 'utf-8', ',')
    print('TOPLAM:', len(uniq))
    return uniq


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
