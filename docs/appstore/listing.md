# App Store — yaş derecelendirmesi ve mağaza vitrini (Lernomi, iOS)

`docs/play/listing.md`'nin iOS karşılığı. **Kopyası değil:** Apple'ın alanları farklı,
limitleri daha dar ve arama Play'inkiyle aynı yerden beslenmiyor. Aşağıdaki metinler
Play metinlerinden türetildi ama her biri Apple'ın kendi kutusuna göre yeniden yazıldı.

Kaynak yine aynı: uygulamadaki gerçek içerik. Rakip adı, sınav markası, olmayan özellik ve
abartılı iddia yok (App Review Guidelines 2.3 — "Accurate Metadata").

Kimlik ve alan adı 2026-09-10'da kesinleşti ve dolduruldu; geriye yalnız inceleme
hesabının kimliği kaldı (`[[TEST_HESABI_*]]`, bkz. `docs/appstore/connect.md`).

---

## 1. Alanlar: Play'de ne vardı, Apple'da ne var

| Play | App Store | Limit | Fark |
|---|---|---|---|
| Başlık | App Name | 30 | Aynı sayı |
| — | **Subtitle** | 30 | Play'de karşılığı **yok** |
| Kısa açıklama (80) | — | — | Apple'da karşılığı **yok**; en yakını 30 karakterlik Subtitle |
| Tam açıklama | Description | 4000 | Aynı sayı, **ama aranabilir değil** (aşağıya bak) |
| — | **Keywords** | 100 | Play'de karşılığı **yok** |
| — | **Promotional Text** | 170 | Play'de karşılığı yok; **inceleme olmadan** güncellenir |
| Sürüm notları | What's New | 4000 | Play'de 500 |

### Aramanın nereden beslendiği — en büyük fark

Play tam açıklamayı indeksler, yani anahtar kelimeler uzun metnin içine yazılır.
**Apple açıklamayı indekslemez.** App Store aramasında yalnız şunlar sayılır: uygulama
adı, altyazı (subtitle), `keywords` alanı, geliştirici adı ve uygulama içi satın alma
adları. Bunun iki doğrudan sonucu var:

- Açıklama **insan için** yazılır; oraya anahtar kelime doldurmanın arama karşılığı yoktur.
- Anahtar kelimeler `keywords` alanına taşınır ve **ad/altyazıda geçen sözcük orada
  tekrarlanmaz** — Apple üç alanı birleştirip arıyor, tekrar 100 karakteri boşa harcar.
  Aşağıdaki üç `keywords` dizgisi bu kurala göre ayıklandı (ad + altyazıdaki hiçbir
  sözcük listede yok).

### Kısa açıklamanın kaybı — hangi cümle feda edildi

Play'in 80 karakterlik kısa açıklaması (tr):

> `A1'den C1'e dersler, deneme sınavları ve yürürken sesli kelime pratiği.`

Bu cümle üç şey söylüyor: **kapsam** (A1'den C1'e dersler), **sınav** (deneme sınavları)
ve **kullanım biçimi** (yürürken, sesli). 30 karakterlik Subtitle'a üçü birden sığmıyor.

**Tutulan:** yürürken + sınav → `Yürürken konuş, sınava çalış` (28).
Mağaza adı ana kursu ve seviye aralığını ("Almanca Öğren A1-C1") söylüyor; altyazı bunu
tekrar etmiyor; ayırt edici olan yürüyüş modu, "sınav" ise arayanın niyetini
yakalayan sözcük.

**Feda edilen:** "dersler", "A1–C1" ve ürünün çekirdek mekaniği olan "kelime". Nereye gitti:

- `ders`, `kelime`, `deneme`, `a1`…`c1` → **Keywords** (aranabilir ama görünmez).
- "A1'den C1'e dersler ve deneme sınavları" → **Promotional Text** (görünür, açıklamanın
  üstünde durur ve inceleme beklemeden değiştirilebilir).

Yani kayıp aramada değil, **ilk bakışta**: mağaza sayfasını üç saniye görüp geçen biri
uygulamanın bir kelime uygulaması olduğunu altyazıdan anlamıyor. Bilinçli seçim; tersi
(kelimeyi tutup yürüyüşü atmak) uygulamayı sıradan bir kelime kartı uygulamasına
benzetirdi.

---

## 2. Yaş derecelendirmesi

### 2.1 Play'de 18+ kararı ve gerekçesi

Play tarafında **hedef kitle "yalnız 18 ve üzeri"** seçildi (`docs/play/listing.md` §1).
Gerekçe `03cfbc1`'de yazılı ve iki ayaklı:

1. **Metin böyle diyor.** Kullanım şartları §3 hesap açmayı 18 yaşla sınırlıyor; gizlilik
   politikası §12 de aynı yaşı söylüyor. Kodda yaş kapısı yok (kayıtta ve misafir girişinde yalnız 18 yaş beyanını içeren bir kabul satırı var; onay kutusu ya da doğum tarihi yok), yani doğruyu yalnız metin
   taşıyor — beyanların birbirini tutması şart.
2. **16-17 eklemek uygulamayı Play'in Aileler politikası kapsamına alırdı.** Açık uçlu
   yapay zekâ sohbeti, kullanıcılar arası sosyal katman (görünen ad, kullanıcı adı; biyografi 2026-09-16'da kaldırıldı) ve lider tablosu o kapsamda ek
   gereklilik doğuruyor.

Buna karşılık Play'in **IARC içerik derecelendirmesi** düşük çıkıyor (beklenen: PEGI 3 /
ESRB Everyone), çünkü içerikte şiddet, cinsellik, kumar, uyuşturucu ya da kaba dil yok.
**Play'de iki ayrı düğme var:** hedef kitle (bizim seçtiğimiz) ve içerik derecelendirmesi
(ankete göre hesaplanan). İkisinin farklı çıkması normal.

### 2.2 Apple'da tek düğme var

App Store'da "hedef kitle" diye ayrı bir alan **yok**. Tek bir yaş derecelendirmesi var ve
onu da geliştirici yazmıyor: App Store Connect'teki ankete verilen cevaplardan **Apple
hesaplıyor**. Yani Play'deki "18+ hedef kitle" kararının App Store'da doğrudan bir kutusu
yok.

