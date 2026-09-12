import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 21 — "Vücut, ağrı, doktor randevusu, zorunluluk".
 *
 * Dört ders: Parts of the body · Describing pain · Doctor's appointment ·
 * Must and have to.
 *
 *   Kelime: body, head, hand, arm, leg, ear, knee, shoulder, hurt, pain,
 *           feel, bad, headache, heart, blood, finger, doctor,
 *           appointment, sick, help, tomorrow, patient, be there, degree,
 *           must, need, stay, take, wait, do, be right, lock.
 *   Kalıp:  This is my hand. · Is this your arm? · my / your + kelime ·
 *           I have a headache. · My back hurts. · I don't feel well. ·
 *           I need a doctor. · I need an appointment. · At ten o'clock. ·
 *           I must go. · You have to wait here. · Do I have to pay?
 *
 * Ağrıyı söylemenin İKİ yolu var ve ikisi de doğru: „My back hurts“
 * (organ özne, fiil „hurt“) ve „I have a headache“ (kişi özne, ağrı
 * nesne). Türkçe yalnız birincisini kuruyor ("sırtım ağrıyor") ve öğrenci
 * „I have a backache“ demeyi hiç düşünmüyor. İçerik ikisini aynı
 * diyalogda yan yana kullanıyor.
 */
