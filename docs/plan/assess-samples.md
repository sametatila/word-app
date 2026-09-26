# AI değerlendirme kalite ölçümü (WP-03)

26 örnek `scripts/assess-eval.ts` içinde (`SAMPLES`): A1–B2, cümle, yazma, konuşma dökümü ve sohbet;
doğru, yanlış ve karışık cevaplar. Her örnekte insan rubrik puanı (görev/dilbilgisi/kelime/yapı, 0–4)
ve beklenen hata tipleri önceden yazılı. Betik üretimle aynı istemi, ayrıştırıcıyı
(`src/lib/assess-prompts.ts`) ve sağlayıcı zincirini (`completeChat`) kullanır. Sonuçlar bu
dosyaya elle işlenir: betik ölçer, karar insanın.

```
npm run test:assess                              # üretimdeki zincir sırası
CHAT_PROVIDER=groq npm run test:assess           # tek sağlayıcı
npm run test:assess -- --json                    # ham model çıktısı da
npm run test:assess -- --only a2-w-mixed         # tek örnek
```

## Kabul ölçütü
Dört alt puan da insan puanına ±1 içinde olan örnek ≥ %80; beklenen hata tiplerinin ≥ %75'i
yakalanmış; span'lerin ≥ %75'i doğru yerde; temiz cevaba hata yazılan örnek ≤ 2.

## Son sonuç (2026-08-25, 26 örnek, Mistral + Groq gpt-oss-120b karışık)
26/26 ayrıştı · 26/26 örnek ±1 içinde · hata tipi 19/21 · span 14/14 · temiz cevaba hata 0.
**Kabul ölçütleri sağlandı.** İlk 20 örnekte (Mistral) hata tipi 14/14, span 11/11.

## Gözlemler
- Model insan puanından sistematik olarak **+1 cömert** (özellikle `task` ve `grammar`), hiç ±1
  dışına çıkmadı. Ham puanı eşiğe çevirirken bu pay hesaba katılır.
- Model JSON'u beş biçimde bozdu (iç tırnak, saran tırnak, tek tırnaklı kapanış/anahtar, virgüllü
  alıntı, unutulmuş kapanış); hepsi `assess-prompts.ts` `extractJson`/`repairQuotes` içinde.
- Rubrikte `task` dilbilgisinden bağımsız puanlanır; gpt-oss-120b bunu yazılmadan karıştırıyordu.
