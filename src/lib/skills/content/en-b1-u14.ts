import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 14 — "Öğrenme biçimi, ilerleme, hatalar, geri bildirim".
 *
 * Dört ders: How I learn best · How far I have come ·
 * Learning from mistakes · What the tutor said.
 *
 *   Kelime: memorize, repeat, visual, listen, notebook, method, habit,
 *           focus, level, fluent, confident, vocabulary, grammar,
 *           pronunciation, measure, gap, correction, forget, common,
 *           pattern, careless, understand, admit, check, feedback,
 *           encourage, comment, advise, remark, tutor, session, clear.
 *   Kalıp:  I enjoy listening to podcasts. ·
 *           I try to memorize ten words a day. ·
 *           I am used to writing in a notebook. ·
 *           My vocabulary has grown a lot. · I started at a lower level. ·
 *           How long have you studied English? ·
 *           I had learned it wrong at the start. ·
 *           Then the correction helped me. ·
 *           By the time I noticed, I had repeated it often. ·
 *           She said that my comment had helped. ·
 *           She told me to advise the others. ·
 *           She asked if I had understood the feedback.
 *
 * Ünitenin tek öğretme noktası „USED TO DO“ İLE „BE USED TO DOING“
 * AYRIMI. Birincisi geçmişteki alışkanlık („I used to write in a
 * notebook“ — artık yazmıyorum), ikincisi alışkın olmak („I am used to
 * writing in a notebook“ — bana tuhaf gelmiyor). Aynı üç sözcük, iki ayrı
 * anlam, ve ayırt eden tek şey „be“ ile sondaki „-ing“. A2 ünite 2
 * birincisini öğretmişti; ikincisi burada geliyor ve ikisini yan yana
 * görmeden ayrım oturmuyor.
 */
