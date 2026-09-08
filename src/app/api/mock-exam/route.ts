import { NextResponse } from "next/server";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { mockExamAttempts } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { clampDay } from "@/lib/award";
import { track } from "@/lib/events";
import { assess } from "@/lib/assess";
import { recordAiUsage } from "@/lib/ai-usage";
import { mockPaperById, type MockSkill, type MockTask } from "@/lib/mock-exams";
import { findPart, isOpenTask, scorePart } from "@/lib/mock-exams/scoring";
import { mockFeedback } from "@/lib/mock-exams/feedback";
import { mockStats } from "@/lib/mock-exams/stats";
import type { AssessLevel } from "@/lib/assess-prompts";

export const dynamic = "force-dynamic";

/**
 * Deneme sınavı oturumu.
 *
 *   GET  ?paper=de-b1-01&skill=reading   → yarım kalan deneme (varsa)
 *   GET  ?stats=1                        → istatistik
 *   POST {action:"start",  paper, skill}
 *   POST {action:"save",   id, answers?, open?, taskIx?, secondsLeft?}
 *   POST {action:"assess", id, taskId, text, day?}
 *   POST {action:"finish", id, day?}
 *
 * ANLIK KAYIT. `save` her cevapta çağrılıyor. Uygulamanın kapanması, telefonun
 * kilitlenmesi ya da ağın kopması sınavı kaybettirmiyor: satır zaten açılmış
 * durumda ve `taskIx` + `secondsLeft` ile kaldığı yerden devam ediliyor.
 *
 * PUAN SUNUCUDA. İstemci puan göndermiyor, cevap gönderiyor; `finish`
 * kâğıdın kendisiyle (aynı depodaki `src/lib/mock-exams`) yeniden puanlıyor.
 * İstemcinin hesapladığı puan istatistiğe girseydi istatistik hiçbir şey
 * ölçmezdi.
 *
 * AÇIK GÖREVLER. Yazma ve konuşma `assess` ile değerlendiriliyor; istem
 * kâğıdın kendi ölçütlerinden kuruluyor, istemciden gelen metinden değil.
 * Sağlayıcı yoksa 503 dönmüyor: puan `null` kalıyor ve ekran ölçüt listesini
 * gösteriyor.
 */

const SKILLS = new Set<MockSkill>(["reading", "listening", "writing", "speaking"]);
/** Bir bölümde en fazla bu kadar madde var (C1 dinleme 25); pay bırakıldı. */
const MAX_ANSWERS = 60;
const MAX_ANSWER_CHARS = 240;
const MAX_OPEN_CHARS = 4000;

type Attempt = typeof mockExamAttempts.$inferSelect;

function shape(a: Attempt) {
  return {
    id: a.id,
    paperId: a.paperId,
    skill: a.skill,
    state: a.state,
    answers: (a.answers ?? {}) as Record<string, string>,
    open: (a.open ?? {}) as Record<string, string>,
    openScores: (a.openScores ?? {}) as Record<string, { score: number | null; tip?: string; corrected?: string }>,
    taskIx: a.taskIx,
    secondsLeft: a.secondsLeft,
    correct: a.correct,
    total: a.total,
    score: a.score,
    passed: a.passed,
    ai: a.ai ?? null,
    startedAt: a.startedAt,
    finishedAt: a.finishedAt,
  };
}

/** Cevap sözlüğünü sınırlar: boyut, anahtar sayısı, değer uzunluğu. */
function cleanAnswers(v: unknown, maxChars = MAX_ANSWER_CHARS): Record<string, string> | null {
  if (v == null) return {};
  if (typeof v !== "object" || Array.isArray(v)) return null;
  const out: Record<string, string> = {};
  let n = 0;
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (++n > MAX_ANSWERS) break;
    if (typeof k !== "string" || k.length > 80) continue;
    if (typeof val !== "string") continue;
    out[k] = val.slice(0, maxChars);
  }
  return out;
}

