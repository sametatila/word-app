import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { unlockKeysOf } from "@/lib/achievements";
import { parseAvatar } from "@/lib/avatar-config";
import { avatarPartIds } from "@/lib/avatar-unlocks";
import { catalogParts, grantAvatarItem, unlockHint, validUnlockKeys } from "@/lib/avatar-items";

/**
 * Avatar panelinin OKUMA ve verme/alma tarafı (`/admin/avatar`). Kurallar
 * (yuva sınırı, açılış koşulu) `avatar-items` `avatarRules`ta.
 *
 * Kullanım sayıları üç ayrı soru:
 *   takan     profildeki avatar kaydında bu parça takılı (şu an görünen)
 *   açık      parçanın koşulunu sağlamış kişi (rozet, lig, Premium); koşulsuz
 *             parçada bütün profiller
 *   verilen   `avatar_items`: koşuldan bağımsız ayrıca verilmiş (panel,
 *             kampanya, etkinlik)
 * Hepsi tek seferde, kullanıcı sayısı kadar satır; panel açılışında.
 */
type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}

export type AvatarGrant = { itemId: string; userId: string; label: string; source: string; at: string };
export type AvatarUsage = {
  /** parça → takan kişi */
  equipped: Record<string, number>;
  /** koşul anahtarı → sağlayan kişi */
  keyUsers: Record<string, number>;
  /** profil sayısı (koşulsuz parçanın "açık" sayısı) */
  profiles: number;
  grants: AvatarGrant[];
};

export async function avatarUsage(): Promise<AvatarUsage> {
  const [avatars, ach, league, wins, prem, total, grants] = await Promise.all([
    rows(sql`select avatar from profiles where avatar is not null and avatar <> ''`),
    rows(sql`select user_id, achievement_id from achievements`),
    rows(sql`select user_id, max(tier)::int top from league_members group by user_id`),
    rows(sql`select count(distinct user_id)::int n from league_members where rank = 1 and outcome is not null and final_xp >= 1`),
    rows(sql`select count(*)::int n from profiles where premium_until > now()`),
    rows(sql`select count(*)::int n from profiles`),
    rows(sql`
      select i.item_id, i.user_id, i.source, i.acquired_at,
        coalesce(nullif(p.display_name, ''), u.name, u.email, '') label
      from avatar_items i
      left join profiles p on p.user_id = i.user_id
      left join "user" u on u.id = i.user_id
      order by i.acquired_at desc
      limit 1000`),
  ]);

  const equipped: Record<string, number> = {};
  for (const r of avatars) {
    for (const id of new Set(avatarPartIds(parseAvatar(r.avatar)))) equipped[id] = (equipped[id] ?? 0) + 1;
  }

  const byKey = new Map<string, Set<string>>();
  const add = (key: string, user: string) => {
    let s = byKey.get(key);
    if (!s) byKey.set(key, (s = new Set()));
    s.add(user);
  };
  for (const r of ach) for (const k of unlockKeysOf(String(r.achievement_id))) add(k, String(r.user_id));
  for (const r of league) {
    const top = Number(r.top) || 0;
    for (let t = 1; t <= top; t++) add(`league_${t}`, String(r.user_id));
  }
  const keyUsers: Record<string, number> = {};
  for (const [k, s] of byKey) keyUsers[k] = s.size;
  keyUsers.league_win = Number(wins[0]?.n) || 0;
  keyUsers.premium = Number(prem[0]?.n) || 0;

  return {
    equipped,
    keyUsers,
    profiles: Number(total[0]?.n) || 0,
    grants: grants.map((r) => ({
      itemId: String(r.item_id),
      userId: String(r.user_id),
      label: String(r.label || ""),
      source: String(r.source),
      at: r.acquired_at instanceof Date ? r.acquired_at.toISOString() : String(r.acquired_at ?? ""),
    })),
  };
}

/** Koşul seçenekleri, panelin açılır listesi: anahtar + Türkçe açılış ipucu. */
export function unlockOptions(): { key: string; label: string }[] {
  return [...validUnlockKeys()].map((key) => ({ key, label: unlockHint("tr", key) })).sort((a, b) => a.label.localeCompare(b.label, "tr"));
}

/**
 * Parça vermek için kişiyi bulur: kimlik, e-posta ya da kullanıcı adı (tam
 * eşleşme; "@" önekini atar). Birden çok eşleşme ya da hiç yoksa hata: yanlış
 * hesaba parça vermek geri alınabilir ama sessiz olmamalı.
 */
export async function findUserForGrant(q: string): Promise<{ ok: true; userId: string; label: string } | { ok: false; error: "not_found" | "ambiguous" }> {
  const v = q.trim().replace(/^@/, "").slice(0, 200);
  if (!v) return { ok: false, error: "not_found" };
  const r = await rows(sql`
    select coalesce(p.user_id, u.id) id, coalesce(nullif(p.display_name, ''), u.name, u.email, '') label
    from "user" u full join profiles p on p.user_id = u.id
    where coalesce(p.user_id, u.id) = ${v} or lower(u.email) = lower(${v}) or lower(p.username) = lower(${v})
    limit 2`);
  if (!r.length) return { ok: false, error: "not_found" };
  if (r.length > 1) return { ok: false, error: "ambiguous" };
  return { ok: true, userId: String(r[0].id), label: String(r[0].label || r[0].id) };
}

export async function adminGrantItem(user: string, itemId: string): Promise<{ ok: true; userId: string; label: string } | { ok: false; error: string }> {
  const cat = await catalogParts().catch(() => null);
  if (!cat?.has(itemId)) return { ok: false, error: "unknown_item" };
  const who = await findUserForGrant(user);
  if (!who.ok) return who;
  await grantAvatarItem(who.userId, itemId, "admin");
  return who;
}

/**
 * Verilen parçayı geri alır (yalnız `avatar_items` satırı). Kişi koşulu
 * kendisi sağlıyorsa parça açık kalır; takılıysa bir sonraki kayda kadar
 * görünür, kayıtta kapı eler (`api/profile`).
 */
export async function adminRevokeItem(userId: string, itemId: string): Promise<boolean> {
  const r = await rows(sql`delete from avatar_items where user_id = ${userId} and item_id = ${itemId} returning 1 x`);
  return r.length > 0;
}
