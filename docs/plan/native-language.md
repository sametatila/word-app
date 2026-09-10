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
| **en → de** | ✅ 8707/8707 karşılık + örnek (ÜRETİMDE) | ✅ AÇIK | ✅ AÇIK |
| **en → gsw** | ⚠️ karşılık ✅, örnek çevirisi 0/8266 | ❌ | ❌ |
| **de → en** | ❌ Almanca karşılık sütunu yok | ❌ | ❌ |

**en→de 2026-09-10'da AÇILDI** — `PAIR_READY.en = ["de"]`, hem web'de hem
mobilde. Üç katmanın üçü de doğrulandı; kelime katmanı için üretim OKUNDU
(`de` kursu: 8.707/8.707 İngilizce karşılık, 8.707/8.707 İngilizce örnek
çevirisi). Beklenen `db:seed` bu parite için geçersizmiş.

gsw-zh beyana GİRMEDİ: lehçe örnek çevirileri yerelde yazıldı ama üretimde
`beispiel_en` 0/8.267 — karşılık var, örnek yok.

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

Dördüncü durum l-048'de çıktı ve yönü ilk kez ters: şimdiye kadarki
tersine çevirmelerin hepsi bir KARŞITLIĞI eritiyordu (Türkçe şöyle,
Almanca böyle → İngilizce de Almanca gibi, karşıtlık kalmıyor). Bu
satırda ise Türkçe ile Almanca gerçekten aynı, ayrık olan İngilizce:

> "Fiil şimdiki zamanda kalıyor, çünkü durum hâlâ sürüyor. Türkçede
> 'oturuyorum' deriz, aynı mantık." — [Ich wohne seit … hier]

Türkçe "oturuyorum" der, Almanca `Ich wohne` der; İngilizce ise
`I have lived here since …` der ve şimdiki zamanı kullanamaz. Yani
BENZERLİK iddiası İngilizce öğrenci için farka dönüşüyor. Ölçüt aynı
kalıyor — iddia yanlışsa cümle yeniden kurulur — ama düzeltmenin yönü
tersine dönüyor: karşıtlığı silmek değil, olmayan bir karşıtlığı
EKLEMEK gerekiyor. Yazılan karşılık farkı açıkça söylüyor, çünkü
öğrenci kendi dilinin alışkanlığını Almancaya taşırsa tam burada
hata yapar.

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

##### YENİDEN SAYILDI (2026-09-10): 16 değil 29 parça, 6 ders

İlk tarama yalnız `say` ve `opening` alanlarına bakmıştı. `target`, `hint`,
`why`, `vocab.de` ve rol yapma SENARYOSU eklenince sayı iki katına çıktı —
senaryo hattının kendisi de zaten aynı sebeple geç bulunmuştu (kaynak
konumsal kısayollarla yazılmış, alan adı yok):

```
de-a1-alter           3   "Ich bin in Izmir geboren"
de-a1-hallo           7   "Ich komme aus der Türkei" · "… aus Istanbul" · "… aus Ankara"
de-a1-sprachen       12   "Türkisch" (say/target/vocab) · "Ich spreche Türkisch und
                          ein bisschen Deutsch" · senaryonun beş repliği
de-a1-woher           2   "Ich komme aus der Türkei." · "Ich wohne in Izmir."
de-b1-als-wenn        3   "Als ich ein Kind war, wohnten wir in Izmir" + rol yapma açılışı
de-b1-sprache-akzent  2   "Türkisch und Deutsch sind nicht verwandt"
```

`de-a2-paket`'in "die Türklingel"i taramaya takılıyor ama yanlış pozitif:
kapı zili, Türkiye değil.

##### AYIRT EDİCİ ÖLÇÜT: kişi olgusu mu, öğrencinin kendi cevabı mı

Tarama sınav hattında da isabet veriyor — "Nuray Aydın, İzmir doğumlu",
"İzmir'de işletme okudum", "Türkiyeliyim. Şimdi Köln'de oturuyorum."
Bunlar **DEĞİŞMEYECEK** ve sebebi ölçütü tanımlıyor:

- **Kişi olgusu.** Diyalogdaki biri Türkiyeli. Almanya'da bu gerçekçi bir
  kişi ve öğrenciden o cümleyi kurması istenmiyor — okuduğu metinde
  geçiyor, o kadar. Kalır.
- **Öğrencinin kendi örnek cevabı.** "Woher kommst du?" sorusuna model
  cevap olarak "Ich komme aus der Türkei". Burada öğrenciye kendisi için
  YANLIŞ olan bir cümle öğretiliyor. Ana dile bağlı.

İkisi aynı kelimeleri taşıyor ama biri içerik, öteki varsayım. Tarama
ayıramaz; ayıran şey cümlenin dersteki ROLÜ.

##### Kurulacak katman: `de` takası, çözümden SONRA

Mekanizma çözücüde zaten var — `vocab` gibi `(ders, Almanca)` anahtarlı
bir sözlük yeter: `swap[ders + AYRAÇ + de] = yeni Almanca`.

**SIRA KRİTİK.** Anlatım sözlüğünün bölünmüş anahtarları adımda ÖNCE gelen
Almanca parçaya bakıyor (`lectureSplit`). Almancayı önce takas edersek
anahtar değişir ve 69 satırın karşılığı sessizce bulunamaz. Doğru sıra:

```
1. Türkçe → İngilizce çöz   (özgün Almancayla, anahtarlar tutar)
2. Almancayı takas et       (artık kimse o dizeyi anahtar olarak kullanmıyor)
```

**İngilizce taraf da takas ister.** Yazılmış İngilizce satırların on beşi
Almanca örneği ALINTILIYOR: "Example: 'I come from Turkey.' In German:",
"It means 'Turkish'. Please say", "Last: 'Turkish and German are not
related languages.'" Almanca değişince bunların da değişmesi gerekiyor —
yani takas iki taraflı ve `lecture/out/` dosyalarına dokunuyor.

**Bir parça takas değil DÜZELTME istiyor.** `de-b1-sprache-akzent`'in
"Türkisch und Deutsch sind nicht verwandt" cümlesi İngilizce öğrenci için
YANLIŞ — İngilizce ile Almanca akraba diller. Burada yapılacak şey başka
bir ülke adı koymak değil, dersin dayandığı olguyu ana dile göre kurmak.
Dördüncü L1 vakasının (güvence uyarıya dönüyor) Almanca taraftaki eşi.

##### KURULDU (2026-09-10): `data/lessons/swap/` — 6 ders, 25 Almanca + 17 İngilizce

Hat değil KARAR TABLOSU: `en.json` elle yazılıyor, her satırın gerekçesi
yanında duruyor. Çözücü `swap[(ders, özgün Almanca)]` ve
`swapEn[(ders, özgün İngilizce)]` sözlüklerinden okuyor.

**Sıra kodda yazılı ve kritik.** `prevTarget` ÖZGÜN Almancayı taşıyor;
bölünmüş anlatım anahtarları ve şablonun kelime araması ona bakıyor.
Takas edilmiş dizeyi anahtar yapsaydık 69 satırın karşılığı sessizce
bulunamazdı. Ekrana giden metin takas edilmiş, anahtar özgün.

**Tanıma HEDEFİ de takas ediliyor.** Ekranda yeni cümle duruyorsa öğrenci
onu söyleyecek; hedef eski kalsaydı konuşma her seferinde yanlış sayılırdı.

**Takas ATOMİK PARÇAYA uygulanıyor, bitmiş satıra değil.** Şablonun
kurduğu "It means 'Turkish'. Please say" satırı hiçbir dosyada durmuyor —
üç parçadan çalışma anında kuruluyor. Bitmiş satıra uygulanan bir takas
onu hiç yakalayamazdı.

