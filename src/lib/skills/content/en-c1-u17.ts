import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 17 — "Çiftlik fiyatlarının sözcükleri, etiketi aktarmak,
 * toprak ne kadar dayanır, insancıl, tabii".
 *
 * Dört ders: The vocabulary of farm prices · Reporting the label ·
 * How long does soil last · Humane indeed.
 *
 *   Kelime: world market price, producer price, price volatility, free
 *           trade agreement, trade liberalization, country-of-origin labeling,
 *           traceability, field research, knowledge transfer, agronomic,
 *           soil erosion, deplete, overfertilize, nitrate pollution,
 *           pollinate, lush, factory farming, humane, milk quota.
 *   Kalıp:  A world market price is not a producer price. ·
 *           Price volatility is measured; a free trade agreement is signed. ·
 *           Trade liberalization and market regulation pull apart. ·
 *           One defends the country-of-origin labeling; another doubts the traceability. ·
 *           The sustainability report openly claims what the field research merely suggests. ·
 *           To call it knowledge transfer is not to call it agronomic advice. ·
 *           Soil erosion may well deplete the field in one generation. ·
 *           To overfertilize might mean nitrate pollution downstream. ·
 *           Pesticide use may kill what should pollinate and let the crop protection product seep away. ·
 *           The pasture was lush; the barn, less so. ·
 *           We have no factory farming here; we have humane housing. ·
 *           The milk quota, they said, and rather good for the small farm.
 *
 * Ünitenin tek öğretme noktası „NO“ İLE „NOT A“ ARASINDAKİ SEÇİM. „No“
 * bir belirleyici: ismin önüne geçip bütün TÜRÜ yadsıyor. „Not“ cümle
 * olumsuzlayıcısı: „have“ gibi bir fiille küçük yardımcı fiile gerek
 * duyuyor ve yadsıdığı şey bu ÖRNEĞİN burada olduğu. Yani „we have no
 * factory farming“ böyle bir şeyin türce bulunmadığını, „we do not have
 * factory farming“ ise burada olanın o olmadığını söylüyor; birincisi tek
 * bir ahırı göstererek yanıtlanabiliyor, ikincisi yanıtlanamıyor.
 * Almancanın tek bir olumsuz belirleyicisi var („kein“) ve ikisini birden
 * karşılıyor, hiçbir seçim taşımıyor. Ölçü: **ALMANCADA REFLEKS TEK BİÇİM
 * OLDUĞU İÇİN, ALMANCA KONUŞAN HER SEFERİNDE „NO“YA UZANIYOR VE İNGİLİZCE
 * SESSİZ OLANI KULLANACAKKEN VURGULU OLANA DÜŞÜYOR** — ters yönlü uyarı:
 * yanlış olan eksik bir sözcük değil, var olan ve bir beden fazla yüksek
 * bir sözcük, ve hiçbir şeyi yanlış olmadığı için kimse düzeltmiyor.
 * Seviyenin „We have no X here; we have Y“ üçlüsü (ünite 12, 15, 17)
 * böylece açıklanıyor: „no“ türü yadsıdığı için ikinci yarı örneği başka
 * bir adla kabul edebiliyor ve iki yarı çelişmiyor.
 */
