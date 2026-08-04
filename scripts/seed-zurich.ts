import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { words } from "../src/lib/db/schema";

/**
 * Züritüütsch kelime havuzunu Neon'a yükler.
 *
 * Kaynak: data/app/words.json (Goethe listesi — tr/typ/niveau/rank buradan) +
 * data/zurich/chunk-*.json (gsw biçim, artikel, Zürihce örnek cümle).
 * gsw kelimeleri 100000+kaynak_id kimliğiyle, course='gsw-zh' olarak yaşar;
 * Hochdeutsch köprüsü formen alanına "HD: …" olarak yazılır.
 */

const ID_OFFSET = 100000;

type SrcRow = {
  id: number;
  de: string;
  artikel: string;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string;
  rank?: number | null;
};
type GswRow = { id: number; gsw: string; artikel: string | null; beispiel: string };

/** seed.ts ile aynı temizlik: bölgesel işaretler ve yarım parantezler ayıklanır. */
function cleanDe(de: string) {
  let s = de.split("→")[0];
  s = s.replace(/\s*\((D|A|CH)(,\s*(D|A|CH))*\)\s*$/g, "");
  s = s.replace(/\s*\((Sg|Pl)\.\)\s*$/gi, "");
  if ((s.match(/\(/g)?.length ?? 0) > (s.match(/\)/g)?.length ?? 0)) s = s.split("(")[0];
  return s.replace(/\s+/g, " ").replace(/[\s,;/-]+$/, "").trim() || de;
}

const inferTyp = (r: SrcRow) =>
  r.typ === "Sonstiges" && /(mek|mak)(\s*,|$)/.test(r.tr) ? "Verb" : r.typ;

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");

  const srcRows = JSON.parse(
    readFileSync(path.join(process.cwd(), "data", "app", "words.json"), "utf8"),
  ) as SrcRow[];
  const srcById = new Map(srcRows.map((r) => [r.id, r]));

  const dir = path.join(process.cwd(), "data", "zurich");
  const chunkFiles = readdirSync(dir)
    .filter((f) => /^chunk-\d+\.json$/.test(f))
    .sort();
  const gswRows: GswRow[] = chunkFiles.flatMap(
    (f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as GswRow[],
  );

  console.log(`${chunkFiles.length} parça, ${gswRows.length} gsw madde okundu.`);
  if (gswRows.length !== srcRows.length) {
    const have = new Set(gswRows.map((g) => g.id));
    const missing = srcRows.filter((r) => !have.has(r.id)).length;
    throw new Error(
      `Eksik madde: kaynak ${srcRows.length}, gsw ${gswRows.length} (eksik ${missing}). Tüm parçalar üretilmeden yükleme yapılmaz.`,
    );
  }

  // Karakter bütünlüğü: mojibake varsa hiç yükleme.
  const bad = /�|Ã.|â€|Ä±|Å./;
  for (const g of gswRows) {
    const m = JSON.stringify(g).match(bad);
    if (m) throw new Error(`Mojibake: id ${g.id} → "${m[0]}"`);
  }

  const values = gswRows.map((g) => {
    const src = srcById.get(g.id);
    if (!src) throw new Error(`Kaynakta olmayan id: ${g.id}`);
    return {
      id: ID_OFFSET + g.id,
      de: g.gsw.trim(),
      artikel: g.artikel || null,
      tr: src.tr,
      formen: `HD: ${cleanDe(src.de)}`,
      typ: inferTyp(src),
      niveau: src.niveau.startsWith("A1") ? "A1" : src.niveau,
      beispiel: g.beispiel?.trim() || null,
      rank: src.rank ?? null,
      course: "gsw-zh",
    };
  });

  const db = drizzle(neon(process.env.DATABASE_URL));
  const CHUNK = 400;
  for (let i = 0; i < values.length; i += CHUNK) {
    const chunk = values.slice(i, i + CHUNK);
    await db
      .insert(words)
      .values(chunk)
      .onConflictDoUpdate({
        target: words.id,
        set: {
          de: sql`excluded.de`,
          artikel: sql`excluded.artikel`,
          tr: sql`excluded.tr`,
          formen: sql`excluded.formen`,
          typ: sql`excluded.typ`,
          niveau: sql`excluded.niveau`,
          beispiel: sql`excluded.beispiel`,
          rank: sql`excluded.rank`,
          course: sql`excluded.course`,
        },
      });
    console.log(`  ${Math.min(i + CHUNK, values.length)}/${values.length}`);
  }

  const removed = await db
    .delete(words)
    .where(and(eq(words.course, "gsw-zh"), notInArray(words.id, values.map((v) => v.id))))
    .returning({ id: words.id });
  if (removed.length) console.log(`Silinen eski gsw kelime: ${removed.length}`);

  console.log(`Züritüütsch havuzu yüklendi: ${values.length} kelime.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
