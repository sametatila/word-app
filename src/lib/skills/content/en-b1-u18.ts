import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 18 — "Geriye bakmak, gelecek tartışması, muayenehane kaydı, belirtiler".
 *
 * Dört ders: By the time we decided · What happens next ·
 * Joining a practice · Describing symptoms.
 *
 *   Kelime: already, moment, situation, serious, problem, earlier,
 *           solution, matter, increase, soon, fall, grow, system, predict,
 *           hope, society, reception, surgery, list, nurse, file, vaccine,
 *           sick, treatment, fever, cough, sore, pain, dizzy, weak,
 *           stomach, symptom.
 *   Kalıp:  By the time I spoke, they had already decided. ·
 *           The situation had become serious before we met. ·
 *           I had heard about the problem earlier. ·
 *           Prices will increase soon. · The system is going to change. ·
 *           We are discussing society on Friday. ·
 *           You have to bring your ID to reception. ·
 *           You don't have to see a nurse first. ·
 *           You must not lose the file. ·
 *           I have had a fever since Monday. ·
 *           The pain started on Tuesday. ·
 *           I have never had this symptom before.
 *
 * Ünitenin tek öğretme noktası AYNI HASTALIKTA İKİ ZAMAN: „I have had a
 * fever since Monday“ süren durumu, „The pain started on Tuesday“
 * başlangıç ANINI söylüyor. Hekimin sorduğu iki ayrı şey ve İngilizce
 * bunları iki ayrı zamanla ayırıyor. A2 ünite 4 bu ayrımı açmıştı;
 * burada tek bir muayenede ikisi de gerekiyor ve yanlış seçim yanlış
 * bilgi veriyor.
 */
