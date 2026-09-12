import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 6 — "İkinci elden haber, tamamlandığında, yüzey
 * işlemi, yapılmış olacak".
 *
 * Dört ders: As it is reported · Once completed ·
 * The treatment of the surface · It will have been done.
 *
 *   Kelime: origin, verify, accuracy, disclose, conceal, withhold,
 *           validate, certify, filter, mix, load, crate, glue, component,
 *           unload, gauge, treat, refine, requirement, yield, input,
 *           deviation, guideline, provision, pilot, prototype, quantity,
 *           proportion, portion, length, width, height.
 *   Kalıp:  It is reported that the origin is unclear. ·
 *           The figures are said to verify the claim. ·
 *           The accuracy is thought to be high. ·
 *           Having filtered the liquid, mix the powder. ·
 *           Being loaded first, the crate arrives last. ·
 *           Glued on Monday, the component was tested. ·
 *           The treatment of the surface took two hours. ·
 *           The refinement of the process is ongoing. ·
 *           The requirement of a second check is clear. ·
 *           By June the pilot will have been finished. ·
 *           This time next month we will be testing the prototype. ·
 *           The quantity will have been checked by then.
 *
 * Ünitenin tek öğretme noktası TALİMATTA ORTACIN YAZILMAYAN ÖZNESİ.
 * „Having filtered the liquid, mix the powder“ — ikinci yarı emir kipi,
 * yani gizli öznesi „sen“; ortaç öznesini ana cümleden aldığı için o da
 * „sen“. Kural bozulmuş gibi görünürken tam tersine korunuyor, ve bu
 * yüzden „Having filtered the liquid, the powder is mixed“ yanlış:
 * süzme işi toza geçiyor.
 */
