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
| **B2** | **1–25** | **TAM** (2026-09-12) — 150 egzersiz, 150/150 yuva |
| **C1** | **1–25** | **TAM** (2026-09-12) — 150 egzersiz, 150/150 yuva |

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


**B2 ünite 7–9 (2026-09-12).** Ünite 7 Which was checked in May ·
What was changed · Nowhere is it written · It must have been moved;
ünite 8 Had it been checked · It seems to have been · Reading a headline ·
Quoting a source; ünite 9 The correction · A press summary ·
What the paper argues · Checking a claim. On sekiz egzersiz; ünite dışı
ölçüm %0,0. B2 yuvalarının 54'ü dolu.

Ünite 7'nin noktası KİPLİ EDİLGENİN GEÇMİŞE DÖNÜK HÂLİ: „The disruption
must have been caused by the update“ — dört sözcük, tek sıra, hiçbir
öğesi yerinden oynamıyor. Almanca eksende bu satır AYNI ÖĞELERİ TERS
SIRADA diziyor: „muss verursacht worden sein“ — kip başta kalıyor ama
„worden“ ile „sein“ sona gidiyor ve aralarındaki sıra İngilizcenin tam
tersi. Yani sözcük sözcük çeviren Almanca okuyan doğru parçaları yanlış
dizilişte üretiyor; hattın bugüne kadar gördüğü „aynı şey ama başka
biçimde“ satırlarından farkı, burada biçimlerin AYNI olması ve yalnız
sıranın ayrılması.

Ünite 8'in noktası „IF“SİZ KOŞUL: devrik sıra burada olumsuzluk ya da
sınırlama değil, KOŞUL işaretliyor („Had the factor been known, …“).
Yalnız üç fiil bunu yapabiliyor — „had“, „were“, „should“ — ve olumsuzun
kısa biçimi yok. Almanca eksende bu bir PARİTE, ama DİL DÜZEYİ farklı:
Almanca „Wäre der Faktor bekannt gewesen, …“ biçimini günlük dilde de
kuruyor, İngilizcede ise bu kalıp resmî ve seyrek. Yani Almanca okuyanın
refleksi doğru biçimi üretiyor ama yanlış sıklıkta — ünite 3'teki „fazla
çalışan refleks“ uyarısının ikinci örneği, bu kez dilbilgisinde değil
kullanım sıklığında.

Ünite 9'un noktası MASTARIN KENDİ ZAMANI VAR: „It seems to have been
taken from a database“ — zamanı ne „seems“ ne „taken“ taşıyor, iki
sözcük („have been“) işi görmenin önüne atıyor. Almanca eksende buradaki
fark bir YAPIŞMA farkı değil, ZAMANLAMA farkı: İngilizce zaman
çerçevesini cümlenin ERKENİNDE kuruyor („have“de), Almanca ise ortacı ve
yardımcı fiili SONA sakladığı için okur çerçeveyi ancak son sözcükte
tamamlıyor („scheint … entnommen worden zu sein“). İki dil de aynı şeyi
söylüyor; ayrıldıkları yer bilginin ne zaman geldiği.

Ölçüm bu turda doksan sözlükçe maddesi ekletti, dokuz maddeyi sildirdi ve
bir dinleme bölümünü ikiye ayırttırdı (40 kelime sınırı). İki içerik
düzeltmesi de geldi: „movement“ ünite 9'un dersinde geçtiği için ünite
7'nin metninden çıkarıldı, ve „fact-check“ tireli terim olarak
kapanmadığı için „a check of this kind“ diye yazıldı — ünite 4'te
„post-mortem“le konan kural ikinci kez çalıştı.


**B2 ünite 10–12 (2026-09-12).** Ünite 10 If they had printed it ·
Never before published · By the time it airs ·
The comparison of the reports; ünite 11 How the study works · In the lab ·
The automation of the process · When the data lands; ünite 12
The software, which was updated · What the study shows ·
Never has a pattern emerged · It must have failed. On sekiz egzersiz;
ünite dışı ölçüm %0,0. B2 yuvalarının 72'si dolu.

Ünite 10'un noktası ADLAŞTIRMA KENDİ EDATINI DA GETİRİYOR: „comparison
OF“, „distinction BETWEEN“, „contrast BETWEEN“, „parallel WITH“. Ünite 4
ekin fiilden türetilemediğini göstermişti; bu ikinci fatura, ve üstelik
fiilin aldığı edatla hiç ilgisi yok („compare one thing WITH another“ ama
„the comparison OF two things“). Almanca eksende bu ünite 4'teki bulgunun
devamı: Almanca bu bağı çoğu kez EDATSIZ kuruyor, tamlayan hâliyle
(„der Vergleich der zwei Berichte“), yani Almanca okuyanın seçeceği bir
edat bile yok — İngilizcede iki ayrı ezber gerekirken Almancada sıfır.

Ünite 11'in noktası YALIN ORTAÇ İKİ İLİŞKİYİ BİRDEN TAŞIYOR: „Being slow,
the reaction needed more heat“ eşzamanlılık değil NEDEN veriyor, ve
İngilizce hangisi olduğunu söylemiyor. Almanca eksende bu hattın yeni bir
türü — **bir dilde belirsizlik serbest, ötekinde seçim zorunlu**. Almanca
bir bağlaç koymak zorunda („da sie langsam war“ mı, „während …“ mi) ve
bu yüzden Almanca okuyan İngilizce cümleyi çevirirken kendi dilinin
istediği kararı vermek zorunda kalıyor; İngilizce ise kararı okura
bırakıyor. Yazma kuralı bu yüzden okuma kuralından dar: iki okuma aynı
eyleme çıkmıyorsa bağlacı yaz.

Ünite 12'nin noktası ŞİMDİKİ ZAMANDA DEVRİK SIRA „DOES“ İSTİYOR:
„Rarely does a question arise so early“ — devrilecek yardımcı fiil yok,
o yüzden „does“ yalnızca taşınacak şey olmak için geliyor ve ana fiil
çekimini kaybediyor. Almanca eksende ÖNGÖRÜLEN HATA burada: Almanca
doğrudan asıl fiili deviriyor („Selten stellt sich eine Frage so früh“),
yardımcı fiile hiç ihtiyaç duymuyor — yani Almanca okuyanın üreteceği şey
tam olarak „Rarely arises a question“. Ünite 3 ve 5'teki „fazla çalışan
refleks“ uyarısının üçüncü ve en somut hâli.

Ölçüm bu turda seksen bir sözlükçe maddesi ekletti, yedi maddeyi sildirdi
ve bir dikteyi değiştirtti — dikte cümlesi bir listenin ortasında
duruyordu („the automation of the process, the invention of the tool,
the introduction of the patch“), o yüzden bölüm başındaki tam cümleye
çevrildi.


**B2 ünite 13–15 (2026-09-12).** Ünite 13 Had the sample been larger ·
A tentative conclusion · The inequality report · According to the figures;
ünite 14 What drives the price · Rents rising · The group affected ·
Never has turnout been so low; ünite 15 By the end of the decade ·
The law that failed · If the plant had stayed · Speaking about a group.
On sekiz egzersiz; ünite dışı ölçüm %0,0. B2 yuvalarının 90'ı dolu.

Ünite 13'ün noktası ÜÇ AKTARMA FİİLİ, ÜÇ KANIT DERECESİ: „is said to“
yalnızca biri söyledi demek, „is thought to“ tutulan bir görüş, „is
expected to“ ise ileriye bakıyor ve arkasında bir model var. Üçü aynı
edilgen kalıpta duruyor ve aynı şeyi söylemiyor. Almanca eksende bu üçlü
İKİYE İNİYOR: Almanca ilk ikisini de „sollen“ ile karşılıyor
(„Die Staatsschuld soll steigen“ / „Die Steuerlast soll sich verdoppelt
haben“) ve yalnızca „expected“ için başka bir yapı kuruyor („es wird
erwartet, dass“). Yani İngilizcenin üç dereceli ayrımı Almanca okuyanın
elinde iki dereceye düşüyor ve ortadaki fark görünmez oluyor.

Ünite 14'ün noktası „WHOSE“ ve bu, ilgi adılı dizisinin son üyesi: ünite
1 ile 5 „who“ ve „which“i, ünite 8 virgülü öğretmişti. „Whose“
İngilizcenin en sade yeri — kişide de şeyde de aynı, sayıya göre de
göreve göre de hiç değişmiyor. Almanca eksende bu bir ALMANCANIN FAZLASI
satırı: Almanca „dessen“ ile „deren“ arasında seçim yapıyor ve seçimi
SAHİBİN cinsine ve sayısına göre veriyor, sahip olunan şeye göre değil —
Almanca okuyanın sık yaptığı hata tam olarak burada. İngilizcede seçilecek
hiçbir şey yok.

Ünite 15'in noktası „BY NO MEANS“ OLUMSUZLUĞU KENDİ İÇİNDE TAŞIYOR:
„The claim is by no means settled“ cümlesinde hiçbir yerde „not“ yok, ve
öbeğin gücünü hisseden yazar bir „not“ ekleyince cümle tersine dönüyor.
A2'de „unless“ ile konan tuzağın aynısı, iki düzey yukarıda. Almanca
eksende bu tam bir PARİTE ve işe yarayan türden: „keineswegs“ de tek
sözcük, o da ikinci bir olumsuz istemiyor, yani Almanca okuyanın refleksi
burada doğru. Yanında çekince ölçeği duruyor: „by no means“ en sert,
„in a sense“ en yumuşak, „undeniable“ ise okuru konuşmanın dışına itiyor.

