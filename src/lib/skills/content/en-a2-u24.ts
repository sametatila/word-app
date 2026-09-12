import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 24 — "Oturma izni, kayıp bildirimi, kütüphane, ulaşım kartı".
 *
 * Dört ders: Residence permit · Reporting a loss · At the library ·
 * Transport card.
 *
 *   Kelime: permit, apply, document, valid, renew, exception, require,
 *           proper, wallet, police, steal, report, describe, police station,
 *           thief, description, borrow, member, return, fine, quiet,
 *           dictionary, notebook, silent, card, top up, machine, subway,
 *           tram, timetable.
 *   Kalıp:  I want to apply for a residence permit. ·
 *           My passport is valid until 2030. ·
 *           I have already filled in the form. · I lost my wallet. ·
 *           Someone stole my phone. · It happened at about six o'clock. ·
 *           I'd like to borrow this book. ·
 *           You have to be quiet. / You can't eat here. ·
 *           I haven't returned it yet. ·
 *           Where can I buy a transport card? ·
 *           First put the card in, then press the green button. ·
 *           You have to top up the card.
 *
 * Ünitenin tek öğretme noktası İNGİLİZCENİN ÖZNE ISRARI: „Someone stole
 * my phone.“ Türkçe burada edilgen kuruyor ("telefonum çalındı") ve fail
 * hiç görünmüyor; İngilizce ise bilinmeyen faile bile bir ad veriyor.
 * Yanında „I lost my wallet“ duruyor ve ikisi arasındaki fark tam olarak
 * kimin yaptığı: birinde ben, ötekinde başkası. Karakolda bu ayrım
 * raporun türünü değiştiriyor, o yüzden içerik farkı olayın kendisine
 * bağlıyor.
 */
