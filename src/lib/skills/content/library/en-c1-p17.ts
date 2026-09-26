import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 17.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 17 çocuk ve risk hattı: bir macera parkının sorumlusunun portresi,
 * okul bahçesindeki ağaç yasağı üzerine bir veli-müdür konuşması, okul
 * yönetim kuruluna mektup. Dil bilgisi edat olan „to“ + -ing — object to,
 * look forward to, be committed to, when it comes to; B2'deki gerund /
 * infinitive seçiminden farklı olarak burada „to“ mastar değil edattır.
 */
export const enC1P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r17",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Woman Who Stands and Watches",
    genre: "profile",
    intro: "Bir portre: çocukların testere ve ateşle oynadığı bir macera parkını on bir yıldır yöneten bir oyun görevlisi.",
    gloss: [
      { de: "playground", tr: "oyun parkı" },
      { de: "fire pit", tr: "ateş çukuru" },
      { de: "saw", tr: "testere" },
      { de: "to object", tr: "itiraz etmek" },
      { de: "committed", tr: "kararlı" },
      { de: "to judge", tr: "değerlendirmek" },
      { de: "injury", tr: "yaralanma" },
      { de: "burn", tr: "yanık" },
      { de: "splinter", tr: "kıymık" },
      { de: "to persuade", tr: "ikna etmek" },
      { de: "to insist", tr: "ısrar etmek" },
      { de: "to estimate", tr: "kestirmek" },
      { de: "to pretend", tr: "-miş gibi yapmak" },
      { de: "to supervise", tr: "denetlemek" },
    ],
    minutes: 10,
    text:
      "The woman who stands and watches\n\n" +
      "Nell Iwu has run the Ashgrove adventure playground for eleven years, and she still keeps the letter a " +
      "parent sent in her first month. It objected to children being allowed near the fire pit, to the saws in " +
      "the workshop and, most of all, to what it called “a staff who stand and watch”.\n\n" +
      "Standing and watching is the job, she says. The playground is committed to letting children judge risk " +
      "for themselves, and that means adults who are close enough to help but far enough away not to decide. " +
      "When it comes to a nine-year-old climbing a structure she built herself, the worst thing an adult can do " +
      "is shout “be careful”, because it tells the child nothing about what to be careful of.\n\n" +
      "The site has had injuries. In eleven years there have been two broken arms, a number of burns and more " +
      "splinters than anyone has counted. Iwu does not play these down. Her argument is that a playground where " +
      "nothing can go wrong teaches children very little about the places where things can, and that the " +
      "alternative to supervised risk is not safety but unsupervised risk later, somewhere with no adult at all.\n\n" +
      "Not every parent is persuaded, and Iwu has stopped trying to persuade them all. What she insists on instead " +
      "is honesty in both directions. Every family receives a sheet listing the injuries of the previous year, " +
      "with nothing left out. In addition to signing it, parents are invited to spend one afternoon on site " +
      "before their child's first visit.\n\n" +
      "About a third of those who come expecting to object leave having changed their minds, she estimates. " +
      "The rest mostly stay away, and she accepts that. “I would rather lose a family,” she says, “than pretend " +
      "to them that climbing is safe.”",
    questions: [
      {
        text: "What did the parent's letter object to most of all?",
        options: [
          "staff who stand and watch",
          "the fire pit",
          "the saws in the workshop",
        ],
        answer: 0,
        explain: "„most of all, to what it called “a staff who stand and watch”“.",
      },
      {
        text: "Why is shouting “be careful” unhelpful, according to Iwu?",
        options: [
          "It frightens the other children.",
          "It breaks the playground rules.",
          "It doesn't say what to be careful of.",
        ],
        answer: 2,
        explain: "„it tells the child nothing about what to be careful of“.",
      },
      {
        kind: "truefalse",
        text: "Every family receives a list of the previous year's injuries.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Every family receives a sheet listing the injuries of the previous year, with nothing left out.“",
      },
      {
        kind: "gapfill",
        text: "Iwu has run the playground for ___ years.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„has run the Ashgrove adventure playground for eleven years“.",
      },
      {
        kind: "short_answer",
        text: "What are parents invited to do before the first visit?",
        options: [],
        answer: 0,
        accept: ["spend an afternoon on site", "spend one afternoon on site", "spend an afternoon there", "spend one afternoon there", "spend an afternoon at the playground", "visit for an afternoon"],
        explain: "„parents are invited to spend one afternoon on site before their child's first visit“.",
      },
      {
        text: "What does Iwu say is the alternative to supervised risk?",
        options: [
          "complete safety",
          "unsupervised risk later",
          "fewer visits",
        ],
        answer: 1,
        explain: "Denetimli riskin alternatifi güvenlik değil, sonra hiçbir yetişkinin olmadığı bir yerde denetimsiz risk.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l17",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "The Oak Tree Rule",
    genre: "dialogue",
    intro: "Bir veli okul müdürüyle konuşuyor: bahçedeki meşeye tırmanmak yasaklanmış; koşullu bir çözüm bulunabilir mi?",
    gloss: [
      { de: "oak", tr: "meşe" },
      { de: "to ban", tr: "yasaklamak" },
      { de: "branch", tr: "dal" },
      { de: "wrist", tr: "el bileği" },
      { de: "to object", tr: "itiraz etmek" },
      { de: "committed", tr: "kararlı" },
      { de: "conditional", tr: "koşullu" },
      { de: "to supervise", tr: "denetlemek" },
      { de: "qualification", tr: "nitelik" },
      { de: "governor", tr: "okul yönetim kurulu üyesi" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Mr Pajari", text: "I'm not here to complain about the teachers. I'm here because my son came home and told me that climbing the oak is now banned. Is that right?" },
      { speaker: "Ms Crowe", text: "It is, since last month. A child fell from a lower branch and broke a wrist, and some parents objected to our having allowed it at all." },
      { speaker: "Mr Pajari", text: "I understand why you reacted. But I'd object to a rule that removes the one thing most of them look forward to all day." },
      { speaker: "Ms Crowe", text: "Believe me, I'm not committed to keeping the ban. I'm committed to not being the head who ignored a warning." },
      { speaker: "Mr Pajari", text: "Then could it be conditional? The lower branches only, one class at a time, with a member of staff nearby." },
      { speaker: "Ms Crowe", text: "That's close to what we had, minus the staff. The problem is people. We have two adults on the playground for two hundred children." },
      { speaker: "Ms Crowe", text: "And those two are also dealing with lost coats, arguments about soccer and the line for the toilets. A tree needs someone whose only job, for twenty minutes, is the tree." },
      { speaker: "Mr Pajari", text: "Parents could help. When it comes to supervising a tree, you don't need a teaching qualification." },
      { speaker: "Ms Crowe", text: "You'd be surprised how few volunteer. But I'll put it to the governors in March, on one condition: you find six parents for a rotation first." },
      { speaker: "Mr Pajari", text: "Six. I'll have a list by Friday." },
    ],
    questions: [
      {
        text: "Why was climbing the oak banned?",
        options: [
          "The tree was found to be unsafe.",
          "Teachers complained about it.",
          "A child fell and broke a wrist.",
        ],
        answer: 2,
        explain: "Alt daldan düşen bir çocuğun bileği kırılmış ve bazı veliler itiraz etmiş.",
      },
      {
        text: "What is Ms Crowe committed to, in her own words?",
        options: [
          "not being the head who ignored a warning",
          "keeping the ban permanently",
          "planting a new tree",
        ],
        answer: 0,
        explain: "Yasağa değil, bir uyarıyı görmezden gelen müdür olmamaya bağlı olduğunu söylüyor.",
      },
      {
        kind: "truefalse",
        text: "Ms Crowe says that many parents usually volunteer.",
        options: ["True", "False"],
        answer: 1,
        explain: "„You'd be surprised how few volunteer.“",
      },
      {
        kind: "gapfill",
        text: "Ms Crowe will put the idea to the governors in ___.",
        options: [],
        answer: 0,
        accept: ["March"],
        explain: "„I'll put it to the governors in March, on one condition“.",
      },
      {
        kind: "short_answer",
        text: "How many parents must Mr Pajari find for the rotation?",
        options: [],
        answer: 0,
        accept: ["six", "6"],
        explain: "Koşul: önce nöbet çizelgesi için altı veli bulmak.",
      },
      {
        text: "What does Mr Pajari propose?",
        options: [
          "cutting down the tree",
          "lower branches only, with an adult nearby",
          "a ban for younger children only",
        ],
        answer: 1,
        explain: "Yalnız alt dallar, her seferinde bir sınıf, yakında bir görevli.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w17",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Letter to the School Governors",
    genre: "formal",
    intro: "Okul yönetim kuruluna yazıyorsun: önce iki cümle kur, sonra bir yasağın koşullu olarak kaldırılmasını öneren resmî bir mektup yaz.",
    gloss: [
      { de: "governor", tr: "okul yönetim kurulu üyesi" },
      { de: "swing", tr: "salıncak" },
      { de: "reasonable", tr: "makul" },
      { de: "hazard", tr: "tehlike" },
      { de: "to supervise", tr: "denetlemek" },
      { de: "independence", tr: "bağımsızlık" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Geçen yıl birkaç veli okulun salıncağı kaldırmasına itiraz etti.",
        answer: "Last year, several parents objected to the school removing the swing.",
        alternatives: ["Several parents objected to the school removing the swing last year."],
        hint: "„object to“daki „to“ bir edattır; arkasından mastar değil -ing gelir.",
      },
      {
        kind: "build",
        tr: "Önümüzdeki yıl altı gönüllü bulmayı taahhüt ediyoruz.",
        answer: "In the coming year, we are committed to finding six volunteers.",
        alternatives: ["We are committed to finding six volunteers in the coming year."],
        hint: "„be committed to“ + -ing: „to“ edattır, „committed to find“ yanlıştır.",
      },
      {
        kind: "free",
        prompt:
          "Okul yönetim kuruluna resmî bir mektup yaz: yasağın gerekçesini anladığını göster, çocukların neyi kaybettiğini söyle, koşullu bir öneri sun, velilerin üstleneceği sorumluluğu belirt ve bir deneme süresi öner.",
        checklist: [
          "Yasağın gerekçesini anladığını göster",
          "Çocukların neyi kaybettiğini söyle",
          "Koşullu bir öneri ve velilerin sorumluluğunu yaz",
          "Bir deneme süresi öner",
        ],
        minWords: 160,
        phrases: [
          { de: "I am writing on behalf of … with regard to …", tr: "… adına … hakkında yazıyorum", en: "" },
          { de: "We fully understand the reasons for …", tr: "…'in gerekçelerini tamamen anlıyoruz", en: "" },
          { de: "We would not object to …, provided that …", tr: "… koşuluyla …'e itiraz etmeyiz", en: "" },
          { de: "Parents are committed to …", tr: "Veliler …'i üstlenmeye kararlı", en: "" },
          { de: "We would welcome the chance to …", tr: "… fırsatını memnuniyetle karşılarız", en: "" },
        ],
        sample:
          "Dear Governors,\n\n" +
          "I am writing on behalf of a group of parents with regard to the ban on climbing the oak tree in the " +
          "junior playground.\n\n" +
          "We fully understand the reasons for the decision. A child was hurt, parents raised concerns, and the " +
          "school has two adults supervising two hundred children at lunchtime. No reasonable person could ask the " +
          "staff to watch a tree as well as everything else.\n\n" +
          "We would ask you to consider what the ban costs, however. For many of the children, the tree is the one " +
          "part of the day they look forward to, and it is the only place at school where they judge a hazard for " +
          "themselves rather than being told about it. That kind of independence is hard to teach any other way.\n\n" +
          "We would not object to strict conditions. We propose that climbing be allowed on the lower branches only, " +
          "one class at a time, and only when a trained parent volunteer is present. Parents are committed to " +
          "providing that supervision: six of us have already agreed to a weekly schedule.\n\n" +
          "We would welcome the chance to run this as a trial for one term and to report back to you at its end, " +
          "including any injuries, however minor.\n\n" +
          "Yours faithfully,\nJuha Pajari",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s17",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "How Much Risk Should Children Be Allowed?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: çocukların alabileceği riskin sınırını ve kimin çizeceğini tart.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Çocukların ne kadar risk almasına izin verilmeli? Konumunu söyle, iki tür riski birbirinden ayır, kaygılı bir velinin en güçlü gerekçesini kabul et ve sınırı kimin çizmesi gerektiğini söyle.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "İki tür riski birbirinden ayır",
        "Kaygılı bir velinin gerekçesini kabul et",
        "Sınırı kimin çizmesi gerektiğini söyle",
      ],
      targets: [
        { de: "When it comes to risk, I think we have the question backwards.", tr: "Risk söz konusu olduğunda soruyu tersinden sorduğumuzu düşünüyorum." },
        { de: "I'd distinguish between … and …", tr: "… ile … arasında ayrım yapardım" },
        { de: "I wouldn't object to …, but I would object to …", tr: "…'e itiraz etmezdim ama …'e ederdim" },
        { de: "The people best placed to judge this are …", tr: "Bunu değerlendirmeye en uygun kişiler …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "When it comes to risk, I think we have the question backwards. We ask how much danger children can be " +
        "allowed, when the more useful question is how they are supposed to learn to judge danger at all. " +
        "I'd distinguish between risks a child can see and risks a child cannot. A high branch, a hot fire and a " +
        "sharp saw are visible: a child can look at them, feel afraid and decide. Traffic, deep water and " +
        "electricity are not like that, and no amount of freedom teaches them safely. " +
        "The worried parent's strongest point is that a broken arm is real and the lesson is only a theory. " +
        "I take that seriously. I wouldn't object to rules, and I wouldn't object to adults being close by. " +
        "What I would object to is removing every visible risk and then being surprised when a teenager has no " +
        "sense of which risks are worth taking. " +
        "The people best placed to judge this are the adults who watch the same children every day, not the " +
        "people who read about one accident. " +
        "So I would give playworkers and teachers clear permission to allow visible risk, and expect them to " +
        "explain their judgment, rather than asking them to prevent every fall.",
      rubricHint:
        "İki tür riskin ayrımı, karşı gerekçenin kabulü ve sorumluluğun kime verileceği beklenir; „when it comes to“, „object to + -ing“ gibi yapılar kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g17",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "object to doing, look forward to hearing",
    genre: "grammar",
    intro: "„to“ her zaman mastar işareti değildir; edat olduğunda arkasından -ing gelir ve C1 yazısının en sık hatası buradadır.",
    focus: "Edat olan to + -ing: object to, look forward to, be committed to, when it comes to (B2'deki gerund/infinitive seçiminden farklı)",
    gloss: [
      { de: "committed", tr: "kararlı" },
      { de: "to object", tr: "itiraz etmek" },
      { de: "playground", tr: "oyun parkı" },
      { de: "to climb", tr: "tırmanmak" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Sınama: to'dan sonra isim gelebiliyor mu?",
        tr: "B2'de „stop smoking“ ile „stop to smoke“ arasındaki fark öğrenildi; orada „to“ mastar işaretiydi. Burada başka bir durum var: bazı kalıplarda „to“ edattır. Sınama basit: „to“dan sonra bir isim koyabiliyorsan („I object to the noise“, „I look forward to the vacation“), fiil de -ing biçiminde gelir: „I object to paying“, „I look forward to hearing from you.“",
        examples: [
          { de: "I look forward to hearing from you.", tr: "Sizden haber almayı dört gözle bekliyorum.", note: "to + -ing" },
          { de: "Some parents objected to the children climbing the tree.", tr: "Bazı veliler çocukların ağaca tırmanmasına itiraz etti.", note: "object to + özne + -ing" },
          { de: "The playground is committed to letting children judge risk.", tr: "Park, çocukların riski kendilerinin değerlendirmesine izin vermeye kararlı.", note: "committed to + -ing" },
        ],
      },
      {
        heading: "Kalıplaşmış öbekler",
        tr: "Bazı öbekler hep edat „to“ taşır ve -ing ister: „when it comes to“, „in addition to“, „the key to“, „contribute to“, „be devoted to“, „be opposed to“. Bunlar resmî ve akademik yazıda sık geçer ve „to“dan sonra yalın fiil yazmak en çok göze batan hatalardandır.",
        examples: [
          { de: "When it comes to supervising a tree, no qualification is needed.", tr: "Bir ağacı gözetmeye gelince hiçbir nitelik gerekmez.", note: "when it comes to" },
          { de: "In addition to signing the form, parents visit the site.", tr: "Formu imzalamanın yanı sıra veliler alanı ziyaret ediyor.", note: "in addition to" },
          { de: "The key to managing risk is practice.", tr: "Riski yönetmenin anahtarı pratiktir.", note: "the key to" },
        ],
      },
      {
        heading: "Karıştırılanlar: agree to do, prefer X to Y",
        tr: "Her „to“ edat değildir: „agree to do“, „refuse to do“, „want to do“ kalıplarında „to“ mastar işaretidir, çünkü arkasına isim gelmez („agree to the plan“ ayrı bir yapıdır). „prefer X to Y“ kalıbında ise ikinci „to“ edattır: „I prefer climbing to watching.“ Ama „would prefer to“ mastar alır: „I'd prefer to wait.“",
        examples: [
          { de: "The principal agreed to review the ban.", tr: "Müdür yasağı gözden geçirmeyi kabul etti.", note: "mastar: agree to do" },
          { de: "Most children prefer climbing to watching.", tr: "Çoğu çocuk izlemektense tırmanmayı tercih eder.", note: "prefer X to Y" },
          { de: "I'd prefer to wait until March.", tr: "Marta kadar beklemeyi tercih ederim.", note: "would prefer to + yalın" },
        ],
      },
    ],
    questions: [
      {
        text: "I look forward to ___ from you.",
        options: ["hear", "hearing", "have heard"],
        answer: 1,
        explain: "„look forward to“daki „to“ edattır; -ing gelir.",
      },
      {
        text: "The principal agreed ___ the ban.",
        options: ["to review", "to reviewing", "reviewing"],
        answer: 0,
        explain: "„agree to do“: burada „to“ mastar işaretidir.",
      },
      {
        text: "Most children prefer climbing ___ watching.",
        options: ["than", "from", "to"],
        answer: 2,
        explain: "„prefer X to Y“ kalıbında ikinci öğeyi edat „to“ bağlar.",
      },
      {
        kind: "gapfill",
        text: "The playground is committed to ___ children judge risk. (let)",
        options: [],
        answer: 0,
        accept: ["letting"],
        explain: "„be committed to“ + -ing.",
      },
      {
        kind: "gapfill",
        text: "When it comes to ___ a tree, no qualification is needed. (supervise)",
        options: [],
        answer: 0,
        accept: ["supervising"],
        explain: "„when it comes to“ edat „to“ taşır.",
      },
      {
        kind: "gapfill",
        text: "In addition to ___ the form, parents visit the site. (sign)",
        options: [],
        answer: 0,
        accept: ["signing"],
        explain: "„in addition to“ + -ing.",
      },
      {
        kind: "gapfill",
        text: "I'd prefer ___ wait until March.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "„would prefer“ mastar alır: „to wait“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Some parents", "objected to", "the children", "climbing the tree"],
        explain: "„object to“ + (-ing'in öznesi) + -ing.",
      },
      {
        kind: "truefalse",
        text: "“We are committed to find six volunteers.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„committed to finding“ olmalı; „to“ burada edattır.",
      },
      {
        kind: "truefalse",
        text: "“The key to managing risk is practice.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„the key to“ + -ing doğru kalıptır.",
      },
    ],
  },
];
