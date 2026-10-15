import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
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
 *    metrikler API eşitlemesinden gelir (Instagram: `scripts/social/instagram.mjs`, 2026-10-10; TikTok: `scripts/social/tiktok.mjs`, YouTube: `scripts/social/youtube.mjs`, 2026-10-12).
 *  - INSTAGRAM OTOMATİK YAYIN: durum "auto" → işçi saatinde yayınlar (güncel sürüm onaylı ve videosu hazırsa);
 *    "publishing" yayın adımı kilitli (elle değiştirilemez), "failed" olmadı (`job.error`; yeniden "auto" tekrar dener).
 *
 * Saati geçmiş "zamanlandı" kendiliğinden "yayında" sayılmaz: platform zamanlayıcısı başarısız olabilir.
 * Panel bunu ayrı gösterir ("saati geçti").
 */

export type SocialPlatform = "tiktok" | "instagram" | "youtube";
export const SOCIAL_PLATFORMS: SocialPlatform[] = ["tiktok", "instagram", "youtube"];
export type SocialStatus = "scheduled" | "published" | "skipped" | "auto" | "publishing" | "failed";
/** Elle seçilebilenler ("publishing" ve "failed" yalnız işçinin). */
export const SOCIAL_STATUSES: SocialStatus[] = ["scheduled", "published", "skipped", "auto"];

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
  /** Otomatik yayın işinin görünen kısmı (Instagram) */
  job: { error: string | null; preparedAt: string | null; attempts: number } | null;
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

export function postView(r: typeof socialPosts.$inferSelect): SocialPost {
  const j = r.job;
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
    job: j ? { error: typeof j.error === "string" ? j.error : null, preparedAt: typeof j.preparedAt === "string" && j.containerId ? j.preparedAt : null, attempts: Number(j.attempts) || 0 } : null,
    updatedBy: r.updatedBy,
    updatedAt: r.updatedAt.toISOString(),
  };
}

