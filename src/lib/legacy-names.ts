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

/**
 * İçerik paketi öneki: Konuşma adımı paketleri `conversations/<kurs>-<sv>`,
 * build 6 aynı içeriği `lessons/<kurs>-<sv>` adıyla istiyor. Yayın iki adı
 * birden yayınlıyor (`scripts/content-publish`, eski ad eski projeksiyonla),
 * gösterge de kapatılan maddeyi iki adla birden bildiriyor.
 */
const PACK_PREFIX: [string, string][] = [["conversations/", "lessons/"]];

export function legacyPackName(pack: string): string | null {
  for (const [now, old] of PACK_PREFIX) if (pack.startsWith(now)) return old + pack.slice(now.length);
  return null;
}

/**
 * Yayınlanan Konuşma adımı maddesinin build 6'nın okuduğu biçimi: sohbet
 * alanı `roleplay` adını taşıyordu.
 */
export function legacyConversationItem<T extends { chat?: unknown }>(item: T): Omit<T, "chat"> & { roleplay?: unknown } {
  const { chat, ...rest } = item;
  return { ...rest, roleplay: chat };
}

/**
 * Anadil sözlüğü paketlerinin (`native/en`, `native/de`) maddeleri: build 6
 * sohbet sahnesini `roleplay`, Almanca Konuşma metinlerini `lesson`
 * maddesinden okuyor. Madde DEĞERİ aynı, yalnız adı değişti; gövde hash
 * adresli olduğu için ikinci kez yayınlamak gerekmiyor. Build 6'ya giden
 * manifestte yeni adlı maddenin yanına aynı hash'le eski adı ekleniyor ve
 * paket arşivi (`f`) düşürülüyor: arşiv maddeleri yeni adla taşıyor, eski
 * istemci maddeleri tek tek indiriyor. Yeni istemci hiçbir fazla bayt
 * indirmiyor.
 */
const LEGACY_NATIVE_ITEMS: [now: string, old: string][] = [
  ["chat", "roleplay"],
  ["conversation", "lesson"],
];

type ManifestLike = { f: unknown; i: { i: string; h: string; b: number }[]; x: string[] };

export function legacyNativeManifest<M extends ManifestLike>(pack: string, m: M): M {
  if (!pack.startsWith("native/")) return m;
  const aliases = new Map(LEGACY_NATIVE_ITEMS);
  const extra = m.i.filter((e) => aliases.has(e.i)).map((e) => ({ ...e, i: aliases.get(e.i)! }));
  const aliased = new Set(extra.map((e) => e.i));
  return { ...m, f: null, i: [...m.i, ...extra], x: m.x.filter((id) => !aliased.has(id)) };
}

/**
 * Tarayıcı deposu: eski anahtarlardaki yarım Konuşma adımı ve gönderilmeyi
 * bekleyen sonuçlar yeni anahtara BİR KEZ taşınıyor, eskisi siliniyor.
 * Kullanıcının yerel ilerlemesi kaybolmuyor.
 */
const OLD_PENDING = "lernomi-lessons-pending";
const OLD_RESUME = "lernomi-lesson-progress:";

export function migrateLegacyWebStorage(store: Storage, pendingKey: string, resumePrefix: string): void {
  try {
    const pending = store.getItem(OLD_PENDING);
    if (pending !== null) {
      const old = JSON.parse(pending) as Record<string, unknown>[];
      const now = JSON.parse(store.getItem(pendingKey) ?? "[]") as Record<string, unknown>[];
      const merged = [...old.map(legacyBody), ...now];
      store.setItem(pendingKey, JSON.stringify(merged.slice(-20)));
      store.removeItem(OLD_PENDING);
    }
  } catch {
    /* bozuk kayıt: taşınamıyor, sonraki temizlik eskisini siler */
  }
  try {
    const keys: string[] = [];
    for (let i = 0; i < store.length; i++) {
      const key = store.key(i);
      if (key?.startsWith(OLD_RESUME)) keys.push(key);
    }
    for (const key of keys) {
      const raw = store.getItem(key);
      store.removeItem(key);
      if (!raw) continue;
      const v = JSON.parse(raw) as { phase?: string };
      if (v && v.phase === "roleplay") v.phase = "chat";
      store.setItem(`${resumePrefix}:${key.slice(OLD_RESUME.length)}`, JSON.stringify(v));
    }
  } catch {
    /* depolama kapalı */
  }
}

/* ── Cevap tarafı: build 6'nın okuduğu eski alan ve değerler ─────────────── */

/**
 * İstek build 6 ya da daha eski bir mobil istemciden mi geliyor. Mobil her
 * istekte `x-lernomi-client: android/1.0.3/6` gönderiyor; web göndermiyor ve
 * her zaman yeni adları alıyor.
 */
const LEGACY_MAX_BUILD = 6;

export function isLegacyClient(headers: Headers): boolean {
  const m = /^(ios|android)\/[\d.]+\/(\d{1,7})$/.exec(headers.get("x-lernomi-client")?.trim() ?? "");
  return !!m && Number(m[2]) <= LEGACY_MAX_BUILD;
}

/** Patika öğe türü: `conversation` → `lesson`. */
const ITEM_KIND: Record<string, string> = { conversation: "lesson" };

/** `/api/immersion` ünitesi: tür değeri ve sayaç alanları eski adla. */
export function legacyImmersionUnit<U extends { conversationsDone: number; conversationsTotal: number; items: { kind: string }[] }>(u: U) {
  return {
    ...u,
    lessonsDone: u.conversationsDone,
    lessonsTotal: u.conversationsTotal,
    items: u.items.map((it) => ({ ...it, kind: ITEM_KIND[it.kind] ?? it.kind })),
  };
}

/** `/api/boss` modül durumu: sayaç alanları eski adla. */
export function legacyBossModule<M extends { conversationsDone: number; conversationsTotal: number }>(m: M) {
  return { ...m, lessonsDone: m.conversationsDone, lessonsTotal: m.conversationsTotal };
}

/** `/api/achievements` rozet grubu: `conversations` → `lessons`. */
export function legacyAchievementGroup(group: string): string {
  return group === "conversations" ? "lessons" : group;
}
