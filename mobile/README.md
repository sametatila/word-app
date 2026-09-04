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

`src/version.ts` native modül eklememek için sabit tutuluyor (device-info yok) ve
güncelleme denetimi (`src/lib/useUpdate.ts`) onu GitHub'daki son sürümle karşılaştırıyor.
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
npm run lint         # eslint (@react-native yapılandırması)
npm test             # jest — App'i uçtan uca render eden duman testi
npm run i18n:check   # çeviri katmanını ATLAYAN ham Türkçe metin taraması (CI kapısı)
npm run i18n:scan    # aynı tarama, dosya dosya döküm
```

`npm test` bütün ekranları yükler, dolayısıyla **her native paketin bir taklidi
`jest.setup.js`'te olmak zorunda**; yeni paket eklerken taklidi de eklenmeli, yoksa
duman testi "NativeEventEmitter requires a non-null argument" ile düşer.

`i18n:check` bir **taban** dosyasına bakar (`scripts/i18n-baseline.json`) ve sayı
yalnız aşağı inebilir. Taban gerçekten düştüyse: `node scripts/i18n-scan.js --baseline`.

## İmza ve yayın

Sırların hiçbiri repoda değil.

```sh
bash scripts/gen-release-keystore.sh   # Android release anahtarı (bir kez, YEDEKLE)
bash scripts/ios-archive.sh            # iOS arşiv + App Store yüklemesi (yalnız macOS)
```

Android anahtarı kaybolursa Play'de uygulama **güncellenemez**. iOS tarafında imza
kimliği ve takım kimliği Xcode/Keychain'den gelir, `project.pbxproj`'da yalnız yer
tutucu var.

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
