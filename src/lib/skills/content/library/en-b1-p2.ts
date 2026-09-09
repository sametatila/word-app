import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler parti 1'den ayrı: yerel haber, podcast ve forum katkısı. Üçü de
 * koşul cümleleriyle çalışıyor; dil bilgisi birinci ve ikinci tip koşul.
 */
export const enB1P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "The Night the Town Turned Off Its Lights",
    genre: "Haber",
    intro: "Bir kasabanın sokak lambalarını doksan dakika söndürdüğü geceyi anlatan haberi okuyacaksın: fikir kimden çıktı, ne ölçüldü, sonra ne olacak.",
    gloss: [
      { de: "council", tr: "belediye meclisi" },
      { de: "electricity", tr: "elektrik" },
      { de: "physics", tr: "fizik" },
      { de: "measure", tr: "ölçmek" },
      { de: "upwards", tr: "yukarı doğru" },
      { de: "cover", tr: "kapak" },
      { de: "waste", tr: "israf etmek" },
    ],
    minutes: 7,
    text:
      "THE NIGHT THE TOWN TURNED OFF ITS LIGHTS\n\n" +
      "For ninety minutes last Friday, most of Halden was dark. Between ten and half past eleven the council " +
      "switched off the street lights in four areas, and around six hundred people came out to look up.\n\n" +
      "The idea came from a group of teachers at the secondary school. “If you ask children to draw the night " +
      "sky, they draw six or seven stars,” says Kari Lund, who teaches physics. “That is what they see. " +
      "If they lived thirty kilometers from here, they would draw hundreds.”\n\n" +
      "The evening was not only about stars. Two engineers from the council used the time to measure how much " +
      "light the town sends upwards. Their first result: about a third of it does not light anything at all. " +
      "It goes past the road and into the sky, because the lamps are old and have no cover on top.\n\n" +
      "“If we changed those lamps, we would use less electricity and see more sky,” said one of them. " +
      "“The problem is that nobody notices the light we waste. You cannot see what is missing.”\n\n" +
      "The council will decide in November. Until then, the group is asking people a simple question: " +
      "if your street were darker, would you feel less safe, or would you just see better?",
    questions: [
      {
        text: "What happened last Friday?",
        options: [
          "The town turned off some street lights for an evening.",
          "The council cut the electricity to save money.",
          "A school organized a trip to see the stars.",
        ],
        answer: 0,
        explain: "„… the council switched off the street lights in four areas, and around six hundred people came out to look up.“",
      },
      {
        text: "What did the two engineers measure?",
        options: [
          "how much light goes into the sky",
          "how many people came out that evening",
          "how bright the stars above the town are",
        ],
        answer: 0,
        explain: "„… used the time to measure how much light the town sends upwards.“",
      },
      {
        kind: "truefalse",
        text: "The idea for the evening came from teachers.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The idea came from a group of teachers at the secondary school.“",
      },
      {
        kind: "gapfill",
        text: "About ___ of the light does not light anything at all.",
        options: [],
        answer: 0,
        accept: ["a third", "one third", "1/3"],
        explain: "„Their first result: about a third of it does not light anything at all.“",
      },
      {
        kind: "short_answer",
        text: "When will the council decide?",
        options: [],
        answer: 0,
        accept: ["in November", "November", "next November"],
        explain: "„The council will decide in November.“",
      },
      {
        text: "Why does the engineer say nobody notices the waste?",
        options: [
          "Because you cannot see light that is missing.",
          "Because the lamps are already very old.",
          "Because the council does not publish numbers.",
        ],
        answer: 0,
        explain: "„The problem is that nobody notices the light we waste. You cannot see what is missing.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "A Free Year",
    genre: "Podcast",
    intro: "Bir podcast üç kişiye aynı soruyu soruyor: bir yıl boyunca masrafların karşılansaydı ne yapardın?",
    gloss: [
      { de: "warehouse", tr: "depo" },
      { de: "certificate", tr: "sertifika" },
      { de: "honestly", tr: "doğrusu" },
      { de: "bored", tr: "sıkılmış" },
      { de: "electrician", tr: "elektrikçi" },
      { de: "opposite", tr: "zıt" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Host", text: "Welcome back. Today's question is simple and impossible: if somebody paid your rent and your bills for one year, what would you do?" },
      { speaker: "Host", text: "We asked three people. First, Tomas, who is twenty-six and works in a warehouse." },
      { speaker: "Tomas", text: "Everybody expects me to say travel. I wouldn't. I would finish the electrician course I stopped four years ago. If I had that certificate, my whole life would look different in ten years." },
      { speaker: "Host", text: "Second, Ruth, sixty-one, a nurse for thirty years." },
      { speaker: "Ruth", text: "I would sleep. Honestly. And then, after about a month, I would be bored and I would go back two days a week. If I stopped completely, I think I would lose something." },
      { speaker: "Host", text: "And third, Amal, who is thirty-four and has two small children." },
      { speaker: "Amal", text: "People always ask what you would do. Nobody asks what you would stop doing. I would stop apologizing for being late everywhere." },
      { speaker: "Amal", text: "If I had the time, I would just be on time, and that would change more than any big plan." },
      { speaker: "Host", text: "Three answers, and not one of them is a holiday. Next week we ask the opposite question: what would you do if you had one week and no money?" },
    ],
    questions: [
      {
        text: "What is the question in this episode?",
        options: [
          "what people would do with a paid free year",
          "how people usually spend their holidays",
          "why people change jobs after thirty",
        ],
        answer: 0,
        explain: "„… if somebody paid your rent and your bills for one year, what would you do?“",
      },
      {
        text: "What would Tomas do?",
        options: ["finish a course he stopped", "travel around the world", "start his own business"],
        answer: 0,
        explain: "„I would finish the electrician course I stopped four years ago.“",
      },
      {
        kind: "truefalse",
        text: "Ruth would stop working completely.",
        options: ["True", "False"],
        answer: 1,
        explain: "„… I would go back two days a week. If I stopped completely, I think I would lose something.“",
      },
      {
        kind: "short_answer",
        text: "What would Amal stop doing?",
        options: [],
        answer: 0,
        accept: ["apologizing for being late", "saying sorry for being late", "apologizing"],
        explain: "„I would stop apologizing for being late everywhere.“",
      },
      {
        kind: "dictation",
        text: "Amal'ın herkesin sormadığı soruyu anlattığı cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Nobody asks what you would stop doing.", "Nobody asks what you would stop doing"],
        explain: "„Nobody asks what you would stop doing.“ — dolaylı soru düz cümle sırasıyla kurulur.",
      },
      {
        text: "What does the host notice at the end?",
        options: ["Nobody chose a holiday.", "Everybody wants more money.", "All three would move away."],
        answer: 0,
        explain: "„Three answers, and not one of them is a holiday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "A Terrace on the Roof?",
    genre: "Forum katkısı",
    intro: "Apartmanın forumunda çatı terası tartışılıyor; önce iki cümle kur, sonra gerekçeli katkını yaz.",
    gloss: [
      { de: "terrace", tr: "teras" },
      { de: "railing", tr: "korkuluk" },
      { de: "quiet hours", tr: "sessizlik saatleri" },
      { de: "instalment", tr: "taksit" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Herkes katılırsa maliyet daire başına iki bin euro olacak.",
        answer: "If everybody joins, the cost will be two thousand euros per flat.",
        alternatives: ["The cost will be two thousand euros per flat if everybody joins."],
        hint: "Birinci tip koşulda „if“ yarısı geniş zaman, ana yarısı „will“ alır.",
      },
      {
        kind: "build",
        tr: "Terası ben planlasaydım, işe gölgeyle başlardım.",
        answer: "If I planned the terrace, I would start with shade.",
        alternatives: ["I would start with shade if I planned the terrace."],
        hint: "İkinci tip koşulda „if“ yarısı geçmiş biçim, ana yarısı „would“ alır.",
      },
      {
        kind: "free",
        prompt:
          "Apartmanının forumunda çatı terası öneriliyor. Katkını yaz: net bir tutum al, iki gerekçe ver, bir şart koy, haklı bulduğun bir itirazı kabul et ve somut bir öneriyle bitir.",
        stimulus:
          "Proposal for the owners' meeting: we want to open the roof as a shared terrace. Estimated cost: " +
          "twenty-four thousand euros for the railing, the door and the floor, shared between the twelve flats. " +
          "Please write your opinion before the thirtieth of April.",
        checklist: [
          "Tutumunu ilk cümlede söyle",
          "İki gerekçe ver ve birini örnekle",
          "Bir şart koy ve nedenini açıkla",
          "Bir itirazı kabul et ve somut öneriyle bitir",
        ],
        minWords: 60,
        phrases: [
          { de: "I am in favor, but …", tr: "Yanayım, ama …" },
          { de: "Two reasons first.", tr: "Önce iki gerekçe." },
          { de: "My condition is …", tr: "Şartım şu: …" },
          { de: "I also accept the objection about …", tr: "… ile ilgili itirazı da kabul ediyorum" },
          { de: "If … were …, I think …", tr: "… olsaydı, bence …" },
        ],
        sample:
          "I am in favor, but only with one condition. Two reasons first. If we open the roof, the building gets " +
          "a real common space for the first time; at the moment the only place we meet is the letter boxes. " +
          "And a terrace is worth more than a new front door, both for us now and if somebody sells later. " +
          "My condition is the noise. If there are no times written down, the flats on the top floor will pay " +
          "for everybody's summer. I would put quiet hours from ten at night in the same paper as the costs. " +
          "I also accept the objection about money: two thousand euros is a lot in one year. If the payment were " +
          "spread over three years, I think most of us could manage it. So: yes to the terrace, with quiet hours " +
          "and with instalments.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s2",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "One Extra Hour",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir seçim yap, gerekçelendir ve neyi seçmediğini de söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Her günün yirmi beş saat olsaydı, o fazladan saati neye ayırırdın? Seçimini söyle, en az iki gerekçeyle destekle ve akla gelen bir seçeneği neden seçmediğini açıkla.",
      bulletsTr: [
        "Seçimini tek cümleyle söyle",
        "İki gerekçe ver, biri somut olsun",
        "Akla ilk gelen seçeneği neden seçmediğini söyle",
        "Kısa bir sonuçla bitir",
      ],
      targets: [
        { de: "If I had one extra hour, I would …", tr: "Fazladan bir saatim olsaydı, … yapardım" },
        { de: "The first reason is …", tr: "İlk gerekçe …" },
        { de: "Of course I could say …", tr: "Elbette … diyebilirdim" },
        { de: "But if I am honest, …", tr: "Ama dürüst olursam, …" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "If I had one extra hour every day, I would not use it for work, and I would not use it for sport " +
        "either. I would use it for cooking. The first reason is simple: at the moment I cook badly and fast, " +
        "and I eat the same four things. If I had an hour, I would learn to cook properly, and after a year " +
        "that is three hundred and sixty-five meals. The second reason is that cooking is the only thing I do " +
        "where nothing else can happen at the same time; my phone is in the other room because my hands are " +
        "wet, and that is rare now. Of course I could say sleep, and my doctor would agree. But if I am honest, " +
        "I would waste an extra hour of sleep by going to bed later. An hour in the kitchen is harder to waste.",
      rubricHint:
        "İkinci tip koşul beklenir (If I had …, I would …); en az iki gerekçe ve reddedilen bir seçenek bulunmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g2",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "if I go and if I went",
    genre: "Kural",
    intro: "Aynı „if“ kelimesi iki ayrı dünyayı kurar: biri gerçekten olabilecek, öteki yalnız hayal edilen.",
    focus: "Conditionals 1 ve 2",
    gloss: [
      { de: "catch", tr: "yetişmek" },
      { de: "answer", tr: "cevap" },
      { de: "flat", tr: "daire" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Gerçek olan: birinci tip",
        tr: "Türkçede „yağarsa kalırız“ dersin. İngilizcede aynı yapı iki parçadır: „if“ yarısında geniş zaman, ana yarıda „will“. Bu tip gerçekten olabilecek bir gelecek için kullanılır.",
        examples: [
          { de: "If it rains tomorrow, we will stay at home.", tr: "Yarın yağmur yağarsa evde kalırız." },
          { de: "If you leave now, you will catch the bus.", tr: "Şimdi çıkarsan otobüse yetişirsin." },
          { de: "We will call you if there is a problem.", tr: "Bir sorun olursa seni ararız." },
        ],
      },
      {
        heading: "Hayal olan: ikinci tip",
        tr: "Gerçekleşmesi uzak ya da imkânsız bir durumda „if“ yarısında geçmiş biçim, ana yarıda „would“ kullanılır. Geçmiş biçim burada zaman değil, uzaklık gösterir — Türkçedeki „-seydi“ gibi.",
        examples: [
          { de: "If I had more money, I would buy a bigger flat.", tr: "Daha çok param olsa daha büyük bir daire alırdım." },
          { de: "If she knew the answer, she would tell us.", tr: "Cevabı bilse bize söylerdi." },
          { de: "If I were you, I would ask her.", tr: "Yerinde olsam ona sorardım.", note: "kalıp: If I were you" },
        ],
      },
      {
        heading: "İki sık hata",
        tr: "Birincisi: „if“ yarısında „will“ kullanılmaz — „If it will rain“ yanlıştır. İkincisi: virgül yalnız „if“ yarısı önce geldiğinde konur; sona gelirse virgül yoktur.",
        examples: [
          { de: "If it rains, we will stay at home.", tr: "Yağmur yağarsa evde kalırız.", note: "önce if, virgül var" },
          { de: "We will stay at home if it rains.", tr: "Yağmur yağarsa evde kalırız.", note: "sonra if, virgül yok" },
          { de: "If I had a car, I would drive to work.", tr: "Arabam olsa işe arabayla giderdim." },
        ],
      },
    ],
    questions: [
      {
        text: "If it ___ tomorrow, we will stay at home.",
        options: ["rains", "will rain", "rained"],
        answer: 0,
        explain: "Birinci tipte „if“ yarısı geniş zamandır; „will“ oraya girmez.",
      },
      {
        text: "If I ___ more money, I would buy a bigger flat.",
        options: ["had", "have", "will have"],
        answer: 0,
        explain: "Ana yarıda „would“ var, yani ikinci tip: „if“ yarısı geçmiş biçim alır.",
      },
      {
        text: "If I were you, I ___ ask her.",
        options: ["would", "will", "did"],
        answer: 0,
        explain: "„If I were you“ kalıbı ikinci tiptir ve ana yarıda „would“ ister.",
      },
      {
        kind: "gapfill",
        text: "If you ___ (leave) now, you will catch the bus.",
        options: [],
        answer: 0,
        accept: ["leave"],
        explain: "Gerçekten olabilecek bir durum: birinci tip, geniş zaman.",
      },
      {
        kind: "gapfill",
        text: "If she ___ (know) the answer, she would tell us.",
        options: [],
        answer: 0,
        accept: ["knew"],
        explain: "Ana yarıda „would“ olduğu için „if“ yarısı geçmiş biçim alır: knew.",
      },
      {
        kind: "gapfill",
        text: "We ___ (call) you if there is a problem.",
        options: [],
        answer: 0,
        accept: ["will call", "'ll call"],
        explain: "„if“ yarısı geniş zamanda; ana yarı „will“ alır.",
      },
      {
        kind: "gapfill",
        text: "If I ___ (be) taller, I would play basketball.",
        options: [],
        answer: 0,
        accept: ["were", "was"],
        explain: "İkinci tipte „be“ fiili için ölçünlü biçim „were“dir; konuşmada „was“ da duyulur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["If", "it", "rains", "we", "will", "stay"],
        explain: "„if“ yarısı önce, ana yarı sonra: If it rains, we will stay.",
      },
      {
        kind: "truefalse",
        text: "„If it will rain, we will stay at home.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„if“ yarısında „will“ kullanılmaz; doğrusu „If it rains, we will stay at home.“",
      },
      {
        kind: "truefalse",
        text: "„If I had a car, I would drive to work.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "İkinci tip doğru kurulmuş: geçmiş biçim + would.",
      },
    ],
  },
];
