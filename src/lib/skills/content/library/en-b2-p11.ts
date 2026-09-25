import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 11.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden ilki (11–20). Kurallar ve emsal:
 * `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 11 turizm hattı: günübirlik ziyaretçiden ücret alan bir kasaba
 * üzerine haber, bir patika bekçisiyle radyo söyleşisi, sezon dışı bir gezi
 * üzerine blog yazısı. Dil bilgisi anlatı zamanları — had done, had been doing.
 */
export const enB2P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r11",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The Town That Charges Day Visitors",
    genre: "article",
    intro: "Bir haber yazısı: kalabalıktan bunalan bir liman kasabası günübirlik ziyaretçiden ücret almaya başlıyor; altı ay sonra ne değişti?",
    gloss: [
      { de: "harbour", tr: "liman" },
      { de: "exempt", tr: "muaf" },
      { de: "to overflow", tr: "taşmak" },
      { de: "leaflet", tr: "broşür" },
      { de: "modest", tr: "mütevazı" },
      { de: "takings", tr: "hasılat" },
      { de: "in effect", tr: "fiilen" },
      { de: "symptom", tr: "belirti" },
      { de: "to spread", tr: "yaymak" },
      { de: "fee", tr: "ücret" },
    ],
    minutes: 8,
    text:
      "The town that charges day visitors\n\n" +
      "Portwick has four thousand residents and, on a good day in August, around eighteen " +
      "thousand visitors, most of whom arrive after ten and have left by six. Last spring the " +
      "town became the first on this coast to charge them: six euros a day, collected at the two " +
      "car parks and the railway station, with overnight guests exempt.\n\n" +
      "The decision did not come out of nowhere. Residents had been complaining for years about " +
      "the queues at the only pharmacy and the bins that overflowed by lunchtime, and the council " +
      "had already tried a parking ban and a leaflet campaign. Neither had changed very much.\n\n" +
      "Six months on, the figures are more modest than either side predicted. Visitor numbers " +
      "fell by about eight per cent, mostly on weekdays, and the fee raised enough to pay for " +
      "extra cleaning and a second summer bus. Local businesses had warned that the charge would " +
      "empty the high street. So far, cafés report takings that are roughly unchanged, because " +
      "the visitors who stayed away were largely those who had been bringing their own food.\n\n" +
      "Not everyone is convinced. Ms Harlow, who runs a gift shop by the harbour, points out that " +
      "the town spent years inviting people to come and is now, in effect, asking them to " +
      "apologise for it. Others argue that the fee treats a symptom. The real trouble, they say, " +
      "is that everyone arrives at the same hour, and a flat charge does nothing about that.\n\n" +
      "The council accepts the point. Next year it plans to try a lower price before ten in the " +
      "morning, to see whether the crowd can be spread across the day rather than simply reduced.",
    questions: [
      {
        text: "Who does not have to pay the charge?",
        options: [
          "visitors who arrive by train",
          "guests who stay overnight",
          "visitors who use the car parks",
        ],
        answer: 1,
        explain: "„with overnight guests exempt“: geceyi kasabada geçirenler ücretten muaf.",
      },
      {
        text: "What had the council tried before the fee?",
        options: [
          "a second bus and extra cleaning",
          "a tax on hotels and guesthouses",
          "a parking ban and a leaflet campaign",
        ],
        answer: 2,
        explain: "Ücretten önce park yasağı ve broşür kampanyası denenmiş, ikisi de pek bir şey değiştirmemiş.",
      },
      {
        kind: "truefalse",
        text: "Most of the fall in visitor numbers happened on weekdays.",
        options: ["True", "False"],
        answer: 0,
        explain: "„fell by about eight per cent, mostly on weekdays“.",
      },
      {
        kind: "gapfill",
        text: "Visitor numbers fell by about ___ per cent.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„Visitor numbers fell by about eight per cent“.",
      },
      {
        kind: "short_answer",
        text: "What does the council plan to try next year?",
        options: [],
        answer: 0,
        accept: ["a lower price before ten", "a cheaper morning price", "a lower early price"],
        explain: "Kalabalığı güne yaymak için sabah ondan önce daha düşük bir fiyat denenecek.",
      },
      {
        text: "According to some critics, what is the real problem?",
        options: [
          "Everyone arrives at the same time.",
          "The fee is far too low to matter.",
          "The shops close much too early.",
        ],
        answer: 0,
        explain: "„everyone arrives at the same hour“ ve sabit bir ücret buna hiçbir şey yapmıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l11",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "The Path That Went Viral",
    genre: "interview",
    intro: "Bir radyo söyleşisi: tek bir fotoğrafla ünlenen bir patikayı yöneten kişi ne olduğunu ve ne yaptıklarını anlatıyor.",
    gloss: [
      { de: "verge", tr: "yol kenarı" },
      { de: "ditch", tr: "hendek" },
      { de: "to collapse", tr: "çökmek" },
      { de: "trainers", tr: "spor ayakkabı" },
      { de: "stroll", tr: "gezinti" },
      { de: "booking", tr: "rezervasyon" },
      { de: "uncertainty", tr: "belirsizlik" },
      { de: "weakness", tr: "zayıf nokta" },
      { de: "damage", tr: "hasar" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Host", text: "Two years ago, almost nobody walked to Hollin Falls. Then a single photograph was shared a few million times. Ms Kendal, you manage the trail. What happened next?" },
      { speaker: "Ms Kendal", text: "The first thing we noticed was the verges. People had been parking on the grass along the lane for weeks before anyone told us, and by then the ditch had collapsed in two places." },
      { speaker: "Host", text: "And the path itself? Was it ever built for that kind of number?" },
      { speaker: "Ms Kendal", text: "Not remotely. It was designed for perhaps sixty walkers a day. On the worst Sunday we counted nine hundred, and plenty of them had come in trainers, expecting a short stroll." },
      { speaker: "Host", text: "So you introduced a booking system for the car park. Wasn't that unpopular?" },
      { speaker: "Ms Kendal", text: "Less than we'd feared. Booking is free; what it removes is the uncertainty. People who had driven two hours to find no space were far angrier than people who simply couldn't book." },
      { speaker: "Host", text: "What about the people who don't plan ahead?" },
      { speaker: "Ms Kendal", text: "That's the honest weakness. Local families who used to decide on the morning now find the weekend full. We keep twenty places back for residents, but it isn't a perfect answer." },
      { speaker: "Ms Kendal", text: "What I'd tell any other site is this: count before the photograph, not after. By the time we had real numbers, the damage had already been done." },
    ],
    questions: [
      {
        text: "What caused the sudden rise in walkers?",
        options: [
          "a photograph shared online",
          "a new car park by the lane",
          "a programme on television",
        ],
        answer: 0,
        explain: "Tek bir fotoğraf birkaç milyon kez paylaşılınca patika ünlendi.",
      },
      {
        text: "How many walkers a day was the path designed for?",
        options: ["about nine hundred", "about sixty", "about twenty"],
        answer: 1,
        explain: "„It was designed for perhaps sixty walkers a day.“",
      },
      {
        kind: "truefalse",
        text: "Ms Kendal says that booking made most visitors angrier.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Less than we'd feared“: asıl öfkeli olanlar iki saat gelip yer bulamayanlardı.",
      },
      {
        kind: "gapfill",
        text: "People had been parking on the ___ along the lane.",
        options: [],
        answer: 0,
        accept: ["grass", "verges"],
        explain: "„People had been parking on the grass along the lane for weeks“.",
      },
      {
        kind: "short_answer",
        text: "How many places are kept back for residents?",
        options: [],
        answer: 0,
        accept: ["twenty", "20", "twenty places"],
        explain: "„We keep twenty places back for residents“.",
      },
      {
        text: "What is Ms Kendal's advice to other sites?",
        options: [
          "Charge for every booking.",
          "Close the path on Sundays.",
          "Count visitors early on.",
        ],
        answer: 2,
        explain: "„count before the photograph, not after“: sayı ünlenmeden önce tutulmalı.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w11",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Out of Season",
    genre: "blog",
    intro: "Bir gezi blogu yazıyorsun: önce iki cümle kur, sonra kalabalığıyla bilinen bir yeri sezon dışında ziyaret edişini anlat.",
    gloss: [
      { de: "jetty", tr: "iskele" },
      { de: "to queue", tr: "sıraya girmek" },
      { de: "flask", tr: "termos" },
      { de: "ferry", tr: "feribot" },
      { de: "to survive", tr: "atlatmak" },
      { de: "torch", tr: "el feneri" },
      { de: "crowd", tr: "kalabalık" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Oraya vardığımızda kalabalık çoktan dağılmıştı.",
        answer: "By the time we arrived, the crowds had already gone.",
        alternatives: ["The crowds had already gone by the time we arrived."],
        hint: "Geçmişteki bir andan önce bitmiş olan eylem: had + üçüncü biçim.",
      },
      {
        kind: "build",
        tr: "Saatlerdir yürüyorduk ve kimseyi görmemiştik.",
        answer: "We had been walking for hours and had not seen anyone.",
        alternatives: ["For hours we had been walking and had not seen anyone."],
        hint: "Geçmişteki bir ana kadar süren eylem: had been + -ing.",
      },
      {
        kind: "free",
        prompt:
          "Bir blog yazısı yaz: kalabalığıyla bilinen bir yeri sezon dışında ziyaret ettiğini anlat; ne beklediğini, ne bulduğunu, orada yaşayan biriyle konuşmanı ve neyin daha kötü olduğunu yaz, okura bir öneriyle bitir.",
        checklist: [
          "Ne beklediğini ve neden o zamanı seçtiğini yaz",
          "Ne bulduğunu somut ayrıntılarla anlat",
          "Orada yaşayan biriyle konuşmanı aktar",
          "Bir olumsuzluğu dürüstçe söyle ve bir öneriyle bitir",
        ],
        minWords: 130,
        phrases: [
          { de: "I had wanted to go there for years, but …", tr: "Yıllardır oraya gitmek istiyordum ama …", en: "" },
          { de: "What I had expected was …", tr: "Beklediğim şey …", en: "" },
          { de: "What I found instead was …", tr: "Onun yerine bulduğum şey …", en: "" },
          { de: "Not everything was better: …", tr: "Her şey daha iyi değildi: …", en: "" },
          { de: "If you are planning a trip like this, …", tr: "Böyle bir gezi planlıyorsan …", en: "" },
        ],
        sample:
          "I had wanted to go to the lake for years, but every picture I had seen showed the same " +
          "thing: a wooden jetty with forty people queuing to photograph it. " +
          "So this time I went in the second week of November, on a Tuesday, with a map and a flask. " +
          "What I had expected was a closed village. What I found instead was a village that had " +
          "been waiting to get its own streets back. The bakery was open, the ferry still ran twice " +
          "a day, and the jetty was empty apart from a man repairing a rope. " +
          "He told me he had been working on the boats since he was sixteen, and that summer had " +
          "turned into something he simply survived. “In August I don't talk to anyone,” he said. " +
          "“In November I talk to everyone who comes.” " +
          "Not everything was better: two of the walking routes had been closed for repairs, " +
          "and it was dark by half past four. " +
          "If you are planning a trip like this, ask what the place is like when nobody is " +
          "photographing it. Go then, spend your money in the shops that stay open all year, " +
          "and bring a torch.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s11",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Popular Places Limit Visitors?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir sınırlama yöntemini tart ve kimi dışarıda bıraktığını söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Çok ziyaret edilen yerler ziyaretçi sayısını sınırlamalı mı? Konumunu söyle, gerekçelendir, çoğu zaman gözden kaçan etkeni adlandır ve daha adil bir yöntem öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Bir sınır gerektiren gerekçeni ver",
        "Gözden kaçan etkeni adlandır",
        "Daha adil bir yöntem öner",
      ],
      targets: [
        { de: "I'd limit visitors, but not by price alone.", tr: "Ziyaretçiyi sınırlardım ama yalnız fiyatla değil." },
        { de: "Doing nothing is also a decision: …", tr: "Hiçbir şey yapmamak da bir karardır: …" },
        { de: "What tends to get overlooked is …", tr: "Genelde gözden kaçan şey …" },
        { de: "A fairer option might be …", tr: "Daha adil bir seçenek … olabilir" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "I'd limit visitors, but not by price alone, because a price on its own mostly filters out " +
        "the people with the least money and leaves the crowd more or less where it was. " +
        "The case for some kind of limit is fairly strong. A narrow path or a small village has a " +
        "physical capacity, and once that is passed, the costs land on the people who live there: " +
        "blocked lanes, full bins, a pharmacy you can't get into. " +
        "Doing nothing is also a decision: it simply means residents pay instead of visitors. " +
        "What tends to get overlooked is timing. Most famous places are not full all day. " +
        "They are full between eleven and three and almost empty either side of that, " +
        "and a flat charge does nothing to change it. " +
        "A fairer option might be free booking for the busiest hours, a handful of places kept " +
        "for people who decide on the day, and no charge at all early in the morning. " +
        "That spreads the crowd instead of just shrinking it, and it treats the people who live " +
        "there as residents, not as unpaid staff at somebody else's attraction.",
      rubricHint:
        "Bir konum, somut bir maliyet ve zamanlama gibi gözden kaçan bir etken beklenir; „doing nothing is also a decision“ ve „a fairer option might be“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g11",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "had done, had been doing",
    genre: "grammar",
    intro: "Geçmişi anlatırken iki olayın sırası karışabilir; past perfect hangisinin önce olduğunu, sürekli biçimi ise neyin o ana kadar sürdüğünü söyler.",
    focus: "Anlatı zamanları: past perfect simple ve past perfect continuous",
    gloss: [
      { de: "to arrive", tr: "varmak" },
      { de: "exhausted", tr: "bitkin" },
      { de: "to queue", tr: "sıraya girmek" },
      { de: "ferry", tr: "feribot" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "had done: geçmişten önceki geçmiş",
        tr: "„had + üçüncü biçim“ geçmişteki bir andan ÖNCE tamamlanmış eylemi anlatır. İki olayın sırası önemliyse fark büyüktür: „When we arrived, the ferry had left“ vapurun biz gelmeden gittiğini söyler; „When we arrived, the ferry left“ ise ikisinin art arda olduğunu.",
        examples: [
          { de: "When we arrived, the ferry had already left.", tr: "Vardığımızda vapur çoktan gitmişti.", note: "önce gitti" },
          { de: "When we arrived, the ferry left.", tr: "Biz varınca vapur kalktı.", note: "art arda" },
          { de: "She had never seen the lake before that day.", tr: "O güne kadar gölü hiç görmemişti.", note: "o ana kadarki deneyim" },
        ],
      },
      {
        heading: "had been doing: o ana kadar süren",
        tr: "„had been + -ing“ geçmişteki bir ana kadar SÜREN eylemi anlatır; çoğu zaman bir süreyle („for three hours“) ya da görünen bir sonuçla gelir: yorgunluk, ıslak ayakkabı, uzun bir kuyruk. Vurgu sonuçta değil süreçtedir.",
        examples: [
          { de: "We had been walking for three hours when it started to rain.", tr: "Yağmur başladığında üç saattir yürüyorduk.", note: "süre" },
          { de: "They were exhausted because they had been queuing all morning.", tr: "Bütün sabah kuyrukta bekledikleri için bitkindiler.", note: "görünen sonuç" },
          { de: "Residents had been complaining for years before the council acted.", tr: "Belediye harekete geçmeden önce sakinler yıllardır şikâyet ediyordu.", note: "süre + before" },
        ],
      },
      {
        heading: "Ne zaman gerekmez?",
        tr: "Olaylar sırasıyla anlatılıyorsa past simple yeter: „We parked, walked to the falls and came back.“ „before“ ve „after“ sırayı zaten söylediği için orada past perfect isteğe bağlıdır. Durum fiilleri (know, own, believe) sürekli biçime girmez: „had known“ denir, „had been knowing“ denmez.",
        examples: [
          { de: "We parked, walked to the falls and came back.", tr: "Park ettik, şelaleye yürüdük ve döndük.", note: "sıralı: past simple" },
          { de: "After we had eaten, we took the ferry.", tr: "Yemek yedikten sonra vapura bindik.", note: "after: isteğe bağlı" },
          { de: "I had known him for years.", tr: "Onu yıllardır tanıyordum.", note: "durum fiili" },
        ],
      },
    ],
    questions: [
      {
        text: "When we got to the pier, the ferry ___, so we waited for the next one.",
        options: ["left", "was leaving", "had already left"],
        answer: 2,
        explain: "Vapur biz varmadan önce gitmiş; önceki olay past perfect ile verilir.",
      },
      {
        text: "They were exhausted because they ___ all morning.",
        options: ["had been queuing", "have queued", "are queuing"],
        answer: 0,
        explain: "Geçmişteki bir ana kadar süren ve sonucu görünen eylem: had been + -ing.",
      },
      {
        text: "Which is correct?",
        options: [
          "I had been knowing him for years.",
          "I had known him for years.",
          "I was knowing him for years.",
        ],
        answer: 1,
        explain: "„know“ bir durum fiilidir ve sürekli biçime girmez.",
      },
      {
        kind: "gapfill",
        text: "Before the council acted, residents ___ been complaining for years.",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "Geçmişteki bir ana kadar süren eylem: had been + -ing.",
      },
      {
        kind: "gapfill",
        text: "We had ___ walking for three hours when it started to rain. (be)",
        options: [],
        answer: 0,
        accept: ["been"],
        explain: "Sürekli biçim „had been + -ing“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "She ___ never seen the lake before that day.",
        options: [],
        answer: 0,
        accept: ["had", "'d"],
        explain: "O güne kadarki deneyim past perfect ile anlatılır.",
      },
      {
        kind: "gapfill",
        text: "We parked, ___ to the falls and came back. (walk)",
        options: [],
        answer: 0,
        accept: ["walked"],
        explain: "Olaylar sırasıyla anlatıldığında past simple yeter.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["When we arrived,", "the ferry", "had", "already left"],
        explain: "Yan cümle, ardından özne + had + already + üçüncü biçim.",
      },
      {
        kind: "truefalse",
        text: "„We had been walking for three hours when it started to rain.“ — Yağmur başladığında yürüyüş sürüyor muydu?",
        options: ["True", "False"],
        answer: 0,
        explain: "„had been + -ing“ eylemin o ana kadar sürdüğünü söyler.",
      },
      {
        kind: "truefalse",
        text: "„When we arrived, the ferry left.“ — Bu cümle vapurun biz gelmeden gittiğini söyler mi?",
        options: ["True", "False"],
        answer: 1,
        explain: "Past simple iki olayı art arda verir; önce gittiyse „had left“ gerekir.",
      },
    ],
  },
];
