import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 6 — "Şikâyet, randevu, öğüt, süre sorusu".
 *
 * Dört ders: Describing symptoms · Changing an appointment ·
 * You should rest · How long have you...?
 *
 *   Kelime: cough, fever, sore, dizzy, tired, illness, stomach,
 *           have a cold, appointment, cancel, earlier, available, urgent,
 *           call back, let know, doctor's office, should, rest, avoid,
 *           drink, enough, advice, vitamin, relax, hurt, week, since,
 *           start, worse, for days, get tired, condition.
 *   Kalıp:  I have a fever. · My throat is sore. ·
 *           I've had a cough for three days. ·
 *           I'd like to change my appointment. ·
 *           Do you have anything earlier? ·
 *           I need to cancel my appointment on Friday. ·
 *           You should … · You shouldn't … · Should I …? ·
 *           How long have you had …? · I've had it for two weeks. ·
 *           I've had it since Monday.
 *
 * Ünite A1'in „should“unu geri getiriyor ama başka bir işte: orada genel
 * öğüttü, burada HEKİM dilinin parçası. Yanına ünite 4'ün „since/for“u da
 * geliyor ve ikisi birleşiyor: „How long have you had it?“ — şikâyetin
 * süresi hekimin ilk sorusu. İçerik bu birleşmeyi üç egzersizde de
 * kuruyor.
 */
