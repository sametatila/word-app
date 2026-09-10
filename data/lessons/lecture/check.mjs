/**
 * Anlatım çevirilerini denetler: `node data/lessons/lecture/check.mjs [paket|all]`
 *
 * Bu alanın kendine özgü kuralı SON NOKTALAMA. Parçalar arka arkaya
 * SESLİ okunuyor ve aralarına Almanca kelimeler giriyor; son karakter
 * cümlenin nerede bittiğini söylüyor:
 *
 *   «.»  %35,1  bitmiş cümle
 *   «:»  %35,0  ARDINDAN Almanca kelime geliyor
 *   yok  %21,2  cümle Almanca kelimenin İÇİNDEN devam ediyor
 *   «?»   %8,6  soru
 *
 * Sonuncusu en kritiği: Türkçe cümle Almanca kelimeyi SARIYOR —
 * `tr("… Lütfen") de("hallo") tr("deyin.")`. İngilizcede kelime sona
 * gider ama sarma korunabilir: "Please say" + hallo + "after me."
 * Son noktalama eşitliği bu yapıyı ayakta tutan tek ölçüt.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractLecture } from "./make.mjs";
import { usSpelling } from "../spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();
/*
  ANAHTAR (tr, de). Sözlük istemlerinin 33'ü birden çok Almanca kelimeye
  hizmet ediyor ("Türkçesi 'yüz' demek" → hundert VE das Gesicht) ve
  İngilizcede tek karşılık ikisini birden veremez; o satırlar Almanca
  kelimeye göre bölündü. Geri kalan her satırda `de` yok ve anahtar
  yalnız `tr`.
*/
const K = (r) => `${r.tr}\u0000${r.de ?? ""}`;
const src = new Map(extractLecture().map((r) => [K(r), r]));

/** Son noktalama sınıfı; yoksa «—». */
const end = (s) => {
  const c = String(s ?? "").trim().slice(-1);
  return ".!?:…,;".includes(c) ? c : "—";
};

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json")).sort()) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const key = K(r);
      const H = (m) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 40))}${r.de ? ` (${r.de})` : ""} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 40))}${r.de ? ` (${r.de})` : ""} — ${m}`);
      if (written.has(key)) H("aynı dize iki pakette");
      const en = String(r.en ?? "").trim();
      if (!en) H("çeviri boş");
      else {
        if (end(en) !== end(r.tr))
          H(`son noktalama uyuşmuyor: ${"«" + end(r.tr) + "»"} → «${end(en)}»  (${JSON.stringify(en.slice(0, 44))})`);
        // Türkçesi 30 karakterse İngilizcesi 90 olmamalı: sesli okunuyor,
        // uzunluk konuşma süresidir. Eşik geniş — İngilizce doğal olarak
        // biraz uzun, mesele KATLANMASI.
        if (en.length > Math.max(40, r.tr.length * 2)) U(`çok uzamış (${en.length}, Türkçesi ${r.tr.length})`);
        for (const h of usSpelling(en)) U(`Amerikan yazımı ${h}`);
      }
      written.set(key, en);
    }
  }

for (const key of written.keys())
  if (!src.has(key)) errors.push(`  [pakete ait değil] ${JSON.stringify(key.split("\u0000")[0].slice(0, 46))}`);

/*
  AYNI KARŞILIK, AYRI KELİME. Sözlük isteminin İngilizcesi Almanca
  kelimenin karşılığıdır; iki AYRI Türkçe istem aynı İngilizceye düşerse
  öğrenci iki farklı Almanca kelimeyi tek karşılıkla duyar ve ayıramaz.
  Gerçek örnek: 'harf' [der Buchstabe] ve 'mektup' [der Brief] ikisi de
  «letter» yazılmıştı; ilki 'letter of the alphabet' oldu.

  Aynı Türkçe istemin birden çok Almanca kelimeye bölünmüş satırları
  (bilet → Ticket/Fahrschein/Fahrkarte) KUSUR DEĞİL: orada Almancası
  gerçekten eşanlamlı ve Türkçesi de tek kelime. O yüzden ölçüt Türkçenin
  FARKLI olması.

  Anahtar kapının göremediği bir çakışma bu: satırların anahtarı ayrı,
  çakışan şey karşılık.
*/
const glossDe = (r) =>
  r.de ?? ((src.get(K(r))?.ctx ?? []).join(" ").match(/\[([^\]]+)\]/) || [])[1] ?? "?";
const byEn = new Map();
for (const [key, en] of written) {
  const tr = key.split("\u0000")[0];
  if (!/demek(\.| —|$)/.test(tr)) continue;
  const k = en.toLowerCase();
  (byEn.get(k) ?? byEn.set(k, []).get(k)).push({ tr, de: key.split("\u0000")[1] });
}
for (const [en, group] of byEn) {
  if (group.length < 2) continue;
  if (new Set(group.map((g) => g.tr)).size < 2) continue;
  const shown = group.map((g) => `${JSON.stringify(g.tr.slice(0, 34))}${g.de ? ` (${g.de})` : ""}`);
  warnings.push(`  [aynı karşılık] «${en}» — ayrı istemler: ${shown.join(" / ")}`);
}

let coverage = null;
if (ARG === "all") {
  const rows = [...src.values()];
  const missing = rows.filter((r) => !written.has(K(r)));
  const doneSeg = rows.filter((r) => written.has(K(r))).reduce((a, r) => a + r.n, 0);
  const allSeg = rows.reduce((a, r) => a + r.n, 0);
  coverage = { rows: rows.length, missing: missing.length, doneSeg, allSeg };
  if (missing.length) errors.push(`  [kapsam] ${missing.length} dizenin İngilizcesi yok`);
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
    (coverage
      ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows} dize · ` +
        `${coverage.doneSeg}/${coverage.allSeg} parça (%${((coverage.doneSeg / coverage.allSeg) * 100).toFixed(1)})`
      : ""),
);
process.exit(errors.length ? 1 : 0);
