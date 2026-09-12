import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 19 — "Kariyeri ne belirliyor, işe alma zinciri,
 * sözleşmedeki kişi, hiç bu kadar zor bulunmadı".
 *
 * Dört ders: What decides a career · The hiring chain ·
 * The person in the contract · Never so hard to find.
 *
 *   Kelime: strategy, networking, supervise, recruit, onboard,
 *           permanent position, fixed term, notice period, hourly wage,
 *           flextime, skilled worker, human resources, overqualified,
 *           self-employment, assertive, conscientious, dedicated,
 *           resilient.
 *   Kalıp:  What decides a career is strategy. ·
 *           It was the leadership style that drove her out. ·
 *           What we aim for is not a dead end. ·
 *           Having read the personnel file, they decided. ·
 *           Asked to supervise, she agreed. ·
 *           Wanting to recruit fast, they cut the selection process. ·
 *           The offer, which is a permanent position, arrived today. ·
 *           The other job, which has a fixed term, pays more. ·
 *           My colleague, whose notice period is short, leaves in May. ·
 *           Never has a skilled worker been so hard to find. ·
 *           Rarely does human resources answer so fast. ·
 *           Only after the test do they call the overqualified.
 *
 * Ünitenin tek öğretme noktası EDİLGEN ORTAÇTA „HAVING BEEN“ DÜŞÜYOR.
 * „Asked to supervise, she agreed“ cümlesi „Having been asked to
 * supervise“ın kısası ve kısa biçim NORMAL olan; uzun biçim dilbilgisel
 * ama ağır. Üstelik „ask“ın aldığı mastar yerinde kalıyor: iki sözcük
 * bütün bir cümleyi taşıyor.
 */
