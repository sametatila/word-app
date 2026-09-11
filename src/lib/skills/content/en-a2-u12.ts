import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 12 — "İş görevleri, toplantı, izin, hata".
 *
 * Dört ders: What I do at work · A short meeting · Asking for time off ·
 * A problem at work.
 *
 *   Kelime: usually, customer, answer, check, report, task, regular,
 *           organise, meeting, agree, suggest, decide, later, discussion,
 *           opinion, solution, holiday, permission, leave, reason,
 *           possible, vacation day, ask for, arrange, mistake, late,
 *           deadline, solve, sorry, be late, hurry, support.
 *   Kalıp:  I usually answer emails in the morning. · How often do you …? ·
 *           I write reports twice a week. · Can I say something? ·
 *           I agree with you. · I think we should … ·
 *           Could I take a day off? · I need to leave early because … ·
 *           Would it be possible to …? · I'm sorry, I made a mistake. ·
 *           I haven't finished it yet. · I'll fix it today.
 *
 * Ünitenin tek öğretme noktası KİBARLIĞIN BASAMAKLARI: „Can I …?“ →
 * „Could I …?“ → „Would it be possible to …?“. Üçü de aynı şeyi istiyor,
 * yalnız uzaklık artıyor; hangisini seçeceğin kimden istediğine bağlı.
 * Dört dersin dördü de bu merdivende duruyor — toplantıda en alt basamak
 * yetiyor, izin mektubunda en üst basamak gerekiyor.
 */
