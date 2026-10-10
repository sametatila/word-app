import "server-only";
import { createHash } from "node:crypto";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";
import { and, desc, eq, inArray, lt, lte, ne, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentFlags, contentItems, contentReleaseItems, contentReleases } from "@/lib/db/schema";
import { FULL_PACK, isGatedPack, isItemId, isPackId } from "./ids";
import { existingHashes, invalidatePointer } from "./read";

/**
 * İçeriğin YAZMA tarafı — yalnız yayın betiği ve panelin sürüm işlemleri.
 *
 * Buraya madde metni ELLE yazılmıyor. Girdi her zaman `data/**` hattının
 * ürettiği çıktı; doğruluk kaynağı git'te kalıyor ve `content:publish`
 * `check:*` kapılarından geçmeden bu işlevleri hiç çağırmıyor. Panelin bu
 * dosyadan kullandığı tek şey sürüm çevirmek (`promote`) ve madde kapatmak —
 * ikisi de içerik yazmıyor.
 *
 * YAYIN EKLEMELİ. Hiçbir sürüm üzerine yazılmıyor: geri alma bu yüzden bir
 * indirme değil, göstergeyi çevirmek. Silme yalnız `prune`da ve yalnız geri
 * alma penceresinin (son `KEEP_RELEASES` sürüm) dışında kalanda.
 */

/** Paket içeriği: madde kimliği → gövde (JSON'a çevrilebilir herhangi bir şey). */
export type PackInput = Map<string, unknown>;

export type PublishResult = {
  version: number;
  /** Bu yayında ilk kez görülen gövde sayısı — gerçekte ne kadar yeni içerik var. */
  fresh: number;
  /** Zaten var olduğu için hiç yazılmayan gövde sayısı. */
  reused: number;
  items: number;
  packs: number;
  bytes: number;
  /** İçerik canlı sürümün birebir aynısıysa yeni sürüm açılmıyor. */
  unchanged: boolean;
};

/**
 * Brotli kalitesi 9, 11 değil.
 *
 * 11 bu boyutlarda dakikalar sürüyor ve kazancı yüzde birkaç; 9 ölçülen
 * rakamları veren ayar (27,7 MB ham → 5,6 MB). Yayın deploy hattının içinde
 * koşuyor, orada geçen her saniye kesinti riski değil ama bekleme.
 */
function squeeze(raw: Buffer): { br: Buffer; gz: Buffer } {
  return {
    br: brotliCompressSync(raw, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 9,
        [constants.BROTLI_PARAM_SIZE_HINT]: raw.length,
      },
    }),
    gz: gzipSync(raw, { level: 9 }),
  };
}

