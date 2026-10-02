import { redirect } from "next/navigation";
import { titleMeta } from "@/lib/page-meta";
import { getAccountUserId } from "@/lib/auth/server";
import { DemoPlacement } from "@/components/placement/demo-placement";

/* Arama motoruna kapalı: sayfa istemcide çiziliyor, sunucu çıktısı yalnız
   başlık. Boş sayfa indekste kalitesiz sonuç sayılır; aramadan gelen
   tanıtım sayfasından buraya ulaşıyor (bkz. `sitemap.ts`). */
export const generateMetadata = titleMeta("placement.title", { noindex: true });
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
  if (await getAccountUserId()) redirect("/placement");
  return <DemoPlacement />;
}
