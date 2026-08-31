import "dotenv/config";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { Pool } from "pg";
import { readMeanings } from "./apply-meanings";

/**
 * Yenilenen Züritüütsch örnek cümlelerini veritabanına yazar:
 *   `npm run zurich:apply -- [seviye|paket|all] [--dry]`
 *
 * Cümlenin Türkçe ve İngilizce karşılığı burada ayrıca yazılmıyor: lehçe
 * cümlesi Almanca cümlenin karşılığı olmak zorunda (bkz.
 * data/zurich/beispiel/SPEC.md), dolayısıyla çeviri oradan devralınıyor.
 * Aynı cümlenin çevirisini iki yerde tutmak, iki kopyanın ayrışması demekti —
 * ve ayrıştığında hangisinin doğru olduğu belli olmazdı.
 */

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "zurich", "beispiel", "out");
const TARGET = (process.argv[2] ?? "all").toLowerCase();
const DRY = process.argv.includes("--dry");
const ID_OFFSET = 100000;

/** Kaynak id → Züritüütsch örnek cümle. */
export function readZurichSentences(filter = "all"): Map<number, string> {
  const out = new Map<number, string>();
  if (!existsSync(OUT)) return out;
  for (const f of readdirSync(OUT).filter((f) => f.endsWith(".json")).sort()) {
    const slug = f.replace(/\.json$/, "");
    if (filter !== "all" && slug !== filter && !slug.startsWith(`${filter}-`)) continue;
    for (const r of JSON.parse(readFileSync(path.join(OUT, f), "utf8")) as {
      id: number;
      beispiel: string;
    }[]) {
      if (r.beispiel?.trim()) out.set(r.id, r.beispiel.trim());
    }
  }
  return out;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");

  try {
    execFileSync("node", ["data/zurich/beispiel/check.mjs", TARGET], { stdio: "inherit" });
  } catch {
    console.error("\nDenetleyici hata bildirdi — yazma yapılmadı.");
    process.exit(1);
  }

  const sentences = readZurichSentences(TARGET);
  const meanings = new Map(readMeanings().map((m) => [m.id, m]));
  const rows = [...sentences]
    .map(([id, beispiel]) => ({ id, beispiel, m: meanings.get(id) }))
    .filter((r) => r.m);

  const untranslated = sentences.size - rows.length;
  if (untranslated)
    console.log(
      `${untranslated} lehçe cümlesinin Almanca karşılığı henüz yenilenmemiş — atlandı.`,
    );
  if (!rows.length) {
    console.log("Uygulanacak cümle yok.");
    return;
  }

  console.log(`\n${rows.length} Züritüütsch cümle uygulanacak${DRY ? " (deneme)" : ""}.`);
  if (DRY) {
    for (const r of rows.slice(0, 10)) console.log(`  ${r.id}  ${r.beispiel}`);
    return;
  }

  const sql = new Pool({ connectionString: process.env.DATABASE_URL });
  const CHUNK = 200;
  let written = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    const params: string[] = [];
    const tuples = chunk.map((r, j) => {
      const b = j * 4;
      params.push(String(r.id + ID_OFFSET), r.beispiel, r.m!.beispielTr, r.m!.beispielEn);
      return `($${b + 1}::int, $${b + 2}, $${b + 3}, $${b + 4})`;
    });
    await sql.query(
      `update words as w
         set beispiel = v.beispiel, beispiel_tr = v.beispiel_tr, beispiel_en = v.beispiel_en
       from (values ${tuples.join(",")}) as v(id, beispiel, beispiel_tr, beispiel_en)
       where w.id = v.id and w.course = 'gsw-zh'`,
      params,
    );
    written += chunk.length;
    console.log(`  ${written}/${rows.length}`);
  }
  console.log("Uygulama tamam.");
}

if (process.argv[1]?.endsWith("apply-zurich-beispiel.ts")) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
