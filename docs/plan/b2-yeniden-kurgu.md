# GÖREV — Almanca B2 patikasını kelime havuzuna göre yeniden kurgula

A1, A2 ve B1'de yapılan işin B2 karşılığı. **Önce `docs/plan/a2-yeniden-kurgu.md`
dosyasının tamamını oku** — özellikle §7, §8, §9 ve §10. Orada ölçülerek bulunan
şeyler burada da geçerli ve yeniden keşfetmen zaman kaybı olur.

## 1. Ölçülmüş başlangıç (2026-09-05)

100 ders × 5 kelime = **500 sözlükçe yuvası**.

| Ölçüt | Değer |
|---|---|
| B2 katmanından | 132 (%26,4) |
| B1 katmanından | 111 (%22,2) |
| A2 / A1 katmanından | 33 / 8 (%8,2) |
| C1 katmanından (seviye üstü) | 56 (%11,2) |
| **Havuzda hiç yok** | **160 (%32,0)** |
| B2 katmanının kapsanması | **132/2041 (%6,5)** |

Beceri katmanı:

| | Var | Hedef |
|---|---|---|
| Okuma | 12 | 50 |
| Dinleme | 12 | 50 |
| Yazma | 8 | 50 |
| Ünite hizalı ünite | **0/25** | 25/25 |
| Beceri metninde hiç geçmeyen ders kelimesi | 55/500 | mümkün olduğunca az |

**Eksik egzersiz: 118.** A2'de yazılan sayının aynısı.

## 2. Neden önemli — asıl gerekçe kapsama yüzdesi değil

`src/lib/session.ts:476-549`: oyun/SRS kuyruğu `words` tablosundan `niveau`
bandına göre kuruluyor (`[alt, seviye, üst]`, %70 seviyede). Yani **derste
öğretilen bir kelime havuzda değilse ya da bandın dışındaysa hiçbir zaman
tekrar edilmez.**

B2'de bugün **havuzda hiç olmayan 160 kelime** var; bunlar öğretiliyor ama
tekrar motoru onları hiç göstermiyor. A2'de aynı durumdaki 107 yuvayı
kapatmak, o işin en büyük pedagojik kazancıydı. Buradaki sayı daha büyük.

## 3. Bilmen gereken mimari gerçekler

**(a) `buildTrack` yerleştirmeyi LİSTE SIRASIYLA yapar, `unit` etiketiyle
değil.** Havuzları imleçle tüketir; `SkillMeta` `unit` taşımaz. Ünite N'in okuma
yuvalarını listedeki 2N-1 ve 2N. okuma doldurur. Bu yüzden yeni ünite dosyaları
`src/lib/skills/content/b2.ts` içinde **en başta** durmalı.

**(b) Beceri egzersizi kimlikleri canlı ilerleme taşır.** `user_skills` birincil
anahtarı `(user_id, exercise_id)` (`src/lib/db/schema.ts:366`) — `user_lessons`
ile aynı kural. **Mevcut 32 egzersizin hiçbiri silinemez, kimliği
değiştirilemez.** Yeni dosyaları listede önlerine ekle: eskiler 50. yuvanın
ötesine düşer, kimlikleri durur, ilerleme çözülmeye devam eder, yalnız patikada
zamanlanmazlar. A2'de tam olarak böyle yapıldı ve ölçümle doğrulandı.

**(c) Birikimli tekrar zaten var, yazman gerekmiyor.** `deriveQuiz` (e6885d3)
quiz ve checkpoint sorularının üçte birini geçmiş ünitelerden alıyor. Seviyeden
bağımsız çalışır.

**(d) Seviye sınavı okuma/dinlemeyi beceri bankasından çeker.** Modül sınavı
kendi planından beslenir, beceri içeriğine bakmaz. Detay: A2 briefi §10.
**Önemli:** sınav kâğıdı soruyu yalnız şıklara basarak çiziyor. Boşluk doldurma,
kısa cevap ve dikte sorularının `options` alanı boştur; `exam.ts` bunları artık
süzüyor (93c5db8), ama bu demektir ki **yazılı sorular sınava girmez** —
sınav malzemesi çoktan seçmeli sorulardan gelir. Her egzersizde en az bir
çoktan seçmeli soru bırak, yoksa o metin sınav havuzuna hiç girmez
(`check-exams.ts` bunu doğruluyor).

## 4. Önce kullanıcıya sorulacak karar: sözlükçe boyu

