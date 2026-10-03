import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { sameOrigin } from "@/lib/auth/origin";
import { pendingAssessments, queueAssessment } from "@/lib/assess";
import { claimAssessAccess } from "@/lib/assess-access";
import { takeUsage } from "@/lib/premium";
import { ASSESS_KINDS, ASSESS_LEVELS, ASSESS_MAX_CHARS, type AssessKind, type AssessLevel } from "@/lib/assess-prompts";
import { aiConsentGate } from "@/lib/ai-consent";

export const dynamic = "force-dynamic";

/*
  KUYRUĞUN SINIRLARI (güvenlik denetimi 2026-10-03, O8). Uçta kota yoktu:
  metni biraz değiştirerek sınırsız satır eklenebiliyordu, işçi de en eskiden
  günde yirmi satır işlediği için dolu bir kuyruk gerçek kullanıcıların
  gecikmeli değerlendirmesini hiç sıraya almıyordu. Kuyruk bir sağlayıcı
  kesintisinin yedeği: kesinti sırasında yazılan birkaç metin.
*/
/** Hesap başına aynı anda bekleyen satır. */
const QUEUE_MAX_PENDING = 5;
/** Hesap başına günde kuyruğa giren satır (atomik; bekleyen tavanının yarışını da kapatıyor). */
const QUEUE_DAILY_LIMIT = 10;

/**
 * Değerlendirme kuyruğu (WP-30): sağlayıcı kapalıyken yazılan metin burada
 * saklanır, `/api/cron/assess` servis dönünce puanlar. Gövde `/api/assess`
 * ile aynı; cevap `{ queued, id }`.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  /* HESAP İSTER: kuyruktaki metin de dil modeline gidiyor; misafire 403 account_required (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;
  /* Kuyruğa giren metin de sonunda dil modeline gidiyor: izin kuyruğa
     girerken soruluyor, işlenirken yeniden okunuyor (`runAssessQueue`). */
  const consent = await aiConsentGate(userId, "ai_text");
  if (consent) return consent;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const b = body as Record<string, unknown>;
  const answer = (b.answer ?? {}) as Record<string, unknown>;
  const text = typeof answer.text === "string" ? answer.text.trim().slice(0, ASSESS_MAX_CHARS) : "";
  if (!text || !ASSESS_KINDS.includes(b.kind as AssessKind) || !ASSESS_LEVELS.includes(b.level as AssessLevel)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const day = typeof b.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.day) ? b.day : new Date().toISOString().slice(0, 10);
  const exerciseId = typeof b.exerciseId === "string" ? b.exerciseId.slice(0, 40) : undefined;
  try {
    /* Premium kapısı `/api/assess` ile aynı: kuyruk kapıyı atlatmasın. */
    const denied = await claimAssessAccess(userId, b.kind as AssessKind, exerciseId ?? null);
    if (denied) return NextResponse.json(denied, { status: 403 });
    if ((await pendingAssessments(userId)) >= QUEUE_MAX_PENDING || !(await takeUsage(userId, "assess_queue", "day", QUEUE_DAILY_LIMIT))) {
      return NextResponse.json({ error: "quota", reason: "fair_use" }, { status: 429 });
    }
    const out = await queueAssessment(
      userId,
      {
        kind: b.kind as AssessKind,
        level: b.level as AssessLevel,
        task: { prompt: typeof (b.task as Record<string, unknown>)?.prompt === "string" ? String((b.task as Record<string, unknown>).prompt).slice(0, 600) : "" },
        answer: { text },
        exerciseId,
        /* Hedef dil: istemci söylerse o, demezse Almanca. Kuyruk satırında
           saklanmıyor — işçi zaten kullanıcının kursundan okuyor
           (`runAssessQueue`); burada yalnız tip sözleşmesi için duruyor. */
        lang: b.lang === "en" ? "en" : "de",
      },
      day,
    );
    return NextResponse.json(out);
  } catch (err) {
    console.error("[assess/queue]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
