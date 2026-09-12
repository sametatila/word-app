import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 13 — "Örneklem daha büyük olsaydı, temkinli sonuç,
 * eşitsizlik raporu, rakamlara göre".
 *
 * Dört ders: Had the sample been larger · A tentative conclusion ·
 * The inequality report · According to the figures.
 *
 *   Kelime: generalize, remain, biased, justify, derive, anticipate,
 *           attribute, provisional, sensible, superficial, suspicious,
 *           thoroughly, likewise, exclusively, voluntary, autonomous,
 *           inequality, discrimination, solidarity, minority, prejudice,
 *           disadvantaged, national debt, deficit, tax burden, ministry,
 *           economic growth, national budget.
 *   Kalıp:  If the sample had been larger, we would have generalized. ·
 *           If the method had been clear, the result would remain valid now. ·
 *           If the sample had been biased, the result would have failed. ·
 *           It seems to be a sensible reading. ·
 *           Apparently the check was superficial. ·
 *           On balance the result is arguably suspicious. ·
 *           The measurement of inequality begins here. ·
 *           The documentation of discrimination is required. ·
 *           The reduction of prejudice takes a generation. ·
 *           The national debt is said to be rising. ·
 *           The deficit is expected to grow again. ·
 *           The tax burden is thought to have doubled.
 *
 * Ünitenin tek öğretme noktası ÜÇ AKTARMA FİİLİ, ÜÇ KANIT DERECESİ.
 * „is said to“ yalnızca biri söyledi demek; „is thought to“ tutulan bir
 * görüş, yani bakılmış ama imzalanmamış; „is expected to“ ileriye bakıyor
 * ve arkasında bir model ya da eğilim var. Üçü aynı edilgen kalıpta
 * duruyor ve aynı şeyi söylemiyor.
 */
