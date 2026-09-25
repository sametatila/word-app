/**
 * ESKİ ADLARIN GEÇİCİ TAKMA ADLARI — tek yer.
 *
 * 2026-09-25'te "ders" ve "rol yapma" adları ürünün dilinden kalktı: Patika'nın
 * Konuşma adımı kodda `conversation`, adımın yapay zekâ sohbeti `chat`
 * (bkz. docs/premium/README.md §2 Sözlük). Veritabanındaki değerler
 * `drizzle/0069_rename_conversation.sql` ile taşındı.
 *
 * Testteki iOS/Android build 6 hâlâ ESKİ adlarla konuşuyor: istek gövdesinde
 * `lessonId`/`roleplayDone`, değerlendirme ve bildirim türünde `roleplay`,
 * ölçüm olaylarında `lesson_*`. Sunucu bu adları GİRİŞTE yeni adlara
 * çeviriyor; yazılan her şey yeni adla yazılıyor, yani veritabanına eski ad
 * bir daha girmiyor.
 *
 * BUILD 7 HERKESE ULAŞINCA BU DOSYA VE ÇAĞRILARI SİLİNECEK. Liste
 * docs/premium/README.md §2.2'de; bu dosya dışında eski ad taşıyan kod
 * olmamalı (tek istisna: eski adresleri yeniden dışa aktaran iki ince rota ve
 * `next.config.ts` yönlendirmeleri).
 */

/** Değerlendirme (`/api/assess`) ve bildirim (`/api/reports`) türü. */
const KIND: Record<string, string> = { roleplay: "chat" };

export function legacyKind(kind: unknown): unknown {
  return typeof kind === "string" && kind in KIND ? KIND[kind] : kind;
}

/** Ölçüm olayı adları (`/api/events`). */
const EVENT_NAME: Record<string, string> = {
  lesson_start: "conversation_start",
  lesson_step: "conversation_step",
  lesson_finish: "conversation_finish",
};

/**
 * Ölçüm olayı türleri: mobil ekran adları (`page_view`/`time_spent`),
 * üretim denemesi türü, misafir kilometre taşı ve gezinme olayının öneki.
 */
const EVENT_KIND: Record<string, string> = {
  Lesson: "Conversation",
  RoleplayExam: "ConversationScored",
  roleplay: "chat",
  first_lesson: "first_conversation",
};
const EVENT_KIND_PREFIX: [string, string][] = [["roleplay_exam:", "conversation_scored:"]];

export function legacyEventName(name: string): string {
  return EVENT_NAME[name] ?? name;
}

export function legacyEventKind(kind: string | undefined): string | undefined {
  if (kind === undefined) return kind;
  if (kind in EVENT_KIND) return EVENT_KIND[kind];
  for (const [from, to] of EVENT_KIND_PREFIX) if (kind.startsWith(from)) return to + kind.slice(from.length);
  return kind;
}

/** Konuşma adımı istek gövdesi: `lessonId` → `conversationId`, `roleplayDone` → `chatDone`. */
export function legacyBody(body: Record<string, unknown>): Record<string, unknown> {
  const out = { ...body };
  if (out.conversationId === undefined && "lessonId" in out) out.conversationId = out.lessonId;
  if (out.chatDone === undefined && "roleplayDone" in out) out.chatDone = out.roleplayDone;
  return out;
}
