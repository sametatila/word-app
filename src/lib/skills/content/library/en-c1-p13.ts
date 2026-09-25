import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 13.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 13 saat değişikliği hattı: hangi saatin kalacağı üzerine bir deneme,
 * yerel radyoda iki dinleyicinin tartışması, saatlerin geri alındığı gece
 * için bir hastane servisinin gece ekibine e-posta. Dil bilgisi odak
 * zarfları — only, even, also, just: konumları neyi vurguladıklarını belirler.
 */
export const enC1P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r13",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Hour Nobody Can Agree On",
    genre: "essay",
    intro: "Bir deneme: herkes saatlerin ileri geri alınmasından bıkmış görünüyor; asıl anlaşmazlık hangi saatin kalacağında.",
    gloss: [
      { de: "summer time", tr: "yaz saati" },
      { de: "majority", tr: "çoğunluk" },
      { de: "time zone", tr: "saat dilimi" },
      { de: "to welcome", tr: "memnuniyetle karşılamak" },
      { de: "for weeks on end", tr: "haftalarca" },
      { de: "standard time", tr: "kış saati" },
      { de: "without exception", tr: "istisnasız" },
      { de: "body clock", tr: "biyolojik saat" },
      { de: "out of step", tr: "uyumsuz" },
      { de: "permanently", tr: "kalıcı olarak" },
      { de: "theoretical", tr: "kuramsal" },
      { de: "to survive", tr: "ayakta kalmak" },
      { de: "parliament", tr: "parlamento" },
      { de: "to strike", tr: "dikkatini çekmek" },
      { de: "rarely", tr: "nadiren" },
    ],
    minutes: 10,
    text:
      "The hour nobody can agree on\n\n" +
      "Twice a year, most of Europe moves its clocks, and twice a year the same complaint returns: why do we " +
      "still do this? Surveys suggest that a large majority would like the changes to stop. That sounds like " +
      "the easy part of the debate. It is in fact the only easy part.\n\n" +
      "The difficulty begins with the next question, which is not whether to stop but where. Keep summer time " +
      "all year, and winter evenings stay light until after five, which shops, sports clubs and anyone who " +
      "walks home from work tend to welcome. The cost appears in the morning. In the north and west of a wide " +
      "time zone, the sun would not rise until well after nine in December, and children would walk to school " +
      "in the dark for weeks on end.\n\n" +
      "Keep standard time instead, and the mornings return, but summer evenings lose an hour of light. Sleep " +
      "researchers, almost without exception, prefer this second option. Their argument is that morning light " +
      "sets the body clock, and a society that takes it away all winter is asking people to live slightly out " +
      "of step with themselves, not just for a week but permanently.\n\n" +
      "This is not a theoretical dispute. When one country kept summer time all year in the late 1960s, the " +
      "experiment survived only three winters before complaints about dark mornings ended it. More recently, " +
      "a vote in the European Parliament to end the changes was followed by years of silence, because " +
      "national governments could not agree which hour to keep.\n\n" +
      "What strikes me is how the question is usually put. People are asked if they are tired of changing the " +
      "clocks, and of course they are. They are rarely asked which winter they would rather have: the dark " +
      "evening or the dark morning. Until they are, even a clear majority tells us very little.",
    questions: [
      {
        text: "What does the writer call the only easy part of the debate?",
        options: [
          "agreeing which hour to keep",
          "agreeing that the changes should stop",
          "measuring the effect on sleep",
        ],
        answer: 1,
        explain: "Büyük çoğunluk değişikliğin bitmesini istiyor; yazar bunun „the only easy part“ olduğunu söylüyor.",
      },
      {
        text: "What is the cost of keeping summer time all year?",
        options: [
          "dark winter mornings in the north and west",
          "earlier closing for shops and sports clubs",
          "darker evenings in the middle of summer",
        ],
        answer: 0,
        explain: "Aralıkta güneş dokuzdan epey sonra doğar ve çocuklar haftalarca karanlıkta okula yürür.",
      },
      {
        kind: "truefalse",
        text: "Sleep researchers are divided on which option is better.",
        options: ["True", "False"],
        answer: 1,
        explain: "„almost without exception“ ikinci seçeneği, yani kış saatini tercih ediyorlar.",
      },
      {
        kind: "gapfill",
        text: "According to sleep researchers, morning light sets the body ___.",
        options: [],
        answer: 0,
        accept: ["clock"],
        explain: "„morning light sets the body clock“ — sabah ışığı biyolojik saati ayarlıyor.",
      },
      {
        kind: "short_answer",
        text: "How many winters did the experiment in the late 1960s last?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three winters", "only three"],
        explain: "„the experiment survived only three winters“ — karanlık sabah şikâyetleri onu bitirdi.",
      },
      {
        text: "What does the writer criticise at the end?",
        options: [
          "researchers who oppose summer time",
          "governments that ignore the surveys",
          "the way the question is usually put",
        ],
        answer: 2,
        explain: "İnsanlara bıkıp bıkmadıkları soruluyor, hangi karanlığı seçecekleri nadiren soruluyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l13",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Two Callers, One Hour",
    genre: "dialogue",
    intro: "Bir radyo programına iki dinleyici bağlanıyor: saatler artık değişmeyecekse hangi saat kalmalı, sabahlar mı akşamlar mı?",
    gloss: [
      { de: "caller", tr: "arayan dinleyici" },
      { de: "pavement", tr: "kaldırım" },
      { de: "darkness", tr: "karanlık" },
      { de: "to coach", tr: "çalıştırmak" },
      { de: "weekday", tr: "hafta içi" },
      { de: "permanent", tr: "kalıcı" },
      { de: "shift", tr: "vardiya" },
      { de: "region", tr: "bölge" },
      { de: "to rearrange", tr: "yeniden düzenlemek" },
      { de: "to adjust", tr: "uyum sağlamak" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Host", text: "This morning's question is simple: if the clocks stopped changing, which hour would you keep? Our first caller is Sarah, who lives right at the northern end of the country." },
      { speaker: "Sarah", text: "Morning. I'd keep winter time, and I'm not sure people further south understand why. In December our sun already comes up at nearly nine. Move the clocks forward for good and it's after ten." },
      { speaker: "Host", text: "So what would that mean in practice?" },
      { speaker: "Sarah", text: "My two walk to school along a road with no pavement for the last mile. Even now they wear lights on their bags. With another hour of darkness, I simply wouldn't let them walk." },
      { speaker: "Host", text: "Thank you, Sarah. Tom is on the line now. Tom, I gather you'd choose the other way." },
      { speaker: "Tom", text: "I would. I coach a youth football club, and from November we lose every weekday session because it's dark by half past four. Permanent summer time gives us that hour back." },
      { speaker: "Host", text: "What would you say to Sarah?" },
      { speaker: "Tom", text: "That she's right about her road, and I won't pretend otherwise. But she's describing a few weeks in the far north, and I'm describing four months across most of the country." },
      { speaker: "Sarah", text: "It's not a few weeks here. It's closer to three months. And it isn't only children; it's anyone who starts work before the light comes." },
      { speaker: "Tom", text: "Fair enough, I accept the three months. Couldn't schools just start later in winter, though? That would solve your problem without taking our evenings." },
      { speaker: "Sarah", text: "Schools could, but buses, shifts and parents' jobs don't move with them. You'd be asking a whole region to rearrange its day so that the rest can play football." },
      { speaker: "Host", text: "Which may be the real difficulty: whichever hour we keep, somebody is asked to adjust. Thank you both." },
    ],
    questions: [
      {
        text: "Which hour would Sarah keep?",
        options: [
          "summer time all year",
          "winter time all year",
          "the current system of changes",
        ],
        answer: 1,
        explain: "„I'd keep winter time“ — kalıcı yaz saatinde güneş onda doğardı.",
      },
      {
        text: "Why does Tom prefer summer time?",
        options: [
          "His club loses weekday sessions to darkness.",
          "His own children prefer light evenings.",
          "His café closes too early in the winter.",
        ],
        answer: 0,
        explain: "Kasımdan itibaren saat dört buçukta hava karardığı için hafta içi antrenmanlar yapılamıyor.",
      },
      {
        kind: "truefalse",
        text: "In the end, Tom accepts Sarah's figure of three months.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Fair enough, I accept the three months.“ — ilk başta „a few weeks“ demişti.",
      },
      {
        kind: "gapfill",
        text: "In December, Sarah's sun already comes up at nearly ___.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„In December our sun already comes up at nearly nine.“",
      },
      {
        kind: "short_answer",
        text: "What does Tom suggest schools could do in winter?",
        options: [],
        answer: 0,
        accept: ["start later", "start later in winter", "begin later"],
        explain: "„Couldn't schools just start later in winter, though?“",
      },
      {
        text: "What is Sarah's objection to Tom's suggestion?",
        options: [
          "Children would sleep even less then.",
          "Teachers would never agree to it.",
          "Buses, shifts and jobs would not move too.",
        ],
        answer: 2,
        explain: "Okullar değişebilir ama otobüsler, vardiyalar ve anne babaların işleri onlarla birlikte kaymıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w13",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "The Night the Clocks Go Back",
    genre: "email",
    intro: "Bir hastane servisinin sorumlususun; saatlerin geri alındığı gece, gece ekibi bir saat fazla çalışacak. Önce iki cümle kur, sonra ekibe açık ve adil bir e-posta yaz.",
    gloss: [
      { de: "night rate", tr: "gece ücreti" },
      { de: "rota", tr: "nöbet çizelgesi" },
      { de: "dose", tr: "doz" },
      { de: "chart", tr: "hasta çizelgesi" },
      { de: "shift lead", tr: "vardiya sorumlusu" },
      { de: "affected", tr: "etkilenen" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Bu yıl değişiklik yalnızca cumartesi gece vardiyasını etkiliyor.",
        answer: "This year the change affects only the Saturday night shift.",
        alternatives: ["The change affects only the Saturday night shift this year."],
        hint: "Yazıda „only“ sınırladığı öğenin hemen önüne gelir.",
      },
      {
        kind: "build",
        tr: "Geceleri deneyimli hemşireler bile fazladan saati uzun buluyor.",
        answer: "At night even experienced nurses find the extra hour long.",
        alternatives: ["Even experienced nurses find the extra hour long at night."],
        hint: "„even“ beklenmeyen özneyi işaretler ve onun önüne gelir.",
      },
      {
        kind: "free",
        prompt:
          "Servisteki gece ekibine bir e-posta yaz: saatlerin geri alındığı gece ne olacağını açıkla, kimin etkilendiğini ve fazladan saatin nasıl ödeneceğini ya da telafi edileceğini söyle, ilaç saatleri gibi bir güvenlik noktasına dikkat çek ve soruların nereye yöneltileceğini belirt.",
        checklist: [
          "O gece ne olacağını açıkça anlat",
          "Kimin etkilendiğini ve nasıl telafi edileceğini söyle",
          "Bir güvenlik noktasına dikkat çek",
          "Sorular için bir yol göster",
        ],
        minWords: 160,
        phrases: [
          { de: "A quick reminder about …", tr: "… hakkında kısa bir hatırlatma", en: "" },
          { de: "This only affects …", tr: "Bu yalnızca …'i etkiliyor", en: "" },
          { de: "Even if …, please …", tr: "… olsa bile lütfen …", en: "" },
          { de: "You will be paid for …", tr: "… için ödeme alacaksınız", en: "" },
          { de: "If anything is unclear, …", tr: "Belirsiz bir şey olursa …", en: "" },
        ],
        sample:
          "Subject: The night the clocks go back\n\n" +
          "Dear all,\n\n" +
          "A quick reminder about Saturday night, when the clocks go back at three in the morning. The change " +
          "affects only the Saturday night shift, but for those of you on it, the night will be nine hours long " +
          "instead of eight: at three o'clock the time becomes two again, and you will work that hour twice.\n\n" +
          "You will be paid for the full nine hours at the night rate. If you would rather take the hour as time " +
          "off, tell me by Thursday and I will add it to the November rota. Nobody has to decide on the night " +
          "itself.\n\n" +
          "Please take particular care with medication. Any dose due between two and three will come round twice " +
          "on the clock, and it must only be given once. Even if you have worked this change before, check the " +
          "chart against the real time since the last dose, not the time on the wall. The pharmacy has marked " +
          "the affected charts in yellow.\n\n" +
          "Even experienced nurses find the extra hour long, so the break rota includes a second break at about " +
          "four. Please take it.\n\n" +
          "If anything is unclear, ask me or the shift lead before Saturday rather than during it.\n\n" +
          "Thanks,\nRuth",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s13",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should We Stop Changing the Clocks?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: saat değişikliği bitmeli mi, bitecekse hangi saat kalmalı?",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Saatlerin yılda iki kez ileri geri alınması sona ermeli mi? Konumunu söyle, hangi saatin kalması gerektiğini seç, seçiminin kime bedel ödettiğini kabul et ve kararın nasıl verilmesi gerektiğini öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Hangi saatin kalacağını seç ve gerekçelendir",
        "Seçiminin kime bedel ödettiğini kabul et",
        "Kararın nasıl verilmesi gerektiğini öner",
      ],
      targets: [
        { de: "I would stop the changes, but only if we are honest about the cost.", tr: "Değişikliği durdururdum ama yalnızca bedeli konusunda dürüst olursak." },
        { de: "Of the two options, I would keep …, because …", tr: "İki seçenekten …'i tutardım, çünkü …" },
        { de: "Even so, the people who pay for it are …", tr: "Yine de bedelini ödeyenler …" },
        { de: "What I would ask for is …", tr: "İstediğim şey …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "I would stop the changes, but only if we are honest about the cost, because stopping is not one " +
        "decision but two. " +
        "The first, whether to stop, is easy: the week after each change is miserable for almost everyone, and " +
        "I have never heard a convincing reason for keeping it. " +
        "The second is harder. Of the two options, I would keep standard time, because the argument from " +
        "morning light seems to me the stronger one. Light evenings are pleasant, but light mornings are what " +
        "keep us in step, and the cost of losing them falls on sleep, which people notice least and suffer " +
        "from most. " +
        "Even so, the people who pay for my choice are real: anyone who trains, plays or just walks outside " +
        "after work in winter, and businesses that depend on long summer evenings. They would lose an hour of " +
        "light for half the year, and I don't think that should be dismissed as a matter of taste. " +
        "What I would ask for is a better question in the surveys. Instead of asking whether people are fed " +
        "up with the changes, ask them which darkness they would choose to live with. Only then would the " +
        "answer mean something.",
      rubricHint:
        "Durdurma kararı ile hangi saatin kalacağı sorusunun ayrılması, gerekçeli bir seçim, bedelin kabulü ve somut bir karar yöntemi beklenir; „only“, „even so“, „just“ gibi odak zarflarının yeri dikkatle seçilmeli.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g13",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "only, even, just — and where they go",
    genre: "grammar",
    intro: "Aynı „only“ cümlenin üç ayrı yerinde üç ayrı şey söyler; odak zarfının konumu vurgunun adresidir.",
    focus: "Odak zarfları: only, even, also, just — konumları neyi vurguladıklarını belirler",
    gloss: [
      { de: "to complain", tr: "şikâyet etmek" },
      { de: "baker", tr: "fırıncı" },
      { de: "ferry", tr: "feribot" },
      { de: "resident", tr: "sakin" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "only: konum anlamı değiştirir",
        tr: "„only“ hemen ardından gelen öğeyi sınırlar. „Only residents can park here“ başkası park edemez demektir; „Residents can only park here“ sakinler başka yere park edemez demektir. Konuşmada „only“ çoğu zaman fiilin önüne konur ve anlam vurguyla belli olur; yazıda vurgu duyulmadığı için „only“ sınırladığı öğenin yanına taşınmalıdır.",
        examples: [
          { de: "Only residents can park here.", tr: "Buraya yalnızca sakinler park edebilir.", note: "başkası edemez" },
          { de: "Residents can park only here.", tr: "Sakinler yalnızca buraya park edebilir.", note: "başka yere edemez" },
          { de: "It limits only the peak.", tr: "Yalnızca zirveyi sınırlıyor.", note: "yazıda açık konum" },
        ],
      },
      {
        heading: "even: beklenmeyeni işaretler",
        tr: "„even“ vurguladığı öğenin önüne gelir ve o öğenin beklenmedik olduğunu söyler. „Even the baker complained“ fırıncıdan bile şikâyet beklenmezdi demektir; „The baker even complained“ fırıncının yaptıkları arasında şikâyetin en beklenmedik olduğunu söyler. „even“ yardımcı fiilden sonra, ana fiilden önce durabilir: „They didn't even ask.“",
        examples: [
          { de: "Even the baker complained.", tr: "Fırıncı bile şikâyet etti.", note: "özne vurgulu" },
          { de: "They didn't even ask us.", tr: "Bize sormadılar bile.", note: "yardımcı fiilden sonra" },
          { de: "It is quiet even in August.", tr: "Ağustosta bile sakin.", note: "zaman öbeği vurgulu" },
        ],
      },
      {
        heading: "also, too, just",
        tr: "„also“ genelde fiilden önce, „to be“ ve yardımcı fiilden sonra gelir; „too“ ve „as well“ cümle sonuna gider. „just“ üç ayrı iş görür: „yalnızca“ („It just moves the crowd“), „tam da“ („just what we needed“) ve „az önce“ („The ferry has just left“). Hangisi olduğunu bağlam ve konum söyler.",
        examples: [
          { de: "The ferry also stops at the island.", tr: "Feribot adada da durur.", note: "also: fiilden önce" },
          { de: "A limit that just moves the crowd solves nothing.", tr: "Kalabalığı yalnızca taşıyan bir sınır hiçbir şey çözmez.", note: "just = yalnızca" },
          { de: "The ferry has just left.", tr: "Feribot az önce kalktı.", note: "just = az önce" },
        ],
      },
    ],
    questions: [
      {
        text: "Which sentence means that nobody else can park here?",
        options: [
          "Residents can park only here.",
          "Residents can only park here on Sundays.",
          "Only residents can park here.",
        ],
        answer: 2,
        explain: "„Only“ özneyi sınırlıyor: sakinler dışında kimse.",
      },
      {
        text: "“The ferry has just left.” — What does “just” mean here?",
        options: ["only", "a moment ago", "exactly"],
        answer: 1,
        explain: "Present perfect ile „just“ az önce olmuş bir şeyi bildirir.",
      },
      {
        text: "They didn't ___ ask us.",
        options: ["even", "also", "only"],
        answer: 0,
        explain: "Beklenmedik bir eksiklik: „didn't even“.",
      },
      {
        kind: "gapfill",
        text: "___ the baker complained — and he never complains. (surprising addition)",
        options: [],
        answer: 0,
        accept: ["Even", "even"],
        explain: "„even“ vurguladığı öğenin, burada öznenin, önüne gelir.",
      },
      {
        kind: "gapfill",
        text: "The ferry ___ stops at the island. (in addition to other places)",
        options: [],
        answer: 0,
        accept: ["also"],
        explain: "„also“ ana fiilden önce gelir.",
      },
      {
        kind: "gapfill",
        text: "It limits ___ the peak, not the whole year. (yalnızca)",
        options: [],
        answer: 0,
        accept: ["only"],
        explain: "Yazıda „only“ sınırladığı öğenin hemen önüne konur.",
      },
      {
        kind: "gapfill",
        text: "The residents came to the meeting, and the ferry company came as ___.",
        options: [],
        answer: 0,
        accept: ["well"],
        explain: "„as well“ „too“ gibi cümle sonunda durur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It is", "quiet", "even", "in August"],
        explain: "„even“ vurguladığı zaman öbeğinin önünde.",
      },
      {
        kind: "truefalse",
        text: "“Only residents can park here” ile “Residents can park only here” aynı anlamdadır.",
        options: ["True", "False"],
        answer: 1,
        explain: "Biri başkalarını, öteki başka yerleri dışarıda bırakır.",
      },
      {
        kind: "truefalse",
        text: "“A limit that just moves the crowd solves nothing.” — Burada “just” “yalnızca” anlamındadır.",
        options: ["True", "False"],
        answer: 0,
        explain: "Sınır kalabalığı azaltmıyor, yalnızca taşıyor.",
      },
    ],
  },
];
