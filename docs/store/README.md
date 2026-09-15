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
- **Sınav markası geçmez** (hiçbir sınav kurumunun ya da sınavın adı; karar
  `docs/play/listing.md` §4.2). "Gerçek
  sınav görevi", "resmî sınav" gibi bir kurumla bağ ya da resmîlik ima eden ifade de yok:
  deneme kâğıtları Lernomi'nin kendi kâğıtları.
- **Premium gerektiren özellik anılıyorsa altyazıda "Premium" yazar** (App Store 2.3.2, Play
  yanıltıcı meta veri). Karedeki ekran premium hesapla çekildiği için kilitsiz görünüyor;
  ücretsiz kapsamı altyazı söylemek zorunda. Ücretsiz/Premium ayrımının kaynağı
  `src/lib/premium/gates.ts`; "1'i ücretsiz" sayısı `free.mockPapersPerLevel` ve panelde
  değişirse altyazı da değişir.
- **Her yerelleştirme kendi dilinde** kare ister. Üç arayüz dilinin üçü de açık
  (`PAIR_READY`: tr, en, de — `mobile/src/lib/courses.ts`), ama bugün yalnız Türkçe kare seti
  var: en-US ve de-DE için ham görüntüler o arayüz diliyle yeniden çekilmeli. Betik karenin
  üstündeki "ADIM n / N" etiketini sabit Türkçe basıyor (`scripts/store-shots.py`); öteki
  diller için o etiket de yerelleştirilmeli.
- **iOS kareleri iOS'tan alınır.** Android karesini App Store'a yüklemek 2.3.3 ihlalidir;
  `--store ios` yalnız yerleşim provası için.

## Altyazı değişikliği (2026-09-14) — kareler yeniden üretilmeli

Mağaza ön inceleme raporu (B25, B26; ücretsiz/Premium ayrımı için B21) üzerine beş altyazı
değişti. `play/` altındaki üretilmiş kareler **eski altyazıyı taşıyor**; yüklemeden önce üç
set de yeniden üretilmeli (ham görüntüler değişmedi, yeni çekim gerekmiyor):

| Set | Kare | Eski | Yeni | Sebep |
|---|---|---|---|---|
| a-walk 05, b-exam 01, c-native 05 | `mock-list.png` | Her seviyede 12 tam deneme kâğıdı | Her seviyede 12 deneme sınavı: 1'i ücretsiz, tümü Premium'da | Ücretsizde seviye başına 1 kâğıt açık; kare premium hesapla çekildi |
| b-exam 02 | `mock-task.png` | Gerçek sınav görevi, gerçek süre | Sınav düzeninde görev, süre tutarak | "Gerçek sınav" resmî sınav materyali iması taşıyordu |
| c-native 06 | `walk.png` | Ekran kapalıyken bile çalışır | Ekran kapalıyken Cepte yürüyüş, Premium'da | Ekran kapalı çalışan yürüyüş (uygulamadaki adıyla Cepte yürüyüş) yalnız Premium'da |

```bash
for p in a-walk b-exam c-native; do
  python3 scripts/store-shots.py --plan docs/store/plan/$p.json --out docs/store/play/$p --store play
done
```

Yeni altyazıların üçü de mevcut punto aralığında en çok üç satıra sığıyor (betiğin kendi
`fit_caption` hesabıyla ölçüldü; Play'de 90–96 px). Değişmeyen on üç altyazıda marka,
fiyat ya da Premium'a bağlı bir iddia yok.
