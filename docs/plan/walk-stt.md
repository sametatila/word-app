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

Tek zincir: **Azure → Deepgram → Cloudflare Workers AI → Groq**, yalnız mobil cep / ekran kapalı yolu. Ekran açıkken ses
hiçbir yüzeyde sunucuya gitmiyor (Samet, 2026-09-27); `/api/stt` `mode=walk` taşımayan isteği 400
ile reddediyor.

- Cloudflare Workers AI (Whisper, VAD açık) 2026-10-05'te Deepgram'ın yedeği olarak döndü (Samet: kredi bitince
  otomatik geçiş). Deepgram 401/402/403 verince bir saat atlanıyor (`lib/stt` `deepgramResting`), kredi
  yüklenince kendiliğinden döner. Hukuk 1.10.0, ses rızası 4. Speechmatics kalıcı olarak çıktı.
- Azure aylık tavanı `AZURE_STT_MONTHLY_SECONDS` (boş = 16.200 sn = 4,5 sa; F0 kotası 5 sa).
- `/api/stt`: her istek premium kapısından geçer (deneme sınavı yolu kalktı; web sınav konuşması tarayıcı tanıyıcısıyla).

## Neden bu sıra

Ölçüm 2026-10-05 (`npm run test:stt-quality`, sentetik sesler: macOS `say`, 3 ses × 32 ifade ×
temiz/gürültülü, 2 sessizlik + 2 gürültü klibi; gerçek kullanıcı sesi yok):

| Sağlayıcı | Doğal sesler | Türkçe sesle okunan (kaba aksan) | Sessizlik/gürültüde uydurma | Medyan |
|---|---|---|---|---|
| Deepgram nova-3 | 121/128 | 14/64 | 0/4 | 0,26 sn |
| Workers AI Whisper + VAD | 90/128 | 18/64 | 0/4 | 1,5 sn |
| Workers AI Whisper (VAD yok) | 86/128 | 21/64 | 3/4 | 1,6 sn |
| Groq Whisper | 82/128 | 17/64 | 4/4 | 0,22 sn |

Whisper'ın 6 kaçırması rakam yazımı ("20", "30"); uygulamanın eşleştiricisi bunları sayıya çeviriyorsa
fark biraz kapanır. Sonuç: Workers AI + VAD, Deepgram bitince bugün devreye giren Groq'tan iyi ve
sessizlikte uydurmuyor; ama Deepgram'ın yerini tutmuyor. Kaliteyi korumanın yolu Deepgram'ı beslemek.

- Whisper tabanlılar kısa, başı kesik ceplik klipte **uyduruyor** ("der Großvater" → "Wolfsfatter");
  uydurma metin yanlış cevap sayılıyordu.
- Deepgram aynı klipte uydurmuyor, boş dönüyor: güvenli yedek.
- Azure F0: düz tanımada 15/15 doğru, sessizlikte uydurma yok, saniye başı ücret.
- İstemci güven eşiği 0,4 (`pocket-mic.ts` `MIN_CONFIDENCE`).

## Cihazda konuşma algılama (VAD) — ölçüm 2026-10-08, native'e henüz geçmedi

Bugün ekran kapalıyken kelime başına sabit 3 sn (evet/hayır 4 sn) kaydediliyor ve tamamı Azure'a gidiyor.
Canlıda son 30 gün: 155 klip, 650 sn; klip başına 4,2 sn (kabul edilmeyende ikinci istek, 6 sn); 31 klip boş.
Öneri: kayıt sırasında cihazda VAD, Azure'a yalnız konuşma + pay. Referans algoritma `scripts/lib/walk-vad.ts`
(native kopyaları buna birebir uymalı), ölçüm `scripts/walk-vad-eval.ts` (`--azure` üretimdeki Azure yolu: telaffuz
değerlendirmesi, kabul yoksa düz tanıma).

Algoritma: 20 ms dilim; enerji 300 Hz yüksek geçirenden sonra (rüzgâr, adım); ilk 300 ms karar dışı ("micon"
kayda sızıyor, ~0,26 sn); gürültü tabanı aşağı hızlı, yukarı yavaş; başlangıç taban + 10 dB'de 3 dilim ve en az 2'si
**sesli** (80–400 Hz normalize öz-ilinti ≥ 0,5); bitiş 650 ms sessizlik; başlamak için 5 sn, konuşma en çok 4 sn;
gönderilen konuşmadan 500 ms önce → 500 ms sonra; konuşma yoksa yükleme yok.

Sahneler sentetik (macOS `say`, 7 Almanca + 4 İngilizce ses, Türkçe sesle okunan dahil; gerçek kullanıcı sesi yok):
40 ifade × 3 = 120 konuşmalı + 18 yalnız gürültü; koşullar temiz, yürüyüş (adım + pembe gürültü), rüzgâr, trafik,
cep (boğuk ses + kumaş hışırtısı), kısık ses; başlama anı 0,35–2,3 sn; her sahnede "micon".

| | Bugün (3 sn) | VAD |
|---|---|---|
| Azure doğru kabul | 95/120 | 95/120 |
| Başlama ≤ 1,6 sn | 75/96 | 76/96 |
| Gönderilen ses (konuşmalı) | 456 sn | 247 sn |
| Yalnız gürültü sahneleri | 108 sn gönderildi | hiç gönderilmedi |
| Toplam gönderilen | 564 sn | 247 sn (−%56) |
| Kararın verildiği an (medyan, mikrofon açılışından) | 3,0 sn + yükleme | 2,5 sn; konuşma bitiminden 0,64 sn |

- Yalnız enerjiyle (seslilik denetimi yok) cepte kumaş hışırtısı ve adımlar 4,3 sn "konuşma" sayılıyordu, rüzgârda
  yedek pencere boşuna tetikleniyordu; 300 Hz filtre + seslilik ikisini de sıfırladı.
- Pay 300 ms'de 93/120 (−%66), 500 ms'de 95/120: fark kenardaki sahnelerde iki yönlü dalgalanma, güvenli taraf 500.
- VAD'in kazandıkları geç başlayanlar (bugün 3. saniyede kesiliyor); kaybettikleri kenar sahneler. Kaçan tek konuşma
  rüzgârda 160 ms'lik sentetik "acht".
- İkinci istek (kabul yoksa düz tanıma) telaffuz değerlendirmesinin metniyle DEĞİŞTİRİLEMEZ: 50 çiftin 20'sinde o
  metin beklenen kelimeyi yazıyor (referansa yaslanıyor), düz tanıma boş ya da başka bir şey duyuyor.

Kalan: Android/iOS native kopya (`startRecording` yerine VAD'li kayıt, eski yol yedek), cihazda gerçek ses
(Bluetooth mikrofonu dahil) ile eşik kontrolü; mobil build başka ajanda.

## Teslim
Cevabı bilmeyen "weiter", "weiß nicht" ya da "keine Ahnung" der (`parseSkipDe`, `lib/voice-intent.ts`,
mobil `voiceMatch.ts`); yalnız cevap hedefe uymadığında aranır. Girişte bir kez okunur.

## Açık kalanlar
- 3. duyulmamada tur dururken son "duyamadım" anonsu durma anonsuyla çakışıyor (ertelendi).
- `recordAnswerClip` mikrofonu kesmeyen stok Android'de doğrulanmadı.
- Güven eşiği (0,4) gerçek Deepgram kayıtlarıyla kalibre edilmedi.
- Bluetooth'ta cepte okuma SCO yüzünden telefon kalitesine düşebilir.
