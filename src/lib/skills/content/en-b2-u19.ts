import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 19 — "Kariyeri ne belirliyor, işe alma zinciri,
 * sözleşmedeki kişi, hiç bu kadar zor bulunmadı".
 *
 * Dört ders: What decides a career · The hiring chain ·
 * The person in the contract · Never so hard to find.
 *
 *   Kelime: strategy, networking, supervise, recruit, onboard,
 *           permanent position, fixed term, notice period, hourly wage,
 *           flextime, skilled worker, human resources, overqualified,
 *           self-employment, assertive, conscientious, dedicated,
 *           resilient.
 *   Kalıp:  What decides a career is strategy. ·
 *           It was the leadership style that drove her out. ·
 *           What we aim for is not a dead end. ·
 *           Having read the personnel file, they decided. ·
 *           Asked to supervise, she agreed. ·
 *           Wanting to recruit fast, they cut the selection process. ·
 *           The offer, which is a permanent position, arrived today. ·
 *           The other job, which has a fixed term, pays more. ·
 *           My colleague, whose notice period is short, leaves in May. ·
 *           Never has a skilled worker been so hard to find. ·
 *           Rarely does human resources answer so fast. ·
 *           Only after the test do they call the overqualified.
 *
 * Ünitenin tek öğretme noktası EDİLGEN ORTAÇTA „HAVING BEEN“ DÜŞÜYOR.
 * „Asked to supervise, she agreed“ cümlesi „Having been asked to
 * supervise“ın kısası ve kısa biçim NORMAL olan; uzun biçim dilbilgisel
 * ama ağır. Üstelik „ask“ın aldığı mastar yerinde kalıyor: iki sözcük
 * bütün bir cümleyi taşıyor.
 */
