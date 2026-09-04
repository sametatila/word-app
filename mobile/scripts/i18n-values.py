#!/usr/bin/env python3
"""Bir i18n sözlüğünden verilen anahtarların DEĞERLERİNİ basar, `|` ile ayrılmış.

Neden var: UI turu (ios-flow-screenshots.sh → LernomiUITests) geri dönülemez
eylemlerin düğmelerine hiç dokunmuyor ve onları metinle eliyor. O metinleri
betiğe elle yazmak, çeviri değişince sessizce yanlışa düşen bir kopya demek
olurdu — hesap silme onayı yeniden yazıldığında liste tutmaz ve tur o düğmeye
basar. Bu yüzden değerler tek kaynaktan, src/i18n/<dil>.ts'ten okunuyor.

Kullanım: i18n-values.py src/i18n/tr.ts anahtar.bir anahtar.iki
Bulunamayan anahtar sessizce atlanır: bir dilde olmayan bir anahtar yüzünden
tur hiç koşmamaktansa, o dilde bir eleme eksik olsun.
"""
import re
import sys

if len(sys.argv) < 3:
    print("kullanım: i18n-values.py <sozluk.ts> <anahtar> [...]", file=sys.stderr)
    sys.exit(2)

path, keys = sys.argv[1], sys.argv[2:]
src = open(path, encoding="utf-8").read()

out = []
for key in keys:
    m = re.search(r'"' + re.escape(key) + r'"\s*:\s*"((?:[^"\\]|\\.)*)"', src)
    if m:
        out.append(m.group(1).replace('\\"', '"'))

print("|".join(out))
