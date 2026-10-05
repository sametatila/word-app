import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 18 — "Betimleseydi, beğenmediğini söylemek, maliyet
 * raporu, şirket raporu".
 *
 * Dört ders: If she had portrayed it · Saying you disliked it ·
 * The cost report · The company report.
 *
 *   Kelime: portray, grand, depiction, elegant, stylish, picturesque,
 *           gorgeous, breathtaking, counterargument, convincing, tact,
 *           politeness, moderation, bookkeeping, expansion, profitability,
 *           speculation, pricing, restructure.
 *   Kalıp:  If she had portrayed the room, the work would have been grand. ·
 *           If the depiction had been more elegant, the hall would be full now. ·
 *           If the set had been stylish, the play would have lasted. ·
 *           It seems to be an opposing view. ·
 *           Apparently the counterargument is convincing. ·
 *           On balance the ending is arguably weak. ·
 *           The preparation of the cost estimate took a week. ·
 *           The checking of the bookkeeping is monthly. ·
 *           The approval of the budget plan is pending. ·
 *           The expansion is said to be paused. ·
 *           The profitability is expected to fall. ·
 *           The business model is thought to have changed.
 *
 * Ünitenin tek öğretme noktası İSİM + İSİM BİLEŞİĞİ. „cost estimate“,
 * „budget plan“, „income tax“ — iki isim, arada hiçbir şey yok, ve
 * soldaki sağdakini niteliyor. İki kural birlikte geliyor: SIRA anlamı
 * belirliyor („a cost estimate“ ile „an estimate cost“ aynı şey değil) ve
 * soldaki isim TEKİL kalıyor, çoğul da iyelik de sağdakine takılıyor.
 */
