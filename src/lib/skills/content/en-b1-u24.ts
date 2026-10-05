import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 24 — "Hayaller, koşullar, dokunan şey, birini
 * neşelendirmek".
 *
 * Dört ders: What I dream of · If I could · The thing that moved me ·
 * Cheering someone up.
 *
 *   Kelime: dream, wish, brave, desire, longing, proud, joy, curious,
 *           forgive, shy, thank, jealous, close, deep, soft, comfort,
 *           cry, hug, smile, laugh, surprise, disappoint, emotion, fear,
 *           cheer, alone, advice, courage, try, kind, stress, cope.
 *   Kalıp:  I will follow that dream one day. ·
 *           I am going to write the wish down. ·
 *           I am taking the brave step next week. ·
 *           If you forgive him, everything gets easier. ·
 *           If I were less shy, I would say it. ·
 *           Unless you thank her, she will feel hurt. ·
 *           The movie that made me cry was old. ·
 *           The woman who hugged me was a stranger. ·
 *           The place where I smiled was quiet. ·
 *           You have to cheer her up first. ·
 *           You don't have to face it alone. ·
 *           You can't give advice too early.
 *
 * Ünitenin tek öğretme noktası İLGİ ADILI HİÇ ÇEKİLMİYOR. „that“, „who“
 * ve „where“ arasında yapılacak tek seçim sözcüğün TÜRÜ — şey, kişi, yer;
 * seçildikten sonra biçim hiç değişmiyor, ne sayıya ne göreve ne zamana
 * göre. Ünite 3 ilgi adılının DÜŞMESİNİ, ünite 8 VİRGÜLÜNÜ öğretmişti;
 * burada öğretilen şey adılın kendisinin donuk olması.
 */
