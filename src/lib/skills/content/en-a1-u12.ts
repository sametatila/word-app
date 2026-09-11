import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 12 — "Beğenme, iade, hediye, miktar".
 *
 * Dört ders: I like it · Exchange and return · Choosing a gift ·
 * How many, how much.
 *
 *   Kelime: like, nice, beautiful, think, choose, favorite, perfect,
 *           really, change, back, problem, help, receipt, dirty, button,
 *           keep, gift, buy, birthday, special, for, ring, chocolate,
 *           idea, many, much, a little, enough, a few, some, any, piece.
 *   Kalıp:  I like it. · It suits you. · What do you think? ·
 *           Can I exchange this? · I'd like to return this. ·
 *           Can I have my money back? · It's a gift for my mother. ·
 *           I want to buy a gift. · It's for her birthday. ·
 *           How many apples do you have? · How much water do you want? ·
 *           I don't have enough time.
 *
 * Ünitenin kuralı SAYILABİLİRLİK ve bu kez soru sözcüğünde: „how many“
 * sayılabilene, „how much“ sayılamayana. Türkçede ikisi de "kaç" ya da
 * "ne kadar" ve ayrım yok; öğrenci „how much apples“ diyor. İçerik ikisini
 * aynı egzersizde art arda kullanıyor, son görev de yanlışı doğrudan
 * düzelttiriyor.
 */
