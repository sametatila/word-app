# GÖREV — Almanca B1 patikasını kelime havuzuna göre yeniden kurgula

A1 için yürüyen işin B1 karşılığı. A1'i başka bir oturum yapıyor, A2'yi bir
başkası (`docs/plan/a2-yeniden-kurgu.md`). **Aynı depoda paralel çalışacaksın**,
§4'teki çakışma kurallarına harfiyen uy.

---

## 1. Sorun — ölçüldü (2026-09-04)

| Ölçüt | Değer |
|---|---|
| B1 dersi | 100 (10 modül × 10) |
| Havuzun B1 katmanı | 1797 kayıt · normalize **1783** farklı başlık |
| Derslerin öğrettiği | 500 madde (ders başına 5) |
| Seviye **altı** (A1 33 + A2 86) | 119 — **%23,8** |
| Seviye **üstü** (B2 99 + C1 15) + havuzda yok (116) | 230 — **%46,0** |
| Gerçekten B1 olan | 151 — %30,2 |
| **B1 katmanının kapsanması** | 150/1783 — **%8,4** |

Karşılaştırma: A1 kapsama %35'ti (şimdi %75,4), A2 %8,1'di (2026-09-04 akşamı
%26,1 — paralel oturum sürüyor). **B1 en kötü durumda ve en büyük katman.**
Ayrıca B1'in kendine özgü bir sorunu var: A1 dersleri seviyenin ÜSTÜNE
taşıyordu; B1 dersleri hem üstüne (%23 B2/C1) hem ALTINA (%24 A1/A2) taşıyor.
Yani ders ne öğrettiğini bilmiyor.

**Payda düzeltmesi (2026-09-04, bağımsız ölçüm).** Bu tablonun ilk hâli
"kart gerektiren 1796" diyordu; o sayı hiçbir yöntemle üretilemedi — 1797 kayıt,
1791 farklı `de`, 1783 normalize anahtar, 1797 (`de`+artikel), 1797 (`de`+`tr`).
Kodda kart filtresi de yok. A2 brief'inde aynı sorun var (1416 → "1412").
Bundan sonra payda **1783** (küçült · parantez sil · baştaki artikeli at ·
`/` ile BÖLME). Fark %0,1; hiçbir kararı değiştirmiyor.

Havuzda hiç olmayan 116 madde ağırlıkla iş yeri jargonu: die Kernzeit, brutto,
der Nachfolger, die Einarbeitung, sich weiterentwickeln. Bunların bir kısmı
gerçek B1 maddesi (havuza eklenmeli), bir kısmı B2'ye ait.

---

## 2. Hedef

1. Derslerin öğrettiği her kelime havuzun **B1 katmanından** gelsin.
   Alt seviye tekrarı **~%10** (karar verildi, aşağıya bak) — ders başına
   ~1 pekiştirme kelimesi. Bugünkü %23,8 fazla.
2. B1 katmanının kapsanması **%8,4 → ~%73** (karar verildi, aşağıya bak).
3. Ünite deseni dolsun: **4 konuşma dersi + 2 okuma + 2 dinleme + 2 yazma +
   gramer + quiz + kontrol**. 180 ders ÷ 4 = **45 ünite** → her beceriden
   **90 egzersiz**. Elde: 12 okuma · 12 dinleme · 8 yazma → **238 eksik**.
   quiz + kontrol ünite brief'inden otomatik türetiliyor, yazman gerekmiyor.
4. Sınav (ExamPrep) beceri içeriğinden besleniyor; 3 dolunca o da dolar.

---

## 3. Dosya haritası

| Ne | Nerede |
|---|---|
| Ders kaynağı | `src/lib/lessons/content/de-b1-b01.ts … b10.ts` — **web ve mobil paylaşır** |
| Mobil ders paketi | `mobile/src/data/lessons/de-b1.json` — türev, `npx tsx scripts/dump-lessons-mobile.ts de` |
| Kelime havuzu | `data/app/words.json` — `[` + satır başına bir kayıt + `]` |
| Beceri kaynağı | `src/lib/skills/content/b1.ts` (+ ünite dosyaları, aşağıya bak) |
| Mobil beceri paketi | `mobile/src/data/skills/exercises.json` — `npm run dump:skills` |
| Ünite deseni | `src/lib/immersion/build.ts:26-41` (kaynak) + `mobile/src/game/immersionTrack.ts:23` (kopya) |

---

## 4. İhlal edilemez kurallar

