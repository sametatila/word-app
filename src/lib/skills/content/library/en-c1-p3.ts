import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: köşe yazısı, panel ve gazete yorumu. Üçü de iddiayı kalibre
 * ederek konuşur; dil bilgisi hedging ve kiplik.
 */
export const enC1P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r3",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "In Defense of the Second Name",
    genre: "opinion",
    intro: "İnternette gerçek ad zorunluluğu tartışmasını ele alan bir köşe yazısı okuyacaksın: kanıt ne diyor, bedeli kim ödüyor.",
    gloss: [
      { de: "straightforward", tr: "açık" },
      { de: "remedy", tr: "çare" },
      { de: "crude", tr: "kaba" },
      { de: "sustained", tr: "sürekli" },
      { de: "mandatory", tr: "zorunlu" },
      { de: "absorb", tr: "üstlenmek" },
      { de: "accountability", tr: "hesap verebilirlik" },
      { de: "traceable", tr: "izlenebilir" },
    ],
    minutes: 10,
    text:
      "IN DEFENSE OF THE SECOND NAME\n\n" +
      "The argument against anonymity online is straightforward and, on its own terms, hard to answer: people " +
      "behave worse when they cannot be identified. The remedy appears to follow. If everyone posted under a " +
      "verified legal name, the argument goes, the worst behavior would largely disappear.\n\n" +
      "It is worth noticing how much of that claim is assumption. The evidence is mixed rather than absent. " +
      "Several studies of platforms that introduced real-name policies found a modest reduction in the crudest " +
      "abuse, together with little or no change in the more damaging kind: the sustained, targeted pressure " +
      "that tends to come from people who are perfectly willing to be named. One large analysis suggested that " +
      "a substantial share of aggressive comments were already posted under real names, which, if it holds, " +
      "would make the proposed remedy something close to a category error.\n\n" +
      "There is also a cost that tends to be discussed too late. A legal name is not a neutral piece of " +
      "information; it carries a country, often a gender, sometimes a religion and, for a significant minority, " +
      "a documented risk. The people who would be most affected by mandatory identification are unlikely to be " +
      "the people the policy is aimed at. They are more likely to be those with the least capacity to absorb " +
      "the consequences of being wrong about it.\n\n" +
      "None of this argues for a system without accountability. It may well be that the useful distinction is " +
      "not between named and anonymous but between traceable and untraceable. A platform that knows who you " +
      "are, and that will say so only under a defined legal process, offers most of what the real-name argument " +
      "actually wants and very little of what it costs.\n\n" +
      "What should probably be resisted is the framing itself. The question is not whether people should use " +
      "their names. It is who is expected to take the risk of being visible, and whether that expectation has " +
      "ever been examined by the people who do not have to take it.",
    questions: [
      {
        text: "What is the writer's position?",
        options: [
          "Traceability is a better goal than real names.",
          "Anonymity should be protected without exception.",
          "Real-name policies work well in practice.",
        ],
        answer: 0,
        explain: "„It may well be that the useful distinction is not between named and anonymous but between traceable and untraceable.“",
      },
      {
        text: "What did studies of real-name policies find?",
        options: [
          "a small drop in the crudest abuse",
          "a large drop in every kind of abuse",
          "no measurable change of any kind",
        ],
        answer: 0,
        explain: "„… found a modest reduction in the crudest abuse, together with little or no change in the more damaging kind.“",
      },
      {
        kind: "truefalse",
        text: "The writer says that the evidence is absent.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The evidence is mixed rather than absent.“",
      },
      {
        kind: "gapfill",
        text: "The useful distinction may be between traceable and ___.",
        options: [],
        answer: 0,
        accept: ["untraceable"],
        explain: "„… not between named and anonymous but between traceable and untraceable.“",
      },
      {
        kind: "short_answer",
        text: "What does the writer say should be resisted?",
        options: [],
        answer: 0,
        accept: ["the framing itself", "the framing", "the way it is framed"],
        explain: "„What should probably be resisted is the framing itself.“",
      },
      {
        text: "Why does the writer mention a category error?",
        options: [
          "The remedy may not address the real cause.",
          "The studies used the wrong definition of abuse.",
          "The platforms measured the wrong group of users.",
        ],
        answer: 0,
        explain: "Saldırgan yorumların önemli bir bölümü zaten gerçek adla yazılmışsa, gerçek ad zorunluluğu sorunu hedeflemiyor demektir.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l3",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Should Museums Be Free?",
    genre: "meeting",
    intro: "Üç konuşmacılı bir panel dinleyeceksin: ücretsiz giriş kimi getiriyor, kimi getirmiyor, para nereden çıkıyor.",
    gloss: [
      { de: "admission", tr: "giriş ücreti" },
      { de: "attendance", tr: "ziyaretçi sayısı" },
      { de: "endowment", tr: "vakıf fonu" },
      { de: "subsidize", tr: "sübvanse etmek" },
      { de: "threshold", tr: "eşik" },
      { de: "outreach", tr: "erişim çalışması" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Chair", text: "Free admission is one of those policies that everybody has an opinion about and almost nobody has read the figures on. Anneke, you run a city museum." },
      { speaker: "Anneke", text: "We went free eleven years ago. Attendance roughly doubled, which is the number everybody quotes. The number nobody quotes is that the social mix of our visitors barely moved." },
      { speaker: "Chair", text: "So it brought in more of the same people?" },
      { speaker: "Anneke", text: "More or less. It appears to have removed a threshold for people who were already close to coming, and it did very little for those who were not." },
      { speaker: "Anneke", text: "That is not an argument against it, but it is an argument against selling it as equality." },
      { speaker: "Chair", text: "Yusuf, you have looked at this across twelve countries." },
      { speaker: "Yusuf", text: "And the pattern seems consistent. Where free admission is combined with outreach work, the mix does change. Where it stands alone, it tends to subsidize existing visitors, many of whom would have paid." },
      { speaker: "Yusuf", text: "I would add one thing that is often missed. Free entry changes how people use a building. Visits get shorter and more frequent, which is arguably the point." },
      { speaker: "Chair", text: "Ruth, you were a director for two decades and you are against it." },
      { speaker: "Ruth", text: "I am against it as a national rule, which is not quite the same thing. A museum with an endowment can afford it." },
      { speaker: "Ruth", text: "A small museum without one gives up its only flexible income and becomes dependent on a grant that is decided every three years." },
      { speaker: "Ruth", text: "And when that grant is cut, the first thing to go is not the building. It is the education officer, who was the person actually changing the mix." },
      { speaker: "Chair", text: "So the disagreement is less about the price than about what is bought with the money." },
    ],
    questions: [
      {
        text: "What is Anneke's main point?",
        options: [
          "Attendance rose but the social mix hardly changed.",
          "Attendance and the social mix both changed a lot.",
          "Free entry made no difference to attendance.",
        ],
        answer: 0,
        explain: "„Attendance roughly doubled … the social mix of our visitors barely moved.“",
      },
      {
        text: "According to Yusuf, when does the mix change?",
        options: [
          "when free entry is combined with outreach",
          "when free entry stands on its own",
          "when the museum has an endowment",
        ],
        answer: 0,
        explain: "„Where free admission is combined with outreach work, the mix does change.“",
      },
      {
        kind: "truefalse",
        text: "Yusuf has looked at the question in more than ten countries.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Yusuf, you have looked at this across twelve countries.“",
      },
      {
        kind: "short_answer",
        text: "What does Ruth say goes first when a grant is cut?",
        options: [],
        answer: 0,
        accept: ["the education officer", "education staff", "the education post"],
        explain: "„It is the education officer, who was the person actually changing the mix.“",
      },
      {
        kind: "dictation",
        text: "Sunucunun ara sorusunu duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["So it brought in more of the same people?", "So it brought in more of the same people"],
        explain: "„So it brought in more of the same people?“ — düz cümle sırasıyla sorulmuş bir kontrol sorusu.",
      },
      {
        text: "How does the chair summarize the disagreement?",
        options: [
          "It is about what the money buys, not the price.",
          "It is about how many visitors each museum has.",
          "It is about who decides the national rules.",
        ],
        answer: 0,
        explain: "„So the disagreement is less about the price than about what is bought with the money.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w3",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Who Are Opening Hours For?",
    genre: "opinion",
    intro: "Kurumların çalışma saatleri üzerine bir köşe yazısı yazacaksın; önce iki cümle kur, sonra yazıyı yaz.",
    gloss: [
      { de: "opening hours", tr: "çalışma saatleri" },
      { de: "shift", tr: "vardiya" },
      { de: "appointment", tr: "randevu" },
      { de: "trade-off", tr: "ödünleşim" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Şimdiye kadarki rakamlar bunu düşündürüyor ama kanıtlamıyor.",
        answer: "So far the figures suggest this, but they do not prove it.",
        alternatives: ["The figures so far suggest this, but they do not prove it."],
        hint: "„suggest“ iddiayı yumuşatır, „prove“ kesinlik iddia eder; „so far“ iki konumda da durabilir.",
      },
      {
        kind: "build",
        tr: "Kısa vadede bu değişikliğin ölçülebilir bir etkisi olmamış olabilir.",
        answer: "In the short term the change may well have had no measurable effect.",
        alternatives: ["The change may well have had no measurable effect in the short term."],
        hint: "„may well“ olasılığı güçlendirir; tek başına „may“ daha zayıf bir iddia taşır.",
      },
      {
        kind: "free",
        prompt:
          "Kurumların çalışma saatleri üzerine köşe yazısı yaz: gözlemini somut anlat, kimin dışarıda kaldığını göster, karşı tarafın maliyet argümanını hakkıyla ver ve ölçülü bir öneriyle bitir. İddialarını abartma.",
        checklist: [
          "Somut bir sahneyle ve rakamla başla",
          "Kimin dışarıda kaldığını göster",
          "Maliyet argümanını hakkıyla anlat",
          "Ölçülü, uygulanabilir bir öneriyle bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "The figures suggest, though they do not prove, that …", tr: "Rakamlar … olduğunu düşündürüyor, kanıtlamasa da" },
          { de: "It may well be that …", tr: "Pekâlâ … olabilir" },
          { de: "The objection is a real one: …", tr: "İtiraz gerçek bir itiraz: …" },
          { de: "What tends to be missed is …", tr: "Genelde gözden kaçan şey …" },
          { de: "A modest proposal would be …", tr: "Ölçülü bir öneri … olurdu" },
        ],
        sample:
          "Our district office is open from nine to three on four days and from nine to twelve on the fifth. " +
          "Anybody who works a standard shift can therefore reach it only by taking time off, which is to say " +
          "that the people least able to lose an hour's pay are the people asked to lose it most often.\n\n" +
          "The figures suggest, though they do not prove, that this is not marginal. In the last published " +
          "report, thirty-one per cent of appointments were not kept, and the highest rate was for the earliest " +
          "slots. It may well be that some of those absences reflect forgetfulness rather than work; the report " +
          "does not distinguish the two, and it should.\n\n" +
          "The objection is a real one: staff are entitled to a normal working life, and a late evening for the " +
          "public is an evening taken from somebody else. What tends to be missed is that this is a trade-off " +
          "between two groups of workers, not between citizens and bureaucracy, and it is usually settled by " +
          "whichever group is in the room.\n\n" +
          "A modest proposal would be one late opening a month, announced a year ahead, and a published figure " +
          "for missed appointments by time of day. If the late slots are not used, the argument is over and I " +
          "will have been wrong in public, which is the least a column can offer.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s3",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "What Does a Study Actually Show?",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: iddiayı kalibre et, iki tuzağı adlandır ve bir okuma kuralı öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir araştırmanın sonucuna ne kadar güvenmeliyiz? İki yaygın okuma hatasını adlandır, ikisini de örnekle ve kendi okuma kuralını söyle.",
      bulletsTr: [
        "Kolay iki uçtan da uzak dur: körü körüne güven ve toptan reddediş",
        "Birinci tuzağı adlandır ve örnekle",
        "İkinci tuzağı adlandır ve örnekle",
        "Kendi okuma kuralınla bitir",
      ],
      targets: [
        { de: "The evidence appears to support …, but only for …", tr: "Kanıt … destekliyor görünüyor, ama yalnız … için" },
        { de: "What tends to be missed is …", tr: "Genelde gözden kaçan şey …" },
        { de: "It may well be that …", tr: "Pekâlâ … olabilir" },
        { de: "My own rule when reading is …", tr: "Okurken kendi kuralım …" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "There are two easy positions and both of them save you the work. The first is to treat a single study " +
        "as a fact; the second is to treat all studies as opinion because some of them are wrong. " +
        "I want to describe two traps between them. The first is the move from a narrow finding to a broad " +
        "claim. A study may well show that a policy reduced one measurable behavior in one city over eighteen " +
        "months; the headline will say that the policy works, and the two sentences are not the same sentence. " +
        "The second trap is the opposite and it is more respectable. Somebody notices a limitation, and the " +
        "limitation is used to dismiss the whole thing, as though a study that cannot answer everything answers " +
        "nothing. What tends to be missed there is the direction: a small sample makes an effect harder to " +
        "detect, so a result that survives one is usually stronger, not weaker. My own rule when reading is to " +
        "ask three things before I ask whether I agree. What exactly was measured, over what period, and " +
        "compared with what? If the report does not let me answer those, the problem is not that the finding is " +
        "uncertain. The problem is that I have not been told enough to be uncertain about anything in " +
        "particular.",
      rubricHint:
        "İki uç konum reddedilmeli, iki tuzak somut örneklerle anlatılmalı ve sonuç bir okuma kuralına bağlanmalı; hedging beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g3",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "it may well be that",
    genre: "grammar",
    intro: "C1'in ayırt edici işi iddiayı doğru dereceye ayarlamaktır: ne kadar eminsin ve bunu nasıl gösteriyorsun.",
    focus: "Hedging: kiplik, uzaklaştırma ve iddianın derecesi",
    gloss: [
      { de: "suggest", tr: "düşündürmek" },
      { de: "tend to", tr: "eğiliminde olmak" },
      { de: "substantial", tr: "hatırı sayılır" },
      { de: "attendance", tr: "ziyaretçi sayısı" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Dört ayar düğmesi",
        tr: "Türkçede „galiba“, „büyük ölçüde“, „gibi görünüyor“ ile yaptığın şeyi İngilizce dört yolla yapar: kipler (may, might, could, would), fiiller (suggest, indicate, appear, tend to), zarflar (arguably, apparently, largely, broadly) ve niceleyiciler (some, a substantial share).",
        examples: [
          { de: "The figures suggest that the effect is small.", tr: "Rakamlar etkinin küçük olduğunu düşündürüyor." },
          { de: "Costs tend to be underestimated in the first year.", tr: "Maliyetler ilk yıl hafife alınma eğilimindedir." },
          { de: "It may well be that the categories are the problem.", tr: "Sorun pekâlâ kategoriler olabilir." },
        ],
      },
      {
        heading: "Kendini iddiadan ayırmak",
        tr: "Bir görüşü aktarırken benimsemediğini göstermek için „It is often argued that“, „According to“, „on this account“ gibi kalıplar kullanılır. Bunlar iddiayı zayıflatmaz; yalnız kimin iddiası olduğunu gösterir.",
        examples: [
          { de: "It is often argued that the law is the main factor.", tr: "Asıl etkenin yasa olduğu sıkça öne sürülür." },
          { de: "According to the report, attendance doubled.", tr: "Rapora göre ziyaretçi sayısı iki katına çıktı." },
          { de: "On this account, the remedy misses the cause.", tr: "Bu anlatıya göre çare nedeni ıskalıyor." },
        ],
      },
      {
        heading: "Az mı, çok mu?",
        tr: "Üst üste yumuşatıcı yığmak iddiayı yok eder: „it might possibly perhaps be the case that“. Kural basittir: bir iddiaya bir yumuşatıcı. Ayrıca yumuşatma belirsizlikle karıştırılmamalı — kesinliği ayarlarsın, içeriği değil.",
        examples: [
          { de: "The change appears to have had little effect.", tr: "Değişikliğin etkisi az görünüyor.", note: "tek yumuşatıcı" },
          { de: "The evidence is mixed rather than absent.", tr: "Kanıt yok değil, karışık.", note: "içerik net" },
          { de: "The results appear to support this.", tr: "Sonuçlar bunu destekler görünüyor." },
        ],
      },
    ],
    questions: [
      {
        text: "The figures ___ that the effect is small.",
        options: ["suggest", "prove", "decide"],
        answer: 0,
        explain: "„suggest“ iddiayı destekler ama kesinlik iddia etmez.",
      },
      {
        text: "It ___ be that the categories are the problem.",
        options: ["may well", "will surely", "must certainly"],
        answer: 0,
        explain: "„may well“ güçlü bir olasılık bildirir ve akademik kayıtta yerleşiktir.",
      },
      {
        text: "Which sentence is hedged appropriately?",
        options: [
          "The change appears to have had little effect.",
          "The change might possibly perhaps have had little effect.",
          "The change definitely had no effect whatsoever.",
        ],
        answer: 0,
        explain: "Bir iddiaya bir yumuşatıcı yeter; üst üste yığmak da abartmak da iddiayı zedeler.",
      },
      {
        kind: "gapfill",
        text: "Costs ___ (tend) to be underestimated in the first year.",
        options: [],
        answer: 0,
        accept: ["tend"],
        explain: "„tend to“ bir eğilim bildirir ve tek tek durumlara söz vermez.",
      },
      {
        kind: "gapfill",
        text: "It is often ___ that the law is the main factor.",
        options: [],
        answer: 0,
        accept: ["argued", "said", "claimed"],
        explain: "Bu kalıp iddiayı aktarır ve yazarın onu benimsediğini söylemez.",
      },
      {
        kind: "gapfill",
        text: "The evidence is mixed ___ than absent.",
        options: [],
        answer: 0,
        accept: ["rather"],
        explain: "„rather than“ yanlış olan uç yorumu düzeltir ve içeriği netleştirir.",
      },
      {
        kind: "gapfill",
        text: "A ___ share of the comments were posted under real names.",
        options: [],
        answer: 0,
        accept: ["substantial", "significant", "large"],
        explain: "Kesin bir yüzde vermeden büyüklük bildiren niceleyici.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The", "results", "appear", "to", "support", "this"],
        explain: "„appear to“ iddiayı yumuşatır ve arkasından mastar gelir.",
      },
      {
        kind: "truefalse",
        text: "Üst üste yumuşatıcı kullanmak iddiayı güçlendirir.",
        options: ["True", "False"],
        answer: 1,
        explain: "Yığılmış yumuşatıcılar iddiayı okunamaz kılar; bir iddiaya bir yumuşatıcı yeterlidir.",
      },
      {
        kind: "truefalse",
        text: "“The results appear to support this.” — Bu ifade iddiayı ölçülü biçimde taşır.",
        options: ["True", "False"],
        answer: 0,
        explain: "Tek bir yumuşatıcıyla desteği bildirir ve kesinlik iddia etmez.",
      },
    ],
  },
];
