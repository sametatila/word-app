import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 1 — "Sabah bilgilendirmesi, devir notu, takdim, çeyrek
 * sonu".
 *
 * Dört ders: The morning briefing · The handover note ·
 * Introducing a colleague · By the end of the quarter.
 *
 *   Kelime: forecast, stakeholder, finding, brief, assess, indicator,
 *           monitor, remote, draft, absent, memo, circulate, outline,
 *           clarify, capacity, shift, coordinate, objective, delegate,
 *           priority, efficiency, insight, tone, nuance, milestone,
 *           scope, approve, allocate, resource, implement, escalate,
 *           bottleneck.
 *   Kalıp:  It is said that the forecast will change. ·
 *           Stakeholders are thought to be ready. ·
 *           The findings are reported to be clear. ·
 *           Having finished the draft, she left. ·
 *           Being absent all week, he missed the memo. ·
 *           Circulated on Friday, the outline reached everyone. ·
 *           Ana, who coordinates the team, joined in May. ·
 *           The objective, which is why we met, is clear. ·
 *           The colleague to whom we delegate is new. ·
 *           By June we will have passed the milestone. ·
 *           This time next week we will be reviewing the scope. ·
 *           The budget will have been approved by then.
 *
 * Ünitenin tek öğretme noktası KİŞİSİZ AKTARMANIN İKİ YOLU. „It is said
 * that …“ öznesine „it“ koyup raporu bir „that“ cümleciğine itiyor;
 * „Stakeholders are thought to be …“ ise özneyi cümlecikten çıkarıp
 * geriye mastar bırakıyor. İkisi de kaynağı gizliyor, ama ikincisi kısa
 * olduğu için bilgi notunun asıl biçimi o.
 */
