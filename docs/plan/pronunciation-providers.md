# Telaffuz puanlama — sağlayıcı taraması ve karar (WP-20)

Tarih: 2026-08-26. Kısıt: **Azure yok** (sahibin kararı). Amaç: ücretsiz ya da kalıcı geniş katmanlı,
Almanca destekli, kelime (ve mümkünse fonem) düzeyinde telaffuz geri bildirimi.

## Özet karar

Almanca için **fonem düzeyinde puan veren ve gerçekten ücretsiz** bir API yok: Speechace Almanca
desteklemiyor; SpeechSuper Almanca destekliyor ama aylık 20 $ taban; ELSA ücretli. Bu yüzden:

1. **Şimdi (WP-20 faz 1): Groq Whisper (large-v3-turbo) + kendi kelime puanlama.**
   Ücretsiz katman günde 28 800 saniye ses (= 8 saat/gün), saatte 7 200 sn, 2 000 istek/gün;
   kelime zaman damgaları veriyor. Anahtar zaten `.env`'de (`GROQ_API_KEY`). Puan: hedef cümle ↔
   transkript kelime hizalaması (WP-10 `matchSentence`) → kelime başına doğru/yanlış/eksik, süre ve
   duraklamalardan akıcılık, `confusions` ile ses ipucu. Kelime ısı haritası buradan çıkar.
2. **Yedekler:** Cloudflare Workers AI Whisper (10 000 neuron/gün ≈ 214 dk/gün, kalıcı), Speechmatics
   (8 saat/ay, kalıcı); tek seferlik krediler: Gladia 50 € (≈ 80 saat), Deepgram 200 $ (≈ 430 saat).
   Kota ölçümü: `docs/plan/stt-capacity.md` (`npm run report:stt`).
3. **İsteğe bağlı (faz 2, fonem düzeyi, ücretsiz ama mühendislik ister):** açık kaynak
   `facebook/wav2vec2-xlsr-53-espeak-cv-ft` (çok dilli fonem tanıma, Almanca dâhil) ücretsiz bir
   Hugging Face Space'te (CPU) çalıştırılır; hedef cümle espeak-ng ile fonemlere çevrilir, tanınan
   fonem dizisiyle hizalanır (GOP benzeri) → fonem/kelime puanı. Tahmini iş: 3–4 gün; gecikme
   CPU'da 15 sn ses için ~3–6 sn; Space uykuya girince ilk istek ~1 dk.

Tarayıcı `SpeechRecognition` (mevcut) her durumda son yedek: ücretsiz, sınırsız, yalnız tanındı/tanınmadı.

## Karşılaştırma tablosu

| Sağlayıcı | Ne verir | Almanca | Ücretsiz katman | Kalıcı mı | Notlar |
| --- | --- | --- | --- | --- | --- |
| **Groq Whisper large-v3(-turbo)** | transkript + kelime zaman damgası | ✓ | 20 RPM, 2 000 istek/gün, 7 200 sn/saat, 28 800 sn/gün | ✓ (aylık sıfırlanan değil, günlük) | fonem yok; kelime puanı bizde. Anahtar var. |
| Gladia | transkript + kelime güveni/zaman | ✓ | **50 € tek seferlik kredi (≈ 80 saat)** — aylık ücretsiz plan YOK (pricing sayfası, 2026-08) | ✗ yenilenmez | sonrası ~0,61 $/saat; eşzamanlılık 25 async |
| Speechmatics | transkript + kelime güveni | ✓ | 480 dk/ay, 2 eşzamanlı gerçek zamanlı, kart yok | ✓ | sonrası ücretli |
| Cloudflare Workers AI (Whisper) | transkript (+zaman) | ✓ | 10 000 neuron/gün (tüm modellerle ortak) | ✓ | Worker gerekir; Vercel'den çağrılabilir |
| Deepgram Nova | transkript + kelime güveni/zaman | ✓ | 200 $ kredi, süresiz, kart yok | ✗ (tek seferlik) | ~430 saat; `/api/stt` zaten destekliyor |
| Google Cloud STT | transkript + kelime güveni | ✓ | 60 dk/ay (+300 $ 90 gün) | ✓ ama küçük | fonem yok |
| Mistral Voxtral | transkript | ✓ | ücretsiz katman belirsiz (0,003 $/dk) | — | açık ağırlık; kendi sunucun gerekir |
| Hugging Face Inference Providers | model çağrısı | ✓ | 0,10 $/ay kredi | ✓ ama işe yaramaz küçük | Space kendin barındırırsan ücretsiz CPU |
| AssemblyAI | transkript + güven | ✓ | 50 $ kredi (tek seferlik) | ✗ | fonem yok |
| Speechace | **fonem + akıcılık + tonlama** | ✗ (EN/FR/ES) | plan başına deneme; 40 $/ay'dan | ✗ | Almanca yok — eleniyor |
| SpeechSuper | **fonem + kelime + akıcılık + ritim** | ✓ | deneme anahtarı (miktar belirtilmiyor); 20 $/ay taban, 0,006 $/cümle | ✗ | Almanca için tek "hazır" fonem API'si, ücretli |
| ELSA API | fonem | kısıtlı | yok (19,99 $/ay uygulama) | ✗ | eleniyor |
| Azure Speech | fonem + prosodi | ✓ | F0 5 saat/ay | ✓ | **sahibin kararıyla dışarıda** |

