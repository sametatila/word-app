/**
 * Misafir kimliklerinin yer tutucu e-posta alanı.
 *
 * better-auth'un `user.email` alanı zorunlu ve benzersiz; misafirde gerçek bir
 * adres yok. `.invalid` üst alan adı RFC 2606 ile ayrılmış ve hiçbir zaman
 * çözülmüyor, yani bu adrese giden posta hiçbir kutuya düşemez. Yine de posta
 * yolu adresi baştan eliyor (bkz. lib/email `sendEmail`): gönderim denemesi
 * SMTP sağlayıcısında geri dönen posta birikir ve gönderici itibarını düşürür.
 *
 * Bu dosya bilerek bağımsız: hem auth yapılandırması hem posta katmanı onu
 * okuyor ve ikisi birbirini içe aktarıyor.
 */
export const GUEST_EMAIL_DOMAIN = "guest.lernomi.invalid";

export function isGuestEmail(address: string | null | undefined): boolean {
  return typeof address === "string" && address.toLowerCase().endsWith(`@${GUEST_EMAIL_DOMAIN}`);
}
