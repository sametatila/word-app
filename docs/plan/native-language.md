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
titleTr + summary  1.160   ← BİTTİ, bkz. aşağısı
vocab girdisi      4.640   ← havuzda karşılığı olan 4.621, ama bkz. aşağısı
patterns girdisi   1.292   ← %0,3 · kalıp cümleler havuzda yok, elle
roleplay (4 alan)  2.320   ← BİTTİ, bkz. aşağısı
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

`VocabItem` ve `PatternItem` tipleri bugün `{ de, tr }` — `en` alanı yok,
eklenmesi gerekiyor.

#### `lecture` çeviri işi değil: 1.654 parça ANA DİLE bağlı (ölçüldü 2026-09-10)

17.369 `tr()` parçasının çoğu Almanca hakkında konuşuyor — dil değişince
yalnız dili değişir. Ama bir bölümü öğrencinin ANA DİLİNE bağlı ve olduğu
gibi çevrilirse yanlış olur. `Türk*` taraması:

```
"Türkçesi '…' demek"        1.580 parça · 200 derste  ← sözlük istemi
"Türkçede …" dilbilgisi        63 parça ·  60 derste  ← karşılaştırma
"Türkçe konuşan için …"        11 parça               ← zorluk iddiası
Almanca metinde (Türkisch)     10 parça               ← KALIR, hedef dil
```

(`Türklingel` = Tür + Klingel, taramada elenmesi gereken yanlış eşleşme.)

**Birinci grup mekanik değil.** "Türkçesi 'merhaba' demek" cümlesinin
İngilizcesi "the English for it is 'hello'" — taşınan şey cümle değil,
İngilizce karşılığın kendisi. 1.580 kelimenin glossu yazılacak ve havuzdan
türetme burada da güvenilmez: ders bağlamındaki anlam havuzun birinci
sözlük anlamından farklı olabiliyor (yukarıdaki %84,6 sorununun aynısı).

**İkinci ve üçüncü grup çevrilemez, yeniden KURULMALI** — ve bazıları
İngilizcede tersine döner:

```
de-b1-sprache-akzent  "Türkçe ile Almanca akraba diller değil."
                      → İngilizce ile Almanca AKRABA. İddia tersine dönüyor,
                        çevrilirse ders yanlış şey öğretir.

de-a1-sport           "Türkçede 'haftada iki kez' deriz; Almancada sıra tam
                      tersi: önce kaç kez, sonra hafta."
                      → İngilizcede sıra Almancanınkiyle AYNI ("twice a
                        week"). Türk öğrenciye uyarı olan şey İngiliz
                        öğrenciye hiç sorun değil.

de-a1-aussehen        "Türkçedeki 'takmak'/'giymek' ayrımı Almancada yok."
                      → İngilizcede de yok (ikisi "wear"). Karşılaştırma
                        boşa düşer.

de-a1-weh-tun         "Ağrıyan yer özne oluyor, tıpkı Türkçedeki gibi."
                      → İngilizcede de öyle ("My head hurts") — bu sefer
                        iddia tutuyor, ama tutması tesadüf, çeviri değil.
```

##### Uygulamada iki ayrı işlem çıktı (l-019'da ilk örnekleri yazıldı)

Bu parçalar yazılmaya başlanınca hepsi tek kalıba girmedi; ikiye ayrıldı:

1. **Yanlış olan iddia DÜZELTİLİR.** `de-a1-weh-tun`'daki
   "Şimdi ilk yol, Türkçeyle aynı mantıkta:" satırı İngilizcede
   `Now the first way, on the same logic as English:` yazıldı. İddia
   İngilizcede de tutuyor ("My head hurts") — ama tutması tesadüf, o yüzden
   cümlenin İNGİLİZCEYE göre yeniden kurulması gerekti. Aynısını tutmayan
   satırlarda (takmak/giymek, haftada iki kez) iddia tümden düşecek; onlar
   henüz sıradaki paketlerde.
2. **Örnek AD olduğu gibi bırakılır.** "Soyadım Yılmaz." satırı
   `My surname is Yılmaz.` kaldı. Yanlış bir şey söylemiyor — öğrenci her
   yerden olabilir — ve değiştirmek çeviri değil içerik kararı olurdu.

