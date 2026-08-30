import { API_BASE } from "../api/client";

/**
 * Mobil kimlik doğrulama — web'le AYNI Better Auth uçları (www.exfe.me/api/auth/*).
 * Web'deki auth-form ile bire bir: sign-in/email, sign-up/email, get-session,
 * sign-out. Oturum çerezi RN'in yerel jar'ında saklanır; burada elle çerez
 * yönetimi yok. Başarıda kullanıcı döner, hata net kod/mesajla döner.
 */
export type AuthUser = { id: string; name: string | null; email: string | null };
export type AuthOutcome = { ok: true; user: AuthUser | null } | { ok: false; code: string; message: string };

async function post(path: string, body: Record<string, unknown>): Promise<Response> {
  return fetch(`${API_BASE}/api/auth/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
  });
}

function userFrom(obj: unknown): AuthUser | null {
  const u = (obj as { user?: { id?: string; name?: string; email?: string } })?.user;
  if (!u?.id) return null;
  return { id: u.id, name: u.name ?? u.email ?? null, email: u.email ?? null };
}

async function parse(res: Response): Promise<AuthOutcome> {
  const text = await res.text().catch(() => "");
  let json: unknown = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* düz metin */ }
  if (!res.ok) {
    const o = (json ?? {}) as { code?: string; message?: string };
    return { ok: false, code: o.code ?? "", message: o.message ?? text.slice(0, 200) ?? "Bir sorun oldu" };
  }
  return { ok: true, user: userFrom(json) };
}

export async function signIn(email: string, password: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("sign-in/email", { email, password, rememberMe: true }));
  } catch {
    return { ok: false, code: "NETWORK", message: "Bağlantı kurulamadı" };
  }
}

export async function signUp(name: string, email: string, password: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("sign-up/email", { email, password, name: name.trim() || email.split("@")[0] }));
  } catch {
    return { ok: false, code: "NETWORK", message: "Bağlantı kurulamadı" };
  }
}

/** Geçerli oturumun kullanıcısı; oturum yoksa null. */
export async function getSession(): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE}/api/auth/get-session`, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const text = await res.text().catch(() => "");
    if (!text || text === "null") return null;
    return userFrom(JSON.parse(text));
  } catch {
    return null;
  }
}

export async function signOut(): Promise<void> {
  try { await post("sign-out", {}); } catch { /* yut */ }
}

/**
 * Sosyal giriş (Neon Auth / Managed Better Auth). POST sign-in/social sağlayıcı
 * için bir OAuth başlatma URL'i döndürür; mobil bunu WebView'de açar. Android'de
 * WebView ile fetch AYNI çerez kavanozunu (CookieManager) paylaşır — OAuth bitip
 * oturum çerezi yazılınca uygulamanın istekleri de oturumlu olur. `callbackURL`
 * bitişte gidilecek sayfa; WebView bu adrese ulaşınca akış tamamdır.
 */
export async function signInSocial(provider: string, callbackURL: string): Promise<string | null> {
  try {
    const res = await post("sign-in/social", { provider, callbackURL });
    if (!res.ok) return null;
    const j = JSON.parse(await res.text()) as { url?: string };
    return j.url ?? null;
  } catch {
    return null;
  }
}

/**
 * Parola sıfırlama bağlantısı ister (web'le AYNI Better Auth ucu:
 * request-password-reset). Sıfırlamanın kendisi e-postadaki bağlantıyla
 * web'deki /reset-password sayfasında tamamlanır — mobil ayrı sayfa gerektirmez.
 * Güvenlik: e-posta kayıtlı olmasa bile true döneriz (hesap sızdırmamak için).
 */
export async function requestPasswordReset(email: string): Promise<boolean> {
  try {
    const res = await post("request-password-reset", { email, redirectTo: "https://www.exfe.me/reset-password" });
    return res.ok;
  } catch {
    return false;
  }
}
