import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 19 — "Müzik, sinema daveti, hava, park".
 *
 * Dört ders: Music · Cinema invitation · Weather small talk ·
 * In the park.
 *
 *   Kelime: music, song, listen, band, guitar, piano, sing, CD, cinema,
 *           invite, together, ticket, tonight, movie, star, story,
 *           weather, rain, cold, hot, sunny, snow, windy, air, park,
 *           grass, child, dog, tree, playground, ball, lake.
 *   Kalıp:  I like this song. · What music do you like? ·
 *           I prefer pop music. · Would you like to go to the cinema? ·
 *           Let's go together. · Sorry, I can't tonight. ·
 *           It's cold today. · It's raining. · How's the weather? ·
 *           There is a … · There are … · Is there a …?
 *
 * Ünitenin görünmeyen kuralı HAVA CÜMLESİNİN ÖZNESİ: „It's raining“,
 * „It's cold today“ — özne „it“ hiçbir şeyi göstermiyor ama düşürülemiyor.
 * Türkçede o cümleler öznesiz kuruluyor ("yağmur yağıyor", "hava soğuk")
 * ve öğrenci „is raining“ ya da „cold today“ diyor. İçerik kalıbı üç
 * egzersizde tekrarlıyor.
 */
export const enA1U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u19-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 19,
    title: "Would you like to go to the cinema?",
    genre: "dialogue",
    intro: "Sinema daveti. Davet, ret ve yeni bir gün — üçü de ayrı kalıpla.",
    gloss: [
      { de: "the sixties", tr: "altmışlı yıllar" },
      { de: "maybe", tr: "belki" },
      { de: "See you", tr: "görüşürüz" },
    ],
    minutes: 4,
    text:
      "Can: Would you like to go to the cinema tonight?\n" +
      "Ela: Tonight? Sorry, I can't tonight. I am busy.\n" +
      "Can: And tomorrow?\n" +
      "Ela: Tomorrow is good. What movie?\n" +
      "Can: A story about a music band in the sixties. The stars are very good.\n" +
      "Ela: I like music movies! Is there a ticket for me?\n" +
      "Can: Yes, I buy two tickets. Let's go together at eight.\n" +
      "Ela: Good. How's the weather tomorrow?\n" +
      "Can: Cold and windy, I think. Maybe rain.\n" +
      "Ela: Then the cinema is perfect. In the park it is too cold now.\n" +
      "Can: Yes. And the grass is wet from the snow.\n" +
      "Ela: See you tomorrow at eight!",
    questions: [
      {
        text: "When do they go to the cinema?",
        options: ["tomorrow", "tonight", "on Sunday"],
        answer: 0,
        explain: "„Sorry, I can't tonight… Tomorrow is good.“ — davet bu akşamaydı, ret gelince yarına kayıyor.",
      },
      {
        text: "What is the movie about?",
        options: ["a music band", "a park", "the weather"],
        answer: 0,
        explain: "„A story about a music band in the sixties.“",
      },
      {
        kind: "truefalse",
        text: "Ela is busy tonight.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Sorry, I can't tonight. I am busy.“ — meşgul olduğu gün bu akşam.",
      },
      {
        kind: "gapfill",
        text: "Can buys two ___.",
        options: [],
        answer: 0,
        accept: ["tickets"],
        explain: "„Yes, I buy two tickets.“",
      },
      {
        kind: "short_answer",
        text: "How is the weather tomorrow?",
        options: [],
        answer: 0,
        accept: ["cold and windy", "cold", "windy"],
        explain: "„Cold and windy, I think. Maybe rain.“",
      },
    ],
  },
  {
    id: "en-a1-u19-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 19,
    title: "In the park",
    genre: "personal",
    intro: "Parkta bir pazar. Ne var, hava nasıl, kışın ne oluyor?",
    gloss: [
      { de: "winter", tr: "kış" },
      { de: "playground", tr: "oyun parkı" },
      { de: "grass", tr: "çimen" },
    ],
    minutes: 4,
    text:
      "On Sunday we go to the park. There is a big playground for children and there are many trees.\n\n" +
      "There is a lake with two boats. My son plays with a ball on the grass. Our dog runs everywhere.\n\n" +
      "Is there a café in the park? Yes, next to the lake. In the sun we sit outside and listen to music.\n\n" +
      "Today it is sunny, but yesterday it was cold and there was rain. In the winter there is snow here and the lake is hard. Then the children play on the lake — but that is not for me!",
    questions: [
      {
        text: "What is next to the lake?",
        options: ["a café", "a school", "a station"],
        answer: 0,
        explain: "„Is there a café in the park? Yes, next to the lake.“",
      },
      {
        text: "Who plays with a ball?",
        options: ["the son", "the dog", "the children"],
        answer: 0,
        explain: "„My son plays with a ball on the grass.“ — köpek koşuyor, çocuklar kışın gölde oynuyor.",
      },
      {
        kind: "truefalse",
        text: "Today it is cold.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Today it is sunny, but yesterday it was cold…“ — soğuk olan dündü.",
      },
      {
        kind: "gapfill",
        text: "In the winter there is ___ here.",
        options: [],
        answer: 0,
        accept: ["snow"],
        explain: "„In the winter there is snow here and the lake is hard.“",
      },
      {
        kind: "short_answer",
        text: "Who plays on the lake in the winter?",
        options: [],
        answer: 0,
        accept: ["the children", "children", "the young people"],
        explain: "„Then the children play on the lake — but that is not for me!“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u19-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 19,
    title: "What music do you like?",
    genre: "dialogue",
    intro: "İki kişi müziği konuşuyor. Kim ne çalıyor, kim ne dinliyor?",
    gloss: [
      { de: "band", tr: "müzik grubu" },
      { de: "CD", tr: "CD" },
      { de: "piano", tr: "piyano" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "What music do you like?" },
      { speaker: "Ali", text: "I prefer pop music. And you?" },
      { speaker: "Nil", text: "I like old songs. My father has three hundred CDs!" },
      { speaker: "Ali", text: "Three hundred! Do you listen to them?" },
      { speaker: "Nil", text: "Sometimes. I play the guitar too, and my sister plays the piano." },
      { speaker: "Ali", text: "Can you sing?" },
      { speaker: "Nil", text: "No, I can't sing. But I like this song — listen." },
      { speaker: "Ali", text: "That is a good band. Are they from here?" },
      { speaker: "Nil", text: "No, from Ireland. They play in the city on Friday." },
      { speaker: "Ali", text: "Would you like to go together?" },
      { speaker: "Nil", text: "Yes! Is there a ticket for me too?" },
      { speaker: "Ali", text: "I buy two. Let's meet at seven." },
    ],
    questions: [
      {
        text: "What music does Ali prefer?",
        options: ["pop music", "old songs", "piano music"],
        answer: 0,
        explain: "„I prefer pop music.“ — eski şarkılar Nil'in.",
      },
      {
        text: "What does Nil play?",
        options: ["the guitar", "the piano", "nothing"],
        answer: 0,
        explain: "„I play the guitar too, and my sister plays the piano.“",
      },
      {
        kind: "truefalse",
        text: "Nil can sing.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I can't sing.“ — çalıyor ama söylemiyor.",
      },
      {
        kind: "gapfill",
        text: "Nil's father has three hundred ___.",
        options: [],
        answer: 0,
        accept: ["CDs"],
        explain: "„My father has three hundred CDs!“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I prefer pop music.", "I prefer pop music"],
        explain: "„I prefer pop music.“ — „prefer“ tek başına da kullanılır, „to“ gerekmez.",
      },
      {
        kind: "short_answer",
        text: "Where is the band from?",
        options: [],
        answer: 0,
        accept: ["Ireland", "from Ireland"],
        explain: "„No, from Ireland. They play in the city on Friday.“",
      },
    ],
  },
  {
    id: "en-a1-u19-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 19,
    title: "How's the weather?",
    genre: "phone",
    intro: "İki şehirde hava. Kaç derece, ne yağıyor?",
    gloss: [
      { de: "degrees", tr: "derece" },
      { de: "air", tr: "hava" },
      { de: "windy", tr: "rüzgârlı" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Sena", text: "Hello! How's the weather there?" },
      { speaker: "Kaan", text: "It's raining. And it's cold — ten degrees." },
      { speaker: "Sena", text: "Here it is sunny and hot! Twenty-eight degrees." },
      { speaker: "Kaan", text: "Twenty-eight! And the air?" },
      { speaker: "Sena", text: "Very good. I sit in the park under a tree." },
      { speaker: "Kaan", text: "Here the children can't play outside. The playground is wet." },
      { speaker: "Sena", text: "Is there snow?" },
      { speaker: "Kaan", text: "No, not now. But it is windy and the rain doesn't stop." },
      { speaker: "Sena", text: "Then come here for the weekend!" },
      { speaker: "Kaan", text: "A good idea. Is there a lake?" },
      { speaker: "Sena", text: "Yes, with boats. And in the evening we listen to music outside." },
      { speaker: "Kaan", text: "Perfect. I buy a ticket tonight." },
    ],
    questions: [
      {
        text: "How is the weather at Kaan's?",
        options: ["raining and cold", "sunny and hot", "windy with snow"],
        answer: 0,
        explain: "„It's raining. And it's cold — ten degrees.“ — kar yok, rüzgâr var.",
      },
      {
        text: "How many degrees is it at Sena's?",
        options: ["twenty-eight", "ten", "eight"],
        answer: 0,
        explain: "„Here it is sunny and hot! Twenty-eight degrees.“ — on, Kaan'ın şehrinde.",
      },
      {
        kind: "truefalse",
        text: "There is snow at Kaan's.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Is there snow? — No, not now.“",
      },
      {
        kind: "gapfill",
        text: "The playground is ___.",
        options: [],
        answer: 0,
        accept: ["wet"],
        explain: "„Here the children can't play outside. The playground is wet.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "How's the weather there?",
          "It's raining. And it's cold.",
          "Here it is sunny and hot!",
          "Then come here for the weekend!",
        ],
        explain: "Önce soru, sonra oranın havası, sonra buranınki, en son davet.",
      },
      {
        kind: "short_answer",
        text: "What does Kaan buy tonight?",
        options: [],
        answer: 0,
        accept: ["a ticket", "ticket", "the ticket"],
        explain: "„Perfect. I buy a ticket tonight.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u19-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 19,
    title: "I like this song",
    genre: "personal",
    intro: "Müzik ve hava cümlelerini yaz. Sonunda sinema planını doldur.",
    gloss: [
      { de: "I like this song.", tr: "bu şarkıyı seviyorum" },
      { de: "I prefer pop music.", tr: "pop müziği tercih ederim" },
      { de: "It's cold today.", tr: "bugün hava soğuk" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bu şarkıyı seviyorum.",
        answer: "I like this song.",
        hint: "Belli bir şarkı için „this“; nesne „song“ zorunlu.",
      },
      {
        kind: "build",
        tr: "Ne müzik seversin?",
        answer: "What music do you like?",
        hint: "Soru sözcüğü isimle birlikte başta: „what music“. Sonra „do you like“.",
      },
      {
        kind: "build",
        tr: "Pop müziği tercih ederim.",
        answer: "I prefer pop music.",
        hint: "„music“ sayılamaz: önünde „the“ yok, çoğulu da yok.",
      },
      {
        kind: "build",
        tr: "Bugün hava soğuk.",
        answer: "It's cold today.",
        alternatives: ["It is cold today."],
        hint: "Hava cümlesinin öznesi „it“ ve hiçbir şeyi göstermiyor — ama düşürülemez.",
      },
      {
        kind: "form",
        prompt: "Sinema planını doldur.",
        facts: "Yarın; saat sekizde; iki bilet; müzik filmi.",
        fields: [
          { label: "Day", answer: "tomorrow" },
          { label: "Time", answer: "eight", accept: ["at eight", "8"] },
          { label: "Tickets", answer: "two", accept: ["2"] },
          { label: "Movie", answer: "music", accept: ["a music movie", "music movie"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u19-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 19,
    title: "It's raining",
    genre: "personal",
    intro: "Hava ve davet yaz. Hava cümlesinde „it“ boş bir özne ama zorunlu.",
    gloss: [
      { de: "It's raining.", tr: "yağmur yağıyor" },
      { de: "How's the weather?", tr: "hava nasıl" },
      { de: "Let's go together.", tr: "hadi birlikte gidelim" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Yağmur yağıyor.",
        answer: "It's raining.",
        alternatives: ["It is raining."],
        hint: "„rain“ burada fiil ve şu an sürdüğü için „-ing“. Özne „it“ boş ama zorunlu.",
      },
      {
        kind: "build",
        tr: "Hava nasıl?",
        answer: "How's the weather?",
        alternatives: ["How is the weather?"],
        hint: "„weather“ sayılamaz ve „the“ ile geliyor: the weather.",
      },
      {
        kind: "build",
        tr: "Sinemaya gitmek ister misin?",
        answer: "Would you like to go to the cinema?",
        hint: "Davet „would you like“ ile; sonrası „to“ + fiil, „-ing“ değil.",
      },
      {
        kind: "build",
        tr: "Hadi birlikte gidelim.",
        answer: "Let's go together.",
        hint: "„Let's“ = „Let us“ ve sonrası eksiz fiil: let's go, „let's to go“ değil.",
      },
      {
        kind: "build",
        tr: "Kusura bakma, bu akşam olmaz.",
        answer: "Sorry, I can't tonight.",
        hint: "Nazik ret: önce özür, sonra „I can't“. Fiil söylenmese de anlaşılıyor.",
      },
    ],
  },
];
