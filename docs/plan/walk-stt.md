# Yürürken modu — ses tanıma kararı ve ölçümleri

Tarih: 2026-08-27. Şikâyet: "Ekran açıkken Web Speech yerine Deepgram'a gidiyor; sunucu ne
desem anlamıyor, olmayan kelimelerle cevap veriyor." Sahibin üç şartı: (1) Azure'a giden ses
doğruluktan ödün vermeden en aza insin, (2) ekran açıkken **asla** Azure kullanılmasın,
(3) tur sürerken ekran kapanırsa geçiş doğru yakalansın.

## Teşhis (kod ve veri)

- `walk-player.tsx`'te iki boş dinlemeden sonra tarayıcı tanıyıcısı **oturum boyunca**
  bırakılıp sunucuya geçiliyordu (`BROWSER_GIVE_UP = 2`, sessizlik tavanı 4 sn). Düşünme
  süresi 4 saniyeyi aşan iki cevap yetiyordu. Tanıyıcının hata kodu yutuluyordu.
- Sunucu STT tek kelimelik ceplik kliplerde uyduruyordu ve uydurma metin **yanlış cevap**
  sayılıyordu (Groq/Mistral güven vermediği için eşik çalışmıyordu). `ai_usage`, sahibin
  telefonundan: Groq 21 klipte ~6 doğru (`der Großvater → "Wolfsfatter"`, `raten → "Per
  Geschenk."`), Deepgram 20'de 9 doğru + 8 boş; 27 Ağustos'ta 5'te 1 (`der Kühlschrank →
  "Kulsag"`).
- Süresi dolan dinleme kaydı ve isteği iptal etmiyordu: aynı saniyede iki STT çağrısı.
- `walk_end` 60 günde hiç yazılmamıştı (çıkış geri hareketiyle oluyor).

## Platform gerçekleri (Android Chrome)

| Gerçek | Kaynak |
|---|---|
| Sayfa gizlenince Web Speech **Android'e özel** `abort()` ile iptal ediliyor | Blink `speech_recognition.cc`, `PageVisibilityChanged` |
| `start(MediaStreamTrack)`, `available()`, `install()`, `processLocally`: Chrome Android'de **yok** | MDN browser-compat-data (`chrome_android: false`; masaüstü 135/139) |
| Android 12+'da Chrome, `com.google.android.tts` (cihaz üstü Google tanıyıcı) kullanıyor | Chromium `SpeechRecognitionImpl.java` |
| Eşzamanlı kayıtta yalnız "üstteki UI" ses alır; gizlilik-hassas kaynak her zaman kazanır | developer.android.com "Sharing audio input" |

Sonuç: cepte Web Speech'in tek yolu sayfayı görünür tutmak. Gerçek ekran kapalıda yol
kayıt + sunucu; sunucunun "Web Speech kalitesine" yaklaşması gerekiyordu.

## Azure Speech F0 (hesap 2026-08-27'de açıldı, bölge `germanywestcentral`)

Önceki "Azure yok" kararının sebebi ilke değil hesap açılamamasıymış (tenant hatası);
çözüldü. Google Cloud STT ile kıyas: Google 60 dk/ay ve **her istek 15 sn'ye yuvarlanıyor**
(≈ 240 klip/ay ≈ 11 yürüyüş); Azure F0 5 saat/ay, saniye başı, telaffuz puanı dâhil.

Duman testi ve 15 kelimelik TTS matrisi (`Katja`, bir kısmı `Conrad`):

- Düz STT: 15/15 doğru, güven 0,85–0,95, ~400 ms; kısa sözde NBest **tek aday**.
- Sessizlik: uydurma yok (`RecognitionStatus` boş/`Omission`, güven 0). Yanlış dilde çöp
  0,21 güven.
- Telaffuz puanı karışan çiftleri ayırıyor: Küche 82 ↔ Kuchen→Küche 28; schön 100 ↔ schon
  54; Stadt 82 ↔ Staat 43; Weg 96 ↔ Weck 52. **Ama** temiz TTS "Katze" kelime 44
  "Mispronunciation", "Kühlschrank" 59 (Katja) / hatasız (Conrad): kelime puanı 44–100
  dalgalı, WP-20'nin ≥80 eşiği kalibre edilmeden kullanılamaz. Karar düz STT'den; PA yalnız
  "neresi zayıf" ipucu (drill/sınav işi).
- Fonem: konum başına skor geliyor (schon→schön: 67/**10**/34, 2. ses = ö), sembol **boş**
  (IPA/SAPI ikisinde de). Hedefin ses dizisini biz bildiğimiz için konumdan ipucu
  üretilebilir. PA modunda `Lexical` referansı yansıtıyor → ne söylendiği için düz çağrı
  ayrı gerekiyor.

## Kırpma ölçümü (`lib/vad`)

6 sn'lik üretim benzeri pencere (1,5 sn sessizlik + kelime + 2,5 sn, −38 dBFS gürültü):

| kelime | pencere | kırpılmış | gönderilen |
|---|---|---|---|
| die Katze | 0,88 | 0,90 | 5,6 s → 1,1 s |
| der Weg | 0,88 (temizde "der" 0,63) | 0,92 | 5,5 s → 0,9 s |
| der Kühlschrank | 0,85 | 0,85 | 5,9 s → 1,3 s |
| mindestens | 0,89 | 0,95 | 5,8 s → 1,3 s |
| der Großvater | 0,85 | 0,90 | 5,9 s → 1,4 s |

Toplam 34,4 → 6,9 s (%80). Sessiz pencere hiç gönderilmiyor. Kota: ~27 s/yürüyüş → 5 saat
≈ **660 yürüyüş/ay** (eskiden ~110 s/yürüyüş → 163).

## Uygulanan tasarım (commit'ler 2026-08-27)

1. `lib/stt.ts`, `chat-providers.ts`: `SttMode` — `walk` (gizli sayfa): Azure → Deepgram →
   Whisper'lar; `default`: değişmedi, Azure yok. Aylık Azure saniyesi `ai_usage`'dan, 4,5 sa
   tavan (`AZURE_STT_MONTHLY_SECONDS`).
2. `pocket-mic.ts` + `lib/vad.ts`: PCM üstünde konuşma bölgesi, yalnız o parça gidiyor,
   sessizde istek yok; kesilemeyen ama sesli pencere bütünüyle gidiyor (yanlış ret yanlış
   kabulden kötü). Zincir kipi görünürlükten seçiliyor; iptal edilebilir kayıt/istek.
3. `walk-player.tsx`, `use-listen.ts`: görünürken yalnız tanıyıcı (vazgeçme yok, sessizlik
   7 sn, yalnız ölü kodlarda bırakma ve sesle bildirme; o hâlde bile `default` kip);
   dinlemede kapanma → soru tekrar okunup cep yolu; açılınca süren kayıt bekleniyor;
   `walk_listen`/`walk_switch`; `?diag=1`; unmount'ta `walk_end`.
4. `test:walk` senaryoları: `visible-only` (ekran açık, sunucuya sıfır istek), `switch`
   (kapan → kayıt gider, aç → bir daha gitmez, tur sürer); `test:vad`.

## v2 (aynı gün): tutulan mikrofon tanıyıcıyı öldürüyor

İlk sürüm deploy edildi; sahip "ekran açıkken sürekli duyamadım, TTS oyunlardaki gibi değil,
mikrofon açıldı işareti bazen gelmiyor" dedi. `walk_listen` verisi (17:00–17:02, iki deneme):

```
17:00:25 browser:end   17:00:39 browser:end   17:00:53 browser:end   → walk_end 3
17:01:30 browser:end   17:01:44 browser:end   17:01:58 browser:end   → walk_end 3
```

Altı dinlemenin altısı `end`: tanıyıcı açılıyor, hata vermeden ve hiçbir şey duymadan
kapanıyor. Aynı kod sahte tanıyıcıyla (`demo-u`, test koşumu) `browser:ok`. Derslerle tek
fark: yürüyüş oturum başında mikrofon akışını tutuyordu (parçaları kapalı). Android eşzamanlı
kayıt kuralı — sesi üstteki uygulama alır, öteki sessizlik — tanıyıcı servisini sağır
bırakıyor; aynı akış Bluetooth'ta çıkışı SCO'ya düşürüp okumayı bozuyor (TTS şikâyeti).
Okumanın diğer yarısı: yürüyüş ses-öğesi zincirini, oyunlar boşluksuz WebAudio yolunu
kullanıyordu.

Karar: **ekranda kip dersle birebir aynı** (mikrofon tutulmaz, sessiz döngü çalmaz, okuma
oyunların yolundan, işaret dersin işareti). Cep yolu **"Cebe koy"** ile: mikrofon ve sessiz
döngü dokunuşun içinde kuruluyor (mikrofon kilitli ekranda istenemiyor — tek izinli an bu),
ekran kapanınca kayıt; ekran açıkken cepte kipinde dinlenmiyor (30 sn'de kapanmazsa ekran
kipi), ekran açılınca kendiliğinden ekran kipi. Ekran kipinde ekran kapanırsa tur durup
çaresini söylüyor. Bedeli: otomatik geçiş yok — platform kısıtıyla (kilitli ekranda mikrofon)
cihaz kısıtı (tutulan mikrofon tanıyıcıyı öldürüyor) birlikte başka çıkış bırakmıyor.

Bulunan ikinci hata: düğmeden doğrudan `say` çağırmak döngünün okumasını iptal edip döngüyü 30
sn'lik tavana kadar asıyordu (harness: 1,3 → 31,3 sn); duyuruyu döngü kendi sırasında okuyor.

## v3 (aynı gün): kilitli ekranda klip WAV'a çevrilemiyordu

v2 deploy edildi; "Cebe koy → ekranı kapat → hiçbirini duymadı." `ai_usage`/`walk_listen`:

```
azure ok  "die Verfügung"→"die verrü" 0.50   (ekran daha açıkken, WAV gitti)
azure/deepgram/groq/cloudflare/speechmatics/mistral ERR 400  ×3 tur
  azure: "desteklenmeyen biçim audio/webm;codecs=opus"
  ötekiler: "corrupted / could not decode / invalid audio"
