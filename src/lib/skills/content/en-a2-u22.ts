import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 22 — "Bilgisayar sorunu, faydalı uygulamalar, parolalar, görüntülü arama".
 *
 * Dört ders: A computer problem · Useful apps · Passwords and safety ·
 * A video call.
 *
 *   Kelime: work, slow, restart, file, save, laptop, mouse, delete, app,
 *           download, install, useful, free, program, be useful, site,
 *           password, safe, private, secret, careful, safety, protect,
 *           personal, call, connection, hear, camera, again, connect,
 *           headphones, voice.
 *   Kalıp:  It doesn't work. · My computer is very slow. ·
 *           I've already restarted it. · I use this app to … ·
 *           It's for …-ing · I downloaded it to … ·
 *           You should change your password. ·
 *           You shouldn't share your password. ·
 *           Be careful with public wifi. · Can you hear me? ·
 *           Sorry, could you say that again? · Sorry, go ahead.
 *
 * Ünitenin tek öğretme noktası AMACIN İKİ BİÇİMİ: „I use this app TO
 * find a bus“ ve „It's FOR finding a bus“. İkisi de aynı amacı söylüyor
 * ama biri mastar, öteki „-ing“ alıyor ve seçim edatın varlığına bağlı.
 * Ünite 17 ile 20 „-ing“i ayrı ayrı göstermişti; burada mastarla yan yana
 * duruyor, çünkü ancak karşıtıyla birlikte görülünce kural oturuyor.
 */