Ölçüm bu turda yetmiş sekiz sözlükçe maddesi ekletti ve sekiz maddeyi
sildirdi. İki tireli terim daha düştü („under-counted“, „three-word“) —
ünite 4 ve 9'daki kural üçüncü kez çalıştı, tireli terim tek belirteç
olarak kapanmıyor. Bir de yazım düzeltmesi: sıralama sorusundaki
„en serttten“ üç t ile yazılmıştı.


**B2 ünite 16–18 (2026-09-12).** Ünite 16 The catalogue entry ·
The season announcement · What the play does · A life on stage; ünite 17
What the festival is · Never such an outrage · By the opening ·
The second act; ünite 18 If she had portrayed it ·
Saying you disliked it · The cost report · The company report.
On sekiz egzersiz; ünite dışı ölçüm %0,0. B2 yuvalarının 108'i dolu.

Ünite 16'nın noktası ORTAÇ SÜRERLİ ZAMAN DEĞİL. „I am wanting“ yanlış,
çünkü „want“ bir durum fiili; ama „Wanting a new role, she left“ doğru,
çünkü ortaç bir zaman değil — kendi zamanı yok, zamanını da öznesini de
ana cümleden alıyor. Bu, hattın ilk İNGİLİZCE İÇİ KURAL ÇARPIŞMASI:
öğrenciyi yanıltan şey başka bir dil değil, daha önce öğretilmiş bir
İngilizce kuralı. Almanca eksende yardım yok ve engel de yok: Almancada
Partizip I biçimi var („wollend“) ama bu işte kullanılmıyor, Almanca
bunun yerine bir bağlaç kuruyor („da sie eine neue Rolle wollte“) — yani
Almanca okuyanın elinde benzeyen ama işlemeyen bir biçim duruyor.

Ünite 17'nin noktası „WHICH IS“ DÜŞÜYOR: virgüllü bir ilgi cümlesinde
„which is“ ya da „who is“ silinebiliyor ve geriye ismi açıklayan bir öbek
kalıyor („The dress, a traditional costume, is new“). Silme yalnız „be“ye
kadar uzanıyor — „which keeps“ silinmiyor, „whose“ silinmiyor, ve seçim
yapan (virgülsüz) cümlecikte hiç olmuyor. Almanca eksende yapı AYNI
duruyor ama Almanca açıklayıcı öbeği baş ismin DURUMUNA göre çekiyor;
İngilizcede çekilecek bir şey yok. Ünite 14'teki „whose“ bulgusunun
devamı: aynı yerde Almanca bir tablo açıyor, İngilizce hiçbir şey
açmıyor.

Ünite 18'in noktası İSİM + İSİM BİLEŞİĞİ: „cost estimate“, „budget plan“,
„income tax“ — iki isim, arada hiçbir şey yok, soldaki sağdakini
niteliyor. İki kural birlikte geliyor: SIRA anlamı belirliyor („a cost
estimate“ ile „an estimate cost“ aynı şey değil) ve soldaki isim TEKİL
kalıyor. Almanca eksende bu bir YAZIM farkı gibi görünüyor ama değil:
Almanca aynı şeyi TEK SÖZCÜK yaparak çözüyor („Kostenschätzung“,
„Haushaltsplan“, „Einkommensteuer“), yani Almanca okuyan kavramı zaten
biliyor ve öğrenmesi gereken şey onu AYIRMAK ile sırayı korumak. Bu
ayrıca B2 sözcük listesinin neden bu kadar çok iki sözcüklü madde
içerdiğini açıklıyor.

Ölçüm bu turda doksan sekiz sözlükçe maddesi ekletti ve on dört maddeyi
sildirdi. İki tireli örnek daha metinden çıkarıldı („three-day“,
„right-hand“) — kural dördüncü kez çalıştı ve bu kez örnekler bileşik
anlatan paragrafın kendi içindeydi, yani metnin konusu ile ölçümün sınırı
aynı yerde çakıştı.


**B2 ünite 19–21 (2026-09-12).** Ünite 19 What decides a career ·
The hiring chain · The person in the contract · Never so hard to find;
ünite 20 By December · The loan that failed ·
If the contract had covered it · The salary conversation; ünite 21
The assessment · What is said about her · What really hurt ·
How we fell out. On sekiz egzersiz; ünite dışı ölçüm %0,0. B2 yuvalarının
126'sı dolu.

Ünite 19'un noktası EDİLGEN ORTAÇTA „HAVING BEEN“ DÜŞÜYOR. „Asked to
supervise, she agreed“ cümlesi „Having been asked to supervise“ın kısası,
ve kısa biçim NORMAL olan; uzun biçim dilbilgisel ama ağır. Üstelik
„ask“ın aldığı mastar yerinde kalıyor, yani iki sözcük bütün bir cümleyi
taşıyor. Almanca eksende bu kısaltma YOK: Almanca Partizip II'yi bu işte
zarf gibi kullanmıyor („Gebeten, …“ eskimiş duruyor) ve tam bir yan cümle
kuruyor („Als sie gebeten wurde, …“). Yani Almanca okuyanın refleksi uzun
biçimi yazmak ve ürettiği şey dilbilgisel ama hep bir tık ağır.

Ünite 20'nin noktası SORU SÖZCÜĞÜ + MASTAR: „decided how to use up the
rest“ — bütün bir cümlecik iki sözcüğe katlanıyor, özne de zaman da
düşüyor ve ikisini ana cümle veriyor. Aynı kalıp „what to say“, „where to
go“, „whether to pay“ ile de çalışıyor, ama yalnız soru tutabilen
fiillerden sonra. Almanca eksende bu, ünite 19'un devamı ve turun ipini
adıyla söylüyor: **İNGİLİZCE CÜMLECİĞİ ERİTEREK KÜÇÜLTÜYOR, ALMANCA
AÇIYOR.** Almancada „wie zu machen“ diye bir yol yok; „wie man den Rest
aufbraucht“ tam bir cümle, öznesiyle ve çekimli fiiliyle.

Ünite 21'in noktası „-ING“ ADLAŞTIRMASI: ÜRETKEN KAPI. Ünite 4, 10 ve 16
ekin fiilden türetilemediğini göstermişti — liste var, kural yok. Burada
listenin yanındaki ikinci yol açılıyor: fiile „-ing“ takmak istisnasız
her fiilde çalışıyor („the building of“, „the naming of“). Yani
İngilizcede biri KURALSIZ BİR LİSTE, öteki LİSTESİZ BİR KURAL olan iki
yol var ve ikincisi her zaman açık. Almanca eksende bu tam bir PARİTE ve
hattın en temiz kapanışlarından biri: Almancanın üretken yolu da aynı
yerde duruyor — mastarı büyük harfle yazmak („das Aufbauen“) — yani ünite
4'te „Almanca düzenli, İngilizce listeli“ diye açılan iplik burada
İngilizcenin de bir düzenli yolu olduğu söylenerek kapanıyor.

Ölçüm bu turda yetmiş sekiz sözlükçe maddesi ekletti, on beş maddeyi
sildirdi ve bir dinleme bölümünü ikiye ayırttırdı. Yeni kusur: soru
şıkkına konan TİRELİ BİR EK („-ment“) tek belirteç olarak kapanmıyor —
tireli terim kuralının beşinci görünüşü, bu kez terim değil bir ekti.


**EN B2 SEVİYESİ KAPANDI (ünite 22–25, 2026-09-12).** Ünite 22
The person between us · Never felt so heavy · A year from now ·
He must have misunderstood; ünite 23 If we had talked · Naming a feeling ·
The official letter · According to the file; ünite 24
What caused the delay · How the work runs · The person responsible ·
Never so promptly; ünite 25 When the contract closes ·
The complaint answered · If the offer had held · The closing line.
Yirmi dört egzersiz; ünite dışı ölçüm %0,0. **25 ünite, 150 egzersiz,
150/150 yuva dolu, 0 boş.**

Ünite 22'nin noktası OLUMSUZU FİİLE TAŞIMAK. „must have“ olumsuzlanamıyor
ve çıkarımın olumsuzu „can't have“; ama „can't have“ çok sert — „olanaksız“
diyor. Yazarın demek istediği çoğu kez daha zayıf: „sanırım olmadı“.
İngilizcede bunun kipi yok, o yüzden kip olumlu bırakılıyor ve olumsuz ANA
FİİLE taşınıyor: „must have failed to empathize“, „must have forgotten“.
Almanca eksende bu tam bir PARİTE — Almancada da „muss nicht“ çıkarımı
olumsuzlayamıyor („gerek yok“ demek) ve Almanca da aynı numaraya
başvuruyor („muss es versäumt haben“). İkisinin de aynı yerde aynı boşluğu
olması ve aynı çözümü bulması hattın ender rastlanan tam örtüşmelerinden.