1. **Ders id'leri SABİT.** `user_lessons` PK'si `(user_id, lesson_id)`; id
   değişirse canlı ilerleme silinir. Mevcut 100 dersin id'i de katalog sırası
   da dokunulmaz.
   **Ders SAYISI dondurulmuş değil (2026-09-04 kararı).** Bu maddenin ilk hâli
   "ders sayısını da değiştirme (100)" diyordu ve §5 Adım 2'nin sunduğu
   "ders ekleme" seçeneğiyle çelişiyordu. Çelişki şöyle çözüldü: id dondurması
   yerinde, **sona ders eklemek serbest**. Yeni ders sayısı **20'nin katı
   olmalı** — modül 10'arlı (`MODULE_SIZE`), ünite 4'erli (`UNIT_LESSONS`)
   dilimliyor; 20'nin katı değilse son modül ya da son ünite eksik kalır.
2. **Web canlı.** Ders kaynağı ortak; iyileştir, bozma, ayrı kopya çıkarma.
3. **`de-b1.json` TEK SATIRDIR** (`JSON.stringify` ile üretiliyor). Elle
   `null, 1` yazarsan on binlerce satırlık sahte diff üretirsin.
4. **Havuza türev ekleme.** Partizip II (`gemacht`), çoğul (`die Haare`),
   derece (`weniger`) madde başı değildir — `formen` alanına aittir.
   Yeni id'ler en büyük id'den devam etsin (gsw-zh 100000+, İngilizce 209001+
   aralıklarına girme). `rank` uydurma, `data/a2-expansion/de_50k.txt`
   sıklık listesinden oku (satır numarası = sıra).
5. **Commit yerelde kalır**, push Samet'in işi.
6. **Üretim DB'sine yazma yok** — seed öncesi sor.
7. **Paralel oturum var**; yalnız kendi dosyalarını `git add <yol>` ile
   commit'le, `git add -A` KULLANMA.

---

## 5. Yöntem

### Adım 1 — Teşhis
Seviye dağılımı, katman kapsanması, havuzda olmayan kelimeler. Normalizasyonda:
küçült, baştaki artikeli at, parantezi sil. **Havuz başlıklarını `/` ile
bölme** — `"die/das Glace/Glacé"` gibi satırlar `die`/`das`'ı sahte seviyeye
bağlar. İşlev sözcüklerini ("ich", "und") "kapsanmamış" sayma.

### Adım 2 — Kapasite kararı — VERİLDİ (2026-09-04)

A1'de aritmetik temizdi: 790 kelime, 100×8 = 800 slot. B1'de imkânsızdı:
1783 kelime, 800 slot. Sorulan seçenekler ve verilen cevap:

| Karar | Değer |
|---|---|
| Ders başına kelime | **8** (A1/A2 ile aynı biçim) |
| Alt seviye (A1/A2) tekrarı | **~%10** → ders başına ~1, slotun %90'ı B1 |
| Ders sayısı | **180** = 100 mevcut + 80 yeni |
| Modül / ünite | **18 modül** (+8 yeni tema) · **45 ünite** |
| B1 slotu | 180 × 8 × 0,9 = **1296** |
| Hedef kapsama | 1296/1815 = **%71,4** |
| Beceri egzersizi | 45 × 6 = **270** gerekir, 32 var → **238 eksik** |

**Neden %73 ve neden 180:** A1 bugün %75,4 kapsamada. Her seviyenin ~%75'e
oturması ürün içinde tutarlı bir vaat. Brief'in ilk hâlindeki "+60 ders = %70"
tahmini %10 alt tekrarı hesaba katmıyordu; tekrarla +60 ders yalnızca %64,6
veriyor, %70 için +80 gerekiyor.

**Neden %100 değil:** kart/SRS motoru (`session.ts:279,520` · `daily.ts:98`)
havuzu `niveau` bandıyla çekiyor, yani B1 katmanının TAMAMI zaten öğrenciye
ulaşıyor. Dersin işi bağlamda öğretmek. %100 kapsama 260 ders (+160, içerik
2,6 katı) ve 358 egzersiz borcu isterdi; son %20'nin marjinal değeri düşük.
Derste geçmeyecek ~487 B1 kelimesi kartla gelir.

**Yapısal engel yok (kontrol edildi):** `moduleCount = ceil(ders/10)`
(`module-content.ts:204`), ünite sayısı `ceil(ders/4)`, `moduleTheme` taşan
dilimde boş dönüp `${level} · Ünite N`'e düşüyor. Hiçbir yerde 100 sabiti yok.
Sınav, boss, karakter, hub — hepsi türetilmiş. İki temas noktası var:
`scripts/check-lessons.ts:59` (`vocabSize` seviye başına sabit kodlu — paralel
A2 oturumuyla ORTAK dosya) ve `MODULE_THEMES.B1` (`modules.ts:44-55`, bugün
tam 10 tema; 8 yeni tema gerekiyor).

