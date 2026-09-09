import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Kalan türler: rehber metin, sigorta telefonu ve öğüt mektubu. Üçü de
 * zorunluluk ve tavsiye diliyle yazılmış; dil bilgisi must/should/have to.
 */
export const enB1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r5",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "If You Lose Your Documents Abroad",
    genre: "Rehber metin",
    intro: "Yurt dışında belgesini kaybedenler için bir rehber okuyacaksın: ilk saatte ne yapılmalı, neyi ödemek zorunda değilsin.",
    gloss: [
      { de: "passport", tr: "pasaport" },
      { de: "embassy", tr: "büyükelçilik" },
      { de: "consulate", tr: "konsolosluk" },
      { de: "in person", tr: "bizzat" },
      { de: "valid", tr: "geçerli" },
      { de: "policy", tr: "poliçe" },
      { de: "block", tr: "bloke etmek" },
    ],
    minutes: 7,
    text:
      "IF YOU LOSE YOUR DOCUMENTS ABROAD\n\n" +
      "Losing a passport is not an emergency, but the first hour matters more than the next three days.\n\n" +
      "You have to report the loss twice: once to the local police and once to your embassy or consulate. " +
      "The police report is the document that everything else is built on, so get it before you do anything " +
      "else. In most countries you must go in person; a phone call is not enough.\n\n" +
      "You should take a photo of your passport now, before you travel, and send it to yourself by email. " +
      "A photo is not a legal document, but it saves hours at the consulate, because the number is on it.\n\n" +
      "At the consulate you will normally get an emergency travel document. It is valid for one journey home " +
      "and for a fixed number of days. You must not use it for a holiday in a third country; that is a common " +
      "and expensive mistake.\n\n" +
      "You do not have to pay for everything yourself. Many travel insurance policies cover the fee and the " +
      "extra nights, but almost all of them require the police report within twenty-four hours. Read that line " +
      "before you buy the policy, not after.\n\n" +
      "And one small thing that people forget: your bank cards. They should be blocked before you go to bed, " +
      "not the next morning.",
    questions: [
      {
        text: "What do you have to do first?",
        options: [
          "report the loss to the police in person",
          "call your embassy from the hotel",
          "buy a new ticket home",
        ],
        answer: 0,
        explain: "„The police report is the document that everything else is built on, so get it before you do anything else.“",
      },
      {
        text: "What is an emergency travel document for?",
        options: [
          "one journey home",
          "travel in any country for a month",
          "a new passport for five years",
        ],
        answer: 0,
        explain: "„It is valid for one journey home and for a fixed number of days.“",
      },
      {
        kind: "truefalse",
        text: "You have to pay for everything yourself.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Many travel insurance policies cover the fee and the extra nights …“",
      },
      {
        kind: "gapfill",
        text: "Insurance usually requires the police report within ___ hours.",
        options: [],
        answer: 0,
        accept: ["twenty-four", "24", "twenty four"],
        explain: "„… almost all of them require the police report within twenty-four hours.“",
      },
      {
        kind: "short_answer",
        text: "What should you send to yourself by email?",
        options: [],
        answer: 0,
        accept: ["a photo of your passport", "a passport photo", "a photo"],
        explain: "„You should take a photo of your passport now, before you travel, and send it to yourself by email.“",
      },
      {
        text: "Why should you read the insurance line before you buy?",
        options: [
          "Because the deadline is short and fixed.",
          "Because the policy changes every year.",
          "Because the police do not write reports.",
        ],
        answer: 0,
        explain: "„… require the police report within twenty-four hours. Read that line before you buy the policy, not after.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l5",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Calling the Insurance Line",
    genre: "Telefon",
    intro: "Pasaportu çalınan biri sigorta hattını arıyor: hangi belge, hangi süre, neyi beklemek gerekiyor.",
    gloss: [
      { de: "theft", tr: "hırsızlık" },
      { de: "receipt", tr: "fiş" },
      { de: "refuse", tr: "reddetmek" },
      { de: "cash", tr: "nakit" },
      { de: "book", tr: "rezerve etmek" },
      { de: "policy", tr: "poliçe" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Agent", text: "Traveline Assistance, good afternoon. How can I help?" },
      { speaker: "Caller", text: "Hello. My passport was stolen this morning in Lisbon. I have policy number forty-four D seven. I don't know what I have to do first." },
      { speaker: "Agent", text: "I'm sorry to hear that. First, do you already have a police report?" },
      { speaker: "Caller", text: "Yes, I was at the police station an hour ago. They gave me a paper." },
      { speaker: "Agent", text: "Good, that is the important one. You have to send us a photo of that paper today. Our system needs it within twenty-four hours of the theft, not of the report." },
      { speaker: "Caller", text: "Understood. And the consulate?" },
      { speaker: "Agent", text: "You should call them before four o'clock; after that the line closes. You must go in person tomorrow with the police report and one photo." },
      { speaker: "Caller", text: "I don't have a photo." },
      { speaker: "Agent", text: "There is usually a machine at the consulate. You don't have to bring one from home." },
      { speaker: "Caller", text: "And the extra nights in the hotel?" },
      { speaker: "Agent", text: "We pay for up to three nights, but only with receipts. Pay with a card if you can. Cash receipts are often refused." },
      { speaker: "Caller", text: "Right. Should I book the flight now or wait?" },
      { speaker: "Agent", text: "Wait until the travel document is in your hand. People book too early and lose the money." },
    ],
    questions: [
      {
        text: "Why does the caller phone?",
        options: ["Her passport was stolen.", "She lost her flight ticket.", "She wants to change her policy."],
        answer: 0,
        explain: "„My passport was stolen this morning in Lisbon.“",
      },
      {
        text: "When must the photo of the police report be sent?",
        options: [
          "within twenty-four hours of the theft",
          "within twenty-four hours of the report",
          "before the end of the journey",
        ],
        answer: 0,
        explain: "„Our system needs it within twenty-four hours of the theft, not of the report.“",
      },
      {
        kind: "truefalse",
        text: "The caller has to bring a photo from home.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is usually a machine at the consulate. You don't have to bring one from home.“",
      },
      {
        kind: "short_answer",
        text: "How many extra nights does the insurance pay for?",
        options: [],
        answer: 0,
        accept: ["three nights", "three", "up to three nights"],
        explain: "„We pay for up to three nights, but only with receipts.“",
      },
      {
        kind: "dictation",
        text: "Ödeme biçimiyle ilgili tavsiyeyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Pay with a card if you can.", "Pay with a card if you can"],
        explain: "„Pay with a card if you can.“ — emir kipiyle verilen bir tavsiye.",
      },
      {
        text: "What does the agent advise about the flight?",
        options: [
          "to wait until the document is ready",
          "to book it immediately today",
          "to ask the consulate to book it",
        ],
        answer: 0,
        explain: "„Wait until the travel document is in your hand. People book too early and lose the money.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w5",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Before Your First Trip Alone",
    genre: "Öğüt mektubu",
    intro: "İlk kez tek başına yolculuğa çıkacak birine mektup yazacaksın; önce iki cümle kur, sonra mektubu yaz.",
    gloss: [
      { de: "alone", tr: "yalnız" },
      { de: "worry", tr: "endişelenmek" },
      { de: "copy", tr: "kopya" },
      { de: "separate", tr: "ayrı" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Otelin adresini yazman gerekir.",
        answer: "You should write down the address of the hotel.",
        alternatives: ["You should write the address of the hotel down."],
        hint: "„write down“ ayrılabilir bir fiildir; nesne uzunsa genelde ayrılmadan kullanılır.",
      },
      {
        kind: "build",
        tr: "Bu evrakı yanında taşımak zorunda değilsin.",
        answer: "You don't have to carry this paper with you.",
        alternatives: ["You do not have to carry this paper with you."],
        hint: "„don't have to“ zorunluluk yok demektir; „mustn't“ ise yasak demektir — ikisi karıştırılmamalı.",
      },
      {
        kind: "free",
        prompt:
          "Genç bir arkadaşın ilk kez tek başına yolculuğa çıkıyor. Ona öğüt mektubu yaz: yapması gereken üç şey, çoğu kişinin unuttuğu bir tavsiye, endişelenmesine gerek olmayan bir şey ve sıcak bir kapanış.",
        checklist: [
          "Yapması gereken üç şeyi numaralayarak yaz",
          "Çoğu kişinin unuttuğu bir tavsiyeyi ekle",
          "Gereksiz bir endişeyi adlandır",
          "Sıcak bir kapanış yaz",
        ],
        minWords: 60,
        phrases: [
          { de: "Three things you have to do.", tr: "Yapman gereken üç şey." },
          { de: "One thing you should do …", tr: "Yapman gereken bir şey daha …" },
          { de: "You do not have to worry about …", tr: "… için endişelenmene gerek yok" },
          { de: "Keep … separate from …", tr: "…'i …'den ayrı tut" },
          { de: "Have a wonderful time!", tr: "Harika vakit geçir!" },
        ],
        sample:
          "Dear Mira, I am very glad you are going, and I am going to be annoying for exactly one page. " +
          "Three things you have to do. First, make a copy of your passport and your insurance and put it " +
          "somewhere that is not your bag. Second, tell one person at home your address for each night; not a " +
          "plan, just where you sleep. Third, keep some cash separate from your card, because cards stop working " +
          "at the worst moment, usually on a Sunday. One thing you should do and almost nobody does: you should " +
          "write down the address of your hotel in the local language before you leave the room. Taxi drivers do " +
          "not read your phone screen at night. And one thing you do not have to worry about: being alone at " +
          "dinner. Everybody thinks people are looking at them. Nobody is. Take a book the first two evenings " +
          "and by the third you will not need it. Have a wonderful time, and send me one photo of something " +
          "ugly. Those are the honest ones.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s5",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "One Thing Before School Ends",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: dar bir seçim yap, savun ve iki yaygın öneriyi neden seçmediğini söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Herkesin okuldan çıkmadan önce öğrenmesi gereken tek bir şey ne olurdu? Bir ders adı değil, somut bir beceri seç; savun ve iki yaygın öneriyi neden seçmediğini söyle.",
      bulletsTr: [
        "Ders adı yerine somut bir beceri seç",
        "Neden herkesi ilgilendirdiğini göster",
        "Nasıl öğretilmesi gerektiğini söyle",
        "İki yaygın öneriyi neden seçmediğini açıkla",
      ],
      targets: [
        { de: "I would not choose a subject, because …", tr: "Bir ders seçmezdim, çünkü …" },
        { de: "That sounds narrow, and that is why …", tr: "Kulağa dar geliyor, tam da bu yüzden …" },
        { de: "It should be taught the way … is taught.", tr: "… nasıl öğretiliyorsa öyle öğretilmeli." },
        { de: "People say …, and I agree that …", tr: "İnsanlar … diyor, … olduğuna katılıyorum" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "I would not choose a subject, because subjects are the wrong unit. I would choose one skill: how to " +
        "read a contract. That sounds narrow, and that is why I like it. Everybody signs something before they " +
        "are twenty: a phone contract, a rental agreement, a first job. Most people sign without reading, not " +
        "because they are lazy, but because nobody has ever shown them which four lines actually matter. " +
        "It should be taught the way swimming is taught: with a real document, in a real room, with somebody " +
        "next to you. People say schools should teach cooking or taxes, and I agree that both are useful. " +
        "But you can learn to cook from a friend, and tax rules change every few years. The habit of reading " +
        "before signing lasts.",
      rubricHint:
        "Seçim somut olmalı ve en az bir yaygın öneri gerekçesiyle elenmeli; should ve have to doğal olarak geçebilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g5",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "must, should and have to",
    genre: "Kural",
    intro: "Türkçedeki tek bir „-meli“ eki İngilizcede üçe ayrılır ve olumsuzlarında anlam tümüyle değişir.",
    focus: "must / should / have to ve olumsuzları",
    gloss: [
      { de: "forbidden", tr: "yasak" },
      { de: "decide", tr: "karar vermek" },
      { de: "early", tr: "erken" },
      { de: "law", tr: "yasa" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Zorunluluk kimden geliyor?",
        tr: "Türkçede „gitmeliyim“ tek biçimdir. İngilizcede seçim zorunluluğun kaynağına bağlıdır: dışarıdan bir kural ya da durum varsa „have to“, konuşanın kendi güçlü yargısı ya da yazılı bir kural ise „must“, yalnız tavsiye ise „should“.",
        examples: [
          { de: "In this country you have to carry an ID card.", tr: "Bu ülkede kimlik taşımak zorundasın.", note: "dışarıdan kural" },
          { de: "You must go in person.", tr: "Bizzat gitmen gerekir.", note: "yazılı kural" },
          { de: "You look tired. You should go to bed.", tr: "Yorgun görünüyorsun. Yatmalısın.", note: "tavsiye" },
        ],
      },
      {
        heading: "Biçim farkı",
        tr: "„must“ ve „should“ hiç çekilmez ve arkasından yalın fiil gelir. „have to“ ise normal bir fiil gibi çekilir: has to, had to; soruda ve olumsuzda „do“ gerekir.",
        examples: [
          { de: "She has to work on Saturdays.", tr: "Cumartesileri çalışmak zorunda.", note: "üçüncü tekilde has" },
          { de: "He had to leave early yesterday.", tr: "Dün erken çıkmak zorunda kaldı.", note: "geçmiş biçim" },
          { de: "Do you have to work at the weekend?", tr: "Hafta sonu çalışmak zorunda mısın?" },
        ],
      },
      {
        heading: "En önemli tuzak: olumsuzlar",
        tr: "„mustn't“ ve „don't have to“ birbirinin karşıtıdır. „mustn't“ yasak demektir, „don't have to“ ise gerek yok demektir. Türkçede ikisi de „-me“ ile başlar, bu yüzden sık karışır.",
        examples: [
          { de: "You mustn't smoke here.", tr: "Burada sigara içmek yasak.", note: "yasak" },
          { de: "You don't have to come.", tr: "Gelmek zorunda değilsin.", note: "gerek yok" },
          { de: "It's Sunday. You don't have to get up early.", tr: "Bugün pazar. Erken kalkman gerekmiyor." },
        ],
      },
    ],
    questions: [
      {
        text: "In this country you ___ carry an ID card. It is the law.",
        options: ["have to", "should", "must to"],
        answer: 0,
        explain: "Zorunluluk dışarıdan, yasadan geliyor: have to.",
      },
      {
        text: "You look tired. You ___ go to bed.",
        options: ["should", "have", "must to"],
        answer: 0,
        explain: "Bu bir tavsiye, zorunluluk değil: should + yalın fiil.",
      },
      {
        text: "You ___ smoke here. It is forbidden.",
        options: ["mustn't", "don't have to", "shouldn't"],
        answer: 0,
        explain: "Yasak anlatılıyor; „don't have to“ tam tersini söylerdi.",
      },
      {
        kind: "gapfill",
        text: "It's Sunday. You ___ (not / have to / get up) early.",
        options: [],
        answer: 0,
        accept: ["don't have to get up", "do not have to get up"],
        explain: "Gerek yok anlamı „don't have to“ ile verilir.",
      },
      {
        kind: "gapfill",
        text: "She ___ (have to) work last Saturday.",
        options: [],
        answer: 0,
        accept: ["had to"],
        explain: "„have to“ normal fiil gibi çekilir ve geçmişte „had to“ olur.",
      },
      {
        kind: "gapfill",
        text: "Do you ___ work on Saturdays?",
        options: [],
        answer: 0,
        accept: ["have to"],
        explain: "Soruda „do“ yardımcı fiil olarak gelir ve „have to“ değişmez.",
      },
      {
        kind: "gapfill",
        text: "I think you ___ talk to him before you decide.",
        options: [],
        answer: 0,
        accept: ["should"],
        explain: "„I think“ ile başlayan bir tavsiye: should.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["You", "should", "write", "the", "address", "down"],
        explain: "„should“ arkasından yalın fiil alır; ayrılabilen fiilin ikinci parçası sona gider.",
      },
      {
        kind: "truefalse",
        text: "„You mustn't come“ ile „You don't have to come“ aynı anlama gelir.",
        options: ["True", "False"],
        answer: 1,
        explain: "İlki „gelme, yasak“, ikincisi „gelmek zorunda değilsin“ demektir.",
      },
      {
        kind: "truefalse",
        text: "„He had to leave early yesterday.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„have to“ geçmişte „had to“ olur ve arkasından yalın fiil gelir; cümle doğru.",
      },
    ],
  },
];
