import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 4 — "Neyin kararlaştırıldığı, resmî şikâyet, yolun
 * yarısında buluşmak, anlaşsaydık".
 *
 * Dört ders: What was agreed · The formal complaint · Meeting halfway ·
 * If we had agreed.
 *
 *   Kelime: obligation, concession, acknowledge, settle, withdraw,
 *           goodwill, resolution, decline, enforce, reimburse, perform,
 *           violate, jurisdiction, representative, seal, dismiss, rigid,
 *           flexible, mediation, modest, sincere, aggressive, unfair,
 *           arbitration, settled, extension, void, suspend, terminate,
 *           prior, opponent, compensation.
 *   Kalıp:  You must have misread the obligation. ·
 *           We can't have made that concession. ·
 *           They should have acknowledged the letter. ·
 *           The enforcement of the rule took months. ·
 *           The reimbursement of the cost is due. ·
 *           The performance of the contract was late. ·
 *           Admittedly, our position was rather rigid. ·
 *           We are flexible; nevertheless, the date stands. ·
 *           Presumably mediation would be faster. ·
 *           If we had agreed, the matter would have been settled. ·
 *           If we had asked for an extension, we would be calmer now. ·
 *           If the clause had been void, we would have stopped.
 *
 * Ünitenin tek öğretme noktası FİİLDEN İSİM YAPMANIN KURALI YOK, LİSTESİ
 * VAR. „enforce“ → „enforcement“, „reimburse“ → „reimbursement“, ama
 * „perform“ → „performance“; „violate“ → „violation“, „dismiss“ →
 * „dismissal“. Ek fiilden türetilemiyor, çift çift ezberleniyor — ve
 * resmî şikâyet neredeyse tümüyle bu isimlerle yazılıyor.
 */
