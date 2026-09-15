# App Store Connect — inceleme hesabı, giriş sağlayıcıları, kontroller (Lernomi, iOS)

`docs/play/console.md`'nin iOS karşılığı. Aynı gerçeği anlatır, Apple'ın alanlarıyla.
**Kopyala-yapıştır değildir:** Play'in sorduğu şey (ön plan servisi beyanı, Data Safety)
ile Apple'ın sorduğu şey (arka plan sesi gerekçesi, App Privacy, 4.8) örtüşmüyor.

Uygulama hesapsız da kullanılabiliyor (2026-09-15, mağaza ön inceleme B24): giriş
ekranındaki "Continue without an account" kelime turlarını, dersleri, becerileri, Patika'yı,
ekran açık yürüyüş modunu ve sınavları açıyor. Sosyal özellikler, yapay zekâ değerlendirmesi,
Premium satın alma ve hatırlatmalar hesap istiyor; o ekranlar bunu söyleyip "Create account"
sunuyor ve misafir ilerlemesi hesaba taşınıyor. Arka plan sesini ve yapay zekâyı görebilmesi
için inceleme yine Premium bir test hesabı ister (Sign-in required: evet). Bu belgedeki hiçbir alan **doldurulmuş değil**: Apple Developer
hesabı henüz açılmadı (bkz. `docs/appstore/README.md` "iOS yayınından önce bitmesi
gereken iş" §1).

## 1. App Review Information › Sign-In Required

| Alan | Değer |
|---|---|
| Sign-in required | Evet (hesap isteyen özellikler için; çekirdek hesapsız açık) |
| User name | `[[TEST_HESABI_E_POSTA]]` |
| Password | `[[TEST_HESABI_PAROLA]]` |
| Notes | Aşağıdaki İngilizce metin, olduğu gibi |

**Notes alanına İngilizce metin girilir**: inceleyicinin Türkçe bilmesi beklenemez.

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
Review account: the account above has an active Premium subscription, so walk mode with the screen off and AI feedback work without a paywall. It does not expire and has no two-factor authentication.

1. Open the app and go through onboarding: course German, level "From scratch", goal "Easy".
2. No account is needed to use the app (Guideline 5.1.1(v)): on the sign-in screen, "Continue without an account" opens vocabulary rounds, lessons, skills, the path, walk mode with the screen on and exams. Friends and leagues, AI feedback, buying Premium and reminders need an account; those screens say so and offer "Create account", and guest progress moves into the account. Guest data can be deleted under Profile › Delete guest data.
3. To review the account features, sign in instead: on the sign-in screen tap "Continue with email" and sign in with the account above.
4. The notification permission screen has a single "Continue" button that opens the system alert; choose "Allow" or "Don't Allow" there.
5. Tabs: Learn (daily round, walk mode, mock exams), Path (lessons), Skills (reading, listening, writing, speaking, grammar).

6. Third-party AI consent (Guideline 5.1.2(i)): the first time a feature would send your text to an AI provider (for example a writing task in Skills or a conversation in a Path lesson), the app shows a consent screen. It says what is sent, names each provider and links to the privacy policy. Nothing is sent before you tap "Allow and continue". "Continue without AI" keeps the app usable: conversations follow a script and some writing tasks stay unscored. The decision is stored and enforced on our server, and can be changed under Profile › Settings › Privacy.

7. Walk mode / background audio (UIBackgroundModes: audio): Learn › Walk mode › Start. A short screen explains what the microphone is used for; its single "Continue" button opens the system microphone and speech recognition alerts. Because the review account has Premium, a separate consent screen follows that names the speech recognition providers: "Allow and continue" lets short recordings be transcribed on the server while the screen is off; "Continue without sending audio" keeps walk mode working with the screen on. The mode is always started by the user. Lock the phone: the lock screen shows "Walk mode is on" and the system microphone indicator stays on. You don't need to unlock to stop: the lock screen pause control (or the headphone button) ends the session, and it can also be stopped inside the app.

8. Account deletion (Guideline 5.1.1(v)): Profile › Settings › Account › Delete account (the last row). The same screen is also linked at the bottom of the Profile screen. Please test deletion with a separate account, not the review account. Guests delete their data under Profile › Delete guest data.
```

Test hesabı gerçek veritabanında açılır, e-posta doğrulaması tamamlanır, seviye A1
bırakılır. Parola yalnız Connect'e yazılır, bu belgeye **yazılmaz**.

## 2. Giriş sağlayıcıları

Üç yol var ve üçü de aynı Better Auth oturumuna bağlanıyor: e-posta/parola, Google
(native idToken), Apple (native idToken). Sağlayıcı listesini **sunucu** belirliyor
(`GET /api/config`); kapalı bir sağlayıcının düğmesi hiç çizilmiyor.

### 2.1 Apple ile Giriş — Guidelines 4.8

Google sunulduğu için zorunlu. Kurulum:

1. Apple Developer › Certificates, Identifiers & Profiles › **App ID** için
   *Sign in with Apple* işaretlenir.
2. `Lernomi.entitlements` derlemeye girer (`com.apple.developer.applesignin = ["Default"]`)
   — Şerit P'ye teslim edildi, `docs/plan/ios-parity-A-teslim.md` §1.1.
3. Sunucuda **`APPLE_BUNDLE_ID`** env değeri uygulamanın bundle kimliğiyle **birebir**
   aynı olur: native id token'ın `aud`'u bundle kimliğidir. Boşken sağlayıcı kurulmaz,
   `/api/config` `apple:false` der, düğme çizilmez.
4. **Private Email Relay:** giden posta Resend üzerinden (SMTP ile)
   `noreply@lernomi.app` adresinden çıkıyor. Gönderen kaydedilmezse
   `@privaterelay.appleid.com` adreslerine giden posta geri döner (bounce) —
   parola sıfırlama dâhil. Yol: **Certificates, Identifiers & Profiles →
   `Services` → "Sign in with Apple for Email Communication" → `Configure`**.
   Hangi alan adının kaydedileceği tahmin edilmez (Return-Path ile DKIM `d=`
   ayrı alan adlarında olabilir); yordam `docs/appstore/README.md` §Apple ile
   Giriş madde 4'te.

Web akışı (Services ID + .p8 client secret) da **kurulu** ve canlıda açık (2026-09-14:
`/api/config` → `"apple":true,"appleWeb":true`). iOS native yolu kullanıyor; web ve Android
Apple'ın web akışını (`APPLE_SERVICES_ID`, `mobile/src/screens/AuthScreen.tsx`). Bu yüzden
gizlilik politikasının alıcılar tablosundaki **Apple (Sign-In)** satırı iOS bayrağından
bağımsız ve şartların 7b maddesi Apple ile girişi koşulsuz sayıyor.

### 2.2 Google ile Giriş — iOS istemcisi

Android'de Google eşlemeyi paket adı + SHA-1 ile yapıyor ve istemci koda girmiyor;
**iOS'ta girmek zorunda**: Google uygulamayı bu kimlikle tanıyor.

Bu, `docs/play/console.md`'nin Google tarafındaki karşılığı. **Kodda yapılacak iş tek
komut**; asıl iş Console'da.

#### Console adımları

Önce **doğru proje**: Lernomi'nin Web ve Android istemcilerinin bulunduğu projeyle
AYNI olmalı. Doğrulaması kolay — proje numarası istemci kimliğinin başındaki sayı,
yani Web istemcisininkiyle (`658160017552-…`) başlamalı. Ayrı projede açılan istemci
Console'da doğru görünür, kod doğru görünür, giriş yine olmaz; sebebi §2.2'nin sonunda.

1. `console.cloud.google.com` › üst çubuktan **projeyi seç**.
2. **API'ler ve Hizmetler › Kimlik Bilgileri** (yeni arayüzde: *Google Auth Platform ›
   İstemciler*).
3. **+ Kimlik bilgisi oluştur › OAuth istemci kimliği**.
4. **Uygulama türü: iOS**.
5. **Ad:** serbest, ör. `Lernomi iOS`.
6. **Paket kimliği:** `app.lernomi.ios` — pbxproj'daki `PRODUCT_BUNDLE_IDENTIFIER` ile
   **birebir**. Ayrışırsa giriş "invalid client" ile düşer ve bunu koddan göremeyiz.
7. **App Store Kimliği** ve **Takım Kimliği:** isteğe bağlı, **boş bırakılabilir**.
   App Store kimliği uygulama yayımlanmadan zaten yok.
8. **Oluştur.** Çıkan `<numara>-<harfler>.apps.googleusercontent.com` değerini kopyala.
   **iOS istemcisinin client secret'ı YOKTUR** — böyle bir alan görmemek normal.

İzin ekranına (OAuth consent) dokunmak **gerekmiyor**: kapsamlar değişmiyor
(`openid`, `email`, `profile`) ve ekran Android/web için zaten yapılandırılmış.
Yeni istemci eklemek yeniden doğrulama gerektirmiyor.

#### Kodda karşılığı — tek komut

```bash
cd mobile
npm run google:ios -- <kopyaladığın-kimlik>     # kapatmak için: -- --clear
```

Kimlik iki yerde, iki ayrı YAZIMDA duruyor ve elle yazılırsa ayrışıyor:

| Nerede | Ne |
|---|---|
| `mobile/src/lib/googleAuth.ts` › `IOS_CLIENT_ID` | `<numara>-<harfler>.apps.googleusercontent.com` |
| `Info.plist` › `CFBundleURLTypes` | TERS yazımı: `com.googleusercontent.apps.<numara>-<harfler>` |

Betik ikisini tek değerden yazıyor, tersini kendisi üretiyor ve üç şeyi reddediyor:
biçim (ters yazımı düz sanıp vermek), başka proje, yarım kalmış kurulum. Sonunda
`check-ios.py`yi koşuyor. Aynı kapı CI'da da var (`npm run ios:check` ›
*Google iOS istemcisi*), yani yarım bir kurulum push edilemiyor.

Kimlik **sır değil** — uygulama paketinde zaten gömülü, depoya girmesi normal.
Gizli olan `GOOGLE_CLIENT_SECRET` ve o yalnız sunucuda.

#### Sunucuda yapılacak bir şey YOK

`GOOGLE_CLIENT_ID` (Web istemci) ve `GOOGLE_CLIENT_SECRET` Play ile ORTAK ve
değişmiyor. Sebebi: kütüphane `webClientId`'yi `GIDConfiguration`a **`serverClientID`**
olarak veriyor (`RNGoogleSignin.mm` › `configure:`) ve Google, ID token'ın `aud`'unu
o değerden üretiyor. Yani idToken'ın `aud`'u iOS'ta da **Web** istemci kimliği ve
better-auth onu bugünkü ayarla doğruluyor. iOS istemcisi yalnız uygulamayı tanıtıyor.

Aynı mekanizma "neden aynı proje" sorusunun da cevabı: Google, audience'ı ancak iki
istemci aynı projedeyse üretiyor.

## 3. App Privacy

`docs/appstore/README.md`'deki tablo Connect'e girilir. Uygulama paketindeki
`PrivacyInfo.xcprivacy` ile **birebir aynı** olmalı; ayrışırsa inceleme takılır.
Bugün ikisi eşit (altı tür, hiçbiri izleme için).

## 4. Yayın öncesi kontrol

- Onboarding, giriş ve ana ekranlarda "yakında" / yer tutucu yok.
- Yürüyüş modu için arka plan sesi gerekçesi Notes'ta yazılı; video eklemek en hızlı çözen yol.
- Yapay zekâ içeriği: rol yapma bir dil modeliyle üretiliyor, "gerçek kişi değil" bildirimi
  ekranda kalıcı, her yanıtın altında "Bildir" var.
- Yaş derecelendirmesi Play'deki 18+ ile tutarlı dolduruldu.
- `src/lib/legal/index.ts` › `LEGAL_PLATFORMS.ios` **açık** (sürüm 1.1, 2026-09-14): gizlilik
  politikası, şartlar ve destek sayfası iOS uygulamasını kapsıyor. Gönderimden önce canlıda
  doğrula: `https://www.lernomi.app/privacy/en` "the Android and iOS apps" diyor, alıcılar
  tablosunda Apple (Sign-In) ve Apple (App Store) var.
- Yapay zekâ rızası (5.1.2(i)): ilk yapay zekâ çağrısında sağlayıcıları adıyla sayan izin
  ekranı açılıyor (notlardaki 5. adım). Sunucu kapısı `user_consents` tablosuna bağlı;
  `drizzle/0052_user_consents.sql` üretimde uygulanmadan bu sürüm yayına çıkmaz.
- Satın alma ekranında kullanım şartları ve gizlilik politikası bağlantıları var (Schedule 2
  §3.8(b)); App Store açıklamasında da aynı iki bağlantı bulunmalı (3.1.2).