export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);

  if (url.searchParams.get("stats")) {
    try {
      return NextResponse.json(await mockStats(userId), { headers: { "cache-control": "no-store" } });
    } catch (err) {
      console.error("[mock-exam stats]", err);
      return NextResponse.json({ error: "database" }, { status: 500 });
    }
  }

  const paperId = url.searchParams.get("paper") ?? "";
  const skill = url.searchParams.get("skill") ?? "";
  if (!mockPaperById(paperId) || !SKILLS.has(skill as MockSkill)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  try {
    const [row] = await db
      .select()
      .from(mockExamAttempts)
      .where(
        and(
          eq(mockExamAttempts.userId, userId),
          eq(mockExamAttempts.paperId, paperId),
          eq(mockExamAttempts.skill, skill),
          eq(mockExamAttempts.state, "running"),
        ),
      )
      .orderBy(desc(mockExamAttempts.startedAt))
      .limit(1);
    return NextResponse.json({ attempt: row ? shape(row) : null }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[mock-exam]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const action = String(body.action ?? "");

  try {
    if (action === "start") return await start(userId, body);
    if (action === "save") return await save(userId, body);
    if (action === "assess") return await assessOpen(userId, body);
    if (action === "finish") return await finish(userId, body);
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  } catch (err) {
    console.error("[mock-exam]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/* ── eylemler ─────────────────────────────────────────────────────────────── */

async function start(userId: string, body: Record<string, unknown>) {
  const paperId = String(body.paper ?? "");
  const skill = String(body.skill ?? "") as MockSkill;
  const paper = mockPaperById(paperId);
  const part = paper ? findPart(paper, skill) : null;
  if (!paper || !part || !SKILLS.has(skill)) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  // Yarım kalan varsa yenisi açılmıyor: aynı bölüm için iki açık deneme
  // istatistiği bozar ve öğrenci hangisinde kaldığını bilemez.
  const [open] = await db
    .select()
    .from(mockExamAttempts)
    .where(
      and(
        eq(mockExamAttempts.userId, userId),
        eq(mockExamAttempts.paperId, paperId),
        eq(mockExamAttempts.skill, skill),
        eq(mockExamAttempts.state, "running"),
      ),
    )
    .orderBy(desc(mockExamAttempts.startedAt))
    .limit(1);
  if (open) return NextResponse.json({ attempt: shape(open), resumed: true });

  const [row] = await db
    .insert(mockExamAttempts)
    .values({ userId, paperId, skill, level: paper.level, secondsLeft: part.minutes * 60 })
    .returning();
  await track(userId, "mock_exam_start", clampDay(typeof body.day === "string" ? body.day : undefined), 1, `${paper.level}:${skill}`);
  return NextResponse.json({ attempt: shape(row), resumed: false });
}

async function save(userId: string, body: Record<string, unknown>) {
  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const answers = cleanAnswers(body.answers);
  const open = cleanAnswers(body.open, MAX_OPEN_CHARS);
  if (!answers || !open) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const patch: Partial<typeof mockExamAttempts.$inferInsert> = { updatedAt: new Date() };
  if (body.answers !== undefined) patch.answers = answers;
  if (body.open !== undefined) patch.open = open;
  if (Number.isInteger(body.taskIx)) patch.taskIx = Math.max(0, Math.min(20, Number(body.taskIx)));
  if (Number.isInteger(body.secondsLeft)) patch.secondsLeft = Math.max(0, Math.min(60 * 60 * 3, Number(body.secondsLeft)));

  const [row] = await db
    .update(mockExamAttempts)
    .set(patch)
    // `state` koşulu bilerek: bitmiş bir denemenin cevapları değiştirilemez,
    // yoksa puan geçmişe dönük düzeltilebilirdi.
    .where(and(eq(mockExamAttempts.id, id), eq(mockExamAttempts.userId, userId), eq(mockExamAttempts.state, "running")))
    .returning();
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ ok: true, updatedAt: row.updatedAt });
}

/** Açık görevin (yazma/konuşma) istemini kâğıdın kendi ölçütlerinden kurar. */
function assessTaskFor(task: MockTask, text: string) {
  const r = task.rubric;
  const constraints = [
    ...(r?.points ?? []).map((p) => p.de),
    ...(r?.minWords ? [`mindestens ${r.minWords} Wörter`] : []),
    // Karşılıklı konuşmada beklenen işlevler ölçüt olarak gidiyor: metin
    // birden çok adımın dökümü, tek bir soruya cevap değil.
    ...(task.exchange ?? []).filter((x) => x.who === "you").map((x) => x.expect),
  ].slice(0, 10);
  return {
    kind: (task.format === "writing" ? "writing" : "speaking") as "writing" | "speaking",
    task: { prompt: task.prompt, constraints },
    answer: { text },
  };
}

async function assessOpen(userId: string, body: Record<string, unknown>) {
  const id = Number(body.id);
  const taskId = String(body.taskId ?? "");
  const text = String(body.text ?? "").trim();
  if (!Number.isInteger(id) || id <= 0 || !taskId || text.length < 5) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const [row] = await db
    .select()
    .from(mockExamAttempts)
    .where(and(eq(mockExamAttempts.id, id), eq(mockExamAttempts.userId, userId)))
    .limit(1);
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const paper = mockPaperById(row.paperId);
  const part = paper ? findPart(paper, row.skill as MockSkill) : null;
  const task = part?.tasks.find((t) => t.id === taskId);
  if (!paper || !task || !isOpenTask(task)) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const day = clampDay(typeof body.day === "string" ? body.day : undefined);
  // Değerlendirme kâğıdın dilinde yapılıyor: İngilizce bir yazma görevi
  // "Almanca öğretmeni" kimliğiyle okunursa rubrik olmayan yapıları arar.
  const req = { ...assessTaskFor(task, text.slice(0, MAX_OPEN_CHARS)), level: paper.level as AssessLevel, exerciseId: taskId, locale: "tr" as const, lang: paper.course };
  const outcome = await assess(userId, req, day, (r) => recordAiUsage(userId, { kind: "assess", ...r }));

  const scores = (row.openScores ?? {}) as Record<string, unknown>;
  const entry = outcome.ok
    ? {
        score: outcome.result.score.overall ?? null,
        tip: outcome.result.next_tip_tr,
        praise: outcome.result.praise_tr,
        corrected: outcome.result.corrected,
        errors: outcome.result.errors?.slice(0, 8) ?? [],
      }
    : { score: null, reason: outcome.reason };

  const opens = (row.open ?? {}) as Record<string, string>;
  await db
    .update(mockExamAttempts)
    .set({
      openScores: { ...scores, [taskId]: entry },
      open: { ...opens, [taskId]: text.slice(0, MAX_OPEN_CHARS) },
      updatedAt: new Date(),
    })
    .where(and(eq(mockExamAttempts.id, id), eq(mockExamAttempts.userId, userId)));

  // Sağlayıcı yoksa bu bir hata değil: ekran ölçüt listesini gösterir.
  return NextResponse.json({ result: entry, configured: outcome.ok });
}

async function finish(userId: string, body: Record<string, unknown>) {
  const id = Number(body.id);
  if (!Number.isInteger(id) || id <= 0) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const [row] = await db
    .select()
    .from(mockExamAttempts)
    .where(and(eq(mockExamAttempts.id, id), eq(mockExamAttempts.userId, userId)))
    .limit(1);
  if (!row) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const day = clampDay(typeof body.day === "string" ? body.day : undefined);
  const answers = cleanAnswers(body.answers) ?? {};
  const merged = { ...((row.answers ?? {}) as Record<string, string>), ...answers };
  const score = scorePart(row.paperId, row.skill as MockSkill, merged);
  if (!score) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  // Açıklamalar geri bildirime gidiyor; kâğıttan okunuyor, istemciden değil.
  const paper = mockPaperById(row.paperId)!;
  const part = findPart(paper, row.skill as MockSkill)!;
  const explains: Record<string, string> = {};
  for (const t of part.tasks) for (const it of t.items) explains[it.id] = it.explain;

  const ai = await mockFeedback(score, explains, paper.course, (r) => recordAiUsage(userId, { kind: "assess", ...r }));

  const [saved] = await db
    .update(mockExamAttempts)
    .set({
      state: "done",
      answers: merged,
      correct: score.correct,
      total: score.total,
      score: score.pct,
      passed: score.passed,
      ai,
      finishedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(mockExamAttempts.id, id), eq(mockExamAttempts.userId, userId)))
    .returning();

  await track(userId, "mock_exam_finish", day, score.pct, `${score.level}:${score.skill}`);
  return NextResponse.json({ attempt: shape(saved), score, ai });
}

/* ── istatistik ───────────────────────────────────────────────────────────── */

/**
 * İstatistik: bitmiş denemelerin özeti.
 *
 * Üç kırılım veriliyor çünkü üçü üç ayrı soruya cevap: TOPLAM "ne kadar
 * çalıştım", BÖLÜM "hangi becerim zayıf", GEÇMİŞ "ilerliyor muyum".
 */
