# A2 kelime üretimi — şartname

Bu havuzun A2 katmanını genişletiyoruz. Resmî Goethe A2 listesi tükendi, bu
yüzden yeni maddeler **A2 seviyesine uygun günlük kelimelerden** kurulacak.

## Sana verilen

- Bir **anlamsal alan** (örn. "Sağlık ve vücut") ve üretmen gereken madde sayısı.
- `existing.txt` — havuzda **zaten bulunan 7.399 kelime**. Bunlardan hiçbirini
  yeniden üretme.
- `de_50k.txt` — Almanca sıklık listesi (kelime + sayaç). Kalite kapısı: ürettiğin
  kelimelerin çoğu bu listede geçmeli.

## Çıktı biçimi

Yalnızca geçerli bir JSON dizisi, sana söylenen dosyaya. Markdown, kod bloğu,
açıklama yok. Her madde tam olarak şu alanlarla:

```json
{
  "de": "Krankenkasse",
  "artikel": "die",
  "tr": "sağlık sigortası",
  "formen": "-n",
  "typ": "Nomen",
  "beispiel": "Meine Krankenkasse bezahlt die Brille nicht.",
  "beispielTr": "Sağlık sigortam gözlüğü ödemiyor."
}
```

| Alan | Kural |
|---|---|
| `de` | Sözlük biçimi. İsimlerde artikelsiz tekil, fiillerde mastar, dönüşlü fiillerde `sich ...` |
| `artikel` | `der` / `die` / `das` — yalnız isimlerde, değilse `""` |
| `tr` | Doğal Türkçe karşılık. Birden çok anlam varsa virgülle, en yaygın olan başta |
| `formen` | İsimde çoğul eki (`-e`, `-n`, `¨-e`, `-`, `(Sg.)`), fiilde çekim (`arbeitet, hat gearbeitet`), diğerlerinde `""` |
| `typ` | `Nomen` / `Verb` / `Sonstiges` |
| `beispiel` | A2 seviyesinde, günlük, **kelimeyi içeren** tek cümle |
| `beispielTr` | Örnek cümlenin doğal Türkçe çevirisi |

## Seviye ölçütü — en önemlisi

A2, temel günlük dildir. Öğrenci alışveriş yapar, randevu alır, yol tarifi sorar,
işinden ve ailesinden bahseder.

**Uygun:** Krankenkasse, Termin, Rechnung, Nachbar, Bahnsteig, Erkältung,
umziehen, kündigen, reservieren, pünktlich, günstig, ledig

**Uygun DEĞİL:**
- Soyut/akademik (B2–C1): Nachhaltigkeit, Wahrnehmung, Ambivalenz, erörtern
- Çok nadir ya da uzmanlık: Zylinderkopfdichtung, Grundbuchamt
- Özel adlar: Berlin, Goethe, Facebook
- Çekimli biçimler: gegangen, arbeitest, größer — yalnız sözlük biçimi

Emin değilsen `de_50k.txt`'e bak: kelime listede ne kadar yukarıdaysa o kadar
günlüktür. Listede hiç geçmeyen bir kelime büyük ihtimalle A2 değildir.

## Tür dengesi — kotan varsa uy

Bir dil yalnızca isimlerden öğrenilmez. Mevcut A2 havuzu dengelidir:
%44 isim, %27 fiil, %30 sıfat/zarf/diğer. Sana bir tür kotası verildiyse ona
uy; verilmediyse **en az üçte biri fiil ve sıfat/zarf olsun**.

Tematik bir alanda çalışırken isim üretmek kolaydır (mobilya, oda, eşya) ama o
alanın fiilleri ve sıfatları da vardır: *umziehen, mieten, renovieren, heizen*;
*gemütlich, möbliert, ruhig, eng*. Bunları atlama.

## Kesin kurallar

1. **Benzersizlik.** `existing.txt`'te olan hiçbir kelimeyi üretme. Kendi
   listende de tekrar olmasın. Bileşiklerde dikkat: "Haus" varsa "Hausaufgabe"
   yeni bir kelimedir ve serbesttir, ama "Hausaufgabe" varsa tekrar yazma.
2. **ß kullanımı serbest** ama doğru olmalı (`Straße`, `groß`, `Fuß`).
3. **Örnek cümle kelimeyi içermeli** — çekimli hâl kabul, kökü taşımalı.
4. **Türkçe çeviri örnek cümleyle birebir örtüşmeli.** Cümledeki sayı, yer ve
   kişi adları çeviride aynen kalmalı.
5. Artikel isimlerde **zorunlu**; uydurma, emin ol. Bileşik ismin artikeli son
   bileşenden gelir (`die Hausaufgabe`, çünkü `die Aufgabe`).
6. Her alan dolu olmalı; `typ` ile `artikel`/`formen` tutarlı olsun.

## Bitirince

Yalnızca şu satırı döndür: `<dosya adı>: <madde sayısı>`
