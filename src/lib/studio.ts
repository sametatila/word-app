import "server-only";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { socialEpisodes, socialPosts, socialRenders, socialRevisions } from "@/lib/db/schema";

/**
 * SOSYAL VİDEO STÜDYOSU — sunucu mantığı (lernomi.app/studio, 2026-10-09).
 *
 * Akış: Claude bölümü depoda yazar → sunucu işçisi (`scripts/social/worker.mjs`) social_episodes'a aktarır →
 * stüdyoda (Samet ya da sosyal medya editörü) metinler düzenlenir, tarayıcıda önizlenir → "Onayla ve üret":
 * işçi o sürümün videosunu sunucuda üretir → MP4 ve kapak kayıpsız indirilir, platformlara konur.
 *
 * Kurallar (hepsi burada, istemciye güvenilmez):
 *  - Yalnız METİN değişir: kayıt, verinin yapısını (anahtarlar, dizi uzunlukları, sayılar, doğru/yanlış) aynen
 *    korumalı; tek serbest alan `copy.ui` (şablonun sabit yazıları). Yapıyı bozan kayıt reddedilir.
 *  - Her kayıt yeni SÜRÜM: `social_revisions`; geri dönüş eski sürümü yeni sürüm olarak yazar (geçmiş silinmez).
 *  - İyimser kilit: kayıt, düzenlemenin başladığı sürümü taşır; arada başkası kaydettiyse 409 (kimse farkında
 *    olmadan ötekinin değişikliğini ezmez).
 *  - Onay: o anki sürümün seslendirilen her Almanca metninin Defne kaydı olmalı (Samet: "yalnız Defne"); onay
 *    üretimi kuyruğa koyar. Onaydan sonra metin değişirse onay düşer, kuyruktaki üretim iptal olur.
 *  - Saat: aynı saate iki bölüm konamaz (hata); aynı gün aynı yaklaşım, art arda aynı tema, 30 günden yakın ortak
 *    kelime uyarıdır (planlayan karar verir).
 */

export const SLOTS = ["07:30", "12:30", "18:30"] as const;
const SLOT_RE = /^(\d{4}-\d{2}-\d{2}) (07:30|12:30|18:30)$/;

export type RenderView = {
  id: number;
  revision: number;
  status: "queued" | "running" | "done" | "failed" | "cancelled";
  progress: number | null;
  error: string | null;
  duration: number | null;
  bytes: number | null;
  lufs: number | null;
  truePeak: number | null;
  hasFiles: boolean;
  requestedBy: string | null;
  createdAt: string;
  finishedAt: string | null;
};

export type EpisodeSummary = {
  id: string;
  template: string;
  approach: string;
  theme: string;
  title: string;
  slot: string | null;
  revision: number;
  edited: boolean;
  originChanged: boolean;
  approved: boolean;
  approvedBy: string | null;
  archived: boolean;
  missingAudio: number;
  updatedBy: string | null;
  updatedAt: string;
  /** Bu sürümün en son üretimi (yoksa null) */
  render: RenderView | null;
  /** Elde indirilebilir en son video (eski sürümden olabilir) */
  video: RenderView | null;
};

export type EpisodeDetail = EpisodeSummary & {
  data: Record<string, unknown>;
  origin: Record<string, unknown>;
  spoken: string[];
  missing: string[];
  used: string[];
  revisions: { revision: number; author: string; note: string | null; slot: string | null; createdAt: string }[];
  renders: RenderView[];
};

const approachOf = (t: string) => t.split("-")[0];
const themeOf = (t: string) => t.split("-")[1];
const titleOf = (data: Record<string, unknown>, id: string) => {
  const c = data.copy as { title?: unknown } | undefined;
  return typeof c?.title === "string" && c.title ? c.title : id;
};

// ---------- Defne kayıtları (TTS_OWN_DIR/tts-map.json; işçinin lib/clips.mjs'iyle aynı kural) ----------
let tts: { mtime: number; map: Record<string, string>; hold: Record<string, unknown> } | null = null;
function ttsTables() {
  const dir = process.env.TTS_OWN_DIR;
  if (!dir) return null;
  try {
    const mapFile = path.join(dir, "tts-map.json");
    const mtime = statSync(mapFile).mtimeMs;
    if (!tts || tts.mtime !== mtime) {
      let hold: Record<string, unknown> = {};
      try {
        hold = JSON.parse(readFileSync(path.join(dir, "tts-hold.json"), "utf8"));
      } catch {
        /* bekletme listesi yok */
      }
      tts = { mtime, map: JSON.parse(readFileSync(mapFile, "utf8")), hold };
    }
    return tts;
  } catch (err) {
    console.error("[studio] tts-map okunamadı", err);
    return null;
  }
}
/** Defne kaydının dosya yolu ya da null. */
export function defneFile(text: string): string | null {
  const t = ttsTables();
  const key = `defne|de|${text}`;
  if (!t || !t.map[key] || t.hold[key]) return null;
  return path.join(process.env.TTS_OWN_DIR as string, "m4a", t.map[key]);
}
export const missingAudio = (texts: string[]) => texts.filter((t) => !defneFile(t));

