import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 mutfak hattı: kısa bir anlatı, okul yemekleri üzerine bir haber,
 * kantine yazılan mektup. Dil bilgisi phrasal verbs — ayrılabilen ve
 * ayrılamayan biçimler.
 */
export const enB1P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r9",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "The Recipe My Mother Never Wrote Down",
    genre: "story",
    intro: "Kısa bir anlatı: bir tarifi öğrenmeye çalışan biri ve ölçülerin neden hiç yazılmadığı.",
    gloss: [
      { de: "recipe", tr: "tarif" },
      { de: "to measure", tr: "ölçmek" },
      { de: "handful", tr: "avuç" },
      { de: "to taste", tr: "tatmak" },
      { de: "onion", tr: "soğan" },
      { de: "pan", tr: "tencere" },
      { de: "smell", tr: "kokmak" },
      { de: "ingredients", tr: "malzemeler" },
      { de: "brown", tr: "kahverengi" },
    ],
    minutes: 6,
    text:
      "For years I asked my mother for the recipe and for years she gave me the same answer: " +
      "“It's easy, you'll see.” Then she would cook it in front of me and I would still " +
      "not be able to do it.\n\n" +
      "The problem was the measurements. She never used any. A handful of rice, a little salt, " +
      "“until it smells right.” I wrote all of it down once and the result was a pan of " +
      "something my brother described, kindly, as soup.\n\n" +
      "Last winter I tried a different way. Instead of asking her what she put in, I asked her " +
      "what she was looking for. That question she could answer. The onions had to go soft but " +
      "not brown. The rice had to sound different when you moved the spoon. " +
      "She talked for twenty minutes and never mentioned a single amount.\n\n" +
      "I have cooked it eleven times since then. The first three were bad, the next four were " +
      "acceptable, and somewhere around the eighth it started tasting like hers.\n\n" +
      "I still can't write the recipe down. I have tried, and what comes out is either too short " +
      "to help anyone or so long that nobody would read it. " +
      "I understand now why she never wrote it: she wasn't keeping a secret. " +
      "She simply knew that the part that matters doesn't fit on a card.",
    questions: [
      {
        text: "Why couldn't the writer follow the recipe at first?",
        options: [
          "The mother refused to explain it.",
          "There were no measurements.",
          "The ingredients were hard to find.",
        ],
        answer: 1,
        explain: "„She never used any“ — bir avuç pirinç, biraz tuz, „kokusu doğru olana kadar“.",
      },
      {
        text: "What changed last winter?",
        options: [
          "The writer asked what the mother was looking for.",
          "The mother finally wrote it down.",
          "The writer bought a kitchen scale.",
        ],
        answer: 0,
        explain: "Ne koyduğunu değil, neye baktığını sormuş — o soruya cevap verebilmiş.",
      },
      {
        kind: "truefalse",
        text: "The first attempts after that conversation were good.",
        options: ["True", "False"],
        answer: 1,
        explain: "İlk üçü kötü, sonraki dördü idare eder; sekizincide benzemeye başlamış.",
      },
      {
        kind: "gapfill",
        text: "The writer has cooked it ___ times since the conversation.",
        options: [],
        answer: 0,
        accept: ["eleven", "11"],
        explain: "„I have cooked it eleven times since then.“",
      },
      {
        kind: "short_answer",
        text: "What did the onions have to do?",
        options: [],
        answer: 0,
        accept: ["go soft but not brown", "become soft", "go soft"],
        explain: "„The onions had to go soft but not brown.“",
      },
      {
        text: "Why does the writer think the recipe was never written down?",
        options: [
          "It was a family secret.",
          "The important part cannot be written.",
          "The mother could not write well.",
        ],
        answer: 1,
        explain: "„the part that matters doesn't fit on a card“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l9",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "What Gets Left on the Plate",
    genre: "report",
    intro: "Okul yemekleri üzerine kısa bir haber: ne atılıyor, neden atılıyor, ne işe yaradı.",
    gloss: [
      { de: "waste", tr: "israf" },
      { de: "to throw away", tr: "atmak" },
      { de: "portion", tr: "porsiyon" },
      { de: "to weigh", tr: "tartmak" },
      { de: "break", tr: "teneffüs" },
      { de: "timetable", tr: "ders programı" },
      { de: "average", tr: "ortalama" },
      { de: "hire", tr: "işe almak" },
    ],
    minutes: 6,
    segments: [
      { text: "Three schools in the county have been weighing what comes back from the tables, and the numbers are higher than anyone expected." },
      { text: "On an average day, just under a third of the hot food served is thrown away. Vegetables make up most of it." },
      { speaker: "Ms Aldridge", text: "Our first idea was that children don't like vegetables. The weighing showed something else. They eat them on Mondays and leave them on Fridays." },
      { text: "The difference is the timetable. On Fridays lunch is twenty minutes earlier and the break is five minutes shorter." },
      { speaker: "Ms Aldridge", text: "If you have eighteen minutes to queue, eat and get outside, the first thing you give up is the part of the plate you can eat fastest without." },
      { text: "Two of the schools have now made Friday lunch the same length as the other days. Waste there has come down by about a fifth." },
      { text: "The third school could not change the timetable and tried smaller portions with free seconds instead. That worked almost as well and cost nothing." },
      { speaker: "Ms Aldridge", text: "What I'd say to other schools is this: weigh it first. We spent two years talking about taste when the problem was the clock." },
    ],
    questions: [
      {
        text: "How much hot food is thrown away on an average day?",
        options: ["about a fifth", "just under a third", "more than half"],
        answer: 1,
        explain: "„just under a third of the hot food served is thrown away“.",
      },
      {
        text: "What did the weighing actually show?",
        options: [
          "Children never eat vegetables.",
          "The day of the week matters.",
          "The food is badly cooked.",
        ],
        answer: 1,
        explain: "Pazartesi yiyorlar, cuma bırakıyorlar — fark ders programında.",
      },
      {
        kind: "truefalse",
        text: "All three schools changed the Friday timetable.",
        options: ["True", "False"],
        answer: 1,
        explain: "İkisi değiştirdi; üçüncüsü küçük porsiyon ve ücretsiz ilave denedi.",
      },
      {
        kind: "gapfill",
        text: "Waste came down by about a ___ in the two schools.",
        options: [],
        answer: 0,
        accept: ["fifth"],
        explain: "„Waste there has come down by about a fifth.“",
      },
      {
        kind: "short_answer",
        text: "What is Ms Aldridge's advice to other schools?",
        options: [],
        answer: 0,
        accept: ["weigh it first", "weigh the waste", "weigh it"],
        explain: "„weigh it first“ — iki yıl tat konuşmuşlar, sorun saatmiş.",
      },
      {
        text: "Why did the third school's solution work?",
        options: [
          "Smaller portions with free seconds cost nothing.",
          "It hired more kitchen staff.",
          "It stopped serving vegetables.",
        ],
        answer: 0,
        explain: "Neredeyse aynı sonucu vermiş ve hiçbir maliyeti olmamış.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w9",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "A Letter About School Lunches",
    genre: "letter",
    intro: "Okul yönetimine yemekler hakkında yazıyorsun: önce iki cümle kur, sonra somut ve kibar bir mektup yaz.",
    gloss: [
      { de: "to complain", tr: "şikâyet etmek" },
      { de: "pupil", tr: "öğrenci" },
      { de: "timetable", tr: "ders programı" },
      { de: "to suggest", tr: "önermek" },
      { de: "waste", tr: "israf" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kızım yemeğini bitiremediğini söylüyor.",
        answer: "My daughter says she can't finish her lunch.",
        alternatives: ["My daughter says that she cannot finish her lunch."],
        hint: "„say“ arkasından „that“ düşebilir; zaman kayması burada gerekmez çünkü durum sürüyor.",
      },
      {
        kind: "build",
        tr: "Öğle arasını beş dakika uzatmanızı öneriyorum.",
        answer: "I suggest making the lunch break five minutes longer.",
        alternatives: ["I would suggest making the lunch break five minutes longer."],
        hint: "„suggest“ arkasından -ing gelir, „to“ almaz.",
      },
      {
        kind: "free",
        prompt:
          "Okul yönetimine bir mektup yaz: kim olduğunu ve hangi sınıfla ilgili yazdığını söyle, sorunu somut olarak anlat, neye dayandığını yaz, bir çözüm öner ve kibarca bitir.",
        checklist: [
          "Kendini tanıt ve hangi sınıfla ilgili yazdığını söyle",
          "Sorunu somut biçimde anlat",
          "Gözlemine ya da bir veriye dayan",
          "Bir çözüm öner ve kibarca bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "I am writing about …", tr: "… hakkında yazıyorum", en: "" },
          { de: "Over the last few weeks I have noticed that …", tr: "Son haftalarda … fark ettim", en: "" },
          { de: "I understand that …, but …", tr: "…'i anlıyorum ama …", en: "" },
          { de: "Would it be possible to …?", tr: "… mümkün olur mu?", en: "" },
          { de: "Thank you for looking into this.", tr: "İlgilendiğiniz için teşekkürler.", en: "" },
        ],
        sample:
          "Dear Mrs Holt, I am writing about the lunch break for Year 7, where my daughter Selin " +
          "is a pupil. " +
          "Over the last few weeks I have noticed that she comes home hungry on Fridays and " +
          "almost never on other days. When I asked her why, she said she can't finish her lunch " +
          "because the queue is long and the break is shorter on Fridays. " +
          "Two of her friends told her the same thing, so I do not think this is only about my " +
          "daughter being slow. " +
          "I understand that the Friday timetable exists because of the sports hall booking, " +
          "but the result is that food is thrown away and children are hungry in the afternoon. " +
          "Would it be possible to let Year 7 go in first on Fridays, or to make the break " +
          "five minutes longer? " +
          "I would be glad to hear whether the school has looked at how much food comes back " +
          "on different days. Thank you for looking into this. Yours sincerely, Aylin Demir",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s9",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Is It Worth Learning to Cook?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir beceriyi savun ve abartma.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Yemek yapmayı öğrenmeye değer mi? Görüşünü söyle, kendi deneyiminden bir örnek ver, bu tavsiyenin kime uymadığını söyle ve gerçekçi bir başlangıç öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Kendi deneyiminden bir örnek ver",
        "Bu tavsiyenin kime uymadığını söyle",
        "Gerçekçi bir başlangıç öner",
      ],
      targets: [
        { de: "I'd say yes, but not for the reason people usually give.", tr: "Evet derim ama genelde verilen sebepten değil." },
        { de: "In my own case, what changed was …", tr: "Benim durumumda değişen şey …" },
        { de: "I do understand people who …", tr: "… olan insanları gerçekten anlıyorum" },
        { de: "A realistic first step is …", tr: "Gerçekçi bir ilk adım …" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "I'd say yes, but not for the reason people usually give. " +
        "Everyone talks about money and health, and both are true, but the thing that actually " +
        "changed for me was control over my evening. " +
        "In my own case, what changed was learning three meals properly instead of trying " +
        "twenty recipes once each. I cooked the same rice dish eleven times last winter. " +
        "The first three were bad and the eighth was good, and after that I stopped thinking " +
        "about it, which is the whole point. " +
        "I do understand people who work two shifts or who come home at ten at night. " +
        "Telling them to cook is just telling them to sleep less, and I don't think " +
        "anyone learns a skill while they are exhausted. " +
        "A realistic first step is one dish, not a course: choose something you already like, " +
        "make it every week for two months, and don't look at a second recipe until you can " +
        "make the first one without reading anything.",
      rubricHint:
        "Bir gerekçe, kişisel örnek ve gerçekçi bir sınır beklenir; „not for the reason people usually give“, „I do understand people who“ kalıpları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g9",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "turn it off, look after it",
    genre: "grammar",
    intro: "Fiil ile küçük bir sözcük birleşince anlam değişir; ve nesnenin nereye gideceği fiile göre belirlenir.",
    focus: "Phrasal verbs: ayrılabilen ve ayrılamayan biçimler",
    gloss: [
      { de: "to turn off", tr: "kapatmak" },
      { de: "to look after", tr: "bakmak" },
      { de: "to put off", tr: "ertelemek" },
      { de: "to run out of", tr: "tükenmek" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Ayrılabilenler: nesne araya girebilir",
        tr: "Çoğu iki parçalı fiilde nesne ya arada ya sonda durabilir: „turn off the light“ ya da „turn the light off“. Ama nesne bir ZAMİRSE araya girmek ZORUNDADIR: „turn it off“ doğru, „turn off it“ yanlıştır. Bu kural hatasız işler ve ezberlenmeye değer.",
        examples: [
          { de: "Please turn off the light.", tr: "Lütfen ışığı kapat.", note: "isim: sonda olabilir" },
          { de: "Please turn the light off.", tr: "Lütfen ışığı kapat.", note: "isim: arada da olabilir" },
          { de: "Please turn it off.", tr: "Lütfen onu kapat.", note: "zamir: zorunlu olarak arada" },
        ],
      },
      {
        heading: "Ayrılamayanlar: nesne hep sonda",
        tr: "Bazı fiillerde iki parça hiç ayrılmaz ve nesne — isim de zamir de olsa — her zaman sonda durur: „look after the children“, „look after them“. Bu gruba „look for“, „deal with“, „get on with“, „run out of“ da girer. Hangi fiilin hangi grupta olduğu sözlükte yazar.",
        examples: [
          { de: "She looks after her grandmother.", tr: "Büyükannesine bakıyor.", note: "ayrılmaz" },
          { de: "She looks after her.", tr: "Ona bakıyor.", note: "zamir de sonda" },
          { de: "We've run out of milk.", tr: "Sütümüz bitti.", note: "üç parçalı: hiç ayrılmaz" },
        ],
      },
      {
        heading: "Anlam parçadan çıkarılamaz",
        tr: "Bu fiillerin anlamı çoğu zaman parçalarından anlaşılmaz: „give up“ vazgeçmek, „put off“ ertelemek, „take after“ birine benzemek. Aynı fiil farklı parçayla bambaşka anlam alır: „look after“ bakmak, „look for“ aramak, „look up“ (bir bilgiyi) bakmak.",
        examples: [
          { de: "Don't give up now.", tr: "Şimdi vazgeçme.", note: "give up = vazgeçmek" },
          { de: "They put the meeting off.", tr: "Toplantıyı ertelediler.", note: "put off = ertelemek" },
          { de: "I looked the word up.", tr: "Kelimeye baktım.", note: "look up = bakmak" },
        ],
      },
    ],
    questions: [
      {
        text: "Please turn ___.",
        options: ["off it", "it off", "off"],
        answer: 1,
        explain: "Nesne zamirse araya girmek zorundadır.",
      },
      {
        text: "She looks ___ every afternoon.",
        options: ["after her", "her after", "after"],
        answer: 0,
        explain: "„look after“ ayrılmaz; zamir de sonda durur.",
      },
      {
        text: "Which sentence is wrong?",
        options: [
          "They put off the meeting.",
          "They put the meeting off.",
          "They put off it.",
        ],
        answer: 2,
        explain: "Zamir araya girmeliydi: „They put it off.“",
      },
      {
        kind: "gapfill",
        text: "We've run ___ of milk.",
        options: [],
        answer: 0,
        accept: ["out"],
        explain: "„run out of“ üç parçalı ve ayrılmaz bir kalıptır.",
      },
      {
        kind: "gapfill",
        text: "Could you fill ___ this form, please? (in)",
        options: [],
        answer: 0,
        accept: ["in"],
        explain: "„fill in“ ayrılabilir; isim nesne sonda da durabilir.",
      },
      {
        kind: "gapfill",
        text: "I looked the word ___ in the dictionary.",
        options: [],
        answer: 0,
        accept: ["up"],
        explain: "„look up“ bir bilgiye bakmak demektir ve ayrılabilir.",
      },
      {
        kind: "gapfill",
        text: "Don't give ___ now — you're nearly there.",
        options: [],
        answer: 0,
        accept: ["up"],
        explain: "„give up“ vazgeçmek anlamına gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Please", "turn", "the light", "off"],
        explain: "İsim nesne arada ya da sonda durabilir; burada sonda.",
      },
      {
        kind: "truefalse",
        text: "„She looks her after.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„look after“ ayrılmaz: „She looks after her.“",
      },
      {
        kind: "truefalse",
        text: "„Please turn it off.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Zamir nesne iki parçanın arasında durur.",
      },
    ],
  },
];
