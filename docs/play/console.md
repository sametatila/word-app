# Google Play Console — uygulama erişimi, Google girişi, ön plan servisi (Lernomi, `com.lernomi.learn`)

Çekirdek hesapsız açık ("Continue without an account"); sosyal özellikler, sonraki yapay zekâ
değerlendirmeleri ve Premium satın alma hesap istiyor. Play incelemesi bu yüzden test kimlik
bilgisi ister ("some functionality is restricted"). iOS karşılığı `docs/appstore/connect.md`.
Açık konsol işleri `docs/store/audit.md` (M7, M8, M9).

## 1. App content › App access

Seçim: "All or some functionality is restricted" → "Add new instructions".

| Alan | Değer |
|---|---|
| Ad | Lernomi inceleme hesabı |
| Kullanıcı adı | `google-review@lernomi.app` (Premium, sunucuda yalnız inceleme için verildi) |
| Parola | Yalnız Console'da |
| İkinci hesap (metin içinde) | `google-review-free@lernomi.app`, Premium'suz: satın alma akışı için |
| Any other information | Aşağıdaki İngilizce metin; yer tutucular Console'da doldurulur |

**Neden iki hesap.** Ekran kapalı yürüyüş Premium (ücretsizde `/api/stt` `mode=walk` 403), bu
yüzden ana hesap Premium; Premium hesapta paywall plan listesini göstermez, satın alma ikinci
hesapla denenir. İki hesap üretimde açık ve e-postaları doğrulanmış; parolalar bu belgeye
yazılmaz.

