import { Pool } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

type Db = NodePgDatabase<typeof schema>;

let instance: Db | null = null;

/**
 * Kendi sunucumuzdaki PostgreSQL'e bağlanır (Neon değil). Bağlantı ilk sorguda
 * kurulur; böylece DATABASE_URL olmadan da `next build` tamamlanır, hata yalnız
 * istek anında oluşur. Havuz (Pool) tek örnek olarak tutulur.
 */
function getDb(): Db {
  if (instance) return instance;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil.");
  const pool = new Pool({ connectionString: url, max: 10 });
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
