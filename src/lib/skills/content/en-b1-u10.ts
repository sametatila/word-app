import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 10 — "Randevu, yönerge, karışıklık, karar".
 *
 * Dört ders: Changing the appointment · Step by step · The mix-up ·
 * Making up my mind.
 *
 *   Kelime: appointment, cancel, reschedule, confirm, slot, diary, clinic,
 *           booking, instruction, step, careful, press, avoid, ensure,
 *           safety, tool, confusion, swap, mistake, spot, sort, double,
 *           blame, correct, consider, advantage, disadvantage, weigh,
 *           conclusion, convince, overall, opinion.
 *   Kalıp:  I am seeing the doctor on Thursday. ·
 *           I am going to cancel the booking. ·
 *           I will confirm it this evening. ·
 *           You must read every instruction first. ·
 *           You mustn't press both buttons. ·
 *           You should ensure the tool is dry. ·
 *           They had sent the wrong box. · Then I spotted the mistake. ·
 *           By the time I called, they had corrected it. ·
 *           She said that it would be cheaper. ·
 *           He told me to think about it again. ·
 *           They asked if I had decided.
 *
 * Ünitenin tek öğretme noktası „HAD“İN İKİ AYRI İŞİ. Anlatıda „daha
 * önce“ demek için geliyor („They had sent the wrong box“); dolaylı
 * anlatımda ise zamanın bir basamak geri kaymasından doğuyor („They asked
 * if I had decided“ — söylenen cümle „have you decided“ idi). Biçim aynı,
 * gerekçesi başka, ve öğrenci ikisini tek kural sanınca yanlış yerlerde
 * kullanıyor.
 */
