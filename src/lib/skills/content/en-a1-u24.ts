import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 24 — "E-posta, internet, postane, geçmişte 'olmak'".
 *
 * Dört ders: A short email · Online and apps · At the post office ·
 * Yesterday I was.
 *
 *   Kelime: email, write, dear, thanks, question, which, or, with,
 *           internet, phone, password, website, use, make, class, it,
 *           letter, stamp, address, package, send, pencil, full, plastic,
 *           yesterday, last week, home, tired, were, he, she, we.
 *   Kalıp:  Dear Anna, · I have a question. · Thank you very much. ·
 *           I use the internet every day. · Do you use this app? ·
 *           She uses this website. · I'd like to send this letter. ·
 *           How much is a stamp? · Can I have two stamps, please? ·
 *           I was at home. · You were tired. ·
 *           Were you at home yesterday?
 *
 * Ünitede GEÇMİŞ ZAMAN ilk kez açılıyor ve bilerek yalnız „be“ fiiliyle:
 * „I was“, „you were“. Öteki fiillerin geçmişi bir sonraki ünitenin işi.
 * Sıra böyle çünkü „be“ tek başına iki biçim taşıyor ve o iki biçim
 * öğrenilmeden „did“ soruları kurulamıyor. Türkçede geçmiş tek ek (-di)
 * ve kişiye göre gövde değişmiyor — burada değişiyor.
 */
