import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 9 — "Anlatıcı nerede duruyor, bir metni aktarmak,
 * klasiğin dili, şiirin dışarıda bıraktıkları".
 *
 * Dört ders: Where the narrator stands · Reporting a text ·
 * The language of the classic · What the poem leaves out.
 *
 *   Kelime: narrative perspective, novella, topos, canon, contextualize,
 *           decipher, dissect, interpretive pattern, ideological,
 *           Enlightenment, metaphysics, epistemology, paradoxical,
 *           fragmentary, contemplative, reminiscence, lore, relic,
 *           cipher, zeitgeist, epochal.
 *   Kalıp:  What the narrative perspective does is withhold. ·
 *           Into the novella creeps a monologue. ·
 *           The topos we know; the canon we argue about. ·
 *           She contextualizes it; he deciphers it; they dissect it. ·
 *           The interpretive pattern claims what the reading assumes. ·
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
    title: "The language of the classic",
    genre: "info",
    intro: "Aynı hareket iki dilde var. Peki aynı katta mı?",
    gloss: [
      { de: "anywhere", tr: "başka yerde" },
      { de: "court", tr: "mahkeme" },
      { de: "altogether", tr: "büsbütün" },
      { de: "disappears", tr: "yok oluyor" },
      { de: "mechanism", tr: "mekanizma" },
      { de: "differs", tr: "farklı" },
      { de: "middle", tr: "orta" },
      { de: "belongs", tr: "ait" },
      { de: "either", tr: "ikisinden biri" },
      { de: "everyday", tr: "gündelik" },
      { de: "above", tr: "yukarıda" },
      { de: "subjunctive", tr: "istek kipi" },
      { de: "whole", tr: "bütün" },
      { de: "belong", tr: "ait olmak" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "thrown away", tr: "atılmış" },
      { de: "a condition", tr: "koşul" },
      { de: "word order", tr: "söz dizimi" },
      { de: "allowed", tr: "izinli" },
      { de: "a fourth verb", tr: "dördüncü fiil" },
      { de: "the measurement", tr: "ölçüm" },
      { de: "recognise", tr: "tanımak" },
      { de: "immediately", tr: "hemen" },
      { de: "identical", tr: "birebir aynı" },
      { de: "the floor", tr: "kat" },
      { de: "ordinary", tr: "sıradan" },
      { de: "a complaint", tr: "şikâyet" },
      { de: "unusual", tr: "alışılmadık" },
      { de: "marked", tr: "işaretli" },
      { de: "a joke", tr: "şaka" },
      { de: "share", tr: "paylaşmak" },
      { de: "worth", tr: "değer" },
      { de: "louder", tr: "daha yüksek sesli" },
      { de: "the mood", tr: "kip" },
      { de: "daily work", tr: "günlük iş" },
      { de: "rent", tr: "kiralamak" },
      { de: "a price", tr: "fiyat" },
      { de: "simpler", tr: "daha basit" },
    ],
    minutes: 12,
    text:
      "Were it not for metaphysics, epistemology would be simpler. Nine words and no „if“ anywhere in them.\n" +
      "The verb has moved to the front of its own clause and the conjunction has been thrown away, and the sentence still reads as a condition, because here the word order on its own is enough to say so.\n" +
      "Three verbs are allowed to do this and no others: „were“, „had“ and „should“. Were it not for the levy. Had the court known. Should you need the file. Try it with a fourth verb and the sentence stops being English altogether.\n" +
      "Now the measurement, and this one does not go the way the others have gone. A reader coming from German will recognise the move immediately, and they will be right to. The same thing happens there: the verb goes first, the conjunction disappears, the meaning is the same. This is not a shape English has and its neighbour lacks. The mechanism is identical.\n" +
      "What differs is the floor it sits on. In German the move is ordinary. It turns up in a kitchen, in a complaint, in the middle of an argument about a parking space, and nobody hears anything unusual in it. In English the same move is marked. „Had I known“ belongs to a page rather than to a room, and a speaker who uses it in a kitchen has either made a joke or made a mistake.\n" +
      "So the two languages share a sentence and disagree about what it is worth. Here is the harder half of that. A speaker who carries their own everyday shape straight into English arrives in a register three floors above the one they were standing on. Nothing they have written is wrong, and everything they have written is louder than they meant it to be.\n" +
      "The other two lines of this lesson put the old mood on the same page. The Enlightenment demanded that reason be free. They ask that no claim be paradoxical. That is the subjunctive this level opened with, and it belongs here because a text about the Enlightenment is one of the last places in English where the mood is still doing daily work.\n" +
      "One sentence, then, for the whole lesson. Two languages can own the same shape and rent it out at different prices.",
    questions: [
      {
        text: "How many verbs are allowed to do this?",
        options: ["three", "two", "any of them"],
        answer: 0,
        explain: "„Three verbs are allowed to do this and no others…“",
      },
      {
        text: "What differs between the two languages?",
        options: ["the floor it sits on", "the mechanism", "the meaning"],
        answer: 0,
        explain: "„What differs is the floor it sits on.“",
      },
      {
        kind: "truefalse",
        text: "This is a shape English has and its neighbour lacks.",
        options: ["True", "False"],
        answer: 1,
        explain: "„This is not a shape English has and its neighbour lacks.“",
      },
      {
        kind: "gapfill",
        text: "Were it not ___ metaphysics, epistemology would be simpler.",
        options: [],
        answer: 0,
        accept: ["for"],
        explain: "„Were it not for metaphysics, epistemology would be simpler.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Were it not for metaphysics, epistemology would be simpler.",
          "Three verbs are allowed to do this.",
          "The mechanism is identical.",
          "What differs is the floor it sits on.",
        ],
        explain: "Cümle, liste, ortak mekanizma; en sonda ayrım.",
      },
      {
        kind: "short_answer",
        text: "Where does „Had I known“ belong?",
        options: [],
        answer: 0,
        accept: ["a page", "to a page", "writing"],
        explain: "„„Had I known“ belongs to a page rather than to a room…“",
      },
    ],
  },
  {
    id: "en-c1-u09-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "Where the narrator stands",
    genre: "opinion",
    intro: "Bakış açısı bir yer değil bir liste. Neyin listesi?",
    gloss: [
      { de: "cleft", tr: "yarık cümle" },
      { de: "fourth", tr: "dördüncü" },
      { de: "narrator", tr: "anlatıcı" },
      { de: "event", tr: "olay" },
      { de: "whole", tr: "bütün" },
      { de: "objects", tr: "nesneler" },
      { de: "deletion", tr: "silme" },
      { de: "halves", tr: "yarılar" },
      { de: "neutral", tr: "yansız" },
      { de: "ought", tr: "gerek" },
      { de: "able", tr: "muktedir" },
      { de: "infinitive", tr: "mastar" },
      { de: "simply", tr: "düpedüz" },
      { de: "underneath", tr: "altta" },
      { de: "withhold", tr: "esirgemek" },
      { de: "the emphasis", tr: "vurgu" },
      { de: "a place", tr: "yer" },
      { de: "told", tr: "söylenmiş" },
      { de: "atmosphere", tr: "hava" },
      { de: "arithmetic", tr: "hesap" },
      { de: "entered", tr: "girmiş" },
      { de: "the ordinary way round", tr: "alışılmış yönde" },
      { de: "reports", tr: "bildiriyor" },
      { de: "stages", tr: "sahneliyor" },
      { de: "a summary", tr: "özet" },
      { de: "a scene", tr: "sahne" },
      { de: "repeats", tr: "yineliyor" },
      { de: "equal", tr: "eşit" },
      { de: "a theory", tr: "kuram" },
      { de: "a period", tr: "dönem" },
      { de: "a code", tr: "şifre" },
      { de: "a body", tr: "gövde" },
      { de: "an assumption", tr: "varsayım" },
      { de: "written down", tr: "yazıya dökülmüş" },
      { de: "an inference", tr: "çıkarım" },
      { de: "standing", tr: "ayakta" },
      { de: "an author", tr: "yazar" },
      { de: "allowed to notice", tr: "fark etmesine izin verilen" },
    ],
    minutes: 12,
    text:
      "What the narrative perspective does is withhold. The shape of that sentence has been met twice already, a cleft with „is“ as the fourth word, and it is here because the claim needs the emphasis a cleft gives it.\n" +
      "A perspective is not a place the narrator stands. It is a list of things the reader is not going to be told, and the list was chosen before the first line was written. The reader feels it as atmosphere. It was arithmetic.\n" +
      "Into the novella creeps a monologue. The place first, the subject last, and something has entered a text that was not built for it. Written the ordinary way round, a monologue creeps into the novella, the sentence reports an event. Written this way it stages one, and that is the whole difference between a summary and a scene.\n" +
      "The topos we know; the canon we argue about. Two objects at the front, and the second half repeats the shape rather than deleting the verb, because a deletion here would have made the two halves sound equal, and they are not.\n" +
      "Then the second lesson, which is about what a reader does to a text rather than what a text does to a reader. She contextualizes it; he deciphers it; they dissect it. Three verbs, three theories, and not one of them neutral: the first puts the text in a period, the second assumes a code, the third assumes a body on a table.\n" +
      "The interpretive pattern claims what the reading assumes. That is a sentence a student ought to be able to write about their own paragraph, and most cannot, because the assumption is the part of a reading that never gets written down.\n" +
      "To call a text ideological is not to read it. The infinitive shape again, denying an inference and leaving every fact standing. The text may well be ideological. Saying so is simply not the same act as reading it, and a paper that stops there has described its author rather than its subject.\n" +
      "The lesson underneath all four of these lines is one sentence long. Every choice about form is a choice about what the reader will be allowed to notice.",
    questions: [
      {
        text: "What is a perspective?",
        options: ["a list of things not told", "a place the narrator stands", "an atmosphere"],
        answer: 0,
        explain: "„It is a list of things the reader is not going to be told…“",
      },
      {
        text: "What does the second word order do?",
        options: ["stages an event", "reports an event", "repeats an event"],
        answer: 0,
        explain: "„Written this way it stages one…“",
      },
      {
        kind: "truefalse",
        text: "One of the three verbs is neutral.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Three verbs, three theories, and not one of them neutral…“",
      },
      {
        kind: "gapfill",
        text: "Into the novella ___ a monologue.",
        options: [],
        answer: 0,
        accept: ["creeps"],
        explain: "„Into the novella creeps a monologue.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What the narrative perspective does is withhold.",
          "Into the novella creeps a monologue.",
          "The topos we know; the canon we argue about.",
          "Every choice about form is a choice about what the reader notices.",
        ],
        explain: "Yarma, yer öne, nesne öne; en sonda ortak kural.",
      },
      {
        kind: "short_answer",
        text: "What never gets written down?",
        options: [],
        answer: 0,
        accept: ["the assumption", "an assumption", "what the reading assumes"],
        explain: "„the assumption is the part of a reading that never gets written down.“",
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
    title: "What the poem leaves out",
    genre: "dialogue",
    intro: "Yedinci ünitedeki silme geri döndü. Burada ne yapıyor?",
    gloss: [
      { de: "aloud", tr: "sesli olarak" },
      { de: "crime", tr: "suç" },
      { de: "units", tr: "üniteler" },
      { de: "deletion", tr: "silme" },
      { de: "survive", tr: "sağ kalmak" },
      { de: "halves", tr: "yarılar" },
      { de: "judgement", tr: "yargı" },
      { de: "whole", tr: "bütün" },
      { de: "century", tr: "yüzyıl" },
      { de: "a gap", tr: "boşluk" },
      { de: "a line break", tr: "dize sonu" },
      { de: "survives", tr: "sağ kalıyor" },
      { de: "a pair", tr: "çift" },
      { de: "an ear", tr: "kulak" },
      { de: "a decade", tr: "on yıl" },
      { de: "disagreed", tr: "uyuşmamış" },
      { de: "a witness", tr: "tanık" },
      { de: "cold", tr: "soğuk" },
      { de: "a sermon", tr: "vaaz" },
      { de: "a note", tr: "not" },
      { de: "an archive", tr: "arşiv" },
      { de: "afterwards", tr: "sonradan" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Yaprak", text: "The poem is fragmentary; the reader, contemplative. Read it aloud and you will hear where the missing verb was." },
      { speaker: "Ozan", text: "That is the shape from the crime report, two units back." },
      { speaker: "Yaprak", text: "The same shape and a different job. There it saved room in a paragraph; here it makes a gap, and the gap is what a line break would have done in a longer poem." },
      { speaker: "Ozan", text: "So the deletion is the point." },
      { speaker: "Yaprak", text: "The deletion is the point. Put the verb back and nothing is wrong with the sentence, and the poem has lost the one second of silence it was built around." },
      { speaker: "Ozan", text: "A reminiscence survives as lore, a relic as a cipher." },
      { speaker: "Yaprak", text: "A pair, and the second half is deleted again. Two things survive; each survives as something smaller than it was, and the sentence refuses to say so twice." },
      { speaker: "Ozan", text: "Why not say it twice?" },
      { speaker: "Yaprak", text: "Because the ear has already learned the pattern from the first half, and a reader who is told the same shape twice stops listening for the difference between the two halves." },
      { speaker: "Ozan", text: "And the last line is not a poem at all." },
      { speaker: "Yaprak", text: "The zeitgeist felt epochal; the decade did not. A judgement about a whole period, and it fits in seven words because the second half borrows every one of the first half's." },
      { speaker: "Ozan", text: "A witness who disagreed with their own century." },
      { speaker: "Yaprak", text: "Written afterwards, in an archive, by somebody who had been there. That is the only place a sentence this cold can come from, and it is why the line is worth more than the sermon next to it." },
    ],
    questions: [
      {
        text: "What does the gap do here?",
        options: ["the work of a line break", "saves room", "marks a list"],
        answer: 0,
        explain: "„the gap is what a line break would have done in a longer poem.“",
      },
      {
        text: "Why is the second half not said twice?",
        options: ["the ear has learned the pattern", "it is too long", "it is a poem"],
        answer: 0,
        explain: "„the ear has already learned the pattern from the first half…“",
      },
      {
        kind: "truefalse",
        text: "Here the deletion saved room in a paragraph.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the poem has lost the one second of silence it was built around.“",
      },
      {
        kind: "gapfill",
        text: "The zeitgeist felt epochal; the decade ___ not.",
        options: [],
        answer: 0,
        accept: ["did"],
        explain: "„The zeitgeist felt epochal; the decade did not.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The poem is fragmentary; the reader, contemplative.", "The poem is fragmentary; the reader, contemplative"],
        explain: "İkinci yarıda fiil yok; virgül onu tutuyor.",
      },
      {
        kind: "short_answer",
        text: "Where was the last line written?",
        options: [],
        answer: 0,
        accept: ["in an archive", "an archive", "afterwards"],
        explain: "„Written afterwards, in an archive, by somebody who had been there.“",
      },
    ],
  },
  {
    id: "en-c1-u09-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "Reporting a text",
    genre: "monologue",
    intro: "Bir metni aktarırken hangi fiili seçtiğin bir kuram seçmektir.",
    gloss: [
      { de: "theory", tr: "kuram" },
      { de: "either", tr: "ikisinden biri" },
      { de: "clothes", tr: "giysiler" },
      { de: "whole", tr: "bütün" },
      { de: "assume", tr: "varsaymak" },
      { de: "a seminar", tr: "seminer" },
      { de: "a verb", tr: "fiil" },
      { de: "a table", tr: "masa" },
      { de: "a claim", tr: "iddia" },
      { de: "a reading", tr: "okuma" },
      { de: "prevailing", tr: "baskın" },
      { de: "normative", tr: "normatif" },
      { de: "an essay", tr: "deneme" },
      { de: "a margin", tr: "kenar boşluğu" },
      { de: "unexamined", tr: "sınanmamış" },
      { de: "an exam", tr: "sınav" },
      { de: "the second paragraph", tr: "ikinci paragraf" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Merve", text: "She contextualizes it; he deciphers it; they dissect it. I write those three verbs on the board in the first seminar of every year." },
      { speaker: "Merve", text: "Nobody in the room has chosen a theory yet, and all three of them have already chosen one without noticing." },
      { speaker: "Merve", text: "The first verb puts the text back into its period. The second assumes there is a code in it. The third assumes a body on a table." },
      { speaker: "Merve", text: "The interpretive pattern claims what the reading assumes. That is the sentence I want in every essay, and I get it about twice a term." },
      { speaker: "Merve", text: "The assumption is the part that never reaches the page. It goes into the margin of the book in the first week and stays there, unexamined, until an exam asks for it." },
      { speaker: "Merve", text: "A prevailing reading is not a true one. It is the reading that was written by the people who were given the room to write it." },
      { speaker: "Merve", text: "And a normative claim is not a wrong one either. It is a claim about what should happen, wearing the clothes of a claim about what does." },
      { speaker: "Merve", text: "So here is the rule for the second paragraph of any paper you give me. Name the assumption before you use it." },
      { speaker: "Merve", text: "To call a text ideological is not to read it. Half the papers I mark stop at that line and think they have finished." },
      { speaker: "Merve", text: "Naming a habit is the cheapest thing a reader can do. Showing where the habit changed a single sentence is the whole of the work, and it is honest." },
    ],
    questions: [
      {
        text: "What does the third verb assume?",
        options: ["a body on a table", "a code", "a period"],
        answer: 0,
        explain: "„The third assumes a body on a table.“",
      },
      {
        text: "What is a prevailing reading?",
        options: ["the one written by those with the room", "a true one", "a normative one"],
        answer: 0,
        explain: "„It is the reading that was written by the people who were given the room to write it.“",
      },
      {
        kind: "truefalse",
        text: "The assumption usually reaches the page.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The assumption is the part that never reaches the page.“",
      },
      {
        kind: "gapfill",
        text: "She contextualizes it; he ___ it; they dissect it.",
        options: [],
        answer: 0,
        accept: ["deciphers"],
        explain: "„She contextualizes it; he deciphers it; they dissect it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The interpretive pattern claims what the reading assumes.", "The interpretive pattern claims what the reading assumes"],
        explain: "İki belge, iki katman: iddia ile varsayım.",
      },
      {
        kind: "short_answer",
        text: "What is the whole of the work?",
        options: [],
        answer: 0,
        accept: ["showing where it changed", "showing the effect", "finding the sentence"],
        explain: "„Showing where the habit changed a single sentence is the whole of the work…“",
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
    title: "Were it not for metaphysics",
    genre: "info",
    intro: "Bağlaçsız koşul ve eski kip.",
    gloss: [
      { de: "conjunction", tr: "bağlaç" },
      { de: "ordinary", tr: "olağan" },
      { de: "everyday", tr: "gündelik" },
      { de: "literary", tr: "edebi" },
      { de: "metaphysics", tr: "metafizik" },
      { de: "epistemology", tr: "bilgi kuramı" },
      { de: "paradoxical", tr: "paradoksal" },
      { de: "the Enlightenment", tr: "Aydınlanma" },
      { de: "a novella", tr: "uzun öykü" },
      { de: "a topos", tr: "edebi motif" },
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
        hint: "Dördüncü sözcük „is“: yarma cümle.",
      },
      {
        kind: "build",
        tr: "Uzun öyküye bir monolog sızıyor.",
        answer: "Into the novella creeps a monologue.",
        hint: "Yer başta, özne sonda: olayı bildirmiyor, sahneliyor.",
      },
      {
        kind: "form",
        prompt: "Bağlaçsız koşul kartını doldur.",
        facts: "Fiil başa geçiyor ve bağlaç atılıyor; yalnız üç fiil izinli; mekanizma Almancada da aynı; ayrım kayıtta, Almancada sıradan İngilizcede işaretli.",
        fields: [
          { label: "The three verbs", answer: "were, had, should", accept: ["were had should"] },
          { label: "What is dropped", answer: "the conjunction", accept: ["if"] },
          { label: "In German", answer: "ordinary", accept: ["everyday"] },
          { label: "In English", answer: "marked", accept: ["literary"] },
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
    title: "The poem is fragmentary; the reader, contemplative",
    genre: "info",
    intro: "Şiirde silme ve metni aktaran üç fiil.",
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
        tr: "Bir anımsama halk bilgisi olarak, bir eski eser şifre olarak sağ kalıyor.",
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
