/**
 * Kabul edilen A2 maddelerini havuza katar: `node merge.js [--dry]`
 *
 * Girdi `accepted.json` (check.js üretir). Buradaki tek iş id atamak ve
 * `data/app/words.json` içine yazmak; eleme kararları check.js'te verilir.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, "..", "..");
const DRY = process.argv.includes("--dry");

const wordsPath = path.join(ROOT, "data/app/words.json");
const words = JSON.parse(fs.readFileSync(wordsPath, "utf8")) as Record<string, unknown>[];
const accepted = JSON.parse(fs.readFileSync(path.join(HERE, "accepted.json"), "utf8")) as {
  de: string; artikel?: string; tr: string; formen?: string; typ: string;
  beispiel: string; beispielTr: string;
}[];

const norm = (s: unknown): string => String(s ?? "").toLowerCase().replace(/\s+/g, " ").trim();
const existing = new Set(words.map((w) => norm(w.de)));

// Son bir savunma: check.js'ten sonra havuz değişmiş olabilir.
const fresh = accepted.filter((a) => !existing.has(norm(a.de)));
const dropped = accepted.length - fresh.length;

let nextId = Math.max(...words.map((w) => Number(w.id))) + 1;
const added = fresh.map((a) => ({
  id: nextId++,
  de: a.de,
  artikel: a.artikel ?? "",
  tr: a.tr,
  formen: a.formen ?? "",
  typ: a.typ,
  niveau: "A2",
  beispiel: a.beispiel,
  beispielTr: a.beispielTr,
  rank: null,
}));

const before = words.filter((w) => w.niveau === "A2").length;
console.log(`A2: ${before} → ${before + added.length} (+${added.length})`);
if (dropped) console.log(`son denetimde elenen: ${dropped}`);
console.log(`id aralığı: ${added[0]?.id} … ${added[added.length - 1]?.id}`);
if (DRY) {
  console.log("(kuru çalıştırma)");
  process.exit(0);
}

const all = [...words, ...added];
fs.writeFileSync(wordsPath, `[\n${all.map((w) => JSON.stringify(w)).join(",\n")}\n]\n`);
console.log(`data/app/words.json yazıldı (${all.length} madde).`);

// Örnek cümle çevirileri ayrı dosyada tutuluyor; yenileri oraya da eklenir.
const trPath = path.join(ROOT, "data/app/beispiel-tr.json");
if (fs.existsSync(trPath)) {
  const rows = JSON.parse(fs.readFileSync(trPath, "utf8")) as { id: number; tr: string }[];
  const have = new Set(rows.map((r) => r.id));
  for (const a of added) if (!have.has(a.id)) rows.push({ id: a.id, tr: a.beispielTr });
  fs.writeFileSync(trPath, `[\n${rows.map((r) => JSON.stringify(r)).join(",\n")}\n]\n`);
  console.log(`beispiel-tr.json güncellendi (${rows.length} çeviri).`);
}
