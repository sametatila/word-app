import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 7 — "Yemek, market, pişirme, içecek".
 *
 * Dört ders: Favourite food · At the market · Cooking together · Drinks.
 *
 *   Kelime: food, love, hate, prefer, taste, sweet, meat, pizza, market,
 *           cheap, expensive, kilo, cost, sale, gram, supermarket, cook,
 *           cut, wash, hot, ready, rice, onion, warm, water, tea, coffee,
 *           juice, milk, beer, wine, bottle.
 *   Kalıp:  I like eating pizza. · I prefer tea to coffee. ·
 *           Do you like cooking? · How much is it? ·
 *           How many apples do you want? · It's too expensive. ·
 *           First …, then …, after that … · Cut the tomatoes. ·
 *           Don't touch it. · I'd like a coffee, please. ·
 *           Would you like some tea? · Yes, please. / No, thank you.
 *
 * Ünitenin ayırt edici zorluğu FİİLDEN SONRA GELEN FİİL: „I like eating“,
 * „Do you like cooking?“ — sevmek fiilinden sonra ikinci fiil „-ing“
 * alıyor. Türkçede orada mastar var ("yemeyi sevmek") ve öğrenci „I like
 * to eat“ ya da „I like eat“ diyor. İçerik kalıbı üç ayrı egzersizde
 * tekrarlıyor.
 */