export const enC1U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u17-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "Open day at Brookfield Dairy",
    genre: "article",
    intro: "Bir süt çiftliğinin açık günü üzerine haber. Çiftlik ne vaat ediyor, ne itiraf ediyor?",
    gloss: [
      { de: "a dairy", tr: "süt çiftliği" },
      { de: "humane", tr: "insancıl" },
      { de: "airy", tr: "havadar" },
      { de: "concrete", tr: "beton" },
      { de: "a stall", tr: "bölme" },
      { de: "a cow", tr: "inek" },
      { de: "dirt", tr: "pislik" },
      { de: "lush", tr: "gür" },
      { de: "the bottom", tr: "dip" },
      { de: "poor", tr: "yoksul" },
      { de: "regional", tr: "bölgesel" },
      { de: "a brochure", tr: "broşür" },
      { de: "the calves", tr: "buzağılar" },
      { de: "pretend", tr: "numara yapmak" },
      { de: "antibiotics", tr: "antibiyotik" },
      { de: "a lab", tr: "laboratuvar" },
    ],
    minutes: 12,
    text:
      "OPEN DAY AT BROOKFIELD DAIRY\n" +
      "„We have no factory farming here; we have humane housing,“ says Martin Naomi as he opens the gate of the new barn. It is the first thing he says to every group of visitors, and on a Saturday in June there are six groups.\n" +
      "The barn is bright and airy. There are no chains, no concrete stalls and no cows standing in their own dirt. The 120 animals move freely between the barn and the pasture, which is lush after a wet spring. The old barn, which still stands at the bottom of the yard, is a different story: the pasture was lush; the old barn, less so.\n" +
      "Naomi took over the farm from his father in 2015. At the time, the family had no plan for the future and no money for a new building. „The milk quota, they said, and rather good for the small farm,“ he remembers with a dry laugh. „It was not. It kept us small and it kept us poor.“\n" +
      "What changed the farm was not the end of the quota but a contract with a regional cheese maker, who pays a fixed price for milk from animals that spend at least 150 days a year outside. A world market price is not a producer price, Naomi explains: the first moves every week on a screen in another country; the second is what he can plan a year around.\n" +
      "Not everything is as the brochure says. The calves are still separated from their mothers after a few days, and Naomi does not pretend otherwise. „There is no perfect way to do this,“ he admits. „There is only a better way and a worse one.“\n" +
      "Visitors seem to accept that. Most of them leave with a bag of cheese and no complaints. One woman asks whether there are any antibiotics in the milk. „None,“ says Naomi. „And we have the lab reports to show it.“\n" +
      "By five in the afternoon the last group has gone, and the cows are back out on the grass.",
    questions: [
      {
        text: "What does Naomi say the farm does not have?",
        options: ["factory farming", "a pasture", "a new barn"],
        answer: 0,
        explain: "„We have no factory farming here; we have humane housing.“",
      },
      {
        text: "What changed the farm?",
        options: ["a contract with a cheese maker", "the end of the milk quota", "a new barn"],
        answer: 0,
        explain: "„What changed the farm was not the end of the quota but a contract with a regional cheese maker…“",
      },
      {
        kind: "truefalse",
        text: "The calves are still separated from their mothers after a few days.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The calves are still separated from their mothers after a few days…“",
      },
      {
        kind: "gapfill",
        text: "The pasture was lush; the old barn, less ___.",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "„the pasture was lush; the old barn, less so.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Naomi opens the gate of the new barn.",
          "Naomi took over the farm in 2015.",
          "The calves are separated from their mothers.",
          "The last group has gone.",
        ],
        explain: "Ahırın kapısı, çiftliğin geçmişi, dürüst bir itiraf, en sonda günün bitişi.",
      },
      {
        kind: "short_answer",
        text: "How many days a year must the animals spend outside?",
        options: [],
        answer: 0,
        accept: ["at least 150", "150", "150 days"],
        explain: "„…animals that spend at least 150 days a year outside.“",
      },
    ],
  },
  {
    id: "en-c1-u17-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "A floor under milk prices",
    genre: "opinion",
    intro: "Süt fiyatlarındaki dalgalanma üzerine bir görüş yazısı. Yazar hangi çözümü öneriyor?",
    gloss: [
      { de: "a farmer", tr: "çiftçi" },
      { de: "a region", tr: "bölge" },
      { de: "a herd", tr: "sürü" },
      { de: "frame", tr: "çerçevelemek" },
      { de: "a dairy", tr: "mandıra" },
      { de: "a hauler", tr: "nakliyeci" },
      { de: "particular", tr: "belirli" },
      { de: "the government", tr: "hükûmet" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "survive", tr: "ayakta kalmak" },
      { de: "halve", tr: "yarıya inmek" },
      { de: "a fund", tr: "fon" },
      { de: "propose", tr: "önermek" },
    ],
    minutes: 12,
    text:
      "When the price of milk fell by a third in 2023, the farmers in our region did not lose money on average. They lost it in March, April and May, and three of them sold their herds before the price came back in the fall.\n" +
      "That is the problem with the way the debate is usually framed. A world market price is not a producer price. The first is set on exchanges in other countries and reported every week; the second is what a dairy actually pays at the farm gate, after the hauler, the buyer and the supermarket have taken their share. And price volatility is measured, while a free trade agreement is signed: one is a fact about markets, the other a decision made by a delegation on a particular date, with names attached.\n" +
      "Trade liberalization and market regulation pull apart, and our government has tried to do both in the same decade. It opened the border to cheaper milk powder in 2018 and promised stable incomes to small farms in 2020. Neither promise was dishonest. Together they cannot both be kept.\n" +
      "Farmers do not live on averages. They live through swings, and a swing is not a smaller version of a low price. It is a different problem. A farm with high costs can survive a low price for a year if it knows the price in advance; it cannot survive a price that halves in eight weeks.\n" +
      "The answer is not a higher average price, which consumers would rightly refuse to pay. It is a floor: a minimum price, paid from a fund that farms fill in good years and draw on in bad ones. Canada has used a version of this for decades. It is not perfect, and it is not free.\n" +
      "But when the next report offers an average as the answer to a swing, it will have changed the question. Farmers will notice, even if the ministry does not.",
    questions: [
      {
        text: "When did the farmers lose money?",
        options: ["in March, April and May", "in the fall", "on average"],
        answer: 0,
        explain: "„They lost it in March, April and May…“",
      },
      {
        text: "What does the writer propose?",
        options: ["a minimum price paid from a fund", "a higher average price", "closing the border"],
        answer: 0,
        explain: "„It is a floor: a minimum price, paid from a fund that farms fill in good years and draw on in bad ones.“",
      },
      {
        kind: "truefalse",
        text: "The writer thinks consumers should pay a higher average price.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The answer is not a higher average price, which consumers would rightly refuse to pay.“",
      },
      {
        kind: "gapfill",
        text: "Price volatility is measured, while a free trade agreement is ___.",
        options: [],
        answer: 0,
        accept: ["signed"],
        explain: "„And price volatility is measured, while a free trade agreement is signed…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The price of milk fell by a third.",
          "The border was opened to cheaper milk powder.",
          "A swing is a different problem.",
          "Farmers will notice.",
        ],
        explain: "Fiyat düşüşü, hükûmetin iki kararı, sorunun doğası, en sonda uyarı.",
      },
      {
        kind: "short_answer",
        text: "How long has Canada used a version of this?",
        options: [],
        answer: 0,
        accept: ["for decades", "decades"],
        explain: "„Canada has used a version of this for decades.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u17-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 17,
    title: "Soil on a slope",
    genre: "dialogue",
    intro: "Toprak erozyonu ve gübre üzerine bir sohbet. Bir kuşakta ne tükenebilir, bedeli kim ödüyor?",
    gloss: [
      { de: "fall", tr: "sonbahar" },
      { de: "flat", tr: "düz" },
      { de: "build", tr: "kurmak" },
      { de: "appear", tr: "belirmek" },
      { de: "appears", tr: "beliriyor" },
      { de: "fertilizer", tr: "gübre" },
      { de: "invoice", tr: "fatura" },
      { de: "belong", tr: "ait olmak" },
      { de: "calculation", tr: "hesap" },
      { de: "a generation", tr: "kuşak" },
      { de: "a slope", tr: "yamaç" },
      { de: "a centimeter", tr: "santimetre" },
      { de: "a century", tr: "yüzyıl" },
      { de: "downstream", tr: "akıntı aşağısı" },
      { de: "a well", tr: "kuyu" },
      { de: "a village", tr: "köy" },
      { de: "a bee", tr: "arı" },
      { de: "an orchard", tr: "meyve bahçesi" },
      { de: "rented", tr: "kiralanan" },
      { de: "a cost", tr: "maliyet" },
      { de: "a landlord", tr: "toprak sahibi" },
      { de: "the top", tr: "üst katman" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Sean", text: "Soil erosion may well deplete the field in one generation. On a slope like this one, yes. On a flat field it will not." },
      { speaker: "Wendy", text: "So it depends on the slope." },
      { speaker: "Sean", text: "On the slope and on what is holding the top. A centimeter takes a century to build and a bad fall to move, and those two numbers are the whole subject." },
      { speaker: "Wendy", text: "To overfertilize might mean nitrate pollution downstream." },
      { speaker: "Sean", text: "Might, and usually does, and the important part is downstream. The cost does not appear on the field it came from." },
      { speaker: "Wendy", text: "It appears in a well in the next village." },
      { speaker: "Sean", text: "In a well, two years later, in a village whose name is not in anybody's file. That is why the rule has to be written and cannot be left to the person paying for the fertilizer." },
      { speaker: "Wendy", text: "Pesticide use may kill what should pollinate and let the crop protection product seep away." },
      { speaker: "Sean", text: "Two losses at once, and only one of them is on an invoice. The bees belong to the orchard four fields over and nobody sends a bill." },
      { speaker: "Wendy", text: "Would a rented field change the calculation?" },
      { speaker: "Sean", text: "It changes everything. A tenant pays for this year and a landlord owns the century, and no lease I have read puts a number on the soil." },
      { speaker: "Wendy", text: "What would you put in one?" },
      { speaker: "Sean", text: "A measurement at the start and a measurement at the end, and the difference priced. It is two afternoons of work and it would end half of these arguments." },
    ],
    questions: [
      {
        text: "How long does a centimeter take to build?",
        options: ["a century", "a generation", "a fall"],
        answer: 0,
        explain: "„A centimeter takes a century to build and a bad fall to move…“",
      },
      {
        text: "Where does the cost appear?",
        options: ["in a well in the next village", "on the same field", "on an invoice"],
        answer: 0,
        explain: "„In a well, two years later, in a village whose name is not in anybody's file.“",
      },
      {
        kind: "truefalse",
        text: "Only one of the two losses is on an invoice.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Two losses at once, and only one of them is on an invoice.“",
      },
      {
        kind: "gapfill",
        text: "Soil erosion may well ___ the field in one generation.",
        options: [],
        answer: 0,
        accept: ["deplete"],
        explain: "„Soil erosion may well deplete the field in one generation.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["To overfertilize might mean nitrate pollution downstream.", "To overfertilize might mean nitrate pollution downstream"],
        explain: "Fazla gübrenin bedeli tarlada değil, aşağıdaki suda ortaya çıkıyor.",
      },
      {
        kind: "short_answer",
        text: "What would he put in a lease?",
        options: [],
        answer: 0,
        accept: ["two measurements", "a measurement at each end", "the difference priced"],
        explain: "„A measurement at the start and a measurement at the end, and the difference priced.“",
      },
    ],
  },
  {
    id: "en-c1-u17-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 17,
    title: "Label and traceability",
    genre: "monologue",
    intro: "Etiketi savunan ile izlenebilirlikten kuşku duyan aynı masada.",
    gloss: [
      { de: "a researcher", tr: "araştırmacı" },
      { de: "region", tr: "bölge" },
      { de: "anywhere", tr: "hiçbir yerde" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "neutral", tr: "yansız" },
      { de: "yourself", tr: "kendin" },
      { de: "a label", tr: "etiket" },
      { de: "defends", tr: "savunuyor" },
      { de: "doubts", tr: "kuşku duyuyor" },
      { de: "a batch", tr: "üretim partisi" },
      { de: "a mill", tr: "değirmen" },
      { de: "an assumption", tr: "varsayım" },
      { de: "a sample", tr: "örneklem" },
      { de: "a footnote", tr: "dipnot" },
      { de: "advice", tr: "danışmanlık" },
      { de: "a seller", tr: "satıcı" },
      { de: "free", tr: "ücretsiz" },
      { de: "an invoice", tr: "fatura" },
      { de: "assume", tr: "varsaymak" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Lorna", text: "One defends the country-of-origin labeling; another doubts the traceability. Two people at one table and they are not disagreeing about the same thing." },
      { speaker: "Lorna", text: "A label is a claim on a package. Traceability is whether a batch can be followed from a field to a mill to a shelf, and the second is a question about systems." },
      { speaker: "Lorna", text: "You can have a perfectly honest label and no traceability at all, because the label says where the last step happened and nothing before it." },
      { speaker: "Lorna", text: "The sustainability report openly claims what the field research merely suggests. The report is sure and the researchers are not, and the questions start in the gap between them." },
      { speaker: "Lorna", text: "The assumption the report hides is usually the sample. Forty farms, chosen because they answered the letter, and the report says „farms in the region“ with no number in the sentence." },
      { speaker: "Lorna", text: "Find the sample size before you read anything else. It is in a footnote, and when it is not in a footnote it is not anywhere." },
      { speaker: "Lorna", text: "To call it knowledge transfer is not to call it agronomic advice. A farmer needs that difference, and a seller does not want it written down." },
      { speaker: "Lorna", text: "Transfer means somebody gave you information. Advice means somebody told you what to do on your field, and only the second one carries any responsibility." },
      { speaker: "Lorna", text: "The advice that comes free from a seller is the advice that sells a product. That is not dishonest and it is not neutral, and both of those are true at once." },
      { speaker: "Lorna", text: "So ask for the invoice. If nobody is paid for the advice, read it as information and make the decision yourself." },
    ],
    questions: [
      {
        text: "What does a label say?",
        options: ["where the last step happened", "the whole chain", "the sample size"],
        answer: 0,
        explain: "„the label says where the last step happened and nothing before it.“",
      },
      {
        text: "What is the assumption usually?",
        options: ["the sample", "the region", "the mill"],
        answer: 0,
        explain: "„The assumption the report hides is usually the sample.“",
      },
      {
        kind: "truefalse",
        text: "Transfer carries the same responsibility as advice.",
        options: ["True", "False"],
        answer: 1,
        explain: "„only the second one carries any responsibility.“",
      },
      {
        kind: "gapfill",
        text: "One defends the country-of-origin labeling; another ___ the traceability.",
        options: [],
        answer: 0,
        accept: ["doubts"],
        explain: "„One defends the country-of-origin labeling; another doubts the traceability.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The sustainability report openly claims what the field research merely suggests.", "The sustainability report openly claims what the field research merely suggests"],
        explain: "İki belge: biri açıkça iddia ediyor, öteki yalnızca işaret ediyor.",
      },
      {
        kind: "short_answer",
        text: "What should you ask for?",
        options: [],
        answer: 0,
        accept: ["the invoice", "an invoice", "who was paid"],
        explain: "„So ask for the invoice.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u17-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 17,
    title: "Farm life and prices",
    genre: "info",
    intro: "Bir süt çiftliği ve süt fiyatları üzerine notlar yaz.",
    gloss: [
      { de: "factory farming", tr: "endüstriyel hayvancılık" },
      { de: "humane", tr: "insancıl" },
      { de: "a milk quota", tr: "süt kotası" },
      { de: "a world market price", tr: "dünya piyasa fiyatı" },
      { de: "price volatility", tr: "fiyat oynaklığı" },
      { de: "lush", tr: "gür" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Burada endüstriyel hayvancılık yok, insancıl barındırma var.",
        answer: "We have no factory farming here; we have humane housing.",
        hint: "„No“ türü yadsıyor; ikinci yarı örneği başka adla kabul ediyor.",
      },
      {
        kind: "build",
        tr: "Dünya piyasa fiyatı bir üretici fiyatı değildir.",
        answer: "A world market price is not a producer price.",
        hint: "Öteki olumsuzlayıcı: iki isim öbeğinin aynı olmadığı söyleniyor.",
      },
      {
        kind: "build",
        tr: "Mera gürdü; ahır, daha az.",
        answer: "The pasture was lush; the barn, less so.",
        hint: "İkinci yarı sıfatı da fiili de ödünç alıyor.",
      },
      {
        kind: "build",
        tr: "Süt kotası, dediler, ve küçük çiftlik için epeyce iyi.",
        answer: "The milk quota, they said, and rather good for the small farm.",
        hint: "Sondaki iltifat güvenilmeyecek yer.",
      },
      {
        kind: "build",
        tr: "Fiyat oynaklığı ölçülür; serbest ticaret anlaşması imzalanır.",
        answer: "Price volatility is measured; a free trade agreement is signed.",
        hint: "İki edilgen, iki ayrı tür: biri usul, öteki imza.",
      },
      {
        kind: "form",
        prompt: "Açık gün haberi için çiftlik kartını doldur.",
        facts: "Brookfield çiftliğinde 120 hayvan var; hayvanlar yılda en az 150 gün dışarıda; süt sabit fiyatla bölgedeki bir peynir üreticisine gidiyor; çiftlikte endüstriyel hayvancılık yok.",
        fields: [
          { label: "Animals", answer: "120", accept: ["120 animals"] },
          { label: "Days outside per year", answer: "at least 150", accept: ["150", "150 days"] },
          { label: "The milk goes to", answer: "a cheese maker", accept: ["the cheese maker", "cheese maker"] },
          { label: "The price", answer: "a fixed price", accept: ["fixed", "fixed price"] },
          { label: "Factory farming", answer: "none", accept: ["no factory farming", "no"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u17-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 17,
    title: "Soil and food labels",
    genre: "info",
    intro: "Etiketin iki katmanı ve toprağın süresi.",
    gloss: [
      { de: "country-of-origin labeling", tr: "menşe etiketlemesi" },
      { de: "traceability", tr: "izlenebilirlik" },
      { de: "knowledge transfer", tr: "bilgi aktarımı" },
      { de: "soil erosion", tr: "toprak erozyonu" },
      { de: "to overfertilize", tr: "aşırı gübrelemek" },
      { de: "to pollinate", tr: "tozlaştırmak" },
      { de: "assume", tr: "varsaymak" },
      { de: "generation", tr: "kuşak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Biri menşe etiketlemesini savunuyor; bir başkası izlenebilirlikten kuşku duyuyor.",
        answer: "One defends the country-of-origin labeling; another doubts the traceability.",
        hint: "İki kişi aynı şey hakkında anlaşmazlığa düşmüyor.",
      },
      {
        kind: "build",
        tr: "Sürdürülebilirlik raporu, saha araştırmasının yalnızca işaret ettiğini açıkça iddia ediyor.",
        answer: "The sustainability report openly claims what the field research merely suggests.",
        hint: "Raporun gizlediği varsayım genellikle örneklemdir.",
      },
      {
        kind: "build",
        tr: "Buna bilgi aktarımı demek agronomik danışmanlık demek değildir.",
        answer: "To call it knowledge transfer is not to call it agronomic advice.",
        hint: "Yalnız ikincisi sorumluluk taşıyor.",
      },
      {
        kind: "build",
        tr: "Toprak erozyonu tarlayı pekâlâ bir kuşakta tüketebilir.",
        answer: "Soil erosion may well deplete the field in one generation.",
        hint: "Düz tarlada tüketmez; çekince yerinde duruyor.",
      },
      {
        kind: "build",
        tr: "Aşırı gübrelemek akıntı aşağısında nitrat kirliliği demek olabilir.",
        answer: "To overfertilize might mean nitrate pollution downstream.",
        hint: "Fazla gübrenin bedeli tarlada değil, aşağıdaki suda ortaya çıkıyor.",
      },
    ],
  },
];
