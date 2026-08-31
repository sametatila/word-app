# Beceri sözlükçesi yenileme — şartname

Sana bir paket **egzersiz** verilir (okuma, dinleme, yazma ya da konuşma). Her
egzersizin sözlükçesindeki her madde için `tr` ve `en` üretirsin; Züritüütsch
kursunda ayrıca gerekiyorsa `hd` ve `note`.

Bu bir gözden geçirme değil, bir **yeniden yazma**. Pakette gördüğün
`currentTr` değerleri kaynağın kendisidir ve güvenilmez.

## Neden bu iş yapılıyor

Kelime havuzunda (8267 kelime) bu iş bitti: her kelimenin tek doğal Türkçe
karşılığı, tek doğal İngilizce karşılığı ve kelimeyi gerçekten içeren bir
örnek cümlesi var. Beceriler tarafı geride kaldı ve **uygulama kendisiyle
çelişiyor**:

- Almanca kursunun 895 sözlükçe maddesinden **392'si** havuzdan farklı bir
  karşılık veriyor. Öğrenci kelime turunda `der Kuchen → "kek"` görüyor, okuma
  alıştırmasında `"pasta, kek"`.
- **418 madde** hâlâ virgülle iki üç anlam veriyor (`abfahren → "kalkmak,
  hareket etmek"`).
- Sözlükçede **İngilizce hiç yok**, oysa kelime kartlarında var.

## `tr` — bu metindeki tek doğal karşılık

**Tek karşılık.** Virgülle ikinci anlam **yasak**.

Ama havuzdan bir noktada ayrılıyorsun: karşılık, kelimenin sözlükteki birinci
anlamı değil **bu metindeki** anlamı olmalı. Sözlükçenin işi bu.

```
alışveriş ilanında  das Angebot  →  "indirim"      (havuzdaki "teklif" değil)
tren tarifesinde    abfahren     →  "kalkmak"      (havuzla aynı)
pastane metninde    der Kuchen   →  "pasta"        (havuzdaki "kek" değil)
```

### Havuzla ilişki — kural

Pakette `pool` alanı varsa, o kelimenin kelime havuzundaki karşılığıdır.

- Metindeki anlam havuzdakiyle **aynıysa**, havuzun sözcüğünü **birebir**
  kullan. "kek" varken "pasta, kek" yazmak uygulamayı kendisiyle çelişir
  hâle getiriyor ve öğrenci hangisinin doğru olduğunu bilemiyor.
- Metin gerçekten **başka bir anlam** kullanıyorsa bağlamsal anlamı yaz. Bu
  bir çelişki değil, öğretmenin ta kendisi — ama emin ol: metni okumadan
  "başka anlam" deme.

## `en` — aynı anlamın tek doğal İngilizce karşılığı

Aynı kurallar. Fiiller `to` ile (`to depart`), isimler tekil ve artikelsiz,
küçük harf. İngilizce yalnızca ikinci bir çeviri değil, bir ayırt edici:
Türkçede birbirine çöken kelimeler orada ayrışıyor.

## `hd` — yalnızca Züritüütsch kursunda

Lehçe maddesinin Hochdeutsch biçimi. Bugün parantez içinde çeviriye
yapıştırılmış durumda ve karşılığı tek olmaktan çıkarıyor:

```
önce   { de: "d Wohnig", tr: "daire (Wohnung)" }
sonra  { de: "d Wohnig", tr: "daire", en: "apartment", hd: "Wohnung" }
```

`hd` yalnızca Almanca biçimi taşır — açıklama değil, tek kelime ya da kısa
ifade. Lehçe biçim ile Hochdeutsch aynıysa `hd` yazma.

Pakette bazı maddelerde `hdCandidate` göreceksin. Bu, mevcut çevirinin parantezinden
çıkarılmış ve kelime havuzunda karşılığı bulunmuş bir Hochdeutsch **adayıdır** —
o maddenin `pool` ipucu da oradan geliyor. Aday, doğrulanmış bir bilgi değil:
lehçe maddesiyle gerçekten örtüşüyorsa `hd` olarak kullan, örtüşmüyorsa yok say
ve durumu bildir.

