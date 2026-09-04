# App Store — yaş derecelendirmesi ve mağaza vitrini (Lernomi, iOS)

`docs/play/listing.md`'nin iOS karşılığı. **Kopyası değil:** Apple'ın alanları farklı,
limitleri daha dar ve arama Play'inkiyle aynı yerden beslenmiyor. Aşağıdaki metinler
Play metinlerinden türetildi ama her biri Apple'ın kendi kutusuna göre yeniden yazıldı.

Kaynak yine aynı: uygulamadaki gerçek içerik. Rakip adı, olmayan özellik ve abartılı
iddia yok (App Review Guidelines 2.3 — "Accurate Metadata").

Kimlik ve alan adı kesinleşince `[[...]]` yer tutucuları doldurulur.

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

> `Almanca kelime, konuşma ve Goethe/telc hazırlığı. Kısa turlar, yürürken pratik.`

Bu cümle iki şey söylüyor: **ne öğretiyor** (kelime + konuşma + sınav) ve **nasıl
kullanılıyor** (kısa turlar, yürürken). 30 karakterlik Subtitle'a ikisi birden sığmıyor.

**Tutulan:** yürürken + sınav → `Yürürken konuş, sınava çalış` (28).
Uygulama adı zaten "Almanca Öğren" dediği için altyazının onu tekrar etmesine gerek yok;
ayırt edici olan yürüyüş modu, sınav ise arayanın niyetini yakalayan sözcük.

**Feda edilen:** "kelime" ve "kısa turlar". Yani ürünün çekirdek mekaniği (aralıklı
tekrarlı kelime turları) vitrinin en üstünde görünmüyor. Nereye gitti:

- `kelime`, `ezber`, `tekrar` → **Keywords** (aranabilir ama görünmez).
- "kısa turlar / günde on dakika" → **Promotional Text** (görünür, açıklamanın üstünde
  durur ve inceleme beklemeden değiştirilebilir).

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
   politikası §12 de aynı yaşı söylüyor. Kodda yaş kapısı yok, yani doğruyu yalnız metin
   taşıyor — beyanların birbirini tutması şart.
2. **16-17 eklemek uygulamayı Play'in Aileler politikası kapsamına alırdı.** Açık uçlu
   yapay zekâ sohbeti, serbest metinli biyografi ve lider tablosu o kapsamda ek
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

### 2.3 Anket cevapları

| Anket başlığı | Cevap | Dayanak |
|---|---|---|
| Şiddet (çizgi film / fantastik / gerçekçi) | Yok | Ders içeriği sınav odaklı |
| Cinsel içerik veya çıplaklık | Yok | — |
| Müstehcen mizah / kaba dil | Yok | STT sonucunda küfür maskeleniyor; moderasyon süzgeci `src/lib/moderation.ts` |
| Korku / gerilim | Yok | — |
| Alkol, tütün, uyuşturucu | Yok | — |
| Kumar (gerçek ya da simüle) | Yok | Şans oyunu, kutu, çekiliş yok |
| Tıbbi / tedavi bilgisi | Yok | "Doktor randevusu" bir rol yapma sahnesi; tıbbi tavsiye verilmiyor |
| Yarışma (contests) | Yok | Haftalık sıralama ödülsüz |
| **Sınırsız web erişimi** | **Hayır** | Uygulama içi tarayıcı yok. Hukuki sayfalar `Linking.openURL` ile SİSTEM tarayıcısında açılıyor (`mobile/src/lib/legal.ts`); tek WebView `${API_BASE}/tts-bridge` sayfasını yüklüyor ve gezinme yüzeyi değil (`mobile/src/lib/ttsBridge.tsx:128`) |
| **Kullanıcı üretimi içerik** | **Evet** | Görünen ad, kullanıcı adı ve biyografi başkalarına görünüyor. Süzgeç + bildir/engelle + insan incelemesi var |
| **Kullanıcılar arası mesajlaşma** | **Hayır** | Özel mesajlaşma yok. Arkadaşlık, tepki ve dürtme sabit biçimli; serbest metin taşımıyor |
| **Reklam** | Hayır | Reklam SDK'sı yok |
| Uygulama içi satın alma | Bugün **Hayır** | RevenueCat anahtarları boş (`mobile/src/lib/billingConfig.ts`). Premium açılınca bu ayrı bir Connect alanı, ankete girmiyor |
| Yapay zekâ ile üretilen içerik | **Evet** | Rol yapma diyalogları; "gerçek kişi değil" bildirimi kalıcı, her yanıtın altında "Bildir" |

