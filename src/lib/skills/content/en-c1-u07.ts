import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 7 — "Yazının atladıkları, itiraz mektubu, ne kadar
 * bağlayıcı, hangi taraf önce".
 *
 * Dört ders: What the article omits · The appeal letter ·
 * How binding is it · Which party comes first.
 *
 *   Kelime: arson, bodily harm, apprehend, impassable, manhunt,
 *           deterrence, insolvency, indebtedness, levy, irrevocable,
 *           deductible, liquidity, warning strike, reduced hours.
 *   Kalıp:  Some articles name arson; others, bodily harm. ·
 *           The police would apprehend if they could. ·
 *           One road is impassable; the other is not. ·
 *           Granted, the insolvency is real, albeit recent. ·
 *           Much as we acknowledge the indebtedness, the client is not insolvent. ·
 *           The levy is irrevocable, whereas the fee is not. ·
 *           The deductible may well be raised. ·
 *           It might have been expected to cover long-term disability. ·
 *           Liquidity would tend to fall first. ·
 *           What the union secured is worker representation on the board. ·
 *           Into the dispute comes a warning strike. ·
 *           The reduced hours we accepted; the cut in sick pay we did not.
 *
 * Ünitenin tek öğretme noktası EKSİLTME. Bir derste üç ayrı büyüklükte
 * delik var: fiil siliniyor ve yerini virgül tutuyor; nesne siliniyor ve
 * geçişli fiil bir kişiyi değil bir siyaseti adlandırmaya başlıyor; yüklem
 * bütünüyle siliniyor ve „is not“ onu tek başına taşıyor. Yeniden ölçüm
 * şaşırtıcı çıkıyor: silme yönü DİLE değil BİÇİME bağlı. İlk cümlede
 * İngilizce virgüle muhtaç, fiili ikinci konuma koyan bir dil ise boş
 * konumun kendisiyle idare ediyor; ikincisinde İngilizce önde (yardımcı
 * fiil tek başına duruyor, Almanca ardına bir „es“ bırakmak zorunda);
 * üçüncüsünde İngilizce geride (Almanca „nicht“i yalnız bırakıyor,
 * İngilizce „is“i tutmak zorunda). Aynı ünite içinde üç satır, üç ayrı yön.
 */
