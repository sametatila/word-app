import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 24 — "Gecikmenin nedeni, iş nasıl yürüyor, sorumlu
 * kişi, hiç bu kadar hızlı değildi".
 *
 * Dört ders: What caused the delay · How the work runs ·
 * The person responsible · Never so promptly.
 *
 *   Kelime: workflow, structure, relieve, arrangement, promptly, swiftly,
 *           unbroken, oblige, assure.
 *   Kalıp:  What caused the delay was a scheduling conflict. ·
 *           It was the deadline extension that saved us. ·
 *           What we lack is buffer time. ·
 *           Having read the interim report, we changed the plan. ·
 *           Asked to follow up, she wrote again. ·
 *           Wanting to carry out the test, they waited. ·
 *           My colleague, whose area of responsibility is wide, answered. ·
 *           The plan, which is a new arrangement, works. ·
 *           The division of tasks, which nobody read, is old. ·
 *           Never has an answer come so promptly. ·
 *           Rarely does a reply arrive so swiftly. ·
 *           Only after the third letter do they send a reminder.
 *
 * Ünitenin tek öğretme noktası VİRGÜLLÜ İLGİ CÜMLECİĞİNDE NESNE ADILI
 * DÜŞMÜYOR. B1 ünite 3 nesne konumundaki adılın düşebildiğini öğretmişti
 * („the report I sent“); burada sınırı geliyor: o düşme yalnız SEÇİM YAPAN
 * (virgülsüz) cümlecikte var. „The division of tasks, which nobody read,
 * is old“ cümlesinde „which“ nesne ama silinemiyor.
 */
