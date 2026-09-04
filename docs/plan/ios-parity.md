# iOS paritesi — envanter ve çalışma planı (2026-09-04)

Android tarafı yayına hazır (`com.lernomi.learn`, versionName 1.0.11 / versionCode 13);
iOS tarafı React Native şablonundan büyük ölçüde çıkmamış durumda. Bu belge iki şeyi
yapar: **(1)** Android'de olup iOS'ta olmayan her şeyin envanterini kanıtıyla çıkarır,
**(2)** işi birbirine çarpmayan şeritlere böler ki birden fazla agent aynı anda
çalışabilsin.

İlgili belgeler: `docs/appstore/README.md` (mağaza tarafı), `docs/play/` (Android
karşılığı), `docs/plan/walk-stt.md` (yürüyüş modu tasarımı).

---

## 0. Kısıt: bu makinede iOS derlenemez

Geliştirme makinesi Linux. macOS ve Xcode yok, `pod install` çalıştırılamaz, Swift
derlenmez, simülatör/cihaz yok. Bu planın **tüm şeritleri "derlenmemiş kod" üretir.**

Sonuçları:

- Hiçbir agent "çalışıyor", "doğrulandı", "test edildi" demeyecek. Commit mesajında ve
  belgede `DOĞRULANMADI` notu zorunlu (`f63db79` bunu böyle yaptı, örnek alınacak).
- Her şerit kendi işinin **cihazda sınanacak maddelerini** yazar; bunlar §5'te tek listede
  toplanır ve Mac'e geçildiğinde tek seferde koşulur.
- Derleme hataları kaçınılmaz. Şerit S (§3) bunu bir iş kalemi olarak üstlenir; diğer
  şeritler "ilk derlemede tutar" varsayımıyla çalışmaz.

---

## 1. Envanter

Kanıt sütunundaki yollar depo köküne göredir. `M/` = `mobile/`.

### 1.1 Proje bağlantısı — kod var, derlemeye girmiyor (ENGEL)

Bu bölüm diğer her şeyin önündedir: aşağıdakiler düzelmeden iOS'ta native modül
**hiç yüklenmez**, dolayısıyla yürüyüş modu, STT, ekran-kapalı TTS ve SFX'in tamamı
sessizce yoktur.

| # | Eksik | Kanıt | Etki |
|---|---|---|---|
| P1 | `LernomiSpeech.swift` ve `LernomiSpeech.m` `project.pbxproj`'da **hiç geçmiyor** — ne `PBXGroup`'ta ne `PBXSourcesBuildPhase`'de | `M/ios/Lernomi.xcodeproj/project.pbxproj` — Sources fazında yalnız `AppDelegate.swift` | `NativeModules.LernomiSpeech` `undefined`; `M/src/lib/stt.ts` baştan sona boşa düşer |
| P2 | `LernomiSpeech.swift` `import React` demiyor ama `RCTEventEmitter`'dan türüyor | `M/ios/Lernomi/LernomiSpeech.swift:1-4`, `:16` | P1 çözülür çözülmez derleme hatası |
| P3 | `tr/en/de.lproj/InfoPlist.strings` hedefe bağlı değil; `knownRegions` yalnız şablon değerini taşıyor, `CFBundleLocalizations` yok | `project.pbxproj:141`, `M/ios/Lernomi/Info.plist` | İzin diyalogları her cihazda Türkçe kalır; App Store dil listesi boş görünür |
| P4 | `PRODUCT_BUNDLE_IDENTIFIER = org.reactjs.native.example.$(PRODUCT_NAME:rfc1034identifier)` | `project.pbxproj:274,303` | Yükleme reddedilir. Android karşılığı `com.lernomi.learn` |
| P5 | `MARKETING_VERSION = 1.0`, `CURRENT_PROJECT_VERSION = 1` | `project.pbxproj:260,268` | Android 1.0.11 / 13. `M/src/version.ts` sürümü "build.gradle ile elle eşitlenir" diyor; iOS üçüncü bir kaynak olarak sarkıyor |
| P6 | `DEVELOPMENT_TEAM` / `CODE_SIGN_STYLE` yok; `CODE_SIGN_IDENTITY` şablonun "iPhone Developer" değeri | `project.pbxproj:341,414` | Arşiv alınamaz, TestFlight'a çıkılamaz |
| P7 | Scheme olmayan bir test hedefini gösteriyor: `NomiTests.xctest` (eski marka adı) | `M/ios/.../xcschemes/Lernomi.xcscheme:36` | Şemadan test koşulamaz; eski ad artığı (Nomi döneminden kalma) |
| P8 | `Podfile.lock` depoda yok | `git ls-files mobile/ios` | Android `gradle-wrapper.jar` + `gradlew`'u sabitliyor; iOS'ta pod çözümü her makinede değişebilir |