Yani ölçüt şu: **cümle bir İDDİA taşıyorsa ve iddia İngilizce öğrenci için
yanlışsa çeviri yetmez**; taşımıyorsa (ad, şehir, örnek cevap) olduğu gibi
kalır ve toplu karara bırakılır. Türkçe tarafta da kişi adı örnekleri var,
tıpkı Almanca taraftaki gibi — aşağıdaki 16 parçalık listeyle aynı kararı
bekliyorlar.

Üçüncü bir durum l-026'da çıktı ve ölçütü keskinleştirdi. Plan
`de-b1-sprache-akzent`'i "tersine dönen olgu iddiası" diye işaretlemişti:
"Türkçe ile Almanca akraba diller değil." Ama bu cümle YANLIŞ DEĞİL —
Türkçe ile Almanca gerçekten akraba değil, öğrenci kim olursa olsun. Sorun
doğruluk değil İLGİ: İngilizce öğrenciye kendi dili hakkında bir şey
söylemiyor. Üstelik aynı derste Almanca hedef cümle de aynı iddiayı
taşıyor ve o alan "çevrilmez"; İngilizcesini tersine çevirseydim ders
kendi içinde çelişirdi.

O yüzden olduğu gibi çevrildi ve toplu karara bırakıldı. Ölçüt netleşti:

- iddia İngilizce öğrenci için **yanlışsa** → cümle yeniden kurulur;
- iddia **doğru ama ilgisizse** → çevrilir, karara bırakılır.

İlkini çeviri turu tek başına halledebilir, ikincisini edemez: ikisini
birden değiştirmek Almanca alanı da değiştirmeyi gerektiriyor.

#### Ana dile bağlılık ALMANCA metinde de var: 16 parça, 6 ders

Yukarıdaki tarama Türkçe `tr()` alanlarınaydı. Almanca `de()` ve
`opening` alanları da tarandı (Izmir, Istanbul, Ankara, Türkei, Türkisch…):

```
de-a1-hallo          "Ich komme aus der Türkei."  "Ich komme aus Istanbul."
de-a1-woher          "Ich wohne in Izmir."
de-a1-sprachen       "Ich spreche Türkisch und ein bisschen Deutsch."
de-a1-alter          "Ich bin in Izmir geboren."
de-b1-als-wenn       "Du bist also in Izmir aufgewachsen?"
de-b1-sprache-akzent "Türkisch und Deutsch sind nicht verwandt."
```

Bunlar hedef dil metni, yani "çevrilmez" kuralına giriyor — ama sorun çeviri
değil, İÇERİK. İki ayrı sınıf:

1. **Öğrencinin kendisi hakkında söyleyeceği örnek cevaplar** (15 parça).
   Yanlış değiller, bir öğrenci her yerden olabilir; ama Türk öğrenciye göre
   kurulmuşlar. İngilizce çiftte doğal karşılıkları "Ich komme aus England",
   "Ich spreche Englisch" olurdu.

2. **Tersine dönen olgu iddiası** (1 parça). `de-b1-sprache-akzent`:
   "Türkisch und Deutsch sind nicht verwandt." İngilizce için bu cümle
   YANLIŞ — İngilizce ile Almanca akraba. Aynı ders Türkçe `lecture`
   tarafında da aynı iddiayı taşıyor; ikisi birlikte değişmeli.

Yani bir çiftin içeriği üç katmanda ana dile bağlanabiliyor: Türkçe anlatım,
Türkçe sözlük istemi, ve Almanca örnek cümlenin kendisi. İlk ikisi çeviri
turunda görülüyor, üçüncüsü GÖRÜLMÜYOR — çünkü o alan "çevrilmez" diye
işaretli. Bu 16 parça ayrıca listelenip karara bağlanmalı.

#### Çeviri turu Türkçe tarafın kusurunu görüyor: yanlış dilbilgisi terimi

`l-008` yazılırken iki dize çıktı:

