import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 2 — "Tutanak, neyin yanlış gittiği, ya bilseydik,
 * noktayı geçirmek".
 *
 * Dört ders: Writing the minutes · What went wrong · If we had known ·
 * Making the point land.
 *
 *   Kelime: assign, minutes, objection, conclude, consensus, consequence,
 *           compromise, wording, fault, cause, breakdown, alert, root,
 *           trigger, observation, assumption, scenario, loss, expense,
 *           expectation, intention, overrun, due, margin, highlight,
 *           circular, essential, critical, mainly, largely, forward,
 *           adjust.
 *   Kalıp:  The assignment of the task took ten minutes. ·
 *           The objection was noted without discussion. ·
 *           We conclude with the consensus of the group. ·
 *           The fault must have been there for weeks. ·
 *           We can't have caused the breakdown. ·
 *           Someone should have raised the alert. ·
 *           If we had known, we would have changed the scenario. ·
 *           If we had planned better, the loss would be smaller now. ·
 *           If the expense had been clear, we would have waited. ·
 *           What I want to highlight is the cost. ·
 *           It was the circular that changed everything. ·
 *           What is essential is the timing.
 *
 * Ünitenin tek öğretme noktası KARIŞIK KOŞUL: koşul geçmişte, sonuç
 * ŞİMDİDE. „If we had known, we would have changed …“ kapalı bir kutu;
 * „If we had planned better, the loss would be smaller now“ ise ikinci
 * yarısını öne çekiyor, çünkü kayıp hâlâ bugünün sayfasında duruyor.
 * Sınama hangi yarının geçmişte olduğu değil, SONUCUN NEREDE YAŞADIĞI.
 */
