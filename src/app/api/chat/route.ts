import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { sameOrigin } from "@/lib/auth/origin";
import { chatConfigured, type ProviderMeta } from "@/lib/chat-providers";
import { findConversation } from "@/lib/conversations";
import { conversationDisabled } from "@/lib/content/read";
import { streamDialogue, streamChat, type ChatMode, type ChatTurn } from "@/lib/conversations/chat";
import { MAX_HISTORY } from "@/lib/conversations/chat-const";
import { getExercise } from "@/lib/skills";
import { logChatTurn } from "@/lib/conversations/log";
import { langOf } from "@/lib/social/notify";
import { translate } from "@/lib/i18n/dict";
import { localiseExercise, localiseConversation } from "@/lib/conversations/native-server";
import { recordAiUsage } from "@/lib/ai-usage";
import { legacyBody } from "@/lib/legacy-names";
import { takeUsage } from "@/lib/premium";
import { claimTiered } from "@/lib/premium/access";
import { aiConsentGate, aiConsentStateFor } from "@/lib/ai-consent";

export const dynamic = "force-dynamic";

/**
 * Rol yapma geçmişinin taşınacak kadarı — eski turlar bağlamı şişirmeden
 * düşer. Sınır `chat-const`ta ve tur sayısından TÜRETİLİYOR: sabit bir
 * sayı, uzun konuşmalarda açılışı kırpıp sunucudaki tur sayımını bozuyordu.
 */
const MAX_CHARS = 2000;

/**
 * Kullanıcı başına günlük rol yapma/diyalog turu (ai_usage'daki sağlayıcı
 * denemeleri, düşenler dâhil). Sohbet koçu paylaşılan ücretsiz sağlayıcı
 * kotasına (Groq/Mistral/Cerebras) dayanıyor; tek hesabın döngüyle bu kotayı
 * tüketip herkese "sohbet kapalı" gösterebilmesi bir istismar yoluydu. Sınır
 * cömert: dürüst ağır kullanım ~100-150 turdur.
 */
const CHAT_DAILY_LIMIT = DAILY_QUOTAS.chatTurns;

/**
 * Rol yapma ucu — dersin konuşma bölümü.
 *
 * Eski `/api/chat`'in yerine geçiyor ve tek farkı belirleyici: istek bir ders
 * kimliği taşımak zorunda. Serbest sohbet yok, her konuşma bir dersin kuralına
 * bağlı. Bilinmeyen ders kimliği reddediliyor — konusuz konuşma bu uçtan
 * çıkamaz.
 */
/**
 * Servis durumu (WP-04): oynatıcı konuşma fazına girerken sorar ve
 * sağlayıcı yoksa ilk turdan itibaren senaryolu konuşmaya geçer — 503'ü
 * öğrencinin ilk cümlesinde yemek yerine.
 */
