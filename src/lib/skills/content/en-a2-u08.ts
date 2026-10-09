import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 8 — "His, iyileşme, ev arama, evi anlatmak".
 *
 * Dört ders: How are you feeling? · Getting better · Looking for an apartment ·
 * My home.
 *
 *   Kelime: worried, stressed, relaxed, afraid, better, feeling,
 *           be afraid, disappointed, recover, almost, still, already,
 *           normal, health, step by step, breathe, apartment, rent, deposit,
 *           furnished, floor, first floor, ad, old building, bright,
 *           quiet, spacious, balcony, view, ceiling, curtain, comfortable.
 *   Kalıp:  I feel … · I'm worried about … · Are you OK? ·
 *           I've already taken my medicine. · I'm still tired. ·
 *           I've had a cold for three days. · How much is the rent? ·
 *           Is the apartment furnished? · Can I see it on Saturday? ·
 *           I live in a bright apartment. ·
 *           It has a balcony with a great view. ·
 *           My kitchen is brighter than the living room.
 *
 * Ünite gövdeden eve geçiyor ama dil ipi tek: SIFATIN KENDİ EDATI VAR.
 * „worried about“, „afraid of“ — edat sıfatın parçası ve tahmin
 * edilemiyor, sözcükle birlikte öğreniliyor. Ev yarısında ünite 5'in
 * karşılaştırması geri geliyor, bu kez betimleme işinde: „brighter than“,
 * „more comfortable“.
 */