export const enB2U18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u18-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 18,
    title: "The renovation cost report",
    genre: "report",
    intro: "Ofis tadilatının maliyet raporu. Bütçe neden aşıldı, karar kimde?",
    gloss: [
      { de: "a renovation", tr: "tadilat" },
      { de: "management", tr: "yönetim" },
      { de: "total", tr: "toplam" },
      { de: "furniture", tr: "mobilya" },
      { de: "construction", tr: "inşaat" },
      { de: "finance", tr: "finans" },
      { de: "an error", tr: "hata" },
      { de: "reduce", tr: "küçültmek" },
      { de: "a cancellation fee", tr: "iptal ücreti" },
      { de: "an overview", tr: "genel bakış" },
      { de: "facilities", tr: "tesis yönetimi" },
      { de: "a supplier", tr: "tedarikçi" },
      { de: "the air conditioning", tr: "klima" },
    ],
    minutes: 9,
    text:
      "COST REPORT: OFFICE RENOVATION, SECOND FLOOR\n" +
      "Prepared for the management board, 12 May\n" +
      "1. Summary. The preparation of the cost estimate took a week longer than planned, because two suppliers changed their price lists in April. The total cost estimate is now 184,000 euros, which is 9 percent above the original budget approved in January.\n" +
      "2. Main cost drivers. Most of the increase comes from three items: the floor covering, the air conditioning system and the new meeting room furniture. Energy costs during the construction work will also be higher than expected.\n" +
      "3. Bookkeeping. The checking of the bookkeeping is monthly, and the account balances for March and April have been confirmed by the finance team. No payment errors were found.\n" +
      "4. Approval. The approval of the new budget plan is pending. The board meeting on 20 May will decide whether the extra 16,000 euros can come from the maintenance budget or whether the project scope has to be reduced.\n" +
      "5. Options. If the scope is reduced, we suggest keeping the air conditioning and delaying the furniture order until next year. The contract terms with the furniture company allow a delay of up to six months without a cancellation fee.\n" +
      "6. Next steps. The project manager will send an updated cost overview after the board meeting. Questions about this report can be sent to the facilities team.",
    questions: [
      {
        text: "Why did the preparation of the cost estimate take longer?",
        options: ["Two suppliers changed their prices.", "The board was absent.", "The finance team found errors."],
        answer: 0,
        explain: "„The preparation of the cost estimate took a week longer than planned, because two suppliers changed their price lists in April.“",
      },
      {
        text: "How often is the bookkeeping checked?",
        options: ["every month", "every week", "once a year"],
        answer: 0,
        explain: "„The checking of the bookkeeping is monthly…“",
      },
      {
        kind: "truefalse",
        text: "The new budget plan has not been approved yet.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The approval of the new budget plan is pending.“",
      },
      {
        kind: "gapfill",
        text: "The total cost ___ is now 184,000 euros.",
        options: [],
        answer: 0,
        accept: ["estimate"],
        explain: "„The total cost estimate is now 184,000 euros…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The cost estimate took a week longer.",
          "Energy costs will be higher than expected.",
          "No payment errors were found.",
          "The board will decide about the extra money.",
        ],
        explain: "Özet, maliyet kalemleri, muhasebe denetimi, en sonda onay.",
      },
      {
        kind: "short_answer",
        text: "What could be delayed until next year?",
        options: [],
        answer: 0,
        accept: ["the furniture order", "the furniture", "furniture"],
        explain: "„we suggest keeping the air conditioning and delaying the furniture order until next year.“",
      },
    ],
  },
  {
    id: "en-b2-u18-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 18,
    title: "A book club review",
    genre: "forum",
    intro: "Okuma kulübü forumunda bir roman yorumu. Eliza kitabı neden tam beğenmemiş?",
    gloss: [
      { de: "a harbor", tr: "liman" },
      { de: "a forum", tr: "forum" },
      { de: "a port", tr: "liman" },
      { de: "a character", tr: "karakter" },
      { de: "unfinished", tr: "yarım kalmış" },
      { de: "a chapter", tr: "bölüm" },
    ],
    minutes: 9,
    text:
      "BOOK CLUB FORUM: This month, The Glass Harbor by Ada Moss\n" +
      "Posted by Eliza, Thursday\n" +
      "I finished The Glass Harbor last night, and I want to be fair to it, because many of you loved it.\n" +
      "The first half is excellent. The depiction of the old port town is picturesque without being sweet, and the two sisters are among the most convincing characters I have met this year.\n" +
      "My problem is the ending. It seems to be rushed. Apparently the author wrote the last three chapters in a month, which would explain a lot. On balance, the ending is arguably weak, especially since the start was so strong. When a book builds a world this carefully, the reader expects the same care at the end.\n" +
      "I know Charlie will say that the open ending is the point, and there is a good counterargument there. In that respect I agree with her: the book does not need a happy ending. But an open ending and an unfinished one are not the same thing.\n" +
      "To be honest, I would still recommend it. It seems to be the kind of book that is better in a group than alone, and I suspect our discussion will be better than the last chapter.\n" +
      "Reply from Charlie\n" +
      "Eliza, I will argue with you on Tuesday, with all the tact I have. Apparently I am the only one who liked the ending, so bring cake.",
    questions: [
      {
        text: "What does Eliza think of the first half?",
        options: ["It is excellent.", "It is rushed.", "It is too sweet."],
        answer: 0,
        explain: "„The first half is excellent.“",
      },
      {
        text: "Why might the ending be rushed?",
        options: ["The author wrote the last chapters in a month.", "The book was too long.", "Charlie did not like it."],
        answer: 0,
        explain: "„Apparently the author wrote the last three chapters in a month, which would explain a lot.“",
      },
      {
        kind: "truefalse",
        text: "Eliza does not recommend the book.",
        options: ["True", "False"],
        answer: 1,
        explain: "„To be honest, I would still recommend it.“",
      },
      {
        kind: "gapfill",
        text: "On balance, the ending is arguably ___, especially since the start was so strong.",
        options: [],
        answer: 0,
        accept: ["weak"],
        explain: "„On balance, the ending is arguably weak, especially since the start was so strong.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The first half is excellent.",
          "The ending seems to be rushed.",
          "Eliza partly agrees with Charlie.",
          "Eliza would still recommend the book.",
        ],
        explain: "Övgü, çekinceli eleştiri, karşı görüşe kısmen katılma, en sonda öneri.",
      },
      {
        kind: "short_answer",
        text: "When will the club discuss the book?",
        options: [],
        answer: 0,
        accept: ["on Tuesday", "Tuesday"],
        explain: "„Eliza, I will argue with you on Tuesday, with all the tact I have.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u18-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 18,
    title: "The empty hall",
    genre: "dialogue",
    intro: "Salon neredeyse boş. İki tiyatro yöneticisi neyi farklı yapmaları gerektiğini konuşuyor.",
    gloss: [
      { de: "advertise", tr: "reklam yapmak" },
      { de: "advertising", tr: "reklam" },
      { de: "a designer", tr: "tasarımcı" },
      { de: "unsold", tr: "satılmamış" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Heidi", text: "Look at this. Forty people in a hall for four hundred. If we had advertised earlier, the hall would be full now." },
      { speaker: "Billy", text: "Maybe. But if the reviews had been better, we would not need so much advertising." },
      { speaker: "Heidi", text: "The reviews were about the set. If the designer had portrayed the room the way the writer wanted, the work would have been grand." },
      { speaker: "Billy", text: "She did what we asked. If we had given her more money, the set would have been stylish." },
      { speaker: "Heidi", text: "True. If the set had been stylish, the play would have lasted. We closed the first one after three weeks." },
      { speaker: "Billy", text: "And if we had kept it open, we would still be paying the actors now, with half the tickets unsold." },
      { speaker: "Heidi", text: "So what do we do tonight?" },
      { speaker: "Billy", text: "We play. Forty people bought tickets. If I were one of them, I would want the actors to give everything." },
      { speaker: "Heidi", text: "Fine. And tomorrow?" },
      { speaker: "Billy", text: "Tomorrow we talk about the fall program. If we had planned it in the spring, we would not be in this position now." },
      { speaker: "Heidi", text: "Agreed. Let us not make the same mistake twice." },
    ],
    questions: [
      {
        text: "How many people are in the hall tonight?",
        options: ["forty", "four hundred", "fourteen"],
        answer: 0,
        explain: "„Forty people in a hall for four hundred.“",
      },
      {
        text: "According to Billy, what would have made the set stylish?",
        options: ["more money", "a new designer", "better reviews"],
        answer: 0,
        explain: "„If we had given her more money, the set would have been stylish.“",
      },
      {
        kind: "truefalse",
        text: "The first play closed after three weeks.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We closed the first one after three weeks.“",
      },
      {
        kind: "gapfill",
        text: "If we had advertised earlier, the hall would be ___ now.",
        options: [],
        answer: 0,
        accept: ["full"],
        explain: "„If we had advertised earlier, the hall would be full now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If the set had been stylish, the play would have lasted.", "If the set had been stylish, the play would have lasted"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "What will they talk about tomorrow?",
        options: [],
        answer: 0,
        accept: ["the fall program", "fall program", "the program"],
        explain: "„Tomorrow we talk about the fall program.“",
      },
    ],
  },
  {
    id: "en-b2-u18-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 18,
    title: "A paused expansion",
    genre: "monologue",
    intro: "Sabah ekonomi bülteni: bir tekstil şirketinin yıllık raporu. Ne söyleniyor, ne kesin?",
    gloss: [
      { de: "textile", tr: "tekstil" },
      { de: "a factory", tr: "fabrika" },
      { de: "an insider", tr: "içeriden biri" },
      { de: "a spokeswoman", tr: "sözcü" },
      { de: "a strategy", tr: "strateji" },
      { de: "the chief executive", tr: "genel müdür" },
      { de: "trading", tr: "işlem" },
      { de: "an investor", tr: "yatırımcı" },
      { de: "a share", tr: "hisse" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Logan", text: "Good morning, this is the business update at eight. We start with Nordtex, the textile company, which published its annual report last night." },
      { speaker: "Logan", text: "The expansion is said to be paused. The company had planned to open a second factory in Manisa this year, but insiders say the work has stopped." },
      { speaker: "Logan", text: "The profitability is expected to fall for the second year in a row. Higher energy prices and weaker orders from Europe are thought to be the main reasons." },
      { speaker: "Logan", text: "The business model is thought to have changed. Nordtex is reported to be moving from its own shops to online sales, and two city center stores are said to be closing." },
      { speaker: "Logan", text: "The company itself has not confirmed any of this. A spokeswoman said only that the pricing strategy is under review." },
      { speaker: "Logan", text: "Speculation about a restructuring has been growing for months. The chief executive is expected to speak to investors on Friday." },
      { speaker: "Logan", text: "Nordtex shares fell four percent in early trading. We will have more on this story at nine." },
    ],
    questions: [
      {
        text: "Where did the company plan to open a second factory?",
        options: ["in Manisa", "in Europe", "in the city center"],
        answer: 0,
        explain: "„The company had planned to open a second factory in Manisa this year…“",
      },
      {
        text: "What are thought to be the main reasons for the fall?",
        options: ["energy prices and weaker orders", "new shops", "online sales"],
        answer: 0,
        explain: "„Higher energy prices and weaker orders from Europe are thought to be the main reasons.“",
      },
      {
        kind: "truefalse",
        text: "The company has confirmed the news.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The company itself has not confirmed any of this.“",
      },
      {
        kind: "gapfill",
        text: "The profitability is expected to ___ for the second year in a row.",
        options: [],
        answer: 0,
        accept: ["fall"],
        explain: "„The profitability is expected to fall for the second year in a row.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The expansion is said to be paused.", "The expansion is said to be paused"],
        explain: "En zayıf aktarma: kaynak yok, kimse arkasında durmuyor.",
      },
      {
        kind: "short_answer",
        text: "When will the chief executive speak to investors?",
        options: [],
        answer: 0,
        accept: ["on Friday", "Friday"],
        explain: "„The chief executive is expected to speak to investors on Friday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u18-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 18,
    title: "Accounting tasks",
    genre: "info",
    intro: "Muhasebe ekibi için haftalık durum notu: hangi iş nerede duruyor?",
    gloss: [
      { de: "the preparation", tr: "hazırlanması" },
      { de: "the checking", tr: "denetimi" },
      { de: "the approval", tr: "onayı" },
      { de: "paused", tr: "durdurulmuş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Maliyet tahmininin hazırlanması bir hafta sürdü.",
        answer: "The preparation of the cost estimate took a week.",
        hint: "İsim + isim: soldaki niteliyor ve tekil kalıyor.",
      },
      {
        kind: "build",
        tr: "Defter tutmanın denetimi aylık.",
        answer: "The checking of the bookkeeping is monthly.",
        hint: "Dışta adlaştırma, içte bileşik.",
      },
      {
        kind: "build",
        tr: "Bütçe planının onayı beklemede.",
        answer: "The approval of the budget plan is pending.",
        hint: "„budget plan“: iki isim, arada hiçbir şey yok.",
      },
      {
        kind: "build",
        tr: "Genişlemenin durdurulduğu söyleniyor.",
        answer: "The expansion is said to be paused.",
        hint: "En zayıf aktarma: biri söyledi.",
      },
      {
        kind: "form",
        prompt: "Tadilat maliyet raporu için özet kartını doldur.",
        facts: "Maliyet tahmininin hazırlanması bir hafta sürdü; defter tutmanın denetimi her ay yapılıyor; bütçe planının onayı bekliyor; genişlemenin durdurulduğu söyleniyor.",
        fields: [
          { label: "Cost estimate", answer: "took a week", accept: ["a week", "one week"] },
          { label: "Bookkeeping check", answer: "monthly", accept: ["every month", "once a month"] },
          { label: "Budget plan", answer: "pending", accept: ["not approved yet", "waiting for approval"] },
          { label: "Expansion", answer: "said to be paused", accept: ["paused", "is said to be paused"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u18-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 18,
    title: "A stage design, looking back",
    genre: "opinion",
    intro: "Kapanan oyunun dekoruna geriye bakış ve şirket haberleri için cümleler.",
    gloss: [
      { de: "would have been grand", tr: "görkemli olurdu" },
      { de: "would be full", tr: "dolu olurdu" },
      { de: "would have lasted", tr: "sürerdi" },
      { de: "is thought to have changed", tr: "değiştiği düşünülüyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Odayı betimleseydi eser görkemli olurdu.",
        answer: "If she had portrayed the room, the work would have been grand.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Tasvir daha zarif olsaydı salon şimdi dolu olurdu.",
        answer: "If the depiction had been more elegant, the hall would be full now.",
        hint: "Karışık koşul: sonuç bu akşamın koltuklarında.",
      },
      {
        kind: "build",
        tr: "Dekor şık olsaydı oyun sürerdi.",
        answer: "If the set had been stylish, the play would have lasted.",
        hint: "Yine kapalı: gösterim martta bitti.",
      },
      {
        kind: "build",
        tr: "Kârlılığın düşmesi bekleniyor.",
        answer: "The profitability is expected to fall.",
        hint: "İleriye bakıyor ve bir modeli var.",
      },
      {
        kind: "build",
        tr: "İş modelinin değiştiği düşünülüyor.",
        answer: "The business model is thought to have changed.",
        hint: "Tutulan bir görüş; mastar geçmişe bakıyor.",
      },
    ],
  },
];
