/**
 * Beceri düz metninin İngilizcesini denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/prose/check.ts [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; ikisi bu alana özgü:
 *
 * - **Açıklama şıkkı ELE VERMEMELİ.** `explain` cevaptan SONRA gösteriliyor,
 *   yani doğru şıkkı söylemesi sorun değil — ama Almanca şıkkı olduğu gibi
 *   içine almak başka bir şey: öğrenci Almancayı okumadan da doğruyu
 *   görür. Kapı, doğru şıkkın iki kelimeden uzun hâlinin İngilizce
 *   açıklamada birebir geçmesini ölçüyor.
 * - **`intro` yönerge, cümle değil.** Egzersizin başındaki çerçeve
 *   öğrenciye ne yapacağını söylüyor; Türkçesi nokta ile bitmiyorsa
 *   İngilizcesi de bitmemeli — son noktalama pariteleri bunu zaten
 *   ölçüyor, burada ayrıca uzunluk sapması uyarı veriyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { proseWork } from "./make.js";
import { usSpelling } from "../../lessons/spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t: string): string => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t: string): string[] =>
  [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/** Karşılaştırma için sadeleştirme — tırnak ve boşluk çeşitleri eşitlenir. */
const flat = (t: string): string =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\s+/g, " ").trim();

/* Kapsam ALINTILARI SAYMIYOR: onların karşılığı kendileri ve sözlüğe
   `apply` adımında birim eşleme olarak giriyor. Pakete hiç girmedikleri
   için burada da beklenmiyorlar. */
const src = new Map(proseWork().map((r) => [r.kind + "|" + r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8")) as {
      tr: string;
      kind: string;
      en?: string;
    }[]) {
      const key = r.kind + "|" + r.tr;
      const H = (m: string) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m: string) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      if (written.has(key)) H("aynı dize iki pakette");
      const row = src.get(key);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        if (end(r.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(en)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        if (row.kind === "explain" && row.a) {
          const o = flat(row.a);
          if (o.split(" ").length > 2 && flat(en).includes(o)) H(`doğru şık kökte görünüyor: «${row.a}»`);
        }
        if (en.length > r.tr.length * 2 + 20 || en.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${en.length})`);
        for (const h of usSpelling(en)) U(`Amerikan yazımı ${h}`);
      }
      written.set(key, en);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = proseWork();
  const missing = rows.filter((r) => !written.has(r.kind + "|" + r.tr)).length;
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
