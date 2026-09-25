import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 ilk iş hattı: bir söyleşi, işe alıştırma sunumu, staj raporu.
 * Dil bilgisi gelecek biçimleri — dört yapı, dört ayrı iş.
 */
export const enB1P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r7",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "“Nobody Told Me I Could Ask”",
    genre: "interview",
    intro: "İlk işinden çıkan biriyle kısa bir söyleşi: ne zordu, kim yardım etti, bugün ne öneriyor.",
    gloss: [
      { de: "shift", tr: "vardiya" },
      { de: "training", tr: "eğitim" },
      { de: "head chef", tr: "şef" },
      { de: "colleague", tr: "iş arkadaşı" },
      { de: "to admit", tr: "itiraf etmek" },
      { de: "to expect", tr: "beklemek" },
      { de: "assume", tr: "varsaymak" },
    ],
    minutes: 6,
    text:
      "Mert, 22, worked for eight months in a hotel kitchen. We asked him about the first weeks.\n\n" +
      "Q: What surprised you most?\n" +
      "A: How little training there was. I had one afternoon with the head chef and then I was " +
      "on a shift. Everyone assumed I knew where things were, because asking three times looks " +
      "worse than getting it wrong once.\n\n" +
      "Q: So you didn't ask?\n" +
      "A: Not for the first month. I thought asking meant I wasn't good enough. " +
      "Then a colleague called Dana told me she had written a list of questions in her first " +
      "week and read it out on a quiet Tuesday. Nobody laughed at her.\n\n" +
      "Q: Did that change things?\n" +
      "A: Completely, but not in the way I expected. The questions were useful, of course. " +
      "The bigger change was that people started telling me things before I asked, " +
      "because they could see I wanted to know.\n\n" +
      "Q: What would you say to someone starting next week?\n" +
      "A: Two things. Write your questions down, because you forget them by the end of a shift. " +
      "And admit on day one that you know nothing. It sounds bad, but it's the only day when " +
      "everyone already expects it.",
    questions: [
      {
        text: "What surprised Mert most?",
        options: [
          "how long the shifts were",
          "how little training he got",
          "how unfriendly the staff were",
        ],
        answer: 1,
        explain: "„How little training there was.“ — bir öğleden sonralık eğitim, ardından doğrudan vardiya.",
      },
      {
        text: "Why didn't he ask questions at first?",
        options: [
          "He thought it showed he wasn't good enough.",
          "Nobody spoke his language.",
          "There was no time between shifts.",
        ],
        answer: 0,
        explain: "„I thought asking meant I wasn't good enough.“",
      },
      {
        kind: "truefalse",
        text: "Dana's list of questions made the others laugh at her.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody laughed at her.“",
      },
      {
        kind: "gapfill",
        text: "Mert worked in the hotel kitchen for ___ months.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„worked for eight months in a hotel kitchen“.",
      },
      {
        kind: "short_answer",
        text: "What was the bigger change after he started asking?",
        options: [],
        answer: 0,
        accept: [
          "people told him things first",
          "people started telling him things",
          "colleagues told him things",
        ],
        explain: "„people started telling me things before I asked“.",
      },
      {
        text: "Why does he say day one is the best day to admit you know nothing?",
        options: [
          "Because everyone expects it then.",
          "Because nobody is watching on the first day.",
          "Because the manager is usually away.",
        ],
        answer: 0,
        explain: "„it's the only day when everyone already expects it“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l7",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Your First Week: What to Expect",
    genre: "info",
    intro: "İşe yeni başlayanlar için bir bilgilendirme: ilk hafta ne olacak, kim yardım edecek, ne beklenmiyor.",
    gloss: [
      { de: "induction", tr: "işe alıştırma" },
      { de: "buddy", tr: "rehber arkadaş" },
      { de: "login", tr: "giriş bilgisi" },
      { de: "canteen", tr: "yemekhane" },
      { de: "probation", tr: "deneme süresi" },
      { de: "handbook", tr: "el kitabı" },
      { de: "basic", tr: "temel araştırma" },
    ],
    minutes: 6,
    segments: [
      { text: "Welcome to the team. This short recording covers your first week, so you don't have to remember everything from Monday morning." },
      { text: "On day one you will not do any real work. You will get your card, your login and a tour of the building, and that is enough for one day." },
      { text: "From Tuesday you will work with a buddy — a colleague from your own team, not a manager. Their job is to answer questions, including the ones you think are too basic." },
      { text: "The handbook is online, but nobody expects you to have read it. Read the two pages on safety; the rest you can look up when you need it." },
      { text: "Lunch is between twelve and two in the canteen, and the first week is free for new staff. Please use it — most people learn more at that table than in the induction." },
      { text: "Your probation lasts three months. There is a short meeting after four weeks, and it is not a test; it exists so that problems come up early." },
      { text: "One last thing. If something feels wrong in the first week, say so in the first week. After a month it becomes something you just live with." },
    ],
    questions: [
      {
        text: "What happens on day one?",
        options: [
          "no real work, just card, login and a tour",
          "a full shift with the team",
          "a written test",
        ],
        answer: 0,
        explain: "„On day one you will not do any real work.“",
      },
      {
        text: "Who is the buddy?",
        options: ["a manager", "a colleague from the same team", "someone from another company"],
        answer: 1,
        explain: "„a colleague from your own team, not a manager“.",
      },
      {
        kind: "truefalse",
        text: "New staff are expected to read the whole handbook.",
        options: ["True", "False"],
        answer: 1,
        explain: "Yalnız iki güvenlik sayfası isteniyor; gerisi gerektiğinde bakılır.",
      },
      {
        kind: "gapfill",
        text: "Probation lasts ___ months.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„Your probation lasts three months.“",
      },
      {
        kind: "short_answer",
        text: "Where do most people learn more than in the induction?",
        options: [],
        answer: 0,
        accept: ["at that table", "in the canteen", "at lunch"],
        explain: "„most people learn more at that table than in the induction“.",
      },
      {
        text: "What is the advice at the end?",
        options: [
          "Say early if something feels wrong.",
          "Wait a month before you complain.",
          "Write everything in the handbook.",
        ],
        answer: 0,
        explain: "„If something feels wrong in the first week, say so in the first week.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w7",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Report on a Work Placement",
    genre: "report",
    intro: "Stajını okuluna raporluyorsun: önce iki cümle kur, sonra ne yaptığını ve ne öğrendiğini anlatan bir rapor yaz.",
    gloss: [
      { de: "placement", tr: "staj" },
      { de: "task", tr: "görev" },
      { de: "supervisor", tr: "sorumlu" },
      { de: "to improve", tr: "geliştirmek" },
      { de: "responsibility", tr: "sorumluluk" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Gelecek hafta rapor için sorumlumla görüşeceğim.",
        answer: "I'm meeting my supervisor next week about the report.",
        alternatives: ["I am meeting my supervisor next week about the report."],
        hint: "Kararlaştırılmış bir randevu için present continuous kullanılır.",
      },
      {
        kind: "build",
        tr: "Bence bu deneyim bana iş görüşmelerinde yardımcı olacak.",
        answer: "I think this experience will help me in job interviews.",
        alternatives: ["This experience will help me in job interviews, I think."],
        hint: "Bir tahmin ya da görüş bildiriliyor: „will“ uygundur.",
      },
      {
        kind: "free",
        prompt:
          "Stajın için bir rapor yaz: nerede, ne kadar süre ve hangi bölümde çalıştığını söyle, üç görevini anlat, en çok zorlandığın şeyi yaz, ne öğrendiğini söyle ve okula bir öneri bırak.",
        checklist: [
          "Yer, süre ve bölüm bilgisini yaz",
          "Üç görevini anlat",
          "En zor bulduğun şeyi ve nasıl aştığını yaz",
          "Ne öğrendiğini söyle ve bir öneri bırak",
        ],
        minWords: 100,
        phrases: [
          { de: "I did my placement at … from … to …", tr: "Stajımı …'de … ile … arasında yaptım", en: "" },
          { de: "My main tasks were …", tr: "Başlıca görevlerim …", en: "" },
          { de: "The most difficult part was …", tr: "En zor kısmı … oldu", en: "" },
          { de: "What I learned most was …", tr: "En çok öğrendiğim şey …", en: "" },
          { de: "I would suggest that the school …", tr: "Okula … öneririm", en: "" },
        ],
        sample:
          "I did my placement at Nova Print from 3 March to 28 March, in the customer orders team. " +
          "My main tasks were checking new orders against the file the customer sent, " +
          "answering simple questions by email, and packing finished work for collection. " +
          "In the last week I was also allowed to phone two regular customers about a delay. " +
          "The most difficult part was the email work. I could write the sentences, but I did not " +
          "know how direct I was allowed to be, and my first answer sounded rude to my supervisor. " +
          "She showed me three old emails and after that it became much easier. " +
          "What I learned most was not about printing. It was that asking a short question early " +
          "saves an hour later, and I am much more confident about that now. " +
          "I would suggest that the school prepares us for written English at work, " +
          "because we practise speaking in class but almost never write a short business email.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s7",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "A First Job: Learning or Earning?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir tercihi gerekçelendir ve sınırını söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "İlk iş öncelikle öğrenmek için mi olmalı, yoksa para kazanmak için mi? Görüşünü söyle, bir örnek ver, karşı tarafın en güçlü noktasını kabul et ve kendi sonucunu bağla.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Bir örnekle destekle",
        "Karşı tarafın haklı olduğu noktayı söyle",
        "Kendi sonucunu bağla",
      ],
      targets: [
        { de: "If I had to choose, I would say …", tr: "Seçmek zorunda kalsam … derdim" },
        { de: "A good example of this is …", tr: "Buna iyi bir örnek …" },
        { de: "To be fair, the other side has a point when …", tr: "Doğrusu, karşı taraf … konusunda haklı" },
        { de: "So in the end it comes down to …", tr: "Yani sonuçta iş şuna geliyor: …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "If I had to choose, I would say learning, but only because a first job is short. " +
        "You usually leave after a year, and what you take with you is not the money, " +
        "it is knowing how a workplace actually runs. " +
        "A good example of this is a friend of mine who took the better paid of two offers " +
        "and spent eight months putting boxes on a shelf on her own. " +
        "She saved more than I did, but she still doesn't know how to ask a manager for anything, " +
        "and that costs her something in every interview. " +
        "To be fair, the other side has a point when money is not optional. " +
        "If you are paying rent, a job that teaches you a lot and pays badly is not a choice, " +
        "it is a problem, and nobody should be told that experience is enough. " +
        "So in the end it comes down to whether you can afford the difference. " +
        "If you can, take the job where somebody will talk to you.",
      rubricHint:
        "Bir tercih, somut örnek ve karşı tarafa hakkını veren bir cümle beklenir; „If I had to choose“, „To be fair“ ve „it comes down to“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g7",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "will, going to, -ing",
    genre: "grammar",
    intro: "İngilizcede gelecek için tek bir zaman yok; dört ayrı yapı var ve her biri başka bir şey söyler.",
    focus: "Gelecek biçimleri: will, going to, present continuous, present simple",
    gloss: [
      { de: "window", tr: "pencere" },
      { de: "medicine", tr: "tıp" },
      { de: "train", tr: "tren" },
      { de: "course", tr: "kurs" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "will: o anda karar, tahmin, söz",
        tr: "„will“ konuşma ANINDA verilen bir kararı, bir tahmini ya da bir sözü bildirir: „It's cold — I'll close the window.“ Önceden planlanmış bir şey için kullanılmaz. Tahminlerde genellikle „I think“, „probably“, „I'm sure“ ile birlikte gelir.",
        examples: [
          { de: "It's cold. I'll close the window.", tr: "Soğuk. Pencereyi kapatayım.", note: "o anki karar" },
          { de: "I think she will like it.", tr: "Bence bunu beğenecek.", note: "tahmin" },
          { de: "I'll call you tomorrow, I promise.", tr: "Yarın seni ararım, söz.", note: "söz" },
        ],
      },
      {
        heading: "going to: önceden verilmiş karar ve kanıt",
        tr: "„be going to“ iki iş yapar: konuşmadan ÖNCE verilmiş bir kararı („We're going to paint the kitchen“) ve şu anda görünen bir kanıta dayanan tahmini („Look at those clouds — it's going to rain“) bildirir. İkinci kullanımda „will“ yerine bunu seçmek daha doğaldır.",
        examples: [
          { de: "We're going to paint the kitchen.", tr: "Mutfağı boyayacağız.", note: "önceden karar" },
          { de: "Look at those clouds. It's going to rain.", tr: "Şu bulutlara bak. Yağmur yağacak.", note: "kanıt var" },
          { de: "She's going to study medicine.", tr: "Tıp okuyacak.", note: "niyet" },
        ],
      },
      {
        heading: "present continuous ve present simple",
        tr: "Present continuous kesinleşmiş bir RANDEVU için kullanılır: „I'm meeting her at six“ — saat belli, karşı taraf biliyor. Present simple ise TARİFELER için: „The train leaves at 7.40“, „The course starts on Monday“. Kişisel plan değil, sabit bir program anlatır.",
        examples: [
          { de: "I'm meeting my supervisor at six.", tr: "Altıda sorumlumla buluşuyorum.", note: "randevu" },
          { de: "The train leaves at seven forty.", tr: "Tren yedi kırkta kalkıyor.", note: "tarife" },
          { de: "The course starts on Monday.", tr: "Kurs pazartesi başlıyor.", note: "program" },
        ],
      },
    ],
    questions: [
      {
        text: "It's cold in here. I ___ the window.",
        options: ["'m closing", "'m going to close", "'ll close"],
        answer: 2,
        explain: "Karar konuşma anında veriliyor: will.",
      },
      {
        text: "Look at those clouds! It ___.",
        options: ["will rain", "is going to rain", "rains"],
        answer: 1,
        explain: "Şu anda görünen bir kanıt var: going to.",
      },
      {
        text: "The train ___ at seven forty.",
        options: ["leaves", "is leaving", "will leave"],
        answer: 0,
        explain: "Tarife bildiriliyor: present simple.",
      },
      {
        kind: "gapfill",
        text: "We ___ going to paint the kitchen next month. (be)",
        options: [],
        answer: 0,
        accept: ["are", "'re"],
        explain: "„be going to“ yapısında „be“ özneye göre çekilir.",
      },
      {
        kind: "gapfill",
        text: "I ___ my supervisor at six — it's in the calendar. (meet)",
        options: [],
        answer: 0,
        accept: ["'m meeting", "am meeting"],
        explain: "Kesinleşmiş randevu: present continuous.",
      },
      {
        kind: "gapfill",
        text: "I think she ___ like it. (a prediction)",
        options: [],
        answer: 0,
        accept: ["will", "'ll"],
        explain: "Kanıtsız bir tahmin: will.",
      },
      {
        kind: "gapfill",
        text: "The course ___ on Monday. (start, program)",
        options: [],
        answer: 0,
        accept: ["starts"],
        explain: "Sabit bir program: present simple.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["She's", "going to", "study", "medicine"],
        explain: "be going to + yalın fiil + nesne.",
      },
      {
        kind: "truefalse",
        text: "„Look at those clouds — it will rain.“ — Bu en doğal seçim mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "Görünen bir kanıt varsa „going to“ tercih edilir.",
      },
      {
        kind: "truefalse",
        text: "„I'm meeting her at six.“ — Bu cümle kesinleşmiş bir randevu bildirir mi?",
        options: ["True", "False"],
        answer: 0,
        explain: "Present continuous gelecekte kararlaştırılmış buluşmaları anlatır.",
      },
    ],
  },
];
