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
 * Demo modu yalnızca geliştirmede geçerlidir.
 *
 * Aksi hâlde üretimde tek bir ortam değişkeninin eksilmesi (yanlış yazım, yeni
 * ortama kopyalanmaması) uygulamayı sessizce kimlik doğrulamasız hâle getirir:
 * her ziyaretçi aynı "demo-user" hesabına giriş yapmış sayılır ve o hesabın
 * verilerini okuyup yazabilir. Ortam değişkenleri eksikse üretimde kimse
 * oturum açmış sayılmaz — bozuk davranmak, sessizce açık olmaktan iyidir.
 */
const demoAllowed = process.env.NODE_ENV !== "production";

if (!authEnabled && !demoAllowed) {
  console.error(
    "[auth] NEON_AUTH_BASE_URL / NEON_AUTH_COOKIE_SECRET tanımsız — üretimde demo moduna düşülmez, tüm istekler oturumsuz sayılacak.",
  );
}

export const auth = authEnabled
  ? createNeonAuth({
      baseUrl: process.env.NEON_AUTH_BASE_URL!,
      cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
      logLevel: "warn",
    })
  : null;

export type SessionUser = { id: string; name: string | null };

async function currentUser(): Promise<SessionUser | null> {
  if (!auth) return demoAllowed ? { id: "demo-user", name: "Demo" } : null;
  try {
    const { data } = await auth.getSession();
    const user = data?.user;
    if (!user) return null;
    return { id: user.id, name: user.name ?? user.email ?? null };
  } catch {
    return null;
  }
}

/** Oturumdaki kullanıcının kimliği; giriş yoksa null. */
export async function getUserId(): Promise<string | null> {
  return (await currentUser())?.id ?? null;
}

export async function getUserInfo(): Promise<SessionUser | null> {
  return currentUser();
}
