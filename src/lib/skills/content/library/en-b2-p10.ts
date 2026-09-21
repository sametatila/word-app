import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 10.
 *
 * İngilizce kursun B2 satırını ONA tamamlayan son parti. Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 10 politika hattı: bir kılavuz metin, bir sesli rehber, bir blog
 * yazısı. Dil bilgisi gelecekte bakış — will have done, was going to.
 */
export const enB2P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r10",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "Fix the System or Fix the Behaviour?",
    genre: "guide",
    intro: "Bir kılavuz metin: bir sorunu çözerken önce neye bakmalı, hangi sırayla, hangi hata tekrarlanıyor.",
    gloss: [
      { de: "default", tr: "varsayılan" },
      { de: "training", tr: "eğitim" },
      { de: "poster", tr: "afiş" },
      { de: "process", tr: "süreç" },
      { de: "careless", tr: "dikkatsiz" },
      { de: "friction", tr: "sürtünme" },
    ],
    minutes: 8,
    text:
      "Fix the system or fix the behaviour?\n\n" +
      "When something keeps going wrong, organisations reach for training. " +
      "Training is visible, it can be scheduled, and it produces a list of names. " +
      "It is also, in most cases, the last thing that should be tried.\n\n" +
      "A useful order of questions looks like this.\n\n" +
      "First: what is the default? If the wrong outcome happens when nobody does anything, " +
      "no amount of reminding will fix it. Changing a default costs one afternoon and " +
      "outperforms a year of posters. The classic example is the form where the harmful " +
      "option is pre-selected.\n\n" +
      "Second: where is the friction? People take the path that is easiest at the moment " +
      "of the decision, not the path they agreed to in a meeting. If the correct process " +
      "takes four clicks and the wrong one takes none, the process is the problem.\n\n" +
      "Third, and only third: is this actually a knowledge problem? Sometimes it is. " +
      "But before you decide that, check whether the people doing it wrong can explain " +
      "the rule when asked. If they can, they do not need training.\n\n" +
      "By the time most organisations reach this third question, they have already run the " +
      "training and the problem has come back. " +
      "This is not because people are careless. It is because training competes with " +
      "everything that happens after it, while a default competes with nothing.\n\n" +
      "One caution. Systems thinking can become its own excuse. " +
      "“The process made me do it” is true often enough to be dangerous, " +
      "and a team that never looks at behaviour will eventually protect somebody it shouldn't.",
    questions: [
      {
        text: "Why do organisations reach for training first?",
        options: [
          "It is visible and produces a list of names.",
          "It is the cheapest option.",
          "Research shows it works best.",
        ],
        answer: 0,
        explain: "Görünür, programlanabilir ve bir isim listesi üretir.",
      },
      {
        text: "What is the first question the guide recommends?",
        options: ["What is the default?", "Who made the mistake?", "How much does it cost?"],
        answer: 0,
        explain: "Kimse bir şey yapmadığında yanlış sonuç çıkıyorsa hatırlatma çözmez.",
      },
      {
        kind: "truefalse",
        text: "The guide says training is never useful.",
        options: ["True", "False"],
        answer: 1,
        explain: "Üçüncü soruda „Sometimes it is“ diyor; sıralama meselesi.",
      },
      {
        kind: "gapfill",
        text: "Changing a default costs one ___ and outperforms a year of posters.",
        options: [],
        answer: 0,
        accept: ["afternoon"],
        explain: "„Changing a default costs one afternoon“.",
      },
      {
        kind: "short_answer",
        text: "What should people be able to do if it is not a knowledge problem?",
        options: [],
        answer: 0,
        accept: ["explain the rule", "explain it", "state the rule"],
        explain: "Kuralı açıklayabiliyorlarsa eğitime ihtiyaçları yok.",
      },
      {
        text: "What caution does the guide end with?",
        options: [
          "Systems thinking can become an excuse.",
          "Defaults are too expensive to change.",
          "Training should always come first.",
        ],
        answer: 0,
        explain: "Davranışa hiç bakmayan bir ekip sonunda korumaması gereken birini korur.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l10",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Before You Write the Policy",
    genre: "guide",
    intro: "Sesli bir rehber: bir kural yazmadan önce sorulacak sorular ve en sık yapılan üç hata.",
    gloss: [
      { de: "policy", tr: "yönerge" },
      { de: "to enforce", tr: "uygulatmak" },
      { de: "exception", tr: "istisna" },
      { de: "to review", tr: "gözden geçirmek" },
      { de: "deadline", tr: "son tarih" },
      { de: "wording", tr: "ifade biçimi" },
    ],
    minutes: 8,
    segments: [
      { text: "Most policies fail in the same three ways, and all three are visible before the document is written." },
      { text: "The first is that nobody has said who enforces it. A rule without a named person is a wish, and by the time anyone notices, it has been ignored for a year." },
      { speaker: "Mr Ellery", text: "I always ask one question first: what happens on the day somebody breaks this? If the honest answer is nothing, we are writing a poster, not a policy." },
      { text: "The second failure is the exception nobody planned. Every rule meets a case it was not written for, usually within a month." },
      { speaker: "Mr Ellery", text: "Write the exception into the first version. If you don't, the first exception becomes a private decision, and after that the rule means whatever the last manager decided." },
      { text: "The third is the review date. A policy without one will still be in force long after the reason for it has gone." },
      { text: "Set a date before you publish, put it in the document, and treat it as a deadline rather than a suggestion." },
      { speaker: "Mr Ellery", text: "One more thing on wording. If the policy needs more than one reading to understand, it will be enforced inconsistently, and that is worse than having no policy at all." },
    ],
    questions: [
      {
        text: "What is the first failure mentioned?",
        options: [
          "Nobody has said who enforces it.",
          "The wording is too long.",
          "There is no budget.",
        ],
        answer: 0,
        explain: "„A rule without a named person is a wish.“",
      },
      {
        text: "What question does Mr Ellery ask first?",
        options: [
          "what happens when somebody breaks it",
          "how much it will cost",
          "who wrote the first draft",
        ],
        answer: 0,
        explain: "Dürüst cevap „hiçbir şey“ ise yazılan bir afiştir.",
      },
      {
        kind: "truefalse",
        text: "The guide says exceptions should be added later.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Write the exception into the first version.“",
      },
      {
        kind: "gapfill",
        text: "A policy without a ___ date stays in force too long.",
        options: [],
        answer: 0,
        accept: ["review"],
        explain: "„The third is the review date.“",
      },
      {
        kind: "short_answer",
        text: "How soon does a rule usually meet an unplanned case?",
        options: [],
        answer: 0,
        accept: ["within a month", "in a month", "a month"],
        explain: "„usually within a month“.",
      },
      {
        text: "Why does wording matter?",
        options: [
          "Unclear wording leads to inconsistent enforcement.",
          "Long policies cost more to print.",
          "Lawyers prefer short documents.",
        ],
        answer: 0,
        explain: "Tutarsız uygulama, hiç kural olmamasından kötü sayılıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w10",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "What I Got Wrong About a Rule",
    genre: "blog",
    intro: "Bir blog yazısı yazıyorsun: önce iki cümle kur, sonra bir hatayı ve ondan çıkardığın dersi anlat.",
    gloss: [
      { de: "to assume", tr: "varsaymak" },
      { de: "consequence", tr: "sonuç" },
      { de: "to enforce", tr: "uygulatmak" },
      { de: "in hindsight", tr: "sonradan bakınca" },
      { de: "to revise", tr: "gözden geçirmek" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Yıl sonuna kadar kuralı üç kez değiştirmiş olacağız.",
        answer: "By the end of the year we will have changed the rule three times.",
        alternatives: ["We will have changed the rule three times by the end of the year."],
        hint: "Gelecekte bir ana kadar tamamlanan eylem: will have + üçüncü biçim.",
      },
      {
        kind: "build",
        tr: "Bunu ilk sürümde yazacaktım ama vakit yoktu.",
        answer: "I was going to write it into the first version, but there was no time.",
        alternatives: ["I had intended to write it into the first version, but there was no time."],
        hint: "Geçmişte kurulmuş ama gerçekleşmemiş niyet: was/were going to.",
      },
      {
        kind: "free",
        prompt:
          "Bir blog yazısı yaz: yazdığın ya da uyguladığın bir kuralı anlat, neyi varsaydığını söyle, ne olduğunu anlat, sonradan ne anladığını yaz ve okura aktarılabilir bir ders bırak.",
        checklist: [
          "Kuralı ve amacını anlat",
          "Neyi varsaydığını söyle",
          "Ne olduğunu anlat",
          "Sonradan ne anladığını ve aktarılabilir dersi yaz",
        ],
        minWords: 130,
        phrases: [
          { de: "We introduced a rule that …", tr: "… diye bir kural getirdik", en: "" },
          { de: "The assumption behind it was that …", tr: "Arkasındaki varsayım şuydu: …", en: "" },
          { de: "What actually happened was …", tr: "Gerçekte olan şey …", en: "" },
          { de: "In hindsight, the mistake was …", tr: "Sonradan bakınca hata … oldu", en: "" },
          { de: "If you are writing something similar, …", tr: "Benzer bir şey yazıyorsan, …", en: "" },
        ],
        sample:
          "We introduced a rule that every request for equipment had to go through one form. " +
          "The assumption behind it was that people were ordering things twice because nobody " +
          "could see what had already been ordered. " +
          "What actually happened was that requests stopped arriving. " +
          "They did not stop existing; they moved into messages to whoever happened to be " +
          "near the store cupboard, which is exactly where they had been before the form. " +
          "I was going to add an exception for urgent items in the first version, " +
          "but there was no time and I told myself we would see how it went. " +
          "Within three weeks the exception existed anyway — it was just invisible and decided " +
          "by one person. " +
          "In hindsight, the mistake was not the form. It was assuming that a process people " +
          "agreed to in a meeting would beat a process that takes ten seconds at the moment " +
          "of the decision. " +
          "By the end of this year we will have revised the rule twice, and both revisions " +
          "removed steps rather than adding them. " +
          "If you are writing something similar, count the clicks before you count the reasons.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s10",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Change the System or the People?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir öncelik sırası kur ve kendi kuralının sınırını kabul et.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir şey sürekli ters gidiyorsa önce sistemi mi yoksa insanların davranışını mı değiştirmeli? Bir sıra öner, gerekçelendir, kendi kuralının kötüye kullanılabileceği durumu söyle ve bir güvence ekle.",
      bulletsTr: [
        "Bir öncelik sırası öner",
        "Gerekçeni ver",
        "Kuralının kötüye kullanılabileceği durumu söyle",
        "Bir güvence ekle",
      ],
      targets: [
        { de: "My order would be: defaults first, friction second, people last.", tr: "Sıram şöyle olurdu: önce varsayılanlar, sonra sürtünme, en son insanlar." },
        { de: "The reason is simply that …", tr: "Sebep basitçe şu: …" },
        { de: "Where this gets abused is …", tr: "Bunun kötüye kullanıldığı yer …" },
        { de: "So I'd add one safeguard: …", tr: "O yüzden bir güvence eklerdim: …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "My order would be: defaults first, friction second, people last. " +
        "The reason is simply that a default works while everybody is asleep, " +
        "and training has to compete with every single thing that happens after it. " +
        "If the wrong option is the one that occurs when nobody acts, " +
        "then reminding people is a way of paying attention to a problem without solving it. " +
        "I've seen this with a form where the harmful choice was pre-selected. " +
        "Two years of emails changed nothing; unticking the box changed everything in an " +
        "afternoon, and by the end of that quarter the complaint had disappeared from the list. " +
        "Where this gets abused is in the sentence “the system made me do it”. " +
        "That is true often enough to be genuinely dangerous, and a team that only ever looks " +
        "at processes will eventually explain away something that was a decision, " +
        "taken by a person, who knew. " +
        "So I'd add one safeguard: after you have fixed the default and the friction, " +
        "ask whether the people getting it wrong can state the rule. " +
        "If they can, it was never a knowledge problem. If they can't, it never was one either " +
        "— it was a documentation problem, and that is still yours, not theirs.",
      rubricHint:
        "Bir öncelik sırası, somut örnek ve kendi kuralının kötüye kullanımının kabulü beklenir; „where this gets abused“, „I'd add one safeguard“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g10",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "will have done, was going to",
    genre: "grammar",
    intro: "Gelecekteki bir noktadan geriye bakmanın ve geçmişteki bir noktadan ileriye bakmanın ayrı biçimleri var.",
    focus: "Future perfect, future continuous ve future in the past",
    gloss: [
      { de: "to finish", tr: "bitirmek" },
      { de: "figures", tr: "rakamlar" },
      { de: "to postpone", tr: "ertelemek" },
      { de: "report", tr: "rapor" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "will have done: gelecekte bitmiş olacak",
        tr: "„will have + üçüncü biçim“ gelecekteki bir ANA KADAR tamamlanmış olacak bir eylemi anlatır ve neredeyse her zaman bir zaman işaretiyle gelir: „by Friday“, „by the end of the year“, „by the time you arrive“.",
        examples: [
          { de: "By Friday we will have finished the report.", tr: "Cumaya kadar raporu bitirmiş olacağız.", note: "by + zaman" },
          { de: "By the time you arrive, they will have left.", tr: "Sen varana kadar gitmiş olacaklar.", note: "by the time + present" },
          { de: "We will have changed the rule twice this year.", tr: "Bu yıl kuralı iki kez değiştirmiş olacağız.", note: "sayıyla" },
        ],
      },
      {
        heading: "will be doing: o anda sürüyor olacak",
        tr: "„will be + -ing“ gelecekte belirli bir ANDA sürmekte olacak eylemi anlatır: „This time tomorrow I'll be sitting on a train.“ Ayrıca kibar bir soru biçimi olarak da kullanılır — „Will you be using the room?“ — çünkü bir niyet sormaz, bir durumu sorar.",
        examples: [
          { de: "This time tomorrow I'll be sitting on a train.", tr: "Yarın bu saatte trende oturuyor olacağım.", note: "o anda sürüyor" },
          { de: "Will you be using the meeting room?", tr: "Toplantı odasını kullanacak mısınız?", note: "kibar soru" },
          { de: "They'll be waiting for the decision.", tr: "Kararı bekliyor olacaklar.", note: "sürmekte" },
        ],
      },
      {
        heading: "was going to: gerçekleşmemiş niyet",
        tr: "„was/were going to“ geçmişte kurulmuş ama gerçekleşmemiş bir planı anlatır ve genellikle „but“ ile devam eder: „I was going to write it, but there was no time.“ Aynı işi „had intended to“ ve „was about to“ da görür; ikincisi tam başlamak üzereyken kesilen bir eylem içindir.",
        examples: [
          { de: "I was going to add an exception, but there was no time.", tr: "Bir istisna ekleyecektim ama vakit yoktu.", note: "gerçekleşmedi" },
          { de: "We were about to publish it when the figures changed.", tr: "Tam yayımlamak üzereydik ki rakamlar değişti.", note: "tam o anda" },
          { de: "She had intended to postpone the meeting.", tr: "Toplantıyı erteleme niyetindeydi.", note: "resmî biçim" },
        ],
      },
    ],
    questions: [
      {
        text: "By Friday we ___ the report.",
        options: ["will finish", "will have finished", "will be finishing"],
        answer: 1,
        explain: "Gelecekteki bir ana kadar tamamlanma: will have + üçüncü biçim.",
      },
      {
        text: "This time tomorrow I ___ on a train.",
        options: ["will sit", "will have sat", "will be sitting"],
        answer: 2,
        explain: "Gelecekte belirli bir anda sürmekte olacak eylem.",
      },
      {
        text: "„I was going to write it, but …“ means:",
        options: [
          "I wrote it.",
          "I intended to write it and didn't.",
          "I will write it.",
        ],
        answer: 1,
        explain: "Gerçekleşmemiş bir niyet bildirir.",
      },
      {
        kind: "gapfill",
        text: "By the time you arrive, they ___ left. (will have)",
        options: [],
        answer: 0,
        accept: ["will have", "'ll have"],
        explain: "„by the time“ + present, ana cümlede future perfect.",
      },
      {
        kind: "gapfill",
        text: "We were ___ to publish it when the figures changed. (about)",
        options: [],
        answer: 0,
        accept: ["about"],
        explain: "„be about to“ tam başlamak üzere olmayı bildirir.",
      },
      {
        kind: "gapfill",
        text: "___ you be using the meeting room at four?",
        options: [],
        answer: 0,
        accept: ["Will", "will"],
        explain: "Kibar soru biçimi: will be + -ing.",
      },
      {
        kind: "gapfill",
        text: "She had ___ to postpone the meeting. (intend)",
        options: [],
        answer: 0,
        accept: ["intended"],
        explain: "„had intended to“ gerçekleşmemiş niyetin resmî biçimidir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We", "will have", "changed", "the rule", "twice this year"],
        explain: "will have + üçüncü biçim + nesne + zaman.",
      },
      {
        kind: "truefalse",
        text: "„By Friday we will finish the report.“ — Bu en doğal biçim mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "„by“ ile bir ana kadar tamamlanma anlatılır: „will have finished“.",
      },
      {
        kind: "truefalse",
        text: "„I was going to add an exception, but there was no time.“ — Bu cümle eklendiğini söyler mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "„was going to“ gerçekleşmemiş bir niyeti bildirir.",
      },
    ],
  },
];
