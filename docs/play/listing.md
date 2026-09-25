# Google Play Console — hedef kitle, içerik derecelendirme ve mağaza listesi (Lernomi)

Console'a girilecek cevaplar ve metinler. Kimlik alanları ve alan adı 2026-09-10'da
kesinleşti ve dolduruldu; geriye yalnız inceleme hesabının kimliği kaldı
(`[[TEST_HESABI_*]]`, bkz. `docs/play/console.md`). Kaynak: uygulamadaki gerçek içerik ve özellikler;
rakip adı, sınav markası, uygulamada olmayan özellik ve abartılı iddia yok (Play "metadata" politikası).

## 1. Hedef kitle ve içerik (Target audience and content)

| Soru | Cevap | Gerekçe |
|---|---|---|
| Hedef yaş grupları | **Yalnız 18 ve üzeri** | Kullanım şartları §3 hesap açmayı 18 yaşla sınırlıyor. 16–17 işaretlenmemeli: altında bir yaş grubu seçmek uygulamayı Aileler politikası kapsamına alır ve açık uçlu yapay zekâ sohbeti ile serbest metinli sosyal katman o kapsamda ek gereklilik doğurur. İçerik de yetişkine dönük: CEFR A1–C1, sınav hazırlığı, "Hukuk ve sözleşme dili", "Para ve kariyer" |
| Uygulama çocuklara çekici mi | **Hayır** | Maskot (mirket) ve oyunlaştırma var ama listeleme yetişkin öğrenciye ve sınava odaklı; mağaza görsellerinde maskot ana unsur olmayacak |
| Aileler politikası | Kapsam dışı | Yapay zekâ sohbeti ve kullanıcı etkileşimi çocuk kitlesiyle bağdaşmaz |
| Beklenmeyen çocuk kullanıcı | Hesap ve veri silinir | Gizlilik politikası §12 |

Listeleme kuralı: ekran görüntülerinde ve açıklamada "çocuk", "kids", "eğlenceli oyun"
vurgusu yok; maskot yalnız uygulama içinde.

## 2. İçerik derecelendirme anketi (IARC)

