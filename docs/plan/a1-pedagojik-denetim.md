# GÖREV — A1 patikasını pedagojik olarak denetle ve boşlukları kapat

A2 oturumunda yapılan denetimin A1 karşılığı. A2 tarafındaki ölçüm, gerekçe ve
veri güvenliği notları `docs/plan/a2-yeniden-kurgu.md` §7-§8'de; **önce onu oku**,
çoğu bulgu doğrudan A1 için de geçerli.

## 1. Bilmen gereken üç mimari gerçek

Bunlar ölçülerek bulundu, tahmin değil. Yanlış varsayarsan iş boşa gider.

**(a) SRS kuyruğu havuzdan beslenir, dersten değil.** `src/lib/session.ts:476-549`
oyun kuyruğunu `words` tablosundan `niveau` bandına göre kurar (`[alt, seviye,
üst]`, %70 seviyede). Sonuç: **derste öğretilen bir kelime havuzda ve doğru
seviyede değilse hiçbir zaman tekrar edilmez.** Ders katmanının havuzla
hizalanmasının asıl gerekçesi budur — "kapsama yüzdesi" değil.

**(b) `buildTrack` yerleştirmeyi LİSTE SIRASIYLA yapar, `unit` etiketiyle değil.**
`src/lib/immersion/build.ts` havuzları imleçle tüketir. Ünite N'in okuma
yuvalarını listedeki 2N-1 ve 2N. okuma doldurur. Etiketi doğru olan ama listede
yanlış yerde duran egzersiz yanlış üniteye düşer.

**(c) Beceri egzersizi kimlikleri canlı ilerleme taşır.** `user_skills` birincil
anahtarı `(user_id, exercise_id)` (`src/lib/db/schema.ts:366`) — `user_lessons`
ile aynı kural. **Hiçbir egzersizin kimliği değiştirilemez, hiçbiri silinemez.**
Eskisini devre dışı bırakmak gerekiyorsa yenisini listede önüne ekle; eski
kimlik durur, ilerleme çözülür, sadece yuva dışına düşer.

## 2. A1'in ölçülmüş durumu (2026-09-05)

| Ölçüt | Değer |
|---|---|
| Ders / ünite | 100 / 25 |
| Beceri egzersizi (okuma/dinleme/yazma) | 62 / 62 / 58 |
| Patikanın yerleştirebileceği | 50 / 50 / 58'in 50'si |
| Ünite hizalı ünite | **25/25** |
| Beceri metinlerinde hiç geçmeyen ders kelimesi | **27/800** |

**A1 üç patikanın en iyisi.** Ünite hizalaması tam. Bu yüzden görev "yeniden
kurgu" değil, üç dar iş.

## 3. Yapılacaklar

### İş 1 — Yerleşmeyen fazla egzersizleri karara bağla (ÖNCE BUNU ÖLÇ)

25 ünite × 2 = 50 yuva var, elde 62 okuma ve 62 dinleme egzersizi. **Fazlalık
patikada hiç yerleştirilmiyor** — imleç 50'de bitiyor, kalan 12+12+8 egzersiz
`buildTrack` tarafından hiç görülmüyor.

Ölç: hangi kimlikler 50. yuvanın ötesinde kalıyor? Bunlar beceri bölümünden
(patika dışından) erişilebiliyor mu, yoksa tamamen ölü içerik mi? Cevaba göre:
- Erişilebiliyorsa: sorun yok, belgele ve geç.
- Erişilemiyorsa: sıralamayı gözden geçir — daha iyi olan öne alınmalı. **Silme.**

### İş 2 — 27 yetim kelime

Beceri egzersizlerinin hiçbir metninde geçmeyen 27 ders kelimesi var. Bunlar
SRS üzerinden zaten öğreniliyor (madde 1a), yani **bu bir felaket değil**;
sıfıra indirmek için metinleri zorlama. Yalnız doğal duranları mevcut ünite
metinlerine ördür. Ölçüm betiği A2 oturumunun yöntemiyle aynı: ders sözlükçesini
`sentenceContainsWord` ile tüm egzersiz metinlerinde ara.