### Adım 3 — Havuz boşluğunu vetle — YAPILDI (2026-09-04)

Sonuç ve 116 maddenin tek tek gerekçesi: **`docs/plan/b1-havuz-veto.md`**.
Özet: 3 havuzda zaten vardı (ders varyant yazmış) · 3 türev · **32 gerçek B1
maddesi havuza eklendi** (id 8450–8481) · 78 dersten çıkacak.

Havuzun B1 katmanı 1797 → **1829** kayıt, normalize 1783 → **1815** başlık.
Bu yüzden yukarıdaki hedef kapsama %72,7 değil **%71,4**; ders sayısı kararı
(180) değişmedi.

### Adım 3.5 — Mevcut 100 ders BİTTİ (2026-09-05)

On modülün onu da havuzun B1 katmanına oturdu. Ölçüm:

| Ölçüt | Önce | Sonra |
|---|---|---|
| Seviye üstü (B2+C1) | 230 | **0** |
| Havuzda olmayan | 116 | **0** |
| Seviye altı (A1+A2) | 119 (%23,8) | **46 (%5,8)** |
| Gerçekten B1 | 151 (%30,2) | **754 (%94,3)** |
| Katman kapsaması | 150/1783 (%8,4) | **761/1815 (%41,9)** |
| `check:lessons` B1 | 100 hata | **0** |

Kalan 7 uyarı bu işten önce de vardı ve sözlükçeyle ilgisi yok: bağlaç
derslerinin kalıp açıklamaları Türkçe segmentin içinde Almanca örnek cümle
taşıyor. Ayrı bir iş.

### Adım 3.6 — Genişleme iskeleti: modül 11–18 (2026-09-05)

Hedef %71,4'e 100 derslik iskelet yetmiyor (%41,9 veriyor); kalan 80 ders
kararın ikinci yarısı. Sekiz yeni modül teması **uydurulmadı**: modül 1–10
bittikten sonra havuzda kapsanmayan **1059** B1 maddesi kümelendi ve her tema
en az 80 madde bulduğu yerde açıldı.

| Modül | Tema | Kaynak küme |
|---|---|---|
| 11 | Mutfak ve sofra | yiyecek, pişirme, lokanta (die Zutaten, der Kellner, das Gebäck) |
| 12 | Alışveriş, para ve banka | der Rabatt, das Bargeld, die Einzahlung, die Garantie |
| 13 | Yolculuk ve ulaşım | die Fähre, der Hafen, die Übernachtung, die Umleitung |
| 14 | Beden, bakım ve yaşlanma | der Muskel, das Knie, die Spritze, die Betreuung |
| 15 | Evde teknik ve onarım | die Steckdose, die Batterie, die Tastatur, das Werkzeug |
| 16 | Meslekler ve iş yaşamı | die Lehrstelle, der Ingenieur, die Gewerkschaft |
| 17 | Toplum, hukuk ve göç | die Migration, das Urteil, die Minderheit, das Asyl |
| 18 | Kültür, spor ve doğa | die Oper, das Stadion, das Gebirge, der Sturm |

Dilbilgisi odağı YENİ değil: modül 1–10 B1'in yapı envanterini zaten kuruyor.
Genişleme modülleri aynı odakları yeni alanlarda tekrar çalıştırıyor (sarmal).

**Yapısal düzeltme:** modül 10'un son dersi (`de-b1-rueckblick`) metninde
"B1'in son dersindeyiz" diyordu; 80 ders eklenince yolun ortasında kalıyor.
Başlığı zaten «Die Zwischenbilanz» (ara değerlendirme) olduğu için iki cümle
"ilk bölümün sonu" diye düzeltildi, ders yerinde kaldı — id ve katalog sırası
dokunulmaz.

### Adım 4 — Atamayı ELLE yap, modül modül
**Mekanik dağıtım A1'de denendi ve reddedildi:** ders metninden anlam torbası
kurup puanlayan betik aritmetik olarak hepsini yerleştirdi ama "Merhaba"
dersine `der Empfänger`, "Nasılsın" dersine `das T-Shirt` düşürdü. Kelime
örtüşmesi müfredat tasarımı için yeterli sinyal değil.

Her modülde: mevcut B1 kelimelerini **çıpa** say → seviye dışını çıkar →
boş slotları ANLAMINA BAKARAK doldur → betikle doğrula.

