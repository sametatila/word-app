import { t } from "./i18n";
import { MIN_PASSWORD_LENGTH } from "./passwordPolicy";

/**
 * Better Auth hata kodlarını kullanıcının diline çevirir — web'deki
 * lib/auth/errors.ts ile aynı eşlemeler (mobil sürüm: code + message alır).
 * Sunucudan gelen ham `message` ekrana çıkmaz: yalnız eşleşmede ipucu
 * olarak okunur, tanınmayan hata sözlükteki genel cümleye düşer.
 */
/**
 * Doğrulama bekleyen hesap mı — web'deki `isEmailNotVerified`in eşi.
 *
 * Bu bir hata değil, eksik bir adım: çağıran kullanıcıyı kırmızı bir satırla
 * baş başa bırakmak yerine doğrulama ekranına alıyor (bkz. AuthScreen).
 */
export function isEmailNotVerified(code: string, message: string): boolean {
  return (code || "").toUpperCase().includes("EMAIL_NOT_VERIFIED")
    || (message || "").toLowerCase().includes("email not verified");
}

export function translateAuthError(code: string, message: string, status = 0): string {
  const c = (code || "").toUpperCase();
  const m = (message || "").toLowerCase();
  if (c === "NETWORK") return t("autherror.could_not_connect_check_your");
  // İnternet var ama Lernomi'ye bu ağdan ulaşılamıyor (bkz. lib/reachability).
  if (c === "BLOCKED") return t("common.network_blocked");
  /*
    HIZ SINIRI. İki ayrı kaynaktan gelebiliyor ve ikisinin de gövdesi
    çevrilemez: Better Auth düz bir İngilizce cümle döndürüyor, nginx ise bir
    HTML hata sayfası. Kod alanı ikisinde de boş, o yüzden tek ayırt edici
    durum kodu. Bu dal olmadan kullanıcı ekranda ham İngilizce (ya da ham
    HTML) görüyordu — web'de aynı eşleme baştan vardı.
  */
  if (status === 429 || m.includes("too many requests")) return t("autherror.too_many");
  /*
    Bot koruması üç koddan biriyle düşüyor: başlık hiç yok (MISSING_RESPONSE),
    Cloudflare jetonu reddetti (VERIFICATION_FAILED) ya da doğrulama servisine
    ulaşılamadı (UNKNOWN_ERROR). Kullanıcı için üçü de aynı: doğrulama
    geçilemedi, tekrar denesin.
  */
  if (c === "VERIFICATION_FAILED" || c === "MISSING_RESPONSE") return t("autherror.captcha_failed");
  /*
    İkinci adımın kodu: yanlış, süresi dolmuş ve deneme hakkı tükenmiş — üçü
    de kullanıcı için aynı sonuç. Ayrı metin, kodun hangi sebeple düştüğünü
    söylemek olurdu.
  */
  // Askıya alınmış hesap (web lib/auth/errors ile aynı kod).
  if (c === "ACCOUNT_SUSPENDED") return t("auth.suspended");
  if (c === "INVALID_CODE" || c === "OTP_HAS_EXPIRED" || c === "TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE")
    return t("autherror.invalid_code");
  if (c.includes("EMAIL_NOT_VERIFIED") || m.includes("email not verified"))
    return t("autherror.your_email_address_is_not");
  if (c.includes("INVALID_EMAIL_OR_PASSWORD") || m.includes("invalid email or password"))
    return t("autherror.email_or_password_is_wrong");
  /*
    Parola DEĞİŞTİRME akışında "şu anki parolan" yanlışsa better-auth
    INVALID_PASSWORD döndürüyor — giriş akışının INVALID_EMAIL_OR_PASSWORD'ünden
    ayrı bir kod. Eşlenmezse ekranda ham İngilizce "Invalid password" görünür.
  */
  if (c === "INVALID_PASSWORD" || m === "invalid password") return t("autherror.password_wrong");
  if (c.includes("USER_ALREADY_EXISTS") || m.includes("already exists"))
    return t("autherror.this_email_is_already_registered");
  if (c.includes("USER_NOT_FOUND") || m.includes("user not found"))
    return t("autherror.no_account_was_found_for_this");
  if (c.includes("PASSWORD_TOO_COMMON")) return t("autherror.password_too_common");
  if (c.includes("PASSWORD_CONTAINS_IDENTITY")) return t("autherror.password_contains_identity");
  if (c.includes("PASSWORD_TOO_SHORT") || m.includes("password is too short") || m.includes("too short"))
    return t("autherror.password_min_length", { n: MIN_PASSWORD_LENGTH });
  if (c.includes("PASSWORD_TOO_LONG") || m.includes("password too long"))
    return t("autherror.password_max_length");
  if (c === "SESSION_EXPIRED" || c === "SESSION_NOT_FRESH") return t("autherror.fresh_login");
  if (c.includes("INVALID_TOKEN") || c.includes("TOKEN_EXPIRED")) return t("autherror.token_expired");
  if (c.includes("ACCOUNT_NOT_LINKED") || m.includes("account not linked"))
    return t("autherror.account_not_linked");
  if (c.includes("INVALID_EMAIL") || m.includes("invalid email"))
    return t("autherror.enter_valid_email_address");
  /*
    HAM MESAJ EKRANA ÇIKMIYOR. `message` better-auth'un İngilizce cümlesi ya
    da (gövde JSON değilse) nginx'in HTML sayfasının ilk 200 karakteri
    olabiliyor (bkz. auth.ts `request`). Eskiden eşlenmeyen her hatada o
    gösteriliyordu; Türkçe ve Almanca arayüzde İngilizce, bazen HTML.
  */
  return t("autherror.something_went_wrong_try_again");
}
