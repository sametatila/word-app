import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { loadTrack } from "@/lib/immersion/build";
import { buildTrackState } from "@/lib/immersion/state";
import { immersionCompletion } from "@/lib/immersion/progress";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionHub } from "@/components/immersion/immersion-hub";
import { buildHubUnits } from "@/lib/immersion/hub";
import { moduleExamPlan } from "@/lib/lessons/module-exam";

export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion (2. mod) ana ekranı — eski "Dersler" + "Beceriler"in birleşimi.
 * Ders iskeletinin üzerine okuma/dinleme/yazma (+ ileride gramer/quiz/checkpoint)
 * item'ları örülür (bkz. docs/plan/immersion.md). Seçili seviyenin track'i
 * kurulur, kullanıcının ilerlemesiyle gating hesaplanır, sunucuda çizilir.
 */
export default async function ImmersionPage() {
  const user = await getUserInfo();
  if (!user) return null;

  let profileLevel: CefrLevel = "A1";
  let course = "de";
  try {
    const profile = await ensureProfile(user.id, user.name);
    if (LEVELS.includes(profile.level as CefrLevel)) profileLevel = profile.level as CefrLevel;
    course = profile.course;
  } catch (err) {
    console.error("[immersion] profil okunamadı", err);
  }

  // CEFR seçimi buradan YAPILAMAZ — kullanıcı kendi seviyesindedir; seviye
  // yerleştirme testiyle belirlenir, patika ekranından değiştirilmez.
  const level = profileLevel;

  const track = await loadTrack(course, level);
  const completion = await immersionCompletion(user.id, course);
  const state = buildTrackState(track, completion);

  const units = buildHubUnits(state);

  // Modül sınavları: seviyenin planı olan modüller. Ön koşul BURADA
  // denetlenmiyor — motor, dersleri geçilmemiş modülün kâğıdını "deneme"
  // olarak veriyor ve bunu kendisi söylüyor; kapıyı iki kez kapatmak,
  // hazır olup olmadığını merak eden öğrenciyi bilgisiz bırakırdı.
  const moduleExams = [...Array(21).keys()]
    .map((i) => ({ index: i, plan: moduleExamPlan(level, i) }))
    .filter((m): m is { index: number; plan: NonNullable<ReturnType<typeof moduleExamPlan>> } => Boolean(m.plan))
    .map(({ index, plan }) => ({ index, code: plan.code, titleTr: plan.titleTr, titleDe: plan.titleDe }));

  const doneUnits = state.units.filter((u) => u.complete).length;
  return (
    <ImmersionHub
      level={level}
      units={units}
      currentIndex={state.currentIndex}
      doneUnits={doneUnits}
      totalUnits={state.units.length}
      moduleExams={moduleExams}
    />
  );
}
