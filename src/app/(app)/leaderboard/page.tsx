import { PageBack } from "@/components/page-back";
import { getUserId } from "@/lib/auth/server";
import { getLeaderboard, type LeaderboardWeek } from "@/lib/session";
import { Leaderboard } from "@/components/leaderboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Haftalık sıralama" };

/**
 * Haftalık sıralama — mobilde Profil'den açılan kendi ekranı
 * (`LeaderboardScreen`), web'de Öğren sekmesinin dibinde duruyordu.
 *
 * Öğren merkezindeki kopyası kalkmadı: orada bir NABIZ, burada tablonun
 * kendisi. Ama artık kendi adresi var, yani paylaşılabiliyor ve profilden
 * doğrudan ulaşılıyor.
 */
export default async function LeaderboardPage() {
  const userId = await getUserId();
  if (!userId) return null;

  let week: LeaderboardWeek | null = null;
  try {
    // Hafta sınırı sunucunun gününden: tablo herkes için aynı anda dönmeli.
    week = await getLeaderboard(userId, new Date().toISOString().slice(0, 10));
  } catch (err) {
    console.error("[leaderboard] okunamadı", err);
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <PageBack fallback="/profile" title="Haftalık sıralama" />
      {week ? (
        <Leaderboard week={week} />
      ) : (
        <p className="card p-5 text-body" style={{ color: "var(--text-muted)" }}>
          Sıralama şu anda okunamadı. Birkaç saniye sonra tekrar dene.
        </p>
      )}
    </div>
  );
}
