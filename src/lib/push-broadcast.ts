import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { sendToUser } from "@/lib/push";
import { track } from "@/lib/events";
import type { NativeLang } from "@/lib/courses";

/**
 * Toplu bildirim — panelden duyuru (yeni özellik, bakım, önemli değişiklik).
 *
 * KİME GİDİYOR, KURAL OLARAK:
 *   - Bildirim kanalı olan (mobil jetonu ya da web aboneliği çalışan) ve
 *   - bildirimleri KAPATMAMIŞ (`profiles.reminders_enabled`) kullanıcı.
 *     Duyuru bir hatırlatma değil ama kullanıcının "bana bildirim gönderme"
 *     kararı her türü kapsıyor sayılıyor; App Store 4.5.4 pazarlama
 *     bildirimini açık rıza olmadan yasaklıyor, bu en dar okuma.
 *   - Metin KULLANICININ DİLİNDE. Panel üç dilde metin alıyor; bir dilin metni
 *     boşsa o dildeki kullanıcıya hiç gitmiyor (Almanca konuşana Türkçe duyuru
 *     göndermektense göndermemek).
 *
 * TEST ÖNCE: `test` hedefi yalnız gönderen adminin kendi hesabı. Panel gerçek
 * gönderimi önizleme sayısıyla ve iki adımlı onayla yapıyor.
 *
 * TAVAN: test dışı gönderim 12 saatte bir. Yanlışlıkla iki kez basılan düğme
 * herkese iki bildirim demek - kalıcı bildirim kapatmalarının en hızlı yolu.
 *
 * Gönderim istekten AYRI yürüyor (instance süreçte kalıyor); ilerleme ve sonuç
 * `push_broadcasts` satırında.
 */

export type BroadcastAudience = {
  native: "" | NativeLang;
  course: "" | "de" | "en" | "gsw-zh";
  platform: "all" | "ios" | "android" | "web";
  test: boolean;
};
export type BroadcastText = Record<NativeLang, { title: string; body: string }>;

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}

export function parseAudience(raw: unknown): BroadcastAudience {
  const o = (raw ?? {}) as Record<string, unknown>;
  const native = ["tr", "en", "de"].includes(String(o.native)) ? (o.native as NativeLang) : "";
  const course = ["de", "en", "gsw-zh"].includes(String(o.course)) ? (o.course as BroadcastAudience["course"]) : "";
  const platform = ["ios", "android", "web"].includes(String(o.platform)) ? (o.platform as BroadcastAudience["platform"]) : "all";
  return { native, course, platform, test: o.test === true };
}

/** Yalnız uygulama içi yollar: panelden dışarıya yönlendiren bildirim yazılamasın. */
export function cleanUrl(v: unknown): string {
  const s = typeof v === "string" ? v.trim() : "";
  return /^\/[A-Za-z0-9/_?=&.-]{0,120}$/.test(s) && !s.startsWith("//") ? s : "/learn";
}

/** Hedef kitle: kullanıcı kimliği + dili. */
async function targets(a: BroadcastAudience, adminUserId: string | null): Promise<{ userId: string; lang: NativeLang }[]> {
  const reach =
    a.platform === "web"
      ? sql`exists (select 1 from push_subscriptions s where s.user_id = p.user_id and s.failures < 3)`
      : a.platform === "ios" || a.platform === "android"
        ? sql`exists (select 1 from device_tokens d where d.user_id = p.user_id and d.failures < 3 and d.platform = ${a.platform})`
        : sql`(exists (select 1 from device_tokens d where d.user_id = p.user_id and d.failures < 3)
               or exists (select 1 from push_subscriptions s where s.user_id = p.user_id and s.failures < 3))`;
  const rs = await rows(sql`
    select p.user_id, coalesce(p.native_lang, 'tr') lang
    from profiles p
    where ${reach}
      and p.reminders_enabled
      ${a.test ? sql`and p.user_id = ${adminUserId ?? ""}` : sql``}
      ${a.native ? sql`and coalesce(p.native_lang, 'tr') = ${a.native}` : sql``}
      ${a.course ? sql`and p.course = ${a.course}` : sql``}`);
  return rs.map((r) => ({ userId: String(r.user_id), lang: String(r.lang) as NativeLang }));
}