### İş 3 — A1 havuz boşlukları (A2 oturumunun devrettiği iş)

A2 çalışması sırasında A1 katmanında bulunan, kapatılmayan boşluklar:
- **12 ayın 11'i havuzda yok.**
- `gelb` ve `braun` yok, ama türemiş `gelblich` var.

Havuza ekleme kuralları (A2 briefinden, aynen geçerli):
- **Türev eklenmez.** Partizip II, çoğul, derece biçimleri başlık değildir —
  `formen` alanına aittir.
- **`rank` uydurulmaz.** `data/a2-expansion/de_50k.txt` satır numarasından okunur.
- Yeni kimlikler en büyük kimlikten devam eder; gsw-zh (100000+) ve İngilizce
  (209001+) aralıklarına girmez.
- `data/app/words.json` biçimi korunur: satır başına bir JSON kaydı, kapanış
  `]` öncesine eklenir.

## 4. Kurallar (A2 briefinden devam)

1. **Ders kimlikleri sabit.** `user_lessons` birincil anahtarı
   `(user_id, lesson_id)`; kimlik değişirse canlı ilerleme silinir. Ders sayısı
   da sabit.
2. **Web canlı.** Ders kaynağı mobille paylaşımlı; iyileştir, bozma, kopyasını
   çıkarma.
3. **`mobile/src/data/lessons/de-a1.json` TEK SATIR.** Üreteci
   `JSON.stringify(lessons)` kullanıyor; elle biçimlendirme 40 bin satırlık
   sahte diff üretir. Değişiklikten sonra `npx tsx scripts/dump-lessons-mobile.ts de`,
   beceri değişikliğinden sonra `npm run dump:skills`.
4. **Commit yerelde kalır; push Samet'in işi.**
5. **Üretim veritabanına yazılmaz** — tohumlama gerekiyorsa önce sor.
6. **Paralel oturum var: `git add <yol>`, asla `git add -A`.**

## 5. Doğrulama

`npm run check:lessons` (hata sıfır olmalı) · `npx tsc --noEmit` (kök ve
`mobile/`) · `npm run test:track` · `npm run test:options` · `npm run test:content`
(bütçe üstü kategoriler varsa hangisinin sana ait olduğunu ayır — A2 oturumu
kendi payını düzeltip gerisini adlandırmıştı).

`check-content.ts`'in bir kuralı içerik yazarken önemli:
**`skills: çoktan seçmeli olmayan soru < 2`** — her okuma/dinleme egzersizinde
en az iki yazılı soru (gapfill / short_answer / dictation) olmalı.

## 6. Teslim

Konu başına ayrı commit, Türkçe mesaj, **ne yapıldığını değil neden yapıldığını**
anlatsın. Sonunda: neyin bittiği, neyin bilerek bırakıldığı, hangi sayının
nereden geldiği. Sonucu bu dosyanın sonuna yaz — bir sonraki oturum başlangıç
ölçümünü buradan okuyacak.

---

## 7. Sonuç — 2026-09-05

Üç iş de yapıldı. Her sayı aşağıdaki doğrulayıcılarla ölçüldü.

### İş 3 — havuz boşlukları (önce yapıldı: en ucuz, en yüksek getirili)

17 kayıt eklendi, id **8518-8534**. Gerekçe kapsama yüzdesi değil §1(a):
bir kelime havuzda değilse SRS'e hiç girmiyor. Bu 17'si **iki katmanda
birden** yoktu — ne A1 derslerinde geçiyorlardı ne havuzda, yani öğrenci
onlarla hiçbir yerde karşılaşmıyordu.

| grup | eklenen |
|---|---|
| Ay | 11 (yalnız `Mai` vardı — tek öğretilen ay da oydu) |
| Gün | **`Donnerstag`, `Freitag`** — brief'te yoktu, ölçerken çıktı |
| Renk | `gelb`, `braun` **+ `rosa`, `lila`** |

