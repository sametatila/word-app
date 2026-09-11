import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 14 — "Online sipariş, banka, koli, telefon sözleşmesi".
 *
 * Dört ders: Online orders · At the bank · Sending a parcel ·
 * A phone contract.
 *
 *   Kelime: order, delivery, arrive, track, package, deliver,
 *           shopping cart, link, account, transfer, cash, statement, card,
 *           bank account, credit card, ATM, weigh, abroad, express, insure,
 *           form, post office, mailbox, zip code, contract, monthly, data,
 *           offer, cancel, payment, smartphone, online.
 *   Kalıp:  I ordered it two days ago. · Has my package arrived yet? ·
 *           It will arrive on Friday. · I'd like to open an account. ·
 *           Could you transfer this money to my account, please? ·
 *           Is there a charge for that? ·
 *           How much does it cost to send this abroad? ·
 *           How long does it take? ·
 *           Express is faster, but it's more expensive. ·
 *           This offer is cheaper than that one. ·
 *           How much data do I get? · I want to cancel my contract.
 *
 * Ünitenin tek öğretme noktası KARŞILAŞTIRMANIN İKİ BİÇİMİNİN AYNI
 * CÜMLEDE BULUŞMASI: „Express is faster, but it's more expensive.“ Kısa
 * sıfat „-er“ alıyor, uzun sıfat „more“ istiyor ve İngilizce bu ikisini
 * tek cümlenin içinde değiştiriyor. Ünite 5 kuralı ayrı ayrı öğretmişti;
 * burada seçim gerçek zamanda yapılıyor, çünkü dört dersin dördü de iki
 * seçenek arasında karar verdiriyor.
 */
