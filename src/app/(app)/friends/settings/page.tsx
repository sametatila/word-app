import { redirect } from "next/navigation";

/**
 * Eski adres. Sosyal ayarlar (kullanıcı adı, görünürlük, izinler,
 * engellenenler) 2026-09-28'de Ayarlar'a taşındı: kullanıcı adı Hesap'ta,
 * gerisi Gizlilik'te (bkz. `docs/plan/profil-ayarlar-topluluk.md`). Bildirim
 * ve e-postalardaki eski bağlantılar kırılmasın diye adres yönleniyor.
 */
export default function SocialSettingsRedirect() {
  redirect("/profile/settings/privacy");
}
