# App Store Connect — inceleme hesabı, giriş sağlayıcıları, kontroller (Lernomi, iOS)

`docs/play/console.md`'nin iOS karşılığı. Aynı gerçeği anlatır, Apple'ın alanlarıyla.
**Kopyala-yapıştır değildir:** Play'in sorduğu şey (ön plan servisi beyanı, Data Safety)
ile Apple'ın sorduğu şey (arka plan sesi gerekçesi, App Privacy, 4.8) örtüşmüyor.

Uygulama hesapsız da kullanılabiliyor (2026-09-15, mağaza ön inceleme B24): giriş
ekranındaki "Continue without an account" kelime turlarını, konuşmaları, becerileri, Patika'yı,
ekran açık yürüyüş modunu ve sınavları açıyor. Hatırlatmalar (cihaz içi) ve rızayla tek bir yapay zekâ
değerlendirmesi misafire açık; sosyal özellikler, sonraki değerlendirmeler ve Premium satın alma hesap istiyor; o ekranlar bunu söyleyip "Create account"
sunuyor ve misafir ilerlemesi hesaba taşınıyor. Arka plan sesini ve yapay zekâyı görebilmesi
için inceleme yine Premium bir test hesabı ister (Sign-in required: evet).

**Durum (2026-09-23, ASC salt GET dökümü):** Apple Developer hesabı açık, uygulama kaydı
var (`6810593275`, `app.lernomi.ios`), TestFlight'ta build 2, 3 ve 4 geçerli. App Review
Information'da iletişim, telefon, demo hesap (`apple-review@lernomi.app`, Premium) ve
notlar **dolu**; ancak canlıdaki notlar aşağıdaki taslaktan eski: mikrofonu "yalnız
telaffuz puanı için" diye anlatıyor, arka plan sesinden söz etmiyor ve Premium'lu hesapla
satın alma ekranına gidilemiyor (denetim LEG-6, IAP-5/8). Aşağıdaki metin güncel taslak;
Connect'e girmek (PATCH) mağazada canlı etki yaptığı için Samet'in işi.

## 1. App Review Information › Sign-In Required

