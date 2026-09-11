/**
 * İngilizce kursun ÜNİTE hizalı beceri egzersizleri, o üniteye kadar
 * ÖĞRETİLEN kelimelerin dışına çıkıyor mu?
 *
 *   npm run check:en-unitvocab            (bütün seviyeler)
 *   npm run check:en-unitvocab -- a1      (tek seviye)
 *
 * Almanca kardeşi `check-unit-vocab.ts`; ondan tek farkı ölçen makine
 * (`lib/en-gate.ts`, Almancada `lib/vocab-gate.cjs`) ve havuzun kaynağı.
 * Ölçü aynı: Patika'da ünite 1'i açan öğrenci HENÜZ dört ders görmüştür;
 * seviyenin tamamını bildiğini varsaymak o egzersizi ölçülemez kılar.
 * Kütüphane denetleyicisi (`check:libvocab`) seviye ölçüsünü kullanır ve
 * orada doğrudur: kütüphane egzersizinin ünitesi yok, öğrenci seviyeyi
 * kendi seçiyor.
 *
 * HAVUZ = bu seviyenin 1..4u. derslerinin kelime ve kalıpları + ALT
 * seviyelerin tamamı + serbest işlev sözcükleri + egzersizin KENDİ
 * sözlükçesi. Sonuncusu bilerek: sözlükçedeki kelime öğrenciye o ekranda
 * veriliyor, yani "bilinmeyen" değil. Almanca hat da aynısını yapıyor.
 *
 * Kapı DEĞİL, rapor: çıktı sıfır olmak zorunda değil, çıkanın sözlükçeye mi
 * gireceğine yoksa metinden mi çıkacağına yazar karar verir.
 */
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import type { SkillExercise } from "../src/lib/skills/types";
import { lessonsFor } from "../src/lib/lessons/index";
import { UNIT_LESSONS } from "../src/lib/immersion/build";
import { EN_FREE, LEVELS, measureEn } from "./lib/en-gate";

/** Egzersizin öğrencinin gördüğü İNGİLİZCE yüzeyi; Türkçe alanlar dışarıda. */
function surface(e: SkillExercise): string {
  const out: string[] = [];
  const tr = (s: string) => /[ığşĞİŞ]|iyor|mek\b|mak\b/.test(s);
  if (e.skill === "reading") out.push(e.text);
  if (e.skill === "listening") for (const s of e.segments) out.push(s.text);
  if (e.skill === "reading" || e.skill === "listening") {
    for (const q of e.questions) {
      if (!tr(q.text)) out.push(q.text);
      for (const o of q.options ?? []) if (!tr(o)) out.push(o);
      for (const a of q.accept ?? []) out.push(a);
      for (const i of q.items ?? []) if (!tr(i)) out.push(i);
    }
  }
  if (e.skill === "writing") {
    for (const t of e.tasks) {
      if ("answer" in t && t.answer) out.push(t.answer);
      if ("alternatives" in t) out.push(...(t.alternatives ?? []));
      if ("sample" in t && t.sample) out.push(t.sample);
      if ("stimulus" in t && t.stimulus) out.push(t.stimulus);
      if ("source" in t && t.source) out.push(t.source);
      if ("fields" in t) for (const f of t.fields) out.push(f.answer, ...(f.accept ?? []));
      if ("phrases" in t) for (const p of t.phrases) out.push(p.de);
      if ("words" in t) for (const p of t.words) out.push(p.de);
    }
  }
  /* E-POSTA VE AĞ ADRESİ SÖZCÜK DEĞİL. Form egzersizinde
     "deniz.yalin@mail.com" geçiyor; ölçüm onu noktalarından bölüp dört
     ayrı "kelime" sayıyor ve hiçbiri havuzda olmadığı için egzersizi
     %10 dışı gösteriyordu. Adres bir dizedir, öğrencinin öğreneceği bir
     sözcük değil. */
  return out.join(" ").replace(/\S+@\S+/g, " ").replace(/https?:\/\/\S+/g, " ");
}

/** Egzersizin kendi sözlükçesi öğrenciye verilmiştir — havuza eklenir. */
function allowed(e: SkillExercise): string[] {
  const ek = e.gloss.map((g) => g.de);
  if (e.skill === "writing") for (const t of e.tasks) {
    if ("phrases" in t) ek.push(...t.phrases.map((p) => p.de));
    if ("words" in t) ek.push(...t.words.map((p) => p.de));
  }
  return ek;
}

/** Bir dizeyi sözcüklerine ayırıp havuza ekler ("I'm from …" → i'm, from). */
function feed(pool: Set<string>, raw: string) {
  for (const w of raw.toLowerCase().replace(/[^\p{L}\p{N}'\s/-]/gu, " ").split(/[\s/]+/)) {
    const c = w.replace(/^'+|'+$/g, "");
    if (c) pool.add(c);
  }
}

/**
 * Seviyenin `unit`. ünitesine kadar öğretilmiş küme: alt seviyelerin tamamı +
 * bu seviyenin ilk `UNIT_LESSONS * unit` dersi.
 */
function unitPool(level: string, unit: number): Set<string> {
  const pool = new Set(EN_FREE);
  const lessons = lessonsFor("en");
  const upto = LEVELS.indexOf(level);
  for (const l of lessons) {
    const li = LEVELS.indexOf(l.level.toLowerCase());
    if (li > upto) continue;
    if (li === upto) {
      const n = lessons.filter((x) => x.level === l.level).indexOf(l);
      if (n >= UNIT_LESSONS * unit) continue;
    }
    for (const v of l.vocab) feed(pool, v.de);
    for (const p of l.patterns) feed(pool, p.de);
  }
  return pool;
}

const levelArg = (process.argv[2] ?? "all").toLowerCase();
const levels = levelArg === "all" ? LEVELS : [levelArg];
for (const level of levels) {
  const list = BUNDLED_EXERCISES.filter((e) => new RegExp(`^en-${level}-u\\d+-`).test(e.id));
  if (!list.length) continue;
  console.log(`\nEN ${level.toUpperCase()} · ünite hizalı egzersiz: ${list.length}`);
  const genel = new Map<string, number>();
  let tokT = 0;
  let disiT = 0;
  for (const e of list) {
    const r = measureEn(surface(e), unitPool(level, e.unit ?? 1), allowed(e));
    tokT += r.tok.length;
    disiT += r.disi.length;
    const oran = r.tok.length ? ((r.disi.length / r.tok.length) * 100).toFixed(1) : "0";
    if (r.disi.length) {
      const say = new Map<string, number>();
      for (const w of r.disi) say.set(w, (say.get(w) ?? 0) + 1);
      console.log(`  ${e.id.padEnd(16)} %${oran.padStart(4)} dışı (${r.disi.length}/${r.tok.length}): ${[...say].map(([w, n]) => (n > 1 ? `${w}×${n}` : w)).join(", ")}`);
      for (const w of r.disi) genel.set(w, (genel.get(w) ?? 0) + 1);
    } else console.log(`  ${e.id.padEnd(16)} temiz (${r.tok.length} belirteç)`);
  }
  console.log(`  toplam %${tokT ? ((disiT / tokT) * 100).toFixed(1) : "0"} · en sık dışarıda: ${[...genel].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([w, n]) => `${w}×${n}`).join(" · ") || "—"}`);
}
