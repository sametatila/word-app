import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 15 — "Kuaför, tamir servisi, fiyat karşılaştırma, garanti".
 *
 * Dört ders: At the hairdresser · Repair service · Comparing prices ·
 * Warranty and receipts.
 *
 *   Kelime: cut, short, wash, style, tip, hairdresser, beard,
 *           comb one's hair, screen, guarantee, charge, ready, spare part,
 *           charger, cable, technical, cheaper, expensive, value, discount,
 *           choose, advantage, difference, compare, warranty, valid, proof,
 *           replace, free, law, deal, final.
 *   Kalıp:  I'd like a haircut, please. · Not too short, please. ·
 *           Can you wash my hair first? · My screen is broken. ·
 *           How long will it take? · It's still under guarantee. ·
 *           This one is cheaper than that one. ·
 *           It is more expensive than … · Is there a discount? ·
 *           I bought this here two weeks ago. · It's still under warranty. ·
 *           Could you replace it, please?
 *
 * Ünitenin tek öğretme noktası ADIN YERİNİ TUTAN „one“. „This one is
 * cheaper than that one“ cümlesinde İngilizce adı düşürmüyor, yerine bir
 * sözcük koyuyor. Türkçe hiçbir şey koymuyor ("bu daha ucuz"), o yüzden
 * öğrenci „this is cheaper than that“ demeye yatkın — dilbilgisi hatası
 * değil ama mağazada kulağa eksik geliyor. Dört ders de iki seçenek
 * arasında konuştuğu için „one“ her metinde geçiyor.
 */
