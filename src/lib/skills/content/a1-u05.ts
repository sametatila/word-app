import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 5 — "Görünüş, arkadaşlar, düzeltme ve kutlama".
 *
 * Dört ders: Wie sieht er aus? · Mein bester Freund · Das stimmt nicht! ·
 * Das Familienfest. İçerik ünite 1-5'in kelimeleriyle sınırlı.
 *
 *   Ünite 5: groß, klein, das Haar, aussehen, tragen, dick, hübsch, lang ·
 *            der Freund, die Freundin, treffen, oft, zusammen, kennen,
 *            kennenlernen, sympathisch · nicht, verstehen, richtig, gern,
 *            langsam, wirklich, glauben, der Quatsch · die Hochzeit, feiern,
 *            bringen, der Glückwunsch, der Kuchen, gratulieren, schenken,
 *            die Süßigkeiten
 *
 * "Das stimmt nicht!" dersinin odağı DÜZELTME. Bu yüzden okuma ve dinlemede
 * bilerek yanlış bilgi taşıyan sorular var: öğrenci metne bakıp yanlışı
 * bulacak. Doğru/yanlış soruları burada süs değil, dersin kendisi.
 */
export const a1U05: SkillExercise[] = [
  {
    id: "a1-u5-r1",
    level: "A1",
    skill: "reading",
    unit: 5,
    title: "Meine beste Freundin",
    genre: "Profil",
    intro: "Jonas en yakın arkadaşını anlatıyor: nasıl görünüyor, ne yapıyor?",
    gloss: [
      { de: "aussehen", tr: "görünmek", en: "to look" },
      { de: "sympathisch", tr: "sempatik", en: "likeable" },
      { de: "kennenlernen", tr: "tanışmak", en: "to get to know" },
      { de: "oft", tr: "sık sık", en: "often" },
    ],
    minutes: 3,
    text:
      "Meine beste Freundin heißt Nora. Wir kennen uns seit zehn Jahren.\n\nNora ist groß und hat lange Haare. Sie trägt oft eine Brille. Ich finde sie sehr hübsch und sehr sympathisch.\n\nNora ist Lehrerin. Sie arbeitet in Bremen. Ich bin Verkäufer und arbeite in einer Firma.\n\nWir treffen uns oft und sind gern zusammen. Wir kennen uns aus einem Deutschkurs.",
    questions: [
      {
        text: "Wie sieht Nora aus?",
        options: ["groß, mit langen Haaren", "klein, mit kurzen Haaren", "groß, mit einem Hund"],
        answer: 0,
        explain: "„Nora ist groß und hat lange Haare.“",
      },
      {
        text: "Was ist Nora von Beruf?",
        options: ["Lehrerin", "Verkäuferin", "Ärztin"],
        answer: 0,
        explain: "„Nora ist Lehrerin.“ Verkäufer olan Jonas'ın kendisi.",
      },
      {
        text: "Richtig oder falsch? Nora und Jonas treffen sich nicht oft.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wir treffen uns oft.“ — sık sık buluşuyorlar.",
      },
      {
        text: "Wo haben sie sich kennengelernt?",
        options: ["in einem Deutschkurs", "in einer Firma", "in einer Schule"],
        answer: 0,
        explain: "„Wir kennen uns aus einem Deutschkurs.“",
      },
      {
        kind: "gapfill",
        text: "Sie kennen sich seit ___ Jahren.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„Wir kennen uns seit zehn Jahren.“",
      },
    ],
  },
  {
    id: "a1-u5-r2",
    level: "A1",
    skill: "reading",
    unit: 5,
    title: "Einladung zur Hochzeit",
    genre: "Davetiye",
    intro: "Bir düğün davetiyesini okuyacaksın. Kim kiminle evleniyor, ne getirilecek?",
    gloss: [
      { de: "die Hochzeit", tr: "düğün", en: "wedding" },
      { de: "feiern", tr: "kutlamak", en: "to celebrate" },
      { de: "der Glückwunsch", tr: "tebrik", en: "congratulation" },
      { de: "schenken", tr: "hediye etmek", en: "to give a gift" },
    ],
    minutes: 3,
    text:
      "Liebe Familie, liebe Freunde,\n\nwir feiern unsere Hochzeit! Mia und Tom.\n\nWann? Am Samstag. Wo? Bei den Großeltern in Bremen.\n\nBitte bringt keine großen Geschenke. Wir haben schon viel. Aber Kuchen und Süßigkeiten sind immer gut!\n\nMeine Oma bringt einen Kuchen. Mein Bruder bringt Musik.\n\nWir freuen uns sehr. Bis Samstag!\nMia und Tom",
    questions: [
      {
        text: "Was feiern Mia und Tom?",
        options: ["ihre Hochzeit", "einen Geburtstag", "einen Kurs"],
        answer: 0,
        explain: "„wir feiern unsere Hochzeit!“",
      },
      {
        text: "Wo ist das Fest?",
        options: ["bei den Großeltern in Bremen", "in einer Firma", "in der Schule"],
        answer: 0,
        explain: "„Bei den Großeltern in Bremen.“",
      },
      {
        text: "Richtig oder falsch? Die Gäste sollen große Geschenke bringen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Bitte bringt keine großen Geschenke.“ Kek ve şekerleme isteniyor.",
      },
      {
        kind: "gapfill",
        text: "Die Oma bringt einen ___.",
        options: [],
        answer: 0,
        accept: ["Kuchen"],
        explain: "„Meine Oma bringt einen Kuchen.“",
      },
    ],
  },
  {
    id: "a1-u5-l1",
    level: "A1",
    skill: "listening",
    unit: 5,
    title: "Wie sieht er aus?",
    genre: "Diyalog",
    intro: "İki kişi bir arkadaşı tarif ediyor. Dikkat: biri yanlış hatırlıyor!",
    gloss: [
      { de: "tragen", tr: "giymek", en: "to wear" },
      { de: "das Haar", tr: "saç", en: "hair" },
      { de: "der Quatsch", tr: "saçmalık", en: "nonsense" },
    ],
    minutes: 2,
    segments: [
      { text: "Kennst du Max? Wie sieht er aus?" },
      { text: "Max ist klein und hat kurze Haare." },
      { text: "Nein, das stimmt nicht! Max ist groß." },
      { text: "Ach ja, richtig. Er ist groß und trägt eine Brille." },
    ],
    questions: [
      {
        text: "Wie ist Max wirklich?",
        options: ["groß", "klein", "dick"],
        answer: 0,
        explain: "İlk bilgi yanlış: „Nein, das stimmt nicht! Max ist groß.“",
      },
      {
        text: "Was trägt Max?",
        options: ["eine Brille", "einen Ball", "ein Buch"],
        answer: 0,
        explain: "„Er ist groß und trägt eine Brille.“",
      },
      {
        text: "Richtig oder falsch? Max hat lange Haare.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „hat kurze Haare“ deniyor ve bu kısım düzeltilmiyor.",
      },
      {
        kind: "gapfill",
        text: "„Nein, das stimmt ___!“",
        options: [],
        answer: 0,
        accept: ["nicht"],
        explain: "Düzeltme kalıbı: „Das stimmt nicht!“ — Bu doğru değil.",
      },
    ],
  },
  {
    id: "a1-u5-l2",
    level: "A1",
    skill: "listening",
    unit: 5,
    title: "Auf dem Familienfest",
    genre: "Diyalog",
    intro: "Aile kutlamasında iki kişi konuşuyor. Kim ne getirdi?",
    gloss: [
      { de: "gratulieren", tr: "tebrik etmek", en: "to congratulate" },
      { de: "bringen", tr: "getirmek", en: "to bring" },
      { de: "die Süßigkeiten", tr: "şekerlemeler", en: "sweets" },
    ],
    minutes: 2,
    segments: [
      { text: "Herzlichen Glückwunsch! Wir feiern heute zusammen." },
      { text: "Danke! Was bringst du?" },
      { text: "Ich bringe einen Kuchen." },
      { text: "Und meine Schwester bringt Süßigkeiten für die Kinder." },
      { text: "Sehr nett! Alle gratulieren dir." },
    ],
    questions: [
      {
        text: "Was bringt die erste Person?",
        options: ["einen Kuchen", "Süßigkeiten", "ein Buch"],
        answer: 0,
        explain: "„Ich bringe einen Kuchen.“",
      },
      {
        text: "Wer bringt die Süßigkeiten?",
        options: ["die Schwester", "die Oma", "der Bruder"],
        answer: 0,
        explain: "„meine Schwester bringt Süßigkeiten für die Kinder“.",
      },
      {
        kind: "gapfill",
        text: "„Herzlichen ___!“",
        options: [],
        answer: 0,
        accept: ["Glückwunsch"],
        explain: "Tebrik kalıbı: „Herzlichen Glückwunsch!“",
      },
      {
        text: "Richtig oder falsch? Die Süßigkeiten sind für die Erwachsenen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „für die Kinder“ — çocuklar için.",
      },
    ],
  },
  {
    id: "a1-u5-w1",
    level: "A1",
    skill: "writing",
    unit: 5,
    title: "Das stimmt nicht!",
    genre: "Dil bilgisi",
    intro: "Yanlış cümleleri düzelt ve bir kişiyi tarif et.",
    gloss: [
      { de: "richtig", tr: "doğru", en: "correct" },
      { de: "wirklich", tr: "gerçekten", en: "really" },
      { de: "glauben", tr: "inanmak", en: "to believe" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz yap (düzeltme).",
        source: "Das ist richtig.",
        answer: "Das ist nicht richtig.",
        alternatives: ["Das ist nicht richtig"],
        why: "Sıfatı olumsuzlamak için „nicht“ sıfatın ÖNÜNE gelir: nicht richtig.",
      },
      {
        kind: "build",
        tr: "Uzun saçları var.",
        answer: "Sie hat lange Haare",
        hint: "„das Haar“ tarifte çoğul kullanılır: lange Haare. Sıfat çoğulda -e alır.",
      },
      {
        kind: "build",
        tr: "Onu gerçekten tanımıyorum.",
        answer: "Ich kenne ihn wirklich nicht",
        hint: "„nicht“ cümlenin sonuna yakın durur; „wirklich“ ondan önce gelir.",
      },
    ],
  },
  {
    id: "a1-u5-w2",
    level: "A1",
    skill: "writing",
    unit: 5,
    title: "Glückwunsch schreiben",
    genre: "Kutlama mesajı",
    intro: "Bir arkadaşına düğün için tebrik mesajı yaz.",
    gloss: [
      { de: "der Glückwunsch", tr: "tebrik", en: "congratulation" },
      { de: "feiern", tr: "kutlamak", en: "to celebrate" },
      { de: "zusammen", tr: "birlikte", en: "together" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Sana tebrikler diliyorum.",
        answer: "Ich gratuliere dir",
        hint: "„gratulieren“ Dativ ister: gratuliere dir / Ihnen — „dich“ değil.",
      },
      {
        kind: "free",
        prompt:
          "Evlenen bir arkadaşına kısa bir tebrik mesajı yaz (4-5 cümle). Tebrik et, ne getireceğini söyle ve birlikte kutlamak istediğini yaz.",
        stimulus:
          "Hallo! Wir feiern am Samstag unsere Hochzeit bei den Großeltern. Kommst du auch? Bitte keine großen Geschenke — aber Kuchen ist immer gut! Mia und Tom",
        minWords: 30,
        checklist: [
          "Tebrik ettin mi? (Herzlichen Glückwunsch! / Ich gratuliere euch.)",
          "Geleceğini yazdın mı? (Ja, ich komme gern.)",
          "Ne getireceğini söyledin mi? (Ich bringe …)",
          "Birlikte kutlamak istediğini yazdın mı? (Wir feiern zusammen.)",
        ],
        phrases: [
          { de: "Herzlichen Glückwunsch!", tr: "Tebrikler!", en: "Congratulations!" },
          { de: "Ich bringe …", tr: "… getiriyorum", en: "I'll bring …" },
          { de: "Ich komme gern.", tr: "Memnuniyetle gelirim.", en: "I'll gladly come." },
        ],
        sample:
          "Liebe Mia, lieber Tom,\n\nherzlichen Glückwunsch! Ich gratuliere euch sehr.\n\nJa, ich komme gern am Samstag. Ich bringe einen Kuchen und Süßigkeiten für die Kinder.\n\nWir feiern zusammen — das wird schön!\n\nBis Samstag!\nElif",
      },
    ],
  },
];
