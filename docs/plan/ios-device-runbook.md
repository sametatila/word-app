# iOS cihaz runbook'u — Mac'e oturulduğunda koşulacak sıra

Bu dosya `docs/plan/ios-parity.md` §5'in yerini alır. Orada 17 madde vardı ama sırasız:
üç ajan üç ayrı zamanda ekledi. Maddeler birbirine bağlı — uygulama açılmadan yürüyüş
modu denenemez, entitlements gerçek bir hesaba bağlanmadan Apple girişi denenemez, kilit
ekranına bakmak için önce turun başlaması gerekir. Burada aynı maddeler **koşulabilir
sıraya** dizili.

Bugüne kadar iOS tarafında yazılan hiçbir şey cihazda denenmedi (geliştirme makinesi
Linux, bkz. `ios-parity.md` §0). `.github/workflows/ios-build.yml` her push'ta macos-15'te
**derliyor** — yani "derleniyor mu" sorusu CI'da yanıtlanıyor, "çalışıyor mu" sorusu
burada.

## Nasıl kullanılır

Adımlar sırayla koşulur. Her adımda dört şey yazılı: **Önce** (hangi adımdan sonra
gelir), **Yap**, **Geçti** (ne görülürse geçmiş sayılır), **Geçmezse** (hangi dosyaya
bakılacak). Bir adım geçmezse ona bağlı olanlar denenmez — sonuç "başarısız" değil
"ölçülemedi" olur ve öyle kaydedilir.

Sonuçlar sona eklenen tabloya yazılır. Bu kayıt sonraki kararların dayanağı: özellikle
**7.1** cevabı, kod tarafında iki ayrı yeniden düzenlemenin yapılıp yapılmayacağını
belirliyor.

---

## Bağımlılık haritası

```
  1 DERLEME (hesapsız)
      │
  2 İMZA + CİHAZA KURULUM (Apple Developer hesabı)
      │
      ├── 3 AÇILIŞ VE SUNUM        (ikon, splash, tema, iPad)
      │
  4 NATIVE MODÜL AYAKTA MI          ← buradan sonrası çökerse hiçbiri denenemez
      │
  5 GİRİŞ                            (uygulamanın tamamı hesap istiyor)
      │
  6 TUR — EKRAN AÇIK                 (mikrofon, STT, ses)
      │
  7 BELİRLEYİCİ ÖLÇÜM ────────────── tek soru; 8'in tamamının anlamını değiştirir
      │
  8 ARKA PLAN / EKRAN KAPALI
      │
  9 MAĞAZA VE YÜKLEME
      │
 10 KAPANIŞ (LEGAL_PLATFORMS.ios)
```

---

## 0. Mac'e oturmadan hazır olması gerekenler

Bunlar cihaz işi değil; eksikse ilgili adım "ölçülemedi" kalır.

| # | Ne | Kim | Olmadan ölçülemeyen |
|---|---|---|---|
| 0.1 | Apple Developer hesabı (ücretli), Team ID | Samet | 2'den sonrası |
| 0.2 | App ID `app.lernomi.ios` + **Sign in with Apple** işaretli | Samet | 5.3 |
| 0.3 | Sunucu `.env`'de `APPLE_BUNDLE_ID` dolu + deploy edilmiş | Samet (push) | 5.3 |
| 0.4 | Google Cloud'da **iOS** OAuth istemcisi; id `googleAuth.ts` `IOS_CLIENT_ID`'ye, tersi `Info.plist` `CFBundleURLTypes`'a | Samet + kod | 5.2 |
| 0.5 | Sunucu `.env`'de `AZURE_SPEECH_KEY` + `AZURE_SPEECH_REGION` dolu | Samet | 7, 8.6, 8.7 |
| 0.6 | RevenueCat iOS anahtarı (`billingConfig.ts` `iosKey`) | Samet | 9.5 (paywall ekranı anahtar boşken hiçbir yerden AÇILMIYOR) |
| 0.7 | Parolası olan bir iPhone (kilit ekranı ve data protection testleri için) | — | 7, 8 |
| 0.8 | İkinci bir telefon (arama testi) ve bir kablosuz kulaklık | — | 8.9, 8.5 |
| 0.9 | Bir iPad (8'de değil, 3.5'te) | — | 3.5 |

**Test hesabı:** silme akışı (5.4) hesabı gerçekten yok ediyor. Ya sona bırakılır ya da
atılacak bir hesapla koşulur. İkincisi yeğ: silme geçtikten sonra geri kalanı yeniden
denemek için tekrar hesap açmak gerekir.

---

## 1. Derleme — Apple Developer hesabı gerekmez