export const enA2U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u8-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 8,
    title: "Afraid of the interview",
    genre: "dialogue",
    intro: "Mülakat öncesi. Kim neyden endişeli, kim neyden korkuyor?",
    gloss: [
      { de: "interview", tr: "mülakat" },
      { de: "experience", tr: "deneyim" },
      { de: "half", tr: "yarısı" },
      { de: "company", tr: "şirket" },
      { de: "prepared", tr: "hazırlıklı" },
    ],
    minutes: 5,
    text:
      "Katie: Are you OK? You look worried.\n" +
      "Tyler: I am. I have a job interview on Thursday and I'm afraid of the questions.\n" +
      "Katie: Which questions?\n" +
      "Tyler: The last time they asked me about my old job and I said nothing good. I was so stressed.\n" +
      "Katie: And what happened?\n" +
      "Tyler: They said no. I was disappointed for a week.\n" +
      "Katie: This time you are better prepared. You know the company and you have more experience.\n" +
      "Tyler: Maybe. But I'm worried about the money question. What do I say?\n" +
      "Katie: Say a number, not a story. And breathe before you answer.\n" +
      "Tyler: You are always so relaxed. How do you do it?\n" +
      "Katie: I am not relaxed. I only look relaxed. That is half of the work.\n" +
      "Tyler: Then I will learn that too.\n" +
      "Katie: Call me on Thursday evening. I want to hear everything.",
    questions: [
      {
        text: "What is Tyler afraid of?",
        options: ["the questions", "the money", "Thursday"],
        answer: 0,
        explain: "„I'm afraid of the questions.“ — para sorusu ayrı, orada „worried about“ diyor.",
      },
      {
        text: "What does Katie say about the money question?",
        options: ["say a number", "say a story", "say nothing"],
        answer: 0,
        explain: "„Say a number, not a story.“",
      },
      {
        kind: "truefalse",
        text: "Katie only looks relaxed.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I am not relaxed. I only look relaxed.“",
      },
      {
        kind: "gapfill",
        text: "Tyler was disappointed for a ___.",
        options: [],
        answer: 0,
        accept: ["week"],
        explain: "„They said no. I was disappointed for a week.“",
      },
      {
        kind: "short_answer",
        text: "When should Tyler call Katie?",
        options: [],
        answer: 0,
        accept: ["on Thursday evening", "Thursday evening", "Thursday"],
        explain: "„Call me on Thursday evening. I want to hear everything.“",
      },
    ],
  },
  {
    id: "en-a2-u8-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 8,
    title: "Four apartments in two weeks",
    genre: "story",
    intro: "Dört daire, dört kusur. Sonunda seçilen en güzeli değil.",
    gloss: [
      { de: "ad", tr: "ilan" },
      { de: "dark", tr: "karanlık" },
      { de: "high", tr: "yüksek" },
      { de: "neighbors", tr: "komşular" },
      { de: "fourth", tr: "dördüncü" },
    ],
    minutes: 6,
    text:
      "We looked at four apartments in two weeks. The first one was cheap, but it was on the first floor and very dark.\n" +
      "The second had a beautiful balcony, but the rent was eight hundred euros. Too much for us.\n" +
      "The third one was in an old building. The rooms were spacious and bright, and the ceiling was high.\n" +
      "But the ad said \"furnished\" and there was only a bed and a table.\n" +
      "The fourth apartment was small. The rooms were normal and the kitchen was old.\n" +
      "But it was quiet, the neighbors were friendly and the deposit was only one month.\n" +
      "We took the fourth. My sister asked: Why the small one?\n" +
      "I said: Because I sleep there. In the first one I would never sleep — the street is under the window.\n" +
      "We have been here since March and I am happy. The apartment is smaller than my old one, but my life is bigger.",
    questions: [
      {
        text: "Why didn't they take the second apartment?",
        options: ["the rent was too high", "it was dark", "it was small"],
        answer: 0,
        explain: "„…but the rent was eight hundred euros. Too much for us.“",
      },
      {
        text: "What was the problem with the third apartment?",
        options: ["it was not really furnished", "the ceiling was low", "it was on the first floor"],
        answer: 0,
        explain: "„…the ad said \"furnished\" and there was only a bed and a table.“",
      },
      {
        kind: "truefalse",
        text: "The third apartment was in a new building.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The third one was in an old building.“",
      },
      {
        kind: "gapfill",
        text: "The deposit for the fourth apartment was ___ month.",
        options: [],
        answer: 0,
        accept: ["one", "1"],
        explain: "„…and the deposit was only one month.“",
      },
      {
        kind: "order",
        text: "Dairelerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "cheap and dark, on the first floor",
          "a beautiful balcony, eight hundred euros",
          "spacious and bright, but not really furnished",
          "small and quiet, with friendly neighbors",
        ],
        explain: "Metin birinciden dördüncüye doğru gidiyor; alınan sonuncusu.",
      },
      {
        kind: "short_answer",
        text: "Why did the writer take the small apartment?",
        options: [],
        answer: 0,
        accept: ["because I sleep there", "she sleeps there", "to sleep"],
        explain: "„Because I sleep there.“ — birincide sokak pencerenin altında.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u8-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 8,
    title: "After the fever",
    genre: "dialogue",
    intro: "İyileşme konuşması. Kim hangi süreyi söylüyor, hangisi doğru?",
    gloss: [
      { de: "boss", tr: "patron" },
      { de: "normally", tr: "normal olarak" },
      { de: "slowly", tr: "yavaşça" },
      { de: "the best part", tr: "en iyi yanı" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Charlie", text: "How are you feeling today?" },
      { speaker: "Lucy", text: "Better, thank you. I've already taken my medicine." },
      { speaker: "Charlie", text: "And the fever?" },
      { speaker: "Lucy", text: "Gone since Tuesday. But I'm still tired after two hours." },
      { speaker: "Charlie", text: "That is normal. You've had a cold for three days." },
      { speaker: "Lucy", text: "Almost a week. It started on Friday." },
      { speaker: "Charlie", text: "Then go step by step. Don't go back to work on Monday." },
      { speaker: "Lucy", text: "My boss called this morning." },
      { speaker: "Charlie", text: "And?" },
      { speaker: "Lucy", text: "He was kind. He said: Your health first, the work can wait." },
      { speaker: "Charlie", text: "A good boss. Can you breathe normally now?" },
      { speaker: "Lucy", text: "Yes, that is the best part. Last week the stairs were a problem." },
      { speaker: "Charlie", text: "You will recover. But slowly." },
      { speaker: "Lucy", text: "I know. I have already learned one thing: the body decides, not me." },
    ],
    questions: [
      {
        text: "When did the fever go away?",
        options: ["on Tuesday", "on Friday", "on Monday"],
        answer: 0,
        explain: "„Gone since Tuesday.“ — cuma soğuk algınlığının başlangıcı.",
      },
      {
        text: "What did the boss say?",
        options: ["health first", "come on Monday", "work first"],
        answer: 0,
        explain: "„Your health first, the work can wait.“",
      },
      {
        kind: "truefalse",
        text: "Lucy has had the cold for almost a week.",
        options: ["True", "False"],
        answer: 0,
        explain: "Charlie üç gün diyor, Lucy düzeltiyor: „Almost a week. It started on Friday.“",
      },
      {
        kind: "gapfill",
        text: "Lucy is still ___ after two hours.",
        options: [],
        answer: 0,
        accept: ["tired"],
        explain: "„But I'm still tired after two hours.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I've already taken my medicine.", "I have already taken my medicine.", "I've already taken my medicine"],
        explain: "„already“ yardımcı ile asıl fiil arasında duruyor.",
      },
      {
        kind: "short_answer",
        text: "What is the best part for Lucy now?",
        options: [],
        answer: 0,
        accept: ["she can breathe normally", "breathe normally", "breathing"],
        explain: "„Can you breathe normally now? — Yes, that is the best part.“",
      },
    ],
  },
  {
    id: "en-a2-u8-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 8,
    title: "A balcony with a view",
    genre: "monologue",
    intro: "Bir daire tek tek anlatılıyor. Hangi oda daha aydınlık, hangisi daha rahat?",
    gloss: [
      { de: "sun", tr: "güneş" },
      { de: "came in", tr: "içeri giriyordu" },
      { de: "the best part", tr: "en iyi yanı" },
      { de: "winter", tr: "kış" },
      { de: "party", tr: "parti" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Henry", text: "I live in a bright apartment on the third floor of an old building." },
      { speaker: "Henry", text: "It is not big, but it is spacious — two rooms, a kitchen and a small room for my books." },
      { speaker: "Henry", text: "The best part is the balcony. It has a view of the park and in summer I eat there every evening." },
      { speaker: "Henry", text: "My kitchen is brighter than the living room. The window there is bigger." },
      { speaker: "Henry", text: "The living room is more comfortable. There is an old chair from my grandmother." },
      { speaker: "Henry", text: "I don't like the ceiling. It is very high and in winter the room is cold." },
      { speaker: "Henry", text: "The curtains are new. Before that, the sun came in at five in the morning." },
      { speaker: "Henry", text: "It is quiet here, but on Saturdays my neighbors have a party — and then I go out on the balcony." },
    ],
    questions: [
      {
        text: "Which room is brighter?",
        options: ["the kitchen", "the living room", "the balcony"],
        answer: 0,
        explain: "„My kitchen is brighter than the living room. The window there is bigger.“",
      },
      {
        text: "What is the problem with the ceiling?",
        options: ["the room is cold in winter", "it is too low", "it is dark"],
        answer: 0,
        explain: "„It is very high and in winter the room is cold.“",
      },
      {
        kind: "truefalse",
        text: "Henry lives on the first floor.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…on the third floor of an old building.“",
      },
      {
        kind: "gapfill",
        text: "The balcony has a view of the ___.",
        options: [],
        answer: 0,
        accept: ["park"],
        explain: "„It has a view of the park…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My kitchen is brighter than the living room.", "My kitchen is brighter than the living room"],
        explain: "Kısa sıfat „-er“ alıyor ve iki taraf „than“ ile bağlanıyor.",
      },
      {
        kind: "short_answer",
        text: "Why are the curtains new?",
        options: [],
        answer: 0,
        accept: ["the sun", "the sun came in at five", "because of the sun"],
        explain: "„The curtains are new. Before that, the sun came in at five in the morning.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u8-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 8,
    title: "Feelings and health",
    genre: "personal",
    intro: "His cümleleri. Her sıfatın kendi edatı var; ezberlenecek yer orası.",
    gloss: [
      { de: "worried about", tr: "endişeli" },
      { de: "afraid of", tr: "korkuyor" },
      { de: "the exam", tr: "sınav" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Kendimi daha iyi hissediyorum.",
        answer: "I feel better.",
        hint: "„feel“ sonrası sıfat geliyor: „I feel better“. „better“ hem „good“un hem „well“in karşılaştırması.",
      },
      {
        kind: "build",
        tr: "Sınav için endişeliyim.",
        answer: "I'm worried about the exam.",
        alternatives: ["I am worried about the exam."],
        hint: "„worried“ kendi edatını taşıyor: about. Tahmin edilmez, sözcükle birlikte öğrenilir.",
      },
      {
        kind: "build",
        tr: "Sorulardan korkuyorum.",
        answer: "I'm afraid of the questions.",
        alternatives: ["I am afraid of the questions."],
        hint: "„afraid“ın edatı „of“, „worried“ınki „about“. Aynı aile, farklı edat.",
      },
      {
        kind: "build",
        tr: "İlacımı çoktan aldım.",
        answer: "I've already taken my medicine.",
        alternatives: ["I have already taken my medicine."],
        hint: "„take“in üçüncü hâli „taken“; „already“ ortada duruyor.",
      },
      {
        kind: "form",
        prompt: "Sağlık kartını doldur.",
        facts: "Ateş salıdan beri yok; soğuk algınlığı neredeyse bir hafta; iki saat sonra yorgunluk; pazartesi işe dönüş yok.",
        fields: [
          { label: "Fever", answer: "gone", accept: ["gone since Tuesday", "no"] },
          { label: "Cold", answer: "almost a week", accept: ["a week"] },
          { label: "Still", answer: "tired", accept: ["tired after two hours"] },
          { label: "Back to work", answer: "not on Monday", accept: ["no", "not yet"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u8-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 8,
    title: "Describing an apartment",
    genre: "personal",
    intro: "Evi anlat ve daireyi sor. Karşılaştırma burada betimleme işinde.",
    gloss: [
      { de: "a great view", tr: "güzel bir manzara" },
      { de: "the rent", tr: "kira" },
      { de: "furnished", tr: "mobilyalı" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Aydınlık bir dairede oturuyorum.",
        answer: "I live in a bright apartment.",
        hint: "Sıfat isimden ÖNCE geliyor ve hiç çekilmiyor.",
      },
      {
        kind: "build",
        tr: "Manzarası güzel bir balkonu var.",
        answer: "It has a balcony with a great view.",
        hint: "Ayrıntıyı „with“ ekliyor; Türkçede sıfat öbeği olan yer İngilizcede edatla kuruluyor.",
      },
      {
        kind: "build",
        tr: "Mutfağım oturma odasından daha aydınlık.",
        answer: "My kitchen is brighter than the living room.",
        hint: "„bright“ kısa: „-er“ alıyor. İki taraf „than“ ile bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Kira ne kadar?",
        answer: "How much is the rent?",
        hint: "Para sayılamaz: „how much“. „rent“ burada isim, fiil değil.",
      },
      {
        kind: "build",
        tr: "Daire mobilyalı mı?",
        answer: "Is the apartment furnished?",
        hint: "„be“ sorusu yardımcı istemiyor; fiilin kendisi başa geçiyor.",
      },
    ],
  },
];
