import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { ProfileForm } from "@/components/profile-form";
import { ProgressView } from "@/components/progress-view";
import { AchievementWall } from "@/components/achievement-wall";
import { WritingsCard } from "@/components/writings-card";
import { CandoCard } from "@/components/cando-card";
import { PlacementCard } from "@/components/placement-card";
import { ProficiencyCard } from "@/components/proficiency-card";
import { WeakSpotsCard } from "@/components/weak-spots-card";
import { GrowthCard } from "@/components/growth-card";
import { ExamsCard } from "@/components/exams-card";
import { lastPlacement, RETAKE_DAYS } from "@/lib/placement";
import { examHistory } from "@/lib/exam";
import { weeklyHistory } from "@/lib/weekly";

export const dynamic = "force-dynamic";

function localDayFallback() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Profil sayfası: kimlik + ilerleme + ayarlar tek yerde.
 *
 * Bölüm sırası (WP-64): kimlik + seri → Yetkinlik → Zayıf noktaların →
 * Gelişim → Yapabildiklerim → Sınavlarım + seviye testi → Rozetler → kelime
 * kapsamı/ilerleme → Yazılarım → Ayarlar. Önce "neredeyim", sonra "nerede
 * zayıfım", sonra "ne kadar ilerledim", en sonda arşiv ve ayarlar. Rozetler
 * ve kelime grafikleri eskiden en üstteydi; öğrenme ölçümleri gelince yerini
 * onlara bıraktı — rozet süs, yetkinlik bilgi.
 */
export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    const today = localDayFallback();
    const data = await getProgress(user.id, today);
    const placement = await lastPlacement(user.id).catch(() => null);
    const canRetake = !placement || Date.now() - new Date(placement.at).getTime() >= RETAKE_DAYS * 86400000;
    // Sınav arşivi (WP-64): okunamazsa kart boş görünür, sayfa açılır.
    const [exams, weekly] = await Promise.all([examHistory(user.id, 8).catch(() => []), weeklyHistory(user.id, 8).catch(() => [])]);

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
        {/* Yetkinlik (WP-50): beceri × seviye kanıt çubukları + sıradaki adım. */}
        <ProficiencyCard />
        {/* Zayıf noktaların (WP-51): hata tipleri, karıştırmalar, hedefli tur. */}
        <WeakSpotsCard />
        {/* Gelişim (WP-52): 8 haftalık çizgiler, yetkinlik değişimi, kilometre taşları. */}
        <GrowthCard />
        {/* Yapabildiklerim (WP-43): CEFR can-do kanıtları. */}
        <CandoCard />
        {/* Sınavlarım (WP-41/42): seviye/modül sınavları, sertifikalar, haftalık puanlar. */}
        <ExamsCard history={exams} weekly={weekly} level={profile.level} />
        {/* Seviye testi (WP-40): son sonuç, yeniden alma. */}
        <PlacementCard last={placement} canRetake={canRetake} retakeDays={RETAKE_DAYS} level={profile.level} />
        <AchievementWall />
        <ProgressView
          levels={data.levels}
          days={data.days.map((d) => ({
            day: String(d.day),
            reviews: d.reviews,
            correct: d.correct,
            xp: d.xp,
          }))}
          dueNow={data.dueNow}
          upcoming={data.upcoming}
          games={data.games}
          seconds={data.seconds}
          leeches={data.leeches}
          streak={data.profile.currentStreak}
          longest={data.profile.longestStreak}
          today={today}
        />
        {/* Yazılarım (WP-30): değerlendirme arşivi, silme. */}
        <WritingsCard />
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
