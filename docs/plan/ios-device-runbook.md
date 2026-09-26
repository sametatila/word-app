# iOS cihaz runbook'u

Gerçek iPhone'da koşulacak adımlar, bağımlılık sırasıyla. "Derleniyor mu" sorusunu
`.github/workflows/ios-build.yml` her push'ta yanıtlıyor; "cihazda çalışıyor mu" sorusu
burada. Bir adım ancak sonucu aşağıdaki **Kayıt** tablosuna yazılınca geçmiş sayılır.
Genel durum ve yayın kapıları: `docs/plan/ios-parity.md`.

## Nasıl kullanılır

Adımlar sırayla koşulur. Her adımda dört şey yazılı: **Önce** (hangi adımdan sonra
gelir), **Yap**, **Geçti** (ne görülürse geçmiş sayılır), **Geçmezse** (hangi dosyaya
bakılacak). Bir adım geçmezse ona bağlı olanlar denenmez: sonuç "başarısız" değil
"ölçülemedi" olur ve öyle kaydedilir.

**Kaynak** satırındaki kodlar (P1, R2, C3, E1…) `ios-parity.md` §1 tablosundaki maddelerdir.
**7.1** cevabı, kodda iki yeniden düzenlemenin yapılıp yapılmayacağını belirliyor.

## Bağımlılık haritası

```
  1 DERLEME
      │
  2 İMZA + CİHAZA KURULUM
      │
      ├── 3 AÇILIŞ VE SUNUM        (ikon, splash, tema, iPad)
      │
  4 NATIVE MODÜL AYAKTA MI          ← buradan sonrası çökerse hiçbiri denenemez
      │
  5 GİRİŞ
      │
  6 TUR — EKRAN AÇIK                 (mikrofon, STT, ses)
      │
  7 BELİRLEYİCİ ÖLÇÜM ────────────── tek soru; 8'in tamamının anlamını değiştirir
      │
  8 ARKA PLAN / EKRAN KAPALI
      │
  9 MAĞAZA VE YÜKLEME
      │
 10 KAPANIŞ (yayın kapıları)
```

## 0. Koşudan önce hazır olması gerekenler

Eksikse ilgili adım "ölçülemedi" kalır.

| # | Ne | Olmadan ölçülemeyen |
|---|---|---|
| 0.1 | Sunucu `.env`'de `AZURE_SPEECH_KEY` + `AZURE_SPEECH_REGION` dolu | 7, 8.6, 8.7, 8.11 |
| 0.2 | Premium'lu test hesabı: cepte yürüyüş Premium kapısında (`pocket_walk`); misafir ve Premium'suz hesapta ekran kapanınca tur Azure'u çağırmadan bekler | 7, 8.6, 8.7, 8.11 |
| 0.3 | Parolası olan bir iPhone (kilit ekranı ve data protection testleri) | 7, 8 |
| 0.4 | İkinci bir telefon (arama testi) ve bir kablosuz kulaklık | 8.5, 8.5a, 8.9 |
| 0.5 | İsteğe bağlı: bir iPad. iPad düzeni simülatörde doğrulandı (denetim IOS-6, 2026-09-24) | 3.5 |

**Test hesabı:** silme akışı (5.4) hesabı gerçekten yok ediyor. Atılacak ayrı bir hesapla
koş; yoksa geri kalanı yeniden denemek için tekrar hesap açmak gerekir.

## 1. Derleme

