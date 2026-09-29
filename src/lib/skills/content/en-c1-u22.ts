import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 22 — "Maliyetin sözcükleri, defterleri aktarmak,
 * tahmin ne kadar kesin, baştan aşağı yeşil".
 *
 * Dört ders: The vocabulary of cost · Reporting the books ·
 * How certain is the forecast · Thoroughly green.
 *
 *   Kelime: marginal cost, opportunity cost, follow-on costs, cost overrun,
 *           economy of scale, capital requirement, accounting fraud,
 *           embezzlement, gray area, pretext, feign, embezzle, investment
 *           cycle, savings rate, solvency, solvent, default risk, risk
 *           appetite, greenwashing, nepotism, mislabeling, reputational risk.
 *   Kalıp:  A marginal cost is not an opportunity cost. ·
 *           Follow-on costs are estimated; a cost overrun is announced. ·
 *           An economy of scale lowers the capital requirement. ·
 *           One alleges accounting fraud; another proves embezzlement. ·
 *           The whistleblower openly claims what the auditors merely assume. ·
 *           To feign a loss is not to embezzle a gain. ·
 *           The investment cycle may well turn before the savings rate falls. ·
 *           A high savings potential might not mean solvency. ·
 *           A solvent firm may still carry a default risk and lose its risk appetite. ·
 *           The greenwashing was thorough; the audit, less so. ·
 *           We have no nepotism here; we have an old boys' network. ·
 *           Creative labeling, they said, and rather good for our reputation.
 *
 * Ünitenin tek öğretme noktası SAYILABİLİRLİK. „Cost“ sayılabiliyor ama
 * „follow-on costs“ kimsenin tekilini kullanmadığı bir çoğul: raporda
 * „a follow-on cost“ yazılmıyor, çoğul şeyin ADI olmuş. Asıl kural daha
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
    title: "The warehouse expansion budget",
    genre: "report",
    intro: "Yönetim kurulu için bir rapor: depo genişletmesi bütçeyi neden aştı?",
    gloss: [
      { de: "equipment", tr: "donanım" },
      { de: "machinery", tr: "makine parkı" },
      { de: "elsewhere", tr: "başka yerde" },
      { de: "an invoice", tr: "fatura" },
      { de: "a parcel", tr: "koli" },
      { de: "a cent", tr: "sent" },
      { de: "a consultant", tr: "danışman" },
      { de: "a recommendation", tr: "öneri" },
    ],
    minutes: 12,
    text:
      "BOARD PAPER: THE HAMBURG WAREHOUSE EXPANSION AND WHERE THE MONEY WENT\n" +
      "1. Summary. The expansion was approved in 2024 with a budget of 12 million euros. It will close at 14.6 million. This paper explains the gap and gives the board the information it asked for in June.\n" +
      "2. The original estimate. A marginal cost is not an opportunity cost, and the first estimate treated the new hall as if it cost only what we paid for it. It did not count what the same capital could have earned elsewhere, and it did not count the staff time spent on the move.\n" +
      "3. Follow-on costs. Follow-on costs are estimated; a cost overrun is announced. We estimated the follow-on costs for heating, cleaning and maintenance correctly. The overrun came from somewhere else: the new sorting machinery arrived four months late, and the old equipment had to be rented back at short notice.\n" +
      "4. The evidence. The auditors reviewed every invoice. Their evidence shows that no money was lost through fraud. It also shows that two items of equipment were ordered twice, which cost us 80,000 euros that the supplier has agreed to refund.\n" +
      "5. Scale. An economy of scale lowers the capital requirement. Once the hall runs at full capacity, each parcel will cost about eleven cents less to handle, and the extra investment should pay for itself within six years.\n" +
      "6. Advice for the next project. The consultants gave us one piece of advice we should have taken earlier: order machinery only after the building permit is final. Our own research points the same way. Three of our last four projects ran over budget for exactly this reason.\n" +
      "7. Recommendation. The board is asked to approve the final figure of 14.6 million euros and to request a short report on the rented equipment by the end of the quarter.",
    questions: [
      {
        text: "How much will the expansion finally cost?",
        options: ["14.6 million euros", "12 million euros", "80,000 euros"],
        answer: 0,
        explain: "„It will close at 14.6 million.“",
      },
      {
        text: "What caused the cost overrun?",
        options: ["The sorting machinery arrived late.", "Heating was more expensive.", "Money was lost through fraud."],
        answer: 0,
        explain: "„the new sorting machinery arrived four months late, and the old equipment had to be rented back at short notice.“",
      },
      {
        kind: "truefalse",
        text: "The supplier will pay back the money for the double order.",
        options: ["True", "False"],
        answer: 0,
        explain: "„two items of equipment were ordered twice, which cost us 80,000 euros that the supplier has agreed to refund.“",
      },
      {
        kind: "gapfill",
        text: "An economy of scale lowers the capital ___.",
        options: [],
        answer: 0,
        accept: ["requirement"],
        explain: "„An economy of scale lowers the capital requirement.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The expansion was approved with a budget of 12 million euros.",
          "The first estimate ignored the opportunity cost.",
          "The auditors found no fraud.",
          "The board is asked to approve the final figure.",
        ],
        explain: "Özet, ilk tahmin, denetim bulgusu; en sonda kurula öneri.",
      },
      {
        kind: "short_answer",
        text: "When should machinery be ordered next time?",
        options: [],
        answer: 0,
        accept: ["after the permit is final", "after the building permit", "when the permit is final"],
        explain: "„order machinery only after the building permit is final.“",
      },
    ],
  },
  {
    id: "en-c1-u22-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 22,
    title: "A finance director on trial",
    genre: "article",
    intro: "Bir mali işler müdürünün yargılandığı dava. Suçlama ne, kanıt ne?",
    gloss: [
      { de: "alleges", tr: "ileri sürüyor" },
      { de: "proves", tr: "kanıtlıyor" },
      { de: "a signature", tr: "imza" },
      { de: "a transfer", tr: "havale" },
      { de: "a court", tr: "mahkeme" },
      { de: "carelessness", tr: "dikkatsizlik" },
      { de: "finance", tr: "finans" },
      { de: "regional", tr: "bölgesel" },
      { de: "the prosecution", tr: "savcılık" },
      { de: "the defense", tr: "savunma" },
      { de: "an allegation", tr: "suçlama" },
      { de: "junior", tr: "kıdemsiz" },
      { de: "an accountant", tr: "muhasebeci" },
      { de: "trace", tr: "izini sürmek" },
      { de: "a prison", tr: "hapishane" },
      { de: "an invoice", tr: "fatura" },
      { de: "equipment", tr: "donanım" },
      { de: "machinery", tr: "makine parkı" },
    ],
    minutes: 12,
    text:
      "FORMER FINANCE DIRECTOR ON TRIAL IN LYON\n" +
      "The trial of Marc Dubois, the former finance director of a regional building firm, opened on Monday, and the first day showed how far apart the two sides are.\n" +
      "The prosecution alleges accounting fraud on a large scale: invoices for machinery that was never delivered, and losses that were made to look larger than they were. It also claims that Dubois embezzled about 1.2 million euros over four years. The defense does not deny that the accounts were wrong. It says they were wrong because of carelessness, not because of any plan.\n" +
      "One alleges accounting fraud; another proves embezzlement. That, lawyers say, is the real question for the court. An allegation needs a name and a newspaper. Proof needs a document, a signature and a transfer of money to an account.\n" +
      "The case began with a whistleblower, a junior accountant who noticed that the same piece of equipment had been paid for three times. The whistleblower openly claims what the auditors merely assumed: that the director knew. The auditors had noticed the gaps in 2022, but their report called them a gray area and recommended only better training.\n" +
      "To feign a loss is not to embezzle a gain, and the defense will build its case on that line. Making a bad year look worse may break accounting rules, but it does not put money in anybody's pocket. The prosecution will have to show where the money went.\n" +
      "Its evidence so far is mostly information from the company's own bank. Investigators say they have traced at least three transfers to an account in the name of the director's brother, who is expected to give evidence next week.\n" +
      "The court has set aside six weeks for the trial. If Dubois is found guilty of embezzlement, he faces up to five years in prison. If only the accounting charges are proved, the penalty is likely to be a fine.",
    questions: [
      {
        text: "How much is Dubois said to have embezzled?",
        options: ["about 1.2 million euros", "about 12 million euros", "about 80,000 euros"],
        answer: 0,
        explain: "„It also claims that Dubois embezzled about 1.2 million euros over four years.“",
      },
      {
        text: "What does the defense blame for the wrong accounts?",
        options: ["carelessness", "a plan", "the auditors"],
        answer: 0,
        explain: "„It says they were wrong because of carelessness, not because of any plan.“",
      },
      {
        kind: "truefalse",
        text: "In 2022 the auditors reported the gaps as fraud.",
        options: ["True", "False"],
        answer: 1,
        explain: "„their report called them a gray area and recommended only better training.“",
      },
      {
        kind: "gapfill",
        text: "The whistleblower openly claims what the auditors merely ___.",
        options: [],
        answer: 0,
        accept: ["assumed"],
        explain: "„The whistleblower openly claims what the auditors merely assumed: that the director knew.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The trial opens on Monday.",
          "A junior accountant notices a payment made three times.",
          "Investigators trace three transfers.",
          "The court sets aside six weeks.",
        ],
        explain: "Dava, ihbar, para izi; en sonda mahkemenin takvimi.",
      },
      {
        kind: "short_answer",
        text: "What will the prosecution have to show?",
        options: [],
        answer: 0,
        accept: ["where the money went", "where the money is"],
        explain: "„The prosecution will have to show where the money went.“",
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
    title: "Forty pages of brochure",
    genre: "dialogue",
    intro: "Yeşil aklama titizdi; denetim daha az. Hangi ad hangisini örtüyor?",
    gloss: [
      { de: "a defense", tr: "savunma" },
      { de: "object", tr: "itiraz etmek" },
      { de: "reputation", tr: "itibar" },
      { de: "large", tr: "büyük" },
      { de: "thorough", tr: "titiz" },
      { de: "a brochure", tr: "broşür" },
      { de: "a page", tr: "sayfa" },
      { de: "a supplier", tr: "tedarikçi" },
      { de: "a claim", tr: "iddia" },
      { de: "a network", tr: "ağ" },
      { de: "a rule", tr: "kural" },
      { de: "written down", tr: "yazılı" },
      { de: "a shortlist", tr: "kısa liste" },
      { de: "a fine", tr: "para cezası" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Şule", text: "The greenwashing was thorough; the audit, less so. Forty pages of brochure and four pages of audit, and the ratio is the whole story." },
      { speaker: "Toprak", text: "Was anything in the brochure false?" },
      { speaker: "Şule", text: "Almost nothing. Every claim in it was true about one supplier, and the brochure never says which, and there are eleven." },
      { speaker: "Toprak", text: "We have no nepotism here; we have an old boys' network." },
      { speaker: "Şule", text: "So there is no nepotism, only the same six families on every shortlist. We have heard that defense four times this year." },
      { speaker: "Toprak", text: "Is the difference real?" },
      { speaker: "Şule", text: "One is a rule being broken and the other is a rule that was never written down. Nobody has to break anything if the shortlist arrives already short." },
      { speaker: "Toprak", text: "Creative labeling, they said, and rather good for our reputation." },
      { speaker: "Şule", text: "Think about what that means: a false label is being defended because it protects a reputation." },
      { speaker: "Toprak", text: "Which is the opposite of what a label is for." },
      { speaker: "Şule", text: "It is exactly the opposite, and nobody in that meeting objected, because it was late and the room was tired." },
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
    title: "Orders and savings",
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
      { speaker: "Görkem", text: "That is not in any model I have read. It is in every firm I have worked with, and the people who run them are not wrong to be careful." },
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
    title: "The company accounts",
    genre: "info",
    intro: "Depo genişletmesinin hesapları: cümleler ve bir denetim kartı.",
    gloss: [
      { de: "a marginal cost", tr: "marjinal maliyet" },
      { de: "an opportunity cost", tr: "fırsat maliyeti" },
      { de: "a cost overrun", tr: "maliyet aşımı" },
      { de: "machinery", tr: "makine parkı" },
      { de: "an economy of scale", tr: "ölçek ekonomisi" },
      { de: "accounting fraud", tr: "muhasebe sahtekârlığı" },
      { de: "embezzlement", tr: "zimmete geçirme" },
      { de: "assume", tr: "varsaymak" },
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
        answer: "Follow-on costs are estimated; a cost overrun is announced.",
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
        tr: "Biri muhasebe sahtekârlığı ileri sürüyor; bir başkası zimmete geçirmeyi kanıtlıyor.",
        answer: "One alleges accounting fraud; another proves embezzlement.",
        hint: "Biri hiçbir yük taşımıyor, öteki belge taşıyor.",
      },
      {
        kind: "build",
        tr: "Muhbir, denetçilerin yalnızca varsaydığını açıkça iddia ediyor.",
        answer: "The whistleblower openly claims what the auditors merely assume.",
        hint: "Birinin açık iddiası, ötekinin sessiz varsayımı.",
      },
      {
        kind: "form",
        prompt: "Kurul için denetim kartını doldur.",
        facts: "Genişletmenin bütçesi 12 milyon avroydu ve 14,6 milyon avroyla kapanıyor; aşımın nedeni geç gelen makineler; danışmanların öğüdü, makineyi yapı izni kesinleşince sipariş etmek.",
        fields: [
          { label: "Budget", answer: "12 million euros", accept: ["12 million"] },
          { label: "Final figure", answer: "14.6 million euros", accept: ["14.6 million"] },
          { label: "Cause of the overrun", answer: "late machinery", accept: ["the machinery was late"] },
          { label: "Advice", answer: "order after the permit", accept: ["wait for the permit"] },
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
    title: "Risks behind a good image",
    genre: "info",
    intro: "Tahminin çekinceleri ve yeşil aklamanın sözcükleri.",
    gloss: [
      { de: "an investment cycle", tr: "yatırım döngüsü" },
      { de: "solvency", tr: "ödeme gücü" },
      { de: "a default risk", tr: "temerrüt riski" },
      { de: "greenwashing", tr: "yeşil aklama" },
      { de: "nepotism", tr: "kayırmacılık" },
      { de: "mislabeling", tr: "yanıltıcı etiketleme" },
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
        hint: "Biri bilançonun söylediği, öteki ayın on beşinde ödenebilen.",
      },
      {
        kind: "build",
        tr: "Ödeme gücü olan bir şirket yine de temerrüt riski taşıyıp risk iştahını yitirebilir.",
        answer: "A solvent firm may still carry a default risk and lose its risk appetite.",
        hint: "Üç şey var; kimse üçüncüsüne plan yapmıyor.",
      },
      {
        kind: "build",
        tr: "Yeşil aklama titizdi; denetim, daha az.",
        answer: "The greenwashing was thorough; the audit, less so.",
        hint: "Kırk sayfa ile dört sayfa; oran bütün hikâye.",
      },
      {
        kind: "build",
        tr: "Burada kayırmacılık yok; ahbap çavuş ağımız var.",
        answer: "We have no nepotism here; we have an old boys' network.",
        hint: "Tür yadsınıyor, örnek daha dost bir adla kabul ediliyor.",
      },
    ],
  },
];
