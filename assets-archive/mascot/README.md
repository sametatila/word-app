# Arşivlenmiş Erdi klipleri

Bu dizin **yayına girmiyor**: ne mobil ikiliye (metro yalnız `require` edilen
varlığı paketliyor) ne web deploy'una (`public/` dışında). Klipler silinmedi,
buraya alındı — üretim hattı tek seferlikti ve yeniden üretmek pahalı.

Sebep: **animasyon 2026-09-18'den beri yalnız Öğren sekmesinin günlük turunda**
(Samet'in kararı; gerekçe `mobile/src/ui/Mascot.tsx` ve
`src/components/mascot.tsx` dosya başlarında). Turun dışında kalan yüzeyler
maskot çizmediği için bu kipleri kimse istemiyor.

| Klip | Eskiden nerede çiziliyordu |
|---|---|
| `sleep.webp` | Öğren kahramanı (serisi kırık dönen kullanıcı), web bildirim izni kartı |
| `think.webp` | Sınav girişleri, seviye testi, "bu oyuna kelime yok", deneme puanlaması |

Mobil ve web kopyaları bayt bayt aynıydı, o yüzden arşivde tek kopya var.
`wave.webp` arşive GİRMEDİ: mobilde kutlama pop'u onu hâlâ kullanıyor
(`ui/MascotPop` `CHEERS`); artık kullanmayan web kopyası silindi.

## Geri getirmek

1. Dosyayı ilgili yere kopyala: mobil `mobile/src/assets/mascot/`,
   web `public/anim/`.
2. Kip haritasına satırı ekle: mobil `ui/Mascot.tsx` `CLIP`,
   web `components/mascot.tsx` `Mood` + `CLIP`.
3. Yalnız günlük tur ağacından çağır — `check:parity` "maskot yalnız günlük
   turda" kuralı başka bir yüzeyden çağrılırsa kırılır.