export async function GET() {
  /* HESAP İSTER: misafir yapay zekâyla konuşamıyor; istemci 403 account_required'ı senaryolu konuşmaya ve "hesap oluştur" satırına çeviriyor (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;
  /*
    RIZA DURUMU DA BURADA. Oynatıcı konuşma fazına girerken zaten bu ucu
    soruyor; yapay zekâya izin vermemiş ("declined") kullanıcı ilk cümlesini
    403'e yedirmek yerine baştan senaryolu konuşmaya geçiyor. Hiç karar
    vermemiş kullanıcıya ise ilk turda izin ekranı açılıyor (istemci).
  */
  const consent = await aiConsentStateFor(userId, "ai_text");
  return NextResponse.json({ configured: chatConfigured(), consent }, { headers: { "cache-control": "no-store" } });
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  /* HESAP İSTER: yapay zekâ konuşması misafire kapalı, 403 account_required (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  if (!chatConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  /*
    YAPAY ZEKÂ RIZASI — metin dil modeline gitmeden ÖNCE (App Store 5.1.2(i),
    Play Kullanıcı Verileri). İzin yoksa istek sağlayıcıya hiç iletilmiyor;
    istemci 403'ü yakalayıp izin ekranını açıyor (bkz. lib/ai-consent).
  */
  const consent = await aiConsentGate(userId, "ai_text");
  if (consent) return consent;

  if (!(await underDailyLimit(userId))) {
    return NextResponse.json({ error: "quota" }, { status: 429 });
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

  // Build 6 alanı eski adla gönderiyor (geçici, lib/legacy-names).
  const { conversationId, exerciseId, messages: raw, mode: rawMode } = legacyBody(body as Record<string, unknown>) as { conversationId?: unknown; exerciseId?: unknown; messages?: unknown; mode?: unknown };
  // Mod (WP-22): sınavda yardım/düzeltme yok; kayıtta da işaretlenir.
  const mode: ChatMode = rawMode === "exam" ? "exam" : "practice";
  // Beceri diyaloğu (WP-23): ders yerine temalı egzersiz; senaryo istemcide yedek.
  const dialogue = typeof exerciseId === "string" ? await getExercise(exerciseId) : undefined;
  const dialogueRaw = dialogue && dialogue.skill === "speaking" && "dialogue" in dialogue && dialogue.theme ? dialogue : undefined;
  const conversationRaw = typeof conversationId === "string" ? await findConversation(conversationId) : undefined;
  /* Kapatılmış dersin rol yapması da kapalı — içerik aynı yerden geliyor. */
  if (conversationRaw && (await conversationDisabled(conversationRaw.id))) {
    return NextResponse.json({ error: "unknown_conversation" }, { status: 400 });
  }
  if (!conversationRaw && !dialogueRaw) return NextResponse.json({ error: "bad_conversation" }, { status: 400 });

  /**
   * ÖĞRENCİNİN DİLİ İKİ YERE BİRDEN GİRİYOR.
   *
   * İstem ana dili bildiriyor ve tıkanınca yardım o dilde geliyordu — ama
   * "Türkçe" sabitti: anadili İngilizce ya da Almanca olan öğrenci dersin en
   * çok konuşulan yerinde Türkçe açıklama alıyordu.
   *
   * İkincisi sahnenin kendisi: model kalıpları ve kelimeleri `p.tr`/`v.tr`
   * ile görüyor, yani dersin ANA DİL yüzüyle. Ham ders verilseydi model
   * Türkçe bir referans listesine bakıp öğrenciye başka bir dilde yardım
   * etmeye çalışırdı. Çözülemeyen ders olduğu gibi geçiyor (hep-ya-hiç).
   */
  const native = await langOf(userId);
  const conversation = conversationRaw ? await localiseConversation(conversationRaw, native) : undefined;
  const dialogueEx = dialogueRaw ? await localiseExercise(dialogueRaw, native) : undefined;
  const logId = conversation?.id ?? dialogueEx!.id;

  const messages = parseMessages(raw);
  if (!messages) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  /*
    PATİKA KONUŞMA HAKKI (2026-09-25, `docs/premium/README.md` §2). Konuşma adımı
    — anlatım + bu sohbet + isteğe bağlı puanlı kısım — ücretsizde seviye başına
    2 + "bitir ve 7 günlük seri yap" dilimleri. Hak adımın İLK yapay zekâ turunda
    düşüyor ve adım sahipleniliyor; sonraki turlar ve adımı yeniden açmak hak
    yemiyor (`claimTiered`). Hak yoksa 403 premium_required: istemci adımı
    kilitli gösterip paywall açıyor.

    SENARYOLU YOL KAPIDA DEĞİL. Misafir (yukarıda 403 account_required) ve yapay
    zekâ iznini REDDEDEN kullanıcı (403 consent) bu noktaya hiç gelmiyor;
    istemci onlara maliyetsiz senaryolu konuşmayı açıyor ve adım kilitlenmiyor —
    izin zorlanamaz (App Store 5.1.2(i)) ve senaryolu yolun maliyeti yok. Hakkı
    bitmiş ama izin vermiş kullanıcı senaryoluya DÜŞMÜYOR, kilidi görüyor.
    Premium'da tavan sohbet mesajı (aşağıda, günde `chatTurns`).
  */
  if (conversationRaw) {
    const gate = await claimTiered(userId, "conversation", conversationRaw.level, conversationRaw.id);
    if (!gate.allowed) {
      return NextResponse.json({ error: "premium_required", reason: gate.reason, gate: gate.gate }, { status: 403 });
    }
  }

  // Paralel patlamaya karşı atomik sayaç — gerekçesi `/api/stt`'de aynı yerde.
  // Gövde doğrulandıktan SONRA: bozuk istek hak yakmasın.
  if (!(await takeUsage(userId, "chat_turns", "day", CHAT_DAILY_LIMIT))) {
    return NextResponse.json({ error: "quota" }, { status: 429 });
  }

  try {
    const encoder = new TextEncoder();
    // Öğrencinin son sözü ve modelin cevabı geçici olarak kaydediliyor
    // (bkz. lib/conversations/log.ts). Kayıt akışın SONUNDA yazılıyor: akıtırken
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
          // Her deneme muhasebeye yazılıyor — düşen sağlayıcı dâhil. Zincir
          // onu sessizce atladığı için, kaydedilmeyen bir hata hiç olmamış
          // gibi duruyordu.
          const gen = conversation
            ? streamChat(conversation, messages, (m) => (meta = m), (r) => recordAiUsage(userId, { kind: "chat", ...r }), mode, native)
            : streamDialogue(dialogueEx!, messages, (m) => (meta = m), (r) => recordAiUsage(userId, { kind: "chat", ...r }), native);
          for await (const delta of gen) {
            full += delta;
            controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("[chat] akış koptu", err);
          // Akış başladıysa durum kodu değiştirilemez; kullanıcı boş baloncuk
          // görmesin diye kopmayı metnin içinde bildiriyoruz.
          controller.enqueue(encoder.encode(`\n\n[${translate(native, "chat.stream_dropped")}]`));
        } finally {
          controller.close();
          if (full.trim()) void logChatTurn(userId, logId, turn, said, full, meta, mode);
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

function parseMessages(raw: unknown): ChatTurn[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: ChatTurn[] = [];
  for (const item of raw.slice(-MAX_HISTORY)) {
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

async function underDailyLimit(userId: string): Promise<boolean> {
  try {
    const { db } = await import("@/lib/db");
    const { aiUsage } = await import("@/lib/db/schema");
    const { and, eq, gte, sql } = await import("drizzle-orm");
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(aiUsage)
      .where(and(eq(aiUsage.userId, userId), eq(aiUsage.kind, "chat"), gte(aiUsage.createdAt, sql`now() - interval '1 day'`)));
    return (row?.n ?? 0) < CHAT_DAILY_LIMIT;
  } catch {
    return true;
  }
}