```
"En üstün derece edatla kurulur:"    [Die Karotten sind frischer als die Pilze.]
"En üstün derece edatlı biçimde:"    [Die Hütte ist ruhiger als das Hotel.]
```

İkisinin de örneği ÜSTÜNLÜK derecesi (`frischer als`, `ruhiger als`), yani
karşılaştırma. "En üstünlük" ise `am frischesten` olurdu ve derste geçmiyor.
Türkçede terim kaymış.

İngilizcede kayma yaşayamaz: `comparative` ile `superlative` ayrı sözcükler ve
öğrenci hangisini okuduğunu bilerek okuyor. O yüzden İngilizcesi örneğin
gösterdiği şeye göre yazıldı — `The comparative is built with a preposition:`.
Bu, çeviri turunun ikinci ürünü: Türkçe metnin kendi kusuru, ancak başka bir
dile geçerken görünür oluyor (aynı şey `yüz`/`son` çokanlamlılığında da oldu,
orada da Türkçe kaçabildiği için kusur gizliydi).

**Karar bekliyor:** Türkçe kaynak da düzeltilmeli mi? Düzeltilirse `lecture`
metni değişir ve bu dizelerin İngilizcesi zaten doğru kalır; düzeltilmezse
iki dil aynı derste farklı terim kullanır. Küçük ama içerik kararı.

#### `lecture` SAYILDI: 17.369 çağrı ama 8.824 dize (2026-09-10)

17.369 rakamı doğru — ama o `tr()` ÇAĞRISI sayısı, yazılacak DİZE sayısı
değil. Ayrıştırıldı:

```
tr() çağrısı        17.369
  düz dizeli        17.293   → BENZERSİZ 8.788 (%50,8)
  şablon (`${…}`)      76   → kod, aşağıya bak
```

Her iki parçadan biri tekrar, ve tekrarlar birkaç kalıpta toplanmış:
**287 dize tek başına 8.792 parçayı (%51) karşılıyor.**

```
2.116x "deyin."          347x "Tekrar edin:"      326x "Örnek:"
1.797x "Tekrar dene."    345x "cümlesi doğru mu?" 341x "Doğru mu yanlış mı:"
```

Hat bu yüzden paketleri SIKLIĞA GÖRE sıralıyor (`data/lessons/lecture/`,
59 paket × 150 dize): **ilk iki paket bütün anlatımın yarısını kapatıyor.**

#### Şablonlar ayrı bir iş ve çok daha küçük

38 dosya bir `word()` yardımcısı tanımlıyor ve 3.040 kez çağırıyor; her
çağrı 3 `tr()` parçası üretiyor → çalışma anında 9.120 parça daha.
Çevirisi 9.120 dize DEĞİL:

```
tr(`${n} kelimemiz:`)                     → 8 sıra sözcüğü (İlk … Son, her biri 380x)
tr(`Türkçesi '${w.tr}' demek…`)           → `w.en` alanı + şablonun İngilizcesi
tr("deyin.")                              → zaten düz dizelerde
```

Yani ~10 karar 9.120 parçayı kapatıyor. Ama `w.en` YOK: `VocabItem` tipine
eklenmesi ve yardımcının İngilizce dalının yazılması gerekiyor — kod fazı.

#### Aynı Türkçe dize iki İngilizce karşılık isteyebiliyor

Paketlere Almanca bağlam eklendikten sonra çıktı: 8.788 dizenin 63'ü birden
çok Almanca kelimeyle eşleşiyor, 33'ü sözlük istemi.

```
"Türkçesi 'yüz' demek"   → hundert   VE  das Gesicht
"Türkçesi 'son' demek"   → letzte    VE  das Ende
"Türkçesi 'açmak' demek" → öffnen, aufmachen  VE  anmachen
```

Türkçe kurtuluyor çünkü 'yüz' de çok anlamlı; İngilizcede 'a hundred' ile
'face' aynı sözcük değil. O 33 satır Almanca kelimeye göre bölündü
(33 → 69 satır) ve hattın anahtarı `(tr, de)` oldu. Bölünmeyenler
("deyin.", "Örnek:") yüzlerce kelimeyle eşleşiyor ama çevirileri bağlamdan
bağımsız.