Apple 2025'te kademeleri genişletti (4+ / 9+ / 13+ / 16+ / 18+) ve ankete içerik
sorularının yanına **yetenek (capability)** soruları ekledi: kullanıcı üretimi içerik,
mesajlaşma, sınırsız web erişimi, reklam, uygulama içi denetimler. Bizim derecemizi
yukarı taşıyabilecek olan bu ikinci grup.

### 2.3 Anket cevapları — Connect'te dolduruldu (2026-09-10)

Anket 2025'te yeniden düzenlendi: içerik soruları artık **None / Infrequent / Frequent**
üçlüsüyle soruluyor ve yanlarına bir **yetenek** grubu geldi. Aşağıdaki cevaplar
tahminle değil, içerik TARANARAK verildi — üç tanesi bu yüzden ilk taslaktan farklı.

**Yetenekler**

| Soru | Cevap | Dayanak |
|---|---|---|
| Parental Controls / Age Assurance | Hayır | Doğrulayan bir yaş kapısı yok (yalnız kayıt ve misafir girişinde 18 yaş beyan satırı); şartlardaki 18 sınırı sözleşme koşulu |
| Sınırsız web erişimi | **Hayır** | Uygulama içi tarayıcı yok. Hukuki sayfalar `Linking.openURL` ile SİSTEM tarayıcısında; tek WebView `${API_BASE}/tts-bridge` ve gezinme yüzeyi değil |
| Kullanıcı üretimi içerik | **Evet** | Görünen ad ve kullanıcı adı başkalarına dağıtılıyor (sıralama, profil; biyografi 2026-09-16'da kaldırıldı). Süzgeç + bildir/engelle + insan incelemesi var |
| **Social Media** | **Hayır** | Apple'ın tanımı "kullanıcı içeriğinin bir akış üzerinden yayılması". `activity_events` YALNIZ sistem olayları taşıyor (`streak_milestone`, `achievement`, `friend_joined`, `quest_completed`, `weekly_top`, `friend_streak`); tepkiler altı sabit türden, serbest metin yok |
| Kullanıcılar arası mesajlaşma | **Hayır** | Özel mesajlaşma yok; arkadaşlık, tepki ve dürtme sabit biçimli |
| Reklam | Hayır | Reklam SDK'sı yok |

**İçerik**

| Soru | Cevap | Dayanak |
|---|---|---|
| Müstehcen mizah / kaba dil | None | Ders içeriği sınav odaklı; STT sonucunda küfür maskeleniyor (`src/lib/moderation.ts`) |
| Korku / gerilim | None | — |
| **Alkol, tütün, uyuşturucu** | **Infrequent** | ÖLÇÜLDÜ: 8.707 kelimenin 14'ü — `Bier`, `Wein` (A1), `rauchen`, `Zigarette` (A1), `Alkohol`, `betrunken`, `Kneipe`, `Prost`, `Raucher`, `Nichtraucher`, `Droge`, `Sucht`, `süchtig` (B1), `anstoßen` (A2). Atıf var, yani None yanlış beyan olurdu; binde iki, yani Frequent de değil |
| Tıbbi / tedavi bilgisi | None | "Doktor randevusu" bir rol yapma sahnesi. A2'deki iki sağlık dersi (`Sağlık sigortası`, `Check-up`) dil pratiği — teşhis ya da yönetim yönlendirmesi yok. **Frequent deseydik "Regulated Medical Device" beyanı açılırdı** |
| Health or Wellness Topics | Hayır | "Check-up" dersi `sollte` ile öneri kurmayı öğretiyor; öneri kullanıcıya değil, dilbilgisi hedefine ait |
| **Mature or Suggestive Themes** | **Infrequent** | ÖLÇÜLDÜ: 269 içerik dosyasında 107 geçiş — `arbeitslos`/`Arbeitslosigkeit` 34, `Tod`/`sterben` 25, `Trennung` 13, `Einsamkeit` 12, `Migration` 10, `Flucht` 5. B1-C1 metinlerinin doğal konuları; tanımın "yetişkin kitleye yönelik gerçek dünya konuları" yarısına giriyor |
| Cinsel içerik / çıplaklık (üç kademe) | None | ÖLÇÜLDÜ: `sex`, `sexuell`, `erotik`, `nackt`, `intim` — 269 dosyada sıfır geçiş |
| Şiddet (dört kademe, silahlar dahil) | None | ÖLÇÜLDÜ: `Gewalt` 14 geçişin tamamı B1 hırsızlık ünitesinde (`b1-u37`) kelime listesi maddesi ve metin "hırsızlıkta neredeyse hiç şiddet kullanılmaz" diyor. `Krieg` 9 — dedenin savaştan hiç söz etmemesi (`b1-u34`). `Angriff` 4 ve `Kampf` 2 — hepsi mecaz ("bir laf atma saldırı değildir", "pazar payı savaşı"). Silah geçişi iki tane ve ikisi de mecaz ("taviz bir silahtır", "kendimize karşı mühimmat"); havuzdaki tek kesici alet `Messer` = çatal-bıçak. Tasvir yok |
| **Contests** | **Frequent** | İLK TASLAK YANLIŞTI. "Ödülsüz" diye None yazılmıştı, ama Apple'ın tanımı ödül şartı koymuyor: *"compete with one another for **rankings**, rewards, or the achievement of personal goals"*. Haftalık lig — küme başına sıralama, yükselme/düşme (`leagues`, CI'da `test:league`), haftalık sıfırlama, sıralama bildirimi — tanıma birebir giriyor ve sürekli çalışıyor |
| Simulated Gambling / Gambling / Loot Boxes | None / Hayır / Hayır | Şansa ya da paraya dayalı mekanik yok. Kelime turundaki "Meydan okuma" yalnız doğru cevaba bağlı bir XP çarpanı: etabın hepsi doğruysa o etabın XP'si iki katı, iki yanlışta o etaptan XP yok; şans unsuru, para ya da satın alınabilir değer yok. Adı 2026-09-15'e kadar "Bahis" idi ve cevabı değiştirmese de inceleyicide soru doğuruyordu; `check:age-rating` artık arayüz sözlüklerini de bahis dili için tarıyor. Başarımlar ve görevler belirlenimci, rastgele içerik veren satın alınabilir kutu yok |
| Uygulama içi satın alma | **Evet** | Connect'te ayrı alan, ankete girmiyor |
| Yapay zekâ ile üretilen içerik | **Evet** | Rol yapma diyalogları; "gerçek kişi değil" bildirimi kalıcı, her yanıtın altında "Bildir" |

