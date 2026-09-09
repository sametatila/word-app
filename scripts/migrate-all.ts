import "dotenv/config";
import { readFileSync } from "node:fs";
import { Pool } from "pg";

/**
 * BOŞ bir veritabanına migration'ların TAMAMINI sırayla uygular.
 *
 * `apply-migration.ts` tek dosya çalıştırıyor — canlıya yeni bir adım eklerken
 * doğru araç o. Bu ise sıfırdan kurulum içindir: CI'ın postgres servisi ve
 * yerel docker kabı. Sıra `_journal.json`dan geliyor, dosya adı listesinden
 * değil: `0009_a.sql` ile `0010_b.sql` arasındaki bağımlılığı sıralayan tek
 * kayıt orası ve alfabetik sıralama onu bir gün sessizce bozardı.
 *
 * ÜRETİMDE KOŞMAZ. Adres localhost/127.0.0.1 değilse baştan reddediyor:
 * canlıda migration'lar zaten uygulanmış, tekrarı en iyi ihtimalle hata verir.
 *
 *   DATABASE_URL=postgres://postgres@127.0.0.1:55432/lernomi npx tsx scripts/migrate-all.ts
 */
type Journal = { entries: { idx: number; tag: string }[] };

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tanımlı değil");
  const host = new URL(url).hostname;
  if (host !== "localhost" && host !== "127.0.0.1") {
    throw new Error(`Yalnız yerel veritabanı: ${host} reddedildi`);
  }

  const journal = JSON.parse(readFileSync("drizzle/meta/_journal.json", "utf8")) as Journal;
  const entries = [...journal.entries].sort((a, b) => a.idx - b.idx);
  const pool = new Pool({ connectionString: url });

  for (const e of entries) {
    const path = `drizzle/${e.tag}.sql`;
    // Drizzle cümleleri bu işaretle ayırıyor; her biri ayrı gönderiliyor.
    const statements = readFileSync(path, "utf8")
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const stmt of statements) await pool.query(stmt);
    console.log(`  ${String(e.idx).padStart(4, "0")} ${e.tag}`);
  }

  console.log(`${entries.length} migration uygulandı.`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
