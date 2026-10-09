import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 4 — "since/for, already/yet/just, hayat hikâyesi, gelecek".
 *
 * Dört ders: Since and for · Already, yet, just · My life story ·
 * Will or going to?
 *
 *   Kelime: since, for, know, work, long, for years, for months,
 *           for hours, already, yet, just, finish, ready, be over,
 *           complete, on time, born, move, study, start, change, be born,
 *           university, marriage, decide, probably, sure, promise, soon,
 *           decision, hopefully, of course.
 *   Kalıp:  I have lived here for three years. ·
 *           I have worked here since March. · How long have you been here? ·
 *           I have already finished. · I haven't finished yet. ·
 *           Have you finished yet? · I was born in … · Then I moved to … ·
 *           Since then, my life has changed a lot. ·
 *           I'm going to visit my sister on Sunday. · I'll answer it. ·
 *           I promise I won't be late.
 *
 * İki ayrım bu üniteyi taşıyor. Birincisi „since“ ile „for“: biri
 * BAŞLANGICI söyler (since March), öteki SÜREYİ (for three years).
 * Türkçede „-den beri“ ikisini de karşılıyor. İkincisi gelecekte
 * „going to“ ile „will“: önceden yapılmış plan ile o anda verilen karar.
 * Türkçede ikisi de „-acak“ ve fark ancak bağlamdan çıkıyor; içerik ikisini
 * aynı metinde, aynı konuşmacıda kullanıyor.
 */
