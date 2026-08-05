/**
 * Şema sapması denetimi: `npm run db:check`
 *
 * Koddaki tablo/sütun tanımlarını canlı veritabanıyla karşılaştırır.
 *
 * Neden gerekli: bu projede göçler elle uygulanıyor ve kod Vercel'de ayrı bir
 * hızda ilerliyor. İki taraf ayrışınca Drizzle sütunları açıkça seçtiği için
 * uygulama sessizce değil, 500 ile patlıyor — üstelik yalnızca o sütuna dokunan
 * uçta. Bu betik ayrışmayı deploy'dan önce görünür kılar.
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { getTableConfig } from "drizzle-orm/pg-core";
import * as schema from "../src/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const live = await sql`
    select table_name, column_name from information_schema.columns
    where table_schema = 'public'`;
  const liveCols = new Map<string, Set<string>>();
  for (const r of live as { table_name: string; column_name: string }[]) {
    if (!liveCols.has(r.table_name)) liveCols.set(r.table_name, new Set());
    liveCols.get(r.table_name)!.add(r.column_name);
  }

  const problems: string[] = [];
  // Şemadan tabloları ayıkla. Drizzle tablo nesneleri "drizzle:Name" simgesini
  // taşır; tip tarafı jenerik olduğu için burada dar tipe zorlamıyoruz.
  const tables = Object.values(schema).filter(
    (v) => typeof v === "object" && v !== null && Symbol.for("drizzle:Name") in v,
  ) as Parameters<typeof getTableConfig>[0][];

  for (const table of tables) {
    const { name, columns } = getTableConfig(table);
    const cols = liveCols.get(name);
    if (!cols) {
      problems.push(`TABLO YOK: ${name}`);
      continue;
    }
    for (const col of columns) {
      if (!cols.has(col.name)) problems.push(`SÜTUN YOK: ${name}.${col.name}`);
    }
    const known = new Set(columns.map((c) => c.name));
    for (const col of cols) {
      if (!known.has(col)) problems.push(`FAZLA SÜTUN: ${name}.${col} (kodda yok)`);
    }
    console.log(`  ${name.padEnd(16)} ${columns.length} sütun ✓`);
  }

  if (problems.length) {
    console.log("\nSAPMA:");
    for (const p of problems) console.log("  -", p);
    console.log(
      "\nSütun/tablo eksikse göçü uygula. FAZLA sütun varsa: onu düşüren göç,\n" +
        "o sütunu kullanmayan kod canlıya çıkana kadar BEKLETİLMELİ.",
    );
    process.exit(1);
  }
  console.log("\nŞema ile veritabanı uyumlu.");
}

main();