**Sonuç: hesaplanan 13+, ELLE 18+'a yükseltildi.**

Alkol atıfları ve gerçek dünya konuları dereceyi 4+'tan 13+'a çekti. Aynı iki cevap
yüzünden Apple uygulamayı **Afganistan ve Fas'ta satmıyor** — yerel mevzuat, otomatik,
düzeltilecek bir şey değil.

### 2.4 Neden 18+'a yükseltildi

Hesaplanan derece içeriğin sertliğini ölçüyor ve 13+ o ölçüme göre doğru. Ama hesap
açmak **şartlar §3 gereği 18 yaş ve üzeri** ve Play'de hedef kitle de 18+. Üç beyandan
biri ötekileri tutmayınca hem inceleyene açıklama borcu doğuyor hem de gerçek bir açık
kalıyor: doğrulayan bir yaş kapısı yok (yalnız beyan satırı), yani 13+ diyen bir vitrin on dört yaşındaki birini
kurmaya davet ediyor ve o kişinin sesi konuşma tanıma sağlayıcılarına, yazdığı metin dil
modellerine gidiyor — KVKK ve GDPR'da veli onayı gerektiren bir akış.

Apple'ın **Override to Higher Age Rating** kutusu tam bu durum için var; kendi metni
*"has a EULA with age requirements"* diyor. Kullanıldı.

Kararın bedeli gerçek ve bilinerek ödendi: 18+ etiketi keşfedilirliği düşürüyor ve bazı
bölgelerde ebeveyn denetimine takılıyor. Karşılığında App Store, Play ve sözleşme aynı
sayıyı söylüyor.

Değişmeyen kurallar:

1. Ankete **doğru** cevap verilir. Dereceyi yukarı zorlamak için yanlış cevap
   işaretlemek metadata ihlalidir — override zaten sağlanan yol, anketi eğmeye gerek yok.
2. "Made for Kids" / Kids kategorisi **seçilmez**.
3. Vitrinde çocuk vurgusu olmaz: metinlerde ve karelerde "çocuk", "kids", "eğlenceli
   oyun" geçmez; maskot yalnız uygulama içinde (Play'deki kuralın aynısı).

---

## 3. Mağaza metinleri

Üç yerelleştirme: **tr, en, de**. Arayüz üç dilde (`mobile/src/i18n/`) ve `Info.plist`
`CFBundleLocalizations` üçünü sayıyor; vitrinin bir dili eksik kalırsa uygulama o dili
"desteklemiyor" gibi görünür.

Her yerelleştirme kendi ekran görüntülerini de ister (§4).

> **2026-09-14'te baştan yazıldı** (mağaza ön inceleme raporu B25, B26). Eski metin üç dilde
> "İngilizce kursunda A1 ve A2 var, sınav hazırlığı ve B1-C1 henüz yok" diyordu, sınavları
> "Lesen ve Hören alıştırmaları" diye anlatıyordu, `keywords` bir sınav markasıyla
> başlıyordu ve Almanca vitrin, Almanca konuşana açılmayan Almanca ve Zürih kurslarını
> anlatıyordu. Şimdi her yerelleştirme **yalnız o arayüz dilinde gerçekten açılan kursu**
> anlatıyor. Kurs × arayüz dili × seviye × ders × deneme sınavı ölçümü, anadil çevirisinin
> kapsamı ve Premium ayrımının kaynağı `docs/play/listing.md` §3.0'da; iki mağaza aynı
> ölçüme dayanıyor.
>
> Description, Play'deki tam açıklamayla aynı metin; yalnız abonelik yönetimi cümlesi
> Apple'a göre yazıldı (2.3.10: metadata'da başka platform adı geçmez). Paragraflar tek
> satır, yapıştırınca satır ortasında kırılma olmasın. Sayılar betikle hesaplandı:
> karakter = Unicode karakter, satır sonları dahil; `keywords` UTF-8 bayt (ı, ş, ğ, ü, ö, ç,
> ä, ß iki bayt sayılır).

### 3.1 Türkçe (tr)

**App Name**

```
Lernomi: Almanca Öğren A1-C1
```
_28/30 karakter._

**Karar (Samet, 2026-09-23):** uygulama adı (cihazda) **Lernomi**, mağaza adı **Lernomi: Almanca Öğren A1-C1**.
Connect ve Play'deki canlı ad zaten bu; belge ona hizalandı. İngilizce kurs altyazıda ve açıklamada anılıyor.

**Subtitle**

```
Yürürken konuş, sınava çalış
```
_28/30 karakter._

**Promotional Text** (incelemesiz güncellenebilir)

```
Kulaklığı tak, yürürken sesli çalış: ipucunu duy, karşılığını söyle. Almanca ve İngilizce için A1'den C1'e dersler ve deneme sınavları.
```
_135/170 karakter._

Eski tanıtım metni "telefonu cebine at" diyordu; cepte (ekran kapalı) yürüyüş Premium olduğu
için ücretsiz bir özellik gibi okunuyordu. Yenisi ekran açık da yapılabilen şeyi anlatıyor.

**Keywords** (virgülle, virgülden sonra BOŞLUK YOK; sınır 100 bayt)

```
sertifika,seviye,öğren,dil,kelime,ders,sınav,deneme,gramer,konuşma,dinleme,yazma,a1,a2,b1,b2,c1
```
_99/100 bayt (95 karakter)._

Ad ve altyazıdaki sözcükler (lernomi, almanca, ingilizce, yürürken, konuş, sınava, çalış)
listede yok. Çıkanlar ve sebepleri: sınav markası (§7, karar 2); `zürih` (kurs duraklatılmış,
yeni kullanıcıya sunulmuyor); `ingilizce` (artık adda); `telaffuz` (mobilde telaffuz notu
yok, söyleyiş alıştırması yalnız "anlaşıldı mı" diye bakıyor); `ezber`, `tekrar`, `okuma`
(bayt sınırında daha zayıf aramalar). Girenler: `sertifika,seviye` (markanın yerine
tanımlayıcı), `öğren`, `dil`, `ders`, `deneme`, `konuşma`, `yazma`, `a2`, `c1`.