export const enA2U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u12-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 12,
    title: "What I do at work",
    genre: "blog",
    intro: "Sıradan bir salı. Hangi iş ne kadar sürüyor?",
    gloss: [
      { de: "downstairs", tr: "alt kattaki" },
      { de: "the whole job", tr: "işin tamamı" },
      { de: "Most of them", tr: "çoğu" },
    ],
    minutes: 6,
    text:
      "People ask me what I do all day. Here is a normal Tuesday.\n" +
      "I usually answer emails in the morning, from nine to half past ten. Most of them are from customers with the same three questions.\n" +
      "Then I check the numbers from Monday. If something is wrong, I call the department downstairs. That happens twice a week.\n" +
      "At twelve we eat. At one the regular meeting starts — twenty minutes, never more.\n" +
      "In the afternoon I write reports. I write two reports a week, one short and one long. The long one takes three hours and nobody reads it. I know that, my boss knows that, and we both say nothing.\n" +
      "The last task of the day is the list for tomorrow. Five things, in order. If I don't write it, I sleep badly.\n" +
      "That is the whole job. It looks boring here. It isn't.",
    questions: [
      {
        text: "What does the writer do in the morning?",
        options: ["answer emails", "write reports", "make the list for tomorrow"],
        answer: 0,
        explain: "„I usually answer emails in the morning, from nine to half past ten.“",
      },
      {
        text: "How long does the regular meeting take?",
        options: ["twenty minutes", "three hours", "half an hour"],
        answer: 0,
        explain: "„At one the regular meeting starts — twenty minutes, never more.“",
      },
      {
        kind: "truefalse",
        text: "The writer writes one report a week.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I write two reports a week, one short and one long.“",
      },
      {
        kind: "gapfill",
        text: "The last task of the day is the list for ___.",
        options: [],
        answer: 0,
        accept: ["tomorrow"],
        explain: "„The last task of the day is the list for tomorrow.“",
      },
      {
        kind: "short_answer",
        text: "Who reads the long report?",
        options: [],
        answer: 0,
        accept: ["nobody", "no one"],
        explain: "„The long one takes three hours and nobody reads it.“",
      },
    ],
  },
  {
    id: "en-a2-u12-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 12,
    title: "Asking for time off",
    genre: "email",
    intro: "İzin mektubu. Üç rica, üç ayrı kibarlık basamağı.",
    gloss: [
      { de: "a day off", tr: "izin günü" },
      { de: "arrives", tr: "geliyor" },
      { de: "that day", tr: "o gün" },
      { de: "Best wishes", tr: "saygılarımla" },
    ],
    minutes: 6,
    text:
      "Dear Ms Kaya,\n" +
      "Could I take a day off on Friday? My sister arrives from Ankara in the morning and I would like to meet her at the station.\n" +
      "I have already talked to Mert and he can do my tasks that day. The reports for the week are finished and the meeting on Friday is not mine.\n" +
      "If Friday is not possible, would it be possible to leave early, at two? Then I can work in the morning and still meet her.\n" +
      "I have one more question. I have five vacation days this year. Can I take three of them in August? I ask now because my brother arranges his holiday in May.\n" +
      "Thank you very much. If you need anything from me before Friday, tell me today or tomorrow.\n" +
      "Best wishes,\n" +
      "Nil",
    questions: [
      {
        text: "Who arrives from Ankara on Friday?",
        options: ["the sister", "the brother", "Mert"],
        answer: 0,
        explain: "„My sister arrives from Ankara in the morning…“ — kardeş mayısta tatil ayarlıyor.",
      },
      {
        text: "What does Nil ask for if Friday is not possible?",
        options: ["to leave early at two", "to work at the weekend", "to take August off"],
        answer: 0,
        explain: "„…would it be possible to leave early, at two?“",
      },
      {
        kind: "truefalse",
        text: "Mert cannot do the tasks on Friday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have already talked to Mert and he can do my tasks that day.“",
      },
      {
        kind: "gapfill",
        text: "Nil has ___ vacation days this year.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„I have five vacation days this year.“ — üçü ağustos için isteniyor.",
      },
      {
        kind: "order",
        text: "Mektubun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Could I take a day off on Friday?",
          "Mert can do my tasks that day.",
          "Would it be possible to leave early?",
          "Can I take three days in August?",
        ],
        explain: "Önce istek, sonra gerekçe, sonra ikinci seçenek, en son ayrı bir soru.",
      },
      {
        kind: "short_answer",
        text: "When does the brother arrange his holiday?",
        options: [],
        answer: 0,
        accept: ["in May", "May"],
        explain: "„…because my brother arranges his holiday in May.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u12-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 12,
    title: "A short meeting",
    genre: "meeting",
    intro: "Yirmi dakikalık toplantı. Kim ne öneriyor, ne karar çıkıyor?",
    gloss: [
      { de: "point", tr: "madde" },
      { de: "a record", tr: "rekor" },
      { de: "as always", tr: "her zamanki gibi" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Mert", text: "Good morning. Twenty minutes, as always. First point: the reports." },
      { speaker: "Sena", text: "Can I say something before we start?" },
      { speaker: "Mert", text: "Of course." },
      { speaker: "Sena", text: "The long report takes three hours and nobody reads it. I suggest we write one page." },
      { speaker: "Can", text: "I agree with you. I have read it twice this year and I found nothing new." },
      { speaker: "Mert", text: "Then I think we should try it for a month. One page, five numbers." },
      { speaker: "Sena", text: "And if the boss asks for the long one?" },
      { speaker: "Mert", text: "Then we write it again. But he hasn't asked since January." },
      { speaker: "Can", text: "Second point: the meeting on Friday. Could we move it to Thursday?" },
      { speaker: "Mert", text: "Why?" },
      { speaker: "Can", text: "Friday at four nobody is here. On Thursday everybody is." },
      { speaker: "Sena", text: "True. I agree." },
      { speaker: "Mert", text: "Good. We decide: one page, and Thursday. Anything more?" },
      { speaker: "Can", text: "No. Nineteen minutes. A record." },
    ],
    questions: [
      {
        text: "What does Sena suggest?",
        options: ["to write one page", "to stop the meeting", "to read the report twice"],
        answer: 0,
        explain: "„I suggest we write one page.“",
      },
      {
        text: "Why does Can want to move the meeting?",
        options: ["on Friday at four nobody is here", "Thursday is quieter", "the boss asks for it"],
        answer: 0,
        explain: "„Friday at four nobody is here. On Thursday everybody is.“",
      },
      {
        kind: "truefalse",
        text: "The boss has asked for the long report since January.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But he hasn't asked since January.“ — olumsuz present perfect.",
      },
      {
        kind: "gapfill",
        text: "The meeting moves to ___.",
        options: [],
        answer: 0,
        accept: ["Thursday"],
        explain: "„We decide: one page, and Thursday.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Can I say something before we start?", "Can I say something before we start"],
        explain: "Toplantıda en alt basamak yetiyor: „Can I …?“",
      },
      {
        kind: "short_answer",
        text: "How long did the meeting take?",
        options: [],
        answer: 0,
        accept: ["nineteen minutes", "nineteen", "19 minutes"],
        explain: "„No. Nineteen minutes. A record.“",
      },
    ],
  },
  {
    id: "en-a2-u12-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 12,
    title: "A problem at work",
    genre: "dialogue",
    intro: "Bir hata bildiriliyor. Ne bitti, ne bitmedi, ne yapılacak?",
    gloss: [
      { de: "version", tr: "sürüm" },
      { de: "once", tr: "bir kez" },
      { de: "gone out", tr: "gitmiş" },
      { de: "the whole lesson", tr: "dersin tamamı" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Can", text: "Do you have two minutes?" },
      { speaker: "Ela", text: "Yes. What is it?" },
      { speaker: "Can", text: "I'm sorry, I made a mistake. The report for the customer has the numbers from June, not from July." },
      { speaker: "Ela", text: "Has it gone out?" },
      { speaker: "Can", text: "Yesterday at five." },
      { speaker: "Ela", text: "Then we call today. Before the customer finds it." },
      { speaker: "Can", text: "I haven't finished the new one yet. I need two hours." },
      { speaker: "Ela", text: "Take them. I'll call and say the second version comes at four." },
      { speaker: "Can", text: "Thank you. I'll fix it today." },
      { speaker: "Ela", text: "Good. And next time?" },
      { speaker: "Can", text: "Next time I check the month before I send." },
      { speaker: "Ela", text: "That's the whole lesson. Everybody here has sent a wrong number once." },
      { speaker: "Can", text: "Even you?" },
      { speaker: "Ela", text: "Twice. But I was faster with the call." },
    ],
    questions: [
      {
        text: "What was the mistake?",
        options: ["the numbers were from June", "the report went out late", "the customer got no report"],
        answer: 0,
        explain: "„…has the numbers from June, not from July.“",
      },
      {
        text: "When does the second version come?",
        options: ["at four", "at five", "tomorrow"],
        answer: 0,
        explain: "„I'll call and say the second version comes at four.“ — beş dünkü gidiş saati.",
      },
      {
        kind: "truefalse",
        text: "Can has finished the new report.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I haven't finished the new one yet. I need two hours.“",
      },
      {
        kind: "gapfill",
        text: "Can needs ___ hours.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„I haven't finished the new one yet. I need two hours.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I'm sorry, I made a mistake.", "I am sorry, I made a mistake.", "I'm sorry, I made a mistake"],
        explain: "Hata „make“ ile kuruluyor: „make a mistake“.",
      },
      {
        kind: "short_answer",
        text: "What will Can do next time?",
        options: [],
        answer: 0,
        accept: ["check the month", "check the month first", "check"],
        explain: "„Next time I check the month before I send.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u12-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 12,
    title: "Could I take a day off?",
    genre: "formal",
    intro: "Aynı ricanın üç basamağı. Hangisini seçeceğin kimden istediğine bağlı.",
    gloss: [
      { de: "a day off", tr: "izin günü" },
      { de: "Would it be possible", tr: "mümkün olur mu" },
      { de: "leave early", tr: "erken çıkmak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir şey söyleyebilir miyim?",
        answer: "Can I say something?",
        hint: "En alt basamak: „can“. Toplantıda yeterince kibar.",
      },
      {
        kind: "build",
        tr: "Bir gün izin alabilir miyim?",
        answer: "Could I take a day off?",
        hint: "Orta basamak: „could“ aynı soruyu bir adım uzaklaştırıyor.",
      },
      {
        kind: "build",
        tr: "Erken çıkmam mümkün olur mu?",
        answer: "Would it be possible to leave early?",
        hint: "En üst basamak: özne bile kayboluyor, istek kişiden ayrılıyor.",
      },
      {
        kind: "build",
        tr: "Erken çıkmam gerekiyor çünkü ablam geliyor.",
        answer: "I need to leave early because my sister arrives.",
        hint: "„need“ sonrası „to“ + fiil; gerekçeyi „because“ bağlıyor.",
      },
      {
        kind: "form",
        prompt: "İzin talebini doldur.",
        facts: "İzin cuma; sebep ablanın gelişi; görevlere Mert bakacak; ağustosta üç gün isteniyor.",
        fields: [
          { label: "Day", answer: "Friday", accept: ["on Friday"] },
          { label: "Reason", answer: "my sister arrives", accept: ["the sister arrives"] },
          { label: "Who does my tasks", answer: "Mert" },
          { label: "August", answer: "three days", accept: ["3 days"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u12-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 12,
    title: "I'm sorry, I made a mistake",
    genre: "personal",
    intro: "Hata, bitmemiş iş ve o anda verilen karar.",
    gloss: [
      { de: "made a mistake", tr: "hata yaptım" },
      { de: "agree with", tr: "katılmak" },
      { de: "fix", tr: "düzeltmek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Özür dilerim, bir hata yaptım.",
        answer: "I'm sorry, I made a mistake.",
        alternatives: ["I am sorry, I made a mistake."],
        hint: "Hata „make“ ile kuruluyor; „do a mistake“ diye bir şey yok.",
      },
      {
        kind: "build",
        tr: "Onu henüz bitirmedim.",
        answer: "I haven't finished it yet.",
        alternatives: ["I have not finished it yet."],
        hint: "„yet“ olumsuzda ve en sonda: iş bitmedi ama bitecek.",
      },
      {
        kind: "build",
        tr: "Bugün düzelteceğim.",
        answer: "I'll fix it today.",
        alternatives: ["I will fix it today."],
        hint: "O anda verilen karar „will“ ile; „going to“ olsaydı önceden planlanmış olurdu.",
      },
      {
        kind: "build",
        tr: "Sana katılıyorum.",
        answer: "I agree with you.",
        hint: "„agree“ kendi edatını taşıyor: with. „agree to you“ olmaz.",
      },
      {
        kind: "build",
        tr: "Bence şunu yapmalıyız.",
        answer: "I think we should do this.",
        hint: "„I think“ öneriyi yumuşatıyor; „should“ emir değil öneri.",
      },
    ],
  },
];
