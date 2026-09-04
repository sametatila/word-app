# GÖREV — Almanca A2 patikasını kelime havuzuna göre yeniden kurgula

Bu, A1 için hâlihazırda yürüyen işin A2 karşılığıdır. A1'i başka bir oturum
yapıyor; **aynı depoda paralel çalışacaksın**, o yüzden §4'teki çakışma
kurallarına harfiyen uy.

---

## 1. Sorun

A2 dersleri, kullanıcıların A2'de öğrenmesi gereken kelimelerden kopmuş
durumda: hem seviyenin üstünde kelime öğretiyor, hem de A2 katmanının neredeyse
tamamına hiç değinmiyor. Ölçüm (2026-09-04):

| Ölçüt | Değer |
|---|---|
| A2 dersi | 100 (10 modül × 10) |
| Havuzun A2 katmanı | 1416 madde · kart gerektiren **1412** |
| Derslerin öğrettiği | 500 madde (ders başına 5) |
| Bunun **%50,2'si** seviye dışı | B1 144 · B2 31 · C1 4 · havuzda yok 72 |
| A1 tekrarı | 133 (%26,6) |
| **A2 katmanının kapsanması** | 115/1412 — **%8,1** |
| Havuzda hiç olmayan ders kelimesi | 72 farklı madde |

Karşılaştırma için A1: kapsama %35, seviye dışı %40. **A2 belirgin biçimde daha
kötü durumda.**

---

## 2. Hedef

1. A2 derslerinin öğrettiği her kelime havuzun **A2 katmanından** gelsin.
   (Sağlam bir tekrar için sınırlı A1 kelimesi kabul edilebilir; ama şu anki
   %26,6 fazla — hedefi kullanıcıyla netleştir.)
