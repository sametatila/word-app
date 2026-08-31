/**
 * Yerel test veritabanına kelime yükler.
 *
 * `scripts/seed.ts` bunu yapamıyor çünkü Neon'un HTTP sürücüsünü kullanıyor ve
 * o sürücü düz bir PostgreSQL'e bağlanamıyor. E2E testi ise dolu bir `words`
 * tablosu bekliyor: tohumlanmamış veritabanında oturum kurulamadığı için
 * testlerin çoğu "0 tur üretildi" diye düşüyor ve sebebi kodmuş gibi görünüyor.
 *
 *   TEST_DATABASE_URL=postgres://... npm run test:seed
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";

type Row = {
  id: number; de: string; artikel: string; tr: string; formen: string;
  typ: string; niveau: string; beispiel: string; rank?: number | null;
};

async function main() {
  const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL || undefined });
  const rows = JSON.parse(
    readFileSync(path.join(process.cwd(), "data", "app", "words.json"), "utf8"),
  ) as Row[];
  let trMap = new Map<number, string>();
  try {
    const t = JSON.parse(
      readFileSync(path.join(process.cwd(), "data", "app", "beispiel-tr.json"), "utf8"),
    ) as { id: number; tr: string }[];
    trMap = new Map(t.map((r) => [r.id, r.tr]));
  } catch { /* çeviri yoksa boş geçilir */ }

  const client = await pool.connect();
  await client.query("truncate words cascade");
  const CHUNK = 400;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const part = rows.slice(i, i + CHUNK);
    const vals: unknown[] = [];
    const holes = part.map((r, k) => {
      const b = k * 11;
      vals.push(r.id, "de", r.de, r.artikel || null, r.tr, r.formen || null, r.typ || null,
        r.niveau, r.beispiel || null, trMap.get(r.id) ?? null, r.rank ?? null);
      return `($${b+1},$${b+2},$${b+3},$${b+4},$${b+5},$${b+6},$${b+7},$${b+8},$${b+9},$${b+10},$${b+11})`;
    }).join(",");
    await client.query(
      `insert into words (id, course, de, artikel, tr, formen, typ, niveau, beispiel, beispiel_tr, rank)
       values ${holes} on conflict (id) do nothing`, vals);
  }
  const { rows: [c] } = await client.query("select count(*)::int n from words");
  console.log(`${c.n} kelime yüklendi.`);
  client.release();
  await pool.end();
}
main();
