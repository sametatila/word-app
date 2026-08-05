import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { coachSpeech, coachDialogue } from "@/lib/coach";
import { chatConfigured } from "@/lib/chat-providers";

export const dynamic = "force-dynamic";

/** Uzun metin koça gitmez: tanıyıcı çıktısı bir cümle, fazlası şişirme demek. */
const MAX_CHARS = 400;
const MAX_LIST = 8;

/**
 * Konuşma koçu ucu.
 *
 * Sohbetten ayrı bir rota çünkü işleri farklı: sohbet akıyor ve konuşmayı
 * sürdürüyor, koç tek cümlelik bir teşhis dönüp susuyor. Akışsız olması
 * istemciyi de basitleştiriyor — tek `fetch`, tek cevap.
 *
 * Sağlayıcı yoksa ya da hepsi düşmüşse 503 dönüyor; çağıran taraf bunu bir
 * hata olarak göstermiyor, kendi çevrimdışı cevabında kalıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!chatConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  try {
    if (b.kind === "speaking") {
      const target = text(b.target);
      const heard = list(b.heard);
      if (!target || !heard.length) {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
      }
      const hint = await coachSpeech(target, heard, list(b.missing));
      return NextResponse.json({ text: hint.text });
    }

    if (b.kind === "dialogue") {
      const ask = text(b.ask);
      const heard = text(b.heard);
      if (!ask || !heard) {
        return NextResponse.json({ error: "bad_request" }, { status: 400 });
      }
      const hint = await coachDialogue(ask, text(b.cue), heard, list(b.expected));
      return NextResponse.json({ text: hint.text });
    }

    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  } catch (err) {
    console.error("[coach]", err);
    // 502 değil 503: istemci için ikisi de "koç yok" demek, ama 503 durumu
    // doğru anlatıyor — istek bozuk değil, sağlayıcılar şu an müsait değil.
    return NextResponse.json({ error: "upstream" }, { status: 503 });
  }
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_CHARS) : "";
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(text).filter(Boolean).slice(0, MAX_LIST);
}