### 1.2 Native modül parite açığı

Android `LernomiSpeechModule.kt` 18 yöntem sunuyor, iOS `LernomiSpeech.m` 10'unu.
JS sözleşmesi (`M/src/lib/stt.ts:18-40`) 18'ini de tanımlıyor.

| Yöntem / olay | Android | iOS | JS'te ne oluyor | Etki |
|---|---|---|---|---|
| `start` / `stop` / `cancel` / `destroy` / `isAvailable` / `setKeepAwake` / `startRecording` / `stopRecording` | var | var | — | parite tamam |
| `startWalkService` / `stopWalkService` | FGS (mikrofon tipli) | ses oturumu | — | `f63db79` ile geldi, cihazda denenmedi |
| `hasMicrophone` | var | **yok** | `stt.ts:71` — `Native?.hasMicrophone()` opsiyonel **çağrı değil**; modül yüklü ama yöntem yoksa `TypeError` | **P1 çözülünce `useMicrophone` çöker.** Sıra bağımlılığı: P1 ile B1 aynı anda gitmeli |
| `uploadStt` | var | **yok** | `stt.ts:203` — try/catch yutar, `null` döner | Ekran-kapalı/cepte yürüyüş: ses kaydediliyor, **hiçbir yere gitmiyor**. Mod sessizce hiç cevap duymuyor |
| `httpGet` | var | **yok** | `stt.ts:212` — guard'lı, `null` | Ekran-kapalı "devam edelim mi" turu `/api/session`'a ulaşamaz |
| `playTtsUrl` / `stopTts` | var | **yok** | `stt.ts:151` — try/catch yutar | Ekran kapalıyken hiç konuşmuyor (WebView köprüsü zaten askıya alınmış olur) |
| `playSfx` | var (AudioTrack ton sentezi) | **yok** | `sfx.ts:59` — opsiyonel çağrı, sessiz | Ekran-kapalı ses efektleri yok |
| `delay` | var (native Handler) | **yok** | `stt.ts:162` — `setTimeout`'a düşer | Arka planda ses oturumu açıkken JS zamanlayıcısı çalışmalı; **cihazda doğrulanacak** |
| `setApiBase` | var (native HTTP allowlist) | **yok** | `stt.ts:45` — opsiyonel, sessiz | `uploadStt`/`httpGet` gelene kadar konusuz; onlarla birlikte gelmeli, yoksa çerez rastgele hosta gidebilir |
| `startScreenWatch` / `stopScreenWatch` + `LernomiScreenOff` / `LernomiScreenOn` | var | **yok** | `stt.ts:180-184` — guard'lı; `supportedEvents` bu adları içermiyor, listener hiç tetiklenmez | **En büyük işlevsel açık:** `screenOffRef` hep `false` kalır → `WalkModeScreen.tsx:212` Azure yolunu hiç seçmez → ekran-kapalı mod P1 çözülse bile erişilemez |
| `LernomiWalkStop` olayı (bildirimden "Durdur") | var (FGS bildirimi) | **yok** | `stt.ts:174` — listener sessiz | iOS'ta kalıcı bildirim yok. Ürün kararı gerekir: kilit ekranı denetimi (Now Playing) mı, farkı kabul mü |

