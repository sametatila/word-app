import { PageBack } from "@/components/page-back";
import { AchievementWall } from "@/components/achievement-wall";

export const metadata = { title: "Başarımlar" };

/**
 * Başarımlar — mobilde kendi ekranı (`AchievementsScreen`), web'de profilin
 * ortasına gömülüydü. Rozet duvarı elli dört rozetlik bir ızgara: profilin
 * içinde dururken hem sayfayı üç ekran boyu uzatıyor hem de altındaki menüyü
 * görünmez kılıyordu.
 */
export default function AchievementsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <PageBack fallback="/profile" title="Başarımlar" />
      <AchievementWall />
    </div>
  );
}
