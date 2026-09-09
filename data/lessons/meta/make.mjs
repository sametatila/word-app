/**
 * Ders başlığı ve özetini paketler: `node data/lessons/meta/make.mjs`
 *
 * Sözlükçe ve kalıptan yapı olarak farkı: burada blok yok. Her dersin
 * TEK bir `titleTr` ve TEK bir `summary` alanı var, ikisi de Türkçe.
 * Almanca `title` çevrilmez — o zaten hedef dil ("Hallo!").
 *
 * Bir satır bir ders taşıyor, iki alanla birden. Ayrı paketlemek ikisini
 * ayrı turlarda yazdırırdı ve özet başlığa bakmadan yazılamaz: başlık
 * "Tanışma" ise özet onun ne öğrettiğini söylüyor.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";

const SRC = new URL("../../../src/lib/lessons/content/", import.meta.url).pathname;
const DIR = new URL(".", import.meta.url).pathname;

export function extractMeta() {
  const rows = [];
  for (const f of readdirSync(SRC).filter((x) => x.endsWith(".ts")).sort()) {
    const src = readFileSync(`${SRC}${f}`, "utf8");
    // Tek taramada, konum sırasıyla: id bir dersi açar, sonraki title/titleTr/
    // summary ona aittir. Ayrı ayrı toplansaydı eşleşme kaybolurdu.
    let cur = null;
    const re = /^\s*id:\s*"([^"]+)"|^\s*title:\s*"([^"]*)"|^\s*titleTr:\s*"([^"]*)"|^\s*summary:\s*"([^"]*)"/gm;
    for (const m of src.matchAll(re)) {
      if (m[1] !== undefined) {
        cur = { lesson: m[1], title: "", titleTr: "", summary: "" };
        rows.push(cur);
      } else if (cur) {
        if (m[2] !== undefined) cur.title = m[2];
        else if (m[3] !== undefined) cur.titleTr = m[3];
        else if (m[4] !== undefined) cur.summary = m[4];
      }
    }
  }
  // `id` alanı derste olduğu gibi egzersizde ve soruda da geçebiliyor; yalnız
  // başlığı VE özeti dolu olanlar ders sayılıyor.
  return rows.filter((r) => r.titleTr && r.summary);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = extractMeta();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 50;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `m-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  console.log(`${rows.length} ders · ${n} paket`);
}
