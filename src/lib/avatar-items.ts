import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { and, eq, gte, isNotNull, lt, lte, max, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings, avatarItems, leagueMembers, profiles } from "@/lib/db/schema";
import { achievementForCourse, unlockedAchievementIds } from "@/lib/achievements";
import { isPremium } from "@/lib/premium";
import { PART_UNLOCKS } from "@/lib/avatar-unlocks";
import type { UnlockedPart } from "@/lib/avatar-layers";
import { FALLBACK_HOST, PRIMARY_ORIGIN } from "@/lib/site";
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

/* Uygulamayı sunan kendi adreslerimiz: asıl (www), www'suz kök ve yedek. */
const PRIMARY_HOST = new URL(PRIMARY_ORIGIN).host;
const OWN_HOSTS: ReadonlySet<string> = new Set([PRIMARY_HOST, PRIMARY_HOST.replace(/^www\./, ""), FALLBACK_HOST]);

/**
 * İsteğin geldiği adrese göre katalog kökü: katalog, isteği karşılayan
 * adresin KENDİSİNDEN verilir.
 *
 * - www'suz `lernomi.app` uygulamayı yönlendirmeden sunuyor; katalog
 *   www'da kalsaydı tarayıcı `katalog.json`u başka kökenden okuyacaktı ve
 *   CORS başlığı olmadığı için web avatarı 2B maskota düşüyordu.
 * - Mobil, ana adresi kesen kurum ağlarında yedek adrese (`lib/site`
 *   FALLBACK_ORIGIN) geçiyor; katalog ana adreste kalsaydı o kullanıcıların
 *   avatarları ve kutlama ikonları hiç yüklenmezdi.
 *
 * Üç adres de aynı dosyaları ve `/api/avatar/img`yi sunuyor. Başka bir
 * kökten verilen katalog (ör. CDN) olduğu gibi kalır.
 */
