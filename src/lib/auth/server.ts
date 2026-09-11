import "server-only";
import { headers } from "next/headers";
import { getLang } from "@/lib/i18n/server";
import { unstable_rethrow } from "next/navigation";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { user, session, account, verification, twoFactor as twoFactorTable } from "@/lib/db/auth-schema";
import { emailConfigured, sendEmail, verificationEmail, resetEmail, passwordChangedEmail, accountExistsEmail, twoFactorCodeEmail } from "@/lib/email";
import { purgeUserData } from "@/lib/account/purge";
import { revokeAppleSignIn } from "@/lib/account/apple-revoke";
import { appleClientSecret, appleRevokeConfigured } from "@/lib/auth/apple";
import { oneTimeToken } from "better-auth/plugins/one-time-token";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { checkPassword, MIN_PASSWORD_LENGTH, PASSWORD_ERROR_CODE } from "@/lib/auth/password-policy";
import { redisRateLimitStorage } from "@/lib/auth/rate-limit-store";
import { clearFailedLogins, isLockedOut, MAX_FAILED_LOGINS, noteFailedLogin } from "@/lib/auth/login-throttle";
import { captchaPlugins } from "@/lib/auth/captcha";
import { twoFactor } from "better-auth/plugins";
import { TWO_FACTOR_ALLOWED_ATTEMPTS, TWO_FACTOR_CODE_DIGITS, TWO_FACTOR_CODE_MINUTES, TWO_FACTOR_TRUST_DAYS } from "@/lib/auth/two-factor-config";

/**
 * Self-hosted Better Auth. Oturumlar/kullanıcılar KENDİ
 * Postgres'imizde. Uçlar aynı (`/api/auth/sign-in/email`, `sign-up/email`,
 * `get-session`, `sign-out`, `sign-in/social`, `request-password-reset`) →
 * web formları ve mobil uygulama değişmeden çalışır.
 *
 * Google sosyal giriş yalnız GOOGLE_CLIENT_ID/SECRET, Apple girişi yalnız
 * APPLE_BUNDLE_ID verilince açılır; yoksa e-posta/parola tek başına çalışır.
 * Parola sıfırlama e-postası şimdilik sunucu log'una düşer (SMTP/Resend
 * bağlanınca gerçek gönderim — bkz. sendResetPassword).
 */
export const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

/**
 * Apple ile Giriş. App Store Review Guidelines 4.8: üçüncü taraf girişi (bizde
 * Google) sunan uygulama Apple ile Giriş'i de sunmak zorunda — yayın engeli.
 * Yalnız iOS uygulamasında görünür; /api/config kapalı derse düğme hiç çizilmez,
 * yani web ve Android'de HİÇBİR ŞEY değişmez.
 *
 * YALNIZ NATIVE idToken AKIŞI açık, web/OAuth yönlendirme akışı değil. Web akışı
 * bir Services ID ve .p8 anahtarından üretilen bir client secret istiyor; o secret
 * en çok 6 ay geçerli ve süresi dolduğunda giriş kimse fark etmeden kırılıyor.
 * iOS uygulaması Apple'ın kendi ekranını açıp sunucuya doğrudan idToken
 * gönderiyor ve bu yolda secret HİÇ okunmuyor: better-auth token'ı Apple'ın açık
 * anahtarıyla (appleid.apple.com/auth/keys) doğruluyor. Google'ın native akışıyla
 * aynı desen (bkz. signInGoogleNative).
 *
 * Native token'ın `aud`'u uygulamanın BUNDLE KİMLİĞİ olur (Services ID değil),
 * doğrulama da ona bakar — bu yüzden sağlayıcıyı açan tek anahtar bundle kimliği.
 */
export const appleConfigured = Boolean(process.env.APPLE_BUNDLE_ID);

/**
 * Services ID — Apple girişinin WEB/TARAYICI akışının kimliği.
 *
 * Native akış (iOS) bundle kimliğiyle çalışıyor ve client secret hiç
 * istemiyor. Tarayıcı akışı ise Apple'ın OAuth ucundan geçiyor ve orada iki
 * şey şart: ayrı bir Services ID ve .p8 anahtarıyla imzalanmış bir client
 * secret. Bu yüzden webde ve Android'de Apple düğmesi ancak burası doluyken
 * anlamlı — yoksa düğme kullanıcıyı Apple'ın hata sayfasına götürürdü.
 *
 * Services ID Apple Developer › Identifiers'ta ayrı bir kayıt: birincil App
 * ID olarak `app.lernomi.ios` seçilir, alan adı doğrulanır ve dönüş adresi
 * `https://www.lernomi.app/api/auth/callback/apple` yazılır.
 */
