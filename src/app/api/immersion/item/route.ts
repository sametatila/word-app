import { NextResponse } from "next/server";
import { legacyPathItemId } from "@/lib/legacy-names";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile } from "@/lib/session";
import { parsePracticeItemId, recordPracticeItem } from "@/lib/immersion/practice";

export const dynamic = "force-dynamic";

/**
 * Patika pratik adımı bitti — dil bilgisi, tekrar ya da kontrol noktası.
 *
 *   POST { itemId, correct, total } → { bestPct, passed, attempts }
 *
 * Puan sunucuda hesaplanıyor (`correct` madde sayısıyla sınırlı). Öğe kullanıcının
 * KENDİ kursuna ait olmalı: başka kursun kimliğiyle yazılan kayıt o kursun
 * patikasını ilerletirdi.
 */
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
  const b = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  // Build 6 ünite quizini eski kimlikle (`-checkpoint1`) gönderiyor (geçici, lib/legacy-names).
  const rawId = legacyPathItemId(b.itemId);
  const itemId = typeof rawId === "string" && rawId.length <= 40 ? rawId : "";
  const total = typeof b.total === "number" && Number.isInteger(b.total) ? b.total : -1;
  const correct = typeof b.correct === "number" && Number.isInteger(b.correct) ? b.correct : -1;
  const parsed = parsePracticeItemId(itemId);
  if (!parsed || total < 1 || total > 50 || correct < 0) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const profile = await ensureProfile(userId);
    if (profile.course !== parsed.course) return NextResponse.json({ error: "wrong_course" }, { status: 400 });
    const pct = (100 * Math.min(correct, total)) / total;
    const r = await recordPracticeItem(userId, itemId, pct);
    return NextResponse.json(r);
  } catch (err) {
    console.error("[immersion/item]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
