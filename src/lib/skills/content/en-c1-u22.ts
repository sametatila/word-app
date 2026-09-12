import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 22 — "Maliyetin sözcükleri, defterleri aktarmak,
 * tahmin ne kadar kesin, baştan aşağı yeşil".
 *
 * Dört ders: The vocabulary of cost · Reporting the books ·
 * How certain is the forecast · Thoroughly green.
 *
 *   Kelime: marginal cost, opportunity cost, follow-up costs, cost overrun,
 *           economy of scale, capital requirement, accounting fraud,
 *           embezzlement, gray area, pretext, feign, embezzle, investment
 *           cycle, savings rate, solvency, solvent, default risk, risk
 *           appetite, greenwashing, nepotism, false labeling, reputational risk.
 *   Kalıp:  A marginal cost is not an opportunity cost. ·
 *           Follow-up costs are estimated; a cost overrun is announced. ·
 *           An economy of scale lowers the capital requirement. ·
 *           One alleges accounting fraud; another proves embezzlement. ·
 *           The gray area claims what the pretext assumes. ·
 *           To feign a loss is not to embezzle a gain. ·
 *           The investment cycle may well turn before the savings rate falls. ·
 *           A high savings potential might not mean solvency. ·
 *           A solvent firm may still carry a default risk and lose its risk appetite. ·
 *           The greenwashing was thorough; the audit, less so. ·
 *           We have no nepotism here; we have an old boys' network. ·
 *           False labeling, they said, and rather good against the reputational risk.
 *
 * Ünitenin tek öğretme noktası SAYILABİLİRLİK. „Cost“ sayılabiliyor ama
 * „follow-up costs“ kimsenin tekilini kullanmadığı bir çoğul: raporda
 * „a follow-up cost“ yazılmıyor, çoğul şeyin ADI olmuş. Asıl kural daha
 * geniş: advice, information, evidence, research, equipment, machinery,
 * capital İngilizcede ne çoğul ne „a“ alıyor; Almancadaki karşılıkları ise
 * sorunsuz çoğul yapan sıradan sayılabilir isimler, üstelik adlandırdıkları
 * şeyler AYNI şeyler. Ölçü: **SAYILABİLİRLİK DÜNYANIN DEĞİL DİLİN
 * KARARI** — hiçbir şey öğüdün parçalanamaz bir kütle, uyarının
 * parçalanabilir olduğunu söylemiyor. İngilizce birini saymak
 * gerektiğinde bir SAYAÇ ödünç alıyor (a piece of advice, an item of
 * equipment, a body of evidence, a line of research); Almanca yalnızca ek
 * koyuyor, ve bu alışkanlığı taşıyan yazar „an advice“, „informations“,
 * „researches“ üretiyor — üçü de sayfada hata değil YABANCI AKSAN olarak
 * duyuluyor, ve tam bu yüzden yıllarca düzeltilmiyor.
 */
