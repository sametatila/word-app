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
import { existsSync, readFileSync } from "node:fs";
import { targetLangOf, type NativeLang } from "../src/lib/courses";
import { buildModuleContent, danglingReference, examProduceUsable, examStem, leansOnLecture } from "../src/lib/conversations/module-content";
import {
  sourceAllModules as allModules,
  sourceModuleContent as moduleContent,
  sourceModuleConversations as moduleConversations,
} from "../src/lib/conversations/module-content-source";
import { resolveConversation, type NativeDict } from "../src/lib/conversations/native";
import { resolveEnConversation, type DeDict } from "../src/lib/conversations/native-de";
import type { Conversation } from "../src/lib/conversations/types";
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
    const produce = examProduceUsable(content.produce);
    if (produce.length < NEED.produce) fail(where, `üretim maddesi ${produce.length} (en az ${NEED.produce})`);
    /* Sınav maddesi kendi başına durmalı (QA F-0057): "aynı soruyu … sor" gibi önceki adıma yaslanan yönerge. */
    for (const p of produce)
      if (danglingReference(p.prompt)) fail(where, `üretim maddesi önceki adıma yaslanıyor (${p.id}): "${p.prompt}" — kurulacak cümleyi yönergeye yaz`);
    if (content.judge.length < NEED.judge) fail(where, `hüküm maddesi ${content.judge.length} (en az ${NEED.judge})`);
    if (content.words.length < NEED.words) fail(where, `kelime ${content.words.length} (en az ${NEED.words})`);

    console.log(
      `${where.padEnd(10)} ${plan.titleDe.padEnd(34)} üretim ${String(produce.length).padStart(2)} · hüküm ${String(content.judge.length).padStart(2)} · kelime ${content.words.length}`,
    );
  }
  console.log("");
}

/* ------------------------------------------------- yönerge çerçevesi (examStem) */

