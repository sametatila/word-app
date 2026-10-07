import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { contentLang, tFor } from "@/lib/i18n/server";
import { loadTrack } from "@/lib/immersion/build";
import { buildTrackState } from "@/lib/immersion/state";
import { immersionCompletion } from "@/lib/immersion/progress";
import { hyphenateTitle } from "@/lib/hyphenate";
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
    // Yer tutucu başlıklar (Dil bilgisi / Tekrar / Ünite quizi ve içeriği
    // olmayan beceri yuvası) kullanıcının dilinde gitsin. Dil HESABIN anadili
    // (boşsa istek dili): sınav ve profil uçlarıyla aynı kaynak; yer tutucular
    // ile içerik başlıkları da aynı dilde.
    const lang = await contentLang(profile.nativeLang);
    const track = await loadTrack(profile.course, level, tFor(lang), lang);
    const completion = await immersionCompletion(userId, profile.course);
    const state = buildTrackState(track, completion);

    const units = state.units.map((u) => ({
      id: u.unit.id,
      index: u.unit.index,
      group: u.unit.group,
      theme: u.unit.theme,
      moduleIndex: u.unit.moduleIndex,
      topics: u.unit.topics,
      // Kartta gösterilecek hâli: yumuşak tireli (bkz. lib/hyphenate). Eski
      // istemciler alanı tanımıyor, `topics`i gösteriyor.
      topicsHyph: u.unit.topics.map((t) => hyphenateTitle(t, profile.course)),
      locked: u.locked,
      complete: u.complete,
      done: u.done,
      total: u.total,
      conversationsDone: u.conversationsDone,
      conversationsTotal: u.conversationsTotal,
      items: u.items.map((s) => ({
        id: s.item.id,
        kind: s.item.kind,
        // Altındaki içeriğin kimliği: konuşma id'si / egzersiz id'si / ünite id'si
        // (quiz+unitQuiz). REST istemcisi (mobil) oynatıcıya bununla gider;
        // web sunucu bileşeninde zaten ref'le köprü kuruyor.
        ref: s.item.ref,
        title: s.item.title,
        titleTr: s.item.titleTr,
        playable: s.playable,
        done: s.done,
        // Kapı artık ustalığa değil ilerlemeye bağlı: biten + denenen + sıradaki
        // tek öğe açık. İstemci `open`a bakmalı, `done`a değil.
        attempted: s.attempted,
        open: s.open,
        /* Önceki sonuç: ünite kartının yüzdesi ve açılıştaki "önceki sonucun" ekranı
           (2026-10-07). Eski istemci alanı yok sayar. */
        result: s.result,
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
