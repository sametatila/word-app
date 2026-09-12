# İngilizce kursun ünite egzersizleri (WP-75) — 2026-09-11

**Açılıştaki kusur.** WP-74 İngilizce kursun DERS katmanını kapattı (A1'den
C1'e 500 ders). Kapanır kapanmaz Patika'nın öteki yarısı görünür oldu:
İngilizce kursun **hiçbir seviyesinde ünite egzersizi yoktu**.

| Kurs · seviye | ünite egzersizi | kütüphane |
|---|---|---|
| de A1/A2/B2/C1 | 150 (25 ünite × 6) | 25 |
| de B1 | 270 (45 ünite × 6) | 25 |
| **en A1…C1** | **0** | 25 |

100 ders 25 ünite eder (`UNIT_LESSONS = 4`) ve her ünitenin deseni
`4 ders + 2 okuma + 2 dinleme + 2 yazma + gramer + tekrar + kontrol`.
Yani İngilizce öğrencisi her ünitede **altı boş yuva** görüyordu: başlığı
"Okuma", altı "yakında", `ref: null`, tıklanmıyor. Beş seviyede
**750 boş yuva**.

Beceriler kütüphanesi (WP-90, kurs × seviye × beceri başına beş egzersiz)
bu boşluğu KAPATMIYOR ve kapatmamalı: kütüphane `unit` alanı taşımıyor,
Patika ona hiç bakmıyor (`build.ts` → `pathMetas`) ve ölçüsü başka —
kütüphanede öğrenci seviyeyi kendi seçiyor, Patika'da ünite sırayla
geliyor.

## Sözleşme

Almanca kursun ünite dosyalarının aynısı; `src/lib/skills/content/`
altında `en-<seviye>-u<NN>.ts`, kimlik `en-<seviye>-u<n>-<r|l|w><1|2>`,
her dosya ünite başına altı egzersiz. Sıra ÖNEMLİ: builder yuvaları liste
sırasıyla dolduruyor, yani ünite n'in dosyası `en-<seviye>.ts` içinde
n'inci sırada durur.

- **Ünitenin kendi kelimesi.** İçerik o üniteye kadar öğretilen kelime ve
  kalıpların dışına çıkmaz; çıkan her sözcük egzersizin sözlükçesinde
  verilir. Ölçü `npm run check:en-unitvocab -- <seviye>`.
- **En az iki yazılı soru.** `test:content` kuralı; okuma/dinlemede
  gapfill + short_answer/dictation/order.
- **Sözlükçe metinden.** Sözlükçedeki her madde egzersizin kendi metninde
  geçer (aynı kural, `test:content`).
- **Anadil ekseni.** Her egzersiz iki hatta karşılık ister:
  `data/skills/prose-de` (intro/explain/gloss.tr → Almanca) ve
  `data/skills/task-de` (görev metinleri → Almanca). İngilizce yönü
  (`prose`, `task`) Almanca kursun egzersizlerini taşıyor; İngilizce kursun
  egzersizleri oraya girmiyor, çünkü anadili İngilizce olan kullanıcı
  İngilizce kursu almıyor.

## Ölçüm: `check:en-unitvocab`

Almanca `check:unitvocab`'ın karşılığı. Ölçen makine iki denetleyicide
ORTAK (`scripts/lib/en-gate.ts`): serbest işlev sözcükleri, düzensiz fiil
tablosu, gövde türetme. Havuzu çağıran veriyor —
`check:libvocab` seviyeyi, bu betik "bu üniteye kadar öğretilenler"i.
Makine kütüphane denetleyicisinden çıkarıldı, kopyalanmadı: kopya
ayrışınca iki denetleyici aynı metin için farklı oran basardı.

Kapı değil rapor: çıkan sözcüğün sözlükçeye mi gireceğine yoksa metinden
mi çıkacağına yazar karar verir.

## Durum

| Seviye | Ünite | Durum |
|---|---|---|
| **A1** | **1–25** | **TAM** (2026-09-11/12) — 150 egzersiz, 150/150 yuva |
| **A2** | **1–25** | **TAM** (2026-09-12) — 150 egzersiz, 150/150 yuva |
| **B1** | **1–25** | **TAM** (2026-09-12) — 150 egzersiz, 150/150 yuva |
| B2 | 1–6 | **yazıldı** (2026-09-12) — 36 egzersiz, 36/150 yuva |
| B2 | 7–25 | bekliyor |
| C1 | 1–25 | bekliyor |

**A1 ünite 1 (2026-09-11).** Dört dersi Hello! · How are you? · I am, you
are · Where are you from?. Altı egzersiz: iki okuma ("Three names",
"Are you a student here?"), iki dinleme ("My name is Ava", "Excuse me,
are you Mr. Kaya?"), iki yazma ("I introduce myself", "Questions and
answers"). Ünite dışı ölçüm %0,3 — kalan tek belirteç metnin ilk
sözcüğü olan özel ad.

Almanca kursun ilk ünitesinden bilerek AYRILAN yer: burada ilk üniteye
dikte konuldu. Gerekçe İngilizcenin kendi zorluğu — „I am a teacher“
söylendiğinde „I'm a teacher“ duyuluyor ve öğrenci bunu ilk günden ayırt
etmek zorunda; Almancada bu ünitede öyle bir büzülme yok.

Anadil ekseni aynı turda kapandı: `prose-de` s-017 (43 dize),
`task-de` t-010 (22 dize). İki satır çeviri değil YENİDEN ÖLÇÜM istedi —
"Türkçede tek sözcük olan soru" ve "İngilizcede özne düşmez" Almanca
okuyan için doğru değil (Almanca da özneyi düşürmez, „woher“ de tek
sözcüktür); Almanca karşılıkları İngilizceyi Almancaya karşı ölçüyor.

**A1 ünite 2–3 (2026-09-11).** Ünite 2 dersleri Languages · Numbers 1-100 ·
Spelling · Jobs; ünite 3 dersleri Age and birthday · Filling a form ·
My family · Brothers and sisters. On iki egzersiz; ünite dışı ölçüm
%0,2 — kalan iki belirteç, diyalog metninin ilk sözcüğü olan iki konuşmacı
adı.

Ölçüm bu turda bir kez daha düzeltildi: form egzersizindeki
`deniz.yalin@mail.com` noktalarından bölünüp dört ayrı "kelime"
sayılıyordu ve egzersizi %10 dışı gösteriyordu. Adres bir dizedir,
öğrenilecek bir sözcük değil; e-posta ve ağ adresleri artık ölçüm
yüzeyinden düşüyor.

**`gloss.note` türü açıldı.** Ünite 3 „His name is …“ ile „Her name is …“
maddelerini yan yana koyuyor ve Türkçe karşılıkları AYNI ("onun adı …");
ayıran tek şey not. Not, `tr` alanına parantezle yapıştırılamaz
(`data/content/SPEC.md`) ve çevrilmeden bırakılamaz — Almanca okuyan
kullanıcı kelimenin altında Türkçe bir cümle görürdü. `prose-de/make.ts`
o yüzden yeni bir tür taşıyor; sıralamada EN SONDA, böylece yazılmış
paketlerin hiçbiri kaymıyor.

İki satır yine YENİDEN ÖLÇÜM istedi, biri tersi yönde: "Türkçe iyelik eki
isme takılıyor, İngilizce ayrı sözcük koyuyor" Almanca okuyan için bir
GÜÇLÜK DEĞİL, kolaylık — Almanca da ayrı sözcük koyuyor ve „sein“/„ihr“
de sahibe bakıyor. Almanca karşılık bunu söylüyor ve asıl farkı gösteriyor:
„my“ hiç çekilmiyor. Tersine "soru „do“ ile başlar" satırı Almanca okuyan
için Türkçe okuyandan DAHA zor, çünkü Almancada yardımcı fiille soru kurma
diye bir şey yok — o satır Almancada uzuyor.

**A1 ünite 4–6 (2026-09-11).** Ünite 4 dersleri I don't … · Pets ·
In the photo · One or many; ünite 5 What he looks like · My friends ·
Relatives · What people are like; ünite 6 At the café · Breakfast ·
At the kiosk · At the restaurant. On sekiz egzersiz; ünite dışı ölçüm
%0,0 (tek belirteç kaldı).

Ölçüm üçüncü kez düzeltildi ve bu sefer bir KÖR NOKTA kapandı. Okuma
diyaloğunda konuşmacı adı metnin içinde, satır başında duruyor
("Mert: Hello!"); dinlemede ise kendi alanında (`segments[].speaker`) ve
ölçüme hiç girmiyor. Aynı ad, yalnızca biçim yüzünden bir egzersizde
sayılıp ötekinde sayılmıyordu. Üstelik satır başındaki ad ortak makinenin
özel-ad kuralının tek kör noktası: cümle başı sayıldığı için büyük harf
onu kurtarmıyor. Etiket artık ölçüm yüzeyinden düşüyor ve okuma metni
satır satır veriliyor.

Ünite 6 sayılabilirliği öğretiyor („a coffee“ bir fincan, „coffee“ madde;
„some“ olumluda, „any“ soruda) ve bu, Almanca eksende ilginç bir satır
üretti: Türkçe yönerge "Türkçede böyle bir ayrım yok" diyor ve Almanca
karşılık bunu DOĞRULUYOR — Almanca da bu ayrımı yapmıyor. Yeniden ölçüm
her zaman farkı büyütmüyor; bazen iki dilin aynı yerde eksik olduğunu
söylüyor.

**A1 ünite 7–9 (2026-09-11).** Ünite 7 Favourite food · At the market ·
Cooking together · Drinks; ünite 8 Fruit and vegetables ·
Paying the bill · Daily routine · Telling the time; ünite 9
Days of the week · get up, wake up · Always, usually, never ·
My morning. On sekiz egzersiz; ünite dışı ölçüm %0,0.

Ünite 8 Almanca eksende bu hattın EN SERT yeniden ölçümünü üretti. Türkçe
açıklama "„half past seven“ yedi buçuk, sekiz buçuk değil" diyor ve bu
Türkçe okuyan için doğru. Almanca okuyan için TERSİ geçerli: Almanca
„halb acht“ 7:30 demek, yani Almanca sayım gelecek saate doğru, İngilizce
sayım geçmiş saatten uzağa. Satırı çevirmek Almanca okuyana yanlış bilgi
verirdi; Almanca karşılık „half past seven“in „halb acht“ olduğunu ve iki
sayımın ters yönde çalıştığını söylüyor.

Aynı yönde üç satır daha açıldı: „prefer … to …“de Almanca „lieber als“
tam da yasak olan „than“a itiyor; „a kilo of apples“taki „of“un Almancada
karşılığı hiç yok („ein Kilo Äpfel“); sıklık zarfı İngilizcede ana
fiilden önce, Almancada sonra geliyor („I always drink“ / „ich trinke
immer“). Dördü de çeviri değil, Almancaya karşı yeniden ölçüm.

**A1 ünite 10–12 (2026-09-11).** Ünite 10 A work day · After work ·
Weekend plans · What time …?; ünite 11 Buying clothes · Size and
fitting · Colours · Asking prices; ünite 12 I like it · Exchange and
return · Choosing a gift · How many, how much. On sekiz egzersiz; ünite
dışı ölçüm %0,0. Patika'nın EN A1 yuvalarının 72'si dolu.

Almanca eksende bu turun yeniden ölçümü SIFAT ÇEKİMİ. Türkçe ipucu
"renk isimden önce gelir, Türkçedeki sırayla aynı, ama sıfat hiç
çekilmez" diyor ve Türkçe okuyan için ikinci yarı zaten doğal —
Türkçe de çekmiyor. Almanca okuyan için ise TAM TERSİ: „ein rotes Auto“,
„zwei rote Autos“. Almanca karşılık sırayı Almancayla eşliyor, çekimi ise
karşıtlık olarak veriyor.

Karşı yönde iki satır da parite çıktı ve bu da kayda değer: „it suits
you“ Almanca „es steht dir“le bire bir aynı yapıda, „enough time“ ile
„good enough“ da „genug Zeit“ ve „gut genug“la. Yeniden ölçüm bunları
büyütmüyor, „genau wie im Deutschen“ diyerek öğrenciye kolaylık
gösteriyor.

**A1 ünite 13–15 (2026-09-11).** Ünite 13 Personal care items ·
Ordering online · Asking directions · Public transport; ünite 14
Buying a ticket · Delays · In a taxi · Near and far; ünite 15
Places to visit · Getting lost · By bike · At the information desk.
On sekiz egzersiz; ünite dışı ölçüm %0,0. Patika'nın EN A1 yuvalarının
90'ı dolu.

Almanca eksende bu turun yeniden ölçümü ULAŞIM EDATI. Türkçe ipucu
"araçta „by“ ve artikel YOK: by bus, by train. „with the bus“ yanlış"
diyor ve Türkçe okuyan için „with“ uzak bir hata. Almanca okuyan için ise
TAM O hata: Almanca „mit dem Bus“ diyor, yani hem edat hem artikel var.
Almanca karşılık yanlışı adıyla söylüyor.

„I'm lost“ satırı ters yönde açıldı: Türkçe ipucu "„lost“ sıfat, Türkçedeki
gibi fiil değil" diyor; Almanca da orada FİİL kullanıyor („ich habe mich
verlaufen“), yani uyarı Almanca okuyan için de geçerli — ama başka bir
dile karşı. Almanca karşılık karşılaştırmayı Almancayla yeniden kuruyor.

Parite tarafı da sürdü: „could you help me“ Almanca „könnten Sie mir
helfen“le bire bir aynı nezaket aracı, „wait for“ ile „warten auf“ aynı
edat zorunluluğu, „can visit“ ile „kann besichtigen“ aynı eksiz mastar.

**A1 ünite 16–18 (2026-09-12).** Ünite 16 Showing your home · Rooms ·
Where things are · Neighbours; ünite 17 House rules · Rent and bills ·
Housework · Moving house; ünite 18 Balcony and garden ·
Reporting a problem · Hobbies · Sports. On sekiz egzersiz; ünite dışı
ölçüm %0,0. Patika'nın EN A1 yuvalarının 108'i dolu.

Almanca eksende iki satır YASAK ile GEREKSİZLİK arasındaki farkı açtı.
Türkçe ipucu "„mustn't“ yasak demek" diyor ve Türkçe okuyan için bu
yeterli. Almanca okuyan için değil: „mustn't“ Almancada „musst nicht“
sanılıyor, oysa o "gerek yok" demek. Almanca karşılık doğru fiili veriyor
— „darfst nicht“.

İkinci satır varoluş cümlesinde: „there is“ / „there are“ sayıya göre
değişiyor, Almanca „es gibt“ ise HİÇ değişmiyor („es gibt ein Zimmer“,
„es gibt drei Zimmer“). Türkçe ipucu "Türkçede „var“ değişmezdi" diyor;
Almanca karşılık aynı gözlemi Almancaya taşıyor ve öğrenciye kendi
dilinden bir dayanak veriyor.

Parite tarafında bu ünite cömert çıktı: „go swimming“ ile „schwimmen
gehen“, „play football“ ile „Fußball spielen“ (artikelsiz), „es gibt“ ile
„there is“in ikisi de boş özne taşıması. Almanca karşılıklar bunları
„genau wie im Deutschen“ diye söylüyor.

**A1 ünite 19–21 (2026-09-12).** Ünite 19 Music · Cinema invitation ·
Weather small talk · In the park; ünite 20 At the pool · TV and series ·
Saying no politely · Making plans; ünite 21 Parts of the body ·
Describing pain · Doctor's appointment · Must and have to. On sekiz
egzersiz; ünite dışı ölçüm %0,0. Patika'nın EN A1 yuvalarının 126'sı dolu.

Bu tur Almanca eksende BÜYÜK ÖLÇÜDE PARİTE çıkardı ve bu kayda değer:
ünite 19'un hava cümlesi („It's raining“ — boş özne „it“) Almanca „es
regnet“le birebir; ünite 21'in ağrı kalıplarının İKİSİ de Almancada var
(„ich habe Kopfschmerzen“ ile „mein Rücken tut weh“), üstelik
„Kopfschmerzen“ de „headache“ gibi tek sözcük. Türkçe ipucu "Türkçe
yalnız birincisini kuruyor" diyor; Almanca okuyan için o güçlük hiç yok
ve karşılık bunu söylüyor.

