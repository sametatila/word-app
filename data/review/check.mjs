/**
 * Ajan önerilerini merkezî olarak denetler: `node data/review/check.mjs a2`
 *
 * Ajanların çıktısı doğrudan uygulanmaz. A1'de öğrenilen üç şey var:
 *  - Ajan bazen çakışma iddiasını uydurur ("Student de öğrenci diyor", oysa
 *    "üniversite öğrencisi" yazıyordu). Bu yüzden `sameMeaning` dayanağı olan
 *    öneriler ayrı işaretleniyor.
 *  - Ajan bozuk bir başlığı düzeltmeyi önerir, oysa temiz hâli zaten başka bir
 *    madde olarak durur; uygulamak ikinci bir kopya yaratır.
 *  - Bir çakışmanın yalnızca bir tarafını düzeltmek çakışmayı çözer, ama iki
 *    tarafı da düzeltilmişse ikisinin de ayırt edici taşıdığından emin olmak
 *    gerekir.
 *
 * Betik karar vermez, karar verilecek yerleri gösterir.
 */
import { readFileSync, readdirSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const SLUG = (process.argv[2] || "").toLowerCase();
if (!SLUG) throw new Error("kullanım: check.mjs <seviye-slug>");

const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));
const byId = new Map(words.map((w) => [w.id, w]));

const dir = `${ROOT}data/review`;
const packets = new Map();
for (const f of readdirSync(dir).filter((f) => f.startsWith(`${SLUG}-`) && f.endsWith(".json")))
  for (const row of JSON.parse(readFileSync(`${dir}/${f}`, "utf8"))) packets.set(row.id, row);

const props = [];
for (const f of readdirSync(`${dir}/out`).filter((f) => f.startsWith(`${SLUG}-`))) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(`${dir}/out/${f}`, "utf8"));
  } catch (e) {
    console.log(`!! ${f} geçerli JSON değil: ${e.message}`);
    continue;
  }
  for (const p of parsed) props.push({ ...p, _file: f });
}

console.log(`${SLUG.toUpperCase()}: ${packets.size} madde incelendi, ${props.length} öneri geldi.\n`);

const seen = new Set();
const warn = (label, line) => console.log(`  [${label}] ${line}`);

// Önerilen yeni Türkçe karşılıkların kendi aralarında ve havuzla çakışması.
const newTr = new Map();
for (const p of props) if (p.tr) newTr.set(p.id, p.tr.trim().toLowerCase());

console.log("── denetim ──");
for (const p of props) {
  const src = packets.get(p.id);
  if (!src) {
    warn("bilinmeyen id", `${p.id} (${p._file}) — bu paketin maddesi değil`);
    continue;
  }
  if (seen.has(p.id)) warn("çift öneri", `${p.id} ${src.de} iki ajandan birden geldi`);
  seen.add(p.id);
  if (!p.reason) warn("gerekçesiz", `${p.id} ${src.de}`);
  if (!p.tr && !p.deCorrection && !p.duplicate) warn("boş öneri", `${p.id} ${src.de}`);
  if (p.tr && p.tr.trim() === src.tr.trim()) warn("değişiklik yok", `${p.id} ${src.de} — öneri mevcut karşılıkla aynı`);

  // Ajan "aynı anlam" gerekçesi verdiyse dayanağı gerçekten var mı?
  if (/aynı anlam|birebir aynı|de "|ile aynı karşılığ/i.test(p.reason || "") && !src.sameMeaning)
    warn("dayanaksız çakışma", `${p.id} ${src.de} — gerekçe çakışma diyor ama sameMeaning alanı yok`);

  // Yinelenen iddiası: temiz ikizi gerçekten var mı?
  if (p.duplicate) {
    const twins = (src.sameMeaning || []).join(", ");
    warn("yinelenen iddiası", `${p.id} ${src.de} → ${twins || "eş yok!"}`);
  }
  // Başlık düzeltmesi öneriliyorsa temiz hâli havuzda zaten var mı?
  if (p.deCorrection) {
    const clean = p.deCorrection.replace(/^(der|die|das)\s+/, "").toLowerCase();
    const existing = words.filter(
      (w) => w.id !== p.id && w.de.toLowerCase() === clean,
    );
    if (existing.length)
      warn(
        "başlık düzeltmesi kopya yaratır",
        `${p.id} ${src.de} → "${p.deCorrection}" zaten ${existing.map((w) => `${w.id}(${w.niveau})`).join(", ")} maddesi — düşürmek gerekir`,
      );
    else warn("başlık düzeltmesi", `${p.id} ${src.de} → ${p.deCorrection}`);
  }

  // Yeni karşılık başka bir maddeyle çakışıyor mu?
  if (p.tr) {
    const k = p.tr.trim().toLowerCase();
    const clashing = words.filter((w) => w.id !== p.id && w.tr.trim().toLowerCase() === k && newTr.get(w.id) !== k);
    const persistent = clashing.filter((w) => !newTr.has(w.id));
    if (persistent.length)
      warn(
        "yeni çakışma",
        `${p.id} ${src.de} → "${p.tr}" ile ${persistent.map((w) => `${w.de}(${w.niveau})`).join(", ")} aynı olur`,
      );
  }
}

// Çakışma grubunun yalnızca bir tarafı düzeltilmişse diğer taraf hâlâ yalın.
console.log("\n── tek taraflı kalan çakışmalar ──");
let oneSided = 0;
for (const [id, src] of packets) {
  if (!src.sameMeaning || newTr.has(id)) continue;
  const twinFixed = props.some((p) => {
    const o = packets.get(p.id);
    return o && o.sameMeaning && o.tr.trim().toLowerCase() === src.tr.trim().toLowerCase();
  });
  if (twinFixed) {
    oneSided++;
    console.log(`  ${id} ${src.de} = "${src.tr}" — eşi düzeltildi ama bu madde yalın kaldı (${src.sameMeaning.join(", ")})`);
  }
}
if (!oneSided) console.log("  yok");

console.log(`\nözet: ${props.length} öneri, ${seen.size} ayrı madde.`);
