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

## Durum (2026-09-09)

iOS **yayında değil**, ama artık "derlenmemiş kod" da değil. Ayrım önemli çünkü
belgenin geri kalanındaki her "DOĞRULANMADI" notunun anlamı buna bağlı:

| | Durum |
|---|---|
| **Derleniyor mu** | ✅ Evet. `.github/workflows/ios-build.yml` macos-15'te Release yapılandırmasıyla derliyor, `pod install` çözülüyor, UI test hedefi üretiliyor ve dokuz akış karesi iniyor (koşu `33920804380`). |
| **Cihazda koşuldu mu** | ❌ Hayır. Mikrofon, konuşma tanıma, arka planda ses, kilit ekranı denetimi, haptik ve satın alma yalnız gerçek cihazda ölçülebiliyor. |

Yani bugünkü doğru cümle: **derlendi, cihazda koşulmadı.** Geliştirme makinesi hâlâ
Linux; derlemeyi yapan CI'daki macOS koşucusu. Cihazda sınanacakların listesi
`docs/plan/ios-device-runbook.md`'de.

> Bu bölüm 4 Eylül'de yazıldı ve "bir satır kodu bile derlenmedi" diyordu. O gün
> doğruydu; iş akışı 5 Eylül'de kurulunca yanlış oldu ve gereğinden karamsar bir
> tablo çizmeye devam etti. Aşağıdaki tek tek maddelerde geçen "(derlenmedi)"
> notları da aynı sebeple eskidir — hepsi **derlendi**, hiçbiri **cihazda
> koşulmadı**.

Bugün kapanan boşluklar (hepsi DOĞRULANMADI): şablon bundle kimliği `app.lernomi.ios`
oldu ve sürüm Android'le eşitlendi, `.lproj` dosyaları hedefe bağlandı, uygulama ikonu
ve markalı açılış ekranı geldi, Apple ile Giriş kuruldu, Google girişi iOS'ta
kurulabilir hâle getirildi. Açık kalanlar aşağıdaki tabloda.

Hukuki metinler iOS için **hazır yazıldı ama kapalı**: `src/lib/legal.ts` içindeki
`LEGAL_PLATFORMS.ios` `false`. Açıldığında şunlar kendiliğinden devreye giriyor:

