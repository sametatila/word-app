# STT kota ölçümü — Groq · Cloudflare · Gladia (WP-20)

Ölçüm: 2026-08-26 · üretim verisi, son 30 gün · `npm run report:stt` ile yenilenir.

## Gözlenen kullanım (son 30 gün)

- Aktif kullanıcı: 3 (30 gün); DAU ortalama 2.0, en yüksek 3.
- STT istekleri (pocket-mic → /api/stt): 124 istek, 766 sn ses; klip ortalama 6.2 sn, p95 20.0 sn; başarı 82 %, ilk cevap ortalama 537 ms.
- Sağlayıcı dağılımı: groq/whisper-large-v3-turbo 66 istek (354 sn, ok 53); deepgram/nova-3 45 istek (216 sn, ok 41); mistral/voxtral-mini-latest 13 istek (196 sn, ok 8).
- En yoğun gün: Sun Aug 23 — 92 istek, 573 sn; en yoğun saat: 68 istek, 502 sn; en yoğun dakika: 8 istek.
- Rol yapma turu: 88 (30 gün); konuşma egzersizi denemesi: 5.
- Günlük ortalama: 26 sn ses, 4.1 istek → kullanıcı başına gün başına 13 sn / 2.1 istek.

## Hedef model (WP-20 açıkken, kullanıcı başına gün başına)

10 söyleyiş × 4 sn + 5 rol yapma turu × 7 sn + 0.3 monolog × 45 sn + 0.1 sınav × 35 sn, tekrar çarpanı 1.4 → **129 sn ve 21.6 istek / kullanıcı / gün**; en yoğun saat günün %30'u, en yoğun dakika %5'i.

## Kotalar

- Groq: 28.800 sn/gün, 7.200 sn/saat, 2.000 istek/gün, 20 istek/dk — günlük.
- Cloudflare: 10 000 neuron/gün ÷ 46,63 neuron/dk ≈ 214 dk = 12.867 sn/gün — günlük (10 000 neuron); saat/dakika sınırı belirtilmemiş.
- Gladia: 50 € tek seferlik ≈ 80 saat = 288.000 sn TOPLAM — yenilenmez (eski "10 saat/ay" bilgisi geçersiz).

## Gözlenen davranış — DAU'ya göre

| DAU | sn/gün | sn/tepe saat | istek/gün | istek/tepe dk | Groq | Cloudflare | Gladia kredisi kaç gün |
|---|---|---|---|---|---|---|---|
| 1 | 13 | 4 | 2 | 0.1 | ✓ | ✓ | 22.558 |
| 5 | 64 | 19 | 10 | 0.5 | ✓ | ✓ | 4.511 |
| 10 | 128 | 38 | 21 | 1.0 | ✓ | ✓ | 2.255 |
| 25 | 319 | 96 | 52 | 2.6 | ✓ | ✓ | 902 |
| 50 | 638 | 192 | 103 | 5.2 | ✓ | ✓ | 451 |
| 100 | 1.277 | 383 | 207 | 10.3 | ✓ | ✓ | 225 |
| 250 | 3.192 | 958 | 517 | 25.8 | ✗ (dk-istek) | ✓ | 90 |
| 500 | 6.383 | 1.915 | 1.033 | 51.7 | ✗ (dk-istek) | ✓ | 45 |
| 1000 | 12.767 | 3.830 | 2.067 | 103.3 | ✗ (gün-istek, dk-istek) | ✓ | 22 |

Eşik: Groq ≤ **186 DAU**, Cloudflare ≤ **963 DAU**.

## Hedef model — DAU'ya göre

| DAU | sn/gün | sn/tepe saat | istek/gün | istek/tepe dk | Groq | Cloudflare | Gladia kredisi kaç gün |
|---|---|---|---|---|---|---|---|
| 1 | 129 | 39 | 22 | 1.1 | ✓ | ✓ | 2.236 |
| 5 | 644 | 193 | 108 | 5.4 | ✓ | ✓ | 447 |
| 10 | 1.288 | 386 | 216 | 10.8 | ✓ | ✓ | 223 |
| 25 | 3.220 | 966 | 539 | 27.0 | ✗ (dk-istek) | ✓ | 89 |
| 50 | 6.440 | 1.932 | 1.078 | 53.9 | ✗ (dk-istek) | ✓ | 44 |
| 100 | 12.880 | 3.864 | 2.156 | 107.8 | ✗ (gün-istek, dk-istek) | ✗ (gün-sn) | 22 |
| 250 | 32.200 | 9.660 | 5.390 | 269.5 | ✗ (gün-sn, saat-sn, gün-istek, dk-istek) | ✗ (gün-sn) | 8 |
| 500 | 64.400 | 19.320 | 10.780 | 539.0 | ✗ (gün-sn, saat-sn, gün-istek, dk-istek) | ✗ (gün-sn) | 4 |
| 1000 | 128.800 | 38.640 | 21.560 | 1078.0 | ✗ (gün-sn, saat-sn, gün-istek, dk-istek) | ✗ (gün-sn) | 2 |

Eşik: Groq ≤ **18 DAU**, Cloudflare ≤ **99 DAU**.

## Yorum

- Bugünkü kullanım (≤ 4 DAU) üç sağlayıcının hepsinin çok altında; Groq tek başına yeter.
- Hedef modelde ilk kırılan sınır Groq'un **dakikada 20 istek** eşiği (tepe dakika), günlük saniye değil: aynı anda konuşan 20+ kişi. Çare: istemci tarafında 1 sn'lik kuyruk/geri çekilme ve 429'da Cloudflare'a düşmek.
- Cloudflare günlük ~214 dakika verir, saat sınırı yok: Groq'un dakika sınırı aşılınca tepe saatlerde ikinci hat.
- Gladia kredisi yenilenmediği için ana hat değil; Groq + Cloudflare ikisi de düşerse üçüncü yedek (≈ 80 saat).
- Ölçüm tekrarlanmalı: DAU 25'i geçince (`report:stt`), tepe dakika sayısı 15'e yaklaşınca kuyruk mantığını devreye al.
