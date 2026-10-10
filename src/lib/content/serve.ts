import "server-only";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentItems, contentReleaseItems } from "@/lib/db/schema";
import { FULL_PACK, ORDER_ITEM } from "./ids";
import { body, pointer } from "./read";

/**
 * WEBİN İÇERİK KAPISI — paket paket okuma, ayrıştırılmış ve sıcak.
 *
 * `read.ts` tek madde veriyor ve gövdeyi sıkıştırılmış tutuyor; sunucu
 * sayfaları ise genellikle paketin TAMAMINI istiyor (seviyenin konuşmaları,
 * kursun kâğıtları). Her sayfa çiziminde yüz maddeyi tek tek çözmek anlamsız,
 * o yüzden burada paket bir kez kuruluyor ve süreç belleğinde kalıyor.
 *
 * ÖNBELLEK ANAHTARI SÜRÜMÜ TAŞIYOR (`<sürüm>:<paket>`): yeni bir yayın
 * çıktığında eski giriş kendiliğinden ölü kalıyor, geçersizleştirme diye bir
 * iş yok. Aynı sebeple geri alma da anında yürürlükte — gösterge başka bir
 * sürümü işaret ettiği an okuma oraya gidiyor.
 *
 * SIRA KORUNUYOR: paket kaynak sırasını ayrı bir maddede taşıyor
 * (`ORDER_ITEM`) ve liste ona göre diziliyor; patika üniteleri bu sırayı
 * tüketiyor.
 *
 * YAYIN YOKSA BOŞ DÖNÜYOR. Çağıranlar bunu "içerik yok" diye değil "bu
 * paketi bilmiyorum" diye okumalı; ilk kurulumda ya da yayın öncesinde
 * sayfanın kendi boş durumu doğru cevap.
 */

type Entry = { at: number; value: unknown[] };
const packs = new Map<string, Entry>();
/* Süreç ömrü boyunca duruyor; tavan paket SAYISI, çünkü paketler benzer
   boyda (bir seviyenin konuşmaları ~0,7 MB) ve sayıları otuz civarı. */
const MAX_PACKS = 40;
/** Boş paket bu kadar süre önbellekte: yayın yarıdayken okunduysa kendiliğinden düzelsin. */
const EMPTY_TTL_MS = 30_000;

function cached(key: string): unknown[] | undefined {
  const hit = packs.get(key);
  if (!hit) return undefined;
  if (hit.value.length === 0 && Date.now() - hit.at > EMPTY_TTL_MS) {
    packs.delete(key);
    return undefined;
  }
  return hit.value;
}

function remember(key: string, loaded: { value: unknown[]; complete: boolean }): void {
  if (!loaded.complete) return;
  const value = loaded.value;
  packs.set(key, { at: Date.now(), value });
  while (packs.size > MAX_PACKS) {
    const oldest = packs.keys().next();
    if (oldest.done) break;
    packs.delete(oldest.value);
  }
}

const objects = new Map<string, Record<string, unknown>>();

/**
 * Paketin maddelerini kimliğiyle eşler — EKSİK PARÇA VARSA null.
 *
 * Hep-ya-hiç: yarım bir sözlükle çevirmek, içinde tek bir Türkçe cümle kalmış
 * bir İngilizce konuşma demek — çalışıyor görünen en kötü biçim.
 */
async function loadPackObject(release: number, pack: string): Promise<Record<string, unknown> | null> {
  const rows = await db
    .select({ item: contentReleaseItems.item, hash: contentReleaseItems.hash })
    .from(contentReleaseItems)
    .where(and(eq(contentReleaseItems.release, release), eq(contentReleaseItems.pack, pack)));
  if (rows.length === 0) return null;
  const { gunzipSync } = await import("node:zlib");
  const out: Record<string, unknown> = {};
  for (const row of rows) {
    if (row.item === FULL_PACK || row.item === ORDER_ITEM) continue;
    const found = await body(row.hash);
    if (!found) return null;
    try {
      out[row.item] = JSON.parse(gunzipSync(found.gz).toString("utf8"));
    } catch {
      return null;
    }
  }
  return Object.keys(out).length ? out : null;
}

/**
 * `complete`: paketin her gövdesi okundu. Eksik gövdeli ya da boş paket önbelleğe ALINMIYOR
 * (boş olan en çok `EMPTY_TTL_MS`): yarım yazılmış bir sürümü okuyan süreç onu ömür boyu
 * tutup her üç istekten birinde "konuşma yok" diyordu (QA F-0096, 2026-10-10; kök neden
 * `publish`te düzeldi, bu ikinci kat).
 */