export const enA2U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u24-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 24,
    title: "Reporting a loss",
    genre: "dialogue",
    intro: "Karakolda bildirim. Kaybolmuş mu, çalınmış mı?",
    gloss: [
      { de: "gone", tr: "yok olmuş" },
      { de: "a broken button", tr: "kırık düğme" },
      { de: "at about", tr: "civarında" },
      { de: "stood", tr: "durdu" },
    ],
    minutes: 5,
    text:
      "Police: Good afternoon. What happened?\n" +
      "Ela: I lost my wallet. Or somebody stole it — I don't know.\n" +
      "Police: Where were you?\n" +
      "Ela: On the tram, line two, between the station and the market.\n" +
      "Police: When?\n" +
      "Ela: It happened at about six o'clock. I paid at the market at half past five and at six the wallet was gone.\n" +
      "Police: What was in it?\n" +
      "Ela: My ID card, a transport card, twenty euros and a photo.\n" +
      "Police: Can you describe the wallet?\n" +
      "Ela: Brown, small, with a broken button.\n" +
      "Police: And the tram was full?\n" +
      "Ela: Very full. Somebody stood very close for two stops.\n" +
      "Police: Then it is not lost. Somebody stole it. That is a different report.\n" +
      "Ela: Does that change something?\n" +
      "Police: For the insurance, yes. And for us: three today on line two.",
    questions: [
      {
        text: "When did it happen?",
        options: ["at about six o'clock", "at half past five", "at two"],
        answer: 0,
        explain: "„It happened at about six o'clock.“ — beş buçukta hâlâ ödeme yapılmıştı.",
      },
      {
        text: "Why is it not „lost“?",
        options: ["somebody stood very close", "the tram was quiet", "the wallet was old"],
        answer: 0,
        explain: "„Somebody stood very close for two stops. — Then it is not lost. Somebody stole it.“",
      },
      {
        kind: "truefalse",
        text: "There was an ID card and twenty euros in the wallet.",
        options: ["True", "False"],
        answer: 0,
        explain: "„My ID card, a transport card, twenty euros and a photo.“",
      },
      {
        kind: "gapfill",
        text: "It happened on tram line ___.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„On the tram, line two, between the station and the market.“",
      },
      {
        kind: "short_answer",
        text: "Why is the difference important?",
        options: [],
        answer: 0,
        accept: ["for the insurance", "the insurance"],
        explain: "„Does that change something? — For the insurance, yes.“",
      },
    ],
  },
  {
    id: "en-a2-u24-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 24,
    title: "At the library",
    genre: "info",
    intro: "Kütüphane kuralları. Ne serbest, ne değil?",
    gloss: [
      { de: "membership", tr: "üyelik" },
      { de: "at most", tr: "en çok" },
      { de: "downstairs", tr: "alt katta" },
      { de: "inside", tr: "içeri" },
    ],
    minutes: 6,
    text:
      "Rules at the desk\n" +
      "You can borrow four books for three weeks. Members borrow eight. Membership is free for people under eighteen and for students.\n" +
      "You have to be quiet in the reading room. You can't eat here — water is fine, coffee is not. The machine downstairs is for that.\n" +
      "If you haven't returned a book after three weeks, you pay a fine of twenty euros at most. Somebody once paid twenty euros for a dictionary they lost in the kitchen at home.\n" +
      "You can take a notebook and a pen inside, but not a bag. The shelf at the entrance is free.\n" +
      "The silent room on the second floor is really silent. No talking, no calls, no keyboards. Twelve seats, and they are full by nine in the morning.\n" +
      "Renew online. Nobody wants to come here to say: three more weeks, please.",
    questions: [
      {
        text: "How many books can a member borrow?",
        options: ["eight", "four", "twelve"],
        answer: 0,
        explain: "„You can borrow four books for three weeks. Members borrow eight.“",
      },
      {
        text: "What can you take into the reading room?",
        options: ["a notebook and a pen", "a bag", "coffee"],
        answer: 0,
        explain: "„You can take a notebook and a pen inside, but not a bag.“",
      },
      {
        kind: "truefalse",
        text: "You can drink coffee in the reading room.",
        options: ["True", "False"],
        answer: 1,
        explain: "„water is fine, coffee is not. The machine downstairs is for that.“",
      },
      {
        kind: "gapfill",
        text: "The silent room has ___ seats.",
        options: [],
        answer: 0,
        accept: ["twelve", "12"],
        explain: "„Twelve seats, and they are full by nine in the morning.“",
      },
      {
        kind: "order",
        text: "Kuralların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "You can borrow four books for three weeks.",
          "You have to be quiet in the reading room.",
          "You pay a fine after three weeks.",
          "The silent room is on the second floor.",
        ],
        explain: "Önce ödünç alma, sonra davranış, sonra ceza, en son sessiz oda.",
      },
      {
        kind: "short_answer",
        text: "How can you renew?",
        options: [],
        answer: 0,
        accept: ["online", "on the internet"],
        explain: "„Renew online. Nobody wants to come here to say: three more weeks, please.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u24-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 24,
    title: "Residence permit",
    genre: "dialogue",
    intro: "İzin yenileme. Hangi belge gerekli, hangisi değil?",
    gloss: [
      { de: "university", tr: "üniversite" },
      { de: "the address paper", tr: "adres belgesi" },
      { de: "come back", tr: "geri gelmek" },
      { de: "city hall", tr: "belediye" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Can", text: "Good morning. I want to apply for a residence permit." },
      { speaker: "Office", text: "First time or renew?" },
      { speaker: "Can", text: "Renew. The old one is valid until November." },
      { speaker: "Office", text: "Good — you are early. Most people come in the last week." },
      { speaker: "Can", text: "I have already filled in the form. Here." },
      { speaker: "Office", text: "Passport?" },
      { speaker: "Can", text: "Valid until 2030." },
      { speaker: "Office", text: "Work contract?" },
      { speaker: "Can", text: "Here. And the letter from the company." },
      { speaker: "Office", text: "We don't require the letter this year. But the address paper, yes. Do you have it?" },
      { speaker: "Can", text: "No. Where do I get it?" },
      { speaker: "Office", text: "At the city hall, counter four. Ten minutes if you go now — they close at two." },
      { speaker: "Can", text: "And then I come back?" },
      { speaker: "Office", text: "Then you come back. There is one exception: with a document from the university you don't need it. But you are not a student." },
      { speaker: "Can", text: "I am not. I go now." },
    ],
    questions: [
      {
        text: "When is the old permit valid until?",
        options: ["November", "2030", "two o'clock"],
        answer: 0,
        explain: "„Renew. The old one is valid until November.“ — 2030 pasaportun tarihi.",
      },
      {
        text: "What does Can still need?",
        options: ["the address paper", "the letter from the company", "a passport"],
        answer: 0,
        explain: "„We don't require the letter this year. But the address paper, yes.“",
      },
      {
        kind: "truefalse",
        text: "The letter from the company is not required this year.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We don't require the letter this year.“",
      },
      {
        kind: "gapfill",
        text: "The city hall closes at ___.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„Ten minutes if you go now — they close at two.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I want to apply for a residence permit.", "I want to apply for a residence permit"],
        explain: "„apply“ın edatı „for“; başvurulan şey ondan sonra geliyor.",
      },
      {
        kind: "short_answer",
        text: "Who does not need the address paper?",
        options: [],
        answer: 0,
        accept: ["a student", "students", "somebody with a university document"],
        explain: "„…with a document from the university you don't need it.“",
      },
    ],
  },
  {
    id: "en-a2-u24-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 24,
    title: "Transport card",
    genre: "dialogue",
    intro: "Kart ve makine. Hangi düğme, hangi para?",
    gloss: [
      { de: "coins", tr: "bozuk para" },
      { de: "the third car", tr: "üçüncü vagon" },
      { de: "eats it", tr: "yutuyor" },
      { de: "the fourth", tr: "dördüncü" },
      { de: "empty", tr: "boş" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nil", text: "Where can I buy a transport card?" },
      { speaker: "Man", text: "At the machine, over there. The green one, not the blue." },
      { speaker: "Nil", text: "What is the blue one?" },
      { speaker: "Man", text: "Tickets for one trip. The card is cheaper after the fourth trip." },
      { speaker: "Nil", text: "Good. And how does it work?" },
      { speaker: "Man", text: "First put the card in, then press the green button. Then the money." },
      { speaker: "Nil", text: "Coins only?" },
      { speaker: "Man", text: "Coins and cards. Not paper money — the machine eats it and says nothing." },
      { speaker: "Nil", text: "Good to know. And in the tram?" },
      { speaker: "Man", text: "You have to top up the card before you get in. In the tram there is nothing." },
      { speaker: "Nil", text: "And if the card is empty?" },
      { speaker: "Man", text: "Then it is a fine. Sixty euros. Two of them come together and they are always in the third car." },
      { speaker: "Nil", text: "Why the third?" },
      { speaker: "Man", text: "Because everybody with an empty card walks to the third car." },
    ],
    questions: [
      {
        text: "Which machine sells the card?",
        options: ["the green one", "the blue one", "the one in the tram"],
        answer: 0,
        explain: "„At the machine, over there. The green one, not the blue.“",
      },
      {
        text: "What does the machine not take?",
        options: ["paper money", "coins", "cards"],
        answer: 0,
        explain: "„Coins and cards. Not paper money — the machine eats it and says nothing.“",
      },
      {
        kind: "truefalse",
        text: "You can top up the card in the tram.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You have to top up the card before you get in. In the tram there is nothing.“",
      },
      {
        kind: "gapfill",
        text: "The fine is ___ euros.",
        options: [],
        answer: 0,
        accept: ["sixty", "60"],
        explain: "„Then it is a fine. Sixty euros.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Where can I buy a transport card?", "Where can I buy a transport card"],
        explain: "Yer sorusu „where“ ile; „can“ sonrası fiil eksiz.",
      },
      {
        kind: "short_answer",
        text: "Where are they always?",
        options: [],
        answer: 0,
        accept: ["in the third car", "the third car"],
        explain: "„…they are always in the third car.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u24-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 24,
    title: "I lost my wallet",
    genre: "formal",
    intro: "Kayıp mı, hırsızlık mı? Fark öznede.",
    gloss: [
      { de: "lost", tr: "kaybettim" },
      { de: "stole", tr: "çaldı" },
      { de: "apply for", tr: "başvurmak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Cüzdanımı kaybettim.",
        answer: "I lost my wallet.",
        hint: "Kaybeden ben: özne „I“, fiil „lost“. „lose“un geçmişi.",
      },
      {
        kind: "build",
        tr: "Telefonumu biri çaldı.",
        answer: "Someone stole my phone.",
        alternatives: ["Somebody stole my phone."],
        hint: "İngilizce burada edilgen yerine „someone“ koyuyor; Türkçe \"çalındı\" der ve faili hiç anmaz.",
      },
      {
        kind: "build",
        tr: "Saat altı civarında oldu.",
        answer: "It happened at about six o'clock.",
        hint: "„at about“ yaklaşık saat demek; „about“ tek başına „hakkında“ olurdu.",
      },
      {
        kind: "build",
        tr: "Oturma izni için başvurmak istiyorum.",
        answer: "I want to apply for a residence permit.",
        hint: "„apply“ kendi edatını taşıyor: „for“.",
      },
      {
        kind: "form",
        prompt: "Kayıp bildirimini doldur.",
        facts: "Kayıp cüzdan; iki numaralı tramvay; saat altı civarı; içinde kimlik ve yirmi euro.",
        fields: [
          { label: "What", answer: "a wallet", accept: ["wallet"] },
          { label: "Where", answer: "tram line two", accept: ["on the tram", "line two"] },
          { label: "When", answer: "at about six", accept: ["six o'clock", "at six"] },
          { label: "Inside", answer: "an ID card and twenty euros", accept: ["ID card", "twenty euros"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u24-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 24,
    title: "You have to be quiet",
    genre: "info",
    intro: "Kütüphane ve kart. Zorunluluk, izin ve bitmemiş iş.",
    gloss: [
      { de: "borrow", tr: "ödünç almak" },
      { de: "returned", tr: "iade ettim" },
      { de: "top up", tr: "yüklemek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bu kitabı ödünç almak istiyorum.",
        answer: "I'd like to borrow this book.",
        alternatives: ["I would like to borrow this book."],
        hint: "„borrow“ ödünç ALMAK; ödünç vermek „lend“ olurdu.",
      },
      {
        kind: "build",
        tr: "Sessiz olmak zorundasın.",
        answer: "You have to be quiet.",
        hint: "Kuraldan gelen zorunluluk „have to“ ile; „be“ eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "Burada yiyemezsin.",
        answer: "You can't eat here.",
        alternatives: ["You cannot eat here."],
        hint: "„can't“ burada beceri değil, izin yok demek.",
      },
      {
        kind: "build",
        tr: "Onu henüz iade etmedim.",
        answer: "I haven't returned it yet.",
        alternatives: ["I have not returned it yet."],
        hint: "„yet“ olumsuzda ve en sonda; iş bitmedi ama bitecek.",
      },
      {
        kind: "build",
        tr: "Kartı yüklemen gerekiyor.",
        answer: "You have to top up the card.",
        hint: "„top up“ ayrılabiliyor: „top the card up“ da doğru.",
      },
    ],
  },
];
