import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 7 — "Kayıp eşya, olayların sırası, aktarılan sözler, haber".
 *
 * Dört ders: The one with the handle · What had happened · What they said ·
 * In the news.
 *
 *   Kelime: describe, shape, size, material, leather, label, lost, handle,
 *           happen, suddenly, realise, manage, miss, luckily, finally,
 *           mess, state, discussion, point, decision, summary, suggest,
 *           chair, note, report, announce, source, official, recent,
 *           investigate, witness, claim.
 *   Kalıp:  It is the bag that has a red handle. ·
 *           It is the one I bought last year. ·
 *           The man who found it left his number. ·
 *           I had left my keys at home. · Then I realised the problem. ·
 *           By the time I arrived, the shop had closed. ·
 *           She said that the budget had changed. ·
 *           He suggested starting earlier. ·
 *           The chair asked if we agreed. ·
 *           The report was published last week. ·
 *           A decision was announced by the council. ·
 *           The case is being investigated.
 *
 * Ünitenin tek öğretme noktası EDİLGENİN SÜRERLİ BİÇİMİ: „The case is
 * being investigated.“ Ünite 2 yalın edilgeni getirmişti; burada „şu anda
 * sürüyor“ anlamı ekleniyor ve haber dili bu biçimle konuşuyor. Ayrım
 * İngilizcede iki ayrı cümle: „is investigated“ düzenli olanı, „is being
 * investigated“ şu anda olanı söylüyor.
 */
