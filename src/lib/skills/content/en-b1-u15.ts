import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 15 — "Grup çalışması, çevrimiçi kurs, motivasyon, sonraki adım".
 *
 * Dört ders: Working in a group · The online course · Keeping it up ·
 * What comes next.
 *
 *   Kelime: partner, task, organise, leader, project, present, divide,
 *           support, online, video, lesson, upload, download, module,
 *           access, subtitle, bored, tired, reward, discipline, enjoy,
 *           continue, quit, streak, advanced, further, choice, future,
 *           realistic, ambition, plan, ready.
 *   Kalıp:  The partner who works with me is reliable. ·
 *           The task that we divided was easier. ·
 *           The part I wrote was the shortest. ·
 *           The lesson is uploaded every Monday. ·
 *           The video can be downloaded for offline use. ·
 *           When is the next module opened? ·
 *           If I get bored, I take a short walk. ·
 *           If I were less tired, I would study more. ·
 *           You will not quit unless you stop enjoying it. ·
 *           Although the advanced level is hard, I want it. ·
 *           I will go further. However, I need a plan. ·
 *           Despite my ambition, the choice must be realistic.
 *
 * Ünitenin tek öğretme noktası KOŞULDA „WERE“: „If I were less tired, I
 * would study more.“ Gerçek olmayan koşulda „I“ ve „he“ yanında bile
 * „was“ değil „were“ geliyor. Bu, İngilizcenin başka hiçbir yerde
 * kullanmadığı tek biçim ve öğrenci onu ilk duyduğunda hata sanıyor.
 * Yanında ünitenin ikinci tuzağı duruyor: „unless“ zaten olumsuz olduğu
 * için ana cümlenin olumsuzu onu iptal etmiyor.
 */
