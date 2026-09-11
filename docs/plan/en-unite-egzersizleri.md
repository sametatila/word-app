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
| A2 | 1–9 | **yazıldı** (2026-09-12) — 54 egzersiz, 54/150 yuva |
| A2 | 10–25 | bekliyor |
| B1 · B2 · C1 | 1–25 | bekliyor |

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

## Tamamlanma ölçütü

- `en-<seviye>-u<NN>.ts` × 25 × 5, ünite başına 2 okuma + 2 dinleme + 2 yazma
- `buildTrack` her seviyede 150/150 beceri yuvasını dolduruyor
- `test:content` bütçesi büyümemiş, `check:en-unitvocab` her ünitede raporlu
- `check:skills-prose-de` ve `check:skills-task-de` kapsam tam
- `check:dumps` kaynakla aynı
