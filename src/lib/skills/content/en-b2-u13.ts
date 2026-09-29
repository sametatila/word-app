import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 13 — "Örneklem daha büyük olsaydı, temkinli sonuç,
 * eşitsizlik raporu, rakamlara göre".
 *
 * Dört ders: Had the sample been larger · A tentative conclusion ·
 * The inequality report · According to the figures.
 *
 *   Kelime: generalize, remain, biased, justify, derive, anticipate,
 *           attribute, provisional, sensible, superficial, suspicious,
 *           thoroughly, likewise, exclusively, voluntary, autonomous,
 *           inequality, discrimination, solidarity, minority, prejudice,
 *           disadvantaged, national debt, deficit, tax burden, ministry,
 *           economic growth, national budget.
 *   Kalıp:  If the sample had been larger, we would have generalized. ·
 *           If the method had been clear, the result would remain valid now. ·
 *           If the sample had been biased, the result would have failed. ·
 *           It seems to be a sensible reading. ·
 *           Apparently the check was superficial. ·
 *           On balance the result is arguably suspicious. ·
 *           The measurement of inequality begins here. ·
 *           The documentation of discrimination is required. ·
 *           The reduction of prejudice takes a generation. ·
 *           The national debt is said to be rising. ·
 *           The deficit is expected to grow again. ·
 *           The tax burden is thought to have doubled.
 *
 * Ünitenin tek öğretme noktası ÜÇ AKTARMA FİİLİ, ÜÇ KANIT DERECESİ.
 * „is said to“ yalnızca biri söyledi demek; „is thought to“ tutulan bir
 * görüş, yani bakılmış ama imzalanmamış; „is expected to“ ileriye bakıyor
 * ve arkasında bir model ya da eğilim var. Üçü aynı edilgen kalıpta
 * duruyor ve aynı şeyi söylemiyor.
 */
