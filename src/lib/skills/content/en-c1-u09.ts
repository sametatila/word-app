import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 9 — "Anlatıcı nerede duruyor, bir metni aktarmak,
 * klasiğin dili, şiirin dışarıda bıraktıkları".
 *
 * Dört ders: Where the narrator stands · Reporting a text ·
 * The language of the classic · What the poem leaves out.
 *
 *   Kelime: narrative perspective, novella, topos, canon, contextualize,
 *           decipher, dissect, interpretive framework, ideological,
 *           Enlightenment, metaphysics, epistemology, paradoxical,
 *           fragmentary, contemplative, reminiscence, lore, relic,
 *           cipher, zeitgeist, epochal.
 *   Kalıp:  What the narrative perspective does is withhold. ·
 *           Into the novella creeps a monologue. ·
 *           The topos we know; the canon we argue about. ·
 *           She contextualizes it; he deciphers it; they dissect it. ·
 *           The interpretive framework openly claims what the reading merely assumes. ·
 *           To call a text ideological is not to read it. ·
 *           The Enlightenment demanded that reason be free. ·
 *           Were it not for metaphysics, epistemology would be simpler. ·
 *           They ask that no claim be paradoxical. ·
 *           The poem is fragmentary; the reader, contemplative. ·
 *           A reminiscence survives as lore, a relic as a cipher. ·
 *           The zeitgeist felt epochal; the decade did not.
 *
 * Ünitenin tek öğretme noktası BAĞLAÇSIZ KOŞUL: fiil kendi cümleciğinin
 * başına geçiyor, „if“ atılıyor, koşul anlamını yalnız söz dizimi taşıyor.
 * Yeniden ölçüm bu kez ender bir yerden çıkıyor — MEKANİZMA AYNI. Almanca
 * da fiili başa alıp bağlacı atıyor; ayrım yapıda değil KATTA: Almancada
 * hareket sıradan (mutfakta da duyulur), İngilizcede işaretli (sayfaya
 * ait). Aynı cümleyi iki dil de sahipleniyor ama farklı fiyata kiralıyor;
 * kendi günlük biçimini olduğu gibi çeviren bir Alman konuşucu üç kat
 * yukarıda bir kayda çıkıyor. İkinci ölçü ünite 7'nin geri dönüşü:
 * şiirde silme yeniden görünüyor, ama burada işlevi vurgu değil boşluk.
 * Üçüncüsü: „üç fiile kapalı liste“ (were/had/should) B2'deki „Almanca
 * düzenli, İngilizce listeli“ ölçüsünün bu seviyedeki karşılığı.
 */
