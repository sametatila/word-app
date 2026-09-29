import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 12 — "Göçün sözcükleri, geçmişi kim aktarıyor,
 * yakın ne kadar yakın, gerçekten sıcak bir karşılama".
 *
 * Dört ders: The vocabulary of migration · Who reports the past ·
 * How close is close · A warm welcome indeed.
 *
 *   Kelime: immigrant background, migration flow, net migration, influx,
 *           refugee convention, reinterpret, culture of remembrance, interpretive
 *           authority, exegesis, historic preservation, customary law,
 *           venerable, kinship, lifeworld, reciprocity, socialization,
 *           pecking order, opulent, faceless, deviance, dissonance.
 *   Kalıp:  An immigrant background is not a migration flow. ·
 *           Out-migration and internal migration produce net migration. ·
 *           An influx is counted; a refugee convention is signed. ·
 *           One reinterprets the culture of remembrance; another guards the interpretive authority. ·
 *           The exegesis openly claims what the tradition merely assumes. ·
 *           To call customary law venerable is not to obey it. ·
 *           Kinship may well shape the lifeworld more than the law. ·
 *           Reciprocity might be reciprocal only in name. ·
 *           Socialization may set the pecking order before the initiation. ·
 *           The banquet was opulent; the welcome, faceless. ·
 *           We have no deviance here; we have a local custom. ·
 *           Healthy taboo breaking, they said, and rather good for the mood.
 *
 * Ünitenin tek öğretme noktası KARŞILAŞTIRMADA EKSİLTME. „…more than the
 * law“ iki ayrı cümle demek olabiliyor (hukuk mu daha az biçimlendiriyor,
 * yoksa akrabalık hukuku mu daha az biçimlendiriyor) ve cümlede seçim
 * yapan hiçbir şey yok: karşılaştırmanın ikinci yarısı fiil dışında her
 * şeyi atabildiği için, sözcüğün hangi rolde olduğunu gösterecek iz de
 * kalmıyor. Almanca bu belirsizliği ÜCRETSİZ kapatıyor — isim zaten durum
 * ekiyle geliyor, biri özne öteki nesne diyor. Ölçü: **Almanca tek harfle
 * çözüyor, İngilizcede belirsizlik onarılmadıkça kalıcı.** Tek onarım
 * fiili geri koymak („more than the law does“) ve bu, İngilizcenin küçük
 * yardımcı fiilinin dildeki yerini hak ettiği ender yerlerden biri: kendi
 * anlamı yok, yalnız gerçek bir fiilin duracağı yerde duruyor.
 */
