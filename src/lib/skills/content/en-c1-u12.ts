import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 12 — "Göçün sözcükleri, geçmişi kim aktarıyor,
 * yakın ne kadar yakın, gerçekten sıcak bir karşılama".
 *
 * Dört ders: The vocabulary of migration · Who reports the past ·
 * How close is close · A warm welcome indeed.
 *
 *   Kelime: migration background, migration flow, net migration, influx,
 *           refugee convention, reinterpret, memory culture, interpretive
 *           authority, exegesis, heritage protection, customary law,
 *           venerable, kinship, lifeworld, reciprocity, socialization,
 *           pecking order, opulent, faceless, deviance, dissonance.
 *   Kalıp:  A migration background is not a migration flow. ·
 *           Out-migration and internal migration produce net migration. ·
 *           An influx is counted; a refugee convention is signed. ·
 *           One reinterprets the memory culture; another guards the interpretive authority. ·
 *           The exegesis claims what heritage protection assumes. ·
 *           To call customary law venerable is not to obey it. ·
 *           Kinship may well shape the lifeworld more than the law. ·
 *           Reciprocity might be reciprocal only in name. ·
 *           Socialization may set the pecking order before the initiation. ·
 *           The banquet was opulent; the welcome, faceless. ·
 *           We have no deviance here; we have a locally customary norm violation. ·
 *           Taboo breaking, they said, and rather good for the dissonance.
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
    title: "How close is close",
    genre: "info",
    intro: "Bir karşılaştırma iki cümle demek olabiliyor. Onarımı ne?",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "except", tr: "dışında" },
      { de: "nouns", tr: "isimler" },
      { de: "object", tr: "nesne" },
      { de: "comma", tr: "virgül" },
      { de: "exists", tr: "var" },
      { de: "twice", tr: "iki kez" },
      { de: "either", tr: "ya" },
      { de: "a reading", tr: "okuma" },
      { de: "chooses", tr: "seçiyor" },
      { de: "an accident", tr: "kaza" },
      { de: "bare", tr: "yalın" },
      { de: "a hole", tr: "delik" },
      { de: "a role", tr: "rol" },
      { de: "clever", tr: "hünerli" },
      { de: "an ending", tr: "ek" },
      { de: "marked", tr: "işaretli" },
      { de: "threw away", tr: "attı" },
      { de: "by hand", tr: "elle" },
      { de: "a repair", tr: "onarım" },
      { de: "context", tr: "bağlam" },
      { de: "a helping verb", tr: "yardımcı fiil" },
      { de: "no meaning of its own", tr: "kendi anlamı yok" },
      { de: "an adjective", tr: "sıfat" },
      { de: "either side", tr: "iki yanı" },
      { de: "denying", tr: "yadsımak" },
      { de: "a time word", tr: "zaman sözcüğü" },
      { de: "never hear about it", tr: "hiç haberi olmayacak" },
    ],
    minutes: 12,
    text:
      "Kinship may well shape the lifeworld more than the law. Read that once and you have understood it. Read it twice and you will find that you cannot say which of two things it means.\n" +
      "Either kinship shapes the lifeworld more than the law shapes it, or kinship shapes the lifeworld more than it shapes the law. Two readings, and nothing in the sentence chooses between them.\n" +
      "This is not a rare accident. Every English comparison that ends in a bare noun has the same hole in it, because the second half is allowed to leave out everything except the one word being compared, and once the verb has gone there is nothing left to show which role that word had.\n" +
      "A neighbouring language does not have the problem and does nothing clever to avoid it. Its nouns carry an ending for their role, so the compared word arrives already marked: one ending says it is a subject, another says it is an object, and the reader has the answer before the sentence ends. The gap is closed by a single letter that English threw away several hundred years ago.\n" +
      "So an English writer has to repair it by hand, and there is exactly one repair. Put the verb back. „More than the law does“ has one reading. „More than it does the law“ has the other. Nothing else works: not a comma, not word order, and not any amount of context that a careful reader will agree to trust.\n" +
      "Which makes this one of the few places where the small helping verb earns its keep. It has no meaning of its own, it exists to stand where a real verb would have stood, and here it is the only thing that can hold the role of a noun open long enough to be read.\n" +
      "Reciprocity might be reciprocal only in name. The second line of the lesson, with a hole of its own and a different one: the noun and its adjective sit on either side of the verb, and „only in name“ takes back what the sentence has just said without denying any of it.\n" +
      "Socialization may set the pecking order before the initiation. Here „before“ is doing the work the comparison was doing above, and it is safe, because a time word cannot be read as a subject.\n" +
      "The rule for a paragraph, then. A comparison is the one place in English where a reader can finish a sentence with two different sentences in their head, and the writer will never hear about it.",
    questions: [
      {
        text: "What has the same hole in it?",
        options: ["a comparison ending in a bare noun", "every long sentence", "a time word"],
        answer: 0,
        explain: "„Every English comparison that ends in a bare noun has the same hole in it…“",
      },
      {
        text: "What is the one repair?",
        options: ["put the verb back", "add a comma", "change the word order"],
        answer: 0,
        explain: "„there is exactly one repair. Put the verb back.“",
      },
      {
        kind: "truefalse",
        text: "Context can be trusted to close the gap.",
        options: ["True", "False"],
        answer: 1,
        explain: "„not any amount of context that a careful reader will agree to trust.“",
      },
      {
        kind: "gapfill",
        text: "Reciprocity might be reciprocal ___ in name.",
        options: [],
        answer: 0,
        accept: ["only"],
        explain: "„Reciprocity might be reciprocal only in name.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Kinship may well shape the lifeworld more than the law.",
          "Nothing in the sentence chooses between the two readings.",
          "Put the verb back.",
          "A time word cannot be read as a subject.",
        ],
        explain: "Cümle, delik, onarım; en sonda güvenli biçim.",
      },
      {
        kind: "short_answer",
        text: "What does the helping verb lack?",
        options: [],
        answer: 0,
        accept: ["meaning", "its own meaning", "a meaning"],
        explain: "„It has no meaning of its own…“",
      },
    ],
  },
  {
    id: "en-c1-u12-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 12,
    title: "The vocabulary of migration",
    genre: "opinion",
    intro: "Bir sayı mı, bir belge mi? Sözcükler neyi ölçüyor?",
    gloss: [
      { de: "confuses", tr: "karıştırıyor" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "large", tr: "büyük" },
      { de: "passives", tr: "edilgenler" },
      { de: "passive", tr: "edilgen" },
      { de: "agent", tr: "eyleyen" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "definite", tr: "belirli" },
      { de: "dropped", tr: "düşürülmüş" },
      { de: "identical", tr: "birebir aynı" },
      { de: "none", tr: "hiçbiri" },
      { de: "survived", tr: "atlatıldı" },
      { de: "a term", tr: "terim" },
      { de: "a person", tr: "kişi" },
      { de: "a number", tr: "sayı" },
      { de: "a headline", tr: "manşet" },
      { de: "arithmetic", tr: "hesap" },
      { de: "subtracted", tr: "çıkarılan" },
      { de: "a total", tr: "toplam" },
      { de: "hides", tr: "gizliyor" },
      { de: "a direction", tr: "yön" },
      { de: "counted", tr: "sayılan" },
      { de: "signed", tr: "imzalanmış" },
      { de: "a table", tr: "tablo" },
      { de: "a state", tr: "devlet" },
      { de: "a flood", tr: "sel" },
      { de: "chosen", tr: "seçilmiş" },
      { de: "a metaphor", tr: "eğretileme" },
      { de: "dead", tr: "ölü" },
      { de: "a root", tr: "kök" },
      { de: "a policy", tr: "siyaset" },
    ],
    minutes: 12,
    text:
      "A migration background is not a migration flow. One of those two terms is about a person and the other is about a number, and a paragraph that confuses them has said something about people that only a table could have said.\n" +
      "The confusion is easy to make and hard to see, because the two words share their first half and a headline has room for neither of them in full.\n" +
      "Out-migration and internal migration produce net migration. Here is the arithmetic, and it is worth writing out because the word „net“ does something to a reader. Two movements are subtracted from one another and what comes out is a total that nobody has ever lived. It hides both directions at once, and a country with a large number moving in and a large number moving out can show the same figure as a country where nothing has happened at all.\n" +
      "An influx is counted; a refugee convention is signed. Two passives in one line and they are not the same kind of passive.\n" +
      "The first has no agent anywhere near it, and it does not need one: counting is what a table does. The second has a very definite agent that has been left out on purpose. Conventions are signed by states, on a date, in a room, and the sentence has dropped all three.\n" +
      "That is the difference worth carrying out of this lesson. A passive that hides a procedure is doing no harm. A passive that hides a signature is doing a great deal, and the two look identical on the page.\n" +
      "One more word, and it is the one that does the most damage. „Influx“ is water. So is „flow“, so is „wave“, and none of them was chosen by the person now using it; they arrived in the language together and they bring a whole picture with them. A flood is nobody's fault and nobody's policy, and it cannot be answered, only survived.\n" +
      "A dead metaphor is still a metaphor. The word „uproot“ has a root in it and a reader still feels the ground give way, which is exactly why it is the right word for what it names and the wrong word for a decision made at a desk.",
    questions: [
      {
        text: "What is a migration background about?",
        options: ["a person", "a number", "a table"],
        answer: 0,
        explain: "„One of those two terms is about a person and the other is about a number…“",
      },
      {
        text: "What does a net figure hide?",
        options: ["both directions", "the total", "the year"],
        answer: 0,
        explain: "„It hides both directions at once…“",
      },
      {
        kind: "truefalse",
        text: "The two passives in that line are the same kind.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Two passives in one line and they are not the same kind of passive.“",
      },
      {
        kind: "gapfill",
        text: "An influx is counted; a refugee convention is ___.",
        options: [],
        answer: 0,
        accept: ["signed"],
        explain: "„An influx is counted; a refugee convention is signed.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A migration background is not a migration flow.",
          "Out-migration and internal migration produce net migration.",
          "An influx is counted; a refugee convention is signed.",
          "A dead metaphor is still a metaphor.",
        ],
        explain: "Kişi ile sayı, hesap, iki edilgen; en sonda sözcüğün getirdiği resim.",
      },
      {
        kind: "short_answer",
        text: "What is a flood nobody's?",
        options: [],
        answer: 0,
        accept: ["fault", "fault or policy", "policy"],
        explain: "„A flood is nobody's fault and nobody's policy…“",
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
    title: "A warm welcome indeed",
    genre: "dialogue",
    intro: "Bir sözcük ötekini iptal ediyor. Hangisi hangisini?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "noun", tr: "isim" },
      { de: "nominal", tr: "sözde" },
      { de: "supposed", tr: "sözümona" },
      { de: "a banquet", tr: "ziyafet" },
      { de: "a guest", tr: "konuk" },
      { de: "a table", tr: "masa" },
      { de: "spent", tr: "harcanmış" },
      { de: "denied", tr: "yadsınmış" },
      { de: "the same breath", tr: "aynı nefes" },
      { de: "admitted", tr: "kabul edilmiş" },
      { de: "a rule", tr: "kural" },
      { de: "elsewhere", tr: "başka yerde" },
      { de: "cancels", tr: "iptal ediyor" },
      { de: "a modifier", tr: "niteleyen" },
      { de: "good for", tr: "iyi gelen" },
      { de: "a compliment", tr: "iltifat" },
      { de: "swallowed", tr: "yutulmuş" },
    ],
    minutes: 8,
    segments: [
      { speaker: "İpek", text: "The banquet was opulent; the welcome, faceless. Everything spent on the table and nothing spent on the guest." },
      { speaker: "Mert", text: "The verb has gone again in the second half." },
      { speaker: "İpek", text: "It has, and the shape is now doing its third job in this level: here it holds the two halves close enough that the reader cannot read one without the other." },
      { speaker: "Mert", text: "We have no deviance here; we have a locally customary norm violation." },
      { speaker: "İpek", text: "That is the line I would put on the wall. Something is denied and admitted in the same breath, and the second half does the admitting with a word that sounds like a rule." },
      { speaker: "Mert", text: "So the violation is real." },
      { speaker: "İpek", text: "The violation is real and it is a violation of a rule that holds elsewhere. „Locally customary“ cancels the noun it is attached to without changing a single fact in it." },
      { speaker: "Mert", text: "Are there many modifiers like that?" },
      { speaker: "İpek", text: "A small family and every one of them is worth knowing: alleged, nominal, former, supposed. Each of them takes back the noun it is standing in front of." },
      { speaker: "Mert", text: "And the last line?" },
      { speaker: "İpek", text: "Taboo breaking, they said, and rather good for the dissonance. The inserted clause again, and the compliment at the end is the part I would not trust." },
      { speaker: "Mert", text: "Why not?" },
      { speaker: "İpek", text: "Because „rather good for“ is what you say about medicine. Somebody has been swallowed by a sentence and told it was healthy, and the room agreed while it happened." },
    ],
    questions: [
      {
        text: "What was spent on the guest?",
        options: ["nothing", "everything", "the welcome"],
        answer: 0,
        explain: "„Everything spent on the table and nothing spent on the guest.“",
      },
      {
        text: "What does „locally customary“ do?",
        options: ["cancels the noun", "changes the facts", "names a rule"],
        answer: 0,
        explain: "„„Locally customary“ cancels the noun it is attached to without changing a single fact in it.“",
      },
      {
        kind: "truefalse",
        text: "The violation is not real.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The violation is real and it is a violation of a rule that holds elsewhere.“",
      },
      {
        kind: "gapfill",
        text: "Taboo breaking, they said, and ___ good for the dissonance.",
        options: [],
        answer: 0,
        accept: ["rather"],
        explain: "„Taboo breaking, they said, and rather good for the dissonance.“",
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
        text: "What do you say „rather good for“ about?",
        options: [],
        answer: 0,
        accept: ["medicine", "a medicine", "something healthy"],
        explain: "„„rather good for“ is what you say about medicine.“",
      },
    ],
  },
  {
    id: "en-c1-u12-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 12,
    title: "Who reports the past",
    genre: "monologue",
    intro: "Yorum yetkisini kim tutuyor? Bir fiil neyi ele veriyor?",
    gloss: [
      { de: "infinitive", tr: "mastar" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "actually", tr: "aslında" },
      { de: "the past", tr: "geçmiş" },
      { de: "a museum", tr: "müze" },
      { de: "a plaque", tr: "levha" },
      { de: "guards", tr: "koruyor" },
      { de: "a committee", tr: "kurul" },
      { de: "quietly", tr: "sessizce" },
      { de: "an assumption", tr: "varsayım" },
      { de: "a footnote", tr: "dipnot" },
      { de: "obey", tr: "uymak" },
      { de: "an age", tr: "yaş" },
      { de: "a reason", tr: "gerekçe" },
      { de: "a grandchild", tr: "torun" },
      { de: "a room", tr: "oda" },
      { de: "the loser", tr: "yitiren" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Kerem", text: "One reinterprets the memory culture; another guards the interpretive authority. Two people, two verbs, and only one of them is about the past." },
      { speaker: "Kerem", text: "The first is reading. The second is keeping a key, and a key is not an argument. You cannot answer it; you can only be given it or not." },
      { speaker: "Kerem", text: "That is why a new plaque in a museum takes four years and a committee. Nobody is arguing about the dates on it." },
      { speaker: "Kerem", text: "The exegesis claims what heritage protection assumes. Two documents again, and the second one is doing its work quietly." },
      { speaker: "Kerem", text: "An assumption never has to be defended, because nobody has written it down where it can be answered. Find it in a footnote or find it nowhere." },
      { speaker: "Kerem", text: "To call customary law venerable is not to obey it. The infinitive shape from earlier in this level, and here it is the whole of a generational conflict in eight words." },
      { speaker: "Kerem", text: "The age of a rule is not a reason to keep it. It is a reason to ask who wrote it and what they were afraid of at the time." },
      { speaker: "Kerem", text: "A grandchild who calls a rule venerable and then does something else is not being dishonest. They are doing what the word actually asks for." },
      { speaker: "Kerem", text: "So when a family argues about the past, listen for which of the two verbs each side is using." },
      { speaker: "Kerem", text: "The side that is reinterpreting will bring evidence. The side that is guarding will bring the room, and the one who brings the room is very rarely the loser." },
    ],
    questions: [
      {
        text: "What is the second person keeping?",
        options: ["a key", "an argument", "a plaque"],
        answer: 0,
        explain: "„The second is keeping a key, and a key is not an argument.“",
      },
      {
        text: "Why never defend an assumption?",
        options: ["nobody has written it down", "it is always true", "it is in the title"],
        answer: 0,
        explain: "„because nobody has written it down where it can be answered.“",
      },
      {
        kind: "truefalse",
        text: "The age of a rule is a reason to keep it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The age of a rule is not a reason to keep it.“",
      },
      {
        kind: "gapfill",
        text: "To call customary law venerable is not to ___ it.",
        options: [],
        answer: 0,
        accept: ["obey"],
        explain: "„To call customary law venerable is not to obey it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The exegesis claims what heritage protection assumes.", "The exegesis claims what heritage protection assumes"],
        explain: "İki belge: biri iddia ediyor, öteki varsayıyor.",
      },
      {
        kind: "short_answer",
        text: "What will the guarding side bring?",
        options: [],
        answer: 0,
        accept: ["the room", "a room", "the key"],
        explain: "„The side that is guarding will bring the room…“",
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
    title: "Kinship may well shape the lifeworld more than the law",
    genre: "info",
    intro: "Karşılaştırmanın deliği ve göçün sözcükleri.",
    gloss: [
      { de: "none", tr: "hiçbiri" },
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
        tr: "Toplumsallaşma sıra düzenini başlatmadan önce kurabilir.",
        answer: "Socialization may set the pecking order before the initiation.",
        hint: "Zaman sözcüğü özne diye okunamaz; bu yüzden güvenli.",
      },
      {
        kind: "build",
        tr: "Göçmen kökeni bir göç akışı değildir.",
        answer: "A migration background is not a migration flow.",
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
        prompt: "Karşılaştırma kartını doldur.",
        facts: "Yalın isimle biten karşılaştırmanın iki okuması var; Almanca durum ekiyle kapatıyor; tek onarım fiili geri koymak; yardımcı fiilin kendi anlamı yok.",
        fields: [
          { label: "Readings", answer: "two", accept: ["two of them"] },
          { label: "In German", answer: "an ending", accept: ["a case ending"] },
          { label: "The repair", answer: "put the verb back", accept: ["does"] },
          { label: "The helping verb", answer: "no meaning", accept: ["none of its own"] },
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
    title: "The exegesis claims what heritage protection assumes",
    genre: "info",
    intro: "Yorum yetkisi ve iptal eden niteleyen.",
    gloss: [
      { de: "memory culture", tr: "hatırlama kültürü" },
      { de: "an exegesis", tr: "metin yorumu" },
      { de: "customary law", tr: "örf ve âdet hukuku" },
      { de: "venerable", tr: "saygıdeğer" },
      { de: "opulent", tr: "şatafatlı" },
      { de: "deviance", tr: "normdan sapma" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Biri hatırlama kültürünü yeniden yorumluyor; bir başkası yorum yetkisini koruyor.",
        answer: "One reinterprets the memory culture; another guards the interpretive authority.",
        hint: "İki fiilden yalnız biri geçmiş hakkında.",
      },
      {
        kind: "build",
        tr: "Metin yorumu, kültürel miras korumasının varsaydığını iddia ediyor.",
        answer: "The exegesis claims what heritage protection assumes.",
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
        tr: "Burada normdan sapma yok; yörede alışılmış bir norm ihlali var.",
        answer: "We have no deviance here; we have a locally customary norm violation.",
        hint: "Aynı nefeste yadsıma ve kabul.",
      },
    ],
  },
];
