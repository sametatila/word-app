import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 23 — "Konuşsaydık, duyguyu adlandırmak, resmî mektup,
 * dosyaya göre".
 *
 * Dört ders: If we had talked · Naming a feeling · The official letter ·
 * According to the file.
 *
 *   Kelime: custody, reliability, affection, compassion, nonverbal,
 *           rephrase, enclosure, filing, template, confidentiality,
 *           status, metric, proceedings.
 *   Kalıp:  If we had talked, the custody would have been shared. ·
 *           If the child support had been fair, the family would be calm now. ·
 *           If the reliability had been there, we would have stayed. ·
 *           It seems to be a nonverbal signal. ·
 *           Apparently the tone of voice carried it. ·
 *           On balance the choice of words is arguably the problem. ·
 *           The filing of the enclosure is done. ·
 *           The sending of a registered letter is recorded. ·
 *           The sorting of the incoming mail starts at eight. ·
 *           The case file is said to be complete. ·
 *           The legal basis is expected to change. ·
 *           The proceedings are thought to have started.
 *
 * Ünitenin tek öğretme noktası „THE“ GELİNCE „OF“ ZORUNLU. Ünite 21 „-ing“
 * adlaştırmasının üretken kapı olduğunu göstermişti; burada onun kendi
 * kuralı geliyor: „the filing OF the enclosure“ ile „filing the enclosure“
 * — „the“ varsa nesne „of“ ile bağlanıyor, „the“ yoksa doğrudan geliyor.
 * Üçüncü bir seçenek yok: ne „the filing the enclosure“ ne „filing of
 * the enclosure“.
 */
