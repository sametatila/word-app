/**
 * Ünite hizalı beceri egzersizleri, o üniteye kadar ÖĞRETİLEN kelimelerin
 * dışına çıkıyor mu? Çıkanları sıklığa göre listeler.
 *
 * KAYNAKTAN okur, mobil dökümden değil. Döküm `speaking` becerisini bilerek
 * dışarıda bırakıyor (mobilde konuşma dersin içinde), o yüzden döküm okunduğu
 * sürece konuşma egzersizleri HİÇ denetlenmiyordu.
 *
 * Ölçüm mantığı `lib/vocab-gate.cjs`'de — modül sınavı denetleyicisiyle
 * ORTAK. Buradaki iş yalnızca egzersizden ölçülecek Almancayı toplamak.
 */
import { createRequire } from "node:module";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";

const require = createRequire(import.meta.url);
const { olc, ozet, türkçeMi } = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[], seviye?: string) => { tok: string[]; disi: string[] };
  ozet: (d: string[]) => string[];
  türkçeMi: (s: string) => boolean;
};
/**
 * Egzersizin GEVŞEK görünümü — yalnız burada okunan alanlar.
 *
 * `any` yerine bu: paket birden çok egzersiz türü taşıyor (quiz, konuşma,
 * yazma) ve hepsinin alanları farklı, ama bu betik yalnız metin yüzeyini
 * topluyor. Hepsini isteğe bağlı alanlarla tarif etmek, `any`nin verdiği
 * özgürlüğü koruyup yanlış alan adını yakalama yeteneğini geri kazandırıyor:
 * `e.txet` artık derlemede patlıyor.
 */
type Gloss = { de?: string; tr?: string };
type LooseTask = {
  de?: string;
  answer?: string;
  source?: string;
  sample?: string;
  stimulus?: string;
  kind?: string;
  /** Yazma görevinde kalıp sözlükçesi; bazı pakette `words` adıyla. */
  phrases?: Gloss[];
  words?: Gloss[];
  fields?: { answer?: string }[];
};
type LooseExercise = {
  id: string;
  skill?: string;
  text?: string;
  /** Egzersizin kendi sözlükçesi — kapı dışı sayılmaz. */
  gloss?: Gloss[];
  /** Patika ünitesi (varsa): kapı seviyesi buna göre seçiliyor. */
  unit?: number;
  segments?: { text?: string }[];
  questions?: { text?: string; accept?: string[] }[];
  tasks?: LooseTask[];
};

const ex = BUNDLED_EXERCISES as unknown as LooseExercise[];

/** Egzersizin ölçülecek Almanca yüzeyi. Türkçe alanlar dışarıda. */
function almanca(e: LooseExercise): string {
  const out: string[] = [];
  if (e.text) out.push(e.text);
  for (const s of e.segments || []) if (s.text) out.push(s.text);
  // Şıklar Türkçe olabiliyor ("samimi (du)"); Almanca ölçümüne sokmuyoruz.
  for (const q of e.questions || []) {
    if (q.text && !türkçeMi(q.text)) out.push(q.text);
    for (const a of q.accept || []) out.push(a);
  }
  for (const t of e.tasks || []) {
    // Konuşma görevinin söylenecek metni `de` alanında; ölçüm dışında kalıyordu.
    if (e.skill === "speaking" && t.de) out.push(t.de);
    if (t.answer) out.push(t.answer);
    if (t.source && !türkçeMi(t.source)) out.push(t.source);
    if (t.sample) out.push(t.sample);
    if (t.stimulus) out.push(t.stimulus);
    for (const f of t.fields || []) if (f.answer) out.push(f.answer);
  }
  return out.join(" ");
}

// Seviye argümanla seçilir: `npm run check:unitvocab -- b1`. Varsayılan a1,
// böylece mevcut çağrılar aynen çalışır.
const seviye = (process.argv[2] || "a1").toLowerCase();
const hedef = ex.filter((e) => new RegExp(`^${seviye}-u\\d+-`).test(e.id));
console.log(`${seviye.toUpperCase()} · ünite hizalı egzersiz: ${hedef.length}`);
const genelDisi = new Map();
for (const e of hedef) {
  // egzersizin kendi sözlükçesi ve yazma görevlerinin kalıpları serbest
  const ek: string[] = [];
  for (const g of e.gloss || []) if (g.de) ek.push(g.de);
  for (const t of e.tasks || []) for (const g of t.phrases || t.words || []) if (g.de) ek.push(g.de);
  // Ünitesiz egzersiz (Beceriler kütüphanesi) kapıya 0 ile giriyor: kapı o
  // durumda seviye tabanını kullanıyor, ünite penceresi açmıyor.
  const { tok, disi } = olc(almanca(e), e.unit ?? 0, ek, seviye);
  const oran = tok.length ? (disi.length / tok.length * 100).toFixed(1) : "0";
  if (disi.length) {
    console.log(`  ${e.id.padEnd(12)} %${oran.padStart(4)} dışı (${disi.length}/${tok.length}): ${ozet(disi).slice(0, 8).join(", ")}`);
    for (const w of disi) genelDisi.set(w, (genelDisi.get(w) || 0) + 1);
  } else {
    console.log(`  ${e.id.padEnd(12)} temiz`);
  }
}
console.log("\nen sık dışarıda kalanlar:", [...genelDisi].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, n]) => `${w}×${n}`).join(" · "));
