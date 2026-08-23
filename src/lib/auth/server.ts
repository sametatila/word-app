import "server-only";
import { createNeonAuth } from "@neondatabase/auth/next/server";

/**
 * Neon Auth (Managed Better Auth).
 * Anahtarlar yoksa uygulama demo modunda tek kullanıcıyla çalışır; böylece
 * veritabanı/auth kurulmadan da arayüz derlenir ve açılır.
 */
export const authEnabled = Boolean(
  process.env.NEON_AUTH_BASE_URL && process.env.NEON_AUTH_COOKIE_SECRET,
);

/**
 * Demo modu artık **açıkça istenmeden** açılmıyor.
 *
 * Önceden yalnızca `NODE_ENV !== "production"` koşuluna bakıyordu, yani her
 * geliştirme ortamı kendiliğinden "demo-user" hesabı üretiyordu. Bu hesap
 * gerçek veritabanına yazıyor ve kullanıcı listesinde gerçek hesapların
 * arasında duruyordu — kimsenin açmadığı, kimsenin sahiplenmediği bir kayıt.
 *
 * Artık `ALLOW_DEMO_USER=1` gerekiyor. Tek kullanım yeri tarayıcı testi
 * (scripts/playtest.mjs): o testin giriş adımı yok ve auth'suz bir sunucuya
 * ihtiyaç duyuyor. Onun dışında hiçbir yerde açılmıyor.
 *
 * Üretimde kapalı olması ayrıca güvenlik meselesi: tek bir ortam değişkeninin
 * eksilmesi (yanlış yazım, yeni ortama kopyalanmaması) uygulamayı sessizce
 * kimlik doğrulamasız hâle getirirdi ve her ziyaretçi aynı hesabın verilerini
 * okuyup yazabilirdi. Bozuk davranmak, sessizce açık olmaktan iyidir.
 */
const demoAllowed =
  process.env.ALLOW_DEMO_USER === "1" && process.env.NODE_ENV !== "production";

if (!authEnabled && !demoAllowed) {
  console.error(
    "[auth] NEON_AUTH_BASE_URL / NEON_AUTH_COOKIE_SECRET tanımsız — tüm istekler oturumsuz sayılacak. " +
      "Tarayıcı testi için demo hesabı gerekiyorsa ALLOW_DEMO_USER=1 verin.",
  );
}

export const auth = authEnabled
  ? createNeonAuth({
      baseUrl: process.env.NEON_AUTH_BASE_URL!,
      cookies: {
        secret: process.env.NEON_AUTH_COOKIE_SECRET!,
        /**
         * `strict` yerine `lax`.
         *
         * `strict` çerezi yalnızca site İÇİNDEN başlayan gezinmelerde
         * gönderiyor. Bu uygulamaya giriş, dışarıdan başlayan gezinmelerle
         * dolu: e-posta doğrulama bağlantısı, parola sıfırlama bağlantısı,
         * bildirime dokunulduğunda servis işçisinin açtığı pencere ve ana
         * ekrana eklenmiş uygulamanın açılışı. Bunların herhangi birinde çerez
         * gönderilmeyince sunucu isteği oturumsuz görüyor ve kullanıcıyı giriş
         * ekranına atıyor — oturum aslında duruyorken.
         *
         * `lax` GET gezinmelerinde çerezi gönderir, çapraz siteden gelen
         * POST'larda göndermez; durum değiştiren uçlarda ayrıca aynı-köken
         * kontrolü var (bkz. lib/auth/origin), yani CSRF savunması iki
         * katmanlı kalıyor.
         */
        sameSite: "lax",
        /**
         * Oturum verisi önbelleğinin ömrü (saniye).
         *
         * Varsayılan 300 sn. Bu süre dolduğunda her istek yukarıdaki auth
         * sunucusuna gidiyor; o sunucuya ulaşılamadığı her an kullanıcı
         * oturumsuz sayılıyor. Süreyi uzatmak dışarıya bağımlı anların
         * sayısını düşürüyor. Üst sınır oturumun kendisi değil — jeton çerezi
         * ayrıca duruyor ve geçersiz kılınan bir oturum en geç bu süre sonunda
         * fark ediliyor.
         */
        sessionDataTtl: 900,
      },
      logLevel: "warn",
    })
  : null;

export type SessionUser = { id: string; name: string | null };

/**
 * Oturum okuması: kullanıcı **ve** okumanın başarılı olup olmadığı.
 *
 * İkisini ayırmak şart. Önce her hata `null` kullanıcıya dönüşüyordu ve
 * çağıran taraf bunu "giriş yapılmamış" diye okuyup giriş ekranına
 * yönlendiriyordu. Oysa auth sunucusuna bir saniyelik erişim sorunu ile
 * gerçekten oturumsuz olmak aynı şey değil: birincisinde kullanıcının
 * çerezi yerinde duruyor ve onu giriş ekranına atmak, oturumu kendi elimizle
 * bitirmek oluyordu — telefonda uygulamayı her açtığında yeniden giriş
 * yapması gerektiği şikâyetinin kaynağı da bu.
 */
export type SessionRead = { user: SessionUser | null; failed: boolean };

async function readSession(): Promise<SessionRead> {
  if (!auth) {
    return { user: demoAllowed ? { id: "demo-user", name: "Demo" } : null, failed: false };
  }
  try {
    const { data } = await auth.getSession();
    const user = data?.user;
    if (!user) return { user: null, failed: false };
    return { user: { id: user.id, name: user.name ?? user.email ?? null }, failed: false };
  } catch (err) {
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

/**
 * Oturum durumu, okuma hatası bilgisiyle birlikte.
 *
 * Yalnızca giriş ekranına yönlendirme kararını veren yer kullanıyor: orada
 * "oturum yok" ile "oturuma bakılamadı" farkı kullanıcının hesabını
 * kaybetmesiyle kaybetmemesi arasındaki fark.
 */
export async function getSessionRead(): Promise<SessionRead> {
  return readSession();
}
