import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 23 — "Sağlıklı yaşam, diş hekimi, telefon, mesaj".
 *
 * Dört ders: Healthy living · At the dentist · On the phone ·
 * Texting a friend.
 *
 *   Kelime: healthy, exercise, fruit, smoke, weight, fat, salad, chicken,
 *           tooth, dentist, hurt, clean, toothache, ice cream, sit, lemon,
 *           phone, call, speak, hear, number, mobile phone, bye,
 *           be called, message, send, reply, quick, sorry, something,
 *           bye-bye, smile.
 *   Kalıp:  You should … · You shouldn't … · Should I …? ·
 *           I have a toothache. · My tooth hurts. · Does it hurt? ·
 *           Hello, this is Ayse. · Can I speak to …? ·
 *           Sorry, I can't hear you. · I'll send you a message. ·
 *           I'm sorry, I'm busy. · I can't talk now. I'll reply later.
 *
 * Telefonda kendini tanıtmanın kalıbı ŞAŞIRTICI: „Hello, this is Ela“ —
 * „I am Ela“ değil. Yüz yüze „I am“, telefonda „this is“. Türkçede ikisi
 * de "ben Ela'yım" ve fark hiç yok; öğrenci telefonda „I am Ela“ diyor ve
 * anlaşılıyor ama yerli kulağa yanlış geliyor. İçerik kalıbı iki ayrı
 * egzersizde kullanıyor.
 */
