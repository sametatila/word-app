# Azure Speech anahtarı — kurulum (WP-20 için)

> **Durum (2026-08-27):** Hesap açıldı, kaynak F0 katmanında `germanywestcentral`; anahtar
> `.env` ve Vercel'de. "Kullanılmayacak" notunun sebebi ilke değil hesap açılamamasıymış
> (tenant hatası), çözüldü. Azure şu an **yürürken modunun ekran kapalı yolunda** STT ana hattı
> ve TTS yedeği; telaffuz puanı için ölçümler ve eşik notları `walk-stt.md`'de.

Son güncelleme: 2026-08-26. Kaynaklar en altta; Azure portalın arayüzü sık değiştiği için
adım adlarını "Ekran Görüntüsü"nden değil, sayfadaki arama kutusundan bulmak en güvenlisi.

## Neden Azure, neden ücretsiz katman yeter

- Telaffuz puanlama (kelime ve fonem düzeyinde doğruluk, akıcılık, bütünlük) Azure Speech'in
  **konuşma tanıma** hizmetinin içinde; ayrı bir ürün değil, ayrı bir anahtar gerekmiyor.
- **Ücretsiz katman (F0)** ayda **5 saat ses** konuşma tanıma hakkı veriyor; telaffuz
  değerlendirmesi bu kotadan düşüyor. 15 saniyelik bir kayıt ≈ 1 200 deneme/ay demek.
  Aynı kaynak TTS için ayda 500 000 karakter de veriyor (uygulama zaten Edge TTS'i önce
  deniyor, Azure yedekte).
- F0'da eşzamanlı istek sınırı **1**; birden çok öğrenci aynı saniyede kayıt gönderirse
  ikincisi 429 alır. Uygulama 429'da mevcut tarayıcı tanımasına düşüyor; bu ölçekte sorun
  değil. Kota dolunca **fatura çıkmaz**, istekler reddedilir.
- F0 kotaları artırılamaz; büyürsen aynı kaynağı S0'a çevirirsin (telaffuz değerlendirmesi
  S0'da saat başına ~1,32 $, kullandıkça öde).

## 1. Azure hesabı

1. https://azure.microsoft.com/free adresinden **ücretsiz hesap** aç (Microsoft hesabıyla).
2. Kimlik doğrulaması için **kredi/banka kartı** istiyor; F0 kaynak ücret çekmez. Yine de
   güvence için hesabı açar açmaz **Cost Management → Budgets** altında 1 € eşikli bir
   bütçe uyarısı kur.
3. Ücretsiz hesap ilk 30 gün için kredi ve 12 ay bazı ücretsiz servisler veriyor; bizim
   kullandığımız F0 katmanı "her zaman ücretsiz" sınıfında, süreye bağlı değil.

## 2. Speech kaynağı oluştur (portal)

1. https://portal.azure.com → üstteki arama kutusuna **Speech** yaz → **Azure AI services**
   altındaki **Speech** (bazı hesaplarda "Speech service") → **Create**.
   Doğrudan bağlantı: https://portal.azure.com/#create/Microsoft.CognitiveServicesSpeechServices
2. Formu doldur:
   - **Subscription:** ücretsiz aboneliğin.
   - **Resource group:** "Create new" → `nomi` gibi bir ad.
   - **Region:** **West Europe** (`westeurope`) — Almanca telaffuz değerlendirmesi bu bölgede
     var ve Türkiye'ye yakın. (Alternatif: `germanywestcentral`.) Bölge adını not al;
     `.env`'e yazılacak.
   - **Name:** `nomi-speech` (dünya genelinde benzersiz olmalı; alınmışsa sonuna sayı ekle).
   - **Pricing tier:** **Free F0**. Bir abonelikte yalnız **bir** F0 Speech kaynağı olabilir;
     seçenek görünmüyorsa aynı abonelikte zaten bir F0 var demektir.
3. **Review + create → Create**. Dağıtım 1–2 dakika sürer; "Go to resource".
4. Sol menüde **Resource Management → Keys and Endpoint**:
   - **KEY 1** → `AZURE_SPEECH_KEY`
   - **Location/Region** (ör. `westeurope`) → `AZURE_SPEECH_REGION`
   KEY 2 yedek; anahtar sızarsa "Regenerate" ile yenilenir, uygulama kesilmez.

> Portal bazı hesaplarda önce **Microsoft Foundry** kaynağı öneriyor (tür `AIServices`,
> Speech de içinde). O yol da çalışır ama F0 katmanı Foundry kaynağında her zaman
> sunulmuyor; ücretsiz kalmak için bağımsız **Speech** kaynağını seç.

## 3. Uygulamaya bağla

Yerel `.env` (değerler tırnaksız, boşluksuz):

```
AZURE_SPEECH_KEY=<KEY 1>
AZURE_SPEECH_REGION=westeurope
```

Vercel: **Project → Settings → Environment Variables** → aynı iki değişkeni **Production**
ve **Preview** için ekle (Sensitive işaretle) → yeni bir deploy tetikle (env değişikliği
mevcut deploy'a işlemez).

## 4. Doğrulama (1 dakika)

Anahtar ve bölge doğruysa aşağıdaki istek 200 döner ve kısa bir jeton basar:

```
curl -s -o /dev/null -w "%{http_code}\n" -X POST \
  "https://westeurope.api.cognitive.microsoft.com/sts/v1.0/issueToken" \
  -H "Ocp-Apim-Subscription-Key: $AZURE_SPEECH_KEY" -H "Content-Length: 0"
```

- `200` → tamam. `401` → anahtar yanlış ya da bölge anahtarın bölgesi değil.
  `403` → kaynak devre dışı/kota. Uygulama tarafında `npm run report:providers`
  sağlayıcı durumunu listeler.

## 5. Kota takibi

Portal → kaynak → **Monitoring → Metrics** → "Speech to Text Audio Minutes" (aylık 300 dk
= 5 saat). %80'e gelince e-posta için **Alerts** kur. Uygulama 429/403'te tarayıcı
tanımasına düşer; kullanıcı fark etmez, yalnız fonem puanı görmez.

## Sonra ne olacak (WP-20)

Anahtar `.env`'e girince: `POST /api/pronounce` (kayıt → Azure Pronunciation Assessment →
`{overall, words[], fluency, completeness}`), söyleyiş turunda kelime ısı haritası, WP-22
sınav sonucuna telaffuz ortalaması, seviye sınavına konuşma bölümü; 20 kayıtlık
karşılaştırma (Azure vs mevcut tarayıcı yöntemi) `docs/plan/pronunciation-eval.md`'ye.

## Kaynaklar

- Kotalar ve sınırlar (F0/S0 tablosu, eşzamanlılık 1): https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-services-quotas-and-limits
- Fiyatlandırma (F0 aylık haklar; telaffuz değerlendirmesi ücreti): https://azure.microsoft.com/en-us/pricing/details/speech/
- Telaffuz değerlendirmesi fiyat/kullanım (Q&A): https://learn.microsoft.com/en-in/answers/questions/5608069/pricing-and-usage-of-pronunciation-assessment-feat
- Kaynak oluşturma (portal/CLI, Foundry vs. bağımsız kaynak): https://learn.microsoft.com/en-us/azure/ai-services/multi-service-resource
- Ücretsiz katman dolunca ne olur (Q&A): https://learn.microsoft.com/en-us/answers/questions/5566384/azure-ai-speech-what-happens-after-free-tier-t0-ex