Ünite 23'ün noktası „THE“ GELİNCE „OF“ ZORUNLU: „the filing OF the
enclosure“ ile „filing the enclosure“ — iki biçim ve üçüncü seçenek yok.
Ne „the filing the enclosure“ ne „filing of the enclosure“. Ünite 21
„-ing“ adlaştırmasının üretken kapı olduğunu göstermişti; bu onun kendi
kuralı. Almanca aynı ikiliği kuruyor ama edatla değil DURUMLA:
„das Ablegen DER Anlage“ tamlayan hâli, „die Anlage ablegen“ ise
belirtme hâli — yani ayrım aynı, işaret başka.

Ünite 24'ün noktası VİRGÜLLÜ İLGİ CÜMLECİĞİNDE NESNE ADILI DÜŞMÜYOR ve bu,
B1 ünite 3'te açılan deliği kapatıyor. Orada nesne adılının düşebildiği
öğretilmişti („the report I sent“); söylenmeyen şey bunun yalnız SEÇİM
YAPAN cümlecikte geçerli olduğuydu. „The division of tasks, which nobody
read, is old“ cümlesinde „which“ nesne ve silinemiyor. Almanca eksende bu
geç gelen bir PARİTE: Almanca ilgi adılını hiçbir zaman düşürmüyor, yani
Almanca okuyanın elindeki kural burada ilk kez tam olarak doğru.

Ünite 25 seviyeyi iki şeyle kapatıyor. Dilbilgisi tarafında „PROVIDED
THAT“: koşulun üçüncü biçimi ve „if“ ile aynı şey değil — „if“ bir durumu
BETİMLİYOR, „provided that“ bir ŞART KOYUYOR; fark anlamda değil, konuşanın
konumunda. Yanında „in view of“ duruyor, geriye bakan ve masadaki bir şeye
dayanan neden. Kapanış ipi ise şu: **B2 YENİ BİR ZAMAN ÖĞRETMEDİ.**
Öğrettiği on yapının her biri kimin görüneceğine dair bir karar — edilgen
faili gizliyor, adlaştırma kişiyi gizliyor, yarık cümle okuru
yönlendiriyor, çekince kaynak olmayı reddediyor, devrik sıra sesi
yükseltiyor, ortaç iki şeyin birbirine ait olduğunu söylüyor, aktarma
fiili kanıtı derecelendiriyor. Seviyenin son cümlesi de bunun sorusu:
bir biçimi seçmeden önce, onu kullandığında kimin kaybolduğunu ve o adı
söylemeye razı olup olmadığını sor.

Ölçüm bu turda yüz yirmi altı sözlükçe maddesi ekletti ve YİRMİ ALTI
maddeyi sildirdi — hattın en yüksek silme sayısı. Sildirmenin bu kadar
büyük olması bir araç değişikliğinden: maddeler tek tek değil, kapının
kendi çıktısından okunarak toplu silindi, ve sonuç her turda elle
yapılanla aynı oldu. Bir kısa cevap da beş kelimeyi aştığı için yeniden
yazıldı.


**C1 AÇILDI (ünite 1–3, 2026-09-12).** Ünite 1
The same thing in three registers · Leaving it out · Weight at the end ·
The formal request; ünite 2 The tone of concession · The settled pairing ·
The verb carries the verdict · The nuance of may well; ünite 3
Not exactly cheap · Holding the text together · Dissent without rupture ·
Quoting the opponent. On sekiz egzersiz; ünite dışı ölçüm %0,0. C1
yuvalarının 18'i dolu. Okuma metni artık 250–450 kelime (B2'de 200–350),
ve seviyenin konusu yapı değil ÜSLUP.

Ünite 1'in noktası İSTEK KİPİ: „I insist that the board convene tomorrow“
— üçüncü kişide ek yok, „should“ yok, olumsuzu „do“ olmadan kuruluyor,
„be“ „be“ kalıyor. Almanca eksende bu hattın en zarif bulgularından biri:
Almancanın Konjunktiv I'i de bir kalıntı, ama BAŞKA BİR İŞ için
saklanmış — Almanca onu aktarma için tutuyor, İngilizce talep için. İki
dil, aynı kipin iki kalıntısı, ters işler. Üstelik İngilizcenin ikinci
kalıntısı („Were it not for …“) B2 ünite 8'de öğrenilmişti, yani öğrenci
kipin iki yarısını iki seviyede ve farklı adlarla tanıyor.

Ünite 2'nin noktası AKTARMA FİİLİ HÜKMÜ TAŞIYOR: „He claimed it; she
conceded it; they alleged it“ — tek fark fiilde ve üç ayrı yargı çıkıyor.
B2 ünite 13 „said / thought / expected“ ile üç KANIT derecesi
göstermişti; burada ölçek yargıya dönüyor ve yansız kalmak diye bir
seçenek kalmıyor: yansız tek fiil „said“ ve o da sıkıcı. Almanca eksende
İngilizce burada MECBUR, Almanca değil — Almanca aynı işi „sollen“ ve
Konjunktiv I ile dilbilgisinden çözebildiği için yazar fiil seçmeden de
mesafe koyabiliyor. Yani İngilizcede her aktarma bir imza taşıyor.

Ünite 3'ün noktası OLUMSUZLA SÖYLENEN OLUMLU (litotes): „Not exactly
cheap“ pahalı, „I wouldn't say no“ evet demek. Asıl bulgu bunun ne işe
yaradığı: iddia kuruluyor ama İNKÂR EDİLEBİLİR bırakılıyor, böylece oda
yanıt vermek zorunda kalmadan ilerleyebiliyor. „Hardly“ ayrıca kendi
olumsuzunu taşıyor — A2'deki „unless“ ve B2'deki „by no means“ ile aynı
tuzak, üçüncü kez. Ve hattın ilk kez söylediği şey şu: bu figür CÜMLEDEN
ÖĞRETİLEMİYOR. „Hardly self-righteous“ övgü de olabilir hakaret de, ayıran
şey ton değil önceki cümle; yani kapı burada tek cümleyi değil paragrafı
ölçmek zorunda.

Ölçüm C1'de ilk kez çalıştı ve havuz en genişi olmasına rağmen ilk
taslakta %4,7 çıktı — B2'nin açılışıyla aynı düzey. Yüz kırk yedi
sözlükçe maddesiyle %0,0'a indi, otuz yedi madde silindi ve bir dinleme
bölümü ayrıldı. İki tireli terim daha metinden çıkarıldı („third-person“,
„near-miss“) ve bu kez bir soru şıkkındaki tireli EK de düştü — kural
altıncı kez çalıştı.


**C1 ünite 4–6 (2026-09-12).** Ünite 4 The barbed reply ·
The short answer · The phrases of debate · Shifting the stress; ünite 5
The language of motions · How strong is your claim · The same objection ·
Binding a long argument; ünite 6 The petition ·
The same event in three texts · What the witness said ·
The settled legal phrase. On sekiz egzersiz; ünite dışı ölçüm %0,0. C1
yuvalarının 36'sı dolu.

Ünite 4'ün noktası AYNI „WHAT“ İKİ AYRI İŞ GÖRÜYOR. „What the debate does
IS polarize“ bir yarık cümle; „What we enshrine WE rarely comprehend“ ise
öne çıkarılmış bir nesne. İlk üç sözcük birebir aynı ve okur hangisi
olduğunu ancak DÖRDÜNCÜ sözcükte anlıyor. Almanca eksende bunun karşılığı
yok, çünkü Almanca öne çıkarılan öğeyi genellikle bir GERİ GÖNDERME
ADILIYLA tekrarlıyor („Was wir festschreiben, DAS begreifen wir selten“).
Yani Almanca okur için belirsizlik hiç doğmuyor — ve tam bu yüzden Almanca
okuyan İngilizcede dördüncü sözcüğü beklemeyi öğrenmek zorunda.

Ünite 5'in noktası ORTA ÇATI: „A wave of outrage reads differently“ —
fiil etken biçimde, ama özne eylemi yapan değil, eylemin uygulandığı şey.
Edilgen değil, çünkü edilgende gizli bir fail var; burada hiç fail yok.
Almanca eksende bu temiz bir „Almanca işaretliyor, İngilizce işaretlemiyor“
satırı: Almanca aynı işi DÖNÜŞLÜ biçimle kuruyor („der Satz liest sich
anders“, „das Buch verkauft sich gut“), yani orada bir „sich“ var ve
İngilizcede hiçbir şey yok. Üstelik bu ünitenin konusu metnin bağlama göre
değer değiştirmesi ve orta çatı, bunu BİR OKUR ADLANDIRMADAN söyleyebilen
tek kuruluş.

Ünite 6'nın noktası „TO X IS TO Y“: İngilizce mastarı hiçbir desteğe gerek
duymadan özne yapabiliyor. Olumlu biçim bir özdeşlik kuruyor, olumsuz biçim
bir ÇIKARIMI reddediyor — olguların hepsi ayakta kalıyor, yalnız okurun
atmak üzere olduğu adım geri çevriliyor, ve bu hukuk ile akademik yazının
karakteristik cümlesi. Almanca eksende iki fark birden var: Almanca bu işte
„be“ değil „heißen“ kullanıyor, ve ağır bir mastarı başa koymak yerine
„es“ ile öteliyor. Ünite 4'le birlikte turun ipi bu: **İNGİLİZCE AĞIR
OLANI BAŞA KOYUP OKURUN TAŞIMASINI BEKLİYOR; ALMANCA YA DESTEK KOYUYOR YA
DA ÖTELİYOR.**

