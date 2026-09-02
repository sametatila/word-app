import { Suspense } from "react";
import { SessionPlayer } from "@/components/session-player";
import { Leaderboard } from "@/components/leaderboard";
import { getUserId } from "@/lib/auth/server";
import { getLeaderboard, type LeaderboardWeek } from "@/lib/session";
import { CardSkeleton } from "@/components/skeleton";
import { FriendPulse } from "@/components/social/friend-pulse";

export const dynamic = "force-dynamic";

export default function LearnPage() {
  // Sıralama sunucuda hazırlanır ve oynatıcıya hazır işaretleme olarak geçer:
  // oyun sırasında ekranı meşgul etmesin diye yalnızca başlangıç kartında görünür.
  //
  // Ama BEKLENMEZ. Önceden sorgu burada `await` ediliyordu ve sayfanın ilk
  // baytı ona bağlıydı: on kişilik bir tabloyu toplamak, "bugün ne çalışacağım"
  // sorusunun cevabını geciktiriyordu. Sıra en alttaki, en az acele edilen
  // bölüm; sayfanın geri kalanı onu beklemek zorunda değil.
  //
  // Suspense ile kabuk anında gidiyor, tablo hazır olduğunda kendi yerine
  // akıyor. Yer tutucu tablonun boyunda: hazır olunca sayfa zıplamıyor.
  return (
    <SessionPlayer
      leaderboard={
        <Suspense fallback={<CardSkeleton height={168} label="Bu hafta sıralaması yükleniyor" />}>
          <LeaderboardSlot />
        </Suspense>
      }
    />
  );
}

async function LeaderboardSlot() {
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
  return (
    <>
      {week ? <Leaderboard week={week} /> : null}
      <FriendPulse />
    </>
  );
}
