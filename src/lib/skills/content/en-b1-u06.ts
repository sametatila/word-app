import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 6 — "Sebep-sonuç, zaman cümleleri, amaç, koşul".
 *
 * Dört ders: Reason and result · When I arrive · Why I signed up · Only if.
 *
 *   Kelime: because, so, since, therefore, reason, cause, result, explain,
 *           until, meanwhile, arrive, depart, board, schedule, track,
 *           journey, purpose, aim, course, enroll, practice, useful, goal,
 *           certificate, unless, agreement, promise, accept, refuse, deal,
 *           keep, risk.
 *   Kalıp:  I was late because the train stopped. ·
 *           The train stopped, so I was late. ·
 *           Since the train stopped, I was late. ·
 *           When I arrive, I will call you. ·
 *           I will wait until the train departs. ·
 *           The train is departing at ten. ·
 *           I enrolled to practice my English. ·
 *           I enrolled in order to get a certificate. ·
 *           I sit in front so that I can hear better. ·
 *           I will accept unless the price changes. ·
 *           I will sign as long as you keep the promise. ·
 *           Take a copy in case they ask.
 *
 * Ünitenin tek öğretme noktası ZAMAN VE KOŞUL YAN CÜMLESİNDE GELECEĞİN
 * ŞİMDİKİ ZAMANLA KURULMASI: „When I arrive, I will call you.“ „when“,
 * „until“, „unless“, „as long as“, „in case“ sonrasında „will“ yok — ama
 * ana cümlede var. İngilizce burada ASİMETRİK: yan cümle şimdiki zaman,
 * ana cümle gelecek. Öğrencinin hatası iki yönlü çıkıyor: ya yan cümleye
 * „will“ koyuyor ya da ana cümleden düşürüyor.
 */
