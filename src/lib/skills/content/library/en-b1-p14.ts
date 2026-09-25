import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 14.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 14 tanışma ve sohbet hattı: düğünde tanımadığın insanlarla konuşmak
 * üzerine bir dergi yazısı, çamaşırhanede iki yabancının sohbeti, dil
 * değişimi ilanına cevap. Dil bilgisi question tags — „değil mi?“ eki.
 */
export const enB1P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r14",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "You Don't Know Anyone Here Either, Do You?",
    genre: "article",
    intro: "Bir dergi yazısı: yalnız bir kişiyi tanıdığın bir düğünde sohbet nasıl başlar, hangi soru işe yarar.",
    gloss: [
      { de: "wedding", tr: "düğün" },
      { de: "to pretend", tr: "-mış gibi yapmak" },
      { de: "speech", tr: "konuşma" },
      { de: "clever", tr: "zekice" },
      { de: "invitation", tr: "davet" },
      { de: "couple", tr: "çift" },
      { de: "bride", tr: "gelin" },
      { de: "nervous", tr: "gergin" },
    ],
    minutes: 6,
    text:
      "Last summer I went to a wedding where I knew exactly one person, and she was busy getting " +
      "married. I spent the first hour holding a glass and pretending to read the menu. Then an " +
      "older man at my table said, “You don't know anyone here either, do you?” and the evening " +
      "changed.\n\n" +
      "Since then I have asked people who are good at conversation how they start one. " +
      "Their answers were surprisingly similar.\n\n" +
      "First, begin with something you can both see: the food, the music, the weather, the long " +
      "speech. “That was a long speech, wasn't it?” is not a clever sentence, but it isn't supposed " +
      "to be clever. It is an invitation, and it is easy to accept.\n\n" +
      "Second, ask a question that needs more than one word. “How do you know the couple?” works " +
      "better than “Are you a friend of the bride?”, because the answer is a story, not a yes " +
      "or a no.\n\n" +
      "Third, and this was the one I had never thought of: the other person is probably as " +
      "nervous as you are. Most people at a party are quietly waiting for someone else to " +
      "speak first.\n\n" +
      "The man at my table, by the way, turned out to be the bride's old math teacher. " +
      "We talked for two hours. I still don't know his first name.",
    questions: [
      {
        text: "What was the writer doing in the first hour?",
        options: [
          "dancing with the other guests",
          "pretending to read the menu",
          "helping the bride",
        ],
        answer: 1,
        explain: "„I spent the first hour holding a glass and pretending to read the menu.“",
      },
      {
        text: "Why does a sentence about the long speech work?",
        options: [
          "It is an easy invitation to talk.",
          "It is clever and funny.",
          "It shows that you know the couple.",
        ],
        answer: 0,
        explain: "Zekice olması gerekmiyor: „It is an invitation, and it is easy to accept.“",
      },
      {
        kind: "truefalse",
        text: "The writer says most people at a party are waiting for someone else to speak first.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Most people at a party are quietly waiting for someone else to speak first.“",
      },
      {
        kind: "gapfill",
        text: "The writer and the man talked for ___ hours.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„We talked for two hours.“",
      },
      {
        kind: "short_answer",
        text: "Who was the man at the table?",
        options: [],
        answer: 0,
        accept: ["the bride's old math teacher", "the bride's math teacher", "her old teacher", "her old math teacher", "the bride's old teacher"],
        explain: "„turned out to be the bride's old math teacher“.",
      },
      {
        text: "Which question does the writer recommend?",
        options: [
          "Are you a friend of the bride?",
          "Do you like weddings?",
          "How do you know the couple?",
        ],
        answer: 2,
        explain: "Cevabı evet ya da hayır değil, bir hikâye olan soru öneriliyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l14",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Sunday at the Launderette",
    genre: "dialogue",
    intro: "Çamaşırhanede iki yabancı sohbet ediyor: yeni taşınan kadın ne öğreniyor, sohbet nasıl ilerliyor.",
    gloss: [
      { de: "launderette", tr: "çamaşırhane" },
      { de: "washing machine", tr: "çamaşır makinesi" },
      { de: "to move in", tr: "taşınmak" },
      { de: "quiet", tr: "sessiz" },
      { de: "nearby", tr: "yakınlarda" },
      { de: "dryer", tr: "kurutma makinesi" },
      { de: "properly", tr: "iyice" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ruth", text: "Sorry, is this machine free? It's the only one that works, isn't it?" },
      { speaker: "Ken", text: "Go ahead, I've just finished. You're new around here, aren't you? I haven't seen you before." },
      { speaker: "Ruth", text: "I moved in two weeks ago, above the bakery. My washing machine hasn't arrived yet. The shop says Thursday, but they said that last week too." },
      { speaker: "Ken", text: "They always do. You'll be here a few more Sundays, then. It isn't too bad. The café next door does good coffee, and the machines take cards now." },
      { speaker: "Ruth", text: "That's useful. You don't know if there's a library nearby, do you? I need somewhere quiet to work in the mornings." },
      { speaker: "Ken", text: "There's one on Park Road, ten minutes' walk. It's closed on Mondays, though. My daughter studies there most days." },
      { speaker: "Ruth", text: "She's at university, then, isn't she?" },
      { speaker: "Ken", text: "Second year, engineering. She says the library is the only place in town without her two little brothers in it." },
      { speaker: "Ruth", text: "Great. And the dryers take about forty minutes, don't they?" },
      { speaker: "Ken", text: "Fifty if you want things properly dry. I'm Ken, by the way." },
      { speaker: "Ruth", text: "Ruth. Thanks, Ken. You've saved me a whole morning of searching." },
    ],
    questions: [
      {
        text: "Why is Ruth at the launderette?",
        options: [
          "Her washing machine hasn't arrived.",
          "Her machine is broken.",
          "She likes the café next door.",
        ],
        answer: 0,
        explain: "„My washing machine hasn't arrived yet.“ — dükkân perşembe diyor.",
      },
      {
        text: "Where does Ruth live?",
        options: ["next to the library", "on Park Road", "above the bakery"],
        answer: 2,
        explain: "„I moved in two weeks ago, above the bakery.“",
      },
      {
        kind: "truefalse",
        text: "The library on Park Road is closed on Mondays.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It's closed on Mondays, though.“",
      },
      {
        kind: "gapfill",
        text: "The dryers take about ___ minutes if you want things properly dry.",
        options: [],
        answer: 0,
        accept: ["fifty", "50"],
        explain: "Ruth kırk dakika sanıyor; Ken „Fifty“ diyor.",
      },
      {
        kind: "short_answer",
        text: "What does Ruth need in the mornings?",
        options: [],
        answer: 0,
        accept: ["somewhere quiet to work", "a quiet place to work", "a quiet place"],
        explain: "„I need somewhere quiet to work in the mornings.“",
      },
      {
        text: "How does Ruth feel at the end?",
        options: ["worried about Thursday", "grateful for the help", "annoyed with the shop"],
        answer: 1,
        explain: "Ken'e teşekkür ediyor: bütün bir sabahlık aramadan kurtulmuş.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w14",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Looking for a Language Partner",
    genre: "email",
    intro: "Bir dil değişimi ilanına cevap yazıyorsun: önce iki cümle kur, sonra kendini tanıtan ve somut öneri veren bir e-posta yaz.",
    gloss: [
      { de: "language exchange", tr: "dil değişimi" },
      { de: "post", tr: "ilan" },
      { de: "nervous", tr: "gergin" },
      { de: "shift", tr: "vardiya" },
      { de: "to suit", tr: "uymak" },
      { de: "ending", tr: "ek" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Geçen yıl Türkiye'yi iki kez ziyaret ettin, değil mi?",
        answer: "You visited Turkey twice last year, didn't you?",
        alternatives: ["Last year you visited Turkey twice, didn't you?"],
        hint: "Yardımcı fiil yok, past simple: olumlu cümleye olumsuz ek „didn't you?“ gelir.",
      },
      {
        kind: "build",
        tr: "Hafta sonları buluşamazsın, değil mi?",
        answer: "You can't meet on weekends, can you?",
        alternatives: ["On weekends you can't meet, can you?"],
        hint: "Olumsuz cümleye olumlu soru eki gelir ve aynı yardımcı fiil tekrarlanır: can't → can you?",
      },
      {
        kind: "free",
        prompt:
          "Bir dil değişimi ilanına cevap yazıyorsun: Manchester'da yaşayan Emily senin ana dilini öğrenmek istiyor ve karşılığında İngilizce pratik teklif ediyor. Kendini tanıt, neden İngilizce çalıştığını söyle, ne zaman ve nasıl buluşabileceğinizi öner, ilandaki bir bilgiyi soru ekiyle teyit et ve bir soruyla bitir.",
        checklist: [
          "Kendini kısaca tanıt",
          "Neden İngilizce çalıştığını söyle",
          "Buluşma zamanı ve biçimi öner",
          "Bir bilgiyi soru ekiyle teyit et ve bir soruyla bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "I saw your post on …", tr: "…'daki ilanını gördüm", en: "" },
          { de: "The reason I'm learning English is …", tr: "İngilizce öğrenme sebebim …", en: "" },
          { de: "Would it suit you to …?", tr: "… sana uyar mı?", en: "" },
          { de: "You said …, didn't you?", tr: "… demiştin, değil mi?", en: "" },
          { de: "Let me know what you think.", tr: "Ne düşündüğünü yaz.", en: "" },
        ],
        sample:
          "Hi Emily, I saw your post on the language exchange website, and I'd like to be your " +
          "partner. My name is Burak, I'm twenty-nine and I work as a nurse in Izmir. " +
          "The reason I'm learning English is simple: our hospital is starting a project with " +
          "a clinic in Leeds next year, and I'll have to speak on video calls every week. I can " +
          "read quite well, but speaking still makes me nervous. " +
          "Would it suit you to meet online twice a week, for an hour each time? We could speak " +
          "English for thirty minutes and Turkish for thirty. I work early shifts, so evenings " +
          "after seven are best for me. " +
          "You said you had visited Turkey twice, didn't you? I'd love to know which cities you saw. " +
          "I can also help with grammar, because Turkish endings confuse everyone at first. " +
          "Let me know what you think, and tell me what time it is in Manchester when it's seven " +
          "here! Burak",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s14",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Is Small Talk a Waste of Time?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: küçük bir alışkanlığın değerini bir anıyla tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Hava ya da trafik üzerine kısa sohbetler vakit kaybı mı? Görüşünü söyle, küçük bir sohbetin işe yaradığı bir anı anlat, küçük sohbeti sevmeyenleri anla ve bir öneride bulun.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Küçük bir sohbetin işe yaradığı bir anı anlat",
        "Küçük sohbeti sevmeyenleri anla",
        "Bir öneride bulun",
      ],
      targets: [
        { de: "People call it a waste of time, but …", tr: "İnsanlar buna vakit kaybı diyor ama …" },
        { de: "I realized this when …", tr: "Bunu … olduğunda anladım" },
        { de: "To be fair, some people find it …", tr: "Hakkını vermek gerekirse bazıları bunu … buluyor" },
        { de: "My suggestion would be …", tr: "Önerim … olurdu" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "People call it a waste of time, but I think small talk is how bigger conversations are " +
        "allowed to start. Nobody walks up to a stranger and asks about their childhood. You say " +
        "the queue is long, isn't it, and the other person decides whether they want to talk. " +
        "I realized this when I started a new job last year. For two weeks I only said hello to " +
        "the man at the next desk. Then one Monday we both complained about the rain, and ten " +
        "minutes later I found out he had grown up in the same small town as my grandparents. " +
        "Now he's the colleague I trust most. " +
        "To be fair, some people find it exhausting, especially people who are shy or who are " +
        "tired after a long day, and I don't think anyone should be pushed into it. " +
        "My suggestion would be to keep it short and honest: one comment, one question, and if " +
        "the answer is a single word, leave the person in peace.",
      rubricHint:
        "Görüş, somut bir anı, karşı tarafı anlama ve bir öneri beklenir; „I realized this when“, „to be fair“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g14",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "It's cold, isn't it?",
    genre: "grammar",
    intro: "Türkçedeki „değil mi?“ İngilizcede tek bir kalıp değildir: ek, cümlenin yardımcı fiilinden kurulur ve her cümlede değişir.",
    focus: "Question tags: isn't it? / don't you? — onay isteyen soru ekleri",
    gloss: [
      { de: "lovely", tr: "güzel" },
      { de: "to lock", tr: "kilitlemek" },
      { de: "to swim", tr: "yüzmek" },
      { de: "window", tr: "pencere" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Olumlu cümle, olumsuz ek",
        tr: "Soru eki cümlenin yardımcı fiilini (be, have, can, will…) tekrar eder ve özneyi zamirle söyler. Cümle olumluysa ek olumsuz, cümle olumsuzsa ek olumlu olur: „You're tired, aren't you?“ ama „You aren't tired, are you?“",
        examples: [
          { de: "It's cold today, isn't it?", tr: "Bugün hava soğuk, değil mi?", note: "is → isn't it" },
          { de: "You can swim, can't you?", tr: "Yüzebiliyorsun, değil mi?", note: "can → can't" },
          { de: "They haven't left, have they?", tr: "Gitmediler, değil mi?", note: "olumsuz → olumlu ek" },
        ],
      },
      {
        heading: "Yardımcı fiil yoksa do / does / did",
        tr: "Present simple ve past simple cümlelerinde görünür bir yardımcı fiil yoktur; ek „do, does, did“ ile kurulur. Özne bir isimse ekte zamire döner: „The film starts at eight, doesn't it?“",
        examples: [
          { de: "You live near here, don't you?", tr: "Buralarda oturuyorsun, değil mi?", note: "present → don't" },
          { de: "Your sister works at the hospital, doesn't she?", tr: "Kız kardeşin hastanede çalışıyor, değil mi?", note: "isim → she" },
          { de: "They called you yesterday, didn't they?", tr: "Dün seni aradılar, değil mi?", note: "past → didn't" },
        ],
      },
      {
        heading: "Üç özel durum",
        tr: "„I am“ cümlesinin eki „aren't I?“ olur. Emir cümlesine „will you?“, „Let's“ ile başlayan öneriye „shall we?“ eklenir. Ekte ses alçalırsa konuşan onay bekler, yükselirse gerçekten soruyordur.",
        examples: [
          { de: "I'm late, aren't I?", tr: "Geç kaldım, değil mi?", note: "I am → aren't I" },
          { de: "Close the window, will you?", tr: "Pencereyi kapatır mısın?", note: "emir → will you" },
          { de: "Let's start, shall we?", tr: "Başlayalım mı?", note: "Let's → shall we" },
        ],
      },
    ],
    questions: [
      {
        text: "You're from Glasgow, ___?",
        options: ["don't you", "isn't it", "aren't you"],
        answer: 2,
        explain: "Cümlede „are“ var ve olumlu: ek „aren't you?“ olur.",
      },
      {
        text: "She doesn't eat meat, ___?",
        options: ["doesn't she", "does she", "is she"],
        answer: 1,
        explain: "Olumsuz cümleye olumlu ek: „does she?“",
      },
      {
        text: "I'm next in line, ___?",
        options: ["aren't I", "isn't I", "don't I"],
        answer: 0,
        explain: "„I am“ cümlesinin eki istisnadır: „aren't I?“",
      },
      {
        kind: "gapfill",
        text: "It's a lovely day, ___ it?",
        options: [],
        answer: 0,
        accept: ["isn't", "is not"],
        explain: "Olumlu „is“ → olumsuz ek „isn't it?“",
      },
      {
        kind: "gapfill",
        text: "You didn't lock the door, ___ you?",
        options: [],
        answer: 0,
        accept: ["did"],
        explain: "Olumsuz past simple → olumlu ek „did you?“",
      },
      {
        kind: "gapfill",
        text: "They've got two children, ___ they?",
        options: [],
        answer: 0,
        accept: ["haven't", "have not"],
        explain: "„have got“ yardımcı fiili „have“: ek „haven't they?“",
      },
      {
        kind: "gapfill",
        text: "Let's take a taxi, ___ we?",
        options: [],
        answer: 0,
        accept: ["shall"],
        explain: "„Let's“ ile başlayan öneriye „shall we?“ eklenir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["You work", "at the library,", "don't", "you?"],
        explain: "Present simple olumlu cümle → „don't you?“",
      },
      {
        kind: "truefalse",
        text: "„He can drive, can't he?“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Olumlu „can“ → olumsuz ek „can't he?“",
      },
      {
        kind: "truefalse",
        text: "„You live near here, aren't you?“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Yardımcı fiil yok, present simple: „You live near here, don't you?“",
      },
    ],
  },
];
