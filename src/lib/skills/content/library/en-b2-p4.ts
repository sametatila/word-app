import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: uzman söyleşisi, radyo röportajı ve kurum içi rapor. Üçü de
 * kanıttan çıkarım yapar; dil bilgisi kesinlik dereceleri.
 */
export const enB2P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r4",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The House Tells You, If You Let It",
    genre: "Söyleşi",
    intro: "Bir yapı eksperiyle söyleşi okuyacaksın: neye önce bakıyor, izlerden ne çıkarıyor, neyi göremiyor.",
    gloss: [
      { de: "surveyor", tr: "eksper" },
      { de: "ceiling", tr: "tavan" },
      { de: "damp", tr: "rutubet" },
      { de: "chalky", tr: "tebeşirimsi" },
      { de: "gutter", tr: "oluk" },
      { de: "coincidence", tr: "tesadüf" },
      { de: "leak", tr: "sızıntı" },
    ],
    minutes: 9,
    text:
      "“THE HOUSE TELLS YOU, IF YOU LET IT”\n" +
      "An interview with Grete Sandvik, building surveyor\n\n" +
      "You walk into a house for the first time. What do you look at?\n" +
      "The floor, then the ceiling above it, and then I go outside. People expect me to look at the walls. " +
      "Walls are the last thing. A wall that is wet can't have got wet by itself; something above it or below " +
      "it must be doing that, and the wall is only where you see the result.\n\n" +
      "Can you really tell how old damage is?\n" +
      "Often, yes. Fresh damp is dark and cold to the touch. If the mark has a clean edge and the paint around " +
      "it is chalky, it must have dried and got wet again several times, which usually means a season, not an " +
      "accident. It may have started with one blocked gutter ten years ago.\n\n" +
      "What is the most common mistake buyers make?\n" +
      "They ask whether there is a problem. The better question is what somebody has already tried. A new floor " +
      "in one room and old floors everywhere else can't be a coincidence. Somebody may have been perfectly " +
      "honest about it, but I still want to know.\n\n" +
      "Do sellers hide things?\n" +
      "Less often than people think. Most sellers don't know. A house might have been repaired badly by the " +
      "owner before last, and the current owner just sees a room that looks fine.\n\n" +
      "What can't you tell?\n" +
      "Anything behind a finished wall, and anything that only happens in certain weather. If a leak needs wind " +
      "from the north-west, and there has been no wind from the north-west since March, I cannot see it. " +
      "I write that in the report, and people rarely read that line.",
    questions: [
      {
        text: "What does Grete look at first?",
        options: ["the floor and the ceiling", "the walls in every room", "the windows and the doors"],
        answer: 0,
        explain: "„The floor, then the ceiling above it, and then I go outside … Walls are the last thing.“",
      },
      {
        text: "What does a mark with a clean edge suggest?",
        options: [
          "It has dried and got wet several times.",
          "It comes from a gutter that was blocked last winter.",
          "It is fresh, because fresh damp is dark and cold.",
        ],
        answer: 0,
        explain: "„If the mark has a clean edge and the paint around it is chalky, it must have dried and got wet again several times.“",
      },
      {
        kind: "truefalse",
        text: "Grete looks at the walls last.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The floor, then the ceiling above it, and then I go outside … Walls are the last thing.“",
      },
      {
        kind: "gapfill",
        text: "A new floor in one room and old floors everywhere else can't be a ___.",
        options: [],
        answer: 0,
        accept: ["coincidence"],
        explain: "„A new floor in one room and old floors everywhere else can't be a coincidence.“",
      },
      {
        kind: "short_answer",
        text: "What can Grete not see?",
        options: [],
        answer: 0,
        accept: ["anything behind a finished wall", "things behind a wall", "what is behind a wall"],
        explain: "„Anything behind a finished wall, and anything that only happens in certain weather.“",
      },
      {
        text: "Why does she mention wind from the north-west?",
        options: [
          "Some faults only appear in certain weather.",
          "The house is facing the wrong way.",
          "Storms damage roofs more than walls.",
        ],
        answer: 0,
        explain: "„If a leak needs wind from the north-west, and there has been no wind … since March, I cannot see it.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l4",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Later Starts",
    genre: "Röportaj",
    intro: "Okul başlangıç saatini geciktiren iki okulun değerlendirmesini dinleyeceksin: ne değişti, ne değişmedi, ne öneriliyor.",
    gloss: [
      { de: "attendance", tr: "devam" },
      { de: "conflict", tr: "çatışma" },
      { de: "bedtime", tr: "yatma saati" },
      { de: "body clock", tr: "biyolojik saat" },
      { de: "supervise", tr: "gözetmek" },
      { de: "pupil", tr: "öğrenci" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Host", text: "Two schools in this region moved their first lesson from eight to nine. My guest evaluated both. Dr. Marta Bihl, good morning." },
      { speaker: "Marta", text: "Good morning." },
      { speaker: "Host", text: "The headline said that grades improved. Is that what you found?" },
      { speaker: "Marta", text: "Not exactly, and this is where I have to be careful. Grades in one school went up slightly. In the other, they did not move at all. What changed in both was attendance in the first two lessons." },
      { speaker: "Host", text: "So the effect is small?" },
      { speaker: "Marta", text: "The effect on marks is small. The effect on how the morning feels is not. Teachers reported far fewer conflicts before ten o'clock, and that must have been worth something, even if it does not appear in any table." },
      { speaker: "Host", text: "Critics say that teenagers will simply go to bed later." },
      { speaker: "Marta", text: "That was my own first thought, and it turned out to be wrong. Bedtimes moved by about fifteen minutes; the extra sleep was about forty. Their body clock genuinely shifts in those years, and it shifts back in the twenties." },
      { speaker: "Host", text: "What about parents who start work at eight?" },
      { speaker: "Marta", text: "That is the real objection and I have no clean answer. One school kept an early room open, supervised, from half past seven." },
      { speaker: "Marta", text: "About a fifth of the pupils use it, and interestingly they are not the tired ones. They are the ones with the longest journeys." },
      { speaker: "Host", text: "If you had to advise a school tomorrow?" },
      { speaker: "Marta", text: "Do not promise better grades. Promise a calmer first hour, and measure attendance. That you can deliver." },
    ],
    questions: [
      {
        text: "What changed in both schools?",
        options: [
          "attendance in the first lessons",
          "grades in every subject",
          "bedtimes by about an hour",
        ],
        answer: 0,
        explain: "„What changed in both was attendance in the first two lessons.“",
      },
      {
        text: "Why does Marta say the critics were wrong?",
        options: [
          "Bedtimes moved much less than sleep.",
          "Teenagers actually went to bed earlier.",
          "Nothing about sleep changed at all.",
        ],
        answer: 0,
        explain: "„Bedtimes moved by about fifteen minutes; the extra sleep was about forty.“",
      },
      {
        kind: "truefalse",
        text: "Marta has a clear answer for parents who start work at eight.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is the real objection and I have no clean answer.“",
      },
      {
        kind: "short_answer",
        text: "Who uses the early room?",
        options: [],
        answer: 0,
        accept: ["the longest journeys", "pupils with long journeys", "those with long journeys"],
        explain: "„… they are not the tired ones. They are the ones with the longest journeys.“",
      },
      {
        kind: "dictation",
        text: "Marta'nın okullara verdiği ilk tavsiyeyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Do not promise better grades.", "Do not promise better grades", "Don't promise better grades."],
        explain: "„Do not promise better grades.“ — olumsuz emir, yalın fiille.",
      },
      {
        text: "What does she advise a school to measure?",
        options: ["attendance", "grades in the first term", "bedtimes at home"],
        answer: 0,
        explain: "„Promise a calmer first hour, and measure attendance.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w4",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Why the Delivery Failed",
    genre: "Rapor",
    intro: "Bir aksaklığın nedenini araştıran kısa bir iç rapor yazacaksın; önce iki cümle kur, sonra raporu yaz.",
    gloss: [
      { de: "delivery", tr: "teslimat" },
      { de: "cause", tr: "neden" },
      { de: "likely", tr: "muhtemel" },
      { de: "log", tr: "kayıt defteri" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Paket salı günü depoda kalmış olmalı.",
        answer: "On Tuesday the parcel must have stayed in the warehouse.",
        alternatives: ["The parcel must have stayed in the warehouse on Tuesday."],
        hint: "Geçmiş için kesine yakın çıkarım „must have + üçüncü hâl“ ile kurulur.",
      },
      {
        kind: "build",
        tr: "Sürücü saat dörtte zili çalmış olamaz.",
        answer: "At four o'clock the driver can't have rung the bell.",
        alternatives: ["The driver can't have rung the bell at four o'clock."],
        hint: "Geçmiş için imkânsızlık „can't have“ ile söylenir; „mustn't have“ denmez.",
      },
      {
        kind: "free",
        prompt:
          "Bir aksaklık üzerine kısa bir iç rapor yaz: ne oldu, kesin olan ne, muhtemel olan ne, neyi eleyebiliyorsun ve ne öneriyorsun. Kesinlik derecelerini ayır.",
        checklist: [
          "Olayı tarih ve saatle yaz",
          "Kesin olanı kanıtıyla ayır",
          "Muhtemel açıklamayı ve elenen açıklamayı yaz",
          "İki somut öneriyle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "What is certain: …", tr: "Kesin olan: …" },
          { de: "The most likely explanation is …", tr: "En muhtemel açıklama …" },
          { de: "This can't have been …", tr: "Bu … olamaz" },
          { de: "It may have been …", tr: "… olmuş olabilir" },
          { de: "I recommend two changes: …", tr: "İki değişiklik öneriyorum: …" },
        ],
        sample:
          "Failed delivery, Tuesday the fourth, order 8812\n\n" +
          "What is certain: the parcel left our warehouse at seven fifty on Tuesday morning, it was scanned at " +
          "the depot at nine twenty, and it was scanned back into the depot at four fifteen with the note " +
          "“customer not at home”. The customer was at home from twelve onwards and has a camera at the door.\n\n" +
          "The most likely explanation is that the parcel stayed on the van and was never taken to the door. " +
          "The camera has no recording of anybody in our uniform, and the driver's own log shows twenty-two " +
          "stops in the last ninety minutes of the shift, which is roughly double the usual number.\n\n" +
          "This can't have been an address error: the label is correct in the photograph taken at the depot. " +
          "It may have been a genuine mistake at the end of a long shift rather than a decision, and I would " +
          "not treat it as one.\n\n" +
          "I recommend two changes. First, a scan at the door should be required before “not at home” can be " +
          "chosen. Second, the number of stops in the last hour should appear on the daily report, because at " +
          "the moment nobody sees it until something goes wrong.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s4",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Schools Start Later?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: kanıtı hakkıyla anlat, karşı tarafın en güçlü itirazını ver ve ölçütünü söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Okullar sabahları daha geç mi başlamalı? Kanıtı olduğu kadarıyla anlat, abartma; en güçlü itirazı ver ve hangi koşulla desteklediğini söyle.",
      bulletsTr: [
        "Kanıtın ne söylediğini, ne söylemediğini ayır",
        "En güçlü itirazı hakkıyla anlat",
        "Kendi koşulunu koy",
        "Neyin ölçüleceğini söyle",
      ],
      targets: [
        { de: "The evidence is real but narrower than …", tr: "Kanıt gerçek ama … olduğundan dar" },
        { de: "The strongest objection is not …, it is …", tr: "En güçlü itiraz … değil, …" },
        { de: "It must have made a difference to …", tr: "… için bir fark yaratmış olmalı" },
        { de: "I would support it on one condition: …", tr: "Tek bir koşulla desteklerim: …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I am in favor, but I want to be careful with the evidence, because the case is usually oversold. " +
        "The evidence is real but narrower than the headlines: grades barely move, attendance in the first " +
        "lessons clearly does, and teachers report fewer arguments before ten. That last one is not measured in " +
        "any table, and it must have made a difference to the people who spend those mornings in the building. " +
        "The strongest objection is not that teenagers will go to bed later; that has been tested and it is " +
        "mostly wrong. The strongest objection is the parent who starts work at eight and now has a child at " +
        "home for an extra hour. Nobody has a clean answer to that, and any school that pretends otherwise " +
        "will lose the argument in the first week. So I would support it on one condition: a supervised room " +
        "from half past seven, staffed and free, on the day the change begins and not a term later. And I would " +
        "promise attendance, not grades, because attendance is the thing the school can actually deliver.",
      rubricHint:
        "Kanıt abartılmamalı, en güçlü itiraz kabul edilmeli ve sonuç bir koşula bağlanmalı; çıkarım kipleri beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g4",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "must be, can't be, might have been",
    genre: "Kural",
    intro: "Bilmediğin bir şey hakkında ne kadar emin olduğunu İngilizcede fiil değil, önündeki kip belirtir.",
    focus: "Modals of deduction: must / can't / might, şimdi ve geçmiş",
    gloss: [
      { de: "spill", tr: "dökmek" },
      { de: "bell", tr: "zil" },
      { de: "miss", tr: "kaçırmak" },
      { de: "warehouse", tr: "depo" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Üç derece",
        tr: "Türkçede „olmalı“, „olamaz“ ve „olabilir“ bu işi görür. İngilizcede aynı üç derece kiplerle kurulur: „must“ neredeyse kesin evet, „can't“ neredeyse kesin hayır, „might / may / could“ mümkün.",
        examples: [
          { de: "The light is on, so she must be at home.", tr: "Işık yanıyor, evde olmalı." },
          { de: "He left five minutes ago, so he can't be there yet.", tr: "Beş dakika önce çıktı, daha orada olamaz." },
          { de: "I might have left my keys at work.", tr: "Anahtarlarımı işte bırakmış olabilirim." },
        ],
      },
      {
        heading: "Geçmiş için have + üçüncü hâl",
        tr: "Aynı üç kip geçmiş bir olay hakkında da kullanılır; tek fark arkalarına „have + üçüncü hâl“ gelmesidir.",
        examples: [
          { de: "The floor is wet. Somebody must have spilled something.", tr: "Yer ıslak. Biri bir şey dökmüş olmalı." },
          { de: "The driver can't have rung the bell.", tr: "Sürücü zili çalmış olamaz." },
          { de: "She might have missed the train.", tr: "Treni kaçırmış olabilir." },
        ],
      },
      {
        heading: "En sık hata: olumsuz",
        tr: "„must“ kipinin çıkarımdaki olumsuzu „mustn't“ değil, „can't“tir. „He mustn't be at home“ cümlesi bir yasak gibi okunur; „evde olamaz“ demek için „He can't be at home“ gerekir.",
        examples: [
          { de: "He can't be at home; his car is gone.", tr: "Evde olamaz; arabası yok." },
          { de: "You mustn't park here.", tr: "Buraya park etmek yasak.", note: "yasak, çıkarım değil" },
          { de: "It can't have been the wind; the window was locked.", tr: "Rüzgâr olamaz; pencere kilitliydi." },
        ],
      },
    ],
    questions: [
      {
        text: "The light is on, so she ___ at home.",
        options: ["must be", "must to be", "can be"],
        answer: 0,
        explain: "Kanıt güçlü ve sonuç neredeyse kesin: must be.",
      },
      {
        text: "He left five minutes ago, so he ___ be there yet.",
        options: ["can't", "mustn't", "doesn't have to"],
        answer: 0,
        explain: "Çıkarımın olumsuzu „can't“tir; „mustn't“ yasak bildirir.",
      },
      {
        text: "I don't know where my keys are. I ___ them at work.",
        options: ["might have left", "might left", "must left"],
        answer: 0,
        explain: "Geçmiş için kip + have + üçüncü hâl: might have left.",
      },
      {
        kind: "gapfill",
        text: "The floor is wet. Somebody ___ (must / spill) something.",
        options: [],
        answer: 0,
        accept: ["must have spilled", "must have spilt"],
        explain: "Geçmişteki güçlü çıkarım: must have + üçüncü hâl.",
      },
      {
        kind: "gapfill",
        text: "She isn't answering. She ___ (can't / hear) the phone.",
        options: [],
        answer: 0,
        accept: ["can't hear", "cannot hear"],
        explain: "Şu an için imkânsızlık: can't + yalın fiil.",
      },
      {
        kind: "gapfill",
        text: "The parcel ___ (must / stay) in the warehouse.",
        options: [],
        answer: 0,
        accept: ["must have stayed"],
        explain: "Geçmişte olmuş bir şey hakkında güçlü çıkarım.",
      },
      {
        kind: "gapfill",
        text: "He ___ (can't / ring) the bell; we were both in the kitchen.",
        options: [],
        answer: 0,
        accept: ["can't have rung", "cannot have rung"],
        explain: "Geçmiş için imkânsızlık: can't have + üçüncü hâl.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["He", "must", "have", "left", "already"],
        explain: "Kip + have + üçüncü hâl + zarf: He must have left already.",
      },
      {
        kind: "truefalse",
        text: "„He mustn't be at home“ ile „He can't be at home“ aynı anlama gelir.",
        options: ["True", "False"],
        answer: 1,
        explain: "İlki yasak bildirir; çıkarımın olumsuzu yalnız „can't“ ile kurulur.",
      },
      {
        kind: "truefalse",
        text: "„She might have missed the train.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Geçmişteki bir olasılık doğru biçimde kurulmuş: might have + üçüncü hâl.",
      },
    ],
  },
];
