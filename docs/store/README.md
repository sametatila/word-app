# Mağaza vitrin kareleri

Mağazaya yüklenen ekran görüntüleri burada üretiliyor. Üç parça var:

| Klasör | Ne | Depoda mı |
|---|---|---|
| `raw/` | Cihazdan alınmış ham ekran görüntüleri (1080×2266, durum ve gezinme çubukları kırpılmış) | **Evet** — yeniden üretilemez, cihaz ve giriş yapılmış hesap ister |
| `plan/` | Hangi ham görüntüye hangi altyazı, hangi sırayla | **Evet** |
| `play/`, `appstore/` | Üretilen kareler | Hayır — `.gitignore`'da, tek komutla yeniden üretilir |

## Yeniden üretmek

```bash
python3 scripts/store-shots.py --plan docs/store/plan/b-exam.json --out docs/store/play/b-exam --store play
```

`--store play` 1080×1920, `--store ios` 1290×2796 üretir.

## Play ikonu (512×512)

Kaynağı iOS'un 1024'lük ikonu; Play 512 istiyor, alfa ve köşe yuvarlatma
KABUL ETMİYOR. Türetme tek satır, o yüzden çıktı depoda durmuyor:

```bash
python3 -c "from PIL import Image; \
Image.open('mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/AppIcon-1024.png') \
.convert('RGB').resize((512,512), Image.LANCZOS) \
.save('docs/store/graphics/play-icon-512.png','PNG',optimize=True)"
```

## Yeni ham görüntü çekmek

Gerçek cihaz (ya da emülatör) + **imzalı release yapısı** + giriş yapılmış hesap gerekir.
Debug yapısı olmaz: R8 küçültmesi ve paketlenmiş varlıklar yalnız release'te devrede ve
karelerdeki ekran mağazadaki uygulamanın ekranı olmalı.

```bash
adb exec-out screencap -p > /tmp/x.png
python3 - <<'PY'
from PIL import Image
Image.open("/tmp/x.png").convert("RGB").crop((0, 74, 1080, 2340)).save("docs/store/raw/yeni.png")
PY
```

Kırpma değerleri 1080×2400 · 420 dpi içindir: üstteki 74 piksel durum çubuğu, alttaki
60 piksel gezinme çubuğu. Başka bir çözünürlükte bu iki sayı yeniden ölçülür.

## Kurallar

- **Yer tutucu veri olmaz.** Kareler gerçek hesapla, gerçek ilerlemeyle alınır.
- **Maskot ana unsur olmaz** (bkz. `docs/play/listing.md` §1): hedef kitle 18+ ve
  vitrinde çocuk vurgusu istenmiyor.
- **Altyazı özellik anlatır**, fiyat ya da vaat içermez.
- **Her yerelleştirme kendi dilinde** kare ister. Bugün yalnız Türkçe vitrin açılıyor
  (`PAIR_READY` yalnız `tr` için dolu), o yüzden yalnız Türkçe kare seti var.
- **iOS kareleri iOS'tan alınır.** Android karesini App Store'a yüklemek 2.3.3 ihlalidir;
  `--store ios` yalnız yerleşim provası için.
