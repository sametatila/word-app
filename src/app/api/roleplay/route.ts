import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { chatConfigured, type ProviderMeta } from "@/lib/chat-providers";
import { findLesson } from "@/lib/lessons";
import { streamRoleplay, type RoleplayTurn } from "@/lib/lessons/roleplay";
import { logRoleplayTurn } from "@/lib/lessons/log";

export const dynamic = "force-dynamic";

/** Rol yapma geçmişinin taşınacak kadarı — eski turlar bağlamı şişirmeden düşer. */
const MAX_TURNS = 16;
const MAX_CHARS = 2000;

/**
 * Rol yapma ucu — dersin konuşma bölümü.
 *
 * Eski `/api/chat`'in yerine geçiyor ve tek farkı belirleyici: istek bir ders
 * kimliği taşımak zorunda. Serbest sohbet yok, her konuşma bir dersin kuralına
 * bağlı. Bilinmeyen ders kimliği reddediliyor — konusuz konuşma bu uçtan
 * çıkamaz.
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

  const { lessonId, messages: raw } = body as { lessonId?: unknown; messages?: unknown };
  const lesson = typeof lessonId === "string" ? findLesson(lessonId) : undefined;
  if (!lesson) return NextResponse.json({ error: "bad_lesson" }, { status: 400 });

  const messages = parseMessages(raw);
  if (!messages) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    const encoder = new TextEncoder();
    // Öğrencinin son sözü ve modelin cevabı geçici olarak kaydediliyor
    // (bkz. lib/lessons/log.ts). Kayıt akışın SONUNDA yazılıyor: akıtırken
    // veritabanına gitmek cevabı geciktirirdi.
    const said = messages[messages.length - 1].content;
    const turn = messages.filter((m) => m.role === "user").length;
    let full = "";
    // Hangi sağlayıcının cevapladığı akış başlarken bildiriliyor; kayıt akışın
    // sonunda yazıldığı için o ana kadar tutuluyor.
    let meta: ProviderMeta | undefined;

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const delta of streamRoleplay(lesson, messages, (m) => (meta = m))) {
            full += delta;
            controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("[roleplay] akış koptu", err);
          // Akış başladıysa durum kodu değiştirilemez; kullanıcı boş baloncuk
          // görmesin diye kopmayı metnin içinde bildiriyoruz.
          controller.enqueue(encoder.encode("\n\n[Bağlantı koptu — tekrar dener misin?]"));
        } finally {
          controller.close();
          if (full.trim()) void logRoleplayTurn(userId, lesson.id, turn, said, full, meta);
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
    console.error("[roleplay]", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}

function parseMessages(raw: unknown): RoleplayTurn[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: RoleplayTurn[] = [];
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
