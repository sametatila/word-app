import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 19 — "İhtiyat ilkesi, büyüme tartışması, atığın
 * sözcükleri, ölçümü aktarmak".
 *
 * Dört ders: The precautionary principle · The growth debate ·
 * The vocabulary of waste · Reporting the measurement.
 *
 *   Kelime: precautionary principle, responsibility to protect, natural
 *           capital, commons, ecosystem service, expropriation, account for,
 *           criticism of growth, growth imperative, decoupling, sufficiency,
 *           finiteness, circular economy, waste prevention, closed loop,
 *           obsolescence, longevity, reclaim, incentive effect, dilute, volatile.
 *   Kalıp:  The precautionary principle demands that the responsibility to protect be given priority. ·
 *           Were it not for its natural capital, the village would have no commons to share. ·
 *           They ask that every ecosystem service be counted before the expropriation. ·
 *           Much as I agree with the criticism of growth, the growth imperative pays the pensions. ·
 *           The decoupling, albeit real, does not deliver sufficiency. ·
 *           Although aware of finiteness, the circular economy still needs growth. ·
 *           Waste prevention is not the same as a closed loop. ·
 *           Obsolescence is designed; longevity is paid for. ·
 *           They reclaim the metal and sell it as a recycled raw material. ·
 *           One reports an incentive effect; another doubts the transformation process. ·
 *           The sponsor openly claims what the academic journal merely suggests. ·
 *           To dilute a finding is not to call it volatile.
 *
 * Ünitenin tek öğretme noktası EDAT EDİLGENİ. „Longevity is paid for“ —
 * „for“ cümlenin sonunda, ardında hiçbir şey yok, çünkü „pay for
 * something“un nesnesi ÖZNE yapılmış. İngilizce bunu yapabiliyor: edatın
 * nesnesini alıp cümlenin başına çıkarıyor ve edatı yöneteceği hiçbir şey
 * kalmadan arkada bırakıyor. Liste uzun ve gündelik: dealt with, accounted
 * for, looked after, relied on. Ölçü bu kez tek yönlü: **ALMANCA BUNU HİÇ
 * YAPAMIYOR** — Almanca edilgeni yalnız DOĞRUDAN nesneyi özne yapabiliyor,
 * edatın nesnesi yerinde kalıyor, edat önünde duruyor, ve cümle başka bir
 * yoldan kurulmak zorunda. Dolayısıyla „longevity is paid for“un sözcüğü
 * sözcüğüne karşılığı yok. İkinci ölçü: bu biçim, bir şeye bir şey
 * yapıldığını FAİLİ söylemeden yazmanın İngilizcedeki ana yolu, yani
 * seviyenin failsiz cümle ailesinin DÖRDÜNCÜ üyesi — ve okurun üstünde en
 * az duracağı üye, çünkü başa konan şey paragrafın zaten konusu olan şey.
 */
