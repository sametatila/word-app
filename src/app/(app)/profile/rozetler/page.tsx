import { PageBack } from "@/components/page-back";
import { AchievementWall } from "@/components/achievement-wall";

export const metadata = { title: "Rozetler" };

/**
 * Rozetler kendi sayfasında.
 *
 * Profilde katlanmış bir "Arşiv" başlığının altındaydı ve orada iki kez
 * gizleniyordu: hem kapalıydı hem de kimsenin adını aramadığı bir kutunun
 * içindeydi. Rozet bir arşiv kaydı değil, bakılmak için kazanılan bir şey.
 */
export default function BadgesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <PageBack href="/profile" title="Rozetler" subtitle="Kazandıkların ve sıradakiler" />
      <AchievementWall />
    </div>
  );
}
