/**
 * Sınav kâğıdının kuru provası — veritabanı olmadan.
 *
 * `check-exams.ts` maddelerin VAR olduğunu kanıtlıyor; bu betik kâğıdın
 * gerçekten KURULDUĞUNU: 23 modülün her biri için `buildExam` çağrılıyor,
 * bölüm sayıları, ağırlıklar, doğru şık dizinleri ve maddelerin modüle
 * aidiyeti denetleniyor. Kelime sorgusu `scripts/stub-db.ts` ile taklit
 * ediliyor (bkz. tsconfig.dry.json).
 *
 *   npx tsx --tsconfig scripts/tsconfig.dry.json scripts/exam-dryrun.ts
 */
import { FAKE_WORDS } from "./stub-db";
import { allModules, moduleContent } from "../src/lib/lessons/module-content";
import { foldSentence } from "../src/lib/sentence-match";
import type { CefrLevel } from "../src/lib/skills/types";

const COURSE = "de";

// Kelime havuzu: her modülün başlıkları + seviye dolgusu.
let wid = 1;
for (const m of allModules(COURSE)) {
  for (const w of moduleContent(COURSE, m.level, m.index).words) {
    FAKE_WORDS.push({
      id: wid++,
      de: w.head,
      artikel: /^(der|die|das) /i.test(w.de) ? w.de.split(" ")[0].toLowerCase() : null,
      tr: w.tr,
      en: null,
      formen: null,
      typ: /^(der|die|das) /i.test(w.de) ? "Nomen" : "Verb",
      niveau: m.level,
      beispiel: `Das ist ${w.head}.`,
      beispielTr: `Bu ${w.tr}.`,
      beispielEn: null,
      rank: wid,
      course: COURSE,
    });
  }
}

let errors = 0;
const fail = (where: string, msg: string) => {
  errors++;
  console.error(`✗ ${where}: ${msg}`);
};

async function main() {
  const { buildExam } = await import("../src/lib/exam");
  const { scoreSections, SECTION_ORDER } = await import("../src/lib/exam-types");
  console.log(`Kelime havuzu: ${FAKE_WORDS.length} satır.\n`);

  for (const m of allModules(COURSE)) {
    const where = `${m.level}.${m.index + 1}`;
    const paper = await buildExam("dry", COURSE, m.level as CefrLevel, m.index, "2026-08-24");
    const s = paper.sections;
    const lessons = moduleContent(COURSE, m.level, m.index).lessons.map((l) => l.id);

    if (s.vocab.length !== 6) fail(where, `kelime ${s.vocab.length} (6 olmalı)`);
    if (s.grammar.length !== 6) fail(where, `dilbilgisi ${s.grammar.length} (6 olmalı)`);
    if (s.produce.length !== 5) fail(where, `cümle kurma ${s.produce.length} (5 olmalı)`);
    if (s.reading.length !== 1 || s.reading[0].questions.length !== 2) fail(where, "okuma bölümü eksik");
    if (s.listening.length !== 1 || s.listening[0].questions.length !== 3) fail(where, "dinleme bölümü eksik");
    if (!paper.cover || paper.cover.code !== where) fail(where, `kapak yok ya da yanlış: ${paper.cover?.code}`);
    if (paper.seconds !== 1500) fail(where, `süre ${paper.seconds}`);

    if (!s.grammar.some((g) => g.kind === "judge")) fail(where, "dilbilgisinde ders hükmü yok");
    if (!s.grammar.some((g) => g.kind === "cell")) fail(where, "dilbilgisinde tablo hücresi yok");
    for (const g of s.grammar) {
      if (g.kind !== "cell") continue;
      if (g.answer < 0 || g.answer >= g.options.length) fail(where, `hücre maddesinde dizin bozuk: ${g.id}`);
      if (new Set(g.options).size !== g.options.length) fail(where, `hücre şıklarında tekrar: ${g.id}`);
    }
    for (const g of s.grammar) if (g.kind === "judge" && !lessons.some((id) => g.id.startsWith(`j:${id}#`))) fail(where, `hüküm modül dışından: ${g.id}`);
    for (const p of s.produce) {
      if (!lessons.some((id) => p.id.startsWith(`p:${id}#`))) fail(where, `üretim modül dışından: ${p.id}`);
      if (foldSentence(p.prompt).includes(foldSentence(p.de))) fail(where, `üretim cevabı ele veriyor: ${p.id}`);
      if (p.mode === "order") {
        const a = [...(p.chunks ?? [])].sort().join(" ");
        const b = p.de.trim().split(/\s+/).sort().join(" ");
        if (a !== b) fail(where, `dizme parçaları cümleyle uyuşmuyor: ${p.id}`);
      }
    }
    for (const t of [...s.reading, ...s.listening])
      for (const q of t.questions) {
        if (q.answer < 0 || q.answer >= q.options.length) fail(where, `soru dizini bozuk: ${t.id}`);
        if (new Set(q.options).size !== q.options.length) fail(where, `şıklarda tekrar: ${t.id}`);
      }

    // Tam doğru bir kâğıt %100 ve geçmiş olmalı; boş kâğıt sıfır ve kalmış.
    const full = SECTION_ORDER.map((id) => {
      const total = id === "vocab" ? s.vocab.length : id === "grammar" ? s.grammar.length : id === "produce" ? s.produce.length : id === "reading" ? s.reading.reduce((a, t) => a + t.questions.length, 0) : id === "listening" ? s.listening.reduce((a, t) => a + t.questions.length, 0) : id === "speaking" ? s.speaking.length : s.writing.length;
      return { id, correct: total, total };
    }).filter((x) => x.total > 0);
    const best = scoreSections({ sections: full, writingScore: 100, speakingScore: 100, seconds: 60 }, "module");
    if (best.total !== 100 || !best.passed) fail(where, `tam doğru kâğıt %${best.total}`);
    const worst = scoreSections({ sections: full.map((x) => ({ ...x, correct: 0 })), writingScore: 0, speakingScore: 0, seconds: 60 }, "module");
    if (worst.total !== 0 || worst.passed) fail(where, `boş kâğıt %${worst.total}`);
    const weightSum = best.sections.reduce((a, x) => a + x.weight, 0);
    if (Math.abs(weightSum - 100) > 2) fail(where, `ağırlık toplamı ${weightSum}`);

    const modes = s.produce.map((p) => p.mode).join(",");
    console.log(`${where.padEnd(6)} ${paper.cover?.titleDe.padEnd(32)} bölümler ${SECTION_ORDER.filter((id) => (id === "reading" ? s.reading.length : id === "listening" ? s.listening.length : id === "speaking" ? s.speaking.length : id === "writing" ? s.writing.length : id === "vocab" ? s.vocab.length : id === "grammar" ? s.grammar.length : s.produce.length) > 0).length} · üretim [${modes}]`);
  }

  console.log(`\n${errors ? `✗ ${errors} hata` : "✓ 23 modülün kâğıdı kuruldu, hata yok"}.`);
  process.exit(errors ? 1 : 0);
}

void main();
