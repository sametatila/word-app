# Züritüütsch dönüşüm şartnamesi (B2 / C1 yeni kelimeler)

Sana verilen JSON parçasındaki her Almanca maddenin **Zürih Almancası** karşılığını
üreteceksin. Yazım kuralları için ÖNCE şunu oku ve harfiyen uy:

`/mnt/windows/Users/LinkinqArk/Desktop/Workspace/word-app/data/zurich/style-guide.md`

Rehber bağlayıcıdır; başka kaynakla çelişirse rehber kazanır.

## Girdi

Sana bir dosya yolu verilir. İçinde şu biçimde maddeler var:

```json
{ "id": 4123, "de": "Belegschaft", "artikel": "die", "tr": "personel",
  "typ": "Nomen", "niveau": "B2",
  "beispiel": "Die gesamte Belegschaft wurde über die Fusion informiert." }
```

## Çıktı

Her madde için TAM OLARAK şu alanlar — başka alan yok, sıra ve sayı girdiyle birebir aynı:

```json
{ "id": 4123, "gsw": "Belegschaft", "artikel": "d", "beispiel": "Di ganz Belegschaft isch über d Fusion informiert worde." }
```

- `id` — girdideki id, **değiştirme**.
- `gsw` — kelimenin Züritüütsch biçimi, **artikelsiz**. Fiiller mastar hâlde (-e).
- `artikel` — `"de"` | `"d"` | `"s"` | `null` (isim değilse null).
- `beispiel` — Almanca örnek cümlenin **doğal Züritüütsch karşılığı**.

## Kritik kurallar

1. **Cümle mutlaka `gsw` alanındaki kelime biçimini içermeli** — boşluk doldurma
   oyunu bu kelimeyi cümlede arar. Çekimli hâl kabul, ama kökü taşımalı.
2. **Yerelleştirme yapma.** Almanca cümlede Berlin geçiyorsa Zürih yazma, sayı
   değiştirme, kişi adı değiştirme. Bu maddelerin Türkçe çevirisi Almanca cümleden
   üretildiği için içerik birebir örtüşmeli. (Eski partilerde bu hata yapıldı;
   374 madde bu yüzden çevirisiz kaldı — tekrarlama.)
3. **ß asla kullanma**, her zaman `ss`.
4. **Präteritum yok** — geçmiş için Perfekt kullan (`isch … worde`, `hät … gmacht`).
5. **Genitiv yok** — `vo` + Dativ ya da iyelik yapısı (`em Vatter sis Huus`).
6. Uluslararası/akademik kelimeler (Analyse, Konzept, Struktur, Prämisse) lehçede
   çoğu zaman aynı kalır; yalnızca ses kurallarını uygula (`-tion` → `-tion`,
   söz başı `K` yabancı kelimede `K` kalır). Zorla "lehçeleştirme" yapma —
   `d Analyse` doğrudur, `d Analüüse` değil.
7. Bileşik ve soyut isimlerde artikel Almancadakiyle aynı cinsi izler:
   der → `de`, die → `d`, das → `s`.

## Çıktı biçimi

Yalnızca JSON dizisi olarak, sana söylenen dosya yoluna Write ile yaz.
Markdown, kod bloğu, açıklama yok — dosyanın tamamı geçerli JSON olmalı.
Madde sayısı girdiyle **birebir aynı** olmalı.

Bitince yalnızca şu satırı döndür: `<dosya adı>: <madde sayısı>`
