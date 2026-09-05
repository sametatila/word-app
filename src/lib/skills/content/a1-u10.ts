import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 10 — "İş günü, mesai sonu, hafta sonu planı, randevu".
 *
 * Dört ders: Ein langer Arbeitstag · Endlich Feierabend! · Was machst du am
 * Wochenende? · Hast du morgen Zeit? İçerik ünite 1-10'un kelimeleriyle
 * sınırlı.
 *
 *   Ünite 10: anfangen, aufhören, die Pause, der Kollege, der Arbeitsplatz,
 *             die Aufgabe, das Praktikum, enden · der Feierabend, die Lust,
 *             fernsehen, spazieren gehen, endlich, der Spaß, das Ende,
 *             sitzen · der Plan, vielleicht, frei, ausschlafen, der Ausflug,
 *             der Urlaub, die Ferien, wandern · das Treffen, passen,
 *             der Anruf, der Vormittag, der Nachmittag, telefonieren,
 *             das Gespräch, fertig sein
 *   Kalıplar: Die Arbeit fängt um … an. · Ich mache eine Pause. ·
 *             Nach der Arbeit … · Am Samstag … · Vielleicht … ·
 *             Hast du am … Zeit? · Um … passt es mir. · Leider kann ich nicht.
 *
 * Randevu ayarlama bu ünitenin işlevsel odağı: teklif → uymuyor → yeni teklif →
 * kabul. Dinleme ve yazma görevleri bu zinciri kuruyor; "passt es mir" ve
 * "Leider kann ich nicht" kalıpları tekrar tekrar geçiyor.
 */
