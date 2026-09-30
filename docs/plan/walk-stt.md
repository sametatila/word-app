# Yürüyüş modu — ses tanıma kararı

Sahibin şartları: (1) Azure'a giden ses doğruluktan ödün vermeden en aza insin, (2) ekran açıkken
**asla** Azure kullanılmasın, (3) ekran kapanınca durum dürüstçe söylensin.

## Karar

| Platform · durum | Tanıyıcı | Kod |
|---|---|---|
| Web, ekran açık | tarayıcının kendi tanıyıcısı (Web Speech); vazgeçme yok, boş dinleme "duyamadım" | `components/walk-player.tsx`, `use-listen.ts` |
| Web, "Cebe koy" | aynı tanıyıcı: ekran karartılır ama açık kalır (`darken`: siyah katman + tam ekran + ekran kilidi) | `walk-player.tsx` |
| Web, tanıyıcı yok ya da oturumda öldü | mod açılmıyor / duruyor, sebebi söyleniyor; sunucuya ses yedeği YOK (2026-09-27) | `walk-player.tsx` |
| Web, ekran gerçekten kapandı | tur durur, sebebi sesle söylenir (kilitli ekranda mikrofon alınamıyor) | `walk-player.tsx` |
| Mobil, ekran açık | cihazın native tanıyıcısı (ücretsiz) | `mobile/src/lib/stt.ts` `listenOnce` |
| Mobil, cep / ekran kapalı | native 16 kHz mono WAV kayıt → `/api/stt` `mode=walk`, POST native tarafta | `mobile/src/lib/stt.ts` |

Web'in ekran-kapalı cep yolu (sürekli kayıt, sessiz döngü, halka tampon, `lib/vad`) 2026-09-17'de
kaldırıldı: cihaz testinde (HyperOS) sistem ekran kapanınca mikrofonu susturuyordu.

## Sunucu zinciri (`lib/chat-providers.ts` `sttProviders`)

Tek zincir: **Azure → Deepgram → Groq**, yalnız mobil cep / ekran kapalı yolu. Ekran açıkken ses
hiçbir yüzeyde sunucuya gitmiyor (Samet, 2026-09-27); `/api/stt` `mode=walk` taşımayan isteği 400
ile reddediyor.

- Cloudflare Workers AI ve Speechmatics ses zincirinden kalıcı olarak çıktı (Workers AI yalnız dil modeli, metin).
- Azure aylık tavanı `AZURE_STT_MONTHLY_SECONDS` (boş = 16.200 sn = 4,5 sa; F0 kotası 5 sa).
- `/api/stt`: her istek premium kapısından geçer (deneme sınavı yolu kalktı; web sınav konuşması tarayıcı tanıyıcısıyla).

## Neden bu sıra
- Whisper tabanlılar kısa, başı kesik ceplik klipte **uyduruyor** ("der Großvater" → "Wolfsfatter");
  uydurma metin yanlış cevap sayılıyordu.
- Deepgram aynı klipte uydurmuyor, boş dönüyor: güvenli yedek.
- Azure F0: düz tanımada 15/15 doğru, sessizlikte uydurma yok, saniye başı ücret.
- İstemci güven eşiği 0,4 (`pocket-mic.ts` `MIN_CONFIDENCE`).

## Teslim
Cevabı bilmeyen "weiter", "weiß nicht" ya da "keine Ahnung" der (`parseSkipDe`, `lib/voice-intent.ts`,
mobil `voiceMatch.ts`); yalnız cevap hedefe uymadığında aranır. Girişte bir kez okunur.

## Açık kalanlar
- 3. duyulmamada tur dururken son "duyamadım" anonsu durma anonsuyla çakışıyor (ertelendi).
- `recordAnswerClip` mikrofonu kesmeyen stok Android'de doğrulanmadı.
- Güven eşiği (0,4) gerçek Deepgram kayıtlarıyla kalibre edilmedi.
- Bluetooth'ta cepte okuma SCO yüzünden telefon kalitesine düşebilir.