export const enA1U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u7-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 7,
    title: "The food I love",
    genre: "personal",
    intro: "Biri sevdiği ve sevmediği yemekleri anlatıyor. Kim neyi tercih ediyor?",
    gloss: [
      { de: "drink", tr: "içmek" },
      { de: "big", tr: "büyük" },
      { de: "prefer … to …", tr: "… yerine …'i tercih etmek" },
      { de: "In a sale", tr: "indirimde" },
    ],
    minutes: 4,
    text:
      "I love food. I cook every day, and I like eating with my family.\n\n" +
      "The food I love most is pizza with meat and onion. I don't like sweet food — I hate very sweet cakes! My sister prefers rice. She says rice is cheap and easy.\n\n" +
      "At the market I buy meat, onions and rice. The meat is expensive: nine euros a kilo. In a sale it is cheaper.\n\n" +
      "I prefer tea to coffee. In the morning I drink a big cup of tea with milk. My father drinks only water. He says: \"Don't cook with wine!\"",
    questions: [
      {
        text: "What food does the writer love most?",
        options: ["pizza with meat and onion", "rice", "sweet cakes"],
        answer: 0,
        explain: "„The food I love most is pizza with meat and onion.“ — pirinci kız kardeş tercih ediyor.",
      },
      {
        text: "How much is the meat?",
        options: ["nine euros a kilo", "nine euros a gram", "two euros a kilo"],
        answer: 0,
        explain: "„The meat is expensive: nine euros a kilo.“ İndirimde daha ucuz oluyor.",
      },
      {
        kind: "truefalse",
        text: "The writer likes sweet food.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I don't like sweet food — I hate very sweet cakes!“ — „hate“ en güçlü olumsuz.",
      },
      {
        kind: "gapfill",
        text: "The writer prefers tea to ___.",
        options: [],
        answer: 0,
        accept: ["coffee"],
        explain: "„I prefer tea to coffee.“ — tercih edilen önce, ötekisi „to“dan sonra.",
      },
      {
        kind: "short_answer",
        text: "What does the father drink?",
        options: [],
        answer: 0,
        accept: ["water", "only water"],
        explain: "„My father drinks only water.“",
      },
    ],
  },
  {
    id: "en-a1-u7-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 7,
    title: "At the market",
    genre: "dialogue",
    intro: "Pazarda pazarlık. Kilo, gram ve fiyat art arda geliyor — sayıları takip et.",
    gloss: [
      { de: "fresh", tr: "taze" },
      { de: "farm", tr: "çiftlik" },
      { de: "of course", tr: "tabii ki" },
      { de: "pay", tr: "ödemek" },
      { de: "too expensive", tr: "çok pahalı" },
    ],
    minutes: 4,
    text:
      "Seller: Good morning! How many kilos do you want?\n" +
      "Ayla: Two kilos of tomatoes, please. Are they fresh?\n" +
      "Seller: Very fresh. They are from a farm near the city.\n" +
      "Ayla: How much is it?\n" +
      "Seller: Four euros. Tomatoes are cheap this week — it's a sale.\n" +
      "Ayla: Good. And the meat? I'd like five hundred grams.\n" +
      "Seller: The meat is eighteen euros a kilo, so nine euros.\n" +
      "Ayla: Nine euros! That's too expensive for me.\n" +
      "Seller: Then take three hundred grams. It costs five euros.\n" +
      "Ayla: Yes, please. And a bottle of water too.\n" +
      "Seller: Here you are. Eleven euros, please.\n" +
      "Ayla: Thank you. Can I pay with coins?\n" +
      "Seller: Of course!",
    questions: [
      {
        text: "How much are two kilos of tomatoes?",
        options: ["four euros", "nine euros", "five euros"],
        answer: 0,
        explain: "„Four euros. Tomatoes are cheap this week.“ — dokuz ve beş euro etin fiyatları.",
      },
      {
        text: "Why does Ayla take only three hundred grams of meat?",
        options: ["it is too expensive", "it is not fresh", "she doesn't like meat"],
        answer: 0,
        explain: "„Nine euros! That's too expensive for me.“ — daha az alınca beş euro oluyor.",
      },
      {
        kind: "truefalse",
        text: "The tomatoes are expensive this week.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Tomatoes are cheap this week — it's a sale.“ — pahalı olan et.",
      },
      {
        kind: "gapfill",
        text: "Ayla buys a bottle of ___.",
        options: [],
        answer: 0,
        accept: ["water"],
        explain: "„And a bottle of water too.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "How many kilos do you want?",
          "Two kilos of tomatoes, please.",
          "That's too expensive for me.",
          "Eleven euros, please.",
        ],
        explain: "Önce miktar, sonra sipariş, sonra itiraz, en son toplam. Pazarlık hep bu sırayla gidiyor.",
      },
      {
        kind: "short_answer",
        text: "How much does Ayla pay?",
        options: [],
        answer: 0,
        accept: ["eleven euros", "11 euros", "eleven"],
        explain: "„Here you are. Eleven euros, please.“ — dört euro domates, beş euro et, iki euro su.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u7-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 7,
    title: "Cooking together",
    genre: "dialogue",
    intro: "İki kişi birlikte yemek pişiriyor. Hangi adım önce, hangisi sonra?",
    gloss: [
      { de: "vegetables", tr: "sebzeler" },
      { de: "know", tr: "bilmek" },
      { de: "drink", tr: "içmek" },
      { de: "better", tr: "daha iyi" },
      { de: "Not yet", tr: "henüz değil" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ali", text: "What do we cook today?" },
      { speaker: "Nil", text: "Rice with vegetables. It's easy and cheap." },
      { speaker: "Ali", text: "Good. What do I do first?" },
      { speaker: "Nil", text: "First, wash the rice. Then cut the onions." },
      { speaker: "Ali", text: "The onions! I hate cutting onions." },
      { speaker: "Nil", text: "I know, but it is only one onion. After that, cut the tomatoes." },
      { speaker: "Ali", text: "Is the water hot?" },
      { speaker: "Nil", text: "Yes, it's very hot. Don't touch it!" },
      { speaker: "Ali", text: "And the rice? Is it ready?" },
      { speaker: "Nil", text: "Not yet. Ten more minutes. Then it is ready." },
      { speaker: "Ali", text: "Would you like some tea?" },
      { speaker: "Nil", text: "Yes, please. But not too hot — I drink warm tea, it is better for me." },
    ],
    questions: [
      {
        text: "What do they cook?",
        options: ["rice with vegetables", "pizza", "soup"],
        answer: 0,
        explain: "„Rice with vegetables. It's easy and cheap.“",
      },
      {
        text: "What does Ali do first?",
        options: ["wash the rice", "cut the onions", "cut the tomatoes"],
        answer: 0,
        explain: "„First, wash the rice. Then cut the onions.“ — soğan ikinci, domates üçüncü adım.",
      },
      {
        kind: "truefalse",
        text: "The water is warm.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Yes, it's very hot. Don't touch it!“ — ılık olan çay, su çok sıcak.",
      },
      {
        kind: "gapfill",
        text: "Ali hates cutting ___.",
        options: [],
        answer: 0,
        accept: ["onions"],
        explain: "„I hate cutting onions.“ — „hate“ fiilinden sonra ikinci fiil „-ing“ alıyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["First, wash the rice.", "First wash the rice."],
        explain: "„First, wash the rice.“ — emir kipinde özne yok, fiil doğrudan geliyor.",
      },
      {
        kind: "short_answer",
        text: "What does Nil want to drink?",
        options: [],
        answer: 0,
        accept: ["tea", "warm tea", "some tea"],
        explain: "„Yes, please. But not too hot — I drink warm tea, it is better for me.“",
      },
    ],
  },
  {
    id: "en-a1-u7-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 7,
    title: "Drinks, please",
    genre: "dialogue",
    intro: "Üç kişi içecek söylüyor. Kim ne alıyor, toplam kaç para?",
    gloss: [
      { de: "orange", tr: "portakal" },
      { de: "something", tr: "bir şey" },
      { de: "drink", tr: "içmek" },
      { de: "big", tr: "büyük" },
      { de: "of course", tr: "tabii ki" },
      { de: "cold", tr: "soğuk" },
      { de: "enough", tr: "yeterli" },
      { de: "apple", tr: "elma" },
      { de: "fresh", tr: "taze" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Waiter", text: "Good evening. Would you like something to drink?" },
      { speaker: "Ela", text: "Yes, please. I'd like a juice. Is it fresh?" },
      { speaker: "Waiter", text: "Very fresh. Apple or orange?" },
      { speaker: "Ela", text: "Apple, please." },
      { speaker: "Kaan", text: "And I'd like a beer, please. A big one." },
      { speaker: "Waiter", text: "Of course. And you?" },
      { speaker: "Deniz", text: "Only water for me, thank you. A bottle of cold water." },
      { speaker: "Waiter", text: "Would you like some wine too?" },
      { speaker: "Kaan", text: "No, thank you. Beer is enough." },
      { speaker: "Ela", text: "How much is the juice?" },
      { speaker: "Waiter", text: "Three euros. The beer is four euros and the water is one euro." },
      { speaker: "Deniz", text: "Eight euros together, then." },
      { speaker: "Waiter", text: "Yes. Anything else?" },
      { speaker: "Ela", text: "No, thank you." },
    ],
    questions: [
      {
        text: "What does Ela drink?",
        options: ["apple juice", "beer", "water"],
        answer: 0,
        explain: "„I'd like a juice… Apple, please.“ — bira Kaan'ın, su Deniz'in.",
      },
      {
        text: "How much is the beer?",
        options: ["four euros", "three euros", "one euro"],
        answer: 0,
        explain: "„The beer is four euros“ — üç euro meyve suyu, bir euro su.",
      },
      {
        kind: "truefalse",
        text: "Kaan would like some wine.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, thank you. Beer is enough.“ — şarabı reddediyor.",
      },
      {
        kind: "gapfill",
        text: "Deniz takes a bottle of cold ___.",
        options: [],
        answer: 0,
        accept: ["water"],
        explain: "„A bottle of cold water.“",
      },
      {
        kind: "order",
        text: "Siparişlerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I'd like a juice.",
          "I'd like a beer, please.",
          "Only water for me, thank you.",
          "Eight euros together, then.",
        ],
        explain: "Önce Ela, sonra Kaan, sonra Deniz söylüyor; toplam en sonda çıkıyor.",
      },
      {
        kind: "short_answer",
        text: "How much is everything together?",
        options: [],
        answer: 0,
        accept: ["eight euros", "8 euros", "eight"],
        explain: "„Eight euros together, then.“ — üç artı dört artı bir.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u7-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 7,
    title: "I like eating pizza",
    genre: "personal",
    intro: "Sevdiğini ve tercih ettiğini yaz. Dikkat: sevmek fiilinden sonra ikinci fiil „-ing“ alıyor.",
    gloss: [
      { de: "I like eating …", tr: "… yemeyi seviyorum" },
      { de: "I prefer … to …", tr: "… yerine …'i tercih ederim" },
      { de: "too expensive", tr: "çok pahalı" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Pizza yemeyi seviyorum.",
        answer: "I like eating pizza.",
        hint: "„like“ fiilinden sonra ikinci fiil „-ing“ alır: like eating, like cooking.",
      },
      {
        kind: "build",
        tr: "Çayı kahveye tercih ederim.",
        answer: "I prefer tea to coffee.",
        hint: "Tercih edilen ÖNCE, ötekisi „to“dan sonra. „than“ değil „to“.",
      },
      {
        kind: "build",
        tr: "Yemek pişirmeyi sever misin?",
        answer: "Do you like cooking?",
        hint: "Soru „do“ ile, ikinci fiil yine „-ing“: Do you like cooking?",
      },
      {
        kind: "build",
        tr: "Çok pahalı.",
        answer: "It's too expensive.",
        alternatives: ["It is too expensive."],
        hint: "„too“ burada „çok“ değil „gereğinden fazla“ demek; şikâyet taşıyor.",
      },
      {
        kind: "form",
        prompt: "Market listesini doldur.",
        facts: "İki kilo domates; beş yüz gram et; bir şişe su; bir kilo pirinç.",
        fields: [
          { label: "Tomatoes", answer: "two kilos", accept: ["2 kilos", "two"] },
          { label: "Meat", answer: "500 grams", accept: ["five hundred grams"] },
          { label: "Water", answer: "one bottle", accept: ["a bottle", "1 bottle"] },
          { label: "Rice", answer: "one kilo", accept: ["1 kilo", "a kilo"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u7-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 7,
    title: "First, then, after that",
    genre: "personal",
    intro: "Tarif yaz. Emir kipinde özne yazılmıyor, fiil doğrudan başlıyor.",
    gloss: [
      { de: "Cut the tomatoes.", tr: "domatesleri kes" },
      { de: "Don't touch it.", tr: "ona dokunma" },
      { de: "First …, then …", tr: "önce …, sonra …" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Domatesleri kes.",
        answer: "Cut the tomatoes.",
        hint: "Emirde özne yok: „Cut“, „You cut“ değil.",
      },
      {
        kind: "build",
        tr: "Ona dokunma.",
        answer: "Don't touch it.",
        hint: "Olumsuz emir „Don't“ ile, sonra fiil olduğu gibi.",
      },
      {
        kind: "build",
        tr: "Biraz çay ister misin?",
        answer: "Would you like some tea?",
        hint: "İkramda „some“ kullanılır, „any“ değil — soru olmasına rağmen.",
      },
      {
        kind: "build",
        tr: "Önce pirinci yıka, sonra soğanları kes.",
        answer: "First, wash the rice, then cut the onions.",
        hint: "„First“ ve „then“ virgülle ayrılıyor; iki emir art arda geliyor.",
      },
      {
        kind: "build",
        tr: "Kaç elma istiyorsun?",
        answer: "How many apples do you want?",
        hint: "Sayılabilen şeyde „how many“, sayılamayanda „how much“.",
      },
    ],
  },
];
