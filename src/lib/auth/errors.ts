/**
 * Neon Auth (Better Auth) hataları iki biçimde gelebilir:
 *  - metodun döndürdüğü `{ error }` nesnesi
 *  - fırlatılan istisna (BetterFetchError, Error, düz nesne…)
 * Her ikisini de tek bir `{ code, message, status }` biçimine indirir.
 */
export type AuthErrorInfo = { code: string; message: string; status?: number };

function pick(obj: unknown, keys: string[]): unknown {
  if (typeof obj !== "object" || obj === null) return undefined;
  const rec = obj as Record<string, unknown>;
  for (const k of keys) if (rec[k] !== undefined) return rec[k];
  return undefined;
}

/** Hangi biçimde gelirse gelsin hatanın kodunu ve mesajını çıkarır. */
export function extractAuthError(input: unknown): AuthErrorInfo {
  const seen = new Set<unknown>();
  let code = "";
  let message = "";
  let status: number | undefined;

  const visit = (node: unknown, depth: number) => {
    if (!node || depth > 4 || seen.has(node)) return;
    if (typeof node === "string") {
      // Bazı istemciler gövdeyi JSON metni olarak fırlatır
      const trimmed = node.trim();
      if (trimmed.startsWith("{")) {
        try {
          visit(JSON.parse(trimmed), depth + 1);
        } catch {
          if (!message) message = trimmed;
        }
      } else if (!message) {
        message = trimmed;
      }
      return;
    }
    if (typeof node !== "object") return;
    seen.add(node);

    const c = pick(node, ["code", "errorCode", "error_code"]);
    if (typeof c === "string" && !code) code = c;

    const m = pick(node, ["message", "error_description", "statusText"]);
    if (typeof m === "string" && !message) message = m;

    const s = pick(node, ["status", "statusCode"]);
    if (typeof s === "number" && status === undefined) status = s;

    for (const key of ["error", "body", "data", "response", "cause"]) {
      const child = (node as Record<string, unknown>)[key];
      if (child) visit(child, depth + 1);
    }
  };

  visit(input, 0);
  return { code: code.toUpperCase(), message, status };
}

/** Kullanıcıya gösterilecek Türkçe metin. */
export function translateAuthError(input: unknown): string {
  const { code, message, status } = extractAuthError(input);
  const msg = message.toLowerCase();

  if (code === "EMAIL_NOT_VERIFIED" || msg.includes("email not verified"))
    return "E-posta adresin henüz doğrulanmadı. Gelen kutundaki doğrulama bağlantısına tıkla.";
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || msg.includes("invalid email or password"))
    return "E-posta veya parola hatalı.";
  if (code.includes("USER_ALREADY_EXISTS") || msg.includes("already exists"))
    return "Bu e-posta zaten kayıtlı. Giriş yapmayı dene.";
  if (code.includes("USER_NOT_FOUND") || msg.includes("user not found"))
    return "Bu e-postayla kayıtlı bir hesap bulunamadı.";
  if (
    code.includes("PASSWORD_TOO_SHORT") ||
    msg.includes("password is too short") ||
    msg.includes("at least 8")
  )
    return "Parola en az 8 karakter olmalı.";
  if (code.includes("INVALID_TOKEN") || code.includes("TOKEN_EXPIRED") || msg.includes("token"))
    return "Bağlantının süresi dolmuş ya da geçersiz. Yeni bir bağlantı iste.";
  if (status === 429 || code.includes("TOO_MANY") || msg.includes("rate limit"))
    return "Çok fazla deneme yapıldı. Birkaç dakika sonra tekrar dene.";
  if (status === 403 || code.includes("FORBIDDEN"))
    return "Bu işlem için yetkin yok. Adres listesi (Domains) ayarını kontrol et.";
  if (msg.includes("failed to fetch") || msg.includes("networkerror") || msg.includes("load failed"))
    return "İnternet bağlantısı kurulamadı. Bağlantını kontrol edip tekrar dene.";
  if (msg.includes("email")) return "Geçerli bir e-posta adresi gir.";

  return message || "Beklenmeyen bir hata oluştu. Tekrar dene.";
}

/** Giriş sırasında doğrulama bekleyen hesabı ayırt etmek için. */
export function isEmailNotVerified(input: unknown): boolean {
  const { code, message } = extractAuthError(input);
  return code === "EMAIL_NOT_VERIFIED" || message.toLowerCase().includes("email not verified");
}

/**
 * Neon Auth çağrılarını tek biçimde çalıştırır: hata ister dönsün ister fırlatılsın
 * `{ ok: false, err }` olarak gelir.
 */
export async function runAuth<T>(
  fn: () => Promise<T>,
): Promise<{ ok: true; data: T } | { ok: false; err: unknown }> {
  try {
    const data = await fn();
    const maybe = data as { error?: unknown } | null;
    if (maybe && typeof maybe === "object" && maybe.error) return { ok: false, err: maybe.error };
    return { ok: true, data };
  } catch (err) {
    return { ok: false, err };
  }
}
