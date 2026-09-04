import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile, getProgress } from "@/lib/session";

export const dynamic = "force-dynamic";

/**
 * Mobil özet ucu — ana ekran ve profilin ihtiyaç duyduğu tek çağrı.
 *
 * Web sunucu bileşenleri bu verileri `ensureProfile`/`getProgress`'i doğrudan
 * çağırarak alıyor; native app'in ise tek bir REST özeti gerekiyordu.
 * `/api/profile` yetkinlik (proficiency) döndürüyor — burası kimlik + seri + XP +
 * pekişen kelime + süre özeti: ekranların gösterdiği sayılar. Yalnız okur.
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const profile = await ensureProfile(userId);
    const today = new Date().toISOString().slice(0, 10);
    // İlerleme okunamazsa özet yine döner: kimlik/seri/XP profilde, ilerlemeye bağlı değil.
    const progress = await getProgress(userId, today).catch(() => null);
    const mastered = progress ? progress.levels.reduce((s, l) => s + l.mastered, 0) : 0;
    const totalWords = progress ? progress.levels.reduce((s, l) => s + l.total, 0) : 0;
    // Günlük alışkanlık döngüsü — getProgress zaten hesaplıyor (ek sorgu yok):
    // bugünkü tekrar/yeni sayısı + zamanı gelen (due) toplam. Ana ekranın günlük
    // hedef halkası ve "bugün ne var" çipleri bunları gösterir.
    const todayStat = progress?.days?.find((d) => d.day === today);

    return NextResponse.json(
      {
        name: profile.displayName,
        level: profile.level,
        course: profile.course,
        // Null = anadili hiç seçilmemiş eski hesap; istemci kendi
        // varsayılanını (cihaz dili) korusun diye null olarak gidiyor,
        // sunucuda "tr" diye uydurulmuyor.
        nativeLang: profile.nativeLang,
        streak: profile.currentStreak,
        longestStreak: profile.longestStreak,
        xp: profile.totalXp,
        dailyGoal: profile.dailyGoal,
        mastered,
        totalWords,
        seconds: progress?.seconds ?? 0,
        reviewsToday: todayStat?.reviews ?? 0,
        newToday: todayStat?.newWords ?? 0,
        dueCount: progress?.dueNow ?? 0,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[me] özet okunamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
