import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 8 — "Alerji, davet, günün akışı ve saat".
 *
 * Dört ders: Ich vertrage das nicht · Zum Essen eingeladen · Mein Tag ·
 * Wie spät ist es? İçerik ünite 1-8'in kelimeleriyle sınırlı.
 *
 *   Ünite 8: allergisch, die Nuss, das Ei, ohne, vertragen, der Schinken,
 *            das Hähnchen, das Eis · schmecken, lecker, anbieten, probieren,
 *            satt, danken, sich freuen, bitten · der Tag, der Morgen,
 *            der Abend, beginnen, die Nacht, zuerst, dann, immer · die Uhr,
 *            die Stunde, die Minute, halb, spät, der Moment, gleich, gerade
 *   Kalıplar: Ich esse kein … · Ich bin allergisch gegen … · Gibt es … ohne …? ·
 *            Möchtest du …? · Nein danke, ich bin satt · Mein Tag beginnt um … ·
 *            Wie spät ist es? · Es ist halb … · Um wie viel Uhr …?
 *
 * Saatler bu ünitede ilk kez geçiyor. "halb acht" (yedi buçuk) Almancanın
 * en yanıltıcı kalıbı: halb SONRAKİ saati gösterir. Dinleme ve yazma
 * görevleri bunu ayrıca sınıyor.
 */
