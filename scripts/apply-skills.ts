import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

/**
 * Yenilenen beceri sözlükçesini içerik dosyalarına yazar:
 *   `npm run skills:apply -- [kurs|paket|all] [--dry]`
 *
 * Kelime hattından ayrıldığı yer burası. Orada kaynak JSON'du ve düzeltme
 * ayrı bir dosyada durup tohumlamada bindiriliyordu. Beceri içeriği ise
 * TypeScript ve **derlemeye gömülü** (bkz. lib/skills/bundled.ts): PWA
 * çevrimdışı çalışsın diye veritabanı gerektirmiyor. Dolayısıyla düzeltmenin
 * gideceği yer kaynağın kendisi.
 *
 * Ajanların 150 KB'lık TypeScript dosyalarını elle düzenlemesi istenmedi:
 * aynı dosyada çalışan iki ajan birbirinin yazdığını siler ve bu sessizce
 * olur. Onun yerine ajanlar JSON üretiyor, yazma işini bu betik yapıyor —
 * tek bir yerde, biçimi belli, doğrulanabilir.
 *
 * Yazma satır düzeyinde ve muhafazakâr: yalnızca `{ de: "…", tr: "…" }`
 * kalıbına birebir uyan satırlara ve konuşma görevlerindeki `tr:` satırına
 * dokunuyor. Kalıbı tanımadığı hiçbir satırı değiştirmiyor; tanınmayan varsa
 * sayısını bildirip yazmayı iptal ediyor.
 *
 * Sonunda doğrulama var: içerik yeniden yüklenip üretilen JSON ile
 * karşılaştırılıyor. Yazdığını okumadan "tamam" demiyor.
 */

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "skills", "out");
const CONTENT = path.join(ROOT, "src", "lib", "skills", "content");
const TARGET = (process.argv[2] ?? "all").toLowerCase();
const DRY = process.argv.includes("--dry");

type Field = { de: string; tr: string; en?: string; hd?: string; note?: string };
type Entry = {
  id: string;
  gloss?: Field[];
  phrases?: Field[];
  targets?: Field[];
  tasks?: Field[];
};

/** Bir egzersizin bütün alanları: `de` → yeni değerler. */
type Glossary = Map<string, Field>;

function readOutputs(filter: string): Map<string, Glossary> {
  const out = new Map<string, Glossary>();
  if (!existsSync(OUT)) return out;
  for (const f of readdirSync(OUT)
    .filter((f) => f.endsWith(".json"))
    .sort()) {
    const slug = f.replace(/\.json$/, "");
    if (filter !== "all" && slug !== filter && !slug.startsWith(`${filter}-`))
      continue;
    for (const entry of JSON.parse(
      readFileSync(path.join(OUT, f), "utf8"),
    ) as Entry[]) {
      const s: Glossary = out.get(entry.id) ?? new Map();
      for (const field of [
        entry.gloss,
        entry.phrases,
        entry.targets,
        entry.tasks,
      ]) {
        for (const a of field ?? []) s.set(a.de, a);
      }
      out.set(entry.id, s);
    }
  }
  return out;
}

/** TypeScript kaynağına gömülecek dize hâli. */
const lit = (s: string) => JSON.stringify(s);

/** `{ de: "…", tr: "…" }` — kaçışlı tırnakları da tanır. */
const ONE_LINE =
  /^(\s*)\{\s*de:\s*("(?:[^"\\]|\\.)*")\s*,\s*tr:\s*("(?:[^"\\]|\\.)*")\s*(?:,\s*en:\s*"(?:[^"\\]|\\.)*"\s*)?(?:,\s*hd:\s*"(?:[^"\\]|\\.)*"\s*)?(?:,\s*note:\s*"(?:[^"\\]|\\.)*"\s*)?,?\s*\},?\s*$/;
const ID_LINE = /^\s*id:\s*"([^"]+)",\s*$/;
const DE_LINE = /^(\s*)de:\s*("(?:[^"\\]|\\.)*"),\s*$/;
const TR_LINE = /^(\s*)tr:\s*("(?:[^"\\]|\\.)*"),\s*$/;

