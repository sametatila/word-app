import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 11 — "Kıyafet, beden, renk, fiyat".
 *
 * Dört ders: Buying clothes · Size and fitting · Colours · Asking prices.
 *
 *   Kelime: shirt, try, size, expensive, buy, jacket, shoe, sweater, big,
 *           small, fitting room, try on, thin, high, low, colour, red,
 *           blue, black, white, green, yellow, gray, price, cost, cheap,
 *           pay, sell, store, lot.
 *   Kalıp:  I'm looking for a shirt. · Can I try it on? · How much is it? ·
 *           What size are you? · It's too big. · Where is the fitting room? ·
 *           It's red. · a red car · What colour is it? · How much is this? ·
 *           How much are these? · It's ten dollars.
 *
 * İki nokta bu ünitenin taşıdığı iş. Birincisi sıfatın yeri: renk isimden
 * ÖNCE gelir ve hiç çekilmez („two red cars“, „reds“ yok). İkincisi
 * „try it on“: nesne zamir olduğunda phrasal verb'in İKİ parçası arasına
 * giriyor ve başka yere konamıyor — „try on it“ yanlış.
 */
export const enA1U11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u11-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 11,
    title: "In the store",
    genre: "dialogue",
    intro: "Mağazada gömlek alınıyor. Renk, beden ve fiyat art arda geliyor.",
    gloss: [
      { de: "know", tr: "bilmek" },
      { de: "I think", tr: "bence" },
      { de: "help", tr: "yardım etmek" },
    ],
    minutes: 4,
    text:
      "Ela: Good morning. I'm looking for a shirt.\n" +
      "Seller: What colour would you like?\n" +
      "Ela: Blue or white. Not black.\n" +
      "Seller: What size are you?\n" +
      "Ela: I don't know. A big size, I think.\n" +
      "Seller: Try this blue shirt. Can I help you?\n" +
      "Ela: Where is the fitting room?\n" +
      "Seller: There, near the red jacket.\n" +
      "Ela: Thank you. It's too big. Have you got a small size?\n" +
      "Seller: Yes, here. And this yellow sweater is cheap — only ten dollars.\n" +
      "Ela: How much is the shirt?\n" +
      "Seller: Twenty dollars. The shoes are expensive: sixty dollars.\n" +
      "Ela: Then I'm going to buy the shirt and the sweater.",
    questions: [
      {
        text: "What is Ela looking for?",
        options: ["a shirt", "a jacket", "shoes"],
        answer: 0,
        explain: "„I'm looking for a shirt.“ — ceket deneme kabininin yanında duruyor.",
      },
      {
        text: "How much is the sweater?",
        options: ["ten dollars", "twenty dollars", "sixty dollars"],
        answer: 0,
        explain: "„this yellow sweater is cheap — only ten dollars“ — yirmi gömlek, altmış ayakkabı.",
      },
      {
        kind: "truefalse",
        text: "The first shirt is too big.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It's too big. Have you got a small size?“ — küçüğünü sonra istiyor.",
      },
      {
        kind: "gapfill",
        text: "Ela is looking for a blue or ___ shirt.",
        options: [],
        answer: 0,
        accept: ["white"],
        explain: "„Blue or white. Not black.“",
      },
      {
        kind: "short_answer",
        text: "What does Ela buy?",
        options: [],
        answer: 0,
        accept: ["the shirt and the sweater", "a shirt and a sweater", "shirt and sweater"],
        explain: "„Then I'm going to buy the shirt and the sweater.“ — ayakkabı çok pahalı.",
      },
    ],
  },
  {
    id: "en-a1-u11-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 11,
    title: "Big sale",
    genre: "ad",
    intro: "İndirim ilanını oku: hangi renk var, hangi fiyattan?",
    gloss: [
      { de: "clothes", tr: "giysi" },
      { de: "try on", tr: "üstünde denemek" },
      { de: "fitting room", tr: "deneme kabini" },
    ],
    minutes: 4,
    text:
      "BIG SALE — ALL COLOURS\n\n" +
      "Shirts: red, blue, white and black. Only fifteen dollars.\n" +
      "Sweaters: green, yellow and gray. Twenty dollars.\n" +
      "Jackets: black or blue. Sixty dollars — not cheap, but very good.\n" +
      "Shoes: black, white and red. From thirty dollars.\n\n" +
      "How much are these shoes? Thirty dollars. And these? Forty.\n" +
      "Is this shirt too big for you? We sell every size: small, big and thin.\n\n" +
      "Our store is open every day. The fitting room is near the shoes.\n" +
      "You can try on all our clothes. Come and buy!",
    questions: [
      {
        text: "How much is a shirt?",
        options: ["fifteen dollars", "twenty dollars", "sixty dollars"],
        answer: 0,
        explain: "„Shirts: red, blue, white and black. Only fifteen dollars.“",
      },
      {
        text: "Which colours do the jackets have?",
        options: ["black or blue", "green and yellow", "red and white"],
        answer: 0,
        explain: "„Jackets: black or blue.“ — yeşil ve sarı kazakların rengi.",
      },
      {
        kind: "truefalse",
        text: "The store is closed on Sunday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Our store is open every day.“ — her gün açık, yani pazar da.",
      },
      {
        kind: "gapfill",
        text: "The fitting room is near the ___.",
        options: [],
        answer: 0,
        accept: ["shoes"],
        explain: "„The fitting room is near the shoes.“",
      },
      {
        kind: "short_answer",
        text: "How much are these shoes?",
        options: [],
        answer: 0,
        accept: ["thirty dollars", "30 dollars", "thirty"],
        explain: "„How much are these shoes? Thirty dollars.“ — çoğulda „are“ geliyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u11-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 11,
    title: "Can I try it on?",
    genre: "dialogue",
    intro: "Ceket deneniyor. Beden ve renk iki kez değişiyor — sonuncuyu yakala.",
    gloss: [
      { de: "better", tr: "daha iyi" },
      { de: "of course", tr: "tabii ki" },
      { de: "try it on", tr: "üstünde denemek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Kaan", text: "Excuse me, how much is this jacket?" },
      { speaker: "Seller", text: "It's eighty dollars. It's a very good jacket." },
      { speaker: "Kaan", text: "Eighty! That's expensive. Have you got a cheap one?" },
      { speaker: "Seller", text: "This black jacket is forty dollars." },
      { speaker: "Kaan", text: "Can I try it on?" },
      { speaker: "Seller", text: "Of course. The fitting room is there." },
      { speaker: "Kaan", text: "It's too small. What size is it?" },
      { speaker: "Seller", text: "That is a small size. Try this one — it is big." },
      { speaker: "Kaan", text: "Better. And the colour is nice. Is it black or gray?" },
      { speaker: "Seller", text: "It's gray. Black is only in a small size now." },
      { speaker: "Kaan", text: "Good. I'm going to buy it. Can I pay by card?" },
      { speaker: "Seller", text: "Yes, of course." },
    ],
    questions: [
      {
        text: "How much is the black jacket?",
        options: ["forty dollars", "eighty dollars", "thirty dollars"],
        answer: 0,
        explain: "„This black jacket is forty dollars.“ — seksen ilk ceketin fiyatı.",
      },
      {
        text: "What colour does Kaan buy?",
        options: ["gray", "black", "blue"],
        answer: 0,
        explain: "„It's gray. Black is only in a small size now.“ — siyah olan küçük geldi.",
      },
      {
        kind: "truefalse",
        text: "The black jacket is too small for Kaan.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It's too small. What size is it?“ — büyük olan gri ceket.",
      },
      {
        kind: "gapfill",
        text: "The first jacket is ___ dollars.",
        options: [],
        answer: 0,
        accept: ["eighty", "80"],
        explain: "„It's eighty dollars.“ — bu yüzden Kaan daha ucuzunu istiyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Can I try it on?", "Can I try it on"],
        explain: "„Can I try it on?“ — zamir „it“ iki parçanın ARASINA giriyor, „try on it“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "How does Kaan pay?",
        options: [],
        answer: 0,
        accept: ["by card", "card", "with a card"],
        explain: "„Can I pay by card? — Yes, of course.“",
      },
    ],
  },
  {
    id: "en-a1-u11-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 11,
    title: "Colours",
    genre: "monologue",
    intro: "Nil renkleri anlatıyor. Hangi renk işe, hangisi hafta sonuna?",
    gloss: [
      { de: "favorite", tr: "favori" },
      { de: "wear", tr: "giymek" },
      { de: "I think", tr: "bence" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nil", text: "I like colours. My favorite is blue, but I don't buy blue shirts." },
      { speaker: "Nil", text: "Blue is a colour for the sea, I think. For work I wear white or gray." },
      { speaker: "Nil", text: "My jacket is black. My shoes are black too. That is easy in the morning." },
      { speaker: "Nil", text: "At the weekend I wear red or yellow. A red sweater is not for the office!" },
      { speaker: "Nil", text: "My sister likes green. She has a green car and a green jacket." },
      { speaker: "Nil", text: "Her shoes are white. She says: white is not a colour, it is a problem!" },
    ],
    questions: [
      {
        text: "What is Nil's favorite colour?",
        options: ["blue", "white", "green"],
        answer: 0,
        explain: "„My favorite is blue, but I don't buy blue shirts.“ — yeşil kız kardeşinin rengi.",
      },
      {
        text: "What colour does Nil wear for work?",
        options: ["white or gray", "red or yellow", "green"],
        answer: 0,
        explain: "„For work I wear white or gray.“ — kırmızı ve sarı hafta sonu için.",
      },
      {
        kind: "truefalse",
        text: "Nil buys blue shirts.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My favorite is blue, but I don't buy blue shirts.“ — seviyor ama almıyor.",
      },
      {
        kind: "gapfill",
        text: "Nil's sister has a green ___.",
        options: [],
        answer: 0,
        accept: ["car"],
        explain: "„She has a green car and a green jacket.“ — renk sıfatı isimden önce.",
      },
      {
        kind: "order",
        text: "Nil'in anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "My favorite is blue.",
          "For work I wear white or gray.",
          "At the weekend I wear red or yellow.",
          "My sister likes green.",
        ],
        explain: "Önce kendi rengi, sonra iş, sonra hafta sonu, en son kız kardeşi.",
      },
      {
        kind: "short_answer",
        text: "What colour are the sister's shoes?",
        options: [],
        answer: 0,
        accept: ["white", "they are white"],
        explain: "„Her shoes are white.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u11-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 11,
    title: "I'm looking for a shirt",
    genre: "formal",
    intro: "Mağaza cümlelerini yaz. Sonunda alışveriş formunu doldur.",
    gloss: [
      { de: "I'm looking for …", tr: "… arıyorum" },
      { de: "Can I try it on?", tr: "üstümde deneyebilir miyim" },
      { de: "Where is the fitting room?", tr: "deneme kabini nerede" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir gömlek arıyorum.",
        answer: "I'm looking for a shirt.",
        alternatives: ["I am looking for a shirt."],
        hint: "„look for“ aramak demek ve „for“ düşmez. Şu an sürdüğü için „-ing“.",
      },
      {
        kind: "build",
        tr: "Üstümde deneyebilir miyim?",
        answer: "Can I try it on?",
        hint: "Zamir „it“ iki parçanın ARASINA girer: try it on. „try on it“ yanlış.",
      },
      {
        kind: "build",
        tr: "Deneme kabini nerede?",
        answer: "Where is the fitting room?",
        hint: "Belli bir kabin olduğu için „the“. Soru sözcüğü başta.",
      },
      {
        kind: "build",
        tr: "Çok büyük.",
        answer: "It's too big.",
        alternatives: ["It is too big."],
        hint: "„too“ şikâyet taşıyor: gereğinden büyük. „very big“ şikâyet değil.",
      },
      {
        kind: "form",
        prompt: "Alışveriş formunu doldur.",
        facts: "Mavi gömlek; büyük beden; yirmi dolar; kartla ödeme.",
        fields: [
          { label: "Item", answer: "shirt", accept: ["a shirt"] },
          { label: "Colour", answer: "blue" },
          { label: "Size", answer: "big" },
          { label: "Price", answer: "twenty dollars", accept: ["20 dollars", "twenty"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u11-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 11,
    title: "What colour is it?",
    genre: "personal",
    intro: "Renk ve fiyat yaz. Renk sıfatı isimden önce gelir ve hiç çekilmez.",
    gloss: [
      { de: "What colour is it?", tr: "bu ne renk" },
      { de: "How much are these?", tr: "bunlar ne kadar" },
      { de: "a red car", tr: "kırmızı bir araba" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bunlar ne kadar?",
        answer: "How much are these?",
        hint: "Çoğulda „are“ ve „these“. Tekilde „is“ ve „this“ olurdu.",
      },
      {
        kind: "build",
        tr: "On dolar.",
        answer: "It's ten dollars.",
        alternatives: ["It is ten dollars."],
        hint: "Fiyatta özne „it“ zorunlu; sayı tek başına cümle olmaz.",
      },
      {
        kind: "build",
        tr: "Bu ne renk?",
        answer: "What colour is it?",
        hint: "„what colour“ birlikte soruyor; sonra „is it“ geliyor.",
      },
      {
        kind: "build",
        tr: "Kırmızı bir araba.",
        answer: "a red car",
        hint: "Renk isimden ÖNCE: a red car. Türkçedeki sırayla aynı, ama sıfat hiç çekilmez.",
      },
      {
        kind: "rewrite",
        prompt: "Rengi cümleye ekle: red.",
        source: "It's a car.",
        answer: "It's a red car.",
        alternatives: ["It is a red car."],
        why: "Sıfat „a“ ile isim arasına giriyor ve çoğulda bile değişmez: two red cars.",
      },
    ],
  },
];
