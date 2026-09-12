import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 9 — "Tavsiye, seçim, nasıl çalışır, şikâyet".
 *
 * Dört ders: You should see it · This one or that one · How it works ·
 * The faulty order.
 *
 *   Kelime: recommend, worth, boring, exciting, plot, actor, novel, taste,
 *           option, compare, cheaper, quality, prefer, decide, whereas,
 *           both, device, button, screen, plug, connect, switch, setting,
 *           repair, complaint, exchange, receipt, faulty, replace, apology,
 *           delivery, order.
 *   Kalıp:  I recommend watching it twice. ·
 *           It is worth reading the novel first. ·
 *           I decided to read the book again. ·
 *           Although it is cheaper, the quality is worse. ·
 *           This one is small, whereas that one is big. ·
 *           I prefer the first one. · The device is switched on here. ·
 *           The settings are changed on the screen. ·
 *           It was repaired last month. ·
 *           I have written twice about this. ·
 *           I wrote to you on Monday. · Could you replace it, please?
 *
 * Ünitenin tek öğretme noktası „ALTHOUGH“ İLE „WHEREAS“ ARASINDAKİ FARK.
 * İkisi de iki yarıyı karşı karşıya koyuyor ama aynı işi yapmıyor:
 * „although“ BEKLENMEDİK olanı bağlıyor (ucuz ama kalitesi kötü),
 * „whereas“ iki şeyi eşit ağırlıkta KARŞILAŞTIRIYOR (bu küçük, şu büyük)
 * ve hiçbir şaşırtma taşımıyor. Karşılaştırma dersi ikisini yan yana
 * koyduğu için ayrım burada görünür oluyor.
 */
