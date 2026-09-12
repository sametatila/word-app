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
 *           If the depiction had been elegant, the hall would be full now. ·
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
    title: "The cost report",
    genre: "info",
    intro: "İki isim yan yana. Hangisi hangisini niteliyor?",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "sentence", tr: "cümle" },
      { de: "nouns", tr: "isimler" },
      { de: "adjective", tr: "sıfat" },
      { de: "builds", tr: "kuruyor" },
      { de: "noun", tr: "isim" },
      { de: "singular", tr: "tekil" },
      { de: "nominalisation", tr: "adlaştırma" },
      { de: "compound", tr: "bileşik" },
      { de: "real", tr: "gerçek" },
      { de: "contain", tr: "içermek" },
      { de: "a preposition", tr: "edat" },
      { de: "an apostrophe", tr: "kesme işareti" },
      { de: "ceremony", tr: "tören" },
      { de: "reverse", tr: "tersine çevirmek" },
      { de: "number", tr: "sayı" },
      { de: "plural", tr: "çoğul" },
      { de: "possession", tr: "iyelik" },
      { de: "the stacking", tr: "üst üste yığma" },
      { de: "a limit", tr: "sınır" },
      { de: "grammatical", tr: "dilbilgisel" },
      { de: "labelling", tr: "etiketleme" },
      { de: "heavy", tr: "ağır" },
      { de: "pending", tr: "beklemede" },
      { de: "an estimate", tr: "tahmin" },
      { de: "constantly", tr: "durmadan" },
    ],
    minutes: 9,
    text:
      "The preparation of the cost estimate took a week. Look at the middle of that sentence rather than the ends. „Cost estimate“ is two nouns with nothing between them, and the first one is doing the work of an adjective.\n" +
      "English builds new nouns this way constantly and without ceremony. Budget plan. Account balance. Income tax. Contract term. Two nouns, no preposition, no apostrophe, and the one on the left describes the one on the right.\n" +
      "Two rules come with it and both are easy to break. The first is order: a cost estimate is an estimate of costs, and an estimate cost would be the cost of an estimate. Reverse them and the meaning reverses with them.\n" +
      "The second is number. The left noun stays singular even when the sense is plural. It is a cost estimate and not a costs estimate; a budget plan and not a budgets plan. Everything that marks plural or possession goes on the noun to the right: cost estimates, the cost estimate's date.\n" +
      "The checking of the bookkeeping is monthly. The approval of the budget plan is pending. Both of those have a nominalisation on the outside and a compound on the inside, which is why a page of this kind is so heavy to read and so easy to sign.\n" +
      "There is no limit to the stacking, which is the real danger. „Income tax allowance contract term“ is four nouns and a grammatical sentence could contain it. Two is normal. Three needs a reason. Four is a sign that somebody has stopped writing and started labelling.",
    questions: [
      {
        text: "What is the first noun doing?",
        options: ["the work of an adjective", "the work of the right noun", "the work of a preposition"],
        answer: 0,
        explain: "„the first one is doing the work of an adjective.“",
      },
      {
        text: "What stays singular?",
        options: ["the left noun", "the right noun", "both nouns"],
        answer: 0,
        explain: "„The left noun stays singular even when the sense is plural.“",
      },
      {
        kind: "truefalse",
        text: "„An estimate cost“ means the same as „a cost estimate“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„an estimate cost would be the cost of an estimate.“",
      },
      {
        kind: "gapfill",
        text: "It is a ___ estimate and not a costs estimate.",
        options: [],
        answer: 0,
        accept: ["cost"],
        explain: "„It is a cost estimate and not a costs estimate…“",
      },
      {
        kind: "order",
        text: "Bileşiğin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Two nouns with nothing between them.",
          "The one on the left describes the one on the right.",
          "The left noun stays singular.",
          "Four is a sign of labelling.",
        ],
        explain: "Biçim, iş, sayı, en sonda sınır.",
      },
      {
        kind: "short_answer",
        text: "How many nouns are normal?",
        options: [],
        answer: 0,
        accept: ["two", "2", "two nouns"],
        explain: "„Two is normal. Three needs a reason.“",
      },
    ],
  },
  {
    id: "en-b2-u18-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 18,
    title: "Saying you disliked it",
    genre: "opinion",
    intro: "„especially since“ ne yapıyor? Ödün mü, tersi mi?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "spent", tr: "harcadı" },
      { de: "sentence", tr: "cümle" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "a hedge", tr: "çekince" },
      { de: "strengthens", tr: "güçlendiriyor" },
      { de: "concessive", tr: "ödün veren" },
      { de: "gives ground", tr: "geri adım atıyor" },
      { de: "a compliment", tr: "iltifat" },
      { de: "narrows", tr: "daraltıyor" },
      { de: "softness", tr: "yumuşaklık" },
      { de: "disagreed with", tr: "karşı çıkılan" },
      { de: "polite", tr: "kibar" },
      { de: "hard on", tr: "sert davranmak" },
      { de: "sharper", tr: "daha keskin" },
      { de: "in that respect", tr: "bu bakımdan" },
      { de: "quietly", tr: "sessizce" },
    ],
    minutes: 9,
    text:
      "It seems to be an opposing view. Apparently the counterargument is convincing. On balance the ending is arguably weak, especially since the start was strong.\n" +
      "Three sentences, and the third one is the only one doing something new. „Especially since“ adds a reason that strengthens what was just said, and it is the opposite of the concessive words this level has spent so long on.\n" +
      "„Although the start was strong, the ending is weak“ gives ground and then takes it. „The ending is weak, especially since the start was strong“ gives no ground at all: the strong start is being used as evidence against the ending.\n" +
      "That is a sharper move than it looks, and it is the polite way to be hard on something. The tact is in the order. The claim first, the reason second, and the reason is a compliment.\n" +
      "„In that respect“ does the opposite job and does it quietly. It narrows: everything I have just said applies to this one thing and not to the rest.\n" +
      "Moderation in a review of this kind is not softness. A reviewer who hedges every sentence has written a page that cannot be disagreed with, and a page that cannot be disagreed with has not said anything.\n" +
      "So one hedge, one reason, and one sentence somewhere that could be wrong. The politeness is in the reason and not in the number of hedges.",
    questions: [
      {
        text: "What does „especially since“ add?",
        options: ["a reason that strengthens", "a hedge", "a new claim"],
        answer: 0,
        explain: "„„Especially since“ adds a reason that strengthens what was just said…“",
      },
      {
        text: "What does „in that respect“ do?",
        options: ["it narrows", "it gives ground", "it adds a reason"],
        answer: 0,
        explain: "„It narrows: everything I have just said applies to this one thing…“",
      },
      {
        kind: "truefalse",
        text: "A page that cannot be disagreed with has said a great deal.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a page that cannot be disagreed with has not said anything.“",
      },
      {
        kind: "gapfill",
        text: "The ending is weak, especially ___ the start was strong.",
        options: [],
        answer: 0,
        accept: ["since"],
        explain: "„The ending is weak, especially since the start was strong.“",
      },
      {
        kind: "order",
        text: "Eleştirinin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It seems to be an opposing view.",
          "Apparently the counterargument is convincing.",
          "The ending is weak, especially since the start was strong.",
          "The politeness is in the reason.",
        ],
        explain: "İki çekince, güçlendiren neden, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "Where is the tact?",
        options: [],
        answer: 0,
        accept: ["in the order", "the order", "claim then reason"],
        explain: "„The tact is in the order.“",
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
    title: "If she had portrayed it",
    genre: "dialogue",
    intro: "Üç koşul, boş bir salon. Hangisi bu akşama ait?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "anyway", tr: "yine de" },
      { de: "conditional", tr: "koşul cümlesi" },
      { de: "closed", tr: "kapalı" },
      { de: "a designer", tr: "tasarımcı" },
      { de: "a row", tr: "sıra" },
      { de: "empty", tr: "boş" },
      { de: "the run", tr: "gösterim dönemi" },
      { de: "fair", tr: "adil" },
      { de: "a set", tr: "dekor" },
      { de: "kindest", tr: "en nazik" },
      { de: "fixed", tr: "düzeltilmiş" },
      { de: "a distinction", tr: "ayrım" },
      { de: "lasted", tr: "sürdü" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Melis", text: "If she had portrayed the room, the work would have been grand. Closed on both sides, and it is the sentence the designer keeps saying." },
      { speaker: "Sarp", text: "Because she did not." },
      { speaker: "Melis", text: "Because she did not, and the work was made, and neither of those can change now." },
      { speaker: "Sarp", text: "The second line is different." },
      { speaker: "Melis", text: "If the depiction had been elegant, the hall would be full now. The cause is finished and the result is the row of empty seats in front of us." },
      { speaker: "Sarp", text: "So the second half comes forward." },
      { speaker: "Melis", text: "„Would be“, not „would have been“. It is the only sentence of the three that tells you something about tonight." },
      { speaker: "Sarp", text: "And the third?" },
      { speaker: "Melis", text: "If the set had been stylish, the play would have lasted. Closed, and correctly: the run ended in March." },
      { speaker: "Sarp", text: "Is that a fair reading?" },
      { speaker: "Melis", text: "It is a picturesque one and I am not sure it is fair. A gorgeous set does not keep a play open; a breathtaking one might." },
      { speaker: "Sarp", text: "That is a distinction without much in it." },
      { speaker: "Melis", text: "It is, and I keep the sentence anyway, because the designer will read the review and a closed conditional is the kindest way to say a thing that cannot be fixed." },
    ],
    questions: [
      {
        text: "Which sentence is about tonight?",
        options: ["the second one", "the first one", "the third one"],
        answer: 0,
        explain: "„It is the only sentence of the three that tells you something about tonight.“",
      },
      {
        text: "When did the run end?",
        options: ["in March", "tonight", "in the second act"],
        answer: 0,
        explain: "„Closed, and correctly: the run ended in March.“",
      },
      {
        kind: "truefalse",
        text: "Melis is sure the third reading is fair.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is a picturesque one and I am not sure it is fair.“",
      },
      {
        kind: "gapfill",
        text: "If the depiction had been elegant, the hall would be full ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the depiction had been elegant, the hall would be full now.“",
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
        text: "Why does she keep the sentence?",
        options: [],
        answer: 0,
        accept: ["it is the kindest way", "for the designer", "it cannot be fixed"],
        explain: "„a closed conditional is the kindest way to say a thing that cannot be fixed.“",
      },
    ],
  },
  {
    id: "en-b2-u18-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 18,
    title: "The company report",
    genre: "monologue",
    intro: "Üç derece üç satırda. Sıra neden böyle?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "infinitive", tr: "mastar" },
      { de: "verbs", tr: "fiiller" },
      { de: "paused", tr: "durdurulmuş" },
      { de: "an announcement", tr: "duyuru" },
      { de: "repeating", tr: "yineleyen" },
      { de: "standing behind", tr: "arkasında duran" },
      { de: "an appendix", tr: "ek belge" },
      { de: "lands", tr: "yerine oturuyor" },
      { de: "the space", tr: "boşluk" },
      { de: "announced", tr: "duyurulmuş" },
      { de: "backwards", tr: "tersinden" },
      { de: "quietly", tr: "sessizce" },
      { de: "a degree", tr: "derece" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Cem", text: "The expansion is said to be paused. Six words, no source, and everybody on the call heard the same thing." },
      { speaker: "Cem", text: "„Is said to“ is the weakest of the three and the announcement uses it on purpose. Somebody has said it; we are repeating it; nobody is standing behind it." },
      { speaker: "Cem", text: "The profitability is expected to fall. That one is different and it is the sentence the stock exchange reads. „Expected“ points forward and rests on a model, and the model is in an appendix that four people have opened." },
      { speaker: "Cem", text: "The business model is thought to have changed. A view that is held, and the infinitive is looking backwards: the changing already happened and somebody worked it out." },
      { speaker: "Cem", text: "Three degrees in three lines, and the order is not an accident. Weakest first, so that the second one lands." },
      { speaker: "Cem", text: "Speculation is what fills the space between them. A pricing decision that has not been announced is a competitive advantage until somebody asks about it in public." },
      { speaker: "Cem", text: "Then it becomes a sentence with „is said to“ in it, and the week after that it becomes a sentence with a name." },
      { speaker: "Cem", text: "So I read these reports backwards. The last paragraph has the verbs with the most evidence in them, and the first paragraph has the ones that let the company restructure quietly." },
    ],
    questions: [
      {
        text: "Which sentence does the stock exchange read?",
        options: ["the profitability one", "the expansion one", "the business model one"],
        answer: 0,
        explain: "„it is the sentence the stock exchange reads.“",
      },
      {
        text: "Why is the weakest first?",
        options: ["so that the second one lands", "to save space", "because it is shortest"],
        answer: 0,
        explain: "„Weakest first, so that the second one lands.“",
      },
      {
        kind: "truefalse",
        text: "Cem reads these reports from the first paragraph.",
        options: ["True", "False"],
        answer: 1,
        explain: "„So I read these reports backwards.“",
      },
      {
        kind: "gapfill",
        text: "The profitability is ___ to fall.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The profitability is expected to fall.“",
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
        text: "What does the last paragraph have?",
        options: [],
        answer: 0,
        accept: ["the most evidence", "the strongest verbs", "evidence"],
        explain: "„The last paragraph has the verbs with the most evidence in them…“",
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
    title: "The preparation of the cost estimate took a week",
    genre: "info",
    intro: "Dışta adlaştırma, içte bileşik. Soldaki tekil mi?",
    gloss: [
      { de: "preposition", tr: "edat" },
      { de: "adjective", tr: "sıfat" },
      { de: "singular", tr: "tekil" },
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
        prompt: "Bileşik kartını doldur.",
        facts: "İki isim arasında hiçbir şey yok; soldaki niteliyor; soldaki tekil kalıyor; çoğul sağdakine takılıyor.",
        fields: [
          { label: "Between them", answer: "nothing", accept: ["no preposition"] },
          { label: "The left noun", answer: "describes", accept: ["an adjective"] },
          { label: "Its number", answer: "singular", accept: ["stays singular"] },
          { label: "The plural", answer: "on the right", accept: ["cost estimates"] },
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
    title: "If the depiction had been elegant, the hall would be full now",
    genre: "opinion",
    intro: "İki kapalı, bir karışık ve iki aktarma.",
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
        tr: "Tasvir zarif olsaydı salon şimdi dolu olurdu.",
        answer: "If the depiction had been elegant, the hall would be full now.",
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
