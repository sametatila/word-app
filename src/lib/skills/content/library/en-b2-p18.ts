import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 18.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 18 nakit para hattı: bankası kapanan bir kasabanın tek nakit
 * noktası olan bakkal üzerine bir portre, nakitsiz olmayı tartışan iki
 * kafe sahibi, yerel gazeteye köşe yazısı. Dil bilgisi vurgu yapıları —
 * emphatic do/does/did, vurgu zamiri (the manager herself) ve the very
 * (C1'deki cleft cümlelerden ve A2'deki dönüşlü zamirden ayrı).
 */
export const enB2P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r18",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The Last Counter in Hollowford",
    genre: "profile",
    intro: "Bir portre yazısı: bankası ve bankamatiği kapanan bir kasabada tek nakit noktası hâline gelen bir bakkal.",
    gloss: [
      { de: "branch", tr: "şube" },
      { de: "cash machine", tr: "bankamatik" },
      { de: "grocery", tr: "bakkal" },
      { de: "pensioner", tr: "emekli" },
      { de: "to withdraw", tr: "para çekmek" },
      { de: "till", tr: "yazar kasa" },
      { de: "to pay in", tr: "yatırmak" },
      { de: "building society", tr: "tasarruf kurumu" },
      { de: "deposit", tr: "para yatırma" },
      { de: "necessity", tr: "zorunluluk" },
      { de: "coin", tr: "bozuk para" },
    ],
    minutes: 8,
    text:
      "The last counter in Hollowford\n\n" +
      "When the bank in Hollowford closed its branch four years ago, and the cash machine outside " +
      "the post office followed a year later, Mr Okonjo's grocery became something it had never " +
      "planned to be: the only place in a town of three thousand people where you can both pay " +
      "with cash and get some back.\n\n" +
      "Every morning between eight and ten, a queue forms that has nothing to do with groceries. " +
      "Pensioners withdraw their weekly money at the till. A plumber pays in yesterday's takings. " +
      "The school's parent association drops off the coins from the summer fair, because neither " +
      "the bank nor the building society will accept a deposit that small any more without an " +
      "appointment in the city.\n\n" +
      "Mr Okonjo does not make money from any of this. Each withdrawal earns him a few cents from " +
      "the card company, and handling cash costs him far more than that in time and insurance. " +
      "When asked why he carries on, he says the answer is simple: if he stopped, none of his " +
      "older customers would have anywhere else to go.\n\n" +
      "Not everyone in town sees cash as a necessity. Most people under forty pay by card or " +
      "phone and have not carried notes in years. Either they have never needed to, or they gave " +
      "up when the machine disappeared.\n\n" +
      "The council has asked the banks to share a small branch one day a week in the library. " +
      "Both of the large banks have said they are “considering the request”. Until they decide, " +
      "the town's financial center is a counter between the bread and the newspapers.",
    questions: [
      {
        text: "Why did the shop become the town's only place to get cash?",
        options: [
          "The council paid him to do it.",
          "He wanted to attract new customers.",
          "The bank and the cash machine closed.",
        ],
        answer: 2,
        explain: "Banka şubesi dört yıl önce, bankamatik bir yıl sonra kapanmış.",
      },
      {
        text: "Why does the parent association bring its coins to the shop?",
        options: [
          "Banks no longer take small deposits easily.",
          "The shop gives them a better rate.",
          "The school insists on using the shop.",
        ],
        answer: 0,
        explain: "Banka da tasarruf kurumu da bu kadar küçük bir yatırımı randevusuz kabul etmiyor.",
      },
      {
        kind: "truefalse",
        text: "Mr Okonjo earns good money from handling cash.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Mr Okonjo does not make money from any of this“; nakit ona kazandığından fazlasına mal oluyor.",
      },
      {
        kind: "gapfill",
        text: "The morning queue forms between eight and ___.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„Every morning between eight and ten, a queue forms“.",
      },
      {
        kind: "short_answer",
        text: "Where might the banks share a small branch?",
        options: [],
        answer: 0,
        accept: ["in the library", "the library"],
        explain: "Belediye bankalardan haftada bir gün kütüphanede ortak bir şube istemiş.",
      },
      {
        text: "How do most people under forty pay?",
        options: ["by cheque", "by card or phone", "in cash at the till"],
        answer: 1,
        explain: "„Most people under forty pay by card or phone“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l18",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Card Only from Monday?",
    genre: "dialogue",
    intro: "İki kafe sahibi nakit almayı bırakıp bırakmamayı tartışıyor: zaman, maliyet ve müdavimler arasında.",
    gloss: [
      { de: "regular", tr: "müdavim" },
      { de: "safe", tr: "para kasası" },
      { de: "to renew", tr: "yenilemek" },
      { de: "to turn away", tr: "geri çevirmek" },
      { de: "card reader", tr: "kart okuyucu" },
      { de: "to donate", tr: "bağışlamak" },
      { de: "counter", tr: "gişe" },
      { de: "review", tr: "yorum" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ms Brennan", text: "I counted it last night. Only one payment in twelve is cash now, and each of those takes about twice as long at the till." },
      { speaker: "Mr Voss", text: "Both of those things are true. But going card-only means telling some of our regulars that we don't want their money, and neither of us wants to do that." },
      { speaker: "Ms Brennan", text: "It isn't only the time. Every Friday one of us drives to the bank in the next town, and last month neither the safe nor the insurance was cheap to renew." },
      { speaker: "Mr Voss", text: "I know. What if we took cash only in the mornings? The older customers mostly come in before eleven anyway." },
      { speaker: "Ms Brennan", text: "Either we take cash or we don't. A half rule confuses everyone, and somebody will be turned away at five past eleven and write a review about it." },
      { speaker: "Mr Voss", text: "Fair point. Then what about the new card reader the business association donated? They offered one to every shop on the street." },
      { speaker: "Ms Brennan", text: "That doesn't help, though. None of our costs come from cards. It's the cash that costs us, and a new reader won't change that." },
      { speaker: "Mr Voss", text: "All right. Let's keep cash for another six months, but ask the council about the shared bank counter they keep mentioning. If that opens, both problems get smaller." },
    ],
    questions: [
      {
        text: "What share of payments is made in cash now?",
        options: ["one in six", "one in twelve", "one in four"],
        answer: 1,
        explain: "„Only one payment in twelve is cash now“.",
      },
      {
        text: "Why does Ms Brennan reject taking cash only in the mornings?",
        options: [
          "The mornings are too busy.",
          "The bank opens at eleven.",
          "A half rule confuses people.",
        ],
        answer: 2,
        explain: "„A half rule confuses everyone“ ve on biri beş geçe biri geri çevrilir.",
      },
      {
        kind: "truefalse",
        text: "Mr Voss does not want to turn regular customers away.",
        options: ["True", "False"],
        answer: 0,
        explain: "Müdavimlere paralarını istemediklerini söylemek ikisinin de istemediği bir şey.",
      },
      {
        kind: "gapfill",
        text: "Every ___, one of them drives to the bank in the next town.",
        options: [],
        answer: 0,
        accept: ["Friday", "friday"],
        explain: "„Every Friday one of us drives to the bank in the next town“.",
      },
      {
        kind: "short_answer",
        text: "For how long will they keep taking cash?",
        options: [],
        answer: 0,
        accept: ["six months", "for six months", "another six months", "for another six months"],
        explain: "„Let's keep cash for another six months“.",
      },
      {
        text: "What does Ms Brennan say about the card reader?",
        options: [
          "It will not lower their costs.",
          "It is too expensive to buy.",
          "Customers do not trust it.",
        ],
        answer: 0,
        explain: "Masrafların hiçbiri karttan gelmiyor; masraf nakitten doğuyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w18",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Cash Is Not Nostalgia",
    genre: "opinion",
    intro: "Yerel bir gazete için köşe yazısı yazıyorsun: önce iki cümle kur, sonra nakit para tartışmasında iki tarafı tartıp bir öneri getir.",
    gloss: [
      { de: "alternative", tr: "seçenek" },
      { de: "nostalgia", tr: "nostalji" },
      { de: "reliable", tr: "güvenilir" },
      { de: "confidence", tr: "özgüven" },
      { de: "surprising", tr: "şaşırtıcı" },
      { de: "sensibly", tr: "makul biçimde" },
      { de: "counter", tr: "gişe" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Ne banka ne de belediye bir çözüm önerdi.",
        answer: "Neither the bank nor the council has offered a solution.",
        alternatives: ["Neither the council nor the bank has offered a solution."],
        hint: "neither … nor zaten olumsuzdur; fiil olumlu kalır ve en yakın özneye uyar.",
      },
      {
        kind: "build",
        tr: "Her müşteri ya nakitle ya kartla ödeyebilmeli.",
        answer: "Every customer should be able to pay either in cash or by card.",
        alternatives: ["Every customer should be able to pay either by card or in cash."],
        hint: "either … or iki seçeneği bağlar; every tekil isim alır.",
      },
      {
        kind: "free",
        prompt:
          "Yerel bir gazete için kısa bir köşe yazısı yaz: nakit parayı savun ya da nakitsiz geçişi destekle; bir sahneyle başla, iki tarafın gerekçesini karşılaştır, karşı görüşe hak ver ve somut bir öneriyle bitir.",
        checklist: [
          "Somut bir sahneyle başla",
          "İki tarafın gerekçesini karşılaştır",
          "Karşı görüşe hak ver",
          "Somut bir öneriyle bitir",
        ],
        minWords: 130,
        phrases: [
          { de: "Anyone who has stood in … knows that …", tr: "… içinde durmuş herkes bilir ki …", en: "" },
          { de: "This is not about nostalgia; it is about …", tr: "Mesele nostalji değil; mesele …", en: "" },
          { de: "Both sides have a point: …", tr: "İki tarafın da haklı olduğu bir yer var: …", en: "" },
          { de: "Neither … nor … will solve this on their own.", tr: "Ne … ne de … bunu tek başına çözer.", en: "" },
          { de: "What would help is …", tr: "İşe yarayacak olan …", en: "" },
        ],
        sample:
          "Anyone who has stood in the queue at a village shop at nine in the morning knows that " +
          "cash has not disappeared; it has simply moved to the places with the fewest " +
          "alternatives. " +
          "This is not about nostalgia; it is about who can still take part in ordinary life. " +
          "A card works well if you have a bank account, a reliable phone and the confidence to " +
          "manage both. For a surprising number of people, one of those three is missing. " +
          "Both sides have a point. Handling cash is expensive for small businesses, and it is " +
          "hardly fair to ask a café owner to run a bank for free. At the same time, every shop " +
          "that stops accepting notes makes the next one's decision easier. " +
          "Neither the banks nor the shops will solve this on their own, because each of them is " +
          "acting sensibly. What would help is a shared counter, paid for by all the banks " +
          "together, in every town that has lost its last branch. It would cost them very little, " +
          "and it would stop each sensible decision from becoming somebody else's problem.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s18",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Shops Have to Accept Cash?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: iki kesimin gerekçesini karşılaştır ve bir orta yol öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Dükkânlar nakit kabul etmek zorunda tutulmalı mı? Konumunu söyle, iki kesimin gerekçesini karşılaştır, yükün bugün kime düştüğünü söyle ve bir orta yol öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "İki kesimin gerekçesini karşılaştır",
        "Yükün bugün kime düştüğünü söyle",
        "Bir orta yol öner",
      ],
      targets: [
        { de: "I'd stop short of forcing every shop to take cash, but …", tr: "Her dükkânı nakit almaya zorlamaya kadar gitmem, ama …" },
        { de: "Both … and … have a genuine case.", tr: "Hem … hem de … gerçekten haklı." },
        { de: "The burden shouldn't fall on …", tr: "Yük … üzerine düşmemeli" },
        { de: "A middle way would be …", tr: "Bir orta yol … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I'd stop short of forcing every shop to take cash, but I do think somebody has to " +
        "guarantee that it can still be used. " +
        "Both small businesses and people who rely on cash have a genuine case. A café that takes " +
        "a handful of cash payments a day still has to count them, store them and drive them to a " +
        "bank that may now be an hour away. On the other side, a pensioner without a smartphone, " +
        "or someone whose partner checks every card payment, may have no real alternative. " +
        "The burden shouldn't fall on the smallest shops just because they happen to be the last " +
        "ones left. That is what is happening now: the supermarket decides, the bank closes its " +
        "branch, and the corner shop quietly turns into a bank without being paid for it. " +
        "A middle way would be to require large retailers and public services to accept cash, " +
        "while leaving small businesses free to choose, and to make the banks fund shared " +
        "counters in towns where every branch has gone. Neither side gets everything it wants, " +
        "but nobody is left out.",
      rubricHint:
        "İki kesimin somut gerekçesi, yükün kime düştüğünün adlandırılması ve uygulanabilir bir orta yol beklenir; „both … and“, „neither side“ ve „a middle way would be“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g18",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "I did pay — the manager herself said so",
    genre: "grammar",
    intro: "Türkçede vurguyu ses ya da „gerçekten, bizzat“ gibi sözcükler taşır; İngilizcede vurgu bir yardımcı fiille, bir zamirle ya da „very“ ile cümlenin içine yerleşir.",
    focus: "Vurgu yapıları: emphatic do/does/did, vurgu için itself/themselves (the manager herself) ve the very — C1'deki cleft cümleler ve A2'deki dönüşlü zamirin temel kullanımı değil",
    gloss: [
      { de: "receipt", tr: "makbuz" },
      { de: "manager", tr: "yönetici" },
      { de: "to insist", tr: "ısrar etmek" },
      { de: "to deny", tr: "inkâr etmek" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Emphatic do: itiraz, zıtlık, ısrar",
        tr: "Olumlu cümleye do/does/did eklemek karşı tarafın şüphesine itiraz eder, bir beklentinin tersini vurgular ya da kibar bir ısrar katar. Ardından fiil yalın hâle döner ve konuşmada vurgu yardımcı fiile düşer: „I did pay“, „I did paid“ değil.",
        examples: [
          { de: "I did pay — here's the receipt.", tr: "Ödedim ama, bakın makbuzu burada.", note: "itiraz: did + yalın fiil" },
          { de: "The bank closed, but it does still have a cash machine.", tr: "Banka kapandı ama bir para çekme makinesi hâlâ var.", note: "zıtlık: yine de" },
          { de: "Do sit down, please.", tr: "Lütfen, buyurun oturun.", note: "emirde kibar ısrar" },
        ],
      },
      {
        heading: "Vurgu zamiri: bizzat, kendisi",
        tr: "A2'de „I made it myself“ kalıbını gördün. Vurgu zamiri ismin hemen ardına da gelir ve „başkası değil, tam o“ anlamı verir. Nesne değildir: çıkarılınca cümle yine tamdır, yalnız vurgu kaybolur.",
        examples: [
          { de: "The manager herself apologized to us.", tr: "Yönetici bizzat kendisi bizden özür diledi.", note: "ismin hemen ardı" },
          { de: "The machine itself works; the problem is the software.", tr: "Makinenin kendisi çalışıyor; sorun yazılımda.", note: "şeyi ötekinden ayırır" },
          { de: "The customers themselves asked for the change.", tr: "Değişikliği müşterilerin kendileri istedi.", note: "başkası değil" },
        ],
      },
      {
        heading: "the very: tam o, ta kendisi",
        tr: "„the very + isim“ bir zamanı, yeri ya da şeyi kesinleştirir: „the very day“ tam o gün demektir. Burada „very“ bir sıfatı güçlendirmez, ismin önünde durur. „the very first / last“ ise sıralamayı güçlendirir.",
        examples: [
          { de: "They closed the branch the very day I opened my account.", tr: "Hesabımı açtığım gün, tam o gün şubeyi kapattılar.", note: "tam o gün" },
          { de: "That's the very machine that kept my card.", tr: "Kartımı yutan makine tam da bu.", note: "ta kendisi" },
          { de: "She was the very last customer to leave.", tr: "Dükkândan en son çıkan müşteri oydu.", note: "the very last" },
        ],
      },
    ],
    questions: [
      {
        text: "“You didn't pay for the coffee.” — “I ___ pay! Here's the receipt.”",
        options: ["was", "did", "have"],
        answer: 1,
        explain: "Geçmişteki bir şeyi itirazla teyit etmek için did + yalın fiil gelir: I did pay.",
      },
      {
        text: "The manager ___ called me back, not her assistant.",
        options: ["her own", "by herself", "herself"],
        answer: 2,
        explain: "„Başkası değil, bizzat o“ anlamını ismin hemen ardındaki herself verir.",
      },
      {
        text: "They closed the branch the ___ week I moved to the town.",
        options: ["very", "much", "same as"],
        answer: 0,
        explain: "„the very + isim“ „tam o“ anlamı verir: the very week.",
      },
      {
        kind: "gapfill",
        text: "She ___ (do) work here — she's just on her lunch break.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "Üçüncü tekil olumlu cümlede vurgu için does gelir, fiil (work) yalın kalır.",
      },
      {
        kind: "gapfill",
        text: "He still denies it, but he ___ (promise) to call me back yesterday.",
        options: [],
        answer: 0,
        accept: ["did promise"],
        explain: "İnkâra karşı geçmişte vurgulu teyit: did + yalın fiil, „did promised“ değil.",
      },
      {
        kind: "gapfill",
        text: "The customers ___ asked for longer opening hours; it wasn't the council's idea. (they)",
        options: [],
        answer: 0,
        accept: ["themselves"],
        explain: "Çoğul isim için vurgu zamiri themselves: başkası değil, müşterilerin kendileri.",
      },
      {
        kind: "gapfill",
        text: "This is the ___ spot where I lost my wallet last week!",
        options: [],
        answer: 0,
        accept: ["very"],
        explain: "„the very“ ile tam o yer, başka bir yer değil, kastedilir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "did", "insist", "on seeing", "the manager"],
        explain: "Vurgu için did öznenin ardına, yalın fiilden önce gelir.",
      },
      {
        kind: "truefalse",
        text: "„I did paid for the coffee.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "did'den sonra fiil yalın olur: I did pay.",
      },
      {
        kind: "truefalse",
        text: "„The building itself is fine, but the rent is too high.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "itself ismin hemen ardında „binanın kendisi“ anlamı verir; cümle doğru.",
      },
    ],
  },
];
