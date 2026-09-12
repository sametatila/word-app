import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 20 — "Aralığa kadar, tutmayan kredi, sözleşme
 * karşılasaydı, maaş konuşması".
 *
 * Dört ders: By December · The loan that failed ·
 * If the contract had covered it · The salary conversation.
 *
 *   Kelime: due date, late fee, retroactive, creditor, mortgage,
 *           interest-free, debtor, seizure, costly, uncovered,
 *           proportional, parental leave, maternity leave,
 *           occupational safety.
 *   Kalıp:  By December we will have saved enough to pay off the loan. ·
 *           Next month we will be watching the due date. ·
 *           By the payment deadline we will have decided how to use up the rest. ·
 *           The creditor must have warned them. ·
 *           They can't have signed the mortgage alone. ·
 *           We should have asked for an interest-free plan. ·
 *           If the liability insurance had covered it, we would have paid nothing. ·
 *           If the pension insurance had started earlier, the company pension would be higher now. ·
 *           If the retirement savings had grown, we would have stopped working. ·
 *           It seems to be proportional. ·
 *           Apparently the raise was refused for operational reasons. ·
 *           On balance the work-life balance is arguably the point.
 *
 * Ünitenin tek öğretme noktası SORU SÖZCÜĞÜ + MASTAR. „decided how to use
 * up the rest“ — bütün bir cümlecik iki sözcüğe katlanıyor: özne yok,
 * zaman yok, ikisini de ana cümle veriyor. Aynı kalıp „what to say“,
 * „where to go“, „whether to pay“ için de çalışıyor, ama yalnız soru
 * tutabilen fiillerden sonra: „hope how to do it“ diye bir şey yok.
 */
