import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 3 — "Kaza, geçmişi sormak, deneyim".
 *
 * Dört ders: What happened? · Asking about the past ·
 * Have you ever...? · Been and gone.
 *
 *   Kelime: fall, break, hurt, luckily, help, accident, injury, bad luck,
 *           where, who, how long, why, alone, conversation, guess,
 *           explain, ever, never, try, abroad, exciting, once,
 *           several times, foreign, visit, country, return, away, twice,
 *           come back, go back, journey.
 *   Kalıp:  What happened? · I fell on the stairs and hurt my arm. ·
 *           Luckily, it wasn't serious. · Where did you go? ·
 *           How long did you stay? · Why were you alone? ·
 *           Have you ever …? · I have never … ·
 *           Yes, I have. / No, I haven't. · He has gone to London. ·
 *           I have been to Italy twice. · She is away this week.
 *
 * Ünitenin son iki dersi A2'nin en ince ayrımını getiriyor: „has gone“
 * kişi HÂLÂ ORADA demek, „has been“ ise gitti ve DÖNDÜ demek. Türkçede
 * ikisi de "gitti" ve fark ancak cümlenin geri kalanından çıkıyor; içerik
 * ikisini aynı metinde, aynı ülkeyle kullanıyor ki fark yalnız fiilde
 * kalsın.
 */
