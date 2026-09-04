# Google Play Console — uygulama erişimi, giriş ve inceleme notları (Lernomi, `com.lernomi.learn`)

Uygulamanın tüm içeriği hesap gerektirir (misafir modu yok). Play incelemesi bu yüzden
test kimlik bilgisi ister; Google girişi de Play'in imzaladığı sürümde ancak doğru SHA-1
kayıtlıysa çalışır. Bu belge iki formu ve inceleme öncesi kontrolleri toplar.

## 1. App content › App access

Seçim: "All or some functionality is restricted" → "Add new instructions".

| Alan | Değer |
|---|---|
| Ad | Lernomi inceleme hesabı |
| Kullanıcı adı / e-posta | `[[TEST_HESABI_E_POSTA]]` |
| Parola | `[[TEST_HESABI_PAROLA]]` |
| Diğer bilgiler | Aşağıdaki adımlar |

Adımlar (Console'daki "Any other information" alanına):

1. Uygulamayı açın; onboarding'de "Devam et" ile ilerleyin, kurs olarak Almanca, seviye olarak "Sıfırdan", hedef olarak "Rahat" seçin.
2. Giriş ekranında "E-posta ile devam et" → yukarıdaki e-posta ve parola ile giriş yapın.
3. Bildirim izni ekranında "Belki sonra" seçilebilir.
4. Ana sekmeler: Öğren (günlük tur), Patika (dersler), Beceriler (okuma/dinleme/yazma alıştırmaları, yürüyüş modu).
5. Yürüyüş modu: Beceriler › Yürüyüş modu › Başla → mikrofon açıklama ekranı → "Kabul ediyorum, başla" → sistem mikrofon izni. Ekran kapatılınca mikrofon tipli ön plan servisi bildirimi görünür; X ile bitirilir.
6. Hesap silme: Profil › Ayarlar › Hesap › Hesabı sil (test hesabını silmeyin; ayrı bir hesapla deneyin).

Test hesabı: gerçek veritabanında `[[TEST_HESABI_E_POSTA]]` ile bir hesap açın, e-posta
doğrulamasını tamamlayın, seviyeyi A1 bırakın. Parolayı yalnız Console'a yazın; bu belgeye
yazmayın.

## 2. Google ile giriş — OAuth istemcileri

Google girişi native akışla çalışır (`@react-native-google-signin`): idToken'ın `aud`'u
Web istemci kimliğidir (`mobile/src/lib/googleAuth.ts`), Android istemcileri Google
Cloud'da paket adı + SHA-1 ile eşleşir. Play'den indirilen sürüm Play App Signing
anahtarıyla imzalandığı için o anahtarın SHA-1'i de kayıtlı olmalı; yoksa Google girişi
`DEVELOPER_ERROR` ile kapanır ve inceleyici "giriş çalışmıyor" yazar.

Google Cloud › APIs & Services › Credentials › Create credentials › OAuth client ID › Android:

| İstemci | Paket adı | SHA-1 kaynağı |
|---|---|---|
| Debug | `com.lernomi.learn` | `keytool -list -v -keystore mobile/android/app/debug.keystore -alias androiddebugkey -storepass android` |
| Upload | `com.lernomi.learn` | `keytool -list -v -keystore <upload.keystore> -alias lernomi` |
| Play App Signing | `com.lernomi.learn` | Console › Setup › App signing › "App signing key certificate" › SHA-1 |

Sunucu tarafı: `GOOGLE_CLIENT_ID` (Web istemci) ve `GOOGLE_CLIENT_SECRET` prod `.env`'de
dolu olmalı. Boşsa `/api/config` `providers.google=false` döner ve mobil giriş ekranı
Google düğmesini hiç göstermez (bozuk düğme yok); yalnız e-posta ile giriş kalır.

Doğrulama: internal testing track'e AAB yükleyin, Play'den indirin, Google ile giriş yapın.

## 3. İnceleme öncesi kontrol

- Onboarding, giriş ve ana ekranlar "yakında", "yapım aşamasında", "test" ya da yer tutucu içermiyor (E1).
- Hata durumlarında uydurma veri gösterilmiyor; yükleniyor / hata / boş durumları gerçek (E3).
- Mağaza görselleri gerçek cihazdan, premium özellikleri yalnız canlıysa gösteriyor (D1).
- `docs/play/data-safety.md` formu ve `/privacy` bağlantısı girildi (B1, B4).
- Foreground service beyanı ve videosu yüklendi (C1).
