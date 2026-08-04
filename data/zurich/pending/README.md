# Züritüütsch üretim hattı

B2/C1 genişlemesinin bekleyen 3.383 maddesi **tamamlandı** (`../chunk-18.json` …
`../chunk-31.json`). Bu dizin artık bekleyen iş değil, Almanca havuz yeniden
büyüdüğünde kullanılacak çalışır bir hat: girdi paketleri ve üretilen çıktılar
birleştirildikten sonra silinir, araçlar kalır.

## Araçlar

| Dosya | Ne işe yarar |
|---|---|
| `SPEC-ZH.md` | Dönüşüm şartnamesi — bir üretim ajanına verilecek metin. `../style-guide.md` ile birlikte bağlayıcıdır |
| `check.js` | Kalite kapısı. `node check.js [part-03]` |
| `merge.js` | Çıktıları `../chunk-NN.json` olarak yazar. Önce `node merge.js --dry` |

## Yeni bir tur nasıl yapılır

1. Karşılığı olmayan maddeleri 200'erlik `part-NN.json` paketlerine böl.
   Her madde: `id, de, artikel, tr, typ, niveau, beispiel`.
2. Her paket için bir ajana `SPEC-ZH.md`'yi ver; çıktı `zh-out/part-NN.json`.
3. `node check.js` — **yerelleştirme sütunu sıfır olmalı.**
4. `node merge.js --dry`, sonra `node merge.js`.
5. `npm run db:seed:zurich`.
6. Tüketilen `part-*.json` ve `zh-out/` dosyalarını sil; parçalar artık kaynak.

## Neden ayrı bir `check.js` var

`merge.js` biçimsel bütünlüğü denetler: bilinmeyen id, geçersiz artikel, `ß`,
boş `gsw`. Ama maddeleri asıl kaybettiren şey bu değil.

`seed-zurich.ts` içindeki `translationFits`, Almanca ve Züritüütsch cümlenin
**sayıları ve yer adları** örtüşmüyorsa o maddenin Türkçe çevirisini düşürür —
çünkü çeviri Almanca cümleden üretilmiştir ve cümle yerelleştirildiyse artık
yanlıştır. İlk turda bu sessizce 374 maddeye mal oldu; kimse paket bazında
görmedi. `check.js` tam olarak bu ölçütü paket paket ölçer.

İkinci fark: `merge.js`'in "cümlede kelime yok" uyarısı düz önek karşılaştırması
yapar ve ayrılabilen fiilleri yanlış işaretler (`abmaane` → `abgmaant` doğrudur).
`check.js` ayrılabilen öneki ve dönüşlü `sich`'i soyup kökü arar; son turda
uyarı 95'ten 18'e indi, kalan 18'in de doğru olduğu görüldü (ablaut/uzatma).

## Değişmeyen kurallar

- **Yerelleştirme yok.** Almanca cümledeki yer adı, sayı ve kişi adı aynen korunur.
- **Zorla lehçeleştirme yok.** Akademik/uluslararası kelimeler (Analyse, Struktur,
  Prämisse) lehçede büyük ölçüde aynı kalır; yalnızca ses kuralları uygulanır.
  B2/C1 havuzunun büyük kısmı bu türdendir.
- Artikel eşlemesi belirlenimlidir: `der → de`, `die → d`, `das → s`.

## Son turun sonucu

3.383 madde · yerelleştirme hatası **0** · `ß` 0 · geçersiz artikel 0 ·
bilinmeyen id 0. Yeni B2/C1 maddelerinin **tamamı** örnek cümle çevirisini
devraldı (2.059/2.059 ve 2.178/2.178). Kalan 374 çevirisiz madde bu turdan
önce var olan `chunk-01…17` içindedir.
