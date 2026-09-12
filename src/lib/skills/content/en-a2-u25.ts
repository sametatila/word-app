import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 25 — "Randevu, belgeler, şikâyet, belediye hizmetleri".
 *
 * SEVİYENİN SON ÜNİTESİ. Dört ders: Booking an appointment ·
 * Documents and copies · Making a complaint · City services.
 *
 *   Kelime: available, bring, proof, arrive, early, calendar, on the way,
 *           advance, copy, original, stamp, official, need, print out,
 *           several, exactly, complaint, service, wait, answer, expect,
 *           situation, negative, discuss, rubbish, collect, recycle,
 *           water, bill, trash can, energy, tax.
 *   Kalıp:  Could I book an appointment for Monday? ·
 *           Do you have anything available on Tuesday? ·
 *           What should I bring with me? ·
 *           Could you make a copy, please? · I need an official copy. ·
 *           Do I have to sign it? ·
 *           I would like to make a complaint about … ·
 *           I have waited for three weeks. ·
 *           I expect an answer within a week. ·
 *           They collect the rubbish on Mondays. ·
 *           You have to separate the paper. ·
 *           How often do they collect the rubbish?
 *
 * Ünitenin tek öğretme noktası BELİRSİZ „they“: „They collect the rubbish
 * on Mondays.“ Kim toplar? Belediye — ama adı geçmiyor ve İngilizce yine
 * de bir özne koyuyor. Türkçe aynı yerde edilgen kuruyor ("çöpler
 * pazartesi toplanıyor"). Bu, ünite 24'ün „Someone stole my phone“
 * cümlesiyle AYNI eğilimin ikinci görünüşü: İngilizce özne yerini boş
 * bırakmıyor. Seviye bu ipi adıyla söyleyerek kapanıyor.
 */
export const enA2U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u25-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 25,
    title: "Making a complaint",
    genre: "letter",
    intro: "Üç haftalık bir şikâyet. Ne istendi, ne bekleniyor?",
    gloss: [
      { de: "Dear Sir or Madam", tr: "sayın yetkili" },
      { de: "Yours faithfully", tr: "saygılarımla" },
      { de: "on the list", tr: "listede" },
      { de: "the twelfth", tr: "on ikisi" },
    ],
    minutes: 5,
    text:
      "Dear Sir or Madam,\n" +
      "I would like to make a complaint about the rubbish in Garden Street.\n" +
      "They collect the rubbish on Mondays. In our street they have not come since the twelfth of August. That is three weeks. I have waited for three weeks and I have called twice.\n" +
      "The first time somebody said: we send a car on Thursday. No car came. The second time nobody answered.\n" +
      "I know the reason is not one person. But there is a list and our street is not on it.\n" +
      "Please put it on the list. I expect an answer within a week.\n" +
      "If you need a photo, I have eleven.\n" +
      "Yours faithfully,\n" +
      "Nil Aslan",
    questions: [
      {
        text: "When do they collect the rubbish?",
        options: ["on Mondays", "on Thursdays", "on the twelfth"],
        answer: 0,
        explain: "„They collect the rubbish on Mondays.“ — perşembe sözü verilen arabanın günü.",
      },
      {
        text: "How long has Nil waited?",
        options: ["three weeks", "one week", "eleven days"],
        answer: 0,
        explain: "„That is three weeks. I have waited for three weeks and I have called twice.“",
      },
      {
        kind: "truefalse",
        text: "A car came on Thursday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„we send a car on Thursday. No car came.“",
      },
      {
        kind: "gapfill",
        text: "Nil has called ___ times.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„I have waited for three weeks and I have called twice.“",
      },
      {
        kind: "short_answer",
        text: "What does Nil expect?",
        options: [],
        answer: 0,
        accept: ["an answer", "an answer within a week", "a week"],
        explain: "„I expect an answer within a week.“",
      },
    ],
  },
  {
    id: "en-a2-u25-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 25,
    title: "City services",
    genre: "info",
    intro: "Şehrin takvimi. Ne zaman ne oluyor?",
    gloss: [
      { de: "points", tr: "nokta" },
      { de: "glass", tr: "cam" },
      { de: "stays there", tr: "orada kalıyor" },
    ],
    minutes: 6,
    text:
      "What the city does and when\n" +
      "They collect the rubbish on Mondays and Thursdays. Paper is Monday only. You have to separate the paper from everything else — a bag with both is not collected and stays there until the next week.\n" +
      "They recycle glass at three points in this area: at the market, behind the school and next to the bakery. Glass is not collected from the houses.\n" +
      "Water and energy bills come four times a year. If you pay by card, they come by email. If you pay at the bank, they come on paper and two weeks later.\n" +
      "The tax office is open on Tuesday and Thursday until four, and on the first Saturday of the month until twelve. That Saturday is the quiet one — everybody comes on Tuesday.\n" +
      "One number for everything: it is on the trash can.",
    questions: [
      {
        text: "When do they collect paper?",
        options: ["on Monday only", "on Thursday", "every day"],
        answer: 0,
        explain: "„They collect the rubbish on Mondays and Thursdays. Paper is Monday only.“",
      },
      {
        text: "What happens to a bag with paper and rubbish together?",
        options: ["it is not collected", "it costs more", "it goes to the school"],
        answer: 0,
        explain: "„…a bag with both is not collected and stays there until the next week.“",
      },
      {
        kind: "truefalse",
        text: "They collect glass from the houses.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Glass is not collected from the houses.“",
      },
      {
        kind: "gapfill",
        text: "The bills come ___ times a year.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Water and energy bills come four times a year.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "They collect the rubbish on Mondays and Thursdays.",
          "They recycle glass at three points.",
          "The bills come four times a year.",
          "The tax office is open on Tuesday and Thursday.",
        ],
        explain: "Çöp, cam, fatura, vergi dairesi — metnin kendi sırası.",
      },
      {
        kind: "short_answer",
        text: "Which Saturday is the tax office open?",
        options: [],
        answer: 0,
        accept: ["the first", "the first of the month", "the first Saturday"],
        explain: "„…and on the first Saturday of the month until twelve.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u25-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 25,
    title: "Booking an appointment",
    genre: "phone",
    intro: "Randevu ve belge listesi. Ne getirilecek, ne zaman gelinecek?",
    gloss: [
      { de: "proof of address", tr: "adres kanıtı" },
      { de: "a bill", tr: "fatura" },
      { de: "not older than", tr: "en fazla" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Mert", text: "Good morning. Could I book an appointment for Monday?" },
      { speaker: "Office", text: "Monday is full." },
      { speaker: "Mert", text: "Do you have anything available on Tuesday?" },
      { speaker: "Office", text: "Tuesday, yes. At ten or at half past two." },
      { speaker: "Mert", text: "Ten. What should I bring with me?" },
      { speaker: "Office", text: "Your passport, the form, and proof of address." },
      { speaker: "Mert", text: "What is proof of address?" },
      { speaker: "Office", text: "A bill with your name on it. Water, energy, phone — not a letter from a friend." },
      { speaker: "Mert", text: "I have the water bill from August." },
      { speaker: "Office", text: "That works. Not older than three months." },
      { speaker: "Mert", text: "And if I am late?" },
      { speaker: "Office", text: "Then you come again. Arrive early — the queue at the entrance takes ten minutes." },
      { speaker: "Mert", text: "So nine fifty." },
      { speaker: "Office", text: "Nine forty. The entrance and then the second door on the left." },
      { speaker: "Mert", text: "Nine forty. It is in my calendar." },
    ],
    questions: [
      {
        text: "When is the appointment?",
        options: ["on Tuesday at ten", "on Monday", "at half past two"],
        answer: 0,
        explain: "„Tuesday, yes. At ten or at half past two. — Ten.“",
      },
      {
        text: "What is proof of address?",
        options: ["a bill with your name", "a letter from a friend", "a passport"],
        answer: 0,
        explain: "„A bill with your name on it. Water, energy, phone — not a letter from a friend.“",
      },
      {
        kind: "truefalse",
        text: "A bill from last year works.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That works. Not older than three months.“",
      },
      {
        kind: "gapfill",
        text: "Mert should arrive at nine ___.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„Nine forty. The entrance and then the second door on the left.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What should I bring with me?", "What should I bring with me"],
        explain: "„bring“ buraya getirmek demek; „with me“ yanında.",
      },
      {
        kind: "short_answer",
        text: "How long does the queue take?",
        options: [],
        answer: 0,
        accept: ["ten minutes", "10 minutes"],
        explain: "„Arrive early — the queue at the entrance takes ten minutes.“",
      },
    ],
  },
  {
    id: "en-a2-u25-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 25,
    title: "Documents and copies",
    genre: "dialogue",
    intro: "Kopya mı, resmî kopya mı? Fark neye mal oluyor?",
    gloss: [
      { de: "slowly", tr: "yavaşça" },
      { de: "a stamp", tr: "damga" },
      { de: "how it works", tr: "nasıl yürüdüğü" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Sena", text: "Could you make a copy, please?" },
      { speaker: "Office", text: "How many?" },
      { speaker: "Sena", text: "Two. And I need an official copy of this one." },
      { speaker: "Office", text: "Then it is not a copy, it is a stamp. Four euros." },
      { speaker: "Sena", text: "What is the difference?" },
      { speaker: "Office", text: "A copy is paper. An official copy has a stamp and a date. The office believes the stamp, not the paper." },
      { speaker: "Sena", text: "Do I have to sign it?" },
      { speaker: "Office", text: "You sign the form, not the copy. Here, and the date next to it." },
      { speaker: "Sena", text: "Exactly like on the ID card?" },
      { speaker: "Office", text: "Exactly. If it is different, they call you and you come again." },
      { speaker: "Sena", text: "Then slowly." },
      { speaker: "Office", text: "Slowly is right. Everybody signs fast and comes back twice." },
      { speaker: "Sena", text: "Done. Two copies, one stamp, one signature." },
      { speaker: "Office", text: "And one year until the next time. That is how it works here." },
      { speaker: "Sena", text: "Then see you next September." },
    ],
    questions: [
      {
        text: "What does an official copy have?",
        options: ["a stamp and a date", "two signatures", "a photo"],
        answer: 0,
        explain: "„An official copy has a stamp and a date. The office believes the stamp, not the paper.“",
      },
      {
        text: "What does Sena sign?",
        options: ["the form", "the copy", "the ID card"],
        answer: 0,
        explain: "„You sign the form, not the copy.“",
      },
      {
        kind: "truefalse",
        text: "The official copy is free.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Then it is not a copy, it is a stamp. Four euros.“",
      },
      {
        kind: "gapfill",
        text: "The official copy costs ___ euros.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Then it is not a copy, it is a stamp. Four euros.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Could you make a copy, please?", "Could you make a copy, please"],
        explain: "Kopya „make“ ile alınıyor, „take“ ile değil.",
      },
      {
        kind: "short_answer",
        text: "Why do people come back twice?",
        options: [],
        answer: 0,
        accept: ["they sign fast", "the signature is different", "they sign too fast"],
        explain: "„Everybody signs fast and comes back twice.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u25-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 25,
    title: "They collect the rubbish on Mondays",
    genre: "info",
    intro: "Kim toplar? Adı geçmiyor ama İngilizce yine de bir özne koyuyor.",
    gloss: [
      { de: "collect", tr: "toplamak" },
      { de: "separate", tr: "ayırmak" },
      { de: "a complaint", tr: "şikâyet" },
      { de: "the twelfth", tr: "on ikisi" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Çöpü pazartesileri topluyorlar.",
        answer: "They collect the rubbish on Mondays.",
        hint: "Buradaki „they“ belirsiz: belediye. Türkçe edilgen kurardı, İngilizce özneyi boş bırakmıyor.",
      },
      {
        kind: "build",
        tr: "Kâğıdı ayırman gerekiyor.",
        answer: "You have to separate the paper.",
        hint: "Buradaki „you“ da belirsiz: herkes demek.",
      },
      {
        kind: "build",
        tr: "Çöpü ne sıklıkta topluyorlar?",
        answer: "How often do they collect the rubbish?",
        hint: "Sıklık sorusu „how often“; soruda „do“ zorunlu.",
      },
      {
        kind: "build",
        tr: "Bir şikâyette bulunmak istiyorum.",
        answer: "I would like to make a complaint.",
        alternatives: ["I'd like to make a complaint."],
        hint: "Şikâyet „make“ ile kuruluyor; „do a complaint“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Şikâyet formunu doldur.",
        facts: "Çöp toplanmıyor; Garden Street; on iki ağustostan beri; iki kez arandı.",
        fields: [
          { label: "Problem", answer: "the rubbish", accept: ["rubbish"] },
          { label: "Street", answer: "Garden Street", accept: ["Garden"] },
          { label: "Since", answer: "the twelfth of August", accept: ["12 August", "August"] },
          { label: "Calls", answer: "two", accept: ["twice", "2"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u25-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 25,
    title: "Could I book an appointment?",
    genre: "formal",
    intro: "A2'nin son egzersizi. Randevu, belge ve seviyenin en çok dönen kalıbı.",
    gloss: [
      { de: "book an appointment", tr: "randevu almak" },
      { de: "available", tr: "müsait" },
      { de: "make a copy", tr: "kopya almak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Pazartesi için randevu alabilir miyim?",
        answer: "Could I book an appointment for Monday?",
        hint: "„book“ burada ayırtmak; gün „for“ ile bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Salı için müsait bir şey var mı?",
        answer: "Do you have anything available on Tuesday?",
        hint: "Soruda „anything“; sıfat isimden SONRA geliyor.",
      },
      {
        kind: "build",
        tr: "Yanımda ne getirmeliyim?",
        answer: "What should I bring with me?",
        hint: "„bring“ buraya getirmek; „take“ olsaydı buradan götürmek olurdu.",
      },
      {
        kind: "build",
        tr: "Bir kopya alabilir misiniz, lütfen?",
        answer: "Could you make a copy, please?",
        hint: "Kopya „make“ ile alınıyor; „take a copy“ İngilizcede alışılmış değil.",
      },
      {
        kind: "build",
        tr: "Üç haftadır bekliyorum.",
        answer: "I have waited for three weeks.",
        alternatives: ["I've waited for three weeks."],
        hint: "Hâlâ sürüyor: „for“ ile present perfect. A2 boyunca dönen kalıp, kapanışta bir kez daha.",
      },
    ],
  },
];
