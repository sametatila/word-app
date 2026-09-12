import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 24 — "Hayaller, koşullar, dokunan şey, birini
 * neşelendirmek".
 *
 * Dört ders: What I dream of · If I could · The thing that moved me ·
 * Cheering someone up.
 *
 *   Kelime: dream, wish, brave, desire, longing, proud, joy, curious,
 *           forgive, shy, thank, jealous, close, deep, soft, comfort,
 *           cry, hug, smile, laugh, surprise, disappoint, emotion, fear,
 *           cheer, alone, advice, courage, try, kind, stress, cope.
 *   Kalıp:  I will follow that dream one day. ·
 *           I am going to write the wish down. ·
 *           I am taking the brave step next week. ·
 *           If you forgive him, everything gets easier. ·
 *           If I were less shy, I would say it. ·
 *           Unless you thank her, she will feel hurt. ·
 *           The film that made me cry was old. ·
 *           The woman who hugged me was a stranger. ·
 *           The place where I smiled was quiet. ·
 *           You have to cheer her up first. ·
 *           You don't have to face it alone. ·
 *           You must not give advice too early.
 *
 * Ünitenin tek öğretme noktası İLGİ ADILI HİÇ ÇEKİLMİYOR. „that“, „who“
 * ve „where“ arasında yapılacak tek seçim sözcüğün TÜRÜ — şey, kişi, yer;
 * seçildikten sonra biçim hiç değişmiyor, ne sayıya ne göreve ne zamana
 * göre. Ünite 3 ilgi adılının DÜŞMESİNİ, ünite 8 VİRGÜLÜNÜ öğretmişti;
 * burada öğretilen şey adılın kendisinin donuk olması.
 */
