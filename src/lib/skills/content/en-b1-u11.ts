import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 11 — "Kayıt, form, banka hesabı, büyükelçilik".
 *
 * Dört ders: Registering here · Filling in the form · Opening an account ·
 * At the embassy.
 *
 *   Kelime: register, resident, council, proof, stamp, process, issue,
 *           application, form, fill, signature, tick, section, detail,
 *           print, surname, account, transfer, balance, branch, card, fee,
 *           statement, savings, visa, permit, embassy, residence, expire,
 *           extend, passport, applicant.
 *   Kalıp:  The form is stamped at the desk. ·
 *           My application was processed last week. ·
 *           When is the card issued? · You must fill in every section. ·
 *           You don't have to give a phone number. ·
 *           You should print your surname. ·
 *           I am opening an account on Friday. ·
 *           I am going to move my savings. ·
 *           I will check the balance tonight. ·
 *           She said that the visa had expired. ·
 *           He told me to bring my passport. ·
 *           They asked if I had a permit.
 *
 * Ünitenin tek öğretme noktası KURUM DİLİNİN EDİLGENİ ZAMANSIZDIR.
 * „The form is stamped at the desk“ bir olayı değil, İŞLEYİŞİ anlatıyor:
 * her zaman böyle olur. Ünite 2'nin edilgeni tek bir olaya bakıyordu,
 * ünite 7'ninki haberin zamanına; burada zaman hiç yok. Aynı biçim üçüncü
 * kez başka bir iş görüyor ve hangi işi gördüğünü yalnız bağlam söylüyor.
 */
