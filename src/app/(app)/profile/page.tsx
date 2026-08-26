import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";
import { ArchiveCard } from "@/components/archive-card";

export const dynamic = "force-dynamic";

/**
 * Profil: kimlik + ayarlar + arşiv. Üç bölüm, o kadar.
 *
 * Buraya on üç bölüm birikmişti ve üç ayrı iş yapıyorlardı: ölçüm (yetkinlik,
 * zayıf noktalar, gelişim, yapabildiklerim, dört grafik), arşiv (sınavlar,
 * yazılar, seviye testi, rozetler) ve ayar. Sonuç şuydu — sesi kapatmak
 * isteyen biri altı ölçüm kartını geçmek zorundaydı.
 *
 * Ölçümlerin hepsi zaten başka bir evi olan şeylerdi:
 *
 *   yetkinlik · zayıf noktalar · gelişim · yapabildiklerim → /skills panosu
 *   sınavlar · seviye testi                               → /skills Sınav sekmesi
 *   kelime grafikleri                                     → /words
 *
 * İlk üçü Becerilerde ZATEN çiziliyordu; profil onları ikinci kez hesaplayıp
 * ikinci kez çiziyordu. Taşıma bir özellik silmiyor, bir kopyayı siliyor.
 *
 * Geriye kalan arşiv (rozetler, yazılar) katlanmış duruyor: bir kez bakılıp
 * bırakılan şeyler, her açılışta ayar aramanın önüne geçmemeli.
 */
export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);

    return (
      <ProfileForm
        authEnabled={authEnabled}
        accountName={user.name}
        userId={user.id}
        initial={{
          displayName: profile.displayName ?? "",
          dailyGoal: profile.dailyGoal,
          newPerDay: profile.newPerDay,
          level: profile.level,
          course: profile.course,
          voice: profile.voice ?? null,
          currentStreak: profile.currentStreak,
          longestStreak: profile.longestStreak,
          totalXp: profile.totalXp,
        }}
      >
        <ArchiveCard />
      </ProfileForm>
    );
  } catch (err) {
    console.error("[profile page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Profil yüklenemedi</h2>
        <p className="muted mt-2 text-sm">
          Veritabanı bağlantısını kontrol et: <code>npm run db:push</code>.
        </p>
      </div>
    );
  }
}