**Toplam: 8.824 satır, 17.293 parçayı kapatıyor.**

#### Kapının bu alana özgü kuralı: SON NOKTALAMA

Parçalar arka arkaya SESLİ okunuyor ve aralarına Almanca kelimeler giriyor.
Son karakter cümlenin nerede bittiğini söylüyor:

```
«.»  %35,1  bitmiş cümle
«:»  %35,0  ARDINDAN Almanca kelime geliyor
yok  %21,2  cümle Almanca kelimenin İÇİNDEN devam ediyor
«?»   %8,6  soru
```

Üçüncüsü yapısal: Türkçe cümle Almanca kelimeyi SARIYOR —
`tr("… Lütfen") de("hallo") tr("deyin.")`. İngilizcede kelime sona gider
ama sarma korunabilir: **"Please say" + hallo + "after me."** Son noktalama
eşitliği bu yapıyı ayakta tutan tek ölçüt ve kapıya hata olarak yazıldı.

**Sonuç: `lecture` üç ayrı iş.**

```
(a) 15.715 parça  düz çeviri
(b)  1.580 parça  İngilizce gloss yazımı (kelime kelime karar)
(c)     74 parça  yeniden argüman kurma (iki dilin dilbilgisini kıyaslama)
```

(c) sayıca en küçük, birim başına en pahalı kalem: her biri Almanca–İngilizce
karşılaştırması gerektiriyor ve dördünden ikisi kaynaktakinin TERSİNİ
söyleyecek. Bu kalem bir çeviri turuna sığmaz, ayrı planlanmalı.

Aynı sorunun küçük bir örneği başlık katmanında zaten çıktı ve çözüldü:
`de-c1-falsche-freunde-idiome` başlığı "Türkçeyle tuzaklar" → **"Traps from
English"**. 580 başlıktan ana dili adıyla anan tek ders bu.

**patterns yarısı da BİTTİ (1.291/1.291).** Hat `data/lessons/patterns/`,
sözlükçenin kardeşi ama triyajsız: kalıbın havuzda karşılığı yok (%0,3),
hepsi elle.

Ve yazılan şey bir çeviri DEĞİL. `PatternItem.tr` kalıbın ne işe yaradığını
söylüyor, karşılığını değil — İngilizcesi de öyle. Bu, hattı yazarken
öğrenilen şey değil, ilk paketten belli olan şeydi ve bütün kararları
belirledi. En keskin örnekler:

```
wird geöffnet          → process: is being opened
ist geöffnet           → state: is open
Nicht schlecht!        → actually means: very good
Doch!                  → a positive answer to a negative question
die steigenden Preise  → Partizip I: rising
Er soll … sein.        → other people say so
Er will … haben.       → he himself claims so
```

Hepsinde İngilizce çeviri AYRIMI SİLİYOR: "is opened" süreçle durumu,
"not bad" alayı, "he is said to" kaynağı. Not bu yüzden yapının adını
taşıyor. Kapıya "aynı not iki kez" gibi bir kural KOYULMADI ve bu doğruydu:
ders aynı yapıyı farklı ünitelerde bilerek tekrar ediyor.

**vocab yarısı BİTTİ (4.640/4.640).** Hat `data/lessons/vocab/`:
`extract` → `triage` → elle `out/<paket>.json` → `check` (kapı + kapsam).
3.926'sı türetildi, 714'ü elle okundu, 0 hata.

Triyajın işe yarayıp yaramadığı sonradan ölçüldü — elle okunan 714 maddenin:

```
havuzun `en`i aynen alındı  437  (%61,2)  → yalnız Türkçe sözcük tercihi farkıymış
havuzun `en`i değiştirildi  258  (%36,1)  → gerçekten yanlış olurdu
havuzda İngilizcesi yok      19  ( %2,7)
```

Yani Türkçe ayrışması **kesin bir işaret değil, iyi bir eleme**: %36'sında
gerçekten yanlış karşılık verirdi, %61'inde gereksiz yere okundu. Ama
tersini yapmanın maliyeti çok daha yüksekti — 258 yanlış karşılık sessizce
yüklenirdi ve hiçbir kapı görmezdi. `data/meanings/contains.mjs` notundaki
ilkeyle aynı: yanlış ret yanlış kabulden ucuz.