// ---------- okuma ----------
function renderView(r: typeof socialRenders.$inferSelect): RenderView {
  return {
    id: r.id,
    revision: r.revision,
    status: r.status as RenderView["status"],
    progress: r.progress,
    error: r.error,
    duration: r.duration,
    bytes: r.bytes,
    lufs: r.lufs,
    truePeak: r.truePeak,
    hasFiles: r.status === "done" && !!r.dir,
    requestedBy: r.requestedBy,
    createdAt: r.createdAt.toISOString(),
    finishedAt: r.finishedAt ? r.finishedAt.toISOString() : null,
  };
}

function summary(e: typeof socialEpisodes.$inferSelect, renders: (typeof socialRenders.$inferSelect)[]): EpisodeSummary {
  const mine = renders.filter((r) => r.episodeId === e.id);
  const forRev = mine.filter((r) => r.revision === e.revision).sort((a, b) => b.id - a.id)[0];
  const video = mine.filter((r) => r.status === "done" && r.dir).sort((a, b) => b.id - a.id)[0];
  return {
    id: e.id,
    template: e.template,
    approach: approachOf(e.template),
    theme: themeOf(e.template),
    title: titleOf(e.data, e.id),
    slot: e.slot,
    revision: e.revision,
    edited: e.edited,
    originChanged: e.originChanged,
    approved: e.approvedRevision === e.revision,
    approvedBy: e.approvedRevision === e.revision ? e.approvedBy : null,
    archived: !!e.archivedAt,
    missingAudio: missingAudio(e.spoken).length,
    updatedBy: e.updatedBy,
    updatedAt: e.updatedAt.toISOString(),
    render: forRev ? renderView(forRev) : null,
    video: video ? renderView(video) : null,
  };
}

/** Takvim: arşivlenmemiş bütün bölümler. Tablo yoksa (göç uygulanmamış) `missing`. */
export async function listEpisodes(): Promise<{ episodes: EpisodeSummary[]; missing: boolean }> {
  try {
    const eps = await db.select().from(socialEpisodes).where(sql`${socialEpisodes.archivedAt} is null`);
    const renders = eps.length ? await db.select().from(socialRenders).where(inArray(socialRenders.episodeId, eps.map((e) => e.id))) : [];
    return { episodes: eps.map((e) => summary(e, renders)).sort((a, b) => (a.slot ?? "9").localeCompare(b.slot ?? "9") || a.id.localeCompare(b.id)), missing: false };
  } catch (err) {
    console.error("[studio] bölümler okunamadı", err);
    return { episodes: [], missing: true };
  }
}

export async function getEpisode(id: string): Promise<EpisodeDetail | null> {
  const [e] = await db.select().from(socialEpisodes).where(eq(socialEpisodes.id, id));
  if (!e) return null;
  const renders = await db.select().from(socialRenders).where(eq(socialRenders.episodeId, id)).orderBy(desc(socialRenders.id)).limit(20);
  const revs = await db
    .select({ revision: socialRevisions.revision, author: socialRevisions.author, note: socialRevisions.note, slot: socialRevisions.slot, createdAt: socialRevisions.createdAt })
    .from(socialRevisions)
    .where(eq(socialRevisions.episodeId, id))
    .orderBy(desc(socialRevisions.revision))
    .limit(50);
  return {
    ...summary(e, renders),
    data: e.data,
    origin: e.origin,
    spoken: e.spoken,
    missing: missingAudio(e.spoken),
    used: e.used,
    revisions: revs.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })),
    renders: renders.map(renderView),
  };
}

/** İndirme için: üretimin klasörü (SOCIAL_DIR'e göre) ve bölümü. */
export async function renderFiles(renderId: number): Promise<{ dir: string; episodeId: string } | null> {
  const [r] = await db.select().from(socialRenders).where(eq(socialRenders.id, renderId));
  if (!r || r.status !== "done" || !r.dir) return null;
  return { dir: path.join(process.env.SOCIAL_DIR || "/opt/lernomi/social", r.dir), episodeId: r.episodeId };
}

