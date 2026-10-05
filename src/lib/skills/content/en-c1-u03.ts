import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 3 — "Tam da ucuz değil, metni bir arada tutmak,
 * kopmadan ayrışmak, karşı tarafı alıntılamak".
 *
 * Dört ders: Not exactly cheap · Holding the text together ·
 * Dissent without rupture · Quoting the opponent.
 *
 *   Kelime: patronizing, hypocritical, reprehensible, trivialize,
 *           dramatize, disparage, superficiality, proximity, composure,
 *           unease, imposition, arbitrariness, profound, meticulous,
 *           leeway, snag, viable, irreversible, ascertain, avert, thwart,
 *           diminish, postulate, refute, substantiate, manifesto,
 *           ideology, falsify, doctrine, dialectic.
 *   Kalıp:  Not exactly cheap, that one. ·
 *           I wouldn't say no to a less patronizing tone. ·
 *           Hardly modest, is it? ·
 *           This alone explains the proximity. ·
 *           Such composure is rare. ·
 *           The latter reading leaves an unease. ·
 *           Granted, there is little leeway, albeit some. ·
 *           Much as I acknowledge the snag, the plan stays viable. ·
 *           The step is irreversible, whereas the delay is not. ·
 *           She postulates it; he refutes it; they substantiate it. ·
 *           The manifesto openly claims what the ideology merely assumes. ·
 *           To report a claim is not to falsify it.
 *
 * Ünitenin tek öğretme noktası OLUMSUZLA SÖYLENEN OLUMLU (litotes).
 * „Not exactly cheap“ pahalı demek; „I wouldn't say no“ evet demek;
 * „Hardly modest“ ise hem „hiç değil“ hem de ters okumayla
 * „epeyce“ olabiliyor — ve bunu ayıran şey ton değil, bağlam. „Hardly“
 * ayrıca kendi olumsuzunu taşıyor: yanına ikinci bir „not“ gelmiyor.
 */
