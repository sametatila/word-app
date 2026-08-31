# Züritüütsch gözden geçirme — şartname

Sana bir paket madde verilir. Her maddede **Almanca kelime + Türkçe karşılığı +
Züritüütsch karşılığı + iki örnek cümle** durur. Görevin lehçe tarafını
denetlemek. Türkçe karşılık ayrı bir çalışmada zaten gözden geçirildi;
**`tr` alanına dokunma.**

## En önemli kural: değiştirme dürtüsüne direnç

Züritüütsch'ün tek bir resmî yazımı yok. `Schwyzertüütsch`, `Züritüütsch`,
`Zürichdüütsch` yazımlarının hepsi yaşayan biçimler. Bir yazımı "daha doğru"
bulduğun için değiştirme — yalnızca **yanlış** olanı düzelt.

110 maddede 8–20 düzeltme beklenir. Kırk düzeltme öneriyorsan büyük ihtimalle
yazım tercihini hata sanıyorsun.

## Neyi hata sayacaksın

1. **Lehçe değil, Hochdeutsch.** `gsw` alanı Almancanın aynısıysa ve kelimenin
   gerçek bir Züritüütsch biçimi varsa bu hatadır.
   - `nicht → nöd`, `Haus → Huus`, `klein → chlii`, `ich habe → ich han`
   - Ama alıntı kelimeler (`Computer`, `Taxi`, `Film`) lehçede de aynıdır;
     bunlar hata değildir.

2. **Yanlış lehçe biçimi.** Kelime lehçeleştirilmiş ama Züritüütsch'te öyle
   denmiyorsa. Bern/Basel biçimleri de hatadır: Züritüütsch `nöd` der, `nid`
   demez; `Grüezi` der, `Grüessech` demez.

3. **Anlam kayması.** Lehçe karşılık Almanca maddenin anlamını vermiyorsa.
   `sameDialect` alanı varsa başka bir Almanca kelime aynı lehçe karşılığını
   taşıyor demektir — gerçekten aynı kelimeyse sorun yok, değilse biri yanlış.

4. **Örnek cümle lehçede değil.** `gswBeispiel` Hochdeutsch kalmışsa ya da
   yarısı lehçe yarısı Almancaysa hatadır. Cümle ayrıca `gsw` kelimesini
   taşımalı — taşımıyorsa cümle yanlış maddeye ait demektir.

5. **Yanlış artikel.** Züritüütsch artikelleri `de` (eril), `d` (dişil),
   `s` (nötr). Almancadaki cinsle uyuşmalı: `der` → `de`, `die` → `d`,
   `das` → `s`. Uymuyorsa hatadır.

6. **Bozuk başlık.** `gsw` alanında sondaki tire (`letscht-`), parantez artığı
   ya da kesilmiş kelime varsa temiz biçimi öner. Almanca tarafı çekimli bir
   biçime çevrildiyse (`letzte`) lehçe tarafı da çekimli olmalı.

## Neyi hata SAYMAYACAKSIN

- Yazım varyantları (`ii`/`ie`, `ch`/`gg`, `-li`/`-lli`) doğrudur.
- Alıntı kelimelerin Almancayla aynı kalması doğrudur.
- Örnek cümlenin Almanca cümlenin birebir çevirisi olmaması doğrudur.
- Türkçe karşılık — bu çalışmanın konusu değil.

## Çıktı

Sana söylenen dosyaya, yalnızca geçerli bir JSON dizisi. Değişmeyecek maddeler
çıktıda **yer almaz**.

```json
[
  { "id": 717, "gsw": "letscht",
    "reason": "başlıkta sondaki tire artığı var; Almanca tarafı 'letzte' olarak düzeltildi" },
  { "id": 1042, "gswBeispiel": "Vill Jugendlichi ghööred de ganz Tag Musig.",
    "reason": "örnek cümle Hochdeutsch kalmış" },
  { "id": 254, "gswArtikel": "d",
    "reason": "die Karte dişil, Züritüütsch artikeli 'd' olmalı" }
]
```

Alanlar: `id` (zorunlu), `gsw` / `gswArtikel` / `gswBeispiel` (en az biri),
`reason` (zorunlu, tek cümle).

Bitince yalnızca şu satırı döndür: `<dosya>: <öneri sayısı>/<incelenen>`
