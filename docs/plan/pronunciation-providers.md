# Telaffuz ve STT sağlayıcıları (WP-20)

## Karar
Almanca için fonem düzeyinde puan veren **ücretsiz** bir API yok (Speechace Almanca desteklemiyor,
SpeechSuper aylık 20 $ taban, ELSA ücretli). Bu yüzden:

1. **Kelime düzeyi puan, kendi hesabımız.** STT transkripti (kelime zaman damgalı) hedef cümleyle
   hizalanır (`lib/sentence-match`): kelime doğru/yakın/eksik, akıcılık süre ve duraklamadan,
   `confusions` ile ses ipucu. `overall = 0,6·kelime + 0,25·bütünlük + 0,15·akıcılık`, geçme ≥ 80
   (`lib/pronounce.ts`, `PASS_SCORE`). Kart bunun "anlaşıldı mı" ölçüsü olduğunu, fonem notu
   olmadığını söyler.
2. **Fonem düzeyi (faz 2, isteğe bağlı):** `facebook/wav2vec2-xlsr-53-espeak-cv-ft` bir Hugging Face
   Space'te + espeak-ng hizalaması. Yapılmadı.
3. **Azure telaffuz puanı** karışan çiftleri ayırıyor (schön 100 ↔ schon 54) ama temiz TTS'te bile
   kelime puanı 44–100 dalgalanıyor ve fonem sembolü boş dönüyor. Bağlı değil; bağlanacaksa önce gerçek
   kayıtla kalibrasyon. Azure bugün yalnız yürüyüş modunun cep yolunda STT (bkz. `walk-stt.md`).

## Zincirler (`lib/chat-providers.ts` `sttProviders`, `lib/stt.ts`)

| Kip | Sıra | Kullanan |
|---|---|---|
| `default` | Groq → Cloudflare Workers AI → Speechmatics → Deepgram | `/api/pronounce`, `/api/stt` ekranlı yollar |
| `walk` | Azure → Deepgram → Groq → Cloudflare → Speechmatics | mobil cep yolu |

Her sağlayıcı çağrısı 8 sn tavanlı; 429'da hemen sıradakine geçilir. Her deneme `ai_usage`a yazılır;
ses saklanmaz. Mistral ses zincirinden çıkarıldı (girdiyi 30 gün saklıyor). Kota modeli:
`stt-capacity.md` (`npm run report:stt`).

## Env

| Env | Ne |
|---|---|
| `GROQ_API_KEY` | birincil hat |
| `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_AI_TOKEN` | ikinci hat (Workers AI, "Read" jetonu) |
| `SPEECHMATICS_API_KEY`, `DEEPGRAM_API_KEY` | isteğe bağlı yedekler |
| `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | yalnız `walk`; ayrıca TTS yedeği |
| `AZURE_STT_MONTHLY_SECONDS` | Azure aylık tavanı, boş = 16.200 sn |
| `GROQ_STT_MODEL`, `CLOUDFLARE_STT_MODEL`, `DEEPGRAM_STT_MODEL`, `SPEECHMATICS_URL` | varsayılanı değiştirmek için |
| `STT_ORDER` | sırayı ezer, ör. `"cloudflare,groq"`; Azure'u ekranlı yola sokamaz |

## Azure hesabı
- Speech kaynağı **F0**, bölge **`germanywestcentral`**. F0: ayda 5 saat STT, eşzamanlı 1 istek,
  kota dolunca fatura çıkmaz, istek reddedilir.
- Azure Cost Management'ta **1 € eşikli bütçe uyarısı** kurulu olmalı.
- Anahtar doğrulama (200 = tamam, 401 = anahtar ya da bölge yanlış, 403 = kaynak kapalı/kota):

```
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  "https://germanywestcentral.api.cognitive.microsoft.com/sts/v1.0/issueToken" \
  -H "Ocp-Apim-Subscription-Key: $AZURE_SPEECH_KEY" -H "Content-Length: 0"
```

## Bilinen sınır
ASR dil modeli yakın sesteşleri "düzeltir" (Staat → Stadt): telaffuz hatası ancak başka bir kelimeye
düştüğünde yakalanır.

## Kotalar ve kaynaklar (2026-08)

| Sağlayıcı | Ücretsiz katman |
|---|---|
| Groq Whisper large-v3-turbo | 20 istek/dk, 2.000 istek/gün, 7.200 sn/saat, 28.800 sn/gün |
| Cloudflare Workers AI Whisper | 10.000 neuron/gün (≈ 214 dk) |
| Speechmatics | 480 dk/ay |
| Deepgram | 200 $ tek seferlik kredi |
| Gladia (zincirde yok) | 50 € tek seferlik kredi (≈ 80 saat) |
| Azure Speech F0 | 5 saat/ay |

- Groq: https://console.groq.com/docs/model/whisper-large-v3
- Cloudflare: https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/
- Speechmatics: https://www.speechmatics.com/pricing · Gladia: https://www.gladia.io/pricing
- Azure: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-services-quotas-and-limits
- SpeechSuper: https://www.speechsuper.com/pricing.html · Speechace: https://www.speechace.com/api-plans/
- Fonem modeli: https://huggingface.co/facebook/wav2vec2-xlsr-53-espeak-cv-ft
