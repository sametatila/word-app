import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 5 — "Önerge dili, iddian ne kadar güçlü, aynı itiraz,
 * uzun bir argümanı bağlamak".
 *
 * Dört ders: The language of motions · How strong is your claim ·
 * The same objection · Binding a long argument.
 *
 *   Kelime: worker participation, cohesion, incumbent, marginalize, exploit,
 *           problematize, dehumanize, instrumentalize, coarsen,
 *           scandalize, disparity, scandalization, disempowerment,
 *           paradigm, causality, empirical.
 *   Kalıp:  We move that the board grant worker participation. ·
 *           Were it not for the rule of law, cohesion would fail. ·
 *           They ask that no member abstain. ·
 *           The wording may well marginalize older readers. ·
 *           The new contract might have been expected to exploit workers less. ·
 *           Such a text would tend to problematize everything. ·
 *           A wave of outrage reads differently in each register. ·
 *           The echo chamber is a filter bubble with a name. ·
 *           Quoted in a ruling, the same words become opinion manipulation. ·
 *           This alone holds the chain of argument together. ·
 *           Such an explanatory approach is rare. ·
 *           The latter reflects the current state of research.
 *
 * Ünitenin tek öğretme noktası ORTA ÇATI. „A wave of outrage reads
 * differently“ — fiil etken biçimde ama özne eylemi YAPAN değil, eylemin
 * UYGULANDIĞI şey. Edilgen değil: edilgende gizli bir fail var, burada
 * hiç fail yok. Üç koşulu var: neredeyse hep bir zarf gerekiyor, fiil
 * küçük bir listeden geliyor, ve özne asla bir kişi olmuyor.
 */
