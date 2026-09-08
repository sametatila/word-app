# Lernomi — mobil uygulama (React Native)

Deponun web tarafıyla **aynı backend'i** kullanan React Native uygulaması. Kendi
sunucusu yok: bütün istekler `https://www.lernomi.app`'e gider (`src/api/client.ts`),
oturum Better Auth çerezidir. Yani `mobile/` bir istemcidir; iş kuralları, içerik ve
veritabanı depo kökündeki Next.js uygulamasında.

- Android: `com.lernomi.learn` — **yayında**
- iOS: `app.lernomi.ios` — **yayında değil**, bkz. `docs/appstore/README.md`

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

Bu makinede (Linux) iOS derlenemez. `ios/` altındaki her şey **derlenmemiş kod**
sayılır; iddia listesi ve cihazda sınanacaklar `docs/plan/ios-parity.md` §5'te.

## Sürüm: ÜÇ kaynak, elle eşitlenir

Sürüm numarası üç ayrı yerde yazılı ve **hiçbir betik onları eşitlemiyor** — yeni
sürümde üçü birden elle artar:

| Kaynak | Alanlar |
|---|---|
| `src/version.ts` | `APP_VERSION`, `APP_VERSION_CODE` |
| `android/app/build.gradle` | `versionName`, `versionCode` |
| `ios/Lernomi.xcodeproj/project.pbxproj` | `MARKETING_VERSION`, `CURRENT_PROJECT_VERSION` |

`src/version.ts` native modül eklememek için sabit tutuluyor (device-info yok).
Biri geride kalırsa uygulama kendini yanlış sürüm sanır; iOS uzun süre böyle sarktı.

## patch-package

`npm install` sonrası `patches/` altındaki yamalar otomatik uygulanır (`postinstall`).
Dördü de aynı sebeple var: eski kütüphaneler kendi `android/build.gradle`'larında
sabit ve artık geçersiz SDK/AGP sürümleri taşıyor, projenin `rootProject.ext`
değerlerini kullanmıyorlar.