| Alan | Değer |
|---|---|
| Sign-in required | Evet (hesap isteyen özellikler için; çekirdek hesapsız açık) |
| User name | `apple-review@lernomi.app` (Premium; Connect'te kayıtlı) |
| Password | Yalnız Connect'te |
| İkinci hesap (Notes içinde) | `apple-review-free@lernomi.app` — **Premium'suz**, satın alma akışı için. 2026-09-24'te Samet açtı ve doğruladı; not canlı ASC'de ve TestFlight beta notunda (parola yalnız orada). Google karşılığı `google-review-free@lernomi.app` (Play › Uygulama erişimi) |
| Notes | Aşağıdaki İngilizce metin, olduğu gibi |

**Notes alanına İngilizce metin girilir**: inceleyicinin Türkçe bilmesi beklenemez.

**Alan en çok 4.000 karakter.** Taslak 2026-09-24'te 4.224 karaktere çıkmıştı; sıkılaştırılıp
kullanıcı içeriği maddesi (1.2: engelle/bildir, yapay zekâ yanıtında Bildir) eklendi; 2026-09-24'te 3. maddeye Turnstile kutusu cümlesi (denetim IOS-8), 3.412 karakter.
Ekleme yapan uzunluğu ölçsün: `awk '/^```text/{f=1;next} /^```/{if(f)exit} f' docs/appstore/connect.md | wc -m`.

Yollar 2026-09-14'te koddan doğrulandı: yürüyüş modu **Öğren** sekmesindeki "Yürüyüş modu"
kutucuğunda (`mobile/src/screens/LearnScreen.tsx`), Beceriler sekmesinde DEĞİL — eski notlar
yürüyüş modunu Beceriler'de gösteriyordu ve inceleyiciyi olmayan bir yola gönderiyordu. Hesap
silme **Profil › Ayarlar › Hesap › Hesabı sil**, Hesap grubunun son satırı (`SettingsScreen.tsx`); Profil
ekranının en altındaki bağlantı da aynı ekrana gidiyor. Düğme adları uygulamanın
İngilizce arayüzünden birebir (`mobile/src/i18n/en.ts`, kilit ekranı metni
`Localizable.strings` / `values-en/strings.xml`).

> **İki hesap gerekiyor.** Ekran kapalı yürüyüş (arka planda dinleme) Premium: ücretsiz
> hesapta `/api/stt` `mode=walk` 403 döner ve inceleyici kilit ekranı akışını göremez —
> bu yüzden ana hesap Premium. Ama Premium hesapta Profil'deki kart dokunulamaz ve
> paywall plan listesini göstermiyor, yani inceleyici IAP'yi **bulamaz** (2.1 "IAP'leri
> bulamadık" reddi). Satın alma için ikinci, Premium'suz bir hesap notta verilir;
> satın alma sandbox'ta o hesapla yapılır. Hesaplar üretim veritabanında açıldığı için
> ayrıca onaylanır (mağaza raporu B07, denetim IAP-5).

```text
Review accounts: the account above has active Premium, so walk mode with the screen off and AI feedback work without a paywall. It does not expire and has no two-factor authentication. To review the in-app purchases, sign in with the second account, which has NO Premium: [[IAP_DEMO_EMAIL]] / [[IAP_DEMO_PASSWORD]]. There, Profile › "Go Premium" opens the purchase screen with both subscriptions, prices, free trial terms, auto-renewal text and links to the Terms of Use and Privacy Policy. Purchases in review run in the sandbox.

Why buying needs an account (5.1.1(v)): Premium is an account-based, cross-platform subscription (iPhone, Android, web) restored on any device by signing in. Everything else works without an account (step 2).

1. Onboarding: course German, level "From scratch", goal "Easy".
2. No account needed: on the sign-in screen, "Continue without an account" opens vocabulary rounds, conversations, skills, the path, walk mode with the screen on and exams. Friends, leagues, further AI feedback and buying Premium need an account; those screens say so, and guest progress moves into the account. Guests delete their data under Profile › Delete guest data.
3. To review account features: "Continue with email" and the account above. If a Cloudflare "Verify you are human" box appears on the email form, tick it (about 2 seconds); "Sign in with Apple" and "Continue without an account" do not show it.
4. The notification screen has one "Continue" button that opens the system alert.
5. Tabs: Learn (daily round, walk mode, mock exams), Path (conversations), Skills, Friends.

6. AI consent (5.1.2(i)): before a feature first sends text to an AI provider (e.g. a Skills writing task or a Path conversation), a consent screen says what is sent, names each provider and links to the privacy policy. Nothing is sent before "Allow and continue". "Continue without AI" keeps the app usable. The choice is enforced on our server and can be changed in Profile › Settings › Privacy.

7. Microphone and background audio (UIBackgroundModes: audio). Always started by the user:
a) Speaking answers with the screen on (conversations, speaking practice, exam speaking, chat): the mic is open only while the learner answers; recognition runs on the device's speech recognizer.
b) Walk mode, the ONLY use of background audio: Learn › Walk mode › Start. A screen explains the mic use; "Continue" opens the system mic and speech recognition alerts. A consent screen then names the speech recognition providers: "Allow and continue" lets short recordings go to our server for recognition while the screen is off (audio is not stored, only the recognised text); "Continue without sending audio" keeps walk mode screen-on only. During the session the lock screen shows a Now Playing entry ("Walk mode is on") and the mic indicator stays on; the lock screen pause control or the headphone button ends it, as does the in-app stop.

8. User content (1.2): other users' names appear in Friends and leagues. Open a user › "Block / Report", or long-press a leaderboard row to report. Every AI reply in conversations, chat exams and assessments has a "Report" link. Reports are reviewed within 24 hours; the reporter is notified of the outcome.

9. Account deletion (5.1.1(v)): Profile › Settings › Account › Delete account (last row), also linked at the bottom of Profile. Please test with a separate account, not the review account.
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
2026-09-23 itibarıyla tablo **dokuz** tür (yedi eski + Diagnostics › Crash Data ve
Other Diagnostic Data, anonim hata raporu için); manifest yedi türde. Manifest
güncellenmeden (mobil iş) iki taraf eşit değil. Hiçbiri izleme için değil.

## 4. Yayın öncesi kontrol

- Onboarding, giriş ve ana ekranlarda "yakında" / yer tutucu yok.
- Yürüyüş modu için arka plan sesi gerekçesi Notes'ta yazılı; video eklemek en hızlı çözen yol.
- Yapay zekâ içeriği: sohbet bir dil modeliyle üretiliyor, "gerçek kişi değil" bildirimi
  ekranda kalıcı, her yanıtın altında "Bildir" var.
- Yaş derecelendirmesi Play'deki 18+ ile tutarlı dolduruldu.
- `src/lib/legal/index.ts` › `LEGAL_PLATFORMS.ios` **açık** (1.1'den beri; güncel sürüm 1.6, 2026-09-24): gizlilik
  politikası, şartlar ve destek sayfası iOS uygulamasını kapsıyor. Gönderimden önce canlıda
  doğrula: `https://www.lernomi.app/privacy/en` "the Android and iOS apps" diyor, alıcılar
  tablosunda Apple (Sign-In) ve Apple (App Store) var. Künye: `https://www.lernomi.app/impressum`.
- Yapay zekâ rızası (5.1.2(i)): ilk yapay zekâ çağrısında sağlayıcıları adıyla sayan izin
  ekranı açılıyor (notlardaki 6. adım). Sunucu kapısı `user_consents` tablosuna bağlı;
  `drizzle/0052_user_consents.sql` üretimde uygulanmadan bu sürüm yayına çıkmaz.
- Satın alma ekranında kullanım şartları ve gizlilik politikası bağlantıları var (Schedule 2
  §3.8(b)); App Store açıklamasında da aynı iki bağlantı bulunmalı (3.1.2).