Ayrıldığı yer ise „can't“: Türkçe ipucu "olumsuzu tek sözcük" diyor,
Almanca „kann nicht“ ise ayrı yazılıyor — yani büzülme İngilizcenin kendi
işi. Almanca karşılık bunu karşıtlık olarak veriyor.

**A1 ünite 22–25 — SEVİYE KAPANDI (2026-09-12).** Ünite 22 At the
pharmacy · Calling in sick · Friendly advice · Emergency; ünite 23
Healthy living · At the dentist · On the phone · Texting a friend;
ünite 24 A short email · Online and apps · At the post office ·
Yesterday I was; ünite 25 The -ed past · Did you...? · My last weekend ·
Staying in touch. Yirmi dört egzersiz.

**EN A1: 25 ünite, 150 egzersiz, 150/150 yuva dolu, 0 boş.** Ünite dışı
ölçüm %0,0 — kalan tek belirteç bir diyaloğun ilk sözcüğü olan özel ad.

Son ünite kapanışı içeriğin kendisinde de duruyor: A1'in son dinleme
metni bir veda („See you soon! Life is long.“) ve son yazma görevi
„Let's meet again.“ ile bitiyor.

Almanca eksende bu turun yeniden ölçümü GEÇMİŞ ZAMANIN KİŞİYE
BAĞLILIĞI. Türkçe ipucu "„I“ ile „was“ geliyor; Türkçede gövde
değişmezdi, burada değişiyor" diyor. Almanca okuyan için o güçlük YOK —
Almanca da „ich war“ / „du warst“ diye değişiyor. Buna karşılık „you“nun
hem tekil hem çoğul için „were“ alması Almanca okuyan için YENİ, çünkü
Almanca orada „du warst“ ile „ihr wart“ı ayırıyor. Aynı satırın iki
yarısı iki dile göre ters yönde çalışıyor ve Almanca karşılık ikisini de
söylüyor.

Düzenli fiilin kişiye göre değişmemesi de öyle: Türkçe için sıradan,
Almanca için fark („arbeitete“ / „arbeitetest“).

**A2 ünite 1–3 (2026-09-12).** Ünite 1 Irregular verbs · What were you
doing? · When and while · A year ago, last week; ünite 2 Telling a story ·
I used to... · My childhood · A holiday I remember; ünite 3 What
happened? · Asking about the past · Have you ever...? · Been and gone.
On sekiz egzersiz; ünite dışı ölçüm %0,0.

