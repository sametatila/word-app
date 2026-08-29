/**
 * Better Auth hata kodlarını Türkçe mesaja çevirir — web'deki
 * lib/auth/errors.ts ile aynı eşlemeler (mobil sürüm: code + message alır).
 */
export function translateAuthError(code: string, message: string): string {
  const c = (code || "").toUpperCase();
  const m = (message || "").toLowerCase();
  if (c === "NETWORK") return "Bağlantı kurulamadı. İnternetini kontrol et.";
  if (c.includes("EMAIL_NOT_VERIFIED") || m.includes("email not verified"))
    return "E-posta adresin henüz doğrulanmadı. Gelen kutundaki doğrulama bağlantısına tıkla.";
  if (c.includes("INVALID_EMAIL_OR_PASSWORD") || m.includes("invalid email or password"))
    return "E-posta veya parola hatalı.";
  if (c.includes("USER_ALREADY_EXISTS") || m.includes("already exists"))
    return "Bu e-posta zaten kayıtlı. Giriş yapmayı dene.";
  if (c.includes("USER_NOT_FOUND") || m.includes("user not found"))
    return "Bu e-postayla kayıtlı bir hesap bulunamadı.";
  if (c.includes("PASSWORD_TOO_SHORT") || m.includes("password is too short") || m.includes("too short"))
    return "Parola en az 8 karakter olmalı.";
  if (c.includes("INVALID_EMAIL") || m.includes("invalid email"))
    return "Geçerli bir e-posta adresi gir.";
  return message || "Bir sorun oldu, tekrar dene.";
}