export const enB2U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u24-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 24,
    title: "New tasks for the team",
    genre: "email",
    intro: "Bir ekip yöneticisi görev dağılımını değiştiriyor. Kim neyi üstleniyor?",
    gloss: [
      { de: "the division of tasks", tr: "görev dağılımı" },
      { de: "match", tr: "uymak" },
      { de: "actually", tr: "aslında" },
      { de: "look after", tr: "ilgilenmek" },
      { de: "whatever", tr: "ne olursa" },
      { de: "an inbox", tr: "gelen kutusu" },
      { de: "a responsibility", tr: "sorumluluk" },
      { de: "take over", tr: "devralmak" },
      { de: "a partner", tr: "ortak" },
      { de: "rotate", tr: "sırayla yapılmak" },
      { de: "pressure", tr: "baskı" },
      { de: "whoever", tr: "kim olursa" },
      { de: "certainly", tr: "kesinlikle" },
      { de: "would rather", tr: "tercih etmek" },
      { de: "print out", tr: "yazdırmak" },
      { de: "recycling", tr: "geri dönüşüm" },
      { de: "sixth", tr: "altıncı" },
    ],
    minutes: 9,
    text:
      "Subject: New division of tasks from next week\n" +
      "Hi everyone,\n" +
      "As most of you know, the division of tasks, which nobody has read since 2022, is old, and it no longer matches the way we actually work. So from Monday we are trying something new.\n" +
      "The plan, which is a new arrangement for all of us, is simple. Each of you will look after one area instead of taking whatever comes into the inbox.\n" +
      "Fiona, whose area of responsibility is already wide, will keep the customer calls. Louis, who joined us in the spring, will take over the online orders, which Fiona has handled alone for two years. Fay, whose Spanish is excellent, will answer all messages from our partners in Madrid.\n" +
      "The weekly report, which I used to write myself, will rotate. Each of us will write it once a month, which should relieve the pressure on Fridays.\n" +
      "I have also changed the workflow for complaints. Every complaint, which until now went to whoever was free, will go to Ian first. He will answer promptly and pass the difficult ones to me.\n" +
      "None of this is fixed. The structure, which I put together in one afternoon, will certainly need changes, and I would rather hear about them in the first week than in the sixth month.\n" +
      "We will meet on Thursday at 10:00 to see how the first days went. The old document, which some of you printed out, can go in the recycling.\n" +
      "Thanks,\n" +
      "Charlie",
    questions: [
      {
        text: "Who will keep the customer calls?",
        options: ["Fiona", "Louis", "Fay"],
        answer: 0,
        explain: "„Fiona, whose area of responsibility is already wide, will keep the customer calls.“",
      },
      {
        text: "Why will Fay answer the messages from Madrid?",
        options: ["Her Spanish is excellent.", "She joined in the spring.", "She writes the report."],
        answer: 0,
        explain: "„Fay, whose Spanish is excellent, will answer all messages from our partners in Madrid.“",
      },
      {
        kind: "truefalse",
        text: "Complaints will go to Ian first.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Every complaint, which until now went to whoever was free, will go to Ian first.“",
      },
      {
        kind: "gapfill",
        text: "The division of tasks, which nobody has ___ since 2022, is old.",
        options: [],
        answer: 0,
        accept: ["read"],
        explain: "„the division of tasks, which nobody has read since 2022, is old…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The old division of tasks no longer matches the work.",
          "Louis will take over the online orders.",
          "The weekly report will rotate.",
          "The team will meet on Thursday.",
        ],
        explain: "Önce eski düzen, sonra yeni görevler, rapor ve şikâyetler, en sonda toplantı.",
      },
      {
        kind: "short_answer",
        text: "How often will each person write the weekly report?",
        options: [],
        answer: 0,
        accept: ["once a month", "monthly"],
        explain: "„Each of us will write it once a month, which should relieve the pressure on Fridays.“",
      },
    ],
  },
  {
    id: "en-b2-u24-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 24,
    title: "Why the exhibition opened late",
    genre: "report",
    intro: "Bir müzenin yaz sergisi dokuz gün geç açıldı. Değerlendirme raporu nedenleri ve dersleri sıralıyor.",
    gloss: [
      { de: "an exhibition", tr: "sergi" },
      { de: "a board", tr: "yönetim kurulu" },
      { de: "lighting", tr: "aydınlatma" },
      { de: "installation", tr: "kurulum" },
      { de: "a painting", tr: "tablo" },
      { de: "although", tr: "gerçi" },
      { de: "an extension", tr: "uzatma" },
      { de: "on loan", tr: "ödünç olarak" },
      { de: "a director", tr: "müdür" },
      { de: "an insurer", tr: "sigortacı" },
      { de: "personally", tr: "şahsen" },
      { de: "lack", tr: "eksik olmak" },
      { de: "a buffer", tr: "yedek süre" },
      { de: "directly", tr: "doğrudan" },
      { de: "recommend", tr: "önermek" },
      { de: "a volunteer", tr: "gönüllü" },
      { de: "apologize", tr: "özür dilemek" },
      { de: "a label", tr: "etiket" },
      { de: "a survey", tr: "anket" },
    ],
    minutes: 9,
    text:
      "PROJECT REVIEW: THE SUMMER EXHIBITION\n" +
      "Prepared by Megan Stewart for the museum board\n" +
      "The summer exhibition opened on July 14, nine days later than planned. This review looks at why, and at what we should do differently next year.\n" +
      "What caused the delay was a scheduling conflict. The lighting company had booked our installation week for another museum as well, and nobody noticed until the week began. It was not the paintings, the weather or the budget, although all three were blamed at the time.\n" +
      "It was the deadline extension from the insurance company that saved us. Without it, the three paintings on loan from Vienna could not have been shown at all. What made the extension possible was a phone call from our director, who knows the insurer personally.\n" +
      "What we lack is buffer time. Every step in our plan followed the last one directly, so a problem in one week moved every week after it. What I recommend is simple: two free weeks before any opening, used for nothing unless something goes wrong.\n" +
      "It was also the volunteers who kept the visitors happy on the first weekend. They stayed late, answered questions and apologized for the missing labels. What visitors remember, according to our survey, is the friendly staff, not the late start.\n" +
      "What we need from the board is a decision on the buffer weeks by September, so that the plan for next year can be built around them.",
    questions: [
      {
        text: "What caused the delay?",
        options: ["a scheduling conflict", "the weather", "the budget"],
        answer: 0,
        explain: "„What caused the delay was a scheduling conflict.“",
      },
      {
        text: "What saved the paintings from Vienna?",
        options: ["a deadline extension", "a second lighting company", "the volunteers"],
        answer: 0,
        explain: "„It was the deadline extension from the insurance company that saved us.“",
      },
      {
        kind: "truefalse",
        text: "Visitors mostly remember the late start.",
        options: ["True", "False"],
        answer: 1,
        explain: "„What visitors remember, according to our survey, is the friendly staff, not the late start.“",
      },
      {
        kind: "gapfill",
        text: "What we lack is ___ time.",
        options: [],
        answer: 0,
        accept: ["buffer"],
        explain: "„What we lack is buffer time.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The exhibition opened nine days late.",
          "A scheduling conflict caused the delay.",
          "Two free weeks are recommended.",
          "The board should decide by September.",
        ],
        explain: "Rapor sonuçla başlıyor, nedene ve önerilere geçiyor, yönetimden bir kararla bitiyor.",
      },
      {
        kind: "short_answer",
        text: "How many free weeks does Megan recommend?",
        options: [],
        answer: 0,
        accept: ["two", "2", "two weeks"],
        explain: "„two free weeks before any opening, used for nothing unless something goes wrong.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u24-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 24,
    title: "Testing the ticket machines",
    genre: "dialogue",
    intro: "Tren istasyonundaki yeni bilet makinelerinin denemesi hakkında kısa bir güncelleme. Plan neden değişti?",
    gloss: [
      { de: "a ticket machine", tr: "bilet makinesi" },
      { de: "interim", tr: "ara" },
      { de: "a card reader", tr: "kart okuyucu" },
      { de: "properly", tr: "gerektiği gibi" },
      { de: "install", tr: "kurmak" },
      { de: "follow up", tr: "takip etmek" },
      { de: "worry", tr: "endişelenmek" },
      { de: "mild", tr: "ılık" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Louis", text: "Can you give me a quick update on the ticket machines before the meeting?" },
      { speaker: "Fay Nur", text: "Sure. Having read the interim report, we changed the plan. We are testing two machines instead of five." },
      { speaker: "Louis", text: "Why only two?" },
      { speaker: "Fay Nur", text: "The report showed that the card readers fail in the cold. Wanting to carry out the test properly, we waited for the new readers to arrive." },
      { speaker: "Louis", text: "And did they arrive?" },
      { speaker: "Fay Nur", text: "Last Tuesday. Installed on Wednesday, they worked without a problem for the whole week." },
      { speaker: "Louis", text: "What about the station staff? Were they told?" },
      { speaker: "Fay Nur", text: "Asked to follow up with them, Norah wrote again on Friday. Having heard nothing for ten days, she was starting to worry." },
      { speaker: "Louis", text: "Did they answer?" },
      { speaker: "Fay Nur", text: "Yes, promptly this time. They assured us that everyone at the station knows about the test." },
      { speaker: "Louis", text: "Good. Is there anything that could stop us?" },
      { speaker: "Fay Nur", text: "Only the weather. Tested in a mild week, the machines have not seen real cold yet. We will know more in January." },
      { speaker: "Louis", text: "Then let us not promise anything to the board before February." },
    ],
    questions: [
      {
        text: "How many machines are they testing now?",
        options: ["two", "five", "ten"],
        answer: 0,
        explain: "„We are testing two machines instead of five.“",
      },
      {
        text: "Why did they wait?",
        options: ["They wanted the new card readers.", "The staff were on vacation.", "The report was late."],
        answer: 0,
        explain: "„Wanting to carry out the test properly, we waited for the new readers to arrive.“",
      },
      {
        kind: "truefalse",
        text: "The new readers worked for the whole week.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Installed on Wednesday, they worked without a problem for the whole week.“",
      },
      {
        kind: "gapfill",
        text: "Asked to follow up with them, Norah wrote again on ___.",
        options: [],
        answer: 0,
        accept: ["Friday"],
        explain: "„Asked to follow up with them, Norah wrote again on Friday.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Having read the interim report, we changed the plan.", "Having read the interim report, we changed the plan"],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "When will they know more about the cold?",
        options: [],
        answer: 0,
        accept: ["in January", "January"],
        explain: "„We will know more in January.“",
      },
    ],
  },
  {
    id: "en-b2-u24-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 24,
    title: "Nine weeks without internet",
    genre: "monologue",
    intro: "Ian, internet sağlayıcısına şikâyet için sesli mesaj bırakıyor. Ne istiyor?",
    gloss: [
      { de: "a connection", tr: "bağlantı" },
      { de: "a text message", tr: "kısa mesaj" },
      { de: "a technician", tr: "teknisyen" },
      { de: "a reminder", tr: "hatırlatma" },
      { de: "a bill", tr: "fatura" },
      { de: "exactly", tr: "tam olarak" },
      { de: "obliged", tr: "zorunda" },
      { de: "a refund", tr: "para iadesi" },
      { de: "cancel", tr: "iptal etmek" },
      { de: "a contract", tr: "sözleşme" },
      { de: "a visit", tr: "ziyaret" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ian", text: "Hello, my name is Ian Adams, customer number 4471. I am calling about my internet connection, again." },
      { speaker: "Ian", text: "I first reported the problem on the third of May. Never has an answer come so promptly. A text message thanked me within one minute. And then, nothing, for nine weeks." },
      { speaker: "Ian", text: "Rarely does a reply arrive so swiftly and say so little. The message promised a technician within three days." },
      { speaker: "Ian", text: "Only after my third letter did you send a reminder, and it was a reminder to pay my bill, which I have paid every month." },
      { speaker: "Ian", text: "Not once has a technician come to the apartment. The connection still breaks every evening between eight and ten, which is exactly when I work." },
      { speaker: "Ian", text: "I am obliged to work from home twice a week, so this is not a small problem for me." },
      { speaker: "Ian", text: "I would like two things: a technician this week, and a refund for May and June. Please call me back on this number before Friday." },
      { speaker: "Ian", text: "If I hear nothing by then, I will cancel the contract. Thank you." },
    ],
    questions: [
      {
        text: "When did Ian first report the problem?",
        options: ["on the third of May", "in June", "last Friday"],
        answer: 0,
        explain: "„I first reported the problem on the third of May.“",
      },
      {
        text: "When does the connection break?",
        options: ["every evening between eight and ten", "every morning", "only on weekends"],
        answer: 0,
        explain: "„The connection still breaks every evening between eight and ten, which is exactly when I work.“",
      },
      {
        kind: "truefalse",
        text: "A technician has already made a visit to the apartment.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not once has a technician come to the apartment.“",
      },
      {
        kind: "gapfill",
        text: "Rarely does a reply arrive so ___ and say so little.",
        options: [],
        answer: 0,
        accept: ["swiftly"],
        explain: "„Rarely does a reply arrive so swiftly and say so little.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Never has an answer come so promptly.", "Never has an answer come so promptly"],
        explain: "„Never“ başa geçince „has“ özneden önce geliyor.",
      },
      {
        kind: "short_answer",
        text: "What will Ian do if he hears nothing by Friday?",
        options: [],
        answer: 0,
        accept: ["cancel the contract", "cancel it"],
        explain: "„If I hear nothing by then, I will cancel the contract.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u24-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 24,
    title: "Sharing out the tasks",
    genre: "info",
    intro: "Ekipteki görev değişikliğini anlatan cümleler kur, sonra yeni dağılımı bir karta işle.",
    gloss: [
      { de: "which nobody read", tr: "kimsenin okumadığı" },
      { de: "which is", tr: "olan" },
      { de: "whose area", tr: "alanı olan" },
      { de: "what caused", tr: "neden olan şey" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kimsenin okumadığı görev dağılımı eski.",
        answer: "The division of tasks, which nobody read, is old.",
        hint: "Virgüllü cümlecikte nesne adılı düşmüyor.",
      },
      {
        kind: "build",
        tr: "Yeni bir düzenleme olan plan işe yarıyor.",
        answer: "The plan, which is a new arrangement, works.",
        hint: "Burada „which is“ silinebilir: arkasında isim öbeği var.",
      },
      {
        kind: "build",
        tr: "Sorumluluk alanı geniş olan meslektaşım yanıtladı.",
        answer: "My colleague, whose area of responsibility is wide, answered.",
        hint: "„whose“ iyelik taşıyor; hiçbir şey düşmüyor.",
      },
      {
        kind: "build",
        tr: "Gecikmeye yol açan şey bir program çakışmasıydı.",
        answer: "What caused the delay was a scheduling conflict.",
        hint: "Yarık cümle: liste gözden geçirilmiş demek.",
      },
      {
        kind: "form",
        prompt: "Ekibin yeni görev dağılımı kartını doldur.",
        facts: "Müşteri aramaları Fiona'da kalıyor; çevrimiçi siparişleri Louis devralıyor; Madrid'deki ortaklardan gelen mesajları Fay yanıtlıyor; şikâyetler önce Ian'a gidiyor.",
        fields: [
          { label: "Customer calls", answer: "Fiona", accept: ["Fiona keeps them"] },
          { label: "Online orders", answer: "Louis", accept: ["Louis takes them over"] },
          { label: "Messages from Madrid", answer: "Fay", accept: ["Fay answers them"] },
          { label: "Complaints", answer: "Ian first", accept: ["Ian", "they go to Ian first"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u24-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 24,
    title: "Waiting for a reply",
    genre: "opinion",
    intro: "Yanıt bekleyen bir müşterinin şikâyet mektubu ve bir iş planı için cümleler kur.",
    gloss: [
      { de: "so promptly", tr: "bu kadar tez" },
      { de: "so swiftly", tr: "bu kadar çabuk" },
      { de: "a reminder", tr: "hatırlatma" },
      { de: "asked to follow up", tr: "geri dönüş istenince" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir yanıt hiç bu kadar çabuk gelmedi.",
        answer: "Never has an answer come so promptly.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir yanıt nadiren bu kadar hızlı ulaşır.",
        answer: "Rarely does a reply arrive so swiftly.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Ancak üçüncü mektuptan sonra hatırlatma gönderiyorlar.",
        answer: "Only after the third letter do they send a reminder.",
        hint: "„only“ sınırlama; „do“ taşıyor.",
      },
      {
        kind: "build",
        tr: "Ara raporu okuduktan sonra planı değiştirdik.",
        answer: "Having read the interim report, we changed the plan.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Geri dönüş yapması istenince yeniden yazdı.",
        answer: "Asked to follow up, she wrote again.",
        hint: "Edilgen ortaç: „having been“ düşüyor.",
      },
    ],
  },
];
