# Kendi karakter sesleri (Defne, Aras) — durum, envanter, sunum

## DURUM — kelime katmanı (2026-09-23)

Samet'in kararları: seçilebilir sesler **Defne** (kadın) ve **Aras** (erkek); Mira/Can yalnız diyalog kadrosu,
seçilemez. Günlük tur, pratik ve yürüyüş modunun kelime katmanı canlıda **yalnız** bu iki karakterin önceden
üretilmiş dosyalarından çalar — Edge'e de cihaz sesine de düşüş YOK; tabloda olmayan metin susar.

| Ne | Nasıl |
|---|---|
| Ses kimlikleri | dil önekli: `de-DE-Defne`, `en-US-Aras`, `tr-TR-Defne`… (`lib/tts/voices` `OWN_VOICES`, mobil aynası). Eski Katja/Conrad/Jenny/Guy tercihi cinsiyetine göre çevrilir (`resolveVoice`), DB göçü yok. Zürih: Leni/Jan kalır. |
| Kelime isteği | istemci `k=w` ekler (web `speakWord`/`prefetchWord`/`SpeakButton word`, mobil `speakTarget(…, { word: true })`); uç tabloda bulamazsa 404 (`no_own_audio`, günlüğe `[tts-own]`). |
| Kelime dışı içerik | konuşma, beceri, dinleme, okuma, sohbet henüz üretilmedi: karakter sesi Edge karşılığıyla (Defne→Katja/Jenny/Emel, Aras→Conrad/Guy/Ahmet); konuşma/dinleme sabit sesi `conversationVoice` Katja/Jenny/Leni; çok konuşmacılı diyalogda konuşmacı başına kadro sesi (`lib/tts/speakers`). |
| Yürüyüş modu | hedef kelime seçilen karakter; anlam karakterin ANADİL sesi (`glossVoice`); anlatım cümleleri Emel/Jenny/Katja. |
| Kutular | cümle dizmede her kutu AYRI üretilmiş kayıt (cümleden kesme değil: yanlış dizilince ezgi saçmalardı); metin `tileSpeech` (kenar noktalaması atılır). |
| Sunucu | `TTS_OWN_DIR` (`/opt/lernomi/tts-own`: `tts-map.json` + `m4a/`). **Yayın anahtarı**: boşsa kelimeler Edge karşılığıyla, doluysa düşüşsüz. Tablo dakikada bir tazelenir; cevap `max-age=86400` + ETag (nginx aynı başlığa uyar, boşaltma gerekmez). |
| Kapsam kapısı | `npm run tts:coverage -- --words <döküm> --map <tts-map.json> [--produced …] [--jobs eksik.jsonl]` — uygulamanın kendi işlevleriyle her metni kurar, eksikleri tts-test iş biçiminde yazar. `TTS_OWN_DIR` ancak bu KAPSAM TAM derken doldurulur. |
| Ses bekçisi (2026-09-24) | `npm run tts:watch` (`scripts/tts-own-watch.ts`, hesap `tts-own-needs` ile aynı): canlı `words` tablosu ↔ `tts-map.json`. Üretim işini `TTS_OWN_DIR/eksik.jsonl`e yazar, YALNIZ yeni eksik varsa tek satır basar. Sunucuda `/opt/lernomi/tts-watch.sh` çağırıyor (repo dışı): her gece `lernomi-tts-watch.timer` + her deploy sonu; gece turu son 24 saatte kullanıcıya 404 dönen kelime isteklerini (`[tts-own]` günlüğü) de ekler, mesaj Telegram'a. Metin düzeltmesi ya da yeni içerik sesi olmadan gelirse buradan duyuluyor. |
| Kulak kontrolü kararları (2026-09-24) | Canlı `tts_reviews` tablosu (schema `ttsReviews`, `npm run tts:reviews -- import|export [--ok]`). Karar SESE bağlı: `file` yayındaki içerik adresli m4a adı; ses yeniden üretilirse yeniden dinlenir, onaylı ses bir daha sorulmaz. YALNIZ ONAY "incelendi" sayılır (Samet); red bir düzeltme işi, notuyla durur ama hiçbir yerde "geçti" diye kullanılmaz. Notlar sesletim düzeltmelerinin kaynağı. tts-test karar senkronu (`karar_yaz.py`) yazar; paket kurarken ve yeniden üretime aday seçerken `inceleme.py` › `onaylilar()` (`export --ok`) ile onaylıları dışarıda bırakır. Yeni bir Whisper taraması da önce buna bakmalı. |
| Test | `npm run test:tts-own` (CI'da). |

Kaldırılanlar: mobil boşluk doldurmada boşluklu cümlenin hoparlörü (bozuk cümle okuyordu, webde yoktu); serbest
cümle geri bildiriminde hoparlör (kullanıcının kendi cümlesi, önceden üretilemez).

Kaynak: `scripts/tts-inventory.ts` (çıktı `reports/tts-inventory.json`) ve tts-test'teki ölçümler.
Kapsam dışı: **sohbet** (AI cevapları; Edge'de kalıyor) ve **gsw-zh** (Zürih; karakterlerin İsviçre
Almancası yok, de-CH Edge sesinde kalıyor).

## 1. Envanter (sohbet hariç, benzersiz metin)

| Katman | Kaynak | Benzersiz metin | Karakter | Tahmini ses* |
|---|---|---|---|---|
| 1 | Kelimeler: madde + artikel, çoğul, örnek cümle, anadil karşılığı (yürüyüş modu) — de + en | 42.800 | 1,07 M | 21 sa |
| 2 | Konuşma anlatımı (TR) + konuşmadaki hedef dil parçaları — de + en kursu | 45.400 | 2,05 M | 41 sa |
| 3 | Dinleme diyalogları: deneme sınavı, beceri, modül sınavı | 10.700 | 0,96 M | 19 sa |
| 4 | Okuma metinleri (deneme + beceri; sesli okuma düğmesi) | 5.000 | 1,16 M | 23 sa |
| — | Anlatım arayüz cümleleri (yürüyüş, konuşma geri bildirimi) × 3 anadil | 270 | 0,01 M | — |
| | **Toplam, tek ses için** | **104.000** | **5,25 M** | **~104 sa** |

*14 karakter/sn konuşma hızıyla. Bu **bir** sesin envanteri. Kurs başına iki seçilebilir ses var
(kadın/erkek) ve karakter üç dili de konuştuğu için anlatım + hedef dil aynı karakterden çıkacak;
yani seçilebilir her karakter için katman 1–2 ayrı üretilir. Diyalog kadrosu (3K+3E) için iki karakter
daha gerekir ya da perde kaydırma kalır.

Öncelik: 1 → 2 → 3 → 4. Katman 4 en düşük değer (okuma için), en son ya da hiç.
Hız kademeleri (`slow`, `listen`, `listen-slow`) yeniden üretilmez: yayın anında zaman germe
(ffmpeg `atempo` / rubberband), GPU maliyeti sıfır, depolama ×4.

## 2–3. Üretim hızı (tts-test, ölçüm 2026-09-19)

Hat RTX 4060 Laptop'ta: take puanlaması üretimle örtüştürüldü, UTMOS önce, DE/EN kontrolü Whisper `small`
(Türkçe büyük modelde kaldı); kalite ayarları (20 adım, 2 take, referans + bağlam) değişmedi. Sonuç:
parça başına ≈ 5,5 sn; bir sesin kelime katmanı ≈ 60 sa, konuşma katmanı ≈ 72 sa. Toplu üretim için
kiralık RTX 4090 (4060'ın 2–2,5 katı) ≈ 35–60 $ / ses.

## 4. Sunucuda sunum — GPU yok, her şey statik

Canlıda sentez yok; dosyalar önceden üretilir.

- **Tablo:** tts-test `yayin.py` her klibi içerik özetiyle adlandırıp `tts-map.json` yazar:
  `"<karakter>|<dil>|<temiz metin>" → "<karakter>/<ad>.m4a"`. Sunucu `TTS_OWN_DIR` altında tabloyu ve
  `m4a/` dizinini bulur (`src/lib/tts/own.ts`); tablo dakikada bir tazelenir, yeniden başlatma gerekmez.
- **Sözleşme:** `/api/tts` adresi aynı kalır. `TTS_OWN_DIR` doluyken kelime isteğinde (`k=w`) tabloda yoksa **düşüş yok**, 404
  (`no_own_audio`). Kelime dışı karakter sesi istekleri Edge karşılığına gider.
- **Önbellek:** cevap `public, max-age=86400` + ETag (ad içerik özeti), `immutable` değil: yeniden
  üretilen kayıt en geç bir günde yayılır. nginx aynı başlığa uyar, boşaltma gerekmez.
- **Biçim:** `.m4a` (AAC-LC 48 kb/s mono) — Safari/iOS, Chrome ve Android'de çalar. Yalnız normal hız
  ve orta perde üretildi; kelime katmanında yavaş ya da perdeli istek yok.
- **Depolama:** 4 ses × ~104 sa ≈ 9 GB; VPS diski yeter, büyürse Cloudflare R2.