export const enB2U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u19-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 19,
    title: "Hiring a new team lead",
    genre: "blog",
    intro: "İnsan kaynaklarından bir blog yazısı: yeni ekip lideri altı haftada nasıl bulundu?",
    gloss: [
      { de: "a team lead", tr: "ekip lideri" },
      { de: "a round", tr: "tur" },
      { de: "an advertisement", tr: "ilan" },
      { de: "real", tr: "gerçek" },
      { de: "internal", tr: "şirket içi" },
      { de: "a panel", tr: "seçici kurul" },
      { de: "senior", tr: "kıdemli" },
      { de: "external", tr: "dışarıdan" },
      { de: "a deputy", tr: "yardımcı" },
      { de: "a candidate", tr: "aday" },
      { de: "on the spot", tr: "hemen orada" },
    ],
    minutes: 9,
    text:
      "HOW WE HIRED OUR NEW TEAM LEAD\n" +
      "Posted by Martha Adams, human resources\n" +
      "Last spring our customer service team lost its team lead, and we had six weeks to find a new one. This is how it went.\n" +
      "Wanting to recruit fast, we cut the selection process from four rounds to two. It was a risk, and we knew it.\n" +
      "The advertisement went online on a Monday. Having received more than ninety applications in the first week, we invited twelve people to a short video interview. Most of them were strong; two were clearly overqualified and, asked about the salary, admitted that they were looking for something else.\n" +
      "Five candidates came to the second round: half a day in the office. Given a real customer complaint, each of them had forty minutes to write a reply and explain it to the team.\n" +
      "Having read the personnel file of our strongest internal candidate, Henry, the panel almost decided on the spot. But one of our senior colleagues, asked to lead the final discussion, suggested that we should also hear what the team thought.\n" +
      "We did, and it changed our minds. The team preferred Fiona, an external candidate who had listened to them more than she had talked. Asked to supervise the team, she agreed on the same afternoon.\n" +
      "Looking back, cutting two rounds was the right decision. Having the team in the room was even more important. Fiona starts her onboarding in May, and Henry, who is staying with us, will be her deputy.",
    questions: [
      {
        text: "Why did they cut the selection process?",
        options: ["They wanted to recruit fast.", "There were too few candidates.", "The team asked them to."],
        answer: 0,
        explain: "„Wanting to recruit fast, we cut the selection process from four rounds to two.“",
      },
      {
        text: "How many applications arrived in the first week?",
        options: ["more than ninety", "twelve", "five"],
        answer: 0,
        explain: "„Having received more than ninety applications in the first week, we invited twelve people to a short video interview.“",
      },
      {
        kind: "truefalse",
        text: "The team preferred an external candidate.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The team preferred Fiona, an external candidate who had listened to them more than she had talked.“",
      },
      {
        kind: "gapfill",
        text: "___ to supervise the team, she agreed on the same afternoon.",
        options: [],
        answer: 0,
        accept: ["Asked", "asked"],
        explain: "„Asked to supervise the team, she agreed on the same afternoon.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The advertisement went online.",
          "Twelve people had a video interview.",
          "Five candidates came to the office.",
          "The team preferred Fiona.",
        ],
        explain: "İlan, görüntülü görüşme, ofisteki ikinci tur, en sonda ekibin tercihi.",
      },
      {
        kind: "short_answer",
        text: "What will Henry be?",
        options: [],
        answer: 0,
        accept: ["her deputy", "the deputy", "deputy"],
        explain: "„Henry, who is staying with us, will be her deputy.“",
      },
    ],
  },
  {
    id: "en-b2-u19-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 19,
    title: "An ad for skilled workers",
    genre: "ad",
    intro: "Bir enerji şirketinin elektrikçi ilanı. Şirket ne sunuyor, ne bekliyor?",
    gloss: [
      { de: "install", tr: "kurmak" },
      { de: "solar", tr: "güneş enerjisi" },
      { de: "a panel", tr: "panel" },
      { de: "a factory", tr: "fabrika" },
      { de: "a region", tr: "bölge" },
      { de: "an electrician", tr: "elektrikçi" },
      { de: "an apprenticeship", tr: "çıraklık eğitimi" },
      { de: "an employee", tr: "çalışan" },
      { de: "practical", tr: "uygulamalı" },
      { de: "contact", tr: "iletişime geçmek" },
      { de: "an apprentice", tr: "çırak" },
      { de: "overtime", tr: "fazla mesai" },
      { de: "a cover letter", tr: "ön yazı" },
    ],
    minutes: 9,
    text:
      "ELECTRICIANS WANTED: KAYA ENERGY SYSTEMS, BURSA\n" +
      "Never has a skilled worker been so hard to find, and never have we needed good people more. Archie Energy Systems installs solar panels on homes, schools and factories across the region, and our order book is full until next summer.\n" +
      "We are looking for four electricians for permanent positions.\n" +
      "What we offer:\n" +
      "- a permanent position after a three-month trial period\n" +
      "- an hourly wage well above the industry average, plus paid overtime\n" +
      "- flextime: start between 6:30 and 9:00\n" +
      "- training in new solar technology, paid by us\n" +
      "- a company van for every team of two\n" +
      "What we expect:\n" +
      "- a completed apprenticeship as an electrician\n" +
      "- at least two years of experience\n" +
      "- a driver's license\n" +
      "Not only do we pay well, but we also train our people. Rarely does anyone leave us in the first year; nine of our last ten new employees are still here.\n" +
      "How to apply: fill in the short form on our website. No cover letter is needed. Rarely does human resources answer so fast: you will hear from us within three working days. Only after the practical test do we discuss the contract, so there are no surprises for either side.\n" +
      "Self-employed electricians who would like regular work are also welcome to contact us.",
    questions: [
      {
        text: "How many electricians are they looking for?",
        options: ["four", "two", "ten"],
        answer: 0,
        explain: "„We are looking for four electricians for permanent positions.“",
      },
      {
        text: "What does the company do?",
        options: ["It installs solar panels.", "It trains apprentices only.", "It sells vans."],
        answer: 0,
        explain: "„Archie Energy Systems installs solar panels on homes, schools and factories across the region…“",
      },
      {
        kind: "truefalse",
        text: "Applicants must send a cover letter.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No cover letter is needed.“",
      },
      {
        kind: "gapfill",
        text: "Rarely does anyone ___ us in the first year.",
        options: [],
        answer: 0,
        accept: ["leave"],
        explain: "„Rarely does anyone leave us in the first year…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Never has a skilled worker been so hard to find.",
          "The company offers flextime.",
          "Applicants need two years of experience.",
          "Self-employed electricians can also get in touch.",
        ],
        explain: "Çağrı, sunulanlar, beklenenler, en sonda serbest çalışanlara not.",
      },
      {
        kind: "short_answer",
        text: "When will applicants hear from the company?",
        options: [],
        answer: 0,
        accept: ["within three working days", "within three days", "in three days"],
        explain: "„you will hear from us within three working days.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u19-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 19,
    title: "A permanent offer",
    genre: "dialogue",
    intro: "Tina'nın elinde iki iş teklifi var. Hangisini seçmeli?",
    gloss: [
      { de: "logistics", tr: "lojistik" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Tina", text: "I need your advice. I have two offers, and I have to answer both by Friday." },
      { speaker: "Rory", text: "Lucky you. Tell me about them." },
      { speaker: "Tina", text: "The first offer, which is a permanent position, arrived today. It is with the logistics company in Gebze, which I visited last week." },
      { speaker: "Rory", text: "And the second?" },
      { speaker: "Tina", text: "The other job, which has a fixed term, pays more. Two years at the bank, whose office is ten minutes from my apartment." },
      { speaker: "Rory", text: "How much more?" },
      { speaker: "Tina", text: "About fifteen percent. But the contract ends after two years, which worries me." },
      { speaker: "Rory", text: "What does your colleague think? The one who is leaving?" },
      { speaker: "Tina", text: "Ellie? My colleague, whose notice period is short, leaves in May. She says the fixed term does not matter if you are good." },
      { speaker: "Rory", text: "Easy for her to say. She has a job to go to." },
      { speaker: "Tina", text: "Exactly. The logistics company, which is growing fast, also offers flextime and a training budget." },
      { speaker: "Rory", text: "Then take the permanent one. The money, which is nice, will not help much if you are looking for work again in two years." },
      { speaker: "Tina", text: "That is what my mother said, which is why I asked you." },
      { speaker: "Rory", text: "Well, now you have two votes." },
    ],
    questions: [
      {
        text: "When does Tina have to answer?",
        options: ["by Friday", "in May", "today"],
        answer: 0,
        explain: "„I have two offers, and I have to answer both by Friday.“",
      },
      {
        text: "How much more does the bank job pay?",
        options: ["about fifteen percent", "about fifty percent", "the same"],
        answer: 0,
        explain: "„About fifteen percent.“",
      },
      {
        kind: "truefalse",
        text: "Ellie is leaving in May.",
        options: ["True", "False"],
        answer: 0,
        explain: "„My colleague, whose notice period is short, leaves in May.“",
      },
      {
        kind: "gapfill",
        text: "The first offer, which is a ___ position, arrived today.",
        options: [],
        answer: 0,
        accept: ["permanent"],
        explain: "„The first offer, which is a permanent position, arrived today.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The other job, which has a fixed term, pays more.", "The other job, which has a fixed term, pays more"],
        explain: "Virgüllü ilgi cümlesi işe dair ek bilgi veriyor: süresi belli.",
      },
      {
        kind: "short_answer",
        text: "Which job does Rory recommend?",
        options: [],
        answer: 0,
        accept: ["the permanent one", "the permanent job", "the logistics job"],
        explain: "„Then take the permanent one.“",
      },
    ],
  },
  {
    id: "en-b2-u19-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 19,
    title: "Career advice at a workshop",
    genre: "monologue",
    intro: "Bir kariyer koçunun atölye konuşması. Üç ders ne?",
    gloss: [
      { de: "talent", tr: "yetenek" },
      { de: "the workload", tr: "iş yükü" },
      { de: "in pairs", tr: "ikişer ikişer" },
      { de: "a participant", tr: "katılımcı" },
      { de: "coach", tr: "koçluk yapmak" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Shelby", text: "Good morning, everyone. I have coached people through career changes for fifteen years, and today I want to share three lessons." },
      { speaker: "Shelby", text: "The first lesson: what decides a career is strategy. Not luck, and not only talent. People with a clear plan move further, even when they start lower." },
      { speaker: "Shelby", text: "The second lesson is about why people leave. Last year I worked with a manager called Holly. It was the leadership style that drove her out, not the workload." },
      { speaker: "Shelby", text: "What she needed was a boss who trusted her. What she had was a boss who checked every email." },
      { speaker: "Shelby", text: "The third lesson is about networking. It is not the people you know well who find you your next job. It is the people you meet once a year." },
      { speaker: "Shelby", text: "So here is the point of today. What we aim for is not a dead end. What we aim for is a plan you can start on Monday." },
      { speaker: "Shelby", text: "What I would like you to do now is write down one goal for the next twelve months. Then we will work in pairs." },
    ],
    questions: [
      {
        text: "How long has Shelby coached people?",
        options: ["fifteen years", "one year", "twelve months"],
        answer: 0,
        explain: "„I have coached people through career changes for fifteen years…“",
      },
      {
        text: "What drove Holly out?",
        options: ["the leadership style", "the workload", "the salary"],
        answer: 0,
        explain: "„It was the leadership style that drove her out, not the workload.“",
      },
      {
        kind: "truefalse",
        text: "According to Shelby, the people you know well usually find you your next job.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is not the people you know well who find you your next job.“",
      },
      {
        kind: "gapfill",
        text: "What decides a career is ___.",
        options: [],
        answer: 0,
        accept: ["strategy"],
        explain: "„what decides a career is strategy.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What we aim for is not a dead end.", "What we aim for is not a dead end"],
        explain: "„What“ ile başlayan cümle vurguyu sona, „not a dead end“e taşıyor.",
      },
      {
        kind: "short_answer",
        text: "What should the participants write down now?",
        options: [],
        answer: 0,
        accept: ["one goal", "a goal", "one goal for the year"],
        explain: "„What I would like you to do now is write down one goal for the next twelve months.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u19-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 19,
    title: "Notes from recruiting",
    genre: "info",
    intro: "İşe alım sürecinden notlar: kim neye, nasıl karar verdi?",
    gloss: [
      { de: "asked to supervise", tr: "denetlemesi istenince" },
      { de: "having read", tr: "okuduktan sonra" },
      { de: "wanting to recruit", tr: "işe almak istedikleri için" },
      { de: "which is", tr: "olan" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Denetlemesi istenince kabul etti.",
        answer: "Asked to supervise, she agreed.",
        hint: "Edilgen ortaç: „having been“ düşüyor.",
      },
      {
        kind: "build",
        tr: "Özlük dosyasını okuduktan sonra karar verdiler.",
        answer: "Having read the personnel file, they decided.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Hızlı işe almak istedikleri için seçim sürecini kısalttılar.",
        answer: "Wanting to recruit fast, they cut the selection process.",
        hint: "Etken ortaç: bir durum ve bir neden.",
      },
      {
        kind: "build",
        tr: "Kadrolu iş olan teklif bugün geldi.",
        answer: "The offer, which is a permanent position, arrived today.",
        hint: "„which is“ buradan silinebilir.",
      },
      {
        kind: "form",
        prompt: "İşe alım toplantısı için not kartını doldur.",
        facts: "Hızlı işe almak istedikleri için seçim süreci kısaltıldı; ekibi denetlemesi istenen aday kabul etti; kadrolu iş teklifi bugün geldi; karar özlük dosyası okunduktan sonra verildi.",
        fields: [
          { label: "Selection process", answer: "cut", accept: ["shorter", "cut short"] },
          { label: "Reason", answer: "to recruit fast", accept: ["recruiting fast", "speed"] },
          { label: "Asked to supervise", answer: "she agreed", accept: ["agreed", "yes"] },
          { label: "The offer", answer: "a permanent position", accept: ["permanent", "permanent position"] },
          { label: "Decision made after", answer: "reading the personnel file", accept: ["the personnel file", "reading the file"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u19-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 19,
    title: "Career choices",
    genre: "opinion",
    intro: "Kariyer atölyesi için cümleler: bir kariyeri ne belirliyor, iyi eleman neden zor bulunuyor?",
    gloss: [
      { de: "what decides", tr: "belirleyen şey" },
      { de: "it was the leadership style", tr: "liderlik tarzıydı" },
      { de: "what we aim for", tr: "hedeflediğimiz şey" },
      { de: "never has", tr: "hiç olmadı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir kariyeri belirleyen şey strateji.",
        answer: "What decides a career is strategy.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Onu gitmeye iten liderlik tarzıydı.",
        answer: "It was the leadership style that drove her out.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "Hedeflediğimiz şey bir çıkmaz değil.",
        answer: "What we aim for is not a dead end.",
        hint: "İki yarı karşı karşıya konuyor.",
      },
      {
        kind: "build",
        tr: "Nitelikli bir eleman hiç bu kadar zor bulunmadı.",
        answer: "Never has a skilled worker been so hard to find.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "İnsan kaynakları nadiren bu kadar hızlı yanıt verir.",
        answer: "Rarely does human resources answer so fast.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
    ],
  },
];
