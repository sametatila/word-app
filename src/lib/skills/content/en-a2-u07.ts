import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 7 — "Prospektüs, hastane, alışkanlık, sigorta".
 *
 * Dört ders: Reading the label · At the hospital · Healthy habits ·
 * Health insurance.
 *
 *   Kelime: tablet, twice, meal, dose, side effect, pill, syrup, pharmacy,
 *           hospital, nurse, ward, wait, result, hospital room, treatment,
 *           wait in line, exercise, usually, hardly ever, sugar, sleep,
 *           diet, protein, daily, insurance, card, cover, pay, form,
 *           signature, documents, fill out.
 *   Kalıp:  Take one tablet twice a day. · You should take it after meals. ·
 *           How many tablets should I take? ·
 *           Could you tell me where the ward is? · I'd like to see a doctor. ·
 *           How long do I have to wait? · I usually get up at seven. ·
 *           I exercise three times a week. · How often do you exercise? ·
 *           Does my insurance cover this? ·
 *           I have already filled in the form. · How much do I have to pay?
 *
 * Ünitenin tek öğretme noktası DOLAYLI SORU. „Where is the ward?“ soru
 * sırasıyla kurulur, ama aynı soru „Could you tell me …“ içine girince
 * sıra DÜZ cümleye döner: „where the ward is“. Kurum diliyle konuşan üç
 * ders de bu biçime dayanıyor, o yüzden dördü birden buraya toplandı.
 * Yanına sıklık kalıpları geliyor: twice a day, three times a week.
 */
