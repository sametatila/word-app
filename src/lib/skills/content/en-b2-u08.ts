import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 8 — "Denetlenmiş olsaydı, öyle görünüyor, manşet
 * okumak, kaynak göstermek".
 *
 * Dört ders: Had it been checked · It seems to have been ·
 * Reading a headline · Quoting a source.
 *
 *   Kelime: factor, variable, premise, inference, parameter, correlation,
 *           hypothesis, angle, calibrate, tighten, perspective, loosen,
 *           unlock, rotate, swing, motor, outlet, circulation, broadcast,
 *           readership, publication, feed, network, algorithm, reporter,
 *           quotation, attribution, publisher, paraphrase, intern,
 *           embargo, transparency.
 *   Kalıp:  If the factor had been known, we would have stopped. ·
 *           If the variable had been fixed, the result would be clear now. ·
 *           If the premise had been wrong, the inference would have failed. ·
 *           It seems to have been calibrated last month. ·
 *           Apparently the bolt was tightened twice. ·
 *           From one perspective it is arguably enough. ·
 *           It is claimed that the outlet was wrong. ·
 *           The figures are said to show a fall in circulation. ·
 *           The story is thought to have been broadcast twice. ·
 *           The reporter, who checked the quotation, was new. ·
 *           The attribution, which is why we waited, was unclear. ·
 *           The publisher to whom we wrote replied late.
 *
 * Ünitenin tek öğretme noktası „IF“SİZ KOŞUL: devrik sıra burada
 * olumsuzluk ya da sınırlama değil, KOŞUL işaretliyor. „Had the factor
 * been known, …“ — „if“ düşüyor, „had“ öznenin önüne geçiyor, anlam
 * değişmiyor. Yalnız üç fiil bunu yapabiliyor: „had“, „were“, „should“;
 * ve olumsuzun kısa biçimi yok, orada tam „if“ cümlesine dönülüyor.
 */
