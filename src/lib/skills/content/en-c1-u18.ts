import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 18 — "İklim raporunu bir arada tutmak, tohumun
 * söylemedikleri, tek bir hedefe üç ad, kirleten kim".
 *
 * Dört ders: Holding a climate report together · What the seed leaves unsaid ·
 * Three names for one target · Who does the polluting.
 *
 *   Kelime: climate adaptation, climate justice, environmental compatibility,
 *           environmental ethics, decouple, diversify, seed replanting right,
 *           genetic engineering, reforest, deforest, precipitation, emission
 *           reduction, decarbonization, climate neutrality, energy transition,
 *           pollutant load, overexploitation, carbon sink, species extinction,
 *           permafrost, heat island, renaturalize.
 *   Kalıp:  The climate adaptation above becomes climate justice below. ·
 *           That environmental compatibility, as noted, is the environmental ethics of an earlier page. ·
 *           Where a region is import-dependent, no measure works across the board. ·
 *           The seed replanting right survives as custom, genetic engineering as a patent. ·
 *           They reforest the hillside; the plain, they deforest. ·
 *           The precipitation fell; the harvest did not. ·
 *           In the brochure it is emission reduction; in the study, decarbonization. ·
 *           Climate neutrality is a balance; climate-neutral is a label. ·
 *           What the ministry calls an energy transition, the district calls a mobility transition. ·
 *           What overexploitation does is hide the pollutant load. ·
 *           Behind the resource consumption stands a lost carbon sink. ·
 *           Species extinction we count; the permafrost we do not.
 *
 * Ünitenin tek öğretme noktası ÖNEKLE FİİL TÜRETME. „Forest“ bir isim;
 * İngilizce önüne bir hece koyup ondan iki kez fiil yapmış ve iki hece
 * ters yönlere çekiyor — biri geri koyuyor, öteki alıp götürüyor, ve
 * sözcüğün başka hiçbir yeri değişmemiş. Bu dilin en üretken
 * makinelerinden biri: decouple, decarbonize, renaturalize, reinterpret,
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
    title: "What the seed leaves unsaid",
    genre: "info",
    intro: "Tek gövde, iki önek. Çift neden ötekinde görünmüyor?",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "either", tr: "ikisinden biri" },
      { de: "decarbonize", tr: "karbonsuzlaştırmak" },
      { de: "rewild", tr: "doğaya bırakmak" },
      { de: "builds", tr: "kuruyor" },
      { de: "nouns", tr: "isimler" },
      { de: "pair", tr: "çift" },
      { de: "ordinary", tr: "olağan" },
      { de: "appears", tr: "beliriyor" },
      { de: "zero", tr: "sıfır" },
      { de: "adjective", tr: "sıfat" },
      { de: "ought", tr: "gerek" },
      { de: "a stem", tr: "gövde" },
      { de: "a prefix", tr: "önek" },
      { de: "a syllable", tr: "hece" },
      { de: "opposite directions", tr: "ters yönler" },
      { de: "takes it away", tr: "alıp götürüyor" },
      { de: "a machine", tr: "makine" },
      { de: "productive", tr: "üretken" },
      { de: "a decade", tr: "on yıl" },
      { de: "a state", tr: "durum" },
      { de: "never seen", tr: "hiç görmediği" },
      { de: "survive", tr: "sağ kalmak" },
      { de: "different roots", tr: "ayrı kökler" },
      { de: "opposites", tr: "karşıtlar" },
      { de: "the relationship", tr: "ilişki" },
      { de: "known", tr: "bilinmesi gereken" },
      { de: "a gain", tr: "kazanç" },
      { de: "a cost", tr: "bedel" },
      { de: "established", tr: "yerleşik" },
      { de: "coined", tr: "uydurulmuş" },
      { de: "a law", tr: "yasa" },
      { de: "tempted", tr: "ayartılmış" },
      { de: "a method", tr: "yöntem" },
      { de: "a quantity", tr: "nicelik" },
    ],
    minutes: 12,
    text:
      "They reforest the hillside; the plain, they deforest. One stem, two prefixes, and a whole policy in eight words.\n" +
      "„Forest“ is a noun. English has made a verb out of it twice by putting a syllable in front, and the two syllables pull in opposite directions: one puts the thing back and the other takes it away. Nothing else in either word has changed.\n" +
      "This is one of the most productive machines in the language, and it is the reason a whole field of vocabulary can be built in a decade. Decouple, decarbonize, renaturalize, reinterpret, rewild. Any noun that names a state can be turned into a verb for reaching that state or for leaving it, and a reader who has met the pattern once can read a word they have never seen before.\n" +
      "German builds verbs out of nouns too, and it uses prefixes as well, but the pair does not survive. The words for putting a forest back and for taking one away usually come from different roots, so a German reader meets two ordinary verbs and nothing in either of them says that the two are opposites. The pair is in the world; it is not in the word.\n" +
      "That is the measurement of this unit. English puts the relationship inside the vocabulary, where it can be seen; German leaves it outside, where it has to be known.\n" +
      "The gain has a cost and this is the right place to name it. A word built this way looks like the name of an established process. „Decarbonization“ arrived as a coined noun in a paper and now appears in law, and nothing in its shape says whether anybody has ever done it. A reader who can take a word apart will always be tempted to believe that the thing has a method, because the word has a structure.\n" +
      "Climate neutrality is a balance; climate-neutral is a label. Here is the second half of the same machine one lesson later: the noun names a quantity that can be measured against zero, the adjective is a claim printed on a package, and the two are one ending apart.\n" +
      "The precipitation fell; the harvest did not. One more line with nobody in it, and by now that ought to be the first thing a reader notices rather than the last.",
    questions: [
      {
        text: "What has changed in the two words?",
        options: ["nothing else", "the stem", "the ending"],
        answer: 0,
        explain: "„Nothing else in either word has changed.“",
      },
      {
        text: "Where does English put the relationship?",
        options: ["inside the vocabulary", "outside the word", "in a footnote"],
        answer: 0,
        explain: "„English puts the relationship inside the vocabulary…“",
      },
      {
        kind: "truefalse",
        text: "Nothing in the German pair says that the two are opposites.",
        options: ["True", "False"],
        answer: 0,
        explain: "„nothing in either of them says that the two are opposites.“",
      },
      {
        kind: "gapfill",
        text: "They reforest the hillside; the plain, they ___.",
        options: [],
        answer: 0,
        accept: ["deforest"],
        explain: "„They reforest the hillside; the plain, they deforest.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "They reforest the hillside; the plain, they deforest.",
          "Any noun that names a state can be turned into a verb.",
          "The pair is in the world; it is not in the word.",
          "A word built this way looks like an established process.",
        ],
        explain: "Cümle, makine, öteki dil; en sonda bedel.",
      },
      {
        kind: "short_answer",
        text: "What will a reader be tempted to believe?",
        options: [],
        answer: 0,
        accept: ["that it has a method", "there is a method", "that a method is there"],
        explain: "„tempted to believe that the thing has a method…“",
      },
    ],
  },
  {
    id: "en-c1-u18-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "Three names for one target",
    genre: "opinion",
    intro: "Bir hedef, üç ad. Hangisi denge, hangisi etiket?",
    gloss: [
      { de: "burning", tr: "yakma" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "emitted", tr: "salınan" },
      { de: "itself", tr: "kendisi" },
      { de: "owners", tr: "sahipler" },
      { de: "disagreement", tr: "anlaşmazlık" },
      { de: "sum", tr: "toplam" },
      { de: "competing", tr: "yarışan" },
      { de: "a brochure", tr: "broşür" },
      { de: "a study", tr: "çalışma" },
      { de: "a target", tr: "hedef" },
      { de: "a percentage", tr: "yüzde" },
      { de: "a baseline", tr: "temel yıl" },
      { de: "a fuel", tr: "yakıt" },
      { de: "a balance", tr: "denge" },
      { de: "an offset", tr: "denkleştirme" },
      { de: "a package", tr: "paket" },
      { de: "audited", tr: "denetlenen" },
      { de: "a ministry", tr: "bakanlık" },
      { de: "a district", tr: "ilçe" },
      { de: "a grid", tr: "şebeke" },
      { de: "a bus route", tr: "otobüs hattı" },
      { de: "the same money", tr: "aynı para" },
      { de: "a timetable", tr: "sefer tarifesi" },
      { de: "a cable", tr: "kablo" },
      { de: "spent once", tr: "bir kez harcanan" },
      { de: "a choice", tr: "seçim" },
      { de: "rarely", tr: "seyrek" },
      { de: "a budget", tr: "bütçe" },
    ],
    minutes: 12,
    text:
      "In the brochure it is emission reduction; in the study, decarbonization. One target, two rooms, two words, and the second half has lost its verb because the shape does not need one.\n" +
      "„Emission reduction“ is a percentage against a baseline year. It can be reached by burning a cleaner fuel and it says nothing about what happens after that. „Decarbonization“ names the end of a fuel, not a smaller amount of it, and the two words are therefore about different decades.\n" +
      "Climate neutrality is a balance; climate-neutral is a label. A balance has two sides and the second side is usually an offset bought somewhere else, which is a real thing and a different thing from not having emitted.\n" +
      "The label is a claim printed on a package. It may be audited and it may not, and the word itself carries no information about which.\n" +
      "What the ministry calls an energy transition, the district calls a mobility transition. Here the two names are in one sentence with their owners attached, and that is the honest way to write a disagreement about money.\n" +
      "Both are real and both cost the same money once. A grid and a cable, or a timetable and a bus route: the sum is spent once and the choice is not between two words but between two towns in ten years.\n" +
      "So the useful question for any paper of this kind is not which word is correct. It is which budget the word is attached to, and whether the two words in the room are competing for the same line.\n" +
      "They usually are, and it is rarely said out loud, because a meeting in which two good things are in competition is harder to chair than one in which a good thing faces a bad one.",
    questions: [
      {
        text: "What is „emission reduction“?",
        options: ["a percentage against a baseline", "the end of a fuel", "a label"],
        answer: 0,
        explain: "„„Emission reduction“ is a percentage against a baseline year.“",
      },
      {
        text: "What is usually the second side of the balance?",
        options: ["an offset bought somewhere else", "a cleaner fuel", "a package"],
        answer: 0,
        explain: "„the second side is usually an offset bought somewhere else…“",
      },
      {
        kind: "truefalse",
        text: "The label itself says whether it was audited.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the word itself carries no information about which.“",
      },
      {
        kind: "gapfill",
        text: "Climate neutrality is a ___; climate-neutral is a label.",
        options: [],
        answer: 0,
        accept: ["balance"],
        explain: "„Climate neutrality is a balance; climate-neutral is a label.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "In the brochure it is emission reduction; in the study, decarbonization.",
          "Climate neutrality is a balance; climate-neutral is a label.",
          "What the ministry calls an energy transition, the district calls a mobility transition.",
          "Which budget is the word attached to?",
        ],
        explain: "İki oda, denge ile etiket, iki sahip; en sonda soru.",
      },
      {
        kind: "short_answer",
        text: "What is harder to chair?",
        options: [],
        answer: 0,
        accept: ["two good things competing", "a meeting of that kind", "good against good"],
        explain: "„a meeting in which two good things are in competition is harder to chair…“",
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
    title: "Who does the polluting",
    genre: "dialogue",
    intro: "Sayılan ile sayılmayan. Hangisi geri gelmiyor?",
    gloss: [
      { de: "measurable", tr: "ölçülebilir" },
      { de: "funds", tr: "fonluyor" },
      { de: "fund", tr: "fonlamak" },
      { de: "a load", tr: "yük" },
      { de: "a sink", tr: "yutak" },
      { de: "a bog", tr: "bataklık" },
      { de: "drained", tr: "kurutulmuş" },
      { de: "a hectare", tr: "hektar" },
      { de: "a ledger", tr: "defter" },
      { de: "a species", tr: "tür" },
      { de: "a list", tr: "liste" },
      { de: "frozen", tr: "donmuş" },
      { de: "a sensor", tr: "algılayıcı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Zeynep", text: "What overexploitation does is hide the pollutant load. A word that names a way of taking too much, standing in front of a number that nobody wants on a page." },
      { speaker: "Barış", text: "Hide it from whom?" },
      { speaker: "Zeynep", text: "From the ledger. The load is measurable and the word is not, and a report that uses the word instead of the number has chosen the half that cannot be checked." },
      { speaker: "Barış", text: "Behind the resource consumption stands a lost carbon sink." },
      { speaker: "Zeynep", text: "A bog that was drained in nineteen sixty. Four hundred hectares, and it is still on somebody's books as an improvement." },
      { speaker: "Barış", text: "Can it be put back?" },
      { speaker: "Zeynep", text: "Some of it, over about thirty years, and only if the water comes back first. That is a long enough time that nobody who decides it will see the end of it." },
      { speaker: "Barış", text: "Species extinction we count; the permafrost we do not." },
      { speaker: "Zeynep", text: "We count species because a list is a thing a person can keep. The frozen ground has no list and no names in it, and it holds more than the list does." },
      { speaker: "Barış", text: "So what would you measure instead?" },
      { speaker: "Zeynep", text: "The same thing every year with the same sensor in the same place. Not the best measurement, the longest one, and almost nobody funds that." },
      { speaker: "Barış", text: "Because it produces nothing for years." },
      { speaker: "Zeynep", text: "It produces nothing for years and then it is the only thing anybody wants, and by then it has to have been running for twenty of them." },
    ],
    questions: [
      {
        text: "What has the report chosen?",
        options: ["the half that cannot be checked", "the number", "the ledger"],
        answer: 0,
        explain: "„has chosen the half that cannot be checked.“",
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
        explain: "Soyut isim baştaki yuvada, kendi fiiliyle.",
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
    title: "Holding a climate report together",
    genre: "monologue",
    intro: "Gönderme katmanı ve her alanda işlemeyen önlem.",
    gloss: [
      { de: "dishonesty", tr: "dürüstsüzlük" },
      { de: "dies", tr: "ölüyor" },
      { de: "fourth", tr: "dördüncü" },
      { de: "per", tr: "başına" },
      { de: "zone", tr: "bölge dilimi" },
      { de: "exist", tr: "var olmak" },
      { de: "die", tr: "ölmek" },
      { de: "a pointer", tr: "gönderme" },
      { de: "a term", tr: "terim" },
      { de: "a chapter", tr: "bölüm" },
      { de: "an author", tr: "yazar" },
      { de: "a promise", tr: "söz" },
      { de: "a region", tr: "bölge" },
      { de: "a measure", tr: "önlem" },
      { de: "a port", tr: "liman" },
      { de: "a valley", tr: "vadi" },
      { de: "a single rule", tr: "tek kural" },
      { de: "an exception", tr: "istisna" },
      { de: "a map", tr: "harita" },
      { de: "an annex", tr: "ek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Hakan", text: "The climate adaptation above becomes climate justice below. Two pointers in one line and a reader who knows the report can follow both without stopping." },
      { speaker: "Hakan", text: "A term that changes between two chapters is not a problem. A term that changes without a pointer is, and that is the whole job of these words." },
      { speaker: "Hakan", text: "That environmental compatibility, as noted, is the environmental ethics of an earlier page. „As noted“ is a promise about an earlier page." },
      { speaker: "Hakan", text: "I check it. Half the time nothing was noted, and then the phrase has made a new claim look like a reminder of an old one." },
      { speaker: "Hakan", text: "In a report with nine authors that is not dishonesty. It is what happens when chapter four was written after chapter seven." },
      { speaker: "Hakan", text: "Where a region is import-dependent, no measure works across the board. This is the line I would put in front of every national plan." },
      { speaker: "Hakan", text: "A port city and a mountain valley do not have the same problem, and a single rule written for both will be followed in one and ignored in the other." },
      { speaker: "Hakan", text: "The answer is not more exceptions. Exceptions are how a rule dies slowly, and by the fourth one nobody knows which case they are in." },
      { speaker: "Hakan", text: "The answer is a map in the annex and a short rule per zone. It is longer to write and it is the only version anybody applies." },
      { speaker: "Hakan", text: "So when you read a plan, find the annex first. If there is no map in it, the plan was written for a country that does not exist." },
    ],
    questions: [
      {
        text: "What is the problem?",
        options: ["a term that changes without a pointer", "a term that changes", "nine authors"],
        answer: 0,
        explain: "„A term that changes without a pointer is…“",
      },
      {
        text: "How does a rule die?",
        options: ["slowly, by exceptions", "with one map", "in the annex"],
        answer: 0,
        explain: "„Exceptions are how a rule dies slowly…“",
      },
      {
        kind: "truefalse",
        text: "He calls the missing note dishonesty.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In a report with nine authors that is not dishonesty.“",
      },
      {
        kind: "gapfill",
        text: "Where a region is import-dependent, no measure works ___ the board.",
        options: [],
        answer: 0,
        accept: ["across"],
        explain: "„Where a region is import-dependent, no measure works across the board.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The climate adaptation above becomes climate justice below.", "The climate adaptation above becomes climate justice below"],
        explain: "İki edat nesnesiz kalmış; gönderme katmanı.",
      },
      {
        kind: "short_answer",
        text: "What should you find first in a plan?",
        options: [],
        answer: 0,
        accept: ["the annex", "an annex", "the map"],
        explain: "„find the annex first.“",
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
    title: "They reforest the hillside; the plain, they deforest",
    genre: "info",
    intro: "Tek gövde, iki önek; ve hedefin üç adı.",
    gloss: [
      { de: "productive", tr: "üretken" },
      { de: "established", tr: "yerleşik" },
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
        tr: "Tohumu yeniden ekme hakkı âdet olarak, genetik mühendisliği patent olarak sağ kalıyor.",
        answer: "The seed replanting right survives as custom, genetic engineering as a patent.",
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
        prompt: "Önek kartını doldur.",
        facts: "Tek gövdeye iki önek takılıyor; kalıp üretken; Almancada çift ayrı köklerden geldiği için görünmüyor; bedeli sözcüğün yerleşik bir süreç gibi durması.",
        fields: [
          { label: "One stem", answer: "two prefixes", accept: ["two of them"] },
          { label: "The pattern", answer: "productive", accept: ["it is productive"] },
          { label: "In German", answer: "different roots", accept: ["two roots"] },
          { label: "The cost", answer: "it looks established", accept: ["looks established"] },
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
    title: "The climate adaptation above becomes climate justice below",
    genre: "info",
    intro: "Raporun gönderme katmanı ve kirleten kim.",
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
        tr: "Yukarıdaki iklime uyum aşağıda iklim adaleti oluyor.",
        answer: "The climate adaptation above becomes climate justice below.",
        hint: "İki edat nesnesiz kalmış ve ismin ardına asılmış.",
      },
      {
        kind: "build",
        tr: "O çevreyle uyumluluk, belirtildiği gibi, önceki bir sayfanın çevre etiğidir.",
        answer: "That environmental compatibility, as noted, is the environmental ethics of an earlier page.",
        hint: "„As noted“ önceki bir sayfa hakkında bir söz.",
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
