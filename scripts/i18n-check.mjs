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
 *   3. Kodda ÇAĞRILAN her anahtar sözlükte VAR. `translate` bulamadığı
 *      anahtarın kendisini döndürüyor, yani ekrana "socialw.load_failed"
 *      yazıyor — hata değil, sessiz bir arıza. İki anahtar tam da böyle
 *      kaçmıştı; denetim şimdi onu tutuyor.
 *
 * `src/i18n/base/*` mobilden üretiliyor (scripts/i18n-pull.mjs), `web/*` elle
 * yazılıyor; ikisi de denetleniyor.
 */
import { readFileSync, readdirSync } from "node:fs";

const LANGS = ["tr", "en", "de"];

const dupes = [];

function load(dir, lang) {
  const src = readFileSync(new URL(`../src/i18n/${dir}/${lang}.ts`, import.meta.url), "utf8");
  const out = new Map();
  // Anahtar satırları: `  "key": "value",` — çok satırlı değer yok.
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) {
    /*
      AYNI ANAHTAR İKİ KEZ: TypeScript bunu hata sayıyor ama denetim saymıyordu
      — Map ikincisini yazıyor ve ilki sessizce ölüyor. Aynı anahtarın iki
      farklı değeri olsaydı hangisinin kazandığı dosyadaki SIRAYA kalırdı.
    */
    if (out.has(m[1])) dupes.push(`${dir}/${lang}: "${m[1]}"`);
    out.set(m[1], m[2]);
  }
  return out;
}

/** Mobil KAYNAK sözlüğü — `base/*` bundan üretiliyor. */
function loadMobile(lang) {
  const src = readFileSync(new URL(`../mobile/src/i18n/${lang}.ts`, import.meta.url), "utf8");
  const out = new Map();
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) out.set(m[1], m[2]);
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

/*
  Kodda çağrılan anahtarlar. Yalnız DÜZ metin anahtarlar taranıyor:
  `t("a.b")`, `tx("a.b")`, `translate(lang, "a.b")`. Değişkenden gelen
  anahtarlar (`t(KEYS[kind])`) burada görünmüyor ve görünmemeli — statik
  olarak çözülemezler; onların güvencesi TypeScript'teki anahtar haritaları.
*/
const KEY_CALL = /\b(?:t|tx|tt|translate)\(\s*(?:[A-Za-z_$][\w$]*\s*,\s*)?"([a-z][\w]*(?:\.[\w]+)+)"/g;

const known = new Set();
for (const dir of ["base", "web"]) for (const k of load(dir, "tr").keys()) known.add(k);

const roots = ["src"];
const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(e.name) && !full.includes("/i18n/")) files.push(full);
  }
};
for (const r of roots) walk(new URL(`../${r}`, import.meta.url).pathname);

const missingUse = new Map();
for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const m of src.matchAll(KEY_CALL)) {
    if (!known.has(m[1])) {
      const rel = file.slice(file.indexOf("/src/") + 1);
      if (!missingUse.has(m[1])) missingUse.set(m[1], rel);
    }
  }
}
/*
  4. `base/*` GERÇEKTEN mobilden üretilmiş mi.

  Köprü (`scripts/i18n-pull.mjs`) ELLE çalıştırılıyor. Mobil sözlükte bir cümle
  değişip pull unutulursa - ya da `base/*` elle düzenlenirse - web ile Android
  aynı anahtarda AYRI cümle gösterir ve hiçbir denetim bunu söylemez. Üç içerik
  köprüsünün aynı sınıfı `npm run check:dumps` ile kapandı; bu, dördüncüsü.

  Karşılaştırma değere kadar: pull birebir kopyalıyor (ölçüldü, 1158 anahtar ×
  3 dil, sıfır fark), yani katı eşitlik doğru ölçüt. `web/*` elle yazılıyor ve
  bu denetimin dışında - orası zaten web'e özel.
*/
for (const lang of LANGS) {
  const base = load("base", lang);
  const mob = loadMobile(lang);
  const onlyBase = [...base.keys()].filter((k) => !mob.has(k));
  const onlyMob = [...mob.keys()].filter((k) => !base.has(k));
  const differs = [...base.keys()].filter((k) => mob.has(k) && mob.get(k) !== base.get(k));
  if (onlyBase.length || onlyMob.length || differs.length) {
    bad++;
    console.error(`✗ base/${lang} mobil kaynakla aynı değil (npm çalıştır: node scripts/i18n-pull.mjs)`);
    if (onlyMob.length) console.error(`   tabanda EKSİK (${onlyMob.length}): ${onlyMob.slice(0, 6).join(", ")}`);
    if (onlyBase.length) console.error(`   tabanda FAZLA (${onlyBase.length}): ${onlyBase.slice(0, 6).join(", ")}`);
    if (differs.length) console.error(`   DEĞERİ FARKLI (${differs.length}): ${differs.slice(0, 6).join(", ")}`);
  }
}
if (!bad) console.log(`base: mobil kaynakla birebir (${load("base", "tr").size} anahtar × ${LANGS.length} dil)`);

if (dupes.length) {
  bad += dupes.length;
  for (const d of dupes) console.error(`yinelenen anahtar → ${d}`);
}

if (missingUse.size) {
  bad += missingUse.size;
  for (const [k, file] of missingUse) console.error(`kod: "${k}" sözlükte yok — ${file}`);
}
console.log(`kod: ${files.length} dosyada çağrılan anahtarlar denetlendi`);

if (bad) { console.error(`\n${bad} sorun bulundu.`); process.exit(1); }
console.log("Sözlükler tutarlı.");
