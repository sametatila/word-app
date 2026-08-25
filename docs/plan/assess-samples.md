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

Zincir üretimdekiyle aynı: mistral/mistral-medium-latest → groq → cerebras (bütün koşularda Mistral cevapladı). Yedi koşu yapıldı; ilk koşu istem/ayrıştırıcı hatalarını ortaya çıkardı, sonrakiler düzeltmeleri ölçtü.

| koşu | ±1 içinde | hata tipi | span | temiz cevaba hata | ayrıştı | ne değişti |
|---|---|---|---|---|---|---|
| 1 | 11/12 | 3/4 | 4/4 | 2 | 12/20 | başlangıç — 8 cevap JSON içinde kaçırılmamış tırnak yüzünden okunamadı; konuşma dökümünde büyük harf "hatası"; yan cümle fiil sonu `word_order` |
| 2 | 19/19 | 12/12 | 9/9 | 0 | 19/20 | istem: iç tırnak yasağı, döküm kuralı, `verb_position` tanımı, "doğru cümleye hata yazma"; ayrıştırıcı: tırnak onarımı; 1 cevap jeton bütçesinde kesildi |
| 3–6 | hepsi ±1 | 11–12/12 | 9–10 | 0–1 | 18–19/20 | bütçe 900→1600; tek tırnaklı kapanış, `,"` bakışı, tırnaksız anahtar, sarmalayan tırnak, `wrong === fix` süzgeci |
| **7** | **20/20** | **14/14** | **11/11** | **0** | **20/20** | kapanış tırnağı unutulmuş dize onarımı |

Son koşu (2026-08-25, `scripts/assess-eval.ts`): 20/20 ayrıştı · 20/20 örnekte dört alt puan ±1 içinde · alt puan isabeti 80/80 · beklenen hata tipi 14/14 · span 11/11 · temiz cevaba hata 0. **Kabul ölçütlerinin hepsi sağlandı.**

Gözlemler:
- Model insan puanından sistematik olarak **+1 daha cömert** (özellikle `task` ve `grammar`), hiç ±1 dışına çıkmadı. Yetkinlik modeli (WP-50) bu sapmayı bilmeli; ham puanı eşiklere çevirirken 5 puanlık pay bırakılabilir.
- Ayrıştırıcı sağlamlığı asıl kazanım: modelin JSON'u beş farklı biçimde bozduğu görüldü (iç tırnak, dizeyi saran çift tırnak, tek tırnaklı kapanış/anahtar, virgüllü alıntı listesi, unutulmuş kapanış). Hepsi `assess-prompts.ts` `extractJson`/`repairQuotes` içinde tek kuralla (`closesString`) ele alınıyor ve e2e §29'da sabitlendi.
- Konuşma dökümünde model bir kez `spelling` yazdı (a2-w-mixed'de değil, yazmada — geçerli); dökümde `spelling` ayrıştırıcıda düşürülüyor.
- Diğer sağlayıcılar (Groq llama-3.3-70b, Cerebras gpt-oss-120b) bu turda hiç devreye girmedi; Mistral limiti dolduğunda davranış farkı olabilir — `CHAT_PROVIDER=groq npm run test:assess` ile ayrıca ölçülmeli.

## WP-30 eki — yazma örnekleri (2026-08-25)

`scripts/assess-eval.ts`'e 6 yazma örneği eklendi (26 örnek): `a1-w-wohnung` (kabul cümlesi: "in eine kleine Wohnung" → `case`), `a1-w-tag`, `a2-w-urlaub`, `a2-w-einladung`, `b1-w-beschwerde`, `b1-w-meinung-weak`.

Koşu sırasında iki bulgu:
1. **Mistral 429** (20. istekten sonra dakikalık limit) ve zincirdeki yedek **Groq 404**: `llama-3.3-70b-versatile` Groq'tan kaldırılmış — üretimde yedek sessizce ölüydü. Varsayılan `openai/gpt-oss-120b` (reasoning_effort low) yapıldı; Cerebras zaten aynı modeli kullanıyor.
2. gpt-oss-120b hatalı metinlerde `task` puanını dilbilgisiyle birlikte düşürüyordu (insan 4 → model 2; 3 → 0). Rubrikte `task` "dilbilgisinden bağımsız" diye netleştirildi; sonra Groq'ta `a2-w-urlaub` 4/1/4/2 (insan 4/2/3/3), `b1-w-meinung-weak` 3/2/2/2 (insan 3/2/2/2) — ±1 içinde.

| örnek | sağlayıcı | insan | model | ±1 | beklenen tip |
|---|---|---|---|---|---|
| a1-w-wohnung | mistral | 4/2/3/3 | 4/3/4/4 | ✓ | case ✓ (+article) |
| a1-w-tag | mistral | 4/3/3/3 | 4/3/4/4 | ✓ | verb_position ✓ |
| a2-w-urlaub | groq/gpt-oss | 4/2/3/3 | 4/1/4/2 | ✓ | verb_position ✓, article → word_order |
| a2-w-einladung | groq/gpt-oss | 4/4/4/4 | 4/4/4/4 | ✓ | — |
| b1-w-beschwerde | groq/gpt-oss | 4/4/4/4 | 4/4/4/4 | ✓ | — |
| b1-w-meinung-weak | groq/gpt-oss | 3/2/2/2 | 3/2/2/2 | ✓ | verb_position ✓ |

Toplam (26 örnek, iki sağlayıcı karışık): 26/26 ±1 içinde; hata tipi 19/21; span 14/14; temiz cevaba hata 0.