// ---------- doğrulama ----------
type Json = unknown;
/**
 * Metin değil KİMLİK olan alanlar (şablon karşılaştırıyor ya da başvuru olarak kullanıyor): değiştirilemez.
 * who: me/them (konuşan), icon/avatar: simge adı, key: kelime başvurusu, typ: kelime türü (sabit yazı eşlemesi),
 * dizi öğesindeki scene: copy.scenes anahtarı (copy.scene ise ekranda görünen sahne adı, metin).
 */
export function lockedKey(at: string): boolean {
  const last = at.replace(/\[\d+\]$/, "").split(".").pop() ?? "";
  if (["who", "icon", "avatar", "key", "typ"].includes(last)) return true;
  return last === "scene" && /\[\d+\]\.scene$/.test(at);
}
/**
 * `next`, `base` ile AYNI YAPIDA mı: aynı anahtarlar, aynı dizi uzunlukları, sayı/boolean/null aynı, dizgi dizgi.
 * Tek serbest alan `copy.ui` (dizgi → dizgi). Hata: yol + sebep.
 */
export function shapeError(base: Json, next: Json, at = ""): string | null {
  if (at === "copy.ui") {
    if (next == null) return null;
    if (typeof next !== "object" || Array.isArray(next)) return "copy.ui nesne olmalı";
    const entries = Object.entries(next as Record<string, unknown>);
    if (entries.length > 80) return "copy.ui çok büyük";
    for (const [k, v] of entries) {
      if (!/^[A-Za-z][\w]{0,40}$/.test(k)) return `copy.ui.${k}: geçersiz anahtar`;
      if (typeof v !== "string" || v.length > 400) return `copy.ui.${k}: metin olmalı (en çok 400 karakter)`;
    }
    return null;
  }
  if (typeof base === "string") {
    if (lockedKey(at)) return next === base ? null : `${at}: bu alan metin değil, değiştirilemez`;
    if (typeof next !== "string") return `${at}: metin olmalı`;
    if (next.length > 2000) return `${at}: en çok 2000 karakter`;
    return null;
  }
  if (base === null || typeof base !== "object") return Object.is(base, next) ? null : `${at}: yalnız metinler değiştirilebilir`;
  if (Array.isArray(base)) {
    if (!Array.isArray(next) || next.length !== base.length) return `${at}: öğe sayısı değiştirilemez`;
    for (let i = 0; i < base.length; i++) {
      const e = shapeError(base[i], next[i], `${at}[${i}]`);
      if (e) return e;
    }
    return null;
  }
  if (typeof next !== "object" || next === null || Array.isArray(next)) return `${at}: yapı değiştirilemez`;
  const b = base as Record<string, unknown>;
  const n = next as Record<string, unknown>;
  const keys = new Set([...Object.keys(b), ...Object.keys(n)]);
  for (const k of keys) {
    const p = at ? `${at}.${k}` : k;
    if (p === "copy.ui") {
      const e = shapeError(b[k], n[k], p);
      if (e) return e;
      continue;
    }
    if (!(k in b) || !(k in n)) return `${p}: alan eklenemez ya da silinemez`;
    const e = shapeError(b[k], n[k], p);
    if (e) return e;
  }
  return null;
}

const DAY = 86_400_000;
const berlinMs = (slot: string) => {
  // "2026-10-12 07:30" Berlin → UTC ms (yaz/kış saati: o günün farkı)
  const [d, t] = slot.split(" ");
  const guess = new Date(`${d}T${t}:00Z`);
  const off = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Berlin", timeZoneName: "longOffset" }).formatToParts(guess).find((p) => p.type === "timeZoneName")?.value ?? "GMT";
  const m = off.match(/GMT([+-])(\d{2}):(\d{2})/);
  const mins = m ? (m[1] === "+" ? 1 : -1) * (Number(m[2]) * 60 + Number(m[3])) : 0;
  return guess.getTime() - mins * 60_000;
};