export const enA2U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u14-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 14,
    title: "Online orders",
    genre: "forum",
    intro: "Kayıp paket için forum. Önce ne yapmalı?",
    gloss: [
      { de: "driver", tr: "kurye" },
      { de: "neighbour", tr: "komşu" },
      { de: "the order number", tr: "sipariş numarası" },
      { de: "stands", tr: "duruyor" },
      { de: "the date", tr: "tarih" },
    ], 
    minutes: 6,
    text:
      "Question: I ordered a chair two weeks ago and it hasn't arrived yet. What can I do?\n" +
      "Answer 1: First track the package. In your account there is a number. With that number you see where it is. Usually it stands in a city two hours away and comes on Monday.\n" +
      "Answer 2: I had the same problem in March. The package was at my neighbour's door for six days. Nobody wrote to me. Ask the people in your building first.\n" +
      "Answer 3: Write to the shop, not to the driver. The shop has the contract with you. Write short: the order number, the date and one question — when will it arrive?\n" +
      "Answer 4: And put everything in one email. I sent four emails in two days and they answered the first one after a week.\n" +
      "Question: Thank you. It arrived this morning. It was in the wrong building for ten days. Nobody understands it.",
    questions: [
      {
        text: "What should you do first?",
        options: ["track the package", "write to the driver", "go to the shop"],
        answer: 0,
        explain: "„First track the package. In your account there is a number.“",
      },
      {
        text: "Who has the contract with you?",
        options: ["the shop", "the driver", "the neighbour"],
        answer: 0,
        explain: "„Write to the shop, not to the driver. The shop has the contract with you.“",
      },
      {
        kind: "truefalse",
        text: "You should send one email for every question.",
        options: ["True", "False"],
        answer: 1,
        explain: "„And put everything in one email.“ — dört e-posta bir haftada bir cevap getirdi.",
      },
      {
        kind: "gapfill",
        text: "The package was at the neighbour's door for ___ days.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„The package was at my neighbour's door for six days.“",
      },
      {
        kind: "short_answer",
        text: "Where was the chair in the end?",
        options: [],
        answer: 0,
        accept: ["in the wrong building", "the wrong building"],
        explain: "„It was in the wrong building for ten days. Nobody understands it.“",
      },
    ],
  },
  {
    id: "en-a2-u14-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 14,
    title: "Sending a parcel",
    genre: "dialogue",
    intro: "Postanede bir koli. Normal mi, hızlı mı, sigortalı mı?",
    gloss: [
      { de: "parcel", tr: "koli" },
      { de: "inside", tr: "içinde" },
      { de: "Where to", tr: "nereye" },
    ],
    minutes: 6,
    text:
      "Ela: Good morning. I'd like to send this parcel abroad.\n" +
      "Post: Put it here, please. I weigh it first. Two kilos. Where to?\n" +
      "Ela: To Italy.\n" +
      "Post: Normal or express? Express is faster, but it's more expensive.\n" +
      "Ela: How much more is express?\n" +
      "Post: Normal is eleven euros and takes six days. Express is twenty-four and takes two days.\n" +
      "Ela: And is it safe? There are books inside and one of them is old.\n" +
      "Post: Then insure it. For three euros more the post pays if something happens.\n" +
      "Ela: Good. Normal with insurance, please.\n" +
      "Post: Fill in this form. Name, street, zip code and what is inside.\n" +
      "Ela: Do I write the price of the books?\n" +
      "Post: Yes. Not the price in the shop — what they cost you.\n" +
      "Ela: Fourteen euros for six days. Cheaper than I expected.",
    questions: [
      {
        text: "How long does normal take?",
        options: ["six days", "two days", "eleven days"],
        answer: 0,
        explain: "„Normal is eleven euros and takes six days. Express is twenty-four and takes two days.“",
      },
      {
        text: "What does the insurance cost?",
        options: ["three euros more", "eleven euros", "twenty-four euros"],
        answer: 0,
        explain: "„Then insure it. For three euros more the post pays if something happens.“",
      },
      {
        kind: "truefalse",
        text: "Ela chooses express.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Normal with insurance, please.“",
      },
      {
        kind: "gapfill",
        text: "The parcel weighs ___ kilos.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„I weigh it first. Two kilos. Where to?“",
      },
      {
        kind: "order",
        text: "Postanedeki sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I weigh it first.",
          "Normal or express?",
          "Then insure it.",
          "Fill in this form.",
        ],
        explain: "Önce tartı, sonra gönderi türü, sonra sigorta, en son form.",
      },
      {
        kind: "short_answer",
        text: "What does Ela pay?",
        options: [],
        answer: 0,
        accept: ["fourteen euros", "14 euros", "fourteen"],
        explain: "„Fourteen euros for six days.“ — on bir artı üç.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u14-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 14,
    title: "At the bank",
    genre: "dialogue",
    intro: "Hesap açılıyor. Neyin ücreti var, neyin yok?",
    gloss: [
      { de: "a charge", tr: "ücret" },
      { de: "papers", tr: "belgeler" },
      { de: "for now", tr: "şimdilik" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Mert", text: "Good morning. I'd like to open an account." },
      { speaker: "Bank", text: "Of course. Do you have your papers with you?" },
      { speaker: "Mert", text: "Here. And this is the letter from my company." },
      { speaker: "Bank", text: "Good. Two questions: do you want a credit card too?" },
      { speaker: "Mert", text: "Is there a charge for that?" },
      { speaker: "Bank", text: "Three euros a month. Without the card the account is free." },
      { speaker: "Mert", text: "Then no card for now. Can I get cash from every ATM?" },
      { speaker: "Bank", text: "From ours, yes. From other banks it costs four euros." },
      { speaker: "Mert", text: "Good to know. And could you transfer this money to my account, please?" },
      { speaker: "Bank", text: "From here? Then I need the account number." },
      { speaker: "Mert", text: "It is on this paper." },
      { speaker: "Bank", text: "Fine. Two hundred euros. You see it tomorrow in your statement." },
      { speaker: "Mert", text: "Not today?" },
      { speaker: "Bank", text: "Today in the evening, tomorrow on paper. The money is faster than the paper." },
    ],
    questions: [
      {
        text: "What does the credit card cost?",
        options: ["three euros a month", "four euros a month", "nothing"],
        answer: 0,
        explain: "„Three euros a month. Without the card the account is free.“",
      },
      {
        text: "Where can Mert get cash for free?",
        options: ["from this bank's ATM", "from every ATM", "from other banks"],
        answer: 0,
        explain: "„From ours, yes. From other banks it costs four euros.“",
      },
      {
        kind: "truefalse",
        text: "Mert takes a credit card.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Then no card for now.“",
      },
      {
        kind: "gapfill",
        text: "Mert transfers ___ hundred euros.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„Fine. Two hundred euros. You see it tomorrow in your statement.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I'd like to open an account.", "I would like to open an account.", "I'd like to open an account"],
        explain: "Kurumda „I want“ yerine „I'd like“; sonrası „to“ + fiil.",
      },
      {
        kind: "short_answer",
        text: "When does Mert see the money in the statement?",
        options: [],
        answer: 0,
        accept: ["tomorrow", "on paper tomorrow"],
        explain: "„Today in the evening, tomorrow on paper.“",
      },
    ],
  },
  {
    id: "en-a2-u14-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 14,
    title: "A phone contract",
    genre: "dialogue",
    intro: "Sözleşme iptali. Hangi teklif hangisinden ucuz, hangisi daha pahalı?",
    gloss: [
      { de: "gigabytes", tr: "gigabayt" },
      { de: "network", tr: "şebeke" },
      { de: "calendar", tr: "takvim" },
      { de: "slower", tr: "daha yavaş" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sena", text: "I want to cancel my contract. It is too expensive." },
      { speaker: "Shop", text: "Let me look. Twenty-nine euros a month, eight gigabytes." },
      { speaker: "Sena", text: "And this offer here in the window is nineteen." },
      { speaker: "Shop", text: "That one is cheaper, yes, but it's slower. Six gigabytes and not in every city." },
      { speaker: "Sena", text: "How much data do I get for twenty-four?" },
      { speaker: "Shop", text: "Twenty gigabytes and the fast network. It is more expensive than the offer in the window, but it is better than your contract today." },
      { speaker: "Sena", text: "So: cheaper than now and more data." },
      { speaker: "Shop", text: "Yes. Your contract ends in October. You can cancel in August." },
      { speaker: "Sena", text: "And if I cancel today?" },
      { speaker: "Shop", text: "Then you pay until October. Cancel in August, start in November." },
      { speaker: "Sena", text: "Fine. Write it in my calendar, please." },
      { speaker: "Shop", text: "In August I write to you. That is my job." },
    ],
    questions: [
      {
        text: "Why is the offer in the window cheaper?",
        options: ["it is slower and not in every city", "it is only for August", "it has no network"],
        answer: 0,
        explain: "„That one is cheaper, yes, but it's slower. Six gigabytes and not in every city.“",
      },
      {
        text: "When can Sena cancel?",
        options: ["in August", "in October", "today"],
        answer: 0,
        explain: "„Your contract ends in October. You can cancel in August.“",
      },
      {
        kind: "truefalse",
        text: "The new contract is more expensive than the contract today.",
        options: ["True", "False"],
        answer: 1,
        explain: "Bugünkü yirmi dokuz, yenisi yirmi dört: „cheaper than now and more data“.",
      },
      {
        kind: "gapfill",
        text: "For twenty-four euros Sena gets ___ gigabytes.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„Twenty gigabytes and the fast network.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I want to cancel my contract.", "I want to cancel my contract"],
        explain: "„cancel“ sonrası doğrudan nesne; edat almıyor.",
      },
      {
        kind: "short_answer",
        text: "When does the new contract start?",
        options: [],
        answer: 0,
        accept: ["in November", "November"],
        explain: "„Cancel in August, start in November.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u14-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 14,
    title: "Express is faster, but it's more expensive",
    genre: "personal",
    intro: "Tek cümlede iki karşılaştırma biçimi. Hangisi kısa, hangisi uzun sıfat?",
    gloss: [
      { de: "faster", tr: "daha çabuk" },
      { de: "more expensive", tr: "daha pahalı" },
      { de: "abroad", tr: "yurt dışına" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Hızlı gönderi daha çabuk ama daha pahalı.",
        answer: "Express is faster, but it's more expensive.",
        alternatives: ["Express is faster, but it is more expensive."],
        hint: "Aynı cümlede iki biçim: kısa sıfat „-er“ alıyor, uzun sıfat „more“ istiyor.",
      },
      {
        kind: "build",
        tr: "Bu teklif şundan daha ucuz.",
        answer: "This offer is cheaper than that one.",
        hint: "„cheap“ kısa: „-er“. Karşıdaki adın yerini „one“ tutuyor.",
      },
      {
        kind: "build",
        tr: "Bunu yurt dışına göndermek ne kadara mal olur?",
        answer: "How much does it cost to send this abroad?",
        hint: "Baştaki „it“ boş bir özne; asıl özne sondaki „to send …“.",
      },
      {
        kind: "build",
        tr: "Ne kadar sürüyor?",
        answer: "How long does it take?",
        hint: "Süre sorusu „how long“; „it takes“ kalıbı yine boş özneli.",
      },
      {
        kind: "form",
        prompt: "Kargo formunu doldur.",
        facts: "İki kilo; İtalya'ya; normal gönderi; sigortalı; toplam on dört euro.",
        fields: [
          { label: "Weight", answer: "two kilos", accept: ["2 kilos"] },
          { label: "Where to", answer: "Italy", accept: ["to Italy"] },
          { label: "Post", answer: "normal", accept: ["normal with insurance"] },
          { label: "Total", answer: "fourteen euros", accept: ["14 euros"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u14-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 14,
    title: "I'd like to open an account",
    genre: "formal",
    intro: "Banka ve sipariş cümleleri. Zaman belirteci yine zamanı seçiyor.",
    gloss: [
      { de: "transfer", tr: "havale etmek" },
      { de: "a charge", tr: "ücret" },
      { de: "arrived", tr: "geldi" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir hesap açmak istiyorum.",
        answer: "I'd like to open an account.",
        alternatives: ["I would like to open an account."],
        hint: "Kurumda „I want“ yerine „I'd like“ kullanılıyor.",
      },
      {
        kind: "build",
        tr: "Bu parayı hesabıma havale edebilir misiniz, lütfen?",
        answer: "Could you transfer this money to my account, please?",
        hint: "„transfer … to …“ hedefi „to“ ile alıyor.",
      },
      {
        kind: "build",
        tr: "Bunun için bir ücret var mı?",
        answer: "Is there a charge for that?",
        hint: "Varlık sorusu; neyin ücreti olduğunu „for“ bağlıyor.",
      },
      {
        kind: "build",
        tr: "Onu iki gün önce sipariş ettim.",
        answer: "I ordered it two days ago.",
        hint: "„ago“ zamanı çiviliyor: simple past.",
      },
      {
        kind: "build",
        tr: "Paketim geldi mi?",
        answer: "Has my package arrived yet?",
        hint: "Sonuç şimdi önemli: present perfect. Soruda „yet“ en sonda.",
      },
    ],
  },
];
