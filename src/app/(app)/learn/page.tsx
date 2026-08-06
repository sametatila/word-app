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

  // Sarmalayıcı artık burada değil: kalan alana çakılmak mı yoksa içerikle
  // birlikte büyümek mi gerektiği ekrana göre değişiyor ve bunu yalnızca
  // oynatıcı biliyor.
  return <SessionPlayer leaderboard={rows.length ? <Leaderboard rows={rows} /> : null} />;
}
