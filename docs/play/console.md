# Google Play Console — uygulama erişimi, Google girişi, ön plan servisi (Lernomi, `com.lernomi.learn`)

Çekirdek hesapsız açık ("Continue without an account"); sosyal özellikler, sonraki yapay zekâ
değerlendirmeleri ve Premium satın alma hesap istiyor. Play incelemesi bu yüzden test kimlik
bilgisi ister ("some functionality is restricted"). iOS karşılığı `docs/appstore/connect.md`.
Açık konsol işleri `docs/store/audit.md` (M7, M8, M9).

## 1. App content › App access

Seçim: "All or some functionality is restricted". Console **iki ayrı oturum açma grubu** tutuyor
(2026-09-29'da Console'dan okundu); her grupta ad, kullanıcı adı, parola ve en çok **500
karakterlik** "Any other information required to access your app" alanı var. Uzun, maddeli
inceleme notu (yürüyüş modu, yapay zekâ rızası, bildirim, hesap silme) Play'de YOK ve sığmıyor:
o yalnız App Store'un notu (`docs/appstore/connect.md`). Play'de ön plan servisi kendi beyanında
(§3), veri güvenliği kendi formunda (`docs/play/data-safety.md`).

| Grup adı | Kullanıcı adı | "Tam erişim" kutusu |
|---|---|---|
| Reviewer account - full access | `google-review@lernomi.app` (Premium, sunucuda yalnız inceleme için verildi) | işaretli |
| Reviewer account - limited free access | `google-review-free@lernomi.app` (Premium'suz: satın alma akışı için) | işaretsiz |

Parolalar yalnız Console'da; bu belgeye, sohbete ya da loga yazılmaz. Alttaki kutu ("Bu beyandaki
oturum açma bilgileri ... tüm özelliklere tam erişim sağlar") yalnız Premium hesapta doğru;
ücretsiz hesapta işaretlenirse beyan yanlış olur.

**Neden iki hesap.** Ekran kapalı yürüyüş Premium (ücretsizde `/api/stt` `mode=walk` 403), bu
yüzden ana hesap Premium; Premium hesapta paywall plan listesini göstermez, satın alma ikinci
hesapla denenir. İki hesap üretimde açık ve e-postaları doğrulanmış.

Düğme adları İngilizce arayüzden birebir (`mobile/src/i18n/en.ts`: `auth.already_have_account`,
`profile.go_premium`). Metin değişirse 500 sınırı Console'un kendi sayacıyla ölçülür (satır sonları
dahil).

**Full access** (canlı, 485 karakter):

```text
Sign-in: on any onboarding step tap "Already have an account? Sign in", or answer the 5 onboarding questions and the sign-in screen follows.

Email and password only - no 2-Step Verification, one-time code, biometrics or location restriction. The e-mail address is already verified.

The account has full Premium access, so no purchase is needed. Microphone permission is requested for speaking exercises; allow or deny it, the rest stays available. An internet connection is required.
```

**Limited free access** (2026-09-29'da yazıldı, ~478 karakter; Console'a girilecek):

```text
Sign-in: on any onboarding step tap "Already have an account? Sign in", or answer the 5 onboarding questions and the sign-in screen follows.

Email and password only - no 2-Step Verification, one-time code, biometrics or location restriction. The e-mail address is already verified.

This account has NO Premium, so the purchase flow can be reviewed: Profile › "Go Premium" shows both subscriptions, prices, free trial terms and auto-renewal. An internet connection is required.
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

## 4. Yayın öncesi raporu (pre-launch report) robotları: Test Lab hesapları

Play her yeni build'i Firebase Test Lab cihazlarında robotlarla çalıştırıyor. Robotlar Google test
hesaplarıyla giriyor (ör. `…@gmail.com`, UA `okhttp/…`, IP 66.249.x / 74.125.x) ve misafir açıyor;
kullanıcı listesi ve ölçümler kirleniyordu.

- **Tanıma (Android):** Test Lab cihazında sistem ayarı `firebase.test.lab` = `"true"` (Firebase'in
  belgelediği sinyal). `LernomiIntegrityModule.isTestLab` okuyor, `mobile/src/lib/integrity`
  `isTestLabDevice`; iOS ve eski build'ler hep false. Uygulamanın davranışı değişmiyor.
- **Taşıma:** o cihazda her istekte `x-lernomi-test-lab: 1` (`mobile/src/api/client`; giriş ve misafir
  açılışı da aynı yoldan). Ad sunucudaki `TEST_LAB_HEADER` ile aynı, kapı `check:parity`.
- **İşaret:** `/api/me` `user_clients.test_lab`i true yapıyor; YAPIŞKAN, kod hiç geri almıyor. Misafir
  hesaba birleşince işaret hesaba geçiyor.
- **Ölçüm:** panel sayıları (pano KPI'ları, trend, huni, haftalık karşılaştırma, gösterge şeridi,
  kapsam sayfası, sürüm dağılımı) ve haftalık özet bildirimi bu hesapları saymıyor; tek tanım
  `src/lib/test-lab.ts` (`real`, `notTestLab`). Gelir zaten sandbox'ı düşüyor; uyarılar (çökme,
  5xx, yapay zekâ) kasten süzülmüyor: robotta görülen çökme gerçek çökme.
- **Temizlik ELLE:** otomatik silme yok. Panel › Kullanıcılar › süzgeç **Test Lab** (satırda rozet,
  ayrıntıda "Uygulama sürümü" tablosunda `test_lab`). Başlığı herkes gönderebilir: silmeden önce
  e-posta ve katılma tarihine bakılır. Bu mekanizmadan önce açılmış robot hesapları işaretsiz; onlar
  e-posta ve oturum IP'sine bakılarak elle bulunur.
