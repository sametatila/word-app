import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 23 — "Bir strateji belgesini bir arada tutmak, ihalenin
 * söylemedikleri, tek bir iddianın üç kaydı, savın sırası".
 *
 * Dört ders: Holding a strategy paper together · What the tender leaves unsaid ·
 * Three registers of one claim · The order of the argument.
 *
 *   Kelime: market penetration, market saturation, competitiveness, monopoly
 *           position, undercut, price fixing, bidding process, permitting
 *           process, consortium, operating model, conflicting goals,
 *           cumbersome, rhetoric, pathos, stylistic device, break in style,
 *           line of argument, flaw in reasoning, prevailing doctrine,
 *           school of thought, contentious issue, debate among experts.
 *   Kalıp:  The market penetration described above leads to the market saturation discussed below. ·
 *           Our competitiveness, as noted earlier, rests on a monopoly position. ·
 *           Where a rival can undercut us, no price fixing helps. ·
 *           The bidding process survives as a form, the permitting process as a delay. ·
 *           The consortium builds; the operating model, it does not name. ·
 *           The conflicting goals stayed; the cumbersome wording did not. ·
 *           In the essay it is rhetoric; in the pamphlet, pathos. ·
 *           A stylistic device is a choice; a break in style is a mistake. ·
 *           What the critic calls a literary movement, the reader calls a passing fashion. ·
 *           What the line of argument does is hide a flaw in reasoning. ·
 *           Behind the prevailing doctrine stands a school of thought. ·
 *           The contentious issue we name; the debate among experts we do not.
 *
 * Ünitenin tek öğretme noktası TANIMLIKSIZ SOYUT İSİM. İngilizce soyut
 * ismi genel anlamda kullanırken önüne hiçbir şey koymuyor: rhetoric,
 * pathos, competitiveness, doubt, freedom, work. Komşu dil ise her birinin
 * önüne tanımlık koyuyor ve orada tutuyor; dolayısıyla o taraftan gelen
 * konuşucu İngilizcenin istemediği bir „the“ ekliyor, ve ortaya kimsenin
 * yanlış diyemeyeceği ama ÇEVRİLMİŞ gibi okunan bir cümle çıkıyor. Asıl
 * C1 inceliği şu: tanımlık, ismi DARALTAN bir şey belirir belirmez geri
 * geliyor — „the rhetoric of the pamphlet“, „the doubt that stopped the
 * project“ — ve daraltma çoğunlukla ismin ÖNÜNDE değil ARDINDA duruyor.
 * Ölçü: **KURAL „SOYUT İSİM TANIMLIK ALMAZ“ DEĞİL, „DARALTAN BİR ŞEY
 * GELENE KADAR TANIMLIK YOK“** — yani kural ismin değil BÜTÜN ÖBEĞİN
 * kuralı, ve onu tek başına isme ait sanan yazar iki yönde birden
 * yanılıyor.
 */