async function loadPack(release: number, pack: string): Promise<{ value: unknown[]; complete: boolean }> {
  const rows = await db
    .select({ item: contentReleaseItems.item, hash: contentReleaseItems.hash })
    .from(contentReleaseItems)
    .innerJoin(contentItems, eq(contentItems.hash, contentReleaseItems.hash))
    .where(and(eq(contentReleaseItems.release, release), eq(contentReleaseItems.pack, pack)));
  if (rows.length === 0) return { value: [], complete: true };

  const { gunzipSync } = await import("node:zlib");
  let complete = true;
  const parse = async (hash: string): Promise<unknown | null> => {
    const found = await body(hash);
    if (!found) return null;
    try {
      return JSON.parse(gunzipSync(found.gz).toString("utf8"));
    } catch {
      return null;
    }
  };

  const byItem = new Map<string, string>();
  for (const row of rows) if (row.item !== FULL_PACK) byItem.set(row.item, row.hash);

  const orderHash = byItem.get(ORDER_ITEM);
  byItem.delete(ORDER_ITEM);
  const order = orderHash ? ((await parse(orderHash)) as string[] | null) : null;
  const ids = Array.isArray(order)
    ? [...order.filter((id) => byItem.has(id)), ...[...byItem.keys()].filter((id) => !order.includes(id))]
    : [...byItem.keys()];

  const out: unknown[] = [];
  for (const id of ids) {
    const value = await parse(byItem.get(id)!);
    if (value !== null) out.push(value);
    else complete = false;
  }
  return { value: out, complete };
}

/**
 * BELİRLİ BİR SÜRÜMDEN okuma — sürümü sabitlenmiş işler için.
 *
 * Deneme sınavı bunu kullanıyor: sınav hangi kâğıtla açıldıysa onunla
 * bitmeli, arada çıkan bir yayın öğrencinin cevaplarını başka bir sürüme göre
 * puanlamamalı (bkz. `mock_exam_attempts.release`).
 */
export async function packItemsAt<T>(release: number, pack: string): Promise<T[]> {
  if (!release) return [];
  const key = `${release}:${pack}`;
  const hit = cached(key);
  if (hit) return hit as T[];
  try {
    const loaded = await loadPack(release, pack);
    remember(key, loaded);
    return loaded.value as T[];
  } catch (err) {
    console.error("[content] paket okunamadı", pack, err);
    return [];
  }
}

/** Paketin tamamı, kaynak sırasında, CANLI sürümden. Yayın yoksa boş dizi. */
export async function packItems<T>(pack: string): Promise<T[]> {
  const { r } = await pointer();
  if (!r) return [];
  const key = `${r}:${pack}`;
  const hit = cached(key);
  if (hit) return hit as T[];
  try {
    const loaded = await loadPack(r, pack);
    remember(key, loaded);
    return loaded.value as T[];
  } catch (err) {
    /* Veritabanı okunamadı: boş dönüyor ve ÖNBELLEĞE ALINMIYOR, yoksa geçici
       bir kesinti paketi süreç ömrü boyunca boş bırakırdı. */
    console.error("[content] paket okunamadı", pack, err);
    return [];
  }
}

/**
 * Paketi NESNE olarak verir: madde kimliği → gövde.
 *
 * Anadil sözlükleri böyle: paket maddeleri sözlüğün üst anahtarları
 * (`lecture`, `vocab`, `exam`…) ve çözücüler sözlüğü bütün bir nesne olarak
 * bekliyor. Diziye çevirip yeniden kurmak anahtarları kaybetmek olurdu.
 */
export async function packObject<T>(pack: string): Promise<Record<string, T> | null> {
  const { r } = await pointer();
  if (!r) return null;
  const key = `obj:${r}:${pack}`;
  const hit = objects.get(key);
  if (hit) return hit as Record<string, T>;
  try {
    const built = await loadPackObject(r, pack);
    if (!built) return null;
    objects.set(key, built);
    while (objects.size > MAX_PACKS) {
      const oldest = objects.keys().next();
      if (oldest.done) break;
      objects.delete(oldest.value);
    }
    return built as Record<string, T>;
  } catch (err) {
    console.error("[content] paket nesnesi okunamadı", pack, err);
    return null;
  }
}

/** Birden çok paketi birleştirir — kurs × seviye dağılmış içerik için. */
export async function packItemsAll<T>(packList: string[]): Promise<T[]> {
  const out: T[] = [];
  for (const pack of packList) out.push(...(await packItems<T>(pack)));
  return out;
}
