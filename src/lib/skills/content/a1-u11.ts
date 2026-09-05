import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 11 — "Kıyafet, beden, renkler ve fiyat".
 *
 * Dört ders: Kleidung kaufen · Welche Größe haben Sie? · Die Jacke in Blau ·
 * Was kostet das? İçerik ünite 1-11'in kelimeleriyle sınırlı.
 *
 *   Ünite 11: der Pullover, die Jacke, die Hose, suchen, die Kasse, die Bluse,
 *             das Kleid, der Mantel · die Größe, anprobieren, das Hemd,
 *             die Umkleide, welche, der Schuh, die Jeans, kurz · die Farbe,
 *             rot, blau, schwarz, weiß, die Kleidung, das T-Shirt, der Ring ·
 *             der Preis, teuer, günstig, das Angebot, bar, billig,
 *             die Kreditkarte, das Konto
 *   Kalıplar: Ich suche einen … · Wo ist die Kasse? · Welche Größe haben Sie? ·
 *             Kann ich das anprobieren? · Es passt nicht. · Haben Sie das auch
 *             in Rot? · Was kostet …? · Das ist zu teuer.
 *
 * Renk adları cümlede iki biçimde geçiyor ve ikisi de öğretiliyor:
 * sıfat olarak küçük harf ("Die Jacke ist rot") ve renk adı olarak büyük harf
 * ("in Rot", "in Schwarz"). Egzersizler ikisini de gösteriyor.
 */
