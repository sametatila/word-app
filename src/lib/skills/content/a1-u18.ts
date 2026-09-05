import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 18 — "Balkon, bozuk eşya, hobiler ve yapabilmek".
 *
 * Dört ders: Auf dem Balkon · Die Lampe ist kaputt · Meine Hobbys ·
 * Ich kann gut schwimmen. İçerik ünite 1-18'in kelimeleriyle sınırlı.
 *
 *   Ünite 18: der Balkon, der Garten, die Blume, gießen, der Stuhl, scheinen,
 *             der Wind, liegen · kaputt, funktionieren, die Lampe, das Licht,
 *             der Hausmeister, reparieren, die Reparatur, das Feuer ·
 *             das Hobby, die Freizeit, spielen, malen, basteln, das Spiel,
 *             mitmachen, der Verein · schwimmen, tanzen, singen, üben,
 *             das Talent, können, wollen, gewinnen
 *   Kalıplar: Auf dem Balkon gibt es … · Ich gieße … · … ist kaputt. ·
 *             … funktioniert nicht. · Mein Hobby ist … · In meiner Freizeit … ·
 *             Ich kann gut schwimmen. · Ich kann nicht so gut singen.
 *
 * "können" burada iki anlamda geçiyor ve ders ikisini de öğretiyor: YETENEK
 * ("Ich kann schwimmen") ve İMKÂN ("Können Sie kommen?"). Egzersizler ikisini
 * ayrı ayrı kullanıyor; Türkçede ikisi de "-ebilmek" olduğu için ayrım
 * kendiliğinden görünmüyor.
 */