###### Senaryoda BİRİM REPLİK, kelime değil

İlk denemede senaryo "1:1 takasla düzelmiyor, başka bir senaryo gerekiyor"
diye uyarıya bağlanmıştı. Teşhis yanlıştı: düzelmeyen takasın kendisi
değil BİRİMİYDİ.

`Türkisch` → `Englisch` tek tek yapılınca konuşma kendini yiyordu —
muhatap zaten "ich spreche Spanisch und Englisch" diyor ve arkasından
"Sprichst du auch Englisch?" diye soruyor; İngilizce konuşana sorulacak
en anlamsız soru. **Replikler birbirini kısıtlıyor**, o yüzden birim
replik oldu: karşı taraf artık İspanyolcayı soruyor, öğrenci İngilizceyi
geri soruyor, kapanışta "Danke"nin İngilizcesi isteniyor.

Kural: **takasın birimi, anlamı taşıyan birimdir.** Anlatım satırında
cümle, diyalogda replik.

###### AYNI DİZE, İKİ DERSTE FARKLI KARAR

"Ich komme aus der Türkei." iki yerde geçiyor ve ikisinde farklı şey:

| ders | rol | karar |
|---|---|---|
| `de-a1-hallo` | artikelli ülke kalıbını ÖĞRETEN örnek ("Örnek:" diye sunuluyor) | kalıyor |
| `de-a1-du-oder-sie` | rol yapmanın yedek örnek cevabı — öğrenciye atfediliyor | takas |

Takas anahtarının derse bağlı olmasının sebebi tam olarak bu.

###### KAPI ARTIK REPOYU TARIYOR (`npm run check:lessons-swap`)

İki ayrı ölçüm yapıyor:

1. **Tablo kaynakla TUTUYOR MU** — her `from` dizesi kaynakta gerçekten
   duruyor mu? Bir ders düzenlenip dize kayarsa takas sessizce hiçbir şey
   yapmaz ve öğrenci yine "Ich komme aus der Türkei" der. İki sözlükle
   ölçülüyor: takassız kopya `from`u görebilsin, takaslı kopya iz kalıp
   kalmadığını göstersin diye.
2. **Tablo EKSİK Mİ** — bütün Almanca dersler çözülüp takas uygulandıktan
   sonra kalan her iz hata. Bilinen iki istisna gerekçesiyle yazılı
   (`de-a1-hallo`'nun artikel örneği, `de-b1-entweder-oder`'in üçüncü
   şahıs cümlesi). Yeni bir iz çıkarsa listede olmadığı için durduruyor.

İkincisi bu eksenin **"bitti dendikten sonra bulundu" alışkanlığını**
kapatan parça — `report:native` envanteri sayıyordu, bu da içeriği.

###### Tarama üç KÖR NOKTA gösterdi, üçü de aynı aileden

Alan adına bakan arama yetmiyor:

- **`fallback.example`** — rol yapmanın yedek örnek cevabı. İki ders daha
  buradan çıktı (`de-a1-woher`, `de-a1-alter`).
- **`roleplay.openingTr`** — açılış repliğinin ana dildeki karşılığı.
  Almancası "Du bist also in Manchester aufgewachsen?" olup altındaki
  İngilizce "So you grew up in Izmir?" kalıyordu; ikisi birbirini
  yalanlıyordu. Bu bir BUG'dı, tarama bulmasa görünmezdi.
- **Almanca cümlenin TÜRKÇE PARÇANIN İÇİNE GÖMÜLÜ olması** —
  "'Sie spricht sowohl Deutsch als auch Türkisch.' Üçüncüsü:" satırı
  `lang: "tr"` taşıyor, yani Almanca alanları tarayan hiçbir arama onu
  göremiyor.

Ayrıca `Türk` tek başına ölçüt olamıyor: Almancada `Tür` kapı demek ve
`die Türklingel` (kapı zili) taramaya takılıyordu. `Türk(?=[ei])` ayırıyor.

#### ÜRETİMDE ÖZELLİK SESSİZCE KAPALIYDI (bulundu 2026-09-10)

Takas katmanı bitince dağıtım zinciri baştan sona doğrulandı ve zincirin
ortası kopuk çıktı.

Sözlükçenin **4.640 maddesinin 3.926'sı** `data/lessons/vocab/derived.json`
dosyasında ve o dosya **`.gitignore`'un 39. satırında**. Sunucudaki build
onu bulamıyor:

```
sözlükçe 4640 → 714
çözülen  26375 → 23977      (2.311 dize açıkta)
```

Çözücü hep-ya-hiç çalıştığı için o dizelerin geçtiği dersleri TÜMDEN
reddediyor, `localiseLesson` da Türkçeye düşüyor. Yani **İngilizce kurs
üretimde hiç açılmıyordu.**

##### Hatayı gizleyen şey, hatayı önlemek için konmuş tasarımdı

`native-server.ts` sözlüğü bulamazsa özelliği sessizce kapatıyor. Bu
BİLEREK konmuştu ve gerekçesi de yazılıydı: "eksik sözlük yüzünden ders
sayfasının açılmaması, çeviriden çok daha kötü." Doğru bir karar — ama
tam olarak bu karar, eksik sözlüğü görünmez yaptı. Hiçbir yerde hata
yoktu; İngilizce kurs yalnızca Türkçe olarak açılıyordu.

Ders şu: **"eksikse kendini kapat" bir çalışma-anı politikası olabilir,
ama build-anı politikası olamaz.** Çalışma anında düşmek kullanıcıyı
korur; build anında sessizce eksik üretmek yalnızca hatayı saklar.

##### Üç katmanlı düzeltme

1. **Dosya commit'lenmedi, ÜRETİLİYOR.** `triage.mjs` onu
   `data/app/words.json`tan (depoda, 3,1 MB) deterministik kuruyor.
   Türetilebilen bir dosyayı commit'lemek iki kopyayı ayrışmaya bırakırdı
   — `seed-db-snapshot-sync` ile aynı gerekçe. `lessons:apply` artık önce
   triage'ı çalıştırıyor; `deploy.sh` `npm run build` dediği için zincir
   sunucuya kadar kapanıyor.
2. **`apply.mjs` artık PATLIYOR.** `existsSync` ile atlamak sessiz
   bozulmanın kaynağıydı: eksik girdiyle yarım sözlük üretmek, hiç
   üretmemekten kötü.
3. **CI'ya iki kapı eklendi.** Depoda hiçbir `check:lessons-*`
   çalışmıyordu ve `npx next build` `lessons:apply`i atladığı için sözlük
   CI'da hiç kurulmuyordu. Bir ders düzenlemesi tek bir dizeyi
   kaydırdığında aynı sessiz düşüş tekrar olurdu.

##### Etkilenen kullanıcı: SIFIR (ölçüldü, varsayılmadı)

```
native_lang   kullanıcı
(null)        10
tr             2
en             0
```

Hata GİZİLDİ — kimseye dokunmadı çünkü henüz İngilizce ana dilli kullanıcı
yok. Bu onu önemsiz yapmıyor, tersine: **ilk İngilizce kullanıcıya
çarpacaktı** ve o kullanıcı "çeviri yok" diye değil "uygulama Türkçe"
diye bildirirdi.

Aynı sınıf başka yerde var mı diye tarandı: `src/` altında tek bir
üretilen artefakt dinamik olarak yükleniyor (`native-en.json`) ve
`existsSync`le sessizce atlanan başka bir girdi yok.