export const enC1U22: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u22-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 22,
    title: "The vocabulary of cost",
    genre: "info",
    intro: "Aynı sözcük bir satır sonra tanımlıksız ve çoğul. Kural nerede?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "error", tr: "yanlış" },
      { de: "ordinary", tr: "olağan" },
      { de: "countability", tr: "sayılabilirlik" },
      { de: "halves", tr: "yarılar" },
      { de: "category", tr: "ulam" },
      { de: "event", tr: "olay" },
      { de: "an article", tr: "tanımlık" },
      { de: "carelessness", tr: "dikkatsizlik" },
      { de: "counted", tr: "sayılan" },
      { de: "a plural", tr: "çoğul" },
      { de: "a singular", tr: "tekil" },
      { de: "the name of the thing", tr: "şeyin adı" },
      { de: "corrected", tr: "düzeltilmiş" },
      { de: "ungrammatical", tr: "dil bilgisine aykırı" },
      { de: "equipment", tr: "donanım" },
      { de: "machinery", tr: "makine parkı" },
      { de: "an equivalent", tr: "karşılık" },
      { de: "countable", tr: "sayılabilir" },
      { de: "trouble", tr: "güçlük" },
      { de: "the same things", tr: "aynı şeyler" },
      { de: "a decision", tr: "karar" },
      { de: "in pieces", tr: "parçalar hâlinde" },
      { de: "borrows", tr: "ödünç alıyor" },
      { de: "a counter", tr: "sayaç" },
      { de: "a body of", tr: "bütünü" },
      { de: "an ending", tr: "ek" },
      { de: "a foreign accent", tr: "yabancı aksan" },
      { de: "a principle", tr: "ilke" },
      { de: "assigned", tr: "atanmış" },
      { de: "a definition", tr: "tanım" },
    ],
    minutes: 12,
    text:
      "A marginal cost is not an opportunity cost. Two nouns with an article in front of each, and one line later the same word turns up with no article and an ending on it: follow-up costs are estimated.\n" +
      "That is not carelessness. „Cost“ can be counted, and „costs“ in that phrase is a plural with a singular nobody uses: nobody writes „a follow-up cost“ in a report, and the plural has become the name of the thing.\n" +
      "This is the part of English that a reader from German gets wrong for years without being corrected, because nothing in the error is ungrammatical enough to stop anybody.\n" +
      "The rule is not about the world. Advice, information, evidence, research, equipment, machinery and capital take no plural and no article in English. Their equivalents in German are ordinary countable nouns that make plurals without any trouble at all, and the things they name are the same things.\n" +
      "So countability is a decision the language made rather than a fact about advice. Nothing in the world says that a warning comes in pieces and a piece of advice does not.\n" +
      "Where English has to count one, it borrows a counter: a piece of advice, an item of equipment, a body of evidence, a line of research. German adds an ending instead, and a writer who carries that habit across produces „an advice“ and „informations“, both of which are heard on the page as a foreign accent rather than as a mistake somebody made.\n" +
      "An economy of scale lowers the capital requirement. „Capital“ has no plural here and „requirement“ has one, and no principle joins the two: they were assigned separately and they have to be learned separately.\n" +
      "Follow-up costs are estimated; a cost overrun is announced. And the two halves show the last part of the rule. „Costs“ is a plural naming a category; „a cost overrun“ is a single countable event with a date on it. The same root, two shapes, and the shape is doing the work of a whole definition.",
    questions: [
      {
        text: "What has the plural become?",
        options: ["the name of the thing", "a mistake", "a category of one"],
        answer: 0,
        explain: "„the plural has become the name of the thing.“",
      },
      {
        text: "What is countability?",
        options: ["a decision the language made", "a fact about advice", "a rule about the world"],
        answer: 0,
        explain: "„countability is a decision the language made rather than a fact about advice.“",
      },
      {
        kind: "truefalse",
        text: "No principle joins „capital“ and „requirement“.",
        options: ["True", "False"],
        answer: 0,
        explain: "„no principle joins the two: they were assigned separately…“",
      },
      {
        kind: "gapfill",
        text: "Follow-up costs are estimated; a cost overrun is ___.",
        options: [],
        answer: 0,
        accept: ["announced"],
        explain: "„Follow-up costs are estimated; a cost overrun is announced.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A marginal cost is not an opportunity cost.",
          "The plural has become the name of the thing.",
          "Countability is a decision the language made.",
          "English borrows a counter to count one.",
        ],
        explain: "Cümle, çoğul, karar; en sonda sayaç.",
      },
      {
        kind: "short_answer",
        text: "How is the error heard on the page?",
        options: [],
        answer: 0,
        accept: ["as an accent", "a foreign accent", "as an accent not a mistake"],
        explain: "„heard on the page as a foreign accent rather than as a mistake…“",
      },
    ],
  },
  {
    id: "en-c1-u22-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 22,
    title: "Reporting the books",
    genre: "opinion",
    intro: "Biri iddia ediyor, öteki kanıtlıyor. İki fiilin bedeli aynı mı?",
    gloss: [
      { de: "entirely", tr: "tümüyle" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "skipped", tr: "atlanmış" },
      { de: "practical", tr: "işe dönük" },
      { de: "lying", tr: "yatan" },
      { de: "alleges", tr: "ileri sürüyor" },
      { de: "proves", tr: "kanıtlıyor" },
      { de: "a burden", tr: "yük" },
      { de: "an accusation", tr: "suçlama" },
      { de: "a document", tr: "belge" },
      { de: "a signature", tr: "imza" },
      { de: "a transfer", tr: "aktarma" },
      { de: "the gap", tr: "aralık" },
      { de: "a headline", tr: "manşet" },
      { de: "an intention", tr: "kasıt" },
      { de: "a loss", tr: "zarar" },
      { de: "a gain", tr: "kazanç" },
      { de: "the difference", tr: "fark" },
      { de: "a court", tr: "mahkeme" },
      { de: "an audit", tr: "denetim" },
      { de: "an assumption", tr: "varsayım" },
      { de: "a boundary", tr: "sınır" },
      { de: "quietly", tr: "sessizce" },
      { de: "a note", tr: "not" },
      { de: "a year later", tr: "bir yıl sonra" },
      { de: "read back", tr: "geri okunan" },
    ],
    minutes: 12,
    text:
      "One alleges accounting fraud; another proves embezzlement. Two verbs and two entirely different weeks of work, and the second of them is the only one that ends anywhere.\n" +
      "„Alleges“ carries no burden. It names an accusation and puts the name of the person who made it into the sentence, which is why a careful newspaper uses it in every headline about a case that has not been decided.\n" +
      "„Proves“ carries a document, a signature and a transfer. The gap between the two verbs is measured in months of somebody's life, and a reader who treats them as two words for the same thing has skipped the part that matters.\n" +
      "To feign a loss is not to embezzle a gain. Here the difference is an intention rather than an amount. A loss that was made to look larger is a claim about a number; money taken out is a claim about a person, and only the second one is a thing a court can name.\n" +
      "The gray area claims what the pretext assumes. That is the sentence to keep, and it is about how a boundary moves.\n" +
      "A gray area is not a place where the rules are unclear. It is a place where a rule was clear and an assumption was allowed to sit next to it quietly for a few years, and the assumption is what a pretext is built on afterwards.\n" +
      "So the practical rule for reading an audit is about order rather than about numbers. Find the first year in which the note changed. Somebody wrote a sentence that year and meant it as a description of one case, and the sentence was read back later as a permission.\n" +
      "Almost nobody in the room a year later remembers that it was written about one case. That is how a gray area is made, and it is made in writing, by people who were not lying at the time.",
    questions: [
      {
        text: "What does „alleges“ carry?",
        options: ["no burden", "a document", "a signature"],
        answer: 0,
        explain: "„„Alleges“ carries no burden.“",
      },
      {
        text: "What is a gray area?",
        options: ["a place where an assumption sat next to a rule", "a place with no rules", "an unclear number"],
        answer: 0,
        explain: "„a place where a rule was clear and an assumption was allowed to sit next to it quietly…“",
      },
      {
        kind: "truefalse",
        text: "The people who made the gray area were lying at the time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„by people who were not lying at the time.“",
      },
      {
        kind: "gapfill",
        text: "To feign a loss is not to ___ a gain.",
        options: [],
        answer: 0,
        accept: ["embezzle"],
        explain: "„To feign a loss is not to embezzle a gain.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "One alleges accounting fraud; another proves embezzlement.",
          "To feign a loss is not to embezzle a gain.",
          "The gray area claims what the pretext assumes.",
          "Find the first year in which the note changed.",
        ],
        explain: "İki fiil, kasıt, sınırın kayması; en sonda okuma kuralı.",
      },
      {
        kind: "short_answer",
        text: "How was the sentence read back later?",
        options: [],
        answer: 0,
        accept: ["as a permission", "a permission", "as an allowance"],
        explain: "„the sentence was read back later as a permission.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u22-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 22,
    title: "Thoroughly green",
    genre: "dialogue",
    intro: "Yeşil aklama baştan aşağıydı; denetim daha az. Hangi ad hangisini örtüyor?",
    gloss: [
      { de: "instance", tr: "örnek" },
      { de: "friendlier", tr: "daha dost" },
      { de: "reputation", tr: "itibar" },
      { de: "large", tr: "büyük" },
      { de: "thorough", tr: "baştan aşağı" },
      { de: "a brochure", tr: "broşür" },
      { de: "a page", tr: "sayfa" },
      { de: "a supplier", tr: "tedarikçi" },
      { de: "a claim", tr: "iddia" },
      { de: "a category", tr: "tür" },
      { de: "a network", tr: "ağ" },
      { de: "a rule", tr: "kural" },
      { de: "written down", tr: "yazılı" },
      { de: "a friend", tr: "arkadaş" },
      { de: "a shortlist", tr: "kısa liste" },
      { de: "a compliment", tr: "iltifat" },
      { de: "a fine", tr: "para cezası" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Şule", text: "The greenwashing was thorough; the audit, less so. Forty pages of brochure and four pages of audit, and the ratio is the whole story." },
      { speaker: "Toprak", text: "Was anything in the brochure false?" },
      { speaker: "Şule", text: "Almost nothing. Every claim in it was true about one supplier, and the brochure never says which, and there are eleven." },
      { speaker: "Toprak", text: "We have no nepotism here; we have an old boys' network." },
      { speaker: "Şule", text: "That line denies a category and admits an instance under a friendlier name, which is a shape we have both seen four times this year." },
      { speaker: "Toprak", text: "Is the difference real?" },
      { speaker: "Şule", text: "One is a rule being broken and the other is a rule that was never written down. Nobody has to break anything if the shortlist arrives already short." },
      { speaker: "Toprak", text: "False labeling, they said, and rather good against the reputational risk." },
      { speaker: "Şule", text: "And there is the compliment at the end again. Read it slowly: a false label is being defended because it protects a reputation." },
      { speaker: "Toprak", text: "Which is the opposite of what a label is for." },
      { speaker: "Şule", text: "It is exactly the opposite, and nobody in that meeting heard it, because the sentence has the shape of an agreement and the room was tired." },
      { speaker: "Toprak", text: "What ends this?" },
      { speaker: "Şule", text: "A fine larger than the saving. Nothing else has ever worked, and everybody in the room knows the number it would have to be." },
    ],
    questions: [
      {
        text: "What is the whole story?",
        options: ["the ratio of pages", "the eleven suppliers", "the false claim"],
        answer: 0,
        explain: "„Forty pages of brochure and four pages of audit, and the ratio is the whole story.“",
      },
      {
        text: "What is the difference between the two?",
        options: ["one rule was never written down", "one is legal", "one is older"],
        answer: 0,
        explain: "„One is a rule being broken and the other is a rule that was never written down.“",
      },
      {
        kind: "truefalse",
        text: "Almost nothing in the brochure was false.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Almost nothing. Every claim in it was true about one supplier…“",
      },
      {
        kind: "gapfill",
        text: "We have no nepotism here; we have an old boys' ___.",
        options: [],
        answer: 0,
        accept: ["network"],
        explain: "„We have no nepotism here; we have an old boys' network.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The greenwashing was thorough; the audit, less so.", "The greenwashing was thorough; the audit, less so"],
        explain: "İkinci yarı sıfatı da fiili de ödünç alıyor.",
      },
      {
        kind: "short_answer",
        text: "What ends this?",
        options: [],
        answer: 0,
        accept: ["a large fine", "a fine", "a fine over the saving"],
        explain: "„A fine larger than the saving.“",
      },
    ],
  },
  {
    id: "en-c1-u22-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 22,
    title: "How certain is the forecast",
    genre: "monologue",
    intro: "Ödeme gücü olan bir şirket neden hâlâ risk taşıyor?",
    gloss: [
      { de: "fifteenth", tr: "ayın on beşi" },
      { de: "edge", tr: "kenar" },
      { de: "beats", tr: "yener" },
      { de: "a forecast", tr: "tahmin" },
      { de: "a cycle", tr: "döngü" },
      { de: "to turn", tr: "dönmek" },
      { de: "an order book", tr: "sipariş defteri" },
      { de: "a quarter", tr: "çeyrek" },
      { de: "a household", tr: "hane" },
      { de: "a balance sheet", tr: "bilanço" },
      { de: "a bank", tr: "banka" },
      { de: "a line of credit", tr: "kredi limiti" },
      { de: "a month", tr: "ay" },
      { de: "an appetite", tr: "iştah" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Görkem", text: "The investment cycle may well turn before the savings rate falls. Two numbers that people expect to move together and they do not have to." },
      { speaker: "Görkem", text: "An order book turns in a quarter. A household changes what it puts away over two or three years, and the second one is slower than any forecast built on it." },
      { speaker: "Görkem", text: "A high savings potential might not mean solvency. And this is the line that costs firms their lives, so I will say it in plain words." },
      { speaker: "Görkem", text: "Potential is what the balance sheet says a firm could raise. Solvency is whether it can pay what is due on the fifteenth." },
      { speaker: "Görkem", text: "The gap between those two is called selling something, and selling something takes a buyer, a price and about four weeks." },
      { speaker: "Görkem", text: "A solvent firm may still carry a default risk and lose its risk appetite. Three things in one line and the third is the one nobody plans for." },
      { speaker: "Görkem", text: "A firm that has been close to the edge once stops taking the decisions that made it grow, and it stops taking them for about five years." },
      { speaker: "Görkem", text: "That is not in any model I have read. It is in every firm I have worked with, and the people who make it are not wrong to be careful." },
      { speaker: "Görkem", text: "So when a bank withdraws a line of credit, the damage is not the month it covers. It is the five years of decisions that follow." },
      { speaker: "Görkem", text: "Write that into the case. A number for the month is easy and a number for the five years is a guess, and a guess in the file beats a silence." },
    ],
    questions: [
      {
        text: "What is solvency?",
        options: ["paying what is due", "what could be raised", "the order book"],
        answer: 0,
        explain: "„Solvency is whether it can pay what is due on the fifteenth.“",
      },
      {
        text: "What does a firm near the edge stop doing?",
        options: ["taking the decisions that made it grow", "selling something", "paying on time"],
        answer: 0,
        explain: "„stops taking the decisions that made it grow…“",
      },
      {
        kind: "truefalse",
        text: "The five years are in the models he has read.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is not in any model I have read.“",
      },
      {
        kind: "gapfill",
        text: "A high savings potential might not mean ___.",
        options: [],
        answer: 0,
        accept: ["solvency"],
        explain: "„A high savings potential might not mean solvency.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The investment cycle may well turn before the savings rate falls.", "The investment cycle may well turn before the savings rate falls"],
        explain: "Birlikte hareket etmesi beklenen iki sayı.",
      },
      {
        kind: "short_answer",
        text: "What beats a silence?",
        options: [],
        answer: 0,
        accept: ["a guess in the file", "a guess", "a number in the file"],
        explain: "„a guess in the file beats a silence.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u22-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 22,
    title: "A marginal cost is not an opportunity cost",
    genre: "info",
    intro: "Sayılabilirlik ve defterlerin iki fiili.",
    gloss: [
      { de: "plural", tr: "çoğul" },
      { de: "uncountable", tr: "sayılamaz" },
      { de: "countable", tr: "sayılabilir" },
      { de: "a marginal cost", tr: "marjinal maliyet" },
      { de: "an opportunity cost", tr: "fırsat maliyeti" },
      { de: "a cost overrun", tr: "maliyet aşımı" },
      { de: "an economy of scale", tr: "ölçek ekonomisi" },
      { de: "accounting fraud", tr: "muhasebe sahtekarlığı" },
      { de: "embezzlement", tr: "zimmete geçirme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Marjinal maliyet bir fırsat maliyeti değildir.",
        answer: "A marginal cost is not an opportunity cost.",
        hint: "İkisinin de önünde tanımlık var; bir satır sonra aynı sözcük tanımlıksız.",
      },
      {
        kind: "build",
        tr: "Sonradan çıkan maliyetler tahmin edilir; maliyet aşımı ilan edilir.",
        answer: "Follow-up costs are estimated; a cost overrun is announced.",
        hint: "Çoğul şeyin adı; öteki tarihi olan tek bir olay.",
      },
      {
        kind: "build",
        tr: "Ölçek ekonomisi sermaye ihtiyacını düşürür.",
        answer: "An economy of scale lowers the capital requirement.",
        hint: "„Capital“ çoğul almıyor, „requirement“ alıyor.",
      },
      {
        kind: "build",
        tr: "Biri muhasebe sahtekarlığı ileri sürüyor; bir başkası zimmete geçirmeyi kanıtlıyor.",
        answer: "One alleges accounting fraud; another proves embezzlement.",
        hint: "Biri hiçbir yük taşımıyor, öteki belge taşıyor.",
      },
      {
        kind: "build",
        tr: "Gri alan, kılıfın varsaydığını iddia ediyor.",
        answer: "The gray area claims what the pretext assumes.",
        hint: "Kuralın yanına sessizce oturmuş bir varsayım.",
      },
      {
        kind: "form",
        prompt: "Sayılabilirlik kartını doldur.",
        facts: "Advice ve information çoğul almıyor; Almanca karşılıkları sayılabilir; sayılabilirlik dilin kararı; İngilizce saymak için sayaç ödünç alıyor.",
        fields: [
          { label: "In English", answer: "no plural", accept: ["uncountable"] },
          { label: "In German", answer: "countable", accept: ["a plural"] },
          { label: "Whose decision", answer: "the language", accept: ["the language's"] },
          { label: "To count one", answer: "borrow a counter", accept: ["a piece of"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u22-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 22,
    title: "The greenwashing was thorough; the audit, less so",
    genre: "info",
    intro: "Tahminin çekinceleri ve yeşil aklamanın sözcükleri.",
    gloss: [
      { de: "an investment cycle", tr: "yatırım döngüsü" },
      { de: "solvency", tr: "ödeme gücü" },
      { de: "a default risk", tr: "temerrüt riski" },
      { de: "greenwashing", tr: "yeşil aklama" },
      { de: "nepotism", tr: "kayırmacılık" },
      { de: "false labeling", tr: "yanıltıcı etiketleme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yatırım döngüsü tasarruf oranı düşmeden önce pekâlâ dönebilir.",
        answer: "The investment cycle may well turn before the savings rate falls.",
        hint: "Birlikte hareket etmesi beklenen iki sayı.",
      },
      {
        kind: "build",
        tr: "Yüksek bir tasarruf potansiyeli ödeme gücü anlamına gelmeyebilir.",
        answer: "A high savings potential might not mean solvency.",
        hint: "Biri bilançonun söylediği, öteki on beşinde ödenebilen.",
      },
      {
        kind: "build",
        tr: "Ödeme gücü olan bir şirket yine de temerrüt riski taşıyıp risk iştahını yitirebilir.",
        answer: "A solvent firm may still carry a default risk and lose its risk appetite.",
        hint: "Üç şey var; kimse üçüncüsüne plan yapmıyor.",
      },
      {
        kind: "build",
        tr: "Yeşil aklama baştan aşağıydı; denetim, daha az.",
        answer: "The greenwashing was thorough; the audit, less so.",
        hint: "Kırk sayfa ile dört sayfa; oran bütün hikâye.",
      },
      {
        kind: "build",
        tr: "Burada kayırmacılık yok; kayırma ağımız var.",
        answer: "We have no nepotism here; we have an old boys' network.",
        hint: "Tür yadsınıyor, örnek daha dost bir adla kabul ediliyor.",
      },
    ],
  },
];
