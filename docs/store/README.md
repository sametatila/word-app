# Mağaza vitrin kareleri

Mağazaya yüklenen ekran görüntüleri burada üretiliyor. Üç parça var:

| Klasör | Ne | Depoda mı |
|---|---|---|
| `raw/` | Cihazdan alınmış ham ekran görüntüleri (1080×2266, durum ve gezinme çubukları kırpılmış) | **Evet** — yeniden üretilemez, cihaz ve giriş yapılmış hesap ister |
| `plan/` | Hangi ham görüntüye hangi altyazı, hangi sırayla | **Evet** |
| `play/`, `appstore/` | Üretilen kareler | Hayır — `.gitignore`'da, tek komutla yeniden üretilir |

## Vitrin kararları (2026-09-25) — GEÇERLİ OLAN BU

Samet'le soru-cevapla verildi. `plan/*.json` (a-walk, b-exam, c-native) ve
`docs/appstore/listing.md` §4'teki eski sıra **onaylanmamış referanslardır**; çelişirse bu
bölüm geçerli. Kareler henüz ÇEKİLMEDİ: önce tasarım çalışması yapılacak (Samet), çekim bu
tanıma göre olacak. Karar değişirse bu bölüm güncellenir, yeni belge açılmaz.

**Konumlandırma.** Lernomi bir *dil* uygulaması; Almanca ilk ve en güçlü kurs (vitrin adı
"Almanca Öğren A1-C1" ASO için), İngilizce ikinci planda ama açıklamada anılır: "tek dil
uygulaması" izlenimi verilmez. Ana vaat **gerçek dil eğitimi** (tam müfredat, konuşarak,
Türkçe anlatım); sınav bu eğitimin sonucu olarak ikinci katman. Sınava hazırlanan kitle
(tarihi olan öğrenci) ayrıca WhatsApp/Telegram grup kampanyasıyla (2 ay) hedefleniyor;
kampanya vitrinde YOK (görselde fiyat/süreli teklif olmaz), grup sayfasında.

**Altyazı / tek cümle:** **"Konuş, anla, sınava hazırlan"** (tr, 28 karakter; iOS subtitle,
Play kısa açıklamanın ilk cümlesi). en-US: **"Speak, understand, ace exams"** (28) ·
de-DE: **"Sprechen, verstehen, bestehen"** (29).

**Play kısa açıklaması (tr, 70):** "Konuş, anla, sınava hazırlan: A1'den C1'e Almanca, Türkçe
anlatımla." (iOS altyazısıyla aynı cümleyle başlar.)

**Sayılar (2026-09-25, Samet):** birim KELİME + ALIŞTIRMA + DENEME SINAVI; adım/ünite sayısı
anılmaz. Yuvarlak ve doğru: Almanca "8.500'den fazla kelime, 900'den fazla alıştırma, **50'den fazla
deneme sınavı**" (Samet: içerik artacak, "60" ve seviye başına kesin sayı "her seviyede 12" YAZILMAZ) (ölçüm: 8.707 kelime, beceri alıştırması canlıda 1.120, repo sayımı 995; 60 deneme
sınavı); İngilizce "7.000'den fazla kelime, 900'den fazla alıştırma, 50'den fazla deneme sınavı" (7.175 /
1.034 canlı, 939 repo / 60). İçerik azalırsa bu cümleler gözden geçirilir.

