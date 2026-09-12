import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 20 — "Yakın arkadaşlar, aile ilişkileri, partide sohbet, teşekkür".
 *
 * Dört ders: Close friends · Family and relationships · Small talk at a party ·
 * Saying thank you.
 *
 *   Kelime: close, together, trust, share, laugh, friendship, make friends,
 *           with each other, relative, couple, engaged, marry, divorce,
 *           divorced, single, grandchild, party, meet, know, enjoy, drink,
 *           chat, guy, by the way, thank, kind, welcome, help, note,
 *           helpful, respect, care.
 *   Kalıp:  She is a close friend of mine. ·
 *           We have been friends for ten years. · We met at school. ·
 *           They got married in 2015. ·
 *           They have been married for ten years. ·
 *           My cousin is going to get engaged next month. ·
 *           Nice to meet you. · How do you know …? ·
 *           Have you been here before? · Thank you for your help. ·
 *           Thanks for helping me. · You're welcome.
 *
 * Ünitenin tek öğretme noktası „for“DAN SONRA NE GELDİĞİ: isim de gelir
 * („thank you for your help“), fiilin „-ing“ biçimi de gelir („thanks for
 * helping me“) — ama mastar ASLA gelmez. Ünite 17 „-ing“i öneri
 * kalıplarında göstermişti; burada aynı biçim bir edattan sonra çıkıyor ve
 * kural genelleşiyor: edattan sonra fiil hep „-ing“ olur.
 */
