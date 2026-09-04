import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 7 — "Sevdiğim yemek, market, miktarlar ve pişirmek".
 *
 * Dört ders: Mein Lieblingsessen · Im Supermarkt · Ein Kilo Tomaten ·
 * Wir kochen zusammen. İçerik ünite 1-7'nin kelimeleriyle sınırlı.
 *
 *   Ünite 7: das Fleisch, das Gemüse, das Obst, mögen, lieber, der Apfel,
 *            die Banane, die Schokolade · der Supermarkt, brauchen, finden,
 *            die Milch, der Zucker, der Kunde, das Geschäft, die Birne ·
 *            das Kilo, die Kartoffel, die Flasche, das Stück, die Tomate,
 *            der Salat, das Öl, das Mineralwasser · kochen, schneiden,
 *            die Zwiebel, das Salz, der Herd, grillen, riechen, der Reis
 *   Kalıplar: Ich esse gern … · Ich mag … · Ich esse lieber … ·
 *            Ich brauche … · Wo finde ich …? · ein Kilo … · zwei Flaschen … ·
 *            Ich schneide … · Wir kochen …
 *
 * Miktar kalıbı bu ünitenin dil bilgisi odağı: "ein Kilo Tomaten" — miktardan
 * sonra ad ARTİKELSİZ ve çoğul gelir. Egzersizler bunu tekrar tekrar sınıyor.
 */
