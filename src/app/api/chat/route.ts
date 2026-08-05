import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { buildChatContext, streamChat, type ChatMessage } from "@/lib/chat";
import { chatConfigured } from "@/lib/chat-providers";

export const dynamic = "force-dynamic";

/** Sohbet geçmişinin taşınacak kadarı — eski turlar bağlamı şişirmeden düşer. */
const MAX_TURNS = 20;
const MAX_CHARS = 2000;

/**
 * Konuşma ortağı — yanıtı düz metin parçaları hâlinde akıtır.
 *
 * SSE yerine düz akış: istemcinin tek ihtiyacı metin parçalarını sırayla
 * eklemek, olay türü ayırt etmesi gerekmiyor. Hata durumu akış başlamadan
 * önce normal JSON ile döner.
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

  const messages = parseMessages(body);
  if (!messages) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    const ctx = await buildChatContext(userId);
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const delta of streamChat(messages, ctx)) {
            controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("[chat] akış koptu", err);
          // Akış başladıysa durum kodu değiştirilemez; kullanıcı boş baloncuk
          // görmesin diye kopmayı metnin içinde bildiriyoruz.
          controller.enqueue(encoder.encode("\n\n[Bağlantı koptu — tekrar dener misin?]"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
        "x-accel-buffering": "no",
      },
    });
  } catch (err) {
    console.error("[chat]", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const out: ChatMessage[] = [];
  for (const item of raw.slice(-MAX_TURNS)) {
    if (typeof item !== "object" || item === null) return null;
    const m = item as Record<string, unknown>;
    if (m.role !== "user" && m.role !== "assistant") return null;
    if (typeof m.content !== "string") return null;
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (!content) continue;
    out.push({ role: m.role, content });
  }
  // Son söz öğrencinin olmalı; aksi hâlde modele cevaplayacak bir şey yok.
  if (!out.length || out[out.length - 1].role !== "user") return null;
  return out;
}
