/**
 * Modül sınavı kâğıtlarının İngilizcesini denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/lessons/exam/check.ts [paket|all]`
 *
 * Kurallar kardeş kapılarla aynı aileden; ikisi bu alana özgü:
 *
 * - **Soru kökünün çevirisi CEVABI VERMEMELİ.** Şıklar Almanca kalıyor;
 *   İngilizce kök bir şıkkı olduğu gibi taşırsa soru ölçmeyi bırakır —
 *   öğrenci dinlemeden, okumadan doğru şıkkı görür. Kapı kökü şıklarla
 *   karşılaştırıyor.
 * - **Replik çevirisi ALMANCANIN karşılığı olmalı.** `turn` ve `question`
 *   satırlarının bir Almanca eşi var; İngilizce yeni bir cümle değil, o
 *   repliğin karşılığı. Uzunluk çok saparsa uyarı veriliyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractExam } from "./make";
import { usSpelling } from "../spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t: string) => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t: string) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/** Kaba karşılaştırma: küçük harf, noktalama yok. */
const flat = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();

const src = new Map(extractExam().map((r) => [r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8")) as { tr: string; en: string }[]) {
      const H = (m: string) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m: string) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      if (written.has(r.tr)) H("aynı dize iki pakette");
      const row = src.get(r.tr);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        if (end(r.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(en)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        for (const opt of row.options ?? []) {
          // Tek sözcüklük şıklar (ja/nein, sayılar) doğal olarak geçebilir;
          // ölçüt İKİ sözcükten uzun bir şıkkın olduğu gibi görünmesi.
          const o = flat(opt);
          if (o.split(" ").length > 2 && flat(en).includes(o)) H(`şık kökte görünüyor: «${opt}»`);
        }
        if ((row.kind === "turn" || row.kind === "question") && row.de.length) {
          const de = row.de[0];
          if (en.length > de.length * 2 + 16 || en.length * 2 + 16 < de.length)
            U(`Almancadan uzunluk sapması (${de.length} → ${en.length})`);
        }
        for (const h of usSpelling(en)) U(`Amerikan yazımı ${h}`);
      }
      written.set(r.tr, en);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = extractExam();
  const missing = rows.filter((r) => !written.has(r.tr)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dizenin İngilizcesi yok`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
}
console.log(
  `\nözet: ${written.size} dize · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