export const enB1U18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u18-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 18,
    title: "Describing symptoms",
    genre: "dialogue",
    intro: "Muayenede iki zaman. Hangisi süre, hangisi başlangıç?",
    gloss: [
      { de: "dizzy", tr: "başı dönen" },
      { de: "worse", tr: "daha kötü" },
      { de: "sentence", tr: "cümle" },
      { de: "winter", tr: "kış" },
      { de: "stand up", tr: "ayağa kalkmak" },
    ],
    minutes: 7,
    text:
      "Doctor: Tell me what is happening, and start with the first thing you noticed.\n" +
      "Ela: I have had a fever since Monday. It has not been very high, but it has not gone.\n" +
      "Doctor: And the pain?\n" +
      "Ela: The pain started on Tuesday. In the stomach, in the morning, and it was gone by the afternoon.\n" +
      "Doctor: Those are two different sentences and I need both. The fever is still here, so I ask how long. The pain has a beginning, so I ask when.\n" +
      "Ela: There is also a cough. That one I have had for about two weeks, before everything else.\n" +
      "Doctor: Before the fever?\n" +
      "Ela: Ten days before. I had not thought about it until now, because it is a small cough and I have one every winter.\n" +
      "Doctor: That may be the most useful thing you have said. Anything else?\n" +
      "Ela: I have never had this symptom before — the dizzy feeling when I stand up. That started on Wednesday and it is worse in the morning.\n" +
      "Doctor: Then we have four things and three of them started in one week. Have you been sleeping?\n" +
      "Ela: Badly, since Monday.\n" +
      "Doctor: Then that is five. Sleep is not a symptom people report, and it is the one I ask about last and write down first.",
    questions: [
      {
        text: "Since when has Ela had a fever?",
        options: ["since Monday", "since Tuesday", "for two weeks"],
        answer: 0,
        explain: "„I have had a fever since Monday. It has not been very high, but it has not gone.“",
      },
      {
        text: "Why does the doctor need both sentences?",
        options: ["the fever is still here, the pain had a beginning", "one is longer", "one is more serious"],
        answer: 0,
        explain: "„The fever is still here, so I ask how long. The pain has a beginning, so I ask when.“",
      },
      {
        kind: "truefalse",
        text: "The cough started after the fever.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Ten days before.“ — öksürük ateşten önce başlamış.",
      },
      {
        kind: "gapfill",
        text: "The dizzy feeling started on ___.",
        options: [],
        answer: 0,
        accept: ["Wednesday"],
        explain: "„That started on Wednesday and it is worse in the morning.“",
      },
      {
        kind: "order",
        text: "Belirtilerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The cough started about two weeks ago.",
          "The fever started on Monday.",
          "The pain started on Tuesday.",
          "The dizzy feeling started on Wednesday.",
        ],
        explain: "Öksürük en eskisi; sonra ateş, ağrı ve baş dönmesi.",
      },
      {
        kind: "short_answer",
        text: "Which symptom does the doctor write down first?",
        options: [],
        answer: 0,
        accept: ["sleep", "the sleeping", "bad sleep"],
        explain: "„Sleep is not a symptom people report, and it is the one I ask about last and write down first.“",
      },
    ],
  },
  {
    id: "en-b1-u18-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 18,
    title: "Joining a practice",
    genre: "info",
    intro: "Kayıt kuralları. Hangisi zorunlu, hangisi değil?",
    gloss: [
      { de: "practice", tr: "muayenehane" },
      { de: "on the list", tr: "listede" },
      { de: "digits", tr: "hane" },
      { de: "anyway", tr: "yine de" },
      { de: "paperwork", tr: "evrak işi" },
    ],
    minutes: 7,
    text:
      "Joining this practice, in the order that saves you a second visit.\n" +
      "You have to bring your ID to reception. Bring the card too if you have one; without the ID nothing starts, and the person at the desk cannot make an exception even when they want to.\n" +
      "You don't have to see a nurse first. That is written on the door of three practices in this city and it is wrong in all of them: the nurse appointment is offered, not required. Take it if you want your file read by somebody before the doctor sees you, which is usually a good idea in the first month.\n" +
      "You must not lose the file number. It is four digits and it is on everything. Photograph it once and the next four years are easier.\n" +
      "The list: new patients are added on the first working day of the month, not on the day you come in. If you register on the second, you are on the list at the beginning of the next month.\n" +
      "Vaccines are booked separately and not with the doctor. That is the one thing everybody gets wrong, because at the old practice it was the same appointment.\n" +
      "If you are sick in the first month and not yet on the list, come anyway. You will be seen. The treatment is the same; the paperwork is worse.",
    questions: [
      {
        text: "What must you bring to reception?",
        options: ["your ID", "the file", "a vaccine card"],
        answer: 0,
        explain: "„You have to bring your ID to reception. … without the ID nothing starts…“",
      },
      {
        text: "What is true about the nurse appointment?",
        options: ["it is offered, not required", "it is required first", "it is only for vaccines"],
        answer: 0,
        explain: "„the nurse appointment is offered, not required.“",
      },
      {
        kind: "truefalse",
        text: "Vaccines are booked with the doctor.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Vaccines are booked separately and not with the doctor.“",
      },
      {
        kind: "gapfill",
        text: "The file number has ___ digits.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„It is four digits and it is on everything.“",
      },
      {
        kind: "short_answer",
        text: "What should you do if you are sick and not on the list?",
        options: [],
        answer: 0,
        accept: ["come anyway", "go there", "come"],
        explain: "„If you are sick in the first month and not yet on the list, come anyway.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u18-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 18,
    title: "By the time we decided",
    genre: "monologue",
    intro: "Geç kalınan bir karar. Ne zaman ciddileşmiş?",
    gloss: [
      { de: "already", tr: "çoktan" },
      { de: "the moment", tr: "an" },
      { de: "earlier", tr: "daha önce" },
      { de: "chain", tr: "zinciri" },
      { de: "neither", tr: "hiçbiri" },
      { de: "sounded", tr: "kulağa geliyordu" },
      { de: "somewhere", tr: "bir yere" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "By the time I spoke, they had already decided. Eleven minutes into a ninety-minute meeting." },
      { speaker: "Mert", text: "That is not a complaint about them. It is the thing I got wrong, and I got it wrong in a way that repeats." },
      { speaker: "Mert", text: "The situation had become serious before we met. Two weeks before, in an email chain I had read and closed." },
      { speaker: "Mert", text: "I had heard about the problem earlier. Twice, from two people, in the corridor, in the way problems always arrive first." },
      { speaker: "Mert", text: "What I did with both was nothing, because neither of them was my work and both of them sounded like a bad week." },
      { speaker: "Mert", text: "The moment to speak was not the meeting. It was the second corridor conversation, when the same thing came from a second direction." },
      { speaker: "Mert", text: "I have a rule now and it is one line: two people, one problem, one email from me that day." },
      { speaker: "Mert", text: "The email does not solve anything. It puts the problem somewhere with a date on it, and after that the meeting is about a thing everybody has read." },
    ],
    questions: [
      {
        text: "When had they decided?",
        options: ["eleven minutes into the meeting", "two weeks before", "after Mert spoke"],
        answer: 0,
        explain: "„By the time I spoke, they had already decided. Eleven minutes into a ninety-minute meeting.“",
      },
      {
        text: "What was the moment to speak?",
        options: ["the second corridor conversation", "the meeting", "the email chain"],
        answer: 0,
        explain: "„It was the second corridor conversation, when the same thing came from a second direction.“",
      },
      {
        kind: "truefalse",
        text: "Mert had not heard about the problem before.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I had heard about the problem earlier. Twice, from two people, in the corridor…“",
      },
      {
        kind: "gapfill",
        text: "The meeting was ___ minutes long.",
        options: [],
        answer: 0,
        accept: ["ninety", "90"],
        explain: "„Eleven minutes into a ninety-minute meeting.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By the time I spoke, they had already decided.", "By the time I spoke, they had already decided"],
        explain: "„already“ „had“ ile üçüncü hâlin arasına giriyor.",
      },
      {
        kind: "short_answer",
        text: "What is Mert's rule now?",
        options: [],
        answer: 0,
        accept: ["one email that day", "send an email", "two people one email"],
        explain: "„two people, one problem, one email from me that day.“",
      },
    ],
  },
  {
    id: "en-b1-u18-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 18,
    title: "What happens next",
    genre: "dialogue",
    intro: "Gelecek konuşuluyor. Hangi cümle öngörü, hangisi plan?",
    gloss: [
      { de: "predict", tr: "öngörmek" },
      { de: "society", tr: "toplum" },
      { de: "confidence", tr: "özgüven" },
      { de: "prediction", tr: "öngörü" },
      { de: "sentence", tr: "cümle" },
      { de: "verb", tr: "fiil" },
      { de: "largest", tr: "en büyük" },
      { de: "whole", tr: "bütün" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "You said in January that prices would fall. They did not." },
      { speaker: "Can", text: "They did not, and I said it with more confidence than I had. Prices will increase soon — that is what I would say now, and I would say it quieter." },
      { speaker: "Sena", text: "Why quieter?" },
      { speaker: "Can", text: "Because a prediction with a date is a promise and a prediction without one is a feeling. I have stopped giving dates." },
      { speaker: "Sena", text: "And the system?" },
      { speaker: "Can", text: "The system is going to change. That one I am sure about, because the decision has been taken and the papers are signed." },
      { speaker: "Sena", text: "So that is not a prediction." },
      { speaker: "Can", text: "It is a plan I have seen. Different word, different sentence, different verb." },
      { speaker: "Sena", text: "Is anybody talking about it?" },
      { speaker: "Can", text: "We are discussing society on Friday, which is the largest subject anybody has put on a Friday." },
      { speaker: "Sena", text: "Ninety minutes for society." },
      { speaker: "Can", text: "Ninety minutes and eleven people, three of whom will speak. I hope somebody brings one number." },
      { speaker: "Sena", text: "Will you?" },
      { speaker: "Can", text: "I will bring one number and no prediction. That is the whole change since January." },
    ],
    questions: [
      {
        text: "What is Can sure about?",
        options: ["the system is going to change", "prices will fall", "Friday will be long"],
        answer: 0,
        explain: "„The system is going to change. That one I am sure about, because the decision has been taken…“",
      },
      {
        text: "Why has Can stopped giving dates?",
        options: ["a prediction with a date is a promise", "dates are hard to remember", "nobody asks"],
        answer: 0,
        explain: "„a prediction with a date is a promise and a prediction without one is a feeling.“",
      },
      {
        kind: "truefalse",
        text: "Prices fell as Can said in January.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You said in January that prices would fall. They did not.“",
      },
      {
        kind: "gapfill",
        text: "___ people will be at the Friday meeting.",
        options: [],
        answer: 0,
        accept: ["Eleven", "eleven", "11"],
        explain: "„Ninety minutes and eleven people, three of whom will speak.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The system is going to change.", "The system is going to change"],
        explain: "„going to“ kanıta dayalı: karar alınmış, kâğıtlar imzalı.",
      },
      {
        kind: "short_answer",
        text: "What will Can bring on Friday?",
        options: [],
        answer: 0,
        accept: ["one number", "a number", "one number and no prediction"],
        explain: "„I will bring one number and no prediction.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u18-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 18,
    title: "I have had a fever since Monday",
    genre: "personal",
    intro: "Aynı hastalık, iki zaman. Hangisi süre, hangisi an?",
    gloss: [
      { de: "since Monday", tr: "pazartesiden beri" },
      { de: "the pain", tr: "ağrı" },
      { de: "this symptom", tr: "bu belirti" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Pazartesiden beri ateşim var.",
        answer: "I have had a fever since Monday.",
        alternatives: ["I've had a fever since Monday."],
        hint: "Hâlâ sürüyor: „since“ ile present perfect.",
      },
      {
        kind: "build",
        tr: "Ağrı salı günü başladı.",
        answer: "The pain started on Tuesday.",
        hint: "Başlangıç ANI: sade geçmiş. Aynı hastalık, başka soru.",
      },
      {
        kind: "build",
        tr: "Bu belirtiyi daha önce hiç yaşamadım.",
        answer: "I have never had this symptom before.",
        hint: "Deneyim: „never“ yardımcı ile asıl fiilin arasında.",
      },
      {
        kind: "build",
        tr: "Kimliğini kayıt masasına getirmek zorundasın.",
        answer: "You have to bring your ID to reception.",
        hint: "Kuraldan gelen zorunluluk; istisna yok.",
      },
      {
        kind: "form",
        prompt: "Belirti kartını doldur.",
        facts: "Ateş pazartesiden beri; ağrı salı başladı; baş dönmesi çarşamba; öksürük iki haftadır.",
        fields: [
          { label: "Fever", answer: "since Monday", accept: ["Monday"] },
          { label: "Pain", answer: "started on Tuesday", accept: ["Tuesday"] },
          { label: "Dizzy", answer: "Wednesday", accept: ["on Wednesday"] },
          { label: "Cough", answer: "two weeks", accept: ["for two weeks"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u18-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 18,
    title: "By the time I spoke, they had already decided",
    genre: "personal",
    intro: "Geçmişin iki katmanı ve geleceğin üç biçimi.",
    gloss: [
      { de: "had already decided", tr: "çoktan karar vermişlerdi" },
      { de: "increase", tr: "artmak" },
      { de: "discussing", tr: "ele alıyoruz" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Ben konuştuğumda onlar çoktan karar vermişlerdi.",
        answer: "By the time I spoke, they had already decided.",
        hint: "„already“ „had“ ile üçüncü hâlin arasına giriyor.",
      },
      {
        kind: "build",
        tr: "Biz buluşmadan önce durum ciddileşmişti.",
        answer: "The situation had become serious before we met.",
        hint: "Önce olan iş „had“ + üçüncü hâl; buluşma sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Fiyatlar yakında artacak.",
        answer: "Prices will increase soon.",
        hint: "Öngörü: „will“. Kanıt değil, kanaat.",
      },
      {
        kind: "build",
        tr: "Düzen değişecek.",
        answer: "The system is going to change.",
        hint: "Kanıta dayalı: karar alınmış, o yüzden „going to“.",
      },
      {
        kind: "build",
        tr: "Cuma günü toplumu ele alıyoruz.",
        answer: "We are discussing society on Friday.",
        hint: "Ayarlanmış: gün belli ve herkes biliyor.",
      },
    ],
  },
];
