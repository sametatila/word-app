import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 18 — "İklim raporunu bir arada tutmak, tohumun
 * söylemedikleri, tek bir hedefe üç ad, kirleten kim".
 *
 * Dört ders: Holding a climate report together · What the seed leaves unsaid ·
 * Three names for one target · Who does the polluting.
 *
 *   Kelime: climate adaptation, climate justice, environmental compatibility,
 *           environmental ethics, decouple, diversify, right to save seed,
 *           genetic engineering, reforest, deforest, precipitation, emission
 *           reduction, decarbonization, climate neutrality, energy transition,
 *           pollutant load, overexploitation, carbon sink, species extinction,
 *           permafrost, heat island, rewild.
 *   Kalıp:  The climate adaptation described above raises the questions of climate justice discussed below. ·
 *           Environmental compatibility, as noted earlier, is also a question of environmental ethics. ·
 *           Where a region is import-dependent, no measure works across the board. ·
 *           The right to save seed survives as custom, the seed company's claim as a patent. ·
 *           They reforest the hillside; the plain, they deforest. ·
 *           The precipitation fell; the harvest did not. ·
 *           In the brochure it is emission reduction; in the study, decarbonization. ·
 *           Climate neutrality is a balance; climate-neutral is a label. ·
 *           What the ministry calls an energy transition, the district calls a transportation shift. ·
 *           What overexploitation does is hide the pollutant load. ·
 *           Behind the resource consumption stands a lost carbon sink. ·
 *           Species extinction we count; the permafrost we do not.
 *
 * Ünitenin tek öğretme noktası ÖNEKLE FİİL TÜRETME. „Forest“ bir isim;
 * İngilizce önüne bir hece koyup ondan iki kez fiil yapmış ve iki hece
 * ters yönlere çekiyor — biri geri koyuyor, öteki alıp götürüyor, ve
 * sözcüğün başka hiçbir yeri değişmemiş. Bu dilin en üretken
 * makinelerinden biri: decouple, decarbonize, reinterpret,
 * rewild — bir durum adlandıran her isim o duruma varmanın ya da ondan
 * çıkmanın fiiline çevrilebiliyor ve kalıbı bir kez görmüş okur hiç
 * görmediği bir sözcüğü okuyabiliyor. Almanca da isimden fiil yapıyor ve
 * önek de kullanıyor, ama ÇİFT SAĞ KALMIYOR: „reforest“ ile „deforest“in
 * karşılıkları çoğunlukla ayrı köklerden geliyor, dolayısıyla Alman okur
 * iki olağan sözcükle karşılaşıyor ve hiçbirinde ötekinin karşıtı olduğunu
 * söyleyen bir şey yok. Ölçü: **İNGİLİZCE İLİŞKİYİ SÖZCÜĞÜN İÇİNE KOYUYOR,
 * ORADA GÖRÜLEBİLİYOR; ALMANCA DIŞARIDA BIRAKIYOR, ORADA BİLİNMESİ
 * GEREKİYOR.** Kazancın bir bedeli var: böyle kurulan bir sözcük yerleşik
 * bir sürecin adı gibi görünüyor — „decarbonization“ bir makalede
 * uydurulmuş bir isim olarak doğdu ve şimdi yasada geçiyor, ve biçiminde
 * bunu kimsenin yapıp yapmadığını söyleyen hiçbir şey yok.
 */
