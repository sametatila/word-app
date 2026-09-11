import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 5 — "Umutlar, karşılaştırma, üstünlük, eskiden ve şimdi".
 *
 * Dört ders: Hopes and plans · Better than before · The best day ·
 * Me, then and now.
 *
 *   Kelime: hope, dream, future, job, abroad, goal, success, opportunity,
 *           than, cheap, difficult, important, better, narrow, wide,
 *           thick, best, worst, most, favourite, ever, huge, tiny,
 *           excellent, change, before, now, still, different, the same,
 *           similar, at the moment.
 *   Kalıp:  I hope to … · I'd like to … · My dream is to … ·
 *           … is cheaper than … · … is more important than … ·
 *           Which one is better? · It is the best day of my life. ·
 *           She is the most beautiful girl in the class. ·
 *           It's the best film I've ever seen. · I used to … ·
 *           I don't … anymore. · I'm still …
 *
 * Karşılaştırmanın kuralı UZUNLUĞA bağlı: kısa sıfat „-er“ alıyor
 * (cheaper), uzun sıfat „more“ istiyor (more important). Türkçede ikisi de
 * „daha“ ile kuruluyor ve sıfatın uzunluğu hiçbir şeyi değiştirmiyor.
 * İçerik ikisini hep yan yana kullanıyor ki sınır görünsün — ve „better“
 * ile „worst“ gibi düzensizleri de aynı metne koyuyor.
 */
