import "dotenv/config";
import { readFileSync } from "node:fs";
import { Pool } from "pg";

/**
 * Tek bir migration dosyasını canlı veritabanına uygular.
 *
 * `drizzle-kit push` yerine bu var çünkü push şemayı DİFF'liyor ve sürüklenmiş
 * bir veritabanında yıkıcı bir adım önerebiliyor. Burada çalışan şey, gözden
 * geçirilmiş SQL dosyasının kendisi — ne eksik ne fazla.
 *
 *   npx tsx scripts/apply-migration.ts drizzle/0020_premium_skreet.sql
 *   npx tsx scripts/apply-migration.ts --check      # yalnızca tablo listesi
 */
async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil");
  const sql = new Pool({ connectionString: url });

  const arg = process.argv[2];
  if (!arg || arg === "--check") {
    const rows = (await sql`
      select table_name from information_schema.tables
      where table_schema = 'public' order by 1
    `) as { table_name: string }[];
    console.log(rows.map((r) => r.table_name).join("\n"));
    return;
  }

  const file = readFileSync(arg, "utf8");
  // Drizzle cümleleri bu işaretle ayırıyor; her biri ayrı gönderiliyor çünkü
  // HTTP sürücüsü çok cümleli gövde kabul etmiyor.
  const statements = file
    .split("--> statement-breakpoint")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const [i, stmt] of statements.entries()) {
    process.stdout.write(`  ${i + 1}/${statements.length} … `);
    await sql.query(stmt);
    console.log("tamam");
  }
  console.log(`${arg} uygulandı.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
