# Bekleyen Züritüütsch karşılıklar

Almanca havuz B2/C1 genişlemesiyle 4.046'dan 7.429 maddeye çıktı. Bu dizindeki
17 paket, **lehçe karşılığı henüz üretilmemiş 3.383 maddeyi** içerir
(id 4047–7429, B2 1.640 · C1 1.743).

Bu maddeler bugün Zürih kursunda **görünmez**: `seed-zurich.ts` eksikleri
seviye bazında raporlar ve yüklemeye devam eder, hata fırlatmaz.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `part-01.json` … `part-17.json` | Girdi paketleri, 200'erlik. Her madde: `id, de, artikel, tr, typ, niveau, beispiel` |
| `SPEC-ZH.md` | Dönüşüm şartnamesi — bağlayıcı. `../style-guide.md` ile birlikte okunur |
| `merge.js` | Çıktıları `../chunk-18.json` … biçiminde yazar, bütünlüğü denetler |

## Nasıl tamamlanır

1. Her paket için `SPEC-ZH.md`'ye göre çıktı üret; çıktı dosyaları
   `<scratch>/zh-out/part-NN.json` olarak yazılır. Beklenen alanlar:
   `{ "id": …, "gsw": "…", "artikel": "de|d|s|null", "beispiel": "…" }`
   — madde sayısı ve sırası girdiyle birebir aynı olmalı.
2. `node merge.js --dry` ile denetle. Denetlenenler: kaynakta olmayan id,
   geçersiz artikel, `ß` kullanımı, boş `gsw`, cümlede kelimenin bulunmaması.
3. `node merge.js` yeni `chunk-*.json` parçalarını yazar.
4. `npm run db:seed:zurich` — uyarı satırı kaybolmalı, "eksik" sayısı 0 olmalı.

## Dikkat

- **Yerelleştirme yok.** Almanca cümledeki yer adı, sayı ve kişi adı aynen
  korunmalı. Türkçe çeviriler Almanca cümleden üretildiği için içerik
  örtüşmezse çeviri o maddede boş bırakılır (bkz. `seed-zurich.ts`,
  `translationFits`). İlk turda bu hata 374 maddeye mal olmuştu.
- **Zorla lehçeleştirme yok.** Akademik/uluslararası kelimeler (Analyse,
  Struktur, Prämisse) lehçede büyük ölçüde aynı kalır; yalnızca ses kuralları
  uygulanır. B2/C1 havuzunun büyük kısmı bu türdendir.
- Artikel eşlemesi belirlenimlidir: `der → de`, `die → d`, `das → s`.
