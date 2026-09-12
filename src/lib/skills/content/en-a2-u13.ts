import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 13 — "İş e-postası, ilk gün, iade, şikâyet".
 *
 * Dört ders: A work email · My first day · Returns and exchanges ·
 * Complaining about a product.
 *
 *   Kelime: send, attach, reply, confirm, regards, folder, text, click,
 *           nervous, introduce, show, break, end, lunch break, shy, greet,
 *           receipt, exchange, refund, size, wrong, item, give back,
 *           choice, damaged, quality, complain, manager, expect, product,
 *           serious, accept.
 *   Kalıp:  I have attached the file. · Could you confirm the time? ·
 *           Best regards, · I was very nervous on my first day. ·
 *           My boss introduced me to the team. ·
 *           At the end of the day I felt much better. ·
 *           I'd like to return this. ·
 *           Can I exchange it for a bigger size? ·
 *           Can I get a refund, please? · There's a problem with this … ·
 *           I bought it two days ago. · I'd like a refund, please.
 *
 * Ünite 11 present perfect ile simple past'ı yan yana koymuştu; burada
 * SEÇİM KURALI geliyor: ZAMAN BELİRTECİ ZAMANI SEÇER. „ago“, „yesterday“,
 * „last week“ varsa simple past zorunlu — „I have bought it two days ago“
 * diye bir cümle yok. Belirteç yoksa ve sonucu şimdi önemliyse present
 * perfect. Dört dersin dördü de bu iki kutbu kullanıyor: e-posta sonucu
 * anlatıyor, ilk gün anısı kapanmış bir günü anlatıyor.
 */