export const a1U08: SkillExercise[] = [
  {
    id: "a1-u8-r1",
    level: "A1",
    skill: "reading",
    unit: 8,
    title: "Ich bin allergisch",
    genre: "E-posta",
    intro: "Bir davete cevap: ne yiyemiyor, ne istiyor?",
    gloss: [
      { de: "allergisch", tr: "alerjik", en: "allergic" },
      { de: "vertragen", tr: "bünyesine uymak", en: "to tolerate" },
      { de: "ohne", tr: "olmadan", en: "without" },
      { de: "sich freuen", tr: "sevinmek", en: "to be glad" },
    ],
    minutes: 3,
    text:
      "Liebe Mia,\n\nvielen Dank! Ich freue mich sehr.\n\nIch bin allergisch gegen Nüsse. Ich esse auch kein Ei — Eier vertrage ich nicht.\n\nGibt es vielleicht etwas ohne Nüsse? Hähnchen und Reis esse ich sehr gern. Schinken esse ich nicht, aber ich bin nicht allergisch.\n\nEis mag ich auch — aber bitte ohne Nüsse!\n\nDanke!\nTarek",
    questions: [
      {
        text: "Wogegen ist Tarek allergisch?",
        options: ["gegen Nüsse", "gegen Eis", "gegen Reis"],
        answer: 0,
        explain: "„Ich bin allergisch gegen Nüsse.“",
      },
      {
        text: "Richtig oder falsch? Tarek isst kein Ei.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich esse auch kein Ei — Eier vertrage ich nicht.“",
      },
      {
        text: "Warum isst Tarek keinen Schinken?",
        options: [
          "Er ist nicht allergisch — er mag ihn nicht",
          "Er ist allergisch gegen Schinken",
          "Er hat keinen Hunger",
        ],
        answer: 0,
        explain: "„Schinken esse ich nicht, aber ich bin nicht allergisch.“",
      },
      {
        kind: "gapfill",
        text: "Tarek isst gern Hähnchen und ___.",
        options: [],
        answer: 0,
        accept: ["Reis"],
        explain: "„Hähnchen und Reis esse ich sehr gern.“",
      },
    ],
  },
  {
    id: "a1-u8-r2",
    level: "A1",
    skill: "reading",
    unit: 8,
    title: "Mein Tag",
    genre: "Blog",
    intro: "Lena gününü anlatıyor. Saatlere dikkat et.",
    gloss: [
      { de: "beginnen", tr: "başlamak", en: "to begin" },
      { de: "zuerst", tr: "önce", en: "first" },
      { de: "halb", tr: "yarım", en: "half" },
      { de: "immer", tr: "her zaman", en: "always" },
    ],
    minutes: 3,
    text:
      "Mein Tag beginnt um halb sieben. Das ist früh, aber ich bin immer müde am Morgen.\n\nZuerst trinke ich einen Kaffee. Dann esse ich ein Brötchen mit Butter.\n\nUm acht Uhr beginnt meine Arbeit. Ich arbeite acht Stunden.\n\nAm Abend koche ich zusammen mit meiner Familie. Wir essen um halb acht.\n\nIn der Nacht schlafe ich sieben Stunden.",
    questions: [
      {
        text: "Wann beginnt Lenas Tag?",
        options: ["um halb sieben", "um acht Uhr", "um halb acht"],
        answer: 0,
        explain: "„Mein Tag beginnt um halb sieben.“ Yani 6:30 — „halb sieben“ SONRAKİ saati gösterir.",
      },
      {
        text: "Was macht Lena zuerst?",
        options: ["Sie trinkt einen Kaffee", "Sie isst ein Brötchen", "Sie arbeitet"],
        answer: 0,
        explain: "„Zuerst trinke ich einen Kaffee. Dann esse ich ein Brötchen.“ Sıra önemli.",
      },
      {
        kind: "gapfill",
        text: "Lena arbeitet ___ Stunden.",
        options: [],
        answer: 0,
        accept: ["acht", "8"],
        explain: "„Ich arbeite acht Stunden.“",
      },
      {
        text: "Wann isst die Familie am Abend?",
        options: ["um halb acht", "um acht Uhr", "um halb sieben"],
        answer: 0,
        explain: "„Wir essen um halb acht.“ — 19:30.",
      },
    ],
  },
  {
    id: "a1-u8-l1",
    level: "A1",
    skill: "listening",
    unit: 8,
    title: "Wie spät ist es?",
    genre: "Diyalog",
    intro: "Saat soruluyor. Dikkat: „halb“ sonraki saati gösterir!",
    gloss: [
      { de: "spät", tr: "geç", en: "late" },
      { de: "gleich", tr: "birazdan", en: "in a moment" },
      { de: "der Moment", tr: "an", en: "moment" },
    ],
    minutes: 2,
    segments: [
      { text: "Entschuldigung, wie spät ist es?" },
      { text: "Einen Moment … es ist halb neun." },
      { text: "Oh, so spät! Mein Kurs beginnt gleich." },
      { text: "Der Kurs beginnt um neun Uhr, oder?" },
      { text: "Ja. Ich habe noch dreißig Minuten." },
    ],
    questions: [
      {
        text: "Wie spät ist es?",
        options: ["halb neun", "neun Uhr", "halb acht"],
        answer: 0,
        explain: "„es ist halb neun“ — yani 8:30, dokuza yarım var.",
      },
      {
        text: "Wann beginnt der Kurs?",
        options: ["um neun Uhr", "um halb neun", "gleich jetzt"],
        answer: 0,
        explain: "„Der Kurs beginnt um neun Uhr, oder?“ — „Ja.“",
      },
      {
        kind: "gapfill",
        text: "Er hat noch ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["dreißig", "30"],
        explain: "„Ich habe noch dreißig Minuten.“ Yarım saat = 30 dakika.",
      },
      {
        text: "Richtig oder falsch? Der Kurs beginnt jetzt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Mein Kurs beginnt gleich.“ — henüz başlamadı.",
      },
    ],
  },
  {
    id: "a1-u8-l2",
    level: "A1",
    skill: "listening",
    unit: 8,
    title: "Zum Essen eingeladen",
    genre: "Diyalog",
    intro: "Yemek masasında bir konuk ve ev sahibi konuşuyor.",
    gloss: [
      { de: "schmecken", tr: "tadı güzel olmak", en: "to taste good" },
      { de: "probieren", tr: "tatmak", en: "to try" },
      { de: "satt", tr: "tok", en: "full" },
    ],
    minutes: 2,
    segments: [
      { text: "Möchtest du noch etwas Reis?" },
      { text: "Nein danke, ich bin satt. Das schmeckt sehr gut!" },
      { text: "Möchtest du ein Eis probieren?" },
      { text: "Gern! Aber ist da eine Nuss drin? Ich bin allergisch." },
      { text: "Nein, das Eis ist ohne Nüsse." },
    ],
    questions: [
      {
        text: "Warum möchte die Person keinen Reis mehr?",
        options: ["Er ist satt", "Es schmeckt nicht", "Er ist allergisch"],
        answer: 0,
        explain: "„Nein danke, ich bin satt.“ Yemeği beğenmiş — „Das schmeckt sehr gut!“",
      },
      {
        text: "Was möchte die Person probieren?",
        options: ["ein Eis", "Reis", "Hähnchen"],
        answer: 0,
        explain: "„Möchtest du ein Eis probieren?“ — „Gern!“",
      },
      {
        kind: "gapfill",
        text: "Die Person ist allergisch gegen ___.",
        options: [],
        answer: 0,
        accept: ["Nüsse", "Nuss"],
        explain: "„Ich bin allergisch.“ — soru „ist da eine Nuss drin?“ ile geliyor.",
      },
      {
        text: "Richtig oder falsch? Im Eis sind Nüsse.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „das Eis ist ohne Nüsse.“",
      },
    ],
  },
  {
    id: "a1-u8-w1",
    level: "A1",
    skill: "writing",
    unit: 8,
    title: "Uhrzeit und Allergie",
    genre: "Dil bilgisi",
    intro: "Saat söylemeyi ve alerji bildirmeyi yaz.",
    gloss: [
      { de: "halb", tr: "yarım", en: "half" },
      { de: "allergisch", tr: "alerjik", en: "allergic" },
      { de: "ohne", tr: "olmadan", en: "without" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Saat sekiz buçuk.",
        answer: "Es ist halb neun",
        hint: "DİKKAT: Almancada „halb“ SONRAKİ saati gösterir. Sekiz buçuk = halb neun, dokuz buçuk = halb zehn.",
      },
      {
        kind: "build",
        tr: "Fındığa alerjim var.",
        answer: "Ich bin allergisch gegen Nüsse",
        hint: "Kalıp sabittir: „allergisch gegen“ + Akkusativ. Çoğul kullanılır: gegen Nüsse.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi „ohne“ ile yaz.",
        source: "Ich möchte einen Salat mit Ei.",
        answer: "Ich möchte einen Salat ohne Ei.",
        alternatives: ["Ich möchte einen Salat ohne Ei"],
        why: "„mit“ ve „ohne“ karşıttır; „ohne“ Akkusativ ister ama „Ei“ nötr olduğu için biçim değişmez.",
      },
    ],
  },
  {
    id: "a1-u8-w2",
    level: "A1",
    skill: "writing",
    unit: 8,
    title: "Mein Tag von morgens bis abends",
    genre: "Blog",
    intro: "Gününü saatlerle anlat.",
    gloss: [
      { de: "der Morgen", tr: "sabah", en: "morning" },
      { de: "der Abend", tr: "akşam", en: "evening" },
      { de: "dann", tr: "sonra", en: "then" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Günüm saat yedide başlıyor.",
        answer: "Mein Tag beginnt um sieben Uhr",
        hint: "Saat bildirirken „um“ kullanılır: um sieben Uhr, um halb acht.",
      },
      {
        kind: "free",
        prompt:
          "Gününü anlat (5-6 cümle). Saat kaçta başladığını, önce ve sonra ne yaptığını, akşam ne yaptığını yaz. En az iki saat bilgisi kullan.",
        minWords: 35,
        checklist: [
          "Günün kaçta başlıyor? (Mein Tag beginnt um …)",
          "„zuerst“ ve „dann“ kullandın mı?",
          "En az iki saat söyledin mi? (um acht Uhr, um halb sieben …)",
          "Akşam ne yaptığını yazdın mı? (Am Abend …)",
        ],
        phrases: [
          { de: "Mein Tag beginnt um …", tr: "Günüm … başlar", en: "My day begins at …" },
          { de: "Zuerst … dann …", tr: "Önce … sonra …", en: "First … then …" },
          { de: "Am Abend …", tr: "Akşam …", en: "In the evening …" },
        ],
        sample:
          "Mein Tag beginnt um halb sieben. Das ist früh und ich bin immer müde.\n\nZuerst trinke ich einen Tee. Dann esse ich ein Brot mit Käse.\n\nUm acht Uhr beginnt meine Arbeit. Ich arbeite acht Stunden.\n\nAm Abend koche ich zusammen mit meiner Familie. Wir essen um halb acht und dann sind wir zusammen.\n\nIn der Nacht schlafe ich sieben Stunden.",
      },
    ],
  },
];