/** Adres = içeriğin kendisi. İlk 32 hex hane çarpışma için fazlasıyla yeterli. */
export function contentHash(raw: Buffer): string {
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

type Prepared = {
  pack: string;
  item: string;
  hash: string;
  raw: Buffer;
  /** Paketinden geliyor: kapılı paketin her gövdesi kapılı. */
  gated: boolean;
};

/**
 * Maddeleri ve paket arşivlerini hazırlar; hiçbir şey yazmaz.
 *
 * `JSON.stringify` ANAHTAR SIRASINI koruyor, yani aynı içerik her koşuda aynı
 * hash'i veriyor — hattın iki kez çalışması yeni sürüm doğurmuyor. Kaynak
 * nesnelerin anahtar sırası değişirse hash de değişir; bu bilinçli, çünkü
 * istemciye giden bayt da değişmiş olur.
 */
function prepare(packs: Map<string, PackInput>): Prepared[] {
  const out: Prepared[] = [];
  for (const [pack, items] of packs) {
    if (!isPackId(pack)) throw new Error(`geçersiz paket kimliği: ${pack}`);
    const gated = isGatedPack(pack);
    const archive: Record<string, unknown> = {};
    for (const [item, value] of items) {
      if (!isItemId(item) || item === FULL_PACK) throw new Error(`geçersiz madde kimliği: ${pack}/${item}`);
      const raw = Buffer.from(JSON.stringify(value), "utf8");
      out.push({ pack, item, hash: contentHash(raw), raw, gated });
      archive[item] = value;
    }
    const raw = Buffer.from(JSON.stringify(archive), "utf8");
    out.push({ pack, item: FULL_PACK, hash: contentHash(raw), raw, gated });
  }
  return out;
}

/** Sürümün parmak izi: içerik aynıysa aynı dize. */
function digestOf(rows: { pack: string; item: string; hash: string }[]): string {
  const lines = rows.map((r) => `${r.pack}\u0000${r.item}\u0000${r.hash}`).sort();
  return createHash("sha256").update(lines.join("\n")).digest("hex");
}

async function liveDigest(): Promise<{ version: number; digest: string } | null> {
  const [live] = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(eq(contentReleases.status, "live"))
    .orderBy(sql`${contentReleases.version} desc`)
    .limit(1);
  if (!live) return null;
  const rows = await db
    .select({ pack: contentReleaseItems.pack, item: contentReleaseItems.item, hash: contentReleaseItems.hash })
    .from(contentReleaseItems)
    .where(eq(contentReleaseItems.release, live.version));
  return { version: live.version, digest: digestOf(rows) };
}

export type PublishOptions = {
  commit?: string | null;
  note?: string | null;
  by?: string | null;
  /** true: yayın doğrudan canlıya alınır (varsayılan). false: taslak kalır. */
  live?: boolean;
  /** Dolu ve gelecekteyse taslak o saatte canlıya alınacak. */
  goLiveAt?: Date | null;
};

/**
 * Yeni bir içerik sürümü yayınlar.
 *
 * Canlı sürümle BİREBİR aynıysa hiçbir şey yazmıyor ve `unchanged` dönüyor:
 * her deploy'da bir sürüm açmak sürüm listesini kullanılamaz hâle getirirdi
 * ve geri almayı anlamsızlaştırırdı — "bir önceki sürüm" aynı içerik olurdu.
 */
export async function publish(packs: Map<string, PackInput>, opts: PublishOptions = {}): Promise<PublishResult> {
  const prepared = prepare(packs);
  if (prepared.length === 0) throw new Error("yayınlanacak içerik yok");

  const digest = digestOf(prepared);
  const live = await liveDigest();
  const bytes = prepared.reduce((n, p) => n + p.raw.length, 0);
  if (live && live.digest === digest) {
    return {
      version: live.version,
      fresh: 0,
      reused: prepared.length,
      items: prepared.filter((p) => p.item !== FULL_PACK).length,
      packs: packs.size,
      bytes,
      unchanged: true,
    };
  }

  /* Aynı gövde iki pakette geçebiliyor (ör. paylaşılan bir metin): tekil hash
     kümesi üzerinden çalışıyoruz, yoksa aynı baytı iki kez sıkıştırırdık. */
  const unique = new Map<string, Buffer>();
  const gatedHashes = new Set<string>();
  for (const p of prepared) {
    if (!unique.has(p.hash)) unique.set(p.hash, p.raw);
    /* Aynı gövde hem kapılı hem açık bir pakette geçerse kapılı kazanıyor. */
    if (p.gated) gatedHashes.add(p.hash);
  }
  const already = await existingHashes([...unique.keys()]);
  const missing = [...unique.entries()].filter(([hash]) => !already.has(hash));

  /* Gövdeler parça parça yazılıyor: tek deyimde megabaytlarca bytea
     göndermek hem belleği hem sunucunun deyim boyutunu zorlar. */
  const BATCH_BYTES = 4 * 1024 * 1024;
  let batch: { hash: string; bytes: number; gated: boolean; br: Buffer; gz: Buffer }[] = [];
  let batchBytes = 0;
  const flush = async () => {
    if (batch.length === 0) return;
    await db.insert(contentItems).values(batch).onConflictDoNothing();
    batch = [];
    batchBytes = 0;
  };
  for (const [hash, raw] of missing) {
    const { br, gz } = squeeze(raw);
    batch.push({ hash, bytes: raw.length, gated: gatedHashes.has(hash), br, gz });
    batchBytes += br.length + gz.length;
    if (batchBytes >= BATCH_BYTES) await flush();
  }
  await flush();

  /* Daha önce açık yayınlanmış bir gövde artık kapılı bir pakette geçiyorsa
     bayrağı YÜKSELTİLİYOR. Ters yön yok: bir kez kapılı olan açılmıyor, çünkü
     açılması gereken durumu yanlış okumanın bedeli içeriğin sızması. */
  const toGate = [...gatedHashes].filter((hash) => already.has(hash));
  for (let i = 0; i < toGate.length; i += 5_000) {
    await db
      .update(contentItems)
      .set({ gated: true })
      .where(and(inArray(contentItems.hash, toGate.slice(i, i + 5_000)), eq(contentItems.gated, false)));
  }

  /*
    SÜRÜM ÖNCE TASLAK, SATIRLARI YAZILINCA CANLI (QA F-0096, 2026-10-10). Sürüm satırı
    doğrudan "live" ekleniyordu ve madde satırları ardından 2.000'lik partilerle (saniyeler)
    yazılıyordu. `pointer()` en yüksek numaralı canlı sürümü seçtiği için o pencerede okuyan
    süreç YARIM sürümü gördü; `loadPack` boş/eksik paketi süreç ömrü boyunca önbelleğe aldı.
    18:18–18:25 arasında üç süreçten biri A2 konuşmalarını bulamadı: sohbet turları ve sonuç
    kaydı 400 döndü, QA'nın bitirdiği konuşma Patika'ya yazılmadı. Artık taslak (goLiveAt boş:
    zamanlı yayın onu almıyor), satırlar tam yazılınca canlıya alma ve eskiyi emekliye ayırma
    tek işlemde. Yazım yarıda düşerse taslak silinir: yarım sürüm panelde "canlıya al"ınamasın.
  */
  const [release] = await db
    .insert(contentReleases)
    .values({
      status: "draft",
      commit: opts.commit ?? null,
      note: opts.note ?? null,
      publishedBy: opts.by ?? null,
      goLiveAt: opts.live === false ? (opts.goLiveAt ?? null) : null,
      liveAt: null,
    })
    .returning({ version: contentReleases.version });

  const ROWS = 2_000;
  try {
    for (let i = 0; i < prepared.length; i += ROWS) {
      await db.insert(contentReleaseItems).values(
        prepared.slice(i, i + ROWS).map((p) => ({
          release: release.version,
          pack: p.pack,
          item: p.item,
          hash: p.hash,
        })),
      );
    }
  } catch (err) {
    await db.delete(contentReleaseItems).where(eq(contentReleaseItems.release, release.version)).catch(() => {});
    await db.delete(contentReleases).where(eq(contentReleases.version, release.version)).catch(() => {});
    throw err;
  }

  if (opts.live !== false) await goLiveNow(release.version, null);
  invalidatePointer();

  return {
    version: release.version,
    fresh: missing.length,
    reused: unique.size - missing.length,
    items: prepared.filter((p) => p.item !== FULL_PACK).length,
    packs: packs.size,
    bytes,
    unchanged: false,
  };
}

/** Sürümü canlıya alır ve öbür canlıyı emekliye ayırır — tek işlemde: arada iki canlı ya da hiç canlı yok. */
async function goLiveNow(version: number, by: string | null): Promise<void> {
  await db.transaction(async (tx) => {
    await tx
      .update(contentReleases)
      .set({ status: "live", liveAt: new Date(), publishedBy: by ?? sql`${contentReleases.publishedBy}` })
      .where(eq(contentReleases.version, version));
    await tx
      .update(contentReleases)
      .set({ status: "retired" })
      .where(and(eq(contentReleases.status, "live"), ne(contentReleases.version, version)));
  });
}

/**
 * Bir sürümü canlıya alır — geri almanın da zamanlı yayının da tek yolu.
 *
 * Gövdeler zaten tabloda olduğu için bu işlem saniyeler değil milisaniyeler
 * sürüyor ve hiçbir indirme tetiklemiyor: istemci yalnız hash'i değişen
 * maddeleri çekiyor, geri alınan sürümün maddeleri çoğunlukla cihazda zaten
 * duruyor.
 */
export async function promote(version: number, by: string | null): Promise<boolean> {
  /* Budanmış sürümün madde listesi yok: canlıya alınsaydı gösterge boş bir
     sürümü gösterirdi. Yok sayılıyor (uç 404 döner). */
  const [found] = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(and(eq(contentReleases.version, version), ne(contentReleases.status, "pruned")))
    .limit(1);
  if (!found) return false;
  await goLiveNow(version, by);
  invalidatePointer();
  return true;
}

/**
 * Geri alma penceresi: canlı ve taslaklar dışında tutulan en yeni sürüm sayısı.
 * Her içerik değişikliği bir sürüm (değişmeyen yayın sürüm açmıyor); pencere
 * "son on değişiklikten birine dön" demek.
 */
export const KEEP_RELEASES = 10;

export type PruneResult = { releases: number; bodies: number; bytes: number };

/**
 * BUDAMA (2026-09-28) — pencerenin dışındaki emekli sürümleri ve artık hiçbir
 * sürümün göstermediği gövdeleri siler.
 *
 * Neden: yayın eklemeliydi ve hiçbir şey silinmiyordu. Her içerik değişikliği
 * değişen paketlerin ARŞİVİNİ (`"*"`, paketin tamamı) yeniden yazıyor; dil
 * düzeltmesi dalgalarında 80 sürüm birikti, `content_items` 855 MB'a çıktı
 * (arşivler 576 MB), gece yedeği 101 MB'tan 994 MB'a. 713 MB'ı son beş sürümün
 * hiçbirinde yoktu.
 *
 * Güvenli olduğu yerler:
 *   - Canlı sürüm, taslaklar ve en yeni `keep` sürüm hiç dokunulmuyor; geri
 *     alma bu pencerede çalışıyor. Budanan sürümün satırı "pruned" durumuyla
 *     kalıyor (hangi commit ne zaman yayınlandı izi); `promote` onu reddediyor.
 *   - İstemci budanmış bir sürümden fark isterse (`since`) `manifest` o sürümü
 *     bulamayıp TAM listeye düşüyor: istemci eksik maddeyi indiriyor, fazlasını
 *     atıyor. Yanlış içerik kalmıyor, yalnız o istemci için fark büyüyor.
 *   - Gövde yalnız HİÇBİR sürüm göstermiyorsa ve `graceMinutes`ten eskiyse
 *     siliniyor: yazılmış ama sürüme bağlanmamış taze gövdeye dokunulmaz.
 *   - nginx gövde önbelleği (1 yıl, değişmez) silinen gövdeyi önbellekteki
 *     kopyadan vermeye devam ediyor; yeni bir istek zaten yeni hash'i istiyor.
 *
 * YARIŞ: `publish` "bu gövde zaten var" deyip yeniden yazmadığı eski bir gövdeyi,
 * sürüm satırını yazmadan önce budama silerse yeni sürüm olmayan bir gövdeyi
 * gösterir. Bu yüzden budama YAYINLA AYNI ANDA koşmamalı: tek çağıran
 * `content:publish`in kendisi, yayından sonra ve aynı süreçte (deploy `flock`la
 * tek seferde bir yayın koşturuyor).
 *
 * `publishedBy` yalnız test içindir: yerel veritabanındaki gerçek sürümlere
 * dokunmadan budamayı denemek için.
 */
export async function prune(
  opts: { keep?: number; graceMinutes?: number; publishedBy?: string } = {},
): Promise<PruneResult> {
  const keep = opts.keep ?? KEEP_RELEASES;
  const grace = opts.graceMinutes ?? 60;
  const scope = opts.publishedBy ? eq(contentReleases.publishedBy, opts.publishedBy) : undefined;

  const newest = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(and(ne(contentReleases.status, "pruned"), scope))
    .orderBy(desc(contentReleases.version))
    .limit(keep);
  const kept = new Set(newest.map((r) => r.version));
  const retired = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(and(eq(contentReleases.status, "retired"), scope));
  const doomed = retired.map((r) => r.version).filter((v) => !kept.has(v));

  for (let i = 0; i < doomed.length; i += 20) {
    const part = doomed.slice(i, i + 20);
    await db.transaction(async (tx) => {
      await tx.delete(contentReleaseItems).where(inArray(contentReleaseItems.release, part));
      await tx.update(contentReleases).set({ status: "pruned" }).where(inArray(contentReleases.version, part));
    });
  }

  const gone = await db
    .delete(contentItems)
    .where(
      and(
        lt(contentItems.createdAt, sql`now() - make_interval(mins => ${grace})`),
        sql`not exists (select 1 from ${contentReleaseItems} ri where ri.hash = ${contentItems.hash})`,
      ),
    )
    .returning({ size: sql<number>`length(${contentItems.br}) + length(${contentItems.gz})` });

  return { releases: doomed.length, bodies: gone.length, bytes: gone.reduce((n, r) => n + Number(r.size), 0) };
}

/** Tek maddeyi yayından kaldırır. Sürümden bağımsız, anında göstergeye düşer. */
export async function disableItem(
  pack: string,
  item: string,
  reason: string | null,
  by: string | null,
): Promise<void> {
  if (!isPackId(pack) || !isItemId(item)) throw new Error("geçersiz kimlik");
  await db
    .insert(contentFlags)
    .values({ pack, item, reason, disabledBy: by })
    .onConflictDoUpdate({
      target: [contentFlags.pack, contentFlags.item],
      set: { reason, disabledBy: by, createdAt: new Date() },
    });
  invalidatePointer();
}

/**
 * ZAMANI GELEN TASLAĞI CANLIYA ALIR — zamanlı yayının tek uygulayıcısı.
 *
 * `content_releases.goLiveAt` alanı baştan beri vardı ve panel onu
 * gösteriyordu, ama hiçbir şey ona BAKMIYORDU: "pazartesi 09:00'da yayına
 * girecek" yazan bir satır o saat geldiğinde hiçbir şey yapmıyordu. Gösterilen
 * ama işlemeyen bir alan, hiç olmayan alandan kötü — kullanıcı ona güveniyor.
 *
 * Birden çok taslağın saati geçmişse EN YENİSİ canlıya alınıyor: sürüm
 * numarası zaman sırasını izliyor ve arada kalan taslakları tek tek canlıya
 * alıp hemen üzerine yazmak, göstergeyi boşuna kaç kez çevirmek olurdu.
 *
 * Çağıran: `/api/cron/alerts` (on dakikada bir). Kendi zamanlayıcısını hak
 * edecek kadar sık ya da kritik değil; gecikme en fazla on dakika ve zamanlı
 * yayın dakika hassasiyeti istemiyor.
 */
export async function promoteDueDrafts(by = "schedule"): Promise<{ promoted: number | null }> {
  const [due] = await db
    .select({ version: contentReleases.version })
    .from(contentReleases)
    .where(and(eq(contentReleases.status, "draft"), lte(contentReleases.goLiveAt, new Date())))
    .orderBy(sql`${contentReleases.version} desc`)
    .limit(1);
  if (!due) return { promoted: null };
  const ok = await promote(due.version, by);
  return { promoted: ok ? due.version : null };
}

export async function enableItem(pack: string, item: string): Promise<void> {
  await db.delete(contentFlags).where(and(eq(contentFlags.pack, pack), eq(contentFlags.item, item)));
  invalidatePointer();
}