## `note` — karşılığı olmayan kelimeler

Bazı kelimelerin Türkçede karşılığı yok, açıklaması var. Bunlar ağırlıkla
İsviçre kültürüne ait:

```
{ de: "de Znüni", tr: "kuşluk yemeği", en: "mid-morning snack",
  note: "Saat 9 civarı yenir." }
{ de: "de Samichlaus", tr: "Noel Baba", en: "Santa Claus",
  note: "İsviçre'de 6 Aralık'ta gelir." }
```

`note` kısa ve tek cümle. Yalnızca gerçekten gerekiyorsa yaz — "açıklama
eklemek daha iyi olur" gerekçe değildir. Karşılık tek başına yetiyorsa `note`
yazma.

## Metinde geçmeyen kelime

Sözlükçenin işi **bu metindeki** kelimeleri açıklamak. Pakette `text` alanı
egzersizin öğrencinin gördüğü Almanca gövdesidir. Sözlükçe maddesi orada
geçmiyorsa bunu **bildir** — kelimeyi kendin silme ya da değiştirme, çünkü
sözlükçenin hangi maddeyi taşıyacağı ayrı bir karar.

Ayrılabilir fiil metinde bölünür (`abfahren` → "fährt … ab") ve bu geçer
sayılır; çekimli hâller de öyle.

## `phrases`, `targets`, `tasks`

- **phrases** (yazma kalıpları) ve **targets** (konuşma hedefleri): sözlükçe
  ile aynı kurallar. Ama bunlar çoğu zaman **kalıp**, tek kelime değil
  (`Sehr geehrte Frau …,`). Kalıbın içindeki eğik çizgi ve üç nokta
  Almancadakini yansıtıyorsa **meşrudur**, dokunma:
  `"mein Sohn / meine Tochter …" → "oğlum / kızım …"`
- **tasks** (konuşma cümleleri): `tr` bir kelime değil **cümle** çevirisi.
  Tek karşılık kuralı burada geçmez; doğal bir çeviri olsun yeter. `en` de
  aynı cümlenin doğal İngilizcesi.

## Çıktı

Sana söylenen dosyaya, yalnızca geçerli bir JSON dizisi. Paketteki **her
egzersiz** ve her alan çıktıda yer alır, kaynakla aynı sırada.

```json
[
  {
    "id": "a1-r4",
    "gloss": [
      { "de": "das Angebot", "tr": "indirim", "en": "special offer" },
      { "de": "günstig", "tr": "uygun fiyatlı", "en": "affordable" }
    ],
    "notInText": ["die Kasse"]
  },
  {
    "id": "zh-a1-r2",
    "gloss": [
      { "de": "d Wohnig", "tr": "daire", "en": "apartment", "hd": "Wohnung" }
    ]
  }
]
```

Alanlar: `id` (zorunlu), `gloss` / `phrases` / `targets` / `tasks` (pakette
hangisi varsa), ve varsa `notInText` — metinde bulamadığın madde başlıkları.

Yazdıktan sonra **kendin denetle**:

```
node data/skills/check.mjs <paket-adı>
```

Denetleyici mekanik kusurları yakalar: çok anlamlılık, eksik alan, havuzla
çelişki, dil karışması, metinde bulunamayan kelime. Uyarıların hepsi hata
değildir — havuzdan bilinçli ayrıldığın yerler uyarı olarak görünür ve doğru
olabilir. Temiz çıktı alana kadar hataları düzelt; uyarılara bakıp karar ver.

Bitince yalnızca şu satırı döndür: `<paket>: <egzersiz sayısı> tamam, <hata>
hata` — ve tereddüt ettiğin en fazla beş maddeyi tek cümlelik gerekçelerle
listele. Denetleyicinin yanlış rettiği bir yer varsa onu ayrıca bildir:
veriyi bozarak hatayı susturmak yerine, doğrusunu bırakıp durumu raporla.
