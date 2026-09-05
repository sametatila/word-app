# GÖREV — B1 beceri katmanını kur

B1'in 180 dersi bitti (`f33a2e7`), ama beceri katmanı derslerden kopuk. Bu,
A2'de yapılan işin B1 karşılığı ve **üç patikanın en büyük boşluğu.**

A2 tarafındaki ölçüm, yöntem ve veri güvenliği notları
`docs/plan/a2-yeniden-kurgu.md` §7-§8'de. **Önce onu oku** — kazanılmış
bulguların çoğu doğrudan geçerli ve yeniden keşfetmek zaman kaybı.

## 1. Ölçülmüş başlangıç (2026-09-05)

| Ölçüt | Değer | Hedef |
|---|---|---|
| Ders / ünite | 180 / 45 | — |
| Okuma egzersizi | **20** | 90 |
| Dinleme egzersizi | **20** | 90 |
| Yazma egzersizi | **16** | 90 |
| Ünite hizalı ünite | **4/45** | 45/45 |
| Beceri metinlerinde hiç geçmeyen ders kelimesi | **386/1440** | mümkün olduğunca az |

Karşılaştırma: A1 25/25 ünite hizalı, A2 19/25. B1 4/45.

**Eksik egzersiz: 214** (okuma 70 + dinleme 70 + yazma 74). A2'de 118 yazıldı;
bu iş onun ~1,8 katı. Tek oturumda bitmez — modül modül, onay alarak ilerle.

## 2. Bilmen gereken dört mimari gerçek

Ölçülerek bulundu. Yanlış varsayarsan iş boşa gider.