export const enB1U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u15-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 15,
    title: "Keeping it up",
    genre: "opinion",
    intro: "Sekiz aylık bir seri. Kopmayı ne engelliyor?",
    gloss: [
      { de: "streak", tr: "kesintisiz seri" },
      { de: "willpower", tr: "irade" },
      { de: "the day after", tr: "ertesi gün" },
      { de: "survived", tr: "ayakta kaldı" },
      { de: "ordinary", tr: "sıradan" },
      { de: "boredom", tr: "can sıkıntısı" },
      { de: "real condition", tr: "gerçek koşul" },
      { de: "sentence", tr: "cümle" },
      { de: "myself", tr: "kendime" },
      { de: "enjoyment", tr: "keyif" },
      { de: "either", tr: "de" },
    ],
    minutes: 7,
    text:
      "Eight months, four breaks, and one rule that survived all four.\n" +
      "If I get bored, I take a short walk. Real condition, ordinary week: this happens, and this is what I do. Ten minutes, no phone, and the boredom is usually a room problem and not a language problem.\n" +
      "If I were less tired, I would study more. Not real, and the form says so: „were“, not „was“, even after „I“. English uses that one form in this one place, and it is the sentence I say to myself at eleven at night to feel better about stopping.\n" +
      "You will not quit unless you stop enjoying it. That line came from a tutor and it took me a month to read it properly. „Unless“ already carries the „not“, so the sentence is not a double negative — it says: the only thing that ends this is losing the enjoyment.\n" +
      "Discipline is a smaller word than people think. It is not eight months of willpower. It is the rule for the day after a missed day, and I have exactly one: start again with the shortest thing on the list.\n" +
      "The streak is not the point either. I broke it four times and the four restarts are the reason I am still here.\n" +
      "The reward, if there is one, is not at the end. It is the evening you notice you did not decide to study; you just did.",
    questions: [
      {
        text: "What does the writer do when bored?",
        options: ["takes a short walk", "studies more", "stops for a week"],
        answer: 0,
        explain: "„If I get bored, I take a short walk. … Ten minutes, no phone…“",
      },
      {
        text: "What does „unless“ carry?",
        options: ["the „not“", "a condition of time", "a reward"],
        answer: 0,
        explain: "„„Unless“ already carries the „not“, so the sentence is not a double negative…“",
      },
      {
        kind: "truefalse",
        text: "The writer never broke the streak.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I broke it four times and the four restarts are the reason I am still here.“",
      },
      {
        kind: "gapfill",
        text: "The walk is ___ minutes.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Ten minutes, no phone, and the boredom is usually a room problem…“",
      },
      {
        kind: "order",
        text: "Yazının sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "If I get bored, I take a short walk.",
          "If I were less tired, I would study more.",
          "You will not quit unless you stop enjoying it.",
          "The streak is not the point either.",
        ],
        explain: "Gerçek koşul, gerçek olmayan koşul, tutorun cümlesi, en sonda seri.",
      },
      {
        kind: "short_answer",
        text: "What is the rule for the day after a missed day?",
        options: [],
        answer: 0,
        accept: ["start with the shortest thing", "the shortest thing", "start again"],
        explain: "„start again with the shortest thing on the list.“",
      },
    ],
  },
  {
    id: "en-b1-u15-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 15,
    title: "The online course",
    genre: "info",
    intro: "Kurs nasıl işliyor? Cümleler neden edilgen?",
    gloss: [
      { de: "offline", tr: "çevrimdışı" },
      { de: "subtitles", tr: "altyazı" },
      { de: "at your own pace", tr: "kendi hızında" },
      { de: "system", tr: "sistem" },
      { de: "whether", tr: "olsun olmasın" },
      { de: "awake", tr: "uyanık" },
      { de: "sentence", tr: "cümle" },
      { de: "built", tr: "kurulmuş" },
      { de: "none", tr: "hiçbiri" },
      { de: "actually", tr: "asıl" },
    ],
    minutes: 7,
    text:
      "How the course works, in the order you will need it.\n" +
      "The lesson is uploaded every Monday. Not by a person you write to — by the system, at six in the morning, whether anybody is awake or not.\n" +
      "The video can be downloaded for offline use. That sentence is the most useful one on this page and it is the one nobody reads. Download it on Monday and the train on Thursday stops being a problem.\n" +
      "When is the next module opened? Two weeks after the last lesson of the one before, and never earlier, even if you finish in three days. The gap is on purpose: the course is built at a speed, not at your own pace.\n" +
      "Subtitles are available in two languages and there is a third setting that shows none. Use the third one in the second half of every video. The first half with, the second half without — that is where the listening actually happens.\n" +
      "Access stays open for a year after the last module. Nothing is deleted, and the videos are not made shorter later.\n" +
      "One warning about the tasks: they are marked by people, not by the system, and people take four working days. Send the task on Friday and read the answer the following Thursday.",
    questions: [
      {
        text: "When is the lesson uploaded?",
        options: ["every Monday at six", "every Thursday", "when a person sends it"],
        answer: 0,
        explain: "„The lesson is uploaded every Monday. … by the system, at six in the morning…“",
      },
      {
        text: "What should you do with subtitles?",
        options: ["turn them off for the second half", "use two languages", "never use them"],
        answer: 0,
        explain: "„The first half with, the second half without — that is where the listening actually happens.“",
      },
      {
        kind: "truefalse",
        text: "The next module opens as soon as you finish.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Two weeks after the last lesson of the one before, and never earlier…“",
      },
      {
        kind: "gapfill",
        text: "Access stays open for a ___ after the last module.",
        options: [],
        answer: 0,
        accept: ["year"],
        explain: "„Access stays open for a year after the last module.“",
      },
      {
        kind: "short_answer",
        text: "How long does marking take?",
        options: [],
        answer: 0,
        accept: ["four working days", "four days", "4 days"],
        explain: "„they are marked by people, not by the system, and people take four working days.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u15-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 15,
    title: "Working in a group",
    genre: "dialogue",
    intro: "Grup projesi bölüşülüyor. Kim neyi yazıyor?",
    gloss: [
      { de: "the shortest", tr: "en kısası" },
      { de: "divided", tr: "böldük" },
      { de: "edits", tr: "düzeltme yapar" },
      { de: "instead", tr: "onun yerine" },
      { de: "whole", tr: "bütün" },
      { de: "least", tr: "en az" },
      { de: "editing", tr: "düzeltme" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Ela", text: "How did the group project go in the end?" },
      { speaker: "Can", text: "Better than the last one. The partner who works with me is reliable, which changes everything." },
      { speaker: "Ela", text: "How did you divide it?" },
      { speaker: "Can", text: "The task that we divided was easier than we thought. Four parts, one person each, and one rule: nobody edits somebody else's part without asking." },
      { speaker: "Ela", text: "Did that hold?" },
      { speaker: "Can", text: "Once it did not, and we talked about it for four minutes instead of four weeks. That is the whole difference." },
      { speaker: "Ela", text: "Who presented?" },
      { speaker: "Can", text: "The one who wrote the least. We decided that at the start and it is the best rule we have." },
      { speaker: "Ela", text: "Why?" },
      { speaker: "Can", text: "Because the person who writes everything wants to present everything, and then three people have done nothing." },
      { speaker: "Ela", text: "And your part?" },
      { speaker: "Can", text: "The part I wrote was the shortest. It took the longest — two pages of numbers that had to agree." },
      { speaker: "Ela", text: "Would you work with them again?" },
      { speaker: "Can", text: "With that partner, yes. With the group, yes, if we keep the rule about editing. Without it, no." },
    ],
    questions: [
      {
        text: "What was the rule about editing?",
        options: ["nobody edits another part without asking", "everybody edits everything", "only the leader edits"],
        answer: 0,
        explain: "„nobody edits somebody else's part without asking.“",
      },
      {
        text: "Who presented?",
        options: ["the one who wrote the least", "the leader", "Can"],
        answer: 0,
        explain: "„The one who wrote the least. We decided that at the start…“",
      },
      {
        kind: "truefalse",
        text: "Can's part was the quickest to write.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The part I wrote was the shortest. It took the longest…“",
      },
      {
        kind: "gapfill",
        text: "The project had ___ parts.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Four parts, one person each…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The part I wrote was the shortest.", "The part I wrote was the shortest"],
        explain: "Nesne konumundaki ilgi adılı düşmüş: „The part I wrote“ ile aynı.",
      },
      {
        kind: "short_answer",
        text: "Under what condition would Can work with the group again?",
        options: [],
        answer: 0,
        accept: ["if they keep the rule", "with the editing rule", "if the rule stays"],
        explain: "„With the group, yes, if we keep the rule about editing.“",
      },
    ],
  },
  {
    id: "en-b1-u15-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 15,
    title: "What comes next",
    genre: "dialogue",
    intro: "İleri düzey mi, ara mı? Karar neye bağlı?",
    gloss: [
      { de: "advanced", tr: "ileri düzey" },
      { de: "realistic", tr: "gerçekçi" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "actually", tr: "gerçekten" },
      { de: "itself", tr: "kendi kendine" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Nil", text: "So. Advanced level in September or not?" },
      { speaker: "Mert", text: "Although the advanced level is hard, I want it. That part I am sure about." },
      { speaker: "Nil", text: "And the part you are not sure about?" },
      { speaker: "Mert", text: "Whether I have the evenings. Four hours a week is the course; the reading is another four." },
      { speaker: "Nil", text: "That is a job." },
      { speaker: "Mert", text: "It is half a job. I will go further. However, I need a plan, and the plan is the thing I have never written down." },
      { speaker: "Nil", text: "What would the plan say?" },
      { speaker: "Mert", text: "Which two evenings, and what I stop doing to get them. The second half is the one nobody writes." },
      { speaker: "Nil", text: "And if the evenings are not there?" },
      { speaker: "Mert", text: "Then I take the shorter course in January. Despite my ambition, the choice must be realistic." },
      { speaker: "Nil", text: "That sounds like a decision." },
      { speaker: "Mert", text: "It is a decision about how to decide, which is not the same and is usually enough." },
      { speaker: "Nil", text: "When will you know?" },
      { speaker: "Mert", text: "In two weeks. I am writing down every evening I actually have free, and then the plan writes itself." },
    ],
    questions: [
      {
        text: "What is Mert sure about?",
        options: ["wanting the advanced level", "having the evenings", "the January course"],
        answer: 0,
        explain: "„Although the advanced level is hard, I want it. That part I am sure about.“",
      },
      {
        text: "What does the plan need to say?",
        options: ["which evenings and what to stop", "which book to buy", "which teacher"],
        answer: 0,
        explain: "„Which two evenings, and what I stop doing to get them.“",
      },
      {
        kind: "truefalse",
        text: "Mert has already written the plan.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the plan is the thing I have never written down.“",
      },
      {
        kind: "gapfill",
        text: "The course is ___ hours a week.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Four hours a week is the course; the reading is another four.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Despite my ambition, the choice must be realistic.", "Despite my ambition, the choice must be realistic"],
        explain: "„despite“ bir isim alıyor; cümle gelseydi „although“ gerekirdi.",
      },
      {
        kind: "short_answer",
        text: "When will Mert know?",
        options: [],
        answer: 0,
        accept: ["in two weeks", "two weeks"],
        explain: "„In two weeks. I am writing down every evening I actually have free…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u15-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 15,
    title: "If I were less tired, I would study more",
    genre: "personal",
    intro: "İki koşul ve bir tuzak. Ne zaman „was“ değil „were“?",
    gloss: [
      { de: "If I were", tr: "olsaydım" },
      { de: "bored", tr: "sıkılmış" },
      { de: "unless", tr: "-medikçe" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sıkılırsam kısa bir yürüyüş yaparım.",
        answer: "If I get bored, I take a short walk.",
        hint: "Gerçek koşul: iki yarıda da geniş zaman.",
      },
      {
        kind: "build",
        tr: "Daha az yorgun olsaydım daha çok çalışırdım.",
        answer: "If I were less tired, I would study more.",
        hint: "Gerçek olmayan koşulda „I“ yanında bile „were“ geliyor; „was“ değil.",
      },
      {
        kind: "build",
        tr: "Ondan keyif almayı bırakmadıkça bırakmayacaksın.",
        answer: "You will not quit unless you stop enjoying it.",
        hint: "„unless“ zaten olumsuzluk taşıyor; ana cümlenin olumsuzu onu iptal etmiyor.",
      },
      {
        kind: "build",
        tr: "Ders her pazartesi yükleniyor.",
        answer: "The lesson is uploaded every Monday.",
        hint: "Edilgen ve zamansız: yükleyen sistem, her hafta böyle.",
      },
      {
        kind: "form",
        prompt: "Kurs kartını doldur.",
        facts: "Ders her pazartesi altıda; video indirilebiliyor; yeni modül iki hafta sonra; erişim bir yıl.",
        fields: [
          { label: "Lesson", answer: "every Monday", accept: ["Monday at six"] },
          { label: "Video", answer: "can be downloaded", accept: ["yes"] },
          { label: "Next module", answer: "two weeks later", accept: ["after two weeks"] },
          { label: "Access", answer: "one year", accept: ["a year"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u15-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 15,
    title: "Although the advanced level is hard, I want it",
    genre: "personal",
    intro: "Grup ve gelecek cümleleri. Üç ödün sözcüğü son kez yan yana.",
    gloss: [
      { de: "reliable", tr: "güvenilir" },
      { de: "go further", tr: "daha ileri gitmek" },
      { de: "ambition", tr: "hedef" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Benimle çalışan ortak güvenilir.",
        answer: "The partner who works with me is reliable.",
        hint: "Özne konumundaki „who“ düşemez.",
      },
      {
        kind: "build",
        tr: "Yazdığım kısım en kısasıydı.",
        answer: "The part I wrote was the shortest.",
        hint: "Nesne konumundaki bağlaç düşmüş; „that“ eklenebilirdi.",
      },
      {
        kind: "build",
        tr: "İleri düzey zor olmasına rağmen onu istiyorum.",
        answer: "Although the advanced level is hard, I want it.",
        hint: "„although“ bir cümle bağlıyor.",
      },
      {
        kind: "build",
        tr: "Daha ileri gideceğim. Ancak bir plana ihtiyacım var.",
        answer: "I will go further. However, I need a plan.",
        hint: "„however“ yeni bir cümle başlatıyor ve kendi virgülüyle geliyor.",
      },
      {
        kind: "build",
        tr: "Hedefime rağmen seçim gerçekçi olmalı.",
        answer: "Despite my ambition, the choice must be realistic.",
        hint: "„despite“ bir isim istiyor; üç sözcük üç ayrı yapı kuruyor.",
      },
    ],
  },
];