export const enB2U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u06-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 6,
    title: "Once completed",
    genre: "info",
    intro: "İki yarının da öznesi yazılmıyor. Yine de aynı mı?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "participle", tr: "ortaç" },
      { de: "belong", tr: "ait olmak" },
      { de: "seems", tr: "görünüyor" },
      { de: "sentence", tr: "cümle" },
      { de: "action", tr: "eylem" },
      { de: "survive", tr: "sağ kalmak" },
      { de: "an imperative", tr: "emir kipi" },
      { de: "hidden", tr: "gizli" },
      { de: "wasted", tr: "boşa giden" },
      { de: "a defect", tr: "kusur" },
      { de: "technical", tr: "teknik" },
      { de: "survives", tr: "sağ kalıyor" },
      { de: "straight past", tr: "hiç takılmadan" },
      { de: "a situation", tr: "durum" },
      { de: "commonest", tr: "en yaygın" },
      { de: "trusting", tr: "güvenmek" },
      { de: "broken", tr: "bozulmuş" },
      { de: "kept", tr: "korunmuş" },
      { de: "a review", tr: "gözden geçirme" },
    ],
    minutes: 9,
    text:
      "Having filtered the liquid, mix the powder. Two halves, and between them the most useful thing a set of instructions can carry: an order of work, with nothing wasted on saying so.\n" +
      "The interesting part is the subject, because neither half has one on the page. The second half is an imperative, and an imperative always has the same hidden subject: you. The first half is a participle, and a participle takes its subject from the main clause. So both halves belong to you, and the rule that seems broken here is in fact being kept.\n" +
      "That is why the wrong version is wrong. „Having filtered the liquid, the powder is mixed“ gives the filtering to the powder. It is the commonest defect in technical writing and it survives every review, because the reader knows what was meant and reads straight past it.\n" +
      "Being loaded first, the crate arrives last. The same shape without a time gap: the loading and the arriving are one situation, and the sentence is explaining an order rather than an action.\n" +
      "Glued on Monday, the component was tested. The third form again, so the gluing was done by somebody the sentence does not name — which in a process note is normal, because the person who glues is not the point.\n" +
      "So a page of instructions has three shapes and one rule. Put the reader in the main clause and keep them there. The moment a component becomes the subject of the second half, every participle in front of it is pointing at the wrong thing, and a careful reader stops trusting the page before finding out why.",
    questions: [
      {
        text: "What is the hidden subject of an imperative?",
        options: ["you", "it", "the writer"],
        answer: 0,
        explain: "„an imperative always has the same hidden subject: you.“",
      },
      {
        text: "Why does the wrong version survive review?",
        options: ["the reader knows what was meant", "it is shorter", "it is hidden"],
        answer: 0,
        explain: "„it survives every review, because the reader knows what was meant and reads straight past it.“",
      },
      {
        kind: "truefalse",
        text: "The rule about the subject is broken in an instruction.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the rule that seems broken here is in fact being kept.“",
      },
      {
        kind: "gapfill",
        text: "___ filtered the liquid, mix the powder.",
        options: [],
        answer: 0,
        accept: ["Having", "having"],
        explain: "„Having filtered the liquid, mix the powder.“",
      },
      {
        kind: "order",
        text: "Talimatın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Having filtered the liquid, mix the powder.",
          "Being loaded first, the crate arrives last.",
          "Glued on Monday, the component was tested.",
          "Put the reader in the main clause and keep them there.",
        ],
        explain: "Üç biçim, en sonda tek kural.",
      },
      {
        kind: "short_answer",
        text: "What does the wrong version give to the powder?",
        options: [],
        answer: 0,
        accept: ["the filtering", "filtering", "the first half"],
        explain: "„gives the filtering to the powder.“",
      },
    ],
  },
  {
    id: "en-b2-u06-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 6,
    title: "As it is reported",
    genre: "opinion",
    intro: "Kaynaksız cümlenin iki saniyelik sınaması.",
    gloss: [
      { de: "standing", tr: "arkasında durmak" },
      { de: "nouns", tr: "isimler" },
      { de: "sentence", tr: "cümle" },
      { de: "passive", tr: "edilgen" },
      { de: "verb", tr: "fiil" },
      { de: "either", tr: "ikisinden biri" },
      { de: "real", tr: "gerçek" },
      { de: "accurate", tr: "isabetli" },
      { de: "none", tr: "hiçbiri" },
      { de: "scanning", tr: "göz gezdiren" },
      { de: "an opinion", tr: "görüş" },
      { de: "a field", tr: "alan" },
      { de: "the test", tr: "sınama" },
      { de: "a laboratory", tr: "laboratuvar" },
      { de: "earns", tr: "hak ediyor" },
      { de: "reach for", tr: "uzanmak" },
      { de: "checked", tr: "denetlenmiş" },
      { de: "hides", tr: "gizliyor" },
      { de: "the fact", tr: "olgu" },
      { de: "an infinitive", tr: "mastar" },
      { de: "the route", tr: "yol" },
      { de: "feels", tr: "hissettiriyor" },
    ],
    minutes: 9,
    text:
      "It is reported that the origin is unclear. Six words before anything is said, and they are all doing the same job: this is what we have been told, and we are not yet standing behind it.\n" +
      "The figures are said to verify the claim. The shorter route, and the one this kind of note prefers: the subject comes first, the infinitive follows, and a reader scanning the page finds the nouns where they expect them.\n" +
      "The accuracy is thought to be high. That one is worth stopping on, because it is the sentence that most often hides the fact that nobody has checked. Thought by whom? If the answer is „by the person who wrote the line“, the passive has been used to make one opinion look like a field of them.\n" +
      "There is a clean test and it takes two seconds. Put a name in front of the verb. „The laboratory reports that the origin is unclear“ either reads as true or it does not, and if it does not, the passive version was never true either.\n" +
      "Where the form earns its place is where the source is real and long. Four teams verify, three of them certify, and naming one would be less accurate than naming none.\n" +
      "Where it does not is everywhere else, and the honest reason people reach for it is that a sentence with no source in it cannot be checked, which feels for a moment like a sentence that cannot be wrong.",
    questions: [
      {
        text: "What is the two-second test?",
        options: ["put a name in front of the verb", "count the words", "read it out loud"],
        answer: 0,
        explain: "„There is a clean test and it takes two seconds. Put a name in front of the verb.“",
      },
      {
        text: "When does the form earn its place?",
        options: ["when the source is real and long", "when the note is short", "when nobody has checked"],
        answer: 0,
        explain: "„Where the form earns its place is where the source is real and long.“",
      },
      {
        kind: "truefalse",
        text: "A sentence with no source cannot be wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„which feels for a moment like a sentence that cannot be wrong.“",
      },
      {
        kind: "gapfill",
        text: "The accuracy is thought to be ___.",
        options: [],
        answer: 0,
        accept: ["high"],
        explain: "„The accuracy is thought to be high.“",
      },
      {
        kind: "order",
        text: "Notun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It is reported that the origin is unclear.",
          "The figures are said to verify the claim.",
          "The accuracy is thought to be high.",
          "Put a name in front of the verb.",
        ],
        explain: "Uzun yol, kısa yol, saklanan cümle, en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "How many teams verify?",
        options: [],
        answer: 0,
        accept: ["four", "4", "four teams"],
        explain: "„Four teams verify, three of them certify…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u06-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 6,
    title: "The treatment of the surface",
    genre: "dialogue",
    intro: "Süreç notu isimlerle yazılıyor. Ek nereden geliyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "verbs", tr: "fiiller" },
      { de: "deviate", tr: "sapmak" },
      { de: "deviatement", tr: "yanlış biçim" },
      { de: "verb", tr: "fiil" },
      { de: "entirely", tr: "tümüyle" },
      { de: "noun", tr: "isim" },
      { de: "sentence", tr: "cümle" },
      { de: "above", tr: "yukarıda" },
      { de: "a log", tr: "kayıt defteri" },
      { de: "an ending", tr: "ek" },
      { de: "reliable", tr: "güvenilir" },
      { de: "memorised", tr: "ezberlenmiş" },
      { de: "ongoing", tr: "süregelen" },
      { de: "a stage", tr: "aşama" },
      { de: "an instruction", tr: "talimat" },
      { de: "figures", tr: "rakamlar" },
      { de: "argue", tr: "tartışmak" },
      { de: "an accident", tr: "rastlantı" },
      { de: "nowhere", tr: "hiçbir yer" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Işıl", text: "The treatment of the surface took two hours. That is how the whole log reads, and it is not an accident." },
      { speaker: "Berk", text: "Nouns everywhere." },
      { speaker: "Işıl", text: "Treat becomes treatment, refine becomes refinement, require becomes requirement. Three verbs, one ending, and then the ending stops being reliable: deviate becomes deviation, not deviatement." },
      { speaker: "Berk", text: "So the endings are memorised." },
      { speaker: "Işıl", text: "Every one of them. There is no rule in English for which verb takes which, and a process note is written almost entirely in these." },
      { speaker: "Berk", text: "Why not just write the verbs?" },
      { speaker: "Işıl", text: "Because a noun can carry a number. „The treatment took two hours“ has a time in it; „we treated the surface“ has nowhere to put one." },
      { speaker: "Berk", text: "And the refinement?" },
      { speaker: "Işıl", text: "The refinement of the process is ongoing, which is a sentence with no date and no person, and that is exactly what the guideline wants at this stage." },
      { speaker: "Berk", text: "The second check?" },
      { speaker: "Işıl", text: "The requirement of a second check is clear. That one is a provision, so it is written as a thing and not as an instruction; the instruction is on the other page." },
      { speaker: "Berk", text: "And the yield?" },
      { speaker: "Işıl", text: "The yield goes in figures, with the input next to it. Every line above it can be a noun. That line is the one somebody will argue about, so it gets numbers." },
    ],
    questions: [
      {
        text: "What does „deviate“ become?",
        options: ["deviation", "deviatement", "refinement"],
        answer: 0,
        explain: "„deviate becomes deviation, not deviatement.“",
      },
      {
        text: "Why write the noun and not the verb?",
        options: ["a noun can carry a number", "a noun is shorter", "a noun is older"],
        answer: 0,
        explain: "„Because a noun can carry a number.“",
      },
      {
        kind: "truefalse",
        text: "There is a rule for which verb takes which ending.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is no rule in English for which verb takes which…“",
      },
      {
        kind: "gapfill",
        text: "The treatment of the surface took ___ hours.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„The treatment of the surface took two hours.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The requirement of a second check is clear.", "The requirement of a second check is clear"],
        explain: "Hüküm bir şey olarak yazılıyor, talimat olarak değil.",
      },
      {
        kind: "short_answer",
        text: "Which line gets numbers?",
        options: [],
        answer: 0,
        accept: ["the yield", "yield", "the last one"],
        explain: "„That line is the one somebody will argue about, so it gets numbers.“",
      },
    ],
  },
  {
    id: "en-b2-u06-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 6,
    title: "It will have been done",
    genre: "monologue",
    intro: "Dört sözcüklük fiil. Kim yapacağı yazmıyor.",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "passive", tr: "edilgen" },
      { de: "sentence", tr: "cümle" },
      { de: "sentences", tr: "cümleler" },
      { de: "real", tr: "gerçek" },
      { de: "places", tr: "yerler" },
      { de: "named", tr: "adı verilen" },
      { de: "a plan", tr: "plan" },
      { de: "a state", tr: "durum" },
      { de: "a placeholder", tr: "yer tutucu" },
      { de: "earns its keep", tr: "ekmeğini çıkarıyor" },
      { de: "a measure", tr: "ölçü" },
      { de: "hope", tr: "umut" },
      { de: "arranged", tr: "ayarlanmış" },
      { de: "against", tr: "karşısına" },
      { de: "the bottom", tr: "alt" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Pınar", text: "By June the pilot will have been finished. Four words of verb, and they never change places: will, have, been, and then the third form." },
      { speaker: "Pınar", text: "It is the passive of a sentence about a future point. Stand in June, look back, and the pilot is behind you — and nobody is named as the one who finished it." },
      { speaker: "Pınar", text: "That last part is the reason this shape lives in a plan rather than in a letter. A plan is about states, not about people." },
      { speaker: "Pınar", text: "This time next month we will be testing the prototype. Inside the work instead of after it, and the honest form for anything that takes a week." },
      { speaker: "Pınar", text: "The quantity will have been checked by then. The same four words again, and this is where the shape earns its keep: I do not know yet who will check it." },
      { speaker: "Pınar", text: "A proportion of these sentences are promises and the rest are placeholders, and the reader cannot tell which is which. That is a real cost." },
      { speaker: "Pınar", text: "So I keep a short list at the bottom of the plan with a name against every future perfect. The plan reads as a plan; the list is what I take to the meeting." },
      { speaker: "Pınar", text: "The length of the list is the only honest measure of how much of the page is arranged and how much of it is hope." },
    ],
    questions: [
      {
        text: "What is a plan about?",
        options: ["states", "people", "letters"],
        answer: 0,
        explain: "„A plan is about states, not about people.“",
      },
      {
        text: "Why does the passive earn its keep there?",
        options: ["nobody knows who will check", "it is shorter", "it is formal"],
        answer: 0,
        explain: "„this is where the shape earns its keep: I do not know yet who will check it.“",
      },
      {
        kind: "truefalse",
        text: "The reader can tell the promises from the placeholders.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the reader cannot tell which is which. That is a real cost.“",
      },
      {
        kind: "gapfill",
        text: "By June the pilot will have been ___.",
        options: [],
        answer: 0,
        accept: ["finished"],
        explain: "„By June the pilot will have been finished.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The quantity will have been checked by then.", "The quantity will have been checked by then"],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does Pınar keep at the bottom?",
        options: [],
        answer: 0,
        accept: ["a short list", "a list of names", "a list"],
        explain: "„I keep a short list at the bottom of the plan with a name against every future perfect.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u06-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 6,
    title: "Having filtered the liquid, mix the powder",
    genre: "info",
    intro: "Talimatta üç ortaç. Özne nerede duruyor?",
    gloss: [
      { de: "having filtered", tr: "süzdükten sonra" },
      { de: "being loaded", tr: "yüklendiği için" },
      { de: "glued", tr: "yapıştırılan" },
      { de: "the treatment", tr: "işlemden geçirilmesi" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sıvıyı süzdükten sonra tozu karıştır.",
        answer: "Having filtered the liquid, mix the powder.",
        hint: "İki yarının da öznesi aynı: yazılmayan „sen“.",
      },
      {
        kind: "build",
        tr: "Önce yüklendiği için sandık en son varıyor.",
        answer: "Being loaded first, the crate arrives last.",
        hint: "Aynı anda olan iş: yalın „-ing“.",
      },
      {
        kind: "build",
        tr: "Pazartesi yapıştırılan bileşen sınandı.",
        answer: "Glued on Monday, the component was tested.",
        hint: "Üçüncü hâlle başlıyor: yapıştıran söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Yüzeyin işlemden geçirilmesi iki saat sürdü.",
        answer: "The treatment of the surface took two hours.",
        hint: "İsim bir sayı taşıyabiliyor; fiil taşıyamıyor.",
      },
      {
        kind: "form",
        prompt: "Talimat kartını doldur.",
        facts: "Emir kipinin gizli öznesi „sen“; ortaç öznesini ana cümleden alıyor; ikisi de aynı; toz süzmüyor.",
        fields: [
          { label: "Imperative", answer: "you", accept: ["the reader"] },
          { label: "Participle", answer: "the main clause", accept: ["from the main clause"] },
          { label: "Both halves", answer: "the same subject", accept: ["the same"] },
          { label: "The wrong version", answer: "the powder filters", accept: ["gives it to the powder"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u06-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 6,
    title: "It is reported that the origin is unclear",
    genre: "info",
    intro: "Kaynaksız üç cümle ve bitmiş bir gelecek.",
    gloss: [
      { de: "it is reported that", tr: "bildiriliyor ki" },
      { de: "are said to verify", tr: "doğruladığı söyleniyor" },
      { de: "is thought to be", tr: "olduğu düşünülüyor" },
      { de: "will have been finished", tr: "bitirilmiş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kökenin belirsiz olduğu bildiriliyor.",
        answer: "It is reported that the origin is unclear.",
        hint: "Uzun yol: „it“ özne, rapor „that“ cümleciğinde.",
      },
      {
        kind: "build",
        tr: "Rakamların iddiayı doğruladığı söyleniyor.",
        answer: "The figures are said to verify the claim.",
        hint: "Kısa yol: özne öne çıkıyor, geriye mastar kalıyor.",
      },
      {
        kind: "build",
        tr: "Doğruluğun yüksek olduğu düşünülüyor.",
        answer: "The accuracy is thought to be high.",
        hint: "Sınama: fiilin önüne bir ad koy, cümle hâlâ doğru mu?",
      },
      {
        kind: "build",
        tr: "Haziranda pilot uygulama bitirilmiş olacak.",
        answer: "By June the pilot will have been finished.",
        hint: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Miktar o zamana kadar denetlenmiş olacak.",
        answer: "The quantity will have been checked by then.",
        hint: "Aynı dört sözcük; kimin denetleyeceği belli değil.",
      },
    ],
  },
];
