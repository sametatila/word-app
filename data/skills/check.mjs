/**
 * Beceri sözlükçesi paketlerini denetler: `node data/skills/check.mjs de-001`
 *
 * Argüman bir paket adı, bir kurs öneki (`de`, `zh`) ya da `all` olabilir.
 *
 * Kelime hattındaki denetleyicinin kardeşi ama iki farkla:
 *
 *   - Burada "cümle kelimeyi içeriyor mu" yerine "**metin** kelimeyi içeriyor
 *     mu" sorusu var ve metin bir paragraf. Aynı `contains` mantığı yeniden
 *     yazılmıyor, kelime hattındaki denetleyiciden içe aktarılıyor: iki kopya
 *     olsaydı biri diğerinden sapar ve hangisinin doğru olduğu belli olmazdı.
 *   - Havuzla çelişki **hata değil uyarı**. Sözlükçenin işi metindeki anlamı
 *     vermek; alışveriş ilanındaki `das Angebot` havuzdaki "teklif" değil
 *     "indirim"dir. Çelişki bilinçli olabilir, o yüzden gösteriliyor ama
 *     durdurmuyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { contains } from "../meanings/contains.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();
const IN = `${ROOT}data/skills/in`;
const OUT = `${ROOT}data/skills/out`;

const TR_LETTER = /[ıİğĞşŞ]/;

/**
 * Madde bir **şablon** mu?
 *
 * Şablonlarda ("mein Sohn / meine Tochter …", "Sehr geehrte Frau …,") çeviri
 * Almancadaki çizgiyi, üç noktayı ve virgülü yansıtır; orada virgül çok
 * anlamlılık işareti değil. Aynı maddeler metinde de birebir geçmez, parça
 * parça geçer.
 *
 * Ölçüt Almanca başlığın **kendi** noktalaması. Önce "boşluk varsa şablondur"
 * denmişti ve bu artikelli her ismi ("die Wohnung") kapsıyordu — yani
 * sözlükçenin çoğunda iki denetim birden sessizce kapalıydı. Pilot paketi
 * üreten ajan fark etti.
 */
const isTemplate = (de) => /[…/,]/.test(de);

function inspect(packet) {
  const src = JSON.parse(readFileSync(`${IN}/${packet}.json`, "utf8"));
  const errors = [];
  const warnings = [];
  if (!existsSync(`${OUT}/${packet}.json`)) return { packet, absent: true, errors, warnings };

  let out;
  try {
    out = JSON.parse(readFileSync(`${OUT}/${packet}.json`, "utf8"));
  } catch (e) {
    return { packet, errors: [`  [bozuk json] ${e.message}`], warnings, fields: 0 };
  }
  if (!Array.isArray(out)) return { packet, errors: ["  [bozuk json] dizi değil"], warnings, fields: 0 };

  const byId = new Map(out.map((r) => [r.id, r]));
  const missing = src.exercises.filter((e) => !byId.has(e.id)).map((e) => e.id);
  if (missing.length) errors.push(`  [eksik egzersiz] ${missing.join(", ")}`);
  const extra = out.map((r) => r.id).filter((id) => !src.exercises.some((e) => e.id === id));
  if (extra.length) errors.push(`  [pakete ait olmayan] ${extra.join(", ")}`);

  let fields = 0;
  for (const e of src.exercises) {
    const r = byId.get(e.id);
    if (!r) continue;
    const H = (label, message) => errors.push(`  [${label}] ${e.id} — ${message}`);
    const U = (label, message) => warnings.push(`  [${label}] ${e.id} — ${message}`);

    for (const fieldName of ["gloss", "phrases", "targets", "tasks"]) {
      const source = e[fieldName];
      if (!source?.length) continue;
      const produced = r[fieldName];
      if (!Array.isArray(produced) || produced.length !== source.length) {
        H("eksik alan", `${fieldName}: ${source.length} beklendi, ${produced?.length ?? 0} geldi`);
        continue;
      }

      for (let i = 0; i < source.length; i++) {
        const k = source[i];
        const u = produced[i];
        fields++;
        if (u?.de !== k.de) {
          H("başlık değişmiş", `${fieldName}[${i}]: "${k.de}" → "${u?.de}"`);
          continue;
        }
        const tr = (u.tr ?? "").trim();
        const en = (u.en ?? "").trim();
        if (!tr) H("boş tr", `${k.de}`);
        if (!en) H("boş en", `${k.de}`);
        if (TR_LETTER.test(en)) H("dil karışması", `${k.de}: en alanında Türkçe harf "${en}"`);
        if (/[()[\]]/.test(tr)) H("parantezli tr", `${k.de} → "${tr}" — açıklama note, HD biçimi hd alanına`);
        if (/[()[\]]/.test(en)) H("parantezli en", `${k.de} → "${en}"`);

        // Cümle çevirilerinde tek karşılık kuralı geçmez; kelime ve
        // kalıplarda geçer, ama kalıbın kendi içinde çizgi olabilir.
        if (fieldName !== "tasks" && !isTemplate(k.de)) {
          if (/,/.test(tr)) H("çok anlamlı tr", `${k.de} → "${tr}"`);
          if (/,/.test(en)) H("çok anlamlı en", `${k.de} → "${en}"`);
        }

        // Havuzla çelişki: hata değil, bilinçli olabilir.
        if (k.pool && tr.toLocaleLowerCase("tr-TR") !== k.pool.tr.toLocaleLowerCase("tr-TR"))
          U("havuzdan farklı", `${k.de}: "${tr}" ↔ havuz "${k.pool.tr}"`);

        if (u.hd && src.course !== "gsw-zh") U("gereksiz hd", `${k.de}: hd yalnızca Züritüütsch'te`);
        if (u.note && u.note.length > 90) U("uzun note", `${k.de}: ${u.note.length} karakter`);
      }
    }

    // Sözlükçe kelimesi metinde gerçekten geçiyor mu?
    if (e.text) {
      for (const g of e.gloss ?? []) {
        if (isTemplate(g.de)) continue; // şablonlar metinde parça parça geçer
        if (!contains(e.text, g.de)) U("metinde yok", `"${g.de}" egzersiz metninde bulunamadı`);
      }
    }
  }

  return { packet, errors, warnings, fields };
}

const all = readdirSync(IN)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();
const selected = ARG === "all" ? all : all.filter((p) => p === ARG || p.startsWith(`${ARG}-`));
if (!selected.length) {
  console.error(`"${ARG}" ile eşleşen paket yok.`);
  process.exit(1);
}

let errorCount = 0;
let warningCount = 0;
let pending = 0;
let fields = 0;
for (const p of selected) {
  const r = inspect(p);
  if (r.absent) {
    pending++;
    if (selected.length === 1) console.log(`${p}: çıktı yok`);
    continue;
  }
  errorCount += r.errors.length;
  warningCount += r.warnings.length;
  fields += r.fields;
  if (r.errors.length || r.warnings.length) {
    console.log(`\n${p}  (${r.fields} alan)`);
    r.errors.forEach((h) => console.log(h));
    r.warnings.slice(0, 25).forEach((u) => console.log(u));
    if (r.warnings.length > 25) console.log(`  … ve ${r.warnings.length - 25} uyarı daha`);
  } else if (selected.length === 1) {
    console.log(`${p}: ${r.fields} alan, temiz.`);
  }
}

console.log(
  `\nözet: ${selected.length - pending}/${selected.length} paket üretilmiş, ${fields} alan · ${errorCount} hata · ${warningCount} uyarı`,
);
process.exit(errorCount ? 1 : 0);