### 1.1 · Ağaç ve araçlar
**Önce:** —
**Yap:** `cd mobile && npm ci` (postinstall `patch-package`'ı çalıştırır),
sonra `npx tsc --noEmit`.
**Geçti:** ikisi de hatasız. Xcode 16.1+ (`xcodebuild -version`) — RN 0.87 bunu istiyor.
**Geçmezse:** `mobile/package.json`, `mobile/patches/`.

### 1.2 · `pod install` ve `Podfile.lock`
**Önce:** 1.1 · **Kaynak:** P8
**Yap:** `cd mobile/ios && pod install --repo-update`. Çıktıda `RNAppleAuthentication`
ve `RNGoogleSignin` pod'larını ara.
**Geçti:** `Lernomi.xcworkspace` oluştu, iki pod da listede.
**Geçmezse:** `mobile/ios/Podfile`, `mobile/react-native.config.js` (Apple paketinin
**Android** otolinklemesi orada kapalı, iOS'a dokunmuyor — bkz. `ios-parity-A-teslim.md`
§3), `mobile/package.json`.
**Sonra:** `Podfile.lock` **commit edilir.** Depoda bilerek yok sayılmıyor; Android'in
`gradle-wrapper.jar`'ının karşılığı ve pod çözümünü sabitliyor (P8).

### 1.3 · Simülatöre derleme
**Önce:** 1.2
**Yap:** Xcode'da `Lernomi.xcworkspace` › herhangi bir iPhone simülatörü › Run.
**Geçti:** derleniyor ve simülatörde açılıyor.
**Geçmezse:** ilk bakılacak yer `mobile/ios/Lernomi/LernomiSpeech.swift` (en yeni ve en
büyük Swift dosyası) ve `AppDelegate.swift`. `AppDelegate.swift`'te iki satır özellikle
şüpheli, ikisi de bu makinede derlenmedi: `override func customizeRootView(_:)` ve
`UIColor(named: "WindowBackground")`. Metot sınıf başlığında değil yalnız protokolde
bildirilmiş (`RCTUIConfiguratorProtocol.h`); aynı dosyadaki `override func bundleURL()`
de öyle ve o bugün derleniyor, yani desen kanıtlı ama sınanmadı
(`ios-parity-R-T-teslim.md` §2.1).

### 1.4 · Simülatörde ne denenebilir, ne denenemez
**Önce:** 1.3
**Denenebilir:** açılış ekranı (3.2), ikonun ana ekranda görünüşü (3.1, kısmen), koyu tema
(3.3), iPad düzeni (3.5), arayüz dili.
**Denenemez:** mikrofon, konuşma tanıma, arka plan sesi, kilit ekranı, Now Playing,
sessiz anahtar, gelen çağrı. Yani 4'ten sonrasının tamamı **gerçek cihaz** ister.
Simülatörde "çalıştı" görmek 6-8'i geçirmez.

---

## 2. İmza ve cihaza kurulum — hesap gerekir

### 2.1 · Takım kimliği ve otomatik imza
**Önce:** 1.2, 0.1 · **Kaynak:** P6
**Yap:** Xcode › Signing & Capabilities › Team seç. `Automatically manage signing` açık.
Capabilities'te **Sign in with Apple** görünmeli (entitlements dosyası zaten bağlı).
**Geçti:** "Provisioning profile" satırında hata yok.
**Geçmezse:** `mobile/ios/Lernomi/Lernomi.entitlements`, pbxproj'daki
`CODE_SIGN_ENTITLEMENTS`, ve Apple Developer portalında App ID'de Sign in with Apple
işaretli mi (0.2). Yetki portalda yoksa profil onu taşımaz ve imza hata verir.

### 2.2 · Bundle kimliği ve sürüm üçlüsü
**Önce:** 2.1 · **Kaynak:** P4, P5
**Yap:** `PRODUCT_BUNDLE_IDENTIFIER` = `app.lernomi.ios` mi bak. Sonra
`bash mobile/scripts/ios-archive.sh`'ın ilk adımını gör (arşiv almadan da sürüm
karşılaştırmasını yapıyor).
**Geçti:** `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` ile `mobile/src/version.ts`
aynı (bugün 1.0.11 / 13); üçüncü kaynak `android/app/build.gradle` de aynı.
**Geçmezse:** üçü elle eşitlenir — `mobile/src/version.ts` docblock'u kuralı yazıyor.
Ayrışmış sürümle TestFlight'a çıkmak geri alınamayan bir build numarası harcar.

### 2.3 · Gerçek cihaza kurulum
**Önce:** 2.1, 2.2
**Yap:** Kabloyla bağlı iPhone'u hedef seç, Run.
**Geçti:** uygulama cihazda açılıyor.
**Geçmezse:** cihaz "Developer Mode" açık mı (Ayarlar › Gizlilik ve Güvenlik).

---

## 3. Açılış ve sunum

Bu faz 4'ten bağımsız: uygulama açıldığı anda bakılabilir, giriş gerektirmez.

### 3.1 · Uygulama ikonu
**Önce:** 2.3 · **Kaynak:** R1, `ios-parity-R-T-teslim.md` §3.1
**Yap:** Ana ekran, Ayarlar › Lernomi, Spotlight araması ve uygulama seçici — dördüne bak.
**Geçti:** dördünde de turuncu zeminli Erdi portresi; boş/beyaz ikon ya da bulanık kenar
yok. En küçük görünen boyut 40 piksel (bildirim ikonu), orada da maskot tanınmalı.
**Geçmezse:** `mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/Contents.json` ile
klasördeki PNG'ler eşleşiyor mu; pbxproj'da `ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon`
duruyor mu. Yeniden üretim: `cd mobile && python3 scripts/render-app-icon.py` (Pillow).

