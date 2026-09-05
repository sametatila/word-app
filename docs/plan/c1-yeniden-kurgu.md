# C1 patikası — kelime havuzuna göre yeniden kurgu

A1, A2, B1 ve B2'de yapılan işin C1 karşılığı. Yöntem ve kazanılmış mimari
bulgular için `docs/plan/a2-yeniden-kurgu.md` §7-§10.

## 1. Ölçülmüş başlangıç (2026-09-05)

100 ders × 5 kelime = 500 yuva.

| Ölçüt | Başlangıç |
|---|---|
| C1 katmanından | 88 (%17,6) |
| B2 / B1 / A2 / A1 katmanından | 73 / 51 / 17 / 7 |
| **Havuzda hiç yok** | **264 (%52,8)** |
| C1 katmanı kapsama | 88/2177 (%4,0) |
| Beceri egzersizi (o/d/y) | 12 / 12 / 8 — hedef 50 |
| Ünite hizalı ünite | 0/25 |

## 2. Alınan iki karar

**Sözlükçe sekize çıktı** (5 → 8, yuva 500 → 800). Gerekçe kapsama değil:
katman 2468, sekizle bile tavan %32. Karar sahibinindir ve alındı.

**Kapsam: sonuna kadar** — havuz, atama, ders içeriği ve 118 beceri egzersizi.

## 3. Yapılanlar

### Havuz boşluğu sıfırlandı (264 → 0)

On modülde 293 madde eklendi (id 8555-8846). Bunun 59'u çok kelimeli: işlevsel
fiil öbekleri (`in Frage kommen`, `zur Verfügung stehen`) ve deyimler. Havuzun
kendi emsali izlendi — çok kelimelide `rank` null, `formen` boş, tür Verb /
Sonstiges / artikelli Nomen.

**Ölçüm tuzağı:** havuzun `rank` alanı C1'de çoğunlukla boş. Ona güvenilseydi
aday sayısı 145 görünürdü; sıklık `de_50k.txt`'ten hesaplanınca 637 çıktı.
A2'de de aynı tuzağa düşülmüştü.

**İkinci tuzak:** çok kelimeli maddede sıklığı ilk kelimeden okumak `in Frage
kommen` için 16 verir — o, "in" edatının sıklığıdır. Hepsinde null bırakıldı.

### Sözlükçe sekize çıktı (100 ders)

Modül modül, her modülde 30 yeni kelime; hepsi havuzun C1 katmanından ve konu
uyumlu. Doğrulayıcı geçiş boyunca 5 ya da 8 kabul etti, dönüşüm bitince tam
sekize kilitlendi.

| | Başlangıç | Şimdi |
|---|---|---|
| Yuva | 500 | **800** |
| C1 katmanından | 88 (%17,6) | **652 (%81,5)** |
| Havuzda hiç yok | 264 | **0** |
| Kapsama | %4,0 | **%26,4** |
| Seviye içi tekrar | 0 | 0 |

## 4. Alt seviye kelimeler bilerek bırakıldı — A2'den farklı karar

800 yuvanın 148'i alt seviyeden geliyor (B2 73, B1 51, A2 17, A1 7). A2'de bu
bir kusurdu; C1'de değil, ve gerekçesi ölçülebilir.

**Birincisi:** C1 öğrencisi için SRS bandı `[B2, C1]`'dir (`session.ts`,
`levelBand`: alt + seviye + üst, C1'de üst yok). Yani **B2'nin 73'ü zaten
tekrar ediliyor** — onları değiştirmek hiçbir şey kazandırmaz.

**İkincisi:** bandın altındaki 75 madde tek tek okundu ve neredeyse hepsi
dersin KENDİ KONUSU: `der Witz` kelime oyunu dersinde, `der Humor` Alman
mizahı dersinde, `der Dialekt` lehçe dersinde, `das Kompliment` iltifat
dersinde, `trocken` kuru mizah dersinde, `das Gegenteil` ironi dersinde,
`die Rede` büyük konuşma dersinde. Yirmi dört A1/A2 maddesinden yalnız biri
(`tragen`) rastlantısal.

Bunları C1 kelimesiyle değiştirmek dersin konusunu elinden alırdı. C1'in
tanımı zaten bu: yeni kelime değil, bilinen kelimeler arasında SEÇİM.
Alt seviye bir kelimeyi C1 dersinde kullanmak onu öğretmek değil, malzeme
olarak kullanmaktır.

Bedeli açık ve kabul edildi: 148 yuva yeni C1 kelimesine gitmiyor, kapsama
%26,4'te kalıyor (hepsi değişseydi ~%32).

## 5. Kalan iş

**118 beceri egzersizi.** Okuma 12→50, dinleme 12→50, yazma 8→50. Ünite hizalı
ünite 0/25. Yöntem A2'dekiyle aynı: ünite dosyaları `c1.ts` listesinde EN
BAŞTA durmalı (`buildTrack` liste sırasıyla yerleştirir), eski egzersizlerin
kimliği silinmez (`user_skills` birincil anahtarı), her okuma/dinlemede en az
iki yazılı soru ve en az bir çoktan seçmeli (sonuncusu sınav havuzu için).