/** Önizleme: dil başına hedef sayısı (metni boş dildekiler gönderilmeyecek). */
export async function previewAudience(a: BroadcastAudience, adminUserId: string | null): Promise<Record<NativeLang, number>> {
  const out: Record<NativeLang, number> = { tr: 0, en: 0, de: 0 };
  for (const t of await targets(a, adminUserId)) if (t.lang in out) out[t.lang]++;
  return out;
}

export async function lastBroadcastAt(): Promise<Date | null> {
  const [r] = await rows(sql`select max(created_at) at from push_broadcasts where (audience->>'test')::boolean is not true`);
  return r?.at ? new Date(String(r.at)) : null;
}

export const BROADCAST_COOLDOWN_H = 12;

export async function startBroadcast(input: {
  text: BroadcastText;
  url: string;
  audience: BroadcastAudience;
  adminEmail: string | null;
  adminUserId: string | null;
}): Promise<{ id: number; targeted: number } | { error: "cooldown" | "empty" | "no_targets" }> {
  const langs = (Object.keys(input.text) as NativeLang[]).filter((l) => input.text[l].title && input.text[l].body);
  if (!langs.length) return { error: "empty" };
  if (!input.audience.test) {
    const last = await lastBroadcastAt();
    if (last && Date.now() - last.getTime() < BROADCAST_COOLDOWN_H * 3_600_000) return { error: "cooldown" };
  }
  const list = (await targets(input.audience, input.adminUserId)).filter((t) => langs.includes(t.lang));
  if (!list.length) return { error: "no_targets" };

  const [row] = await rows(sql`
    insert into push_broadcasts (title, body, url, audience, admin_email, targeted)
    values (${input.text.tr.title || input.text[langs[0]].title}, ${input.text.tr.body || input.text[langs[0]].body},
      ${input.url}, ${JSON.stringify({ ...input.audience, langs, text: input.text })}::jsonb, ${input.adminEmail}, ${list.length})
    returning id`);
  const id = Number(row?.id);

  // İstekten bağımsız yürüyor; hata satıra yazılıyor.
  void (async () => {
    let delivered = 0;
    const today = new Date().toISOString().slice(0, 10);
    const tag = `broadcast-${id}`;
    try {
      for (let i = 0; i < list.length; i += 20) {
        const batch = list.slice(i, i + 20);
        const counts = await Promise.all(
          batch.map(async (t) => {
            const msg = input.text[t.lang];
            const n = await sendToUser(t.userId, { title: msg.title, body: msg.body, url: input.url, tag, lang: t.lang }).catch(() => 0);
            await track(t.userId, "push_sent", today, 0, "broadcast");
            if (n > 0) await track(t.userId, "push_deliver", today, n, "broadcast");
            return n;
          }),
        );
        delivered += counts.reduce((a, b) => a + b, 0);
        await db.execute(sql`update push_broadcasts set delivered = ${delivered} where id = ${id}`);
      }
      await db.execute(sql`update push_broadcasts set state = 'done', delivered = ${delivered}, finished_at = now() where id = ${id}`);
    } catch (err) {
      console.error("[broadcast]", id, err);
      await db.execute(sql`update push_broadcasts set state = 'failed', delivered = ${delivered}, finished_at = now() where id = ${id}`).catch(() => undefined);
    }
  })();

  return { id, targeted: list.length };
}

export async function listBroadcasts(): Promise<{ id: number; at: string; title: string; audience: string; targeted: number; delivered: number; state: string; admin: string }[]> {
  try {
    const rs = await rows(sql`select id, created_at, title, audience, targeted, delivered, state, coalesce(admin_email, '') admin
      from push_broadcasts order by id desc limit 30`);
    return rs.map((r) => {
      const a = (r.audience ?? {}) as Record<string, unknown>;
      const parts = [a.test ? "TEST" : "", a.native ? `dil=${a.native}` : "", a.course ? `kurs=${a.course}` : "", a.platform && a.platform !== "all" ? `platform=${a.platform}` : ""].filter(Boolean);
      return {
        id: Number(r.id), at: new Date(String(r.created_at)).toISOString(), title: String(r.title ?? ""),
        audience: parts.join(" · ") || "herkes", targeted: Number(r.targeted) || 0, delivered: Number(r.delivered) || 0,
        state: String(r.state ?? ""), admin: String(r.admin ?? ""),
      };
    });
  } catch {
    return [];
  }
}