Ölçüm bu turda yüz iki sözlükçe maddesi ekletti ve sekiz maddeyi sildirdi.
İki tireli terim daha metinden çıkarıldı („middle-voice“, „twenty-page“) —
kural yedinci kez çalıştı. Bir de araç tarafında küçük bir ders: sözlük
dosyasına toplu ekleme yaparken var olan anahtarları atlamak gerekiyor,
yoksa tek bir çakışma bütün bloğu düşürüyor.


Ünite 7'nin noktası EKSİLTME ve bu ünite üç ayrı büyüklükte deliği tek
derste yan yana koyuyor: fiil siliniyor ve yerini virgül tutuyor („Some
articles name arson; others, bodily harm“), nesne siliniyor ve geçişli
fiil bir kişiyi değil bir siyaseti adlandırmaya başlıyor („The police
would apprehend if they could“), yüklem bütünüyle siliniyor ve „is not“
onu tek başına taşıyor („One road is impassable; the other is not“).
Yeniden ölçüm bu kez beklenmedik bir yere çıkıyor. Üç satırın üçü de aynı
yönde gitmiyor: birincisinde İngilizce virgüle muhtaç, çünkü deliği başka
hiçbir şey göstermiyor — fiili ikinci konumda tutan bir dil ise boş
konumun kendisiyle idare ediyor, yani orada noktalama, söz diziminin
zaten yaptığı işi yapıyor. İkincisinde İngilizce ÖNDE: „if they could“
orada bitiyor, Almanca ardına bir „es“ bırakmak zorunda. Üçüncüsünde
İngilizce GERİDE: Almanca „die andere nicht“ diyerek fiili de atıyor,
İngilizce „is“i tutmak zorunda. Ölçünün adı bu: **SİLME YÖNÜ DİLE DEĞİL
BİÇİME BAĞLI** — bir dil „daha çok siliyor“ diye bir şey yok, her biçim
kendi yönünü seçiyor. Ünitenin ikinci yarısı da aynı aileden: „may well
be raised“, „would tend to fall“, „might have been expected to“ — İngilizce
çekinceyi UZATARAK kuruyor, dört beş sözcüklük bir zincir; Almanca tek bir
vurgusuz parçacıkla („wohl“, „durchaus“, „eher“) aynı işi görüyor. Bu
kayıtta çekince nezaket değil SORUMLULUK: mahkemede söz diye alıntılanamayan
cümle yazmanın adı.

Ünite 8'in noktası SORU EKİ. İngilizce onu her seferinde yeniden
hesaplıyor — hangi yardımcı fiil, cümle artı mı eksi mi, özne hangi adıla
iniyor — ve üçünden birini yanlış yapan satır sözlükle bulunamayacak
biçimde İngilizce olmaktan çıkıyor. Almanca hiç hesap yapmıyor: sona
değişmez tek bir sözcük („oder?“) koyuyor. Hesabın bedeli var ama
karşılığı da var ve karşılık şu: **EK, CÜMLENİN GİZLİ KUTBUNU AÇIĞA
ÇIKARAN TEK GÖRÜNÜR KANIT.** „Hardly cyclical, is it?“ içinde hiç „not“
yokken ek artı kalıyor, çünkü „hardly“ cümleyi çoktan olumsuz saymış;
„seldom“, „barely“, „few“ de öyle. Almancada bu testi çalıştıracak bir
yer yok, dolayısıyla soru hiç sorulmuyor. İkinci ölçü ekin bir TABANI
olması: konuşmada her yerde, kararda ya da raporda hiç. Yazı aynı işi
başka yoldan görmek zorunda — sona eklenen bir yan cümleyle ya da tek
başına bırakılmış bir eksiltili söyleyişle — ve bu, ünite 3'ün açtığı
ipin neden yazının aracı olduğunu açıklıyor. Ünitenin yazılı yarısı da
bunu doğruluyor: „This alone binds…“ (özneden sonra „alone“), „Such a
hardship case is rare“ (geriye işaret eden ve betimlemenin kesin olduğuna
söz veren bir kalıp), „The latter falls to…“ (dört sözcük kazanıp bir
bakış harcayan kısaltma) — üçü de sesli söylenince belge okunuyor gibi
duyuluyor, ki testin kendisi bu.

Ünite 9'un noktası BAĞLAÇSIZ KOŞUL: fiil kendi cümleciğinin başına
geçiyor, „if“ atılıyor, koşul anlamını yalnız söz dizimi taşıyor („Were
it not for metaphysics…“, „Had the court known“, „Should you need the
file“). Bu turun en ender bulgusu burada: **MEKANİZMA AYNI.** Almanca da
tam bunu yapıyor — fiil başa, bağlaç yok, anlam aynı. Yani ortada
„İngilizcenin fazlası“ ya da „Almancanın fazlası“ yok; ayrım yapıda değil
KATTA. Almancada hareket sıradan: mutfakta da, şikâyette de, park yeri
tartışmasının ortasında da duyulur. İngilizcede işaretli: „Had I known“
sayfaya ait, odaya değil. Sonucu şu ve pratikte can yakan yer tam orası:
kendi gündelik biçimini olduğu gibi İngilizceye taşıyan bir Alman
konuşucu, durduğu kattan üç kat yukarıda bir kayda çıkıyor — yazdığı
hiçbir şey yanlış değil, yazdığı her şey niyet ettiğinden yüksek sesli.
Ölçünün cümlesi: **İKİ DİL AYNI BİÇİME SAHİP OLUP ONU FARKLI FİYATA
KİRALAYABİLİR.** Yanında iki ek ölçü var: izinli fiil listesinin üçle
kapalı olması (were/had/should) B2'deki „Almanca düzenli, İngilizce
listeli“ ölçüsünün bu seviyedeki karşılığı; ve ünite 7'nin silmesi şiir
dersinde geri dönüyor ama işlevi değişiyor — orada vurgu ve tasarruftu,
burada BOŞLUK: „The poem is fragmentary; the reader, contemplative“
cümlesinde fiili geri koyduğunuzda cümlede hiçbir şey bozulmuyor, şiir
yalnızca üzerine kurulduğu bir saniyelik sessizliği yitiriyor.

Ölçüm bu turda yüz yirmi beş sözlükçe maddesi ekletti ve on maddeyi
sildirdi; altı soru yüzeyi yeniden yazıldı (seçenek ya da kabul listesi
metinde geçmeyen bir sözcük taşıyordu). Araç tarafında bir hata çıktı ve
kaydedilmeye değer: enjektör kapı çıktısını `%\s+[\d.]+` ile okuyordu,
oysa kapı yüzdeyi sağa yaslıyor ve `%10.0` gibi satırlarda `%` ile sayı
arasında boşluk kalmıyor — o tek satır sessizce atlanıyordu, üstelik
toplam yine `%0.0` göründüğü için fark edilmesi kolay değil. Desen
`%\s*` yapıldı.


Ünite 10'un noktası SONA ASILAN NİTELEME. „The multilayeredness above
becomes a predisposition below“ — iki edat nesnesiz kalmış ve ismin
ardına asılmış, ve İngilizce bunu uzun metinlerde durmadan yapıyor: the
claim above, the table below, the passage quoted earlier, the objection
raised on the first page. Hepsi birer gönderme ve birlikte denemenin,
konu hakkında hiçbir şey söylemeyip okurun nerede durduğunu söyleyen bir
KATMANINI kuruyorlar. Yeniden ölçüm bu seviyenin açılış ipini tersine
çeviriyor. Cümle düzeyinde İngilizce ağır olanı başa koyuyordu; isim
öbeğinde tam tersini yapıyor: niteleyen her şey ismin ardına parça parça
asılabiliyor ve öbek yol boyunca HER NOKTADA tamamlanmış oluyor („the
resentment“ → „the resentment of an earlier page“ → „…that nobody
answered“). Almanca aynı öbeği önden kuruyor, ismin önünde erken açılan
ve isim gelene dek kapanmayan bir parantezle, ve ortada durulabilecek bir
yer yok çünkü daha üzerinde durulacak isim gelmemiş. Ölçünün adı: **YÜK
DAĞILIMI DİLİN DEĞİL KATMANIN ÖZELLİĞİ** — aynı dil bir katmanda başa,
ötekinde sona yüklüyor. Pratik sonucu da var: İngilizce yazar öbeğin
arkasına eklemeye devam edebiliyor ve cümle okunmaz olmuyor; aynı biçimde
ekleyen Alman yazar bir parantez dolduruyor ve parantezin bir boyu var.
Ünitenin ikinci dersi bunun küçük kardeşi: „albeit“ cümlecik istemiyor
(„Her demeanor, albeit formal, fits the milieu“), ve fiilsiz bir tavizin
hiçbir zaman savunulması gerekmiyor çünkü hiçbir şey cümle olarak
söylenmemiş.

