/**
 * Ünite hizalı beceri egzersizleri, o üniteye kadar ÖĞRETİLEN kelimelerin
 * dışına çıkıyor mu? Çıkanları sıklığa göre listeler.
 *
 * Ölçüm mantığı `lib/vocab-gate.cjs`'de — modül sınavı denetleyicisiyle
 * ORTAK. Buradaki iş yalnızca egzersizden ölçülecek Almancayı toplamak.
 */
const fs = require("fs");
const { olc, ozet, türkçeMi, parcala } = require("./lib/vocab-gate.cjs");
const R = process.cwd();
const ex = JSON.parse(fs.readFileSync(`${R}/mobile/src/data/skills/exercises.json`, "utf8"));

/** Egzersizin ölçülecek Almanca yüzeyi. Türkçe alanlar dışarıda. */
function almanca(e) {
  const out = [];
  if (e.text) out.push(e.text);
  for (const s of e.segments || []) out.push(s.text);
  // Şıklar Türkçe olabiliyor ("samimi (du)"); Almanca ölçümüne sokmuyoruz.
  for (const q of e.questions || []) {
    if (!türkçeMi(q.text)) out.push(q.text);
    for (const a of q.accept || []) out.push(a);
  }
  for (const t of e.tasks || []) {
    if (t.answer) out.push(t.answer);
    if (t.source && !türkçeMi(t.source)) out.push(t.source);
    if (t.sample) out.push(t.sample);
    if (t.stimulus) out.push(t.stimulus);
    for (const f of t.fields || []) out.push(f.answer);
  }
  return out.join(" ");
}

const hedef = ex.filter((e) => /^a1-u\d+-/.test(e.id));
console.log(`ünite hizalı egzersiz: ${hedef.length}`);
const genelDisi = new Map();
for (const e of hedef) {
  // egzersizin kendi sözlükçesi ve yazma görevlerinin kalıpları serbest
  const ek = [];
  for (const g of e.gloss || []) ek.push(g.de);
  for (const t of e.tasks || []) for (const g of t.phrases || t.words || []) ek.push(g.de);
  const { tok, disi } = olc(almanca(e), e.unit, ek);
  const oran = tok.length ? (disi.length / tok.length * 100).toFixed(1) : "0";
  if (disi.length) {
    console.log(`  ${e.id.padEnd(12)} %${oran.padStart(4)} dışı (${disi.length}/${tok.length}): ${ozet(disi).slice(0, 8).join(", ")}`);
    for (const w of disi) genelDisi.set(w, (genelDisi.get(w) || 0) + 1);
  } else {
    console.log(`  ${e.id.padEnd(12)} temiz`);
  }
}
console.log("\nen sık dışarıda kalanlar:", [...genelDisi].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, n]) => `${w}×${n}`).join(" · "));
