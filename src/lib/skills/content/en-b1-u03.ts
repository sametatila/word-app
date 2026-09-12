import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 3 — "Değerlendirme, istifa, ev arama, daire gezme".
 *
 * Dört ders: The appraisal · Resigning and handing over ·
 * Looking for a flat · The viewing.
 *
 *   Kelime: appraisal, improve, progress, criticism, praise, target,
 *           honest, review, resign, handover, replacement, grateful,
 *           although, however, despite, staff, rent, landlord, deposit,
 *           advert, viewing, furnished, available, agency, balcony,
 *           basement, ceiling, spacious, bright, storage, view, corridor.
 *   Kalıp:  She said that I had improved. ·
 *           He told me to set a new target. · She asked if I was happy. ·
 *           Although I am leaving, I am grateful. ·
 *           The work was hard. However, the staff was kind. ·
 *           Despite the pressure, I stayed calm. ·
 *           I have seen five flats this month. ·
 *           I saw that flat last week. · Is the flat still available? ·
 *           The flat that I saw yesterday was bright. ·
 *           The flat I saw yesterday was bright. ·
 *           The woman who showed me the flat was kind.
 *
 * Ünitenin tek öğretme noktası DOLAYLI ANLATIM ve onun üç ayrı biçimi:
 * „said THAT …“, „told me TO …“, „asked IF …“. Üçü de aktarıyor ama
 * sözdizimleri farklı ve seçim aktarılan cümlenin türüne bağlı — bildirme,
 * buyruk, soru. Yanında zamanın bir basamak geriye kayması var: „improved“
 * aktarılınca „had improved“ oluyor.
 */