export const enB2U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u04-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 4,
    title: "Tenants complain about repairs",
    genre: "letter",
    intro: "Kiracıların bina yönetimine yazdığı resmî şikâyet. Hangi sözler tutulmadı?",
    gloss: [
      { de: "a tenant", tr: "kiracı" },
      { de: "heating", tr: "ısıtma" },
      { de: "a heater", tr: "ısıtıcı" },
      { de: "on behalf of", tr: "adına" },
      { de: "rental", tr: "kira" },
      { de: "object", tr: "itiraz etmek" },
      { de: "an owner", tr: "sahip" },
      { de: "electric", tr: "elektrikli" },
      { de: "an acknowledgment", tr: "alındı bildirimi" },
      { de: "a violation", tr: "ihlal" },
      { de: "own", tr: "kendi" },
      { de: "removal", tr: "kaldırılma" },
      { de: "contact", tr: "başvurmak" },
      { de: "an association", tr: "dernek" },
    ],
    minutes: 9,
    text:
      "Dear Ms. Fischer,\n" +
      "Formal complaint: repairs at Linden Street 14\n" +
      "I am writing on behalf of the tenants of Linden Street 14 to make a formal complaint about the handling of the heating repairs this winter.\n" +
      "1. Performance of the contract. Under our rental contract, the heating must work from 1 October. The performance of the contract was late: the heating was out of order for nineteen days in November, and several families with small children had to stay with relatives.\n" +
      "2. Enforcement of the house rules. In January your company introduced a new rule about bicycles in the entrance. We do not object to the rule itself. However, the enforcement of the rule took months, and during that time bicycles were removed without any warning to their owners.\n" +
      "3. Reimbursement. Many tenants bought electric heaters during the repairs. The reimbursement of the cost is due, as your representative promised in writing on 2 December. So far, no tenant has received any money.\n" +
      "4. Acknowledgment. We sent two letters in December. Neither received an acknowledgment. We consider this a violation of your own service promise, which says that every letter is answered within ten days.\n" +
      "We ask for the following: payment of the heating costs by 31 March, a written apology for the removal of the bicycles, and a meeting with your representative before the end of February.\n" +
      "We would prefer to settle this matter with goodwill. If we do not receive a reply by 28 February, however, we will contact the local tenant association.\n" +
      "Yours sincerely,\n" +
      "Kerem Arslan, on behalf of the tenants",
    questions: [
      {
        text: "How long was the heating out of order?",
        options: ["nineteen days", "ten days", "two months"],
        answer: 0,
        explain: "„the heating was out of order for nineteen days in November…“",
      },
      {
        text: "What do the tenants think about the bicycle rule itself?",
        options: ["They do not object to it.", "They want it removed.", "They wrote it themselves."],
        answer: 0,
        explain: "„We do not object to the rule itself.“",
      },
      {
        kind: "truefalse",
        text: "The company promised the reimbursement in writing.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The reimbursement of the cost is due, as your representative promised in writing on 2 December.“",
      },
      {
        kind: "gapfill",
        text: "However, the ___ of the rule took months.",
        options: [],
        answer: 0,
        accept: ["enforcement"],
        explain: "„However, the enforcement of the rule took months…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The heating was out of order in November.",
          "Bicycles were removed without warning.",
          "No tenant has received any money.",
          "Two letters received no acknowledgment.",
        ],
        explain: "Şikâyet dört madde hâlinde ilerliyor: sözleşme, kurallar, geri ödeme, yanıt.",
      },
      {
        kind: "short_answer",
        text: "Who will the tenants contact if there is no reply?",
        options: [],
        answer: 0,
        accept: ["the tenant association", "the local tenant association", "the association"],
        explain: "„we will contact the local tenant association.“",
      },
    ],
  },
  {
    id: "en-b2-u04-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 4,
    title: "What mediation taught a bakery",
    genre: "blog",
    intro: "Bir fırın sahibinin ev sahibiyle yaşadığı anlaşmazlık üzerine yazısı. Geriye dönüp baktığında ne öneriyor?",
    gloss: [
      { de: "a bakery", tr: "fırın" },
      { de: "the sidewalk", tr: "kaldırım" },
      { de: "an oven", tr: "ekmek fırını" },
      { de: "an owner", tr: "sahip" },
      { de: "rental", tr: "kira" },
      { de: "history", tr: "tarih" },
      { de: "a lawyer", tr: "avukat" },
      { de: "unclear", tr: "belirsiz" },
      { de: "an arbitrator", tr: "hakem" },
      { de: "propose", tr: "önermek" },
      { de: "debt", tr: "borç" },
      { de: "a mediator", tr: "arabulucu" },
    ],
    minutes: 9,
    text:
      "WHAT A YEAR OF ARGUING TAUGHT US\n" +
      "by Elif Demir, owner of the Corner Bakery\n" +
      "Two years ago our landlord decided that the bakery had broken the rental contract by putting tables on the sidewalk. We said the tables had been there for ten years and nobody had complained. What followed was the most expensive year in the history of our small business.\n" +
      "If we had agreed in the first month, the matter would have been settled for a few hundred euros. Instead, both sides hired lawyers. By the summer, the lawyers had cost more than the tables were worth.\n" +
      "The worst part is that we are still paying for that year. If we had asked for mediation earlier, we would be calmer now, and we would have the money to repair the oven, which has been broken since March.\n" +
      "Our lawyer later told us that the clause about the sidewalk was badly written. If the clause had been void, we would have stopped at once. But it was not void, just unclear, and unclear is what keeps lawyers busy.\n" +
      "In the end, the city suggested arbitration. The arbitrator listened to both sides for one afternoon and proposed a compromise: four tables instead of eight, and no tables after nine in the evening. Both sides accepted within a week.\n" +
      "If someone had explained arbitration to us at the start, we would not be in debt today. So here is my advice to other small business owners: before you call a lawyer, call a mediator. It is cheaper, it is faster, and you will probably still be speaking to your landlord afterward.",
    questions: [
      {
        text: "What did the landlord complain about?",
        options: ["tables on the sidewalk", "a broken oven", "late rent"],
        answer: 0,
        explain: "„our landlord decided that the bakery had broken the rental contract by putting tables on the sidewalk.“",
      },
      {
        text: "What did the arbitrator propose?",
        options: ["four tables and none after nine", "eight tables all day", "no tables at all"],
        answer: 0,
        explain: "„four tables instead of eight, and no tables after nine in the evening.“",
      },
      {
        kind: "truefalse",
        text: "The oven was repaired in March.",
        options: ["True", "False"],
        answer: 1,
        explain: "„we would have the money to repair the oven, which has been broken since March.“",
      },
      {
        kind: "gapfill",
        text: "If we had asked for mediation earlier, we would be ___ now.",
        options: [],
        answer: 0,
        accept: ["calmer"],
        explain: "„If we had asked for mediation earlier, we would be calmer now…“",
      },
      {
        kind: "order",
        text: "Uyuşmazlığın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The landlord complained about the tables.",
          "Both sides hired lawyers.",
          "The city suggested arbitration.",
          "Both sides accepted the compromise.",
        ],
        explain: "Şikâyet, avukatlar, tahkim önerisi, en sonda uzlaşma.",
      },
      {
        kind: "short_answer",
        text: "Who should small business owners call before a lawyer?",
        options: [],
        answer: 0,
        accept: ["a mediator", "mediator"],
        explain: "„before you call a lawyer, call a mediator.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u04-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 4,
    title: "An argument over an invoice",
    genre: "dialogue",
    intro: "Bir müşteri faturaya itiraz ediyor. İki meslektaş yanıtı tartışıyor.",
    gloss: [
      { de: "an invoice", tr: "fatura" },
      { de: "a gesture", tr: "jest" },
      { de: "possibly", tr: "belki" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ufuk", text: "The client says we charged them twice for the March work. Have you seen their letter?" },
      { speaker: "Deniz", text: "Yes. They must have misread the invoice. The March work and the April work are on the same page, but they are two separate items." },
      { speaker: "Ufuk", text: "They also say we agreed to a ten percent discount." },
      { speaker: "Deniz", text: "We can't have made that concession. There is no email, no minute and no signature. I was in every meeting, and nobody mentioned a discount." },
      { speaker: "Ufuk", text: "Could someone from sales have promised it on the phone?" },
      { speaker: "Deniz", text: "Possibly, but then it must have been after June. Our sales manager only started in June." },
      { speaker: "Ufuk", text: "And our letter from April? They never replied to it." },
      { speaker: "Deniz", text: "They should have acknowledged the letter. It asked them to confirm the new prices, and silence is not a yes." },
      { speaker: "Ufuk", text: "So how do we answer?" },
      { speaker: "Deniz", text: "Politely. We explain the two items, we attach the April letter, and we offer a call." },
      { speaker: "Ufuk", text: "No discount?" },
      { speaker: "Deniz", text: "Not ten percent. But if they pay by the end of the month, I could live with a small gesture of goodwill." },
    ],
    questions: [
      {
        text: "What does the client say?",
        options: ["They were charged twice.", "The work was late.", "The prices were too low."],
        answer: 0,
        explain: "„The client says we charged them twice for the March work.“",
      },
      {
        text: "Why does Deniz think there was no discount?",
        options: ["There is no written record of it.", "The client is new.", "Deniz was absent."],
        answer: 0,
        explain: "„There is no email, no minute and no signature.“",
      },
      {
        kind: "truefalse",
        text: "The April letter asked the client to confirm new prices.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It asked them to confirm the new prices, and silence is not a yes.“",
      },
      {
        kind: "gapfill",
        text: "We can't have made that ___.",
        options: [],
        answer: 0,
        accept: ["concession"],
        explain: "„We can't have made that concession.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They should have acknowledged the letter.", "They should have acknowledged the letter"],
        explain: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "short_answer",
        text: "What would Deniz offer if the client pays by the end of the month?",
        options: [],
        answer: 0,
        accept: ["a small gesture of goodwill", "a small gesture", "goodwill"],
        explain: "„I could live with a small gesture of goodwill.“",
      },
    ],
  },
  {
    id: "en-b2-u04-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 4,
    title: "The sports club fee dispute",
    genre: "monologue",
    intro: "Spor kulübü müdürü üyelere aidat artışını anlatıyor. Kulüp nerede geri adım atıyor, nerede diretiyor?",
    gloss: [
      { de: "a fee", tr: "aidat" },
      { de: "a pool", tr: "havuz" },
      { de: "heat", tr: "ısıtmak" },
      { de: "a sentence", tr: "cümle" },
      { de: "an explanation", tr: "açıklama" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Lale", text: "Good evening, everyone. I know many of you are angry about the new fees, and I want to start with an honest sentence." },
      { speaker: "Lale", text: "Admittedly, our position was rather rigid. We announced the increase in a short email and did not explain it, and that was a mistake." },
      { speaker: "Lale", text: "Here is the explanation. Our energy bill has doubled, and the pool alone costs twice as much to heat as it did two years ago." },
      { speaker: "Lale", text: "We have read your letters. Families with three or more children will pay the old fee until the end of the year, and students will get a twenty percent discount." },
      { speaker: "Lale", text: "We are flexible; nevertheless, the date stands. The new fees will start on 1 January for everyone else, because we cannot wait longer." },
      { speaker: "Lale", text: "Some of you have asked for mediation with the city. Presumably mediation would be faster than another six months of letters, and we are happy to take part." },
      { speaker: "Lale", text: "We also want to be more open. We will publish the budget of the club online, so that every member can see where the money goes." },
      { speaker: "Lale", text: "Thank you for your patience. After the break, we will answer your questions for as long as you like." },
    ],
    questions: [
      {
        text: "Why are the fees going up?",
        options: ["The energy bill has doubled.", "The pool is new.", "The city asked for more money."],
        answer: 0,
        explain: "„Our energy bill has doubled, and the pool alone costs twice as much to heat as it did two years ago.“",
      },
      {
        text: "Who will pay the old fee until the end of the year?",
        options: ["families with three or more children", "students", "all members"],
        answer: 0,
        explain: "„Families with three or more children will pay the old fee until the end of the year…“",
      },
      {
        kind: "truefalse",
        text: "The new fees will start later than planned.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We are flexible; nevertheless, the date stands.“",
      },
      {
        kind: "gapfill",
        text: "Families with three or more children will pay the old ___ until the end of the year.",
        options: [],
        answer: 0,
        accept: ["fee"],
        explain: "„Families with three or more children will pay the old fee until the end of the year…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Admittedly, our position was rather rigid.", "Admittedly, our position was rather rigid"],
        explain: "Kimse almadan önce verilen ödün.",
      },
      {
        kind: "short_answer",
        text: "Where will the club publish its budget?",
        options: [],
        answer: 0,
        accept: ["online", "on the internet", "on the website"],
        explain: "„We will publish the budget of the club online, so that every member can see where the money goes.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u04-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 4,
    title: "Notes for a complaint",
    genre: "info",
    intro: "Bina yönetimine gönderilecek resmî şikâyet için notlar hazırla.",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "the enforcement", tr: "uygulatılması" },
      { de: "the reimbursement", tr: "geri ödemesi" },
      { de: "the performance", tr: "ifası" },
      { de: "acknowledged", tr: "kabul ettiğini bildirdi" },
      { de: "an acknowledgment", tr: "alındı bildirimi" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kuralın uygulatılması aylar sürdü.",
        answer: "The enforcement of the rule took months.",
        hint: "Fiil isme dönüyor; eki ezberden geliyor: „-ment“.",
      },
      {
        kind: "build",
        tr: "Masrafın geri ödemesinin vakti geldi.",
        answer: "The reimbursement of the cost is due.",
        hint: "Yine „-ment“; ama bu bir kural değil, liste.",
      },
      {
        kind: "build",
        tr: "Sözleşmenin ifası gecikti.",
        answer: "The performance of the contract was late.",
        hint: "Burada „-ance“ geliyor; „performment“ diye bir şey yok.",
      },
      {
        kind: "build",
        tr: "Mektubu kabul ettiklerini bildirmeleri gerekirdi.",
        answer: "They should have acknowledged the letter.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "form",
        prompt: "Şikâyet mektubu için not kartını doldur.",
        facts: "Isıtma kasımda on dokuz gün çalışmadı; bisiklet kuralının uygulatılması aylar sürdü; kiracıların ısıtıcı masrafları hâlâ geri ödenmedi; iki mektuba yanıt gelmedi.",
        fields: [
          { label: "Heating out of order", answer: "nineteen days", accept: ["19 days", "for nineteen days"] },
          { label: "Enforcement of the rule", answer: "took months", accept: ["months", "it took months"] },
          { label: "Reimbursement of the cost", answer: "still due", accept: ["not paid", "not yet paid", "due"] },
          { label: "Replies to our letters", answer: "none", accept: ["no reply", "no acknowledgment"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u04-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 4,
    title: "An unsettled matter",
    genre: "opinion",
    intro: "Hâlâ çözülmemiş bir anlaşmazlığa geriye dönüp bakan bir mektup yaz.",
    gloss: [
      { de: "would have been settled", tr: "çözüme bağlanmış olurdu" },
      { de: "would be calmer", tr: "daha sakin olurduk" },
      { de: "must have misread", tr: "yanlış okumuş olmalı" },
      { de: "can't have made", tr: "vermiş olamaz" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Anlaşsaydık mesele çözüme bağlanmış olurdu.",
        answer: "If we had agreed, the matter would have been settled.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Süre uzatımı isteseydik şimdi daha sakin olurduk.",
        answer: "If we had asked for an extension, we would be calmer now.",
        hint: "Karışık koşul: sonuç bugüne ait.",
      },
      {
        kind: "build",
        tr: "Madde hükümsüz olsaydı dururduk.",
        answer: "If the clause had been void, we would have stopped.",
        hint: "Yine kapalı: durma kararı o haftaya aitti.",
      },
      {
        kind: "build",
        tr: "Yükümlülüğü yanlış okumuş olmalısın.",
        answer: "You must have misread the obligation.",
        hint: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "build",
        tr: "O ödünü vermiş olamayız.",
        answer: "We can't have made that concession.",
        hint: "Kanıt kapatıyor: olumsuzu „can't have“.",
      },
    ],
  },
];