export const enC1U09: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u09-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "Philosophy at the public library",
    genre: "article",
    intro: "Halk kütüphanesinde yetişkinlere açık bir felsefe kursu. Katılımcılar oraya neden geliyor?",
    gloss: [
      { de: "a pot", tr: "demlik" },
      { de: "retired", tr: "emekli oldu" },
      { de: "a lecture hall", tr: "amfi" },
      { de: "awake", tr: "uyanık" },
      { de: "aloud", tr: "sesli" },
      { de: "philosophy", tr: "felsefe" },
      { de: "survive", tr: "ayakta kalmak" },
      { de: "a café", tr: "kafe" },
      { de: "the Enlightenment", tr: "Aydınlanma" },
      { de: "epistemology", tr: "bilgi kuramı" },
      { de: "metaphysics", tr: "metafizik" },
      { de: "a grant", tr: "hibe" },
      { de: "poetry", tr: "şiir" },
    ],
    minutes: 12,
    text:
      "Every Thursday at seven, the reading room of the Eastfield public library fills with thirty adults, a pot of tea and one question. Last week the question was simple: how do we know anything at all?\n" +
      "The course is run by Dr. Paul Rossi, who taught at the university for twenty years before he retired. Had he stayed in the lecture hall, he says, he would never have met a better group of students. „They have jobs and children,“ he says. „They do not come because they have to. They come because the questions keep them awake.“\n" +
      "The first six weeks covered the Enlightenment and its demand that reason be free. The next six turn to epistemology, the study of what we can know. Were it not for metaphysics, Paul jokes, epistemology would be simpler, and several people laughed before they understood why.\n" +
      "Should you decide to join, you will not need any books. Paul brings short texts, usually no longer than a page, and reads them aloud. Then he asks one question and waits. Had I not seen it myself, I would not have believed how long thirty people can think in silence.\n" +
      "There are no exams and no grades. Were there a test at the end, Paul says, half the room would stop asking questions and start collecting answers.\n" +
      "The course is free, paid for by a small grant from the city. Should the grant end next year, as the library fears, the course may move to a café. Paul is not worried. „Philosophy started in the market square,“ he says. „It can survive a café.“\n" +
      "The next course begins in October. Should you want a place, sign up at the front desk; the last course was full within two days.",
    questions: [
      {
        text: "How many adults come to the course?",
        options: ["thirty", "twenty", "seven"],
        answer: 0,
        explain: "„the reading room of the Eastfield public library fills with thirty adults, a pot of tea and one question.“",
      },
      {
        text: "What did the first six weeks cover?",
        options: ["the Enlightenment", "epistemology", "poetry"],
        answer: 0,
        explain: "„The first six weeks covered the Enlightenment and its demand that reason be free.“",
      },
      {
        kind: "truefalse",
        text: "Students do not need to buy books.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Should you decide to join, you will not need any books.“",
      },
      {
        kind: "gapfill",
        text: "Were there a ___ at the end, half the room would stop asking questions.",
        options: [],
        answer: 0,
        accept: ["test"],
        explain: "„Were there a test at the end, Paul says, half the room would stop asking questions and start collecting answers.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Paul Rossi taught at the university for twenty years.",
          "The first six weeks covered the Enlightenment.",
          "There are no exams and no grades.",
          "The next course begins in October.",
        ],
        explain: "Öğretmen, dersin içeriği, sınavsız düzen, en sonda kayıt.",
      },
      {
        kind: "short_answer",
        text: "Where may the course move if the grant ends?",
        options: [],
        answer: 0,
        accept: ["to a café", "a café"],
        explain: "„Should the grant end next year, as the library fears, the course may move to a café.“",
      },
    ],
  },
  {
    id: "en-c1-u09-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "A novella about a flooded village",
    genre: "review",
    intro: "Baraj için sular altında kalacak bir köyü anlatan kısa romanın eleştirisi. Eleştirmen neyi beğeniyor, neyi eksik buluyor?",
    gloss: [
      { de: "a dam", tr: "baraj" },
      { de: "an engineer", tr: "mühendis" },
      { de: "tense", tr: "gergin" },
      { de: "a writer", tr: "yazar" },
      { de: "a scene", tr: "sahne" },
      { de: "the edge", tr: "kenar" },
      { de: "pack", tr: "toplamak" },
      { de: "a shell", tr: "deniz kabuğu" },
      { de: "reveal", tr: "açığa vurmak" },
      { de: "deserve", tr: "hak etmek" },
      { de: "a novella", tr: "kısa roman" },
      { de: "withhold", tr: "saklamak" },
      { de: "creep", tr: "süzülmek" },
      { de: "a topos", tr: "klişe konu" },
    ],
    minutes: 12,
    text:
      "The River Year, by Clara Stein, is a short novella about a single summer in a village that is about to be flooded for a new dam. It is also, quietly, one of the best books of the year.\n" +
      "What the novella does best is withhold. The story is told by Anna, a girl of twelve, and she tells us only what a child of that age would notice: the heat, the hands of her grandmother, the men in suits who come on Tuesdays. What the adults are arguing about in the kitchen, we have to guess. What the reader is never told is who sold the land.\n" +
      "Into this quiet world creeps a stranger. A young engineer rents the room above the bakery, and for three chapters nobody, including Anna, knows whether he is there to measure the valley or to warn it. What makes these chapters so tense is that Anna likes him, and we cannot.\n" +
      "The topos we know; the treatment we do not. Villages lost to dams have filled a whole shelf of novels. What Stein adds is patience. Where other writers would stage a big scene at the edge of the water, she gives us Anna packing a box of shells.\n" +
      "The ending I will not reveal, except to say that it arrives in a single sentence and changes the meaning of the first chapter. What I did after finishing it was start again from page one.\n" +
      "There are weaknesses. The letters from the grandmother, printed between the chapters, explain too much. What the voice of the girl keeps hidden, the letters give away.\n" +
      "But these are small complaints about a book of rare control. The River Year is 140 pages long. It deserves to be read slowly, and then read again.",
    questions: [
      {
        text: "Who tells the story?",
        options: ["a girl of twelve", "her grandmother", "the engineer"],
        answer: 0,
        explain: "„The story is told by Anna, a girl of twelve…“",
      },
      {
        text: "Where does the engineer live?",
        options: ["above the bakery", "with the grandmother", "in the city"],
        answer: 0,
        explain: "„A young engineer rents the room above the bakery…“",
      },
      {
        kind: "truefalse",
        text: "The reviewer thinks the letters from the grandmother are the best part.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The letters from the grandmother, printed between the chapters, explain too much.“",
      },
      {
        kind: "gapfill",
        text: "Into this quiet world creeps a ___.",
        options: [],
        answer: 0,
        accept: ["stranger"],
        explain: "„Into this quiet world creeps a stranger.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Anna notices the men in suits.",
          "A young engineer rents a room.",
          "Anna packs a box of shells.",
          "The ending arrives in a single sentence.",
        ],
        explain: "Anlatıcı, yabancının gelişi, sakin sahneler, en sonda roman nasıl bitiyor.",
      },
      {
        kind: "short_answer",
        text: "How long is the book?",
        options: [],
        answer: 0,
        accept: ["140 pages", "140", "a hundred and forty pages"],
        explain: "„The River Year is 140 pages long.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u09-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "A poetry reading in town",
    genre: "dialogue",
    intro: "İki arkadaş dün akşamki şiir dinletisini konuşuyor. Şair ve dinleyiciler nasıldı?",
    gloss: [
      { de: "poetry", tr: "şiir" },
      { de: "a poet", tr: "şair" },
      { de: "aloud", tr: "sesli" },
      { de: "anywhere", tr: "herhangi bir yerde" },
      { de: "the twentieth", tr: "ayın yirmisi" },
      { de: "fragmentary", tr: "parça parça" },
      { de: "contemplative", tr: "dalgın" },
      { de: "a reminiscence", tr: "anı" },
      { de: "lore", tr: "halk bilgisi" },
      { de: "a relic", tr: "kalıntı" },
      { de: "a cipher", tr: "şifre" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ozan", text: "How was the poetry reading last night? I had to work late." },
      { speaker: "Yaprak", text: "Better than I expected. The poet was nervous; the audience, patient. By the third poem everyone had relaxed." },
      { speaker: "Ozan", text: "How many people came?" },
      { speaker: "Yaprak", text: "About sixty. Some came for the poems; others, for the free wine, I suspect." },
      { speaker: "Ozan", text: "Which poems did she read?" },
      { speaker: "Yaprak", text: "Mostly from the new book, the one about the village of her grandfather. The early poems are fragmentary; the new ones, calm and contemplative." },
      { speaker: "Ozan", text: "I found the new book hard to get into." },
      { speaker: "Yaprak", text: "So did I, until she read it aloud. On the page it is quiet; out loud, it is almost music." },
      { speaker: "Ozan", text: "Did anyone ask questions afterward?" },
      { speaker: "Yaprak", text: "A student asked why the village is never named. She said a reminiscence survives as lore, a relic as a cipher, and that a name would turn the village into a map." },
      { speaker: "Ozan", text: "That sounds like her." },
      { speaker: "Yaprak", text: "Then she signed books for an hour. I bought two; my sister, three." },
      { speaker: "Ozan", text: "Is she reading anywhere else this month?" },
      { speaker: "Yaprak", text: "In Riverside on the twentieth. I can get you a ticket if you like." },
    ],
    questions: [
      {
        text: "How was the audience?",
        options: ["patient", "nervous", "small"],
        answer: 0,
        explain: "„The poet was nervous; the audience, patient.“",
      },
      {
        text: "Why did some people come, according to Yaprak?",
        options: ["for the free wine", "to buy the early poems", "to meet her grandfather"],
        answer: 0,
        explain: "„Some came for the poems; others, for the free wine, I suspect.“",
      },
      {
        kind: "truefalse",
        text: "Yaprak found the new book hard at first.",
        options: ["True", "False"],
        answer: 0,
        explain: "„So did I, until she read it aloud.“",
      },
      {
        kind: "gapfill",
        text: "The early poems are fragmentary; the new ones, calm and ___.",
        options: [],
        answer: 0,
        accept: ["contemplative"],
        explain: "„The early poems are fragmentary; the new ones, calm and contemplative.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "On the page it is quiet; out loud, it is almost music.",
          "On the page it is quiet; out loud, it is almost music",
        ],
        explain: "İkinci yarıda fiil düşmüş; virgül onun yerini tutuyor.",
      },
      {
        kind: "short_answer",
        text: "How many books did Yaprak buy?",
        options: [],
        answer: 0,
        accept: ["two", "2", "two books"],
        explain: "„I bought two; my sister, three.“",
      },
    ],
  },
  {
    id: "en-c1-u09-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "A literature department open day",
    genre: "monologue",
    intro: "Bir edebiyat bölümünün tanıtım gününde hoca, birinci yılın nasıl geçtiğini anlatıyor. Öğrencileri ne bekliyor?",
    gloss: [
      { de: "a seminar", tr: "seminer" },
      { de: "an essay", tr: "deneme" },
      { de: "assume", tr: "varsaymak" },
      { de: "a professor", tr: "profesör" },
      { de: "contextualize", tr: "bağlamına oturtmak" },
      { de: "decipher", tr: "çözmek" },
      { de: "dissect", tr: "didiklemek" },
      { de: "merely", tr: "yalnızca" },
      { de: "ideological", tr: "ideolojik" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Merve", text: "Welcome to the open day of the literature department. I teach the first-year seminar, so I will tell you what your first term would actually look like." },
      { speaker: "Merve", text: "In the first week we read one short story together, and three of you write about it. One contextualizes it, one deciphers it, one dissects it." },
      { speaker: "Merve", text: "The first student puts the story back into its period: who wrote it, for whom, in what year. The second looks for hidden meanings. The third takes it apart page by page." },
      { speaker: "Merve", text: "Then we compare the three essays. Usually one of them openly claims what the others merely assume, and the discussion starts there." },
      { speaker: "Merve", text: "Students often arrive wanting to find the message of a book. By December they have learned that to call a text ideological is not to read it." },
      { speaker: "Merve", text: "You will read about four hundred pages a week. That sounds like a lot, and it is. Most of our students also have jobs, so plan your week carefully." },
      { speaker: "Merve", text: "Exams are in January and June, but most of your grade comes from essays, and you get written feedback on every one." },
      { speaker: "Merve", text: "After the talk, second-year students will show you the library and answer the questions you would rather not ask a professor." },
    ],
    questions: [
      {
        text: "What does the first student do with the story?",
        options: ["puts it back into its period", "takes it apart page by page", "looks for hidden meanings"],
        answer: 0,
        explain: "„The first student puts the story back into its period: who wrote it, for whom, in what year.“",
      },
      {
        text: "How many pages do students read a week?",
        options: ["about four hundred", "about forty", "about a hundred"],
        answer: 0,
        explain: "„You will read about four hundred pages a week.“",
      },
      {
        kind: "truefalse",
        text: "Most of the grade comes from exams.",
        options: ["True", "False"],
        answer: 1,
        explain: "„most of your grade comes from essays, and you get written feedback on every one.“",
      },
      {
        kind: "gapfill",
        text: "One contextualizes it, one deciphers it, one ___ it.",
        options: [],
        answer: 0,
        accept: ["dissects"],
        explain: "„One contextualizes it, one deciphers it, one dissects it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Then we compare the three essays.", "Then we compare the three essays"],
        explain: "Seminerin ikinci adımı: üç yazıyı karşılaştırmak.",
      },
      {
        kind: "short_answer",
        text: "Who will show visitors the library?",
        options: [],
        answer: 0,
        accept: ["second-year students", "the second-year students", "students"],
        explain: "„second-year students will show you the library…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u09-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 9,
    title: "Notes for a philosophy class",
    genre: "info",
    intro: "Bir felsefe dersi için notların cümlelerini kur, sonra kursun duyuru kartını doldur.",
    gloss: [
      { de: "metaphysics", tr: "metafizik" },
      { de: "epistemology", tr: "bilgi kuramı" },
      { de: "paradoxical", tr: "paradoksal" },
      { de: "the Enlightenment", tr: "Aydınlanma" },
      { de: "a novella", tr: "uzun öykü" },
      { de: "a topos", tr: "edebî motif" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Metafizik olmasa bilgi kuramı daha basit olurdu.",
        answer: "Were it not for metaphysics, epistemology would be simpler.",
        hint: "Fiil başta, „if“ yok; koşulu söz dizimi taşıyor.",
      },
      {
        kind: "build",
        tr: "Aydınlanma aklın özgür olmasını istedi.",
        answer: "The Enlightenment demanded that reason be free.",
        hint: "Eski kip: „be“, „is“ değil.",
      },
      {
        kind: "build",
        tr: "Hiçbir iddianın paradoksal olmamasını istiyorlar.",
        answer: "They ask that no claim be paradoxical.",
        hint: "Olumsuzluk öznede; „be“ olduğu gibi kalıyor.",
      },
      {
        kind: "build",
        tr: "Anlatı bakış açısının yaptığı şey esirgemektir.",
        answer: "What the narrative perspective does is withhold.",
        hint: "„what“ öbeğinden sonra „is“: yarık cümle.",
      },
      {
        kind: "build",
        tr: "Uzun öyküye bir monolog sızıyor.",
        answer: "Into the novella creeps a monologue.",
        hint: "Yer başta, özne sonda: olayı bildirmiyor, sahneliyor.",
      },
      {
        kind: "form",
        prompt: "Kütüphanedeki felsefe kursu için duyuru kartını doldur.",
        facts: "Kurs her perşembe saat yedide kütüphanenin okuma salonunda; kitap gerekmiyor; sınav ve not yok; hibe biterse kurs bir kafeye taşınabilir; yeni kurs ekimde başlıyor.",
        fields: [
          { label: "When", answer: "Thursdays at seven", accept: ["every Thursday at seven", "Thursday at 7"] },
          { label: "Where", answer: "the reading room", accept: ["the library reading room", "the library"] },
          { label: "Books needed", answer: "none", accept: ["no books"] },
          { label: "Should the grant end", answer: "a café", accept: ["move to a café", "the café"] },
          { label: "Next course", answer: "October", accept: ["in October"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u09-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 9,
    title: "A seminar on poetry",
    genre: "info",
    intro: "Bir şiir seminerinde tutulan notların cümlelerini kur.",
    gloss: [
      { de: "fragmentary", tr: "bölük pörçük" },
      { de: "contemplative", tr: "derin düşünceli" },
      { de: "a reminiscence", tr: "anımsama" },
      { de: "lore", tr: "halk bilgisi" },
      { de: "a relic", tr: "eski eser" },
      { de: "the zeitgeist", tr: "zamanın ruhu" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Şiir bölük pörçük; okur, derin düşünceli.",
        answer: "The poem is fragmentary; the reader, contemplative.",
        hint: "Silinen fiilin yerini virgül tutuyor; boşluk dize sonunun işini görüyor.",
      },
      {
        kind: "build",
        tr: "Bir anımsama halk bilgisi olarak, bir eski eser şifre olarak yaşamını sürdürüyor.",
        answer: "A reminiscence survives as lore, a relic as a cipher.",
        hint: "İkinci yarı yine eksiltili; kulak kalıbı çoktan öğrendi.",
      },
      {
        kind: "build",
        tr: "Zamanın ruhu çığır açıcı hissettirdi; on yıl değil.",
        answer: "The zeitgeist felt epochal; the decade did not.",
        hint: "Yüklem gitmiş; „did not“ onu taşıyor.",
      },
      {
        kind: "build",
        tr: "O bağlama oturtuyor; o deşifre ediyor; onlar parçalara ayırıyor.",
        answer: "She contextualizes it; he deciphers it; they dissect it.",
        hint: "Üç fiil, üç kuram; hiçbiri yansız değil.",
      },
      {
        kind: "build",
        tr: "Bir metne ideolojik demek onu okumak değildir.",
        answer: "To call a text ideological is not to read it.",
        hint: "Olumsuz mastar biçimi bir çıkarımı reddediyor, olguyu değil.",
      },
    ],
  },
];
