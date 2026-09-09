import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { appSettings } from "@/lib/db/schema";
import { LEGAL_LOCALES } from "./index";
import { defaultLegalConfig, parseLegalConfig, type LegalConfig } from "./shape";

/**
 * Yürürlükteki hukuki yapılandırma — kod varsayılanı + panelden gelen üstyazım.
 *
 * `lib/premium/config.ts` ile AYNI desen ve bilerek: kısa ömürlü bellek
 * önbelleği, her alanı kırpan bir ayrıştırıcı, ve okuma asla patlamaz —
 * veritabanı okunamazsa koddaki varsayılana düşülür. Buradaki "asla patlamaz"
 * premium'dakinden daha kritik: gizlilik politikası Play Console'a ve App Store
 * Connect'e URL olarak verilmiş bir sayfa. Bir veritabanı kesintisinde o sayfa
 * 500 verirse mağaza incelemesi düşer.
 *
 * NEDEN KODDA HÂLÂ VARSAYILAN VAR. Panelden düzenlenebilir olması, metnin
 * kaynağının veritabanı olduğu anlamına gelmiyor: boş bir veritabanına kurulan
 * kopya (geliştirme, test, yeni sunucu) yine de eksiksiz ve doğru bir politika
 * basmalı. Varsayılan aynı zamanda "panelde biri neyi bozdu" sorusunun cevabı:
 * git'teki metin referans olarak duruyor.
 *
 * ALICILAR TABLOSU ÇÖZÜLMÜŞ METİNLE saklanıyor (her hücre üç dilde), koddaki
 * sözlük anahtarlarıyla değil. Sebep: panelden yeni bir sağlayıcı eklenince
 * onun amacı/bölgesi için kodda bir anahtar bulunmayabilir. Anahtar saklansaydı
 * panel yalnız mevcut sözlükten seçebilirdi, yani "her bilgiyi düzenle"
 * olmazdı. Varsayılan satırlar koddaki sözlükten bir kez çözülerek üretiliyor.
 */
const KEY = "legal.config";
const TTL_MS = 30_000;

/* ── okuma / yazma ──────────────────────────────────────────────────────── */

let cache: { at: number; value: LegalConfig } | null = null;

export async function legalConfig(): Promise<LegalConfig> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.value;
  try {
    const [row] = await db
      .select({ value: appSettings.value })
      .from(appSettings)
      .where(eq(appSettings.key, KEY))
      .limit(1);
    const value = parseLegalConfig(row?.value);
    cache = { at: now, value };
    return value;
  } catch {
    // Okunamadı: varsayılanla devam et ama ÖNBELLEĞE ALMA — geçici bir kesinti
    // yüzünden yarım dakika varsayılanla koşmayalım.
    return defaultLegalConfig();
  }
}

export async function saveLegalConfig(raw: unknown, actor: string | null): Promise<LegalConfig> {
  const value = parseLegalConfig(raw);
  await db
    .insert(appSettings)
    .values({ key: KEY, value, updatedBy: actor })
    .onConflictDoUpdate({ target: appSettings.key, set: { value, updatedBy: actor, updatedAt: new Date() } });
  cache = { at: Date.now(), value };
  return value;
}

export function clearLegalConfigCache(): void {
  cache = null;
}

export { LEGAL_LOCALES };
// Tipler ve saf yardımcılar tek yerden görünsün: çağıranlar `./config`i biliyor.
export { defaultLegalConfig, parseLegalConfig, platformText, visibleProcessors } from "./shape";
export type { LegalConfig, ConfigProcessor } from "./shape";