export const enC1U18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u18-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "The hillside and the plain",
    genre: "article",
    intro: "Aynı bölgede yamaçta ağaç dikilirken ovada orman kesiliyor. İkisi nasıl bağlantılı?",
    gloss: [
      { de: "reforest", tr: "ağaçlandırmak" },
      { de: "deforest", tr: "ormansızlaştırmak" },
      { de: "visible", tr: "görünür" },
      { de: "a slope", tr: "yamaç" },
      { de: "east", tr: "doğu" },
      { de: "a cedar", tr: "sedir" },
      { de: "an oak", tr: "meşe" },
      { de: "a crew", tr: "ekip" },
      { de: "replant", tr: "yeniden dikmek" },
      { de: "a hectare", tr: "hektar" },
      { de: "unrelated", tr: "ilgisiz" },
      { de: "steep", tr: "dik" },
      { de: "poor", tr: "verimsiz" },
      { de: "flat", tr: "düz" },
      { de: "fertile", tr: "verimli" },
      { de: "a soybean", tr: "soya" },
      { de: "a combination", tr: "birleşim" },
      { de: "topsoil", tr: "üst toprak" },
      { de: "mud", tr: "çamur" },
      { de: "a terrace", tr: "teras" },
      { de: "a farmer", tr: "çiftçi" },
      { de: "a zone", tr: "bölge" },
      { de: "an edge", tr: "kenar" },
      { de: "regional", tr: "bölgesel" },
      { de: "the government", tr: "hükûmet" },
      { de: "appear", tr: "çıkmak" },
      { de: "a truck", tr: "kamyon" },
      { de: "a seedling", tr: "fide" },
      { de: "a chainsaw", tr: "motorlu testere" },
    ],
    minutes: 12,
    text:
      "THE HILLSIDE AND THE PLAIN\n" +
      "From the road above Santa Rita, the contradiction is visible in a single view. On the slopes to the east, rows of young cedar and oak mark the progress of a national program: since 2019, crews have replanted some 3,000 hectares there. On the plain to the west, the forest is going the other way. They reforest the hillside; the plain, they deforest.\n" +
      "The two are not unrelated. The replanting is paid for partly by carbon credits sold to companies abroad, and the credits are cheaper to earn on steep, poor land that nobody wants to farm. The plain is flat, fertile and close to the new export road, and every hectare cleared there for soybeans is worth more this year than it was last year.\n" +
      "Last season showed what the combination means. The precipitation fell; the harvest did not. Heavy rain in March ran straight off the cleared plain, carried the topsoil into the river and left the young soybean plants standing in mud. The terraces on the replanted hillside held.\n" +
      "For the small farmers between the two zones, the pressure comes from a third direction. Many of them have always kept part of each harvest as seed for the next year. The right to save seed survives as custom, the seed company's claim as a patent, and the company sells a variety developed through genetic engineering that promises higher yields on exactly this kind of land. Farmers who buy it are not allowed to save it.\n" +
      "„My grandfather never bought a seed in his life,“ says Rosa Rossi, who farms eight hectares on the edge of the plain. „I buy them every year now. The yield is better. The debt is bigger.“\n" +
      "The regional government wants to diversify the local economy and has promised a study. Until it appears, the trucks keep coming down from the hillside with seedlings and going up to the plain with chainsaws.",
    questions: [
      {
        text: "Why is the replanting done on the hillside?",
        options: ["Credits are cheaper to earn on poor land.", "The hillside is more fertile.", "The export road is there."],
        answer: 0,
        explain: "„the credits are cheaper to earn on steep, poor land that nobody wants to farm.“",
      },
      {
        text: "What happened to the heavy rain in March?",
        options: ["It ran off the cleared plain.", "It saved the harvest.", "It stayed on the hillside."],
        answer: 0,
        explain: "„Heavy rain in March ran straight off the cleared plain…“",
      },
      {
        kind: "truefalse",
        text: "Farmers who buy the new variety may not save its seed.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Farmers who buy it are not allowed to save it.“",
      },
      {
        kind: "gapfill",
        text: "The precipitation fell; the ___ did not.",
        options: [],
        answer: 0,
        accept: ["harvest"],
        explain: "„The precipitation fell; the harvest did not.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Crews have replanted the slopes to the east.",
          "The forest is cleared on the plain for soybeans.",
          "Heavy rain carried the topsoil into the river.",
          "The government has promised a study.",
        ],
        explain: "Yamaçtaki dikim, ovadaki kesim, yağmurun etkisi, en sonda hükûmetin sözü.",
      },
      {
        kind: "short_answer",
        text: "How many hectares does Rosa Rossi farm?",
        options: [],
        answer: 0,
        accept: ["eight", "8", "eight hectares"],
        explain: "„…says Rosa Rossi, who farms eight hectares on the edge of the plain.“",
      },
    ],
  },
  {
    id: "en-c1-u18-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "Two climate plans, one budget",
    genre: "opinion",
    intro: "Bir kentin iki iklim planı üzerine görüş yazısı. İki proje aynı parayı mı istiyor?",
    gloss: [
      { de: "a household", tr: "hane" },
      { de: "burn", tr: "yakmak" },
      { de: "oil", tr: "petrol" },
      { de: "coal", tr: "kömür" },
      { de: "appear", tr: "görünmek" },
      { de: "diesel", tr: "dizel" },
      { de: "funds", tr: "fonlar" },
      { de: "a heat pump", tr: "ısı pompası" },
      { de: "frequent", tr: "sık" },
      { de: "compete", tr: "yarışmak" },
      { de: "fund", tr: "finanse etmek" },
      { de: "resent", tr: "içerlemek" },
      { de: "discover", tr: "fark etmek" },
    ],
    minutes: 12,
    text:
      "Our city has two climate plans, and they do not promise the same thing. In the brochure it is emission reduction; in the study, decarbonization. The brochure, sent to every household in May, promises that emissions will be 40 percent lower in 2030 than in 2010. The study, commissioned by the same council and published quietly in June, describes a city that burns no oil or gas at all by 2045.\n" +
      "The first target can be reached by switching the old heating plant from coal to gas. The second cannot, because gas is exactly what it would have to replace twenty years later. A council that spends its money on the first target may make the second one more expensive.\n" +
      "The same problem appears in the headline promise. Climate neutrality is a balance; climate-neutral is a label. The plan counts on buying forest credits abroad to balance the emissions it cannot cut, and the city bus company already paints „climate-neutral“ on its vehicles. Both are legal. Neither means that the buses have stopped burning diesel.\n" +
      "Then there is the argument about money. What the ministry calls an energy transition, our district calls a transportation shift. The ministry wants the city's share of federal funds spent on a new power line and heat pumps. The district council wants the same money for a tram line and more frequent buses. Both projects are sensible. Both cost roughly 90 million, and there is 90 million.\n" +
      "Nobody at last week's council meeting said this out loud. It is easier to chair a debate between a good plan and a bad one than a debate between two good plans competing for the same line in the budget.\n" +
      "So here is my request to the council: publish one plan, with one target, and say which project you are not going to fund. Voters can accept a hard choice. What they resent is discovering it later.",
    questions: [
      {
        text: "What does the brochure promise?",
        options: ["emissions 40 percent lower in 2030", "no oil or gas by 2045", "a new tram line"],
        answer: 0,
        explain: "„The brochure, sent to every household in May, promises that emissions will be 40 percent lower in 2030 than in 2010.“",
      },
      {
        text: "What does the district want the money for?",
        options: ["a tram line and more buses", "a new power line", "forest credits"],
        answer: 0,
        explain: "„The district council wants the same money for a tram line and more frequent buses.“",
      },
      {
        kind: "truefalse",
        text: "The buses have stopped burning diesel.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Neither means that the buses have stopped burning diesel.“",
      },
      {
        kind: "gapfill",
        text: "Climate neutrality is a balance; climate-neutral is a ___.",
        options: [],
        answer: 0,
        accept: ["label"],
        explain: "„Climate neutrality is a balance; climate-neutral is a label.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The brochure was sent to every household.",
          "The old heating plant could switch to gas.",
          "The bus company paints a label on its vehicles.",
          "Nobody at the meeting said it out loud.",
        ],
        explain: "Broşür ve çalışma, ısıtma santrali, otobüslerdeki etiket, en sonda toplantıda söylenmeyen şey.",
      },
      {
        kind: "short_answer",
        text: "How much does each project cost?",
        options: [],
        answer: 0,
        accept: ["roughly 90 million", "90 million", "about 90 million"],
        explain: "„Both cost roughly 90 million, and there is 90 million.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u18-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 18,
    title: "The load nobody counts",
    genre: "dialogue",
    intro: "Sayılan ile sayılmayan. Hangisi geri gelmiyor?",
    gloss: [
      { de: "pump", tr: "pompalamak" },
      { de: "a volume", tr: "hacim" },
      { de: "funds", tr: "fonluyor" },
      { de: "fund", tr: "fonlamak" },
      { de: "a load", tr: "yük" },
      { de: "a sink", tr: "yutak" },
      { de: "a bog", tr: "bataklık" },
      { de: "drained", tr: "kurutulmuş" },
      { de: "a hectare", tr: "hektar" },
      { de: "harmless", tr: "zararsız" },
      { de: "a species", tr: "tür" },
      { de: "a list", tr: "liste" },
      { de: "frozen", tr: "donmuş" },
      { de: "a sensor", tr: "algılayıcı" },
      { de: "produces", tr: "üretiyor" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Lydia", text: "What overexploitation does is hide the pollutant load. When a river is pumped too hard, the same waste ends up in much less water." },
      { speaker: "Jason", text: "Hide it from whom?" },
      { speaker: "Lydia", text: "From the annual report. It gives the volume of water taken, not the load left in the river, and a report like that has chosen the number that looks harmless." },
      { speaker: "Jason", text: "Behind the resource consumption stands a lost carbon sink." },
      { speaker: "Lydia", text: "A bog that was drained in nineteen sixty. Four hundred hectares, and it is still on somebody's books as an improvement." },
      { speaker: "Jason", text: "Can it be put back?" },
      { speaker: "Lydia", text: "Some of it, over about thirty years, and only if the water comes back first. That is a long enough time that nobody who decides it will see the end of it." },
      { speaker: "Jason", text: "Species extinction we count; the permafrost we do not." },
      { speaker: "Lydia", text: "We count species because a list is a thing a person can keep. The frozen ground has no list and no names in it, and it holds more than the list does." },
      { speaker: "Jason", text: "So what would you measure instead?" },
      { speaker: "Lydia", text: "The same thing every year with the same sensor in the same place. Not the best measurement, the longest one, and almost nobody funds that." },
      { speaker: "Jason", text: "Because it produces nothing for years." },
      { speaker: "Lydia", text: "It produces nothing for years and then it is the only thing anybody wants, and by then it has to have been running for twenty of them." },
    ],
    questions: [
      {
        text: "What has the report chosen?",
        options: ["the number that looks harmless", "the load left in the river", "the list of species"],
        answer: 0,
        explain: "„a report like that has chosen the number that looks harmless.“",
      },
      {
        text: "Why do we count species?",
        options: ["a list is a thing a person can keep", "they are frozen", "they are on the books"],
        answer: 0,
        explain: "„We count species because a list is a thing a person can keep.“",
      },
      {
        kind: "truefalse",
        text: "She would fund the longest measurement.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not the best measurement, the longest one…“",
      },
      {
        kind: "gapfill",
        text: "Behind the resource consumption stands a lost carbon ___.",
        options: [],
        answer: 0,
        accept: ["sink"],
        explain: "„Behind the resource consumption stands a lost carbon sink.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What overexploitation does is hide the pollutant load.", "What overexploitation does is hide the pollutant load"],
        explain: "Aşırı kullanım kirletici yükü gizliyor: aynı atık çok daha az suya karışıyor.",
      },
      {
        kind: "short_answer",
        text: "How long must it have been running?",
        options: [],
        answer: 0,
        accept: ["twenty years", "twenty", "20 years"],
        explain: "„by then it has to have been running for twenty of them.“",
      },
    ],
  },
  {
    id: "en-c1-u18-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 18,
    title: "Presenting the adaptation report",
    genre: "monologue",
    intro: "Bölgesel uyum raporunun komisyona sunumu. Rapor neden tek bir ulusal kural önermiyor?",
    gloss: [
      { de: "regional", tr: "bölgesel" },
      { de: "simply", tr: "basitçe" },
      { de: "exposed", tr: "maruz" },
      { de: "a dam", tr: "baraj" },
      { de: "a port", tr: "liman" },
      { de: "shipped", tr: "gemiyle gelen" },
      { de: "grain", tr: "tahıl" },
      { de: "propose", tr: "önermek" },
      { de: "an annex", tr: "ek" },
      { de: "contain", tr: "içermek" },
      { de: "a zone", tr: "bölge" },
      { de: "a billion", tr: "milyar" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Rhys", text: "Good morning. I have ten minutes, so I will take you through the regional adaptation report in three steps." },
      { speaker: "Rhys", text: "The climate adaptation described in chapter two raises the questions of climate justice discussed in chapter five. Put simply, the people most exposed to heat are the least able to pay for protection." },
      { speaker: "Rhys", text: "Environmental compatibility, as noted earlier in the report, is also a question of environmental ethics. A dam may pass every technical test and still flood a village that was never asked." },
      { speaker: "Rhys", text: "Second, the ports. Where a region is import-dependent, no measure works across the board. Our port cities depend on shipped grain and fuel; our mountain valleys depend on their own water." },
      { speaker: "Rhys", text: "A single rule written for both would be followed in one and ignored in the other. That is why the report does not propose one national rule." },
      { speaker: "Rhys", text: "Instead, the annex contains a map with six zones and a short rule for each. It took longer to write, and it is the only version the towns said they would actually apply." },
      { speaker: "Rhys", text: "Third, the money. The measures outlined above cost about one billion over ten years, and the heat plan for the cities is the largest single item." },
      { speaker: "Rhys", text: "We recommend that the committee approve the zones first and the budget second. Without the map, nobody can say which town the money is for." },
      { speaker: "Rhys", text: "I am happy to take questions, and I will start with the one I am always asked. No, the map is not final. It will be reviewed every three years." },
    ],
    questions: [
      {
        text: "Who is most exposed to heat, according to the report?",
        options: ["people least able to pay for protection", "port workers", "mountain villages"],
        answer: 0,
        explain: "„the people most exposed to heat are the least able to pay for protection.“",
      },
      {
        text: "What does the annex contain?",
        options: ["a map with six zones", "one national rule", "the budget"],
        answer: 0,
        explain: "„the annex contains a map with six zones and a short rule for each.“",
      },
      {
        kind: "truefalse",
        text: "The report proposes one national rule.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is why the report does not propose one national rule.“",
      },
      {
        kind: "gapfill",
        text: "Where a region is import-dependent, no measure works across the ___.",
        options: [],
        answer: 0,
        accept: ["board"],
        explain: "„Where a region is import-dependent, no measure works across the board.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The climate adaptation described in chapter two raises the questions of climate justice discussed in chapter five.",
          "The climate adaptation described in chapter two raises the questions of climate justice discussed in chapter five",
        ],
        explain: "Raporun iki bölümü birbirine bağlanıyor: uyum önlemleri iklim adaleti sorusunu doğuruyor.",
      },
      {
        kind: "short_answer",
        text: "How often will the map be reviewed?",
        options: [],
        answer: 0,
        accept: ["every three years", "every 3 years"],
        explain: "„It will be reviewed every three years.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u18-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 18,
    title: "Forests, seeds and climate",
    genre: "info",
    intro: "Ağaçlandırma, tohum ve iklim hedefleri üzerine notlar yaz.",
    gloss: [
      { de: "to reforest", tr: "yeniden ağaçlandırmak" },
      { de: "to deforest", tr: "ormansızlaştırmak" },
      { de: "precipitation", tr: "yağış" },
      { de: "emission reduction", tr: "emisyon azaltma" },
      { de: "decarbonization", tr: "karbonsuzlaştırma" },
      { de: "climate neutrality", tr: "iklim nötrlüğü" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yamacı yeniden ağaçlandırıyorlar; ovayı ormansızlaştırıyorlar.",
        answer: "They reforest the hillside; the plain, they deforest.",
        hint: "Tek gövde, iki önek, ters yönler.",
      },
      {
        kind: "build",
        tr: "Tohumu yeniden ekme hakkı âdet olarak, tohum şirketinin talebi patent olarak sağ kalıyor.",
        answer: "The right to save seed survives as custom, the seed company's claim as a patent.",
        hint: "İkinci yarıda fiil yok; iki şey iki ayrı biçimde sürüyor.",
      },
      {
        kind: "build",
        tr: "Yağış düştü; hasat düşmedi.",
        answer: "The precipitation fell; the harvest did not.",
        hint: "Hiçbir şey silinmemiş ve yine de kimse yok.",
      },
      {
        kind: "build",
        tr: "Broşürde emisyon azaltma, çalışmada karbonsuzlaştırma.",
        answer: "In the brochure it is emission reduction; in the study, decarbonization.",
        hint: "İki oda, iki sözcük, iki ayrı on yıl.",
      },
      {
        kind: "build",
        tr: "İklim nötrlüğü bir dengedir; iklim nötr bir etikettir.",
        answer: "Climate neutrality is a balance; climate-neutral is a label.",
        hint: "Biri sıfıra karşı ölçülüyor, öteki pakete basılıyor.",
      },
      {
        kind: "form",
        prompt: "Bölge haberi için arazi kartını doldur.",
        facts: "Doğu yamaçlarında 2019'dan beri yaklaşık 3.000 hektar yeniden ağaçlandırıldı; batıdaki ovada orman soya için kesiliyor; mart ayındaki yağmur ovadan akıp gitti; yeni tohum çeşidini alan çiftçiler tohum saklayamıyor.",
        fields: [
          { label: "The hillside", answer: "reforested", accept: ["they reforest it", "planted"] },
          { label: "The plain", answer: "deforested", accept: ["they deforest it", "cleared"] },
          { label: "Hectares replanted", answer: "about 3,000", accept: ["3, 000", "3000"] },
          { label: "The rain in March", answer: "ran off the plain", accept: ["ran off", "it ran off"] },
          { label: "Saving the new seed", answer: "not allowed", accept: ["not allowed to save it", "no"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u18-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 18,
    title: "Notes on climate justice",
    genre: "info",
    intro: "Bölgesel iklim raporu için cümleler kur: uyum, adalet ve kirliliğin kaynağı.",
    gloss: [
      { de: "climate adaptation", tr: "iklime uyum" },
      { de: "climate justice", tr: "iklim adaleti" },
      { de: "environmental compatibility", tr: "çevreyle uyumluluk" },
      { de: "overexploitation", tr: "aşırı sömürü" },
      { de: "a carbon sink", tr: "karbon yutağı" },
      { de: "species extinction", tr: "türlerin yok oluşu" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yukarıda anlatılan iklime uyum, aşağıda ele alınan iklim adaleti sorularını doğuruyor.",
        answer: "The climate adaptation described above raises the questions of climate justice discussed below.",
        hint: "İki edat nesnesiz kalmış; ortaçla birlikte ismin ardına asılmış.",
      },
      {
        kind: "build",
        tr: "Çevreyle uyumluluk, daha önce belirtildiği gibi, aynı zamanda bir çevre etiği sorusudur.",
        answer: "Environmental compatibility, as noted earlier, is also a question of environmental ethics.",
        hint: "„As noted earlier“ daha önceki bir sayfa hakkında bir söz.",
      },
      {
        kind: "build",
        tr: "Bir bölge ithalata bağımlıysa hiçbir önlem her alanda işlemez.",
        answer: "Where a region is import-dependent, no measure works across the board.",
        hint: "„Where“ yer değil, durum gösteriyor.",
      },
      {
        kind: "build",
        tr: "Aşırı sömürünün yaptığı şey kirletici madde yükünü gizlemektir.",
        answer: "What overexploitation does is hide the pollutant load.",
        hint: "Ölçülebilen sayı, ölçülemeyen sözcüğün arkasına saklanıyor.",
      },
      {
        kind: "build",
        tr: "Türlerin yok oluşunu sayıyoruz; permafrostu saymıyoruz.",
        answer: "Species extinction we count; the permafrost we do not.",
        hint: "Liste tutulabilir bir şey; donmuş toprağın listesi yok.",
      },
    ],
  },
];