`scripts/check-lessons.ts` şu an B2 ve C1 için 5 kelime, altındakiler için 8
istiyor. B2 katmanı 2041 kelime; 100 ders × 5 = 500 yuva ile kapsama tavanı
**%24,5**. Sekize çıkarılırsa tavan %39 olur, ama bu doğrulayıcı sözleşmesini ve
100 dersin tamamının içeriğini değiştirir.

**Bunu kendi başına karara bağlama.** Ölçümü sun, iki seçeneği ve maliyetini
yaz, kullanıcıya sor. A2'de sekize çıkarma kararı böyle alındı.

## 5. Yöntem — A2'de işe yarayan sıra

1. **Tanı.** Yukarıdaki tabloyu kendin yeniden üret. Normalleştirme: küçük harfe
   indir, artikeli ve parantezi ayıkla; **havuz başlıklarını "/" ile BÖLME**
   (`die/das Glace/Glacé` gibi satırlar sahte seviye üretir). İşlev sözcüklerini
   kapsanmamış sayma. Eş yazımlılara dikkat: havuzda artikeli farklı aynı yazım
   var (`der See` göl / `die See` deniz) — isimleri **artikelle** anahtarla,
   yoksa yanlış seviye okursun.
2. **Kapasiteyi ve sözlükçe boyunu kullanıcıya sor** (§4).
3. **Havuz boşluklarını vet et.** 160 maddenin her biri için: gerçek başlık mı,
   türev mi? Türev (Partizip II, çoğul, derece biçimi) başlık değildir,
   `formen` alanına aittir. Girecekler için tam satır üret; **`rank` uydurma**,
   `data/a2-expansion/de_50k.txt` satır numarasından oku. Yeni kimlikler en
   büyük kimlikten devam eder; gsw-zh (100000+) ve İngilizce (209001+)
   aralıklarına girmez.
4. **Atamayı elle, modül modül yap; her modülden sonra dur ve onay al.**
   Mekanik dağıtım A2'de denendi ve reddedildi.
