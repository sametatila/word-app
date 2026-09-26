# Arşivlenmiş Nomi klipleri

Bu dizin yayına girmez: metro yalnız `require` edilen klibi paketler, web yalnız `public/` altını yayınlar.
Klipler silinmedi, çünkü üretim hattı tek seferlikti.

Nomi yalnız Öğren ekranındaki günlük tur kutusunda durur (25a4e1df; gerekçe `mobile/src/ui/Mascot.tsx`
ve `src/components/mascot.tsx` başında). Aşağıdaki kliplerin çağıranı kalmadı.

| Klip | Eskiden nerede |
|---|---|
| `sleep`, `think`, `wave` | Öğren kahramanı, sınav girişleri, ana sayfa kahramanı ve benzeri yüzeyler |
| `walk-left`, `walk-right`, `stroll-left`, `stroll-right`, `peek`, `peek-mirror`, `pull-left`, `pull-right` | Günlük tur içi: ortam yürüyüşü, cevap şeridini çekme |

## Geri getirmek

1. Dosyayı kopyala: mobil `mobile/src/assets/mascot/`, web `public/anim/`.
2. Kip haritasına ekle: mobil `ui/Mascot.tsx` `CLIP`, web `components/mascot.tsx` `Mood` + `CLIP`.
3. `check:parity` iki kuralı kırılır ve güncellenmelidir: "maskot yalniz gunluk tur kutusunda"
   (Nomi'yi çizen dosya listesi) ve "arsivlenen klipler yayinda degil" (`sleep`, `think`, `wave`).
