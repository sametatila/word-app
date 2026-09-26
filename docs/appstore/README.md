# App Store hazırlığı (Lernomi, iOS)

`docs/play/`in iOS karşılığı. **İki mağazanın beyanları ayrıdır:** Play'in Veri güvenliği formu
ile App Store Connect'in gizlilik etiketleri farklı sorular sorar; biri öbürüne kopyalanmaz.

| Burada | Play karşılığı | Ne tutuyor |
|---|---|---|
| `README.md` (bu dosya) | `data-safety.md` | Durum, hukuki kapsam, gizlilik etiketleri, arka plan sesi |
| `connect.md` | `console.md` | İnceleme hesabı ve notu, giriş sağlayıcılarının kurulumu |
| `listing.md` | `listing.md` | Yaş derecelendirmesi, diğer alanlar |

Vitrin metinleri (açıklama, altyazı, anahtar kelime) `docs/store/README.md`'de; açık denetim
maddeleri `docs/store/audit.md`'de.

## Durum

| | |
|---|---|
| Kayıt | App Store Connect `6810593275`, bundle `app.lernomi.ios`, sürüm kaydı 1.0.0 |
| Sürüm | Depoda 1.0.0 (8): kaynak kökteki `package.json`, basılı hâli `mobile/src/version.ts` ve pbxproj |
| TestFlight | Build 2–8 geçerli. Sürüm kaydına hâlâ build 4 bağlı; gönderimden önce son build bağlanır (denetim M5) |
| Yayın | **Elle** (`releaseType: MANUAL`, 2026-09-26, Samet; denetim M13): onaydan sonra App Store Connect'te "Release this version" ile açılır. Android 14 günlük kapalı testte olduğundan iki platform birlikte açılabilsin diye |
| Derleme | CI (`.github/workflows/ios-build.yml`) ve yerel Mac mini (Xcode) |
| Cihaz | Kayıtlı bir gerçek iPhone koşusu yok (M10). Mikrofon, arka plan sesi, kilit ekranı, satın alma yalnız cihazda ölçülür; sıra `docs/plan/ios-device-runbook.md` |
| Cihaz ailesi | iPhone + iPad (`TARGETED_DEVICE_FAMILY = "1,2"`, Split View açık). Bedeli: 13" iPad ekran görüntüsü zorunlu. `npm run ios:check` › "cihaz ailesi" beyanı ve kare betiğini birlikte tutuyor |

## Hukuki metinler iOS'u kapsıyor

`src/lib/legal/index.ts` › `LEGAL_PLATFORMS.ios = true`. Güncel sürüm aynı dosyada
`LEGAL_VERSION`; sürüm numarası belgelere yazılmaz. Bayrak açıkken metinlere şunlar giriyor:

