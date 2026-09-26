import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 17.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 17 çalışma süresi hattı: dört günlük haftaya geçen bir stüdyonun
 * blog yazısı, bu denemelerin neyi ölçtüğü üzerine bir araştırma haberi,
 * ekibe deneme öneren bir e-posta. Dil bilgisi ileri karşılaştırma —
 * the more … the more, far/slightly + karşılaştırma, not nearly as … as
 * (A2'deki -er/-est'in ötesi).
 */
export const enB2P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r17",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Six Months of Four Days",
    genre: "blog",
    intro: "Bir yöneticinin blog yazısı: tasarım stüdyosu dört günlük haftaya geçti; altı ay sonra ne iyi, ne kötü gitti?",
    gloss: [
      { de: "output", tr: "üretim" },
      { de: "casualty", tr: "kurban" },
      { de: "sick day", tr: "hastalık izni" },
      { de: "noticeably", tr: "belirgin biçimde" },
      { de: "intense", tr: "yoğun" },
      { de: "pace", tr: "tempo" },
      { de: "repeatedly", tr: "defalarca" },
      { de: "patient", tr: "sabırlı" },
      { de: "to reveal", tr: "ortaya çıkarmak" },
      { de: "overloaded", tr: "aşırı yüklü" },
      { de: "poor planning", tr: "kötü planlama" },
      { de: "anyway", tr: "nasılsa" },
      { de: "hoped", tr: "umut etmek" },
      { de: "slightly", tr: "biraz" },
    ],
    minutes: 8,
    text:
      "Six months of four days: what we learned\n\n" +
      "When our design studio moved to a four-day week in January, I promised the team I would " +
      "write up the results honestly, whatever they turned out to be. Here they are.\n\n" +
      "Output held up far better than I expected. We finished roughly the same number of " +
      "projects as in the same period last year, and client complaints were slightly lower. " +
      "The less time we had, the more carefully we chose what to spend it on. Meetings were the " +
      "first casualty: we now hold about half as many as we used to, and nobody has asked for " +
      "them back.\n\n" +
      "Sick days fell sharply, by around forty percent, although six months is not nearly long " +
      "enough to be sure that will last. People also seemed noticeably less tired on Monday " +
      "mornings, which is harder to measure but easy to see.\n\n" +
      "Not everything improved. Thursdays became much more intense than any day used to be, and " +
      "two colleagues told me they found the pace harder, not easier. Clients who expected an " +
      "answer on Friday had to be told, repeatedly, that they would get one on Monday. A few of " +
      "them were a lot less patient about it than we had hoped.\n\n" +
      "The biggest lesson was about what the missing day revealed. The weeks that went well were " +
      "the ones where the work had been planned properly. The weeks that went badly were not " +
      "caused by the four-day week at all; they would have gone badly anyway, just a little more " +
      "slowly.\n\n" +
      "We are keeping it for now. I would not recommend it to a team that is already overloaded.",
    questions: [
      {
        text: "How did output change after the switch?",
        options: [
          "It fell by about half.",
          "It stayed roughly the same.",
          "It rose very sharply.",
        ],
        answer: 1,
        explain: "Geçen yılın aynı dönemiyle kabaca aynı sayıda proje bitirilmiş.",
      },
      {
        text: "What happened to meetings?",
        options: [
          "They became much longer.",
          "They all moved to Fridays.",
          "There are about half as many.",
        ],
        answer: 2,
        explain: "„we now hold about half as many as we used to“.",
      },
      {
        kind: "truefalse",
        text: "The writer is sure that the fall in sick days will last.",
        options: ["True", "False"],
        answer: 1,
        explain: "„six months is not nearly long enough to be sure that will last“.",
      },
      {
        kind: "gapfill",
        text: "Sick days fell by around ___ percent.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„Sick days fell sharply, by around forty percent“.",
      },
      {
        kind: "short_answer",
        text: "Which day of the week became more intense?",
        options: [],
        answer: 0,
        accept: ["Thursday", "Thursdays"],
        explain: "„Thursdays became much more intense than any day used to be“.",
      },
      {
        text: "What was the biggest lesson?",
        options: [
          "Bad weeks came from poor planning.",
          "Clients prefer a five-day week.",
          "Designers work better alone.",
        ],
        answer: 0,
        explain: "Kötü giden haftaları dört günlük düzen değil, kötü planlama yaratmış.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l17",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "What the Four-Day Trials Measure",
    genre: "report",
    intro: "Bir araştırma haberi: dört günlük hafta denemeleri kimlerle yapılıyor, neyi ölçüyor, neyi ölçemiyor?",
    gloss: [
      { de: "enthusiastic", tr: "coşkulu" },
      { de: "to volunteer", tr: "gönüllü olmak" },
      { de: "worthless", tr: "değersiz" },
      { de: "wellbeing", tr: "iyi oluş" },
      { de: "productivity", tr: "verimlilik" },
      { de: "judgment", tr: "yargı" },
      { de: "turnover", tr: "personel devri" },
      { de: "absence", tr: "devamsızlık" },
      { de: "dramatic", tr: "çarpıcı" },
      { de: "generally", tr: "genel olarak" },
      { de: "positive", tr: "olumlu" },
      { de: "vary", tr: "farklılık göstermek" },
      { de: "caution", tr: "temkin" },
    ],
    minutes: 8,
    segments: [
      { text: "Four-day week trials have produced some of the most enthusiastic headlines in workplace research. A closer look at how they are run suggests some caution." },
      { speaker: "Ms Petrova", text: "The first thing to know is who takes part. Companies volunteer, and the ones that volunteer tend to be smaller, more flexible and far more confident than average." },
      { text: "In most published trials, around nine in ten firms chose to continue afterwards. Critics point out that firms expecting to fail would rarely have signed up in the first place." },
      { speaker: "Ms Petrova", text: "That doesn't make the results worthless. It means they tell you what happens in the best conditions, which is not nearly as useful as knowing what happens in ordinary ones." },
      { text: "The measures also vary. Wellbeing is usually recorded through surveys, while productivity is often reported by the managers who chose to run the trial." },
      { speaker: "Ms Petrova", text: "The more a result depends on a manager's own judgment, the more carefully I'd read it. Sick days and staff turnover are much harder to argue with." },
      { text: "Those harder figures are generally positive too, if a little less dramatic: fewer people leave, and absence falls, at least during the first year." },
      { speaker: "Ms Petrova", text: "What we still don't have is a large trial in hospitals, schools or factories, where the work can't simply be done faster. That's where the real test is." },
    ],
    questions: [
      {
        text: "What kind of companies usually take part in the trials?",
        options: [
          "large, traditional ones",
          "public sector bodies",
          "small, confident ones",
        ],
        answer: 2,
        explain: "Gönüllü olanlar ortalamadan daha küçük, esnek ve kendine güvenen şirketler.",
      },
      {
        text: "According to Ms Petrova, what do the results show?",
        options: [
          "what happens in the best conditions",
          "what happens in ordinary firms",
          "what happens in large hospitals",
        ],
        answer: 0,
        explain: "Sonuçlar en iyi koşullarda ne olduğunu söylüyor; sıradan koşulları değil.",
      },
      {
        kind: "truefalse",
        text: "Productivity in the trials is often reported by the managers who ran them.",
        options: ["True", "False"],
        answer: 0,
        explain: "„productivity is often reported by the managers who chose to run the trial“.",
      },
      {
        kind: "gapfill",
        text: "Around nine in ___ firms chose to continue afterwards.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„around nine in ten firms chose to continue afterwards“.",
      },
      {
        kind: "short_answer",
        text: "Which figures does Ms Petrova find harder to argue with?",
        options: [],
        answer: 0,
        accept: ["sick days and turnover", "sick days and staff turnover", "staff turnover and sick days", "turnover and sick days", "sick days", "staff turnover", "turnover"],
        explain: "Yöneticinin yargısına dayanmayan hastalık izni ve personel devri rakamları.",
      },
      {
        text: "Where is the real test, according to Ms Petrova?",
        options: [
          "in small design studios",
          "in jobs that cannot go faster",
          "in firms that volunteer",
        ],
        answer: 1,
        explain: "Hastane, okul ve fabrika gibi işin hızlandırılamadığı yerlerde.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w17",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Proposal: A Twelve-Week Trial",
    genre: "email",
    intro: "Ekibine bir e-posta yazıyorsun: önce iki cümle kur, sonra dört günlük hafta denemesini ölçütleri ve riskleriyle öner.",
    gloss: [
      { de: "rotation", tr: "nöbet çizelgesi" },
      { de: "target", tr: "hedef" },
      { de: "urgent", tr: "acil" },
      { de: "to deliver", tr: "teslim etmek" },
      { de: "satisfaction", tr: "memnuniyet" },
      { de: "in advance", tr: "önceden" },
      { de: "account", tr: "müşteri hesabı" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Ekibimizde ne kadar az toplantı yaparsak o kadar çok iş bitiriyoruz.",
        answer: "In our team, the fewer meetings we have, the more work we finish.",
        alternatives: ["The fewer meetings we have in our team, the more work we finish."],
        hint: "the + karşılaştırma …, the + karşılaştırma …: iki değişim birlikte yürür.",
      },
      {
        kind: "build",
        tr: "Uygulamada yeni düzen eskisi kadar pahalı değil, yakınından bile geçmiyor.",
        answer: "In practice the new schedule is not nearly as expensive as the old one.",
        alternatives: ["The new schedule is not nearly as expensive as the old one in practice."],
        hint: "„not nearly as … as“ farkın büyük olduğunu vurgular.",
      },
      {
        kind: "free",
        prompt:
          "Ekibine bir e-posta yaz: on iki haftalık dört günlük çalışma denemesi öner; pratikte neyin değişeceğini, başarıyı neyle ölçeceğinizi, müşterilerin nasıl etkileneceğini ve deneme tutmazsa ne olacağını açıkça söyle.",
        checklist: [
          "Denemeyi ve süresini öner",
          "Pratikte neyin değişeceğini anlat",
          "Başarı ölçütlerini say",
          "Müşterilere etkisini ve tutmazsa ne olacağını söyle",
        ],
        minWords: 130,
        phrases: [
          { de: "I'd like to propose a …-week trial of …", tr: "… haftalık bir … denemesi önermek istiyorum", en: "" },
          { de: "In practical terms, this would mean …", tr: "Pratikte bu … anlamına gelir", en: "" },
          { de: "We would measure success by …", tr: "Başarıyı … ile ölçeriz", en: "" },
          { de: "For clients, the main difference would be …", tr: "Müşteriler için asıl fark … olur", en: "" },
          { de: "If it doesn't work, …", tr: "İşe yaramazsa …", en: "" },
        ],
        sample:
          "Hi all, I'd like to propose a twelve-week trial of a four-day week for our team, " +
          "starting in March, and I'd like your views before I take it to the directors. " +
          "In practical terms, this would mean working Monday to Thursday, with the same pay and " +
          "the same targets. Fridays would be covered by a rotation, so that one person is always " +
          "available for urgent requests. " +
          "We would measure success by three things: projects delivered on time, client " +
          "satisfaction scores and sick days. I'd also like everyone to fill in a short survey at " +
          "the start and the end, because the numbers alone won't tell us whether people are more " +
          "tired or less. " +
          "For clients, the main difference would be slower replies on Fridays. I suspect most of " +
          "them will barely notice, but our bigger accounts will be told in advance. " +
          "If it doesn't work, we go back to five days with no hard feelings and a much clearer " +
          "idea of where our time actually goes. The more honest we are about the results, the " +
          "more useful the trial will be. " +
          "Let me know what you think by Friday. Priya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s17",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Would a Four-Day Week Work Everywhere?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: kanıtın gücünü doğru tart ve bir sınır çiz.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Dört günlük çalışma haftası her iş için uygun mu? Konumunu söyle, kanıtın nereden geldiğini doğru tart, hangi işlerde çok daha zorlaşacağını örnekle ve bir sınır çiz.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Kanıtın nereden geldiğini tart",
        "Zorlaştığı işleri örnekle",
        "Bir sınır çiz",
      ],
      targets: [
        { de: "It works far better in some jobs than in others.", tr: "Bazı işlerde ötekilerden çok daha iyi işliyor." },
        { de: "The evidence is encouraging, but it comes mostly from …", tr: "Kanıt umut verici ama çoğunlukla … geliyor" },
        { de: "Where it gets much harder is …", tr: "Çok daha zorlaştığı yer …" },
        { de: "I'd draw the line at …", tr: "Sınırı … noktasında çizerdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "It works far better in some jobs than in others, and I think the argument goes wrong " +
        "when people talk about it as if it were one policy for everyone. " +
        "The evidence is encouraging, but it comes mostly from offices that chose to take part, " +
        "which tend to be small, flexible and already well run. In those places, fewer days seem " +
        "to force better planning: the less time there is, the more carefully it gets used, and " +
        "meetings are the first thing to go. " +
        "Where it gets much harder is in work that moves at the speed of the people you serve. " +
        "A nurse can't look after a patient faster because the week is shorter, and a bus can't " +
        "cover its route in four-fifths of the time. There, a four-day week simply means hiring " +
        "more staff, which is a perfectly reasonable choice, but a far more expensive one. " +
        "I'd draw the line at pretending it costs nothing everywhere. In some jobs it's a way of " +
        "working smarter; in others it's a pay rise in the form of time, and we should be honest " +
        "about which one we're talking about.",
      rubricHint:
        "Kanıtın kaynağını tartma, somut karşı örnekler ve net bir sınır beklenir; „far better … than“, „the less …, the more …“ ve „I'd draw the line at“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g17",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "the more, the better; far cheaper",
    genre: "grammar",
    intro: "Karşılaştırma yalnız „-er“ ve „more“ değildir; farkın büyüklüğünü ve iki değişimin birlikte yürüdüğünü söyleyen kalıplar B2'nin işidir.",
    focus: "İleri karşılaştırma: far/slightly + karşılaştırma, the more … the more, not nearly as … as, twice as … as",
    gloss: [
      { de: "meeting", tr: "toplantı" },
      { de: "cheap", tr: "ucuz" },
      { de: "tired", tr: "yorgun" },
      { de: "productive", tr: "verimli" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Farkın büyüklüğü",
        tr: "Karşılaştırmanın önündeki zarf farkın ne kadar olduğunu söyler: büyük fark için „far“, „much“, „a lot“; küçük fark için „slightly“, „a bit“, „a little“. „very“ karşılaştırmayla KULLANILMAZ: „very cheaper“ yanlıştır.",
        examples: [
          { de: "The new office is far cheaper than the old one.", tr: "Yeni ofis eskisinden çok daha ucuz.", note: "büyük fark" },
          { de: "Thursdays are slightly busier now.", tr: "Perşembeler artık biraz daha yoğun.", note: "küçük fark" },
          { de: "We're a lot less tired on Mondays.", tr: "Pazartesileri çok daha az yorgunuz.", note: "less ile" },
        ],
      },
      {
        heading: "the more …, the more …",
        tr: "İki şeyin birlikte değiştiğini söylemek için iki yarımın ikisi de „the + karşılaştırma“ ile başlar. Kısa biçimi kalıplaşmıştır: „the sooner, the better“. Her yarımda özne ve fiil karşılaştırmadan SONRA gelir.",
        examples: [
          { de: "The fewer meetings we have, the more we finish.", tr: "Ne kadar az toplantı yaparsak o kadar çok iş bitiriyoruz.", note: "birlikte değişim" },
          { de: "The longer the trial runs, the more reliable the results are.", tr: "Deneme ne kadar uzun sürerse sonuçlar o kadar güvenilir olur.", note: "sıfatla" },
          { de: "The sooner, the better.", tr: "Ne kadar erken, o kadar iyi.", note: "kalıp" },
        ],
      },
      {
        heading: "as … as ile oran ve derece",
        tr: "„as + sıfat + as“ eşitliği söyler; önüne gelen sözcük oranı ya da dereceyi verir: „twice as long as“, „half as many as“, „not nearly as productive as“. „not nearly“ farkın büyük, „nearly“ ise küçük olduğunu anlatır.",
        examples: [
          { de: "We hold half as many meetings as before.", tr: "Eskisinin yarısı kadar toplantı yapıyoruz.", note: "oran" },
          { de: "The trial was twice as long as planned.", tr: "Deneme planlanandan iki kat uzun sürdü.", note: "iki kat" },
          { de: "Fridays are not nearly as productive as Mondays.", tr: "Cumalar pazartesiler kadar verimli olmaktan çok uzak.", note: "büyük fark" },
        ],
      },
    ],
    questions: [
      {
        text: "The new office is ___ cheaper than the old one.",
        options: ["far", "very", "more"],
        answer: 0,
        explain: "Karşılaştırmayı „far“ güçlendirir; „very“ karşılaştırmayla kullanılmaz.",
      },
      {
        text: "The fewer meetings we have, ___ we finish.",
        options: ["more", "the more", "the most"],
        answer: 1,
        explain: "İki yarım da „the + karşılaştırma“ ile başlar.",
      },
      {
        text: "Which is correct?",
        options: [
          "We hold half many meetings as before.",
          "We hold half as much meetings as before.",
          "We hold half as many meetings as before.",
        ],
        answer: 2,
        explain: "Oran „half as many … as“ ile verilir; sayılabilen isimde „many“ gerekir.",
      },
      {
        kind: "gapfill",
        text: "The ___ the trial runs, the more reliable the results are. (long)",
        options: [],
        answer: 0,
        accept: ["longer"],
        explain: "İlk yarım da „the + karşılaştırma“ ile kurulur: the longer.",
      },
      {
        kind: "gapfill",
        text: "Fridays are not ___ as productive as Mondays. (a big difference)",
        options: [],
        answer: 0,
        accept: ["nearly"],
        explain: "„not nearly as … as“ farkın büyük olduğunu söyler.",
      },
      {
        kind: "gapfill",
        text: "The trial was ___ as long as planned. (2×)",
        options: [],
        answer: 0,
        accept: ["twice"],
        explain: "Oran „twice as … as“ ile verilir.",
      },
      {
        kind: "gapfill",
        text: "Thursdays are ___ busier now. (a small difference)",
        options: [],
        answer: 0,
        accept: ["slightly", "a bit", "a little", "a little bit"],
        explain: "Küçük fark „slightly“, „a bit“ ya da „a little“ ile anlatılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The fewer meetings", "we have,", "the more", "we finish"],
        explain: "the + karşılaştırma + özne + fiil, the + karşılaştırma + özne + fiil.",
      },
      {
        kind: "truefalse",
        text: "„The new office is very cheaper.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„very“ karşılaştırmayla kullanılmaz: „much cheaper“ ya da „far cheaper“ olmalı.",
      },
      {
        kind: "truefalse",
        text: "„We're a lot less tired on Mondays.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„a lot“ „less“ ile kurulan karşılaştırmayı da güçlendirebilir.",
      },
    ],
  },
];
