# App Store hazırlığı (Lernomi, iOS)

Bu klasör `docs/play/`in iOS karşılığıdır. **İkisi ayrı beyanlardır**: Play'in Veri
Güvenliği formu ile App Store Connect'in gizlilik etiketleri farklı sorular sorar ve
farklı yerlerde yayımlanır. Birini doldurup öbürünü kopyalamak, iki mağazada çelişen
beyan bırakır.

Klasörde üç belge var, `docs/play/`in üçüne karşılık geliyor:

| Burada | Play karşılığı | Ne tutuyor |
|---|---|---|
| `README.md` (bu dosya) | `data-safety.md` | Durum, yayın kapıları, gizlilik beyanı |
| `connect.md` | `console.md` | İnceleme hesabı, giriş sağlayıcılarının kurulumu, yayın öncesi kontrol |
| `listing.md` | `listing.md` | Yaş derecelendirmesi ve mağaza vitrini (üç dilde metinler, görseller) |

## Durum (2026-09-23)

iOS **yayında değil**; App Store Connect kaydı ve TestFlight hazır. Ayrım önemli çünkü
belgenin geri kalanındaki her "DOĞRULANMADI" notunun anlamı buna bağlı:

| | Durum |
|---|---|
| **Derleniyor mu** | ✅ Evet. CI (`.github/workflows/ios-build.yml`, macos-15) ve 2026-09-22'den beri yerel Mac mini (Xcode). |
| **Mağazaya yüklendi mi** | ✅ App Store Connect'te uygulama kaydı (`6810593275`) ve TestFlight'ta build 2, 3, 4 (`VALID`); sürüm kaydına henüz build bağlı değil (denetim IOS-1). Android: Play dahili test kanalında `1.0.0 (4)`. |
| **Cihazda koşuldu mu** | Bu belgede kayıtlı bir cihaz koşusu yok. Mikrofon, konuşma tanıma, arka planda ses, kilit ekranı denetimi, haptik ve satın alma yalnız gerçek cihazda (TestFlight) ölçülebiliyor; liste `docs/plan/ios-device-runbook.md`'de. |

Yani bugünkü doğru cümle: **derlendi ve TestFlight'ta; cihaz koşusu bu belgede
kayıtlı değil.** Geliştirme makinesi 2026-09-22'de Linux'tan Mac mini'ye geçti.

> Aşağıdaki tek tek maddelerde geçen "(derlenmedi)" ve "bu makinede Xcode yok"
> notları eskidir (Linux dönemi) — hepsi **derlendi**; cihaz sonucu olarak
> yazılmış bir şey yoksa cihazda doğrulandığı da varsayılmamalı.

Bugün kapanan boşluklar (hepsi DOĞRULANMADI): şablon bundle kimliği `app.lernomi.ios`
oldu ve sürüm Android'le eşitlendi, `.lproj` dosyaları hedefe bağlandı, uygulama ikonu
ve markalı açılış ekranı geldi, Apple ile Giriş kuruldu, Google girişi iOS'ta
kurulabilir hâle getirildi. Açık kalanlar aşağıdaki tabloda.

Hukuki metinler iOS'u **kapsıyor** (2026-09-14, sürüm **1.1**; güncel sürüm **1.5**, 2026-09-23): `src/lib/legal/index.ts`
içindeki `LEGAL_PLATFORMS.ios` `true`. Bayrak açıkken şunlar basılıyor:

