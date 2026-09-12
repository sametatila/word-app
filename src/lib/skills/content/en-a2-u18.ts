import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 18 — "Hediyelik eşya, gezi anlatma, davet, doğum günü".
 *
 * Dört ders: Buying souvenirs · Telling about a trip · Inviting a friend ·
 * Birthdays and gifts.
 *
 *   Kelime: souvenir, gift, choose, cheaper, wrap, give as a gift,
 *           jewelry, postcard, arrive, stay, weather, amazing, again,
 *           boat trip, wonderful, picnic, invite, join, free, sorry,
 *           maybe, invitation, with pleasure, anytime, birthday, present,
 *           surprise, celebrate, candle, sweets, hug, joke.
 *   Kalıp:  How much is this? · Do you have anything cheaper? ·
 *           Could you wrap it as a gift, please? ·
 *           We arrived on Friday evening. · We stayed there for three days. ·
 *           I want to go there again. · Would you like to come? ·
 *           Are you free on Saturday? · I'd love to, but I can't. ·
 *           Happy birthday! · This is for you. I hope you like it. ·
 *           I haven't bought a present yet.
 *
 * Ünitenin tek öğretme noktası BAŞIBOŞ „to“: „I'd love to.“ Fiil düşüyor,
 * „to“ yerinde kalıyor. Öğrencinin sezgisi ya „to“yu da atmaya ya da
 * fiili tekrar etmeye yatkın; ikisi de kulakta yanlış. Davet dersinin
 * kabul ve ret cümleleri bu biçimin doğal yuvası, o yüzden ünitenin
 * dördü de aynı yapının çevresinde duruyor.
 */