export const appleServicesId = (process.env.APPLE_SERVICES_ID ?? "").trim();

/**
 * Web akışı açılabilir mi. Services ID tek başına yetmiyor: client secret
 * takım kimliği, anahtar kimliği ve .p8 istiyor — iptal (revoke) yolunun
 * aradığı üçlünün aynısı.
 */
export const appleWebConfigured = Boolean(appleServicesId) && appleRevokeConfigured();

/*
 * BURADA ESKİDEN bir `appleDefaults` vardı: apple sağlayıcısı ikinci kez kurulup
 * yalnız `verifyIdToken`'ı ödünç alınıyor, fırlattığı hata yutulup `false`a
 * çevriliyordu. Sebebi, bozuk bir token'da doğrulamanın `false` dönmeyip
 * fırlatması ve kimlik istemeyen ucun 500 vermesiydi (ölçülmüştü: aynı çöp dizgi
 * google'da 401, apple'da 500 + SERVER_ERROR).
 *
 * better-auth 1.7.x'te gerek kalmadı: doğrulama tek bir yere taşındı
 * (`verifyProviderIdToken`) ve o işlev BAŞTAN SONA try/catch içinde — her hata
 * `false` dönüyor, yani "kapalıya düşen" davranış artık kütüphanenin kendi
 * sözleşmesi. Sarmalayıcı kaldırıldı; sağlayıcı kendi `idToken` yapılandırmasıyla
 * (jwks, iss, aud, yaş sınırı, nonce) doğruluyor.
 */
export const authEnabled = Boolean(process.env.DATABASE_URL && process.env.BETTER_AUTH_SECRET);

const BASE_URL = process.env.BETTER_AUTH_URL ?? "https://www.lernomi.app";

