# İngilizce kursun ünite egzersizleri (WP-75) — 2026-09-11

**Açılıştaki kusur.** WP-74 İngilizce kursun DERS katmanını kapattı (A1'den
C1'e 500 ders). Kapanır kapanmaz Patika'nın öteki yarısı görünür oldu:
İngilizce kursun **hiçbir seviyesinde ünite egzersizi yoktu**.

| Kurs · seviye | ünite egzersizi | kütüphane |
|---|---|---|
| de A1/A2/B2/C1 | 150 (25 ünite × 6) | 25 |
| de B1 | 270 (45 ünite × 6) | 25 |
| **en A1…C1** | **0** | 25 |

100 ders 25 ünite eder (`UNIT_LESSONS = 4`) ve her ünitenin deseni
`4 ders + 2 okuma + 2 dinleme + 2 yazma + gramer + tekrar + kontrol`.
Yani İngilizce öğrencisi her ünitede **altı boş yuva** görüyordu: başlığı
"Okuma", altı "yakında", `ref: null`, tıklanmıyor. Beş seviyede
**750 boş yuva**.

Beceriler kütüphanesi (WP-90, kurs × seviye × beceri başına beş egzersiz)
bu boşluğu KAPATMIYOR ve kapatmamalı: kütüphane `unit` alanı taşımıyor,
Patika ona hiç bakmıyor (`build.ts` → `pathMetas`) ve ölçüsü başka —
kütüphanede öğrenci seviyeyi kendi seçiyor, Patika'da ünite sırayla
geliyor.

## Sözleşme

Almanca kursun ünite dosyalarının aynısı; `src/lib/skills/content/`
altında `en-<seviye>-u<NN>.ts`, kimlik `en-<seviye>-u<n>-<r|l|w><1|2>`,
her dosya ünite başına altı egzersiz. Sıra ÖNEMLİ: builder yuvaları liste
sırasıyla dolduruyor, yani ünite n'in dosyası `en-<seviye>.ts` içinde
n'inci sırada durur.

- **Ünitenin kendi kelimesi.** İçerik o üniteye kadar öğretilen kelime ve
  kalıpların dışına çıkmaz; çıkan her sözcük egzersizin sözlükçesinde
  verilir. Ölçü `npm run check:en-unitvocab -- <seviye>`.
- **En az iki yazılı soru.** `test:content` kuralı; okuma/dinlemede
  gapfill + short_answer/dictation/order.
- **Sözlükçe metinden.** Sözlükçedeki her madde egzersizin kendi metninde
  geçer (aynı kural, `test:content`).
- **Anadil ekseni.** Her egzersiz iki hatta karşılık ister:
  `data/skills/prose-de` (intro/explain/gloss.tr → Almanca) ve
  `data/skills/task-de` (görev metinleri → Almanca). İngilizce yönü
  (`prose`, `task`) Almanca kursun egzersizlerini taşıyor; İngilizce kursun
  egzersizleri oraya girmiyor, çünkü anadili İngilizce olan kullanıcı
  İngilizce kursu almıyor.

## Ölçüm: `check:en-unitvocab`

Almanca `check:unitvocab`'ın karşılığı. Ölçen makine iki denetleyicide
ORTAK (`scripts/lib/en-gate.ts`): serbest işlev sözcükleri, düzensiz fiil
tablosu, gövde türetme. Havuzu çağıran veriyor —
`check:libvocab` seviyeyi, bu betik "bu üniteye kadar öğretilenler"i.
Makine kütüphane denetleyicisinden çıkarıldı, kopyalanmadı: kopya
ayrışınca iki denetleyici aynı metin için farklı oran basardı.

Kapı değil rapor: çıkan sözcüğün sözlükçeye mi gireceğine yoksa metinden
mi çıkacağına yazar karar verir.

## Durum

| Seviye | Ünite | Durum |
|---|---|---|
| A1 | 1 | **yazıldı** (2026-09-11) |
| A1 | 2–25 | bekliyor |
| A2 · B1 · B2 · C1 | 1–25 | bekliyor |

**A1 ünite 1 (2026-09-11).** Dört dersi Hello! · How are you? · I am, you
are · Where are you from?. Altı egzersiz: iki okuma ("Three names",
"Are you a student here?"), iki dinleme ("My name is Ava", "Excuse me,
are you Mr. Kaya?"), iki yazma ("I introduce myself", "Questions and
answers"). Ünite dışı ölçüm %0,3 — kalan tek belirteç metnin ilk
sözcüğü olan özel ad.

Almanca kursun ilk ünitesinden bilerek AYRILAN yer: burada ilk üniteye
dikte konuldu. Gerekçe İngilizcenin kendi zorluğu — „I am a teacher“
söylendiğinde „I'm a teacher“ duyuluyor ve öğrenci bunu ilk günden ayırt
etmek zorunda; Almancada bu ünitede öyle bir büzülme yok.

Anadil ekseni aynı turda kapandı: `prose-de` s-017 (43 dize),
`task-de` t-010 (22 dize). İki satır çeviri değil YENİDEN ÖLÇÜM istedi —
"Türkçede tek sözcük olan soru" ve "İngilizcede özne düşmez" Almanca
okuyan için doğru değil (Almanca da özneyi düşürmez, „woher“ de tek
sözcüktür); Almanca karşılıkları İngilizceyi Almancaya karşı ölçüyor.

## Tamamlanma ölçütü

- `en-<seviye>-u<NN>.ts` × 25 × 5, ünite başına 2 okuma + 2 dinleme + 2 yazma
- `buildTrack` her seviyede 150/150 beceri yuvasını dolduruyor
- `test:content` bütçesi büyümemiş, `check:en-unitvocab` her ünitede raporlu
- `check:skills-prose-de` ve `check:skills-task-de` kapsam tam
- `check:dumps` kaynakla aynı
