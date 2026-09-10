/**
 * Can-do ifadelerini paketler: `node data/lessons/cando/make.mjs`
 *
 * ÇÖZÜCÜ GÖSTERDİ. Beş hat bittikten ve ders sayfası ana dile bağlandıktan
 * sonra ekranda hâlâ Türkçe kalan bir yer vardı: dersin altındaki "bunu
 * yapabileceksin" köprüsü. `Cando` tipinde yalnız `tr` var (`de` isteğe
 * bağlı, sınav görünümü için) ve bu metin üç yerde okunuyor — ders özeti,
 * Yapabildiklerim ekranı ve sertifika.
 *
 * Kaynak dosyaya (`src/lib/cando.ts`) dokunulmuyor: 131 çağrının hepsine
 * yedinci bir konumsal argüman eklemek okunaksız olurdu ve alan zaten
 * kardeş hatların deseniyle dışarıdan bağlanabiliyor. Anahtar `id`
 * (`A1.SPK.1`) — kısa, kararlı ve kaynakta zaten var.
 *
 * BİRİNCİ TEKİL. Kaynak "…yapabilirim" diyor, yani öğrencinin kendi ağzından.
 * İngilizcesi de "I can …" olmalı; kapı bunu ölçüyor çünkü üçüncü tekile
 * ("The learner can…") kayan bir çeviri ekranın sesini değiştirir.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/cando.ts", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

export function extractCando() {
  const src = readFileSync(SRC, "utf8");
  const rows = [];
  // `c(level, skill, n, tr, source?, de?)` — dize argümanları çift tırnaklı.
  const re =
    /\bc\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*"((?:[^"\\]|\\.)*)"(?:\s*,\s*"((?:[^"\\]|\\.)*)")?(?:\s*,\s*"((?:[^"\\]|\\.)*)")?\s*\)/g;
  for (const m of src.matchAll(re)) {
    const level = m[1];
    const skill = m[2];
    rows.push({
      id: `${level}.${skill}.${m[3]}`,
      level,
      skill,
      tr: JSON.parse(`"${m[4]}"`),
      de: m[6] === undefined ? null : JSON.parse(`"${m[6]}"`),
    });
  }
  return rows;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractCando();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 70;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `c-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const byLevel = rows.reduce((a, r) => ((a[r.level] = (a[r.level] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} ifade · ${n} paket\n` +
      Object.entries(byLevel).map(([k, v]) => `${k} ${v}`).join(" · "),
  );
}
