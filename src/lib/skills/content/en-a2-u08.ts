import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 8 — "His, iyileşme, ev arama, evi anlatmak".
 *
 * Dört ders: How are you feeling? · Getting better · Looking for a flat ·
 * My home.
 *
 *   Kelime: worried, stressed, relaxed, afraid, better, feeling,
 *           be afraid, disappointed, recover, almost, still, already,
 *           normal, health, step by step, breathe, flat, rent, deposit,
 *           furnished, floor, ground floor, advert, old building, bright,
 *           quiet, spacious, balcony, view, ceiling, curtain, comfortable.
 *   Kalıp:  I feel … · I'm worried about … · Are you OK? ·
 *           I've already taken my medicine. · I'm still tired. ·
 *           I've had a cold for three days. · How much is the rent? ·
 *           Is the flat furnished? · Can I see it on Saturday? ·
 *           I live in a bright flat. ·
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
    title: "Are you OK?",
    genre: "dialogue",
    intro: "Mülakat öncesi. Kim neyden endişeli, kim neyden korkuyor?",
    gloss: [
      { de: "interview", tr: "mülakat" },
      { de: "experience", tr: "deneyim" },
      { de: "half", tr: "yarısı" },
      { de: "company", tr: "şirket" },
    ],
    minutes: 5,
    text:
      "Nil: Are you OK? You look worried.\n" +
      "Can: I am. I have a job interview on Thursday and I'm afraid of the questions.\n" +
      "Nil: Which questions?\n" +
      "Can: The last time they asked me about my old job and I said nothing good. I was so stressed.\n" +
      "Nil: And what happened?\n" +
      "Can: They said no. I was disappointed for a week.\n" +
      "Nil: This time you are better. You know the company and you have more experience.\n" +
      "Can: Maybe. But I'm worried about the money question. What do I say?\n" +
      "Nil: Say a number, not a story. And breathe before you answer.\n" +
      "Can: You are always so relaxed. How do you do it?\n" +
      "Nil: I am not relaxed. I only look relaxed. That is half of the work.\n" +
      "Can: Then I will learn that too.\n" +
      "Nil: Call me on Thursday evening. I want to hear everything.",
    questions: [
      {
        text: "What is Can afraid of?",
        options: ["the questions", "the money", "Thursday"],
        answer: 0,
        explain: "„I'm afraid of the questions.“ — para sorusu ayrı, orada „worried about“ diyor.",
      },
      {
        text: "What does Nil say about the money question?",
        options: ["say a number", "say a story", "say nothing"],
        answer: 0,
        explain: "„Say a number, not a story.“",
      },
      {
        kind: "truefalse",
        text: "Nil only looks relaxed.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I am not relaxed. I only look relaxed.“",
      },
      {
        kind: "gapfill",
        text: "Can was disappointed for a ___.",
        options: [],
        answer: 0,
        accept: ["week"],
        explain: "„They said no. I was disappointed for a week.“",
      },
      {
        kind: "short_answer",
        text: "When should Can call Nil?",
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
    title: "Four flats in two weeks",
    genre: "story",
    intro: "Dört daire, dört kusur. Sonunda seçilen en güzeli değil.",
    gloss: [
      { de: "dark", tr: "karanlık" },
      { de: "high", tr: "yüksek" },
      { de: "neighbours", tr: "komşular" },
      { de: "fourth", tr: "dördüncü" },
    ],
    minutes: 6,
    text:
      "We looked at four flats in two weeks. The first one was cheap, but it was on the ground floor and very dark.\n" +
      "The second had a beautiful balcony, but the rent was eight hundred euros. Too much for us.\n" +
      "The third one was in an old building. The rooms were spacious and bright, the ceiling was high.\n" +
      "But the advert said „furnished“ and there was only a bed and a table.\n" +
      "The fourth flat was small. The rooms were normal and the kitchen was old.\n" +
      "But it was quiet, the neighbours were friendly and the deposit was only one month.\n" +
      "We took the fourth. My sister asked: Why the small one?\n" +
      "I said: Because I sleep there. In the first one I would never sleep — the street is under the window.\n" +
      "We have been here since March and I am happy. The flat is smaller than my old one, but my life is bigger.",
    questions: [
      {
        text: "Why didn't they take the second flat?",
        options: ["the rent was too high", "it was dark", "it was small"],
        answer: 0,
        explain: "„…but the rent was eight hundred euros. Too much for us.“",
      },
      {
        text: "What was the problem with the third flat?",
        options: ["it was not really furnished", "the ceiling was low", "it was on the ground floor"],
        answer: 0,
        explain: "„…the advert said „furnished“ and there was only a bed and a table.“",
      },
      {
        kind: "truefalse",
        text: "The third flat was in a new building.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The third one was in an old building.“",
      },
      {
        kind: "gapfill",
        text: "The deposit for the fourth flat was ___ month.",
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
          "cheap and dark, on the ground floor",
          "a beautiful balcony, eight hundred euros",
          "spacious and bright, but not really furnished",
          "small and quiet, with friendly neighbours",
        ],
        explain: "Metin birinciden dördüncüye doğru gidiyor; alınan sonuncusu.",
      },
      {
        kind: "short_answer",
        text: "Why did the writer take the small flat?",
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
    title: "Getting better",
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
      { speaker: "Deniz", text: "How are you feeling today?" },
      { speaker: "Ela", text: "Better, thank you. I've already taken my medicine." },
      { speaker: "Deniz", text: "And the fever?" },
      { speaker: "Ela", text: "Gone since Tuesday. But I'm still tired after two hours." },
      { speaker: "Deniz", text: "That is normal. You've had a cold for three days." },
      { speaker: "Ela", text: "Almost a week. It started on Friday." },
      { speaker: "Deniz", text: "Then go step by step. Don't go back to work on Monday." },
      { speaker: "Ela", text: "My boss called this morning." },
      { speaker: "Deniz", text: "And?" },
      { speaker: "Ela", text: "He was kind. He said: Your health first, the work waits." },
      { speaker: "Deniz", text: "A good boss. Can you breathe normally now?" },
      { speaker: "Ela", text: "Yes, that is the best part. Last week the stairs were a problem." },
      { speaker: "Deniz", text: "You will recover. But slowly." },
      { speaker: "Ela", text: "I know. I have already learned one thing: the body decides, not me." },
    ],
    questions: [
      {
        text: "When did the fever go?",
        options: ["on Tuesday", "on Friday", "on Monday"],
        answer: 0,
        explain: "„Gone since Tuesday.“ — cuma soğuk algınlığının başlangıcı.",
      },
      {
        text: "What did the boss say?",
        options: ["health first", "come on Monday", "work first"],
        answer: 0,
        explain: "„Your health first, the work waits.“",
      },
      {
        kind: "truefalse",
        text: "Ela has had the cold for almost a week.",
        options: ["True", "False"],
        answer: 0,
        explain: "Deniz üç gün diyor, Ela düzeltiyor: „Almost a week. It started on Friday.“",
      },
      {
        kind: "gapfill",
        text: "Ela is still ___ after two hours.",
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
        text: "What is the best part for Ela now?",
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
    title: "My home",
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
      { speaker: "Mert", text: "I live in a bright flat on the third floor of an old building." },
      { speaker: "Mert", text: "It is not big, but it is spacious — two rooms, a kitchen and a small room for my books." },
      { speaker: "Mert", text: "The best part is the balcony. It has a view of the park and in summer I eat there every evening." },
      { speaker: "Mert", text: "My kitchen is brighter than the living room. The window there is bigger." },
      { speaker: "Mert", text: "The living room is more comfortable. There is an old chair from my grandmother." },
      { speaker: "Mert", text: "I don't like the ceiling. It is very high and in winter the room is cold." },
      { speaker: "Mert", text: "The curtains are new. Before that the sun came in at five." },
      { speaker: "Mert", text: "It is quiet here. Only on Saturday my neighbours have a party — and then I go to the balcony." },
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
        text: "Mert lives on the ground floor.",
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
        explain: "„The curtains are new. Before that the sun came in at five.“",
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
    title: "I'm worried about the exam",
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
        hint: "„feel“ sonrası sıfat geliyor, zarf değil: „better“, „well“ değil.",
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
    title: "I live in a bright flat",
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
        answer: "I live in a bright flat.",
        hint: "Sıfat isimden ÖNCE geliyor ve hiç çekilmiyor.",
      },
      {
        kind: "build",
        tr: "Manzarası güzel bir balkonu var.",
        answer: "It has a balcony with a great view.",
        hint: "Ayrıntıyı „with“ ekliyor; Türkçede sıfat-fiil olan yer İngilizcede edat.",
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
        answer: "Is the flat furnished?",
        hint: "„be“ sorusu yardımcı istemiyor; fiilin kendisi başa geçiyor.",
      },
    ],
  },
];
