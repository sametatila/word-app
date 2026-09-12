import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 6 — "Kafe, kahvaltı, büfe, restoran".
 *
 * Dört ders: At the café · Breakfast · At the kiosk · At the restaurant.
 *
 *   Kelime: coffee, tea, water, please, order, cup, café, sandwich, bread,
 *           milk, egg, cheese, eat, butter, salt, plate, buy, money, price,
 *           bag, take, coin, newspaper, shop, restaurant, menu, table,
 *           waiter, bill, soup, knife, spoon.
 *   Kalıp:  I'd like a coffee, please. · I'll have a tea, please. ·
 *           Anything else? — No, thank you. · I eat some bread. ·
 *           Is there any milk? · Do you eat eggs? ·
 *           Can I have a coffee, please? · How much is it? · I'll take it. ·
 *           A table for two, please. · Can I have the bill, please?
 *
 * Ünitenin zorluğu SAYILABİLİRLİK: „a coffee“ bir fincan kahve, „coffee“
 * ise kahve maddesi; „some“ olumluda, „any“ soruda ve olumsuzda duruyor.
 * Türkçede bu ayrım hiç yok — "kahve" her iki durumda da aynı sözcük — ve
 * içerik ikisini aynı metinde yan yana kullanıyor.
 */
export const enA1U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u6-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 6,
    title: "The café menu",
    genre: "ad",
    intro: "Bir kafenin menüsünü oku: ne var, ne kadar, kahvaltıda ne veriliyor?",
    gloss: [
      { de: "breakfast", tr: "kahvaltı" },
      { de: "of course", tr: "tabii ki" },
      { de: "a cup of tea", tr: "bir fincan çay" },
    ],
    minutes: 4,
    text:
      "CITY CAFE — MENU\n\n" +
      "Coffee: 2 euros\n" +
      "Tea: 1 euro\n" +
      "Water: 1 euro\n" +
      "Milk: 1 euro\n\n" +
      "Sandwich with cheese: 4 euros\n" +
      "Bread with butter and salt: 2 euros\n" +
      "Soup of the day: 5 euros\n\n" +
      "Breakfast: 8 euros. One egg, bread, butter, cheese and a cup of tea or coffee.\n\n" +
      "Do you eat eggs? Is there any milk in your coffee? Please talk to the waiter.\n" +
      "Can I have the bill, please? — Yes, of course.",
    questions: [
      {
        text: "How much is a sandwich with cheese?",
        options: ["four euros", "two euros", "five euros"],
        answer: 0,
        explain: "„Sandwich with cheese: 4 euros“ — iki euro ekmek, beş euro çorba.",
      },
      {
        text: "What is in the breakfast?",
        options: ["an egg", "a sandwich", "a newspaper"],
        answer: 0,
        explain: "„One egg, bread, butter, cheese and a cup of tea or coffee.“ — sandviç ayrı bir madde.",
      },
      {
        kind: "truefalse",
        text: "Water is one euro.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Water: 1 euro“ — iki euro olan kahve.",
      },
      {
        kind: "gapfill",
        text: "Soup of the day is ___ euros.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„Soup of the day: 5 euros“ — menünün en pahalı tek maddesi.",
      },
      {
        kind: "short_answer",
        text: "How much is the breakfast?",
        options: [],
        answer: 0,
        accept: ["eight euros", "8 euros", "eight"],
        explain: "„Breakfast: 8 euros.“ — tek tek alsan daha pahalı olurdu.",
      },
    ],
  },
  {
    id: "en-a1-u6-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 6,
    title: "At the restaurant",
    genre: "dialogue",
    intro: "Restoranda sipariş ve hesap. Sipariş kalıplarına dikkat: „I'd like“ ve „I'll have“ aynı işi görüyor.",
    gloss: [
      { de: "of course", tr: "tabii ki" },
      { de: "One moment", tr: "bir dakika" },
      { de: "What would you like?", tr: "ne almak istersiniz" },
    ],
    minutes: 4,
    text:
      "Waiter: Good evening. A table for two?\n" +
      "Ali: Yes, please. A table for two.\n" +
      "Waiter: Here is the menu. What would you like?\n" +
      "Ali: I'd like a soup, please. And a water.\n" +
      "Eda: I'll have a sandwich with cheese, please.\n" +
      "Waiter: Anything else?\n" +
      "Eda: No, thank you. But can I have a spoon? There is only a knife here.\n" +
      "Waiter: Of course. One moment, please.\n" +
      "Ali: How much is the soup?\n" +
      "Waiter: Five euros. The sandwich is four euros.\n" +
      "Eda: Can I have the bill, please?\n" +
      "Waiter: Yes. It is nine euros.\n" +
      "Ali: Here is the money. Thank you!",
    questions: [
      {
        text: "What does Ali order?",
        options: ["a soup and a water", "a sandwich", "a coffee"],
        answer: 0,
        explain: "„I'd like a soup, please. And a water.“ — sandviçi Eda alıyor.",
      },
      {
        text: "How much is the bill?",
        options: ["nine euros", "five euros", "four euros"],
        answer: 0,
        explain: "„It is nine euros.“ — beş euro çorba, dört euro sandviç; toplamı dokuz.",
      },
      {
        kind: "truefalse",
        text: "There is a spoon on Eda's table.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But can I have a spoon? There is only a knife here.“ — kaşık yok, bıçak var.",
      },
      {
        kind: "gapfill",
        text: "The sandwich is ___ euros.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„The sandwich is four euros.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A table for two?",
          "What would you like?",
          "I'd like a soup, please.",
          "Can I have the bill, please?",
        ],
        explain: "Restoranda sıra hep aynı: masa, sipariş, yemek, hesap.",
      },
      {
        kind: "short_answer",
        text: "How much is the soup?",
        options: [],
        answer: 0,
        accept: ["five euros", "5 euros", "five"],
        explain: "„How much is the soup? — Five euros.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u6-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 6,
    title: "At the kiosk",
    genre: "dialogue",
    intro: "Büfede alışveriş. Fiyatları ve toplamı yakala.",
    gloss: [
      { de: "Here you are", tr: "buyurun" },
      { de: "of course", tr: "tabii ki" },
      { de: "big", tr: "büyük" },
      { de: "problem", tr: "sorun" },
      { de: "Anything else?", tr: "başka bir şey" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ela", text: "Good morning. Can I have a newspaper, please?" },
      { speaker: "Seller", text: "Good morning. Here you are. Anything else?" },
      { speaker: "Ela", text: "Yes, a coffee, please. A big cup." },
      { speaker: "Seller", text: "Here is your coffee. Is there any milk in it?" },
      { speaker: "Ela", text: "No milk, thank you. How much is it?" },
      { speaker: "Seller", text: "The newspaper is two euros and the coffee is three euros. Five euros." },
      { speaker: "Ela", text: "Here is the money. I only have coins — is that a problem?" },
      { speaker: "Seller", text: "No, it isn't a problem. Thank you." },
      { speaker: "Ela", text: "Can I have a bag too?" },
      { speaker: "Seller", text: "Of course. Here you are." },
      { speaker: "Ela", text: "Thank you very much. Good day!" },
    ],
    questions: [
      {
        text: "What does Ela buy first?",
        options: ["a newspaper", "a coffee", "a bag"],
        answer: 0,
        explain: "„Can I have a newspaper, please?“ ilk cümle; kahve sonra, çanta en son geliyor.",
      },
      {
        text: "How much is the coffee?",
        options: ["three euros", "two euros", "five euros"],
        answer: 0,
        explain: "„the coffee is three euros“ — iki euro gazete, beş euro toplam.",
      },
      {
        kind: "truefalse",
        text: "There is no milk in Ela's coffee.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Is there any milk in it? — No milk, thank you.“ Soruda „any“, cevapta yok.",
      },
      {
        kind: "gapfill",
        text: "Ela only has ___.",
        options: [],
        answer: 0,
        accept: ["coins"],
        explain: "„I only have coins“ — birden çok olduğu için çoğul: coin → coins.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Can I have a newspaper, please?", "Can I have a newspaper please?"],
        explain: "„Can I have a newspaper, please?“ — „please“ önünde virgülle, cümlenin sonunda.",
      },
      {
        kind: "short_answer",
        text: "How much is everything?",
        options: [],
        answer: 0,
        accept: ["five euros", "5 euros", "five"],
        explain: "„The newspaper is two euros and the coffee is three euros. Five euros.“",
      },
    ],
  },
  {
    id: "en-a1-u6-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 6,
    title: "Breakfast at home",
    genre: "monologue",
    intro: "Deniz kahvaltısını anlatıyor. „some“ ile „any“ nerede geçiyor, dikkat et.",
    gloss: [
      { de: "breakfast", tr: "kahvaltı" },
      { de: "small", tr: "küçük" },
      { de: "big", tr: "büyük" },
      { de: "kiosk", tr: "büfe" },
      { de: "every day", tr: "her gün" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Deniz", text: "Good morning! This is my breakfast. I eat it every day at seven." },
      { speaker: "Deniz", text: "I eat some bread with butter and cheese. I don't eat eggs." },
      { speaker: "Deniz", text: "Is there any milk? Yes, there is. I take some milk with my tea." },
      { speaker: "Deniz", text: "My plate is small, but my cup is big. I like tea very much." },
      { speaker: "Deniz", text: "My brother eats an egg every morning. He doesn't like cheese." },
      { speaker: "Deniz", text: "After breakfast I buy a newspaper at the kiosk. It is only one euro." },
    ],
    questions: [
      {
        text: "What does Deniz eat for breakfast?",
        options: ["bread with butter and cheese", "eggs", "soup"],
        answer: 0,
        explain: "„I eat some bread with butter and cheese. I don't eat eggs.“ — yumurtayı kardeşi yiyor.",
      },
      {
        text: "Who eats an egg?",
        options: ["Deniz's brother", "Deniz", "the waiter"],
        answer: 0,
        explain: "„My brother eats an egg every morning.“",
      },
      {
        kind: "truefalse",
        text: "Deniz's brother likes cheese.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He doesn't like cheese.“ — peyniri yiyen Deniz.",
      },
      {
        kind: "gapfill",
        text: "Deniz buys a ___ at the kiosk.",
        options: [],
        answer: 0,
        accept: ["newspaper"],
        explain: "„After breakfast I buy a newspaper at the kiosk.“",
      },
      {
        kind: "order",
        text: "Deniz'in anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "This is my breakfast.",
          "I eat some bread with butter and cheese.",
          "My brother eats an egg every morning.",
          "After breakfast I buy a newspaper.",
        ],
        explain: "Önce kahvaltının kendisi, sonra kendi yediği, sonra kardeşininki, en son sonrası.",
      },
      {
        kind: "short_answer",
        text: "How much is the newspaper?",
        options: [],
        answer: 0,
        accept: ["one euro", "1 euro", "one"],
        explain: "„It is only one euro.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u6-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 6,
    title: "Ordering",
    genre: "formal",
    intro: "Sipariş kalıplarını yaz. Sonunda kafe siparişi formunu doldur.",
    gloss: [
      { de: "Can I have …?", tr: "… alabilir miyim" },
      { de: "I'd like …", tr: "… istiyorum" },
      { de: "the bill", tr: "hesap" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bir kahve alabilir miyim, lütfen?",
        answer: "Can I have a coffee, please?",
        hint: "„a coffee“ bir fincan kahve demek; madde olarak kahve „coffee“ olurdu.",
      },
      {
        kind: "build",
        tr: "Bir çay istiyorum, lütfen.",
        answer: "I'd like a tea, please.",
        alternatives: ["I would like a tea, please."],
        hint: "„I'd like“ = „I would like“. „I want“ kaba kaçar, siparişte kullanılmaz.",
      },
      {
        kind: "build",
        tr: "Hesabı alabilir miyim, lütfen?",
        answer: "Can I have the bill, please?",
        hint: "Hesap tektir ve bellidir: „the bill“, „a bill“ değil.",
      },
      {
        kind: "build",
        tr: "İki kişilik bir masa, lütfen.",
        answer: "A table for two, please.",
        hint: "Kişi sayısı „for“ ile: for two, for four. Fiil yok, bu hazır bir kalıp.",
      },
      {
        kind: "form",
        prompt: "Kafe siparişi formunu doldur.",
        facts: "Masa iki kişilik; bir çorba; bir peynirli sandviç; iki çay.",
        fields: [
          { label: "Table for", answer: "two", accept: ["2"] },
          { label: "Soup", answer: "one", accept: ["1"] },
          { label: "Sandwich", answer: "one", accept: ["1"] },
          { label: "Tea", answer: "two", accept: ["2"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u6-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 6,
    title: "Some or any?",
    genre: "personal",
    intro: "„some“ olumlu cümlede, „any“ soru ve olumsuzda. Türkçede böyle bir ayrım yok.",
    gloss: [
      { de: "some", tr: "biraz" },
      { de: "any", tr: "hiç" },
      { de: "I'll take it.", tr: "onu alacağım" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Biraz ekmek yiyorum.",
        answer: "I eat some bread.",
        hint: "Olumlu cümlede „some“. „bread“ sayılamaz, o yüzden „a bread“ olmaz.",
      },
      {
        kind: "build",
        tr: "Hiç süt var mı?",
        answer: "Is there any milk?",
        hint: "Soruda „any“ ve tekil „is there“, çünkü süt sayılamaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi soru yap.",
        source: "You eat eggs.",
        answer: "Do you eat eggs?",
        why: "Fiil „be“ değil, o yüzden soru „do“ ile kuruluyor ve fiil olduğu gibi kalıyor.",
      },
      {
        kind: "build",
        tr: "Onu alacağım.",
        answer: "I'll take it.",
        alternatives: ["I will take it."],
        hint: "Alışverişte karar cümlesi. „I'll“ = „I will“ ve burada „hemen şimdi“ anlamı taşıyor.",
      },
      {
        kind: "build",
        tr: "Gazete ne kadar?",
        answer: "How much is the newspaper?",
        hint: "Belli bir gazeteden söz ediliyor: „the newspaper“.",
      },
    ],
  },
];
