import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 1 — "Aynı şey üç dil düzeyinde, eksilterek söylemek,
 * ağırlık sonda, resmî talep".
 *
 * Dört ders: The same thing in three registers · Leaving it out ·
 * Weight at the end · The formal request.
 *
 *   Kelime: salutation, cordial, verbatim, journalistic, convey,
 *           discourse, argumentation, coherence, subjectivity,
 *           plausibility, construe, connotation, essayist, allusion,
 *           denotation, subtext, allegory, aphorism, polemic, convene,
 *           adjourn, exert, admonish, consolidate.
 *   Kalıp:  The salutation alone sets the register. ·
 *           A cordial note and a matter-of-fact note say the same thing. ·
 *           Quoted verbatim, the line reads differently. ·
 *           I would if I could, and so would she. ·
 *           Some call it discourse; others, argumentation. ·
 *           The first reading is careful; the second is not. ·
 *           Into the sentence creeps a connotation. ·
 *           What the essayist does next is an allusion. ·
 *           The denotation we know; the subtext we guess. ·
 *           I insist that the board convene tomorrow. ·
 *           Were it not for the chairing, we would adjourn. ·
 *           They ask that no one exert pressure.
 *
 * Ünitenin tek öğretme noktası İSTEK KİPİ (subjunctive). „I insist that
 * the board convene tomorrow“ — üçüncü kişide ek yok, „should“ yok,
 * olumsuzu „do“ olmadan kuruluyor, „be“ „be“ olarak kalıyor. İngilizcede
 * bu kipten geriye iki kalıntı var: talep kuran bu biçim ve „were it not
 * for“daki varsayım. Biri istiyor, öteki varsayıyor.
 */
