import "server-only";
import { headers } from "next/headers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { user, session, account, verification } from "@/lib/db/auth-schema";
import { emailConfigured, sendEmail, verificationEmail, resetEmail } from "@/lib/email";
import { purgeUserData } from "@/lib/account/purge";

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
  appName: "Nomi",
  // Yer tutucu yalnız derleme içindir: `authEnabled` false iken /api/auth 503
  // döner ve readSession oturum okumaz (bkz. app/api/auth/[...path]/route.ts).
  secret: process.env.BETTER_AUTH_SECRET ?? "build-time-placeholder-secret-change-me",
  baseURL: BASE_URL,
  basePath: "/api/auth",
  trustedOrigins: [BASE_URL, "https://exfe.me", "https://www.exfe.me"],
  database: drizzleAdapter(db, { provider: "pg", schema: { user, session, account, verification } }),
  emailAndPassword: {
    enabled: true,
    // Doğrulama yalnız SMTP bağlıyken zorunlu: sağlayıcı yokken kayıt olan
    // kullanıcı doğrulama e-postası bekleyip kilitlenmesin. Sosyal giriş
    // (Google) sağlayıcıdan `emailVerified: true` geldiği için bundan etkilenmez.
    requireEmailVerification: emailConfigured,
    minPasswordLength: 8,
    sendResetPassword: async ({ user: u, url }) => {
      const { subject, html, text } = resetEmail(url);
      await sendEmail(u.email, subject, html, text);
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user: u, url }) => {
      const { subject, html, text } = verificationEmail(url);
      await sendEmail(u.email, subject, html, text);
    },
  },
  socialProviders: googleConfigured
    ? { google: { clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! } }
    : {},
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 gün
    updateAge: 60 * 60 * 24, // günde bir tazele
    cookieCache: { enabled: true, maxAge: 900 }, // 15 dk çerez-önbelleği (dış isteği azaltır)
    // Hesap silme gibi yıkıcı işlemler parola verilmezse "taze" oturum ister:
    // oturum 24 saatten eskiyse yeniden giriş gerekir (çalınan çerezle silme olmasın).
    freshAge: 60 * 60 * 24,
  },
  /**
   * Hesap silme (Play "hesap silme" zorunluluğu). Uç: POST /api/auth/delete-user
   * — parola hesabında `password` ister, sosyal hesapta taze oturum yeter.
   * Better Auth user/session/account satırlarını siler; uygulama verisi
   * `beforeDelete`te tek transaction'da temizlenir (bkz. lib/account/purge.ts).
   */
  user: {
    deleteUser: {
      enabled: true,
      beforeDelete: async (u) => { await purgeUserData(u.id); },
    },
  },
  /**
   * Hız sınırı. Ölçüldü: sınır yokken /sign-in/email'e art arda 8 yanlış parola
   * 8 × 401 döndü — parola denemesi sınırsızdı. Sayaç bellekte, yani instance
   * başına (üretimde üç instance → etkin sınır ~3 katı); sert sınır nginx'te
   * (/api/auth/sign-in* için limit_req). IP nginx'in koyduğu x-real-ip'ten
   * okunur: x-forwarded-for'a istemci kendi değerini ekleyebiliyor
   * ($proxy_add_x_forwarded_for), o başlığa güvenmek sınırı sahte IP ile
   * aşılabilir kılardı.
   */
  rateLimit: {
    enabled: process.env.NODE_ENV === "production",
    storage: "memory",
    window: 60,
    max: 120,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-in/social": { window: 60, max: 10 },
      "/sign-up/email": { window: 3600, max: 5 },
      "/request-password-reset": { window: 3600, max: 3 },
      "/reset-password": { window: 3600, max: 5 },
    },
  },
  advanced: {
    // Çapraz-köken gezinmelerde (e-posta/bildirim bağlantısı) çerez gitsin diye lax.
    defaultCookieAttributes: { sameSite: "lax" },
    ipAddress: { ipAddressHeaders: ["x-real-ip"] },
  },
});

export type SessionUser = { id: string; name: string | null };
export type SessionRead = { user: SessionUser | null; failed: boolean };

async function readSession(): Promise<SessionRead> {
  if (!authEnabled) return { user: null, failed: false };
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