export const enB2U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u19-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 19,
    title: "The hiring chain",
    genre: "info",
    intro: "Üç ortaç, üç ses. Ortadaki neyin kısası?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "middle", tr: "orta" },
      { de: "unit", tr: "ünite" },
      { de: "passive", tr: "edilgen" },
      { de: "whole", tr: "bütün" },
      { de: "sentence", tr: "cümle" },
      { de: "hiring", tr: "işe alma" },
      { de: "whatever", tr: "her ne" },
      { de: "receiving", tr: "alan" },
      { de: "a participle", tr: "ortaç" },
      { de: "the full form", tr: "tam biçim" },
      { de: "throws away", tr: "atıyor" },
      { de: "a deletion", tr: "silme" },
      { de: "optional", tr: "seçimlik" },
      { de: "heavy", tr: "ağır" },
      { de: "an infinitive", tr: "mastar" },
      { de: "stays behind", tr: "geride kalıyor" },
      { de: "an active pair", tr: "etken eşi" },
      { de: "a voice", tr: "çatı" },
      { de: "a signal", tr: "işaret" },
      { de: "receiving", tr: "alan" },
      { de: "whoever", tr: "her kim" },
      { de: "underneath", tr: "altta" },
      { de: "a note", tr: "not" },
    ],
    minutes: 9,
    text:
      "Having read the personnel file, they decided. Asked to supervise, she agreed. Wanting to recruit fast, they cut the selection process. Three participles at the front of three sentences, and the middle one is the one this unit is about.\n" +
      "„Asked to supervise“ is passive, and it is short for something longer. The full form is „Having been asked to supervise“, and English throws away the first two words without losing anything: the reader knows the asking came first, because somebody has to ask before she can agree.\n" +
      "That deletion is not optional politeness. It is the normal form, and „Having been asked to supervise, she agreed“ is correct and reads as heavy in a note that four people will see.\n" +
      "Notice also what „asked“ has kept. „Ask“ takes a person and then an infinitive — ask somebody to do something — and when the person becomes the subject the infinitive stays behind. „Asked to supervise“ carries the whole of the original sentence in two words.\n" +
      "„Wanting to recruit fast“ is the active pair. It is a state, it gives a reason, and it takes an infinitive of its own.\n" +
      "So the three shapes on that page are three voices: one perfect, one passive, one active, and the reader is never told which is which. The only signal is the form of the first word, which is why a hiring note that gets one of them wrong sends the reader back to the top of the paragraph.\n" +
      "The rule underneath has not changed since unit 1. Whoever the main clause is about is the person doing, or receiving, whatever the participle names.",
    questions: [
      {
        text: "What is „Asked to supervise“ short for?",
        options: ["Having been asked to supervise", "She was asked to supervise", "Asking to supervise"],
        answer: 0,
        explain: "„The full form is „Having been asked to supervise“…“",
      },
      {
        text: "What does „asked“ keep?",
        options: ["the infinitive", "the person", "the time"],
        answer: 0,
        explain: "„when the person becomes the subject the infinitive stays behind.“",
      },
      {
        kind: "truefalse",
        text: "The long form is the normal one.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That deletion is not optional politeness. It is the normal form…“",
      },
      {
        kind: "gapfill",
        text: "___ to supervise, she agreed.",
        options: [],
        answer: 0,
        accept: ["Asked", "asked"],
        explain: "„Asked to supervise, she agreed.“",
      },
      {
        kind: "order",
        text: "Üç çatının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Having read the personnel file, they decided.",
          "Asked to supervise, she agreed.",
          "Wanting to recruit fast, they cut the selection process.",
          "Whoever the main clause is about is doing or receiving it.",
        ],
        explain: "Önceki iş, edilgen, etken; en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "What is the only signal?",
        options: [],
        answer: 0,
        accept: ["the first word", "the form of the first word", "its form"],
        explain: "„The only signal is the form of the first word…“",
      },
    ],
  },
  {
    id: "en-b2-u19-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 19,
    title: "Never so hard to find",
    genre: "opinion",
    intro: "Devrik sıra bir ilanda. Kaç tane fazla?",
    gloss: [
      { de: "phrase", tr: "öbek" },
      { de: "sentences", tr: "cümleler" },
      { de: "hiring", tr: "işe alma" },
      { de: "inverted", tr: "devrik" },
      { de: "sentence", tr: "cümle" },
      { de: "an auxiliary", tr: "yardımcı fiil" },
      { de: "an ending", tr: "ek" },
      { de: "restrictive", tr: "sınırlayıcı" },
      { de: "an advertisement", tr: "ilan" },
      { de: "the body", tr: "gövde" },
      { de: "unusual", tr: "alışılmadık" },
      { de: "a promise", tr: "söz" },
      { de: "the field", tr: "alan" },
      { de: "an opening", tr: "açılış" },
      { de: "rare", tr: "seyrek" },
      { de: "honest", tr: "dürüst" },
      { de: "earns", tr: "hak ediyor" },
      { de: "drop", tr: "bırakmak" },
    ],
    minutes: 9,
    text:
      "Never has a skilled worker been so hard to find. „Has“ in front of the subject, and the subject is three words long, which is exactly when this shape earns its place.\n" +
      "Rarely does human resources answer so fast. Present simple, nothing to move, so „does“ arrives to be the thing that moves, and „answer“ loses its ending.\n" +
      "Only after the test do they call the overqualified. A time phrase with „only“, and the same „do“ doing the same job.\n" +
      "Three sentences and the rule has not moved: negative or restrictive at the front, auxiliary before subject, and the change happens in what follows.\n" +
      "Where a page on hiring goes wrong is not the grammar. It is the number. An advertisement that opens with an inverted sentence and then uses two more in the body has told the reader that every line is the most important one.\n" +
      "So the first line gets it, and the rest of the page says what the job pays.\n" +
      "There is one more reason to keep it rare here. The words that follow these openings in this field are the same four every time — assertive, conscientious, dedicated, resilient — and a reader who has seen all four in one advertisement stops reading before the part about self-employment, which was the honest part. An inverted sentence is a promise that something unusual follows. Keep the promise or drop the shape.",
    questions: [
      {
        text: "When does this shape earn its place?",
        options: ["when the subject is long", "when the page is long", "when the job pays well"],
        answer: 0,
        explain: "„the subject is three words long, which is exactly when this shape earns its place.“",
      },
      {
        text: "What does an advertisement with three of them tell the reader?",
        options: ["every line is the most important", "the job is good", "the writer is careful"],
        answer: 0,
        explain: "„has told the reader that every line is the most important one.“",
      },
      {
        kind: "truefalse",
        text: "The problem on a hiring page is the grammar.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Where a page on hiring goes wrong is not the grammar. It is the number.“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ human resources answer so fast.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Rarely does human resources answer so fast.“",
      },
      {
        kind: "order",
        text: "İlanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Never has a skilled worker been so hard to find.",
          "Rarely does human resources answer so fast.",
          "Only after the test do they call the overqualified.",
          "Keep the promise or drop the shape.",
        ],
        explain: "Üç örnek, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "What is an inverted sentence a promise of?",
        options: [],
        answer: 0,
        accept: ["something unusual", "something new", "something important"],
        explain: "„An inverted sentence is a promise that something unusual follows.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u19-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 19,
    title: "The person in the contract",
    genre: "dialogue",
    intro: "Üç ilgi cümlesi bir karşılaştırmada. Kısaltmak iyi mi?",
    gloss: [
      { de: "commas", tr: "virgüller" },
      { de: "anyway", tr: "yine de" },
      { de: "whenever", tr: "her ne zaman" },
      { de: "extra", tr: "fazladan" },
      { de: "shorten", tr: "kısaltmak" },
      { de: "possession", tr: "iyelik" },
      { de: "a summary", tr: "özet" },
      { de: "side by side", tr: "yan yana" },
      { de: "a column", tr: "sütun" },
      { de: "misreads", tr: "yanlış okuyor" },
      { de: "heavier", tr: "daha ağır" },
      { de: "available", tr: "elde olan" },
      { de: "beside", tr: "yanında" },
      { de: "comparing", tr: "karşılaştıran" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Duru", text: "The offer, which is a permanent position, arrived today. Two commas, and the clause is extra: there is one offer and this is a fact about it." },
      { speaker: "Aras", text: "You could shorten that." },
      { speaker: "Duru", text: "The offer, a permanent position, arrived today. „Which is“ goes, and nothing is lost. That is the one on this page that can be shortened." },
      { speaker: "Aras", text: "And the second?" },
      { speaker: "Duru", text: "The other job, which has a fixed term, pays more. „Has“ is not „is“, so the two words stay." },
      { speaker: "Aras", text: "The third has „whose“." },
      { speaker: "Duru", text: "My colleague, whose notice period is short, leaves in May. Possession, and there is nothing to delete." },
      { speaker: "Aras", text: "So one out of three." },
      { speaker: "Duru", text: "One out of three, and I leave it long anyway in a contract summary. A reader comparing two offers wants the same shape on both lines." },
      { speaker: "Aras", text: "Even if it is heavier?" },
      { speaker: "Duru", text: "Heavier is fine when two things have to be read side by side." },
      { speaker: "Duru", text: "The hourly wage, the notice period and the chance of promotion all sit in the same column, and a column with two grammars in it is a column somebody misreads." },
      { speaker: "Aras", text: "And the flextime?" },
      { speaker: "Duru", text: "Flextime is a single word in the table with a yes or a no beside it. No relative clause at all, which is the right answer whenever it is available." },
    ],
    questions: [
      {
        text: "How many of the three can be shortened?",
        options: ["one", "two", "all three"],
        answer: 0,
        explain: "„That is the one on this page that can be shortened.“",
      },
      {
        text: "Why does Duru leave it long?",
        options: ["the two offers are compared", "it sounds better", "the clause is choosing"],
        answer: 0,
        explain: "„A reader comparing two offers wants the same shape on both lines.“",
      },
      {
        kind: "truefalse",
        text: "Flextime gets a relative clause.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No relative clause at all, which is the right answer whenever it is available.“",
      },
      {
        kind: "gapfill",
        text: "My colleague, ___ notice period is short, leaves in May.",
        options: [],
        answer: 0,
        accept: ["whose"],
        explain: "„My colleague, whose notice period is short, leaves in May.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The other job, which has a fixed term, pays more.", "The other job, which has a fixed term, pays more"],
        explain: "„has“ „is“ değil; silme yalnız „be“ye kadar uzanıyor.",
      },
      {
        kind: "short_answer",
        text: "What does a column with two grammars get?",
        options: [],
        answer: 0,
        accept: ["misread", "it is misread", "somebody misreads it"],
        explain: "„a column with two different grammars in it is a column somebody misreads.“",
      },
    ],
  },
  {
    id: "en-b2-u19-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 19,
    title: "What decides a career",
    genre: "monologue",
    intro: "Üç yarık cümle. Hangisi adı konmamış olanı adlandırıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "noun", tr: "isim" },
      { de: "halves", tr: "yarılar" },
      { de: "per", tr: "başına" },
      { de: "sentences", tr: "cümleler" },
      { de: "plain", tr: "yalın" },
      { de: "talent", tr: "yetenek" },
      { de: "a workshop", tr: "atölye" },
      { de: "the light", tr: "ışık" },
      { de: "precisely", tr: "tam da" },
      { de: "unnamed", tr: "adı konmamış" },
      { de: "workload", tr: "iş yükü" },
      { de: "pulling", tr: "çeken" },
      { de: "admitting", tr: "kabul eden" },
      { de: "an object", tr: "nesne" },
      { de: "insisting", tr: "direten" },
      { de: "suspicious", tr: "kuşku uyandıran" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Sedef", text: "What decides a career is strategy. Not talent, not the first job, not who you met in the second year: strategy." },
      { speaker: "Sedef", text: "I would not write that sentence in a report and I say it in a workshop, because the two rooms want different things." },
      { speaker: "Sedef", text: "It was the leadership style that drove her out. The second shape, with the light on a noun, and it answers a question somebody in the room has already asked." },
      { speaker: "Sedef", text: "That one is useful precisely because it names something that is usually left unnamed. People leave jobs and give reasons about workload." },
      { speaker: "Sedef", text: "What we aim for is not a dead end. Both halves pulling against each other, and the sentence is admitting that the thing we aim for and the thing we describe are not the same object." },
      { speaker: "Sedef", text: "A forward-looking plan that ends in a dead end is a plan that was described well and checked late." },
      { speaker: "Sedef", text: "One per section. A page of these is a page insisting, and networking as a topic is already suspicious enough without three sentences telling the reader where to look." },
      { speaker: "Sedef", text: "The workplace atmosphere gets the plain sentences, because it is the part people already believe and the grammar does not have to help." },
    ],
    questions: [
      {
        text: "Where does Sedef say the first sentence?",
        options: ["in a workshop", "in a report", "in a letter"],
        answer: 0,
        explain: "„I would not write that sentence in a report and I say it in a workshop…“",
      },
      {
        text: "What reasons do people give when they leave?",
        options: ["reasons about workload", "reasons about strategy", "reasons about pay"],
        answer: 0,
        explain: "„People leave jobs and give reasons about workload.“",
      },
      {
        kind: "truefalse",
        text: "The workplace atmosphere gets a sentence of that shape.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The workplace atmosphere gets the plain sentences…“",
      },
      {
        kind: "gapfill",
        text: "What decides a career is ___.",
        options: [],
        answer: 0,
        accept: ["strategy"],
        explain: "„What decides a career is strategy.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What we aim for is not a dead end.", "What we aim for is not a dead end"],
        explain: "İki yarı karşı karşıya; bir aday listeden çıkıyor.",
      },
      {
        kind: "short_answer",
        text: "How many of these per section?",
        options: [],
        answer: 0,
        accept: ["one", "one per section", "just one"],
        explain: "„One per section.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u19-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 19,
    title: "Asked to supervise, she agreed",
    genre: "info",
    intro: "Üç ortaç, üç çatı. Hangisinde iki sözcük düşmüş?",
    gloss: [
      { de: "asked to supervise", tr: "denetlemesi istenince" },
      { de: "having read", tr: "okuduktan sonra" },
      { de: "wanting to recruit", tr: "işe almak istediği için" },
      { de: "which is", tr: "olan" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Denetlemesi istenince kabul etti.",
        answer: "Asked to supervise, she agreed.",
        hint: "Edilgen ortaç: „having been“ düşüyor.",
      },
      {
        kind: "build",
        tr: "Özlük dosyasını okuduktan sonra karar verdiler.",
        answer: "Having read the personnel file, they decided.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Hızlı işe almak istediği için seçim sürecini kıstılar.",
        answer: "Wanting to recruit fast, they cut the selection process.",
        hint: "Etken ortaç: bir durum ve bir neden.",
      },
      {
        kind: "build",
        tr: "Kadrolu iş olan teklif bugün geldi.",
        answer: "The offer, which is a permanent position, arrived today.",
        hint: "„which is“ buradan silinebilir.",
      },
      {
        kind: "form",
        prompt: "Ortaç kartını doldur.",
        facts: "„Asked“ edilgen ve „having been“ düşmüş; „Having read“ önceki işi veriyor; „Wanting“ etken ve neden veriyor; özne ana cümleden geliyor.",
        fields: [
          { label: "Passive", answer: "asked", accept: ["having been asked"] },
          { label: "Earlier", answer: "having read", accept: ["the file"] },
          { label: "Active", answer: "wanting", accept: ["a reason"] },
          { label: "The subject", answer: "the main clause", accept: ["from the main clause"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u19-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 19,
    title: "What decides a career is strategy",
    genre: "opinion",
    intro: "İki yarık cümle ve iki devrik sıra.",
    gloss: [
      { de: "what decides", tr: "belirleyen şey" },
      { de: "it was the leadership style", tr: "liderlik tarzıydı" },
      { de: "what we aim for", tr: "hedeflediğimiz şey" },
      { de: "never has", tr: "hiç olmadı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir kariyeri belirleyen şey strateji.",
        answer: "What decides a career is strategy.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Onu gitmeye iten liderlik tarzıydı.",
        answer: "It was the leadership style that drove her out.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "Hedeflediğimiz şey bir çıkmaz değil.",
        answer: "What we aim for is not a dead end.",
        hint: "İki yarı karşı karşıya konuyor.",
      },
      {
        kind: "build",
        tr: "Nitelikli bir eleman hiç bu kadar zor bulunmadı.",
        answer: "Never has a skilled worker been so hard to find.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "İnsan kaynakları nadiren bu kadar hızlı yanıt verir.",
        answer: "Rarely does human resources answer so fast.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
    ],
  },
];