export const enC1U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u03-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 3,
    title: "Dinner at Terrace Nine",
    genre: "review",
    intro: "Yeni açılan bir restoran hakkında eleştiri. Eleştirmen restoranı gerçekten beğenmiş mi?",
    gloss: [
      { de: "a roof", tr: "çatı" },
      { de: "a terrace", tr: "teras" },
      { de: "ordinary", tr: "sıradan" },
      { de: "an anniversary", tr: "yıl dönümü" },
      { de: "rhythm", tr: "ritim" },
      { de: "lamb", tr: "kuzu eti" },
      { de: "a dish", tr: "yemek" },
      { de: "a goat", tr: "keçi" },
      { de: "a pepper", tr: "biber" },
      { de: "roasted", tr: "közlenmiş" },
      { de: "simply", tr: "sade bir şekilde" },
      { de: "an octopus", tr: "ahtapot" },
      { de: "grilled", tr: "ızgara" },
      { de: "cross", tr: "karşıya geçmek" },
      { de: "a ferry", tr: "vapur" },
      { de: "the top floor", tr: "en üst kat" },
      { de: "occupy", tr: "kaplamak" },
      { de: "a harbor", tr: "liman" },
    ],
    minutes: 11,
    text:
      "ON THE ROOF: A NEW TABLE ABOVE THE HARBOR\n" +
      "Not exactly cheap, this one. Dinner for two at Terrace Nine, with wine, came to $210, and the menu makes no apology for it.\n" +
      "The setting is hardly modest, is it? The restaurant occupies the top floor of a former customs building, and from almost every table you can watch the ferries cross the harbor as the sun goes down. It is no small achievement to make a room this large feel calm.\n" +
      "The food is not bad at all. The grilled octopus was tender and simply dressed, and a plate of roasted peppers with goat cheese was the kind of dish you remember the next morning. Less convincing was the lamb, which arrived a little dry and a little lonely on a very large plate.\n" +
      "Service was not what you would call quick. We waited twenty minutes for bread and another forty for our main courses, and when I asked about the delay, the waiter explained, with some composure, that the kitchen was „still finding its rhythm“. I wouldn't say no to a kitchen that found it faster.\n" +
      "The wine list is not short of ambition either. There are more than two hundred bottles, many of them local, and the staff clearly know them well. I wouldn't say no to a smaller, cheaper selection by the glass, however; at present there are only four.\n" +
      "Is it worth the money? For a birthday or an anniversary, it is hard to think of a better view in the city. For an ordinary Tuesday, the prices are not exactly an invitation.\n" +
      "Terrace Nine, 9 Harbor Street. Open Tuesday to Sunday from six in the evening. Reservations recommended.",
    questions: [
      {
        text: "How much did dinner for two cost?",
        options: ["$210", "$90", "$400"],
        answer: 0,
        explain: "„Dinner for two at Terrace Nine, with wine, came to $210…“",
      },
      {
        text: "Which dish did the reviewer like least?",
        options: ["the lamb", "the octopus", "the peppers"],
        answer: 0,
        explain: "„Less convincing was the lamb, which arrived a little dry…“",
      },
      {
        kind: "truefalse",
        text: "The reviewer had to wait a long time for the main courses.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We waited twenty minutes for bread and another forty for our main courses…“",
      },
      {
        kind: "gapfill",
        text: "Service was not what you would call ___.",
        options: [],
        answer: 0,
        accept: ["quick"],
        explain: "„Service was not what you would call quick.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The restaurant is on the top floor.",
          "The octopus was tender.",
          "The main courses came late.",
          "The wine list has more than two hundred bottles.",
        ],
        explain: "Mekân, yemek, servis, en sonda şarap listesi.",
      },
      {
        kind: "short_answer",
        text: "How many wines are sold by the glass?",
        options: [],
        answer: 0,
        accept: ["four", "4", "only four"],
        explain: "„…at present there are only four.“",
      },
    ],
  },
  {
    id: "en-c1-u03-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 3,
    title: "An emergency landing at Van",
    genre: "article",
    intro: "Acil iniş yapan bir uçak üzerine haber. Olay nasıl kazasız atlatıldı?",
    gloss: [
      { de: "a first officer", tr: "ikinci pilot" },
      { de: "recognize", tr: "takdir etmek" },
      { de: "scare", tr: "korkutmak" },
      { de: "beyond", tr: "ötesinde" },
      { de: "unusual", tr: "olağan dışı" },
      { de: "a strike", tr: "çarpma" },
      { de: "a failure", tr: "arıza" },
      { de: "an explanation", tr: "açıklama" },
      { de: "a crew", tr: "mürettebat" },
      { de: "a cabin", tr: "kabin" },
      { de: "an airline", tr: "havayolu" },
      { de: "an investigator", tr: "müfettiş" },
      { de: "a captain", tr: "kaptan" },
      { de: "an engine", tr: "motor" },
      { de: "power", tr: "güç" },
      { de: "a runway", tr: "pist" },
    ],
    minutes: 11,
    text:
      "SIX MINUTES OVER THE LAKE\n" +
      "At 7:42 on Sunday evening, a small passenger plane carrying 38 people lost power in one of its two engines shortly after leaving Van. Six minutes later it was back on the runway, and nobody on board had been hurt.\n" +
      "The captain, Charlie Palmer, had flown the route more than four hundred times. This alone explains part of what happened next: she knew exactly how far away the airport was and how much height she could afford to lose. Passengers describe a calm announcement, a short silence and then the lights of the runway.\n" +
      "Such composure is rare, and investigators were quick to praise it. „She did everything by the book, and she did it fast,“ said one of them. The first officer, who had joined the airline only three months earlier, contacted the tower and prepared the cabin crew within ninety seconds.\n" +
      "Two explanations for the engine failure were considered on Monday: a bird strike and a problem with the fuel supply. The latter was ruled out within hours, after tests on the fuel showed nothing unusual. Remains of a large bird were later found in the engine.\n" +
      "This finding matters beyond one flight. Bird strikes near the lake have increased by a third in five years, and the airport has asked for money to scare birds away from the runway. Such requests have been refused twice before, on grounds of cost.\n" +
      "The passengers, meanwhile, have written to the airline asking that the crew be recognized. Several have also said that they will fly again next week, a decision that says something about the unease they felt, and about how quickly it passed.\n" +
      "The airline has promised a full report within thirty days.",
    questions: [
      {
        text: "How many times had the captain flown the route?",
        options: ["more than four hundred", "thirty-eight", "six"],
        answer: 0,
        explain: "„The captain, Charlie Palmer, had flown the route more than four hundred times.“",
      },
      {
        text: "What caused the engine failure?",
        options: ["a bird", "the fuel supply", "a mistake in the tower"],
        answer: 0,
        explain: "„Remains of a large bird were later found in the engine.“",
      },
      {
        kind: "truefalse",
        text: "The airport has already received money to scare birds away.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Such requests have been refused twice before, on grounds of cost.“",
      },
      {
        kind: "gapfill",
        text: "Such ___ is rare, and investigators were quick to praise it.",
        options: [],
        answer: 0,
        accept: ["composure"],
        explain: "„Such composure is rare, and investigators were quick to praise it.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "One engine lost power after leaving Van.",
          "The captain made a calm announcement.",
          "Tests on the fuel showed nothing unusual.",
          "The passengers wrote to the airline.",
        ],
        explain: "Arıza, kaptanın soğukkanlılığı, inceleme, en sonda yolcuların mektubu.",
      },
      {
        kind: "short_answer",
        text: "How many people were on the plane?",
        options: [],
        answer: 0,
        accept: ["38", "thirty-eight", "38 people"],
        explain: "„…a small passenger plane carrying 38 people…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u03-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "A later start for the school",
    genre: "dialogue",
    intro: "Okul aile birliğinde derslerin daha geç başlaması tartışılıyor. İki taraf nasıl uzlaşıyor?",
    gloss: [
      { de: "rearrange", tr: "yeniden düzenlemek" },
      { de: "attendance", tr: "devamlılık" },
      { de: "a timetable", tr: "ders programı" },
      { de: "a primary school", tr: "ilkokul" },
      { de: "a teenager", tr: "ergen" },
      { de: "leeway", tr: "hareket alanı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Terry", text: "Before the vote, can I say where I stand? I know we do not agree on this." },
      { speaker: "Eleanor", text: "Go ahead. That is what the meeting is for." },
      { speaker: "Terry", text: "Granted, the research on teenagers and sleep is strong, albeit mostly from other countries. A later start would probably help them." },
      { speaker: "Eleanor", text: "So you support moving the start to nine." },
      { speaker: "Terry", text: "Much as I acknowledge the evidence, I do not think the plan is viable this year. The buses are shared with the primary school, and the timetable cannot change before September." },
      { speaker: "Eleanor", text: "Much as I respect the bus problem, the plan stays viable. The council has offered two extra buses for the morning." },
      { speaker: "Terry", text: "For one year. After that there is little leeway in the budget, albeit some." },
      { speaker: "Eleanor", text: "Then we try it for one year and measure it. If the grades and the attendance do not improve, we go back." },
      { speaker: "Terry", text: "That is my worry. Changing the timetable is irreversible, whereas a delay is not. Parents will rearrange their work around the new start." },
      { speaker: "Eleanor", text: "Fair. Could we agree to a one-year trial, with a clear date to decide?" },
      { speaker: "Terry", text: "I could vote for that, albeit with a note in the minutes about the buses." },
      { speaker: "Eleanor", text: "Done. I will write it down exactly as you said it." },
    ],
    questions: [
      {
        text: "What new start time are they discussing?",
        options: ["nine", "eight", "ten"],
        answer: 0,
        explain: "„So you support moving the start to nine.“",
      },
      {
        text: "Why does Terry think the plan is difficult this year?",
        options: ["The buses are shared with the primary school.", "The teachers are against it.", "The research is weak."],
        answer: 0,
        explain: "„The buses are shared with the primary school, and the timetable cannot change before September.“",
      },
      {
        kind: "truefalse",
        text: "The council has offered extra buses.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The council has offered two extra buses for the morning.“",
      },
      {
        kind: "gapfill",
        text: "After that there is little ___ in the budget, albeit some.",
        options: [],
        answer: 0,
        accept: ["leeway"],
        explain: "„After that there is little leeway in the budget, albeit some.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Changing the timetable is irreversible, whereas a delay is not.",
          "Changing the timetable is irreversible, whereas a delay is not",
        ],
        explain: "Ödün yok: iki olgu yan yana, çizgiyi okur çekiyor.",
      },
      {
        kind: "short_answer",
        text: "How long will the trial last?",
        options: [],
        answer: 0,
        accept: ["one year", "a year", "for one year"],
        explain: "„Could we agree to a one-year trial, with a clear date to decide?“",
      },
    ],
  },
  {
    id: "en-c1-u03-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Checking a crime figure",
    genre: "monologue",
    intro: "Radyoda bir doğrulama programı. Parti bildirgesindeki rakam doğru mu?",
    gloss: [
      { de: "a verdict", tr: "hüküm" },
      { de: "real", tr: "gerçek" },
      { de: "rise", tr: "artmak" },
      { de: "capture", tr: "yakalamak" },
      { de: "entirely", tr: "tamamen" },
      { de: "an owner", tr: "sahip" },
      { de: "crime", tr: "suç" },
      { de: "a manifesto", tr: "bildirge" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Jerry", text: "Welcome back to Fact Check. This week: a claim from the manifesto of the Future Party, published on Monday." },
      { speaker: "Jerry", text: "The manifesto says that street crime in the city has doubled in five years. The party repeated the figure at three rallies this week." },
      { speaker: "Jerry", text: "We asked the party for its source. It sent us a newspaper article, which in turn quoted a survey of shop owners, not police data." },
      { speaker: "Jerry", text: "So we checked the police data. It does not substantiate the claim. Reported street crime rose by about twelve percent over five years, not a hundred." },
      { speaker: "Jerry", text: "Does that refute the manifesto? Not entirely. Many crimes are never reported, and a survey of shop owners may capture some of them." },
      { speaker: "Jerry", text: "But the party did not say that. It presented the figure as a fact. The manifesto openly claims what the survey merely suggests." },
      { speaker: "Jerry", text: "Researchers at the university postulate that fear of crime rises when shops close, whatever the real numbers do. That is an idea, not yet a finding." },
      { speaker: "Jerry", text: "Our verdict: misleading. To report a survey is not to falsify it, but to present it as police data comes close." },
      { speaker: "Jerry", text: "The party has told us it will correct the figure on its website. We will check whether it does." },
    ],
    questions: [
      {
        text: "What does the manifesto say about street crime?",
        options: ["It has doubled in five years.", "It has fallen.", "It has risen by twelve percent."],
        answer: 0,
        explain: "„The manifesto says that street crime in the city has doubled in five years.“",
      },
      {
        text: "Where did the figure really come from?",
        options: ["a survey of shop owners", "police data", "a university study"],
        answer: 0,
        explain: "„…which in turn quoted a survey of shop owners, not police data.“",
      },
      {
        kind: "truefalse",
        text: "The police data substantiates the claim.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It does not substantiate the claim.“",
      },
      {
        kind: "gapfill",
        text: "Reported street crime rose by about ___ percent over five years.",
        options: [],
        answer: 0,
        accept: ["twelve", "12"],
        explain: "„Reported street crime rose by about twelve percent over five years, not a hundred.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The manifesto openly claims what the survey merely suggests.",
          "The manifesto openly claims what the survey merely suggests",
        ],
        explain: "İki belge hakkında bir cümle ve ikisi hakkında bir hüküm.",
      },
      {
        kind: "short_answer",
        text: "What is the verdict of the program?",
        options: [],
        answer: 0,
        accept: ["misleading", "it is misleading"],
        explain: "„Our verdict: misleading.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u03-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 3,
    title: "Polite complaints",
    genre: "opinion",
    intro: "Kibar bir şikâyet: eleştiriyi yumuşatarak dile getir.",
    gloss: [
      { de: "lamb", tr: "kuzu eti" },
      { de: "not exactly", tr: "tam da değil" },
      { de: "wouldn't say no", tr: "hayır demezdim" },
      { de: "hardly", tr: "pek de değil" },
      { de: "the latter", tr: "ikincisi" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Tam da ucuz sayılmaz, o.",
        answer: "Not exactly cheap, that one.",
        hint: "Olumsuzla söylenen olumlu: pahalı demek.",
      },
      {
        kind: "build",
        tr: "Daha az küçümseyici bir tona hayır demezdim.",
        answer: "I wouldn't say no to a less patronizing tone.",
        hint: "İki olumsuz bir rica kuruyor.",
      },
      {
        kind: "build",
        tr: "Pek alçakgönüllü sayılmaz, değil mi?",
        answer: "Hardly modest, is it?",
        hint: "„hardly“ kendi olumsuzunu taşıyor; ikinci „not“ olmaz.",
      },
      {
        kind: "build",
        tr: "İkinci okuma bir huzursuzluk bırakıyor.",
        answer: "The latter reading leaves an unease.",
        hint: "„the latter“ tam olarak ikiden ikincisi demek.",
      },
      {
        kind: "form",
        prompt: "Restoran için şikâyet notunu doldur.",
        facts: "İki kişilik akşam yemeği 210 dolar tuttu; ana yemekler kırk dakika gecikti; kuzu eti biraz kuruydu; kadehle yalnızca dört şarap var.",
        fields: [
          { label: "The price", answer: "not exactly cheap", accept: ["expensive", "$210", "210 dollars"] },
          { label: "The wait", answer: "hardly quick", accept: ["forty minutes", "too long", "slow"] },
          { label: "The lamb", answer: "a little dry", accept: ["dry"] },
          { label: "Wine by the glass", answer: "only four", accept: ["four", "4"] },
        ],
      },

    ],
  },
  {
    id: "en-c1-u03-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 3,
    title: "Answering a manifesto",
    genre: "opinion",
    intro: "Bir parti bildirgesine yanıt: karşı tarafın iddialarını adil biçimde aktar.",
    gloss: [
      { de: "postulates", tr: "öne sürüyor" },
      { de: "refutes", tr: "çürütüyor" },
      { de: "substantiate", tr: "belgelemek" },
      { de: "leeway", tr: "manevra alanı" },
      { de: "assume", tr: "varsaymak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "O öne sürüyor; o çürütüyor; onlar belgeliyor.",
        answer: "She postulates it; he refutes it; they substantiate it.",
        hint: "Üç fiil, aynı ölçekte üç ayrı konum.",
      },
      {
        kind: "build",
        tr: "Manifesto, ideolojinin yalnızca varsaydığını açıkça iddia ediyor.",
        answer: "The manifesto openly claims what the ideology merely assumes.",
        hint: "İki belge hakkında bir cümle ve bir hüküm.",
      },
      {
        kind: "build",
        tr: "Bir iddiayı aktarmak onu tahrif etmek değildir.",
        answer: "To report a claim is not to falsify it.",
        hint: "Mastarlı iki yarı karşı karşıya konuyor.",
      },
      {
        kind: "build",
        tr: "Kabul, manevra alanı az, her ne kadar biraz olsa da.",
        answer: "Granted, there is little leeway, albeit some.",
        hint: "„albeit“ soruyu açık bırakıyor.",
      },
      {
        kind: "build",
        tr: "Adım geri döndürülemez, oysa gecikme öyle değil.",
        answer: "The step is irreversible, whereas the delay is not.",
        hint: "Ödün yok; iki olgu yan yana.",
      },
    ],
  },
];
