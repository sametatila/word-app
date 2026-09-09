/**
 * Sözlük denetimi — `npm run i18n:check`.
 *
 * İki şeyi doğruluyor:
 *
 *   1. Üç dilin ANAHTAR KÜMESİ birebir aynı. Eksik anahtar sessizce Türkçeye
 *      düşüyor (bkz. lib/i18n/dict `translate`) ve bu, İngilizce arayüzde
 *      Türkçe bir cümle demek — eksik çeviriden kötü, çünkü fark edilmiyor.
 *   2. Aynı anahtarın YER TUTUCULARI üç dilde aynı. `{n}` bir dilde varken
 *      ötekinde yoksa cümle sayıyı hiç göstermiyor ya da `{n}` yazısını
 *      ekrana basıyor.
 *
 * `src/i18n/base/*` mobilden üretiliyor (scripts/i18n-pull.mjs), `web/*` elle
 * yazılıyor; ikisi de denetleniyor.
 */
import { readFileSync } from "node:fs";

const LANGS = ["tr", "en", "de"];

function load(dir, lang) {
  const src = readFileSync(new URL(`../src/i18n/${dir}/${lang}.ts`, import.meta.url), "utf8");
  const out = new Map();
  // Anahtar satırları: `  "key": "value",` — çok satırlı değer yok.
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) {
    out.set(m[1], m[2]);
  }
  return out;
}

const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

let bad = 0;
for (const dir of ["base", "web"]) {
  const dicts = Object.fromEntries(LANGS.map((l) => [l, load(dir, l)]));
  const ref = dicts.tr;
  for (const lang of LANGS.slice(1)) {
    const missing = [...ref.keys()].filter((k) => !dicts[lang].has(k));
    const extra = [...dicts[lang].keys()].filter((k) => !ref.has(k));
    if (missing.length) { bad++; console.error(`${dir}/${lang}: ${missing.length} eksik anahtar → ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? " …" : ""}`); }
    if (extra.length) { bad++; console.error(`${dir}/${lang}: ${extra.length} fazla anahtar → ${extra.slice(0, 5).join(", ")}${extra.length > 5 ? " …" : ""}`); }
    for (const [k, v] of ref) {
      const other = dicts[lang].get(k);
      if (other === undefined) continue;
      if (placeholders(v) !== placeholders(other)) {
        bad++;
        console.error(`${dir}/${lang}: "${k}" yer tutucuları uyuşmuyor — tr {${placeholders(v)}} / ${lang} {${placeholders(other)}}`);
      }
    }
  }
  console.log(`${dir}: ${ref.size} anahtar × ${LANGS.length} dil`);
}

if (bad) { console.error(`\n${bad} sorun bulundu.`); process.exit(1); }
console.log("Sözlükler tutarlı.");
