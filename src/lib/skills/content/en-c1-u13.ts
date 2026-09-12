import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 13 — "Anlam kaydığında, aidiyetin söylemedikleri,
 * tek bir ölçüye üç ad, emri kim veriyor".
 *
 * Dört ders: When meaning shifts · What belonging leaves unsaid ·
 * Three names for one measure · Who gives the orders.
 *
 *   Kelime: language change, language norm, semantic change, semantic
 *           context, literal meaning, diaspora, heritage language, enclave,
 *           untranslatability, spirituality, social stratum, efficiency gain,
 *           work intensification, flexibilization, precarization,
 *           standardization, rationalization, power structure, power
 *           imbalance, delegation, subordination.
 *   Kalıp:  The language change above becomes a language norm below. ·
 *           That semantic change, as noted, is the language usage of an earlier page. ·
 *           Where the semantic context is missing, the literal meaning does not hold. ·
 *           The diaspora keeps the heritage language; the enclave, the silence. ·
 *           Untranslatability survives as spirituality, a crisis of faith as a question. ·
 *           The social stratum changed; the change in values did not. ·
 *           In the report it is an efficiency gain; on the floor, work intensification. ·
 *           What management calls flexibilization, the union calls precarization. ·
 *           Standardization is a method; rationalization is a programme. ·
 *           What the power structure does is hide the power imbalance. ·
 *           Behind the delegation stands the authority to give orders. ·
 *           Subordination we notice; room to maneuver we do not.
 *
 * Ünitenin tek öğretme noktası YER SÖZCÜKLERİNİN YERİ BIRAKMASI. „Where“
 * burada hiçbir yeri göstermiyor, „şu durumlarda ki“ demek, ve akademik
 * İngilizcenin bu iş için olağan bağlacı. Yalnız da değil: „whereas“
 * (ünite 7'de bir mektupta geçmişti), „whereby“, „wherein“, „whereupon“ —
 * hepsi bir yer sözcüğü ile bir edattan kurulmuş ve hiçbiri artık yerle
 * ilgili değil. Almanca AYNI aileyi aynı parçalardan kurmuş („wobei“,
 * „wodurch“, „wohingegen“, „worauf“): mekanizma birebir aynı, anlamlar
 * neredeyse madde madde örtüşüyor. Ayrım öğrenenin GÖREBİLDİĞİNDE:
 * Almanca parçaları yazıyor ve görünür tutuyor, bilmeyen bir okur sözcüğü
 * söküp aşağı yukarı doğruyu bulabiliyor; İngilizce yüzyıllar önce
 * kaynaştırmış ve „whereas“ı sökmek, cevabı zaten bilmeyen için olanaksız.
 * Ölçü: **AYNI YAPIM İKİ DİLDE DE VAR; ALMANCADA PARÇA GÖRÜNÜR, İNGİLİZCEDE
 * KAYNAŞMIŞ** — sökülebilen sözcük tahmin edilebilir, sökülemeyen
 * öğretilmek zorunda. İkinci ölçü ünitenin kendisinden çıkıyor: buradan
 * sonra biçimler yenilenmiyor, DEĞİŞKEN sözcük dağarcığı oluyor.
 */
export const enC1U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u13-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 13,
    title: "When meaning shifts",
    genre: "info",
    intro: "„Where“ hangi yeri gösteriyor? Sökülebilen sözcük ile sökülemeyen.",
    gloss: [
      { de: "either", tr: "ikisinden biri" },
      { de: "whereof", tr: "ki ondan" },
      { de: "whereupon", tr: "bunun üzerine" },
      { de: "preposition", tr: "edat" },
      { de: "wobei", tr: "ki bu arada" },
      { de: "wodurch", tr: "ki bununla" },
      { de: "wohingegen", tr: "buna karşılık" },
      { de: "worauf", tr: "ki bunun üzerine" },
      { de: "mechanism", tr: "mekanizma" },
      { de: "identical", tr: "birebir aynı" },
      { de: "differs", tr: "farklı" },
      { de: "halves", tr: "yarılar" },
      { de: "centuries", tr: "yüzyıllar" },
      { de: "plus", tr: "artı" },
      { de: "practical", tr: "işe dönük" },
      { de: "edge", tr: "kenar" },
      { de: "except", tr: "dışında" },
      { de: "unit", tr: "ünite" },
      { de: "nowhere", tr: "hiçbir yer" },
      { de: "a connector", tr: "bağlaç" },
      { de: "academic", tr: "akademik" },
      { de: "ordinary", tr: "olağan" },
      { de: "a room", tr: "oda" },
      { de: "pushed together", tr: "birbirine itilmiş" },
      { de: "a contract", tr: "sözleşme" },
      { de: "a family", tr: "aile" },
      { de: "at home", tr: "kendi evinde" },
      { de: "careful", tr: "dikkatli" },
      { de: "the parts", tr: "parçalar" },
      { de: "line up", tr: "örtüşüyor" },
      { de: "plainly", tr: "açıkça" },
      { de: "visible", tr: "görünür" },
      { de: "take it apart", tr: "sökmek" },
      { de: "roughly right", tr: "aşağı yukarı doğru" },
      { de: "fused", tr: "kaynaşmış" },
      { de: "the spelling", tr: "yazım" },
      { de: "predicts", tr: "öngörüyor" },
      { de: "guess", tr: "tahmin etmek" },
      { de: "tempting", tr: "ayartıcı" },
      { de: "technical", tr: "teknik" },
      { de: "the variable", tr: "değişken" },
    ],
    minutes: 12,
    text:
      "Where the semantic context is missing, the literal meaning does not hold. Look at the first word of that sentence and ask where.\n" +
      "Nowhere. There is no place in it at all. „Where“ has been used to mean „in those cases in which“, and it is the ordinary connector of academic English for exactly that job — so ordinary that most readers never notice it was once a word about rooms.\n" +
      "It is not alone. „Whereas“, which this level met in a letter about fees, is „where“ and „as“ pushed together, and it names no place either: it holds two things apart. „Whereby“ means „by which“ and lives in contracts. „Wherein“, „whereof“, „whereupon“ — a whole family, every one of them built out of a place word and a preposition, and not one of them about a place any more.\n" +
      "So this is a good moment for a reader coming from German to feel at home and then to be careful. German built the same family out of the same parts: „wobei“, „wodurch“, „wohingegen“, „worauf“. The mechanism is identical and the meanings line up almost item for item, which is rare enough in this course to be worth saying plainly.\n" +
      "What differs is what a learner can see. German writes the parts and keeps them visible: both halves are still there, and a reader who does not know the word can take it apart and come out roughly right. English fused its versions centuries ago and then let the spelling settle, and „whereas“ cannot be taken apart by anybody who does not already know the answer. „Where“ plus „as“ predicts nothing about holding two things apart.\n" +
      "That is the lesson and it has a practical edge. A word you can take apart is a word you can guess; a word you cannot is a word you have to be taught, and English keeps a long list of these in exactly the registers where guessing is most tempting, because the words are long and look technical.\n" +
      "The language change above becomes a language norm below. And notice what has changed in that sentence: nothing except the subject matter. The shape is the one from an earlier unit.\n" +
      "From here on in this level the shapes stop being new. The vocabulary is the variable, and a shape you can only use on the subject you first met it on has not been learned yet.",
    questions: [
      {
        text: "What does „where“ mean here?",
        options: ["in those cases", "in that room", "at that time"],
        answer: 0,
        explain: "„„Where“ has been used to mean „in those cases in which“…“",
      },
      {
        text: "What differs between the two families?",
        options: ["what a learner can see", "the mechanism", "the meanings"],
        answer: 0,
        explain: "„What differs is what a learner can see.“",
      },
      {
        kind: "truefalse",
        text: "„Whereas“ cannot be taken apart by a reader who does not already know it.",
        options: ["True", "False"],
        answer: 0,
        explain: "„„whereas“ cannot be taken apart by anybody who does not already know the answer.“",
      },
      {
        kind: "gapfill",
        text: "Where the semantic context is missing, the ___ meaning does not hold.",
        options: [],
        answer: 0,
        accept: ["literal"],
        explain: "„Where the semantic context is missing, the literal meaning does not hold.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Where the semantic context is missing, the literal meaning does not hold.",
          "„Whereby“ means „by which“ and lives in contracts.",
          "German writes the parts and keeps them visible.",
          "From here on the vocabulary is the variable.",
        ],
        explain: "Bağlaç, aile, iki dil; en sonda seviyenin geri kalanı.",
      },
      {
        kind: "short_answer",
        text: "What is a word you cannot take apart?",
        options: [],
        answer: 0,
        accept: ["one you must be taught", "a taught word", "not a guess"],
        explain: "„a word you cannot is a word you have to be taught…“",
      },
    ],
  },
  {
    id: "en-c1-u13-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 13,
    title: "Three names for one measure",
    genre: "opinion",
    intro: "Tek bir önlem, üç ad. Adı koyan tartışmayı nasıl kazanıyor?",
    gloss: [
      { de: "neither", tr: "ikisi de değil" },
      { de: "halves", tr: "yarılar" },
      { de: "event", tr: "olay" },
      { de: "owners", tr: "sahipler" },
      { de: "disagreement", tr: "anlaşmazlık" },
      { de: "noun", tr: "isim" },
      { de: "nouns", tr: "isimler" },
      { de: "restores", tr: "geri koyuyor" },
      { de: "onto", tr: "üzerine" },
      { de: "judged", tr: "yargılanan" },
      { de: "whatever", tr: "her ne" },
      { de: "a measure", tr: "önlem" },
      { de: "a floor", tr: "atölye" },
      { de: "a gain", tr: "kazanç" },
      { de: "the same hours", tr: "aynı saatler" },
      { de: "two ledgers", tr: "iki defter" },
      { de: "management", tr: "yönetim" },
      { de: "a union", tr: "sendika" },
      { de: "lying", tr: "yalan söyleyen" },
      { de: "denied", tr: "yadsınan" },
      { de: "a method", tr: "yöntem" },
      { de: "a programme", tr: "program" },
      { de: "a difference", tr: "fark" },
      { de: "a goal", tr: "hedef" },
      { de: "a budget line", tr: "bütçe kalemi" },
      { de: "official", tr: "resmî" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "a suffix", tr: "sonek" },
      { de: "neutral", tr: "yansız" },
      { de: "first", tr: "ilk" },
    ],
    minutes: 12,
    text:
      "In the report it is an efficiency gain; on the floor, work intensification. One measure, two rooms, two words, and the second half of that sentence has lost its verb because it does not need one: the two halves are the same event seen from two ledgers.\n" +
      "„Efficiency gain“ counts what came out. „Work intensification“ counts what went in. The same hours, the same people, the same month, and neither of the two words is lying.\n" +
      "What management calls flexibilization, the union calls precarization. Here the two names have been put in one sentence with their owners attached, which is the honest way to write the disagreement and also the rarest.\n" +
      "Now the part worth being slow about. A noun cannot be true or false. „Precarization“ is not a claim; it is a name, and a name cannot be denied until somebody has turned it back into a sentence. „They made the contracts shorter and the notice periods longer“ can be answered with dates. „Precarization“ can only be answered with another noun, and an argument between two nouns has no end in it.\n" +
      "So the repair is the same one this level found in a comparison: put the verb back. Whoever restores the verb first has moved the argument onto ground where evidence counts.\n" +
      "Standardization is a method; rationalization is a programme. And that is the difference the whole lesson is built to reach. A method has a description and can be judged by whether it works. A programme has a goal and a budget line and a person whose year depends on it, and it will be defended for reasons that have nothing to do with whether it works.\n" +
      "Both words end in the same four letters and the suffix is not neutral, whatever a dictionary says. It takes a verb somebody did, removes the person who did it, removes the time it happened, and leaves a long official word that a paragraph can carry without anybody noticing the weight. That is a habit, not a fact about English, and a writer who knows it can choose.",
    questions: [
      {
        text: "What does „work intensification“ count?",
        options: ["what went in", "what came out", "the month"],
        answer: 0,
        explain: "„„Work intensification“ counts what went in.“",
      },
      {
        text: "What cannot be true or false?",
        options: ["a noun", "a sentence", "a date"],
        answer: 0,
        explain: "„A noun cannot be true or false.“",
      },
      {
        kind: "truefalse",
        text: "One of the two words is lying.",
        options: ["True", "False"],
        answer: 1,
        explain: "„neither of the two words is lying.“",
      },
      {
        kind: "gapfill",
        text: "Standardization is a method; rationalization is a ___.",
        options: [],
        answer: 0,
        accept: ["programme"],
        explain: "„Standardization is a method; rationalization is a programme.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "In the report it is an efficiency gain; on the floor, work intensification.",
          "What management calls flexibilization, the union calls precarization.",
          "Standardization is a method; rationalization is a programme.",
          "Whoever restores the verb first has moved the argument.",
        ],
        explain: "İki defter, iki sahip, yöntem ile program; en sonda onarım.",
      },
      {
        kind: "short_answer",
        text: "What does the suffix remove?",
        options: [],
        answer: 0,
        accept: ["the person", "who did it", "the person and the time"],
        explain: "„removes the person who did it, removes the time it happened…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u13-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 13,
    title: "Who gives the orders",
    genre: "dialogue",
    intro: "Yetki devrinin arkasında ne duruyor? Ne fark edilmiyor?",
    gloss: [
      { de: "least", tr: "en az" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "whenever", tr: "her ne zaman" },
      { de: "visible", tr: "görünür" },
      { de: "particular", tr: "belirli" },
      { de: "able", tr: "muktedir" },
      { de: "an order", tr: "emir" },
      { de: "hide", tr: "gizlemek" },
      { de: "a chart", tr: "şema" },
      { de: "flat", tr: "yatay" },
      { de: "an owner", tr: "sahip" },
      { de: "a title", tr: "unvan" },
      { de: "handed over", tr: "devredilmiş" },
      { de: "kept", tr: "elde tutulan" },
      { de: "a deadline", tr: "son tarih" },
      { de: "invisible", tr: "görünmez" },
      { de: "narrower", tr: "daha dar" },
      { de: "a form", tr: "form" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Bora", text: "What the power structure does is hide the power imbalance. A chart is drawn, everybody can see it, and what it shows is not the thing it is about." },
      { speaker: "Lale", text: "So a flat chart can hide more than a tall one." },
      { speaker: "Bora", text: "Far more, because a tall chart at least names the owner of each decision. A flat one has nobody on it and the decisions still get made somewhere." },
      { speaker: "Lale", text: "Behind the delegation stands the authority to give orders." },
      { speaker: "Bora", text: "That is the sentence I would put in front of anybody being given a new title. What has been handed over is the work, and what has been kept is the deadline." },
      { speaker: "Lale", text: "Is that always true?" },
      { speaker: "Bora", text: "It is true whenever the deadline was not handed over with it. Ask that one question and you will know within a minute which kind of delegation you have been given." },
      { speaker: "Lale", text: "Subordination we notice; room to maneuver we do not." },
      { speaker: "Bora", text: "And this is the hard half. Being told what to do is visible and it can be complained about. Having less room than last year is invisible and there is no form for it." },
      { speaker: "Lale", text: "Because nothing happened on any particular day." },
      { speaker: "Bora", text: "Nothing happened on any particular day, and a year later the job is narrower and nobody can name the week it got that way." },
      { speaker: "Lale", text: "So what do you write down?" },
      { speaker: "Bora", text: "Write down what you were able to decide alone in January, and read it again in December. It is the only record anybody keeps of that kind of change." },
    ],
    questions: [
      {
        text: "What can hide more than a tall chart?",
        options: ["a flat one", "a long one", "a new one"],
        answer: 0,
        explain: "„a flat chart can hide more than a tall one.“ — „Far more…“",
      },
      {
        text: "What has been kept?",
        options: ["the deadline", "the work", "the title"],
        answer: 0,
        explain: "„What has been handed over is the work, and what has been kept is the deadline.“",
      },
      {
        kind: "truefalse",
        text: "There is no form for having less room than last year.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Having less room than last year is invisible and there is no form for it.“",
      },
      {
        kind: "gapfill",
        text: "Subordination we notice; room to maneuver we do ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„Subordination we notice; room to maneuver we do not.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Behind the delegation stands the authority to give orders.", "Behind the delegation stands the authority to give orders"],
        explain: "Baştaki yuvayı bir yer almış; özne sonda.",
      },
      {
        kind: "short_answer",
        text: "What should you write down in January?",
        options: [],
        answer: 0,
        accept: ["what you decide alone", "your decisions", "what you can decide"],
        explain: "„Write down what you were able to decide alone in January…“",
      },
    ],
  },
  {
    id: "en-c1-u13-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 13,
    title: "What belonging leaves unsaid",
    genre: "monologue",
    intro: "İki topluluk, iki ayrı şey saklıyor. Hangisi hangisini?",
    gloss: [
      { de: "trace", tr: "iz" },
      { de: "disappear", tr: "yok olmak" },
      { de: "whatever", tr: "her ne" },
      { de: "category", tr: "ulam" },
      { de: "large", tr: "büyük" },
      { de: "vague", tr: "bulanık" },
      { de: "exists", tr: "var" },
      { de: "strata", tr: "katmanlar" },
      { de: "silence", tr: "sessizlik" },
      { de: "a grandmother", tr: "büyükanne" },
      { de: "a kitchen", tr: "mutfak" },
      { de: "a generation", tr: "kuşak" },
      { de: "a question", tr: "soru" },
      { de: "an answer", tr: "cevap" },
      { de: "a census", tr: "sayım" },
      { de: "a form", tr: "form" },
      { de: "changed", tr: "değişti" },
      { de: "a wage", tr: "ücret" },
      { de: "a table", tr: "sofra" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Nesrin", text: "The diaspora keeps the heritage language; the enclave, the silence. Two words for two kinds of community and the second half of the line has no verb in it." },
      { speaker: "Nesrin", text: "The verb is the same one, which is the point. Both of them are keeping something, and what is kept is not the same thing at all." },
      { speaker: "Nesrin", text: "A language is kept in a kitchen and it shows: a grandmother speaks it, a child answers in another, and everybody in the room can hear the exchange rate." },
      { speaker: "Nesrin", text: "A silence is kept in the same kitchen and nothing shows, because a silence has no speakers and leaves no trace on any form." },
      { speaker: "Nesrin", text: "Untranslatability survives as spirituality, a crisis of faith as a question. Two more, gapped the same way, and both of them are about what happens to a thing that cannot be carried across." },
      { speaker: "Nesrin", text: "What cannot be said in the second language does not disappear. It moves into whatever category the second language does have room for, and that category is usually a large and vague one." },
      { speaker: "Nesrin", text: "The social stratum changed; the change in values did not. This is the line the whole lesson exists for, and it is a finding rather than an opinion." },
      { speaker: "Nesrin", text: "A family can move two strata in one generation. The wage changes in a year, the flat in three, and what is said at the table changes over a much longer period." },
      { speaker: "Nesrin", text: "So a census that has recorded the income has recorded the fast half of the story and has nothing at all about the slow half." },
      { speaker: "Nesrin", text: "And a paragraph that reports the income as though it were the whole change is not wrong about any number in it." },
    ],
    questions: [
      {
        text: "What does the enclave keep?",
        options: ["the silence", "the language", "the kitchen"],
        answer: 0,
        explain: "„The diaspora keeps the heritage language; the enclave, the silence.“",
      },
      {
        text: "Where does what cannot be said move?",
        options: ["into a large vague category", "out of the language", "into the census"],
        answer: 0,
        explain: "„that category is usually a large and vague one.“",
      },
      {
        kind: "truefalse",
        text: "A silence leaves a trace on a form.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a silence has no speakers and leaves no trace on any form.“",
      },
      {
        kind: "gapfill",
        text: "The social stratum changed; the change in values did ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The social stratum changed; the change in values did not.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The social stratum changed; the change in values did not.", "The social stratum changed; the change in values did not"],
        explain: "Hızlı yarı ile yavaş yarı aynı cümlede.",
      },
      {
        kind: "short_answer",
        text: "What has a census recorded?",
        options: [],
        answer: 0,
        accept: ["the fast half", "the income", "half the story"],
        explain: "„has recorded the fast half of the story…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u13-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 13,
    title: "Where the semantic context is missing",
    genre: "info",
    intro: "Yer bildirmeyen „where“ ve tek ölçünün üç adı.",
    gloss: [
      { de: "apart", tr: "ayrı" },
      { de: "visible", tr: "görünür" },
      { de: "a language change", tr: "dil değişimi" },
      { de: "a language norm", tr: "dil normu" },
      { de: "a semantic context", tr: "anlam bağlamı" },
      { de: "an efficiency gain", tr: "verimlilik artışı" },
      { de: "flexibilization", tr: "esnekleştirme" },
      { de: "rationalization", tr: "rasyonelleştirme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Anlam bağlamının eksik olduğu yerde gerçek anlam tutmaz.",
        answer: "Where the semantic context is missing, the literal meaning does not hold.",
        hint: "„Where“ bir yer değil, „şu durumlarda ki“ demek.",
      },
      {
        kind: "build",
        tr: "Yukarıdaki dil değişimi aşağıda bir dil normuna dönüşüyor.",
        answer: "The language change above becomes a language norm below.",
        hint: "Biçim eski; değişen yalnız konu.",
      },
      {
        kind: "build",
        tr: "Raporda verimlilik artışı, atölyede iş yoğunlaşması.",
        answer: "In the report it is an efficiency gain; on the floor, work intensification.",
        hint: "Aynı olay, iki defter; ikinci yarıda fiil yok.",
      },
      {
        kind: "build",
        tr: "Yönetimin esnekleştirme dediğine sendika güvencesizleşme diyor.",
        answer: "What management calls flexibilization, the union calls precarization.",
        hint: "İki ad ve sahipleri aynı cümlede.",
      },
      {
        kind: "build",
        tr: "Standartlaştırma bir yöntem, rasyonelleştirme bir programdır.",
        answer: "Standardization is a method; rationalization is a programme.",
        hint: "Yöntem işe yarayıp yaramadığına göre yargılanır; programın bütçesi vardır.",
      },
      {
        kind: "form",
        prompt: "Yer sözcükleri kartını doldur.",
        facts: "„Where“ burada yer göstermiyor; „whereas“ iki şeyi ayrı tutuyor; Almanca aynı aileyi kurmuş ve parçaları görünür; sökülemeyen sözcük öğretilmek zorunda.",
        fields: [
          { label: "„where“ here", answer: "in those cases", accept: ["no place"] },
          { label: "„whereas“", answer: "holds two apart", accept: ["holds them apart"] },
          { label: "In German", answer: "the parts are visible", accept: ["visible"] },
          { label: "If you cannot take it apart", answer: "you must be taught it", accept: ["taught"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u13-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 13,
    title: "The diaspora keeps the heritage language",
    genre: "info",
    intro: "Aidiyetin sakladıkları ve emri veren.",
    gloss: [
      { de: "a heritage language", tr: "köken dili" },
      { de: "an enclave", tr: "enklav" },
      { de: "untranslatability", tr: "çevrilemezlik" },
      { de: "a social stratum", tr: "toplumsal katman" },
      { de: "a power imbalance", tr: "güç dengesizliği" },
      { de: "subordination", tr: "boyun eğme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Diaspora köken dilini saklıyor; enklav, sessizliği.",
        answer: "The diaspora keeps the heritage language; the enclave, the silence.",
        hint: "Fiil aynı olduğu için ikinci yarıda yazılmıyor.",
      },
      {
        kind: "build",
        tr: "Çevrilemezlik maneviyat olarak, inanç krizi bir soru olarak sağ kalıyor.",
        answer: "Untranslatability survives as spirituality, a crisis of faith as a question.",
        hint: "Taşınamayan şey yok olmuyor, yer değiştiriyor.",
      },
      {
        kind: "build",
        tr: "Toplumsal katman değişti; değerlerin dönüşümü değişmedi.",
        answer: "The social stratum changed; the change in values did not.",
        hint: "Hızlı yarı ile yavaş yarı.",
      },
      {
        kind: "build",
        tr: "Güç yapısının yaptığı şey güç dengesizliğini gizlemektir.",
        answer: "What the power structure does is hide the power imbalance.",
        hint: "Şema herkesin görebildiği şey; anlattığı şey değil.",
      },
      {
        kind: "build",
        tr: "Yetki devrinin arkasında talimat verme yetkisi duruyor.",
        answer: "Behind the delegation stands the authority to give orders.",
        hint: "Devredilen iş, elde tutulan son tarih.",
      },
    ],
  },
];
