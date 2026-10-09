import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 16 — "Bir tarlaya üç ad, toprağı kim alıyor,
 * gıda egemenliği istemek, verim mi çeşit mi".
 *
 * Dört ders: Three names for a field · Who takes the land ·
 * Demanding food sovereignty · Yield or variety.
 *
 *   Kelime: land consumption, arable field, land consolidation, land
 *           speculation, paving over land, urban sprawl, land grabbing,
 *           territorial claim, rural exodus, farm succession, barren,
 *           lie fallow, dilapidated, food sovereignty, agricultural reform,
 *           agroecology, monoculture, soil fertility, perennial.
 *   Kalıp:  In the plan it is land consumption; in the village, an arable field. ·
 *           What the council calls land consolidation, the neighbor calls land speculation. ·
 *           A land use conflict is a dispute; paving over land is a fact. ·
 *           What land grabbing does is dress up a territorial claim as investment. ·
 *           Behind the rural exodus stands a failed farm succession. ·
 *           The barren fields lie fallow; the dilapidated barns do not. ·
 *           Food sovereignty demands that the agricultural reform be decided locally. ·
 *           Were it not for the agricultural subsidy, the agricultural transition would stall. ·
 *           They ask that every supplier meet a sustainability standard. ·
 *           Much as we praise agroecology, the monoculture feeds the city. ·
 *           The method, albeit soil-conserving, does not restore soil fertility. ·
 *           Although site-adapted, a species-rich field yields less.
 *
 * Ünitenin tek öğretme noktası FİİL + SIFAT YÜKLEMİ: „lie fallow“, „stand
 * empty“, „run dry“, „fall silent“, „come loose“, „go hungry“. Fiil „be“
 * değil ve anlamını yitirmemiş — duruşu fiil, durumu sıfat taşıyor — ve
 * ikisi AYRI sözcük: araya belirteç sokulabiliyor („lie completely
 * fallow“), sıfatın önüne derece sözcüğü konabiliyor. Kalıp üretken;
 * yazar bugün yenisini kurup anlaşılabiliyor. Yeniden ölçüm bu kursun
 * alışılmış yönünün TERSİ: Almanca aynı iki fikri tek fiile kaynaştırıyor
 * (bitişik yazılan, birlikte çekilen, sözlükte tek madde olan bir sözcük),
 * yani burada parçaları ayrı tutan İngilizce, bileştiren Almanca. Ölçü:
 * **BİLEŞTİRME ALIŞKANLIĞI DİLİN BÜTÜNÜNÜN DEĞİL SINIFIN ÖZELLİĞİ** —
 * isimlerde Almanca birleştirip İngilizce ayırıyordu, bu sınıfta yön ters.
 * Öğrenen için sonucu: Almanca konuşan „stand vacant“ı sözlükte
 * arayamayacağını, İngilizce konuşan ise Almanca karşılığının sözlükte
 * DURDUĞUNU ve yenisinin öylece uydurulamayacağını kabul etmek zorunda.
 */