export const a1U18: SkillExercise[] = [
  {
    id: "a1-u18-r1",
    level: "A1",
    skill: "reading",
    unit: 18,
    title: "Was machst du in der Freizeit?",
    genre: "Forum mesajı",
    intro: "Üç kişi hobilerini yazıyor. Kim ne yapabiliyor?",
    gloss: [
      { de: "die Freizeit", tr: "boş zaman", en: "free time" },
      { de: "der Verein", tr: "dernek", en: "club" },
      { de: "üben", tr: "alıştırma yapmak", en: "to practise" },
      { de: "das Talent", tr: "yetenek", en: "talent" },
    ],
    minutes: 3,
    text:
      "Mia: In meiner Freizeit male ich. Mein Hobby ist Malen und Basteln. Ich kann nicht so gut singen — das ist kein Talent von mir!\n\nTom: Ich schwimme. Zweimal in der Woche gehe ich ins Schwimmbad und übe. Im Verein spielen wir auch zusammen — manchmal gewinnen wir. Wer will, kann mitmachen.\n\nElif: Ich tanze gern. Tanzen kann ich gut, aber ich übe nicht viel. Meine Kinder spielen lieber — sie mögen Spiele mit dem Ball.",
    questions: [
      {
        text: "Was ist Mias Hobby?",
        options: ["Malen und Basteln", "Singen", "Schwimmen"],
        answer: 0,
        explain: "„Mein Hobby ist Malen und Basteln.“",
      },
      {
        text: "Was kann Mia nicht so gut?",
        options: ["singen", "malen", "basteln"],
        answer: 0,
        explain: "„Ich kann nicht so gut singen.“",
      },
      {
        kind: "gapfill",
        text: "Tom geht ___ in der Woche ins Schwimmbad.",
        options: [],
        answer: 0,
        accept: ["zweimal"],
        explain: "„Zweimal in der Woche gehe ich ins Schwimmbad.“",
      },
      {
        text: "Wer kann im Verein mitmachen?",
        options: ["wer will", "nur Kinder", "niemand"],
        answer: 0,
        explain: "„Wer will, kann mitmachen.“",
      },
      {
        text: "Richtig oder falsch? Elif übt viel.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Tanzen kann ich gut, aber ich übe nicht viel.“",
      },
          {
        kind: "gapfill",
        text: "Mia: In meiner ___ male ich.",
        options: [],
        answer: 0,
        accept: ["Freizeit"],
        explain: "„Mia: In meiner Freizeit male ich.“",
      },
],
  },
  {
    id: "a1-u18-r2",
    level: "A1",
    skill: "reading",
    unit: 18,
    title: "Die Lampe ist kaputt",
    genre: "Not",
    intro: "Apartman görevlisine bırakılmış bir not.",
    gloss: [
      { de: "kaputt", tr: "bozuk", en: "broken" },
      { de: "funktionieren", tr: "çalışmak", en: "to work" },
      { de: "die Reparatur", tr: "tamir", en: "repair" },
    ],
    minutes: 3,
    text:
      "Lieber Herr Berger,\n\ndie Lampe im Flur ist kaputt. Sie funktioniert seit Montag nicht. Am Abend sieht man die Treppe nicht gut.\n\nAuch das Licht auf dem Balkon funktioniert nicht. Ich mache da kein Feuer, aber ohne Licht sehe ich nichts.\n\nKönnen Sie kommen und das reparieren? Ich bin am Dienstag und am Mittwoch zu Hause.\n\nWas kostet die Reparatur? Bitte schreiben Sie mir.\n\nViele Grüße\nFrau Kaya (Wohnung 5)",
    questions: [
      {
        text: "Was ist kaputt?",
        options: ["die Lampe im Flur", "die Treppe", "der Aufzug"],
        answer: 0,
        explain: "„die Lampe im Flur ist kaputt.“",
      },
      {
        text: "Was funktioniert auch nicht?",
        options: ["das Licht auf dem Balkon", "die Waschmaschine", "der Kühlschrank"],
        answer: 0,
        explain: "„Auch das Licht auf dem Balkon funktioniert nicht.“",
      },
      {
        kind: "gapfill",
        text: "Die Lampe funktioniert seit ___ nicht.",
        options: [],
        answer: 0,
        accept: ["Montag"],
        explain: "„Sie funktioniert seit Montag nicht.“",
      },
      {
        text: "Wann ist Frau Kaya zu Hause?",
        options: ["am Dienstag und am Mittwoch", "am Montag", "immer"],
        answer: 0,
        explain: "„Ich bin am Dienstag und am Mittwoch zu Hause.“",
      },
          {
        kind: "gapfill",
        text: "die Lampe im Flur ist ___.",
        options: [],
        answer: 0,
        accept: ["kaputt"],
        explain: "„die Lampe im Flur ist kaputt.“",
      },
],
  },
  {
    id: "a1-u18-l1",
    level: "A1",
    skill: "listening",
    unit: 18,
    title: "Kannst du das reparieren?",
    genre: "Telefon",
    intro: "Apartman görevlisiyle telefon konuşması.",
    gloss: [
      { de: "reparieren", tr: "tamir etmek", en: "to repair" },
      { de: "die Reparatur", tr: "tamir", en: "repair" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag, hier ist Kaya aus Wohnung 5. Die Lampe im Flur ist kaputt." },
      { text: "Seit wann funktioniert sie nicht?" },
      { text: "Seit Montag. Am Abend sieht man nichts." },
      { text: "Ich komme am Mittwoch. Können Sie um 10 Uhr?" },
      { text: "Ja, das passt. Was kostet die Reparatur?" },
      { text: "Nichts. Das macht der Vermieter." },
    ],
    questions: [
      {
        text: "Was ist das Problem?",
        options: ["Die Lampe im Flur ist kaputt", "Der Aufzug geht nicht", "Das Fenster ist kaputt"],
        answer: 0,
        explain: "„Die Lampe im Flur ist kaputt.“",
      },
      {
        kind: "gapfill",
        text: "Der Hausmeister kommt am ___.",
        options: [],
        answer: 0,
        accept: ["Mittwoch"],
        explain: "„Ich komme am Mittwoch.“",
      },
      {
        text: "Was kostet die Reparatur?",
        options: ["nichts", "10 Euro", "das sagt er nicht"],
        answer: 0,
        explain: "„Nichts. Das macht der Vermieter.“",
      },
      {
        text: "Richtig oder falsch? 10 Uhr passt Frau Kaya nicht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ja, das passt.“",
      },
          {
        kind: "gapfill",
        text: "Was kostet die ___?",
        options: [],
        answer: 0,
        accept: ["Reparatur"],
        explain: "„Was kostet die Reparatur?“",
      },
],
  },
  {
    id: "a1-u18-l2",
    level: "A1",
    skill: "listening",
    unit: 18,
    title: "Auf dem Balkon",
    genre: "Diyalog",
    intro: "İki komşu balkonda konuşuyor.",
    gloss: [
      { de: "gießen", tr: "sulamak", en: "to water" },
      { de: "die Blume", tr: "çiçek", en: "flower" },
    ],
    minutes: 2,
    segments: [
      { text: "Schön hier auf dem Balkon!" },
      { text: "Ja, ich sitze hier gern. Der Stuhl steht immer da." },
      { text: "Und die Blumen? Wer gießt sie?" },
      { text: "Ich gieße sie jeden Abend. Hier ist viel Wind." },
      { text: "Meine Blumen liegen leider immer im Zimmer." },
    ],
    questions: [
      {
        text: "Wo sitzt die Person gern?",
        options: ["auf dem Balkon", "im Garten", "im Zimmer"],
        answer: 0,
        explain: "„Ja, ich sitze hier gern.“ — balkonda.",
      },
      {
        text: "Wann gießt die Person die Blumen?",
        options: ["jeden Abend", "jeden Morgen", "nie"],
        answer: 0,
        explain: "„Ich gieße sie jeden Abend.“",
      },
      {
        kind: "gapfill",
        text: "Der ___ steht immer auf dem Balkon.",
        options: [],
        answer: 0,
        accept: ["Stuhl"],
        explain: "„Der Stuhl steht immer da.“",
      },
      {
        text: "Was gibt es hier viel?",
        options: ["Wind", "Blumen", "Stühle"],
        answer: 0,
        explain: "„Hier ist viel Wind.“",
      },
          {
        kind: "gapfill",
        text: "___ hier auf dem Balkon!",
        options: [],
        answer: 0,
        accept: ["Schön"],
        explain: "„Schön hier auf dem Balkon!“",
      },
],
  },
  {
    id: "a1-u18-w1",
    level: "A1",
    skill: "writing",
    unit: 18,
    title: "können: yetenek mi, imkân mı?",
    genre: "Dil bilgisi",
    intro: "„können“ fiilinin iki kullanımını yaz.",
    gloss: [
      { de: "können", tr: "-ebilmek", en: "can" },
      { de: "funktionieren", tr: "çalışmak", en: "to work" },
      { de: "üben", tr: "alıştırma yapmak", en: "to practise" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "İyi yüzebiliyorum.",
        answer: "Ich kann gut schwimmen",
        hint: "Burada „können“ YETENEK bildiriyor. Mastar cümlenin SONUNDA durur: kann … schwimmen.",
      },
      {
        kind: "build",
        tr: "Gelip tamir edebilir misiniz?",
        answer: "Können Sie kommen und das reparieren",
        hint: "Burada „können“ İMKÂN/rica bildiriyor — yetenek değil. Türkçede ikisi de „-ebilmek“.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz ve „nicht so gut“ ile yaz.",
        source: "Ich kann singen.",
        answer: "Ich kann nicht so gut singen.",
        alternatives: ["Ich kann nicht so gut singen"],
        why: "„nicht so gut“ kibar bir olumsuzlama: „hiç yapamıyorum“ demeden „pek iyi değilim“ demek.",
      },
    ],
  },
  {
    id: "a1-u18-w2",
    level: "A1",
    skill: "writing",
    unit: 18,
    title: "Ein Problem melden",
    genre: "Not",
    intro: "Apartman görevlisine bozuk bir şey için not yaz.",
    gloss: [
      { de: "kaputt", tr: "bozuk", en: "broken" },
      { de: "der Hausmeister", tr: "apartman görevlisi", en: "caretaker" },
      { de: "reparieren", tr: "tamir etmek", en: "to repair" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Balkondaki ışık çalışmıyor.",
        answer: "Das Licht auf dem Balkon funktioniert nicht",
        hint: "„funktionieren“ makine ve elektrik için kullanılır; „kaputt sein“ ile aynı anlama gelir.",
      },
      {
        kind: "free",
        prompt:
          "Apartman görevlisine not yaz (4-5 cümle). Neyin bozuk olduğunu, ne zamandır böyle olduğunu, ne zaman evde olduğunu ve fiyatı sor.",
        minWords: 30,
        checklist: [
          "Neyin bozuk olduğunu yazdın mı? (… ist kaputt / … funktioniert nicht)",
          "Ne zamandır böyle? (seit Montag / seit einer Woche)",
          "Ne zaman evdesin? (Ich bin am … zu Hause.)",
          "Fiyatı sordun mu? (Was kostet die Reparatur?)",
        ],
        phrases: [
          { de: "… ist kaputt.", tr: "… bozuk.", en: "… is broken." },
          { de: "Können Sie kommen?", tr: "Gelebilir misiniz?", en: "Can you come?" },
          { de: "Was kostet die Reparatur?", tr: "Tamir ne kadar?", en: "What does the repair cost?" },
        ],
        sample:
          "Lieber Herr Berger,\n\ndie Lampe im Flur ist kaputt. Sie funktioniert seit Montag nicht. Am Abend sieht man nichts.\n\nKönnen Sie kommen und das reparieren? Ich bin am Dienstag und am Mittwoch zu Hause.\n\nWas kostet die Reparatur? Bitte schreiben Sie mir.\n\nViele Grüße\nFrau Kaya (Wohnung 5)",
      },
    ],
  },
];
