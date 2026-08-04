/** Neon Auth (Better Auth) hata kodlarını Türkçeye çevirir. */
export function translateAuthError(error: { code?: string; message?: string } | null): string {
  const code = (error?.code ?? "").toUpperCase();
  const msg = (error?.message ?? "").toLowerCase();

  if (code.includes("INVALID_EMAIL_OR_PASSWORD") || msg.includes("invalid email or password"))
    return "E-posta veya parola hatalı.";
  if (code.includes("USER_ALREADY_EXISTS") || msg.includes("already exists"))
    return "Bu e-posta zaten kayıtlı. Giriş yapmayı dene.";
  if (code.includes("EMAIL_NOT_VERIFIED") || msg.includes("not verified"))
    return "Önce e-postanı doğrulaman gerekiyor. Gelen kutunu kontrol et.";
  if (code.includes("PASSWORD_TOO_SHORT") || msg.includes("password is too short"))
    return "Parola en az 8 karakter olmalı.";
  if (code.includes("INVALID_TOKEN") || msg.includes("token"))
    return "Bağlantının süresi dolmuş. Yeni bir bağlantı iste.";
  if (code.includes("TOO_MANY") || msg.includes("rate limit"))
    return "Çok fazla deneme yapıldı. Birkaç dakika sonra tekrar dene.";
  if (msg.includes("email")) return "Geçerli bir e-posta gir.";
  return error?.message || "Bir şeyler ters gitti. Tekrar dene.";
}
