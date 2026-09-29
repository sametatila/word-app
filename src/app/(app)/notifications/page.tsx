import { redirect } from "next/navigation";

/**
 * Eski adres. Hatırlatma ayarları 2026-09-29'da Ayarlar'ın içine taşındı
 * (`/profile/settings/reminders`; Samet: web ayarlar masaüstü düzeni). Burası
 * ayarların dışında kendi başına bir sayfaydı — masaüstünde sol menüsüz,
 * kabuğun menüsünde "Ayarlar" seçili değil. Yer imleri ve eski bağlantılar
 * kırılmasın diye adres yönleniyor (`/friends/settings` ile aynı kalıp).
 *
 * Tarihçe: bu adres bir ara `<Inbox />`i çiziyordu (gelen kutusu `/inbox`);
 * mobildeki ayrım gibi burası HATIRLATMALAR, gelen kutusu değil.
 */
export default function NotificationsRedirect() {
  redirect("/profile/settings/reminders");
}