export const enA2U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u5-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 5,
    title: "Me, then and now",
    genre: "personal",
    intro: "On yıl önce ve şimdi. Ne değişti, ne aynı kaldı?",
    gloss: [
      { de: "less", tr: "daha az" },
      { de: "almost", tr: "neredeyse" },
      { de: "centre", tr: "merkez" },
      { de: "book", tr: "kitap" },
    ],
    minutes: 5,
    text:
      "Ten years ago my life was very different. I used to work in a big office in the city. The job was important but difficult, and I was tired every evening.\n\n" +
      "Now I work at home. The money is less, but the hours are better and I am still here at six when my children come back from school.\n\n" +
      "I used to travel a lot. I don't travel anymore — or almost not. Last year I was abroad only once.\n\n" +
      "Some things are the same. I still read every night, and my favourite café is still the little one near the park. It is tiny, but the coffee is excellent and it is cheaper than the big places in the centre.\n\n" +
      "My dream is to write a book. That is my goal for the next two years.",
    questions: [
      {
        text: "Where does the writer work now?",
        options: ["at home", "in a big office", "in a café"],
        answer: 0,
        explain: "„Now I work at home.“ — büyük ofis on yıl öncesi.",
      },
      {
        text: "What is the writer's dream?",
        options: ["to write a book", "to travel a lot", "to work in an office"],
        answer: 0,
        explain: "„My dream is to write a book.“ — seyahat artık yapılmayan şey.",
      },
      {
        kind: "truefalse",
        text: "The writer travels a lot now.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I don't travel anymore — or almost not.“ — „anymore“ değişimi söylüyor.",
      },
      {
        kind: "gapfill",
        text: "The favourite café is ___ than the big places.",
        options: [],
        answer: 0,
        accept: ["cheaper"],
        explain: "„…it is cheaper than the big places in the centre.“ — kısa sıfat „-er“ alıyor.",
      },
      {
        kind: "short_answer",
        text: "What does the writer still do every night?",
        options: [],
        answer: 0,
        accept: ["read", "reading", "he reads"],
        explain: "„I still read every night…“ — „still“ değişmeyeni söylüyor.",
      },
    ],
  },
  {
    id: "en-a2-u5-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 5,
    title: "The best day",
    genre: "story",
    intro: "Hayatın en güzel günü anlatılıyor. Üstünlük biçimlerini yakala.",
    gloss: [
      { de: "company", tr: "şirket" },
      { de: "flat", tr: "daire" },
      { de: "practical", tr: "pratik" },
      { de: "opportunity", tr: "fırsat" },
    ],
    minutes: 5,
    text:
      "The best day of my life was in June two years ago. It was not a big day for other people, but for me it was excellent.\n\n" +
      "I had an opportunity: a company abroad wanted me for a new job. The letter came in the morning. I read it three times.\n\n" +
      "The job was more important than my old one, and the money was better too. But the best thing was not the money. The best thing was this: somebody read my work and said yes.\n\n" +
      "I called my mother and she cried. Then I called my sister — she is the most practical person in our family — and she asked: \"Is the flat cheaper there or more expensive?\"\n\n" +
      "It's the best memory I have ever had. And yes, the flat was more expensive.",
    questions: [
      {
        text: "What was the opportunity?",
        options: ["a new job abroad", "a letter from his mother", "a cheaper flat"],
        answer: 0,
        explain: "„a company abroad wanted me for a new job“ — mektup o haberi getiriyor.",
      },
      {
        text: "What was the best thing for the writer?",
        options: ["somebody said yes to his work", "the money", "the flat"],
        answer: 0,
        explain: "„But the best thing was not the money… somebody read my work and said yes.“",
      },
      {
        kind: "truefalse",
        text: "The flat abroad was cheaper.",
        options: ["True", "False"],
        answer: 1,
        explain: "„And yes, the flat was more expensive.“ — kız kardeşin sorusu son cümlede cevaplanıyor.",
      },
      {
        kind: "gapfill",
        text: "The new job was more ___ than the old one.",
        options: [],
        answer: 0,
        accept: ["important"],
        explain: "„The job was more important than my old one…“ — uzun sıfat „more“ istiyor.",
      },
      {
        kind: "order",
        text: "Günün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The letter came in the morning.",
          "I read it three times.",
          "I called my mother and she cried.",
          "Then I called my sister.",
        ],
        explain: "Önce mektup, sonra okuma, sonra anne, en son kız kardeş.",
      },
      {
        kind: "short_answer",
        text: "Who is the most practical person in the family?",
        options: [],
        answer: 0,
        accept: ["his sister", "the sister", "sister"],
        explain: "„…she is the most practical person in our family…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u5-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 5,
    title: "Which one is better?",
    genre: "dialogue",
    intro: "Üç çanta karşılaştırılıyor. Kısa sıfat mı, uzun sıfat mı?",
    gloss: [
      { de: "brown", tr: "kahverengi" },
      { de: "less", tr: "daha az" },
      { de: "space", tr: "yer" },
      { de: "thick", tr: "kalın" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "I need a new bag for work. Which one is better?" },
      { speaker: "Kaan", text: "The black one is cheaper. But the brown one is wider — you can put a computer in it." },
      { speaker: "Ela", text: "How much is the brown one?" },
      { speaker: "Kaan", text: "Sixty euros. The black one is forty." },
      { speaker: "Ela", text: "Twenty euros more. Is it more important to have space or to pay less?" },
      { speaker: "Kaan", text: "For work, space. You carry a computer every day." },
      { speaker: "Ela", text: "True. And this small one?" },
      { speaker: "Kaan", text: "That is the worst of the three. It is tiny and it is not cheap." },
      { speaker: "Ela", text: "Then the brown one. It is the best for me." },
      { speaker: "Kaan", text: "I think so too. And it is thicker, so it is better in the rain." },
      { speaker: "Ela", text: "Excellent. I take it." },
    ],
    questions: [
      {
        text: "Which bag does Ela take?",
        options: ["the brown one", "the black one", "the small one"],
        answer: 0,
        explain: "„Then the brown one. It is the best for me.“",
      },
      {
        text: "How much is the black bag?",
        options: ["forty euros", "sixty euros", "twenty euros"],
        answer: 0,
        explain: "„Sixty euros. The black one is forty.“ — yirmi aradaki fark.",
      },
      {
        kind: "truefalse",
        text: "The small bag is cheap.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is the worst of the three. It is tiny and it is not cheap.“",
      },
      {
        kind: "gapfill",
        text: "The brown bag is ___ than the black one.",
        options: [],
        answer: 0,
        accept: ["wider"],
        explain: "„But the brown one is wider…“ — kısa sıfat: wide → wider.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Which one is better?", "Which one is better"],
        explain: "„Which one is better?“ — „good“ düzensiz: better, „gooder“ yok.",
      },
      {
        kind: "short_answer",
        text: "Why is the brown bag better in the rain?",
        options: [],
        answer: 0,
        accept: ["it is thicker", "thicker", "because it is thicker"],
        explain: "„And it is thicker, so it is better in the rain.“",
      },
    ],
  },
  {
    id: "en-a2-u5-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 5,
    title: "Hopes and plans",
    genre: "monologue",
    intro: "Üç hedef anlatılıyor. Hangisi umut, hangisi hayal?",
    gloss: [
      { de: "career", tr: "kariyer" },
      { de: "goal", tr: "hedef" },
      { de: "success", tr: "başarı" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "I have three hopes for the next five years. They are not dreams — they are goals." },
      { speaker: "Nil", text: "First, I hope to finish my studies. I have studied for three years and I have two more." },
      { speaker: "Nil", text: "Second, I'd like to work abroad for one year. Not longer: my family is here." },
      { speaker: "Nil", text: "Third, my dream is to open a small shop. Books and coffee — the two best things." },
      { speaker: "Nil", text: "Success is not money for me. Success is this: at sixty I want the same job I have at thirty." },
      { speaker: "Nil", text: "I used to want a big career. I don't want that anymore. Something smaller is better." },
    ],
    questions: [
      {
        text: "What is Nil's dream?",
        options: ["to open a small shop", "to work abroad", "to finish her studies"],
        answer: 0,
        explain: "„Third, my dream is to open a small shop.“ — ötekiler umut ve istek.",
      },
      {
        text: "How long does Nil want to work abroad?",
        options: ["one year", "three years", "five years"],
        answer: 0,
        explain: "„I'd like to work abroad for one year. Not longer…“",
      },
      {
        kind: "truefalse",
        text: "Nil still wants a big career.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I used to want a big career. I don't want that anymore.“",
      },
      {
        kind: "gapfill",
        text: "Nil has studied for ___ years.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„I have studied for three years and I have two more.“",
      },
      {
        kind: "order",
        text: "Hedeflerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "First, I hope to finish my studies.",
          "Second, I'd like to work abroad for one year.",
          "Third, my dream is to open a small shop.",
          "Success is not money for me.",
        ],
        explain: "Üç hedef sırayla, sonra başarının kendi tanımı geliyor.",
      },
      {
        kind: "short_answer",
        text: "What is success for Nil?",
        options: [],
        answer: 0,
        accept: ["the same job at sixty", "the same job", "not money"],
        explain: "„Success is this: at sixty I want the same job I have at thirty.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u5-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 5,
    title: "… is cheaper than …",
    genre: "personal",
    intro: "Karşılaştırma yaz. Kısa sıfat „-er“, uzun sıfat „more“ alıyor.",
    gloss: [
      { de: "brown", tr: "kahverengi" },
      { de: "cheaper than", tr: "…-den daha ucuz" },
      { de: "more important than", tr: "…-den daha önemli" },
      { de: "the best", tr: "en iyi" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Otobüs trenden daha ucuz.",
        answer: "The bus is cheaper than the train.",
        hint: "„cheap“ kısa: „-er“ alıyor. Karşılaştırma „than“ ile bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Bu ötekinden daha önemli.",
        answer: "This is more important than the other one.",
        hint: "„important“ uzun: „more“ istiyor. „importanter“ diye bir sözcük yok.",
      },
      {
        kind: "build",
        tr: "Hangisi daha iyi?",
        answer: "Which one is better?",
        hint: "„good“ düzensiz: better. „the best“ de aynı kökten.",
      },
      {
        kind: "build",
        tr: "Hayatımın en güzel günü.",
        answer: "It is the best day of my life.",
        hint: "Üstünlükte „the“ zorunlu: the best, the most important.",
      },
      {
        kind: "form",
        prompt: "Karşılaştırma kartını doldur.",
        facts: "Siyah çanta kırk euro; kahverengi çanta altmış euro; kahverengi daha geniş; kahverengi seçildi.",
        fields: [
          { label: "Black", answer: "forty euros", accept: ["40 euros"] },
          { label: "Brown", answer: "sixty euros", accept: ["60 euros"] },
          { label: "Wider", answer: "the brown one", accept: ["brown"] },
          { label: "Choice", answer: "the brown one", accept: ["brown"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u5-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 5,
    title: "I used to …, but now …",
    genre: "personal",
    intro: "Umutları ve değişimi yaz. „anymore“ değişeni, „still“ değişmeyeni söylüyor.",
    gloss: [
      { de: "I hope to …", tr: "umarım …" },
      { de: "anymore", tr: "artık" },
      { de: "still", tr: "hâlâ" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Umarım yurt dışında çalışırım.",
        answer: "I hope to work abroad.",
        hint: "„hope“ sonrası „to“ + fiil. „abroad“ önünde edat almıyor.",
      },
      {
        kind: "build",
        tr: "Hayalim bir dükkân açmak.",
        answer: "My dream is to open a shop.",
        hint: "„dream“ burada isim; yüklem „is to“ + fiil.",
      },
      {
        kind: "build",
        tr: "Artık seyahat etmiyorum.",
        answer: "I don't travel anymore.",
        hint: "„anymore“ olumsuzla birlikte ve cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Hâlâ buradayım.",
        answer: "I'm still here.",
        alternatives: ["I am still here."],
        hint: "„still“ „be“ fiilinden SONRA geliyor; ana fiilde önce gelirdi.",
      },
      {
        kind: "rewrite",
        prompt: "İki cümleyi „than“ ile birleştir.",
        source: "The bus is cheap. The train is not cheap.",
        answer: "The bus is cheaper than the train.",
        why: "Kısa sıfat „-er“ alıyor ve iki taraf „than“ ile bağlanıyor; ikinci cümlenin olumsuzu düşüyor.",
      },
    ],
  },
];
