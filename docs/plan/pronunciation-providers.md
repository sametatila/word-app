# Telaffuz ve STT sağlayıcıları (WP-20)

## Karar
Almanca için fonem düzeyinde puan veren **ücretsiz** bir API yok (Speechace Almanca desteklemiyor,
SpeechSuper aylık 20 $ taban, ELSA ücretli). Bu yüzden:

1. **Kelime düzeyi puan, kendi hesabımız.** Tarayıcının tanıdığı metin (Web Speech API; 2026-09-27'den
   beri ses sunucuya gitmiyor, `/api/pronounce` yalnız metin alıyor) hedef cümleyle hizalanır
   (`lib/sentence-match`): kelime doğru/yakın/eksik; tarayıcı zaman damgası vermediği için akıcılık
   ve hız boş (`hasWordTiming: false`),
   `confusions` ile ses ipucu. `overall = 0,6·kelime + 0,25·bütünlük + 0,15·akıcılık`, geçme ≥ 80
   (`lib/pronounce.ts`, `PASS_SCORE`). Kart bunun "anlaşıldı mı" ölçüsü olduğunu, fonem notu
   olmadığını söyler.
2. **Fonem düzeyi (faz 2, isteğe bağlı):** `facebook/wav2vec2-xlsr-53-espeak-cv-ft` bir Hugging Face
   Space'te + espeak-ng hizalaması. Yapılmadı.
3. **Azure telaffuz puanı** karışan çiftleri ayırıyor (schön 100 ↔ schon 54) ama temiz TTS'te bile
   kelime puanı 44–100 dalgalanıyor ve fonem sembolü boş dönüyor. Bağlı değil; bağlanacaksa önce gerçek
   kayıtla kalibrasyon. Azure bugün yalnız mobilde ekran kapalı yürüyüşte STT (bkz. `walk-stt.md`).

## Zincirler (`lib/chat-providers.ts` `sttProviders`, `lib/stt.ts`)

Tek zincir, yalnız mobilde ekran kapalı yürüyüş (`/api/stt`, `mode=walk` zorunlu; diğer istekler
400 `screen_on_uses_device`): **Azure → Deepgram → Groq**. Ekran açıkken ses hiçbir yüzeyde sunucuya
gitmiyor (Samet, 2026-09-27): mobil native tanıyıcı, web Web Speech API; tanıyıcısı olmayan tarayıcıda
sesli özellik açılmıyor.

Her sağlayıcı çağrısı 8 sn tavanlı; 429'da hemen sıradakine geçilir. Her deneme `ai_usage`a yazılır;
ses saklanmaz. Mistral (2026-09-25), Cloudflare Workers AI ve Speechmatics (2026-09-27) ses
zincirinden kalıcı olarak çıktı. Kota modeli: `stt-capacity.md` (tarihsel).

## Env

| Env | Ne |
|---|---|
| `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` | birincil hat; ayrıca TTS yedeği |
| `AZURE_STT_MONTHLY_SECONDS` | Azure aylık tavanı, boş = 16.200 sn |
| `DEEPGRAM_API_KEY` | ikinci hat |
| `GROQ_API_KEY` | üçüncü hat (Zero Data Retention açık) |
| `GROQ_STT_MODEL`, `DEEPGRAM_STT_MODEL` | varsayılanı değiştirmek için |
| `STT_ORDER` | üçünün sırasını ezer, ör. `"deepgram,azure"`; listede olmayanı ekleyemez |

## Azure hesabı
- Kaynak (2026-09-27'de yeniden açıldı): kaynak grubu `lernomi`, ad `lernomi-speech`. Eski kaynağın
  anahtarı 18–22 Eylül arasında Azure tarafında geçersizleşti (401) ve hesabı bulunamadı; hesap
  bilgisi yerel `AGENTS.md`'de (depo herkese açık). Anahtar `.secrets/azure/speech-key` + iki `.env`.
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