export const a1U11: SkillExercise[] = [
  {
    id: "a1-u11-r1",
    level: "A1",
    skill: "reading",
    unit: 11,
    title: "Sommerangebote",
    genre: "İlan",
    intro: "Bir mağazanın indirim ilanını okuyacaksın. Ne kaça?",
    gloss: [
      { de: "das Angebot", tr: "indirim", en: "special offer" },
      { de: "günstig", tr: "uygun fiyatlı", en: "cheap" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "die Größe", tr: "beden", en: "size" },
    ],
    minutes: 3,
    text:
      "KLEIDUNG SCHMIDT — Angebote diese Woche\n\nT-Shirts (weiß, schwarz, blau) — 9,00 Euro\nJeans (Größe 38 bis 46) — 29,00 Euro\nPullover in Rot oder Schwarz — 19,00 Euro\nBlusen (Größe 36 bis 44) — 15,00 Euro\nSchuhe — 45,00 Euro\n\nMäntel und Kleider sind diese Woche NICHT im Angebot.\n\nSie können bar, mit Kreditkarte oder vom Konto bezahlen. Die Kasse ist bei der Tür.\n\nSie möchten etwas anprobieren? Die Umkleide ist immer frei!",
    questions: [
      {
        text: "Was kostet ein T-Shirt?",
        options: ["9,00 Euro", "19,00 Euro", "29,00 Euro"],
        answer: 0,
        explain: "„T-Shirts (weiß, schwarz, blau) — 9,00 Euro“.",
      },
      {
        text: "In welchen Farben gibt es die Pullover?",
        options: ["in Rot oder Schwarz", "in Weiß oder Blau", "nur in Schwarz"],
        answer: 0,
        explain: "„Pullover in Rot oder Schwarz“. Renk adı olarak BÜYÜK harfle yazılıyor.",
      },
      {
        text: "Richtig oder falsch? Mäntel sind auch im Angebot.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Mäntel und Kleider sind diese Woche NICHT im Angebot.“",
      },
      {
        kind: "gapfill",
        text: "Man kann bar oder mit ___ bezahlen.",
        options: [],
        answer: 0,
        accept: ["Kreditkarte", "der Kreditkarte"],
        explain: "„Sie können bar oder mit Kreditkarte bezahlen.“",
      },
      {
        text: "Wo ist die Kasse?",
        options: ["bei der Tür", "in der Umkleide", "neben den Schuhen"],
        answer: 0,
        explain: "„Die Kasse ist bei der Tür.“",
      },
    ],
  },
  {
    id: "a1-u11-r2",
    level: "A1",
    skill: "reading",
    unit: 11,
    title: "Was trägst du gern?",
    genre: "Forum mesajı",
    intro: "Üç kişi ne giymeyi sevdiğini yazıyor.",
    gloss: [
      { de: "die Kleidung", tr: "kıyafet", en: "clothes" },
      { de: "billig", tr: "ucuz", en: "cheap" },
      { de: "kurz", tr: "kısa", en: "short" },
    ],
    minutes: 3,
    text:
      "Mia: Ich trage gern Jeans und ein weißes T-Shirt. Kleider trage ich nie — sie passen mir nicht.\n\nTom: Meine Kleidung ist immer schwarz! Schwarze Hose, schwarzer Pullover, schwarze Schuhe. Für meine Freunde ist das zu viel Schwarz.\n\nElif: Ich mag Farben: rot, blau, alles. Aber teure Kleidung kaufe ich nicht. Ich suche immer ein Angebot. Ein Hemd für 9 Euro ist billig und gut!",
    questions: [
      {
        text: "Was trägt Mia gern?",
        options: ["Jeans und ein T-Shirt", "Kleider", "einen Mantel"],
        answer: 0,
        explain: "„Ich trage gern Jeans und ein weißes T-Shirt.“",
      },
      {
        text: "Welche Farbe hat Toms Kleidung?",
        options: ["schwarz", "rot", "blau"],
        answer: 0,
        explain: "„Meine Kleidung ist immer schwarz!“",
      },
      {
        text: "Richtig oder falsch? Elif kauft gern teure Kleidung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „teure Kleidung kaufe ich nicht. Ich suche immer ein Angebot.“",
      },
      {
        kind: "gapfill",
        text: "Ein Hemd für 9 Euro ist ___.",
        options: [],
        answer: 0,
        accept: ["billig"],
        explain: "„Ein Hemd für 9 Euro ist billig und gut!“",
      },
    ],
  },
  {
    id: "a1-u11-l1",
    level: "A1",
    skill: "listening",
    unit: 11,
    title: "Im Kleidungsgeschäft",
    genre: "Diyalog",
    intro: "Bir müşteri kazak arıyor. Hangi beden, hangi renk, ne kadar?",
    gloss: [
      { de: "suchen", tr: "aramak", en: "to look for" },
      { de: "anprobieren", tr: "denemek", en: "to try on" },
      { de: "die Umkleide", tr: "soyunma kabini", en: "changing room" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag! Ich suche einen Pullover." },
      { text: "Welche Größe haben Sie?" },
      { text: "Größe 40. Haben Sie den auch in Blau?" },
      { text: "Ja. Möchten Sie ihn anprobieren? Die Umkleide ist da." },
      { text: "Er passt gut. Was kostet er?" },
      { text: "19 Euro — er ist im Angebot." },
    ],
    questions: [
      {
        text: "Was sucht der Kunde?",
        options: ["einen Pullover", "eine Hose", "ein Hemd"],
        answer: 0,
        explain: "„Ich suche einen Pullover.“",
      },
      {
        kind: "gapfill",
        text: "Der Kunde hat Größe ___.",
        options: [],
        answer: 0,
        accept: ["40"],
        explain: "„Größe 40.“",
      },
      {
        text: "In welcher Farbe möchte er den Pullover?",
        options: ["in Blau", "in Rot", "in Schwarz"],
        answer: 0,
        explain: "„Haben Sie den auch in Blau?“",
      },
      {
        text: "Warum kostet der Pullover nur 19 Euro?",
        options: ["Er ist im Angebot", "Er ist zu kurz", "Er ist alt"],
        answer: 0,
        explain: "„19 Euro — er ist im Angebot.“",
      },
    ],
  },
  {
    id: "a1-u11-l2",
    level: "A1",
    skill: "listening",
    unit: 11,
    title: "Das ist zu teuer",
    genre: "Diyalog",
    intro: "Bir müşteri fiyatı beğenmiyor. Ne yapıyor?",
    gloss: [
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "günstig", tr: "uygun fiyatlı", en: "reasonable" },
      { de: "bar", tr: "nakit", en: "cash" },
    ],
    minutes: 2,
    segments: [
      { text: "Was kostet dieser Mantel?" },
      { text: "Der kostet 120 Euro." },
      { text: "Oh, das ist zu teuer für mich." },
      { text: "Wir haben auch Jacken. Die sind günstiger — 45 Euro." },
      { text: "Gut, die nehme ich. Ich bezahle bar." },
    ],
    questions: [
      {
        text: "Was kostet der Mantel?",
        options: ["120 Euro", "45 Euro", "19 Euro"],
        answer: 0,
        explain: "„Der kostet 120 Euro.“",
      },
      {
        text: "Warum kauft die Person den Mantel nicht?",
        options: ["Er ist zu teuer", "Er ist zu kurz", "Die Farbe passt nicht"],
        answer: 0,
        explain: "„das ist zu teuer für mich.“",
      },
      {
        kind: "gapfill",
        text: "Die Person kauft eine Jacke für ___ Euro.",
        options: [],
        answer: 0,
        accept: ["45"],
        explain: "„Die sind günstiger — 45 Euro.“ — „Gut, die nehme ich.“",
      },
      {
        text: "Wie bezahlt die Person?",
        options: ["bar", "mit Kreditkarte", "gar nicht"],
        answer: 0,
        explain: "„Ich bezahle bar.“",
      },
    ],
  },
  {
    id: "a1-u11-w1",
    level: "A1",
    skill: "writing",
    unit: 11,
    title: "Größe, Farbe, Preis",
    genre: "Dil bilgisi",
    intro: "Alışveriş kalıplarını yaz.",
    gloss: [
      { de: "die Größe", tr: "beden", en: "size" },
      { de: "anprobieren", tr: "denemek", en: "to try on" },
      { de: "das Angebot", tr: "indirim", en: "offer" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir ceket arıyorum.",
        answer: "Ich suche eine Jacke",
        hint: "„suchen“ Akkusativ ister: die Jacke → eine Jacke; der Pullover → einen Pullover.",
      },
      {
        kind: "build",
        tr: "Kazağı alıyorum. → Onu alıyorum.",
        answer: "Ich nehme ihn",
        hint: "Nesneyi ikinci kez adlandırmazsın, ZAMİRLE gösterirsin — ve zamir nesnenin artikeline uyar: der Pullover → ihn, die Jacke → sie, das Hemd → es. A1 boyunca „mir/dir“ öğrenildi; bu üçüncü kişi biçimi.",
      },
      {
        kind: "build",
        tr: "Bunu deneyebilir miyim?",
        answer: "Kann ich das anprobieren",
        hint: "anprobieren ayrılabilir bir fiil ama „kann“ ile mastar hâlinde SONDA durur, ayrılmaz.",
      },
      {
        kind: "rewrite",
        prompt: "Rengi sorarak yaz.",
        source: "Ich möchte den Pullover.",
        answer: "Haben Sie den Pullover auch in Blau?",
        alternatives: ["Haben Sie den Pullover auch in Rot?", "Haben Sie den Pullover auch in Schwarz?"],
        why: "Renk adı olarak kullanılınca BÜYÜK harfle yazılır: in Blau, in Rot. Sıfat olunca küçük: Der Pullover ist blau.",
      },
    ],
  },
  {
    id: "a1-u11-w2",
    level: "A1",
    skill: "writing",
    unit: 11,
    title: "Kleidung beschreiben",
    genre: "Forum mesajı",
    intro: "Ne giymeyi sevdiğini yaz.",
    gloss: [
      { de: "die Kleidung", tr: "kıyafet", en: "clothes" },
      { de: "die Farbe", tr: "renk", en: "colour" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bu bana çok pahalı.",
        answer: "Das ist zu teuer für mich",
        hint: "„zu“ + sıfat = fazla: zu teuer, zu kurz, zu klein. „sehr teuer“ ise sadece „çok pahalı“ demek.",
      },
      {
        kind: "free",
        prompt:
          "Foruma yaz (4-5 cümle): Ne giymeyi seversin, hangi renkleri seversin, pahalı kıyafet alır mısın?",
        minWords: 30,
        checklist: [
          "En az iki kıyafet adı yazdın mı? (die Jeans, der Pullover, das Hemd …)",
          "En az iki renk yazdın mı? (rot, blau, schwarz, weiß)",
          "Fiyat hakkında bir şey söyledin mi? (teuer, günstig, billig, im Angebot)",
          "Sevmediğin bir şey yazdın mı? (… trage ich nie.)",
        ],
        phrases: [
          { de: "Ich trage gern …", tr: "… giymeyi severim", en: "I like wearing …" },
          { de: "in Blau / in Rot", tr: "mavi / kırmızı olanı", en: "in blue / in red" },
          { de: "Das ist zu teuer.", tr: "Bu çok pahalı.", en: "That's too expensive." },
        ],
        sample:
          "Hallo!\n\nIch trage gern Jeans und ein Hemd. Meine Lieblingsfarben sind blau und weiß. Ein schwarzes T-Shirt habe ich auch.\n\nKleider trage ich nie — sie passen mir nicht.\n\nTeure Kleidung kaufe ich nicht. Ich suche immer ein Angebot. Ein Pullover für 19 Euro — das ist günstig!\n\nUnd ihr? Welche Farben tragt ihr gern?",
      },
    ],
  },
];
