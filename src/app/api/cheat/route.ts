import { NextResponse } from "next/server";
import { and, eq, inArray, lte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { cheatProgress } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { awardActivity } from "@/lib/award";
import { xpForSkill } from "@/lib/xp";
import { grade, schedule, type SrsState } from "@/lib/srs";
import { CHEAT_ITEMS, itemById } from "@/lib/cheatsheet/items";

export const dynamic = "force-dynamic";

/**
 * Cheatsheet çalışma ilerlemesi.
 *
 * Tekrar motoru kelimelerinkiyle AYNI (lib/srs): burada ikinci bir aralık
 * hesabı yazmak, iki yerde farklı unutma eğrisi demek olurdu. Değişen tek şey
 * maddenin ne olduğu — kelime yerine tablo hücresi.
 *
 * Puanlama beceri alıştırmalarındaki yolu izliyor: XP istemciden GELMEZ,
 * sunucuda süre ve doğru sayısından hesaplanır. Günlük tekrar sayacı (dailyStats
 * .reviews) kelime oyunlarına ait ve burada artırılmıyor — o sayaç kelime
 * hedefini ölçüyor.
 */

/** Bir turda işlenebilecek en çok cevap — kötü niyetli bir gövdeye tavan. */
const MAX_RESULTS = 120;

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const sheet = new URL(req.url).searchParams.get("sheet");

  try {
    if (sheet) {
      // Tek sayfanın maddeleri: sayfa açıldığında "kaçı biliniyor, kaçının
      // tekrarı gelmiş" göstermek için.
      const ids = CHEAT_ITEMS.filter((i) => i.sheetId === sheet).map((i) => i.id);
      if (!ids.length) return NextResponse.json({ states: {}, due: 0, seen: 0 });
      const rows = await db
        .select()
        .from(cheatProgress)
        .where(and(eq(cheatProgress.userId, userId), inArray(cheatProgress.itemId, ids)));
      const now = Date.now();
      const states: Record<string, { reps: number; lapses: number; due: boolean }> = {};
      let due = 0;
      for (const r of rows) {
        const isDue = r.dueAt.getTime() <= now;
        if (isDue) due++;
        states[r.itemId] = { reps: r.reps, lapses: r.lapses, due: isDue };
      }
      return NextResponse.json({ states, due, seen: rows.length, total: ids.length });
    }

    // Genel özet — ana ekrandaki kart ve cheatsheet başlığı bunu kullanıyor.
    const [counts] = await db
      .select({
        seen: sql<number>`count(*)::int`,
        due: sql<number>`count(*) filter (where ${cheatProgress.dueAt} <= now())::int`,
        mastered: sql<number>`count(*) filter (where ${cheatProgress.state} = 2 and ${cheatProgress.intervalDays} >= 21)::int`,
      })
      .from(cheatProgress)
      .where(eq(cheatProgress.userId, userId));

    return NextResponse.json({
      seen: counts?.seen ?? 0,
      due: counts?.due ?? 0,
      mastered: counts?.mastered ?? 0,
      total: CHEAT_ITEMS.length,
    });
  } catch (err) {
    console.error("[cheat] okunamadı", err);
    return NextResponse.json({ error: "db" }, { status: 503 });
  }
}

