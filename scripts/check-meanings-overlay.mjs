/**
 * `data/meanings/out` katmanı `data/app/words.json` ile AYNI mı: `npm run check:meanings-overlay`
 *
 * NEDEN: seed (`scripts/seed.ts`) her kelimede `out`taki tr/en/beispiel/beispielTr/beispielEn'i words.json'ın
 * ÜSTÜNE yazıyor ve yorumu "ikisi aynı, sonucu değiştirmez" diyordu. 2026-09-28'de iki toplu düzeltme
 * (c9b13221c, d82d982f3) words.json'a doğru yazdı ama `out`ta başka kelimelerin değerlerini yanlış maddelere
 * koydu; canlıda A1 çekirdeği bozuk göründü (sein "yer almak", Treppe "bekleme süresi", Pass "uymak").
 * 559 alan ayrışmıştı, kimse görmedi. Bu kapı ayrışmayı push'ta durdurur: düzeltme iki dosyaya birlikte
 * yazılır (`data/meanings/qa/apply.py` böyle yapıyor) ya da hiç.
 */
import { readFileSync, readdirSync } from "node:fs";

const ROOT = new URL("..", import.meta.url).pathname;
const FIELDS = ["tr", "en", "beispiel", "beispielTr", "beispielEn"];
const words = new Map(JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8")).map((w) => [w.id, w]));
const dir = `${ROOT}data/meanings/out`;

const bad = [];
const seen = new Map();
for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
  for (const x of JSON.parse(readFileSync(`${dir}/${f}`, "utf8"))) {
    if (seen.has(x.id)) bad.push(`${f}: ${x.id} ikinci kez (önce ${seen.get(x.id)})`);
    seen.set(x.id, f);
    const w = words.get(x.id);
    if (!w) { bad.push(`${f}: ${x.id} words.json'da yok`); continue; }
    for (const k of FIELDS) {
      if (x[k] !== undefined && x[k] !== w[k]) bad.push(`${f}: ${x.id} ${w.de} ${k}: out «${x[k]}» ≠ words.json «${w[k]}»`);
    }
  }
}
if (bad.length) {
  console.error(`✗ ${bad.length} ayrışma (seed out'u kazandırır, canlıya o gider):\n  ${bad.slice(0, 30).join("\n  ")}`);
  process.exit(1);
}
console.log(`tamam: ${seen.size} madde, out = words.json`);
