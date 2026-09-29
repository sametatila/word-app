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
 *           My neighbor, whose citizenship is recent, votes today. ·
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
    title: "A new citizen votes",
    genre: "article",
    intro: "Yerel gazetede bir haber: yeni vatandaş olan bir kadın ilk kez oy veriyor. Ona en çok ne yardım etti?",
    gloss: [
      { de: "a polling station", tr: "oy verme yeri" },
      { de: "a port", tr: "liman" },
      { de: "a citizen", tr: "vatandaş" },
      { de: "border", tr: "sınır komşusu olmak" },
    ],
    minutes: 9,
    text:
      "FIRST VOTE AT SIXTY-TWO\n" +
      "Amira Haddad, whose citizenship came through in March, voted for the first time today. She arrived at the polling station in the old school at seven o'clock, an hour before it opened.\n" +
      "Amira came to the city in 1998 as a migrant worker. Her husband, whose family still lives in Syria, worked at the port for twenty years. Their three children, who were all born here, have been citizens since birth.\n" +
      "„I have paid taxes for twenty-five years,“ she says. „Today, for the first time, my opinion counts.“\n" +
      "The process was not easy. The citizenship test, which includes questions on the constitution, took her two attempts. The language course, whose teacher she still visits every Friday, helped the most.\n" +
      "Her neighbor Tom, whose garden borders hers, walked with her to the station. „She has been part of this street longer than I have,“ he says.\n" +
      "The city report on migration, which was published last month, shows that about 4,000 residents became citizens in the last five years. Many of them, like Amira, are voting in a national election for the first time.\n" +
      "After voting, Amira had tea with the volunteers, whose job it is to help people who vote for the first time. „I was nervous,“ she laughs. „But it took two minutes. Twenty-five years, and then two minutes.“",
    questions: [
      {
        text: "When did Amira get her citizenship?",
        options: ["in March", "in 1998", "last month"],
        answer: 0,
        explain: "„Amira Haddad, whose citizenship came through in March, voted for the first time today.“",
      },
      {
        text: "What helped Amira the most?",
        options: ["the language course", "the citizenship test", "her neighbor"],
        answer: 0,
        explain: "„The language course, whose teacher she still visits every Friday, helped the most.“",
      },
      {
        kind: "truefalse",
        text: "Amira needed two attempts to pass the citizenship test.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The citizenship test, which includes questions on the constitution, took her two attempts.“",
      },
      {
        kind: "gapfill",
        text: "Her neighbor Tom, ___ garden borders hers, walked with her to the station.",
        options: [],
        answer: 0,
        accept: ["whose"],
        explain: "„Her neighbor Tom, whose garden borders hers, walked with her to the station.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Amira arrived at the polling station at seven.",
          "She came to the city in 1998.",
          "Tom walked with her to the station.",
          "She had tea with the volunteers.",
        ],
        explain: "Oy verme sabahı, geçmişi, komşusu, en sonda gönüllülerle çay.",
      },
      {
        kind: "short_answer",
        text: "How long did voting take?",
        options: [],
        answer: 0,
        accept: ["two minutes", "2 minutes", "about two minutes"],
        explain: "„But it took two minutes.“",
      },
    ],
  },
  {
    id: "en-b2-u14-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 14,
    title: "Why bread costs more",
    genre: "article",
    intro: "Bir ekonomi köşesinde okur sorusu: hükûmet enflasyon düşüyor diyor, fiyatlar neden hâlâ yüksek?",
    gloss: [
      { de: "a mortgage", tr: "konut kredisi" },
      { de: "the government", tr: "hükûmet" },
      { de: "a baker", tr: "fırıncı" },
      { de: "flour", tr: "un" },
      { de: "spring", tr: "ilkbahar" },
      { de: "a loan", tr: "kredi" },
      { de: "transport", tr: "ulaşım" },
      { de: "wheat", tr: "buğday" },
      { de: "profit", tr: "kâr" },
      { de: "rise", tr: "yükselmek" },
      { de: "a flat", tr: "daire" },
    ],
    minutes: 9,
    text:
      "ASK THE ECONOMIST: WHY DOES EVERYTHING COST MORE?\n" +
      "A reader writes: „My rent, my bread and my bus ticket have all gone up. The government says inflation is falling. Who is right?“\n" +
      "You both are. What drives the price of your bread is inflation from last year, not this year. Bakers buy flour months in advance, so what you pay today reflects old costs.\n" +
      "It was the interest rate that changed first. When the central bank raised it in the spring, loans became more expensive, and landlords with a mortgage passed that cost on to their tenants. That is why your rent rose even while other prices calmed down.\n" +
      "What a consumer feels is not the average. The official figure includes cars, computers and holidays, whose prices have hardly moved. If you spend most of your money on food, rent and transport, your personal inflation is much higher than the national number.\n" +
      "What the government means is that prices are rising more slowly. What it does not mean is that they are falling. Very few prices ever go back down.\n" +
      "So what can you do? It is the fixed costs that are worth checking: your energy contract, your phone plan, your insurance. A single phone call can often save more than a month of cheaper shopping.",
    questions: [
      {
        text: "Why does bread cost more today?",
        options: ["Bakers buy flour months in advance.", "Bakers want more profit.", "There is less wheat this year."],
        answer: 0,
        explain: "„Bakers buy flour months in advance, so what you pay today reflects old costs.“",
      },
      {
        text: "Why did the rent of the reader rise?",
        options: ["Landlords passed on higher loan costs.", "The city built new flats.", "Energy prices went up."],
        answer: 0,
        explain: "„When the central bank raised it in the spring, loans became more expensive, and landlords with a mortgage passed that cost on to their tenants.“",
      },
      {
        kind: "truefalse",
        text: "According to the government, prices are falling.",
        options: ["True", "False"],
        answer: 1,
        explain: "„What the government means is that prices are rising more slowly. What it does not mean is that they are falling.“",
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
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Bread prices reflect old costs.",
          "Rents rose after the interest rate changed.",
          "Personal inflation can be higher than the average.",
          "Fixed costs are worth checking.",
        ],
        explain: "Ekmek, kira, kişisel enflasyon, en sonda öneri.",
      },
      {
        kind: "short_answer",
        text: "Which costs are worth checking?",
        options: [],
        answer: 0,
        accept: ["the fixed costs", "fixed costs", "energy, phone and insurance"],
        explain: "„It is the fixed costs that are worth checking: your energy contract, your phone plan, your insurance.“",
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
    title: "Twenty years in Riverside",
    genre: "interview",
    intro: "Bir radyo programı mahallede yirmi yıl yaşamış Ceyda'yla konuşuyor. Mahalle nasıl değişti?",
    gloss: [
      { de: "an investor", tr: "yatırımcı" },
      { de: "a flat", tr: "daire" },
      { de: "spring", tr: "ilkbahar" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Onat", text: "Ceyda, you have lived in Riverside for twenty years. How has it changed?" },
      { speaker: "Ceyda", text: "A lot. Facing a housing shortage, many young families moved out in the last five years. My own daughter left for a town an hour away." },
      { speaker: "Onat", text: "Why was there a shortage?" },
      { speaker: "Ceyda", text: "Rents doubled. Bought by investors, half of the old flats became holiday apartments." },
      { speaker: "Onat", text: "And the new buildings by the river?" },
      { speaker: "Ceyda", text: "Built quickly, the residential area is overcrowded. Some flats have four people in two rooms, and the walls are thin." },
      { speaker: "Onat", text: "What about the park?" },
      { speaker: "Ceyda", text: "Having lost its green space, the district feels urban in a way it never did. The children play in the car park now." },
      { speaker: "Onat", text: "Is anything getting better?" },
      { speaker: "Ceyda", text: "Yes. Supported by the city, a group of neighbors opened a community garden last spring. Walking past it in the evening, you see people talking again." },
      { speaker: "Onat", text: "Would you ever leave?" },
      { speaker: "Ceyda", text: "No. Having spent half my life here, I want to see what happens next. Somebody has to remember what it was like." },
    ],
    questions: [
      {
        text: "Why did many young families move out?",
        options: ["They faced a housing shortage.", "The schools closed.", "They found jobs abroad."],
        answer: 0,
        explain: "„Facing a housing shortage, many young families moved out in the last five years.“",
      },
      {
        text: "Who bought half of the old flats?",
        options: ["investors", "the city", "young families"],
        answer: 0,
        explain: "„Bought by investors, half of the old flats became holiday apartments.“",
      },
      {
        kind: "truefalse",
        text: "The children now play in the car park.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The children play in the car park now.“",
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
        accept: [
          "Facing a housing shortage, many young families moved out in the last five years.",
          "Facing a housing shortage, many young families moved out in the last five years",
        ],
        explain: "Yalın ortaç burada NEDEN taşıyor.",
      },
      {
        kind: "short_answer",
        text: "What did the neighbors open last spring?",
        options: [],
        answer: 0,
        accept: ["a community garden", "community garden", "a garden"],
        explain: "„Supported by the city, a group of neighbors opened a community garden last spring.“",
      },
    ],
  },
  {
    id: "en-b2-u14-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 14,
    title: "Election night in the capital",
    genre: "monologue",
    intro: "Seçim gecesi başkentten canlı radyo haberi. Katılım ne kadar düşük?",
    gloss: [
      { de: "the capital", tr: "başkent" },
      { de: "the polls", tr: "sandıklar" },
      { de: "a majority", tr: "çoğunluk" },
      { de: "the government", tr: "hükûmet" },
      { de: "a minister", tr: "bakan" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Yaren", text: "Good evening from the capital, where the polls closed an hour ago. Never has voter turnout been so low: just forty-one percent, according to the first figures." },
      { speaker: "Yaren", text: "Rarely does an election campaign end as quietly as this one. There were no big rallies in the last week, and many voters told us they had not decided until this morning." },
      { speaker: "Yaren", text: "The governing coalition is expected to lose its majority. Only after the last votes are counted does the result become official, but the first numbers are clear." },
      { speaker: "Yaren", text: "The opposition has been silent all evening. Only after the final result does its leader plan to speak. That will probably be around midnight." },
      { speaker: "Yaren", text: "Not since 1994 has a government lost so many seats in one election. Two ministers have already lost their own seats." },
      { speaker: "Yaren", text: "The head of state will meet the party leaders tomorrow morning. Under the constitution, he must ask the largest party to try to form a government first." },
      { speaker: "Yaren", text: "So the big question tonight is not who won, but who can work together. Rarely has a coalition been so hard to predict." },
      { speaker: "Yaren", text: "We will be back at eleven with the first reactions. From the capital, this is Yaren Koç." },
    ],
    questions: [
      {
        text: "What was the voter turnout?",
        options: ["forty-one percent", "fourteen percent", "ninety-one percent"],
        answer: 0,
        explain: "„Never has voter turnout been so low: just forty-one percent, according to the first figures.“",
      },
      {
        text: "When will the opposition leader probably speak?",
        options: ["around midnight", "tomorrow morning", "at eleven"],
        answer: 0,
        explain: "„That will probably be around midnight.“",
      },
      {
        kind: "truefalse",
        text: "There were many big rallies in the last week.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There were no big rallies in the last week, and many voters told us they had not decided until this morning.“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ an election campaign end as quietly as this one.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Rarely does an election campaign end as quietly as this one.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Only after the final result does its leader plan to speak.", "Only after the final result does its leader plan to speak"],
        explain: "„only“ sınırlama; „does“ taşıyor, ana fiil yalın.",
      },
      {
        kind: "short_answer",
        text: "Whom will the head of state meet tomorrow?",
        options: [],
        answer: 0,
        accept: ["the party leaders", "party leaders", "the leaders"],
        explain: "„The head of state will meet the party leaders tomorrow morning.“",
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
    title: "Migration and citizenship",
    genre: "info",
    intro: "Yerel gazetenin seçim haberi için notlar yaz: yeni bir seçmeni ve şehir raporunu tanıt.",
    gloss: [
      { de: "whose citizenship", tr: "vatandaşlığı … olan" },
      { de: "which counts", tr: "sayan" },
      { de: "which mentions", tr: "söz eden" },
      { de: "drives", tr: "belirliyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Vatandaşlığı yeni olan komşum bugün oy veriyor.",
        answer: "My neighbor, whose citizenship is recent, votes today.",
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
        prompt: "Yerel gazete için seçmen kartını doldur.",
        facts: "Amira Haddad'ın vatandaşlığı martta çıktı; vatandaşlık sınavını ikinci denemede geçti; ona en çok, öğretmenini hâlâ her cuma ziyaret ettiği dil kursu yardım etti; oy vermek iki dakika sürdü.",
        fields: [
          { label: "Voter", answer: "Amira Haddad", accept: ["Amira"] },
          { label: "Citizenship", answer: "since March", accept: ["March", "in March"] },
          { label: "Citizenship test", answer: "two attempts", accept: ["the second attempt", "second attempt"] },
          { label: "Most helpful", answer: "the language course", accept: ["language course"] },
          { label: "Time to vote", answer: "two minutes", accept: ["2 minutes"] },
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
    title: "A changing neighborhood",
    genre: "opinion",
    intro: "Değişen bir mahalleyi anlatan cümleler kur: ne oldu, neden oldu?",
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
        tr: "Konut sıkıntısıyla karşı karşıya kaldıkları için aileler taşındı.",
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
        tr: "Yeşil alanını kaybettikten sonra semt kentsel bir hava taşıyor.",
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
        hint: "„has“ özneyi atlıyor; özne iki sözcük uzunluğunda.",
      },
    ],
  },
];
