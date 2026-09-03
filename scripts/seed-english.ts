import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { words } from "../src/lib/db/schema";

/**
 * İngilizce kursunu (`course = "en"`) tohumlar: `npm run db:seed:en`
 *
 * Neden ayrı bir betik: Almanca tohumlaması (seed.ts) kaynak listeyi
 * `data/meanings/out` bindirmesiyle birleştiriyor ve artikel/formen/rank gibi
 * Almancaya özgü alanları taşıyor. İngilizce kaydın şekli farklı — bunları
 * ikisi de aynı dosyaya sıkıştırmak her iki tarafı da okunmaz yapardı.
 *
 * ŞEKİL (kolonlar 1 Ekim'e kadar yeniden adlandırılmadan kullanılıyor; web o
 * tarihe dek canlı ve `de` kolonunun adı değişirse kırılır):
 *   id           200000 + kaynak id — de (1-8267) ve gsw-zh (100001+) ile çakışmaz
 *   de           HEDEF TERİM = İngilizce kelime (kolon adı tarihsel yanlış ad)
 *   artikel      NULL — İngilizcede isim cinsiyeti yok. Artikel ve Çoğul turları
 *                `artikel` boşken zaten üretilmiyor, yani kendiliğinden kapanıyor.
 *   formen       NULL — Almanca çekim kuralları taşınmaz
 *   en           NULL — terim zaten İngilizce; doldurulsa anlam oyunlarda
 *                "tr · en" biçiminde iki kez görünürdü
 *   rank         NULL — mevcut rank ALMANCA frekansı, İngilizceye taşınmaz
 *   niveau       İNGİLİZCE CEFR seviyesi (Almanca kaynağın seviyesi değil)
 */

type Row = {
  id: number;
  de: string;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string;
  beispielTr: string;
};

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");
  const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }));

  const file = path.join(process.cwd(), "data", "app", "words-en.json");
  const rows = JSON.parse(readFileSync(file, "utf8")) as Row[];
  console.log(`${rows.length} İngilizce kelime okundu.`);

  const values = rows.map((r) => ({
    id: r.id,
    de: r.de,
    artikel: null,
    tr: r.tr,
    en: null,
    formen: null,
    typ: r.typ,
    niveau: r.niveau,
    beispiel: r.beispiel || null,
    beispielTr: r.beispielTr || null,
    beispielEn: null,
    rank: null,
    course: "en",
  }));

  const CHUNK = 400;
  for (let i = 0; i < values.length; i += CHUNK) {
    await db
      .insert(words)
      .values(values.slice(i, i + CHUNK))
      .onConflictDoUpdate({
        target: words.id,
        set: {
          de: sql`excluded.de`,
          tr: sql`excluded.tr`,
          typ: sql`excluded.typ`,
          niveau: sql`excluded.niveau`,
          beispiel: sql`excluded.beispiel`,
          beispielTr: sql`excluded.beispiel_tr`,
        },
      });
    console.log(`  ${Math.min(i + CHUNK, values.length)}/${values.length}`);
  }

  // Kaynaktan çıkarılan maddeler kalmamalı. Silme YALNIZ `course = "en"` ile
  // sınırlı: Almanca ve Zürih kursları bu betikten hiç etkilenmemeli.
  const removed = await db
    .delete(words)
    .where(
      and(
        eq(words.course, "en"),
        notInArray(
          words.id,
          values.map((v) => v.id),
        ),
      ),
    )
    .returning({ id: words.id });
  if (removed.length) console.log(`Silinen eski kelime: ${removed.length}`);

  console.log("İngilizce tohumlama tamam.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