export const enB1U11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u11-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 11,
    title: "Registering here",
    genre: "guide",
    intro: "Kayıt işleminin dili. Cümleler neden hep edilgen?",
    gloss: [
      { de: "in person", tr: "bizzat" },
      { de: "whoever", tr: "her kimse" },
      { de: "registration", tr: "kayıt" },
      { de: "sentence", tr: "cümle" },
      { de: "event", tr: "olay" },
      { de: "the passive", tr: "edilgen" },
      { de: "instead", tr: "onun yerine" },
    ],
    minutes: 7,
    text:
      "How registration works here, in the order it happens.\n" +
      "The form is stamped at the desk. Not by a person you can name — by whoever is there. That sentence has no time in it and that is the point: this is how it always works, on a Monday in March and on a Friday in August.\n" +
      "My application was processed last week. Here there is a time, so this is one event, mine, and it is over. Two sentences, same form, different jobs.\n" +
      "When is the card issued? Ten working days after the stamp, and the question is asked in the passive because nobody in the room issues it. It comes from another office in another building.\n" +
      "What you need: proof of address, the passport, and the old card if you have one. Residents who have lived here for less than three months bring the lease instead.\n" +
      "What nobody tells you: the desk is quiet between two and three, because the numbers are given out in the morning and most people come back after lunch.\n" +
      "And the part that is not in any guide: come in person on the first visit. Everything after that can be done by post, but the first stamp is given to a face.",
    questions: [
      {
        text: "What does „The form is stamped at the desk“ tell you?",
        options: ["this is how it always works", "it happened last week", "a named person did it"],
        answer: 0,
        explain: "„That sentence has no time in it and that is the point: this is how it always works…“",
      },
      {
        text: "Why is the question about the card in the passive?",
        options: ["nobody in the room issues it", "it is more polite", "the card is old"],
        answer: 0,
        explain: "„the question is asked in the passive because nobody in the room issues it.“",
      },
      {
        kind: "truefalse",
        text: "The desk is quiet between two and three.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the desk is quiet between two and three…“",
      },
      {
        kind: "gapfill",
        text: "The card is issued ___ working days after the stamp.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Ten working days after the stamp…“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The form is stamped at the desk.",
          "My application was processed last week.",
          "When is the card issued?",
          "Come in person on the first visit.",
        ],
        explain: "İşleyiş, tek olay, soru, en sonda öğüt.",
      },
      {
        kind: "short_answer",
        text: "What do new residents bring instead of the old card?",
        options: [],
        answer: 0,
        accept: ["the lease", "their lease"],
        explain: "„Residents who have lived here for less than three months bring the lease instead.“",
      },
    ],
  },
  {
    id: "en-b1-u11-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 11,
    title: "Filling in the form",
    genre: "info",
    intro: "Form doldurma kuralları. Hangisi zorunlu, hangisi değil?",
    gloss: [
      { de: "capital letters", tr: "büyük harf" },
      { de: "box", tr: "kutucuk" },
      { de: "scanner", tr: "tarayıcı" },
      { de: "per box", tr: "kutucuk başına" },
      { de: "patience", tr: "sabır" },
      { de: "optional", tr: "isteğe bağlı" },
      { de: "anyway", tr: "yine de" },
      { de: "exists", tr: "var" },
      { de: "matters", tr: "önemli" },
    ],
    minutes: 7,
    text:
      "Six lines about a form that takes four minutes and is sent back twice a week.\n" +
      "You must fill in every section. An empty section is not read as „nothing to say“; it is read as „not finished“, and the form goes back in the post.\n" +
      "You should print your surname. Capital letters, one letter per box. The form is read by a scanner first and by a person second, and the scanner has no patience.\n" +
      "You don't have to give a phone number. That box has a small word next to it and the small word is „optional“. Three people in four fill it in anyway.\n" +
      "Tick one box in section four, not two. If both are true for you, tick the first and write the detail in section seven, which exists for exactly this.\n" +
      "The signature goes under the date, not next to it. This is the only line where the order matters, and it is the line most often wrong.\n" +
      "One last detail: use a black pen. Blue is accepted, but blue is copied badly and a bad copy is a second appointment.",
    questions: [
      {
        text: "What happens to a form with an empty section?",
        options: ["it goes back in the post", "it is read by a person", "it is copied"],
        answer: 0,
        explain: "„it is read as „not finished“, and the form goes back in the post.“",
      },
      {
        text: "Why should you print the surname?",
        options: ["a scanner reads it first", "it looks better", "the office asks for it"],
        answer: 0,
        explain: "„The form is read by a scanner first and by a person second, and the scanner has no patience.“",
      },
      {
        kind: "truefalse",
        text: "You must give a phone number.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You don't have to give a phone number. … the small word is „optional“.“",
      },
      {
        kind: "gapfill",
        text: "The signature goes ___ the date.",
        options: [],
        answer: 0,
        accept: ["under"],
        explain: "„The signature goes under the date, not next to it.“",
      },
      {
        kind: "short_answer",
        text: "What should you write in section seven?",
        options: [],
        answer: 0,
        accept: ["the detail", "the second case", "the extra detail"],
        explain: "„tick the first and write the detail in section seven, which exists for exactly this.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u11-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 11,
    title: "At the embassy",
    genre: "dialogue",
    intro: "Vize görüşmesi. Aktarılan cümlelerde zaman nereye kayıyor?",
    gloss: [
      { de: "applicant", tr: "başvuran" },
      { de: "the queue", tr: "kuyruk" },
      { de: "in advance", tr: "önceden" },
      { de: "clear", tr: "anlaşılır" },
      { de: "unkind", tr: "kaba" },
      { de: "extension", tr: "uzatma" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Can", text: "I went to the embassy on Monday and came back with nothing." },
      { speaker: "Nil", text: "What happened?" },
      { speaker: "Can", text: "She said that the visa had expired. Not the permit — the visa, which I thought was the same thing." },
      { speaker: "Nil", text: "They are not the same thing." },
      { speaker: "Can", text: "I know that now. He told me to bring my passport and the old permit, and I had brought only the passport." },
      { speaker: "Nil", text: "So you go back." },
      { speaker: "Can", text: "Thursday. And they asked if I had a permit, which I do, in a folder at home." },
      { speaker: "Nil", text: "Did you take a number?" },
      { speaker: "Can", text: "There is no number. Every applicant books a slot in advance and the queue is what happens when three of them are late." },
      { speaker: "Nil", text: "How long did you wait?" },
      { speaker: "Can", text: "Fifty minutes for four minutes at the desk. The four minutes were fine. She was fast, clear and not unkind." },
      { speaker: "Nil", text: "Can you extend it there?" },
      { speaker: "Can", text: "The extension is issued in the other building, which is open until two. That is the sentence nobody says on the phone." },
      { speaker: "Nil", text: "Then go at nine on Thursday." },
      { speaker: "Can", text: "Half past eight. The door opens at nine and the first three people are inside by five past." },
    ],
    questions: [
      {
        text: "What had expired?",
        options: ["the visa", "the permit", "the passport"],
        answer: 0,
        explain: "„She said that the visa had expired. Not the permit — the visa…“",
      },
      {
        text: "What did Can forget to bring?",
        options: ["the old permit", "the passport", "the folder"],
        answer: 0,
        explain: "„He told me to bring my passport and the old permit, and I had brought only the passport.“",
      },
      {
        kind: "truefalse",
        text: "Every applicant books a slot in advance.",
        options: ["True", "False"],
        answer: 0,
        explain: "„There is no number. Every applicant books a slot in advance…“",
      },
      {
        kind: "gapfill",
        text: "Can waited ___ minutes.",
        options: [],
        answer: 0,
        accept: ["fifty", "50"],
        explain: "„Fifty minutes for four minutes at the desk.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["She said that the visa had expired.", "She said that the visa had expired"],
        explain: "Aktarılınca zaman geri kayıyor: „has expired“ → „had expired“.",
      },
      {
        kind: "short_answer",
        text: "Where is the extension issued?",
        options: [],
        answer: 0,
        accept: ["in the other building", "another building", "the other building"],
        explain: "„The extension is issued in the other building, which is open until two.“",
      },
    ],
  },
  {
    id: "en-b1-u11-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 11,
    title: "Opening an account",
    genre: "dialogue",
    intro: "Banka hesabı açılıyor. Hangi ücret var, hangisi yok?",
    gloss: [
      { de: "branch", tr: "şube" },
      { de: "monthly fee", tr: "aylık ücret" },
      { de: "small print", tr: "ince yazı" },
      { de: "above", tr: "üstünde" },
      { de: "strange", tr: "tuhaf" },
      { de: "anyway", tr: "yine de" },
      { de: "sentence", tr: "cümle" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Sena", text: "I am opening an account on Friday. Anything I should know?" },
      { speaker: "Mert", text: "Three questions and you will know everything." },
      { speaker: "Sena", text: "Go on." },
      { speaker: "Mert", text: "One: is there a monthly fee, and does it stop if the money stays above a number?" },
      { speaker: "Sena", text: "And two?" },
      { speaker: "Mert", text: "Two: what does a transfer to another country cost? Not the normal one — that one." },
      { speaker: "Sena", text: "Three?" },
      { speaker: "Mert", text: "Three: how do I close it? If the answer is „come to the branch“, ask which branch and write the address down." },
      { speaker: "Sena", text: "That is a strange question to ask on the first day." },
      { speaker: "Mert", text: "It is the only question they never prepare for. The answer tells you how the rest will go." },
      { speaker: "Sena", text: "I am going to move my savings too." },
      { speaker: "Mert", text: "Not on the first day. Open it, let one payment go through, and check the statement." },
      { speaker: "Sena", text: "I will check the balance tonight anyway. I check it every night." },
      { speaker: "Mert", text: "Then you will see the fee before I finish this sentence. It is in the small print and it is always on day two." },
    ],
    questions: [
      {
        text: "What is Mert's third question?",
        options: ["how do I close it", "what is the balance", "where is the branch"],
        answer: 0,
        explain: "„Three: how do I close it?“",
      },
      {
        text: "What does Mert say about moving the savings?",
        options: ["not on the first day", "do it at once", "move half of it"],
        answer: 0,
        explain: "„Not on the first day. Open it, let one payment go through, and check the statement.“",
      },
      {
        kind: "truefalse",
        text: "Mert thinks the closing question is a normal one for the bank.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is the only question they never prepare for.“",
      },
      {
        kind: "gapfill",
        text: "Mert asks if the fee stops above a ___.",
        options: [],
        answer: 0,
        accept: ["number"],
        explain: "„is there a monthly fee, and does it stop if the money stays above a number?“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I am opening an account on Friday.", "I am opening an account on Friday"],
        explain: "Ayarlanmış gelecek: gün belli ve banka biliyor.",
      },
      {
        kind: "short_answer",
        text: "When does the fee usually come?",
        options: [],
        answer: 0,
        accept: ["on day two", "day two", "the second day"],
        explain: "„It is in the small print and it is always on day two.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u11-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 11,
    title: "The form is stamped at the desk",
    genre: "info",
    intro: "Aynı edilgen, üç ayrı iş. Hangisinde zaman var, hangisinde yok?",
    gloss: [
      { de: "is stamped", tr: "kaşeleniyor" },
      { de: "was processed", tr: "işleme alındı" },
      { de: "is issued", tr: "düzenleniyor" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Form gişede kaşeleniyor.",
        answer: "The form is stamped at the desk.",
        hint: "Zaman yok: bu bir olay değil, işleyiş. Her zaman böyle olur.",
      },
      {
        kind: "build",
        tr: "Başvurum geçen hafta işleme alındı.",
        answer: "My application was processed last week.",
        hint: "Zaman var: tek bir olay ve bitti. Aynı biçim, başka iş.",
      },
      {
        kind: "build",
        tr: "Kart ne zaman düzenleniyor?",
        answer: "When is the card issued?",
        hint: "Edilgen soru: düzenleyen kimse odada değil.",
      },
      {
        kind: "build",
        tr: "Her bölümü doldurmak zorundasın.",
        answer: "You must fill in every section.",
        hint: "„must“ kuralın kendisinden; boş bölüm „bitmedi“ diye okunuyor.",
      },
      {
        kind: "form",
        prompt: "Kayıt kartını doldur.",
        facts: "Form gişede kaşeleniyor; kart on iş günü sonra; adres kanıtı ve pasaport gerekiyor; ilk gelişte bizzat.",
        fields: [
          { label: "Stamp", answer: "at the desk", accept: ["the desk"] },
          { label: "Card", answer: "ten working days", accept: ["10 days"] },
          { label: "Bring", answer: "proof of address and the passport", accept: ["proof and passport"] },
          { label: "First visit", answer: "in person", accept: ["come in person"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u11-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 11,
    title: "She said that the visa had expired",
    genre: "formal",
    intro: "Büyükelçilik ve banka cümleleri. Aktarmada zaman nereye kayıyor?",
    gloss: [
      { de: "had expired", tr: "süresi dolmuş" },
      { de: "a permit", tr: "izin belgesi" },
      { de: "the balance", tr: "bakiye" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Vizenin süresinin dolduğunu söyledi.",
        answer: "She said that the visa had expired.",
        alternatives: ["She said the visa had expired."],
        hint: "Aktarılınca „has expired“ bir basamak geriye kayıp „had expired“ oluyor.",
      },
      {
        kind: "build",
        tr: "Bana pasaportumu getirmemi söyledi.",
        answer: "He told me to bring my passport.",
        hint: "„tell“ kişiyi doğrudan alıyor ve sonrası mastar.",
      },
      {
        kind: "build",
        tr: "İzin belgem olup olmadığını sordular.",
        answer: "They asked if I had a permit.",
        hint: "Evet-hayır sorusu „if“ ile; „have“ da bir basamak geriye kayıyor.",
      },
      {
        kind: "build",
        tr: "Telefon numarası vermen gerekmiyor.",
        answer: "You don't have to give a phone number.",
        alternatives: ["You do not have to give a phone number."],
        hint: "Yasak değil, gerek yok: formdaki küçük sözcük „optional“.",
      },
      {
        kind: "build",
        tr: "Bakiyeyi bu gece kontrol edeceğim.",
        answer: "I will check the balance tonight.",
        hint: "O anda verilen karar: „will“.",
      },
    ],
  },
];
