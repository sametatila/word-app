import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSkills } from "@/lib/db/schema";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { listExerciseMeta } from "@/lib/skills";
import type { CefrLevel } from "@/lib/skills/types";
import { SkillsHub, type ExamHubData, type ServerSkillProgress, type SkillItem, type SkillsBoard } from "@/components/skills/skills-hub";
import { weakSpeechTopics, type SpeechTopic } from "@/lib/speech-progress";
import { gatherEvidence } from "@/lib/proficiency-data";
import { computeProficiency } from "@/lib/proficiency";
import { examHistory } from "@/lib/exam";
import { weeklyHistory, weeklyStatus } from "@/lib/weekly";
import { lastPlacement, RETAKE_DAYS } from "@/lib/placement";
import { candoForExercise } from "@/lib/cando-map";
import { candoById } from "@/lib/cando";

export const dynamic = "force-dynamic";

/**
 * Beceriler ana ekranı (WP-63: yetkinlik panosu + sekmeler + sınav girişi).
 * Egzersizlerin tam içeriği buraya inmez; yalnızca liste bilgisi gider.
 * Varsayılan seviye, kelime oyunlarının performansa göre belirlediği aktif
 * CEFR seviyesidir — beceri içeriği de seviyeyle birlikte yürür.
 *
 * Pano, sınav geçmişi ve haftalık durum ayrı ayrı denenir: biri okunamazsa
 * liste yine açılır — o bölüm yalnızca görünmez.
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
  // Her egzersize can-do ifadesi (WP-43 haritası) kartta gösterilmek üzere eklenir.
  const items: SkillItem[] = (await listExerciseMeta(course)).map((m) => {
    const ids = candoForExercise({ skill: m.skill, level: m.level, genre: m.genre });
    const cando = ids.length ? candoById(ids[0])?.tr : undefined;
    return { ...m, cando };
  });

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
        lastScore: userSkills.lastScore,
      })
      .from(userSkills)
      .where(eq(userSkills.userId, user.id));
    for (const r of rows) serverProgress[r.exerciseId] = { correct: r.correct, total: r.total, attempts: r.attempts, lastScore: r.lastScore };
    weakSounds = weakSpeechTopics(items, rows);
  } catch (err) {
    console.error("[skills] kullanıcı ilerlemesi okunamadı", err);
  }

  /*
    Yetkinlik panosu bu ekrandan kalktı (profilde, bkz. progress-panel) ama
    modelin kendisi burada hâlâ iki işe yarıyor: hangi sekmenin açık geleceği
    (en zayıf beceri) ve dilbilgisi sekmesindeki puan satırı.

    O yüzden `proficiencyFor` değil doğrudan `computeProficiency`: birincisi
    ayrıca "önerilen sıradaki adımı" hesaplıyor ve bunun için egzersiz
    listesini okuyup bir sorgu daha atıyor. Öneri artık profilde gösteriliyor,
    burada hiçbir yerde çizilmiyordu — her Beceriler açılışında hesaplanan,
    kimsenin görmediği bir sonuçtu.
  */
  let board: SkillsBoard | null = null;
  try {
    board = { proficiency: computeProficiency(await gatherEvidence(user.id)) };
  } catch (err) {
    console.error("[skills] yetkinlik okunamadı", err);
  }

  let exams: ExamHubData | null = null;
  try {
    const day = new Date().toISOString().slice(0, 10);
    const [history, weekly, weeklyBars, placement] = await Promise.all([
      examHistory(user.id, 8),
      weeklyStatus(user.id, day).catch(() => null),
      weeklyHistory(user.id, 8).catch(() => []),
      lastPlacement(user.id).catch(() => null),
    ]);
    const canRetake = !placement || Date.now() - new Date(placement.at).getTime() >= RETAKE_DAYS * 86400000;
    exams = { history, weekly, weeklyBars, placement, canRetake };
  } catch (err) {
    console.error("[skills] sınav verisi okunamadı", err);
  }

  return (
    <SkillsHub
      items={items}
      activeLevel={activeLevel}
      serverProgress={serverProgress}
      weakSounds={weakSounds}
      board={board}
      exams={exams}
    />
  );
}