**Description**

```
Lernomi ile Almanca ya da İngilizce öğren: kısa kelime turları, bir yapay zekâ karakteriyle konuşarak ilerleyen dersler, beceri alıştırmaları ve CEFR seviyelerine göre deneme sınavları. Anlatım ve yönergeler Türkçe.

KURSLAR
• Almanca: A1'den C1'e 580 ders
• İngilizce: A1'den C1'e 500 ders
İki kursta da her seviyede beceri alıştırmaları ve 12 deneme sınavı var. Başlangıç seviyeni kendin seçebilir ya da kısa bir seviye testiyle bulabilirsin.

KELİME TURLARI
Aralıklı tekrar, her kelimeyi unutmak üzereyken yeniden önüne getirir. Anlamını seç, duyduğunu tanı, yazarak hatırla, eşleştir, cümle kur, çevir. Almanca kursunda artikel ve çoğul turları da var.

YÜRÜYÜŞ MODU
Kulaklığı tak, ekrana bakmadan çalış: ipucunu Türkçe duyarsın, karşılığını öğrendiğin dilde sesli söylersin. Ekran açıkken günde 3 tur ücretsizdir. Ekran kapalıyken ya da telefon cebindeyken çalışan Cepte yürüyüş Premium'a dahildir.

DERSLER VE KONUŞMA
Her ders Türkçe kısa bir anlatımla başlar, sonra bir sahnede konuşursun: kafede sipariş, doktor randevusu, iş görüşmesi. Karşındaki gerçek bir kişi değil, bir yapay zekâdır; uygulama bunu ekranda söyler ve yanıtlarını uygulamadan çıkmadan bildirebilirsin.

BECERİLER
Okuma, dinleme, yazma, konuşma ve dil bilgisi alıştırmaları. İznin varsa yazdıklarını ve söylediklerini yapay zekâ değerlendirir; neyi neden düzeltmen gerektiğini görürsün. "Neler yapabilirim" ekranı hangi becerileri kanıtladığını gösterir.

DENEME SINAVLARI
Her seviyede 12 deneme sınavı; her birinde okuma, dinleme, yazma ve konuşma bölümleri ve bölüm başına süre var. Okuma ve dinleme otomatik puanlanır; yazma ve konuşma cevaplarını iznin varsa yapay zekâ değerlendirir, ölçütler ve örnek cevap da gösterilir. Haftalık quiz öğrendiklerini düzenli olarak ölçer: on soru, beş yetkinlik, her yanlıştan sonra açıklama. Ücretsizdir. Deneme sınavları Lernomi'nin hazırladığı alıştırmalardır; hiçbir sınav kurumuyla bağlantılı değildir ve resmî bir sertifika yerine geçmez.

ÜCRETSİZ VE PREMIUM
Kelime çalışma, pratik, okuma, dinleme, dil bilgisi ve quiz ücretsiz ve sınırsızdır; haftalık quiz haftada birdir. Yürüyüş modu ücretsizde ekran açıkken günde 3 turdur. Ücretsiz sürümde ayrıca her seviyede 1 deneme sınavı, Patika'da seviye başına 2 Konuşma ve 2 Yazma adımı, Beceriler'de seviye başına 2 konuşma ve 2 yazma değerlendirmesi var. Açık olanları bitirip 7 günlük seri yapınca yenileri açılır (Patika ve Beceriler'de +2, deneme sınavında +1), sonra her 7 günlük seride yeniden. Premium: ekran kapalıyken de çalışan Cepte yürüyüş ve günlük tur beklemeden yürüyüş modu, tüm deneme sınavları, Patika'daki tüm Konuşma ve Yazma adımları ve Beceriler'de konuşma ve yazma değerlendirmesi, seri ya da bitirme beklemeden. Deneme sınavları üçerli paketler hâlinde sırayla açılır: paketteki üç kâğıdı bitirince sonraki paket açılır. Premium'da da kötüye kullanımı önleyen günlük üst sınırlar vardır; güncel sınırlar uygulamadaki Premium ekranında yazar.
Premium, aylık ya da yıllık olarak otomatik yenilenen bir aboneliktir. Fiyat ve varsa ücretsiz deneme süresi satın almadan önce uygulamada gösterilir. Aboneliğini Apple hesabının abonelik ayarlarından yönetebilir ya da iptal edebilirsin.

ARKADAŞLARINLA
Haftalık lig ve sıralama, arkadaş ekleme, tepkiler ve bir arkadaşınla haftalık ortak görev. Özel mesajlaşma yoktur. Görünen ad ve kullanıcı adı süzgeçten geçer; diğer kullanıcıları bildirebilir ve engelleyebilirsin.

GİZLİLİK
Reklam yok, reklam amaçlı izleme yok, veri satışı yok. Mikrofon yalnız konuşarak cevap verdiğinde açılır; sesin sunucuya yalnız izninle gönderilir ve kayıt saklanmaz. Yapay zekâya bir şey gönderilmeden önce iznin istenir. Hesabını uygulamanın içinden silebilirsin.

DİLLER
Arayüz Türkçe, İngilizce ve Almanca. Türkçe arayüzde Almanca ve İngilizce, İngilizce arayüzde Almanca, Almanca arayüzde İngilizce kursu sunulur.

Gizlilik politikası: https://www.lernomi.app/privacy
Kullanım şartları: https://www.lernomi.app/terms
```
_3613/4000 karakter._

**What's New**

```
İlk sürüm.
```
_10/4000 karakter._

### 3.2 İngilizce (en)

İngilizce arayüzde yalnız Almanca kursu sunuluyor; metin yalnız onu anlatıyor.

**App Name**

```
Lernomi: Learn German A1-C1
```
_27/30 karakter._

**Subtitle**

```
Speak on the go, exam practice
```
_30/30 karakter._

Eski altyazı "pass exams" diyordu: geçmeyi vaat eden bir ifade. Yenisi "exam practice".

**Promotional Text** (incelemesiz güncellenebilir)

```
Put your headphones on and practice out loud on a walk: hear the prompt, say the German word. Lessons and mock exams from A1 to C1.
```
_131/170 karakter._

**Keywords** (virgülle, virgülden sonra BOŞLUK YOK; sınır 100 bayt)

```
zertifikat,level,deutsch,vocabulary,words,grammar,listening,lessons,course,mock,test,a1,a2,b1,b2,c1
```
_99/100 bayt (99 karakter)._

