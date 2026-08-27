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

## Açık kalanlar

- Görünürken tutulan mikrofon akışının Web Speech'i bozup bozmadığı cihazda ölçülmedi;
  `walk_listen` (`browser:no-speech` oranı) ilk gerçek yürüyüşte cevaplar. Bozuyorsa akış
  görünürken tutulmaz.
- Güven eşiği (0,4) ve PA eşikleri gerçek kayıtlarla kalibre edilecek.
- Cepte Web Speech kalitesi istenirse "karanlık ama görünür ekran" (cep kilidi) ayrı bir iş.