/** Saat kuralları: { error } (aynı saat) ya da { warnings }. */
export async function checkSlot(id: string, slot: string): Promise<{ error?: string; warnings: string[] }> {
  if (!SLOT_RE.test(slot)) return { error: "Saat biçimi: YYYY-AA-GG ve 07:30 / 12:30 / 18:30", warnings: [] };
  const all = await db
    .select({ id: socialEpisodes.id, template: socialEpisodes.template, slot: socialEpisodes.slot, used: socialEpisodes.used })
    .from(socialEpisodes)
    .where(sql`${socialEpisodes.archivedAt} is null and ${socialEpisodes.slot} is not null`);
  const me = await db.select({ template: socialEpisodes.template, used: socialEpisodes.used }).from(socialEpisodes).where(eq(socialEpisodes.id, id));
  if (!me[0]) return { error: "Bölüm yok", warnings: [] };
  const others = all.filter((e) => e.id !== id) as { id: string; template: string; slot: string; used: string[] }[];
  const clash = others.find((e) => e.slot === slot);
  if (clash) return { error: `Bu saatte zaten bir bölüm var: ${clash.id}`, warnings: [] };
  const warnings: string[] = [];
  const day = slot.slice(0, 10);
  const ap = approachOf(me[0].template);
  const sameDay = others.find((e) => e.slot.startsWith(day) && approachOf(e.template) === ap);
  if (sameDay) warnings.push(`Aynı gün aynı yaklaşım: ${sameDay.id}`);
  const ordered = [...others, { id, template: me[0].template, slot, used: me[0].used }].sort((a, b) => a.slot.localeCompare(b.slot));
  const i = ordered.findIndex((e) => e.id === id);
  for (const n of [ordered[i - 1], ordered[i + 1]]) if (n && themeOf(n.template) === themeOf(me[0].template)) warnings.push(`Art arda aynı tema (${themeOf(n.template)}): ${n.id}`);
  const t = berlinMs(slot);
  for (const e of others) {
    if (approachOf(e.template) === ap) continue;
    if (Math.abs(berlinMs(e.slot) - t) >= 30 * DAY) continue;
    const common = me[0].used.filter((k) => e.used.includes(k));
    if (common.length) warnings.push(`30 günden yakın ortak kelime (${common.length}): ${e.id}`);
  }
  return { warnings };
}

// ---------- yazma ----------
export type StudioError = { ok: false; status: number; error: string; detail?: unknown };
type Ok<T> = { ok: true } & T;
const fail = (status: number, error: string, detail?: unknown): StudioError => ({ ok: false, status, error, detail });

const cleanSpoken = (v: unknown): string[] | null =>
  Array.isArray(v) && v.length <= 80 && v.every((x) => typeof x === "string" && x.length > 0 && x.length <= 600) ? [...new Set(v as string[])] : null;

/**
 * Metin kaydı. baseRevision: düzenlemenin başladığı sürüm. spoken: istemcinin motordan hesapladığı seslendirilen
 * metinler (E.spoken; sunucu motoru çalıştıramıyor). İşçi üretimde motora yeniden sorar, yanlış liste videoya geçmez.
 */
export async function saveEpisode(id: string, input: { baseRevision: unknown; data: unknown; spoken: unknown; note?: unknown }, actor: string): Promise<Ok<{ revision: number }> | StudioError> {
  const spoken = cleanSpoken(input.spoken);
  if (!spoken) return fail(400, "bad_input", "spoken");
  const note = typeof input.note === "string" ? input.note.trim().slice(0, 300) || null : null;
  return db.transaction(async (tx) => {
    const [e] = await tx.select().from(socialEpisodes).where(eq(socialEpisodes.id, id)).for("update");
    if (!e) return fail(404, "not_found");
    if (Number(input.baseRevision) !== e.revision) return fail(409, "conflict", { revision: e.revision, by: e.updatedBy });
    const shape = shapeError(e.data, input.data);
    if (shape) return fail(400, "shape", shape);
    const data = input.data as Record<string, unknown>;
    if (JSON.stringify(data) === JSON.stringify(e.data)) return { ok: true as const, revision: e.revision };
    const rev = e.revision + 1;
    const edited = JSON.stringify(data) !== JSON.stringify(e.origin);
    await tx
      .update(socialEpisodes)
      .set({ data, revision: rev, spoken, edited, originChanged: edited ? e.originChanged : false, updatedBy: actor, updatedAt: new Date() })
      .where(eq(socialEpisodes.id, id));
    await tx.insert(socialRevisions).values({ episodeId: id, revision: rev, data, spoken, slot: e.slot, author: actor, note });
    await tx.update(socialRenders).set({ status: "cancelled", finishedAt: new Date() }).where(and(eq(socialRenders.episodeId, id), eq(socialRenders.status, "queued")));
    return { ok: true as const, revision: rev };
  });
}

