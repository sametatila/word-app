# Anlam ve örnek cümle — şartname

Sana bir paket Almanca kelime verilir. Her kelime için beş alan üretirsin:
`tr`, `en`, `beispiel`, `beispielTr`, `beispielEn`.

Bu bir yeniden yazma. Pakette gördüğün mevcut değerleri bilgi olarak oku, doğru kabul etme.

İngilizce ikinci bir çeviri değil, ayırt edicidir: Türkçede çöken kelimeler İngilizcede ayrışır
(`er`/`sie`/`es` üçü de "o", ama `he`/`she`/`it`; `das Essen` ile `essen` ikisi de "yemek",
ama `food` ile `to eat`).

## `tr`: tek doğal Türkçe karşılık

Ölçüt: bir Türk'e "bu kelime ne demek?" diye sorsan vereceği ilk ve tek cevap.

```
Frau      →  "kadın"         (değil: "kadın, bayan, eş")
schön     →  "güzel"         (değil: "güzel, hoş, iyi")
wohl      →  "galiba"        (değil: "iyi; galiba, herhalde")
bekommen  →  "almak"         (değil: "elde etmek, almak")
```

- İçerik sözcüklerinde (isim, fiil, sıfat, zarf) virgül, noktalı virgül, eğik çizgi, "ya da" yok.
- Parantez her durumda yasak.
- Fiiller `-mek`/`-mak` ile biter; dönüşlü fiil de tek karşılık (`sich freuen → "sevinmek"`).
- İsimler yalın ve artikelsiz (`der Tisch → "masa"`, "bir masa" değil).
- Kısa: en çok üç kelime hedef; deyimler hariç (`Rad fahren → "bisiklete binmek"`).
- Sözlük Türkçesi yok (`"gerçekleştirmek"`, `"husus"`, `"vuku bulmak"`).

### İşlev sözcükleri

Edat, bağlaç, zamir, tanımlık (kaynakta `typ: "Sonstiges"`): çıplak ek (`"-e"`) tek başına
kalmaz, doğal bir kelimeyle eşlenir. Gerçekten iki çekirdek anlamı olanda en çok iki anlam
`"; "` ile ayrılır.

```
von   →  "-in; -den"            nach  →  "-e doğru; sonra"
auch  →  "da; ayrıca"           bis   →  "-e kadar"
seit  →  "-den beri"            ohne  →  "-siz"
```

`"; "` yalnız işlev sözcüğünde ve tam iki parçada geçerli; öteki her durumda hata.

### Anlam çakışması

İki farklı kelimenin karşılığı aynı çıkıyor ama gerçekten farklı şeyler demekse daha kesin
Türkçe seç; parantezle dipnot düşme. Paketteki `overlapping` alanı çakışan maddeleri (paketin
dışındakiler dahil) gösterir. Kendi maddeni düzelt, ötekine dokunma.

```
Schüler   →  "öğrenci"                 Student   →  "üniversite öğrencisi"
Bein      →  "bacak"                   Fuß       →  "ayak"
```

Gerçek eşanlamlılar (`anfangen`/`beginnen`) aynı karşılığı alır; İngilizce zaten ayırır.

### Dilbilgisi maddeleri

Türkçe karşılığı olmayan maddede dürüst cevap işlevdir: `der → "belirli artikel"` / `"the"`.
Yalnız gerçekten karşılığı olmayanda; "edat", "bağlaç" gibi tür adları çeviri yerine geçmez.

## `en`: tek doğal İngilizce karşılık

- Aynı kurallar: tek karşılık, virgül/parantez yok, küçük harf (özel isim değilse).
  İşlev sözcüğünde aynı `"; "` istisnası (`über → "over; about"`).
- Fiiller `to` ile: `essen → "to eat"`. Kip fiili mastar almaz (`möchten → "would like"`,
  `dürfen → "may"`).
- İsimler tekil ve artikelsiz: `"table"`, `"food"`.
- **Amerikan İngilizcesi: hem yazım hem sözcük seçimi** (`color`, `apartment`, `sidewalk`,
  `truck`; `colour`, `flat`, `pavement`, `lorry` değil). Liste: `data/conversations/spelling.mjs`.
- Türkçeden değil, Almancadan çevir.

## `beispiel`: tek, tam, kelimeyi içeren Almanca cümle

