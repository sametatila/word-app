import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 12 — "Sigorta, vergi, resmî mektup, bekleme salonu".
 *
 * Dört ders: What the policy covers · The tax return ·
 * Writing to the office · Waiting my turn.
 *
 *   Kelime: insurance, cover, policy, accident, premium, health, protect,
 *           benefit, tax, income, declare, deduct, earn, annual, payment,
 *           record, letter, subject, regards, sincerely, request, reply,
 *           paragraph, envelope, queue, number, counter, patience, turn,
 *           desk, ticket, wait.
 *   Kalıp:  If you have an accident, the policy covers it. ·
 *           If I paid more, I would get a better policy. ·
 *           You are not covered unless you report it. ·
 *           I have declared my income this year. ·
 *           I declared it last year too. · Have you kept the records? ·
 *           I am writing with a request about my account. ·
 *           Although I wrote twice, I received no reply. ·
 *           I look forward to your reply. Yours sincerely. ·
 *           I had taken a ticket before I sat down. ·
 *           Then they called my number. ·
 *           By the time I got there, the queue had grown.
 *
 * Ünitenin tek öğretme noktası RESMÎ MEKTUBUN DİLİ: sabit açılış („I am
 * writing with a request about …“), sabit kapanış („I look forward to
 * your reply. Yours sincerely.“), „but“ yerine „although“, ve kısaltma
 * yok. Bunlar dilbilgisi kuralı değil, KAYIT kuralı — yanlış olan cümle
 * anlaşılır ama yanlış yerde durur. İngilizcenin burada Almancada
 * olmayan bir kuralı var: adı bildiğinde „Yours sincerely“, bilmediğinde
 * „Yours faithfully“.
 */