export const a1U10: SkillExercise[] = [
  {
    id: "a1-u10-r1",
    level: "A1",
    skill: "reading",
    unit: 10,
    title: "Mein Arbeitstag",
    genre: "Blog",
    intro: "Elif iş gününü anlatıyor: ne zaman başlıyor, ne zaman bitiyor?",
    gloss: [
      { de: "anfangen", tr: "başlamak", en: "to start" },
      { de: "aufhören", tr: "bırakmak", en: "to stop" },
      { de: "die Pause", tr: "mola", en: "break" },
      { de: "der Kollege", tr: "iş arkadaşı", en: "colleague" },
    ],
    minutes: 3,
    text:
      "Meine Arbeit fängt um acht Uhr an. Ich komme immer schon um zehn vor acht an meinem Arbeitsplatz an.\n\nAm Vormittag habe ich viele Aufgaben. Um halb eins mache ich eine Pause und esse mit meinen Kollegen zusammen.\n\nAm Nachmittag telefoniere ich viel. Manchmal telefoniere ich eine Stunde.\n\nIch höre um fünf Uhr auf. Dann ist endlich Feierabend! Nach der Arbeit gehe ich spazieren oder sitze zu Hause und sehe fern.\n\nAm Freitag bin ich immer sehr müde, aber am Samstag habe ich frei.",
    questions: [
      {
        text: "Wann fängt Elifs Arbeit an?",
        options: ["um acht Uhr", "um zehn vor acht", "um halb eins"],
        answer: 0,
        explain: "„Meine Arbeit fängt um acht Uhr an.“ Zehn vor acht işe VARDIĞI saat.",
      },
      {
        text: "Was macht Elif um halb eins?",
        options: ["eine Pause", "sie telefoniert", "sie geht spazieren"],
        answer: 0,
        explain: "„Um halb eins mache ich eine Pause und esse mit meinen Kollegen.“",
      },
      {
        kind: "gapfill",
        text: "Elif hört um ___ Uhr auf.",
        options: [],
        answer: 0,
        accept: ["fünf", "5"],
        explain: "„Ich höre um fünf Uhr auf.“ — aufhören ayrılabilir fiil.",
      },
      {
        text: "Was macht Elif nach der Arbeit?",
        options: ["spazieren gehen oder fernsehen", "arbeiten", "einkaufen"],
        answer: 0,
        explain: "„Nach der Arbeit gehe ich spazieren oder sitze zu Hause und sehe fern.“",
      },
      {
        text: "Richtig oder falsch? Am Samstag arbeitet Elif.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „am Samstag habe ich frei.“",
      },
    ],
  },
  {
    id: "a1-u10-r2",
    level: "A1",
    skill: "reading",
    unit: 10,
    title: "Pläne für das Wochenende",
    genre: "Forum mesajı",
    intro: "Üç kişi hafta sonu planını yazıyor.",
    gloss: [
      { de: "der Plan", tr: "plan", en: "plan" },
      { de: "vielleicht", tr: "belki", en: "maybe" },
      { de: "der Ausflug", tr: "gezi", en: "trip" },
      { de: "ausschlafen", tr: "geç uyanmak", en: "to sleep in" },
    ],
    minutes: 3,
    text:
      "Tom: Am Samstag mache ich einen Ausflug. Vielleicht wandern wir — das macht Spaß. Am Sonntag schlafe ich aus — bis elf!\n\nMia: Ich habe am Wochenende keine Pläne. Ich habe keine Lust auf einen Ausflug. Ich sitze zu Hause und sehe fern.\n\nElif: Meine Kinder haben Ferien. Wir machen keinen Urlaub, aber wir machen jeden Tag etwas: Am Samstag gehen wir spazieren, am Sonntag kommen meine Eltern.",
    questions: [
      {
        text: "Was macht Tom am Samstag?",
        options: ["einen Ausflug", "er schläft aus", "er sieht fern"],
        answer: 0,
        explain: "„Am Samstag mache ich einen Ausflug.“ Pazar günü geç kalkıyor.",
      },
      {
        text: "Richtig oder falsch? Mia möchte einen Ausflug machen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich habe keine Lust auf einen Ausflug.“",
      },
      {
        text: "Warum haben Elifs Kinder Zeit?",
        options: ["Sie haben Ferien", "Sie sind krank", "Sie machen ein Praktikum"],
        answer: 0,
        explain: "„Meine Kinder haben Ferien.“",
      },
      {
        kind: "gapfill",
        text: "Am Sonntag schläft Tom ___.",
        options: [],
        answer: 0,
        accept: ["aus"],
        explain: "Ayrılabilir fiil: ausschlafen → „schlafe ich aus“.",
      },
    ],
  },
  {
    id: "a1-u10-l1",
    level: "A1",
    skill: "listening",
    unit: 10,
    title: "Hast du morgen Zeit?",
    genre: "Telefon",
    intro: "Randevu ayarlanıyor. İlk teklif uymuyor — sonunda hangi saatte buluşuyorlar?",
    gloss: [
      { de: "passen", tr: "uymak", en: "to suit" },
      { de: "der Vormittag", tr: "öğleden önce", en: "morning" },
      { de: "das Treffen", tr: "buluşma", en: "meeting" },
    ],
    minutes: 2,
    segments: [
      { text: "Hallo! Hast du morgen Zeit?" },
      { text: "Am Vormittag arbeite ich. Leider kann ich nicht." },
      { text: "Und am Nachmittag? Um drei Uhr?" },
      { text: "Um drei passt es mir gut." },
      { text: "Gut, dann treffen wir uns um drei." },
    ],
    questions: [
      {
        text: "Warum kann die Person am Vormittag nicht?",
        options: ["Sie arbeitet", "Sie ist müde", "Sie hat einen Ausflug"],
        answer: 0,
        explain: "„Am Vormittag arbeite ich.“",
      },
      {
        kind: "gapfill",
        text: "Sie treffen sich um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["drei", "3"],
        explain: "„Um drei passt es mir gut.“",
      },
      {
        text: "Wann ist das Treffen?",
        options: ["am Nachmittag", "am Vormittag", "am Abend"],
        answer: 0,
        explain: "Saat üç öğleden sonra: „Und am Nachmittag? Um drei Uhr?“",
      },
      {
        text: "Richtig oder falsch? Der Vormittag passt der Person.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Vormittag arbeite ich. Leider kann ich nicht.“",
      },
    ],
  },
  {
    id: "a1-u10-l2",
    level: "A1",
    skill: "listening",
    unit: 10,
    title: "Endlich Feierabend",
    genre: "Diyalog",
    intro: "İki iş arkadaşı mesai sonunda konuşuyor.",
    gloss: [
      { de: "der Feierabend", tr: "iş çıkışı", en: "end of workday" },
      { de: "die Lust", tr: "istek", en: "desire" },
      { de: "fertig sein", tr: "hazır olmak", en: "to be done" },
    ],
    minutes: 2,
    segments: [
      { text: "Bist du fertig? Es ist fünf Uhr." },
      { text: "Ja, endlich Feierabend! Ich bin sehr müde." },
      { text: "Hast du Lust, spazieren zu gehen?" },
      { text: "Heute nicht. Ich sitze zu Hause und sehe fern." },
      { text: "Gut, dann vielleicht morgen." },
    ],
    questions: [
      {
        text: "Wie spät ist es?",
        options: ["fünf Uhr", "drei Uhr", "halb sechs"],
        answer: 0,
        explain: "„Es ist fünf Uhr.“",
      },
      {
        text: "Was möchte die zweite Person machen?",
        options: ["zu Hause fernsehen", "spazieren gehen", "arbeiten"],
        answer: 0,
        explain: "„Ich sitze zu Hause und sehe fern.“",
      },
      {
        kind: "gapfill",
        text: "„Hast du ___, spazieren zu gehen?“",
        options: [],
        answer: 0,
        accept: ["Lust"],
        explain: "Kalıp: „Hast du Lust …?“ — canın istiyor mu?",
      },
      {
        text: "Richtig oder falsch? Sie gehen heute zusammen spazieren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Heute nicht.“ — belki yarın.",
      },
    ],
  },
  {
    id: "a1-u10-w1",
    level: "A1",
    skill: "writing",
    unit: 10,
    title: "Einen Termin vereinbaren",
    genre: "Dil bilgisi",
    intro: "Randevu kalıplarını yaz.",
    gloss: [
      { de: "passen", tr: "uymak", en: "to suit" },
      { de: "anfangen", tr: "başlamak", en: "to start" },
      { de: "aufhören", tr: "bırakmak", en: "to stop" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "İşim saat sekizde başlıyor.",
        answer: "Meine Arbeit fängt um acht Uhr an",
        hint: "anfangen ayrılabilir: „fängt … an“. Ayrıca a → ä değişir: ich fange, er fängt.",
      },
      {
        kind: "build",
        tr: "Saat üç bana uyuyor.",
        answer: "Um drei passt es mir",
        hint: "Kalıp: „Um … passt es mir.“ — „passen“ Dativ ister: mir, dir, Ihnen.",
      },
      {
        kind: "rewrite",
        prompt: "Teklifi kibarca reddet.",
        source: "Ich habe morgen Zeit.",
        answer: "Leider kann ich morgen nicht.",
        alternatives: ["Leider habe ich morgen keine Zeit."],
        why: "Reddederken „leider“ ile başlanır; kaba durmamak için gerekçe ya da yeni bir teklif eklenir.",
      },
    ],
  },
  {
    id: "a1-u10-w2",
    level: "A1",
    skill: "writing",
    unit: 10,
    title: "Was machst du am Wochenende?",
    genre: "Mesaj",
    intro: "Bir arkadaşının mesajına cevap yaz.",
    gloss: [
      { de: "der Plan", tr: "plan", en: "plan" },
      { de: "vielleicht", tr: "belki", en: "maybe" },
      { de: "frei", tr: "izinli, boş", en: "free" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi izinliyim.",
        answer: "Am Samstag habe ich frei",
        hint: "Zaman önde → fiil ikinci sırada: „Am Samstag HABE ich frei“.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşının mesajına cevap yaz (4-5 cümle). Hafta sonu vaktin var mı söyle, bir plan öner ve saat ver.",
        stimulus:
          "Hallo! Hast du am Wochenende Zeit? Ich habe am Samstag frei. Vielleicht können wir spazieren gehen oder einen Ausflug machen? Wann passt es dir? Tom",
        minWords: 30,
        checklist: [
          "Vaktin olup olmadığını yazdın mı? (Ich habe frei. / Leider kann ich nicht.)",
          "Bir plan önerdin ya da kabul ettin mi? (Wir können … / Vielleicht …)",
          "Saat verdin mi? (Um drei Uhr … / Am Vormittag …)",
          "„passt“ kalıbını kullandın mı? (Um … passt es mir.)",
        ],
        phrases: [
          { de: "Ich habe am Samstag frei.", tr: "Cumartesi izinliyim.", en: "I'm free on Saturday." },
          { de: "Um … passt es mir.", tr: "Saat … bana uyar.", en: "… works for me." },
          { de: "Leider kann ich nicht.", tr: "Maalesef olmuyor.", en: "Unfortunately I can't." },
        ],
        sample:
          "Hallo Tom,\n\nam Samstag habe ich auch frei. Am Vormittag schlafe ich aus, aber am Nachmittag habe ich Zeit.\n\nEin Ausflug ist gut! Vielleicht wandern wir?\n\nUm drei Uhr passt es mir gut. Passt es dir auch?\n\nBis Samstag!\nElif",
      },
    ],
  },
];
