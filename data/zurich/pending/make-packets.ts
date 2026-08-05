/**
 * Lehçe karşılığı olmayan maddelerden girdi paketi üretir:
 *   npx tsx data/zurich/pending/make-packets.ts [paketBoyu]
 *
 * `words.json` ile mevcut `chunk-*.json` dosyalarını karşılaştırır, eksik
 * kalanları 200'erlik `part-NN.json` dosyalarına böler. Bu, Almanca havuz her
 * büyüdüğünde Zürih tarafını yeniden hizalamanın ilk adımıdır.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..", "..", "..");
const SIZE = Number(process.argv[2] ?? 200);

type Word = {
  id: number;
  de: string;
  artikel: string;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string | null;
};

const words: Word[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8"),
);

const zurichDir = path.join(ROOT, "data/zurich");
const covered = new Set<number>();
for (const f of fs.readdirSync(zurichDir).filter((f) => /^chunk-\d+\.json$/.test(f))) {
  for (const row of JSON.parse(fs.readFileSync(path.join(zurichDir, f), "utf8")) as { id: number }[])
    covered.add(row.id);
}

const missing = words.filter((w) => !covered.has(w.id));
const byLevel: Record<string, number> = {};
for (const w of missing) byLevel[w.niveau] = (byLevel[w.niveau] ?? 0) + 1;

console.log(`kaynak ${words.length} · lehçe karşılığı olan ${covered.size} · eksik ${missing.length}`);
console.log("seviyeye göre:", JSON.stringify(byLevel));

if (!missing.length) {
  console.log("Eksik yok, paket üretilmedi.");
  process.exit(0);
}

// Eski paketler temizlenir ki yarım kalmış bir turdan artık kalmasın.
for (const f of fs.readdirSync(HERE).filter((f) => /^part-\d+\.json$/.test(f)))
  fs.unlinkSync(path.join(HERE, f));

let n = 0;
for (let i = 0; i < missing.length; i += SIZE) {
  n++;
  const slice = missing.slice(i, i + SIZE).map((w) => ({
    id: w.id,
    de: w.de,
    artikel: w.artikel,
    tr: w.tr,
    typ: w.typ,
    niveau: w.niveau,
    beispiel: w.beispiel,
  }));
  const file = path.join(HERE, `part-${String(n).padStart(2, "0")}.json`);
  fs.writeFileSync(file, `${JSON.stringify(slice, null, 1)}\n`);
  console.log(`  ${path.basename(file)}  ${slice.length} madde`);
}
console.log(`\n${n} paket yazıldı. Sonraki adım: her paketi bir ajana SPEC-ZH.md ile ver.`);
