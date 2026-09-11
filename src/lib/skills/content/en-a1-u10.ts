import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 10 — "İş günü, iş sonrası, hafta sonu planı, vakit".
 *
 * Dört ders: A work day · After work · Weekend plans · What time …?
 *
 *   Kelime: office, start, finish, lunch, meeting, building, programme,
 *           free, watch, read, music, walk, television, radio, film, plan,
 *           visit, stay, travel, tomorrow, trip, vacation, sea, when,
 *           open, close, late, early, be open, be closed, be ready.
 *   Kalıp:  I start work at eight. · in the afternoon ·
 *           I have a meeting on Friday. · I like reading. ·
 *           Do you like watching films? · I don't like listening to music. ·
 *           I'm going to … · Are you going to …? · I'm not going to … ·
 *           What time is it? · What time do you open? ·
 *           When does the bus leave?
 *
 * Ünitenin yeni yapısı GELECEK: „I'm going to …“. Türkçede gelecek bir
 * EKtir (-acak) ve tek sözcüğe sığar; İngilizcede üç parça var ve
 * olumsuzu ile sorusu o parçalardan birini oynatarak kuruluyor
 * („I'm not going to …“, „Are you going to …?“). İçerik üç biçimi de
 * aynı diyalogda kullanıyor.
 */
export const enA1U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u10-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 10,
    title: "A work day",
    genre: "personal",
    intro: "Bir iş günü baştan sona. İş kaçta başlıyor, kaçta bitiyor, sonrası ne oluyor?",
    gloss: [
      { de: "new", tr: "yeni" },
      { de: "big", tr: "büyük" },
      { de: "by the sea", tr: "deniz kenarında" },
      { de: "in the afternoon", tr: "öğleden sonra" },
    ],
    minutes: 4,
    text:
      "I work in a big office in the city. The building is old but it is very nice.\n\n" +
      "I start work at eight and I finish at five. At lunch I eat with my friends in the café near the office. In the afternoon I usually have a meeting.\n\n" +
      "I have a meeting on Friday with a new group. I am not going to be late!\n\n" +
      "After work I am free. I like reading, and I don't like listening to the radio. In the evening I watch a film on television. Sometimes I walk by the sea.",
    questions: [
      {
        text: "What time does the writer finish work?",
        options: ["at five", "at eight", "in the afternoon"],
        answer: 0,
        explain: "„I start work at eight and I finish at five.“ — sekiz başlangıç saati.",
      },
      {
        text: "What does the writer like?",
        options: ["reading", "listening to the radio", "meetings"],
        answer: 0,
        explain: "„I like reading, and I don't like listening to the radio.“ — iki cümle karşıt duruyor.",
      },
      {
        kind: "truefalse",
        text: "The writer is going to be late on Friday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I am not going to be late!“ — gelecek olumsuzu „not“ „am“den sonra.",
      },
      {
        kind: "gapfill",
        text: "The writer has a meeting on ___.",
        options: [],
        answer: 0,
        accept: ["Friday"],
        explain: "„I have a meeting on Friday with a new group.“ — gün adından önce „on“.",
      },
      {
        kind: "short_answer",
        text: "Where does the writer eat at lunch?",
        options: [],
        answer: 0,
        accept: ["in the café", "the café", "near the office"],
        explain: "„At lunch I eat with my friends in the café near the office.“",
      },
    ],
  },
  {
    id: "en-a1-u10-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 10,
    title: "What time do you open?",
    genre: "phone",
    intro: "Bir dükkânın saatleri soruluyor. Açılış, kapanış, otobüs — hepsi ayrı saatte.",
    gloss: [
      { de: "the same", tr: "aynı" },
      { de: "problem", tr: "sorun" },
      { de: "closed", tr: "kapalı" },
    ],
    minutes: 4,
    text:
      "Ela: Good morning. What time do you open?\n" +
      "Shop: We open at nine and we close at seven.\n" +
      "Ela: And on Sunday?\n" +
      "Shop: On Sunday we are closed.\n" +
      "Ela: Is the office in the same building?\n" +
      "Shop: Yes, it is. The office opens early, at eight.\n" +
      "Ela: I'd like to come tomorrow. Is that a problem?\n" +
      "Shop: No. Tomorrow is Friday, we are open all day.\n" +
      "Ela: When does the bus leave from the city?\n" +
      "Shop: Every hour. The next bus leaves at ten.\n" +
      "Ela: Then I am going to take the bus at ten. Is my card ready?\n" +
      "Shop: Yes, your card is ready. Don't be late — we close at seven!",
    questions: [
      {
        text: "What time does the shop open?",
        options: ["at nine", "at seven", "at eight"],
        answer: 0,
        explain: "„We open at nine and we close at seven.“ — sekiz ofisin açılışı.",
      },
      {
        text: "When is the shop closed?",
        options: ["on Sunday", "on Friday", "at ten"],
        answer: 0,
        explain: "„On Sunday we are closed.“ — cuma açık, on otobüsün saati.",
      },
      {
        kind: "truefalse",
        text: "The office opens at nine.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The office opens early, at eight.“ — dokuz dükkânın açılışı.",
      },
      {
        kind: "gapfill",
        text: "The next bus leaves at ___.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„The next bus leaves at ten.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What time do you open?",
          "We open at nine.",
          "When does the bus leave from the city?",
          "The next bus leaves at ten.",
        ],
        explain: "Önce dükkânın saati sorulur ve söylenir, sonra otobüsünki. Aynı kalıp iki kez.",
      },
      {
        kind: "short_answer",
        text: "When is Ela going to come?",
        options: [],
        answer: 0,
        accept: ["tomorrow", "on Friday", "Friday"],
        explain: "„I'd like to come tomorrow… Tomorrow is Friday.“ — iki cevap da doğru.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u10-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 10,
    title: "Weekend plans",
    genre: "dialogue",
    intro: "İki kişi hafta sonu planını konuşuyor. Gelecek kalıbının üç biçimi de geçiyor.",
    gloss: [
      { de: "back", tr: "geri" },
      { de: "poor", tr: "zavallı" },
      { de: "car", tr: "araba" },
      { de: "nothing special", tr: "özel bir şey yok" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Kaan", text: "What are you going to do at the weekend?" },
      { speaker: "Sena", text: "I'm going to visit my parents. They live near the sea." },
      { speaker: "Kaan", text: "Nice! Are you going to stay there?" },
      { speaker: "Sena", text: "Yes, two days. On Sunday I'm going to travel back early." },
      { speaker: "Kaan", text: "And your brother?" },
      { speaker: "Sena", text: "He is not going to come. He has a meeting on Saturday." },
      { speaker: "Kaan", text: "On Saturday! Poor man." },
      { speaker: "Sena", text: "Yes. What is your plan?" },
      { speaker: "Kaan", text: "Nothing special. I'm going to read, watch a film and walk in the city." },
      { speaker: "Sena", text: "That is a good plan too." },
      { speaker: "Kaan", text: "Are you going to take the car?" },
      { speaker: "Sena", text: "No, I'm going to take the bus. It leaves at half past six." },
    ],
    questions: [
      {
        text: "What is Sena going to do at the weekend?",
        options: ["visit her parents", "work", "walk in the city"],
        answer: 0,
        explain: "„I'm going to visit my parents.“ — şehirde yürüyen Kaan.",
      },
      {
        text: "Why is Sena's brother not going to come?",
        options: ["he has a meeting", "he is ill", "he is at the sea"],
        answer: 0,
        explain: "„He is not going to come. He has a meeting on Saturday.“",
      },
      {
        kind: "truefalse",
        text: "Sena is going to take the car.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I'm going to take the bus.“ — soru arabayı soruyor, cevap otobüs diyor.",
      },
      {
        kind: "gapfill",
        text: "The bus leaves at half past ___.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„It leaves at half past six.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I'm going to visit my parents.", "I am going to visit my parents."],
        explain: "„I'm going to visit my parents.“ — gelecek üç parçalı: am + going to + fiil.",
      },
      {
        kind: "short_answer",
        text: "What is Kaan's plan?",
        options: [],
        answer: 0,
        accept: ["nothing special", "read and watch a film", "to walk in the city"],
        explain: "„Nothing special. I'm going to read, watch a film and walk in the city.“",
      },
    ],
  },
  {
    id: "en-a1-u10-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 10,
    title: "After work",
    genre: "monologue",
    intro: "Ali iş sonrasını anlatıyor. Neyi seviyor, neyi sevmiyor?",
    gloss: [
      { de: "park", tr: "park" },
      { de: "listen to", tr: "dinlemek" },
      { de: "free", tr: "boş" },
      { de: "radio", tr: "radyo" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ali", text: "I start work at eight and I finish at four. After work I am free." },
      { speaker: "Ali", text: "I don't like watching television. I prefer reading or walking." },
      { speaker: "Ali", text: "On Monday and Wednesday I walk in the park near my office." },
      { speaker: "Ali", text: "In the afternoon I sometimes listen to music on the radio." },
      { speaker: "Ali", text: "On Friday I meet my friends. We watch a film together." },
      { speaker: "Ali", text: "At the weekend I am going to travel. I'm going to stay at the sea for two days." },
    ],
    questions: [
      {
        text: "What does Ali not like?",
        options: ["watching television", "reading", "walking"],
        answer: 0,
        explain: "„I don't like watching television. I prefer reading or walking.“",
      },
      {
        text: "When does Ali meet his friends?",
        options: ["on Friday", "on Monday", "at the weekend"],
        answer: 0,
        explain: "„On Friday I meet my friends.“ — pazartesi parkta yürüyor.",
      },
      {
        kind: "truefalse",
        text: "Ali finishes work at five.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I start work at eight and I finish at four.“",
      },
      {
        kind: "gapfill",
        text: "Ali walks in the ___ near his office.",
        options: [],
        answer: 0,
        accept: ["park"],
        explain: "„I walk in the park near my office.“",
      },
      {
        kind: "order",
        text: "Ali'nin anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I start work at eight.",
          "I don't like watching television.",
          "On Friday I meet my friends.",
          "At the weekend I am going to travel.",
        ],
        explain: "Önce iş, sonra sevdikleri, sonra cuma, en son hafta sonu planı.",
      },
      {
        kind: "short_answer",
        text: "What is Ali going to do at the weekend?",
        options: [],
        answer: 0,
        accept: ["travel", "stay at the sea", "he is going to travel"],
        explain: "„At the weekend I am going to travel.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u10-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 10,
    title: "I start work at eight",
    genre: "personal",
    intro: "İş gününü ve sevdiklerini yaz. „like“ sonrası fiil yine „-ing“ alıyor.",
    gloss: [
      { de: "I start work at …", tr: "saat …'de işe başlarım" },
      { de: "I have a meeting on …", tr: "… günü toplantım var" },
      { de: "I like reading.", tr: "okumayı seviyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Saat sekizde işe başlarım.",
        answer: "I start work at eight.",
        hint: "Saatte „at“. „work“ burada isim, önünde „the“ yok.",
      },
      {
        kind: "build",
        tr: "Cuma günü toplantım var.",
        answer: "I have a meeting on Friday.",
        hint: "Sahiplik „have“ ile, gün „on“ ile. Toplantının önünde „a“ gerekiyor.",
      },
      {
        kind: "build",
        tr: "Okumayı seviyorum.",
        answer: "I like reading.",
        hint: "„like“ sonrası fiil „-ing“ alır. Nesne olmadan da cümle tam.",
      },
      {
        kind: "build",
        tr: "Film izlemeyi sever misin?",
        answer: "Do you like watching films?",
        hint: "Soru „do“ ile; genel bir şeyden söz edildiği için çoğul: films.",
      },
      {
        kind: "form",
        prompt: "İş gününü doldur.",
        facts: "Sekizde başlar; öğlen ofiste yemek; öğleden sonra toplantı; beşte biter.",
        fields: [
          { label: "Start", answer: "eight", accept: ["at eight", "8"] },
          { label: "Lunch", answer: "office", accept: ["at the office", "in the office"] },
          { label: "Afternoon", answer: "meeting", accept: ["a meeting"] },
          { label: "Finish", answer: "five", accept: ["at five", "5"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u10-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 10,
    title: "I'm going to …",
    genre: "personal",
    intro: "Geleceği yaz. Üç parça var ve olumsuzu ile sorusu parçaları oynatarak kuruluyor.",
    gloss: [
      { de: "I'm going to …", tr: "… edeceğim" },
      { de: "Are you going to …?", tr: "… edecek misin" },
      { de: "I'm not going to …", tr: "… etmeyeceğim" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Annemi ziyaret edeceğim.",
        answer: "I'm going to visit my mother.",
        alternatives: ["I am going to visit my mother."],
        hint: "Üç parça: am + going to + fiil. Fiil hiç çekilmez.",
      },
      {
        kind: "build",
        tr: "Seyahat edecek misin?",
        answer: "Are you going to travel?",
        hint: "Soruda „be“ öne geçiyor: you are → are you. „going to“ yerinde kalıyor.",
      },
      {
        kind: "build",
        tr: "Kalmayacağım.",
        answer: "I'm not going to stay.",
        alternatives: ["I am not going to stay."],
        hint: "Olumsuzluk „not“ „am“den hemen sonra: am not going to.",
      },
      {
        kind: "build",
        tr: "Saat kaçta açıyorsunuz?",
        answer: "What time do you open?",
        hint: "„open“ burada fiil. Soru „do“ ile, çünkü „be“ değil.",
      },
      {
        kind: "build",
        tr: "Otobüs ne zaman kalkıyor?",
        answer: "When does the bus leave?",
        hint: "Üçüncü tekil kişide „do“ → „does“ ve fiil eksiz kalır: leave, leaves değil.",
      },
    ],
  },
];
