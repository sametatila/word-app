# Google Play Console — hedef kitle, içerik derecelendirme, marka, yayıncı (Lernomi)

Console'a girilecek cevaplar. Vitrin metinleri (başlık, kısa ve tam açıklama), kareler ve metin
kuralları `docs/store/README.md`'de; App Store karşılığı `docs/appstore/listing.md`.

## 1. Hedef kitle ve içerik (Target audience and content)

| Soru | Cevap | Gerekçe |
|---|---|---|
| Hedef yaş grupları | **Yalnız 18 ve üzeri** | Kullanım şartları §3 hesap açmayı 18 yaşla sınırlıyor. 16–17 işaretlenmez: altında bir yaş grubu uygulamayı Aileler politikasına alır; açık uçlu yapay zekâ sohbeti ve sosyal katman orada ek gereklilik doğurur. İçerik de yetişkine dönük (CEFR A1–C1, sınav hazırlığı, iş ve hukuk dili) |
| Uygulama çocuklara çekici mi | **Hayır** | Maskot (mirket) ve oyunlaştırma var; listeleme yetişkin öğrenciye ve sınava odaklı |
| Aileler politikası | Kapsam dışı | Yapay zekâ sohbeti ve kullanıcı etkileşimi çocuk kitlesiyle bağdaşmaz |
| Beklenmeyen çocuk kullanıcı | Hesap ve veri silinir | Gizlilik politikası §12 |

Vitrinde "çocuk", "kids", "eğlenceli oyun" vurgusu yok. **Açık karar (denetim M15):** Samet'in
2026-09-25 görsel kararında öne çıkan grafik ve 1. kare maskotlu; "çocuklara çekici değil"
cevabıyla birlikte değerlendirilmesi gerekiyor. Karar verilince bu satır ve
`docs/store/README.md` birlikte güncellenir.

## 2. İçerik derecelendirme anketi (IARC)

Kategori: "Utility, Productivity, Communication, or Other" altında eğitim uygulaması (Play'in
anketinde eğitim seçeneği bu grupta).

| Soru | Cevap | Dayanak |
|---|---|---|
| Şiddet, cinsellik, kumar, kaba dil | Hayır | Ölçüm `docs/appstore/listing.md` §2.3. Kelime turundaki "Meydan okuma" doğru cevaba bağlı XP çarpanı, şans ve para yok |
| Alkol, tütün, uyuşturucu atfı | **Evet, seyrek** | yaklaşık 8.700 kelimenin 14'ü (`Bier`, `Wein`, `rauchen`, `Alkohol`, `Droge`…) |
| Kullanıcılar birbiriyle etkileşiyor mu | **Evet, sınırlı** | Haftalık sıralamada görünen ad; arkadaşlık, tepki, dürtme; özel mesajlaşma yok |
| Kullanıcı içeriği başkalarına görünüyor mu | Evet (görünen ad, kullanıcı adı) | Ad süzgeci, bildir/engelle, insan incelemesi |
| Kişisel bilgi / konum paylaşımı | Yalnız kullanıcı isterse görünen ad / konum yok | Konum izni yok |
| Dijital satın alma | **Evet** (abonelik) | `com.android.vending.BILLING` (react-native-purchases); Play abonelikleri ve `lernomi_default` offering kurulu |
| Reklam | Hayır | Reklam SDK'sı yok |
| Yapay zekâ ile etkileşim / üretilen içerik | **Evet** | Konuşma adımındaki sohbet ve değerlendirme; uygulama içi bildirme |
| Yarışma (contests) | **Evet, sürekli** | Haftalık lig: sıralama, yükselme/düşme, haftalık sıfırlama. Ödülsüz olması tanımı değiştirmiyor |

> **Karar (2026-09-09):** ürün ilk sürümden Premium'lu yayımlanıyor: abonelik bağlı, ücretsiz
> katman sınırları uygulanıyor, paywall erişilebilir; Premium süresini mağaza dışında yalnız
> promo kodu (kutusu web'de ve Android'de, iOS'ta yok) ve elle verilen süre açıyor (davet ödülü 2026-09-17'den beri Premium
> vermiyor, `src/lib/premium/referral.ts`). Beyanlar buna göre doldurulur; sonradan "satın alma
> da varmış" demek düzeltme değil yanlış beyan olur.

Alkol ve yarışma cevapları PEGI 3'ü yukarı çekebilir; App Store'da aynı cevaplar 13+ verdi ve
orada derece elle 18+'a yükseltildi. Play hedef kitlesi, App Store derecesi ve şartlar §3 aynı
sayıyı söylüyor (gerekçe `docs/appstore/listing.md` §2.4).