export const enA2U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u4-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 4,
    title: "Ten years in the city",
    genre: "personal",
    intro: "Bir hayat hikâyesi. „since“ ve „for“ art arda geçiyor — hangisi süre, hangisi başlangıç?",
    gloss: [
      { de: "factory", tr: "fabrika" },
      { de: "at the moment", tr: "şu anda" },
      { de: "wife", tr: "eş" },
      { de: "each other", tr: "birbirimizi" },
    ],
    minutes: 5,
    text:
      "I was born in a small town in the north. My parents worked in a factory and we lived there for eleven years.\n\n" +
      "Then I moved to the city because I wanted to study. I have lived here since twenty fifteen — that is ten years.\n\n" +
      "At the university I met my wife. We have known each other for nine years now. We got married in May, and since then my life has changed a lot.\n\n" +
      "I have already finished my studies, but I haven't found a good job yet. I work in a café at the moment. It is not bad: the people are friendly and the hours are good.\n\n" +
      "Next year I'm going to look for work abroad. I promise I won't stay in the café for years!",
    questions: [
      {
        text: "Why did the writer move to the city?",
        options: ["to study", "to work in a factory", "to find a job"],
        answer: 0,
        explain: "„Then I moved to the city because I wanted to study.“ — fabrika anne babanın işi.",
      },
      {
        text: "How long have they known each other?",
        options: ["nine years", "eleven years", "ten years"],
        answer: 0,
        explain: "„We have known each other for nine years now.“ — on bir yıl kasabada, on yıl şehirde geçen süre.",
      },
      {
        kind: "truefalse",
        text: "The writer has not found a good job yet.",
        options: ["True", "False"],
        answer: 0,
        explain: "„…but I haven't found a good job yet.“ — „yet“ henüz olmadığını söylüyor.",
      },
      {
        kind: "gapfill",
        text: "The writer has lived in the city for ___ years.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„I have lived here since twenty fifteen — that is ten years.“",
      },
      {
        kind: "short_answer",
        text: "What is the writer going to do next year?",
        options: [],
        answer: 0,
        accept: ["look for work abroad", "work abroad", "look for a job abroad"],
        explain: "„Next year I'm going to look for work abroad.“ — önceden yapılmış bir plan.",
      },
    ],
  },
  {
    id: "en-a2-u4-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 4,
    title: "A report for the boss",
    genre: "dialogue",
    intro: "İşte bir rapor bekleniyor. „already“, „yet“ ve „just“ üçü de geçiyor.",
    gloss: [
      { de: "report", tr: "rapor" },
      { de: "part", tr: "bölüm" },
      { de: "worry", tr: "endişelenmek" },
      { de: "almost", tr: "neredeyse" },
    ],
    minutes: 5,
    text:
      "Boss: Have you finished the report yet?\n" +
      "Lucy: Almost. I have already written four pages, but I haven't finished the last part yet.\n" +
      "Boss: How long have you been at it?\n" +
      "Lucy: Since nine this morning. For five hours!\n" +
      "Boss: And the numbers? Are they ready?\n" +
      "Lucy: I have just sent them to Charlie. He is going to read them.\n" +
      "Boss: Good. The meeting is at four, so we have two hours.\n" +
      "Lucy: Don't worry, it will be ready on time. I promise.\n" +
      "Boss: I know. You have worked here for three years and you have never been late.\n" +
      "Lucy: Thank you. But I'm going to take a break now — ten minutes.\n" +
      "Boss: Of course. Take twenty.\n" +
      "Lucy: Then the report will be complete at half past three.",
    questions: [
      {
        text: "What has Lucy already written?",
        options: ["four pages", "the last part", "the numbers"],
        answer: 0,
        explain: "„I have already written four pages, but I haven't finished the last part yet.“",
      },
      {
        text: "How long has Lucy worked there?",
        options: ["three years", "five hours", "two hours"],
        answer: 0,
        explain: "„You have worked here for three years…“ — beş saat bugünkü çalışma.",
      },
      {
        kind: "truefalse",
        text: "Lucy has finished the report.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Almost… I haven't finished the last part yet.“",
      },
      {
        kind: "gapfill",
        text: "Lucy has been at it since ___ this morning.",
        options: [],
        answer: 0,
        accept: ["nine", "9"],
        explain: "„Since nine this morning. For five hours!“ — biri başlangıç, öteki süre.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Have you finished the report yet?",
          "I have already written four pages.",
          "I have just sent them to Charlie.",
          "I'm going to take a break now.",
        ],
        explain: "Önce soru, sonra yapılmış olan, sonra az önce olan, en son plan.",
      },
      {
        kind: "short_answer",
        text: "When will the report be complete?",
        options: [],
        answer: 0,
        accept: ["at half past three", "half past three", "three thirty"],
        explain: "„Then the report will be complete at half past three.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u4-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 4,
    title: "New in the city",
    genre: "dialogue",
    intro: "İki kişi ne zamandır burada olduklarını konuşuyor.",
    gloss: [
      { de: "because of", tr: "yüzünden" },
      { de: "easier", tr: "daha kolay" },
      { de: "since", tr: "-den beri" },
      { de: "for", tr: "boyunca" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Henry", text: "How long have you been here?" },
      { speaker: "Katie", text: "In this city? Since March. So about six months." },
      { speaker: "Henry", text: "And your job?" },
      { speaker: "Katie", text: "I have worked at the school for two months. Before that I had no job." },
      { speaker: "Henry", text: "Do you know many people here?" },
      { speaker: "Katie", text: "Not many. I have known Lucy since the first week — we met on the bus." },
      { speaker: "Henry", text: "For me it is easier. I have lived here for eleven years." },
      { speaker: "Katie", text: "Eleven years! Then you know everybody." },
      { speaker: "Henry", text: "Almost. I was born in this city, I moved away for three years and then I came back." },
      { speaker: "Katie", text: "Why did you come back?" },
      { speaker: "Henry", text: "Because of my family. And because the city has changed a lot since twenty ten." },
      { speaker: "Katie", text: "Changed how?" },
      { speaker: "Henry", text: "More parks, more cafés. Better for children." },
    ],
    questions: [
      {
        text: "How long has Katie been in the city?",
        options: ["since March", "for two months", "for eleven years"],
        answer: 0,
        explain: "„In this city? Since March.“ — iki ay işte, on bir yıl Henry'nin.",
      },
      {
        text: "Where did Katie meet Lucy?",
        options: ["on the bus", "at the school", "in a park"],
        answer: 0,
        explain: "„I have known Lucy since the first week — we met on the bus.“",
      },
      {
        kind: "truefalse",
        text: "Henry was born in this city.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I was born in this city, I moved away for three years and then I came back.“",
      },
      {
        kind: "gapfill",
        text: "Henry has lived here for ___ years.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„I have lived here for eleven years.“ — „for“ süreyi söylüyor.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have worked at the school for two months.", "I have worked at the school for two months"],
        explain: "„I have worked at the school for two months.“ — süre olduğu için „for“.",
      },
      {
        kind: "short_answer",
        text: "Why did Henry come back?",
        options: [],
        answer: 0,
        accept: ["because of his family", "his family", "family"],
        explain: "„Because of my family. And because the city has changed a lot…“",
      },
    ],
  },
  {
    id: "en-a2-u4-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 4,
    title: "Two plans for the weekend",
    genre: "monologue",
    intro: "Charlie arkadaşına sesli mesaj bırakıyor. Hangi plan önceden yapılmış, hangi karar şimdi verildi?",
    gloss: [
      { de: "apartment", tr: "daire" },
      { de: "hopefully", tr: "umarım" },
      { de: "an invitation", tr: "davet" },
      { de: "a moment", tr: "an" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Charlie", text: "Hi Lucy, it's Charlie. Thanks for the invitation to the lake, but I have two plans this weekend." },
      { speaker: "Charlie", text: "First, I'm going to visit my sister on Sunday. We decided that last week." },
      { speaker: "Charlie", text: "Second, my apartment is dirty. I will clean it on Saturday — I decided just now, while I was listening to your message!" },
      { speaker: "Charlie", text: "Are you free next weekend? Then I'll come to the lake with you." },
      { speaker: "Charlie", text: "I told my sister: I promise I won't be late on Sunday. She is never happy when I come at two." },
      { speaker: "Charlie", text: "Hopefully the weather will be good. Then we will probably walk by the river. Call me back tonight!" },
    ],
    questions: [
      {
        text: "When is Charlie going to visit his sister?",
        options: ["on Sunday", "on Saturday", "just now"],
        answer: 0,
        explain: "„First, I'm going to visit my sister on Sunday.“ — cumartesi ise temizlik günü; ziyaret kararı geçen hafta verildi.",
      },
      {
        text: "When did Charlie decide to clean the apartment?",
        options: ["just now", "last week", "on Sunday"],
        answer: 0,
        explain: "„I will clean it on Saturday — I decided just now, while I was listening to your message!“",
      },
      {
        kind: "truefalse",
        text: "Charlie decided to visit his sister a moment ago.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We decided that last week.“ — o yüzden „going to“ kullanıyor.",
      },
      {
        kind: "gapfill",
        text: "Charlie promises he ___ be late.",
        options: [],
        answer: 0,
        accept: ["won't", "will not"],
        explain: "„I promise I won't be late on Sunday.“ — söz vermek hep „will“ ile.",
      },
      {
        kind: "order",
        text: "Anlatımın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Thanks for the invitation to the lake.",
          "I'm going to visit my sister on Sunday.",
          "I will clean it on Saturday.",
          "Then I'll come to the lake with you.",
        ],
        explain: "Önce davete teşekkür, sonra iki plan, en son gelecek hafta için bir öneri.",
      },
      {
        kind: "short_answer",
        text: "What will they probably do on Sunday?",
        options: [],
        answer: 0,
        accept: ["walk by the river", "walk", "go for a walk"],
        explain: "„Then we will probably walk by the river.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u4-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 4,
    title: "A card about my life",
    genre: "personal",
    intro: "Süre ve başlangıcı yaz. Sonunda hayat kartını doldur.",
    gloss: [
      { de: "for three years", tr: "üç yıldır" },
      { de: "since March", tr: "marttan beri" },
      { de: "I was born in …", tr: "…'de doğdum" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Üç yıldır burada yaşıyorum.",
        answer: "I have lived here for three years.",
        hint: "SÜRE olduğu için „for“. Türkçe şimdiki zaman diyor, İngilizce „have lived“.",
      },
      {
        kind: "build",
        tr: "Marttan beri burada çalışıyorum.",
        answer: "I have worked here since March.",
        hint: "BAŞLANGIÇ noktası olduğu için „since“. Ay adı büyük harfle.",
      },
      {
        kind: "build",
        tr: "Ne zamandır buradasın?",
        answer: "How long have you been here?",
        hint: "„how long“ süreyi soruyor; „be“ fiilinin bu biçimi „been“.",
      },
      {
        kind: "build",
        tr: "Ben bir kasabada doğdum.",
        answer: "I was born in a town.",
        hint: "Doğmak edilgen kuruluyor: „was born“. „I born“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Hayat kartını doldur.",
        facts: "Kuzeyde küçük bir kasabada doğdu; on bir yıl orada; üniversite için şehre taşındı; dokuz yıldır eşini tanıyor.",
        fields: [
          { label: "Born", answer: "in a small town", accept: ["a small town", "town"] },
          { label: "There", answer: "eleven years", accept: ["11 years"] },
          { label: "Moved", answer: "to study", accept: ["for university", "university"] },
          { label: "Knows", answer: "nine years", accept: ["9 years"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u4-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 4,
    title: "Promises and plans",
    genre: "personal",
    intro: "Üç küçük sözcüğün yeri farklı. Ve geleceğin iki biçimini ayır.",
    gloss: [
      { de: "already", tr: "çoktan" },
      { de: "yet", tr: "henüz" },
      { de: "just", tr: "az önce" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Çoktan bitirdim.",
        answer: "I have already finished.",
        hint: "„already“ yardımcı fiil ile asıl fiil ARASINA giriyor.",
      },
      {
        kind: "build",
        tr: "Henüz bitirmedim.",
        answer: "I haven't finished yet.",
        alternatives: ["I have not finished yet."],
        hint: "„yet“ yalnız olumsuzda ve soruda, hep cümlenin SONUNDA.",
      },
      {
        kind: "build",
        tr: "Artık bitirdin mi?",
        answer: "Have you finished yet?",
        hint: "Soruda da „yet“ sonda. „already“ olsaydı şaşkınlık anlamı katardı.",
      },
      {
        kind: "build",
        tr: "Pazar günü kardeşimi ziyaret edeceğim.",
        answer: "I'm going to visit my sister on Sunday.",
        alternatives: ["I am going to visit my sister on Sunday.", "On Sunday I'm going to visit my sister."],
        hint: "Önceden yapılmış plan: „going to“.",
      },
      {
        kind: "build",
        tr: "Geç kalmayacağıma söz veriyorum.",
        answer: "I promise I won't be late.",
        hint: "Söz vermek hep „will“ ile; olumsuzu „won't“.",
      },
    ],
  },
];