**`PAIR_READY` en→de için hâlâ açılmıyor.** Düzeltme yerelde duruyor;
üretime gitmesi push'a bağlı (Samet) ve ayrıca üretim veritabanına
tohumlama kararı bekliyor.

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

##### ÇÖZÜCÜ KURULDU (2026-09-10): yazılan İngilizce ilk kez çalışıyor

Beş hattın `out/`u elle yazılmıştı ama HİÇBİRİ uygulamaya girmiyordu —
`data/lessons/` altında duran, kimsenin okumadığı dosyalardı. Zincir
artık kapalı:

```
out/*.json  →  apply.mjs  →  generated/native-en.json  →  native.ts  →  ders sayfası
```

Üç karar, üçü de gerçek bir tuzaktan çıktı:

1. **Anahtar `make.mjs` ile birebir aynı.** Anlatım hattı 32 dizeyi
   Almanca kelimeye göre bölüyor; çözücü bölmeyi aynen yapmasa 66
   satırın yarısı sessizce yanlış kelimeyi söylerdi. Ayraç U+0000 —
   Türkçe metin boşluk da noktalama da taşıyor.
2. **Şablon `out/`ta YOK.** `word()` metni çalışma anında kuruyor, yani
   ekrana çıkan dize hiçbir dosyada durmuyor. Çözücü onu çerçeve
   desenleriyle tanıyıp üç parçadan yeniden kuruyor. Sıra önemli: önce
   düz sözlüğe bakılıyor, çünkü içerik dosyalarında elle yazılmış aynı
   biçimli dizeler de var.
3. **Yarım ders yok.** Bir parça bile çözülemezse ders TÜMDEN
   reddediliyor. Aynı ölçüt sayfada da geçerli: ders İngilizceye
   çevrildiyse can-do köprüsü düşüyor, çünkü `Cando` tipinde İngilizce
   alan yok.

Kapı (`npm run check:lessons-native`) hatların kendi kapılarının
göremediğini görüyor: onlar ÇIKARIM üzerinden çalışıyor (`make.mjs`
düzenli ifadeyle tarıyor), bu GERÇEK ders nesnelerini geziyor.
**580 ders · 26.375 Türkçe parça · 26.375 çözüldü.** Aradaki 9.082
parça şablonun ürettiği metin.

###### Çözücü iki yeni kalem gösterdi

Ekrana bakınca hatların kaçırdığı iki küme göründü:

- **Rol yapma senaryosu: 244 dize — BİTTİ.** `roleplay` hattı dört alanı
  kapsıyordu (sahne, muhatap, açılış, amaç — 580×4) ve bitmiş
  görünüyordu; ama on dersin çevrimdışı senaryosu ayrı bir dosyada
  (`scripts-a1.ts`) ve içinde `askTr` (60), `cue` (61), `sayTr` (123)
  duruyor. Kardeş hatların taraması KÖRDÜ ve sebebi ilginç: senaryolar
  iki kısayolla yazılmış — `t(id, ask, askTr, cue, …)` ve
  `r(match, say, sayTr, …)` — yani Türkçe alanların ADI yok, SIRASI var.
  Kalem önemsiz değil: senaryolu rol yapma modelin çalışmadığı anda
  devreye giren akış, yani tam da ağın olmadığı yerde görünen metin.
- **Can-do ifadeleri: 131 dize — BİTTİ.** `Cando` tipinde yalnız `tr`
  var; İngilizcesi kendi hattında (`data/lessons/cando/`, anahtar
  `A1.SPK.1`). Kaynak dosyaya dokunulmadı: 131 çağrının hepsine yedinci
  bir konumsal argüman eklemek okunaksız olurdu. Kapıya iki kural —
  BİRİNCİ TEKİL korunuyor ("I can …"; "The learner can…" ekranın sesini
  değiştirirdi) ve iki ifade tek karşılığa düşemez.

İkisi de kapıdan sıfır hata sıfır uyarıyla geçiyor ve çözücüye bağlı.
Ders sayfasında can-do köprüsü artık düşürülmüyor, İngilizcesi
gösteriliyor.

###### Envanter artık SAYILIYOR (`npm run report:native`)

Üç kalem de aynı biçimde bulundu: bir şey bitmiş sayıldı, sonra ekrana
bakınca hâlâ Türkçe duran bir yer görüldü. Bunu bitirmek için rapor
yazıldı — kaynakları geziyor, her kalemde kaç benzersiz Türkçe dize
olduğunu ve o kalemin bir çeviri hattı olup olmadığını söylüyor:

```
kalem               benzersiz  kapsanan  hat
ders anlatımı       11620      11620     lecture + word
can-do ifadeleri    131        131       cando
modül sınavı        2070       2070      exam          ← 2026-09-10'te kapandı

kalan: 0 benzersiz dize
```

Anlatım satırı ÇÖZÜCÜYLE sayılıyor, düz eşleşmeyle değil: şablonun
ürettiği 2.865 dize hiçbir `out/` dosyasında durmuyor ve düz eşleşme
sayılsaydı bitmiş bir kalem eksik görünürdü. Sınav satırı iki kaynağı
birden sayıyor (`exam` hattı + kaynakta zaten dolu olan `en` alanları).

#### Kalan tek kalem: MODÜL SINAVI (1.781 dize)

58 kâğıt, on üç ayrı alan. Büyükten küçüğe:

```
listening.turns.tr   408   dinleme diyaloğunun replik çevirileri
canDo.tr             289   geçince açılan yapabilirlik satırları  → EN VAR
focus.tr             263   ölçülen yapının ne işe yaradığı
writing.checklist    245   yazma görevinin denetim listesi
listening.q.tr       174   dinleme sorularının Türkçesi
reading.q.tr         136   okuma sorularının Türkçesi
speaking.situation   116   konuşma maddesinin durumu
speaking.tr          115   söylenecek cümlenin Türkçesi
plan.titleTr          58 · listening.situation 58 · reading.titleTr 58
writing.prompt        58 · listening.titleTr   57 · reading.genre    37
```

**`ExamCando.en` ZATEN VAR ve dolu** — 290'ın 290'ı. Kâğıtları yazan
taraf İngilizceyi baştan düşünmüş ve tipin içine koymuş; kalemin
tamamı sıfırdan yazılmayacak. Kalan 1.781 dize on iki alanda.

Kalemin kendine özgü bir zorluğu var: **soru kökünün Türkçesi cevabı
vermemeli.** `ExamQuestion.tr` Almanca kökün karşılığı ve şıklar Almanca
kalıyor; çeviri şıkkı ele verirse soru ölçmeyi bırakır.

##### BİTTİ (2026-09-10): 1.781/1.781 dize, on iki paket, kapı temiz

Kapı bu alan için üç kural taşıyor: son noktalama pariteleri, sayı
pariteleri ve **şık sızıntısı** — İngilizce soru kökü Almanca şıklardan
birini iki kelimeden uzun biçimde içeriyorsa hata. Üçü de sıfır.

Hat yazılırken üç karar çıktı ve üçü de kâğıdın Almanca yarısıyla Türkçe
yarısı arasındaki hiyerarşiyi gösteriyor:

1. **Özel adlar ALMANCA kâğıdı izliyor.** "Bay Yalçın" → "Mr Yalcin",
   "Bayan Aydın" → "Ms Aydin", "Ayşe" → "Ayse". Türkçe soru kökü adı
   Türkçe yazımıyla yazmış ama öğrencinin önündeki dinleme metni Almanca
   ve orada "Herr Yalcin" duruyor. Soru "Yalçın" deseydi öğrenci
   ölçülmeyen bir eşleştirme yapmak zorunda kalırdı.

