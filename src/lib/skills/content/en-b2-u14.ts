import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 14 — "Fiyatı ne belirliyor, kiralar yükseliyor,
 * etkilenen grup, katılım hiç bu kadar düşük olmadı".
 *
 * Dört ders: What drives the price · Rents rising · The group affected ·
 * Never has turnout been so low.
 *
 *   Kelime: inflation, consumer, recession, minimum wage, exchange rate,
 *           interest rate, market economy, housing, residential area,
 *           overcrowded, green space, urban, population density,
 *           quality of life, migrant, migration, citizenship, asylum,
 *           deport, voter turnout, election campaign, opposition,
 *           coalition, constitution, rally, head of state.
 *   Kalıp:  What drives the price is inflation. ·
 *           It was the interest rate that changed first. ·
 *           What a consumer feels is not the average. ·
 *           Facing a housing shortage, families moved out. ·
 *           Built quickly, the residential area is overcrowded. ·
 *           Having lost its green space, the district feels urban. ·
 *           The report, which counts every migrant, is public. ·
 *           The law, which mentions migration, is new. ·
 *           My neighbour, whose citizenship is recent, votes today. ·
 *           Never has voter turnout been so low. ·
 *           Rarely does an election campaign end early. ·
 *           Only after the vote does the opposition speak.
 *
 * Ünitenin tek öğretme noktası „WHOSE“: ilgi adılının iyelik hâli.
 * Ünite 1 ve 5 „who“ ile „which“i, ünite 8 virgülü öğretmişti; burada
 * üçüncü biçim geliyor ve İngilizcenin en sade yeri: „whose“ kişide de
 * şeyde de aynı, sayıya göre de göreve göre de hiç değişmiyor.
 */
