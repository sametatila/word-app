import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 21 — "Değerlendirme, onun hakkında söylenenler, asıl
 * acıtan, nasıl bozuştuk".
 *
 * Dört ders: The assessment · What is said about her · What really hurt ·
 * How we fell out.
 *
 *   Kelime: perception, self-confidence, self-esteem, characteristic,
 *           sensitivity, inclination, distrust, admiration, appreciation,
 *           backing, exclusion, belonging, loneliness, rage, jealousy,
 *           remorse, envy, embarrassment, despair, impatience, mediate,
 *           reconcile, adapt, endure, repress.
 *   Kalıp:  The measurement of perception takes an hour. ·
 *           The building of self-confidence is slow. ·
 *           The naming of a pattern helps. ·
 *           She is said to feel distrust. ·
 *           The admiration is expected to fade. ·
 *           The appreciation is thought to have been genuine. ·
 *           What really hurt was not the rage. ·
 *           It was the jealousy that ended it. ·
 *           What stays is the remorse. ·
 *           Having tried to mediate, she stopped. ·
 *           Asked to reconcile, they refused. ·
 *           Wanting to adapt, he said nothing.
 *
 * Ünitenin tek öğretme noktası „-ING“ ADLAŞTIRMASI: ÜRETKEN KAPI.
 * Ünite 4, 10 ve 16 ekin fiilden türetilemediğini göstermişti — liste var,
 * kural yok. Burada listenin yanındaki ikinci yol açılıyor: fiile „-ing“
 * takmak İSTİSNASIZ her fiilde çalışıyor („the building of“, „the naming
 * of“, „the repressing of“). Yani İngilizcede biri kuralsız bir liste,
 * öteki listesiz bir kural olan iki yol var ve ikincisi her zaman açık.
 */
