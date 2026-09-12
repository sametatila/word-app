import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 23 — "Teknoloji görüşleri, nasıl yapılır, belediye, form".
 *
 * Dört ders: What I think about technology · Explaining how to do it ·
 * At the city hall · Filling in a form.
 *
 *   Kelime: think, agree, useful, waste, depend, technology, modern,
 *           point, first, press, choose, wait, done, pay attention,
 *           continue, repeat, office, register, queue, number, counter,
 *           assistant, entrance, announcement, surname, address, sign,
 *           date, birth, place of birth, year of birth, ID card.
 *   Kalıp:  I think phones are useful. · I agree with you. ·
 *           It depends on the app. · First, press the button. ·
 *           Then choose your language. · Don't press it twice. ·
 *           I'd like to register, please. ·
 *           Could you tell me where the counter is? ·
 *           I have already taken a number. · My surname is … ·
 *           Could you spell that, please? · Where do I sign?
 *
 * Ünitenin tek öğretme noktası EMİR KİPİ ZİNCİRİ: „First, press … Then
 * choose … Don't press it twice.“ Özne hiç görünmüyor, sırayı zarflar
 * kuruyor ve olumsuzu „don't“ taşıyor. İngilizcenin burada söylemediği bir
 * şey var: kibarlık ayrımı. Tek bir emir biçimi herkese gidiyor — çocuğa
 * da, memura da. Karşılık bunu adıyla söylüyor, çünkü Almanca aynı yerde
 * iki ayrı biçim tutuyor.
 */
