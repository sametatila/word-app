import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 2 — "Ödünün tonu, yerleşmiş eşleşme, hükmü fiil
 * taşıyor, „may well“in inceliği".
 *
 * Dört ders: The tone of concession · The settled pairing ·
 * The verb carries the verdict · The nuance of may well.
 *
 *   Kelime: concede, denounce, multilayered, ambivalent, rebuttal,
 *           unmask, mouthpiece, sensationalist, disinformation, staging,
 *           tout, presumed, precarious, incalculable, perceptible,
 *           erratic, sporadic, opaque, multifaceted.
 *   Kalıp:  Granted, the figure is high, albeit explicable. ·
 *           Much as I'd like to weigh up both sides equally, one is clearly stronger. ·
 *           She would concede the point, whereas he would gloss over it. ·
 *           To have money at one's disposal is not to use it. ·
 *           They grapple with why the idea did not catch on. ·
 *           Let it play out before you call it damage control. ·
 *           He claimed it; she conceded it; they alleged it. ·
 *           The rebuttal itself said less than the verb used to report it. ·
 *           They unmask the mouthpiece without naming names. ·
 *           The figure may well be higher than presumed. ·
 *           It might have been expected to stay precarious. ·
 *           The risk would tend to be incalculable.
 *
 * Ünitenin tek öğretme noktası AKTARMA FİİLİ HÜKMÜ TAŞIYOR. „He claimed
 * it; she conceded it; they alleged it“ — üç kez aynı iş bildiriliyor ve
 * üç ayrı yargı veriliyor. B2 ünite 13 „said / thought / expected“ ile üç
 * KANIT derecesi göstermişti; burada ölçek yargıya dönüyor ve yansız
 * kalmak diye bir seçenek yok: bir fiil seçmek zorunlu.
 */