/*
  SINAV MADDESİ ÇERÇEVEYLE BAŞLAMAZ (2026-10-09).

  Üretim maddesinin yönergesi konuşma adımından geliyor ve konuşmanın öğretmen
  ağzı ("Şimdi sıra sende.", "Jetzt bist du dran.", "One more:") kâğıda
  geçiyordu: liste yalnız iki noktalı "Sıra sende:" biçimini tanıyordu. Önce
  sabit örnekler (kırpma kuralının kendisi), sonra bütün kurslar ve anadiller
  üzerinde kâğıda girebilecek her madde.
*/
const seg = (text: string) => [{ lang: "tr" as const, text }];
const STEM_CASES: { native: NativeLang; say: string; want: string }[] = [
  { native: "tr", say: "Şimdi sıra sende. Şunu İngilizce kur: 'Bir kedim var.'", want: "Şunu İngilizce kur: 'Bir kedim var.'" },
  { native: "tr", say: "Sıra sende. 'Bir kedim var.' nasıl söylersin?", want: "'Bir kedim var.'" },
  { native: "tr", say: "Şimdi sıra sende: 'Bir kedim var.'", want: "'Bir kedim var.'" },
  { native: "tr", say: "Şimdi sıra sende. Deneyelim: 'Bir kedim var.'", want: "'Bir kedim var.'" },
  { native: "tr", say: "Sıra sende, kısa biçimle: 'Sanki hiçbir şey olmamış gibi.'", want: "Kısa biçimle: 'Sanki hiçbir şey olmamış gibi.'" },
  { native: "tr", say: "Şimdi sıra sende. Ekranın kırıldı. Bunu İngilizce nasıl söylersin?", want: "Ekranın kırıldı." },
  /* Sıra işaretinden önceki açıklama anlatıma ait (QA F-0057 ikinci tur). */
  { native: "tr", say: "Ülke yerine şehir de söyleyebilirsin. Sıra sende: \"Ankaralıyım\" cümlesini İngilizce kur.", want: "\"Ankaralıyım\" cümlesini İngilizce kur." },
  { native: "tr", say: "Şimdi sıra sende.", want: "Şimdi sıra sende." },
  { native: "en", say: "One more: 'Will you call me this evening?' — what do you say?", want: "'Will you call me this evening?'" },
  { native: "en", say: "Your turn. You ask: 'What size is this?' — how do you say it?", want: "You ask: 'What size is this?'" },
  { native: "en", say: "Your turn, in the short form: 'As if nothing had happened.'", want: "In the short form: 'As if nothing had happened.'" },
  { native: "de", say: "Jetzt bist du dran. Bilde auf Englisch: „Ich habe eine Katze.“", want: "Bilde auf Englisch: „Ich habe eine Katze.“" },
  { native: "de", say: "Jetzt bist du dran. Ich habe eine Schwester, wie sagst du das?", want: "Ich habe eine Schwester" },
  { native: "de", say: "Noch eins: Wir hätten geduldiger sein müssen.", want: "Wir hätten geduldiger sein müssen." },
  /* ÖNCEKİ ADIMA YASLANAN AÇIKLAMA VE SIRA CÜMLESİ (QA F-0057 ikinci tur). Kâğıtta görülen madde ilk sırada. */
  { native: "tr", say: "Arkasına aradığın yeri eklersin. Şimdi sen söyle: 'Garı arıyorum.'", want: "'Garı arıyorum.'" },
  { native: "en", say: "You add the place you want after it. Now you say: 'I am looking for the station.'", want: "'I am looking for the station.'" },
  { native: "tr", say: "Karar verdin, alıyorsun. Bunu İngilizcede genelde will ile, kısaltarak söyleriz. Şimdi sen söyle: 'Bunu alacağım.'", want: "'Bunu alacağım.'" },
  { native: "tr", say: "Üçüncü kalıbımız bu: My kitchen is brighter than the living room. \"Mutfağım oturma odasından daha aydınlık.\" Şimdi sen kur: \"Odam oturma odasından daha sessiz.\"", want: "\"Odam oturma odasından daha sessiz.\"" },
  { native: "de", say: "Du musst auch fragen können. Die Fragewendung ist die: How often do you…? „Wie oft schaust du in deine Mails?“ Jetzt frag du: „Wie oft gehst du ans Telefon?“", want: "Jetzt frag du: „Wie oft gehst du ans Telefon?“" },
  { native: "tr", say: "Aynen öyle. Bazen dosya henüz hazır değildir; o zaman gelecekten söz edersin. Şunu kur: 'Dosyayı yarın göndereceğim.'", want: "Şunu kur: 'Dosyayı yarın göndereceğim.'" },
  { native: "tr", say: "Kur. \"O beni tanımıyor\" cümlesini İngilizce söyle. Bir kadından bahsediyorsun.", want: "\"O beni tanımıyor\" cümlesini İngilizce söyle. Bir kadından bahsediyorsun." },
  { native: "tr", say: "Son bir cümle kuralım. Sabah dokuzda başlarım.", want: "Sabah dokuzda başlarım." },
  /* Eskiden kâğıtta yalnız "Son bir cümle kuralım." kalıyordu: ipucu kırpması görevi de yutuyordu. */
  { native: "tr", say: "Son bir cümle kuralım. İpucu: Kartımı çoktan yükledim.", want: "Kartımı çoktan yükledim." },
  { native: "tr", say: "Şimdi olumsuzunu sen kur. 'Hiç yurt dışına çıkmadım.'", want: "'Hiç yurt dışına çıkmadım.'" },
  { native: "de", say: "Bilden wir einen letzten Satz. Wie sagst du „Ich besuche meine Familie“?", want: "Wie sagst du „Ich besuche meine Familie“?" },
  { native: "en", say: "Your number is thirty-two fifty. How do you say 'My number is thirty-two fifty.'?", want: "How do you say 'My number is thirty-two fifty.'?" },
  { native: "tr", say: "Şimdi tersini söyle: 'Bu uygun fiyatlı.'", want: "'Bu uygun fiyatlı.'" },
  { native: "tr", say: "Sebep her zaman beden olmak zorunda değil. Bir önceki konuşmadaki kalıpla başka bir sebep söyle: 'Renk hoşuma gitmiyor.'", want: "'Renk hoşuma gitmiyor.'" },
  { native: "tr", say: "Şimdi aynı soruyu ekmek için sen sor. Ekmek var mı?", want: "Ekmek var mı?" },
  { native: "tr", say: "Aynı kuralı erkek için deneyelim. O bu uygulamayı kullanıyor, nasıl denir?", want: "O bu uygulamayı kullanıyor, nasıl denir? Bir erkekten bahsediyorsun." },
  { native: "tr", say: "Sabah erken kalkamıyorsun, daha geç bir saat istiyorsun. Aynı kalıpla sor: Daha geç bir saatiniz var mı?", want: "Daha geç bir saatiniz var mı?" },
  { native: "tr", say: "Şimdi ikisini birleştir. Arkadaşın işe girdiğini söyledi. Ona İngilizce şunu söyle: Tebrikler! Harika haber.", want: "Arkadaşın işe girdiğini söyledi. Ona İngilizce şunu söyle: Tebrikler! Harika haber." },
  { native: "tr", say: "İyi haberi ver: \"Toparlandım, iyileştim.\" İlk kelimemizi present perfect ile kullan.", want: "İyi haberi ver: \"Toparlandım, iyileştim.\"" },
  { native: "tr", say: "Sıra sende. 'Dişim ağrıyor' cümlesini bu kalıpla kur.", want: "'Dişim ağrıyor' cümlesini kur." },
  { native: "de", say: "Wie heißt „Ist es kalt?“ nach derselben Logik? Bilde du es.", want: "Wie heißt „Ist es kalt?“? Bilde du es." },
  /* İçerik taşıyan cümle düşmez: sahne bağlamı ve "'o' bir kadın" gibi çözücü bilgi kalır. */
  { native: "tr", say: "Arkadaşın çok yorgun görünüyor. Ona \"uyumalısın\" de.", want: "Arkadaşın çok yorgun görünüyor. Ona \"uyumalısın\" de." },
  { native: "tr", say: "Tek başına taşındıysan 'Buraya yeni taşındım.' dersin. Bunun Almancası ne olur?", want: "Tek başına taşındıysan 'Buraya yeni taşındım.' dersin. Bunun Almancası ne olur?" },
  { native: "de", say: "Ist die Kaution noch dieselbe?", want: "Ist die Kaution noch dieselbe?" },
];
for (const c of STEM_CASES) {
  const got = examStem(seg(c.say), c.native);
  if (got !== c.want) fail(`examStem(${c.native})`, `"${c.say}" → "${got}", beklenen "${c.want}"`);
}

