import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { socialEpisodes, socialPosts } from "@/lib/db/schema";

/**
 * SOSYAL MEDYA TAKVİMİ (panel › İçerik › Sosyal medya, 2026-10-09; Samet: "bir takvimde neyin planlandığını, nasıl
 * yayınlandığını takip edebiliriz").
 *
 * İki kaynak:
 *  - BÖLÜM ve SAAT: `social_episodes` (stüdyo, `lib/studio`; depodan sunucu işçisiyle aktarılır).
 *  - PLATFORM DURUMU: `social_posts`, bölüm × platform başına bir satır. Satır yoksa "planlandı".
 *    Samet platformun zamanlayıcısına koyunca "zamanlandı", yayından sonra bağlantıyla "yayında" der;
 *    metrikler ileride API eşitlemesinden gelir (Instagram: inceleme gerektirmiyor, TikTok: Display API).
 *
 * Saati geçmiş "zamanlandı" kendiliğinden "yayında" sayılmaz: platform zamanlayıcısı başarısız olabilir.
 * Panel bunu ayrı gösterir ("saati geçti").
 */

export type SocialPlatform = "tiktok" | "instagram";
export const SOCIAL_PLATFORMS: SocialPlatform[] = ["tiktok", "instagram"];
export type SocialStatus = "scheduled" | "published" | "skipped";
export const SOCIAL_STATUSES: SocialStatus[] = ["scheduled", "published", "skipped"];

export type SocialPost = {
  episodeId: string | null;
  platform: SocialPlatform;
  status: SocialStatus;
  url: string | null;
  externalId: string | null;
  publishedAt: string | null;
  metrics: Record<string, number> | null;
  metricsAt: string | null;
  note: string | null;
  updatedBy: string | null;
  updatedAt: string;
};

async function knownIds(ids: string[]): Promise<Set<string>> {
  if (!ids.length) return new Set();
  const rows = await db.select({ id: socialEpisodes.id }).from(socialEpisodes).where(inArray(socialEpisodes.id, ids));
  return new Set(rows.map((r) => r.id));
}

export const isSocialPlatform = (v: unknown): v is SocialPlatform => typeof v === "string" && (SOCIAL_PLATFORMS as string[]).includes(v);
/** "planned" satırın silinmesi demek. */
export const isSocialStatus = (v: unknown): v is SocialStatus | "planned" => v === "planned" || (typeof v === "string" && (SOCIAL_STATUSES as string[]).includes(v));

function view(r: typeof socialPosts.$inferSelect): SocialPost {
  return {
    episodeId: r.episodeId,
    platform: r.platform as SocialPlatform,
    status: r.status as SocialStatus,
    url: r.url,
    externalId: r.externalId,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    metrics: r.metrics ?? null,
    metricsAt: r.metricsAt ? r.metricsAt.toISOString() : null,
    note: r.note,
    updatedBy: r.updatedBy,
    updatedAt: r.updatedAt.toISOString(),
  };
}

/** Bütün kayıtlar. Tablo yoksa (göç uygulanmamış) boş liste ve `missing`. */
export async function listSocialPosts(): Promise<{ posts: SocialPost[]; missing: boolean }> {
  try {
    const rows = await db.select().from(socialPosts);
    return { posts: rows.map(view), missing: false };
  } catch (err) {
    console.error("[social-posts] okunamadı", err);
    return { posts: [], missing: true };
  }
}

/** Yalnız http(s) bağlantı; 500 karakter sınırı. */
function cleanUrl(v: unknown): string | null | "bad" {
  if (v == null || v === "") return null;
  const s = String(v).trim().slice(0, 500);
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "bad";
  } catch {
    return "bad";
  }
}

export type SetResult = { ok: true; post: SocialPost | null } | { ok: false; error: "bad_input" | "not_found" };

/**
 * Bir bölümün bir platformdaki durumu. `planned` satırı siler. Bağlantı ve not verilmezse eskisi korunur
 * (toplu "zamanlandı" işaretlemesi elle yazılmış bağlantıyı silmesin); boş dizgi siler.
 */
export async function setSocialPost(input: { episodeId: unknown; platform: unknown; status: unknown; url?: unknown; note?: unknown }, actor: string): Promise<SetResult> {
  const episodeId = String(input.episodeId ?? "");
  const { platform, status } = input;
  if (!isSocialPlatform(platform) || !isSocialStatus(status)) return { ok: false, error: "bad_input" };
  if (!(await knownIds([episodeId])).has(episodeId)) return { ok: false, error: "not_found" };
  if (status === "planned") {
    await db.delete(socialPosts).where(and(eq(socialPosts.episodeId, episodeId), eq(socialPosts.platform, platform)));
    return { ok: true, post: null };
  }
  const url = input.url === undefined ? undefined : cleanUrl(input.url);
  if (url === "bad") return { ok: false, error: "bad_input" };
  const note = input.note === undefined ? undefined : String(input.note ?? "").trim().slice(0, 1000) || null;
  const set: Partial<typeof socialPosts.$inferInsert> = { status, updatedBy: actor, updatedAt: sql`now()` as unknown as Date };
  if (url !== undefined) set.url = url;
  if (note !== undefined) set.note = note;
  if (status === "published") set.publishedAt = sql`coalesce(${socialPosts.publishedAt}, now())` as unknown as Date;
  const [r] = await db
    .insert(socialPosts)
    .values({ episodeId, platform, status, url: url ?? null, note: note ?? null, updatedBy: actor, publishedAt: status === "published" ? new Date() : null })
    .onConflictDoUpdate({ target: [socialPosts.episodeId, socialPosts.platform], set })
    .returning();
  return { ok: true, post: view(r) };
}

/** Toplu işaretleme (ör. iki haftayı TikTok zamanlayıcısına koyduktan sonra). Yalnız durumu değiştirir. */
export async function setSocialPostsBulk(input: { episodeIds: unknown; platform: unknown; status: unknown }, actor: string): Promise<{ ok: true; count: number } | { ok: false; error: "bad_input" }> {
  const ids = Array.isArray(input.episodeIds) ? input.episodeIds.map(String) : [];
  const known = await knownIds(ids);
  if (!ids.length || ids.length > 200 || ids.some((id) => !known.has(id))) return { ok: false, error: "bad_input" };
  const { platform, status } = input;
  if (!isSocialPlatform(platform) || !isSocialStatus(status)) return { ok: false, error: "bad_input" };
  if (status === "planned") {
    const r = await db.delete(socialPosts).where(and(inArray(socialPosts.episodeId, ids), eq(socialPosts.platform, platform))).returning({ id: socialPosts.id });
    return { ok: true, count: r.length };
  }
  for (const episodeId of ids) await setSocialPost({ episodeId, platform, status }, actor);
  return { ok: true, count: ids.length };
}
