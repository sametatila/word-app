import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { isPremium } from "@/lib/premium";
import { ProfileView } from "@/components/profile/profile-view";

export const dynamic = "force-dynamic";

/**
 * Profil — "ben" ekranının kapısı.
 *
 * Eskiden burası bir panoydu: kimlik, seviye, iki haftalık ritim, yetkinlik
 * paneli, rozet duvarı ve beş satırlık menü tek sayfada üst üsteydi. Bloklar
 * artık kendi adreslerinde (`/profile/progress`, `/profile/achievements`) ve
 * bu sayfa yalnız kim olduğunu, ne biriktirdiğini ve nereye gidebileceğini
 * söylüyor — mobil `ProfileScreen` ile aynı kurgu.
 */
export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    const today = new Date().toISOString().slice(0, 10);
    // İstatistikler okunamazsa sayfa yine açılıyor: kimlik ve bağlantılar
    // ilerlemeye bağlı değil, yalnız sayılar sıfır görünür.
    const data = await getProgress(user.id, today).catch((err) => {
      console.error("[profile] ilerleme okunamadı", err);
      return null;
    });

    return (
      <ProfileView
        stats={{
          name: profile.displayName || user.name || "Öğrenci",
          email: user.email ?? null,
          streak: profile.currentStreak,
          xp: profile.totalXp,
          mastered: data ? data.levels.reduce((s, l) => s + l.mastered, 0) : 0,
          seconds: data?.seconds ?? 0,
          premium: await isPremium(user.id),
        }}
      />
    );
  } catch (err) {
    console.error("[profile page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-h3">Profil yüklenemedi</h2>
        <p className="muted mt-2 text-body">
          Veritabanı bağlantısını kontrol et: <code>npm run db:push</code>.
        </p>
      </div>
    );
  }
}