### 3.2 · Açılış ekranı
**Önce:** 2.3 · **Kaynak:** R2, §5.13
**Yap:** Uygulamayı tamamen kapat, yeniden aç. Android'deki açılışla yan yana karşılaştır.
**Geçti:** turuncu (`#FA7C13`) zemin, ortada yuvarlak köşeli ikon, **hiç yazı yok.**
"Powered by React Native" ya da düz "Lernomi" yazısı görünürse geçmemiştir.
**Geçmezse:** `mobile/ios/Lernomi/LaunchScreen.storyboard`, `Info.plist`
`UILaunchStoryboardName`, `Images.xcassets/LaunchBackground.colorset`. Açılış ekranı
uygulama kodu çalışmadan çizildiği için önbelleğe alınır: değişiklik görünmüyorsa
uygulamayı **silip yeniden kur.**

### 3.3 · Koyu temada açılış flaşı
**Önce:** 3.2 · **Kaynak:** R3, §5.13
**Yap:** Cihazı koyu temaya al, uygulamayı kapat-aç. Turuncu açılış ekranı ile ilk
uygulama karesi arasına bak. Sonra açık temada tekrarla.
**Geçti:** arada beyaz (koyuda) ya da siyah (açıkta) bir kare çakmıyor; geçiş rengi
koyuda `#17120E`, açıkta `#FBF7F2`.
**Geçmezse:** `mobile/ios/Lernomi/AppDelegate.swift` — `window?.backgroundColor` ve
`customizeRootView(_:)`. İkisi birlikte gerekiyor: RN kök görünümü kendi zeminini
`systemBackgroundColor` yapıyor (`RCTRootViewFactory.mm`) ve yalnız pencereyi boyamak
yetmiyor. Renkler `Images.xcassets/WindowBackground.colorset`.

### 3.4 · Arayüz dili
**Önce:** 2.3
**Yap:** Cihaz dilini sırayla Türkçe / İngilizce / Almanca yap, her seferinde uygulamayı
yeniden başlat.
**Geçti:** arayüz cihaz diline uyuyor (ilk açılışta; sonrasında kullanıcının seçimi).
**Geçmezse:** `mobile/src/lib/i18n.ts` `deviceLang()` — iOS'ta sırayla RN sabiti, Hermes
Intl ve `SettingsManager.AppleLanguages` deneniyor.

### 3.5 · iPad düzeni
**Önce:** 2.3 · **Kaynak:** §5.15
**Yap:** iPad'e kur, dikey ve yatay çevir.
**Geçti:** içerik ortada bir sütunda; kartlar ve metin tüm genişliğe yayılıp gerilmiyor,
yatayda kırpılma yok.
**Geçmezse:** `mobile/src/lib/useLayout.ts` (`contentWidthFor`), pbxproj
`TARGETED_DEVICE_FAMILY = "1,2"`, `Info.plist`
`UISupportedInterfaceOrientations~ipad`.

---

## 4. Native modül ayakta mı — buradan sonrasının kapısı

`ios-parity.md` §4'teki kritik kural burada sınanıyor: modül yüklenip de bir yöntem
eksikse uygulama **düzeltmeden önceki hâlinden daha kötü** olur (`TypeError`).

### 4.1 · Modül yükleniyor mu
**Önce:** 2.3 · **Kaynak:** P1
**Yap:** Debug derlemesinde Metro konsolunu aç, uygulamayı başlat.
**Geçti:** `NativeModules.LernomiSpeech` tanımlı; konsolda `RCTLogError`
("Sending ... with no listeners" ya da desteklenmeyen olay adı) yok.
**Geçmezse:** `mobile/ios/Lernomi.xcodeproj/project.pbxproj` — `LernomiSpeech.swift`
Sources fazında, `LernomiSpeech.m` de öyle mi. Olay adları için
`LernomiSpeech.swift` `supportedEvents()` ile `mobile/src/lib/stt.ts` karşılaştırılır;
liste dokuz adı da saymalı.

### 4.2 · `hasMicrophone` çökmüyor mu
**Önce:** 4.1 · **Kaynak:** B1
**Yap:** Ana ekranı (Öğren) aç.
**Geçti:** ekran çiziliyor, yürüyüş kartı görünüyor, kırmızı kutu yok.
**Geçmezse:** `mobile/src/lib/stt.ts:71` — `hasMicrophone()` opsiyonel çağrı DEĞİL; yöntem
native'de yoksa burada patlar. `LernomiSpeech.m`'de `RCT_EXTERN_METHOD(hasMicrophone…)`
satırı var mı.

### 4.3 · Ses efektlerinin mp3 yedeği
**Önce:** 4.1 · **Kaynak:** R4, §5.7
**Yap:** Uygulama yeni açıldığında, WebView köprüsü daha hazır değilken bir düğmeye dokun
(dokunuş sesi). Uçak modunda tekrarla.
**Geçti:** "tap" sesi duyuluyor.
**Geçmezse:** neredeyse kesinlikle paketleme: mp3'ler pakette **kökte** olmalı, `sfx/`
alt klasöründe değil. `react-native-sound` yolu `<paket>/correct.mp3` diye kuruyor
(`RNSound.m` → `bundlePath`, `sound.js:45`), alt klasörü aramıyor. Xcode'da dosyalar
"folder reference" (mavi klasör) olarak eklendiyse hiçbiri bulunamaz —
`ios-parity-R-T-teslim.md` §1.2. Ayrıca `mobile/src/lib/sfx.ts:33`: iOS'ta ad **uzantılı**
aranıyor, Android'de uzantısız.

