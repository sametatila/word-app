import "server-only";
import { and, desc, eq, inArray, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { socialEpisodes, socialRequests } from "@/lib/db/schema";
import { esc, sendTelegram } from "@/lib/telegram";
import { SITE_URL } from "@/lib/site";
import { missingAudio } from "@/lib/studio";
import type { StudioRole } from "@/lib/studio-auth";

/**
 * STÜDYO TALEPLERİ — süreç yönetimi (2026-10-09, Samet: "edge tts fallback hiç olmamalı; sesi yok diyorsa ve hesap
 * editör hesabıysa Samet'e gönder imkânı olmalı, adminse bana bilgi vermeli; bu akışı süreç yönetimi mantığında").
 *
 *   open         editör "Samet'e gönder" dedi → Samet'e Telegram + stüdyo rozeti
 *   in_progress  Samet işleme aldı → işçi ses bekçisini hemen koşturur (metin Mac'in üretim listesine girer)
 *   done         talepteki metinlerin hepsinin Defne kaydı geldi (kendiliğinden; talep eden rozet görür)
 *   rejected     Samet gerekçeyle reddetti (ör. "bu cümleyi değiştir")
 *   cancelled    talep eden geri çekti
 *
 * Edge ya da başka bir sentezle "geçici ses" YOK: stüdyo, önizleme ve sunucu üretimi yalnız Defne kaydı kullanır.
 * Her adım `history`e (kim, ne zaman, not) ve `admin_audit`e (uç) yazılır.
 */

export type RequestStatus = "open" | "in_progress" | "done" | "rejected" | "cancelled";
export type StudioRequest = {
  id: number;
  episodeId: string;
  episodeTitle: string;
  kind: string;
  texts: string[];
  missing: string[];
  status: RequestStatus;
  requestedBy: string;
  note: string | null;
  reply: string | null;
  history: { at: string; by: string; status: string; note?: string | null }[];
  requesterSeen: boolean;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
};
const ACTIVE: RequestStatus[] = ["open", "in_progress"];
type Row = typeof socialRequests.$inferSelect;

function view(r: Row, titles: Map<string, string>): StudioRequest {
  return {
    id: r.id,
    episodeId: r.episodeId,
    episodeTitle: titles.get(r.episodeId) ?? r.episodeId,
    kind: r.kind,
    texts: r.texts,
    missing: missingAudio(r.texts),
    status: r.status as RequestStatus,
    requestedBy: r.requestedBy,
    note: r.note,
    reply: r.reply,
    history: r.history,
    requesterSeen: r.requesterSeen,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    resolvedAt: r.resolvedAt ? r.resolvedAt.toISOString() : null,
  };
}
async function titles(ids: string[]): Promise<Map<string, string>> {
  if (!ids.length) return new Map();
  const rows = await db.select({ id: socialEpisodes.id, data: socialEpisodes.data }).from(socialEpisodes).where(inArray(socialEpisodes.id, ids));
  return new Map(rows.map((r) => [r.id, String((r.data.copy as { title?: string } | undefined)?.title ?? r.id)]));
}

/** Açık ses taleplerinden kayıtları gelmiş olanları kapat (okuma sırasında; ucuz: tts-map bellekte). */
export async function resolveAudioRequests(): Promise<void> {
  const open = await db.select().from(socialRequests).where(and(eq(socialRequests.kind, "audio"), inArray(socialRequests.status, ACTIVE)));
  for (const r of open) {
    if (missingAudio(r.texts).length) continue;
    const history = [...r.history, { at: new Date().toISOString(), by: "sistem", status: "done", note: "Defne kayıtları geldi" }];
    await db.update(socialRequests).set({ status: "done", history, requesterSeen: false, resolvedAt: new Date(), updatedAt: new Date() }).where(eq(socialRequests.id, r.id));
  }
}

/** Admin: bütün etkin talepler + son 30 günün kapananları. Editör: kendi talepleri. */
export async function listRequests(email: string, role: StudioRole): Promise<StudioRequest[]> {
  await resolveAudioRequests();
  const recent = sql`${socialRequests.updatedAt} > now() - interval '30 days'`;
  const where = role === "admin" ? or(inArray(socialRequests.status, ACTIVE), recent) : and(eq(socialRequests.requestedBy, email), or(inArray(socialRequests.status, ACTIVE), recent));
  const rows = await db.select().from(socialRequests).where(where).orderBy(desc(socialRequests.updatedAt)).limit(200);
  const t = await titles([...new Set(rows.map((r) => r.episodeId))]);
  return rows.map((r) => view(r, t));
}

export async function requestsForEpisode(episodeId: string): Promise<StudioRequest[]> {
  await resolveAudioRequests();
  const rows = await db.select().from(socialRequests).where(eq(socialRequests.episodeId, episodeId)).orderBy(desc(socialRequests.id)).limit(20);
  return rows.map((r) => view(r, new Map()));
}

/** Rozet: admin için etkin talep sayısı; editör için görmediği güncelleme sayısı. */
export async function requestBadge(email: string, role: StudioRole): Promise<number> {
  try {
    await resolveAudioRequests();
    const where = role === "admin" ? inArray(socialRequests.status, ["open"]) : and(eq(socialRequests.requestedBy, email), eq(socialRequests.requesterSeen, false));
    const [r] = await db.select({ n: sql<number>`count(*)::int` }).from(socialRequests).where(where);
    return r?.n ?? 0;
  } catch {
    return 0; // tablo yoksa (göç uygulanmamış) rozet yok
  }
}

type Err = { ok: false; status: number; error: string; detail?: unknown };
const fail = (status: number, error: string, detail?: unknown): Err => ({ ok: false, status, error, detail });

/** Editör: bölümün Defne sesi olmayan metinleri için Samet'e talep. Aynı bölümde etkin talep varsa ona eklenir. */
export async function createAudioRequest(episodeId: string, note: unknown, actor: string): Promise<{ ok: true; id: number } | Err> {
  const [e] = await db.select({ spoken: socialEpisodes.spoken, data: socialEpisodes.data }).from(socialEpisodes).where(eq(socialEpisodes.id, episodeId));
  if (!e) return fail(404, "not_found");
  const missing = missingAudio(e.spoken);
  if (!missing.length) return fail(409, "audio_ready");
  const n = typeof note === "string" ? note.trim().slice(0, 1000) || null : null;
  const now = new Date();
  const [cur] = await db.select().from(socialRequests).where(and(eq(socialRequests.episodeId, episodeId), eq(socialRequests.kind, "audio"), inArray(socialRequests.status, ACTIVE)));
  let id: number;
  if (cur) {
    const texts = [...new Set([...cur.texts, ...missing])];
    const history = [...cur.history, { at: now.toISOString(), by: actor, status: cur.status, note: n ?? "metinler güncellendi" }];
    await db.update(socialRequests).set({ texts, history, note: n ?? cur.note, updatedAt: now }).where(eq(socialRequests.id, cur.id));
    id = cur.id;
  } else {
    const [r] = await db
      .insert(socialRequests)
      .values({ episodeId, kind: "audio", texts: missing, status: "open", requestedBy: actor, note: n, history: [{ at: now.toISOString(), by: actor, status: "open", note: n }] })
      .returning({ id: socialRequests.id });
    id = r.id;
  }
  const title = String((e.data.copy as { title?: string } | undefined)?.title ?? episodeId);
  void sendTelegram(
    [
      `<b>[STÜDYO] Defne sesi talebi</b> · ${esc(actor)}`,
      `${esc(title)} (${esc(episodeId)}): ${missing.length} metin`,
      ...missing.slice(0, 6).map((t) => `• ${esc(t.length > 90 ? `${t.slice(0, 87)}…` : t)}`),
      n ? `Not: ${esc(n)}` : "",
      `${SITE_URL}/studio/requests`,
    ].filter(Boolean).join("\n"),
  );
  return { ok: true, id };
}

/** take / reject: yalnız admin. cancel: talep eden ya da admin. seen: talep eden gördü. */
export async function updateRequest(id: number, action: unknown, reply: unknown, actor: string, role: StudioRole): Promise<{ ok: true } | Err> {
  const [r] = await db.select().from(socialRequests).where(eq(socialRequests.id, id));
  if (!r) return fail(404, "not_found");
  const text = typeof reply === "string" ? reply.trim().slice(0, 1000) || null : null;
  const now = new Date();
  const step = (status: RequestStatus, note: string | null, seen: boolean, resolved = false) =>
    db
      .update(socialRequests)
      .set({ status, reply: note ?? r.reply, history: [...r.history, { at: now.toISOString(), by: actor, status, note }], requesterSeen: seen, updatedAt: now, resolvedAt: resolved ? now : null })
      .where(eq(socialRequests.id, id));
  switch (action) {
    case "take":
      if (role !== "admin") return fail(403, "forbidden");
      if (!ACTIVE.includes(r.status as RequestStatus)) return fail(409, "closed");
      await step("in_progress", text ?? "işleme alındı: Mac'in üretim listesine giriyor", false);
      return { ok: true };
    case "reject":
      if (role !== "admin") return fail(403, "forbidden");
      if (!text) return fail(400, "reason_required");
      if (!ACTIVE.includes(r.status as RequestStatus)) return fail(409, "closed");
      await step("rejected", text, false, true);
      return { ok: true };
    case "cancel":
      if (role !== "admin" && r.requestedBy !== actor) return fail(403, "forbidden");
      if (!ACTIVE.includes(r.status as RequestStatus)) return fail(409, "closed");
      await step("cancelled", text ?? "geri çekildi", true, true);
      return { ok: true };
    case "seen":
      if (r.requestedBy !== actor) return { ok: true };
      await db.update(socialRequests).set({ requesterSeen: true }).where(eq(socialRequests.id, id));
      return { ok: true };
    default:
      return fail(400, "bad_action");
  }
}
