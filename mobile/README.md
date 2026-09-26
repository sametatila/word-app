# Lernomi — mobil uygulama (React Native)

Deponun web tarafıyla **aynı backend'i** kullanan React Native uygulaması. Kendi
sunucusu yok: istekler `https://www.lernomi.app`'e gider; ağ o adresi engelliyorsa yedek
`https://lernomi.rumpuskit.com`'a geçer (`src/api/base.ts`, istemci `src/api/client.ts`).
Oturum Better Auth çerezidir ve adrese bağlıdır: yedeğe geçen hesap yeniden giriş yapar. Yani `mobile/` bir istemcidir; iş kuralları, içerik ve
veritabanı depo kökündeki Next.js uygulamasında.

- Android: `com.lernomi.learn` — yayında değil, Play iç testte (`docs/play/`)
- iOS: `app.lernomi.ios` — yayında değil, TestFlight'ta (`docs/appstore/README.md`)
- Açık mağaza işleri: `docs/store/audit.md`

## Kurulum

```sh
cd mobile
npm install          # postinstall: patch-package (aşağı bak)
```

Gereken: Node ≥ 22.11 (`package.json` › `engines`), Android için JDK 17 + Android SDK,
iOS için macOS + Xcode + CocoaPods.

### Android

```sh
npm start            # Metro (ayrı terminalde açık kalır)
npm run android
```

### iOS (yalnız macOS)

Pod'lar depoda değil, her klonda kurulur:

```sh
bundle install                     # CocoaPods'un kendisi (Gemfile, vendor/bundle)
bundle exec pod install --project-directory=ios
npm run ios
```