---

## 5. Giriş — uygulamanın tamamı hesap istiyor

Misafir modu yok: onboarding bittikten sonra hesap zorunlu (`mobile/App.tsx`
`initialRoute`). Yani 6'dan öncesi burada kilitleniyor.

### 5.1 · E-posta ile giriş
**Önce:** 4.2
**Yap:** Onboarding'i geç, var olan bir hesapla e-posta + parola ile gir.
**Geçti:** Öğren ekranı açıldı, `/api/me` verisi geldi (seri, XP, günlük hedef dolu).
**Geçmezse:** `mobile/src/api/client.ts` `API_BASE`, `Info.plist`
`NSAppTransportSecurity` (`NSAllowsArbitraryLoads=false`, yani sunucu HTTPS olmak
zorunda — canlıda öyle).
**Not:** Bu adım geçmeden 5.2 ve 5.3'ün başarısızlığı yorumlanamaz; ikisi de aynı
`sign-in/social` yolunu kullanıyor.

### 5.2 · Google ile Giriş
**Önce:** 5.1, 0.4 · **Kaynak:** C4, §5.10
**Yap:** Çıkış yap, "Google ile devam et".
**Geçti:** cihazın hesap seçici sayfası açılıyor, seçimden sonra oturum açılıyor.
**Geçmezse:** `mobile/src/lib/googleAuth.ts` `IOS_CLIENT_ID` **ve** `Info.plist`
`CFBundleURLTypes` içindeki ters client id — **ikisi birlikte** dolu olmalı, biri boş
kalırsa giriş "invalid client" ile düşer. `webClientId` DEĞİŞMEZ: idToken'ın `aud`'u
web client id olmaya devam ediyor ve sunucudaki `GOOGLE_CLIENT_ID` o.
**Bugün:** `IOS_CLIENT_ID` boş; düğme `googleSupported()` ile gizli. Yani 0.4 yapılmadan
bu adım "ölçülemedi"dir, "başarısız" değil.

### 5.3 · Apple ile Giriş
**Önce:** 5.1, 0.2, 0.3 · **Kaynak:** C3, §5.11
**Yap:** Çıkış yap, "Apple ile devam et". Bir kez **"E-postamı Gizle"** ile de dene.
**Geçti:** sistem sayfası açılıyor, oturum açılıyor ve better-auth kullanıcısına
bağlanıyor. Gizli aktarma adresiyle açılan hesap da uygulamada normal çalışıyor.
**Geçmezse, sırayla:** (1) `/api/config` `providers.apple` true mu — sunucu sağlayıcıyı
yalnız `APPLE_BUNDLE_ID` doluyken kaydediyor (`src/lib/auth/server.ts`), boşsa düğme zaten
çizilmez; (2) `APPLE_BUNDLE_ID` değeri pbxproj'daki bundle kimliğiyle **birebir** aynı mı —
token'ın `aud`'u odur; (3) entitlements ve portal (2.1); (4)
`mobile/src/lib/appleAuth.ts`.
**Ayrıca burada açılacak:** nonce. Bugün `nonceEnabled: false` — kütüphane ham nonce'u
SHA-256'layıp Apple'a özeti yolluyor, JS'e ham değeri döndürüyor, better-auth düz
karşılaştırıyor. Tarif `appleAuth.ts` docblock'unda; risk ölçümü `ios-parity.md` §6'da
(asıl saldırı `aud` ile zaten kapalı). Cihaz varken denenip açılabilir.

### 5.4 · Hesap silme — bu fazın SONU
**Önce:** 5.1 (ve tercihen 5.2/5.3) · **Kaynak:** C7, §5.12
**Yap:** Ayarlar › Hesap › Hesabı sil. Onay kutusunu işaretle, sil.
**Geçti:** akış sonuna kadar gidiyor, "Hesabın silindi" ekranı geliyor, uygulama
onboarding'e dönüyor. Aynı e-postayla giriş artık çalışmıyor.
**Geçmezse:** `mobile/src/screens/DeleteAccountScreen.tsx`, uç
`POST /api/auth/delete-user` (`src/lib/auth/server.ts:167`). Google hesabında oturum
eskiyse "önce yeniden giriş yap" beklenen davranış, hata değil.
**Uyarı:** hesabı gerçekten siler ve cihazdaki tüm tercihleri (`AsyncStorage.clear()`)
temizler. Atılacak hesapla koş, yoksa 6-8 için yeniden kurulum gerekir.

### 5.5 · Abonelik metni — mağazaya göre
**Önce:** 5.1 · **Kaynak:** E1, `ios-parity-R-T-teslim.md` §3.7
**Yap:** Hesap silme ekranını AÇ (silmeden) ve alttaki abonelik uyarısını oku.
**Geçti:** "App Store üzerinden abonelik aldıysan… **Ayarlar › Apple Hesabı ›
Abonelikler**" yazıyor. "Google Play" ya da "Play Store" geçiyorsa geçmemiştir.
**Geçmezse:** `mobile/src/screens/DeleteAccountScreen.tsx` `Platform.OS` dalı ve
`mobile/src/i18n/{tr,en,de}.ts` `deleteaccount.subscription_cancel_appstore`.

---