export const enB2U13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u13-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 13,
    title: "According to the figures",
    genre: "opinion",
    intro: "Üç edilgen aktarma. Hangisinin arkasında bir model var?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "passive", tr: "edilgen" },
      { de: "sentence", tr: "cümle" },
      { de: "verbs", tr: "fiiller" },
      { de: "trouble", tr: "sıkıntı" },
      { de: "least", tr: "en az" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "national debt", tr: "kamu borcu" },
      { de: "debt", tr: "borç" },
      { de: "rising", tr: "yükselen" },
      { de: "tax burden", tr: "vergi yükü" },
      { de: "burden", tr: "yük" },
      { de: "doubled", tr: "ikiye katlandı" },
      { de: "a weight", tr: "ağırlık" },
      { de: "held", tr: "tutulan" },
      { de: "implies", tr: "ima ediyor" },
      { de: "signed", tr: "imzalanmış" },
      { de: "a trend", tr: "eğilim" },
      { de: "an expectation", tr: "beklenti" },
      { de: "a degree", tr: "derece" },
      { de: "alike", tr: "birbirine benzer" },
      { de: "economic growth", tr: "ekonomik büyüme" },
      { de: "growth", tr: "büyüme" },
      { de: "a model", tr: "model" },
    ],
    minutes: 9,
    text:
      "The national debt is said to be rising. The deficit is expected to grow again. The tax burden is thought to have doubled. Three sentences in the same paragraph, all of them passive, all of them without a source — and they are not saying the same kind of thing.\n" +
      "„Is said to“ means somebody has said it. That is all it means. It carries no weight of its own and it does not tell you whether the somebody was a ministry or a man on a train.\n" +
      "„Is thought to“ is a view that is held, usually by people who work on the subject. It is stronger than „said“ because it implies that the claim has been looked at, and weaker than a figure because nobody has signed it.\n" +
      "„Is expected to“ is different from both. It points forward and it rests on something: a model, a trend, a set of numbers from last year. A deficit that is expected to grow has a reason behind the expectation even when the sentence does not give it.\n" +
      "Economic growth is expected to slow, and the national budget is written on the back of that expectation. So three verbs, three degrees, and a reader who knows the difference gets a great deal from a paragraph that names nobody at all.\n" +
      "The trouble is that a writer who does not know the difference uses them as if they were one word. „The tax burden is said to have doubled“ and „is thought to have doubled“ read alike on the page and mean different things about who has checked.\n" +
      "My rule for a page like this is that „expected“ needs a model I could name if asked, „thought“ needs at least two people who are not me, and „said“ needs a sentence somewhere else giving the name.",
    questions: [
      {
        text: "Which one rests on a model or a trend?",
        options: ["is expected to", "is said to", "is thought to"],
        answer: 0,
        explain: "„It points forward and it rests on something: a model, a trend…“",
      },
      {
        text: "What does „is said to“ mean?",
        options: ["somebody has said it", "a view is held", "a figure is known"],
        answer: 0,
        explain: "„„Is said to“ means somebody has said it. That is all it means.“",
      },
      {
        kind: "truefalse",
        text: "„Is thought to“ is weaker than „is said to“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is stronger than „said“ because it implies that the claim has been looked at…“",
      },
      {
        kind: "gapfill",
        text: "The deficit is ___ to grow again.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The deficit is expected to grow again.“",
      },
      {
        kind: "order",
        text: "Üç derecenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The national debt is said to be rising.",
          "The tax burden is thought to have doubled.",
          "The deficit is expected to grow again.",
          "Three verbs, three degrees.",
        ],
        explain: "Söylenen, düşünülen, beklenen; en sonda kuralın adı.",
      },
      {
        kind: "short_answer",
        text: "What does „thought“ need?",
        options: [],
        answer: 0,
        accept: ["two people", "two other people", "not just me"],
        explain: "„„thought“ needs at least two people who are not me…“",
      },
    ],
  },
  {
    id: "en-b2-u13-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 13,
    title: "The inequality report",
    genre: "opinion",
    intro: "İsimler mesafe satın alıyor. Bedeli ne?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "verbs", tr: "fiiller" },
      { de: "entirely", tr: "tümüyle" },
      { de: "unit", tr: "ünite" },
      { de: "noun", tr: "isim" },
      { de: "sentence", tr: "cümle" },
      { de: "sentences", tr: "cümleler" },
      { de: "verb", tr: "fiil" },
      { de: "a relief", tr: "rahatlama" },
      { de: "a trap", tr: "tuzak" },
      { de: "distance", tr: "mesafe" },
      { de: "argued about", tr: "tartışılan" },
      { de: "underneath", tr: "altta" },
      { de: "a body", tr: "kurum" },
      { de: "sharper", tr: "daha keskin" },
      { de: "counted", tr: "saydı" },
      { de: "manners", tr: "nezaket" },
      { de: "hidden", tr: "gizlenmiş" },
      { de: "the method", tr: "yöntem" },
      { de: "a generation", tr: "kuşak" },
      { de: "required", tr: "zorunlu" },
      { de: "a district", tr: "ilçe" },
    ],
    minutes: 9,
    text:
      "The measurement of inequality begins here. The documentation of discrimination is required. The reduction of prejudice takes a generation. Three nouns made from three verbs, and a report of this kind is written almost entirely in them.\n" +
      "Every one of them takes „of“, which is a relief after the last unit, and it is also a trap: a reader who learns these three will write „the distinction of the two groups“ and be wrong.\n" +
      "The reason the nouns are used here is not the usual one. In a technical report the noun buys a number. In a report on inequality it buys distance, and distance is exactly what is being argued about.\n" +
      "„We measured inequality in four districts“ names us and dates the work. „The measurement of inequality“ names nothing and could have been written in any year. The first sentence can be checked. The second one can be agreed with by people who would disagree about everything underneath it.\n" +
      "That is not an argument against the form. A report that has to be signed by six bodies needs sentences that six bodies can sign, and solidarity between them is worth more than a sharper paragraph.\n" +
      "It is an argument for one thing. Somewhere in the document there has to be a page with people in it: who was asked, who counted, which minority was counted short and by how much. The nouns can carry the summary. They cannot carry the method, and a report that has only nouns has hidden its method behind its own good manners.",
    questions: [
      {
        text: "What does the noun buy in this report?",
        options: ["distance", "a number", "a date"],
        answer: 0,
        explain: "„In a report on inequality it buys distance…“",
      },
      {
        text: "What is the trap after this unit?",
        options: ["writing „the distinction of“", "writing „of“ everywhere", "writing the verb"],
        answer: 0,
        explain: "„a reader who learns these three will write „the distinction of the two groups“ and be wrong.“",
      },
      {
        kind: "truefalse",
        text: "The writer is arguing against the noun form.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is not an argument against the form.“",
      },
      {
        kind: "gapfill",
        text: "The reduction of prejudice takes a ___.",
        options: [],
        answer: 0,
        accept: ["generation"],
        explain: "„The reduction of prejudice takes a generation.“",
      },
      {
        kind: "order",
        text: "Raporun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The measurement of inequality begins here.",
          "The documentation of discrimination is required.",
          "The reduction of prejudice takes a generation.",
          "The nouns cannot carry the method.",
        ],
        explain: "Üç adlaştırma, en sonda bedeli.",
      },
      {
        kind: "short_answer",
        text: "What can the nouns not carry?",
        options: [],
        answer: 0,
        accept: ["the method", "method", "who counted"],
        explain: "„They cannot carry the method…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u13-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 13,
    title: "Had the sample been larger",
    genre: "dialogue",
    intro: "Üç koşul. Hangisi hâlâ masada?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "closed", tr: "kapalı" },
      { de: "a note", tr: "not" },
      { de: "the section", tr: "bölüm" },
      { de: "hypothetical", tr: "varsayımsal" },
      { de: "suspects", tr: "kuşkulanan" },
      { de: "bias", tr: "yanlılık" },
      { de: "a defence", tr: "savunma" },
      { de: "the population", tr: "anakütle" },
      { de: "valid", tr: "geçerli" },
      { de: "shorter", tr: "daha kısa" },
      { de: "mixed", tr: "karışık" },
      { de: "twice over", tr: "iki kat" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Zeynep", text: "If the sample had been larger, we would have generalized. Closed, and it stays closed: the sample is what it is." },
      { speaker: "Umut", text: "You could write it without the „if“." },
      { speaker: "Zeynep", text: "Had the sample been larger, we would have generalized. The same meaning, one word shorter, and it sounds like a paper rather than a note." },
      { speaker: "Umut", text: "And the second line?" },
      { speaker: "Zeynep", text: "If the method had been clear, the result would remain valid now. Look at the second half — „would remain“, present, because the result is on the table in front of us." },
      { speaker: "Umut", text: "Mixed." },
      { speaker: "Zeynep", text: "Mixed, and it is the only sentence in the section anybody will act on. The other two describe a study that is finished." },
      { speaker: "Umut", text: "If the sample had been biased, the result would have failed. That one is closed again." },
      { speaker: "Zeynep", text: "Closed and hypothetical twice over: it was not biased, and it did not fail. I keep it because a reader who suspects bias wants to see that we thought about it." },
      { speaker: "Umut", text: "Is that a justification or a defence?" },
      { speaker: "Zeynep", text: "Both, and the grammar does not care. What the grammar says is that the sentence is about a world we are not in." },
      { speaker: "Umut", text: "So the conclusion stays provisional." },
      { speaker: "Zeynep", text: "Provisional, and written as provisional. Anything I derive from a sample that size I have to attribute to the sample and not to the population." },
    ],
    questions: [
      {
        text: "Which sentence will people act on?",
        options: ["the mixed one", "the first one", "the third one"],
        answer: 0,
        explain: "„it is the only sentence in the section anybody will act on.“",
      },
      {
        text: "Why keep the third sentence?",
        options: ["a reader who suspects bias", "it is shorter", "it is a paper"],
        answer: 0,
        explain: "„I keep it because a reader who suspects bias wants to see that we thought about it.“",
      },
      {
        kind: "truefalse",
        text: "The sample was biased.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it was not biased, and it did not fail.“",
      },
      {
        kind: "gapfill",
        text: "___ the sample been larger, we would have generalized.",
        options: [],
        answer: 0,
        accept: ["Had", "had"],
        explain: "„Had the sample been larger, we would have generalized.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If the sample had been larger, we would have generalized.", "If the sample had been larger, we would have generalized"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "What must she attribute the result to?",
        options: [],
        answer: 0,
        accept: ["the sample", "sample", "not the population"],
        explain: "„I have to attribute to the sample and not to the population.“",
      },
    ],
  },
  {
    id: "en-b2-u13-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 13,
    title: "A tentative conclusion",
    genre: "monologue",
    intro: "Beş çekince, bir cümle. Hangisi yanlış olabilir?",
    gloss: [
      { de: "either", tr: "ikisinden biri" },
      { de: "sentence", tr: "cümle" },
      { de: "a hedge", tr: "çekince" },
      { de: "soft", tr: "yumuşak" },
      { de: "alone", tr: "tek başına" },
      { de: "declines", tr: "geri çeviriyor" },
      { de: "a weighing", tr: "tartma" },
      { de: "at all", tr: "hiç" },
      { de: "a covering letter", tr: "üst yazı" },
      { de: "care", tr: "özen" },
      { de: "answer", tr: "yanıtlamak" },
      { de: "the test", tr: "sınama" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Metin", text: "It seems to be a sensible reading. Four words of hedge before a claim of three words, which is one word of care too many." },
      { speaker: "Metin", text: "„Seems“ does the work. „Sensible“ is already a soft word, and putting the two together says less than either would alone." },
      { speaker: "Metin", text: "Apparently the check was superficial. That one is doing something useful: it reports a fact and it declines to be the person who found it." },
      { speaker: "Metin", text: "On balance the result is arguably suspicious. Two hedges again, and „on balance“ is the one to keep — it says a weighing has happened." },
      { speaker: "Metin", text: "„Arguably“ says nothing at all. It cannot be checked, it cannot be argued with, and it is there because the sentence felt too strong without it." },
      { speaker: "Metin", text: "The test I use is whether the hedge could be wrong. „On balance“ can be wrong: somebody can show that the weighing was done badly. „Arguably“ cannot." },
      { speaker: "Metin", text: "A conclusion that has been read thoroughly and then hedged exclusively with words of the second kind is a conclusion nobody has to answer." },
      { speaker: "Metin", text: "So the paragraph goes out with one hedge. Likewise the summary, and likewise the line in the covering letter, because those are the three places anybody reads." },
    ],
    questions: [
      {
        text: "Which hedge does Metin keep?",
        options: ["on balance", "arguably", "seems"],
        answer: 0,
        explain: "„„on balance“ is the one to keep — it says a weighing has happened.“",
      },
      {
        text: "What is the test?",
        options: ["whether the hedge could be wrong", "how long it is", "who wrote it"],
        answer: 0,
        explain: "„The test I use is whether the hedge could be wrong.“",
      },
      {
        kind: "truefalse",
        text: "„Arguably“ can be argued with.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It cannot be checked, it cannot be argued with…“",
      },
      {
        kind: "gapfill",
        text: "Apparently the check was ___.",
        options: [],
        answer: 0,
        accept: ["superficial"],
        explain: "„Apparently the check was superficial.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["On balance the result is arguably suspicious.", "On balance the result is arguably suspicious"],
        explain: "İki çekince: „on balance“ kalıyor, „arguably“ düşüyor.",
      },
      {
        kind: "short_answer",
        text: "How many hedges go out in the paragraph?",
        options: [],
        answer: 0,
        accept: ["one", "one hedge", "just one"],
        explain: "„So the paragraph goes out with one hedge.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u13-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 13,
    title: "The tax burden is thought to have doubled",
    genre: "info",
    intro: "Üç aktarma fiili. Hangisi ileriye bakıyor?",
    gloss: [
      { de: "is said to", tr: "olduğu söyleniyor" },
      { de: "is expected to", tr: "olması bekleniyor" },
      { de: "is thought to", tr: "olduğu düşünülüyor" },
      { de: "the measurement", tr: "ölçülmesi" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kamu borcunun arttığı söyleniyor.",
        answer: "The national debt is said to be rising.",
        hint: "„is said to“: biri söyledi, o kadar.",
      },
      {
        kind: "build",
        tr: "Bütçe açığının yine büyümesi bekleniyor.",
        answer: "The deficit is expected to grow again.",
        hint: "„is expected to“ ileriye bakıyor ve bir dayanağı var.",
      },
      {
        kind: "build",
        tr: "Vergi yükünün ikiye katlandığı düşünülüyor.",
        answer: "The tax burden is thought to have doubled.",
        hint: "„is thought to“ tutulan bir görüş; mastar geçmişe bakıyor.",
      },
      {
        kind: "build",
        tr: "Eşitsizliğin ölçülmesi burada başlıyor.",
        answer: "The measurement of inequality begins here.",
        hint: "Fiil isme dönüyor; yine „of“.",
      },
      {
        kind: "form",
        prompt: "Aktarma kartını doldur.",
        facts: "„said“ yalnızca biri söyledi demek; „thought“ tutulan bir görüş; „expected“ ileriye bakıyor; üçü aynı kalıpta duruyor.",
        fields: [
          { label: "Said", answer: "somebody said it", accept: ["no weight"] },
          { label: "Thought", answer: "a view is held", accept: ["two people"] },
          { label: "Expected", answer: "points forward", accept: ["a model"] },
          { label: "The shape", answer: "the same", accept: ["one pattern"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u13-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 13,
    title: "If the method had been clear, the result would remain valid now",
    genre: "opinion",
    intro: "İki kapalı, bir karışık ve iki adlaştırma.",
    gloss: [
      { de: "would have generalized", tr: "genelleme yapardık" },
      { de: "would remain valid", tr: "geçerli kalırdı" },
      { de: "the documentation", tr: "belgelenmesi" },
      { de: "the reduction", tr: "azaltılması" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Örneklem daha büyük olsaydı genelleme yapardık.",
        answer: "If the sample had been larger, we would have generalized.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Yöntem açık olsaydı sonuç şimdi geçerli kalırdı.",
        answer: "If the method had been clear, the result would remain valid now.",
        hint: "Karışık koşul: sonuç hâlâ masada.",
      },
      {
        kind: "build",
        tr: "Örneklem taraflı olsaydı sonuç çökerdi.",
        answer: "If the sample had been biased, the result would have failed.",
        hint: "Yine kapalı: ne taraflıydı ne de çöktü.",
      },
      {
        kind: "build",
        tr: "Ayrımcılığın belgelenmesi zorunlu.",
        answer: "The documentation of discrimination is required.",
        hint: "Yine „-ion“, yine „of“.",
      },
      {
        kind: "build",
        tr: "Önyargının azaltılması bir kuşak sürüyor.",
        answer: "The reduction of prejudice takes a generation.",
        hint: "Üçüncü adlaştırma, aynı edat.",
      },
    ],
  },
];