2. **Sayı biçimi TÜRKÇEYİ izliyor.** Kaynak Almanca "am fünfzehnten Mai"
   yazsa da Türkçe "15 Mayıs'ta" yazmışsa İngilizce de "15 May" oluyor;
   Türkçe "on iki numaradan" yazmışsa Almanca "Wohnung zwölf" olsa bile
   İngilizce "flat twelve" kalıyor. Rakamla yazılmış sayı öğrencinin
   gözünde harfle yazılmış olandan farklı bir şey ve kâğıdı yazan taraf
   bu ayrımı Türkçede bilerek yapmış. Telefon, peron ve oda numarası
   ("0157 88 44 21", "15:10'da, 8. perondan", "214 numara") bu yüzden
   olduğu gibi duruyor: miktar değil kimlik, ve dinleme sorusunun ölçtüğü
   şey tam da öğrencinin onları doğru yakalayıp yakalamadığı.

3. **`canDo` ve `writing.phrases` hattın DIŞINDA.** İkisinin de `en`
   alanı kaynakta zaten dolu (290/290 ve 290/290). Aynı şey için ikinci
   bir doğruluk kaynağı açmak, ayrıştıkları gün hangisinin doğru olduğunu
   bilinemez hâle getirirdi.

##### BEŞİNCİ L1 VAKASI: karşıtlık Türkçede eriyor, İngilizcede duruyor

Dördü daha önce yazılmıştı ve hepsinde Türkçe kaynak İngilizceden fazlasını
söyleyebiliyordu. Beşincisi ters yönde ve C1.7'de çıktı.

Ines öne konmuş niteleyiciyi açıyor. Almancası **iki ayrı yapı** söylüyor:

```
öne konmuş ortaç   die dem Antrag beizufügenden Unterlagen
açılmış hâli       die Unterlagen, die dem Antrag beigefügt werden müssen
```

Türkçe ikisini de "başvuruya eklenmesi gereken belgeler" diye çeviriyor —
çünkü Türkçede ikisi AYNI yapı. Satır kendini tekrar ediyor gibi duruyor
ve öğretmesi gereken farkı gösteremiyor. İngilizcede fark duruyor:
"the documents to be attached" ile "the documents that have to be
attached" iki ayrı yapı.

Bu yüzden İngilizce satır Türkçeyi kelimesi kelimesine izlemedi, dersin
ÖĞRETTİĞİ karşıtlığı izledi. Kural: **çeviri kaynağın kusurunu miras
almaz** — kaynak dilin yapamadığı bir ayrımı hedef dil yapabiliyorsa,
ders o ayrımı öğretiyorsa, hedef dil onu yapar.

##### ÇÖZÜCÜYE BAĞLANDI: `resolveExam` (2026-09-10)

Yazılan 1.781 dize hiçbir yere gitmiyordu — `lecture`de olduğu gibi.
Zincir: `apply.mjs` → `exam` sözlüğü → `resolveExam` → `localiseExam`.

**Çevrilen yalnız orta sütun.** Kâğıt üç dilli ve üçünün rolü ayrı:
Almanca ölçülen dil, Türkçe/İngilizce öğrencinin dili, şıklar Almanca.
`titleDe`, replik `de`si, soru kökünün `de`si, şıklar, okuma metni ve
örnek cevap olduğu gibi kalıyor — onları çevirmek sınavı ortadan
kaldırırdı.

Dört çağrı yeri çıktı ve **üçü görünmezdi**:

| yer | neden görünmedi |
|---|---|
| `buildExam` | — modül kâğıdının kendisi, tek açık olan |
| seviye sınavının konuşma havuzu | maddeleri modül kâğıtlarından geliyor ve orada `plan` boş; tek kâğıtlık çeviri oraya hiç ulaşmıyordu |
| sertifika SVG'si | `titleTr` ve yapabilirlik satırları; `examCando` ayrı bir çağrıydı ve çevrilmemiş ikinci kopya döndürüyordu |
| modül listeleri | uç (`/api/exam?level=`) ve Patika ekranı |

**Liste satırlarında hep-ya-hiç YOK, bilerek.** `resolveExam` bir alan
bile eksikse kâğıdı reddediyor: yarım bir sınav kâğıdı, öğrencinin
okuduğu yönergeye güvenemediği bir kâğıt. Liste satırı öyle değil —
kimliği ALMANCA başlık ve o yanında zaten duruyor. Karşılığı olmayan bir
alt başlık leke, satırı düşürmek ise o modülün sınavını gizler.
##### BİTTİ (2026-09-10): 8.824/8.824 dize, 17.293/17.293 parça (%100)

Elli dokuz paketin hepsi yazıldı ve kapı sıfır hata, sıfır uyarıyla
geçiyor. Kapının yakaladığı gerçek kusurlar hep aynı üç yerdeydi ve
hiçbiri anlam hatası değildi:

- **son noktalama uyuşmazlığı** — iç içe soru cümlelerinde ve alıntının
  cümle sonunda kaldığı satırlarda. Sınıfı belirleyen şey CÜMLENİN nerede
  bittiği, alıntının değil.
- **satır sayısı** — bir paket 149 ya da 148 satır geldi; eksik satır
  daima noktalama sınıfı komşularıyla aynı olan bir yerdeydi, o yüzden
  yalnız sayım yakaladı.
- **aynı karşılık** — iki ayrı Türkçe istemin tek İngilizce karşılığa
  düşmesi; bu kural bu iş için eklendi ve on beşe yakın gerçek çakışma
  buldu.

Asıl iş çeviri değildi. Planın başında ölçülen **1.654 ana dile bağlı
parça** satır satır karara bağlandı ve dört ayrı işleme ayrıldı:

1. **Karşıtlık eriyor** — kaynak Türkçe ile Almancayı karşı karşıya
   koyuyor ama İngilizce Almanca gibi davranıyor. En kalabalık grup:
   soru kelimesinin başta olması, `there is`'in iki kelimesi, tarihte
   sıra sayısı, düzensiz geçmiş, `twice a week`, `to wear`.
2. **Karşıtlık duruyor, dilin adı değişiyor** — `either … or`,
   `although`, `that suits you`, emir kipinin yalın hâli.
3. **İngilizce ayrık kalıyor** — Türkçe ile Almanca aynı, İngilizce
   değil: `Ich wohne seit …`, meslek adında artikel, `Verspätung`,
   `sen/siz` ayrımı. Burada karşılık olmayan bir karşıtlığı EKLİYOR.
4. **Rahatlatma uyarıya dönüyor** — kaynak 'bu sıra sana yabancı
   gelmeyecek' diyor ama İngilizce öğrenci için tam tersi. `gefallen`,
   `helfen`, kip fiilinden sonra asıl fiilin yeri, sayıdan sonra çoğul.
   Bu grup en tehlikelisiydi: çevrilse öğrenciyi yanlış tarafa
   hazırlardı.

Ölçüt derse değil SATIRA uygulandı: aynı A1 dersinin içinde birinci ve
dördüncü durumdan satırlar yan yana çıktı.

#### Şablonlar ayrı bir iş ve çok daha küçük

38 dosya bir `word()` yardımcısı tanımlıyor ve 3.040 kez çağırıyor; her
çağrı 3 `tr()` parçası üretiyor → çalışma anında 9.120 parça daha.
Çevirisi 9.120 dize DEĞİL:

```
tr(`${n} kelimemiz:`)                     → 8 sıra sözcüğü (İlk … Son, her biri 380x)
tr(`Türkçesi '${w.tr}' demek…`)           → `w.en` alanı + şablonun İngilizcesi
tr("deyin.")                              → zaten düz dizelerde
```

