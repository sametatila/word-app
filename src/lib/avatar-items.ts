import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { and, eq, gte, isNotNull, lt, lte, max, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { avatarItems, leagueMembers, profiles } from "@/lib/db/schema";
import { unlockedAchievementIds } from "@/lib/achievements";
import { isPremium } from "@/lib/premium";
import { PART_UNLOCKS } from "@/lib/avatar-unlocks";
import type { UnlockedPart } from "@/lib/avatar-layers";
import { FALLBACK_HOST, FALLBACK_ORIGIN, PRIMARY_ORIGIN } from "@/lib/site";
import { LEAGUE_TIERS } from "@/lib/social/types";
import { DEFAULT_NATIVE, isNativeLang, translate, type NativeLang } from "@/lib/i18n/dict";

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

/**
 * İsteğin geldiği adrese göre katalog kökü. Mobil, ana adresi kesen kurum
 * ağlarında yedek adrese geçiyor (`lib/site` FALLBACK_ORIGIN); katalog ana
 * adreste kalsaydı o kullanıcıların avatarları ve kutlama ikonları hiç
 * yüklenmezdi. Yedek host aynı dosyaları ve `/api/avatar/img`yi sunuyor.
 */
export function avatar3dBaseFor(host: string | null | undefined): string | null {
  const b = avatar3dBase();
  if (!b || host !== FALLBACK_HOST || !b.startsWith(PRIMARY_ORIGIN)) return b;
  return FALLBACK_ORIGIN + b.slice(PRIMARY_ORIGIN.length);
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

/* ------------------------------------------------------------------ */
/* Açılış anı: "bu kazanımla şu parçalar açıldı"                        */
/* ------------------------------------------------------------------ */

type CatalogLite = { parcalar: { id: string; ad: string; adlar?: Record<string, string>; ikon: string }[] };
let catalogLite: Promise<Map<string, CatalogLite["parcalar"][number]>> | null = null;
/* Katalog `public/avatar/v1`de, yani sunucunun diskinde; `AVATAR_3D_BASE` o
   dizinin yayındaki adresi. Bir kez okunur (süreç başına). */
function catalogParts(): Promise<Map<string, CatalogLite["parcalar"][number]>> {
  catalogLite ??= readFile(path.join(process.cwd(), "public", "avatar", "v1", "katalog.json"), "utf8")
    .then((t) => new Map((JSON.parse(t) as CatalogLite).parcalar.map((p) => [p.id, p] as const)))
    .catch((err) => {
      catalogLite = null;
      throw err;
    });
  return catalogLite;
}

/**
 * Bu koşul anahtarlarıyla açılan parçalar (kutlama kartı için). 3B katalog
 * kapalıyken boş: 2B maskotta bu parçalar yok, "yeni aksesuar" demek yalan olur.
 * Katalog okunamazsa da boş: kutlamanın kendisi aksesuar yüzünden düşmemeli.
 */
export async function partsForKeys(keys: Iterable<string>, lang: NativeLang, host?: string | null): Promise<UnlockedPart[]> {
  const base = avatar3dBaseFor(host);
  const want = new Set(keys);
  if (!base || !want.size) return [];
  const cat = await catalogParts().catch(() => null);
  if (!cat) return [];
  const out: UnlockedPart[] = [];
  for (const [id, key] of Object.entries(PART_UNLOCKS)) {
    const p = want.has(key) ? cat.get(id) : undefined;
    if (p) out.push({ id, name: p.adlar?.[lang] ?? p.ad, icon: `${base}/${p.ikon}` });
  }
  return out;
}

/**
 * Lig haftası sonucunun İLK KEZ açtığı koşullar: o hafta terfiyle ilk kez
 * çıkılan lig (`league_<n>`) ve ilk haftalık birincilik (`league_win`).
 * Daha önce aynı lige çıkmış ya da birinci olmuş kullanıcıya "yeni" denmez.
 */
export async function leagueResultKeys(
  userId: string,
  r: { weekStart: string; nextTier: number; rank: number; xp: number; outcome: string },
): Promise<string[]> {
  /* Sonuç haftasının kendi ligi o hafta başında zaten açılmıştı: tavan
     hesabına dahil (`<=`); birincilik ise yalnız ÖNCEKİ haftalarda aranır. */
  const upTo = and(eq(leagueMembers.userId, userId), lte(leagueMembers.weekStart, r.weekStart));
  const before = and(eq(leagueMembers.userId, userId), lt(leagueMembers.weekStart, r.weekStart));
  const [prevTop, prevWin] = await Promise.all([
    db.select({ top: max(leagueMembers.tier) }).from(leagueMembers).where(upTo),
    db.select({ n: sql<number>`count(*)` }).from(leagueMembers)
      .where(and(before, eq(leagueMembers.rank, 1), isNotNull(leagueMembers.outcome), gte(leagueMembers.finalXp, 1))),
  ]);
  const keys: string[] = [];
  const top = Math.max(Number(prevTop[0]?.top ?? 0), 0);
  if (r.outcome === "promoted") for (let t = top + 1; t <= r.nextTier; t++) keys.push(`league_${t}`);
  if (r.rank === 1 && r.xp >= 1 && Number(prevWin[0]?.n ?? 0) === 0) keys.push("league_win");
  return keys;
}

/** Kullanıcının anadili (profilden; mobil istekte bizim dil çerezimiz yok). */
export async function profileLang(userId: string): Promise<NativeLang> {
  const [p] = await db.select({ lang: profiles.nativeLang }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return isNativeLang(p?.lang) ? p.lang : DEFAULT_NATIVE;
}