export const enC1U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u16-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 16,
    title: "The last farm in San Michele",
    genre: "article",
    intro: "Gençlerin terk ettiği bir dağ köyünden röportaj. Tarlalar neden boş duruyor?",
    gloss: [
      { de: "barren", tr: "kıraç" },
      { de: "lie fallow", tr: "nadasta durmak" },
      { de: "a terrace", tr: "teras" },
      { de: "stone", tr: "taş" },
      { de: "a roof tile", tr: "kiremit" },
      { de: "come loose", tr: "gevşemek" },
      { de: "a goat", tr: "keçi" },
      { de: "a slope", tr: "yamaç" },
      { de: "a pupil", tr: "öğrenci" },
      { de: "a tractor", tr: "traktör" },
      { de: "idle", tr: "atıl" },
      { de: "abandoned", tr: "terk edilmiş" },
      { de: "stand vacant", tr: "boş durmak" },
      { de: "dilapidated", tr: "harap" },
      { de: "visible", tr: "görünür" },
      { de: "underground", tr: "yer altında" },
      { de: "a truck", tr: "kamyon" },
      { de: "a farmer", tr: "çiftçi" },
      { de: "regional", tr: "bölgesel" },
      { de: "the government", tr: "hükûmet" },
    ],
    minutes: 12,
    text:
      "THE LAST FARM IN SAN MICHELE\n" +
      "Twenty years ago, forty families worked the land around San Michele. Today one does. Walk up from the bus stop and the pattern is easy to see: the barren upper fields lie fallow, the terraces below them run wild, and half the stone barns along the road stand empty, their roof tiles coming loose one winter at a time.\n" +
      "Paolo Ferri, 71, still keeps goats on the slope behind the church. „My son went to Turin in 2009,“ he says. „Nobody came back after him. Behind the rural exodus stands a failed farm succession, every time. The land does not leave. The children do.“\n" +
      "The school fell silent in 2014, when the last six pupils were sent to the town in the valley. The shop closed two years later. Since then the tractors of three neighboring farms have lain idle in a shed that nobody has the key to anymore.\n" +
      "Not every empty field is abandoned, though. Some lie fallow on purpose, because a buyer from the city is waiting for a new road and a better price. What the council calls land consolidation, Ferri calls land speculation. „They buy ten small fields, make one big one and do nothing with it. It stands vacant until somebody builds holiday houses.“\n" +
      "The dilapidated barns are the most visible sign, but the most serious one is underground. In the dry summer of 2022 the village well ran dry for the first time in living memory, and the council had water brought up by truck for six weeks.\n" +
      "Ferri does not expect a return to the old days. What he would like is simpler: young farmers who are allowed to rent the fields cheaply for ten years. „Give them the land before it goes wild,“ he says. „A field that has lain idle for twenty years takes another twenty to bring back.“\n" +
      "The regional government says a program for young farmers is being prepared. It has been prepared, Ferri points out, since 2015.",
    questions: [
      {
        text: "How many families work the land around San Michele today?",
        options: ["one", "six", "forty"],
        answer: 0,
        explain: "„Twenty years ago, forty families worked the land around San Michele. Today one does.“",
      },
      {
        text: "Why do some fields lie fallow on purpose?",
        options: ["A buyer is waiting for a better price.", "The soil needs a rest.", "The well ran dry."],
        answer: 0,
        explain: "„Some lie fallow on purpose, because a buyer from the city is waiting for a new road and a better price.“",
      },
      {
        kind: "truefalse",
        text: "The village well had never run dry before 2022.",
        options: ["True", "False"],
        answer: 0,
        explain: "„In the dry summer of 2022 the village well ran dry for the first time in living memory…“",
      },
      {
        kind: "gapfill",
        text: "The school fell ___ in 2014, when the last six pupils were sent to the town in the valley.",
        options: [],
        answer: 0,
        accept: ["silent"],
        explain: "„The school fell silent in 2014, when the last six pupils were sent to the town in the valley.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Half the stone barns stand empty.",
          "The school fell silent in 2014.",
          "The village well ran dry in 2022.",
          "A program for young farmers is being prepared.",
        ],
        explain: "Köyün bugünkü görüntüsü, okulun kapanması, kuruyan kuyu, en sonda bekleyen program.",
      },
      {
        kind: "short_answer",
        text: "What does Ferri want young farmers to be allowed to do?",
        options: [],
        answer: 0,
        accept: ["rent the fields cheaply", "rent the fields", "rent the land"],
        explain: "„young farmers who are allowed to rent the fields cheaply for ten years.“",
      },
    ],
  },
  {
    id: "en-c1-u16-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 16,
    title: "Warehouses on good soil",
    genre: "opinion",
    intro: "Tarım arazisine kurulacak lojistik parkı hakkında bir köşe yazısı. Yazar meclisten ne istiyor?",
    gloss: [
      { de: "logistics", tr: "lojistik" },
      { de: "northern", tr: "kuzeydeki" },
      { de: "an edge", tr: "kenar" },
      { de: "a truck", tr: "kamyon" },
      { de: "a hectare", tr: "hektar" },
      { de: "a supporter", tr: "destekçi" },
      { de: "concrete", tr: "beton" },
      { de: "a creek", tr: "dere" },
      { de: "sink into", tr: "içine sızmak" },
      { de: "a brochure", tr: "broşür" },
      { de: "reverse", tr: "geri almak / tersine çevirmek" },
    ],
    minutes: 12,
    text:
      "Next month the district council will vote on a logistics park on the northern edge of Bellmont: eleven warehouses, a truck yard and a new access road on 60 hectares of land. In the planning documents it is land consumption; in the village, an arable field that the Ortiz family has farmed for three generations.\n" +
      "Supporters point to 400 jobs and a tax income the district badly needs. I do not doubt either number. What I doubt is that the council has understood what it is being asked to decide.\n" +
      "What the council calls land consolidation, the neighbors call land speculation. Over the past four years a company registered in another state has bought up the small fields along the road, one by one, always a little above the market price. Nobody broke a law. But the people who sold did not know about the road, and the people who bought clearly did.\n" +
      "A land use conflict is a dispute; paving over land is a fact. The dispute can be settled: somebody wins, somebody is paid, and the file closes. The concrete stays. Rain that falls on a truck yard runs off into the creek instead of sinking into the ground, and it will do that next year and in fifty years, whatever the council decided in May.\n" +
      "What land grabbing does, even in its polite local form, is dress up a territorial claim as an investment. The investment is real, and so is the claim. Only one of them is in the brochure.\n" +
      "I am not asking the council to say no. I am asking it to separate two lists before it votes. The first list holds everything a later council could change: the jobs, the rents, the traffic plan. The second holds what no later vote can reverse: the soil under the warehouses and the water that no longer reaches it.\n" +
      "The second list is always shorter. It is never on the first page. It should be.",
    questions: [
      {
        text: "How many jobs do supporters of the park expect?",
        options: ["400", "60", "11"],
        answer: 0,
        explain: "„Supporters point to 400 jobs and a tax income the district badly needs.“",
      },
      {
        text: "What does the writer ask the council to do?",
        options: ["separate two lists before it votes", "vote against the park", "buy back the fields"],
        answer: 0,
        explain: "„I am asking it to separate two lists before it votes.“",
      },
      {
        kind: "truefalse",
        text: "The company broke the law when it bought the fields.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody broke a law.“",
      },
      {
        kind: "gapfill",
        text: "A land use conflict is a dispute; paving over land is a ___.",
        options: [],
        answer: 0,
        accept: ["fact"],
        explain: "„A land use conflict is a dispute; paving over land is a fact.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The council will vote on a logistics park.",
          "A company bought up the small fields.",
          "Rain runs off into the creek.",
          "The second list is always shorter.",
        ],
        explain: "Oylama, arazi alımları, betonun kalıcı etkisi, en sonda yazarın isteği.",
      },
      {
        kind: "short_answer",
        text: "What does the second list hold?",
        options: [],
        answer: 0,
        accept: ["what no vote can reverse", "the soil and the water", "the soil"],
        explain: "„The second holds what no later vote can reverse: the soil under the warehouses and the water that no longer reaches it.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u16-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 16,
    title: "Agroecology and the city",
    genre: "interview",
    intro: "Deneme çiftliği yürüten bir araştırmacıyla radyo söyleşisi. Agroekoloji şehri doyurabilir mi?",
    gloss: [
      { de: "wheat", tr: "buğday" },
      { de: "certainly", tr: "kesinlikle" },
      { de: "uniform", tr: "tek tip" },
      { de: "a harvest", tr: "hasat" },
      { de: "in the meantime", tr: "bu arada" },
      { de: "a hectare", tr: "hektar" },
      { de: "grain", tr: "tahıl" },
      { de: "perennial", tr: "çok yıllık" },
      { de: "a farmer", tr: "çiftçi" },
      { de: "a trade", tr: "takas" },
      { de: "appear", tr: "görünmek" },
      { de: "a proposal", tr: "öneri" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ethan", text: "Leah, you have run a trial farm for twelve years. Can agroecology feed a city like ours?" },
      { speaker: "Leah", text: "Not yet, and I say that as someone who believes in it. Much as we praise agroecology, the monoculture feeds the city." },
      { speaker: "Leah", text: "The wheat in your bread this morning almost certainly came from very large, very uniform fields." },
      { speaker: "Ethan", text: "So why keep going with the trial?" },
      { speaker: "Leah", text: "Because those uniform fields are losing their soil. The method we use, albeit soil-conserving, does not restore soil fertility quickly. It stops the losses first." },
      { speaker: "Ethan", text: "How long before the soil actually improves?" },
      { speaker: "Leah", text: "On our land, about a decade before the measurements move. That is hard to explain to a ministry that wants results this spring." },
      { speaker: "Ethan", text: "And the harvest in the meantime?" },
      { speaker: "Leah", text: "Lower. Although site-adapted, a species-rich field yields less per hectare in the first years. We mix perennial grasses with the grain, and the grass needs time." },
      { speaker: "Ethan", text: "Farmers cannot live on less for ten years." },
      { speaker: "Leah", text: "No, and I would never ask them to. The lower yield has a price on it; the healthier soil does not. Only one side of the trade appears in the accounts." },
      { speaker: "Ethan", text: "What would change that?" },
      { speaker: "Leah", text: "Either pay farmers for the soil they build, or pay for the years in the middle. Every serious proposal I have seen is one of those two." },
    ],
    questions: [
      {
        text: "How long has Leah run a trial farm?",
        options: ["twelve years", "a decade", "one season"],
        answer: 0,
        explain: "„Leah, you have run a trial farm for twelve years.“",
      },
      {
        text: "How long before the measurements move on her land?",
        options: ["about a decade", "one spring", "two years"],
        answer: 0,
        explain: "„On our land, about a decade before the measurements move.“",
      },
      {
        kind: "truefalse",
        text: "Only one side of the trade appears in the accounts.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Only one side of the trade appears in the accounts.“",
      },
      {
        kind: "gapfill",
        text: "Much as we praise agroecology, the ___ feeds the city.",
        options: [],
        answer: 0,
        accept: ["monoculture"],
        explain: "„Much as we praise agroecology, the monoculture feeds the city.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The method we use, albeit soil-conserving, does not restore soil fertility quickly.",
          "The method we use, albeit soil-conserving, does not restore soil fertility quickly",
        ],
        explain: "Yöntem toprağı koruyor ama verimliliği hızla geri getirmiyor; „albeit“ bu tavizi taşıyor.",
      },
      {
        kind: "short_answer",
        text: "What does Leah mix with the grain?",
        options: [],
        answer: 0,
        accept: ["perennial grasses", "grasses", "perennial grass"],
        explain: "„We mix perennial grasses with the grain, and the grass needs time.“",
      },
    ],
  },
  {
    id: "en-c1-u16-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 16,
    title: "Speech to the farmers' assembly",
    genre: "monologue",
    intro: "Bir üretici kooperatifinin bölge meclisindeki konuşması. Kooperatif ne talep ediyor?",
    gloss: [
      { de: "a cooperative", tr: "kooperatif" },
      { de: "a capital", tr: "başkent" },
      { de: "an inspector", tr: "denetçi" },
      { de: "propose", tr: "önermek" },
      { de: "tied to", tr: "bağlı" },
      { de: "a hectare", tr: "hektar" },
      { de: "a farmer", tr: "çiftçi" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Imogen", text: "Good evening. I speak for the cooperative of the Lower Valley, and I will be brief, because our list of demands is brief." },
      { speaker: "Imogen", text: "First, food sovereignty. We demand that the agricultural reform be decided locally, by the people who farm this valley, and not in a capital four hundred kilometers away." },
      { speaker: "Imogen", text: "Second, we ask that every supplier to the school kitchens meet a sustainability standard, with a number, a method and an inspector who visits the farm." },
      { speaker: "Imogen", text: "A goal on a poster costs nothing. A standard costs something, and that is exactly why we insist that it be written into every contract." },
      { speaker: "Imogen", text: "Third, the subsidy. Were it not for the agricultural subsidy, the transition on most of our farms would stall within two years. We do not hide that." },
      { speaker: "Imogen", text: "We propose that the subsidy be tied to soil measurements, taken at the start and at the end of each contract, and not to the number of hectares." },
      { speaker: "Imogen", text: "Some of you will say that this helps large farms less. It does. We recommend that the savings go to young farmers taking over a family farm." },
      { speaker: "Imogen", text: "Last, we request that the council publish the results every year, farm by farm, so that nobody has to guess who is meeting the standard." },
      { speaker: "Imogen", text: "If these demands are met, the valley will feed its own schools within five years. If they are not, we will be back next spring with the same list." },
    ],
    questions: [
      {
        text: "Who should decide the agricultural reform, according to Imogen?",
        options: ["the people who farm the valley", "the capital", "the school kitchens"],
        answer: 0,
        explain: "„We demand that the agricultural reform be decided locally, by the people who farm this valley…“",
      },
      {
        text: "What should the subsidy be tied to?",
        options: ["soil measurements", "the number of hectares", "school meals"],
        answer: 0,
        explain: "„We propose that the subsidy be tied to soil measurements…“",
      },
      {
        kind: "truefalse",
        text: "Imogen says the transition would work without the subsidy.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Were it not for the agricultural subsidy, the transition on most of our farms would stall within two years.“",
      },
      {
        kind: "gapfill",
        text: "We ask that every supplier to the school kitchens ___ a sustainability standard.",
        options: [],
        answer: 0,
        accept: ["meet"],
        explain: "„Second, we ask that every supplier to the school kitchens meet a sustainability standard…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "We demand that the agricultural reform be decided locally",
          "We demand that the agricultural reform be decided locally.",
        ],
        explain: "Talep bildiren cümlede fiil yalın kalıyor: „be decided“.",
      },
      {
        kind: "short_answer",
        text: "Who should get the savings?",
        options: [],
        answer: 0,
        accept: ["young farmers", "young farmers taking over a farm"],
        explain: "„We recommend that the savings go to young farmers taking over a family farm.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u16-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 16,
    title: "The emptying countryside",
    genre: "info",
    intro: "Boşalan bir köy ve tarlaları üzerine notlar yaz.",
    gloss: [
      { de: "barren", tr: "kıraç" },
      { de: "to lie fallow", tr: "nadasta durmak" },
      { de: "dilapidated", tr: "harap" },
      { de: "land grabbing", tr: "toprak gaspı" },
      { de: "a rural exodus", tr: "kırdan kente göç" },
      { de: "land consumption", tr: "arazi tüketimi" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kıraç tarlalar nadasta duruyor; harap ambarlar durmuyor.",
        answer: "The barren fields lie fallow; the dilapidated barns do not.",
        hint: "Duruş fiilde, durum sıfatta; ikisi ayrı sözcük.",
      },
      {
        kind: "build",
        tr: "Toprak gaspının yaptığı şey bir toprak talebini yatırım kılığına sokmaktır.",
        answer: "What land grabbing does is dress up a territorial claim as investment.",
        hint: "Soyut isim baştaki yuvada ve kendi fiili var.",
      },
      {
        kind: "build",
        tr: "Kırdan kente göçün arkasında başarısız bir çiftlik devri duruyor.",
        answer: "Behind the rural exodus stands a failed farm succession.",
        hint: "Yine bir duruş fiili; bu kez baştaki yuvayı bir yer almış.",
      },
      {
        kind: "build",
        tr: "Planda arazi tüketimi, köyde ekilebilir bir tarla.",
        answer: "In the plan it is land consumption; in the village, an arable field.",
        hint: "İki oda, iki sözcük; ikinci yarıda fiil yok.",
      },
      {
        kind: "build",
        tr: "Arazi kullanım çatışması bir anlaşmazlıktır; toprağın betonlaşması bir olgudur.",
        answer: "A land use conflict is a dispute; paving over land is a fact.",
        hint: "Biri oylanabilir, öteki yalnız ölçülebilir.",
      },
      {
        kind: "form",
        prompt: "Köy haberi için durum kartını doldur.",
        facts: "San Michele'de yirmi yıl önce kırk aile toprağı işliyordu, bugün tek bir aile işliyor; yukarıdaki tarlalar nadasta duruyor; okul 2014'te kapandı; köyün kuyusu 2022'de ilk kez kurudu.",
        fields: [
          { label: "Families today", answer: "one", accept: ["one family", "1"] },
          { label: "The upper fields", answer: "lie fallow", accept: ["they lie fallow", "fallow"] },
          { label: "The school", answer: "fell silent in 2014", accept: ["closed in 2014", "2014"] },
          { label: "The village well", answer: "ran dry in 2022", accept: ["ran dry", "2022"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u16-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 16,
    title: "Farming policy",
    genre: "info",
    intro: "Bir kooperatifin talepleri ve verim ile çeşitlilik tartışması için cümleler kur.",
    gloss: [
      { de: "food sovereignty", tr: "gıda egemenliği" },
      { de: "an agricultural subsidy", tr: "tarım sübvansiyonu" },
      { de: "a sustainability standard", tr: "sürdürülebilirlik standardı" },
      { de: "agroecology", tr: "agroekoloji" },
      { de: "a monoculture", tr: "tek ürün tarımı" },
      { de: "soil fertility", tr: "toprak verimliliği" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Gıda egemenliği tarım reformunun yerel olarak kararlaştırılmasını talep eder.",
        answer: "Food sovereignty demands that the agricultural reform be decided locally.",
        hint: "Talep eden bir kavram; „be“ olduğu gibi kalıyor.",
      },
      {
        kind: "build",
        tr: "Tarım sübvansiyonu olmasa tarımsal dönüşüm tıkanırdı.",
        answer: "Were it not for the agricultural subsidy, the agricultural transition would stall.",
        hint: "Fiil başta, bağlaç yok; savın dayanağı burada.",
      },
      {
        kind: "build",
        tr: "Her tedarikçinin bir sürdürülebilirlik standardını karşılamasını istiyorlar.",
        answer: "They ask that every supplier meet a sustainability standard.",
        hint: "Tek eksik harf, belgenin dişi olan tek satırı.",
      },
      {
        kind: "build",
        tr: "Agroekolojiyi ne kadar övsek de şehri tek ürün tarımı doyuruyor.",
        answer: "Much as we praise agroecology, the monoculture feeds the city.",
        hint: "Bu alandaki en dürüst cümle.",
      },
      {
        kind: "build",
        tr: "Yöntem, toprağı korusa da, toprak verimliliğini onarmıyor.",
        answer: "The method, albeit soil-conserving, does not restore soil fertility.",
        hint: "Korumak ile onarmak iki ayrı fiil.",
      },
    ],
  },
];