**Beklenen sonuç ve uyarı:** içerik soruları tamamen "yok" olduğu için hesaplanan derece
Play'deki IARC sonucuyla aynı yerde, yani DÜŞÜK çıkacak; kullanıcı üretimi içerik ve
yapay zekâ soruları onu bir kademe yukarı çekebilir. Kesin kademe anketin o günkü
biçimine bağlı ve **burada doğrulanamaz** — Connect'te form doldurulunca hesaplanan
değer bu belgeye yazılmalı.

### 2.4 İki mağaza neden farklı görünecek — ve inceleyene ne denecek

App Store'da hesaplanan derece büyük olasılıkla **18+'ın altında** kalacak, oysa kendi
kullanım şartlarımız hesap açmayı 18 yaşla sınırlıyor. Bu bir tutarsızlık **değil**, iki
farklı şeyin ölçüsü:

- **Yaş derecelendirmesi içeriğin uygunluğunu** anlatır. İçerikte yaş yükseltecek bir şey
  gerçekten yok.
- **18 sınırı bir sözleşme koşulu.** Kaynağı şartlar §3; sebebi açık uçlu yapay zekâ
  sohbeti ve serbest metinli sosyal katman, içeriğin sertliği değil.

Yapılacaklar, tam bu sırayla:

1. Ankete **doğru** cevap verilir. Dereceyi yukarı zorlamak için yanlış cevap işaretlemek
   metadata ihlalidir; Apple zaten dereceyi kendisi hesapladığı için işe de yaramaz.
2. "Made for Kids" / Kids kategorisi **seçilmez**, uygulama Çocuklar kategorisine
   girmez.