Ad ve altyazıdaki sözcükler (lernomi, learn, german, speak, on, the, go, exam, practice)
listede yok. Çıkanlar: sınav markası (§7, karar 2); `exam` (artık altyazıda); `swiss` (Zürih
kursu bu arayüzde hiç sunulmuyor); `flashcard`, `reading`, `speaking` (bayt sınırında daha
zayıf aramalar). Girenler: `zertifikat,level` (markanın yerine tanımlayıcı; `zertifikat`
Almanca öğrenenin aradığı genel sözcük), `deutsch`, `words`, `lessons`, `course`, `mock`,
`test`, `a2`, `c1`.

**Description**

```
Learn German with Lernomi: short vocabulary rounds, lessons where you talk with an AI character, skill exercises and mock exams organized by CEFR level. Explanations and instructions are in English.

THE GERMAN COURSE
580 lessons from A1 to C1, skill exercises at every level and 12 mock exams per level. Choose your starting level yourself or find it with a short placement test.

VOCABULARY ROUNDS
Spaced repetition brings each word back just before you would forget it. Choose the meaning, recognize what you hear, type from memory, match, build and translate sentences, and practice German articles and plurals.

WALK MODE
Put your headphones on and study without looking at the screen: you hear a prompt in English and say the German out loud. Walk mode is free with the screen on, 3 rounds a day. Pocket Walking, which keeps it running with the screen off or with your phone in your pocket, is part of Premium.

LESSONS AND SPEAKING
Each lesson starts with a short explanation, then you talk your way through a scene: ordering in a café, a doctor's appointment, a job interview. Your partner is an AI, not a real person; the app tells you so on screen, and you can report its replies without leaving the app.

SKILLS
Reading, listening, writing, speaking and grammar exercises. With your permission, AI assesses your writing and speaking, and you see what to fix and why. The "What I can do" screen shows which abilities you have demonstrated.

MOCK EXAMS
12 mock exams at every level, each with reading, listening, writing and speaking sections and a time limit for each section. Reading and listening are scored automatically; with your permission, AI assesses your writing and speaking answers, and you also see the criteria and a sample answer. A weekly quiz checks what you have learned: ten questions, five skills, an explanation after every mistake. It is free. The mock exams are practice material written by Lernomi; they are not affiliated with any exam provider and do not replace an official certificate.

FREE AND PREMIUM
Vocabulary, practice, reading, listening, grammar and quizzes are free and unlimited; the weekly quiz is once a week. On the free plan, walk mode runs with the screen on for 3 rounds a day. The free plan also includes 1 mock exam per level, 2 Speaking and 2 Writing steps per level in Path, and 2 speaking and 2 writing assessments per level in Skills. Finish what is open and reach a 7-day streak to unlock more (+2 in Path and Skills, +1 mock exam), then again with every further 7 days of streak. Premium: Pocket Walking, which also works with the screen off, walk mode without waiting for daily rounds, every mock exam, every Speaking and Writing step in Path and speaking and writing assessments in Skills, with no streak or finishing needed. Mock exams unlock in packs of three, one after another: finish all three papers in a pack to open the next one. Premium also has daily upper limits to prevent abuse; the current limits are shown on the Premium screen in the app.
Premium is an auto-renewing monthly or yearly subscription. The price and any free trial are shown in the app before you buy. You can manage or cancel your subscription in your Apple Account subscription settings.

WITH FRIENDS
A weekly league and leaderboard, friends, reactions and a weekly shared quest with a friend. There is no private messaging. Display names and usernames are filtered, and you can report and block other users.

PRIVACY
No ads, no ad tracking, no data selling. The microphone opens only when you answer by speaking; your audio reaches the server only with your permission, and the recording is not kept. The app asks for your permission before anything is sent to AI. You can delete your account from inside the app.

LANGUAGES
The interface is available in English, Turkish and German. In English the app teaches German; the Turkish interface offers German and English, and the German interface offers English.

Privacy policy: https://www.lernomi.app/privacy
Terms of use: https://www.lernomi.app/terms
```
_3628/4000 karakter._

**What's New**

```
First release.
```
_14/4000 karakter._

### 3.3 Almanca (de)

> **Almanca vitrin neyi satıyor.** Almanca konuşan kullanıcıya uygulama **yalnız İngilizce
> kursunu** sunuyor: Almanca kursu kendi dilini öğreteceği için, Zürih Almancası da hedefi
> Almanca olduğu için bu arayüzde yok (`coursesForNative` hedef dile bakıyor). Eski metin
> "Deutsch & Englisch" adıyla bu kullanıcıya Almanca ve Zürih kurslarını anlatıyordu ve
> İngilizce kursu A1–A2 sanıyordu; ikisi de yanlıştı (B25). Bugünkü İngilizce kurs A1–C1,
> 500 ders, 939 beceri alıştırması ve 60 deneme sınavı; Almanca arayüzde bunların tamamının
> yönergesi çevrilmiş (ölçüm `docs/play/listing.md` §3.0). Ad ve metin yalnız bunu anlatıyor.

**App Name**

```
Lernomi: Englisch lernen A1-C1
```
_30/30 karakter._

**Subtitle**

```
Sprechen üben, Probeprüfungen
```
_29/30 karakter._

**Promotional Text** (incelemesiz güncellenebilir)

```
Kopfhörer auf und beim Gehen laut üben: Vorgabe hören, das englische Wort sagen. Lektionen und Probeprüfungen von A1 bis C1.
```
_124/170 karakter._

**Keywords** (virgülle, virgülden sonra BOŞLUK YOK; sınır 100 bayt)

```
zertifikat,niveau,english,vokabeln,wortschatz,grammatik,hören,prüfung,test,kurs,a1,a2,b1,b2,c1
```
_96/100 bayt (94 karakter)._

Ad ve altyazıdaki sözcükler (lernomi, englisch, lernen, sprechen, üben, probeprüfungen)
listede yok. Çıkanlar: sınav markası (§7, karar 2); `zürich` ve `schweiz` (bu arayüzde Zürih
kursu yok); `karteikarten`, `lesen`. Girenler: `zertifikat,niveau` (markanın yerine
tanımlayıcı), `english`, `wortschatz`, `kurs`, `test`, `a2`, `c1`.