## 6. Tur — ekran açık

### 6.1 · Mikrofon açıklaması ve sistem izni
**Önce:** 4.2, 5.1 · **Kaynak:** P3, §5.14
**Yap:** Yürüyüş modunu **ilk kez** başlat. Önce uygulamanın kendi açıklama ekranı, sonra
iki sistem diyaloğu gelir (mikrofon, konuşma tanıma).
**Geçti:** açıklama ekranı olmadan tur başlamıyor; sistem diyaloglarının metinleri
**cihaz dilinde**.
**Geçmezse:** `mobile/ios/Lernomi/{tr,en,de}.lproj/InfoPlist.strings` hedefe bağlı mı
(pbxproj'da variant grubu), `Info.plist` `CFBundleLocalizations` üç dili sayıyor mu.
**Sıra tuzağı:** izin diyaloğu **bir kez** çıkar. Üç dilde de görmek için her seferinde
Ayarlar › Genel › Aktarma veya Sıfırlama › Sıfırla › **Konum ve Gizliliği Sıfırla**
çalıştırıp cihaz dilini değiştirmek gerekir. İzni verdikten sonra bu adım tekrar
ölçülemez — 6.1'i 6.2'den önce ve dikkatli koş.

### 6.2 · Ekran açıkken tur
**Önce:** 6.1
**Yap:** Turu başlat, ekran açık, telefonu elde tut. Beş-altı kelime cevapla; birini
bilerek yanlış söyle, birini hiç söyleme.
**Geçti:** öğretim sesi geliyor, mikrofon açılıyor, doğru/yanlış/duyamadım üçü de doğru
kararlanıyor, kelime tekrar sorulmuyor.
**Geçmezse:** `mobile/src/lib/stt.ts` (olay akışı), `LernomiSpeech.swift` `beginSession`,
`mobile/src/screens/WalkModeScreen.tsx` `judgeSpeak`.

### 6.3 · Ses efektleri ve TTS, köprü hazırken
**Önce:** 6.2 · **Kaynak:** §5.8 (ekran açık yarısı)
**Yap:** Aynı turda micon/micoff/doğru/yanlış seslerini dinle; web ve Android ile
karşılaştır.
**Geçti:** aynı sesler, aynı yükseklikte, üst üste binmiyor.
**Geçmezse:** `mobile/src/lib/sfx.ts` (köprü → `react-native-sound` → native sıralaması),
`mobile/src/lib/sfxNotes.ts` tek kaynak.

### 6.4 · Sessiz anahtar
**Önce:** 6.2 · **Kaynak:** §5.9
**Yap:** Sessiz anahtarı AÇ (zil kapalı), turu sürdür.
**Geçti:** TTS ve efektler duyuluyor.
**Geçmezse:** burada bir kategori çekişmesi ihtimali var ve bu makinede görülemez:
`mobile/src/lib/sfx.ts:30` modül yüklenirken `Sound.setCategory("Playback", false)`
çağırıyor, `LernomiSpeech.swift` ise tur boyunca `.playAndRecord`/`.measurement`
kuruyor. Son ayarlayan kazanır. Ses gelmiyorsa önce bu iki çağrının sırasına bak.

### 6.5 · Analitikte platform
**Önce:** 5.1 · **Kaynak:** E2
**Yap:** Günün ilk açılışından sonra yönetim panosuna bak (Platform dağılımı).
**Geçti:** "iOS · uygulama" satırı beliriyor (kind `ios:standalone`).
**Geçmezse:** `mobile/App.tsx` `track("app_open", …, ${Platform.OS}:standalone)`,
`src/app/admin/dashboard.tsx` `PLATFORM_LABEL`.

---

## 7. BELİRLEYİCİ ÖLÇÜM — tek soru

Bundan **daha erken** koşulamaz: çalışan bir tur gerekiyor. Ama 8'in hiçbir maddesi de
bundan önce koşulmamalı — cevap, 8'de gördüklerinin ne anlama geldiğini değiştiriyor.

### 7.1 · Arka planda `SFSpeechRecognizer` çalışıyor mu
**Önce:** 6.2 · **Kaynak:** `ios-parity-R-T-teslim.md` §5, §3.6a
**Yap:** Turu başlat. Bir kelime sorulurken telefonu **kilitle** ve cevabı söyle.
Ölçmek için native yolu zorlaman gerekiyor; bugünkü kodda kilit `screenOff`'u açıp Azure'a
geçiyor, o yüzden bu ölçüm için `WalkModeScreen.tsx`'te `useAzure` **geçici olarak**
`pocketRef.current` ile sınırlanır (tek satır, commit edilmez) ve öyle kurulur.
**Geçti:** kilitliyken söylenen cevap tanınıyor (doğru/yanlış kararı geliyor).
**Geçmezse (yani tanınmıyorsa):** beklenen sonuç bu; bugünkü eşleme doğrudur.

**Cevabın sonucu:**

| Cevap | Ne değişir |
|---|---|
| **TanımIYOR** | Bugünkü eşleme (`didEnterBackground` → Azure) **doğru**. 8.7 bir kusur değil, tasarım. Kod değişmez. |
| **Tanıyor** | Eşleme fazla geniş. `LernomiSpeech.swift` `startScreenWatch`'tan `didEnterBackground` çıkarılıp yalnız kilit sinyali bırakılabilir; iOS'ta Azure'a hiç düşülmez ve F0 bütçesi rahatlar. Bu **Ajan 1'in işi**, tarifi `ios-parity-R-T-teslim.md` §5 sonunda. |

Her iki durumda da sonuç kayda geçer: `WalkModeScreen.tsx`'teki uzun not ve
`ios-parity-R-T-teslim.md` §5 buna göre güncellenir. Kodda bekleyen iki yeniden düzenleme
(tekrar şartını saf bir modüle çıkarmak, eşlemeyi daraltmak) ancak bu kayıt varken
yapılır.

---

## 8. Arka plan ve ekran kapalı

Buradaki her madde gerçek cihaz ister; simülatörde hiçbiri anlamlı değil.

### 8.1 · Kilitten sonra tur devam ediyor mu
**Önce:** 7.1 · **Kaynak:** §5.1
**Yap:** Turu başlat, telefonu kilitle, cebe koy. Üç-dört kelime bekle.
**Geçti:** tur duraksamadan sürüyor; kelimeler gelmeye devam ediyor.
**Geçmezse:** `LernomiSpeech.swift` `startWalkService` — ses oturumu tur boyunca AÇIK
kalmalı; kelime başına kapanırsa iOS uygulamayı askıya alır. `Info.plist`
`UIBackgroundModes = [audio]`.

### 8.2 · Kelimeler arası bekleme
**Önce:** 8.1 · **Kaynak:** §5.2
**Yap:** 8.1 sürerken kelimeler arası ~850 ms'lik boşluğu izle.
**Geçti:** boşluk geçiliyor, tur takılıp kalmıyor.
**Geçmezse:** `mobile/src/screens/WalkModeScreen.tsx` `gap()` → `nativeDelay` →
`LernomiSpeech.swift` `delay`. Not: JS `setTimeout` arka planda durur; native
`DispatchQueue.asyncAfter` durmaz. Takılma varsa `delay`'in gerçekten çağrıldığını
doğrula.

### 8.3 · Kilit ekranında mikrofon göstergesi
**Önce:** 8.1 · **Kaynak:** §5.3
**Yap:** Tur sürerken kilit ekranını uyandır.
**Geçti:** durum çubuğunda turuncu mikrofon göstergesi açık.
**Geçmezse:** ses oturumu gerçekten kayıt yapıyor mu (8.1 ile aynı kök).

### 8.4 · Now Playing kaydı
**Önce:** 8.3 · **Kaynak:** §5.16, §5.17
**Yap:** Aynı kilit ekranında oynatma kartına bak. Tur boyunca (kayıt ↔ TTS arasında
kategori gidip gelirken) izlemeyi sürdür.
**Geçti:** "Yürüyüş modu açık / Mikrofon dinliyor…" kaydı duruyor, **titremiyor**
(kaybolup geri gelmiyor) ve mikrofon göstergesiyle **birlikte** görünüyor. Metin cihaz
dilinde.
**Geçmezse:** `LernomiSpeech.swift` `showNowPlaying` / `enableWalkRemoteCommands` ve
kategori değiştiren yerler (`startWalkService` `.playAndRecord`, `startTts` `.playback`).
Metin için `mobile/ios/Lernomi/{tr,en,de}.lproj/Localizable.strings`.
**Neden önemli:** App Review Information'a yazılacak cümle tam olarak bu — kullanıcı arka
planda mikrofonun açık olduğunu görüyor ve turu oradan durdurabiliyor
(`docs/appstore/README.md`, İnceleme riski).

### 8.5 · Kilit ekranından durdurma
**Önce:** 8.4 · **Kaynak:** §6 kararı, `55411a3`
**Yap:** Kilit ekranındaki durdur/duraklat düğmesine bas. Ayrı olarak kulaklık düğmesiyle
tekrarla.
**Geçti:** tur bitiyor, mikrofon kapanıyor, uygulamaya dönünce tur özeti görünüyor ve o
ana kadarki cevaplar kaydedilmiş (seri/XP artmış).
**Geçmezse:** `LernomiSpeech.swift` `enableWalkRemoteCommands` → `LernomiWalkStop`,
`mobile/src/lib/stt.ts:172` `onWalkStop`, `WalkModeScreen.tsx` durdurma yolu.

### 8.6 · `uploadStt` arka planda tamamlanıyor mu
**Önce:** 8.1, 0.5 · **Kaynak:** §5.6
**Yap:** 8.1 sürerken cevap ver ve kararın gelmesini bekle (kilit ekranındaki sesten
anlaşılır).
**Geçti:** karar geliyor; sessizce "duyamadım"a düşmüyor.
**Geçmezse:** `LernomiSpeech.swift` `uploadStt` ve `setApiBase` allowlist'i (yalnız https
ve yalnız API hostu; başka host sessizce nil döner), sunucuda `/api/stt` ve
`AZURE_SPEECH_KEY`. iOS'un arka plan görev süresi sınırı da buraya girer — ses oturumu
açık olduğu sürece uygulama askıya alınmamalı, alınıyorsa 8.1 zaten geçmemiştir.