3. Vitrinde çocuk vurgusu olmaz: ekran görüntülerinde ve metinlerde "çocuk", "kids",
   "eğlenceli oyun" geçmez; maskot yalnız uygulama içinde kalır (Play'deki kuralın aynısı).
4. **App Review Information notlarına** bir cümle yazılır: hesap açmak kullanım şartları
   §3 gereği 18 yaş ve üzeri içindir, uygulama açık uçlu yapay zekâ sohbeti ve serbest
   metinli bir sosyal katman içerdiği için bu sınır konmuştur. İnceleyenin "derece 4+ ama
   şartlar 18 diyor" sorusunu soracağı yer burası.
5. Play'deki hedef kitle 18+ **değiştirilmez**. İki mağazanın sayısı farklı olacak ve
   sebebi bu belgede yazılı; sayıları eşitlemeye çalışmak ikisinden birini yanlış yapar.

---

## 3. Mağaza metinleri

Üç yerelleştirme: **tr, en, de**. Arayüz üç dilde (`mobile/src/i18n/`) ve `Info.plist`
`CFBundleLocalizations` üçünü sayıyor; vitrinin bir dili eksik kalırsa uygulama o dili
"desteklemiyor" gibi görünür.

Her yerelleştirme kendi ekran görüntülerini de ister (§4).

### 3.1 Türkçe (tr)

**App Name**

```
Lernomi: Almanca Öğren
```
_22/30 karakter._

**Subtitle**

```
Yürürken konuş, sınava çalış
```
_28/30 karakter._

**Promotional Text** (incelemesiz güncellenebilir)

```
Ekrana bakmadan çalış: kulaklığı tak, telefonu cebine at, yürürken Almanca konuş. Günde on dakika, kaldığın yerden.
```
_115/170 karakter._

**Keywords** (virgülle, virgülden sonra BOŞLUK YOK — boşluk da karakter sayılır)

```
goethe,telc,sınav,a1,b1,b2,kelime,ezber,tekrar,gramer,dinleme,okuma,telaffuz,zürih,ingilizce
```
_92/100 karakter._

**Description**

```
Lernomi, dil öğrenmeyi günlük bir alışkanlığa çeviren bir uygulamadır: kısa kelime
turları, gerçek sahnelerde konuşma pratiği ve Goethe/telc sınavlarına hedefli hazırlık.

YÜRÜRKEN ÇALIŞ
Ekrana bakmadan öğren: Türkçe ipucunu duy, Almancasını sesli söyle. Telefon cebindeyken
ya da ekran kapalıyken de dinler. Mikrofon yalnız sen yürüyüş modunu başlatınca açılır,
sesin yalnız tanıma için kullanılır ve saklanmaz.

KELİME TURLARI
Aralıklı tekrar her kelimeyi tam unutmak üzereyken önüne getirir. A1'den C1'e resmi
kelime listelerine dayanan içerik; çoktan seçmeli, yazma, dinleme, eşleştirme ve cümle
kurma alıştırmaları. Günde on dakika yeter.

DERSLER VE KONUŞMA PRATİĞİ
Her ders kısa bir anlatımla başlar, ardından bir karakterle gerçek bir sahnede
konuşursun: kafede sipariş, doktor randevusu, iş görüşmesi. Düzeltmeler anında gelir.
Karşındaki gerçek bir kişi değil, bir yapay zekâ; uygulama bunu ekranda sürekli söyler
ve her yanıtın altında bildirme düğmesi durur.

OKUMA, DİNLEME, YAZMA
Her seviyede okuma ve dinleme parçaları, yazma görevleri. Yazdıkların değerlendirilir ve
neyi neden düzeltmen gerektiğini görürsün.

SINAV HAZIRLIĞI
Goethe-Zertifikat ve telc Deutsch sınavlarının Lesen ve Hören bölümlerinin biçimine uygun
alıştırmalar. Lernomi bu kurumlarla bağlantılı değildir ve onlar tarafından onaylanmamıştır;
adlar yalnız sınav biçimini tarif etmek için geçiyor.

ARKADAŞLARINLA
Haftalık sıralama, arkadaş ekleme, tepkiler ve ortak görevler. Özel mesajlaşma yoktur.
Görünen ad, kullanıcı adı ve biyografi süzgeçten geçer; bildirme ve engelleme her ekranda
elinin altında.

KURSLAR
Almanca ve Zürih Almancası (Züritüütsch) kurslarında dersler, beceri alıştırmaları ve
sınav hazırlığı hazır. İngilizce kursunda şimdilik yalnız kelime turları var.

GİZLİLİK
Reklam yok, izleme yok, veri satışı yok. Hesabını uygulamanın içinden tek ekranda
silebilirsin.

Arayüz Türkçe, İngilizce ve Almanca.

Gizlilik politikası: [[SITE]]/privacy
Kullanım şartları: [[SITE]]/terms
```
_1978/4000 karakter._

**What's New**

```
İlk sürüm.
```
_10/4000 karakter._

### 3.2 İngilizce (en)

**App Name**

```
Lernomi: Learn German
```
_21/30 karakter._

**Subtitle**

```
Speak on the go, pass exams
```
_27/30 karakter._

**Promotional Text** (incelemesiz güncellenebilir)

```
Study without looking at the screen: headphones on, phone in your pocket, speak German while you walk. Ten minutes a day, right where you left off.
```
_147/170 karakter._

**Keywords** (virgülle, virgülden sonra BOŞLUK YOK — boşluk da karakter sayılır)

```
goethe,telc,exam,a1,b1,b2,vocabulary,flashcard,grammar,listening,reading,speaking,swiss
```
_87/100 karakter._

**Description**

```
Lernomi turns language learning into a daily habit: short vocabulary rounds, speaking
practice in real scenes, and focused preparation for the Goethe and telc exams.

PRACTICE WHILE YOU WALK
Learn without looking at the screen: hear the prompt in your language, say the German out
loud. It keeps listening with the phone in your pocket or the screen off. The microphone
opens only when you start walk mode; your audio is used for recognition only and is not
stored.

VOCABULARY ROUNDS
Spaced repetition brings each word back just before you would have forgotten it. Content
built on the official A1-C1 word lists: multiple choice, typing, listening, matching and
sentence building. Ten minutes a day is enough.

LESSONS AND SPEAKING PRACTICE
Each lesson starts with a short explanation, then you talk your way through a real scene:
ordering in a cafe, a doctor's appointment, a job interview. Corrections arrive
immediately. The character is an AI, not a real person; the app says so on screen at all
times and every reply has a report button.

READING, LISTENING, WRITING
Reading and listening passages and writing tasks at every level. Your writing is assessed
and you see what to fix and why.

EXAM PREPARATION
Lesen and Hören exercises that follow the format of the Goethe-Zertifikat and telc Deutsch
exams. Lernomi is not affiliated with or endorsed by those institutions; the names appear
only to describe the exam format.

WITH FRIENDS
A weekly leaderboard, friends, reactions and shared quests. There is no private messaging.
Display names, usernames and bios are filtered, and reporting and blocking are one tap
away on every screen.

COURSES
The German and Zurich German (Züritüütsch) courses have lessons, skill exercises and exam
preparation. The English course currently has vocabulary rounds only.

PRIVACY
No ads, no tracking, no data selling. You can delete your account from inside the app, on
one screen.

The interface is available in Turkish, English and German.

Privacy policy: [[SITE]]/privacy
Terms of use: [[SITE]]/terms
```
_2045/4000 karakter._

**What's New**

```
First release.
```
_14/4000 karakter._

### 3.3 Almanca (de)

> **Almanca vitrin için açık karar.** Almanca konuşan bir kullanıcının bu uygulamada
> alabileceği kurslar İngilizce (şimdilik yalnız kelime turları) ve Zürih Almancası;
> Almanca kursunun derin içeriği onun işine yaramaz. Yani üç vitrin arasında **arkasında
> en az ürün olan** Almanca olan. İki seçenek var: (a) aşağıdaki dürüst metinle yayına
> girmek, (b) İngilizce dersleri gelene kadar Almanca vitrini hiç açmamak — ama o zaman
> uygulama arayüzünde olan bir dil mağazada olmaz. **(a) öneriliyor**; metin İngilizce
> kursunun kelimeyle sınırlı olduğunu açıkça söylüyor, dolayısıyla 2.3 açısından temiz.
> Karar ürün tarafının.

**App Name**

```
Lernomi: Deutsch & Englisch
```
_27/30 karakter._

**Subtitle**

```
Sprechen üben, Wörter merken
```
_28/30 karakter._

**Promotional Text** (incelemesiz güncellenebilir)

```
Lernen ohne Bildschirm: Kopfhörer auf, Handy in die Tasche, unterwegs laut sprechen. Zehn Minuten am Tag, genau da weiter, wo du aufgehört hast.
```
_144/170 karakter._

**Keywords** (virgülle, virgülden sonra BOŞLUK YOK — boşluk da karakter sayılır)

```
goethe,telc,prüfung,a1,b1,b2,vokabeln,karteikarten,grammatik,hören,lesen,zürich,schweiz
```
_87/100 karakter._

**Description**

```
Lernomi macht Sprachenlernen zur täglichen Gewohnheit: kurze Vokabelrunden,
Sprechpraxis in echten Szenen und gezielte Vorbereitung auf die Goethe- und telc-Prüfungen.

UNTERWEGS ÜBEN
Lernen ohne Bildschirm: Du hörst die Vorgabe in deiner Sprache und sprichst die Antwort
laut aus. Die App hört weiter zu, wenn das Handy in der Tasche steckt oder der Bildschirm
aus ist. Das Mikrofon geht nur an, wenn du den Gehmodus startest; deine Aufnahme dient
allein der Erkennung und wird nicht gespeichert.

VOKABELRUNDEN
Verteilte Wiederholung legt dir jedes Wort genau dann wieder vor, wenn du es fast
vergessen hättest. Inhalte auf Basis der offiziellen Wortlisten von A1 bis C1: Auswahl,
Tippen, Hören, Zuordnen und Sätze bauen. Zehn Minuten am Tag reichen.

LEKTIONEN UND SPRECHPRAXIS
Jede Lektion beginnt mit einer kurzen Erklärung, danach sprichst du dich durch eine echte
Szene: Bestellung im Café, Arzttermin, Vorstellungsgespräch. Korrekturen kommen sofort.
Dein Gegenüber ist eine KI und kein echter Mensch; die App sagt das dauerhaft auf dem
Bildschirm, und unter jeder Antwort steht eine Meldefunktion.

LESEN, HÖREN, SCHREIBEN
Lese- und Hörtexte sowie Schreibaufgaben auf jedem Niveau. Deine Texte werden bewertet und
du siehst, was du warum ändern solltest.

PRÜFUNGSVORBEREITUNG
Lesen- und Hören-Aufgaben im Format der Prüfungen Goethe-Zertifikat und telc Deutsch.
Lernomi steht in keiner Verbindung zu diesen Institutionen und ist von ihnen nicht
zertifiziert; die Namen beschreiben ausschließlich das Prüfungsformat.

MIT FREUNDEN
Wochenrangliste, Freundschaften, Reaktionen und gemeinsame Aufgaben. Private Nachrichten
gibt es nicht. Anzeigename, Benutzername und Bio werden gefiltert; Melden und Blockieren
sind auf jedem Bildschirm erreichbar.

KURSE
In den Kursen Deutsch und Zürichdeutsch (Züritüütsch) gibt es Lektionen, Übungen und
Prüfungsvorbereitung. Der Englischkurs enthält derzeit nur Vokabelrunden.

DATENSCHUTZ
Keine Werbung, kein Tracking, kein Datenverkauf. Dein Konto kannst du in der App auf einem
einzigen Bildschirm löschen.

Die Oberfläche gibt es auf Türkisch, Englisch und Deutsch.

Datenschutzerklärung: [[SITE]]/privacy
Nutzungsbedingungen: [[SITE]]/terms
```
_2190/4000 karakter._

**What's New**

```
Erste Version.
```
_14/4000 karakter._

---

## 4. Görseller

Uygulama iPad'i de destekliyor (`TARGETED_DEVICE_FAMILY = "1,2"`), bu yüzden iPad ekran
görüntüsü **zorunlu**.

| Varlık | Ölçü | Zorunlu mu | İçerik |
|---|---|---|---|
| Uygulama ikonu | 1024×1024 PNG, opak, şeffaflık ve yuvarlatma YOK | Evet | `Images.xcassets/AppIcon.appiconset/AppIcon-1024.png` (Şerit R üretti) |
| iPhone 6.9" | 1290×2796 (ya da 1320×2868) | **Evet** | Aşağıdaki sıra |
| iPad 13" | 2064×2752 (ya da 2048×2732) | **Evet** (iPad desteklendiği için) | Beceriler ve ders ekranı, yatay düzen |
| Küçük iPhone boyutları | — | Hayır | Apple 6.9"dan türetiyor; **Connect'teki güncel listeye bakılmalı**, Apple bu kuralı sık değiştiriyor |
| App Preview (video) | boyut başına en çok 3, 15-30 sn | Hayır | Yürüyüş modu videosu incelemede en çok işe yarayan şey (bkz. §6) |

Boyut başına, **yerelleştirme başına** en çok 10 görsel; arama sonucunda ilk üçü görünür,
o yüzden sıra önemli:

1. Günlük tur (kelime turu)
2. Yürüyüş modu — ekran kapalı çalışma
3. Ders diyaloğu (yapay zekâ sahnesi, "gerçek kişi değil" bildirimi görünür durumda)
4. Beceriler: okuma / dinleme / yazma
5. Sınav hazırlığı
6. Haftalık sıralama

Ekran görüntüleri gerçek cihazdan ve gerçek hesapla alınır; yer tutucu veri olmaz. Üstüne
yazılan metin uygulamadaki özelliği anlatır, fiyat ya da vaat içermez. **Üç
yerelleştirmenin görselleri de kendi dilinde** olmalı — arayüz Türkçe görünen bir ekran
görüntüsünü Almanca vitrine koymak 2.3.3'e takılır.

---

## 5. Diğer alanlar

| Alan | Değer |
|---|---|
| Primary Language | Türkçe |
| Bundle ID | `app.lernomi.ios` |
| Primary Category | Education |
| Secondary Category | Reference |
| Copyright | `2026 [[YAYINCI_ADI]]` — `LEGAL_ENTITY.publisherName` ile aynı |
| Support URL | `[[SITE]]/` (destek e-postası sayfada görünür) |
| Marketing URL | `[[SITE]]` (isteğe bağlı) |
| Privacy Policy URL | `[[SITE]]/privacy` — **zorunlu** |
| Uygulama içi satın alma | Bugün **yok**; premium açılınca ürünler Connect'te tanımlanır |
| Age Rating | §2 anketinden hesaplanır |

Yayıncı **Musa Atila** (Tufanbeyli, Adana), gizlilik politikasındaki veri sorumlusu ise
**Samet Atila** (Dortmund). Ayrım bilinçli ve gerekçesi `docs/play/listing.md` §5'te;
App Store'da da aynı şekilde kalır — Connect'teki yasal ad `LEGAL_ENTITY.publisherName`
ile aynı olmalı, `controllerName` ile değil.

**Abonelik açılırsa:** Apple 3.1.2 gereği abonelik uygulamalarında başlık, süre, fiyat ve
kullanım şartları/gizlilik bağlantısı metadata'da bulunmalı. Bugün satın alma kapalı
(`billingConfig.ts` anahtarları boş) ve bu yüzden açıklamalarda abonelikten hiç söz
edilmiyor. Premium canlıya alınırken açıklamalara abonelik paragrafı **eklenmeli**,
aksi hâlde 3.1.2'den reddedilir.

---

## 6. Yasaklar ve metadata kuralları

- **Rakip adı yok.** "Duolingo", "Babbel" gibi adlar ne açıklamada ne `keywords`te geçer.
  Apple, başkasının markasını anahtar kelime olarak kullanmayı reddediyor.
- **Goethe / telc riski.** İki ad da tescilli marka. Açıklamada tanımlayıcı kullanım
  (sınav biçimini anlatmak) ve açık bir "bağlantılı değiliz" cümlesi var; bu savunulabilir.
  `keywords` alanındaki `goethe,telc` ise daha riskli — Apple marka içeren anahtar
  kelimeleri reddedebiliyor. **Reddedilirse:** ikisini `keywords`ten çıkar, yerine
  `zertifikat,niveau` (de/en) ve `sertifika,seviye` (tr) koy; açıklamadaki tanımlayıcı
  kullanım kalabilir. Bu bir yayın engeli değil, tek alanda geri adım.
- **Abartı yok.** "En iyi", "1 numara", "garantili geçiş" gibi iddialar yok.
- **Olmayan özellik yok.** Tam deneme sınavı, reklamsız premium ve İngilizce dersleri
  metinlerde geçmiyor; İngilizce kursunun kelimeyle sınırlı olduğu üç dilde de yazılı.
- **Çocuk vurgusu yok** (§2.4).

> **`docs/play/listing.md`'de düzeltilmesi gereken bir cümle var** ve bu belgenin konusu
> değil, o yüzden burada yalnız not düşülüyor: Play'in tam açıklaması "Zürih Almancası
> (Züritüütsch) kursu ve İngilizce kursu da mevcuttur" diyor. İngilizce kursunda ders ve
> beceri içeriği yok, yalnız kelime turları var (`src/lib/courses.ts`: "Kelime katmanı
> hazır; ders/beceri içeriği henüz yok"). Aynı cümle Play'de de eksik özellik beyanı
> sayılabilir; Şerit T ya da Play belgelerinin sahibi düzeltmeli.

---

## 7. Açık kararlar

| # | Karar | Kim verir |
|---|---|---|
| 1 | Almanca vitrin açılsın mı, yoksa İngilizce dersleri gelene kadar beklesin mi (§3.3) | Ürün |
| 2 | `keywords`te `goethe,telc` denensin mi, baştan güvenli sürüm mü kullanılsın (§6) | Ürün |
| 3 | App Preview videosu çekilecek mi — arka planda mikrofon isteyen bir uygulamada incelemeyi en hızlı geçiren şey | Ürün |
| 4 | Hesaplanan yaş derecesi Connect'te görülünce bu belgeye yazılacak (§2.3) | Yayın günü |