2. A2 katmanının kapsanması olabildiğince yükselsin (§5 Adım 2'ye bak).
3. Ünite deseni eksiksiz dolsun: **4 konuşma dersi + 2 okuma + 2 dinleme +
   2 yazma + gramer + quiz + kontrol**.
   - 100 ders ÷ 4 = **25 ünite** → her beceriden **50 egzersiz** gerekiyor.
   - Elde: okuma 12 · dinleme 12 · yazma 8 → **118 egzersiz eksik.**
   - quiz + kontrol ünite brief'inden otomatik türetiliyor, yazman gerekmiyor.
   - gramer bugün kalıcı yer tutucu; içerik yazılmazsa "Yakında" kalır.
4. Sınav (ExamPrep) katmanı beceri içeriğinden besleniyor; 3 dolunca o da dolar.

---

## 3. Dosya haritası

| Ne | Nerede | Not |
|---|---|---|
| Ders kaynağı | `src/lib/lessons/content/de-a2-b01.ts … b10.ts` | **web ve mobil bunu paylaşır** |
| Mobil ders paketi | `mobile/src/data/lessons/de-a2.json` | türev; `npx tsx scripts/dump-lessons-mobile.ts de` ile üretilir |
| Kelime havuzu | `data/app/words.json` | `[` + satır başına bir kayıt + `]`; canlı DB'nin görüntüsü |
| Beceri kaynağı | `src/lib/skills/content/a2.ts` | web bunu DB'ye seed'ler |
| Beceri ara dosyası | `data/skills/.exercises.json` | git'te DEĞİL, üreticisi yok — bilinen kopukluk |
| Mobil beceri paketi | `mobile/src/data/skills/exercises.json` | `node scripts/dump-skills-mobile.mjs de` |
| Ünite deseni | `src/lib/immersion/build.ts:26-41` | kaynak |
| Ünite deseni (kopya) | `mobile/src/game/immersionTrack.ts:23` | sunucusuz yedek — **ikisi birlikte değişir** |
| Patika kapısı | `src/lib/immersion/state.ts` | biten + denenen + sıradaki açık |

---

## 4. İhlal edilemez kurallar

1. **Ders id'leri SABİT.** `user_lessons` birincil anahtarı `(user_id, lesson_id)`;
   id değişirse canlı kullanıcıların ilerlemesi silinir. Konuyu ve içeriği
   değiştir, id'ye dokunma. Ders sayısını da değiştirme (100).
2. **Web canlı.** Ders kaynağı web ve mobil tarafından paylaşılıyor. İçeriği
   iyileştirmek serbest, bozmak değil. Ayrı bir kopya çıkarma.
3. **`mobile/src/data/lessons/de-a2.json` TEK SATIRDIR.** Üreticisi
   `JSON.stringify(lessons)` kullanır. Elle `null, 1` ile yazarsan 40 bin
   satırlık sahte diff üretirsin. Her zaman dump betiğiyle üret.
4. **Havuza kelime eklerken türev ekleme.** Fiilin Partizip II biçimi
   (`gemacht`, `gegangen`), ismin çoğulu (`die Haare`←`Haar`), sıfatın
   derecesi (`weniger`←`wenig`) madde başı DEĞİLDİR; kelime oyunlarında aynı
   kelimeyi iki kez gösterirler. Bunlar fiilin/ismin `formen` alanına ait.
   Yeni id'ler `data/app/words.json`'daki en büyük id'den devam etsin
   (gsw-zh 100000+, İngilizce 209001+ aralıklarına girme).
   `rank` uydurma — `data/a2-expansion/de_50k.txt` sıklık listesinden oku
   (satır numarası = sıra).
5. **Commit yerelde kalır.** `git push` Samet'in işi, sen push etme.
6. **Üretim veritabanına yazma yok.** `words.json`'a eklediğin satırlar canlıya
   ancak seed ile gider; onu çalıştırmadan önce kullanıcıya sor.
7. **Paralel oturum var.** Başka bir Claude oturumu aynı depoda çalışıyor ve
   bazen `git commit -a` yapıyor. Bir parçayı bitirir bitirmez **yalnız kendi
   dosyalarını** `git add <yol>` ile ekleyip commit'le; `git add -A` kullanma.

---

## 5. Yöntem

### Adım 1 — Teşhis
Şunları ölç ve kullanıcıya tablo hâlinde sun:
- derslerin öğrettiği maddelerin seviye dağılımı,
- A2 katmanının kapsanma oranı (öğretilen / yalnız metinde geçen / hiç yok),
- havuzda hiç olmayan ders kelimeleri.

Seviye eşleştirmesinde başlığı normalize et: küçült, baştaki artikeli at,
parantezli açıklamayı sil. **Havuz başlıklarını `/` ile bölme** — `"die/das
Glace/Glacé"` gibi satırlar `die`/`das`'ı sahte bir seviyeye bağlar.
İşlev sözcüklerini (`ich`, `und`, `der`…) "kapsanmamış" saymak da yanıltıcıdır:
cümlelerde sürekli geçerler, sözlükçe kartına ihtiyaçları yoktur.

### Adım 2 — Kapasite kararını KULLANICIYA SOR (kendin karar verme)
A1'de aritmetik temiz çıktı: 790 kelime, 100 ders × 8 = 800 slot.
**A2'de çıkmıyor: 1412 kelime, 800 slot.** Seçenekler:
- ders başına ~14 kelime (ders süresi ciddi uzar),
- ders başına 8 + sıklık önceliği (kapsama ~%57'de kalır),
- ders sayısını artırmak (ünite düzeni ve 25 ünite varsayımı değişir; id'ler
  sabit kaldığı için yalnız EKLEME yapılabilir),
- A2 katmanının bir kısmını B1'e taşımak (havuz kararı, kullanıcı verir).

Bu karar her şeyi değiştirir; sorulmadan ilerleme.

### Adım 3 — Havuz boşluğunu vetle
Derste öğretilip havuzda olmayan 72 maddeyi çıkar, her birini sınıflandır:
gerçek madde başı mı, yoksa havuzdaki bir maddenin çekimi/türevi mi
(§4.4). A2'de bunların önemli bir kısmı **modal fiillerin geçmiş biçimi**
(`wollte`, `konnte`, `musste`, `durfte`) ve **Perfekt biçimleri**
(`umgezogen`, `gepackt`) — bunlar madde başı değildir. Eklenecek olanlar için
tam satır üret: `artikel`, `formen`, `tr`, `en`, `beispiel`, `beispielTr`,
`beispielEn`, `niveau`, `rank`.

### Adım 4 — Atamayı ELLE yap, modül modül
**Mekanik dağıtım denendi ve reddedildi.** Ders başlığı + özet + mevcut
sözlükçeden "anlam torbası" kurup kelimeleri puanla dağıtan bir betik yazıldı;
aritmetik olarak kusursuz çalıştı (hepsi yerleşti) ama çıktı kullanılamazdı —
"Merhaba" dersine `der Empfänger`, "Nasılsın" dersine `das T-Shirt` düştü.
Kelime örtüşmesi müfredat tasarımı için yeterli sinyal değil.

Bunun yerine: her modül (10 ders) için
1. dersin mevcut A2 kelimelerini **çıpa** say, yerinde bırak,
2. seviye dışı olanları çıkar,
3. boş slotları A2 katmanından **anlamına bakarak** doldur,
4. atamayı bir betikle doğrula: her kelime A2 mi, havuzda mı, **başka bir derste
   zaten öğretiliyor mu** (bu son kontrol A1'de gerçek bir hata yakaladı).

Her modül bitince dur, kullanıcıya özetle, onay al, sonrakine geç.

### Adım 5 — Ders içeriğini yaz
Sözlükçe değişince `lecture` adımları da değişmeli: her yeni kelimenin
öğretildiği adım, çıkan kelimenin izleri, `patterns` ve `roleplay` tutarlılığı.
Türkçe anlatım, hedef dil parçaları `lang: "de"` ile işaretli.

### Adım 6 — Doğrula
A1'de kalibre edilmiş ölçütler, hepsi sıfır olmalı:
- her `truefalse` adımının iddiası ekranda görünüyor,
- sözlükçedeki her kelime `lecture` içinde gerçekten öğretiliyor,
- segment metinlerinde baştaki/sondaki fazla boşluk yok,
- Türkçe segmentlerin içine gömülü Almanca metin yok,
- doğru cevaplar denetleyici tarafından reddedilmiyor (kısaltma varyantları
  `accept` listesinde),
- ders başlığı ve rol yapma açılışı yinelenmiyor.

Ayrıca: `npx tsc --noEmit` (kök ve `mobile/`), `npm run check:lessons`,
`npm run test:track`, `npm run test:options`.

---

## 6. Teslim

Her parça kendi commit'i olsun. Commit mesajı **ne yapıldığını değil neden
yapıldığını** anlatsın; A1 tarafındaki commit'leri örnek al (`git log
--grep="A1 havuzu"`). Sonunda kullanıcıya: neyin bittiği, neyin bilerek
bırakıldığı, hangi sayının nereden geldiği.

---

## 7. Sonuç — 2026-09-05

İş bitti. Aşağıdaki her sayı, brief'in Adım 6'sında sayılan doğrulayıcılarla
ölçüldü; komutlar parantez içinde.

### Hedef 1 — dersler havuzun A2 katmanından öğretsin

100 ders × 8 kelime = **800 sözlükçe yuvası** (`scripts/check-lessons.ts`,
A1 ve A2 için sekiz kelime zorunlu).

| Ölçüt | Başlangıç (2026-09-04) | Şimdi |
|---|---|---|
| A2 katmanından | 249 (%49,8) | **792 (%99,0)** |
| A1 katmanından | 133 (%26,6) | **8 (%1,0)** |
| B1 / B2 / C1 | 144 / 31 / 4 | **0 / 0 / 0** |
| Havuzda hiç yok | 72 | **0** |
| A2 içinde tekrar eden | — | **0** |

Kalan 8 A1 maddesi bilerek duruyor: `seit`, `vor`, `zwischen` (Dativ ve
Wechselpräposition derslerinin konusu), `dürfen` (kipli fiil dersi), `denn`
(bağlaç karşılaştırması), `gehören`, `vorstellen`, `schenken` (yönelme hâli
dersleri). Bunlar A1'de tanıtılıp A2'de dilbilgisi konusu olarak geri geliyor;
başka bir kelimeyle değiştirmek dersin kendisini bozardı.

Seviyeler arası tekrar — hiçbir doğrulayıcının göremediği, çünkü tekrar
denetimi seviye içinde çalışıyor — **57'den 3'e** indi (`overlap.ts`). Kalan üçü
yukarıdaki listeden: `dürfen`, `zwischen`, `schenken`.

### Hedef 2 — A2 katmanının kapsanması

| Ölçüt | Başlangıç | Şimdi |
|---|---|---|
| A2 dersleriyle kapsanan | 115/1412 (%8,1) | **792/1416 (%55,9)** |
| Hiçbir seviyenin dersinde geçmeyen | — | 556/1416 → **860 kapsandı (%60,7)** |

Katman 1412'den 1416'ya çıktı: derste öğretilip havuzda olmayan 72 maddenin
vetosundan sonra 36 gerçek başlık eklendi (id 8482-8517), geri kalanı türemiş
biçim olduğu için `formen` alanına ait sayıldı ve havuza girmedi. `rank`
uydurulmadı; `data/a2-expansion/de_50k.txt` satır numarasından okundu.

%100 kapsama 100 × 8 = 800 yuvayla matematiksel olarak mümkün değil (katman
1416). Kalan 624 madde ancak ders sayısı ya da sözlükçe boyu değişirse
öğretilebilir — ikisi de brief'te sabit.

### Hedef 3 ve 4 — beceri egzersizleri ve ExamPrep

25 ünite × (2 okuma + 2 dinleme + 2 yazma) deseni **tamamlandı**:

| | Başlangıç | Şimdi |
|---|---|---|
| Okuma | 12 | **50** |
| Dinleme | 12 | **50** |
| Yazma | 8 | **50** |

118 eksik egzersizin tamamı yazıldı (`a2-u01.ts` … `a2-u21.ts`). Yerleşim
`unit` etiketine değil **liste sırasına** bakıyor — `buildTrack` havuzları
imleçle tüketiyor — o yüzden ünite dosyaları `a2.ts` içinde en başta duruyor,
eski 32 genel egzersiz sonraki ünitelere köprü oluyor. ExamPrep aynı havuzdan
beslendiği için hedef 4 kendiliğinden karşılandı.

### Doğrulama

`npm run check:lessons` → **hata yok**, 7 uyarı (hepsi B1, paralel oturuma ait).
`npx tsc --noEmit` kökte ve `mobile/` içinde temiz. `npm run test:track` 55
kontrol geçti. `npm run test:options` 8379 kelime 0 hata, 4672 isimde artikel
eksiği yok. `npm run dump:skills` ile mobil paket yenilendi; fark yalnız A2'de
(38/38/34 → 50/50/50), başka seviyeye dokunulmadı.

### Yol boyunca düzeltilen iki doğrulayıcı hatası

`scripts/check-lessons.ts` sözlükçe boyunu 5'e sabitlemişti; A1 ve A2 sekize
çıkınca doğrulama kırmızıya döndü — seviyeye bağlı hâle getirildi.
`scripts/check-content.ts` `minTurns` için 2-6 uyarıyordu, `check-lessons.ts`
ise 6-9 dayatıyordu; iki doğrulayıcı aynı alan için farklı şey söylediğinden
katalogda 426 sahte uyarı üretiyordu, eşik hizalandı.

### Bilerek bırakılanlar

- **A1 katmanının havuz boşlukları.** 12 ayın 11'i havuzda yok; `gelb` ve
  `braun` yok ama `gelblich` var. Bunlar A1 oturumunun işi, buradan
  dokunulmadı.
- **`npm run test:content` hâlâ bütçe üstü.** Sekiz kategoriden yalnız biri
  (6 çok anlamlı A2 sözlükçe maddesi) bu işe aitti ve düzeltildi; geri kalanı
  A1/B1/B2/C1 ile beceri birikimine ait.
- **Kalan 624 A2 maddesi.** Ders sayısı ve sözlükçe boyu sabit olduğu sürece
  öğretilemez; kararı ders sayısını artırmak isteyen bir sonraki oturuma ait.

---

## 8. Pedagojik denetim ve kalan boşluk — 2026-09-05

İş bittikten sonra "eğitim açısından mantıklı mı" diye bakıldı. Ölçümler
aşağıda; biri kapatıldı, biri sınırlandı, biri açık kaldı.

### Asıl kazanç kapsama yüzdesi değildi

`src/lib/session.ts:476-549` — oyun/SRS kuyruğu `words` tablosundan `niveau`
bandına göre kuruluyor (`[alt, seviye, üst]`, %70 seviyede). Yani **bir kelime
havuzda ve doğru seviyedeyse aralıklı tekrara girer, değilse hiç girmez.**

Başlangıçtaki 500 yuvanın **107'si (%21,4) tekrar motorunun erişemeyeceği
yerdeydi**: havuzda olmayan 72 + B2 31 + C1 4. Bunlar derste bir kez gösterilip
bir daha dönmüyordu. Şimdi 800 yuvanın tamamı bandın içinde. Yapılan işin
pedagojik gerekçesi budur — kapsama yüzdesi bunun yan ürünü.

İkinci ölçüm: ders sözlükçesindeki 800 kelimenin **743'ü (%92,9)** beceri
egzersizlerinin metinlerinde en az bir kez geri dönüyor. Üç katman bağlı:
ders (ilk karşılaşma) → SRS (aralıklı geri çağırma) → beceri (bağlamda tekrar).

### §7'deki bir cümle yanlıştı

"Kalan 624 madde ancak ders sayısı ya da sözlükçe boyu değişirse öğretilebilir"
demiştim. **Yanlış.** O kelimeler havuzda ve A2 bandında, yani SRS kuyruğunda
zaten öğreniliyor. Havuz bir müfredat değil, tekrar motorunun yakıtı; her
kelimenin ders başlığı olması gerekmiyor. Doğrusu: *ders başlığı olarak
sunulamaz, SRS üzerinden öğrenilir.*

### Kapatılan: patikada birikimli tekrar yoktu (e6885d3)

`deriveQuiz` soruları yalnız bitmekte olan ünitenin kelimelerinden üretiyordu —
item'ın adı "Karışık hatırlama" olmasına rağmen karışık değildi. Ünite 3'te
öğrenilen kelime ünite 4'ten sonra patika üzerinden bir daha hiç sorulmuyordu.
Artık soruların üçte biri geçmiş ünitelerden geliyor ve seçim tüm geçmişe
yayılıyor. Ölçüm: açığa çıkan farklı eski kelime 0 → 131 (A1/A2), 0 → 239 (B1).
**Bu düzeltme seviyeden bağımsız; A1 ve B1 de kendiliğinden kazandı.**

### Açık kalan: ünite 20-25 hizasız

| Seviye | Ünite hizalı | Egzersiz (o/d/y) | Hedef | Yetim ders kelimesi |
|---|---|---|---|---|
| A1 | **25/25** | 62/62/58 | 50 | 27/800 |
| A2 | **19/25** | 50/50/50 | 50 | 57/800 |
| B1 | **4/45** | 20/20/16 | 90 | 386/1440 |

A2'de ünite 20-25 hâlâ eski 32 genel egzersizle besleniyor: yanlış değiller,
ama o ünitelerin derslerini ölçmüyorlar. 57 yetim kelimenin **39'u tam bu altı
ünitede** — yani yetim sayısı bağımsız bir sorun değil, bu boşluğun belirtisi.

**Kalan iş: 32 ünite hizalı egzersiz** (ünite 20-21'e okuma+dinleme, ünite
22-25'e tam takım). Ünite 20-21'in yazması zaten yazıldı.

### Bu işi yapacak oturum için — veri güvenliği uyarısı

`user_skills` birincil anahtarı **`(user_id, exercise_id)`** (`schema.ts:366`),
yani `user_lessons` ile aynı kural. **Eski 32 egzersiz silinemez, kimliği
değiştirilemez** — canlı ilerleme gider.

Doğru yöntem: yeni ünite dosyalarını `a2.ts` listesinde eskilerin **ÖNÜNE**
ekle. `buildTrack` havuzları liste sırasıyla imleçle tüketir (`unit` etiketine
bakmaz), o yüzden yeni içerik ünite yuvalarını kapar ve eski egzersizler 50.
yuvanın ötesine düşer: kimlikleri durur, ilerleme kaydı çözülmeye devam eder,
sadece patikada zamanlanmazlar. Silme değil, sıra değişikliği.

### Bilerek kapatılmayanlar

- **10 dakikalık derste 8 kelime yoğun** (~75 sn/kelime, tek tekrar adımı). Bu
  bir sunum katmanı; edinim SRS'te ve beceri egzersizlerinde oluyor. Ayrıca 8
  sayısı pedagojik değil aritmetik bir karardı (100×8=800) — savunulabilir ama
  sıralaması ters. Ders sayısı sabit olduğu sürece değiştirilemez.
- **Dilbilgisi sıralaması denetlenmedi.** Ders kimlikleri sabit olduğu için sıra
  da sabitti; bu işin "pedagojik olarak tutarlı" iddiası kelime seçimi ve beceri
  hizalaması için geçerli, müfredat sıralaması için değil.
- **`speaking` egzersizleri patikaya girmiyor.** A1'de 8 tane var
  (`a1-uNN-s1`), `BASE_PATTERN` içinde konuşma yuvası yok
  (`build.ts:30`), yani `buildTrack` onları hiç yerleştirmiyor. A2'de hiç yok.
  Yeni içerik yazmadan önce bu deseni sahibi karara bağlamalı.
