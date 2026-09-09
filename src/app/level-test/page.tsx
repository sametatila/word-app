import { redirect } from "next/navigation";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { DemoPlacement } from "@/components/placement/demo-placement";

export const generateMetadata = titleMeta("placement.title");
export const dynamic = "force-dynamic";

/**
 * Giriş öncesi seviye testi — hesap AÇILMADAN önce. Bu yüzden `(app)` grubunun
 * dışında: kabuk yok, oturum yok, sekme çubuğu yok. `/first-words` ile aynı
 * sınıftan bir sayfa; mobilde de kök yığında, sekmelerin dışında bir ekran.
 *
 * Oturum açıkken gerçek yerleştirme testi (`/placement`) dört aşamalı ve
 * sunucuda puanlanıyor; burası ona rakip değil, önündeki adım.
 */
export default async function LevelTestPage() {
  if (await getUserId()) redirect("/placement");
  return <DemoPlacement />;
}
