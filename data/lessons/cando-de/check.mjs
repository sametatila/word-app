/**
 * Can-do ifadelerinin Almancasını denetler:
 *   `node data/lessons/cando-de/check.mjs [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; üçü bu alana özgü:
 *
 * - **Birinci tekil korunur.** Kaynak "…yapabilirim" diyor, öğrencinin kendi
 *   ağzından. "Ich kann …" dışına çıkan bir çeviri ("Der Lernende kann…",
 *   "Fähigkeit, … zu …") ekranın sesini değiştirir.
 * - **İki ifade tek karşılığa düşemez.** 131 ifadenin tamamı AYRI bir
 *   yeterlik; ikisi aynı Almancaya düşerse ekranda tekrar görünür ve
 *   aradaki fark kaybolur. Kardeş kapının aynı kuralı, aynı gerekçeyle.
 * - **Karakter kümesi.** Türkçeye özgü harfler kümenin dışında: kalan bir
 *   `ş` çevrilmemiş metin demek. Bu hatta ÖZEL AD GEVŞETMESİ YOK — ders
 *   düzyazısının tersine can-do ifadelerinde ad geçmiyor, hepsi
 *   "…yapabilirim" biçiminde genel yeterlik.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractCando } from "../cando/make.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const written = new Map();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t) => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/** Kardeş Almanca kapılarının kümesi. */
const CHARSET = /[\n -~ÄÖÜäöüßé·×‚„“”‘’«»–—…→↔€]/;
const TURKISH_LETTER = /[çğıöşüÇĞİÖŞÜ]/;

const src = new Map(extractCando().map((r) => [r.id, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${r.id} — ${m}`);
      if (written.has(r.id)) H("aynı ifade iki pakette");
      const row = src.get(r.id);
      if (!row) H("pakete ait değil");
      const de = String(r.de ?? "").trim();
      if (!de) H("karşılık boş");
      else if (row) {
        if (end(row.tr) !== end(de)) H(`son noktalama uyuşmuyor: «${end(row.tr)}» → «${end(de)}»`);
        const a = numbers(row.tr).join(","), b = numbers(de).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        if (!/^Ich kann\b/.test(de)) H(`birinci tekil değil: «${de.slice(0, 46)}»`);
        for (const ch of de)
          if (!CHARSET.test(ch))
            H(`beklenmedik karakter: «${ch}» (U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")})`);
        if (de === row.tr && TURKISH_LETTER.test(row.tr)) H("karşılık Türkçenin aynısı");
      }
      written.set(r.id, de);
    }
  }

const byDe = new Map();
for (const [id, de] of written) {
  const k = de.toLowerCase();
  (byDe.get(k) ?? byDe.set(k, []).get(k)).push(id);
}
for (const [de, g] of byDe)
  if (g.length > 1) errors.push(`  [aynı karşılık] «${de.slice(0, 50)}» — ${g.join(" / ")}`);

let coverage = null;
if (ARG === "all") {
  const rows = extractCando();
  const missing = rows.filter((r) => !written.has(r.id)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} ifadenin Almancası yok`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
console.log(
  `\nözet: ${written.size} ifade · ${errors.length} hata` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
