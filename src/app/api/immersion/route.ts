import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { loadTrack } from "@/lib/immersion/build";
import { buildTrackState } from "@/lib/immersion/state";
import { immersionCompletion } from "@/lib/immersion/progress";
import type { CefrLevel } from "@/lib/skills/types";

export const dynamic = "force-dynamic";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Patika (immersion) hub'ı — mobil. Web'in immersion sayfasının sunucu-tarafı
 * kurgusunun REST karşılığı: kullanıcının seviyesindeki track, ilerlemesiyle
 * gating'lenmiş üniteler + item'lar. Yalnız okur, oturumsuz 401.
 */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const profile = await ensureProfile(userId);
    const level = (LEVELS.includes(profile.level) ? profile.level : "A1") as CefrLevel;
    const track = await loadTrack(profile.course, level);
    const completion = await immersionCompletion(userId, profile.course);
    const state = buildTrackState(track, completion);

    const units = state.units.map((u) => ({
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
        // Altındaki içeriğin kimliği: ders id'si / egzersiz id'si / ünite id'si
        // (quiz+checkpoint). REST istemcisi (mobil) oynatıcıya bununla gider;
        // web sunucu bileşeninde zaten ref'le köprü kuruyor.
        ref: s.item.ref,
        title: s.item.title,
        titleTr: s.item.titleTr,
        playable: s.playable,
        done: s.done,
      })),
    }));

    return NextResponse.json(
      {
        level,
        units,
        currentIndex: state.currentIndex,
        doneUnits: state.units.filter((u) => u.complete).length,
        totalUnits: state.units.length,
      },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[immersion] hub okunamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
