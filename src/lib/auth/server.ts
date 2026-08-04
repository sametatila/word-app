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

export const auth = authEnabled
  ? createNeonAuth({
      baseUrl: process.env.NEON_AUTH_BASE_URL!,
      cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
      logLevel: "warn",
    })
  : null;

export type SessionUser = { id: string; name: string | null };

async function currentUser(): Promise<SessionUser | null> {
  if (!auth) return { id: "demo-user", name: "Demo" };
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
