/**
 * Ders sözlükçesinin İngilizce karşılıklarını denetler:
 *   `node data/lessons/vocab/check.mjs [paket|all]`
 *
 * Ayrım en→de hattındaki gibi: `hata` üretimi durdurur, `uyarı` durdurmaz.
 *
 * KAPSAM AYRI BİR SORU. Paket denetimi yazılanın geçerliliğine bakar; kapsam
 * ise "4.640 girdinin hepsi bir karşılık alıyor mu"ya. Yol ya da anahtar
 * yanlış olsa paketler yine temiz görünür ve hiçbir karşılık yüklenmezdi —
 * bu, en→de hattında bir kez yaşanan boş commit'in aynı sınıfı.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractVocab } from "./extract.mjs";

const ROOT = new URL("../../../", import.meta.url).pathname;
const DIR = `${ROOT}data/lessons/vocab`;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];

// Elle yazılanlar
const written = new Map();
if (existsSync(`${DIR}/out`))
  for (const f of readdirSync(`${DIR}/out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}/out/${f}`, "utf8"))) {
      const key = `${r.lesson} ${r.de}`;
      const H = (m) => errors.push(`  [${packet}] ${r.lesson} «${r.de}» — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${r.lesson} «${r.de}» — ${m}`);
      if (written.has(key)) H("aynı madde iki pakette");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      /*
        Almanca başlığın aynısı olan karşılık: gsw hattında bu bir kusurdu
        (başlıkların %26,6'sı Almanca kaynağının aynısıydı ve kart hiçbir şey
        öğretmiyordu) ama BURADA DEĞİL — HATA olarak yazmıştım, kapı ilk
        gerçek örnekte «regional» → "regional"ı reddetti ve yanlış reddetti.

        Fark öğrencide: gsw'de öğrenci Almancayı zaten biliyordu, burada
        bilmiyor. Almanca `regional` ile İngilizce "regional"ın aynı olması
        öğretilecek bir bilgi — akraba kelime. Kural uyarıya indi; gerçek
        kopya (kelimenin hiç çevrilmemiş olması) yine göze çarpar ama doğru
        bir karşılığı engellemez.
      */
      else if (en.toLowerCase() === r.de.toLowerCase()) U("karşılık Almancanın aynısı (akraba kelime olabilir)");
      else if (/^[a-z]$/i.test(en)) H(`karşılık tek harf: «${en}»`);
      else if (en.length > 60) U(`karşılık uzun (${en.length})`);
      written.set(key, en);
    }
  }

/*
  PAKETE AİT OLMAYAN MADDE.

  Paket dosyası `lesson` alanını zaten taşıyor, ama ilk yazımda onu
  kopyalamak yerine Almanca kelimeden tahmin ettim ve elli maddenin
  otuz altısı tutmadı. Kapsam sayısı düştüğü için fark edildi — ama kapsam
  yalnız "eksik" diyor, hangi satırın yanlış olduğunu söylemiyor.

  Bu blok onu söylüyor: yazılan `(lesson, de)` çifti içerikte gerçekten var mı.
  `zurich/beispiel/apply.mjs`teki "pakete ait olmayan id" denetiminin aynısı.
*/
const real = new Set(extractVocab().map((r) => `${r.lesson} ${r.de}`));
for (const key of written.keys())
  if (!real.has(key)) errors.push(`  [pakete ait değil] ${key}`);

// Kapsam yalnız bütün denetimde anlamlı: tek pakete bakarken sorusu yok.
let coverage = null;
if (ARG === "all") {
  const norm = (s) => String(s).toLowerCase().replace(/^(der|die|das)\s+/, "").trim();
  const pool = new Map();
  for (const r of JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8")))
    if (r.de && r.en) pool.set(norm(r.de), { tr: r.tr, en: r.en });

  let rows = 0;
  let derived = 0;
  let hand = 0;
  let missing = 0;
  for (const r of extractVocab()) {
    rows++;
    const w = pool.get(norm(r.de));
    const agree = w && String(w.tr ?? "").toLowerCase().trim() === r.tr.toLowerCase().trim();
    if (agree) derived++;
    else if (written.has(`${r.lesson} ${r.de}`)) hand++;
    else missing++;
  }
  coverage = { rows, derived, hand, missing };
  if (missing) errors.push(`  [kapsam] ${missing} girdinin İngilizce karşılığı yok`);
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
  `\nözet: ${written.size} elle yazılmış karşılık · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage
      ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows} ` +
        `(${coverage.derived} türetilen + ${coverage.hand} elle)`
      : ""),
);
process.exit(errors.length ? 1 : 0);
