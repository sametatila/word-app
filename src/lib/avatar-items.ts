import "server-only";
import { and, eq, gte, isNotNull, max, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { avatarItems, leagueMembers } from "@/lib/db/schema";
import { unlockedAchievementIds } from "@/lib/achievements";
import { isPremium } from "@/lib/premium";
import { PART_UNLOCKS } from "@/lib/avatar-unlocks";
import { LEAGUE_TIERS } from "@/lib/social/types";
import { translate, type NativeLang } from "@/lib/i18n/dict";

/**
 * Nomi avatar altyapısı — sunucu tarafı (2026-09-28).
 *
 * `AVATAR_3D_BASE`: 3B kataloğun kökü (`katalog.json` + katmanlar, 3B avatar
 * hattının `cikti/avatar_512` çıktısı). Boşken istemciler 2B maskotu çiziyor.
 * Kilitler `lib/avatar-unlocks`ta (rozet, seri, lig, davet, Premium) ve hep
 * canlı hesaplanıyor; `avatar_items` yalnız ayrıca verilen parçalar için
 * (kampanya, etkinlik).
 */
export function avatar3dBase(): string | null {
  const v = (process.env.AVATAR_3D_BASE ?? "").trim().replace(/\/+$/, "");
  return /^https?:\/\//.test(v) ? v : null;
}

export async function ownedAvatarItems(userId: string): Promise<{ itemId: string; source: string; acquiredAt: Date }[]> {
  return db.select({ itemId: avatarItems.itemId, source: avatarItems.source, acquiredAt: avatarItems.acquiredAt }).from(avatarItems).where(eq(avatarItems.userId, userId));
}

/** Parçayı verir; zaten sahipse dokunmaz. */
export async function grantAvatarItem(userId: string, itemId: string, source: string): Promise<void> {
  await db.insert(avatarItems).values({ userId, itemId, source }).onConflictDoNothing();
}

export async function ownsAvatarItem(userId: string, itemId: string): Promise<boolean> {
  const r = await db.select({ itemId: avatarItems.itemId }).from(avatarItems).where(and(eq(avatarItems.userId, userId), eq(avatarItems.itemId, itemId))).limit(1);
  return r.length > 0;
}

/**
 * Kullanıcının sağladığı kilit koşulları (`lib/avatar-unlocks` anahtarları):
 * kazandığı rozetler + çıktığı en yüksek lig + haftalık birincilik + Premium.
 *
 * Lig anahtarları `league_members`ten okunuyor, ayrı bir ödül kaydı yazılmıyor:
 * "o lige çıktın mı" sorusunun cevabı zaten orada ve sonradan değişmiyor.
 * Dört sorgu, yalnız düzenleyici açılırken ve avatar kaydedilirken.
 */
export async function avatarUnlockKeys(userId: string): Promise<Set<string>> {
  const [ach, league, win, prem] = await Promise.all([
    unlockedAchievementIds(userId),
    db.select({ top: max(leagueMembers.tier) }).from(leagueMembers).where(eq(leagueMembers.userId, userId)),
    db.select({ n: sql<number>`count(*)` }).from(leagueMembers)
      .where(and(eq(leagueMembers.userId, userId), eq(leagueMembers.rank, 1), isNotNull(leagueMembers.outcome), gte(leagueMembers.finalXp, 1))),
    isPremium(userId),
  ]);
  const keys = new Set(ach);
  const top = Number(league[0]?.top ?? 0);
  for (let t = 1; t <= top; t++) keys.add(`league_${t}`);
  if (Number(win[0]?.n ?? 0) > 0) keys.add("league_win");
  if (prem) keys.add("premium");
  return keys;
}

/** Parçaları ayrıca verilmiş kimlikler (`avatar_items`). */
export async function ownedAvatarItemIds(userId: string): Promise<Set<string>> {
  return new Set((await ownedAvatarItems(userId)).map((i) => i.itemId));
}

/** Bir koşulun nasıl sağlanacağı, kullanıcının dilinde (düzenleyicideki kilit ipucu). */
export function unlockHint(lang: NativeLang, key: string): string {
  const m = /^league_(\d)$/.exec(key);
  if (m) return translate(lang, "avatar.unlock_league", { tier: translate(lang, `league.tier_${LEAGUE_TIERS[Number(m[1])]}`) });
  if (key === "league_win") return translate(lang, "avatar.unlock_league_win");
  if (key === "premium") return translate(lang, "avatar.unlock_premium");
  return translate(lang, `ach.${key}.hint`);
}

/**
 * Bu kullanıcı için KİLİTLİ parçalar ve açılış ipuçları — düzenleyici bunu
 * çizer (kilidin tanımı istemcide tutulmuyor, bkz. `lib/avatar-unlocks`).
 */
export async function lockedAvatarParts(userId: string, lang: NativeLang): Promise<Record<string, string>> {
  const [keys, owned] = await Promise.all([avatarUnlockKeys(userId), ownedAvatarItemIds(userId)]);
  const out: Record<string, string> = {};
  for (const [id, key] of Object.entries(PART_UNLOCKS)) {
    if (!keys.has(key) && !owned.has(id)) out[id] = unlockHint(lang, key);
  }
  return out;
}
