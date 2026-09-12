import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 13 — "Belgeler, itiraz, çalışma planı, sınav".
 *
 * Dört ders: The papers they need · Appealing the decision ·
 * My study plan · Before the exam.
 *
 *   Kelime: document, copy, original, translate, valid, folder, missing,
 *           required, appeal, reject, insist, evidence, prove, right,
 *           response, patient, revise, chapter, topic, weekly,
 *           concentrate, break, routine, planner, exam, pass, fail,
 *           nervous, practice, mark, grade, cheat.
 *   Kalıp:  The document that they need is the original. ·
 *           The copy I sent was not valid. ·
 *           The woman who checked it asked for more. ·
 *           I decided to appeal against the decision. ·
 *           They insisted on seeing the original. ·
 *           I have the right to ask for a review. ·
 *           I am starting the new chapter on Monday. ·
 *           I am going to revise every evening. ·
 *           I will take a break at nine. ·
 *           You must bring your card to the exam. ·
 *           You mustn't cheat in the test. ·
 *           You should do more practice.
 *
 * Ünitenin tek öğretme noktası ŞUNU ÖNCEKİ SÖZCÜK BELİRLİYOR. Üç satır
 * üç ayrı biçim istiyor ve hiçbiri mantıktan çıkmıyor: „decided TO
 * appeal“ mastar, „insisted ON seeing“ edat + „-ing“, „the right TO ask“
 * ise bir İSMİN aldığı mastar. Aynı anlam üç kez, üç ayrı kalıpla; seçim
 * anlamın değil, önceki sözcüğün işi.
 */
