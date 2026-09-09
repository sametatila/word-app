# Anadil ekseni — en→de ve de→en pariteleri

Kullanıcıya iki eksen sunuluyor: **anadil** (`profiles.native_lang`, aynı zamanda
arayüz dili) ve **hedef dil** (`profiles.course`). Bu, sektörün yaptığı şey —
Duolingo'nun bütün kataloğu `(from, to)` çifti üzerine kurulu ve "from" aynı
zamanda arayüz dili; Babbel ve Busuu'da da öyle. Ayrı bir üçüncü "arayüz dili"
ekseni yok ve olmayacak: aynı soruyu iki kez sormak (*"zaten bildiğim dil
hangisi"*) durum uzayını üçe katlar, tek bir yeni içerik üretmez.

## Sunulan çiftler

`coursesForNative()` hedefi anadille aynı olan kursu eliyor (kendi dilini
öğretmek anlamsız). Geriye kalanlar:

| Çift | Kelime verisi | Beceri | Ders |
|---|---|---|---|
| tr → de | ✅ | ✅ | ✅ |
| tr → gsw | ✅ | ✅ | ✅ |
| tr → en | ✅ | ✅ | ✅ |
| **en → de** | ✅ (8707/8707 İngilizce karşılık) | ❌ Türkçe | ❌ Türkçe |
| **en → gsw** | ⚠️ karşılık ✅, örnek çevirisi 0/8266 | ❌ | ❌ |
| **de → en** | ❌ Almanca karşılık sütunu yok | ❌ | ❌ |

## Ölçülen eksikler (2026-09-09)

```
words          gsw örnek cümle · İngilizce      8.266
words          gsw örnek cümle · Türkçe            351
words          en kursu · Almanca karşılık       7.175
words          en kursu · Almanca örnek çevirisi 7.175
skill_exercises  intro + gloss + açıklama       ~9.400 dize × 2 dil
lessons (780)    başlık, özet, sözcük, kalıp,
                 ANLATIM METNİ, rol yapma      ~44.000 alan × 2 dil
```

Derslerin `lecture` alanı öğretmenin **konuşma metni** ve tamamı Türkçe. Yani
en→de "eksik çeviri" değil, kursun o dilde yeniden anlatılması.

## Faz 1 — kod ✅ (bu commit)

Anadil ekseni artık kelime katmanında **gerçekten** çalışıyor.

- `glossFor(word, native)` — tek çözücü. Ana satır anadilde, ikinci satır
  İngilizce ayırt edici (ana satır zaten İngilizceyken düşer).
- **Karşılık yoksa `null` döner, Türkçeye DÜŞMEZ.** Kelime havuzdan elenir.
  Düşülseydi Alman kullanıcıya Türkçe anlam gösterirdik — eksik çevirinin en
  kötü biçimi, çünkü görünürde çalışıyor.
- Sunucu: `daily.ts`, `session.ts`, `weekly.ts`, `exam.ts`, `lessons/boss.ts` —
  soru, şık, çeldirici, yanlış iddia, benzerlik puanı, yazma eşanlamlıları.
  `makeRound`'un `native` parametresi **zorunlu**: varsayılan verilseydi yeni
  bir çağıran sessizce Türkçeye düşerdi.
- İstemci: on oyun + `why.ts` açıklamaları + yürüyüş modunun okuduğu metin.
- Kapı: `npm run test:gloss`, CI'da.

Bunun somut sonucu: **en→de kelime katmanında bugün çalışıyor** — yeni veri
istemiyor, veri zaten vardı; eksik olan koddu.

## Faz 2 — parite tamlık kapısı ✅

Sunum bir **beyan** (`PAIR_READY`), tamlık ise **veriden ölçülüyor**
(`npm run check:pairs`). Beyanda olmayan çift kullanıcıya hiç gösterilmiyor;
beyan iyimserse denetim kırılıyor, veri tamamlandığında da "artık açılabilir"
diye uyarıyor. Böylece hiçbir aşamada yarım parite yayına çıkmıyor ve Faz 3
parça parça ilerleyebiliyor.

Bugün `PAIR_READY` yalnız **tr→{de, gsw-zh, en}**. İngilizce ve Almanca anadil
seçenekleri, hazır çiftleri olmadığı için **sunulmuyor** — seçtirip ardından
kurs listesini boş bırakmak kullanıcıyı kurssuz bırakmak olurdu. Canlıda kimse
etkilenmiyor: on iki profilin hepsi Türkçe ya da varsayılan. Pariteler
tamamlandığında seçici kendiliğinden geri geliyor.

Bu fazda ayrıca:

- Web kayıt defteri mobile hizalandı: `coursesForNative`, `onboardingCoursesFor`,
  `offeredToNewUsers`, `descKey`. Üç elle yazılmış kurs listesi kalktı
  (ayarlar, onboarding, ana sayfa) — İngilizce kursu web'den seçilemiyordu,
  duraklatılmış Züritüütsch ise yeni kullanıcıya sunuluyordu, ve alt başlık
  `c.id === "de" ? "Hochdeutsch" : "Züritüütsch"` üçlüsüyle üretiliyordu.
- **API çift doğrulaması** (`acceptsPair`): `nativeLang="en"` + `course="en"`
  sunucuda kabul ediliyordu. Kurs açıkça istendiyse reddediliyor; yalnız anadil
  değiştiyse kurs ilk geçerli olana taşınıyor (mobildeki `keepCourseValid`).
- Ayar başlığı "Uygulama dili" → **"Ana dilim"**, alt metni de ne yaptığını
  söylüyor: arayüz + anlatım + kelime anlamları + kurs listesi.

## Faz 3 — veri (başladı)

Bir pariteyi açmak = `check:pairs` onu "!" ile işaretlemesi + `PAIR_READY`ye
eklenmesi.

### 1. gsw örnek cümleleri — BİTTİ (167/167 paket, 8.267 madde)

İlk ölçümde bu kalem "8.266 İngilizce çeviri" görünüyordu. Yanlıştı.
`seed-zurich.ts` zaten şunu yapıyor: lehçe cümlesi Almanca cümlenin karşılığı
olarak yeniden yazılmışsa Türkçe VE İngilizce çeviri Almanca satırdan
**koşulsuz devralınıyor**. Yani çeviri yazılmıyor, cümle hizalanıyor.

O iş `data/zurich/beispiel/SPEC.md`'de tanımlıydı ama hiç koşulmamıştı
(`out/` dizini yoktu) — ve tam olarak bu yüzden gsw'de İngilizce örnek
çevirisi 0/8.266, Türkçe 7.915/8.266.

Triyaj (`triage.mjs`, denetleyicinin KENDİ kurallarıyla) gerçek boyutu verdi:
1.183 cümle. Gerçekleşen: **1.123 cümle elle yazıldı, 7.144 korundu**, 167/167
paket, 0 hata 0 uyarı. Devralma kapsamı ölçüldü: **8.267/8.267 (%100)** —
`data/meanings/out` her maddeyi taşıyor, yani hiçbir cümle çevirisiz kalmıyor.

Hat: `make-packets` → `fix/<paket>.json` (yalnız yeniden yazılanlar) →
`apply.mjs` (korunanları otomatik ekler) → `check.mjs`. `fix/` sayesinde bir
paketin diff'i "neyi elle yazdım"ı gösteriyor, elli maddelik kopyayı değil.

**Yazılacakların çoğu çeviri değil, hizalama sorunuydu.** En büyük kalem "çok
cümleli" (%64): eski cümle ya "1. … 2. …" diye numaralanmış iki ayrı örnek ya
da bir diyalog parçasıydı. Çeviri Almanca satırdan devralındığı için cümlenin
`beispielDe` ile BİRE BİR aynı şeyi söylemesi gerekiyor. İkinci kalem soru
uyuşmazlığı: cümle soru, çevirisi düz cümle — sessizce yalan söylüyordu.
Üçüncüsü sayı: Almanca satır sayıyı harfle yazıyor, lehçe cümlesi rakamla ya
da bambaşka bir sayıyla ("Flächi" 80 m² diyordu, cümle 100).

**Yan ürün: denetleyicide 30'dan fazla boşluk.** Liste mevcut 8.266 cümle
ÖLÇÜLEREK kurulmuştu, o yüzden ölçülen metnin taşımadığı biçimi bilmiyordu —
ve yeni cümleler yazılınca aile aile ortaya çıktı: ayrılabilir ön ekler, emir
kipi yuvası, üç ablaut ailesi (ä→o, i→u, ie/üü→o), ayrılmaz ön ek, fiil+edat
başlıklarında edat kaynaşması, st→scht, bağlı ön ek başlıkları (`un-`), ve
bir gerçek hata (`\b` ASCII olduğu için «Diät» kırpılıyordu). Bu düzeltmeler
elle tek cümle yazmadan 50'den fazla paket açtı.

Ayrıca beş kaynak hatası çıktı ve düzeltildi: `en` → `en/e/es` (Zürihçede
belirsiz artikelin üç biçimi var), `was für en` → `was für en/e/es`,
`zuordne` → `zueordne`, `anschliessend` → `aaschliessend`.

**Kalan adım — üretime uygulama.** `npm run zurich:apply` (ya da `db:seed`)
üretim veritabanına yazar; AGENTS.md gereği bu ayrıca sorulur. Uygulandığında
`check:pairs` en→gsw paritesini "!" ile işaretleyecek.

### 2. words · Almanca karşılık + örnek — BİTTİ (146/146 paket, 7.175 cümle)

İlk ölçümde bu kalem "7.175 karşılık + 7.175 örnek" görünüyordu. Yarısı
yanlıştı. Ölçüm ayırdı:

- **Karşılık %97,2 türetilebilir.** İngilizce kursun her satırı `srcId` ile
  bir Almanca satıra bağlı; o satırın başlığı doğrudan karşılık oluyor.
  Kalan 200 satırın kaynağı yok (`srcId: null`) ve elle yazıldı.
- **Örnek cümle %0 türetilebilir.** İngilizce örnek, Almanca örneğin
  çevirisi DEĞİL — bağımsız yazılmış bir cümle. Bunu satır satır okuyarak
  doğruladım; sayı kümesi örtüşmesi (%99,6) yanıltıcı bir işaretti, çünkü
  cümlelerin çoğunda hiç sayı yok.

Gerçekleşen: **7.175/7.175 cümle elle yazıldı**, 146/146 paket, 0 hata,
33 uyarı (hepsi uzunluk oranı: Almanca bileşik ad İngilizce tamlamadan
kısa ya da uzun — çeviri kusuru değil, dilin biçimi).

**Türetmenin tersine çevrilemediği yerler: 174 karşılık düzeltmesi.**
Almanca satırın `en` alanı bağlam içinde doğru bir çeviri, ama İngilizce
kelime çok anlamlıysa geri dönüşte başka anlama düşüyor — «circulation»
kaynakta gazete tirajı, İngilizce cümlede kan dolaşımı. Oran seviyeye göre
ölçüldü: A1-B1 %2,4 · B2 %3,7 · C1 %1,5. Sebep seviye değil kelimenin
YAŞI: çok anlamlılık kısa, eski, sık kullanılan sözcüklerin özelliği; C1'in
uluslararası terimleri ve uzun bileşikleri tek anlamlı.

Hat: `make-packets` → elle `out/<paket>.json` → `check.mjs`. Kapı kuralları:
boş, noktalama, çok cümleli, sayı kümesi, soru/düz uyuşmazlığı, uzunluk,
karşılık cümlede yok. Denetleyici `data/meanings/contains.mjs`i paylaşıyor —
ikinci bir kopya iki kopyanın ayrışması demekti.

**Yan ürün: denetleyicide dört aile boşluğu.** Harfe yapışık rakam
(«CO2» → sayı sanılıyordu, `\d` sınırı `\p{L}` ile yazıldı; aynı kusur
zurich hattında da vardı), `aufrecht` sıfat-ön eki, ayrılabilir ön ekin
altındaki ayrılmayan ön ek zinciri («einberufen» = ein+be+rufen), ve
`zunichte` fosilleşmiş yuvası. Dördü de aynı desenle bulundu: doğru bir
cümle yazılıyor, kapı reddediyor, reddin tekil mi aile mi olduğuna
bakılıyor. Her düzeltme üç hatta önce/sonra ölçülerek doğrulandı.

**Ölçülüp KUSUR OLMADIĞI anlaşılan bir şey de var:** iki İngilizce başlığın
aynı Almanca karşılığı taşıması (131 grup). Kapıya uyarı yazıldı, 103 uyarı
verdi, sonra bakıldı: «movie/film», «sick/ill» İngilizce eşanlamlı;
«dick» = fat/thick ise Almancanın tek kelimede topladığı iki anlam. İkisinde
de karşılık doğru. Üstelik şık kurucularının üçü de (session.ts
`pickDistractors`, `pickFalseClaim`, daily.ts truefalse) aynı metinli şıkkı
zaten eliyor. Uyarı kaldırıldı, yalnız sayı özet satırında duruyor.

**Kalan adım — üretime uygulama.** `npm run db:seed` üretim veritabanına
yazar; AGENTS.md gereği bu ayrıca sorulur. Uygulandığında `check:pairs`
en→de paritesini "!" ile işaretleyecek.

### 3. skill_exercises — ÖLÇÜLDÜ, iş planın söylediğinin yarısı ve bir kod fazı

Plan bu kalemi "~9.400 dize × 2 dil" diye tahmin ediyordu. Ölçüm (150 dosya,
`src/lib/skills/content/`):

```
egzersiz                870
intro                   870 dize · İngilizcesi 0
questions[].explain   2.835 dize · İngilizcesi 0
gloss girdisi         4.945 · `en` alanı olan 4.945   ← ZATEN BİTMİŞ
```

Yani yazılacak dize **9.400 değil 3.705**: sözlükçe yarısı (4.945) baştan
iki dilli yazılmış. Ama planın hiç saymadığı bir şey var — **kod fazı**.
Bugün hiçbir alan anadile göre seçilmiyor:

- `intro` altı oynatıcıda ham basılıyor (`{exercise.intro}` — reading,
  listening, writing, speaking, grammar, monologue).
- `explain` `quiz.tsx`te ham basılıyor (`{q.explain}`).
- `GlossEntry` `tr` ve `en`i BİRLİKTE gösteriyor, seçmiyor: Türkçe kalın ve
  önde, İngilizce soluk ve altta. İngilizce anadilli kullanıcı için sıra
  ters ve Türkçe satır gürültü.

Yani kelime katmanının Faz 1 öncesi hâli. Orada çözüm `glossFor(word, native)`
tek çözücüsüydü; beceri katmanının karşılığı yok. Veri fazından ÖNCE alanların
şekli kararlaşmalı (`introEn`/`explainEn` kardeş alanlar, `Gloss`un `tr`/`en`/
`hd` deseniyle aynı) — yoksa 3.705 dize sonradan değişecek bir şekle yazılmış
olur.

**Dikkat:** kod fazı `src/components/skills/` altında çalışıyor ve aynı depoda
ikinci bir oturum şu anda tam orayı düzenliyor (bkz. `8b6a131f`, `d2d11677`).
Çakışmamak için o dosyalara dokunulmadı.

### 4. lessons — ÖLÇÜLDÜ: eksenin en büyük kalemi, tek başına ötekilerin toplamından fazla

59 dosya, `src/lib/lessons/content/`:

```
ders                 580
tr() segment      17.369   ← öğretmenin konuşma metni · İngilizcesi 0
de() segment       8.486   ← hedef dil, çevrilmez
titleTr + summary  1.160   ← İngilizcesi 0
vocab girdisi      4.640   ← havuzda karşılığı olan 4.621, ama bkz. aşağısı
patterns girdisi   1.292   ← %0,3 · kalıp cümleler havuzda yok, elle
roleplay scene       580   ← İngilizcesi 0
goal                 580   ← İngilizcesi 0
```

Elle yazılacak: **en az 21.000 dize**. Bunun %83'ü tek bir alan: `lecture`.
Karşılaştırma için en→de örnek cümleleri 7.175'ti — bu kalem tek başına
onun üç katı.

**TÜRETİLEBİLİRLİK İKİ AYRI SORU ve ilk ölçüm yanlış yanıtlıyordu.**
"Havuzda karşılığı var mı" (%99,6) ile "havuzdaki karşılık DOĞRU mu"
başka şeyler. İkincisi ölçüldü: dersin `tr` alanı havuzun `tr` alanıyla
karşılaştırıldı.

```
havuzda karşılığı olan  4.621
tr birebir aynı         3.926  (%84,6) → havuzun `en`i güvenle alınır
tr FARKLI                 695  (%15,0) → tek tek okunmalı
```

Farkın bir kısmı yalnız sözcük tercihi (`soyad`/`soyadı`, `nine`/
`büyükanne`) ama bir kısmı gerçek anlam ayrımı ve türetme orada YANLIŞ
karşılık verirdi:

```
bitte      ders «lütfen»      ↔ havuz «rica»       (en: request)
schreiben  ders «yazmak»      ↔ havuz «resmî yazı» (en: letter)
groß       ders «uzun boylu»  ↔ havuz «büyük»      (en: grand)
süß        ders «sevimli»     ↔ havuz «tatlı»      (en: sweet)
```

Bu, en→de örnek cümlelerinde 174 kez görülen tersine-çevrilemezliğin aynısı:
ders sözlükçesi kelimenin BU METİNDEKİ anlamını taşıyor, havuz ise birinci
sözlük anlamını (bkz. `types.ts`teki `Gloss` yorumu — kural zaten yazılıydı).
Yani `vocab` için tek tek okunacak madde 19 değil **714** (695 + 19).

`VocabItem` tipi bugün `{ de, tr }` — `en` alanı yok, eklenmesi gerekiyor.

Kalem BÖLÜNEMİYOR. Sözlükçesi ve başlıkları İngilizce, anlatımı Türkçe bir
ders yarım çeviridir ve Faz 1'in kuralı bunu yasaklıyor: karşılık yoksa
`null` döner, Türkçeye DÜŞMEZ. Yarım ders "görünürde çalışan" en kötü
biçimdir.

**Tip hazır.** `Segment.lang` birleşimi zaten `"tr" | "de" | "en"` —
`en()` yardımcısı ve içerik yok, ama alan tipi bunu bekliyordu. `lang`
etiketi yalnız ekranı değil TTS sesini ve mikrofon dilini de seçiyor, o
yüzden İngilizce anlatımın `en` etiketli olması zorunlu, Türkçe metnin
yerine İngilizce yazmak yetmez.

Kaynak `data/app/words-*.json` (JSONL) ve `data/skills/`; tohumlama
`scripts/seed-*.ts`. Çeviriler **doğal** olmak zorunda: sözlük karşılığı değil,
o dilde nasıl söyleniyorsa öyle. Üretim parti parti ve her parti ölçülerek
yazılır (`data/meanings` hattının deseni).
