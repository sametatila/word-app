/**
 * Modül sınavı doğrulayıcısı.
 *
 * Sınav kâğıdı iki kaynaktan kuruluyor (dersten türetilen maddeler + elle
 * yazılan plan) ve ikisi de sessizce bozulabiliyor: bir modüle ders eklenince
 * plan eksik kalır, bir ders `focusId` değiştirince dilbilgisi bölümü boşalır,
 * elle yazılan bir soruda doğru şık dizini kayar. Hiçbiri tip hatası vermez —
 * kullanıcı sınava girene kadar da görünmez.
 *
 * Bu betik kâğıdı üretmeden önce üretilebilir olduğunu kanıtlıyor:
 * `npm run test:exams`.
 */
import { levelIndex } from "../src/lib/lessons";
import { allModules, moduleContent, selfAnswering } from "../src/lib/lessons/module-content";
import { MODULE_EXAMS, moduleExamPlan, type ExamQuestion, type ModuleExamPlan } from "../src/lib/lessons/module-exam";
import { foldSentence } from "../src/lib/sentence-match";

const COURSE = "de";
/** Kâğıdın istediği en az madde sayısı (bkz. COUNTS, lib/exam.ts). */
const NEED = { produce: 5, judge: 3, cell: 3, words: 6 };

let errors = 0;
let warnings = 0;
const fail = (where: string, msg: string) => {
  errors++;
  console.error(`✗ ${where}: ${msg}`);
};
const warn = (where: string, msg: string) => {
  warnings++;
  console.warn(`! ${where}: ${msg}`);
};


/** Soru gövdesi: dört ayrı şık, geçerli dizin, iki dilde kök. */
function checkQuestion(where: string, q: ExamQuestion) {
  if (!q.de.trim()) fail(where, "soru kökü (de) boş");
  if (!q.tr.trim()) fail(where, "soru kökü (tr) boş");
  if (q.options.length !== 4) fail(where, `şık sayısı ${q.options.length} (4 olmalı)`);
  if (q.answer < 0 || q.answer >= q.options.length) fail(where, `doğru şık dizini ${q.answer} sınırların dışında`);
  const folded = q.options.map((o) => foldSentence(o));
  if (new Set(folded).size !== folded.length) fail(where, "şıklarda tekrar var");
  if (q.options.some((o) => !o.trim())) fail(where, "boş şık var");
}

