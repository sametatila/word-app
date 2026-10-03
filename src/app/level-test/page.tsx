import { redirect } from "next/navigation";
import { titleMeta } from "@/lib/page-meta";
import { getAccountUserId } from "@/lib/auth/server";
import { PlacementTest } from "@/components/placement/placement-test";

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
 * Oturum açıkken `/placement` AYNI testi (v2) çözer; burada sonuç ve cevaplar onboarding
 * tercihlerine yazılır, hesap açılınca `OnboardingAdopt` sunucuya kaydeder.
 */
export default async function LevelTestPage() {
  if (await getAccountUserId()) redirect("/placement");
  return <PlacementTest signedIn={false} />;
}