## Mimari (faz 1)

```
istemci: kayıt (pocket-mic, 16 kHz, ≤15 sn)
  → POST /api/pronounce { audio, target, level }
  → sunucu: Groq audio/transcriptions (response_format=verbose_json, timestamp_granularities=word, language=de)
     yedek sırası: Cloudflare Workers AI → Speechmatics → Deepgram/Gladia kredisi → tarayıcı transkripti (istemci gönderir)
  → puanlama (saf, lib/pronounce.ts):
       words[]: hedef kelime ↔ tanınan kelime (fold: umlaut/büyük-küçük), Levenshtein ≤1 "yakın",
                eksik/fazla/yer değiştirmiş; confusions tablosuyla ses ipucu
       fluency: konuşma süresi / beklenen (hece sayısı × ~0,2 sn), 0,5 sn üstü duraklama sayısı
       completeness: tanınan hedef kelime oranı
       overall = 0,6·kelime + 0,25·bütünlük + 0,15·akıcılık (0–100)
  → assessments (kind: speaking, hash 24 s önbellek, günlük kota) + `pronounce` olayı
UI: hedef cümle kelime ısı haritası (yeşil/sarı/kırmızı), kelimeye dokun → TTS + kendi kaydı;
    ≥80 geçer, altı "tekrar dene" (2 deneme sonra "devam"); `judge: "self"` egzersizlerde kapalı.
```

Kota koruması: istemci kaydı ≤15 sn keser; sunucu kullanıcı başına günde 60 istek (assess ile aynı
kota tablosu); 429/kota aşımında tarayıcı transkriptine düşer, kart "yaklaşık" der.

## Kaynaklar

- Groq ücretsiz katman sınırları (Whisper): https://www.free-model.com/models/groq/whisper-large-v3-turbo/ · https://www.grizzlypeaksoftware.com/articles/p/groq-api-free-tier-limits-in-2026-what-you-actually-get-uwysd6mb · https://console.groq.com/docs/model/whisper-large-v3
- Gladia 50 € tek seferlik kredi (aylık ücretsiz plan yok): https://www.gladia.io/pricing
- Speechmatics 480 dk/ay: https://www.speechmatics.com/pricing · https://getpulsesignal.com/pricing/speechmatics
- Cloudflare Workers AI 10 000 neuron/gün, Whisper: https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/ · https://pricepertoken.com/endpoints/cloudflare/free
- Deepgram 200 $ kredi: https://costbench.com/software/ai-transcription-apis/deepgram/free-plan/ · https://texttolab.com/blog/deepgram-pricing
- Google STT 60 dk/ay: https://diyai.io/ai-tools/speech-to-text/google-cloud-speech-to-text-pricing/
- Hugging Face Inference kredisi: https://klymentiev.com/blog/huggingface-inference-api · https://huggingface.co/docs/inference-providers/index
- Fonem modeli: https://huggingface.co/facebook/wav2vec2-xlsr-53-espeak-cv-ft · GOP/wav2vec2 yaklaşımı: https://ar5iv.labs.arxiv.org/html/2311.07037
- Speechace planlar ve diller: https://www.speechace.com/api-plans/
- SpeechSuper fiyat ve Almanca: https://www.speechsuper.com/pricing.html · https://www.speechsuper.com/demo/german/index.html
- Mistral Voxtral fiyat: https://mistral.ai/news/voxtral-transcribe-2/
- Azure (referans, dışarıda): https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-services-quotas-and-limits