walk_listen: stt:silent ×3 (bir tur), stt:network ×3 (öbür tur)
```

Kök neden: `transcribe` klibi `decodePcm` ile WAV'a çeviriyor; `new AudioContext()`
kilitli ekranda **suspended** başlıyor ve o bağlamda `decodeAudioData` çözmüyor. Ekran
kapanır kapanmaz her klip ham webm gidiyor; Azure webm almıyor, halka-tampon dilimi
ötekilerde bozuk sayılıyor. Ekran açıkken çözülen tek klip (`die Verfügung`) duyulmuştu.

Düzeltme: `decodePcm` baştan sona **OfflineAudioContext** ile (donanıma bağlı değil, render
güdümlü; kilitli ekranda çözer). Ayrıca gözlem: `silent` (çözüldü, konuşma yok) ile `decode`
(çözülemedi) ayrı sebepler; `silent`te klibin tepe-dB'si de kaydediliyor (`walk_listen` kind,
`?diag=1` satırı) — gerçekten sessiz mi yoksa VAD mi kaçırdı, gerçek veride ayrılsın. TTS:
okuma yolu artık kipe değil GÖRÜNÜRLÜĞE bağlı — cepte kipinde ekran açıkken de oyunların
boşluksuz WebAudio yolu (armed'ken erken ses-öğesine geçmiyor).

> Uyarı: OfflineAudioContext'in kilitli ekranda çözdüğü en iyi bahis ama gerçek cihazda
> doğrulanmadı. Deploy sonrası `walk_listen`'da hâlâ `stt:decode` görülürse Plan B: cevap
> başına tek `MediaRecorder` (oneShotClip) ile geçerli webm üretip Deepgram'a göndermek
> (kalkış gecikmeli ama çözülebilir dosya).

## v4 (aynı gün): client decode kilitli ekranda imkânsız — webm + Deepgram

v3 (OfflineAudioContext) de sahada düştü: `walk_listen` hâlâ `stt:decode` ×N, `ai_usage`'da
karşılık YOK (istek hiç gitmedi — client çözemedi). Yani `OfflineAudioContext.startRendering`
de kilitli ekranda ilerlemiyor; ekran AÇIKKEN çözülen klipler (`die richtung` 0.89) Azure'a
gidip duyuldu, kapalıyken hiçbiri. **Sonuç: istemcide ses çözme/WAV'a çevirme kilitli ekranda
yapılamaz — o yol tamamen bırakıldı.**

Yeni tasarım: cep yolu her cevap için stream'den TEK `MediaRecorder` açıp parçaları baştan
sona kesintisiz birleştiriyor (`recordFreshClip`) — **geçerli webm/opus**. Sunucu ham çözüyor;
istemcide decode/VAD yok. Zincir `walk`: **Deepgram önde** (webm native, başı-kesikte
uydurmuyor, boş dönüyor), sonra Groq/Cloudflare/Speechmatics/Mistral. Azure kısa-ses ucu webm
almadığı için (yalnız WAV/OGG) STT zincirinden çıktı — yalnız TTS yedeği kaldı; `azure()`
adaptörü ve kota emniyeti kodda duruyor ama seçilmiyor (ileride telaffuz kartı WAV verirse).

Bedeller: (1) ön-pay yok — kalkış gecikmesi küçük (stream açık, yalnız kaydedici taze) ama
kelimenin ilk ~50 ms'i kaçabilir; Deepgram başı hafif kesikte çözer, çok kesikse boş döner
("duyamadım", ceza yok). (2) VAD kırpma yok — klip 1–4 sn Deepgram'a gider (kredi bol);
konuşma bitişi yine bayt boyutundan (kilitli ekranda çalışan tek ölçüt). (3) Azure'un
dürüstlük/güven avantajı gitti ama Deepgram de dürüst (ölçüldü: başı-kesik → boş).

Ayrıca: ekran açık turlar arası ~0,55 sn nefes ("aşırı hızlı" geçiş). Ve bir kullanıcı
(Samet) yürürken modunda idx=19'da yarım turda takılıp resume loop'una girmişti — üretimde
yalnız o `session_state` satırı silindi (kalıcı ilerleme user_words/reviews'te durdu).

## v5 (aynı gün): geçerli webm sessizdi — ekran kapalıyken yeni kayıt başlamıyor

v4 webm geçerliliğini çözdü (Deepgram artık 400 değil **200 ok**) ama klip SESSİZ:
`walk_listen` `deepgram:empty` ×N, `ai_usage`'da `deepgram ok heard="" conf=0`. Bitiş algısı
hiç konuşma bulamadı (maxMs'e kadar). Yani cepte kipinde ekran kapalıyken mikrofon ses
vermiyordu. Sebep: `recordFreshClip` her cevap için ekran KAPALIYKEN taze `MediaRecorder`
başlatıyordu; Android arka planda yeni `AudioRecord`'u sessiz geçiyor. Kanıt: v1–v3'ün sürekli
kaydedicisi (ekran açıkken başlamış) ekran kapalıyken SESLİ klip veriyordu (400'ler "bozuk
format"tı, "ses yok" değil) — fark, kaydın ne zaman başladığı.

Düzeltme (`recordAnswerClip`): kaydedici "Cebe koy" anında (ekran açık) başlatılıp AÇIK
tutuluyor; her cevap ondan kesiliyor. Geçerlilik için geriye yürüme YOK — cevap başında tampon
sıfırlanıp başlık + ardışık küme(ler) kesintisiz gidiyor. Böylece iki gerçek birleşti: sürekli
kaydedici (arka planda ses) + kesintisiz kesme (geçerli webm). Konuşma bitişi yine bayt
boyutundan (kilitli ekranda çalışan tek ölçüt).

## v6 — CİHAZ TESTİ: kök neden HyperOS, kodla aşılamaz (2026-08-28)

Kullanıcının telefonuna adb (wireless) ile bağlanıp bizzat test edildi. Cihaz: **Xiaomi Redmi
Note 13 Pro+ (2312FPCA6G, emerald), Android 16, HyperOS 3.0, Chrome 151**, PWA WebAPK olarak
yüklü. Gerçek test (Cebe koy → ekran kapat → konuş): cep yolu ÇALIŞTI (`armed`, `browser:aborted`
geçişi, 3× kayıt), ama 3 klibin de 5 sağlayıcıya gidip hepsi **400** verdi (`stt:network`,
boş/bozuk klip). Sebep logcat'te, ekran kapalı olduğu SÜRECE 12 kez tekrar:

```
whetstone.activity: notifyMuteAudioInNeed uid is 10180 (Chrome), mScreenOnOff = false, status 0
AwareResourceControl: noteMuteAudioInNeed uid=10180 status=0 mCloundAudioEnable=true
```

**HyperOS'un güç yöneticisi (`whetstone` / `AwareResourceControl`), ekran kapanır kapanmaz
(`mScreenOnOff=false`) Chrome'u (uid 10180) sistem düzeyinde susturuyor** — mikrofon ve arka
plan sesi. Ayrıca `appops` `RECORD_AUDIO` UID modu **`foreground`** (arka planda mikrofon yok),
appops ile `allow` yapmak bile UID modunu değiştirmedi. İki katman birden: Android'in
mikrofon-foreground zorlaması + HyperOS'un Aware audio mute'u.

**Sonuç: PWA'da ekran kapalıyken mikrofon bu cihazda kodla ÇALIŞTIRILAMAZ.** recordFreshClip →
recordAnswerClip → webm/Deepgram zincirinin hepsi doğruydu ama hepsinin altında ses fiziksel
olarak kesiliyordu; v1–v5'in sırayla düşme sebebi buydu. Bu, en baştaki platform notunun
(README: "ekran kapalıyken arka planda konuşma tanıma yok") HyperOS'ta daha da sert hâli.

Çözüm yolları (hiçbiri kodla "ekran kapalı"yı çözmez):
1. **Ekranı KAPATMA — karanlık ama açık ekran (cep kilidi).** HyperOS mute yalnız
   `mScreenOnOff=false`'ta tetikleniyor; ekran açıksa yok. Ekranı simsiyah + wake lock ile
   açık tutup Web Speech'i (ekran açık kipi, kaliteli) cepte kullanmak — tek garantili yol.
   Ekran kilidiyle (Screen Wake Lock) ekran açık kalır; güç tuşuna basılmazsa mute yok.
2. **HyperOS ayarı (garanti değil):** Wortspiel/Chrome → pil "Kısıtlama yok"; Geliştirici
   seçenekleri → "MIUI optimizasyonu"nu kapat (`whetstone`/Aware gevşeyebilir). Kullanıcıya
   bağlı, taşınabilir değil.
3. Kabul: cep yolu yalnız mikrofonu kesmeyen cihazlarda (stok Android, bazı OEM'ler) çalışır;
   HyperOS/MIUI'de ekran kapalı desteklenmez, ekran açık kipi kullanılır.

Sahibin kararı (2026-08-28): "bu hep vardı, sonra düzeltilebilir" — cep yolu ekran-kapalı
şimdilik açık bırakıldı. Ekran açık kipi kusursuz çalışıyor.

## v7 — "Karanlık ama açık ekran" (cep kilidi) uygulandı, cihazda denenecek

Sahibin isteğiyle 1. çözüm kuruldu. "Cebe koy · ekranı karart" düğmesi (`darken`): ekranın
üstüne tam ekran siyah bir katman koyuyor (`screenDark`), tüm dokunmaları yutuyor (cepte
kazara basılmasın), çıkış için 1,2 sn'de üç dokunuş. Wake lock tur başında zaten alınıyor;
ekran teknik olarak AÇIK kalıyor (`mScreenOnOff=true`) → HyperOS'un ekran-kapanınca-sustur
davranışına hiç girilmiyor → tarayıcının kendi tanıyıcısı (ekrandaki kusursuz yol) cepte de
çalışıyor. Kayıt/sunucu (arm) yolu bu modda KULLANILMIYOR — ekran açık, Web Speech yeter.

Düğme yalnız tanıyıcı olan tarayıcıda çıkıyor (sunucu STT şartı kalktı). Güç tuşuyla gerçek
kapatma yine "tur durur, çaresini söyler" (o an mikrofon susar). Eski arm/recordAnswerClip/
cep-kayıt kodu ölü kaldı (silinmedi; stok Android gibi mikrofonu kesmeyen cihazlar için
ileride, ya da temizlik commit'inde).

> Cihazda doğrulanacak: "Cebe koy · ekranı karart" → cebe koy → konuş → tanıyor mu.
> logcat'te ekran açık kaldığı sürece `notifyMuteAudioInNeed ... mScreenOnOff=false` GÖRÜNMEMELİ
> (ekran açık); `walk_listen` `browser:ok` gelmeli. `test:walk`ın cep-kayıt senaryoları
> (`switch`/`ok`) bu değişiklikle eskidi — karart moduna göre güncellenecek (ayrı iş).

## Açık kalanlar
- Küçük UX: 3. duyulmamada tur durunca son "duyamadım" anonsu, durma anonsuyla çakışıp
  kesiliyor (stopAll okumayı iptal ediyor). Sahibin notu; ertelendi.
- recordAnswerClip mikrofonu KESMEYEN bir cihazda (stok Android) doğrulanmadı; teoride doğru.
- Deepgram kredisi biterse Groq'a düşer; `report:providers` ile izlenmeli.
- Güven eşiği (0,4) gerçek Deepgram kayıtlarıyla kalibre edilecek.
- Ölü kod: halka tampon altyapısı (`recordClip`, `activateMic`, `oneShotClip`, `lib/vad`
  cep tarafı) artık kullanılmıyor; ayrı bir temizlik commit'ine bırakıldı.
- Cepte de Web Speech istenirse "karanlık ama görünür ekran" (cep kilidi) ayrı bir iş; ekran
  kipinde ekran kilidi zaten ekranı açık tutuyor, ekranı kapatmadan cebe koymak bugün çalışır.
- Bluetooth'ta cepte kipinin okuması SCO yüzünden telefon kalitesinde olabilir; girişi telefon
  mikrofonuna sabitlemek bunu çözer ama kumaş arkasından dinler — sahibin tercihi.
