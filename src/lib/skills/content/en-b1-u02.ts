import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 2 — "İlk hafta, teslim tarihleri, maaş, iş arkadaşları".
 *
 * Dört ders: The first week · Meetings and deadlines · Talking about salary ·
 * The people I work with.
 *
 *   Kelime: induction, colleague, department, equipment, arrange,
 *           introduce, schedule, badge, deadline, meeting, client, agenda,
 *           postpone, submit, urgent, remind, raise, negotiate, bonus,
 *           budget, offer, afford, reasonable, discuss, manager,
 *           supervisor, trainee, supportive, reliable, teamwork, trust,
 *           polite.
 *   Kalıp:  The equipment is given on the first day. ·
 *           My badge was arranged by the office. ·
 *           When is the induction arranged? ·
 *           I am seeing the client on Friday. ·
 *           I am going to submit it tonight. ·
 *           I will remind you about the agenda. ·
 *           If I get the bonus, I will stay. ·
 *           If they offered more, I would accept. ·
 *           Could we discuss the budget? ·
 *           My manager is the person who hired me. ·
 *           The report that I sent was late. · The report I sent was late.
 *
 * Ünitenin tek öğretme noktası EDİLGEN: „The equipment is given on the
 * first day.“ Failin kim olduğu önemsizse İngilizce onu hiç söylemiyor;
 * söylerse „by“ ile ekliyor. Kurum dili bu biçimle konuşuyor, o yüzden
 * ilk hafta metni baştan sona edilgen. Yanında bir de İngilizcenin tek
 * başına yapabildiği bir şey var: dolaylı nesneyi özne yapmak („I was
 * given a badge“). Almanca bunu yapamıyor, kişi ortada kalıyor.
 */