export const enC1U19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u19-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 19,
    title: "Saturday at the repair café",
    genre: "article",
    intro: "Bir tamir kafesi üzerine haber. Gönüllüler ne yapıyor, kafe neden önemli?",
    gloss: [
      { de: "a screwdriver", tr: "tornavida" },
      { de: "a soldering iron", tr: "havya" },
      { de: "a toaster", tr: "ekmek kızartma makinesi" },
      { de: "retired", tr: "emekli" },
      { de: "an engineer", tr: "mühendis" },
      { de: "come loose", tr: "gevşemek" },
      { de: "dealt with", tr: "halledilmek" },
      { de: "glued shut", tr: "yapıştırılıp kapatılmış" },
      { de: "a manufacturer", tr: "üretici" },
      { de: "obsolescence", tr: "planlı eskitme" },
      { de: "longevity", tr: "uzun ömür" },
      { de: "a kettle", tr: "su ısıtıcısı" },
      { de: "relied on", tr: "güvenilen" },
      { de: "an organizer", tr: "organizatör" },
      { de: "a teenager", tr: "genç" },
      { de: "waste prevention", tr: "atık önleme" },
      { de: "a closed loop", tr: "kapalı döngü" },
      { de: "reclaim", tr: "geri kazanmak" },
      { de: "bury", tr: "gömmek" },
    ],
    minutes: 12,
    text:
      "SATURDAY AT THE REPAIR CAFÉ\n" +
      "Every second Saturday, the back room of the public library in Eastfield turns into a workshop. Volunteers sit at long tables with screwdrivers and soldering irons, and residents line up with broken toasters, lamps, radios and phones. Nothing is paid for except the spare parts, and coffee is provided.\n" +
      "Jonas Berg, a retired engineer, has run the café since 2017. He keeps a notebook in which every repair is accounted for: what came in, what was wrong and whether it left working. Last year the volunteers looked at 1,140 items and fixed 710 of them.\n" +
      "„Most things are not really broken,“ Berg says. „A cable has come loose, a switch is dirty, a battery has to be dealt with. That is ten minutes of work, and without us the whole machine would be thrown away.“\n" +
      "Some cases are harder. Many modern devices are glued shut, and spare parts are often sold only to the manufacturer's own service network. „Obsolescence is designed; longevity is paid for,“ Berg says. „If you want a kettle that lasts twenty years, you pay for it at the start, and most people are never offered the choice.“\n" +
      "The café is relied on by more people than the organizers expected. Older residents who live alone come for the company as much as for the repairs, and a group of teenagers now comes every month to learn how to take a laptop apart. Their questions are always listened to, Berg says, even the ones he cannot answer.\n" +
      "The city council has noticed. Waste prevention is now a line in its budget, and the café receives a small grant for tools. Berg is pleased but careful. „Waste prevention is not the same as a closed loop,“ he says. „They reclaim the metal and sell it as a recycled raw material, and that is better than burying a toaster. Not needing a new one is better than both.“\n" +
      "The next repair café takes place on the 14th. Bring the item, the cable and, if you still have it, the manual.",
    questions: [
      {
        text: "What do visitors pay for?",
        options: ["only the spare parts", "the repairs", "the coffee"],
        answer: 0,
        explain: "„Nothing is paid for except the spare parts, and coffee is provided.“",
      },
      {
        text: "How many items did the volunteers fix last year?",
        options: ["710", "1,140", "430"],
        answer: 0,
        explain: "„Last year the volunteers looked at 1,140 items and fixed 710 of them.“",
      },
      {
        kind: "truefalse",
        text: "Some teenagers come to learn how to take a laptop apart.",
        options: ["True", "False"],
        answer: 0,
        explain: "„a group of teenagers now comes every month to learn how to take a laptop apart.“",
      },
      {
        kind: "gapfill",
        text: "Obsolescence is designed; longevity is paid ___.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "„Obsolescence is designed; longevity is paid for.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Residents line up with broken toasters.",
          "Berg keeps a notebook of every repair.",
          "Many modern devices are glued shut.",
          "The café receives a small grant.",
        ],
        explain: "Kafenin işleyişi, tutulan kayıt, zor durumlar, en sonda belediyenin desteği.",
      },
      {
        kind: "short_answer",
        text: "Who has run the café since 2017?",
        options: [],
        answer: 0,
        accept: ["Jonas Berg", "Berg", "a retired engineer"],
        explain: "„Jonas Berg, a retired engineer, has run the café since 2017.“",
      },
    ],
  },
  {
    id: "en-c1-u19-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 19,
    title: "Growth and the pensions",
    genre: "opinion",
    intro: "Büyüme eleştirisi ile emeklilik sistemi üzerine bir görüş yazısı. Yazar tartışmanın nereden başlamasını istiyor?",
    gloss: [
      { de: "rich", tr: "zengin" },
      { de: "forever", tr: "sonsuza dek" },
      { de: "uncomfortable", tr: "rahatsız edici" },
      { de: "a contribution", tr: "prim" },
      { de: "produce", tr: "üretmek" },
      { de: "an economist", tr: "iktisatçı" },
      { de: "retired", tr: "emekli" },
      { de: "a supporter", tr: "destekçi" },
      { de: "deserve", tr: "hak etmek" },
      { de: "output", tr: "üretim" },
      { de: "a curve", tr: "eğri" },
      { de: "flatten", tr: "düzleşmek" },
      { de: "rise", tr: "yükselmek" },
      { de: "transport", tr: "taşımak" },
      { de: "a circle", tr: "daire" },
      { de: "owe", tr: "borçlu olmak" },
      { de: "exist", tr: "var olmak" },
      { de: "wealth", tr: "servet" },
      { de: "unpopular", tr: "sevilmeyen" },
      { de: "a chart", tr: "grafik" },
    ],
    minutes: 12,
    text:
      "I have spent twenty years arguing that rich countries cannot keep growing forever, and I have not changed my mind. But I have learned to start every talk on the subject with an uncomfortable fact. Much as I agree with the criticism of growth, the growth imperative pays the pensions.\n" +
      "A pension is not money that was saved in a box. In most European systems it is paid out of taxes and contributions on work done this year. If the economy produces less, those payments fall, and the people who notice first are not economists but retired teachers and nurses.\n" +
      "Supporters of green growth have a reply, and it deserves to be taken seriously. The decoupling, albeit real, does not deliver sufficiency. Real it is: in several countries emissions have fallen while output rose, and the data are good. But a curve that has flattened is still a curve that rises, and sufficiency means living within a limit, not slowing down on the way past it.\n" +
      "The circular economy is often offered as the way out. Although aware of finiteness, the circular economy still needs growth. Collecting, sorting, cleaning, repairing and transporting are all work, and that work is paid in wages from the same economy that pays the pensions. A circle drawn in a report costs nothing; a circle running in a real city has costs at every step.\n" +
      "None of this means the critics of growth are wrong. It means we owe people an answer to the pension question before we ask them to accept a smaller economy. Some answers exist: taxing wealth rather than wages, raising the retirement age for desk jobs, paying pensions partly in services such as housing and care.\n" +
      "Each of them is unpopular. That is exactly why the debate should begin with them, and not with the charts.",
    questions: [
      {
        text: "Where do most pensions come from, according to the writer?",
        options: ["taxes on work done this year", "money saved in a box", "the circular economy"],
        answer: 0,
        explain: "„In most European systems it is paid out of taxes and contributions on work done this year.“",
      },
      {
        text: "Who notices first when the payments fall?",
        options: ["retired teachers and nurses", "economists", "supporters of green growth"],
        answer: 0,
        explain: "„the people who notice first are not economists but retired teachers and nurses.“",
      },
      {
        kind: "truefalse",
        text: "The writer has changed her mind about growth.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I have spent twenty years arguing that rich countries cannot keep growing forever, and I have not changed my mind.“",
      },
      {
        kind: "gapfill",
        text: "The decoupling, albeit real, does not deliver ___.",
        options: [],
        answer: 0,
        accept: ["sufficiency"],
        explain: "„The decoupling, albeit real, does not deliver sufficiency.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The writer starts with an uncomfortable fact.",
          "Emissions have fallen while output rose.",
          "A circle running in a city has costs.",
          "Each answer is unpopular.",
        ],
        explain: "Rahatsız edici olgu, yeşil büyümenin yanıtı, döngüsel ekonomi, en sonda öneriler.",
      },
      {
        kind: "short_answer",
        text: "What could pensions partly be paid in?",
        options: [],
        answer: 0,
        accept: ["services", "housing and care", "services such as housing"],
        explain: "„paying pensions partly in services such as housing and care.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u19-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 19,
    title: "A study on bottle deposits",
    genre: "dialogue",
    intro: "İki bilim gazetecisi depozito sistemi üzerine yeni bir çalışmayı konuşuyor. Tablo ne gösteriyor?",
    gloss: [
      { de: "produce", tr: "üretmek" },
      { de: "production", tr: "üretim" },
      { de: "a beverage", tr: "içecek" },
      { de: "an association", tr: "birlik" },
      { de: "a design", tr: "tasarım" },
      { de: "rise", tr: "yükselmek" },
      { de: "dilute", tr: "sulandırmak" },
      { de: "volatile", tr: "oynak" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Glen", text: "Have you read the new study on the bottle deposit? The industry is already quoting it." },
      { speaker: "Bethany", text: "I have. One group reports an incentive effect; another doubts the whole transformation process. And they are reading the same table." },
      { speaker: "Glen", text: "What does the table show?" },
      { speaker: "Bethany", text: "Return rates rose from sixty to ninety-one percent in two years. That is the incentive effect, and nobody disputes it." },
      { speaker: "Glen", text: "And the doubters?" },
      { speaker: "Bethany", text: "They say that more bottles returned is not the same as less plastic produced. Production went up in the same period." },
      { speaker: "Glen", text: "Who paid for the study?" },
      { speaker: "Bethany", text: "The beverage association. The sponsor openly claims what the academic journal merely suggests, and the journal version has four pages of limitations." },
      { speaker: "Glen", text: "And the ministry summary?" },
      { speaker: "Bethany", text: "It goes the other way. It dilutes the finding until it says almost nothing. But to dilute a finding is not to call it volatile. The data themselves are stable." },
      { speaker: "Glen", text: "Was the conflict of interest declared?" },
      { speaker: "Bethany", text: "On the last page. Declaring it is fine, but it changes nothing about how the study was designed, and the design is what nobody checks." },
      { speaker: "Glen", text: "So what do we write?" },
      { speaker: "Bethany", text: "Both numbers, returns and production, in the first paragraph. And a link to the journal, not to the press release." },
    ],
    questions: [
      {
        text: "How much did return rates rise?",
        options: ["from sixty to ninety-one percent", "by sixty percent", "to one hundred percent"],
        answer: 0,
        explain: "„Return rates rose from sixty to ninety-one percent in two years.“",
      },
      {
        text: "Who paid for the study?",
        options: ["the beverage association", "the ministry", "the journal"],
        answer: 0,
        explain: "„The beverage association.“",
      },
      {
        kind: "truefalse",
        text: "Plastic production went up in the same period.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Production went up in the same period.“",
      },
      {
        kind: "gapfill",
        text: "The sponsor openly claims what the academic journal merely ___.",
        options: [],
        answer: 0,
        accept: ["suggests"],
        explain: "„The sponsor openly claims what the academic journal merely suggests…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "One group reports an incentive effect; another doubts the whole transformation process.",
          "One group reports an incentive effect; another doubts the whole transformation process",
        ],
        explain: "Aynı tabloyu okuyan iki taraf: biri etkiyi bildiriyor, öteki dönüşümden kuşku duyuyor.",
      },
      {
        kind: "short_answer",
        text: "Where was the conflict of interest declared?",
        options: [],
        answer: 0,
        accept: ["on the last page", "the last page"],
        explain: "„On the last page.“",
      },
    ],
  },
  {
    id: "en-c1-u19-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 19,
    title: "The quarry hearing",
    genre: "monologue",
    intro: "Taş ocağının genişletilmesiyle ilgili kamu toplantısında köyün avukatı konuşuyor. Avukat neyin önce yapılmasını istiyor?",
    gloss: [
      { de: "represent", tr: "temsil etmek" },
      { de: "a villager", tr: "köylü" },
      { de: "a wood", tr: "koru" },
      { de: "a meadow", tr: "çayır" },
      { de: "timber", tr: "kereste" },
      { de: "calculate", tr: "hesaplamak" },
      { de: "a valuation", tr: "değerleme" },
      { de: "propose", tr: "önermek" },
      { de: "unfavorable", tr: "aleyhte" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Casey", text: "Thank you, chair. I represent the residents of Oakridge, and I will speak about the order in which things are decided, because that is where this case will be won or lost." },
      { speaker: "Casey", text: "The precautionary principle demands that the responsibility to protect be given priority. In practice, the company must show that the expansion will not damage the spring before any permit is issued." },
      { speaker: "Casey", text: "At present it is the other way around. The permit is drafted first, and the villagers are asked to prove the harm afterward, with their own money." },
      { speaker: "Casey", text: "Were it not for its natural capital, the village would have no commons to share. The wood, the spring and the meadow are owned together, and forty families use them every week." },
      { speaker: "Casey", text: "We therefore ask that every ecosystem service be counted before the expropriation, not after. The water, the timber and the flood protection all have a value that can be calculated." },
      { speaker: "Casey", text: "A valuation made after the decision is only a compensation, and a compensation is paid for something that is already gone." },
      { speaker: "Casey", text: "I have seen this office value a wood twice, three years apart. The second number was larger and the wood was smaller." },
      { speaker: "Casey", text: "So we propose that the count be completed and added to the file before the hearing continues, even if the numbers turn out to be unfavorable to us." },
      { speaker: "Casey", text: "A number in the file can be argued with. A number that arrives late is a footnote in an appeal." },
    ],
    questions: [
      {
        text: "Who should prove that the spring will not be damaged?",
        options: ["the company", "the villagers", "the office"],
        answer: 0,
        explain: "„the company must show that the expansion will not damage the spring before any permit is issued.“",
      },
      {
        text: "How many families use the commons every week?",
        options: ["forty", "three", "twelve"],
        answer: 0,
        explain: "„The wood, the spring and the meadow are owned together, and forty families use them every week.“",
      },
      {
        kind: "truefalse",
        text: "The second valuation of the wood was smaller.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The second number was larger and the wood was smaller.“",
      },
      {
        kind: "gapfill",
        text: "We therefore ask that every ecosystem service be ___ before the expropriation, not after.",
        options: [],
        answer: 0,
        accept: ["counted"],
        explain: "„We therefore ask that every ecosystem service be counted before the expropriation, not after.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The precautionary principle demands that the responsibility to protect be given priority.",
          "The precautionary principle demands that the responsibility to protect be given priority",
        ],
        explain: "İlke, korumanın önce gelmesini istiyor; talep cümlesinde „be given“ yalın kalıyor.",
      },
      {
        kind: "short_answer",
        text: "What is a valuation made after the decision?",
        options: [],
        answer: 0,
        accept: ["a compensation", "only a compensation", "compensation"],
        explain: "„A valuation made after the decision is only a compensation…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u19-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 19,
    title: "Waste and recycling",
    genre: "info",
    intro: "Onarım, atık ve doğanın korunması üzerine notlar yaz.",
    gloss: [
      { de: "obsolescence", tr: "eskime" },
      { de: "longevity", tr: "uzun ömürlülük" },
      { de: "waste prevention", tr: "atık önleme" },
      { de: "to reclaim", tr: "geri kazanmak" },
      { de: "natural capital", tr: "doğal sermaye" },
      { de: "an ecosystem service", tr: "ekosistem hizmeti" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Eskime tasarlanır; uzun ömürlülüğün parası ödenir.",
        answer: "Obsolescence is designed; longevity is paid for.",
        hint: "Edatın nesnesi özne olmuş; edat arkada kalmış.",
      },
      {
        kind: "build",
        tr: "Atık önleme, kapalı madde döngüsüyle aynı şey değildir.",
        answer: "Waste prevention is not the same as a closed loop.",
        hint: "Biri yapmama kararı, öteki sonrası için plan.",
      },
      {
        kind: "build",
        tr: "Metali geri kazanıp ikincil hammadde olarak satıyorlar.",
        answer: "They reclaim the metal and sell it as a recycled raw material.",
        hint: "İki fiil, tek özne; ikincisinde adıl nesne.",
      },
      {
        kind: "build",
        tr: "İhtiyat ilkesi koruma sorumluluğuna öncelik verilmesini talep eder.",
        answer: "The precautionary principle demands that the responsibility to protect be given priority.",
        hint: "Bütün işi „priority“ yapıyor: daha güçlü değil, daha erken.",
      },
      {
        kind: "build",
        tr: "Doğal sermayesi olmasaydı köyün paylaşacak ortak kullanım alanı olmazdı.",
        answer: "Were it not for its natural capital, the village would have no commons to share.",
        hint: "Fiil başta, bağlaç yok.",
      },
      {
        kind: "form",
        prompt: "Tamir kafesi duyurusu için bilgi kartını doldur.",
        facts: "Tamir kafesi iki haftada bir cumartesi günü kütüphanede kuruluyor; ziyaretçiler yalnız yedek parçanın parasını ödüyor; geçen yıl 1.140 eşyadan 710'u tamir edildi; sıradaki buluşma ayın 14'ünde.",
        fields: [
          { label: "Where", answer: "the public library", accept: ["the library", "library"] },
          { label: "What is paid for", answer: "only the spare parts", accept: ["spare parts", "the spare parts"] },
          { label: "Items fixed last year", answer: "710", accept: ["710 items"] },
          { label: "Next date", answer: "the 14th", accept: ["14th", "on the 14th"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u19-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 19,
    title: "Growth and its limits",
    genre: "info",
    intro: "Büyüme tartışması ve bir araştırmanın bulguları üzerine cümleler kur.",
    gloss: [
      { de: "criticism of growth", tr: "büyüme eleştirisi" },
      { de: "decoupling", tr: "kopma" },
      { de: "sufficiency", tr: "yeterlilik" },
      { de: "finiteness", tr: "sonluluk" },
      { de: "an incentive effect", tr: "teşvik etkisi" },
      { de: "to dilute", tr: "seyreltmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Büyüme eleştirisine ne kadar katılsam da emekli aylıklarını büyüme zorunluluğu ödüyor.",
        answer: "Much as I agree with the criticism of growth, the growth imperative pays the pensions.",
        hint: "İki yarı da doğru; hiçbiri ötekini yanıtlamıyor.",
      },
      {
        kind: "build",
        tr: "Kopma, gerçek olsa da, yeterlilik sağlamıyor.",
        answer: "The decoupling, albeit real, does not deliver sufficiency.",
        hint: "Taviz büyük; reddedilen şey değişimin yeterliliği.",
      },
      {
        kind: "build",
        tr: "Sonluluğun farkında olsa da döngüsel ekonomi hâlâ büyümeye ihtiyaç duyuyor.",
        answer: "Although aware of finiteness, the circular economy still needs growth.",
        hint: "Baştaki tavizin içinde bütün bir öbek var.",
      },
      {
        kind: "build",
        tr: "Biri teşvik etkisi bildiriyor; bir başkası dönüşüm sürecinden kuşku duyuyor.",
        answer: "One reports an incentive effect; another doubts the transformation process.",
        hint: "Biri sütunu, öteki otuz yılı konuşuyor.",
      },
      {
        kind: "build",
        tr: "Bir bulguyu seyreltmek ona oynak demek değildir.",
        answer: "To dilute a finding is not to call it volatile.",
        hint: "Biri makale hakkında, öteki dünya hakkında.",
      },
    ],
  },
];