Ünite 11'in noktası GENEL ÖZNE. İngilizcede „hiç kimse“ demenin dört yolu
var ve dördü de yansız değil: „one“ resmî, kullanımdan düşmekte ve yazarla
iddia arasına duvar koyuyor; „we“ yazarı konuşan öbeğin içine alıyor ve
okurun sorulmadan içeri alındığı bir öbek kuruyor; „you“ cümleyi okura
çeviriyor, dördünün en dostu ve en tehlikelisi, çünkü okura bir kanı verip
onu elinde bırakıyor; edilgen ise hiç kimseyi adlandırmıyor — kim, hangi
bakanlıkta, ne zamandan beri, hepsi tek bir fiilin içinde kayboluyor.
Almanca tek bir sözcükle geçiyor („man“): kısa, işaretsiz, mutfakta da
mahkemede de aynı, hiçbir konum taşımıyor. Ölçü: **BİR DİLDE İŞARETSİZ
TEK SÖZCÜK, ÖTEKİNDE DÖRT SEÇENEK VE HER SEÇİM YAZARI BETİMLEDİĞİ
İNSANLARA GÖRE BİR YERE KOYUYOR.** Ünitenin ikinci ölçüsü aynı kaçınmanın
öteki yüzü: soyut bir ismi baştaki yuvaya koymak („What marginalization
does is name a marginal group“, „Behind the demarcation line stands
xenophobia“) faili hiç anmadan cümle kurmanın ikinci yolu. İkisi hiç
benzemiyor ve aynı işi görüyor. Ünite bunu yasaklamıyor, bedelini
saydırıyor: böyle her cümle birini adlandırılmaktan kurtarmıştır ve
sayfanın bir yerinde o birinin yine de adlandırılması gerekir, yoksa
paragraf hiç kimsenin değiştiremeyeceği bir süreç hakkındadır.

Ünite 12'nin noktası KARŞILAŞTIRMADA EKSİLTME. „Kinship may well shape
the lifeworld more than the law“ iki ayrı cümle demek olabiliyor — ya
hukuk yaşam dünyasını daha az biçimlendiriyor, ya akrabalık hukuku daha az
biçimlendiriyor — ve cümlede seçim yapan hiçbir şey yok. Nadir bir kaza
değil: yalın bir isimle biten her İngilizce karşılaştırmada aynı delik
var, çünkü ikinci yarı karşılaştırılan tek sözcük dışında her şeyi
atabiliyor ve fiil gidince sözcüğün hangi rolde olduğunu gösterecek iz de
kalmıyor. Almanca bu belirsizliği hiçbir hüner harcamadan kapatıyor:
isim zaten durum ekiyle geliyor, biri özne biri nesne diyor ve okur
cevabı cümle bitmeden alıyor. Ölçü: **ALMANCA TEK BİR EKLE KAPATIYOR,
İNGİLİZCEDE BOŞLUK ELLE ONARILMADIKÇA KALICI.** Tek onarım fiili geri
koymak — „more than the law does“ tek okumalı, „more than it does the
law“ ötekini veriyor — ve virgül, söz dizimi ya da bağlam işe yaramıyor.
Bu da İngilizcenin küçük yardımcı fiilinin dildeki yerini hak ettiği
ender yerlerden biri: kendi anlamı yok, yalnız gerçek bir fiilin duracağı
yerde duruyor, ve burada bir ismin rolünü okunacak kadar açık tutabilen
tek şey o.

Ölçüm bu turda seksen sekiz sözlükçe maddesi ekletti ve otuz altı maddeyi
sildirdi — bu turda silmelerin çoğu kapının değil BENİM yazdığım fazladan
maddelerdi (metinde geçmeyen sözcüğe sözlükçe yazmışım), yani sıra artık
şu: önce fazlalıkları buda, sonra kapının istediklerini yerleştir. Altı
soru yüzeyi yeniden yazıldı. Üç tireli terim metinden çıkarıldı
(„one-directional“, „so-called“, „time-honoured“) — kural sekizinci kez
çalıştı. Bir de yeni bir kapı öğrenildi: `prose`/`prose-de` alıntıyı
hedefte birebir arıyor, bu yüzden Türkçe bir sözcüğü tırnağa alan bir
intro („„Biz“ ile „onlar“…“) İngilizce tarafta „alıntı düşmüş“ veriyor;
intro İngilizce belirteçleri tırnağa alacak biçimde yeniden yazıldı, ve
tırnak içi BÜYÜK/küçük harfiyle korunmak zorunda („Less so“, „less so“
değil).


Ünite 13'ün noktası YER SÖZCÜKLERİNİN YERİ BIRAKMASI. „Where the
semantic context is missing…“ — ilk sözcük hiçbir yeri göstermiyor,
„şu durumlarda ki“ demek, ve akademik İngilizcenin bu iş için olağan
bağlacı. Yalnız da değil: „whereas“ (ünite 7'de bir ücret mektubunda
geçmişti) „where“ ile „as“ın birbirine itilmiş hâli ve hiçbir yer
adlandırmıyor, iki şeyi ayrı tutuyor; „whereby“ sözleşmelerde yaşıyor;
„wherein“, „whereof“, „whereupon“ — hepsi bir yer sözcüğü ile bir
edattan kurulmuş ve hiçbiri artık yerle ilgili değil. Almanca AYNI
aileyi aynı parçalardan kurmuş: „wobei“, „wodurch“, „wohingegen“,
„worauf“. Mekanizma birebir aynı, anlamlar neredeyse madde madde
örtüşüyor — bu kursta o kadar seyrek ki açıkça söylenmeye değer. Ayrım
ÖĞRENENİN GÖREBİLDİĞİNDE: Almanca parçaları yazıyor, iki yarı da orada
duruyor ve bilmeyen bir okur sözcüğü söküp aşağı yukarı doğruyu buluyor;
İngilizce yüzyıllar önce kaynaştırmış ve „whereas“ı sökmek cevabı zaten
bilmeyen için olanaksız — „where“ artı „as“ iki şeyi ayrı tutmakla ilgili
hiçbir şey öngörmüyor. Ölçü: **AYNI YAPIM İKİ DİLDE DE VAR; ALMANCADA
PARÇA GÖRÜNÜR, İNGİLİZCEDE KAYNAŞMIŞ** — sökülebilen sözcük tahmin
edilebilir, sökülemeyen öğretilmek zorunda, ve İngilizce bunlardan uzun
bir listeyi tam da tahminin en ayartıcı olduğu kayıtlarda tutuyor.
Ünitenin ikinci bulgusu kendi yapısından çıkıyor ve okura da söyleniyor:
buradan sonra BİÇİMLER yenilenmiyor, değişken sözcük dağarcığı oluyor —
ilk öğrenildiği paragrafın dışında kullanılamayan bir biçim henüz
öğrenilmemiştir. Bir de „-ization“ ailesi üzerine küçük bir ölçü: isim
doğru ya da yanlış olamaz, dolayısıyla „precarization“ ancak cümleye geri
çevrildikten sonra yanıtlanabiliyor — ünite 12'nin onarımı („fiili geri
koy“) burada ikinci bir kusurda çalışıyor.

Ünite 14'ün noktası AĞIR NESNENİN SONA KAYMASI. „…make permanent every
apprenticeship contract“ — olağan sıra „make something permanent“ iken
nesne, ne olacağını söyleyen sözcüğün üstünden atlayıp cümlenin sonuna
inmiş, ve atlama nedeni anlam değil UZUNLUK. Aynı kural öbeksi fiilde de
çalışıyor: „spin off the unit“ ama „spin it off“ — tek sözcük asla ağır
değil, ve adılda kural tersine dönüp kesinleşiyor. Yani İngilizce cümle
sonunu ağırlığa göre diziyor: hafif önce, ağır sonra, ve okura parçalar
her biri bir sonraki gelene kadar tutulabilecek kısalıkta veriliyor.
Almanca bunu ne yapabiliyor ne de yapması gerekiyor: fiil ikiye ayrılıyor
ve ikinci yarısı cümleciğin sonunu zaten tutuyor, nesne ne kadar uzarsa
uzasın fiilin önünde kalıyor; uzayan Almanca cümle hiçbir şeyi
kaydırmıyor, yalnızca okuru parantezi kapatan parça için daha uzun
bekletiyor. Ölçü: **İKİ DİLİN DE CÜMLE SONU İÇİN BİR SIRA KURALI VAR AMA
İKİSİ AYRI ŞEYE BAKIYOR — İNGİLİZCE AĞIRLIĞA, ALMANCA FİİL PARANTEZİNE**,
ve Alman yazarın oynayabildiği şey sonu değil başa neyin konduğu.
Bu, ünite 10'un bulgusunun öteki yarısı: isim öbeği arkadan büyüyordu,
burada cümle o büyüyen öbeğe sonda yer açıyor.

Ünite 15'in noktası GEÇİŞLİLİK DEĞİŞTİREN FİİL. „The pension level fell“
— fiilin öznesi var, nesnesi yok, ve düzey değiştiren değil DEĞİŞEN şey.
Bu cümleyi kurmak için hiçbir şey silinmemiş: edilgen yok, geri konacak
bir fail yok, bakanlığın yerini tutan soyut isim yok; fiil yalnızca
kimseye gerek duymayan okumasında kullanılmış. İngilizce neredeyse her
değişim fiiline bunu yaptırıyor (a price drops / they dropped the price)
ve böylece seviyenin failsiz cümle ailesinin ÜÇÜNCÜ ve en sessiz üyesi
ortaya çıkıyor: edilgen dikkatli okurun bulabileceği bir delik bırakıyor,
soyut özne hiç değilse görünür bir isim koyuyor, bu ise hiçbir iz
bırakmıyor — cümle tam, olağan ve kısa, ve içinde adın eksik olduğu bir
yer yok. Almanca farkı sözcüğün kendisinde işaretliyor: değişen için ayrı,
değiştiren için ayrı fiil, aynı kökten farklı ekle, dolayısıyla Alman okur
hangi okumada olduğunu özneyi hiç düşünmeden fiilden öğreniyor. Ölçü:
**İNGİLİZCEDE FAİL FİİLİN İÇİNDE KAYBOLUYOR; ALMANCADA FİİL HANGİ
OKUMADA OLUNDUĞUNU SÖYLÜYOR.**

