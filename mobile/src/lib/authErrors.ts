import { t } from "./i18n";

/**
 * Better Auth hata kodlarını kullanıcının diline çevirir — web'deki
 * lib/auth/errors.ts ile aynı eşlemeler (mobil sürüm: code + message alır).
 * Sunucudan gelen ham `message` yalnız eşleşme bulunamazsa gösterilir.
 */
export function translateAuthError(code: string, message: string): string {
  const c = (code || "").toUpperCase();
  const m = (message || "").toLowerCase();
  if (c === "NETWORK") return t("autherror.baglanti_kurulamadi_internetini_ko");
  if (c.includes("EMAIL_NOT_VERIFIED") || m.includes("email not verified"))
    return t("autherror.e_posta_adresin_henuz_dogrulanmadi");
  if (c.includes("INVALID_EMAIL_OR_PASSWORD") || m.includes("invalid email or password"))
    return t("autherror.e_posta_veya_parola_hatali");
  if (c.includes("USER_ALREADY_EXISTS") || m.includes("already exists"))
    return t("autherror.bu_e_posta_zaten_kayitli_giris_yap");
  if (c.includes("USER_NOT_FOUND") || m.includes("user not found"))
    return t("autherror.bu_e_postayla_kayitli_bir_hesap_bu");
  if (c.includes("PASSWORD_TOO_SHORT") || m.includes("password is too short") || m.includes("too short"))
    return t("autherror.parola_en_az_8_karakter_olmali");
  if (c.includes("INVALID_EMAIL") || m.includes("invalid email"))
    return t("autherror.gecerli_bir_e_posta_adresi_gir");
  return message || t("autherror.bir_sorun_oldu_tekrar_dene");
}