**A1'de canımı yakan beş tuzak — hepsi gerçek hata üretti:**

1. **Taşıyıcı kelimeyi çıkarma.** Bir kelime sözlükçede duruyor diye
   çıkarılamaz; kalıpta, produce hedefinde, rol yapma açılışında ya da ders
   başlığında yaşıyor olabilir. A1'de `umtauschen` 15, `der Kanal` 16 yerde
   geçiyordu. Çıkarmadan önce dersin TÜM metninde ara.
2. **Kök araması fiilde kör.** Kalıp `Ich schneide …` yazar, sen `schneiden`
   ararsın, bulamazsın ve "serbest" sanırsın. Dönüşlülerde de aynı:
   `sich verlaufen` için kök `sich` çıkar. Kökü mastardan değil, ilk 4-5
   harften al ve dönüşlü öneki at.
3. **Büyük harf isim/fiil ayırır.** `leben` (yaşamak) ile `Leben` (hayat)
   AYRI kelimelerdir. Kelime haritanı küçük harfle anahtarlarsan biri
   diğerini yutar — A1'de bir ders "hayat" yerine "yaşamak" öğretir hâle
   geldi. Önce tam eşleşme, sonra küçük harf.
4. **Aynı turda yineleme.** Ön denetimin yalnız ÖNCEKİ derslere bakarsa, o
   çalıştırmada eklediğin iki kelime birbirini görmez.
5. **Gloss'u oku.** `die Eins` havuzda "en yüksek not" (Alman okul notu)
   demek, "bir" değil; sayı dersine koymak yanlıştı. Doğrulayıcı bunu
   yakalayamaz — seviye ve boşluk denetiminden geçer. Her kelimenin Türkçe
   karşılığını gözle.

### Adım 5 — Ders içeriğini yaz
Sözlükçe değişince `lecture` adımları da değişir. A1'de kullanılan yöntem:
kelimeyi kaldırmak yerine **yerine koy** — adımların "İlk/İkinci/…"
numaralandırması bozulmaz ve diff okunabilir kalır.

### Adım 6 — Beceri içeriği: ünite hizalı yaz
A1'de `src/lib/skills/content/a1-uNN.ts` deseni kuruldu: her ünite için 6
egzersiz (2 okuma + 2 dinleme + 2 yazma), `unit: N` alanıyla, ve dizinin
BAŞINDA spread edilir (`...a1U01, ...a1U02, …`) — immersion builder ünite
slotlarını konuma göre dolduruyor.

**Kural: egzersiz, o üniteye kadar öğretilen kelimelerin dışına çıkmaz.**
`npm run check:unitvocab` bunu ölçüyor (`scripts/check-unit-vocab.cjs`).
A1'de bu betik kendi yazdıklarımda gerçek kaymalar buldu: konum sözcükleri
6 ünite erken, `die Hand` 5 ünite erken, ve en kötüsü **Perfekt 20 ünite
erken** (`Was hast du gebracht?`). Hiçbirini elle fark etmek mümkün değildi —
hepsi doğal Almanca ve seviyeye uygun duruyordu.

B1'de aynı disiplin geçerli ama eşik farklı: B1 öğrencisi A1/A2'nin tamamını
bilir, o yüzden "izin verilen küme" = A1 + A2 + o üniteye kadarki B1.

Yazma görevi türleri sabittir (`src/lib/skills/types.ts`): `sentence` (AI
rubriği, `answer` alanı YOK), `build` (tr + answer + hint), `rewrite`,
`form`, `reply`, `summary`, `free`. `text` diye bir tür yok.

### Adım 7 — Doğrula
Hepsi sıfır olmalı: her `truefalse` adımının iddiası ekranda görünüyor ·
sözlükçedeki her kelime `lecture` içinde repeat adımıyla öğretiliyor ·
segment boşluk artığı yok · Türkçe segmentte gömülü Almanca yok · doğru cevap
reddedilmiyor · ders başlığı ve rol yapma açılışı yinelenmiyor.

Komutlar: `npx tsc --noEmit` (kök ve `mobile/`), `npm run check:lessons`,
`npm run check:unitvocab`, `npm run test:track`, `npm run test:options`.

---

## 6. Teslim

Her parça kendi commit'i; mesaj ne yapıldığını değil **neden** yapıldığını
anlatsın. A1 tarafındaki commit'leri örnek al: `git log --grep="A1 Modül"`.
Sonunda kullanıcıya: ne bitti, ne bilerek bırakıldı, hangi sayı nereden geldi.
