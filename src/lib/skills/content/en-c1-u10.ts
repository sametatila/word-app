import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 10 — "Okumadaki fark, metin ne kadar söylüyor,
 * demek istediğinden azını söylemek, uzun bir denemeyi bir arada tutmak".
 *
 * Dört ders: The difference in reading · How much the text says ·
 * Saying less than you mean · Holding a long essay together.
 *
 *   Kelime: strangeness, otherness, demeanor, milieu, purity, artifact,
 *           stigma, mundane, permeate, ostracize, exoticism, hearty,
 *           estrangement, headstrong, inquisitive, multilayeredness,
 *           predisposition, wrath, resentment, emancipation, stagnate, subside.
 *   Kalıp:  Much as we call it strangeness, it is otherness. ·
 *           Her demeanor, albeit formal, fits the milieu. ·
 *           Albeit a symbol of purity, the artifact bears a stigma. ·
 *           The scene may well be mundane rather than highly symbolic. ·
 *           A time-honored reading might permeate a whole field. ·
 *           A culture may hand down its exoticism and ostracize the doubter. ·
 *           The meal was hearty; the welcome, less so. ·
 *           We never become estranged here; we just name the estrangement later. ·
 *           A headstrong child, they said, and rather inquisitive. ·
 *           The multilayeredness above becomes a predisposition below. ·
 *           That wrath, as noted, is the resentment of an earlier page. ·
 *           Where emancipation stagnates, the anger does not subside.
 *
 * Ünitenin tek öğretme noktası SONA ASILAN NİTELEME. İsmi tanımlayan her
 * şey İngilizcede ismin ARDINA, parça parça asılabiliyor („the
 * multilayeredness above“, „the resentment of an earlier page that nobody
 * answered“) ve öbek yol boyunca her noktada tamamlanmış oluyor; Almanca
 * aynı öbeği ÖNDEN kuruyor, ismin önünde erken açılan ve isim gelene dek
 * kapanmayan bir parantezle, ve okurun ortada durabileceği bir yer yok.
 * Yeniden ölçüm bu seviyenin açılış ipini TERSİNE çeviriyor: cümle
 * düzeyinde ağırlığı başa koyan İngilizce, isim öbeğinde ağırlığı sona
 * koyuyor; yük dağılımı dilin değil KATMANIN özelliği. Pratik sonucu da
 * var: İngilizce yazar öbeğin arkasına eklemeye devam edebiliyor, Alman
 * yazar bir parantez dolduruyor ve parantezin bir boyu var.
 */
