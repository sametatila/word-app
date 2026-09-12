import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 19 — "Düğün, bayramlar, tebrikler, özür".
 *
 * Dört ders: A wedding · Festivals and holidays · Congratulations! ·
 * Saying sorry.
 *
 *   Kelime: wedding, bride, guest, dance, dress, suit, photograph, rose,
 *           festival, tradition, family, special, food, religion,
 *           public holiday, Christmas tree, congratulations, luck, wish,
 *           proud, news, winner, cheers, excited, apologise, forget, late,
 *           mistake, promise, forgive, unfortunately, worry.
 *   Kalıp:  The wedding was in a garden. ·
 *           The bride wore a long white dress. ·
 *           I have been to three weddings this year. ·
 *           We celebrate … in … · It's a tradition to … ·
 *           Have you ever been to …? ·
 *           Congratulations on your new job! · Good luck with your exam! ·
 *           I'm so proud of you. · I'm sorry I'm late. ·
 *           I'm sorry about the … · That's OK, don't worry about it.
 *
 * Ünitenin tek öğretme noktası KUTLAMA VE ÖZÜR KALIPLARININ EDATLARI.
 * Dördü de ayrı: „congratulations ON“, „good luck WITH“, „proud OF“,
 * „sorry ABOUT“. Hiçbiri anlamdan türetilemiyor, hepsi kalıpla birlikte
 * öğreniliyor — ünite 8 sıfatlarda, ünite 13 fiillerde aynı işi yapmıştı;
 * burada sıra toplumsal kalıplarda.
 */
