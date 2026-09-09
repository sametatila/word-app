/**
 * Beceriler kütüphanesi egzersizleri seviyenin kelime havuzunda kalıyor mu?
 *
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-library-vocab.ts [kurs] [seviye]
 *   npm run check:libvocab -- de a1        (varsayılan: iki kurs, bütün seviyeler)
 *
 * Ünite denetleyicisinden (check-unit-vocab.ts) farkı ÖLÇÜ: orada eşik "bu
 * üniteye kadar öğretilen", burada "bu seviyenin ve altındaki seviyelerin
 * havuz katmanı". Kütüphane egzersizinin ünitesi yok; öğrenci seviyeyi kendi
 * seçiyor ve seviyenin tamamını bildiği varsayılıyor.
 *
 * Almanca ölçüm `lib/vocab-gate.cjs`'in morfolojisiyle (çekim, ayrılabilen
 * fiil, özel ad ayıklaması) yapılır; ünite argümanı olarak seviyenin SON
 * ünitesi verilir, yani kümülatif küme seviyenin tamamıdır. İngilizce için o
 * makine yok: küçük harf + kısa ek kırpma (-s/-es/-ed/-ing/-'s) ve işlev
 * sözcüğü listesiyle kaba bir ölçüm yapılır. Kaba ama iş görür: amaç yüzde
 * değil, seviyeyi aşan ağır kelimeyi göstermek.
 *
 * Kesin bir kapı değil, rapor. Eşikler BRIEF'te: A1/A2 ≤ %10, B1 ≤ %15,
 * B2/C1 ≤ %20 hedef.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import type { SkillExercise } from "../src/lib/skills/types";

const require = createRequire(import.meta.url);
const gate = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[], seviye?: string) => { tok: string[]; disi: string[] };
  ozet: (d: string[]) => string[];
  türkçeMi: (s: string) => boolean;
  cumFor: (seviye: string) => Map<number, Set<string>>;
};

const LEVELS = ["a1", "a2", "b1", "b2", "c1"];
const courseArg = (process.argv[2] ?? "all").toLowerCase();
const levelArg = (process.argv[3] ?? "all").toLowerCase();

/** Egzersizin öğrencinin gördüğü HEDEF DİL yüzeyi; Türkçe alanlar dışarıda. */
function surface(e: SkillExercise): string {
  const out: string[] = [];
  const tr = gate.türkçeMi;
  if (e.skill === "reading") out.push(e.text);
  if (e.skill === "listening") for (const s of e.segments) out.push(s.text);
  if (e.skill === "reading" || e.skill === "listening" || e.skill === "grammar") {
    for (const q of e.questions) {
      if (!tr(q.text)) out.push(q.text);
      for (const o of q.options ?? []) if (!tr(o)) out.push(o);
      for (const a of q.accept ?? []) out.push(a);
      for (const i of q.items ?? []) if (!tr(i)) out.push(i);
    }
  }
  if (e.skill === "grammar") for (const b of e.explanation) for (const x of b.examples ?? []) out.push(x.de);
  if (e.skill === "writing") {
    for (const t of e.tasks) {
      if ("answer" in t && t.answer) out.push(t.answer);
      if ("alternatives" in t) out.push(...(t.alternatives ?? []));
      if ("sample" in t && t.sample) out.push(t.sample);
      if ("stimulus" in t && t.stimulus) out.push(t.stimulus);
      if ("phrases" in t) for (const p of t.phrases) out.push(p.de);
    }
  }
  if (e.skill === "speaking") {
    if ("tasks" in e) for (const t of e.tasks) out.push(t.de);
    if ("monologue" in e) out.push(e.monologue.sampleDe, ...e.monologue.targets.map((t) => t.de));
  }
  return out.join(" ");
}

/** Egzersizin kendi sözlükçesi ve kalıpları serbest sayılır (öğrenciye verilmiş). */
function allowed(e: SkillExercise): string[] {
  const ek: string[] = e.gloss.map((g) => g.de);
  if (e.skill === "writing") for (const t of e.tasks) if ("phrases" in t) ek.push(...t.phrases.map((p) => p.de));
  if (e.skill === "speaking" && "monologue" in e) ek.push(...e.monologue.targets.map((t) => t.de));
  return ek;
}

