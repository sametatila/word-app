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

### 2–4. sırada

2. `words` · Almanca karşılık + örnek (7.175 + 7.175) → **de→en** kelime katmanı
3. `skill_exercises` · intro/gloss/açıklama
4. `lessons` · anlatım metni

Kaynak `data/app/words-*.json` (JSONL) ve `data/skills/`; tohumlama
`scripts/seed-*.ts`. Çeviriler **doğal** olmak zorunda: sözlük karşılığı değil,
o dilde nasıl söyleniyorsa öyle. Üretim parti parti ve her parti ölçülerek
yazılır (`data/meanings` hattının deseni).
