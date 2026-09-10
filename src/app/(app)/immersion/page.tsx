import { getUserInfo } from "@/lib/auth/server";
import { getT } from "@/lib/i18n/server";
import { ensureProfile } from "@/lib/session";
import { loadTrack } from "@/lib/immersion/build";
import { buildTrackState } from "@/lib/immersion/state";
import { immersionCompletion } from "@/lib/immersion/progress";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionHub } from "@/components/immersion/immersion-hub";
import { AppHeader } from "@/components/app-header";
import { buildHubUnits } from "@/lib/immersion/hub";
import { moduleExamPlan, hasModuleExams } from "@/lib/lessons/module-exam";
import { nativeExamText } from "@/lib/lessons/native-server";
import { nativeOf } from "@/lib/courses";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion (2. mod) ana ekranı — eski "Dersler" + "Beceriler"in birleşimi.
 * Ders iskeletinin üzerine okuma/dinleme/yazma (+ ileride gramer/quiz/checkpoint)
 * item'ları örülür (bkz. docs/plan/immersion.md). Seçili seviyenin track'i
 * kurulur, kullanıcının ilerlemesiyle gating hesaplanır, sunucuda çizilir.
 */
export const generateMetadata = titleMeta("nav.path");

export default async function ImmersionPage() {
  const t = await getT();
  const user = await getUserInfo();
  if (!user) return null;

  let profileLevel: CefrLevel = "A1";
  let course = "de";
  let native: string | null = null;
  try {
    const profile = await ensureProfile(user.id, user.name);
    if (LEVELS.includes(profile.level as CefrLevel)) profileLevel = profile.level as CefrLevel;
    course = profile.course;
    native = profile.nativeLang;
  } catch (err) {
    console.error("[immersion] profil okunamadı", err);
  }
  // Modül sınavı satırlarının alt başlığı öğrencinin dilinde; üst satır
  // (Almanca modül adı) kâğıdın kimliği ve değişmiyor.
  const examText = await nativeExamText(nativeOf(native));

  // CEFR seçimi buradan YAPILAMAZ — kullanıcı kendi seviyesindedir; seviye
  // yerleştirme testiyle belirlenir, patika ekranından değiştirilmez.
  const level = profileLevel;

  const track = await loadTrack(course, level, t);
  const completion = await immersionCompletion(user.id, course);
  const state = buildTrackState(track, completion);

  const units = buildHubUnits(state);

  // Modül sınavları: seviyenin planı olan modüller. Ön koşul BURADA
  // denetlenmiyor — motor, dersleri geçilmemiş modülün kâğıdını "deneme"
  // olarak veriyor ve bunu kendisi söylüyor; kapıyı iki kez kapatmak,
  // hazır olup olmadığını merak eden öğrenciyi bilgisiz bırakırdı.
  const moduleExams = (hasModuleExams(course) ? [...Array(21).keys()] : [])
    .map((i) => ({ index: i, plan: moduleExamPlan(level, i) }))
    .filter((m): m is { index: number; plan: NonNullable<ReturnType<typeof moduleExamPlan>> } => Boolean(m.plan))
    .map(({ index, plan }) => ({ index, code: plan.code, titleTr: examText(plan.titleTr), titleDe: plan.titleDe }));

  /* BU SEVİYEDE ÜNİTE YOKSA. İki durum var ve ikisi de canlı: kursun hiç
     dersi olmayabilir (gsw-zh) ya da dersleri BAZI seviyelerde bitmemiş
     olabilir - İngilizce kursun bugün A1/A2'de 100'er dersi var, B1/B2/C1'de
     hiç yok. Metin bu yüzden "bu kursun" değil "bu seviyede" diyor; kursun
     tamamı yokmuş gibi konuşmak İngilizce öğrencisine yanlış bilgi veriyordu.
     Web boş bir Patika çiziyordu, Android sebebi söylüyordu; ikisi de artık
     aynı cümleyi kuruyor. */
  if (!state.units.length) {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <AppHeader title={t("path.path")} />
        <div className="card p-5">
          <p className="muted text-body leading-relaxed">{t("path.no_units")}</p>
        </div>
      </div>
    );
  }

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