- şartlarda "13a. Apple App Store için ek koşullar" (Apple'ın özel EULA için istediği
  asgari maddeler: taraflar, lisans kapsamı, bakım, garanti, talepler, fikri mülkiyet,
  ihracat beyanı, iletişim, üçüncü taraf şartları, **Apple'ın üçüncü taraf lehtar** olması),
- satın alma / iptal / iade maddelerinin Apple yolu (Ayarlar › Apple Hesabı › Abonelikler,
  reportaproblem.apple.com),
- gizlilik politikasında platform sayımı ve alıcılar tablosuna **Apple (App Store)** satırı.

Bayrağı açmadan önce `LEGAL_VERSION` artırılmalı ve `LEGAL_CHANGELOG`'a kayıt
düşülmeli. **Kayıt hazır:** `legal.ts` içindeki `IOS_LAUNCH_ENTRY` sürüm **1.4**'ün
"ne değişti" metnini üç dilde tutuyor ve bayrak kapalıyken listeye hiç girmiyor. O gün
yapılacak iş bu dosyada üç satır: bayrak `true`, `LEGAL_VERSION` `"1.4"`,
`LEGAL_EFFECTIVE_DATE` yayın günü.

> **1.3 DEĞİL, 1.4.** "1.3" önce iOS'a ayrılmıştı ama 2026-09-08'de abonelik
> maddesine verildi (fiyat değişikliği ve hediye süre hükümleri) ve yürürlüğe girdi.
> Bu belge bir süre eski numarayı söyledi; harfiyen izlenseydi sürüm geçmişinde iki
> ayrı 1.3 kaydı oluşurdu. Kod doğru: `IOS_LAUNCH_ENTRY.version` zaten `"1.4"`.

Alıcılar tablosundaki **Apple (Sign-In)** ve **Apple (App Store)** satırları da aynı
bayrağın arkasında hazır bekliyor.

Bu dosyanın dışında kalan tek metin işi: şartların "üçüncü taraf hizmetleri" maddesi
(`src/app/terms/page.tsx` ve `src/content/legal/terms-{en,de}.tsx`) giriş sağlayıcısı
olarak yalnız Google'ı sayıyor. iOS'ta Apple ile Giriş de sunulduğu için oraya
`hasIos()` koşullu bir "Apple ile Giriş" eklenmeli — 1.4 kaydı bunu anlattığı için
bayrak açılmadan önce yapılmalı.

## Bayrak açılmadan bitmesi gereken iş

| # | İş | Neden |
|---|---|---|
| 1 | Apple Developer Program hesabı | Bundle kimliği, sertifika, App Store Connect kaydı bunsuz yok |
| 2 | ~~Gerçek bundle kimliği~~ → `app.lernomi.ios` **yazıldı** (derlendi, cihazda denenmedi) | Şablon kimliğiyle yükleme kabul edilmez |
| 3 | ~~**Apple ile Giriş**~~ → **kod ve yetki yazıldı**, Apple Developer hesabı bekliyor | Google ile giriş sunulduğu için App Store Review Guidelines 4.8 istiyor. Metin işi değil, ürün işi. Ayrıntı aşağıda; kalan iki değer madde 10-11'de |
| 4 | ~~Uygulama içi hesap silme~~ → **iki eksik kapandı** (2026-09-05, derlendi, cihazda denenmedi) · açık kalan: **cihazda doğrulama** | 5.1.1(v). Ekran zaten vardı ama iki yerde iOS'ta tıkanıyordu; ayrıntı aşağıda "Hesap silme" başlığında |
| 5 | Gizlilik etiketleri | Aşağıdaki tablo App Store Connect'e girilir |
| 6 | Yaş derecelendirmesi | Anket cevapları ve iki mağazanın neden farklı çıkacağı **yazıldı** (`listing.md` §2); Connect'te form doldurulup hesaplanan derece geri yazılacak |
| 7 | Arka plan sesinin CİHAZDA doğrulanması | Ekran kapalıyken yürüyüş modu kararı verildi ve kod yazıldı, ama macOS/Xcode olmadan derlenip denenemedi (aşağıya bak) |
| 8 | ~~`.lproj` dosyalarının Xcode hedefine eklenmesi~~ → **bağlandı** (derlendi, cihazda denenmedi) | Dosyalar yazılmıştı ama `project.pbxproj`'da kayıtlı değildi, yani derlemeye girmiyordu |
| 9 | ~~Uygulama ikonu~~ → **üretildi** (Xcode'da görülmedi) | İkonsuz yükleme reddedilir |
| 10 | ~~Sign in with Apple yetkisi (entitlements)~~ → **eklendi** (`d72da43`, imzalanmadı) · açık kalan: **`APPLE_BUNDLE_ID` değeri** | Yetki dosyası ve `CODE_SIGN_ENTITLEMENTS` yerinde; App ID'de "Sign in with Apple" işaretlenmesi portal işi. Env boşken sağlayıcı hiç kurulmaz, yani akış bugün kapalı |
| 11 | ~~`CFBundleURLTypes`~~ → **eklendi** (`d72da43`, yer tutucu değerle) · açık kalan: **Google Console'da iOS istemcisi açmak** | Kodda yapılacak iş kalmadı: iki yazım (`googleAuth.ts` › `IOS_CLIENT_ID` ve Info.plist'teki tersi) tek komutla yazılıyor — `npm run google:ios -- <kimlik>`; yarım kurulum, yanlış biçim ve yanlış proje reddediliyor, kapı CI'da. Console adımları `docs/appstore/connect.md` §2.2. İkisi boşken düğme iOS'ta çizilmiyor |
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

**Cihazda doğrulanmadı.** Kod CI'da (macos-15) derleniyor; aşağıdakiler yalnız gerçek cihazda ölçülebilir.
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

Video eklemek yine en hızlı çözen yol.


## Apple ile Giriş (Şerit A — 2026-09-04)

**Yapıldı.** Kod yazıldı, DERLENMEDİ (bu makinede Xcode yok).

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
2. `APPLE_BUNDLE_ID` üç env dosyasında da **boş**. Gerçek bundle kimliği (P4) belli
   olunca yerel ve sunucu `.env`'e yazılacak; `.env.example` placeholder kalır.
3. Hata metinlerinin i18n anahtarları (`autherror.apple_failed`,
   `autherror.no_apple_token`) Şerit T'ye verildi; sözlüğe girene kadar `t()` anahtarın
   kendisini basar.
4. **Gizli aktarma adresi (Private Email Relay):** giden posta artık Resend
   üzerinden `noreply@lernomi.app` adresinden çıkıyor. Bu alan adı Apple Developer
   → Sign in with Apple → *Email Sources*'a kaydedilmezse (alan adı + tekil
   gönderen adres, Apple ayrıca SPF ister) `@privaterelay.appleid.com`
   adreslerine giden hiçbir posta ulaşmaz — parola sıfırlama dâhil. "E-postamı
   Gizle" seçen kullanıcı için tek iletişim kanalı orası olduğundan, hesap
   açıldığında ilk yapılacaklardan.

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
reklam kimliği toplanmıyor, üçüncü taraf reklam ya da analitik SDK'sı yok.

