import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentFlags, contentItems, contentReleaseItems, contentReleases } from "@/lib/db/schema";
import { FULL_PACK, flagKey, isGatedPack } from "./ids";
import { legacyPackName } from "@/lib/legacy-names";
import { conversationPack, levelOfId, packCourseOfId, paperPack, skillPack } from "./packs";

/**
 * İçeriğin OKUMA tarafı — gösterge, manifest deltası ve gövde.
 *
 * Üç uç da buradan besleniyor ve üçünün önbellek ömrü BİLEREK farklı:
 *
 *   gösterge   30 sn   değişen tek şey bu; "anlık düzeltme"nin gerçek penceresi
 *   manifest   30 sn   göstergeyle aynı sürüme bakıyor
 *   gövde      1 yıl   hash adresli, bir daha asla değişmiyor
 *
 * Gösterge `/api/config`ten AYRI bir uç. Oraya konsaydı içerik düzeltmesi o
 * ucun 5 dakikalık penceresine, zorunlu güncelleme de bu ucun 30 saniyesine
 * bağlanırdı; ikisi de istenmeyen. İki ucun ömrü iki ayrı kararın hızı.
 */

/** Panel kaydı en geç yarım dakikada yürürlükte — `app-control` ile aynı pencere. */
const POINTER_TTL_MS = 30_000;

export type Pointer = {
  /** Canlı yayın sürümü. 0 = henüz hiç yayın yok. */
  r: number;
  /** Kapatılan maddeler, `"<paket>:<madde>"` biçiminde. */
  d: string[];
};

const EMPTY_POINTER: Pointer = { r: 0, d: [] };
let pointerCache: { at: number; value: Pointer } | null = null;

/**
 * Canlı sürüm + kapatma listesi.
 *
 * Okuma patlarsa varsayılan dönüyor ve ÖNBELLEĞE ALINMIYOR: geçici bir
 * veritabanı kesintisi yarım dakika boyunca "içerik yok" demesin. `r: 0`
 * istemciye "elindekiyle devam et" anlamına geliyor — açılışı kilitleyen bir
 * durum hiçbir zaman oluşmuyor.
 */
export async function pointer(): Promise<Pointer> {
  const now = Date.now();
  if (pointerCache && now - pointerCache.at < POINTER_TTL_MS) return pointerCache.value;
  try {
    const [live] = await db
      .select({ version: contentReleases.version })
      .from(contentReleases)
      .where(eq(contentReleases.status, "live"))
      .orderBy(sql`${contentReleases.version} desc`)
      .limit(1);
    const flags = await db.select({ pack: contentFlags.pack, item: contentFlags.item }).from(contentFlags);
    const value: Pointer = {
      r: live?.version ?? 0,
      /* Kapatılan Konuşma adımı eski paket adıyla da bildiriliyor: build 6
         aynı maddeyi `lessons/` önekiyle tutuyor (geçici, lib/legacy-names). */
      d: flags
        .flatMap((f) => {
          const old = legacyPackName(f.pack);
          return old ? [flagKey(f.pack, f.item), flagKey(old, f.item)] : [flagKey(f.pack, f.item)];
        })
        .sort(),
    };
    pointerCache = { at: now, value };
    return value;
  } catch {
    return EMPTY_POINTER;
  }
}

/** Yayın ve kapatma yazan her yol bunu çağırıyor: panel kaydı beklemesin. */
export function invalidatePointer(): void {
  pointerCache = null;
}

export type ManifestEntry = { i: string; h: string; b: number };
export type Manifest = {
  /** Bu manifestin ait olduğu sürüm. */
  r: number;
  p: string;
  /** Paketin tamamının tek arşivi — sıfırdan dolan istemci bunu indiriyor. */
  f: { h: string; b: number } | null;
  /** `since`ten bu yana eklenen ya da hash'i değişen maddeler. */
  i: ManifestEntry[];
  /** `since`ten bu yana paketten düşen maddeler. */
  x: string[];
};

