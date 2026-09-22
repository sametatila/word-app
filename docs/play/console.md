# Google Play Console — uygulama erişimi, giriş ve inceleme notları (Lernomi, `com.lernomi.learn`)

Uygulama hesapsız da kullanılabiliyor (2026-09-15, mağaza ön inceleme B24): giriş ekranındaki
"Continue without an account" çekirdek öğrenmeyi açıyor. Hatırlatmalar misafire de açık (cihaz içi) ve misafir
rızayla tek bir yapay zekâ değerlendirmesi alıyor. Sosyal özellikler, sonraki yapay zekâ
değerlendirmeleri ve Premium satın alma hesap istiyor; Play incelemesi bu yüzden
yine test kimlik bilgisi ister ("some functionality is restricted"). Google girişi de Play'in
imzaladığı sürümde ancak doğru SHA-1 kayıtlıysa çalışır. Bu belge iki formu ve inceleme öncesi kontrolleri toplar.

## 1. App content › App access

Seçim: "All or some functionality is restricted" → "Add new instructions".

| Alan | Değer |
|---|---|
| Ad | Lernomi inceleme hesabı |
| Kullanıcı adı / e-posta | `[[TEST_HESABI_E_POSTA]]` |
| Parola | `[[TEST_HESABI_PAROLA]]` |
| Diğer bilgiler | Aşağıdaki İngilizce metin, olduğu gibi |

Console'daki "Any other information" alanına **İngilizce** metin girilir.

Yollar 2026-09-14'te koddan doğrulandı: yürüyüş modu **Öğren** sekmesindeki "Yürüyüş modu"
kutucuğunda (`mobile/src/screens/LearnScreen.tsx`), Beceriler sekmesinde DEĞİL — eski notlar
yürüyüş modunu Beceriler'de gösteriyordu ve inceleyiciyi olmayan bir yola gönderiyordu. Hesap
silme **Profil › Ayarlar › Hesap › Hesabı sil**, Hesap grubunun son satırı (`SettingsScreen.tsx`); Profil
ekranının en altındaki bağlantı da aynı ekrana gidiyor. Düğme adları uygulamanın
İngilizce arayüzünden birebir (`mobile/src/i18n/en.ts`, kilit ekranı metni
`Localizable.strings` / `values-en/strings.xml`).

> **İnceleme hesabı Premium olmalı.** Ekran kapalı yürüyüş (arka planda dinleme) Premium:
> ücretsiz hesapta `/api/stt` `mode=walk` 403 döner ve inceleyici kilit ekranı akışını
> göremez. Hesap üretim veritabanında açılıp Premium tanımlanacağı için bu iş ayrıca
> onaylanır (mağaza raporu B07).

```text
Review account: the account above has an active Premium subscription, so walk mode with the screen off and AI feedback work without a paywall or purchase. It does not expire and needs no one-time code.

1. Open the app and go through onboarding with "Continue": course German, level "From scratch", goal "Easy".
2. The core app works without an account: on the sign-in screen, "Continue without an account" opens vocabulary rounds, lessons, skills, the path, walk mode with the screen on and exams. Reminders work without an account (set up on the device), and a guest gets one AI writing or speaking assessment after consenting. Friends and leagues, further AI feedback and buying Premium need an account; those screens say so and offer "Create account", and guest progress moves into the account. Guest data can be deleted under Profile › Delete guest data.
3. To review the restricted features, sign in instead: on the sign-in screen tap "Continue with email" and sign in with the account above.
4. On the notification permission screen you may tap "Maybe later".
5. Tabs: Learn (daily round, walk mode, mock exams), Path (lessons), Skills (reading, listening, writing, speaking, grammar).

6. AI consent (User Data policy, prominent disclosure): the first time a feature would send your text to an AI provider (for example a writing task in Skills or a conversation in a Path lesson), a consent screen says what is sent, names each provider and links to the privacy policy. Nothing is sent before you tap "Allow and continue". "Continue without AI" keeps the app usable. The decision is stored and enforced on our server, and can be changed under Profile › Settings › Privacy.

7. Walk mode (microphone foreground service): Learn › Walk mode › Start → the microphone disclosure names the speech recognition providers → "I agree, start" → system microphone permission → notification permission (Android 13+; the walk notification is only visible with it). Turn the screen off with the power button: the "Walk mode is on" notification with a "Stop" button appears on the lock screen and the app keeps listening. Tap "Stop" (or X inside the app) to end. If notification permission is denied, the walk screen says the notification will not appear and that walk mode is stopped from the app.

8. Account deletion: Profile › Settings › Account › Delete account (the last row; also linked at the bottom of the Profile screen). Please test deletion with a separate account, not the review account. Guests delete their data under Profile › Delete guest data.
```