### 8.7 · Arka plana geçiş Azure yoluna çeviriyor mu
**Önce:** 7.1, 8.1 · **Kaynak:** §5.5
**Yap:** Tur ekran açıkken sürerken bir bildirime dokunup başka uygulamaya geç, sonra dön.
**Geçti:** tur sürüyor ve arka plandayken sorulan kelimeler yanıtlanabiliyor.
**Nasıl okunur:** 7.1 "tanımıyor" dediyse bu **doğru davranış** — ücretsiz yol gerçekten
bozuk, Azure devreye giriyor. 7.1 "tanıyor" dediyse bu **fazla harcama** ve eşleme
daraltılmalı.
**Geçmezse:** `WalkModeScreen.tsx` `useAzure`, `LernomiSpeech.swift` `startScreenWatch`.

### 8.8 · Kısa kesinti kelimeyi yakmıyor
**Önce:** 8.7 · **Kaynak:** `d5a8a98`
**Yap:** Bir kelime sorulup mikrofon açıldıktan hemen sonra bildirim şeridini aşağı çek ve
**iki saniye içinde** kapat. Üç kez üst üste tekrarla.
**Geçti:** kelime bir kez daha soruluyor; "duyamadım" sayılmıyor ve tur "seni duyamıyorum"
diyerek durmuyor.
**Geçmezse:** `WalkModeScreen.tsx` — `listenCut` bayrağı ve tekrar şartı
`(listenCut.current || screenOffRef.current)`.

