import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { LEVELS, type Level } from "@/lib/placement-engine";

/**
 * İLK HAFTA SEVİYE ÖNERİSİ — seviye testinin emniyet ağı (docs/plan/placement-v2.md).
 *
 * Hiçbir kısa test tek seferde kusursuz değil. Kişinin kendi seviyesindeki kelimelerle İLK
 * karşılaşmalarındaki doğruluk, o kelimeleri önceden bilip bilmediğini söyler (tekrar
 * doğruluğu değil: tekrarla öğrenilen kelime "kolay" sayılmamalı). Ölçüldü (2026-10-03):
 * tüm cevaplarda B1 kullanıcıları %94, A1 %80 doğruluk; toplam doğruluk eşiği B1'lerin çoğunu
 * yanlış alarmla yukarı önerirdi.
 *
 * Kural: başlangıçtan (son seviye testi ya da hesap açılışı) sonraki 10 gün içinde, seviye
 * kelimeleriyle ≥ 30 ilk karşılaşmada doğruluk ≥ %90 → bir üst, ≤ %50 → bir alt seviye
 * BİR KEZ önerilir. "intro" (öğretim turu, cevap istemez) sayılmaz. Karar profilde
 * (`placement_nudge`) tutulur; seviye ancak kullanıcı kabul ederse değişir (profil kuralı:
 * sistem kendi başına terfi/düşüş yapmaz).
 */
export const NUDGE_DAYS = 10;
export const NUDGE_MIN_ANSWERS = 30;
export const NUDGE_UP_AT = 0.9;
export const NUDGE_DOWN_AT = 0.5;

export type PlacementNudge = { direction: "up" | "down"; from: Level; to: Level; answers: number; accuracy: number };

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}

export async function placementNudge(userId: string): Promise<PlacementNudge | null> {
  const [p] = await db.select({ level: profiles.level, course: profiles.course, nudge: profiles.placementNudge }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (!p || p.nudge) return null;
  const from = p.level as Level;
  const i = LEVELS.indexOf(from);
  if (i < 0) return null;
  /* Başlangıç: son seviye testi ya da hesabın açılışı (hangisi sonraysa). */
  const [st] = await rows(sql`select greatest(
      (select max(at) from placements where user_id = ${userId}),
      (select "createdAt" from "user" where id = ${userId})
    ) as start`);
  const start = st?.start ? new Date(String(st.start)) : null;
  if (!start || Date.now() - start.getTime() > NUDGE_DAYS * 86_400_000) return null;
  const [r] = await rows(sql`
    with firsts as (
      select distinct on (rv.word_id) rv.word_id, rv.correct
      from reviews rv
      where rv.user_id = ${userId} and rv.created_at >= ${start.toISOString()}::timestamptz and rv.game <> 'intro'
      order by rv.word_id, rv.created_at
    )
    select count(*)::int as n, coalesce(avg(case when f.correct then 1.0 else 0.0 end), 0)::float as acc
    from firsts f join words w on w.id = f.word_id
    where w.niveau = ${from} and w.course = ${p.course}`);
  const n = Number(r?.n ?? 0);
  const acc = Number(r?.acc ?? 0);
  if (n < NUDGE_MIN_ANSWERS) return null;
  if (acc >= NUDGE_UP_AT && i + 1 < LEVELS.length) return { direction: "up", from, to: LEVELS[i + 1], answers: n, accuracy: acc };
  if (acc <= NUDGE_DOWN_AT && i > 0) return { direction: "down", from, to: LEVELS[i - 1], answers: n, accuracy: acc };
  return null;
}

/** Kararı yazar; kabulde seviyeyi değiştirir. Öneri o an hâlâ geçerli değilse hiçbir şey yapmaz. */
export async function answerPlacementNudge(userId: string, to: string, accept: boolean): Promise<{ ok: boolean; level?: Level }> {
  const n = await placementNudge(userId);
  if (!n || n.to !== to) return { ok: false };
  await db
    .update(profiles)
    .set({ placementNudge: `${n.direction}:${n.to}:${accept ? "yes" : "no"}`, ...(accept ? { level: n.to } : {}) })
    .where(eq(profiles.userId, userId));
  return { ok: true, level: accept ? n.to : n.from };
}