**roleplay BİTTİ (580/580 ders · 2.320/2.320 dize · 0 hata, 0 uyarı).**
24 paket, `data/lessons/roleplay/`. Seviye dağılımı:

```
A1 100/100 ✓   A2 100/100 ✓   B1 180/180 ✓   B2 100/100 ✓   C1 100/100 ✓
```

Kapının iki alana özgü kuralı yazarken üç kez iş gördü:

- **`openingEn` ↔ `opening` noktalama denkliği.** 580 açılışın 548'i soru,
  32'si nokta ve nokta ile bitenler B1'den sonra yoğunlaşıyor — çünkü
  partner orada artık yalnız soru sormuyor, POZİSYON ALIYOR
  ("Also ich bleibe beim Auto — überzeug mich mal"). Kural iki kez
  yakaladı: bir kez ben dolaylı soru yazıp nokta koyduğumda, bir kez
  `?` düşürdüğümde.
- **Sayı denkliği.** 580 açılışın SIFIRINDA rakam var; sayı geçen her yerde
  harfle yazılmış ("Notruf eins eins zwei", "achtundvierzig Euro",
  "Fünfhundert Lektionen"). Bu ders tasarımı: açılış öğrencinin DUYACAĞI
  cümle ve sayıyı sesli okumak dersin parçası. Kuralın bu alandaki gerçek
  işlevi "değeri koru" değil, **"rakam sokma"**.
- **`partner` nokta ile bitmemeli** — öbek, cümle değil.

**Ana dile bağlı üç yer bulundu ve düzeltildi:**

```
de-c1-falsche-freunde-idiome  "bir TÜRKÇE deyimi anlat"  → "an English idiom"
de-c1-wortspiele              "TÜRKÇEDE karşılığı var mı" → "an equivalent in English"
(m-011 başlığı)               "Türkçeyle tuzaklar"        → "Traps from English"
```

Dördüncü bir yer VAR ama düzeltilmedi: `de-b1-als-wenn`in Almanca açılışı
"Du bist also in Izmir aufgewachsen?" diyor. `openingEn` bir ÇEVİRİ alanı
ve öğrencinin duyacağı cümleyi karşılamak zorunda; İzmir'i değiştirmek
çeviriyi duyulanla uyuşmaz hâle getirirdi. Bu, yukarıdaki "Almanca metinde
de ana dil bağı" kaleminin parçası ve içerik kararı olarak açık duruyor.

