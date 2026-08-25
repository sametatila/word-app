# AI değerlendirme kalite örnekleri (WP-03, adım 5)

20 örnek `scripts/assess-eval.ts` içinde (`SAMPLES`): A1–B2, dört tür (cümle 10, yazma 5, konuşma 2, rol yapma 2, Passiv 1), doğru/yanlış/karışık. Her örnekte insan rubrik puanı (görev/dilbilgisi/kelime/yapı, 0–4) ve beklenen hata tipleri önceden yazılı.

Çalıştırma:

```
MISTRAL_API_KEY=… npm run test:assess            # üretimdeki zincir sırası
CHAT_PROVIDER=groq GROQ_API_KEY=… npm run test:assess
npm run test:assess -- --json                     # ham model çıktısı da basılır
```

Kabul ölçütleri (plan): 20 örnekte dört alt puan da insan puanına ±1 içinde ≥ 16; beklenen hata tiplerinin ≥ %75'i yakalanmış; span'lerin ≥ %75'i doğru yerde; temiz cevaba hata yazma ≤ 2 örnek.

## Örnek listesi

| id | tür/seviye | cevap (kısaltılmış) | insan puanı | beklenen hata |
|---|---|---|---|---|
| a1-s-ok | cümle A1 | Ich trinke Kaffee. | 4/4/4/4 | — |
| a1-s-conj | cümle A1 | Sie wohne in Berlin. | 3/2/4/4 | conjugation |
| a1-s-verbpos | cümle A1 | Heute ich gehe ins Kino. | 3/2/4/1 | verb_position |
| a1-s-article | cümle A1 | Die Tisch ist groß. | 3/2/3/4 | article |
| a1-s-meaning | cümle A1 | Ich bin hungrig. (hedef: müde) | 0/4/1/4 | meaning |
| a2-s-perfekt | cümle A2 | Gestern habe ich Fußball gespielt. | 4/4/4/4 | — |
| a2-s-perfekt-wrong | cümle A2 | Gestern ich habe Fußball spielen. | 2/1/4/2 | verb_position, conjugation |
| a2-s-case | cümle A2 | mit mein Freund | 3/2/4/4 | case |
| a2-w-ok | yazma A2 | buluşma mesajı, 45 kelime, temiz | 4/4/3/4 | — |
| a2-w-mixed | yazma A2 | aynı görev, V2 ve artikel hataları | 3/1/3/2 | verb_position, article |
| b1-s-weil | cümle B1 | …, weil ich krank bin. | 4/4/4/4 | — |
| b1-s-weil-wrong | cümle B1 | …, weil ich bin krank. | 3/2/4/2 | verb_position |
| b1-w-opinion | yazma B1 | şehir/köy görüşü, 90 kelime, bağlaçlı | 4/4/4/4 | — |
| b1-w-opinion-weak | yazma B1 | aynı görev, 35 kelime, artikelsiz | 2/2/2/1 | article, word_order |
| b1-sp-ok | konuşma B1 | kendini tanıtma dökümü (noktalamasız) | 4/4/4/4 | — (yazım sayılmamalı) |
| b1-sp-err | konuşma B1 | "seit zwei jahre", "komme von" | 4/2/3/3 | case |
| b1-rp-ok | rol yapma B1 | doktor randevusu, 4 tur, kalıplar tam | 4/4/4/4 | — |
| b1-rp-weak | rol yapma B1 | "ich will Termin", "Kopf tut weh" | 2/2/1/1 | article |
| b2-s-passiv | cümle B2 | Das Haus wird renoviert. | 4/4/4/4 | — |
| b2-w-formal | yazma B2 | resmî şikâyet, 100 kelime | 4/4/4/4 | — |

## Sonuçlar

**Henüz çalıştırılmadı.** Bu makinede sohbet sağlayıcı anahtarı yok (`MISTRAL/GROQ/CEREBRAS_API_KEY` yalnız Vercel'de, "Sensitive" olarak; dışa aktarılamıyor). Anahtarı olan biri yukarıdaki komutu koşup özet satırını buraya işler:

| tarih | sağlayıcı/model | ±1 içinde | hata tipi | span | temiz cevaba hata | not |
|---|---|---|---|---|---|---|
| | | /20 | | | | |

Kabul altında kalan ölçüt varsa istem `src/lib/assess-prompts.ts`'te düzeltilir (tek kaynak; üretim ve test aynı istemi kullanır) ve tablo yeniden koşulur.