### 8.9 · Telefon çağrısı
**Önce:** 8.1 · **Kaynak:** §5.4
**Yap:** Tur sürerken ikinci telefondan ara. Çağrıyı reddet; sonra tekrarla ve bu kez
kabul edip kapat.
**Geçti:** çağrı bitince ses oturumu toparlanıyor ve tur devam ediyor (ya da temiz
biçimde duruyor — sessizce ölmüyor).
**Geçmezse:** `LernomiSpeech.swift` — `AVAudioSession` kesinti (interruption) bildirimi
dinlenmiyorsa oturum kesintiden sonra geri açılmaz. Bugün böyle bir dinleyici **yok**;
bu adım geçmezse eklenecek iş `LernomiSpeech.swift`'te, yani Ajan 1'de.

### 8.10 · Ekran kapalıyken ses efektleri
**Önce:** 8.1 · **Kaynak:** §5.8
**Yap:** 8.1 sürerken micon/micoff/doğru/yanlış seslerini dinle.
**Geçti:** duyuluyor ve 6.3'te duyulanla aynı.
**Geçmezse:** `mobile/src/lib/sfx.ts` `screenOffMode` dalı → `LernomiSpeech.swift`
`playSfx`; nota tablosu `mobile/src/lib/sfxNotes.ts` ile birebir aynı olmalı.

### 8.11 · Azure harcaması
**Önce:** 8.1, 0.5
**Yap:** Bir tam yürüyüş turu koş (ekran kapalı). Azure portalında çağrı sayısına bak.
**Geçti:** sayı beklenen mertebede; F0 katmanı 5 saat/ay ve sunucuda ayrıca
`AZURE_STT_MONTHLY_SECONDS` tavanı var (boşsa 16200 sn).
**Neden ölçülüyor:** 7.1 "tanıyor" çıkarsa eşlemeyi daraltmanın kazancı buradaki sayıyla
karşılaştırılacak. `docs/plan/stt-capacity.md` varsayımları da buna bakıyor.

---

## 9. Mağaza ve yükleme

### 9.1 · Arşiv
**Önce:** 2.2 · **Kaynak:** O1
**Yap:** `export DEVELOPMENT_TEAM=…` sonra `bash mobile/scripts/ios-archive.sh`.
**Geçti:** `.xcarchive` ve `.ipa` üretildi; sürüm karşılaştırması geçti.
**Geçmezse:** betiğin kendi hata mesajları yol gösteriyor (`mobile/scripts/ios-archive.sh`).

### 9.2 · Yükleme doğrulaması
**Önce:** 9.1, 3.1
**Yap:** `bash mobile/scripts/ios-archive.sh --upload` (ASC API anahtarı ortamda).
**Geçti:** "missing icon" ya da eksik boyut hatası **yok**. iPad girişleri de doğrulanıyor
(`TARGETED_DEVICE_FAMILY = "1,2"`).
**Geçmezse:** 3.1'in altındaki dosyalar.