export const enC1U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u07-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 7,
    title: "Manhunt after the warehouse fire",
    genre: "article",
    intro: "Bir depo yangınının ardından polis iki kişiyi arıyor. Arama neden zorlaşıyor?",
    gloss: [
      { de: "search", tr: "aramak" },
      { de: "furniture", tr: "mobilya" },
      { de: "the edge", tr: "kenar" },
      { de: "an owner", tr: "sahip" },
      { de: "a disaster", tr: "felaket" },
      { de: "unhurt", tr: "yara almadan" },
      { de: "a burn", tr: "yanık" },
      { de: "regional", tr: "bölgesel" },
      { de: "an image", tr: "görüntü" },
      { de: "an officer", tr: "polis memuru" },
      { de: "overnight", tr: "gece boyunca" },
      { de: "a truck", tr: "kamyon" },
      { de: "a conference", tr: "konferans" },
      { de: "a burglary", tr: "hırsızlık" },
      { de: "a patrol", tr: "devriye" },
      { de: "directly", tr: "doğrudan" },
      { de: "arrested", tr: "tutuklanmış" },
      { de: "burned", tr: "yanmış" },
      { de: "arson", tr: "kundaklama" },
      { de: "bodily harm", tr: "yaralama" },
      { de: "apprehend", tr: "yakalamak" },
      { de: "impassable", tr: "geçilmez" },
      { de: "a manhunt", tr: "insan avı" },
    ],
    minutes: 12,
    text:
      "Police are searching for two men after a fire destroyed a furniture warehouse on the edge of Millbrook early on Sunday morning. Investigators are treating the fire as arson; the owners, as a disaster that has cost forty jobs.\n" +
      "Two security guards were in the building when the fire started. One escaped unhurt; the other, with burns to his arms and hands. He is in the regional hospital and is expected to recover. Police say the charges will include arson and, because of the injuries to the guard, bodily harm.\n" +
      "A camera across the road recorded two men leaving the site shortly before three in the morning. One was carrying a large bag; the other, a can. The images have been shared online, and officers have asked residents to check their own cameras.\n" +
      "The manhunt has been made harder by the weather. Heavy rain overnight flooded both roads out of the valley. The river road is impassable; the mountain road is not, but it is slow and closed to trucks. Officers have set up checks on the mountain road and at the train station.\n" +
      "„We would apprehend them today if we could,“ said Inspector Laura Voss at a press conference on Sunday afternoon. „We cannot yet. But we know more than they think we do.“\n" +
      "Residents are divided about what the fire means for the town. Some blame the owners, who had reported two earlier burglaries; others, the city, which cut the night patrols last year. The mayor said the patrols would return „as soon as the budget allows“; the police union, that this was not soon enough.\n" +
      "Police say that the reward, like the search, will stay in place until the two men are found. Anyone with information is asked to call the station directly.",
    questions: [
      {
        text: "What happened to the second guard?",
        options: ["He was burned on his arms and hands.", "He escaped unhurt.", "He was arrested."],
        answer: 0,
        explain: "„One escaped unhurt; the other, with burns to his arms and hands.“",
      },
      {
        text: "Which road can still be used?",
        options: ["the mountain road", "the river road", "neither road"],
        answer: 0,
        explain: "„The river road is impassable; the mountain road is not…“",
      },
      {
        kind: "truefalse",
        text: "The owners had reported earlier burglaries.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Some blame the owners, who had reported two earlier burglaries…“",
      },
      {
        kind: "gapfill",
        text: "„We would ___ them today if we could,“ said Inspector Laura Voss.",
        options: [],
        answer: 0,
        accept: ["apprehend"],
        explain: "„We would apprehend them today if we could,“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A fire destroyed a furniture warehouse.",
          "A camera recorded two men leaving the site.",
          "Rain flooded both roads out of the valley.",
          "Residents are divided about the fire.",
        ],
        explain: "Olay, kamera kaydı, arama, en sonda kasabadaki tartışma.",
      },
      {
        kind: "short_answer",
        text: "How many jobs has the fire cost?",
        options: [],
        answer: 0,
        accept: ["forty", "40", "forty jobs"],
        explain: "„the owners, as a disaster that has cost forty jobs.“",
      },
    ],
  },
  {
    id: "en-c1-u07-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 7,
    title: "A payment plan for a bakery",
    genre: "letter",
    intro: "Bir vergi danışmanı, müvekkili fırın adına vergi dairesine itiraz ediyor. Ne istiyor, neyi kabul ediyor?",
    gloss: [
      { de: "on behalf of", tr: "adına" },
      { de: "a refusal", tr: "ret" },
      { de: "an employee", tr: "çalışan" },
      { de: "granted", tr: "kabul etmek gerekir ki" },
      { de: "albeit", tr: "gerçi" },
      { de: "the indebtedness", tr: "borçluluk" },
      { de: "insolvent", tr: "ödeme güçsüzlüğü içinde" },
      { de: "a levy", tr: "harç" },
      { de: "irrevocable", tr: "geri alınamaz" },
      { de: "whereas", tr: "oysa" },
      { de: "an insolvency", tr: "iflas" },
      { de: "a receipt", tr: "makbuz" },
    ],
    minutes: 12,
    text:
      "Dear Ms. Keller,\n" +
      "Re: Hartmann Bakery, appeal against your decision of 3 March\n" +
      "I write on behalf of my client, Hartmann Bakery, to appeal against your decision to refuse a payment plan for the business tax due in April.\n" +
      "Granted, the debts of the bakery are real, albeit recent. The shop lost its main customer, a hotel chain, in November, and it has been paying its suppliers late since January. We do not dispute any of this.\n" +
      "Much as we acknowledge the indebtedness, the business is not insolvent. Its sales in the first quarter were higher than in the same period last year, and its bank has confirmed a new credit line in writing. What it lacks is cash in April, not a future.\n" +
      "Your letter treats the city levy and the tax as the same kind of debt. They are not. The levy is irrevocable, whereas the tax can be paid in parts under your own rules. We have already paid the levy in full, albeit a week late, and we attach the receipt.\n" +
      "My client therefore asks that you accept a payment plan of four monthly amounts, starting in May. Should you prefer a shorter plan, the bakery could manage three, although a payment in July would be difficult, since July is the quietest month for the business.\n" +
      "Granted, a payment plan means more work for your office. But whereas a plan brings you the full amount by August, a refusal is likely to bring you an insolvency case, and the family and its nine employees would lose everything.\n" +
      "I would be grateful for a reply within two weeks. My client is happy to meet at your office at any time.\n" +
      "Yours sincerely,\n" +
      "Tobias Brandt, tax adviser",
    questions: [
      {
        text: "Why did the bakery start paying its suppliers late?",
        options: ["It lost its main customer.", "Its sales fell in the first quarter.", "Its bank closed its account."],
        answer: 0,
        explain: "„The shop lost its main customer, a hotel chain, in November…“",
      },
      {
        text: "How many monthly payments does the client ask for?",
        options: ["four", "three", "nine"],
        answer: 0,
        explain: "„My client therefore asks that you accept a payment plan of four monthly amounts, starting in May.“",
      },
      {
        kind: "truefalse",
        text: "The bakery has not paid the city levy yet.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We have already paid the levy in full, albeit a week late, and we attach the receipt.“",
      },
      {
        kind: "gapfill",
        text: "The levy is irrevocable, ___ the tax can be paid in parts.",
        options: [],
        answer: 0,
        accept: ["whereas"],
        explain: "„The levy is irrevocable, whereas the tax can be paid in parts under your own rules.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The bakery lost a hotel chain as a customer.",
          "Its bank confirmed a new credit line.",
          "The levy has been paid in full.",
          "The adviser asks for a reply within two weeks.",
        ],
        explain: "Borç, işletmenin durumu, harç ile vergi farkı, en sonda cevap talebi.",
      },
      {
        kind: "short_answer",
        text: "Which month is the quietest for the bakery?",
        options: [],
        answer: 0,
        accept: ["July"],
        explain: "„July is the quietest month for the business.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u07-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 7,
    title: "A deal at the factory",
    genre: "dialogue",
    intro: "Sendika temsilcisi, gece süren görüşmelerin sonucunu bir işçiye anlatıyor. Sendika ne kazandı, neyi kabul etti?",
    gloss: [
      { de: "secure", tr: "elde etmek" },
      { de: "flexibility", tr: "esneklik" },
      { de: "dislike", tr: "hoşlanmamak" },
      { de: "uncertainty", tr: "belirsizlik" },
      { de: "a cafeteria", tr: "yemekhane" },
      { de: "representation", tr: "temsil" },
      { de: "reduced hours", tr: "kısa çalışma" },
      { de: "a warning strike", tr: "uyarı grevi" },
      { de: "sick pay", tr: "hastalık ödeneği" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Owen", text: "So, how did it go last night? The whole night shift is asking." },
      { speaker: "Eliza", text: "Better than we expected. What the union secured is worker representation on the board, two seats from next January." },
      { speaker: "Owen", text: "Two seats. And the pay?" },
      { speaker: "Eliza", text: "The reduced hours we accepted; the cut in sick pay we did not. The company wanted both, and it got one." },
      { speaker: "Owen", text: "People will ask why we accepted the hours at all." },
      { speaker: "Eliza", text: "Because what the company really needs is flexibility over the winter. Orders are down by a third, and without shorter hours there would have been job cuts in February." },
      { speaker: "Owen", text: "And the warning strike on Friday? Is it still on?" },
      { speaker: "Eliza", text: "It is off for now. What we promised the members was a vote, and they will get one on Wednesday." },
      { speaker: "Owen", text: "What if they vote no?" },
      { speaker: "Eliza", text: "Then into the dispute comes a warning strike after all. The talks start again from the beginning." },
      { speaker: "Owen", text: "The managers will not like that." },
      { speaker: "Eliza", text: "What they dislike most is uncertainty. A clear vote either way helps everyone, even them." },
      { speaker: "Owen", text: "I will put a note on the board in the cafeteria." },
    ],
    questions: [
      {
        text: "What did the union secure?",
        options: ["worker representation on the board", "higher pay", "a shorter week for everyone"],
        answer: 0,
        explain: "„What the union secured is worker representation on the board, two seats from next January.“",
      },
      {
        text: "Which demand did the union refuse?",
        options: ["the cut in sick pay", "the reduced hours", "the vote"],
        answer: 0,
        explain: "„The reduced hours we accepted; the cut in sick pay we did not.“",
      },
      {
        kind: "truefalse",
        text: "Orders are down by a third.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Orders are down by a third, and without shorter hours there would have been job cuts in February.“",
      },
      {
        kind: "gapfill",
        text: "What we promised the members was a ___.",
        options: [],
        answer: 0,
        accept: ["vote"],
        explain: "„What we promised the members was a vote, and they will get one on Wednesday.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Then into the dispute comes a warning strike after all.",
          "Then into the dispute comes a warning strike after all",
        ],
        explain: "Yer önde, özne sonda: yeni bir şey sahneye çıkıyor.",
      },
      {
        kind: "short_answer",
        text: "When will the members vote?",
        options: [],
        answer: 0,
        accept: ["on Wednesday", "Wednesday"],
        explain: "„they will get one on Wednesday.“",
      },
    ],
  },
  {
    id: "en-c1-u07-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 7,
    title: "Renewing the shop insurance",
    genre: "monologue",
    intro: "Sigorta danışmanı, bir matbaa sahibine poliçe yenilemesi hakkında sesli mesaj bırakıyor. Neye dikkat etmeli?",
    gloss: [
      { de: "a renewal", tr: "yenileme" },
      { de: "an employee", tr: "çalışan" },
      { de: "a premium", tr: "prim" },
      { de: "a deductible", tr: "muafiyet tutarı" },
      { de: "long-term disability", tr: "uzun süreli iş göremezlik" },
      { de: "liquidity", tr: "likidite" },
      { de: "a reserve", tr: "yedek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Esther", text: "Hello Mr. Weber, this is Esther from Sun Insurance, calling about the renewal of the policy for your print shop." },
      { speaker: "Esther", text: "The renewal letter arrived this morning, and I want to go through it with you before you sign anything." },
      { speaker: "Esther", text: "First, the price. The yearly premium goes up by six percent. The deductible may well be raised too, from five hundred to eight hundred dollars, but that part is still under discussion." },
      { speaker: "Esther", text: "Second, the cover. Your old policy might have been expected to cover long-term disability for your two employees. It never did, and the new one does not either." },
      { speaker: "Esther", text: "If that matters to you, and I think it should, we can add it as a separate policy. It would cost around forty dollars a month." },
      { speaker: "Esther", text: "Third, the risks. In a year like this one, liquidity would tend to fall first, before sales do. The policy does not protect you from that; only a cash reserve does." },
      { speaker: "Esther", text: "My advice is to sign the renewal, but only after we have agreed the deductible in writing. A promise on the phone is worth very little in a dispute." },
      { speaker: "Esther", text: "Call me back when you can. I am in the office until six today, and on Friday morning." },
    ],
    questions: [
      {
        text: "How much does the yearly premium go up?",
        options: ["by six percent", "by eight hundred dollars", "by forty dollars"],
        answer: 0,
        explain: "„The yearly premium goes up by six percent.“",
      },
      {
        text: "What does Esther advise?",
        options: ["Sign after agreeing the deductible in writing.", "Look for another insurer.", "Cancel the policy."],
        answer: 0,
        explain: "„My advice is to sign the renewal, but only after we have agreed the deductible in writing.“",
      },
      {
        kind: "truefalse",
        text: "The old policy covered long-term disability.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It never did, and the new one does not either.“",
      },
      {
        kind: "gapfill",
        text: "The deductible may well be ___ too.",
        options: [],
        answer: 0,
        accept: ["raised"],
        explain: "„The deductible may well be raised too, from five hundred to eight hundred dollars…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "In a year like this one, liquidity would tend to fall first, before sales do.",
          "In a year like this one, liquidity would tend to fall first, before sales do",
        ],
        explain: "Temkinli öngörü: „would tend to“ kesinlik vermiyor.",
      },
      {
        kind: "short_answer",
        text: "What protects a business from falling liquidity?",
        options: [],
        answer: 0,
        accept: ["a cash reserve", "cash reserve", "only a cash reserve"],
        explain: "„The policy does not protect you from that; only a cash reserve does.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u07-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 7,
    title: "Notes for the local news",
    genre: "info",
    intro: "Yerel haber bülteni için kısa cümleler kur, sonra olay kartını doldur.",
    gloss: [
      { de: "arson", tr: "kundaklama" },
      { de: "bodily harm", tr: "yaralama" },
      { de: "to apprehend", tr: "gözaltına almak" },
      { de: "impassable", tr: "geçilmez" },
      { de: "furniture", tr: "mobilya" },
      { de: "a warning strike", tr: "uyarı grevi" },
      { de: "reduced hours", tr: "kısa çalışma" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bazı yazılar kundaklama diyor; bazıları yaralama.",
        answer: "Some articles name arson; others, bodily harm.",
        hint: "İkinci yarıda fiil yok; yerini virgül tutuyor.",
      },
      {
        kind: "build",
        tr: "Polis, elinden gelse gözaltına alırdı.",
        answer: "The police would apprehend if they could.",
        hint: "Nesne silinmiş; yardımcı fiil tek başına duruyor.",
      },
      {
        kind: "build",
        tr: "Yollardan biri geçilmez; öteki değil.",
        answer: "One road is impassable; the other is not.",
        hint: "Yüklem gitmiş, „is not“ onu tek başına taşıyor.",
      },
      {
        kind: "build",
        tr: "Sendikanın elde ettiği şey yönetimde çalışan temsili.",
        answer: "What the union secured is worker representation on the board.",
        hint: "Beşinci sözcük „is“: yarık cümle.",
      },
      {
        kind: "build",
        tr: "Uyuşmazlığa bir uyarı grevi giriyor.",
        answer: "Into the dispute comes a warning strike.",
        hint: "Yer başta, özne sonda.",
      },
      {
        kind: "form",
        prompt: "Yerel haber bülteni için olay kartını doldur.",
        facts: "Pazar sabahı Millbrook'ta bir mobilya deposu yandı; polis kundaklamadan şüpheleniyor; iki bekçiden biri yaralandı, öteki kurtuldu; nehir yolu kapalı, dağ yolu açık.",
        fields: [
          { label: "Place", answer: "a furniture warehouse", accept: ["the warehouse", "furniture warehouse"] },
          { label: "Suspected cause", answer: "arson", accept: ["probably arson"] },
          { label: "The two guards", answer: "one hurt, the other not", accept: ["one hurt", "only one hurt"] },
          { label: "Roads", answer: "one closed, the other not", accept: ["river road closed", "mountain road open"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u07-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 7,
    title: "A letter about a debt",
    genre: "info",
    intro: "Borçlu bir işletme adına yazılan itiraz mektubunun cümlelerini kur.",
    gloss: [
      { de: "insolvency", tr: "ödeme aczi" },
      { de: "indebtedness", tr: "borçluluk" },
      { de: "a levy", tr: "harç" },
      { de: "irrevocable", tr: "geri alınamaz" },
      { de: "a deductible", tr: "muafiyet tutarı" },
      { de: "liquidity", tr: "likidite" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kabul, ödeme aczi gerçek, gerçi yeni.",
        answer: "Granted, the insolvency is real, albeit recent.",
        hint: "İki taviz sözcüğü, ama gerçekte hiçbir şey verilmiyor.",
      },
      {
        kind: "build",
        tr: "Borçluluğu ne kadar kabul etsek de müvekkil ödeme aczinde değil.",
        answer: "Much as we acknowledge the indebtedness, the client is not insolvent.",
        hint: "Borcu kabul eden, sonucu reddeden menteşe.",
      },
      {
        kind: "build",
        tr: "Harç geri alınamaz, ücret ise alınabilir.",
        answer: "The levy is irrevocable, whereas the fee is not.",
        hint: "Taviz değil ayrım: soğuk bağlaç.",
      },
      {
        kind: "build",
        tr: "Muafiyet tutarı pekâlâ yükseltilebilir.",
        answer: "The deductible may well be raised.",
        hint: "Üç katman: kip fiili, belirteç, edilgen.",
      },
      {
        kind: "build",
        tr: "Likidite önce düşme eğiliminde olur.",
        answer: "Liquidity would tend to fall first.",
        hint: "Düşüş bir alışkanlığa çevrilmiş; sahibi yok.",
      },
    ],
  },
];