| Apple kategorisi | Toplanıyor | Kimliğe bağlı | Amaç |
|---|---|---|---|
| Contact Info › Email Address | Evet | Evet | App Functionality |
| Contact Info › Name | Evet | Evet | App Functionality |
| User Content › Audio Data | **Hayır** (geçici işlenir, saklanmaz) | — | — |
| User Content › Other User Content (yazdığın ve söylediğin metinler) | Evet | Evet | App Functionality |
| Identifiers › User ID | Evet | Evet | App Functionality |
| Usage Data › Product Interaction | Evet | Evet | Analytics (ayarlardan kapatılabilir) |
| Purchases › Purchase History | Evet | Evet | App Functionality |
| Diagnostics | Hayır | — | — |
| Location, Contacts, Health, Financial Info, Browsing History, Search History, Sensitive Info | Hayır | — | — |

Bu tablo ile uygulama paketindeki `mobile/ios/Lernomi/PrivacyInfo.xcprivacy`
**birebir aynı olmak zorunda** — ayrışırsa inceleme takılır. 2026-09-04'te makine
tarafından karşılaştırıldı: altı türün her birinde tür adı, "kimliğe bağlı" bayrağı,
amaç listesi ve `tracking=false` örtüşüyor; belgede "Hayır" yazan hiçbir tür
manifestoda yok, manifestoda belgede olmayan tür yok, `NSPrivacyTracking` de false.
Bu tabloya satır eklenirse manifesto da aynı commit'te değişmeli.

Bugün eklenen Apple girişi paketi (`@invertase/react-native-apple-authentication`)
`NSPrivacyAccessedAPITypes`'a bir şey eklemiyor: kendi gizlilik manifestosu yok ama
"gerekçe isteyen" (required reason) API'lerin hiçbirini de kullanmıyor — kaynağında
`UserDefaults`, dosya zaman damgası, sistem açılış zamanı ya da disk alanı çağrısı
geçmiyor.

Ses için dikkat: Apple "toplanıyor" derken **cihazdan ayrılıp saklanmayı** kastediyor.
Ses sunucuya gidiyor ama tanıma biter bitmez siliniyor ve saklanmıyor; bu yüzden
"collected" değil. Tanınan **metin** saklanıyor ve o User Content olarak beyan ediliyor.
Bu ayrım gizlilik politikası §3 ve §4 ile birebir aynı.

## İnceleme notları (App Review Information)

Uygulamanın tamamı hesap gerektiriyor, misafir modu yok — `docs/play/console.md`'deki
inceleme hesabı ve adımlar App Store Connect'e de girilir. Ek olarak açıklanması gereken:

- **Mikrofon ve arka plan sesi:** yürüyüş modu kullanıcı başlattığında mikrofonu açar;
  ekran kapalıyken ses tanınmak üzere sunucuya gider ve saklanmaz. İnceleyen bunu
  görebilsin diye adım adım yazılmalı, aksi hâlde arka plan izni sorgulanır.
- **Yapay zekâ içeriği:** rol yapma bir dil modeliyle üretiliyor; uygulamada "gerçek kişi
  değil" bildirimi ekranda kalıcı ve her yanıtın altında "Bildir" var (Guidelines 1.2 ve
  üretken içerik beklentileri).
- **Kullanıcı içeriği:** görünen ad, kullanıcı adı ve biyografi moderasyondan geçiyor;
  engelleme ve bildirme var, özel mesajlaşma yok.

## Not

Vergi tarafı iOS'ta da aynı: GVK mükerrer m.20/B istisnası "elektronik uygulama paylaşım
ve satış platformları" diyor, App Store da bunun içinde. Yayıncı Türkiye'de yerleşik
gerçek kişi olmaya devam ediyor (bkz. `src/lib/legal.ts` kimlik notu).