export const enC1U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u10-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "Holding a long essay together",
    genre: "info",
    intro: "İsim öbeği iki dilde iki ayrı uçtan yükleniyor. Hangisi nereden?",
    gloss: [
      { de: "neither", tr: "ikisi de değil" },
      { de: "object", tr: "nesne" },
      { de: "noun", tr: "isim" },
      { de: "passage", tr: "pasaj" },
      { de: "essay", tr: "deneme" },
      { de: "builds", tr: "kuruyor" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "property", tr: "özellik" },
      { de: "build", tr: "kurmak" },
      { de: "a preposition", tr: "edat" },
      { de: "hung", tr: "asılmış" },
      { de: "constantly", tr: "durmadan" },
      { de: "a pointer", tr: "gönderme" },
      { de: "a layer", tr: "katman" },
      { de: "the subject", tr: "konu" },
      { de: "a repetition", tr: "yineleme" },
      { de: "surprised", tr: "şaşırmış" },
      { de: "the measurement", tr: "ölçüm" },
      { de: "the opposite", tr: "tersi" },
      { de: "one piece at a time", tr: "parça parça" },
      { de: "complete", tr: "tamamlanmış" },
      { de: "forwards", tr: "önden" },
      { de: "a bracket", tr: "parantez" },
      { de: "opens early", tr: "erken açılıyor" },
      { de: "arrives", tr: "geliyor" },
      { de: "in the middle", tr: "ortada" },
      { de: "word for word", tr: "sözcüğü sözcüğüne" },
      { de: "opposite ends", tr: "karşıt uçlar" },
      { de: "practical", tr: "işe dönük" },
      { de: "unreadable", tr: "okunmaz" },
      { de: "a size", tr: "boy" },
      { de: "an argument", tr: "sav" },
      { de: "the same way", tr: "aynı yolla" },
    ],
    minutes: 12,
    text:
      "The multilayeredness above becomes a predisposition below. Two small words are doing the work of two sentences, and neither of them is a verb.\n" +
      "„Above“ and „below“ are prepositions that have been left without an object and hung on the end of a noun. English allows this and uses it constantly in long texts: the claim above, the table below, the passage quoted earlier, the objection raised on the first page. Each one is a pointer, and together they make a layer of the essay that says nothing about the subject and everything about where the reader is standing.\n" +
      "That wrath, as noted, is the resentment of an earlier page. „As noted“ is the same layer speaking from the middle of a sentence, and it is doing a second job as well: it tells the reader that this is a repetition and that nobody is expected to be surprised by it.\n" +
      "Now the measurement, and it runs against the one this level opened with. In a sentence English puts the heavy thing first and asks the reader to hold it. In a noun phrase it does the opposite. Everything that describes a noun can be hung behind it, one piece at a time, and the phrase is complete at every point along the way: the resentment, the resentment of an earlier page, the resentment of an earlier page that nobody answered.\n" +
      "German builds the same phrase forwards. The describing material goes in front of the noun, inside a bracket that opens early and does not close until the noun arrives, and the reader cannot stop anywhere in the middle, because until the noun comes there is nothing yet to stop on. „The multilayeredness above“ becomes, word for word, „the above named multilayeredness“.\n" +
      "So the two languages load a noun phrase from opposite ends, and the load is a property of the layer rather than of the language: at the level of the sentence it goes one way, at the level of the phrase the other.\n" +
      "The consequence for a long essay is practical. An English writer can keep adding to the back of a phrase and the sentence never becomes unreadable; a German writer who adds in the same way is filling a bracket, and a bracket has a size after which nobody follows.\n" +
      "Where emancipation stagnates, the anger does not subside. And here at the end is a third pointer: not a place on the page but a place in the argument, which is the one kind of pointer both languages build the same way.",
    questions: [
      {
        text: "What have „above“ and „below“ been left without?",
        options: ["an object", "a subject", "a verb"],
        answer: 0,
        explain: "„prepositions that have been left without an object…“",
      },
      {
        text: "Where can English put what describes a noun?",
        options: ["behind it", "in front of it", "in a bracket"],
        answer: 0,
        explain: "„Everything that describes a noun can be hung behind it…“",
      },
      {
        kind: "truefalse",
        text: "A German reader cannot stop in the middle of the bracket.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the reader cannot stop anywhere in the middle…“",
      },
      {
        kind: "gapfill",
        text: "The multilayeredness above becomes a predisposition ___.",
        options: [],
        answer: 0,
        accept: ["below"],
        explain: "„The multilayeredness above becomes a predisposition below.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The multilayeredness above becomes a predisposition below.",
          "That wrath, as noted, is the resentment of an earlier page.",
          "Where emancipation stagnates, the anger does not subside.",
          "The two languages load a noun phrase from opposite ends.",
        ],
        explain: "Sayfada yer, cümle ortasında yineleme, savda yer; en sonda ölçü.",
      },
      {
        kind: "short_answer",
        text: "What does a bracket have?",
        options: [],
        answer: 0,
        accept: ["a size", "a limit", "a length"],
        explain: "„a bracket has a size after which nobody follows.“",
      },
    ],
  },
  {
    id: "en-c1-u10-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "The difference in reading",
    genre: "opinion",
    intro: "„Albeit“ bir cümlecik istemiyor. Peki ne istiyor?",
    gloss: [
      { de: "object", tr: "nesne" },
      { de: "noun", tr: "isim" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "background", tr: "köken" },
      { de: "qualified", tr: "kayıtlı" },
      { de: "stumble", tr: "takılmak" },
      { de: "differs", tr: "farklı" },
      { de: "readable", tr: "okunabilir" },
      { de: "pulled", tr: "çekilmiş" },
      { de: "deserves", tr: "hak ediyor" },
      { de: "easiest", tr: "en kolay" },
      { de: "smuggle", tr: "kaçırmak" },
      { de: "a clause", tr: "cümlecik" },
      { de: "verbless", tr: "fiilsiz" },
      { de: "a choice", tr: "seçim" },
      { de: "distance", tr: "mesafe" },
      { de: "the speaker", tr: "konuşan" },
      { de: "belongs", tr: "ait" },
      { de: "a property", tr: "özellik" },
      { de: "a relation", tr: "ilişki" },
      { de: "measured", tr: "ölçülen" },
      { de: "where you stand", tr: "durduğun yer" },
      { de: "a symbol", tr: "simge" },
      { de: "bears", tr: "taşıyor" },
      { de: "at once", tr: "aynı anda" },
      { de: "formal", tr: "resmî" },
      { de: "fits", tr: "yakışıyor" },
      { de: "parenthetical", tr: "ara söz" },
      { de: "a comma pair", tr: "virgül çifti" },
      { de: "an admission", tr: "kabul" },
      { de: "the main claim", tr: "ana iddia" },
      { de: "argued", tr: "savunulan" },
    ],
    minutes: 12,
    text:
      "Much as we call it strangeness, it is otherness. The sentence is about one word being wrong and another being right, and the difference between them is not a difference in the thing being described.\n" +
      "„Strangeness“ is a property. It sits in the object, the person, the room, and a reader is invited to agree that it is there. „Otherness“ is a relation. It cannot be in anything on its own; it is measured from where you stand, and the word carries the speaker into the sentence whether the speaker wanted to come or not.\n" +
      "So the choice between the two words is a choice about distance, and it belongs to the writer rather than to the thing.\n" +
      "Now the grammar this lesson is built on. Her demeanor, albeit formal, fits the milieu. „Albeit“ takes no clause. There is no subject after it and no verb, only „formal“, and that is what separates it from „although“, which cannot stand without a clause behind it.\n" +
      "Albeit a symbol of purity, the artifact bears a stigma. Here the same word opens the sentence and takes a whole noun phrase, still with no verb anywhere in it. English is holding two things at once: the object is a symbol of purity, and it is marked, and neither half has been argued.\n" +
      "That is the useful part. A concession made with a verbless phrase is an admission the writer never has to defend, because nothing in it was stated as a sentence. The reader takes it in as background and the main claim arrives already qualified.\n" +
      "German has the same tool and uses it in the same place, so a reader coming from there will not stumble. What differs is how often it is safe. In English a comma pair will hold almost anything and the sentence stays readable; in German the same material tends to be pulled forward in front of the noun, and two of them in one sentence is one too many.\n" +
      "Which leaves the warning this lesson deserves. A parenthetical concession is the easiest place in a paragraph to smuggle something past a reader, and a writer who notices themselves reaching for one twice on a page should ask which of the two claims they are avoiding writing out in full.",
    questions: [
      {
        text: "What is „otherness“?",
        options: ["a relation", "a property", "an object"],
        answer: 0,
        explain: "„„Otherness“ is a relation.“",
      },
      {
        text: "What does „albeit“ take?",
        options: ["no clause", "a clause", "a subject and a verb"],
        answer: 0,
        explain: "„„Albeit“ takes no clause.“",
      },
      {
        kind: "truefalse",
        text: "„Although“ can stand without a clause behind it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„…„although“, which cannot stand without a clause behind it.“",
      },
      {
        kind: "gapfill",
        text: "Her demeanor, ___ formal, fits the milieu.",
        options: [],
        answer: 0,
        accept: ["albeit"],
        explain: "„Her demeanor, albeit formal, fits the milieu.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Much as we call it strangeness, it is otherness.",
          "Her demeanor, albeit formal, fits the milieu.",
          "Albeit a symbol of purity, the artifact bears a stigma.",
          "A concession made this way never has to be defended.",
        ],
        explain: "İki sözcük, ara söz, cümle başı; en sonda ölçü.",
      },
      {
        kind: "short_answer",
        text: "What does the word carry into the sentence?",
        options: [],
        answer: 0,
        accept: ["the speaker", "the writer", "the one speaking"],
        explain: "„the word carries the speaker into the sentence…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u10-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "Saying less than you mean",
    genre: "dialogue",
    intro: "„Less so“ neyi kısaltıyor? Azı söylemek neyi büyütüyor?",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "a meal", tr: "yemek" },
      { de: "a welcome", tr: "karşılama" },
      { de: "borrowed", tr: "ödünç alınmış" },
      { de: "a complaint", tr: "şikâyet" },
      { de: "louder", tr: "daha yüksek sesli" },
      { de: "spare", tr: "yedek" },
      { de: "an inserted clause", tr: "araya sokulmuş cümlecik" },
      { de: "reported", tr: "aktarılmış" },
      { de: "a verdict", tr: "hüküm" },
      { de: "an adjective", tr: "sıfat" },
      { de: "a family", tr: "aile" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Selin", text: "The meal was hearty; the welcome, less so. Two words at the end of that line and the whole evening has been reported." },
      { speaker: "Berk", text: "„Less so“ is standing in for an adjective." },
      { speaker: "Selin", text: "For an adjective and for a verb. The second half has borrowed both from the first, and what is left is a comparison with nothing in it to argue with." },
      { speaker: "Berk", text: "Could you just say the welcome was cold?" },
      { speaker: "Selin", text: "You could, and then you would have made a claim somebody can answer. „Less so“ makes no claim; it only declines to repeat the good word, and a reader hears the decline." },
      { speaker: "Berk", text: "That is louder than the complaint would have been." },
      { speaker: "Selin", text: "Far louder, and it costs nothing. That is the whole economy of saying less than you mean, and this vocabulary is built out of it." },
      { speaker: "Berk", text: "A headstrong child, they said, and rather inquisitive." },
      { speaker: "Selin", text: "Now look at what „they said“ is doing there. It has been pushed into the middle of the line so that the two adjectives arrive before the source of them does." },
      { speaker: "Berk", text: "So the reader meets the verdict first." },
      { speaker: "Selin", text: "The reader meets the verdict first and the speaker second, and by then the words are already in the room. An inserted clause always arrives too late to stop anything." },
      { speaker: "Berk", text: "And „rather“?" },
      { speaker: "Selin", text: "„Rather inquisitive“ is not a spare word. It is the family telling you they had a word for it and this is the polite one, and everyone at the table knows which word was left at home." },
    ],
    questions: [
      {
        text: "What has the second half borrowed?",
        options: ["an adjective and a verb", "a subject", "a welcome"],
        answer: 0,
        explain: "„The second half has borrowed both from the first…“",
      },
      {
        text: "What does „less so“ make?",
        options: ["no claim", "a complaint", "a comparison nobody hears"],
        answer: 0,
        explain: "„„Less so“ makes no claim…“",
      },
      {
        kind: "truefalse",
        text: "An inserted clause always arrives too late to stop anything.",
        options: ["True", "False"],
        answer: 0,
        explain: "„An inserted clause always arrives too late to stop anything.“",
      },
      {
        kind: "gapfill",
        text: "A headstrong child, they said, and ___ inquisitive.",
        options: [],
        answer: 0,
        accept: ["rather"],
        explain: "„A headstrong child, they said, and rather inquisitive.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The meal was hearty; the welcome, less so.", "The meal was hearty; the welcome, less so"],
        explain: "İkinci yarı sıfatı da fiili de ödünç alıyor.",
      },
      {
        kind: "short_answer",
        text: "Who does the reader meet first?",
        options: [],
        answer: 0,
        accept: ["the verdict", "the words", "the adjectives"],
        explain: "„The reader meets the verdict first and the speaker second…“",
      },
    ],
  },
  {
    id: "en-c1-u10-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "How much the text says",
    genre: "monologue",
    intro: "Bir okuma ne zaman bir alanı kaplar? Çekince nerede duruyor?",
    gloss: [
      { de: "hedge", tr: "çekince" },
      { de: "certainty", tr: "kesinlik" },
      { de: "fourth", tr: "dördüncü" },
      { de: "defence", tr: "savunma" },
      { de: "a scene", tr: "sahne" },
      { de: "an ordinary thing", tr: "sıradan şey" },
      { de: "a field", tr: "alan" },
      { de: "a footnote", tr: "dipnot" },
      { de: "the doubter", tr: "kuşku duyan" },
      { de: "expensive", tr: "pahalı" },
      { de: "a seminar", tr: "seminer" },
      { de: "a reading", tr: "okuma" },
      { de: "the evidence", tr: "kanıt" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Aylin", text: "The scene may well be mundane rather than highly symbolic. Start every reading with that sentence and half your work is already done." },
      { speaker: "Aylin", text: "„May well be“ is the hedge, and here it is not weakness. It is the only honest opening when the evidence is a single scene." },
      { speaker: "Aylin", text: "A reading that begins with certainty has decided before it looked, and a reader can hear that in the first line of a paper." },
      { speaker: "Aylin", text: "A reading of great age might permeate a whole field. This is the danger and it is quiet, because nobody chooses it." },
      { speaker: "Aylin", text: "One paper says it, a second quotes the first, a third quotes the second, and by the fourth the claim has become a footnote nobody has checked." },
      { speaker: "Aylin", text: "The age of a reading is not evidence for it. That is the shortest rule in this seminar and the hardest one to keep." },
      { speaker: "Aylin", text: "A culture may hand down its exoticism and ostracize the doubter. The same two moves, one page higher, and now they are about people rather than papers." },
      { speaker: "Aylin", text: "What is handed down is cheap and what is asked of the doubter is expensive, and the difference in price is the whole of how a reading survives." },
      { speaker: "Aylin", text: "So when you write, mark the ordinary thing as ordinary. It costs one word and it is the only defence a paper has against its own field." },
      { speaker: "Aylin", text: "And when you read, find the first paper in the chain. It is usually shorter than you expect and it usually says less." },
    ],
    questions: [
      {
        text: "When is the hedge not weakness?",
        options: ["when the evidence is one scene", "when the reading is old", "when the field agrees"],
        answer: 0,
        explain: "„It is the only honest opening when the evidence is a single scene.“",
      },
      {
        text: "What is not evidence for a reading?",
        options: ["its age", "its length", "its field"],
        answer: 0,
        explain: "„The age of a reading is not evidence for it.“",
      },
      {
        kind: "truefalse",
        text: "Somebody chooses the danger in the second example.",
        options: ["True", "False"],
        answer: 1,
        explain: "„This is the danger and it is quiet, because nobody chooses it.“",
      },
      {
        kind: "gapfill",
        text: "The scene may well be ___ rather than highly symbolic.",
        options: [],
        answer: 0,
        accept: ["mundane"],
        explain: "„The scene may well be mundane rather than highly symbolic.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The scene may well be mundane rather than highly symbolic.", "The scene may well be mundane rather than highly symbolic"],
        explain: "Çekince burada zayıflık değil, dürüstlük.",
      },
      {
        kind: "short_answer",
        text: "What should you find when you read?",
        options: [],
        answer: 0,
        accept: ["the first paper", "the first one", "the start of the chain"],
        explain: "„find the first paper in the chain.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u10-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "The multilayeredness above becomes a predisposition below",
    genre: "info",
    intro: "Sona asılan niteleme ve fiilsiz taviz.",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "multilayeredness", tr: "çok katmanlılık" },
      { de: "a predisposition", tr: "yatkınlık" },
      { de: "wrath", tr: "gazap" },
      { de: "resentment", tr: "içerleme" },
      { de: "emancipation", tr: "özgürleşme" },
      { de: "to subside", tr: "dinmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yukarıdaki çok katmanlılık aşağıda bir yatkınlığa dönüşüyor.",
        answer: "The multilayeredness above becomes a predisposition below.",
        hint: "İki edat nesnesiz kalmış ve ismin ardına asılmış.",
      },
      {
        kind: "build",
        tr: "O gazap, belirtildiği gibi, önceki bir sayfanın içerlemesidir.",
        answer: "That wrath, as noted, is the resentment of an earlier page.",
        hint: "Ara söz okura bunun bir yineleme olduğunu söylüyor.",
      },
      {
        kind: "build",
        tr: "Özgürleşmenin yerinde saydığı yerde öfke dinmiyor.",
        answer: "Where emancipation stagnates, the anger does not subside.",
        hint: "Sayfada değil savda bir yer gösteriyor.",
      },
      {
        kind: "build",
        tr: "Onun tavrı, resmî olsa da, muhite yakışıyor.",
        answer: "Her demeanor, albeit formal, fits the milieu.",
        hint: "„Albeit“ cümlecik istemiyor; ardında yalnız bir sıfat var.",
      },
      {
        kind: "build",
        tr: "Saflık simgesi olsa da eser bir damga taşıyor.",
        answer: "Albeit a symbol of purity, the artifact bears a stigma.",
        hint: "Aynı sözcük cümlenin başında ve fiilsiz bir isim öbeği alıyor.",
      },
      {
        kind: "form",
        prompt: "Niteleme kartını doldur.",
        facts: "İngilizce niteleyeni ismin ardına parça parça asıyor; öbek her noktada tamamlanmış oluyor; Almanca önden bir parantez kuruyor; parantezin bir boyu var.",
        fields: [
          { label: "In English", answer: "behind the noun", accept: ["after it"] },
          { label: "In German", answer: "in front of it", accept: ["before the noun"] },
          { label: "At every point", answer: "complete", accept: ["finished"] },
          { label: "The bracket", answer: "has a size", accept: ["has a limit"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u10-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "The meal was hearty; the welcome, less so",
    genre: "info",
    intro: "Azı söylemek ve okumanın çekincesi.",
    gloss: [
      { de: "hearty", tr: "doyurucu" },
      { de: "estrangement", tr: "uzaklaşma" },
      { de: "headstrong", tr: "dik başlı" },
      { de: "inquisitive", tr: "her şeyi merak eden" },
      { de: "strangeness", tr: "tuhaflık" },
      { de: "otherness", tr: "ötekilik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yemek doyurucuydu; karşılama, daha az.",
        answer: "The meal was hearty; the welcome, less so.",
        hint: "İkinci yarı hem sıfatı hem fiili ödünç alıyor.",
      },
      {
        kind: "build",
        tr: "Burada hiç yabancılaşmayız; uzaklaşmayı sonradan adlandırırız.",
        answer: "We never become estranged here; we just name the estrangement later.",
        hint: "Olay yok, ad var: adlandırma sonradan geliyor.",
      },
      {
        kind: "build",
        tr: "Dik başlı bir çocuk, dediler, ve epeyce her şeyi merak eden.",
        answer: "A headstrong child, they said, and rather inquisitive.",
        hint: "Araya sokulmuş cümlecik hükümden sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Ona tuhaflık desek de, o ötekiliktir.",
        answer: "Much as we call it strangeness, it is otherness.",
        hint: "Biri özellik, öteki ilişki: fark nesnede değil.",
      },
      {
        kind: "build",
        tr: "Sahne son derece sembolik değil, pekâlâ sıradan olabilir.",
        answer: "The scene may well be mundane rather than highly symbolic.",
        hint: "Kanıt tek bir sahneyse tek dürüst açılış bu.",
      },
    ],
  },
];
