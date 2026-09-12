import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 4 — "İğneli yanıt, kısa cevap, tartışmanın kalıpları,
 * vurguyu kaydırmak".
 *
 * Dört ders: The barbed reply · The short answer ·
 * The phrases of debate · Shifting the stress.
 *
 *   Kelime: unscrupulous, virtuous, alarmism, patronize, incite, defame,
 *           stigmatize, electorate, nonpartisan, constituency, forfeit,
 *           internalize, invalidate, enshrine, comprehend, impair,
 *           polarize, idealize, glorify, stylize, romanticize, transcend,
 *           embody.
 *   Kalıp:  Not exactly unscrupulous, are they? ·
 *           I wouldn't call that virtuous. ·
 *           Hardly alarmism, is it? ·
 *           Some serve the common good; others, themselves. ·
 *           The electorate would if it could. ·
 *           One committee is nonpartisan; the other is not. ·
 *           To resign oneself is to forfeit the argument. ·
 *           They internalize a rule they cannot invalidate. ·
 *           What we enshrine we rarely comprehend. ·
 *           What the debate does is polarize. ·
 *           Into the account creeps an urge to idealize. ·
 *           The past we glorify; the present we stylize.
 *
 * Ünitenin tek öğretme noktası AYNI „WHAT“ İKİ AYRI İŞ GÖRÜYOR. „What the
 * debate does IS polarize“ bir yarık cümle; „What we enshrine WE rarely
 * comprehend“ ise öne çıkarılmış bir nesne. İlk üç sözcük aynı ve okur
 * hangisi olduğunu ancak DÖRDÜNCÜ sözcükte anlıyor: „is“ geliyorsa yarık
 * cümle, özne geliyorsa öne çıkarma.
 */
