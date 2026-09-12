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
    title: "The morning briefing",
    genre: "opinion",
    intro: "Kaynağı söylemeyen üç cümle. İki yoldan hangisi kısa?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "whole", tr: "bütün" },
      { de: "actually", tr: "aslında" },
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "least", tr: "en az" },
      { de: "none", tr: "hiçbiri" },
      { de: "passive", tr: "edilgen" },
      { de: "a route", tr: "yol" },
      { de: "a claim", tr: "iddia" },
      { de: "a clause", tr: "cümlecik" },
      { de: "the subject", tr: "özne" },
      { de: "an infinitive", tr: "mastar" },
      { de: "the source", tr: "kaynak" },
      { de: "convenience", tr: "kolaylık" },
      { de: "the deadline", tr: "son tarih" },
      { de: "honest", tr: "dürüst" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "defend", tr: "savunmak" },
      { de: "lifts", tr: "çıkarıyor" },
      { de: "willing", tr: "istekli" },
      { de: "hiding", tr: "saklanmak" },
    ],
    minutes: 9,
    text:
      "It is said that the forecast will change. Stakeholders are thought to be ready. The findings are reported to be clear. Three sentences from the same briefing, and all three carry the same quiet claim: somebody said this, and I am not telling you who.\n" +
      "There are two routes to that claim and they are not the same in style. The first puts „it“ in the subject and pushes the whole report into a „that“ clause: it is said that, it is claimed that, it is expected that. The second lifts the subject out of the clause and leaves an infinitive behind: stakeholders are thought to be ready.\n" +
      "The second one is shorter, and it is the one a brief actually uses, because the subject arrives first and the reader is already holding the thing the sentence is about.\n" +
      "Why use either? Because in a briefing the source is often the least useful part. Four teams assess the same indicator, the numbers agree, and naming one of those teams would be worse than naming none.\n" +
      "That is the honest use. The dishonest use is the same sentence with no four teams behind it, and it is very hard to see from the outside. „It is thought that the deadline can be moved“ can mean that six people have looked at a calendar, or that one person would like it to be true.\n" +
      "So the rule I work by is this. If I would be willing to name the source when asked, the passive is a convenience. If I would not, I am hiding behind the grammar, and somebody in the room usually knows.\n" +
      "We monitor the indicators remotely now, which makes the source easier to give and the habit harder to defend.",
    questions: [
      {
        text: "How many routes are there to the claim?",
        options: ["two", "three", "four"],
        answer: 0,
        explain: "„There are two routes to that claim and they are not the same in style.“",
      },
      {
        text: "Which route does a brief use?",
        options: ["the shorter one", "the „it“ one", "the longer one"],
        answer: 0,
        explain: "„The second one is shorter, and it is the one a brief actually uses…“",
      },
      {
        kind: "truefalse",
        text: "Naming one of the four teams would be worse than naming none.",
        options: ["True", "False"],
        answer: 0,
        explain: "„naming one of those teams would be worse than naming none.“",
      },
      {
        kind: "gapfill",
        text: "The findings are reported to be ___.",
        options: [],
        answer: 0,
        accept: ["clear"],
        explain: "„The findings are reported to be clear.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It is said that the forecast will change.",
          "Stakeholders are thought to be ready.",
          "The second one is shorter.",
          "If I would not name the source, I am hiding.",
        ],
        explain: "Uzun yol, kısa yol, seçimin gerekçesi, en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "When is the passive a convenience?",
        options: [],
        answer: 0,
        accept: ["when I could name it", "if I can name the source", "when nothing is hidden"],
        explain: "„If I would be willing to name the source when asked, the passive is a convenience.“",
      },
    ],
  },
  {
    id: "en-b2-u01-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 1,
    title: "Introducing a colleague",
    genre: "info",
    intro: "İki virgül bir cümlenin işini değiştiriyor. Nasıl?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "whole", tr: "bütün" },
      { de: "entirely", tr: "tümüyle" },
      { de: "speech", tr: "konuşma" },
      { de: "nowhere", tr: "hiçbir yerde" },
      { de: "none", tr: "hiçbiri" },
      { de: "a comma", tr: "virgül" },
      { de: "a mark", tr: "işaret" },
      { de: "extra", tr: "fazladan" },
      { de: "choosing", tr: "seçen" },
      { de: "a noun", tr: "isim" },
      { de: "a preposition", tr: "edat" },
      { de: "a document", tr: "belge" },
      { de: "distance", tr: "mesafe" },
      { de: "an introduction", tr: "takdim" },
      { de: "quietly", tr: "sessizce" },
      { de: "reaches back", tr: "geriye uzanıyor" },
      { de: "costs nothing", tr: "bedeli yok" },
    ],
    minutes: 9,
    text:
      "Ana, who coordinates the team, joined in May. Take the commas out and the sentence changes its job: „Ana who coordinates the team“ would mean there is another Ana somewhere who does not.\n" +
      "That is the whole difference and it is carried entirely by two marks. With commas, the clause is extra: you already know which Ana, and the clause is there because the information is useful. Without commas, the clause is choosing, and a name almost never needs choosing.\n" +
      "The objective, which is why we met, is clear. „Which“ here reaches back to the whole idea in front of it and not to a single noun, and that is something „that“ cannot do. „That“ never takes a comma and never takes a whole idea as the thing it points at.\n" +
      "The third shape is the formal one. The colleague to whom we delegate is new. In speech nobody says that; they say „the colleague we delegate to“ and put the preposition at the end, where English has always been happy to leave it.\n" +
      "So when do I write „to whom“? In a document that will be read by people who were not in the room, and nowhere else. It costs nothing there and it buys a little distance.\n" +
      "An introduction is a good place to watch all three at once, because it is the one moment when you are giving information about a person and choosing none of it. Every clause is extra. Every clause takes a comma. If one of them does not, the sentence is quietly telling the room that there are two people with that name, and the tone goes wrong before anyone notices.",
    questions: [
      {
        text: "What do the commas do?",
        options: ["make the clause extra", "make the clause choose", "make the clause formal"],
        answer: 0,
        explain: "„With commas, the clause is extra…“",
      },
      {
        text: "What can „which“ do that „that“ cannot?",
        options: ["point at a whole idea", "take a preposition", "open a sentence"],
        answer: 0,
        explain: "„„Which“ here reaches back to the whole idea in front of it… that is something „that“ cannot do.“",
      },
      {
        kind: "truefalse",
        text: "People say „to whom“ in speech.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In speech nobody says that; they say „the colleague we delegate to“…“",
      },
      {
        kind: "gapfill",
        text: "The colleague to ___ we delegate is new.",
        options: [],
        answer: 0,
        accept: ["whom"],
        explain: "„The colleague to whom we delegate is new.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Ana, who coordinates the team, joined in May.",
          "The objective, which is why we met, is clear.",
          "The colleague to whom we delegate is new.",
          "Every clause in an introduction is extra.",
        ],
        explain: "Kişi, bütün bir düşünce, resmî biçim, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "Where does the writer use „to whom“?",
        options: [],
        answer: 0,
        accept: ["in a document", "in writing only", "not in speech"],
        explain: "„In a document that will be read by people who were not in the room, and nowhere else.“",
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
    title: "The handover note",
    genre: "dialogue",
    intro: "Üç ortaç, üç ayrı iş. Hangisi edilgen?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "plain", tr: "yalın" },
      { de: "passive", tr: "edilgen" },
      { de: "sentence", tr: "cümle" },
      { de: "combination", tr: "bileşim" },
      { de: "a participle", tr: "ortaç" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "the order", tr: "sıra" },
      { de: "a gap", tr: "boşluk" },
      { de: "underneath", tr: "altında" },
      { de: "quote", tr: "aktarmak" },
      { de: "a conference", tr: "konferans" },
      { de: "misunderstand", tr: "yanlış anlamak" },
      { de: "spell out", tr: "açık açık yazmak" },
      { de: "the third form", tr: "üçüncü hâl" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Selin", text: "Having finished the draft, she left. That is the whole note, and it is doing two things at once." },
      { speaker: "Volkan", text: "Which two?" },
      { speaker: "Selin", text: "It gives the order and it gives the reason, and it does both without a conjunction. „Having finished“ means the finishing came first." },
      { speaker: "Volkan", text: "And if the two things happen together?" },
      { speaker: "Selin", text: "Then the „-ing“ goes plain. „Being absent all week, he missed the memo.“ No time gap there; the absence and the missing are the same week." },
      { speaker: "Volkan", text: "What about the third one on the note?" },
      { speaker: "Selin", text: "„Circulated on Friday, the outline reached everyone.“ That one starts with the third form, so it is passive: somebody circulated it and we are not saying who." },
      { speaker: "Volkan", text: "Three shapes then." },
      { speaker: "Selin", text: "Three shapes and one rule underneath: the subject of the participle has to be the subject of the main clause. Break that and you get the sentence everybody quotes at a conference." },
      { speaker: "Volkan", text: "Which is?" },
      { speaker: "Selin", text: "„Having finished the draft, the memo was circulated.“ The memo did not finish the draft. Nobody misunderstands it and everybody notices it, which is the worst combination in writing." },
      { speaker: "Volkan", text: "So why use them at all?" },
      { speaker: "Selin", text: "Capacity. A handover note is read in forty seconds by somebody starting a shift, and a participle carries an ordering that a second sentence would have to spell out." },
    ],
    questions: [
      {
        text: "What does „having finished“ show?",
        options: ["the finishing came first", "both happened together", "somebody else finished"],
        answer: 0,
        explain: "„„Having finished“ means the finishing came first.“",
      },
      {
        text: "Which shape is passive?",
        options: ["Circulated on Friday", "Having finished", "Being absent"],
        answer: 0,
        explain: "„That one starts with the third form, so it is passive…“",
      },
      {
        kind: "truefalse",
        text: "Everybody notices the broken sentence.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nobody misunderstands it and everybody notices it…“",
      },
      {
        kind: "gapfill",
        text: "A handover note is read in ___ seconds.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„A handover note is read in forty seconds by somebody starting a shift…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Having finished the draft, she left.", "Having finished the draft, she left"],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What must the participle share with the main clause?",
        options: [],
        answer: 0,
        accept: ["the subject", "its subject", "the same subject"],
        explain: "„the subject of the participle has to be the subject of the main clause.“",
      },
    ],
  },
  {
    id: "en-b2-u01-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 1,
    title: "By the end of the quarter",
    genre: "monologue",
    intro: "Gelecekten geriye bakmak. Hangi cümle bitmişi anlatıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "stand", tr: "durmak" },
      { de: "activity", tr: "etkinlik" },
      { de: "continuous", tr: "sürerli" },
      { de: "mixing", tr: "karıştırmak" },
      { de: "sounding", tr: "kulağa gelmek" },
      { de: "control", tr: "denetlemek" },
      { de: "a promise", tr: "söz" },
      { de: "turn round", tr: "arkanı dönmek" },
      { de: "in progress", tr: "sürmekte" },
      { de: "a timeline", tr: "zaman çizelgesi" },
      { de: "a diary", tr: "ajanda" },
      { de: "certain", tr: "kesin" },
      { de: "solved", tr: "çözülmüş" },
      { de: "checkable", tr: "denetlenebilir" },
      { de: "the ninth", tr: "ayın dokuzu" },
      { de: "the tenth", tr: "ayın onu" },
      { de: "tell apart", tr: "ayırt etmek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Emre", text: "By June we will have passed the milestone. That sentence is a promise about a point in time, not about a day of work." },
      { speaker: "Emre", text: "The future perfect looks back from a date that has not arrived yet. You stand in June, you turn round, and the milestone is behind you." },
      { speaker: "Emre", text: "This time next week we will be reviewing the scope. That one is different: it puts me inside the activity and not after it." },
      { speaker: "Emre", text: "The two are easy to tell apart if you ask what the sentence is looking at. Finished, or in progress." },
      { speaker: "Emre", text: "The budget will have been approved by then. Passive and future perfect together, and the order does not move: will, have, been, third form." },
      { speaker: "Emre", text: "I use the perfect one in a timeline and the continuous one in a diary, and mixing them is how a plan starts sounding more certain than it is." },
      { speaker: "Emre", text: "There is a bottleneck in the second week and I have not solved it. Saying „we will have allocated the resource by then“ would be a sentence about a date I do not control." },
      { speaker: "Emre", text: "So the note says something smaller. „We will be reviewing the scope with them on the ninth.“ It is true, it is checkable, and nobody has to escalate anything on the tenth." },
    ],
    questions: [
      {
        text: "What does the future perfect look at?",
        options: ["something finished", "something in progress", "something repeated"],
        answer: 0,
        explain: "„The two are easy to tell apart… Finished, or in progress.“",
      },
      {
        text: "Where does Emre use the continuous one?",
        options: ["in a diary", "in a timeline", "in a budget"],
        answer: 0,
        explain: "„I use the perfect one in a timeline and the continuous one in a diary…“",
      },
      {
        kind: "truefalse",
        text: "Emre has solved the bottleneck.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is a bottleneck in the second week and I have not solved it.“",
      },
      {
        kind: "gapfill",
        text: "The budget will have been ___ by then.",
        options: [],
        answer: 0,
        accept: ["approved"],
        explain: "„The budget will have been approved by then.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By June we will have passed the milestone.", "By June we will have passed the milestone"],
        explain: "Gelecekte bir tarihten geriye bakış: „will have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "Why does the note say something smaller?",
        options: [],
        answer: 0,
        accept: ["it is checkable", "it is in his hands", "it is true"],
        explain: "„It is true, it is checkable, and nobody has to escalate anything on the tenth.“",
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
    title: "Stakeholders are thought to be ready",
    genre: "info",
    intro: "Kişisiz aktarmanın iki yolu. Hangisi kısa olan?",
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
        prompt: "Bilgi notu kartını doldur.",
        facts: "Öngörü değişecek; paydaşlar hazır; bulgular açık; kaynak söylenmiyor.",
        fields: [
          { label: "Forecast", answer: "it is said that", accept: ["will change"] },
          { label: "Stakeholders", answer: "are thought to be", accept: ["ready"] },
          { label: "Findings", answer: "are reported to be", accept: ["clear"] },
          { label: "The source", answer: "not given", accept: ["hidden"] },
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
    title: "Having finished the draft, she left",
    genre: "info",
    intro: "Üç ortaç ve iki ilgi cümlesi. Hangi özne kime ait?",
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
        tr: "Ekibi eşgüdümleyen Ana mayısta katıldı.",
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
