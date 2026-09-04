#!/usr/bin/env python3
"""Bir ekran görüntüsünde içerik var mı — uygulama ilk kareyi çizdi mi.

Simülatör karesi uygulama çizmeden alınırsa saf siyah (ya da beyaz) çıkıyor ve
bunu dosya boyutundan anlamak güvenilmez. Burada karenin RENK ÇEŞİTLİLİĞİ
sayılıyor: gerçek karelerde 24-77 ayrı renk ölçüldü, çizilmemiş karede 2.

Durum çubuğu (üst %8) sayıma girmiyor: saat ve pil simgeleri uygulama hiç
açılmasa da orada duruyor ve boş kareyi dolu gösterirdi.

PIL yok — PNG elle çözülüyor (zlib + filtre). simctl karesi 8-bit RGB/RGBA.

Çıkış: 0 içerik var, 1 boş. Kullanım: png-blank.py kare.png [...]
"""
import sys, zlib, struct

def png_pixels(path):
    """PNG'yi PIL olmadan çöz: IHDR + IDAT, filtre çöz, satırları döndür."""
    d = open(path, "rb").read()
    assert d[:8] == b"\x89PNG\r\n\x1a\n"
    pos, idat, w = 8, b"", None
    while pos < len(d):
        ln = struct.unpack(">I", d[pos:pos+4])[0]
        typ = d[pos+4:pos+8]
        body = d[pos+8:pos+8+ln]
        if typ == b"IHDR":
            w, h, depth, color = struct.unpack(">IIBB", body[:10])
            assert depth == 8 and color in (2, 6), (depth, color)
            ch = 3 if color == 2 else 4
        elif typ == b"IDAT":
            idat += body
        elif typ == b"IEND":
            break
        pos += 12 + ln
    raw = zlib.decompress(idat)
    stride = w * ch
    out, prev = [], bytearray(stride)
    p = 0
    for _ in range(h):
        f = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        for i in range(stride):
            a = line[i-ch] if i >= ch else 0
            b = prev[i]
            c = prev[i-ch] if i >= ch else 0
            if f == 1: line[i] = (line[i] + a) & 255
            elif f == 2: line[i] = (line[i] + b) & 255
            elif f == 3: line[i] = (line[i] + (a + b) // 2) & 255
            elif f == 4:
                pp = a + b - c
                pa, pb, pc = abs(pp-a), abs(pp-b), abs(pp-c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 255
        out.append(bytes(line)); prev = line
    return w, h, ch, out

def distinct_colors(path, sample=40):
    w, h, ch, rows = png_pixels(path)
    # Durum çubuğunu atla (üst %8) — orada her zaman içerik var.
    top = int(h * 0.08)
    seen = set()
    for y in range(top, h, max(1, (h - top) // sample)):
        r = rows[y]
        for x in range(0, w, max(1, w // sample)):
            seen.add(r[x*ch:x*ch+3])
    return len(seen)


THRESHOLD = 3

if __name__ == "__main__":
    paths = sys.argv[1:]
    if not paths:
        print("kullanım: png-blank.py kare.png [...]", file=sys.stderr)
        sys.exit(2)
    blank = False
    for p in paths:
        try:
            n = distinct_colors(p)
        except Exception as e:
            print(f"    ?  okunamadı ({e}): {p}", file=sys.stderr)
            continue
        if n <= THRESHOLD:
            blank = True
        print(f"{n:5d}  {'BOS' if n <= THRESHOLD else 'dolu'}  {p.split('/')[-1]}")
    sys.exit(1 if blank else 0)