Yani ~10 karar 9.120 parçayı kapatıyor.

##### ÖLÇÜLDÜ ve BİTTİ (2026-09-10): 193 dize, kod fazı gerekmedi

Tahmin iki yerde şaştı ve ikisi de lehte çıktı:

1. **`w.en` zaten hazır.** Plan onu eksik sayıyordu ama sözlükçe hattı
   (`data/lessons/vocab/`) 4.640 maddenin hepsini `{lesson, de, en}` diye
   yazmış. 3.040 `word()` çağrısının 3.040'ı bu kümede — **eksik sıfır.**
   `VocabItem` tipine alan eklemeye de gerek yok: çağrılar `vocab`
   dizisine referans vermiyor, `{ de, tr }` sözlüğünü yerinde yazıyor,
   yani anahtar `(lesson, de)` çağrı yerinde zaten duruyor.

2. **Ama NOT diye üçüncü bir argüman var ve hiç sayılmamıştı.** 193 çağrı
   üçüncü argümanla geliyor, 183'ü benzersiz. Şablonun içine gömülü
   oldukları için `lecture/make.mjs`'in düz dize taraması onları hiç
   görmedi ve anlatım `out/`'unda tek biri bile yok. 15–64 karakterlik
   gerçek öğretim içeriği:

   ```
   [entlassen]  işveren yapar; çalışanın kendi ayrılması bu değil
   [die Kosten] hep çoğul kullanılır
   [die Leiter] aynı sözcüğün eril biçimi 'yönetici' demek
   ```

Toplam: **8 sıra sözcüğü + 2 çerçeve + 183 not = 193 dize.** Kendi hattı
kuruldu (`data/lessons/word/`, kardeşlerinin deseni) ve iki pakette
yazıldı; kapı 0 hata 0 uyarı veriyor.

Kapıya bu alana özgü iki kural eklendi:

- **Çerçevede `{}` yer tutucusu korunur.** Düşerse şablon çalışır ama
  cümle kelimeyi hiç söylemez — çalışan bir dersin içinde sessiz bir
  boşluk, ekranda hiç görünmez.
- **Sekiz sıra sözcüğü sekiz AYRI karşılık ister.** İkisi aynı olursa
  öğrenci kaçıncı kelimede olduğunu duymaz; kaynak sırayı bilerek
  söylüyor.

İki not İngilizcede kaynaktan daha az iş yapıyor ve bu kaçınılmaz:
'kadın biçimi -in ekiyle kurulur' Almanca dilbilgisini anlatıyor,
İngilizcede öğrencinin kendi dilinden bir dayanağı yok. Çevrildiler ama
düşürülmediler — dersin verdiği bilgi orada.

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

---

## Beceri ekseni BİTTİ — düz metin, görev metni ve kalan alanlar (2026-09-10)

`data/skills/prose/` hattı 3.394 dizeyle kapandı ve çalışma anına bağlandı
(`apply.mjs` → `NativeDict.prose` → `resolveExercise` → `localiseExercise` →
`/immersion/skill/[id]`). Kapsanan alanlar: `intro` ve `questions[].explain`.

Üç şey öğrenildi ve üçü de sayı:

1. **Plan 3.705 tahmin etmişti, ölçüm 5.268 buldu, sınıflandırma 3.383'e
   indirdi.** Aradaki 1.885 satır çeviri DEĞİL: metinden alınmış bir cümle
   ("„Fünf Minuten.“") ve İngilizcesi kendisi. Ölçüt (`isProseQuote`)
   çözücüde duruyor, paketleyici oradan çağırıyor — iki kopya olsaydı biri
   daraldığında öteki dizeyi "yazılacak" sayardı ve hep-ya-hiç kuralı bütün
   egzersizi sessizce Türkçeye düşürürdü.

2. **Sözlükçe çevrilmiyor, KATLANIYOR.** `Gloss.en` zaten doluydu ama
   oynatıcı üç satır çiziyordu: Almanca, TÜRKÇE, soluk İngilizce. İngilizce
   okuyan için ters. Katlama `tr`yi `en` ile değiştirip `en`i düşürüyor.
   Katlamayı yazınca 25 egzersiz birden reddedildi: kütüphane yazma
   egzersizlerinin `phrases` maddelerinin 125'inde `en` HİÇ yazılmamıştı —
   alan opsiyonel olduğu için hiçbir denetim istememişti.

3. **Yazılmış olmak yetmiyor.** Hattın kendi kapısı yazılanı ölçer;
   yazılanın uygulamaya VARDIĞINI ölçen ikinci bir kapı gerekiyor
   (`check:skills-native`, 995 egzersizin hepsini çözücüden geçiriyor).
   Bu boşluk bir kez canlıya çıktı — `derived.json` .gitignore'daydı,
   sunucu derlemesi sözlüğü 4.640 yerine 714 maddeyle kurdu ve İngilizce
   kurs sessizce Türkçe açıldı.

### Sıradaki kalem: görev metinleri — 3.426 benzersiz dize

`intro`/`explain` beceri ekseninin YARISIYDI. Ölçüm (2026-09-10, yalnız
`course: "de"`, 995 egzersiz):

| alan | dize | alan | dize |
|---|---:|---|---:|
| `tasks.build.tr` | 605 | `explanation.tr` | 75 |
| `tasks.build.hint` | 589 | `explanation.heading` | 74 |
| `tasks.free.checklist` | 547 | `tasks.drill.tr` | 70 |
| `explanation.examples.tr` | 215 | `tasks.drill.hint` | 70 |
| `tasks.rewrite.why` | 190 | `tasks.drill.confusions.fix` | 70 |
| `tasks.rewrite.prompt` | 184 | `monologue.bulletsTr` | 59 |
| `tasks.reply.checklist` | 156 | `monologue.targets.tr` | 58 |
| `explanation.examples.note` | 147 | `tasks.form.facts` | 47 |
| `tasks.free.prompt` | 129 | `tasks.form.prompt` | 46 |
| `tasks.reply.prompt` | 40 | `focus` | 25 |
| `monologue.promptTr` | 15 | `monologue.rubricHint` | 15 |
| | | **toplam** | **3.426** |

ÖLÇÜMDE ÜÇ YANLIŞ POZİTİF ÇIKTI ve hattın kapsamından düştüler:

- `genre` — Türkçe DEĞİL. Kapalı bir slug kümesi ("email", "ad") ve arayüz
  sözlüğünde çevriliyor. Tip yorumu bayattı ("Türkçe: E-posta, İlan") ve
  var olmayan bir boşluk arattı; yorum düzeltildi.
- `tasks.form.fields[].label` — Almanca ("Name", "Land"), formun kendisi.
- `stimulus` / `sample` / `source` — Almanca uyaran ve örnek cevap.
  Öğrencinin okuyacağı hedef dil metni; çevrilirse egzersiz ölçtüğü şeyi
  ölçmez.

`tasks.build.tr` hattın en zor kalemi: Almanca cümlenin ANLAMI ve öğrenci
onu parçalardan kuruyor. Karşılık "doğru İngilizce" olmakla kalmaz, aynı
Almanca dizilişi ima etmek zorunda.

### Görev metni hattı BİTTİ — 3.426/3.426 (2026-09-10)

`data/skills/task/` kapandı ve çalışma anına bağlandı: `apply.mjs` →
`NativeDict.task` → `resolveExercise` → `localiseExercise`. On dokuz alan
daha çevriliyor.