export const enA1U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u12-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 12,
    title: "A gift for my mother",
    genre: "personal",
    intro: "Doğum günü hediyesi seçiliyor. Hangi fikir neden eleniyor?",
    gloss: [
      { de: "ask", tr: "sormak" },
      { de: "a lot", tr: "çok" },
      { de: "special", tr: "özel" },
    ],
    minutes: 4,
    text:
      "Tomorrow is my mother's birthday. I want to buy a gift for her, but I don't have many ideas.\n\n" +
      "A ring is beautiful, but it is very expensive. Chocolate is cheap, but it is not special. My sister says: \"Buy a red sweater. She likes red.\"\n\n" +
      "I think that is a good idea. I am going to the store in the afternoon. I don't have much time — the store closes at six.\n\n" +
      "My sister is going to come with me. She always chooses perfect gifts. \"What do you think?\" I am going to ask her a lot!",
    questions: [
      {
        text: "What is the writer going to buy?",
        options: ["a red sweater", "a ring", "chocolate"],
        answer: 0,
        explain: "„Buy a red sweater… I think that is a good idea.“ — yüzük pahalı, çikolata özel değil.",
      },
      {
        text: "Why is the writer not going to buy a ring?",
        options: ["it is very expensive", "it is not beautiful", "the store is closed"],
        answer: 0,
        explain: "„A ring is beautiful, but it is very expensive.“ — güzel ama pahalı.",
      },
      {
        kind: "truefalse",
        text: "The writer has a lot of ideas.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I don't have many ideas.“ — sayılabilen şeyde olumsuzda „many“ geliyor.",
      },
      {
        kind: "gapfill",
        text: "The store closes at ___.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„I don't have much time — the store closes at six.“",
      },
      {
        kind: "short_answer",
        text: "Whose birthday is it?",
        options: [],
        answer: 0,
        accept: ["the mother's", "his mother's", "my mother's"],
        explain: "„Tomorrow is my mother's birthday.“ — iyelik „-'s“ ile.",
      },
    ],
  },
  {
    id: "en-a1-u12-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 12,
    title: "Can I exchange this?",
    genre: "dialogue",
    intro: "Bir kazak iade ediliyor. Değişim mi, para iadesi mi?",
    gloss: [
      { de: "see", tr: "görmek" },
      { de: "of course", tr: "tabii ki" },
      { de: "the same", tr: "aynı" },
      { de: "another", tr: "başka bir" },
      { de: "get my money back", tr: "paramı geri almak" },
    ],
    minutes: 4,
    text:
      "Ela: Good morning. Can I exchange this sweater?\n" +
      "Seller: Of course. Is there a problem?\n" +
      "Ela: Yes. There is a button here, and it is dirty. Look.\n" +
      "Seller: I see. Have you got the receipt?\n" +
      "Ela: Yes, here it is. I keep all my receipts.\n" +
      "Seller: Good. Would you like the same sweater in another colour?\n" +
      "Ela: I'd like to return this and get my money back.\n" +
      "Seller: No problem. How much did you pay?\n" +
      "Ela: Thirty dollars.\n" +
      "Seller: Here is your money. I am really sorry.\n" +
      "Ela: Thank you. It's not a big problem.\n" +
      "Seller: Can I help you with anything else?\n" +
      "Ela: No, thank you. Have a good day!",
    questions: [
      {
        text: "What is the problem with the sweater?",
        options: ["a button is dirty", "it is too small", "it is expensive"],
        answer: 0,
        explain: "„There is a button here, and it is dirty.“",
      },
      {
        text: "What does Ela want?",
        options: ["her money back", "another colour", "a second receipt"],
        answer: 0,
        explain: "„I'd like to return this and get my money back.“ — satıcı renk öneriyor, Ela istemiyor.",
      },
      {
        kind: "truefalse",
        text: "Ela doesn't have the receipt.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Yes, here it is. I keep all my receipts.“",
      },
      {
        kind: "gapfill",
        text: "Ela paid ___ dollars.",
        options: [],
        answer: 0,
        accept: ["thirty", "30"],
        explain: "„How much did you pay? — Thirty dollars.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Can I exchange this sweater?",
          "Have you got the receipt?",
          "I'd like to return this.",
          "Here is your money.",
        ],
        explain: "Önce istek, sonra fiş, sonra karar, en son para. İade hep bu sırayla gidiyor.",
      },
      {
        kind: "short_answer",
        text: "How much money does Ela get back?",
        options: [],
        answer: 0,
        accept: ["thirty dollars", "30 dollars", "thirty"],
        explain: "Ödediği kadar: „Thirty dollars… Here is your money.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u12-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 12,
    title: "What do you think?",
    genre: "dialogue",
    intro: "Bir ceket üzerine fikir soruluyor. Beğeni cümleleri art arda geliyor.",
    gloss: [
      { de: "wear", tr: "giymek" },
      { de: "It suits you", tr: "sana yakışıyor" },
      { de: "a lot of", tr: "bir sürü" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Sena", text: "Look at this jacket. What do you think?" },
      { speaker: "Ali", text: "I like it. The colour is beautiful." },
      { speaker: "Sena", text: "Really? It's not too big?" },
      { speaker: "Ali", text: "No, it suits you. It is perfect." },
      { speaker: "Sena", text: "How much is it? Ninety dollars. That is a lot of money." },
      { speaker: "Ali", text: "Yes, but you are going to wear it every day." },
      { speaker: "Sena", text: "I think you are right. And I have enough money today." },
      { speaker: "Ali", text: "Then buy it! You don't have many jackets." },
      { speaker: "Sena", text: "Only two, and both are black. This one is blue." },
      { speaker: "Ali", text: "Blue is my favorite colour." },
      { speaker: "Sena", text: "Good. Then I am going to choose this one." },
    ],
    questions: [
      {
        text: "What does Ali think about the jacket?",
        options: ["it suits her", "it is too big", "it is too expensive"],
        answer: 0,
        explain: "„No, it suits you. It is perfect.“ — büyük olmadığını da söylüyor.",
      },
      {
        text: "How much is the jacket?",
        options: ["ninety dollars", "two dollars", "thirty dollars"],
        answer: 0,
        explain: "„How much is it? Ninety dollars.“ — iki, Sena'nın ceket sayısı.",
      },
      {
        kind: "truefalse",
        text: "Sena has many jackets.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You don't have many jackets. — Only two.“",
      },
      {
        kind: "gapfill",
        text: "Sena's two jackets are ___.",
        options: [],
        answer: 0,
        accept: ["black"],
        explain: "„Only two, and both are black.“ — yenisi mavi.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What do you think?", "What do you think"],
        explain: "„What do you think?“ — fikir sorusu „do“ ile; „how“ ile değil.",
      },
      {
        kind: "short_answer",
        text: "What colour is this jacket?",
        options: [],
        answer: 0,
        accept: ["blue", "it is blue"],
        explain: "„This one is blue.“",
      },
    ],
  },
  {
    id: "en-a1-u12-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 12,
    title: "How many, how much",
    genre: "monologue",
    intro: "Kaan yemek için miktar hesaplıyor. Hangi şey sayılabiliyor, hangisi sayılamıyor?",
    gloss: [
      { de: "need", tr: "ihtiyacı olmak" },
      { de: "a piece of", tr: "bir parça" },
      { de: "not many", tr: "çok değil" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Kaan", text: "Today I am going to cook for six people. How much time do I have? Two hours." },
      { speaker: "Kaan", text: "How many potatoes do I need? A kilo. And how much water? Two liters." },
      { speaker: "Kaan", text: "I have a few onions, but not many. I am going to buy some." },
      { speaker: "Kaan", text: "I don't have enough cheese. A little is not enough for six people." },
      { speaker: "Kaan", text: "I have a piece of chocolate for after dinner. Only one piece!" },
      { speaker: "Kaan", text: "I don't have much money today, but this dinner is cheap. That is perfect." },
    ],
    questions: [
      {
        text: "How many people is Kaan going to cook for?",
        options: ["six", "two", "one"],
        answer: 0,
        explain: "„Today I am going to cook for six people.“ — iki saatin ve litrenin sayısı.",
      },
      {
        text: "What does Kaan not have enough of?",
        options: ["cheese", "potatoes", "time"],
        answer: 0,
        explain: "„I don't have enough cheese.“ — patates bir kilo, zaman iki saat.",
      },
      {
        kind: "truefalse",
        text: "Kaan has many onions.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have a few onions, but not many.“ — „a few“ birkaç demek, çok değil.",
      },
      {
        kind: "gapfill",
        text: "Kaan needs a ___ of potatoes.",
        options: [],
        answer: 0,
        accept: ["kilo"],
        explain: "„How many potatoes do I need? A kilo.“",
      },
      {
        kind: "order",
        text: "Kaan'ın saydığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "How much time do I have?",
          "How many potatoes do I need?",
          "I don't have enough cheese.",
          "I don't have much money today.",
        ],
        explain: "Önce zaman, sonra patates, sonra peynir, en son para. Sayılamayan ile sayılabilen birbirini izliyor.",
      },
      {
        kind: "short_answer",
        text: "How much time does Kaan have?",
        options: [],
        answer: 0,
        accept: ["two hours", "2 hours", "two"],
        explain: "„How much time do I have? Two hours.“ — „time“ sayılamaz, o yüzden „how much“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u12-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 12,
    title: "I like it",
    genre: "personal",
    intro: "Beğeni ve iade cümlelerini yaz. Sonunda iade formunu doldur.",
    gloss: [
      { de: "It suits you.", tr: "sana yakışıyor" },
      { de: "What do you think?", tr: "ne düşünüyorsun" },
      { de: "Can I exchange this?", tr: "bunu değiştirebilir miyim" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Beğendim.",
        answer: "I like it.",
        hint: "Nesne „it“ zorunlu: İngilizcede fiil nesnesiz kalmaz.",
      },
      {
        kind: "build",
        tr: "Sana yakışıyor.",
        answer: "It suits you.",
        hint: "Özne giysinin kendisi: „it suits you“, „you suit it“ değil.",
      },
      {
        kind: "build",
        tr: "Ne düşünüyorsun?",
        answer: "What do you think?",
        hint: "Fikir sorusu „do“ ile ve „think“ eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "Bunu değiştirebilir miyim?",
        answer: "Can I exchange this?",
        hint: "„exchange“ malı malla değiştirmek; para iadesi „return“ ile olur.",
      },
      {
        kind: "form",
        prompt: "İade formunu doldur.",
        facts: "Kazak; kırmızı; otuz dolar; düğmesi kirli.",
        fields: [
          { label: "Item", answer: "sweater", accept: ["a sweater"] },
          { label: "Colour", answer: "red" },
          { label: "Price", answer: "thirty dollars", accept: ["30 dollars", "thirty"] },
          { label: "Problem", answer: "dirty button", accept: ["a dirty button", "the button is dirty"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u12-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 12,
    title: "How many, how much",
    genre: "personal",
    intro: "Miktar sorularını yaz. Sayılabilene „how many“, sayılamayana „how much“.",
    gloss: [
      { de: "How many …?", tr: "kaç tane …" },
      { de: "How much …?", tr: "ne kadar …" },
      { de: "enough", tr: "yeterince" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Kaç elman var?",
        answer: "How many apples do you have?",
        hint: "„apple“ sayılabilir, o yüzden „how many“ ve çoğul: apples.",
      },
      {
        kind: "build",
        tr: "Ne kadar su istiyorsun?",
        answer: "How much water do you want?",
        hint: "„water“ sayılamaz: „how much“ ve tekil, „waters“ olmaz.",
      },
      {
        kind: "build",
        tr: "Yeterince vaktim yok.",
        answer: "I don't have enough time.",
        hint: "„enough“ isimden ÖNCE gelir: enough time. Sıfattan sonra gelirdi: good enough.",
      },
      {
        kind: "build",
        tr: "Bu annem için bir hediye.",
        answer: "It's a gift for my mother.",
        alternatives: ["It is a gift for my mother."],
        hint: "Kime olduğu „for“ ile: a gift for my mother, for her birthday.",
      },
      {
        kind: "rewrite",
        prompt: "Yanlışı düzelt: „many“ mi „much“ mu?",
        source: "How much apples do you have?",
        answer: "How many apples do you have?",
        why: "„apple“ sayılabilir, o yüzden „many“. Sayılamayanda „much“: how much water.",
      },
    ],
  },
];
