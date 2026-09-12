import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 23 — "Bir strateji belgesini bir arada tutmak, ihalenin
 * söylemedikleri, tek bir iddianın üç kaydı, savın sırası".
 *
 * Dört ders: Holding a strategy paper together · What the tender leaves unsaid ·
 * Three registers of one claim · The order of the argument.
 *
 *   Kelime: market penetration, market saturation, competitiveness, monopoly
 *           position, undercut, price fixing, tender procedure, approval
 *           procedure, consortium, operator model, conflict of goals,
 *           cumbersome, rhetoric, pathos, stylistic device, stylistic break,
 *           line of argument, flaw in reasoning, prevailing doctrine,
 *           school of thought, contentious issue, expert debate.
 *   Kalıp:  The market penetration above becomes market saturation below. ·
 *           That competitiveness, as noted, is the monopoly position of an earlier page. ·
 *           Where a rival can undercut us, no price fixing helps. ·
 *           The tender procedure survives as a form, the approval procedure as a delay. ·
 *           The consortium builds; the operator model, it does not name. ·
 *           The conflict of goals stayed; the cumbersome wording did not. ·
 *           In the essay it is rhetoric; in the pamphlet, pathos. ·
 *           A stylistic device is a choice; a stylistic break is a mistake. ·
 *           What the critic calls a stylistic movement, the reader calls a stylistic level. ·
 *           What the line of argument does is hide a flaw in reasoning. ·
 *           Behind the prevailing doctrine stands a school of thought. ·
 *           The contentious issue we name; the expert debate we do not.
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
    title: "Three registers of one claim",
    genre: "info",
    intro: "İki soyut isim ve ortada tanımlık yok. Ne zaman geri geliyor?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "noun", tr: "isim" },
      { de: "pair", tr: "çift" },
      { de: "abstract", tr: "soyut" },
      { de: "in sight", tr: "ortada" },
      { de: "bare", tr: "çıplak" },
      { de: "generally", tr: "genel anlamda" },
      { de: "doubt", tr: "kuşku" },
      { de: "freedom", tr: "özgürlük" },
      { de: "as such", tr: "kendisi olarak" },
      { de: "supplies", tr: "ekliyor" },
      { de: "translated", tr: "çevrilmiş" },
      { de: "narrows", tr: "daraltıyor" },
      { de: "a particular one", tr: "belirli bir tanesi" },
      { de: "the narrowing", tr: "daraltma" },
      { de: "the whole phrase", tr: "bütün öbek" },
      { de: "in both directions", tr: "iki yönde birden" },
      { de: "countable", tr: "sayılabilir" },
      { de: "side by side", tr: "yan yana" },
      { de: "in general", tr: "genel olarak" },
      { de: "the owners", tr: "sahipler" },
      { de: "a critic", tr: "eleştirmen" },
      { de: "competing", tr: "yarışan" },
      { de: "the same object", tr: "aynı nesne" },
      { de: "the thread", tr: "ip" },
      { de: "a paper", tr: "makale" },
      { de: "a hundred writers", tr: "yüz yazar" },
    ],
    minutes: 12,
    text:
      "In the essay it is rhetoric; in the pamphlet, pathos. Two abstract nouns and not an article in sight, and that is the lesson.\n" +
      "English uses an abstract noun bare when it is meant generally. Rhetoric, pathos, competitiveness, doubt, freedom, work: nothing in front of them at all, and the sentence is about the thing as such.\n" +
      "A neighbouring language puts an article in front of every one of them and keeps it there. So a speaker coming from that side supplies an article English does not want, and the result is a sentence nobody can point at as wrong which nevertheless reads as translated.\n" +
      "And now the part that makes this a lesson for this level rather than a rule for a first year. The article comes back the moment something narrows the noun. The rhetoric of the pamphlet. The doubt that stopped the project. The competitiveness we lost in one bad decade. A bare noun is the general thing; an article is a signal that a particular one is meant, and the narrowing usually sits in the words after the noun rather than before it.\n" +
      "So the rule is not that abstract nouns take no article. It is: no article until something narrows it. That is a rule about the whole phrase, and a writer who learns it as a rule about the noun alone will get it wrong in both directions.\n" +
      "A stylistic device is a choice; a stylistic break is a mistake. Here both nouns have an article and they should: these are two countable things put side by side, and the sentence is not about devices in general.\n" +
      "What the critic calls a stylistic movement, the reader calls a stylistic level. One more pair with the owners attached. A movement is a thing that happened to a hundred writers; a level is a thing a reader hears on one page.\n" +
      "The two are not competing descriptions of the same object, and a paper that treats them as competing has lost the thread inside its own first paragraph.",
    questions: [
      {
        text: "When is an abstract noun bare?",
        options: ["when it is meant generally", "when it is countable", "when it is narrowed"],
        answer: 0,
        explain: "„English uses an abstract noun bare when it is meant generally.“",
      },
      {
        text: "Where does the narrowing usually sit?",
        options: ["after the noun", "before the noun", "in the verb"],
        answer: 0,
        explain: "„the narrowing usually sits in the words after the noun rather than before it.“",
      },
      {
        kind: "truefalse",
        text: "The rule is that abstract nouns take no article.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the rule is not that abstract nouns take no article.“",
      },
      {
        kind: "gapfill",
        text: "A stylistic device is a choice; a stylistic break is a ___.",
        options: [],
        answer: 0,
        accept: ["mistake"],
        explain: "„A stylistic device is a choice; a stylistic break is a mistake.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "In the essay it is rhetoric; in the pamphlet, pathos.",
          "The article comes back when something narrows the noun.",
          "No article until something narrows it.",
          "A stylistic device is a choice; a stylistic break is a mistake.",
        ],
        explain: "Çıplak isim, daraltma, kural; en sonda tanımlıklı çift.",
      },
      {
        kind: "short_answer",
        text: "What is a level?",
        options: [],
        answer: 0,
        accept: ["what a reader hears", "heard on one page", "a thing on one page"],
        explain: "„a level is a thing a reader hears on one page.“",
      },
    ],
  },
  {
    id: "en-c1-u23-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 23,
    title: "What the tender leaves unsaid",
    genre: "opinion",
    intro: "İhale bir form olarak, onay bir gecikme olarak sürüyor. Hangisi kimin?",
    gloss: [
      { de: "afterlives", tr: "sonraki hayatlar" },
      { de: "object", tr: "nesne" },
      { de: "pronoun", tr: "adıl" },
      { de: "unnamed", tr: "adı verilmemiş" },
      { de: "discovers", tr: "keşfediyor" },
      { de: "builder", tr: "yapan" },
      { de: "negotiation", tr: "pazarlık" },
      { de: "anywhere", tr: "başka yerde" },
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
      { de: "afterwards", tr: "sonrasında" },
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
      "The tender procedure survives as a form, the approval procedure as a delay. Two procedures, two afterlives, and the second half of the line has no verb because it does not need one.\n" +
      "A form is a thing somebody fills in. A delay is a thing that happens to somebody, and the difference between those two is the difference between a week of work and a year of waiting at a desk that is not yours.\n" +
      "The consortium builds; the operator model, it does not name. Here the object has been fronted and the subject is a pronoun, and the shape puts the unnamed thing at the front of the sentence where a reader cannot walk past it.\n" +
      "That is the whole finding of this lesson. A tender says who builds and is quiet about who runs it afterwards, and running it is thirty years of the thirty-two.\n" +
      "The consequence is not a scandal. It is a repair that nobody budgeted: a decade in, somebody discovers that the contract names a builder and a payer and no operator, and the negotiation that follows happens with no competition in the room at all.\n" +
      "The conflict of goals stayed; the cumbersome wording did not. And this is the sentence I would put on the front of any tender file.\n" +
      "The wording was cut because a lawyer read it and found it heavy. The conflict it described was still there the next morning, and now it was not written down anywhere, which made the document shorter and the project longer.\n" +
      "A page that names a conflict is not a weak page. It is the only page that will be read in the year the conflict arrives, and a signature under a clear description of a problem is worth more than a signature under a smooth last line.",
    questions: [
      {
        text: "What is a delay?",
        options: ["a thing that happens to somebody", "a thing somebody fills in", "a form"],
        answer: 0,
        explain: "„A delay is a thing that happens to somebody…“",
      },
      {
        text: "What is a tender quiet about?",
        options: ["who runs it afterwards", "who builds", "who pays"],
        answer: 0,
        explain: "„A tender says who builds and is quiet about who runs it afterwards…“",
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
        text: "The conflict of goals stayed; the cumbersome wording did ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The conflict of goals stayed; the cumbersome wording did not.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The tender procedure survives as a form, the approval procedure as a delay.",
          "The consortium builds; the operator model, it does not name.",
          "The conflict of goals stayed; the cumbersome wording did not.",
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
    title: "The order of the argument",
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
      { de: "a doctrine", tr: "yerleşik görüş" },
      { de: "a school", tr: "okul" },
      { de: "a founder", tr: "kurucu" },
      { de: "an issue", tr: "konu" },
      { de: "a debate", tr: "tartışma" },
      { de: "a colleague", tr: "meslektaş" },
      { de: "a conference", tr: "konferans" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Işıl", text: "What the line of argument does is hide a flaw in reasoning. A shape we know, and here it is doing something worth watching." },
      { speaker: "Efe", text: "How does an argument hide a flaw?" },
      { speaker: "Işıl", text: "By being smooth. A reader follows four good steps and takes the fifth on trust, and the fifth is the one that was never shown." },
      { speaker: "Efe", text: "So the better the writing, the worse the risk." },
      { speaker: "Işıl", text: "The better the writing, the later the reader notices. That is not an argument for bad writing; it is an argument for reading the steps out of order." },
      { speaker: "Efe", text: "Behind the prevailing doctrine stands a school of thought." },
      { speaker: "Işıl", text: "And behind the school stands a founder, three students and one department that had money in a particular decade." },
      { speaker: "Efe", text: "That sounds unkind." },
      { speaker: "Işıl", text: "It is only unkind if you think ideas travel on their own. They travel in people, and people need a post and a room and somebody to publish them." },
      { speaker: "Efe", text: "The contentious issue we name; the expert debate we do not." },
      { speaker: "Işıl", text: "That is the line I would want a student to understand before a conference. The issue is public and the debate is a set of names, and only one of the two is in the papers." },
      { speaker: "Efe", text: "Why does that matter?" },
      { speaker: "Işıl", text: "Because a colleague who reads your paper knows both, and a sentence that names the issue while carefully not naming the debate is read as a position on it." },
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
        text: "Ideas travel on their own.",
        options: ["True", "False"],
        answer: 1,
        explain: "„They travel in people…“",
      },
      {
        kind: "gapfill",
        text: "The contentious issue we name; the expert debate we do ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„The contentious issue we name; the expert debate we do not.“",
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
    title: "Holding a strategy paper together",
    genre: "monologue",
    intro: "Pazara nüfuz aşağıda doygunluğa dönüyor. Gönderme neyi kurtarıyor?",
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
      { de: "illegal", tr: "yasadışı" },
      { de: "a fine", tr: "para cezası" },
      { de: "a cost base", tr: "maliyet tabanı" },
      { de: "a factory", tr: "fabrika" },
      { de: "an answer", tr: "cevap" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Cenk", text: "The market penetration above becomes market saturation below. One number in chapter two and the same number in chapter six, under two names." },
      { speaker: "Cenk", text: "Penetration is a share that is still growing. Saturation is the same share when the growth has stopped, and nothing about the number itself tells you which you are looking at." },
      { speaker: "Cenk", text: "Only the second reading has a ceiling in it, and the whole strategy in that paper depends on which of the two chapters the reader believes." },
      { speaker: "Cenk", text: "That competitiveness, as noted, is the monopoly position of an earlier page. „As noted“ again, and again I check it." },
      { speaker: "Cenk", text: "When it is true, the sentence is honest and useful: it tells the reader that a word has changed its colour between two chapters." },
      { speaker: "Cenk", text: "When it is not true, a claim that nobody has made yet is being carried into the reader as a reminder of something they already agreed to." },
      { speaker: "Cenk", text: "Where a rival can undercut us, no price fixing helps. This is the line I would keep out of any paper that leaves the building." },
      { speaker: "Cenk", text: "It is true and it is also a sentence about a cartel, and a cartel is illegal, and the fine is calculated on turnover rather than on profit." },
      { speaker: "Cenk", text: "The answer to a rival with a lower cost base is a lower cost base or a different market. There is no third answer and there has never been one." },
      { speaker: "Cenk", text: "Write that down instead. It is shorter, it is legal, and it is the only sentence in the file that a factory can act on." },
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
        options: ["turnover", "profit", "the share"],
        answer: 0,
        explain: "„the fine is calculated on turnover rather than on profit.“",
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
        accept: ["The market penetration above becomes market saturation below.", "The market penetration above becomes market saturation below"],
        explain: "İki edat nesnesiz kalmış; gönderme katmanı.",
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
    title: "In the essay it is rhetoric; in the pamphlet, pathos",
    genre: "info",
    intro: "Çıplak soyut isim ve savın gizlediği hata.",
    gloss: [
      { de: "bare", tr: "yalın" },
      { de: "noun", tr: "isim" },
      { de: "rhetoric", tr: "retorik" },
      { de: "pathos", tr: "abartılı duygusallık" },
      { de: "a stylistic device", tr: "üslup aracı" },
      { de: "a line of argument", tr: "akıl yürütme" },
      { de: "a prevailing doctrine", tr: "yerleşik görüş" },
      { de: "a contentious issue", tr: "tartışmalı konu" },
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
        answer: "A stylistic device is a choice; a stylistic break is a mistake.",
        hint: "Burada tanımlık var ve olmalı: iki sayılabilir şey.",
      },
      {
        kind: "build",
        tr: "Eleştirmenin üslup akımı dediğine okur üslup düzeyi diyor.",
        answer: "What the critic calls a stylistic movement, the reader calls a stylistic level.",
        hint: "Biri yüz yazara olmuş, öteki tek sayfada duyuluyor.",
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
        prompt: "Tanımlık kartını doldur.",
        facts: "Genel anlamda soyut isim çıplak; daraltan bir şey gelince tanımlık dönüyor; daraltma çoğunlukla ismin ardında; kural ismin değil öbeğin kuralı.",
        fields: [
          { label: "Meant generally", answer: "no article", accept: ["bare"] },
          { label: "When narrowed", answer: "the article returns", accept: ["an article"] },
          { label: "Where the narrowing sits", answer: "after the noun", accept: ["behind it"] },
          { label: "The rule is about", answer: "the whole phrase", accept: ["the phrase"] },
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
    title: "The consortium builds; the operator model, it does not name",
    genre: "info",
    intro: "İhalenin sessiz kaldığı yer ve strateji belgesinin göndermeleri.",
    gloss: [
      { de: "a tender procedure", tr: "ihale süreci" },
      { de: "a consortium", tr: "konsorsiyum" },
      { de: "a conflict of goals", tr: "hedef çatışması" },
      { de: "market penetration", tr: "pazara nüfuz" },
      { de: "competitiveness", tr: "rekabet gücü" },
      { de: "to undercut", tr: "fiyatın altına inmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "İhale süreci bir form olarak, onay süreci bir gecikme olarak sağ kalıyor.",
        answer: "The tender procedure survives as a form, the approval procedure as a delay.",
        hint: "İkinci yarıda fiil yok; iki usul iki ayrı biçimde sürüyor.",
      },
      {
        kind: "build",
        tr: "Konsorsiyum inşa ediyor; işletme modelini adlandırmıyor.",
        answer: "The consortium builds; the operator model, it does not name.",
        hint: "Nesne öne alınmış; adlandırılmayan şey başta duruyor.",
      },
      {
        kind: "build",
        tr: "Hedef çatışması kaldı; külfetli ifade kalmadı.",
        answer: "The conflict of goals stayed; the cumbersome wording did not.",
        hint: "İfade kesildi, çatışma ertesi sabah hâlâ oradaydı.",
      },
      {
        kind: "build",
        tr: "Yukarıdaki pazara nüfuz aşağıda pazar doygunluğuna dönüşüyor.",
        answer: "The market penetration above becomes market saturation below.",
        hint: "Aynı sayı, iki bölüm, iki ad.",
      },
      {
        kind: "build",
        tr: "O rekabet gücü, belirtildiği gibi, önceki bir sayfanın tekel konumudur.",
        answer: "That competitiveness, as noted, is the monopoly position of an earlier page.",
        hint: "„As noted“ önceki bir sayfa hakkında bir söz.",
      },
    ],
  },
];