## 3. Vitrin kapsamı — metnin dayandığı ölçüm

### 3.0 Ölçüm (2026-09-26)

Hangi vitrinin hangi kursu anlattığı arayüz (anadil) diline bağlı; uygulama kimseye kendi dilini
öğretmiyor (`PAIR_READY` + `onboardingCoursesFor`, `mobile/src/lib/courses.ts`; web
`src/lib/courses.ts`).

| Vitrin | Arayüz dili | Sunulan kurs | Seviye | Konuşma | Beceri alıştırması | Deneme sınavı |
|---|---|---|---|---|---|---|
| tr-TR | Türkçe | Almanca | A1–C1 | 580 (A1 100 · A2 100 · B1 180 · B2 100 · C1 100) | 1.370 | 60 (seviye başına 12) |
| tr-TR | Türkçe | İngilizce | A1–C1 | 500 (seviye başına 100) | 1.250 | 60 (seviye başına 12) |
| en-US | İngilizce | Almanca | A1–C1 | 580 | 1.370 | 60 |
| de-DE | Almanca | İngilizce | A1–C1 | 500 | 1.250 | 60 |

- **Kaynaklar.** Konuşmalar `src/lib/conversations/content/` (mobilde
  `mobile/src/data/conversations/`); beceri alıştırmaları `src/lib/skills/content/` ve deneme
  sınavları `src/lib/mock-exams/{de,en}/` uygulamaya içerik hattıyla gidiyor (`skills/`, kilitli
  `papers/` paketleri). Her deneme sınavında okuma, dinleme, yazma, konuşma.
- **Anadil katmanı** "hep-ya-hiç": tek dize eksikse o içerik Türkçe kalır
  (`mobile/src/lib/nativeContent.ts`). 2026-09-14'te en ve de arayüzde bütün konuşma, alıştırma ve
  deneme sınavları çevrilmiş ölçüldü; sonra eklenen alıştırmaların çeviri kapsamı bu belgede
  yeniden ölçülmedi (`npm run report:native`).
- **Zürih Almancası vitrinde yok:** kurs duraklatılmış, yeni kullanıcıya sunulmuyor.
- **Ücretsiz/Premium ayrımı** `src/lib/premium/gates.ts` ve `docs/premium/README.md` §2; panelde
  sayı değişirse vitrin metni de değişir.
- **Fiyat metinde yok:** mağaza ülkeye göre gösteriyor.

Ölçümü yeniden almak (salt okuma; her pakette `*` ve `index` dizin kayıtları sayılmaz):

```bash
ssh lernomi "sudo -u postgres psql -d lernomi -c \"select split_part(ri.pack,'/',1) tur, split_part(split_part(ri.pack,'/',2),'-',1) kurs, count(*) filter (where ri.item not in ('*','index')) madde from content_release_items ri join content_releases r on r.version = ri.release where r.status = 'live' and split_part(ri.pack,'/',1) in ('conversations','skills','papers') group by 1,2 order by 1,2\""
```

## 4. Marka ve fikri mülkiyet

### 4.1 "Lernomi" ad sorgusu (2026-09-14)

Sorgular oturum açmadan, her kaynağın kendi arama ucuyla yapıldı; hukuki görüş değildir.

- **Mağazalar:** Google Play (ABD, TR, DE, GB vitrinleri) ve App Store (iTunes Search API; us, gb,
  tr, de, at, ch, fr, nl) "Lernomi" adlı uygulama döndürmedi. Play'deki tek yakın sonuç
  "Nomi: AI Companion" (farklı ad).
- **Marka veritabanları:** TMview (EUIPO, TÜRKPATENT, WIPO Madrid, DE, CH, GB, AT) ve USPTO'da
  "LERNOMI" tam eşleşmesi yok. Yakın yazımlar var: LERNMI (İspanya, sınıf 41, tescilli), LEOMI
  (ABD, 9/41/42), LERNi (AB, 16/19/28/41), SELLERNOMICS, LEARNOMATION.
- **Erişilemeyenler:** WIPO Global Brand Database ve TÜRKPATENT'in kendi ekranı (captcha);
  sesçe benzerlik taraması yapılmadı.
- **Alan ve şirket adları:** `lernomi` başlıca uzantılarda kayıtsız (yalnız `lernomi.app` bizim);
  North Data'da sona ermiş "Lernomi Holdings Ltd." (Kıbrıs). Aynı pazarda yakın adlı ürün: Lerni.