export const enC1U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u12-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 12,
    title: "Who families turn to first",
    genre: "report",
    intro: "Göçmen kökenli ailelerin gündelik hayatını inceleyen bir araştırmanın özeti. Sorun olunca aileler önce kime başvuruyor?",
    gloss: [
      { de: "a researcher", tr: "araştırmacı" },
      { de: "a teenager", tr: "genç" },
      { de: "ill", tr: "hasta" },
      { de: "an institution", tr: "kurum" },
      { de: "a gathering", tr: "buluşma" },
      { de: "typical", tr: "tipik" },
      { de: "easily", tr: "kolayca" },
    ],
    minutes: 12,
    text:
      "FAMILIES FIRST: WHAT A NEW STUDY FOUND IN THREE NEIGHBORHOODS\n" +
      "For two years, a team from the city university followed 140 families with an immigrant background in three neighborhoods. The question was simple: when a family has a problem, who does it turn to first?\n" +
      "The answer surprised the researchers. Kinship may well shape the lifeworld of these families more than the law does. When a teenager needed a summer job, an uncle found one faster than the employment office did. When a grandmother fell ill, cousins organized her care long before any social service had answered a letter.\n" +
      "This does not mean that the families trust the state less than their neighbors do. Most of those interviewed said they valued public institutions more than their parents had. But institutions are slow, and a phone call to an aunt takes two minutes.\n" +
      "The study also looked at reciprocity. Help was expected to go both ways, yet in practice it might be reciprocal only in name: younger family members gave far more hours than they received, and women gave more than men did.\n" +
      "Socialization may set the pecking order long before any formal initiation. Children learned early who made the decisions at family gatherings, and that order changed less over the two years than income did.\n" +
      "The researchers are careful with their conclusions. The sample was small, and the three neighborhoods may not be typical. Still, they argue that social services might reach families more easily if they worked with these networks rather than around them.\n" +
      "The full report will be presented at the town hall on June 3.",
    questions: [
      {
        text: "How many families did the team follow?",
        options: ["140", "3", "2"],
        answer: 0,
        explain: "„a team from the city university followed 140 families with an immigrant background in three neighborhoods.“",
      },
      {
        text: "Who found a summer job faster?",
        options: ["an uncle", "the employment office", "a cousin"],
        answer: 0,
        explain: "„an uncle found one faster than the employment office did.“",
      },
      {
        kind: "truefalse",
        text: "Younger family members gave more hours than they received.",
        options: ["True", "False"],
        answer: 0,
        explain: "„younger family members gave far more hours than they received…“",
      },
      {
        kind: "gapfill",
        text: "Kinship may well shape the lifeworld of these families more than the law ___.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Kinship may well shape the lifeworld of these families more than the law does.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The team followed families for two years.",
          "An uncle found a summer job.",
          "Younger members gave more hours.",
          "The report will be presented at the town hall.",
        ],
        explain: "Araştırma, akrabalık, karşılıklılık; en sonda sunum.",
      },
      {
        kind: "short_answer",
        text: "Where will the report be presented?",
        options: [],
        answer: 0,
        accept: ["at the town hall", "the town hall", "town hall"],
        explain: "„The full report will be presented at the town hall on June 3.“",
      },
    ],
  },
  {
    id: "en-c1-u12-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 12,
    title: "Behind this year's migration figures",
    genre: "opinion",
    intro: "Bölgenin göç rakamlarını yorumlayan bir köşe yazısı. Tek bir net sayının arkasında ne var?",
    gloss: [
      { de: "statistics", tr: "istatistik" },
      { de: "a region", tr: "bölge" },
      { de: "appear", tr: "çıkmak" },
      { de: "produce", tr: "ortaya çıkarmak" },
      { de: "indeed", tr: "gerçekten" },
      { de: "an arrival", tr: "yeni gelen" },
      { de: "an engineer", tr: "mühendis" },
      { de: "an apprenticeship", tr: "çıraklık" },
      { de: "exist", tr: "var olmak" },
      { de: "the countryside", tr: "kırsal" },
    ],
    minutes: 12,
    text:
      "Every January the statistics office publishes the migration figures for our region, and every January the same headline appears: „Record influx“. This year it is worth reading past the headline.\n" +
      "Out-migration and internal migration produce net migration, and the net figure for last year was indeed high: about 4,000 more people arrived than left. But behind that single number are two much larger ones. Some 11,000 people moved here, and 7,000 moved away, most of them young people leaving for the big cities.\n" +
      "An influx is counted; a refugee convention is signed. The 11,000 arrivals include about 900 refugees, who came because our country signed an agreement more than seventy years ago and has kept it. The rest are students, nurses, engineers and families joining relatives who have lived here for decades.\n" +
      "An immigrant background is not a migration flow. Our mayor has an immigrant background, and so do a third of the teachers at the local high school. None of them arrived last year, and none of them is part of any flow.\n" +
      "Why does this matter? Because the numbers are used to make decisions. If the region is losing young people, it needs apprenticeships and cheaper housing. If it is gaining nurses, it needs language courses that fit around night shifts.\n" +
      "I am not asking anyone to ignore the figures. I am asking that they be read in full. A region that only looks at the net number will plan for a population that does not exist: one that neither arrives nor leaves.\n" +
      "The full tables are available on the statistics office website, and they are free.",
    questions: [
      {
        text: "What headline appears every January?",
        options: ["Record influx", "Young people leave", "Nurses wanted"],
        answer: 0,
        explain: "„every January the same headline appears: ‚Record influx‘.“",
      },
      {
        text: "Where did most of the people who left go?",
        options: ["to the big cities", "abroad", "to the countryside"],
        answer: 0,
        explain: "„most of them young people leaving for the big cities.“",
      },
      {
        kind: "truefalse",
        text: "Most of last year's arrivals were refugees.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The 11,000 arrivals include about 900 refugees…“",
      },
      {
        kind: "gapfill",
        text: "Out-migration and internal migration produce net ___.",
        options: [],
        answer: 0,
        accept: ["migration"],
        explain: "„Out-migration and internal migration produce net migration…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The same headline appears every January.",
          "About 11,000 people moved to the region.",
          "The mayor has an immigrant background.",
          "The full tables are free online.",
        ],
        explain: "Manşet, rakamların ayrıntısı, kişiler; en sonda tabloların yeri.",
      },
      {
        kind: "short_answer",
        text: "What does a region need if it is losing young people?",
        options: [],
        answer: 0,
        accept: ["apprenticeships and cheaper housing", "apprenticeships", "cheaper housing"],
        explain: "„If the region is losing young people, it needs apprenticeships and cheaper housing.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u12-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 12,
    title: "A welcome dinner at a new job",
    genre: "dialogue",
    intro: "Yeni işteki karşılama yemeği üzerine bir sohbet. Yemek mi sıcaktı, karşılama mı?",
    gloss: [
      { de: "finance", tr: "finans" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Mert", text: "So, how was the welcome dinner? You were so nervous about it." },
      { speaker: "İpek", text: "The banquet was opulent; the welcome, faceless. Four courses, a band, flowers on every table, and nobody asked me a single question." },
      { speaker: "Mert", text: "Nobody talked to you at all?" },
      { speaker: "İpek", text: "My manager said hello and then sat with the directors. I spent two hours next to a man from accounting who talked about his boat." },
      { speaker: "Mert", text: "That sounds rather lonely." },
      { speaker: "İpek", text: "It was. And then at midnight everybody took their shoes off and danced on the chairs." },
      { speaker: "Mert", text: "On the chairs? Is that normal there?" },
      { speaker: "İpek", text: "That is what I asked. My neighbor laughed and said: we have no deviance here; we have a local custom. Apparently they do it every year." },
      { speaker: "Mert", text: "And the directors joined in?" },
      { speaker: "İpek", text: "The director of finance was first. Healthy taboo breaking, he said, and rather good for the mood." },
      { speaker: "Mert", text: "So maybe it was not so faceless after all." },
      { speaker: "İpek", text: "Maybe not. On Monday three people from the dancing came to my desk to say hello. The tables were formal, but the chairs were friendly." },
    ],
    questions: [
      {
        text: "Who sat next to İpek?",
        options: ["a man from accounting", "her manager", "the director of finance"],
        answer: 0,
        explain: "„I spent two hours next to a man from accounting who talked about his boat.“",
      },
      {
        text: "What happened at midnight?",
        options: ["Everybody danced on the chairs.", "The band went home.", "The directors gave a speech."],
        answer: 0,
        explain: "„at midnight everybody took their shoes off and danced on the chairs.“",
      },
      {
        kind: "truefalse",
        text: "The dancing happens every year.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Apparently they do it every year.“",
      },
      {
        kind: "gapfill",
        text: "We have no deviance here; we have a local ___.",
        options: [],
        answer: 0,
        accept: ["custom"],
        explain: "„we have no deviance here; we have a local custom.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The banquet was opulent; the welcome, faceless.", "The banquet was opulent; the welcome, faceless"],
        explain: "İkinci yarıda fiil yok; iki yarı birbirine yaslanıyor.",
      },
      {
        kind: "short_answer",
        text: "How many people came to her desk on Monday?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three people"],
        explain: "„On Monday three people from the dancing came to my desk to say hello.“",
      },
    ],
  },
  {
    id: "en-c1-u12-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 12,
    title: "The harbor plaque that took four years",
    genre: "monologue",
    intro: "Yerel bir tarihçinin podcast bölümü: dört yıl süren bir anma plaketi tartışması. Kim neyi korudu?",
    gloss: [
      { de: "a plaque", tr: "plaket" },
      { de: "a harbor", tr: "liman" },
      { de: "history", tr: "tarih" },
      { de: "a pay slip", tr: "maaş bordrosu" },
      { de: "a historian", tr: "tarihçi" },
      { de: "simply", tr: "sadece" },
      { de: "assume", tr: "varsaymak" },
      { de: "unveil", tr: "açılışını yapmak" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Kerem", text: "Welcome back to Old Town Stories. Today: the plaque that took four years." },
      { speaker: "Kerem", text: "In 2019 the town museum decided to add a new plaque about the workers who built the harbor. Most of them came from abroad, and the old plaque did not mention them." },
      { speaker: "Kerem", text: "One group wanted to reinterpret the culture of remembrance and tell the story of the harbor as the story of the people who built it." },
      { speaker: "Kerem", text: "Another group guarded the interpretive authority. The history society had written every plaque in town since 1950, and it did not want to give that up." },
      { speaker: "Kerem", text: "Nobody argued about the dates. The workers came in 1962, and the harbor opened in 1968. The argument was about who decides what a plaque says." },
      { speaker: "Kerem", text: "In the end, the museum asked the families of the workers. Forty of them sent photographs, letters and a pay slip from 1963." },
      { speaker: "Kerem", text: "The historian who wrote the new text put the debate like this. The exegesis openly claims what the tradition merely assumes." },
      { speaker: "Kerem", text: "The old plaque simply assumed that the harbor had built itself. The new one names the hands that built it." },
      { speaker: "Kerem", text: "It was unveiled last Sunday. It is longer than the old one, and it has twelve names on it." },
      { speaker: "Kerem", text: "Next week: the customs of the fishing families. To call a custom venerable is not to obey it, and the daughters of the harbor have a story to tell." },
    ],
    questions: [
      {
        text: "What did the old plaque not mention?",
        options: ["the workers from abroad", "the dates", "the history society"],
        answer: 0,
        explain: "„Most of them came from abroad, and the old plaque did not mention them.“",
      },
      {
        text: "When did the harbor open?",
        options: ["in 1968", "in 1962", "in 1950"],
        answer: 0,
        explain: "„The workers came in 1962, and the harbor opened in 1968.“",
      },
      {
        kind: "truefalse",
        text: "People argued about the dates.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody argued about the dates.“",
      },
      {
        kind: "gapfill",
        text: "Another group guarded the interpretive ___.",
        options: [],
        answer: 0,
        accept: ["authority"],
        explain: "„Another group guarded the interpretive authority.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The exegesis openly claims what the tradition merely assumes.", "The exegesis openly claims what the tradition merely assumes"],
        explain: "Metin ile gelenek: biri açıkça iddia ediyor, öteki yalnızca varsayıyor.",
      },
      {
        kind: "short_answer",
        text: "How many names are on the new plaque?",
        options: [],
        answer: 0,
        accept: ["twelve", "12", "twelve names"],
        explain: "„it has twelve names on it.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u12-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 12,
    title: "Family, law and migration",
    genre: "info",
    intro: "Aile, hukuk ve göç üzerine bir araştırmadan cümleler: bulguları yaz, sonra özet kartını doldur.",
    gloss: [
      { de: "kinship", tr: "akrabalık" },
      { de: "a lifeworld", tr: "yaşam dünyası" },
      { de: "reciprocity", tr: "karşılıklılık" },
      { de: "socialization", tr: "toplumsallaşma" },
      { de: "a pecking order", tr: "sıra düzeni" },
      { de: "an influx", tr: "akın" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Akrabalık yaşam dünyasını pekâlâ hukuktan daha çok biçimlendiriyor olabilir.",
        answer: "Kinship may well shape the lifeworld more than the law.",
        hint: "İki okuması var ve cümlede seçen bir şey yok.",
      },
      {
        kind: "build",
        tr: "Karşılıklılık yalnız adında mütekabil olabilir.",
        answer: "Reciprocity might be reciprocal only in name.",
        hint: "„Only in name“ söyleneni yadsımadan geri alıyor.",
      },
      {
        kind: "build",
        tr: "Toplumsallaşma sıra düzenini erginlenmeden önce kurabilir.",
        answer: "Socialization may set the pecking order before the initiation.",
        hint: "Zaman sözcüğü özne diye okunamaz; bu yüzden güvenli.",
      },
      {
        kind: "build",
        tr: "Göçmen kökeni bir göç akışı değildir.",
        answer: "An immigrant background is not a migration flow.",
        hint: "Biri kişi hakkında, öteki sayı hakkında.",
      },
      {
        kind: "build",
        tr: "Bir akın sayılır; bir mülteci sözleşmesi imzalanır.",
        answer: "An influx is counted; a refugee convention is signed.",
        hint: "İki edilgen, iki ayrı tür: biri usul gizliyor, öteki imza.",
      },
      {
        kind: "form",
        prompt: "Araştırma için özet kartını doldur.",
        facts: "Şehir üniversitesinden bir ekip iki yıl boyunca üç mahallede 140 aileyi izledi; aileler sorun olunca önce akrabalarına başvuruyor; genç aile üyeleri aldıklarından çok daha fazla saat veriyor; rapor 3 Haziran'da belediye binasında sunulacak.",
        fields: [
          { label: "Families in the study", answer: "140", accept: ["140 families"] },
          { label: "Length of the study", answer: "two years", accept: ["2 years"] },
          { label: "First help comes from", answer: "relatives", accept: ["the family", "family members", "kinship"] },
          { label: "Give more than they receive", answer: "younger family members", accept: ["younger members", "the young"] },
          { label: "Presentation", answer: "June 3 at the town hall", accept: ["June 3", "at the town hall", "the town hall"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u12-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 12,
    title: "Tradition and its readers",
    genre: "info",
    intro: "Gelenek, anma ve karşılama üzerine cümleler: bir tartışmada söylenenleri İngilizce yaz.",
    gloss: [
      { de: "culture of remembrance", tr: "hatırlama kültürü" },
      { de: "an exegesis", tr: "metin yorumu" },
      { de: "customary law", tr: "örf ve âdet hukuku" },
      { de: "venerable", tr: "saygıdeğer" },
      { de: "opulent", tr: "şatafatlı" },
      { de: "deviance", tr: "normdan sapma" },
      { de: "assume", tr: "varsaymak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Biri hatırlama kültürünü yeniden yorumluyor; bir başkası yorum yetkisini koruyor.",
        answer: "One reinterprets the culture of remembrance; another guards the interpretive authority.",
        hint: "İki fiilden yalnız biri geçmiş hakkında.",
      },
      {
        kind: "build",
        tr: "Metin yorumu, geleneğin yalnızca varsaydığını açıkça iddia ediyor.",
        answer: "The exegesis openly claims what the tradition merely assumes.",
        hint: "Varsayımın savunulması gerekmiyor, çünkü yazılmamış.",
      },
      {
        kind: "build",
        tr: "Örf ve âdet hukukuna saygıdeğer demek ona uymak değildir.",
        answer: "To call customary law venerable is not to obey it.",
        hint: "Olumsuz mastar biçimi bir çıkarımı reddediyor.",
      },
      {
        kind: "build",
        tr: "Ziyafet şatafatlıydı; karşılama, kimliksiz.",
        answer: "The banquet was opulent; the welcome, faceless.",
        hint: "Masaya harcanan her şey, konuğa hiçbir şey.",
      },
      {
        kind: "build",
        tr: "Burada normdan sapma yok, yerel bir âdet var.",
        answer: "We have no deviance here; we have a local custom.",
        hint: "Aynı nefeste yadsıma ve kabul.",
      },
    ],
  },
];
