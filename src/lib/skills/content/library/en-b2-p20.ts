import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 20.
 *
 * Hücreyi YİRMİYE tamamlayan son parti (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 20 kişisel veri hattı: sadakat kartının gerçekte neyi satın aldığı
 * üzerine bir deneme, market verisini isteyen birinin anlattıkları, bir web
 * sitesi için tartışmacı deneme. Dil bilgisi derecelenen ve derecelenemeyen
 * sıfatlar ve derece zarfları — very/extremely, absolutely/completely,
 * quite, fairly, rather (A2'deki too/enough/very'nin ötesi).
 */
export const enB2P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r20",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "What Your Loyalty Card Actually Buys",
    genre: "essay",
    intro: "Bir deneme: sadakat kartı basit bir indirim takası mı, yoksa karşılığında verilen şey sanılandan fazla mı?",
    gloss: [
      { de: "loyalty card", tr: "sadakat kartı" },
      { de: "custom", tr: "müşterilik" },
      { de: "incomplete", tr: "eksik" },
      { de: "budget", tr: "bütçe" },
      { de: "to indicate", tr: "işaret etmek" },
      { de: "pregnancy", tr: "hamilelik" },
      { de: "purpose", tr: "amaç" },
      { de: "personalized", tr: "kişiye özel" },
      { de: "invisible", tr: "görünmez" },
      { de: "trade", tr: "takas" },
      { de: "deal", tr: "fırsat" },
    ],
    minutes: 8,
    text:
      "What your loyalty card actually buys\n\n" +
      "Most people think of a loyalty card as a fairly simple exchange: the shop gives you a " +
      "small discount, and you give the shop your custom. That description is not wrong, but it " +
      "is incomplete. What you are really handing over is a detailed record of how you live.\n\n" +
      "A year of shopping data says a great deal. It shows roughly how many people live in your " +
      "home, whether any of them are small children, how often you cook, and when your budget " +
      "gets tight. Researchers have found that a sudden change in what somebody buys can " +
      "indicate a new job, a pregnancy or an illness, sometimes before the person has told " +
      "anyone.\n\n" +
      "Supermarkets argue, quite reasonably, that most of this is used for ordinary purposes: " +
      "deciding how much bread to order, or which offers to send to whom. And the discounts are " +
      "real. For a household on a tight budget, card prices can make a noticeable difference " +
      "over a year.\n\n" +
      "The more difficult question is what happens next. In many cases the data is shared with " +
      "partner companies or used to set personalized prices, where two customers are offered " +
      "different deals on the same product. This is perfectly legal in most places, and almost " +
      "completely invisible to the customer.\n\n" +
      "None of this means you should cut up your card. It does mean the trade deserves a clearer " +
      "description. If the shop is paying you for information, you are entitled to know what the " +
      "information is worth, who else sees it, and how to take it back.",
    questions: [
      {
        text: "What does the writer say we are really handing over?",
        options: [
          "a record of how we live",
          "a small fee every month",
          "only our home address",
        ],
        answer: 0,
        explain: "„What you are really handing over is a detailed record of how you live.“",
      },
      {
        text: "What can a sudden change in someone's shopping indicate?",
        options: [
          "a price rise in the shop",
          "a move to another supermarket",
          "a new job or an illness",
        ],
        answer: 2,
        explain: "Alışverişteki ani bir değişiklik yeni bir işe, hamileliğe ya da hastalığa işaret edebilir.",
      },
      {
        kind: "truefalse",
        text: "The writer accepts that card prices can help households on a tight budget.",
        options: ["True", "False"],
        answer: 0,
        explain: "„card prices can make a noticeable difference over a year“.",
      },
      {
        kind: "gapfill",
        text: "With personalized prices, two customers are offered different ___ on the same product.",
        options: [],
        answer: 0,
        accept: ["deals", "prices", "offers"],
        explain: "„two customers are offered different deals on the same product“.",
      },
      {
        kind: "short_answer",
        text: "According to supermarkets, what is most of the data used for?",
        options: [],
        answer: 0,
        accept: ["ordinary purposes", "for ordinary purposes", "ordering and offers", "ordering bread and sending offers", "deciding what to order", "deciding how much bread to order"],
        explain: "Ne kadar ekmek sipariş edileceği ya da kime hangi teklifin gideceği gibi sıradan işler.",
      },
      {
        text: "What does the writer want in the end?",
        options: [
          "a ban on loyalty cards",
          "a clearer account of the trade",
          "higher discounts for all",
        ],
        answer: 1,
        explain: "Kartı kesmek değil; takasın daha açık anlatılmasını istiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l20",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Eleven Thousand Rows",
    genre: "dialogue",
    intro: "İki arkadaş konuşuyor: biri marketten sadakat kartı verisini istemiş; gelen tabloda ne vardı, şimdi ne yapacak?",
    gloss: [
      { de: "eventually", tr: "sonunda" },
      { de: "spreadsheet", tr: "hesap tablosu" },
      { de: "row", tr: "satır" },
      { de: "exhausting", tr: "yorucu" },
      { de: "life stage", tr: "yaşam evresi" },
      { de: "nappy", tr: "bebek bezi" },
      { de: "voucher", tr: "kupon" },
      { de: "privacy notice", tr: "gizlilik bildirimi" },
      { de: "significant", tr: "önemli" },
      { de: "to delete", tr: "silmek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Mr Halloran", text: "You said you'd asked the supermarket for all the data on your loyalty card. Did they actually send it?" },
      { speaker: "Ms Quinn", text: "Eventually. It took them almost the full month they're allowed, and it arrived as a spreadsheet with about eleven thousand rows. Every single item I've bought since 2019." },
      { speaker: "Mr Halloran", text: "That sounds absolutely exhausting to read. Did you actually go through it all? Was any of it surprising?" },
      { speaker: "Ms Quinn", text: "Quite a lot, actually. There was a column called “life stage”, and it had me down as a young parent, which is completely wrong. I buy nappies for my sister." },
      { speaker: "Mr Halloran", text: "So they'd simply guessed. Does that really matter, if it's only used for vouchers?" },
      { speaker: "Ms Quinn", text: "That's the thing: it isn't only vouchers. The privacy notice says profiles can be shared with “carefully selected partners”. It doesn't say who they are, or what they pay for it." },
      { speaker: "Mr Halloran", text: "Are you going to cancel the card, then?" },
      { speaker: "Ms Quinn", text: "I thought about it, but the discount is worth about three hundred a year, which is fairly significant. So I've asked them to delete the profile and stop sharing it." },
      { speaker: "Mr Halloran", text: "And did they agree to that?" },
      { speaker: "Ms Quinn", text: "They said the request is being reviewed, which could mean anything. I'll believe it when the next spreadsheet arrives and that column is empty." },
    ],
    questions: [
      {
        text: "How long did the supermarket take to send the data?",
        options: ["about a week", "almost a month", "more than a year"],
        answer: 1,
        explain: "„It took them almost the full month they're allowed“.",
      },
      {
        text: "Why was the “life stage” column wrong?",
        options: [
          "She buys nappies for her sister.",
          "She has two young children.",
          "She had never used the card.",
        ],
        answer: 0,
        explain: "Onu genç bir ebeveyn saymışlar; oysa bebek bezini kız kardeşi için alıyor.",
      },
      {
        kind: "truefalse",
        text: "Ms Quinn has decided to keep using the card.",
        options: ["True", "False"],
        answer: 0,
        explain: "İndirim yılda üç yüz ettiği için kartı tutuyor; profilin silinmesini istiyor.",
      },
      {
        kind: "gapfill",
        text: "The spreadsheet had about eleven thousand ___.",
        options: [],
        answer: 0,
        accept: ["rows"],
        explain: "„a spreadsheet with about eleven thousand rows“.",
      },
      {
        kind: "short_answer",
        text: "What has Ms Quinn asked the supermarket to do?",
        options: [],
        answer: 0,
        accept: ["delete the profile", "delete her profile", "delete the profile and stop sharing it", "delete the profile and stop sharing", "delete it and stop sharing", "delete it and stop sharing it", "stop sharing it"],
        explain: "Profili silmelerini ve paylaşmayı durdurmalarını istemiş.",
      },
      {
        text: "What does the privacy notice not say?",
        options: [
          "how long data is kept",
          "how to cancel the card",
          "who the partners are",
        ],
        answer: 2,
        explain: "„It doesn't say who they are, or what they pay for it.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w20",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Is a Discount Worth Your Data?",
    genre: "essay",
    intro: "Bir web sitesi için kısa bir deneme yazıyorsun: önce iki cümle kur, sonra iki tarafı tartıp gerekçeli bir konum al.",
    gloss: [
      { de: "basket", tr: "sepet" },
      { de: "saving", tr: "tasarruf" },
      { de: "foolish", tr: "akılsız" },
      { de: "stock", tr: "stok" },
      { de: "remarkably", tr: "dikkat çekici biçimde" },
      { de: "revealing", tr: "ele veren" },
      { de: "harmless", tr: "zararsız" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "İndirim oldukça küçük ama bilgi son derece değerli.",
        answer: "The discount is fairly small, but the information is extremely valuable.",
        alternatives: ["The information is extremely valuable, but the discount is fairly small."],
        hint: "Derecelenen sıfatlar „fairly“, „quite“ ve „extremely“ ile yumuşar ya da güçlenir.",
      },
      {
        kind: "build",
        tr: "Müşteri için bu neredeyse tamamen görünmez.",
        answer: "For the customer, this is almost completely invisible.",
        alternatives: ["This is almost completely invisible for the customer."],
        hint: "Derecelenemeyen sıfatlar „very“ değil „completely“ ya da „absolutely“ alır.",
      },
      {
        kind: "free",
        prompt:
          "Bir web sitesi için kısa bir deneme yaz: „Bir indirim verilerine değer mi?“ sorusunu tart; iki tarafın gerekçesini ver, somut bir örnek kullan, kendi konumunu gerekçesiyle söyle ve okura uygulanabilir bir öneri bırak.",
        checklist: [
          "Soruyu ve ilk bakıştaki cevabı ortaya koy",
          "İki tarafın gerekçesini ver",
          "Somut bir örnek kullan",
          "Konumunu söyle ve uygulanabilir bir öneri bırak",
        ],
        minWords: 130,
        phrases: [
          { de: "At first sight, the answer seems obvious: …", tr: "İlk bakışta cevap açık görünüyor: …", en: "" },
          { de: "On the one hand, …; on the other, …", tr: "Bir yandan …; öte yandan …", en: "" },
          { de: "A good example is …", tr: "İyi bir örnek …", en: "" },
          { de: "On balance, I would argue that …", tr: "Her şeyi tartınca … diyebilirim", en: "" },
          { de: "If you decide to keep your card, …", tr: "Kartını tutmaya karar verirsen …", en: "" },
        ],
        sample:
          "At first sight, the answer seems obvious: a discount is money, and most of us have " +
          "nothing to hide in our shopping baskets. For many households, card prices are a " +
          "genuinely useful saving, and it would be rather unfair to call people foolish for " +
          "taking them. " +
          "On the one hand, the data is mostly used for fairly ordinary things, such as ordering " +
          "stock and sending offers. On the other, shopping records are remarkably revealing, and " +
          "customers are rarely told who else receives them. " +
          "A good example is a woman who requested her own data and found herself listed as a " +
          "parent, which was completely wrong, and then read that her profile could be passed to " +
          "unnamed partners. The mistake was harmless; the sharing was not. " +
          "On balance, I would argue that the discount can be worth it, but only when the terms " +
          "are absolutely clear. At the moment, they usually are not. " +
          "If you decide to keep your card, ask for your data once a year, read the section on " +
          "sharing, and switch off anything you did not choose.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s20",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Personal Prices Be Allowed?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir uygulamanın kime yaradığını kabul et ve sorunun tam yerini göster.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Mağazalar aynı ürüne farklı müşterilere farklı fiyat verebilmeli mi? Konumunu söyle, bunun kimin işine yaradığını dürüstçe kabul et, sorunun tam olarak nerede başladığını göster ve bir kural öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Kimin işine yaradığını dürüstçe kabul et",
        "Sorunun nerede başladığını göster",
        "Bir kural öner",
      ],
      targets: [
        { de: "I find the idea deeply uncomfortable, although …", tr: "Fikri derinden rahatsız edici buluyorum, gerçi …" },
        { de: "To be completely honest, it does help …", tr: "Tamamen dürüst olmak gerekirse, … işine yarıyor" },
        { de: "Where it becomes a real problem is …", tr: "Gerçek bir soruna dönüştüğü yer …" },
        { de: "At the very least, shops should have to …", tr: "En azından mağazalar … zorunda olmalı" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I find the idea deeply uncomfortable, although I accept that it isn't entirely new. " +
        "Markets have always charged tourists more, and nobody thinks a student discount is " +
        "unfair. " +
        "To be completely honest, it does help some people. A shopper who is clearly struggling " +
        "may be offered a lower price on basics, and a shop can sell food before it goes off by " +
        "targeting the people most likely to buy it. Those are fairly reasonable uses. " +
        "Where it becomes a real problem is when the price depends on things the customer cannot " +
        "see and would never agree to. If a system has worked out that you are too busy to " +
        "compare prices, or that you always buy the same brand, it can charge you slightly more " +
        "every week, and you will never find out. That isn't a discount for some; it's a quiet " +
        "penalty for others. " +
        "At the very least, shops should have to show the standard price next to any personal " +
        "one, so that everybody can see what they are being offered, and why.",
      rubricHint:
        "Karşı tarafın kazancını dürüstçe kabul etme, sorunun sınırını gösterme ve somut bir kural beklenir; „to be completely honest“ ve „where it becomes a real problem“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g20",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "very useful, completely invisible",
    genre: "grammar",
    intro: "Bazı sıfatlar derece alır (useful, cold), bazıları zaten bir ucu anlatır (invisible, freezing); hangi zarfın hangisiyle gittiği anlamı belirler.",
    focus: "Derecelenen ve derecelenemeyen sıfatlar; derece zarfları: very/extremely, absolutely/completely, quite, fairly, rather",
    gloss: [
      { de: "valuable", tr: "değerli" },
      { de: "invisible", tr: "görünmez" },
      { de: "discount", tr: "indirim" },
      { de: "useful", tr: "yararlı" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "İki tür sıfat",
        tr: "Derecelenen sıfatlar bir ölçek üzerinde durur ve „very“, „extremely“, „a bit“ alır: very cold, extremely useful. Derecelenemeyen sıfatlar zaten ucu anlatır (freezing, perfect, impossible, invisible) ve „very“ ALMAZ; onlarla „absolutely“, „completely“, „totally“ kullanılır.",
        examples: [
          { de: "The discount is extremely useful.", tr: "İndirim son derece yararlı.", note: "derecelenen" },
          { de: "The sharing is completely invisible to customers.", tr: "Paylaşım müşteriler için tamamen görünmez.", note: "derecelenemeyen" },
          { de: "It was absolutely freezing outside.", tr: "Dışarısı buz gibiydi.", note: "very freezing değil" },
        ],
      },
      {
        heading: "quite: iki anlam",
        tr: "„quite“ derecelenen sıfatla „oldukça, epey“ anlamına gelir ve etkiyi yumuşatır: quite good. Derecelenemeyen sıfatla ise „tamamen“ anlamına gelir: quite right, quite impossible. Aynı sözcük sıfata göre ters yönde çalışır.",
        examples: [
          { de: "The information is quite valuable.", tr: "Bilgi epey değerli.", note: "oldukça" },
          { de: "You're quite right about the data.", tr: "Veri konusunda tamamen haklısın.", note: "tamamen" },
          { de: "That is quite impossible.", tr: "Bu kesinlikle imkânsız.", note: "tamamen" },
        ],
      },
      {
        heading: "fairly, rather, pretty",
        tr: "Üçü de „oldukça“ der ama tonları farklıdır. „fairly“ en nötrüdür ve olumlu bir yargıyı hafifletir. „rather“ beklenenden fazla olduğunu, çoğu zaman olumsuz bir şeyi vurgular. „pretty“ konuşma dilidir.",
        examples: [
          { de: "The discount is fairly small.", tr: "İndirim oldukça küçük.", note: "nötr" },
          { de: "The terms were rather confusing.", tr: "Koşullar epey kafa karıştırıcıydı.", note: "beklenenden fazla" },
          { de: "The app is pretty easy to use.", tr: "Uygulamanın kullanımı epey kolay.", note: "konuşma dili" },
        ],
      },
    ],
    questions: [
      {
        text: "The sharing is ___ invisible to customers.",
        options: ["very", "extremely", "completely"],
        answer: 2,
        explain: "„invisible“ derecelenemez; „completely“ ya da „absolutely“ alır.",
      },
      {
        text: "The discount is ___ useful for families on a tight budget.",
        options: ["extremely", "absolutely", "totally"],
        answer: 0,
        explain: "„useful“ derecelenen bir sıfattır; „extremely“ ile güçlenir.",
      },
      {
        text: "In “You're quite right”, what does “quite” mean?",
        options: ["a little", "completely", "not really"],
        answer: 1,
        explain: "Derecelenemeyen sıfatla „quite“ „tamamen“ anlamına gelir.",
      },
      {
        kind: "gapfill",
        text: "It was ___ freezing outside. (absolute)",
        options: [],
        answer: 0,
        accept: ["absolutely"],
        explain: "„freezing“ derecelenemez; „absolutely“ ile vurgulanır.",
      },
      {
        kind: "gapfill",
        text: "The terms were ___ confusing, much more than I expected. (rather / fairly)",
        options: [],
        answer: 0,
        accept: ["rather"],
        explain: "Beklenenden fazla ve olumsuz bir durum „rather“ ile vurgulanır.",
      },
      {
        kind: "gapfill",
        text: "The app is ___ easy to use. (informal)",
        options: [],
        answer: 0,
        accept: ["pretty", "quite", "fairly"],
        explain: "Konuşma dilinde „oldukça“ anlamını „pretty“ verir.",
      },
      {
        kind: "gapfill",
        text: "That is quite ___; it simply can't be done. (possible)",
        options: [],
        answer: 0,
        accept: ["impossible"],
        explain: "„quite“ derecelenemeyen „impossible“ ile „tamamen“ anlamı taşır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The sharing", "is", "completely", "invisible", "to customers"],
        explain: "Derece zarfı sıfatın hemen önüne gelir.",
      },
      {
        kind: "truefalse",
        text: "„The sharing is very invisible.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Derecelenemeyen sıfat „very“ almaz: „completely invisible“ olmalı.",
      },
      {
        kind: "truefalse",
        text: "„The discount is fairly small.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„small“ derecelenen bir sıfattır ve „fairly“ ile yumuşatılabilir.",
      },
    ],
  },
];
