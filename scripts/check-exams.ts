/**
 * Modül sınavı doğrulayıcısı.
 *
 * Sınav kâğıdı iki kaynaktan kuruluyor (konuşmadan türetilen maddeler + elle
 * yazılan plan) ve ikisi de sessizce bozulabiliyor: bir modüle konuşma eklenince
 * plan eksik kalır, bir konuşma `focusId` değiştirince dilbilgisi bölümü boşalır,
 * elle yazılan bir soruda doğru şık dizini kayar. Hiçbiri tip hatası vermez —
 * kullanıcı sınava girene kadar da görünmez.
 *
 * Bu betik kâğıdı üretmeden önce üretilebilir olduğunu kanıtlıyor:
 * `npm run test:exams`.
 */
import { targetLangOf } from "../src/lib/courses";
import { selfAnswering } from "../src/lib/conversations/module-content";
import { sourceAllModules as allModules, sourceModuleContent as moduleContent } from "../src/lib/conversations/module-content-source";
import { courseExams, EXAM_COURSES, moduleExamPlan, type ExamQuestion, type ModuleExamPlan } from "../src/lib/conversations/module-exam";
import { foldSentence } from "../src/lib/sentence-match";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";

/**
 * KAĞIT TAŞIYAN HER KURS — sabit `"de"` değil.
 *
 * Betik tek kurs denerken yazıldı ve o gün doğruydu: kâğıt yalnız Almanca
 * kursta vardı. İngilizce kâğıtlar (2026-09-21) eklenince sabit iki yerde
 * yanlış oldu — modül döngüsü İngilizce kursu hiç denemiyordu, "fazladan
 * plan" taraması ise İngilizce planı Almanca modülle eşleştirip yanlışlıkla
 * geçiriyordu (seviye ve dizin aynı, kurs farklı).
 */
const COURSES = EXAM_COURSES;
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

/**
 * Yapabilirlik satırının HEDEF DİLDEKİ öneki.
 *
 * Sertifikaya basılan cümle bu; kalıbın dışına çıkan bir satır listenin
 * ortasında sırıtıyor. Önek Almancada "Ich kann", İngilizcede "I can" —
 * kontrol kâğıdın kursuna göre, çünkü `canDo[].de` alanı hedef dili taşıyor,
 * adı ne olursa olsun (bkz. `module-exam/en/a1.ts` başlığı).
 */
const CANDO_PREFIX: Record<string, string> = { de: "Ich kann", en: "I can" };

function checkPlan(course: string, plan: ModuleExamPlan) {
  const w = `${course}·${plan.code}`;
  const prefix = CANDO_PREFIX[targetLangOf(course)] ?? "";
  if (plan.focus.length < 3) fail(w, `odak sayısı ${plan.focus.length} (en az 3)`);
  if (plan.canDo.length < 4) fail(w, `yapabilirlik satırı ${plan.canDo.length} (en az 4)`);
  for (const c of plan.canDo) {
    if (prefix && !c.de.startsWith(prefix)) warn(w, `yapabilirlik satırı "${prefix}" ile başlamıyor: ${c.de}`);
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

for (const course of COURSES) {
  const modules = allModules(course);
  console.log(`Kurs "${course}": ${modules.length} modül, ${courseExams(course).length} plan.\n`);

  for (const m of modules) {
    const where = `${course}·${m.level}.${m.index + 1}`;
    const content = moduleContent(course, m.level, m.index);
    const plan = moduleExamPlan(course, m.level, m.index);

    if (!plan) {
      fail(where, "modülün sınav planı yok (src/lib/conversations/module-exam)");
      continue;
    }
    if (plan.level !== m.level || plan.index !== m.index) fail(where, `plan başka modülü gösteriyor: ${plan.code}`);
    if (plan.code !== `${m.level}.${m.index + 1}`) fail(where, `plan kodu beklenenden farklı: ${plan.code}`);
    checkPlan(course, plan);

    // Türetilen maddeler kâğıdı doldurabiliyor mu?
    const produce = content.produce.filter((p) => !selfAnswering(p) && p.de.trim().split(/\s+/).length >= 2);
    if (produce.length < NEED.produce) fail(where, `üretim maddesi ${produce.length} (en az ${NEED.produce})`);
    if (content.judge.length < NEED.judge) fail(where, `hüküm maddesi ${content.judge.length} (en az ${NEED.judge})`);
    if (content.words.length < NEED.words) fail(where, `kelime ${content.words.length} (en az ${NEED.words})`);

    console.log(
      `${where.padEnd(10)} ${plan.titleDe.padEnd(34)} üretim ${String(produce.length).padStart(2)} · hüküm ${String(content.judge.length).padStart(2)} · kelime ${content.words.length}`,
    );
  }
  console.log("");
}

// Seviye sınavı beceri bankasından soru çeker (exam.ts, pickTexts). Sınav kâğıdı
// soruyu YALNIZ şıklara basarak çiziyor; boşluk doldurma / kısa cevap / dikte
// soruları beceri bölümünde `options: []` taşır ve süzülmezse ekranda hiç düğme
// çizilmez — seviye sınavı o soruda kilitlenir. exam.ts artık süzüyor; burada
// süzgeçten sonra HER seviyede yeterli malzeme kaldığını doğruluyoruz, yoksa
// düzeltme sessizce boş bir sınav bölümü üretir.
const EXAM_MIN_TEXTS = 2;
/* Banka da KURSUN KENDİSİNDEN süzülüyor (`exam.ts` içindeki süzgecin aynısı).
   Sabit `"de"` yazılıyken İngilizce kursun seviye sınavı hiç ölçülmüyordu —
   oysa aynı açık orada da var: şıksız bir egzersiz kâğıda girerse sınav o
   soruda kilitleniyor. */
for (const course of COURSES) {
  for (const level of ["A1", "A2", "B1", "B2", "C1"] as const) {
    for (const skill of ["reading", "listening"] as const) {
      const list = BUNDLED_EXERCISES.filter(
        (e) => (e.course ?? "de") === course && e.level === level && e.skill === skill,
      );
      const usable = list.filter(
        (e) => ("questions" in e ? e.questions : []).filter((q) => Array.isArray(q.options) && q.options.length >= 2).length > 0,
      );
      const where = `${course}·${level}/${skill}`;
      if (usable.length < EXAM_MIN_TEXTS) {
        fail(where, `sınavda kullanılabilir metin ${usable.length} (en az ${EXAM_MIN_TEXTS}) — şıklı sorusu olan egzersiz yok`);
      }
      const empty = list.length - usable.length;
      console.log(`${where.padEnd(18)} sınav havuzu ${String(usable.length).padStart(3)}/${String(list.length).padStart(3)} metin${empty ? ` · ${empty} egzersizin şıklı sorusu yok` : ""}`);
    }
  }
}

// Fazladan plan (modülü olmayan) da bir tutarsızlık. KURS İÇİNDE karşılaştırılıyor:
// iki kursun modülleri aynı seviye ve dizinde durduğu için kurssuz bir
// karşılaştırma İngilizce planı Almanca modülle eşleştirip geçirirdi.
for (const course of COURSES) {
  const modules = allModules(course);
  for (const plan of courseExams(course)) {
    if (!modules.some((m) => m.level === plan.level && m.index === plan.index))
      fail(`${course}·${plan.code}`, "plana karşılık gelen modül yok");
  }
}

console.log(`\n${errors ? `✗ ${errors} hata` : "✓ hata yok"}${warnings ? `, ${warnings} uyarı` : ""}.`);
process.exit(errors ? 1 : 0);
