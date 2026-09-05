import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 17 — "Apartman kuralları, kira, temizlik ve taşınma".
 *
 * Dört ders: Die Hausordnung · Die Miete · Wir putzen die Wohnung ·
 * Der Umzug. İçerik ünite 1-17'nin kelimeleriyle sınırlı.
 *
 *   Ünite 17: die Hausordnung, der Müll, der Keller, leise, laut,
 *             die Ordnung, dürfen, der Schlüssel · die Miete,
 *             die Nebenkosten, der Vermieter, der Monat, warm, mieten,
 *             vermieten, überweisen · putzen, aufräumen, waschen, sauber,
 *             die Maschine, der Kühlschrank, tun, holen · der Umzug, helfen,
 *             packen, schwer, der Karton, umziehen, das Gepäck, legen
 *   Kalıplar: Man darf nicht … · Bitte leise sein. · Die Miete kostet … ·
 *             warm oder kalt · pro Monat · Ich räume … auf. · Kannst du …? ·
 *             Vorsicht, schwer!
 *
 * "warm" ve "kalt" burada YENİ bir anlamda geçiyor: kirada "Warmmiete"
 * aidat dahil, "Kaltmiete" aidat hariç demek. Almanya'da yaşayan herkesin
 * ilk ay öğrendiği ama sözlükten anlaşılmayan bir kullanım; okuma metni ve
 * dinleme bunu ayrıca açıklıyor.
 */