/**
 * Paketin bir sürümdeki hâli, `since` verilirse ARADAKİ FARK.
 *
 * Trafiğin tamamı bu işlevin ne kadar az döndüğüne bağlı. Hiçbir şey
 * değişmediyse cevap `{r, p, f, i: [], x: []}` — birkaç yüz bayt; ucun ETag'i
 * de zaten 304'e çeviriyor. Bir kelime düzeltildiyse yalnız o maddenin satırı
 * dönüyor ve istemci yalnız onun gövdesini indiriyor.
 *
 * `since` gelecekteki ya da bilinmeyen bir sürümse (geri alma sonrası
 * olabiliyor) tam liste dönüyor: istemcinin elindekinin doğru olduğunu
 * varsaymak, geri alınmış bir maddeyi cihazda bırakmak demek olurdu.
 */
export async function manifest(pack: string, since: number): Promise<Manifest> {
  const { r } = await pointer();
  /* Kapılı paket herkese açık manifestte YOK. Boş liste dönüyor, hata değil:
     bir paketin var olup olmadığını hata koduyla söylemek de bilgi vermek. */
  if (!r || isGatedPack(pack)) return { r: r || 0, p: pack, f: null, i: [], x: [] };

  const rows = await db
    .select({ item: contentReleaseItems.item, hash: contentReleaseItems.hash, bytes: contentItems.bytes })
    .from(contentReleaseItems)
    .innerJoin(contentItems, eq(contentItems.hash, contentReleaseItems.hash))
    .where(and(eq(contentReleaseItems.release, r), eq(contentReleaseItems.pack, pack)));

  const full = rows.find((row) => row.item === FULL_PACK);
  const current = rows.filter((row) => row.item !== FULL_PACK);
  const out: Manifest = {
    r,
    p: pack,
    f: full ? { h: full.hash, b: full.bytes } : null,
    i: [],
    x: [],
  };

  const usable = since > 0 && since < r;
  if (!usable) {
    out.i = current.map((row) => ({ i: row.item, h: row.hash, b: row.bytes }));
    return out;
  }

  const before = await db
    .select({ item: contentReleaseItems.item, hash: contentReleaseItems.hash })
    .from(contentReleaseItems)
    .where(and(eq(contentReleaseItems.release, since), eq(contentReleaseItems.pack, pack)));
  /* `since` sürümünde bu paket hiç yoksa istemcide de yok: tam liste. */
  if (before.length === 0) {
    out.i = current.map((row) => ({ i: row.item, h: row.hash, b: row.bytes }));
    return out;
  }

  const had = new Map(before.filter((row) => row.item !== FULL_PACK).map((row) => [row.item, row.hash]));
  for (const row of current) {
    if (had.get(row.item) !== row.hash) out.i.push({ i: row.item, h: row.hash, b: row.bytes });
    had.delete(row.item);
  }
  out.x = [...had.keys()];
  return out;
}

/**
 * Gövde önbelleği — hash adresli olduğu için GEÇERSİZLEŞTİRME YOK.
 *
 * Bir hash'in gövdesi tanım gereği değişemez, dolayısıyla tek sınır bellek.
 * Tavan bayt cinsinden, çünkü maddeler çok farklı boylarda: 10 KB'lık bir konuşma
 * maddesiyle 1,2 MB'lık anadil arşivini aynı "en fazla N kayıt" kuralıyla
 * saymak, tavanı ya anlamsız ya tehlikeli yapardı.
 *
 * Sıra en eskiden atıyor (Map ekleme sırasını koruyor); isabet eden kayıt
 * sona alınıyor, yani gerçekte LRU.
 */
const CACHE_MAX_BYTES = 48 * 1024 * 1024;
type Body = { bytes: number; gated: boolean; br: Buffer; gz: Buffer };
const bodies = new Map<string, Body>();
let cachedBytes = 0;

function remember(hash: string, body: Body): void {
  const cost = body.br.length + body.gz.length;
  /* Tek başına tavanı aşan gövde önbelleğe hiç girmiyor: girseydi diğer
     her şeyi süpürür ve önbelleği tek maddelik hâle getirirdi. */
  if (cost > CACHE_MAX_BYTES) return;
  bodies.set(hash, body);
  cachedBytes += cost;
  while (cachedBytes > CACHE_MAX_BYTES) {
    const oldest = bodies.keys().next();
    if (oldest.done) break;
    const victim = bodies.get(oldest.value);
    bodies.delete(oldest.value);
    if (victim) cachedBytes -= victim.br.length + victim.gz.length;
  }
}

