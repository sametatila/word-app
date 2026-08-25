/**
 * İçerik doğrulayıcı — `npm run test:content` (WP-70)
 *
 *   npm run test:content                 # hepsi
 *   npm run test:content -- lessons      # tek tür: skills | lessons | cheatsheet
 *   npm run test:content -- --baseline   # uyarı sayısını baseline'a yaz
 *
 * Kurallar `data/content/SPEC.md`'de; burası onların kodu. İki liste:
 *   HATA   — yapıyı bozan (eksik alan, aralık dışı indeks, kopuk `next`,
 *            yinelenen kimlik). Bir tane bile varsa çıkış 1.
 *   UYARI  — kalite (havuz dışı kelime, çok anlamlı karşılık, uzun metin,
 *            `en` eksik). Etiket başına sayılır; `data/content/baseline.json`
 *            etiket başına tavan tutar — aşan ya da yeni kategori hata:
 *            mevcut borç bilinir, yeni borç alınmaz.
 *
 * Veritabanı yok: içerik koddan (`bundled`, `LESSONS`, `CHEATSHEETS`),
 * kelime havuzu `data/app/words.json`'dan.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { LESSONS } from "../src/lib/lessons";
import { LESSON_ICONS } from "../src/lib/lessons/types";
import { CHEATSHEETS } from "../src/lib/cheatsheet";
import type { DialogueTurn } from "../src/lib/dialogue";
import type { Lesson } from "../src/lib/lessons/types";
import type { SkillExercise } from "../src/lib/skills/types";
import type { CheatSheet } from "../src/lib/cheatsheet/types";
import { isCandoId } from "../src/lib/cando";
import { candoForExercise, candoForLesson } from "../src/lib/cando-map";
// contains.mjs: kelimenin metinde çekimli hâliyle geçip geçmediği (kelime hattıyla ortak).
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — .mjs, tip bildirimi yok
import { contains } from "../data/meanings/contains.mjs";

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(ROOT, "data/content/baseline.json");
const args = process.argv.slice(2);
const only = args.find((a) => !a.startsWith("--"));
const writeBaseline = args.includes("--baseline");

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1"]);
const TR_HARF = /[ıİğĞşŞ]/;
/**
 * Almanca metinde Türkçe harf var mı — ÖZEL ADLAR HARİÇ. Metinlerde Türk
 * karakterler var ("Frau Yıldız", "Herr Aydın") ve bu bilinçli: öğrenci
 * kendini metinde görüyor. Büyük harfle başlayan kelimeler (özel ad ya da
 * Almanca isim) sınavdan çıkarılıyor; kalanında Türkçe harf hata.
 */
