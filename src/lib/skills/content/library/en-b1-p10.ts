import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 10.
 *
 * İngilizce kursun B1 satırını ONA tamamlayan son parti. Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 10 para hattı: gelen bir fatura mektubu, bütçe kılavuzu, ilk bütçe
 * için yazılan rehber. Dil bilgisi artikeller — a, the ve hiçbiri.
 */
export const enB1P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r10",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "About Your Electricity Bill",
    genre: "letter",
    intro: "Elektrik şirketinden gelen bir mektup: neden fark çıktı, ne zaman ödenecek, ne yapılabilir.",
    gloss: [
      { de: "bill", tr: "fatura" },
      { de: "meter", tr: "sayaç" },
      { de: "estimate", tr: "tahmini hesap" },
      { de: "instalment", tr: "taksit" },
      { de: "to owe", tr: "borçlu olmak" },
      { de: "account", tr: "hesap" },
    ],
    minutes: 6,
    text:
      "Dear Customer,\n\n" +
      "You are receiving this letter because your latest bill is higher than usual. " +
      "We want to explain why before you call us.\n\n" +
      "For the last eleven months we could not read your meter, so we used an estimate based " +
      "on the flat below yours. In March a colleague finally got access and took a real reading. " +
      "It turned out that the estimate was too low, and the difference has now been added " +
      "to one bill.\n\n" +
      "This means you owe two hundred and forty pounds more than you expected. " +
      "We understand that this is a large amount to arrive at once, and it is not your fault.\n\n" +
      "You have three options. You can pay the full amount by 30 April. You can pay in six " +
      "monthly instalments at no extra cost — just reply to this letter or call us. " +
      "Or, if you send us a photo of your meter every three months, we will move you to " +
      "a lower monthly payment from May.\n\n" +
      "Please do not ignore this letter. If we hear nothing by 30 April, the full amount " +
      "becomes due and a late fee is added, which nobody in this office wants.\n\n" +
      "If your circumstances have changed, phone the number below and ask for the support team. " +
      "That call does not go on your account and it is not a complaint.",
    questions: [
      {
        text: "Why is the bill higher than usual?",
        options: [
          "Prices went up in March.",
          "The estimates were too low for eleven months.",
          "The customer used more electricity.",
        ],
        answer: 1,
        explain: "Sayaç okunamadığı için alt kata göre tahmin yapılmış ve tahmin düşük kalmış.",
      },
      {
        text: "What does the letter say about fault?",
        options: [
          "It is not the customer's fault.",
          "The customer should have sent readings.",
          "The previous tenant is responsible.",
        ],
        answer: 0,
        explain: "„it is not your fault“.",
      },
      {
        kind: "truefalse",
        text: "Paying in instalments costs extra.",
        options: ["True", "False"],
        answer: 1,
        explain: "„in six monthly instalments at no extra cost“.",
      },
      {
        kind: "gapfill",
        text: "The customer owes ___ hundred and forty pounds more.",
        options: [],
        answer: 0,
        accept: ["two", "2"],
        explain: "„you owe two hundred and forty pounds more than you expected“.",
      },
      {
        kind: "short_answer",
        text: "What happens after 30 April if the customer does nothing?",
        options: [],
        answer: 0,
        accept: ["a late fee is added", "a late fee", "the full amount is due"],
        explain: "„the full amount becomes due and a late fee is added“.",
      },
      {
        text: "What does the letter say about calling the support team?",
        options: [
          "It counts as a complaint.",
          "It is recorded on the account.",
          "It is neither recorded nor a complaint.",
        ],
        answer: 2,
        explain: "„That call does not go on your account and it is not a complaint.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l10",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Your First Budget in Four Steps",
    genre: "guide",
    intro: "Kısa bir sesli kılavuz: ilk bütçe nasıl kurulur, hangi adım atlanabilir, hangi hata tekrarlanıyor.",
    gloss: [
      { de: "budget", tr: "bütçe" },
      { de: "rent", tr: "kira" },
      { de: "category", tr: "kalem" },
      { de: "to track", tr: "takip etmek" },
      { de: "to set aside", tr: "ayırmak" },
      { de: "arithmetic", tr: "aritmetik" },
    ],
    minutes: 6,
    segments: [
      { text: "Most people give up on a budget in the second month, and almost always for the same reason: they started with a plan instead of with numbers." },
      { text: "Step one is not planning. It is tracking. For four weeks, write down everything you spend and change nothing at all." },
      { text: "Step two: separate the money that leaves your account whether you like it or not — rent, transport, phone — from the money you actually decide about." },
      { text: "Most budgets fail here, because people try to cut the fixed costs, which takes months, instead of the flexible ones, which takes a day." },
      { text: "Step three: set aside a small amount before you spend anything, not after. If you wait until the end of the month, there is nothing left, and that is not a character problem, it is arithmetic." },
      { text: "Step four: give yourself a category with no rules. A budget with no room in it is a diet, and diets end." },
      { text: "One last thing. Your first budget will be wrong. Expect to change it twice before it fits, and change the numbers rather than giving up on the idea." },
    ],
    questions: [
      {
        text: "Why do most people give up on a budget?",
        options: [
          "They started with a plan instead of numbers.",
          "They earn too little.",
          "They forget the password.",
        ],
        answer: 0,
        explain: "İkinci ayda bırakıyorlar ve sebep hep aynı.",
      },
      {
        text: "What should you do in the first four weeks?",
        options: ["cut spending", "track and change nothing", "open a second account"],
        answer: 1,
        explain: "„write down everything you spend and change nothing at all“.",
      },
      {
        kind: "truefalse",
        text: "The guide advises cutting fixed costs first.",
        options: ["True", "False"],
        answer: 1,
        explain: "Tam tersi: sabit giderleri kesmek aylar alır, esnek olanlar bir gün.",
      },
      {
        kind: "gapfill",
        text: "The guide has ___ steps.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„Your First Budget in Four Steps“ ve dört adım sayılıyor.",
      },
      {
        kind: "short_answer",
        text: "When should you set money aside?",
        options: [],
        answer: 0,
        accept: ["before you spend", "at the beginning", "before spending"],
        explain: "„set aside a small amount before you spend anything, not after“.",
      },
      {
        text: "Why does the guide want a category with no rules?",
        options: [
          "because a budget without room is like a diet",
          "because it is required by banks",
          "because it makes the maths easier",
        ],
        answer: 0,
        explain: "„A budget with no room in it is a diet, and diets end.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w10",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "A Guide for Someone Moving Out",
    genre: "guide",
    intro: "Evden ilk kez ayrılan biri için kılavuz yazıyorsun: önce iki cümle kur, sonra adım adım ve dürüst bir metin yaz.",
    gloss: [
      { de: "deposit", tr: "depozito" },
      { de: "rent", tr: "kira" },
      { de: "to sign", tr: "imzalamak" },
      { de: "contract", tr: "sözleşme" },
      { de: "to afford", tr: "gücü yetmek" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Sözleşmeyi imzalamadan önce depozitoyu kontrol et.",
        answer: "Check the deposit before you sign the contract.",
        alternatives: ["Before you sign the contract, check the deposit."],
        hint: "Emir kipi + zaman yan cümlesi; „before“ arkasından present simple gelir.",
      },
      {
        kind: "build",
        tr: "İlk ay her zaman düşündüğünden pahalıdır.",
        answer: "The first month is always more expensive than you think.",
        alternatives: ["The first month always costs more than you think."],
        hint: "Uzun sıfatta karşılaştırma „more … than“ ile kurulur.",
      },
      {
        kind: "free",
        prompt:
          "Evden ilk kez ayrılan biri için kılavuz yaz: kılavuzun kimin için olduğunu söyle, üç adımı sırayla ve gerekçesiyle ver, en sık yapılan hatayı yaz, kılavuzun neyi vaat etmediğini söyle ve kısa bir cümleyle bitir.",
        checklist: [
          "Kılavuzun kimin için olduğunu yaz",
          "Üç adımı sırayla ve gerekçesiyle ver",
          "En sık yapılan hatayı anlat",
          "Neyi vaat etmediğini söyle ve bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "This guide is for anyone who …", tr: "Bu kılavuz … olan herkes için", en: "" },
          { de: "First, and before anything else, …", tr: "Önce, her şeyden önce, …", en: "" },
          { de: "The reason for this is that …", tr: "Bunun sebebi …", en: "" },
          { de: "The most common mistake is …", tr: "En sık yapılan hata …", en: "" },
          { de: "What this guide can't do is …", tr: "Bu kılavuzun yapamadığı şey …", en: "" },
        ],
        sample:
          "This guide is for anyone who is moving into their first flat and has never signed " +
          "a contract before. " +
          "First, and before anything else, write down what the first month actually costs: " +
          "rent, deposit, and usually a second month in advance. " +
          "The reason for this is that the deposit is the number people forget, and it is often " +
          "the same as one month's rent. " +
          "Second, check the deposit before you sign the contract, and ask in writing when and " +
          "how you get it back. " +
          "Third, read the part about repairs. It is boring, it is always short, and it decides " +
          "who pays when the heating stops in January. " +
          "The most common mistake is looking only at the monthly rent, because that is the " +
          "number in the advertisement. " +
          "What this guide can't do is tell you whether you can afford it. That depends on your " +
          "income, and only you can see that number. " +
          "But if the first month surprises you, something has already gone wrong.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s10",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Should Schools Teach Money?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: bir öneriyi savun ve uygulamasını düşün.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Okullar para yönetimini öğretmeli mi? Görüşünü söyle, hangi konuların öğretileceğini somutlaştır, olası bir itirazı yaz ve nasıl uygulanacağını öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Hangi konuların öğretileceğini somutlaştır",
        "Olası bir itirazı yaz ve cevapla",
        "Nasıl uygulanacağını öner",
      ],
      targets: [
        { de: "I think schools should, but not in the way people imagine.", tr: "Bence öğretmeli ama insanların düşündüğü biçimde değil." },
        { de: "What I would actually teach is …", tr: "Gerçekten öğreteceğim şey …" },
        { de: "Somebody could object that …", tr: "Biri … diye itiraz edebilir" },
        { de: "In practice I would put it …", tr: "Pratikte bunu … koyardım" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "I think schools should, but not in the way people imagine. " +
        "When politicians talk about this, they mean saving and investing, " +
        "and most eighteen-year-olds have nothing to invest. " +
        "What I would actually teach is smaller and more useful: how to read a contract, " +
        "what a deposit is, how much a first month in a flat really costs, " +
        "and what happens if you ignore a letter from an electricity company. " +
        "Those are the things that cost my friends money in their first year, " +
        "and none of them are difficult. " +
        "Somebody could object that families should teach this, and in a good week I agree. " +
        "But a family can only teach what it knows, and that is exactly why the same mistakes " +
        "repeat in the same streets. " +
        "In practice I would not make it a separate subject, because a separate subject gets " +
        "the worst hour of the week. I would put it inside maths, where the arithmetic already " +
        "is, and give it real letters and real contracts instead of made-up examples.",
      rubricHint:
        "Somut içerik, bir itiraz ve uygulama önerisi beklenir; „not in the way people imagine“, „somebody could object that“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g10",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "a, the or nothing?",
    genre: "grammar",
    intro: "Türkçede artikel yok; İngilizcede üç seçenek var ve üçüncüsü boşluktur. Ayrım anlamı taşır.",
    focus: "Artikeller: a/an, the ve sıfır artikel",
    gloss: [
      { de: "advice", tr: "tavsiye" },
      { de: "nurse", tr: "hemşire" },
      { de: "manager", tr: "yönetici" },
      { de: "cinema", tr: "sinema" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "a/an: ilk kez ve herhangi biri",
        tr: "„a/an“ sayılabilen tekil bir isim ilk kez geçtiğinde ya da hangisi olduğu önemli olmadığında kullanılır: „I spoke to a manager.“ Meslek söylerken de gelir: „She's a nurse.“ Seçim yazıma değil SESE bakar: „an hour“ (h susuyor), „a university“ (yu- sesiyle başlıyor).",
        examples: [
          { de: "I spoke to a manager yesterday.", tr: "Dün bir yöneticiyle konuştum.", note: "ilk kez" },
          { de: "She's a nurse.", tr: "Hemşiredir.", note: "meslek" },
          { de: "It took an hour and a half.", tr: "Bir buçuk saat sürdü.", note: "sese göre an" },
        ],
      },
      {
        heading: "the: belli olan",
        tr: "„the“ hem konuşanın hem dinleyenin HANGİSİ olduğunu bildiği durumlarda gelir: daha önce geçmişse („a manager … the manager said“), tek tanesi varsa („the sun“, „the manager of our office“), ya da bağlamdan belliyse („Close the door“). Üstünlük sıfatlarında da zorunludur: „the best“.",
        examples: [
          { de: "The manager said no.", tr: "Yönetici hayır dedi.", note: "daha önce geçti" },
          { de: "Close the door, please.", tr: "Kapıyı kapat lütfen.", note: "bağlamdan belli" },
          { de: "It was the best answer.", tr: "En iyi cevap oydu.", note: "üstünlük → the" },
        ],
      },
      {
        heading: "Sıfır artikel: genel ve sayılamayan",
        tr: "GENEL olarak konuşurken çoğul ve sayılamayan isimler artikel almaz: „Children learn fast“, „Money isn't everything“. „advice, information, news, furniture, work“ sayılamazdır ve „an advice“ denmez — „a piece of advice“ denir. Ayrıca bazı yer kalıplarında artikel düşer: „go to school“, „at work“, „in hospital“ (amaç için); ama „go to the cinema“ artikel alır.",
        examples: [
          { de: "Children learn languages fast.", tr: "Çocuklar dilleri hızlı öğrenir.", note: "genel → artikelsiz" },
          { de: "She gave me some good advice.", tr: "Bana iyi bir tavsiye verdi.", note: "sayılamaz" },
          { de: "We went to the cinema after work.", tr: "İşten sonra sinemaya gittik.", note: "cinema → the, work → artikelsiz" },
        ],
      },
    ],
    questions: [
      {
        text: "I spoke to ___ manager yesterday. ___ manager said no.",
        options: ["the … A", "a … The", "a … A"],
        answer: 1,
        explain: "İlk kez „a“, ikinci kez artık belli olduğu için „the“.",
      },
      {
        text: "___ children learn languages fast.",
        options: ["The", "A", "— (no article)"],
        answer: 2,
        explain: "Genel bir ifade; çoğul isim artikel almaz.",
      },
      {
        text: "She gave me ___ advice.",
        options: ["an", "a good", "some good"],
        answer: 2,
        explain: "„advice“ sayılamaz; „an advice“ denmez.",
      },
      {
        kind: "gapfill",
        text: "It took ___ hour and a half.",
        options: [],
        answer: 0,
        accept: ["an"],
        explain: "„hour“ içinde h susar, kelime ünlüyle başlar.",
      },
      {
        kind: "gapfill",
        text: "Close ___ door, please.",
        options: [],
        answer: 0,
        accept: ["the"],
        explain: "Hangi kapı olduğu bağlamdan bellidir.",
      },
      {
        kind: "gapfill",
        text: "We went to ___ cinema after work.",
        options: [],
        answer: 0,
        accept: ["the"],
        explain: "„go to the cinema“ kalıbı artikel alır.",
      },
      {
        kind: "gapfill",
        text: "She's ___ nurse at the new clinic.",
        options: [],
        answer: 0,
        accept: ["a"],
        explain: "Meslek söylenirken a/an kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["It", "was", "the best", "answer"],
        explain: "Üstünlük sıfatı „the“ ile gelir.",
      },
      {
        kind: "truefalse",
        text: "„She gave me an advice.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„advice“ sayılamaz: „some advice“ ya da „a piece of advice“.",
      },
      {
        kind: "truefalse",
        text: "„Children learn languages fast.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Genel bir ifadede çoğul isim artikelsiz kalır.",
      },
    ],
  },
];