export const enB2U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u13-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 13,
    title: "Rumors before the budget",
    genre: "article",
    intro: "Bütçe haftasında bir gazete haberi. Hangi bilgi doğrulanmış, hangisi yalnızca söylenti?",
    gloss: [
      { de: "a rumor", tr: "söylenti" },
      { de: "finance", tr: "finans" },
      { de: "ordinary", tr: "sıradan" },
      { de: "a pension", tr: "emekli maaşı" },
      { de: "rise", tr: "yükselmek" },
      { de: "inflation", tr: "enflasyon" },
      { de: "the opposition", tr: "muhalefet" },
      { de: "a coalition", tr: "koalisyon" },
      { de: "unhappy", tr: "memnun değil" },
      { de: "the government", tr: "hükûmet" },
      { de: "elsewhere", tr: "başka yerden" },
      { de: "a minister", tr: "bakan" },
    ],
    minutes: 9,
    text:
      "BUDGET WEEK: WHAT WE KNOW SO FAR\n" +
      "The finance ministry will present the national budget on Thursday, and the weeks before it have been full of rumors. Here is what is known, and what is only reported.\n" +
      "The national debt is said to be rising faster than planned. The ministry has not confirmed any figure, but two members of the budget committee are said to have seen a draft.\n" +
      "The deficit is expected to grow again next year. This expectation comes from the central bank, whose models are published every quarter, so it is more than a rumor. Economic growth is expected to slow to one percent.\n" +
      "The tax burden on middle incomes is thought to have doubled in ten years. Economists at the national university believe this, although the ministry disagrees with the way they measure it.\n" +
      "What does this mean for ordinary families? Energy support is thought to be safe, but a new tax on second homes is said to be in the draft. Pensions are expected to rise with inflation, as the law requires.\n" +
      "The opposition is expected to vote against the budget, while the smaller coalition partner is thought to be unhappy about the tax plans. If it refuses to support them, the government will need votes from elsewhere.\n" +
      "We will publish the full figures on Thursday evening, as soon as the minister has finished speaking.",
    questions: [
      {
        text: "Where does the expectation about the deficit come from?",
        options: ["the central bank", "the budget committee", "the opposition"],
        answer: 0,
        explain: "„This expectation comes from the central bank, whose models are published every quarter, so it is more than a rumor.“",
      },
      {
        text: "What is said to be in the draft?",
        options: ["a new tax on second homes", "lower pensions", "less energy support"],
        answer: 0,
        explain: "„Energy support is thought to be safe, but a new tax on second homes is said to be in the draft.“",
      },
      {
        kind: "truefalse",
        text: "Pensions are expected to rise with inflation.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Pensions are expected to rise with inflation, as the law requires.“",
      },
      {
        kind: "gapfill",
        text: "The deficit is ___ to grow again next year.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The deficit is expected to grow again next year.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The national debt is said to be rising.",
          "The deficit is expected to grow again.",
          "The tax burden is thought to have doubled.",
          "The opposition is expected to vote against the budget.",
        ],
        explain: "Borç, açık, vergi yükü, en sonda meclisteki oylama.",
      },
      {
        kind: "short_answer",
        text: "When will the full figures be published?",
        options: [],
        answer: 0,
        accept: ["on Thursday evening", "Thursday evening", "Thursday"],
        explain: "„We will publish the full figures on Thursday evening, as soon as the minister has finished speaking.“",
      },
    ],
  },
  {
    id: "en-b2-u13-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 13,
    title: "Inequality in four districts",
    genre: "report",
    intro: "Bir dayanışma ağının eşitsizlik raporu için basın özeti. Üç bulgu ne?",
    gloss: [
      { de: "a district", tr: "semt" },
      { de: "the average", tr: "ortalama" },
      { de: "a flat", tr: "daire" },
      { de: "an accent", tr: "aksan" },
      { de: "distribution", tr: "dağıtım" },
      { de: "uneven", tr: "eşitsiz" },
      { de: "positive", tr: "olumlu" },
      { de: "a recommendation", tr: "öneri" },
      { de: "translation", tr: "çeviri" },
      { de: "creation", tr: "kurulması" },
    ],
    minutes: 9,
    text:
      "NEW REPORT: INEQUALITY IN FOUR DISTRICTS\n" +
      "A summary for the press, published by the City Solidarity Network.\n" +
      "The measurement of inequality begins here, in four districts of the city where one in three families lives on less than half the average income. Our volunteers visited 1,400 homes between January and June.\n" +
      "Three findings stand out.\n" +
      "First, the documentation of discrimination is still weak. Many residents told us they had been refused a flat or a job because of their name or accent, but only a few had reported it. Without a record, nothing can be done.\n" +
      "Second, the distribution of support is uneven. Families from minorities receive less help from public offices, partly because the forms are only available in one language.\n" +
      "Third, the reduction of prejudice takes a generation, but it begins in schools. In the two districts where schools run mixed sports clubs, parents described their neighbors in far more positive terms.\n" +
      "Our recommendations are simple: the translation of all forms into the four most common languages, the creation of a free advice office in each district, and the collection of better data every year.\n" +
      "The full report, including the methods and the questions we asked, is available on our website. We thank the 1,400 families who opened their doors to us.",
    questions: [
      {
        text: "How many homes did the volunteers visit?",
        options: ["1,400", "400", "4,000"],
        answer: 0,
        explain: "„Our volunteers visited 1,400 homes between January and June.“",
      },
      {
        text: "Why do families from minorities receive less help?",
        options: ["The forms are only in one language.", "They do not ask for help.", "The offices are too far away."],
        answer: 0,
        explain: "„Families from minorities receive less help from public offices, partly because the forms are only available in one language.“",
      },
      {
        kind: "truefalse",
        text: "Most residents who faced discrimination reported it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Many residents told us they had been refused a flat or a job because of their name or accent, but only a few had reported it.“",
      },
      {
        kind: "gapfill",
        text: "The reduction of prejudice takes a ___, but it begins in schools.",
        options: [],
        answer: 0,
        accept: ["generation"],
        explain: "„Third, the reduction of prejudice takes a generation, but it begins in schools.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Volunteers visited homes in four districts.",
          "Discrimination is rarely reported.",
          "The distribution of support is uneven.",
          "Mixed sports clubs help in schools.",
        ],
        explain: "Yöntem, sonra sırayla üç bulgu: bildirilmeyen ayrımcılık, eşitsiz destek, okullar.",
      },
      {
        kind: "short_answer",
        text: "Where is the full report available?",
        options: [],
        answer: 0,
        accept: ["on their website", "on the website", "the website"],
        explain: "„The full report, including the methods and the questions we asked, is available on our website.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u13-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 13,
    title: "The night before the talk",
    genre: "dialogue",
    intro: "İki araştırmacı yarınki sunumu konuşuyor. Anket neden az yanıt aldı?",
    gloss: [
      { de: "a talk", tr: "sunum" },
      { de: "an organizer", tr: "düzenleyici" },
      { de: "spring", tr: "ilkbahar" },
      { de: "rewrite", tr: "yeniden yazmak" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Umut", text: "Are you ready for the talk tomorrow? The organizers want the results of the parent survey." },
      { speaker: "Zeynep", text: "Almost. The problem is the numbers. Only sixty families answered. If the sample had been larger, we would have generalized to the whole city." },
      { speaker: "Umut", text: "Why did so few answer?" },
      { speaker: "Zeynep", text: "The survey was voluntary, and we sent it out in August. Had we sent it in October, more parents would have replied." },
      { speaker: "Umut", text: "Can you still say anything useful?" },
      { speaker: "Zeynep", text: "Yes, but carefully. If the method had been clearer from the start, the result would remain valid now, even with sixty families." },
      { speaker: "Umut", text: "What was unclear?" },
      { speaker: "Zeynep", text: "Two schools used a different form. I only noticed it in the spring. If I had checked the forms earlier, I would not be rewriting half of the talk tonight." },
      { speaker: "Umut", text: "Was the sample biased?" },
      { speaker: "Zeynep", text: "I checked that thoroughly. If it had been biased, the result would have failed our tests. It passed them." },
      { speaker: "Umut", text: "So what will you tell them?" },
      { speaker: "Zeynep", text: "That the conclusion is provisional. It is a first step, and I would rather say that than justify a claim I cannot defend." },
    ],
    questions: [
      {
        text: "How many families answered the survey?",
        options: ["sixty", "six hundred", "sixteen"],
        answer: 0,
        explain: "„Only sixty families answered.“",
      },
      {
        text: "Why did so few parents reply?",
        options: ["It was voluntary and sent in August.", "The form was too long.", "The schools refused to help."],
        answer: 0,
        explain: "„The survey was voluntary, and we sent it out in August.“",
      },
      {
        kind: "truefalse",
        text: "Two schools used a different form.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Two schools used a different form.“",
      },
      {
        kind: "gapfill",
        text: "___ we sent it in October, more parents would have replied.",
        options: [],
        answer: 0,
        accept: ["Had", "had"],
        explain: "„Had we sent it in October, more parents would have replied.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "If the sample had been larger, we would have generalized to the whole city.",
          "If the sample had been larger, we would have generalized to the whole city",
        ],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "How will Zeynep describe the conclusion?",
        options: [],
        answer: 0,
        accept: ["provisional", "as provisional", "a first step"],
        explain: "„That the conclusion is provisional.“",
      },
    ],
  },
  {
    id: "en-b2-u13-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 13,
    title: "A study of the four-day week",
    genre: "monologue",
    intro: "Bir radyo yorumcusu dört günlük çalışma haftası araştırmasını değerlendiriyor. Sonuç ne kadar güvenilir?",
    gloss: [
      { de: "a trial", tr: "deneme" },
      { de: "productivity", tr: "verimlilik" },
      { de: "a questionnaire", tr: "anket formu" },
      { de: "real", tr: "gerçek" },
      { de: "output", tr: "üretim" },
      { de: "at random", tr: "rastgele" },
      { de: "enthusiastic", tr: "hevesli" },
      { de: "proven", tr: "kanıtlanmış" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Metin", text: "Good evening. Tonight: the new study on the four-day working week, which the ministry published this morning." },
      { speaker: "Metin", text: "The headline figure seems to be good news. Companies in the trial reported ten percent fewer sick days, and most staff want to keep the new system." },
      { speaker: "Metin", text: "But look more closely. Apparently only forty companies took part, and all of them volunteered. That seems to be a small and rather special group." },
      { speaker: "Metin", text: "Apparently the checks on productivity were also superficial. Most companies measured it with a short questionnaire, not with real output." },
      { speaker: "Metin", text: "On balance, the result is arguably suspicious. At the very least, it is too early to celebrate. It seems to be a sensible idea, but the evidence is not strong yet." },
      { speaker: "Metin", text: "That does not mean the idea is wrong. Likewise, it does not mean that we should wait ten years for a perfect study." },
      { speaker: "Metin", text: "What I would like to see is a second trial, with companies chosen at random and not exclusively ones that are already enthusiastic." },
      { speaker: "Metin", text: "Until then, if your manager says the four-day week is proven, you can politely say: not quite yet." },
    ],
    questions: [
      {
        text: "How many companies took part?",
        options: ["forty", "ten", "four"],
        answer: 0,
        explain: "„Apparently only forty companies took part, and all of them volunteered.“",
      },
      {
        text: "How did most companies measure productivity?",
        options: ["with a short questionnaire", "with real output", "with sick days"],
        answer: 0,
        explain: "„Most companies measured it with a short questionnaire, not with real output.“",
      },
      {
        kind: "truefalse",
        text: "Metin thinks the idea is wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That does not mean the idea is wrong.“",
      },
      {
        kind: "gapfill",
        text: "Apparently the checks on productivity were also ___.",
        options: [],
        answer: 0,
        accept: ["superficial"],
        explain: "„Apparently the checks on productivity were also superficial.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["On balance, the result is arguably suspicious.", "On balance, the result is arguably suspicious"],
        explain: "Temkinli bir yargı: „on balance“ tartıyor, „arguably“ yumuşatıyor.",
      },
      {
        kind: "short_answer",
        text: "What would Metin like to see?",
        options: [],
        answer: 0,
        accept: ["a second trial", "another trial", "a new trial"],
        explain: "„What I would like to see is a second trial, with companies chosen at random…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u13-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 13,
    title: "Public finances",
    genre: "info",
    intro: "Bütçe haberi için notlar yaz: neyin söylendiğini, neyin beklendiğini aktar.",
    gloss: [
      { de: "is said to", tr: "olduğu söyleniyor" },
      { de: "is expected to", tr: "olması bekleniyor" },
      { de: "is thought to", tr: "olduğu düşünülüyor" },
      { de: "the measurement", tr: "ölçülmesi" },
      { de: "rise", tr: "yükselmek" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kamu borcunun arttığı söyleniyor.",
        answer: "The national debt is said to be rising.",
        hint: "„is said to“: biri söyledi, o kadar.",
      },
      {
        kind: "build",
        tr: "Bütçe açığının yine büyümesi bekleniyor.",
        answer: "The deficit is expected to grow again.",
        hint: "„is expected to“ ileriye bakıyor ve bir dayanağı var.",
      },
      {
        kind: "build",
        tr: "Vergi yükünün ikiye katlandığı düşünülüyor.",
        answer: "The tax burden is thought to have doubled.",
        hint: "„is thought to“ tutulan bir görüş; mastar geçmişe bakıyor.",
      },
      {
        kind: "build",
        tr: "Eşitsizliğin ölçülmesi burada başlıyor.",
        answer: "The measurement of inequality begins here.",
        hint: "Fiil isme dönüyor; yine „of“.",
      },
      {
        kind: "form",
        prompt: "Bütçe haftası için haber kartını doldur.",
        facts: "Ulusal borcun arttığı söyleniyor; merkez bankası açığın yeniden büyümesini bekliyor; ekonomistler vergi yükünün on yılda iki katına çıktığını düşünüyor; bakanlık tam rakamları perşembe günü açıklayacak.",
        fields: [
          { label: "National debt", answer: "is said to be rising", accept: ["said to be rising", "rising"] },
          { label: "Deficit", answer: "is expected to grow", accept: ["expected to grow", "growing"] },
          { label: "Tax burden", answer: "is thought to have doubled", accept: ["thought to have doubled", "doubled"] },
          { label: "Full figures", answer: "on Thursday", accept: ["Thursday"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u13-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 13,
    title: "Limits of a study",
    genre: "opinion",
    intro: "Bir çalışmanın sınırlarını anlatan cümleler kur: örneklem daha büyük olsaydı ne değişirdi?",
    gloss: [
      { de: "would have generalized", tr: "genelleme yapardık" },
      { de: "would remain valid", tr: "geçerli kalırdı" },
      { de: "the documentation", tr: "belgelenmesi" },
      { de: "the reduction", tr: "azaltılması" },
      { de: "generation", tr: "kuşak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Örneklem daha büyük olsaydı genelleme yapardık.",
        answer: "If the sample had been larger, we would have generalized.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Yöntem açık olsaydı sonuç şimdi geçerli kalırdı.",
        answer: "If the method had been clear, the result would remain valid now.",
        hint: "Karışık koşul: sonuç hâlâ masada.",
      },
      {
        kind: "build",
        tr: "Örneklem taraflı olsaydı sonuç çökerdi.",
        answer: "If the sample had been biased, the result would have failed.",
        hint: "Yine kapalı: ne taraflıydı ne de çöktü.",
      },
      {
        kind: "build",
        tr: "Ayrımcılığın belgelenmesi zorunlu.",
        answer: "The documentation of discrimination is required.",
        hint: "Yine „-ion“, yine „of“.",
      },
      {
        kind: "build",
        tr: "Önyargının azaltılması bir kuşak sürüyor.",
        answer: "The reduction of prejudice takes a generation.",
        hint: "Üçüncü adlaştırma, aynı edat.",
      },
    ],
  },
];
