import { t } from "./i18n";

/**
 * Better Auth hata kodlarını kullanıcının diline çevirir — web'deki
 * lib/auth/errors.ts ile aynı eşlemeler (mobil sürüm: code + message alır).
 * Sunucudan gelen ham `message` yalnız eşleşme bulunamazsa gösterilir.
 */
export function translateAuthError(code: string, message: string): string {
  const c = (code || "").toUpperCase();
  const m = (message || "").toLowerCase();
  if (c === "NETWORK") return t("autherror.could_not_connect_check_your");
  if (c.includes("EMAIL_NOT_VERIFIED") || m.includes("email not verified"))
    return t("autherror.your_email_address_is_not");
  if (c.includes("INVALID_EMAIL_OR_PASSWORD") || m.includes("invalid email or password"))
    return t("autherror.email_or_password_is_wrong");
  if (c.includes("USER_ALREADY_EXISTS") || m.includes("already exists"))
    return t("autherror.this_email_is_already_registered");
  if (c.includes("USER_NOT_FOUND") || m.includes("user not found"))
    return t("autherror.no_account_was_found_for_this");
  if (c.includes("PASSWORD_TOO_SHORT") || m.includes("password is too short") || m.includes("too short"))
    return t("autherror.password_must_be_at_least_8");
  if (c.includes("INVALID_EMAIL") || m.includes("invalid email"))
    return t("autherror.enter_valid_email_address");
  return message || t("autherror.something_went_wrong_try_again");
}