export const enB1U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u10-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 10,
    title: "The mix-up",
    genre: "story",
    intro: "Yanlış kutu. Hangi olay hangisinden önce oldu?",
    gloss: [
      { de: "warehouse", tr: "depo" },
      { de: "swapped", tr: "yer değiştirmiş" },
      { de: "large", tr: "büyük" },
      { de: "system", tr: "sistem" },
      { de: "per order", tr: "sipariş başına" },
      { de: "the real confusion", tr: "asıl karışıklık" },
      { de: "neither", tr: "hiçbiri" },
    ],
    minutes: 7,
    text:
      "They had sent the wrong box. That is the end of the story and I am starting with it, because everything else is about when each person found out.\n" +
      "The box arrived on Tuesday. I opened it on Wednesday evening, after work, and I did not spot the mistake. The label was right. The number on the label was right. Everything inside was wrong.\n" +
      "Then I spotted the mistake, on Thursday morning, when I needed the small tool and found a large one. Two orders had been swapped in the warehouse on Monday, which means the wrong box had been on its way to me before I had even paid.\n" +
      "By the time I called, they had corrected it. Somebody in the warehouse had found the second box on Wednesday and had sent it on the same afternoon. Nobody told me, because the system sends one message per order and that message had already gone.\n" +
      "So the real confusion was not the box. It was four days in which two people were sorting the same problem and neither knew about the other.\n" +
      "I do not blame anybody for the swap. I blame the message that was sent once and could not be sent again.",
    questions: [
      {
        text: "When did the writer spot the mistake?",
        options: ["on Thursday morning", "on Tuesday", "on Wednesday evening"],
        answer: 0,
        explain: "„Then I spotted the mistake, on Thursday morning, when I needed the small tool…“",
      },
      {
        text: "What had happened by the time the writer called?",
        options: ["they had corrected it", "they had lost the box", "they had sent a message"],
        answer: 0,
        explain: "„By the time I called, they had corrected it.“",
      },
      {
        kind: "truefalse",
        text: "The label on the box was wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The label was right. The number on the label was right. Everything inside was wrong.“",
      },
      {
        kind: "gapfill",
        text: "The two orders were swapped on ___.",
        options: [],
        answer: 0,
        accept: ["Monday"],
        explain: "„Two orders had been swapped in the warehouse on Monday…“",
      },
      {
        kind: "order",
        text: "Olayların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Two orders were swapped in the warehouse.",
          "The box arrived on Tuesday.",
          "The warehouse sent the second box.",
          "I spotted the mistake on Thursday.",
        ],
        explain: "Pazartesi karışıklık, salı teslim, çarşamba düzeltme, perşembe fark ediş.",
      },
      {
        kind: "short_answer",
        text: "What does the writer blame?",
        options: [],
        answer: 0,
        accept: ["the message", "the one message", "a message sent once"],
        explain: "„I blame the message that was sent once and could not be sent again.“",
      },
    ],
  },
  {
    id: "en-b1-u10-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 10,
    title: "Making up my mind",
    genre: "opinion",
    intro: "İki seçenek tartılıyor. Aktarılan cümlelerde zaman nereye kayıyor?",
    gloss: [
      { de: "paragraph", tr: "paragraf" },
      { de: "column", tr: "sütun" },
      { de: "survived", tr: "ayakta kaldı" },
    ],
    minutes: 7,
    text:
      "Two offers, one week, and four people who all wanted to help.\n" +
      "She said that it would be cheaper. That was the first opinion and it was correct: the second offer costs a hundred and twenty euros less a year. She had worked it out on paper before she said it, which is why I listened.\n" +
      "He told me to think about it again. Not because the number was wrong — because I had only considered the price. The disadvantage was in the second paragraph and I had read it twice without seeing it.\n" +
      "Then they asked if I had decided. That question came on Thursday and the honest answer was: I had decided three times and changed it twice.\n" +
      "So I did the boring thing. Two columns, advantages on the left, disadvantages on the right, and one rule: nothing goes in a column unless I can put a number next to it.\n" +
      "Four lines survived. Overall the first offer won by one line, and that line was not the price.\n" +
      "The conclusion I took away is not about offers. A choice with eleven reasons is a choice nobody has weighed. A choice with four is one you can explain to somebody else.",
    questions: [
      {
        text: "What did she say?",
        options: ["that it would be cheaper", "that it was better", "that it would take longer"],
        answer: 0,
        explain: "„She said that it would be cheaper.“ — aktarılınca „will“ „would“ oluyor.",
      },
      {
        text: "Why did he say to think again?",
        options: ["only the price had been considered", "the number was wrong", "the paper was lost"],
        answer: 0,
        explain: "„Not because the number was wrong — because I had only considered the price.“",
      },
      {
        kind: "truefalse",
        text: "The writer had decided once.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I had decided three times and changed it twice.“",
      },
      {
        kind: "gapfill",
        text: "The second offer costs a hundred and ___ euros less.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„the second offer costs a hundred and twenty euros less a year.“",
      },
      {
        kind: "short_answer",
        text: "What is the rule for the two columns?",
        options: [],
        answer: 0,
        accept: ["a number next to it", "it needs a number", "put a number"],
        explain: "„nothing goes in a column unless I can put a number next to it.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u10-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 10,
    title: "Changing the appointment",
    genre: "phone",
    intro: "Randevu değişiyor. Hangi cümle ayarlanmış, hangisi plan?",
    gloss: [
      { de: "slot", tr: "boş saat" },
      { de: "diary", tr: "ajanda" },
      { de: "double", tr: "çift" },
      { de: "the fourteenth", tr: "on dördü" },
      { de: "neither", tr: "hiçbiri" },
      { de: "anywhere", tr: "herhangi bir yerde" },
      { de: "system", tr: "sistem" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Clinic", text: "Good morning, the clinic." },
      { speaker: "Nil", text: "Hello. I am seeing the doctor on Thursday at four and I need to move it." },
      { speaker: "Clinic", text: "Let me look. Thursday the fourteenth?" },
      { speaker: "Nil", text: "That one. I am going to cancel the booking if there is nothing next week." },
      { speaker: "Clinic", text: "There is a slot on Tuesday at nine and one on Friday at half past five." },
      { speaker: "Nil", text: "Friday. Nine in the morning is the one hour I cannot do." },
      { speaker: "Clinic", text: "Friday the twenty-second, half past five. I have put it in." },
      { speaker: "Nil", text: "I will confirm it this evening by email. Then we both have it in writing." },
      { speaker: "Clinic", text: "You do not have to, but it helps. Two people wrote last week and neither had a double booking." },
      { speaker: "Nil", text: "And Thursday is gone from the diary?" },
      { speaker: "Clinic", text: "Gone. If you see it anywhere, tell me, because that means the system kept it." },
      { speaker: "Nil", text: "Is there anything I should bring?" },
      { speaker: "Clinic", text: "The card and the letter from March. Not the old results — we have those." },
      { speaker: "Nil", text: "Then Friday the twenty-second. Thank you." },
    ],
    questions: [
      {
        text: "When is the new appointment?",
        options: ["Friday at half past five", "Tuesday at nine", "Thursday at four"],
        answer: 0,
        explain: "„Friday. Nine in the morning is the one hour I cannot do.“",
      },
      {
        text: "What will Nil do this evening?",
        options: ["confirm it by email", "cancel the booking", "bring the results"],
        answer: 0,
        explain: "„I will confirm it this evening by email. Then we both have it in writing.“",
      },
      {
        kind: "truefalse",
        text: "Nil has to confirm by email.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You do not have to, but it helps.“",
      },
      {
        kind: "gapfill",
        text: "Nil should bring the card and the letter from ___.",
        options: [],
        answer: 0,
        accept: ["March"],
        explain: "„The card and the letter from March. Not the old results — we have those.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I will confirm it this evening by email.", "I will confirm it this evening by email"],
        explain: "O anda verilen karar: „will“.",
      },
      {
        kind: "short_answer",
        text: "What should Nil do if Thursday is still in the system?",
        options: [],
        answer: 0,
        accept: ["tell the clinic", "call them", "say something"],
        explain: "„If you see it anywhere, tell me, because that means the system kept it.“",
      },
    ],
  },
  {
    id: "en-b1-u10-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 10,
    title: "Step by step",
    genre: "dialogue",
    intro: "Alet kullanımı anlatılıyor. Hangi kural zorunlu, hangisi öğüt?",
    gloss: [
      { de: "dry", tr: "kuru" },
      { de: "the handle", tr: "sap" },
      { de: "on the label", tr: "etiketin üstünde" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "Before you touch it: you must read every instruction first. All four pages." },
      { speaker: "Ela", text: "Four pages for this?" },
      { speaker: "Mert", text: "Three of them are the same in eleven languages. The English part is one page." },
      { speaker: "Ela", text: "That I can do. What is the first step?" },
      { speaker: "Mert", text: "You should ensure the tool is dry. Not the handle — the part that goes in the wall." },
      { speaker: "Ela", text: "And the buttons?" },
      { speaker: "Mert", text: "You mustn't press both buttons. One at a time, always. Both together is how the last one broke." },
      { speaker: "Ela", text: "Why are there two then?" },
      { speaker: "Mert", text: "Because one is for the safety. It is written on the label in letters nobody reads." },
      { speaker: "Ela", text: "Anything to avoid?" },
      { speaker: "Mert", text: "Water and hurry. In that order." },
      { speaker: "Ela", text: "Careful is slower." },
      { speaker: "Mert", text: "Careful is slower once. Hurry is slower four times, and one of those four is a Saturday." },
      { speaker: "Ela", text: "Then I read the page first." },
      { speaker: "Mert", text: "Read it now, while I am here, and ask the question you will have at nine on Sunday evening." },
    ],
    questions: [
      {
        text: "What must Ela do first?",
        options: ["read every instruction", "dry the handle", "press one button"],
        answer: 0,
        explain: "„you must read every instruction first. All four pages.“",
      },
      {
        text: "What mustn't Ela do?",
        options: ["press both buttons", "read the label", "use water"],
        answer: 0,
        explain: "„You mustn't press both buttons. One at a time, always.“",
      },
      {
        kind: "truefalse",
        text: "The English part is four pages.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Three of them are the same in eleven languages. The English part is one page.“",
      },
      {
        kind: "gapfill",
        text: "The second button is for the ___.",
        options: [],
        answer: 0,
        accept: ["safety"],
        explain: "„Because one is for the safety. It is written on the label…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You mustn't press both buttons.", "You must not press both buttons.", "You mustn't press both buttons"],
        explain: "„mustn't“ yasak; „don't have to“ olsaydı gerek yok olurdu.",
      },
      {
        kind: "short_answer",
        text: "What two things should Ela avoid?",
        options: [],
        answer: 0,
        accept: ["water and hurry", "water", "hurry"],
        explain: "„Water and hurry. In that order.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u10-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 10,
    title: "They had sent the wrong box",
    genre: "personal",
    intro: "Aynı „had“, iki ayrı iş. Hangisi anlatı, hangisi aktarma?",
    gloss: [
      { de: "had sent", tr: "göndermişlerdi" },
      { de: "spotted", tr: "fark ettim" },
      { de: "had decided", tr: "karar vermiş" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yanlış kutuyu göndermişlerdi.",
        answer: "They had sent the wrong box.",
        hint: "Anlatıda „daha önce“ demek için: „had“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Sonra hatayı fark ettim.",
        answer: "Then I spotted the mistake.",
        hint: "Anlatının kendi anı: sade geçmiş. „had“ burada yanlış olurdu.",
      },
      {
        kind: "build",
        tr: "Ben aradığımda onu düzeltmişlerdi.",
        answer: "By the time I called, they had corrected it.",
        hint: "„By the time“ iki geçmişi bağlıyor; düzeltme aramadan önce olmuş.",
      },
      {
        kind: "build",
        tr: "Karar verip vermediğimi sordular.",
        answer: "They asked if I had decided.",
        hint: "Burada „had“ anlatıdan değil, aktarmanın geri kaymasından geliyor.",
      },
      {
        kind: "form",
        prompt: "Karışıklık kartını doldur.",
        facts: "Siparişler pazartesi karıştı; kutu salı geldi; hata perşembe fark edildi; depo çarşamba düzeltti.",
        fields: [
          { label: "Swap", answer: "Monday", accept: ["on Monday"] },
          { label: "Box arrived", answer: "Tuesday", accept: ["on Tuesday"] },
          { label: "Mistake spotted", answer: "Thursday", accept: ["on Thursday"] },
          { label: "Corrected", answer: "Wednesday", accept: ["on Wednesday"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u10-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 10,
    title: "You must read every instruction first",
    genre: "info",
    intro: "Randevu ve yönerge cümleleri. Hangi kip hangi gücü taşıyor?",
    gloss: [
      { de: "ensure", tr: "emin olmak" },
      { de: "reschedule", tr: "yeniden planlamak" },
      { de: "would be cheaper", tr: "daha ucuz olacağını" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Perşembe doktora görünüyorum.",
        answer: "I am seeing the doctor on Thursday.",
        hint: "Ayarlanmış gelecek: saat belli ve karşı taraf biliyor.",
      },
      {
        kind: "build",
        tr: "Rezervasyonu iptal edeceğim.",
        answer: "I am going to cancel the booking.",
        hint: "Önceden kurulmuş plan: „going to“.",
      },
      {
        kind: "build",
        tr: "Her yönergeyi önce okumak zorundasın.",
        answer: "You must read every instruction first.",
        hint: "„must“ kuralın kendisinden geliyor.",
      },
      {
        kind: "build",
        tr: "Aletin kuru olduğundan emin olmalısın.",
        answer: "You should ensure the tool is dry.",
        hint: "„should“ öğüt; „ensure“ sonrası „that“ düşebiliyor.",
      },
      {
        kind: "build",
        tr: "Daha ucuz olacağını söyledi.",
        answer: "She said that it would be cheaper.",
        alternatives: ["She said it would be cheaper."],
        hint: "Aktarılınca „will“ „would“ oluyor.",
      },
    ],
  },
];