Sonrasında **`ios/Lernomi.xcworkspace`** açılır, `.xcodeproj` değil — pod'lar yalnız
workspace'te bağlı. `Podfile.lock` gitignore'da **değil**: pod sürümlerini sabitlemesi
için, üretildiği gün commit edilir (Android'de karşılığı `gradle-wrapper`).

iOS yerelde (Xcode) ve CI'da derleniyor. Gerçek cihazda sınanacakların sıralı listesi
`docs/plan/ios-device-runbook.md`'de.

## Sürüm: tek kaynak, üç hedef, bir kapı

Sürüm **depo kökündeki `package.json`**'da yazılı ve başka hiçbir yerde elle
tutulmuyor:

```json
"version": "1.0.0",     // kullanıcıya görünen semver (mağaza sayfası, Ayarlar)
"versionCode": 8,       // yalnız Android/iOS; MONOTON artar, tekrar edemez
```

Oradan üç hedefe `scripts/version.mjs` basıyor:

| Hedef | Alanlar |
|---|---|
| `mobile/src/version.ts` | `APP_VERSION`, `APP_VERSION_CODE` — **üretilen dosya** |
| `android/app/build.gradle` | `versionName`, `versionCode` |
| `ios/Lernomi.xcodeproj/project.pbxproj` | `MARKETING_VERSION`, `CURRENT_PROJECT_VERSION` (ikişer yerde) |

```sh
npm run version:check        # dördü aynı mı (CI kapısı; release:check ve ios:check de bunu çağırır)
npm run version:write        # kaynağı hedeflere bas
npm run version:set -- 1.0.1 # yeni semver — versionCode da artar
npm run version:bump-code    # aynı semver, yeni Play yüklemesi
```

**İki sayı, iki iş.** `version` ürünün numarası; web ve mobil aynı numarayı
gösterir ve web dağıtımları onu artırmaz. `versionCode` yalnız mağaza için ve her
yükleme yenisini ister — Play aynı kodu ikinci kez kabul etmiyor, dolayısıyla
kapalı testte `1.0.0`ın onuncu yüklemesi bile yeni bir kod demek. Bu yüzden
versionCode semver'den türetilmiyor, ayrı bir sayaç.

## patch-package

`npm install` sonrası `patches/` altındaki yamalar otomatik uygulanır (`postinstall`).
Dördü de aynı sebeple var: eski kütüphaneler kendi `android/build.gradle`'larında
sabit ve artık geçersiz SDK/AGP sürümleri taşıyor, projenin `rootProject.ext`
değerlerini kullanmıyorlar.

| Yama | Ne düzeltiyor |
|---|---|
| `react-native-haptic-feedback+2.3.4` | eski mimari koşulu, yeni RN'de derlenmiyordu |
| `react-native-purchases+10.9.1` | gradle `android {}` bloğu |
| `react-native-sound+0.11.2` | sabit `DEFAULT_COMPILE_SDK_VERSION` yerine proje değeri |
| `react-native-tts+4.1.1` | aynı: sabit SDK sürümleri |

Bir bağımlılık yükseltilirse yama **dosya adındaki sürümle eşleşmediği için sessizce
uygulanmaz**. Yükseltme sonrası yamayı yeniden üret: `node_modules` içinde düzelt →
`npx patch-package <paket>`.

`react-native.config.js` de bir bağımlılığı hizaya sokuyor ama başka türlü: Apple
girişi paketinin **Android** otomatik bağlanması kapalı — o modül bize gerekmiyor ve
eski AGP kurulumuyla çalışan Android derlemesini bozabilirdi.

## Betikler

```sh
npm run lint         # ESLint 9, düz yapılandırma (eslint.config.js)
npm test             # jest — App'i uçtan uca render eden duman testi
npm run i18n:check   # çeviri katmanını ATLAYAN ham Türkçe metin taraması (CI kapısı)
npm run i18n:scan    # aynı tarama, dosya dosya döküm
npm run ios:check    # iOS paketinin elle tutulan yerleri (sürüm üçlüsü, ikon, .strings)
npm run release:check # yayın öncesi denetim: sürüm üçlüsü + yayın anahtarı (yapı üretmez)
npm run release:android # Play için AAB + cihazda deneme APK'sı, üretilen doğrulanır
npm run check:16kb   # bir .aab/.apk içindeki 64-bit .so'ların 16 KB hizası
```

Lint `mobile/eslint.config.js` (RN'in `@react-native/eslint-config/flat` yapılandırması
üstüne). `mobile/` içinde koşunca depo kökündeki `eslint.config.mjs`'e ulaşmıyor (o dosya
`mobile/**`'ı zaten yoksayıyor). `eslint-plugin-ft-flow` 2.x ESLint 9'da çöktüğü için
`package.json` › `overrides` onu 3.x'e çekiyor.

`npm test` bütün ekranları yükler, dolayısıyla **her native paketin bir taklidi
`jest.setup.js`'te olmak zorunda**; yeni paket eklerken taklidi de eklenmeli, yoksa
duman testi "NativeEventEmitter requires a non-null argument" ile düşer.

`i18n:check` bir **taban** dosyasına bakar (`scripts/i18n-baseline.json`) ve sayı
yalnız aşağı inebilir. Taban gerçekten düştüyse: `node scripts/i18n-scan.js --baseline`.

## İmza ve yayın

Sırların hiçbiri depoda değil.

```sh
bash scripts/gen-release-keystore.sh   # Android yükleme anahtarı (bir kez; anahtar ve parola ayrı iki yerde yedeklenir)
npm run release:android                # AAB + deneme APK'sı üretir ve ürettiğini doğrular
bash scripts/ios-archive.sh            # iOS arşiv + App Store yüklemesi (yalnız macOS)
```

- **Anahtarsız release yok.** `keystore.properties` (gitignore) yoksa release görevleri düşer
  (kapı `app/build.gradle`'da; debug yapıları ve `./gradlew tasks` etkilenmez). Deneme için
  `./gradlew assembleRelease -PallowDebugSigning` (ya da `LERNOMI_ALLOW_DEBUG_SIGNING=1`): çıkan
  yapı debug anahtarlı ve sürüm adı `-devkey` ile biter, mağazaya gidemez.
- **Yükleme anahtarı, dağıtım değil.** Play App Signing telefona inen paketi Google'ın
  anahtarıyla imzalıyor; kayıp anahtar sıfırlatılabilir ama günler sürer. Anahtar üreticisi
  parolayı iki kez sorar, var olan dosyanın üstüne yazmaz ve SHA-1/SHA-256 parmak izlerini basar
  (Google girişi istemcileri: `docs/play/console.md` §2).
- **`release:android` denetimleri:** sürüm üçlüsü, yayın anahtarı, `apksigner` imzası (imzalayan
  "Android Debug" ise durur), AAB ve APK'daki her 64-bit `.so`nun 16 KB LOAD hizası (APK'da ayrıca
  `zipalign -P 16`); yüklenecekler AAB, ProGuard eşlemi ve native semboller.
  `npm run check:16kb <dosya>` üretilen dosyaya bakar, yapılandırmaya değil.
- JDK kendiliğinden bulunur: `JAVA_HOME` → PATH → `~/.gradle/jdks/` → Android Studio JBR.
- iOS'ta imza kimliği ve takım Xcode/Keychain'den gelir; pbxproj'da yalnız yer tutucu var.

## Yerleşim

```
App.tsx              kök: sağlayıcılar (tema, i18n, auth, oturum)
src/api/            sunucu istemcisi (API tabanı + yedek adres, hata tipleri)
src/lib/            iş mantığı: auth, stt, tts köprüsü, sfx, i18n, sürüm…
src/screens/        ekranlar (sekmeler + akışlar)
src/game/           tur/soru motoru
src/ui/             ortak bileşenler ve ikonlar
src/i18n/           tr / en / de sözlükleri — üçü aynı anahtar kümesini taşır
android/ · ios/     native projeler
patches/            patch-package yamaları
scripts/            i18n taraması, SFX üretimi, imza/arşiv betikleri
```

## İlgili belgeler

- `docs/plan/ios-parity.md` — iOS parite durumu, yayın kapıları ve kararlar
- `docs/plan/ios-device-runbook.md` — gerçek cihazda sınanacaklar
- `docs/appstore/` — App Store: durum, gizlilik etiketleri, inceleme notu
- `docs/play/` — Play Console: uygulama erişimi, OAuth istemcileri (SHA-1), ön plan servisi, Veri güvenliği
- `docs/store/` — vitrin metinleri, kareler, denetim kaydı
- `AGENTS.md` (yerel, depoda değil) — commit/deploy kuralları