- şartlarda "13a. Apple App Store için ek koşullar" (Apple'ın özel EULA için istediği
  asgari maddeler: taraflar, lisans kapsamı, bakım, garanti, talepler, fikri mülkiyet,
  ihracat beyanı, iletişim, üçüncü taraf şartları, **Apple'ın üçüncü taraf lehtar** olması),
- satın alma / iptal / iade maddelerinin Apple yolu (Ayarlar › Apple Hesabı › Abonelikler,
  reportaproblem.apple.com); destek sayfasında da aynısı,
- gizlilik politikasında platform sayımı ve alıcılar tablosuna **Apple (App Store)** satırı.

**Neden yayından önce açıldı.** Eski plan bayrağı App Store'daki yayın günü açmaktı. App
Review ise gönderimde Privacy Policy URL'sini, şartları ve Support URL'yi okuyor; yalnız
Android'i sayan bir metin iOS uygulamasının metni sayılmıyor (5.1.1(i), 3.1.2). Bir metnin
bir uygulamayı kapsaması "yayında" demek değil ve 1.1 kaydı bunu iddia etmiyor. Yayın günü
için hazır bekleyen `IOS_LAUNCH_ENTRY` tam olarak "App Store'da yayımlandı" dediği için
kullanılmadı ve silindi.

> **NUMARA NEDEN 1.1.** Sürüm geçmişi 2026-09-09'da sıfırlandı: numara geliştirme
> sırasında 1.1'den 1.3.1'e yürümüştü ama o kayıtların anlattığı değişikliklerin çoğu
> henüz yayında olmayan özelliklerin maddeleriydi ve kimsenin kabul ettiği bir sürüm
> değişmemişti (kabul edilen sürüm hiçbir yerde saklanmıyor). 1.1 metne gerçekten yeni
> hükümler eklediği için ikinci basamağı aldı: iOS kapsamı, yapay zekâ ve ses için açık
> rıza, bildirim jetonu, mikrofonun gerçek kapsamı. Gerekçenin tamamı
> `src/lib/legal/index.ts`'in sürüm notunda.

**Apple (Sign-In)** satırı artık bayraktan **bağımsız**: Apple ile giriş web'de ve Android'de
de açık (`/api/config` → `"apple":true,"appleWeb":true`), yani bu alıcı iOS'a özgü değil.
Şartların "üçüncü taraf hizmetleri" maddesi (7b) de Apple ile girişi koşulsuz sayıyor.

> **Panel üstyazımı.** Üretimde `app_settings["legal.config"]` satırı oluşursa oradaki
> `platforms.ios` kodun önüne geçer. 2026-09-14'te satır yok (salt okuma ile ölçüldü);
> ayrıntı `LEGAL_PLATFORMS` notunda.

## iOS yayınından önce bitmesi gereken iş

| # | İş | Neden |
|---|---|---|
| 1 | ~~Apple Developer Program hesabı~~ → **açık** (ASC kaydı `6810593275`, TestFlight build 4) | Bundle kimliği, sertifika, App Store Connect kaydı bunsuz yok |
| 2 | ~~Gerçek bundle kimliği~~ → `app.lernomi.ios` **yazıldı** (derlendi, cihazda denenmedi) | Şablon kimliğiyle yükleme kabul edilmez |
| 3 | ~~**Apple ile Giriş**~~ → **kod, yetki ve sunucu değerleri yerinde** (`/api/config` → `apple:true`); cihazda doğrulama runbook'ta | Google ile giriş sunulduğu için App Store Review Guidelines 4.8 istiyor. Metin işi değil, ürün işi. Ayrıntı aşağıda; kalan iki değer madde 10-11'de |
| 4 | ~~Uygulama içi hesap silme~~ → **iki eksik kapandı** (2026-09-05, derlendi, cihazda denenmedi) · açık kalan: **cihazda doğrulama** | 5.1.1(v). Ekran zaten vardı ama iki yerde iOS'ta tıkanıyordu; ayrıntı aşağıda "Hesap silme" başlığında |
| 5 | Gizlilik etiketleri | Aşağıdaki tablo App Store Connect'e girilir; 2026-09-23'te Diagnostics satırları eklendi, Connect formu ve `PrivacyInfo.xcprivacy` buna göre güncellenmeli |
| 6 | Yaş derecelendirmesi | Anket cevapları ve iki mağazanın neden farklı çıkacağı **yazıldı** (`listing.md` §2); Connect'te form doldurulup hesaplanan derece geri yazılacak |
| 7 | Arka plan sesinin CİHAZDA doğrulanması | Ekran kapalıyken yürüyüş modu kararı verildi, kod yazıldı ve derleniyor; TestFlight build'iyle cihazda denenecek (aşağıya bak) |
| 8 | ~~`.lproj` dosyalarının Xcode hedefine eklenmesi~~ → **bağlandı** (derlendi, cihazda denenmedi) | Dosyalar yazılmıştı ama `project.pbxproj`'da kayıtlı değildi, yani derlemeye girmiyordu |
| 9 | ~~Uygulama ikonu~~ → **üretildi** (Xcode'da görülmedi) | İkonsuz yükleme reddedilir |
| 10 | ~~Sign in with Apple yetkisi (entitlements)~~ → **eklendi** (`d72da43`, imzalanmadı) · ~~`APPLE_BUNDLE_ID` değeri~~ → **sunucuda dolu** (2026-09-14: canlı `/api/config` → `"apple":true,"appleWeb":true`) | Yetki dosyası ve `CODE_SIGN_ENTITLEMENTS` yerinde; App ID'de "Sign in with Apple" işaretlenmesi portal işi. iOS'ta cihazda henüz denenmedi |
| 11 | ~~`CFBundleURLTypes`~~ → **eklendi** · ~~Google Console'da iOS istemcisi~~ → **açıldı ve yazıldı** (`googleAuth.ts` › `IOS_CLIENT_ID` dolu) | Kodda yapılacak iş kalmadı: iki yazım (`googleAuth.ts` › `IOS_CLIENT_ID` ve Info.plist'teki tersi) tek komutla yazılıyor — `npm run google:ios -- <kimlik>`; yarım kurulum, yanlış biçim ve yanlış proje reddediliyor, kapı CI'da. Console adımları `docs/appstore/connect.md` §2.2. İkisi boşken düğme iOS'ta çizilmiyor |
| 12 | Mağaza vitrini (ad, altyazı, anahtar kelime, açıklama, görseller) | Üç dilde metinler **yazıldı** (`listing.md` §3); görseller cihazdan çekilecek, 6.9" iPhone ve 13" iPad zorunlu — kare betiği ikisini de üretiyor (aşağıda "Cihaz ailesi") |
| 13 | ~~Cihaz ailesi kararı~~ → **iPhone + iPad, beyan sabitlendi** (2026-09-05) | Aşağıda |

## Ekran kapalıyken yürüyüş modu (arka planda ses)

**Karar:** iOS'ta da ekran kapalıyken çalışacak. Android'de bunu mikrofon tipli ön plan
servisi yapıyor; iOS'ta böyle bir şey yok — uygulamayı ekran kapalıyken ayakta tutan tek
şey **etkin bir ses oturumu** ve `UIBackgroundModes = audio`.

Yapılanlar:

- `Info.plist` → `UIBackgroundModes: [audio]`.
- `LernomiSpeech.swift` → `startWalkService` / `stopWalkService`. Metot adları Android'le
  birebir aynı; JS (`lib/stt.ts`) bunları zaten çağırıyordu ve iOS'ta sessizce boşa
  düşüyordu, **JS değişmedi**. Oturum tur boyunca açık tutuluyor.
- Kelime başına yapılan temizlik artık tur oturumunu kapatmıyor; kapatsaydı ekran
  kapalıyken bir sonraki kelimeye geçilemezdi.
- **Kesinti toparlanması (2026-09-05).** Gelen çağrı, alarm ya da Siri oturumu iOS'a
  devrediyor ve sistem onu kendiliğinden geri vermiyor; `interruptionNotification`
  dinleniyor, `.ended` + `.shouldResume` gelince oturum yeniden etkinleştirilip Now
  Playing kaydı yeniden yazılıyor. `.shouldResume` yoksa tur kesilmiyor ama arka plan
  yolunun kalmadığı JS'e bildiriliyor (`LernomiWalkServiceFailed`) ve ekranda uyarı
  çiziliyor. `mediaServicesWereReset` de dinleniyor: ses yığını çökerse oturum, kayıt
  ve uzaktan komutlar birlikte yeniden kuruluyor.
- **Kulaklık (2026-09-05).** Kategori seçeneklerine `.allowBluetooth` ve
  `.allowBluetoothA2DP` eklendi. Bunlar olmadan AirPods takılıyken bile GİRİŞ dahili
  mikrofonda kalıyordu — yani cepteki telefonun mikrofonunda, ki yürüyüş modunun en
  yaygın kullanımı tam olarak bu.
- **Kilit ekranı denetimi (2026-09-05).** `MPNowPlayingInfoCenter.playbackState`
  açıkça `.playing` yazılıyor. Uygulama gerçek bir oynatıcı olmadığı için bu
  yazılmadan denetim bazı cihazlarda hiç çizilmiyor ve "her an durdurulabilir"
  iddiası incelemede karşılıksız kalıyordu.
- `startWalkService` yeniden çağrılmaya dayanıklı (kesinti sonrası aynı yola düşüyor).

**Cihazda doğrulandığı kayıtlı değil.** Kod CI'da ve Mac mini'de derleniyor, TestFlight'ta; aşağıdakiler yalnız gerçek cihazda ölçülebilir.
Cihazda sınanacak beş şey: (1) ekran kilitlendikten sonra tur devam ediyor mu,
(2) kelimeler arası boşlukta uygulama askıya alınıyor mu, (3) kilit ekranında mikrofon
göstergesi ve Now Playing denetimi görünüyor mu, (4) telefon çağrısı gelip bittiğinde
oturum toparlanıyor mu, (5) AirPods takılıyken giriş kulaklık mikrofonuna geçiyor mu.

**İnceleme riski:** arka planda mikrofon isteyen bir uygulama App Review'da en çok
sorgulanan şeydir ve inceleyenin ilk sorusu "kullanıcı bunu nasıl durduruyor" olur. Üç
cevabın üçü de artık kodda karşılığı olan cümleler ve App Review Information alanına
açıkça yazılmalı:

1. **Modu kullanıcı başlatır** — mikrofon açıklama ekranı + sistem izni olmadan tur başlamıyor.
2. **Sürdüğü görünür** — kilit ekranında Now Playing kaydı duruyor ("Yürüyüş modu açık /
   Mikrofon dinliyor; söylediklerin tanıma için sunucuya gönderiliyor", cihaz dilinde) ve
   sistemin mikrofon göstergesi açık kalıyor.
3. **Her an durdurulabilir** — uygulamanın içinden ya da **kilit ekranından**: durdur,
   duraklat ve çal/durdur komutlarının üçü de turu bitiriyor, kulaklık düğmesi dahil
   (`55411a3`). Android'deki kalıcı bildirimdeki "Durdur"un karşılığı bu; §6'daki açık
   ürün kararı böyle kapandı.

Video eklemek yine en hızlı çözen yol. Bu üç madde + "ses sunucuda tanınır, saklanmaz,
izin ekranı sağlayıcıları adıyla gösterir" İngilizce not metni olarak `connect.md` §1'in
7. adımında hazır (2026-09-23); canlıdaki not hâlâ eski ve mikrofonu "yalnız telaffuz
puanı için" diye anlatıyor (denetim LEG-6) — Connect'te güncellenmesi Samet'in işi.


## Apple ile Giriş (Şerit A — 2026-09-04)

**Yapıldı.** Kod yazıldı ve derleniyor (CI + Mac mini, TestFlight build'lerinde). Aşağıdaki
"Doğrulanmadı" listesinin 2. ve 3. maddeleri 2026-09-23 itibarıyla kapandı.

Guidelines 4.8 üçüncü taraf girişi sunan uygulamadan Apple ile Giriş'i de istiyor;
Google sunulduğu için bu bir yayın engeliydi. Kurulan yol Google'ınkinin birebir eşi:
sistem ekranı → `identityToken` → better-auth `sign-in/social`. WebView yok.

- Sunucu (`src/lib/auth/server.ts`): better-auth `apple` sağlayıcısı. **Yalnız native
  idToken akışı** açıldı — web/OAuth yönlendirme akışı bir Services ID ve .p8'den
  üretilen, **en çok 6 ay geçerli** bir client secret ister; süresi dolduğunda giriş
  kimse fark etmeden kırılır. Native yolda secret hiç okunmuyor: token Apple'ın açık
  anahtarıyla doğrulanıyor, beklenen `aud` = uygulamanın bundle kimliği.
- Sağlayıcıyı açan tek env anahtarı **`APPLE_BUNDLE_ID`** (üç env dosyasına da aynı
  yerde eklendi, üçünde de boş). Boşken sağlayıcı hiç kurulmuyor, `/api/config`
  `apple: false` diyor ve düğme çizilmiyor — yani **Android'de ve web'de hiçbir şey
  değişmedi.**
- Mobil (`mobile/src/lib/appleAuth.ts`): düğme iki kapıdan geçiyor — sunucu açık
  diyecek ve `appleAuth.isSupported` (iOS 13+) true olacak. Apple düğmesi listede
  Google'ın **üstünde**; Apple'ın kendi yönergesi bunu istiyor.
- **Ad tek seferlik:** Apple kişinin adını yalnız İLK yetkilendirmede ve id token'ın
  DIŞINDA veriyor. Kaçırılırsa kullanıcı `xxxx@privaterelay.appleid.com` adıyla kalır
  (ve o ad sıralamada başkalarına görünür). Bu yüzden giriş başarılı olur olmaz ad
  `update-user` ucuna yazılıyor.
- **`emailVerified` düzeltildi:** better-auth'un apple sağlayıcısı kullanıcıyı her
  zaman `emailVerified: false` ile kuruyor. Bu hâliyle (1) ilk girişte Apple'ın gizli
  aktarma adresine bir doğrulama e-postası gidiyor — gönderen alan adı Apple'da
  kayıtlı değilse **teslim edilmez**, (2) aynı e-postayla hesabı olan kullanıcı
  "account not linked" ile kendi hesabına giremiyor. Apple `email_verified` iddiasını
  imzalı token'ın içinde gönderdiği için `mapProfileToUser` ile o okunuyor.

**Nonce göndermiyoruz, bilerek.** Kütüphane isteğe koyduğu nonce'u SHA-256'layıp
Apple'a özeti yolluyor, JS'e ham değeri döndürüyor; better-auth ise gönderdiğimiz
dizgiyi token'daki iddiayla düz karşılaştırıyor. Tutması için sunucuya **özeti**
yollamak gerekir, bu da RN tarafında yeni bir kripto bağımlılığı ya da elle yazılmış
SHA-256 demek — yanlış hesaplanırsa giriş %100 kırılır ve burada denenemez. Token yine
tam doğrulanıyor (Apple imzası, `iss`, `aud`) ve bugünkü Google
native akışında da nonce yok. Açılacaksa: ham nonce üret → `performRequest({ nonce })`
→ sunucuya SHA-256'nın küçük harf hex'i. **Cihazda doğrulanmadan açılmamalı.**

**Sunucu tarafı canlı sınandı** (yerel `next dev` + curl; cihaz değil):
`/api/config` `APPLE_BUNDLE_ID` doluyken `apple:true`, boşken `apple:false` dönüyor —
kapı çalışıyor, Android ve web etkilenmiyor. Bozuk bir idToken 401 `INVALID_TOKEN` ile
reddediliyor; biçimi doğru ama imzasız bir token'da istek gerçekten Apple'ın JWKS ucuna
çıkıp bilinmeyen anahtarı reddediyor, yani doğrulama yolu uçtan uca bağlı. (İlk ölçümde
bozuk token 500 veriyordu — better-auth'un apple doğrulaması fırlatıyor, `false`
dönmüyor; yutuldu.) Gerçek bir Apple token'ı ile giriş **denenmedi**.

**Doğrulanmadı / bitmesi gerekenler:**

1. Apple Developer hesabında **Sign in with Apple** yetkisi (capability) açılacak ve
   `Lernomi.entitlements` derlemeye girecek — Şerit P'ye yazılı verildi
   (`docs/plan/ios-parity-A-teslim.md`). Yetki olmadan istek `1000`/`1004` ile düşer.
2. ~~`APPLE_BUNDLE_ID` üç env dosyasında da boş~~ → sunucuda dolu (canlı `/api/config`
   → `"apple":true,"appleWeb":true`).
3. ~~Hata metinlerinin i18n anahtarları~~ → `autherror.apple_failed` ve
   `autherror.no_apple_token` üç dilde sözlükte.
4. **Gizli aktarma adresi (Private Email Relay):** giden posta Resend üzerinden
   (SMTP ile, `smtp.resend.com`) `noreply@lernomi.app` adresinden çıkıyor.
   Gönderen kaydedilmezse `@privaterelay.appleid.com` adreslerine giden posta
   ULAŞMAZ — Apple onu geri döndürür (bounce), sessizce düşürmez. "E-postamı
   Gizle" seçen kullanıcının tek iletişim kanalı orası olduğu için parola
   sıfırlama da o hesapta çalışmaz.

   Yol (2026-09-09'da doğrulandı): **Certificates, Identifiers & Profiles →
   kenar çubuğunda `Services` → "Sign in with Apple for Email Communication" →
   `Configure`**. Oraya alan adı ya da tekil gönderen adresler yazılıyor;
   gerçek kişi hesabında en fazla 32 kaynak (kurumsalda 100).

   KAYDEDİLECEK ALAN ADI "`From:`" DEĞİL OLABİLİR. Apple iki yoldan biriyle
   doğruluyor: (a) **zarf göndericisinin** (MAIL FROM / Return-Path) alan adı
   kayıtlı ve SPF'ten geçiyor, ya da (b) **DKIM `d=`** değeri `From:` alan
   adıyla BİREBİR aynı ve kayıtlı. Resend'de DKIM alan adına imzalanır ama
   Return-Path çoğunlukla bir `send.` alt alan adında durur — yani kaydedilmesi
   gereken alan adı `lernomi.app` ile sınırlı olmayabilir. Doğrusu tahmin
   edilmez: hesap açılınca kendine bir test postası gönder, gelen iletinin ham
   başlıklarındaki `Return-Path:` ve `DKIM-Signature: d=` değerlerine bak, orada
   hangi alan adı yazıyorsa onu kaydet.

**Cihazda sınanacak:** §5.11'e ek olarak — (a) ilk girişte ad doğru yazılıyor mu,
(b) "E-postamı Gizle" seçilince oturum açılıyor mu, (c) aynı e-postayla zaten hesabı
olan kullanıcıda hesap birleşiyor mu, (d) Ayarlar'dan Apple izni geri alınınca
uygulama makul davranıyor mu.

## Cihaz ailesi: iPhone + iPad — 2026-09-05

Karar: uygulama **iki cihaz ailesinde de** satılıyor
(`TARGETED_DEVICE_FAMILY = "1,2"`, Info.plist'te iPad yönelimleri açık,
`UIRequiresFullScreen` yok, yani Split View çalışıyor).

Bu beyanın bedeli var ve bedeli ödenmeden bırakılırsa reddin bilinen yolu oluyor:
13" iPad ekran görüntüsü **zorunlu** hâle geliyor ve inceleyici uygulamayı iPad'de
açıp döndürüyor. Üç şey birbirine bağlandı:

- **Kare betiği** (`mobile/scripts/ios-screenshots.sh`) artık üç cihaz koşuyor:
  iPhone SE (en dar telefon — düzen orada kırılır), **iPhone 6.9"** ve **iPad 13"**;
  sonuncu ikisi mağazanın zorunlu tuttukları. 10.9" iPad listeden çıktı (mağaza
  istemiyor, 13" aynı düzeni daha geniş gösteriyor). Cihaz tipi runner'ın
  Xcode'unda yoksa iş düşmüyor, o cihaz atlanıyor ve günlükte görünüyor.
- **Beyan denetimi** (`npm run ios:check` › "cihaz ailesi") aileyi, iPad
  yönelimlerini, `UIRequiresFullScreen`in kapalı olduğunu ve kare betiğinde iki
  zorunlu cihazın bulunduğunu birlikte tutuyor — biri sessizce düşemiyor.
- **Düzen testi** (`mobile/__tests__/layout.test.ts`) içerik sütununun kırılımlarını
  gerçek genişliklerle sabitliyor: iPhone SE 375, 6.9" 440, iPad mini 744, iPad 820,
  iPad Pro 13" dikey 1024 ve yatay 1366, ayrıca Slide Over 320 ve Split View 678.
  Sütun hiçbir ekranda 720pt'yi aşmıyor (satır ölçüsü) ve ekran büyürken küçülmüyor.
  iPad'i bu makinede açmanın başka yolu yok; eşiklerin kaymadığını söyleyen tek şey bu.

**Doğrulanmadı:** düzenin iPad'de gerçekten iyi göründüğü. Test eşikleri sabitliyor,
kareler ise ancak Mac'te üretilebiliyor. Cihazda/simülatörde bakılacaklar: yatay
Beceriler ekranı, klavye açıkken yazma görevi, Split View'da alt sekmeler.

## Hesap silme (5.1.1(v)) — 2026-09-05

Ekran ve uç Android'den beri duruyordu (`DeleteAccountScreen`, Better Auth
`delete-user`), ama iOS'a özgü iki yerde tıkanıyordu. İkisi de kapatıldı; ikisi de
**derlendi ama cihazda denenmedi**.

**1. Apple ile giren kullanıcı hesabını silemiyordu.** Oturum 24 saatten eskiyse
Better Auth "taze giriş" istiyor; ekrandaki yeniden giriş düğmesi sabit **Google**
idi. Apple ile giren kullanıcının Google hesabı yok, dolayısıyla o düğme hiçbir
zaman geçmiyordu — yani iOS'ta sunulan iki giriş yolundan birinde silme tümüyle
kapalıydı. Artık sağlayıcı `list-accounts`tan okunuyor ve düğme Apple ya da Google
oluyor; hiçbiri yoksa (parola hesabı) zaten parola soruluyor.

**2. Apple tarafındaki izin iptal edilmiyordu.** 5.1.1(v) yalnız hesabın silinmesini
değil, Apple ile Giriş sunan uygulamalardan **Sign in with Apple REST API ile
token'ın iptal edilmesini** de istiyor. Edilmezse hesap bizde silinse bile Ayarlar ›
Apple Hesabı › Oturum Açma ve Güvenlik listesinde uygulama duruyor.

Native akış id token ile çalışıyor ve id token iptal EDİLEMİYOR; iptal edilebilen tek
şey authorization code'dan üretilen refresh token. Kurulan yol:

- Giriş biter bitmez `authorizationCode` `/api/account/apple-code`e gidiyor
  (`mobile/src/lib/appleAuth.ts`). Kod tek kullanımlık ve ~5 dakika yaşıyor.
- Sunucu onu refresh token'a çevirip `account.refreshToken`e yazıyor
  (`src/lib/account/apple-revoke.ts`).
- Silme anında `beforeDelete` önce iptali çağırıyor, sonra veriyi temizliyor — sıra
  önemli, `account` satırı silinince token okunamaz.
- İptalin başarısızlığı silmeyi **durdurmuyor**: Apple'ın ucu erişilemez diye hesap
  silinemez kalırsa 5.1.1(v) baştan ihlal edilir. Hata günlüğe düşüyor.

Client secret için `jose` eklenmedi; tek bir ES256 JWT'yi Node'un kendi crypto'su
imzalıyor. İncelik imza biçiminde: Node DER üretir, JWS ham `r||s` ister. Yanlışı
Apple'da yalnız "invalid_client" olarak görünür ve sebebi hiçbir yerde yazmaz — bu
yüzden `npm run test:apple` JWT'yi baştan sona doğruluyor (15 denetim, ağ ve
veritabanı gerektirmiyor, kendi anahtarını üretiyor). **Geçti.**

Yapılandırma dört env değerine bağlı (`APPLE_BUNDLE_ID`, `APPLE_TEAM_ID`,
`APPLE_KEY_ID`, `APPLE_PRIVATE_KEY`); üç env dosyasına da aynı yerde, boş olarak
eklendi. Boşken iptal adımı atlanıyor ve silme aynen tamamlanıyor — yani Android ve
web'de hiçbir şey değişmedi.

**Cihazda sınanacak:** (a) Apple ile giren kullanıcı eski oturumla silmeyi
tamamlayabiliyor mu, (b) silmeden sonra Apple'ın Ayarlar listesinden uygulama
düşüyor mu, (c) aynı Apple hesabıyla yeniden giriş temiz bir hesap açıyor mu.

## Gizlilik etiketleri (App Store Connect › App Privacy)

Play'in Veri Güvenliği beyanıyla (`docs/play/data-safety.md`) aynı gerçeği anlatır,
Apple'ın kategorileriyle. **Hiçbir veri türü izleme (tracking) için kullanılmıyor** —
reklam kimliği toplanmıyor, üçüncü taraf reklam, analitik ya da çökme raporlama SDK'sı
yok (Firebase Crashlytics 2026-09-23'te çıkarıldı; önceki build'lerde vardı ve hiçbir
beyanda yoktu, denetim LEG-1).

Dokuz tür var (2026-09-23'e kadar yedi) ve `mobile/ios/Lernomi/PrivacyInfo.xcprivacy` ile BİREBİR aynı olmak
zorunda; manifest pakette gidiyor ve Apple ikisini karşılaştırabiliyor. Device ID
2026-09-10'da eklendi: uzak bildirim o gün açıldı ve cihaz başına bir kayıt jetonu
saklanmaya başladı (`device_tokens`). Apple'ın örnekleri IDFA/IDFV olduğu için bu
tartışmalı bir kutu; Play'in tanımı Firebase installation ID'yi açıkça oraya yazdığı
için iki mağazanın aynı şeyi söylemesi tercih edildi.

| Apple kategorisi | Toplanıyor | Kimliğe bağlı | Amaç |
|---|---|---|---|
| Contact Info › Email Address | Evet | Evet | App Functionality |
| Contact Info › Name | Evet | Evet | App Functionality |
| User Content › Audio Data | **Hayır** (geçici işlenir, saklanmaz) | — | — |
| User Content › Other User Content (yazdığın ve söylediğin metinler) | Evet | Evet | App Functionality |
| Identifiers › User ID | Evet | Evet | App Functionality |
| Identifiers › Device ID (bildirim jetonu) | **Evet** | Evet | App Functionality |
| Usage Data › Product Interaction | Evet | Evet | Analytics (ayarlardan kapatılabilir) |
| Purchases › Purchase History | Evet | Evet | App Functionality |
| Diagnostics › Crash Data (anonim JS hata raporu: ileti, yığın izi) | **Evet** | **Hayır** | App Functionality |
| Diagnostics › Other Diagnostic Data (hata raporuna eşlik eden ekran adı, uygulama sürümü, platform) | **Evet** | **Hayır** | App Functionality |
| Location, Contacts, Health, Financial Info, Browsing History, Search History, Sensitive Info | Hayır | — | — |

**Diagnostics 2026-09-23'te Hayır'dan Evet'e döndü.** Web ve mobil JS hataları kendi
sunucumuza gidiyor (`/api/client-errors`; `src/lib/client-errors.ts`,
`mobile/src/lib/errorReport.ts`). Kullanıcı kimliği yazılmıyor, e-posta/jeton/uzun
sayılar sunucuda temizleniyor, kimseyle paylaşılmıyor — yani "Linked to identity: No".
Apple "collected" için üçüncü tarafı şart koşmuyor; birinci taraf sunucuda saklanan veri
de toplanmış sayılıyor. Native çökmeler yalnız Apple'ın kendi Organizer raporlarında.
**Açık iş (mobil):** `PrivacyInfo.xcprivacy`'ye `NSPrivacyCollectedDataTypeCrashData` ve
`NSPrivacyCollectedDataTypeOtherDiagnosticData` (Linked: false, Tracking: false, Purpose:
AppFunctionality) eklenmeli; Samet Connect › App Privacy'de aynı iki satırı işaretler.
FirebaseMessaging/Installations ve GoogleSignIn pod'larının kendi manifestolarının
beyan ettiği türler için Xcode › Archive › "Generate Privacy Report" çıktısıyla bir
karşılaştırma ayrıca yapılmalı (denetim LEG-13).

Bu tablo ile uygulama paketindeki `mobile/ios/Lernomi/PrivacyInfo.xcprivacy`
**birebir aynı olmak zorunda** — ayrışırsa inceleme takılır. 2026-09-04'te makine
tarafından karşılaştırıldı (o gün altı tür vardı): altı türün her birinde tür adı, "kimliğe bağlı" bayrağı,
amaç listesi ve `tracking=false` örtüşüyor; belgede "Hayır" yazan hiçbir tür
manifestoda yok, manifestoda belgede olmayan tür yok, `NSPrivacyTracking` de false.
Bu tabloya satır eklenirse manifesto da aynı commit'te değişmeli.

Bugün eklenen Apple girişi paketi (`@invertase/react-native-apple-authentication`)
`NSPrivacyAccessedAPITypes`'a bir şey eklemiyor: kendi gizlilik manifestosu yok ama
"gerekçe isteyen" (required reason) API'lerin hiçbirini de kullanmıyor — kaynağında
`UserDefaults`, dosya zaman damgası, sistem açılış zamanı ya da disk alanı çağrısı
geçmiyor.

Ses için dikkat: Apple "toplanıyor" derken **cihazdan ayrılıp saklanmayı** kastediyor
(gerçek zamanlı işleme dışında). Ses sunucuya gidiyor ama Lernomi'de saklanmıyor;
sağlayıcı tarafında Speechmatics işi tanımadan sonra siliniyor ve Deepgram'da eğitim
katılımı kapalı (`mip_opt_out`) — ikisi sunucu tarafında `lib/stt`e bağlı (denetim
LEG-4). Bu koşullarla "collected" değil; ikisinden biri geri alınırsa bu satır "Evet"e
döner. Tanınan **metin** saklanıyor ve o User Content olarak beyan ediliyor.
Bu ayrım gizlilik politikası §3 ve §4 ile birebir aynı.

## İnceleme notları (App Review Information)

Uygulama hesapsız da kullanılabiliyor (misafir kimliği, 2026-09-15, mağaza ön inceleme B24);
hatırlatmalar (cihaz içi) ve rızayla tek bir yapay zekâ değerlendirmesi misafire açık; sosyal,
sonraki yapay zekâ değerlendirmeleri ve Premium satın alma hesap istiyor. `docs/appstore/connect.md`'deki
inceleme hesabı ve adımlar App Store Connect'e girilir; misafir yolu notların 2. adımında.
Gizlilik etiketinde misafir yeni bir veri türü açmıyor: misafirde toplanan her şey (rastgele
kullanıcı kimliği, öğrenme ve etkileşim verisi) hesapta da toplanıyor ve beyanlı (User ID,
Other User Content, Product Interaction); misafirde e-posta ve ad hiç toplanmıyor. Ek olarak açıklanması gereken:

- **Mikrofon ve arka plan sesi:** yürüyüş modu kullanıcı başlattığında mikrofonu açar;
  ekran kapalıyken ses tanınmak üzere sunucuya gider ve saklanmaz. Adım adım metin
  `connect.md` §1, 7. adım (kilit ekranında Now Playing + mikrofon göstergesi, kilit
  ekranından durdurma, sağlayıcılar izin ekranında adıyla).
- **Satın alma:** Premium'lu inceleme hesabı paywall'u göremez; notta ikinci, Premium'suz
  bir demo hesap ve hesap şartının gerekçesi (hesaba bağlı, platformlar arası abonelik)
  var (`connect.md` §1).
- **Yapay zekâ içeriği:** rol yapma bir dil modeliyle üretiliyor; uygulamada "gerçek kişi
  değil" bildirimi ekranda kalıcı ve her yanıtın altında "Bildir" var (Guidelines 1.2 ve
  üretken içerik beklentileri).
- **Kullanıcı içeriği (Guidelines 1.2):** dördü de var — görünen ad ve kullanıcı adı
  moderasyondan geçiyor (filtreleme; biyografi 2026-09-16'da kaldırıldı), her yapay zekâ yanıtının altında ve
  profillerde **Bildir**, profillerde **Engelle**, ve **yayımlanmış iletişim bilgisi**
  olarak `https://www.lernomi.app/support`. Özel mesajlaşma yok. Şartlar §4/§5 1.5'ten
  beri "sıfır tolerans, bildirimler 24 saat içinde incelenir, bildirene sonuç iletilir"
  diyor.

  Dördüncüsü 2026-09-09'a kadar EKSİKTİ: destek adresi yalnız gizlilik politikası ve
  şartların içinde geçiyordu, Support URL alanı ise ana sayfayı gösteriyordu ve ana
  sayfada iletişim bilgisi yoktu. Sayfa artık ayrı (`/support`, üç dilde), ana sayfanın
  alt şeridinden, hukuki sayfaların gezinme şeridinden ve **uygulama içinde** Profil ›
  Ayarlar › Destek ve iletişim satırından açılıyor — 1.2 "yayımlanmış" derken
  uygulamadan ulaşılabilir olmasını da kastediyor.

## Not

Vergi tarafı iOS'ta da aynı: GVK mükerrer m.20/B istisnası "elektronik uygulama paylaşım
ve satış platformları" diyor, App Store da bunun içinde. Yayıncı Türkiye'de yerleşik
gerçek kişi olmaya devam ediyor (bkz. `src/lib/legal/index.ts` kimlik notu).
