/**
 * Rol yapma alanlarını paketler: `node data/lessons/roleplay/make.mjs`
 *
 * Plan bu kalemi "scene + goal = 1.160 dize" diye yazmıştı; SAYILDI, dört
 * Türkçe alan var ve toplam 2.320:
 *
 *   scene      580   ort. 150 karakter   öğrenciye verilen görev
 *   partner    580   ort.  51            karşıdakinin kim olduğu (ÖBEK, cümle değil)
 *   openingTr  580   ort.  62            Almanca `opening`in çevirisi
 *   goal       580   ort.  93            başarı koşulu
 *
 * `opening` Almanca — hedef dil, çevrilmez. `minTurns` sayı.
 *
 * Dört alan AYNI pakette duruyor çünkü birbirine bağlı: `goal` sahnede
 * verilen görevin tamamlanmış hâli, `openingTr` ise partnerin ağzından
 * çıkan ilk cümle. Ayrı paketlense biri ötekine bakmadan yazılırdı.
 *
 * Paket 25 ders = 100 dize; meta hattındaki ritmin aynısı.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/lessons/content/", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

export function extractRoleplay() {
  const rows = [];
  for (const f of readdirSync(SRC).filter((x) => /^de-.*\.ts$/.test(x)).sort()) {
    const src = readFileSync(`${SRC}${f}`, "utf8");
    // Konum sırası şart: `id` dersi açar, sonraki roleplay bloğu ona aittir.
    let lesson = null;
    for (const m of src.matchAll(/id:\s*"(de-[^"]+)"|roleplay:\s*\{([\s\S]*?)\n    \}/g)) {
      if (m[1] !== undefined) {
        lesson = m[1];
        continue;
      }
      const b = m[2];
      const pick = (k) => {
        // `opening:` ile `openingTr:` karışmaz — ikincisinde iki nokta "T"den sonra.
        const mm = b.match(new RegExp(`\\b${k}:\\s*(?:\\n\\s*)?"((?:[^"\\\\]|\\\\.)*)"`));
        return mm ? JSON.parse(`"${mm[1]}"`) : "";
      };
      rows.push({
        lesson,
        file: f,
        scene: pick("scene"),
        partner: pick("partner"),
        opening: pick("opening"),
        openingTr: pick("openingTr"),
        goal: pick("goal"),
      });
    }
  }
  return rows;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractRoleplay();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 25;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `r-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const miss = rows.filter((r) => !r.scene || !r.partner || !r.opening || !r.openingTr || !r.goal);
  console.log(`${rows.length} ders · ${n} paket · eksik alanlı ders: ${miss.length}`);
  for (const r of miss.slice(0, 5)) console.log(`  ${r.lesson}`);
}