Ölçüm bu turda yüz sözlükçe maddesi ekletti ve otuz dokuz maddeyi
sildirdi; sekiz soru yüzeyi yeniden yazıldı. Bu turda yeni bir şey
görüldü: ünite 13'ün okuma metni Almanca sözcükler (wobei, wodurch,
wohingegen, worauf) içeriyor ve kapı bunları da ölçüyor, yani İngilizce
kursun bir egzersizinde Almanca maddeler sözlükçeye Türkçe karşılıkla
girdi — ölçüm doğru davrandı, çünkü metin gerçekten o sözcükleri
kullanıyor. Bir de budama sırasının önemi bir kez daha çıktı: çok
sözcüklü kendi maddemi („neither of them“) sildiğimde kapının o güne dek
kapalı saydığı tek sözcük („neither“) açığa çıktı; budamadan sonra kapı
mutlaka yeniden koşulmalı.


Ünite 16'nın noktası FİİL + SIFAT YÜKLEMİ. „The barren fields lie
fallow“ — fiil „be“ değil ve anlamını yitirmemiş: duruşu fiil, durumu
sıfat taşıyor, ve ikisi ayrı sözcük. İngilizcede bunun bir atölyesi var:
stand empty, run dry, fall silent, come loose, go hungry, lie idle. Bunlar
tek tek ezberlenecek kalıplar değil; desen üretken, yazar bu öğleden sonra
yenisini kurup („stand vacant“, „fall quiet“) ilk okuyuşta anlaşılabiliyor.
İki küçük sınama iki sözcüğün gerçekten iki olduğunu gösteriyor: araya
belirteç sokulabiliyor („lie completely fallow“) ve sıfatın önüne derece
sözcüğü konabiliyor („stand almost empty“) — hiçbiri tek bir sözcüğün
içinde olamazdı. Yeniden ölçüm bu kursun alışılmış yönünün TERSİ: Almanca
aynı iki fikri tek fiile kaynaştırıyor — bitişik yazılan, birlikte çekilen,
sözlükte tek madde olan bir sözcük. Yani burada parçaları ayrı tutan
İngilizce, bileştiren Almanca, ve bu isimlerde olanın tam tersi. Ölçü:
**BİLEŞTİRME ALIŞKANLIĞI DİLİN BÜTÜNÜNÜN DEĞİL SINIFIN ÖZELLİĞİ.**
Öğrenen için sonucu simetrik ve acı: Almanca konuşan „stand vacant“ı
sözlükte arayamayacağını, İngilizce konuşan ise Almanca karşılığının
sözlükte DURDUĞUNU ve yenisinin öylece uydurulamayacağını kabul etmek
zorunda.

Ünite 17'nin noktası „NO“ İLE „NOT“ ARASINDAKİ SEÇİM. „No“ bir
belirleyici: ismin önüne geçip bütün TÜRÜ yadsıyor. „Not“ cümle
olumsuzlayıcısı: „have“ gibi bir fiille küçük yardımcı fiile gerek duyuyor
ve yadsıdığı şey bu ÖRNEĞİN burada olduğu. „We have no factory farming
here“ böyle bir şeyin türce bulunmadığını söylüyor ve tek bir ahır
gösterilerek yanıtlanabiliyor; „we do not have factory farming here“ ise
burada olanın o olmadığını söylüyor ve öyle yanıtlanamıyor. Almancanın tek
bir olumsuz belirleyicisi var ve ikisini birden karşılıyor, hiçbir seçim
taşımıyor. Ölçü ters yönlü bir uyarı: **REFLEKS TEK BİÇİM OLDUĞU İÇİN
ALMANCA KONUŞAN HER SEFERİNDE „NO“YA UZANIYOR VE İNGİLİZCENİN SESSİZ
OLANINI KULLANACAKKEN VURGULU OLANA DÜŞÜYOR** — yanlış olan eksik bir
sözcük değil, var olan ve bir beden fazla yüksek bir sözcük, ve hiçbir şeyi
yanlış olmadığı için kimse düzeltmiyor. Bu ünite ayrıca seviyenin bir
bilmecesini kapatıyor: „We have no deviance here“ (ünite 12), „We have no
formation of elites here“ (ünite 15) ve buradaki üçüncüsü hep aynı biçim,
ve her seferinde cümle devam edip şeyi başka bir adla kabul ediyor — çünkü
„no“ türü yadsıyor, dolayısıyla ikinci yarı örneği kabul etmekte serbest
ve iki yarı çelişmiyor.

Ünite 18'in noktası ÖNEKLE FİİL TÜRETME. „They reforest the hillside; the
plain, they deforest“ — „forest“ bir isim, İngilizce önüne bir hece koyup
ondan iki kez fiil yapmış, ve iki hece ters yönlere çekiyor: biri geri
koyuyor, öteki alıp götürüyor, ve sözcüğün başka hiçbir yeri değişmemiş.
Bu, dilin en üretken makinelerinden biri ve bütün bir alan sözcük
dağarcığının on yılda kurulabilmesinin nedeni: decouple, decarbonize,
renaturalize, rewild. Almanca da isimden fiil yapıyor ve önek de
kullanıyor, ama ÇİFT SAĞ KALMIYOR — ormanı geri koymak ile almak için
çoğunlukla ayrı kökler kullanılıyor, dolayısıyla Alman okur iki olağan
fiille karşılaşıyor ve hiçbirinde ötekinin karşıtı olduğunu söyleyen bir iz
yok. Ölçü: **İNGİLİZCE İLİŞKİYİ SÖZCÜĞÜN İÇİNE KOYUYOR, ORADA
GÖRÜLEBİLİYOR; ALMANCA DIŞARIDA BIRAKIYOR, ORADA BİLİNMESİ GEREKİYOR** —
çift dünyada var, sözcükte yok. Kazancın bedeli de burada adlandırıldı:
böyle kurulan bir sözcük yerleşik bir sürecin adı gibi görünüyor;
„decarbonization“ bir makalede uydurulmuş bir isim olarak doğdu, şimdi
yasada geçiyor, ve biçiminde bunu kimsenin yapıp yapmadığını söyleyen
hiçbir şey yok — sözcüğü sökebilen okur, sözcüğün bir yapısı olduğu için
şeyin bir yöntemi olduğuna inanmaya ayartılıyor.

Ölçüm bu turda yüz bir sözlükçe maddesi ekletti ve yirmi sekiz maddeyi
sildirdi; üç soru yüzeyi yeniden yazıldı. Tur boyunca tek bir tireli terim
bile metne girmedi — kural artık yazarken çalışıyor, ölçerken değil.


Ünite 19'un noktası EDAT EDİLGENİ. „Obsolescence is designed; longevity
is paid for“ — „for“ cümlenin sonunda duruyor ve ardında hiçbir şey yok,
çünkü „pay for something“un nesnesi özne yapılmış. İngilizce edatın
nesnesini alıp başa çıkarıyor ve edatı yöneteceği hiçbir şey kalmadan
arkada bırakıyor; liste uzun ve gündelik (dealt with, accounted for,
looked after, relied on). Ölçü bu kez tek yönlü ve kesin: **ALMANCA BUNU
HİÇ YAPAMIYOR** — Almanca edilgeni yalnız doğrudan nesneyi özne
yapabiliyor, edatın nesnesi yerinde kalıyor, edat önünde duruyor, ve cümle
başka yoldan kurulmak zorunda (öznesiz edilgen, başka bir fiil, ya da
birini adlandırıp etkene dönmek). „Longevity is paid for“un sözcüğü
sözcüğüne karşılığı yok ve çevirmen bunu neredeyse her teknik metnin ilk
paragrafında karşılıyor. İkinci ölçü: bu biçim, bir şeye bir şey
yapıldığını faili söylemeden yazmanın İngilizcedeki ana yolu — seviyenin
failsiz cümle ailesinin DÖRDÜNCÜ üyesi, ve okurun üstünde en az duracağı
üye, çünkü başa konan şey paragrafın zaten konusu olan şey.

Ünite 20'nin noktası SIFIR TÜRETME. „The dismantling began; the repurpose
did not“ — tek satırda fiilden yapılmış iki isim, iki ayrı yolla.
„Dismantling“in eki var ve bu bin yıllık, her zaman elde hazır yol.
„The repurpose“un hiçbir şeyi yok: ne ek, ne biçim değişikliği, ne görünür
bir iz; isim olduğunu söyleyen tek şey önündeki sözcük. Dönüşüm dilin en
ucuz makinesi (a build, a spend, an ask, a reveal, a read) ve öğrenilecek
bir liste yok, çünkü eklenecek bir şey yok. Almanca bunu yapamıyor: orada
fiilden yapılan isim her zaman bir iz bırakıyor — en azından büyük harf,
çoğunlukla artikel, sıklıkla da ek — yani sınıf değişimi YAZIYA
DÖKÜLÜYOR. Ölçü, bir önceki ünitenin öteki ucu: **İNGİLİZCE BİR ÜNİTE ÖNCE
ÖNEK EKLEYEREK SÖZCÜK YAPIYORDU, BURADA HİÇBİR ŞEY EKLEMEDEN YAPIYOR** —
iki makine de üretken, ikisi de beklemeyen okura görünmez, ve ikisinin
bedeli de aynı: hiçten kurulmuş yeni bir sözcük TERİM gibi duruyor, ve
planlama belgesinde başlık olarak „the repurpose“ gören okur bir yerlerde
onun formu olduğunu varsayıyor.

