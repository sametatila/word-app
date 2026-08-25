import { getUserId } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/lib/session";
import { CheatsheetView } from "@/components/cheatsheet/cheatsheet-view";

export const metadata = { title: "Dilbilgisi" };

/**
 * Dilbilgisi başvurusu — ders yolunun yanındaki referans ekranı.
 *
 * Sunucuda yapılan tek iş kullanıcının seviyesini okumak: ekran o seviyenin
 * sekmesinde açılıyor. İçeriğin kendisi kod ve kullanıcıya göre değişmiyor
 * (bkz. src/lib/cheatsheet/index.ts), o yüzden burada başka sorgu yok.
 */
export default async function CheatsheetPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const profile = await ensureProfile(userId);

  return <CheatsheetView userLevel={profile.level} />;
}