/** Tekrarı gelmiş maddelerin kimlikleri — karışık tur bunlardan kuruluyor. */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  if (isDueRequest(body)) return dueItems(userId, body.limit);

  const parsed = parseResults(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    const ids = parsed.results.map((r) => r.itemId);
    const rows = await db
      .select()
      .from(cheatProgress)
      .where(and(eq(cheatProgress.userId, userId), inArray(cheatProgress.itemId, ids)));
    const prev = new Map(rows.map((r) => [r.itemId, r]));
    const now = new Date();

    let correct = 0;
    for (const result of parsed.results) {
      if (result.correct) correct++;
      const before: SrsState = prev.get(result.itemId) ?? {
        state: 0,
        ease: 2.5,
        intervalDays: 0,
        reps: 0,
        lapses: 0,
        correctStreak: 0,
        leech: false,
        dueAt: now,
      };
      const quality = grade(result.kind, result.correct, result.latencyMs);
      const next = schedule(before, quality, now);

      await db
        .insert(cheatProgress)
        .values({
          userId,
          itemId: result.itemId,
          state: next.state,
          ease: next.ease,
          intervalDays: next.intervalDays,
          dueAt: next.dueAt,
          reps: next.reps,
          lapses: next.lapses,
          correctStreak: next.correctStreak,
          leech: next.leech,
          lastReviewedAt: now,
        })
        .onConflictDoUpdate({
          target: [cheatProgress.userId, cheatProgress.itemId],
          set: {
            state: next.state,
            ease: next.ease,
            intervalDays: next.intervalDays,
            dueAt: next.dueAt,
            reps: next.reps,
            lapses: next.lapses,
            correctStreak: next.correctStreak,
            leech: next.leech,
            lastReviewedAt: now,
          },
        });
    }

    const minutes = parsed.seconds / 60;
    const xp = xpForSkill(minutes, correct, parsed.results.length);
    const award = await awardActivity(userId, parsed.day, xp, parsed.seconds);

    return NextResponse.json({
      ok: true,
      correct,
      total: parsed.results.length,
      xpGained: award.xpGained,
      currentStreak: award.currentStreak,
      totalXp: award.totalXp,
    });
  } catch (err) {
    console.error("[cheat] yazılamadı", err);
    return NextResponse.json({ error: "db" }, { status: 503 });
  }
}

/**
 * Tekrarı gelmiş maddeler.
 *
 * GET yerine POST'un içinde çünkü tarayıcı GET'i önbelleğe alabiliyor ve bir
 * tur bitip kuyruk değiştiğinde eski liste dönerdi.
 */
async function dueItems(userId: string, limit: number) {
  try {
    const rows = await db
      .select({
        itemId: cheatProgress.itemId,
        reps: cheatProgress.reps,
        lapses: cheatProgress.lapses,
      })
      .from(cheatProgress)
      .where(and(eq(cheatProgress.userId, userId), lte(cheatProgress.dueAt, new Date())))
      .orderBy(cheatProgress.dueAt)
      .limit(Math.min(100, Math.max(1, limit)));
    // Kimliği artık var olmayan madde (içerik değişmiş) sessizce atılıyor.
    return NextResponse.json({ items: rows.filter((r) => itemById(r.itemId)) });
  } catch (err) {
    console.error("[cheat] kuyruk okunamadı", err);
    return NextResponse.json({ error: "db" }, { status: 503 });
  }
}

type DueRequest = { want: "due"; limit: number };

function isDueRequest(body: unknown): body is DueRequest {
  return (
    typeof body === "object" &&
    body !== null &&
    (body as { want?: unknown }).want === "due" &&
    typeof (body as { limit?: unknown }).limit === "number"
  );
}

type ParsedResults = {
  day: string;
  seconds: number;
  results: { itemId: string; correct: boolean; latencyMs: number; kind: string }[];
};

/**
 * Gövde doğrulaması.
 *
 * Madde kimlikleri KATALOĞA karşı doğrulanıyor: doğrulanmasaydı istemci
 * uydurduğu bir kimlikle satır açabilir ve tabloyu şişirebilirdi.
 */
function parseResults(body: unknown): ParsedResults | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (typeof b.day !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(b.day)) return null;
  if (!Array.isArray(b.results) || !b.results.length || b.results.length > MAX_RESULTS) return null;

  const results: ParsedResults["results"] = [];
  for (const raw of b.results) {
    if (typeof raw !== "object" || raw === null) return null;
    const r = raw as Record<string, unknown>;
    if (typeof r.itemId !== "string" || !itemById(r.itemId)) return null;
    if (typeof r.correct !== "boolean") return null;
    const latencyMs = typeof r.latencyMs === "number" ? r.latencyMs : 0;
    results.push({
      itemId: r.itemId,
      correct: r.correct,
      latencyMs: Math.max(0, Math.min(120000, latencyMs)),
      kind: typeof r.kind === "string" ? r.kind : "choice",
    });
  }

  const seconds = typeof b.seconds === "number" ? b.seconds : results.length * 8;
  return { day: b.day, seconds: Math.max(0, Math.min(7200, seconds)), results };
}
