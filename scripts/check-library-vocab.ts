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
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import type { SkillExercise } from "../src/lib/skills/types";
/* Ölçüm makinesi kardeş denetleyiciyle ORTAK (gerekçesi orada). */
import { LEVELS, enLevelPool, measureEn } from "./lib/en-gate";

const require = createRequire(import.meta.url);
const gate = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[], seviye?: string) => { tok: string[]; disi: string[] };
  ozet: (d: string[]) => string[];
  türkçeMi: (s: string) => boolean;
  cumFor: (seviye: string) => Map<number, Set<string>>;
};

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
      const r = course === "en" ? measureEn(surface(e), enLevelPool(level), allowed(e)) : measureDe(surface(e), level, allowed(e));
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
