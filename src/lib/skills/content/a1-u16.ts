import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 16 — "Ev, odalar, mobilya ve komşular".
 *
 * Dört ders: Meine Wohnung · Die Zimmer · Wo steht das Sofa? ·
 * Die neuen Nachbarn. İçerik ünite 1-16'nın kelimeleriyle sınırlı.
 *
 *   Ünite 16: die Wohnung, das Haus, das Zimmer, hell, ruhig, das Apartment,
 *             der Raum, das Fenster · das Schlafzimmer, das Wohnzimmer,
 *             die Küche, das Bad, der Flur, die Dusche, die Treppe,
 *             der Eingang · das Sofa, der Tisch, der Schrank, die Wand,
 *             die Ecke, die Möbel, stellen, stehen · der Nachbar,
 *             die Nachbarin, klopfen, willkommen, neu, der Aufzug, der Stock,
 *             der Bekannte
 *   Kalıplar: Es gibt … · Die Wohnung hat … · … steht in der Ecke. ·
 *             … hängt an der Wand. · Wir sind neu hier. · Herzlich willkommen!
 *
 * Bu ünitenin dil bilgisi odağı KONUM fiilleri: stehen (dik duran şeyler),
 * liegen (yatan şeyler), hängen (asılı şeyler). Türkçede üçü de "duruyor"
 * olduğu için öğrenci ayırt edemiyor; egzersizler üçünü karşılaştırıyor.
 */