5. **Ders içeriğini yaz.** Sözlükçe değişince `lecture` adımları da değişir.
6. **Beceri egzersizlerini ünite ünite yaz** (6'şar: `b2-uNN-r1/-r2/-l1/-l2/-w1/-w2`),
   her dosyanın başına o ünitenin dört dersini, kelimelerini, kalıplarını ve
   ölçtüğü dilbilgisi noktasını sayan bir doküman yorumu koy. İçerik o üniteye
   kadar öğretilen kelimelerle sınırlı.
7. **Doğrula** (§7).

## 6. İçerik kalitesi — A2'de öğrenilenler

- **Her okuma/dinleme egzersizinde en az iki yazılı soru** (gapfill /
  short_answer / dictation) **ve en az bir çoktan seçmeli.** Birincisi
  `check-content.ts`'in kuralı, ikincisi sınav havuzuna girebilmek için (§3d).
- **Boşluk doldurma ve dikte cevabı metinde/segmentte GERÇEKTEN geçmeli.**
  A2'de bir soru bu yüzden düzeltildi: metinde olmayan bir cümle soruluyordu,
  öğrenci cevabı metinde arayıp bulamıyordu.
- **Her yazma setinde bir `rewrite` görevi**, Türkçe konuşanın belirli bir
  aktarım hatasını hedeflesin. A2'de en verimli kısım buydu ve hiçbir metrik
  onu ölçmüyor. B2 adayları: Konjunktiv II (`hätte`/`wäre`/`würde`), Passiv ve
  `von`/`durch` farkı, Genitiv, `zwar … aber`, `je … desto`, dolaylı anlatım,
  `lassen`, edatlı fiillerin `da(r)-` biçimleri (`darauf`, `damit`).
- **Rol yapma açılışı `?` içermeli** (`check-lessons.ts` şartı) ve seviye içinde
  yinelenmemeli. Ders başlıkları da seviye içinde benzersiz olmalı.
- **Sözlükçe (`gloss`) o metinde gerçekten geçen kelimeleri tanıtsın.** A2'de
  bazı sözlükçeler metinde bulunmayan ünite kelimesini de tanıtıyor; kırık
  değil ama tutarsız, tekrarlama.

## 7. Doğrulama

Her ünite dosyasından sonra: `npx tsc --noEmit`, `npm run test:content | grep b2-uNN`
(sıfır uyarı), `npm run check:lessons` (hata sıfır).

Kapanışta ayrıca: `mobile/` içinde `tsc`, `npm run test:track`,
`npm run test:options`, `npm run test:exams`.

Adım-6 ölçütleri (A1'de kalibre edildi, hepsi sıfır olmalı):
- her `truefalse` adımının iddiası ekranda görünüyor,
- sözlükçedeki her kelime `lecture` içinde gerçekten öğretiliyor,
- segment metinlerinde baştaki/sondaki fazla boşluk yok,
- Türkçe segmentlerin içine gömülü Almanca metin yok,
- doğru cevaplar denetleyici tarafından reddedilmiyor (`accept` varyantları),
- ders başlığı ve rol yapma açılışı yinelenmiyor.

**UYARI:** `check-lessons`'ı doğrudan `npx tsx scripts/check-lessons.ts` ile
ÇAĞIRMA — `roleplay.ts`'in `server-only` importu yüzünden sessizce çöker,
çıktısı boş gelir ve grep ile sayarsan "sıfır hata" sanırsın. Doğrusu
`npm run check:lessons` (e2e tsconfig ile çalışır).

## 8. Kurallar

1. **Ders kimlikleri ve ders sayısı SABİT.** `user_lessons` birincil anahtarı
   `(user_id, lesson_id)`; kimlik değişirse canlı ilerleme silinir.
2. **Beceri egzersizi kimlikleri SABİT** (§3b).
3. **Web canlı** (lernomi.app). Ders kaynağı mobille paylaşımlı: iyileştir,
   bozma, kopyasını çıkarma.
4. **`mobile/src/data/lessons/de-b2.json` TEK SATIR.** Üreteci
   `JSON.stringify(lessons)`; elle biçimlendirme 40 bin satırlık sahte diff
   üretir. Ders değişikliğinden sonra `npx tsx scripts/dump-lessons-mobile.ts de`,
   beceri değişikliğinden sonra `npm run dump:skills`. Üretilen paketin farkı
   yalnız kendi seviyende olmalı; başka seviyeye taşmışsa dur ve bak (paket tek
   dosyada tüm seviyeleri üretiyor, paralel oturumun işini de kapabilir —
   kaparsa commit mesajında yaz).
5. **Havuza türev eklenmez, `rank` uydurulmaz** (§5.3).
6. **Commit yerelde kalır; push Samet'in işi.**
7. **Üretim veritabanına YAZILMAZ** — tohumlama gerekiyorsa önce sor. Okuma serbest.
8. **Paralel oturumlar açık: `git add <yol>`, ASLA `git add -A`.**

## 9. Teslim

Konu başına ayrı commit, Türkçe mesaj, **ne yapıldığını değil NEDEN yapıldığını**
anlatsın. Emoji kullanma. Sonunda: neyin bittiği, neyin bilerek bırakıldığı,
hangi sayının nereden geldiği. Sonuç ölçümünü bu dosyanın sonuna yaz — bir
sonraki oturum başlangıç ölçümünü buradan okuyacak.

---

## 10. Ara sonuç — sözlükçe katmanı bitti (2026-09-05)

100 dersin sekizi de yeniden yazıldı. Aşağıdaki her sayı `scripts/check-lessons.ts`
ve kaynaktan okuyan bir doğrulayıcıyla ölçüldü.

### Hedef 1 — dersler havuzun B2 katmanından öğretsin

Sözlükçe boyu **5'ten 8'e** çıkarıldı (kullanıcı kararı, §4). 100 × 8 = **800 yuva**.

| Ölçüt | Başlangıç (5 kelime, 500 yuva) | Şimdi (8 kelime, 800 yuva) |
|---|---|---|
| B2 katmanından | 129 (%25,8) | **800 (%100)** |
| B1 katmanından | 108 (%21,6) | **0** |
| A2 / A1 | 33 / 8 | **0 / 0** |
| C1 (seviye üstü) | 56 (%11,2) | **0** |
| Havuzda hiç yok | 166 (%33,2) | **0** |
| Seviye içi tekrar | 0 | **0** |
| Seviyeler arası tekrar | — | **0** |

Brief'in başlangıç tablosu 160 diyordu; sıkı ölçüm **166** verdi. Fark dönüşlü
ve edatlı biçimlerde (`sich melden`, `sich vernetzen`, `bestehen auf`): havuzda
dönüşlüsüz kayıt var ama "aynı madde mi" bir karardır, otomatik eşleşme değil.
Altısı da vetoda tek tek karara bağlandı (`docs/plan/b2-havuz-veto.md`).

### Asıl gerekçe: erişilemez yuva 207'den 0'a indi

`session.ts:268-280` — bant `[alt, seviye, üst]`, yani B2 için **[B1, B2, C1]**.
Başlangıçta 500 yuvanın **207'si (%41,4)** bu bandın dışındaydı: havuzda
olmayan 166 + A2 33 + A1 8. Brief bunu 160 diye sayıyor ve C1'in 56 yuvasını
sorun işaretliyordu; oysa C1 bantta, A1/A2 değil. Şimdi 800 yuvanın tamamı
bandın içinde ve %100'ü tam seviyede.

### Hedef 2 — B2 katmanının kapsanması

| Ölçüt | Başlangıç | Şimdi |
|---|---|---|
| B2 dersleriyle kapsanan | 129/2041 (%6,3) | **800/2061 (%38,8)** |

Katman 2041'den 2061'e çıktı: vetodan sonra 20 gerçek madde başı eklendi
(id 8535-8554). %38,8 matematiksel tavan — 800 yuva ÷ 2061 madde.

### Havuzun taşımadığı beş ders konusu

Beş derste konu havuzda hiç karşılık bulmuyordu; o dersleri olduğu yerde
tutmak, sekiz yuvanın sekizini de tekrar motorunun göremeyeceği kelimeyle
doldurmak demekti. Beşinde de **dilbilgisi konusu korunarak** çerçeve havuzun
taşıdığı alana çevrildi:

| Ders | Eski çerçeve | Neden taşındı | Yeni çerçeve |
|---|---|---|---|
| `de-b2-nachbarschaftsstreit` | çit anlaşmazlığı | `der Zaun`, `die Grundstücksgrenze`, `das Einvernehmen` havuz dışı | gürültü / huzur bozma |
| `de-b2-weltraum` | uzay | `Weltraum`, `Rakete`, `Satellit`, `Astronaut`, `Umlaufbahn` — hiçbiri havuzda yok | iklim ve doğa |
| `de-b2-rezept-profi` | mutfak tekniği | `garen`, `abschmecken`, `köcheln`, `die Konsistenz` havuz dışı | servis ve menü dili |
| `de-b2-fotografie` | fotoğraf sanatı | `der Bildausschnitt`, `gestellt`, `einfangen`, `authentisch` havuz dışı; havuzda estetik sözcüğü yok | spor (kullanılmayan 4872-4910 öbeği) |
| `de-b2-kabarett` | hiciv | `die Ironie`, `die Anspielung`, `die Satire` C1; `der Seitenhieb`, `beißend` havuzda yok | duyulan gezi tavsiyesi |

Ders kimlikleri değişmedi; değişen ders adı, özeti, kalıpları ve rol yapma
sahnesi. Hiciv dersinin amacı (söylenen ile gerçeğin farkını öznel kip
fiiliyle işaretlemek) korundu — `sollen`in asıl işi zaten duyulanı aktarmak.

### Doğrulama

`npm run check:lessons` → **hata yok**, 7 uyarı (hepsi B1, paralel oturuma ait).
`npx tsc --noEmit` kökte ve `mobile/` içinde temiz. `test:track` 64 kontrol,
`test:options` 8416 kelime 0 hata. Mobil paket her modülden sonra yenilendi;
fark yalnız `de-b2.json`'da.

`npm run test:exams` 8 hata veriyor: sekizi de B1.11-B1.18 modüllerinin sınav
planının olmaması. B1 180 derse çıkarıldı ama `module-exam` planları 10 modülde
kaldı. **Bu paralel oturuma ait, buradan dokunulmadı.**

### Sırada ne var

Beceri katmanı hâlâ 12 okuma / 12 dinleme / 8 yazma ve **25 ünitenin 19'unda
tek bir beceri egzersizi yok** (`buildTrack` çıktısı). Ders sözlükçesindeki
800 kelimenin **658'i** hiçbir beceri metninde geçmiyor — sözlükçe tümüyle
yenilendiği için bu sayı işin başındakinden yüksek ve beklenen. 25 ünite × 6 =
**150 hizalı egzersiz** gerekiyor; brief'in "118" sayısı yalnız 50/50/50
toplamına götürür, 25/25 hizaya değil (A2'de bu iki geçişte öğrenilmişti).

## 11. Sonuç — beceri katmanı da bitti (2026-09-05)

25 ünitenin tamamı hizalandı. Aşağıdaki sayılar kaynaktan okuyan bir
doğrulayıcıyla ölçüldü, `npm run dump:skills` çıktısıyla karşılaştırıldı.

### Hedef 3 — beceri egzersizleri üniteyle hizalansın

`buildTrack` (`src/lib/immersion/build.ts`) havuzları **liste sırasıyla imleçle**
tüketiyor, `unit` etiketine bakmıyor. `BASE_PATTERN` ünite başına 2 okuma,
2 dinleme ve 2 yazma istiyor; 25 ünite için **50/50/50 yuva**.

| Ölçüt | Başlangıç | Şimdi |
|---|---|---|
| Toplam B2 egzersizi | 32 | **182** |
| okuma / dinleme / yazma | 12 / 12 / 8 | **62 / 62 / 58** |
| Ünite hizalı (ilk 50 yuva) | 0 | **50 / 50 / 50** |
| Hizalı ünite sayısı | 0 / 25 | **25 / 25** |
| Silinen ya da yeniden adlandırılan eski egzersiz | — | **0** |

Yeni 150 egzersiz `b2-u01.ts` … `b2-u25.ts` dosyalarında ve `b2.ts` listesinin
**başında** duruyor. Eski 32 egzersiz aynı kimliklerle listenin sonunda kaldı;
imleç 50. yuvada bittiği için patikaya girmiyorlar ama `user_skills` birincil
anahtarı (`user_id`, `exercise_id`) ve canlı ilerleme bozulmadı — kural 2.

### Her ünite kendi ders dörtlüsünün dilbilgisini ölçüyor

Ünite dosyalarının başındaki doküman yorumu o ünitenin dört dersini, 32
kelimesini ve kalıplarını sayıyor; egzersizler o kalıpları çalıştırıyor.
Sözlükçe maddelerinin tamamı ünitenin kendi ders kelimeleri.

Yazma egzersizlerinin ikincisi her ünitede farklı bir metin türü: haftalık
rapor, süreç anlatımı, toplantı notu, okur mektubu, düzeltme metni, deneme
raporu, yöntem açıklaması, iki kayıtlı duyuru, tartışma katkısı, konuşma
metni, eleştiri, deneyim yazısı, resmî e-posta, proje tanımı, karar notu,
anlatı, kişisel mesaj, resmî mektup, kapanış metni, referans mektubu.

### Doğrulama (kapanış)

| Komut | Sonuç |
|---|---|
| `npm run check:lessons` | **hata yok**, 7 uyarı (hepsi B1, paralel oturum) |
| `npx tsc --noEmit` (kök) | temiz |
| `npx tsc --noEmit` (`mobile/`) | temiz |
| `npm run test:track` | 64 kontrol geçti |
| `npm run test:options` | 4813 isim, 0 eksik artikel |
| `npm run test:content` | B2'de 0 uyarı |
| `npm run test:exams` | 8 hata — sekizi de B1.11-B1.18 sınav planı; **paralel oturuma ait** |

`test:content` yazarken 17 kusur yakaladı ve hepsi düzeltildi: 15'i metinde
geçmeyen sözlükçe maddesi, biri beş kelimeyi aşan `short_answer` kabulü, biri
parantezli Türkçe gloss. Doğrulayıcı her ünite yazıldıktan sonra tek tek
çalıştırıldı, toplu değil — kusur bir sonraki üniteye taşınmadı.

### Havuzun son hâli

| Katman | Madde |
|---|---|
| A1 | 897 |
| A2 | 1452 |
| B1 | 1829 |
| B2 | **2061** |
| C1 | 2468 |
| **Toplam** | **8707** |

Havuza yalnız 20 gerçek madde başı eklendi (id 8535-8554); türev eklenmedi,
rank uydurulmadı — hepsi `data/a2-expansion/de_50k.txt` satır numarası.
Üretim veritabanına yazılmadı.

### Kalan iş

- B2'nin dilbilgisi katmanı (`grammar/`) bu oturumda ele alınmadı; ders ve
  beceri katmanları birbirine göre tutarlı, dilbilgisi sayfaları ayrı bir iş.
- `test:exams`in 8 hatası B1'e ait ve orada duruyor.
- Kapsama %38,8'de: 800 yuva ÷ 2061 madde matematiksel tavan. Kapsamayı
  artırmanın tek yolu ders sayısını ya da sözlükçe boyunu büyütmek; ikisi de
  ders kimliklerini ve sözleşmeyi ilgilendirdiği için ayrı bir karar.