**Description**

```
Lerne Englisch mit Lernomi: kurze Vokabelrunden, Lektionen, in denen du mit einer KI-Figur sprichst, Übungen zu allen Fertigkeiten und Probeprüfungen nach GER-Niveaus. Erklärungen und Anweisungen sind auf Deutsch.

DER ENGLISCHKURS
500 Lektionen von A1 bis C1, Übungen auf jedem Niveau und 12 Probeprüfungen pro Niveau. Dein Startniveau wählst du selbst oder findest es mit einem kurzen Einstufungstest heraus.

VOKABELRUNDEN
Verteilte Wiederholung legt dir jedes Wort genau dann wieder vor, wenn du es fast vergessen hättest. Bedeutung wählen, Gehörtes erkennen, aus dem Gedächtnis tippen, zuordnen, Sätze bauen und übersetzen.

GEHMODUS
Kopfhörer auf und lernen, ohne auf den Bildschirm zu schauen: Du hörst eine Vorgabe auf Deutsch und sprichst das englische Wort laut aus. Bei eingeschaltetem Bildschirm ist der Gehmodus kostenlos, 3 Runden pro Tag. Der Gehmodus in der Tasche, der auch bei ausgeschaltetem Bildschirm weiterläuft, gehört zu Premium.

LEKTIONEN UND SPRECHEN
Jede Lektion beginnt mit einer kurzen Erklärung, danach sprichst du dich durch eine Szene: Bestellung im Café, Arzttermin, Vorstellungsgespräch. Dein Gegenüber ist eine KI und kein echter Mensch; die App zeigt das auf dem Bildschirm an, und du kannst Antworten melden, ohne die App zu verlassen.

FÄHIGKEITEN
Übungen zu Lesen, Hören, Schreiben, Sprechen und Grammatik. Mit deiner Erlaubnis bewertet eine KI deine Texte und gesprochenen Antworten, und du siehst, was du warum ändern solltest. Der Bildschirm „Was ich kann“ zeigt, welche Fähigkeiten du schon nachgewiesen hast.

PROBEPRÜFUNGEN
12 Probeprüfungen pro Niveau, jede mit den Teilen Lesen, Hören, Schreiben und Sprechen und einer Zeitvorgabe pro Teil. Lesen und Hören werden automatisch ausgewertet; Schreiben und Sprechen bewertet mit deiner Erlaubnis eine KI, dazu siehst du die Kriterien und eine Musterlösung. Ein Wochen-Quiz zeigt, was du gelernt hast: zehn Fragen, fünf Fertigkeiten, nach jedem Fehler eine Erklärung. Es ist kostenlos. Die Probeprüfungen sind von Lernomi erstellte Übungen; sie stehen mit keinem Prüfungsanbieter in Verbindung und ersetzen kein offizielles Zertifikat.

KOSTENLOS UND PREMIUM
Vokabeln, Üben, Lesen, Hören, Grammatik und Quiz sind kostenlos und unbegrenzt; das Wochen-Quiz gibt es einmal pro Woche. Kostenlos läuft der Gehmodus bei eingeschaltetem Bildschirm, 3 Runden pro Tag. Kostenlos sind außerdem 1 Probeprüfung pro Niveau, im Pfad pro Niveau 2 Sprechen- und 2 Schreiben-Schritte und bei den Fähigkeiten pro Niveau 2 Sprech- und 2 Schreibbewertungen. Schließe Offenes ab und erreiche eine 7-Tage-Serie, dann wird mehr frei (+2 im Pfad und bei den Fähigkeiten, +1 Probeprüfung), danach mit jeden weiteren 7 Serientagen erneut. Premium: Gehmodus in der Tasche, der auch bei ausgeschaltetem Bildschirm läuft, Gehmodus ohne Warten auf Tagesrunden, alle Probeprüfungen, alle Sprechen- und Schreiben-Schritte im Pfad und Sprech- und Schreibbewertungen bei den Fähigkeiten, ohne Serie oder Abschluss. Probeprüfungen werden nacheinander in Dreierpaketen freigeschaltet: Sind alle drei Prüfungen eines Pakets abgeschlossen, öffnet sich das nächste. Auch Premium hat tägliche Obergrenzen gegen Missbrauch; die aktuellen Grenzen stehen auf dem Premium-Bildschirm der App.
Premium ist ein automatisch verlängertes Monats- oder Jahresabo. Preis und eine eventuelle kostenlose Testphase werden vor dem Kauf in der App angezeigt. Dein Abo verwaltest oder kündigst du in den Abo-Einstellungen deines Apple Accounts.

MIT FREUNDEN
Wöchentliche Liga und Rangliste, Freundschaften, Reaktionen und eine gemeinsame Wochenaufgabe mit einer befreundeten Person. Private Nachrichten gibt es nicht. Anzeigename und Benutzername werden gefiltert; andere Nutzer kannst du melden und blockieren.

DATENSCHUTZ
Keine Werbung, kein Werbe-Tracking, kein Datenverkauf. Das Mikrofon öffnet sich nur, wenn du sprechend antwortest; Audio geht nur mit deiner Erlaubnis an den Server, und die Aufnahme wird nicht gespeichert. Bevor etwas an eine KI geht, fragt die App um Erlaubnis. Dein Konto kannst du in der App löschen.

SPRACHEN
Die Oberfläche gibt es auf Deutsch, Englisch und Türkisch. Auf Deutsch lernst du Englisch; auf Türkisch gibt es Deutsch und Englisch, auf Englisch Deutsch.

Datenschutzerklärung: https://www.lernomi.app/privacy
Nutzungsbedingungen: https://www.lernomi.app/terms
```
_3895/4000 karakter._

**What's New**

```
Erste Version.
```
_14/4000 karakter._

---

## 4. Görseller

> **2026-09-25:** geçerli görsel kararları (konumlandırma, altyazı, kare listesi) `docs/store/README.md` › "Vitrin kararları". Aşağıdaki sıra eski ve onaylanmamış bir referans.

Uygulama iPad'i de destekliyor (`TARGETED_DEVICE_FAMILY = "1,2"`), bu yüzden iPad ekran
görüntüsü **zorunlu**.