export const enA2U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u3-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 3,
    title: "What happened?",
    genre: "dialogue",
    intro: "Küçük bir kaza anlatılıyor. Ne oldu, ne kadar ciddi, sonrası ne?",
    gloss: [
      { de: "move", tr: "taşınmak" },
      { de: "flat", tr: "daire" },
      { de: "injury", tr: "yaralanma" },
    ],
    minutes: 5,
    text:
      "Sena: What happened to your arm?\n" +
      "Ali: I fell on the stairs yesterday and I hurt my arm. Luckily, it wasn't serious.\n" +
      "Sena: Where did it happen?\n" +
      "Ali: At home. I was carrying two boxes and I didn't see the last step.\n" +
      "Sena: Were you alone?\n" +
      "Ali: Yes, I was alone. But my neighbour heard me and she came fast.\n" +
      "Sena: Did you go to the doctor?\n" +
      "Ali: Yes. I waited two hours there. The doctor said: No break, only a bad injury.\n" +
      "Sena: How long do you have to wait?\n" +
      "Ali: Two weeks with no heavy work. Bad luck — we are moving to a new flat next month!\n" +
      "Sena: Then I help you. I have moved four times in my life.\n" +
      "Ali: Really? Thank you very much.",
    questions: [
      {
        text: "What happened to Ali?",
        options: ["he fell on the stairs", "he had a car accident", "he broke his arm"],
        answer: 0,
        explain: "„I fell on the stairs yesterday and I hurt my arm.“ — doktor „no break“ diyor.",
      },
      {
        text: "Who came fast?",
        options: ["his neighbour", "the doctor", "Sena"],
        answer: 0,
        explain: "„But my neighbour heard me and she came fast.“ — Ali yalnızdı.",
      },
      {
        kind: "truefalse",
        text: "Ali broke his arm.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The doctor said: No break, only a bad injury.“",
      },
      {
        kind: "gapfill",
        text: "Ali has to wait ___ weeks with no heavy work.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„Two weeks with no heavy work.“",
      },
      {
        kind: "short_answer",
        text: "How many times has Sena moved?",
        options: [],
        answer: 0,
        accept: ["four times", "four", "4"],
        explain: "„I have moved four times in my life.“ — deneyim anlatan bir kalıp.",
      },
    ],
  },
  {
    id: "en-a2-u3-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 3,
    title: "Have you ever been abroad?",
    genre: "dialogue",
    intro: "Deneyimler konuşuluyor. Dikkat: „has gone“ hâlâ orada, „has been“ döndü demek.",
    gloss: [
      { de: "Italian", tr: "İtalyan" },
      { de: "a lot", tr: "çok" },
      { de: "know", tr: "bilmek" },
    ],
    minutes: 5,
    text:
      "Nil: Have you ever been abroad?\n" +
      "Kaan: Yes, I have. I have been to Italy twice.\n" +
      "Nil: Twice! When was the first time?\n" +
      "Kaan: Three years ago. I went with my sister and we stayed in a hostel.\n" +
      "Nil: Have you ever tried Italian food there?\n" +
      "Kaan: Of course. Every day! It was exciting.\n" +
      "Nil: I have never been abroad. But my brother has gone to London — he is away this week.\n" +
      "Kaan: Is he coming back soon?\n" +
      "Nil: Yes, he comes back on Sunday. He goes there once a year for his work.\n" +
      "Kaan: Then ask him about foreign countries. He knows a lot.\n" +
      "Nil: I will. Have you ever been to England?\n" +
      "Kaan: No, I haven't. But I want to go.",
    questions: [
      {
        text: "How many times has Kaan been to Italy?",
        options: ["twice", "once", "never"],
        answer: 0,
        explain: "„I have been to Italy twice.“ — „been“ gidip döndüğünü söylüyor.",
      },
      {
        text: "Where has Nil's brother gone?",
        options: ["to London", "to Italy", "to England"],
        answer: 0,
        explain: "„my brother has gone to London — he is away this week“ — „gone“ hâlâ orada demek.",
      },
      {
        kind: "truefalse",
        text: "Nil has been abroad.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have never been abroad.“ — yurt dışına giden kardeşi.",
      },
      {
        kind: "gapfill",
        text: "Nil's brother comes back on ___.",
        options: [],
        answer: 0,
        accept: ["Sunday"],
        explain: "„Yes, he comes back on Sunday.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Have you ever been abroad?",
          "I have been to Italy twice.",
          "I have never been abroad.",
          "Have you ever been to England?",
        ],
        explain: "Önce soru, sonra cevap, sonra karşı taraf kendini anlatıyor, en son yeni soru.",
      },
      {
        kind: "short_answer",
        text: "Has Kaan been to England?",
        options: [],
        answer: 0,
        accept: ["no", "no, he hasn't", "never"],
        explain: "„No, I haven't. But I want to go.“ — kısa cevap yardımcı fiili tekrarlıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u3-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 3,
    title: "Asking about the past",
    genre: "dialogue",
    intro: "Geçmiş hakkında sorular. Her soru başka bir şeyi öğreniyor.",
    gloss: [
      { de: "south", tr: "güney" },
      { de: "history", tr: "tarih" },
      { de: "conversation", tr: "sohbet" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "Where did you go last month?" },
      { speaker: "Deniz", text: "I went to an island in the south. I was there for ten days." },
      { speaker: "Ela", text: "How long did you stay in the hotel?" },
      { speaker: "Deniz", text: "Only three days. After that I stayed with a friend." },
      { speaker: "Ela", text: "Why were you alone at first?" },
      { speaker: "Deniz", text: "Because my friend was working. He came on Thursday." },
      { speaker: "Ela", text: "Who did you meet there?" },
      { speaker: "Deniz", text: "Many people. We had a long conversation with an old man in a café." },
      { speaker: "Deniz", text: "He explained the history of the island. Can you guess how old he was?" },
      { speaker: "Ela", text: "Seventy?" },
      { speaker: "Deniz", text: "Ninety-two! And he was still working." },
      { speaker: "Ela", text: "Ninety-two! What happened after that?" },
      { speaker: "Deniz", text: "We went back to the hotel and we slept twelve hours." },
    ],
    questions: [
      {
        text: "Where did Deniz go?",
        options: ["to an island", "to a village", "to a hostel"],
        answer: 0,
        explain: "„I went to an island in the south. I was there for ten days.“",
      },
      {
        text: "How long did Deniz stay in the hotel?",
        options: ["three days", "ten days", "twelve hours"],
        answer: 0,
        explain: "„Only three days. After that I stayed with a friend.“ — on gün bütün tatil.",
      },
      {
        kind: "truefalse",
        text: "Deniz was alone all the time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Because my friend was working. He came on Thursday.“ — başta yalnızdı.",
      },
      {
        kind: "gapfill",
        text: "The old man was ___ years old.",
        options: [],
        answer: 0,
        accept: ["ninety-two", "92"],
        explain: "„Ninety-two! And he was still working.“ — Ela yetmiş diye tahmin ediyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Where did you go last month?", "Where did you go last month"],
        explain: "„Where did you go last month?“ — „did“ varken fiil ilk hâlinde: go.",
      },
      {
        kind: "short_answer",
        text: "What did the old man explain?",
        options: [],
        answer: 0,
        accept: ["the history of the island", "the history", "history"],
        explain: "„He explained the history of the island.“",
      },
    ],
  },
  {
    id: "en-a2-u3-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 3,
    title: "Been and gone",
    genre: "monologue",
    intro: "İki sözcüğün farkı anlatılıyor. Kim hâlâ orada, kim döndü?",
    gloss: [
      { de: "mean", tr: "anlamına gelmek" },
      { de: "south", tr: "güney" },
      { de: "the same", tr: "aynı" },
      { de: "journey", tr: "seyahat" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "My family travels a lot. My father has gone to Germany — he is away this week." },
      { speaker: "Nil", text: "My mother has been to Germany twice, but she is at home now. The two words are not the same!" },
      { speaker: "Nil", text: "He has gone means he is not here. She has been means she came back." },
      { speaker: "Nil", text: "I have never been abroad. But I have been to the mountains many times." },
      { speaker: "Nil", text: "My sister has visited six countries. Her last journey was to an island in the south." },
      { speaker: "Nil", text: "She always comes back with a small thing for me. Last time it was a doll." },
    ],
    questions: [
      {
        text: "Where has Nil's father gone?",
        options: ["to Germany", "to the mountains", "to an island"],
        answer: 0,
        explain: "„My father has gone to Germany — he is away this week.“ — yani hâlâ orada.",
      },
      {
        text: "How many countries has Nil's sister visited?",
        options: ["six", "two", "many"],
        answer: 0,
        explain: "„My sister has visited six countries.“ — iki, annenin Almanya sayısı.",
      },
      {
        kind: "truefalse",
        text: "Nil has been abroad.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have never been abroad. But I have been to the mountains many times.“",
      },
      {
        kind: "gapfill",
        text: "Nil's mother has been to Germany ___.",
        options: [],
        answer: 0,
        accept: ["twice"],
        explain: "„My mother has been to Germany twice, but she is at home now.“",
      },
      {
        kind: "order",
        text: "Anlatımın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "My father has gone to Germany.",
          "My mother has been to Germany twice.",
          "I have never been abroad.",
          "My sister has visited six countries.",
        ],
        explain: "Önce baba, sonra anne, sonra kendisi, en son kız kardeşi.",
      },
      {
        kind: "short_answer",
        text: "What did the sister bring last time?",
        options: [],
        answer: 0,
        accept: ["a doll", "doll", "a small thing"],
        explain: "„She always comes back with a small thing for me. Last time it was a doll.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u3-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 3,
    title: "What happened?",
    genre: "personal",
    intro: "Bir kazayı anlat ve geçmişi sor. Sonunda kaza formunu doldur.",
    gloss: [
      { de: "What happened?", tr: "ne oldu" },
      { de: "Luckily, …", tr: "neyse ki …" },
      { de: "How long did you stay?", tr: "ne kadar kaldın" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Ne oldu?",
        answer: "What happened?",
        hint: "„what“ burada özne, o yüzden „did“ girmiyor: „What did happen?“ denmiyor.",
      },
      {
        kind: "build",
        tr: "Merdivende düştüm ve kolumu incittim.",
        answer: "I fell on the stairs and hurt my arm.",
        hint: "„fall“ düzensiz: fell. „hurt“ın geçmişi de „hurt“ — hiç değişmiyor.",
      },
      {
        kind: "build",
        tr: "Neyse ki ciddi değildi.",
        answer: "Luckily, it wasn't serious.",
        alternatives: ["Luckily, it was not serious."],
        hint: "„luckily“ cümlenin başında ve virgülle ayrılıyor.",
      },
      {
        kind: "build",
        tr: "Ne kadar kaldın?",
        answer: "How long did you stay?",
        hint: "Süre sorusu „how long“; „did“ varken fiil eksiz: stay.",
      },
      {
        kind: "form",
        prompt: "Kaza formunu doldur.",
        facts: "Merdivende düşme; kol; evde; iki hafta ağır iş yok.",
        fields: [
          { label: "Accident", answer: "fell on the stairs", accept: ["a fall", "fell"] },
          { label: "Injury", answer: "arm", accept: ["the arm", "his arm"] },
          { label: "Where", answer: "at home", accept: ["home"] },
          { label: "Rest", answer: "two weeks", accept: ["2 weeks"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u3-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 3,
    title: "Have you ever …?",
    genre: "personal",
    intro: "Deneyim sor ve anlat. Son görev „been“ ile „gone“ arasındaki farkı ölçüyor.",
    gloss: [
      { de: "Have you ever …?", tr: "hiç … ettin mi" },
      { de: "I have never …", tr: "hiç … etmedim" },
      { de: "twice", tr: "iki kez" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Hiç yurt dışına çıktın mı?",
        answer: "Have you ever been abroad?",
        hint: "„ever“ özne ile fiil arasına giriyor. „abroad“ önünde edat almıyor.",
      },
      {
        kind: "build",
        tr: "Hiç yurt dışına çıkmadım.",
        answer: "I have never been abroad.",
        hint: "„never“ zaten olumsuz; ayrıca „not“ konmuyor.",
      },
      {
        kind: "build",
        tr: "İtalya'ya iki kez gittim.",
        answer: "I have been to Italy twice.",
        hint: "Gidip dönmüş olmak „have been to“; sayı cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "O Londra'ya gitti.",
        answer: "He has gone to London.",
        hint: "„has gone“ hâlâ orada demek. Dönmüş olsaydı „has been“ olurdu.",
      },
      {
        kind: "rewrite",
        prompt: "Yanlışı düzelt: „been“ mi „gone“ mu?",
        source: "She has gone to Italy twice and she is at home now.",
        answer: "She has been to Italy twice and she is at home now.",
        why: "„gone“ hâlâ orada demek; cümle „evde“ dediği için döndüğünü anlatan „been“ gerekiyor.",
      },
    ],
  },
];