A2'nin ölçüsü A1'den farklı ve içerik ona uyuyor: okuma metni 100–180
kelime (A1'de 60–120), cümleler iki zamanı bir arada taşıyabiliyor.

Ölçüm makinesinde iki eksik kapandı. Birincisi: „somebody“, „anybody“ ve
„everybody“ serbest işlev sözcüğü listesinde yoktu, oysa „someone“,
„anyone“ ve „everyone“ vardı — aynı sınıfın yarısı eksikti. İkincisi:
iyelik eki gövdeyi gizliyordu, „writer's“ ancak „writer“a inebiliyor ama
oradan „write“a gidemiyordu, çünkü türetme kuralları yalnız ham belirtece
uygulanıyordu. İkisi de `lib/en-gate.ts`te düzeltildi ve
`check:libvocab` çıktısı değişmedi.

İçerik tarafında kapının kendi kuralı işledi: dört sözlükçe maddesi
mastar biçimindeydi („get in“, „fall asleep“, „fall down“, „ring“) ama
metin düzensiz geçmişi kullanıyor („got in“, „fell asleep“, „fell down“,
„rang“). `check-content.ts` bunu yakalıyor ve gerekçesi orada yazılı:
düzensiz fiilde sözlükçe METNİN kullandığı biçimi vermeli.

Almanca eksende iki satır açıldı. „ago“ sayıdan SONRA geliyor, Almanca
„vor zwei Tagen“ ise ÖNCE — yön ters. Ve „so“ bir yalancı dost: İngilizce
„so“ Almanca „also“ demek, Almanca „so“ değil; karşılık bunu adıyla
söylüyor.

**A2 ünite 4–6 (2026-09-12).** Ünite 4 Since and for · Already, yet, just ·
A life story · Will and going to; ünite 5 Hopes and plans · Comparatives ·
Superlatives · Then and now; ünite 6 Symptoms · Making an appointment ·
Giving advice · How long have you had it?. On sekiz egzersiz; ünite dışı
ölçüm %0,0. A2 yuvalarının 36'sı dolu.

Bu üç ünite Almanca eksende hattın en verimli turlarından birini verdi,
çünkü üçü de tam olarak Almancanın BAŞKA türlü çözdüğü yerlere basıyor.

`since`/`for` ayrımı bunların başında geliyor. Türkçe ipucu "başlangıç
noktası mı süre mi" diye ayırıyor; Almanca okuyan için bu ayrım YENİ,
çünkü Almanca „seit“ İKİSİNİ birden karşılıyor — „seit Montag“ da „seit
drei Tagen“ de aynı edat. Yani satır Türkçe okuyan için hatırlatma,
Almanca okuyan için haber; karşılık bunu adıyla söylüyor.

Aynı ünitede ikinci bir yeniden ölçüm var ve ters yönde: süre anlatan
İngilizce cümle present perfect istiyor („I have lived here for three
years“), Almanca ise ŞİMDİKİ zaman kullanıyor („ich wohne hier seit drei
Jahren“). Türkçe de şimdiki zaman diyor, yani burada Türkçe ile Almanca
aynı tarafta ve İngilizce yalnız. Karşılık bunu "Deutsch nimmt wie das
Türkische das Präsens" diye kuruyor — iki dili karşılaştırmadan güçlüğü
anlatmak mümkün değil.

`will`/`going to` ayrımında ise yeniden ölçüm satırı KÜÇÜLTÜYOR: Almanca
bu ayrımı hiç yapmıyor, „ich werde“ hem önceden kurulmuş planı hem o anda
verilmiş kararı taşıyor. Karşılık bunu bir cümleyle ekliyor, çünkü Almanca
okuyan "bende de böyle bir ayrım var" diye yanlış eşleme kurabilir.

Ünite 5'in karşılaştırma yükü tam tersi: İngilizce kısa sıfata „-er“,
uzun sıfata „more“ veriyor; Almanca ise HER sıfata „-er“ takıyor
(„wichtiger“, hiçbir zaman „mehr wichtig“ değil). Yani „importanter“
hatası Almanca okuyan için Türkçe okuyandan DAHA yakın bir tuzak, ve
karşılık bunu uyarı olarak yazıyor. Buna karşılık „good → better → the
best“ tam parite („gut → besser → der beste“) ve „the“ zorunluluğu
Almancadaki artikelle eşleşiyor.

Ünite 6'nın şikâyet kalıbı da parite çıktı: „I have a fever“ = „ich habe
Fieber“, „my throat is sore“ = „mein Hals tut weh“ — iki dilin ikisi de
aynı iki kalıbı taşıyor. Ayrıldığı yer `already`/`yet` yerleşimi:
„already“ yardımcı ile asıl fiil arasına giriyor ve Almanca „schon“ da
tam orada duruyor, ama „yet“ hep cümle SONUNDA ve Almanca „noch nicht“
cümle ortasında kalıyor.

İçerik tarafında ölçüm on bir sözlükçe maddesi ekletti („at the moment“,
„part“, „easier“, „flat“, „almost“, „less“, „brown“ …) ve bir soru
şıkkını yeniden yazdırdı: „less“ yalnız şıkta geçiyordu, metinde değil —
sözlükçeye eklemek yanlış olurdu, çünkü sözlükçe metnin sözlükçesi.
Bir doğru/yanlış kökü de değişti: „another city“ metinde hiç geçmiyordu,
„outside this city“ geçiyor.

**A2 ünite 7–9 (2026-09-12).** Ünite 7 Reading the label · At the hospital ·
Healthy habits · Health insurance; ünite 8 How are you feeling? ·
Getting better · Looking for a flat · My home; ünite 9 Furniture and rooms ·
Telling the landlord · Noisy neighbours · Moving in. On sekiz egzersiz;
ünite dışı ölçüm %0,0. A2 yuvalarının 54'ü dolu.

Ünite 7'nin tek noktası DOLAYLI SORU ve bu, Almanca eksende hattın en
temiz yarı-paritesini verdi. „Where is the ward?“ soru sırasıyla kurulur,
„Could you tell me where the ward is?“ içinde sıra düz cümleye döner.
Almanca da devrik sırayı bırakıyor — buraya kadar aynı — ama fiili CÜMLE
SONUNA atıyor: „wo die Station ist“. Yani uyarının yarısı Almanca okuyan
için hatırlatma, yarısı yeni; karşılık ikisini de söylüyor. Satırı olduğu
gibi çevirmek Almanca okuyana "senin dilinde de aynı" dedirtirdi, oysa
aynı değil.

Ünite 8'in ipi SIFATIN KENDİ EDATI. Türkçe ipucu "tahmin edilmez,
sözcükle birlikte öğrenilir" diyor; Almanca okuyan için bu uyarı GEÇERLİ
ama içi başka dolu — Almancada da sabit çiftler var, yalnız başkaları:
„Angst VOR“, „besorgt UM“. Karşılık uyarıyı korumakla kalmıyor, Almanca
çiftini de yazıyor, çünkü asıl tuzak burada: öğrenci kendi dilinin edatını
İngilizceye taşımaya çalışıyor.

Ünite 9'un noktası OLUMSUZ PRESENT PERFECT ve burada İngilizce yine yalnız
kalıyor. „The heating hasn't worked since Monday“ Türkçede şimdiki zaman
(„pazartesiden beri çalışmıyor“) — ve Almanca da şimdiki zaman kuruyor
(„die Heizung geht seit Montag nicht“). A2 ünite 4'teki olumlu süre
cümlesiyle aynı yapı, bu kez olumsuz tarafından: Türkçe ile Almanca aynı
tarafta, İngilizce tek başına. Karşılık bunu adıyla söylüyor.

Parite tarafı da geniş çıktı: „with“ ayrıntıyı Almancada da „mit“ ile
ekliyor („ein Balkon mit Ausblick“), „be“ sorusunda fiilin başa geçmesi
Almancada da böyle, „already“ ile „schon“ aynı yerde duruyor. Buna karşılık
sıfat çekimi A1'deki uyarısını sürdürüyor: „a bright flat“ çekimsiz,
„eine helle Wohnung“ çekimli.

Ölçüm bu turda dokuz sözlükçe maddesi ekletti (normal, desk, You're
welcome, the hard part, company, fourth, the best part, winter, party,
real) ve iki soruyu yeniden yazdırdı: „besides“ ile kurduğum soru kökü
metinde geçmeyen bir sözcük getiriyordu, `en-a2-u8-l2`nin dikte cümlesi de
bölümde virgülle sürdüğü için tam eşleşmiyordu — bölüm noktayla bitirildi.

**A2 ünite 10–12 (2026-09-12).** Ünite 10 Calling a repairman ·
Building rules · My neighbourhood · Local shops; ünite 11 Reading a job ad ·
My experience · At the interview · My workplace; ünite 12 What I do at work ·
A short meeting · Asking for time off · A problem at work. On sekiz
egzersiz; ünite dışı ölçüm %0,0. A2 yuvalarının 72'si dolu.

Ünite 10 A1'de yarım bırakılan işi tamamlıyor. Orada „mustn't“ tek başına
öğretilmiş ve Almanca eksende şu uyarı yazılmıştı: „mustn't“ Almancada
„musst nicht“ sanılıyor, oysa o „darfst nicht“. Şimdi üçlünün üçüncü ayağı
geliyor ve çaprazlama tamamlanıyor: „don't have to“ TAM OLARAK „du musst
nicht“. Yani iki dilin iki biçimi birbirinin karşısında duruyor, yalnız
ters eşleşiyor — bu, hattın en temiz „yanlış dost“ çifti ve iki satır
birlikte okunduğunda kendini açıklıyor.

Ünite 11 present perfect ile simple past'ı aynı özgeçmişte yan yana
koyuyor: „I have worked at a big company“ deneyimi, „I worked there for
two years“ kapanmış dönemi söylüyor. Almanca eksende bu ayrımın karşılığı
YOK — konuşulan Almanca ikisinde de Perfekt kuruyor („ich habe
gearbeitet“). Karşılık bunu iki yerde adıyla söylüyor, çünkü Almanca
okuyan öğrenci burada kendi diline yaslanamıyor; yaslanırsa iki biçimi de
aynı sanar.

Ünite 12 kibarlık merdivenini kuruyor: „Can I …?“ → „Could I …?“ →
„Would it be possible to …?“. Bu merdivenin Almancada birebir karşılığı
var („darf ich“ → „könnte ich“ → „wäre es möglich“), yani yeniden ölçüm
burada satırı BÜYÜTMÜYOR — Konjunktiv aynı işi görüyor. Buna karşılık
„I'll fix it today“ ile „going to“ arasındaki ayrım yine Almancada yok;
ünite 4'te açılan not burada tekrar gerekiyor, çünkü karar ile plan
ayrımı A2 boyunca dönüp duruyor.

Ölçüm bu turda on üç sözlükçe maddesi ekletti ve üç yeri yeniden
yazdırdı: „your own flat“ ile „In winter“ metinden çıkarıldı (ikisi de tek
sözcük için sözlükçe şişirecekti), bir soru kökündeki „another“ „far from
the team“ ile değiştirildi, ve bir dinleme bölümünün içindeki seslenme
(„Ela, do you have two minutes?“) kaldırıldı — konuşmacı etiketi satır
başındayken ölçümden düşüyor ama cümle İÇİNDEKİ ad düşmüyor, bu da
makinenin bilinen ve kabul edilmiş sınırı.

**A2 ünite 13–15 (2026-09-12).** Ünite 13 A work email · My first day ·
Returns and exchanges · Complaining about a product; ünite 14 Online orders ·
At the bank · Sending a parcel · A phone contract; ünite 15 At the hairdresser ·
Repair service · Comparing prices · Warranty and receipts. On sekiz egzersiz;
ünite dışı ölçüm %0,0. A2 yuvalarının 90'ı dolu.

Ünite 13 ünite 11'in bıraktığı yerden devam ediyor. Orada present perfect
ile simple past'ın FARKI öğretilmişti; burada SEÇİM KURALI geliyor: zaman
belirteci zamanı seçer. „ago“, „yesterday“, „last week“ varsa simple past
zorunludur ve „I have bought it two days ago“ diye bir cümle yoktur.

Almanca eksende bu, ünite 11'deki gözlemin sonucu ve tam olarak hatanın
doğduğu yer: Almanca „vor zwei Tagen“ ile Perfekt'i sorunsuz birleştiriyor
(„ich habe es vor zwei Tagen gekauft“), yani Almanca okuyan öğrenci kendi
cümlesini birebir çevirdiğinde yasak biçimi üretiyor. Karşılık bunu adıyla
söylüyor: „Deutsch dagegen sagt genau das“. Uyarıyı sessiz bırakmak burada
en pahalı seçenek olurdu, çünkü hata kaçınılmaz.

Ünite 14 karşılaştırmanın iki biçimini TEK cümlede buluşturuyor: „Express
is faster, but it's more expensive.“ Ünite 5 kuralı ayrı ayrı vermişti;
burada seçim aynı cümlenin içinde iki kez yapılıyor. Almanca eksende bu,
ünite 5'te açılan uyarının en keskin hâli — Almanca iki yarıda da „-er“
takıyor („schneller, aber teurer“), yani cümlenin ortasında strateji
değiştirmiyor. Karşılık bunu da yazıyor.

Ünite 15'in noktası ADIN YERİNİ TUTAN „one“. Türkçe hiçbir şey koymuyor
("bu daha ucuz"), Almanca da koymuyor („dieses ist billiger“) — yani
burada Türkçe ile Almanca AYNI tarafta ve İngilizce yalnız, tıpkı A2 ünite
4'ün süre cümlesinde olduğu gibi. Bu, hattın üçüncü kez gördüğü hizalanma
ve karşılık her seferinde aynı biçimde kuruluyor: önce İngilizcenin ne
yaptığı, sonra iki dilin ortak davranışı.

Ölçüm bu turda altı sözlükçe maddesi ekletti ve bir egzersizin BAŞLIĞINI
değiştirtti: „Repair service“ başlığındaki „service“ ünite havuzunda yok ve
başlık da ölçüm yüzeyinin parçası. Aynı sözcük dinleme egzersizinin
konuşmacı etiketinde de duruyordu; etiket bir kişi adına çevrildi.

**A2 ünite 16–18 (2026-09-12).** Ünite 16 Booking a room · At the airport ·
Hotel check-in · Finding your way abroad; ünite 17 Sightseeing ·
Travel problems · Renting a car · Eating out abroad; ünite 18
Buying souvenirs · Telling about a trip · Inviting a friend ·
Birthdays and gifts. On sekiz egzersiz; ünite dışı ölçüm %0,0.
A2 yuvalarının 108'i dolu.

Ünite 16'nın noktası SOME/ANY bölüşümü ve Almanca eksende bu, yeniden
ölçümün dördüncü bir türünü gösterdi: fark VAR ama başka KATMANDA.
İngilizce olumsuzda belirteci değiştiriyor („there aren't any towels“);
Almanca belirteci değiştirmiyor, olumsuzluğu belirtecin İÇİNE katıyor
(„es gibt keine Handtücher“ — „nicht“ + „ein“ tek sözcükte). Yani iki dil
de bir şey yapıyor, ama biri sözdiziminde, öteki sözcük yapımında yapıyor.
Karşılık bunu tek cümleyle söylüyor.

Ünite 17 „-ing“ alan iki sözcüğü öğretiyor: „How about taking …“ ve
„worth visiting“. Almanca eksende burada hiçbir karşılık yok, çünkü
Almancada bu yapı YOK: „wie wäre es mit einer Bustour“ bir İSİM alıyor ve
„sehenswert“ bir SIFAT. Yani Almanca okuyan öğrenci hangi biçimi
koyacağını kendi dilinden türetemiyor; karşılık iki satırda da Almancanın
ne koyduğunu adıyla söylüyor, çünkü doğru olan "senin dilinde böyle bir
şey yok" demek.

Ünite 18'in noktası BAŞIBOŞ „to“: „I'd love to.“ Fiil düşüyor, „to“
kalıyor. Almanca aynı yerde tek bir sözcük söylüyor: „gern“. Yani ne
İngilizcenin bıraktığı iz var ne de Türkçedeki tam çekim; karşılık bunu
"Deutsch sagt einfach „gern“" diye kuruyor. Öğrencinin iki sezgisi de
yanlış: „to“yu atmak da fiili tekrar etmek de kulakta duyuluyor.

Ölçüm bu turda on bir sözlükçe maddesi ekletti ve dört yeri yeniden
yazdırdı. İkisi CEVAP LİSTESİNDEN geldi — „a confirmation“ ve „it is not
necessary“ metinde geçmeyen sözcüklerdi ve kabul listesi de ölçüm
yüzeyinin parçası; biri soru şıkkındaydı („the hotel has none“); sonuncusu
bir dikte cümlesiydi: „Could you help me, please?“ bölümün ortasında
küçük harfle başlıyordu, bölüm iki cümleye ayrıldı.

**A2 ünite 19–21 (2026-09-12).** Ünite 19 A wedding · Festivals and holidays ·
Congratulations! · Saying sorry; ünite 20 Close friends ·
Family and relationships · Small talk at a party · Saying thank you;
ünite 21 Using a smartphone · Social media · Series and films ·
Following the news. On sekiz egzersiz; ünite dışı ölçüm %0,0.
A2 yuvalarının 126'sı dolu.

Ünite 19 edat işinin ÜÇÜNCÜ turu: ünite 8 sıfatlarda („worried about“),
ünite 13 fiillerde („exchange for“), burada toplumsal kalıplarda —
„congratulations ON“, „good luck WITH“, „proud OF“, „sorry ABOUT“.
Almanca eksende dördü de ayrılıyor ve hiçbiri İngilizceyle eşleşmiyor:
„Glückwunsch ZU“, „viel Glück BEI“, „stolz AUF“, „Entschuldigung WEGEN“.
Yani bu dörtlü, iki dilin edat haritalarının birbirinden tam bağımsız
olduğunu tek bakışta gösteriyor; karşılıklar Almanca eşleri adıyla
yazıyor, çünkü öğrencinin tek dayanağı ezber.

Ünite 20 ünite 17'nin „-ing“ini genelleştiriyor: orada „How about“ ve
„worth“ sonrası çıkmıştı, burada bir EDATTAN sonra çıkıyor („thanks for
helping me“). Kural artık tek cümlede söylenebiliyor: edattan sonra fiil
hep „-ing“ olur, mastar asla gelmez.

Ünite 21'in noktası OLUMSUZLUĞUN ÖNE ÇEKİLMESİ ve bu, hattın şimdiye
kadarki en net TÜRKÇE-YALNIZ satırı. İngilizce „I don't think social
media is good“ diyor, Almanca da aynı şeyi yapıyor („ich glaube nicht,
dass …“) — Türkçe ise olumsuzu iç cümlede tutuyor ("bence sosyal medya iyi
değil"). Yani Türkçe ipucu bir GÜÇLÜK anlatıyor ama o güçlük Almanca
okuyan için yok; karşılık bunu "Deutsch macht es genauso" diye söylüyor.
A2 ünite 4 ve 9'da İngilizce yalnızdı, burada Türkçe yalnız.

Ölçüm bu turda on yedi sözlükçe maddesi ekletti ve makinenin bir
inceliğini görünür kıldı: sözlükçeye ÇOĞUL biçim yazmak tekili
kurtarmıyor („chapters“ yazılmıştı, metindeki „chapter“ dışarıda kaldı),
çünkü havuz sözlükçenin ham dizesini alıyor ve gövdeleme metin tarafında
çalışıyor. Sözlükçeye kök biçim yazmak iki yönü birden kapatıyor. Ayrıca
bir sözlükçe maddesi düştü: „instead“ yalnız soru kökünde geçiyordu,
metinde değil — sözlükçe metnin sözlükçesi.

**EN A2 SEVİYESİ KAPANDI (2026-09-12).** Son dört ünite: 22 A computer
problem · Useful apps · Passwords and safety · A video call; 23 What I
think about technology · Explaining how to do it · At the city hall ·
Filling in a form; 24 Residence permit · Reporting a loss · At the library ·
Transport card; 25 Booking an appointment · Documents and copies ·
Making a complaint · City services. Yirmi dört egzersiz; ünite dışı ölçüm
%0,0. **A2: 25 ünite, 150 egzersiz, 150/150 yuva dolu, 0 boş.**

Kapanış turu iki yeni satır ve BİR İPİN ADINI verdi.

Ünite 22 amacın iki biçimini yan yana koyuyor: „I use this app TO find a
bus“ ve „It's FOR finding a bus“. Ünite 17 ile 20 „-ing“i ayrı ayrı
göstermişti; ancak mastarla yan yana konunca kural görünür oluyor.
Almanca eksende ikisinin de karşılığı var („um … zu“ ve „zum Finden“),
yani bu satır büyümüyor — ama „zum Finden“de fiilin İSİM gibi büyük
harfle yazılması Almanca okuyan için ayrı bir hatırlatma.

Ünite 23'ün emir zincirinde İngilizcenin SÖYLEMEDİĞİ şey önemli: tek bir
emir biçimi var, kibarlık ayrımı yok. Almanca aynı yerde „drück“ ile
„drücken Sie“yi ayırıyor. Yani burada eksiklik bir güçlük — öğrenci hangi
biçimi seçeceğini soruyor ve cevap "seçim yok".

Asıl bulgu ünite 24 ile 25'in AYNI eğilimin iki görünüşü olması:
İNGİLİZCE ÖZNE YERİNİ BOŞ BIRAKMIYOR. „Someone stole my phone“ (ünite 24)
ve „They collect the rubbish on Mondays“ (ünite 25) — ikisinde de fail
bilinmiyor ve İngilizce yine de bir özne koyuyor. Türkçe ikisinde de
edilgen kuruyor ("telefonum çalındı", "çöpler pazartesi toplanıyor).
Almanca da edilgen ya da „man“ kullanıyor, yani burada Türkçe ile Almanca
aynı tarafta ve İngilizce yalnız. Seviye bu ipi adıyla söyleyerek
kapanıyor: A2 boyunca dağınık görünen üç satır (ünite 4 süre, ünite 9
olumsuz present perfect, ünite 24–25 özne ısrarı) aslında tek bir
gözlemin parçaları.

Ölçüm bu turda yirmi bir sözlükçe maddesi ekletti ve beş soruyu yeniden
yazdırdı; hepsi soru kökünde ya da şıkta geçip metinde geçmeyen
sözcüklerdi („forever“, „repeat“, „real“, „matter“, „own“).

**B1 AÇILDI · ünite 1–3 (2026-09-12).** Ünite 1 My career so far ·
Writing a CV · The cover letter · The job interview; ünite 2 The first week ·
Meetings and deadlines · Talking about salary · The people I work with;
ünite 3 The appraisal · Resigning and handing over · Looking for a flat ·
The viewing. On sekiz egzersiz; ünite dışı ölçüm %0,0. B1 yuvalarının
18'i dolu.

Seviyenin ölçüsü bir basamak yukarıda: okuma metni **150–260 kelime**
(A2'de 100–180, `check-content.ts` içindeki `READING_WORDS`). İlk üç
ünite bunu doldurdu ve sayılar 200–260 arasında oturdu.

Ünite 1'in noktası PAST PERFECT. A2 present perfect ile simple past'ı
ayırmıştı; B1 üçüncü katmanı ekliyor ve özgeçmiş anlatısı bunun doğal
yuvası. Almanca eksende bu satır BÜYÜMÜYOR — Almanca Plusquamperfekt'i
aynı işte kullanıyor — ama karşılık biçimi adıyla anıyor, çünkü Almanca
okuyan için tanıdık olduğunu bilmek de bir bilgi.

Ünite 2'nin noktası EDİLGEN ve burada hattın en keskin yapısal farkı
çıktı: „I was given a badge.“ İngilizce DOLAYLI nesneyi özne yapabiliyor.
Almanca bunu yapamıyor — „mir wurde ein Ausweis gegeben“, kişi datifte
kalıyor ve cümlenin öznesi olamıyor. Türkçe de yapamıyor. Yani bu, iki
dilin de erişemediği bir İngilizce imkânı; karşılık bunu "Deutsch kann
das nicht" diye açıkça yazıyor.

Ünite 3'ün noktası DOLAYLI ANLATIM. Üç biçim yan yana duruyor („said
that“, „told me to“, „asked if“) ve seçim aktarılan cümlenin türüne bağlı.
Almanca eksende iki ayrım daha açıldı: (1) İngilizce zamanı bir basamak
geriye kaydırıyor („improved“ → „had improved“), Almanca ise bunun yerine
Konjunktiv kullanıyor; (2) „told me to“nun Almancada mastarlı karşılığı
yok, „sagte mir, ich solle“ diye yan cümle gerekiyor.

Nesne konumundaki ilgi adılının düşebilmesi de ayrı bir satır oldu: „the
report I sent“ İngilizcede olağan, Almancada İMKÂNSIZ — „der Bericht, den
ich geschickt habe“ içinde „den“ hiçbir koşulda düşmüyor.

Ölçüm B1'de ilk kez çalıştı ve beklendiği gibi davrandı: havuz büyüdüğü
için ilk taslakta oran %2,2 çıktı ve on dokuz sözlükçe maddesiyle %0,0'a
indi. Bir de içerik düzeltmesi geldi: `en-b1-u1-r2` metninde „agency“
kullanılmıştı, oysa o sözcük ünite 3'ün dersinde geçiyor — beş yerde
„company“ ile değiştirildi. Ünite sırası sözcüğün hangi üniteye ait
olduğunu belirliyor ve kapı bunu sayıyor.

**B1 ünite 4–6 (2026-09-12).** Ünite 4 The lease · Moving day ·
Living with flatmates · Getting it fixed; ünite 5 The bills ·
The noise problem · Moving out · The neighbourhood; ünite 6
Reason and result · When I arrive · Why I signed up · Only if.
On sekiz egzersiz; ünite dışı ölçüm %0,0. B1 yuvalarının 36'sı dolu.

Ünite 4 üç geleceği AYNI SAHNEDE buluşturuyor: „The van is coming at
nine“ (ayarlanmış), „I am going to unpack the kitchen first“ (plan),
„I will carry that one“ (o anki karar). A2 ünite 4 ikisini ayırmıştı,
B1 ünite 2 üçüncüsünü getirmişti; taşınma günü üçünü bir arada
kullanmadan anlatılamıyor. Almanca eksende bu, A2'de açılan notun en
keskin hâli: Almancada ÜÇÜ İÇİN DE tek bir biçim var („ich werde“) ve
zaman zarfı varsa çoğu zaman şimdiki zaman yetiyor.

Ünite 5'in noktası ÖDÜN VERMENİN ÜÇ SÖZDİZİMİ. Anlamları aynı, yapıları
değil: „although“ bir cümle, „despite“ bir isim, „however“ yeni bir cümle
istiyor. Almanca eksende üçünün de karşılığı var („obwohl“, „trotz“,
„jedoch“) ve bölüşüm BİREBİR aynı — yani satır büyümüyor. Bu, öğrenci
için iyi haber ve karşılık bunu üç satırda da Almanca eşiyle söylüyor,
çünkü burada eşleşmenin kendisi öğretici.

Ünite 6 seviyenin en çok hata alan noktasını alıyor: ZAMAN VE KOŞUL YAN
CÜMLESİNDE GELECEK ŞİMDİKİ ZAMANLA kuruluyor. „When I arrive, I will call
you.“ İngilizce burada ASİMETRİK — yan cümle şimdiki zaman, ana cümle
„will“. Almanca eksende fark tam olarak bu asimetride: Almanca İKİ
tarafta da şimdiki zaman kuruyor („wenn ich ankomme, rufe ich dich an“),
yani Almanca okuyan yan cümleyi doğru yapıp ana cümledeki „will“i
düşürmeye yatkın. Karşılık bunu adıyla söylüyor.

Ölçüm bu turda otuz sözlükçe maddesi ekletti — B1'de en yüksek sayı — ve
iki yapısal düzeltme getirdi. Birincisi: „per cent“ sözlükçeyle
kapatılamıyor, çünkü havuz sözlükçenin HAM dizesini alıyor ve metin
„per“ ile „cent“i ayrı belirteç sayıyor; iki yerde „six in a hundred“
yazıldı. İkincisi `prose` hattından geldi: „meter“ Amerikan yazımı diye
uyarıldı (hat ölçülmüş İngiliz İngilizcesi yazıyor) — sayaç anlamında
doğru olsa da satır „the reading“ ile yeniden yazıldı, kapı gevşetilmedi.

**B1 ünite 7–9 (2026-09-12).** Ünite 7 The one with the handle ·
What had happened · What they said · In the news; ünite 8 The rules here ·
What I have done · The one with the glasses · The place where I grew up;
ünite 9 You should see it · This one or that one · How it works ·
The faulty order. On sekiz egzersiz; ünite dışı ölçüm %0,0. B1
yuvalarının 54'ü dolu.

Ünite 7 edilgenin SÜRERLİ biçimini getiriyor: „The case is being
investigated.“ Almanca eksende bu, hattın ilk „AYRIM YOK“ satırı:
Almanca edilgeni zaten „werden“ ile kuruyor, o yüzden „is investigated“
ile „is being investigated“ İKİSİ DE „wird untersucht“ oluyor. Yani
Almanca okuyan iki İngilizce cümleyi tek Almanca cümleye çeviriyor ve
ayrımı bağlamdan çıkarmak zorunda; karşılık bunu adıyla söylüyor.

Ünite 8'in noktası VİRGÜLLÜ VE VİRGÜLSÜZ SIFAT CÜMLESİ ve burada hattın
en ince farkı çıktı. İngilizcede virgül ANLAM taşıyor: virgülsüz cümle
seçiyor, virgüllü cümle ekliyor. Almancada da iki tür var, ama Almanca
sıfat cümlesinin çevresine HER ZAMAN virgül koyuyor — yani aynı işareti
kullanan iki dilden birinde işaret bilgi taşıyor, ötekinde taşımıyor.
Almanca okuyan virgülü görüp hiçbir şey anlamamaya alışkın; karşılık
„im Deutschen sagt das Komma das nicht“ diye yazıyor.

Ünite 9 „although“ ile „whereas“ı ayırıyor: biri beklenmedik olanı
bağlıyor, öteki iki olguyu eşit ağırlıkta karşılaştırıyor. Almancada
ayrım var („obwohl“ / „wohingegen“) ve bölüşüm aynı, yani satır
büyümüyor.

Ölçüm bu turda kırk dört sözlükçe maddesi ekletti — hattın en yükseği —
ve üç DİKTE cümlesini yeniden yazdırdı. Üçü de aynı kusurdan geldi:
dikte cümlesi bölümün ortasında „, which …“ ile sürüyordu, bu yüzden
tam eşleşmiyordu. Bölümler iki cümleye ayrıldı ve içerik aynı kaldı —
kapı, virgülle bağlanan uzun bölümlerin dikteye uygun olmadığını her
seferinde aynı yerden gösteriyor.

**B1 ünite 10–12 (2026-09-12).** Ünite 10 Changing the appointment ·
Step by step · The mix-up · Making up my mind; ünite 11 Registering here ·
Filling in the form · Opening an account · At the embassy; ünite 12
What the policy covers · The tax return · Writing to the office ·
Waiting my turn. On sekiz egzersiz; ünite dışı ölçüm %0,0. B1
yuvalarının 72'si dolu.

Bu üç ünite müfredatın PEKİŞTİRME turu: aynı altı yapı yeni alanlardan
geçiyor. O yüzden öğretme noktaları yeni yapı değil, aynı biçimin AYRI
İŞLERİ oldu — ve bu, anadil ekseninde beklenmedik biçimde verimli çıktı.

Ünite 10: „had“ iki ayrı iş görüyor. Anlatıda „daha önce“ demek için
geliyor („They had sent the wrong box“), dolaylı anlatımda ise zamanın
geri kaymasından doğuyor („They asked if I had decided“). Almanca eksende
bu, geçen turdaki bulgunun TERSİ: orada bir Almanca biçim iki İngilizce
biçimi karşılıyordu, burada bir İngilizce biçim İKİ AYRI Almanca biçime
düşüyor — anlatıda Plusquamperfekt, aktarmada Konjunktiv. Karşılıklar bu
yüzden iki ayrı yerde iki ayrı şey söylüyor.

Ünite 11: edilgen üçüncü kez başka bir iş görüyor. Ünite 2'de tek bir
olaydı, ünite 7'de haberin zamanıydı, burada İŞLEYİŞ: „The form is
stamped at the desk“ cümlesinde zaman YOK ve yokluğu anlamın kendisi.
İçerik bunu metnin içinde açıkça söylüyor, çünkü aynı paragrafta zamanlı
bir edilgen de duruyor („My application was processed last week“).

Ünite 12: resmî mektubun dili. Bu bir dilbilgisi değil KAYIT kuralı —
yanlış cümle anlaşılır ama yanlış yerde durur. Burada İngilizcenin
Almancada karşılığı olmayan bir kuralı çıktı: adı bildiğinde „Yours
sincerely“, bilmediğinde „Yours faithfully“. Almanca ikisi için de „Mit
freundlichen Grüßen“ diyor; karşılık ayrımı adıyla yazıyor.

Ölçüm bu turda elli beş sözlükçe maddesi ekletti ve ÜÇ sözlükçe maddesini
sildirdi. Sonuncusu yeni bir kusur sınıfı: sözcük SORU KÖKÜNDE geçiyor,
metinde geçmiyor. İki kapı burada ters yönde çekiyor — `check:en-unitvocab`
soru kökünü ölçüm yüzeyine katıyor, `check-content` ise sözlükçe
maddesinin METİNDE bulunmasını istiyor. Doğru çözüm sözlükçe eklemek
değil, soruyu yeniden yazmak.

**B1 ünite 13–15 (2026-09-12).** Ünite 13 The papers they need ·
Appealing the decision · My study plan · Before the exam; ünite 14
How I learn best · How far I have come · Learning from mistakes ·
What the tutor said; ünite 15 Working in a group · The online course ·
Keeping it up · What comes next. On sekiz egzersiz; ünite dışı ölçüm
%0,0. B1 yuvalarının 90'ı dolu.

Ünite 13'ün noktası ŞUNU ÖNCEKİ SÖZCÜK BELİRLİYOR: „decided TO appeal“
mastar, „insisted ON seeing“ edat + „-ing“, „the right TO ask“ ise bir
İSMİN aldığı mastar. Üçü de aynı anlamı kuruyor ve seçim mantıktan değil
sözcükten geliyor. Almanca eksende her üçü de ayrı ayrı başka bir yapı
istiyor („beschließen, zu …“, „darauf bestehen, zu …“, „das Recht, zu …“),
yani Almanca okuyan ezberden kaçamıyor ama en azından hepsinde mastar
görüyor — İngilizcedeki „-ing“ onun için tek gerçek sürpriz.

Ünite 14 B1'in en çok karıştırılan çiftini alıyor: „used to do“ (bitmiş
alışkanlık) ile „be used to doing“ (alışkın olmak). Aynı üç sözcük, iki
ayrı anlam, ve ayırt eden tek şey „be“ ile sondaki „-ing“. İçerik ikisini
YAN YANA koyuyor, çünkü ayrım ancak karşıtıyla görülünce oturuyor.
Almanca eksende ortak biçim YOK — „früher schrieb ich“ ile „ich bin es
gewohnt zu schreiben“ hiç benzemiyor — yani Almanca okuyan için tuzak
yok ama tutamak da yok: ikisini de soğuktan öğrenmesi gerekiyor.

Ünite 15'in noktası KOŞULDA „WERE“: „If I were less tired…“ İngilizcenin
başka hiçbir yerde kullanmadığı tek biçim ve öğrenci ilk duyduğunda hata
sanıyor. Almanca eksende bu bir PARİTE ve işe yarayan türden: Almanca
Konjunktiv „wäre“ de gösterge „war“dan ayrı bir biçim, yani Almanca
okuyanın refleksi zaten doğru. Yanında ünitenin ikinci tuzağı duruyor:
„unless“ olumsuzluğu kendi içinde taşıyor, ana cümlenin olumsuzu onu
iptal etmiyor.

Ölçüm bu turda altmış yedi sözlükçe maddesi ekletti, ALTI maddeyi
sildirdi ve iki dikte bölümünü ayırttırdı. Sildirilenler yine aynı
sınıftan: sözcük soru kökünde ya da konuşmacı etiketinde geçiyor, metinde
geçmiyor. Bu turda yeni olan, `Tutor:` konuşmacı etiketinin sözlükçeye
dayanak olamaması — etiket ölçümden düşüyor ama içerik kapısı sözcüğü
METİNDE arıyor, iki kapı aynı belirteci iki ayrı yerde bekliyor.

**B1 ünite 16–18 (2026-09-12).** Ünite 16 In my view ·
Agreeing and disagreeing · The debate · Reacting to the news; ünite 17
Online and offline · Talking someone round · It must be true ·
Where did you read that?; ünite 18 By the time we decided ·
What happens next · Joining a practice · Describing symptoms.
On sekiz egzersiz; ünite dışı ölçüm %0,0. B1 yuvalarının 108'i dolu.

Ünite 17'nin noktası ÇIKARIM KİPLERİ ve seviyenin en büyük yeniden
anlamlandırması burada: „He must know the truth“ cümlesinde „must“
zorunluluk DEĞİL, kesinlik. Aynı biçim A1'den beri yasak ve zorunluluk
taşıyordu; burada kanıta dayalı bir sonuç taşıyor. Olumsuzu da başka
yerden geliyor: „can't be“, „mustn't be“ değil — çünkü „mustn't“ yasak
demek. Almanca eksende bu bir PARİTE („muss wissen“ / „kann nicht sein“),
yani Almanca okuyanın kip tablosu zaten doğru kurulmuş; karşılık bunu
söylüyor, çünkü öğrenci burada kendi diline güvenebilir.

Ünite 16'nın noktası NESNE + SIFAT: „I find the headline shocking.“ Arada
„to be“ yok, „that“ yok. Almanca aynı yapıyı kuruyor („ich finde die
Überschrift schockierend“), yani satır büyümüyor — ama Türkçe orada bir
yapı istediği için uyarı Türkçe okuyan için yerinde kalıyor. Bu, aynı
satırın iki anadile göre farklı AĞIRLIK taşıdığı bir yer.

Ünite 18 A2 ünite 4'ün süre/an ayrımını klinik dile taşıyor: „I have had
a fever since Monday“ süreyi, „The pain started on Tuesday“ ANI söylüyor.
Hekim iki ayrı şey soruyor ve İngilizce bunları iki zamanla ayırıyor;
yanlış seçim yanlış bilgi veriyor. İçerik bunu metnin içinde hekimin
ağzından açıklıyor.

Ölçüm bu turda seksen sekiz sözlükçe maddesi ekletti, DOKUZ maddeyi
sildirdi ve „per cent“i ikinci kez metinden çıkarttı. İkinci kez çıkması
kuralın yerleştiğini gösteriyor: çok sözcüklü bir terim sözlükçeyle
kapatılamıyor, çünkü havuz ham dizeyi alıyor ve metin belirteçleri ayrı
sayıyor — o terim ya tek sözcüğe indirilecek ya hiç kullanılmayacak.

**B1 ünite 19–21 (2026-09-12).** Ünite 19 Reading the label ·
At the emergency room · The results are in · Seeing a specialist; ünite 20
The sick note · Choosing a treatment · A second opinion · A night in
hospital; ünite 21 Talking about the climate · Sorting the rubbish ·
Saving energy at home · Parks and green space. On sekiz egzersiz; ünite
dışı ölçüm %0,0. B1 yuvalarının 126'sı dolu, 24'ü kaldı.

Ünite 19'un noktası KİPLİ EDİLGEN: „The pack must be kept in the fridge.“
Kip ve edilgen üst üste biniyor ve sıra hiç değişmiyor — „must“ + „be“ +
üçüncü hâl. Almanca eksende bu bir PARİTE, üstelik dizilişe kadar aynı
(„muss … aufbewahrt werden“), yalnız Almanca sondaki yardımcı fiili
cümlenin sonuna atıyor. Karşılık bunu yazıyor, çünkü öğrencinin burada
kendi dilinden taşıyabileceği doğru bir kalıp var. Prospektüsün neden
baştan sona edilgen olduğu da ünitenin kendi konusu: ilacı kimin aldığı
değil, ilacın nasıl işlediği anlatılıyor — fail yok, çünkü fail önemli
değil. „by“ ancak kimin yaptığı önemliyse geliyor („prescribed by a
doctor“) ve metin ikisini yan yana gösteriyor.

Ünite 20'nin noktası DÖRT BAĞLAÇ DÖRT AYRI İŞ: „moreover“ aynı türden
ikinci bir şey ekliyor ve yazıya ait; „besides“ elindekinden başlayıp
üstüne katıyor ve konuşmaya daha yakın; „otherwise“ uyarıyor (yapmazsan
şu olur); „instead“ değiştiriyor — eklemiyor, yerine koyuyor. Dördü de
Türkçede "ayrıca/üstelik/yoksa/onun yerine" ile karşılanıyor ve öğrenci
birini ötekinin yerine koymaya yatkın. Almanca eksende bölüşüm BİREBİR
duruyor („außerdem“ / „übrigens“ / „sonst“ / „stattdessen“), yani satır
büyümüyor; karşılık dört Almanca eşi adıyla yazıyor, çünkü eşleşmenin
kendisi öğretici.

Ünite 21'in noktası ÜÇ GELECEK BİÇİMİ KANIT DERECESİ GÖSTERİYOR. B1 ünite
4'te üçü aynı sahnede buluşmuştu ve orada ayrımın adı "ayarlanmış / plan /
o anki karar"dı; burada aynı üçlü başka bir eksende dizilmiş: „will“ en
zayıf kanıt (kanaat), „going to“ elde görünen veri (ölçümler bir yöne
işaret ediyor), sürerli şimdiki zaman en güçlü ve en dar (takvimde
saatiyle duruyor). Almanca eksende bu, ünite 4'teki notun doğrudan
sonucu: Almanca üç biçimin üçünü de „werden“ ya da yalın şimdiki zamanla
karşılıyor, yani KANIT DERECESİNİ dilbilgisiyle göstermiyor. Almanca
okuyan burada kendi diline yaslanırsa üç cümleyi eşit güçte sanır —
karşılık bunu adıyla söylüyor.

Ölçüm bu turda altmış sözlükçe maddesi ekletti, ÜÇ maddeyi sildirdi ve
„thirty per cent“i kullanımdan çıkarttı („by a third“). Sildirilenler yine
aynı sınıftan — sözcük soru kökünde geçiyor, metinde geçmiyor — ve doğru
çözüm her seferinde soruyu yeniden yazmak oldu („When is the operation?“ →
„When will they operate?“). Bir dikte bölümü de ikiye ayrıldı: cümle uzun
çizgiyle sürüyordu.


**EN B1 SEVİYESİ KAPANDI (ünite 22–25, 2026-09-12).** Ünite 22
How the city changed · The daily commute · Water and waste · A local
project; ünite 23 Before they built it · City or country · Naming a
feeling · Looking back; ünite 24 What I dream of · If I could · The thing
that moved me · Cheering someone up; ünite 25 Fears and worries · What
they told me · Being thankful · Where I want to be. Yirmi dört egzersiz;
ünite dışı ölçüm %0,0. **25 ünite, 150 egzersiz, 150/150 yuva dolu,
0 boş.**

Ünite 22'nin noktası „MUST“UN GEÇMİŞİ YOK. Zorunluluk üçlüsü A2 ünite
10'da ve B1 ünite 6'da iki kez geçti; burada üçlünün söylenmemiş yanı
geliyor: „must“ yalnız şimdiye ait bir sözcük. „musted“ diye bir biçim
yok, kural düne aitse yerini „had to“ alıyor, yasak da „were not allowed
to“ya dönüyor. Almanca eksende bu bir İNGİLİZCE EKSİĞİ — „müssen“in
geçmişi var („musste“), yani Almanca okuyanın kendi dilinde boşluk
görmediği bir yerde İngilizce bir biçim kaybediyor. Hattın şimdiye kadar
gördüğü satırların çoğu ya İngilizcenin fazlasını ya Almancanın fazlasını
gösteriyordu; bu, İngilizcenin bir şeyi EKSİK yaptığı ilk açık satır.

Ünite 23'ün noktası BAĞLAÇ SIRAYI SÖYLÜYORSA GEÇMİŞİN GEÇMİŞİ SEÇİME
KALIYOR. „Before they built the road, this was a field“ iki yarıda da
yalın geçmiş kullanıyor, çünkü „before“ sırayı zaten kurmuş; „The farm
had closed before we moved here“ ise „had“i tutuyor, çünkü sıra cümlenin
KENDİ konusu. „by the time“ ise seçeneği kaldırıyor: o bir olay değil bir
son tarih adlandırıyor. Almanca eksende Plusquamperfekt aynı işi görüyor
ve aynı yerde isteğe bağlı — satır büyümüyor; ayrılan yer „by the time“ın
kendisi, çünkü Almancada tek sözcüklük karşılığı yok ve „bis“ onu
karşılamıyor.

Ünite 24'ün noktası İLGİ ADILI HİÇ ÇEKİLMİYOR. „that“, „who“, „where“
arasında yapılacak tek seçim sözcüğün TÜRÜ — şey, kişi, yer; seçildikten
sonra biçim sayıya, göreve ve zamana göre hiç değişmiyor. Almanca eksende
bu turun asıl bulgusu bu: Almanca ilgi adılı cinse ve duruma göre bir
TABLODAN seçiliyor („der Film, der…“ / „die Frau, die…“), yani Almanca
okuyan İngilizcede yapılacak işin yarısını fazladan yapmaya alışkın. Ünite
3 adılın DÜŞMESİNİ, ünite 8 VİRGÜLÜNÜ öğretmişti; üçüncü ders adılın
kendisinin donuk olduğu.

Ünite 25 seviyeyi KAPANIŞ İPİYLE bitiriyor. Ünitenin dilbilgisi amaç,
sonuç ve ödün („in order to“ / „as a result“ / „even though“) — üçü de
bağlayıcı görünüyor, üçü de ayrı iş yapıyor ve yanlışını koyunca cümle
yine okunuyor, bu yüzden yakalanması en zor yanlış sınıfı. Ama ünitenin
okuma metni seviyenin kendi ipini adıyla söylüyor: B1 az sayıda YENİ
biçim öğretti; öğrettiği şey bilinen biçimlerin İKİNCİ İŞİ oldu. „had“
anlatıda ve aktarmada (ünite 10), edilgen olayda, haberde ve işleyişte
(ünite 2, 7, 11), „must“ zorunlulukta ve çıkarımda (ünite 17), „will“
gelecekte ve kanaatte (ünite 21). Seviyenin özgürlüğü daha uzun bir liste
değil, elde olanın ikinci kullanımı.

Ölçüm bu turda seksen altı sözlükçe maddesi ekletti, SEKİZ maddeyi
sildirdi ve bir dikte bölümünü ayırttırdı. Sildirilenlerin hepsi aynı
sınıftan — sözcük soru kökünde ya da şıkta geçiyor, metinde geçmiyor — ve
çözüm her seferinde soruyu yeniden yazmak oldu („Which phrase takes the
choice away?“ → „Which one takes the choice away?“). Bu turda ayrıca iki
çok sözcüklü sözlükçe maddesi düştü („turns over“, „goes away“): metinde
öğeler ayrık duruyordu, yani kural bir kez daha doğrulandı — çok sözcüklü
terim ancak metinde bitişikse kapanıyor.


**B2 AÇILDI (ünite 1–3, 2026-09-12).** Ünite 1 The morning briefing ·
The handover note · Introducing a colleague · By the end of the quarter;
ünite 2 Writing the minutes · What went wrong · If we had known ·
Making the point land; ünite 3 Opening a formal talk · Saying it
carefully · The claim · What the issue is. On sekiz egzersiz; ünite dışı
ölçüm %0,0. B2 yuvalarının 18'i dolu. Seviyenin ölçüsü bir basamak daha
yukarıda: okuma metni 200–350 kelime (B1'de 150–260).

Ünite 1'in noktası KİŞİSİZ AKTARMANIN İKİ YOLU: „It is said that the
forecast will change“ öznesine „it“ koyup raporu bir „that“ cümleciğine
itiyor, „Stakeholders are thought to be ready“ ise özneyi cümlecikten
çıkarıp geriye mastar bırakıyor. Almanca eksende bu hattın yeni bir
türü: iş BAŞKA BİR KATMANDA yapılıyor. Almanca aynı şeyi edilgen bir
söyleme fiiliyle değil, bir KİP FİİLİYLE kuruyor — „Die Prognose soll
sich ändern“, „Der Schadenersatz soll gering sein“. İngilizce sözdizimini
kullanıyor, Almanca kipliği; ikisi de kaynağı gizliyor ve öğrenci
Almancadan birebir çevirdiğinde „should“a düşüyor, çünkü „sollen“in ders
kitabındaki karşılığı o.

Ünite 2'nin noktası KARIŞIK KOŞUL: koşul geçmişte, sonuç ŞİMDİDE.
„If we had known, we would have changed the scenario“ kapalı bir kutu;
„If we had planned better, the loss would be smaller now“ ikinci yarısını
öne çekiyor, çünkü kayıp bugünün sayfasındaki bir sayı. Sınama hangi
yarının geçmişte olduğu değil, sonucun nerede yaşadığı. Almanca eksende
bu bir İNGİLİZCE FAZLASI: Almanca iki yarıda da aynı Konjunktiv II
biçimini kullandığı için („hätten wir besser geplant, wäre der Verlust
jetzt kleiner“) karışımı GÖRÜNÜR biçimde işaretlemiyor — Almanca okuyan
ayrımı duyuyor ama yazarken göstermek zorunda kalmıyor, İngilizcede ise
ikinci yarının biçimi değişmek zorunda.

Ünite 3'ün noktası DEVRİK SIRA ÇOK DAR BİR KAPI: yalnız olumsuz ya da
sınırlayıcı bir zarf öne geçtiğinde yardımcı fiil özneden öne geliyor
(„Rarely have I …“), başka hiçbir öğe bunu yapmıyor („Yesterday I spoke
to her“ olduğu gibi kalıyor). Almanca eksende bu turun asıl uyarısı
burada ve YÖNÜ TERS: Almancada ana cümle zaten fiil-ikinci kuralıyla
çalışıyor, yani ÖNE ÇIKAN HER ÖĞE devriyor („Gestern habe ich …“). Yani
Almanca okuyanın refleksi burada eksik değil FAZLA çalışıyor; tehlike
kuralı uygulamamak değil, her yerde uygulamak. Hattın bugüne kadar
gördüğü uyarıların çoğu bir eksikliği kapatıyordu; bu, bir fazlalığı
kısıtlıyor.

Ölçüm B2'de ilk kez çalıştı ve havuz büyüdüğü için ilk taslakta %4,7
çıktı; yüz bir sözlükçe maddesiyle %0,0'a indi. Beş madde silindi (soru
kökünde ya da kabul listesinde geçip metinde geçmeyenler), bir dikte
bölümü ayrıldı ve iki içerik düzeltmesi geldi: „supplier“ ünite 3'ün
dersinde geçtiği için ünite 2'nin metninden çıkarıldı (ünite sırası
sözcüğün hangi üniteye ait olduğunu belirliyor), ve „post-mortem“ tek
belirteç olarak kapanmadığı için „a review after the event“ diye
yazıldı — tireli terim de çok sözcüklü terim gibi davranıyor.


**B2 ünite 4–6 (2026-09-12).** Ünite 4 What was agreed ·
The formal complaint · Meeting halfway · If we had agreed; ünite 5
A firm letter · What happened, briefly · Who is who ·
By the time you read this; ünite 6 As it is reported · Once completed ·
The treatment of the surface · It will have been done. On sekiz egzersiz;
ünite dışı ölçüm %0,0. B2 yuvalarının 36'sı dolu.

Ünite 4'ün noktası FİİLDEN İSİM YAPMANIN KURALI YOK, LİSTESİ VAR:
„enforce“ → „enforcement“, „reimburse“ → „reimbursement“, ama „perform“ →
„performance“; „violate“ → „violation“, „dismiss“ → „dismissal“. Ek
fiilden türetilemiyor. Almanca eksende bu bir **ALMANCANIN DÜZENLİ,
İNGİLİZCENİN LİSTELİ OLDUĞU** satır ve hattın yeni bir türü: Almanca
fiilden isim yapmayı ÜRETKEN bir kuralla yapıyor — mastarı büyük harfle
yazmak („das Durchsetzen“) ya da „-ung“ eklemek („die Durchsetzung“)
neredeyse her fiilde çalışıyor. Yani Almanca okuyanın elinde bir kural
var, İngilizcede ise yalnızca bir liste, ve kuralın alışkanlığı burada
yanlış biçim üretiyor („performment“ tam olarak bu hatanın adı).

Ünite 5'in noktası DEVRİLEN ANA CÜMLE, ÖNE ÇIKAN ÖĞE DEĞİL. Ünite 3
kapının dar olduğunu göstermişti; burada öne çıkan öğe bir sözcük değil
bir öbek ya da bütün bir cümlecik oluyor ve devrilme yine arkadan gelende
gerçekleşiyor: „Not until they had escalated it did they reply“ —
ilk yarı olduğu gibi duruyor, „did“ ana cümlede. Almanca eksende bu,
ünite 3'teki ters yönlü uyarının devamı: Almanca yan cümlede fiili SONA
attığı için iki dilin biçimleri burada büsbütün ayrışıyor, yani Almanca
okuyanın „öne çıkan her şey devirir“ alışkanlığı bu cümlede iki kez
yanlış sonuç veriyor.

Ünite 6'nın noktası TALİMATTA ORTACIN YAZILMAYAN ÖZNESİ. „Having filtered
the liquid, mix the powder“ — ikinci yarı emir kipi, yani gizli öznesi
„sen“; ortaç öznesini ana cümleden aldığı için o da „sen“. Kural bozulmuş
gibi görünürken tam tersine korunuyor. Almanca eksende bu turun en güzel
bağlantısı burada: Almanca aynı işi ortaçla DEĞİL, isimle çözüyor —
„Nach dem Filtern der Flüssigkeit mische das Pulver“. Yani ünite 4'te
Almancanın üretken bulduğumuz adlaştırması, ünite 6'da İngilizcenin
ortacının yerini tutuyor; iki ünitenin bulgusu tek bir gözlemin iki yüzü.

Ölçüm bu turda doksan üç sözlükçe maddesi ekletti, altı maddeyi sildirdi
ve iki yeni kusur sınıfı gösterdi. Birincisi: `tr` alanı PARANTEZLE
başlayamıyor — „performment“ ve „deviatement“ için yazılan
„(yanlış biçim)“ reddedildi, parantezsiz yazıldı. İkincisi: bir soru
şıkkına konan uydurma biçim („performation“) havuzda olmadığı için
ölçümü bozuyor ve sözlükçeyle kapatılamıyor (metinde geçmiyor) — şık
gerçek bir sözcükle değiştirildi.


## Tamamlanma ölçütü

- `en-<seviye>-u<NN>.ts` × 25 × 5, ünite başına 2 okuma + 2 dinleme + 2 yazma
- `buildTrack` her seviyede 150/150 beceri yuvasını dolduruyor
- `test:content` bütçesi büyümemiş, `check:en-unitvocab` her ünitede raporlu
- `check:skills-prose-de` ve `check:skills-task-de` kapsam tam
- `check:dumps` kaynakla aynı
