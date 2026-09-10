import { translate, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";
/**
 * Better Auth hataları iki biçimde gelebilir:
 *  - metodun döndürdüğü `{ error }` nesnesi
 *  - fırlatılan istisna (BetterFetchError, Error, düz nesne…)
 * Her ikisini de tek bir `{ code, message, status }` biçimine indirir.
 */
type AuthErrorInfo = { code: string; message: string; status?: number };

function pick(obj: unknown, keys: string[]): unknown {
  if (typeof obj !== "object" || obj === null) return undefined;
  const rec = obj as Record<string, unknown>;
  for (const k of keys) if (rec[k] !== undefined) return rec[k];
  return undefined;
}

/** Hangi biçimde gelirse gelsin hatanın kodunu ve mesajını çıkarır. */
function extractAuthError(input: unknown): AuthErrorInfo {
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
export function translateAuthError(input: unknown, lang: NativeLang = DEFAULT_NATIVE): string {
  const { code, message, status } = extractAuthError(input);
  const msg = message.toLowerCase();
  const t = (key: string) => translate(lang, key);

  if (code === "EMAIL_NOT_VERIFIED" || msg.includes("email not verified"))
    return t("autherror.your_email_address_is_not");
  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || msg.includes("invalid email or password"))
    return t("autherror.email_or_password_is_wrong");
  /*
    Parola DEĞİŞTİRME akışında "şu anki parolan" yanlışsa better-auth
    INVALID_PASSWORD döndürüyor — giriş akışının INVALID_EMAIL_OR_PASSWORD'ünden
    ayrı bir kod. Eşlenmediği için ekranda ham İngilizce "Invalid password"
    görünüyordu.
  */
  if (code === "INVALID_PASSWORD" || msg === "invalid password")
    return t("autherror.password_wrong");
  if (code.includes("USER_ALREADY_EXISTS") || msg.includes("already exists"))
    return t("autherror.this_email_is_already_registered");
  /*
    Sosyal giriş, aynı e-postalı mevcut hesaba bağlanamadı: sağlayıcı e-postayı
    DOĞRULANMIŞ olarak bildirmedi (bkz. auth/server accountLinking). Genel
    "beklenmeyen hata" burada en kötü metin — kullanıcı kendi hesabının önünde
    durup ne yapacağını bilemiyor. Çıkış yolu söyleniyor.
  */
  if (code.includes("ACCOUNT_NOT_LINKED") || msg.includes("account not linked"))
    return t("autherrorw.account_not_linked");
  if (code.includes("USER_NOT_FOUND") || msg.includes("user not found"))
    return t("autherror.no_account_was_found_for_this");
  if (code.includes("PASSWORD_TOO_COMMON")) return t("autherror.password_too_common");
  if (code.includes("PASSWORD_CONTAINS_IDENTITY")) return t("autherror.password_contains_identity");
  if (
    code.includes("PASSWORD_TOO_SHORT") ||
    msg.includes("password is too short") ||
    msg.includes("at least")
  )
    return t("autherror.password_min_length");
  if (code.includes("INVALID_TOKEN") || code.includes("TOKEN_EXPIRED") || msg.includes("token"))
    return t("autherrorw.token_expired");
  if (status === 429 || code.includes("TOO_MANY") || msg.includes("rate limit"))
    return t("autherror.too_many");
  /*
    Bot koruması üç koddan biriyle düşüyor: başlık hiç yok (400
    MISSING_RESPONSE), Cloudflare jetonu reddetti (403 VERIFICATION_FAILED),
    doğrulama servisine ulaşılamadı (500 UNKNOWN_ERROR). Üçü de kullanıcı için
    aynı şey — doğrulama geçilemedi, tekrar denensin. 403 kuralının ÜSTÜNDE
    duruyor, yoksa "bu işlem için yetkin yok" yazardı.
  */
  if (code === "VERIFICATION_FAILED" || code === "MISSING_RESPONSE")
    return t("autherror.captcha_failed");
  /*
    İKİNCİ ADIMIN KODU. Yanlış, süresi dolmuş ve deneme hakkı tükenmiş —
    kullanıcı için üçü de aynı: bu kod işe yaramaz, yenisini iste. Ayrı
    metinler yazmak, saldırgana kodun hangi sebeple düştüğünü de söylerdi.
    `INVALID_TWO_FACTOR_COOKIE` burada DEĞİL: o "giriş denemen düştü"
    demek ve ekran onu ayrıca karşılıyor (bkz. two-factor-form).
  */
  if (
    code === "INVALID_CODE" ||
    code === "OTP_HAS_EXPIRED" ||
    code === "TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE"
  )
    return t("autherror.invalid_code");
  if (status === 403 || code.includes("FORBIDDEN"))
    return t("autherrorw.forbidden");
  if (msg.includes("failed to fetch") || msg.includes("networkerror") || msg.includes("load failed"))
    return t("autherrorw.network");
  if (msg.includes("email")) return t("autherror.enter_valid_email_address");

  return message || t("autherror.something_went_wrong_try_again");
}

/** Giriş sırasında doğrulama bekleyen hesabı ayırt etmek için. */
export function isEmailNotVerified(input: unknown): boolean {
  const { code, message } = extractAuthError(input);
  return code === "EMAIL_NOT_VERIFIED" || message.toLowerCase().includes("email not verified");
}