export const enA2U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u19-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 19,
    title: "A wedding",
    genre: "story",
    intro: "Bahçede bir düğün. Kim ne yapıyor, kim ne diyor?",
    gloss: [
      { de: "hall", tr: "salon" },
      { de: "grass", tr: "çimen" },
      { de: "cried", tr: "ağladı" },
    ],
    minutes: 6,
    text:
      "I have been to three weddings this year, and the last one was the best.\n" +
      "The wedding was in a garden, not in a hall. Thirty guests, four tables, and a tree with roses on it.\n" +
      "The bride wore a long white dress and her mother cried before the first word. Her father did not cry. He photographed everything and said nothing for two hours.\n" +
      "My friend wore a blue suit and new shoes. After an hour the shoes came off. After two hours everybody took the shoes off and we danced on the grass.\n" +
      "At eleven the music stopped and the guests sat down. Then the bride's grandmother told a story about her wedding in 1962. Rain, twelve guests, and no photographs.\n" +
      "She said: The garden is nice. But the people are the wedding.",
    questions: [
      {
        text: "Where was the wedding?",
        options: ["in a garden", "in a hall", "at home"],
        answer: 0,
        explain: "„The wedding was in a garden, not in a hall.“",
      },
      {
        text: "What did the father do?",
        options: ["he photographed everything", "he cried", "he told a story"],
        answer: 0,
        explain: "„Her father did not cry. He photographed everything and said nothing for two hours.“",
      },
      {
        kind: "truefalse",
        text: "There were no photographs at the grandmother's wedding.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Rain, twelve guests, and no photographs.“",
      },
      {
        kind: "gapfill",
        text: "There were ___ guests.",
        options: [],
        answer: 0,
        accept: ["thirty", "30"],
        explain: "„Thirty guests, four tables, and a tree with roses on it.“",
      },
      {
        kind: "short_answer",
        text: "What does the grandmother say the wedding is?",
        options: [],
        answer: 0,
        accept: ["the people", "people"],
        explain: "„The garden is nice. But the people are the wedding.“",
      },
    ],
  },
  {
    id: "en-a2-u19-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 19,
    title: "Congratulations!",
    genre: "message",
    intro: "İki haber, iki dilek. Hangi kalıp hangi edatı alıyor?",
    gloss: [
      { de: "chapter", tr: "bölüm" },
      { de: "in advance", tr: "şimdiden" },
      { de: "good at", tr: "iyi olan" },
      { de: "believe", tr: "inanmak" },
    ],
    minutes: 5,
    text:
      "Nil: Congratulations on your new job! When do you start?\n" +
      "Deniz: Thank you! On the first of October. I still can't believe it.\n" +
      "Nil: I can. You worked for it two years.\n" +
      "Deniz: And your exam? Good luck with your exam on Friday!\n" +
      "Nil: Thanks. I'm not ready. Three chapters and two days.\n" +
      "Deniz: You said the same thing last year and you got the best result in the class.\n" +
      "Nil: That is true. But I worry about the last chapter. It's about things I never understood.\n" +
      "Deniz: Then ask Mert. Mert is good at that.\n" +
      "Nil: I asked. Izmir until Sunday.\n" +
      "Deniz: Then call. Bad luck is only a plan you didn't make.\n" +
      "Nil: Cheers for that. I'm proud of you. The job is big news.\n" +
      "Deniz: And I'm proud of you on Friday. In advance.",
    questions: [
      {
        text: "When does Deniz start the new job?",
        options: ["on the first of October", "on Friday", "next year"],
        answer: 0,
        explain: "„Thank you! On the first of October. I still can't believe it.“",
      },
      {
        text: "What does Nil worry about?",
        options: ["the last chapter", "the first chapter", "the result"],
        answer: 0,
        explain: "„But I worry about the last chapter. It's about things I never understood.“",
      },
      {
        kind: "truefalse",
        text: "Mert can help before Friday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I asked. Izmir until Sunday.“ — sınav cuma, Mert pazara kadar yok.",
      },
      {
        kind: "gapfill",
        text: "Nil has ___ days for three chapters.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„I'm not ready. Three chapters and two days.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Congratulations on your new job!",
          "Good luck with your exam on Friday!",
          "I worry about the last chapter.",
          "I'm proud of you.",
        ],
        explain: "Önce tebrik, sonra dilek, sonra kaygı, en son gurur.",
      },
      {
        kind: "short_answer",
        text: "What did Nil get last year?",
        options: [],
        answer: 0,
        accept: ["the best result", "the best result in the class", "a good result"],
        explain: "„…you got the best result in the class.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u19-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 19,
    title: "Festivals and holidays",
    genre: "monologue",
    intro: "Bir aile geleneği. Ne zaman, kaç kişi, hangi kural?",
    gloss: [
      { de: "umbrella", tr: "şemsiye" },
      { de: "plate", tr: "tabak" },
      { de: "instead", tr: "onun yerine" },
      { de: "empty", tr: "boş" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ela", text: "We celebrate the end of the summer in September. It is not a public holiday, only a family tradition." },
      { speaker: "Ela", text: "My grandmother started it in 1980. She cooked for twenty people on the last warm Sunday." },
      { speaker: "Ela", text: "Now we are forty and we cook together. Everybody brings one special food from their kitchen." },
      { speaker: "Ela", text: "It's a tradition to eat outside, even when it rains. Two years ago we ate under three umbrellas." },
      { speaker: "Ela", text: "There is no religion in it and no presents. Only the food and the long table." },
      { speaker: "Ela", text: "Have you ever been to a festival with no music? This is one. People talk instead." },
      { speaker: "Ela", text: "At the end everybody takes something home. The rule is: you never go home with your plate empty." },
      { speaker: "Ela", text: "My grandmother is ninety now. She sits, she eats, and she counts us. Forty-one this year." },
    ],
    questions: [
      {
        text: "When do they celebrate?",
        options: ["in September", "in the summer", "in 1980"],
        answer: 0,
        explain: "„We celebrate the end of the summer in September.“ — 1980 başladığı yıl.",
      },
      {
        text: "What does everybody bring?",
        options: ["one special food", "a present", "an umbrella"],
        answer: 0,
        explain: "„Everybody brings one special food from their kitchen.“",
      },
      {
        kind: "truefalse",
        text: "It is only a family tradition.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It is not a public holiday, only a family tradition.“",
      },
      {
        kind: "gapfill",
        text: "The grandmother is ___ now.",
        options: [],
        answer: 0,
        accept: ["ninety", "90"],
        explain: "„My grandmother is ninety now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It's a tradition to eat outside, even when it rains.", "It is a tradition to eat outside, even when it rains."],
        explain: "„It's a tradition to“ sonrası mastar geliyor.",
      },
      {
        kind: "short_answer",
        text: "What is the rule at the end?",
        options: [],
        answer: 0,
        accept: ["take something home", "everybody takes something", "no empty plate"],
        explain: "„At the end everybody takes something home.“",
      },
    ],
  },
  {
    id: "en-a2-u19-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 19,
    title: "Saying sorry",
    genre: "dialogue",
    intro: "Üç özür, tek öğüt. Sorun neymiş?",
    gloss: [
      { de: "sound", tr: "ses" },
      { de: "version", tr: "sürüm" },
      { de: "in front of me", tr: "gözümün önünde" },
      { de: "calendar", tr: "takvim" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Can", text: "I'm sorry I'm late. The bus stopped for twenty minutes." },
      { speaker: "Sena", text: "That's OK, don't worry about it. We start in five minutes." },
      { speaker: "Can", text: "And I'm sorry about the file. I sent the old version yesterday." },
      { speaker: "Sena", text: "I saw it. I opened the new one from the folder." },
      { speaker: "Can", text: "You are too kind. I made two mistakes in one day." },
      { speaker: "Sena", text: "Three. You forgot the meeting on Tuesday." },
      { speaker: "Can", text: "Unfortunately that is true. I apologise." },
      { speaker: "Sena", text: "I forgive you. But write it in your calendar now, in front of me." },
      { speaker: "Can", text: "Done. Tuesday, ten o'clock, with a sound." },
      { speaker: "Sena", text: "Good. And everybody forgets. The problem is not the mistake." },
      { speaker: "Can", text: "What is the problem?" },
      { speaker: "Sena", text: "Promising that it never happens again. Don't promise. Just write it down." },
      { speaker: "Can", text: "I promise I won't promise." },
      { speaker: "Sena", text: "Now that is a good start." },
    ],
    questions: [
      {
        text: "Why is Can late?",
        options: ["the bus stopped for twenty minutes", "the meeting was early", "the file was old"],
        answer: 0,
        explain: "„I'm sorry I'm late. The bus stopped for twenty minutes.“",
      },
      {
        text: "How many mistakes did Can make?",
        options: ["three", "two", "one"],
        answer: 0,
        explain: "„Three. You forgot the meeting on Tuesday.“ — Can iki diyor, Sena üçüncüsünü hatırlatıyor.",
      },
      {
        kind: "truefalse",
        text: "Sena opened the old version.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I saw it. I opened the new one from the folder.“",
      },
      {
        kind: "gapfill",
        text: "The meeting is on ___ at ten.",
        options: [],
        answer: 0,
        accept: ["Tuesday"],
        explain: "„Done. Tuesday, ten o'clock, with a sound.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I'm sorry I'm late.", "I am sorry I am late.", "I'm sorry I'm late"],
        explain: "Burada edat yok: „sorry“ doğrudan cümle alıyor.",
      },
      {
        kind: "short_answer",
        text: "What does Sena tell Can to do?",
        options: [],
        answer: 0,
        accept: ["write it down", "write it in the calendar", "write it"],
        explain: "„Don't promise. Just write it down.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u19-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 19,
    title: "Congratulations on your new job!",
    genre: "personal",
    intro: "Dört kutlama kalıbı, dört ayrı edat. Hiçbiri tahmin edilemez.",
    gloss: [
      { de: "Congratulations on", tr: "için tebrikler" },
      { de: "Good luck with", tr: "için bol şans" },
      { de: "proud of", tr: "gurur duymak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yeni işin için tebrikler!",
        answer: "Congratulations on your new job!",
        hint: "„congratulations“ın edatı „on“; anlamdan türetilemez, kalıpla öğrenilir.",
      },
      {
        kind: "build",
        tr: "Sınavında bol şans!",
        answer: "Good luck with your exam!",
        hint: "„good luck“ın edatı „with“, „on“ değil. Aynı ailede başka edat.",
      },
      {
        kind: "build",
        tr: "Seninle çok gurur duyuyorum.",
        answer: "I'm so proud of you.",
        alternatives: ["I am so proud of you."],
        hint: "„proud“ kendi edatını taşıyor: „of“.",
      },
      {
        kind: "build",
        tr: "Geç kaldığım için özür dilerim.",
        answer: "I'm sorry I'm late.",
        alternatives: ["I am sorry I am late."],
        hint: "Burada edat yok: „sorry“ doğrudan bir cümle alıyor.",
      },
      {
        kind: "form",
        prompt: "Kutlama kartını doldur.",
        facts: "Yeni iş için tebrik; başlangıç bir ekim; cuma sınav var; bol şans dileniyor.",
        fields: [
          { label: "Congratulations", answer: "on your new job", accept: ["the new job"] },
          { label: "Start", answer: "the first of October", accept: ["1 October", "October"] },
          { label: "Exam", answer: "on Friday", accept: ["Friday"] },
          { label: "Wish", answer: "good luck", accept: ["luck"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u19-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 19,
    title: "I'm sorry about the …",
    genre: "personal",
    intro: "Özür ve deneyim cümleleri. „about“ iki kalıbı birden taşıyor.",
    gloss: [
      { de: "sorry about", tr: "için üzgün" },
      { de: "worry about", tr: "dert etmek" },
      { de: "have been to", tr: "gitmişlik" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Dosya için özür dilerim.",
        answer: "I'm sorry about the file.",
        alternatives: ["I am sorry about the file."],
        hint: "Bir ŞEY için özür „about“ ile geliyor; cümle gelseydi edat düşerdi.",
      },
      {
        kind: "build",
        tr: "Sorun değil, onu dert etme.",
        answer: "That's OK, don't worry about it.",
        alternatives: ["That is OK, don't worry about it."],
        hint: "„worry“ da „about“ alıyor; iki kalıp aynı edatı paylaşıyor.",
      },
      {
        kind: "build",
        tr: "Üç düğüne gittim.",
        answer: "I have been to three weddings.",
        alternatives: ["I've been to three weddings."],
        hint: "Deneyim: „have been to“ gidip dönmüş olmak demek.",
      },
      {
        kind: "build",
        tr: "Hiç bir festivale gittin mi?",
        answer: "Have you ever been to a festival?",
        hint: "„ever“ deneyim sorusunda, yardımcı ile asıl fiilin arasında.",
      },
      {
        kind: "build",
        tr: "Gelin uzun beyaz bir elbise giydi.",
        answer: "The bride wore a long white dress.",
        hint: "„wear“in geçmişi „wore“; sıfat sırası önce uzunluk, sonra renk.",
      },
    ],
  },
];