/** Bütün kayıtlar. Tablo yoksa (göç uygulanmamış) boş liste ve `missing`. */
export async function listSocialPosts(): Promise<{ posts: SocialPost[]; missing: boolean }> {
  try {
    const rows = await db.select().from(socialPosts);
    return { posts: rows.map(postView), missing: false };
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

/** Platformdaki gönderinin kimliği (TikTok video, YouTube, Instagram reel); tanınmayan adres kendisi. */
export function postKey(url: string): string {
  const m = /tiktok\.com\/.*\/video\/(\d+)/.exec(url) || /youtube\.com\/(?:shorts\/|watch\?v=)([\w-]{6,})/.exec(url) || /youtu\.be\/([\w-]{6,})/.exec(url) || /instagram\.com\/(?:reels?|p)\/([\w-]+)/.exec(url);
  return m ? m[1] : url.replace(/[?#].*$/, "").replace(/\/$/, "");
}

export type SetResult =
  | { ok: true; post: SocialPost | null }
  | { ok: false; error: "bad_input" | "not_found" | "publishing" | "auto_needs_slot" }
  | { ok: false; error: "stale"; post: SocialPost | null }
  | { ok: false; error: "duplicate_url"; detail: string };

/**
 * Bir bölümün bir platformdaki durumu. `planned` satırı siler. Bağlantı ve not verilmezse eskisi korunur
 * (toplu "zamanlandı" işaretlemesi elle yazılmış bağlantıyı silmesin); boş dizgi siler.
 * `base`: formun gördüğü satırın `updatedAt`ı (satır yoksa null). Satır o arada değiştiyse (işçi "Yayında" yaptı,
 * başkası kaydetti) yazılmaz, `stale` + güncel satır döner: açık kalmış eski sayfa işçinin sonucunu ezmesin.
 */
export async function setSocialPost(input: { episodeId: unknown; platform: unknown; status: unknown; url?: unknown; note?: unknown; base?: unknown }, actor: string): Promise<SetResult> {
  const episodeId = String(input.episodeId ?? "");
  const { platform, status } = input;
  if (!isSocialPlatform(platform) || !isSocialStatus(status)) return { ok: false, error: "bad_input" };
  const [ep] = await db.select({ slot: socialEpisodes.slot }).from(socialEpisodes).where(eq(socialEpisodes.id, episodeId));
  if (!ep) return { ok: false, error: "not_found" };
  const [cur] = await db.select().from(socialPosts).where(and(eq(socialPosts.episodeId, episodeId), eq(socialPosts.platform, platform)));
  if (cur?.status === "publishing") return { ok: false, error: "publishing" }; // yayın adımı sürüyor: sonucu işçi yazar
  if (input.base !== undefined && (cur ? cur.updatedAt.toISOString() : null) !== (input.base ?? null)) return { ok: false, error: "stale", post: cur ? postView(cur) : null };
  if (status === "auto" && (platform !== "instagram" || !ep.slot || slotPast(ep.slot))) return { ok: false, error: platform !== "instagram" ? "bad_input" : "auto_needs_slot" };
  if (status === "planned") {
    await db.delete(socialPosts).where(and(eq(socialPosts.episodeId, episodeId), eq(socialPosts.platform, platform)));
    return { ok: true, post: null };
  }
  const url = input.url === undefined ? undefined : cleanUrl(input.url);
  if (url === "bad") return { ok: false, error: "bad_input" };
  // aynı bağlantı iki bölümde olmasın (2026-10-15: 12:30 videosunun bağlantısı 18:30 bölümüne de yapıştırılmış, TikTok
  // işçisi 12:30 videosunu 18:30 bölümüne bağladı ve ardından her koşuda çöktü)
  if (url) {
    const others = await db
      .select({ episodeId: socialPosts.episodeId, url: socialPosts.url })
      .from(socialPosts)
      .where(and(eq(socialPosts.platform, platform), sql`${socialPosts.url} is not null`, sql`${socialPosts.episodeId} is distinct from ${episodeId}`));
    const dup = others.find((o) => o.url && postKey(o.url) === postKey(url));
    if (dup) return { ok: false, error: "duplicate_url", detail: dup.episodeId ?? "" };
  }
  const note = input.note === undefined ? undefined : String(input.note ?? "").trim().slice(0, 1000) || null;
  const set: Partial<typeof socialPosts.$inferInsert> = { status, updatedBy: actor, updatedAt: sql`now()` as unknown as Date };
  if (url !== undefined) set.url = url;
  if (note !== undefined) set.note = note;
  if (status === "published") set.publishedAt = sql`coalesce(${socialPosts.publishedAt}, now())` as unknown as Date;
  set.job = null; // elle değişiklik: eski otomatik yayın işi (hata, kap) unutulur; "auto" baştan dener
  const [r] = await db
    .insert(socialPosts)
    .values({ episodeId, platform, status, url: url ?? null, note: note ?? null, updatedBy: actor, publishedAt: status === "published" ? new Date() : null })
    .onConflictDoUpdate({ target: [socialPosts.episodeId, socialPosts.platform], set })
    .returning();
  return { ok: true, post: postView(r) };
}

/**
 * Toplu işaretleme (ör. iki haftayı TikTok zamanlayıcısına koyduktan sonra; YouTube zamanlananları kendisi bulur). Yalnız
 * durumu değiştirir ve yalnız henüz satırı olmayan ("Planlandı") bölümlere yazar: takvim o arada eskidiyse işçinin
 * "Yayında"/"Zamanlandı" yaptığı satır geri alınmaz.
 */
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
  let count = 0;
  for (const episodeId of ids) if ((await setSocialPost({ episodeId, platform, status, base: null }, actor)).ok) count++; // satırı olan ya da "auto" için saati geçmiş atlanır
  return { ok: true, count };
}

/** "2026-10-12 07:30" (Berlin) geçti mi. */
function slotPast(slot: string): boolean {
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = /GMT([+-])(\d\d):(\d\d)/.exec(off);
  const ms = guess.getTime() - (m ? (m[1] === "+" ? 1 : -1) * (Number(m[2]) * 60 + Number(m[3])) * 60_000 : 0);
  return ms <= Date.now();
}

/**
 * Platform API bağlantısı (işçinin yazdığı `SOCIAL_DIR/<platform>/status.json`; belirteç içermez). Dosya yoksa bağlı değil.
 * `stale`: işçi koşmadı (Instagram dakikada bir, TikTok 5, YouTube 10 dakikada bir koşuyor). TikTok'ta `tokenDays` yenileme belirtecinin günü.
 * `metricsAt`: izlenme/beğeni sayılarının son okunduğu an (Instagram 15 dk, TikTok 5, YouTube 10 dk); `lastSyncAt` gönderi eşleştirmesi.
 * `retrying`: son koşu hata verdi ama hata yeni (en çok `stale` süresinin yarısı; ağ kesintisi gibi): `ok` sayılır,
 * gösterge sarı "yeniden deneniyor" der. Kalıcı hatada kırmızı (2026-10-14; Samet: "her şey düzeldi ama youtube hata
 * diye kaldı": YouTube 10 dk'da bir koştuğu için kesintideki tek hata bir sonraki koşuya dek kırmızı kalıyordu).
 */
export type InstagramStatus = { connected: boolean; ok: boolean; retrying: boolean; username: string | null; followers: number | null; tokenDays: number | null; lastSyncAt: string | null; metricsAt: string | null; error: string | null; stale: boolean };
export type PlatformApiStatus = InstagramStatus;
export const instagramStatus = () => apiStatus("instagram", 10 * 60_000);
export const tiktokStatus = () => apiStatus("tiktok", 20 * 60_000);
export const youtubeStatus = () => apiStatus("youtube", 40 * 60_000);
async function apiStatus(platform: SocialPlatform, staleMs: number): Promise<PlatformApiStatus> {
  const off: PlatformApiStatus = { connected: false, ok: false, retrying: false, username: null, followers: null, tokenDays: null, lastSyncAt: null, metricsAt: null, error: null, stale: false };
  try {
    const s = JSON.parse(await fs.readFile(path.join(process.env.SOCIAL_DIR || "/opt/lernomi/social", platform, "status.json"), "utf8")) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v : null);
    const exp = Date.parse(str(s.tokenExpiresAt) ?? "");
    const retrying = s.ok !== true && Date.now() - Date.parse(str(s.failingSince) ?? "") < staleMs / 2;
    return {
      connected: true,
      ok: s.ok === true || retrying,
      retrying,
      username: str(s.username),
      followers: typeof s.followers === "number" ? s.followers : null,
      tokenDays: Number.isFinite(exp) ? Math.floor((exp - Date.now()) / 86_400_000) : null,
      lastSyncAt: str(s.lastSyncAt),
      metricsAt: str(s.metricsAt),
      error: str(s.error) ?? str(s.tokenError),
      stale: Date.now() - Date.parse(str(s.lastRunAt) ?? "") > staleMs,
    };
  } catch {
    return off;
  }
}