Kategori: **Eğitim / Referans** değil, "Utility, Productivity, Communication, or Other" altında
eğitim uygulaması olarak doldurulur (Play'in anketinde eğitim seçeneği bu grupta).

| Soru | Cevap | Dayanak |
|---|---|---|
| Şiddet, cinsellik, kumar, kaba dil içeriği | Hayır | ÖLÇÜLDÜ (2026-09-10): cinsellik ve şiddet tasviri sıfır; `Gewalt` yalnız B1 hırsızlık ünitesinde kelime maddesi, silah geçişleri mecaz. Kumar yok: kelime turundaki "Meydan okuma" doğru cevaba bağlı bir XP çarpanı, şans ve para içermiyor; eski adı "Bahis" 2026-09-15'te değişti ve `check:age-rating` arayüzü de tarıyor |
| Alkol, tütün, uyuşturucu ATFI | **Evet, seyrek** | 8.707 kelimenin 14'ü: `Bier`, `Wein`, `rauchen`, `Zigarette` (A1), `Alkohol`, `Kneipe`, `Droge` (B1). IARC bu soruyu ayrı soruyor; App Store'da aynı cevap dereceyi 4+'tan 13+'a çekti |
| Kullanıcılar birbiriyle etkileşiyor mu | **Evet, sınırlı** | Haftalık sıralamada görünen ad; arkadaşlık, tepki, dürtme; özel mesajlaşma yok |
| Kullanıcı üretimi içerik başkalarına görünüyor mu | Evet (görünen ad, kullanıcı adı; biyografi 2026-09-16'da kaldırıldı) | Moderasyon: ad filtresi, bildir/engelle, insan incelemesi |
| Kişisel bilgi paylaşımı | Kullanıcı isterse görünen ad | Konum paylaşımı yok |
| Konum paylaşımı | Hayır | Konum izni yok |
| Dijital satın alma | **Evet** (abonelik) | Manifest zaten `com.android.vending.BILLING` taşıyor (react-native-purchases) ve premium ürünün parçası; bkz. aşağıdaki karar |
| Reklam | Hayır | Reklam SDK'sı yok |
| Yapay zekâ ile etkileşim / üretilen içerik | **Evet** | Konuşma adımındaki yapay zekâ sohbeti ve değerlendirme; uygulama içi bildirme |
| Yarışma (contests) | **Evet, sürekli** | Haftalık lig: küme başına sıralama, yükselme/düşme, haftalık sıfırlama. "Ödülsüz" olması tanımı değiştirmiyor — App Store anketinde ilk taslak bu yüzden yanlıştı, bkz. `docs/appstore/listing.md` §2.3 |


> **Karar (2026-09-09):** premium ilk sürümde AÇIK sayılıyor. Abonelik satın alma
> artık bağlı (2026-09-23: RevenueCat iki platformda kurulu, Play abonelikleri ve
> `lernomi_default` offering hazır) ve ürün premium'lu bir ürün olarak yayımlanıyor:
> ücretsiz katmanın sınırları uygulanıyor, paywall erişilebilir, promo kodu ve davet
> ödülü bugün gerçek premium veriyor. Beyanlar buna göre doldurulur — sonradan
> "aslında satın alma da varmış" demek, mağaza gözünde beyanın düzeltilmesi değil
> YANLIŞ BEYAN olur.

Beklenen sonuç: alkol/tütün atfı ve yarışma cevapları PEGI 3'ü yukarı çekecek —
App Store'da aynı cevaplar 13+ verdi. **Hedef kitle 18+ olarak kalıyor** ve App Store
derecesi de 2026-09-10'da elle 18+'a yükseltildi; üç beyan (Play hedef kitlesi,
App Store derecesi, şartlar §3) artık aynı sayıyı söylüyor. Gerekçe:
`docs/appstore/listing.md` §2.4.

## 3. Mağaza listesi

> **2026-09-14'te baştan yazıldı** (mağaza ön inceleme raporu B25, B26, B28). Eski metin
> yalnız Türkçeydi, İngilizce kursunu "da mevcut" diye geçiştiriyordu, deneme sınavlarını
> "Lesen ve Hören alıştırmaları" diye küçültüyordu, bir sınav markası taşıyordu ve
> kelime listelerine "resmî" diyordu. Aşağıdaki her kapsam cümlesi §3.0'daki ölçümden
> geliyor: ölçüm değişirse önce tablo, sonra üç dildeki metin değişir.

### 3.0 Vitrin kapsamı — metnin dayandığı ölçüm (2026-09-14)

Hangi vitrinin hangi kursu anlatacağı kullanıcının **arayüz (anadil) diline** bağlı. Uygulama
kursu bu dile göre sunuyor ve kimseye kendi dilini öğretmiyor: `PAIR_READY` +
`onboardingCoursesFor` (`mobile/src/lib/courses.ts`; web'de aynı liste `src/lib/courses.ts`).

| Vitrin | Arayüz dili | İlk açılışta sunulan kurs | Seviye | Konuşma | Beceri alıştırması | Deneme sınavı |
|---|---|---|---|---|---|---|
| tr-TR | Türkçe | Almanca | A1–C1 | 580 (A1 100 · A2 100 · B1 180 · B2 100 · C1 100) | 995 | 60 (seviye başına 12) |
| tr-TR | Türkçe | İngilizce | A1–C1 | 500 (seviye başına 100) | 939 | 60 (seviye başına 12) |
| en-US | İngilizce | Almanca | A1–C1 | 580 | 995 | 60 |
| de-DE | Almanca | İngilizce | A1–C1 | 500 | 939 | 60 |

- **Kaynaklar.** Konuşmalar `mobile/src/data/conversations/{de,en}-{a1..c1}.json` (web:
  `src/lib/conversations/content/`); beceri alıştırmaları `mobile/src/data/skills/exercises.json` ve
  `exercises-en.json` (okuma, dinleme, yazma Patika'ya bağlı; kütüphanede beş beceri: okuma,
  dinleme, yazma, konuşma, dil bilgisi); deneme sınavları `mobile/src/data/exams/papers.json`
  ve `papers-en.json` (web: `src/lib/mock-exams/{de,en}/`). Her deneme sınavında dört bölüm var: okuma,
  dinleme, yazma, konuşma. Her iki kursun her Konuşma adımında bir sohbet sahnesi var.
- **Anadil katmanı da ölçüldü.** İngilizce ve Almanca arayüzde içerik "hep-ya-hiç" kuralıyla
  çevriliyor: tek dize eksikse o konuşma Türkçe kalır (`mobile/src/lib/nativeContent.ts`).
  Paketteki sözlüklerle (`mobile/src/data/native/en.json`, `de.json`) çözücüler kayıt kayıt
  koşuldu: İngilizce arayüzde Almanca kursun 580 konuşması, 995 alıştırması ve 60 deneme sınavı;
  Almanca arayüzde İngilizce kursun 500 konuşması, 939 alıştırması ve 60 deneme sınavı eksiksiz
  çevrildi. Yani en-US ve de-DE vitrinin anlattığı içerik o arayüzde gerçekten açılıyor.
- **Zürih Almancası (`gsw-zh`) vitrinde yok, bilerek.** Kurs duraklatılmış: ilk açılışta
  sunulmuyor (`offeredToNewUsers: false`), yalnız Türkçe arayüzde Ayarlar'dan seçilebiliyor
  ve kendi konuşma paketi yok (Almanca konuşmalara düşüyor). Vitrinde anmak, yeni kullanıcının
  seçemeyeceği bir kursu vaat etmek olurdu.
- **Premium ayrımı** `src/lib/premium/gates.ts` (`DEFAULT_PREMIUM_CONFIG`, `describeLimits`)
  ve `docs/premium/README.md` §2'den (2026-09-25 kararları; üretimde panel kaydı yok, kod
  varsayılanı geçerli): ücretsizde kelime çalışma, pratik, okuma, dinleme, dil bilgisi ve
  quiz sınırsız; yürüyüş modu ekran açıkken günde 3 tur; seviye başına 1 deneme sınavı,
  Patika'da 2 Konuşma + 2 Yazma adımı, Beceriler'de 2 konuşma + 2 yazma değerlendirmesi;
  "bitir + 7 günlük seri" ile +2 (deneme sınavında +1). Premium'da ekran kapalı yürüyüş,
  tüm deneme sınavları (üçerli paketler, paketi bitirince sonraki), seri beklemeden bütün Konuşma
  ve Yazma; kötüye kullanımı önleyen günlük üst sınır. "Sınırsız" Premium için denmiyor
  (şartlar §7a). Metin sayı olarak 3 tur, 1 deneme sınavı, 2+2 hak, +2/+1 ve 7 gün
  diyor; panelde (`/admin/premium`) bu değerler değişirse üç dildeki "Ücretsiz ve Premium"
  paragrafı, yürüyüş paragrafı ve deneme sınavı altyazısı (`docs/store/plan/*.json`) da
  değişir. Premium'un sınır sayıları metinde yok, "güncel sınırlar Premium ekranında"
  cümlesiyle uygulamaya bağlanıyor.
- **Fiyat yok.** Fiyatı mağaza ülkeye göre kendisi gösteriyor; metin yalnız aylık ya da
  yıllık, otomatik yenilenen abonelik olduğunu ve fiyatın satın almadan önce gösterildiğini
  söylüyor.

Ölçümü yeniden almak (salt okuma):

```bash
python3 - <<'PY'
import json
for c, sinav, alistirma in [("de", "papers.json", "exercises.json"), ("en", "papers-en.json", "exercises-en.json")]:
    konusma = sum(len(json.load(open(f"mobile/src/data/conversations/{c}-{l}.json"))) for l in ["a1", "a2", "b1", "b2", "c1"])
    print(c, "konuşma", konusma,
          "alıştırma", len(json.load(open(f"mobile/src/data/skills/{alistirma}"))),
          "deneme sınavı", len(json.load(open(f"mobile/src/data/exams/{sinav}"))))
PY
```

**Yazım kuralı.** Tam açıklamada paragraflar tek satır: Console'a yapıştırınca satır ortasında
kırılma olmasın. Sayımlara satır sonları dahil.

### 3.1 Türkçe (tr-TR) — varsayılan dil

> **2026-09-25:** geçerli ve doğrulanmış Türkçe uzun açıklama `docs/store/README.md` › "Onaylanan Türkçe uzun açıklama". Aşağıdaki metin eski kurallara göre yazılmıştı; kullanılmaz.

**Başlık** (en çok 30 karakter)

```
Lernomi: Almanca Öğren A1-C1
```
_28/30 karakter._

**Karar (Samet, 2026-09-23):** uygulama adı (cihazda) **Lernomi**, mağaza adı **Lernomi: Almanca Öğren A1-C1**,
App Store ile aynı. İngilizce kurs kısa ve tam açıklamada anılıyor.
Eski gerekçe ("Lernomi Play'de başka bir uygulamayla çakışıyor") 2026-09-14 sorgusunda
doğrulanmadı, bkz. §4.1.

**Kısa açıklama** (en çok 80 karakter)

```
A1'den C1'e konuşmalar, deneme sınavları ve yürürken sesli kelime pratiği.
```
_71/80 karakter._

**Tam açıklama** (en çok 4000 karakter)

```
Lernomi ile Almanca ya da İngilizce öğren: kısa kelime turları, Patika'da bir yapay zekâ karakteriyle konuşarak ilerleyen Konuşma adımları, beceri alıştırmaları ve CEFR seviyelerine göre deneme sınavları. Anlatım ve yönergeler Türkçe.

KURSLAR
• Almanca: A1'den C1'e 580 konuşma
• İngilizce: A1'den C1'e 500 konuşma
İki kursta da her seviyede beceri alıştırmaları ve 12 deneme sınavı var. Başlangıç seviyeni kendin seçebilir ya da kısa bir seviye testiyle bulabilirsin.

KELİME TURLARI
Aralıklı tekrar, her kelimeyi unutmak üzereyken yeniden önüne getirir. Anlamını seç, duyduğunu tanı, yazarak hatırla, eşleştir, cümle kur, çevir. Almanca kursunda artikel ve çoğul turları da var.

YÜRÜYÜŞ MODU
Kulaklığı tak, ekrana bakmadan çalış: ipucunu Türkçe duyarsın, karşılığını öğrendiğin dilde sesli söylersin. Ekran açıkken günde 3 tur ücretsizdir. Ekran kapalıyken ya da telefon cebindeyken çalışan Cepte yürüyüş Premium'a dahildir.

PATİKA: KONUŞMA ADIMLARI
Her Konuşma adımı Türkçe kısa bir anlatımla başlar, sonra bir sahnede konuşursun: kafede sipariş, doktor randevusu, iş görüşmesi. Karşındaki gerçek bir kişi değil, bir yapay zekâdır; uygulama bunu ekranda söyler ve yanıtlarını uygulamadan çıkmadan bildirebilirsin.

BECERİLER
Okuma, dinleme, yazma, konuşma ve dil bilgisi alıştırmaları. İznin varsa yazdıklarını ve söylediklerini yapay zekâ değerlendirir; neyi neden düzeltmen gerektiğini görürsün. "Neler yapabilirim" ekranı hangi becerileri kanıtladığını gösterir.

DENEME SINAVLARI
Her seviyede 12 deneme sınavı; her birinde okuma, dinleme, yazma ve konuşma bölümleri ve bölüm başına süre var. Okuma ve dinleme otomatik puanlanır; yazma ve konuşma cevaplarını iznin varsa yapay zekâ değerlendirir, ölçütler ve örnek cevap da gösterilir. Haftalık quiz öğrendiklerini düzenli olarak ölçer: on soru, beş yetkinlik, her yanlıştan sonra açıklama. Ücretsizdir. Deneme sınavları Lernomi'nin hazırladığı alıştırmalardır; hiçbir sınav kurumuyla bağlantılı değildir ve resmî bir sertifika yerine geçmez.

ÜCRETSİZ VE PREMIUM
Kelime çalışma, pratik, okuma, dinleme, dil bilgisi ve quiz ücretsiz ve sınırsızdır; haftalık quiz haftada birdir. Yürüyüş modu ücretsizde ekran açıkken günde 3 turdur. Ücretsiz sürümde ayrıca her seviyede 1 deneme sınavı, Patika'da seviye başına 2 Konuşma ve 2 Yazma adımı, Beceriler'de seviye başına 2 konuşma ve 2 yazma değerlendirmesi var. Açık olanları bitirip 7 günlük seri yapınca yenileri açılır (Patika ve Beceriler'de +2, deneme sınavında +1), sonra her 7 günlük seride yeniden. Premium: ekran kapalıyken de çalışan Cepte yürüyüş ve günlük tur beklemeden yürüyüş modu, tüm deneme sınavları, Patika'daki tüm Konuşma ve Yazma adımları ve Beceriler'de konuşma ve yazma değerlendirmesi, seri ya da bitirme beklemeden. Deneme sınavları üçerli paketler hâlinde sırayla açılır: paketteki üç deneme sınavını bitirince sonraki paket açılır. Premium'da da kötüye kullanımı önleyen günlük üst sınırlar vardır; güncel sınırlar uygulamadaki Premium ekranında yazar.
Premium, aylık ya da yıllık olarak otomatik yenilenen bir aboneliktir. Fiyat ve varsa ücretsiz deneme süresi satın almadan önce uygulamada gösterilir. Aboneliğini Google Play hesabından yönetebilir ya da iptal edebilirsin.

ARKADAŞLARINLA
Haftalık lig ve sıralama, arkadaş ekleme, tepkiler ve bir arkadaşınla haftalık ortak görev. Özel mesajlaşma yoktur. Görünen ad ve kullanıcı adı süzgeçten geçer; diğer kullanıcıları bildirebilir ve engelleyebilirsin.

GİZLİLİK
Reklam yok, reklam amaçlı izleme yok, veri satışı yok. Mikrofon yalnız konuşarak cevap verdiğinde açılır; sesin sunucuya yalnız izninle gönderilir ve kayıt saklanmaz. Yapay zekâya bir şey gönderilmeden önce iznin istenir. Hesabını uygulamanın içinden silebilirsin.

DİLLER
Arayüz Türkçe, İngilizce ve Almanca. Türkçe arayüzde Almanca ve İngilizce, İngilizce arayüzde Almanca, Almanca arayüzde İngilizce kursu sunulur.

Gizlilik politikası: https://www.lernomi.app/privacy
Kullanım şartları: https://www.lernomi.app/terms
```
_3598/4000 karakter._

**Sürüm notları** (en çok 500 karakter)

```
İlk sürüm.
```
_10/500 karakter._

### 3.2 İngilizce (en-US)

İngilizce arayüzde yalnız Almanca kursu sunuluyor; ad ve metin yalnız onu anlatıyor.
Çevirisi girilmeyen dilde Play varsayılan (Türkçe) listelemeyi gösterir; o metin bu
kullanıcıya açılmayan İngilizce kursunu da anlattığı için en-US ve de-DE listelemeleri
yayından önce girilmeli.

**Başlık**

```
Lernomi: Learn German A1-C1
```
_27/30 karakter._

**Kısa açıklama**

```
German from A1 to C1: conversations, mock exams and word practice while you walk.
```
_75/80 karakter._

**Tam açıklama**

```
Learn German with Lernomi: short vocabulary rounds, Speaking steps on the Path where you talk with an AI character, skill exercises and mock exams organized by CEFR level. Explanations and instructions are in English.

THE GERMAN COURSE
580 conversations from A1 to C1, skill exercises at every level and 12 mock exams per level. Choose your starting level yourself or find it with a short placement test.

VOCABULARY ROUNDS
Spaced repetition brings each word back just before you would forget it. Choose the meaning, recognize what you hear, type from memory, match, build and translate sentences, and practice German articles and plurals.

WALK MODE
Put your headphones on and study without looking at the screen: you hear a prompt in English and say the German out loud. Walk mode is free with the screen on, 3 rounds a day. Pocket Walking, which keeps it running with the screen off or with your phone in your pocket, is part of Premium.

THE PATH: SPEAKING STEPS
Each Speaking step starts with a short explanation, then you talk your way through a scene: ordering in a café, a doctor's appointment, a job interview. Your partner is an AI, not a real person; the app tells you so on screen, and you can report its replies without leaving the app.

SKILLS
Reading, listening, writing, speaking and grammar exercises. With your permission, AI assesses your writing and speaking, and you see what to fix and why. The "What I can do" screen shows which abilities you have demonstrated.

MOCK EXAMS
12 mock exams at every level, each with reading, listening, writing and speaking sections and a time limit for each section. Reading and listening are scored automatically; with your permission, AI assesses your writing and speaking answers, and you also see the criteria and a sample answer. A weekly quiz checks what you have learned: ten questions, five skills, an explanation after every mistake. It is free. The mock exams are practice material written by Lernomi; they are not affiliated with any exam provider and do not replace an official certificate.

FREE AND PREMIUM
Vocabulary, practice, reading, listening, grammar and quizzes are free and unlimited; the weekly quiz is once a week. On the free plan, walk mode runs with the screen on for 3 rounds a day. The free plan also includes 1 mock exam per level, 2 Speaking and 2 Writing steps per level in Path, and 2 speaking and 2 writing assessments per level in Skills. Finish what is open and reach a 7-day streak to unlock more (+2 in Path and Skills, +1 mock exam), then again with every further 7 days of streak. Premium: Pocket Walking, which also works with the screen off, walk mode without waiting for daily rounds, every mock exam, every Speaking and Writing step in Path and speaking and writing assessments in Skills, with no streak or finishing needed. Mock exams unlock in packs of three, one after another: finish all three mock exams in a pack to open the next one. Premium also has daily upper limits to prevent abuse; the current limits are shown on the Premium screen in the app.
Premium is an auto-renewing monthly or yearly subscription. The price and any free trial are shown in the app before you buy. You can manage or cancel your subscription in your Google Play account.

WITH FRIENDS
A weekly league and leaderboard, friends, reactions and a weekly shared quest with a friend. There is no private messaging. Display names and usernames are filtered, and you can report and block other users.

PRIVACY
No ads, no ad tracking, no data selling. The microphone opens only when you answer by speaking; your audio reaches the server only with your permission, and the recording is not kept. The app asks for your permission before anything is sent to AI. You can delete your account from inside the app.

LANGUAGES
The interface is available in English, Turkish and German. In English the app teaches German; the Turkish interface offers German and English, and the German interface offers English.

Privacy policy: https://www.lernomi.app/privacy
Terms of use: https://www.lernomi.app/terms
```
_3612/4000 karakter._

**Sürüm notları**

```
First release.
```
_14/500 karakter._

### 3.3 Almanca (de-DE)

Almanca konuşan kullanıcıya uygulama yalnız İngilizce kursunu açıyor: Almanca kursu kendi
dilini öğreteceği için, Zürih Almancası da hedefi Almanca olduğu için bu arayüzde yok. Eski
belgede Almanca vitrin için ayrı bir metin yoktu; App Store'daki Almanca metin ise bu
kullanıcıya açılmayan Almanca ve Zürih kurslarını anlatıyordu (B25). Ad ve metin yalnız
İngilizce kursunu anlatıyor.

**Başlık**

```
Lernomi: Englisch lernen A1-C1
```
_30/30 karakter._

**Kısa açıklama**

```
Englisch von A1 bis C1: Gespräche, Probeprüfungen und Wörter üben beim Gehen.
```
_77/80 karakter._

**Tam açıklama**

```
Lerne Englisch mit Lernomi: kurze Vokabelrunden, Sprechen-Schritte im Pfad, in denen du mit einer KI-Figur sprichst, Übungen zu allen Fertigkeiten und Probeprüfungen nach GER-Niveaus. Erklärungen und Anweisungen sind auf Deutsch.

DER ENGLISCHKURS
500 Gespräche von A1 bis C1, Übungen auf jedem Niveau und 12 Probeprüfungen pro Niveau. Dein Startniveau wählst du selbst oder findest es mit einem kurzen Einstufungstest heraus.

VOKABELRUNDEN
Verteilte Wiederholung legt dir jedes Wort genau dann wieder vor, wenn du es fast vergessen hättest. Bedeutung wählen, Gehörtes erkennen, aus dem Gedächtnis tippen, zuordnen, Sätze bauen und übersetzen.

GEHMODUS
Kopfhörer auf und lernen, ohne auf den Bildschirm zu schauen: Du hörst eine Vorgabe auf Deutsch und sprichst das englische Wort laut aus. Bei eingeschaltetem Bildschirm ist der Gehmodus kostenlos, 3 Runden pro Tag. Der Gehmodus in der Tasche, der auch bei ausgeschaltetem Bildschirm weiterläuft, gehört zu Premium.

DER PFAD: SPRECHEN-SCHRITTE
Jeder Sprechen-Schritt beginnt mit einer kurzen Erklärung, danach sprichst du dich durch eine Szene: Bestellung im Café, Arzttermin, Vorstellungsgespräch. Dein Gegenüber ist eine KI und kein echter Mensch; die App zeigt das auf dem Bildschirm an, und du kannst Antworten melden, ohne die App zu verlassen.

FÄHIGKEITEN
Übungen zu Lesen, Hören, Schreiben, Sprechen und Grammatik. Mit deiner Erlaubnis bewertet eine KI deine Texte und gesprochenen Antworten, und du siehst, was du warum ändern solltest. Der Bildschirm „Was ich kann“ zeigt, welche Fähigkeiten du schon nachgewiesen hast.

PROBEPRÜFUNGEN
12 Probeprüfungen pro Niveau, jede mit den Teilen Lesen, Hören, Schreiben und Sprechen und einer Zeitvorgabe pro Teil. Lesen und Hören werden automatisch ausgewertet; Schreiben und Sprechen bewertet mit deiner Erlaubnis eine KI, dazu siehst du die Kriterien und eine Musterlösung. Ein Wochen-Quiz zeigt, was du gelernt hast: zehn Fragen, fünf Fertigkeiten, nach jedem Fehler eine Erklärung. Es ist kostenlos. Die Probeprüfungen sind von Lernomi erstellte Übungen; sie stehen mit keinem Prüfungsanbieter in Verbindung und ersetzen kein offizielles Zertifikat.

KOSTENLOS UND PREMIUM
Vokabeln, Üben, Lesen, Hören, Grammatik und Quiz sind kostenlos und unbegrenzt; das Wochen-Quiz gibt es einmal pro Woche. Kostenlos läuft der Gehmodus bei eingeschaltetem Bildschirm, 3 Runden pro Tag. Kostenlos sind außerdem 1 Probeprüfung pro Niveau, im Pfad pro Niveau 2 Sprechen- und 2 Schreiben-Schritte und bei den Fähigkeiten pro Niveau 2 Sprech- und 2 Schreibbewertungen. Schließe Offenes ab und erreiche eine 7-Tage-Serie, dann wird mehr frei (+2 im Pfad und bei den Fähigkeiten, +1 Probeprüfung), danach mit jeden weiteren 7 Serientagen erneut. Premium: Gehmodus in der Tasche, der auch bei ausgeschaltetem Bildschirm läuft, Gehmodus ohne Warten auf Tagesrunden, alle Probeprüfungen, alle Sprechen- und Schreiben-Schritte im Pfad und Sprech- und Schreibbewertungen bei den Fähigkeiten, ohne Serie oder Abschluss. Probeprüfungen werden nacheinander in Dreierpaketen freigeschaltet: Sind alle drei Prüfungen eines Pakets abgeschlossen, öffnet sich das nächste. Auch Premium hat tägliche Obergrenzen gegen Missbrauch; die aktuellen Grenzen stehen auf dem Premium-Bildschirm der App.
Premium ist ein automatisch verlängertes Monats- oder Jahresabo. Preis und eine eventuelle kostenlose Testphase werden vor dem Kauf in der App angezeigt. Dein Abo verwaltest oder kündigst du in deinem Google-Play-Konto.

MIT FREUNDEN
Wöchentliche Liga und Rangliste, Freundschaften, Reaktionen und eine gemeinsame Wochenaufgabe mit einer befreundeten Person. Private Nachrichten gibt es nicht. Anzeigename und Benutzername werden gefiltert; andere Nutzer kannst du melden und blockieren.

DATENSCHUTZ
Keine Werbung, kein Werbe-Tracking, kein Datenverkauf. Das Mikrofon öffnet sich nur, wenn du sprechend antwortest; Audio geht nur mit deiner Erlaubnis an den Server, und die Aufnahme wird nicht gespeichert. Bevor etwas an eine KI geht, fragt die App um Erlaubnis. Dein Konto kannst du in der App löschen.

SPRACHEN
Die Oberfläche gibt es auf Deutsch, Englisch und Türkisch. Auf Deutsch lernst du Englisch; auf Türkisch gibt es Deutsch und Englisch, auf Englisch Deutsch.

Datenschutzerklärung: https://www.lernomi.app/privacy
Nutzungsbedingungen: https://www.lernomi.app/terms
```
_3876/4000 karakter._

**Sürüm notları**

```
Erste Version.
```
_14/500 karakter._

### 3.4 Metin kuralları

- **Rakip uygulama adı yok** (ör. "Duolingo", "Babbel"); "en iyi", "1 numara" gibi üstünlük
  iddiası, başarı garantisi ve fiyat yok.
- **Sınav markası yok** — ne metinde ne görsel altyazısında. Karar ve gerekçesi §4.2.
- **Resmîlik iması yok.** "Resmî sınav", "gerçek sınav görevi", "sertifika kazan" gibi
  ifadeler geçmez. Metin tersini açıkça söylüyor: deneme sınavları Lernomi'nin hazırladığı
  alıştırmalar, hiçbir sınav kurumuyla bağlantılı değil, resmî sertifika yerine geçmiyor.
  Eski metnin "resmî kelime listelerine dayanan içerik" iddiası da çıktı: Kullanım Şartları
  §8'e göre listeleri Lernomi hazırladı.
- **Olmayan özellik yok, Premium açıkça yazılır.** Premium gerektiren bir özellik anılıyorsa
  aynı cümlede Premium olduğu söylenir (Cepte yürüyüş, tüm deneme sınavları). Adlar
  uygulamadaki Premium ekranıyla aynı; "sınırsız" ya da "reklamsız Premium" denmez
  (Premium'un adil kullanım tavanı var, uygulamada reklam hiç yok).
- **Kodla Premium anılmaz.** Promo kodu ya da davet ödülü mağaza metninde geçmez; iOS'ta
  uygulama içinde kendi promo kodumuz zaten yok (indirim yalnız Apple teklif koduyla).
- **Mikrofon cümlesi gizlilik politikasıyla aynı:** "Mikrofon yalnız konuşarak cevap verdiğinde
  açılır; sesin sunucuya yalnız izninle gönderilir ve kayıt saklanmaz" (politika §4 ve
  özet kartı, `src/content/legal/defaults/privacy.ts`).
- **Bildirme kapsamı gerçeğe göre:** yapay zekâ yanıtlarının bildirilebildiği yer Konuşma adımlarındaki
  konuşma; "her ekranda" ya da "her yanıtın altında" denmez (rapor B16).

### Kategori ve etiketler

Kategori: **Eğitim**. Etiketler: dil öğrenme, Almanca, İngilizce, kelime, deneme sınavı, konuşma.

### Görseller

> **2026-09-25:** geçerli görsel kararları (konumlandırma, altyazı, kare listesi) `docs/store/README.md` › "Vitrin kararları". Aşağıdaki sıra eski ve onaylanmamış bir referans.

| Varlık | Ölçü | İçerik |
|---|---|---|
| Uygulama ikonu | 512×512 PNG | Mevcut adaptive ikonun ön planı, turuncu zemin |
| Feature graphic | 1024×500 | Marka rengi zemin, başlık ve iki ekran görüntüsü; maskot küçük |
| Telefon ekran görüntüleri (en az 4, 16:9 ya da 9:16) | 1080×1920 önerilir | 1) Günlük tur, 2) Yürüyüş modu, 3) Konuşma adımı sohbeti, 4) Beceriler (okuma/dinleme/yazma/konuşma), 5) Deneme sınavları, 6) Sıralama |
| 7" ve 10" tablet | en az 1 | Beceriler ekranı yatay |