export const enB2U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u08-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 8,
    title: "Had it been checked",
    genre: "info",
    intro: "„if“ düşüyor, yerine ne geliyor?",
    gloss: [
      { de: "own", tr: "kendi" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "restriction", tr: "sınırlama" },
      { de: "auxiliary", tr: "yardımcı fiil" },
      { de: "verbs", tr: "fiiller" },
      { de: "whole", tr: "bütün" },
      { de: "sentence", tr: "cümle" },
      { de: "sounds", tr: "kulağa geliyor" },
      { de: "inverted", tr: "devrik" },
      { de: "plain", tr: "yalın" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "emphasis", tr: "vurgu" },
      { de: "replaces", tr: "yerini alıyor" },
      { de: "politest", tr: "en kibar" },
      { de: "a contract", tr: "sözleşme" },
      { de: "considered", tr: "tartılmış" },
      { de: "argued", tr: "savunulmuş" },
      { de: "a short form", tr: "kısa biçim" },
      { de: "suddenly", tr: "birden" },
      { de: "fight", tr: "karşı koymak" },
      { de: "marking", tr: "işaretleyen" },
      { de: "discussed", tr: "ele alınan" },
      { de: "happens to", tr: "olur da" },
    ],
    minutes: 9,
    text:
      "If the factor had been known, we would have stopped. Now take the „if“ away and see what has to happen instead.\n" +
      "Had the factor been known, we would have stopped. „Had“ has moved to the front, in front of its own subject, and the conjunction has gone. Nothing else changed, and the meaning is exactly the same.\n" +
      "This is inversion doing a second job. Here it is not marking a negative or a restriction; it is marking a condition, and it is the one place in English where moving the auxiliary replaces a word rather than adding emphasis.\n" +
      "Three verbs can do it and no others: „had“, „were“ and „should“. Had the variable been fixed, the result would be clear now. Were the premise wrong, the inference would fail. Should the parameter change, we will run it again.\n" +
      "That last one is worth a second look, because „should“ here does not mean obligation at all. It means „if it happens to“, and it is the politest way English has of writing a condition into a contract.\n" +
      "The register is formal and that is the whole of its use. A report uses it once, usually in the paragraph where the correlation is discussed, and the effect is that the sentence sounds considered rather than argued.\n" +
      "There is one thing it cannot do. There is no negative short form: „hadn't the factor been known“ is not written. The negative goes back to the full „if“ version, and a writer who has used the inverted shape three times will suddenly need the plain one and should not fight it.",
    questions: [
      {
        text: "What is the inversion marking here?",
        options: ["a condition", "a negative", "a restriction"],
        answer: 0,
        explain: "„it is marking a condition…“",
      },
      {
        text: "What does „should“ mean in that sentence?",
        options: ["if it happens to", "it is an order", "it is advised"],
        answer: 0,
        explain: "„It means „if it happens to“…“",
      },
      {
        kind: "truefalse",
        text: "There is a negative short form.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is no negative short form: „hadn't the factor been known“ is not written.“",
      },
      {
        kind: "gapfill",
        text: "___ the factor been known, we would have stopped.",
        options: [],
        answer: 0,
        accept: ["Had", "had"],
        explain: "„Had the factor been known, we would have stopped.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Had the variable been fixed, the result would be clear now.",
          "Were the premise wrong, the inference would fail.",
          "Should the parameter change, we will run it again.",
          "There is no negative short form.",
        ],
        explain: "„had“, „were“, „should“, en sonda sınırın kendisi.",
      },
      {
        kind: "short_answer",
        text: "How often does a report use it?",
        options: [],
        answer: 0,
        accept: ["once", "one time", "just once"],
        explain: "„A report uses it once…“",
      },
    ],
  },
  {
    id: "en-b2-u08-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 8,
    title: "Reading a headline",
    genre: "opinion",
    intro: "Üç manşet. Üçüncüsü ötekilerden nerede ayrılıyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "tense", tr: "zaman kipi" },
      { de: "own", tr: "kendi" },
      { de: "sentence", tr: "cümle" },
      { de: "large", tr: "büyük" },
      { de: "quite", tr: "tam olarak" },
      { de: "owning", tr: "sahiplenmek" },
      { de: "an infinitive", tr: "mastar" },
      { de: "a great deal", tr: "hayli çok" },
      { de: "in a hurry", tr: "acele eden" },
      { de: "entirely", tr: "tümüyle" },
      { de: "machinery", tr: "düzenek" },
      { de: "the route", tr: "yol" },
      { de: "a newsroom", tr: "haber merkezi" },
      { de: "a defence", tr: "savunma" },
      { de: "unverified", tr: "doğrulanmamış" },
      { de: "a failure mode", tr: "bozulma biçimi" },
      { de: "asserted", tr: "ileri sürülmüş" },
      { de: "empty", tr: "boş" },
    ],
    minutes: 9,
    text:
      "It is claimed that the outlet was wrong. The figures are said to show a fall in circulation. The story is thought to have been broadcast twice. Three headlines, three ways of reporting something without owning it, and the third one is different from the other two.\n" +
      "Look at the verb after „to“. „To show“ is about now. „To have been broadcast“ is about before — before the thinking, not before this morning. The infinitive is carrying a tense of its own, and that is the only thing in the sentence that tells you the broadcasting is already finished.\n" +
      "That is a great deal of work for two words, and a reader in a hurry misses it. „The story is thought to be broadcast twice“ would say something else entirely and would still look like a sentence.\n" +
      "The rest is the usual machinery. „It is claimed that“ is the long route; „are said to“ is the short one; both hide the person doing the claiming and the saying.\n" +
      "In a newsroom that hiding has a name and a defence. The source may be under an embargo, the readership is large, and a publication that puts a name on an unverified line has made a claim rather than reported one.\n" +
      "It also has a failure mode. A feed that carries fifty of these a day teaches its network of readers that nothing on it is ever quite asserted, and the algorithm cannot tell the difference between a careful sentence and an empty one.",
    questions: [
      {
        text: "What does „to have been broadcast“ tell you?",
        options: ["the broadcasting is finished", "it will happen", "it happens now"],
        answer: 0,
        explain: "„that is the only thing in the sentence that tells you the broadcasting is already finished.“",
      },
      {
        text: "Which is the long route?",
        options: ["It is claimed that", "are said to", "is thought to"],
        answer: 0,
        explain: "„„It is claimed that“ is the long route…“",
      },
      {
        kind: "truefalse",
        text: "The algorithm can tell a careful sentence from an empty one.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the algorithm cannot tell the difference between a careful sentence and an empty one.“",
      },
      {
        kind: "gapfill",
        text: "The story is thought to have been ___ twice.",
        options: [],
        answer: 0,
        accept: ["broadcast"],
        explain: "„The story is thought to have been broadcast twice.“",
      },
      {
        kind: "order",
        text: "Manşetlerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It is claimed that the outlet was wrong.",
          "The figures are said to show a fall in circulation.",
          "The story is thought to have been broadcast twice.",
          "The infinitive is carrying a tense of its own.",
        ],
        explain: "Uzun yol, kısa yol, geçmişe bakan mastar, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "What does a name on an unverified line make it?",
        options: [],
        answer: 0,
        accept: ["a claim", "a claim not a report", "their own claim"],
        explain: "„has made a claim rather than reported one.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u08-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 8,
    title: "It seems to have been",
    genre: "dialogue",
    intro: "İki sözcük işi geriye taşıyor. Hangileri?",
    gloss: [
      { de: "log", tr: "kayıt" },
      { de: "sentence", tr: "cümle" },
      { de: "own", tr: "kendi" },
      { de: "whole", tr: "bütün" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "per", tr: "başına" },
      { de: "confidence", tr: "güven derecesi" },
      { de: "a photocopy", tr: "fotokopi" },
      { de: "a state", tr: "durum" },
      { de: "a syllable", tr: "hece" },
      { de: "cheaper", tr: "daha ucuz" },
      { de: "a hedge", tr: "çekince" },
      { de: "a standpoint", tr: "duruş noktası" },
      { de: "lowers", tr: "indiriyor" },
      { de: "the volume", tr: "ses düzeyi" },
      { de: "noise", tr: "gürültü" },
      { de: "care", tr: "özen" },
      { de: "earlier", tr: "daha önce" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Nehir", text: "It seems to have been calibrated last month. That is as far as I will go on the paper." },
      { speaker: "Efe", text: "Why not „it was calibrated last month“?" },
      { speaker: "Nehir", text: "Because I did not see it happen and the log is a photocopy. „Seems“ puts my confidence in the sentence, and „to have been“ puts the calibrating before it." },
      { speaker: "Efe", text: "The two words after „to“ do that on their own?" },
      { speaker: "Nehir", text: "On their own. „It seems to be calibrated“ would mean the state is right now. „It seems to have been calibrated“ means somebody did it, earlier, and I am reading the result." },
      { speaker: "Efe", text: "Apparently the bolt was tightened twice." },
      { speaker: "Nehir", text: "That is the same move with a different word. „Apparently“ reports and steps back in one syllable, and it is cheaper than a whole clause." },
      { speaker: "Efe", text: "And the motor?" },
      { speaker: "Nehir", text: "From one perspective it is arguably enough. Two hedges in one sentence, which is one too many, and I will take one out before it goes anywhere." },
      { speaker: "Efe", text: "Which one?" },
      { speaker: "Nehir", text: "„Arguably“. „From one perspective“ names the standpoint, which is information. „Arguably“ names nothing; it only lowers the volume." },
      { speaker: "Efe", text: "So the rule." },
      { speaker: "Nehir", text: "One hedge per sentence, and it has to be the one that carries information. The rest are noise that reads like care." },
    ],
    questions: [
      {
        text: "What does „to have been“ do?",
        options: ["puts the calibrating before", "names the source", "asks a question"],
        answer: 0,
        explain: "„„to have been“ puts the calibrating before it.“",
      },
      {
        text: "Which hedge does Nehir remove?",
        options: ["arguably", "from one perspective", "seems"],
        answer: 0,
        explain: "„„Arguably“. „From one perspective“ names the standpoint, which is information.“",
      },
      {
        kind: "truefalse",
        text: "Nehir saw the calibrating happen.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Because I did not see it happen and the log is a photocopy.“",
      },
      {
        kind: "gapfill",
        text: "Apparently the bolt was tightened ___.",
        options: [],
        answer: 0,
        accept: ["twice", "two times"],
        explain: "„Apparently the bolt was tightened twice.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It seems to have been calibrated last month.", "It seems to have been calibrated last month"],
        explain: "Mastarın kendi zamanı var: iş görünmeden önce olmuş.",
      },
      {
        kind: "short_answer",
        text: "How many hedges per sentence?",
        options: [],
        answer: 0,
        accept: ["one", "one per sentence", "just one"],
        explain: "„One hedge per sentence…“",
      },
    ],
  },
  {
    id: "en-b2-u08-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 8,
    title: "Quoting a source",
    genre: "monologue",
    intro: "Aynı paragrafta iki tür ilgi cümlesi. Ayıran ne?",
    gloss: [
      { de: "commas", tr: "virgüller" },
      { de: "sentence", tr: "cümle" },
      { de: "reaches", tr: "ulaşıyor" },
      { de: "whole", tr: "bütün" },
      { de: "comma", tr: "virgül" },
      { de: "dividing", tr: "bölen" },
      { de: "a trade", tr: "meslek" },
      { de: "punctuation", tr: "noktalama" },
      { de: "a mark", tr: "işaret" },
      { de: "a full stop", tr: "nokta" },
      { de: "keeping them straight", tr: "ayrı tutan" },
      { de: "dislike", tr: "hoşlanmamak" },
      { de: "the piece", tr: "yazı" },
      { de: "print", tr: "basmak" },
      { de: "apart", tr: "arayla" },
      { de: "describing", tr: "betimleyen" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Beren", text: "The reporter, who checked the quotation, was new. Two commas, so the clause is not choosing a reporter out of several; there is one and this is a fact about her." },
      { speaker: "Beren", text: "Without the commas the sentence would be saying that some of the reporters did not check, which is a very different line to print." },
      { speaker: "Beren", text: "The attribution, which is why we waited, was unclear. „Which“ reaches back to the whole of the first half, and „that“ cannot do that job at all." },
      { speaker: "Beren", text: "The publisher to whom we wrote replied late. Nobody says this. In speech it is „the publisher we wrote to“, and the choice between them is about the page, not about the grammar." },
      { speaker: "Beren", text: "Transparency in this trade is mostly punctuation. A comma decides whether we are describing one person or dividing a group, and a reader never notices the comma, only the meaning it made." },
      { speaker: "Beren", text: "The intern who found the second quotation is not named in the piece, which is normal and which I dislike." },
      { speaker: "Beren", text: "That sentence has no commas around „who found the second quotation“, and it should not: there are four interns and I mean one of them." },
      { speaker: "Beren", text: "So the same paragraph holds both kinds, three lines apart, and the only thing keeping them straight is a mark the size of a full stop." },
    ],
    questions: [
      {
        text: "How many reporters are there?",
        options: ["one", "several", "four"],
        answer: 0,
        explain: "„there is one and this is a fact about her.“",
      },
      {
        text: "Why does the intern clause take no commas?",
        options: ["there are four interns", "the intern is new", "it is speech"],
        answer: 0,
        explain: "„there are four interns and I mean one of them.“",
      },
      {
        kind: "truefalse",
        text: "Readers notice the comma.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a reader never notices the comma, only the meaning it made.“",
      },
      {
        kind: "gapfill",
        text: "The publisher to ___ we wrote replied late.",
        options: [],
        answer: 0,
        accept: ["whom"],
        explain: "„The publisher to whom we wrote replied late.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The reporter, who checked the quotation, was new.", "The reporter, who checked the quotation, was new"],
        explain: "Virgüller cümleciği fazladan yapıyor; tek bir muhabir var.",
      },
      {
        kind: "short_answer",
        text: "What is transparency mostly?",
        options: [],
        answer: 0,
        accept: ["punctuation", "mostly punctuation", "a comma"],
        explain: "„Transparency in this trade is mostly punctuation.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u08-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 8,
    title: "Had the factor been known, we would have stopped",
    genre: "info",
    intro: "„if“siz koşul ve mastarın kendi zamanı.",
    gloss: [
      { de: "had the factor been known", tr: "etken bilinseydi" },
      { de: "had the variable been fixed", tr: "değişken sabitlenseydi" },
      { de: "would have failed", tr: "çökerdi" },
      { de: "to have been calibrated", tr: "ayarlanmış" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Etken bilinseydi dururduk.",
        answer: "Had the factor been known, we would have stopped.",
        hint: "„if“ düşüyor, „had“ öznenin önüne geçiyor.",
      },
      {
        kind: "build",
        tr: "Değişken sabitlenseydi sonuç şimdi açık olurdu.",
        answer: "Had the variable been fixed, the result would be clear now.",
        hint: "Karışık koşul, üstelik „if“siz.",
      },
      {
        kind: "build",
        tr: "Öncül yanlış olsaydı çıkarım çökerdi.",
        answer: "If the premise had been wrong, the inference would have failed.",
        hint: "Tam biçim; kısa biçimin olumsuzu yok.",
      },
      {
        kind: "build",
        tr: "Geçen ay ayarlanmış görünüyor.",
        answer: "It seems to have been calibrated last month.",
        hint: "Mastarın kendi zamanı var: „to have been“.",
      },
      {
        kind: "form",
        prompt: "Koşul kartını doldur.",
        facts: "„if“ düşünce „had“ öne geçiyor; üç fiil bunu yapabiliyor; olumsuzun kısa biçimi yok; dil düzeyi resmî.",
        fields: [
          { label: "Without „if“", answer: "had the factor been known", accept: ["had"] },
          { label: "Three verbs", answer: "had, were, should", accept: ["had were should"] },
          { label: "Negative", answer: "no short form", accept: ["use „if“"] },
          { label: "Register", answer: "formal", accept: ["a report"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u08-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 8,
    title: "It seems to have been calibrated last month",
    genre: "info",
    intro: "Kaynağı söylemeyen üç manşet ve bir çekince.",
    gloss: [
      { de: "apparently", tr: "görünüşe göre" },
      { de: "it is claimed that", tr: "ileri sürülüyor ki" },
      { de: "are said to show", tr: "gösterdiği söyleniyor" },
      { de: "to have been broadcast", tr: "yayımlandığı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Cıvatanın iki kez sıkıldığı anlaşılıyor.",
        answer: "Apparently the bolt was tightened twice.",
        hint: "Bildiriyor ve aynı anda geri çekiliyor.",
      },
      {
        kind: "build",
        tr: "Yayın organının yanıldığı ileri sürülüyor.",
        answer: "It is claimed that the outlet was wrong.",
        hint: "Uzun yol: „it“ özne, rapor „that“ cümleciğinde.",
      },
      {
        kind: "build",
        tr: "Rakamların tirajda bir düşüş gösterdiği söyleniyor.",
        answer: "The figures are said to show a fall in circulation.",
        hint: "Kısa yol: özne öne çıkıyor, mastar geriye kalıyor.",
      },
      {
        kind: "build",
        tr: "Haberin iki kez yayımlandığı düşünülüyor.",
        answer: "The story is thought to have been broadcast twice.",
        hint: "Mastar geçmişe bakıyor: iş düşünmeden önce olmuş.",
      },
      {
        kind: "build",
        tr: "Alıntıyı denetleyen muhabir yeniydi.",
        answer: "The reporter, who checked the quotation, was new.",
        hint: "Virgüller cümleciği fazladan yapıyor.",
      },
    ],
  },
];