export const enB1U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u24-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 24,
    title: "The thing that moved me",
    genre: "opinion",
    intro: "Üç ilgi cümlesi. Hangi sözcük hangi boşluğa gidiyor?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "none", tr: "hiçbiri" },
      { de: "nowhere", tr: "hiçbir yerde" },
      { de: "onto", tr: "üstüne" },
      { de: "comma", tr: "virgül" },
      { de: "unit", tr: "ünite" },
      { de: "sentence", tr: "cümle" },
      { de: "a stranger", tr: "yabancı" },
      { de: "a clause", tr: "cümlecik" },
      { de: "a noun", tr: "isim" },
      { de: "unusual", tr: "alışılmadık" },
      { de: "serves", tr: "işe yarıyor" },
      { de: "an object", tr: "nesne" },
      { de: "a subject", tr: "özne" },
      { de: "decoration", tr: "süs" },
      { de: "choosing", tr: "seçen" },
      { de: "belongs", tr: "ait" },
      { de: "afterwards", tr: "sonradan" },
      { de: "the test", tr: "sınama" },
    ],
    minutes: 7,
    text:
      "The film that made me cry was old. The woman who hugged me was a stranger. The place where I smiled was quiet. Three sentences, three small words, and the only question is which word goes where.\n" +
      "„That“ is for a thing. „Who“ is for a person. „Where“ is for a place. There is nothing else to decide, because none of the three changes shape afterwards: the same „who“ serves one woman and forty, a subject and an object, this year and last year.\n" +
      "That is unusual and it is worth saying out loud, because the words in front of them do change. „The film“ takes „the“; „films“ takes nothing.\n" +
      "The second thing to know is where the clause sits. It goes straight after the noun it belongs to and nowhere else. „The woman was a stranger who hugged me“ moves the hugging onto the wrong person, and the reader notices before you do.\n" +
      "The last thing is the comma, and this unit keeps it simple: no comma, because each of these three sentences is choosing. Which film? The one that made me cry. The clause is doing work, not adding decoration.\n" +
      "I have used the first sentence three times this year and every time somebody asks me which film. That is the test. A clause that chooses always makes somebody ask.",
    questions: [
      {
        text: "Which word is for a place?",
        options: ["where", "that", "who"],
        answer: 0,
        explain: "„„Where“ is for a place.“",
      },
      {
        text: "Where does the clause go?",
        options: ["straight after the noun", "at the end of the sentence", "in front of the noun"],
        answer: 0,
        explain: "„It goes straight after the noun it belongs to and nowhere else.“",
      },
      {
        kind: "truefalse",
        text: "„Who“ changes its shape after the first time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the same „who“ serves one woman and forty, a subject and an object…“",
      },
      {
        kind: "gapfill",
        text: "The place ___ I smiled was quiet.",
        options: [],
        answer: 0,
        accept: ["where"],
        explain: "„The place where I smiled was quiet.“",
      },
      {
        kind: "order",
        text: "Üç adılın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The film that made me cry was old.",
          "The woman who hugged me was a stranger.",
          "The place where I smiled was quiet.",
          "A clause that chooses always makes somebody ask.",
        ],
        explain: "Şey, kişi, yer; en sonda sınamanın kendisi.",
      },
      {
        kind: "short_answer",
        text: "What do people ask the writer?",
        options: [],
        answer: 0,
        accept: ["which film", "which film it was", "the name of the film"],
        explain: "„every time somebody asks me which film.“",
      },
    ],
  },
  {
    id: "en-b1-u24-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 24,
    title: "If I could",
    genre: "opinion",
    intro: "İki koşul yan yana. Hangisi gerçek olmayanı anlatıyor?",
    gloss: [
      { de: "tenses", tr: "zaman kipleri" },
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "tense", tr: "zaman kipi" },
      { de: "rather", tr: "daha çok" },
      { de: "sentences", tr: "cümleler" },
      { de: "verb", tr: "fiil" },
      { de: "nowhere", tr: "hiçbir yerde" },
      { de: "own", tr: "kendi" },
      { de: "myself", tr: "kendim" },
      { de: "sounds", tr: "gibi geliyor" },
      { de: "a claim", tr: "iddia" },
      { de: "identical", tr: "birebir aynı" },
      { de: "a marker", tr: "belirteç" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "heard", tr: "duyulan" },
      { de: "negative", tr: "olumsuzluk" },
      { de: "warn", tr: "uyarmak" },
      { de: "reach", tr: "varmak" },
      { de: "listening", tr: "dinleyen" },
      { de: "instead", tr: "onun yerine" },
    ],
    minutes: 7,
    text:
      "If you forgive him, everything gets easier. Two present tenses, and the sentence is about something that can happen: you might, and then it does.\n" +
      "If I were less shy, I would say it. The same word at the front, a completely different claim. The past form here is not about the past at all — it is about a present that is not true. I am shy, and the sentence knows it.\n" +
      "That is the whole difference, and English marks it with a tense rather than with a word. What it does not do is warn you: the two sentences look almost identical until you reach the second verb.\n" +
      "„Were“ is the old marker and it survives only here. „If I was less shy“ is heard everywhere and written nowhere, and „If I were you“ has never been anything else.\n" +
      "Unless you thank her, she will feel hurt. „Unless“ carries its own negative: it means „if you do not“. Putting another one in — „unless you don't thank her“ — turns the sentence over and says the opposite of what you meant.\n" +
      "The deep one is the second kind. It lets me say a thing about myself that is not true, so that the person listening can hear what I wish were true instead. That is why it sounds soft and why it is so hard to answer.",
    questions: [
      {
        text: "What is the second kind of condition about?",
        options: ["a present that is not true", "a day last year", "a promise"],
        answer: 0,
        explain: "„it is about a present that is not true. I am shy, and the sentence knows it.“",
      },
      {
        text: "What does „unless“ carry?",
        options: ["its own negative", "a second verb", "a question"],
        answer: 0,
        explain: "„„Unless“ carries its own negative: it means „if you do not“.“",
      },
      {
        kind: "truefalse",
        text: "„If I was less shy“ is the written form.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„If I was less shy“ is heard everywhere and written nowhere…“",
      },
      {
        kind: "gapfill",
        text: "If I ___ less shy, I would say it.",
        options: [],
        answer: 0,
        accept: ["were"],
        explain: "„If I were less shy, I would say it.“",
      },
      {
        kind: "order",
        text: "Koşulların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "If you forgive him, everything gets easier.",
          "If I were less shy, I would say it.",
          "Unless you thank her, she will feel hurt.",
          "The deep one is the second kind.",
        ],
        explain: "Gerçek koşul, gerçek olmayan koşul, „unless“, en sonda yargı.",
      },
      {
        kind: "short_answer",
        text: "Why is the second kind hard to answer?",
        options: [],
        answer: 0,
        accept: ["it sounds soft", "because it is soft", "it is not true"],
        explain: "„That is why it sounds soft and why it is so hard to answer.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u24-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 24,
    title: "What I dream of",
    genre: "monologue",
    intro: "Üç gelecek biçimi, tek kişi. Hangisi ayarlanmış?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "belong", tr: "ait olmak" },
      { de: "whole", tr: "bütün" },
      { de: "a notebook", tr: "defter" },
      { de: "arranged", tr: "ayarlanmış" },
      { de: "a chair", tr: "sandalye" },
      { de: "my file", tr: "dosyam" },
      { de: "the calendar", tr: "takvim" },
      { de: "proof", tr: "kanıt" },
      { de: "an appointment", tr: "randevu" },
      { de: "comfortable", tr: "rahat" },
      { de: "missing", tr: "eksik" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Bade", text: "I will follow that dream one day. That is the sentence I have said for six years and it is the weakest thing in this room." },
      { speaker: "Bade", text: "„Will“ and „one day“ belong together, and together they mean nothing. There is no date, no first step and nobody waiting for me." },
      { speaker: "Bade", text: "I am going to write the wish down. That one is different. The notebook is on the table and I bought it in May, so the decision was made before I said the sentence." },
      { speaker: "Bade", text: "I am taking the brave step next week. It is the strongest of the three, because it is arranged: Tuesday, four o'clock, a room with two chairs and a woman who has my file." },
      { speaker: "Bade", text: "The desire was always there. What was missing was the calendar, and a calendar is the only proof a plan ever has." },
      { speaker: "Bade", text: "I was curious about why the first sentence felt good and the third one felt like fear. Now I think the good feeling was the whole point of it." },
      { speaker: "Bade", text: "„One day“ is comfortable. Tuesday is not comfortable, and that is how you know which one of them is real." },
      { speaker: "Bade", text: "The longing does not go away when you make the appointment. It just stops being the only thing you do about it." },
    ],
    questions: [
      {
        text: "Which sentence is the strongest?",
        options: ["I am taking the brave step next week.", "I will follow that dream one day.", "I am going to write the wish down."],
        answer: 0,
        explain: "„It is the strongest of the three, because it is arranged…“",
      },
      {
        text: "When did Bade buy the notebook?",
        options: ["in May", "on Tuesday", "next week"],
        answer: 0,
        explain: "„The notebook is on the table and I bought it in May…“",
      },
      {
        kind: "truefalse",
        text: "The longing goes away after the appointment.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The longing does not go away when you make the appointment.“",
      },
      {
        kind: "gapfill",
        text: "A calendar is the only ___ a plan ever has.",
        options: [],
        answer: 0,
        accept: ["proof"],
        explain: "„a calendar is the only proof a plan ever has.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I am going to write the wish down.", "I am going to write the wish down"],
        explain: "Önceden kurulmuş karar: „going to“.",
      },
      {
        kind: "short_answer",
        text: "What was missing?",
        options: [],
        answer: 0,
        accept: ["the calendar", "calendar", "a date"],
        explain: "„What was missing was the calendar…“",
      },
    ],
  },
  {
    id: "en-b1-u24-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 24,
    title: "Cheering someone up",
    genre: "dialogue",
    intro: "Biri üzgün. Hangi kural kaldırıyor, hangisi koyuyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "tea", tr: "çay" },
      { de: "a door", tr: "kapı" },
      { de: "closing", tr: "kapanan" },
      { de: "actually", tr: "asıl" },
      { de: "opposites", tr: "karşıtlar" },
      { de: "mix them up", tr: "birbirine karıştırmak" },
      { de: "the situation", tr: "durum" },
      { de: "matters", tr: "önemli" },
      { de: "sounds like", tr: "gibi geliyor" },
      { de: "sits", tr: "oturuyor" },
    ],
    minutes: 6,
    segments: [
      { speaker: "İpek", text: "You have to cheer her up first. Not with advice — with tea and forty minutes." },
      { speaker: "Timur", text: "Why not advice?" },
      { speaker: "İpek", text: "You must not give advice too early. It sounds like a door closing, and she will stop talking about the thing that actually hurts." },
      { speaker: "Timur", text: "And if I say nothing at all?" },
      { speaker: "İpek", text: "Then you are doing it right. „You don't have to face it alone“ is a sentence, not a plan; the plan is that somebody sits there." },
      { speaker: "Timur", text: "„Don't have to“ and „must not“ are not the same, are they?" },
      { speaker: "İpek", text: "They are opposites. „Don't have to“ takes a rule away; „must not“ puts one there, and people learning English mix them up in exactly the situation where it matters." },
      { speaker: "Timur", text: "What does she need courage for?" },
      { speaker: "İpek", text: "For Thursday. She has to call them, and she has been kind about it for three weeks, which is her way of not doing it." },
      { speaker: "Timur", text: "And the stress?" },
      { speaker: "İpek", text: "The stress is the part she can cope with. It is being alone with it that she cannot, and that is the only part you can change." },
    ],
    questions: [
      {
        text: "What should Timur bring?",
        options: ["tea and forty minutes", "advice", "a plan"],
        answer: 0,
        explain: "„Not with advice — with tea and forty minutes.“",
      },
      {
        text: "What does „don't have to“ do?",
        options: ["takes a rule away", "puts a rule there", "asks a question"],
        answer: 0,
        explain: "„„Don't have to“ takes a rule away; „must not“ puts one there…“",
      },
      {
        kind: "truefalse",
        text: "She cannot cope with the stress.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The stress is the part she can cope with.“",
      },
      {
        kind: "gapfill",
        text: "She has been kind about it for three ___.",
        options: [],
        answer: 0,
        accept: ["weeks"],
        explain: "„she has been kind about it for three weeks…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["You must not give advice too early.", "You must not give advice too early"],
        explain: "Yasak: „must not“, „don't have to“ değil.",
      },
      {
        kind: "short_answer",
        text: "What can Timur change?",
        options: [],
        answer: 0,
        accept: ["being alone", "the being alone", "her being alone"],
        explain: "„It is being alone with it that she cannot, and that is the only part you can change.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u24-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 24,
    title: "The film that made me cry was old",
    genre: "opinion",
    intro: "Şey, kişi, yer. Hangi adıl hangi boşluğa giriyor?",
    gloss: [
      { de: "that made me cry", tr: "beni ağlatan" },
      { de: "who hugged me", tr: "bana sarılan" },
      { de: "where I smiled", tr: "gülümsediğim yer" },
      { de: "follow", tr: "izlemek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Beni ağlatan film eskiydi.",
        answer: "The film that made me cry was old.",
        hint: "Şey için „that“; özne konumunda düşmüyor.",
      },
      {
        kind: "build",
        tr: "Bana sarılan kadın bir yabancıydı.",
        answer: "The woman who hugged me was a stranger.",
        hint: "Kişi için „who“; biçimi hiç değişmiyor.",
      },
      {
        kind: "build",
        tr: "Gülümsediğim yer sessizdi.",
        answer: "The place where I smiled was quiet.",
        hint: "Yer için „where“; sayı ve görev onu değiştirmiyor.",
      },
      {
        kind: "build",
        tr: "O hayali bir gün izleyeceğim.",
        answer: "I will follow that dream one day.",
        hint: "Tarihsiz kanaat: „will“ ile „one day“ birlikte geliyor.",
      },
      {
        kind: "form",
        prompt: "Adıl kartını doldur.",
        facts: "Şey için „that“; kişi için „who“; yer için „where“; üçü de hiç çekilmiyor.",
        fields: [
          { label: "A thing", answer: "that", accept: ["that made me cry"] },
          { label: "A person", answer: "who", accept: ["who hugged me"] },
          { label: "A place", answer: "where", accept: ["where I smiled"] },
          { label: "The form", answer: "never changes", accept: ["no change"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u24-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 24,
    title: "If I were less shy, I would say it",
    genre: "opinion",
    intro: "İki koşul ve iki kural. Hangisi gerçek?",
    gloss: [
      { de: "were", tr: "olsaydım" },
      { de: "forgive", tr: "affetmek" },
      { de: "unless", tr: "olmadıkça" },
      { de: "cheer her up", tr: "onu neşelendirmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Daha az utangaç olsam söylerdim.",
        answer: "If I were less shy, I would say it.",
        hint: "Gerçek olmayan koşul: „were“, „was“ değil.",
      },
      {
        kind: "build",
        tr: "Onu affedersen her şey kolaylaşır.",
        answer: "If you forgive him, everything gets easier.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Ona teşekkür etmezsen incinmiş hissedecek.",
        answer: "Unless you thank her, she will feel hurt.",
        hint: "„unless“ olumsuzluğu kendi içinde taşıyor.",
      },
      {
        kind: "build",
        tr: "Önce onu neşelendirmen gerekiyor.",
        answer: "You have to cheer her up first.",
        hint: "Dışarıdan gelen zorunluluk: „have to“.",
      },
      {
        kind: "build",
        tr: "Ona çok erken öğüt vermemelisin.",
        answer: "You must not give advice too early.",
        hint: "Yasak koyuyor; kuralı kaldırmıyor.",
      },
    ],
  },
];
