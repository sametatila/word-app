import "dotenv/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { words } from "../src/lib/db/schema";

type Row = {
  id: number;
  de: string;
  artikel: string;
  tr: string;
  formen: string;
  typ: string;
  niveau: string;
  beispiel: string;
  rank?: number | null;
};

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");
  const db = drizzle(neon(process.env.DATABASE_URL));

  const file = path.join(process.cwd(), "data", "app", "words.json");
  const rows = JSON.parse(readFileSync(file, "utf8")) as Row[];
  console.log(`${rows.length} kelime okundu.`);

  // Örnek cümlelerin doğal Türkçe çevirileri (id → çeviri). Dosya yoksa
  // kelimeler çevirisiz yüklenir; oyunlar çeviriyi ancak varsa gösterir.
  let beispielTr = new Map<number, string>();
  try {
    const trRows = JSON.parse(
      readFileSync(path.join(process.cwd(), "data", "app", "beispiel-tr.json"), "utf8"),
    ) as { id: number; tr: string }[];
    beispielTr = new Map(trRows.map((r) => [r.id, r.tr]));
    console.log(`${beispielTr.size} örnek cümle çevirisi okundu.`);
  } catch {
    console.warn("beispiel-tr.json bulunamadı — örnek cümle çevirileri boş kalacak.");
  }

  // Türkçe karşılığı -mek/-mak ile bitiyorsa kelime fiildir; PDF'ten gelen
  // "Sonstiges" etiketi 200'den fazla fiili yanlış sınıflandırıyordu.
  const inferTyp = (r: Row) =>
    r.typ === "Sonstiges" && /(mek|mak)(\s*,|$)/.test(r.tr) ? "Verb" : r.typ;

  /**
   * Madde başını oyunlarda gösterilebilir hâle getirir: PDF'ten sızan bölgesel
   * çapraz göndermeler ("Abitur (D)→A") ve yarım kalan parantezler temizlenir.
   */
  const cleanDe = (de: string) => {
    let s = de.split("→")[0];
    s = s.replace(/\s*\((D|A|CH)(,\s*(D|A|CH))*\)\s*$/g, "");
    s = s.replace(/\s*\((Sg|Pl)\.\)\s*$/gi, "");
    if ((s.match(/\(/g)?.length ?? 0) > (s.match(/\)/g)?.length ?? 0)) s = s.split("(")[0];
    return s.replace(/\s+/g, " ").replace(/[\s,;/-]+$/, "").trim() || de;
  };

  const values = rows.map((r) => ({
    id: r.id,
    de: cleanDe(r.de),
    artikel: r.artikel || null,
    tr: r.tr,
    formen: r.formen || null,
    typ: inferTyp(r),
    niveau: r.niveau.startsWith("A1") ? "A1" : r.niveau,
    beispiel: r.beispiel || null,
    beispielTr: beispielTr.get(r.id) ?? null,
    rank: r.rank ?? null,
  }));

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
          beispielTr: sql`excluded.beispiel_tr`,
          rank: sql`excluded.rank`,
        },
      });
    console.log(`  ${Math.min(i + CHUNK, values.length)}/${values.length}`);
  }
  // Kaynaktan çıkarılan maddeler veritabanında kalmamalı: yalnızca upsert
  // yapılırsa silinen yinelenen kayıtlar Neon'da sonsuza kadar yaşar ve
  // öğrenciye aynı kelime iki kez gelmeye devam eder.
  const removed = await db
    .delete(words)
    .where(
      and(
        eq(words.course, "de"),
        notInArray(
          words.id,
          values.map((v) => v.id),
        ),
      ),
    )
    .returning({ id: words.id });
  if (removed.length) console.log(`Silinen eski kelime: ${removed.length}`);

  console.log("Tohumlama tamam.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
