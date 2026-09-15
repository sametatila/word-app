import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

type Db = NodePgDatabase<typeof schema>;

let instance: Db | null = null;

/**
 * DATABASE_URL yokken dönen istemci: şema meta verisi var, bağlantı yok.
 *
 * NEDEN VAR. better-auth'un drizzle adaptörü (1.7) kurulurken `db._.schema`ya
 * bakıyor ve `lib/auth/server` bunu modül yüklenirken yapıyor. `next build`
 * rotaları yapılandırmalarını okumak için yüklediğinden eski vekil ilk
 * ERİŞİMDE fırlatıyordu ve DATABASE_URL'siz derleme `/api/config`'te
 * düşüyordu (CI'daki next build adımı). Şema meta verisi bağlantı istemiyor,
 * yalnız sorgu istiyor: bu istemci sorgu anında aynı açık hatayla düşüyor.
 *
 * Önbelleğe ALINMIYOR: DATABASE_URL modül yüklendikten sonra tanımlanırsa
 * (betikler bunu yapabiliyor) bir sonraki erişim gerçek havuzu açsın.
 */
class UnconfiguredClient {
  query(): never {
    throw new Error("DATABASE_URL tanımlı değil.");
  }
  connect(): never {
    throw new Error("DATABASE_URL tanımlı değil.");
  }
}

/**
 * Kendi sunucumuzdaki PostgreSQL'e bağlanır. Bağlantı ilk sorguda
 * kurulur; böylece DATABASE_URL olmadan da `next build` tamamlanır, hata yalnız
 * istek anında oluşur. Havuz (Pool) tek örnek olarak tutulur.
 */
function getDb(): Db {
  if (instance) return instance;
  const url = process.env.DATABASE_URL;
  if (!url) return drizzle(new UnconfiguredClient() as unknown as Pool, { schema });
  const pool = new Pool({ connectionString: url, max: 10 });
  /**
   * Dinleyici ZORUNLU. Havuzda boşta bekleyen bir bağlantı koparsa (Postgres
   * yeniden başladı, ağ hıçkırdı) pg-pool bağlantıyı atıp havuzda `error`
   * yayıyor. Dinleyicisi olmayan `error` olayı Node'da yakalanmamış istisnadır
   * ve süreci öldürür: sıradan bir veritabanı yeniden başlatması, aktif rengin
   * üç instance'ını birden düşürüyordu (güvenlik denetimi 2026-09-14, #4).
   *
   * Yapılacak başka bir şey yok: kopan bağlantı zaten havuzdan çıkarıldı, bir
   * sonraki sorgu yenisini açıyor. O an sorgu çalıştıran istekler hatayı kendi
   * `await`lerinde alıyor; bu yalnız BOŞTAKİ bağlantının hatası.
   */
  pool.on("error", (err) => console.error("[db:pool]", err.message));
  instance = drizzle(pool, { schema });
  return instance;
}

export const db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = getDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop];
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(real) : value;
  },
});
