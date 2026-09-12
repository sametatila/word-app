import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 3 — "Tam da ucuz değil, metni bir arada tutmak,
 * kopmadan ayrışmak, karşı tarafı alıntılamak".
 *
 * Dört ders: Not exactly cheap · Holding the text together ·
 * Dissent without rupture · Quoting the opponent.
 *
 *   Kelime: patronizing, hypocritical, reprehensible, trivialize,
 *           dramatize, disparage, superficiality, proximity, composure,
 *           unease, imposition, arbitrariness, profound, meticulous,
 *           leeway, snag, viable, irreversible, ascertain, avert, thwart,
 *           diminish, postulate, refute, substantiate, manifesto,
 *           ideology, falsify, doctrine, dialectic.
 *   Kalıp:  Not exactly cheap, that one. ·
 *           I wouldn't say no to a less patronizing tone. ·
 *           Hardly self-righteous, is it? ·
 *           This alone explains the proximity. ·
 *           Such composure is rare. ·
 *           The latter reading leaves an unease. ·
 *           Granted, there is little leeway, albeit some. ·
 *           Much as I see the snag, the plan stays viable. ·
 *           The step is irreversible, whereas the delay is not. ·
 *           She postulates it; he refutes it; they substantiate it. ·
 *           The manifesto claims what the ideology assumes. ·
 *           To report a claim is not to falsify it.
 *
 * Ünitenin tek öğretme noktası OLUMSUZLA SÖYLENEN OLUMLU (litotes).
 * „Not exactly cheap“ pahalı demek; „I wouldn't say no“ evet demek;
 * „Hardly self-righteous“ ise hem „hiç değil“ hem de ters okumayla
 * „epeyce“ olabiliyor — ve bunu ayıran şey ton değil, bağlam. „Hardly“
 * ayrıca kendi olumsuzunu taşıyor: yanına ikinci bir „not“ gelmiyor.
 */
