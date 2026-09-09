import { PageBack } from "@/components/page-back";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { LeaderboardTabs } from "@/components/social/leaderboard-tabs";
import { getT } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("profile.weekly_leaderboard");
/**
 * Haftalık sıralama — iki küme, tek sayfa: LİG ve ARKADAŞLAR.
 *
 * Üçüncü bir "herkes" tablosu yok, çünkü lig zaten o. Düz genel tablo
 * kaldırıldı: on iki kullanıcıda işe yarıyordu, büyüdükçe ilk onu motive edip
 * geri kalanı kırardı. Lig aynı XP'yi otuz kişilik gruplara bölüyor —
 * kullanıcı hep yenebileceği bir tabloya bakıyor.
 */
export default async function LeaderboardPage() {
  const t = await getT();
  const userId = await getUserId();
  if (!userId) return null;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <PageBack fallback="/profile" title={t("lb.weekly")} />
      <LeaderboardTabs />
    </div>
  );
}
