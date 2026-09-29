import "server-only";
import { readdirSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { and, eq, gte, isNotNull, lt, lte, max, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings, avatarItems, leagueMembers, profiles } from "@/lib/db/schema";
import { ACHIEVEMENTS, achievementForCourse, unlockedAchievementIds } from "@/lib/achievements";
import { isPremium } from "@/lib/premium";
import { PART_UNLOCKS, SPECIAL_UNLOCK_KEYS, type UnlockMap } from "@/lib/avatar-unlocks";
import type { UnlockedPart } from "@/lib/avatar-layers";
import { FALLBACK_HOST, PRIMARY_ORIGIN } from "@/lib/site";
import { LEAGUE_TIERS } from "@/lib/social/types";
import { DEFAULT_NATIVE, isNativeLang, translate, type NativeLang } from "@/lib/i18n/dict";

/**
 * Nomi avatar altyapısı — sunucu tarafı (2026-09-28).
 *
 * `AVATAR_3D_BASE`: 3B kataloğun kökü (`katalog.json` + katmanlar). TEK ÇİZİM
 * 3B (2026-09-29, Samet): eski 2B maskot hiçbir durumda çizilmiyor; değer
 * boşsa sunucudaki en yeni katalog sürümü (`public/avatar/v<n>`) kullanılır.
 * Kilitler `lib/avatar-unlocks`ta (rozet, seri, lig, davet, Premium) ve hep
 * canlı hesaplanıyor; `avatar_items` yalnız ayrıca verilen parçalar için
 * (kampanya, etkinlik).
 */
let latest: string | null = null;
/** Sunucunun diskindeki en yeni katalog sürümü (`v3` gibi). */
function latestCatalogVersion(): string {
  latest ??= readdirSync(path.join(process.cwd(), "public", "avatar"))
    .filter((d) => /^v\d+$/.test(d))
    .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))
    .at(-1) ?? "v1";
  return latest;
}
export function avatar3dBase(): string {
  const v = (process.env.AVATAR_3D_BASE ?? "").trim().replace(/\/+$/, "");
  return /^https?:\/\//.test(v) ? v : `${PRIMARY_ORIGIN}/avatar/${latestCatalogVersion()}`;
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
  const [keys, owned, prof, active, map] = await Promise.all([
    avatarUnlockKeys(userId),
    ownedAvatarItemIds(userId),
    db.select({ course: profiles.course }).from(profiles).where(eq(profiles.userId, userId)).limit(1),
    activeAvatarIds(),
    avatarUnlockMap(),
  ]);
  const out: Record<string, string> = {};
  for (const [id, key] of Object.entries(map)) {
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
  const v = /\/avatar\/v(\d+)$/.exec(avatar3dBase())?.[1] ?? "1";
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
  const [cat, active, map] = await Promise.all([catalogParts().catch(() => null), activeAvatarIds(), avatarUnlockMap()]);
  if (!cat) return [];
  const out: UnlockedPart[] = [];
  for (const [id, key] of Object.entries(map)) {
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
/** Varsayılan yuva sınırı; panelden değişir (`avatarRules`). */
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

/** Kullanıcıya gösterilen parça kimlikleri; katalog okunamazsa null (kısıt yok). */
export async function activeAvatarIds(): Promise<Set<string> | null> {
  const now = Date.now();
  if (activeCache && now - activeCache.at < ACTIVE_TTL_MS) return activeCache.value;
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
  const { perSlot } = await avatarRules();
  for (const slot of AVATAR_SLOTS) {
    const n = [...ids].filter((id) => cat.get(id)?.slot === slot).length;
    if (n > perSlot) return { ok: false, error: "too_many", slot };
  }
  const value = { ids: [...ids] };
  await db
    .insert(appSettings)
    .values({ key: ACTIVE_KEY, value, updatedBy: actor })
    .onConflictDoUpdate({ target: appSettings.key, set: { value, updatedBy: actor, updatedAt: new Date() } });
  activeCache = { at: Date.now(), value: ids };
  return { ok: true, ids: value.ids };
}

/* ------------------------------------------------------------------ */
/* KURALLAR: yuva sınırı ve açılış koşulları panelden (2026-09-29)      */
/* ------------------------------------------------------------------ */

/**
 * Panelden değişen avatar kuralları, `app_settings` › `avatar.rules`:
 *
 *   perSlot   kullanıcıya yuva başına gösterilen en fazla parça (1-60)
 *   unlocks   parça → koşul anahtarı DEĞİŞİKLİKLERİ; "" = herkese açık.
 *             Yalnız farklar tutuluyor: `PART_UNLOCKS` varsayılan tablo
 *             olarak kodda kalıyor, yeni parça koşuluyla birlikte gelir.
 *
 * Kilidin tanımı yine TEK yerde ve sunucuda: kapı (`api/profile`),
 * düzenleyicinin ipuçları (`lockedAvatarParts`) ve açılış kutlaması
 * (`partsForKeys`) hepsi `avatarUnlockMap`ten okuyor. İstemcide kopya yok.
 * 30 sn süreç önbelleği; kayıt eden süreçte hemen.
 */
export type AvatarRules = { perSlot: number; unlocks: Record<string, string> };
const RULES_KEY = "avatar.rules";
let rulesCache: { at: number; value: AvatarRules } | null = null;

/** Geçerli koşul anahtarları: rozetler (kursa göre eşdeğeri olanlar tek anahtar) + özel anahtarlar. */
export function validUnlockKeys(): Set<string> {
  return new Set([...ACHIEVEMENTS.filter((a) => !a.only?.insteadOf).map((a) => a.id), ...SPECIAL_UNLOCK_KEYS]);
}

function cleanRules(raw: unknown): AvatarRules {
  const o = (raw && typeof raw === "object" ? raw : {}) as { perSlot?: unknown; unlocks?: unknown };
  const n = Number(o.perSlot);
  const perSlot = Number.isInteger(n) && n >= 1 && n <= 60 ? n : AVATAR_ACTIVE_PER_SLOT;
  const valid = validUnlockKeys();
  const unlocks: Record<string, string> = {};
  if (o.unlocks && typeof o.unlocks === "object") {
    for (const [id, k] of Object.entries(o.unlocks as Record<string, unknown>)) {
      if (typeof k === "string" && /^[a-z0-9_-]{1,40}$/i.test(id) && (k === "" || valid.has(k))) unlocks[id] = k;
    }
  }
  return { perSlot, unlocks };
}

export async function avatarRules(): Promise<AvatarRules> {
  const now = Date.now();
  if (rulesCache && now - rulesCache.at < ACTIVE_TTL_MS) return rulesCache.value;
  try {
    const [row] = await db.select({ value: appSettings.value }).from(appSettings).where(eq(appSettings.key, RULES_KEY)).limit(1);
    const value = cleanRules(row?.value);
    rulesCache = { at: now, value };
    return value;
  } catch {
    return { perSlot: AVATAR_ACTIVE_PER_SLOT, unlocks: {} };      // okunamadı: varsayılan, önbelleğe alınmıyor
  }
}

/** Geçerli koşul tablosu: `PART_UNLOCKS` + panel değişiklikleri ("" = koşul yok). */
export async function avatarUnlockMap(): Promise<UnlockMap> {
  const { unlocks } = await avatarRules();
  if (!Object.keys(unlocks).length) return PART_UNLOCKS;
  const out: Record<string, string> = { ...PART_UNLOCKS };
  for (const [id, k] of Object.entries(unlocks)) {
    if (k) out[id] = k;
    else delete out[id];
  }
  return out;
}

/**
 * Panelin kural yazması. Sınır, açık parça sayısından küçük olamaz (önce
 * parça kapatılır); varsayılanla aynı koşul değişiklik olarak tutulmaz.
 */
export async function saveAvatarRules(raw: unknown, actor: string | null): Promise<{ ok: true; rules: AvatarRules } | { ok: false; error: string; slot?: string }> {
  const o = (raw && typeof raw === "object" ? raw : {}) as { perSlot?: unknown; unlocks?: unknown };
  const n = Number(o.perSlot);
  if (!Number.isInteger(n) || n < 1 || n > 60) return { ok: false, error: "bad_input" };
  const valid = validUnlockKeys();
  const cat = await catalogParts().catch(() => null);
  if (!cat) return { ok: false, error: "no_catalog" };
  const unlocks: Record<string, string> = {};
  for (const [id, k] of Object.entries((o.unlocks && typeof o.unlocks === "object" ? o.unlocks : {}) as Record<string, unknown>)) {
    if (!cat.has(id) || typeof k !== "string") continue;
    if (k !== "" && !valid.has(k)) return { ok: false, error: "bad_unlock" };
    if ((PART_UNLOCKS[id] ?? "") !== k) unlocks[id] = k;
  }
  const active = await activeAvatarIds();
  if (active) {
    for (const slot of AVATAR_SLOTS) {
      if ([...active].filter((id) => cat.get(id)?.slot === slot).length > n) return { ok: false, error: "too_many", slot };
    }
  }
  const value: AvatarRules = { perSlot: n, unlocks };
  await db
    .insert(appSettings)
    .values({ key: RULES_KEY, value, updatedBy: actor })
    .onConflictDoUpdate({ target: appSettings.key, set: { value, updatedBy: actor, updatedAt: new Date() } });
  rulesCache = { at: Date.now(), value };
  return { ok: true, rules: value };
}

/* ------------------------------------------------------------------ */
/* KATALOĞU SAYFAYLA GÖNDERMEK (2026-09-29)                            */
/* ------------------------------------------------------------------ */

type FullCatalog = import("@/lib/avatar-layers").AvatarCatalog;
const fullCatalog = new Map<string, Promise<FullCatalog | null>>();
/**
 * Düzenin (uygulama, davet sayfası) istemciye verdiği katalog: kök (isteğin
 * adresine göre), `katalog.json`un kendisi ve envanter. İstemci kataloğu
 * AYRICA İNDİRMİYOR: iki istek (`/api/config`, `katalog.json`) bitene kadar
 * eski 2B maskot çiziliyordu, hızlı yenilemede görünüyordu. Şimdi ilk karede
 * 3B hazır (`lib/avatar-catalog-client` `AvatarCatalogProvider`).
 */
export async function avatarCatalogSeed(host: string | null | undefined): Promise<{ base: string; cat: FullCatalog; active: string[] | null } | null> {
  const base = avatar3dBaseFor(host) ?? avatar3dBase();
  const v = /\/avatar\/(v\d+)$/.exec(avatar3dBase())?.[1] ?? latestCatalogVersion();
  let p = fullCatalog.get(v);
  if (!p) {
    p = readFile(path.join(process.cwd(), "public", "avatar", v, "katalog.json"), "utf8")
      .then((t) => JSON.parse(t) as FullCatalog)
      .catch(() => {
        fullCatalog.delete(v);
        return null;
      });
    fullCatalog.set(v, p);
  }
  const [cat, active] = await Promise.all([p, activeAvatarIds().catch(() => null)]);
  return cat ? { base, cat, active: active ? [...active] : null } : null;
}