export const enB2U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u21-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 21,
    title: "The assessment",
    genre: "info",
    intro: "İki yol var: listeden geçen ve her zaman açık olan.",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "verbs", tr: "fiiller" },
      { de: "verb", tr: "fiil" },
      { de: "pair", tr: "çift" },
      { de: "adaptation", tr: "uyarlama" },
      { de: "assessment", tr: "değerlendirme" },
      { de: "the measurement", tr: "ölçülmesi" },
      { de: "an ending", tr: "ek" },
      { de: "a route", tr: "yol" },
      { de: "available", tr: "elde olan" },
      { de: "the door", tr: "kapı" },
      { de: "the trade", tr: "takas" },
      { de: "a method section", tr: "yöntem bölümü" },
      { de: "grammatical", tr: "dilbilgisel" },
      { de: "guess", tr: "tahmin etmek" },
      { de: "doubt", tr: "kuşku duymak" },
      { de: "underneath", tr: "altta" },
      { de: "an exception", tr: "istisna" },
      { de: "heavier", tr: "daha ağır" },
      { de: "learnt", tr: "öğrenilen" },
    ],
    minutes: 9,
    text:
      "The measurement of perception takes an hour. The building of self-confidence is slow. The naming of a pattern helps. Three nouns made from three verbs, and the second and third are made in a way the first is not.\n" +
      "„Measurement“ is on the list. Measure, measurement; the ending has to be learnt, and so do acquisition, dismissal, performance and the rest of them.\n" +
      "„Building“ and „naming“ are not on any list. They are the verb with „-ing“ on the end, and that works for every verb in the language without exception. Build, building. Name, naming. Repress, repressing. Endure, enduring.\n" +
      "So English has two routes and they are completely different in kind. One is a list with no rule in it, learnt pair by pair over years. The other is a rule with no list, available the moment you know the verb.\n" +
      "The second one is the door out of the first. A writer who cannot remember whether „adapt“ gives „adaptation“ or something else can always write „the adapting of“, and it will be correct.\n" +
      "It will also be heavier, and that is the trade. „The measurement of perception“ sounds like a method section. „The measuring of perception“ sounds like somebody describing the method section. Both are grammatical and a reader hears the difference in the first second.\n" +
      "My own rule is to use the list where I am sure of it and the door where I am not, and never to guess at an ending. A wrong ending in the first line of an assessment is the only kind of mistake that makes a reader doubt the numbers underneath it.",
    questions: [
      {
        text: "Which route works for every verb?",
        options: ["the „-ing“ one", "the one on the list", "not one of them"],
        answer: 0,
        explain: "„that works for every verb in the language without exception.“",
      },
      {
        text: "What is the trade?",
        options: ["the „-ing“ form is heavier", "the list form is wrong", "both are informal"],
        answer: 0,
        explain: "„It will also be heavier, and that is the trade.“",
      },
      {
        kind: "truefalse",
        text: "The writer guesses at an ending when he is not sure.",
        options: ["True", "False"],
        answer: 1,
        explain: "„and never to guess at an ending.“",
      },
      {
        kind: "gapfill",
        text: "The ___ of self-confidence is slow.",
        options: [],
        answer: 0,
        accept: ["building"],
        explain: "„The building of self-confidence is slow.“",
      },
      {
        kind: "order",
        text: "İki yolun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The measurement of perception takes an hour.",
          "The building of self-confidence is slow.",
          "The naming of a pattern helps.",
          "One is a list with no rule; the other a rule with no list.",
        ],
        explain: "Listeden gelen, üretken olan, yine üretken; en sonda iki yolun adı.",
      },
      {
        kind: "short_answer",
        text: "What makes a reader doubt the numbers?",
        options: [],
        answer: 0,
        accept: ["a wrong ending", "a wrong form", "a wrong first line"],
        explain: "„A wrong ending in the first line of an assessment…“",
      },
    ],
  },
  {
    id: "en-b2-u21-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 21,
    title: "What is said about her",
    genre: "opinion",
    intro: "Bir kişi hakkında üç kaynaksız cümle. Sınama ne?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "verbs", tr: "fiiller" },
      { de: "sentence", tr: "cümle" },
      { de: "infinitive", tr: "mastar" },
      { de: "real", tr: "gerçek" },
      { de: "assessment", tr: "değerlendirme" },
      { de: "easiest", tr: "en kolay" },
      { de: "a weakness", tr: "zayıflık" },
      { de: "fade", tr: "sönmek" },
      { de: "genuine", tr: "içten" },
      { de: "backwards", tr: "geriye" },
      { de: "answered", tr: "yanıtlanan" },
      { de: "trust", tr: "güvenmek" },
      { de: "arrives", tr: "geliyor" },
      { de: "the willingness", tr: "isteklilik" },
      { de: "an accident", tr: "rastlantı" },
      { de: "a pattern", tr: "örüntü" },
      { de: "serious", tr: "ciddi" },
      { de: "since", tr: "o zamandan beri" },
    ],
    minutes: 9,
    text:
      "She is said to feel distrust. The admiration is expected to fade. The appreciation is thought to have been genuine. Three sentences about one person, three verbs of reporting, and no source in any of them.\n" +
      "„Is said to“ is the weakest: somebody has said it. In a paragraph about a colleague that is a serious weakness, because the somebody may be one person with a reason.\n" +
      "„Is expected to“ points forward and rests on something. Admiration that is expected to fade rests on a pattern — other people, other years — and the sentence does not give it, which is the part to notice.\n" +
      "„Is thought to have been genuine“ is a view that is held, and the infinitive is looking backwards: the appreciation was genuine at the time and somebody has decided so since.\n" +
      "Put a name in front of each of them and the paragraph changes completely. „Two of her reports say she feels distrust“ can be answered. „She is said to feel distrust“ cannot.\n" +
      "That test is the only one I trust in a document about a person. Backing, exclusion and belonging are all words that do real work in an assessment, and every one of them arrives in a sentence with a subject in it or should not arrive at all.\n" +
      "The willingness to help is the easiest to check and the most often reported without a source, which is not an accident.",
    questions: [
      {
        text: "Why is „is said to“ a serious weakness here?",
        options: ["the somebody may be one person", "it is too long", "it is about the future"],
        answer: 0,
        explain: "„because the somebody may be one person with a reason.“",
      },
      {
        text: "What does „is expected to“ rest on?",
        options: ["a pattern", "a name", "a document"],
        answer: 0,
        explain: "„Admiration that is expected to fade rests on a pattern…“",
      },
      {
        kind: "truefalse",
        text: "„She is said to feel distrust“ can be answered.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„She is said to feel distrust“ cannot.“",
      },
      {
        kind: "gapfill",
        text: "The admiration is ___ to fade.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The admiration is expected to fade.“",
      },
      {
        kind: "order",
        text: "Üç aktarmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "She is said to feel distrust.",
          "The admiration is expected to fade.",
          "The appreciation is thought to have been genuine.",
          "Put a name in front of each of them.",
        ],
        explain: "Söylenen, beklenen, düşünülen; en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "Which one is most often reported without a source?",
        options: [],
        answer: 0,
        accept: ["the willingness to help", "willingness to help", "the easiest one"],
        explain: "„The willingness to help is the easiest to check and the most often reported without a source…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u21-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 21,
    title: "What really hurt",
    genre: "dialogue",
    intro: "Üç yarık cümle. Hangisi bir adayı listeden çıkarıyor?",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "sentence", tr: "cümle" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "whole", tr: "bütün" },
      { de: "plain", tr: "yalın" },
      { de: "sentences", tr: "cümleler" },
      { de: "underneath", tr: "altında" },
      { de: "the light", tr: "ışık" },
      { de: "blamed", tr: "suçlanan" },
      { de: "a candidate", tr: "aday" },
      { de: "replaces", tr: "yerine geçen" },
      { de: "the gap", tr: "aradaki boşluk" },
      { de: "wait", tr: "beklemek" },
      { de: "out loud", tr: "sesli olarak" },
      { de: "a play", tr: "oyun" },
      { de: "a list", tr: "liste" },
      { de: "stays", tr: "kalan" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Bahar", text: "What really hurt was not the rage. It was easier to answer rage than the thing underneath it." },
      { speaker: "Toprak", text: "Which was?" },
      { speaker: "Bahar", text: "It was the jealousy that ended it. The second shape, and it puts the light on a noun so that nothing else can be blamed." },
      { speaker: "Toprak", text: "Why not just say the jealousy ended it?" },
      { speaker: "Bahar", text: "Because that sentence is about the jealousy. The cleft is about which of several things it was, and everybody in that conversation had a list." },
      { speaker: "Toprak", text: "And the first one has „not“ in it." },
      { speaker: "Bahar", text: "That is the third kind. „What really hurt was not the rage“ takes a candidate off the list without naming the one that replaces it." },
      { speaker: "Toprak", text: "Which you name in the next sentence." },
      { speaker: "Bahar", text: "Which I name in the next sentence, and the gap between them is the whole point. A reader who has to wait one sentence remembers the answer." },
      { speaker: "Toprak", text: "What stays is the remorse." },
      { speaker: "Bahar", text: "That one I would not write down. Said out loud it is a sentence; on a page it reads as a line from a play, and this is not a play." },
      { speaker: "Toprak", text: "So how many?" },
      { speaker: "Bahar", text: "Two in a letter that long. The despair and the impatience get plain sentences, because they are the parts that need no help at all." },
    ],
    questions: [
      {
        text: "What does the first sentence do?",
        options: ["takes a candidate off the list", "names the cause", "asks a question"],
        answer: 0,
        explain: "„takes a candidate off the list without naming the one that replaces it.“",
      },
      {
        text: "Why does the gap matter?",
        options: ["the reader remembers the answer", "it is shorter", "it is polite"],
        answer: 0,
        explain: "„A reader who has to wait one sentence remembers the answer.“",
      },
      {
        kind: "truefalse",
        text: "Bahar would write „What stays is the remorse“ on a page.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That one I would not write down.“",
      },
      {
        kind: "gapfill",
        text: "It was the ___ that ended it.",
        options: [],
        answer: 0,
        accept: ["jealousy"],
        explain: "„It was the jealousy that ended it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What really hurt was not the rage.", "What really hurt was not the rage"],
        explain: "Yarık cümle bir adayı listeden çıkarıyor.",
      },
      {
        kind: "short_answer",
        text: "What do the despair and the impatience get?",
        options: [],
        answer: 0,
        accept: ["plain sentences", "plain ones", "no help"],
        explain: "„The despair and the impatience get plain sentences…“",
      },
    ],
  },
  {
    id: "en-b2-u21-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 21,
    title: "How we fell out",
    genre: "monologue",
    intro: "Üç ortaç. Yanlış giden hep hangi parça?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "participle", tr: "ortaç" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "throws", tr: "atıyor" },
      { de: "a voice", tr: "çatı" },
      { de: "careless", tr: "özensiz" },
      { de: "carelessness", tr: "özensizlik" },
      { de: "compress", tr: "sıkıştırmak" },
      { de: "a step", tr: "adım" },
      { de: "a process", tr: "süreç" },
      { de: "afterwards", tr: "sonradan" },
      { de: "backwards", tr: "tersinden" },
      { de: "catches", tr: "yakalıyor" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Kaya", text: "Having tried to mediate, she stopped. The trying came first and the stopping came after, and no conjunction is doing that work." },
      { speaker: "Kaya", text: "Asked to reconcile, they refused. Passive, and it is short for „having been asked“ — English throws those two words away and nothing is lost." },
      { speaker: "Kaya", text: "Wanting to adapt, he said nothing. Active, a state, and a reason: he said nothing because he wanted to adapt." },
      { speaker: "Kaya", text: "Three voices in three lines, and a reader takes them in without stopping, which is exactly why they are worth getting right." },
      { speaker: "Kaya", text: "The one that goes wrong is the subject. „Asked to reconcile, the meeting ended“ makes somebody ask the meeting." },
      { speaker: "Kaya", text: "Nobody misreads it and everybody sees it, and in a note about people who fell out, a careless sentence is read as carelessness about the people." },
      { speaker: "Kaya", text: "So I write the main clause first and put the participle on afterwards, which sounds backwards and catches every one of them." },
      { speaker: "Kaya", text: "What I cannot compress is the part where somebody repressed something for two years. That gets its own sentence, with a subject, because a participle would make it look like a step in a process." },
    ],
    questions: [
      {
        text: "What is „Asked to reconcile“ short for?",
        options: ["having been asked", "they were asked", "asking"],
        answer: 0,
        explain: "„it is short for „having been asked“…“",
      },
      {
        text: "What goes wrong?",
        options: ["the subject", "the time", "the conjunction"],
        answer: 0,
        explain: "„The one that goes wrong is the subject.“",
      },
      {
        kind: "truefalse",
        text: "People misread the broken sentence.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody misreads it and everybody sees it…“",
      },
      {
        kind: "gapfill",
        text: "___ to adapt, he said nothing.",
        options: [],
        answer: 0,
        accept: ["Wanting", "wanting"],
        explain: "„Wanting to adapt, he said nothing.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Having tried to mediate, she stopped.", "Having tried to mediate, she stopped"],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What cannot be compressed?",
        options: [],
        answer: 0,
        accept: ["the two years", "what was repressed", "the repressing"],
        explain: "„What I cannot compress is the part where somebody repressed something for two years.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u21-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 21,
    title: "The building of self-confidence is slow",
    genre: "info",
    intro: "Üç adlaştırma. Hangisi listeden, hangisi kuraldan?",
    gloss: [
      { de: "the measurement", tr: "ölçülmesi" },
      { de: "the building", tr: "inşası" },
      { de: "the naming", tr: "adlandırılması" },
      { de: "is said to feel", tr: "duyduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Algının ölçülmesi bir saat sürüyor.",
        answer: "The measurement of perception takes an hour.",
        hint: "Listeden gelen ek: „measure“ → „measurement“.",
      },
      {
        kind: "build",
        tr: "Özgüvenin inşası yavaş.",
        answer: "The building of self-confidence is slow.",
        hint: "Üretken kapı: her fiile „-ing“ takılabiliyor.",
      },
      {
        kind: "build",
        tr: "Bir örüntünün adlandırılması yardımcı oluyor.",
        answer: "The naming of a pattern helps.",
        hint: "Yine „-ing“; liste değil, kural.",
      },
      {
        kind: "build",
        tr: "Ona güvensizlik duyduğu söyleniyor.",
        answer: "She is said to feel distrust.",
        hint: "En zayıf aktarma: biri söyledi.",
      },
      {
        kind: "form",
        prompt: "Adlaştırma kartını doldur.",
        facts: "„measure“ listeden geliyor; „build“ ve „name“ kuraldan; „-ing“ her fiilde çalışıyor; ama daha ağır duruyor.",
        fields: [
          { label: "From the list", answer: "measurement", accept: ["measure"] },
          { label: "From the rule", answer: "building", accept: ["naming"] },
          { label: "Works for", answer: "any of them", accept: ["all of them"] },
          { label: "The cost", answer: "a heavy sound", accept: ["it sounds heavy"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u21-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 21,
    title: "What really hurt was not the rage",
    genre: "opinion",
    intro: "Üç yarık cümle ve iki ortaç.",
    gloss: [
      { de: "what really hurt", tr: "asıl acıtan" },
      { de: "it was the jealousy", tr: "kıskançlıktı" },
      { de: "what stays", tr: "kalan şey" },
      { de: "asked to reconcile", tr: "barışması istenince" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Asıl acıtan öfke değildi.",
        answer: "What really hurt was not the rage.",
        hint: "Yarık cümle bir adayı listeden çıkarıyor.",
      },
      {
        kind: "build",
        tr: "Onu bitiren kıskançlıktı.",
        answer: "It was the jealousy that ended it.",
        hint: "Işık isme düşüyor.",
      },
      {
        kind: "build",
        tr: "Kalan şey pişmanlık.",
        answer: "What stays is the remorse.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Arabuluculuk yapmayı denedikten sonra vazgeçti.",
        answer: "Having tried to mediate, she stopped.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Barışması istenince reddettiler.",
        answer: "Asked to reconcile, they refused.",
        hint: "Edilgen ortaç: „having been“ düşüyor.",
      },
    ],
  },
];