**Öneri (hukuki görüş değil):** reklam harcamasından önce profesyonel marka araştırması ve
TÜRKPATENT/EUIPO'da 9, 41, 42. sınıflarda başvurunun değerlendirilmesi.

### 4.2 Sınav markaları — karar (2026-09-14)

**Karar:** mağaza metinlerinde (başlık, altyazı, açıklamalar, tanıtım metni, sürüm notu), App
Store anahtar kelimelerinde ve görsel altyazılarında **hiçbir sınav markası geçmez** (telc,
Goethe, ÖSD, TestDaF, DSH, IELTS, TOEFL, Cambridge, YDS/YÖKDİL örnektir; kural "hiçbir sınav
kurumunun ya da sınavın adı").

1. **Uygulamada marka yok.** Deneme sınavlarını Lernomi yazdı; içerik kapısı markayı
   yasaklıyor (`scripts/check-mock-exams.ts` › `BRANDS`). Vitrinde anmak uygulamada karşılığı
   olmayan bir bağ kurar (App Store 2.3.1).
2. **Mağaza kuralları.** Apple 2.3.7 (ad, altyazı, anahtar kelimede başkasının terimi), 5.2.1,
   4.1(c); Play kurumla bağlantı ya da onay iması taşıyan kullanımı taklit politikasında
   değerlendirebiliyor.
3. **Bedeli küçük.** Yerine "CEFR seviyelerine göre deneme sınavları" gibi tanımlayıcılar.

Bağlantısızlık marka anmadan söyleniyor: "Deneme sınavlarını Lernomi hazırladı; Lernomi hiçbir
sınav kurumuyla bağlantılı değildir, belgeler resmî bir sertifika yerine geçmez."

### 4.3 Maskot ve içerik kaynakları

Maskot (mirket) özgün; çiziminin sahibi ve kelime sıklık listesinin kaynağı henüz yazılı değil
(denetim İ8).

## 5. Geliştirici hesabı — şirketsiz gerçek kişi

Play hesabının sahibi, mağazada görünen geliştirici (görünen ad **RumpusKit**), hizmet sağlayıcı
ve gizlilik politikasındaki **veri sorumlusu** aynı kişi: **Musa Atila** (Tufanbeyli, Adana,
Türkiye). **Samet Atila** (Dortmund) yalnız **GDPR m.27 AB temsilcisi**: veri sorumlusu AB'de
yerleşik olmadığı için; politika §1 ve künyede yazılı. Kimlik değerleri `src/lib/legal/index.ts`
› `LEGAL_ENTITY` (`provider*` ve `euRepresentative*`).

**DSA.** Play Console'da ayrı bir tüccar beyanı formu **yok** (Ayarlar › Geliştirici hesabı
2026-09-24'te incelendi); Play bilgiyi hesap doğrulamasından alıyor: yasal ad ve adres
doğrulanmış (Musa Atila), herkese açık geliştirici e-postası `info@rumpuskit.com`. Uygulamaya
özel iletişim (`support@lernomi.app`, `www.lernomi.app`) Mağaza ayarlarında. App Store'da DSA
beyanı ayrı ve aktif (denetim LEG-4).

Hesap **bireysel**: tüzel kişi ve D-U-N-S yok. Sonuçları:

| Konu | Sonuç |
|---|---|
| Kimlik doğrulama | Play'in doğruladığı ad, adres, telefon, e-posta `LEGAL_ENTITY.provider*` ile aynı olmalı; AB temsilcisininkiyle değil |
| Adresin görünürlüğü | Bireysel hesapta doğrulanmış ad ve adres AB kullanıcılarına mağaza sayfasında görünür; değiştirmek yeniden doğrulama demek |
| Destek e-postası | Listelemede zorunlu ve herkese açık; `LEGAL_ENTITY.supportEmail` ile aynı |
| Kapalı test kapısı | Kişisel hesaplar üretimden önce belirli sayıda testçiyle kesintisiz kapalı test ister (bugün 12 testçi × 14 gün; güncel değer Console'da). Durum denetim M7 |

Metinlerde şirket varsayılmıyor: ticaret sicil/MERSİS alanı yok, yerine vergi dairesi; KEP boşsa
metinlerden düşüyor; satış belgesini Google düzenlediği için şartlar fatura vaat etmiyor. Vergi
tarafı (istisna koşulları, banka, hasılat sınırı) mali müşavirle doğrulanır.
