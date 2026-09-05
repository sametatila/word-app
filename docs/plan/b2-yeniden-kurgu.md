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