export async function body(hash: string): Promise<Body | null> {
  const hit = bodies.get(hash);
  if (hit) {
    bodies.delete(hash);
    bodies.set(hash, hit);
    return hit;
  }
  const [row] = await db
    .select({ bytes: contentItems.bytes, gated: contentItems.gated, br: contentItems.br, gz: contentItems.gz })
    .from(contentItems)
    .where(eq(contentItems.hash, hash))
    .limit(1);
  if (!row) return null;
  const value: Body = { bytes: row.bytes, gated: row.gated, br: row.br, gz: row.gz };
  remember(hash, value);
  return value;
}

/**
 * Sunucunun kendi okuması — web sayfaları içeriği buradan alıyor (F5).
 *
 * Gövde sıkıştırılmış duruyor, burada açılıp ayrıştırılıyor. Ayrıştırılmış
 * hâl AYRICA önbelleklenmiyor: `bodies` zaten sıcak tutuyor ve iki ayrı
 * önbellek aynı belleği iki kez harcardı.
 */
export async function readItem<T>(pack: string, item: string): Promise<T | null> {
  const { r } = await pointer();
  if (!r) return null;
  const [row] = await db
    .select({ hash: contentReleaseItems.hash })
    .from(contentReleaseItems)
    .where(
      and(eq(contentReleaseItems.release, r), eq(contentReleaseItems.pack, pack), eq(contentReleaseItems.item, item)),
    )
    .limit(1);
  if (!row) return null;
  const found = await body(row.hash);
  if (!found) return null;
  const { gunzipSync } = await import("node:zlib");
  return JSON.parse(gunzipSync(found.gz).toString("utf8")) as T;
}

/** Kapalı mı — sunucu tarafı kapılar için (istemci göstergeden okuyor). */
export async function isDisabled(pack: string, item: string): Promise<boolean> {
  const { d } = await pointer();
  return d.includes(flagKey(pack, item));
}

/**
 * KAPATMA ANAHTARI WEBDE DE İŞLİYOR.
 *
 * Kapatma göstergeye düşüyor ve mobil onu hemen gizliyor. Web içeriği hâlâ
 * koddan okuyor, yani kapatılan madde burada KENDİLİĞİNDEN gizlenmiyordu:
 * panelden "bu soru bozuk" denip kapatıldığında Android'de kayboluyor, webde
 * duruyordu. Kapatma anahtarının en sinsi kırılma biçimi bu — yarısı işleyen
 * bir anahtar, hiç işlemeyenden daha kötü, çünkü iş bitmiş sanılıyor.
 *
 * Üç yardımcı kimlikten paketi çözüyor (`lib/content/packs`), yani çağıranın
 * paket adını bilmesi gerekmiyor. Gösterge yarım dakika önbellekli: bu
 * kontroller pratikte bedava.
 */
export async function conversationDisabled(id: string): Promise<boolean> {
  const level = levelOfId(id);
  return level ? isDisabled(conversationPack(packCourseOfId(id), level), id) : false;
}

export async function exerciseDisabled(id: string): Promise<boolean> {
  const level = levelOfId(id);
  return level ? isDisabled(skillPack(packCourseOfId(id), level), id) : false;
}

export async function paperDisabled(id: string): Promise<boolean> {
  return isDisabled(paperPack(packCourseOfId(id)), id);
}

/**
 * Bir paketin kapatılmış maddeleri — havuzdan toplu düşürme için.
 *
 * Tek tek sormak yerine küme veriyor: haftalık quiz havuzu yüzlerce madde ve
 * her biri için göstergeyi taramak gereksiz.
 */
export async function disabledItemsOf(pack: string): Promise<Set<string>> {
  const { d } = await pointer();
  const prefix = `${pack}:`;
  const out = new Set<string>();
  for (const key of d) if (key.startsWith(prefix)) out.add(key.slice(prefix.length));
  return out;
}

/** Panelin sürüm listesi (F6) — gövde taşımıyor, yalnız künye. */
export async function releases(limit = 40) {
  return db
    .select({
      version: contentReleases.version,
      status: contentReleases.status,
      commit: contentReleases.commit,
      note: contentReleases.note,
      publishedBy: contentReleases.publishedBy,
      goLiveAt: contentReleases.goLiveAt,
      liveAt: contentReleases.liveAt,
      createdAt: contentReleases.createdAt,
      items: sql<number>`(select count(*) from content_release_items ri where ri.release = ${contentReleases.version})`,
    })
    .from(contentReleases)
    .orderBy(sql`${contentReleases.version} desc`)
    .limit(limit);
}