export const enB1U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u12-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 12,
    title: "Writing to the office",
    genre: "letter",
    intro: "Üçüncü mektup. Resmî dil neyi değiştiriyor?",
    gloss: [
      { de: "reference", tr: "işlem numarası" },
      { de: "attached", tr: "ekte" },
      { de: "at your earliest convenience", tr: "en kısa zamanda" },
      { de: "neither", tr: "hiçbiri" },
      { de: "itself", tr: "kendisi" },
      { de: "sentence", tr: "cümle" },
      { de: "none of them", tr: "hiçbiri" },
      { de: "silence", tr: "sessizlik" },
    ],
    minutes: 7,
    text:
      "Dear Ms Aslan,\n" +
      "Subject: account 4471 — request for a written reply\n" +
      "I am writing with a request about my account. The reference is in the subject line and on every page of this letter.\n" +
      "Although I wrote twice, I received no reply. The first letter was sent on the third of March and the second on the twenty-first. Both went to this address and neither came back.\n" +
      "The request itself is one sentence: I would like the annual statement for last year, on paper, with a stamp.\n" +
      "I have called four times. On each call I was told that the statement would be sent within ten working days, and on each call the ten days started again. I am not writing about the statement any more. I am writing because four people said the same thing and none of them wrote it down.\n" +
      "A copy of the first letter is attached, with the date on it.\n" +
      "If the statement cannot be issued, I would be grateful for one line saying so. A short no is better than a long silence.\n" +
      "I look forward to your reply at your earliest convenience.\n" +
      "Yours sincerely,\n" +
      "Deniz Kaya",
    questions: [
      {
        text: "What is the request?",
        options: ["the annual statement on paper", "a phone call", "a new account"],
        answer: 0,
        explain: "„I would like the annual statement for last year, on paper, with a stamp.“",
      },
      {
        text: "Why is Deniz writing now?",
        options: ["nobody wrote anything down", "the account is closed", "the letters came back"],
        answer: 0,
        explain: "„four people said the same thing and none of them wrote it down.“",
      },
      {
        kind: "truefalse",
        text: "The earlier letters came back to Deniz.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Both went to this address and neither came back.“",
      },
      {
        kind: "gapfill",
        text: "Deniz has called ___ times.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„I have called four times.“",
      },
      {
        kind: "order",
        text: "Mektubun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I am writing with a request about my account.",
          "Although I wrote twice, I received no reply.",
          "The request itself is one sentence.",
          "I look forward to your reply.",
        ],
        explain: "Açılış, geçmiş, istek, kapanış — resmî mektubun sırası.",
      },
      {
        kind: "short_answer",
        text: "What does Deniz want if the statement cannot be issued?",
        options: [],
        answer: 0,
        accept: ["one line saying so", "a short no", "one line"],
        explain: "„I would be grateful for one line saying so. A short no is better than a long silence.“",
      },
    ],
  },
  {
    id: "en-b1-u12-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 12,
    title: "What the policy covers",
    genre: "info",
    intro: "Poliçenin üç cümlesi. Hangi koşul gerçek, hangisi değil?",
    gloss: [
      { de: "claim", tr: "hasar talebi" },
      { de: "within", tr: "içinde" },
      { de: "worth it", tr: "değer" },
      { de: "sentence", tr: "cümle" },
      { de: "real condition", tr: "gerçek koşul" },
      { de: "exist", tr: "var olmak" },
    ],
    minutes: 7,
    text:
      "Three sentences from a policy and what each one really says.\n" +
      "If you have an accident, the policy covers it. Real condition, normal life: this can happen and here is what follows. Present in the first half, present in the second.\n" +
      "If I paid more, I would get a better policy. Not real. I am not paying more, and the sentence is about a policy that does not exist for me. The past form here is not about the past at all.\n" +
      "You are not covered unless you report it within seven days. This is the sentence that costs people money. „Unless“ means „if not“, and the seven days start on the day of the accident, not on the day you notice the damage.\n" +
      "The premium is the yearly payment. The benefit is what you get. Between them sits a number nobody reads: the first two hundred euros of any claim are yours.\n" +
      "So a small accident is not worth a claim. A big one is worth it twice, because the second thing insurance protects is your patience.\n" +
      "Read the „unless“ lines first. There are usually three and they are never in the same place.",
    questions: [
      {
        text: "What does „unless“ mean here?",
        options: ["if not", "because", "after"],
        answer: 0,
        explain: "„„Unless“ means „if not“…“",
      },
      {
        text: "When do the seven days start?",
        options: ["on the day of the accident", "on the day you notice", "after the claim"],
        answer: 0,
        explain: "„the seven days start on the day of the accident, not on the day you notice the damage.“",
      },
      {
        kind: "truefalse",
        text: "The writer pays more for a better policy.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Not real. I am not paying more…“",
      },
      {
        kind: "gapfill",
        text: "The first ___ hundred euros of any claim are yours.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„the first two hundred euros of any claim are yours.“",
      },
      {
        kind: "short_answer",
        text: "Which lines should you read first?",
        options: [],
        answer: 0,
        accept: ["the unless lines", "unless lines", "the unless ones"],
        explain: "„Read the „unless“ lines first. There are usually three…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u12-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 12,
    title: "The tax return",
    genre: "dialogue",
    intro: "Vergi beyanı. Hangi cümle tarihli, hangisi değil?",
    gloss: [
      { de: "receipts", tr: "fişler" },
      { de: "deadline", tr: "son tarih" },
      { de: "worth doing", tr: "yapmaya değer" },
      { de: "spring", tr: "ilkbahar" },
      { de: "deduction", tr: "indirim" },
      { de: "system", tr: "sistem" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "I have declared my income this year. Two hours, and most of it was looking for one number." },
      { speaker: "Can", text: "Which number?" },
      { speaker: "Ela", text: "The one from the second job in the spring. I declared it last year too and I still could not find it." },
      { speaker: "Can", text: "Have you kept the records?" },
      { speaker: "Ela", text: "I have kept everything and I can find nothing. Those are two different skills." },
      { speaker: "Can", text: "What can you deduct?" },
      { speaker: "Ela", text: "The course in March, the travel to the second job, and part of the internet. Not the coffee, and I asked." },
      { speaker: "Can", text: "Is it worth doing all that for the deduction?" },
      { speaker: "Ela", text: "About three hundred euros this year. Two hours for three hundred is worth doing." },
      { speaker: "Can", text: "And the deadline?" },
      { speaker: "Ela", text: "The end of the month. If you send it late, the payment is the same but the questions are different." },
      { speaker: "Can", text: "What do you do with the receipts?" },
      { speaker: "Ela", text: "One envelope a year, with the year on the front. I learned that from my father and it is the only system I have kept." },
      { speaker: "Can", text: "Then I start tonight." },
      { speaker: "Ela", text: "Start with the envelope. The form takes an hour; the looking takes the rest of your life." },
    ],
    questions: [
      {
        text: "What took most of the two hours?",
        options: ["looking for one number", "filling in the form", "keeping the records"],
        answer: 0,
        explain: "„Two hours, and most of it was looking for one number.“",
      },
      {
        text: "What can Ela not deduct?",
        options: ["the coffee", "the course", "the travel"],
        answer: 0,
        explain: "„Not the coffee, and I asked.“",
      },
      {
        kind: "truefalse",
        text: "Ela has lost the records.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have kept everything and I can find nothing. Those are two different skills.“",
      },
      {
        kind: "gapfill",
        text: "The deduction is about ___ hundred euros.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„About three hundred euros this year.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have declared my income this year.", "I have declared my income this year"],
        explain: "Yıl bitmedi, o yüzden present perfect; „last year“ olsaydı sade geçmiş olurdu.",
      },
      {
        kind: "short_answer",
        text: "What is Ela's system for receipts?",
        options: [],
        answer: 0,
        accept: ["one envelope a year", "an envelope", "one envelope"],
        explain: "„One envelope a year, with the year on the front.“",
      },
    ],
  },
  {
    id: "en-b1-u12-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 12,
    title: "Waiting my turn",
    genre: "monologue",
    intro: "Bekleme salonunda iki saat. Sıra nasıl işliyor?",
    gloss: [
      { de: "grown", tr: "uzamış" },
      { de: "screen", tr: "ekran" },
      { de: "the trick", tr: "püf noktası" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "the average", tr: "ortalama" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "I had taken a ticket before I sat down. That is the only thing I did right all morning." },
      { speaker: "Nil", text: "By the time I got there, the queue had grown to about forty people. It was twenty when the doors opened at eight." },
      { speaker: "Nil", text: "The ticket said B62. The screen was showing B31, which sounds bad and is not: A, B and C move at different speeds." },
      { speaker: "Nil", text: "B is the slow one. B is everything that needs a signature from somebody who is not at the counter." },
      { speaker: "Nil", text: "Then they called my number. Two hours and ten minutes, which is under the average for a Monday." },
      { speaker: "Nil", text: "The four minutes at the desk were the easy part. She stamped two pages, asked one question and said: next time take A." },
      { speaker: "Nil", text: "That is the trick nobody writes down. The same task has two tickets, and A is for people who bring the form already filled in." },
      { speaker: "Nil", text: "Patience is not the skill here. Reading the small sign next to the ticket machine is the skill." },
    ],
    questions: [
      {
        text: "How long did Nil wait?",
        options: ["two hours and ten minutes", "forty minutes", "four minutes"],
        answer: 0,
        explain: "„Then they called my number. Two hours and ten minutes…“",
      },
      {
        text: "What is the trick?",
        options: ["bring the form filled in and take A", "come at eight", "take two tickets"],
        answer: 0,
        explain: "„A is for people who bring the form already filled in.“",
      },
      {
        kind: "truefalse",
        text: "The queue was forty people when the doors opened.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It was twenty when the doors opened at eight.“",
      },
      {
        kind: "gapfill",
        text: "Nil's ticket said B___.",
        options: [],
        answer: 0,
        accept: ["62"],
        explain: "„The ticket said B62. The screen was showing B31…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I had taken a ticket before I sat down.", "I had taken a ticket before I sat down"],
        explain: "Önce olan iş „had“ + üçüncü hâl; oturmak sonra geliyor.",
      },
      {
        kind: "short_answer",
        text: "What is the skill, for Nil?",
        options: [],
        answer: 0,
        accept: ["reading the small sign", "reading the sign", "the sign"],
        explain: "„Reading the small sign next to the ticket machine is the skill.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u12-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 12,
    title: "I am writing with a request",
    genre: "formal",
    intro: "Resmî mektubun dört sabit parçası. Kısaltma yok, „but“ yok.",
    gloss: [
      { de: "a request", tr: "talep" },
      { de: "no reply", tr: "cevap yok" },
      { de: "Yours sincerely", tr: "saygılarımla" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Hesabımla ilgili bir talep için yazıyorum.",
        answer: "I am writing with a request about my account.",
        hint: "Resmî mektubun sabit açılışı; „I write“ değil, „I am writing“.",
      },
      {
        kind: "build",
        tr: "İki kez yazmama rağmen cevap alamadım.",
        answer: "Although I wrote twice, I received no reply.",
        hint: "Resmî kayıtta „but“ yerine „although“; kısaltma da yok.",
      },
      {
        kind: "build",
        tr: "Cevabınızı bekliyorum. Saygılarımla.",
        answer: "I look forward to your reply. Yours sincerely.",
        hint: "„Yours sincerely“ adı bildiğinde; bilmediğinde „Yours faithfully“ olurdu.",
      },
      {
        kind: "build",
        tr: "Bu yıl gelirimi beyan ettim.",
        answer: "I have declared my income this year.",
        alternatives: ["I've declared my income this year."],
        hint: "Yıl bitmedi: present perfect.",
      },
      {
        kind: "form",
        prompt: "Mektup kartını doldur.",
        facts: "Konu hesap 4471; iki mektup yazıldı; cevap gelmedi; yıllık hesap özeti isteniyor.",
        fields: [
          { label: "Subject", answer: "account 4471", accept: ["4471"] },
          { label: "Letters", answer: "two", accept: ["2"] },
          { label: "Reply", answer: "no reply", accept: ["nothing"] },
          { label: "Request", answer: "the annual statement", accept: ["a statement"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u12-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 12,
    title: "You are not covered unless you report it",
    genre: "info",
    intro: "Poliçe ve sıra cümleleri. Hangi koşul gerçek, hangisi değil?",
    gloss: [
      { de: "covers it", tr: "karşılıyor" },
      { de: "unless", tr: "-medikçe" },
      { de: "had grown", tr: "uzamıştı" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bir kaza geçirirsen poliçe onu karşılıyor.",
        answer: "If you have an accident, the policy covers it.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Daha fazla ödesem daha iyi bir poliçe alırdım.",
        answer: "If I paid more, I would get a better policy.",
        hint: "Gerçek olmayan koşul: geçmiş biçim burada geçmişi anlatmıyor.",
      },
      {
        kind: "build",
        tr: "Bildirmedikçe kapsam dışındasın.",
        answer: "You are not covered unless you report it.",
        hint: "„unless“ „eğer … değilse“ demek; sonrası geniş zaman.",
      },
      {
        kind: "build",
        tr: "Oturmadan önce sıra fişi almıştım.",
        answer: "I had taken a ticket before I sat down.",
        hint: "Önce olan iş „had“ + üçüncü hâl alıyor.",
      },
      {
        kind: "build",
        tr: "Ben oraya vardığımda kuyruk uzamıştı.",
        answer: "By the time I got there, the queue had grown.",
        hint: "„By the time“ iki geçmişi bağlıyor; uzama varıştan önce olmuş.",
      },
    ],
  },
];
