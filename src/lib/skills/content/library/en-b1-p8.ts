import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 ulaşım hattı: forum tartışması, park yeri toplantısı, tamir
 * servisi değerlendirmesi. Dil bilgisi present perfect continuous.
 */
export const enB1P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r8",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Forum: Cycling to Work — Be Honest",
    genre: "forum",
    intro: "Bir forumda üç kişi işe bisikletle gitmeyi tartışıyor: kime yarıyor, kime yaramıyor.",
    gloss: [
      { de: "colleague", tr: "iş arkadaşı" },
      { de: "shower", tr: "duş" },
      { de: "route", tr: "güzergâh" },
      { de: "to give up", tr: "vazgeçmek" },
      { de: "puncture", tr: "patlak lastik" },
      { de: "employer", tr: "işveren" },
      { de: "lazy", tr: "tembel" },
      { de: "annoyed", tr: "sinirlenmek" },
    ],
    minutes: 6,
    text:
      "Topic: Cycling to work — be honest\n\n" +
      "dilara_k: I've been cycling to work for four months now and I want to say something " +
      "nobody says: the first three weeks were awful. Everyone tells you it gets easier, " +
      "but nobody tells you how long that takes.\n\n" +
      "tom_w: Same here. What changed it for me was not fitness, it was the route. " +
      "I was using the main road because it was shorter. Then a colleague showed me a way " +
      "through the park that adds seven minutes and takes away all the stress.\n\n" +
      "dilara_k: That's a good point. I'd add showers. My office has one and I use it every day. " +
      "Without it I would have given up in week two.\n\n" +
      "priya.s: This is where I get annoyed. Half of this advice only works if your employer " +
      "has a shower, secure parking and no meetings at eight in the morning. Mine has none of " +
      "those, and I've had two punctures this month. It isn't laziness.\n\n" +
      "tom_w: Fair. I think the honest version is: cycling to work is great if three things " +
      "line up — a safe route, somewhere to leave the bike, and a workplace that doesn't mind " +
      "if you arrive warm. Two out of three and it's hard work.\n\n" +
      "priya.s: Two out of three is exactly my situation, and “hard work” is right. " +
      "I still do it twice a week. Just don't tell me it's easy.",
    questions: [
      {
        text: "What does dilara_k say that others usually don't?",
        options: [
          "that the first weeks are very hard",
          "that cycling is dangerous",
          "that it saves no money",
        ],
        answer: 0,
        explain: "„the first three weeks were awful“ ve bunu kimsenin söylemediğini belirtiyor.",
      },
      {
        text: "What made the difference for tom_w?",
        options: ["getting fitter", "changing the route", "buying a better bike"],
        answer: 1,
        explain: "„it was the route“ — parktan geçen yol yedi dakika uzun ama stressiz.",
      },
      {
        kind: "truefalse",
        text: "priya.s thinks people who don't cycle are lazy.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It isn't laziness.“ — tam tersini söylüyor.",
      },
      {
        kind: "gapfill",
        text: "The park route adds ___ minutes.",
        options: [],
        answer: 0,
        accept: ["seven", "7"],
        explain: "„a way through the park that adds seven minutes“.",
      },
      {
        kind: "short_answer",
        text: "What three things does tom_w say must line up?",
        options: [],
        answer: 0,
        accept: [
          "route, parking and workplace",
          "a safe route, parking, a relaxed workplace",
          "route, somewhere to park, workplace",
        ],
        explain: "„a safe route, somewhere to leave the bike, and a workplace that doesn't mind“.",
      },
      {
        text: "How does the discussion end?",
        options: [
          "with agreement that it is easy",
          "with agreement that it depends on conditions",
          "without any agreement",
        ],
        answer: 1,
        explain: "priya.s „two out of three“ durumunu kabul ediyor ve yine de haftada iki gün yapıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l8",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Where Do We Put the Bikes?",
    genre: "meeting",
    intro: "Küçük bir işyeri toplantısı: bisikletler nereye konacak, kim karar verecek, para nereden çıkacak.",
    gloss: [
      { de: "storage", tr: "depolama" },
      { de: "to fit", tr: "sığmak" },
      { de: "rack", tr: "bisiklet standı" },
      { de: "budget", tr: "bütçe" },
      { de: "to book", tr: "yer ayırtmak" },
      { de: "insurance", tr: "sigorta" },
      { de: "roof", tr: "çatı" },
      { de: "sheet", tr: "kâğıt" },
      { de: "cyclist", tr: "bisiklet süren kişi" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ms. Fenton", text: "Right, bikes. We now have nine people cycling in and space for four. Ideas, please." },
      { speaker: "Ahmet", text: "The old storage room by the back door is empty. Six bikes would fit easily, maybe eight." },
      { speaker: "Ms. Fenton", text: "It's empty because the door doesn't lock. That's a hundred and forty pounds for a new lock, and it isn't in this year's budget." },
      { speaker: "Clare", text: "Cheaper idea: two more racks outside, under the roof. About sixty pounds each." },
      { speaker: "Ahmet", text: "Outside is fine in June. In November people stop cycling because the bike gets wet and nobody says why." },
      { speaker: "Clare", text: "Then let's do both, but not at once. Racks now, and the storage room when the budget opens in April." },
      { speaker: "Ms. Fenton", text: "I can agree to that. One condition: if we open the room, we need a booking system, otherwise the same three bikes live there permanently." },
      { speaker: "Clare", text: "A sheet on the door is enough. Nobody is going to use an app for this." },
      { speaker: "Ms. Fenton", text: "Agreed. Ahmet, can you check whether our insurance covers bikes stored inside? That decides whether the room is an option at all." },
    ],
    questions: [
      {
        text: "What is the problem at the start?",
        options: [
          "Nine cyclists, space for four.",
          "Nobody cycles to work.",
          "The racks are broken.",
        ],
        answer: 0,
        explain: "„We now have nine people cycling in and space for four.“",
      },
      {
        text: "Why is the storage room empty?",
        options: ["It is too small.", "The door doesn't lock.", "It is used for deliveries."],
        answer: 1,
        explain: "„It's empty because the door doesn't lock.“ Yeni kilit yüz kırk sterlin ve bu yılki bütçede yok.",
      },
      {
        kind: "truefalse",
        text: "They decide to do the racks and the room at the same time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Racks now, and the storage room when the budget opens in April.“",
      },
      {
        kind: "gapfill",
        text: "Each new rack costs about ___ pounds.",
        options: [],
        answer: 0,
        accept: ["sixty", "60"],
        explain: "„About sixty pounds each.“",
      },
      {
        kind: "short_answer",
        text: "What must Ahmet check?",
        options: [],
        answer: 0,
        accept: [
          "the insurance",
          "whether insurance covers bikes inside",
          "whether our insurance covers bikes stored inside",
          "if the insurance covers bikes",
        ],
        explain: "„can you check whether our insurance covers bikes stored inside“.",
      },
      {
        text: "What is Ms. Fenton's condition for opening the room?",
        options: ["a booking system", "a second door", "a monthly fee"],
        answer: 0,
        explain: "Aksi hâlde aynı üç bisiklet orada kalıcı olur.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w8",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Review: The Bike Repair Shop",
    genre: "review",
    intro: "Bir tamir dükkânını değerlendiriyorsun: önce iki cümle kur, sonra dengeli ve yararlı bir yorum yaz.",
    gloss: [
      { de: "to repair", tr: "tamir etmek" },
      { de: "quote", tr: "fiyat teklifi" },
      { de: "spare part", tr: "yedek parça" },
      { de: "honest", tr: "dürüst" },
      { de: "to recommend", tr: "tavsiye etmek" },
      { de: "wheel", tr: "tekerlek" },
      { de: "gear", tr: "vites" },
      { de: "chain", tr: "zincir" },
      { de: "slip", tr: "yerinden kaymak" },
      { de: "gears", tr: "vites" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Üç haftadır bu dükkâna gidiyorum.",
        answer: "I've been going to this shop for three weeks.",
        alternatives: ["I have been going to this shop for three weeks."],
        hint: "Süren bir durum ve süre bildiriliyor: present perfect continuous + for.",
      },
      {
        kind: "build",
        tr: "Bana ihtiyacım olmayan bir şey satmaya çalışmadılar.",
        answer: "They didn't try to sell me anything I didn't need.",
        alternatives: [
          "They did not try to sell me anything I didn't need.",
          "They didn't try to sell me something I didn't need.",
        ],
        hint: "Geçmiş olumsuz: didn't + yalın fiil; ikinci yan cümlede de geçmiş kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Bir tamir dükkânı için yorum yaz: neyi ne zaman tamir ettirdiğini söyle, süreci anlat, fiyat ve iletişim hakkında somut ol, bir eksiğini dürüstçe yaz ve kime uygun olduğunu söyle.",
        checklist: [
          "Neyi ne zaman tamir ettirdiğini yaz",
          "Süreci ve fiyatı somut anlat",
          "Bir eksiğini dürüstçe yaz",
          "Kime uygun olduğunu söyle",
        ],
        minWords: 90,
        phrases: [
          { de: "I took my bike in on …", tr: "Bisikletimi … günü götürdüm", en: "" },
          { de: "They gave me a quote of … before starting.", tr: "Başlamadan önce … fiyat verdiler", en: "" },
          { de: "What I liked most was …", tr: "En çok beğendiğim şey …", en: "" },
          { de: "The only problem was …", tr: "Tek sorun … oldu", en: "" },
          { de: "I'd recommend this shop to anyone who …", tr: "Bu dükkânı … olan herkese tavsiye ederim", en: "" },
        ],
        sample:
          "I took my bike in on a Tuesday morning with a broken gear cable and a wheel that had " +
          "been making a noise for weeks. They gave me a quote of thirty-five pounds before " +
          "starting and called me when they found that the chain also needed replacing, " +
          "which took it to fifty-two. " +
          "What I liked most was that phone call. They didn't try to sell me anything I didn't " +
          "need, and the man explained why the chain was the reason the gears kept slipping. " +
          "The only problem was time. They said Wednesday afternoon and it was ready on Thursday, " +
          "and nobody told me — I had to phone. " +
          "I'd recommend this shop to anyone who wants an honest price and can wait an extra day. " +
          "If you need your bike back the same evening, go somewhere bigger.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s8",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Is Cycling to Work Realistic?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir tavsiyenin kime uyduğunu tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "„Herkes işe bisikletle gitmeli“ deniyor. Bu gerçekçi mi? Görüşünü söyle, hangi koşullar gerektiğini anlat, kimin için işlemediğini söyle ve bir öneride bulun.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Hangi koşulların gerektiğini anlat",
        "Kimin için işlemediğini söyle",
        "Somut bir öneri ver",
      ],
      targets: [
        { de: "It works, but only when …", tr: "İşliyor ama yalnız … olduğunda" },
        { de: "In my own case, the deciding factor was …", tr: "Benim durumumda belirleyici olan …" },
        { de: "It simply doesn't work for people who …", tr: "… olan insanlar için hiç işlemiyor" },
        { de: "Rather than telling people to cycle, I'd …", tr: "İnsanlara bisiklete bin demek yerine … yapardım" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "It works, but only when three things come together, and most advice mentions none of them. " +
        "You need a route that isn't frightening, somewhere safe to leave the bike, " +
        "and a workplace where arriving warm is not a problem. " +
        "In my own case, the deciding factor was the route. I gave up twice on the main road " +
        "and started again when I found a way through the park that takes seven minutes longer. " +
        "It simply doesn't work for people who drop children at two different schools, " +
        "or who carry equipment, or whose office has nowhere to park. " +
        "Telling them to cycle is not advice, it is just noise. " +
        "Rather than telling people to cycle, I'd spend the money on the boring things: " +
        "a covered rack, a lock on the storage room, and one safe route into the center. " +
        "Where those exist, people cycle without being told.",
      rubricHint:
        "Koşullar, kişisel bir örnek ve bir öneri beklenir; „only when“, „the deciding factor was“ ve „rather than“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g8",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "I've been waiting",
    genre: "grammar",
    intro: "Bir şey ne kadar süredir DEVAM ediyor? Bunu söylemenin kendi biçimi var.",
    focus: "Present perfect continuous ve present perfect farkı",
    gloss: [
      { de: "to wait", tr: "beklemek" },
      { de: "to rain", tr: "yağmur yağmak" },
      { de: "chapter", tr: "bölüm" },
      { de: "since", tr: "-den beri" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "have been + -ing",
        tr: "„have/has been + -ing“ bir eylemin geçmişte başlayıp HÂLÂ sürdüğünü ya da az önce bittiğini ve izinin görüldüğünü anlatır. Süre için „for“ (uzunluk) ve „since“ (başlangıç noktası) kullanılır.",
        examples: [
          { de: "I've been waiting for twenty minutes.", tr: "Yirmi dakikadır bekliyorum.", note: "hâlâ bekliyor" },
          { de: "She's been working here since March.", tr: "Marttan beri burada çalışıyor.", note: "since + başlangıç" },
          { de: "It's been raining all morning.", tr: "Sabahtan beri yağmur yağıyor.", note: "hâlâ sürüyor" },
        ],
      },
      {
        heading: "Süreç mi, sonuç mu?",
        tr: "Present perfect SONUCA bakar, continuous biçimi SÜRECE. „I've read three chapters“ — kaç bölüm bittiği önemli. „I've been reading all evening“ — ne kadar süre okunduğu önemli, bitip bitmediği değil. Bir sayı veriyorsan continuous kullanılmaz.",
        examples: [
          { de: "I've read three chapters.", tr: "Üç bölüm okudum.", note: "sonuç: sayı var" },
          { de: "I've been reading all evening.", tr: "Bütün akşam okudum.", note: "süreç: süre var" },
          { de: "He's written two emails.", tr: "İki e-posta yazdı.", note: "sayı → continuous olmaz" },
        ],
      },
      {
        heading: "Durum fiilleri continuous almaz",
        tr: "„know, like, believe, belong, understand, need“ gibi durum fiilleri -ing biçimine girmez. „I've known her for ten years“ doğru, „I've been knowing her“ yanlıştır. „live“ ve „work“ ise ikisini de alır ve anlam neredeyse aynıdır.",
        examples: [
          { de: "I've known her for ten years.", tr: "Onu on yıldır tanıyorum.", note: "durum fiili" },
          { de: "We've lived here for five years.", tr: "Beş yıldır burada oturuyoruz.", note: "ikisi de olur" },
          { de: "We've been living here for five years.", tr: "Beş yıldır burada oturuyoruz.", note: "aynı anlam" },
        ],
      },
    ],
    questions: [
      {
        text: "I ___ for twenty minutes and the bus still isn't here.",
        options: ["waited", "'ve waited", "'ve been waiting"],
        answer: 2,
        explain: "Süre bildiriliyor ve eylem sürüyor: present perfect continuous.",
      },
      {
        text: "She ___ three emails this morning.",
        options: ["has been writing", "has written", "is writing"],
        answer: 1,
        explain: "Bir sayı verildiği için sonuç biçimi gelir.",
      },
      {
        text: "Which sentence is wrong?",
        options: [
          "I've known her for ten years.",
          "I've been knowing her for ten years.",
          "I've been working here since March.",
        ],
        answer: 1,
        explain: "„know“ bir durum fiilidir ve -ing almaz.",
      },
      {
        kind: "gapfill",
        text: "It's been ___ all morning. (rain)",
        options: [],
        answer: 0,
        accept: ["raining"],
        explain: "have been + -ing biçimi.",
      },
      {
        kind: "gapfill",
        text: "She's been working here ___ March. (for / since)",
        options: [],
        answer: 0,
        accept: ["since"],
        explain: "Başlangıç noktası verildiğinde since gelir.",
      },
      {
        kind: "gapfill",
        text: "I've been reading ___ two hours. (for / since)",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "Süre uzunluğu verildiğinde for gelir.",
      },
      {
        kind: "gapfill",
        text: "How long ___ you been cycling to work? (have)",
        options: [],
        answer: 0,
        accept: ["have"],
        explain: "Soruda yardımcı fiil başa geçer: How long have you been …?",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I've", "been", "learning", "Spanish", "for three weeks"],
        explain: "have been + -ing + for + süre.",
      },
      {
        kind: "truefalse",
        text: "„I've been reading three chapters.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Sayı verildiğinde sonuç biçimi gelir: „I've read three chapters.“",
      },
      {
        kind: "truefalse",
        text: "„We've been living here for five years.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„live“ iki biçimi de alır ve anlam neredeyse aynıdır.",
      },
    ],
  },
];
