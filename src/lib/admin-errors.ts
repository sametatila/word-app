/**
 * Admin yazma uçlarının hata kodları → panelde gösterilen cümle (istemci ve
 * sunucu ortak, tek dil: panel yalnız ADMIN_EMAILS'e açık).
 */
const TEXT: Record<string, string> = {
  admin_2fa_required: "Bu işlem için hesabında iki adımlı doğrulama açık olmalı (Profil › Ayarlar › Güvenlik).",
  admin_reauth_required: "Bu hassas işlem için son 12 saatte açılmış bir oturum gerekiyor: çıkış yapıp yeniden giriş yap.",
  forbidden: "Yetki yok.",
  bad_input: "Geçersiz istek.",
  bad_json: "Geçersiz istek.",
  not_found: "Kayıt bulunamadı.",
  failed: "Sunucu hatası.",
  network: "Ağ hatası.",
};

export function adminErrorText(code: string | number | undefined | null): string {
  const k = String(code ?? "");
  return TEXT[k] ?? `Hata: ${k || "bilinmeyen"}`;
}