### 9.3 · TestFlight
**Önce:** 9.2
**Yap:** İşleme bitince TestFlight'tan kur ve 3-8 arasından birkaç maddeyi TestFlight
derlemesinde tekrarla (Release yapılandırması Debug'dan farklı davranabilir).
**Geçti:** Release derlemesinde de aynı sonuçlar.

### 9.4 · Gizlilik manifesti ↔ App Store Connect etiketleri
**Önce:** 9.3 · **Kaynak:** C1
**Yap:** `mobile/ios/Lernomi/PrivacyInfo.xcprivacy` ile App Store Connect'teki gizlilik
beyanını yan yana koy.
**Geçti:** altı veri türü birebir örtüşüyor.
**Geçmezse:** `docs/appstore/README.md`'deki tablo tek kaynak; ayrışırsa inceleme takılır.

### 9.5 · Paywall metni ve "Aboneliği yönet"
**Önce:** 0.6, 5.1 · **Kaynak:** E1
**Yap:** Paywall'ı aç, alttaki yenileme satırını oku ve "Aboneliği yönet"e dokun.
**Geçti:** "Otomatik yenilenir; **App Store**'dan istediğin zaman iptal" yazıyor ve
bağlantı App Store abonelik ekranını açıyor.
**Geçmezse:** `mobile/src/screens/PaywallScreen.tsx` `SUBSCRIPTIONS_URL`,
`mobile/src/i18n/*` `paywall.renew_cancel_appstore`.
**Bugün ölçülemez:** `billingConfig.ts` `iosKey` boşken paywall'a giden hiçbir giriş
noktası çizilmiyor (`billingAvailable()` — Profil bandı ve sınav kilidi gizli). 0.6
yapılmadan bu adım atlanır.

### 9.6 · App Review Information metinleri
**Önce:** 8.4, 8.5
**Yap:** `docs/appstore/README.md` "İnceleme riski" bölümündeki üç cümleyi App Store
Connect'e gir; üçünün de cihazda karşılığı görülmüş olmalı (kullanıcı başlatır → 6.1,
sürdüğü görünür → 8.3 + 8.4, her an durdurulabilir → 8.5).
**Geçti:** üç madde de bu runbook'ta geçmiş olarak işaretli.
**Neden:** arka planda mikrofon isteyen bir uygulamada inceleyenin ilk sorusu "kullanıcı
bunu nasıl durduruyor". Video eklemek en hızlı çözen yol.

---

## 10. Kapanış

### 10.1 · Yayın kapıları
**Önce:** 9.6 · **Kaynak:** `ios-parity.md` §6
**Yap:** §6'daki yedi kapıyı tek tek işaretle.
**Geçti:** hepsi kapalı.

### 10.2 · `LEGAL_PLATFORMS.ios`
**Önce:** 10.1
**Yap:** `src/lib/legal.ts`'te bayrağı aç, `LEGAL_VERSION`'ı artır, `LEGAL_CHANGELOG`'a
kayıt düş — **üçü birlikte** (dosyanın kendi notu).
**Geçti:** web ve mobil hukuki metinlerde iOS görünüyor.

---

## Bugün koşulamayanlar

Bunlar cihazın değil, hesabın/anahtarın eksikliği. Kayda "ölçülemedi" diye geçer, ilgili
önkoşul sağlanınca tek tek koşulur.

| Adım | Bekleyen |
|---|---|
| 5.2 Google girişi | 0.4 — iOS OAuth istemcisi (`IOS_CLIENT_ID` + ters şema, ikisi birlikte) |
| 5.3 Apple girişi | 0.2 + 0.3 — portal yetkisi ve sunucuda `APPLE_BUNDLE_ID` |
| 8.6, 8.7, 8.11 Azure | 0.5 — `AZURE_SPEECH_KEY` / `AZURE_SPEECH_REGION` |
| 9.5 Paywall | 0.6 — RevenueCat iOS anahtarı; anahtar boşken ekran hiçbir yerden açılmıyor |
| 9.2, 9.3 Yükleme | 0.1 — ücretli Apple Developer hesabı |

---

## `ios-parity.md` §5 eşlemesi

Eski numaralar kaybolmasın diye. §5 artık buraya işaret eden tek satıra inebilir.

| §5 | Runbook | §5 | Runbook |
|---|---|---|---|
| 1 | 8.1 | 10 | 5.2 |
| 2 | 8.2 | 11 | 5.3 |
| 3 | 8.3 | 12 | 5.4 |
| 4 | 8.9 | 13 | 3.2 + 3.3 |
| 5 | 8.7 | 14 | 6.1 |
| 6 | 8.6 | 15 | 3.5 |
| 7 | 4.3 | 16 | 8.4 |
| 8 | 6.3 + 8.10 | 17 | 8.4 |
| 9 | 6.4 | | |

§5'te olmayıp buraya eklenenler: 1.2 (`Podfile.lock`), 3.1 (ikon), 3.4 (arayüz dili),
4.1-4.2 (modül ayakta mı), 5.1 (e-posta girişi), 5.5 + 9.5 (mağaza metinleri), 6.5
(analitik), **7.1 (belirleyici ölçüm)**, 8.5 (kilit ekranından durdurma), 8.8 (kısa
kesinti), 8.11 (Azure harcaması), 9.x (yükleme), 10.x (kapanış).

---

## Kayıt

Koşarken doldurulur; sonraki kararların dayanağı bu tablo. "Ölçülemedi" ile "geçmedi"
ayrı tutulur — birincisi önkoşul eksikliği, ikincisi kusur.

```
Tarih:            Cihaz / iOS:            Xcode:            Derleme (Debug/TestFlight):

Adım   Sonuç                      Not
1.1    [ ] geçti [ ] geçmedi [ ] ölçülemedi
1.2    ...
...
7.1    [ ] TANIYOR  [ ] TANIMIYOR            ← bu satır iki yeniden düzenlemeyi belirliyor
...
```

Sonuçlar geldiğinde güncellenecek yerler: `ios-parity.md` §6 (kapılar ve açık kararlar),
`ios-parity-R-T-teslim.md` §5 (eşleme kararı), `docs/appstore/README.md` ("Doğrulanmadı"
cümleleri), ve derlenip cihazda görülen her şey için commit gövdelerindeki
`DOĞRULANMADI:` satırları.