export const enB2U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u02-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 2,
    title: "Lessons from the call center move",
    genre: "report",
    intro: "Ofis taşınmasının ardından yazılmış proje değerlendirmesi. Hangi hatalar bugün hâlâ para kaybettiriyor?",
    gloss: [
      { de: "a landlord", tr: "ev sahibi" },
      { de: "overtime", tr: "fazla mesai" },
      { de: "a project lead", tr: "proje sorumlusu" },
      { de: "management", tr: "yönetim" },
      { de: "unhappy", tr: "memnuniyetsiz" },
      { de: "shared", tr: "ortak" },
      { de: "responsible", tr: "sorumlu" },
      { de: "relive", tr: "yeniden yaşamak" },
    ],
    minutes: 9,
    text:
      "PROJECT REVIEW: MOVING THE CALL CENTER TO THE NEW BUILDING\n" +
      "Written by Leyla Aksoy, project lead, for the management team.\n" +
      "The move is finished, three weeks late and 18 percent over budget. This review is not about blame. It is about what we would do differently, and about the costs we are still paying today.\n" +
      "1. Planning. If we had known about the building work next door, we would have changed the moving date. Nobody asked the landlord, and the noise stopped us from working for four days. If we had planned better, the loss would be smaller now: we are still paying overtime to catch up with the calls we missed.\n" +
      "2. The budget. If the expense had been clear from the start, we would have waited until the summer, when moving companies are cheaper. Instead, the overrun is now part of this year's budget, and the margin we expected for the second half of the year is gone.\n" +
      "3. People. If we had asked the team earlier, they would feel more at home in the new office now. Many of them still do not know where their things are, and some are unhappy with the big shared room.\n" +
      "4. Technology. The phone system worked on day one, and that was not luck. If the IT team had not tested it twice, we would have lost the first week completely.\n" +
      "What we recommend: next time, one person should be responsible for the whole scenario, from the landlord to the last desk. And every assumption should be written down before we sign anything.\n" +
      "Our intention is not to relive the move. It is to make sure the next one costs less.",
    questions: [
      {
        text: "Why could the team not work for four days?",
        options: ["There was building work next door.", "The phones did not work.", "The landlord closed the building."],
        answer: 0,
        explain: "„If we had known about the building work next door, we would have changed the moving date.“",
      },
      {
        text: "Why is the company still paying overtime?",
        options: ["to catch up with the calls they missed", "to finish the move", "to test the phone system"],
        answer: 0,
        explain: "„we are still paying overtime to catch up with the calls we missed.“",
      },
      {
        kind: "truefalse",
        text: "The phone system worked on the first day.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The phone system worked on day one, and that was not luck.“",
      },
      {
        kind: "gapfill",
        text: "If we had planned better, the loss would be smaller ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If we had planned better, the loss would be smaller now…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The noise stopped the team for four days.",
          "The margin for the second half of the year is gone.",
          "Some people are unhappy with the big shared room.",
          "The IT team tested the phone system twice.",
        ],
        explain: "Rapor dört başlıkla ilerliyor: planlama, bütçe, çalışanlar, teknoloji.",
      },
      {
        kind: "short_answer",
        text: "What should be written down before anything is signed?",
        options: [],
        answer: 0,
        accept: ["every assumption", "the assumptions", "assumptions"],
        explain: "„every assumption should be written down before we sign anything.“",
      },
    ],
  },
  {
    id: "en-b2-u02-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 2,
    title: "Minutes of the budget meeting",
    genre: "report",
    intro: "Aylık bütçe toplantısının tutanağı. Hangi kararlar alındı, hangisi ertelendi?",
    gloss: [
      { de: "postponed", tr: "ertelendi" },
      { de: "a cancellation fee", tr: "iptal ücreti" },
      { de: "an action", tr: "yapılacak iş" },
      { de: "a proposal", tr: "öneri" },
      { de: "reach", tr: "varmak" },
      { de: "own", tr: "kendi" },
      { de: "unclear", tr: "belirsiz" },
      { de: "economy", tr: "ekonomi" },
      { de: "object", tr: "itiraz etmek" },
    ],
    minutes: 9,
    text:
      "MINUTES: MONTHLY BUDGET MEETING, 14 MARCH\n" +
      "Present: Selin Demir (chair), Kaan Ersoy, Zehra Kaya, Tom Berger. Absent: Merve Tan.\n" +
      "1. Review of last month. The assignment of the tasks from February took ten minutes. All actions were completed except the update of the supplier list, which is now due on 21 March.\n" +
      "2. Travel costs. Kaan presented the figures for the first quarter. Travel expenses were 12 percent above plan, mainly because of two trips to the Izmir office. An objection by Zehra to the new booking rules was noted. After a short discussion, the group agreed to keep the rules until June and to review them then.\n" +
      "3. Printer contract. The proposal to change the printer supplier did not reach a consensus. Tom raised the question of the cancellation fee, and nobody could answer it. Decision postponed.\n" +
      "4. The office party. A compromise was reached on the party budget: 800 euros instead of 1,200, and the team pays for its own drinks. Selin and Zehra will adjust the plan together.\n" +
      "5. Other business. Kaan pointed out that the wording of the new travel policy is unclear. The policy says „economy class where possible“, and several people have read that differently. Tom will suggest new wording.\n" +
      "The meeting concluded at 11:40 with the consensus of the group on items 1, 2 and 4.\n" +
      "Next meeting: 11 April, 10:00, room 2.\n" +
      "Actions: Tom (cancellation fee, wording of the travel policy), Selin and Zehra (party plan), Kaan (supplier list).",
    questions: [
      {
        text: "Why were travel expenses above plan?",
        options: ["mainly because of two trips to Izmir", "because of the new booking rules", "because of the office party"],
        answer: 0,
        explain: "„Travel expenses were 12 percent above plan, mainly because of two trips to the Izmir office.“",
      },
      {
        text: "What happened to the printer proposal?",
        options: ["The decision was postponed.", "It was accepted.", "Zehra objected to it."],
        answer: 0,
        explain: "„The proposal to change the printer supplier did not reach a consensus.“",
      },
      {
        kind: "truefalse",
        text: "The group decided to change the booking rules at once.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the group agreed to keep the rules until June and to review them then.“",
      },
      {
        kind: "gapfill",
        text: "The meeting concluded at 11:40 with the ___ of the group on items 1, 2 and 4.",
        options: [],
        answer: 0,
        accept: ["consensus"],
        explain: "„The meeting concluded at 11:40 with the consensus of the group on items 1, 2 and 4.“",
      },
      {
        kind: "order",
        text: "Tutanağın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The supplier list is now due on 21 March.",
          "Zehra objected to the new booking rules.",
          "Nobody could answer the question about the fee.",
          "The party budget is now 800 euros.",
        ],
        explain: "Tutanak gündemin sırasını izliyor: geçen ay, yolculuk, yazıcı, parti.",
      },
      {
        kind: "short_answer",
        text: "Who will suggest new wording for the travel policy?",
        options: [],
        answer: 0,
        accept: ["Tom", "Tom Berger", "Tom will"],
        explain: "„Tom will suggest new wording.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u02-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 2,
    title: "The booking system breakdown",
    genre: "dialogue",
    intro: "Rezervasyon sisteminin çöktüğü günün ertesi. Arıza nereden çıktı?",
    gloss: [
      { de: "a log", tr: "günlük kaydı" },
      { de: "a disk", tr: "disk" },
      { de: "an error", tr: "hata" },
      { de: "install", tr: "kurmak" },
      { de: "automatically", tr: "otomatik olarak" },
      { de: "simply", tr: "düpedüz" },
      { de: "reach", tr: "ulaşmak" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Merve", text: "So what happened on Tuesday? The whole booking system was down for three hours." },
      { speaker: "Tuna", text: "We are still checking, but the fault must have been there for weeks. Three separate logs show the same error, and the first one is from early May." },
      { speaker: "Merve", text: "Weeks? Then why did nobody notice?" },
      { speaker: "Tuna", text: "The alert must have gone to the old email address. We changed the team address in April, and the monitoring tool still sends everything to the old one." },
      { speaker: "Merve", text: "Could the update we installed on Monday have caused it?" },
      { speaker: "Tuna", text: "No. We can't have caused the breakdown. Our update was only for the reports, and it did not touch the booking system at all." },
      { speaker: "Merve", text: "That is a relief. But somebody must have seen something." },
      { speaker: "Tuna", text: "The support team did. Two customers called on Monday afternoon about slow pages. Someone should have raised the alert then, but it was the end of the day." },
      { speaker: "Merve", text: "So what was the root cause?" },
      { speaker: "Tuna", text: "An assumption nobody wrote down. Everyone thought the disk was checked automatically. It was not, and on Tuesday it was simply full." },
      { speaker: "Merve", text: "And the trigger?" },
      { speaker: "Tuna", text: "A big report that ran at nine. It needed space the disk did not have." },
      { speaker: "Merve", text: "Right. Write it up for the minutes, and let us make sure the alerts reach a real person next time." },
    ],
    questions: [
      {
        text: "How long was the booking system down?",
        options: ["three hours", "three weeks", "one day"],
        answer: 0,
        explain: "„The whole booking system was down for three hours.“",
      },
      {
        text: "Why did nobody see the alert?",
        options: ["It went to an old email address.", "The support team deleted it.", "The logs were full."],
        answer: 0,
        explain: "„The alert must have gone to the old email address.“",
      },
      {
        kind: "truefalse",
        text: "Two customers had called about slow pages on Monday.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Two customers called on Monday afternoon about slow pages.“",
      },
      {
        kind: "gapfill",
        text: "Someone ___ have raised the alert then.",
        options: [],
        answer: 0,
        accept: ["should"],
        explain: "„Someone should have raised the alert then, but it was the end of the day.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["We can't have caused the breakdown.", "We can't have caused the breakdown"],
        explain: "Olumsuz çıkarım „can't have“ ile kuruluyor.",
      },
      {
        kind: "short_answer",
        text: "What was the root cause?",
        options: [],
        answer: 0,
        accept: ["an assumption", "an assumption nobody wrote down", "the assumption"],
        explain: "„An assumption nobody wrote down.“",
      },
    ],
  },
  {
    id: "en-b2-u02-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 2,
    title: "A talk on shipping costs",
    genre: "monologue",
    intro: "Bir yöneticinin personel toplantısındaki kısa konuşması. Nakliye maliyetini ne değiştirdi?",
    gloss: [
      { de: "shipping", tr: "nakliye" },
      { de: "a carrier", tr: "kargo firması" },
      { de: "a parcel", tr: "koli" },
      { de: "the small print", tr: "ince ayrıntılar" },
      { de: "packaging", tr: "ambalaj" },
      { de: "design", tr: "tasarım" },
      { de: "lead", tr: "yönetmek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Yasemin", text: "Good morning, everyone. I only have ten minutes, so I will start with the main point. What I want to highlight today is the cost of shipping." },
      { speaker: "Yasemin", text: "Our sales are fine. They are largely where we expected them to be. What worries me is the money we spend getting products to customers." },
      { speaker: "Yasemin", text: "Shipping costs rose by a quarter this year. Many of you think it was the fuel price. It was the circular from our main carrier that changed everything." },
      { speaker: "Yasemin", text: "That circular arrived in March. It introduced a new charge for every parcel over two kilos, and most of our parcels weigh two and a half." },
      { speaker: "Yasemin", text: "What nobody noticed at the time was the small print. The charge applies to every return as well, so we pay it twice." },
      { speaker: "Yasemin", text: "What is essential now is the timing. The contract with the carrier ends in August, and we have to adjust our packaging before then." },
      { speaker: "Yasemin", text: "It is the design team who will lead this. They think a smaller box could bring most parcels under two kilos." },
      { speaker: "Yasemin", text: "What I need from each of you is one idea by Friday. Small ideas are welcome. Thank you." },
    ],
    questions: [
      {
        text: "What does Yasemin want to highlight?",
        options: ["the cost of shipping", "the sales figures", "the new boxes"],
        answer: 0,
        explain: "„What I want to highlight today is the cost of shipping.“",
      },
      {
        text: "What changed everything, according to Yasemin?",
        options: ["the circular from the carrier", "the fuel price", "the new sales team"],
        answer: 0,
        explain: "„It was the circular from our main carrier that changed everything.“",
      },
      {
        kind: "truefalse",
        text: "The new charge applies only to parcels sent to customers.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The charge applies to every return as well, so we pay it twice.“",
      },
      {
        kind: "gapfill",
        text: "What is essential now is the ___.",
        options: [],
        answer: 0,
        accept: ["timing"],
        explain: "„What is essential now is the timing.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "It was the circular from our main carrier that changed everything.",
          "It was the circular from our main carrier that changed everything",
        ],
        explain: "Vurgu „It was … that …“ ile tek bir şeye, genelgeye düşüyor.",
      },
      {
        kind: "short_answer",
        text: "What does Yasemin need from everyone by Friday?",
        options: [],
        answer: 0,
        accept: ["one idea", "an idea", "ideas"],
        explain: "„What I need from each of you is one idea by Friday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u02-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 2,
    title: "Looking back at the project",
    genre: "opinion",
    intro: "Taşınma projesine geriye dönüp bakan bir değerlendirme yaz: ne farklı yapılırdı, bugün ne hâlâ sürüyor?",
    gloss: [
      { de: "would have changed", tr: "değiştirirdik" },
      { de: "would be smaller", tr: "daha küçük olurdu" },
      { de: "would have waited", tr: "beklerdik" },
      { de: "the assignment", tr: "görevlendirme" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bilseydik senaryoyu değiştirirdik.",
        answer: "If we had known, we would have changed the scenario.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Daha iyi planlasaydık kayıp şimdi daha küçük olurdu.",
        answer: "If we had planned better, the loss would be smaller now.",
        hint: "Karışık koşul: sonuç hâlâ sürüyor, ikinci yarı bugüne geliyor.",
      },
      {
        kind: "build",
        tr: "Masraf açık olsaydı beklerdik.",
        answer: "If the expense had been clear, we would have waited.",
        hint: "Yine kapalı: bekleme kararı o haftaya aitti.",
      },
      {
        kind: "build",
        tr: "Görevin dağıtımı on dakika sürdü.",
        answer: "The assignment of the task took ten minutes.",
        hint: "Fiil isme dönüyor; tutanak dili böyle kuruluyor.",
      },
      {
        kind: "form",
        prompt: "Proje değerlendirmesi için özet kartını doldur.",
        facts: "Taşınma üç hafta gecikti ve bütçeyi yüzde 18 aştı; yan binadaki inşaatı bilselerdi taşınma tarihini değiştirirlerdi; daha iyi planlasalardı kayıp şimdi daha küçük olurdu; telefon sistemi ilk gün çalıştı.",
        fields: [
          { label: "Delay", answer: "three weeks", accept: ["3 weeks"] },
          { label: "Over budget", answer: "18 percent", accept: ["18%", "eighteen percent"] },
          { label: "About the building work", answer: "we would have changed the date", accept: ["would have changed the date", "we would have changed the moving date"] },
          { label: "With better planning", answer: "the loss would be smaller now", accept: ["the loss would be smaller", "a smaller loss now"] },
          { label: "Phone system", answer: "worked on day one", accept: ["it worked", "worked on the first day"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u02-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 2,
    title: "After the breakdown",
    genre: "info",
    intro: "Sistem arızasından sonra ekibe kısa bir not yaz: ne olmuş olmalı, kim ne yapmalıydı?",
    gloss: [
      { de: "must have been", tr: "olmalı" },
      { de: "can't have", tr: "olamaz" },
      { de: "should have raised", tr: "vermesi gerekirdi" },
      { de: "what I want to highlight", tr: "öne çıkarmak istediğim" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kusur haftalardır orada olmalı.",
        answer: "The fault must have been there for weeks.",
        hint: "Çıkarım: kanıt okunuyor, emir verilmiyor.",
      },
      {
        kind: "build",
        tr: "Çöküşe biz neden olmuş olamayız.",
        answer: "We can't have caused the breakdown.",
        hint: "Olumsuzu „can't have“; „mustn't have“ diye bir şey yok.",
      },
      {
        kind: "build",
        tr: "Birinin uyarı vermesi gerekirdi.",
        answer: "Someone should have raised the alert.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Öne çıkarmak istediğim şey maliyet.",
        answer: "What I want to highlight is the cost.",
        hint: "Yarık cümle: önce boşluk açılıyor, sonra şey geliyor.",
      },
      {
        kind: "build",
        tr: "Her şeyi değiştiren genelgeydi.",
        answer: "It was the circular that changed everything.",
        hint: "İkinci yarık biçim: ışık isme düşüyor.",
      },
    ],
  },
];