Test hesabı: gerçek veritabanında `[[TEST_HESABI_E_POSTA]]` ile bir hesap açın, e-posta
doğrulamasını tamamlayın, seviyeyi A1 bırakın. Parolayı yalnız Console'a yazın; bu belgeye
yazmayın.

## 2. Google ile giriş — OAuth istemcileri

Google girişi native akışla çalışır (`@react-native-google-signin`): idToken'ın `aud`'u
Web istemci kimliğidir (`mobile/src/lib/googleAuth.ts`), Android istemcileri Google
Cloud'da paket adı + SHA-1 ile eşleşir. Play'den indirilen sürüm Play App Signing
anahtarıyla imzalandığı için o anahtarın SHA-1'i de kayıtlı olmalı; yoksa Google girişi
`DEVELOPER_ERROR` ile kapanır ve inceleyici "giriş çalışmıyor" yazar.

Google Cloud › APIs & Services › Credentials › Create credentials › OAuth client ID › Android.

Bir Android istemcisi **tek** paket adı + **tek** SHA-1 taşır, yani her anahtar için
ayrı bir istemci gerekir. Hepsinde paket adı `com.lernomi.learn`.

Play imzasının iki istemcisi 2026-09-23'te açıldı: `658160017552-ldo9hs50c0d5gtpdln43msbi4h5tdppl`
ve `658160017552-akpfvu629jceoavl1smk59unteuslp70` (`.apps.googleusercontent.com`).
Android istemcilerinin sırrı yok ve koda girmiyorlar; eşleşme paket adı + SHA-1 ile.

Play imzasının SHA-1'leri Play'in ürettiği evrensel APK'dan okundu (`generatedApks`
indir + `apksigner verify --print-certs`). V3.2 "Hybrid Classical Signer" yalnız
minSdk 37'de devrede: Play anahtar döndürmesi ekledi ve Android 17 cihazda sistem
paketin imzası olarak döndürülmüş sertifikayı bildiriyor. İkisi de kayıtlı olmazsa
Google girişi yalnız bir Android sürüm aralığında çalışır.

| Console'daki ad | Anahtar | SHA-1 | Durum |
|---|---|---|---|
| `lernomi-android` | debug (`android/app/debug.keystore`, repoda) | `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25` | açık (2026-09-09) |
| `lernomi-android-upload` | yayın anahtarı (`android/app/release.keystore`) | `2F:2F:57:45:C3:8D:F9:3B:2E:F2:7E:FB:17:42:2A:3F:13:30:9F:3F` | açık (2026-09-09) |
| `lernomi-android-play` | Play App Signing — Google'ın anahtarı (Android ≤16'da görünen) | `4C:8A:3D:7A:02:17:51:E9:A7:3E:3E:6D:B7:F8:E5:54:A4:F8:56:34` | açık (2026-09-23) · ilk AAB aynı gün yüklendi (v4, iç test) |
| `lernomi-android-play-37` | Play'in Android 17+ için eklediği hibrit (PQC) döndürülmüş imza — Android 17 cihaz uygulamayı BU sertifikayla tanıyor | `06:24:10:14:01:86:77:F8:96:3C:8B:29:08:D2:B7:2C:B9:8E:04:56` | açık (2026-09-23) |