| Varlık | Ölçü | Zorunlu mu | İçerik |
|---|---|---|---|
| Uygulama ikonu | 1024×1024 PNG, opak, şeffaflık ve yuvarlatma YOK | Evet | `Images.xcassets/AppIcon.appiconset/AppIcon-1024.png` (Şerit R üretti) |
| iPhone 6.9" | 1290×2796 (ya da 1320×2868) | **Evet** | Aşağıdaki sıra |
| iPad 13" | 2064×2752 (ya da 2048×2732) | **Evet** (iPad desteklendiği için) | Beceriler ve ders ekranı, yatay düzen |
| Küçük iPhone boyutları | — | Hayır | Apple 6.9"dan türetiyor; **Connect'teki güncel listeye bakılmalı**, Apple bu kuralı sık değiştiriyor |
| App Preview (video) | boyut başına en çok 3, 15-30 sn | Hayır | Yürüyüş modu videosu incelemede en çok işe yarayan şey (bkz. §7, karar 3) |

Boyut başına, **yerelleştirme başına** en çok 10 görsel; arama sonucunda ilk üçü görünür,
o yüzden sıra önemli:

1. Günlük tur (kelime turu)
2. Yürüyüş modu (ekran kapalı çalışma, yani Cepte yürüyüş gösterilirse altyazıda "Premium" yazar)
3. Ders diyaloğu (yapay zekâ sahnesi, "gerçek kişi değil" bildirimi görünür durumda)
4. Beceriler: okuma / dinleme / yazma / konuşma
5. Deneme sınavları (altyazı seviye başına 12 kâğıttan birinin ücretsiz olduğunu söyler)
6. Haftalık sıralama

Ekran görüntüleri gerçek cihazdan ve gerçek hesapla alınır; yer tutucu veri olmaz. Üstüne
yazılan metin uygulamadaki özelliği anlatır, fiyat ya da vaat içermez, **sınav markası
taşımaz** (§6) ve Premium gerektiren bir özelliği anıyorsa bunu söyler (2.3.2). **Üç
yerelleştirmenin görselleri de kendi dilinde** olmalı — arayüz Türkçe görünen bir ekran
görüntüsünü Almanca vitrine koymak 2.3.3'e takılır. Altyazıların kaynağı ve kuralları
`docs/store/README.md`.

---

## 5. Diğer alanlar

| Alan | Değer |
|---|---|
| Primary Language | Türkçe |
| Bundle ID | `app.lernomi.ios` |
| Primary Category | Education |
| Secondary Category | Reference |
| Copyright | `2026 Musa Atila` — `LEGAL_ENTITY.providerName` ile aynı |
| Support URL | `https://www.lernomi.app/support` — **zorunlu**; destek adresi, yanıt süresi ve kanallar orada |
| Marketing URL | `https://www.lernomi.app` (isteğe bağlı) |
| Privacy Policy URL | `https://www.lernomi.app/privacy` — **zorunlu** |
| Uygulama içi satın alma | **Var** — ürünler Connect'te tanımlanır; satın alma akışı RevenueCat üzerinden (`mobile/src/lib/billingConfig.ts`'te iOS anahtarı dolu) |
| Age Rating | §2 anketinden hesaplanır |

Satıcı, hizmet sağlayıcı ve gizlilik politikasındaki veri sorumlusu aynı kişi: **Musa
Atila** (Tufanbeyli, Adana; hukuki sürüm 1.7). **Samet Atila** (Dortmund) yalnız GDPR
m.27 AB temsilcisi (gerekçe `docs/play/listing.md` §5). Connect'teki yasal ad
`LEGAL_ENTITY.providerName` ile aynı olmalı, `euRepresentativeName` ile değil.

**DSA tüccar beyanı (AB storefront'larında satış için zorunlu).** App Store Connect ›
Business › "Digital Services Act" bölümünde hesap **trader** olarak beyan edilir (Premium
ücretli); Apple doğrulanmış **adres, telefon ve e-postayı** AB'deki App Store sayfasında
herkese açık gösterir, beyan edilmezse uygulama AB'de yayımlanmaz. Kimlik Musa'nınki
(`LEGAL_ENTITY.provider*`), e-posta `support@lernomi.app`; telefon numarası girilince
künye için `LEGAL_ENTITY`ye de eklenir. Beyan Connect arayüzünden elle yapılır.

**Abonelik (3.1.2):** Apple abonelik bilgisinin satın almadan önce uygulamada açıkça
gösterilmesini, metadata'da da kullanım şartları (EULA) ve gizlilik politikası
bağlantılarının bulunmasını istiyor. Bu belgenin önceki sürümü "satın alma kapalı, bu yüzden
açıklamalarda abonelikten söz edilmiyor" diyordu; anahtarlar artık dolu ve açıklamaların üç
dilinde bir "Ücretsiz ve Premium" paragrafı var (2026-09-14): Premium'un ne açtığı,
ücretsizde neyin kaldığı, aylık ya da yıllık otomatik yenilenen abonelik olduğu, fiyatın ve
varsa deneme süresinin satın almadan önce uygulamada gösterildiği, aboneliğin Apple
hesabının abonelik ayarlarından yönetildiği. Şartlar ve gizlilik bağlantıları metnin
sonunda. Fiyat metinde yok: App Store onu ülkeye göre kendisi gösteriyor ve sabit bir fiyat
cümlesi ilk fiyat değişikliğinde yanlış olur. Abonelik ürünlerinin kendi görünen adı ve
açıklaması Connect'te ürün sayfasında girilir (`docs/premium/README.md` §3.1).

---

## 6. Yasaklar ve metadata kuralları

Play'deki metin kuralları (`docs/play/listing.md` §3.4) burada da geçerli; Apple'a özgü olanlar:

- **Rakip adı yok.** Başka bir uygulamanın adı ne açıklamada ne `keywords`te geçer;
  Apple başkasının markasını anahtar kelime olarak kullanmayı reddediyor.
- **Sınav markası yok** — ne ad ve altyazıda, ne `keywords`te, ne açıklamada, ne ekran
  görüntüsü altyazısında. Karar ve gerekçe `docs/play/listing.md` §4.2; §7'deki açık madde
  bununla kapandı. `keywords`te markanın yerini tanımlayıcılar aldı: `sertifika,seviye` (tr),
  `zertifikat,niveau` (de), `zertifikat,level` (en).
- **Başka platform adı yok (2.3.10).** App Store metninde "Google Play" ya da "Android"
  geçmez; abonelik yönetimi cümlesi bu yüzden Play metninden farklı.
- **Abartı, garanti ve fiyat yok.** "En iyi", "1 numara", "garantili geçiş" gibi iddialar yok.
- **Olmayan özellik yok; Premium açıkça yazılır.** Kapsam cümleleri `docs/play/listing.md`
  §3.0'daki ölçümden geliyor. Premium gerektiren özellik (Cepte yürüyüş, tüm deneme
  sınavları) anıldığı cümlede Premium diye geçer (2.3.2); adlar uygulamanın paywall
  cümlesiyle aynı ve "sınırsız" denmez (3.1.2(a)).