export const enB2U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u23-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 23,
    title: "The official letter",
    genre: "info",
    intro: "„the“ ile „of“ birlikte geliyor. Biri olmadan öteki olur mu?",
    gloss: [
      { de: "neither", tr: "ikisi de değil" },
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "object", tr: "nesne" },
      { de: "verb", tr: "fiil" },
      { de: "ordinary", tr: "olağan" },
      { de: "noun", tr: "isim" },
      { de: "whole", tr: "bütün" },
      { de: "activity", tr: "etkinlik" },
      { de: "nouns", tr: "isimler" },
      { de: "above", tr: "yukarıda" },
      { de: "an enclosure", tr: "ilişik belge" },
      { de: "filing", tr: "dosyalama" },
      { de: "recorded", tr: "kayda geçmiş" },
      { de: "sorting", tr: "ayıklama" },
      { de: "a third option", tr: "üçüncü seçenek" },
      { de: "a template", tr: "şablon" },
      { de: "a heading", tr: "başlık" },
      { de: "a column", tr: "sütun" },
      { de: "a register", tr: "kayıt defteri" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "straight", tr: "doğrudan" },
      { de: "a file number", tr: "dosya numarası" },
    ],
    minutes: 9,
    text:
      "The filing of the enclosure is done. Now take the „the“ away from the front and see what has to happen at the back.\n" +
      "Filing the enclosure is done. The „of“ has gone with it, and neither word can stay without the other. „The filing the enclosure“ is not a sentence and „filing of the enclosure“ is not one either.\n" +
      "So there are two shapes and no third option. With „the“ in front, the object arrives with „of“. Without „the“, the object arrives straight after the verb, exactly as it would in an ordinary sentence.\n" +
      "The sending of a registered letter is recorded. The sorting of the incoming mail starts at eight. Both of those are the first shape, and a template for an office is written in it because a heading needs a noun and a noun needs „the“.\n" +
      "The second shape is what the same office says out loud. Filing the enclosure took twenty minutes. Sorting the incoming mail is somebody's whole morning.\n" +
      "There is a difference in weight and it is not small. The first shape is a thing: it can be put in a column, given a file number and counted. The second is an activity: it takes time and somebody is doing it.\n" +
      "A page that uses the first shape for everything has turned a morning's work into a register of nouns, and the habit is hard to see from inside it, because every line looks like the line above.",
    questions: [
      {
        text: "What happens when „the“ goes?",
        options: ["„of“ goes too", "„of“ stays", "the object goes"],
        answer: 0,
        explain: "„The „of“ has gone with it, and neither word can stay without the other.“",
      },
      {
        text: "What is the first shape?",
        options: ["a thing", "an activity", "an instruction"],
        answer: 0,
        explain: "„The first shape is a thing: it can be put in a column, given a file number and counted.“",
      },
      {
        kind: "truefalse",
        text: "There are two shapes and no third option.",
        options: ["True", "False"],
        answer: 0,
        explain: "„So there are two shapes and no third option.“",
      },
      {
        kind: "gapfill",
        text: "The filing ___ the enclosure is done.",
        options: [],
        answer: 0,
        accept: ["of"],
        explain: "„The filing of the enclosure is done.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The filing of the enclosure is done.",
          "Filing the enclosure is done.",
          "The first shape is a thing.",
          "The second is an activity.",
        ],
        explain: "Birinci biçim, ikinci biçim, sonra ikisinin ağırlığı.",
      },
      {
        kind: "short_answer",
        text: "What has a page of the first shape turned the work into?",
        options: [],
        answer: 0,
        accept: ["a register of nouns", "a list of nouns", "nouns"],
        explain: "„has turned a morning's work into a register of nouns…“",
      },
    ],
  },
  {
    id: "en-b2-u23-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 23,
    title: "According to the file",
    genre: "opinion",
    intro: "Üç aktarma bir dosyada. Hangisinin dayanağı var?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "amounts", tr: "miktarlar" },
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "infinitive", tr: "mastar" },
      { de: "units", tr: "üniteler" },
      { de: "verb", tr: "fiil" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "passive", tr: "edilgen" },
      { de: "real", tr: "gerçek" },
      { de: "complete", tr: "tam" },
      { de: "a legal basis", tr: "yasal dayanak" },
      { de: "proceedings", tr: "dava süreci" },
      { de: "held", tr: "tutulan" },
      { de: "backwards", tr: "geriye" },
      { de: "an amendment", tr: "değişiklik" },
      { de: "confidentiality", tr: "gizlilik" },
      { de: "a status", tr: "statü" },
      { de: "a clerk", tr: "kâtip" },
      { de: "checked", tr: "denetlenmiş" },
      { de: "rests on", tr: "dayanıyor" },
    ],
    minutes: 9,
    text:
      "The case file is said to be complete. The legal basis is expected to change. The proceedings are thought to have started. Three sentences from the same page and three different amounts of evidence behind them.\n" +
      "„Is said to be complete“ means somebody has said it. In a file that is a weak sentence, because a file either has every document in it or it does not, and somebody could go and look.\n" +
      "„Is expected to change“ points forward and rests on something: an amendment that has been published, or a date in a calendar. The sentence does not give it, and a reader who wants the ground has to ask.\n" +
      "„Are thought to have started“ is a view that is held, and the infinitive is looking backwards: the starting already happened and somebody has decided so since.\n" +
      "The test has not changed in five units. Put a name in front of the verb and see whether the sentence survives. „The clerk says the case file is complete“ can be checked in a morning.\n" +
      "Where the passive earns its place here is confidentiality. Sometimes the name cannot be written, and then the form is doing real work and everybody in the room knows why.\n" +
      "Where it does not is everywhere else, and a file in which the status of every item is reported rather than stated is a file that will be read twice and trusted once.",
    questions: [
      {
        text: "Why is „is said to be complete“ weak here?",
        options: ["somebody could go and look", "the file is long", "it is about the future"],
        answer: 0,
        explain: "„a file either has every document in it or it does not, and somebody could go and look.“",
      },
      {
        text: "When does the passive earn its place?",
        options: ["confidentiality", "speed", "politeness"],
        answer: 0,
        explain: "„Where the passive earns its place here is confidentiality.“",
      },
      {
        kind: "truefalse",
        text: "The sentence gives the ground for the expectation.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The sentence does not give it, and a reader who wants the ground has to ask.“",
      },
      {
        kind: "gapfill",
        text: "The legal basis is ___ to change.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The legal basis is expected to change.“",
      },
      {
        kind: "order",
        text: "Dosyanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The case file is said to be complete.",
          "The legal basis is expected to change.",
          "The proceedings are thought to have started.",
          "Put a name in front of the verb.",
        ],
        explain: "Söylenen, beklenen, düşünülen; en sonda sınama.",
      },
      {
        kind: "short_answer",
        text: "How often is such a file trusted?",
        options: [],
        answer: 0,
        accept: ["once", "read twice, trusted once", "one time"],
        explain: "„a file that will be read twice and trusted once.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u23-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 23,
    title: "If we had talked",
    genre: "dialogue",
    intro: "Üç koşul, bir aile. Hangisi bu haftaya ait?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "useless", tr: "işe yaramaz" },
      { de: "conditional", tr: "koşul cümlesi" },
      { de: "closed", tr: "kapalı" },
      { de: "shared", tr: "paylaşılmış" },
      { de: "calm", tr: "sakin" },
      { de: "reliability", tr: "güvenilirlik" },
      { de: "a hearing", tr: "duruşma" },
      { de: "affection", tr: "sevgi" },
      { de: "compassion", tr: "şefkat" },
      { de: "mixed", tr: "karışık" },
      { de: "act on", tr: "gereğini yapmak" },
      { de: "a reproach", tr: "sitem" },
      { de: "kindest", tr: "en nazik" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Su", text: "If we had talked, the custody would have been shared. Closed on both sides, and it is the sentence both of them say." },
      { speaker: "Ali Rıza", text: "And neither can change it." },
      { speaker: "Su", text: "Neither can change it, and that is why the sentence is safe to say and useless to hear." },
      { speaker: "Ali Rıza", text: "The second one is different." },
      { speaker: "Su", text: "If the child support had been fair, the family would be calm now. The cause is finished and the result is this week." },
      { speaker: "Ali Rıza", text: "Mixed." },
      { speaker: "Su", text: "Mixed, and it is the only one of the three that anybody can act on, because a family that is not calm is a fact with today's date." },
      { speaker: "Ali Rıza", text: "The third?" },
      { speaker: "Su", text: "If the reliability had been there, we would have stayed. Closed, and it is the one that sounds like a reproach however it is said." },
      { speaker: "Ali Rıza", text: "Do you write it down?" },
      { speaker: "Su", text: "Not in the letter. In a hearing a closed conditional about somebody else's reliability is read as blame, and affection and compassion are the two words the letter is trying to keep." },
      { speaker: "Ali Rıza", text: "So the letter has one conditional." },
      { speaker: "Su", text: "One, and it is the mixed one, because it points at something that can still be changed and that is the kindest sentence available." },
    ],
    questions: [
      {
        text: "Which sentence can people act on?",
        options: ["the mixed one", "the first one", "the third one"],
        answer: 0,
        explain: "„it is the only one of the three that anybody can act on…“",
      },
      {
        text: "How is the third one read in a hearing?",
        options: ["as blame", "as a plan", "as a fact"],
        answer: 0,
        explain: "„a closed conditional about somebody else's reliability is read as blame…“",
      },
      {
        kind: "truefalse",
        text: "The letter has one conditional, and it is the mixed one.",
        options: ["True", "False"],
        answer: 0,
        explain: "„One, and it is the mixed one…“",
      },
      {
        kind: "gapfill",
        text: "If the child support had been fair, the family would be calm ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the child support had been fair, the family would be calm now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If we had talked, the custody would have been shared.", "If we had talked, the custody would have been shared"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "Why is the mixed one the kindest?",
        options: [],
        answer: 0,
        accept: ["it can still be changed", "it points forward", "something can change"],
        explain: "„it points at something that can still be changed and that is the kindest sentence available.“",
      },
    ],
  },
  {
    id: "en-b2-u23-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 23,
    title: "Naming a feeling",
    genre: "monologue",
    intro: "Üç çekince. Hangisi bir şey söylüyor?",
    gloss: [
      { de: "itself", tr: "kendisi" },
      { de: "real", tr: "gerçek" },
      { de: "harm", tr: "zarar" },
      { de: "a signal", tr: "işaret" },
      { de: "a tone of voice", tr: "ses tonu" },
      { de: "a choice of words", tr: "sözcük seçimi" },
      { de: "a hedge", tr: "çekince" },
      { de: "a weighing", tr: "tartma" },
      { de: "carried it", tr: "taşıdı" },
      { de: "in essence", tr: "özünde" },
      { de: "checkable", tr: "denetlenebilir" },
      { de: "face", tr: "yüz" },
      { de: "a recording", tr: "kayıt" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Mina", text: "It seems to be a nonverbal signal. Four words before the claim, and the claim itself is already careful." },
      { speaker: "Mina", text: "„Seems“ does all the work there. „Signal“ is already a soft word; I am not saying what it meant, only that something was sent." },
      { speaker: "Mina", text: "Apparently the tone of voice carried it. That one is doing something useful: I heard the recording and I am reporting what is on it, not what was meant by it." },
      { speaker: "Mina", text: "On balance the choice of words is arguably the problem. Two hedges, and „on balance“ is the one that says something — a weighing has happened and somebody can show it was done badly." },
      { speaker: "Mina", text: "„Arguably“ says nothing at all, and in a report about how two people spoke to each other it does real harm." },
      { speaker: "Mina", text: "The harm is this. A page about a face, a voice and a choice of words is already a page of things that cannot be measured." },
      { speaker: "Mina", text: "Every hedge on top of that moves the page one step further from anything checkable, and after three of them nobody can be wrong and nobody has said anything." },
      { speaker: "Mina", text: "So in essence the rule is the same as everywhere else, and it matters more here. One hedge, and it has to be the one a reader could argue with." },
    ],
    questions: [
      {
        text: "What is Mina reporting with „apparently“?",
        options: ["what is on the recording", "what was meant", "what she thinks"],
        answer: 0,
        explain: "„I am reporting what is on it, not what was meant by it.“",
      },
      {
        text: "Which hedge says something?",
        options: ["on balance", "arguably", "seems"],
        answer: 0,
        explain: "„„on balance“ is the one that says something…“",
      },
      {
        kind: "truefalse",
        text: "Hedges matter less in this kind of report.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the rule is the same as everywhere else, and it matters more here.“",
      },
      {
        kind: "gapfill",
        text: "Apparently the tone of ___ carried it.",
        options: [],
        answer: 0,
        accept: ["voice"],
        explain: "„Apparently the tone of voice carried it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It seems to be a nonverbal signal.", "It seems to be a nonverbal signal"],
        explain: "Tek çekince yeter; „seems“ işi yapıyor.",
      },
      {
        kind: "short_answer",
        text: "What happens after three hedges?",
        options: [],
        answer: 0,
        accept: ["nobody has said anything", "nobody can be wrong", "nothing is said"],
        explain: "„after three of them nobody can be wrong and nobody has said anything.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u23-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 23,
    title: "The filing of the enclosure is done",
    genre: "info",
    intro: "„the“ ile „of“ birlikte. Üç kayıt satırı.",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "activity", tr: "etkinlik" },
      { de: "the filing", tr: "dosyalanması" },
      { de: "the sending", tr: "gönderilmesi" },
      { de: "the sorting", tr: "ayıklanması" },
      { de: "is said to be", tr: "olduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İlişik belgenin dosyalanması bitti.",
        answer: "The filing of the enclosure is done.",
        hint: "„the“ varsa nesne „of“ ile bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Taahhütlü mektup gönderilmesi kayda geçiyor.",
        answer: "The sending of a registered letter is recorded.",
        hint: "Aynı biçim; başlık dili böyle kuruluyor.",
      },
      {
        kind: "build",
        tr: "Gelen postanın ayıklanması sekizde başlıyor.",
        answer: "The sorting of the incoming mail starts at eight.",
        hint: "Üçüncü kayıt satırı, aynı iki parça.",
      },
      {
        kind: "build",
        tr: "Dava dosyasının tam olduğu söyleniyor.",
        answer: "The case file is said to be complete.",
        hint: "En zayıf aktarma: biri söyledi.",
      },
      {
        kind: "form",
        prompt: "Biçim kartını doldur.",
        facts: "„the“ varsa „of“ zorunlu; „the“ yoksa nesne doğrudan geliyor; üçüncü seçenek yok; biri şey, öteki eylem.",
        fields: [
          { label: "With „the“", answer: "of", accept: ["the filing of"] },
          { label: "Without „the“", answer: "straight", accept: ["filing the enclosure"] },
          { label: "A third option", answer: "none", accept: ["there is none"] },
          { label: "The difference", answer: "a thing or an activity", accept: ["weight"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u23-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 23,
    title: "If the child support had been fair, the family would be calm now",
    genre: "opinion",
    intro: "İki kapalı, bir karışık ve iki çekince.",
    gloss: [
      { de: "would have been shared", tr: "paylaşılmış olurdu" },
      { de: "would be calm", tr: "sakin olurdu" },
      { de: "would have stayed", tr: "kalırdık" },
      { de: "a nonverbal signal", tr: "sözsüz işaret" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Konuşsaydık velayet paylaşılmış olurdu.",
        answer: "If we had talked, the custody would have been shared.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Nafaka adil olsaydı aile şimdi sakin olurdu.",
        answer: "If the child support had been fair, the family would be calm now.",
        hint: "Karışık koşul: sonuç bu haftaya ait.",
      },
      {
        kind: "build",
        tr: "Güvenilirlik olsaydı kalırdık.",
        answer: "If the reliability had been there, we would have stayed.",
        hint: "Yine kapalı; sitem gibi okunuyor.",
      },
      {
        kind: "build",
        tr: "Bunun sözsüz bir işaret olduğu anlaşılıyor.",
        answer: "It seems to be a nonverbal signal.",
        hint: "Tek çekince yeter.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre onu ses tonu taşıdı.",
        answer: "Apparently the tone of voice carried it.",
        hint: "Bildiriyor ve kaynağı üstlenmiyor.",
      },
    ],
  },
];