`Donnerstag`/`Freitag` ayrıca ciddi: A1'in kendi kalıbı olan "Geht es am
Donnerstag?" bu iki gün olmadan kurulamıyordu. Havuzda türemiş biçimler
(`gelblich`, `rötlich`, `bläulich`) A2 başlığı olarak duruyordu — türev
vardı, kökü yoktu.

`rank` uydurulmadı: `de_50k.txt` satır numarasından okundu ve yöntem önce
doğrulandı — mevcut 12 kaydın (`Mai`, `Montag`, `rot`, `weiß`…) rank'i bu
yolla birebir aynı çıktı.

### İş 2 — yetim kelimeler: 33 → 0

**Brief'teki 27 eksik sayımdı.** 27, egzersizin TÜM JSON'unu tarayınca
çıkıyor ve Türkçe gloss/açıklama metinleri de eşleşiyor. Yalnız Almanca
yüzeyler taranınca **33**. Altı kelime sadece Türkçe açıklamada "geçtiği"
için kapsanmış sayılmıştı.

Hepsi kendi ünitesinin mevcut metnine örüldü; yeni egzersiz açılmadı,
hiçbir kimliğe dokunulmadı. Zorlama yapılmadı — `die Birne` alışveriş
listesine, `drücken` eczane kapısındaki tabelaya (DRÜCKEN gerçek bir kapı
yazısıdır), `das Gepäck` bina kurallarının "koridora koymayın" maddesine,
`die Anrede` davetin nasıl başladığını soran bir soruya.

### İş 1 — yerleşmeyen 32 egzersiz: ölü değil, ama web'de erişilemez

Taşanların kimliği: `a1-r1…r12`, `a1-l1…l12`, `a1-w1…w8` — hepsi eski genel
içerik, hiçbirinde `unit` etiketi yok. **Sıralama zaten doğruydu**: ünite
hizalı 150 egzersiz 1-50 yuvalarını dolduruyor. Ayrıca yerleşenlerin hizası
tek tek denetlendi — **150'sinin 150'si doğru üniteye düşüyor**, §1(b)'nin
uyardığı "etiketi doğru, listede yanlış yerde" durumu yok.

