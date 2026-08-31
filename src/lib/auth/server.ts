import "server-only";
import { headers } from "next/headers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { user, session, account, verification } from "@/lib/db/auth-schema";

/**
 * Self-hosted Better Auth (Neon Auth yerine). Oturumlar/kullanıcılar KENDİ
 * Postgres'imizde. Uçlar aynı (`/api/auth/sign-in/email`, `sign-up/email`,
 * `get-session`, `sign-out`, `sign-in/social`, `request-password-reset`) →
 * web formları ve mobil uygulama değişmeden çalışır.
 *
 * Google sosyal giriş yalnız GOOGLE_CLIENT_ID/SECRET verilince açılır; yoksa
 * e-posta/parola tek başına çalışır. Parola sıfırlama e-postası şimdilik sunucu
 * log'una düşer (SMTP/Resend bağlanınca gerçek gönderim — bkz. sendResetPassword).
 */
const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authEnabled = Boolean(process.env.DATABASE_URL && process.env.BETTER_AUTH_SECRET);

const BASE_URL = process.env.BETTER_AUTH_URL ?? "https://www.exfe.me";

export const auth = betterAuth({
  appName: "Wortspiel",
  secret: process.env.BETTER_AUTH_SECRET ?? "build-time-placeholder-secret-change-me",
  baseURL: BASE_URL,
  basePath: "/api/auth",
  trustedOrigins: [BASE_URL, "https://exfe.me", "https://www.exfe.me"],
  database: drizzleAdapter(db, { provider: "pg", schema: { user, session, account, verification } }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    sendResetPassword: async ({ user: u, url }) => {
      // TODO(SMTP): e-posta sağlayıcı bağlanınca gerçek gönderim. Şimdilik log.
      console.log(`[auth] parola sıfırlama bağlantısı — ${u.email}: ${url}`);
    },
  },
  socialProviders: googleConfigured
    ? { google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! } }
    : {},
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 gün
    updateAge: 60 * 60 * 24, // günde bir tazele
    cookieCache: { enabled: true, maxAge: 900 }, // 15 dk çerez-önbelleği (dış isteği azaltır)
  },
  advanced: {
    // Çapraz-köken gezinmelerde (e-posta/bildirim bağlantısı) çerez gitsin diye lax.
    defaultCookieAttributes: { sameSite: "lax" },
  },
});

export type SessionUser = { id: string; name: string | null };
export type SessionRead = { user: SessionUser | null; failed: boolean };

async function readSession(): Promise<SessionRead> {
  try {
    const data = await auth.api.getSession({ headers: await headers() });
    const u = data?.user;
    if (!u) return { user: null, failed: false };
    return { user: { id: u.id, name: u.name ?? u.email ?? null }, failed: false };
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