- **Promo kodu yok.** iOS'ta uygulama içinde kendi promo kodumuz yok (indirim yalnız Apple
  teklif koduyla); App Store metninde promo kodu, davet ödülü ya da "kodla Premium" anılmaz
  (3.1.1).
- **iOS'ta cihazda doğrulanmamış bir iddia var.** Açıklama, ekran kapalıyken çalışan Cepte
  yürüyüşü Premium özelliği olarak anıyor. iOS'ta bu yol kodda var ama cihazda koşulmadı
  (`docs/appstore/README.md`, "Ekran kapalıyken yürüyüş modu"). TestFlight'ta doğrulanmadan
  gönderilecekse iOS açıklamasından o yarım cümle çıkarılmalı; aksi hâlde 2.3.1 riski.
- **Çocuk vurgusu yok** (§2.4).

---

## 7. Açık kararlar

| # | Karar | Kim verir | Durum |
|---|---|---|---|
| 1 | Web/uygulama İngilizce ayrışması kapatılacak mı | Ürün | **Kapandı (içerikle)** — aşağıya bak |
| 2 | `keywords`te `telc` denensin mi, baştan güvenli sürüm mü kullanılsın | Ürün | **Kapandı (2026-09-14): hiçbir sınav markası kullanılmıyor** — aşağıya bak |
| 3 | App Preview videosu çekilecek mi — arka planda mikrofon isteyen bir uygulamada incelemeyi en hızlı geçiren şey | Ürün | Açık |
| 4 | Hesaplanan yaş derecesi Connect'te görülünce bu belgeye yazılacak (§2.3) | Yayın günü | Açık |

**2 numaralı karar — kapandı: marka kullanılmıyor.** Karar yalnız `telc` için değil, bütün
sınav markaları için verildi: üç dilde ad, altyazı, tanıtım metni, `keywords`, açıklama ve
ekran görüntüsü altyazıları markasız. Eski plan "önce markayla gönder, reddedilirse
`keywords`ten çıkar" idi; üç sebeple bırakıldı:

1. **Tanımlayıcı kullanım savunması tutmuyor.** Savunma "sınavın biçimini tarif ediyoruz"
   idi, ama uygulamanın hiçbir yerinde o sınavın adı geçmiyor ve deneme kâğıtları
   Lernomi'nin kendi yazdığı kâğıtlar; içerik kapısı markayı zaten yasaklıyor
   (`scripts/check-mock-exams.ts`). Uygulamada karşılığı olmayan bir ad vitrinde durunca
   2.3.1 (metadata uygulamayı yansıtmalı) ve 2.3.7 / 4.1(c) / 5.2.1 (başkasının markası) aynı
   anda devreye giriyor.
2. **Ret ucuz değil.** Reddedilen metadata incelemeyi bir tur geciktirir; ilk gönderimde
   zaten beklenen başka kapılar var (abonelik, arka plan sesi, hesap silme).
3. **Play'de karşılığı yok.** Play'de `keywords` alanı yok; marka doğrudan açıklamada
   duruyordu ve orada bir kurumla bağlantı ya da onay iması olarak okunabiliyor. İki
   mağazada aynı karar tutarlı.

Yerine: `keywords`te `sertifika,seviye` / `zertifikat,niveau` / `zertifikat,level`;
açıklamada "CEFR seviyelerine göre deneme sınavları" (de: "GER-Niveaus") ve marka anmadan
bağlantısızlık cümlesi ("hiçbir sınav kurumuyla bağlantılı değildir ve resmî bir sertifika
yerine geçmez"). Tam gerekçe `docs/play/listing.md` §4.2.

**1 numaralı karar — kapandı: iki platform aynı İngilizce içeriği taşıyor.** Madde,
uygulamada İngilizce kursun A1–A2 olduğu ve web'de yalnız kelime katmanının bulunduğu
dönemde açılmıştı. 2026-09-14 ölçümü: web'de `src/lib/lessons/content/en-{a1,a2,b1,b2,c1}.json`
(seviye başına 100 ders), `src/lib/skills/content/en-*` ve `src/lib/mock-exams/en/` (60 kâğıt)
var ve `src/lib/courses.ts` İngilizce kurs için "Kelime, ders, beceri ve deneme sınavı
katmanları hazır" diyor; mobil pakette de aynı ders ve kâğıt sayıları var
(`mobile/src/data/lessons/en-*.json`, `exams/papers-en.json`; beceri alıştırmaları
`skills/exercises-en.json`). Ayrışma kalmadı; vitrin metni iki platformu da doğru anlatıyor.

---

## 8. Ad kontrolü (rapor B28)

App Store'da "Lernomi" adlı bir uygulama yok: Apple'ın arama ucu (iTunes Search API,
`entity=software`) 2026-09-14'te us, gb, tr, de, at, ch, fr ve nl vitrinlerinde adında,
satıcı adında ya da paket kimliğinde "lernom" geçen hiçbir uygulama döndürmedi
([örnek sorgu](https://itunes.apple.com/search?term=lernomi&entity=software&country=tr)).
Play'de de aynı adla uygulama yok; eski "Play'de çakışıyor" notu doğrulanmadı. TMview
(EUIPO, TÜRKPATENT, WIPO Madrid dahil) ve USPTO'da "LERNOMI" işareti çıkmadı; WIPO Global
Brand Database ile TÜRKPATENT'in kendi araştırma ekranı otomatik sorguya kapalıydı. Sorguların
tamamı, yakın yazımlı işaretler ve profesyonel marka araştırması önerisi `docs/play/listing.md`
§4.1'de; ad iki mağazada aynı olduğu için kayıt tek yerde tutuluyor.
