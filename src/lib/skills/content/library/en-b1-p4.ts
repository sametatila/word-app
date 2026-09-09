import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: toplantı raporu, kulüp tartışması ve teyit e-postası. Üçü de
 * söyleneni aktarır; dil bilgisi dolaylı anlatım.
 */
export const enB1P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r4",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "Notes from the Meeting",
    genre: "Rapor",
    intro: "Köy toplantısından üyelere yazılmış notları okuyacaksın: kim ne dedi, kim itiraz etti, ne karar çıktı.",
    gloss: [
      { de: "owner", tr: "sahip" },
      { de: "van", tr: "kamyonet" },
      { de: "disagree", tr: "katılmamak" },
      { de: "add", tr: "eklemek" },
      { de: "vote", tr: "oy" },
      { de: "loan", tr: "kredi" },
      { de: "alternative", tr: "seçenek" },
    ],
    minutes: 7,
    text:
      "NOTES FROM THE MEETING — FOURTEENTH OF MARCH\n" +
      "For members who could not come\n\n" +
      "Forty-one people were at the meeting in the old school. Here is what was said and what was decided.\n\n" +
      "Mrs. Ferreira opened the meeting and explained that the shop had closed in November and that the owner " +
      "did not want to sell to another shop. She said that the building was for sale for one hundred and ten " +
      "thousand euros.\n\n" +
      "Bahar Kaya, who runs the bakery van, said that she brought bread to the village three days a week and " +
      "that she could add two more days if there was somewhere to stop. She asked whether the group had thought " +
      "about a smaller solution first.\n\n" +
      "Two members disagreed. Mr. Lang said that a van was not a shop, because you could not go there when you " +
      "needed one thing. He added that the last two villages that had lost their shops had also lost their bus " +
      "stops within five years.\n\n" +
      "The vote: thirty-three people said that they would put in five hundred euros each; six were against; " +
      "two did not vote.\n\n" +
      "Decisions. First, a working group of five people will ask the bank about a loan before the end of April. " +
      "Second, Bahar Kaya will try two extra days from May. These two are not alternatives.",
    questions: [
      {
        text: "What is this text?",
        options: [
          "notes from a village meeting",
          "a letter from the shop owner",
          "an advertisement for a building",
        ],
        answer: 0,
        explain: "Başlık ve alt satır bunu söylüyor: „For members who could not come.“",
      },
      {
        text: "What did Bahar Kaya offer?",
        options: [
          "two extra days with the bread van",
          "to buy the building herself",
          "to work in the new village shop",
        ],
        answer: 0,
        explain: "„… she could add two more days if there was somewhere to stop.“",
      },
      {
        kind: "truefalse",
        text: "Everybody at the meeting agreed with the van idea.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Two members disagreed. Mr. Lang said that a van was not a shop …“",
      },
      {
        kind: "gapfill",
        text: "___ people said that they would put in five hundred euros each.",
        options: [],
        answer: 0,
        accept: ["Thirty-three", "thirty-three", "33"],
        explain: "„The vote: thirty-three people said that they would put in five hundred euros each …“",
      },
      {
        kind: "short_answer",
        text: "What will the working group do before May?",
        options: [],
        answer: 0,
        accept: ["ask about a loan", "talk to the bank", "go to the bank"],
        explain: "„… a working group of five people will ask the bank about a loan before the end of April.“",
      },
      {
        text: "What does the last sentence mean?",
        options: [
          "The village will do both things.",
          "Only one of the two plans can work.",
          "The vote has to be repeated.",
        ],
        answer: 0,
        explain: "„These two are not alternatives“ — yani biri ötekinin yerine geçmiyor, ikisi birlikte yürüyecek.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l4",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "A Paid Coach?",
    genre: "Tartışma",
    intro: "Bir spor kulübünün toplantısını dinleyeceksin: öneri ne, itiraz ne, hangi karar alınıyor.",
    gloss: [
      { de: "coach", tr: "antrenör" },
      { de: "proposal", tr: "öneri" },
      { de: "part-time", tr: "yarı zamanlı" },
      { de: "fee", tr: "aidat" },
      { de: "fair", tr: "adil" },
      { de: "roof", tr: "çatı" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Chair", text: "Point four: the coach. Elif, you wrote the proposal. Two minutes, please." },
      { speaker: "Elif", text: "Short version. We have ninety children and four volunteer trainers. Two of them told me in January that they would stop in the summer. If we do nothing, we close two groups." },
      { speaker: "Elif", text: "A part-time coach costs about nine hundred euros a month. That is eight euros more per child per month." },
      { speaker: "Chair", text: "Ruben, you said last week that you were against it." },
      { speaker: "Ruben", text: "I said I was against the way it was presented, not against a coach. We were told that the money was there. Then we heard that the roof also needs work. I want one paper with both numbers on it." },
      { speaker: "Elif", text: "That is fair. I can do that by Friday." },
      { speaker: "Tuana", text: "Can I say something practical? Eight euros is nothing for me and a lot for three families I know. If we do this, we need a quiet way for them to pay less." },
      { speaker: "Chair", text: "Noted. So: Elif brings one paper with the coach and the roof. Tuana writes two lines about reduced fees. We decide on the ninth. Anybody against?" },
      { speaker: "Ruben", text: "Not against. Just tired of deciding twice." },
    ],
    questions: [
      {
        text: "What is the meeting point about?",
        options: ["hiring a paid coach", "repairing the roof", "the number of children in the club"],
        answer: 0,
        explain: "„Point four: the coach. Elif, you wrote the proposal.“",
      },
      {
        text: "What did Ruben say he was against?",
        options: ["the way the plan was presented", "the coach herself", "the price of the roof"],
        answer: 0,
        explain: "„I said I was against the way it was presented, not against a coach.“",
      },
      {
        kind: "truefalse",
        text: "Two volunteer trainers want to stop in the summer.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Two of them told me in January that they would stop in the summer.“",
      },
      {
        kind: "short_answer",
        text: "What will Tuana write?",
        options: [],
        answer: 0,
        accept: ["two lines about reduced fees", "about reduced fees", "two lines on lower fees"],
        explain: "„Tuana writes two lines about reduced fees.“",
      },
      {
        kind: "dictation",
        text: "Ruben'in ne istediğini söylediği cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["I want one paper with both numbers on it.", "I want one paper with both numbers on it"],
        explain: "„I want one paper with both numbers on it.“ — istek doğrudan ve tek cümlede.",
      },
      {
        text: "What is decided at the end?",
        options: [
          "They will decide on the ninth.",
          "They will hire the coach today.",
          "They will close two groups.",
        ],
        answer: 0,
        explain: "„We decide on the ninth. Anybody against?“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w4",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "What the Agency Told Me",
    genre: "Resmî e-posta",
    intro: "Telefonda konuşulanları yazılı olarak teyit edeceksin; önce iki cümle kur, sonra e-postayı yaz.",
    gloss: [
      { de: "heating", tr: "kalorifer" },
      { de: "confirm", tr: "teyit etmek" },
      { de: "hallway", tr: "koridor" },
      { de: "notice", tr: "duyuru" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bana işin nisanda başlayacağını söylediniz.",
        answer: "You told me that the work would start in April.",
        hint: "Aktarımda zaman bir adım geriye gider: will → would. „that“ atılabilir.",
      },
      {
        kind: "build",
        tr: "Meslektaşınız pencerelerin değiştirilmeyeceğini söyledi.",
        answer: "Your colleague said that the windows would not be changed.",
        hint: "Olumsuz biçim de geriye kayar: will not → would not.",
      },
      {
        kind: "free",
        prompt:
          "Bir kurumla telefonda konuştun. Konuşulanları yazılı teyit eden bir e-posta yaz: kiminle ve ne zaman konuştun, sana söylenen üç şey, açık kalan noktalar, ne beklediğin ve son tarih.",
        checklist: [
          "Görüşmenin tarihini ve kişiyi yaz",
          "Söylenen üç şeyi dolaylı anlatımla aktar",
          "Açık kalan noktaları adlandır",
          "Ne beklediğini ve son tarihi yaz",
        ],
        minWords: 60,
        phrases: [
          { de: "I am writing to confirm …", tr: "… teyit etmek için yazıyorum" },
          { de: "He told me that …", tr: "Bana … olduğunu söyledi" },
          { de: "He also said that …", tr: "Ayrıca … olduğunu söyledi" },
          { de: "Two points stayed open.", tr: "İki nokta açık kaldı." },
          { de: "If any of the above is not correct, …", tr: "Yukarıdakilerden biri doğru değilse, …" },
        ],
        sample:
          "Dear Ms. Ortega, I am writing to confirm our phone call of the third of May at about eleven o'clock. " +
          "Your colleague Mr. Hedin told me that the work on the heating would start in the week of the twelfth " +
          "of May and that it would take four working days. He also said that the water would be turned off " +
          "between nine and four on the first two days, and that a notice would be put in the hallway one week " +
          "before. Two points stayed open. He could not say whether the windows in the back rooms would be " +
          "changed at the same time, and he did not know who I should call if there is a problem at the weekend. " +
          "Could you send me those two answers in writing before the eighth of May? If any of the above is not " +
          "correct, please tell me. Yours sincerely, Emre Bulut",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s4",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "News from People or Apps?",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: ikili soruyu böl, her tarafa bir iş ver ve kendi kuralını söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Haberi insanlardan mı yoksa uygulamalardan mı almak daha iyi? Soruyu ikiye bölerek yanıtla, birer örnek ver ve kendi kuralını söyle.",
      bulletsTr: [
        "İki seçenekten birini seçmek yerine ikisine ayrı iş ver",
        "Uygulamanın iyi olduğu bir örnek anlat",
        "İnsanların iyi olduğu bir örnek anlat",
        "İkisinin de zayıf yanını söyle ve kendi kuralınla bitir",
      ],
      targets: [
        { de: "I would not choose between them, because …", tr: "İkisi arasında seçim yapmazdım, çünkü …" },
        { de: "Apps are better at …, people are better at …", tr: "Uygulamalar … konusunda, insanlar … konusunda daha iyi" },
        { de: "The problem with … is that …", tr: "…'nin sorunu şu ki …" },
        { de: "My own rule is …", tr: "Benim kuralım …" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "I would not choose between them, because they do different jobs. Apps are better at telling me that " +
        "something happened; people are better at telling me whether it matters. If a bridge is closed, I want " +
        "that from an app, in ten seconds, with a map. But last year the school in our street changed its hours, " +
        "and I found out from a neighbor at the letter boxes, three weeks before the letter came. No app knew, " +
        "because nobody had written it down. The problem with people is that they tell you what they are " +
        "interested in, and the problem with apps is that they tell you what keeps you looking. My own rule is " +
        "about the order: I read one news site once a day and then I stop. Everything else I hear from " +
        "somebody, and if I hear it twice from two different people, I look it up.",
      rubricHint:
        "İki seçenek de bir işle eşleştirilmeli ve en az bir somut örnek verilmeli; dolaylı anlatım doğal olarak geçebilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g4",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "He said that he was tired",
    genre: "Kural",
    intro: "Söyleneni aktarırken İngilizcede zaman bir adım geriye kayar; Türkçede böyle bir kayma yoktur.",
    focus: "Reported speech: zaman kayması ve soru aktarımı",
    gloss: [
      { de: "tired", tr: "yorgun" },
      { de: "finish", tr: "bitirmek" },
      { de: "whether", tr: "olup olmadığı" },
      { de: "live", tr: "yaşamak" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Bir adım geriye",
        tr: "Türkçede „yorgunum“ cümlesi „yorgun olduğunu söyledi“ olur ve zaman değişmez. İngilizcede aktaran fiil geçmişse aktarılan fiil bir adım geriye kayar: is → was, does → did, will → would, can → could, have done → had done.",
        examples: [
          { de: "“I am tired.” → He said that he was tired.", tr: "„Yorgunum.“ → Yorgun olduğunu söyledi." },
          { de: "“I will call you.” → She said that she would call me.", tr: "„Seni arayacağım.“ → Beni arayacağını söyledi." },
          { de: "“We have finished.” → They said that they had finished.", tr: "„Bitirdik.“ → Bitirdiklerini söylediler." },
        ],
      },
      {
        heading: "Zamirler ve zaman sözcükleri de kayar",
        tr: "Kim konuşuyorsa zamir ona göre değişir; yer ve zaman sözcükleri de uzaklaşır: here → there, tomorrow → the next day, yesterday → the day before.",
        examples: [
          { de: "“I saw her yesterday.” → He said that he had seen her the day before.", tr: "„Onu dün gördüm.“ → Onu bir gün önce gördüğünü söyledi." },
          { de: "“I live here.” → She said that she lived there.", tr: "„Burada yaşıyorum.“ → Orada yaşadığını söyledi." },
          { de: "“I can help.” → He said that he could help.", tr: "„Yardım edebilirim.“ → Yardım edebileceğini söyledi." },
        ],
      },
      {
        heading: "Soruyu aktarırken soru sırası biter",
        tr: "Aktarılan soruda soru dizilişi ve yardımcı fiil kaybolur; cümle düz cümle gibi kurulur. Soru kelimesi yoksa „if“ ya da „whether“ eklenir.",
        examples: [
          { de: "“Where do you live?” → He asked where I lived.", tr: "„Nerede yaşıyorsun?“ → Nerede yaşadığımı sordu." },
          { de: "“Do you have time?” → She asked if I had time.", tr: "„Vaktin var mı?“ → Vaktimin olup olmadığını sordu." },
          { de: "“Are you coming?” → He asked whether I was coming.", tr: "„Geliyor musun?“ → Gelip gelmediğimi sordu." },
        ],
      },
    ],
    questions: [
      {
        text: "“I am tired.” → He said that he ___ tired.",
        options: ["was", "is", "were"],
        answer: 0,
        explain: "Aktaran fiil geçmiş olduğu için „am“ bir adım geriye kayar: was.",
      },
      {
        text: "“I will call you.” → She said that she ___ call me.",
        options: ["would", "will", "would to"],
        answer: 0,
        explain: "„will“ aktarımda „would“ olur ve arkasından yalın fiil gelir.",
      },
      {
        text: "“Where do you live?” → He asked where I ___.",
        options: ["lived", "did live", "do live"],
        answer: 0,
        explain: "Aktarılan soruda yardımcı fiil kalkar ve zaman geriye kayar: lived.",
      },
      {
        kind: "gapfill",
        text: "“I can help.” → He said that he ___ help.",
        options: [],
        answer: 0,
        accept: ["could"],
        explain: "„can“ aktarımda „could“ olur.",
      },
      {
        kind: "gapfill",
        text: "“Do you have time?” → She asked ___ I had time.",
        options: [],
        answer: 0,
        accept: ["if", "whether"],
        explain: "Soru kelimesi yoksa „if“ ya da „whether“ eklenir.",
      },
      {
        kind: "gapfill",
        text: "“We have finished.” → They said that they ___ finished.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "„have finished“ aktarımda „had finished“ olur.",
      },
      {
        kind: "gapfill",
        text: "“I saw her yesterday.” → He said that he had seen her the day ___.",
        options: [],
        answer: 0,
        accept: ["before"],
        explain: "Zaman sözcükleri de uzaklaşır: yesterday → the day before.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She", "asked", "where", "I", "lived"],
        explain: "Aktarılan soruda düz cümle sırası kullanılır: She asked where I lived.",
      },
      {
        kind: "truefalse",
        text: "“He asked where did I live.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Aktarımda soru dizilişi kullanılmaz; doğrusu „He asked where I lived.“",
      },
      {
        kind: "truefalse",
        text: "“She told me that she was moving to Rome.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„is moving“ bir adım geriye kayarak „was moving“ olmuş; cümle doğru.",
      },
    ],
  },
];
