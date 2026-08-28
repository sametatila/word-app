import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { loadTrack } from "@/lib/immersion/build";
import { buildTrackState } from "@/lib/immersion/state";
import { immersionCompletion } from "@/lib/immersion/progress";
import type { ImmersionItem } from "@/lib/immersion/types";
import type { CefrLevel } from "@/lib/skills/types";
import { ImmersionHub, type HubUnit } from "@/components/immersion/immersion-hub";

export const dynamic = "force-dynamic";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Immersion (2. mod) ana ekranı — eski "Dersler" + "Beceriler"in birleşimi.
 * Ders iskeletinin üzerine okuma/dinleme/yazma (+ ileride gramer/quiz/checkpoint)
 * item'ları örülür (bkz. docs/plan/immersion.md). Seçili seviyenin track'i
 * kurulur, kullanıcının ilerlemesiyle gating hesaplanır, sunucuda çizilir.
 */
export default async function ImmersionPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
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

  // Seçili seviye: ?level= geçerliyse onu, değilse kullanıcının seviyesini göster.
  const requested = (await searchParams).level;
  const level = LEVELS.includes(requested as CefrLevel) ? (requested as CefrLevel) : profileLevel;

  const track = await loadTrack(course, level);
  const completion = await immersionCompletion(user.id, course);
  const state = buildTrackState(track, completion);

  const units: HubUnit[] = state.units.map((u) => ({
    id: u.unit.id,
    index: u.unit.index,
    group: u.unit.group,
    theme: u.unit.theme,
    locked: u.locked,
    complete: u.complete,
    done: u.done,
    total: u.total,
    lessonsDone: u.lessonsDone,
    lessonsTotal: u.lessonsTotal,
    items: u.items.map((s) => ({
      id: s.item.id,
      kind: s.item.kind,
      href: hrefFor(s.item),
      title: s.item.title,
      titleTr: s.item.titleTr,
      playable: s.playable,
      done: s.done,
    })),
  }));

  const doneUnits = state.units.filter((u) => u.complete).length;
  return (
    <ImmersionHub
      level={level}
      levels={LEVELS}
      units={units}
      currentIndex={state.currentIndex}
      doneUnits={doneUnits}
      totalUnits={state.units.length}
    />
  );
}

/** Item → oynatıcı rotası. Yer tutucular (ref=null) ve içeriği-olmayan türler null. */
function hrefFor(item: ImmersionItem): string | null {
  if (item.ref === null) return null;
  if (item.kind === "lesson") return `/lessons/${item.ref}`;
  if (item.kind === "read" || item.kind === "listen" || item.kind === "write") return `/immersion/skill/${item.ref}`;
  if (item.kind === "quiz") return `/immersion/quiz/${item.ref}`;
  if (item.kind === "checkpoint") return `/immersion/quiz/${item.ref}?mode=checkpoint`;
  return null; // grammar: gerçek anlatım ister, henüz yok
}