export const enA2U22: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u22-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 22,
    title: "A computer problem",
    genre: "dialogue",
    intro: "Yavaşlayan bir dizüstü. Sorun nerede çıkıyor?",
    gloss: [
      { de: "disk", tr: "disk" },
      { de: "slowly", tr: "yavaşça" },
      { de: "look for", tr: "aramak" },
    ],
    minutes: 5,
    text:
      "Can: My laptop is very slow. It takes four minutes to open a file.\n" +
      "Deniz: Since when?\n" +
      "Can: Since Monday. I've already restarted it. Twice.\n" +
      "Deniz: And the mouse?\n" +
      "Can: The mouse works. Everything works. It just works slowly.\n" +
      "Deniz: How much is free on the disk?\n" +
      "Can: I don't know. Where do I look?\n" +
      "Deniz: Open the settings and look for the number. If it is under ten, that is the problem.\n" +
      "Can: Six.\n" +
      "Deniz: There it is. Delete the videos from last year. You have them on the phone too.\n" +
      "Can: And if I delete something I need?\n" +
      "Deniz: Then save it first. But nobody needs a video of a meeting from March.\n" +
      "Can: You are right. Twenty minutes and it is done.\n" +
      "Deniz: And next month the same. That is the only rule.",
    questions: [
      {
        text: "What is the problem with the laptop?",
        options: ["it is slow", "the mouse doesn't work", "it doesn't start"],
        answer: 0,
        explain: "„My laptop is very slow. It takes four minutes to open a file.“",
      },
      {
        text: "What should Can delete?",
        options: ["the videos from last year", "the files from March", "the settings"],
        answer: 0,
        explain: "„Delete the videos from last year. You have them on the phone too.“",
      },
      {
        kind: "truefalse",
        text: "Can has already restarted the laptop twice.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I've already restarted it. Twice.“",
      },
      {
        kind: "gapfill",
        text: "There are only ___ free on the disk.",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "„How much is free on the disk? … Six.“ — onun altı sorun demekti.",
      },
      {
        kind: "short_answer",
        text: "Where else does Can have the videos?",
        options: [],
        answer: 0,
        accept: ["on the phone", "the phone"],
        explain: "„You have them on the phone too.“",
      },
    ],
  },
  {
    id: "en-a2-u22-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 22,
    title: "Useful apps",
    genre: "blog",
    intro: "Üç uygulama ve silinen bir tanesi. Hangisi neye yarıyor?",
    gloss: [
      { de: "clever", tr: "akıllı" },
      { de: "stupid", tr: "basit" },
      { de: "the meaning", tr: "anlamı" },
      { de: "press", tr: "basmak" },
    ],
    minutes: 6,
    text:
      "Three apps I use every week, and one I deleted.\n" +
      "The first one is for finding a bus. I use this app to see when the next bus comes, not where it goes. Two seconds, no map, no account. Free.\n" +
      "The second is for words. I downloaded it to read the news in English and now I use it for everything. You press a word and the meaning comes. It costs nothing for the first month.\n" +
      "The third one is a list. Not a clever list — a stupid one. You write, you press, it is there. Every clever list app I installed was too slow to be useful.\n" +
      "And the one I deleted? A program for my photos. It was free, it was fast, and it wanted my address, my birthday and my phone number. For photos.\n" +
      "That is the question I ask now. Not what does it do — what does it want?",
    questions: [
      {
        text: "What is the first app for?",
        options: ["finding a bus", "reading the news", "making a list"],
        answer: 0,
        explain: "„The first one is for finding a bus.“",
      },
      {
        text: "Why did the writer delete one app?",
        options: ["it wanted personal information", "it was slow", "it cost money"],
        answer: 0,
        explain: "„It was free, it was fast, and it wanted my address, my birthday and my phone number. For photos.“",
      },
      {
        kind: "truefalse",
        text: "The word app costs nothing after the first month.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It costs nothing for the first month.“",
      },
      {
        kind: "gapfill",
        text: "The writer asks: what does it ___?",
        options: [],
        answer: 0,
        accept: ["want"],
        explain: "„Not what does it do — what does it want?“",
      },
      {
        kind: "order",
        text: "Uygulamaların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "an app for finding a bus",
          "an app for words",
          "a stupid list",
          "a program for photos",
        ],
        explain: "Üç kullanılan sırayla, en sonda silinen.",
      },
      {
        kind: "short_answer",
        text: "What is the new question?",
        options: [],
        answer: 0,
        accept: ["what does it want", "what it wants"],
        explain: "„Not what does it do — what does it want?“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u22-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 22,
    title: "Passwords and safety",
    genre: "dialogue",
    intro: "Parola tartışması. Hangi öğüt tutuyor?",
    gloss: [
      { de: "guesses", tr: "tahmin eder" },
      { de: "lemon", tr: "limon" },
      { de: "go together", tr: "birbirine uyar" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nil", text: "You should change your password." },
      { speaker: "Mert", text: "Why? Nobody knows it." },
      { speaker: "Nil", text: "I know it. You wrote it on the paper under the keyboard." },
      { speaker: "Mert", text: "That is a safe place." },
      { speaker: "Nil", text: "It is the first place. And the second is the name of your cat." },
      { speaker: "Mert", text: "The cat is private information." },
      { speaker: "Nil", text: "Your cat is on your account, with a name and a birthday." },
      { speaker: "Mert", text: "Fine. What do I take?" },
      { speaker: "Nil", text: "Three words that do not go together. Green bus lemon. Nobody guesses that and you remember it." },
      { speaker: "Mert", text: "And for every site?" },
      { speaker: "Nil", text: "A different one for the bank and the email. The rest can be the same." },
      { speaker: "Mert", text: "That is not what the article said." },
      { speaker: "Nil", text: "The article is right and nobody does it. Two good ones are better than fifteen you write down." },
      { speaker: "Mert", text: "And the public wifi?" },
      { speaker: "Nil", text: "Be careful with public wifi. Not for the news — for the bank." },
    ],
    questions: [
      {
        text: "Where is Mert's password?",
        options: ["on paper under the keyboard", "on the phone", "in the email"],
        answer: 0,
        explain: "„You wrote it on the paper under the keyboard.“",
      },
      {
        text: "What does Nil suggest?",
        options: ["three words that do not go together", "the name of the cat", "one password for everything"],
        answer: 0,
        explain: "„Three words that do not go together. Green bus lemon.“",
      },
      {
        kind: "truefalse",
        text: "Nil says the bank and the email need different passwords.",
        options: ["True", "False"],
        answer: 0,
        explain: "„A different one for the bank and the email. The rest can be the same.“",
      },
      {
        kind: "gapfill",
        text: "Be careful with public ___.",
        options: [],
        answer: 0,
        accept: ["wifi"],
        explain: "„Be careful with public wifi. Not for the news — for the bank.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You should change your password.", "You should change your password"],
        explain: "Öğüt „should“ ile; sonrası fiil eksiz.",
      },
      {
        kind: "short_answer",
        text: "What is public wifi not safe for?",
        options: [],
        answer: 0,
        accept: ["the bank", "banking", "bank"],
        explain: "„Not for the news — for the bank.“",
      },
    ],
  },
  {
    id: "en-a2-u22-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 22,
    title: "A video call",
    genre: "dialogue",
    intro: "Görüntülü aramanın ilk iki dakikası. Ne çalışmıyor?",
    gloss: [
      { de: "plant", tr: "bitki" },
      { de: "clear", tr: "net" },
      { de: "go ahead", tr: "buyur" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ela", text: "Can you hear me?" },
      { speaker: "Sena", text: "Now yes. Before that, nothing for ten seconds." },
      { speaker: "Ela", text: "The connection here is bad when it rains. Can you see me?" },
      { speaker: "Sena", text: "The camera is off." },
      { speaker: "Ela", text: "One moment… now?" },
      { speaker: "Sena", text: "Now yes. Green shirt, white wall, half a plant." },
      { speaker: "Ela", text: "That is my office. So — the report." },
      { speaker: "Sena", text: "Sorry, could you say that again? Somebody came in." },
      { speaker: "Ela", text: "The report for October. Is it ready?" },
      { speaker: "Sena", text: "Ready. I sent it —" },
      { speaker: "Ela", text: "Sorry, go ahead." },
      { speaker: "Sena", text: "No, you go ahead." },
      { speaker: "Ela", text: "We do this every week." },
      { speaker: "Sena", text: "Every week. One day we learn." },
      { speaker: "Ela", text: "I put on headphones now. Then my voice is clear and the room is quiet." },
      { speaker: "Sena", text: "Do that. And I close the window. The street is louder than both of us." },
    ],
    questions: [
      {
        text: "Why is the connection bad?",
        options: ["it rains", "the camera is off", "the street is loud"],
        answer: 0,
        explain: "„The connection here is bad when it rains.“",
      },
      {
        text: "What does Ela put on?",
        options: ["headphones", "a green shirt", "a plant"],
        answer: 0,
        explain: "„I put on headphones now. Then my voice is clear and the room is quiet.“",
      },
      {
        kind: "truefalse",
        text: "The report is not ready.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Ready. I sent it —“",
      },
      {
        kind: "gapfill",
        text: "Sena closes the ___.",
        options: [],
        answer: 0,
        accept: ["window"],
        explain: "„And I close the window. The street is louder than both of us.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Can you hear me?", "Can you hear me"],
        explain: "„hear“ istemsiz duymak demek; „listen“ dinlemek.",
      },
      {
        kind: "short_answer",
        text: "What does Sena not hear the first time?",
        options: [],
        answer: 0,
        accept: ["the report", "the report for October"],
        explain: "„Sorry, could you say that again? Somebody came in.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u22-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 22,
    title: "I use this app to …",
    genre: "personal",
    intro: "Aynı amaç, iki biçim. Mastar ne zaman, „-ing“ ne zaman?",
    gloss: [
      { de: "to see", tr: "görmek için" },
      { de: "for finding", tr: "bulmaya yarayan" },
      { de: "downloaded", tr: "indirdim" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Otobüsü görmek için bu uygulamayı kullanıyorum.",
        answer: "I use this app to see the bus.",
        hint: "Amaç „to“ + fiil ile geliyor; edat yok.",
      },
      {
        kind: "build",
        tr: "Otobüs bulmaya yarıyor.",
        answer: "It's for finding a bus.",
        alternatives: ["It is for finding a bus."],
        hint: "Aynı amaç, başka biçim: „for“ sonrası fiil „-ing“ alıyor.",
      },
      {
        kind: "build",
        tr: "Onu haberleri okumak için indirdim.",
        answer: "I downloaded it to read the news.",
        hint: "Yine „to“ + fiil; „for to read“ diye bir kuruluş yok.",
      },
      {
        kind: "build",
        tr: "Çalışmıyor.",
        answer: "It doesn't work.",
        alternatives: ["It does not work."],
        hint: "Alet için „work“ çalışmak demek; üçüncü tekilde „doesn't“.",
      },
      {
        kind: "form",
        prompt: "Arıza kartını doldur.",
        facts: "Dizüstü yavaş; pazartesiden beri; iki kez yeniden başlatıldı; diskte altı boş.",
        fields: [
          { label: "Problem", answer: "slow", accept: ["it is slow", "very slow"] },
          { label: "Since", answer: "Monday", accept: ["since Monday"] },
          { label: "Restarted", answer: "twice", accept: ["two times", "2"] },
          { label: "Free on disk", answer: "six", accept: ["6"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u22-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 22,
    title: "You should change your password",
    genre: "personal",
    intro: "Öğüt ve arama cümleleri. „should“ emir değil, tavsiye.",
    gloss: [
      { de: "share", tr: "paylaşmak" },
      { de: "careful with", tr: "dikkatli" },
      { de: "say that again", tr: "tekrar söylemek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Parolanı değiştirmelisin.",
        answer: "You should change your password.",
        hint: "Öğüt „should“ ile; sonrası fiil eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "Parolanı paylaşmamalısın.",
        answer: "You shouldn't share your password.",
        alternatives: ["You should not share your password."],
        hint: "Olumsuz öğüt „shouldn't“ ile; yasak değil, tavsiye.",
      },
      {
        kind: "build",
        tr: "Halka açık wifi konusunda dikkatli ol.",
        answer: "Be careful with public wifi.",
        hint: "„careful“ın edatı „with“; emir cümlesi „be“ ile başlıyor.",
      },
      {
        kind: "build",
        tr: "Beni duyabiliyor musun?",
        answer: "Can you hear me?",
        hint: "„hear“ istemsiz duymak; „listen“ ise dinlemek demek.",
      },
      {
        kind: "build",
        tr: "Pardon, tekrar söyleyebilir misiniz?",
        answer: "Sorry, could you say that again?",
        hint: "„again“ en sonda; „repeat“ ile de olurdu ama bu daha yumuşak.",
      },
    ],
  },
];
