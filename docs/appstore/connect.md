# App Store Connect — inceleme hesabı ve giriş sağlayıcıları (Lernomi, iOS)

`docs/play/console.md`'nin iOS karşılığı. Kopyası değil: Play ön plan servisi ve Veri güvenliği
soruyor, Apple arka plan sesi gerekçesi, App Privacy ve 4.8 soruyor.

Çekirdek hesapsız açık ("Continue without an account"); sosyal özellikler, sonraki yapay zekâ
değerlendirmeleri ve Premium satın alma hesap istiyor. Arka plan sesini ve yapay zekâyı
görebilmesi için inceleme Premium bir hesap ister.

## 1. App Review Information › Sign-In Required

| Alan | Değer |
|---|---|
| Sign-in required | Evet (hesap isteyen özellikler için) |
| User name | `apple-review@lernomi.app` (Premium, sunucuda yalnız inceleme için verildi) |
| Password | Yalnız Connect'te |
| İkinci hesap (Notes içinde) | `apple-review-free@lernomi.app`, Premium'suz: satın alma akışı için |
| Notes | Aşağıdaki İngilizce metin, olduğu gibi |

**Neden iki hesap.** Ekran kapalı yürüyüş Premium (ücretsizde `/api/stt` `mode=walk` 403), bu
yüzden ana hesap Premium. Premium hesapta paywall plan listesini göstermez ve inceleyici IAP'yi
bulamaz (2.1); satın alma sandbox'ta ikinci hesapla yapılır. Parolalar yalnız Connect'te ve
TestFlight beta notunda; bu belgeye yazılmaz. Hesaplar üretimde, e-postaları doğrulanmış, seviye A1.

Aşağıdaki blok canlı notun aynısı (2026-09-26 ASC okumasıyla karşılaştırıldı), parola yerine yer
tutucu. Düğme adları İngilizce arayüzden birebir (`mobile/src/i18n/en.ts`): yürüyüş modu
**Learn** sekmesinde, hesap silme **Profile › Settings › Account › Delete account**. Alan en çok
4.000 karakter; ölçmek için:
`awk '/^```text/{f=1;next} /^```/{if(f)exit} f' docs/appstore/connect.md | wc -m`.

```text
Review accounts: the account above has active Premium, so Pocket Walking (walk mode with the screen off) and AI feedback work without a paywall. It does not expire and has no two-factor authentication. Premium on the review accounts was granted on our server for review only; on iOS, users get Premium only through in-app purchase. To review the in-app purchases, sign in with the second account, which has NO Premium: [[IAP_DEMO_EMAIL]] / [[IAP_DEMO_PASSWORD]]. There, Profile › "Go Premium" opens the purchase screen with both subscriptions, prices, free trial terms, auto-renewal text and links to the Terms of Use and Privacy Policy. Purchases in review run in the sandbox.

Why buying needs an account (5.1.1(v)): Premium is an account-based subscription that works with the same account on phone, tablet and the web and is restored on any device by signing in. Everything else works without an account (step 2).

1. Onboarding: course German, level "From scratch", goal "Easy".
2. No account needed: on the sign-in screen, "Continue without an account" opens the daily round, practice, the weekly quiz, Skills, the Path, exams and walk mode with the screen on. Without an account the Path's Speaking step runs as a prepared conversation. Friends, leagues, AI conversation and buying Premium need an account; those screens say so, and guest progress moves into the account. Guests delete their data under Profile › Delete guest data.
3. To review account features: "Continue with email" and the account above. If a Cloudflare "Verify you are human" box appears on the email form, tick it (about 2 seconds); "Sign in with Apple" and "Continue without an account" do not show it.
4. The notification screen has one "Continue" button that opens the system alert.
5. Tabs: Learn (daily round, practice, weekly quiz, mock exams, walk mode), Path (units with Reading, Listening, Speaking, Writing, Grammar and Quiz steps, plus module and level exams), Skills, Friends.

6. AI consent (5.1.2(i)): before a feature first sends text to an AI provider (e.g. a Skills writing task or a Path Speaking conversation), a consent screen says what is sent, names each provider and links to the privacy policy. Nothing is sent before "Allow and continue". "Continue without AI" keeps the app usable. The choice is enforced on our server and can be changed in Profile › Settings › Privacy.

7. Microphone and background audio (UIBackgroundModes: audio). Always started by the user:
a) Speaking answers with the screen on (Path Speaking step and "Score yourself", Skills speaking, exam speaking): the mic is open only while the learner answers; recognition runs on the device's speech recognizer.
b) Walk mode, the ONLY use of background audio: Learn › Walk mode › Start. A screen explains the mic use; "Continue" opens the system mic and speech recognition alerts. A consent screen then names the speech recognition providers: "Allow and continue" lets short recordings go to our server for recognition while the screen is off (audio is not stored, only the recognized text); "Continue without sending audio" keeps walk mode screen-on only. During the session the lock screen shows a Now Playing entry ("Walk mode is on") and the mic indicator stays on; the lock screen pause control or the headphone button ends it, as does the in-app stop.

8. User content (1.2): other users' names appear in Friends and leagues. Open a user › "Block / Report", or long-press a leaderboard row to report. AI replies in Path Speaking conversations and AI feedback on speaking and writing answers (Path, Skills, module and level exams) have a "Report" link. Reports are reviewed within 24 hours; the reporter is notified of the outcome.

9. Account deletion (5.1.1(v)): Profile › Settings › Account › Delete account (last row), also linked at the bottom of Profile. Please test with a separate account, not the review account.
```