export const enA2U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u23-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 23,
    title: "At the city hall",
    genre: "dialogue",
    intro: "Belediyede kayıt. Hangi sıra, hangi form, hangi renk?",
    gloss: [
      { de: "the green one", tr: "yeşil olan" },
      { de: "reads it", tr: "okuyor" },
      { de: "in front of us", tr: "gözümüzün önünde" },
    ],
    minutes: 5,
    text:
      "Deniz: Good morning. I'd like to register, please.\n" +
      "Assistant: Have you taken a number?\n" +
      "Deniz: I have already taken a number. Sixty-four.\n" +
      "Assistant: Then wait for the announcement. We are at fifty-nine.\n" +
      "Deniz: Could you tell me where the counter is?\n" +
      "Assistant: Counter four, on the left after the entrance. But first the form.\n" +
      "Deniz: Which form?\n" +
      "Assistant: The green one, on the table by the window. Surname, address, date of birth.\n" +
      "Deniz: And my ID card?\n" +
      "Assistant: At the counter, not before. And the form in black, not blue.\n" +
      "Deniz: Black. Why?\n" +
      "Assistant: Because the machine reads it. Blue is a form you fill in twice.\n" +
      "Deniz: Then black. Thank you.\n" +
      "Assistant: And one more thing: don't sign it here. You sign at the counter, in front of us.",
    questions: [
      {
        text: "What number does Deniz have?",
        options: ["sixty-four", "fifty-nine", "four"],
        answer: 0,
        explain: "„I have already taken a number. Sixty-four.“ — elli dokuz şu anki sıra.",
      },
      {
        text: "Why must the form be in black?",
        options: ["the machine reads it", "blue is for the ID card", "the counter says so"],
        answer: 0,
        explain: "„Because the machine reads it. Blue is a form you fill in twice.“",
      },
      {
        kind: "truefalse",
        text: "Deniz should sign the form at the counter.",
        options: ["True", "False"],
        answer: 0,
        explain: "„don't sign it here. You sign at the counter, in front of us.“",
      },
      {
        kind: "gapfill",
        text: "The counter is number ___.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Counter four, on the left after the entrance.“",
      },
      {
        kind: "short_answer",
        text: "Where is the form?",
        options: [],
        answer: 0,
        accept: ["on the table", "by the window", "on the table by the window"],
        explain: "„The green one, on the table by the window.“",
      },
    ],
  },
  {
    id: "en-a2-u23-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 23,
    title: "What I think about technology",
    genre: "opinion",
    intro: "İyi mi kötü mü? Yazar soruyu değiştiriyor.",
    gloss: [
      { de: "woke me", tr: "uyandırdı" },
      { de: "games", tr: "oyunlar" },
      { de: "who is holding whom", tr: "kim kimi tutuyor" },
      { de: "grandchildren", tr: "torunlar" },
    ],
    minutes: 6,
    text:
      "Somebody asked me: is technology good or bad? I think that is the wrong question.\n" +
      "I think phones are useful. My mother is eighty-one and she sees her grandchildren every week on a screen. Twenty years ago she saw them twice a year.\n" +
      "But the same phone woke me at two in the morning last Tuesday for a message about a shop.\n" +
      "So: it depends on the app. It depends on the hour. It depends on who decides — you or the thing in your hand.\n" +
      "A colleague says technology is a waste of time. I agree with you about the games, I said, and then I asked: how did you find this restaurant? On the phone. And the train? On the phone.\n" +
      "The colleague laughed. That is my point, I said. The question is not good or bad. The question is who is holding whom.",
    questions: [
      {
        text: "What does the writer think about phones?",
        options: ["they are useful", "they are a waste of time", "they are bad"],
        answer: 0,
        explain: "„I think phones are useful.“",
      },
      {
        text: "What woke the writer at two?",
        options: ["a message about a shop", "a call from the mother", "a game"],
        answer: 0,
        explain: "„…the same phone woke me at two in the morning last Tuesday for a message about a shop.“",
      },
      {
        kind: "truefalse",
        text: "The writer agrees that technology is a waste of time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I agree with you about the games“ — yalnız oyunlar için, hepsi için değil.",
      },
      {
        kind: "gapfill",
        text: "The mother is ___ years old.",
        options: [],
        answer: 0,
        accept: ["eighty-one", "81"],
        explain: "„My mother is eighty-one and she sees her grandchildren every week on a screen.“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Is technology good or bad?",
          "I think phones are useful.",
          "It depends on the app.",
          "The question is who is holding whom.",
        ],
        explain: "Önce soru, sonra iyi yanı, sonra koşul, en son yazarın kendi sorusu.",
      },
      {
        kind: "short_answer",
        text: "Which question does the writer ask at the end?",
        options: [],
        answer: 0,
        accept: ["who is holding whom", "who decides", "who holds whom"],
        explain: "„The question is who is holding whom.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u23-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 23,
    title: "Explaining how to do it",
    genre: "dialogue",
    intro: "Ekran ekran talimat. Hangi adımda ne oluyor?",
    gloss: [
      { de: "the beginning", tr: "baştan" },
      { de: "button", tr: "düğme" },
      { de: "go down", tr: "aşağı in" },
      { de: "easier", tr: "daha kolay" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mert", text: "First, press the button on the left." },
      { speaker: "Nil", text: "This one?" },
      { speaker: "Mert", text: "That one. Now wait. It takes six seconds." },
      { speaker: "Nil", text: "Nothing happens." },
      { speaker: "Mert", text: "Wait. Don't press it twice. Then it starts again from the beginning." },
      { speaker: "Nil", text: "There. A list." },
      { speaker: "Mert", text: "Then choose your language. It is the third line." },
      { speaker: "Nil", text: "Done." },
      { speaker: "Mert", text: "Now pay attention: the next screen looks finished but it isn't. Go down and there is one more question." },
      { speaker: "Nil", text: "I see it. Address?" },
      { speaker: "Mert", text: "Yes, and then continue. Two more screens." },
      { speaker: "Nil", text: "And if I make a mistake?" },
      { speaker: "Mert", text: "Go back and repeat that screen. Nothing is lost until the last button." },
      { speaker: "Nil", text: "Done. That was easier than the letter." },
      { speaker: "Mert", text: "Everything is easier than the letter." },
    ],
    questions: [
      {
        text: "What should Nil do first?",
        options: ["press the button on the left", "choose the language", "go down"],
        answer: 0,
        explain: "„First, press the button on the left.“",
      },
      {
        text: "What happens if you press it twice?",
        options: ["it starts again from the beginning", "nothing", "it is finished"],
        answer: 0,
        explain: "„Don't press it twice. Then it starts again from the beginning.“",
      },
      {
        kind: "truefalse",
        text: "The next screen looks finished but is not.",
        options: ["True", "False"],
        answer: 0,
        explain: "„…the next screen looks finished but it isn't.“",
      },
      {
        kind: "gapfill",
        text: "The language is on the ___ line.",
        options: [],
        answer: 0,
        accept: ["third", "3"],
        explain: "„Then choose your language. It is the third line.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Don't press it twice.", "Do not press it twice.", "Don't press it twice"],
        explain: "Olumsuz emir „don't“ ile; özne yine görünmüyor.",
      },
      {
        kind: "short_answer",
        text: "What should Nil do after a mistake?",
        options: [],
        answer: 0,
        accept: ["go back and repeat", "repeat the screen", "go back"],
        explain: "„Go back and repeat that screen. Nothing is lost until the last button.“",
      },
    ],
  },
  {
    id: "en-a2-u23-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 23,
    title: "Filling in a form",
    genre: "dialogue",
    intro: "Form doldurma. Hangi bilgi nereye yazılıyor?",
    gloss: [
      { de: "spell", tr: "harf harf söylemek" },
      { de: "dot", tr: "nokta" },
      { de: "that line is mine", tr: "o satır benim" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Assistant", text: "Your surname, please." },
      { speaker: "Ela", text: "Yılmaz." },
      { speaker: "Assistant", text: "Could you spell that, please?" },
      { speaker: "Ela", text: "Y, I with no dot, L, M, A, Z." },
      { speaker: "Assistant", text: "Thank you. Date of birth?" },
      { speaker: "Ela", text: "The third of June, nineteen ninety-four." },
      { speaker: "Assistant", text: "Place of birth?" },
      { speaker: "Ela", text: "Bursa." },
      { speaker: "Assistant", text: "Address?" },
      { speaker: "Ela", text: "Garden Street forty-one, second floor." },
      { speaker: "Assistant", text: "With or without a flat number?" },
      { speaker: "Ela", text: "There is no number. Two flats, one door." },
      { speaker: "Assistant", text: "Then I write left. The post needs it." },
      { speaker: "Ela", text: "Good idea." },
      { speaker: "Assistant", text: "And where do I sign? — you will ask that next." },
      { speaker: "Ela", text: "Where do I sign?" },
      { speaker: "Assistant", text: "Here, and here. Not there — that line is mine." },
    ],
    questions: [
      {
        text: "Where was Ela born?",
        options: ["in Bursa", "in Garden Street", "in June"],
        answer: 0,
        explain: "„Place of birth? — Bursa.“",
      },
      {
        text: "Why does the assistant write „left“?",
        options: ["the post needs it", "there are two doors", "the flat has no floor"],
        answer: 0,
        explain: "„There is no number. Two flats, one door. — Then I write left. The post needs it.“",
      },
      {
        kind: "truefalse",
        text: "The flat has a number.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is no number. Two flats, one door.“",
      },
      {
        kind: "gapfill",
        text: "Ela was born on the third of ___.",
        options: [],
        answer: 0,
        accept: ["June"],
        explain: "„The third of June, nineteen ninety-four.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Could you spell that, please?", "Could you spell that, please"],
        explain: "„spell“ harf harf söylemek demek.",
      },
      {
        kind: "short_answer",
        text: "How many flats are behind the door?",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„There is no number. Two flats, one door.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u23-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 23,
    title: "First, press the button",
    genre: "info",
    intro: "Emir zinciri. Özne yok, sırayı zarflar kuruyor.",
    gloss: [
      { de: "press", tr: "basmak" },
      { de: "choose", tr: "seçmek" },
      { de: "register", tr: "kayıt yaptırmak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Önce soldaki düğmeye bas.",
        answer: "First, press the button on the left.",
        alternatives: ["First press the button on the left."],
        hint: "Emir cümlesi öznesiz; sırayı „first“ açıyor.",
      },
      {
        kind: "build",
        tr: "Sonra dilini seç.",
        answer: "Then choose your language.",
        hint: "„then“ bir sonraki adımı bağlıyor; fiil yine eksiz.",
      },
      {
        kind: "build",
        tr: "Ona iki kez basma.",
        answer: "Don't press it twice.",
        alternatives: ["Do not press it twice."],
        hint: "Olumsuz emir „don't“ ile; İngilizcede tek emir biçimi var, kibarlık ayrımı yok.",
      },
      {
        kind: "build",
        tr: "Kayıt yaptırmak istiyorum, lütfen.",
        answer: "I'd like to register, please.",
        alternatives: ["I would like to register, please."],
        hint: "Kurumda „I'd like“; „register“ kayıt yaptırmak demek.",
      },
      {
        kind: "form",
        prompt: "Kayıt formunu doldur.",
        facts: "Soyadı Yılmaz; doğum tarihi üç haziran; doğum yeri Bursa; adres Garden Street kırk bir.",
        fields: [
          { label: "Surname", answer: "Yılmaz" },
          { label: "Date of birth", answer: "the third of June", accept: ["3 June", "June"] },
          { label: "Place of birth", answer: "Bursa" },
          { label: "Address", answer: "Garden Street forty-one", accept: ["Garden Street 41"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u23-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 23,
    title: "I think phones are useful",
    genre: "opinion",
    intro: "Görüş bildirme ve kurum dili. Her fiil kendi edatını taşıyor.",
    gloss: [
      { de: "agree with", tr: "katılmak" },
      { de: "depends on", tr: "bağlı" },
      { de: "the counter", tr: "gişe" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bence telefonlar faydalı.",
        answer: "I think phones are useful.",
        hint: "„I think“ sonrası „that“ düşebiliyor; cümle doğrudan geliyor.",
      },
      {
        kind: "build",
        tr: "Sana katılıyorum.",
        answer: "I agree with you.",
        hint: "„agree“ın edatı „with“; kişi ondan sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Uygulamaya bağlı.",
        answer: "It depends on the app.",
        hint: "„depend“ kendi edatını taşıyor: „on“.",
      },
      {
        kind: "build",
        tr: "Gişenin nerede olduğunu söyleyebilir misiniz?",
        answer: "Could you tell me where the counter is?",
        hint: "Dolaylı soruda sıra düz cümleye dönüyor: „where the counter is“.",
      },
      {
        kind: "build",
        tr: "Bunu heceleyebilir misiniz, lütfen?",
        answer: "Could you spell that, please?",
        hint: "„spell“ harf harf söylemek demek; ad ya da sokak için sorulur.",
      },
    ],
  },
];