**Konuşma adımının vitrindeki anlatımı (Samet'in seçtiği metin):** "Doktorda, iş
görüşmesinde, yol sorarken… Gerçek hayatta karşına çıkacak durumları yapay zekâ karakteriyle
konuşarak çalışırsın. Hatanı hemen düzeltir, takıldığında ne diyebileceğini önerir." Ücretsizde
seviye başına sınırlı olduğu için "ücretsiz ve sınırsız" denmez.

**Açıklama metni kararları (2026-09-25):** her iddia koda, canlı ayara ve içeriğe göre
doğrulanır, gerekirse metin değişir (Samet'in kuralı). Doğrulanmış tr taslağı ve 32
satırlık kanıt tablosu oturum çıktısında; kararlar:
- Deneme süresi açıkça: "yeni abonelere ilk ay ücretsiz" (iki mağazada 175 bölgede FREE_TRIAL
  1 ay, ASC ve Play'den okundu; yalnız daha önce abone olmamışa).
- "8.500'den fazla kelime" (Almanca 8.707; İngilizce "7.000'den fazla", 7.175).
- "HESAPSIZ BAŞLA" paragrafı kalıyor (hesapsız başlama, ilerlemenin hesaba taşınması, aynı
  hesap telefon/tablet/web, hesap isteyen özellikler).
- Ücretsiz haklar "bitir + seri" mekaniğiyle somut anlatılır (2026-09-25 kararı, kod varsayılanı:
  seviye başına Patika 2 Konuşma + 2 Yazma, Beceriler 2 konuşma + 2 yazma, 1 deneme sınavı;
  açık olanları bitirip 7 günlük seri yapınca +2 / deneme +1, sonra her 7 günlük seride
  yeniden; kademe tavanı yok; haftalık yenilenen hak KALKTI). Panelde sayı değişirse metin de.
- Düzeltilen yanlış/yanıltıcı iddialar: sohbet "daha doğal söyleyiş önermez" (yalnız dil
  bilgisi düzeltir + takılınca 3 öneri; `src/lib/conversations/chat.ts` üslup kuralı); Premium'da
  da deneme sınavları üçerli paketlerle sırayla açılır (`computePacks`); deneme sınavında
  sonuç tek yüzde + hata→düzeltme (ölçüt çubukları yalnız beceri turu ve modül sınavında);
  aralıklı tekrar SM-2 türevi ("unutmadan önce", "tam unutmak üzereyken" DEĞİL); kulaklık
  zorunlu değil. Metinde Android/Google Play adı geçmez (App Store 2.3.10).
- KARAR VERİLDİ (2026-09-25, `docs/premium/README.md` §2): konuşmanın yapay zekâ sohbeti artık
  Patika'nın **Konuşma** adımı ve ücretsizde seviye başına 2 + "bitir + seri"; hak yoksa adım
  kilitli ve Premium ister. Misafir ve yapay zekâ iznini reddeden senaryolu konuşmayla devam
  eder (maliyetsiz). Premium tavanı 300 mesaj/gün KALIYOR. Metin sohbeti "ücretsiz ve
  sınırsız" diye anmaz.

**Beş sütun (öncelik sırası):** 1) **A1'den C1'e adım adım**, Türkçe anlatım ("müfredat" ve "tam" kullanılmaz) · 2) konuşarak
öğren: gerçek hayattan durumlarda yapay zekâ karakteriyle sohbet + konuşmaya geri bildirim · 3) dört becerili deneme sınavları,
konuşma ve yazma da puanlanır · 4) Cepte yürüyüş (ekran kapalı, **Premium**; ekran açık
yürüyüş ücretsizde günde 3 tur, `plan.free_walk`) · 5) günlük kelime turu ve seri.