export const auth = betterAuth({
  appName: "Lernomi",
  // Yer tutucu yalnız derleme içindir: `authEnabled` false iken /api/auth 503
  // döner ve readSession oturum okumaz (bkz. app/api/auth/[...path]/route.ts).
  secret: process.env.BETTER_AUTH_SECRET ?? "build-time-placeholder-secret-change-me",
  baseURL: BASE_URL,
  basePath: "/api/auth",
  // Eski alan adı LİSTEDE KALIR: yayımlanmış APK'lerde API adresi gömülü, o
  // kurulumlar ömür boyu exfe.me'ye istek atacak. Çıkarılırsa eski sürümdeki
  // herkesin girişi kırılır.
  trustedOrigins: [
    BASE_URL,
    "https://lernomi.app", "https://www.lernomi.app",
    "https://exfe.me", "https://www.exfe.me",
  ],
  /*
    ŞEMA HARİTASI EKLENTİLERİ DE KAPSAMALI. Buradaki liste better-auth'un
    hangi drizzle tablosunu hangi modele bağlayacağını söylüyor; eklenti bir
    tablo bekleyip listede bulamazsa açılışta "Drizzle schema mismatch" deyip
    instance sağlıksız kalıyor. Tablo veritabanında OLSA BİLE — bir kez
    yaşandı: `drizzle-kit push` tabloyu kurdu, liste eski kaldı ve deploy
    sağlık kontrolünde iptal oldu (canlıya dokunulmadı).
  */
  database: drizzleAdapter(db, { provider: "pg", schema: { user, session, account, verification, twoFactor: twoFactorTable } }),
  emailAndPassword: {
    enabled: true,
    // Doğrulama yalnız SMTP bağlıyken zorunlu: sağlayıcı yokken kayıt olan
    // kullanıcı doğrulama e-postası bekleyip kilitlenmesin. Sosyal giriş
    // (Google) sağlayıcıdan `emailVerified: true` geldiği için bundan etkilenmez.
    requireEmailVerification: emailConfigured,
    /*
      8'den 10'a çıkarıldı. Better Auth bu sayıyı kendi de sınıyor ve aşağıdaki
      kanca ile AYNI olmak zorunda: ayrışırsa iki farklı hata metni çıkar ve
      kullanıcı hangisinin doğru olduğunu bilemez.
    */
    minPasswordLength: MIN_PASSWORD_LENGTH,
    /**
     * SIFIRLAMA ESKİ OTURUMLARI DA DÜŞÜRÜR.
     *
     * Parolasını sıfırlayan kişinin sebebi çoğu zaman "hesabıma başkası girdi"
     * oluyor. Bayrak kapalıyken sıfırlama o kişiyi DIŞARI ATMIYORDU: oturum
     * çerezi 30 gün geçerli ve parolaya bağlı değil, yani saldırgan parola
     * değişse de aynı çerezle okumaya, yazmaya, hatta hesabı silmeye devam
     * ediyordu. Kullanıcı ise sorunu çözdüğünü sanıyordu — sessiz olduğu için
     * en kötü türden bir açık.
     *
     * Açıkken better-auth sıfırlama başarılı olur olmaz o kullanıcının BÜTÜN
     * oturumlarını siliyor (api/routes/password.mjs). Bedeli, kişinin öteki
     * cihazlarında da yeniden giriş yapması; sıfırlama zaten yeni parolayı
     * bildiği an oluyor, yani bedel bir kez ve küçük.
     *
     * OWASP ASVS 3.3.1 ve NIST SP 800-63B'nin doğrudan istediği davranış.
     */
    revokeSessionsOnPasswordReset: true,
    /**
     * "Parolan değiştirildi" bildirimi — sıfırlama tamamlandıktan sonra.
     *
     * Hesabı ele geçirilen kullanıcının bunu öğrenebileceği tek erken uyarı
     * bu. Saldırgan parolayı sıfırlarsa kurban ancak bu postayla haberdar
     * oluyor; postanın düğmesi de yeniden sıfırlamaya götürüyor, yani geri
     * alma yolu tek dokunuş uzakta.
     *
     * Sessiz: gönderim başarısız olursa sıfırlama yine geçerli (sendEmail
     * kendi içinde yutuyor). Parola değişmişken 500 dönmek, kullanıcıyı
     * "değişti mi değişmedi mi" belirsizliğinde bırakırdı.
     */
    onPasswordReset: async ({ user: u }) => {
      const { subject, html, text } = passwordChangedEmail(`${BASE_URL}/forgot-password`, await getLang());
      await sendEmail(u.email, subject, html, text);
    },
    /**
     * Var olan bir e-postayla kayıt denendi.
     *
     * Kayıt ucu hesabın varlığını bilerek SIZDIRMIYOR: aynı 200'ü ve sentetik
     * kullanıcıyı döndürüyor (better-auth sign-up.mjs). Doğru karar, ama tek
     * başına bırakılınca kullanıcı hiç gelmeyecek bir doğrulama postası
     * bekliyordu — ekranda "doğrulama gönderdik" yazıyor, kutusuna hiçbir şey
     * düşmüyordu. OWASP'ın önerdiği çıkış yolu: ekran değişmez, adresin
     * SAHİBİNE durumu anlatan bir posta gider.
     */
    onExistingUserSignUp: async ({ user: u }) => {
      const { subject, html, text } = accountExistsEmail(`${BASE_URL}/forgot-password`, await getLang());
      await sendEmail(u.email, subject, html, text);
    },
    sendResetPassword: async ({ user: u, url }) => {
      // Dil isteğin kendisinden: dil çerezi, yoksa tarayıcının Accept-Language'i
      // (bkz. lib/i18n/server). Profil okumak burada işe yaramaz — sıfırlama
      // isteği çoğu zaman oturumsuz geliyor.
      const { subject, html, text } = resetEmail(url, await getLang());
      await sendEmail(u.email, subject, html, text);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    /**
     * Doğrulama jetonunun ömrü — varsayılan 1 saatten 30 dakikaya indirildi.
     *
     * Sebep `autoSignInAfterVerification` ile birleşince ortaya çıkıyor: jeton
     * imzalı bir JWT, veritabanında tutulmuyor ve KULLANILDIKTAN SONRA
     * GEÇERSİZLEŞMİYOR. Yani doğrulama bağlantısı, ömrü boyunca tekrar
     * tekrar kullanılabilen bir GİRİŞ bağlantısı: iletilen ya da paylaşılan
     * bir e-posta o süre boyunca hesabı açıyor.
     *
     * Otomatik girişi kapatmak da bir seçenekti; o zaman kullanıcı doğrulayıp
     * bir de elle giriş yapacaktı. Pencereyi yarıya indirmek, kayıt akışını
     * bozmadan aynı riski küçültüyor. Posta gecikirse "tekrar gönder" hem
     * webde hem mobilde bir dokunuş uzakta.
     */
    expiresIn: 30 * 60,
    sendVerificationEmail: async ({ user: u, url }) => {
      // Kayıt anında profil henüz yok; dilin tek güvenilir kaynağı istek.
      const { subject, html, text } = verificationEmail(url, await getLang());
      await sendEmail(u.email, subject, html, text);
    },
  },
  socialProviders: {
    ...(googleConfigured
      ? { google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! } }
      : {}),
    ...(appleConfigured
      ? {
          apple: {
            /*
              İKİ AKIŞ TEK SAĞLAYICIDA.

              `clientId` tarayıcı akışının kimliği ve better-auth listenin
              İLKİNİ kullanıyor; native akışta hiç okunmuyor. Web açıkken
              Services ID başa geçiyor, kapalıyken bundle kimliği duruyor —
              boş bırakılamaz, better-auth her açılışta "missing clientId"
              uyarısı basıyor.

              `audience` id token'ın `aud` iddiasının karşılaştırıldığı liste.
              Native token'ın `aud`'u BUNDLE kimliği, web token'ınki SERVICES
              ID: ikisi birden yazılmazsa açılan akış diğerini kırar.
              `appBundleIdentifier` yalnız `audience` boşken devreye giriyor,
              o yüzden ikisi birlikte duruyor.
            */
            clientId: appleWebConfigured ? [appleServicesId, process.env.APPLE_BUNDLE_ID!] : process.env.APPLE_BUNDLE_ID!,
            /*
              GETTER, sabit dize DEĞİL. Apple client secret'ı süreli bir JWT
              (tavan 6 ay) ve better-auth bu alanı her istekte okuyor. Açılışta
              bir kez üretilseydi uzun ömürlü bir süreçte sessizce süresi dolar,
              Apple da yalnız "invalid_client" derdi — sebebi hiçbir yerde
              yazmayan bir arıza. Burada her okumada 5 dakikalık taze bir secret
              üretiliyor.
            */
            get clientSecret() {
              return appleWebConfigured ? appleClientSecret(Date.now(), { sub: appleServicesId }) : "";
            },
            appBundleIdentifier: process.env.APPLE_BUNDLE_ID!,
            ...(appleWebConfigured ? { audience: [appleServicesId, process.env.APPLE_BUNDLE_ID!] } : {}),
            /**
             * better-auth'un apple sağlayıcısı kullanıcıyı HER ZAMAN
             * `emailVerified: false` ile kuruyor (bkz. social-providers/index.mjs,
             * apple.getUserInfo). İki somut sonucu var, ikisi de yanlış:
             *
             *   1. `emailVerification.sendOnSignUp` açık olduğu için ilk girişte
             *      doğrulama e-postası gidiyor. Apple'ın gizli aktarma adresine
             *      (@privaterelay.appleid.com) giden posta, gönderen alan adı
             *      Apple'da kayıtlı değilse teslim EDİLMEZ — kullanıcı hiç
             *      gelmeyecek bir e-postayı bekler.
             *   2. Aynı e-postayla zaten hesabı olan kullanıcıda hesap
             *      birleştirme "account not linked" ile reddediliyor; kişi kendi
             *      hesabına Apple ile giremez.
             *
             * Apple `email_verified` iddiasını imzalı token'ın İÇİNDE gönderiyor,
             * doğru olan onu okumak. Google sağlayıcısı da profildeki aynı alanı
             * okuyor; böylece iki sosyal yol aynı davranıyor. Tip `true | "true"`
             * diyor ama Apple (Work & School hesapları) `false` da gönderebiliyor,
             * o yüzden karşılaştırma iki biçimi de sayıyor.
             */
            mapProfileToUser: (profile) => ({
              emailVerified: profile.email_verified === true || String(profile.email_verified) === "true",
            }),
          },
        }
      : {}),
  },
  /**
   * HESAP BAĞLAMA — aynı kişinin parola ve sosyal girişi tek hesapta buluşur.
   *
   * Kural: e-postası DOĞRULANMIŞ sağlayıcıdan gelen giriş, aynı e-postaya sahip
   * mevcut hesaba kendiliğinden bağlanır. Doğrulanmamışsa bağlanmaz; kullanıcı
   * kendi yöntemiyle girip ayarlardan bağlar (bkz. /api/account/links).
   *
   * `trustedProviders` BİLEREK BOŞ. Oraya bir sağlayıcı yazmak "e-posta
   * doğrulanmasa da bağla" demektir ve yaygın tavsiyenin aksine güvenli
   * değildir: e-postasını doğrulamayan bir sağlayıcıda saldırgan kurbanın
   * adresiyle hesap açıp onun hesabına bağlanabilir. Google gerçek Gmail
   * adreslerinde `email_verified: true` gönderiyor, Apple da imzalı token'ın
   * içinde — yani doğru kullanıcı zaten kendiliğinden bağlanıyor. Denetimi
   * atlamanın kazancı yok, bedeli hesap devralma.
   *
   * `allowDifferentEmails` kapalı: bağlama yalnız e-posta AYNIYSA. Açık olsaydı
   * bağlama, adres eşleşmesi aramayan bir birleştirmeye dönerdi.
   *
   * `allowUnlinkingAll` kapalı: son giriş yöntemi sökülemez, yoksa kullanıcı
   * kendi hesabının dışında kalırdı.
   */
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: [],
      allowDifferentEmails: false,
      allowUnlinkingAll: false,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 gün
    updateAge: 60 * 60 * 24, // günde bir tazele
    /**
     * Çerez-önbelleği: oturum verisi imzalı bir çerezde taşınır ve o süre
     * boyunca veritabanına HİÇ gidilmez (dış isteği azaltır).
     *
     * 900 saniyeden 60'a indirildi. Sebep ölçüldü: parola sıfırlandığında
     * oturum satırları siliniyor (bkz. revokeSessionsOnPasswordReset) ama
     * ELİNDE ÇEREZ OLAN istemci `get-session`'ı önbellekten yanıtlamaya devam
     * ediyordu — satır gitmişken oturum ayakta görünüyordu. Yani iptal
     * gerçekleşiyor, etkisi maxAge kadar gecikiyordu: saldırgana 15 dakika.
     *
     * `cookieCache.version` bu işe yaramıyor: sürüm işlevi ÖNBELLEKTEKİ
     * oturum ve kullanıcıyla çağrılıyor (api/routes/session.mjs), yani
     * dışarıdan yapılan bir iptali göremiyor. Geriye pencereyi kısaltmak
     * kalıyor.
     *
     * 60 saniye, iptalin en geç bir dakikada etkisini göstermesi demek.
     * Bedeli, etkin kullanıcı başına dakikada en çok bir oturum okuması —
     * yerel Postgres'te tek indeksli sorgu, ölçülen 2000+ req/s kapasitenin
     * yanında görünmez. Önbellek yine de işini yapıyor: bir dakika içindeki
     * onlarca istek tek okumayla karşılanıyor.
     *
     * TAMAMEN kapatmak da bir seçenekti; iptal o zaman anında olurdu ama her
     * istek bir okuma demekti. Bir dakikalık pencere bu iki uç arasında
     * bilinçli bir orta yol.
     */
    cookieCache: { enabled: true, maxAge: 60 },
    // Hesap silme gibi yıkıcı işlemler parola verilmezse "taze" oturum ister:
    // oturum 24 saatten eskiyse yeniden giriş gerekir (çalınan çerezle silme olmasın).
    freshAge: 60 * 60 * 24,
  },
  /**
   * Hesap silme (Play "hesap silme" zorunluluğu, App Store 5.1.1(v)). Uç:
   * POST /api/auth/delete-user — parola hesabında `password` ister, sosyal
   * hesapta taze oturum yeter. Better Auth user/session/account satırlarını
   * siler; uygulama verisi `beforeDelete`te tek transaction'da temizlenir
   * (bkz. lib/account/purge.ts).
   *
   * Apple ile giren kullanıcıda ayrıca Apple TARAFINDAKİ izin iptal ediliyor:
   * 5.1.1(v) bunu açıkça istiyor ve `account` satırı silinmeden okunması
   * gerektiği için sıra önemli — önce iptal, sonra temizlik.
   */
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (u) => {
        await revokeAppleSignIn(u.id);
        await purgeUserData(u.id);
      },
    },
  },
  /**
   * Hız sınırı. Ölçüldü: sınır yokken /sign-in/email'e art arda 8 yanlış parola
   * 8 × 401 döndü — parola denemesi sınırsızdı. IP nginx'in koyduğu
   * x-real-ip'ten okunur: x-forwarded-for'a istemci kendi değerini
   * ekleyebiliyor ($proxy_add_x_forwarded_for), o başlığa güvenmek sınırı
   * sahte IP ile aşılabilir kılardı.
   *
   * SAYAÇ ARTIK ÜÇ INSTANCE'TA ORTAK. Varsayılan depo bellekteydi ve nginx
   * istekleri üç Node instance'ına dağıttığı için buradaki "dakikada 5"
   * fiilen "dakikada ~15" oluyordu — sayı doğru görünüyor, üretimde
   * tutmuyordu. `customStorage` sayacı Redis'e taşıyor; yalnız sayacı,
   * oturumlar Postgres'te kalıyor (bkz. lib/auth/rate-limit-store).
   * `REDIS_URL` boşsa `undefined` döner ve Better Auth bellek deposunda
   * kalır — geliştirmede Redis şartı yok.
   *
   * Sert sınır yine nginx'te (limit_req + fail2ban); bu katman onun üstüne
   * uç bazında incelik ekliyor.
   */
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    storage: "memory",
    customStorage: redisRateLimitStorage(),
    window: 60,
    max: 120,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-in/social": { window: 60, max: 10 },
      "/sign-up/email": { window: 3600, max: 5 },
      "/request-password-reset": { window: 3600, max: 3 },
      "/reset-password": { window: 3600, max: 5 },
      /*
        Doğrulama postası ucu KİMLİK İSTEMİYOR ve doğrulanmamış herhangi bir
        adrese posta gönderiyor: kuralsız bırakılırsa bir kurbanın gelen
        kutusunu doldurmanın ve SMTP kotasını tüketmenin yolu. Better Auth'un
        kendi varsayılanı vardı (60 saniyede 3) ama o instance başına
        sayıyordu ve nginx'in auth bloğu bu ucu hiç kapsamıyordu — ikisi de
        kapatıldı. Web arayüzünde zaten 60 saniyelik geri sayım var, yani
        gerçek kullanıcı bu tavana çarpmıyor.
      */
      "/send-verification-email": { window: 3600, max: 5 },
    },
  },
  advanced: {
    // Çapraz-köken gezinmelerde (e-posta/bildirim bağlantısı) çerez gitsin diye lax.
    defaultCookieAttributes: { sameSite: "lax" },
    ipAddress: { ipAddressHeaders: ["x-real-ip"] },
  },
  /**
   * Bot koruması. Liste anahtarlar tanımlıyken TEK eleman, tanımsızken BOŞ —
   * kapıyı açan şey env, kod değil (gerekçe: lib/auth/captcha.ts).
   */
  plugins: [
    ...captchaPlugins(),
    /**
     * TEK KULLANIMLIK TOKEN — tarayıcıda açılan girişi UYGULAMAYA devretmek için.
     *
     * NEDEN GEREKLİ. Apple'ın Android'de native yolu yok; oradaki tek seçenek
     * tarayıcı akışı. Ama akış bitince oturum çerezi TARAYICIYA yazılıyor,
     * uygulamaya değil. Gömülü bir WebView kullanılsaydı çerez kavanozu ortak
     * olurdu ve devir hiç gerekmezdi — ama OAuth'u gömülü WebView'de
     * çalıştırmak önerilmiyor: sağlayıcılar engelliyor ve kullanıcı
     * tarayıcıdaki mevcut oturumundan yararlanamadığı için her seferinde
     * Apple ID'sini elle yazıyor.
     *
     * Akış bu yüzden sistem tarayıcısında çalışıyor; sonunda `/auth/handoff`
     * kısa ömürlü ve TEK KULLANIMLIK bir token üretip uygulamaya veriyor,
     * uygulama da onu `/one-time-token/verify` ile kendi oturumuna çeviriyor.
     *
     * `storeToken: "hashed"`: veritabanında token'ın kendisi değil özeti
     * duruyor — bir dökümü ele geçiren onu kullanamaz.
     *
     * `disableClientRequest: true`: token yalnız SUNUCUDAN istenebilir
     * (`auth.api.generateOneTimeToken`). Tarayıcıdan bir fetch ile
     * üretilebilseydi, oturumu olan herhangi bir sayfa o oturumu
     * devredilebilir bir dizgeye çevirebilirdi.
     */
    oneTimeToken({ expiresIn: 3, storeToken: "hashed", disableClientRequest: true }),
    /**
     * İKİ ADIMLI DOĞRULAMA — isteğe bağlı, e-posta koduyla.
     *
     * Parola tek başına yeterli olduğu sürece, sızmış bir parola hesabın
     * tamamı demek. Bu ikinci adım kullanıcının POSTA KUTUSUNU da şart
     * koşuyor: parolayı bilen ama kutuya erişemeyen biri giremiyor.
     *
     * KİMLİK DOĞRULAYICI UYGULAMA (TOTP) KAPALI. Sebep dürüstlük: TOTP'un
     * kurtarma yolu yedek kodlardır ve better-auth yedek kodları yalnız TOTP
     * kaydıyla birlikte üretiyor. İkisini birden açmak, kullanıcıya
     * saklaması gereken bir kod listesi ve ayrı bir uygulama yükü getirirdi.
     * E-posta yolunda kurtarma zaten kullanıcının kutusu.
     *
     * BUNUN KARŞILIĞINDA: posta kutusunu kaybeden kullanıcı hesabını da
     * kaybeder. Aynı şey parola sıfırlama için de geçerli olduğundan
     * durum bugünkünden kötü değil, ama arayüz bunu açıkça söylüyor
     * (twofa.mail_warning).
     *
     * Açma ve kapama PAROLA istiyor (better-auth zorunlu tutuyor): oturumu
     * ele geçiren biri ikinci adımı sessizce kaldıramasın.
     */
    twoFactor({
      issuer: "Lernomi",
      totpOptions: { disable: true },
      /* Güvenilen cihazın ömrü AÇIKÇA veriliyor: varsayılana bırakıldığında
         ekrandaki söz kütüphane varsayılanına bağlı kalıyordu. */
      trustDeviceMaxAge: TWO_FACTOR_TRUST_DAYS * 24 * 60 * 60,
      otpOptions: {
        period: TWO_FACTOR_CODE_MINUTES,
        digits: TWO_FACTOR_CODE_DIGITS,
        allowedAttempts: TWO_FACTOR_ALLOWED_ATTEMPTS,
        /*
          Kod veritabanında ÖZETLENEREK duruyor. Düz metin saklamak, tek
          kullanımlık kodu okuyabilen herkesin (döküm, yedek, log) o anki
          girişi tamamlayabilmesi demekti.
        */
        storeOTP: "hashed",
        sendOTP: async ({ user, otp }) => {
          const { subject, html, text } = twoFactorCodeEmail(otp, await getLang());
          await sendEmail(user.email, subject, html, text);
        },
      },
    }),
  ],
  /**
   * Parola ölçütü — SUNUCUDA, tek yerde.
   *
   * Kural istemcide de gösterilebilir ama orada DURDURULAMAZ: kayıt ucu
   * doğrudan çağrılabiliyor. Bu yüzden dört yolun dördü de burada süzülüyor —
   * kayıt, sıfırlama, değiştirme ve sosyal hesaba parola ekleme. Biri
   * atlanırsa kural o yoldan delinir ve delik hiçbir yerde görünmez.
   *
   * `/reset-password` gövdesi yalnız yeni parolayı taşıyor, kimlik kuralı
   * orada çalışamıyor; uzunluk ve yaygınlık her yolda çalışıyor.
   */
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      /**
       * HESAP BAŞINA KİLİT — parola denenmeden önce.
       *
       * IP başına sınır tek bir hesaba yüzlerce IP'den gelen denemeyi
       * görmüyordu; bu sayaç e-postaya bakıyor (bkz. lib/auth/login-throttle).
       * Kontrol parola doğrulamasının ÖNÜNDE: kilitliyken doğru parola bile
       * geçmemeli, yoksa kilit yalnız yanlış tahminleri yavaşlatan bir şey
       * olur ve elindeki parolayı deneyen saldırganı hiç durdurmaz.
       */
      if (ctx.path === "/sign-in/email") {
        const email = (ctx.body as { email?: unknown } | undefined)?.email;
        if (typeof email === "string" && email && (await isLockedOut(email))) {
          throw new APIError("TOO_MANY_REQUESTS", {
            code: "TOO_MANY_ATTEMPTS",
            message: "Too many failed sign-in attempts for this account. Try again later.",
          });
        }
        return;
      }

      const GUARDED = ["/sign-up/email", "/reset-password", "/change-password", "/set-password"];
      if (!GUARDED.includes(ctx.path)) return;
      const body = (ctx.body ?? {}) as { password?: unknown; newPassword?: unknown; email?: unknown; name?: unknown };
      const password = typeof body.password === "string" ? body.password : typeof body.newPassword === "string" ? body.newPassword : "";
      if (!password) return; // alan yoksa Better Auth kendi doğrulamasını yapsın

      const problem = checkPassword(password, {
        email: typeof body.email === "string" ? body.email : undefined,
        name: typeof body.name === "string" ? body.name : undefined,
      });
      if (!problem) return;

      /*
        Mesaj İNGİLİZCE ve makine okunur bir kodla birlikte gidiyor: kullanıcıya
        gösterilecek metin istemcide `translateAuthError` ile üç dilden birine
        çevriliyor. Sunucuda Türkçe cümle üretmek arayüzün öbür iki dilini
        kırardı (aynı karar lib/premium/gates.ts'te de alınmıştı).
      */
      throw new APIError("BAD_REQUEST", {
        code: PASSWORD_ERROR_CODE[problem],
        message:
          problem === "too_short"
            ? `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`
            : problem === "too_common"
              ? "This password is too common or too predictable."
              : "Password must not contain your name or e-mail address.",
      });
    }),
    /**
     * Giriş denemesinin SONUCUNU sayaca yazar (bkz. lib/auth/login-throttle).
     *
     * Kanca başarısızlıkta da çalışıyor: uçtan fırlayan `APIError` yakalanıp
     * `ctx.context.returned`a konuyor ve `after` yine koşuyor (bkz.
     * better-auth api/dispatch.mjs). Yani gerçek başarısızlıkları sayabiliyoruz,
     * her denemeyi değil.
     *
     * BAŞARININ ÖLÇÜSÜ OTURUM JETONU. Yanıt gövdesinde `token` varsa giriş
     * olmuştur; hata nesnesinde öyle bir alan yok. Aynı ayrım mobilde de
     * kullanılıyor (bkz. mobile/src/lib/auth AuthOutcome.session) — durum
     * koduna bakmaktan sağlam, çünkü kancaya durum kodu gelmiyor.
     */
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-in/email") return;
      const email = (ctx.body as { email?: unknown } | undefined)?.email;
      if (typeof email !== "string" || !email) return;

      const returned = ctx.context.returned as { token?: unknown; body?: { code?: unknown } } | undefined;
      const token = returned?.token;
      if (typeof token === "string" && token.length > 0) {
        await clearFailedLogins(email);
        return;
      }

      /*
        DOĞRULANMAMIŞ HESAP SAYILMIYOR. Better Auth parolayı doğrulamayı
        ÖNCE yapıyor, "e-postan doğrulanmadı" hatasına ancak parola DOĞRUYKEN
        ulaşılıyor (api/routes/sign-in.mjs). Yani bu bir kaba kuvvet sinyali
        değil, eksik bir adım; sayaca yazmak, doğrulamayı bekleyen kullanıcıyı
        birkaç denemeden sonra bir de kilitlerdi.
      */
      if (returned?.body?.code === "EMAIL_NOT_VERIFIED") return;

      /*
        BAŞARISIZ GİRİŞ KAYDA GEÇİYOR.

        Eskiden hiçbir iz kalmıyordu: bir hesaba yönelen saldırı ancak
        fail2ban 429'ları saydığında görünüyordu, parola doğru tutturulduğunda
        ise hiç görünmüyordu. Satır İNGİLİZCE (sunucu log'u, arayüz değil) ve
        e-posta içeriyor — aynı dosyadaki e-posta log'ları da alıcıyı yazıyor,
        yeni bir veri sınıfı açılmıyor.

        Eşiğe varan deneme AYRI ve daha yüksek sesle yazılıyor: kilitlenen bir
        hesap operasyonel olarak bakılması gereken bir olay.
      */
      const count = await noteFailedLogin(email);
      const ip = ctx.request?.headers.get("x-real-ip") ?? "?";
      if (count !== null && count >= MAX_FAILED_LOGINS) {
        console.warn(`[auth] account locked after ${count} failed sign-ins: ${email} (ip ${ip})`);
      } else {
        console.warn(`[auth] failed sign-in ${count ?? "?"}/${MAX_FAILED_LOGINS}: ${email} (ip ${ip})`);
      }
    }),
  },
});