export const enA2U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u7-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 7,
    title: "At the pharmacy",
    genre: "dialogue",
    intro: "Kutunun üstündeki talimat konuşuluyor. Kaç tane, ne zaman, yan etkisi ne?",
    gloss: [
      { de: "side effect", tr: "yan etki" },
      { de: "empty", tr: "boş" },
      { de: "adults", tr: "yetişkinler" },
      { de: "normal", tr: "olağan" },
    ],
    minutes: 5,
    text:
      "Pharmacist: Good morning. How can I help you?\n" +
      "Ela: I have this from my doctor. It is my first time with this medicine.\n" +
      "Pharmacist: Let me look. One tablet twice a day.\n" +
      "Ela: Twice a day — in the morning and in the evening?\n" +
      "Pharmacist: Yes. And you should take it after meals, never before.\n" +
      "Ela: Why after a meal?\n" +
      "Pharmacist: Because of the stomach. On an empty stomach it can hurt.\n" +
      "Ela: How many tablets are in the box?\n" +
      "Pharmacist: Twenty. That is ten days.\n" +
      "Ela: Are there side effects?\n" +
      "Pharmacist: You can get tired. Don't drive in the first two days.\n" +
      "Ela: My son has the same cold. Can he take it too?\n" +
      "Pharmacist: No. For children we have a syrup. This dose is for adults.\n" +
      "Ela: Good to know. And if I forget a pill?\n" +
      "Pharmacist: Take the next one at the normal time. Never take two together.",
    questions: [
      {
        text: "How often should Ela take the tablet?",
        options: ["twice a day", "once a day", "after two days"],
        answer: 0,
        explain: "„One tablet twice a day.“ — sabah bir, akşam bir.",
      },
      {
        text: "Why should she take it after a meal?",
        options: ["because of the stomach", "because of the sugar", "because of the box"],
        answer: 0,
        explain: "„Because of the stomach. On an empty stomach it can hurt.“",
      },
      {
        kind: "truefalse",
        text: "The children take the same tablet.",
        options: ["True", "False"],
        answer: 1,
        explain: "„For children we have a syrup. This dose is for adults.“",
      },
      {
        kind: "gapfill",
        text: "There are ___ tablets in the box.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„Twenty. That is ten days.“ — günde iki tane, on gün eder.",
      },
      {
        kind: "short_answer",
        text: "What can happen in the first two days?",
        options: [],
        answer: 0,
        accept: ["you can get tired", "get tired", "tired"],
        explain: "„You can get tired. Don't drive in the first two days.“",
      },
    ],
  },
  {
    id: "en-a2-u7-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 7,
    title: "A morning at the hospital",
    genre: "story",
    intro: "Bir sabah, üç masa: danışma, servis, sigorta. Ne gerekiyordu?",
    gloss: [
      { de: "desk", tr: "masa" },
      { de: "kind", tr: "nazik" },
      { de: "on the way home", tr: "eve dönerken" },
    ],
    minutes: 6,
    text:
      "On Monday my father had an appointment at the hospital. We were there at eight.\n" +
      "First we went to the information desk. The nurse asked for his card and his documents.\n" +
      "Then we had to wait in line for the ward. Ten people were before us and we waited an hour.\n" +
      "The doctor looked at the results from March and said the treatment was working well.\n" +
      "After that we went to the insurance office. A woman gave us a form and asked for a signature.\n" +
      "My father asked: Does my insurance cover this? She said yes, but he has to pay ten euros for the medicine.\n" +
      "Then a nurse showed us the hospital room for Friday. It is a small room with two beds.\n" +
      "On the way home my father said: The waiting was long, but everybody was kind.\n" +
      "Now I know one thing: take the card, the documents and a book.",
    questions: [
      {
        text: "How long did they wait for the ward?",
        options: ["an hour", "ten minutes", "a day"],
        answer: 0,
        explain: "„Ten people were before us and we waited an hour.“",
      },
      {
        text: "What did the woman at the insurance office want?",
        options: ["a signature", "ten euros", "the results"],
        answer: 0,
        explain: "„A woman gave us a form and asked for a signature.“ — para eczane için.",
      },
      {
        kind: "truefalse",
        text: "The insurance covers everything.",
        options: ["True", "False"],
        answer: 1,
        explain: "„She said yes, but he has to pay ten euros for the medicine.“",
      },
      {
        kind: "gapfill",
        text: "The nurse asked for his card and his ___.",
        options: [],
        answer: 0,
        accept: ["documents"],
        explain: "„The nurse asked for his card and his documents.“",
      },
      {
        kind: "order",
        text: "Sabahın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "We went to the information desk.",
          "We waited in line for the ward.",
          "We went to the insurance office.",
          "A nurse showed us the hospital room.",
        ],
        explain: "Önce danışma, sonra kuyruk, sonra sigorta, en son oda.",
      },
      {
        kind: "short_answer",
        text: "What will the writer take next time to read?",
        options: [],
        answer: 0,
        accept: ["a book", "a book to read", "book"],
        explain: "„Now I know one thing: take the card, the documents and a book.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u7-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 7,
    title: "Could you tell me where the ward is?",
    genre: "dialogue",
    intro: "Hastane danışmasında dört soru. Hepsi kibar, hepsi dolaylı.",
    gloss: [
      { de: "patients", tr: "hastalar" },
      { de: "go through", tr: "içinden geçmek" },
      { de: "Get well soon", tr: "geçmiş olsun" },
      { de: "desk", tr: "masa" },
      { de: "You're welcome", tr: "rica ederim" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "Excuse me, could you tell me where the ward is?" },
      { speaker: "Nurse", text: "Which ward? There are three in this building." },
      { speaker: "Ela", text: "I'm not sure. My mother has been here since yesterday. Her name is Nur Aslan." },
      { speaker: "Nurse", text: "One moment. Aslan… yes, ward two. Go through the green door and then to the right." },
      { speaker: "Ela", text: "Do you know how long I can stay?" },
      { speaker: "Nurse", text: "Until seven. And only two people in the room." },
      { speaker: "Ela", text: "Could you tell me where I can find a nurse there?" },
      { speaker: "Nurse", text: "At the desk on the right. Ask for Sena." },
      { speaker: "Ela", text: "One more question: do I have to show my card?" },
      { speaker: "Nurse", text: "No, only the patients show a card. But please write your name in the book." },
      { speaker: "Ela", text: "And where can I buy water?" },
      { speaker: "Nurse", text: "In the shop next to the door. But not in the room, please." },
      { speaker: "Ela", text: "Thank you very much." },
      { speaker: "Nurse", text: "You're welcome. Get well soon — I mean your mother." },
    ],
    questions: [
      {
        text: "Where is ward two?",
        options: ["through the green door, on the right", "in the shop", "next to the book"],
        answer: 0,
        explain: "„Go through the green door and then to the right.“",
      },
      {
        text: "Until when can Ela stay?",
        options: ["until seven", "until two", "until yesterday"],
        answer: 0,
        explain: "„Until seven. And only two people in the room.“",
      },
      {
        kind: "truefalse",
        text: "Ela has to show her card.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, only the patients show a card.“ — kart hastanın, ziyaretçinin değil.",
      },
      {
        kind: "gapfill",
        text: "Ela must write her name in the ___.",
        options: [],
        answer: 0,
        accept: ["book"],
        explain: "„But please write your name in the book.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Could you tell me where I can find a nurse there?", "Could you tell me where I can find a nurse there"],
        explain: "Dolaylı soruda sıra DÜZ cümle gibi: „where I can find“, „where can I find“ değil.",
      },
      {
        kind: "short_answer",
        text: "How many wards are in the building?",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Which ward? There are three in this building.“",
      },
    ],
  },
  {
    id: "en-a2-u7-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 7,
    title: "How often do you exercise?",
    genre: "monologue",
    intro: "Sıradan bir hafta. Sıklık zarfları ve „times a week“ kalıbı bir arada.",
    gloss: [
      { de: "habit", tr: "alışkanlık" },
      { de: "boring", tr: "sıkıcı" },
      { de: "cola", tr: "kola" },
      { de: "the hard part", tr: "zor yanı" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ela", text: "People ask me how I stay healthy. The answer is boring: nothing special." },
      { speaker: "Ela", text: "I usually get up at seven and I walk to work. That is twenty minutes every morning." },
      { speaker: "Ela", text: "I exercise three times a week. On Monday and Wednesday I swim, on Saturday I play football." },
      { speaker: "Ela", text: "I hardly ever drink cola. Sugar is my only problem — I love cake." },
      { speaker: "Ela", text: "My diet is simple: vegetables, rice, fish. I eat meat twice a month, not more." },
      { speaker: "Ela", text: "Protein in the morning helps me. With bread and egg I am not hungry until two." },
      { speaker: "Ela", text: "And I sleep seven hours. That is the hard part, because the phone is always near the bed." },
      { speaker: "Ela", text: "My daily plan is not a diet. It is a habit. A diet stops, a habit doesn't." },
    ],
    questions: [
      {
        text: "How often does Ela exercise?",
        options: ["three times a week", "every day", "twice a month"],
        answer: 0,
        explain: "„I exercise three times a week.“ — ayda iki kez olan et.",
      },
      {
        text: "What is her only problem?",
        options: ["sugar", "meat", "rice"],
        answer: 0,
        explain: "„Sugar is my only problem — I love cake.“",
      },
      {
        kind: "truefalse",
        text: "Ela eats meat every week.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I eat meat twice a month, not more.“",
      },
      {
        kind: "gapfill",
        text: "Ela sleeps ___ hours.",
        options: [],
        answer: 0,
        accept: ["seven", "7"],
        explain: "„And I sleep seven hours. That is the hard part…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I exercise three times a week.", "I exercise three times a week"],
        explain: "Sıklık kalıbı: sayı + „times“ + „a“ + zaman birimi.",
      },
      {
        kind: "short_answer",
        text: "Why is sleep the hard part?",
        options: [],
        answer: 0,
        accept: ["the phone", "the phone is always near the bed", "because of the phone"],
        explain: "„…because the phone is always near the bed.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u7-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 7,
    title: "Take one tablet twice a day",
    genre: "personal",
    intro: "Doz ve sıklık cümlelerini yaz. Sonunda ilaç kartını doldur.",
    gloss: [
      { de: "twice a day", tr: "günde iki kez" },
      { de: "after meals", tr: "öğünlerden sonra" },
      { de: "How many tablets", tr: "kaç tablet" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Günde iki kez bir tablet al.",
        answer: "Take one tablet twice a day.",
        hint: "Emir cümlesi öznesiz başlıyor; sıklık en sonda: twice a day.",
      },
      {
        kind: "build",
        tr: "Onu öğünlerden sonra almalısın.",
        answer: "You should take it after meals.",
        hint: "„should“ sonrası fiil eksiz; „meals“ çoğul, çünkü her öğün.",
      },
      {
        kind: "build",
        tr: "Kaç tablet almalıyım?",
        answer: "How many tablets should I take?",
        hint: "Sayılabilir olduğu için „how many“; soruda „should“ özneden önce.",
      },
      {
        kind: "build",
        tr: "Bir doktora görünmek istiyorum.",
        answer: "I'd like to see a doctor.",
        alternatives: ["I would like to see a doctor."],
        hint: "Hastanede en kibar giriş; „see“ burada „görüşmek“ demek.",
      },
      {
        kind: "form",
        prompt: "İlaç kartını doldur.",
        facts: "Doz bir tablet; günde iki kez; öğünden sonra; yan etki yorgunluk.",
        fields: [
          { label: "Dose", answer: "one tablet", accept: ["1 tablet"] },
          { label: "How often", answer: "twice a day", accept: ["2 times a day"] },
          { label: "When", answer: "after meals", accept: ["after a meal"] },
          { label: "Side effect", answer: "tired", accept: ["you get tired"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u7-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 7,
    title: "Does my insurance cover this?",
    genre: "formal",
    intro: "Sigorta ve bekleme soruları. Sonuncusu ünitenin asıl işi: dolaylı soru.",
    gloss: [
      { de: "cover", tr: "karşılamak" },
      { de: "filled in", tr: "doldurdum" },
      { de: "where the ward is", tr: "servisin nerede olduğunu" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Sigortam bunu karşılıyor mu?",
        answer: "Does my insurance cover this?",
        hint: "Üçüncü tekilde soru „does“ ile; asıl fiil eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "Formu çoktan doldurdum.",
        answer: "I have already filled in the form.",
        alternatives: ["I've already filled in the form."],
        hint: "„already“ yardımcı fiil ile asıl fiilin arasına giriyor.",
      },
      {
        kind: "build",
        tr: "Ne kadar ödemem gerekiyor?",
        answer: "How much do I have to pay?",
        hint: "Para sayılamaz: „how much“. Zorunluluk „have to“, soruda „do“ istiyor.",
      },
      {
        kind: "build",
        tr: "Ne kadar beklemem gerekiyor?",
        answer: "How long do I have to wait?",
        hint: "Süre sorusu „how long“; kalıbın gerisi ödeme sorusuyla birebir aynı.",
      },
      {
        kind: "build",
        tr: "Bana servisin nerede olduğunu söyleyebilir misiniz?",
        answer: "Could you tell me where the ward is?",
        hint: "Dolaylı soruda sıra DÜZ cümleye dönüyor: „where the ward is“, „where is the ward“ değil.",
      },
    ],
  },
];