export const enB1U09: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u9-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 9,
    title: "This one or that one",
    genre: "opinion",
    intro: "İki seçenek, iki bağlaç. Hangisi şaşırtıyor, hangisi karşılaştırıyor?",
    gloss: [
      { de: "surprise", tr: "şaşırtmaca" },
      { de: "side by side", tr: "yan yana" },
      { de: "in the end", tr: "sonunda" },
      { de: "sentence", tr: "cümle" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "anywhere", tr: "hiçbir yerde" },
      { de: "equal weight", tr: "eşit ağırlık" },
      { de: "concede", tr: "ödün vermek" },
      { de: "the test", tr: "ölçüt" },
      { de: "halves", tr: "yarılar" },
      { de: "stand", tr: "durmak" },
      { de: "myself", tr: "kendim" },
      { de: "did not expect", tr: "beklemediğin" },
    ],
    minutes: 7,
    text:
      "Two machines, one table, and two sentences that look the same and are not.\n" +
      "Although it is cheaper, the quality is worse. That sentence has a surprise in it. Cheaper usually sounds good; the second half takes it away. „Although“ always works like that — it puts something you did not expect after something you did.\n" +
      "This one is small, whereas that one is big. No surprise anywhere. Two facts side by side, equal weight, and the reader is not being warned about anything. „Whereas“ compares; it does not concede.\n" +
      "The test is simple. Take the two halves and ask: does the second one take something back? If yes, you want „although“. If the two halves just stand next to each other, you want „whereas“.\n" +
      "In the end I preferred the first one, and not for the reason I expected. Both have the same quality. Both cost about the same. The difference was one button, which is on the front of one machine and behind the screen on the other.\n" +
      "I compare things for a living and I still decided on a button. That is worth knowing about myself.",
    questions: [
      {
        text: "What does „although“ always do?",
        options: ["it puts a surprise in the second half", "it compares two facts", "it gives a reason"],
        answer: 0,
        explain: "„it puts something you did not expect after something you did.“",
      },
      {
        text: "What is the test?",
        options: ["does the second half take something back", "is the sentence long", "is the second half a fact"],
        answer: 0,
        explain: "„Take the two halves and ask: does the second one take something back?“",
      },
      {
        kind: "truefalse",
        text: "The two machines have different quality.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Both have the same quality. Both cost about the same.“",
      },
      {
        kind: "gapfill",
        text: "The difference was one ___.",
        options: [],
        answer: 0,
        accept: ["button"],
        explain: "„The difference was one button, which is on the front of one machine…“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Although it is cheaper, the quality is worse.",
          "This one is small, whereas that one is big.",
          "The test is simple.",
          "In the end I preferred the first one.",
        ],
        explain: "Önce iki örnek, sonra ölçüt, en son karar.",
      },
      {
        kind: "short_answer",
        text: "Why did the writer choose the first machine?",
        options: [],
        answer: 0,
        accept: ["the button", "one button", "where the button is"],
        explain: "„I compare things for a living and I still decided on a button.“",
      },
    ],
  },
  {
    id: "en-b1-u9-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 9,
    title: "The faulty order",
    genre: "email",
    intro: "İkinci şikâyet mektubu. Hangi cümle tarihli, hangisi değil?",
    gloss: [
      { de: "faulty", tr: "kusurlu" },
      { de: "reference number", tr: "işlem numarası" },
      { de: "goodwill", tr: "iyi niyet" },
      { de: "the fourth", tr: "dördü" },
      { de: "the seventh", tr: "yedisi" },
      { de: "reached", tr: "ulaştı" },
      { de: "tape", tr: "bant" },
      { de: "instead", tr: "onun yerine" },
      { de: "Yours faithfully", tr: "saygılarımla" },
    ],
    minutes: 7,
    text:
      "Dear Sir or Madam,\n" +
      "I have written twice about this order and I am writing a third time, so I will keep it short.\n" +
      "I wrote to you on Monday the fourth and again on Thursday the seventh. The reference number is in both emails and at the top of this one.\n" +
      "The delivery arrived on the second. One of the two devices is faulty: it is switched on, the screen lights up for about a second, and then nothing. I have tried two plugs and two rooms.\n" +
      "I do not want a repair. The device was repaired once before it reached me — the box had been opened and closed with new tape, which I photographed before I opened it.\n" +
      "Could you replace it, please? I have the receipt, the reference number, and the photograph of the box.\n" +
      "I am not asking for an apology and I do not need goodwill. I need one working device, which is what I paid for on the last day of the month.\n" +
      "If a replacement is not possible, please say so in one line and I will ask for the money back instead.\n" +
      "Yours faithfully,\n" +
      "Ela Demir",
    questions: [
      {
        text: "How many times has Ela written about this?",
        options: ["three times with this one", "once", "twice"],
        answer: 0,
        explain: "„I have written twice about this order and I am writing a third time…“",
      },
      {
        text: "What is wrong with the device?",
        options: ["the screen goes dark after a second", "it does not switch on", "the plug is broken"],
        answer: 0,
        explain: "„it is switched on, the screen lights up for about a second, and then nothing.“",
      },
      {
        kind: "truefalse",
        text: "Ela wants a repair.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I do not want a repair. The device was repaired once before it reached me…“",
      },
      {
        kind: "gapfill",
        text: "The delivery arrived on the ___.",
        options: [],
        answer: 0,
        accept: ["second", "2nd"],
        explain: "„The delivery arrived on the second.“",
      },
      {
        kind: "short_answer",
        text: "What will Ela ask for if there is no replacement?",
        options: [],
        answer: 0,
        accept: ["the money back", "a refund", "her money"],
        explain: "„…please say so in one line and I will ask for the money back instead.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u9-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 9,
    title: "You should see it",
    genre: "dialogue",
    intro: "Kitap mı önce, dizi mi? Tavsiye nasıl kuruluyor?",
    gloss: [
      { de: "plot", tr: "olay örgüsü" },
      { de: "spoil", tr: "tadını kaçırmak" },
      { de: "taste", tr: "zevk" },
      { de: "strange", tr: "tuhaf" },
      { de: "make sense", tr: "anlam kazanmak" },
      { de: "the fifth", tr: "beşinci" },
      { de: "built", tr: "kurulmuş" },
      { de: "backwards", tr: "tersten" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "anywhere", tr: "hiçbir yerde" },
      { de: "anyway", tr: "yine de" },
      { de: "whole", tr: "bütün" },
      { de: "design", tr: "tasarım" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Can", text: "You watched it. Was it any good?" },
      { speaker: "Sena", text: "I recommend watching it twice. That is a strange thing to say about six hours." },
      { speaker: "Can", text: "Why twice?" },
      { speaker: "Sena", text: "Because the first two episodes make sense only after the fifth. The plot is built backwards on purpose." },
      { speaker: "Can", text: "And the book?" },
      { speaker: "Sena", text: "It is worth reading the novel first. Different order, same people, and the novel explains one thing the series never does." },
      { speaker: "Can", text: "That sounds like work." },
      { speaker: "Sena", text: "It is. I decided to read the book again after the last episode and that took another week." },
      { speaker: "Can", text: "Who is in it?" },
      { speaker: "Sena", text: "The actor from the film we saw in June, in a part that is nothing like that one." },
      { speaker: "Can", text: "Is it boring anywhere?" },
      { speaker: "Sena", text: "The third episode. Everybody says the third episode and everybody watches it anyway." },
      { speaker: "Can", text: "Tell me the end." },
      { speaker: "Sena", text: "No. I will spoil one thing only: nobody is who you think in the first hour. That is not taste, that is the whole design." },
    ],
    questions: [
      {
        text: "Why does Sena recommend watching it twice?",
        options: ["the first episodes make sense later", "the novel is shorter", "it is only six hours"],
        answer: 0,
        explain: "„Because the first two episodes make sense only after the fifth. The plot is built backwards on purpose.“",
      },
      {
        text: "What does the novel do?",
        options: ["explains one thing the series does not", "tells the same order", "has other people"],
        answer: 0,
        explain: "„Different order, same people, and the novel explains one thing the series never does.“",
      },
      {
        kind: "truefalse",
        text: "Sena tells Can the end.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No. I will spoil one thing only…“",
      },
      {
        kind: "gapfill",
        text: "The boring one is the ___ episode.",
        options: [],
        answer: 0,
        accept: ["third", "3rd"],
        explain: "„The third episode. Everybody says the third episode and everybody watches it anyway.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I recommend watching it twice.", "I recommend watching it twice"],
        explain: "„recommend“ sonrası „-ing“ istiyor.",
      },
      {
        kind: "short_answer",
        text: "Where did Can and Sena see the actor before?",
        options: [],
        answer: 0,
        accept: ["in a film in June", "the film in June", "a film"],
        explain: "„The actor from the film we saw in June…“",
      },
    ],
  },
  {
    id: "en-b1-u9-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 9,
    title: "How it works",
    genre: "dialogue",
    intro: "Cihaz anlatılıyor. Neden hep edilgen kullanılıyor?",
    gloss: [
      { de: "at the back", tr: "arkada" },
      { de: "Hold the back button down", tr: "arkadaki düğmeyi basılı tut" },
      { de: "cloth", tr: "bez" },
      { de: "died", tr: "bitti" },
      { de: "on purpose", tr: "bilerek" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "Show me once and I will write it down." },
      { speaker: "Mert", text: "The device is switched on here, at the back, not with the big button on the front." },
      { speaker: "Nil", text: "Why is the big button on the front then?" },
      { speaker: "Mert", text: "That one is only for the screen. Two buttons, two jobs, and everybody presses the wrong one in the first week." },
      { speaker: "Nil", text: "And the settings?" },
      { speaker: "Mert", text: "The settings are changed on the screen. Three lines down, then the one that says language." },
      { speaker: "Nil", text: "Is it connected to anything?" },
      { speaker: "Mert", text: "One cable to the wall. Nothing else is plugged in, and that is on purpose — the fewer cables, the fewer questions." },
      { speaker: "Nil", text: "What if it stops?" },
      { speaker: "Mert", text: "Hold the back button down for eight seconds. It was repaired last month and that was the only thing the man did." },
      { speaker: "Nil", text: "Eight seconds is long." },
      { speaker: "Mert", text: "It is long on purpose, so that nobody does it by mistake. Count out loud; everybody stops at five." },
      { speaker: "Nil", text: "Anything else?" },
      { speaker: "Mert", text: "One thing. It is cleaned once a week with a dry cloth. Not with water, which is how the last one died." },
    ],
    questions: [
      {
        text: "Where is the device switched on?",
        options: ["at the back", "with the big front button", "on the screen"],
        answer: 0,
        explain: "„The device is switched on here, at the back, not with the big button on the front.“",
      },
      {
        text: "What is the big front button for?",
        options: ["the screen", "the settings", "the cable"],
        answer: 0,
        explain: "„That one is only for the screen. Two buttons, two jobs…“",
      },
      {
        kind: "truefalse",
        text: "Several cables are plugged in.",
        options: ["True", "False"],
        answer: 1,
        explain: "„One cable to the wall. Nothing else is plugged in…“",
      },
      {
        kind: "gapfill",
        text: "Hold the back button down for ___ seconds.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„Hold the back button down for eight seconds.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The settings are changed on the screen.", "The settings are changed on the screen"],
        explain: "Kullanma kılavuzu dili edilgen: kimin değiştirdiği önemsiz.",
      },
      {
        kind: "short_answer",
        text: "How is the device cleaned?",
        options: [],
        answer: 0,
        accept: ["with a dry cloth", "a dry cloth", "not with water"],
        explain: "„It is cleaned once a week with a dry cloth. Not with water…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u9-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 9,
    title: "This one is small, whereas that one is big",
    genre: "opinion",
    intro: "İki bağlaç, iki iş. Hangisi şaşırtıyor, hangisi karşılaştırıyor?",
    gloss: [
      { de: "Although", tr: "rağmen" },
      { de: "whereas", tr: "oysa" },
      { de: "prefer", tr: "tercih etmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Daha ucuz olmasına rağmen kalitesi daha kötü.",
        answer: "Although it is cheaper, the quality is worse.",
        hint: "„although“ beklenmedik olanı bağlıyor: ikinci yarı birinciyi geri alıyor.",
      },
      {
        kind: "build",
        tr: "Bu küçük, oysa şu büyük.",
        answer: "This one is small, whereas that one is big.",
        hint: "„whereas“ iki olguyu eşit ağırlıkta karşılaştırıyor; şaşırtma yok.",
      },
      {
        kind: "build",
        tr: "Ben birincisini tercih ediyorum.",
        answer: "I prefer the first one.",
        hint: "„prefer“ doğrudan nesne alıyor; adın yerini yine „one“ tutuyor.",
      },
      {
        kind: "build",
        tr: "Onu iki kez izlemenizi tavsiye ederim.",
        answer: "I recommend watching it twice.",
        hint: "„recommend“ sonrası „-ing“ istiyor; „recommend to watch“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Karşılaştırma kartını doldur.",
        facts: "İki makine; kalite aynı; fiyat yaklaşık aynı; fark tek düğmede.",
        fields: [
          { label: "Machines", answer: "two", accept: ["2"] },
          { label: "Quality", answer: "the same", accept: ["same"] },
          { label: "Price", answer: "about the same", accept: ["the same"] },
          { label: "Difference", answer: "one button", accept: ["a button"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u9-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 9,
    title: "I have written twice about this",
    genre: "formal",
    intro: "Şikâyet ve kılavuz cümleleri. Hangisi tarihli, hangisi değil?",
    gloss: [
      { de: "have written", tr: "yazdım" },
      { de: "is switched on", tr: "açılıyor" },
      { de: "replace", tr: "değiştirmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu konuda iki kez yazdım.",
        answer: "I have written twice about this.",
        alternatives: ["I've written twice about this."],
        hint: "Tarih verilmiyor ve sonuç şimdi önemli: present perfect.",
      },
      {
        kind: "build",
        tr: "Size pazartesi yazdım.",
        answer: "I wrote to you on Monday.",
        hint: "Gün söylendiği an sade geçmiş zorunlu; aynı olay, başka biçim.",
      },
      {
        kind: "build",
        tr: "Cihaz buradan açılıyor.",
        answer: "The device is switched on here.",
        hint: "Kılavuz dili edilgen: kimin açtığı önemsiz.",
      },
      {
        kind: "build",
        tr: "Ayarlar ekrandan değiştiriliyor.",
        answer: "The settings are changed on the screen.",
        hint: "Çoğul özneyle aynı edilgen; „are“ geliyor.",
      },
      {
        kind: "build",
        tr: "Onu değiştirebilir misiniz, lütfen?",
        answer: "Could you replace it, please?",
        hint: "„replace“ yerine yenisini koymak; „repair“ onarmak demek.",
      },
    ],
  },
];