/** Bir sürümdeki paketlerin künyesi — panelin sürüm ayrıntısı için. */
export async function releasePacks(version: number) {
  return db
    .select({
      pack: contentReleaseItems.pack,
      items: sql<number>`count(*) filter (where ${contentReleaseItems.item} <> ${FULL_PACK})`,
      bytes: sql<number>`coalesce(sum(${contentItems.bytes}) filter (where ${contentReleaseItems.item} <> ${FULL_PACK}), 0)`,
    })
    .from(contentReleaseItems)
    .innerJoin(contentItems, eq(contentItems.hash, contentReleaseItems.hash))
    .where(eq(contentReleaseItems.release, version))
    .groupBy(contentReleaseItems.pack)
    .orderBy(contentReleaseItems.pack);
}

/**
 * İKİ SÜRÜM ARASINDAKİ FARK — geri alma kararının dayanağı.
 *
 * Panel sürüm listesini gösteriyordu ama "bu sürümde NE değişti" sorusunun
 * cevabı yoktu; geri alma düğmesine basan kişi neyi geri aldığını
 * bilmiyordu. Fark paket paket veriliyor, çünkü karar de öyle veriliyor:
 * "B1 konuşmalarında üç madde değişmiş" cümlesi eyleme dönüşebilir, "yedi madde
 * değişmiş" cümlesi dönüşmez.
 *
 * Gövde İÇERİĞİ karşılaştırılmıyor, hash'i karşılaştırılıyor: hash zaten
 * içeriğin kimliği, iki metni satır satır karşılaştırmak hem pahalı hem
 * gereksiz.
 */
export type ReleaseDiff = {
  pack: string;
  added: string[];
  changed: string[];
  removed: string[];
};

export async function releaseDiff(from: number, to: number): Promise<ReleaseDiff[]> {
  if (!from || !to || from === to) return [];
  const load = async (release: number) => {
    const rows = await db
      .select({ pack: contentReleaseItems.pack, item: contentReleaseItems.item, hash: contentReleaseItems.hash })
      .from(contentReleaseItems)
      .where(eq(contentReleaseItems.release, release));
    const out = new Map<string, Map<string, string>>();
    for (const r of rows) {
      if (r.item === FULL_PACK) continue;
      const pack = out.get(r.pack) ?? new Map<string, string>();
      pack.set(r.item, r.hash);
      out.set(r.pack, pack);
    }
    return out;
  };
  const [a, b] = await Promise.all([load(from), load(to)]);

  const packs = new Set([...a.keys(), ...b.keys()]);
  const diff: ReleaseDiff[] = [];
  for (const pack of [...packs].sort()) {
    const before = a.get(pack) ?? new Map<string, string>();
    const after = b.get(pack) ?? new Map<string, string>();
    const added: string[] = [];
    const changed: string[] = [];
    const removed: string[] = [];
    for (const [item, hash] of after) {
      const old = before.get(item);
      if (old === undefined) added.push(item);
      else if (old !== hash) changed.push(item);
    }
    for (const item of before.keys()) if (!after.has(item)) removed.push(item);
    if (added.length || changed.length || removed.length) {
      diff.push({ pack, added: added.sort(), changed: changed.sort(), removed: removed.sort() });
    }
  }
  return diff;
}

/** Hash'leri verilen gövdelerin var olup olmadığı — yayın betiği bunu soruyor. */
export async function existingHashes(hashes: string[]): Promise<Set<string>> {
  if (hashes.length === 0) return new Set();
  const found = new Set<string>();
  /* Postgres'in parametre sınırı (65535) aşılmasın diye parça parça. */
  const CHUNK = 5_000;
  for (let i = 0; i < hashes.length; i += CHUNK) {
    const rows = await db
      .select({ hash: contentItems.hash })
      .from(contentItems)
      .where(inArray(contentItems.hash, hashes.slice(i, i + CHUNK)));
    for (const row of rows) found.add(row.hash);
  }
  return found;
}