export const enB1U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u6-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 6,
    title: "The real reason",
    genre: "blog",
    intro: "Kursa neden kaydolunmuş? Kısa cevap gerçek cevap değil.",
    gloss: [
      { de: "land", tr: "yerini bulmak" },
      { de: "clapped", tr: "alkışladı" },
      { de: "confidence", tr: "özgüven" },
      { de: "real", tr: "gerçek" },
      { de: "except", tr: "dışında" },
      { de: "by itself", tr: "tek başına" },
      { de: "enroll", tr: "kaydolmak" },
    ],
    minutes: 7,
    text:
      "I enrolled to practice my English. That is the short answer and it is not the real one.\n" +
      "The real one is that I had been in this country for four years and I could do everything except the thing I wanted most: say something at the end of a meeting and have it land.\n" +
      "I enrolled in order to get a certificate, too. That was the line I used at work, because a course with a certificate is a budget line and a course for confidence is not. Both reasons were true. Only one of them could be said out loud.\n" +
      "I sit in front so that I can hear better, which everybody thinks is about the teacher. It is not. It is so that I cannot see how many people are behind me.\n" +
      "The aim I wrote on the first day was: speak for two minutes without stopping. In April I did it, badly, about trains. Nobody clapped and the teacher said one word: again. So I did it again.\n" +
      "When I finish this course, I will start the next one. Not because the certificate is worth anything by itself — because the room is.",
    questions: [
      {
        text: "What is the real reason for the course?",
        options: ["to be heard in a meeting", "to get a certificate", "to meet the teacher"],
        answer: 0,
        explain: "„…say something at the end of a meeting and have it land.“",
      },
      {
        text: "Why does the writer sit in front?",
        options: ["not to see the people behind", "to talk to the teacher", "to hear the trains"],
        answer: 0,
        explain: "„It is so that I cannot see how many people are behind me.“",
      },
      {
        kind: "truefalse",
        text: "Both reasons were true.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Both reasons were true. Only one of them could be said out loud.“",
      },
      {
        kind: "gapfill",
        text: "The aim was to speak for ___ minutes without stopping.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„The aim I wrote on the first day was: speak for two minutes without stopping.“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I enrolled to practice my English.",
          "I enrolled in order to get a certificate.",
          "I sit in front so that I can hear better.",
          "When I finish this course, I will start the next one.",
        ],
        explain: "Kısa cevap, iş için söylenen cevap, sınıftaki alışkanlık, gelecek.",
      },
      {
        kind: "short_answer",
        text: "What did the teacher say in April?",
        options: [],
        answer: 0,
        accept: ["again", "one word", "the word again"],
        explain: "„Nobody clapped and the teacher said one word: again.“",
      },
    ],
  },
  {
    id: "en-b1-u6-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 6,
    title: "Late because of the storm",
    genre: "email",
    intro: "Toplantıyı kaçıran bir çalışanın e-postası. Tren neden durdu, sonucu ne oldu?",
    gloss: [
      { de: "a storm", tr: "fırtına" },
      { de: "the short version", tr: "kısacası" },
    ],
    minutes: 7,
    text:
      "Subject: Why I missed this morning's meeting\n" +
      "Hi Laura,\n" +
      "I am sorry I missed the team meeting this morning. I want to explain what happened, because the short version sounds worse than it was. The reason I am writing instead of calling is that you are in meetings all day.\n" +
      "I left home at seven, so I had forty minutes to spare. Since the line to the city is often slow on Mondays, I always take the early train. This time it did not help. The train stopped for an hour outside Hilltown because a tree had fallen on the track, and nobody could get off.\n" +
      "The cause was the storm last night, so it was not only my train. Half of the team was late too. Therefore, only two of the six points on the agenda were discussed, and the other four were moved to Wednesday.\n" +
      "Unfortunately, my point was one of the two. Since I was not there, the new summer schedule was presented without me, and I hear it was not accepted. The result is that we need to start again.\n" +
      "Could we talk before Wednesday? I will bring the numbers, so we can decide in ten minutes.\n" +
      "Best,\n" +
      "Katie",
    questions: [
      {
        text: "Why did the train stop?",
        options: ["A tree had fallen on the track.", "The driver was sick.", "The station was closed."],
        answer: 0,
        explain: "„The train stopped for an hour outside Hilltown because a tree had fallen on the track…“",
      },
      {
        text: "Why does Katie always take the early train?",
        options: ["The line is often slow on Mondays.", "It is cheaper.", "Her meeting starts at seven."],
        answer: 0,
        explain: "„Since the line to the city is often slow on Mondays, I always take the early train.“",
      },
      {
        kind: "truefalse",
        text: "All six points on the agenda were discussed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Therefore, only two of the six points on the agenda were discussed…“",
      },
      {
        kind: "gapfill",
        text: "The cause was the ___ last night.",
        options: [],
        answer: 0,
        accept: ["storm"],
        explain: "„The cause was the storm last night, so it was not only my train.“",
      },
      {
        kind: "short_answer",
        text: "What will Katie bring to the talk?",
        options: [],
        answer: 0,
        accept: ["the numbers", "numbers"],
        explain: "„I will bring the numbers, so we can decide in ten minutes.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u6-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 6,
    title: "Last minutes at the station",
    genre: "dialogue",
    intro: "İstasyonda son dakikalar. Hangi cümlede „will“ var, hangisinde yok?",
    gloss: [
      { de: "Text me", tr: "mesaj at" },
      { de: "one change", tr: "bir aktarma" },
      { de: "the board", tr: "pano" },
      { de: "the real reason", tr: "asıl sebep" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Katie", text: "What time does your train depart?" },
      { speaker: "Tyler", text: "Ten past seven from track four. The schedule says four, but it is always three." },
      { speaker: "Katie", text: "Then go to three and read the board again." },
      { speaker: "Tyler", text: "When I arrive, I will call you." },
      { speaker: "Katie", text: "Call when you are on the train, not when you arrive. I will be in bed at midnight." },
      { speaker: "Tyler", text: "Fine. And you will wait until I board?" },
      { speaker: "Katie", text: "I will wait until the train departs. That is different and you know it." },
      { speaker: "Tyler", text: "Meanwhile you can eat something." },
      { speaker: "Katie", text: "Meanwhile I will move the car, which is the real reason I am here." },
      { speaker: "Tyler", text: "The journey is six hours." },
      { speaker: "Katie", text: "Six hours and one change. Take a photo of the track number when you change, so that you can find the way back." },
      { speaker: "Tyler", text: "Nothing will go wrong." },
      { speaker: "Katie", text: "Take the photo in case it does. It costs one second." },
      { speaker: "Tyler", text: "The train is departing in ten minutes. I have to go." },
      { speaker: "Katie", text: "Go. Text me from the seat, not from the door." },
    ],
    questions: [
      {
        text: "Which track will the train really leave from?",
        options: ["three", "four", "ten"],
        answer: 0,
        explain: "„The schedule says four, but it is always three.“",
      },
      {
        text: "Until when will Katie wait?",
        options: ["until the train departs", "until Tyler boards", "until midnight"],
        answer: 0,
        explain: "„I will wait until the train departs. That is different and you know it.“",
      },
      {
        kind: "truefalse",
        text: "Katie wants the call while Tyler is on the train.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Call when you are on the train, not when you arrive.“",
      },
      {
        kind: "gapfill",
        text: "The journey is six hours and ___ change.",
        options: [],
        answer: 0,
        accept: ["one", "1"],
        explain: "„Six hours and one change.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["When I arrive, I will call you.", "When I arrive, I will call you"],
        explain: "Yan cümlede şimdiki zaman, ana cümlede „will“ — İngilizce burada asimetrik.",
      },
      {
        kind: "short_answer",
        text: "Why should Tyler photograph the track number?",
        options: [],
        answer: 0,
        accept: ["in case it goes wrong", "to find the way back", "in case"],
        explain: "„Take the photo in case it does. It costs one second.“",
      },
    ],
  },
  {
    id: "en-b1-u6-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 6,
    title: "A new line in the contract",
    genre: "dialogue",
    intro: "Sözleşmeye tek satır eklenmiş. Cevap nasıl yazılıyor?",
    gloss: [
      { de: "materials", tr: "malzeme" },
      { de: "by more than", tr: "-den fazla" },
      { de: "a hope", tr: "temenni" },
      { de: "add", tr: "eklemek" },
      { de: "sentence", tr: "cümle" },
      { de: "instead of", tr: "yerine" },
      { de: "the real risk", tr: "asıl risk" },
      { de: "strict", tr: "katı" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ellie", text: "They sent the contract. Same price, one new line at the end." },
      { speaker: "Henry", text: "Read the new line." },
      { speaker: "Ellie", text: "The price can change if the cost of materials changes." },
      { speaker: "Henry", text: "That is not a contract, that is a hope." },
      { speaker: "Ellie", text: "I will accept unless the price changes. That is what I want to write back." },
      { speaker: "Henry", text: "Then write exactly that. And add a number: unless it changes by more than three in a hundred." },
      { speaker: "Ellie", text: "Isn't that too strict?" },
      { speaker: "Henry", text: "It is the normal sentence. Without a number, „changes“ can mean anything." },
      { speaker: "Ellie", text: "I will sign as long as you keep the promise about the date. That is the other half." },
      { speaker: "Henry", text: "Put the date in the same line as the price. Two promises in two places is one promise." },
      { speaker: "Ellie", text: "And if they refuse?" },
      { speaker: "Henry", text: "Then you know something today instead of in March." },
      { speaker: "Ellie", text: "Take a copy in case they ask, you always say." },
      { speaker: "Henry", text: "Take a copy in case they say they never got it. That is the real risk, and it has happened to me twice." },
    ],
    questions: [
      {
        text: "What does Henry want Ellie to add?",
        options: ["a number", "a new date", "a second contract"],
        answer: 0,
        explain: "„And add a number: unless it changes by more than three in a hundred.“",
      },
      {
        text: "Where should the date go?",
        options: ["in the same line as the price", "at the end", "in a second email"],
        answer: 0,
        explain: "„Put the date in the same line as the price. Two promises in two places is one promise.“",
      },
      {
        kind: "truefalse",
        text: "Henry thinks the new line is a real contract.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is not a contract, that is a hope.“",
      },
      {
        kind: "gapfill",
        text: "Henry suggests three in a ___.",
        options: [],
        answer: 0,
        accept: ["hundred", "100"],
        explain: "„unless it changes by more than three in a hundred.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I will accept unless the price changes.", "I will accept unless the price changes"],
        explain: "„unless“ sonrası şimdiki zaman; „will change“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "What is the real risk for Henry?",
        options: [],
        answer: 0,
        accept: ["they never got it", "a lost copy", "no copy"],
        explain: "„Take a copy in case they say they never got it. That is the real risk…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u6-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 6,
    title: "The train journey",
    genre: "personal",
    intro: "Yan cümlede gelecek nasıl kuruluyor? Dört bağlaç, tek kural.",
    gloss: [
      { de: "When I arrive", tr: "vardığımda" },
      { de: "until", tr: "-e kadar" },
      { de: "unless", tr: "-medikçe" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Vardığımda seni arayacağım.",
        answer: "When I arrive, I will call you.",
        hint: "Zaman yan cümlesinde gelecek ŞİMDİKİ zamanla kuruluyor; „will“ ana cümlede kalıyor.",
      },
      {
        kind: "build",
        tr: "Tren kalkana kadar bekleyeceğim.",
        answer: "I will wait until the train departs.",
        hint: "„until“ sonrası da şimdiki zaman; „until it will depart“ olmaz.",
      },
      {
        kind: "build",
        tr: "Fiyat değişmedikçe kabul edeceğim.",
        answer: "I will accept unless the price changes.",
        hint: "„unless“ „eğer … değilse“ demek ve yine şimdiki zaman alıyor.",
      },
      {
        kind: "build",
        tr: "Sözü tuttuğun sürece imzalayacağım.",
        answer: "I will sign as long as you keep the promise.",
        hint: "„as long as“ da aynı kurala giriyor: yan cümlede „will“ yok.",
      },
      {
        kind: "form",
        prompt: "Yolculuk kartını doldur.",
        facts: "Tren yedi onda; peron dört yazıyor ama üç; yolculuk altı saat; bir aktarma var.",
        fields: [
          { label: "Departure", answer: "ten past seven", accept: ["7:10"] },
          { label: "Track", answer: "three", accept: ["3"] },
          { label: "Journey", answer: "six hours", accept: ["6 hours"] },
          { label: "Changes", answer: "one", accept: ["1"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u6-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 6,
    title: "A late train and a course",
    genre: "info",
    intro: "Sebep, sonuç ve amaç. Hangi sözcük nereye konabiliyor?",
    gloss: [
      { de: "because", tr: "çünkü" },
      { de: "so", tr: "bu yüzden" },
      { de: "in order to", tr: "için" },
      { de: "enroll", tr: "kaydolmak" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Tren durduğu için geç kaldım.",
        answer: "I was late because the train stopped.",
        hint: "„because“ sebebi getiriyor ve cümlenin başında da durabiliyor.",
      },
      {
        kind: "build",
        tr: "Tren durdu, bu yüzden geç kaldım.",
        answer: "The train stopped, so I was late.",
        hint: "„so“ sonucu getiriyor ve sebepten SONRA geliyor; „because“ gibi cümlenin başına alınamıyor.",
      },
      {
        kind: "build",
        tr: "İngilizcemi pratik etmek için kaydoldum.",
        answer: "I enrolled to practice my English.",
        hint: "Amaç sade mastarla kuruluyor; amaç için „for practicing“ denmiyor.",
      },
      {
        kind: "build",
        tr: "Sertifika almak için kaydoldum.",
        answer: "I enrolled in order to get a certificate.",
        hint: "„in order to“ aynı amacı daha resmî söylüyor.",
      },
      {
        kind: "build",
        tr: "Daha iyi duyabilmek için önde oturuyorum.",
        answer: "I sit in front so that I can hear better.",
        hint: "Amaçta bir kip varsa („can“) mastar yetmiyor, „so that“ gerekiyor.",
      },
    ],
  },
];