export const enB1U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u7-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 7,
    title: "In the news",
    genre: "report",
    intro: "Üç haber, üç edilgen biçim. Hangisi bitti, hangisi sürüyor?",
    gloss: [
      { de: "council", tr: "belediye meclisi" },
      { de: "figures", tr: "rakamlar" },
      { de: "so far", tr: "şimdiye kadar" },
      { de: "verbs", tr: "fiiller" },
      { de: "bridge", tr: "köprü" },
      { de: "event", tr: "olay" },
      { de: "sentence", tr: "cümle" },
      { de: "lane", tr: "şerit" },
      { de: "appears", tr: "görünüyor" },
    ],
    minutes: 7,
    text:
      "Three short items from this week, and three different things happening to three verbs.\n" +
      "The report on the bridge was published last week. It is finished, it is on the website, and the figures in it are from March. That is a closed event and the language shows it.\n" +
      "A decision was announced by the council on Tuesday. Here the source is named, because a decision without a name behind it is not news. The council announced it; the sentence is turned over to put the decision first.\n" +
      "The case is being investigated. Nothing is finished. Nobody has said who did what. This form says one thing only: the work is happening now and there is no result yet.\n" +
      "A witness has claimed that the second lane was closed on Monday morning. Claimed, not said — the paper is telling you it has one voice for this and no official source.\n" +
      "So far the council has not answered our questions. That line appears in almost every report of this kind and it is the most honest one on the page.",
    questions: [
      {
        text: "Which item is finished?",
        options: ["the report on the bridge", "the case", "the questions"],
        answer: 0,
        explain: "„The report on the bridge was published last week. It is finished…“",
      },
      {
        text: "What does „is being investigated“ tell the reader?",
        options: ["the work is happening now", "the work is finished", "nobody is working on it"],
        answer: 0,
        explain: "„This form says one thing only: the work is happening now and there is no result yet.“",
      },
      {
        kind: "truefalse",
        text: "The council has answered the questions.",
        options: ["True", "False"],
        answer: 1,
        explain: "„So far the council has not answered our questions.“",
      },
      {
        kind: "gapfill",
        text: "The decision was announced by the ___.",
        options: [],
        answer: 0,
        accept: ["council"],
        explain: "„A decision was announced by the council on Tuesday.“",
      },
      {
        kind: "order",
        text: "Haberlerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The report was published last week.",
          "A decision was announced by the council.",
          "The case is being investigated.",
          "The council has not answered our questions.",
        ],
        explain: "Bitmiş olay, duyurulan karar, süren soruşturma, cevapsız soru.",
      },
      {
        kind: "short_answer",
        text: "Why does the paper write „claimed“?",
        options: [],
        answer: 0,
        accept: ["one voice only", "no official source", "it is not confirmed"],
        explain: "„the paper is telling you it has one voice for this and no official source.“",
      },
    ],
  },
  {
    id: "en-b1-u7-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 7,
    title: "What had happened",
    genre: "story",
    intro: "Kötü bir sabah. Hangi olay hangisinden önce oldu?",
    gloss: [
      { de: "handle", tr: "sap" },
      { de: "row", tr: "sıra" },
      { de: "version", tr: "sürüm" },
      { de: "flatmate", tr: "ev arkadaşı" },
      { de: "inside", tr: "içinde" },
      { de: "pocket", tr: "cep" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 7,
    text:
      "By the time I arrived, the shop had closed. That is the short version and it hides the interesting part.\n" +
      "I had left my keys at home. I realised it at the bus stop, which is eight minutes from the door and eleven minutes back, so I ran.\n" +
      "The bag was on the table where I had put it the night before. Brown leather, one broken handle, a label with my name on it from a course in March. I took it and ran again.\n" +
      "On the bus I suddenly realised the second problem: the bag was the wrong one. Same shape, same size, same material. My flatmate had bought hers in the same shop.\n" +
      "Luckily the man who found my bag on the bus the week before had left his number inside the front pocket. I called him from the shop door at two minutes past six, and he laughed before I finished the sentence.\n" +
      "He had had the same morning in April. His keys had been in the bag he did not take.\n" +
      "Finally I got home at seven. The mess on the table was the same mess. I put both bags in different rows on the shelf, and I wrote on one of them: not yours.",
    questions: [
      {
        text: "Why did the writer go back home?",
        options: ["the keys were at home", "the shop had closed", "the bag was broken"],
        answer: 0,
        explain: "„I had left my keys at home. I realised it at the bus stop…“",
      },
      {
        text: "What was wrong with the bag on the bus?",
        options: ["it was the flatmate's bag", "the handle was broken", "there was no label"],
        answer: 0,
        explain: "„the bag was the wrong one. Same shape, same size, same material.“",
      },
      {
        kind: "truefalse",
        text: "The man on the phone had never had this problem.",
        options: ["True", "False"],
        answer: 1,
        explain: "„He had had the same morning in April.“",
      },
      {
        kind: "gapfill",
        text: "The writer got home at ___.",
        options: [],
        answer: 0,
        accept: ["seven", "7"],
        explain: "„Finally I got home at seven.“",
      },
      {
        kind: "short_answer",
        text: "What did the writer write on one bag?",
        options: [],
        answer: 0,
        accept: ["not yours", "the words not yours"],
        explain: "„…and I wrote on one of them: not yours.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u7-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 7,
    title: "What they said",
    genre: "meeting",
    intro: "Toplantı özeti. Kim ne söyledi, kim ne önerdi?",
    gloss: [
      { de: "the chair", tr: "toplantı başkanı" },
      { de: "minutes", tr: "tutanak" },
      { de: "on record", tr: "kayda geçmiş" },
      { de: "matters", tr: "önemli" },
      { de: "software", tr: "yazılım" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "I missed the meeting. What did I miss?" },
      { speaker: "Can", text: "Four points. She said that the budget had changed. That is the only one that matters." },
      { speaker: "Nil", text: "Changed how?" },
      { speaker: "Can", text: "Less for travel, more for the software. The decision was announced in the first five minutes." },
      { speaker: "Nil", text: "And the discussion?" },
      { speaker: "Can", text: "Long. He suggested starting earlier, which is what he suggests every year." },
      { speaker: "Nil", text: "Starting earlier than what?" },
      { speaker: "Can", text: "Than the day we always start. Nobody asked that question, so it stayed in the summary as a good idea." },
      { speaker: "Nil", text: "Did anybody state a date?" },
      { speaker: "Can", text: "The chair asked if we agreed. Two people said yes and the rest said nothing, and that counts as yes." },
      { speaker: "Nil", text: "So we have a date and nobody knows it." },
      { speaker: "Can", text: "We have a note. I wrote it down: earlier, to be fixed. Those five words are on record now." },
      { speaker: "Nil", text: "Then I will ask for the date in writing tomorrow." },
      { speaker: "Can", text: "Do that. A point that is not in the minutes did not happen." },
    ],
    questions: [
      {
        text: "What is the one point that matters?",
        options: ["the budget had changed", "the meeting started late", "the chair was away"],
        answer: 0,
        explain: "„She said that the budget had changed. That is the only one that matters.“",
      },
      {
        text: "What did he suggest?",
        options: ["starting earlier", "a bigger budget", "a new summary"],
        answer: 0,
        explain: "„He suggested starting earlier, which is what he suggests every year.“",
      },
      {
        kind: "truefalse",
        text: "Everybody said yes to the chair.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Two people said yes and the rest said nothing, and that counts as yes.“",
      },
      {
        kind: "gapfill",
        text: "There were ___ points in the meeting.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Four points. She said that the budget had changed…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["She said that the budget had changed.", "She said that the budget had changed"],
        explain: "Aktarılınca zaman geriye kayıyor: „changed“ → „had changed“.",
      },
      {
        kind: "short_answer",
        text: "What will Nil ask for tomorrow?",
        options: [],
        answer: 0,
        accept: ["the date", "a date in writing", "the date in writing"],
        explain: "„Then I will ask for the date in writing tomorrow.“",
      },
    ],
  },
  {
    id: "en-b1-u7-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 7,
    title: "The one with the handle",
    genre: "phone",
    intro: "Kayıp eşya bürosu. Hangi ayrıntı çantayı bulduruyor?",
    gloss: [
      { de: "lost property", tr: "kayıp eşya" },
      { de: "zip", tr: "fermuar" },
      { de: "narrow it down", tr: "daraltmak" },
      { de: "inside", tr: "içinde" },
      { de: "brown", tr: "kahverengi" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Office", text: "Lost property, good afternoon." },
      { speaker: "Ela", text: "I left a bag on the number two tram yesterday evening." },
      { speaker: "Office", text: "We have eleven bags from yesterday. Can you describe it?" },
      { speaker: "Ela", text: "It is the bag that has a red handle. Brown leather, one red handle, one normal." },
      { speaker: "Office", text: "That narrows it down. Size?" },
      { speaker: "Ela", text: "Small. It is the one I bought last year in this city, so the label is in English." },
      { speaker: "Office", text: "And inside?" },
      { speaker: "Ela", text: "A blue notebook, a charger, and a photo of two people at a lake." },
      { speaker: "Office", text: "I have a brown bag with one red handle here. The zip on the front is broken." },
      { speaker: "Ela", text: "That is it. The zip broke in March." },
      { speaker: "Office", text: "Good. One more thing: the man who found it left his number. He asked us to tell you." },
      { speaker: "Ela", text: "Then I will call him. Can I collect the bag today?" },
      { speaker: "Office", text: "Until six. Bring something with your name on it — the notebook is not enough, because anybody can describe a notebook." },
      { speaker: "Ela", text: "The photo at the lake. I am in it." },
    ],
    questions: [
      {
        text: "What makes the bag easy to find?",
        options: ["one red handle", "the blue notebook", "the English label"],
        answer: 0,
        explain: "„It is the bag that has a red handle. … That narrows it down.“",
      },
      {
        text: "What does the office ask Ela to bring?",
        options: ["something with her name", "the charger", "a second photo"],
        answer: 0,
        explain: "„Bring something with your name on it — the notebook is not enough…“",
      },
      {
        kind: "truefalse",
        text: "The zip broke yesterday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is it. The zip broke in March.“",
      },
      {
        kind: "gapfill",
        text: "The office has ___ bags from yesterday.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„We have eleven bags from yesterday. Can you describe it?“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It is the bag that has a red handle.", "It is the bag that has a red handle"],
        explain: "Özne konumundaki „that“ düşemez, çünkü sıfat cümlesinin öznesi o.",
      },
      {
        kind: "short_answer",
        text: "What did the man who found the bag leave?",
        options: [],
        answer: 0,
        accept: ["his number", "a number", "a phone number"],
        explain: "„the man who found it left his number. He asked us to tell you.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u7-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 7,
    title: "The case is being investigated",
    genre: "report",
    intro: "Üç edilgen. Hangisi bitti, hangisi şu anda sürüyor?",
    gloss: [
      { de: "was published", tr: "yayımlandı" },
      { de: "is being investigated", tr: "soruşturuluyor" },
      { de: "announced", tr: "duyuruldu" },
      { de: "lane", tr: "şerit" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Rapor geçen hafta yayımlandı.",
        answer: "The report was published last week.",
        hint: "Bitmiş bir olay: yalın edilgen geçmiş.",
      },
      {
        kind: "build",
        tr: "Belediye meclisi bir karar duyurdu.",
        answer: "A decision was announced by the council.",
        hint: "Fail önemli olduğu için „by“ ile söyleniyor ve karar öne alınıyor.",
      },
      {
        kind: "build",
        tr: "Dava soruşturuluyor.",
        answer: "The case is being investigated.",
        hint: "Şu anda sürüyor: edilgenin sürerli biçimi. „is investigated“ düzenli olanı söylerdi.",
      },
      {
        kind: "build",
        tr: "Bir tanık ikinci şeridin kapalı olduğunu iddia etti.",
        answer: "A witness has claimed that the second lane was closed.",
        hint: "„claim“ burada „söyledi“ değil: kaynak tek ve doğrulanmamış.",
      },
      {
        kind: "form",
        prompt: "Haber kartını doldur.",
        facts: "Rapor geçen hafta yayımlandı; karar salı duyuruldu; dava sürüyor; meclis cevap vermedi.",
        fields: [
          { label: "Report", answer: "published last week", accept: ["last week"] },
          { label: "Decision", answer: "on Tuesday", accept: ["Tuesday"] },
          { label: "Case", answer: "being investigated", accept: ["not finished"] },
          { label: "Council", answer: "no answer", accept: ["has not answered"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u7-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 7,
    title: "By the time I arrived, the shop had closed",
    genre: "personal",
    intro: "Olayların sırası ve aktarılan sözler. Hangi biçim „daha önce“ diyor?",
    gloss: [
      { de: "By the time", tr: "vardığımda" },
      { de: "suggested", tr: "önerdi" },
      { de: "had changed", tr: "değişmişti" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Anahtarlarımı evde bırakmıştım.",
        answer: "I had left my keys at home.",
        hint: "Anlatının şu anından ÖNCE olan iş: „had“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Ben vardığımda dükkân kapanmıştı.",
        answer: "By the time I arrived, the shop had closed.",
        hint: "„By the time“ iki geçmişi bağlıyor; önce kapanma, sonra varış.",
      },
      {
        kind: "build",
        tr: "Bütçenin değiştiğini söyledi.",
        answer: "She said that the budget had changed.",
        alternatives: ["She said the budget had changed."],
        hint: "Aktarılınca zaman geriye kayıyor: „changed“ → „had changed“.",
      },
      {
        kind: "build",
        tr: "Daha erken başlamayı önerdi.",
        answer: "He suggested starting earlier.",
        hint: "„suggest“ sonrası „-ing“ istiyor; „suggest to start“ olmaz.",
      },
      {
        kind: "build",
        tr: "Başkan hemfikir olup olmadığımızı sordu.",
        answer: "The chair asked if we agreed.",
        hint: "Evet-hayır sorusu „if“ ile aktarılıyor; „chair“ burada başkan demek.",
      },
    ],
  },
];