Metin iOS notuyla aynı adları kullanır (`mobile/src/i18n/en.ts`): yürüyüş modu **Öğren**
sekmesinde (Öğren › Yürüyüş modu), hesap silme Profil › Ayarlar › Hesap › Hesabı sil (Hesap
grubunun son satırı; Profil'in altındaki bağlantı da aynı ekrana gider). Android'e özgü olan
7. adım: ön plan servisi bildirimi. 8. adımdaki Bildir kapsamı Play'deki build'e göre yazılır
(deneme sınavı ve lig satırı düğmesi 2026-09-25 sonrası commit'lerde, vc 8'de yok).

```text
Review accounts: the account above has active Premium, so Pocket Walking (walk mode with the screen off) and AI feedback work without a paywall. It does not expire and needs no one-time code. Premium on the review accounts was granted on our server for review only. To review the subscriptions, sign in with the second account, which has NO Premium: [[IAP_DEMO_EMAIL]] / [[IAP_DEMO_PASSWORD]]. There, Profile › "Go Premium" opens the purchase screen with both subscriptions, prices, free trial terms, auto-renewal text and links to the Terms of Use and Privacy Policy.

1. Onboarding: course German, level "From scratch", goal "Easy".
2. No account needed: on the sign-in screen, "Continue without an account" opens the daily round, practice, the weekly quiz, Skills, the Path, exams and walk mode with the screen on. Without an account the Path's Speaking step runs as a prepared conversation. Friends, leagues, AI conversation and buying Premium need an account; those screens say so, and guest progress moves into the account. Guests delete their data under Profile › Delete guest data.
3. To review account features: "Continue with email" and the account above. If a Cloudflare "Verify you are human" box appears on the email form, tick it (about 2 seconds).
4. On the notification permission screen you may tap "Maybe later".
5. Tabs: Learn (daily round, practice, weekly quiz, mock exams, walk mode), Path (units with Reading, Listening, Speaking, Writing, Grammar and Quiz steps, plus module and level exams), Skills, Friends.

6. AI consent (User Data policy, prominent disclosure): before a feature first sends text to an AI provider (e.g. a Skills writing task or a Path Speaking conversation), a consent screen says what is sent, names each provider and links to the privacy policy. Nothing is sent before "Allow and continue". "Continue without AI" keeps the app usable. The choice is enforced on our server and can be changed in Profile › Settings › Privacy.

7. Walk mode (microphone foreground service): Learn › Walk mode › Start → the microphone disclosure names the speech recognition providers → "I agree, start" → system microphone permission → notification permission (Android 13+). Turn the screen off with the power button: the "Walk mode is on" notification with a "Stop" button appears on the lock screen and the app keeps listening. Tap "Stop" (or X in the app) to end. If notification permission is denied, the walk screen says the notification will not appear and that walk mode is stopped from the app.

8. User content: other users' names appear in Friends and leagues. Open a user › "Block / Report", or long-press a leaderboard row to report. AI replies in Path Speaking conversations and AI feedback on speaking and writing answers (Path, Skills, module and level exams) have a "Report" link. Reports are reviewed within 24 hours; the reporter is notified of the outcome.

9. Account deletion: Profile › Settings › Account › Delete account (last row), also linked at the bottom of Profile. Please test with a separate account, not the review account.
```

## 2. Google ile giriş — OAuth istemcileri

Giriş native akışla (`@react-native-google-signin`): idToken'ın `aud`'u Web istemci kimliği
(`mobile/src/lib/googleAuth.ts`), Android istemcileri Google Cloud'da paket adı + SHA-1 ile
eşleşiyor. Bir Android istemcisi **tek** paket adı + **tek** SHA-1 taşır; her anahtar için ayrı
istemci gerekir, hepsinde paket `com.lernomi.learn`. Eşleşmeyen imzada giriş `DEVELOPER_ERROR`
ile kapanır ve sebebini söylemez. Paket adı değişirse bütün istemciler güncellenir.

Google Cloud › APIs & Services › Credentials › Create credentials › OAuth client ID › Android.

| Console'daki ad | Anahtar | SHA-1 | SHA-256 (assetlinks) |
|---|---|---|---|
| `lernomi-android` | debug (`android/app/debug.keystore`, depoda) | `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25` | `FA:C6:17:45:…:91:03:3B:9C` (assetlinks'te bilerek yok). Halka açık yayından önce silinecek (denetim T4) |
| `lernomi-android-upload` | yükleme anahtarı (`android/app/release.keystore`) | `2F:2F:57:45:C3:8D:F9:3B:2E:F2:7E:FB:17:42:2A:3F:13:30:9F:3F` | `D5:44:55:91:…:2C:9D:2D:E1` |
| `lernomi-android-play` | Play App Signing (Android ≤16'da görünen) | `4C:8A:3D:7A:02:17:51:E9:A7:3E:3E:6D:B7:F8:E5:54:A4:F8:56:34` | `2E:6D:8D:12:…:E9:74:F9:07` |
| `lernomi-android-play-37` | Play'in Android 17+ için eklediği döndürülmüş imza | `06:24:10:14:01:86:77:F8:96:3C:8B:29:08:D2:B7:2C:B9:8E:04:56` | `DE:E8:55:BD:…:46:75:2A:35` |

- Play App Signing yüklenen AAB'yi Google'ın anahtarıyla yeniden imzalıyor; Play'den indirilen
  her kurulum üçüncü ve (Android 17+) dördüncü satırla eşleşir. SHA-1'ler Play'in ürettiği
  evrensel APK'dan okundu (`generatedApks` + `apksigner verify --print-certs`).
- SHA-256 sütunu App Links için: sunucu `.env` › `ANDROID_CERT_SHA256` bu üçünü (Play, Play-37,
  yükleme) taşıyor, `/.well-known/assetlinks.json` onu yayımlıyor. Play yeni bir imza eklerse
  (APK'da yeni `Signer`) hem buraya hem o env'e girer. "Hybrid PQC Signer" ve "Source Stamp"
  sertifikaları uygulama kimliği değil, eklenmez.
- SHA-1'ler sır değil; burada `DEVELOPER_ERROR` ayıklarken karşılaştırmak için duruyor.
- **Onay ekranı** "Testing"te kalırsa yalnız test kullanıcıları girebilir ve jetonlar 7 günde
  düşer; halka açık sürümden önce **In production** (M9). Kapsamlar varsayılan (`email`,
  `profile`, `openid`), doğrulama incelemesi gerekmez.
- Sunucu: `GOOGLE_CLIENT_ID` (Web) ve `GOOGLE_CLIENT_SECRET` boşsa `/api/config`
  `providers.google=false` döner, düğme çizilmez.

## 3. Ön plan servisi beyanı (mikrofon)

Mikrofon tipli ön plan servisi için Console'da **beyan** ve **tanıtım videosu** gerekiyor: App
content › "Foreground service permissions". Beyan yoksa ya da video koda uymazsa politika reddi.

### Console alanları

| Alan | Değer |
|---|---|
| Kullanılan izin | `FOREGROUND_SERVICE_MICROPHONE` |
| Temel işlev | Kullanıcının başlattığı sürekli ses yakalama — yürüyüş modunda konuşma tanıma |
| Kullanıcıya faydası | Telefon cepteyken ve ekran kapalıyken sesli çalışabilmek; ekrana bakmadan söylenen cevabın değerlendirilmesi |
| Alternatif neden yok | Ekran kapalıyken mikrofon erişimi Android 9'dan beri yalnız mikrofon tipli ön plan servisiyle mümkün; WorkManager, JobScheduler ve normal servis bu işi yapamaz |
| Kullanıcı bunu nasıl başlatır | Öğren › Yürüyüş modu › Başla → mikrofon açıklama ekranı (sesin gidebileceği konuşma tanıma sağlayıcılarını adıyla sayar) → "Kabul ediyorum, başla" → sistem mikrofon izni → bildirim izni (Android 13+, servis başlamadan hemen önce). Onay ve mikrofon izni olmadan servis başlamaz |
| Kullanıcı bunu nasıl durdurur | Kalıcı bildirimdeki "Durdur"; uygulama içinden X; tur bitince kendiliğinden. Bildirim izni yoksa yürüyüş ekranı bunu ve durdurmanın uygulamadan yapıldığını kalıcı bir satırla söylüyor (`WalkModeScreen` `notifHidden`) |

### Videoda gösterilecek akış

Kesintisiz tek çekim, ses açık, 30–60 saniye, **Premium inceleme hesabıyla** (ücretsizde ekran
kapalı dinleme 403 alır) ve açıklama ekranını görmemiş bir kurulumla (ya da önce Ayarlar ›
Gizlilik › "Mikrofon onayını geri al").

1. **Öğren** sekmesi › "Yürüyüş modu" kutucuğu › **Başla**.
2. Mikrofon açıklama ekranı (`MicDisclosure`): sağlayıcı listesi yüklenene kadar beklenir.
3. **Kabul ediyorum, başla** → mikrofon izni → **İzin ver** → bildirim izni → **İzin ver**.
4. Bir kelime sorulur, sesli cevap verilir.
5. **Güç tuşuyla ekran kapatılır.** Kilit ekranında bildirim: başlık, "mikrofon dinliyor" metni,
   **Durdur**; sistemin mikrofon göstergesi açık.
6. Ekran kapalıyken bir kelime daha sorulur ve cevap verilir.
7. Kilit ekranındaki **Durdur**; bildirim kaybolur, mikrofon kapanır.

Kilit ekranında görünme kodda karşılığı olan bir iddia: kanal ve bildirim
`VISIBILITY_PUBLIC`, `FOREGROUND_SERVICE_IMMEDIATE`. Servis kalkamazsa (izin geri alınmış,
arka planda başlatma) kendini kapatıyor, JS'e `LernomiWalkServiceFailed` gidiyor ve ekranda
uyarı çiziliyor: servissiz arka plan kaydı yok.