| Yama | Ne düzeltiyor |
|---|---|
| `react-native-haptic-feedback+2.3.3` | eski mimari koşulu, yeni RN'de derlenmiyordu |
| `react-native-purchases+10.9.0` | gradle `android {}` bloğu |
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
npm run lint         # eslint (@react-native yapılandırması, ESLint 8 + .eslintrc.js)
npm test             # jest — App'i uçtan uca render eden duman testi
npm run i18n:check   # çeviri katmanını ATLAYAN ham Türkçe metin taraması (CI kapısı)
npm run i18n:scan    # aynı tarama, dosya dosya döküm
npm run ios:check    # iOS paketinin elle tutulan yerleri (sürüm üçlüsü, ikon, .strings)
npm run release:check # yayın öncesi denetim: sürüm üçlüsü + yayın anahtarı (yapı üretmez)
npm run release:android # Play için AAB + cihazda deneme APK'sı, üretilen doğrulanır
npm run check:16kb   # bir .aab/.apk içindeki 64-bit .so'ların 16 KB hizası
```

Lint betiği `ESLINT_USE_FLAT_CONFIG=false` ile başlıyor ve bu **zorunlu**: mobil
ESLint 8 + `.eslintrc.js` kullanıyor, ama ESLint 8.57 düz (flat) yapılandırmayı üst
dizinlerde de arayıp depo kökündeki `eslint.config.mjs`'i buluyor ve kipi
değiştiriyor — o dosya `mobile/**`'ı yoksaydığı için lint hiçbir dosya bulamıyordu.
Mobil ESLint 9'a geçtiğinde bayrak kalkar, yerine `mobile/eslint.config.mjs` gerekir.

`npm test` bütün ekranları yükler, dolayısıyla **her native paketin bir taklidi
`jest.setup.js`'te olmak zorunda**; yeni paket eklerken taklidi de eklenmeli, yoksa
duman testi "NativeEventEmitter requires a non-null argument" ile düşer.

`i18n:check` bir **taban** dosyasına bakar (`scripts/i18n-baseline.json`) ve sayı
yalnız aşağı inebilir. Taban gerçekten düştüyse: `node scripts/i18n-scan.js --baseline`.

## İmza ve yayın

Sırların hiçbiri repoda değil.

```sh
bash scripts/gen-release-keystore.sh   # Android release anahtarı (bir kez, YEDEKLE)
npm run release:android                # AAB + APK üretir ve ürettiğini doğrular
bash scripts/ios-archive.sh            # iOS arşiv + App Store yüklemesi (yalnız macOS)
```

Android anahtarı kaybolursa Play'de uygulama **güncellenemez**. iOS tarafında imza
kimliği ve takım kimliği Xcode/Keychain'den gelir, `project.pbxproj`'da yalnız yer
tutucu var.

### Yayın imzası: anahtarsız release yapısı üretilmiyor

`keystore.properties` (gitignore'da) yoksa **release görevleri düşüyor** — kapı
`app/build.gradle`'da, görev grafiği hazır olunca bakılıyor; `./gradlew tasks`,
IDE eşitlemesi ve debug yapıları etkilenmiyor.

Eskiden anahtar yokken release sessizce **debug anahtarıyla** imzalanıyordu. Play
böyle bir yüklemeyi reddediyor; kapı o sessiz hatayı yapının başında görünür kılıyor.

Kapı `--dry-run` ile sınandı: anahtarsız `:app:assembleRelease` mesajla düşüyor,
`-PallowDebugSigning` ile geçiyor (uyarı basarak), `:app:assembleDebug` ve
`:app:tasks` etkilenmiyor.

Deneme amaçlı bir release paketi gerekiyorsa kapı elle açılıyor:

```sh
./gradlew assembleRelease -PallowDebugSigning   # ya da LERNOMI_ALLOW_DEBUG_SIGNING=1
```

Çıkan yapı debug anahtarıyla imzalanıyor **ve** `-devkey` sürüm ekiyle işaretleniyor
(`1.0.11-devkey`), yani elde kaldığında ne olduğunu kendisi söylüyor. O dosya
mağazaya gidemez.

### JDK nereden geliyor

Bu makinede `java` PATH'te değil ama bir JDK 17 zaten var: Gradle kendisi indirmiş
(`~/.gradle/jdks/`). Hem anahtar üreticisi hem `release:android` onu kendiliğinden
buluyor (sıra: `JAVA_HOME` → PATH → Gradle'ın indirdiği → Android Studio'nun JBR'si),
yani ayrı bir JDK kurmak gerekmiyor.

Anahtar üretimi `scripts/gen-release-keystore.sh`: parolayı iki kez sorar (yanlış
yazılan parola anahtarı kurtarılamaz yapar ve hata aylar sonra, yeni sürüm
imzalanırken ortaya çıkar), var olan dosyaların üzerine yazmaz, `keystore.properties`i
0600 bırakır ve sonunda **SHA-1/SHA-256 parmak izlerini basar** — Google ile Giriş'in
Android OAuth istemcisi paket adı + SHA-1 eşleşmesiyle çalışıyor.

Play tarafında bu bir **yükleme anahtarı**: Play App Signing devrede olduğu için kaybı
Google'dan sıfırlatılabilir. Yan dağıtımda öyle değil — asıl yedekleme sebebi o.

`release:android` aynı kapıyı gradle'ı hiç başlatmadan, okunur bir mesajla söylüyor;
sonrasında da ürettiğini denetliyor:

| Adım | Ne bakıyor |
|---|---|
| Sürüm tutarlılığı | `version.ts`, `build.gradle` ve `project.pbxproj` aynı sürümü söylüyor mu |
| Yayın anahtarı | `keystore.properties` var mı |
| İmza | `apksigner` ile doğrulama; imzalayan "Android Debug" ise durur |
| 16 KB sayfa boyutu | AAB ve APK içindeki her 64-bit `.so`nun LOAD hizası ≥ 16384, APK'da ayrıca `zipalign -P 16` |
| Yüklenecekler | AAB, ProGuard eşlemi, native semboller (APK yalnız cihazda deneme için) |

16 KB denetimi tek başına da koşar (`npm run check:16kb <dosya>`) ve yapılandırmaya
değil **üretilen dosyaya** bakar: `useLegacyPackaging = false` yalnız arşiv içi
hizalamayı verir, kitaplığın kendi LOAD hizası ondan ayrı bir şeydir.

## Yerleşim

```
App.tsx              kök: sağlayıcılar (tema, i18n, auth, oturum)
src/api/            sunucu istemcisi (API_BASE, hata tipleri)
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

- `docs/plan/ios-parity.md` — iOS'ta ne eksik, hangi şerit neyi yapıyor
- `docs/appstore/` — App Store hazırlığı ve gizlilik beyanı
- `docs/play/` — Play Console karşılığı
- Depo kökündeki `AGENTS.md` — commit/deploy kuralları
