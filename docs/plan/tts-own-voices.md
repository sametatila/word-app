# Kendi karakter sesleri (Defne, Aras) — durum, envanter, sunum

## KAYNAK VE LİSANS — karakter sesleri (denetim İ5, 2026-10-07)

Defne, Aras, Mira ve Can **gerçek bir kişinin sesi değil**: VoxCPM2'nin ses tasarımı (voice design) özelliğiyle
yazılı bir tariften üretildiler (örnek, Defne: "warm, clear woman in her late thirties; calm, reassuring teacher…";
referans `tasarim_studyo_s100/s114` tohumları). Kimse kaydedilmedi, kimsenin sesi kopyalanmadı. Tarif ve
referanslar tts-test `characters/<ad>/character.json` ve `ref_<dil>.wav` (git'te, 631242a). Model VoxCPM2
(openbmb): kod ve ağırlıklar **Apache-2.0**, ticari kullanım serbest
([model kartı](https://huggingface.co/openbmb/VoxCPM2)). Hatta kalan öteki bileşenlerin lisansları tts-test
`LICENSES.md` (hepsi MIT/Apache/LGPL; ticari olmayan NISQA ürün hattında yok). Kalan risk (genel, düşük):
modelin eğitim verisi tam açıklanmamış; tasarlanmış bir sesin tesadüfen tanınmış birine benzemesi (kulak kontrolü).
Hukuki görüş değildir; LEG-5 hukukçusuna bu paragraf gösterilir.

## DURUM — kelime katmanı (2026-09-23)

**Üretim makinesi: Mac (2026-10-05).** Linux (RTX 4060, `ssh linux`) kalıcı olarak yok. Üretim
`~/Workspace/tts-test` (yerel git deposu: betikler + karakter referansları) ile Mac'te, aynı kapılarla:
`TTS_SIKI=1 TTS_KUYRUK_TR=1 kelimeler.py <koşu> --ses defne|aras` (VoxCPM MPS, Whisper ve UTMOS CPU;
2026-09-27 hız denemesi ve 2026-10-04 anlam düzeltmeleri bu yolla). DOĞRULUK KAYNAĞI SUNUCU: `tts-map.json` +
m4a. Mac'teki arşiv eksik bir kopya; `yayin.py` (tabloyu arşivden baştan kurar) Mac'te KİLİTLİ. Mac yayını
`anlam_yayin.py <koşu>` canlı tabloya ekler; `--yenile` yeniden üretilen kaydı eskisinin yerine koyar ama
onaylı (`tts_reviews` ok) dosyaya dokunmaz. Sunucunun eksik listesi (`eksik.jsonl`) her gün 08:40'ta
`eksik_mac.sh` ile (launchd `app.lernomi.tts-eksik`) üretilip yayına eklenir, sonuç Telegram'a.
Linux'ta kalan ve kaybolan: dinleme/konuşma (k4) kuyruğunun yayınlanmamış çıktıları; bu katmanlar canlıda Edge.

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

## KALAN ÜRETİM ENVANTERİ (2026-10-05, ölçüm)

İş listeleri uygulamanın kendi kurallarıyla (`tts-own-coverage`, `tts-listening-jobs`, `tts-reading-jobs`,
`tts-conversation-jobs` + anadili İngilizce/Almanca konuşmalar `resolveConversation`/`resolveEnConversation` ile)
kuruldu, canlı `tts-map.json` ile karşılaştırıldı. Ses süresi 14 karakter/sn.

| Katman | Kim çalar | Eksik iş | ≈ ses |
|---|---|---|---|
| Kelime + yürüyüş + anlam (3 anadil) | seçilen karakter | **0** (KAPSAM TAM, ses bekçisi) | — |
| Dinleme | sabit kadro (Defne, Aras, Mira, Can) | 7.137 (Aras 4.566 · Defne 1.806 · Mira 471 · Can 294) | 13,8 sa |
| Okuma | seçilen karakter (Defne VE Aras) | 5.492 (Aras 4.122 · Defne 1.370) | 21,5 sa |
| Konuşma | seçilen karakter (Defne VE Aras); anlatım kullanıcının anadilinde | 132.332 (karakter başına ~66 bin) | 143 sa |
| **Toplam** | | **~145 bin** | **~178 sa** |

Konuşma, karakter başına: anlatım tr 29,8 sa, anlatım de (İngilizce kurs, anadili Almanca) 19,5 sa, anlatım en
(Almanca kurs, anadili İngilizce) 14,8 sa, hedef dil parçaları 7,5 sa. Dinleme/okumanın yavaş sürümleri (`#listen`,
`#listenSlow`) üretim değil, yayında kodlama.
Ayrıca yeniden üretim: yukarıdaki "açmadan önce" maddeleri (okunuşu değişen 435 katman anahtarı, reddedilen katman
kayıtları, 163 karışık anlatım satırı). Kapsam dışı: sohbet (yapay zekâ cevabı, Edge) ve Zürih (gsw-zh).
Ölçek: 4090 kiralamada önceki hesap ses başına ~104 sa için 35–60 $ → bu envanter ≈ 60–105 $; Mac'te haftalar.

## DURUM — dinleme ve okuma katmanı: AÇIK (2026-10-08)

Sunucu `TTS_OWN_LAYERS="l:mira,l:can,l:defne,l:aras,r:aras,r:defne"`: dinleme ve okuma bütün kadroda kendi
sesimizden, Edge'e yalnız 3. koltuğun perde kaydırılmış sesi (`LAYER_SECOND_SEAT` dışı) ve tabloda olmayan yeni
metin düşüyor. Açılıştaki ölçüm (`tts-listening-jobs.ts` / `tts-reading-jobs.ts` × canlı tablo, asıl kayıt +
`#listen` + `#listenSlow`): dinleme Defne 7.342, Aras 5.063, Mira 471, Can 294; okuma Defne ve Aras 4.127'şer —
hepsi tam. Okumanın eksik yavaş sürümleri (Aras 5, Defne 2.114 kayıt) canlı m4a'dan atempo ile eklendi
(tts-test `yayin_kodla.encode_tempo`, `anlam_yayin` ile aynı kodlama). Her açılışta nginx TTS önbelleği
boşaltıldı: aynı adresin karşılığı Edge'den karaktere döndü.

Sürüyor: `tempo_defne` (tts-test `tempo_mac.sh`, Mac) Defne'nin dinleme/okuma kayıtlarını yeniden üretip
`--yenile` ile yerine koyuyor; yavaş sürümleri de yeniliyor. Tablo dakikada bir tazelendiği için açık katmanda
kendiliğinden yürürlüğe giriyor, önbellek boşaltmak gerekmiyor (`max-age` bir gün + ETag).

Yeni katman açarken ölçüt aynı: karakterin o katmandaki kapsamı TAM olmadan açılırsa aynı diyalogda ses satır
satır değişir (`ownLayerEnabled`). Açınca `/var/cache/nginx/lernomi-tts` boşaltılır.

**Konuşma katmanı (henüz yok, Edge):** anadili Türkçe kullanıcının konuşmaları (`tts-conversation-jobs.ts`,
47.435 parça) Defne'yle üretildi ve tabloda TAM (2026-10-08 ölçümü). Uygulama bu istekleri işaretsiz
gönderiyor; açmak için istemci (web + mobil) konuşma parçalarına `k=c` ve anadili eklemeli, sunucu yalnız
anadili Türkçe isteği tablodan vermeli (İngilizce/Almanca anadil anlatımı üretilmedi). Kalite notu:
~394 konuşma kaydı uyarılı (karışık Türkçe + hedef dil satırlarında bilinen hatalar, tts-test
`DEVIR-2026-10-07.md` §6).

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
