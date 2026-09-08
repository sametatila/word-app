# App Store Connect — inceleme hesabı, giriş sağlayıcıları, kontroller (Lernomi, iOS)

`docs/play/console.md`'nin iOS karşılığı. Aynı gerçeği anlatır, Apple'ın alanlarıyla.
**Kopyala-yapıştır değildir:** Play'in sorduğu şey (ön plan servisi beyanı, Data Safety)
ile Apple'ın sorduğu şey (arka plan sesi gerekçesi, App Privacy, 4.8) örtüşmüyor.

Uygulamanın tüm içeriği hesap gerektirir (misafir modu yok), bu yüzden inceleme test
kimlik bilgisi ister. Bu belgedeki hiçbir alan **doldurulmuş değil**: Apple Developer
hesabı henüz açılmadı (bkz. `docs/appstore/README.md` "Bayrak açılmadan bitmesi gereken
iş" §1).

## 1. App Review Information › Sign-In Required

| Alan | Değer |
|---|---|
| Sign-in required | Evet |
| User name | `[[TEST_HESABI_E_POSTA]]` |
| Password | `[[TEST_HESABI_PAROLA]]` |
| Notes | Aşağıdaki adımlar |

Adımlar (Notes alanına):

1. Uygulamayı açın; onboarding'de ilerleyin, kurs Almanca, seviye "Sıfırdan", hedef "Rahat".
2. Giriş ekranında "E-posta ile devam et" → yukarıdaki e-posta ve parola.
3. Bildirim izni ekranında "Belki sonra" seçilebilir.
4. Sekmeler: Öğren (günlük tur), Patika (dersler), Beceriler (okuma/dinleme/yazma, yürüyüş modu).
5. **Yürüyüş modu / arka plan sesi:** Beceriler › Yürüyüş modu › Başla → mikrofon açıklama
   ekranı → "Kabul ediyorum, başla" → sistem mikrofon izni. Modu kullanıcı başlatır.
   Telefonu kilitleyin: kilit ekranında "Yürüyüş modu açık" kaydı ve sistemin mikrofon
   göstergesi görünür. **Durdurmak için kilidi açmanız gerekmez** — kilit ekranındaki
   durdur/duraklat (ya da kulaklık düğmesi) turu bitirir; uygulama içinden de
   durdurulabilir.
6. **Hesap silme:** Profil › Ayarlar › Hesap › Hesabı sil (5.1.1(v)). Test hesabını
   silmeyin; ayrı bir hesapla deneyin.

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
4. **Private Email Relay:** giden posta Resend üzerinden `noreply@lernomi.app`
   adresinden çıkıyor. Bu alan adı Developer portalında *Sign in with Apple ›
   Email Sources*'a kaydedilmezse (Apple ayrıca SPF ister)
   `@privaterelay.appleid.com` adreslerine giden hiçbir posta ulaşmaz — parola
   sıfırlama dâhil.

Web akışı (Services ID + .p8 client secret) **kurulmadı**; uygulama yalnız native yolu
kullanıyor ve o yolda secret gerekmiyor. Web'de Apple ile Giriş sunulmuyor — 4.8 App
Store uygulaması için işliyor.

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
- `src/lib/legal.ts` › `LEGAL_PLATFORMS.ios` — §6 kapıları geçilmeden **açılmaz**;
  açılırken `LEGAL_VERSION` artar ve `LEGAL_CHANGELOG`'a kayıt düşer.