export const enB1U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u24-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 24,
    title: "Three moments this year",
    genre: "blog",
    intro: "Yazarı bu yıl etkileyen üç an. Ortak noktaları ne?",
    gloss: [
      { de: "rainy", tr: "yağmurlu" },
      { de: "a film", tr: "film" },
      { de: "the south", tr: "güney" },
      { de: "reach", tr: "ulaşmak" },
      { de: "spring", tr: "ilkbahar" },
      { de: "a stranger", tr: "yabancı" },
      { de: "a suitcase", tr: "bavul" },
      { de: "a beach", tr: "kumsal" },
      { de: "on foot", tr: "yürüyerek" },
      { de: "for no reason", tr: "sebepsiz yere" },
      { de: "in common", tr: "ortak" },
      { de: "rarely", tr: "nadiren" },
    ],
    minutes: 7,
    text:
      "Three moments that moved me this year.\n" +
      "The movie that made me cry was old. It was a film in black and white from 1962 that my grandfather loved, and I watched it alone on a rainy Sunday. By the end I was crying so much that my cat left the room. Everybody who hears about it asks me which movie, and I never tell them. It is mine.\n" +
      "The woman who hugged me was a stranger. It was at the train station in March. I had just heard that my father was in the hospital, and I was sitting on the floor next to my suitcase. She did not say a word. She hugged me, gave me a bottle of water and got on her train.\n" +
      "The place where I smiled was quiet. It was a small beach in the south that you can only reach on foot. After a difficult spring, I sat there for an hour with my shoes off and noticed that I was smiling for no reason.\n" +
      "What do these three moments have in common? I think it is surprise. None of them was planned. The things that move me are rarely the things I put in my calendar.",
    questions: [
      {
        text: "Who did the writer watch the movie with?",
        options: ["nobody", "the grandfather", "a friend"],
        answer: 0,
        explain: "„I watched it alone on a rainy Sunday.“",
      },
      {
        text: "Where did the stranger hug the writer?",
        options: ["at the train station", "at the hospital", "on a beach"],
        answer: 0,
        explain: "„It was at the train station in March.“",
      },
      {
        kind: "truefalse",
        text: "The stranger gave the writer a bottle of water.",
        options: ["True", "False"],
        answer: 0,
        explain: "„She hugged me, gave me a bottle of water and got on her train.“",
      },
      {
        kind: "gapfill",
        text: "The place ___ I smiled was quiet.",
        options: [],
        answer: 0,
        accept: ["where"],
        explain: "„The place where I smiled was quiet.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The movie that made me cry was old.",
          "The woman who hugged me was a stranger.",
          "The place where I smiled was quiet.",
          "None of them was planned.",
        ],
        explain: "Film, yabancı kadın, kumsal, en sonda ortak nokta.",
      },
      {
        kind: "short_answer",
        text: "What do people ask the writer?",
        options: [],
        answer: 0,
        accept: ["which movie", "which movie it was", "the name of the movie"],
        explain: "„Everybody who hears about it asks me which movie…“",
      },
    ],
  },
  {
    id: "en-b1-u24-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 24,
    title: "A letter about a brother",
    genre: "letter",
    intro: "Bir okur mektubu ve danışmanın cevabı. Deniz ne yapmalı?",
    gloss: [
      { de: "borrowed", tr: "ödünç aldı" },
      { de: "paid it back", tr: "geri ödedi" },
      { de: "angry", tr: "kızgın" },
      { de: "a speech", tr: "konuşma" },
      { de: "in the middle", tr: "arada" },
      { de: "noticed", tr: "fark ettin" },
    ],
    minutes: 7,
    text:
      "ASK ANNA\n" +
      "Dear Anna, last year my brother borrowed money from me and never paid it back. We have not spoken for eight months. My mother wants us both at her birthday in June. I miss him, but I am still angry. If I were less shy, I would call him, but I do not know what to say. Charlie\n" +
      "Dear Charlie,\n" +
      "If you forgive him, everything gets easier, for you first and then maybe for him. Forgiving does not mean that the money is not important. It means that you stop carrying it with you every day.\n" +
      "If I were you, I would not wait for June. A birthday is a bad place for a difficult talk. Write him a short message this week. If he answers, meet for coffee, just the two of you.\n" +
      "You say you are shy. That is fine; you don't have to make a speech. Tell him one true thing: that you miss him.\n" +
      "And one more thing: your mother. She has been in the middle for eight months. Unless you thank her, she will feel hurt, so tell her that you noticed.\n" +
      "Anna",
    questions: [
      {
        text: "Why is Charlie angry?",
        options: ["His brother never paid the money back.", "His brother missed a birthday.", "His brother lost his job."],
        answer: 0,
        explain: "„last year my brother borrowed money from me and never paid it back.“",
      },
      {
        text: "What does Anna advise Charlie to do this week?",
        options: ["write his brother a short message", "call his mother", "wait for June"],
        answer: 0,
        explain: "„Write him a short message this week.“",
      },
      {
        kind: "truefalse",
        text: "Anna thinks the birthday is a good place for the talk.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A birthday is a bad place for a difficult talk.“",
      },
      {
        kind: "gapfill",
        text: "If I ___ less shy, I would call him.",
        options: [],
        answer: 0,
        accept: ["were"],
        explain: "„If I were less shy, I would call him, but I do not know what to say.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "My brother never paid the money back.",
          "If you forgive him, everything gets easier.",
          "Write him a short message this week.",
          "Unless you thank her, she will feel hurt.",
        ],
        explain: "Mektup, bağışlama, somut öneri, en sonda anne.",
      },
      {
        kind: "short_answer",
        text: "What true thing should Charlie tell his brother?",
        options: [],
        answer: 0,
        accept: ["that he misses him", "I miss you", "he misses him"],
        explain: "„Tell him one true thing: that you miss him.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u24-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 24,
    title: "A dream with no date",
    genre: "monologue",
    intro: "Altı yıllık bir hayal. Rosie şimdi ne yapıyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "of my own", tr: "kendime ait" },
      { de: "a bakery", tr: "fırın" },
      { de: "a notebook", tr: "defter" },
      { de: "my file", tr: "dosyam" },
      { de: "the calendar", tr: "takvim" },
      { de: "proof", tr: "kanıt" },
      { de: "an appointment", tr: "randevu" },
      { de: "comfortable", tr: "rahat" },
      { de: "missing", tr: "eksik" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Rosie", text: "I will follow that dream one day. I have said that for six years, about a small bakery of my own." },
      { speaker: "Rosie", text: "For six years there was no date, no first step and nobody waiting for me. Just the dream and a lot of bread at home." },
      { speaker: "Rosie", text: "I am going to write the wish down. The notebook is on the table and I bought it in May. Tonight I am going to write the plan in it: money, place, time." },
      { speaker: "Rosie", text: "And I am taking the brave step next week. Tuesday, four o'clock, a meeting at the bank with a woman who has my file." },
      { speaker: "Rosie", text: "The desire was always there. What was missing was the calendar, and a calendar is the only proof a plan ever has." },
      { speaker: "Rosie", text: "I was curious about why the dream felt good and the meeting felt like fear. Now I think the good feeling was the whole point of the dream." },
      { speaker: "Rosie", text: "„One day“ is comfortable. Tuesday is not comfortable, and that is how you know which one of them is real." },
      { speaker: "Rosie", text: "The longing does not go away when you make the appointment. It just stops being the only thing you do about it." },
    ],
    questions: [
      {
        text: "What is Rosie doing next Tuesday?",
        options: ["meeting a woman at the bank", "opening a bakery", "buying a notebook"],
        answer: 0,
        explain: "„a meeting at the bank with a woman who has my file.“",
      },
      {
        text: "When did Rosie buy the notebook?",
        options: ["in May", "on Tuesday", "next week"],
        answer: 0,
        explain: "„The notebook is on the table and I bought it in May…“",
      },
      {
        kind: "truefalse",
        text: "The longing does not go away when you make the appointment.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The longing does not go away when you make the appointment.“",
      },
      {
        kind: "gapfill",
        text: "A calendar is the only ___ a plan ever has.",
        options: [],
        answer: 0,
        accept: ["proof"],
        explain: "„a calendar is the only proof a plan ever has.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I am going to write the wish down.", "I am going to write the wish down"],
        explain: "Önceden kurulmuş karar: „going to“.",
      },
      {
        kind: "short_answer",
        text: "What was missing?",
        options: [],
        answer: 0,
        accept: ["the calendar", "calendar", "a date"],
        explain: "„What was missing was the calendar…“",
      },
    ],
  },
  {
    id: "en-b1-u24-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 24,
    title: "Tea and forty minutes",
    genre: "dialogue",
    intro: "Üzgün bir arkadaş. Timur ona nasıl yardım edebilir?",
    gloss: [
      { de: "tea", tr: "çay" },
      { de: "a door", tr: "kapı" },
      { de: "closing", tr: "kapanan" },
      { de: "actually", tr: "asıl" },
      { de: "sounds like", tr: "gibi geliyor" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Audrey", text: "You have to cheer her up first. Not with advice — with tea and forty minutes." },
      { speaker: "Timur", text: "Why not advice?" },
      { speaker: "Audrey", text: "You can't give advice too early. It sounds like a door closing, and she will stop talking about the thing that actually hurts." },
      { speaker: "Timur", text: "And if I say nothing at all?" },
      { speaker: "Audrey", text: "Then you are doing it right. Tell her she doesn't have to face it alone, and then show it: sit there with her." },
      { speaker: "Timur", text: "Do I have to stay the whole evening?" },
      { speaker: "Audrey", text: "No, you don't have to. Forty minutes is enough. But you can't look at your phone, not once." },
      { speaker: "Timur", text: "What does she need courage for?" },
      { speaker: "Audrey", text: "For Thursday. She has to call them, and she has been calm about it for three weeks, which is her way of not doing it." },
      { speaker: "Timur", text: "And the stress?" },
      { speaker: "Audrey", text: "The stress is the part she can cope with. It is being alone with it that she cannot, and that is the only part you can change." },
    ],
    questions: [
      {
        text: "What should Timur bring?",
        options: ["tea and forty minutes", "advice", "a plan"],
        answer: 0,
        explain: "„Not with advice — with tea and forty minutes.“",
      },
      {
        text: "What must Timur not do?",
        options: ["look at his phone", "bring tea", "stay forty minutes"],
        answer: 0,
        explain: "Telefona bakmak yasak: bir kez bile olmaz.",
      },
      {
        kind: "truefalse",
        text: "She cannot cope with the stress.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The stress is the part she can cope with.“",
      },
      {
        kind: "gapfill",
        text: "She has been calm about it for three ___.",
        options: [],
        answer: 0,
        accept: ["weeks"],
        explain: "„she has been calm about it for three weeks…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You can't give advice too early.", "You cannot give advice too early.", "You can't give advice too early"],
        explain: "Yasak: „can't“, „don't have to“ değil.",
      },
      {
        kind: "short_answer",
        text: "What can Timur change?",
        options: [],
        answer: 0,
        accept: ["being alone", "the being alone", "her being alone"],
        explain: "„It is being alone with it that she cannot, and that is the only part you can change.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u24-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 24,
    title: "Moments that moved me",
    genre: "opinion",
    intro: "Yazarı etkileyen üç an. Cümleleri kur, anı notunu doldur.",
    gloss: [
      { de: "that made me cry", tr: "beni ağlatan" },
      { de: "who hugged me", tr: "bana sarılan" },
      { de: "where I smiled", tr: "gülümsediğim yer" },
      { de: "follow", tr: "peşinden gitmek" },
      { de: "a beach", tr: "kumsal" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Beni ağlatan film eskiydi.",
        answer: "The movie that made me cry was old.",
        hint: "Şey için „that“; özne konumunda düşmüyor.",
      },
      {
        kind: "build",
        tr: "Bana sarılan kadın bir yabancıydı.",
        answer: "The woman who hugged me was a stranger.",
        hint: "Kişi için „who“; biçimi hiç değişmiyor.",
      },
      {
        kind: "build",
        tr: "Gülümsediğim yer sessizdi.",
        answer: "The place where I smiled was quiet.",
        hint: "Yer için „where“; sayı ve görev onu değiştirmiyor.",
      },
      {
        kind: "build",
        tr: "Bir gün o hayalin peşinden gideceğim.",
        answer: "I will follow that dream one day.",
        hint: "Tarihsiz kanaat: „will“ ile „one day“ birlikte geliyor.",
      },
      {
        kind: "form",
        prompt: "Anı notunu doldur.",
        facts: "Yazarı ağlatan film 1962 yapımı eski bir filmdi; ona sarılan kadın bir yabancıydı ve bu tren istasyonunda oldu; gülümsediği yer küçük bir kumsaldı.",
        fields: [
          { label: "The movie", answer: "from 1962", accept: ["1962", "an old movie", "old"] },
          { label: "The woman", answer: "a stranger", accept: ["stranger", "a stranger at the station"] },
          { label: "The hug", answer: "at the train station", accept: ["the train station", "at the station", "train station"] },
          { label: "The place", answer: "a small beach", accept: ["a beach", "beach", "small beach"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u24-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 24,
    title: "Kind words for a friend",
    genre: "opinion",
    intro: "Üzgün bir arkadaşa iyi sözler. Öğüt cümlelerini kur.",
    gloss: [
      { de: "were", tr: "olsam" },
      { de: "forgive", tr: "affetmek" },
      { de: "unless", tr: "olmadıkça" },
      { de: "cheer her up", tr: "onu neşelendirmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Daha az utangaç olsam söylerdim.",
        answer: "If I were less shy, I would say it.",
        hint: "Gerçek olmayan koşul: „were“, „was“ değil.",
      },
      {
        kind: "build",
        tr: "Onu affedersen her şey kolaylaşır.",
        answer: "If you forgive him, everything gets easier.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Ona teşekkür etmezsen incinmiş hissedecek.",
        answer: "Unless you thank her, she will feel hurt.",
        hint: "„unless“ olumsuzluğu kendi içinde taşıyor.",
      },
      {
        kind: "build",
        tr: "Önce onu neşelendirmen gerekiyor.",
        answer: "You have to cheer her up first.",
        hint: "Dışarıdan gelen zorunluluk: „have to“.",
      },
      {
        kind: "build",
        tr: "Ona çok erken öğüt vermemelisin.",
        answer: "You can't give advice too early.",
        alternatives: ["You cannot give advice too early.", "You must not give advice too early.", "You mustn't give advice too early."],
        hint: "Yasak koyuyor; kuralı kaldırmıyor.",
      },
    ],
  },
];