Ekran görüntüleri gerçek cihazdan, gerçek hesapla; yer tutucu veri yok. Kare altyazıları
`docs/store/plan/*.json`'da, kuralları `docs/store/README.md`'de: altyazı özelliği anlatır,
fiyat ya da vaat içermez, sınav markası taşımaz; Premium gerektiren bir özellik anılıyorsa
altyazıda "Premium" yazar. Bugün yalnız Türkçe kare seti var; en-US ve de-DE listelemeleri
kendi arayüz dilinde çekilmiş kare ister.

### Diğer alanlar

| Alan | Değer |
|---|---|
| Varsayılan dil | Türkçe (tr-TR); çeviri listelemeleri İngilizce (en-US) ve Almanca (de-DE), §3.2–3.3 |
| E-posta | `support@lernomi.app` |
| Web sitesi | `https://www.lernomi.app` |
| Gizlilik politikası | `https://www.lernomi.app/privacy` |
| Reklam içerir | Hayır |
| Uygulama içi satın alma | **Evet** (abonelik; §2'deki karar) |

## 4. Marka ve fikri mülkiyet

### 4.1 "Lernomi" ad sorgusu — yapılan sorgular ve sonuçları (2026-09-14)

Rapor B28 "Lernomi adı Play'de başka bir uygulamada; marka sorgusu yapılmamış" diyordu ve
bu belgenin eski sürümü de aynı şeyi söylüyordu. Sorgular 2026-09-14'te, oturum açmadan ve
her kaynağın kendi arama ucuyla yapıldı. Aşağıdakiler **yapılan sorgu ve sonucu**dur; hukuki
bir değerlendirme ya da "kullanılabilir" görüşü değildir.

**Mağazalar**

| Kaynak | Sorgu | Sonuç |
|---|---|---|
| Google Play, ABD vitrini | [`lernomi`](https://play.google.com/store/search?q=lernomi&c=apps&hl=en&gl=US) | "Lernomi" adlı uygulama yok. Tek sonuç **Nomi: AI Companion with a Soul** (geliştirici Nomi.ai, paket `ai.nomi.twa`): adı "Nomi", Play'in yakın yazım eşleşmesi. Eski belgedeki "yapay zekâ arkadaş uygulamasıyla çakışıyor" notuyla örtüşen tek sonuç bu ve **aynı ad değil** |
| Google Play, Türkiye vitrini (İngilizce ve Türkçe arayüz) | [`lernomi`](https://play.google.com/store/search?q=lernomi&c=apps&hl=tr&gl=TR) | Eşleşme yok; Play genel eğitim uygulamaları öneriyor |
| Google Play, Almanya vitrini (İngilizce ve Almanca arayüz) | [`Lernomi`](https://play.google.com/store/search?q=Lernomi&c=apps&hl=de&gl=DE) | "Keine Ergebnisse für Lernomi" / "No results for lernomi" |
| Google Play, Birleşik Krallık | [`"lernomi"`](https://play.google.com/store/search?q=%22lernomi%22&c=apps&hl=en&gl=GB) | "No results" |
| Google Play, doğrudan adres | geliştirici `Lernomi`, paket `com.lernomi.learn` | İkisi de 404 (henüz yayımlanmış bir sayfa yok) |
| App Store — Apple'ın arama ucu (iTunes Search API) | [`term=lernomi&entity=software`](https://itunes.apple.com/search?term=lernomi&entity=software&country=tr), vitrinler us, gb, tr, de, at, ch, fr, nl | Adında, satıcı adında ya da paket kimliğinde "lernom" geçen uygulama yok (us ve gb'de alakasız yakın sonuçlar, öteki altı vitrinde sıfır sonuç) |

**Marka veritabanları** (sınıf 9, 41, 42 odaklı)

| Kaynak | Sorgu | Sonuç |
|---|---|---|
| [TMview](https://www.tmdn.org/tmview/) (EUIPO'nun işlettiği ortak veritabanı) — tüm ofisler | `lernomi`: tam, "içerir", "benzer" | **Tam eşleşme yok.** İçerir: 3 — SALERNOMIA (İtalya), SELLERNOMICS (ABD, sınıf 41, tescilli), DEALERNOMICS (ABD, sona ermiş). Benzer: 7 — **LERNMI** (İspanya, **sınıf 41, tescilli**, MIXELAND 1431 S.L.), Lenomi (Almanya, 24/25), LeRoMi Camper (Almanya, 12/22/35), LENOMI (ABD başvurusu, 25/35), SERNOMI (ABD ve Fransa, sınıf 5, sona ermiş), LEROMI (Brezilya, sona ermiş) |
| TMview — ofis ofis: EUIPO (EM), TÜRKPATENT (TR), WIPO Madrid (WO), Almanya (DE), İsviçre (CH), Birleşik Krallık (GB), Avusturya (AT) | aynı üç arama | EM, TR, WO, CH, GB, AT: üç aramada da **0**. DE: yalnız benzer aramada Lenomi ve LeRoMi Camper. Ofis filtresinin çalıştığı bilinen markalarla sınandı (ör. TR'de "turkcell", EM ve WO'da "babbel" kayıt döndürdü) |
| [USPTO](https://tmsearch.uspto.gov/search/search-information) — sitenin kullandığı arama servisi | kelime markası `lernomi`; ayrıca en çok iki harf farklı yazımlar | **Tam eşleşme 0** (aynı sorgu "duolingo" için 19 kayıt döndürdü, yani sorgu çalışıyor). Yakın yazımda 74 kayıt; sınıf 9/41/42'de canlı olanlar: LEOMI (9/41/42), LERNOU (9), LEMNOI (9), ERGOMI (9), LEBROMI (9), LERMOM (9), GENOMI-K (42/44). "lernom" ya da "learnom" içeren canlı marka: SELLERNOMICS (41), LEARNOMATION (41) |
| [EUIPO eSearch plus](https://euipo.europa.eu/eSearch/) | — | Doğrudan sorgulanmadı (tarayıcıda çalışan uygulama). EUIPO kayıtları TMview'da EM ofisiyle sorgulandı: 0 |
| [WIPO Global Brand Database](https://branddb.wipo.int/en/quicksearch) | — | **Erişilemedi.** Site otomatik istemciye bir doğrulama (ALTCHA) gösteriyor; atlatılmadı. Madrid sistemi uluslararası kayıtları TMview'da (WO) 0; GBD'nin TMview'da olmayan ulusal koleksiyonları **sorgulanmadı** |
| [TÜRKPATENT araştırma ekranı](https://www.turkpatent.gov.tr/arastirma-yap?form=trademark) | — | **Erişilemedi**: ekran reCAPTCHA istiyor. TÜRKPATENT kayıtları TMview'da (TR) 0. TMview ulusal veriyi ofislerden dönemsel olarak aldığı için çok yeni başvurular orada gecikmeli görünebilir |

**Alan adları ve şirket adları**

| Kaynak | Sorgu | Sonuç |
|---|---|---|
| Kayıt kuruluşlarının RDAP/WHOIS servisleri (Verisign, PIR, DENIC, EURid, SWITCH, nic.at, Nominet, TRABIS ve .io/.ai/.co kayıt kuruluşları) | `lernomi` + .com, .net, .org, .io, .ai, .co, .de, .eu, .ch, .at, .co.uk, .uk, .com.tr, .tr | **Hiçbiri kayıtlı değil.** Kayıtlı olan yalnız bizim `lernomi.app`. (Alan adının boş olması marka hakkı hakkında bir şey söylemez) |
| [UK Companies House](https://find-and-update.company-information.service.gov.uk/search/companies?q=lernomi) | `lernomi` | "No results found" |
| [Zefix](https://www.zefix.ch/) (İsviçre ticaret sicili) | `lernomi` | Sonuç yok |
| [North Data](https://www.northdata.com/lernomi) (Almanya, Avusturya, İsviçre, Birleşik Krallık, Kıbrıs vb. sicil yayınlarını derleyen ikincil kaynak) | `lernomi` | Adında "Lernomi" geçen tek kayıt **Lernomi Holdings Ltd.**, Lefkoşa, Kıbrıs, sicil HE 261397, durumu "Terminated" (sona ermiş). Faaliyet alanı kaynakta yok; Kıbrıs resmî sicilinde doğrulanmadı |
| OpenCorporates; Türkiye Ticaret Sicili Gazetesi ünvan sorgusu | `lernomi` | **Erişilemedi** (ikisi de captcha istiyor) |
| Genel web araması | "Lernomi" app / trademark / language learning | "Lernomi" adlı bir ürün, marka ya da şirket sitesi çıkmadı. Aynı alanda yakın adlar var: **Lerni** (lerni.us, çevrimiçi dil kursu; Play'de `com.lerni.android`), Lernix (yapay zekâ dil öğretmeni), Lernu! (Esperanto). TMview'da "LERNI" adıyla da kayıtlar var, ör. AB markası LERNi (sınıf 16/19/28/41, tescilli) ve Türkiye başvurusu "ludi lerni" (9/28/35/38/41/42) |

**Özet.** 2026-09-14 itibarıyla iki mağazada da "Lernomi" adlı bir uygulama, sorgulanabilen
marka veritabanlarında da "LERNOMI" işareti bulunmadı; eski "Play'de çakışıyor" iddiası
doğrulanmadı (bulunan uygulamanın adı "Nomi"). Buna karşılık eğitim ve yazılım sınıflarında
yazılışı yakın işaretler (LERNMI, LEOMI, LERNi, NOMI adlı çeşitli kayıtlar) ve aynı pazarda
yakın adlı ürünler (Lerni) var; bunların karışıklık yaratıp yaratmayacağı hukuki bir
değerlendirme ve burada yapılmadı. İki sınır da açık: WIPO GBD ile TÜRKPATENT'in kendi ekranı
otomatik sorguya kapalıydı ve sesçe benzerlik taraması yapılmadı.

**Öneri (hukuki görüş değil):** ilk sürümden ve reklam harcamasından önce profesyonel bir
marka araştırması (sesçe benzerlik ve TMview dışındaki ulusal siciller dahil) yaptırılması
ve "LERNOMI"nin TÜRKPATENT ve/veya EUIPO'da 9, 41 ve 42. sınıflarda başvurusunun
değerlendirilmesi. Olası bir ad değişikliği yayından önce çok daha ucuz.

### 4.2 Sınav markaları — karar (2026-09-14)

**Karar:** mağaza metinlerinde (başlık, altyazı, kısa ve tam açıklama, tanıtım metni, sürüm
notu), App Store anahtar kelimelerinde ve görsel altyazılarında **hiçbir sınav markası
geçmez**. Kapsam örnekleri: telc, Goethe, ÖSD, TestDaF, DSH, IELTS, TOEFL, Cambridge,
YDS/YÖKDİL; liste örnek, kural "hiçbir sınav kurumunun ya da sınavın tescilli adı". Bu
paragraftaki örnek listesi ve App Store belgesindeki kapanmış karar kaydı dışında
`docs/play`, `docs/appstore` ve `docs/store` altında sınav markası geçmiyor.

**Gerekçe:**

1. **Uygulamanın kendisinde marka yok.** Deneme sınavlarını Lernomi kendisi yazdı ve
   içerik kapısı markayı zaten yasaklıyor (`scripts/check-mock-exams.ts`,
   `mobile/__tests__/mockExam.test.tsx`, `data/library/BRIEF.md`). Vitrinde markayı anmak
   uygulamada karşılığı olmayan bir bağ kurar (App Store 2.3.1) ve "yalnız sınav biçimini
   tarif ediyoruz" savunmasını boşa çıkarır: tarif edilen biçim uygulamada adıyla hiç
   görünmüyor.
2. **Mağaza kuralları.** Apple 2.3.7 ad, altyazı ve anahtar kelimeye başkasının tescilli
   terimlerini koymayı yasaklıyor; 5.2.1 izinsiz üçüncü taraf markası kullanımını kapsıyor;
   4.1(c) başka geliştiricilerin marka ve ürün adlarını da kapsıyor (rapor B26). Play, bir
   kurumla bağlantı ya da onay ima eden kullanımı taklit politikası kapsamında
   değerlendirebiliyor.
3. **Bedeli küçük.** Marka yerine "CEFR seviyelerine göre deneme sınavları" (de: "GER-Niveaus")
   ve anahtar kelimede `sertifika,seviye` / `zertifikat,niveau` gibi tanımlayıcılar. Kaybedilen
   yalnız marka adıyla yapılan aramalar.

Bağlantısızlık metinde marka anmadan söyleniyor: "Deneme sınavları Lernomi'nin hazırladığı
alıştırmalardır; hiçbir sınav kurumuyla bağlantılı değildir ve resmî bir sertifika yerine
geçmez" (üç dilde). Kullanım Şartları §8'deki genel cümle ("uygulamada anılan sınav adları
kendi sahiplerinin markalarıdır") marka adı içermiyor; vitrinden bağımsız, dokunulmadı.

### 4.3 Maskot

Maskot (mirket) özgün; başka bir dil uygulamasının maskotuna benzemiyor.

> iOS için ayrı bir beyan seti gerekiyor; bkz. `docs/appstore/README.md`. Play'in Veri
> Güvenliği formu ile App Store gizlilik etiketleri farklı sorular sorar, biri öbürüne
> kopyalanamaz.

## 5. Geliştirici hesabı — şirketsiz gerçek kişi

**Tek taraf + AB temsilcisi (hukuki sürüm 1.7, 2026-09-24).** Play hesabının sahibi,
mağazada görünen geliştirici (görünen ad **RumpusKit**), hizmet sağlayıcı ve gizlilik
politikasındaki **veri sorumlusu** aynı kişi: **Musa Atila** (Tufanbeyli, Adana,
Türkiye). **Samet Atila** (Dortmund, Almanya) yalnız **GDPR m.27 AB temsilcisi**: veri
sorumlusu AB'de yerleşik olmadığı için gerekiyor ve gizlilik politikası §1 ile künyede
adı ve adresi yazılı. 1.6'ya kadarki "veri sorumlusu Samet, yayıncı ve veri işleyen
Musa" ayrımı kalktı; mağaza sayfası ile politika artık aynı kişiyi gösteriyor.

**DSA tüccar beyanı (AB'de satış için zorunlu).** Play Console › Uygulama içeriği ›
"Dijital Hizmetler Yasası" beyanında hesap **tüccar** olarak işaretlenir (Premium ücretli)
ve Play doğrulanmış **ad, adres, telefon ve e-postayı** AB'deki kullanıcılara mağaza
sayfasında herkese açık gösterir. Bu kimlik Musa'nınkidir (`LEGAL_ENTITY.provider*`);
e-posta `support@lernomi.app`. Telefon numarası depoda yok: Console'a girildiğinde
künyeye de eklenmesi için `LEGAL_ENTITY`ye yazılır (künye notu). Beyan Console'dan
elle yapılır, API'de yok.

Hesap **bireysel** (kişisel) geliştirici hesabı: ticaret siciline kayıtlı bir tüzel kişi yok,
dolayısıyla "organization" hesabı ve onun istediği D-U-N-S numarası da yok. Bunun doğrudan
sonuçları:

| Konu | Sonuç |
|---|---|
| Kimlik doğrulama | Play, ad-soyad, adres, telefon ve e-postayı doğruluyor; `src/lib/legal/index.ts` içindeki hizmet sağlayıcı (`provider*`) değerleriyle aynı olmalı — AB temsilcisinin (`euRepresentative*`) bilgileriyle değil |
| Adresin görünürlüğü | Bireysel hesapta doğrulanmış ad ve adres **mağaza sayfasında herkese görünür**. Ev adresi verilmek istenmiyorsa hesap açılırken bir yazışma adresi kullanılmalı — sonradan değiştirmek yeniden doğrulama demek |
| Destek e-postası | Listelemede zorunlu ve herkese açık; `LEGAL_ENTITY.supportEmail` ile aynı olmalı |
| Kapalı test kapısı | Kişisel hesaplar için Play, üretime geçmeden önce belirli sayıda test kullanıcısıyla kesintisiz kapalı test istiyor. **Sayı ve süre Google tarafından değiştiriliyor; Console'daki güncel değer esas alınmalı.** Bu, bireysel hesapların en sık gözden kaçırdığı kapı |

Metin tarafındaki karşılığı `src/lib/legal.ts`'teki kimlik profili notunda: ticaret sicil/MERSİS
alanı yok, yerine vergi dairesi var; KEP zorunlu değil ve boş bırakılırsa hukuki metinlerden
kendiliğinden düşüyor; satış belgesini Google düzenlediği ve kazanç istisnası kapsamında
belge düzenleme yükümlülüğü olmadığı için şartlar fatura vaat etmiyor.

> Vergi tarafı (istisnanın koşulları, banka hesabı, istisna belgesi, hasılat sınırı) bu deponun
> konusu değil ve mali müşavirle doğrulanmalı. Buradaki tek etkisi metinlerin şirket varsaymaması.
