import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 20 — "Havuz, TV ve dizi, nazik ret, plan".
 *
 * Dört ders: At the pool · TV and series · Saying no politely ·
 * Making plans.
 *
 *   Kelime: swim, water, towel, learn, deep, pool, jump, summer, watch,
 *           series, channel, boring, every evening, watch TV, interesting,
 *           earphones, sorry, busy, maybe, thanks, afraid, other, if,
 *           want, plan, meet, tomorrow, later, together, would like,
 *           do something, so.
 *   Kalıp:  I can swim. · I can't swim. · Can you swim? ·
 *           I watch series every evening. · Do you watch this channel? ·
 *           This series is boring. · I'm afraid I can't. ·
 *           Sorry, I'm busy today. · Maybe next time. ·
 *           I'm going to meet Ali tomorrow. · Are you going to come? ·
 *           Let's meet at seven.
 *
 * Ünitenin asıl işi NAZİK RET ve bu bir dil bilgisi değil bir ADET.
 * İngilizcede „no“ tek başına sert duruyor; reddin üç parçası var: özür
 * („sorry“), gerekçe („I'm busy“), kapıyı açık bırakan bir söz („maybe
 * next time“). Türkçede de benzeri var ama parçaların sırası ve sayısı
 * öğretilmezse öğrenci yalnız „no“ diyor. İçerik üçünü hep birlikte
 * kullanıyor.
 */
