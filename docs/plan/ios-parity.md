# iOS paritesi

iOS'un Android'e göre ne durumda olduğunu, yayın kapılarını ve iOS'a özgü üç ürün
kararını tutar. Cihazda sınanacakların sıralı listesi `docs/plan/ios-device-runbook.md`'de,
mağaza tarafı `docs/appstore/README.md`'de. `M/` = `mobile/`.

Kod tarafında parite kapalı: iki platformda 20 ortak native yöntem, 10 ortak olay;
sürüm tek kaynaktan (`package.json` → `version.ts` + `build.gradle` + `pbxproj`).
Açık kalanlar kod değil, cihaz işi.

## 1. Durum

> ### YENİDEN ÖLÇÜM — 2026-09-12
>
> Bu blok `check:parity` §295 kapısına bağlı: aşağıdaki iddiaları kod ölçüyor. Bir
> madde değişirse (ör. UI test hedefi pbxproj'a girerse) kapı kırmızı verir ve blok
> güncellenir. Başlık ve tarih kapının aradığı metindir, değiştirilmez.
>
> **Kapandı:**
>
> | # | Bugünkü durum |
> |---|---|
> | P1 | `LernomiSpeech.swift` + `.m` pbxproj'da |
> | P2 | `import React` ilk satırlarda |
> | P3 | `tr/en/de.lproj` bağlı, `CFBundleLocalizations` var |
> | P4 | `PRODUCT_BUNDLE_IDENTIFIER = app.lernomi.ios` |
> | P5 | Sürüm tek kaynaktan; `npm run version:check` ayrışmayı yakalıyor |
> | P6 | `DEVELOPMENT_TEAM` dolu; arşiv betiği `M/scripts/ios-archive.sh` (O1) |
> | P7 | Şemada `NomiTests` artığı yok |
> | P8 | `Podfile.lock` depoda |
> | Native | 20 ortak yöntem, 10 ortak olay; `check:parity` §290 karşılaştırıyor. Tek taraflı yöntemler belgeli (`addListener`/`removeListeners` RN kalıbı, `ensureMicPermission` Android'de JS'te) |
> | R1 | AppIcon 18 giriş / 13 PNG |
> | R2 | Açılış ekranı markalı: `LaunchBackground` #FA7C13 + ikon, yazı yok (§292) |
> | R3 | `WindowBackground` açık #FBF7F2 / koyu #17120E; `AppDelegate` pencereyi ve kök görünümü boyuyor (§292) |
> | R4 | SFX mp3'leri `ios/Lernomi/sfx/` altında, pbxproj'a tek tek dosya olarak kayıtlı (§292) |
> | C1 | `NSPrivacyCollectedDataTypes` dolu |
> | C2 | `ITSAppUsesNonExemptEncryption = false` |
> | C3 | Apple ile Giriş: `PROVIDERS`ta, yetki dosyasında `applesignin`, `M/src/lib/appleAuth.ts` |
> | C4 | Google iOS istemcisi açık (`ios:check` doğruluyor), `CFBundleURLTypes` var |
> | C5 | `LEGAL_PLATFORMS.ios = true` (2026-09-14, `LEGAL_VERSION` 1.1). App Review gizlilik politikasını, şartları ve destek sayfasını gönderimde okuduğu için yayın gününe bırakılmadı; gerekçe `src/lib/legal/index.ts` › `LEGAL_PLATFORMS` notunda |
> | C6 | RevenueCat anahtarları iki platformda dolu (`M/src/lib/billingConfig.ts`), sunucuda `REVENUECAT_*` dolu |
> | E1 | Abonelik metinleri platforma göre: `premiumstate.manage_ios`, `paywall.renew_cancel_appstore`, `deleteaccount.subscription_cancel_appstore` |
> | E2 | `app_open` olayı `${Platform.OS}:standalone` yazıyor |
> | E3 | APK güncelleme şeridi yok (`useUpdate.ts` silindi, geri gelmemeli) |
> | E4 | `M/README.md` gerçek kurulum belgesi |
> | O2 | CI: `.github/workflows/checks.yml` + `ios-build.yml` |
>
> **Açık:**
>
> | # | Durum |
> |---|---|
> | UI test | `LernomiUITests.swift` diskte, pbxproj'da yok. CI hedefi koşu anında ekliyor (`M/scripts/ios-add-uitest-target.rb`, `ios-build.yml`) |
> | Cihaz | Runbook koşusu. Mac mini'de derleniyor, TestFlight'ta build 8 var; kayıtlı cihaz koşusu yok |

## 2. Kapsam sınırı

iOS paritesi Android'e dokunmadan yapılır: parite iOS'u Android'e getirmek demek, ortada
buluşmak değil. Bu yüzden Apple girişi paketinin Android otomatik bağlanması kapalı
(`M/react-native.config.js`).

## 3. Otomatik denetimler

| Katman | Ne ölçer |
|---|---|
| `npm run ios:check` (`M/scripts/check-ios.py`, CI'da) | pbxproj bütünlüğü, sürüm, ikon ölçüleri, `.strings` sözlükleri, dil beyanı, Swift/ObjC sözdizimi, Google iOS istemcisi |
| `ios-build.yml` (her push, macOS) | Derleme; iPhone SE ve iPad'de üç dil × iki tema kare (`M/scripts/ios-screenshots.sh`); XCUITest ile onboarding akışı (`M/scripts/ios-flow-screenshots.sh`) |
| `check:parity` §290–295 | Native sözleşme, marka kaynakları, yürüyüş modu olayları, bu belgenin §1 bloğu |

## 4. Cihaz koşusu

`docs/plan/ios-device-runbook.md`: yalnız cihazda öğrenilenler (mikrofon, konuşma tanıma,
arka plan sesi, kilit ekranı, haptik, satın alma). Bir adım geçmezse ona bağlı olanlar
"ölçülemedi" yazılır, "başarısız" değil.

## 5. Mağaza

Mağaza kaydı, inceleme notu ve gizlilik etiketleri: `docs/appstore/README.md`,
`docs/appstore/connect.md`.

## 6. Yayın kapıları ve kararlar

iOS yayını şunların hepsi bitince yapılır:

| Kapı | Kaynak |
|---|---|
| Apple Developer hesabı + gerçek bundle kimliği | P4, P6 |
| Apple ile Giriş cihazda çalışıyor | C3, runbook 5.3 |
| Uygulama içi hesap silme iOS'ta doğrulandı | runbook 5.4 |
| Gizlilik manifesti ile App Store Connect etiketleri örtüşüyor | C1, runbook 9.4 |
| Uygulama ikonu ve açılış ekranı markalı | R1, R2 |
| Runbook'un tamamı cihazda koşuldu | runbook |
| Hukuki metinler iOS'u kapsıyor | C5 |

### Karar 1: `LernomiWalkStop` karşılığı kilit ekranı Now Playing (2026-09-04)

Android'de kalıcı bildirimde "Durdur" var; iOS'ta karşılığı `MPNowPlayingInfoCenter` +
`MPRemoteCommandCenter`. Gerekçe:

1. Cepteki telefonda turu bırakmanın başka yolu tur sonundaki soruyu beklemek (3-4 dk).
2. JS sözleşmesi hazırdı: `stt.ts` `onWalkStop` → `WalkModeScreen` mikrofonu kapatıp
   cevapları yazıyor, tur özetini gösteriyor. JS değişmedi, veri kaybı yok.
3. App Review arka plan mikrofonunda "sürdüğü görünür, durdurulabilir" diye sorar;
   Now Playing bunu görünür kılar. `UIBackgroundModes: audio` tutup Now Playing
   yayımlamamak incelemede dikkat çeker.

Yan kazanç: kulaklık düğmesi de turu durdurur. Bilinen sınır: başlık metni cihaz dilinden
gelir (`Localizable.strings`), uygulama içi dil farklıysa ayrışır; Android'de de aynı.

### Karar 2: ekran kapalı modun maliyeti, fark bilerek kabul edildi (2026-09-12)

Android `ACTION_SCREEN_OFF` (yalnız güç tuşu), iOS `didEnterBackgroundNotification` +
`protectedDataWillBecomeUnavailableNotification` (uygulama değiştirme, gelen çağrı, kilit)
dinliyor. iOS'ta bildirime dokunmak ücretli yolu (`useAzure`) açıyor; maliyet oturum boyu
değil kesinti başına. Sorulan soru "ekran kapalı mı" değil, "hangi tanıyıcı güvenilir":
arka plandaki uygulamada yerel `SFSpeechRecognizer` güvenilmez. Gerekçe
`LernomiSpeech.swift` yorumunda; sözleşme `check:parity` §294'te kilitli. Ölçümle
gözden geçirilir: runbook 7.1.

### Karar 3: Apple ile Giriş'te nonce yok, engel değil

`appleAuth.ts` nonce göndermiyor: kütüphane Apple'a nonce'un SHA-256 özetini yolluyor, JS'e
ham değeri veriyor, better-auth düz karşılaştırıyor. Nonce'un kapattığı asıl saldırı (başka
uygulamanın token'ını oynatmak) `aud` ile zaten kapalı: sağlayıcı yalnız `APPLE_BUNDLE_ID`
doluyken kaydediliyor (`src/lib/auth/server.ts`) ve better-auth token'ı Apple JWKS imzası,
`iss` ve `aud = appBundleIdentifier` ile doğruluyor. Oynatma penceresini Apple token'ının
`exp`'i (~10 dk) belirliyor. Kalan risk taze token'ın ele geçirilmesi; cihaz ya da TLS
kırılması ister (`NSAllowsArbitraryLoads=false`). Nonce cihazda denenerek açılabilir;
tarif `M/src/lib/appleAuth.ts` docblock'unda.