export const enA1U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u21-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 21,
    title: "At the doctor",
    genre: "dialogue",
    intro: "Randevu alınıyor. Ne zaman, ne yapmak zorunda, ne değil?",
    gloss: [
      { de: "since", tr: "-den beri" },
      { de: "bring", tr: "getirmek" },
      { de: "problem", tr: "sorun" },
    ],
    minutes: 4,
    text:
      "Ela: Good morning. I need a doctor. Can I have an appointment today?\n" +
      "Clerk: Good morning. What is the problem?\n" +
      "Ela: I don't feel well. I have a headache and my back hurts.\n" +
      "Clerk: Since when?\n" +
      "Ela: Since Monday. And I feel cold — maybe thirty-eight degrees.\n" +
      "Clerk: I understand. The doctor is here at ten o'clock.\n" +
      "Ela: Do I have to wait?\n" +
      "Clerk: Yes, a little. You have to wait here, please. Take this paper.\n" +
      "Ela: And do I have to pay?\n" +
      "Clerk: No, not today. But you must bring your card tomorrow.\n" +
      "Ela: Thank you. My arm hurts too — is that bad?\n" +
      "Clerk: The doctor says that. Be patient, please.",
    questions: [
      {
        text: "What does Ela need?",
        options: ["an appointment", "a paper", "a card"],
        answer: 0,
        explain: "„I need a doctor. Can I have an appointment today?“ — kâğıt ve kart sonra geliyor.",
      },
      {
        text: "When is the doctor there?",
        options: ["at ten o'clock", "tomorrow", "on Monday"],
        answer: 0,
        explain: "„The doctor is here at ten o'clock.“ — pazartesi ağrının başladığı gün.",
      },
      {
        kind: "truefalse",
        text: "Ela has to bring her card tomorrow.",
        options: ["True", "False"],
        answer: 0,
        explain: "„No, not today. But you must bring your card tomorrow.“",
      },
      {
        kind: "gapfill",
        text: "Ela has a ___ and her back hurts.",
        options: [],
        answer: 0,
        accept: ["headache"],
        explain: "„I have a headache and my back hurts.“ — aynı cümlede iki ayrı kalıp.",
      },
      {
        kind: "short_answer",
        text: "What must Ela bring tomorrow?",
        options: [],
        answer: 0,
        accept: ["her card", "the card", "card"],
        explain: "„But you must bring your card tomorrow.“",
      },
    ],
  },
  {
    id: "en-a1-u21-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 21,
    title: "Parts of the body",
    genre: "guide",
    intro: "Vücut bölümleri ve ağrının iki söyleniş biçimi.",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "side", tr: "taraf" },
      { de: "something", tr: "bir şey" },
    ],
    minutes: 4,
    text:
      "This is my body. This is my head, and these are my ears. My hands have five fingers each.\n\n" +
      "Is this your arm? Yes, and this is my shoulder. The leg is long and the knee is in the middle of it.\n\n" +
      "Where is the heart? On the left side, in the body. The blood goes from the heart to every finger.\n\n" +
      "When something hurts, we say: \"My head hurts\" or \"I have a headache.\" Both are good English. If you feel very bad, you must go to a doctor.",
    questions: [
      {
        text: "How many fingers has each hand?",
        options: ["five", "two", "ten"],
        answer: 0,
        explain: "„My hands have five fingers each.“ — „each“ el başına demek.",
      },
      {
        text: "Where is the heart?",
        options: ["on the left side", "in the head", "in the knee"],
        answer: 0,
        explain: "„Where is the heart? On the left side, in the body.“",
      },
      {
        kind: "truefalse",
        text: "The knee is in the arm.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The leg is long and the knee is in the middle of it.“ — diz bacakta.",
      },
      {
        kind: "gapfill",
        text: "The blood goes from the heart to every ___.",
        options: [],
        answer: 0,
        accept: ["finger"],
        explain: "„The blood goes from the heart to every finger.“",
      },
      {
        kind: "short_answer",
        text: "What must you do when you feel very bad?",
        options: [],
        answer: 0,
        accept: ["go to a doctor", "see a doctor", "a doctor"],
        explain: "„If you feel very bad, you must go to a doctor.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u21-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 21,
    title: "My back hurts",
    genre: "dialogue",
    intro: "Doktor muayenesi. Ne ağrıyor, ne ağrımıyor, ne yapmak gerekiyor?",
    gloss: [
      { de: "since", tr: "-den beri" },
      { de: "pain", tr: "ağrı" },
      { de: "stay at home", tr: "evde kalmak" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Doctor", text: "Good morning. What is the problem?" },
      { speaker: "Kaan", text: "I don't feel well. My back hurts." },
      { speaker: "Doctor", text: "Since when?" },
      { speaker: "Kaan", text: "Since three days. And my shoulder hurts too." },
      { speaker: "Doctor", text: "Do you have a headache?" },
      { speaker: "Kaan", text: "No, no headache. But I can't carry a box." },
      { speaker: "Doctor", text: "I understand. Is the pain in the left or the right shoulder?" },
      { speaker: "Kaan", text: "The right. And sometimes my arm." },
      { speaker: "Doctor", text: "Do you work with your hands?" },
      { speaker: "Kaan", text: "Yes, every day. I carry heavy boxes." },
      { speaker: "Doctor", text: "Then you must stay at home for one week. No heavy work." },
      { speaker: "Kaan", text: "One week! And my leg is good?" },
      { speaker: "Doctor", text: "Your leg is fine. Come again on Monday." },
    ],
    questions: [
      {
        text: "What hurts?",
        options: ["the back and the shoulder", "the head", "the leg"],
        answer: 0,
        explain: "„My back hurts… And my shoulder hurts too.“ — baş ve bacak iyi.",
      },
      {
        text: "Which shoulder hurts?",
        options: ["the right", "the left", "both"],
        answer: 0,
        explain: "„Is the pain in the left or the right shoulder? — The right.“",
      },
      {
        kind: "truefalse",
        text: "Kaan has a headache.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, no headache. But I can't carry a box.“",
      },
      {
        kind: "gapfill",
        text: "Kaan must stay at home for one ___.",
        options: [],
        answer: 0,
        accept: ["week"],
        explain: "„Then you must stay at home for one week. No heavy work.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My back hurts.", "My back hurts"],
        explain: "„My back hurts.“ — organ özne, fiil „hurt“ ve üçüncü tekil kişide „-s“.",
      },
      {
        kind: "short_answer",
        text: "When does Kaan come again?",
        options: [],
        answer: 0,
        accept: ["on Monday", "Monday"],
        explain: "„Your leg is fine. Come again on Monday.“",
      },
    ],
  },
  {
    id: "en-a1-u21-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 21,
    title: "Must and have to",
    genre: "monologue",
    intro: "Bir günün zorunlulukları. „must“ ile „have to“ art arda geçiyor.",
    gloss: [
      { de: "home", tr: "ev" },
      { de: "lock", tr: "kilitlemek" },
      { de: "nothing else", tr: "başka bir şey yok" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Nil", text: "Today I have many things to do. First, I must go to the doctor." },
      { speaker: "Nil", text: "I have an appointment at ten o'clock. I have to be there at a quarter to ten." },
      { speaker: "Nil", text: "I don't feel well: I have a headache and my knee hurts." },
      { speaker: "Nil", text: "After the doctor I have to wait for the medicine. Then I take the bus home." },
      { speaker: "Nil", text: "At home I must lock the door. My neighbour is sick too, so I can't ask her." },
      { speaker: "Nil", text: "In the evening I need a warm bed and nothing else. That is my plan." },
    ],
    questions: [
      {
        text: "When is the appointment?",
        options: ["at ten o'clock", "at a quarter to ten", "in the evening"],
        answer: 0,
        explain: "„I have an appointment at ten o'clock.“ — çeyrek kala orada olma saati.",
      },
      {
        text: "What hurts?",
        options: ["her head and her knee", "her back", "her arm"],
        answer: 0,
        explain: "„I have a headache and my knee hurts.“ — iki kalıp aynı cümlede.",
      },
      {
        kind: "truefalse",
        text: "Nil's neighbour can help her.",
        options: ["True", "False"],
        answer: 1,
        explain: "„My neighbour is sick too, so I can't ask her.“",
      },
      {
        kind: "gapfill",
        text: "At home Nil must ___ the door.",
        options: [],
        answer: 0,
        accept: ["lock"],
        explain: "„At home I must lock the door.“",
      },
      {
        kind: "order",
        text: "Nil'in gününün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "First, I must go to the doctor.",
          "After the doctor I have to wait for the medicine.",
          "At home I must lock the door.",
          "In the evening I need a warm bed.",
        ],
        explain: "Önce doktor, sonra ilaç, sonra ev, en son akşam.",
      },
      {
        kind: "short_answer",
        text: "What does Nil wait for after the doctor?",
        options: [],
        answer: 0,
        accept: ["the medicine", "medicine"],
        explain: "„After the doctor I have to wait for the medicine.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u21-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 21,
    title: "I have a headache",
    genre: "personal",
    intro: "Ağrıyı iki biçimde de yaz. Sonunda randevu formunu doldur.",
    gloss: [
      { de: "I have a headache.", tr: "başım ağrıyor" },
      { de: "My back hurts.", tr: "sırtım ağrıyor" },
      { de: "I don't feel well.", tr: "kendimi iyi hissetmiyorum" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Başım ağrıyor.",
        answer: "I have a headache.",
        hint: "Burada kişi özne, ağrı nesne. „headache“ tek sözcük ve önünde „a“ var.",
      },
      {
        kind: "build",
        tr: "Sırtım ağrıyor.",
        answer: "My back hurts.",
        hint: "Burada organ özne ve fiil „hurt“. Üçüncü tekil kişi olduğu için „-s“: hurts.",
      },
      {
        kind: "build",
        tr: "Kendimi iyi hissetmiyorum.",
        answer: "I don't feel well.",
        hint: "„well“ zarf ve „feel“ ile geliyor; „I don't feel good“ da duyulur ama bu daha doğru.",
      },
      {
        kind: "build",
        tr: "Bir doktora ihtiyacım var.",
        answer: "I need a doctor.",
        hint: "„need“ nesnesini doğrudan alır; „need to a doctor“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Randevu formunu doldur.",
        facts: "Doktor randevusu; yarın; saat onda; baş ağrısı.",
        fields: [
          { label: "Doctor", answer: "yes", accept: ["a doctor"] },
          { label: "Day", answer: "tomorrow" },
          { label: "Time", answer: "ten o'clock", accept: ["at ten", "10"] },
          { label: "Problem", answer: "headache", accept: ["a headache"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u21-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 21,
    title: "I must go",
    genre: "personal",
    intro: "Zorunluluk ve iyelik yaz. „must“ ile „have to“ aynı işi görüyor ama biçimleri farklı.",
    gloss: [
      { de: "I must go.", tr: "gitmeliyim" },
      { de: "You have to wait here.", tr: "burada beklemek zorundasın" },
      { de: "Do I have to pay?", tr: "ödemek zorunda mıyım" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Gitmeliyim.",
        answer: "I must go.",
        hint: "„must“ kişiye göre değişmez ve sonrası eksiz fiil: must go.",
      },
      {
        kind: "build",
        tr: "Burada beklemek zorundasın.",
        answer: "You have to wait here.",
        hint: "„have to“ sonrası „to“ + fiil. Aynı anlam, başka biçim.",
      },
      {
        kind: "build",
        tr: "Ödemek zorunda mıyım?",
        answer: "Do I have to pay?",
        hint: "„have to“nun sorusu „do“ ile kuruluyor; „must“ olsaydı „Must I pay?“ olurdu.",
      },
      {
        kind: "build",
        tr: "Bu benim elim.",
        answer: "This is my hand.",
        hint: "İyelik ayrı bir sözcük: my hand. Türkçedeki ek burada yok.",
      },
      {
        kind: "build",
        tr: "Bu senin kolun mu?",
        answer: "Is this your arm?",
        hint: "Soruda „be“ öne geçiyor: this is → is this.",
      },
    ],
  },
];
