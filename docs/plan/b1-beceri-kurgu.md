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

---

## 8. Sonuç — 2026-09-05

İş bitti. Aşağıdaki her sayı §6'daki doğrulayıcılarla ölçüldü; komutlar
parantez içinde.

### Hedef — 45 ünitenin 45'i kendi derslerinden beslensin

| Ölçüt | Başlangıç | Şimdi |
|---|---|---|
| Okuma egzersizi | 20 | **102** (hedef 90) |
| Dinleme egzersizi | 20 | **102** (hedef 90) |
| Yazma egzersizi | 16 | **98** (hedef 90) |
| Ünite hizalı ünite | 4/45 | **45/45** |
| Patikada boş beceri yuvası | 214 | **0** |

`buildTrack` ölçümü: **270 yuva · dolu 270 · ünite hizalı 270 · eski genel 0
· boş 0.** Eski 32 genel egzersiz patikadan tamamen düştü — kimlikleri
duruyor, `user_skills` kayıtları çözülmeye devam ediyor, yalnız
zamanlanmıyorlar. Silme değil, sıra değişikliği (§2b).

### Adım 1 tanısının cevabı — B1 derslerinin havuz uyumu

1440 sözlükçe yuvası ölçüldü:

| Ölçüt | Değer |
|---|---|
| Havuzun B1 katmanında | 1394 (%96,8) |
| Alt seviye tekrarı (A1 6 · A2 40) | 46 (%3,2) |
| Üst seviye (B2/C1) | **0** |
| Havuzda hiç yok | **0** |
| **SRS'in erişemeyeceği yuva** | **0 (%0,0)** |

A2'de asıl kazancın geldiği yer buydu (%21,4 erişilemez). **B1'de o boşluk
zaten yoktu** — ders kurgusunda (`f33a2e7`) kapanmıştı. Kalan 46 alt seviye
maddesi bilinçli: hepsi dersin kendi konusu. B1 katmanı kapsama: 1394/1815
farklı başlık (%76,8).

### Beceri metinlerinde hiç geçmeyen ders kelimesi

| Ölçüm | Başlangıç | Şimdi |
|---|---|---|
| B1 egzersizleri, jeton eşleşmesi | 990/1440 (%68,8) | **90/1440 (%6,3)** |

Brief'teki 386 sayısı **yeniden üretilemedi**: o değere ancak TÜM
seviyelerin metinlerinde gevşek altdizi aranırsa yaklaşılıyor (352), yani
bir B1 kelimesi A1 metninde geçtiği için "kapsandı" sayılıyor. Yukarıdaki
satır B1 metinlerini B1 kelimeleriyle ölçüyor.

### İçerik kalitesi (§4)

Ünite dosyalarında dört ölçütün dördü de **0**:

| Ölçüt | 270 ünite egzersizinde |
|---|---|
| Okuma/dinlemede yazılı soru < 2 | 0 |
| Yazma setinde `rewrite` yok | 0 |
| Sözlükçe kelimesi metinde yok | 0 |
| Çok anlamlı `tr` (virgüllü) | 0 |

**Not — brief'teki bir doğrulama yanlıştı.** §4'ün atıf yaptığı
`skills: çoktan seçmeli olmayan soru < 2` kuralı `check-content.ts`'te
VARDI ve `33e8985`'te silinmişti. Yani "`test:content | grep b1-uNN` sıfır
uyarı" doğrulaması bu kural için anlamsızdı: çalıştırınca sıfır görülüyor
ve uyulduğu sanılıyordu. Kural oturum boyunca elle sayıldı (kullanıcı
kararı). Bir paralel oturum kuralı sonradan geri koydu.

45 `rewrite` görevinin her biri **ayrı** bir Türkçe aktarım hatasını
hedefliyor; hiçbiri tekrar etmiyor. Aralarında en pahalı sınıf, cümleyi
dilbilgisel olarak DOĞRU bırakıp anlamı bozanlar: `lassen` düşünce
"kendimi muayene edeceğim" (18), `wenn ich Zeit gehabt habe` gerçek koşula
döner (23), `ich bin langweilig` = "ben sıkıcıyım" (40). Hiçbir
doğrulayıcı bunları göremez.

### Kapı (`scripts/lib/vocab-gate.cjs`) — 20 kural, hepsi ölçümden

Kapı bu oturumda 20 kez düzeltildi; her biri bir ünitenin ölçümünden çıktı
ve hepsi ekleme (A1 davranışı korunarak). Üçü **hata**, gerisi boşluktu:

