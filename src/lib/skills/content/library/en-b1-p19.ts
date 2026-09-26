import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 19.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 19 yazısız kurallar hattı: yeni bir şehirde kimsenin söylemediği
 * kurallar, kamp alanının karşılama konuşması, doğum günü için salon
 * kiralama e-postası. Dil bilgisi be allowed to ve be supposed to — izin ve
 * beklenen davranış.
 */
export const enB1P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r19",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "The Rules Nobody Writes Down",
    genre: "blog",
    intro: "İş için başka bir şehre taşınan birinin blog yazısı: hiçbir yerde yazmayan üç kural ve onları öğrenmenin yolu.",
    gloss: [
      { de: "trash can", tr: "çöp kutusu" },
      { de: "polite", tr: "kibar" },
      { de: "collection", tr: "toplama" },
      { de: "to fine", tr: "ceza kesmek" },
      { de: "barbecue", tr: "mangal" },
      { de: "host", tr: "ev sahibi" },
      { de: "contract", tr: "sözleşme" },
      { de: "neighbor", tr: "komşu" },
      { de: "confuses", tr: "kafa karıştırmak" },
      { de: "supposed", tr: "-mesi gerekmek" },
    ],
    minutes: 6,
    text:
      "When I moved to Norwich for work, I had read everything about visas, bank accounts and " +
      "doctors. Nobody had written anything about the rules that are never written down, and " +
      "those were the ones I kept breaking.\n\n" +
      "The first one was the trash cans. I put mine out on a Tuesday morning, and by the afternoon there " +
      "was a polite note on my door. In our street you are only allowed to put trash cans out after six " +
      "on the evening before collection. Nobody fined me. The note was worse.\n\n" +
      "The second was a barbecue. A colleague invited me, so I arrived with nothing, the way I " +
      "would at home. Everybody else had brought something: meat, salad, drinks. You are supposed " +
      "to bring something even when the host says, “Just bring yourself.” Especially then, it " +
      "turns out.\n\n" +
      "The third still confuses me. At work we are allowed to leave at four on Fridays, and it says " +
      "so in the contract. But nobody does. You are supposed to stay until at least five, and " +
      "nobody can tell me why.\n\n" +
      "My advice to anyone moving here is simple: find one person who will tell you the truth. " +
      "Mine is my neighbor Pat, who wrote the note about the trash cans. We have tea together every " +
      "Sunday now.",
    questions: [
      {
        text: "What had the writer read about before moving?",
        options: ["local festivals", "visas, bank accounts and doctors", "the rules of the street"],
        answer: 1,
        explain: "„I had read everything about visas, bank accounts and doctors.“",
      },
      {
        text: "When are people allowed to put trash cans out in the writer's street?",
        options: [
          "after six on the evening before collection",
          "early on the morning of collection",
          "at any time on a Tuesday",
        ],
        answer: 0,
        explain: "„you are only allowed to put trash cans out after six on the evening before collection“.",
      },
      {
        kind: "truefalse",
        text: "The writer had to pay a fine because of the trash cans.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody fined me. The note was worse.“",
      },
      {
        kind: "gapfill",
        text: "The contract says staff are allowed to leave at ___ on Fridays.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„we are allowed to leave at four on Fridays, and it says so in the contract“.",
      },
      {
        kind: "short_answer",
        text: "Who wrote the note about the trash cans?",
        options: [],
        answer: 0,
        accept: ["Pat", "the neighbor", "the writer's neighbor", "a neighbor", "her neighbor Pat", "the neighbor Pat", "his neighbor Pat"],
        explain: "„my neighbor Pat, who wrote the note about the trash cans“.",
      },
      {
        text: "What is the writer's advice?",
        options: [
          "Read your contract carefully.",
          "Always bring meat to a barbecue.",
          "Find one person who will tell you the truth.",
        ],
        answer: 2,
        explain: "„find one person who will tell you the truth“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l19",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Welcome to Brook Farm Campsite",
    genre: "info",
    intro: "Bir kamp alanında gelenlere kısa bir karşılama konuşması: neye izin var, ne beklenmiyor, nehirde nelere dikkat etmeli.",
    gloss: [
      { de: "campsite", tr: "kamp alanı" },
      { de: "tent", tr: "çadır" },
      { de: "lead", tr: "tasma" },
      { de: "barn", tr: "ambar" },
      { de: "speaker", tr: "hoparlör" },
      { de: "advantage", tr: "avantaj" },
      { de: "stone", tr: "taş" },
      { de: "brown", tr: "kahverengi" },
      { de: "sheep", tr: "koyun" },
      { de: "supposed", tr: "-mesi gerekmek" },
    ],
    minutes: 6,
    segments: [
      { text: "Hello and welcome to Brook Farm Campsite. Before you put your tents up, here are the few rules we actually care about." },
      { text: "You're allowed to light a barbecue, but only on the stone areas next to each campsite, never on the grass. The grass stayed brown for a year after one fire." },
      { text: "Dogs are allowed, but they're supposed to be on a leash everywhere except the field behind the barn. There are sheep next door, and the farmer is not a patient man." },
      { text: "Quiet time starts at half past ten. You're not supposed to play music after that, and yes, that includes the small speakers people think we can't hear." },
      { text: "Cars aren't allowed on the field after nine at night, because children are running around in the dark. Please use the parking lot by the gate." },
      { text: "The showers are free, but the hot water runs out at about eight in the morning, so early swimmers have the advantage." },
      { text: "Finally, the river. You're allowed to swim in it, but nobody is watching, and after rain it gets fast very quickly. If the water is brown, stay out." },
      { text: "If you have any problems, the office is open from eight till six, and my number is on the board outside." },
    ],
    questions: [
      {
        text: "Where are barbecues allowed?",
        options: [
          "on the stone areas next to each campsite",
          "anywhere on the grass near the tents",
          "only in the parking lot by the gate",
        ],
        answer: 0,
        explain: "„only on the stone areas next to each campsite, never on the grass“.",
      },
      {
        text: "When are cars not allowed on the field?",
        options: ["before eight in the morning", "during the day", "after nine at night"],
        answer: 2,
        explain: "Karanlıkta çocuklar koşturduğu için gece dokuzdan sonra araba yasak.",
      },
      {
        kind: "truefalse",
        text: "Dogs can be off the lead in the field behind the barn.",
        options: ["True", "False"],
        answer: 0,
        explain: "Tasma her yerde bekleniyor, ambarın arkasındaki tarla hariç.",
      },
      {
        kind: "gapfill",
        text: "Quiet time starts at half past ___.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Quiet time starts at half past ten.“",
      },
      {
        kind: "short_answer",
        text: "What should you do if the river water is brown?",
        options: [],
        answer: 0,
        accept: ["stay out", "stay out of the river", "not swim", "stay out of the water", "don't swim", "not swim in it"],
        explain: "„If the water is brown, stay out.“",
      },
      {
        text: "Why is it better to shower early?",
        options: [
          "The showers close at eight.",
          "The hot water runs out at about eight.",
          "The showers are only free before eight.",
        ],
        answer: 1,
        explain: "„the hot water runs out at about eight in the morning“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w19",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Booking the Hall for a Party",
    genre: "email",
    intro: "Bir doğum günü için mahalle salonunu kiralamak istiyorsun: önce iki cümle kur, sonra kuralları soran net bir e-posta yaz.",
    gloss: [
      { de: "hall", tr: "salon" },
      { de: "deposit", tr: "kapora" },
      { de: "volume", tr: "ses düzeyi" },
      { de: "candle", tr: "mum" },
      { de: "trash bag", tr: "çöp torbası" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi günü kendi yiyeceğimizi getirmemize izin var mı?",
        answer: "Are we allowed to bring our own food on Saturday?",
        alternatives: ["On Saturday are we allowed to bring our own food?"],
        hint: "İzin sorusu: be + özne + allowed to + yalın fiil.",
      },
      {
        kind: "build",
        tr: "Salondan saat on birde çıkmış olmamız gerekiyor.",
        answer: "We're supposed to leave the hall by eleven.",
        alternatives: ["By eleven we're supposed to leave the hall."],
        hint: "Kuralın beklediği davranış: be supposed to + yalın fiil.",
      },
      {
        kind: "free",
        prompt:
          "Kızının yedinci doğum günü partisi için mahalle salonunu cumartesi öğleden sonra kiralamak istiyorsun. Salonun yöneticisine e-posta yaz: kendini ve etkinliği tanıt, neye izin verildiğini sor (müzik, yiyecek, mum), senden ne beklendiğini sor, bir kurala nasıl uyacağını söyle ve kibarca bitir.",
        checklist: [
          "Kendini ve etkinliği tanıt: tarih, saat, kişi sayısı",
          "Neye izin verildiğini sor (be allowed to)",
          "Senden ne beklendiğini sor (be supposed to)",
          "Bir kurala nasıl uyacağını söyle ve kibarca bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "I'd like to book the hall for …", tr: "Salonu … için ayırtmak istiyorum", en: "" },
          { de: "Could you tell me whether we're allowed to …?", tr: "…-memize izin olup olmadığını söyleyebilir misiniz?", en: "" },
          { de: "Are we supposed to … ourselves?", tr: "…'i kendimiz mi yapmamız gerekiyor?", en: "" },
          { de: "I understand that …, so we will …", tr: "…'i anlıyorum, bu yüzden …", en: "" },
          { de: "I look forward to hearing from you.", tr: "Cevabınızı bekliyorum.", en: "" },
        ],
        sample:
          "Dear Mr. Walsh, I'd like to book the small hall for my daughter's seventh birthday party on " +
          "Saturday, June 14, from two until six. There will be about eighteen children and ten adults. " +
          "Before I pay the deposit, I have a few questions. Could you tell me whether we're allowed " +
          "to play music through our own speaker? The children would like to dance, so I'd also like " +
          "to know if there is a volume limit. Are we allowed to bring our own food and a cake with " +
          "candles, or are there rules about fire? " +
          "I've heard that the hall has to be cleaned afterwards. Are we supposed to do that " +
          "ourselves, and should we bring our own trash bags? " +
          "I understand that the hall is used for a yoga class at half past six, so we will leave by " +
          "six at the latest and put all the chairs back. " +
          "Thank you for your help. I look forward to hearing from you. Kind regards, Merve Kaplan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s19",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Should Dogs Be Allowed in Cafés?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: ortak bir alanın kuralını tart ve adil bir çözüm öner.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Köpekler kafelere girebilmeli mi? Görüşünü söyle, kendi gözleminden bir örnek ver, karşı tarafın kaygısını kabul et ve adil bir kural öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Kendi gözleminden bir örnek ver",
        "Karşı tarafın kaygısını kabul et",
        "Adil bir kural öner",
      ],
      targets: [
        { de: "I'm in favor, as long as …", tr: "… olduğu sürece yanlısıyım" },
        { de: "At my local café, for example, …", tr: "Mesela mahallemdeki kafede …" },
        { de: "I completely understand people who …", tr: "… olan insanları çok iyi anlıyorum" },
        { de: "A fair rule would be …", tr: "Adil bir kural … olurdu" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "I'm in favor, as long as the dog is calm and the owner is paying attention. " +
        "At my local café, for example, dogs are allowed inside on weekdays, and most of the time " +
        "you only notice them when you nearly step on one under a table. There is an old man who " +
        "comes every morning with a gray dog that is so quiet that I thought it was a bag the first " +
        "time. For him, that café is probably the only conversation he has all day, and he couldn't " +
        "go if the dog had to stay at home. " +
        "I completely understand people who are afraid of dogs, or who have allergies, and they " +
        "should be able to eat somewhere too. " +
        "A fair rule would be to let each café decide, but to make them say it clearly at the door, " +
        "and to keep one part of the room, or one day of the week, without dogs, so that nobody " +
        "has to guess.",
      rubricHint:
        "Görüş, somut bir gözlem, karşı tarafın kaygısına saygı ve adil bir kural beklenir; „as long as“, „a fair rule would be“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g19",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "Are we allowed to?",
    genre: "grammar",
    intro: "Bir şeyi yapıp yapamayacağımızı sormak iki anlama gelebilir: izin var mı, yoksa yapmamız mı bekleniyor? İngilizce bu ikisini ayrı kalıplarla söyler.",
    focus: "be allowed to ve be supposed to: izin ve beklenen davranış",
    gloss: [
      { de: "to feed", tr: "beslemek" },
      { de: "package", tr: "koli" },
      { de: "gate", tr: "bahçe kapısı" },
      { de: "to smoke", tr: "sigara içmek" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "be allowed to: izin",
        tr: "„be allowed to“ bir kişinin ya da kuralın İZİN verdiğini söyler; edilgen bir yapıdır ve izni kimin verdiği söylenmez. „can“ın aksine her zamanda kullanılabilir: geçmişte „was/were allowed to“, gelecekte „will be allowed to“.",
        examples: [
          { de: "We're allowed to park here on Sundays.", tr: "Pazarları buraya park etmemize izin var.", note: "izin var" },
          { de: "Were you allowed to use your phone at school?", tr: "Okulda telefon kullanmana izin var mıydı?", note: "geçmiş soru" },
          { de: "You won't be allowed to take photos inside.", tr: "İçeride fotoğraf çekmene izin verilmeyecek.", note: "gelecek" },
        ],
      },
      {
        heading: "be supposed to: beklenen davranış",
        tr: "„be supposed to“ bir kuralın, planın ya da insanların BEKLEDİĞİ şeyi anlatır ve çoğu zaman gerçekte olanla çelişir. Türkçedeki „-mesi gerekiyor(du)“ yapısına yakındır ama „must“ kadar güçlü değildir.",
        examples: [
          { de: "You're supposed to take your shoes off here.", tr: "Burada ayakkabı çıkarman bekleniyor.", note: "görgü kuralı" },
          { de: "I'm supposed to be at work now.", tr: "Şu an işte olmam gerekiyor.", note: "ama değilim" },
          { de: "The train was supposed to leave at nine.", tr: "Trenin dokuzda kalkması gerekiyordu.", note: "plan tutmadı" },
        ],
      },
      {
        heading: "Olumsuzlarda anlam",
        tr: "„not allowed to“ açık bir yasaktır. „not supposed to“ ise bir şeyin yapılmaması gerektiğini söyler ama çoğu zaman yine de yapıldığını ima eder.",
        examples: [
          { de: "You're not allowed to smoke in the building.", tr: "Binada sigara içmek yasak.", note: "yasak" },
          { de: "We're not supposed to eat at our desks, but everyone does.", tr: "Aslında masamızda yemek yemememiz gerekiyor ama herkes yiyor.", note: "kural çiğneniyor" },
          { de: "She wasn't supposed to tell anyone.", tr: "Kimseye söylememesi gerekiyordu.", note: "ama söyledi" },
        ],
      },
    ],
    questions: [
      {
        text: "Visitors ___ feed the animals. It's forbidden.",
        options: ["are supposed to", "are allowed to", "aren't allowed to"],
        answer: 2,
        explain: "Açık bir yasak: „not allowed to“.",
      },
      {
        text: "The meeting ___ start at ten, but it began at half past.",
        options: ["is allowed to", "was supposed to", "was allowed"],
        answer: 1,
        explain: "Plan tutmadı: „was supposed to“.",
      },
      {
        text: "Which sentence says there is permission?",
        options: [
          "We're allowed to bring our own drinks.",
          "We're supposed to bring our own drinks.",
          "We're not supposed to bring our own drinks.",
        ],
        answer: 0,
        explain: "İzin „be allowed to“ ile söylenir; „supposed to“ beklentidir.",
      },
      {
        kind: "gapfill",
        text: "Are we ___ to take photos in the museum?",
        options: [],
        answer: 0,
        accept: ["allowed"],
        explain: "İzin sorusu: Are we allowed to …?",
      },
      {
        kind: "gapfill",
        text: "Everyone does it here: you're ___ to thank the driver when you get off the bus. (supposed / allowed)",
        options: [],
        answer: 0,
        accept: ["supposed"],
        explain: "Beklenen davranış: be supposed to.",
      },
      {
        kind: "gapfill",
        text: "When I was a child, I wasn't allowed ___ stay up late.",
        options: [],
        answer: 0,
        accept: ["to"],
        explain: "allowed arkasından „to“ + yalın fiil gelir.",
      },
      {
        kind: "gapfill",
        text: "The package ___ supposed to arrive yesterday, but it didn't. (be)",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "Geçmişteki tutmayan beklenti: was supposed to.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["You're not", "allowed", "to park", "in front of the gate"],
        explain: "Yasak: be not allowed to + yalın fiil.",
      },
      {
        kind: "truefalse",
        text: "„I'm supposed to be at work now, but I'm sick.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Beklenenle gerçek çelişiyor: „supposed to“ tam bu iş içindir.",
      },
      {
        kind: "truefalse",
        text: "„We are allow to use the kitchen.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Edilgen yapı üçüncü hâl ister: „We are allowed to use the kitchen.“",
      },
    ],
  },
];