export const enB1U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u2-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 2,
    title: "Meetings and deadlines",
    genre: "email",
    intro: "Cuma öncesi üç bilgi. Hangisi değişti, hangisi acil değil?",
    gloss: [
      { de: "fault", tr: "kabahat" },
      { de: "template", tr: "şablon" },
      { de: "their side", tr: "onların tarafı" },
      { de: "itself", tr: "kendisi" },
      { de: "not a problem", tr: "sorun değil" },
    ],
    minutes: 7,
    text:
      "Subject: Friday — agenda and the deadline\n" +
      "Hi all,\n" +
      "Three things before Friday.\n" +
      "The agenda is attached. It was written by Sena and me on Tuesday, so if something is missing it is our fault, not yours. Add a line under point four if you need one.\n" +
      "The client meeting is moved. I am seeing the client on Friday at two, not on Thursday. That means the numbers are needed by Thursday evening and not Friday morning. I am sorry — the change came from their side.\n" +
      "The report itself is going to be submitted tonight. Mert is going to check the last table and then it goes. If you find a mistake after that, tell me and I will send a short note to the client. A note is not a problem. A wrong number that nobody mentions is.\n" +
      "One more thing, and it is not urgent. The old agenda template is still used by two teams. It was replaced in March. If you are one of those teams, nobody told you, and that is on us.\n" +
      "See you Friday,\n" +
      "Deniz",
    questions: [
      {
        text: "When is the client meeting?",
        options: ["on Friday at two", "on Thursday", "tonight"],
        answer: 0,
        explain: "„I am seeing the client on Friday at two, not on Thursday.“ — ayarlanmış gelecek.",
      },
      {
        text: "When are the numbers needed?",
        options: ["by Thursday evening", "by Friday morning", "by Tuesday"],
        answer: 0,
        explain: "„That means the numbers are needed by Thursday evening and not Friday morning.“",
      },
      {
        kind: "truefalse",
        text: "The old template is still used by two teams.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The old agenda template is still used by two teams. It was replaced in March.“",
      },
      {
        kind: "gapfill",
        text: "The agenda was written by Sena and Deniz on ___.",
        options: [],
        answer: 0,
        accept: ["Tuesday"],
        explain: "„It was written by Sena and me on Tuesday…“",
      },
      {
        kind: "order",
        text: "E-postanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The agenda is attached.",
          "The client meeting is moved to Friday.",
          "The report is going to be submitted tonight.",
          "The old template is still used by two teams.",
        ],
        explain: "Üç madde sırayla, en sonda acil olmayan not.",
      },
      {
        kind: "short_answer",
        text: "What is a problem for Deniz?",
        options: [],
        answer: 0,
        accept: ["a wrong number", "a number nobody mentions", "a hidden mistake"],
        explain: "„A note is not a problem. A wrong number that nobody mentions is.“",
      },
    ],
  },
  {
    id: "en-b1-u2-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 2,
    title: "Talking about salary",
    genre: "dialogue",
    intro: "Zam görüşmesi. Hangi koşul gerçek, hangisi değil?",
    gloss: [
      { de: "per cent", tr: "yüzde" },
      { de: "role", tr: "görev" },
      { de: "the middle", tr: "orta" },
      { de: "clear", tr: "açık" },
      { de: "fair", tr: "adil" },
      { de: "instead", tr: "onun yerine" },
      { de: "somewhere", tr: "bir yere" },
      { de: "neither of us", tr: "ikimiz de değil" },
    ],
    minutes: 7,
    text:
      "Ela: Do you have ten minutes? I would like to discuss the budget for my role.\n" +
      "Boss: Now is fine. Say what you want first.\n" +
      "Ela: A raise of eight per cent from January.\n" +
      "Boss: That is a clear number. Why eight?\n" +
      "Ela: Two reasons. The work changed in March — I took the second client and nobody was hired. And eight is the middle of what this role pays in this city.\n" +
      "Boss: The middle is a fair place to start. The problem is the budget: it was written in October and it is not opened again until April.\n" +
      "Ela: Then April, with January's date.\n" +
      "Boss: You have done this before.\n" +
      "Ela: I have read about it before. That is not the same.\n" +
      "Boss: If I get the department budget in April, I will do eight from January. If they say no, I can offer a bonus in July instead.\n" +
      "Ela: If they offered a bonus only, I would still want the raise written somewhere.\n" +
      "Boss: That is reasonable. I will put both in an email today, so neither of us remembers it differently in April.",
    questions: [
      {
        text: "What does Ela ask for?",
        options: ["eight per cent from January", "a bonus in July", "a new role"],
        answer: 0,
        explain: "„A raise of eight per cent from January.“",
      },
      {
        text: "Why is the budget a problem?",
        options: ["it is not opened again until April", "it was cut in October", "the boss wrote it"],
        answer: 0,
        explain: "„it was written in October and it is not opened again until April.“",
      },
      {
        kind: "truefalse",
        text: "Somebody was hired for the second client.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I took the second client and nobody was hired.“",
      },
      {
        kind: "gapfill",
        text: "The boss will put both in an ___ today.",
        options: [],
        answer: 0,
        accept: ["email"],
        explain: "„I will put both in an email today…“",
      },
      {
        kind: "short_answer",
        text: "What does Ela want if there is only a bonus?",
        options: [],
        answer: 0,
        accept: ["the raise written", "the raise in writing", "the raise somewhere"],
        explain: "„If they offered a bonus only, I would still want the raise written somewhere.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u2-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 2,
    title: "The people I work with",
    genre: "monologue",
    intro: "Bir ekip anlatılıyor. Hangi cümlede „that“ düşüyor?",
    gloss: [
      { de: "rare", tr: "ender" },
      { de: "blamed", tr: "suçlanan" },
      { de: "survives", tr: "atlatan" },
      { de: "handover", tr: "devir teslim" },
      { de: "a system", tr: "sistem" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Mert", text: "My manager is the person who hired me. That is rare after four years and I notice it." },
      { speaker: "Mert", text: "The supervisor in my department is the one who answers at eleven at night. I have asked her to stop and she has not." },
      { speaker: "Mert", text: "There is a trainee who started in June. The questions that she asks are the questions nobody asked for years." },
      { speaker: "Mert", text: "The report that I sent last Friday was late. She found the reason in ten minutes: the table I copied was old." },
      { speaker: "Mert", text: "The report I sent this Friday was on time. Same table, new date, one line in a document that everybody can see." },
      { speaker: "Mert", text: "Teamwork is a big word. In this room it means one thing: the person who finds a mistake is thanked, not blamed." },
      { speaker: "Mert", text: "We had a manager once who did it the other way. Three people left in one year and nobody wrote the reason in the handover." },
      { speaker: "Mert", text: "Reliable is not a person. It is a system that survives a bad week." },
    ],
    questions: [
      {
        text: "Who hired Mert?",
        options: ["the manager", "the supervisor", "the trainee"],
        answer: 0,
        explain: "„My manager is the person who hired me.“",
      },
      {
        text: "What happens to a person who finds a mistake?",
        options: ["they are thanked", "they are blamed", "they write the handover"],
        answer: 0,
        explain: "„the person who finds a mistake is thanked, not blamed.“",
      },
      {
        kind: "truefalse",
        text: "The second report was on time.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The report I sent this Friday was on time.“",
      },
      {
        kind: "gapfill",
        text: "The trainee started in ___.",
        options: [],
        answer: 0,
        accept: ["June"],
        explain: "„There is a trainee who started in June.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My manager is the person who hired me.", "My manager is the person who hired me"],
        explain: "Özne konumundaki „who“ düşemez.",
      },
      {
        kind: "short_answer",
        text: "How many people left under the old manager?",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Three people left in one year and nobody wrote the reason in the handover.“",
      },
    ],
  },
  {
    id: "en-b1-u2-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 2,
    title: "The first week",
    genre: "dialogue",
    intro: "İlk haftanın üç parçası. Hangisi kimin işi?",
    gloss: [
      { de: "fire door", tr: "yangın kapısı" },
      { de: "correct", tr: "doğru" },
      { de: "stands", tr: "takılıp kalıyor" },
      { de: "another building", tr: "başka bir bina" },
      { de: "stood", tr: "dikildi" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "How was your first week?" },
      { speaker: "Can", text: "Three parts: the induction, the equipment, and a badge that did not work." },
      { speaker: "Nil", text: "The badge always." },
      { speaker: "Can", text: "The induction was Monday morning. Two hours, eleven people, and the fire door explained twice." },
      { speaker: "Nil", text: "And the equipment?" },
      { speaker: "Can", text: "The equipment is given on the first day. That is the rule. On my first day the laptop was in a box in another building." },
      { speaker: "Nil", text: "Who arranged the badge?" },
      { speaker: "Can", text: "My badge was arranged by the office, but the name on it was Arslan. I am Aslan. Small thing, closed door." },
      { speaker: "Nil", text: "So you stood outside." },
      { speaker: "Can", text: "Until Wednesday. Then a colleague from my department saw me there and said: everybody stands here in the first week." },
      { speaker: "Nil", text: "That line is the induction." },
      { speaker: "Can", text: "By Friday the laptop came, the badge was correct, and I had answered the same question about my name nine times." },
      { speaker: "Nil", text: "When is the induction arranged? Before the badge, or after?" },
      { speaker: "Can", text: "Before. They should change the order." },
    ],
    questions: [
      {
        text: "Who arranged the badge?",
        options: ["the office", "the colleague", "the department"],
        answer: 0,
        explain: "„My badge was arranged by the office…“ — fail „by“ ile geliyor.",
      },
      {
        text: "What was wrong with the badge?",
        options: ["the name", "the photo", "the date"],
        answer: 0,
        explain: "„the name on it was Arslan. I am Aslan.“",
      },
      {
        kind: "truefalse",
        text: "The laptop was there on the first day.",
        options: ["True", "False"],
        answer: 1,
        explain: "„On my first day the laptop was in a box in another building.“",
      },
      {
        kind: "gapfill",
        text: "The induction was on ___ morning.",
        options: [],
        answer: 0,
        accept: ["Monday"],
        explain: "„The induction was Monday morning. Two hours, eleven people…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The equipment is given on the first day.", "The equipment is given on the first day"],
        explain: "Edilgen: işi kimin yaptığı söylenmiyor, çünkü önemsiz.",
      },
      {
        kind: "short_answer",
        text: "Until when was Can outside?",
        options: [],
        answer: 0,
        accept: ["until Wednesday", "Wednesday"],
        explain: "„Until Wednesday. Then a colleague from my department saw me there…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u2-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 2,
    title: "The equipment is given on the first day",
    genre: "info",
    intro: "Edilgen cümleler. Fail ne zaman söyleniyor, ne zaman düşüyor?",
    gloss: [
      { de: "is given", tr: "veriliyor" },
      { de: "was arranged", tr: "ayarlandı" },
      { de: "I was given", tr: "bana verildi" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Ekipman ilk gün veriliyor.",
        answer: "The equipment is given on the first day.",
        hint: "Edilgen: işi kimin yaptığı önemsiz, o yüzden fail hiç geçmiyor.",
      },
      {
        kind: "build",
        tr: "Giriş kartım ofis tarafından ayarlandı.",
        answer: "My badge was arranged by the office.",
        hint: "Fail söylenecekse „by“ ile geliyor; söylenmese de cümle tam olurdu.",
      },
      {
        kind: "build",
        tr: "Oryantasyon ne zaman ayarlanıyor?",
        answer: "When is the induction arranged?",
        hint: "Edilgen soruda „be“ özneden önce geçiyor.",
      },
      {
        kind: "build",
        tr: "Bana bir giriş kartı verildi.",
        answer: "I was given a badge.",
        hint: "İngilizce KİŞİYİ özne yapabiliyor; Almanca ve Türkçe bunu yapamaz, kişi ortada kalır.",
      },
      {
        kind: "form",
        prompt: "İlk hafta kartını doldur.",
        facts: "Oryantasyon pazartesi; ekipman ilk gün kuralı; giriş kartı ofis tarafından; addaki hata çarşambaya kadar.",
        fields: [
          { label: "Induction", answer: "Monday", accept: ["Monday morning"] },
          { label: "Equipment", answer: "on the first day", accept: ["the first day"] },
          { label: "Badge", answer: "by the office", accept: ["the office"] },
          { label: "Problem", answer: "the name", accept: ["the wrong name"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u2-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 2,
    title: "If I get the bonus, I will stay",
    genre: "personal",
    intro: "İki koşul cümlesi. Biri olabilir, öteki olmuyor.",
    gloss: [
      { de: "If I get", tr: "alırsam" },
      { de: "If they offered", tr: "teklif etselerdi" },
      { de: "discuss", tr: "görüşmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Primi alırsam kalacağım.",
        answer: "If I get the bonus, I will stay.",
        hint: "Gerçek koşul: „if“ yanında geniş zaman, öteki yanda „will“.",
      },
      {
        kind: "build",
        tr: "Daha fazla teklif etselerdi kabul ederdim.",
        answer: "If they offered more, I would accept.",
        hint: "Gerçek olmayan koşul: geçmiş biçim burada geçmişi değil, olmayan bir şimdiyi anlatıyor.",
      },
      {
        kind: "build",
        tr: "Bütçeyi görüşebilir miyiz?",
        answer: "Could we discuss the budget?",
        hint: "„discuss“ doğrudan nesne alıyor; „discuss about“ diye bir kuruluş yok.",
      },
      {
        kind: "build",
        tr: "Cuma günü müşteriyle görüşüyorum.",
        answer: "I am seeing the client on Friday.",
        hint: "Ayarlanmış gelecek, şimdiki zamanın sürerli biçimiyle anlatılıyor.",
      },
      {
        kind: "build",
        tr: "Onu bu gece teslim edeceğim.",
        answer: "I am going to submit it tonight.",
        hint: "Önceden kurulmuş plan: „going to“. „will“ olsaydı o anki karar olurdu.",
      },
    ],
  },
];