- şartlarda "Apple App Store için ek koşullar" (Apple'ın özel EULA için istediği asgari maddeler,
  Apple'ın üçüncü taraf lehtar olması dahil),
- satın alma, iptal ve iadenin Apple yolu (Ayarlar › Apple Hesabı › Abonelikler,
  reportaproblem.apple.com); destek sayfasında da,
- gizlilik politikasında platform sayımı ve alıcılar tablosunda **Apple (App Store)**.

**Apple (Sign-In)** satırı bayraktan bağımsız: Apple ile giriş web'de ve Android'de de açık
(`/api/config` → `apple`, `appleWeb`). Üretimde `app_settings["legal.config"]` satırı oluşursa
onun `platforms.ios` değeri kodun önüne geçer (ayrıntı `LEGAL_PLATFORMS` notunda).

Kimlik: hizmet sağlayıcı, satıcı ve veri sorumlusu Musa Atila; Samet Atila GDPR m.27 AB
temsilcisi (`LEGAL_ENTITY`, gerekçe `docs/play/listing.md` §5). Künye `/impressum`.

## Gizlilik etiketleri (App Store Connect › App Privacy)

Hiçbir tür izleme (tracking) için kullanılmıyor: reklam kimliği yok, üçüncü taraf reklam,
analitik ya da çökme raporlama SDK'sı yok. Tablo `mobile/ios/Lernomi/PrivacyInfo.xcprivacy` ile
**birebir** olmalı; satır eklenirse manifest aynı commit'te değişir.

| Apple kategorisi | Toplanıyor | Kimliğe bağlı | Amaç |
|---|---|---|---|
| Contact Info › Email Address | Evet | Evet | App Functionality |
| Contact Info › Name | Evet | Evet | App Functionality |
| User Content › Other User Content (yazılan ve söylenen metinler) | Evet | Evet | App Functionality |
| User Content › Audio Data | Hayır (geçici işlenir, saklanmaz; aşağıya bak) | — | — |
| Identifiers › User ID | Evet | Evet | App Functionality |
| Identifiers › Device ID (bildirim jetonu) | Evet | Evet | App Functionality |
| Usage Data › Product Interaction | Evet | Evet | Analytics (ayarlardan kapatılabilir) |
| Purchases › Purchase History | Evet | Evet | App Functionality |
| Diagnostics › Crash Data (anonim JS hata raporu) | Evet | Hayır | App Functionality |
| Diagnostics › Other Diagnostic Data (ekran adı, sürüm, platform; Firebase SDK kalite verisi) | Evet | Hayır | App Functionality + Analytics |
| Location › Coarse Location (Google ile Giriş SDK'sı, IP'den, dolandırıcılık önleme) | Evet | Evet | App Functionality |
| Contacts, Health, Financial Info, Browsing/Search History, Sensitive Info, Precise Location | Hayır | — | — |

Manifest bu on türü taşıyor. **Connect formu 2026-09-24'te dokuz türle yayımlandı**; Coarse
Location ve Other Diagnostic Data'ya Analytics amacı henüz eklenmedi (denetim G4, Samet; API yok).

Notlar:

- **Ses.** Apple "toplanıyor" derken cihazdan çıkıp saklanmayı kastediyor. Ses sunucuda
  saklanmıyor; Speechmatics işi tanımadan sonra siliniyor, Deepgram'da `mip_opt_out` açık,
  Mistral ses zincirinde yok (`src/lib/stt.ts`; denetim LEG-3, G5). Groq'un sıfır saklama ayarı
  açılana kadar G5 açık. Bu koşullardan biri geri alınırsa satır "Evet"e döner. Tanınan
  **metin** saklanıyor ve User Content olarak beyanlı.
- **Device ID.** Uzak bildirim jetonu cihaz başına saklanıyor (`device_tokens`). Apple'ın
  örnekleri IDFA/IDFV olsa da Play'in tanımı Firebase kimliğini açıkça bu kutuya koyduğu için iki
  mağaza aynı şeyi söylüyor.
- **Diagnostics birinci taraf.** JS hataları kendi sunucumuza gidiyor (`/api/client-errors`;
  `src/lib/client-errors.ts`, `mobile/src/lib/errorReport.ts`), kullanıcı kimliği yazılmıyor,
  paylaşılmıyor. Native çökmeler yalnız Apple'ın Organizer raporlarında.
- **Pod manifestleri.** GoogleSignIn manifesti ayrıca PhoneNumber, OtherUsageData ve analitik
  amaçlı DeviceID/UserID sayıyor; Google'ın yayımladığı SDK açıklaması
  (developers.google.com/identity/sign-in/ios/app-privacy) yalnız kullanıcı kimliği ve IP'yi
  andığı için bunlar beyan edilmedi. İnceleyici sorarsa gerekçe bu.
- **Misafir** yeni bir tür açmıyor: misafirde toplanan her şey (rastgele kullanıcı kimliği,
  öğrenme ve etkileşim verisi) hesapta da toplanıyor; misafirde e-posta ve ad yok.
- Crashlytics 2026-09-23'te çıkarıldı (X-1).

## Ekran kapalıyken yürüyüş modu (arka planda ses)

iOS'ta uygulamayı ekran kapalıyken ayakta tutan tek şey etkin bir ses oturumu:
`UIBackgroundModes = audio` ve `LernomiSpeech.swift` › `startWalkService`/`stopWalkService`
(Android'deki ön plan servisiyle aynı adlar). Kesinti toparlanması, kulaklık mikrofonu ve kilit
ekranı denetimi kodda; cihazda doğrulanmadı (M10).

App Review'da arka planda mikrofon en çok sorgulanan şeydir. Üç cevap da kodda karşılığı olan
cümleler ve inceleme notunun 7. adımında yazılı (`connect.md` §1):

1. **Modu kullanıcı başlatır:** mikrofon açıklama ekranı ve sistem izni olmadan tur başlamaz.
2. **Sürdüğü görünür:** kilit ekranında Now Playing kaydı ("Walk mode is on") ve sistemin
   mikrofon göstergesi.
3. **Her an durdurulabilir:** uygulamadan, kilit ekranındaki denetimden ya da kulaklık düğmesinden.

Video (App Preview) en hızlı çözen yol; çekim `docs/store/README.md` kararına bağlı.

## Apple ile Giriş ve hesap silme — bilinmesi gerekenler

- Sağlayıcıyı `APPLE_BUNDLE_ID` açar; boşken `/api/config` `apple:false` der ve düğme çizilmez.
  Web ve Android Apple'ın web akışını kullanır (`APPLE_SERVICES_ID`). iOS'ta Apple düğmesi
  Google'ın üstünde; Google yalnız Apple da açıkken çizilir (4.8).
- Ad yalnız ilk yetkilendirmede geliyor; giriş biter bitmez yazılıyor. Nonce bilerek
  gönderilmiyor (gerekçe `mobile/src/lib/appleAuth.ts`).
- Silmede (5.1.1(v)) yeniden giriş düğmesi sağlayıcıya göre; Apple jetonu silmeden önce REST API
  ile iptal ediliyor (`src/lib/account/apple-revoke.ts`, `npm run test:apple`). İptalin
  başarısızlığı silmeyi durdurmaz. Anahtarlar `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_PRIVATE_KEY`.
- "E-postamı Gizle" postası: gönderen alan adı Apple'da kayıtlı (denetim TEC-2).
