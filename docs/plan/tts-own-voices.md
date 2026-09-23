# Kendi karakter seslerine geçiş — envanter, üretim süresi, sunum (2026-09-19)

## DURUM — kelime katmanı (2026-09-23)

Samet'in kararları: seçilebilir sesler **Defne** (kadın) ve **Aras** (erkek); Mira/Can yalnız diyalog kadrosu,
seçilemez. Günlük tur, pratik ve yürüyüş modunun kelime katmanı canlıda **yalnız** bu iki karakterin önceden
üretilmiş dosyalarından çalar — Edge'e de cihaz sesine de düşüş YOK; tabloda olmayan metin susar.

| Ne | Nasıl |
|---|---|
| Ses kimlikleri | dil önekli: `de-DE-Defne`, `en-US-Aras`, `tr-TR-Defne`… (`lib/tts/voices` `OWN_VOICES`, mobil aynası). Eski Katja/Conrad/Jenny/Guy tercihi cinsiyetine göre çevrilir (`resolveVoice`), DB göçü yok. Zürih: Leni/Jan kalır. |
| Kelime isteği | istemci `k=w` ekler (web `speakWord`/`prefetchWord`/`SpeakButton word`, mobil `speakTarget(…, { word: true })`); uç tabloda bulamazsa 404 (`no_own_audio`, günlüğe `[tts-own]`). |
| Kelime dışı içerik | ders, beceri, dinleme, okuma, rol yapma henüz üretilmedi: karakter sesi Edge karşılığıyla (Defne→Katja/Jenny/Emel, Aras→Conrad/Guy/Ahmet); ders/dinleme sabit sesi `lessonVoice` Katja/Jenny/Leni. |
| Yürüyüş modu | hedef kelime seçilen karakter; anlam karakterin ANADİL sesi (`glossVoice`); anlatım cümleleri Emel/Jenny/Katja. |
| Kutular | cümle dizmede her kutu AYRI üretilmiş kayıt (cümleden kesme değil: yanlış dizilince ezgi saçmalardı); metin `tileSpeech` (kenar noktalaması atılır). |
| Sunucu | `TTS_OWN_DIR` (`/opt/lernomi/tts-own`: `tts-map.json` + `m4a/`). **Yayın anahtarı**: boşsa kelimeler Edge karşılığıyla, doluysa düşüşsüz. Tablo dakikada bir tazelenir; cevap `max-age=86400` + ETag (nginx aynı başlığa uyar, boşaltma gerekmez). |
| Kapsam kapısı | `npm run tts:coverage -- --words <döküm> --map <tts-map.json> [--produced …] [--jobs eksik.jsonl]` — uygulamanın kendi işlevleriyle her metni kurar, eksikleri tts-test iş biçiminde yazar. `TTS_OWN_DIR` ancak bu KAPSAM TAM derken doldurulur. |
| Test | `npm run test:tts-own` (CI'da). |

Kaldırılanlar: mobil boşluk doldurmada boşluklu cümlenin hoparlörü (bozuk cümle okuyordu, webde yoktu); serbest
cümle geri bildiriminde hoparlör (kullanıcının kendi cümlesi, önceden üretilemez).

Kaynak: `scripts/tts-inventory.ts` (çıktı `reports/tts-inventory.json`) ve tts-test'teki ölçümler.
Kapsam dışı: **rol yapma** (AI cevapları; Edge'de kalıyor) ve **gsw-zh** (Zürih; karakterlerin İsviçre
Almancası yok, de-CH Edge sesinde kalıyor).

## 1. Envanter (rol yapma hariç, benzersiz metin)

| Katman | Kaynak | Benzersiz metin | Karakter | Tahmini ses* |
|---|---|---|---|---|
| 1 | Kelimeler: madde + artikel, çoğul, örnek cümle, anadil karşılığı (yürüyüş modu) — de + en | 42.800 | 1,07 M | 21 sa |
| 2 | Ders anlatımı (TR) + dersteki hedef dil parçaları — de + en kursu | 45.400 | 2,05 M | 41 sa |
| 3 | Dinleme diyalogları: deneme sınavı, beceri, modül sınavı | 10.700 | 0,96 M | 19 sa |
| 4 | Okuma metinleri (deneme + beceri; sesli okuma düğmesi) | 5.000 | 1,16 M | 23 sa |
| — | Anlatım arayüz cümleleri (yürüyüş, ders geri bildirimi) × 3 anadil | 270 | 0,01 M | — |
| | **Toplam, tek ses için** | **104.000** | **5,25 M** | **~104 sa** |

*14 karakter/sn konuşma hızıyla. Bu **bir** sesin envanteri. Kurs başına iki seçilebilir ses var
(kadın/erkek) ve karakter üç dili de konuştuğu için anlatım + hedef dil aynı karakterden çıkacak;
yani seçilebilir her karakter için katman 1–2 ayrı üretilir. Diyalog kadrosu (3K+3E) için iki karakter
daha gerekir ya da perde kaydırma kalır.

Öncelik: 1 → 2 → 3 → 4. Katman 4 en düşük değer (okuma için), en son ya da hiç.
Hız kademeleri (`slow`, `listen`, `listen-slow`) yeniden üretilmez: yayın anında zaman germe
(ffmpeg `atempo` / rubberband), GPU maliyeti sıfır, depolama ×4.

## 2. Bugünkü hattın hızı (RTX 4060 Laptop 8 GB, ölçüm 2026-09-19)

| | Ölçülen | Bileşenler |
|---|---|---|
| Cümle (3–4 sn ses) | 24 sn duvar saati, RTF ≈ 5,7 | üretim 2×3,8 sn · Whisper large-v3-turbo CPU 2×8 sn · UTMOS/master ~2 sn |
| Ders (8–11 parça) | 116 sn / ders, RTF ≈ 8,6 | parça başına aynı sabit maliyet, parçalar 1,4 sn |
| Take sayısı | ortalama 2,05 | MIN_TAKES=2 belirliyor |

**Duvar saatinin ~%70'i CPU'daki kontrol**, GPU o sırada boş. Üretimin kendisi RTF ≈ 1.

Bu hızla, tek ses için: katman 1 ≈ 240 sa (10 gün), katman 2 ≈ 300 sa. Dört ses ile aylar. Kabul edilemez.

## 3. Kalite kaybı olmadan hızlandırma

**Uygulandı ve ölçüldü (2026-09-19, tts-test/ornekler.py):** ikinci take GPU'da üretilirken birincisi puanlanıyor;
UTMOS önce, Whisper yalnız ilk kabul edilene kadar; Almanca/İngilizce kontrolü Whisper `small` (130 gerçek take'te
büyük modelle DE/EN'de 60/60 aynı karar; Türkçede 5/70 fazladan red, hiç yanlış kabul yok → Türkçe büyük modelde
kaldı); iki iş aynı anda (birinin Whisper süresi ötekinin üretim süresi; üçüncü iş kazandırmıyor, GPU dolu).
Sonuç: 11 parçalık ders ~250 sn → ~63 sn, parça başına ≈5,5 sn. Bir sesin kelime katmanı ≈ 60 sa, ders katmanı
≈ 72 sa (4060). Kalite ayarları (20 adım, 2 take, referans+bağlam) değişmedi.

| Adım | Kazanç | Kalite etkisi |
|---|---|---|
| Kontrolü üretimle ÖRTÜŞTÜR: take 2 üretilirken take 1 Whisper'da (iki iş parçacığı, mevcut worker'lar) | duvar saati ≈ max(GPU, CPU) → ~2× | yok |
| Whisper `small` (kontrol dosyası artık 14 sn bağlam taşıyor; ölçüm: 8 sn → 2 sn, «abfährt»'ı büyük modelden daha doğru yazdı). Kısa kelime kontrolünde büyük model kalabilir | CPU maliyeti 4× düşer | doğrulanmalı: 200 klipte iki modelin kararı karşılaştırılır |
| Önce UTMOS (0,3 sn), Whisper yalnız en iyi take'e; geçmezse sıradaki | Whisper çağrısı yarıya | yok |
| Kelimeler için tek take + eşik (UTMOS ≥ 4,0 ise ikinci take yok) | %30 | küçük; yalnız katman 1'de |
| Hedef: cümle ≈ 8–9 sn (RTF ≈ 2,2), kelime ≈ 6–7 sn | ~3× | |

Yapılmayacaklar: adım sayısını düşürmek (10 → 20 kazancı ölçüldü), take'i teke indirmek (seed farkı ±1 MOS),
VoxCPM'de toplu üretim (API'de yok), ikinci model kopyası (8 GB'a sığmıyor).

**Toplu üretim için kiralık GPU.** Aynı üç worker Docker'a alınır; RTX 4090 bu iş için 4060'ın 2–2,5 katı,
Vast/RunPod'da ~0,4–0,7 $/sa. Optimize hatla tek sesin katman 1+2'si ≈ 195 sa 4060 ≈ 80–90 sa 4090 ≈
**35–60 $ / ses**; 8 GPU paralel bir günde biter. Yerel 4060 geliştirme ve artımlı içerik için kalır.

## 4. Sunucuda sunum — GPU yok, her şey statik

Envanter sonlu ve önceden üretiliyor; canlıda sentez YOK. Ölçek = CDN.

- **Anahtar**: bugünkü `/api/tts?v&t&r&p` sözleşmesi aynen kalır → sunucu `sha256(v|r|p|clean(t))` ile
  dosyayı bulur, varsa `Cache-Control: immutable, 1 yıl` ile verir; yoksa bugünkü zincir (Edge→Azure).
  İstemci (web, Android/iOS köprüsü) **değişmez**. nginx önbelleği aynen çalışır.
- **Depolama**: 4 ses × 104 sa, AAC 48 kb/s mono ≈ 9 GB. VPS diski yeter; büyürse Cloudflare R2
  (çıkış ücreti yok) + Cloudflare CDN (DNS zaten orada).
- **Biçim**: `.m4a` (AAC-LC 48 kb/s mono) — Safari/iOS, Chrome, Android hepsinde `<audio>` ile çalar.
  Opus daha küçük ama iOS'ta güvenilir değil. Kaynak WAV'lar arşivde kalır, kodlama yayın adımı.
- **Yayın**: `content:publish` gibi bir `tts:publish` — tts-test'ten manifest (anahtar → dosya, puanlar,
  uyarılar) + dosyalar rsync. Kalite kapısı: Whisper + fonem kontrolü geçmeyen klip yayına girmez, listeye düşer.
- **Mobil çevrimdışı**: kurs paketleri mevcut içerik teslim hattıyla (`/api/content/i/<hash>`) — kelime
  katmanı ses paketi olarak indirilebilir (de kursu tek ses ≈ 21 sa ≈ 450 MB; A1–A2 alt kümesi ≈ 100 MB).
- **Yetki**: statik dosyanın maliyeti yok; sentez kapısı (oturum, günlük tavan) yalnız üretilmemiş
  metinde kalır.
- **Önbellek boşaltma**: bir sesin karşılığı değişince (yeni referans) o sesin dizini ve nginx önbelleği.

## 5. Sıra

1. Hattı optimize et (örtüştürme, küçük Whisper doğrulaması, UTMOS-önce) ve RTF'yi ölç.
2. Katman 1'i (kelimeler, A1→C1 sırasıyla) dört karakterle üret; fonem kontrolü + dinleme raporu.
3. `/api/tts` içinde statik dosya yolu; ilk ses canlıya (bir kadın bir erkek, de kursu).
4. Katman 2 (dersler), sonra 3; kadro için +2 karakter.
5. Kiralık GPU ile toplu üretim, yerel GPU artımlı.