export function avatar3dBaseFor(host: string | null | undefined): string | null {
  const b = avatar3dBase();
  const h = (host ?? "").toLowerCase();
  if (!b || !OWN_HOSTS.has(h) || !b.startsWith(PRIMARY_ORIGIN)) return b;
  return `https://${h}` + b.slice(PRIMARY_ORIGIN.length);
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
  const [keys, owned, prof, active] = await Promise.all([
    avatarUnlockKeys(userId),
    ownedAvatarItemIds(userId),
    db.select({ course: profiles.course }).from(profiles).where(eq(profiles.userId, userId)).limit(1),
    activeAvatarIds(),
  ]);
  const out: Record<string, string> = {};
  for (const [id, key] of Object.entries(PART_UNLOCKS)) {
    if (active && !active.has(id)) continue;                      // envanterde gösterilmeyen parçanın ipucu da yok
    // İpucu kullanıcının KURSUNDAKİ rozetten: İngilizce öğrenene artikel
    // şapkası için "300 boşluğu doldur" (`achievementForCourse`).
    if (!keys.has(key) && !owned.has(id)) out[id] = unlockHint(lang, achievementForCourse(key, prof[0]?.course));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Açılış anı: "bu kazanımla şu parçalar açıldı"                        */
/* ------------------------------------------------------------------ */

type CatalogLite = { parcalar: { id: string; slot: string; nadir: string; ad: string; adlar?: Record<string, string>; ikon: string }[] };
const catalogLite = new Map<string, Promise<Map<string, CatalogLite["parcalar"][number]>>>();
/* Katalog `public/avatar/v<n>`de, yani sunucunun diskinde; `AVATAR_3D_BASE`
   o dizinin yayındaki adresi (sürüm kökün sonundan). Sürüm başına bir kez
   okunur (süreç başına). */
export function catalogParts(): Promise<Map<string, CatalogLite["parcalar"][number]>> {
  const v = /\/avatar\/v(\d+)$/.exec(avatar3dBase() ?? "")?.[1] ?? "1";
  let p = catalogLite.get(v);
  if (!p) {
    p = readFile(path.join(process.cwd(), "public", "avatar", `v${v}`, "katalog.json"), "utf8")
      .then((t) => new Map((JSON.parse(t) as CatalogLite).parcalar.map((q) => [q.id, q] as const)))
      .catch((err) => {
        catalogLite.delete(v);
        throw err;
      });
    catalogLite.set(v, p);
  }
  return p;
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
  const [cat, active] = await Promise.all([catalogParts().catch(() => null), activeAvatarIds()]);
  if (!cat) return [];
  const out: UnlockedPart[] = [];
  for (const [id, key] of Object.entries(PART_UNLOCKS)) {
    // Envanterde gösterilmeyen parça "yeni aksesuar" diye duyurulmaz.
    const p = want.has(key) && (!active || active.has(id)) ? cat.get(id) : undefined;
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

/* ------------------------------------------------------------------ */
/* ENVANTER: kullanıcıya gösterilen parçalar (2026-09-29)              */
/* ------------------------------------------------------------------ */

/**
 * Katalogda 147 parça var; hepsini birden açmak sonradan eklenecek her
 * parçayı değersizleştirirdi. Kullanıcı her yuvada (şapka, gözlük, bıyık,
 * boyun, yüz, küpe, sırt, arka plan) en fazla `AVATAR_ACTIVE_PER_SLOT`
 * parça görür; gerisi SİLİNMEDİ, katalogda ve dosyalarda duruyor, panelden
 * (`/admin/avatar`) açılabilir. Liste `app_settings` › `avatar.active`;
 * panel kaydı yoksa `defaultActiveIds`.
 *
 * Kural yalnız GÖSTERMEK ve YENİ SEÇMEK için: zaten takılı olan parça
 * çizilmeye devam eder, kayıtta elenmez (`api/profile`). Kapanan parçanın
 * açılış kutlaması ve kilit ipucu da gösterilmez.
 */
export const AVATAR_ACTIVE_PER_SLOT = 11;
export const AVATAR_SLOTS = ["hat", "glasses", "mustache", "neck", "face", "ear", "back", "bg"] as const;
/** Her zaman açık: ücretsiz başlangıç parçaları ve varsayılan zemin (`components/avatar` türetilmiş avatar havuzu). */
export const AVATAR_ALWAYS_ACTIVE = ["bg_orange", "beanie", "cap", "round", "square", "curl", "thick"];
const ACTIVE_KEY = "avatar.active";
const ACTIVE_TTL_MS = 30_000;
let activeCache: { at: number; value: Set<string> | null } | null = null;

/**
 * Panel kaydı yokken açılan parçalar: yuva başına ücretsizler, sonra
 * nadirlik dengesiyle (4 sıradan, 4 nadir, 2 epik, 1 efsanevi; eksik kalan
 * yer katalog sırasıyla dolar). Kazanılacak her nadirlikten parça kalır.
 */
export function defaultActiveIds(parts: { id: string; slot: string; nadir: string }[]): Set<string> {
  const out = new Set<string>();
  const QUOTA: [string, number][] = [["common", 4], ["rare", 4], ["epic", 2], ["legendary", 1]];
  for (const slot of AVATAR_SLOTS) {
    const inSlot = parts.filter((p) => p.slot === slot);
    const chosen: string[] = inSlot.filter((p) => AVATAR_ALWAYS_ACTIVE.includes(p.id)).map((p) => p.id);
    for (const [rar, n] of QUOTA) {
      for (const p of inSlot) {
        if (chosen.length >= AVATAR_ACTIVE_PER_SLOT || chosen.filter((c) => inSlot.find((q) => q.id === c)?.nadir === rar).length >= n) break;
        if (p.nadir === rar && !chosen.includes(p.id)) chosen.push(p.id);
      }
    }
    for (const p of inSlot) if (chosen.length < AVATAR_ACTIVE_PER_SLOT && !chosen.includes(p.id)) chosen.push(p.id);
    chosen.forEach((id) => out.add(id));
  }
  return out;
}

/** Kullanıcıya gösterilen parça kimlikleri; 3B katalog kapalıysa null (2B maskotta kısıt yok). */
export async function activeAvatarIds(): Promise<Set<string> | null> {
  const now = Date.now();
  if (activeCache && now - activeCache.at < ACTIVE_TTL_MS) return activeCache.value;
  if (!avatar3dBase()) return null;
  const cat = await catalogParts().catch(() => null);
  if (!cat) return null;
  let value: Set<string>;
  try {
    const [row] = await db.select({ value: appSettings.value }).from(appSettings).where(eq(appSettings.key, ACTIVE_KEY)).limit(1);
    const ids = (row?.value as { ids?: unknown } | undefined)?.ids;
    value = Array.isArray(ids) ? new Set(ids.filter((x): x is string => typeof x === "string" && cat.has(x))) : defaultActiveIds([...cat.values()]);
  } catch {
    return defaultActiveIds([...cat.values()]);                   // okunamadı: önbelleğe alınmıyor
  }
  for (const id of AVATAR_ALWAYS_ACTIVE) if (cat.has(id)) value.add(id);
  activeCache = { at: now, value };
  return value;
}

/** Panelin yazması: bilinmeyen kimlik atılır, her-zaman-açıklar eklenir, yuva sınırı aşılırsa hata. */
export async function saveActiveAvatarIds(raw: unknown, actor: string | null): Promise<{ ok: true; ids: string[] } | { ok: false; error: string; slot?: string }> {
  const cat = await catalogParts().catch(() => null);
  if (!cat) return { ok: false, error: "no_catalog" };
  const ids = new Set((Array.isArray(raw) ? raw : []).filter((x): x is string => typeof x === "string" && cat.has(x)));
  for (const id of AVATAR_ALWAYS_ACTIVE) if (cat.has(id)) ids.add(id);
  for (const slot of AVATAR_SLOTS) {
    const n = [...ids].filter((id) => cat.get(id)?.slot === slot).length;
    if (n > AVATAR_ACTIVE_PER_SLOT) return { ok: false, error: "too_many", slot };
  }
  const value = { ids: [...ids] };
  await db
    .insert(appSettings)
    .values({ key: ACTIVE_KEY, value, updatedBy: actor })
    .onConflictDoUpdate({ target: appSettings.key, set: { value, updatedBy: actor, updatedAt: new Date() } });
  activeCache = { at: Date.now(), value: ids };
  return { ok: true, ids: value.ids };
}
