/**
 * Ders kalıplarını paketler: `node data/lessons/patterns/make.mjs`
 *
 * Sözlükçeden farkı TÜRETME OLMAMASI. `vocab` girdisi bir kelimedir ve kelime
 * havuzunda karşılığı bulunabiliyordu (%84,6'sı güvenle alındı). `patterns`
 * girdisi ise tam bir cümle kalıbı ("Ich möchte …") ve havuzda karşılığı yok —
 * ölçüldü: 1.292 kalıbın 4'ü eşleşiyor (%0,3). O yüzden triyaj yok, hepsi
 * elle.
 *
 * İkinci fark: `PatternItem.tr` bir KARŞILIK değil, kalıbın NE İŞE YARADIĞI
 * ("bir şey isterken kullanılır"). İngilizcesi de öyle yazılmalı — kalıbın
 * çevirisi değil, kullanım notu.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { extractVocab } from "../vocab/extract.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const rows = extractVocab("patterns");

mkdirSync(`${DIR}in`, { recursive: true });
mkdirSync(`${DIR}out`, { recursive: true });

const SIZE = 50;
let n = 0;
for (let i = 0; i < rows.length; i += SIZE) {
  n++;
  const name = `p-${String(n).padStart(3, "0")}`;
  writeFileSync(
    `${DIR}in/${name}.json`,
    `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
  );
}
console.log(`${rows.length} kalıp · ${n} paket`);