export const enC1U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u23-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 23,
    title: "Two voices on the tram line",
    genre: "review",
    intro: "Tramvay referandumu öncesi iki belge: bir deneme ve bir broşür. Hangisine güvenmeli?",
    gloss: [
      { de: "rhetoric", tr: "retorik" },
      { de: "pathos", tr: "abartılı duygusallık" },
      { de: "doubt", tr: "kuşku" },
      { de: "a pamphlet", tr: "broşür" },
      { de: "a letterbox", tr: "posta kutusu" },
      { de: "retired", tr: "emekli" },
      { de: "transport", tr: "ulaşım" },
      { de: "an engineer", tr: "mühendis" },
      { de: "a booklet", tr: "kitapçık" },
      { de: "a referendum", tr: "referandum" },
      { de: "deserve", tr: "hak etmek" },
      { de: "congestion", tr: "trafik sıkışıklığı" },
      { de: "a fence", tr: "çit" },
      { de: "an owner", tr: "sahip" },
      { de: "dust", tr: "toz" },
      { de: "honesty", tr: "dürüstlük" },
      { de: "history", tr: "tarih" },
    ],
    minutes: 12,
    text:
      "REVIEW: TWO VOICES ON THE NEW TRAM LINE\n" +
      "This month two documents landed in every letterbox in Graz. One is an essay by a retired transport engineer, printed as a booklet by the city library. The other is a pamphlet from the campaign against the tram. In the essay it is rhetoric; in the pamphlet, pathos. Both want your vote in the November referendum, and both deserve a careful reading.\n" +
      "The essay argues from cost and time. Its author, Dr. Helga Brunner, has built tram lines in three countries, and experience shows on every page. She admits doubt where it belongs: nobody knows how many drivers will leave their cars at home. But she is clear that congestion costs the city money every day, and that competitiveness depends on people reaching work on time. The rhetoric of the essay is quiet. It persuades by listing facts and letting the reader add them up.\n" +
      "The pamphlet is different. Its cover shows a small shop behind a wall of construction fences, and the headline asks: „Who will pay for your street?“ Fear sells, and the pamphlet knows it. The anger of the shop owners on the main shopping street is real, and so is the dust of two years of building work. What is missing is any number.\n" +
      "A stylistic device is a choice; a break in style is a mistake. The pamphlet chooses emotion and uses it well until page four, where it suddenly quotes a table of costs that it cannot explain. The table does more damage to its own side than any opponent could.\n" +
      "Every few years, voters are told that honesty is back in fashion. Honesty is not a fashion. It is a habit, and the essay has it. The pamphlet has energy, and energy is not nothing, but it is not an argument either.\n" +
      "Read both before November. Trust the one that tells you what it does not know.",
    questions: [
      {
        text: "Who wrote the essay?",
        options: ["a retired transport engineer", "the campaign against the tram", "the city library"],
        answer: 0,
        explain: "„One is an essay by a retired transport engineer, printed as a booklet by the city library.“",
      },
      {
        text: "What does the essay argue from?",
        options: ["cost and time", "fear and anger", "the history of the city"],
        answer: 0,
        explain: "„The essay argues from cost and time.“",
      },
      {
        kind: "truefalse",
        text: "The pamphlet quotes a table that it cannot explain.",
        options: ["True", "False"],
        answer: 0,
        explain: "„it suddenly quotes a table of costs that it cannot explain.“",
      },
      {
        kind: "gapfill",
        text: "Fear sells, and the pamphlet ___ it.",
        options: [],
        answer: 0,
        accept: ["knows"],
        explain: "„Fear sells, and the pamphlet knows it.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Two documents arrive in every letterbox.",
          "The essay admits doubt about the drivers.",
          "The pamphlet shows a small shop behind fences.",
          "The reviewer tells readers to read both.",
        ],
        explain: "İki belge, deneme, broşür; en sonda eleştirmenin öğüdü.",
      },
      {
        kind: "short_answer",
        text: "Which document does the reviewer trust more?",
        options: [],
        answer: 0,
        accept: ["the essay", "the booklet", "the engineer's essay"],
        explain: "„Honesty is not a fashion. It is a habit, and the essay has it.“",
      },
    ],
  },
  {
    id: "en-c1-u23-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 23,
    title: "The tender and the permit",
    genre: "opinion",
    intro: "İhale bir form olarak, onay bir gecikme olarak sürüyor. Hangisi kimin?",
    gloss: [
      { de: "afterlives", tr: "sonraki hayatlar" },
      { de: "unnamed", tr: "adı verilmemiş" },
      { de: "discovers", tr: "keşfediyor" },
      { de: "builder", tr: "yapan" },
      { de: "negotiation", tr: "pazarlık" },
      { de: "anywhere", tr: "hiçbir yerde" },
      { de: "smooth", tr: "pürüzsüz" },
      { de: "a tender", tr: "ihale" },
      { de: "a form", tr: "form" },
      { de: "a delay", tr: "gecikme" },
      { de: "survives", tr: "sağ kalıyor" },
      { de: "a week", tr: "hafta" },
      { de: "a desk", tr: "masa" },
      { de: "a consortium", tr: "konsorsiyum" },
      { de: "builds", tr: "inşa ediyor" },
      { de: "names", tr: "adlandırıyor" },
      { de: "an operator", tr: "işletmeci" },
      { de: "afterward", tr: "sonrasında" },
      { de: "a repair", tr: "onarım" },
      { de: "a decade", tr: "on yıl" },
      { de: "a goal", tr: "hedef" },
      { de: "wording", tr: "ifade" },
      { de: "cut", tr: "kesilmiş" },
      { de: "a lawyer", tr: "avukat" },
      { de: "a conflict", tr: "çatışma" },
      { de: "a page", tr: "sayfa" },
      { de: "shorter", tr: "daha kısa" },
      { de: "a signature", tr: "imza" },
      { de: "the last line", tr: "son satır" },
    ],
    minutes: 12,
    text:
      "The bidding process survives as a form, the permitting process as a delay. Two processes, two afterlives, and anyone who has worked on a public project knows both of them.\n" +
      "A form is a thing somebody fills out. A delay is a thing that happens to somebody, and the difference between those two is the difference between a week of work and a year of waiting at a desk that is not yours.\n" +
      "The consortium builds; the operating model, it does not name. The operating model is the part a city will live with for decades, and it is the part the tender leaves unnamed.\n" +
      "That is the pattern in almost every tender we reviewed. A tender says who builds and is quiet about who runs it afterward, and running it is thirty years of the thirty-two.\n" +
      "The consequence is not a scandal. It is a repair that nobody budgeted: a decade in, somebody discovers that the contract names a builder and a payer and no operator, and the negotiation that follows happens with no competition in the room at all.\n" +
      "The conflicting goals stayed; the cumbersome wording did not. And this is the sentence I would put on the front of any tender file.\n" +
      "The wording was cut because a lawyer read it and found it heavy. The conflict it described was still there the next morning, and now it was not written down anywhere, which made the document shorter and the project longer.\n" +
      "A page that names a conflict is not a weak page. It is the only page that will be read in the year the conflict arrives, and a signature under a clear description of a problem is worth more than a signature under a smooth last line.",
    questions: [
      {
        text: "What is a delay?",
        options: ["a thing that happens to somebody", "a thing somebody fills out", "a form"],
        answer: 0,
        explain: "„A delay is a thing that happens to somebody…“",
      },
      {
        text: "What is a tender quiet about?",
        options: ["who runs it afterward", "who builds", "who pays"],
        answer: 0,
        explain: "„A tender says who builds and is quiet about who runs it afterward…“",
      },
      {
        kind: "truefalse",
        text: "Cutting the wording removed the conflict.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The conflict it described was still there the next morning…“",
      },
      {
        kind: "gapfill",
        text: "The conflicting goals stayed; the cumbersome wording did ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The conflicting goals stayed; the cumbersome wording did not.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The bidding process survives as a form, the permitting process as a delay.",
          "The consortium builds; the operating model, it does not name.",
          "The conflicting goals stayed; the cumbersome wording did not.",
          "A page that names a conflict is not a weak page.",
        ],
        explain: "İki usul, adlandırılmayan işletmeci, kesilen ifade; en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "How long is running it?",
        options: [],
        answer: 0,
        accept: ["thirty years", "thirty of thirty-two", "most of it"],
        explain: "„running it is thirty years of the thirty-two.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u23-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 23,
    title: "A hidden flaw in reasoning",
    genre: "dialogue",
    intro: "Akıl yürütme neyi gizliyor? Adlandırılan ile adlandırılmayan.",
    gloss: [
      { de: "fifth", tr: "beşinci" },
      { de: "particular", tr: "belirli" },
      { de: "unkind", tr: "kırıcı" },
      { de: "a flaw", tr: "hata" },
      { de: "reasoning", tr: "akıl yürütme" },
      { de: "a step", tr: "adım" },
      { de: "a reader", tr: "okur" },
      { de: "smooth", tr: "pürüzsüz" },
      { de: "a doctrine", tr: "öğreti" },
      { de: "a school", tr: "okul" },
      { de: "a founder", tr: "kurucu" },
      { de: "an issue", tr: "konu" },
      { de: "a debate", tr: "tartışma" },
      { de: "a colleague", tr: "meslektaş" },
      { de: "a conference", tr: "konferans" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Evelyn", text: "What the line of argument does is hide a flaw in reasoning. A shape we know, and here it is doing something worth watching." },
      { speaker: "Bobby", text: "How does an argument hide a flaw?" },
      { speaker: "Evelyn", text: "By being smooth. A reader follows four good steps and takes the fifth on trust, and the fifth is the one that was never shown." },
      { speaker: "Bobby", text: "So the better the writing, the worse the risk." },
      { speaker: "Evelyn", text: "The better the writing, the later the reader notices. That is not an argument for bad writing; it is an argument for reading the steps out of order." },
      { speaker: "Bobby", text: "Behind the prevailing doctrine stands a school of thought." },
      { speaker: "Evelyn", text: "And behind the school stands a founder, three students and one department that had money in a particular decade." },
      { speaker: "Bobby", text: "That sounds unkind." },
      { speaker: "Evelyn", text: "It is only unkind if you think ideas travel on their own. They travel in people, and people need a position and a room and somebody to publish them." },
      { speaker: "Bobby", text: "The contentious issue we name; the debate among experts we do not." },
      { speaker: "Evelyn", text: "That is the line I would want a student to understand before a conference. The issue is public and the debate is a set of names, and only one of the two is in the papers." },
      { speaker: "Bobby", text: "Why does that matter?" },
      { speaker: "Evelyn", text: "Because a colleague who reads your paper knows both, and a sentence that names the issue while carefully not naming the debate is read as a position on it." },
    ],
    questions: [
      {
        text: "How does an argument hide a flaw?",
        options: ["by being smooth", "by being short", "by being new"],
        answer: 0,
        explain: "„By being smooth.“",
      },
      {
        text: "What stands behind the school?",
        options: ["a founder and a department with money", "a doctrine", "a conference"],
        answer: 0,
        explain: "„behind the school stands a founder, three students and one department that had money…“",
      },
      {
        kind: "truefalse",
        text: "Ideas travel in people.",
        options: ["True", "False"],
        answer: 0,
        explain: "„They travel in people…“",
      },
      {
        kind: "gapfill",
        text: "The contentious issue we name; the debate among experts we do ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The contentious issue we name; the debate among experts we do not.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What the line of argument does is hide a flaw in reasoning.", "What the line of argument does is hide a flaw in reasoning"],
        explain: "Soyut isim baştaki yuvada, kendi fiiliyle.",
      },
      {
        kind: "short_answer",
        text: "How is such a sentence read?",
        options: [],
        answer: 0,
        accept: ["as a position", "a position on it", "as taking sides"],
        explain: "„is read as a position on it.“",
      },
    ],
  },
  {
    id: "en-c1-u23-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 23,
    title: "Penetration and saturation",
    genre: "monologue",
    intro: "Pazara nüfuz aşağıda doygunluğa yol açıyor. Gönderme neyi kurtarıyor?",
    gloss: [
      { de: "itself", tr: "kendisi" },
      { de: "calculated", tr: "hesaplanan" },
      { de: "profit", tr: "kâr" },
      { de: "penetration", tr: "nüfuz" },
      { de: "saturation", tr: "doygunluk" },
      { de: "a chapter", tr: "bölüm" },
      { de: "a share", tr: "pay" },
      { de: "a ceiling", tr: "tavan" },
      { de: "a rival", tr: "rakip" },
      { de: "a cartel", tr: "kartel" },
      { de: "illegal", tr: "yasa dışı" },
      { de: "a fine", tr: "para cezası" },
      { de: "a cost base", tr: "maliyet tabanı" },
      { de: "a factory", tr: "fabrika" },
      { de: "an answer", tr: "cevap" },
      { de: "leads to", tr: "yol açıyor" },
      { de: "revenue", tr: "ciro" },
      { de: "slipped past", tr: "gizlice geçirilmek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Joel", text: "The market penetration described above leads to the market saturation discussed below. One number in chapter two and the same number in chapter six, under two names." },
      { speaker: "Joel", text: "Penetration is a share that is still growing. Saturation is the same share when the growth has stopped, and nothing about the number itself tells you which you are looking at." },
      { speaker: "Joel", text: "Only the second reading has a ceiling in it, and the whole strategy in that paper depends on which of the two chapters the reader believes." },
      { speaker: "Joel", text: "Our competitiveness, as noted earlier, rests on a monopoly position. Was it noted earlier? I always go back and check." },
      { speaker: "Joel", text: "When it was, the reminder is honest and useful: it tells the reader that the same fact is doing new work in a new chapter." },
      { speaker: "Joel", text: "When it is not true, a claim that nobody has made yet is being slipped past the reader as a reminder of something they already agreed to." },
      { speaker: "Joel", text: "Where a rival can undercut us, no price fixing helps. This is the line I would keep out of any paper that leaves the building." },
      { speaker: "Joel", text: "It is true and it is also a sentence about a cartel, and a cartel is illegal, and the fine is calculated on revenue rather than on profit." },
      { speaker: "Joel", text: "The answer to a rival with a lower cost base is a lower cost base or a different market. There is no third answer and there has never been one." },
      { speaker: "Joel", text: "Write that down instead. It is shorter, it is legal, and it is the only sentence in the file that a factory can act on." },
    ],
    questions: [
      {
        text: "What is saturation?",
        options: ["the same share when growth has stopped", "a share that is growing", "a ceiling"],
        answer: 0,
        explain: "„Saturation is the same share when the growth has stopped…“",
      },
      {
        text: "What is the fine calculated on?",
        options: ["revenue", "profit", "the share"],
        answer: 0,
        explain: "„the fine is calculated on revenue rather than on profit.“",
      },
      {
        kind: "truefalse",
        text: "The number itself tells you which reading you are in.",
        options: ["True", "False"],
        answer: 1,
        explain: "„nothing about the number itself tells you which you are looking at.“",
      },
      {
        kind: "gapfill",
        text: "Where a rival can undercut us, no price ___ helps.",
        options: [],
        answer: 0,
        accept: ["fixing"],
        explain: "„Where a rival can undercut us, no price fixing helps.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The market penetration described above leads to the market saturation discussed below.", "The market penetration described above leads to the market saturation discussed below"],
        explain: "Yukarıya ve aşağıya gönderen iki ortaç öbeği: gönderme katmanı.",
      },
      {
        kind: "short_answer",
        text: "What is the answer to a rival with a lower cost base?",
        options: [],
        answer: 0,
        accept: ["a lower cost base", "a different market", "one of two things"],
        explain: "„a lower cost base or a different market.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u23-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 23,
    title: "Style and argument",
    genre: "info",
    intro: "Referandum broşürleri: cümleler ve bir değerlendirme kartı.",
    gloss: [
      { de: "rhetoric", tr: "retorik" },
      { de: "pathos", tr: "abartılı duygusallık" },
      { de: "a stylistic device", tr: "üslup aracı" },
      { de: "a line of argument", tr: "akıl yürütme" },
      { de: "a prevailing doctrine", tr: "yerleşik görüş" },
      { de: "a contentious issue", tr: "tartışmalı konu" },
      { de: "retired", tr: "emekli" },
      { de: "transport", tr: "ulaşım" },
      { de: "an engineer", tr: "mühendis" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Denemede retorik, broşürde abartılı duygusallık.",
        answer: "In the essay it is rhetoric; in the pamphlet, pathos.",
        hint: "İki soyut isim, ortada tanımlık yok.",
      },
      {
        kind: "build",
        tr: "Üslup aracı bir seçimdir; üslup kopukluğu bir hatadır.",
        answer: "A stylistic device is a choice; a break in style is a mistake.",
        hint: "Burada tanımlık var ve olmalı: iki sayılabilir şey.",
      },
      {
        kind: "build",
        tr: "Eleştirmenin edebî akım dediğine okur gelip geçici bir moda diyor.",
        answer: "What the critic calls a literary movement, the reader calls a passing fashion.",
        hint: "Biri yüz yazarın başından geçmiş, ötekini okur bir mevsimde unutuyor.",
      },
      {
        kind: "build",
        tr: "Akıl yürütmenin yaptığı şey bir akıl yürütme hatasını gizlemektir.",
        answer: "What the line of argument does is hide a flaw in reasoning.",
        hint: "Pürüzsüz olduğu için gizliyor.",
      },
      {
        kind: "build",
        tr: "Yerleşik görüşün arkasında bir düşünce okulu duruyor.",
        answer: "Behind the prevailing doctrine stands a school of thought.",
        hint: "Okulun arkasında da bir kurucu ve bir bölüm var.",
      },
      {
        kind: "form",
        prompt: "Referandum broşürleri için değerlendirme kartını doldur.",
        facts: "Denemenin yazarı emekli bir ulaşım mühendisi ve maliyet ile zamandan yola çıkıyor; broşür korkuyla ikna etmeye çalışıyor ve hiç sayı vermiyor; referandum kasımda.",
        fields: [
          { label: "Author of the essay", answer: "a retired engineer", accept: ["an engineer", "a transport engineer"] },
          { label: "The essay argues from", answer: "cost and time", accept: ["costs and time"] },
          { label: "The pamphlet relies on", answer: "fear", accept: ["emotion", "pathos"] },
          { label: "Date of the vote", answer: "November", accept: ["in November"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u23-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 23,
    title: "Bidding for a big project",
    genre: "info",
    intro: "İhalenin sessiz kaldığı yer ve strateji belgesinin göndermeleri.",
    gloss: [
      { de: "a bidding process", tr: "ihale süreci" },
      { de: "a consortium", tr: "konsorsiyum" },
      { de: "conflicting goals", tr: "hedef çatışması" },
      { de: "market penetration", tr: "pazara nüfuz" },
      { de: "competitiveness", tr: "rekabet gücü" },
      { de: "to undercut", tr: "fiyatın altına inmek" },
      { de: "leads to", tr: "yol açıyor" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "İhale süreci bir form olarak, onay süreci bir gecikme olarak sağ kalıyor.",
        answer: "The bidding process survives as a form, the permitting process as a delay.",
        hint: "İkinci yarıda fiil yok; iki usul iki ayrı biçimde sürüyor.",
      },
      {
        kind: "build",
        tr: "Konsorsiyum inşa ediyor; işletme modelini adlandırmıyor.",
        answer: "The consortium builds; the operating model, it does not name.",
        hint: "Nesne öne alınmış; adlandırılmayan şey başta duruyor.",
      },
      {
        kind: "build",
        tr: "Hedef çatışması kaldı; külfetli ifade kalmadı.",
        answer: "The conflicting goals stayed; the cumbersome wording did not.",
        hint: "İfade kesildi, çatışma ertesi sabah hâlâ oradaydı.",
      },
      {
        kind: "build",
        tr: "Yukarıda anlatılan pazara nüfuz, aşağıda ele alınan pazar doygunluğuna yol açıyor.",
        answer: "The market penetration described above leads to the market saturation discussed below.",
        hint: "Aynı sayı, iki bölüm, iki ad.",
      },
      {
        kind: "build",
        tr: "Rekabet gücümüz, daha önce belirtildiği gibi, bir tekel konumuna dayanıyor.",
        answer: "Our competitiveness, as noted earlier, rests on a monopoly position.",
        hint: "„As noted earlier“ daha önceki bir sayfa hakkında bir söz.",
      },
    ],
  },
];