| yüzey | erişim |
|---|---|
| Mobil "Beceriler" | **var** — `listSkillMeta` hepsini listeliyor, kırpma yok |
| Seviye sınavı / seviye belirleme | **var** — banka 62'sinin hepsini alıyor |
| Web Patika | yok (imleç 50'de biter) |
| **Web "Beceriler" sayfası** | **yok — sayfa yer tutucu**, "yapım aşamasında" |

Yani ölü içerik değil; mobilde tamamen erişilebilir, web'de yalnız sınav
yoluyla. **Silinmedi, sırası değiştirilmedi.** Kalan karar içerik değil ürün
kararı: web beceri sayfası kapsama alınacak mı?

### Yol boyunca bulunan ve düzeltilen üç şey

**1. Önceki oturumun şema ihlali.** Üçüncü kişi nesne zamirlerini üç dersin
`patterns` alanına eklemiştim; `check:lessons` "2-3 kalıp" diyor ve dersler
5/5/4'e çıkmıştı — o oturumda `check:lessons` çalıştırılmamış. Kural
gevşetilmedi: her dersin üç kalıbı `summary`'de vaat edilen üç şeye birebir
karşılık geliyor, birini atmak dersin kendi özetini yalanlardı. Kalıplar
aslına döndürüldü, zamir öğretimi şema kısıtı olmayan beceri katmanına
taşındı (ünite 11 akkusatif, ünite 12 datif).

**2. `check-content.ts` üzerine yazılmıştı.** Dosya 446ea37'den beri vardı:
337 satır, HATA/UYARI ayrımı ve etiket başına uyarı bütçesi. Önceki oturumda
şık konumu denetimi eklerken `cat >` ile baştan yazılmış ve 134 satırlık bir
sürümle değiştirilmişti. `npm run test:content` onu çalıştırıyor, yani okuma/
dinlemede iki yazılı soru zorunluluğu dahil bir sürü kural sessizce ortadan
kalkmıştı — testin adı geçmeye devam ettiği için görünmüyordu. Aslı geri
alındı, yeni denetimler onun içine eklendi.

**3. Doğrulayıcının Türkçe körlüğü.** "intro Türkçe olmalı" kuralı ı/ğ/ş
yoksa ve ö/ü varsa uyarıyordu — ama ö ve ü Türkçede de var ("söylemeyi",
"sürüyor"). Tamamen Türkçe altı intro Almanca sanılıyordu. İçerik eğilmedi,
tespit güçlendirildi.

### Bütçe borcunun ayrılması

Doğrulayıcı geri gelince 10 kategoride aşım göründü. Payım ayrıldı ve
kapatıldı:

| kategori | benim | ne yapıldı |
|---|---|---|
| okuma/dinlemede < 2 yazılı soru | 101/147 | 102 gapfill eklendi → A1'de 0 |
| sözlükçe kelimesi metinde yok | 39/581 | 38 kaldırıldı, 1 metne örüldü → kategori listeden düştü |
| çok anlamlı karşılık (beceri) | 14/201 | tekilleştirildi → A1 payı 0 |
| çok anlamlı karşılık (ders) | 16/133 | tekilleştirildi → A1 payı 0 |
| intro Türkçe | 6/14 | doğrulayıcı hatasıydı, kural düzeltildi |

Eklenen 102 sorunun her biri egzersizin **kendi cümlesinden** ve kendi
sözlükçesindeki taşıyıcı kelimeyi boşluğa alarak üretildi. Kural boşuna
değil: dört şık arasından tanımak ile metinden kelimeyi çıkarıp yazmak aynı
beceri değil.

### Bilerek kapatılmayanlar

- **"havuz dışı kelime" (4 A1 dersi).** Perfekt dersleri ortaçları kelime
  kartı olarak öğretiyor — Almancada ortaç ezberlenir, türetilmez — ama
  brief'in kuralı türevi havuza sokmayı yasaklıyor. İkisi de doğru,
  çakışıyorlar. Karar bir sonraki oturumun.
- **"lecture 20 adımı aşıyor" (25 ders) ve "tekrar adımı payı" (26).**
  Ölçüldü: sınırı aşan 25 dersin **hepsinde 8 kelime var**, kalan 75 dersin
  ortalaması 18,9 adım. Uzunluk doğrudan 8-kelime kararının sonucu. Brief
  sözlükçe boyunu sabitliyor; çözüm ya kelime azaltmak (yasak) ya 25 öğretim
  betiğini yeniden kurmak (kapsam dışı).
- **Kalan bütçe borcu** A2 (yazılmakta), B1, B2, C1 ve Zürih içeriğine ait.

### Doğrulama

`npm run check:lessons` → **hata yok**, 7 uyarı (hepsi B1, paralel oturuma
ait). `npx tsc --noEmit` kökte ve `mobile/` içinde temiz. `npm run test:track`
64 kontrol geçti. `npm run test:options` 8396 kelime 0 hata, 4685 isimde
artikel eksiği yok. `npm run check:unitvocab` temiz egzersiz 107 → **113**.
`npm run dump:skills` ve `dump-lessons-mobile` ile paketler yenilendi; A1
egzersiz sayıları değişmedi (62/62/58), yalnız içerikleri zenginleşti.

### Başlangıç ölçümü (bir sonraki oturum buradan okusun)

| Ölçüt | Değer |
|---|---|
| Ders / ünite | 100 / 25 |
| Beceri egzersizi (o/d/y/k) | 62 / 62 / 58 / 8 |
| Ünite hizalı ünite | 25/25 |
| Yuvaya yerleşen / elde | 50 / 62 (fazlası mobilde ve sınavda erişilebilir) |
| Yetim ders kelimesi | **0/800** |
| A1 havuz katmanı | 897 (17 eklendi) |
| test:content A1 payı | **0** (kalan borç A2/B1/B2/C1/zh) |
