import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSkills } from "@/lib/db/schema";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { listExerciseMeta } from "@/lib/skills";
import type { CefrLevel } from "@/lib/skills/types";
import { SkillsHub, type ServerSkillProgress } from "@/components/skills/skills-hub";
import { weakSpeechTopics, type SpeechTopic } from "@/lib/speech-progress";

export const dynamic = "force-dynamic";

/**
 * Beceriler ana ekranı. Egzersizlerin tam içeriği buraya inmez; yalnızca
 * liste bilgisi gider. Varsayılan seviye, kelime oyunlarının performansa göre
 * belirlediği aktif CEFR seviyesidir — beceri içeriği de seviyeyle birlikte yürür.
 */
export default async function SkillsPage() {
  const user = await getUserInfo();
  if (!user) return null;

  let activeLevel: CefrLevel = "A1";
  let course = "de";
  try {
    const profile = await ensureProfile(user.id, user.name);
    const lv = profile.level as CefrLevel;
    if (["A1", "A2", "B1", "B2", "C1"].includes(lv)) activeLevel = lv;
    course = profile.course;
  } catch (err) {
    // Veritabanına ulaşılamazsa içerik yine açılır; seviye A1'den başlar.
    console.error("[skills] profil okunamadı", err);
  }

  // İçerik veritabanından gelir (aktif kurs); ulaşılamazsa gömülü kopya kullanılır.
  const items = await listExerciseMeta(course);

  // Tamamlanma durumu sunucudan gelir ki cihazlar arasında senkron olsun;
  // istemci bunu localStorage'daki (çevrimdışı) kayıtlarla birleştirir.
  const serverProgress: ServerSkillProgress = {};
  // Telaffuzda zorlanılan ses konuları aynı satırlardan çıkıyor: her telaffuz
  // egzersizi tek bir sesi çalıştırdığı için egzersiz başına skor, ses başına
  // skor demek.
  let weakSounds: SpeechTopic[] = [];
  try {
    const rows = await db
      .select({
        exerciseId: userSkills.exerciseId,
        correct: userSkills.correct,
        total: userSkills.total,
        attempts: userSkills.attempts,
      })
      .from(userSkills)
      .where(eq(userSkills.userId, user.id));
    for (const r of rows) serverProgress[r.exerciseId] = { correct: r.correct, total: r.total };
    weakSounds = weakSpeechTopics(items, rows);
  } catch (err) {
    console.error("[skills] kullanıcı ilerlemesi okunamadı", err);
  }

  return (
    <SkillsHub
      items={items}
      activeLevel={activeLevel}
      serverProgress={serverProgress}
      weakSounds={weakSounds}
    />
  );
}