function rewrite(file: string, glossaries: Map<string, Glossary>) {
  const lines = readFileSync(file, "utf8").split("\n");
  let exId: string | null = null;
  let lastDe: string | null = null;
  let changed = 0;
  const output: string[] = [];

  for (const line of lines) {
    const idm = line.match(ID_LINE);
    if (idm) {
      exId = idm[1];
      lastDe = null;
      output.push(line);
      continue;
    }
    const s = exId ? glossaries.get(exId) : undefined;

    const oneLineMatch = line.match(ONE_LINE);
    if (oneLineMatch && s) {
      const de = JSON.parse(oneLineMatch[2]) as string;
      const updated = s.get(de);
      if (updated) {
        const parts = [`de: ${lit(de)}`, `tr: ${lit(updated.tr)}`];
        if (updated.en) parts.push(`en: ${lit(updated.en)}`);
        if (updated.hd) parts.push(`hd: ${lit(updated.hd)}`);
        if (updated.note) parts.push(`note: ${lit(updated.note)}`);
        output.push(`${oneLineMatch[1]}{ ${parts.join(", ")} },`);
        changed++;
        continue;
      }
    }

    // Konuşma görevi: `de:` ve `tr:` ayrı satırlarda, arada başka alan yok.
    const dem = line.match(DE_LINE);
    if (dem) {
      lastDe = JSON.parse(dem[2]) as string;
      output.push(line);
      continue;
    }
    const trm = line.match(TR_LINE);
    if (trm && lastDe && s) {
      const updated = s.get(lastDe);
      if (updated) {
        output.push(`${trm[1]}tr: ${lit(updated.tr)},`);
        if (updated.en) output.push(`${trm[1]}en: ${lit(updated.en)},`);
        changed++;
        lastDe = null;
        continue;
      }
    }
    // `en:` satırı zaten varsa ve yeniden yazıyorsak tekrarı önle.
    if (/^\s*en:\s*"/.test(line) && lastDe === null && changed) continue;

    output.push(line);
  }

  return { text: output.join("\n"), changed };
}

async function main() {
  try {
    execFileSync("node", ["data/skills/check.mjs", TARGET], {
      stdio: "inherit",
    });
  } catch {
    console.error("\nDenetleyici hata bildirdi — yazma yapılmadı.");
    process.exit(1);
  }

  const glossaries = readOutputs(TARGET);
  if (!glossaries.size) {
    console.log("Uygulanacak egzersiz yok.");
    return;
  }
  const expected = [...glossaries.values()].reduce((s, m) => s + m.size, 0);
  console.log(
    `\n${glossaries.size} egzersiz, ${expected} alan${DRY ? " (deneme)" : ""}.`,
  );

  let total = 0;
  const toWrite: [string, string][] = [];
  for (const f of readdirSync(CONTENT).filter((f) => f.endsWith(".ts"))) {
    const filePath = path.join(CONTENT, f);
    const { text, changed } = rewrite(filePath, glossaries);
    if (!changed) continue;
    total += changed;
    toWrite.push([filePath, text]);
    console.log(`  ${f}: ${changed} alan`);
  }

  if (total !== expected) {
    console.error(
      `\nUYUŞMAZLIK: ${expected} alan bekleniyordu, ${total} satır eşleşti. ` +
        `Kaynakta tanınmayan biçim var — yazma iptal.`,
    );
    process.exit(1);
  }
  if (DRY) return;

  for (const [filePath, text] of toWrite) writeFileSync(filePath, text);

  // Yazdığını oku: içerik yeniden yüklenip üretilen JSON ile karşılaştırılıyor.
  const dump = path.join(ROOT, "data", "skills", ".verify.json");
  execFileSync(
    "npx",
    [
      "tsx",
      "-e",
      `import { BUNDLED_EXERCISES } from "./src/lib/skills/bundled";
       import { writeFileSync } from "node:fs";
       writeFileSync(${JSON.stringify(dump)}, JSON.stringify(BUNDLED_EXERCISES));`,
    ],
    { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] },
  );
  const loaded = JSON.parse(readFileSync(dump, "utf8")) as Record<
    string,
    unknown
  >[];
  const drift: string[] = [];
  for (const e of loaded as any[]) {
    const s = glossaries.get(e.id as string);
    if (!s) continue;
    const allFields: Field[] = [
      ...(e.gloss ?? []),
      ...(e.targets ?? []),
      // Konuşma görevlerinin `de` alanı var; yazma görevlerinin yok, onların
      // sözlükçesi `phrases` içinde duruyor.
      ...(e.skill === "speaking" ? (e.tasks ?? []) : []),
      ...(e.skill === "writing"
        ? (e.tasks ?? []).flatMap((t: any) =>
            t.kind === "free" ? (t.phrases ?? []) : [],
          )
        : []),
    ];
    for (const a of allFields) {
      const y = s.get(a.de);
      if (!y) continue;
      // Dört alan da karşılaştırılıyor. Önce yalnızca `tr` ile `en` bakılıyordu
      // ve bu, Züritüütsch'ün tam da yeni olan kısmını doğrulama dışında
      // bırakıyordu: `hd` köprüsü ya da `note` yazılmasa doğrulama yine
      // "tamam" derdi. Yazdığını okumayan doğrulama doğrulama değil.
      for (const field of ["tr", "en", "hd", "note"] as const) {
        if ((y[field] ?? null) !== ((a[field] as string | undefined) ?? null))
          drift.push(
            `${e.id} ${a.de} · ${field}: yazılan "${a[field] ?? "—"}" ≠ beklenen "${y[field] ?? "—"}"`,
          );
      }
    }
  }
  if (drift.length) {
    console.error(`\nDOĞRULAMA BAŞARISIZ (${drift.length} sapma):`);
    drift.slice(0, 10).forEach((s) => console.error("  " + s));
    process.exit(1);
  }

  console.log(
    `Uygulama tamam: ${total} alan yazıldı ve geri okunarak doğrulandı.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
