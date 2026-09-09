import { redirect } from "next/navigation";
import { LearnHub, type LearnHubData } from "@/components/learn/learn-hub";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";
import { supportsMockExams } from "@/lib/mock-exams";

export const dynamic = "force-dynamic";

/**
 * Öğren sekmesi — MERKEZ.
 *
 * Burası eskiden doğrudan `SessionPlayer`dı: sekmeyi açmak bir oturum kurmak
 * demekti, kullanıcı oynamayacak olsa bile. Tur artık `/learn/game`de ve bu
 * sayfa yalnız özet okuyor — `/api/me`nin okuduğu üç şeyin aynısı.
 *
 * SUNUCUDA ÇİZİLİYOR. Mobil aynı sayıları `/api/me` ile çekiyor ve o yüzden
 * iskelet gösteriyor; web'de veri zaten sunucuda, yani kahraman kart ve
 * ilerleme şeridi ilk boyamada DOLU geliyor. İskelet yalnız kendi verisini
 * çeken parçalarda (günün görevleri, arkadaş nabzı) kalıyor.
 */
export default async function LearnPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  /*
    ESKİ HEDEFLİ TUR BAĞLANTISI. `/learn?game=…` aylardır zayıf nokta kartının
    ve günlük planın hedefidir; tur kendi adresine taşınınca o bağlantılar
    kırılmasın diye burada yönlendiriliyor. Dışarıya verilmiş bir adres
    (paylaşılmış bağlantı, yer imi) sessizce ölmemeli.
  */
  const game = (await searchParams)?.game;
  if (typeof game === "string" && game) redirect(`/learn/game?game=${encodeURIComponent(game)}`);

  const user = await getUserInfo();
  if (!user) return null;

  const today = new Date().toISOString().slice(0, 10);
  let data: LearnHubData = {
    level: "A1",
    mastered: 0,
    totalWords: 0,
    xp: 0,
    streak: 0,
    dailyGoal: 0,
    reviewsToday: 0,
    dueCount: 0,
    newToday: 0,
    hasMockExams: false,
    // Yürüyüş modu mikrofon istiyor ve tarayıcının izni sunucudan bilinemez.
    // Kama yine de çiziliyor; izni modun kendisi soruyor. Mobilde de kart
    // cihazda mikrofon VARSA çiziliyor, izin ayrı bir adım.
    canWalk: true,
  };

  try {
    const profile = await ensureProfile(user.id, user.name);
    // İlerleme okunamazsa merkez yine açılıyor: kahraman kart ve bağlantılar
    // ilerlemeye bağlı değil, yalnız sayılar sıfır görünür.
    const progress = await getProgress(user.id, today).catch((err) => {
      console.error("[learn] ilerleme okunamadı", err);
      return null;
    });
    const todayStat = progress?.days?.find((d) => d.day === today);
    data = {
      level: profile.level,
      mastered: progress ? progress.levels.reduce((s, l) => s + l.mastered, 0) : 0,
      totalWords: progress ? progress.levels.reduce((s, l) => s + l.total, 0) : 0,
      xp: profile.totalXp,
      streak: profile.currentStreak,
      dailyGoal: profile.dailyGoal,
      reviewsToday: todayStat?.reviews ?? 0,
      newToday: todayStat?.newWords ?? 0,
      dueCount: progress?.dueNow ?? 0,
      hasMockExams: supportsMockExams(profile.course),
      canWalk: true,
    };
  } catch (err) {
    console.error("[learn] profil okunamadı", err);
  }

  /*
    SIRALAMA BURADA DEĞİL. Sekmenin altında haftalık tablo duruyordu; mobilin
    Öğren ekranında yok, tabloya Profil › Haftalık sıralama satırından
    gidiliyor. Web'de o satır ve `/leaderboard` adresi zaten var, yani
    kaldırılan bir işlev değil, tekrarlanan bir yüzey.
  */
  return <LearnHub data={data} />;
}