export const enC1U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u03-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 3,
    title: "Not exactly cheap",
    genre: "opinion",
    intro: "Olumsuzla söylenen olumlu. Okur nasıl çözüyor?",
    gloss: [
      { de: "large", tr: "büyük" },
      { de: "deniability", tr: "inkâr payı" },
      { de: "whole", tr: "bütün" },
      { de: "sake", tr: "hatır" },
      { de: "understated", tr: "eksiltili" },
      { de: "itself", tr: "kendisi" },
      { de: "trap", tr: "tuzak" },
      { de: "below", tr: "altında" },
      { de: "entirely", tr: "tümüyle" },
      { de: "tag", tr: "soru eki" },
      { de: "judgement", tr: "yargı" },
      { de: "resolves", tr: "çözüyor" },
      { de: "backwards", tr: "tersinden" },
      { de: "understatement", tr: "eksiltili söyleyiş" },
      { de: "the opposite", tr: "tersi" },
      { de: "politeness", tr: "nezaket" },
      { de: "an insult", tr: "hakaret" },
      { de: "a compliment", tr: "iltifat" },
      { de: "carries", tr: "taşıyor" },
      { de: "doubled", tr: "ikiye katlanmış" },
      { de: "context", tr: "bağlam" },
      { de: "reverses", tr: "tersine çeviriyor" },
      { de: "blunt", tr: "dobra" },
      { de: "deniable", tr: "inkâr edilebilir" },
      { de: "a room", tr: "oda" },
    ],
    minutes: 11,
    text:
      "Not exactly cheap, that one. Nobody in the room thinks the price was reasonable, and nobody has said that it was not.\n" +
      "This is understatement, and English uses it far more than a learner expects. „Not exactly cheap“ means expensive. „I wouldn't say no to a less patronizing tone“ means the tone was patronizing and please change it. „No small matter“ means a large one.\n" +
      "The shape is always the same: a negative in front of a word that means the opposite of what is meant. And the effect is always the same too — the claim is made and it is left deniable, so the room can move on without anybody having to answer it.\n" +
      "That deniability is the whole point and it is not politeness for its own sake. A blunt version of the first sentence would require a reply. The understated one is a remark, and a remark can be heard and not taken up.\n" +
      "Hardly self-righteous, is it? Here the device is doubled, because „hardly“ is itself a negative. It carries its own „not“, and a second one cannot be added: „hardly not self-righteous“ is nothing. That is the same trap as „by no means“ and „unless“, two levels below.\n" +
      "What „hardly self-righteous“ means depends entirely on context, and this is where the device gets difficult. Said of a modest person it is a compliment. Said with a tag question after a speech full of judgement, it reverses and becomes an insult, and nothing in the words tells you which.\n" +
      "The reader resolves it from what came before. So understatement is the one figure in this course that cannot be taught from the sentence alone, and the only way to use it safely is to be sure the sentence before has done enough work for the reader to read this one backwards.",
    questions: [
      {
        text: "What does „not exactly cheap“ mean?",
        options: ["expensive", "reasonable", "free"],
        answer: 0,
        explain: "„„Not exactly cheap“ means expensive.“",
      },
      {
        text: "Why is the claim left deniable?",
        options: ["so it need not be answered", "to be polite only", "to make it shorter"],
        answer: 0,
        explain: "„the claim is made and it is left deniable, so the room can move on without anybody having to answer it.“",
      },
      {
        kind: "truefalse",
        text: "„Hardly“ carries its own „not“ and takes no second one.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It carries its own „not“, and a second one cannot be added…“",
      },
      {
        kind: "gapfill",
        text: "___ self-righteous, is it?",
        options: [],
        answer: 0,
        accept: ["Hardly", "hardly"],
        explain: "„Hardly self-righteous, is it?“",
      },
      {
        kind: "order",
        text: "Eksiltili söyleyişin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Not exactly cheap, that one.",
          "I wouldn't say no to a less patronizing tone.",
          "Hardly self-righteous, is it?",
          "The reader resolves it from what came before.",
        ],
        explain: "Üç örnek, en sonda okurun işi.",
      },
      {
        kind: "short_answer",
        text: "What resolves the meaning?",
        options: [],
        answer: 0,
        accept: ["what came before", "the context", "the sentence before"],
        explain: "„The reader resolves it from what came before.“",
      },
    ],
  },
  {
    id: "en-c1-u03-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 3,
    title: "Holding the text together",
    genre: "info",
    intro: "Üç bağlayıcı. Hangisi geriye tek bir şeye işaret ediyor?",
    gloss: [
      { de: "above", tr: "yukarıda" },
      { de: "picked", tr: "aldı" },
      { de: "noun", tr: "isim" },
      { de: "whole", tr: "bütün" },
      { de: "failure", tr: "kusur" },
      { de: "misused", tr: "yanlış kullanılan" },
      { de: "vaguest", tr: "en belirsiz" },
      { de: "precise", tr: "kesin" },
      { de: "practical", tr: "işe dönük" },
      { de: "bare", tr: "yalın" },
      { de: "backwards", tr: "tersinden" },
      { de: "arithmetic", tr: "aritmetik" },
      { de: "points back", tr: "geriye işaret ediyor" },
      { de: "the latter", tr: "ikincisi" },
      { de: "an antecedent", tr: "gönderge" },
      { de: "a paragraph", tr: "paragraf" },
      { de: "narrow", tr: "dar" },
      { de: "a summary word", tr: "toplayıcı sözcük" },
      { de: "such", tr: "böylesi" },
      { de: "loose", tr: "gevşek" },
      { de: "trace", tr: "izini sürmek" },
    ],
    minutes: 11,
    text:
      "This alone explains the proximity. Three words in, and the sentence has already reached back into the paragraph above and picked something up.\n" +
      "„This“ on its own is the loosest of the links. It can point at a noun, at a clause, or at the whole of the previous argument, and the reader works out which. In careful writing it is followed by a summary word — „this failure“, „this proximity“ — and the writer chooses what the reader is to carry forward.\n" +
      "„Such“ is narrower and better behaved. Such composure is rare. It points back at a quality that has just been described, and it cannot point at a whole argument, which is why it almost never goes wrong.\n" +
      "„The latter“ is the narrowest of the three and the most often misused. The latter reading leaves an unease. It means the second of exactly two things, and if three have been named the sentence has no antecedent at all and the reader stops.\n" +
      "So there is a scale, and it runs the opposite way from what a writer expects. The vaguest word is the commonest, and the precise one is the one that fails, because it makes a promise about the sentence above that the sentence above may not keep.\n" +
      "The practical rule is short. Use „such“ freely. Use „the latter“ only when the two things are in the same sentence and nothing stands between them. And never open a paragraph with a bare „this“, because a reader who has to trace it backwards over a paragraph break has left the argument to do arithmetic.\n" +
      "Meticulous writing is mostly this. Not long words and not profound observations, but a reader who is never once made to look up and check what a word is pointing at.",
    questions: [
      {
        text: "Which link is the loosest?",
        options: ["this", "such", "the latter"],
        answer: 0,
        explain: "„„This“ on its own is the loosest of the links.“",
      },
      {
        text: "What does „the latter“ mean?",
        options: ["the second of exactly two", "the last of many", "the nearest one"],
        answer: 0,
        explain: "„It means the second of exactly two things…“",
      },
      {
        kind: "truefalse",
        text: "The precise word is the one that works best.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the precise one is the one that fails…“",
      },
      {
        kind: "gapfill",
        text: "___ composure is rare.",
        options: [],
        answer: 0,
        accept: ["Such", "such"],
        explain: "„Such composure is rare.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "This alone explains the proximity.",
          "Such composure is rare.",
          "The latter reading leaves an unease.",
          "Never open a paragraph with a bare „this“.",
        ],
        explain: "Gevşek, dar, en dar; en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "What is meticulous writing mostly?",
        options: [],
        answer: 0,
        accept: ["never making the reader check", "clear pointing", "no looking up"],
        explain: "„a reader who is never once made to look up and check what a word is pointing at.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u03-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Dissent without rupture",
    genre: "dialogue",
    intro: "Ayrışmak ama kopmamak. Hangi araç kimi koruyor?",
    gloss: [
      { de: "rewritten", tr: "yeniden yazılmış" },
      { de: "anyway", tr: "yine de" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "none", tr: "hiçbiri" },
      { de: "survive", tr: "sağ kalmak" },
      { de: "leeway", tr: "manevra alanı" },
      { de: "a snag", tr: "pürüz" },
      { de: "viable", tr: "uygulanabilir" },
      { de: "irreversible", tr: "geri döndürülemez" },
      { de: "a minute", tr: "tutanak" },
      { de: "a position", tr: "konum" },
      { de: "protects", tr: "koruyor" },
      { de: "walk back", tr: "geri adım atmak" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ulaş", text: "Granted, there is little leeway, albeit some. That is the first line of the minute and it took longer than the meeting." },
      { speaker: "Peri", text: "Because of „albeit some“." },
      { speaker: "Ulaş", text: "Because of „albeit some“. Without it the sentence closes the question, and a minute that closes a question nobody agreed to close gets rewritten by somebody else." },
      { speaker: "Peri", text: "So the concession protects you." },
      { speaker: "Ulaş", text: "It protects the room. A position that has been stated with a small opening in it can be walked back without anybody losing anything." },
      { speaker: "Peri", text: "Much as I see the snag, the plan stays viable." },
      { speaker: "Ulaş", text: "That one is mine and it is doing something different. It says I have looked at the objection, and it says the answer anyway, and the reader is told both in one breath." },
      { speaker: "Peri", text: "Is that fair to the objection?" },
      { speaker: "Ulaş", text: "It is fair only if the objection is named somewhere. „Much as I see the snag“ with no snag written down is the most common dishonest sentence in a minute." },
      { speaker: "Peri", text: "And the last line." },
      { speaker: "Ulaş", text: "The step is irreversible, whereas the delay is not. No concession at all there, and none is needed: the two facts sit side by side and the reader draws the line." },
      { speaker: "Peri", text: "That is the one that will be quoted." },
      { speaker: "Ulaş", text: "That is the one that will be quoted, and it is the only sentence in the paragraph that would survive being read out by somebody who disagrees with me." },
    ],
    questions: [
      {
        text: "Why does „albeit some“ matter?",
        options: ["it leaves the question open", "it makes the line shorter", "it names the snag"],
        answer: 0,
        explain: "„Without it the sentence closes the question…“",
      },
      {
        text: "When is „much as I see the snag“ fair?",
        options: ["if the snag is named somewhere", "always", "never"],
        answer: 0,
        explain: "„It is fair only if the objection is named somewhere.“",
      },
      {
        kind: "truefalse",
        text: "The last line has no concession in it.",
        options: ["True", "False"],
        answer: 0,
        explain: "„No concession at all there, and none is needed…“",
      },
      {
        kind: "gapfill",
        text: "Granted, there is little leeway, albeit ___.",
        options: [],
        answer: 0,
        accept: ["some"],
        explain: "„Granted, there is little leeway, albeit some.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The step is irreversible, whereas the delay is not.", "The step is irreversible, whereas the delay is not"],
        explain: "Ödün yok: iki olgu yan yana, çizgiyi okur çekiyor.",
      },
      {
        kind: "short_answer",
        text: "Which sentence would survive being read out by an opponent?",
        options: [],
        answer: 0,
        accept: ["the last one", "the one with „whereas“", "the third"],
        explain: "„it is the only sentence in the paragraph that would survive being read out by somebody who disagrees with me.“",
      },
    ],
  },
  {
    id: "en-c1-u03-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 3,
    title: "Quoting the opponent",
    genre: "monologue",
    intro: "Karşı tarafı aktarmak. Fiil neyi ele veriyor?",
    gloss: [
      { de: "insult", tr: "hakaret" },
      { de: "either", tr: "ikisinden biri" },
      { de: "build", tr: "kurmak" },
      { de: "produced", tr: "üretti" },
      { de: "dull", tr: "sıkıcı" },
      { de: "postulate", tr: "öne sürmek" },
      { de: "refute", tr: "çürütmek" },
      { de: "substantiate", tr: "belgelemek" },
      { de: "a manifesto", tr: "manifesto" },
      { de: "an ideology", tr: "ideoloji" },
      { de: "falsify", tr: "tahrif etmek" },
      { de: "assumes", tr: "varsayıyor" },
      { de: "a verdict", tr: "hüküm" },
      { de: "unchecked", tr: "denetlenmemiş" },
      { de: "fairly", tr: "adilce" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ceyhun", text: "She postulates it; he refutes it; they substantiate it. Three verbs and three different amounts of work claimed for three people." },
      { speaker: "Ceyhun", text: "„Postulate“ says the thing was put forward without support. It is not an insult, but it is not nothing either: a postulate is something you may build on and have not yet earned." },
      { speaker: "Ceyhun", text: "„Refute“ is the one that goes wrong most often. It does not mean deny; it means prove false." },
      { speaker: "Ceyhun", text: "A writer who uses it for „said it was not true“ has given the opponent's answer a verdict it did not earn." },
      { speaker: "Ceyhun", text: "„Substantiate“ is the strongest of the three: evidence was produced. Three verbs, three positions on the same scale, and the reader takes all of it without stopping." },
      { speaker: "Ceyhun", text: "The manifesto claims what the ideology assumes. That is a sentence about two documents and it is also a verdict on both, and I would not write it without quoting a line from each." },
      { speaker: "Ceyhun", text: "To report a claim is not to falsify it. That is the rule I keep at the top of the page when the subject is somebody I disagree with." },
      { speaker: "Ceyhun", text: "Reporting fairly does not mean reporting flatly. It means the verb I choose has to be one I could defend if the other side read the paragraph out loud." },
      { speaker: "Ceyhun", text: "And when I cannot defend it, there is always „said“, which is dull, unchecked by anybody, and the only word in the list that has never once lost me an argument." },
    ],
    questions: [
      {
        text: "What does „refute“ really mean?",
        options: ["prove false", "deny", "repeat"],
        answer: 0,
        explain: "„It does not mean deny. It means prove false…“",
      },
      {
        text: "Which of the three is strongest?",
        options: ["substantiate", "postulate", "refute"],
        answer: 0,
        explain: "„„Substantiate“ is the strongest of the three: evidence was produced.“",
      },
      {
        kind: "truefalse",
        text: "Reporting fairly means reporting flatly.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Reporting fairly does not mean reporting flatly.“",
      },
      {
        kind: "gapfill",
        text: "To report a claim is not to ___ it.",
        options: [],
        answer: 0,
        accept: ["falsify"],
        explain: "„To report a claim is not to falsify it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The manifesto claims what the ideology assumes.", "The manifesto claims what the ideology assumes"],
        explain: "İki belge hakkında bir cümle ve ikisi hakkında bir hüküm.",
      },
      {
        kind: "short_answer",
        text: "What is the test for the verb he chooses?",
        options: [],
        answer: 0,
        accept: ["he could defend it", "he could answer for it", "if it is read out"],
        explain: "„the verb I choose has to be one I could defend if the other side read the paragraph out loud.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u03-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 3,
    title: "Not exactly cheap, that one",
    genre: "opinion",
    intro: "Olumsuzla söylenen olumlu ve üç bağlayıcı.",
    gloss: [
      { de: "not exactly", tr: "tam da değil" },
      { de: "wouldn't say no", tr: "hayır demezdim" },
      { de: "hardly", tr: "pek de değil" },
      { de: "the latter", tr: "ikincisi" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Tam da ucuz sayılmaz, o.",
        answer: "Not exactly cheap, that one.",
        hint: "Olumsuzla söylenen olumlu: pahalı demek.",
      },
      {
        kind: "build",
        tr: "Daha az küçümseyici bir tona hayır demezdim.",
        answer: "I wouldn't say no to a less patronizing tone.",
        hint: "İki olumsuz bir rica ediyor.",
      },
      {
        kind: "build",
        tr: "Pek de kendini haklı gören biri değil, öyle mi?",
        answer: "Hardly self-righteous, is it?",
        hint: "„hardly“ kendi olumsuzunu taşıyor; ikinci „not“ olmaz.",
      },
      {
        kind: "build",
        tr: "İkinci okuma bir huzursuzluk bırakıyor.",
        answer: "The latter reading leaves an unease.",
        hint: "„the latter“ tam olarak ikiden ikincisi demek.",
      },
      {
        kind: "form",
        prompt: "Eksiltili söyleyiş kartını doldur.",
        facts: "„not exactly cheap“ pahalı demek; „wouldn't say no“ evet demek; „hardly“ kendi olumsuzunu taşıyor; anlamı bağlam çözüyor.",
        fields: [
          { label: "Not exactly cheap", answer: "expensive", accept: ["dear"] },
          { label: "Wouldn't say no", answer: "yes", accept: ["a request"] },
          { label: "Hardly", answer: "already negative", accept: ["no second „not“"] },
          { label: "What decides", answer: "the context", accept: ["what came before"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u03-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 3,
    title: "She postulates it; he refutes it; they substantiate it",
    genre: "opinion",
    intro: "Üç aktarma fiili ve üç ödün aracı.",
    gloss: [
      { de: "postulates", tr: "öne sürüyor" },
      { de: "refutes", tr: "çürütüyor" },
      { de: "substantiate", tr: "belgelemek" },
      { de: "leeway", tr: "manevra alanı" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "O öne sürüyor; o çürütüyor; onlar belgeliyor.",
        answer: "She postulates it; he refutes it; they substantiate it.",
        hint: "Üç fiil, aynı ölçekte üç ayrı konum.",
      },
      {
        kind: "build",
        tr: "Manifesto, ideolojinin varsaydığını ileri sürüyor.",
        answer: "The manifesto claims what the ideology assumes.",
        hint: "İki belge hakkında bir cümle ve bir hüküm.",
      },
      {
        kind: "build",
        tr: "Bir iddiayı aktarmak onu tahrif etmek değildir.",
        answer: "To report a claim is not to falsify it.",
        hint: "Mastarlı iki yarı karşı karşıya konuyor.",
      },
      {
        kind: "build",
        tr: "Kabul, manevra alanı az, her ne kadar biraz olsa da.",
        answer: "Granted, there is little leeway, albeit some.",
        hint: "„albeit“ soruyu açık bırakıyor.",
      },
      {
        kind: "build",
        tr: "Adım geri döndürülemez, oysa gecikme öyle değil.",
        answer: "The step is irreversible, whereas the delay is not.",
        hint: "Ödün yok; iki olgu yan yana.",
      },
    ],
  },
];
