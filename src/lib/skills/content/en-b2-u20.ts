import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 20 — "Aralığa kadar, tutmayan kredi, sözleşme
 * karşılasaydı, maaş konuşması".
 *
 * Dört ders: By December · The loan that failed ·
 * If the contract had covered it · The salary conversation.
 *
 *   Kelime: due date, late fee, retroactive, creditor, mortgage,
 *           interest-free, debtor, seizure, costly, uncovered,
 *           proportional, parental leave, maternity leave,
 *           occupational safety.
 *   Kalıp:  By December we will have saved enough to pay off the loan. ·
 *           Next month we will be preparing for the due date. ·
 *           By the payment deadline we will have decided how to use up the rest. ·
 *           The creditor must have warned them. ·
 *           They can't have signed the mortgage alone. ·
 *           We should have asked for an interest-free plan. ·
 *           If the liability insurance had covered it, we would have paid nothing. ·
 *           If the pension insurance had started earlier, the company pension would be higher now. ·
 *           If the retirement savings had grown, we would have stopped working. ·
 *           It seems to be proportional. ·
 *           Apparently the raise was refused for operational reasons. ·
 *           On balance the work-life balance is arguably the point.
 *
 * Ünitenin tek öğretme noktası SORU SÖZCÜĞÜ + MASTAR. „decided how to use
 * up the rest“ — bütün bir cümlecik iki sözcüğe katlanıyor: özne yok,
 * zaman yok, ikisini de ana cümle veriyor. Aynı kalıp „what to say“,
 * „where to go“, „whether to pay“ için de çalışıyor, ama yalnız soru
 * tutabilen fiillerden sonra: „hope how to do it“ diye bir şey yok.
 */