/* ── İngilizce: kaba kümülatif küme ─────────────────────────────────────── */
const EN_FREE = new Set(`a an the and or but so because if when while as than that this these those there here
i you he she it we they me him her us them my your his its our their mine yours
am is are was were be been being have has had do does did will would can could should may might must shall
not no yes n't to of in on at by for from with about into over under up down out off across after before
between through during without within along around near next last first second third
what which who whom whose where why how much many more most some any every each all both few little
very really just also too only even still already yet again never always often sometimes usually now then
today tomorrow yesterday tonight morning afternoon evening night week month year day hour minute
one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen
eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million
kilometer kilometers kilometre kilometres mile miles
ok okay oh hi hello hey bye please thanks thank sorry mr mrs ms dr o'clock am pm
monday tuesday wednesday thursday friday saturday sunday january february march april may june july august
september october november december euro euros pound pounds dollar dollars percent
true false right wrong cannot mine yours hers ours theirs anything everything anyone everyone someone nobody
metre metres meter meters km kg cm litre litres liter liters kilo kilos minutes hours euro
children men women people feet teeth`.split(/\s+/).filter(Boolean));

function enPool(level: string): Set<string> {
  const rows = readFileSync("data/app/words-en.json", "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l) as { de: string; niveau: string });
  const upto = LEVELS.indexOf(level);
  const set = new Set<string>();
  for (const r of rows) {
    if (LEVELS.indexOf(r.niveau.toLowerCase()) > upto) continue;
    for (const w of r.de.toLowerCase().replace(/\(.*?\)/g, "").split(/[\s/,-]+/)) if (w && !/^(to|the|a|an|sb|sth|somebody|something)$/.test(w)) set.add(w);
  }
  return set;
}

/**
 * Düzensiz biçim → mastar. Kural üretemediklerimiz: İngilizcenin en sık yüz
 * fiilinin yarısı düzensiz ve hepsi A1–A2 katmanında. Bunlar olmadan ölçüm
 * "went", "told", "seen" gibi biçimleri seviye dışı sayıyor ve oranı
 * olduğundan yüksek gösteriyordu.
 */
const EN_IRREGULAR: Record<string, string> = Object.fromEntries(
  `be:was were been;have:had;do:did done;go:went gone;say:said;get:got gotten;make:made;know:knew known;
think:thought;take:took taken;see:saw seen;come:came;want:wanted;use:used;find:found;give:gave given;
tell:told;work:worked;call:called;try:tried;ask:asked;need:needed;feel:felt;become:became;leave:left;
put:put;mean:meant;keep:kept;let:let;begin:began begun;seem:seemed;help:helped;talk:talked;turn:turned;
show:showed shown;hear:heard;play:played;run:ran;move:moved;live:lived;believe:believed;bring:brought;
happen:happened;write:wrote written;sit:sat;stand:stood;lose:lost;pay:paid;meet:met;include:included;
continue:continued;set:set;learn:learnt;lead:led;understand:understood;watch:watched;follow:followed;
stop:stopped;create:created;speak:spoke spoken;read:read;spend:spent;grow:grew grown;open:opened;
walk:walked;win:won;teach:taught;offer:offered;remember:remembered;consider:considered;buy:bought;
send:sent;build:built;fall:fell fallen;cut:cut;reach:reached;kill:killed;raise:raised;drive:drove driven;
break:broke broken;eat:ate eaten;drink:drank drunk;sleep:slept;wake:woke woken;ride:rode ridden;
swim:swam swum;sing:sang sung;fly:flew flown;draw:drew drawn;wear:wore worn;choose:chose chosen;
forget:forgot forgotten;catch:caught;hide:hid hidden;hold:held;sell:sold;cost:cost;hurt:hurt;
throw:threw thrown;lie:lay lain;rise:rose risen;send:sent;lend:lent;bite:bit bitten`
    .replace(/\n/g, "")
    .split(";")
    .flatMap((pair) => {
      const [base, forms] = pair.split(":");
      return (forms ?? "").trim().split(/\s+/).filter(Boolean).map((f) => [f, base.trim()] as const);
    }),
);

/** Kısaltmalar: "didn't" → did, "we've" → we. Kesme işaretinden sonrası düşer. */
function enContraction(w: string): string | null {
  const m = /^([a-z]+)(?:'(?:t|s|re|ve|ll|d|m))$/.exec(w);
  if (!m) return null;
  // "n't" kesilince kalan kök bazen bir harf eksik olur: can't → ca. Kısaltmanın
  // iki olası kökünü de döndürmek gerekiyordu; çağıran ikisini de deniyor.
  return m[1];
}

function enStems(w: string): string[] {
  const out = [w];
  const irr = EN_IRREGULAR[w];
  if (irr) out.push(irr);
  const con = enContraction(w);
  if (con) {
    out.push(con, EN_IRREGULAR[con] ?? con);
    if (w.endsWith("n't")) out.push(w.slice(0, -3), EN_IRREGULAR[w.slice(0, -3)] ?? w.slice(0, -3));
  }
  if (w.endsWith("'s")) out.push(w.slice(0, -2));
  if (w.endsWith("ies")) out.push(w.slice(0, -3) + "y");
  if (w.endsWith("es")) out.push(w.slice(0, -2));
  if (w.endsWith("s")) out.push(w.slice(0, -1));
  if (w.endsWith("ed")) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith("ied")) out.push(w.slice(0, -3) + "y");
  if (w.endsWith("ing")) out.push(w.slice(0, -3), w.slice(0, -3) + "e");
  if (w.endsWith("er")) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith("est")) out.push(w.slice(0, -3), w.slice(0, -2));
  if (w.endsWith("ly")) out.push(w.slice(0, -2));
  // çift ünsüz: running → run, bigger → big
  if (/([b-df-hj-np-tv-z])\1(ing|ed|er|est)$/.test(w)) out.push(w.replace(/([b-df-hj-np-tv-z])\1(ing|ed|er|est)$/, "$1"));
  return out;
}