Ünite 21'in noktası ÇERÇEVE ÖBEĞİ: „in nominal terms“, „in real terms“,
„in terms of scale“, „in urban design terms“ (son ikisi bir önceki ünitede
geçmişti). Üç sözcük para hakkındaki herhangi bir iddianın önüne konabiliyor
ve içindeki tek bir rakamı değiştirmeden iddianın ne söylediğini
değiştiriyor: aynı bordro için ücretler nominal olarak yüzde dört yükseldi,
reel olarak yüzde bir düştü, ve iki yarı da doğru. Asıl mesele KONUM: başta
duran çerçeve okuru iddia gelmeden uyarıyor, dolayısıyla geri alınacak bir
şey olmuyor; sonda duran ise daha büyüğüne inanmış okuru düzeltiyor.
Sözcükler birebir aynı, iki cümle ayrı iş görüyor. Almanca boyutu
çoğunlukla isimden türetilmiş bir sıfata ya da bir bileşiğe koyuyor, yani
sınırlama cümlenin tamamının önünde yüzmüyor, sınırladığı öğeye
bağlanıyor. Ölçü: **ÇERÇEVE TAŞINABİLİR, EK TAŞINAMAZ — İNGİLİZCE YAZAN
OKURUN BOYUTU NE ZAMAN ÖĞRENECEĞİNİ SEÇİYOR, VE BU SEÇİMİN ÖTEKİ TARAFTA
KARŞILIĞI YOK.**

Ölçüm bu turda seksen dokuz sözlükçe maddesi ekletti ve yirmi dokuz
maddeyi sildirdi; altı soru yüzeyi yeniden yazıldı. Bir de içerik hatası
kapılardan değil okumaktan çıktı: ünite 21'in girişi „dört sözcük“
diyordu, metin ise „three words“ — giriş düzeltildi ve paketler ondan
sonra yazıldı. Kapılar sayı tutarlılığını ölçmüyor; bu sınıf yalnız
yazarken yakalanıyor.


Ünite 22'nin noktası SAYILABİLİRLİK. „Cost“ sayılabiliyor ama
„follow-up costs“ kimsenin tekilini kullanmadığı bir çoğul: raporda „a
follow-up cost“ yazılmıyor ve çoğul şeyin ADI olmuş. Asıl kural daha
geniş: advice, information, evidence, research, equipment, machinery,
capital İngilizcede ne çoğul ne tanımlık alıyor; Almancadaki karşılıkları
sorunsuz çoğul yapan sıradan sayılabilir isimler, üstelik adlandırdıkları
şeyler aynı şeyler. Ölçü: **SAYILABİLİRLİK DÜNYANIN DEĞİL DİLİN KARARI**
— hiçbir şey öğüdün parçalanamaz, uyarının parçalanabilir olduğunu
söylemiyor. İngilizce birini saymak gerektiğinde bir SAYAÇ ödünç alıyor
(a piece of advice, an item of equipment, a body of evidence); Almanca
yalnızca ek koyuyor, ve bu alışkanlığı taşıyan yazar „an advice“ ve
„informations“ üretiyor — ikisi de sayfada hata değil YABANCI AKSAN
olarak duyuluyor, ve tam bu yüzden yıllarca düzeltilmiyor.

Ünite 23'ün noktası TANIMLIKSIZ SOYUT İSİM. İngilizce soyut ismi genel
anlamda kullanırken önüne hiçbir şey koymuyor: rhetoric, pathos,
competitiveness, doubt, freedom, work. Komşu dil her birinin önüne
tanımlık koyuyor ve orada tutuyor, dolayısıyla o taraftan gelen konuşucu
İngilizcenin istemediği bir tanımlık ekliyor ve ortaya kimsenin yanlış
diyemeyeceği ama ÇEVRİLMİŞ gibi okunan bir cümle çıkıyor. Asıl incelik
şu: tanımlık, ismi DARALTAN bir şey belirir belirmez geri geliyor („the
rhetoric of the pamphlet“, „the doubt that stopped the project“) ve
daraltma çoğunlukla ismin önünde değil ARDINDA duruyor. Ölçü: **KURAL
„SOYUT İSİM TANIMLIK ALMAZ“ DEĞİL, „DARALTAN BİR ŞEY GELENE KADAR
TANIMLIK YOK“** — yani kural ismin değil BÜTÜN ÖBEĞİN kuralı, ve onu tek
başına isme ait sanan yazar iki yönde birden yanılıyor.

Ünite 24'ün noktası ORTA KONUM BELİRTECİ. „Another merely affirms it“ —
„merely“ özne ile fiilin arasında duruyor ve o aralıkta başka hiçbir şey
yok. İngilizce orada bir YUVA tutuyor: küçük, bir iki sözcük alıyor, ve
içine konan hemen her şey betimleme değil HÜKÜM (merely, probably,
clearly, knowingly, rarely, hardly). Komşu dilde böyle bir yuva yok,
çünkü çekimli fiil cümleciğin ikinci öğesi olmak zorunda; belirteç
fiilden sonraya, orta alana gitmek zorunda. Ölçü: **İNGİLİZCEDE HÜKÜM
FİİLDEN ÖNCE GELİYOR — OKUR HABERİ ALMADAN ÖNCE ONU NASIL ALACAĞINI
ÖĞRENİYOR; ÖTEKİ SIRADA HABER ÖNCE GELİYOR VE HÜKÜM ONA ÇOKTAN İNANMAYA
BAŞLAMIŞ BİR OKURA İNİYOR.** Aynı yuva hukuk cümlesinin en güçlü
sözcüğünün yeri: „She knowingly misrepresented the study“ başka bir
suçlamadır ve bütün fark tek bir sözcüğün tek bir konumdaki varlığıdır.

Ünite 25 seviyenin KAPANIŞI. „Serenity we learn; sincerity, we choose“ —
dokuz sözcük, ve bu seviyenin ölçtüğü neredeyse her şey içinde. Orada
OLMAYANLARI say: iki ismin de önünde tanımlık yok (ünite 23); hangi
sözcüğün nesne olduğunu söyleyen hiçbir ek yok (ünite 12'nin çözümsüz
belirsizliği); ikinci yarıda fiil yok, çünkü ilk yarı onu çoktan verdi ve
yerini virgül tutuyor (ünite 7); iki cümlecikte de başta özne yok, çünkü
nesne oraya taşınmış (ünite 4). Dört karar ve hiçbiri bir şey EKLENEREK
verilmiş değil; her biri bir KONUM ya da bir YOKLUK. Seviyenin kapanış
ölçüsü bu ve yirmi dört ünitelik kanıtla hak edilmiş: **KOMŞU DİL AYNI
İŞİ EKLERLE GÖRÜYOR — isimde hâl, fiile ayrılmış konum, görünür tanımlık,
her sınıf değişimi için türetilmiş biçim; dil bilgisini YAZIYA DÖKÜYOR.
İNGİLİZCE ŞEYLERİ YERİNDEN OYNATIYOR VE DELİK BIRAKIYOR, VE OKURDAN
DELİĞİN NE DEMEK OLDUĞUNU BİLMESİNİ İSTİYOR.** İkisi genel olarak
birbirinden zor değil, her biri ayrı bir yerde zor: ek öğrenilmek zorunda
ve tahmin edilemez; delik hiç öğrenilemez, çünkü öğrenilecek bir şey yok
— biçimi tanıdık gelene kadar yeterince sık karşılaşmak gerekiyor.

**WP-75 KAPANDI.** Beş seviye, 125 ünite, 750 egzersiz, 750/750 yuva.
Açılışta İngilizce Patika'nın hiçbir seviyesinde tek bir ünite egzersizi
yoktu. Ölçüm bu son turda yüz üç sözlükçe maddesi ekletti ve otuz yedi
maddeyi sildirdi; dört soru yüzeyi yeniden yazıldı. Son paketler:
prose-de s-057 (218 dize), prose p-066 (38), task-de t-050 (84).


**Sayı tutarlılığı taraması (2026-09-12, WP-75 sonrası).** Bir önceki turda
kapılardan değil okumaktan çıkan bir hata („dört sözcük“ derken metnin „three
words“ demesi) bütün bir SINIFA işaret ediyordu: Türkçe yüzeyin verdiği sayı
ile İngilizce içeriğin tuttuğu sayı arasındaki uyuşmazlıkları hiçbir kapı
görmüyor. 750 ünite egzersizi tarandı ve sınıfın en somut üyesi bulundu:
**sıralama sorusunun kökü bir sayı veriyor ama listede başka sayıda madde var**
— „Üç satırın sırası: doğru sıraya koy.“ yazıp dört madde göstermek. 41 soruda
çıktı (B1 4, B2 10, C1 27); öğrenciye üç şey sıralamasını söyleyip dört şey
gösteriyordu. Kökler sayısız biçime çevrildi („Dersin sırası: doğru sıraya
koy.“ — hattın yarısında zaten kullanılan biçim).

