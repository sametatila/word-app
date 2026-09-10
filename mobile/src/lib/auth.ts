import { API_BASE, fetchWithTimeout } from "../api/client";
import { t } from "./i18n";

/**
 * Mobil kimlik doğrulama — web'le AYNI Better Auth uçları (www.lernomi.app/api/auth/*).
 * Web'deki auth-form ile bire bir: sign-in/email, sign-up/email, get-session,
 * sign-out. Oturum çerezi RN'in yerel jar'ında saklanır; burada elle çerez
 * yönetimi yok. Başarıda kullanıcı döner, hata net kod/mesajla döner.
 */
export type AuthUser = {
  id: string;
  name: string | null;
  email: string | null;
  /**
   * Hesabın açılış anı (better-auth oturumu, ISO). Sosyal girişte tek düğme hem
   * kayıt hem giriş yapıyor; "bu hesap az önce mi açıldı" sorusunu yalnız bu
   * yanıtlıyor — onboarding seçimlerinin devri buna bakıyor (bkz. AuthContext).
   */
  createdAt: string | null;
};
/**
 * `session`: istek 200 döndü ve OTURUM DA AÇILDI mı.
 *
 * İkisi aynı şey değil. Doğrulama zorunluyken kayıt ucu 200 dönüyor ama
 * gövdedeki `token` NULL geliyor (better-auth sign-up.mjs): kullanıcı satırı
 * yazıldı, oturum çerezi YAZILMADI. Buradaki 200'ü "giriş yapıldı" saymak
 * uygulamayı oturumsuz açıyor, sonraki her istek 401 alıyor ve kullanıcı
 * "e-postanı doğrula" cümlesini hiç görmüyordu. Giriş ve sosyal giriş uçları
 * `token`ı dolu döndürüyor, yani ayrım tek alanla yapılabiliyor.
 */
export type AuthOutcome =
  | { ok: true; user: AuthUser | null; session: boolean }
  /**
   * `status`: HTTP durum kodu. Hız sınırına takılan yanıtın GÖVDESİNDE ayırt
   * edici bir kod yok — Better Auth düz bir İngilizce cümle döndürüyor, nginx
   * ise HTML sayfası. İkisi de yalnız 429'dan tanınıyor; kod olmadan mesaj
   * ham hâliyle ekrana düşerdi (bkz. authErrors.translateAuthError).
   */
  | { ok: false; code: string; message: string; status?: number };

async function post(path: string, body: Record<string, unknown>): Promise<Response> {
  return fetch(`${API_BASE}/api/auth/${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
  });
}

function userFrom(obj: unknown): AuthUser | null {
  const u = (obj as { user?: { id?: string; name?: string; email?: string; createdAt?: string } })?.user;
  if (!u?.id) return null;
  return { id: u.id, name: u.name ?? u.email ?? null, email: u.email ?? null, createdAt: u.createdAt ?? null };
}

/** Yanıt gövdesinde oturum jetonu var mı (bkz. AuthOutcome.session). */
function hasSession(obj: unknown): boolean {
  const token = (obj as { token?: unknown } | null)?.token;
  return typeof token === "string" && token.length > 0;
}

async function parse(res: Response): Promise<AuthOutcome> {
  const text = await res.text().catch(() => "");
  let json: unknown = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* düz metin */ }
  if (!res.ok) {
    const o = (json ?? {}) as { code?: string; message?: string };
    return { ok: false, code: o.code ?? "", message: o.message ?? text.slice(0, 200) ?? t("autherror.something_went_wrong"), status: res.status };
  }
  return { ok: true, user: userFrom(json), session: hasSession(json) };
}

export async function signIn(email: string, password: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("sign-in/email", { email, password, rememberMe: true }));
  } catch {
    return { ok: false, code: "NETWORK", message: t("common.connection_failed") };
  }
}

export async function signUp(name: string, email: string, password: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("sign-up/email", { email, password, name: name.trim() || email.split("@")[0] }));
  } catch {
    return { ok: false, code: "NETWORK", message: t("common.connection_failed") };
  }
}

/** Geçerli oturumun kullanıcısı; oturum yoksa null. */
export async function getSession(): Promise<AuthUser | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/get-session`, { headers: { accept: "application/json" } });
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
 * Sosyal giriş (self-hosted Better Auth). POST sign-in/social sağlayıcı
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
 * NATIVE Google girişi (idToken akışı). Cihaz hesap seçiciden alınan idToken'ı
 * better-auth'a gönderir (POST sign-in/social, `{ idToken: { token } }`). WebView
 * YOK — embedded WebView OAuth'u Google engelliyor ve cihazın Google hesaplarını
 * göstermiyordu (her seferinde sıfırdan giriş). idToken'ın `aud`'u Web client ID
 * = sunucudaki GOOGLE_CLIENT_ID, better-auth onu doğrulayıp oturumu açar; çerez
 * RN jar'ına yazılır (sonrası e-posta girişiyle birebir aynı).
 */
export async function signInGoogleNative(idToken: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("sign-in/social", { provider: "google", idToken: { token: idToken } }));
  } catch {
    return { ok: false, code: "NETWORK", message: t("common.connection_failed") };
  }
}