/**
 * Oturumdaki kullanıcı.
 *
 * `email` profil ekranında kimlik kartının alt satırı — mobilde de öyle. Ayrı
 * bir `getUserEmail()` zaten vardı ama o oturumu İKİNCİ kez okuyor; aynı
 * çağrıda gelen bir alanı ikinci bir istekle almak gereksiz.
 */
export type SessionUser = { id: string; name: string | null; email: string | null };
export type SessionRead = { user: SessionUser | null; failed: boolean };

async function readSession(): Promise<SessionRead> {
  if (!authEnabled) return { user: null, failed: false };
  try {
    const data = await auth.api.getSession({ headers: await headers() });
    const u = data?.user;
    if (!u) return { user: null, failed: false };
    return { user: { id: u.id, name: u.name ?? u.email ?? null, email: u.email ?? null }, failed: false };
  } catch (err) {
    /*
      Next'in KENDİ akış hataları buraya düşmemeli. Somut hâli: ana sayfa
      derleme sırasında statik üretilmeye çalışılıyor, `headers()` bunu
      "dinamik" diye kesiyor (DynamicServerError) ve bizim catch'imiz onu
      gerçek bir arıza sanıp her yapıda "[auth] oturum okunamadı" hatası
      basıyordu — deploy log'undaki tek kırmızı satır buydu ve yanlış alarmdı.

      `unstable_rethrow` çerçeveye ait olanları (dinamik kullanım, notFound,
      redirect, CSR'ye düşme) geri fırlatıyor; aşağısı yalnız GERÇEK okuma
      hatası için kalıyor.
    */
    unstable_rethrow(err);
    console.error("[auth] oturum okunamadı", err);
    return { user: null, failed: true };
  }
}

/** Oturumdaki kullanıcının kimliği; giriş yoksa null. */
export async function getUserId(): Promise<string | null> {
  return (await readSession()).user?.id ?? null;
}

export async function getUserInfo(): Promise<SessionUser | null> {
  return (await readSession()).user;
}

/** Oturum durumu + okuma hatası bilgisi (giriş ekranına yönlendirme kararı için). */
export async function getSessionRead(): Promise<SessionRead> {
  return readSession();
}

/** Oturumdaki kullanıcının e-postası (admin kapısı için); yoksa null. */
export async function getUserEmail(): Promise<string | null> {
  try {
    const data = await auth.api.getSession({ headers: await headers() });
    return data?.user?.email ?? null;
  } catch {
    return null;
  }
}