iOS'ta `isAvailable` yerel kodu onurlandırıyor, Android'de yoksayıyor — bu **bilinçli**
ve iki tarafta da yorumlanmış (`LernomiSpeechModule.kt` `isAvailable` docblock'u).

### 1.3 Kaynaklar ve marka

| # | Eksik | Kanıt | Etki |
|---|---|---|---|
| R1 | Uygulama ikonu: `AppIcon.appiconset/Contents.json` 9 boyut beyan ediyor, **tek PNG yok** | `M/ios/Lernomi/Images.xcassets/AppIcon.appiconset/` | App Store doğrulaması geçmez; cihazda boş ikon. Android'de 5 yoğunluk + adaptive + monochrome tam |
| R2 | `LaunchScreen.storyboard` hâlâ RN şablonu: "Lernomi" + **"Powered by React Native"** yazısı, sistem zemini | `M/ios/Lernomi/LaunchScreen.storyboard` | Android'de markalı açılış var: turuncu `#FA7C13` + launcher ikonu (`values/styles.xml` `Theme.Lernomi.Splash`) |
| R3 | Gece/gündüz pencere zemini yok | Android: `values/colors.xml` `window_bg #FBF7F2`, `values-night/colors.xml` `#17120E` | iOS'ta koyu temada açılışta beyaz flaş |
| R4 | SFX yedek mp3'leri iOS paketinde yok | Android `res/raw/*.mp3` (6 dosya); `M/scripts/render-sfx.py:29` yalnız `res/raw`'a yazıyor; `M/src/lib/sfx.ts:31` iOS'ta `"${name}.mp3"` arıyor | `react-native-sound` yedek yolu iOS'ta **kalıcı ölü**. Köprü hazır değilken (açılış, çevrimdışı) hiç ses yok |
| R5 | Bildirim küçük ikonu | Android `drawable/ic_notification.xml` (Erdi silüeti) | iOS uygulama ikonunu kullanır — **eksik değil**, ama R1 çözülmeden bildirim de ikonsuz |

### 1.4 Mağaza ve uyum

| # | Eksik | Kanıt | Etki |
|---|---|---|---|
| C1 | `PrivacyInfo.xcprivacy` içinde `NSPrivacyCollectedDataTypes` **boş dizi** | `M/ios/Lernomi/PrivacyInfo.xcprivacy` | `docs/appstore/README.md` e-posta, ad, kullanıcı içeriği, kullanıcı kimliği, kullanım verisi ve satın alma geçmişini beyan ediyor. Manifest ile beyan **çelişiyor** |
| C2 | `ITSAppUsesNonExemptEncryption` yok | `M/ios/Lernomi/Info.plist` | Her yüklemede App Store Connect soruyor; otomasyon takılır |
| C3 | **Apple ile Giriş yok** | `M/src/screens/AuthScreen.tsx:29` — `PROVIDERS` yalnız Google | Guidelines 4.8: üçüncü taraf girişi sunan uygulama Apple ile Giriş sunmak zorunda. **Yayın engeli**, ürün işi |
| C4 | Google ile Giriş iOS'ta kurulmamış | `M/src/lib/googleAuth.ts:21` yalnız `webClientId` veriyor; Info.plist'te `CFBundleURLTypes` (ters client id) yok | iOS'ta Google girişi çalışmaz |
| C5 | `LEGAL_PLATFORMS.ios = false` | `src/lib/legal.ts:161` | Bilinçli. Açılırken `LEGAL_VERSION` artacak + `LEGAL_CHANGELOG` kaydı düşecek (dosyanın kendi notu) |
| C6 | RevenueCat iOS anahtarı boş | `M/src/lib/billingConfig.ts:18` | Android anahtarı da boş — ortak eksik. iOS'ta ayrıca In-App Purchase yetkisi + App Store Connect ürünleri gerekir |
| C7 | Uygulama içi hesap silme | `M/src/screens/DeleteAccountScreen.tsx` **var** | 5.1.1(v) karşılanıyor; metni E1'e bağlı |

### 1.5 Kullanıcıya görünen metin ve platform davranışı

| # | Eksik | Kanıt | Etki |
|---|---|---|---|
| E1 | Abonelik metinleri "Google Play" diyor, üç dilde de | `M/src/i18n/{tr,en,de}.ts` — `deleteaccount.google_play_uzerinden_abonelik_ald`, `paywall.otomatik_yenilenir_play_iptal` | iOS'ta yanlış mağazaya yönlendirir. Apple'ın yolu: Ayarlar › Apple Hesabı › Abonelikler |
| E2 | Analitikte platform sabit yazılı: `"android:standalone"` | `M/App.tsx:37` | iOS açılışları Android sayılır; §4 hunisi bozulur |
| E3 | Güncelleme şeridi GitHub'dan **APK** öneriyor | `M/src/lib/useUpdate.ts:11,34`; `M/src/screens/LearnScreen.tsx:68` | iOS'ta anlamsız ve Guidelines 2.5.2 riski (mağaza dışı dağıtım). Platforma göre kapatılmalı |
| E4 | `M/README.md` hâlâ RN şablonu | `M/README.md:1` | Android/iOS kurulum farkları hiçbir yerde yazılı değil |

### 1.6 Süreç

| # | Eksik | Kanıt |
|---|---|---|
| O1 | iOS imza/arşiv betiği yok | Android'de `M/scripts/gen-release-keystore.sh` var |
| O2 | CI yok (iki platformda da) | `.github/workflows` yok |

---

## 2. Çok-agent çalışma kuralları

### 2.1 Dosya sahipliği (ZORUNLU)

Bazı dosyalara **birden çok şerit dokunmak ister**. Bunlar tek sahibe kilitlenir; başka
bir şerit değişiklik istiyorsa dosyayı kendisi düzenlemez, **sahibine tarif eder**.

| Kilitli dosya | Sahip şerit | Neden |
|---|---|---|
| `M/ios/Lernomi.xcodeproj/project.pbxproj` | **P** | Tek satırlık iki değişiklik bile birleştirilemez çakışma üretir; UUID'ler elle tutulmalı |
| `M/ios/Lernomi/Info.plist` | **P** | Beş şerit anahtar eklemek istiyor (arka plan, URL şeması, dil listesi, şifreleme beyanı) |
| `M/ios/Lernomi/LernomiSpeech.swift` + `.m` | **N** | İkisi tek sözleşme; ayrı ellerden gelen yöntemler `supportedEvents` ve oturum durumunu bozar |
| `M/src/i18n/{tr,en,de}.ts` | **T** | Üçü aynı anda ve aynı sırada değişmeli |
| `docs/appstore/README.md` | **D** | Tek anlatı; her şerit kendi maddesini D'ye verir |
| `src/lib/legal.ts` | **D** | Bayrak + sürüm + changelog birlikte değişir |

Kilitli olmayan her dosyada şeritler serbesttir.

### 2.2 Commit kuralı

- Konu başına ayrı commit, Türkçe mesaj.
- Gövdede **`DOĞRULANMADI:`** satırı — neyin derlenmediği/denenmediği açıkça yazılır.
- Emoji yok. Değişken, dosya ve anahtar adları İngilizce; Türkçe yalnız arayüz metni ve yorumda.
- Claude push etmez; push Samet'te (AGENTS.md).

### 2.3 Kapsam sınırı

Şeritler **Android'e dokunmaz**. Android çalışıyor; parite iOS'u Android'e getirmek
demek, ortada buluşmak değil. Tek istisna R4 (`render-sfx.py` iOS çıktısı eklenir —
katkı, mevcut `res/raw` yazımı değişmez).

---

## 3. Şeritler

Her şerit bağımsız bir agent. "Dokunduğu" listesi dışına çıkmaz.

### Şerit P — Xcode projesi (ÖNCE, tek başına)

Diğer her şey buna dayanır; **paralel değil, ilk sırada koşar.**

- **Kapsam:** P1–P8.
- **Dokunduğu:** `project.pbxproj`, `Info.plist`, `Lernomi.xcscheme`, `Podfile`.
- **İş:**
  1. `LernomiSpeech.swift` + `.m`'yi gruba ve Sources fazına ekle (P1).
  2. `tr/en/de.lproj/InfoPlist.strings`'i hedefe bağla; `knownRegions` + `CFBundleLocalizations = [tr, en, de]` (P3). Android karşılığı `res/xml/locales_config.xml`.
  3. Bundle kimliği `app.lernomi.ios` (docs/appstore önerisi), `PRODUCT_NAME` sabit (P4).
  4. `MARKETING_VERSION 1.0.11` / `CURRENT_PROJECT_VERSION 13` — Android ve `M/src/version.ts` ile aynı (P5). Üç kaynağın elle eşitlendiğini `version.ts` yorumuna ekle.
  5. `CODE_SIGN_STYLE`, `DEVELOPMENT_TEAM` yer tutucusu; gerçek takım kimliği repoya girmez (P6).
  6. Scheme'deki `NomiTests.xctest` referansını kaldır (P7).
  7. `ITSAppUsesNonExemptEncryption = false` (C2) — HTTPS dışında şifreleme yok.
  8. `Podfile.lock` sonradan Mac'te üretilir; `.gitignore`'a **girmeyecek**, izlenecek (P8) — not düş.
- **Bitti ölçütü:** `project.pbxproj` diff'i okunabilir; her yeni UUID tekil; Info.plist'teki her yeni anahtarın yanında neden yorumu.
- **Şeritlere açtığı kapı:** N, R, G aynı anda başlayabilir; ama hedefe **dosya ekleme** gerektiren her şey (ikon, mp3) P'nin ikinci geçişini bekler (§4).

### Şerit N — Native modül paritesi

- **Kapsam:** 1.2'deki tüm eksikler.
- **Dokunduğu:** `M/ios/Lernomi/LernomiSpeech.swift`, `LernomiSpeech.m`.
- **İş, öncelik sırasıyla:**
  1. **`import React`** (P2) — ilk satır, yoksa hiçbiri derlenmez.
  2. **`hasMicrophone`** — P1 ile birlikte gitmezse `useMicrophone` çöker. iOS'ta `AVAudioSession.availableInputs` ile sor; sorulamıyorsa `true`.
  3. **`startScreenWatch` / `stopScreenWatch`** + `LernomiScreenOff` / `LernomiScreenOn` olayları, `supportedEvents`'e eklenerek. iOS'ta güç tuşu için genel API yok; karşılık `UIApplication.didEnterBackgroundNotification` / `willEnterForegroundNotification` (ve `protectedDataWillBecomeUnavailable`). **Bu bir eşdeğer, birebir değil** — davranış farkı yorumda yazılacak. Bu olmadan ekran-kapalı mod iOS'ta hiç seçilmez.
  4. **`uploadStt`** — `URLSession` ile multipart POST, çerez `HTTPCookieStorage.shared`'dan. Android karşılığı `LernomiSpeechModule.kt` `uploadStt`; alan adları birebir aynı (`language`, `mode=walk`, `expected`, `audio`).
  5. **`setApiBase` + host allowlist** — 4 ve 6 ile **aynı commit'te**. Android'deki `allowedUrl` kuralı: yalnız `https`, yalnız API hostu. Çerez başka hosta gitmemeli.
  6. **`httpGet`** — sade GET, çerezli, 200 ise gövde.
  7. **`playTtsUrl` / `stopTts`** — `/api/tts` MP3'ünü indirip `AVAudioPlayer` ile çal; yürüyüş ses oturumu açıkken çalışmalı.
  8. **`playSfx`** — Android `AVAudioTrack` ton sentezinin karşılığı. Nota tablosu `M/src/lib/sfxNotes.ts` ile **birebir** (tek kaynak orası; Android tablosu `render-sfx.py --kotlin` çıktısı, iOS için aynı üreticiye Swift çıktısı eklenmesi yeğdir).
  9. **`delay`** — arka planda duran `setTimeout` yerine native. Android'de `Handler`; iOS'ta `DispatchQueue.main.asyncAfter`. Ses oturumu açıkken JS zamanlayıcısının da çalışması beklenir; yine de parite için eklenir.
  10. `LernomiWalkStop` — **ürün kararı gerektiriyor**, kod yazmadan §6'ya not düş.
- **JS'e dokunulmaz.** `M/src/lib/stt.ts` sözleşmesi zaten 18 yöntemi tanımlıyor; iOS ona uyacak.
- **Bitti ölçütü:** `.m` dosyasındaki `RCT_EXTERN_METHOD` listesi `stt.ts:18-40` tipiyle satır satır örtüşüyor; `supportedEvents` 9 olayı sayıyor.

### Şerit R — Marka kaynakları

- **Kapsam:** R1–R4.
- **Dokunduğu:** `M/ios/Lernomi/Images.xcassets/**`, `M/ios/Lernomi/LaunchScreen.storyboard`, yeni `M/ios/Lernomi/sfx/*.mp3`, `M/scripts/render-sfx.py` (yalnız ekleme).
- **İş:**
  1. AppIcon PNG'leri — kaynak Android'in `mipmap-xxxhdpi/ic_launcher_foreground.png` + `#FA7C13` zemini. iOS'ta şeffaflık ve yuvarlatma **yasak**: 1024×1024 opak tek dosya (modern asset katalog) ya da beyan edilen 9 boyut.
  2. LaunchScreen — "Powered by React Native" gider; Android açılışının aynısı: turuncu zemin + ortada ikon. Storyboard yerine `UILaunchScreen` sözlüğü daha az bakım ister, P ile kararlaştır.
  3. Renk kümesi (light/dark) — `#FBF7F2` / `#17120E`, Android `window_bg` ile aynı değerler.
  4. `render-sfx.py`'a iOS çıktı yolu ekle; 6 mp3'ü üret. Dosya adları uzantılı kalır (`sfx.ts:31` iOS'ta `.mp3` arıyor).
- **P'ye teslim:** üretilen mp3'lerin ve varsa yeni storyboard/asset dosyalarının hedefe eklenmesi P'nin ikinci geçişi.

### Şerit T — Platforma göre metin ve davranış

- **Kapsam:** E1–E3.
- **Dokunduğu:** `M/src/i18n/{tr,en,de}.ts`, `M/App.tsx`, `M/src/lib/useUpdate.ts`, `M/src/screens/LearnScreen.tsx`, `M/src/screens/PaywallScreen.tsx`, `M/src/screens/DeleteAccountScreen.tsx`.
- **İş:**
  1. Mağazaya bağlı iki metni platforma göre ayır. Anahtar adları İngilizce ve simetrik olsun (ör. `paywall.renew_cancel_play` / `paywall.renew_cancel_appstore`); üç sözlüğe de aynı sırada girer.
  2. `App.tsx:37` — `"android:standalone"` yerine `Platform.OS` ile üretilen değer. Sunucu tarafındaki `kind` ayrıştırmasını bozmadığını `src/` içinde doğrula.
  3. `useUpdate` — iOS'ta hiç çağrılmasın (APK önerisi Guidelines 2.5.2 riski). `LearnScreen`'deki şerit platform kontrollü.
- **Bitti ölçütü:** `npm run i18n:check` (`M/scripts/i18n-scan.js`) temiz; üç sözlükte anahtar kümesi ve sıra aynı.

### Şerit G — Google ile Giriş (iOS)

- **Kapsam:** C4.
- **Dokunduğu:** `M/src/lib/googleAuth.ts`; Info.plist değişikliğini **P'ye tarif eder**.
- **İş:** `GoogleSignin.configure`'a `iosClientId` ekle; Google Cloud'da iOS OAuth istemcisi
  aç; ters client id'yi `CFBundleURLTypes` olarak P'ye ver. `webClientId` **değişmez** —
  sunucudaki `GOOGLE_CLIENT_ID` ona bakıyor, `googleAuth.ts` docblock'unda yazılı.
  `docs/play/console.md`'nin iOS karşılığını `docs/appstore/`'a D üzerinden yazdır.

### Şerit A — Apple ile Giriş

En büyük ve en çok yeri kesen şerit; **yayın engeli** (C3). Kendi başına bir agent.

- **Dokunduğu:** sunucu tarafı `src/lib/auth.ts` (better-auth sağlayıcı) ve `/api/config`;
  mobil `M/src/screens/AuthScreen.tsx`, yeni `M/src/lib/appleAuth.ts`, `M/package.json`;
  yetki (capability) ve entitlements değişikliğini **P'ye tarif eder**; env üçlüsünü
  (`.env.example` / yerel `.env` / sunucu `.env`) AGENTS.md'nin senkron kuralına göre ekler.
- **Not:** `AuthScreen.tsx:26` bugün "sunucuda açılmadığı için listede yok" diyor —
  aynı desen izlenir: `/api/config` `providers.apple` dönene kadar düğme çizilmez.
  Böylece Android'de hiçbir şey değişmez.
- **Bağımlılık:** başka şeride bağlı değil, en uzun süreni olduğu için **en erken başlar**.

### Şerit D — Uyum, gizlilik ve belgeler

- **Kapsam:** C1, C5, E4, O1, O2 ve tüm şeritlerin belge maddeleri.
- **Dokunduğu:** `M/ios/Lernomi/PrivacyInfo.xcprivacy`, `docs/appstore/README.md`,
  `src/lib/legal.ts`, `M/README.md`, `M/scripts/` (iOS arşiv betiği).
- **İş:**
  1. `NSPrivacyCollectedDataTypes`'ı `docs/appstore/README.md`'deki tabloyla **birebir** doldur. İkisi ayrışırsa inceleme takılır.
  2. `M/README.md`'yi şablondan çıkar: Android ve iOS kurulumu, üç sürüm kaynağının elle eşitlenmesi, `patch-package` notu.
  3. iOS arşiv/imza betiği (O1) — `gen-release-keystore.sh` üslubunda, sır repoya girmez.
  4. `LEGAL_PLATFORMS.ios` **bu planda açılmaz**; §6'daki kapılar geçilince, `LEGAL_VERSION` + changelog ile birlikte açılır.
- **Diğer şeritlerden girdi alır:** her şerit bitince D'ye bir paragraf verir (ne yapıldı, ne doğrulanmadı, cihazda ne sınanacak).

### Şerit S — Mac'te derleme ve cihaz doğrulaması (SONDA)

- **Ön koşul:** macOS + Xcode + Apple Developer hesabı.
- **İş:** `pod install`, derleme hatalarını kapat, `Podfile.lock`'u commit et, §5 listesini
  koş, sonuçları D'ye ver.
- **Bu şerit koşulana kadar hiçbir iOS iddiası "doğrulandı" sayılmaz.**

---

## 4. Sıra ve bağımlılıklar

```
                    ┌─────────────────────────────────────────┐
  A (Apple giriş) ──┤ en uzun; en erken başlar, sonda buluşur │
                    └─────────────────────────────────────────┘

  P (1. geçiş: pbxproj + Info.plist)
        │
        ├──> N (native yöntemler)      ─┐
        ├──> R (ikon, splash, mp3)     ─┤
        ├──> T (platform metinleri)    ─┼──> P (2. geçiş: yeni dosyaları hedefe ekle)
        ├──> G (Google iOS istemcisi)  ─┤            │
        └──> D (gizlilik, belge)       ─┘            └──> S (Mac: derle, cihazda sına)
```

Kritik iki kural:

1. **P1 ve N2 (`hasMicrophone`) aynı anda inmeli.** P1 tek başına inerse modül yüklenir,
   eksik yöntem `TypeError` atar ve `useMicrophone` her açılışta çöker — yani proje
   bağlantısını düzeltmek, düzeltmeden önceki durumdan daha kötü bir uygulama üretir.
2. **N4 (`uploadStt`), N5 (`setApiBase`) ve N6 (`httpGet`) tek commit.** Allowlist'siz
   native HTTP, oturum çerezini JS'ten gelen herhangi bir adrese gönderir.

---

## 5. Cihazda sınanacaklar (Mac gerektirir)

`docs/appstore/README.md`'deki dört maddeyi kapsar ve genişletir.

**Yürüyüş modu / arka plan**
1. Ekran kilitlendikten sonra tur devam ediyor mu.
2. Kelimeler arası boşlukta uygulama askıya alınıyor mu (`delay` native mi gerekiyor, `setTimeout` yetiyor mu).
3. Kilit ekranında mikrofon göstergesi görünüyor mu.
4. Telefon çağrısı gelip bittiğinde ses oturumu toparlanıyor mu.
5. `LernomiScreenOff` eşdeğeri (arka plana geçiş) gerçekten Azure yoluna geçiriyor mu.
6. `uploadStt` arka planda tamamlanıyor mu (iOS arka plan görev süresi sınırı).

**Ses ve efekt**
7. Köprü hazır değilken mp3 yedeği çalıyor mu (R4).
8. Ekran kapalıyken `playSfx` duyuluyor mu ve web/Android ile aynı mı.
9. Sessiz anahtar açıkken TTS duyuluyor mu (`setIgnoreSilentSwitch`).

**Kimlik ve mağaza**
10. Google girişi cihaz hesap seçicisini açıyor mu (C4).
11. Apple ile Giriş oturum açıyor ve better-auth kullanıcısına bağlanıyor mu (C3).
12. Hesap silme akışı sonuna kadar gidiyor mu (5.1.1(v)).

**Sunum**
13. Açılış ekranı Android'le aynı mı; koyu temada beyaz flaş var mı (R2, R3).
14. İzin diyalogları cihaz diline göre üç dilde çıkıyor mu (P3).
15. iPad'de yatay düzen bozulmuyor mu (`TARGETED_DEVICE_FAMILY = 1,2`, `M/src/lib/useLayout.ts`).

---

## 6. Yayın kapıları

`LEGAL_PLATFORMS.ios` ancak şunların **hepsi** bitince açılır:

| Kapı | Kaynak |
|---|---|
| Apple Developer hesabı + gerçek bundle kimliği | P4, P6 |
| Apple ile Giriş çalışıyor | Şerit A / C3 |
| Uygulama içi hesap silme iOS'ta doğrulandı | §5.12 |
| Gizlilik manifesti ile App Store Connect etiketleri örtüşüyor | C1 |
| Uygulama ikonu ve açılış ekranı markalı | R1, R2 |
| §5'in tamamı cihazda koşuldu | Şerit S |
| `LEGAL_VERSION` artırıldı + changelog kaydı düşüldü | `src/lib/legal.ts` |

Açık ürün kararları:

- **`LernomiWalkStop` karşılığı.** Android'de kalıcı bildirimde "Durdur" var. iOS'ta
  karşılığı ya kilit ekranı Now Playing denetimi ya da "yok" kararı. Arka planda mikrofon
  isteyen bir uygulamada inceleyenin ilk soracağı şey "kullanıcı bunu nasıl durduruyor"
  olacağı için karar kayda geçmeli.
- **Ekran-kapalı modun maliyeti.** Azure STT paralı yol; iOS'ta arka plan tanıma
  Android'den daha sık bu yola düşerse `docs/plan/stt-capacity.md` varsayımları değişir.
