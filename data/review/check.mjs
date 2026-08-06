/**
 * Ajan önerilerini merkezî olarak denetler: `node data/review/check.mjs a2`
 *
 * Ajanların çıktısı doğrudan uygulanmaz. A1'de öğrenilen üç şey var:
 *  - Ajan bazen çakışma iddiasını uydurur ("Student de öğrenci diyor", oysa
 *    "üniversite öğrencisi" yazıyordu). Bu yüzden `ayniAnlam` dayanağı olan
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
  for (const p of parsed) props.push({ ...p, _dosya: f });
}

console.log(`${SLUG.toUpperCase()}: ${packets.size} madde incelendi, ${props.length} öneri geldi.\n`);

const görülen = new Set();
const uyar = (etiket, satır) => console.log(`  [${etiket}] ${satır}`);

// Önerilen yeni Türkçe karşılıkların kendi aralarında ve havuzla çakışması.
const yeniTr = new Map();
for (const p of props) if (p.tr) yeniTr.set(p.id, p.tr.trim().toLowerCase());

console.log("── denetim ──");
for (const p of props) {
  const src = packets.get(p.id);
  if (!src) {
    uyar("bilinmeyen id", `${p.id} (${p._dosya}) — bu paketin maddesi değil`);
    continue;
  }
  if (görülen.has(p.id)) uyar("çift öneri", `${p.id} ${src.de} iki ajandan birden geldi`);
  görülen.add(p.id);
  if (!p.neden) uyar("gerekçesiz", `${p.id} ${src.de}`);
  if (!p.tr && !p.deDuzeltme && !p.yinelenen) uyar("boş öneri", `${p.id} ${src.de}`);
  if (p.tr && p.tr.trim() === src.tr.trim()) uyar("değişiklik yok", `${p.id} ${src.de} — öneri mevcut karşılıkla aynı`);

  // Ajan "aynı anlam" gerekçesi verdiyse dayanağı gerçekten var mı?
  if (/aynı anlam|birebir aynı|de "|ile aynı karşılığ/i.test(p.neden || "") && !src.ayniAnlam)
    uyar("dayanaksız çakışma", `${p.id} ${src.de} — gerekçe çakışma diyor ama ayniAnlam alanı yok`);

  // Yinelenen iddiası: temiz ikizi gerçekten var mı?
  if (p.yinelenen) {
    const twins = (src.ayniAnlam || []).join(", ");
    uyar("yinelenen iddiası", `${p.id} ${src.de} → ${twins || "eş yok!"}`);
  }
  // Başlık düzeltmesi öneriliyorsa temiz hâli havuzda zaten var mı?
  if (p.deDuzeltme) {
    const temiz = p.deDuzeltme.replace(/^(der|die|das)\s+/, "").toLowerCase();
    const varOlan = words.filter(
      (w) => w.id !== p.id && w.de.toLowerCase() === temiz,
    );
    if (varOlan.length)
      uyar(
        "başlık düzeltmesi kopya yaratır",
        `${p.id} ${src.de} → "${p.deDuzeltme}" zaten ${varOlan.map((w) => `${w.id}(${w.niveau})`).join(", ")} maddesi — düşürmek gerekir`,
      );
    else uyar("başlık düzeltmesi", `${p.id} ${src.de} → ${p.deDuzeltme}`);
  }

  // Yeni karşılık başka bir maddeyle çakışıyor mu?
  if (p.tr) {
    const k = p.tr.trim().toLowerCase();
    const çakışan = words.filter((w) => w.id !== p.id && w.tr.trim().toLowerCase() === k && yeniTr.get(w.id) !== k);
    const kalıcı = çakışan.filter((w) => !yeniTr.has(w.id));
    if (kalıcı.length)
      uyar(
        "yeni çakışma",
        `${p.id} ${src.de} → "${p.tr}" ile ${kalıcı.map((w) => `${w.de}(${w.niveau})`).join(", ")} aynı olur`,
      );
  }
}

// Çakışma grubunun yalnızca bir tarafı düzeltilmişse diğer taraf hâlâ yalın.
console.log("\n── tek taraflı kalan çakışmalar ──");
let tek = 0;
for (const [id, src] of packets) {
  if (!src.ayniAnlam || yeniTr.has(id)) continue;
  const eşDüzeltildi = props.some((p) => {
    const o = packets.get(p.id);
    return o && o.ayniAnlam && o.tr.trim().toLowerCase() === src.tr.trim().toLowerCase();
  });
  if (eşDüzeltildi) {
    tek++;
    console.log(`  ${id} ${src.de} = "${src.tr}" — eşi düzeltildi ama bu madde yalın kaldı (${src.ayniAnlam.join(", ")})`);
  }
}
if (!tek) console.log("  yok");

console.log(`\nözet: ${props.length} öneri, ${görülen.size} ayrı madde.`);