export const enC1U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u01-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 1,
    title: "The formal request",
    genre: "info",
    intro: "Üçüncü kişide ek yok. Hangi fiillerden sonra?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "appears", tr: "beliriyor" },
      { de: "verbs", tr: "fiiller" },
      { de: "nouns", tr: "isimler" },
      { de: "propose", tr: "önermek" },
      { de: "attend", tr: "katılmak" },
      { de: "rarer", tr: "daha seyrek" },
      { de: "survival", tr: "kalıntı" },
      { de: "conditional", tr: "koşul cümlesi" },
      { de: "whole", tr: "bütün" },
      { de: "the subjunctive", tr: "istek kipi" },
      { de: "bare", tr: "yalın" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "a demand", tr: "talep" },
      { de: "essential", tr: "olmazsa olmaz" },
      { de: "an ending", tr: "ek" },
      { de: "an alternative", tr: "başka bir yol" },
      { de: "commoner", tr: "daha yaygın" },
      { de: "the Atlantic", tr: "Atlantik" },
      { de: "filed", tr: "dosyalanan" },
      { de: "a remnant", tr: "kalıntı" },
      { de: "a mood", tr: "kip" },
      { de: "a supposition", tr: "varsayım" },
      { de: "a chair", tr: "oturum başkanı" },
      { de: "hardest", tr: "en zor" },
    ],
    minutes: 11,
    text:
      "I insist that the board convene tomorrow. Read the verb again. Not „convenes“, which is what a subject of that kind normally takes, and not „should convene“, which is what many speakers would say instead. Just „convene“, bare, with nothing on the end.\n" +
      "This is the subjunctive, and in modern English it survives almost nowhere else. It appears after a small set of verbs and nouns that carry a demand: insist, ask, request, require, recommend, propose, and the nouns built from them. They ask that no one exert pressure. It is essential that the file be complete.\n" +
      "Three things mark it. The verb has no ending in the third person. The negative is formed without „do“ — „that he not attend“, never „that he does not attend“. And „be“ stays as „be“, which is where most readers notice it for the first time.\n" +
      "There is an alternative and it is not wrong. „I insist that the board should convene“ says the same thing and is commoner on one side of the Atlantic and rarer on the other. What it is not is more formal. The bare form is the formal one, and in minutes, in a request to a chair, in anything that will be filed, it is what a reader of this register expects.\n" +
      "Were it not for the chairing, we would adjourn. That is the other survival of the same mood, and it is the one this course met two levels ago: the conditional without „if“, built on „were“.\n" +
      "So two remnants of one system, kept for two jobs. The first makes a demand and the second makes a supposition, and between them they are almost the whole of what is left. A language that has lost a mood keeps the pieces where the work was hardest to do any other way.",
    questions: [
      {
        text: "What ending does the verb take in the third person?",
        options: ["no ending at all", "the usual one", "a past ending"],
        answer: 0,
        explain: "„The verb has no ending in the third person.“",
      },
      {
        text: "How is the negative formed?",
        options: ["without „do“", "with „do“", "with „should“"],
        answer: 0,
        explain: "„The negative is formed without „do“ — „that he not attend“…“",
      },
      {
        kind: "truefalse",
        text: "The bare form is the formal one.",
        options: ["True", "False"],
        answer: 0,
        explain: "„What it is not is more formal. The bare form is the formal one…“",
      },
      {
        kind: "gapfill",
        text: "I insist that the board ___ tomorrow.",
        options: [],
        answer: 0,
        accept: ["convene"],
        explain: "„I insist that the board convene tomorrow.“",
      },
      {
        kind: "order",
        text: "Kipin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I insist that the board convene tomorrow.",
          "They ask that no one exert pressure.",
          "Were it not for the chairing, we would adjourn.",
          "Two remnants of one system, kept for two jobs.",
        ],
        explain: "İki talep, bir varsayım, en sonda ikisinin adı.",
      },
      {
        kind: "short_answer",
        text: "What does a language keep after losing a mood?",
        options: [],
        answer: 0,
        accept: ["the hardest pieces", "the pieces", "where it was hardest"],
        explain: "„keeps the pieces where the work was hardest to do any other way.“",
      },
    ],
  },
  {
    id: "en-c1-u01-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 1,
    title: "Weight at the end",
    genre: "opinion",
    intro: "Eski bilgi başta, yeni bilgi sonda. Neden?",
    gloss: [
      { de: "plain", tr: "yalın" },
      { de: "phrase", tr: "öbek" },
      { de: "belongs", tr: "ait" },
      { de: "underneath", tr: "altta" },
      { de: "produces", tr: "üretiyor" },
      { de: "somehow", tr: "bir biçimde" },
      { de: "appeared", tr: "göründü" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "passive", tr: "edilgen" },
      { de: "drops", tr: "düşürüyor" },
      { de: "least", tr: "en az" },
      { de: "object", tr: "nesne" },
      { de: "pair", tr: "çift" },
      { de: "inverted", tr: "devrik" },
      { de: "verb", tr: "fiil" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "able", tr: "muktedir" },
      { de: "phrases", tr: "öbekler" },
      { de: "per", tr: "başına" },
      { de: "belong", tr: "ait olmak" },
      { de: "invert", tr: "devirmek" },
      { de: "drop", tr: "düşürmek" },
      { de: "creeps", tr: "sızıyor" },
      { de: "old information", tr: "eski bilgi" },
      { de: "new information", tr: "yeni bilgi" },
      { de: "the principle", tr: "ilke" },
      { de: "marking", tr: "işaretleme" },
      { de: "a case", tr: "durum eki" },
      { de: "tiring", tr: "yorucu" },
      { de: "a tool", tr: "araç" },
      { de: "fronting", tr: "öne çıkarma" },
      { de: "an element", tr: "öğe" },
      { de: "limited", tr: "sınırlı" },
      { de: "in a row", tr: "art arda" },
      { de: "carry", tr: "taşımak" },
      { de: "grammatical", tr: "dilbilgisel" },
      { de: "the agent", tr: "eyleyen" },
    ],
    minutes: 11,
    text:
      "Into the sentence creeps a connotation. Nobody says that out loud and everybody reads it without stopping, which is the first thing to notice about it.\n" +
      "The plain order is „a connotation creeps into the sentence“. Moving the phrase to the front does two things at once. It links this sentence to the one before, because „into the sentence“ is old information; and it puts „a connotation“ at the end, where the new information belongs.\n" +
      "That is the principle underneath a great deal of writing at this level. Old at the front, new at the end. English has fewer ways of marking what is new than a language with cases has, so it uses position, and a writer who ignores it produces sentences that are correct and somehow tiring.\n" +
      "There are three tools for it and all three have appeared before. The cleft: what the essayist does next is an allusion. The passive, which moves the agent to the end or drops it. And this one, fronting, which is the least used and the most useful when the subject is long.\n" +
      "The denotation we know; the subtext we guess. Here the object has been fronted instead, twice, and the effect is a pair. Nothing is inverted — the subject and the verb stay in order — and that is the difference between this and the inversion after a negative.\n" +
      "Fronting without inversion is available for almost any element, and it is limited by one thing only: the reader has to be able to tell where the sentence really starts. Two fronted phrases in a row and that becomes work.\n" +
      "So one per paragraph, and the test is whether the last word of the sentence is the word you wanted the reader to carry. If it is not, the sentence is in the wrong order however grammatical it is.",
    questions: [
      {
        text: "Where does new information belong?",
        options: ["at the end", "at the front", "between the two"],
        answer: 0,
        explain: "„it puts „a connotation“ at the end, where the new information belongs.“",
      },
      {
        text: "What happens to the subject and verb when the object is fronted?",
        options: ["they stay in order", "they invert", "they drop"],
        answer: 0,
        explain: "„Nothing is inverted — the subject and the verb stay in order…“",
      },
      {
        kind: "truefalse",
        text: "English marks new information with cases.",
        options: ["True", "False"],
        answer: 1,
        explain: "„English has fewer ways of marking what is new than a language with cases has, so it uses position.“",
      },
      {
        kind: "gapfill",
        text: "Into the sentence ___ a connotation.",
        options: [],
        answer: 0,
        accept: ["creeps"],
        explain: "„Into the sentence creeps a connotation.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What the essayist does next is an allusion.",
          "The passive moves the agent to the end.",
          "Into the sentence creeps a connotation.",
          "Old at the front, new at the end.",
        ],
        explain: "Yarık cümle, edilgen, öne çıkarma; en sonda ilke.",
      },
      {
        kind: "short_answer",
        text: "What is the test?",
        options: [],
        answer: 0,
        accept: ["the last word", "what the last word is", "the final word"],
        explain: "„the test is whether the last word of the sentence is the word you wanted the reader to carry.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u01-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 1,
    title: "The same thing in three registers",
    genre: "dialogue",
    intro: "Aynı içerik, üç mektup. Fark nerede duruyor?",
    gloss: [
      { de: "neither", tr: "ikisi de değil" },
      { de: "content", tr: "içerik" },
      { de: "apart", tr: "ayrı" },
      { de: "verbs", tr: "fiiller" },
      { de: "a salutation", tr: "hitap" },
      { de: "cordial", tr: "içten" },
      { de: "identical", tr: "birebir aynı" },
      { de: "verbatim", tr: "kelimesi kelimesine" },
      { de: "a column", tr: "köşe yazısı" },
      { de: "warm", tr: "sıcak" },
      { de: "cold", tr: "soğuk" },
      { de: "receive", tr: "almak" },
      { de: "next to each other", tr: "yan yana" },
      { de: "settles", tr: "çözüme bağlıyor" },
      { de: "a claim", tr: "iddia" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Eylül", text: "The salutation alone sets the register. Before a single claim is made, the reader knows which of three letters this is." },
      { speaker: "Sinan", text: "Three?" },
      { speaker: "Eylül", text: "Cordial, matter-of-fact, and the one that is neither. A cordial note and a matter-of-fact note say the same thing, and nobody who receives them would say so." },
      { speaker: "Sinan", text: "So the content is identical." },
      { speaker: "Eylül", text: "The content is identical and the effect is not, and a writer who believes those are the same thing has never had a letter answered badly." },
      { speaker: "Sinan", text: "Where does it show apart from the salutation?" },
      { speaker: "Eylül", text: "In the verbs. The cordial version uses verbs of feeling and the matter-of-fact one uses verbs of doing, and neither of them mentions the difference." },
      { speaker: "Sinan", text: "And the journalistic one?" },
      { speaker: "Eylül", text: "Quoted verbatim, the line reads differently again. A sentence that was warm in a letter is cold in a column, because the reader of the column did not receive it." },
      { speaker: "Sinan", text: "So the register is in the reader." },
      { speaker: "Eylül", text: "Half of it is. The other half is in the choices, and the only way to see them is to write the same paragraph twice and put the two next to each other." },
      { speaker: "Sinan", text: "Which nobody does." },
      { speaker: "Eylül", text: "Which nobody does, and it takes eleven minutes and settles most arguments about tone before they start." },
    ],
    questions: [
      {
        text: "What sets the register first?",
        options: ["the salutation", "the verbs", "the claim"],
        answer: 0,
        explain: "„The salutation alone sets the register.“",
      },
      {
        text: "Why is the same line cold in a column?",
        options: ["the reader did not receive it", "the words changed", "it was shorter"],
        answer: 0,
        explain: "„because the reader of the column did not receive it.“",
      },
      {
        kind: "truefalse",
        text: "The two notes have identical content.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The content is identical and the effect is not…“",
      },
      {
        kind: "gapfill",
        text: "The ___ alone sets the register.",
        options: [],
        answer: 0,
        accept: ["salutation"],
        explain: "„The salutation alone sets the register.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Quoted verbatim, the line reads differently again.", "Quoted verbatim, the line reads differently again"],
        explain: "Edilgen ortaç: aktarma bağlamı değiştiriyor.",
      },
      {
        kind: "short_answer",
        text: "How long does writing it twice take?",
        options: [],
        answer: 0,
        accept: ["eleven minutes", "11 minutes", "eleven"],
        explain: "„it takes eleven minutes and settles most arguments about tone…“",
      },
    ],
  },
  {
    id: "en-c1-u01-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 1,
    title: "Leaving it out",
    genre: "monologue",
    intro: "Eksiltme. Okur eksik olanı nasıl geri koyuyor?",
    gloss: [
      { de: "verbs", tr: "fiiller" },
      { de: "whole", tr: "bütün" },
      { de: "able", tr: "muktedir" },
      { de: "verb", tr: "fiil" },
      { de: "comma", tr: "virgül" },
      { de: "halves", tr: "yarılar" },
      { de: "essay", tr: "deneme" },
      { de: "a gap", tr: "boşluk" },
      { de: "put it back", tr: "geri koymak" },
      { de: "a semicolon", tr: "noktalı virgül" },
      { de: "decoration", tr: "süs" },
      { de: "ellipsis", tr: "eksiltme" },
      { de: "lean on", tr: "yaslanmak" },
      { de: "recoverable", tr: "geri getirilebilir" },
      { de: "plods", tr: "ağır ağır ilerliyor" },
      { de: "arithmetic", tr: "aritmetik" },
      { de: "solved", tr: "çözülen" },
      { de: "persuades", tr: "ikna ediyor" },
      { de: "available", tr: "elde olan" },
      { de: "elegant", tr: "zarif" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Bilge", text: "I would if I could, and so would she. Count the verbs that are not there: „do it“ twice, and the whole of „would do it“ once." },
      { speaker: "Bilge", text: "Nothing is lost, because each gap points at something already on the page. That is the rule for leaving a word out: the reader must be able to put it back with one hand." },
      { speaker: "Bilge", text: "Some call it discourse; others, argumentation. The second half has no verb at all, and the semicolon and the comma are doing the work of one." },
      { speaker: "Bilge", text: "That comma is not decoration. Take it out and the sentence says that others call it argumentation something, which is nothing." },
      { speaker: "Bilge", text: "The first reading is careful; the second is not. Here the missing word is „careful“, and the sentence works because the two halves are the same shape." },
      { speaker: "Bilge", text: "The shape is the condition. Ellipsis needs a pattern to lean on, and where the two halves are built differently the gap stops being recoverable and starts being a mistake." },
      { speaker: "Bilge", text: "In an essay this is most of what separates a paragraph that moves from one that plods. The full version of every sentence is available and nobody wants it." },
      { speaker: "Bilge", text: "What I watch for is the third gap in a row. Two are elegant. Three and the reader is doing arithmetic instead of reading, and a sentence that has to be solved is not a sentence that persuades." },
    ],
    questions: [
      {
        text: "What is the rule for leaving a word out?",
        options: ["the reader can put it back", "the sentence is short", "there is a comma"],
        answer: 0,
        explain: "„the reader must be able to put it back with one hand.“",
      },
      {
        text: "What does ellipsis need?",
        options: ["a pattern to lean on", "a semicolon", "a long sentence"],
        answer: 0,
        explain: "„Ellipsis needs a pattern to lean on…“",
      },
      {
        kind: "truefalse",
        text: "The comma in the second example is decoration.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That comma is not decoration.“",
      },
      {
        kind: "gapfill",
        text: "Some call it discourse; ___, argumentation.",
        options: [],
        answer: 0,
        accept: ["others"],
        explain: "„Some call it discourse; others, argumentation.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The first reading is careful; the second is not.", "The first reading is careful; the second is not"],
        explain: "Eksik olan „careful“; iki yarı aynı biçimde kurulmuş.",
      },
      {
        kind: "short_answer",
        text: "How many gaps are elegant?",
        options: [],
        answer: 0,
        accept: ["two", "2", "two gaps"],
        explain: "„Two are elegant. Three and the reader is doing arithmetic…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u01-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 1,
    title: "I insist that the board convene tomorrow",
    genre: "info",
    intro: "İstek kipi ve onun ikizi. Ek nerede yok?",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "attend", tr: "katılmak" },
      { de: "convene", tr: "toplanmak" },
      { de: "exert", tr: "baskı uygulamak" },
      { de: "were it not for", tr: "olmasaydı" },
      { de: "the salutation", tr: "hitap" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kurulun yarın toplanmasında ısrar ediyorum.",
        answer: "I insist that the board convene tomorrow.",
        hint: "İstek kipi: üçüncü kişide ek yok.",
      },
      {
        kind: "build",
        tr: "Kimsenin baskı uygulamamasını istiyorlar.",
        answer: "They ask that no one exert pressure.",
        hint: "Yine ek yok; aynı küçük fiil listesinden sonra.",
      },
      {
        kind: "build",
        tr: "Oturum başkanlığı olmasa ara verirdik.",
        answer: "Were it not for the chairing, we would adjourn.",
        hint: "Aynı kipin öteki kalıntısı: „if“siz koşul.",
      },
      {
        kind: "build",
        tr: "Hitap tek başına dil düzeyini belirliyor.",
        answer: "The salutation alone sets the register.",
        hint: "Tek sözcük bütün mektubun tonunu kuruyor.",
      },
      {
        kind: "form",
        prompt: "İstek kipi kartını doldur.",
        facts: "Üçüncü kişide ek yok; olumsuzu „do“ olmadan kuruluyor; „be“ „be“ kalıyor; „should“lu biçim daha resmî değil.",
        fields: [
          { label: "The ending", answer: "none", accept: ["no ending"] },
          { label: "The negative", answer: "without „do“", accept: ["that he not attend"] },
          { label: "„be“", answer: "stays „be“", accept: ["be"] },
          { label: "„should“", answer: "not more formal", accept: ["equally correct"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u01-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 1,
    title: "The denotation we know; the subtext we guess",
    genre: "opinion",
    intro: "Öne çıkarma ve eksiltme. Ağırlık nereye düşüyor?",
    gloss: [
      { de: "the denotation", tr: "düz anlam" },
      { de: "the subtext", tr: "alt metin" },
      { de: "a connotation", tr: "yan anlam" },
      { de: "an allusion", tr: "gönderme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Düz anlamı biliriz; alt metni tahmin ederiz.",
        answer: "The denotation we know; the subtext we guess.",
        hint: "Nesne öne çıkıyor ama devrilme yok.",
      },
      {
        kind: "build",
        tr: "Cümleye bir yan anlam sızıyor.",
        answer: "Into the sentence creeps a connotation.",
        hint: "Eski bilgi başta, yeni bilgi sonda.",
      },
      {
        kind: "build",
        tr: "Deneme yazarının bundan sonra yaptığı şey bir gönderme.",
        answer: "What the essayist does next is an allusion.",
        hint: "Yarık cümle: ağırlık sona kayıyor.",
      },
      {
        kind: "build",
        tr: "Yapabilseydim yapardım, o da öyle.",
        answer: "I would if I could, and so would she.",
        hint: "Eksiltme: okur eksik olanı geri koyabiliyor.",
      },
      {
        kind: "build",
        tr: "Kimi buna söylem der; kimi, gerekçelendirme.",
        answer: "Some call it discourse; others, argumentation.",
        hint: "Virgül fiilin yerini tutuyor.",
      },
    ],
  },
];