ANAHTAR `tür + AYRAÇ + tr`. Korpusta tam bir çakışma bulundu ve düz anahtar
onu sessizce yerdi:

    explanation.examples.tr  "Saat altıda kalkıyorum."  Ich stehe um sechs Uhr auf.
    build.tr                 "Saat altıda kalkıyorum."  Ich stehe um sechs auf

Aynı Türkçe, farklı Almanca, farklı İngilizce. `lectureSplit` ile aynı
gerekçe. Tek çakışma — ama tek olması kuralı gereksiz kılmıyor: yiyen
tarafta kalırdı.

**Kapı yedi kural taşıyor** ve dördü bu hatta özgü. En değerlisi şu:
söyleyiş ipuçları ÇEVRİLMEZ, YENİDEN YAZILIR. `drill.hint` Almanca sesleri
TÜRKÇE okunuşla veriyor ("ştu-DİİRT", "MAY-ne"); İngilizce okuyan bunu
okuyamaz, "shtoo-DEERT", "MY-nuh" gerekir. 210 ipucunun 168'i böyleydi.

**Üç sessiz kusur sınıfı yakalandı, üçü de kapının kendinde:**

1. `\b` sözcük sınırı ASCII harfe göre çalışıyor. `\bortaç\b`, `\büber\b`,
   `\bçok\b`, `\bönce\b` HİÇ eşleşmiyordu — dört listenin bir bölümü
   yazıldığı günden beri ölçüm yapmıyordu. Unicode bakışına çevrildi.
2. Yazım denetimi kaynaktan TAŞINAN sözcüğü de yargılıyordu (`Meter`).
   Artık yalnız yazanın SEÇTİĞİ sözcüklere bakıyor.
3. Üç nokta noktalama değil BOŞLUK işareti; yeri dile bağlı ve yanındaki
   noktalama da onunla birlikte gidiyor.

**Kayma teşhisi üç ölçüte çıktı** (alıntı → sayı → uzunluk korelasyonu),
çünkü ilk ikisi `build.tr` paketlerinde susuyor: o cümlelerde ne tırnak var
ne sayı. Üçüncüsü kaymanın YERİNİ değil GÖRÜNDÜĞÜ yeri veriyor ve ileti
bunu söylüyor — sınandı, gerçek eksik 130'daydı, ölçüt 139'u gösterdi.

### Beceri ekseninde KALANIN tamamı yazıldı (2026-09-10)

Çözülmüş 995 egzersizin tamamı tarandı (yapının her dizesi, alan alan).
Sonuç: 995/995 çözülüyordu ama YÖNERGE ve AÇIKLAMA dışındaki alanlar
hattın dışındaydı — hiçbir kapı onlara bakmıyordu, hata yalnız ekranda
görünürdü. Dördü de artık çıkarıcıda, çözücüde ve kapıda:

| kalem | benzersiz | not |
|---|---:|---|
| `questions[].text` | 191 | 122'si `dictation`, 48'i `truefalse`, 27'si `order` |
| `title` | 28 | hepsi yazma egzersizi ("können: yetenek mi, imkân mı?") |
| `tasks[].stimulus` | 21 | çok satırlı brifing: e-posta taslağı, tebligat, toplantı notu |
| `tasks[].source` | 1 | "Neyiniz var?" — öğrencinin Almancaya çevireceği cümle |
| **toplam** | **~241** | **hepsi yazıldı** |

`tasks[].stimulus` hattın "bir satır bir dize" varsayımını kırdı: bir
brifing 143 satır sonu taşıyor ve `write.mjs` satırı kayıt sanıyordu.
Girdide tek başına duran `%%` artık kayıt ayracı — eski yirmi dört paket
hiç değişmeden yazılmaya devam ediyor. Kapı da üç yerde genişledi (satır
sonu, `€`, Almanca metnin altındaki Türkçe imza) ve üçü de ölçülerek.

Kapının yeni bir işi daha var: `check:skills-native` çözülmüş çıktıyı
TEKRAR tarıyor. Sözlükte karşılık yoksa çözücü zaten `null` dönüyor;
bu tarama ise ÖLÇÜTÜN kendisi kayarsa (`isTurkishStem` daralırsa) sessiz
kalmayı önlüyor — kural kendi kendini ölçmez.

BOŞLUK OLMAYAN 137 dize ayrıca sayıldı ve bilerek dışarıda: Türkçe AD
taşıyan Almanca cümleler (`Sind Sie Frau Yılmaz?`, `Frau Yılmaz` konuşmacı
adı, `Ayla Yıldız` form cevabı). Bunlar içerik ve kimlik; çevrilmeleri
egzersizi bozar. Ayıran ölçüt: dizede Almanca/İngilizce bir işlev sözcüğü
var mı.

### en→de için ELDE NE VAR, NE EKSİK (2026-09-10 ölçümü)

`PAIR_READY.en` bugün BOŞ. Doldurmak için İngilizce konuşanın gördüğü her
şeyin İngilizce olması gerekiyor. Eksen eksen sayıldı:

| eksen | durum |
|---|---|
| Ders anlatımı, sözlükçe, kalıp, başlık, rol yapma, senaryo | ✅ 26.375/26.375 · kapı: `check:lessons-native` |
| Almanca takas tablosu (öğrenciye söyletilen cümleler) | ✅ 25 + 17 · kapı: `check:lessons-swap` |
| Modül sınavı kâğıtları | ✅ 1.781/1.781 · bağlı |
| Can-do ifadeleri | ✅ kaynakta `en` dolu |
| Beceri düz metni (`intro`, `questions.explain`) | ✅ 3.394/3.394 · bağlı |
| Beceri görev metni (27 alan) | ✅ 3.715/3.715 · kapı: `check:skills-task` |
| Egzersiz sözlükçesi (`gloss`, `phrases`) | ✅ 5.633 katlanıyor |
| Kelime havuzu | ✅ 8.707/8.707 `en` dolu · kapı: `test:gloss` |
| Arayüz metinleri | ✅ 1.203 anahtar × 3 dil · kapı: `i18n:check` |
| Beceri egzersizlerinin kalanı (kök, şık, başlık, brifing) | ✅ 241/241 · kapı: `check:skills-native` |
| Deneme kâğıtları (60 Almanca kâğıt) | ✅ 6.627/6.627 · kapı: `check:mock-prose` |

Tablo artık baştan sona yeşil. **`PAIR_READY.en` yine de BOŞ** ve bu bir
unutma değil: yazılanların hepsi YERELDE duruyor. Beyan, kod canlıya
çıktıktan sonra doldurulur — push Samet'te. Sıra: push → deploy → `en`
beyanı → `check:pairs`in "!" işareti.