export const enA2U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u6-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 6,
    title: "Describing symptoms",
    genre: "dialogue",
    intro: "Hekimde şikâyet anlatılıyor. Ne kadar zamandır, ne kadar ciddi?",
    gloss: [
      { de: "sore", tr: "ağrılı" },
      { de: "dizzy", tr: "başı dönen" },
      { de: "illness", tr: "hastalık" },
    ],
    minutes: 5,
    text:
      "Doctor: Good morning. What is the problem?\n" +
      "Ela: I have a fever and my throat is sore. I've had a cough for three days.\n" +
      "Doctor: How long have you had the fever?\n" +
      "Ela: Since Monday. It started in the evening.\n" +
      "Doctor: And is it worse now or better?\n" +
      "Ela: Worse. Yesterday I was dizzy in the morning and I couldn't work.\n" +
      "Doctor: Do you have a pain in the stomach?\n" +
      "Ela: No, only the throat and the head.\n" +
      "Doctor: It is a cold, not a serious illness. You should rest for a week.\n" +
      "Ela: A week! I have a lot of work.\n" +
      "Doctor: Then you will be ill for a month. You should drink enough water, avoid cold drinks and relax.\n" +
      "Ela: Should I take vitamins?\n" +
      "Doctor: They don't hurt. But rest is the best medicine.",
    questions: [
      {
        text: "How long has Ela had a cough?",
        options: ["three days", "one week", "one month"],
        answer: 0,
        explain: "„I've had a cough for three days.“ — ateş pazartesiden beri, ayrı bir süre.",
      },
      {
        text: "What does the doctor say Ela should do?",
        options: ["rest for a week", "take vitamins", "avoid water"],
        answer: 0,
        explain: "„You should rest for a week.“ — vitaminler zararsız ama asıl ilaç dinlenmek.",
      },
      {
        kind: "truefalse",
        text: "Ela has a pain in the stomach.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, only the throat and the head.“",
      },
      {
        kind: "gapfill",
        text: "Ela has had the fever since ___.",
        options: [],
        answer: 0,
        accept: ["Monday"],
        explain: "„Since Monday. It started in the evening.“ — başlangıç noktası: „since“.",
      },
      {
        kind: "short_answer",
        text: "What is the best medicine?",
        options: [],
        answer: 0,
        accept: ["rest", "resting", "to rest"],
        explain: "„But rest is the best medicine.“",
      },
    ],
  },
  {
    id: "en-a2-u6-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 6,
    title: "Changing an appointment",
    genre: "phone",
    intro: "Randevu değiştiriliyor. Hangi gün kalıyor, hangisi iptal?",
    gloss: [
      { de: "Let me look", tr: "bir bakayım" },
      { de: "available", tr: "müsait" },
      { de: "call back", tr: "geri aramak" },
    ],
    minutes: 5,
    text:
      "Deniz: Good morning. I'd like to change my appointment.\n" +
      "Office: Of course. What is your name?\n" +
      "Deniz: Deniz Kaya. The appointment is on Friday at ten.\n" +
      "Office: I see it. When would you like to come?\n" +
      "Deniz: Do you have anything earlier? Friday is too late for me.\n" +
      "Office: Let me look. Wednesday at two is available. Or Thursday at half past eight.\n" +
      "Deniz: Thursday is better. Half past eight is fine.\n" +
      "Office: Good. And Friday? Do I cancel it?\n" +
      "Deniz: Yes, please cancel it.\n" +
      "Office: Is the problem urgent?\n" +
      "Deniz: Not urgent, but I have had the pain for two weeks and it is getting worse.\n" +
      "Office: Then Thursday is good. If it is worse tomorrow, call back and we find something today.\n" +
      "Deniz: Thank you. I'll let you know.",
    questions: [
      {
        text: "When is the new appointment?",
        options: ["Thursday at half past eight", "Wednesday at two", "Friday at ten"],
        answer: 0,
        explain: "„Thursday is better. Half past eight is fine.“ — çarşamba teklif edildi ama alınmadı.",
      },
      {
        text: "What happens to the Friday appointment?",
        options: ["it is cancelled", "it stays", "it moves to two"],
        answer: 0,
        explain: "„Do I cancel it? — Yes, please cancel it.“",
      },
      {
        kind: "truefalse",
        text: "The problem is urgent.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not urgent, but I have had the pain for two weeks and it is getting worse.“",
      },
      {
        kind: "gapfill",
        text: "Deniz has had the pain for ___ weeks.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„…I have had the pain for two weeks…“ — süre olduğu için „for“.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I'd like to change my appointment.",
          "Do you have anything earlier?",
          "Thursday is better.",
          "Yes, please cancel it.",
        ],
        explain: "Önce istek, sonra soru, sonra yeni gün, en son eskisinin iptali.",
      },
      {
        kind: "short_answer",
        text: "What should Deniz do if it is worse tomorrow?",
        options: [],
        answer: 0,
        accept: ["call back", "call the office", "call"],
        explain: "„If it is worse tomorrow, call back and we find something today.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u6-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 6,
    title: "You should rest",
    genre: "dialogue",
    intro: "Arkadaş öğüdü. „should“ ve „shouldn't“ hekim dilinde de aynı işi görüyor.",
    gloss: [
      { de: "until", tr: "-e kadar" },
      { de: "advice", tr: "tavsiye" },
      { de: "let them know", tr: "haber vermek" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nil", text: "You look tired. What is wrong?" },
      { speaker: "Can", text: "I have had a cold for a week. And I get tired after two hours at work." },
      { speaker: "Nil", text: "A week! You should go to the doctor." },
      { speaker: "Can", text: "I have an appointment on Thursday." },
      { speaker: "Nil", text: "Good. Until then you should rest and drink enough water." },
      { speaker: "Can", text: "I drink coffee." },
      { speaker: "Nil", text: "You shouldn't drink coffee with a fever! You should avoid it." },
      { speaker: "Can", text: "And my throat is sore. Should I take something?" },
      { speaker: "Nil", text: "Warm tea with lemon. My grandmother's advice — and it works." },
      { speaker: "Can", text: "Should I stay at home tomorrow?" },
      { speaker: "Nil", text: "Of course. Call your office and let them know." },
      { speaker: "Can", text: "Then I will. Thank you for the advice." },
      { speaker: "Nil", text: "Get better soon. And relax — the work can wait." },
    ],
    questions: [
      {
        text: "How long has Can had a cold?",
        options: ["a week", "two hours", "since Thursday"],
        answer: 0,
        explain: "„I have had a cold for a week.“ — iki saat işte dayanabildiği süre.",
      },
      {
        text: "What shouldn't Can drink?",
        options: ["coffee", "warm tea", "water"],
        answer: 0,
        explain: "„You shouldn't drink coffee with a fever! You should avoid it.“",
      },
      {
        kind: "truefalse",
        text: "Can has no appointment.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have an appointment on Thursday.“",
      },
      {
        kind: "gapfill",
        text: "Nil says: warm tea with ___.",
        options: [],
        answer: 0,
        accept: ["lemon"],
        explain: "„Warm tea with lemon. My grandmother's advice — and it works.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You should go to the doctor.", "You should go to the doctor"],
        explain: "„You should go to the doctor.“ — „should“ sonrası fiil eksiz.",
      },
      {
        kind: "short_answer",
        text: "What should Can do tomorrow?",
        options: [],
        answer: 0,
        accept: ["stay at home", "stay home", "rest"],
        explain: "„Should I stay at home tomorrow? — Of course.“",
      },
    ],
  },
  {
    id: "en-a2-u6-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 6,
    title: "How long have you had it?",
    genre: "monologue",
    intro: "Altı aylık bir ağrı. Üç hekim, üç ayrı cevap.",
    gloss: [
      { de: "desk", tr: "masa" },
      { de: "stand", tr: "ayakta durmak" },
      { de: "condition", tr: "hâl" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Ela", text: "My knee has hurt since March. That is six months." },
      { speaker: "Ela", text: "At first it was only after sport. Then it was every evening. Now it hurts in the morning too." },
      { speaker: "Ela", text: "I have had three appointments this year. The first doctor said: rest. The second said: sport." },
      { speaker: "Ela", text: "The third one asked the right question: How long have you had it and when is it worse?" },
      { speaker: "Ela", text: "I said: I've had it for six months and it is worse when I sit for hours." },
      { speaker: "Ela", text: "Now I stand at my desk two hours a day. The condition is better. Sometimes a question is the medicine." },
    ],
    questions: [
      {
        text: "How long has Ela's knee hurt?",
        options: ["six months", "three years", "two hours"],
        answer: 0,
        explain: "„My knee has hurt since March. That is six months.“ — aynı süre iki biçimde.",
      },
      {
        text: "When is the pain worse?",
        options: ["when she sits for hours", "after sport only", "in the morning only"],
        answer: 0,
        explain: "„…it is worse when I sit for hours.“ — spordan sonra olması başlangıçtaki hâliydi.",
      },
      {
        kind: "truefalse",
        text: "The first doctor asked how long she had had it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The third one asked the right question…“ — ilki yalnız „rest“ dedi.",
      },
      {
        kind: "gapfill",
        text: "Ela has had ___ appointments this year.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„I have had three appointments this year.“",
      },
      {
        kind: "order",
        text: "Anlatımın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "My knee has hurt since March.",
          "At first it was only after sport.",
          "I have had three appointments this year.",
          "Now I stand at my desk two hours a day.",
        ],
        explain: "Önce süre, sonra gelişim, sonra hekimler, en son bugünkü çözüm.",
      },
      {
        kind: "short_answer",
        text: "What does Ela do now for two hours a day?",
        options: [],
        answer: 0,
        accept: ["stand at her desk", "stand", "she stands"],
        explain: "„Now I stand at my desk two hours a day.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u6-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 6,
    title: "I have a fever",
    genre: "personal",
    intro: "Şikâyeti ve süresini yaz. Sonunda şikâyet formunu doldur.",
    gloss: [
      { de: "I have a fever.", tr: "ateşim var" },
      { de: "My throat is sore.", tr: "boğazım ağrıyor" },
      { de: "for three days", tr: "üç gündür" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Ateşim var.",
        answer: "I have a fever.",
        hint: "Şikâyette „have“ ile: I have a fever, a cough, a cold.",
      },
      {
        kind: "build",
        tr: "Boğazım ağrıyor.",
        answer: "My throat is sore.",
        hint: "Burada organ özne ve „sore“ sıfat; „hurt“ ile de kurulabilirdi.",
      },
      {
        kind: "build",
        tr: "Üç gündür öksürüğüm var.",
        answer: "I've had a cough for three days.",
        alternatives: ["I have had a cough for three days."],
        hint: "Hâlâ sürüyor: „have had“. Süre olduğu için „for“.",
      },
      {
        kind: "build",
        tr: "Ne zamandır var?",
        answer: "How long have you had it?",
        hint: "Hekimin ilk sorusu. „had“ iki kez geçiyor gibi görünüyor ama biri yardımcı.",
      },
      {
        kind: "form",
        prompt: "Şikâyet formunu doldur.",
        facts: "Ateş var; boğaz ağrılı; öksürük üç gündür; ateş pazartesiden beri.",
        fields: [
          { label: "Fever", answer: "yes", accept: ["a fever"] },
          { label: "Throat", answer: "sore" },
          { label: "Cough", answer: "three days", accept: ["3 days", "for three days"] },
          { label: "Since", answer: "Monday", accept: ["since Monday"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u6-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 6,
    title: "I'd like to change my appointment",
    genre: "formal",
    intro: "Randevu ve öğüt cümlelerini yaz.",
    gloss: [
      { de: "change my appointment", tr: "randevumu değiştirmek" },
      { de: "anything earlier", tr: "daha erken bir şey" },
      { de: "cancel", tr: "iptal etmek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Randevumu değiştirmek istiyorum.",
        answer: "I'd like to change my appointment.",
        alternatives: ["I would like to change my appointment."],
        hint: "Telefonda en kibar istek biçimi; „I want“ kaba kaçar.",
      },
      {
        kind: "build",
        tr: "Daha erken bir şey var mı?",
        answer: "Do you have anything earlier?",
        hint: "„anything“ soruda; sıfat isimden SONRA geliyor: anything earlier.",
      },
      {
        kind: "build",
        tr: "Cuma günkü randevumu iptal etmem gerekiyor.",
        answer: "I need to cancel my appointment on Friday.",
        hint: "„need“ sonrası „to“ + fiil. Gün „on“ ile.",
      },
      {
        kind: "build",
        tr: "Dinlenmelisin.",
        answer: "You should rest.",
        hint: "„rest“ burada fiil; isim olarak da aynı yazılıyor.",
      },
      {
        kind: "build",
        tr: "İki haftadır var.",
        answer: "I've had it for two weeks.",
        alternatives: ["I have had it for two weeks."],
        hint: "Nesne „it“ zorunlu; süre „for“ ile geliyor.",
      },
    ],
  },
];