/** Kâğıtta kalmaması gereken başlangıç: sıra/deneme çerçevesi, üç dilde. */
const FRAME_START =
  /^(Şimdi sıra sende|Sıra sende|Sırada sen varsın|Deneyelim[.:]|Son (bir )?alıştırma[.:]|Jetzt bist du dran|Du bist dran|Probieren wir( es)?[.:]|(Eine )?[Ll]etzte Übung[.:]|Noch eins:|(Now )?(it is |it's )?your turn\b|Your turn\b|Last:|One more:|Now:)/u;
/** Kuyruk soru çerçevesi kırpılınca asılı kalan dil zarfı ("… Bunu İngilizce"). */
const DANGLING_END = /(\s(bunu|Bunu)|\s(İngilizce|Almanca|İngilizcede|Almancada))$/u;

const loadDict = <T,>(file: string): T | null => (existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as T) : null);
const DICT_EN = loadDict<NativeDict>("src/lib/conversations/generated/native-en.json");
const DICT_DE = loadDict<DeDict>("src/lib/conversations/generated/native-de.json");
if (!DICT_EN || !DICT_DE) fail("çerçeve", "anadil sözlüğü yok — önce `npm run conversations:apply && npm run conversations:apply-de`");
/** Kursun kâğıdı hangi anadillerde kuruluyor (çevrilmiş yönergeyle, `moduleProduce`). */
const NATIVES: Record<string, { native: NativeLang; localise: (c: Conversation) => Conversation | null }[]> = {
  de: [
    { native: "tr", localise: (c) => c },
    { native: "en", localise: (c) => (DICT_EN ? resolveConversation(DICT_EN, c) : null) },
  ],
  en: [
    { native: "tr", localise: (c) => c },
    { native: "de", localise: (c) => (DICT_DE ? resolveEnConversation(DICT_DE, c) : null) },
  ],
};
let framed = 0;
let leaning = 0;
let stems = 0;
for (const course of COURSES) {
  for (const { native, localise } of NATIVES[course] ?? []) {
    for (const m of allModules(course)) {
      const convs = moduleConversations(course, m.level, m.index).map((c) => localise(c) ?? c);
      for (const p of examProduceUsable(buildModuleContent(course, m.level, m.index, convs, native).produce)) {
        stems++;
        if (FRAME_START.test(p.prompt) || DANGLING_END.test(p.prompt)) {
          if (++framed <= 8) fail(`${course}·${native}·${p.id}`, `yönerge çerçeveyle başlıyor ya da asılı bitiyor: "${p.prompt}" — LEAD_INS/TAIL_OUTS (module-content)`);
        }
        /* Madde tek başına anlaşılmalı (QA F-0057): önceki adıma yaslanan söz kalmaz ve görev boş değil. */
        if (leansOnLecture(p.prompt) || !/\p{L}{3,}/u.test(p.prompt)) {
          if (++leaning <= 8) fail(`${course}·${native}·${p.id}`, `yönerge önceki adıma yaslanıyor ya da görev yok: "${p.prompt}" — dropLecture/BACKREF (module-content)`);
        }
      }
    }
  }
}
if (framed > 8) fail("çerçeve", `${framed - 8} madde daha`);
if (leaning > 8) fail("önceki adım", `${leaning - 8} madde daha`);
console.log(
  `Yönerge çerçevesi: ${stems} madde (iki kurs, üç anadil), ${STEM_CASES.length} sabit örnek${framed ? `, ${framed} çerçeveli` : ", temiz"}${leaning ? `, ${leaning} önceki adıma yaslanıyor` : ""}.\n`,
);

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