## 2. Giriş sağlayıcıları

Üç yol aynı Better Auth oturumuna bağlanıyor: e-posta/parola, Google (native idToken), Apple
(native idToken). Listeyi sunucu belirliyor (`GET /api/config`); kapalı sağlayıcının düğmesi
çizilmiyor.

### 2.1 Apple ile Giriş (4.8)

Google sunulduğu için zorunlu. Kurulu: App ID'de *Sign in with Apple*, `Lernomi.entitlements`
(`com.apple.developer.applesignin`), sunucuda `APPLE_BUNDLE_ID` (native token'ın `aud`'u bundle
kimliği, birebir aynı olmalı). Web ve Android Apple'ın web akışını kullanıyor
(`APPLE_SERVICES_ID`). Gizli aktarma adresine giden posta için gönderen Apple'da kayıtlı
(Certificates, Identifiers & Profiles › Services › Sign in with Apple for Email Communication;
denetim TEC-2). Silme ve jeton iptali: `docs/appstore/README.md`.

### 2.2 Google ile Giriş — iOS istemcisi

Android'de Google eşlemeyi paket adı + SHA-1 ile yapıyor; iOS'ta istemci kimliği uygulamaya
girmek zorunda. Kurulu: `mobile/src/lib/googleAuth.ts` › `IOS_CLIENT_ID` dolu.

- İstemci Web ve Android istemcileriyle **aynı projede** olmalı (kimlik `658160017552-` ile
  başlar); başka projedeki istemciyle giriş olmaz, çünkü Google audience'ı yalnız aynı projede
  üretiyor.
- Console: *Google Auth Platform › İstemciler* › OAuth istemci kimliği › **iOS**, paket kimliği
  `app.lernomi.ios` (pbxproj ile birebir). App Store/Takım kimliği boş kalabilir; iOS istemcisinin
  sırrı yoktur. İzin ekranına dokunmak gerekmez (kapsamlar `openid`, `email`, `profile`).
- Kimlik iki yerde iki yazımda duruyor (`IOS_CLIENT_ID` ve Info.plist `CFBundleURLTypes`'ta
  tersi). Elle yazılmaz: `cd mobile && npm run google:ios -- <kimlik>` (kapatmak için
  `-- --clear`). Betik biçimi, projeyi ve yarım kurulumu reddediyor; aynı kapı CI'da
  (`npm run ios:check`).
- Sunucuda iş yok: `GOOGLE_CLIENT_ID` (Web) ve `GOOGLE_CLIENT_SECRET` Play ile ortak; kütüphane
  Web kimliğini `serverClientID` olarak verdiği için iOS idToken'ının `aud`'u da Web kimliği.
  İstemci kimliği sır değil.

## 3. App Privacy ve gönderim

App Privacy tablosu ve manifestle karşılaştırma `docs/appstore/README.md`'de. Gönderimden önce
kalan konsol işleri (son build, abonelikler, ekran görüntüleri, releaseType) `docs/store/audit.md`.