export const enA1U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u24-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 24,
    title: "An email to Anna",
    genre: "email",
    intro: "Kısa bir e-posta. Soru ne, sorun ne, geçen hafta ne olmuş?",
    gloss: [
      { de: "important", tr: "önemli" },
      { de: "soon", tr: "yakında" },
      { de: "password", tr: "parola" },
      { de: "know", tr: "bilmek" },
    ],
    minutes: 4,
    text:
      "Dear Anna,\n\n" +
      "Thank you very much for your message. I was at home yesterday and I was happy with your message.\n\n" +
      "I have a question: which website do you use for the course? I know two, but I can't find the class.\n\n" +
      "My password doesn't work either. Can you send me a new one? Or can we speak on the phone?\n\n" +
      "Last week I was very tired. I was sick and the internet was not important.\n\n" +
      "Thank you and see you soon,\nCharlie",
    questions: [
      {
        text: "What is Charlie's question?",
        options: ["which website for the course", "how much a stamp is", "where Anna is"],
        answer: 0,
        explain: "„I have a question: which website do you use for the course?“",
      },
      {
        text: "Where was Charlie yesterday?",
        options: ["at home", "at the course", "on the phone"],
        answer: 0,
        explain: "„I was at home yesterday and I was happy with your message.“",
      },
      {
        kind: "truefalse",
        text: "Charlie's password does not work.",
        options: ["True", "False"],
        answer: 0,
        explain: "„My password doesn't work either.“ — yeni bir tane istiyor.",
      },
      {
        kind: "gapfill",
        text: "Last week Charlie was very ___.",
        options: [],
        answer: 0,
        accept: ["tired"],
        explain: "„Last week I was very tired. I was sick…“",
      },
      {
        kind: "short_answer",
        text: "What does Charlie want from Anna?",
        options: [],
        answer: 0,
        accept: ["a new password", "the website", "a password"],
        explain: "„Can you send me a new one?“ — „one“ burada „password“ yerine geçiyor.",
      },
    ],
  },
  {
    id: "en-a1-u24-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 24,
    title: "A letter to Ireland",
    genre: "dialogue",
    intro: "Postanede mektup ve paket. Hangi fiyat neye ait?",
    gloss: [
      { de: "package", tr: "paket" },
      { de: "stamp", tr: "pul" },
      { de: "Here you are", tr: "buyurun" },
    ],
    minutes: 4,
    text:
      "Lucy: Good morning. I'd like to send this letter to Ireland.\n" +
      "Clerk: Of course. What is in it? Only paper?\n" +
      "Lucy: Only paper and a photo.\n" +
      "Clerk: Then it is two euros.\n" +
      "Lucy: And how much is a stamp for Germany?\n" +
      "Clerk: One euro.\n" +
      "Lucy: I have a package too. How much is that?\n" +
      "Clerk: The package is heavy. Nine euros. Is it full?\n" +
      "Lucy: Yes, full. Books and a plastic box.\n" +
      "Lucy: Can I have two stamps, please? For two letters tomorrow.\n" +
      "Clerk: Here you are. And here is a pencil — you have to write the address.\n" +
      "Lucy: The address of the package is on the paper.\n" +
      "Clerk: Good. Thirteen euros together, please.\n" +
      "Lucy: Here is my card. Thank you!",
    questions: [
      {
        text: "How much is the letter to Ireland?",
        options: ["two euros", "one euro", "nine euros"],
        answer: 0,
        explain: "„Then it is two euros.“ — bir euro pul, dokuz euro paket.",
      },
      {
        text: "What is in the package?",
        options: ["books and a plastic box", "paper and a photo", "two stamps"],
        answer: 0,
        explain: "„Yes, full. Books and a plastic box.“ — kâğıt ve fotoğraf mektupta.",
      },
      {
        kind: "truefalse",
        text: "The package is light.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The package is heavy. Nine euros.“",
      },
      {
        kind: "gapfill",
        text: "Lucy buys two ___.",
        options: [],
        answer: 0,
        accept: ["stamps"],
        explain: "„Can I have two stamps, please? For two letters tomorrow.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I'd like to send this letter to Ireland.",
          "How much is a stamp for Germany?",
          "I have a package too.",
          "Thirteen euros together, please.",
        ],
        explain: "Önce mektup, sonra pul, sonra paket, en son toplam.",
      },
      {
        kind: "short_answer",
        text: "How much is everything together?",
        options: [],
        answer: 0,
        accept: ["thirteen euros", "13 euros", "thirteen"],
        explain: "„Good. Thirteen euros together, please.“ — iki artı dokuz artı iki pul.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u24-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 24,
    title: "A website for class",
    genre: "dialogue",
    intro: "İnternet ve uygulama konuşuluyor. Parola neden sorun?",
    gloss: [
      { de: "own", tr: "kendi" },
      { de: "the same", tr: "aynı" },
      { de: "small", tr: "küçük" },
      { de: "app", tr: "uygulama" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Tyler", text: "Do you use this app?" },
      { speaker: "Katie", text: "Yes, every day. I use the internet for my class." },
      { speaker: "Tyler", text: "Which website?" },
      { speaker: "Katie", text: "It is called Green School. My sister uses it too — she makes a video every week." },
      { speaker: "Tyler", text: "And the password?" },
      { speaker: "Katie", text: "You make your own password. It has to be long." },
      { speaker: "Tyler", text: "My password is my name. Is that bad?" },
      { speaker: "Katie", text: "Very bad! You should make a new one today." },
      { speaker: "Tyler", text: "OK. And the phone app?" },
      { speaker: "Katie", text: "The app is the same website, only smaller. I use it on the bus." },
      { speaker: "Tyler", text: "Then I'm going to try it tomorrow." },
      { speaker: "Katie", text: "And don't write your password on paper!" },
    ],
    questions: [
      {
        text: "What does Katie use the internet for?",
        options: ["her class", "a video", "the bus"],
        answer: 0,
        explain: "„I use the internet for my class.“ — video kız kardeşinin işi.",
      },
      {
        text: "What is bad?",
        options: ["a password with your name", "a long password", "the app"],
        answer: 0,
        explain: "„My password is my name. Is that bad? — Very bad!“",
      },
      {
        kind: "truefalse",
        text: "The app is not the same website.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The app is the same website, only smaller.“ — daha küçük ama aynı site.",
      },
      {
        kind: "gapfill",
        text: "The website is called ___ School.",
        options: [],
        answer: 0,
        accept: ["Green"],
        explain: "„It is called Green School.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I use the internet for my class.", "I use the internet for my class"],
        explain: "„I use the internet for my class.“ — „the internet“ hep „the“ ile geliyor.",
      },
      {
        kind: "short_answer",
        text: "Who makes a video every week?",
        options: [],
        answer: 0,
        accept: ["Katie's sister", "her sister", "the sister"],
        explain: "„My sister uses it too — she makes a video every week.“",
      },
    ],
  },
  {
    id: "en-a1-u24-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 24,
    title: "Charlie in Ireland",
    genre: "monologue",
    intro: "Geçmişte „olmak“ fiili. „was“ ve „were“ art arda geçiyor.",
    gloss: [
      { de: "was", tr: "idi" },
      { de: "were", tr: "idiler" },
      { de: "last week", tr: "geçen hafta" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Charlie", text: "Yesterday I was at home all day. I was tired and I was a little sick." },
      { speaker: "Charlie", text: "Last week I was in Ireland. The weather was cold but the people were friendly." },
      { speaker: "Charlie", text: "We were in a small town near the sea. My sister was with me." },
      { speaker: "Charlie", text: "In the evening we were in a café. The soup was good and the bread was warm." },
      { speaker: "Charlie", text: "Were you at home yesterday too? Or were you at work?" },
      { speaker: "Charlie", text: "My friends were at the lake. They were happy — the weather was sunny there!" },
    ],
    questions: [
      {
        text: "Where was Charlie yesterday?",
        options: ["at home", "in Ireland", "at the lake"],
        answer: 0,
        explain: "„Yesterday I was at home all day.“ — İrlanda geçen haftaydı.",
      },
      {
        text: "How was the weather in Ireland?",
        options: ["cold", "sunny", "warm"],
        answer: 0,
        explain: "„The weather was cold but the people were friendly.“ — güneşli olan göl.",
      },
      {
        kind: "truefalse",
        text: "Charlie's sister was with him.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We were in a small town near the sea. My sister was with me.“",
      },
      {
        kind: "gapfill",
        text: "The people in Ireland were ___.",
        options: [],
        answer: 0,
        accept: ["friendly"],
        explain: "„…but the people were friendly.“ — çoğul özne „were“ istiyor.",
      },
      {
        kind: "order",
        text: "Charlie'nin anlattığı sıra: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Yesterday I was at home all day.",
          "Last week I was in Ireland.",
          "In the evening we were in a café.",
          "My friends were at the lake.",
        ],
        explain: "Önce dün, sonra geçen hafta, sonra o haftanın akşamı, en son arkadaşları.",
      },
      {
        kind: "short_answer",
        text: "Where were Charlie's friends?",
        options: [],
        answer: 0,
        accept: ["at the lake", "the lake", "lake"],
        explain: "„My friends were at the lake.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u24-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 24,
    title: "Writing an email",
    genre: "email",
    intro: "E-posta kalıplarını yaz. Sonunda e-posta formunu doldur.",
    gloss: [
      { de: "Dear Anna,", tr: "sevgili Anna" },
      { de: "I have a question.", tr: "bir sorum var" },
      { de: "Thank you very much.", tr: "çok teşekkür ederim" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Sevgili Anna,",
        answer: "Dear Anna,",
        hint: "Resmî e-posta çoğu zaman „Dear“ ile başlar ve sonrasına virgül gelir.",
      },
      {
        kind: "build",
        tr: "Bir sorum var.",
        answer: "I have a question.",
        hint: "Sahiplik „have“ ile; „question“ sayılabilir, önünde „a“ var.",
      },
      {
        kind: "build",
        tr: "Çok teşekkür ederim.",
        answer: "Thank you very much.",
        hint: "„very much“ cümlenin sonunda; „thank you“ nesnesini doğrudan alıyor.",
      },
      {
        kind: "build",
        tr: "İnterneti her gün kullanıyorum.",
        answer: "I use the internet every day.",
        alternatives: ["Every day I use the internet."],
        hint: "„the internet“ hep „the“ ile geliyor, tek bir şey gibi.",
      },
      {
        kind: "form",
        prompt: "E-posta formunu doldur.",
        facts: "Anna'ya; soru: hangi web sitesi; parola çalışmıyor; sonda teşekkür.",
        fields: [
          { label: "To", answer: "Anna" },
          { label: "Question", answer: "which website", accept: ["the website"] },
          { label: "Problem", answer: "password", accept: ["the password"] },
          { label: "End", answer: "thank you", accept: ["thanks"] },
        ],
      },
    ],
  },
  {
    id: "en-a1-u24-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 24,
    title: "Stamps and letters",
    genre: "personal",
    intro: "Geçmişte „olmak“ fiilini yaz. Tek fiilin iki biçimi var: was ve were.",
    gloss: [
      { de: "I was at home.", tr: "evdeydim" },
      { de: "You were tired.", tr: "yorgundun" },
      { de: "Were you at home yesterday?", tr: "dün evde miydin" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Evdeydim.",
        answer: "I was at home.",
        hint: "„I“ ile „was“ geliyor. Türkçede gövde değişmezdi, burada değişiyor.",
      },
      {
        kind: "build",
        tr: "Yorgundun.",
        answer: "You were tired.",
        hint: "„you“ ile hep „were“, tek kişi için bile.",
      },
      {
        kind: "build",
        tr: "Dün evde miydin?",
        answer: "Were you at home yesterday?",
        hint: "Soruda „were“ öne geçiyor; „did“ hiç girmiyor, çünkü fiil „be“.",
      },
      {
        kind: "build",
        tr: "Bu mektubu göndermek istiyorum.",
        answer: "I'd like to send this letter.",
        alternatives: ["I would like to send this letter."],
        hint: "„would like“ sonrası „to“ + fiil; postanede en kibar istek biçimi.",
      },
      {
        kind: "build",
        tr: "İki pul alabilir miyim, lütfen?",
        answer: "Can I have two stamps, please?",
        hint: "İki tane olduğu için çoğul: stamps. „please“ sonda ve virgülle.",
      },
    ],
  },
];