function checkPlan(plan: ModuleExamPlan) {
  const w = plan.code;
  if (plan.focus.length < 3) fail(w, `odak sayısı ${plan.focus.length} (en az 3)`);
  if (plan.canDo.length < 4) fail(w, `yapabilirlik satırı ${plan.canDo.length} (en az 4)`);
  for (const c of plan.canDo) {
    if (!c.de.startsWith("Ich kann")) warn(w, `yapabilirlik Almancası "Ich kann" ile başlamıyor: ${c.de}`);
    if (!c.tr.trim() || !c.en.trim()) fail(w, `yapabilirlik satırında eksik dil: ${c.de}`);
  }

  const l = plan.listening;
  if (l.turns.length < 4) fail(w, `dinleme diyaloğu ${l.turns.length} replik (en az 4)`);
  if (l.questions.length < 3) fail(w, `dinleme sorusu ${l.questions.length} (en az 3)`);
  if (!l.situation.trim()) fail(w, "dinleme durumu (Türkçe) boş");
  for (const t of l.turns) {
    if (!t.de.trim() || !t.tr.trim()) fail(w, `eksik replik: ${t.speaker}`);
    if (!t.speaker.trim()) fail(w, "repliğin konuşanı yok");
  }
  l.questions.forEach((q, i) => checkQuestion(`${w} · Hören s${i + 1}`, q));

  const r = plan.reading;
  if (r.questions.length < 2) fail(w, `okuma sorusu ${r.questions.length} (en az 2)`);
  if (r.text.trim().length < 120) fail(w, `okuma metni çok kısa (${r.text.trim().length} karakter)`);
  if (!r.genre.trim()) fail(w, "okuma metninin türü boş");
  r.questions.forEach((q, i) => checkQuestion(`${w} · Lesen s${i + 1}`, q));

  if (plan.speaking.length < 2) fail(w, `konuşma maddesi ${plan.speaking.length} (en az 2)`);
  for (const s of plan.speaking) {
    if (s.de.trim().split(/\s+/).length < 4) fail(w, `konuşma cümlesi çok kısa: ${s.de}`);
    if (!s.tr.trim() || !s.situation.trim()) fail(w, `konuşma maddesinde eksik alan: ${s.de}`);
  }

  const wr = plan.writing;
  if (wr.checklist.length < 3) fail(w, `yazma kontrol listesi ${wr.checklist.length} madde (en az 3)`);
  if (wr.phrases.length < 3) fail(w, `yazma kalıbı ${wr.phrases.length} (en az 3)`);
  if (wr.phrases.some((p) => !p.en)) warn(w, "yazma kalıplarından birinde İngilizce karşılık yok");
  if (wr.minWords < 25) fail(w, `yazma en az kelime ${wr.minWords} (25 altı ölçmez)`);
  const sampleWords = wr.sample.trim().split(/\s+/).length;
  if (sampleWords < wr.minWords) fail(w, `örnek cevap ${sampleWords} kelime, istenen en az ${wr.minWords}`);

  // Doğru şıkkın sırası burada denetlenmiyor: kâğıt kurulurken şıklar tohumlu
  // karıştırılıyor (`shuffleQuestion`, lib/exam.ts), yani yazarken oluşan
  // sıra alışkanlığı kullanıcıya hiç ulaşmıyor.
}

/* ------------------------------------------------------------------ modüller */

const modules = allModules(COURSE);
console.log(`Kurs "${COURSE}": ${modules.length} modül, ${MODULE_EXAMS.length} plan.\n`);

for (const m of modules) {
  const where = `${m.level}.${m.index + 1}`;
  const content = moduleContent(COURSE, m.level, m.index);
  const plan = moduleExamPlan(m.level, m.index);

  if (!plan) {
    fail(where, "modülün sınav planı yok (src/lib/lessons/module-exam)");
    continue;
  }
  if (plan.level !== m.level || plan.index !== m.index) fail(where, `plan başka modülü gösteriyor: ${plan.code}`);
  if (plan.code !== `${m.level}.${m.index + 1}`) fail(where, `plan kodu beklenenden farklı: ${plan.code}`);
  checkPlan(plan);

  // Türetilen maddeler kâğıdı doldurabiliyor mu?
  const produce = content.produce.filter((p) => !selfAnswering(p) && p.de.trim().split(/\s+/).length >= 2);
  if (produce.length < NEED.produce) fail(where, `üretim maddesi ${produce.length} (en az ${NEED.produce})`);
  if (content.judge.length < NEED.judge) fail(where, `hüküm maddesi ${content.judge.length} (en az ${NEED.judge})`);
  if (content.words.length < NEED.words) fail(where, `kelime ${content.words.length} (en az ${NEED.words})`);

  console.log(
    `${where.padEnd(6)} ${plan.code.padEnd(6)} ${plan.titleDe.padEnd(32)} üretim ${String(produce.length).padStart(2)} · hüküm ${String(content.judge.length).padStart(2)} · kelime ${content.words.length}`,
  );
}

// Fazladan plan (modülü olmayan) da bir tutarsızlık.
for (const plan of MODULE_EXAMS) {
  if (!modules.some((m) => m.level === plan.level && m.index === plan.index)) fail(plan.code, "plana karşılık gelen modül yok");
}

console.log(`\n${errors ? `✗ ${errors} hata` : "✓ hata yok"}${warnings ? `, ${warnings} uyarı` : ""}.`);
process.exit(errors ? 1 : 0);