- **Ünlü değişimi kuralı çok harfli ünlüyü tek harf sanıyordu** — kesme
  uzunluğu sabit 1'di. Listede duran `["ie","o"]` çifti bu yüzden BAŞTAN
  BERİ hiç çalışmamış: `verlieren→verlor`, `fliegen→flog` üretilmiyordu.
- **-ern/-eln fiilleri kapının tamamen dışındaydı** — üreteç yalnız "en"
  ile bitene bakıyordu; `ändern, wechseln, sich erinnern, verbessern`
  hepsi kayma sayılıyordu.
- **Ad-soyad taraması ikinci belirteci yutuyordu** — her mektup
  "Mit freundlichen Grüßen / Nuri Öz" ile bittiği için HER imzadaki soyad
  kayma sayılıyordu.

Kalan 17: Präteritum kişi ekleri · 8 düzensiz fiil (fallen, fangen, tragen,
rufen, kennen, sitzen, schreien, schneiden) · 2. tekil ve emir · d/t
bağlantı ünlüsü · güçlü fiil I. sınıfı (ei→ie) · Türkçe özel ad
çevrimyazımı · isim umlaut çoğulu · `hoch → hohe` · kerecik sayıları
(dreimal) · `wovor`/`davor` · mektup kalıpları · kipli fiil ortaçları.

Etkisi ölçüldü, **hiçbir seviyede gerileme yok**:
A1 temiz egzersiz **107 → 113** · B1 **32 → 270**.

### Doğrulama (kapanışta)

`npx tsc --noEmit` kökte ve `mobile/` içinde **temiz** ·
`npm run check:lessons` **hata yok**, 7 uyarı (hepsi B1 bağlaç derslerinin
Türkçe açıklamalarında Almanca örnek geçmesi — bağlaç öğretirken
kaçınılmaz) · `npm run test:track` **64 kontrol geçti** ·
`npm run test:options` **temiz** · `npm run check:unitvocab -- b1`
**270/270 temiz** · `npm run dump:skills` yenilendi, **farkı yalnız B1'de**
(198 yeni, değişen 0, silinen 0).

`npm run test:content` bütçesinde **bu oturumun payı üç kalemde de 0**
(intro, çok anlamlı tr, sözlükçe metinde yok). Kalan uyarılar A1/A2/ZH/
B2/C1 ve eski B1 içeriğine ait.

### Kapanış eki — "bilerek bırakma" listesi kapatıldı

Yukarıdaki doğrulama tablosu yazıldığında dört madde bilerek dışarıda
bırakılmıştı. Sahip bunu kabul etmedi ("bilerek bırakmamalısın"); dördü de
ölçüldü ve üçü yapıldı.

**1. Eski 32 genel B1 egzersizi (commit `0998e23`).** "Patikadan düştüler,
öğrenciye gösterilmiyorlar" gerekçesi YANLIŞTI: `/skills` sayfası
(`src/app/(app)/skills/page.tsx`) seviyedeki bütün egzersizleri listeliyor,
patikaya hiç bakmadan. Öğrenci onlara ulaşıyor. Eklenen: 24 okuma/dinlemeye
48 yazılı soru, 8 yazma setine 8 rewrite (hepsi ünitelerdekilerden farklı
bir aktarım hatasını hedefliyor), 11 sözlükçe düzeltmesi. Ayrıca 16
short_answer'ın kabul listesi beş kelimeyi aşıyordu; uzun kabul cevabı tek
doğru dizilişi zorunlu kılıp doğru bilen öğrenciyi yanlışa düşürüyor,
kısaltıldı.

**2. Konuşma egzersizleri (commit `3eae6d9`).** "BASE_PATTERN'de yuva yok,
yazılsa da yerleştirilmezdi" gerekçesi eksikti: patika tek yol değil.
`exam.ts` seviye sınavının Sprechen bölümünü beceri bankasından kuruyor ve
oraya yalnız `genre: "Ses çalışması"` etiketli konuşma drill'lerini alıyor.
B1'de hiç yoktu, yani kâğıt üç cümle isterken banka sıfır veriyordu ve
bölüm hiç basılmıyordu. Yazılan dokuz egzersiz (ünite 5, 10, … 45) A1'i
tekrarlamıyor: A1 tek tek sesleri kuruyor, B1 sesin cümle içindeki
davranışını çalıştırıyor — Knacklaut, sönük heceler, r'nin iki yüzü, ünsüz
yığınları, pf/qu, bileşik vurgusu, ön ek vurgusu, cümle vurgusu, tonlama.
54 cümlenin tamamı ünite kelime disiplininden temiz geçiyor.

