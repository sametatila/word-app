# Anlam ve örnek cümle yenileme — şartname

Sana bir paket Almanca kelime verilir. Her kelime için **beş alan** üretirsin:
`tr`, `en`, `beispiel`, `beispielTr`, `beispielEn`.

Bu bir gözden geçirme değil, bir **yeniden yazma**. Pakette gördüğün mevcut
değerler kaynağın kendisidir ve güvenilmez — bilgi olarak oku, doğru kabul etme.

## Neden bu iş yapılıyor

Uygulamadaki geri bildirimlerin tamamı veri doğruluğuyla ilgili. Üç kusur var:

1. **Bir kelimeye üç dört anlam veriliyordu.** `zu → "çok, fazla; -e, -a"`.
   Öğrenci hangisini ezberleyeceğini bilmiyor, çoktan seçmelide dört uzun şık
   okunmuyor, yazarak hatırlamada hangi biçimin beklendiği belirsiz kalıyor.
2. **Parantezli açıklamalar işi daha da bozuyordu.** `es → "o (nötr, cansız)"`.
   Parantez bir çeviri değil, bir dipnot; ekranda yer kaplıyor ve okunmuyor.
3. **Örnek cümleler kelimeyi içermiyordu.** `lang` ("uzun") için verilen cümle
   `"Das Kleid ist zu kurz."` — kelimenin kendisi cümlede yok, üstelik cümle
   tam tersini söylüyor. `Disco` için `"…in die Diskothek."`, `Arzt` için
   `"…bei meiner Ärztin."`. Boşluk doldurma ve cümle dizme turları cümleyi
   kelimeden kurduğu için bu, oyunun kendisini bozuyor.

Ayrıca artık İngilizce de gösteriliyor. İngilizce yalnızca ikinci bir çeviri
değil, bir **ayırt edici**: Türkçede birbirine çöken kelimeler İngilizcede
ayrışıyor (`er`/`sie`/`es` üçü de "o", ama `he` / `she` / `it`; `das Essen` ile
`essen` ikisi de "yemek", ama `food` ile `to eat`).

## `tr` — tek doğal Türkçe karşılık

**Tek karşılık.** Virgül, noktalı virgül, eğik çizgi ve parantez **yasak**.

Ölçüt: bir Türk'e "bu Almanca kelime ne demek?" diye sorsan vereceği **ilk ve
tek** cevap. Sözlük maddesi değil, konuşma cevabı.

```
zu        →  "çok"           (değil: "çok, fazla; -e, -a")
es        →  "o"             (değil: "o (nötr, cansız)")
sie       →  "o"             (değil: "o, onlar")
wohl      →  "galiba"        (değil: "iyi; galiba, herhalde")
bekommen  →  "almak"         (değil: "elde etmek, almak")
```

Biçim kuralları:

- Fiiller `-mek`/`-mak` ile biter: `arbeiten → "çalışmak"`.
- Dönüşlü fiiller de tek karşılık: `sich freuen → "sevinmek"`.
- İsimler yalın hâlde ve artikelsiz: `der Tisch → "masa"`.
- Sıfat sıfat kalır, zarf zarf kalır.
- En fazla üç kelime; deyim niteliğindeki maddeler bunun dışında
  (`zum Beispiel → "örneğin"`, `Rad fahren → "bisiklete binmek"`).

### Anlam çakışması: parantez değil, daha kesin Türkçe

İki farklı Almanca kelimenin karşılığı birebir aynı çıkıyorsa ve kelimeler
gerçekten farklı şeyler demekse, **parantezle dipnot düşme** — daha kesin bir
Türkçe ifade seç. Pakette bunu görmen için `cakisan` alanı var.

```
Schüler   →  "öğrenci"                 Student   →  "üniversite öğrencisi"
auf sein  →  "açık olmak"              an sein   →  "çalışıyor olmak"
Bein      →  "bacak"                   Fuß       →  "ayak"
```

Kelimeler gerçekten eşanlamlıysa (`anfangen` / `beginnen`) ikisi de aynı
karşılığı alır; zorlama ayrım yaratma. İngilizce alan zaten ayırıyor.

`cakisan` listesi **paketinin dışındaki** maddeleri de gösteriyor: `man` A1'in
ilk paketinde, `Mensch` çok sonrasında ve ikisi de "insan" almaya aday. Kendi
maddende en kesin karşılığı seçmen yeterli; diğerini düzeltmek senin işin değil.

### Dilbilgisi maddeleri

Bazı maddelerin Türkçede karşılığı yoktur, işlevi vardır. Orada dürüst cevap
işlevin kendisidir:

```
der   →  "belirli artikel" / "the"
```

Kaynak bu maddeye "bu, şu" diyor ama `formen` alanı "die, das" — yani bu bir
tanımlık maddesi. "bu" demek `Der Bus kommt gleich.` cümlesi için düpedüz
yanlış olurdu. Bunu yalnızca gerçekten karşılığı olmayan maddelerde yap;
"edat", "bağlaç" gibi tür adları çeviri yerine geçmez.

## `en` — tek doğal İngilizce karşılık

Aynı kurallar: tek karşılık, virgül/parantez yok, küçük harf (özel isim değilse).