function measureEn(text: string, level: string, ek: string[]): { tok: string[]; disi: string[] } {
  const pool = enPool(level);
  for (const w of ek) for (const p of w.toLowerCase().split(/[\s/,-]+/)) if (p) pool.add(p);
  const raw = text.replace(/[^\p{L}\p{N}'\s-]/gu, " ").split(/\s+/).filter(Boolean);
  const tok: string[] = [];
  const disi: string[] = [];
  raw.forEach((t, i) => {
    const w = t.toLowerCase().replace(/^'+|'+$/g, "");
    if (!w || /\d/.test(w)) return;
    // Özel ad: cümle başında olmayan büyük harfli sözcük.
    const prev = raw[i - 1] ?? "";
    const sentenceStart = i === 0 || /[.!?:]$/.test(prev) || /^["„“]/.test(t);
    if (/^[A-Z]/.test(t) && !sentenceStart) return;
    tok.push(w);
    if (EN_FREE.has(w)) return;
    // Tireli birleşik: parçalarının hepsi biliniyorsa bileşik de bilinir
    // ("twenty-five", "well-known"). Ayrı ayrı bakmak sayıları kurtarıyor.
    if (w.includes("-") && w.split("-").every((part) => !part || EN_FREE.has(part))) return;
    if (enStems(w).some((s) => pool.has(s))) return;
    disi.push(w);
  });
  return { tok, disi };
}

/* ── Almanca: vocab-gate ile seviyenin son ünitesi ─────────────────────── */
function measureDe(text: string, level: string, ek: string[]): { tok: string[]; disi: string[] } {
  const m = gate.cumFor(level);
  const last = Math.max(...m.keys());
  return gate.olc(text, last, ek, level);
}

const courses = courseArg === "all" ? ["de", "en"] : [courseArg];
const levels = levelArg === "all" ? LEVELS : [levelArg];
let worst = 0;
for (const course of courses) {
  for (const level of levels) {
    const list = BUNDLED_EXERCISES.filter((e) => e.id.includes("-lib-") && (e.course ?? "de") === course && e.level.toLowerCase() === level);
    if (!list.length) continue;
    console.log(`\n${course.toUpperCase()} ${level.toUpperCase()} · kütüphane egzersizi: ${list.length}`);
    const genel = new Map<string, number>();
    let tokT = 0;
    let disiT = 0;
    for (const e of list) {
      const r = course === "en" ? measureEn(surface(e), level, allowed(e)) : measureDe(surface(e), level, allowed(e));
      tokT += r.tok.length;
      disiT += r.disi.length;
      const oran = r.tok.length ? ((r.disi.length / r.tok.length) * 100).toFixed(1) : "0";
      if (r.disi.length) {
        console.log(`  ${e.id.padEnd(16)} %${oran.padStart(4)} dışı (${r.disi.length}/${r.tok.length}): ${gate.ozet(r.disi).slice(0, 10).join(", ")}`);
        for (const w of r.disi) genel.set(w, (genel.get(w) ?? 0) + 1);
      } else console.log(`  ${e.id.padEnd(16)} temiz (${r.tok.length} belirteç)`);
    }
    const oran = tokT ? (disiT / tokT) * 100 : 0;
    worst = Math.max(worst, oran);
    console.log(`  toplam %${oran.toFixed(1)} · en sık dışarıda: ${[...genel].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([w, n]) => `${w}×${n}`).join(" · ")}`);
  }
}
if (!worst) console.log("\nkütüphane egzersizi bulunamadı ya da hepsi temiz.");