Üçüncüsü Play'den **indirilen** her kurulumu kapsıyor ve testçiler davet edilmeden önce
açılmalı: Play App Signing devrede olduğu için Google yüklediğin AAB'yi kendi anahtarıyla
yeniden imzalıyor, yani kullanıcının telefonundaki uygulama upload anahtarını taşımıyor.

SHA-1'ler sır değil (herhangi bir APK'dan çıkarılabilir); buraya yazılmalarının sebebi
`DEVELOPER_ERROR` ayıklarken karşılaştırılacak referansın elde olması.

> **Paket adı tuzağı.** Paket adı üç kez değişti: `com.wortspiel` (29 Ağu) →
> `com.nomi` (31 Ağu) → `com.nomi.learn` (2 Eyl) → `com.lernomi.learn` (4 Eyl).
> `lernomi-android` 31 Ağustos'ta, yani `com.nomi` döneminde açılmıştı ve paket adı
> 2026-09-09'da elle düzeltildi. Eşleşme paket adı + SHA-1 ile yapıldığı için eski
> paket adı taşıyan bir istemci sessizce hiçbir şeye eşleşmez — giriş `DEVELOPER_ERROR`
> ile kapanır ve hata sebebi söylemez. Paket adı bir daha değişirse üç istemci de
> güncellenmeli.