### 1.1 · Ağaç ve araçlar
**Önce:** —
**Yap:** `cd mobile && npm ci` (postinstall `patch-package`'ı çalıştırır),
sonra `npx tsc --noEmit`.
**Geçti:** ikisi de hatasız. Xcode 16.1+ (`xcodebuild -version`); RN 0.87 bunu istiyor.
**Geçmezse:** `mobile/package.json`, `mobile/patches/`.

### 1.2 · `pod install`
**Önce:** 1.1 · **Kaynak:** P8
**Yap:** `cd mobile/ios && pod install`. Çıktıda `RNAppleAuthentication` ve
`RNGoogleSignin` pod'larını ara.
**Geçti:** `Lernomi.xcworkspace` güncel, iki pod da listede, `Podfile.lock` değişmedi.
**Geçmezse:** `mobile/ios/Podfile`, `mobile/package.json`. Apple paketinin Android
otomatik bağlanması `mobile/react-native.config.js`te kapalı; iOS'a dokunmuyor.

### 1.3 · Simülatöre derleme
**Önce:** 1.2
**Yap:** Xcode'da `Lernomi.xcworkspace` › herhangi bir iPhone simülatörü › Run.
**Geçti:** derleniyor ve simülatörde açılıyor.
**Geçmezse:** `mobile/ios/Lernomi/LernomiSpeech.swift` ve `AppDelegate.swift`
(`customizeRootView(_:)`, `UIColor(named: "WindowBackground")`).

### 1.4 · Simülatörde ne denenebilir, ne denenemez
**Önce:** 1.3
**Denenebilir:** açılış ekranı (3.2), ikonun ana ekranda görünüşü (3.1, kısmen), koyu tema
(3.3), iPad düzeni (3.5), arayüz dili.
**Denenemez:** mikrofon, konuşma tanıma, arka plan sesi, kilit ekranı, Now Playing,
sessiz anahtar, gelen çağrı. 4'ten sonrasının tamamı **gerçek cihaz** ister.
Simülatörde "çalıştı" görmek 6-8'i geçirmez.

## 2. İmza ve cihaza kurulum

### 2.1 · Takım kimliği ve otomatik imza
**Önce:** 1.2 · **Kaynak:** P6
**Yap:** Xcode › Signing & Capabilities › Team seç. `Automatically manage signing` açık.
Capabilities'te **Sign in with Apple** görünmeli (entitlements dosyası bağlı).
**Geçti:** "Provisioning profile" satırında hata yok.
**Geçmezse:** `mobile/ios/Lernomi/Lernomi.entitlements`, pbxproj'daki
`CODE_SIGN_ENTITLEMENTS`, ve Apple Developer portalında App ID'de Sign in with Apple
işaretli mi. Yetki portalda yoksa profil onu taşımaz ve imza hata verir.

### 2.2 · Bundle kimliği ve sürüm
**Önce:** 2.1 · **Kaynak:** P4, P5
**Yap:** `PRODUCT_BUNDLE_IDENTIFIER` = `app.lernomi.ios` mi bak. Sonra depo kökünde
`npm run version:check`.
**Geçti:** denetim temiz. Beklenen sayıyı buraya yazma: sürümün tek kaynağı depo
kökündeki `package.json`, burada tutulan bir kopya yalnız eskir.
**Geçmezse:** depo kökünde `npm run version:set` / `version:bump-code` (`mobile/src/version.ts`
docblock'u). Ayrışmış sürümle TestFlight'a çıkmak geri alınamayan bir build numarası harcar.

### 2.3 · Gerçek cihaza kurulum
**Önce:** 2.1, 2.2
**Yap:** Kabloyla bağlı iPhone'u hedef seç, Run.
**Geçti:** uygulama cihazda açılıyor.
**Geçmezse:** cihazda "Developer Mode" açık mı (Ayarlar › Gizlilik ve Güvenlik).

## 3. Açılış ve sunum

Bu faz 4'ten bağımsız: uygulama açıldığı anda bakılabilir, giriş gerektirmez.

### 3.1 · Uygulama ikonu
**Önce:** 2.3 · **Kaynak:** R1
**Yap:** Ana ekran, Ayarlar › Lernomi, Spotlight araması ve uygulama seçici: dördüne bak.
**Geçti:** dördünde de turuncu zeminli Nomi portresi; boş/beyaz ikon ya da bulanık kenar
yok. En küçük görünen boyut 40 piksel (bildirim ikonu), orada da maskot tanınmalı.
**Geçmezse:** `mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/Contents.json` ile
klasördeki PNG'ler eşleşiyor mu; pbxproj'da `ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon`
duruyor mu. Yeniden üretim: `cd mobile && python3 scripts/render-app-icon.py` (Pillow).

### 3.2 · Açılış ekranı
**Önce:** 2.3 · **Kaynak:** R2
**Yap:** Uygulamayı tamamen kapat, yeniden aç. Android'deki açılışla yan yana karşılaştır.
**Geçti:** turuncu (`#FA7C13`) zemin, ortada yuvarlak köşeli ikon, **hiç yazı yok.**
**Geçmezse:** `mobile/ios/Lernomi/LaunchScreen.storyboard`, `Info.plist`
`UILaunchStoryboardName`, `Images.xcassets/LaunchBackground.colorset`. Açılış ekranı
önbelleğe alınır: değişiklik görünmüyorsa uygulamayı **silip yeniden kur.**

### 3.3 · Koyu temada açılış flaşı
**Önce:** 3.2 · **Kaynak:** R3
**Yap:** Cihazı koyu temaya al, uygulamayı kapat-aç. Turuncu açılış ekranı ile ilk
uygulama karesi arasına bak. Sonra açık temada tekrarla.
**Geçti:** arada beyaz (koyuda) ya da siyah (açıkta) bir kare çakmıyor; geçiş rengi
koyuda `#17120E`, açıkta `#FBF7F2`.
**Geçmezse:** `mobile/ios/Lernomi/AppDelegate.swift`: `window?.backgroundColor` ve
`customizeRootView(_:)`. İkisi birlikte gerekiyor: RN kök görünümü kendi zeminini
`systemBackgroundColor` yapıyor (`RCTRootViewFactory.mm`), yalnız pencereyi boyamak
yetmiyor. Renkler `Images.xcassets/WindowBackground.colorset`.

### 3.4 · Arayüz dili
**Önce:** 2.3
**Yap:** Cihaz dilini sırayla Türkçe / İngilizce / Almanca yap, her seferinde uygulamayı
yeniden başlat.
**Geçti:** arayüz cihaz diline uyuyor (ilk açılışta; sonrasında kullanıcının seçimi).
**Geçmezse:** `mobile/src/lib/i18n.ts` `deviceLang()`: iOS'ta sırayla RN sabiti, Hermes
Intl ve `SettingsManager.AppleLanguages` deneniyor.

### 3.5 · iPad düzeni (isteğe bağlı)
**Önce:** 2.3, 0.5
**Yap:** iPad'e kur, dikey ve yatay çevir.
**Geçti:** içerik ortada bir sütunda; kartlar ve metin tüm genişliğe yayılıp gerilmiyor,
yatayda kırpılma yok.
**Geçmezse:** `mobile/src/lib/useLayout.ts` (`contentWidthFor`), pbxproj
`TARGETED_DEVICE_FAMILY = "1,2"`, `Info.plist` `UISupportedInterfaceOrientations~ipad`.

## 4. Native modül ayakta mı — buradan sonrasının kapısı

Modül yüklenip de bir yöntem eksikse uygulama `TypeError` ile çöker: modülün hiç
yüklenmemesinden daha kötü bir durum.

### 4.1 · Modül yükleniyor mu
**Önce:** 2.3 · **Kaynak:** P1
**Yap:** Debug derlemesinde Metro konsolunu aç, uygulamayı başlat.
**Geçti:** `NativeModules.LernomiSpeech` tanımlı; konsolda `RCTLogError`
("Sending ... with no listeners" ya da desteklenmeyen olay adı) yok.
**Geçmezse:** `mobile/ios/Lernomi.xcodeproj/project.pbxproj`: `LernomiSpeech.swift` ve
`LernomiSpeech.m` Sources fazında mı. Olay adları için `LernomiSpeech.swift`
`supportedEvents()` ile `mobile/src/lib/stt.ts` karşılaştırılır; liste on adı saymalı.

### 4.2 · `hasMicrophone` çökmüyor mu
**Önce:** 4.1
**Yap:** Ana ekranı (Öğren) aç.
**Geçti:** ekran çiziliyor, yürüyüş kartı görünüyor, kırmızı kutu yok.
**Geçmezse:** `mobile/src/lib/stt.ts` `hasMicrophone()`: `Native?.hasMicrophone()`
opsiyonel çağrı DEĞİL, yöntem native'de yoksa burada patlar. `LernomiSpeech.m`'de
`RCT_EXTERN_METHOD(hasMicrophone…)` satırı var mı.

### 4.3 · Ses efektlerinin mp3 yedeği
**Önce:** 4.1 · **Kaynak:** R4
**Yap:** Uygulama yeni açıldığında, WebView köprüsü daha hazır değilken bir düğmeye dokun
(dokunuş sesi). Uçak modunda tekrarla.
**Geçti:** "tap" sesi duyuluyor.
**Geçmezse:** neredeyse kesinlikle paketleme. mp3'ler pakette **kökte** olmalı, `sfx/`
alt klasöründe değil: `react-native-sound` yolu `<paket>/correct.mp3` diye kuruyor
(`RNSound.m` → `bundlePath`, `sound.js`), alt klasörü aramıyor. Xcode'da dosyalar
"folder reference" (mavi klasör) olarak eklenirse hiçbiri bulunamaz; tek tek dosya
başvurusu olmalı. Ayrıca `mobile/src/lib/sfx.ts` `fileName`: iOS'ta ad **uzantılı**
aranıyor, Android'de uzantısız.

## 5. Giriş — hesapla ya da hesapsız

Onboarding bitince giriş ekranı açılıyor; "Hesapsız devam et" misafir kimliğiyle
uygulamaya geçiriyor. Hesap isteyen yüzeyler (sosyal, tek denemeden sonraki yapay zekâ,
Premium) misafirde "Hesap oluştur" kartı gösteriyor; hatırlatmalar misafire de açık
(cihaz içi). 6'dan sonrasının çoğu hesapla koşulur.

### 5.0 · Hesapsız devam et
**Önce:** 4.2
**Yap:** Onboarding'i geç, giriş ekranında "Hesapsız devam et"e dokun. Bir kelime turu ve
bir konuşma çöz; Profil'de "Misafir" ve hesap çağrısını gör; Arkadaşlar sekmesini aç.
Sonra Profil › Hesap oluştur ile e-postayla kayıt ol.
**Geçti:** tur ve konuşma misafirde çalıştı; Arkadaşlar "Hesap oluştur" kartı gösterdi;
kayıttan sonra "Misafir ilerlemen hesabına taşındı" notu çıktı ve ilerleme hesapta duruyor.
**Geçmezse:** `mobile/src/lib/AuthContext.tsx` `continueAsGuest` / `claimPendingGuest`,
sunucu `src/app/api/account/guest/claim/route.ts`; ağ kaydında
`/api/auth/sign-in/anonymous` ve `/api/account/guest/claim` cevaplarına bak.

### 5.1 · E-posta ile giriş
**Önce:** 4.2
**Yap:** Var olan bir hesapla e-posta + parola ile gir.
**Geçti:** Öğren ekranı açıldı, `/api/me` verisi geldi (seri, XP, günlük hedef dolu).
**Geçmezse:** `mobile/src/api/base.ts` (`PRIMARY_BASE` / `FALLBACK_BASE`), `Info.plist`
`NSAppTransportSecurity` (`NSAllowsArbitraryLoads=false`, sunucu HTTPS olmak zorunda).
**Not:** bu adım geçmeden 5.2 ve 5.3'ün başarısızlığı yorumlanamaz; ikisi de aynı
`sign-in/social` yolunu kullanıyor.

### 5.2 · Google ile Giriş
**Önce:** 5.1 · **Kaynak:** C4
**Yap:** Çıkış yap, "Google ile devam et".
**Geçti:** hesap seçici sayfası açılıyor, seçimden sonra oturum açılıyor.
**Geçmezse, sırayla:** (1) `npm run ios:check` › "Google iOS istemcisi" ne diyor ("yarım
kurulum" ise iki yazımdan biri boş); (2) Google Console'daki iOS istemcisinin **paket
kimliği** `app.lernomi.ios` mi (ayrışırsa "invalid client"); (3) `/api/config`
`providers.google` true mu (sunucuda `GOOGLE_CLIENT_ID` + `SECRET`); (4)
`mobile/src/lib/googleAuth.ts`.
**Değişmeyen:** `webClientId`. Kütüphane onu `GIDConfiguration`a `serverClientID` olarak
veriyor, Google da ID token'ın `aud`'unu ondan üretiyor: idToken'ın `aud`'u iOS'ta da
**web** client id ve sunucudaki `GOOGLE_CLIENT_ID` onu doğruluyor. iOS istemcisi yalnız
uygulamayı tanıtıyor.
**İki yazım tek komutla:** kimlik `googleAuth.ts`'te düz (`IOS_CLIENT_ID`), `Info.plist`'te
TERS duruyor; ikisini `npm run google:ios -- <istemci-kimliği>` birlikte yazıyor, `--clear`
geri kapatıyor. Elle yazmak yarım kurulum riski; kapı `check-ios.py`de.

### 5.3 · Apple ile Giriş
**Önce:** 5.1 · **Kaynak:** C3
**Yap:** Çıkış yap, "Apple ile devam et". Bir kez **"E-postamı Gizle"** ile de dene.
**Geçti:** sistem sayfası açılıyor, oturum açılıyor ve better-auth kullanıcısına
bağlanıyor. Gizli aktarma adresiyle açılan hesap da normal çalışıyor.
**Geçmezse, sırayla:** (1) `/api/config` `providers.apple` true mu: sunucu sağlayıcıyı
yalnız `APPLE_BUNDLE_ID` doluyken kaydediyor (`src/lib/auth/server.ts`), boşsa düğme
çizilmez; (2) `APPLE_BUNDLE_ID` pbxproj'daki bundle kimliğiyle **birebir** aynı mı
(token'ın `aud`'u odur); (3) entitlements ve portal (2.1); (4) `mobile/src/lib/appleAuth.ts`.
**Ayrıca burada açılabilir:** nonce. Bugün `nonceEnabled: false`; tarif `appleAuth.ts`
docblock'unda, risk ölçümü `ios-parity.md` §6 Karar 3'te.

### 5.4 · Hesap silme — bu fazın SONU
**Önce:** 5.1 (ve tercihen 5.2/5.3) · **Kaynak:** C7
**Yap:** Ayarlar › Hesap › Hesabı sil. Onay kutusunu işaretle, sil.
**Geçti:** akış sonuna kadar gidiyor, "Hesabın silindi" ekranı geliyor, uygulama
onboarding'e dönüyor. Aynı e-postayla giriş artık çalışmıyor.
**Geçmezse:** `mobile/src/screens/DeleteAccountScreen.tsx`, uç
`POST /api/auth/delete-user` (`src/lib/auth/server.ts`). Google hesabında oturum
eskiyse "önce yeniden giriş yap" beklenen davranış, hata değil.
**Uyarı:** hesabı gerçekten siler ve cihazdaki tüm tercihleri (`AsyncStorage.clear()`)
temizler. Atılacak hesapla koş.

### 5.5 · Abonelik metni — mağazaya göre
**Önce:** 5.1 · **Kaynak:** E1
**Yap:** Hesap silme ekranını AÇ (silmeden) ve alttaki abonelik uyarısını oku.
**Geçti:** "App Store üzerinden abonelik aldıysan… **Ayarlar › Apple Hesabı ›
Abonelikler**" yazıyor. "Google Play" ya da "Play Store" geçiyorsa geçmemiştir.
**Geçmezse:** `DeleteAccountScreen.tsx` `Platform.OS` dalı ve
`mobile/src/i18n/{tr,en,de}.ts` `deleteaccount.subscription_cancel_appstore`.

## 6. Tur — ekran açık

### 6.1 · Mikrofon açıklaması ve sistem izni
**Önce:** 4.2, 5.1 · **Kaynak:** P3
**Yap:** Yürüyüş modunu **ilk kez** başlat. Önce uygulamanın kendi açıklama ekranı, sonra
iki sistem diyaloğu gelir (mikrofon, konuşma tanıma).
**Geçti:** açıklama ekranı olmadan tur başlamıyor; sistem diyaloglarının metinleri
**cihaz dilinde**.
**Geçmezse:** `mobile/ios/Lernomi/{tr,en,de}.lproj/InfoPlist.strings` hedefe bağlı mı
(pbxproj'da variant grubu), `Info.plist` `CFBundleLocalizations` üç dili sayıyor mu.
**Sıra tuzağı:** izin diyaloğu **bir kez** çıkar. Üç dilde görmek için her seferinde
Ayarlar › Genel › Aktarma veya Sıfırlama › Sıfırla › **Konum ve Gizliliği Sıfırla**
çalıştırıp cihaz dilini değiştir. İzni verdikten sonra bu adım tekrar ölçülemez: 6.1'i
6.2'den önce ve dikkatli koş.

### 6.1a · Mikrofon REDDEDİLİRSE
**Önce:** 6.1
**Yap:** Ayarlar › Lernomi › Mikrofon'u **kapat**. Sonra sırayla dört ekranı aç: yürüyüş
modu, konuşma diyaloğu, konuşma alıştırması (Sınav), deneme sınavının konuşma bölümü.
**Geçti:** dördü de **başlamadan** "izin yok" ekranını/uyarısını çiziyor. Hiçbiri tura
girip arka arkaya "duyamadım" demiyor.
**Neden ölçülüyor:** iOS'ta ses oturumu izin OLMADAN da etkinleşir, yalnız giriş sessizlik
olur; kapı olmasa hata sessiz kalır ve kullanıcı üç "duyamadım" sonunda turu kaybeder.
iOS'taki kapı `LernomiSpeech.ensureMicPermission` (ve `startWalkService`in kapısı).
**Geçmezse:** `mobile/src/lib/stt.ts` `ensureMicPermission` iOS dalı; `LernomiSpeech.m`'de
`RCT_EXTERN_METHOD(ensureMicPermission…)` satırı var mı.
**Sonra:** izni geri aç; 6.2'den itibaren izinli koşuluyor.

### 6.2 · Ekran açıkken tur
**Önce:** 6.1
**Yap:** Turu başlat, ekran açık, telefonu elde tut. Beş-altı kelime cevapla; birini
bilerek yanlış söyle, birini hiç söyleme.
**Geçti:** öğretim sesi geliyor, mikrofon açılıyor, doğru/yanlış/duyamadım üçü de doğru
kararlanıyor, kelime tekrar sorulmuyor.
**Geçmezse:** `mobile/src/lib/stt.ts` (olay akışı), `LernomiSpeech.swift` `beginSession`,
`mobile/src/screens/WalkModeScreen.tsx` `judgeSpeak`.

### 6.3 · Ses efektleri ve TTS, köprü hazırken
**Önce:** 6.2
**Yap:** Aynı turda micon/micoff/doğru/yanlış seslerini dinle; web ve Android ile
karşılaştır.
**Geçti:** aynı sesler, aynı yükseklikte, üst üste binmiyor.
**Geçmezse:** `mobile/src/lib/sfx.ts` (köprü → `react-native-sound` → native sıralaması),
`mobile/src/lib/sfxNotes.ts` tek kaynak.

### 6.4 · Sessiz anahtar
**Önce:** 6.2
**Yap:** Sessiz anahtarı AÇ (zil kapalı), turu sürdür.
**Geçti:** TTS ve efektler duyuluyor.
**Geçmezse:** kategori çekişmesi ihtimali: `mobile/src/lib/sfx.ts` modül yüklenirken
`Sound.setCategory("Playback", false)` çağırıyor, `LernomiSpeech.swift` ise tur boyunca
`.playAndRecord`/`.measurement` kuruyor. Son ayarlayan kazanır; önce bu iki çağrının
sırasına bak.

### 6.5 · Analitikte platform
**Önce:** 5.1 · **Kaynak:** E2
**Yap:** Günün ilk açılışından sonra yönetim panosuna bak (Platform dağılımı).
**Geçti:** "iOS · uygulama" satırı beliriyor (kind `ios:standalone`).
**Geçmezse:** `mobile/App.tsx` `track("app_open", …)`, `src/app/admin/dashboard.tsx`
`PLATFORM_LABEL`.

## 7. BELİRLEYİCİ ÖLÇÜM — tek soru

Bundan **daha erken** koşulamaz: çalışan bir tur gerekiyor. 8'in hiçbir maddesi de bundan
önce koşulmamalı: cevap, 8'de görülenin ne anlama geldiğini değiştiriyor.

### 7.1 · Arka planda `SFSpeechRecognizer` çalışıyor mu
**Önce:** 6.2, 0.2, 0.3
**Neden:** iOS "ekran kapalı" bayrağını `didEnterBackground` ile kuruyor; kilit, uygulama
değiştirme, bildirime dokunma ve gelen çağrı aynı olayı düşürüyor ve tur ücretli Azure
yoluna geçiyor. Bu bilerek seçildi: uygulama arka plana düşünce WebView köprüsü kesin
askıya alınıyor, native tanıyıcının arka planda çalıştığı ise doğrulanmadı. Yanlış tarafa
düşmenin bedeli simetrik değil: fazladan bir Azure çağrısı kuruş, sessizce başarısız bir
tanıma "duyamadım" sayılıp üç turda yürüyüşü bitiriyor. Native tarafta kilidi ayırmak da
yok: güç tuşunu haber veren genel API yok, `protectedDataWillBecomeUnavailable` yalnız
parolalı cihazda ve gecikmeli düşüyor.
**Yap:** Turu başlat. Bir kelime sorulurken telefonu **kilitle** ve cevabı söyle. Native
yolu zorlamak için `WalkModeScreen.tsx` dinleme döngüsündeki `screenOffRef.current`
dalları (`pocketGateClosed` beklemesi ve Azure dalı) **geçici olarak** atlanır (commit
edilmez).
**Geçti:** kilitliyken söylenen cevap tanınıyor (doğru/yanlış kararı geliyor).
**Geçmezse (yani tanınmıyorsa):** beklenen sonuç bu; bugünkü eşleme doğrudur.

| Cevap | Ne değişir |
|---|---|
| **TANIMIYOR** | Bugünkü eşleme (`didEnterBackground` → Azure) **doğru**. 8.7 kusur değil, tasarım. Kod değişmez. |
| **TANIYOR** | Eşleme fazla geniş. `LernomiSpeech.swift` `startScreenWatch`tan `didEnterBackground` çıkarılıp yalnız kilit sinyali (parola varsa `protectedDataWillBecomeUnavailable`) bırakılabilir; iOS'ta Azure'a daha az düşülür. |

Sonuç kayda geçer ve `WalkModeScreen.tsx`teki uzun not buna göre güncellenir. Kodda
bekleyen iki yeniden düzenleme (tekrar şartını saf bir modüle çıkarmak, eşlemeyi
daraltmak) ancak bu kayıt varken yapılır.

## 8. Arka plan ve ekran kapalı

Her madde gerçek cihaz ister; simülatörde hiçbiri anlamlı değil. Premium'lu hesapla koş
(0.2).

### 8.1 · Kilitten sonra tur devam ediyor mu
**Önce:** 7.1
**Yap:** Turu başlat, telefonu kilitle, cebe koy. Üç-dört kelime bekle.
**Geçti:** tur duraksamadan sürüyor; kelimeler gelmeye devam ediyor.
**Geçmezse:** `LernomiSpeech.swift` `startWalkService`: ses oturumu tur boyunca AÇIK
kalmalı; kelime başına kapanırsa iOS uygulamayı askıya alır. `Info.plist`
`UIBackgroundModes` `audio` içeriyor mu.

### 8.2 · Kelimeler arası bekleme
**Önce:** 8.1
**Yap:** 8.1 sürerken kelimeler arası ~850 ms'lik boşluğu izle.
**Geçti:** boşluk geçiliyor, tur takılıp kalmıyor.
**Geçmezse:** `WalkModeScreen.tsx` `gap()` → `nativeDelay` → `LernomiSpeech.swift`
`delay`. JS `setTimeout` arka planda durur; native `DispatchQueue.asyncAfter` durmaz.
Takılma varsa `delay`'in gerçekten çağrıldığını doğrula.

### 8.3 · Kilit ekranında mikrofon göstergesi
**Önce:** 8.1
**Yap:** Tur sürerken kilit ekranını uyandır.
**Geçti:** durum çubuğunda turuncu mikrofon göstergesi açık.
**Geçmezse:** ses oturumu gerçekten kayıt yapıyor mu (8.1 ile aynı kök).

### 8.4 · Now Playing kaydı
**Önce:** 8.3
**Yap:** Aynı kilit ekranında oynatma kartına bak. Tur boyunca (kayıt ↔ TTS arasında
kategori gidip gelirken) izlemeyi sürdür.
**Geçti:** "Yürüyüş modu açık / Mikrofon dinliyor…" kaydı duruyor, **titremiyor**
(kaybolup geri gelmiyor) ve mikrofon göstergesiyle **birlikte** görünüyor. Metin cihaz
dilinde.
**Geçmezse:** `LernomiSpeech.swift` `showNowPlaying` / `enableWalkRemoteCommands` ve
kategori değiştiren yerler (`startWalkService` `.playAndRecord`, `startTts` `.playback`).
Metin: `mobile/ios/Lernomi/{tr,en,de}.lproj/Localizable.strings`.
**Neden önemli:** App Review Information'daki cümle tam olarak bu: kullanıcı arka planda
mikrofonun açık olduğunu görüyor ve turu oradan durdurabiliyor.

### 8.5 · Kilit ekranından durdurma
**Önce:** 8.4, 0.4 · **Kaynak:** `ios-parity.md` §6 Karar 1
**Yap:** Kilit ekranındaki durdur/duraklat düğmesine bas. Ayrıca kulaklık düğmesiyle
tekrarla.
**Geçti:** tur bitiyor, mikrofon kapanıyor, uygulamaya dönünce tur özeti görünüyor ve o
ana kadarki cevaplar kaydedilmiş (seri/XP artmış).
**Geçmezse:** `LernomiSpeech.swift` `enableWalkRemoteCommands` → `LernomiWalkStop`,
`mobile/src/lib/stt.ts` `onWalkStop`, `WalkModeScreen.tsx` durdurma yolu.

### 8.5a · Kablosuz kulaklığın MİKROFONU kullanılıyor mu
**Önce:** 8.1, 0.4
**Yap:** Kulaklığı bağla, telefonu **cebe koy**, turu başlat ve normal ses tonuyla
cevapla. Birkaç kelime sonra kulaklığı çıkarıp cebe konuşmayı dene.
**Geçti:** kulaklıkla cevaplar tanınıyor; ses de kulaklıktan geliyor. Kulaklık çıkınca
telefonun mikrofonuna dönüyor.
**Neden ölçülüyor:** giriş yönlendirmesi kategori seçeneklerinden geliyor
(`.allowBluetooth` HFP giriş, `.allowBluetoothA2DP` çıkış) ve kategori **kelime başına**
yeniden kuruluyor. Seçenek listesi bir yerde eksik kalırsa ses kulaklıktan gelir ama
mikrofon cepteki telefona düşer: kusur "yarım çalışıyor" diye görünür.
`LernomiSpeech.swift`'te kategoriyi kuran ÜÇ yer de `Self.walkOptions` kullanmalı:
`activateWalkSession`, `startRecording`, `beginSession`.
**Geçmezse:** o üç çağrıdan biri elle yazılmış bir seçenek listesine dönmüştür.

### 8.6 · `uploadStt` arka planda tamamlanıyor mu
**Önce:** 8.1, 0.1
**Yap:** 8.1 sürerken cevap ver ve kararın gelmesini bekle (kilit ekranındaki sesten
anlaşılır).
**Geçti:** karar geliyor; sessizce "duyamadım"a düşmüyor.
**Geçmezse:** `LernomiSpeech.swift` `uploadStt` ve `setApiBase` allowlist'i (yalnız https
ve yalnız API hostu; başka host sessizce nil döner), sunucuda `/api/stt` ve
`AZURE_SPEECH_KEY`. Ses oturumu açık olduğu sürece uygulama askıya alınmamalı;
alınıyorsa 8.1 zaten geçmemiştir.

### 8.7 · Arka plana geçiş Azure yoluna çeviriyor mu
**Önce:** 7.1, 8.1
**Yap:** Tur ekran açıkken sürerken bir bildirime dokunup başka uygulamaya geç, sonra dön.
**Geçti:** tur sürüyor ve arka plandayken sorulan kelimeler yanıtlanabiliyor.
**Nasıl okunur:** 7.1 "tanımıyor" dediyse bu **doğru davranış**. 7.1 "tanıyor" dediyse bu
**fazla harcama** ve eşleme daraltılmalı.
**Geçmezse:** `WalkModeScreen.tsx` `screenOffRef`, `LernomiSpeech.swift` `startScreenWatch`.

### 8.8 · Kısa kesinti kelimeyi yakmıyor
**Önce:** 8.7
**Yap:** Bir kelime sorulup mikrofon açıldıktan hemen sonra bildirim şeridini aşağı çek ve
**iki saniye içinde** kapat. Üç kez üst üste tekrarla.
**Geçti:** kelime bir kez daha soruluyor; "duyamadım" sayılmıyor ve tur "seni duyamıyorum"
diyerek durmuyor.
**Geçmezse:** `WalkModeScreen.tsx`: `listenCut` bayrağı ve tekrar şartı
`(listenCut.current || screenOffRef.current)`.

### 8.9 · Telefon çağrısı
**Önce:** 8.1, 0.4
**Yap:** Tur sürerken ikinci telefondan ara. Çağrıyı reddet; sonra tekrarla ve bu kez
kabul edip kapat.
**Geçti:** çağrı bitince ses oturumu toparlanıyor ve tur devam ediyor (ya da temiz
biçimde duruyor; sessizce ölmüyor).
**Geçmezse:** `LernomiSpeech.swift` `startAudioObservers`: `.ended` + `.shouldResume`
gelince oturum yeniden etkinleşiyor; sistem "devam etme" derse JS'e
`LernomiWalkServiceFailed` (`reason: "interrupted"`) gidiyor ve ekranda uyarı çiziliyor.
Üç sonuç ayrı: tur sürdü / uyarıyla sürdü / sessizce öldü. Yalnız sonuncusu kusur.

### 8.10 · Ekran kapalıyken ses efektleri
**Önce:** 8.1
**Yap:** 8.1 sürerken micon/micoff/doğru/yanlış seslerini dinle.
**Geçti:** duyuluyor ve 6.3'te duyulanla aynı.
**Geçmezse:** `mobile/src/lib/sfx.ts` `screenOffMode` dalı → `LernomiSpeech.swift`
`playSfx`; nota tablosu `mobile/src/lib/sfxNotes.ts` ile birebir aynı olmalı.

### 8.11 · Azure harcaması
**Önce:** 8.1, 0.1
**Yap:** Bir tam yürüyüş turu koş (ekran kapalı). Azure portalında çağrı sayısına bak.
**Geçti:** sayı beklenen mertebede; F0 katmanı 5 saat/ay ve sunucuda ayrıca
`AZURE_STT_MONTHLY_SECONDS` tavanı var (boşsa 16200 sn).
**Neden ölçülüyor:** 7.1 "tanıyor" çıkarsa eşlemeyi daraltmanın kazancı bu sayıyla
karşılaştırılır. `docs/plan/stt-capacity.md` varsayımları da buna bakıyor.

## 9. Mağaza ve yükleme

### 9.1 · Arşiv
**Önce:** 2.2 · **Kaynak:** O1
**Yap:** `export DEVELOPMENT_TEAM=…` sonra `bash mobile/scripts/ios-archive.sh`.
**Geçti:** `.xcarchive` ve `.ipa` üretildi; sürüm karşılaştırması geçti.
**Geçmezse:** betiğin kendi hata mesajları.

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

### 9.3a · Görünür bildirim `remote-notification` kipi olmadan geliyor mu
**Önce:** 9.3 (build 9 ve sonrası)
**Neden:** `UIBackgroundModes`ta `remote-notification` yok (denetim T1, 2.5.4): sessiz push
yok, sunucu yalnız görünür bildirim gönderiyor. Görünür bildirim bu kip olmadan da
gelmeli; gelmezse kip geri konur ve inceleme notuna gerekçe yazılır.
**Yap:** Bildirim izni ver, uygulamayı arka plana al; panelden ya da seri koruma saatinde
bir bildirim tetikle. Uygulama kapalıyken de bir kez dene.
**Geçti:** bildirim iki durumda da kilit ekranına düşüyor, dokununca uygulama açılıyor.

### 9.4 · Gizlilik manifesti ↔ App Store Connect etiketleri
**Önce:** 9.3 · **Kaynak:** C1
**Yap:** `mobile/ios/Lernomi/PrivacyInfo.xcprivacy` ile App Store Connect'teki gizlilik
beyanını yan yana koy.
**Geçti:** on veri türü (e-posta, ad, kullanıcı kimliği, cihaz kimliği, kaba konum,
kullanıcı içeriği, ürün etkileşimi, satın alma geçmişi, çökme verisi, diğer tanı verisi)
birebir örtüşüyor.
**Geçmezse:** `docs/appstore/README.md`'deki tablo tek kaynak; ayrışırsa inceleme takılır.

### 9.5 · Paywall metni ve "Aboneliği yönet"
**Önce:** 5.1 · **Kaynak:** E1
**Yap:** Paywall'ı aç, alttaki yenileme satırını oku ve "Aboneliği yönet"e dokun.
**Geçti:** "Otomatik yenilenir; **App Store**'dan istediğin zaman iptal" yazıyor ve
bağlantı App Store abonelik ekranını açıyor.
**Geçmezse:** `mobile/src/screens/PaywallScreen.tsx` `SUBSCRIPTIONS_URL`,
`mobile/src/i18n/*` `paywall.renew_cancel_appstore`. Paywall'a giriş noktası hiç
çizilmiyorsa `mobile/src/lib/billing.ts` `billingAvailable()` ve
`mobile/src/lib/billingConfig.ts` `iosKey`.

### 9.6 · App Review Information metinleri
**Önce:** 8.4, 8.5
**Yap:** `docs/appstore/README.md` "İnceleme riski" bölümündeki üç cümlenin cihazda
karşılığını gör (kullanıcı başlatır → 6.1, sürdüğü görünür → 8.3 + 8.4, her an
durdurulabilir → 8.5).
**Geçti:** üç madde de bu runbook'ta geçmiş olarak işaretli.
**Neden:** arka planda mikrofon isteyen uygulamada inceleyenin ilk sorusu "kullanıcı bunu
nasıl durduruyor". Video eklemek en hızlı çözen yol.

## 10. Kapanış

### 10.1 · Yayın kapıları
**Önce:** 9.6
**Yap:** `ios-parity.md` §6'daki kapıları tek tek işaretle.
**Geçti:** hepsi kapalı.

## Kayıt

Koşarken doldurulur; sonraki kararların dayanağı bu tablo. "Ölçülemedi" ile "geçmedi"
ayrı tutulur: birincisi önkoşul eksikliği, ikincisi kusur.

```
Tarih:            Cihaz / iOS:            Xcode:            Derleme (Debug/TestFlight):

Adım   Sonuç                      Not
1.1    [ ] geçti [ ] geçmedi [ ] ölçülemedi
1.2    ...
...
7.1    [ ] TANIYOR  [ ] TANIMIYOR            ← bu satır iki yeniden düzenlemeyi belirliyor
...
```

Sonuçlar gelince güncellenecek yerler: `ios-parity.md` §1 (açık satırlar) ve §6 (kapılar),
`WalkModeScreen.tsx` ekran eşlemesi notu (7.1), `docs/appstore/README.md` "Cihazda
koşuldu mu" satırı.
