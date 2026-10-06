import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { aiConsentStateFor } from "@/lib/ai-consent";
import { sameOrigin } from "@/lib/auth/origin";
import { clampDay } from "@/lib/award";
import { findConversation } from "@/lib/conversations";
import { scoredSteps } from "@/lib/conversations/types";
import { isFinishId, recordConversation } from "@/lib/conversations/progress";

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

  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const userId = who.id;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const { conversationId, correct, chatDone, day, seconds, finishId } = body as Record<string, unknown>;

  const conversation = typeof conversationId === "string" ? await findConversation(conversationId) : undefined;
  if (!conversation) return NextResponse.json({ error: "bad_conversation" }, { status: 400 });
  if (typeof correct !== "number" || correct < 0 || correct > scoredSteps(conversation)) {
    return NextResponse.json({ error: "bad_score" }, { status: 400 });
  }
  /* Bitiriş kimliği (idempotency anahtarı): yeniden deneme ve kuyruk aynı
     kimliği gönderiyor, uç ikinciyi yazmıyor (`recordConversation`). Kimliksiz
     istek (build 9/10) eskisi gibi işleniyor; biçimi bozuk kimlik reddediliyor. */
  if (finishId !== undefined && finishId !== null && !isFinishId(finishId)) {
    return NextResponse.json({ error: "bad_finish_id" }, { status: 400 });
  }

  // Gün istemciden geliyor çünkü seri kullanıcının yerel gününe göre işliyor;
  // sunucunun UTC günü Türkiye'de gece yarısından sonra yanlış gün olurdu.
  // clampDay sunucu-bugününün ±1'ine sıkıştırır: yalnız biçim doğrulansaydı
  // (güvenlik denetimi F5) ileri tarihli conversation istekleriyle seri sınırsız
  // şişirilip kalıcı dondurulabilirdi.
  const today = clampDay(day);
  const secs = typeof seconds === "number" ? Math.max(0, Math.min(3600, Math.round(seconds))) : 0;

  /*
    SOHBET MUAFİYETİ (2026-10-05, Samet). Çevrimdışı senaryolu sohbet kalktı:
    sohbet yalnız yapay zekâyla yürüyor. Yapamayan iki grup var: misafir (yapay
    zekâ sohbeti hesap istiyor) ve metin iznini REDDEDEN kullanıcı. Onların
    konuşması sohbetsiz, anlatım puanıyla geçiliyor; Patika ve modül sınavı
    kilitlenmiyor. Karar burada, istemcinin söylediğine bakılmadan: hiç karar
    vermemiş ya da izni eskimiş kullanıcı muaf DEĞİL (sohbete girince sorulur).
  */
  const chatWaived = chatDone !== true && (who.guest || (await aiConsentStateFor(userId, "ai_text")) === "declined");

  try {
    const result = await recordConversation(
      userId,
      conversation,
      Math.floor(correct),
      chatDone === true,
      today,
      secs,
      isFinishId(finishId) ? finishId : null,
      chatWaived,
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error("[conversation]", err);
    return NextResponse.json({ error: "db" }, { status: 500 });
  }
}
