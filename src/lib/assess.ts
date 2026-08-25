import "server-only";
import { createHash } from "node:crypto";
import { and, desc, eq, gte, isNotNull, isNull, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { chatConfigured, completeChat, type CallReport } from "@/lib/chat-providers";
import { track } from "@/lib/events";
import { sendToUser } from "@/lib/push";
import {
  ASSESS_MAX_CHARS,
  ASSESS_MAX_TOKENS,
  assessSystemPrompt,
  assessUserMessage,
  parseAssessment,
  type AssessRequest,
  type Assessment,
} from "@/lib/assess-prompts";

/**
 * AI değerlendirme servisi (plan WP-03) — tek giriş noktası.
 *
 * Koçtan (coach.ts) farkı: koç tek cümlelik bir teşhis döner ve susar;
 * burası rubrikli, yapılandırılmış bir değerlendirme döner ve KAYDEDER.
 * Kayıt iki iş görüyor: gelişim grafiği (WP-52 aynı öğrencinin yazma puanı
 * zamanla nasıl değişti) ve önbellek (aynı cevaba iki kez ücret ödenmez).
 *
 * Sağlayıcı yoksa `not_configured`, kota dolduysa `quota`, model bozuk çıktı
 * verdiyse `invalid` — çağıran taraf (route) bunları HTTP koduna çevirir,
 * istemci de kural tabanlı asgari değerlendirmeye düşer
 * (assess-client.ts `fallbackAssessment`). Hiçbir akış burada kilitlenmez.
 */

export type AssessOutcome =
  | { ok: true; result: Assessment; cached: boolean; provider: string | null }
  | { ok: false; reason: "not_configured" | "quota" | "invalid" | "upstream"; detail?: string };

/** Kullanıcı başına günlük değerlendirme; `ASSESS_DAILY_LIMIT` ile ayarlanır. */
export function dailyLimit(): number {
  const n = Number(process.env.ASSESS_DAILY_LIMIT);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 60;
}

/** Aynı görev+cevap için önbellek ömrü. */
const CACHE_HOURS = 24;

/** Görev + cevap özeti: aynı şey yeniden gönderilirse önbellek tutar. */
export function assessHash(req: AssessRequest): string {
  const h = createHash("sha256");
  h.update(
    JSON.stringify({
      k: req.kind,
      l: req.level,
      t: req.task,
      a: req.answer.text.trim(),
    }),
  );
  return h.digest("hex").slice(0, 40);
}

export async function assess(
  userId: string,
  req: AssessRequest,
  /** Yerel gün — olay ve kota buna göre. */
  day: string,
  report?: CallReport,
): Promise<AssessOutcome> {
  if (!chatConfigured()) return { ok: false, reason: "not_configured" };

  const text = req.answer.text.trim().slice(0, ASSESS_MAX_CHARS);
  const clean: AssessRequest = { ...req, answer: { ...req.answer, text } };
  const hash = assessHash(clean);

  // Önbellek: aynı kullanıcının aynı cevabı — "bir daha dene"de değişmemiş
  // metni yeniden göndermek olağan; ikinci çağrı ücretsiz ve anında.
  const [cached] = await db
    .select({ result: assessments.result, provider: assessments.provider })
    .from(assessments)
    .where(
      and(
        eq(assessments.userId, userId),
        eq(assessments.hash, hash),
        isNotNull(assessments.result),
        gte(assessments.createdAt, new Date(Date.now() - CACHE_HOURS * 3600 * 1000)),
      ),
    )
    .orderBy(desc(assessments.createdAt))
    .limit(1);
  if (cached) {
    return { ok: true, result: cached.result as Assessment, cached: true, provider: cached.provider };
  }

  // Kota: önbellek isabetleri sayılmaz (ücretsiz), yalnız model çağrıları.
  const [{ n }] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(assessments)
    .where(and(eq(assessments.userId, userId), eq(assessments.day, day)));
  if (n >= dailyLimit()) return { ok: false, reason: "quota" };

  let provider: string | null = null;
  const reportAndRemember: CallReport = (r) => {
    if (r.ok) provider = `${r.provider}/${r.model}`;
    report?.(r);
  };

  let raw: string;
  try {
    raw = await completeChat(
      assessSystemPrompt(clean.kind, clean.level),
      [{ role: "user", content: assessUserMessage(clean) }],
      ASSESS_MAX_TOKENS,
      reportAndRemember,
    );
  } catch (err) {
    return { ok: false, reason: "upstream", detail: (err as Error).message };
  }

  const result = parseAssessment(raw, text, clean.kind);
  if (!result) {
    console.error("[assess] geçersiz çıktı", raw.slice(0, 300));
    return { ok: false, reason: "invalid" };
  }

  // Kayıt ve olay. Cevap metni burada saklanır (öğrenci kendi yazısını
  // görebilsin, WP-52); `events`'e yalnız puan gider — gizlilik kuralı.
  await db.insert(assessments).values({
    userId,
    kind: clean.kind,
    exerciseId: clean.exerciseId ?? null,
    level: clean.level,
    day,
    answer: text,
    result,
    provider,
    hash,
  });
  await track(userId, "production_attempt", day, result.score.overall, productionKind(clean.kind));

  return { ok: true, result, cached: false, provider };
}

/** KPI 2'nin `kind` etiketi: değerlendirme türünden üretim türüne. */
function productionKind(kind: AssessRequest["kind"]): string {
  switch (kind) {
    case "sentence":
      return "free_sentence";
    case "writing":
      return "writing_free";
    case "speaking":
      return "speaking_drill";
    case "roleplay":
      return "roleplay";
  }
}

/**
 * Kuyruğa al (WP-30): sağlayıcı yokken yazma metni kaybolmasın. Satır
 * `result = null` ile yazılır; `runAssessQueue` servis dönünce puanlar.
 * Aynı metin zaten kuyruktaysa ikinci kez eklenmez.
 */
export async function queueAssessment(userId: string, req: AssessRequest, day: string): Promise<{ queued: boolean; id: number | null }> {
  const text = req.answer.text.trim().slice(0, ASSESS_MAX_CHARS);
  if (!text) return { queued: false, id: null };
  const clean: AssessRequest = { ...req, answer: { ...req.answer, text } };
  const hash = assessHash(clean);
  const [existing] = await db
    .select({ id: assessments.id })
    .from(assessments)
    .where(and(eq(assessments.userId, userId), eq(assessments.hash, hash)))
    .orderBy(desc(assessments.createdAt))
    .limit(1);
  if (existing) return { queued: false, id: existing.id };
  const [row] = await db
    .insert(assessments)
    .values({ userId, kind: clean.kind, exerciseId: clean.exerciseId ?? null, level: clean.level, day, answer: text, result: null, provider: null, hash })
    .returning({ id: assessments.id });
  return { queued: true, id: row?.id ?? null };
}

/**
 * Kuyruğu işler: en eski `limit` kayıt, her biri bir model çağrısı. Sağlayıcı
 * hâlâ yoksa hiç dokunmaz. Görev bilgisi kuyrukta saklanmadığı için istem
 * tür + seviye + metinle kurulur (görev metni olmadan görev puanı yaklaşıktır;
 * kart bunu "gecikmeli değerlendirme" diye söyler). Puanlanan kullanıcıya
 * bildirim gider (push açıksa).
 */
export async function runAssessQueue(limit = 20): Promise<{ pending: number; done: number; failed: number }> {
  const rows = await db
    .select()
    .from(assessments)
    .where(isNull(assessments.result))
    .orderBy(assessments.createdAt)
    .limit(limit);
  if (!rows.length) return { pending: 0, done: 0, failed: 0 };
  if (!chatConfigured()) return { pending: rows.length, done: 0, failed: 0 };
  let done = 0;
  let failed = 0;
  for (const row of rows) {
    const kind = (["sentence", "writing", "speaking", "roleplay"] as const).includes(row.kind as "writing") ? (row.kind as AssessRequest["kind"]) : "writing";
    const level = (["A1", "A2", "B1", "B2", "C1"] as const).includes(row.level as "A1") ? (row.level as AssessRequest["level"]) : "A1";
    const req: AssessRequest = {
      kind,
      level,
      task: { prompt: "Serbest yazma görevi (gecikmeli değerlendirme: görev metni yok, metni kendi başına değerlendir)." },
      answer: { text: row.answer },
      exerciseId: row.exerciseId ?? undefined,
      locale: "tr",
    };
    let provider: string | null = null;
    try {
      const raw = await completeChat(assessSystemPrompt(req.kind, req.level), [{ role: "user", content: assessUserMessage(req) }], ASSESS_MAX_TOKENS, (r) => {
        if (r.ok) provider = `${r.provider}/${r.model}`;
      });
      const result = parseAssessment(raw, row.answer, req.kind);
      if (!result) {
        failed++;
        continue;
      }
      await db.update(assessments).set({ result, provider }).where(eq(assessments.id, row.id));
      await track(row.userId, "production_attempt", row.day as unknown as string, result.score.overall, productionKind(req.kind));
      done++;
      try {
        await sendToUser(row.userId, {
          title: "Yazın değerlendirildi",
          body: `Puan ${result.score.overall}/100 — düzeltmelere bak.`,
          url: "/profile#writings",
          tag: "assess",
        });
      } catch {
        /* bildirim yoksa sessiz */
      }
    } catch (err) {
      console.error("[assess] kuyruk", row.id, err);
      failed++;
    }
  }
  return { pending: rows.length - done - failed, done, failed };
}

/** Kullanıcının kendi yazıları — profil "Yazılarım" (WP-30/64). */
export async function listAssessments(userId: string, limit = 20) {
  const rows = await db
    .select({
      id: assessments.id,
      kind: assessments.kind,
      level: assessments.level,
      day: assessments.day,
      answer: assessments.answer,
      result: assessments.result,
      createdAt: assessments.createdAt,
    })
    .from(assessments)
    .where(eq(assessments.userId, userId))
    .orderBy(desc(assessments.createdAt))
    .limit(limit);
  return rows.map((r) => ({
    id: r.id,
    kind: r.kind,
    level: r.level,
    day: String(r.day),
    answer: r.answer,
    result: (r.result as Assessment | null) ?? null,
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function deleteAssessment(userId: string, id: number): Promise<boolean> {
  const rows = await db
    .delete(assessments)
    .where(and(eq(assessments.userId, userId), eq(assessments.id, id)))
    .returning({ id: assessments.id });
  return rows.length > 0;
}