**3. Ay ve gün adlarının havuz boşluğu.** Ölçüldü: A1 oturumu kapatmış
(`0cef0f8`, "A1 havuzu: 11 ay, 2 gün ve 4 renk eklendi"). 12 ayın ve 7
günün hepsi havuzda. Yapacak iş kalmamış.

**4. check-content.ts.** Bu, sahibin kendi kararıydı ("Hayır, elle takip
et"), o yüzden geri alınmadı. Not: silindiği sanılan `çoktan seçmeli
olmayan soru < 2` kuralı bugün dosyada duruyor (satır 165) ve çalışıyor;
elle takip ettiğim sayı ile aynı sonucu veriyor.

### Kendi ölçümümün hatası ve düzeltmesi (commit `016e356`)

Yukarıda "sözlükçe metinde yok: bu oturumun payı 0" yazıyor. **Bu ölçüm
yanlıştı.** Sayaç kontrolü `e.text` alanına bağlamıştı; o alan yalnız okuma
egzersizlerinde var. Dinleme, yazma ve konuşma hiç ölçülmemişti. Dördü
birden ölçülünce B1'de 177 madde çıktı: 51 dinleme, 126 yazma, 0 konuşma.

Dinleme öğrenciye görünür: `GlossPanel` dinleme oynatıcısında basılıyor,
yani kaydın hiç söylemediği kelimelerin sözlüğü açılıyordu. Ayrıca
`derive-questions.ts` boşluk sorularını sözlükçe kelimesinin metinde
geçtiği cümleden üretiyor; geçmeyen kelime sessizce soru üretmiyordu.
Yazma oynatıcısı `exercise.gloss`'u hiç göstermiyor — orada öğrenci
yanıltılmıyordu — ama ünitenin kelimesini sözlükçeye yazıp örnek cevapta
hiç kullanmamak o kelimeyi o egzersizde çalıştırmamak demek.

Yöntem: değiştirmek değil EKLEMEK. İlk denemede ünite 9 ve 11'de cümleyi
baştan yazınca başka bir sözlükçe kelimesi öksüz kaldı; kural ondan sonra
"var olan cümleye ekle" oldu. Almanca değişen her yerde Türkçe uyaran,
alternatifler ve dilbilgisi ipucu da güncellendi.

Sonuç: **B1'de dört becerinin hepsinde 177 → 0.** (Aynı ölçüm diğer
seviyelerde A1 73, A2 100, B2 52, C1 89 gösteriyor — onlar bu oturumun işi
değil.)

Aynı çalışmadan çıkan iki yan bulgu:
- `b1-u16-r2` ve `b1-u17-r1` metinlerindeki **"Ton" havuzda hiç yok** ve B1
  derslerinde öğretilmiyor. Sözlükçeye alındı; kapı zaten oradan açık
  (gate egzersizin kendi sözlükçesini serbest sayıyor).
- **25 sözlükçe karşılığı bilgiyi parantezde taşıyordu** ("mimar (kadın)",
  "(ilaç) almak"). `Gloss` tipinin bunun için ayrılmış `note` alanı var ve
  arayüz onu ayrı satırda basıyor — parantez tam olarak bu yüzden
  kaldırılmıştı. Taşındı; `skills: parantezli tr` 166'dan 141'e indi ve
  bütçenin altına geri döndü.

### Kapanış ölçümü (2026-09-05, son hâl)

| Ölçüt | Değer |
|---|---|
| B1 egzersiz | 311 (okuma 102 · dinleme 102 · yazma 98 · konuşma 9) |
| Ünite hizalı | 45/45 |
| buildTrack yuvası | 270/270 dolu, hepsi ünite hizalı |
| Ünite kelime disiplini | 279 ünite egzersizinin tamamı temiz |
| Yazılı soru < 2 | 0 |
| rewrite'ı olmayan yazma seti | 0 |
| Sözlükçe metinde yok | 0 (dört beceride) |
| Çok anlamlı / parantezli tr | 0 / 0 |
| Seviye sınavı Sprechen | dolu (9 drill, 54 uygun cümle) |

`npx tsc --noEmit` kökte ve `mobile/` içinde temiz · `test:track` 64 kontrol
geçti · `test:options` temiz · `check:lessons` B1'de sıfır hata (kalan 50
hatanın hepsi B2, paralel oturumun sürmekte olan işi) · `test:content`
bütçesini aşan kategorilerde **B1 payı sıfır** (kalanlar A2/ZH ve dersler) ·
`dump:skills` yenilendi, **farkı yalnız B1'de** (9 yeni, 112 değişen, 0
silinen).