export const enA2U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u13-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 13,
    title: "A work email",
    genre: "email",
    intro: "Bir iş e-postası. Hangi iş bitti, hangisi bekliyor?",
    gloss: [
      { de: "Subject", tr: "konu" },
      { de: "calendar", tr: "takvim" },
      { de: "attached", tr: "ekledim" },
    ],
    minutes: 5,
    text:
      "Subject: The Friday meeting\n" +
      "Dear Ms Aslan,\n" +
      "I have attached the file with the numbers for August. It is in the folder Reports and the name is the same as last month.\n" +
      "Could you confirm the time of the meeting on Friday? In my calendar it says two, but Mert wrote three in his email.\n" +
      "One more thing. I sent the short text to the customer yesterday and they replied this morning. They accept the new price but they want the product in September.\n" +
      "I haven't answered them yet. I would like to talk to you first.\n" +
      "If you open my last email, you see their message.\n" +
      "Best regards,\n" +
      "Deniz",
    questions: [
      {
        text: "What is in the attached file?",
        options: ["the numbers for August", "the customer's message", "the new price"],
        answer: 0,
        explain: "„I have attached the file with the numbers for August.“",
      },
      {
        text: "What should Ms Aslan confirm?",
        options: ["the time of the meeting", "the new price", "the name of the folder"],
        answer: 0,
        explain: "„Could you confirm the time of the meeting on Friday?“ — takvimde iki, e-postada üç yazıyor.",
      },
      {
        kind: "truefalse",
        text: "Deniz has not answered the customer yet.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I haven't answered them yet. I would like to talk to you first.“",
      },
      {
        kind: "gapfill",
        text: "The file is in the folder ___.",
        options: [],
        answer: 0,
        accept: ["Reports"],
        explain: "„It is in the folder Reports and the name is the same as last month.“",
      },
      {
        kind: "short_answer",
        text: "What does the customer want in September?",
        options: [],
        answer: 0,
        accept: ["the product", "the new product", "product"],
        explain: "„They accept the new price but they want the product in September.“",
      },
    ],
  },
  {
    id: "en-a2-u13-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 13,
    title: "Returns and exchanges",
    genre: "dialogue",
    intro: "İade konuşması. Fişle ne oluyor, fişsiz ne oluyor?",
    gloss: [
      { de: "goods", tr: "mallar" },
      { de: "easier", tr: "daha kolay" },
      { de: "Here it is", tr: "buyurun" },
    ],
    minutes: 5,
    text:
      "Deniz: Hello. I'd like to return this, please.\n" +
      "Shop: Of course. Do you have the receipt?\n" +
      "Deniz: Here it is. I bought it two days ago.\n" +
      "Shop: I see. Is there a problem with the item?\n" +
      "Deniz: No, the quality is fine. It is the wrong size. I need a bigger one.\n" +
      "Shop: Can I exchange it for a bigger size, or would you like a refund?\n" +
      "Deniz: Can I get a refund, please? I have already bought a second shirt.\n" +
      "Shop: No problem. With the receipt it is easy. Without it I can only exchange.\n" +
      "Deniz: Good to know. How long do I have for a return?\n" +
      "Shop: Fourteen days. After that we give a card, not money.\n" +
      "Deniz: And if the item is damaged?\n" +
      "Shop: Then there is no time. Damaged goods go back always.\n" +
      "Deniz: Thank you. That was easier than I expected.",
    questions: [
      {
        text: "Why does Deniz want to return the item?",
        options: ["it is the wrong size", "the quality is bad", "it is damaged"],
        answer: 0,
        explain: "„No, the quality is fine. It is the wrong size.“",
      },
      {
        text: "What does Deniz ask for?",
        options: ["a refund", "a bigger size", "a card"],
        answer: 0,
        explain: "„Can I get a refund, please? I have already bought a second shirt.“",
      },
      {
        kind: "truefalse",
        text: "Without the receipt you can get a refund.",
        options: ["True", "False"],
        answer: 1,
        explain: "„With the receipt it is easy. Without it I can only exchange.“",
      },
      {
        kind: "gapfill",
        text: "You have ___ days for a return.",
        options: [],
        answer: 0,
        accept: ["fourteen", "14"],
        explain: "„Fourteen days. After that we give a card, not money.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I'd like to return this, please.",
          "Do you have the receipt?",
          "Can I get a refund, please?",
          "How long do I have for a return?",
        ],
        explain: "Önce istek, sonra fiş, sonra para iadesi, en son süre sorusu.",
      },
      {
        kind: "short_answer",
        text: "What happens after fourteen days?",
        options: [],
        answer: 0,
        accept: ["you get a card", "a card", "a card, not money"],
        explain: "„Fourteen days. After that we give a card, not money.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u13-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 13,
    title: "My first day",
    genre: "monologue",
    intro: "İlk iş günü. Hangi an günü çeviriyor?",
    gloss: [
      { de: "password", tr: "şifre" },
      { de: "moment", tr: "an" },
      { de: "much better", tr: "çok daha iyi" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Nil", text: "I was very nervous on my first day. I came forty minutes early and drank two coffees in the street." },
      { speaker: "Nil", text: "At nine my boss introduced me to the team. Ten names in two minutes. I remembered three." },
      { speaker: "Nil", text: "Then somebody showed me my desk. The computer was there, the password was not." },
      { speaker: "Nil", text: "I waited an hour for the password and I was too shy to ask." },
      { speaker: "Nil", text: "At the lunch break a colleague came and said: Sit with us. That was the moment the day turned." },
      { speaker: "Nil", text: "In the afternoon I read old reports and understood half of them." },
      { speaker: "Nil", text: "At the end of the day I felt much better. Not because I learned a lot, but because nobody expected that." },
      { speaker: "Nil", text: "I greet the new people now on their first day. Ten seconds, and the room is not the same room." },
    ],
    questions: [
      {
        text: "How early did Nil come?",
        options: ["forty minutes", "an hour", "ten minutes"],
        answer: 0,
        explain: "„I came forty minutes early and drank two coffees in the street.“",
      },
      {
        text: "What turned the day?",
        options: ["a colleague said: Sit with us", "the password came", "the boss introduced the team"],
        answer: 0,
        explain: "„That was the moment the day turned.“",
      },
      {
        kind: "truefalse",
        text: "Nil remembered three of the ten names.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Ten names in two minutes. I remembered three.“",
      },
      {
        kind: "gapfill",
        text: "Nil waited an hour for the ___.",
        options: [],
        answer: 0,
        accept: ["password"],
        explain: "„I waited an hour for the password and I was too shy to ask.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I was very nervous on my first day.", "I was very nervous on my first day"],
        explain: "Belirli ve kapanmış bir gün: simple past.",
      },
      {
        kind: "short_answer",
        text: "What does Nil do now on a new person's first day?",
        options: [],
        answer: 0,
        accept: ["greet them", "greet the new people", "say hello"],
        explain: "„I greet the new people now on their first day.“",
      },
    ],
  },
  {
    id: "en-a2-u13-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 13,
    title: "Complaining about a product",
    genre: "dialogue",
    intro: "Hasarlı bir ürün. Nerede kırıldı, ne veriliyor?",
    gloss: [
      { de: "lamp", tr: "lamba" },
      { de: "glass", tr: "cam" },
      { de: "Most people do", tr: "çoğu insan öyle" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Can", text: "Good afternoon. There's a problem with this lamp." },
      { speaker: "Shop", text: "What is the problem?" },
      { speaker: "Can", text: "I bought it two days ago and the glass is damaged. Look, here." },
      { speaker: "Shop", text: "I see it. Was it in the box like this?" },
      { speaker: "Can", text: "Yes. I opened the box at home and it was already broken." },
      { speaker: "Shop", text: "Then it happened before the shop. Do you have the receipt?" },
      { speaker: "Can", text: "Here. And a photo from Tuesday evening." },
      { speaker: "Shop", text: "Good. I'd like to give you a new one, but this lamp is the last one." },
      { speaker: "Can", text: "Then I'd like a refund, please." },
      { speaker: "Shop", text: "Of course. Can I ask the manager first? For a refund I need the manager's signature." },
      { speaker: "Can", text: "How long does that take?" },
      { speaker: "Shop", text: "Two minutes. The manager is in the office." },
      { speaker: "Can", text: "Fine. I expected a longer afternoon." },
      { speaker: "Shop", text: "Most people do. That is the serious problem in this job." },
    ],
    questions: [
      {
        text: "What is wrong with the lamp?",
        options: ["the glass is damaged", "it is the wrong size", "it does not work"],
        answer: 0,
        explain: "„I bought it two days ago and the glass is damaged.“",
      },
      {
        text: "Why does Can ask for a refund?",
        options: ["the lamp is the last one", "the receipt is old", "the glass is cheap"],
        answer: 0,
        explain: "„I'd like to give you a new one, but this lamp is the last one.“",
      },
      {
        kind: "truefalse",
        text: "The lamp broke at home.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I opened the box at home and it was already broken.“ — kutudan kırık çıktı.",
      },
      {
        kind: "gapfill",
        text: "For a refund the shop needs the manager's ___.",
        options: [],
        answer: 0,
        accept: ["signature"],
        explain: "„For a refund I need the manager's signature.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["There's a problem with this lamp.", "There is a problem with this lamp.", "There's a problem with this lamp"],
        explain: "„problem“ kendi edatını taşıyor: with.",
      },
      {
        kind: "short_answer",
        text: "How long does the manager take?",
        options: [],
        answer: 0,
        accept: ["two minutes", "2 minutes"],
        explain: "„Two minutes. The manager is in the office.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u13-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 13,
    title: "I have attached the file",
    genre: "formal",
    intro: "İki zaman, tek kural: zaman belirteci varsa simple past.",
    gloss: [
      { de: "attached", tr: "ekledim" },
      { de: "confirm", tr: "teyit etmek" },
      { de: "two days ago", tr: "iki gün önce" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Dosyayı ekledim.",
        answer: "I have attached the file.",
        alternatives: ["I've attached the file."],
        hint: "Zaman söylenmiyor ve sonucu şimdi önemli: present perfect.",
      },
      {
        kind: "build",
        tr: "Onu iki gün önce aldım.",
        answer: "I bought it two days ago.",
        hint: "„ago“ zamanı çiviliyor, o yüzden simple past. „have bought … ago“ diye bir cümle yok.",
      },
      {
        kind: "build",
        tr: "Saati teyit edebilir misiniz?",
        answer: "Could you confirm the time?",
        hint: "İş yazışmasının olağan ricası; „Can you“ biraz daha kısa durur.",
      },
      {
        kind: "build",
        tr: "Bunu iade etmek istiyorum.",
        answer: "I'd like to return this.",
        alternatives: ["I would like to return this."],
        hint: "Mağazada „I want“ yerine „I'd like“: kibar ve kısa.",
      },
      {
        kind: "form",
        prompt: "İade formunu doldur.",
        facts: "Ürün iki gün önce alındı; fiş var; beden yanlış; para iadesi isteniyor.",
        fields: [
          { label: "Bought", answer: "two days ago", accept: ["2 days ago"] },
          { label: "Receipt", answer: "yes", accept: ["I have it"] },
          { label: "Problem", answer: "the wrong size", accept: ["wrong size"] },
          { label: "Wish", answer: "a refund", accept: ["refund"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u13-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 13,
    title: "There's a problem with this",
    genre: "personal",
    intro: "Şikâyet ve ilk gün. Her fiil kendi edatını getiriyor.",
    gloss: [
      { de: "a problem with", tr: "sorun" },
      { de: "exchange it for", tr: "ile değiştirmek" },
      { de: "much better", tr: "çok daha iyi" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bunda bir sorun var.",
        answer: "There's a problem with this.",
        alternatives: ["There is a problem with this."],
        hint: "„problem“ kendi edatını taşıyor: with.",
      },
      {
        kind: "build",
        tr: "Onu daha büyük bir bedenle değiştirebilir miyim?",
        answer: "Can I exchange it for a bigger size?",
        hint: "„exchange“in edatı „for“: neyle değişeceğin ondan sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Para iadesi alabilir miyim, lütfen?",
        answer: "Can I get a refund, please?",
        hint: "„get“ burada „almak“ demek; „please“ en sonda.",
      },
      {
        kind: "build",
        tr: "İlk günümde çok tedirgindim.",
        answer: "I was very nervous on my first day.",
        hint: "Belirli ve kapanmış bir gün: simple past. Gün „on“ ile.",
      },
      {
        kind: "build",
        tr: "Günün sonunda çok daha iyi hissettim.",
        answer: "At the end of the day I felt much better.",
        hint: "Karşılaştırmayı „much“ güçlendiriyor; „very better“ olmaz.",
      },
    ],
  },
];
