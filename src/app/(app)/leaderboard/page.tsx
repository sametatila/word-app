import { redirect } from "next/navigation";

/**
 * Eski adres. Haftalık lig 2026-09-28'de Topluluk sekmesinin ilk görünümü
 * oldu (Lig · Arkadaşlar · Akış; bkz. `docs/plan/profil-ayarlar-topluluk.md`).
 * Eski bildirim ve e-posta bağlantıları kırılmasın diye adres oraya yönleniyor.
 */
export default function LeaderboardRedirect() {
  redirect("/friends?tab=league");
}
