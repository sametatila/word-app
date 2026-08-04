import { SessionPlayer } from "@/components/session-player";
import { Leaderboard } from "@/components/leaderboard";
import { getUserId } from "@/lib/auth/server";
import { getLeaderboard, type LeaderboardRow } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  // Sıralama sunucuda hazırlanır ve oynatıcıya hazır işaretleme olarak geçer:
  // oyun sırasında ekranı meşgul etmesin diye yalnızca başlangıç kartında görünür.
  let rows: LeaderboardRow[] = [];
  try {
    const userId = await getUserId();
    if (userId) rows = await getLeaderboard(userId);
  } catch (err) {
    // Sıralama okunamazsa oturum yine açılır — bu bilgi ikincildir.
    console.error("[learn] sıralama okunamadı", err);
  }

  // min-h-0 şart: olmazsa flex çocuk kendi içeriği kadar büyür ve oyun alanı
  // kalan yüksekliği bilemeyip taşar.
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SessionPlayer leaderboard={rows.length ? <Leaderboard rows={rows} /> : null} />
    </div>
  );
}