**(a) `buildTrack` yerleştirmeyi LİSTE SIRASIYLA yapar, `unit` etiketiyle değil.**
`src/lib/immersion/build.ts` havuzları imleçle tüketir; `SkillMeta` `unit`
taşımaz. Ünite N'in okuma yuvalarını listedeki 2N-1 ve 2N. okuma doldurur.
Bu yüzden `src/lib/skills/content/b1.ts` içinde **ünite dosyaları en başta
durmalı**, mevcut genel içerik arkalarına düşmeli (A1 ve A2'deki düzenin aynısı).

**(b) Beceri egzersizi kimlikleri canlı ilerleme taşır.** `user_skills` birincil
anahtarı `(user_id, exercise_id)` (`src/lib/db/schema.ts:366`). **Mevcut 56
egzersizin hiçbirinin kimliği değiştirilemez, hiçbiri silinemez.** Yeni ünite
dosyalarını listede önlerine ekle: eskiler 90. yuvanın ötesine düşer, kimlikleri
durur, ilerleme çözülmeye devam eder, sadece patikada zamanlanmazlar.

**(c) SRS kuyruğu havuzdan beslenir, dersten değil.** `src/lib/session.ts:476-549`
kuyruğu `words` tablosundan `niveau` bandına göre kurar. Ders kelimesi havuzda
ve doğru seviyede değilse hiç tekrar edilmez. B1 derslerinin havuz uyumunu
ölçmediysen **önce onu ölç** — A2'de başlangıçtaki yuvaların %21,4'ü tekrar
motorunun erişemeyeceği yerdeydi ve asıl kazanç oradan geldi.

**(d) Birikimli tekrar artık var, yazman gerekmiyor.** `deriveQuiz` (e6885d3)
soruların üçte birini geçmiş ünitelerden alıyor; B1'de patika başına 239 farklı
eski kelime açığa çıkıyor. Bunu tekrar kurma.

## 3. Yöntem — A2'de işe yarayan sıra

1. **Tanı.** Ders kelimelerini havuzla karşılaştır: kaçı B1 katmanında, kaçı
   seviye dışı, kaçı havuzda hiç yok, kaçı alt seviye tekrarı. Normalleştirme:
   küçük harfe indir, artikeli ve parantezi ayıkla; **havuz başlıklarını "/"
   ile BÖLME** (`die/das Glace/Glacé` gibi satırlar sahte seviye üretir).
   İşlev sözcüklerini kapsanmamış sayma.
2. **Kapasiteyi kullanıcıya sor.** 214 egzersiz büyük; ne kadarının bu oturumda
   beklendiğini önceden netleştir.
3. **Havuz boşluklarını vet et.** Derste öğretilip havuzda olmayan her madde
   için: gerçek başlık mı, türev mi? Türevse `formen` alanına aittir, havuza
   girmez. Girecekler için tam satır üret; **`rank` uydurma**, satır numarasını
   `data/a2-expansion/de_50k.txt`'ten oku.
4. **Ünite ünite yaz, her modülden sonra dur ve onay al.** Mekanik dağıtım A2'de
   denendi ve reddedildi.
5. **Her ünite dosyası** 6 egzersiz taşır (`b1-uNN-r1/-r2/-l1/-l2/-w1/-w2`),
   başında o ünitenin dört dersini, kelimelerini, kalıplarını ve ölçtüğü
   dilbilgisi noktasını sayan bir doküman yorumu bulunur.
6. **İçerik o üniteye kadar öğretilen kelimelerle sınırlı** — ünite 12'nin metni
   ünite 30'un kelimesini kullanmaz.

## 4. İçerik kalitesi — A2'de öğrenilenler

- **Her okuma/dinleme egzersizinde en az iki yazılı soru** (gapfill /
  short_answer / dictation). `check-content.ts`'in
  `skills: çoktan seçmeli olmayan soru < 2` kuralı bütçe üstü kategorilerden
  biri; çoktan seçmeli tanımayı ölçer, yazılı soru hatırlamayı.
- **Her yazma setinde bir `rewrite` görevi**, Türkçe konuşanın belirli bir
  aktarım hatasını hedeflesin. A2'de en verimli kısım buydu ve hiçbir metrik
  onu ölçmüyor. B1'in adayları: `obwohl`/`trotzdem` sıra farkı, Konjunktiv II
  (`wäre`/`hätte`), Passiv (`wird gemacht`), Genitiv, `je … desto`,
  Plusquamperfekt (`nachdem` sonrası), edatlı fiiller (`sich freuen auf/über`).
- **Rol yapma açılışı `?` içermek zorunda** (`check-lessons.ts` şartı) ve
  seviye içinde yinelenemez.
- Ders başlıkları ve rol yapma açılışları seviye içinde benzersiz olmalı.

## 5. Kurallar

1. **Ders kimlikleri ve ders sayısı sabit.** `user_lessons` birincil anahtarı
   `(user_id, lesson_id)`.
2. **Web canlı.** Ders kaynağı mobille paylaşımlı; iyileştir, bozma, forklama.
3. **`mobile/src/data/lessons/de-b1.json` TEK SATIR.** Üreteci
   `JSON.stringify(lessons)`; elle biçimlendirme sahte diff üretir. Ders
   değişikliğinden sonra `npx tsx scripts/dump-lessons-mobile.ts de`, beceri
   değişikliğinden sonra `npm run dump:skills` — ikincisinin farkı yalnız kendi
   seviyende olmalı, başka seviyeye taşmışsa dur ve bak.
4. **Havuza türev eklenmez, `rank` uydurulmaz** (madde 3.3).
5. **Commit yerelde kalır; push Samet'in işi.**
6. **Üretim veritabanına yazılmaz** — tohumlama gerekiyorsa önce sor.
7. **Paralel oturum var: `git add <yol>`, asla `git add -A`.**

## 6. Doğrulama

Her ünite dosyasından sonra: `npx tsc --noEmit`, `npm run test:content | grep b1-uNN`
(sıfır uyarı), `npm run check:lessons` (hata sıfır).

Kapanışta ayrıca: `npx tsc --noEmit` `mobile/` içinde, `npm run test:track`,
`npm run test:options`.

**Uyarı:** `check-lessons.ts`'i doğrudan `npx tsx scripts/check-lessons.ts` ile
çağırma — `roleplay.ts`'in `server-only` importu yüzünden çöker ve çıktısı boş
gelir; grep ile sayarsan "sıfır hata" sanırsın. Doğrusu `npm run check:lessons`
(e2e tsconfig ile çalışır).

## 7. Teslim

Konu başına ayrı commit, Türkçe mesaj, **ne yapıldığını değil neden yapıldığını**
anlatsın. Sonunda: neyin bittiği, neyin bilerek bırakıldığı, hangi sayının
nereden geldiği. Sonuç ölçümünü bu dosyanın sonuna yaz.

---

## Ek bulgu — 2026-09-05: modül 11-18'in sınav planı yok

B1'e 80 ders eklendi ama o modüllerin sınav planları yazılmadı. Sonuç:

- `npm run test:exams` → 8 hata: `B1.11 … B1.18: modülün sınav planı yok
  (src/lib/lessons/module-exam)`
- `npm run test:exam-build` → 16 hata: aynı sekiz modülde okuma bölümü ve kapak
  üretilemiyor.

Bu, o modüllerin **modül sınavının çalışmadığı** anlamına geliyor: plan
olmadan `moduleExamPlan` boş dönüyor ve kâğıt eksik kuruluyor.

A1, A2, B2 ve C1'de bu hata yok — dolayısıyla iş B1'e ait. Modül başına bir
plan (`src/lib/lessons/module-exam`) yazılmalı; mevcut B1.1-B1.10 planları
biçimi gösteriyor.

Not: bu sekiz hata daha önce görünmüyordu, çünkü `exam-dryrun.ts` kaldırılmış
dilbilgisi bölümünü zorunlu tutuyor ve katalog genelinde 190 hata üretiyordu;
doğrulayıcı hizalanınca (0 ya da 6) gerçek hata ortaya çıktı.
