import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { clampDay } from "@/lib/award";
import { legacyBody } from "@/lib/legacy-names";
import { findConversation } from "@/lib/conversations";
import { scoredSteps } from "@/lib/conversations/types";
import { recordConversation } from "@/lib/conversations/progress";

export const dynamic = "force-dynamic";

/**
 * Konuşma sonucunun kaydı.
 *
 * Sonuç sunucuda tutuluyor: hangi konuşmayı bitirdiğin ve kuralın ne zaman
 * tekrarlanacağı hesaba ait, cihaza değil — telefonda bitirilen konuşma
 * bilgisayarda da bitmiş sayılmalı.
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
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // Build 6 alanları eski adla gönderiyor (geçici, lib/legacy-names).
  const { conversationId, correct, chatDone, day, seconds } = legacyBody(body as Record<string, unknown>);

  const conversation = typeof conversationId === "string" ? await findConversation(conversationId) : undefined;
  if (!conversation) return NextResponse.json({ error: "bad_conversation" }, { status: 400 });
  if (typeof correct !== "number" || correct < 0 || correct > scoredSteps(conversation)) {
    return NextResponse.json({ error: "bad_score" }, { status: 400 });
  }

  // Gün istemciden geliyor çünkü seri kullanıcının yerel gününe göre işliyor;
  // sunucunun UTC günü Türkiye'de gece yarısından sonra yanlış gün olurdu.
  // clampDay sunucu-bugününün ±1'ine sıkıştırır: yalnız biçim doğrulansaydı
  // (güvenlik denetimi F5) ileri tarihli conversation istekleriyle seri sınırsız
  // şişirilip kalıcı dondurulabilirdi.
  const today = clampDay(day);
  const secs = typeof seconds === "number" ? Math.max(0, Math.min(3600, Math.round(seconds))) : 0;

  try {
    const result = await recordConversation(
      userId,
      conversation,
      Math.floor(correct),
      chatDone === true,
      today,
      secs,
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error("[conversation]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