export const enB1U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u13-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 13,
    title: "Appealing the decision",
    genre: "story",
    intro: "Bir ret ve itiraz. Hangi belge sorunu çözüyor?",
    gloss: [
      { de: "rejected", tr: "reddedildi" },
      { de: "the right to", tr: "hakkı" },
      { de: "in the meantime", tr: "bu arada" },
      { de: "the ninth", tr: "dokuzu" },
      { de: "translation", tr: "çeviri" },
      { de: "translator", tr: "çevirmen" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 7,
    text:
      "The application was rejected on the ninth of April for one reason: a missing document.\n" +
      "The document that they need is the original. I had sent a copy, translated, with a stamp from the office that translated it. The copy I sent was not valid, and nobody told me that on the phone in March when I asked exactly this question.\n" +
      "I decided to appeal against the decision. Not because I was angry — because the rule they used is written in one line and that line has two readings.\n" +
      "They insisted on seeing the original. I brought it in person on the twenty-first. The woman who checked it asked for more: the original, the translation, and the receipt from the translator.\n" +
      "I have the right to ask for a review. That sentence is on the back of the letter, in the same size as everything else, and I had read the letter twice without finding it.\n" +
      "In the meantime the case is being reviewed and nothing is decided. I have learned one thing that is worth more than the document: ask what happens if the answer is no, on the first day, while everybody is still friendly.",
    questions: [
      {
        text: "Why was the application rejected?",
        options: ["a missing document", "a late application", "a wrong address"],
        answer: 0,
        explain: "„The application was rejected on the ninth of April for one reason: a missing document.“",
      },
      {
        text: "What did the woman ask for?",
        options: ["the original, the translation and the receipt", "only the original", "a new application"],
        answer: 0,
        explain: "„The woman who checked it asked for more: the original, the translation, and the receipt from the translator.“",
      },
      {
        kind: "truefalse",
        text: "The right to ask for a review was hard to find.",
        options: ["True", "False"],
        answer: 0,
        explain: "„…in the same size as everything else, and I had read the letter twice without finding it.“",
      },
      {
        kind: "gapfill",
        text: "The application was rejected on the ninth of ___.",
        options: [],
        answer: 0,
        accept: ["April"],
        explain: "„The application was rejected on the ninth of April…“",
      },
      {
        kind: "order",
        text: "Olayların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I sent a translated copy.",
          "The application was rejected.",
          "I decided to appeal against the decision.",
          "I brought the original in person.",
        ],
        explain: "Kopya, ret, itiraz kararı, asıl belgenin götürülmesi.",
      },
      {
        kind: "short_answer",
        text: "What has the writer learned?",
        options: [],
        answer: 0,
        accept: ["ask what happens if no", "ask on the first day", "ask early"],
        explain: "„ask what happens if the answer is no, on the first day…“",
      },
    ],
  },
  {
    id: "en-b1-u13-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 13,
    title: "My study plan",
    genre: "blog",
    intro: "Dört haftalık bir plan. Hangi cümle ayarlanmış, hangisi karar?",
    gloss: [
      { de: "planner", tr: "plan defteri" },
      { de: "fits", tr: "sığıyor" },
      { de: "tutor", tr: "özel öğretmen" },
      { de: "least", tr: "en az" },
      { de: "the fourth", tr: "dördüncü" },
      { de: "revision", tr: "tekrar" },
      { de: "itself", tr: "kendi kendine" },
      { de: "session", tr: "oturum" },
      { de: "impossible", tr: "imkânsız" },
    ],
    minutes: 7,
    text:
      "Four weeks, one exam, and a plan that fits on half a page.\n" +
      "I am starting the new chapter on Monday. That is not a hope; the tutor and I agreed on it and she is expecting the questions on Thursday.\n" +
      "I am going to revise every evening. Forty minutes, not two hours, because I have tried two hours four times in my life and finished it once.\n" +
      "I will take a break at nine. That one I decided while I was writing this, and it is the line I trust least.\n" +
      "The weekly routine is three topics, never four. The fourth topic is the one that eats the other three, and it is always the topic I like most.\n" +
      "What is in the planner is not the revision. It is the time: which forty minutes, on which day, in which room. The revision takes care of itself once the time has a place to sit.\n" +
      "And one rule from last year, which is the only reason I passed: if I cannot concentrate after ten minutes, I stop and move the session. A bad hour is worse than no hour, because a bad hour teaches you that the chapter is impossible.",
    questions: [
      {
        text: "Why is the chapter starting on Monday arranged?",
        options: ["the tutor is expecting questions", "it is in the planner", "the exam is on Monday"],
        answer: 0,
        explain: "„the tutor and I agreed on it and she is expecting the questions on Thursday.“",
      },
      {
        text: "Why forty minutes and not two hours?",
        options: ["two hours has worked once in four tries", "the room is busy", "the tutor said so"],
        answer: 0,
        explain: "„I have tried two hours four times in my life and finished it once.“",
      },
      {
        kind: "truefalse",
        text: "The weekly routine has four topics.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The weekly routine is three topics, never four.“",
      },
      {
        kind: "gapfill",
        text: "The break is at ___.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„I will take a break at nine.“",
      },
      {
        kind: "short_answer",
        text: "What is in the planner?",
        options: [],
        answer: 0,
        accept: ["the time", "which forty minutes", "the times"],
        explain: "„What is in the planner is not the revision. It is the time…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u13-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 13,
    title: "The papers they need",
    genre: "dialogue",
    intro: "Belge listesi. Hangisi asıl, hangisi kopya?",
    gloss: [
      { de: "translator", tr: "çevirmen" },
      { de: "stamped", tr: "kaşeli" },
      { de: "the folder", tr: "dosya" },
      { de: "translation", tr: "çeviri" },
      { de: "clear", tr: "anlaşılır" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "They sent the list back. Three lines and I understand two." },
      { speaker: "Ela", text: "Read the first one." },
      { speaker: "Mert", text: "The document that they need is the original. Not a copy, not a stamped copy." },
      { speaker: "Ela", text: "Then take the original and bring it home the same day." },
      { speaker: "Mert", text: "The copy I sent was not valid, and it had a stamp from the translator." },
      { speaker: "Ela", text: "A translator stamps the translation, not the document. Two different papers." },
      { speaker: "Mert", text: "That is the line I did not understand." },
      { speaker: "Ela", text: "Everybody sends the wrong one once. What is the third line?" },
      { speaker: "Mert", text: "Something is missing from the folder and it does not say what." },
      { speaker: "Ela", text: "Then call and ask them to read the folder to you. Not to explain it — to read it." },
      { speaker: "Mert", text: "Does that work?" },
      { speaker: "Ela", text: "It works because they can see what is there and you cannot. The woman who checked it in March did that for me in two minutes." },
      { speaker: "Mert", text: "And if the line is still not clear?" },
      { speaker: "Ela", text: "Write it down as they say it and read it back. Half the missing documents are a word that two people heard differently." },
    ],
    questions: [
      {
        text: "What do they need?",
        options: ["the original", "a stamped copy", "a new translation"],
        answer: 0,
        explain: "„The document that they need is the original. Not a copy, not a stamped copy.“",
      },
      {
        text: "What does a translator stamp?",
        options: ["the translation", "the document", "the folder"],
        answer: 0,
        explain: "„A translator stamps the translation, not the document. Two different papers.“",
      },
      {
        kind: "truefalse",
        text: "The list does not say what is missing.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Something is missing from the folder and it does not say what.“",
      },
      {
        kind: "gapfill",
        text: "The list has ___ lines.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„They sent the list back. Three lines and I understand two.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The document that they need is the original.", "The document that they need is the original"],
        explain: "„that“ nesne konumunda; düşebilirdi ama resmî yazıda kalıyor.",
      },
      {
        kind: "short_answer",
        text: "What should Mert ask them to do on the phone?",
        options: [],
        answer: 0,
        accept: ["read the folder", "read it to him", "read the list"],
        explain: "„call and ask them to read the folder to you. Not to explain it — to read it.“",
      },
    ],
  },
  {
    id: "en-b1-u13-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 13,
    title: "Before the exam",
    genre: "dialogue",
    intro: "Sınav kuralları. Hangisi zorunlu, hangisi yasak, hangisi öğüt?",
    gloss: [
      { de: "invigilator", tr: "gözetmen" },
      { de: "the mark", tr: "puan" },
      { de: "worth doing", tr: "yapmaya değer" },
      { de: "enter", tr: "girmek" },
      { de: "exists", tr: "var" },
      { de: "obvious", tr: "besbelli" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "unpleasant", tr: "tatsız" },
      { de: "The fourth", tr: "dördüncüsü" },
      { de: "advice", tr: "öğüt" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Tutor", text: "Three rules and one piece of advice. The rules first." },
      { speaker: "Nil", text: "Go on." },
      { speaker: "Tutor", text: "You must bring your card to the exam. Without it you do not enter, and the invigilator cannot make an exception." },
      { speaker: "Nil", text: "Even if you know me?" },
      { speaker: "Tutor", text: "Especially then. The rule exists so that nobody has to decide who is known." },
      { speaker: "Nil", text: "Second?" },
      { speaker: "Tutor", text: "You mustn't cheat in the test. That is obvious, but here is the part that is not: a phone in a bag under the table counts." },
      { speaker: "Nil", text: "Even switched off?" },
      { speaker: "Tutor", text: "Even when it is off. Leave it at the door with the invigilator." },
      { speaker: "Nil", text: "And the advice?" },
      { speaker: "Tutor", text: "You should do more practice. Not more reading — practice, with a clock, in the room you feel worst in." },
      { speaker: "Nil", text: "That sounds unpleasant." },
      { speaker: "Tutor", text: "It is. It is also the only thing that moves the mark. Reading feels like work and practice is work." },
      { speaker: "Nil", text: "How many?" },
      { speaker: "Tutor", text: "Four full ones, timed. The fourth is the one worth doing, because by then you are tired and the exam is also at the end of a day." },
    ],
    questions: [
      {
        text: "What must Nil bring?",
        options: ["the card", "a phone", "four practice tests"],
        answer: 0,
        explain: "„You must bring your card to the exam. Without it you do not enter…“",
      },
      {
        text: "What is the piece of advice?",
        options: ["more practice with a clock", "more reading", "an earlier exam"],
        answer: 0,
        explain: "„You should do more practice. Not more reading — practice, with a clock…“",
      },
      {
        kind: "truefalse",
        text: "A phone in a bag is allowed if it is off.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Even when it is off. Leave it at the door with the invigilator.“",
      },
      {
        kind: "gapfill",
        text: "Nil should do ___ full practice tests.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Four full ones, timed.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You mustn't cheat in the test.", "You must not cheat in the test.", "You mustn't cheat in the test"],
        explain: "„mustn't“ yasak; sonrası eksiz fiil.",
      },
      {
        kind: "short_answer",
        text: "Which practice test is worth doing?",
        options: [],
        answer: 0,
        accept: ["the fourth", "the last one", "the fourth one"],
        explain: "„The fourth is the one worth doing, because by then you are tired…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u13-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 13,
    title: "They insisted on seeing the original",
    genre: "formal",
    intro: "Üç kalıp, üç ayrı biçim. Seçimi önceki sözcük yapıyor.",
    gloss: [
      { de: "appeal against", tr: "itiraz etmek" },
      { de: "insisted on", tr: "ısrar ettiler" },
      { de: "a review", tr: "yeniden inceleme" },
      { de: "the ninth", tr: "dokuzu" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Karara itiraz etmeye karar verdim.",
        answer: "I decided to appeal against the decision.",
        hint: "„decide“ MASTAR alıyor; „appeal“ kendi edatını taşıyor: against.",
      },
      {
        kind: "build",
        tr: "Aslını görmekte ısrar ettiler.",
        answer: "They insisted on seeing the original.",
        hint: "„insist“ EDAT alıyor („on“) ve edattan sonra fiil „-ing“ oluyor.",
      },
      {
        kind: "build",
        tr: "Yeniden inceleme isteme hakkım var.",
        answer: "I have the right to ask for a review.",
        hint: "Burada mastarı bir İSİM alıyor: „the right to“.",
      },
      {
        kind: "build",
        tr: "İhtiyaç duydukları belge asıl nüsha.",
        answer: "The document that they need is the original.",
        hint: "„that“ nesne konumunda; düşebilirdi ama resmî yazıda genelde kalıyor.",
      },
      {
        kind: "form",
        prompt: "İtiraz kartını doldur.",
        facts: "Başvuru dokuz nisanda reddedildi; sebep eksik belge; asıl nüsha yirmi birinde götürüldü; yeniden inceleme hakkı var.",
        fields: [
          { label: "Rejected", answer: "the ninth of April", accept: ["9 April", "April"] },
          { label: "Reason", answer: "a missing document", accept: ["missing document"] },
          { label: "Original brought", answer: "the twenty-first", accept: ["21"] },
          { label: "Right", answer: "a review", accept: ["to ask for a review"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u13-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 13,
    title: "I am going to revise every evening",
    genre: "personal",
    intro: "Plan ve sınav cümleleri. Hangi gelecek, hangi kip?",
    gloss: [
      { de: "revise", tr: "tekrar etmek" },
      { de: "a break", tr: "mola" },
      { de: "practice", tr: "alıştırma" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Pazartesi yeni bölüme başlıyorum.",
        answer: "I am starting the new chapter on Monday.",
        hint: "Ayarlanmış: öğretmenle konuşulmuş ve o da biliyor.",
      },
      {
        kind: "build",
        tr: "Her akşam tekrar edeceğim.",
        answer: "I am going to revise every evening.",
        hint: "Önceden kurulmuş plan: „going to“.",
      },
      {
        kind: "build",
        tr: "Dokuzda mola vereceğim.",
        answer: "I will take a break at nine.",
        hint: "O anda verilen karar: „will“. „take a break“ kalıp.",
      },
      {
        kind: "build",
        tr: "Sınava kartını getirmek zorundasın.",
        answer: "You must bring your card to the exam.",
        hint: "„must“ kuralın kendisinden; istisna yok.",
      },
      {
        kind: "build",
        tr: "Daha çok alıştırma yapmalısın.",
        answer: "You should do more practice.",
        hint: "„practice“ burada isim ve sayılamaz: „more practice“, „more practices“ değil.",
      },
    ],
  },
];