export const enA1U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u23-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 23,
    title: "Healthy living",
    genre: "guide",
    intro: "Sağlıklı yaşam öğütleri. Ne yapmalı, ne yapmamalı?",
    gloss: [
      { de: "less", tr: "daha az" },
      { de: "sugar", tr: "şeker" },
      { de: "exercise", tr: "egzersiz" },
    ],
    minutes: 4,
    text:
      "Do you want to be healthy? It is simple.\n\n" +
      "You should eat fruit every day: an apple, a banana, a carrot. A salad with chicken is good for dinner too.\n\n" +
      "You shouldn't smoke. And you shouldn't eat a big dinner at ten in the evening.\n\n" +
      "Should I do exercise? Yes! Twenty minutes a day is good. You can walk, run or swim — all three are exercise.\n\n" +
      "Is weight a problem? Then you should drink more water and eat less sugar. But be careful: a fast change is not healthy. Slow is better.",
    questions: [
      {
        text: "What should you eat every day?",
        options: ["fruit", "chicken", "sugar"],
        answer: 0,
        explain: "„You should eat fruit every day: an apple, a banana, a carrot.“",
      },
      {
        text: "How much exercise is good?",
        options: ["twenty minutes a day", "one hour a day", "three times a week"],
        answer: 0,
        explain: "„Twenty minutes a day is good.“ — üç, yürüme koşma yüzmenin sayısı.",
      },
      {
        kind: "truefalse",
        text: "A fast change is healthy.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But be careful: a fast change is not healthy. Slow is better.“",
      },
      {
        kind: "gapfill",
        text: "You shouldn't ___.",
        options: [],
        answer: 0,
        accept: ["smoke"],
        explain: "„You shouldn't smoke.“ — en kısa öğüt, tek fiille.",
      },
      {
        kind: "short_answer",
        text: "What is good for dinner?",
        options: [],
        answer: 0,
        accept: ["a salad with chicken", "salad and chicken", "a salad"],
        explain: "„A salad with chicken is good for dinner too.“",
      },
    ],
  },
  {
    id: "en-a1-u23-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 23,
    title: "At the dentist",
    genre: "dialogue",
    intro: "Diş hekiminde. Ne zaman ağrıyor, sebebi ne?",
    gloss: [
      { de: "since", tr: "-den beri" },
      { de: "sugar", tr: "şeker" },
      { de: "less", tr: "daha az" },
      { de: "know", tr: "bilmek" },
      { de: "a lot of", tr: "bir sürü" },
      { de: "toothache", tr: "diş ağrısı" },
    ],
    minutes: 4,
    text:
      "Dentist: Good morning. Please sit here. What is the problem?\n" +
      "Kaan: I have a toothache. My tooth hurts since two days.\n" +
      "Dentist: Which tooth? This one?\n" +
      "Kaan: Yes! That one.\n" +
      "Dentist: Does it hurt with cold water?\n" +
      "Kaan: Very much. And with ice cream too. And with lemon.\n" +
      "Dentist: I see. The tooth is not clean here. Do you eat a lot of sugar?\n" +
      "Kaan: Maybe. I eat ice cream every evening.\n" +
      "Dentist: Then you should eat less ice cream. And you should come every year.\n" +
      "Kaan: I know. I am here after four years.\n" +
      "Dentist: Four years! Today I clean the tooth. Come again in one week.\n" +
      "Kaan: Does it hurt today?\n" +
      "Dentist: A little. But after that you feel better.",
    questions: [
      {
        text: "What is the problem?",
        options: ["a toothache", "a headache", "cold water"],
        answer: 0,
        explain: "„I have a toothache. My tooth hurts since two days.“ — aynı şey iki kalıpla.",
      },
      {
        text: "What does Kaan eat every evening?",
        options: ["ice cream", "lemon", "salad"],
        answer: 0,
        explain: "„Maybe. I eat ice cream every evening.“",
      },
      {
        kind: "truefalse",
        text: "Kaan comes to the dentist every year.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I know. I am here after four years.“ — her yıl gelmek öğüdün kendisi.",
      },
      {
        kind: "gapfill",
        text: "Kaan is here after ___ years.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„I am here after four years.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What is the problem?",
          "I have a toothache.",
          "Does it hurt with cold water?",
          "Today I clean the tooth.",
        ],
        explain: "Önce soru, sonra şikâyet, sonra ayrıntı, en son tedavi.",
      },
      {
        kind: "short_answer",
        text: "When does Kaan come again?",
        options: [],
        answer: 0,
        accept: ["in one week", "one week", "next week"],
        explain: "„Come again in one week.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u23-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 23,
    title: "On the phone",
    genre: "phone",
    intro: "Telefonda kendini tanıtma. Dikkat: yüz yüze „I am“, telefonda „this is“.",
    gloss: [
      { de: "slowly", tr: "yavaşça" },
      { de: "mobile phone", tr: "cep telefonu" },
      { de: "One moment", tr: "bir dakika" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ela", text: "Hello, this is Ela. Can I speak to Mr. Demir, please?" },
      { speaker: "Office", text: "One moment, please. Sorry, he is not here today." },
      { speaker: "Ela", text: "Sorry, I can't hear you. Can you speak more slowly?" },
      { speaker: "Office", text: "Mr. Demir is not here today. He is at the dentist." },
      { speaker: "Ela", text: "I understand. Can he call me tomorrow?" },
      { speaker: "Office", text: "Of course. What is your number?" },
      { speaker: "Ela", text: "My mobile phone is oh five three two, one two three, four five six." },
      { speaker: "Office", text: "Oh five three two, one two three, four five six. Good." },
      { speaker: "Ela", text: "Thank you. Can you tell him it is quick?" },
      { speaker: "Office", text: "Yes, I tell him." },
      { speaker: "Ela", text: "Thank you very much. Bye!" },
      { speaker: "Office", text: "Bye-bye!" },
    ],
    questions: [
      {
        text: "Where is Mr. Demir?",
        options: ["at the dentist", "at home", "in the office"],
        answer: 0,
        explain: "„Mr. Demir is not here today. He is at the dentist.“",
      },
      {
        text: "What does Ela give?",
        options: ["her number", "her address", "a message"],
        answer: 0,
        explain: "„What is your number? — My mobile phone is oh five three two…“",
      },
      {
        kind: "truefalse",
        text: "Ela can hear the office well.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Sorry, I can't hear you. Can you speak more slowly?“",
      },
      {
        kind: "gapfill",
        text: "Ela asks: can he ___ me tomorrow?",
        options: [],
        answer: 0,
        accept: ["call"],
        explain: "„Can he call me tomorrow?“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Can I speak to Mr. Demir, please?", "Can I speak to Mr. Demir please?"],
        explain: "„Can I speak to Mr. Demir, please?“ — „speak to“ birine konuşmak demek.",
      },
      {
        kind: "short_answer",
        text: "Who is at the dentist?",
        options: [],
        answer: 0,
        accept: ["Mr. Demir", "Demir"],
        explain: "„He is at the dentist.“",
      },
    ],
  },
  {
    id: "en-a1-u23-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 23,
    title: "Texting a friend",
    genre: "monologue",
    intro: "Mesajlaşma anlatılıyor. Hangi durumda mesaj, hangisinde telefon?",
    gloss: [
      { de: "news", tr: "haber" },
      { de: "write back", tr: "cevap yazmak" },
      { de: "smile", tr: "gülümseme" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nil", text: "My friend sends me a message: Are you free tonight?" },
      { speaker: "Nil", text: "I am busy, so I reply: I'm sorry, I'm busy. Maybe tomorrow?" },
      { speaker: "Nil", text: "Then she writes: I can't talk now. I'll reply later." },
      { speaker: "Nil", text: "Two hours later she sends a smile and one word: Tomorrow!" },
      { speaker: "Nil", text: "I write back: Good! At seven, in the café next to the park." },
      { speaker: "Nil", text: "A quick message is better than a long call. But for bad news I always call." },
    ],
    questions: [
      {
        text: "What does Nil's friend ask?",
        options: ["if she is free tonight", "where she is", "for a call"],
        answer: 0,
        explain: "„My friend sends me a message: Are you free tonight?“",
      },
      {
        text: "When do they meet?",
        options: ["tomorrow at seven", "tonight", "in two hours"],
        answer: 0,
        explain: "„Good! At seven, in the café next to the park.“ — iki saat, cevabın gecikmesi.",
      },
      {
        kind: "truefalse",
        text: "Nil calls for bad news.",
        options: ["True", "False"],
        answer: 0,
        explain: "„But for bad news I always call.“ — kötü haber mesajla verilmiyor.",
      },
      {
        kind: "gapfill",
        text: "They meet in the café next to the ___.",
        options: [],
        answer: 0,
        accept: ["park"],
        explain: "„At seven, in the café next to the park.“",
      },
      {
        kind: "order",
        text: "Mesajların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Are you free tonight?",
          "I'm sorry, I'm busy.",
          "I can't talk now.",
          "At seven, in the café next to the park.",
        ],
        explain: "Önce davet, sonra ret, sonra erteleme, en son buluşma yeri.",
      },
      {
        kind: "short_answer",
        text: "What does the friend send after two hours?",
        options: [],
        answer: 0,
        accept: ["a smile and one word", "a smile", "one word"],
        explain: "„Two hours later she sends a smile and one word: Tomorrow!“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u23-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 23,
    title: "I have a toothache",
    genre: "personal",
    intro: "Diş ağrısını iki biçimde de yaz. Sonunda diş hekimi formunu doldur.",
    gloss: [
      { de: "I have a toothache.", tr: "diş ağrım var" },
      { de: "My tooth hurts.", tr: "dişim ağrıyor" },
      { de: "Does it hurt?", tr: "acıyor mu" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Diş ağrım var.",
        answer: "I have a toothache.",
        hint: "„toothache“ tek sözcük ve önünde „a“ var — „headache“ gibi.",
      },
      {
        kind: "build",
        tr: "Dişim ağrıyor.",
        answer: "My tooth hurts.",
        hint: "Organ özne olunca fiil „hurt“ ve üçüncü tekil kişide „-s“ alıyor.",
      },
      {
        kind: "build",
        tr: "Acıyor mu?",
        answer: "Does it hurt?",
        hint: "Soru „does“ ile ve fiil eksiz kalıyor: does it hurt, „does it hurts“ değil.",
      },
      {
        kind: "build",
        tr: "Meyve yemelisin.",
        answer: "You should eat fruit.",
        hint: "„fruit“ sayılamaz: önünde artikel yok, çoğulu da yok.",
      },
      {
        kind: "form",
        prompt: "Diş hekimi formunu doldur.",
        facts: "Diş ağrısı; iki gündür; soğuk suyla acıyor; bir hafta sonra tekrar.",
        fields: [
          { label: "Problem", answer: "toothache", accept: ["a toothache"] },
          { label: "Since", answer: "two days", accept: ["2 days"] },
          { label: "Pain", answer: "with cold water", accept: ["cold water"] },
          { label: "Again", answer: "in one week", accept: ["one week"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u23-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 23,
    title: "Hello, this is …",
    genre: "phone",
    intro: "Telefon cümlelerini yaz. Telefonda kendini „this is“ ile tanıtıyorsun.",
    gloss: [
      { de: "Hello, this is …", tr: "alo ben …" },
      { de: "Can I speak to …?", tr: "… ile konuşabilir miyim" },
      { de: "Sorry, I can't hear you.", tr: "kusura bakma seni duyamıyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Alo, ben Ela.",
        answer: "Hello, this is Ela.",
        hint: "Telefonda „this is“, yüz yüze „I am“. Türkçede ikisi de aynı cümle.",
      },
      {
        kind: "build",
        tr: "Bay Demir ile konuşabilir miyim?",
        answer: "Can I speak to Mr. Demir?",
        hint: "Kişiyle konuşmak „speak to“; „speak with“ de duyulur ama bu daha yaygın.",
      },
      {
        kind: "build",
        tr: "Kusura bakma, seni duyamıyorum.",
        answer: "Sorry, I can't hear you.",
        hint: "„hear“ duymak, „listen“ dinlemek. Telefonda sorun duymakla ilgili.",
      },
      {
        kind: "build",
        tr: "Sana bir mesaj göndereceğim.",
        answer: "I'll send you a message.",
        alternatives: ["I will send you a message."],
        hint: "İki nesne art arda: send + kime + neyi. „I'll“ burada söz verme.",
      },
      {
        kind: "build",
        tr: "Şimdi konuşamam.",
        answer: "I can't talk now.",
        hint: "„talk“ karşılıklı konuşmak; „speak“ daha resmî. Mesajda „talk“ doğal.",
      },
    ],
  },
];