export const a1U16: SkillExercise[] = [
  {
    id: "a1-u16-r1",
    level: "A1",
    skill: "reading",
    unit: 16,
    title: "Wohnung zu vermieten",
    genre: "İlan",
    intro: "Kiralık daire ilanı. Kaç oda, ne kadar, ne var?",
    gloss: [
      { de: "die Wohnung", tr: "daire", en: "apartment" },
      { de: "hell", tr: "aydınlık", en: "bright" },
      { de: "ruhig", tr: "sessiz", en: "quiet" },
      { de: "der Stock", tr: "kat", en: "floor" },
    ],
    minutes: 3,
    text:
      "WOHNUNG IN BREMEN\n\n3 Zimmer, Küche, Bad — im 3. Stock.\n\nDie Wohnung ist hell und ruhig. Es gibt große Fenster im Wohnzimmer und im Schlafzimmer.\n\nDie Küche ist neu. Im Bad gibt es eine Dusche.\n\nEs gibt keinen Aufzug — Sie gehen die Treppe. Der Eingang ist ruhig, die Nachbarn sind nett.\n\nMöbel gibt es nicht. Tisch, Sofa und Schrank bringen Sie.\n\nPreis: 650 Euro. Frei ab Samstag.",
    questions: [
      {
        text: "Wie viele Zimmer hat die Wohnung?",
        options: ["drei", "zwei", "vier"],
        answer: 0,
        explain: "„3 Zimmer, Küche, Bad“ — mutfak ve banyo ayrı sayılıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Wohnung ist im Stock ___.",
        options: [],
        answer: 0,
        accept: ["3.", "3"],
        explain: "„im 3. Stock“.",
      },
      {
        text: "Richtig oder falsch? Es gibt einen Aufzug.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Es gibt keinen Aufzug — Sie gehen die Treppe.“",
      },
      {
        text: "Was ist in der Wohnung NICHT da?",
        options: ["die Möbel", "die Dusche", "die Fenster"],
        answer: 0,
        explain: "„Möbel gibt es nicht.“ Duş ve pencereler var.",
      },
      {
        text: "Wo sind die großen Fenster?",
        options: [
          "im Wohnzimmer und im Schlafzimmer",
          "in der Küche und im Bad",
          "im Flur",
        ],
        answer: 0,
        explain: "„Es gibt große Fenster im Wohnzimmer und im Schlafzimmer.“",
      },
    ],
  },
  {
    id: "a1-u16-r2",
    level: "A1",
    skill: "reading",
    unit: 16,
    title: "Die neuen Nachbarn",
    genre: "Mesaj",
    intro: "Yeni komşulara bırakılmış bir not.",
    gloss: [
      { de: "der Nachbar", tr: "komşu", en: "neighbour" },
      { de: "klopfen", tr: "kapıyı çalmak", en: "to knock" },
      { de: "willkommen", tr: "hoş geldin", en: "welcome" },
      { de: "der Bekannte", tr: "tanıdık", en: "acquaintance" },
    ],
    minutes: 3,
    text:
      "Liebe Familie Yılmaz,\n\nherzlich willkommen im Haus! Wir sind Ihre Nachbarn aus dem zweiten Stock.\n\nSie sind neu hier. Ein paar Informationen:\n\nDer Aufzug geht manchmal nicht — dann nimmt man die Treppe. Der Eingang unten ist bis 22 Uhr auf.\n\nIm Flur bitte keine Möbel stellen. Das ist die Hausordnung.\n\nBrauchen Sie etwas? Klopfen Sie einfach! Wir sind immer zu Hause.\n\nViele Grüße\nFamilie Weber (Wohnung 5)",
    questions: [
      {
        text: "In welchem Stock wohnt Familie Weber?",
        options: ["im zweiten", "im dritten", "unten"],
        answer: 0,
        explain: "„Wir sind Ihre Nachbarn aus dem zweiten Stock.“",
      },
      {
        text: "Was soll man im Flur nicht machen?",
        options: ["Möbel stellen", "klopfen", "die Treppe gehen"],
        answer: 0,
        explain: "„Im Flur bitte keine Möbel stellen.“",
      },
      {
        kind: "gapfill",
        text: "Der Eingang ist bis ___ Uhr auf.",
        options: [],
        answer: 0,
        accept: ["22"],
        explain: "„Der Eingang unten ist bis 22 Uhr auf.“",
      },
      {
        text: "Was soll Familie Yılmaz machen, wenn sie etwas braucht?",
        options: ["klopfen", "eine E-Mail schreiben", "zum Eingang gehen"],
        answer: 0,
        explain: "„Klopfen Sie einfach!“",
      },
    ],
  },
  {
    id: "a1-u16-l1",
    level: "A1",
    skill: "listening",
    unit: 16,
    title: "Wo steht das Sofa?",
    genre: "Diyalog",
    intro: "İki kişi mobilyaların yerini konuşuyor. Ne nerede?",
    gloss: [
      { de: "stehen", tr: "ayakta durmak", en: "to stand" },
      { de: "die Ecke", tr: "köşe", en: "corner" },
      { de: "die Wand", tr: "duvar", en: "wall" },
    ],
    minutes: 2,
    segments: [
      { text: "Wo stellen wir das Sofa?" },
      { text: "Das Sofa steht gut in der Ecke, beim Fenster." },
      { text: "Und der Tisch?" },
      { text: "Der Tisch steht in der Mitte. Das Bild hängt an der Wand." },
      { text: "Und der Schrank kommt ins Schlafzimmer." },
    ],
    questions: [
      {
        text: "Wo steht das Sofa?",
        options: ["in der Ecke, beim Fenster", "in der Mitte", "im Schlafzimmer"],
        answer: 0,
        explain: "„Das Sofa steht gut in der Ecke, beim Fenster.“",
      },
      {
        kind: "gapfill",
        text: "Das Bild ___ an der Wand.",
        options: [],
        answer: 0,
        accept: ["hängt"],
        explain: "Asılı şeyler için „hängen“: Das Bild hängt an der Wand. Dik duranlar için „stehen“.",
      },
      {
        text: "Wo kommt der Schrank hin?",
        options: ["ins Schlafzimmer", "in die Küche", "in den Flur"],
        answer: 0,
        explain: "„der Schrank kommt ins Schlafzimmer.“",
      },
      {
        text: "Was steht in der Mitte?",
        options: ["der Tisch", "das Sofa", "der Schrank"],
        answer: 0,
        explain: "„Der Tisch steht in der Mitte.“",
      },
    ],
  },
  {
    id: "a1-u16-l2",
    level: "A1",
    skill: "listening",
    unit: 16,
    title: "Herzlich willkommen!",
    genre: "Diyalog",
    intro: "Yeni komşu kapıyı çalıyor.",
    gloss: [
      { de: "neu", tr: "yeni", en: "new" },
      { de: "der Aufzug", tr: "asansör", en: "lift" },
      { de: "die Nachbarin", tr: "kadın komşu", en: "neighbour (f.)" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag! Wir sind neu hier, Wohnung 7." },
      { text: "Herzlich willkommen! Ich bin Ihre Nachbarin aus Wohnung 5." },
      { text: "Freut mich! Eine Frage: Funktioniert der Aufzug?" },
      { text: "Heute nicht. Sie müssen die Treppe gehen." },
      { text: "Kein Problem. Wir wohnen im zweiten Stock." },
    ],
    questions: [
      {
        text: "In welcher Wohnung wohnen die neuen Nachbarn?",
        options: ["Wohnung 7", "Wohnung 5", "Wohnung 2"],
        answer: 0,
        explain: "„Wir sind neu hier, Wohnung 7.“ 5 numara komşunun dairesi.",
      },
      {
        text: "Funktioniert der Aufzug heute?",
        options: ["Nein", "Ja", "Nur bis 22 Uhr"],
        answer: 0,
        explain: "„Heute nicht. Sie müssen die Treppe gehen.“",
      },
      {
        kind: "gapfill",
        text: "Die neuen Nachbarn wohnen im ___ Stock.",
        options: [],
        answer: 0,
        accept: ["zweiten", "2."],
        explain: "„Wir wohnen im zweiten Stock.“",
      },
      {
        text: "Richtig oder falsch? Die Nachbarin ist nicht nett.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Herzlich willkommen!“ diyor — çok nazik.",
      },
    ],
  },
  {
    id: "a1-u16-w1",
    level: "A1",
    skill: "writing",
    unit: 16,
    title: "stehen, liegen, hängen",
    genre: "Dil bilgisi",
    intro: "Konum fiillerini ayırt et.",
    gloss: [
      { de: "stehen", tr: "ayakta durmak", en: "to stand" },
      { de: "stellen", tr: "koymak", en: "to put" },
      { de: "die Wand", tr: "duvar", en: "wall" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Kanepe köşede duruyor.",
        answer: "Das Sofa steht in der Ecke",
        hint: "Almancada „duruyor“ için üç fiil var: DİK duranlar stehen, YATAN şeyler liegen, ASILI olanlar hängen. Kanepe dik durur.",
      },
      {
        kind: "build",
        tr: "Evde asansör yok.",
        answer: "Es gibt keinen Aufzug im Haus",
        hint: "„Es gibt“ + Akkusativ: es gibt einen/keinen Aufzug. Türkçedeki „var/yok“un karşılığı.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi „hängen“ ile yaz (resim için).",
        source: "Das Bild steht an der Wand.",
        answer: "Das Bild hängt an der Wand.",
        alternatives: ["Das Bild hängt an der Wand"],
        why: "Duvardaki resim ASILIDIR, dik durmaz — bu yüzden „hängen“ kullanılır.",
      },
    ],
  },
  {
    id: "a1-u16-w2",
    level: "A1",
    skill: "writing",
    unit: 16,
    title: "Meine Wohnung beschreiben",
    genre: "Forum mesajı",
    intro: "Evini anlat: kaç oda, ne var, nasıl?",
    gloss: [
      { de: "das Zimmer", tr: "oda", en: "room" },
      { de: "hell", tr: "aydınlık", en: "bright" },
      { de: "die Möbel", tr: "mobilya", en: "furniture" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Dairemin üç odası var.",
        answer: "Meine Wohnung hat drei Zimmer",
        hint: "„haben“ ile de kurulur, „Es gibt“ ile de: Es gibt drei Zimmer in meiner Wohnung.",
      },
      {
        kind: "free",
        prompt:
          "Evini anlat (4-5 cümle). Kaç oda var, nasıl bir yer, hangi mobilyalar nerede duruyor?",
        minWords: 30,
        checklist: [
          "Oda sayısını yazdın mı? (… hat drei Zimmer / Es gibt …)",
          "Evi tarif ettin mi? (hell, ruhig, neu, klein, groß)",
          "En az iki mobilya yazdın mı? (das Sofa, der Tisch, der Schrank)",
          "Konum fiili kullandın mı? (steht, hängt, liegt)",
        ],
        phrases: [
          { de: "Meine Wohnung hat …", tr: "Dairemin … var", en: "My flat has …" },
          { de: "… steht in der Ecke.", tr: "… köşede duruyor.", en: "… stands in the corner." },
          { de: "Es gibt …", tr: "… var", en: "There is …" },
        ],
        sample:
          "Hallo!\n\nMeine Wohnung hat drei Zimmer: ein Wohnzimmer, ein Schlafzimmer und eine Küche. Das Bad ist klein, aber es gibt eine Dusche.\n\nDie Wohnung ist hell und ruhig. Im Wohnzimmer gibt es große Fenster.\n\nDas Sofa steht in der Ecke und der Tisch steht in der Mitte. An der Wand hängt ein Bild.\n\nWir wohnen im 3. Stock und es gibt keinen Aufzug — jeden Tag die Treppe!",
      },
    ],
  },
];
