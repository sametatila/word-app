# AI değerlendirme kalite ölçümü (WP-03)

32 örnek `scripts/assess-eval.ts` içinde (`SAMPLES`): A1–B2, cümle, yazma, konuşma dökümü ve sohbet;
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

## Son sonuç (2026-09-29, 27 örnek, sağlayıcı zinciri Cloudflare Workers AI → Groq)
Gemma 4 26B (Cloudflare): 24/27 örnek ±1 içinde · hata tipi 16/19 · temiz cevaba hata 0 · ortalama 4,9 sn.
**Kabul ölçütleri sağlandı** (±1 %89, hata tipi %84). Yedek gpt-oss-120b (Groq) 2026-08-25'te
26/26 ±1, hata tipi 19/21, span 14/14, temiz cevaba hata 0 ile geçmişti.

## 2026-10-07: başa konan öğe başta kalır (28 örnek, Gemma 4 26B)
Cihazda Cümle Kur: "Erst ich schicke der Brief zu Herr Devald" → model "Ich schicke Herrn Devald den Brief erst zu"
diye düzeltti; öğrencinin "önce"si "ancak"a döndü. İsteme kural: başa konan öğe başta kalır, fiil ikinci sıraya
gelir ("Erst schicke ich"), ve bu hata `verb_position`. Yeni alan `expectCorrected`, yeni örnek `a2-s-erst-v2`.
Önce/sonra aynı set: ±1 25/28 ↔ 25/28 · hata tipi 18/21 ↔ 18/21 · span 19/19 ↔ 19/19 · temiz cevaba hata 0 ↔ 0 ·
düzeltme yapıyı koruyor **1/2 → 2/2**; yalnız `a2-s-erst-v2` beş koşuda: eski istem 3'te 1 doğru, yeni 5'te 5
("Erst schicke ich", tür `verb_position`).

## 2026-10-09: ayrılabilir fiilin eksik öneki (32 örnek, Gemma 4 26B; QA F-0072)
Puanlı konuşma Ü15 "Ich habe mich verlaufen": "… und biege an der Ampel rechts." (abbiegen'in "ab"ı yok) Dil
bilgisi 4/4, %100 aldı; model "ab"ı düzeltilmiş metne sessizce ekleyip hata listesine yazmamıştı. Üç katman:
istemde kural (önek hiç yoksa `verb_position`, öneksiz anlam doğruysa hata değil), kodun notu (`lib/separable-check`:
görevin hedef kalıbındaki ayrılabilir fiil öneksiz ve kalıbın çerçevesiyle geçiyorsa istem bunu söyler) ve
zorlama (cümle kalıbın önekten önceki öğesinde bitiyorsa model yazmasa da hata eklenir, dil bilgisi en çok 3).
Yeni örnekler `a1-rp-trennbar-miss` (QA'nın cevabı birebir), `a1-rp-trennbar-ok`, `a1-rp-steigen-ok`
(öneksiz "steigen in den Zug" doğru), `a1-s-anrufen-miss`.
QA cevabı üç kez: eski istem 3'te 0 (hepsi 4/4, %100), yeni istem notsuz 3'te 3, not ile 3'te 3 (dil bilgisi 3, %93).
İlk denemede not "in" edatı ortak diye `a1-rp-steigen-ok`a da düşüyordu ve model doğru cümleye hata yazdı; edatlar
çerçeveden çıkarıldı, sonra üç koşuda 0 hata. Tam set: ±1 28/32 · hata tipi 20/23 · span 21/21 · temiz cevaba hata 0.
Eski 28 örnek önce/sonra aynı (hata tipi 18/21, span 19/19, temiz 0); ±1 dışındaki dört örnek (`a2-s-erst-v2`,
`a1-s-meaning`, `a2-s-perfekt-wrong`, `b1-s-weil-wrong`) eski istemde de aynı sapıyor, sonuncusu koşudan koşuya değişiyor.
Kod katmanı model çağırmadan `npm run test:separable`te; 580 Almanca konuşmanın bütün metinleri kendi kalıplarıyla
tarandığında tek zorlama içeriğin bilerek yanlış verdiği "Die Arbeit fängt um neun." oldu.

## Gözlemler
- Model insan puanından sistematik olarak **+1 cömert** (özellikle `task` ve `grammar`), hiç ±1
  dışına çıkmadı. Ham puanı eşiğe çevirirken bu pay hesaba katılır.
- Model JSON'u beş biçimde bozdu (iç tırnak, saran tırnak, tek tırnaklı kapanış/anahtar, virgüllü
  alıntı, unutulmuş kapanış); hepsi `assess-prompts.ts` `extractJson`/`repairQuotes` içinde.
- Rubrikte `task` dilbilgisinden bağımsız puanlanır; gpt-oss-120b bunu yazılmadan karıştırıyordu.