export const enC1U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u04-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 4,
    title: "Shifting the stress",
    genre: "opinion",
    intro: "İki cümle de „what“ ile başlıyor. Ayıran hangi sözcük?",
    gloss: [
      { de: "inverted", tr: "devrik" },
      { de: "noun", tr: "isim" },
      { de: "itself", tr: "kendisi" },
      { de: "fourth", tr: "dördüncü" },
      { de: "unlike", tr: "aksine" },
      { de: "invert", tr: "devirmek" },
      { de: "principle", tr: "ilke" },
      { de: "a construction", tr: "kuruluş" },
      { de: "collapses", tr: "çöküyor" },
      { de: "fronting", tr: "öne çıkarma" },
      { de: "keep apart", tr: "ayırt etmek" },
      { de: "the difficulty", tr: "güçlük" },
      { de: "deliberately", tr: "bilerek" },
      { de: "lands", tr: "yerini buluyor" },
      { de: "an urge", tr: "dürtü" },
      { de: "the account", tr: "anlatı" },
      { de: "a family", tr: "aile" },
      { de: "bear", tr: "katlanmak" },
      { de: "worth carrying", tr: "taşımaya değer" },
      { de: "later than usual", tr: "alışıldığından geç" },
      { de: "a cleft", tr: "yarık cümle" },
      { de: "an object", tr: "nesne" },
    ],
    minutes: 12,
    text:
      "What the debate does is polarize. The past we glorify; the present we stylize. Two sentences from the same page, and the first thing to notice is that they are not the same construction, although both begin by moving something to the front.\n" +
      "The first is a cleft. „What the debate does“ is the subject, „is“ is the verb, and everything after it is the new information. Take the „is“ away and the sentence collapses.\n" +
      "The second is fronting. „The past“ is the object of „glorify“, and it has been moved to the front while the subject and the verb stay in their order behind it. Nothing is inverted and nothing is added.\n" +
      "So far the two are easy to keep apart, because one starts with „what“ and the other with a noun. The difficulty arrives when the fronted object is itself a „what“ clause.\n" +
      "What we enshrine we rarely comprehend. Read the first three words and you cannot yet tell which construction this is. „What we enshrine is a rule“ would be a cleft. „What we enshrine we rarely comprehend“ is a fronted object, and the only thing that tells you is the word that comes fourth.\n" +
      "If it is „is“, the sentence is a cleft and the weight is at the end. If it is a subject, the sentence is fronting and the weight is at the front, where the writer put it deliberately.\n" +
      "That is a great deal of work for a reader to do in one word, and it is why this shape is rare and why it lands when it is used. A sentence that makes the reader wait four words for its own grammar is a sentence the reader remembers.\n" +
      "Into the account creeps an urge to idealize. That is the third tool from the same family, and unlike the other two it does invert: the subject has gone to the end because it is long and new. Three shapes, one principle. Something has been moved so that the last word is the word worth carrying, and in every case the reader is told what the subject is later than usual and not one word later than they can bear.",
    questions: [
      {
        text: "Which word tells you which construction it is?",
        options: ["the fourth", "the first", "the last"],
        answer: 0,
        explain: "„the only thing that tells you is the word that comes fourth.“",
      },
      {
        text: "What happens to a cleft if you take „is“ away?",
        options: ["it collapses", "it becomes fronting", "nothing"],
        answer: 0,
        explain: "„Take the „is“ away and the sentence collapses.“",
      },
      {
        kind: "truefalse",
        text: "Fronting inverts the subject and the verb.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nothing is inverted and nothing is added.“",
      },
      {
        kind: "gapfill",
        text: "What the debate does ___ polarize.",
        options: [],
        answer: 0,
        accept: ["is"],
        explain: "„What the debate does is polarize.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What the debate does is polarize.",
          "The past we glorify; the present we stylize.",
          "What we enshrine we rarely comprehend.",
          "Into the account creeps an urge to idealize.",
        ],
        explain: "Yarık cümle, öne çıkarma, ikisinin karıştığı yer, devrilen biçim.",
      },
      {
        kind: "short_answer",
        text: "Why does the shape land when it is used?",
        options: [],
        answer: 0,
        accept: ["the reader waits", "it is rare", "the reader remembers"],
        explain: "„A sentence that makes the reader wait four words for its own grammar is a sentence the reader remembers.“",
      },
    ],
  },
  {
    id: "en-c1-u04-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 4,
    title: "The phrases of debate",
    genre: "opinion",
    intro: "Mastarla kurulan denklem. Neyi reddediyor?",
    gloss: [
      { de: "apart", tr: "ayrı" },
      { de: "plain", tr: "yalın" },
      { de: "yourself", tr: "kendin" },
      { de: "belongs", tr: "ait" },
      { de: "revocation", tr: "geri alma" },
      { de: "pronoun", tr: "adıl" },
      { de: "object", tr: "nesne" },
      { de: "general", tr: "genel" },
      { de: "plainly", tr: "yalın biçimde" },
      { de: "assert", tr: "ileri sürmek" },
      { de: "an infinitive", tr: "mastar" },
      { de: "a definition", tr: "tanım" },
      { de: "an identity", tr: "özdeşlik" },
      { de: "a consequence", tr: "sonuç" },
      { de: "asserts", tr: "ileri sürüyor" },
      { de: "denies", tr: "reddediyor" },
      { de: "a disagreement", tr: "anlaşmazlık" },
      { de: "a conclusion", tr: "çıkarım" },
      { de: "drawn", tr: "çıkarılmış" },
      { de: "dropped", tr: "düşürülmüş" },
      { de: "an aphorism", tr: "özdeyiş" },
      { de: "settled", tr: "yerleşmiş" },
      { de: "wisdom", tr: "bilgelik" },
      { de: "earned", tr: "hak edilmiş" },
    ],
    minutes: 11,
    text:
      "To resign oneself is to forfeit the argument. Two infinitives, one on each side of the verb „be“, and between them they make a claim that a plain sentence could not.\n" +
      "„If you resign yourself, you lose the argument“ says the same thing and says it as advice. The infinitive version says it as a definition: these two things are one thing, and the reader who accepts the first half has accepted the second.\n" +
      "That is why the shape belongs to argument rather than to instruction. It does not describe a consequence; it asserts an identity, and an identity cannot be answered with „not always“.\n" +
      "The negative form is the one worth learning. To record a revocation is not to accept it. Here the sentence denies an identity, and denying an identity is the most useful move in a disagreement: it lets a writer agree with every fact on the page and refuse the conclusion drawn from them.\n" +
      "They internalize a rule they cannot invalidate. A different shape and a smaller point: the relative pronoun has been dropped, which is available because the clause is choosing.\n" +
      "What we enshrine we rarely comprehend. And here the two devices meet — a fronted object and a sentence that asserts something general — which is why the line reads like an aphorism rather than a claim.\n" +
      "The danger with all of these is the same and it is worth stating plainly. Each of them makes a sentence sound settled. A definition sounds like a fact, an aphorism sounds like wisdom, and a reader who disagrees has to take the sentence apart before answering it, which most readers will not do.\n" +
      "So the test I apply is whether I would still write the sentence as a plain one. If the plain version is something I can defend, the definition is a style. If it is not, the definition is doing work the argument has not earned.",
    questions: [
      {
        text: "What does the infinitive version assert?",
        options: ["an identity", "a consequence", "a piece of advice"],
        answer: 0,
        explain: "„It does not describe a consequence; it asserts an identity…“",
      },
      {
        text: "What does the negative form let a writer do?",
        options: ["refuse the conclusion", "deny the facts", "avoid the subject"],
        answer: 0,
        explain: "„it lets a writer agree with every fact on the page and refuse the conclusion drawn from them.“",
      },
      {
        kind: "truefalse",
        text: "Most readers take such a sentence apart before answering.",
        options: ["True", "False"],
        answer: 1,
        explain: "„which most readers will not do.“",
      },
      {
        kind: "gapfill",
        text: "To resign oneself is to ___ the argument.",
        options: [],
        answer: 0,
        accept: ["forfeit"],
        explain: "„To resign oneself is to forfeit the argument.“",
      },
      {
        kind: "order",
        text: "Tartışmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "To resign oneself is to forfeit the argument.",
          "To record a revocation is not to accept it.",
          "What we enshrine we rarely comprehend.",
          "Would I still write it as a plain sentence?",
        ],
        explain: "Olumlu denklem, olumsuz denklem, özdeyiş; en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "When is the definition a style?",
        options: [],
        answer: 0,
        accept: ["if the plain version holds", "if I can defend it", "if it stands alone"],
        explain: "„If the plain version is something I can defend, the definition is a style.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u04-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 4,
    title: "The barbed reply",
    genre: "dialogue",
    intro: "Dört taslak, tek satır. Soru eki ne yapıyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "adjective", tr: "sıfat" },
      { de: "entire", tr: "bütün" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "understatement", tr: "eksiltili söyleyiş" },
      { de: "a draft", tr: "taslak" },
      { de: "a tag", tr: "soru eki" },
      { de: "hands it", tr: "devrediyor" },
      { de: "a hinge", tr: "menteşe" },
      { de: "declining", tr: "reddetmek" },
      { de: "distrusted", tr: "güvenilmeyen" },
      { de: "sharpest", tr: "en keskin" },
      { de: "a defence", tr: "savunma" },
      { de: "misses it", tr: "kaçırıyor" },
      { de: "travel well", tr: "yolculuğa dayanmak" },
      { de: "friendly", tr: "dostça" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Aylin", text: "Not exactly unscrupulous, are they? That is the whole of the reply and it took four drafts." },
      { speaker: "Cenk", text: "It sounds almost friendly." },
      { speaker: "Aylin", text: "It sounds almost friendly and it says they are. The negative in front of a word that means the opposite is how English says a hard thing without leaving a sentence anybody can quote." },
      { speaker: "Cenk", text: "And the tag question." },
      { speaker: "Aylin", text: "„Are they?“ hands it to the room. Without the tag it is my claim; with it, it is a question I have asked and somebody else has to answer." },
      { speaker: "Cenk", text: "I wouldn't call that virtuous." },
      { speaker: "Aylin", text: "The same family, a different hinge. There the negative is on the verb of saying rather than on the adjective, and that is softer again: I am not calling it anything, I am declining to call it something." },
      { speaker: "Cenk", text: "Which is a claim." },
      { speaker: "Aylin", text: "Which is a claim and cannot be quoted as one. That is the entire value of the device and also the reason it is distrusted." },
      { speaker: "Cenk", text: "Hardly alarmism, is it?" },
      { speaker: "Aylin", text: "That one is the sharpest, because „hardly“ is already a negative and the sentence has no „not“ anywhere. It reads as a defence of the other side and lands as the opposite." },
      { speaker: "Cenk", text: "Does anybody miss it?" },
      { speaker: "Aylin", text: "Nobody in the room misses it. A reader coming to the page three weeks later sometimes does, and that is the cost: understatement does not travel well without the room." },
    ],
    questions: [
      {
        text: "What does the tag question do?",
        options: ["hands it to the room", "makes the adjective softer", "removes the claim"],
        answer: 0,
        explain: "„„Are they?“ hands it to the room.“",
      },
      {
        text: "Where is the negative in the second example?",
        options: ["on the verb of saying", "on the adjective", "on the subject"],
        answer: 0,
        explain: "„There the negative is on the verb of saying rather than on the adjective…“",
      },
      {
        kind: "truefalse",
        text: "Understatement travels well without the room.",
        options: ["True", "False"],
        answer: 1,
        explain: "„understatement does not travel well without the room.“",
      },
      {
        kind: "gapfill",
        text: "___ alarmism, is it?",
        options: [],
        answer: 0,
        accept: ["Hardly", "hardly"],
        explain: "„Hardly alarmism, is it?“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I wouldn't call that virtuous.", "I wouldn't call that virtuous"],
        explain: "Olumsuz sıfatta değil, söyleme fiilinde.",
      },
      {
        kind: "short_answer",
        text: "How many drafts did the reply take?",
        options: [],
        answer: 0,
        accept: ["four", "4", "four drafts"],
        explain: "„That is the whole of the reply and it took four drafts.“",
      },
    ],
  },
  {
    id: "en-c1-u04-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 4,
    title: "The short answer",
    genre: "monologue",
    intro: "Eksiltmenin satın aldığı şey kısalık değil. Ne?",
    gloss: [
      { de: "comma", tr: "virgül" },
      { de: "middle", tr: "orta" },
      { de: "stand", tr: "durmak" },
      { de: "halves", tr: "yarılar" },
      { de: "ellipsis", tr: "eksiltme" },
      { de: "particular", tr: "belirli" },
      { de: "none", tr: "hiçbiri" },
      { de: "a gap", tr: "boşluk" },
      { de: "holding its place", tr: "yerini tutan" },
      { de: "recoverable", tr: "geri getirilebilir" },
      { de: "brevity", tr: "kısalık" },
      { de: "supplies", tr: "tamamlıyor" },
      { de: "agreed", tr: "katıldı" },
      { de: "helped", tr: "yardım etti" },
      { de: "holding", tr: "sahiplenmek" },
      { de: "quickly", tr: "çabucak" },
      { de: "the opposite", tr: "tersi" },
      { de: "an adjective", tr: "sıfat" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Nergis", text: "Some serve the common good; others, themselves. Six words in the second half and one of them is missing, and the sentence is stronger for it." },
      { speaker: "Nergis", text: "The missing word is „serve“, and the comma is holding its place. Take the comma out and the sentence says that others serve themselves something, which is a different claim and a worse one." },
      { speaker: "Nergis", text: "The electorate would if it could. Here the gap is at the end instead of the middle, and what is missing is everything: „serve the common good“ has gone and only „would“ remains." },
      { speaker: "Nergis", text: "That works because the verb is recoverable from the previous sentence, and it stops working the moment two sentences stand between them." },
      { speaker: "Nergis", text: "One committee is nonpartisan; the other is not. The gap here is an adjective, and the two halves are built the same way, which is the condition for all of this." },
      { speaker: "Nergis", text: "What ellipsis buys in a short answer is not brevity. It is speed of a particular kind: the reader supplies the missing word, and a reader who has supplied a word has agreed with it." },
      { speaker: "Nergis", text: "That is the part worth knowing. A sentence the reader completes is a sentence the reader has helped to make, and helping to make a claim is very close to holding it." },
      { speaker: "Nergis", text: "Which is why I use one gap in a paragraph about citizen participation and none at all in a paragraph about political disillusionment, where the reader should be doing the opposite of agreeing quickly." },
    ],
    questions: [
      {
        text: "What is holding the place of „serve“?",
        options: ["the comma", "the word „some“", "the word „others“"],
        answer: 0,
        explain: "„The missing word is „serve“, and the comma is holding its place.“",
      },
      {
        text: "What does ellipsis buy?",
        options: ["a particular speed", "brevity", "politeness"],
        answer: 0,
        explain: "„What ellipsis buys in a short answer is not brevity. It is speed of a particular kind…“",
      },
      {
        kind: "truefalse",
        text: "The gap still works with two sentences in between.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it stops working the moment two sentences stand between them.“",
      },
      {
        kind: "gapfill",
        text: "The electorate would if it ___.",
        options: [],
        answer: 0,
        accept: ["could"],
        explain: "„The electorate would if it could.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["One committee is nonpartisan; the other is not.", "One committee is nonpartisan; the other is not"],
        explain: "Eksik olan bir sıfat; iki yarı aynı biçimde kurulmuş.",
      },
      {
        kind: "short_answer",
        text: "Where does she use no gap at all?",
        options: [],
        answer: 0,
        accept: ["political disillusionment", "the disillusionment paragraph", "the second one"],
        explain: "„none at all in a paragraph about political disillusionment…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u04-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 4,
    title: "What we enshrine we rarely comprehend",
    genre: "opinion",
    intro: "İki „what“ ve iki öne çıkarma. Dördüncü sözcük ne?",
    gloss: [
      { de: "cleft", tr: "yarık cümle" },
      { de: "object", tr: "nesne" },
      { de: "enshrine", tr: "hükme bağlamak" },
      { de: "comprehend", tr: "idrak etmek" },
      { de: "polarize", tr: "kutuplaştırmak" },
      { de: "stylize", tr: "stilize etmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Hükme bağladığımız şeyi nadiren idrak ederiz.",
        answer: "What we enshrine we rarely comprehend.",
        hint: "Öne çıkarılmış nesne: dördüncü sözcük „is“ değil.",
      },
      {
        kind: "build",
        tr: "Tartışmanın yaptığı şey kutuplaştırmak.",
        answer: "What the debate does is polarize.",
        hint: "Yarık cümle: dördüncü sözcük „is“.",
      },
      {
        kind: "build",
        tr: "Geçmişi yüceltiriz; bugünü stilize ederiz.",
        answer: "The past we glorify; the present we stylize.",
        hint: "İki nesne öne çıkmış, devrilme yok.",
      },
      {
        kind: "build",
        tr: "Anlatıya idealleştirme dürtüsü sızıyor.",
        answer: "Into the account creeps an urge to idealize.",
        hint: "Uzun ve yeni olan özne sona gidiyor.",
      },
      {
        kind: "form",
        prompt: "İki „what“ kartını doldur.",
        facts: "Dördüncü sözcük „is“ ise yarık cümle; özne ise öne çıkarma; yarık cümlede ağırlık sonda; öne çıkarmada başta.",
        fields: [
          { label: "Fourth word „is“", answer: "a cleft", accept: ["cleft"] },
          { label: "Fourth word a subject", answer: "fronting", accept: ["a fronted object"] },
          { label: "Weight in a cleft", answer: "at the end", accept: ["the end"] },
          { label: "Weight in fronting", answer: "at the front", accept: ["the front"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u04-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 4,
    title: "Not exactly unscrupulous, are they?",
    genre: "opinion",
    intro: "Üç eksiltili söyleyiş ve iki boşluk.",
    gloss: [
      { de: "not exactly", tr: "tam da değil" },
      { de: "wouldn't call", tr: "demezdim" },
      { de: "hardly", tr: "pek de değil" },
      { de: "the common good", tr: "kamu yararı" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Tam da vicdansız sayılmazlar, öyle mi?",
        answer: "Not exactly unscrupulous, are they?",
        hint: "Olumsuzla söylenen olumlu; soru eki odaya devrediyor.",
      },
      {
        kind: "build",
        tr: "Buna erdemli demezdim.",
        answer: "I wouldn't call that virtuous.",
        hint: "Olumsuz sıfatta değil, söyleme fiilinde.",
      },
      {
        kind: "build",
        tr: "Pek de felaket tellallığı sayılmaz, öyle mi?",
        answer: "Hardly alarmism, is it?",
        hint: "„hardly“ zaten olumsuz; ikinci „not“ yok.",
      },
      {
        kind: "build",
        tr: "Kimi kamu yararına hizmet eder; kimi kendine.",
        answer: "Some serve the common good; others, themselves.",
        hint: "Virgül „serve“in yerini tutuyor.",
      },
      {
        kind: "build",
        tr: "Seçmen kitlesi yapabilse yapardı.",
        answer: "The electorate would if it could.",
        hint: "Sondaki boşluk: fiil bir önceki cümleden geliyor.",
      },
    ],
  },
];