Asıl kazanç tarama değil KAPI: `scripts/check-content.ts` artık sıralama
sorusunun kökündeki Türkçe sayı sözcüğünü madde sayısıyla karşılaştırıyor ve
tutmuyorsa hata veriyor. Kapının gerçekten ateşlendiği tek bir kökü geri alarak
doğrulandı. Bir de araç dersi: Türkçe sözcük sınırı ASCII `\b` ile
çalışmıyor — „üç“ün önündeki „ü“ sözcük karakteri sayılmadığı için `\büç\b`
hem „Üç satır“ın başında EŞLEŞMİYOR hem de „güçlüye“nin ortasında EŞLEŞİYOR;
ilk taramada 40 gerçek hatanın hepsi bu yüzden kaçmıştı. Desen harf-dışı
ayırıcıyla bölmeye çevrildi.

Aynı turda bir yanlış alarm da kaydedilmeye değer: Almanca kursun Patika
yuvalarını ölçen elde yazma bir betik „0/870 dolu“ dedi. Nedeni üründe değil
betikteydi — `course` alanı SEÇİMLİ ve Almanca kursun egzersizleri onu
yazmıyor (`targetLangOf` yokluğu „de“ sayıyor), dolayısıyla `course === "de"`
süzgeci hiçbirini tutmuyor. Doğru süzgeçle Almanca kurs **870/870 dolu**.


**Sayı taramasının ikinci turu: içerik sayıları (2026-09-12).** Sıralama
köklerinden sonra sınıfın geri kalanı tarandı — bu kez ÜNİTE kapsamında,
çünkü yazma egzersizinin ipucu aynı ünitenin okuma/dinlemesindeki olguya
gönderme yapıyor ve egzersiz kapsamında bakmak 200'ün üzerinde yanlış alarm
üretiyor. Tarama Türkçe yüzeydeki sayı sözcüklerini ünitenin bütün İngilizce
içeriğiyle karşılaştırıyor. Üç düzeltme gerekti:

- **`en-b1-u4-l1`** girişi „Beş gündür sıcak su yok“ diyordu; diyalog
  „The boiler stopped on Saturday“ ve „today is Wednesday“ diyor — dört gün.
- **`en-a2-u7-l1`** girişi „dört soru. Hepsi kibar, hepsi dolaylı“ diyordu;
  diyalogda beş soru var ve yalnız üçü dolaylı („do I have to show my card?“
  ve „where can I buy water?“ düz soru). Giriş „üç dolaylı soru“ya çevrildi.
- **`en-b2-u13-l2`** girişi „Beş çekince, bir cümle“ diyordu; çekinceler üç
  ayrı cümleye yayılmış. Sayısız biçime çevrildi.
- **`en-b1-u22-r2`** girişi „on beş yılda“ diyordu; metin yalnız „since 2010“
  diyor ve bugünün yılını vermiyor, yani sayı metinden çıkarılamıyor.
  „2010'dan beri“ye çevrildi — metnin söylediği kadarı.

Kalan 32 işaret elden geçirildi ve hepsi MEŞRU çıktı; bir kapıya çevrilmemesinin
nedeni de bu. Üç sınıf: (a) Türkçe üstdilin bir BİÇİMİN parçalarını sayması
(„üç parça: am + going to + fiil“) — İngilizcede sayı geçmesi gerekmiyor;
(b) İngilizce edat „on“un Türkçe „on“ (10) sanılması, alıntı dışı listelerde;
(c) „yüz yüze“, „In the bin“ gibi eş yazımlılar. Tarama betiği bunları
ayıklamak için „…“ alıntılarını atıyor ve yüz/bin'i hiç saymıyor.


**Tutarlılık taramasının üçüncü turu: tür etiketi ve alıntı (2026-09-12).**
İki yeni sağlama sınıfı, bu kez İKİ KURSA birden uygulandı.

*Tür etiketi ile konuşmacı sayısı.* `genre: "monologue"` ekranda türü söylüyor;
üç kişilik bir seminer tartışmasına monolog demek okuru yanıltıyor. İki egzersiz
çıktı, her kursta bir tane: `c1-u17-l2` (Dozentin + iki Teilnehmer → `dialogue`)
ve `en-a1-u2-l2` (üç kişi sırayla kendini tanıtıyor → `profile`). Kalıcı kapı
eklendi ve bir etiketi geri alarak ateşlendiği doğrulandı. Karşılık gelen
„dialogue ≥ 2 konuşmacı“ kuralı BİLEREK yazılmadı: Almanca kursun 96 diyaloğu
`speaker` alanını hiç yazmıyor ve hepsi tek küme olurdu — kapı gürültü olurdu.

*Açıklamadaki alıntı metinde geçiyor mu.* „…“ içinde metni alıntılayan bir
açıklama yanlış alıntılıyorsa, açıklama işe yaramaz olmaktan da kötüdür. On
gerçek yanlış alıntı bulundu ve düzeltildi: `a1-u11-r1` bir ödeme seçeneğini
düşürüyordu („bar oder mit Kreditkarte“ ↔ metinde „bar, mit Kreditkarte oder
vom Konto“), `a1-u17-r2` „Dazu kommen“ diye başlıyordu (metin „Und“), `a1-u19-r2`
„Nächstes“ ekliyordu, `a1-u24-l2` cümleyi baştan yazıyordu, `c1-u03-r2` ve
`c1-u11-r1` ortadan sözcük atıyordu (biri „festgefahren“, öteki bir ara cümle),
`en-b1-u6-l2` „three per cent“ diyordu (metin „three in a hundred“),
`en-b1-u10-l1` iki cümleyi bir cümleye bağlıyordu, `en-b2-u19-l1` „two different
grammars“ diyordu (metin „two grammars“) — ve en kötüsü `en-b1-u15-l1`:
ders NESNE KONUMUNDAKİ İLGİ ADILININ DÜŞMESİNİ öğretirken açıklama „the part
that I wrote“ diye adıllı biçimi alıntılıyordu, yani kendi öğrettiğinin tersini.

Bu sınıf kapıya çevrilmedi. Nedeni ölçüldü: kalan 25 işaretin hepsi meşru ve
üç desende toplanıyor — (a) açıkça YANLIŞ diye etiketlenmiş karşı örnek
(„Yanlış: „…“"), (b) metnin söylemediğini söyleyen karşılaştırma („… demiyor“),
(c) soru ile cevabı bir tireyle birleştiren alıntı („How much is the soup? —
Five euros.“). Bir kapı bunların çerçevesini anlayamaz; gürültülü kapı
kapısızlıktan kötüdür.


**Sayı taraması Almanca kursta: temiz çıktı (2026-09-12).** Aynı tarama 145
Almanca ünitesine (870 egzersiz) koşuldu. Sonuç ÖLÇÜLMÜŞ BİR NEGATİF: gerçek
sayı uyuşmazlığı YOK. Kalan 33 işaretin hepsi meşru ve beş desende toplanıyor —
(a) yapısal sayım („Ortaç sıfatı, als ob, öznel kip ve edilgen Perfekt — B2'nin
dört sütunu“), (b) ödev yönergesi („6-9 cümle“, „(1) … (2) …“), (c) yazma
görevinin veri kartı („Gün: pazar; sonuç: 1-1; seyirci: 4000“ — öğrenciye
verilen veri, metnin iddiası değil), (d) deyim („dört gözle bekliyorum“),
(e) ünite göndermesi („ünite 43'ün kalıbı“). Betik (a)–(e)'yi eleyecek
süzgeçlerle çalıştı. Bir de dil özgü ders: Almanca sayıyı BİLEŞİK yazıyor
(„neunundzwanzig“, „viermal“, „zehnfach“), bu yüzden belirteci tam eşleştirmek
işe yaramıyor — kök araması gerekiyor; İngilizce tarafta bu sorun yoktu.

**Aynı seviyede yinelenen başlık (2026-09-12).** Patika kartı başlığı gösteriyor;
ayrı ünitelerde aynı başlık iki ayırt edilemez kart üretiyor. İki gerçek çakışma
vardı, ikisi de Almanca kursta: `a1-u25-l2` („Mein Wochenende“, u24'ün yazma
egzersiziyle aynı) → „Ein Wochenende in Hamburg“, ve `b1-u15-l1` („Das war mein
Fehler“, u9'un dinlemesiyle aynı) → „Zwei Zahlen sind falsch“. Kalıcı kapı
eklendi ve ateşlendiği doğrulandı. Kural AYNI ÜNİTE İÇİNDE bilerek gevşek:
yazma egzersizi çalıştırdığı okuma ya da dinlemenin başlığını taşıyor ve bu on
yerde tasarım gereği.


## Tamamlanma ölçütü

- `en-<seviye>-u<NN>.ts` × 25 × 5, ünite başına 2 okuma + 2 dinleme + 2 yazma
- `buildTrack` her seviyede 150/150 beceri yuvasını dolduruyor
- `test:content` bütçesi büyümemiş, `check:en-unitvocab` her ünitede raporlu
- `check:skills-prose-de` ve `check:skills-task-de` kapsam tam
- `check:dumps` kaynakla aynı