export const enA2U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u15-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 15,
    title: "At the hairdresser",
    genre: "dialogue",
    intro: "Kuaförde kısa bir konuşma. Hangi fotoğraf, hangi tarak?",
    gloss: [
      { de: "haircut", tr: "saç kesimi" },
      { de: "bear", tr: "ayı" },
      { de: "Understood", tr: "anlaşıldı" },
    ],
    minutes: 5,
    text:
      "Hairdresser: Good morning. What would you like today?\n" +
      "Deniz: I'd like a haircut, please. Not too short.\n" +
      "Hairdresser: Can you show me a photo?\n" +
      "Deniz: This one on the left. The short one is my brother, not me.\n" +
      "Hairdresser: Understood. Can I wash your hair first?\n" +
      "Deniz: Yes, please. Warm, not hot.\n" +
      "Hairdresser: And the beard?\n" +
      "Deniz: A little shorter. My mother says I look like a bear.\n" +
      "Hairdresser: Mothers always say that. Which comb do you use at home?\n" +
      "Deniz: The small one from the shop here. The big one broke in March.\n" +
      "Hairdresser: Then take a new one today. They are two euros and they last two years.\n" +
      "Deniz: Fine. And the style — the same as last time?\n" +
      "Hairdresser: The same. Last time you were happy.\n" +
      "Deniz: I was. That is the best reason.",
    questions: [
      {
        text: "Which photo does Deniz show?",
        options: ["the one on the left", "the short one", "the one from last time"],
        answer: 0,
        explain: "„This one on the left. The short one is my brother, not me.“",
      },
      {
        text: "What does Deniz buy today?",
        options: ["a new comb", "a photo", "a style"],
        answer: 0,
        explain: "„Then take a new one today. They are two euros and they last two years.“",
      },
      {
        kind: "truefalse",
        text: "Deniz wants a very short haircut.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I'd like a haircut, please. Not too short.“",
      },
      {
        kind: "gapfill",
        text: "The new comb costs ___ euros.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„They are two euros and they last two years.“",
      },
      {
        kind: "short_answer",
        text: "Which comb broke in March?",
        options: [],
        answer: 0,
        accept: ["the big one", "the big comb", "big one"],
        explain: "„The small one from the shop here. The big one broke in March.“",
      },
    ],
  },
  {
    id: "en-a2-u15-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 15,
    title: "Warranty and receipts",
    genre: "dialogue",
    intro: "Garanti konuşması. Hangi durumda garanti geçerli, hangisinde değil?",
    gloss: [
      { de: "buttons", tr: "tuşlar" },
      { de: "fell down", tr: "düştü" },
      { de: "What do you mean", tr: "ne demek istiyorsunuz" },
      { de: "dark", tr: "karanlık" },
      { de: "the technical service", tr: "teknik servis" },
    ],
    minutes: 6,
    text:
      "Can: Hello. I bought this here two weeks ago and the screen is broken.\n" +
      "Shop: Do you have the receipt?\n" +
      "Can: Yes, here. It's still under warranty.\n" +
      "Shop: Two years, yes. But the warranty is not valid for every problem.\n" +
      "Can: What do you mean?\n" +
      "Shop: If it fell down, it is not the warranty, it is you. If the screen went dark alone, it is us.\n" +
      "Can: It went dark alone. On Tuesday morning, on the table.\n" +
      "Shop: Then the receipt is your proof and we replace it free.\n" +
      "Can: How long will it take?\n" +
      "Shop: Ten days. The technical service is not here — it is two hours away.\n" +
      "Can: Ten days without a phone.\n" +
      "Shop: We have old ones here for that week. Not a good one, but it calls.\n" +
      "Can: I take it. The cheap one with the big buttons?\n" +
      "Shop: That one. Everybody says the same thing after two days: it is the best phone in the shop.",
    questions: [
      {
        text: "When is the warranty not valid?",
        options: ["if the phone fell down", "if the receipt is old", "after two weeks"],
        answer: 0,
        explain: "„If it fell down, it is not the warranty, it is you.“",
      },
      {
        text: "How long does the repair take?",
        options: ["ten days", "two years", "two hours"],
        answer: 0,
        explain: "„Ten days. The technical service is not here — it is two hours away.“",
      },
      {
        kind: "truefalse",
        text: "Can gets no phone for those ten days.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We have old ones here for that week. Not a good one, but it calls.“",
      },
      {
        kind: "gapfill",
        text: "The receipt is Can's ___.",
        options: [],
        answer: 0,
        accept: ["proof"],
        explain: "„Then the receipt is your proof and we replace it free.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I bought this here two weeks ago.",
          "Do you have the receipt?",
          "We replace it free.",
          "We have old ones here for that week.",
        ],
        explain: "Önce sorun, sonra fiş, sonra karar, en son ödünç telefon.",
      },
      {
        kind: "short_answer",
        text: "What does everybody say after two days?",
        options: [],
        answer: 0,
        accept: ["it is the best phone", "the best phone", "it is the best"],
        explain: "„Everybody says the same thing after two days: it is the best phone in the shop.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u15-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 15,
    title: "Comparing prices",
    genre: "monologue",
    intro: "İki dükkân, bir makine. Ucuz olan gerçekten ucuz mu?",
    gloss: [
      { de: "either", tr: "de" },
      { de: "rich", tr: "zengin" },
      { de: "chose", tr: "seçtim" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "Two shops, one machine, forty euros difference. I went to both." },
      { speaker: "Nil", text: "The first one is cheaper: two hundred and ten. The second one is two hundred and fifty." },
      { speaker: "Nil", text: "But the cheap one has no guarantee after one year. The expensive one has three years." },
      { speaker: "Nil", text: "So the question is not which one is cheaper. The question is which one is better value." },
      { speaker: "Nil", text: "I asked for a discount in the second shop. They said no, but they gave me the cable free." },
      { speaker: "Nil", text: "That is nine euros. The difference is now thirty-one." },
      { speaker: "Nil", text: "The advantage of the second shop: they repair it here. The first one sends it away for four weeks." },
      { speaker: "Nil", text: "I chose the expensive one. Not because I am rich, but because four weeks without a machine is not cheap either." },
    ],
    questions: [
      {
        text: "Why is the second machine better value?",
        options: ["three years of guarantee", "it is two hundred and ten", "it is sent away for four weeks"],
        answer: 0,
        explain: "„But the cheap one has no guarantee after one year. The expensive one has three years.“",
      },
      {
        text: "What did the second shop give free?",
        options: ["the cable", "a discount", "three years"],
        answer: 0,
        explain: "„They said no, but they gave me the cable free.“",
      },
      {
        kind: "truefalse",
        text: "The second shop gave a discount.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I asked for a discount in the second shop. They said no…“",
      },
      {
        kind: "gapfill",
        text: "The difference is now ___ euros.",
        options: [],
        answer: 0,
        accept: ["thirty-one", "31"],
        explain: "„That is nine euros. The difference is now thirty-one.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["So the question is not which one is cheaper.", "So the question is not which one is cheaper"],
        explain: "Adın yerini „one“ tutuyor: „which one“, „which“ değil.",
      },
      {
        kind: "short_answer",
        text: "Why did Nil choose the expensive one?",
        options: [],
        answer: 0,
        accept: ["four weeks without a machine", "the repair is here", "the guarantee"],
        explain: "„…because four weeks without a machine is not cheap either.“",
      },
    ],
  },
  {
    id: "en-a2-u15-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 15,
    title: "A broken screen",
    genre: "dialogue",
    intro: "Kırık ekran. Tamir mi, yenisi mi?",
    gloss: [
      { de: "battery", tr: "pil" },
      { de: "model", tr: "model" },
      { de: "under water", tr: "suyun altında" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "Hello. My screen is broken." },
      { speaker: "Deniz", text: "Let me see. Was it under water?" },
      { speaker: "Ela", text: "No. It fell from the table on Sunday." },
      { speaker: "Deniz", text: "Then a new screen. It's still under guarantee, but the guarantee does not pay for that." },
      { speaker: "Ela", text: "How much is it?" },
      { speaker: "Deniz", text: "A hundred and twenty with the spare part. Or a hundred and sixty for a new one — the small model." },
      { speaker: "Ela", text: "That is a hard choice." },
      { speaker: "Deniz", text: "Take the repair. The phone is two years old, the battery is fine and you know it." },
      { speaker: "Ela", text: "How long will it take?" },
      { speaker: "Deniz", text: "The part comes on Wednesday. It is ready on Thursday afternoon." },
      { speaker: "Ela", text: "And the charger? Mine is broken too." },
      { speaker: "Deniz", text: "The cable or the part in the wall?" },
      { speaker: "Ela", text: "The cable." },
      { speaker: "Deniz", text: "Take this one. Nine euros, and it charges faster than yours." },
    ],
    questions: [
      {
        text: "What happened to the screen?",
        options: ["it fell from the table", "it was under water", "the battery is old"],
        answer: 0,
        explain: "„No. It fell from the table on Sunday.“",
      },
      {
        text: "What does Deniz suggest?",
        options: ["the repair", "a new phone", "a new battery"],
        answer: 0,
        explain: "„Take the repair. The phone is two years old, the battery is fine and you know it.“",
      },
      {
        kind: "truefalse",
        text: "The guarantee pays for the screen.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It's still under guarantee, but the guarantee does not pay for that.“",
      },
      {
        kind: "gapfill",
        text: "The repair costs a hundred and ___.",
        options: [],
        answer: 0,
        accept: ["twenty", "20"],
        explain: "„A hundred and twenty with the spare part.“ — yenisi yüz altmış.",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My screen is broken.", "My screen is broken"],
        explain: "„broken“ sıfat gibi çalışıyor; „break“in üçüncü hâli.",
      },
      {
        kind: "short_answer",
        text: "When is the phone ready?",
        options: [],
        answer: 0,
        accept: ["on Thursday afternoon", "Thursday afternoon", "Thursday"],
        explain: "„The part comes on Wednesday. It is ready on Thursday afternoon.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u15-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 15,
    title: "This one is cheaper than that one",
    genre: "personal",
    intro: "Fiyat karşılaştırması. Ad düşmüyor, yerine „one“ giriyor.",
    gloss: [
      { de: "this one", tr: "bu" },
      { de: "that one", tr: "şu" },
      { de: "a discount", tr: "indirim" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bu şundan daha ucuz.",
        answer: "This one is cheaper than that one.",
        hint: "Türkçede ad düşüyor, İngilizcede yerine „one“ konuyor.",
      },
      {
        kind: "build",
        tr: "İndirim var mı?",
        answer: "Is there a discount?",
        hint: "Varlık sorusu; tekil olduğu için „a discount“.",
      },
      {
        kind: "build",
        tr: "Ondan daha pahalı.",
        answer: "It is more expensive than that one.",
        alternatives: ["It's more expensive than that one."],
        hint: "„expensive“ uzun: „more“ istiyor. Karşılaştırılan yine „one“.",
      },
      {
        kind: "build",
        tr: "Ekranım kırık.",
        answer: "My screen is broken.",
        hint: "„broken“ burada sıfat gibi çalışıyor.",
      },
      {
        kind: "form",
        prompt: "Karşılaştırma kartını doldur.",
        facts: "Birinci dükkân iki yüz on; ikinci iki yüz elli; ucuzda bir yıl garanti; pahalıda üç yıl.",
        fields: [
          { label: "First shop", answer: "two hundred and ten", accept: ["210"] },
          { label: "Second shop", answer: "two hundred and fifty", accept: ["250"] },
          { label: "Cheap one", answer: "one year", accept: ["1 year"] },
          { label: "Expensive one", answer: "three years", accept: ["3 years"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u15-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 15,
    title: "It's still under warranty",
    genre: "formal",
    intro: "Garanti ve hizmet cümleleri. Zaman belirteci yine zamanı seçiyor.",
    gloss: [
      { de: "under warranty", tr: "garanti altında" },
      { de: "replace", tr: "değiştirmek" },
      { de: "a haircut", tr: "saç kesimi" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bunu iki hafta önce buradan aldım.",
        answer: "I bought this here two weeks ago.",
        hint: "„ago“ zamanı çiviliyor: simple past.",
      },
      {
        kind: "build",
        tr: "Hâlâ garanti altında.",
        answer: "It's still under warranty.",
        alternatives: ["It is still under warranty."],
        hint: "„under warranty“ kalıp; „still“ „be“ fiilinden sonra.",
      },
      {
        kind: "build",
        tr: "Onu değiştirebilir misiniz, lütfen?",
        answer: "Could you replace it, please?",
        hint: "„replace“ yerine yenisini koymak demek; „change“ başka iş görür.",
      },
      {
        kind: "build",
        tr: "Ne kadar sürecek?",
        answer: "How long will it take?",
        hint: "Gelecek „will“ ile; yine boş özneli „it takes“ kalıbı.",
      },
      {
        kind: "build",
        tr: "Bir saç kesimi istiyorum, lütfen.",
        answer: "I'd like a haircut, please.",
        alternatives: ["I would like a haircut, please."],
        hint: "Hizmet isteğinde „I'd like“ + isim; fiil gerekmiyor.",
      },
    ],
  },
];