const trLetters = (text: string) => TR_HARF.test(text.replace(/(^|[\s„"(])[A-ZÄÖÜİ][^\s.,;:!?„"()]*/g, "$1"));
const READING_WORDS: Record<string, [number, number]> = { A1: [60, 120], A2: [100, 180], B1: [150, 260], B2: [200, 350], C1: [250, 450] };

const errors: string[] = [];
const warnings: string[] = [];
const E = (where: string, msg: string) => errors.push(`${where} — ${msg}`);
const W = (where: string, msg: string) => warnings.push(`${where} — ${msg}`);

const words = (JSON.parse(readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")) as { de: string }[]).map((w) => w.de);
const pool = new Set(words.map((w) => w.toLocaleLowerCase("de-DE")));
const inPool = (de: string) => {
  const bare = de.replace(/^(der|die|das|de|d|s|en|e)\s+/i, "").replace(/\s*\(.*\)\s*/g, "").replace(/…|\.\.\./g, "").trim();
  if (!bare || /\s/.test(bare)) return true; // kalıp/çok kelimeli: havuz karşılaştırması anlamsız
  return pool.has(bare.toLocaleLowerCase("de-DE"));
};
const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const multi = (s: string) => /,/.test(s) && !/[…/]/.test(s);
const need = (where: string, obj: Record<string, unknown>, keys: string[]) => {
  for (const k of keys) {
    const v = obj[k];
    if (v === undefined || v === null || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && !v.length)) E(where, `zorunlu alan boş: ${k}`);
  }
};

/* ───────────── senaryo / diyalog turları (ortak) ───────────── */
function checkTurns(where: string, turns: DialogueTurn[], opts: { minTurns?: number; opening?: string } = {}) {
  const ids = new Set<string>();
  for (const t of turns) {
    if (ids.has(t.id)) E(where, `yinelenen tur kimliği ${t.id}`);
    ids.add(t.id);
  }
  turns.forEach((t, i) => {
    const w = `${where} tur ${t.id}`;
    need(w, t as unknown as Record<string, unknown>, ["ask", "askTr", "cue", "replies", "fallback"]);
    if (trLetters(t.ask)) E(w, `ask içinde Türkçe harf: "${t.ask}"`);
    if (!t.fallback?.example?.trim()) E(w, "fallback.example boş");
    if (!t.fallback?.say?.trim() || !t.fallback?.sayTr?.trim()) E(w, "fallback.say/sayTr boş");
    for (const r of t.replies ?? []) {
      if (!r.match?.length) E(w, "reply.match boş");
      if (r.match?.length === 1) W(w, `tek köklü dal: ${r.match[0]}`);
      if (!r.say?.trim()) E(w, "reply.say boş");
      if (r.next && !ids.has(r.next)) E(w, `kopuk next: ${r.next}`);
    }
    if (i === 0 && opts.opening !== undefined && t.ask !== opts.opening) E(w, "ilk turun ask'i açılış repliğiyle aynı değil");
  });
  if (opts.minTurns !== undefined && turns.length < opts.minTurns) E(where, `senaryo ${turns.length} tur, minTurns ${opts.minTurns}`);
}

/* ───────────── beceri egzersizleri ───────────── */
function checkSkills(list: SkillExercise[]) {
  const ids = new Set<string>();
  for (const e of list) {
    const w = `[skills] ${e.id}`;
    if (ids.has(e.id)) E(w, "yinelenen kimlik");
    ids.add(e.id);
    need(w, e as unknown as Record<string, unknown>, ["id", "level", "title", "genre", "intro", "minutes"]);
    if (!LEVELS.has(e.level)) E(w, `geçersiz seviye ${e.level}`);
    if (e.minutes < 1 || e.minutes > 20) W(w, `minutes ${e.minutes} aralık dışı (1–20)`);
    for (const id of e.cando ?? []) if (!isCandoId(id)) E(w, `bilinmeyen can-do kimliği ${id}`);
    if (!candoForExercise(e).length) E(w, "can-do etiketi üretilemedi");
    if (TR_HARF.test(e.intro) === false && /[ßÄÖÜäöü]/.test(e.intro) && !/„|"/.test(e.intro)) W(w, "intro Türkçe olmalı; Almanca harf var");

    const text =
      e.skill === "reading" ? e.text : e.skill === "listening" ? e.segments.map((s) => s.text).join(" ") : "";
    for (const g of e.gloss ?? []) {
      if (!g.de?.trim() || !g.tr?.trim()) E(w, `gloss eksik: ${JSON.stringify(g)}`);
      if (multi(g.tr)) W(w, `çok anlamlı tr: ${g.de} → "${g.tr}"`);
      if (!g.en) W(w, `en yok: ${g.de}`);
      if (g.en && TR_HARF.test(g.en)) E(w, `en alanında Türkçe harf: ${g.de} → "${g.en}"`);
      if (/[()[\]]/.test(g.tr)) W(w, `parantezli tr: ${g.de} → "${g.tr}"`);
      if (text && !/[…/,]/.test(g.de) && !contains(text, g.de)) W(w, `sözlükçe kelimesi metinde yok: "${g.de}"`);
    }

    if (e.skill === "reading") {
      const n = wc(e.text);
      const [lo, hi] = READING_WORDS[e.level] ?? [0, Infinity];
      if (n < lo * 0.6 || n > hi * 1.4) W(w, `okuma metni ${n} kelime; ${e.level} için ${lo}–${hi}`);
      if (trLetters(e.text)) E(w, "okuma metninde Türkçe harf");
    }
    if (e.skill === "listening") {
      for (const s of e.segments) {
        if (wc(s.text) > 40) W(w, `dinleme bölümü ${wc(s.text)} kelime (> 40): "${s.text.slice(0, 40)}…"`);
        if (trLetters(s.text)) E(w, `dinleme bölümünde Türkçe harf: "${s.text.slice(0, 40)}"`);
      }
    }
    if (e.skill === "reading" || e.skill === "listening") {
      if (e.questions.length < 3) W(w, `${e.questions.length} soru (< 3)`);
      e.questions.forEach((q, i) => {
        const qw = `${w} soru ${i + 1}`;
        if (!q.text?.trim()) E(qw, "soru metni boş");
        if (!q.options || q.options.length < 2 || q.options.length > 4) E(qw, `şık sayısı ${q.options?.length ?? 0}`);
        if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) E(qw, `answer indeksi aralık dışı: ${q.answer}`);
        if (!q.explain?.trim()) E(qw, "explain (neden) boş");
        else if (q.explain.length > 260) W(qw, `explain ${q.explain.length} karakter (> 260)`);
        if (new Set(q.options).size !== q.options?.length) E(qw, "yinelenen şık");
        if (wc(q.text) > 30) W(qw, `soru ${wc(q.text)} kelime (> 30)`);
      });
    }
    if (e.skill === "writing") {
      if (!e.tasks.length) E(w, "yazma görevi yok");
      e.tasks.forEach((t, i) => {
        const tw = `${w} görev ${i + 1}`;
        if (t.kind === "sentence") {
          if (!t.words || t.words.length < 2 || t.words.length > 3) E(tw, `sentence: ${t.words?.length ?? 0} kelime (2–3)`);
          for (const g of t.words ?? []) if (!g.de?.trim() || !g.tr?.trim()) E(tw, `sentence: kelime eksik ${JSON.stringify(g)}`);
        } else if (t.kind === "build") {
          if (!t.tr?.trim() || !t.answer?.trim()) E(tw, "build: tr/answer boş");
          if (trLetters(t.answer)) E(tw, "build: answer içinde Türkçe harf");
        } else {
          if (!t.prompt?.trim()) E(tw, "free: prompt boş");
          if ((t.checklist?.length ?? 0) < 2) W(tw, "free: checklist < 2");
          if (t.minWords < 15 || t.minWords > 200) W(tw, `free: minWords ${t.minWords}`);
          if ((t.phrases?.length ?? 0) < 2) W(tw, "free: phrases < 2");
          if (t.sample && wc(t.sample) < t.minWords) W(tw, `free: sample ${wc(t.sample)} kelime, minWords ${t.minWords}`);
        }
      });
    }
    if (e.skill === "speaking") {
      if ("dialogue" in e) {
        checkTurns(w, e.dialogue);
        if ((e.targets?.length ?? 0) < 2) W(w, "diyalog hedefleri < 2");
      } else {
        if (e.tasks.length < 4) W(w, `konuşma drill'i ${e.tasks.length} görev (< 4)`);
        for (const t of e.tasks) {
          if (!t.de?.trim() || !t.tr?.trim()) E(w, `konuşma görevi eksik: ${JSON.stringify(t).slice(0, 60)}`);
          if (wc(t.de) > 12) W(w, `konuşma cümlesi ${wc(t.de)} kelime (> 12): "${t.de}"`);
          for (const c of t.confusions ?? []) if (!c.heard?.length || !c.fix?.trim()) E(w, `confusion eksik: ${t.de}`);
        }
      }
    }
  }
}

/* ───────────── dersler ───────────── */
function checkLessons(list: Lesson[]) {
  const ids = new Set<string>();
  const icons = new Set<string>(LESSON_ICONS);
  for (const l of list) {
    const w = `[lessons] ${l.id}`;
    if (ids.has(l.id)) E(w, "yinelenen kimlik");
    ids.add(l.id);
    need(w, l as unknown as Record<string, unknown>, ["id", "level", "course", "icon", "title", "titleTr", "summary", "minutes", "focusId", "vocab", "patterns", "lecture", "roleplay"]);
    if (!LEVELS.has(l.level)) E(w, `geçersiz seviye ${l.level}`);
    if (!icons.has(l.icon)) E(w, `bilinmeyen ikon ${l.icon}`);
    for (const id of l.cando ?? []) if (!isCandoId(id)) E(w, `bilinmeyen can-do kimliği ${id}`);
    if (!candoForLesson(l).length) E(w, "can-do etiketi üretilemedi");
    if (l.minutes < 3 || l.minutes > 20) W(w, `minutes ${l.minutes}`);
    if (l.vocab.length < 4 || l.vocab.length > 10) W(w, `vocab ${l.vocab.length} (4–10)`);
    if (l.patterns.length < 2 || l.patterns.length > 5) W(w, `patterns ${l.patterns.length} (2–5)`);
    let out = 0;
    for (const v of l.vocab) {
      if (!v.de?.trim() || !v.tr?.trim()) E(w, `vocab eksik: ${JSON.stringify(v)}`);
      if (multi(v.tr)) W(w, `çok anlamlı vocab tr: ${v.de} → "${v.tr}"`);
      if (l.course === "de" && !inPool(v.de)) out++;
    }
    if (l.course === "de" && l.vocab.length && out / l.vocab.length > 0.34) W(w, `havuz dışı kelime ${out}/${l.vocab.length}`);
    for (const p of l.patterns) if (!p.de?.trim() || !p.tr?.trim()) E(w, `pattern eksik: ${JSON.stringify(p)}`);

    const steps = l.lecture;
    if (steps.length < 8 || steps.length > 20) W(w, `lecture ${steps.length} adım (8–20)`);
    let scored = 0;
    let repeat = 0;
    steps.forEach((s, i) => {
      const sw = `${w} adım ${i + 1}`;
      if (!s.say?.length) E(sw, "say boş");
      for (const seg of s.say ?? []) {
        if (seg.lang === "de" && trLetters(seg.text)) E(sw, `Almanca parçada Türkçe harf: "${seg.text}"`);
      }
      const x = s.expect;
      if (!x) return;
      if (x.kind === "repeat") {
        repeat++;
        if (!x.target?.trim()) E(sw, "repeat.target boş");
      } else if (x.kind === "produce") {
        scored++;
        if (!x.target?.trim()) E(sw, "produce.target boş");
        if (!x.hint?.length) E(sw, "produce.hint boş (ilk yanlışın 'neden'i)");
        if (trLetters(x.target)) E(sw, `produce.target içinde Türkçe harf: "${x.target}"`);
      } else if (x.kind === "truefalse") {
        scored++;
        if (!x.statement?.trim()) E(sw, "truefalse.statement boş");
        if (!x.why?.length) E(sw, "truefalse.why boş");
      }
    });
    if (scored < 3) W(w, `puanlanan adım ${scored} (< 3)`);
    if (steps.length && repeat / steps.length > 0.6) W(w, `tekrar adımı payı %${Math.round((100 * repeat) / steps.length)} (> 60)`);

    const r = l.roleplay;
    need(`${w} roleplay`, r as unknown as Record<string, unknown>, ["scene", "partner", "opening", "openingTr", "minTurns"]);
    if (trLetters(r.opening)) E(w, "roleplay.opening içinde Türkçe harf");
    if (r.minTurns < 2 || r.minTurns > 6) W(w, `minTurns ${r.minTurns} (2–6)`);
    if (r.script?.length) checkTurns(`${w} senaryo`, r.script, { minTurns: r.minTurns, opening: r.opening });
  }
}

/* ───────────── dilbilgisi sayfaları ───────────── */
function checkSheets(list: CheatSheet[]) {
  const ids = new Set<string>();
  for (const s of list) {
    const w = `[cheatsheet] ${s.id}`;
    if (ids.has(s.id)) E(w, "yinelenen kimlik");
    ids.add(s.id);
    need(w, s as unknown as Record<string, unknown>, ["id", "level", "title", "de", "summary", "blocks"]);
    if (!LEVELS.has(s.level)) E(w, `geçersiz seviye ${s.level}`);
    s.blocks.forEach((b, i) => {
      if (b.kind === "table") {
        if (!b.columns?.length) E(w, `blok ${i + 1}: sütun yok`);
        b.rows.forEach((row, ri) => {
          if (row.length !== b.columns.length) E(w, `blok ${i + 1} satır ${ri + 1}: ${row.length} hücre, ${b.columns.length} sütun`);
        });
        if (!b.rows.length) W(w, `blok ${i + 1}: boş tablo`);
      } else if (b.kind === "note") {
        if (!b.text?.trim()) E(w, `blok ${i + 1}: boş not`);
      }
    });
  }
}

/* ───────────── çalıştır ───────────── */
const kinds = only ? [only] : ["skills", "lessons", "cheatsheet"];
if (kinds.includes("skills")) checkSkills(BUNDLED_EXERCISES);
if (kinds.includes("lessons")) checkLessons(LESSONS);
if (kinds.includes("cheatsheet")) checkSheets(CHEATSHEETS);

const counts = `${BUNDLED_EXERCISES.length} egzersiz · ${LESSONS.length} ders · ${CHEATSHEETS.length} dilbilgisi sayfası · havuz ${words.length} kelime`;
console.log(`\nİçerik doğrulama — ${kinds.join(", ")} · ${counts}\n`);
if (errors.length) {
  console.log(`HATA (${errors.length})`);
  for (const e of errors) console.log(`  ✗ ${e}`);
}
/** Uyarı etiketi: tür + mesajın sayısız hâli ("dinleme bölümü N kelime"). */
const tagOf = (w: string) => w.replace(/^\[(\w+)\].*? — ([^:"„]+).*$/s, "$1: $2").replace(/\d+/g, "N").trim();
const byTag = new Map<string, number>();
for (const w of warnings) byTag.set(tagOf(w), (byTag.get(tagOf(w)) ?? 0) + 1);
if (warnings.length) {
  console.log(`\nUYARI (${warnings.length})`);
  for (const [tag, n] of [...byTag.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${tag}`);
  if (args.includes("--verbose")) for (const w of warnings) console.log(`  · ${w}`);
}

/*
  Uyarı bütçesi ETİKET başına: toplam sayı tek başına "en yok" borcunu
  azaltırken başka bir yerde "kopuk sözlükçe" borcu almaya izin verirdi.
  Etiket başına tavan: hiçbir kategori büyüyemez, yeni kategori açılamaz.
*/
let baseline: Record<string, number> = {};
if (existsSync(BASELINE)) baseline = JSON.parse(readFileSync(BASELINE, "utf8")) as Record<string, number>;
if (writeBaseline) {
  if (!only) baseline = {};
  for (const [tag, n] of byTag) baseline[tag] = n;
  writeFileSync(BASELINE, JSON.stringify(Object.fromEntries(Object.entries(baseline).sort()), null, 2) + "\n");
  console.log(`\nbaseline yazıldı: ${byTag.size} etiket, ${warnings.length} uyarı.`);
}
const over: string[] = [];
if (Object.keys(baseline).length) {
  for (const [tag, n] of byTag) {
    const cap = baseline[tag] ?? 0;
    if (n > cap) over.push(`${tag}: ${n} > ${cap}`);
  }
}
if (over.length) {
  console.log("\n✗ Uyarı bütçesi aşıldı (yeni içerik borcu). Düzelt ya da bilinçli kabul için --baseline:");
  for (const o of over) console.log(`  · ${o}`);
}
const failed = errors.length > 0 || over.length > 0;
console.log(failed ? "\nİÇERİK DOĞRULAMASI BAŞARISIZ" : `\nİÇERİK DOĞRULAMASI GEÇTİ (${warnings.length} uyarı, bütçe içinde)`);
process.exit(failed ? 1 : 0);