export const enB2U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u14-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 14,
    title: "The group affected",
    genre: "info",
    intro: "İlgi adılının iyelik hâli. Kişi mi, şey mi?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "appeared", tr: "göründü" },
      { de: "pronoun", tr: "adıl" },
      { de: "ordinary", tr: "olağan" },
      { de: "commas", tr: "virgüller" },
      { de: "units", tr: "üniteler" },
      { de: "either", tr: "ikisinden biri" },
      { de: "winter", tr: "kış" },
      { de: "sentences", tr: "cümleler" },
      { de: "comma", tr: "virgül" },
      { de: "possessive", tr: "iyelik" },
      { de: "an apostrophe", tr: "kesme işareti" },
      { de: "the owner", tr: "sahip" },
      { de: "alive", tr: "canlı" },
      { de: "the author", tr: "yazar" },
      { de: "the effect", tr: "etki" },
      { de: "disputes", tr: "itiraz ediyor" },
      { de: "beside", tr: "yanında" },
      { de: "refused", tr: "reddedilmiş" },
      { de: "the fix", tr: "çözüm" },
      { de: "extra", tr: "fazladan" },
      { de: "choosing", tr: "seçen" },
      { de: "an application", tr: "başvuru" },
      { de: "recent", tr: "yakın zamanlı" },
    ],
    minutes: 9,
    text:
      "My neighbour, whose citizenship is recent, votes today. One word in that sentence has not appeared in this course before, and it is „whose“.\n" +
      "„Whose“ is the possessive of the relative pronoun, and it does the job that an apostrophe does in an ordinary sentence: my neighbour's citizenship, the report's author, the law's effect. Inside a relative clause those become whose citizenship, whose author, whose effect.\n" +
      "The useful thing about it is that there is one word and no others. It works for a person — my neighbour, whose citizenship is recent. It works for a thing — the report, whose figures nobody disputes. English does not ask whether the owner is alive.\n" +
      "It also does not change for number, or for the job the clause is doing. Whose is whose, always, and the only decision left is the same one as before: with commas if the clause is extra, without them if it is choosing.\n" +
      "The report, which counts every migrant, is public. The law, which mentions migration, is new. Those two are the shapes from earlier units, and „whose“ sits beside them as the third: which for a thing, who for a person, whose for what either of them owns.\n" +
      "Where it goes wrong is with a long owner. „The family whose application for asylum was refused last winter has moved“ is correct and hard to read, and the fix is not a different pronoun. The fix is two sentences.",
    questions: [
      {
        text: "What does „whose“ do in an ordinary sentence?",
        options: ["the job of an apostrophe", "the job of a comma", "the job of „that“"],
        answer: 0,
        explain: "„it does the job that an apostrophe does in an ordinary sentence…“",
      },
      {
        text: "Does English ask whether the owner is alive?",
        options: ["no", "yes, always", "only in writing"],
        answer: 0,
        explain: "„English does not ask whether the owner is alive.“",
      },
      {
        kind: "truefalse",
        text: "„Whose“ does not change for number.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It also does not change for number, or for the job the clause is doing.“",
      },
      {
        kind: "gapfill",
        text: "My neighbour, ___ citizenship is recent, votes today.",
        options: [],
        answer: 0,
        accept: ["whose"],
        explain: "„My neighbour, whose citizenship is recent, votes today.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The report, which counts every migrant, is public.",
          "The law, which mentions migration, is new.",
          "My neighbour, whose citizenship is recent, votes today.",
          "The fix is two sentences.",
        ],
        explain: "Şey, şey, iyelik; en sonda uzun sahibin çözümü.",
      },
      {
        kind: "short_answer",
        text: "What is the fix for a long owner?",
        options: [],
        answer: 0,
        accept: ["two sentences", "splitting it", "not a pronoun"],
        explain: "„The fix is two sentences.“",
      },
    ],
  },
  {
    id: "en-b2-u14-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 14,
    title: "What drives the price",
    genre: "opinion",
    intro: "Üç yarık cümle. Üçüncüsü neyi kabul ediyor?",
    gloss: [
      { de: "plain", tr: "yalın" },
      { de: "sentence", tr: "cümle" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "whole", tr: "bütün" },
      { de: "noun", tr: "isim" },
      { de: "halves", tr: "yarılar" },
      { de: "plainly", tr: "yalın biçimde" },
      { de: "per", tr: "başına" },
      { de: "clefts", tr: "yarık cümleler" },
      { de: "a candidate", tr: "aday" },
      { de: "the light", tr: "ışık" },
      { de: "pulling", tr: "çeken" },
      { de: "admitting", tr: "kabul eden" },
      { de: "an object", tr: "nesne" },
      { de: "an attack", tr: "saldırı" },
      { de: "a statistic", tr: "istatistik" },
      { de: "the gap", tr: "açık" },
      { de: "generates", tr: "üretiyor" },
      { de: "lying", tr: "yalan söyleyen" },
      { de: "insisting", tr: "direten" },
      { de: "loud", tr: "yüksek sesli" },
      { de: "the average", tr: "ortalama" },
      { de: "misleading", tr: "yanıltıcı" },
    ],
    minutes: 9,
    text:
      "What drives the price is inflation. Not the exchange rate, not the minimum wage, not the recession that everybody is waiting for: inflation.\n" +
      "The plain version says less. „Inflation drives the price“ is a sentence about inflation and the reader can accept it and move on. The cleft makes the sentence a claim about the whole list of candidates, and a reader who disagrees now has to name a different one.\n" +
      "It was the interest rate that changed first. The second shape, with the light on a noun, and it is answering a question about order: something moved first, and this says which.\n" +
      "What a consumer feels is not the average. Now look at this one. Both halves are pulling against each other, and the sentence is admitting that the number in the table and the experience in the shop are different objects.\n" +
      "That is a hard thing to say plainly without sounding like an attack on the table. „The average is misleading“ is a claim about the statistic. „What a consumer feels is not the average“ is a claim about two things that are both true, and a market economy generates that gap every day without anybody lying.\n" +
      "One of these per section. A page of clefts is a page insisting, and a recession is already loud enough without help from the grammar.",
    questions: [
      {
        text: "What does the cleft make the sentence?",
        options: ["a claim about the whole list", "a claim about inflation", "a claim about the reader"],
        answer: 0,
        explain: "„The cleft makes the sentence a claim about the whole list of candidates…“",
      },
      {
        text: "What does the third one admit?",
        options: ["two different objects", "one mistake", "a lie"],
        answer: 0,
        explain: "„the number in the table and the experience in the shop are different objects.“",
      },
      {
        kind: "truefalse",
        text: "Somebody has to be lying for the gap to be there.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a market economy generates that gap every day without anybody lying.“",
      },
      {
        kind: "gapfill",
        text: "It was the ___ rate that changed first.",
        options: [],
        answer: 0,
        accept: ["interest"],
        explain: "„It was the interest rate that changed first.“",
      },
      {
        kind: "order",
        text: "Fiyatın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What drives the price is inflation.",
          "It was the interest rate that changed first.",
          "What a consumer feels is not the average.",
          "One of these per section.",
        ],
        explain: "Birinci biçim, ikinci biçim, karşı karşıya koyan, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "How many clefts per section?",
        options: [],
        answer: 0,
        accept: ["one", "one per section", "just one"],
        explain: "„One of these per section.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u14-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 14,
    title: "Rents rising",
    genre: "dialogue",
    intro: "Üç ortaç, bir konut raporu. Hangisi karar anlatıyor?",
    gloss: [
      { de: "participle", tr: "ortaç" },
      { de: "unit", tr: "ünite" },
      { de: "plain", tr: "yalın" },
      { de: "either", tr: "ikisinden biri" },
      { de: "sentence", tr: "cümle" },
      { de: "a shortage", tr: "sıkıntı" },
      { de: "a description", tr: "betimleme" },
      { de: "a builder", tr: "yapımcı" },
      { de: "an accident", tr: "rastlantı" },
      { de: "by accident", tr: "istemeden" },
      { de: "measurable", tr: "ölçülebilir" },
      { de: "quotes", tr: "alıntılıyor" },
      { de: "an interview", tr: "görüşme" },
      { de: "underneath", tr: "altta" },
      { de: "a district", tr: "semt" },
      { de: "moved out", tr: "taşındı" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ceyda", text: "Facing a housing shortage, families moved out. Present participle, and here it is a reason: they moved because they were facing it." },
      { speaker: "Onat", text: "Not at the same time?" },
      { speaker: "Ceyda", text: "Both, really, and that is the point from the last unit. The plain participle carries either, and the reader decides. Here only one reading makes sense of the sentence." },
      { speaker: "Onat", text: "The second line starts with the third form." },
      { speaker: "Ceyda", text: "Built quickly, the residential area is overcrowded. Passive, and nobody is named as the builder — which in a housing report is a choice and not an accident." },
      { speaker: "Onat", text: "You would name them?" },
      { speaker: "Ceyda", text: "In the paragraph underneath, with a date. The first line is a description of a place and the second is a description of a decision, and mixing those two is how a report becomes an argument by accident." },
      { speaker: "Onat", text: "And the third?" },
      { speaker: "Ceyda", text: "Having lost its green space, the district feels urban. Perfect participle, so the losing came first and the feeling came after." },
      { speaker: "Onat", text: "Is that measurable?" },
      { speaker: "Ceyda", text: "The green space is. The feeling is not, and I put them in one sentence on purpose so that nobody quotes the second half without the first." },
      { speaker: "Onat", text: "And the density?" },
      { speaker: "Ceyda", text: "Population density goes in the table with a number. Quality of life goes in the interviews, and the two are never in the same sentence." },
    ],
    questions: [
      {
        text: "What does the first participle carry here?",
        options: ["a reason", "an order", "a place"],
        answer: 0,
        explain: "„here it is a reason: they moved because they were facing it.“",
      },
      {
        text: "Why is the builder not named?",
        options: ["it is a choice", "nobody knows", "it is an accident"],
        answer: 0,
        explain: "„nobody is named as the builder — which in a housing report is a choice and not an accident.“",
      },
      {
        kind: "truefalse",
        text: "The green space can be measured and the feeling cannot.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The green space is. The feeling is not…“",
      },
      {
        kind: "gapfill",
        text: "___ quickly, the residential area is overcrowded.",
        options: [],
        answer: 0,
        accept: ["Built", "built"],
        explain: "„Built quickly, the residential area is overcrowded.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Facing a housing shortage, families moved out.", "Facing a housing shortage, families moved out"],
        explain: "Yalın ortaç burada NEDEN taşıyor.",
      },
      {
        kind: "short_answer",
        text: "Where does quality of life go?",
        options: [],
        answer: 0,
        accept: ["in the interviews", "the interviews", "not the table"],
        explain: "„Quality of life goes in the interviews…“",
      },
    ],
  },
  {
    id: "en-b2-u14-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 14,
    title: "Never has turnout been so low",
    genre: "monologue",
    intro: "Üç devrik cümle. Yanlış hangisinde çıkıyor?",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "sentence", tr: "cümle" },
      { de: "invert", tr: "devirmek" },
      { de: "verb", tr: "fiil" },
      { de: "drops", tr: "düşürüyor" },
      { de: "error", tr: "yanlış" },
      { de: "sentences", tr: "cümleler" },
      { de: "phrase", tr: "öbek" },
      { de: "inversions", tr: "devrik sıralar" },
      { de: "inverted", tr: "devrik" },
      { de: "plain", tr: "yalın" },
      { de: "a syllable", tr: "hece" },
      { de: "an ending", tr: "ek" },
      { de: "political", tr: "siyasal" },
      { de: "an analysis", tr: "çözümleme" },
      { de: "raise", tr: "yükseltmek" },
      { de: "a voice", tr: "ses" },
      { de: "meant to last", tr: "kalıcı olsun diye" },
      { de: "quoted", tr: "alıntılanmış" },
      { de: "ordinary", tr: "olağan" },
      { de: "the news", tr: "haber" },
      { de: "length", tr: "uzunluk" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Yaren", text: "Never has voter turnout been so low. „Has“ in front of the subject, and the subject here is three words long." },
      { speaker: "Yaren", text: "That length is why the shape works. „Voter turnout has never been so low“ puts the news in the middle; this puts „never“ in the first syllable of the sentence." },
      { speaker: "Yaren", text: "Rarely does an election campaign end early. Present simple, so there is nothing to invert, and „does“ arrives for the single purpose of moving." },
      { speaker: "Yaren", text: "And the main verb drops its ending. „End“, not „ends“. That is the error I see most in political writing, and it is always in the second of these sentences rather than the first." },
      { speaker: "Yaren", text: "Only after the vote does the opposition speak. A time phrase with „only“, and the same „does“ doing the same job." },
      { speaker: "Yaren", text: "Three of these in one report is two too many. I use one, in the first line, and the rest of the page is ordinary sentences about a coalition that nobody expected." },
      { speaker: "Yaren", text: "The constitution is a document with no inversions in it at all, which is worth noticing. A text meant to last does not raise its voice." },
      { speaker: "Yaren", text: "So the rally gets the inverted sentence and the analysis does not, and the head of state is quoted in plain order because that is how he said it." },
    ],
    questions: [
      {
        text: "Where does the plain version put the news?",
        options: ["in the middle", "at the front", "at the end"],
        answer: 0,
        explain: "„„Voter turnout has never been so low“ puts the news in the middle…“",
      },
      {
        text: "Where is the error?",
        options: ["in the second sentence", "in the first sentence", "in the third"],
        answer: 0,
        explain: "„it is always in the second of these sentences rather than the first.“",
      },
      {
        kind: "truefalse",
        text: "The constitution uses this shape often.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The constitution is a document with no inversions in it at all…“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ an election campaign end early.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Rarely does an election campaign end early.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Only after the vote does the opposition speak.", "Only after the vote does the opposition speak"],
        explain: "„only“ sınırlama; „does“ taşıyor, ana fiil yalın.",
      },
      {
        kind: "short_answer",
        text: "What does a text meant to last not do?",
        options: [],
        answer: 0,
        accept: ["raise its voice", "shout", "invert"],
        explain: "„A text meant to last does not raise its voice.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u14-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 14,
    title: "My neighbour, whose citizenship is recent, votes today",
    genre: "info",
    intro: "Üç ilgi adılı. Hangisi iyelik taşıyor?",
    gloss: [
      { de: "whose citizenship", tr: "vatandaşlığı olan" },
      { de: "which counts", tr: "sayan" },
      { de: "which mentions", tr: "söz eden" },
      { de: "drives", tr: "belirliyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Vatandaşlığı yeni olan komşum bugün oy veriyor.",
        answer: "My neighbour, whose citizenship is recent, votes today.",
        hint: "„whose“ ilgi adılının iyelik hâli; tek biçimi var.",
      },
      {
        kind: "build",
        tr: "Her göçmeni sayan rapor kamuya açık.",
        answer: "The report, which counts every migrant, is public.",
        hint: "Şey için „which“; virgüller cümleciği fazladan yapıyor.",
      },
      {
        kind: "build",
        tr: "Göçten söz eden kanun yeni.",
        answer: "The law, which mentions migration, is new.",
        hint: "Yine „which“; „that“ virgül almıyor.",
      },
      {
        kind: "build",
        tr: "Fiyatı belirleyen şey enflasyon.",
        answer: "What drives the price is inflation.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "form",
        prompt: "Adıl kartını doldur.",
        facts: "Şey için „which“; kişi için „who“; iyelik için „whose“; „whose“ kişide de şeyde de aynı.",
        fields: [
          { label: "A thing", answer: "which", accept: ["the report"] },
          { label: "A person", answer: "who", accept: ["my neighbour"] },
          { label: "What they own", answer: "whose", accept: ["whose citizenship"] },
          { label: "Does it change", answer: "never", accept: ["no"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u14-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 14,
    title: "Facing a housing shortage, families moved out",
    genre: "opinion",
    intro: "Üç ortaç, bir yarık cümle, bir devrik sıra.",
    gloss: [
      { de: "facing", tr: "karşılaşan" },
      { de: "built quickly", tr: "hızlı yapılan" },
      { de: "having lost", tr: "kaybettikten sonra" },
      { de: "turnout", tr: "katılım" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Konut sıkıntısıyla karşılaşan aileler taşındı.",
        answer: "Facing a housing shortage, families moved out.",
        hint: "Yalın ortaç burada NEDEN taşıyor.",
      },
      {
        kind: "build",
        tr: "Hızlı yapılan yerleşim bölgesi aşırı kalabalık.",
        answer: "Built quickly, the residential area is overcrowded.",
        hint: "Üçüncü hâlle başlıyor: yapan söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Yeşil alanını kaybettikten sonra semt kentsel hissettiriyor.",
        answer: "Having lost its green space, the district feels urban.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "İlk değişen faiz oranıydı.",
        answer: "It was the interest rate that changed first.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "Seçmen katılımı hiç bu kadar düşük olmadı.",
        answer: "Never has voter turnout been so low.",
        hint: "„has“ özneyi atlıyor; özne üç sözcük uzunluğunda.",
      },
    ],
  },
];