**Onay ekranı (OAuth consent screen).** Publishing status "Testing" ise yalnız test
kullanıcısı olarak eklenen hesaplar giriş yapabilir ve token'lar 7 günde düşer; halka
açık sürümden önce **In production** olmalı. Uygulama yalnız varsayılan kapsamları
istiyor (`email`, `profile`, `openid`; `googleAuth.ts`'te ek `scopes` yok), bunlar
hassas kapsam sayılmadığı için Google doğrulama incelemesi gerekmiyor — yayımlama anında.

Sunucu tarafı: `GOOGLE_CLIENT_ID` (Web istemci) ve `GOOGLE_CLIENT_SECRET` prod `.env`'de
dolu olmalı. Boşsa `/api/config` `providers.google=false` döner ve mobil giriş ekranı
Google düğmesini hiç göstermez (bozuk düğme yok); yalnız e-posta ile giriş kalır.

Doğrulama: internal testing track'e AAB yükleyin, Play'den indirin, Google ile giriş yapın.

## 3. Ön plan servisi beyanı (mikrofon)

Play, mikrofon tipli ön plan servisi kullanan her uygulamadan Console'da bir **beyan**
ve **tanıtım videosu** istiyor: App content › "Foreground service permissions". Beyan
verilmezse ya da videodaki akış koda uymazsa politika reddi gelir.

### Console alanları

| Alan | Değer |
|---|---|
| Kullanılan izin | `FOREGROUND_SERVICE_MICROPHONE` |
| Temel işlev | Kullanıcının başlattığı sürekli ses yakalama — yürüyüş modunda konuşma tanıma |
| Kullanıcıya faydası | Telefon cepteyken ve ekran kapalıyken sesli çalışabilmek; ekrana bakmadan söylenen cevabın değerlendirilmesi |
| Alternatif neden yok | Ekran kapalıyken mikrofon erişimi Android 9'dan beri yalnız mikrofon tipli ön plan servisiyle mümkün; WorkManager, JobScheduler ve normal servis bu işi yapamaz |
| Kullanıcı bunu nasıl başlatır | Öğren › Yürüyüş modu › Başla → mikrofon açıklama ekranı (sesin gidebileceği konuşma tanıma sağlayıcılarını adıyla sayar) → "Kabul ediyorum, başla" → sistem mikrofon izni → bildirim izni (Android 13+, bildirimin görünmesi için; servis başlamadan hemen önce isteniyor). Onay ve mikrofon izni olmadan servis hiç başlamaz |
| Kullanıcı bunu nasıl durdurur | Kalıcı bildirimdeki "Durdur"; uygulama içinden X; tur bitince kendiliğinden. Bildirim izni verilmediyse bildirim görünmüyor: yürüyüş ekranı bunu ve durdurmanın uygulamadaki çarpıyla yapıldığını kalıcı bir satırla söylüyor (`WalkModeScreen` `notifHidden`) |

### Videoda gösterilecek akış

Kesintisiz tek çekim, ses açık, 30-60 saniye. **Premium inceleme hesabıyla ve bu
düzeltmeleri taşıyan yapıyla** çekilir: ücretsiz hesapta ekran kapalı dinleme sunucuda 403
alır ve videoda cevap tanınmaz; eski yapılarda açıklama ekranı sağlayıcıları adıyla
saymıyordu. Açıklama ekranını hiç görmemiş bir hesap kullanılır (ya da önce Ayarlar ›
Gizlilik › "Mikrofon onayını geri al").

1. **Öğren** sekmesi › "Yürüyüş modu" kutucuğu › **Başla**.
2. Mikrofon açıklama ekranı (`MicDisclosure`) — sağlayıcı listesi yüklenene ve metin
   okunacak kadar beklenir.
3. **Kabul ediyorum, başla** → sistem mikrofon izni → **İzin ver** → bildirim izni (Android 13+) → **İzin ver**.
4. Bir kelime sorulur, sesli cevap verilir.
5. **Güç tuşuyla ekran kapatılır.** Kilit ekranında bildirim görünür: başlık,
   "mikrofon dinliyor" metni ve **Durdur** düğmesi. Sistemin mikrofon göstergesi açıktır.
6. Ekran kapalıyken bir kelime daha sorulur ve sesli cevap verilir — arka planda dinlemenin
   gerçekten çalıştığını gösteren kare bu.
7. Kilit ekranındaki **Durdur**'a basılır; bildirim kaybolur, mikrofon kapanır.

Kilit ekranında görünmesi kodda karşılığı olan bir iddia: kanal
`lockscreenVisibility = VISIBILITY_PUBLIC`, bildirim `VISIBILITY_PUBLIC` ve
`FOREGROUND_SERVICE_IMMEDIATE` (varsayılan 10 saniyelik gecikme kısa turda bildirimi
hiç göstermiyordu).

### Servis kalkamazsa

Mikrofon izni geri alınmışsa ya da uygulama arka plandayken çağrı gelirse
`startForeground` düşer. Bu durumda servis kendini kapatıyor ve JS'e
`LernomiWalkServiceFailed` gidiyor; ekranda "ekran kapalıyken dinleme sürmeyebilir"
uyarısı çiziliyor. Yani arka planda servissiz kayıt yapılan bir durum yok — Play'in
kuralının aradığı da tam olarak bu.

## 4. İnceleme öncesi kontrol

- Onboarding, giriş ve ana ekranlar "yakında", "yapım aşamasında", "test" ya da yer tutucu içermiyor (E1).
- Hata durumlarında uydurma veri gösterilmiyor; yükleniyor / hata / boş durumları gerçek (E3).
- Mağaza görselleri gerçek cihazdan, premium özellikleri yalnız canlıysa gösteriyor (D1).
- `docs/play/data-safety.md` formu ve `/privacy` bağlantısı girildi (B1, B4).
- Foreground service beyanı ve videosu yüklendi (C1) — §3'teki alanlar ve akış.
- Veri Güvenliği ve ön plan servisi beyanı, yapay zekâ iznini, sağlayıcıları adıyla sayan
  mikrofon açıklamasını ve gizlilik politikası 1.1'i taşıyan sürüm canlıya çıkıp AAB
  yüklendikten SONRA gönderilir; beyan, video ve uygulama aynı şeyi göstermeli.
- `drizzle/0052_user_consents.sql` üretimde uygulandı: yapay zekâ ve ses uçlarının izin kapısı
  bu tabloya bağlı.
