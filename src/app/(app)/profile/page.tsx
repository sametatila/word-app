import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { Avatar } from "@/components/avatar";
import { ProfileMenu } from "@/components/profile-menu";
import { ActivityProgress } from "@/components/progress-view";
import { AchievementWall } from "@/components/achievement-wall";
import { LevelBadge } from "@/components/level-badge";
import { BackButton } from "@/components/page-back";

export const dynamic = "force-dynamic";

const COURSE_LABEL: Record<string, string> = {
  de: "Almanca",
  "gsw-zh": "Zürih Almancası",
};

/**
 * Profil — "ben" ekranı.
 *
 * İki uçtan da geçti: on üç bölümlük bir panoydu, sonra beş satırlık bir
 * menüye indi. İkincisi de yanlıştı, çünkü rozetler ve ilerleme GİDİLECEK
 * yerler değil GÖSTERİLECEK şeyler — kapının arkasına saklanınca profil
 * kendisi hakkında hiçbir şey söylemeyen bir kapı listesine dönüşüyordu.
 *
 * Kompozisyon bir cümle kuruyor, yukarıdan aşağı:
 *
 *   kim       — arma, ad, seviye, kurs
 *   ne koydum — seri, en uzun seri, süre, pekişen kelime
 *   ne zaman  — son sekiz haftanın ısı haritası
 *   ne kazandım — rozetler
 *   ne değiştirebilirim — ayarlar, yazılar
 *
 * Kelimeye ait ölçüler burada yok, Kelimeler ekranında (bkz. progress-view
 * bölünmesi): kapsam ve tekrar kuyruğu kelime dağarcığı hakkında, seri ve
 * süre kişi hakkında. "Pekişen kelime" kartı ikisi arasındaki köprü —
 * dokununca Kelimeler'e gidiyor.
 *
 * "Yetkinlik ve gelişim" satırı kalktı: zaten bir sekme olan Becerileri
 * açıyordu ve bir sekmeyi menüden ikinci kez sunmak iki ayrı yer varmış gibi
 * hissettiriyor.
 */
export default async function ProfilePage() {
  const user = await getUserInfo();
  if (!user) return null;

  try {
    const profile = await ensureProfile(user.id, user.name);
    const name = profile.displayName || user.name || "Öğrenci";
    const today = new Date().toISOString().slice(0, 10);

    // İstatistikler okunamazsa sayfa yine açılıyor: kimlik ve ayarlar
    // ilerlemeye bağlı değil.
    const data = await getProgress(user.id, today).catch((err) => {
      console.error("[profile] ilerleme okunamadı", err);
      return null;
    });
    const mastered = data ? data.levels.reduce((s, l) => s + l.mastered, 0) : 0;
    const total = data ? data.levels.reduce((s, l) => s + l.total, 0) : 0;
    const atLevel = data?.levels.find((l) => l.niveau === profile.level);

    return (
      <div className="mx-auto w-full max-w-3xl space-y-4">
        {/*
          Kimlik şeridi. Geri düğmesi burada çünkü profil alt sekmelerden çıktı
          ve başlıktaki avatardan açılıyor; geri GELİNEN yere döner, sabit bir
          adrese değil (bkz. components/page-back).
        */}
        <div className="flex items-center gap-3">
          <BackButton fallback="/learn" label="Geri dön" />
          {/* Arma sıralamadakiyle AYNI: kullanıcı kendini tabloda tanıyabilmeli. */}
          <Avatar userId={user.id} name={name} size={52} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold">{name}</h1>
            <p className="muted truncate text-sm">
              {COURSE_LABEL[profile.course] ?? profile.course} ·{" "}
              {profile.totalXp.toLocaleString("tr-TR")} XP
            </p>
          </div>
        </div>

        {/* Seviye ve o seviyedeki pekişme — kimliğin bir parçası, ayrı kart değil. */}
        <div className="card px-5 py-4">
          <LevelBadge
            level={profile.level}
            mastered={atLevel?.mastered ?? 0}
            total={atLevel?.total ?? 0}
          />
        </div>

        {data ? (
          <ActivityProgress
            days={data.days.map((d) => ({
              day: String(d.day),
              reviews: d.reviews,
              correct: d.correct,
              xp: d.xp,
            }))}
            games={data.games}
            streak={profile.currentStreak}
            longest={profile.longestStreak}
            seconds={data.seconds}
            mastered={mastered}
            today={today}
          />
        ) : null}

        <AchievementWall />

        <ProfileMenu />

        {total > 0 ? (
          <p className="muted px-1 pb-2 text-center text-xs">
            Toplam {total.toLocaleString("tr-TR")} kelimelik havuzda{" "}
            {mastered.toLocaleString("tr-TR")} kelime pekişti.
          </p>
        ) : null}
      </div>
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