export const enC1U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u02-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 2,
    title: "A spill on the Kara River",
    genre: "article",
    intro: "Nehre kimyasal sızıntı üzerine bir haber. Kim ne söylüyor, hangisi kanıtlanmış?",
    gloss: [
      { de: "a tank", tr: "tank" },
      { de: "ban", tr: "yasaklamak" },
      { de: "a cleanup", tr: "temizlik" },
      { de: "beyond", tr: "ötesinde" },
      { de: "a culture", tr: "kültür" },
      { de: "environmental", tr: "çevreci" },
      { de: "the environment", tr: "çevre" },
      { de: "regional", tr: "bölgesel" },
      { de: "a log", tr: "kayıt" },
      { de: "a lawyer", tr: "avukat" },
      { de: "noon", tr: "öğle" },
      { de: "a farmer", tr: "çiftçi" },
      { de: "allege", tr: "iddia etmek" },
      { de: "a fluid", tr: "sıvı" },
      { de: "a valve", tr: "vana" },
      { de: "upstream", tr: "akıntının yukarısında" },
      { de: "involved", tr: "ilgili" },
      { de: "appear", tr: "ortaya çıkmak" },
      { de: "a spill", tr: "sızıntı" },
    ],
    minutes: 11,
    text:
      "CHEMICAL SPILL: WHO KNEW WHAT, AND WHEN\n" +
      "Three days after thousands of dead fish appeared in the Kara River, the people involved have told three very different stories.\n" +
      "The mayor, Kemal Aksoy, claimed on Monday that the city had been warned „far too late“ and that its water supply had never been at risk. He did not say who had warned the city, or when.\n" +
      "Veltra Chemicals, whose plant stands two kilometers upstream, at first denied any link. On Wednesday, however, its director conceded that a valve had failed during the night of the spill and that „a limited amount“ of cleaning fluid may have reached the river. She insisted that the company had reported the fault within an hour.\n" +
      "Residents of the village of Taşlı allege that the fault was reported much later. Three farmers told this newspaper that they saw a yellow film on the water at six in the morning, and that no one from the company or the city arrived before noon. Their lawyer pointed out that the company logs have not yet been made public.\n" +
      "The regional environment agency noted only that samples had been taken and that results were expected next week. An environmental group went further and denounced what it called „a culture of silence“ at the plant, where two smaller spills were recorded in 2019.\n" +
      "The company rebuttal, published on its website on Thursday evening, said less than the headlines used to report it. It admitted no fault beyond the valve, promised a full investigation, and offered to pay for the cleanup „without accepting liability“.\n" +
      "What nobody disputes is the damage. Fishing on the lower river has been banned until further notice, and the farmers of Taşlı are watering their fields from tanks.\n" +
      "Reporting by Selin Arı",
    questions: [
      {
        text: "What did the director of Veltra Chemicals concede?",
        options: ["A valve had failed.", "The city had been warned too late.", "The water supply was at risk."],
        answer: 0,
        explain: "„On Wednesday, however, its director conceded that a valve had failed during the night of the spill…“",
      },
      {
        text: "When did the farmers see a yellow film on the water?",
        options: ["at six in the morning", "at noon", "on Thursday evening"],
        answer: 0,
        explain: "„…they saw a yellow film on the water at six in the morning…“",
      },
      {
        kind: "truefalse",
        text: "Fishing on the lower river is not allowed at the moment.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Fishing on the lower river has been banned until further notice…“",
      },
      {
        kind: "gapfill",
        text: "An environmental group went further and ___ what it called a culture of silence at the plant.",
        options: [],
        answer: 0,
        accept: ["denounced"],
        explain: "„An environmental group went further and denounced what it called…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The mayor claimed the water supply was safe.",
          "The director conceded that a valve had failed.",
          "Residents allege the fault was reported later.",
          "The company published its rebuttal.",
        ],
        explain: "Belediye başkanı, şirket, köylüler, en sonda şirketin yanıtı.",
      },
      {
        kind: "short_answer",
        text: "How far upstream is the plant?",
        options: [],
        answer: 0,
        accept: ["two kilometers", "2 kilometers", "two km"],
        explain: "„…whose plant stands two kilometers upstream…“",
      },
    ],
  },
  {
    id: "en-c1-u02-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 2,
    title: "Graduates and their first jobs",
    genre: "article",
    intro: "Genç mezunların iş hayatı üzerine bir yazı. Resmî rakamlar neyi göstermiyor?",
    gloss: [
      { de: "a college", tr: "yüksekokul" },
      { de: "a region", tr: "bölge" },
      { de: "hopeless", tr: "umutsuz" },
      { de: "an economist", tr: "iktisatçı" },
      { de: "a decade", tr: "on yıl" },
      { de: "hire", tr: "işe almak" },
      { de: "underemployed", tr: "eksik istihdam edilen" },
      { de: "employed", tr: "çalışan" },
      { de: "cautious", tr: "temkinli" },
      { de: "statistics", tr: "istatistik" },
      { de: "appear", tr: "görünmek" },
      { de: "real", tr: "gerçek" },
      { de: "a graduate", tr: "mezun" },
    ],
    minutes: 11,
    text:
      "FIRST JOBS: THE NUMBERS BEHIND THE HEADLINES\n" +
      "Official figures say that 14 percent of graduates under 25 are without work. The real figure may well be higher than presumed. Graduates who work a few hours a week in a café, or who have given up looking, do not appear in the statistics at all.\n" +
      "Economists at the Ankara Policy Institute interviewed 2,000 recent graduates last year. Their conclusion is cautious but clear: a third of those counted as employed might be better described as underemployed, working in jobs that need no degree and pay by the hour.\n" +
      "That matters because the situation might have been expected to improve. The economy grew by four percent last year, and companies say they cannot find staff. Yet the contracts offered to young graduates have become shorter, not longer, and their position remains precarious.\n" +
      "Several reasons are offered. Employers may well prefer to hire experienced workers on short contracts rather than train young ones. Universities, for their part, would tend to measure success by the number of graduates rather than by the jobs they find. And young people themselves may have become more careful about moving to another city for a job that could end in six months.\n" +
      "The cost over a whole career is harder to measure. A generation that spends its first working decade moving from contract to contract would tend to save less, buy homes later and have children later. Some economists describe the risk as incalculable; others, more carefully, as real but slow.\n" +
      "What the report does not claim is that the situation is hopeless. In regions where companies and colleges plan training together, the share of graduates in skilled work is almost twice as high. The authors suggest that this model might well be worth copying.\n" +
      "The full report is available on the website of the institute.",
    questions: [
      {
        text: "Why may the real figure be higher than the official one?",
        options: ["Some people do not appear in the statistics.", "The survey was too small.", "Graduates hide their jobs."],
        answer: 0,
        explain: "„Graduates who work a few hours a week in a café, or who have given up looking, do not appear in the statistics at all.“",
      },
      {
        text: "How many graduates did the economists interview?",
        options: ["2,000", "14", "25"],
        answer: 0,
        explain: "„Economists at the Ankara Policy Institute interviewed 2,000 recent graduates last year.“",
      },
      {
        kind: "truefalse",
        text: "The contracts offered to young graduates have become longer.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Yet the contracts offered to young graduates have become shorter, not longer…“",
      },
      {
        kind: "gapfill",
        text: "The real figure may well be higher than ___.",
        options: [],
        answer: 0,
        accept: ["presumed"],
        explain: "„The real figure may well be higher than presumed.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Official figures give 14 percent.",
          "Economists interviewed 2,000 graduates.",
          "Contracts have become shorter.",
          "Joint training helps in some regions.",
        ],
        explain: "Resmî rakam, araştırma, kısalan sözleşmeler, en sonda umut veren model.",
      },
      {
        kind: "short_answer",
        text: "How much did the economy grow last year?",
        options: [],
        answer: 0,
        accept: ["four percent", "4 percent", "by four percent", "4%"],
        explain: "„The economy grew by four percent last year…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u02-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 2,
    title: "Two apartments, one decision",
    genre: "dialogue",
    intro: "Bir çift iki daire arasında karar veriyor. Hangisini seçiyorlar ve neden?",
    gloss: [
      { de: "reluctantly", tr: "gönülsüzce" },
      { de: "an agent", tr: "emlakçı" },
      { de: "albeit", tr: "gerçi" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ilgın", text: "So, which one? We have to tell the agent by tonight." },
      { speaker: "Devrim", text: "Granted, the apartment on Elm Street is expensive, albeit fair for that area. It has two bedrooms and a balcony, and it is ten minutes from your office." },
      { speaker: "Ilgın", text: "And the other one is cheap." },
      { speaker: "Devrim", text: "Much as I'd like to say the cheaper one is just as good, it clearly isn't. It is on a main road, and the bedroom faces the traffic." },
      { speaker: "Ilgın", text: "I would concede the noise, whereas you would gloss over the rent. Eighteen hundred a month is a lot." },
      { speaker: "Devrim", text: "It is a lot, albeit less than we pay now for one room less." },
      { speaker: "Ilgın", text: "Granted. But the heating on Elm Street is electric, and the last tenants said the bills were high." },
      { speaker: "Devrim", text: "Much as I trust the last tenants, they lived there alone and worked from home all day." },
      { speaker: "Ilgın", text: "Fair point. What about my mother? She would want us closer." },
      { speaker: "Devrim", text: "Elm Street is twenty minutes from her by bus, whereas the cheap one is forty." },
      { speaker: "Ilgın", text: "Then that settles it, albeit reluctantly on my side. Call the agent before six." },
      { speaker: "Devrim", text: "I am calling now, before somebody else does." },
    ],
    questions: [
      {
        text: "What is the problem with the cheaper apartment?",
        options: ["It is on a main road.", "It has no balcony.", "It is far from the bus."],
        answer: 0,
        explain: "„It is on a main road, and the bedroom faces the traffic.“",
      },
      {
        text: "How long is the bus ride from Elm Street to the mother of Ilgın?",
        options: ["twenty minutes", "ten minutes", "forty minutes"],
        answer: 0,
        explain: "„Elm Street is twenty minutes from her by bus, whereas the cheap one is forty.“",
      },
      {
        kind: "truefalse",
        text: "The apartment on Elm Street is close to the office of Ilgın.",
        options: ["True", "False"],
        answer: 0,
        explain: "„…and it is ten minutes from your office.“",
      },
      {
        kind: "gapfill",
        text: "The rent on Elm Street is eighteen ___ a month.",
        options: [],
        answer: 0,
        accept: ["hundred"],
        explain: "„Eighteen hundred a month is a lot.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Granted, the apartment on Elm Street is expensive, albeit fair for that area.",
          "Granted, the apartment on Elm Street is expensive, albeit fair for that area",
        ],
        explain: "„Granted“ ödün veriyor, „albeit“ hemen bir kısıt ekliyor.",
      },
      {
        kind: "short_answer",
        text: "By when must Devrim call the agent?",
        options: [],
        answer: 0,
        accept: ["before six", "by six", "six"],
        explain: "„Call the agent before six.“",
      },
    ],
  },
  {
    id: "en-c1-u02-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 2,
    title: "A tool-sharing app",
    genre: "monologue",
    intro: "Bir girişimcinin podcast'te anlattığı başarısızlık. Fikir neden tutmadı?",
    gloss: [
      { de: "real", tr: "gerçek" },
      { de: "a babysitter", tr: "çocuk bakıcısı" },
      { de: "furniture", tr: "mobilya" },
      { de: "popular", tr: "sevilen" },
      { de: "a hardware store", tr: "hırdavatçı" },
      { de: "lend", tr: "ödünç vermek" },
      { de: "a ladder", tr: "merdiven" },
      { de: "launch", tr: "piyasaya sürmek" },
      { de: "a drill", tr: "matkap" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Yalın", text: "Two years ago we launched an app that helped neighbors share tools. Drills, ladders, garden equipment. We were sure it would catch on." },
      { speaker: "Yalın", text: "We had money at our disposal, a good team and a city that loved the idea. Six hundred people signed up in the first week." },
      { speaker: "Yalın", text: "Then almost nobody borrowed anything. For months we grappled with why the idea did not catch on." },
      { speaker: "Yalın", text: "Our investors wanted quick changes. I asked them to let it play out before they called it damage control, and to their credit they did." },
      { speaker: "Yalın", text: "What we finally found was simple. People liked the idea of sharing far more than they liked lending their own drill to a stranger." },
      { speaker: "Yalın", text: "Trust was the problem, not the app. So we changed the model: instead of neighbors, we worked with hardware stores that rent out tools." },
      { speaker: "Yalın", text: "That version took off within three months. We now work with forty stores in four cities." },
      { speaker: "Yalın", text: "The lesson I took from it: an idea can be popular and still not be used. Talk to the people who will actually have to do the sharing." },
    ],
    questions: [
      {
        text: "What did the first app help neighbors do?",
        options: ["share tools", "find babysitters", "sell furniture"],
        answer: 0,
        explain: "„Two years ago we launched an app that helped neighbors share tools.“",
      },
      {
        text: "What was the real problem?",
        options: ["People did not trust strangers with their tools.", "The app was too expensive.", "The investors left."],
        answer: 0,
        explain: "„Trust was the problem, not the app.“",
      },
      {
        kind: "truefalse",
        text: "The investors made quick changes right away.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I asked them to let it play out before they called it damage control, and to their credit they did.“",
      },
      {
        kind: "gapfill",
        text: "For months we grappled ___ why the idea did not catch on.",
        options: [],
        answer: 0,
        accept: ["with"],
        explain: "„For months we grappled with why the idea did not catch on.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "We had money at our disposal, a good team and a city that loved the idea.",
          "We had money at our disposal, a good team and a city that loved the idea",
        ],
        explain: "Yerleşmiş eşleşme: parçaları değiştirilemiyor.",
      },
      {
        kind: "short_answer",
        text: "How many stores do they work with now?",
        options: [],
        answer: 0,
        accept: ["forty", "40", "forty stores"],
        explain: "„We now work with forty stores in four cities.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u02-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 2,
    title: "Reporting a press statement",
    genre: "opinion",
    intro: "Bir basın açıklamasını habere dönüştür: kim ne söyledi?",
    gloss: [
      { de: "allege", tr: "iddia etmek" },
      { de: "ban", tr: "yasaklamak" },
      { de: "a valve", tr: "vana" },
      { de: "claimed", tr: "ileri sürdü" },
      { de: "conceded", tr: "kabul etti" },
      { de: "alleged", tr: "iddia etti" },
      { de: "a mouthpiece", tr: "sözcü" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "O ileri sürdü; o kabul etti; onlar iddia etti.",
        answer: "He claimed it; she conceded it; they alleged it.",
        hint: "Üç ayrı yargı, tek fark fiilde.",
      },
      {
        kind: "build",
        tr: "Karşı açıklamanın kendisi, onu aktaran fiilden daha azını söylüyordu.",
        answer: "The rebuttal itself said less than the verb used to report it.",
        hint: "Tam alıntılanan bir yanıt yine de kaybedebiliyor.",
      },
      {
        kind: "build",
        tr: "İsim vermeden sözcünün maskesini düşürüyorlar.",
        answer: "They unmask the mouthpiece without naming names.",
        hint: "Fiil, „alleged“ gibi, kanıttan önce hüküm veriyor.",
      },
      {
        kind: "build",
        tr: "Rakam pekâlâ varsayılandan yüksek olabilir.",
        answer: "The figure may well be higher than presumed.",
        hint: "„well“ kipi güçlendiriyor; edilgende fail yok.",
      },
      {
        kind: "form",
        prompt: "Sızıntı haberi için olgu kartını doldur.",
        facts: "Belediye başkanı suyun hiç tehlikede olmadığını ileri sürdü; şirketin müdürü bir vananın bozulduğunu kabul etti; köylüler arızanın geç bildirildiğini iddia ediyor; nehrin aşağı kesiminde balık avı yasak.",
        fields: [
          { label: "The mayor", answer: "claimed the water was safe", accept: ["the water was safe", "claimed it was safe"] },
          { label: "The director", answer: "conceded that a valve failed", accept: ["a valve failed", "conceded a valve failed"] },
          { label: "The farmers", answer: "allege it was reported late", accept: ["reported late", "it was reported late"] },
          { label: "Fishing", answer: "banned", accept: ["not allowed", "it is banned"] },
        ],
      },

    ],
  },
  {
    id: "en-c1-u02-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 2,
    title: "Weighing both sides",
    genre: "opinion",
    intro: "İki tarafı tartan bir değerlendirme: karşı görüşü kabul et, kendi görüşünü koru.",
    gloss: [
      { de: "granted", tr: "kabul" },
      { de: "albeit", tr: "her ne kadar" },
      { de: "much as", tr: "her ne kadar" },
      { de: "whereas", tr: "oysa" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kabul, rakam yüksek, her ne kadar açıklanabilir olsa da.",
        answer: "Granted, the figure is high, albeit explicable.",
        hint: "„albeit“ sıfat ya da öbek alıyor, cümle almıyor.",
      },
      {
        kind: "build",
        tr: "İki tarafı ne kadar eşit tartmak istesem de biri açıkça daha güçlü.",
        answer: "Much as I'd like to weigh up both sides equally, one is clearly stronger.",
        hint: "İçinde bir kişi olan ödün: eşit tartmak isteyen ben.",
      },
      {
        kind: "build",
        tr: "O noktayı kabul ederdi, oysa öteki geçiştirirdi.",
        answer: "She would concede the point, whereas he would gloss over it.",
        hint: "„whereas“ iki kişiyi yan yana koyuyor.",
      },
      {
        kind: "build",
        tr: "Güvencesiz kalması beklenmiş olabilirdi.",
        answer: "It might have been expected to stay precarious.",
        hint: "Dört katman: „might“, „have been“, „expected“, mastar.",
      },
      {
        kind: "build",
        tr: "Risk hesaplanamaz olma eğiliminde olurdu.",
        answer: "The risk would tend to be incalculable.",
        hint: "„would“ varsayım, „tend to“ eğilim.",
      },
    ],
  },
];