export const enC1U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u05-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 5,
    title: "A first novel that sells",
    genre: "article",
    intro: "Beklenmedik biçimde çok satan bir ilk roman üzerine yazı. Kitap neden bu kadar sevildi?",
    gloss: [
      { de: "a ferry", tr: "feribot" },
      { de: "poor", tr: "kötü" },
      { de: "easily", tr: "kolayca" },
      { de: "impressed", tr: "etkilenmiş" },
      { de: "an editor", tr: "editör" },
      { de: "a paperback", tr: "karton kapaklı kitap" },
      { de: "an edition", tr: "baskı" },
      { de: "a thriller", tr: "gerilim romanı" },
      { de: "a title", tr: "ad" },
      { de: "a reviewer", tr: "eleştirmen" },
      { de: "a translation", tr: "çeviri" },
      { de: "gently", tr: "yavaşça" },
      { de: "cross", tr: "geçmek" },
      { de: "a dialogue", tr: "diyalog" },
      { de: "steadily", tr: "istikrarlı biçimde" },
      { de: "a billboard", tr: "reklam panosu" },
      { de: "a novel", tr: "roman" },
    ],
    minutes: 12,
    text:
      "THE SLOW BOOK THAT SELLS FAST\n" +
      "Nobody at Mavi Press expected much from the first novel of Ela Soner. The print run was three thousand copies, and the marketing budget would not have paid for a single billboard.\n" +
      "Eighteen months later, „The Night Ferry“ has sold 140,000 copies in Turkish and is being translated into eleven languages. It sells steadily in airports and in small bookstores, and it has never been on television.\n" +
      "Booksellers say the reason is simple: the book reads quickly. The chapters are short, the dialogue is sharp, and the story, about a woman who crosses the Bosphorus every night for a year to visit her father in the hospital, opens gently and then refuses to let go.\n" +
      "The English translation reads well, according to early reviewers, although the title translates badly. In English it sounds like the name of a thriller, and some readers were disappointed to find a family story instead. The German edition will carry a different title.\n" +
      "The paperback has another advantage that publishers rarely mention: it prints cheaply. The novel is under two hundred pages, and at eight dollars it costs less than a movie ticket. „A short book sells to people who are nervous about long ones,“ the editor told me, „and there are a lot of those.“\n" +
      "Not everyone is impressed. One critic wrote that the story „washes over you and leaves nothing behind“. Soner has answered politely: she wanted a book that people would finish, and most of them do.\n" +
      "The film rights were sold in March. Whether the story adapts easily to the screen is another question; much of it takes place inside the head of one woman, and that does not photograph well.\n" +
      "Soner is working on her second novel. It is set on a train, she says, and it will be even shorter.",
    questions: [
      {
        text: "How many copies were printed at first?",
        options: ["three thousand", "140,000", "eleven"],
        answer: 0,
        explain: "„The print run was three thousand copies…“",
      },
      {
        text: "Why were some readers of the English translation disappointed?",
        options: ["They expected a thriller.", "The translation was poor.", "The book was too long."],
        answer: 0,
        explain: "„In English it sounds like the name of a thriller, and some readers were disappointed to find a family story instead.“",
      },
      {
        kind: "truefalse",
        text: "The book costs less than a movie ticket.",
        options: ["True", "False"],
        answer: 0,
        explain: "„…at eight dollars it costs less than a movie ticket.“",
      },
      {
        kind: "gapfill",
        text: "Booksellers say the reason is simple: the book reads ___.",
        options: [],
        answer: 0,
        accept: ["quickly"],
        explain: "„Booksellers say the reason is simple: the book reads quickly.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The first print run was small.",
          "The novel is being translated into eleven languages.",
          "A critic was not impressed.",
          "The film rights were sold.",
        ],
        explain: "Küçük bir başlangıç, başarı, eleştiri, en sonda film hakları.",
      },
      {
        kind: "short_answer",
        text: "Where is the second novel set?",
        options: [],
        answer: 0,
        accept: ["on a train", "a train", "train"],
        explain: "„It is set on a train, she says, and it will be even shorter.“",
      },
    ],
  },
  {
    id: "en-c1-u05-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 5,
    title: "Teenagers, phones and loneliness",
    genre: "report",
    intro: "Gençlerde telefon kullanımı ve yalnızlık üzerine yeni bir araştırma. Sonuç sanıldığı kadar basit mi?",
    gloss: [
      { de: "experimental", tr: "deneysel" },
      { de: "simply", tr: "sadece" },
      { de: "increasingly", tr: "giderek" },
      { de: "an explanation", tr: "açıklama" },
      { de: "harmless", tr: "zararsız" },
      { de: "unusual", tr: "alışılmadık" },
      { de: "a researcher", tr: "araştırmacı" },
      { de: "a teenager", tr: "ergen" },
      { de: "a decade", tr: "on yıl" },
      { de: "loneliness", tr: "yalnızlık" },
    ],
    minutes: 11,
    text:
      "PHONES AND LONELINESS: WHAT A NEW STUDY FOUND\n" +
      "For a decade, the debate about teenagers and smartphones has followed one paradigm: more screen time, more loneliness. A study published this month by researchers in Utrecht and Izmir suggests that the picture is less simple.\n" +
      "The team followed 3,400 students aged thirteen to seventeen for three years, asking them every six months how many hours they spent online and how lonely they felt. This alone makes the study unusual. Most earlier work asked students once and compared them at a single moment, which can show a link but not the direction of it.\n" +
      "The researchers found two groups whose results pointed in opposite directions. Students who used their phones mainly to look through photos of other people became lonelier over time. Students who used them mainly to message friends they already knew did not; some became less lonely.\n" +
      "Such a result is easy to report badly. A headline that says „phones cause loneliness“ is wrong, and so is one that says „phones are harmless“. The honest summary is that what teenagers do online matters more than how long they spend there.\n" +
      "The authors are careful about causality. It is possible that lonely students look through photos more, rather than that the photos make them lonely. Because they measured the same students again and again, they could test both directions, and they found evidence for both, although the first was stronger.\n" +
      "Two explanations are offered for why the photos hurt: comparison with others, and the time the phone takes away from sleep. The latter reflects the current state of research, which increasingly treats sleep as the missing link between screens and mood.\n" +
      "Such an explanatory approach is rare in public debate, where a single number usually wins. The authors hope that schools will use the findings to talk with students about how they use their phones rather than simply how much.\n" +
      "The study, which is empirical rather than experimental, cannot settle the question. It does, however, make the old paradigm harder to defend.",
    questions: [
      {
        text: "How long did the team follow the students?",
        options: ["three years", "six months", "one year"],
        answer: 0,
        explain: "„The team followed 3,400 students aged thirteen to seventeen for three years…“",
      },
      {
        text: "Which students became lonelier over time?",
        options: ["those who looked through photos of other people", "those who messaged their friends", "those who slept more"],
        answer: 0,
        explain: "„Students who used their phones mainly to look through photos of other people became lonelier over time.“",
      },
      {
        kind: "truefalse",
        text: "The study proves that phones cause loneliness.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The study, which is empirical rather than experimental, cannot settle the question.“",
      },
      {
        kind: "gapfill",
        text: "The ___ reflects the current state of research.",
        options: [],
        answer: 0,
        accept: ["latter"],
        explain: "„The latter reflects the current state of research…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The old paradigm linked screen time and loneliness.",
          "The team followed students for three years.",
          "Two groups showed opposite results.",
          "The authors hope schools will use the findings.",
        ],
        explain: "Eski görüş, araştırma, iki grup, en sonda okullar için öneri.",
      },
      {
        kind: "short_answer",
        text: "How many students took part in the study?",
        options: [],
        answer: 0,
        accept: ["3,400", "3400", "3,400 students"],
        explain: "„The team followed 3,400 students…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u05-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "A motion for the staff meeting",
    genre: "dialogue",
    intro: "Çalışan temsilcileri toplantı için bir önerge hazırlıyor. Yönetimden ne istiyorlar?",
    gloss: [
      { de: "elect", tr: "seçmek" },
      { de: "a motion", tr: "önerge" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Tunç", text: "The staff meeting is on Friday, and the motion has to be on the agenda by tomorrow. Shall we read it once more?" },
      { speaker: "Melek", text: "Go ahead. I will listen for anything the board could misread." },
      { speaker: "Tunç", text: "We move that the board grant worker participation in all decisions about shift patterns. Two seats on the planning committee, elected by staff." },
      { speaker: "Melek", text: "Good. Keep the word „all“. Last year they only asked us about the easy decisions." },
      { speaker: "Tunç", text: "Second paragraph. We request that the new schedule be stopped until the committee has met." },
      { speaker: "Melek", text: "They will say that costs money. Were it not for the overtime we worked in the winter, the warehouse would have closed. Put that in." },
      { speaker: "Tunç", text: "Fine. Third: we ask that no member abstain from the vote without a reason." },
      { speaker: "Melek", text: "Is that fair? Some people are afraid of being seen on the wrong side." },
      { speaker: "Tunç", text: "That is exactly why. If half the room abstains, the board will say we are divided." },
      { speaker: "Melek", text: "Then add that the vote be secret. People will vote when nobody is counting hands." },
      { speaker: "Tunç", text: "We ask that the vote be held in secret. Done." },
      { speaker: "Melek", text: "Now read me the first sentence again, slowly. That one has to be perfect." },
    ],
    questions: [
      {
        text: "When is the staff meeting?",
        options: ["on Friday", "tomorrow", "next week"],
        answer: 0,
        explain: "„The staff meeting is on Friday…“",
      },
      {
        text: "How many seats do they want on the planning committee?",
        options: ["two", "one", "half of them"],
        answer: 0,
        explain: "„Two seats on the planning committee, elected by staff.“",
      },
      {
        kind: "truefalse",
        text: "Melek wants the vote to be secret.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Then add that the vote be secret.“",
      },
      {
        kind: "gapfill",
        text: "We ask that no member ___ from the vote without a reason.",
        options: [],
        answer: 0,
        accept: ["abstain"],
        explain: "„Third: we ask that no member abstain from the vote without a reason.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "We move that the board grant worker participation in all decisions about shift patterns.",
          "We move that the board grant worker participation in all decisions about shift patterns",
        ],
        explain: "İstek kipi: „grant“, „grants“ değil.",
      },
      {
        kind: "short_answer",
        text: "What would have happened without the overtime in the winter?",
        options: [],
        answer: 0,
        accept: ["the warehouse would have closed", "it would have closed", "the warehouse closing"],
        explain: "„Were it not for the overtime we worked in the winter, the warehouse would have closed.“",
      },
    ],
  },
  {
    id: "en-c1-u05-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "A scheduling app for nurses",
    genre: "monologue",
    intro: "Bir hastanenin hemşireler için kullandığı vardiya uygulaması üzerine radyo haberi. Uygulama gerçekten işe yarıyor mu?",
    gloss: [
      { de: "independent", tr: "bağımsız" },
      { de: "favor", tr: "kayırmak" },
      { de: "a fifth", tr: "beşte bir" },
      { de: "reduce", tr: "azaltmak" },
      { de: "a nurse", tr: "hemşire" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Rüzgar", text: "Good evening. Tonight our report is about Rota, the scheduling app that the city hospital introduced for its nurses in January." },
      { speaker: "Rüzgar", text: "The hospital says the app may well reduce overtime by a fifth. That figure comes from the company that sells it, and nobody has checked it yet." },
      { speaker: "Rüzgar", text: "The app might have been expected to make planning fairer. Instead, several nurses told us it gives the best shifts to whoever answers first." },
      { speaker: "Rüzgar", text: "Such a system would tend to favor young staff without children, who can check their phones at any hour." },
      { speaker: "Rüzgar", text: "Nurses with children may well be the ones who lose most. One of them, a mother of three, said she now works more weekends than before." },
      { speaker: "Rüzgar", text: "The hospital director disagrees. She told us the app might have saved the hospital two hundred thousand dollars already, although she could not share the figures." },
      { speaker: "Rüzgar", text: "The nurses union has asked for an independent review. The hospital has agreed, and the results are expected in June." },
      { speaker: "Rüzgar", text: "Until then, the honest answer is that nobody knows whether Rota works. We will report back when the review is published." },
    ],
    questions: [
      {
        text: "When did the hospital introduce the app?",
        options: ["in January", "in June", "last year"],
        answer: 0,
        explain: "„…the scheduling app that the city hospital introduced for its nurses in January.“",
      },
      {
        text: "Who gets the best shifts, according to several nurses?",
        options: ["whoever answers first", "the oldest nurses", "nurses with children"],
        answer: 0,
        explain: "„…it gives the best shifts to whoever answers first.“",
      },
      {
        kind: "truefalse",
        text: "Someone outside the company has checked the overtime figure.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That figure comes from the company that sells it, and nobody has checked it yet.“",
      },
      {
        kind: "gapfill",
        text: "The hospital says the app may well reduce overtime by a ___.",
        options: [],
        answer: 0,
        accept: ["fifth"],
        explain: "„The hospital says the app may well reduce overtime by a fifth.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Such a system would tend to favor young staff without children, who can check their phones at any hour.",
          "Such a system would tend to favor young staff without children, who can check their phones at any hour",
        ],
        explain: "„would“ varsayım, „tend to“ eğilim bildiriyor: kesin bir iddia değil.",
      },
      {
        kind: "short_answer",
        text: "When are the results of the review expected?",
        options: [],
        answer: 0,
        accept: ["in June", "June"],
        explain: "„The hospital has agreed, and the results are expected in June.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u05-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "Outrage in the media",
    genre: "info",
    intro: "Medya ve yayıncılık üzerine notlar: cümleler ve bir kitap kartı.",
    gloss: [
      { de: "reads differently", tr: "başka okunuyor" },
      { de: "a filter bubble", tr: "filtre balonu" },
      { de: "quoted", tr: "alıntılanan" },
      { de: "holds together", tr: "bir arada tutuyor" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bir öfke dalgası her dil düzeyinde başka okunuyor.",
        answer: "A wave of outrage reads differently in each register.",
        hint: "Orta çatı: özne okunan şey, fiil etken biçimde.",
      },
      {
        kind: "build",
        tr: "Yankı odası, adı konmuş bir filtre balonu.",
        answer: "The echo chamber is a filter bubble with a name.",
        hint: "İki isim: ikincisi birincisini yeniden adlandırıyor.",
      },
      {
        kind: "build",
        tr: "Bir kararda alıntılanınca aynı sözcükler kamuoyu manipülasyonu oluyor.",
        answer: "Quoted in a ruling, the same words become opinion manipulation.",
        hint: "Edilgen ortaç: bağlam değişince değer değişiyor.",
      },
      {
        kind: "build",
        tr: "Yalnızca bu, argüman zincirini bir arada tutuyor.",
        answer: "This alone holds the chain of argument together.",
        hint: "Uzun bir metinde en tehlikeli sözcük.",
      },
      {
        kind: "form",
        prompt: "Kitap haberi için bilgi kartını doldur.",
        facts: "İlk baskı üç bin kopyaydı; roman şimdiye kadar 140.000 kopya sattı; kitap hızlı okunuyor; İngilizcede adı kötü çevriliyor; film hakları martta satıldı.",
        fields: [
          { label: "First print run", answer: "three thousand copies", accept: ["3,000 copies", "three thousand", "3000"] },
          { label: "Sales so far", answer: "140,000 copies", accept: ["140,000", "140000"] },
          { label: "Why it sells", answer: "it reads quickly", accept: ["reads quickly", "quick to read"] },
          { label: "The English title", answer: "translates badly", accept: ["it translates badly", "badly"] },
          { label: "Film rights", answer: "sold in March", accept: ["March", "sold"] },
        ],
      },

    ],
  },
  {
    id: "en-c1-u05-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "A motion on worker participation",
    genre: "info",
    intro: "Çalışan temsilcilerinin önergesi: talepleri resmî bir dille yaz.",
    gloss: [
      { de: "we move that", tr: "öneriyoruz ki" },
      { de: "abstain", tr: "çekimser kalmak" },
      { de: "may well", tr: "pekâlâ" },
      { de: "tend to", tr: "eğiliminde olmak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kurulun çalışanlara söz hakkı tanımasını öneriyoruz.",
        answer: "We move that the board grant worker participation.",
        hint: "İstek kipi: „grant“, „grants“ değil.",
      },
      {
        kind: "build",
        tr: "Hiçbir üyenin çekimser kalmamasını istiyorlar.",
        answer: "They ask that no member abstain.",
        hint: "Olumsuz öznede duruyor, fiilde değil.",
      },
      {
        kind: "build",
        tr: "Hukuk devleti olmasa bütünlük çökerdi.",
        answer: "Were it not for the rule of law, cohesion would fail.",
        hint: "Aynı kipin öteki yarısı: varsayım.",
      },
      {
        kind: "build",
        tr: "İfade biçimi pekâlâ yaşlı okurları ötekileştirebilir.",
        answer: "The wording may well marginalize older readers.",
        hint: "„may well“: olası, ama ne kadar olduğu söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Yeni sözleşmenin işçileri daha az sömürmesi beklenmiş olabilirdi.",
        answer: "The new contract might have been expected to exploit workers less.",
        hint: "Dört katman; işe yarayan „expected“.",
      },
    ],
  },
];