**Kaynakta üç `id`, içeriğiyle uyuşmuyor** (Almanca başlıklar uyuşuyor,
yani `id`'ler ilk taslaktan kalmış):

```
de-b2-weltraum    → Die bedrohte Vielfalt      (iklim)
de-b2-fotografie  → Der entscheidende Moment   (maç)
de-b2-kabarett    → Angeblich sehenswert       (tatil tavsiyesi)
```

Rol yapma alanları içeriğe göre yazıldı. `id` değiştirilirse mobil bundle
ve ilerleme kayıtları etkilenir — karar ayrı.

**roleplay SAYILDI: 1.160 değil 2.320 dize.** Bu belge kalemi
"scene + goal" diye yazmıştı; blok açılınca DÖRT Türkçe alan çıktı:

```
scene      580   ort. 150 karakter   öğrenciye verilen görev
partner    580   ort.  51            karşıdakinin kim olduğu — ÖBEK, cümle değil
openingTr  580   ort.  62            Almanca `opening`in çevirisi
goal       580   ort.  93            başarı koşulu
```

(`opening` Almanca, çevrilmez; `minTurns` sayı.) Dördü aynı pakette
duruyor çünkü birbirine bağlı: `goal` sahnede verilen görevin tamamlanmış
hâli, `openingTr` partnerin ağzından çıkan ilk cümle. Ayrı paketlense biri
ötekine bakmadan yazılırdı.

Hat `data/lessons/roleplay/` kuruldu (24 paket × 25 ders × 4 alan), r-001
yazıldı. Kapının iki kuralı bu alana özgü ve ikisi de negatif test edildi:

- **`openingEn` kaynakla noktalama ve SAYI denkliği.** Almanca "Wie heißen
  Sie?" soruysa İngilizcesi de sorudur; "Zimmer zwölf" sayıyı harfle
  yazıyorsa çeviri de yazar. r-001'de 25 açılışın 25'i soru.
- **`partner` nokta ile bitmemeli** — öbek olmalı, cümle değil. meta
  hattındaki başlık/özet ayrımının aynısı.

Bir de İngilizcenin taşıyamadığı bir ayrım çıktı: açılışların bir kısmı
`Sie`, bir kısmı `du` kullanıyor, İngilizce "you" ikisini de karşılıyor.
`de-a1-du-oder-sie` dersinin KONUSU tam olarak bu ayrım, o yüzden görev
metnine Almancası yazıldı: "Use the polite form (Sie) throughout". C1'deki
"The art of switching to du" ile aynı karar.

**başlık ve özet BİTTİ (580/580 ders · 1.160 dize).** Hat
`data/lessons/meta/`: `make` → elle `out/m-NNN.json` → `check`
(kapı + kapsam). 12 paket, 0 hata, 0 uyarı.

Bu kalemin kendi kuralı çıktı ve kapıya üç kural olarak yazıldı:

1. **Alan ne taşıyorsa İngilizcesi de onu taşır.** Almanca `title` dersin
   kendi cümlesidir ("Hallo!"), Türkçe `titleTr` ise konunun adıdır
   ("Tanışma"). İngilizcesi de konunun adı — kapı "başlık Almancanın aynısı"
   olduğunda uyarıyor.

2. **Terim çevrilir, öğretilen sözcük çevrilmez.** 580 başlığın 17'si Almanca
   bir sözcük taşıyor. Ölçüt: hedef dilin o şey için KENDİ adı var mı?

   ```
   Dativ / Akkusativ / Perfekt   → dative / accusative / the perfect   (çevrildi)
   Partizip I / II               → present / past participle           (çevrildi)
   weil · denn · wenn · damit    → weil · denn · wenn · damit          (kalır)
   als · nachdem · obwohl        → als · nachdem · obwohl              (kalır)
   doch · ja · mal · eben · wohl → doch · ja · mal · eben · wohl       (kalır)
   ```

   İkinci grup dersin ÖĞRETTİĞİ sözcük: "Sebep: weil" ile "Sebep: denn" ayrı
   iki ders ve ikisi de "because" olsaydı başlıkları aynı çıkardı. C1'in
   `doch` dersi bunun uç hâli — `doch`un İngilizcede tek karşılığı yok,
   dersin varlık sebebi de bu.

   Partizip'te Türkçe Almancayı koruyor, İngilizce korumuyor; tutarsızlık
   değil, aynı ölçütün sonucu: Türkçenin kendi adı yok, İngilizcenin var.

3. **Aynı İngilizce başlık, Türkçeleri farklıysa kusurdur.** Kaynakta 7
   Türkçe başlık 14 derste tekrar ediyor (Kuaförde A2'de ve B1'de) — orada
   tekrar bilgidir ve İngilizcesi de tekrar etmeli. Kural ilk çalıştırmada
   gerçek bir düzleştirme yakaladı:

   ```
   de-a1-restaurant   Im Restaurant · Restoranda → At the restaurant
   de-b1-im-gasthaus  Im Gasthaus   · Lokantada  → At the restaurant  ✗
                                                 → At the inn         ✓
   ```

   Almanca ayırıyordu, Türkçe ayırıyordu, İngilizce ayırmıyordu.

Bir de yazım birliği kuralı çıktı ve ÜÇ hatta birden bağlandı
(`data/lessons/spelling.mjs`): 2.305 yazılmış satır tarandığında hat zaten
İngiliz İngilizcesi yazıyordu (-our 25 / -or 0, flat 6 / apartment 0) ama
kural yazılı değildi, alışkanlıktı. İki sapma çoğunluğa uyduruldu.

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