export const enA2U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u20-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 20,
    title: "Close friends",
    genre: "story",
    intro: "On yıllık bir arkadaşlık. Ne zaman yakın oldular?",
    gloss: [
      { de: "except", tr: "dışında" },
      { de: "At first", tr: "ilk başta" },
      { de: "what friendship is", tr: "arkadaşlığın ne olduğu" },
    ],
    minutes: 6,
    text:
      "We have been friends for ten years. We met at school, in a corridor, both late for the same class.\n" +
      "At first we were not close. She was loud, I was quiet, and we shared nothing except the bus.\n" +
      "Then in the second year my father was ill for four months. She came every Friday with bread from her mother and sat with me. We did not talk about it. We watched films and laughed at bad jokes.\n" +
      "That is when I learned what friendship is. Not the big words — the Friday.\n" +
      "Now we live in two cities. We call every week and we see each other four times a year. It is enough.\n" +
      "Thank you for those Fridays, I said last year. She said: Thanks for opening the door.",
    questions: [
      {
        text: "Where did they meet?",
        options: ["at school", "on the bus", "in two cities"],
        answer: 0,
        explain: "„We met at school, in a corridor, both late for the same class.“",
      },
      {
        text: "What did the friend bring every Friday?",
        options: ["bread", "films", "jokes"],
        answer: 0,
        explain: "„She came every Friday with bread from her mother and sat with me.“",
      },
      {
        kind: "truefalse",
        text: "They were not close at first.",
        options: ["True", "False"],
        answer: 0,
        explain: "„At first we were not close. She was loud, I was quiet…“",
      },
      {
        kind: "gapfill",
        text: "They have been friends for ___ years.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„We have been friends for ten years.“",
      },
      {
        kind: "short_answer",
        text: "How often do they see each other now?",
        options: [],
        answer: 0,
        accept: ["four times a year", "4 times a year", "four times"],
        explain: "„We call every week and we see each other four times a year.“",
      },
    ],
  },
  {
    id: "en-a2-u20-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 20,
    title: "Family and relationships",
    genre: "dialogue",
    intro: "Bir fotoğraf, bir aile. Kim kimin nesi?",
    gloss: [
      { de: "husband", tr: "koca" },
      { de: "aunt", tr: "teyze" },
      { de: "two ways of", tr: "iki ayrı yolu" },
      { de: "grandchildren", tr: "torunlar" },
    ],
    minutes: 6,
    text:
      "Mert: Is that your sister in the photo?\n" +
      "Nil: My cousin. She got married in 2015.\n" +
      "Mert: And the man next to her?\n" +
      "Nil: Her husband. They have been married for ten years — no, nine. I always say ten.\n" +
      "Mert: And the little one?\n" +
      "Nil: Their daughter. My aunt's first grandchild. She was born in the same month as my brother's son.\n" +
      "Mert: So your aunt got two grandchildren in one month.\n" +
      "Nil: In three weeks. She did not sleep that year.\n" +
      "Mert: My family is smaller. My parents divorced when I was six and I have one relative in this city.\n" +
      "Nil: Is that hard?\n" +
      "Mert: It was. Now it is normal. Two houses, two kitchens, two ways of cooking rice.\n" +
      "Nil: And you? Single?\n" +
      "Mert: Engaged. Since March.\n" +
      "Nil: Congratulations! Why is that not the first thing you say?\n" +
      "Mert: Because you asked about the photo.",
    questions: [
      {
        text: "Who is in the photo?",
        options: ["the cousin", "the sister", "the aunt"],
        answer: 0,
        explain: "„Is that your sister in the photo? — My cousin.“",
      },
      {
        text: "How long have the couple been married?",
        options: ["nine years", "ten years", "six years"],
        answer: 0,
        explain: "„They have been married for ten years — no, nine. I always say ten.“",
      },
      {
        kind: "truefalse",
        text: "Mert has a big family in this city.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My family is smaller … I have one relative in this city.“",
      },
      {
        kind: "gapfill",
        text: "Mert has been engaged since ___.",
        options: [],
        answer: 0,
        accept: ["March"],
        explain: "„Engaged. Since March.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Is that your sister in the photo?",
          "They have been married for ten years.",
          "My parents divorced when I was six.",
          "Engaged. Since March.",
        ],
        explain: "Önce fotoğraf, sonra kuzenin evliliği, sonra Mert'in ailesi, en son Mert'in haberi.",
      },
      {
        kind: "short_answer",
        text: "How old was Mert when the parents divorced?",
        options: [],
        answer: 0,
        accept: ["six", "6", "six years old"],
        explain: "„My parents divorced when I was six…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u20-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 20,
    title: "Small talk at a party",
    genre: "dialogue",
    intro: "Partide ilk konuşma. Kim kimi nereden tanıyor?",
    gloss: [
      { de: "the rest", tr: "kalanı" },
      { de: "Nobody says it", tr: "kimse söylemiyor" },
      { de: "stop thinking", tr: "düşünmeyi bırakmak" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Sena", text: "Hi. Nice to meet you. I'm Sena." },
      { speaker: "Can", text: "Can. Nice to meet you too. How do you know Nil?" },
      { speaker: "Sena", text: "We work together. Four years now. And you?" },
      { speaker: "Can", text: "School. We were in the same class and we still have the same jokes." },
      { speaker: "Sena", text: "Have you been here before?" },
      { speaker: "Can", text: "To this flat, yes. To a party here, no. Nil doesn't like parties." },
      { speaker: "Sena", text: "Nil told me. Nil said: eight people is a party, nine is a problem." },
      { speaker: "Can", text: "We are eleven." },
      { speaker: "Sena", text: "Then it is too many. Is the food from Nil's mother?" },
      { speaker: "Can", text: "The bread, yes. The rest is from the shop and everybody knows." },
      { speaker: "Sena", text: "Nobody says it." },
      { speaker: "Can", text: "That is the tradition. Thanks for not saying it." },
      { speaker: "Sena", text: "Thank you for telling me. Now I can't stop thinking about it." },
    ],
    questions: [
      {
        text: "How does Sena know Nil?",
        options: ["they work together", "from school", "from a party"],
        answer: 0,
        explain: "„We work together. Four years now.“ — okul Can'ın yolu.",
      },
      {
        text: "How many people are at the party?",
        options: ["eleven", "eight", "nine"],
        answer: 0,
        explain: "„We are eleven.“",
      },
      {
        kind: "truefalse",
        text: "Only the bread is from Nil's mother.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The bread, yes. The rest is from the shop and everybody knows.“",
      },
      {
        kind: "gapfill",
        text: "Sena and Nil have worked together for ___ years.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„We work together. Four years now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Have you been here before?", "Have you been here before"],
        explain: "Deneyim sorusu; „before“ en sonda.",
      },
      {
        kind: "short_answer",
        text: "Where is most of the food from?",
        options: [],
        answer: 0,
        accept: ["from the shop", "the shop"],
        explain: "„The rest is from the shop and everybody knows.“",
      },
    ],
  },
  {
    id: "en-a2-u20-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 20,
    title: "Saying thank you",
    genre: "monologue",
    intro: "Dört sözcüğün işi. Neden kâğıt, neden ayrıntı?",
    gloss: [
      { de: "that person", tr: "o kişi" },
      { de: "half", tr: "yarısı" },
      { de: "on paper", tr: "kâğıt üstünde" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "Thank you for your help. Four words, and most people never say them at work." },
      { speaker: "Nil", text: "Last month a colleague stayed two hours after five for my report. I wrote a note the next morning." },
      { speaker: "Nil", text: "Not an email. A note, on paper, on the desk. It took four minutes." },
      { speaker: "Nil", text: "Three weeks later that person helped me again, before I asked." },
      { speaker: "Nil", text: "I don't think that is luck. Thanks for helping me is a sentence people remember." },
      { speaker: "Nil", text: "My grandmother said: respect costs nothing and buys everything. She was right about the second half." },
      { speaker: "Nil", text: "There is one rule. Say what the help was. Thank you for your help is fine. Thank you for the Tuesday report is better." },
      { speaker: "Nil", text: "And when somebody thanks you, the answer is two words: You're welcome. Not it was nothing. It was something." },
    ],
    questions: [
      {
        text: "What did Nil write?",
        options: ["a note on paper", "an email", "a report"],
        answer: 0,
        explain: "„Not an email. A note, on paper, on the desk. It took four minutes.“",
      },
      {
        text: "What is better than „Thank you for your help“?",
        options: ["saying what the help was", "saying it twice", "sending an email"],
        answer: 0,
        explain: "„Say what the help was … Thank you for the Tuesday report is better.“",
      },
      {
        kind: "truefalse",
        text: "Nil thinks it was luck.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I don't think that is luck.“",
      },
      {
        kind: "gapfill",
        text: "The note took ___ minutes.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„A note, on paper, on the desk. It took four minutes.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Thank you for your help.", "Thank you for your help"],
        explain: "„for“ sonrası isim geliyor; fiil gelseydi „-ing“ olurdu.",
      },
      {
        kind: "short_answer",
        text: "What is the answer when somebody thanks you?",
        options: [],
        answer: 0,
        accept: ["you're welcome", "you are welcome", "welcome"],
        explain: "„…the answer is two words: You're welcome.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u20-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 20,
    title: "Thank you for your help",
    genre: "personal",
    intro: "Aynı edat, iki ayrı devam. İsim de olur, „-ing“ de — mastar olmaz.",
    gloss: [
      { de: "Thank you for", tr: "için teşekkürler" },
      { de: "helping me", tr: "bana yardım etmen" },
      { de: "of mine", tr: "benim" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yardımın için teşekkürler.",
        answer: "Thank you for your help.",
        hint: "„for“ sonrası isim geliyor: „your help“.",
      },
      {
        kind: "build",
        tr: "Bana yardım ettiğin için teşekkürler.",
        answer: "Thanks for helping me.",
        hint: "Aynı „for“ bu kez fiil alıyor ve fiil „-ing“ biçimine giriyor; mastar olmaz.",
      },
      {
        kind: "build",
        tr: "Rica ederim.",
        answer: "You're welcome.",
        alternatives: ["You are welcome."],
        hint: "İki sözcük; „it was nothing“ İngilizcede alışılmış cevap değil.",
      },
      {
        kind: "build",
        tr: "O benim yakın bir arkadaşım.",
        answer: "She is a close friend of mine.",
        hint: "„of mine“ kalıbı: „arkadaşlarımdan biri“ demek; „of me“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Arkadaşlık kartını doldur.",
        facts: "On yıldır arkadaşlar; okulda tanıştılar; şimdi iki ayrı şehirde; yılda dört kez görüşüyorlar.",
        fields: [
          { label: "Friends for", answer: "ten years", accept: ["10 years"] },
          { label: "Met", answer: "at school", accept: ["school"] },
          { label: "Now", answer: "in two cities", accept: ["two cities"] },
          { label: "See each other", answer: "four times a year", accept: ["4 times a year"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u20-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 20,
    title: "We have been friends for ten years",
    genre: "personal",
    intro: "Aynı fiil, iki ayrı iş: „got married“ o an, „have been married“ bugün.",
    gloss: [
      { de: "got married", tr: "evlendiler" },
      { de: "have been married", tr: "evliler" },
      { de: "been here before", tr: "daha önce burada" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "On yıldır arkadaşız.",
        answer: "We have been friends for ten years.",
        alternatives: ["We've been friends for ten years."],
        hint: "Hâlâ sürüyor: „for“ ile present perfect.",
      },
      {
        kind: "build",
        tr: "Okulda tanıştık.",
        answer: "We met at school.",
        hint: "Kapanmış bir an: simple past. „meet“in geçmişi „met“.",
      },
      {
        kind: "build",
        tr: "2015'te evlendiler.",
        answer: "They got married in 2015.",
        hint: "„get married“ evlenme ANI; yıl verildiği için simple past.",
      },
      {
        kind: "build",
        tr: "On yıldır evliler.",
        answer: "They have been married for ten years.",
        alternatives: ["They've been married for ten years."],
        hint: "Burada durum anlatılıyor, o yüzden „been“; „got“ olsaydı o günü söylerdi.",
      },
      {
        kind: "build",
        tr: "Daha önce burada bulundun mu?",
        answer: "Have you been here before?",
        hint: "Deneyim sorusu; „before“ en sonda duruyor.",
      },
    ],
  },
];