export const a1U07: SkillExercise[] = [
  {
    id: "a1-u7-r1",
    level: "A1",
    skill: "reading",
    unit: 7,
    title: "Der Einkaufszettel",
    genre: "Liste",
    intro: "Bir alışveriş listesi ve kısa bir not okuyacaksın.",
    gloss: [
      { de: "brauchen", tr: "ihtiyacı olmak", en: "to need" },
      { de: "das Kilo", tr: "kilo", en: "kilo" },
      { de: "die Flasche", tr: "şişe", en: "bottle" },
      { de: "das Stück", tr: "tane", en: "piece" },
    ],
    minutes: 3,
    text:
      "Hallo Elif,\n\nich koche heute für uns. Kannst du bitte in den Supermarkt gehen?\n\nWir brauchen:\n— ein Kilo Tomaten\n— zwei Kilo Kartoffeln\n— drei Zwiebeln\n— eine Flasche Öl\n— zwei Flaschen Mineralwasser\n— ein Stück Käse\n— Salz\n\nObst brauchen wir nicht, wir haben noch Äpfel und Bananen.\n\nFleisch bitte auch nicht — ich koche heute mit Gemüse und Reis.\n\nDanke! Tschüss,\nTom",
    questions: [
      {
        text: "Wie viele Kilo Kartoffeln braucht Tom?",
        options: ["zwei", "ein", "drei"],
        answer: 0,
        explain: "„zwei Kilo Kartoffeln“. Bir kilo olan domates.",
      },
      {
        text: "Richtig oder falsch? Tom braucht auch Obst.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Obst brauchen wir nicht, wir haben noch Äpfel und Bananen.“",
      },
      {
        text: "Was kocht Tom heute?",
        options: ["Gemüse mit Reis", "Fleisch mit Kartoffeln", "Salat mit Käse"],
        answer: 0,
        explain: "„ich koche heute mit Gemüse und Reis“ — et istemiyor.",
      },
      {
        kind: "gapfill",
        text: "Tom braucht ___ Flaschen Mineralwasser.",
        options: [],
        answer: 0,
        accept: ["zwei", "2"],
        explain: "„zwei Flaschen Mineralwasser“.",
      },
      {
        text: "Wie viele Zwiebeln braucht Tom?",
        options: ["drei", "zwei", "ein Kilo"],
        answer: 0,
        explain: "„drei Zwiebeln“ — sayıdan sonra ad çoğul: die Zwiebel → Zwiebeln.",
      },
    ],
  },
  {
    id: "a1-u7-r2",
    level: "A1",
    skill: "reading",
    unit: 7,
    title: "Was isst du gern?",
    genre: "Forum mesajı",
    intro: "Üç kişi sevdiği ve sevmediği yemekleri yazıyor.",
    gloss: [
      { de: "mögen", tr: "sevmek", en: "to like" },
      { de: "lieber", tr: "daha çok", en: "rather" },
      { de: "das Gemüse", tr: "sebze", en: "vegetables" },
    ],
    minutes: 3,
    text:
      "Mia: Ich esse gern Obst. Äpfel und Bananen mag ich sehr. Schokolade esse ich auch gern, aber nicht zu viel!\n\nTom: Ich mag Fleisch nicht. Ich esse lieber Gemüse und Reis. Am liebsten koche ich mit Tomaten und Zwiebeln.\n\nElif: Ich esse gern Salat mit Öl und Salz. Meine Kinder mögen keinen Salat — sie essen lieber Kartoffeln.",
    questions: [
      {
        text: "Was mag Mia sehr?",
        options: ["Äpfel und Bananen", "Fleisch", "Salat"],
        answer: 0,
        explain: "„Äpfel und Bananen mag ich sehr.“",
      },
      {
        text: "Richtig oder falsch? Tom isst gern Fleisch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich mag Fleisch nicht.“ — sebze ve pirinci tercih ediyor.",
      },
      {
        text: "Was essen Elifs Kinder lieber?",
        options: ["Kartoffeln", "Salat", "Schokolade"],
        answer: 0,
        explain: "„sie essen lieber Kartoffeln“ — salatayı sevmiyorlar.",
      },
      {
        kind: "gapfill",
        text: "Elif isst gern Salat mit Öl und ___.",
        options: [],
        answer: 0,
        accept: ["Salz"],
        explain: "„Salat mit Öl und Salz“.",
      },
    ],
  },
  {
    id: "a1-u7-l1",
    level: "A1",
    skill: "listening",
    unit: 7,
    title: "Wo finde ich die Milch?",
    genre: "Diyalog",
    intro: "Markette bir müşteri soru soruyor.",
    gloss: [
      { de: "finden", tr: "bulmak", en: "to find" },
      { de: "der Kunde", tr: "müşteri", en: "customer" },
      { de: "das Geschäft", tr: "mağaza", en: "shop" },
    ],
    minutes: 2,
    segments: [
      { text: "Entschuldigung, wo finde ich die Milch?" },
      { text: "Die Milch ist da, beim Käse." },
      { text: "Danke! Und haben Sie auch Mineralwasser?" },
      { text: "Ja, eine Flasche kostet 0,80 Euro." },
      { text: "Gut, ich möchte zwei Flaschen." },
    ],
    questions: [
      {
        text: "Was fragt der Kunde?",
        options: ["die Milch", "das Öl", "den Zucker"],
        answer: 0,
        explain: "„wo finde ich die Milch?“",
      },
      {
        kind: "gapfill",
        text: "Eine Flasche Mineralwasser kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["0,80", "0.80"],
        explain: "„eine Flasche kostet 0,80 Euro“.",
      },
      {
        text: "Wie viele Flaschen möchte der Kunde?",
        options: ["zwei", "eine", "drei"],
        answer: 0,
        explain: "„ich möchte zwei Flaschen“ — miktardan sonra çoğul: Flasche → Flaschen.",
      },
      {
        text: "Richtig oder falsch? Das Geschäft hat kein Mineralwasser.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ja, eine Flasche kostet 0,80 Euro.“",
      },
    ],
  },
  {
    id: "a1-u7-l2",
    level: "A1",
    skill: "listening",
    unit: 7,
    title: "Wir kochen zusammen",
    genre: "Diyalog",
    intro: "İki kişi birlikte yemek yapıyor. Kim ne yapıyor?",
    gloss: [
      { de: "schneiden", tr: "doğramak", en: "to cut" },
      { de: "der Herd", tr: "ocak", en: "stove" },
      { de: "riechen", tr: "kokmak", en: "to smell" },
    ],
    minutes: 2,
    segments: [
      { text: "Was kochen wir heute?" },
      { text: "Reis mit Gemüse. Ich schneide die Zwiebeln." },
      { text: "Gut, dann schneide ich die Tomaten." },
      { text: "Das Öl ist schon auf dem Herd." },
      { text: "Das riecht sehr gut! Wir brauchen noch Salz." },
    ],
    questions: [
      {
        text: "Was kochen die zwei Personen?",
        options: ["Reis mit Gemüse", "Fleisch mit Kartoffeln", "Suppe"],
        answer: 0,
        explain: "„Reis mit Gemüse.“",
      },
      {
        text: "Wer schneidet die Tomaten?",
        options: ["die zweite Person", "die erste Person", "niemand"],
        answer: 0,
        explain: "„Gut, dann schneide ich die Tomaten.“ — ikinci kişi. İlk kişi soğanları doğruyor.",
      },
      {
        kind: "gapfill",
        text: "Sie brauchen noch ___.",
        options: [],
        answer: 0,
        accept: ["Salz"],
        explain: "„Wir brauchen noch Salz.“",
      },
      {
        text: "Wo ist das Öl?",
        options: ["auf dem Herd", "im Supermarkt", "in der Flasche"],
        answer: 0,
        explain: "„Das Öl ist schon auf dem Herd.“",
      },
    ],
  },
  {
    id: "a1-u7-w1",
    level: "A1",
    skill: "writing",
    unit: 7,
    title: "Ein Kilo Tomaten",
    genre: "Dil bilgisi",
    intro: "Miktar kalıplarını yaz: kilo, şişe, tane.",
    gloss: [
      { de: "das Kilo", tr: "kilo", en: "kilo" },
      { de: "das Stück", tr: "tane", en: "piece" },
      { de: "brauchen", tr: "ihtiyacı olmak", en: "to need" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir kilo domatese ihtiyacım var.",
        answer: "Ich brauche ein Kilo Tomaten",
        hint: "Miktardan sonra ad ARTİKELSİZ ve çoğul gelir: ein Kilo Tomaten — „ein Kilo die Tomaten“ değil.",
      },
      {
        kind: "build",
        tr: "İki şişe maden suyu istiyorum.",
        answer: "Ich möchte zwei Flaschen Mineralwasser",
        hint: "„die Flasche“ sayıdan sonra çoğul olur: zwei Flaschen. Ama „Mineralwasser“ değişmez.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi „lieber“ ile yaz (tercih belirt).",
        source: "Ich esse Gemüse.",
        answer: "Ich esse lieber Gemüse.",
        alternatives: ["Ich esse lieber Gemüse"],
        why: "„lieber“ fiilden sonra gelir ve „daha çok … tercih ederim“ anlamı katar.",
      },
    ],
  },
  {
    id: "a1-u7-w2",
    level: "A1",
    skill: "writing",
    unit: 7,
    title: "Einkaufszettel schreiben",
    genre: "Not",
    intro: "Ev arkadaşına alışveriş notu yaz.",
    gloss: [
      { de: "der Supermarkt", tr: "market", en: "supermarket" },
      { de: "kochen", tr: "yemek pişirmek", en: "to cook" },
      { de: "das Geschäft", tr: "mağaza", en: "shop" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bugün birlikte yemek pişiriyoruz.",
        answer: "Heute kochen wir zusammen",
        hint: "Cümle zaman bilgisiyle başlayınca fiil İKİNCİ sırada kalır, özne fiilden sonra gelir.",
      },
      {
        kind: "free",
        prompt:
          "Ev arkadaşına market notu yaz (4-5 cümle). Ne pişireceğini söyle, en az üç şey iste ve miktar belirt.",
        minWords: 30,
        checklist: [
          "Ne pişireceğini yazdın mı? (Ich koche … / Wir kochen …)",
          "En az üç şey istedin mi?",
          "Miktar belirttin mi? (ein Kilo …, zwei Flaschen …, drei Stück …)",
          "İstemediğin bir şeyi yazdın mı? (… brauchen wir nicht.)",
        ],
        phrases: [
          { de: "Wir brauchen …", tr: "… lazım", en: "We need …" },
          { de: "ein Kilo Kartoffeln", tr: "bir kilo patates", en: "a kilo of potatoes" },
          { de: "Kannst du bitte …?", tr: "… yapabilir misin?", en: "Could you please …?" },
        ],
        sample:
          "Hallo Mia,\n\nich koche heute Reis mit Gemüse. Kannst du bitte in den Supermarkt gehen?\n\nWir brauchen ein Kilo Tomaten, zwei Zwiebeln und eine Flasche Öl. Salz haben wir noch.\n\nFleisch brauchen wir nicht — ich koche ohne Fleisch.\n\nDanke!\nElif",
      },
    ],
  },
];
