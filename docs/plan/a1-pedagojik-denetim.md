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