export const a1U17: SkillExercise[] = [
  {
    id: "a1-u17-r1",
    level: "A1",
    skill: "reading",
    unit: 17,
    title: "Die Hausordnung",
    genre: "Yönetmelik",
    intro: "Apartman girişindeki kuralları okuyacaksın. Ne yasak?",
    gloss: [
      { de: "die Hausordnung", tr: "apartman yönetmeliği", en: "house rules" },
      { de: "der Müll", tr: "çöp", en: "rubbish" },
      { de: "leise", tr: "sessiz", en: "quiet" },
      { de: "dürfen", tr: "izinli olmak", en: "to be allowed" },
    ],
    minutes: 3,
    text:
      "HAUSORDNUNG\n\n1. Von 22 bis 7 Uhr bitte leise sein. Man darf nicht laut sein.\n\n2. Der Müll kommt in den Keller. Bitte machen Sie den Müll nicht in den Flur.\n\n3. Im Flur darf man keine Möbel, keine Kartons und kein Gepäck stellen.\n\n4. Die Waschmaschine im Keller: von 8 bis 20 Uhr. Bitte danach sauber machen.\n\n5. Sie haben den Schlüssel für den Keller und für die Treppe. Bitte nicht an Bekannte!\n\nEine Frage? Der Vermieter wohnt im Haus, Wohnung 1.",
    questions: [
      {
        text: "Wann muss man leise sein?",
        options: ["von 22 bis 7 Uhr", "von 8 bis 20 Uhr", "immer"],
        answer: 0,
        explain: "„Von 22 bis 7 Uhr bitte leise sein.“ 8-20 çamaşır makinesi saatleri.",
      },
      {
        text: "Wohin kommt der Müll?",
        options: ["in den Keller", "in den Flur", "vor das Haus"],
        answer: 0,
        explain: "„Der Müll kommt in den Keller.“ Koridora konmaz.",
      },
      {
        text: "Richtig oder falsch? Man darf Kartons im Flur stellen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Im Flur darf man keine Möbel und keine Kartons stellen.“",
      },
      {
        kind: "gapfill",
        text: "Die Waschmaschine darf man von 8 bis ___ Uhr benutzen.",
        options: [],
        answer: 0,
        accept: ["20"],
        explain: "„Die Waschmaschine im Keller: von 8 bis 20 Uhr.“",
      },
      {
        text: "Wo wohnt der Vermieter?",
        options: ["im Haus, Wohnung 1", "im Keller", "nicht im Haus"],
        answer: 0,
        explain: "„Der Vermieter wohnt im Haus, Wohnung 1.“",
      },
          {
        kind: "gapfill",
        text: "Der ___ kommt in den Keller.",
        options: [],
        answer: 0,
        accept: ["Müll"],
        explain: "„Der Müll kommt in den Keller.“",
      },
],
  },
  {
    id: "a1-u17-r2",
    level: "A1",
    skill: "reading",
    unit: 17,
    title: "Warm oder kalt?",
    genre: "E-posta",
    intro: "Ev sahibinden kira hakkında bir e-posta. Dikkat: „warm“ burada sıcaklık demek değil!",
    gloss: [
      { de: "die Miete", tr: "kira", en: "rent" },
      { de: "die Nebenkosten", tr: "aidat", en: "utility costs" },
      { de: "überweisen", tr: "havale etmek", en: "to transfer" },
      { de: "der Vermieter", tr: "ev sahibi", en: "landlord" },
    ],
    minutes: 3,
    text:
      "Liebe Frau Kaya,\n\nhier die Informationen zur Miete:\n\nDie Miete kostet 550 Euro kalt. Und 100 Euro Nebenkosten. Zusammen sind das 650 Euro warm.\n\n„Kalt“ heißt: nur die Wohnung. „Warm“ heißt: mit Nebenkosten — mit Wasser und Müll.\n\nBitte überweisen Sie die Miete jeden Monat bis zum 3.\n\nDie Waschmaschine im Keller ist frei, das ist in den Nebenkosten.\n\nHaben Sie eine Frage? Ich wohne im Haus.\n\nViele Grüße\nHerr Weber (Vermieter)",
    questions: [
      {
        text: "Was kostet die Miete warm?",
        options: ["650 Euro", "550 Euro", "100 Euro"],
        answer: 0,
        explain: "„Zusammen sind das 650 Euro warm.“ 550 kalt, 100 aidat.",
      },
      {
        text: "Was heißt „warm“ hier?",
        options: ["mit Nebenkosten", "die Wohnung ist warm", "mit Möbeln"],
        answer: 0,
        explain: "„„Warm“ heißt: mit Nebenkosten — mit Wasser und Müll.“ Sıcaklıkla ilgisi yok.",
      },
      {
        kind: "gapfill",
        text: "Die Nebenkosten sind ___ Euro.",
        options: [],
        answer: 0,
        accept: ["100"],
        explain: "„Dazu kommen 100 Euro Nebenkosten.“",
      },
      {
        text: "Richtig oder falsch? Die Waschmaschine kostet mehr Geld.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Waschmaschine im Keller ist frei, das ist in den Nebenkosten.“",
      },
          {
        kind: "gapfill",
        text: "hier die Informationen zur ___:",
        options: [],
        answer: 0,
        accept: ["Miete"],
        explain: "„hier die Informationen zur Miete:“",
      },
],
  },
  {
    id: "a1-u17-l1",
    level: "A1",
    skill: "listening",
    unit: 17,
    title: "Kannst du mir helfen?",
    genre: "Diyalog",
    intro: "Taşınma günü. Kim neyi taşıyor?",
    gloss: [
      { de: "der Umzug", tr: "taşınma", en: "move" },
      { de: "der Karton", tr: "koli", en: "box" },
      { de: "schwer", tr: "ağır", en: "heavy" },
    ],
    minutes: 2,
    segments: [
      { text: "Kannst du mir helfen? Der Umzug ist am Samstag." },
      { text: "Ja, gern. Was muss ich tun?" },
      { text: "Wir packen die Kartons und tragen sie nach unten." },
      { text: "Vorsicht, der Karton ist schwer!" },
      { text: "Leg ihn hier hin. Den Schrank holen wir später." },
    ],
    questions: [
      {
        text: "Wann ist der Umzug?",
        options: ["am Samstag", "am Sonntag", "heute"],
        answer: 0,
        explain: "„Der Umzug ist am Samstag.“",
      },
      {
        text: "Was machen sie mit den Kartons?",
        options: ["Sie tragen sie nach unten", "Sie stellen sie in den Flur", "Sie holen sie aus dem Keller"],
        answer: 0,
        explain: "„Wir packen die Kartons und tragen sie nach unten.“",
      },
      {
        kind: "gapfill",
        text: "„Vorsicht, der Karton ist ___!“",
        options: [],
        answer: 0,
        accept: ["schwer"],
        explain: "„Vorsicht, der Karton ist schwer!“",
      },
      {
        text: "Was machen sie später?",
        options: ["den Schrank holen", "die Wohnung putzen", "den Müll bringen"],
        answer: 0,
        explain: "„Den Schrank holen wir später.“",
      },
          {
        kind: "gapfill",
        text: "Der ___ ist am Samstag.",
        options: [],
        answer: 0,
        accept: ["Umzug"],
        explain: "„Der Umzug ist am Samstag.“",
      },
],
  },
  {
    id: "a1-u17-l2",
    level: "A1",
    skill: "listening",
    unit: 17,
    title: "Wir putzen die Wohnung",
    genre: "Diyalog",
    intro: "Temizlik paylaşılıyor. Kim ne yapıyor?",
    gloss: [
      { de: "putzen", tr: "temizlemek", en: "to clean" },
      { de: "aufräumen", tr: "toplamak", en: "to tidy up" },
      { de: "sauber", tr: "temiz", en: "clean" },
    ],
    minutes: 2,
    segments: [
      { text: "Heute putzen wir die Wohnung. Was machst du?" },
      { text: "Ich räume das Wohnzimmer auf und wasche ab." },
      { text: "Gut, dann putze ich das Bad und die Küche." },
      { text: "Und der Kühlschrank? Der ist nicht sauber." },
      { text: "Den mache ich morgen. Heute bin ich müde." },
    ],
    questions: [
      {
        text: "Was macht die zweite Person?",
        options: [
          "das Wohnzimmer aufräumen und abwaschen",
          "das Bad und die Küche putzen",
          "den Kühlschrank sauber machen",
        ],
        answer: 0,
        explain: "„Ich räume das Wohnzimmer auf und wasche ab.“",
      },
      {
        text: "Wer putzt das Bad?",
        options: ["die erste Person", "die zweite Person", "niemand"],
        answer: 0,
        explain: "„dann putze ich das Bad und die Küche.“ — ilk konuşan.",
      },
      {
        kind: "gapfill",
        text: "Der Kühlschrank ist nicht ___.",
        options: [],
        answer: 0,
        accept: ["sauber"],
        explain: "„Der ist nicht sauber.“",
      },
      {
        text: "Wann machen sie den Kühlschrank?",
        options: ["morgen", "heute", "am Samstag"],
        answer: 0,
        explain: "„Den mache ich morgen. Heute bin ich müde.“",
      },
          {
        kind: "gapfill",
        text: "Heute ___ wir die Wohnung.",
        options: [],
        answer: 0,
        accept: ["putzen"],
        explain: "„Heute putzen wir die Wohnung.“",
      },
],
  },
  {
    id: "a1-u17-w1",
    level: "A1",
    skill: "writing",
    unit: 17,
    title: "Man darf nicht …",
    genre: "Dil bilgisi",
    intro: "Kural ve yardım isteme cümleleri.",
    gloss: [
      { de: "dürfen", tr: "izinli olmak", en: "to be allowed" },
      { de: "helfen", tr: "yardım etmek", en: "to help" },
      { de: "aufräumen", tr: "toplamak", en: "to tidy up" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Koridorda mobilya koymak yasak.",
        answer: "Im Flur darf man keine Möbel stellen",
        hint: "„man darf nicht/kein…“ genel yasak bildirir. Kişi belli değilse „man“ kullanılır.",
      },
      {
        kind: "build",
        tr: "Bana yardım edebilir misin?",
        answer: "Kannst du mir helfen",
        hint: "„helfen“ Dativ ister: mir, dir, ihm — „mich helfen“ DEĞİL. Türkçedeki „bana yardım et“ ile aynı mantık.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi kural biçiminde yaz (man ile).",
        source: "Du darfst hier nicht laut sein.",
        answer: "Man darf hier nicht laut sein.",
        alternatives: ["Man darf hier nicht laut sein"],
        why: "Yönetmelikte kişiye değil herkese seslenilir; bu yüzden „du“ yerine „man“ kullanılır.",
      },
    ],
  },
  {
    id: "a1-u17-w2",
    level: "A1",
    skill: "writing",
    unit: 17,
    title: "Um Hilfe bitten",
    genre: "Mesaj",
    intro: "Taşınma için arkadaşından yardım iste.",
    gloss: [
      { de: "der Umzug", tr: "taşınma", en: "move" },
      { de: "packen", tr: "paketlemek", en: "to pack" },
      { de: "umziehen", tr: "taşınmak", en: "to move house" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Kirayı her ay havale ediyorum.",
        answer: "Ich überweise die Miete jeden Monat",
        hint: "„überweisen“ banka havalesi demek; „bezahlen“ genel ödeme.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşına taşınma için yardım isteyen bir mesaj yaz (4-5 cümle). Ne zaman olduğunu, ne yapılacağını ve neye dikkat edileceğini söyle.",
        minWords: 30,
        checklist: [
          "Ne zaman olduğunu yazdın mı? (Am Samstag …)",
          "Yardım istedin mi? (Kannst du mir helfen?)",
          "Ne yapılacağını yazdın mı? (packen, tragen, holen, legen)",
          "Bir uyarı yaptın mı? (Vorsicht, … ist schwer!)",
        ],
        phrases: [
          { de: "Kannst du mir helfen?", tr: "Bana yardım edebilir misin?", en: "Can you help me?" },
          { de: "Wir packen die Kartons.", tr: "Kolileri paketliyoruz.", en: "We pack the boxes." },
          { de: "Vorsicht, das ist schwer!", tr: "Dikkat, bu ağır!", en: "Careful, that's heavy!" },
        ],
        sample:
          "Hallo Tom,\n\nam Samstag ziehe ich um. Kannst du mir helfen?\n\nWir packen die Kartons und tragen sie nach unten. Der Schrank ist sehr schwer — da brauche ich dich!\n\nDie Wohnung ist im 2. Stock und es gibt keinen Aufzug. Wir nehmen die Treppe.\n\nDanach räumen wir auf und ich koche für uns.\n\nKommst du?\nElif",
      },
    ],
  },
];