export const enB2U20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u20-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 20,
    title: "By December",
    genre: "info",
    intro: "Dört sözcük iki sözcüğe katlanıyor. Ne düşüyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "tense", tr: "zaman kipi" },
      { de: "verb", tr: "fiil" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "infinitive", tr: "mastar" },
      { de: "easiest", tr: "en kolay" },
      { de: "sentence", tr: "cümle" },
      { de: "entirely", tr: "tümüyle" },
      { de: "per", tr: "başına" },
      { de: "unfolds", tr: "açıyor" },
      { de: "folded", tr: "katlanmış" },
      { de: "unfolded", tr: "açılmış" },
      { de: "the fold", tr: "katlama" },
      { de: "supplied", tr: "sağlanan" },
      { de: "a question word", tr: "soru sözcüğü" },
      { de: "hold a question", tr: "soru tutmak" },
      { de: "wonder", tr: "merak etmek" },
      { de: "the unfolding", tr: "açma" },
      { de: "incorrectly", tr: "yanlış biçimde" },
      { de: "count", tr: "saymak" },
      { de: "beyond", tr: "ötesinde" },
      { de: "a clause", tr: "cümlecik" },
      { de: "missing", tr: "eksik" },
    ],
    minutes: 9,
    text:
      "By the payment deadline we will have decided how to use up the rest. Look at the last four words, because they are a whole clause that has been folded into two.\n" +
      "„How to use up the rest“ has no subject and no tense. Unfolded it would be „how we should use up the rest“ or „how we are going to use up the rest“, and the short version does not say which, because it does not have to: the main clause has already told you who and when.\n" +
      "The same shape works with the other question words. What to say. Where to go. Whether to pay. Each of them is a question with the subject and the tense taken out, and each of them follows a verb that can hold a question: decide, know, wonder, ask, explain, forget.\n" +
      "It does not work after every verb. „I hope how to do it“ is nothing; „hope“ cannot hold a question, and neither can „want“ or „like“.\n" +
      "By December we will have saved enough to pay off the loan. That is a different fold: „enough to“ with an infinitive, where the missing subject is again supplied by the main clause.\n" +
      "Next month we will be watching the due date. No folding there at all, and it is the easiest sentence on the page to check.\n" +
      "A plan written entirely in folded clauses is short and hard to argue with, and that is both the reason to use them and the reason to count them. Two per paragraph. Beyond that the reader is doing the unfolding, and a reader who unfolds a late fee incorrectly will be back.",
    questions: [
      {
        text: "What does the folded clause not have?",
        options: ["a subject and a tense", "a verb", "a question word"],
        answer: 0,
        explain: "„„How to use up the rest“ has no subject and no tense.“",
      },
      {
        text: "Which verb cannot hold a question?",
        options: ["hope", "decide", "wonder"],
        answer: 0,
        explain: "„„hope“ cannot hold a question, and neither can „want“ or „like“.“",
      },
      {
        kind: "truefalse",
        text: "The short version says which of the two it means.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the short version does not say which, because it does not have to…“",
      },
      {
        kind: "gapfill",
        text: "We will have decided ___ to use up the rest.",
        options: [],
        answer: 0,
        accept: ["how"],
        explain: "„we will have decided how to use up the rest.“",
      },
      {
        kind: "order",
        text: "Katlamanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "We will have decided how to use up the rest.",
          "We will have saved enough to pay off the loan.",
          "Next month we will be watching the due date.",
          "Two per paragraph.",
        ],
        explain: "Soru katlaması, „enough to“ katlaması, katlamasız cümle, en sonda sınır.",
      },
      {
        kind: "short_answer",
        text: "How many folded clauses per paragraph?",
        options: [],
        answer: 0,
        accept: ["two", "2", "two per paragraph"],
        explain: "„Two per paragraph.“",
      },
    ],
  },
  {
    id: "en-b2-u20-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 20,
    title: "If the contract had covered it",
    genre: "opinion",
    intro: "Üç koşul, aynı başlangıç. Fark nerede başlıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "least", tr: "en az" },
      { de: "either", tr: "ikisinden biri" },
      { de: "produced", tr: "üretti" },
      { de: "conditional", tr: "koşul cümlesi" },
      { de: "closed", tr: "kapalı" },
      { de: "a statement", tr: "ekstre" },
      { de: "an amount", tr: "tutar" },
      { de: "living on", tr: "geçindiği" },
      { de: "reach", tr: "ulaşmak" },
      { de: "alike", tr: "birbirine benzer" },
      { de: "entirely", tr: "tümüyle" },
      { de: "holiday entitlement", tr: "izin hakkı" },
      { de: "a complaint", tr: "yakınma" },
      { de: "grown", tr: "büyümüş" },
      { de: "the test", tr: "sınama" },
      { de: "mixed", tr: "karışık" },
    ],
    minutes: 9,
    text:
      "If the liability insurance had covered it, we would have paid nothing. Closed on both sides: the insurance did not cover it and the money has gone.\n" +
      "If the pension insurance had started earlier, the company pension would be higher now. The second half has moved into the present, because the pension is a number on a statement this month.\n" +
      "That is the mixed form, and in a conversation about money it is the only one that does any work. The first sentence is about a year nobody can reach. The second is about an amount somebody is living on.\n" +
      "If the retirement savings had grown, we would have stopped working. Closed again, and it is the sentence people say most often and act on least.\n" +
      "There is a reason these three sound alike and are not. All of them start the same way and all of them are about things that did not happen; the difference is entirely in the second half, and the second half is four words in.\n" +
      "So the test is where the result lives, and it has not changed since it was first written. Occupational safety, parental leave, holiday entitlement: each of those either produced a number that is true today or it did not.\n" +
      "Where it did, write the mixed form and let the sentence point at the number. Where it did not, write the closed one and let it stay closed, because a closed conditional about a finished year is honest and a mixed one about the same year is a complaint.",
    questions: [
      {
        text: "Where does the difference start?",
        options: ["in the second half", "in the first word", "in the word „if“"],
        answer: 0,
        explain: "„the difference is entirely in the second half…“",
      },
      {
        text: "What is the second sentence about?",
        options: ["an amount somebody lives on", "a year nobody can reach", "a finished decision"],
        answer: 0,
        explain: "„The second is about an amount somebody is living on.“",
      },
      {
        kind: "truefalse",
        text: "A mixed form about a finished year is honest.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a mixed one about the same year is a complaint.“",
      },
      {
        kind: "gapfill",
        text: "The company pension would be higher ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„the company pension would be higher now.“",
      },
      {
        kind: "order",
        text: "Koşulların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "If the liability insurance had covered it, we would have paid nothing.",
          "If the pension insurance had started earlier, the company pension would be higher now.",
          "If the retirement savings had grown, we would have stopped working.",
          "The test is where the result lives.",
        ],
        explain: "Kapalı, karışık, yine kapalı; en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "Which sentence do people act on least?",
        options: [],
        answer: 0,
        accept: ["the savings one", "the third one", "the last one"],
        explain: "„it is the sentence people say most often and act on least.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u20-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 20,
    title: "The loan that failed",
    genre: "dialogue",
    intro: "Üç kip, bir dosya. Hangisi geri alıntılanıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "prohibition", tr: "yasak" },
      { de: "plain", tr: "yalın" },
      { de: "sentences", tr: "cümleler" },
      { de: "a reply", tr: "yanıt" },
      { de: "attached", tr: "iliştirilmiş" },
      { de: "a charge", tr: "suçlama" },
      { de: "a signature", tr: "imza" },
      { de: "required", tr: "gerekli" },
      { de: "a document", tr: "belge" },
      { de: "a committee", tr: "kurul" },
      { de: "a lender", tr: "kredi veren" },
      { de: "out loud", tr: "sesli olarak" },
      { de: "standing", tr: "ayakta" },
      { de: "quote back", tr: "geri alıntılamak" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Yağmur", text: "The creditor must have warned them. There is a letter in the file with a date on it and no reply attached." },
      { speaker: "Tolga", text: "That is a conclusion." },
      { speaker: "Yağmur", text: "It is, and it is not a charge. „Must have“ reads the evidence; it says the evidence leaves one reading standing." },
      { speaker: "Tolga", text: "And the mortgage?" },
      { speaker: "Yağmur", text: "They can't have signed the mortgage alone. Two signatures are required by the form, and „can't have“ is how English closes a door with a document." },
      { speaker: "Tolga", text: "Not „mustn't have“." },
      { speaker: "Yağmur", text: "There is no such sentence. A prohibition cannot be aimed at a Tuesday in March." },
      { speaker: "Tolga", text: "Then the third line." },
      { speaker: "Yağmur", text: "We should have asked for an interest-free plan. That one is about us, and it is the only sentence in the note that anybody will quote back at me." },
      { speaker: "Tolga", text: "Do you keep it?" },
      { speaker: "Yağmur", text: "I keep it, once, at the end. A note about a debtor that has no sentence about the lender in it is a note the committee will not believe." },
      { speaker: "Tolga", text: "And the seizure?" },
      { speaker: "Yağmur", text: "The seizure goes in plain sentences with dates, because that is the part somebody may have to read out loud in a room where it is costly to be wrong." },
    ],
    questions: [
      {
        text: "What is in the file?",
        options: ["a letter with no reply", "two signatures", "a plan"],
        answer: 0,
        explain: "„There is a letter in the file with a date on it and no reply attached.“",
      },
      {
        text: "Which sentence will be quoted back?",
        options: ["the one about us", "the one about the creditor", "the one about the mortgage"],
        answer: 0,
        explain: "„it is the only sentence in the note that anybody will quote back at me.“",
      },
      {
        kind: "truefalse",
        text: "„Mustn't have“ could be used here.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is no such sentence.“",
      },
      {
        kind: "gapfill",
        text: "They ___ have signed the mortgage alone.",
        options: [],
        answer: 0,
        accept: ["can't", "cannot"],
        explain: "„They can't have signed the mortgage alone.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The creditor must have warned them.", "The creditor must have warned them"],
        explain: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "short_answer",
        text: "How does the seizure go in?",
        options: [],
        answer: 0,
        accept: ["in plain sentences", "with dates", "in plain words"],
        explain: "„The seizure goes in plain sentences with dates…“",
      },
    ],
  },
  {
    id: "en-b2-u20-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 20,
    title: "The salary conversation",
    genre: "monologue",
    intro: "Çekince nereye konuyor, nereye konmuyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "itself", tr: "kendisi" },
      { de: "a hedge", tr: "çekince" },
      { de: "a figure", tr: "rakam" },
      { de: "adopting", tr: "benimseyen" },
      { de: "a phrase", tr: "öbek" },
      { de: "a weighing", tr: "tartma" },
      { de: "the calendar", tr: "takvim" },
      { de: "against", tr: "karşısında" },
      { de: "count", tr: "saymak" },
      { de: "a raise", tr: "zam" },
      { de: "refused", tr: "reddedildi" },
      { de: "earns", tr: "hak ediyor" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Berrak", text: "It seems to be proportional. Three words of hedge on a sentence about a number, which is two too many." },
      { speaker: "Berrak", text: "Either the raise is proportional or it is not, and the figure is in front of both of us on a page." },
      { speaker: "Berrak", text: "Apparently the raise was refused for operational reasons. That one earns its hedge: I am reporting somebody else's phrase and I am not adopting it." },
      { speaker: "Berrak", text: "„For operational reasons“ is itself a hedge, and it is the most common four words in this kind of letter. It names nothing and cannot be argued with." },
      { speaker: "Berrak", text: "On balance the work-life balance is arguably the point. Two hedges, and „on balance“ is the one to keep, because it says a weighing has happened and somebody can show the weighing was wrong." },
      { speaker: "Berrak", text: "„Arguably“ says nothing and I take it out every time I find it." },
      { speaker: "Berrak", text: "The rule I use in a salary conversation is that the hedge goes on the part I did not see, and never on the part I can count." },
      { speaker: "Berrak", text: "So the training initiative gets a hedge, because I have not read the budget. The time off does not, because it is on the calendar with my name against it." },
    ],
    questions: [
      {
        text: "Which sentence earns its hedge?",
        options: ["the one reporting somebody else", "the one about the number", "the one about balance"],
        answer: 0,
        explain: "„That one earns its hedge: I am reporting somebody else's phrase…“",
      },
      {
        text: "Where does the hedge go?",
        options: ["on the part she did not see", "on the number", "on the calendar"],
        answer: 0,
        explain: "„the hedge goes on the part I did not see, and never on the part I can count.“",
      },
      {
        kind: "truefalse",
        text: "The time off gets a hedge.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The time off does not, because it is on the calendar with my name against it.“",
      },
      {
        kind: "gapfill",
        text: "Apparently the raise was refused for ___ reasons.",
        options: [],
        answer: 0,
        accept: ["operational"],
        explain: "„Apparently the raise was refused for operational reasons.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It seems to be proportional.", "It seems to be proportional"],
        explain: "Sayı üstüne çekince: bir tane bile fazla.",
      },
      {
        kind: "short_answer",
        text: "What does Berrak take out every time?",
        options: [],
        answer: 0,
        accept: ["arguably", "the word arguably", "one hedge"],
        explain: "„„Arguably“ says nothing and I take it out every time I find it.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u20-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 20,
    title: "By the payment deadline we will have decided how to use up the rest",
    genre: "info",
    intro: "İki katlama ve bir katlamasız cümle.",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "how to use up", tr: "nasıl kullanacağını" },
      { de: "enough to pay off", tr: "ödeyecek kadar" },
      { de: "will be watching", tr: "izliyor olacak" },
      { de: "must have warned", tr: "uyarmış olmalı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Son ödeme tarihine kadar gerisini nasıl kullanacağımıza karar vermiş olacağız.",
        answer: "By the payment deadline we will have decided how to use up the rest.",
        hint: "Soru sözcüğü + mastar: özne de zaman da düşüyor.",
      },
      {
        kind: "build",
        tr: "Aralığa kadar krediyi ödeyecek kadar birikim yapmış olacağız.",
        answer: "By December we will have saved enough to pay off the loan.",
        hint: "„enough to“ da bir katlama; öznesi ana cümleden geliyor.",
      },
      {
        kind: "build",
        tr: "Gelecek ay vade tarihini izliyor olacağız.",
        answer: "Next month we will be watching the due date.",
        hint: "Katlama yok; sürerli biçim.",
      },
      {
        kind: "build",
        tr: "Alacaklı onları uyarmış olmalı.",
        answer: "The creditor must have warned them.",
        hint: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Katlama kartını doldur.",
        facts: "Katlanan cümlecikte özne yok; zaman da yok; ikisini ana cümle veriyor; her fiil soru tutamıyor.",
        fields: [
          { label: "The subject", answer: "gone", accept: ["none"] },
          { label: "The tense", answer: "gone", accept: ["none"] },
          { label: "Where from", answer: "the main clause", accept: ["main clause"] },
          { label: "After „hope“", answer: "not possible", accept: ["no"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u20-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 20,
    title: "The creditor must have warned them",
    genre: "opinion",
    intro: "İki kip ve iki koşul. Hangisi bu ayın ekstresinde?",
    gloss: [
      { de: "can't have signed", tr: "imzalamış olamaz" },
      { de: "should have asked", tr: "istememiz gerekirdi" },
      { de: "would have paid", tr: "öderdik" },
      { de: "would be higher", tr: "daha yüksek olurdu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İpoteği tek başlarına imzalamış olamazlar.",
        answer: "They can't have signed the mortgage alone.",
        hint: "Olumsuzu „can't have“.",
      },
      {
        kind: "build",
        tr: "Faizsiz bir plan istememiz gerekirdi.",
        answer: "We should have asked for an interest-free plan.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Sorumluluk sigortası karşılasaydı hiçbir şey ödemezdik.",
        answer: "If the liability insurance had covered it, we would have paid nothing.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Emeklilik sigortası daha erken başlasaydı şirket emekli maaşı şimdi daha yüksek olurdu.",
        answer: "If the pension insurance had started earlier, the company pension would be higher now.",
        hint: "Karışık koşul: sonuç bu ayın ekstresinde.",
      },
      {
        kind: "build",
        tr: "Orantılı olduğu anlaşılıyor.",
        answer: "It seems to be proportional.",
        hint: "Tek çekince yeter.",
      },
    ],
  },
];
