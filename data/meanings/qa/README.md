# Anlam kalite denetimi (bekleyen düzeltmeler)

Kelime kartlarının anlamsal denetimi: anlam doğru ve doğal mı, `tr` ile `en` aynı anlamı mı gösteriyor,
örnek cümle kelimeyi o anlamda mı kullanıyor, çeviriler doğru mu. Biçim kuralları `../SPEC.md`; mekanik
denetleyici (`check.mjs`) anlamı ölçmüyor, bu klasör o boşluk için.

**Bu klasörü hiçbir seed ya da deploy okumaz.** Dosyalar karar kaydı; veriye `apply.py` işler (`applied` tarihi).

## Akış (bir parça: dil × seviye)

1. Paket (~100 madde, sıklık sırasıyla) → öğretmen yönergesiyle denetim → bulgular.
2. Claude karara bağlar → `<parça>.json` (`fixes`: before/after/voiced, `rejected`).
3. Sessizler hemen: `python3 data/meanings/qa/apply.py <parça> --sessiz`.
4. Sesliler: kayıtlar üretilir (Mac `~/Workspace/tts-test/anlam_is.sh <koşu>`, sıkı kapı) → canlı tabloya EKLENİR
   (`anlam_yayin.py <koşu>`) → `tts-own-coverage` kapsam tam → `apply.py <parça> --sesli`.
5. Her uygulamadan sonra: `node data/meanings/qa/conv-vocab.mjs` (anlamı değişen kelimeyi tanıtan konuşmalar) ve
   `npm run check:meanings-overlay`, `node data/meanings/check.mjs all` (ayırt edilemez ikiz!), `check:conversations-native`.

## Neden bekliyor: önce ses, sonra veri

Kelime katmanının sesi yalnız Defne/Aras kayıtlarından ve düşüşsüz (`docs/plan/tts-own-voices.md`).
Sesli alanlar: başlık, `formen` (çoğul), `beispiel` (+ boşluk doldurma ve her dizme kutusu), `tr`/`en`
(yürüyüş modunda anlam). `beispielTr`/`beispielEn` sessiz. Sesli alanı değişen madde, kaydı üretilmeden
canlıya çıkarsa SUSAR. Sıra: düzeltme metinlerinin kaydı Mac'te üretilir ve yayınlanır (Linux 2026-10-05'ten beri yok) → sonra
düzeltme `out/` paketine (ya da İngilizce kursta `data/en-de/out`) işlenir, `meanings:check` + commit.
Her düzeltmenin `voiced` alanı hangi kaydın gerektiğini söyler; boşsa (yalnız çeviri) hemen uygulanabilir.

## Yöntem (pilot: Almanca A1, 2026-10-04; B1–C1 2026-10-05 gece hattı: denetim + baş editör hakemi + Claude incelemesi)

- Paketler sıklık sırasıyla ~100 madde. Denetçi: "yayından önce kartları kontrol eden, ana dili Türkçe
  Almanca öğretmeni; kartı ezberleyen öğrenci yanlış bir şey öğrenir mi" yönergesi.
- Ölçüm: ilk (sözlük editörü) yönerge gerçek bulguların yarısından azını yakaladı (bir pakette 0'a 6);
  öğretmen yönergesi ilkinin bulduğu her şeyi de buldu. Bundan sonra yalnız o.
- Her bulguyu Claude karara bağlar (kabul, düzelterek kabul, red); yeni cümleler `contains`, 4–12 kelime
  ve yayımlanmış liste kapısından geçer. Zevk farkı reddedilir.
- Maliyet: 100 madde ≈ 65–70 bin token (alt ajan).

## Dosyalar

| Dosya | Durum |
|---|---|
| `de-a1.json` | 906 madde · 68 düzeltme uygulandı |
| `de-a2.json` | 1447 madde · 121 düzeltme uygulandı |
| `de-b1.json` | 1845 madde · 72 düzeltme uygulandı |
| `de-b2.json` | 2061 madde · 127 düzeltme uygulandı |
| `de-c1.json` | 2456 madde · 191 düzeltme uygulandı |
| `en-a1.json` | 690 madde · 58 düzeltme uygulandı · 13 İngiliz başlık karar bekliyor (`kararBekleyen`) |
| `en-a2.json` | 1102 madde · 95 düzeltme uygulandı · 5 İngiliz başlık karar bekliyor (`kararBekleyen`) |
| `en-b1.json` | 1521 madde · 101 düzeltme uygulandı · 16 İngiliz başlık karar bekliyor (`kararBekleyen`) |
| `en-b2.json` | 2225 madde · 181 düzeltme uygulandı · 28 İngiliz başlık karar bekliyor (`kararBekleyen`) |
| `en-c1.json` | 1634 madde · 133 düzeltme uygulandı · 11 İngiliz başlık karar bekliyor (`kararBekleyen`) |

İngilizce kursta Almanca örnek cümle kartın Almanca karşılığını içermeli (`check:en-de`): karşılık değişirse
cümle de değişir ya da karşılık korunur.

## Havuz uzlaştırması (2026-10-04, c6ec059bc)

`meanings/out` katmanı `words.json`dan 559 alanda ayrışmıştı (28 Eylül toplu düzeltmeleri başka kelimelerin
değerlerini yanlış maddelere yazmış; canlıda sein "yer almak", Treppe "bekleme süresi"). Her çelişen alan
hakemle seçildi; iki dosya aynı. Kapı: `check:meanings-overlay` (CI). Denetim paketleri canlı değerden değil
words.json'dan kuruluyordu; uzlaştırmadan sonra ikisi aynı.

Tekrarlayan kalıp (ajansız taranabilir, henüz düzeltilmedi): yaşı belirtilmeyen `Bruder`/`Schwester`
→ "ağabey"/"abla", `Oma` → "anneanne"/"babaanne" (iki bankada ~60 cümle).
