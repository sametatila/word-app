# Haftalık quiz — içerik kuralları

İçerik `src/lib/weekly-quiz/<kurs>/<seviye>-w<NN>.ts` (kurs `de`, `en`; A1–C1, seviye başına 5 hafta,
kayıt `index.ts`). Tip ve gerekçeler: `src/lib/weekly-quiz/types.ts`. Bu dizin (`prose/`) yalnız
Türkçe metinlerin anadil karşılığını taşır.

Quiz sınav değil, gelişim aracı. Madde yalnız "öğrenci bunu bilmiyorsa hangi yanlışı yapar"
sorusunun net cevabı varsa iyidir; `why` o cevabı açıklar.

## Kurallar

| # | Kural | Kapı (`npm run check:quiz`) |
|---|---|---|
| 1 | Blok dağılımı hafta başına sabit: read 2 · listen 2 · grammar 3 · vocab 2 (`QUIZ_PLAN`). `personal` yazılmaz, SRS'ten üretilir | hata |
| 2 | Havuz en az 14 madde (`QUIZ_POOL_MIN`); quiz 10 tanesini seçer | hata |
| 3 | Sözcük bütçesi kümülatif: yalnız o kursun o seviye ve altı kelimeleri (`data/app/words.json` / `words-en.json`) | uyarı |
| 4 | Her maddede Türkçe `why`, ≥ 20 karakter: kuralı söyler, cevabı tekrar etmez | hata |
| 5 | Çeldirici anadil girişiminden gelir, `byNative` ile değişir (kurs `de` → `tr`, `en`; kurs `en` → `tr`, `de`). Okuma/dinlemede `byNative` yok | `read`/`listen`de uyarı |
| 6 | Aralıklı tekrar: her hafta (W1 hariç) önceki haftaların en az bir `targets`ını yeniden yoklar. W5 transfer haftası | hata |
| 7 | Uyaran (okuma metni, dinleme diyaloğu) kurs başına bir kez yazılır, `ref` ile bağlanır | hata |
| 8 | Marka adı yok (Goethe, telc, ÖSD, TestDaF, Cambridge, IELTS, TOEFL…) | hata |
| 9 | Aynı şık konumu maddelerin %60'ından fazlasında doğru olamaz (%45 üstü uyarı) | hata |
| 10 | Doğru şık sistematik olarak tek başına en uzun olamaz (%70 üstü hata, %50 üstü uyarı) | hata |

Tipik anadil girişimleri: tr→de artikel, durum ekleri, V2 (Türkçede fiil sonda); en→de
Akkusativ/Dativ, ayrılabilir fiil, sahte dostlar; tr→en artikel yokluğu, simple ↔ continuous;
de→en do-desteği, sıfat sırası, sahte dostlar (`also`, `handy`, `become`).

İngilizce metin Amerikan yazımı ve sözcük seçimiyle yazılır (`data/conversations/spelling.mjs`;
`check:quiz-prose` anadil karşılıklarında uyarır).

Seviyeden bağımsız: blok dağılımı, çeldirici kuralı, `why` zorunluluğu, tekrar zinciri.
Değişirse quiz'ler seviyeler arasında karşılaştırılamaz.

## Doğrulama

`npm run check:quiz` · `npm run check:quiz-prose` · `npm run check:quiz-prose-de` · `npx tsc --noEmit`
