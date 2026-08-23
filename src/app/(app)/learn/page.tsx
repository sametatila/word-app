import { SessionPlayer } from "@/components/session-player";
import { Leaderboard } from "@/components/leaderboard";
import { getUserId } from "@/lib/auth/server";
import { getLeaderboard, type LeaderboardWeek } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  // Sıralama sunucuda hazırlanır ve oynatıcıya hazır işaretleme olarak geçer:
  // oyun sırasında ekranı meşgul etmesin diye yalnızca başlangıç kartında görünür.
  let week: LeaderboardWeek | null = null;
  try {
    const userId = await getUserId();
    // Hafta sınırı sunucunun gününden: tablo herkes için aynı anda dönmeli,
    // yoksa farklı saat dilimlerindeki iki kişi farklı haftalarda yarışır.
    if (userId) week = await getLeaderboard(userId, new Date().toISOString().slice(0, 10));
  } catch (err) {
    // Sıralama okunamazsa oturum yine açılır — bu bilgi ikincildir.
    console.error("[learn] sıralama okunamadı", err);
  }

  // Sarmalayıcı artık burada değil: kalan alana çakılmak mı yoksa içerikle
  // birlikte büyümek mi gerektiği ekrana göre değişiyor ve bunu yalnızca
  // oynatıcı biliyor.
  return <SessionPlayer leaderboard={week ? <Leaderboard week={week} /> : null} />;
}