export const enA1U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u20-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 20,
    title: "At the pool",
    genre: "personal",
    intro: "Havuz anlatılıyor. Su ne zaman soğuk, çocuklar nerede öğreniyor?",
    gloss: [
      { de: "course", tr: "kurs" },
      { de: "deep", tr: "derin" },
      { de: "towel", tr: "havlu" },
    ],
    minutes: 4,
    text:
      "In the summer I go to the pool every week. I can swim, but not very fast.\n\n" +
      "The water is cold in the morning and warm in the afternoon. I take a towel and my earphones — I listen to music in the water.\n\n" +
      "There are two pools. One is deep, one is not. The children learn to swim in the small pool. They jump in the water all day.\n\n" +
      "Can you swim? If not, there is a course here. It is not boring: you learn in two weeks and then you can jump too.",
    questions: [
      {
        text: "When does the writer go to the pool?",
        options: ["every week in the summer", "every day", "at the weekend"],
        answer: 0,
        explain: "„In the summer I go to the pool every week.“",
      },
      {
        text: "Where do the children learn to swim?",
        options: ["in the small pool", "in the deep pool", "at the course"],
        answer: 0,
        explain: "„The children learn to swim in the small pool.“ — derin havuz ötekisi.",
      },
      {
        kind: "truefalse",
        text: "The water is warm in the morning.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The water is cold in the morning and warm in the afternoon.“",
      },
      {
        kind: "gapfill",
        text: "The writer takes a ___ and earphones.",
        options: [],
        answer: 0,
        accept: ["towel"],
        explain: "„I take a towel and my earphones…“",
      },
      {
        kind: "short_answer",
        text: "How long is the swimming course?",
        options: [],
        answer: 0,
        accept: ["two weeks", "2 weeks", "two"],
        explain: "„you learn in two weeks and then you can jump too“",
      },
    ],
  },
  {
    id: "en-a1-u20-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 20,
    title: "Maybe next time",
    genre: "dialogue",
    intro: "Bir davet reddediliyor ama kapı kapanmıyor. Reddin üç parçasını bul.",
    gloss: [
      { de: "problem", tr: "sorun" },
      { de: "Maybe next time", tr: "belki başka zaman" },
      { de: "I'm afraid I can't", tr: "korkarım olmaz" },
    ],
    minutes: 4,
    text:
      "Ali: I'm going to meet Deniz tomorrow. Are you going to come?\n" +
      "Nil: Tomorrow? I'm afraid I can't. I'm busy.\n" +
      "Ali: And later, at seven?\n" +
      "Nil: Sorry, I'm busy today and tomorrow. Maybe next time.\n" +
      "Ali: No problem. What do you do?\n" +
      "Nil: I work, and in the evening I watch a series. Every evening!\n" +
      "Ali: Which channel?\n" +
      "Nil: It is not on a channel. I watch it on the computer.\n" +
      "Ali: Is it interesting?\n" +
      "Nil: Very. The other series on TV are boring.\n" +
      "Ali: Then let's meet on Sunday. We can do something together.\n" +
      "Nil: Sunday is good. Let's meet at seven.",
    questions: [
      {
        text: "Why can't Nil come tomorrow?",
        options: ["she is busy", "she is ill", "she watches a series"],
        answer: 0,
        explain: "„I'm afraid I can't. I'm busy.“ — ret üç parçalı: özür, gerekçe, sonraki sefer.",
      },
      {
        text: "Where does Nil watch the series?",
        options: ["on the computer", "on TV", "at the cinema"],
        answer: 0,
        explain: "„It is not on a channel. I watch it on the computer.“",
      },
      {
        kind: "truefalse",
        text: "Nil thinks the other series are interesting.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The other series on TV are boring.“ — ilginç olan kendi izlediği.",
      },
      {
        kind: "gapfill",
        text: "They are going to meet on ___.",
        options: [],
        answer: 0,
        accept: ["Sunday"],
        explain: "„Then let's meet on Sunday.“ — reddin ardından yeni bir gün öneriliyor.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Are you going to come?",
          "I'm afraid I can't.",
          "Maybe next time.",
          "Then let's meet on Sunday.",
        ],
        explain: "Önce davet, sonra ret, sonra kapıyı açık bırakan söz, en son yeni öneri.",
      },
      {
        kind: "short_answer",
        text: "What time do they meet?",
        options: [],
        answer: 0,
        accept: ["at seven", "seven", "7"],
        explain: "„Sunday is good. Let's meet at seven.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u20-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 20,
    title: "I can't swim",
    genre: "dialogue",
    intro: "Yüzme konuşuluyor. Kim nerede yüzebiliyor, kim öğreniyor?",
    gloss: [
      { de: "difficult", tr: "zor" },
      { de: "promise", tr: "söz vermek" },
      { de: "really", tr: "gerçekten" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mert", text: "Can you swim?" },
      { speaker: "Ela", text: "A little. I can swim in a pool, but not in a lake." },
      { speaker: "Mert", text: "Why not?" },
      { speaker: "Ela", text: "The water is deep and cold. I am afraid." },
      { speaker: "Mert", text: "I understand. I learn to swim at forty!" },
      { speaker: "Ela", text: "Really? Where?" },
      { speaker: "Mert", text: "Here, in this pool. The course is on Monday and Thursday." },
      { speaker: "Ela", text: "Is it difficult?" },
      { speaker: "Mert", text: "In the summer, no. The water is warm and there are not many people." },
      { speaker: "Ela", text: "Do I need a towel?" },
      { speaker: "Mert", text: "Yes, a towel and water. And don't jump in the deep pool!" },
      { speaker: "Ela", text: "I promise. Maybe I come with you on Monday." },
    ],
    questions: [
      {
        text: "Where can Ela swim?",
        options: ["in a pool", "in a lake", "everywhere"],
        answer: 0,
        explain: "„I can swim in a pool, but not in a lake.“ — göl derin ve soğuk.",
      },
      {
        text: "When is the swimming course?",
        options: ["on Monday and Thursday", "every day", "in the summer"],
        answer: 0,
        explain: "„The course is on Monday and Thursday.“",
      },
      {
        kind: "truefalse",
        text: "Mert can swim very fast.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I learn to swim at forty!“ — daha yeni öğreniyor.",
      },
      {
        kind: "gapfill",
        text: "Ela needs a ___ and water.",
        options: [],
        answer: 0,
        accept: ["towel"],
        explain: "„Yes, a towel and water.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Can you swim?", "Can you swim"],
        explain: "„Can you swim?“ — „can“ öne geçiyor ve fiil eksiz kalıyor.",
      },
      {
        kind: "short_answer",
        text: "Why doesn't Ela swim in a lake?",
        options: [],
        answer: 0,
        accept: ["the water is deep", "it is deep and cold", "she is afraid"],
        explain: "„The water is deep and cold. I am afraid.“",
      },
    ],
  },
  {
    id: "en-a1-u20-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 20,
    title: "Making plans",
    genre: "monologue",
    intro: "Bir haftanın planı. Hangi gün ne var, hangi gün boş?",
    gloss: [
      { de: "decide", tr: "karar vermek" },
      { de: "go home", tr: "eve gitmek" },
      { de: "later", tr: "daha sonra" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Deniz", text: "This week I have many plans. On Monday I'm going to meet Ali." },
      { speaker: "Deniz", text: "On Tuesday I go to the pool. I swim for one hour, then I take a towel and go home." },
      { speaker: "Deniz", text: "On Wednesday I'm going to watch the new series. Every evening, two hours!" },
      { speaker: "Deniz", text: "On Thursday I am busy at work. I'm not going to do something in the evening." },
      { speaker: "Deniz", text: "On Friday my sister comes. We are going to cook together." },
      { speaker: "Deniz", text: "And at the weekend? Maybe the cinema, maybe the park. I decide later." },
    ],
    questions: [
      {
        text: "When does Deniz meet Ali?",
        options: ["on Monday", "on Tuesday", "at the weekend"],
        answer: 0,
        explain: "„On Monday I'm going to meet Ali.“ — salı havuz günü.",
      },
      {
        text: "What is Deniz going to do on Friday?",
        options: ["cook with his sister", "watch a series", "go to the pool"],
        answer: 0,
        explain: "„On Friday my sister comes. We are going to cook together.“",
      },
      {
        kind: "truefalse",
        text: "Deniz has a plan for Thursday evening.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I'm not going to do something in the evening.“ — perşembe akşamı boş.",
      },
      {
        kind: "gapfill",
        text: "Deniz swims for one ___.",
        options: [],
        answer: 0,
        accept: ["hour"],
        explain: "„I swim for one hour, then I take a towel and go home.“",
      },
      {
        kind: "order",
        text: "Günlerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "On Monday I'm going to meet Ali.",
          "On Tuesday I go to the pool.",
          "On Thursday I am busy at work.",
          "On Friday my sister comes.",
        ],
        explain: "Pazartesiden cumaya sırayla; hafta sonu en sonda ve henüz belirsiz.",
      },
      {
        kind: "short_answer",
        text: "What is Deniz going to decide later?",
        options: [],
        answer: 0,
        accept: ["the weekend", "the weekend plan", "cinema or park"],
        explain: "„And at the weekend? Maybe the cinema, maybe the park. I decide later.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u20-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 20,
    title: "I can swim",
    genre: "personal",
    intro: "Yapabilme ve alışkanlık yaz. Sonunda havuz kartını doldur.",
    gloss: [
      { de: "I can swim.", tr: "yüzebilirim" },
      { de: "I can't swim.", tr: "yüzemem" },
      { de: "every evening", tr: "her akşam" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Yüzebilirim.",
        answer: "I can swim.",
        hint: "„can“ kişiye göre değişmez: I can, she can. Fiil de eksiz kalır.",
      },
      {
        kind: "build",
        tr: "Yüzemem.",
        answer: "I can't swim.",
        alternatives: ["I cannot swim."],
        hint: "Olumsuzu tek sözcük: „can't“. Türkçedeki „-ebil“ eki gibi ayrı bir ek yok.",
      },
      {
        kind: "build",
        tr: "Yüzebilir misin?",
        answer: "Can you swim?",
        hint: "Soruda „can“ öne geçiyor; „do“ hiç girmiyor.",
      },
      {
        kind: "build",
        tr: "Her akşam dizi izliyorum.",
        answer: "I watch series every evening.",
        hint: "Alışkanlık için düz geniş zaman; „series“ tekilde de çoğulda da aynı yazılır.",
      },
      {
        kind: "form",
        prompt: "Havuz kartını doldur.",
        facts: "Yaz; haftada bir; havlu ve su; kurs pazartesi ve perşembe.",
        fields: [
          { label: "Season", answer: "summer", accept: ["in the summer"] },
          { label: "Often", answer: "every week", accept: ["each week"] },
          { label: "Take", answer: "a towel and water", accept: ["towel and water"] },
          { label: "Course", answer: "Monday and Thursday", accept: ["on Monday and Thursday"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u20-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 20,
    title: "Maybe next time",
    genre: "personal",
    intro: "Nazik reddi yaz. Üç parça: özür, gerekçe, kapıyı açık bırakan söz.",
    gloss: [
      { de: "I'm afraid I can't.", tr: "korkarım olmaz" },
      { de: "Sorry, I'm busy today.", tr: "kusura bakma bugün meşgulüm" },
      { de: "Maybe next time.", tr: "belki başka zaman" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Korkarım olmaz.",
        answer: "I'm afraid I can't.",
        alternatives: ["I am afraid I can't."],
        hint: "„afraid“ burada korku değil nezaket; reddin yumuşak biçimi.",
      },
      {
        kind: "build",
        tr: "Kusura bakma, bugün meşgulüm.",
        answer: "Sorry, I'm busy today.",
        alternatives: ["Sorry, I am busy today."],
        hint: "Gerekçe söylenmezse ret sert duruyor; „busy“ en yaygın gerekçe.",
      },
      {
        kind: "build",
        tr: "Belki başka zaman.",
        answer: "Maybe next time.",
        hint: "Kapıyı açık bırakan söz. Fiil yok, hazır bir kalıp.",
      },
      {
        kind: "build",
        tr: "Yarın Ali ile buluşacağım.",
        answer: "I'm going to meet Ali tomorrow.",
        alternatives: ["I am going to meet Ali tomorrow."],
        hint: "Plan için „going to“; zaman sözcüğü cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Hadi yedide buluşalım.",
        answer: "Let's meet at seven.",
        hint: "Öneri „Let's“ ile ve saatte „at“ geliyor.",
      },
    ],
  },
];
