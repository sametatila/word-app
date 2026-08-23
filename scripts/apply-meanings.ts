import "dotenv/config";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { neon } from "@neondatabase/serverless";

/**
 * Yenilenen anlamları ve örnek cümleleri veritabanına yazar:
 *   `npm run meanings:apply -- [seviye|paket|all] [--dry]`
 *
 * Kaynak `data/meanings/out/*.json`; orası **doğrunun tek kaynağı**. Neon'a
 * doğrudan yazmak yetmiyor: `db:seed` kelimeleri `data/app/words.json`'dan
 * yeniden yüklüyor ve elle yapılan her düzeltmeyi siliyor. Bu yüzden düzeltme
 * repoda duruyor, betik yalnızca onu uyguluyor — ve `seed.ts` de aynı dosyaları
 * bindiriyor, yani hangi sırayla çalıştırıldığı fark etmiyor.
 *
 * Denetleyici önce çalışır ve hata varsa yazma yapılmaz: yarım doğru bir veri
 * kümesi, hiç dokunulmamış olandan daha zor fark edilir.
 */

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "meanings", "out");
const HEDEF = (process.argv[2] ?? "all").toLowerCase();
const DRY = process.argv.includes("--dry");

/** gsw-zh kursu aynı kelimeyi 100000 kaydırmalı kimlikle taşıyor. */
const ID_OFFSET = 100000;

export type Meaning = {
  id: number;
  tr: string;
  en: string;
  beispiel: string;
  beispielTr: string;
  beispielEn: string;
};

export function readMeanings(filtre = "all"): Meaning[] {
  if (!existsSync(OUT)) return [];
  const rows: Meaning[] = [];
  const görülen = new Set<number>();
  for (const f of readdirSync(OUT).filter((f) => f.endsWith(".json")).sort()) {
    const slug = f.replace(/\.json$/, "");
    if (filtre !== "all" && slug !== filtre && !slug.startsWith(`${filtre}-`)) continue;
    for (const r of JSON.parse(readFileSync(path.join(OUT, f), "utf8")) as Meaning[]) {
      if (görülen.has(r.id)) throw new Error(`${f}: ${r.id} birden çok pakette var`);
      görülen.add(r.id);
      rows.push(r);
    }
  }
  return rows;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");

  // Denetleyici ayrı bir süreç: aynı kuralların iki kopyası olmasın diye
  // burada yeniden yazılmıyor, olduğu gibi çağrılıyor.
  try {
    execFileSync("node", ["data/meanings/check.mjs", HEDEF], { stdio: "inherit" });
  } catch {
    console.error("\nDenetleyici hata bildirdi — yazma yapılmadı.");
    process.exit(1);
  }

  const rows = readMeanings(HEDEF);
  if (!rows.length) {
    console.log("Uygulanacak madde yok.");
    return;
  }
  console.log(`\n${rows.length} madde uygulanacak${DRY ? " (deneme)" : ""}.`);
  if (DRY) {
    for (const r of rows.slice(0, 10)) console.log(`  ${r.id}  ${r.tr} · ${r.en}  — ${r.beispiel}`);
    return;
  }

  const sql = neon(process.env.DATABASE_URL);
  const CHUNK = 200;
  let yazilan = 0;

  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const params: string[] = [];
    const tuples = chunk.map((r, j) => {
      const b = j * 6;
      params.push(
        String(r.id),
        r.tr.trim(),
        r.en.trim(),
        r.beispiel.trim(),
        r.beispielTr.trim(),
        r.beispielEn.trim(),
      );
      return `($${b + 1}::int, $${b + 2}, $${b + 3}, $${b + 4}, $${b + 5}, $${b + 6})`;
    });

    // Almanca kursu: beş alanın hepsi.
    await sql.query(
      `update words as w
         set tr = v.tr, en = v.en, beispiel = v.beispiel,
             beispiel_tr = v.beispiel_tr, beispiel_en = v.beispiel_en
       from (values ${tuples.join(",")}) as v(id, tr, en, beispiel, beispiel_tr, beispiel_en)
       where w.id = v.id and w.course = 'de'`,
      params,
    );

    // Züritüütsch aynası: kelime düzeyindeki karşılıklar birebir aynıdır ve
    // buradan devralınır. Lehçe örnek cümlesi ayrı bir iştir; ona ait çeviriler
    // o cümle yazıldığında yerine oturur, burada dokunulmaz.
    await sql.query(
      `update words as w
         set tr = v.tr, en = v.en
       from (values ${tuples.join(",")}) as v(id, tr, en, beispiel, beispiel_tr, beispiel_en)
       where w.id = v.id + ${ID_OFFSET} and w.course = 'gsw-zh'`,
      params,
    );

    yazilan += chunk.length;
    console.log(`  ${yazilan}/${rows.length}`);
  }

  console.log("Uygulama tamam.");
}

if (process.argv[1]?.endsWith("apply-meanings.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