1. **Kelimeyi içerir.** Çekimli hâl olur (`fahren` → `fährt`); ayrılabilir fiil bölünür
   (`abfahren` → `"Der Zug fährt gleich ab."`). Başka kelime olmaz (`Arzt` için `Ärztin` yanlış).
   Yalnız bir bileşiğin içinde geçmesi yetmez (`Fach` için `Lieblingsfach` yanlış): boşluk
   doldurma turu kelimeyi sözcük sınırıyla arar. Denetleyici bunu yakalamaz, sen bakarsın.
2. **Tek cümle.** Numaralı derleme, eğik çizgili varyant, `(vgl. …)`/`(siehe …)` artığı yok.
3. **4–12 kelime.** 3–13 dışı hata, 4–12 dışı uyarı. Uzun cümle turlarda sessizce elenir.
4. Nokta, soru ya da ünlem işaretiyle biter; büyük harfle başlar.
5. **Seviyeye uygun.** A1: düz cümle, Präsens ya da Perfekt, yan cümle yok. B1'den itibaren
   yan cümle, Passiv, Konjunktiv II serbest.
6. Cümlenin taşıdığı anlam `tr` ve `en`e yazdığın anlamdır.
7. **Doğal.** Gerçek bir Almanın kuracağı cümle; ders kitabı kokusu yok.
8. **Özgün.** Yayımlanmış kelime listelerinin (Goethe, telc vb.) cümlesi alınmaz, çevrilerek de
   alınmaz. Kapı: `npm run check:published-examples` (cümlenin kendisi değil özeti tutulur).

Kaynaktaki cümle bu ölçütlerin hepsini karşılıyorsa korunabilir; değiştirmek için sebep gerekir.
Karşılamıyorsa ya da yayımlanmış listeden geliyorsa yeniden yazılır.

Anlamı zayıf maddelerde (zamir, edat) cümle tipik kullanımı gösterir:
`für → "Ich kaufe ein Buch für meine Schwester."`

## `beispielTr` ve `beispielEn`: o cümlenin doğal çevirisi

- Yazdığın Almanca cümlenin çevirisi, kaynaktaki eski cümlenin değil.
- Birebir değil doğal. Tek cümle, numarasız, eğik çizgisiz.
- Almanca soru ise çeviri de soru. İki çeviri birbirinin aynısı olmaz.

```
beispiel     "Der Zug fährt gleich ab."
beispielTr   "Tren birazdan kalkıyor."
beispielEn   "The train is leaving shortly."
```

## Yaygın tuzaklar

- **Anlamı kaynaktan devralma.** Kaynak `lang → "uzun"` diyor ama cümlesi `kurz` üzerine.
  Cümleyi kelimeye uydur.
- **En yaygın anlamı seç**, sözlükteki ilk sırayı değil. `mal` sözlükte "kez" ile başlar ama
  günlük Almancada `"Schau mal!"` yumuşatıcısıdır.
- **Türkçe `-mek` ile biten isim** (`ekmek`, `yemek`) fiil değildir; kaynaktaki `typ` kazanır.

## Çıktı

Söylenen dosyaya yalnız geçerli bir JSON dizisi. Paketteki her madde, kaynakla aynı sırada,
id değişmeden.

```json
[
  {
    "id": 3,
    "tr": "kalkmak",
    "en": "to depart",
    "beispiel": "Der Zug fährt gleich ab.",
    "beispielTr": "Tren birazdan kalkıyor.",
    "beispielEn": "The train is leaving shortly."
  }
]
```

## Denetim

| Komut | Ne yapar |
|---|---|
| `npm run meanings:packets` | `in/` paketlerini üretir (gitignore) |
| `node data/meanings/check.mjs <paket\|seviye\|all>` | mekanik kusurlar: çok anlamlılık, parantez, kelimesiz cümle, uzunluk, dil karışması, eksik madde |
| `npm run check:published-examples` | yayımlanmış listelerden cümle |
| `npm run meanings:apply -- [seviye\|paket\|all] [--dry]` | `out/`u veritabanına yazar (önce denetler; `db:seed` de `out/`u bindirir) |

Hata sıfır olana kadar düzelt. Denetleyicinin susması doğruluk garantisi değildir.
Bitince yalnız şunu döndür: `<paket>: <madde sayısı> tamam` ya da düzeltemediğin maddeler ve gerekçesi.
