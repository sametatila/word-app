import { PageBack } from "@/components/page-back";
import { titleMeta } from "@/lib/page-meta";
import { AchievementWall } from "@/components/achievement-wall";
import { getT } from "@/lib/i18n/server";

export const generateMetadata = titleMeta("achievements.achievements");
/**
 * Başarımlar — mobilde kendi ekranı (`AchievementsScreen`), web'de profilin
 * ortasına gömülüydü. Rozet duvarı elli dört rozetlik bir ızgara: profilin
 * içinde dururken hem sayfayı üç ekran boyu uzatıyor hem de altındaki menüyü
 * görünmez kılıyordu.
 */
export default async function AchievementsPage() {
  const t = await getT();
  return (
    <div className="mx-auto w-full max-w-3xl">
      <PageBack fallback="/profile" title={t("achievements.achievements")} />
      <AchievementWall />
    </div>
  );
}
