import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Panel sorgu çalıştırıcısı — hatayı YUTAR ama SAKLAMAZ.
 *
 * Panel sorgularının her biri hata yakalayıp boş liste dönüyordu: bir tablo
 * eksikse ya da bir sütun adı değişmişse panonun geri kalanı açılsın diye.
 * Bedeli sessizlikti: kırılan bölüm "Henüz veri yok" diye görünüyordu ve bu,
 * "ölçüm bozuk" ile "gerçekten veri yok"u ayırt edilemez yapıyordu - bu
 * projede başka yerlerde defalarca düzeltilen sessiz kırılma sınıfı.
 *
 * Artık her çalıştırıcı başarısız sorguları topluyor; sayfa "N sorgu
 * başarısız" satırını gösteriyor ve uyarı motoru aynı bilgiyi Telegram'a
 * taşıyabiliyor.
 */

export type QueryIssue = { source: string; message: string };
type Row = Record<string, unknown>;

export function queryRunner(source: string) {
  const issues: QueryIssue[] = [];
  async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
    try {
      const r = (await db.execute(q)) as unknown;
      if (Array.isArray(r)) return r as Row[];
      return ((r as { rows?: Row[] }).rows ?? []) as Row[];
    } catch (err) {
      const e = err as Error & { cause?: { message?: string } };
      // Drizzle mesajı "Failed query: <sql>" ile başlıyor; asıl sebep `cause`ta.
      const sqlHead = (e.message ?? "").replace(/^Failed query:\s*/, "").replace(/\s+/g, " ").slice(0, 90);
      const cause = e.cause?.message ?? "";
      issues.push({ source, message: cause ? `${cause} — ${sqlHead}` : sqlHead });
      console.error(`[${source}] sorgu hatası`, cause || e.message);
      return [];
    }
  }
  return { rows, issues };
}

/**
 * Kısa ömürlü süreç içi önbellek. Pano her açılışta ~70 sorgu çalıştırıyordu;
 * 60 saniyelik pencere aynı dakikada açılan sekmeleri ve yenilemeleri tek
 * hesaplamaya indiriyor. Renk başına üç instance var, her birinin kendi
 * önbelleği: en kötü hâl üç hesaplama, hâlâ ucuz. `fresh` ile atlanır.
 */
const cache = new Map<string, { at: number; value: unknown }>();
export async function cached<T>(key: string, ttlMs: number, fresh: boolean, fn: () => Promise<T>): Promise<{ value: T; at: number }> {
  const hit = cache.get(key);
  if (!fresh && hit && Date.now() - hit.at < ttlMs) return { value: hit.value as T, at: hit.at };
  const value = await fn();
  const at = Date.now();
  cache.set(key, { at, value });
  return { value, at };
}

/**
 * Özet tablo: `reviews_daily` (gün × oyun). Bugün ve dün her uyarı koşusunda
 * (10 dk) yeniden hesaplanıyor; tablo boşsa bir kez bütün geçmiş dolduruluyor.
 * Pano toplam cevap sayısını ve oyun kırılımını buradan okuyor.
 */
export async function refreshRollups(): Promise<{ days: number }> {
  const [{ n }] = ((await db.execute(sql`select count(*)::int n from reviews_daily`)) as unknown as { rows: { n: number }[] }).rows;
  const from = n === 0 ? sql`'-infinity'::timestamptz` : sql`(current_date - 1)::timestamptz`;
  const res = (await db.execute(sql`
    insert into reviews_daily (day, game, n, correct)
    select created_at::date, game, count(*)::int, count(*) filter (where correct)::int
    from reviews where created_at >= ${from}
    group by 1, 2
    on conflict (day, game) do update set n = excluded.n, correct = excluded.correct`)) as unknown as { rowCount?: number };
  return { days: res.rowCount ?? 0 };
}