export const enB1U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u3-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 3,
    title: "The appraisal",
    genre: "story",
    intro: "Bir değerlendirme görüşmesi. Zor olan kısım hangisiymiş?",
    gloss: [
      { de: "nowhere", tr: "hiçbir yere" },
      { de: "meant", tr: "kastetti" },
      { de: "the line", tr: "satır" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 7,
    text:
      "My appraisal was on a Tuesday at four, which is the worst hour for honest words.\n" +
      "She said that I had improved. Then she said the line I remember: the progress is real, but nobody outside this room can see it.\n" +
      "I asked what she meant. She told me to write down three things I had finished in the last six months, in one line each. Nine words, she said. Not nine pages.\n" +
      "I had thought criticism was the hard part of an appraisal. It is not. The hard part is praise you cannot use. „Good work“ goes nowhere. „You closed the thing that had been open for two years“ goes into the next conversation about salary.\n" +
      "She asked if I was happy. I said yes and then I said: not with the target. The target was written in January by somebody who had left in March.\n" +
      "We set a new one together. It is smaller and it has a date.\n" +
      "The last thing she told me was not about work. She said that most people leave an appraisal and do nothing for eleven months. Then they remember it the week before the next one.\n" +
      "I wrote the three lines that evening. It took twenty minutes and I have used them twice since.",
    questions: [
      {
        text: "What did she ask the writer to do?",
        options: ["write three things in one line each", "read the old target", "wait eleven months"],
        answer: 0,
        explain: "„She told me to write down three things I had finished in the last six months, in one line each.“",
      },
      {
        text: "What is the hard part of an appraisal?",
        options: ["praise you cannot use", "criticism", "the hour"],
        answer: 0,
        explain: "„I had thought criticism was the hard part … The hard part is praise you cannot use.“",
      },
      {
        kind: "truefalse",
        text: "The writer was happy with the old target.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I said yes and then I said: not with the target.“",
      },
      {
        kind: "gapfill",
        text: "The old target was written in ___.",
        options: [],
        answer: 0,
        accept: ["January"],
        explain: "„The target was written in January by somebody who had left in March.“",
      },
      {
        kind: "order",
        text: "Görüşmenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "She said that I had improved.",
          "She told me to write down three things.",
          "She asked if I was happy.",
          "We set a new target together.",
        ],
        explain: "Bildirme, buyruk, soru, karar — dolaylı anlatımın üç biçimi sırayla.",
      },
      {
        kind: "short_answer",
        text: "How long did the three lines take?",
        options: [],
        answer: 0,
        accept: ["twenty minutes", "20 minutes"],
        explain: "„It took twenty minutes and I have used them twice since.“",
      },
    ],
  },
  {
    id: "en-b1-u3-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 3,
    title: "The viewing",
    genre: "dialogue",
    intro: "Daire geziliyor. Hangi iki soru her şeyi söylüyor?",
    gloss: [
      { de: "Agent", tr: "emlakçı" },
      { de: "dry", tr: "kuru" },
      { de: "above", tr: "üst katta" },
      { de: "inside", tr: "içeride" },
    ],
    minutes: 7,
    text:
      "Agent: This is the flat that I mentioned on the phone.\n" +
      "Sena: It is brighter than the photos.\n" +
      "Agent: The photos were taken in November. The woman who lived here painted the corridor.\n" +
      "Sena: And the ceiling is high. What is the storage like?\n" +
      "Agent: There is a basement, two metres by three, and the cupboard in the corridor.\n" +
      "Sena: Is the basement dry?\n" +
      "Agent: In this building, yes. I would not say that about the one next door.\n" +
      "Sena: That is an honest answer. The flat I saw yesterday was spacious but the landlord was not there.\n" +
      "Agent: Who showed it?\n" +
      "Sena: A man who had never been inside. He read the advert to me in the kitchen.\n" +
      "Agent: That happens. Ask two questions and you know: when was the heating last checked, and who lives above.\n" +
      "Sena: Who lives above?\n" +
      "Agent: A teacher and a cat. The cat is loud on Sunday morning.\n" +
      "Sena: I can live with that. Is the flat still available?\n" +
      "Agent: Until Friday. Two viewings after you, and both of them asked about the basement.",
    questions: [
      {
        text: "Why is the flat brighter than the photos?",
        options: ["the photos were taken in November", "the corridor is painted", "the ceiling is high"],
        answer: 0,
        explain: "„The photos were taken in November.“ — kasımda ışık az.",
      },
      {
        text: "What was wrong at the flat Sena saw yesterday?",
        options: ["the landlord was not there", "it was too small", "the basement was wet"],
        answer: 0,
        explain: "„The flat I saw yesterday was spacious but the landlord was not there.“",
      },
      {
        kind: "truefalse",
        text: "The man yesterday had seen the flat before.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A man who had never been inside. He read the advert to me in the kitchen.“",
      },
      {
        kind: "gapfill",
        text: "The flat is available until ___.",
        options: [],
        answer: 0,
        accept: ["Friday"],
        explain: "„Until Friday. Two viewings after you…“",
      },
      {
        kind: "short_answer",
        text: "Which two questions does the agent suggest?",
        options: [],
        answer: 0,
        accept: ["the heating and above", "heating and neighbours", "about the heating"],
        explain: "„when was the heating last checked, and who lives above.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u3-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 3,
    title: "Resigning and handing over",
    genre: "monologue",
    intro: "Beş haftalık devir teslim. Hangi sayı neden önemli?",
    gloss: [
      { de: "rarer", tr: "daha ender" },
      { de: "pressure", tr: "baskı" },
      { de: "covered for me", tr: "yerime bakmıştı" },
      { de: "matter", tr: "önemli olmak" },
      { de: "anyway", tr: "zaten" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "I resigned on a Thursday and the handover took five weeks. Both numbers matter." },
      { speaker: "Ela", text: "Although I am leaving, I am grateful. That is not a polite line; it is the reason I gave six weeks and not four." },
      { speaker: "Ela", text: "The work was hard. However, the staff was kind, and kind staff is rarer than easy work." },
      { speaker: "Ela", text: "My replacement started two weeks before my last day. That was my one rule and the manager agreed in the same meeting." },
      { speaker: "Ela", text: "Despite the pressure of those two weeks, we wrote everything down. Forty pages, most of them boring." },
      { speaker: "Ela", text: "The boring pages are the handover. The interesting parts everybody remembers anyway." },
      { speaker: "Ela", text: "On my last day somebody asked why I was happy. I said: because nobody will call me in November." },
      { speaker: "Ela", text: "They called me in November. I answered, because the person who called had covered for me twice in April." },
    ],
    questions: [
      {
        text: "How long did the handover take?",
        options: ["five weeks", "two weeks", "six weeks"],
        answer: 0,
        explain: "„I resigned on a Thursday and the handover took five weeks.“",
      },
      {
        text: "What was Ela's one rule?",
        options: ["the replacement starts two weeks before", "six weeks of notice", "forty pages"],
        answer: 0,
        explain: "„My replacement started two weeks before my last day. That was my one rule…“",
      },
      {
        kind: "truefalse",
        text: "Nobody called Ela in November.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They called me in November. I answered…“",
      },
      {
        kind: "gapfill",
        text: "The handover was ___ pages.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„Forty pages, most of them boring.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Although I am leaving, I am grateful.", "Although I am leaving, I am grateful"],
        explain: "„although“ bir CÜMLE bağlıyor; „despite“ ise isim isterdi.",
      },
      {
        kind: "short_answer",
        text: "Why did Ela answer the call?",
        options: [],
        answer: 0,
        accept: ["that person had covered", "they covered for her", "because of April"],
        explain: "„…because the person who called had covered for me twice in April.“",
      },
    ],
  },
  {
    id: "en-b1-u3-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 3,
    title: "Looking for a flat",
    genre: "dialogue",
    intro: "Beş daire, hiç imza yok. Neden?",
    gloss: [
      { de: "payslips", tr: "maaş bordroları" },
      { de: "the moment to leave", tr: "kalkma anı" },
      { de: "That is different from", tr: "şundan farklı" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "I have seen five flats this month and I have not signed anything." },
      { speaker: "Nil", text: "Five is a lot. What is wrong with them?" },
      { speaker: "Mert", text: "Nothing is wrong. That is the problem. I saw that flat near the park last week — bright, furnished, fine." },
      { speaker: "Nil", text: "And?" },
      { speaker: "Mert", text: "The deposit was three months. The landlord said that everybody pays three months here." },
      { speaker: "Nil", text: "Everybody does not. Two is normal in this city." },
      { speaker: "Mert", text: "He also said that the advert was old and the rent had changed." },
      { speaker: "Nil", text: "That is the moment to leave. An advert is a price." },
      { speaker: "Mert", text: "The agency told me to send my last three payslips before the viewing." },
      { speaker: "Nil", text: "Before? After a viewing, yes. Before, no." },
      { speaker: "Mert", text: "I asked if that was normal. She said it was." },
      { speaker: "Nil", text: "She said it was. That is different from: it is." },
      { speaker: "Mert", text: "So five flats and no flat." },
      { speaker: "Nil", text: "Five flats and two rules you did not have in September. That is not nothing." },
    ],
    questions: [
      {
        text: "What did the landlord say about the deposit?",
        options: ["everybody pays three months", "two months is normal", "it depends on the flat"],
        answer: 0,
        explain: "„The landlord said that everybody pays three months here.“ — Nil bunun doğru olmadığını söylüyor.",
      },
      {
        text: "What did the agency ask for before the viewing?",
        options: ["three payslips", "a deposit", "a signature"],
        answer: 0,
        explain: "„The agency told me to send my last three payslips before the viewing.“",
      },
      {
        kind: "truefalse",
        text: "Mert has signed a contract.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have seen five flats this month and I have not signed anything.“",
      },
      {
        kind: "gapfill",
        text: "In this city ___ months is a normal deposit.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„Everybody does not. Two is normal in this city.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I asked if that was normal.", "I asked if that was normal"],
        explain: "Evet-hayır sorusu „if“ ile aktarılıyor ve sıra düz cümleye dönüyor.",
      },
      {
        kind: "short_answer",
        text: "What has Mert got from the five viewings?",
        options: [],
        answer: 0,
        accept: ["two rules", "two new rules", "rules"],
        explain: "„Five flats and two rules you did not have in September.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u3-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 3,
    title: "She said that I had improved",
    genre: "personal",
    intro: "Dolaylı anlatımın üç biçimi. Hangisi bildirme, hangisi buyruk, hangisi soru?",
    gloss: [
      { de: "said that", tr: "dedi ki" },
      { de: "told me to", tr: "bana söyledi" },
      { de: "asked if", tr: "sordu" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Geliştiğimi söyledi.",
        answer: "She said that I had improved.",
        alternatives: ["She said I had improved."],
        hint: "Aktarılınca zaman bir basamak geriye kayıyor: „improved“ → „had improved“.",
      },
      {
        kind: "build",
        tr: "Bana yeni bir hedef koymamı söyledi.",
        answer: "He told me to set a new target.",
        hint: "„tell“ kişiyi doğrudan alıyor ve sonrası mastar; „say“ bunu yapamaz.",
      },
      {
        kind: "build",
        tr: "Mutlu olup olmadığımı sordu.",
        answer: "She asked if I was happy.",
        hint: "Evet-hayır sorusu „if“ ile aktarılıyor ve sıra düz cümleye dönüyor.",
      },
      {
        kind: "build",
        tr: "Ayrılıyor olmama rağmen minnettarım.",
        answer: "Although I am leaving, I am grateful.",
        hint: "„although“ bir cümle bağlıyor; „despite“ ise isim ister.",
      },
      {
        kind: "form",
        prompt: "Değerlendirme kartını doldur.",
        facts: "Gelişme gerçek; dışarıdan görünmüyor; üç satır yazılacak; yeni hedef tarihli.",
        fields: [
          { label: "Progress", answer: "good", accept: ["it is good"] },
          { label: "Problem", answer: "nobody can see it", accept: ["nobody sees it"] },
          { label: "Task", answer: "three lines", accept: ["3 lines"] },
          { label: "New target", answer: "with a date", accept: ["smaller", "it has a date"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u3-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 3,
    title: "The flat that I saw yesterday was bright",
    genre: "personal",
    intro: "Sıfat cümleleri. „that“ ne zaman düşebiliyor?",
    gloss: [
      { de: "that I saw", tr: "gördüğüm" },
      { de: "who showed", tr: "gösteren" },
      { de: "still available", tr: "hâlâ müsait" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Dün gördüğüm daire aydınlıktı.",
        answer: "The flat that I saw yesterday was bright.",
        hint: "„that“ burada NESNE konumunda; ismi arkadan tamlayan bir cümle kuruyor.",
      },
      {
        kind: "build",
        tr: "Bana daireyi gösteren kadın nazikti.",
        answer: "The woman who showed me the flat was kind.",
        hint: "„who“ burada ÖZNE konumunda ve bu yüzden düşemez.",
      },
      {
        kind: "build",
        tr: "Gönderdiğim rapor geç kaldı.",
        answer: "The report I sent was late.",
        hint: "Nesne konumundaki bağlaç düşebiliyor: „the report that I sent“ ile aynı şey.",
      },
      {
        kind: "build",
        tr: "Bu ay beş daire gördüm.",
        answer: "I have seen five flats this month.",
        alternatives: ["I've seen five flats this month."],
        hint: "Ay bitmedi, o yüzden present perfect; „last week“ olsaydı sade geçmiş olurdu.",
      },
      {
        kind: "build",
        tr: "Daire hâlâ müsait mi?",
        answer: "Is the flat still available?",
        hint: "„still“ „be“ fiilinden sonra geliyor.",
      },
    ],
  },
];
