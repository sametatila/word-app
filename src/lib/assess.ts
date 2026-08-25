import "server-only";
import { createHash } from "node:crypto";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { assessments } from "@/lib/db/schema";
import { chatConfigured, completeChat, type CallReport } from "@/lib/chat-providers";
import { track } from "@/lib/events";
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