export const enB1U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u14-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 14,
    title: "Podcasts, words and a notebook",
    genre: "blog",
    intro: "Bir öğrencinin işe yarayan üç yöntemi. Defter neden şaşırtıcı çıktı?",
    gloss: [
      { de: "podcasts", tr: "sesli yayınlar" },
      { de: "screen", tr: "ekran" },
      { de: "by hand", tr: "elle" },
      { de: "anyway", tr: "zaten" },
      { de: "whole", tr: "bütün" },
      { de: "argument", tr: "gerekçe" },
      { de: "childish", tr: "çocukça" },
      { de: "study time", tr: "ders çalışma zamanı" },
      { de: "type", tr: "klavyede yazmak" },
    ],
    minutes: 7,
    text:
      "Three things work for me and one of them surprised me.\n" +
      "I enjoy listening to podcasts. Twenty minutes on the bus, the same episode twice, and the second time I hear the words I missed. That is not study time; it is the time that was there anyway.\n" +
      "I try to memorize ten words a day. Ten, not fifty. I tried fifty in the first month and remembered eleven of them a week later, which is the whole argument.\n" +
      "I am used to writing in a notebook now. It did not feel normal in September. For three weeks it felt slow and childish, and my hand hurt after half a page.\n" +
      "I used to write everything on a screen. I used to type fast, copy whole lists and never look at them again. It was quick, and that was the problem: nothing stayed in my head.\n" +
      "Now I am used to the slow way. I am used to writing a word three times, with one example next to it, and I am used to reading the page again on Sunday.\n" +
      "The surprise was the notebook. The visual method everybody talks about did nothing for me. What worked was slow, boring and by hand, and it took a month before it was mine.",
    questions: [
      {
        text: "What was the problem with writing on a screen?",
        options: ["nothing stayed in the writer's head", "it was too slow", "the writer's hand hurt"],
        answer: 0,
        explain: "„It was quick, and that was the problem: nothing stayed in my head.“",
      },
      {
        text: "How many words does the writer memorize a day?",
        options: ["ten", "fifty", "eleven"],
        answer: 0,
        explain: "„I try to memorize ten words a day. Ten, not fifty.“",
      },
      {
        kind: "truefalse",
        text: "The visual method did nothing for the writer.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The visual method everybody talks about did nothing for me.“",
      },
      {
        kind: "gapfill",
        text: "The writer listens for ___ minutes on the bus.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„Twenty minutes on the bus, the same episode twice…“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I enjoy listening to podcasts.",
          "I try to memorize ten words a day.",
          "I am used to writing in a notebook.",
          "I used to write everything on a screen.",
        ],
        explain: "Üç yöntem sırayla, en sonda karşıt cümle.",
      },
      {
        kind: "short_answer",
        text: "How long did the notebook take to feel normal?",
        options: [],
        answer: 0,
        accept: ["a month", "three weeks", "about a month"],
        explain: "„it took a month before it was mine.“",
      },
    ],
  },
  {
    id: "en-b1-u14-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 14,
    title: "Eleven months of a wrong rule",
    genre: "story",
    intro: "Baştan yanlış öğrenilen bir şey. Ne zaman fark ediliyor?",
    gloss: [
      { de: "the pattern", tr: "örüntü" },
      { de: "careless", tr: "dikkatsiz" },
      { de: "sentence", tr: "cümle" },
      { de: "built", tr: "kurdum" },
      { de: "understandable", tr: "anlaşılır" },
      { de: "speech", tr: "nutuk" },
      { de: "explanation", tr: "açıklama" },
      { de: "underneath", tr: "altındaki" },
      { de: "consistent", tr: "tutarlı" },
      { de: "consistency", tr: "tutarlılık" },
    ],
    minutes: 7,
    text:
      "I had learned it wrong at the start, and that is the most expensive kind of mistake.\n" +
      "The rule I had in my head was simple and it was not the rule. Nobody corrected it for eleven months, because the sentences I built with it were understandable. A wrong sentence that works is a wrong sentence that stays.\n" +
      "Then the correction helped me. It came in one line from a tutor who did not make a speech about it: „this is common, and here is the pattern.“ Eight words of explanation and one example.\n" +
      "By the time I noticed, I had repeated it often. That is the part nobody warns you about. The correction is easy; the eleven months of practice underneath it are not.\n" +
      "It took another month to change. Not because the new rule was hard, but because the old one came out first, every time, and I had to catch it after it was already in the air.\n" +
      "I was not careless. I was consistent, which is worse, because consistency makes a mistake look like a decision.\n" +
      "What I do now: when I learn a rule, I write one sentence with it and ask somebody to check that sentence. One sentence, on day one. It costs two minutes and it has saved me two more of these.",
    questions: [
      {
        text: "Why was the mistake not corrected for eleven months?",
        options: ["the sentences were understandable", "nobody listened", "the tutor was away"],
        answer: 0,
        explain: "„because the sentences I built with it were understandable.“",
      },
      {
        text: "What did the tutor say?",
        options: ["this is common, and here is the pattern", "you are careless", "start again"],
        answer: 0,
        explain: "„‚this is common, and here is the pattern.‘ Eight words of explanation and one example.“",
      },
      {
        kind: "truefalse",
        text: "The writer thinks the mistake came from being careless.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I was not careless. I was consistent, which is worse…“",
      },
      {
        kind: "gapfill",
        text: "It took another ___ to change.",
        options: [],
        answer: 0,
        accept: ["month"],
        explain: "„It took another month to change.“",
      },
      {
        kind: "short_answer",
        text: "What does the writer do now with a new rule?",
        options: [],
        answer: 0,
        accept: ["write one sentence", "check one sentence", "ask somebody"],
        explain: "„I write one sentence with it and ask somebody to check that sentence.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u14-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 14,
    title: "Two years and four months",
    genre: "dialogue",
    intro: "İki yıllık ilerleme. Neyle ölçülüyor?",
    gloss: [
      { de: "fluent", tr: "akıcı" },
      { de: "measure", tr: "ölçmek" },
      { de: "out loud", tr: "sesli olarak" },
      { de: "whether", tr: "olup olmadığı" },
      { de: "strange", tr: "tuhaf" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Tyler", text: "How long have you studied English?" },
      { speaker: "Ellie", text: "Two years and four months. I started at a lower level than the test said." },
      { speaker: "Tyler", text: "How do you know?" },
      { speaker: "Ellie", text: "Because the test measured what I could read and I could read a lot. I could say almost nothing." },
      { speaker: "Tyler", text: "And now?" },
      { speaker: "Ellie", text: "My vocabulary has grown a lot. That part is easy to see: I write a word down and three months later I use it without looking." },
      { speaker: "Tyler", text: "Are you fluent?" },
      { speaker: "Ellie", text: "No, and I have stopped wanting that word. Fluent is not a level, it is a feeling on a good day." },
      { speaker: "Tyler", text: "Then how do you measure it?" },
      { speaker: "Ellie", text: "Two ways. One: how long I can talk before I stop and look for a word. Two: whether I say it out loud when the room is quiet." },
      { speaker: "Tyler", text: "What is still the gap?" },
      { speaker: "Ellie", text: "Pronunciation. My grammar is ahead of my mouth, which is a strange place to be." },
      { speaker: "Tyler", text: "Does that bother you?" },
      { speaker: "Ellie", text: "Less than it did. The day I stopped being confident about being right, I started being confident about speaking." },
    ],
    questions: [
      {
        text: "How long has Ellie studied English?",
        options: ["two years and four months", "three months", "four years"],
        answer: 0,
        explain: "„Two years and four months. I started at a lower level than the test said.“",
      },
      {
        text: "Why was the first test wrong?",
        options: ["it measured reading only", "it was too long", "it was in a quiet room"],
        answer: 0,
        explain: "„the test measured what I could read and I could read a lot. I could say almost nothing.“",
      },
      {
        kind: "truefalse",
        text: "Ellie has stopped wanting the word fluent.",
        options: ["True", "False"],
        answer: 0,
        explain: "„No, and I have stopped wanting that word.“",
      },
      {
        kind: "gapfill",
        text: "The gap now is ___.",
        options: [],
        answer: 0,
        accept: ["pronunciation"],
        explain: "„Pronunciation. My grammar is ahead of my mouth…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My vocabulary has grown a lot.", "My vocabulary has grown a lot"],
        explain: "Süre sürüyor ve sonuç şimdi görünüyor: present perfect.",
      },
      {
        kind: "short_answer",
        text: "What are Ellie's two measures?",
        options: [],
        answer: 0,
        accept: ["talking and speaking out loud", "how long and out loud", "how long I can talk and out loud"],
        explain: "„how long I can talk before I stop … whether I say it out loud…“",
      },
    ],
  },
  {
    id: "en-b1-u14-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 14,
    title: "A short, useful session",
    genre: "dialogue",
    intro: "Geri bildirim oturumu. Aktarılan cümleler nasıl kuruluyor?",
    gloss: [
      { de: "session", tr: "oturum" },
      { de: "a remark", tr: "kısa değerlendirme" },
      { de: "rare", tr: "ender" },
      { de: "stupid", tr: "aptalca" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Katie", text: "How was the session?" },
      { speaker: "Henry", text: "Short and useful, which is rare. She said that my comment had helped." },
      { speaker: "Katie", text: "Which comment?" },
      { speaker: "Henry", text: "The one in the group last week, about the second exercise. I thought it had been a stupid question." },
      { speaker: "Katie", text: "It clearly was not." },
      { speaker: "Henry", text: "Three other people had the same question and nobody asked it. She said that out loud, which is why I am telling you." },
      { speaker: "Katie", text: "What else?" },
      { speaker: "Henry", text: "She told me to advise the others on the writing part. Not to teach them — to say what I do." },
      { speaker: "Katie", text: "Can you do that?" },
      { speaker: "Henry", text: "I can say what I do. Whether it helps anybody is a different question." },
      { speaker: "Katie", text: "Any criticism?" },
      { speaker: "Henry", text: "One remark. She asked if I had understood the feedback from March, and I had not read it." },
      { speaker: "Katie", text: "At all?" },
      { speaker: "Henry", text: "At all. Five months of feedback in a folder I opened yesterday. Everything she said this week was in it in March." },
    ],
    questions: [
      {
        text: "What did she say about the comment?",
        options: ["that it had helped", "that it was late", "that it was wrong"],
        answer: 0,
        explain: "„She said that my comment had helped.“",
      },
      {
        text: "What was Henry told to do?",
        options: ["advise the others on writing", "teach the group", "repeat the exercise"],
        answer: 0,
        explain: "„She told me to advise the others on the writing part. Not to teach them — to say what I do.“",
      },
      {
        kind: "truefalse",
        text: "Henry had read the feedback from March.",
        options: ["True", "False"],
        answer: 1,
        explain: "„She asked if I had understood the feedback from March, and I had not read it.“",
      },
      {
        kind: "gapfill",
        text: "___ other people had the same question.",
        options: [],
        answer: 0,
        accept: ["Three", "three", "3"],
        explain: "„Three other people had the same question and nobody asked it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["She said that my comment had helped.", "She said that my comment had helped"],
        explain: "Aktarılınca zaman geri kayıyor: „helped“ → „had helped“.",
      },
      {
        kind: "short_answer",
        text: "What was in the folder?",
        options: [],
        answer: 0,
        accept: ["five months of feedback", "the feedback", "old feedback"],
        explain: "„Five months of feedback in a folder I opened yesterday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u14-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 14,
    title: "My learning habits",
    genre: "personal",
    intro: "Üç sözcük aynı, anlam ayrı. Hangisi bitmiş alışkanlık, hangisi alışkın olmak?",
    gloss: [
      { de: "used to write", tr: "eskiden yazardım" },
      { de: "am used to writing", tr: "yazmaya alışkınım" },
      { de: "memorize", tr: "ezberlemek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sesli yayınları dinlemeyi seviyorum.",
        answer: "I enjoy listening to podcasts.",
        hint: "„enjoy“ sonrası „-ing“; „listen“ kendi edatını taşıyor: to.",
      },
      {
        kind: "build",
        tr: "Günde on kelime ezberlemeye çalışıyorum.",
        answer: "I try to memorize ten words a day.",
        hint: "„try“ burada MASTAR alıyor: çabalamak anlamında („try + -ing“ ise deneyip bakmak).",
      },
      {
        kind: "build",
        tr: "Deftere yazmaya alışkınım.",
        answer: "I am used to writing in a notebook.",
        hint: "„be used to“ ALIŞKIN OLMAK demek ve sonrası „-ing“; bitmiş alışkanlık değil.",
      },
      {
        kind: "build",
        tr: "Eskiden ekranda yazardım.",
        answer: "I used to write on a screen.",
        hint: "„used to“ tek başına GEÇMİŞTEKİ alışkanlık: o zaman öyleydi, şimdi değil.",
      },
      {
        kind: "form",
        prompt: "Öğrenme kartını doldur.",
        facts: "Otobüste yirmi dakika dinleme; günde on kelime; defter elle; görsel yöntem işe yaramadı.",
        fields: [
          { label: "Listening", answer: "twenty minutes", accept: ["20 minutes"] },
          { label: "Words a day", answer: "ten", accept: ["10"] },
          { label: "Notebook", answer: "by hand", accept: ["writing by hand"] },
          { label: "Visual method", answer: "did not work", accept: ["nothing", "no"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u14-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 14,
    title: "Progress and feedback",
    genre: "personal",
    intro: "İlerleme ve geri bildirim cümleleri. Aktarmada zaman nereye kayıyor?",
    gloss: [
      { de: "has grown", tr: "büyüdü" },
      { de: "had helped", tr: "yardımcı olmuş" },
      { de: "the feedback", tr: "geri bildirim" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Kelime dağarcığım epey büyüdü.",
        answer: "My vocabulary has grown a lot.",
        hint: "Süreç sürüyor ve sonucu şimdi görünüyor: present perfect.",
      },
      {
        kind: "build",
        tr: "Daha düşük bir seviyeden başladım.",
        answer: "I started at a lower level.",
        hint: "Kapanmış bir an: sade geçmiş.",
      },
      {
        kind: "build",
        tr: "Yorumumun yardımcı olduğunu söyledi.",
        answer: "She said that my comment had helped.",
        alternatives: ["She said my comment had helped."],
        hint: "Aktarılınca „helped“ bir basamak geriye kayıp „had helped“ oluyor.",
      },
      {
        kind: "build",
        tr: "Geri bildirimi anlayıp anlamadığımı sordu.",
        answer: "She asked if I had understood the feedback.",
        hint: "Evet-hayır sorusu „if“ ile; „understood“ da geriye kayıyor.",
      },
      {
        kind: "build",
        tr: "Ne kadar zamandır İngilizce çalışıyorsun?",
        answer: "How long have you studied English?",
        hint: "Hâlâ sürüyor: present perfect. Türkçe şimdiki zaman diyor.",
      },
    ],
  },
];