/** Saat değişikliği (içerik ve onay etkilenmez). slot null: takvimden çıkar. */
export async function setEpisodeSlot(id: string, slot: unknown, actor: string): Promise<Ok<{ warnings: string[] }> | StudioError> {
  if (slot !== null && typeof slot !== "string") return fail(400, "bad_input");
  if (slot === null) {
    await db.update(socialEpisodes).set({ slot: null, updatedBy: actor, updatedAt: new Date() }).where(eq(socialEpisodes.id, id));
    return { ok: true, warnings: [] };
  }
  const c = await checkSlot(id, slot);
  if (c.error) return fail(409, "slot", c.error);
  const r = await db.update(socialEpisodes).set({ slot, updatedBy: actor, updatedAt: new Date() }).where(eq(socialEpisodes.id, id)).returning({ id: socialEpisodes.id });
  if (!r.length) return fail(404, "not_found");
  return { ok: true, warnings: c.warnings };
}

/** Onay: o sürüm, Defne sesleri tamamsa, üretim kuyruğuna. */
export async function approveEpisode(id: string, revision: unknown, actor: string): Promise<Ok<{ renderId: number }> | StudioError> {
  return db.transaction(async (tx) => {
    const [e] = await tx.select().from(socialEpisodes).where(eq(socialEpisodes.id, id)).for("update");
    if (!e) return fail(404, "not_found");
    if (Number(revision) !== e.revision) return fail(409, "conflict", { revision: e.revision, by: e.updatedBy });
    const missing = missingAudio(e.spoken);
    if (missing.length) return fail(409, "audio", missing);
    const active = await tx
      .select({ id: socialRenders.id })
      .from(socialRenders)
      .where(and(eq(socialRenders.episodeId, id), eq(socialRenders.revision, e.revision), inArray(socialRenders.status, ["queued", "running", "done"])));
    await tx.update(socialEpisodes).set({ approvedRevision: e.revision, approvedBy: actor, approvedAt: new Date() }).where(eq(socialEpisodes.id, id));
    if (active.length) return { ok: true as const, renderId: active[0].id };
    const [r] = await tx.insert(socialRenders).values({ episodeId: id, revision: e.revision, requestedBy: actor }).returning({ id: socialRenders.id });
    return { ok: true as const, renderId: r.id };
  });
}

/** Eski bir sürüme ya da Claude'un depodaki sürümüne dön: yeni sürüm olarak yazılır. */
export async function restoreEpisode(id: string, input: { baseRevision: unknown; to: unknown }, actor: string): Promise<Ok<{ revision: number }> | StudioError> {
  return db.transaction(async (tx) => {
    const [e] = await tx.select().from(socialEpisodes).where(eq(socialEpisodes.id, id)).for("update");
    if (!e) return fail(404, "not_found");
    if (Number(input.baseRevision) !== e.revision) return fail(409, "conflict", { revision: e.revision, by: e.updatedBy });
    let data: Record<string, unknown>;
    let spoken: string[];
    let note: string;
    if (input.to === "origin") {
      data = e.origin;
      spoken = e.originSpoken;
      note = "Claude'un sürümüne dönüldü";
    } else {
      const [r] = await tx
        .select({ data: socialRevisions.data, spoken: socialRevisions.spoken })
        .from(socialRevisions)
        .where(and(eq(socialRevisions.episodeId, id), eq(socialRevisions.revision, Number(input.to))));
      if (!r) return fail(404, "not_found");
      data = r.data;
      spoken = r.spoken;
      note = `${Number(input.to)}. sürüme dönüldü`;
    }
    const rev = e.revision + 1;
    const edited = JSON.stringify(data) !== JSON.stringify(e.origin);
    await tx
      .update(socialEpisodes)
      .set({ data, spoken, revision: rev, edited, originChanged: edited ? e.originChanged : false, updatedBy: actor, updatedAt: new Date() })
      .where(eq(socialEpisodes.id, id));
    await tx.insert(socialRevisions).values({ episodeId: id, revision: rev, data, spoken, slot: e.slot, author: actor, note });
    await tx.update(socialRenders).set({ status: "cancelled", finishedAt: new Date() }).where(and(eq(socialRenders.episodeId, id), eq(socialRenders.status, "queued")));
    return { ok: true as const, revision: rev };
  });
}

/** Kuyruktaki üretimi iptal (çalışan üretim durdurulamaz, biter). */
export async function cancelRender(renderId: unknown): Promise<Ok<object> | StudioError> {
  const r = await db
    .update(socialRenders)
    .set({ status: "cancelled", finishedAt: new Date() })
    .where(and(eq(socialRenders.id, Number(renderId)), eq(socialRenders.status, "queued")))
    .returning({ id: socialRenders.id });
  return r.length ? { ok: true } : fail(409, "not_queued");
}

/** Platform durumları (TikTok / Instagram), bölüm başına. */
export async function postsFor(ids: string[]) {
  if (!ids.length) return [];
  return db.select().from(socialPosts).where(inArray(socialPosts.episodeId, ids));
}