**Kare listesi (iPhone 6.9" ve Play telefon, bu sırayla; ilk üçü aramada görünür):**

| # | Sütun | Ekran | İçerik durumu (çekimde hazırlanacak) | Altyazı taslağı |
|---|---|---|---|---|
| 1 | A1'den C1'e adım adım | Patika: A1→C1 ünite haritası (Okuma, Dinleme, Konuşma, Yazma, Dil bilgisi, Quiz, Sınav) | B1'de ilerleyen hesap; A1–A2 tamamlanmış görünür | A1'den C1'e adım adım, Türkçe anlatımla |
| 2 | Konuşma | Patika › Konuşma adımı: sahne sohbeti | Gerçek bir sahne (ör. B1 doktor randevusu); kullanıcının cümlesi ve düzeltmesi görünür; yapay zekâ bildirimi görünür | Konuş, düzeltmeni anında gör |
| 3 | Sınav | Deneme sınavı sonucu | B1 deneme sınavı: genel yüzde, bölüm sonuçları ve yazma/konuşma için hata→düzeltme listesi (ölçüt çubuğu YOK; deneme sınavında öyle bir ekran yok) | Konuşma ve yazma da puanlanır |
| 4 | Fark | Cepte yürüyüş + kilit ekranı | Ekran kapalı akış; kilit ekranında "Yürüyüş modu açık" | Ekran kapalı, yolda çalış · Premium |
| 5 | Alışkanlık | Günlük kelime turu | Sesli tur, kalan kelime sayısı | Her gün, unutmadan önce |
| 6 | Beceriler | Beceri kütüphanesi | Beş beceri kartı | Okuma, dinleme, yazma, konuşma, dil bilgisi |

**iPad 13" (yatay, 4 kare):** 1, 2, 3 ve 6 (tablet içerik kolonu en iyi bu ekranlarda).

**Kurallar (değişmedi):** her vitrin kendi dilinde çekilir (tr-TR: Türkçe arayüz + Almanca
kurs; en-US: İngilizce arayüz + Almanca kurs; de-DE: Almanca arayüz + İngilizce kurs);
gerçek hesap, yer tutucu veri yok; sınav markası yok; Premium özellik altyazıda "Premium"
der (2.3.2). Aşağıdaki "Kurallar" bölümü de geçerli.

**Görsel kararlar (2026-09-25, Samet):**
- Play öne çıkan grafik (1024×500): mirket maskot + "Konuş, anla, sınava hazırlan", marka
  renklerinde, az yazı.
- Maskot ekran görüntülerinde YALNIZ 1. karede (Patika), küçük bir vurgu olarak; öteki kareler
  yalnız uygulama ekranı + altyazı.
- App Store tanıtım videosu (App Preview) GÖNDERİLECEK ama şimdi değil (Cepte yürüyüş + Konuşma,
  gerçek cihazda; aynı çekim Play ön plan servisi beyanı videosu için de kullanılabilir, AND-3).

**Açık (sonraki soru-cevap):** tam açıklama metinleri (tr/en/de), yeni kurallara göre yeniden
doğrulanacak.

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
  deneme sınavlarını Lernomi kendisi yazdı.
- **Premium gerektiren özellik anılıyorsa altyazıda "Premium" yazar** (App Store 2.3.2, Play
  yanıltıcı meta veri). Karedeki ekran premium hesapla çekildiği için kilitsiz görünüyor;
  ücretsiz kapsamı altyazı söylemek zorunda. Ücretsiz/Premium ayrımının kaynağı
  `src/lib/premium/gates.ts`; "1'i ücretsiz" sayısı `free.mockExamsPerLevel` ve panelde
  değişirse altyazı da değişir.
- **Her yerelleştirme kendi dilinde** kare ister. Üç arayüz dilinin üçü de açık
  (`PAIR_READY`: tr, en, de — `mobile/src/lib/courses.ts`), ama bugün yalnız Türkçe kare seti
  var: en-US ve de-DE için ham görüntüler o arayüz diliyle yeniden çekilmeli. Betik karenin
  üstündeki "ADIM n / N" etiketini sabit Türkçe basıyor (`scripts/store-shots.py`); öteki
  diller için o etiket de yerelleştirilmeli.
- **iOS kareleri iOS'tan alınır.** Android karesini App Store'a yüklemek 2.3.3 ihlalidir;
  `--store ios` yalnız yerleşim provası için.

## Altyazı değişikliği (2026-09-14)

Mağaza ön inceleme raporu (B25, B26; ücretsiz/Premium ayrımı için B21) üzerine beş altyazı
değişti. `play/` depoda değil, her makinede yerelde üretiliyor: bu tarihten önce üretilmiş
kareler eski altyazıyı taşır ve yüklemeden önce üç set de yeniden üretilmeli (ham görüntüler
değişmedi, yeni çekim gerekmiyor). Komut 2026-09-15'te koşuldu: yalnız bu beş kare değişti,
farkı yalnız altyazı bölgesinde; öteki on üç kare önceki üretimle bayt bayt aynı çıktı.

| Set | Kare | Eski | Yeni | Sebep |
|---|---|---|---|---|
| a-walk 05, b-exam 01, c-native 05 | `mock-list.png` | Her seviyede 12 tam deneme sınavı | Her seviyede 12 deneme sınavı: 1'i ücretsiz, tümü Premium'da | Ücretsizde seviye başına 1 deneme sınavı açık; kare premium hesapla çekildi |
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
