import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { words } from "@/lib/db/schema";

/**
 * Tanıtım sayfasının sayıları GERÇEK VERİDEN (içerik denetimi CNT-8 / X-9).
 *
 * Rozet ve kurs kartları elle yazılmış sayılar taşıyordu ("14.784 kelime",
 * "7.392 kelime"): biri Almanca + duraklatılmış Zürih kursunun toplamıydı,
 * diğeri kelime listesi büyüdükten sonra bayatlamıştı (gerçek 8.707) ve
 * İngilizce kurs hiç sayılmamıştı. Sayı artık `words` tablosundan, kurs
 * başına; sonuç altı saat süreç belleğinde tutuluyor (liste yayın başına bir
 * kez değişiyor, sayfa ise her ziyarette çiziliyor). Veritabanına
 * ulaşılamazsa boş döner ve sayfa sayısız metne düşer — uydurma sayı yok.
 */
const TTL_MS = 6 * 3600_000;
let cache: { at: number; counts: Map<string, number> } | null = null;

export async function wordCountsByCourse(): Promise<Map<string, number>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.counts;
  try {
    const rows = await db
      .select({ course: words.course, n: sql<number>`count(*)::int` })
      .from(words)
      .groupBy(words.course);
    const counts = new Map(rows.map((r) => [r.course, Number(r.n) || 0]));
    cache = { at: Date.now(), counts };
    return counts;
  } catch (err) {
    console.error("[landing] word counts", err instanceof Error ? err.message : err);
    return cache?.counts ?? new Map();
  }
}