**Deneme kâğıtları eksenin EN BÜYÜK kalemiydi ve bugüne kadar hiç
ölçülmemişti.** İlk ölçüm 4.920 dedi, hat kurulunca gerçek sayı **6.627**
çıktı — %35 fark. Sebep ölçüm hatası değil, ÖLÇÜTÜN kendisi: ilk sayım
"Türkçe görünen" dizeleri sayıyordu (beceri ekseninde 445 → 241 yapan aynı
işlev-sözcüğü ölçütü), çıkarıcı ise ALANI sayıyor. Alan Türkçe-yüzlüyse
İngilizcesi olmak zorundadır; ölçütün onu Türkçe sayıp saymaması ayrı bir
şey. Aradaki 1.707 dizenin çoğu kısa ve işlev sözcüğü taşımayan gerekçe
(`explain` 2.168 → 3.060), bir kısmı da hiç ayrı sayılmamış bir alan
(`genreTr` 381, ilk tabloda üç alanlık 180'lik "öteki" satırının içindeydi).

**Türkçe-görünürlük ölçütü kapsam ölçmez.** Kapsam alandan çıkar.

| tür | benzersiz | geçiş | ne |
|---|---:|---:|---|
| `explain` | 3.060 | 3.060 | cevaptan sonraki gerekçe |
| `rubric.criteria` | 757 | 1.316 | değerlendirme ölçütleri |
| `situation` | 563 | 582 | durum tarifi |
| `promptTr` | 439 | 732 | görev yönergesi |
| `rubric.points.tr` | 405 | 934 | içerik noktaları |
| `genreTr` | 381 | 980 | metnin türü |
| `exchange.tr` · `.hint` · `.expect` | 877 | 1.068 | konuşma bölümü |
| `instructionTr` | 85 | 240 | bölüm yönergesi |
| `themeTr` | 60 | 60 | bölüm teması |
| **toplam** | **6.627** | **8.972** | |

Anahtar `tür + AYRAÇ + tr` ve bu hatta gerçekten fark yarattı: yalnız
dizeye bakılsa 6.626 olurdu, yani bir dize iki türde iki ayrı şey anlatıyor.
Tek satırlık bir kazanç gibi görünüyor ama kuralı ucuza doğruluyor —
anahtarı dizeye indirmek o satırı sessizce yanlış çevirirdi.

Ders ekseninin sınav hattı (1.781) bunun dörtte biri kadardı. Hat deseni
yine aynı kuruldu — `data/mock-exams/prose/` altında `make` → `in/` →
`out/` → `check` — ve 6.627/6.627 yazıldı. `check:mock-prose`, CI'da
"Ana dil çözücüsü" adımının BEŞİNCİ kapısı; hat yarım dururken bilerek
dışarıdaydı, çünkü kırmızı bir kapı kimsenin bakmadığı bir kapıya dönüşür.

**Ölçüm nasıl yapıldı — ve neden iki kez yapıldı.** İlk sezgi "Türkçeye
özgü harf ya da Türkçe işlev sözcüğü" idi ve 445 dize buldu. Ama harf
ölçütü ÖZEL ADLARI yakalıyordu: `Sind Sie Frau Yılmaz?` Almanca bir
cümledir, `Frau Yılmaz` bir konuşmacı adıdır, `Ayla Yıldız` bir form
cevabıdır — üçü de İÇERİK ve çevrilmeleri egzersizi bozar. Harf ölçütü
atıldı, yalnız işlev sözcüğü kaldı; ayrıca `de`, `da`, `ya`, `her` gibi
Almancada da geçen sözcükler listeden çıkarıldı. 445 → 241.

---

## Faz 3 nerede durdu (2026-09-10)

**Almanca kursun Türkçe yüzü baştan sona İngilizceye çözülüyor.** Altı kapı
CI'da "Ana dil çözücüsü" adımında, hepsi yeşil:

| kapı | ne ölçüyor | sayı |
|---|---|---|
| `check:lessons-native` | ders anlatımı, sözlükçe, kalıp, rol yapma, senaryo, sınav — çözülmüş çıktı | 26.375/26.375 |
| `check:lessons-swap` | öğrenciye söyletilen Almanca cümleler | 25 + 17 |
| `check:skills-native` | çözülmüş egzersiz çıktısında Türkçe kaldı mı | 995/995 |
| `check:skills-task` | beceri görev metni, YAZILAN (27 tür) | 3.715/3.715 |
| `check:mock-prose` | deneme kâğıtları, YAZILAN (11 tür) | 6.627/6.627 |
| `check:mock-native` | çözülmüş deneme kâğıdı — yazılan uygulamaya varıyor mu | 60/60 |

Kapılar İKİ SORU soruyor ve ayrım kasıtlı: `-native` ekliler sözlüğü
yeniden kurup yazılanın UYGULAMAYA ULAŞTIĞINI ölçüyor, ötekiler
YAZILANI. Bir hat tamamlanabilir ve yine de çözücüye bağlanmamış olabilir.

**Bunun bedeli aynı gün ölçüldü.** `data/mock-exams/prose/` 6.627/6.627
yazılmıştı ve `check:mock-prose` yeşildi, ama `apply.mjs` o dizini hiç
okumuyordu: 6.627 dizenin SIFIRI uygulamaya ulaşıyordu. Yazılanı ölçen
kapı bunu göremez, çünkü sorduğu soru bu değil. `check:mock-native`
eklendikten sonra aynı boşluk bir daha sessiz kalamaz.

### Web taraması: iki boşluk çıktı, ikisi de kapandı (2026-09-10)

**Birinci tarama — ÇAĞIRAN taraması.** Türkçe alan gösteren her dosya,
çözücü çağıran her dosyayla karşılaştırıldı. Fark eden dosyaların tamamı
istemci bileşeni ve hepsi zaten çevrilmiş nesneyi sunucu sayfasından prop
olarak alıyor. Bir boşluk çıktı: `/api/mock-exam` `finish`, yanlış
maddelerin `explain` cümlelerini KAYNAK kâğıttan okuyup modele gerekçe
olarak veriyordu — cevabın dili doğru, dayanağı Türkçeydi.

Patika kancasındaki `titleTr` ayrıca bakıldı: web onu HİÇ çizmiyor
(`immersion-hub` yalnız Almanca `title` gösteriyor), `/api/immersion`
üzerinden yalnız mobile gidiyor. `genre` de bakıldı ve Türkçe değil —
26 benzersiz değerin hepsi makine anahtarı (`dialogue`, `formal`, `phone`).

**İkinci tarama — ÇIKTI taraması, ve asıl bulan bu oldu.** Çağıran
taraması doğru yerde çözücünün çağrıldığını gösteriyor ama çözücünün o
nesnenin TAMAMINI kapsadığını göstermiyor. `check:mock-native`e "çözülmüş
kâğıdın her dizesine bak, alan adına bakmadan" ölçütü eklendi ve ilk
koşuşunda **408 dize** buldu: metinlerin `gloss` sözlükçeleri hiç
katlanmıyordu. Ölçüldü — 857 maddenin 857'sinde `en` dolu, yani yazılacak
hiçbir şey yoktu, yalnız hangi sütunun gösterileceği seçilmemişti.

**Ders alınan:** "çözücü çağrılıyor mu" ile "çözücü her şeyi kapsıyor mu"
AYRI iki soru ve ilkine bakan bir tarama ikincisini hiç görmüyor. Alan
adına bakan her ölçüt, ancak BİLDİĞİ alanlar kadar geniş.

**Yan bulgu — `isTurkishStem`de iki kusur.** Taramanın son bir dizesi
gerçek bir yanlış pozitifti: "address the 'a one-off cost' argument"
içindeki `'a`, Türkçe yönelme eki sanılıyordu. Düzeltilirken ikincisi
çıktı: ek ölçütü SÖZCÜK düzeyinde çalışıyor ve büyük harfli sözcükleri
eliyordu, yani `Jonas'ın`, `Hamburg'da`, `Türkiye'den` gibi ASIL hedefini
hiç görmüyordu. Yeni kural bütün dizede arıyor ve kesme işaretinden önce
boşluk olmamasını şart koşuyor; ölçüldü, 95.188 benzersiz dizede **29
kazanıyor, 0 kaybediyor**.

Yazılıp hiç çalışmayan bir kural, kapının en sessiz kusuru: liste doluyor,
ölçüm hiç değişmiyor. Bu hatta ikinci kez oldu (ilki `\b`nin ASCII olması).

### MOBİL: İngilizce yüz hiç yok (2026-09-10 ölçümü)

Web bitti; mobil bitmedi ve bugüne kadar hiç ölçülmemişti.

`mobile/src/data/` altındaki paketler KURSA göre dizili, `(anadil, kurs)`
çiftine göre değil: `exercises.json` + `de-a1…c1.json` + `papers.json`
Almanca kursun **Türkçe yüzünü** taşıyor, `-en` ekli eşleri ise İngilizce
KURSUN paketleri (anadili İngilizce olan biri İngilizce kursu almıyor).
Çözücü mobilde hiç çalışmıyor; `dump-*-mobile.ts` betiklerinin üçü de
`process.argv[2]` ile yalnız kursu alıyor, anadili değil.

**Bugün bir şey bozulmuyor** ve bu bir tesadüf değil: mobildeki
`PAIR_READY.en` de boş, `offeredNativeLangs()` hazır çifti olmayan dili
seçtirmiyor. Yani yarım çeviri kullanıcıya hiç görünmüyor.

**Ama `PAIR_READY.en` yalnız web'de doldurulamaz.** Tablo iki yerde duruyor
(`src/lib/courses.ts` ve `mobile/src/lib/courses.ts`); web'de doldurulup
mobilde doldurulmazsa aynı hesap iki cihazda iki farklı katalog görür.
Mobil hazır olmadan beyan yapılamaz.

Maliyet ölçüldü, iki yol var ve ikisi de ucuz değil:

| yol | ek yük | not |
|---|---:|---|
| Çözülmüş ikinci kopya (`exercises.en.json`, `de-a1.en.json`, …) | **+8,40 MB** | paket dizini `(anadil, kurs)` olur; çözücü mobile hiç girmez |
| Sözlük + çözücü mobile taşınır | **+4,62 MB** + 867 satır | `native-en.json` olduğu gibi gider, çözüm cihazda olur |

Sözlük yolu %45 daha küçük çünkü Almanca içeriği İKİNCİ KEZ taşımıyor —
yalnız Türkçe→İngilizce eşlemeleri, tekilleştirilmiş. Bedeli, `native.ts`in
mobilde İKİNCİ BİR KOPYASI: mobil `src/`i göremiyor. `taskSeconds` ile aynı
durum ve orada kural yazılı — "ikisi birlikte değişir; ayrılırlarsa
oynatıcının saati kâğıdın süresiyle çelişir".

Üçüncü bir yol (İngilizce paketi ağdan indirmek) DEĞERLENDİRİLDİ ve elendi:
içerik bilerek pakete gömülü, çevrimdışı çalışması gerekiyor.

Karar ürün kararı: 4,62 MB'lık bir APK büyümesi mi, iki yerde duran bir
çözücü mü, yoksa mobilde en→de'nin şimdilik kapalı kalması mı.

### de→en — ÖLÇÜLDÜ: ~33.700 dize (2026-09-10)

İkinci parite Almanca konuşana İngilizce öğretiyor, yani İNGİLİZCE KURSUN
Türkçe yüzünün Almancası yazılacak. Bugüne kadar hiç ölçülmemişti.

**Kelime katmanı — üretim okundu, kolon var ama BOŞ:**

| kolon | ne | üretimde |
|---|---|---:|
| `de_gloss` | İngilizce kelimenin Almanca karşılığı | **0 / 7.175** |
| `beispiel_de` | örnek cümlenin Almanca çevirisi | **0 / 7.175** |

Kolonlar şemada duruyor (`words`), yani göç gerekmiyor — yalnız veri yok.

**İçerik katmanı — çıkarıcı sayısı, tahmin değil:**

| hat | birim | dize |
|---|---|---:|
| deneme kâğıdı | 60 İngilizce kâğıt | **6.828** (46 paket, `in-de/` kuruldu) |
| ders anlatımı | 200 ders | ~8.515 benzersiz parça (9.986 geçiş) |
| ders başlığı/özeti | 200 ders | 400 |
| ders sözlükçesi | | 1.000 |
| ders kalıp notu | | 600 |
| beceri egzersizi | 189 egzersiz | ~2.240 |
| **içerik toplamı** | | **~19.600** |

**Toplam ~33.700 dize.** Karşılaştırma: en→de'nin sözlüğü 40.000 girdi ve
haftalar sürdü.

**Bir ürün gerçeği:** İngilizce kursun bugün 200 dersi var (A1 tam, A2'nin
ilk modülü); B1/B2/C1'de hiç ders yok. de→en açıldığında Almanca konuşan
kullanıcı A1–A2 görecek, üstü "Yakında". Deneme kâğıtları beş seviyede de
tam. Bu bir engel değil ama beyanla birlikte bilinmesi gereken bir şey.

**Hat deseni aynı, kurallar AYNA DEĞİL.** `extractMock` kurs argümanı aldı
ve iki pariteye birden hizmet ediyor. Ama kapı kopyalanamaz: Almanca tarafta
kanıt dili İNGİLİZCE, karakter kümesinde `ÄÖÜäöüß` hedef dilin harfleri
(kaynakta yabancı değil), İngiliz yazımı kuralı da hiç uygulanmaz. Her hattın
kapısı ayrı yazılacak.

### Kalan dört iş — dördü de benim elimde değil

1. **Push ve deploy.** `PAIR_READY.en` DOLDURULDU ve beyan ancak canlıya
   çıkınca gerçek olur. Web push → webhook → deploy; mobil ise mağaza
   sürümü bekliyor. İkisi arasındaki pencerede web en→de sunar, mobil
   sunmaz — beyan iki yerde birden dolduruldu ama yayın hızları farklı.
   Push Samet'te.
2. **gsw örnek çevirileri üretime.** Yerelde 8.267/8.267 yazılı, üretimde
   `beispiel_en` 0. Uygulanınca en→gsw de beyana girebilir. Üretim
   veritabanına yazma; ayrıca sorulur.
3. **de→gsw bir parite mi?** Züritüütsch hattı 2026-08-24'te durduruldu.
   Almanca konuşan birine Züritüütsch öğretmek ayrı bir ürün kararı;
   `PAIR_READY`ye eklenip eklenmeyeceği kod sorusu değil.
4. **Mobilde hangi yol?** Yukarıdaki tablo iki yolu ve ikisinin de
   ölçülmüş bedelini veriyor; hangisinin seçileceği ürün kararı.

### Bu fazda üç kez tekrarlanan ders

**Kapı yanlış öterse ÖLÇ, sonra TÜRKÇE tarafı genişlet.** Deneme kâğıtları
hattında kapı üç kez yanlış öttü ve üçünde de refleks "Almanca ölçütünü
daralt" idi. Ölçüldüğünde: daraltma 3 yanlış pozitifi düzeltirken 107
gerçek Almanca açıklığı kaybediyordu. Türkçe tarafı genişletmek aynı üçünü
düzeltip 2.991 açıklığın 2.988'ini koruyor. Kanıtı korumak, gürültüyü
susturmaktan önce gelir.

**Türkçe-görünürlük ölçütü KAPSAM ölçmez.** Deneme kâğıtları 4.920 sanıldı,
6.627 çıktı; fark, ölçütün Türkçe saymadığı kısa gerekçeler ve hiç ayrı
sayılmamış bir alan. Kapsam alandan çıkar, dizeye bakan bir sezgiden değil.

**Yarım hat kapıya bağlanmaz.** `check:mock-prose` 1.800/6.627'yken CI'ya
eklenseydi ay boyunca kırmızı yanardı; kırmızı bir kapı okunmaz hâle gelir
ve okunmayan kapı, olmayan kapıdır.
