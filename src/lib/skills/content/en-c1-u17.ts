import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 17 — "Çiftlik fiyatlarının sözcükleri, etiketi aktarmak,
 * toprak ne kadar dayanır, gerçekten türüne uygun".
 *
 * Dört ders: The vocabulary of farm prices · Reporting the label ·
 * How long does soil last · Species-appropriate indeed.
 *
 *   Kelime: world market price, producer price, price volatility, free
 *           trade agreement, trade liberalization, origin labeling,
 *           traceability, field research, knowledge transfer, agronomic,
 *           soil erosion, deplete, overfertilize, nitrate pollution,
 *           pollinate, lush, factory farming, species-appropriate, milk quota.
 *   Kalıp:  A world market price is not a producer price. ·
 *           Price volatility is measured; a free trade agreement is signed. ·
 *           Trade liberalization and market organization pull apart. ·
 *           One defends the origin labeling; another doubts the traceability. ·
 *           The sustainability report claims what the field research assumes. ·
 *           To call it knowledge transfer is not to call it agronomic advice. ·
 *           Soil erosion may well deplete the field in one generation. ·
 *           To overfertilize might mean nitrate pollution downstream. ·
 *           Pesticide use may kill what should pollinate and let the plant protection product seep away. ·
 *           The pasture was lush; the barn, less so. ·
 *           We have no factory farming here; we have species-appropriate housing. ·
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
    title: "Species-appropriate indeed",
    genre: "info",
    intro: "İki olumsuzlama var ve biri bir beden daha yüksek. Hangisi?",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "whatever", tr: "her ne" },
      { de: "large", tr: "büyük" },
      { de: "error", tr: "yanlış" },
      { de: "halves", tr: "yarılar" },
      { de: "ought", tr: "gerek" },
      { de: "a determiner", tr: "belirleyici" },
      { de: "denies", tr: "yadsıyor" },
      { de: "a category", tr: "tür" },
      { de: "a negator", tr: "olumsuzlayıcı" },
      { de: "a helping verb", tr: "yardımcı fiil" },
      { de: "the case", tr: "durum" },
      { de: "a kind", tr: "cins" },
      { de: "a shed", tr: "ahır" },
      { de: "pointing at", tr: "göstererek" },
      { de: "a reflex", tr: "refleks" },
      { de: "emphatic", tr: "vurgulu" },
      { de: "the quiet one", tr: "sessiz olanı" },
      { de: "a warning", tr: "uyarı" },
      { de: "a missing word", tr: "eksik sözcük" },
      { de: "one size too loud", tr: "bir beden fazla yüksek" },
      { de: "corrects", tr: "düzeltiyor" },
      { de: "the loud version", tr: "yüksek biçim" },
      { de: "grant", tr: "kabul etmek" },
      { de: "an accident", tr: "rastlantı" },
      { de: "an instance", tr: "örnek" },
      { de: "contradict", tr: "çelişmek" },
      { de: "the same thing", tr: "aynı şey" },
      { de: "a compliment", tr: "iltifat" },
      { de: "slow down", tr: "yavaşlamak" },
    ],
    minutes: 12,
    text:
      "We have no factory farming here; we have species-appropriate housing. Read the first half again and ask why it is not „we do not have factory farming here“.\n" +
      "The two are not the same sentence, and English speakers choose between them without thinking about it. „No“ is a determiner: it stands in front of the noun and denies the whole category. „Not“ is a sentence negator, and with a verb like „have“ it needs the little helping verb; what it denies is that this is the case here.\n" +
      "So the first version says there is no such thing on this farm as a kind. The second says that whatever is here, it is not that. The difference is small in the sentence and large in a room, because the second one cannot be answered by pointing at one shed and the first one can.\n" +
      "A neighbouring language has only one of these. Its single negative determiner covers both jobs, stands in front of the noun in every case, and carries no choice with it at all. Which means a speaker coming from there reaches for „no“ every time, because that is the shape the reflex already has, and lands on the emphatic English version in the places where English would have used the quiet one.\n" +
      "That is the warning this unit is for, and it runs the other way from most of them. The error is not a missing word. It is a word that is present and one size too loud, and nobody corrects it because nothing in it is wrong.\n" +
      "Now look at where this level has already used the loud version. „We have no deviance here.“ „We have no formation of elites here.“ Three times, and every time the sentence went on to grant the thing under another name. That is no accident: „no“ denies the category, which leaves the second half free to admit the instance, and the two halves do not contradict each other.\n" +
      "A world market price is not a producer price. And here is the other negator doing its own work — two noun phrases, one sentence, and what is denied is that these two are the same thing.\n" +
      "The milk quota, they said, and rather good for the small farm. One more inserted clause, one more compliment at the end, and by now the shape ought to be enough on its own to make a reader slow down.",
    questions: [
      {
        text: "What does „no“ deny?",
        options: ["the whole category", "this case", "the verb"],
        answer: 0,
        explain: "„it stands in front of the noun and denies the whole category.“",
      },
      {
        text: "What is the error?",
        options: ["a word one size too loud", "a missing word", "a wrong noun"],
        answer: 0,
        explain: "„It is a word that is present and one size too loud…“",
      },
      {
        kind: "truefalse",
        text: "The neighbouring language has both of these.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A neighbouring language has only one of these.“",
      },
      {
        kind: "gapfill",
        text: "We have ___ factory farming here; we have species-appropriate housing.",
        options: [],
        answer: 0,
        accept: ["no"],
        explain: "„We have no factory farming here; we have species-appropriate housing.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "We have no factory farming here; we have species-appropriate housing.",
          "„No“ denies the whole category.",
          "The error is a word one size too loud.",
          "A world market price is not a producer price.",
        ],
        explain: "Cümle, kural, uyarı; en sonda öteki olumsuzlayıcı.",
      },
      {
        kind: "short_answer",
        text: "What is the second half free to do?",
        options: [],
        answer: 0,
        accept: ["admit the instance", "grant it", "give it a name"],
        explain: "„which leaves the second half free to admit the instance…“",
      },
    ],
  },
  {
    id: "en-c1-u17-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "The vocabulary of farm prices",
    genre: "opinion",
    intro: "Ölçülen ile imzalanan aynı satırda. İkisi aynı tür mü?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "passives", tr: "edilgenler" },
      { de: "agent", tr: "eyleyen" },
      { de: "none", tr: "hiçbiri" },
      { de: "definite", tr: "belirli" },
      { de: "halves", tr: "yarılar" },
      { de: "practical", tr: "işe dönük" },
      { de: "passive", tr: "edilgen" },
      { de: "a column", tr: "sütun" },
      { de: "a farm gate", tr: "çiftlik kapısı" },
      { de: "a buyer", tr: "alıcı" },
      { de: "the gap", tr: "aralık" },
      { de: "a haulier", tr: "nakliyeci" },
      { de: "a shelf", tr: "raf" },
      { de: "measured", tr: "ölçülen" },
      { de: "signed", tr: "imzalanan" },
      { de: "a delegation", tr: "heyet" },
      { de: "a date", tr: "tarih" },
      { de: "a procedure", tr: "usul" },
      { de: "pull apart", tr: "birbirinden ayrılıyor" },
      { de: "a pair", tr: "çift" },
      { de: "a floor price", tr: "taban fiyat" },
      { de: "a border", tr: "sınır" },
      { de: "the same decade", tr: "aynı on yıl" },
      { de: "a promise", tr: "söz" },
      { de: "a farmer", tr: "çiftçi" },
      { de: "a swing", tr: "oynama" },
      { de: "an average", tr: "ortalama" },
      { de: "survives", tr: "sağ kalıyor" },
      { de: "a bad year", tr: "kötü yıl" },
    ],
    minutes: 12,
    text:
      "A world market price is not a producer price. Two nouns that both end in the same word, and a paragraph that treats them as one has already made its mistake.\n" +
      "A world market price is a number in a column somewhere else. A producer price is what is paid at a farm gate on a Tuesday, and the gap between the two is a haulier, a buyer, a shelf and a month.\n" +
      "Price volatility is measured; a free trade agreement is signed. Two passives in one line, and by now this level has met enough of them to sort the pair without help.\n" +
      "The first has no agent and needs none: measuring is what a procedure does. The second has a very definite agent left out on purpose, because an agreement is signed by a delegation, on a date, and every one of those is in the file.\n" +
      "Trade liberalization and market organization pull apart. Here is a verb that needs two things to be true at once, and both halves of the subject are in front of it.\n" +
      "They pull apart because they were built for opposite jobs. One removes a floor price and opens a border. The other puts a floor under a price and keeps a market inside a rule. A country that did both in the same decade has two files that each promise the other will not happen.\n" +
      "The practical part of this lesson is one number. A farmer does not live on an average; a farmer lives through a swing. Volatility is not a smaller version of a low price. It is a different problem, and the answer to it is not a higher average but a floor that survives a bad year.\n" +
      "So when a report offers an average as an answer to a swing, it has changed the question. Read the sentence twice, find which of the two numbers is missing, and you will usually find that the missing one is the one the reader needed.",
    questions: [
      {
        text: "What is a producer price?",
        options: ["what is paid at a farm gate", "a number in a column", "an average"],
        answer: 0,
        explain: "„A producer price is what is paid at a farm gate on a Tuesday…“",
      },
      {
        text: "What does a farmer live through?",
        options: ["a swing", "an average", "a shelf"],
        answer: 0,
        explain: "„a farmer lives through a swing.“",
      },
      {
        kind: "truefalse",
        text: "The first passive has an agent left out on purpose.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The first has no agent and needs none…“",
      },
      {
        kind: "gapfill",
        text: "Trade liberalization and market organization pull ___.",
        options: [],
        answer: 0,
        accept: ["apart"],
        explain: "„Trade liberalization and market organization pull apart.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A world market price is not a producer price.",
          "Price volatility is measured; a free trade agreement is signed.",
          "Trade liberalization and market organization pull apart.",
          "A farmer lives through a swing.",
        ],
        explain: "İki fiyat, iki edilgen, iki yön; en sonda gerçek sorun.",
      },
      {
        kind: "short_answer",
        text: "What is the answer to a swing?",
        options: [],
        answer: 0,
        accept: ["a floor", "a floor price", "not an average"],
        explain: "„the answer to it is not a higher average but a floor that survives a bad year.“",
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
    title: "How long does soil last",
    genre: "dialogue",
    intro: "Bir kuşakta tükenen şey nedir? Çekince neyi ayakta tutuyor?",
    gloss: [
      { de: "hedge", tr: "çekince" },
      { de: "build", tr: "kurmak" },
      { de: "appear", tr: "belirmek" },
      { de: "appears", tr: "beliriyor" },
      { de: "fertiliser", tr: "gübre" },
      { de: "invoice", tr: "fatura" },
      { de: "belong", tr: "ait olmak" },
      { de: "calculation", tr: "hesap" },
      { de: "a generation", tr: "kuşak" },
      { de: "a slope", tr: "yamaç" },
      { de: "a centimetre", tr: "santimetre" },
      { de: "a century", tr: "yüzyıl" },
      { de: "downstream", tr: "akıntı aşağısı" },
      { de: "a well", tr: "kuyu" },
      { de: "a village", tr: "köy" },
      { de: "a bee", tr: "arı" },
      { de: "an orchard", tr: "meyve bahçesi" },
      { de: "rented", tr: "kiralanan" },
      { de: "a cost", tr: "maliyet" },
      { de: "a landlord", tr: "toprak sahibi" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Doruk", text: "Soil erosion may well deplete the field in one generation. The hedge is right there and I keep it, because on a flat field it will not." },
      { speaker: "Sıla", text: "So it depends on the slope." },
      { speaker: "Doruk", text: "On the slope and on what is holding the top. A centimetre takes a century to build and a bad autumn to move, and those two numbers are the whole subject." },
      { speaker: "Sıla", text: "To overfertilize might mean nitrate pollution downstream." },
      { speaker: "Doruk", text: "Might, and usually does, and the word that matters in that line is the last one. The cost does not appear on the field it came from." },
      { speaker: "Sıla", text: "It appears in a well in the next village." },
      { speaker: "Doruk", text: "In a well, two years later, in a village whose name is not in anybody's file. That is why the rule has to be written and cannot be left to the person paying for the fertiliser." },
      { speaker: "Sıla", text: "Pesticide use may kill what should pollinate and let the plant protection product seep away." },
      { speaker: "Doruk", text: "Two losses in one line and only one of them is on an invoice. The bees belong to the orchard four fields over and nobody sends a bill." },
      { speaker: "Sıla", text: "Would a rented field change the calculation?" },
      { speaker: "Doruk", text: "It changes everything. A tenant pays for this year and a landlord owns the century, and no lease I have read puts a number on the soil." },
      { speaker: "Sıla", text: "What would you put in one?" },
      { speaker: "Doruk", text: "A measurement at the start and a measurement at the end, and the difference priced. It is two afternoons of work and it would end half of these arguments." },
    ],
    questions: [
      {
        text: "How long does a centimetre take to build?",
        options: ["a century", "a generation", "an autumn"],
        answer: 0,
        explain: "„A centimetre takes a century to build and a bad autumn to move…“",
      },
      {
        text: "Where does the cost appear?",
        options: ["in a well in the next village", "on the same field", "on an invoice"],
        answer: 0,
        explain: "„In a well, two years later, in a village whose name is not in anybody's file.“",
      },
      {
        kind: "truefalse",
        text: "Both losses in that line are on an invoice.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Two losses in one line and only one of them is on an invoice.“",
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
        explain: "Satırın en önemli sözcüğü sonuncusu.",
      },
      {
        kind: "short_answer",
        text: "What would he put in a lease?",
        options: [],
        answer: 0,
        accept: ["two measurements", "a measurement each end", "the difference priced"],
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
    title: "Reporting the label",
    genre: "monologue",
    intro: "Etiketi savunan ile izlenebilirlikten kuşku duyan aynı masada.",
    gloss: [
      { de: "seminar", tr: "seminer" },
      { de: "region", tr: "bölge" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "neutral", tr: "yansız" },
      { de: "yourself", tr: "kendin" },
      { de: "a label", tr: "etiket" },
      { de: "defends", tr: "savunuyor" },
      { de: "doubts", tr: "kuşku duyuyor" },
      { de: "a batch", tr: "parti" },
      { de: "a mill", tr: "değirmen" },
      { de: "an assumption", tr: "varsayım" },
      { de: "a sample", tr: "örneklem" },
      { de: "a footnote", tr: "dipnot" },
      { de: "advice", tr: "danışmanlık" },
      { de: "a seller", tr: "satıcı" },
      { de: "free", tr: "ücretsiz" },
      { de: "an invoice", tr: "fatura" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Berna", text: "One defends the origin labeling; another doubts the traceability. Two people at one table and they are not disagreeing about the same thing." },
      { speaker: "Berna", text: "A label is a claim on a package. Traceability is whether a batch can be followed from a field to a mill to a shelf, and the second is a question about systems." },
      { speaker: "Berna", text: "You can have a perfectly honest label and no traceability at all, because the label says where the last step happened and nothing before it." },
      { speaker: "Berna", text: "The sustainability report claims what the field research assumes. The same shape this level met in a seminar and in a meeting, and here it is about two documents again." },
      { speaker: "Berna", text: "The assumption is usually the sample. Forty farms, chosen because they answered the letter, and the report says „farms in the region“ with no number in the sentence." },
      { speaker: "Berna", text: "Find the sample size before you read anything else. It is in a footnote, and when it is not in a footnote it is not anywhere." },
      { speaker: "Berna", text: "To call it knowledge transfer is not to call it agronomic advice. Eight words that a farmer needs and a seller does not want written down." },
      { speaker: "Berna", text: "Transfer means somebody gave you information. Advice means somebody told you what to do on your field, and only the second one carries any responsibility." },
      { speaker: "Berna", text: "The advice that comes free from a seller is the advice that sells a product. That is not dishonest and it is not neutral, and both of those are true at once." },
      { speaker: "Berna", text: "So ask for the invoice. If nobody is paid for the advice, read it as information and make the decision yourself." },
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
        explain: "„The assumption is usually the sample.“",
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
        text: "One defends the origin labeling; another ___ the traceability.",
        options: [],
        answer: 0,
        accept: ["doubts"],
        explain: "„One defends the origin labeling; another doubts the traceability.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The sustainability report claims what the field research assumes.", "The sustainability report claims what the field research assumes"],
        explain: "İki belge: biri iddia ediyor, öteki varsayıyor.",
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
    title: "We have no factory farming here",
    genre: "info",
    intro: "Türü yadsımak ile örneği yadsımak.",
    gloss: [
      { de: "category", tr: "ulam" },
      { de: "factory farming", tr: "endüstriyel hayvancılık" },
      { de: "species-appropriate", tr: "türüne uygun" },
      { de: "a milk quota", tr: "süt kotası" },
      { de: "a world market price", tr: "dünya piyasa fiyatı" },
      { de: "price volatility", tr: "fiyat oynaklığı" },
      { de: "lush", tr: "gür" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Burada endüstriyel hayvancılık yok; türüne uygun barınak var.",
        answer: "We have no factory farming here; we have species-appropriate housing.",
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
        prompt: "Olumsuzlama kartını doldur.",
        facts: "„No“ ismin önünde durup türü yadsıyor; „not“ cümleyi olumsuzluyor ve yardımcı fiile gerek duyuyor; Almanca tek belirleyiciyle geçiyor; hata eksik sözcük değil, bir beden fazla yüksek sözcük.",
        fields: [
          { label: "„no“ denies", answer: "the category", accept: ["a category"] },
          { label: "„not“ denies", answer: "this case", accept: ["the case"] },
          { label: "In German", answer: "one determiner", accept: ["only one"] },
          { label: "The error", answer: "one size too loud", accept: ["too loud"] },
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
    title: "To call it knowledge transfer is not to call it agronomic advice",
    genre: "info",
    intro: "Etiketin iki katmanı ve toprağın süresi.",
    gloss: [
      { de: "origin labeling", tr: "menşe etiketlemesi" },
      { de: "traceability", tr: "izlenebilirlik" },
      { de: "knowledge transfer", tr: "bilgi aktarımı" },
      { de: "soil erosion", tr: "toprak erozyonu" },
      { de: "to overfertilize", tr: "aşırı gübrelemek" },
      { de: "to pollinate", tr: "tozlaştırmak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Biri menşe etiketlemesini savunuyor; bir başkası izlenebilirlikten kuşku duyuyor.",
        answer: "One defends the origin labeling; another doubts the traceability.",
        hint: "İki kişi aynı şey hakkında anlaşmazlığa düşmüyor.",
      },
      {
        kind: "build",
        tr: "Sürdürülebilirlik raporu, saha araştırmasının varsaydığını iddia ediyor.",
        answer: "The sustainability report claims what the field research assumes.",
        hint: "Varsayım genellikle örneklemdir.",
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
        hint: "Satırın en önemli sözcüğü sonuncusu.",
      },
    ],
  },
];