export const enA2U18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u18-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 18,
    title: "Buying souvenirs",
    genre: "dialogue",
    intro: "Altı hediye, yirmi euro. Kime ne alınıyor?",
    gloss: [
      { de: "idea", tr: "fikir" },
      { de: "Here you are", tr: "buyurun" },
      { de: "makes it", tr: "yapıyor" },
    ],
    minutes: 5,
    text:
      "Nil: Excuse me, how much is this?\n" +
      "Shop: The small one is nine euros, the big one fourteen.\n" +
      "Nil: Do you have anything cheaper? I need six gifts.\n" +
      "Shop: Six! Then look here. These postcards are one euro and this jewelry is four.\n" +
      "Nil: The jewelry is nice. Is it from here?\n" +
      "Shop: From this street, yes. A woman makes it in the house opposite.\n" +
      "Nil: Then I take four of them. And two postcards for my parents.\n" +
      "Shop: Your parents get postcards and your friends get jewelry?\n" +
      "Nil: My parents want postcards. They put them on the door.\n" +
      "Shop: Then they are right. Could I wrap them as a gift?\n" +
      "Nil: Yes, please. The four small ones — the postcards not.\n" +
      "Shop: Understood. Twenty euros for everything.\n" +
      "Nil: Here you are. And thank you for the cheaper idea.\n" +
      "Shop: Everybody asks. Not everybody listens.",
    questions: [
      {
        text: "How many gifts does Nil need?",
        options: ["six", "four", "two"],
        answer: 0,
        explain: "„Do you have anything cheaper? I need six gifts.“",
      },
      {
        text: "Who gets the postcards?",
        options: ["the parents", "the friends", "the woman"],
        answer: 0,
        explain: "„And two postcards for my parents.“ — takı arkadaşlara gidiyor.",
      },
      {
        kind: "truefalse",
        text: "The jewelry costs four euros.",
        options: ["True", "False"],
        answer: 0,
        explain: "„These postcards are one euro and this jewelry is four.“",
      },
      {
        kind: "gapfill",
        text: "Everything costs ___ euros.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„Understood. Twenty euros for everything.“",
      },
      {
        kind: "short_answer",
        text: "What does Nil ask the shop to do?",
        options: [],
        answer: 0,
        accept: ["wrap them", "wrap the jewelry", "wrap them as a gift"],
        explain: "„Could I wrap them as a gift? — Yes, please.“",
      },
    ],
  },
  {
    id: "en-a2-u18-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 18,
    title: "Telling about a trip",
    genre: "blog",
    intro: "Üç günlük gezi. İlk gün ile ikinci gün arasında ne değişiyor?",
    gloss: [
      { de: "terrible", tr: "berbat" },
      { de: "told", tr: "söyledi" },
      { de: "I'd love to", tr: "çok isterim" },
      { de: "wind", tr: "rüzgâr" },
      { de: "winter", tr: "kış" },
    ],
    minutes: 6,
    text:
      "We arrived on Friday evening and the weather was terrible. Rain, wind, and the hotel was on the wrong side of the town. I said nothing for an hour.\n" +
      "Saturday was amazing. Sun from seven, the sea warm, and a boat trip for nine euros. Nine! At home a boat trip costs that much for ten minutes.\n" +
      "We stayed there for three days. On Sunday we made a picnic next to the water. Bread, cheese, tomatoes, and a wonderful view over the sea.\n" +
      "The people there work in the summer and read in the winter. A man in the shop told me that. He said it like a plan, not like a problem.\n" +
      "I want to go there again. Not in August — in June, when the water is cold and the town is quiet.\n" +
      "My friend asked: Would you like to go next year? I said: I'd love to.",
    questions: [
      {
        text: "How was the weather on Friday?",
        options: ["terrible", "amazing", "warm"],
        answer: 0,
        explain: "„We arrived on Friday evening and the weather was terrible.“",
      },
      {
        text: "What did they do on Sunday?",
        options: ["a picnic next to the water", "a boat trip", "nothing"],
        answer: 0,
        explain: "„On Sunday we made a picnic next to the water.“ — tekne gezisi cumartesi.",
      },
      {
        kind: "truefalse",
        text: "The writer wants to go there in August.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not in August — in June, when the water is cold and the town is quiet.“",
      },
      {
        kind: "gapfill",
        text: "The boat trip cost ___ euros.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„…and a boat trip for nine euros. Nine!“",
      },
      {
        kind: "order",
        text: "Gezinin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "We arrived on Friday evening.",
          "Saturday was amazing.",
          "On Sunday we made a picnic.",
          "Would you like to go next year?",
        ],
        explain: "Üç gün sırayla, en sonda gelecek yılın sorusu.",
      },
      {
        kind: "short_answer",
        text: "What did the writer answer to the question?",
        options: [],
        answer: 0,
        accept: ["I'd love to", "I would love to", "yes"],
        explain: "„I said: I'd love to.“ — fiil düşüyor, „to“ kalıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u18-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 18,
    title: "Inviting a friend",
    genre: "dialogue",
    intro: "Doğum günü daveti. Kim geliyor, kim gelemiyor?",
    gloss: [
      { de: "guitar", tr: "gitar" },
      { de: "funny", tr: "komik" },
      { de: "yourself", tr: "kendin" },
      { de: "party", tr: "parti" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sena", text: "Are you free on Saturday?" },
      { speaker: "Can", text: "In the evening, yes. Why?" },
      { speaker: "Sena", text: "It's my birthday. Would you like to come?" },
      { speaker: "Can", text: "I'd love to. What time?" },
      { speaker: "Sena", text: "From seven. Nothing big — eight people, food, and my brother with his guitar." },
      { speaker: "Can", text: "Should I bring something?" },
      { speaker: "Sena", text: "Only yourself. And if you want to bring somebody, that is fine too." },
      { speaker: "Can", text: "Then I bring Mert. Is that all right?" },
      { speaker: "Sena", text: "With pleasure. Mert is funny." },
      { speaker: "Can", text: "What about Nil?" },
      { speaker: "Sena", text: "I invited Nil but it doesn't work. Izmir until Sunday." },
      { speaker: "Can", text: "Then we call from the party." },
      { speaker: "Sena", text: "Good idea. And you don't have to buy a present." },
      { speaker: "Can", text: "I know. I want to." },
      { speaker: "Sena", text: "Then come anytime after seven. The door is open." },
    ],
    questions: [
      {
        text: "When is the party?",
        options: ["on Saturday from seven", "on Sunday", "in the morning"],
        answer: 0,
        explain: "„It's my birthday. Would you like to come? … From seven.“",
      },
      {
        text: "Who does Can bring?",
        options: ["Mert", "Nil", "nobody"],
        answer: 0,
        explain: "„Then I bring Mert. Is that all right? — With pleasure.“",
      },
      {
        kind: "truefalse",
        text: "Nil is in Izmir until Sunday.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I invited Nil but it doesn't work. Izmir until Sunday.“",
      },
      {
        kind: "gapfill",
        text: "There are ___ people at the party.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„Nothing big — eight people, food, and my brother with his guitar.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Would you like to come?", "Would you like to come"],
        explain: "Davetin kalıbı „would you like“; sonrası „to“ + fiil.",
      },
      {
        kind: "short_answer",
        text: "What does Sena say about a present?",
        options: [],
        answer: 0,
        accept: ["don't buy a present", "no present", "nothing"],
        explain: "„And you don't have to buy a present.“ — yasak değil, gerek yok.",
      },
    ],
  },
  {
    id: "en-a2-u18-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 18,
    title: "Birthdays and gifts",
    genre: "monologue",
    intro: "Geç kalan bir hediye. Kaç ayda alınıyor?",
    gloss: [
      { de: "laughed", tr: "güldü" },
      { de: "I hope you like it", tr: "umarım beğenirsin" },
      { de: "when they come", tr: "geldiklerinde" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mert", text: "Happy birthday! This is for you. I hope you like it." },
      { speaker: "Mert", text: "Every year the same problem: what do I buy? And every year the same answer, two days too late." },
      { speaker: "Mert", text: "This year I asked in January. My sister said: a book. In March I forgot the name of the book." },
      { speaker: "Mert", text: "In May I asked again. She said: the same book. In June I bought it." },
      { speaker: "Mert", text: "And now, in September, I give it. Four candles on the cake, one for every month I waited." },
      { speaker: "Mert", text: "My sister opened it and laughed. Then she said: I haven't bought your present yet. Your birthday is in November." },
      { speaker: "Mert", text: "That is our family. Sweets, jokes, a hug, and the presents come when they come." },
      { speaker: "Mert", text: "We celebrate the day, not the paper. That is the surprise nobody buys." },
    ],
    questions: [
      {
        text: "When did Mert buy the present?",
        options: ["in June", "in January", "in September"],
        answer: 0,
        explain: "„In May I asked again. She said: the same book. In June I bought it.“",
      },
      {
        text: "How many candles are on the cake?",
        options: ["four", "one", "twelve"],
        answer: 0,
        explain: "„Four candles on the cake, one for every month I waited.“",
      },
      {
        kind: "truefalse",
        text: "The sister has bought Mert's present.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I haven't bought your present yet. Your birthday is in November.“",
      },
      {
        kind: "gapfill",
        text: "Mert's birthday is in ___.",
        options: [],
        answer: 0,
        accept: ["November"],
        explain: "„Your birthday is in November.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["This is for you. I hope you like it.", "This is for you. I hope you like it"],
        explain: "Hediye verirken iki kısa cümle; „hope“ sonrası „that“ düşüyor.",
      },
      {
        kind: "short_answer",
        text: "When is the sister's birthday?",
        options: [],
        answer: 0,
        accept: ["in September", "September", "today"],
        explain: "Mert hediyeyi eylülde veriyor ve kendi doğum günü kasımda.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u18-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 18,
    title: "Would you like to come?",
    genre: "personal",
    intro: "Davet ve cevabı. Cevapta fiil düşüyor, „to“ kalıyor.",
    gloss: [
      { de: "free", tr: "müsait" },
      { de: "I'd love to", tr: "çok isterim" },
      { de: "a present", tr: "hediye" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi boş musun?",
        answer: "Are you free on Saturday?",
        hint: "„free“ burada „müsait“ demek, „ücretsiz“ değil; gün „on“ ile.",
      },
      {
        kind: "build",
        tr: "Gelmek ister misin?",
        answer: "Would you like to come?",
        hint: "Davetin kalıbı „would you like“; „do you want“ daha sert durur.",
      },
      {
        kind: "build",
        tr: "Çok isterim ama gelemem.",
        answer: "I'd love to, but I can't.",
        alternatives: ["I would love to, but I can't."],
        hint: "Fiil düşüyor, „to“ kalıyor: „I'd love to come“ın kısası bu.",
      },
      {
        kind: "build",
        tr: "Henüz hediye almadım.",
        answer: "I haven't bought a present yet.",
        alternatives: ["I have not bought a present yet."],
        hint: "„yet“ olumsuzda ve en sonda; iş bitmedi ama bitecek.",
      },
      {
        kind: "form",
        prompt: "Davet kartını doldur.",
        facts: "Doğum günü cumartesi; saat yediden itibaren; sekiz kişi; hediye gerekmiyor.",
        fields: [
          { label: "Day", answer: "Saturday", accept: ["on Saturday"] },
          { label: "From", answer: "seven", accept: ["7", "from seven"] },
          { label: "People", answer: "eight", accept: ["8"] },
          { label: "Present", answer: "no present", accept: ["no", "nothing"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u18-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 18,
    title: "We arrived on Friday evening",
    genre: "personal",
    intro: "Gezi anlatısı ve dükkân. Kapanmış günler simple past istiyor.",
    gloss: [
      { de: "arrived", tr: "vardık" },
      { de: "stayed", tr: "kaldık" },
      { de: "wrap", tr: "paketlemek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Cuma akşamı vardık.",
        answer: "We arrived on Friday evening.",
        hint: "Belirli bir akşam: simple past, gün „on“ ile.",
      },
      {
        kind: "build",
        tr: "Orada üç gün kaldık.",
        answer: "We stayed there for three days.",
        hint: "Süre „for“ ile; kapanmış dönem olduğu için yine simple past.",
      },
      {
        kind: "build",
        tr: "Oraya yine gitmek istiyorum.",
        answer: "I want to go there again.",
        hint: "„want“ sonrası „to“ + fiil; „again“ en sonda duruyor.",
      },
      {
        kind: "build",
        tr: "Daha ucuz bir şeyiniz var mı?",
        answer: "Do you have anything cheaper?",
        hint: "Soruda „anything“; sıfat isimden SONRA geliyor.",
      },
      {
        kind: "build",
        tr: "Onu hediye paketi yapabilir misiniz, lütfen?",
        answer: "Could you wrap it as a gift, please?",
        hint: "„as“ burada „olarak“ demek; „like“ başka iş görür.",
      },
    ],
  },
];