- **Fiiller `to` ile yazılır**: `essen → "to eat"`. Bu bir üslup tercihi değil:
  Almancada isim/fiil çiftleri çok yaygın (`das Essen`/`essen`,
  `die Arbeit`/`arbeiten`, `das Leben`/`leben`) ve Türkçede ikisi de aynı
  kelimeye çöküyor. `to` olmadan liste ikizlerle dolar.
- İsimler tekil ve artikelsiz: `"table"`, `"food"`.
- Amerikan yazımı (`color`, `apartment`).

## `beispiel` — tek, tam, kelimeyi içeren Almanca cümle

Zorunlu ölçütler:

1. **Kelimeyi gerçekten içerir.** Çekimli hâl kabul (`fahren` → `fährt`,
   `Arzt` → `Arztes`). Ayrılabilir fiil cümlede bölünür ve bu doğrudur
   (`abfahren` → `"Der Zug fährt gleich ab."`). Ama başka bir kelimeyle
   değiştirilemez: `Disco` için `Diskothek`, `Arzt` için `Ärztin` **yanlıştır**.
2. **Tek cümle.** Numaralı derleme yok, eğik çizgiyle birleştirilmiş varyant
   listesi yok, `(vergl. Grammatik)` / `(siehe …)` gibi sözlük artığı yok.
3. **4–12 kelime.** Telefonda tek satıra sığmalı ve cümle dizme turunda
   dizilebilmeli.
4. **Nokta, soru ya da ünlem işaretiyle biter.**
5. **Seviyeye uygun.** A1 kelimesinin cümlesi A1 dilbilgisiyle kurulur: düz
   cümle, Präsens ya da Perfekt, yan cümle yok. B1'den itibaren yan cümle,
   Passiv ve Konjunktiv II serbest.
6. **Cümlenin taşıdığı anlam, `tr` ve `en` alanına yazdığın anlamdır.**
   `wohl → "galiba"` yazdıysan cümle "iyi hissetmek" anlamını göstermez.
7. **Doğal.** Gerçek bir Almanın kuracağı cümle. Ders kitabı kokan
   ("Das ist ein Tisch. Der Tisch ist braun.") cümleler kurma.

Kaynaktaki cümle bu yedi ölçütü **zaten karşılıyorsa aynen koru**. Değiştirmek
için sebep gerekir, "daha iyi olabilirdi" sebep değildir. Pakettekilerin çoğu
korunur; asıl işin bozuk olanları düzeltmek.

Şahıs zamirleri ve edatlar gibi kendi başına anlamı olmayan maddelerde cümle,
kelimenin **tipik kullanımını** gösterir: `für → "Ich kaufe ein Buch für meine
Schwester."`

## `beispielTr` ve `beispielEn` — o cümlenin doğal çevirisi

- Yazdığın Almanca cümlenin çevirisi. Kaynaktaki eski cümlenin değil.
- Birebir değil **doğal**: bir Türk'ün / İngiliz'in aynı durumda kuracağı cümle.
- Tek cümle, numarasız, eğik çizgisiz.
- Almanca cümle soru ise çeviri de sorudur.

```
beispiel     "Der Zug fährt gleich ab."
beispielTr   "Tren birazdan kalkıyor."
beispielEn   "The train is leaving shortly."
```

## Yaygın tuzaklar

- **Anlamı kaynaktan devralma.** Kaynak `lang → "uzun"` diyor ama cümlesi
  `kurz` üzerine. Cümleyi kelimeye uydur, tersini değil.
- **İlk anlamı yanlış seçme.** Çok anlamlı bir maddede en yaygın anlamı seç,
  sözlükteki ilk sırayı değil. `mal` sözlükte "kez" ile başlar ama günlük
  Almancada `"Lueg mal"` yumuşatıcısıdır — burada seviye ve örnek cümle
  belirleyicidir.
- **Türkçeye çeviri kokusu.** `"gerçekleştirmek"`, `"husus"`, `"vuku bulmak"`
  gibi karşılıklar kimsenin kullanmadığı sözlük Türkçesidir.
- **İngilizceyi Türkçeden çevirme.** İkisi de Almancadan çevrilir; art arda
  çeviri iki kat hata taşır.
- **Cümleyi uzatma.** On iki kelimeyi geçen cümle turlarda kullanılamıyor ve
  sessizce eleniyor — yani o kelime hiç boşluk doldurma turu üretmiyor.

## Çıktı

Sana söylenen dosyaya, yalnızca geçerli bir JSON dizisi. Paketteki **her madde**
çıktıda yer alır, **kaynakla aynı sırada**, id değiştirilmeden.

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

Yazdıktan sonra **kendin denetle**:

```
node data/meanings/check.mjs <paket-adı>
```

Denetleyici mekanik kusurları (çok anlamlılık, parantez, kelimeyi içermeyen
cümle, uzunluk, bozuk JSON) yakalar. Temiz çıktı alana kadar düzelt; ancak
ondan sonra işin bitmiştir. Denetleyicinin sustuğu yer doğruluk garantisi
değildir — anlamın doğruluğu senin sorumluluğunda.

Bitince yalnızca şu satırı döndür: `<paket>: <madde sayısı> tamam` ya da
düzeltemediğin madde varsa gerekçesiyle birlikte listesi.
