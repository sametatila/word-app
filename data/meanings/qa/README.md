# Anlam kalite denetimi (bekleyen düzeltmeler)

Kelime kartlarının anlamsal denetimi: anlam doğru ve doğal mı, `tr` ile `en` aynı anlamı mı gösteriyor,
örnek cümle kelimeyi o anlamda mı kullanıyor, çeviriler doğru mu. Biçim kuralları `../SPEC.md`; mekanik
denetleyici (`check.mjs`) anlamı ölçmüyor, bu klasör o boşluk için.

**Bu klasörü hiçbir seed ya da deploy okumaz.** Dosyalar karara bağlanmış ama UYGULANMAMIŞ düzeltmeler.

## Neden bekliyor: önce ses, sonra veri

Kelime katmanının sesi yalnız Defne/Aras kayıtlarından ve düşüşsüz (`docs/plan/tts-own-voices.md`).
Sesli alanlar: başlık, `formen` (çoğul), `beispiel` (+ boşluk doldurma ve her dizme kutusu), `tr`/`en`
(yürüyüş modunda anlam). `beispielTr`/`beispielEn` sessiz. Sesli alanı değişen madde, kaydı üretilmeden
canlıya çıkarsa SUSAR. Sıra: düzeltme metinlerinin kaydı Linux 4060'ta üretilir ve yayınlanır → sonra
düzeltme `out/` paketine (ya da İngilizce kursta `data/en-de/out`) işlenir, `meanings:check` + commit.
Her düzeltmenin `voiced` alanı hangi kaydın gerektiğini söyler; boşsa (yalnız çeviri) hemen uygulanabilir.

## Yöntem (pilot: Almanca A1, 2026-10-04)

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
| `de-a1.json` | 906 madde: 69 düzeltme (orta 21, hafif 48, ağır 0), 3 red; 39'u sesli alan (11 yeni cümle). Uygulanmadı. |

Tekrarlayan kalıp (ajansız taranabilir, henüz düzeltilmedi): yaşı belirtilmeyen `Bruder`/`Schwester`
→ "ağabey"/"abla", `Oma` → "anneanne"/"babaanne" (iki bankada ~60 cümle).