export const enB2U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u01-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 1,
    title: "The Monday sales briefing",
    genre: "report",
    intro: "Bölge ekibinin pazartesi bilgilendirme notu. Hangi bilgi kesin, hangisi yalnız duyulmuş?",
    gloss: [
      { de: "a council", tr: "belediye meclisi" },
      { de: "a survey", tr: "anket" },
      { de: "in confidence", tr: "gizli tutulmak kaydıyla" },
      { de: "regional", tr: "bölgesel" },
      { de: "spring", tr: "ilkbahar" },
      { de: "finance", tr: "finans" },
      { de: "an owner", tr: "sahip" },
      { de: "own", tr: "kendi" },
      { de: "directly", tr: "doğrudan" },
    ],
    minutes: 9,
    text:
      "MONDAY BRIEFING: NORTH REGION, WEEK 14\n" +
      "Prepared by Deniz Kaya for the regional team. Please do not circulate this brief outside the company.\n" +
      "1. The forecast. It is said that the spring forecast will change again before the end of the month. Finance has not shared new numbers yet, but two of the four indicators we monitor fell last week, and our biggest customers are thought to be planning smaller orders for May.\n" +
      "2. Stakeholders. The city council and the owners of the shopping center are thought to be ready to sign the parking agreement. It is expected that the council will vote on Thursday. If the vote is delayed, the opening of the new store is likely to move by two weeks.\n" +
      "3. Findings from the customer survey. The findings are reported to be clear: customers like the new opening hours, but many are said to find our website hard to use. About 1,200 people answered, and the full report is expected on Wednesday.\n" +
      "4. The team. The remote team in Izmir is said to be working at full capacity. Two colleagues are absent this week, so please assess your own deadlines before you ask Izmir for help.\n" +
      "A note on sources: several items in this brief come from conversations that were shared with me in confidence, so not every source is named. If you need a source for a decision, ask me directly.\n" +
      "Next briefing: Monday, 9:00, room 3 or online.",
    questions: [
      {
        text: "What is said about the spring forecast?",
        options: ["It will change again.", "Finance has published it.", "It was too high last year."],
        answer: 0,
        explain: "„It is said that the spring forecast will change again before the end of the month.“",
      },
      {
        text: "When is the council expected to vote?",
        options: ["on Thursday", "on Monday", "on Wednesday"],
        answer: 0,
        explain: "„It is expected that the council will vote on Thursday.“",
      },
      {
        kind: "truefalse",
        text: "Customers are reported to like the new opening hours.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The findings are reported to be clear: customers like the new opening hours…“",
      },
      {
        kind: "gapfill",
        text: "The remote team in Izmir is said to be working at full ___.",
        options: [],
        answer: 0,
        accept: ["capacity"],
        explain: "„The remote team in Izmir is said to be working at full capacity.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The spring forecast is said to change again.",
          "The council is expected to vote on Thursday.",
          "Many customers find the website hard to use.",
          "Two colleagues are absent this week.",
        ],
        explain: "Not dört başlıkla ilerliyor: öngörü, paydaşlar, anket bulguları, ekip.",
      },
      {
        kind: "short_answer",
        text: "Why are some sources not named?",
        options: [],
        answer: 0,
        accept: ["shared in confidence", "in confidence", "they were shared in confidence"],
        explain: "„several items in this brief come from conversations that were shared with me in confidence, so not every source is named.“",
      },
    ],
  },
  {
    id: "en-b2-u01-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 1,
    title: "A welcome email for Ana",
    genre: "email",
    intro: "Yeni bir iş arkadaşını ekibe tanıtan e-posta. Ana kim, işi ne olacak?",
    gloss: [
      { de: "delighted", tr: "çok memnun" },
      { de: "northern", tr: "kuzeydeki" },
      { de: "operations", tr: "operasyon" },
      { de: "logistics", tr: "lojistik" },
      { de: "a fifth", tr: "beşte bir" },
      { de: "a conference", tr: "konferans" },
      { de: "a warehouse", tr: "depo" },
      { de: "finance", tr: "finans" },
    ],
    minutes: 9,
    text:
      "Subject: Please welcome Ana Ribeiro\n" +
      "Dear all,\n" +
      "I am delighted to introduce Ana Ribeiro, who joined our operations team in May and who will coordinate the northern projects from next week. Some of you have already met Ana, which is why this email is a little late.\n" +
      "Ana comes to us from a logistics company in Porto, where she managed a team of twelve. Her last project, which cut delivery times by a fifth, was presented at a conference in Lisbon last year.\n" +
      "From Monday, Ana will be the colleague to whom you delegate any request about the northern warehouses. Her first objective, which we agreed on together, is to find the bottleneck in our weekly planning. She will spend her first two weeks with each team in turn, so please make some time for her.\n" +
      "Tom Berger, who has done this job for three years, is moving to the finance team. Tom is the person Ana will learn most from, and he has kindly offered to stay on the project until the end of June, which gives everyone a calm handover.\n" +
      "Ana speaks Portuguese, Spanish and English, and she is learning German, which she says is the hardest thing she has ever done. If you would like to help, speak to her slowly, and not in English.\n" +
      "Our priorities for the summer, which I outlined in last week's memo, have not changed. Ana has read the memo and will have questions, which is exactly what we want.\n" +
      "Please join us for coffee in the kitchen on Tuesday at 10:00.\n" +
      "Best wishes,\n" +
      "Marta Silva, Head of Operations",
    questions: [
      {
        text: "Who will coordinate the northern projects?",
        options: ["Ana", "Tom", "Marta"],
        answer: 0,
        explain: "„I am delighted to introduce Ana Ribeiro, who joined our operations team in May and who will coordinate the northern projects from next week.“",
      },
      {
        text: "Why is the email a little late?",
        options: ["Some people have already met Ana.", "Ana started in June.", "Marta was absent."],
        answer: 0,
        explain: "„Some of you have already met Ana, which is why this email is a little late.“",
      },
      {
        kind: "truefalse",
        text: "Tom is leaving the company.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Tom Berger, who has done this job for three years, is moving to the finance team.“",
      },
      {
        kind: "gapfill",
        text: "Ana will be the colleague to ___ you delegate any request about the northern warehouses.",
        options: [],
        answer: 0,
        accept: ["whom"],
        explain: "„From Monday, Ana will be the colleague to whom you delegate any request about the northern warehouses.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Ana joined the operations team in May.",
          "Her last project cut delivery times.",
          "Tom is moving to the finance team.",
          "There is coffee in the kitchen on Tuesday.",
        ],
        explain: "Takdim, geçmiş deneyim, iş devri, en sonda davet.",
      },
      {
        kind: "short_answer",
        text: "Until when will Tom stay on the project?",
        options: [],
        answer: 0,
        accept: ["until the end of June", "the end of June", "end of June", "June"],
        explain: "„he has kindly offered to stay on the project until the end of June…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u01-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 1,
    title: "A handover before the late shift",
    genre: "dialogue",
    intro: "Vardiya değişiminde iş devri. Selin'in bugün neyi halletmesi gerekiyor?",
    gloss: [
      { de: "the shared drive", tr: "ortak klasör" },
      { de: "noon", tr: "öğle" },
      { de: "in a row", tr: "üst üste" },
      { de: "finance", tr: "finans" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Selin", text: "Before you go, can you give me the handover? I start the late shift in ten minutes." },
      { speaker: "Volkan", text: "Sure. Having finished the draft of the client report, Mira left at three. It is on the shared drive, but it still needs the numbers from Izmir." },
      { speaker: "Selin", text: "Did Izmir send them?" },
      { speaker: "Volkan", text: "Not yet. Being absent all week, Kerem missed the memo about the new deadline, so he thinks we need them next Friday." },
      { speaker: "Selin", text: "And when do we need them?" },
      { speaker: "Volkan", text: "Tomorrow at noon. I called him. Having heard the new date, he promised to send everything by ten." },
      { speaker: "Selin", text: "Good. What about the outline for the stakeholder meeting?" },
      { speaker: "Volkan", text: "Circulated on Friday, the outline reached everyone except the new people in finance. I sent it to them again this afternoon." },
      { speaker: "Selin", text: "Any replies?" },
      { speaker: "Volkan", text: "One. Reading it on the train, Ana noticed that the budget page is missing. That is the only open point." },
      { speaker: "Selin", text: "Who is fixing it?" },
      { speaker: "Volkan", text: "You, I am afraid. Not knowing the new numbers myself, I did not want to guess." },
      { speaker: "Selin", text: "Fair enough. I will write to finance first thing. Anything I should escalate?" },
      { speaker: "Volkan", text: "No, nothing. Having done three late shifts in a row, I am going straight home to sleep." },
    ],
    questions: [
      {
        text: "Why did Kerem miss the memo?",
        options: ["He was absent all week.", "He was on the train.", "He works in finance."],
        answer: 0,
        explain: "„Being absent all week, Kerem missed the memo about the new deadline…“",
      },
      {
        text: "When does the team need the numbers from Izmir?",
        options: ["tomorrow at noon", "next Friday", "this afternoon"],
        answer: 0,
        explain: "„Tomorrow at noon.“",
      },
      {
        kind: "truefalse",
        text: "The new people in finance did not get the outline on Friday.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Circulated on Friday, the outline reached everyone except the new people in finance.“",
      },
      {
        kind: "gapfill",
        text: "Reading it on the ___, Ana noticed that the budget page is missing.",
        options: [],
        answer: 0,
        accept: ["train"],
        explain: "„Reading it on the train, Ana noticed that the budget page is missing.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Having finished the draft of the client report, Mira left at three.",
          "Having finished the draft of the client report, Mira left at three",
        ],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "Who will write to finance?",
        options: [],
        answer: 0,
        accept: ["Selin", "Selin will", "she will"],
        explain: "„I will write to finance first thing.“",
      },
    ],
  },
  {
    id: "en-b2-u01-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 1,
    title: "A voice message about the schedule",
    genre: "monologue",
    intro: "Proje yöneticisinin müşteriye bıraktığı sesli mesaj. Haziranda ne bitmiş olacak?",
    gloss: [
      { de: "a signature", tr: "imza" },
      { de: "a developer", tr: "yazılımcı" },
      { de: "patience", tr: "sabır" },
      { de: "the short version", tr: "kısacası" },
      { de: "a round", tr: "tur" },
      { de: "a phase", tr: "aşama" },
      { de: "finance", tr: "finans" },
      { de: "the ninth", tr: "ayın dokuzu" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Emre", text: "Hi Laura, it is Emre from the project office. I promised you an update on the schedule before the end of the week, so here it is." },
      { speaker: "Emre", text: "Here is the short version. By June we will have passed the second milestone." },
      { speaker: "Emre", text: "The testing team will have finished the first round by the end of May, and your people will be able to try the new system in the first week of June." },
      { speaker: "Emre", text: "This time next week we will be reviewing the scope with your IT department. If they want changes, that is the moment to ask for them, not in July." },
      { speaker: "Emre", text: "The budget for the second phase will have been approved by then. Finance told me yesterday that they only need one more signature." },
      { speaker: "Emre", text: "There is one problem I do not want to hide. In the second week of June we will be moving two developers to another client, and that will create a bottleneck." },
      { speaker: "Emre", text: "I have not solved it yet. We will either allocate an extra resource or move the training by a week. I will know which on Monday." },
      { speaker: "Emre", text: "On the ninth we will be sitting in your office with the final plan. If anything changes before that, I will call you, so nobody has to escalate anything." },
      { speaker: "Emre", text: "Have a good weekend, and thanks again for your patience." },
    ],
    questions: [
      {
        text: "What will have happened by June?",
        options: ["The team will have passed the second milestone.", "The training will have finished.", "Two developers will have left the company."],
        answer: 0,
        explain: "„By June we will have passed the second milestone.“",
      },
      {
        text: "What will they be doing this time next week?",
        options: ["reviewing the scope", "testing the system", "moving developers"],
        answer: 0,
        explain: "„This time next week we will be reviewing the scope with your IT department.“",
      },
      {
        kind: "truefalse",
        text: "Emre has solved the problem with the developers.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have not solved it yet.“",
      },
      {
        kind: "gapfill",
        text: "The budget for the second phase will have been ___ by then.",
        options: [],
        answer: 0,
        accept: ["approved"],
        explain: "„The budget for the second phase will have been approved by then.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By June we will have passed the second milestone.", "By June we will have passed the second milestone"],
        explain: "Gelecekte bir tarihten geriye bakış: „will have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "When will Emre know how to solve the problem?",
        options: [],
        answer: 0,
        accept: ["on Monday", "Monday"],
        explain: "„I will know which on Monday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u01-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 1,
    title: "Notes for the Monday briefing",
    genre: "info",
    intro: "Pazartesi bilgilendirmesi için notlar: duyulan bilgiyi kaynağını söylemeden aktar.",
    gloss: [
      { de: "it is said that", tr: "söyleniyor ki" },
      { de: "are thought to be", tr: "olduğu düşünülüyor" },
      { de: "are reported to be", tr: "olduğu bildiriliyor" },
      { de: "rest with us", tr: "bizde olmak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Öngörünün değişeceği söyleniyor.",
        answer: "It is said that the forecast will change.",
        hint: "Birinci yol: „it“ özne, rapor „that“ cümleciğine giriyor.",
      },
      {
        kind: "build",
        tr: "Paydaşların hazır olduğu düşünülüyor.",
        answer: "Stakeholders are thought to be ready.",
        hint: "İkinci yol: özne öne çıkıyor, geriye mastar kalıyor.",
      },
      {
        kind: "build",
        tr: "Bulguların açık olduğu bildiriliyor.",
        answer: "The findings are reported to be clear.",
        hint: "Kaynak söylenmiyor; söyleyen fiil edilgen.",
      },
      {
        kind: "build",
        tr: "Sorumluluğun bizde olduğu düşünülüyor.",
        answer: "Liability is thought to rest with us.",
        hint: "Aynı kısa yol, bu kez kendi konumumuz için.",
      },
      {
        kind: "form",
        prompt: "Pazartesi bilgilendirmesi için not kartını doldur.",
        facts: "Bahar öngörüsünün yine değişeceği söyleniyor; paydaşların anlaşmayı imzalamaya hazır olduğu düşünülüyor; anket bulgularının açık olduğu bildiriliyor; kaynaklar gizli tutuluyor.",
        fields: [
          { label: "Forecast", answer: "is said to change", accept: ["said to change", "will change"] },
          { label: "Stakeholders", answer: "are thought to be ready", accept: ["thought to be ready", "ready"] },
          { label: "Survey findings", answer: "are reported to be clear", accept: ["reported to be clear", "clear"] },
          { label: "Sources", answer: "not named", accept: ["not given"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u01-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 1,
    title: "Notes on the team",
    genre: "info",
    intro: "Ekip hakkında kısa notlar: kim ne yaptı, kim yeni katıldı?",
    gloss: [
      { de: "having finished", tr: "bitirdikten sonra" },
      { de: "being absent", tr: "gelmediği için" },
      { de: "circulated", tr: "dolaştırılan" },
      { de: "to whom", tr: "kime" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Taslağı bitirdikten sonra ayrıldı.",
        answer: "Having finished the draft, she left.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Bütün hafta gelmediği için iç yazıyı kaçırdı.",
        answer: "Being absent all week, he missed the memo.",
        hint: "Aynı anda olan iş: yalın „-ing“.",
      },
      {
        kind: "build",
        tr: "Cuma günü dolaştırılan ana hat herkese ulaştı.",
        answer: "Circulated on Friday, the outline reached everyone.",
        hint: "Üçüncü hâlle başlıyor: edilgen ortaç.",
      },
      {
        kind: "build",
        tr: "Ekibi eşgüdümleyen Ana, mayısta aramıza katıldı.",
        answer: "Ana, who coordinates the team, joined in May.",
        hint: "Virgüller cümleciği fazladan yapıyor; ad seçim istemiyor.",
      },
      {
        kind: "build",
        tr: "Yetki devrettiğimiz meslektaş yeni.",
        answer: "The colleague to whom we delegate is new.",
        hint: "Resmî biçim: edat „whom“un önüne geçiyor.",
      },
    ],
  },
];