/**
 * NATIVE Apple girişi (idToken akışı) — Google'ın birebir eşi, tek fark sağlayıcı adı.
 * Apple'ın kendi ekranı (ASAuthorizationController) idToken veriyor, better-auth
 * onu Apple'ın açık anahtarıyla doğrulayıp oturumu açıyor; token'ın `aud`'u
 * uygulamanın bundle kimliği = sunucudaki APPLE_BUNDLE_ID.
 *
 * `nonce` GÖNDERİLMİYOR ve bu bilinçli — nedeni lib/appleAuth.ts'te yazılı.
 */
export async function signInAppleNative(idToken: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("sign-in/social", { provider: "apple", idToken: { token: idToken } }));
  } catch {
    return { ok: false, code: "NETWORK", message: t("common.connection_failed") };
  }
}

/**
 * Oturumdaki kullanıcının görünen adını değiştirir (Better Auth update-user).
 * Tek çağıran Apple girişi: Apple adı YALNIZ ilk yetkilendirmede ve idToken'ın
 * DIŞINDA veriyor, dolayısıyla sunucu onu token'dan okuyamıyor ve kullanıcı
 * "xxx@privaterelay.appleid.com" adıyla kalıyordu. Sessiz: ad yazılamazsa giriş
 * yine de geçerli.
 */
export async function updateUserName(name: string): Promise<boolean> {
  try {
    return (await post("update-user", { name })).ok;
  } catch {
    return false;
  }
}

/**
 * Apple girişinin authorization code'unu sunucuya bırakır (yalnız iOS).
 *
 * Hesap silinirken Apple tarafındaki izni iptal etmek App Store 5.1.1(v)'nin açık
 * koşulu; iptal edilebilen tek şey bu koddan üretilen refresh token — id token
 * iptal edilemiyor. Kod tek kullanımlık ve kısa ömürlü, o yüzden giriş biter
 * bitmez gönderiliyor. Sessiz: gitmezse giriş yine geçerli.
 */
export async function sendAppleAuthorizationCode(code: string): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/account/apple-code`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ code }),
    });
    return res.ok;
  } catch {
    return false;
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
    const res = await post("request-password-reset", { email, redirectTo: "https://www.lernomi.app/reset-password" });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Doğrulama e-postasını YENİDEN gönderir — web'deki "Tekrar gönder" düğmesinin
 * eşi (bkz. components/verify-email-notice).
 *
 * Uç oturum İSTEMİYOR: doğrulanmamış kullanıcının zaten oturumu yok. Kayıtlı
 * olmayan ya da zaten doğrulanmış bir adres için de aynı 200'ü döndürüyor
 * (better-auth email-verification.mjs, 500 ms'lik sabit taban) — yani bu uç
 * hesabın var olup olmadığını sızdırmıyor ve ekranda ayrı bir dal gerekmiyor.
 *
 * `callbackURL` doğrulama bittikten sonra TARAYICININ gideceği yer. Uygulamanın
 * derin bağlantısı henüz yok, o yüzden web'in kendi sayfası: kullanıcı orada
 * doğruluyor, uygulamaya dönüp giriş yapıyor.
 */
export async function sendVerificationEmail(email: string): Promise<AuthOutcome> {
  try {
    return await parse(await post("send-verification-email", { email, callbackURL: `${API_BASE}/learn` }));
  } catch {
    return { ok: false, code: "NETWORK", message: t("common.connection_failed") };
  }
}

/** Hesaba bağlı sağlayıcılar (credential = e-posta/parola, google …). */
export async function listAccounts(): Promise<{ providerId: string }[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/list-accounts`, { headers: { accept: "application/json" } });
    if (!res.ok) return [];
    const j = JSON.parse(await res.text()) as { providerId?: string }[];
    return Array.isArray(j) ? j.filter((a) => typeof a.providerId === "string").map((a) => ({ providerId: a.providerId! })) : [];
  } catch {
    return [];
  }
}

export type DeleteOutcome = { ok: true } | { ok: false; code: "PASSWORD" | "FRESH" | "NETWORK" | "OTHER"; message: string };

/**
 * Hesabı KALICI olarak siler — web'le aynı Better Auth ucu (delete-user).
 * Parola hesabı parolasını verir; yalnız Google ile girmiş hesapta parola yok,
 * sunucu "taze" oturum (24 saat) ister — eskiyse FRESH döner, çağıran yeniden
 * Google girişi yaptırıp tekrar dener. Sunucu tarafı tüm veriyi temizler
 * (bkz. web lib/account/purge.ts).
 */
export async function deleteAccount(password?: string): Promise<DeleteOutcome> {
  try {
    const res = await post("delete-user", password ? { password } : {});
    if (res.ok) return { ok: true };
    const text = await res.text().catch(() => "");
    let message = text.slice(0, 200);
    try { message = (JSON.parse(text) as { message?: string }).message ?? message; } catch { /* düz metin */ }
    const m = message.toLowerCase();
    if (m.includes("password")) return { ok: false, code: "PASSWORD", message: t("autherror.password_wrong") };
    if (m.includes("session") || m.includes("expired")) return { ok: false, code: "FRESH", message: t("autherror.fresh_login") };
    return { ok: false, code: "OTHER", message: message || t("autherror.not_deleted") };
  } catch {
    return { ok: false, code: "NETWORK", message: t("common.connection_failed") };
  }
}