export const enB2U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u20-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 20,
    title: "A family savings plan",
    genre: "blog",
    intro: "Bir ailenin kredi borcunu kapatma planı. Aralığa kadar ne yapmış olacaklar?",
    gloss: [
      { de: "renovate", tr: "yenilemek" },
      { de: "a membership", tr: "üyelik" },
      { de: "an installment", tr: "taksit" },
      { de: "an emergency", tr: "acil durum" },
    ],
    minutes: 9,
    text:
      "OUR PLAN TO PAY OFF THE LOAN BY DECEMBER\n" +
      "Two years ago we borrowed 12,000 euros to renovate the kitchen. The loan has cost us more than we expected, and this spring we finally sat down to decide what to do about it.\n" +
      "The plan is simple. By December we will have saved enough to pay off the loan. We are putting 700 euros a month into a separate account, and my partner Callum has taken on some weekend work until the summer.\n" +
      "Next month we will be preparing for the due date of the last big installment. The bank charges a late fee of 40 euros, so we have written the date on the calendar in red.\n" +
      "The hard part was knowing where to start. We did not know whether to pay the loan off early or to keep some money for emergencies. In the end we asked a free advice service, and the adviser showed us how to compare the two options on one page.\n" +
      "We also had to decide what to give up. We will be cooking at home five days a week, and the gym membership has gone.\n" +
      "By the payment deadline we will have decided how to use up the rest. If everything goes to plan, about 300 euros will be left, and the children want to know where to go on vacation with it.\n" +
      "I am not sure yet what to tell them. But for the first time in two years, I know exactly when we will be free.",
    questions: [
      {
        text: "Why did they borrow the money?",
        options: ["to renovate the kitchen", "to buy a car", "to go on vacation"],
        answer: 0,
        explain: "„Two years ago we borrowed 12,000 euros to renovate the kitchen.“",
      },
      {
        text: "How much do they save each month?",
        options: ["700 euros", "300 euros", "40 euros"],
        answer: 0,
        explain: "„We are putting 700 euros a month into a separate account…“",
      },
      {
        kind: "truefalse",
        text: "The family used a free advice service.",
        options: ["True", "False"],
        answer: 0,
        explain: "„In the end we asked a free advice service…“",
      },
      {
        kind: "gapfill",
        text: "By December we will have saved enough to pay ___ the loan.",
        options: [],
        answer: 0,
        accept: ["off"],
        explain: "„By December we will have saved enough to pay off the loan.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "They borrowed money for the kitchen.",
          "They made a plan this spring.",
          "They asked a free advice service.",
          "The children want to go on vacation.",
        ],
        explain: "Borç, plan, danışmanlık, en sonda artan paranın ne olacağı.",
      },
      {
        kind: "short_answer",
        text: "What will the money that is left probably be used for?",
        options: [],
        answer: 0,
        accept: ["a vacation", "vacation", "going on vacation"],
        explain: "„the children want to know where to go on vacation with it.“",
      },
    ],
  },
  {
    id: "en-b2-u20-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 20,
    title: "A letter about a pension",
    genre: "letter",
    intro: "Bir okur mektubu ve para köşesinin cevabı. Sevgi neden endişeli, ona ne öneriliyor?",
    gloss: [
      { de: "burst", tr: "patlamak" },
      { de: "independent", tr: "bağımsız" },
      { de: "a policy", tr: "poliçe" },
      { de: "a ceiling", tr: "tavan" },
      { de: "a pipe", tr: "boru" },
    ],
    minutes: 9,
    text:
      "MONEY MATTERS: READERS ASK\n" +
      "Dear Money Matters,\n" +
      "I am 58 and I have started to worry. Two years ago a pipe burst in our apartment and damaged the ceiling of the apartment below. If the liability insurance had covered it, we would have paid nothing. It did not, because we had canceled the policy a year earlier to save money, and the repair cost us 6,000 euros.\n" +
      "Then there is my pension. I started working at 25, but for the first ten years I worked for myself and paid almost nothing into the pension insurance. If the pension insurance had started earlier, the company pension would be higher now. My statement says I will get 1,100 euros a month.\n" +
      "My husband says that if the retirement savings had grown, we would have stopped working already. I think that is just a dream. What can we still do?\n" +
      "Norah, Ankara\n" +
      "Dear Norah,\n" +
      "Thank you for your honest letter. You are not alone: if more people had asked these questions at 40, fewer of them would be worried now.\n" +
      "First, the insurance. Liability insurance is cheap and a single accident can be costly, so please take out a new policy this week.\n" +
      "Second, the pension. You cannot change the past, but you can still make extra payments for the next seven years, and your pension will grow in proportion to them. If you had started at 50, the effect would be bigger now, but it is not too late.\n" +
      "Finally, talk to an independent adviser before you make any decision. Many banks offer a free first meeting.",
    questions: [
      {
        text: "Why did the insurance not pay for the damage?",
        options: ["They had canceled the policy.", "The neighbors refused.", "The pipe was too old."],
        answer: 0,
        explain: "„we had canceled the policy a year earlier to save money…“",
      },
      {
        text: "How much will Norah get from her pension?",
        options: ["1,100 euros a month", "6,000 euros a month", "40 euros a month"],
        answer: 0,
        explain: "„My statement says I will get 1,100 euros a month.“",
      },
      {
        kind: "truefalse",
        text: "The adviser says it is too late to do anything.",
        options: ["True", "False"],
        answer: 1,
        explain: "„but it is not too late.“",
      },
      {
        kind: "gapfill",
        text: "If the pension insurance had started earlier, the company pension would be ___ now.",
        options: [],
        answer: 0,
        accept: ["higher"],
        explain: "„If the pension insurance had started earlier, the company pension would be higher now.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A pipe burst in the apartment.",
          "Norah worked for herself for ten years.",
          "The column recommends new liability insurance.",
          "Norah should talk to an independent adviser.",
        ],
        explain: "Hasar, emeklilik geçmişi, sigorta önerisi, en sonda danışman önerisi.",
      },
      {
        kind: "short_answer",
        text: "When should Norah take out a new policy?",
        options: [],
        answer: 0,
        accept: ["this week", "now"],
        explain: "„please take out a new policy this week.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u20-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 20,
    title: "A file on a failed loan",
    genre: "dialogue",
    intro: "İki borç danışmanı evini kaybeden bir çiftin dosyasını inceliyor. Ne olmuş olmalı?",
    gloss: [
    ],
    minutes: 7,
    segments: [
      { speaker: "Brian", text: "Have you looked at the Nolan file? The couple who lost their house." },
      { speaker: "Diana", text: "I have. The creditor must have warned them. There is a letter in the file from March, and nobody answered it." },
      { speaker: "Brian", text: "Maybe they never received it. They moved twice last year." },
      { speaker: "Diana", text: "They can't have missed all of them. The bank sent three letters and called twice." },
      { speaker: "Brian", text: "And the mortgage? Mrs. Nolan says she never agreed to it." },
      { speaker: "Diana", text: "They can't have signed the mortgage alone. The form needs two signatures, and both are there." },
      { speaker: "Brian", text: "So she must have signed it without reading it." },
      { speaker: "Diana", text: "Probably. Or somebody must have explained it badly. The interest rate went up after two years, and I doubt anyone told them." },
      { speaker: "Brian", text: "Could the seizure have been stopped?" },
      { speaker: "Diana", text: "Yes. They should have asked for an interest-free plan when the first late fee arrived. Most banks offer one." },
      { speaker: "Brian", text: "And we should have seen them earlier. They called our office in January." },
      { speaker: "Diana", text: "I know. That one is on us. Let us make sure it does not happen again." },
    ],
    questions: [
      {
        text: "How many letters did the bank send?",
        options: ["three", "two", "one"],
        answer: 0,
        explain: "„The bank sent three letters and called twice.“",
      },
      {
        text: "What should the couple have asked for?",
        options: ["an interest-free plan", "a new mortgage", "a second signature"],
        answer: 0,
        explain: "„They should have asked for an interest-free plan when the first late fee arrived.“",
      },
      {
        kind: "truefalse",
        text: "The couple called the office in January.",
        options: ["True", "False"],
        answer: 0,
        explain: "„They called our office in January.“",
      },
      {
        kind: "gapfill",
        text: "They can't have signed the ___ alone.",
        options: [],
        answer: 0,
        accept: ["mortgage"],
        explain: "„The form needs two signatures, and both are there.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The creditor must have warned them.", "The creditor must have warned them"],
        explain: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "short_answer",
        text: "How many times did the couple move last year?",
        options: [],
        answer: 0,
        accept: ["twice", "two times"],
        explain: "„They moved twice last year.“",
      },
    ],
  },
  {
    id: "en-b2-u20-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 20,
    title: "Advice before a salary talk",
    genre: "monologue",
    intro: "Maaş görüşmesinden önce bırakılan bir sesli mesaj. Charlie neye dikkat etmeli?",
    gloss: [
      { de: "a phrase", tr: "ifade" },
      { de: "concrete", tr: "somut" },
      { de: "a profit", tr: "kâr" },
      { de: "a hedge", tr: "çekince" },
      { de: "the works council", tr: "işçi temsilciliği" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Joanna", text: "Hi Charlie, it is Joanna from the works council. You asked me for tips before your salary talk on Thursday, so here is a quick voice message." },
      { speaker: "Joanna", text: "First, the numbers. Your raise last year seems to be proportional to the others in your team, but only just. Bring the figures, and let them speak." },
      { speaker: "Joanna", text: "Apparently your raise was refused for operational reasons last spring. Ask them what those reasons were. That phrase usually means nothing concrete." },
      { speaker: "Joanna", text: "On balance, the work-life balance is arguably the point for you, not only the money. You mentioned parental leave next year, so ask about that too." },
      { speaker: "Joanna", text: "It seems that the company is doing well this year. Profits are apparently up, so you are not asking at a bad moment." },
      { speaker: "Joanna", text: "Be careful with too many hedges, though. Say what you want clearly: a five percent raise, or four percent plus one day of remote work." },
      { speaker: "Joanna", text: "And if they say no, ask when you can talk again. Call me after the meeting. Good luck." },
    ],
    questions: [
      {
        text: "When is the salary talk?",
        options: ["on Thursday", "next spring", "on Monday"],
        answer: 0,
        explain: "„You asked me for tips before your salary talk on Thursday…“",
      },
      {
        text: "What should Charlie ask about besides money?",
        options: ["parental leave", "a new office", "a company car"],
        answer: 0,
        explain: "„You mentioned parental leave next year, so ask about that too.“",
      },
      {
        kind: "truefalse",
        text: "Joanna thinks this is a bad moment to ask for a raise.",
        options: ["True", "False"],
        answer: 1,
        explain: "„so you are not asking at a bad moment.“",
      },
      {
        kind: "gapfill",
        text: "On balance, the work-life balance is arguably the ___ for you.",
        options: [],
        answer: 0,
        accept: ["point"],
        explain: "„On balance, the work-life balance is arguably the point for you, not only the money.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Apparently your raise was refused for operational reasons last spring.",
          "Apparently your raise was refused for operational reasons last spring",
        ],
        explain: "„Apparently“ bilginin başkasından geldiğini gösteriyor.",
      },
      {
        kind: "short_answer",
        text: "What should Charlie do after the meeting?",
        options: [],
        answer: 0,
        accept: ["call Joanna", "call her", "phone Joanna"],
        explain: "„Call me after the meeting.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u20-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 20,
    title: "Paying off the loan",
    genre: "info",
    intro: "Kredi borcunu kapatma planı için notlar: ne zaman neyi başarmış olacağız?",
    gloss: [
      { de: "how to use up", tr: "nasıl kullanacağını" },
      { de: "enough to pay off", tr: "ödeyecek kadar" },
      { de: "will be preparing", tr: "hazırlanıyor olacak" },
      { de: "must have warned", tr: "uyarmış olmalı" },
      { de: "loan", tr: "kredi" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Son ödeme tarihine kadar gerisini nasıl kullanacağımıza karar vermiş olacağız.",
        answer: "By the payment deadline we will have decided how to use up the rest.",
        hint: "Soru sözcüğü + mastar: özne de zaman da düşüyor.",
      },
      {
        kind: "build",
        tr: "Aralığa kadar krediyi ödeyecek kadar birikim yapmış olacağız.",
        answer: "By December we will have saved enough to pay off the loan.",
        hint: "„enough to“ da bir katlama; öznesi ana cümleden geliyor.",
      },
      {
        kind: "build",
        tr: "Gelecek ay vade tarihine hazırlanıyor olacağız.",
        answer: "Next month we will be preparing for the due date.",
        hint: "Katlama yok; sürekli biçim.",
      },
      {
        kind: "build",
        tr: "Alacaklı onları uyarmış olmalı.",
        answer: "The creditor must have warned them.",
        hint: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Aile bütçesi için ödeme planı kartını doldur.",
        facts: "Aralığa kadar krediyi ödeyecek kadar birikim yapmış olacağız; her ay 700 avro ayırıyoruz; gelecek ay son büyük taksite hazırlanıyor olacağız; gecikme ücreti 40 avro; kalan parayı nasıl kullanacağımıza son ödeme tarihine kadar karar vermiş olacağız.",
        fields: [
          { label: "Loan paid off by", answer: "December", accept: ["in December", "by December"] },
          { label: "Saved per month", answer: "700 euros", accept: ["700", "700 euros a month"] },
          { label: "Next month", answer: "preparing for the due date", accept: ["the due date", "preparing"] },
          { label: "Late fee", answer: "40 euros", accept: ["40"] },
          { label: "The rest", answer: "decided by the deadline", accept: ["by the payment deadline", "by the deadline"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u20-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 20,
    title: "Money mistakes",
    genre: "opinion",
    intro: "Para hataları üzerine bir yazı için cümleler: neyi farklı yapmalıydık?",
    gloss: [
      { de: "can't have signed", tr: "imzalamış olamaz" },
      { de: "should have asked", tr: "istememiz gerekirdi" },
      { de: "would have paid", tr: "öderdik" },
      { de: "would be higher", tr: "daha yüksek olurdu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İpoteği tek başlarına imzalamış olamazlar.",
        answer: "They can't have signed the mortgage alone.",
        hint: "Olumsuzu „can't have“.",
      },
      {
        kind: "build",
        tr: "Faizsiz bir plan istememiz gerekirdi.",
        answer: "We should have asked for an interest-free plan.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Sorumluluk sigortası karşılasaydı hiçbir şey ödemezdik.",
        answer: "If the liability insurance had covered it, we would have paid nothing.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Emeklilik sigortası daha erken başlasaydı şirket emekli maaşı şimdi daha yüksek olurdu.",
        answer: "If the pension insurance had started earlier, the company pension would be higher now.",
        hint: "Karışık koşul: sonuç bu ayın ekstresinde.",
      },
      {
        kind: "build",
        tr: "Orantılı gibi görünüyor.",
        answer: "It seems to be proportional.",
        hint: "Tek çekince yeter.",
      },
    ],
  },
];
