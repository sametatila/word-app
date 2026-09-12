import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 16 — "Katalog künyesi, sezon duyurusu, oyunun yaptığı,
 * sahnede bir ömür".
 *
 * Dört ders: The catalogue entry · The season announcement ·
 * What the play does · A life on stage.
 *
 *   Kelime: canvas, artwork, exhibit, era, Renaissance, fragment,
 *           timeless, composer, screenplay, premiere, performer, critic,
 *           drama, tragedy, parody, context, worldview, contemporary,
 *           artistic, passion, rehearse, jury, fascinate, monotonous,
 *           applaud.
 *   Kalıp:  The restoration of the canvas took two years. ·
 *           The acquisition of the artwork is documented. ·
 *           The display of the exhibit begins in May. ·
 *           The composer is said to be ill. ·
 *           The screenplay is expected to change. ·
 *           The premiere is thought to have been delayed. ·
 *           What the drama does is name the cost. ·
 *           It was the tragedy that changed him. ·
 *           What a parody keeps is the context. ·
 *           Having watched her rehearse, the jury voted. ·
 *           Praised for years, the actor stayed modest. ·
 *           Wanting a new role, she left the company.
 *
 * Ünitenin tek öğretme noktası ORTAÇ SÜRERLİ ZAMAN DEĞİL. „I am wanting“
 * yanlış, çünkü „want“ bir durum fiili ve sürerli zaman almıyor; ama
 * „Wanting a new role, she left“ doğru, çünkü ortaç bir zaman değil.
 * Ortacın kendi zamanı yok; zamanını da öznesini de ana cümleden alıyor,
 * ve baştaki „-ing“ „she is leaving“deki „-ing“den başka bir iş görüyor.
 */
export const enB2U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u16-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 16,
    title: "A life on stage",
    genre: "info",
    intro: "Durum fiili ortaçta „-ing“ alıyor. Nasıl oluyor?",
    gloss: [
      { de: "event", tr: "olay" },
      { de: "action", tr: "eylem" },
      { de: "passive", tr: "edilgen" },
      { de: "unit", tr: "ünite" },
      { de: "exists", tr: "var" },
      { de: "sentence", tr: "cümle" },
      { de: "continuous", tr: "sürerli" },
      { de: "a state", tr: "durum" },
      { de: "a participle", tr: "ortaç" },
      { de: "a tense", tr: "zaman kipi" },
      { de: "own", tr: "kendi" },
      { de: "the score", tr: "nota" },
      { de: "a notice", tr: "duyuru" },
      { de: "a duration", tr: "süre" },
      { de: "prevent", tr: "önlemek" },
      { de: "a learner", tr: "öğrenen" },
      { de: "the opposite", tr: "tersi" },
      { de: "quote", tr: "alıntılamak" },
      { de: "modest", tr: "alçakgönüllü" },
      { de: "a dozen", tr: "düzine" },
      { de: "praised", tr: "övülen" },
    ],
    minutes: 9,
    text:
      "Wanting a new role, she left the company. Read that first word again, because a rule you were taught two levels ago says it cannot be there.\n" +
      "The rule is about the continuous. „I am wanting a new role“ is not English; „want“ is a state, and states do not take the continuous. The same is true of „know“, „believe“, „own“ and a dozen others.\n" +
      "But this is not the continuous. It is a participle, and a participle is not a tense at all. It has no „am“, no „was“, no time of its own; it takes its time from the main clause and its subject from the main clause, and the „-ing“ on the front of it is doing a different job from the „-ing“ in „she is leaving“.\n" +
      "So „Wanting a new role, she left“ is correct, and so is „Knowing the score, the jury waited“, and so is „Believing the notice, we arrived at seven“. The state is the reason; the main clause is the event.\n" +
      "Having watched her rehearse, the jury voted. That is the perfect participle and it puts one action before another.\n" +
      "Praised for years, the actor stayed modest. The third form at the front, so it is passive, and „for years“ shows that a participle can carry a duration without carrying a tense.\n" +
      "The mistake this unit exists to prevent is the opposite one: a learner who has met „Wanting a new role“ goes back and writes „I am wanting a new role“. Those two forms look the same and are not, and knowing which is which is the difference between a sentence a critic would write and one they would quote.",
    questions: [
      {
        text: "Why is „Wanting a new role“ correct?",
        options: ["a participle is not a tense", "„want“ is not a state", "the rule has changed"],
        answer: 0,
        explain: "„It is a participle, and a participle is not a tense at all.“",
      },
      {
        text: "Where does a participle get its time from?",
        options: ["the main clause", "the „-ing“", "the subject"],
        answer: 0,
        explain: "„it takes its time from the main clause and its subject from the main clause…“",
      },
      {
        kind: "truefalse",
        text: "„I am wanting a new role“ is now allowed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a learner who has met „Wanting a new role“ goes back and writes „I am wanting a new role“.“",
      },
      {
        kind: "gapfill",
        text: "___ for years, the actor stayed modest.",
        options: [],
        answer: 0,
        accept: ["Praised", "praised"],
        explain: "„Praised for years, the actor stayed modest.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Wanting a new role, she left the company.",
          "Having watched her rehearse, the jury voted.",
          "Praised for years, the actor stayed modest.",
          "A participle is not a tense at all.",
        ],
        explain: "Durum, önceki iş, edilgen; en sonda kuralın kendisi.",
      },
      {
        kind: "short_answer",
        text: "What can a participle carry without a tense?",
        options: [],
        answer: 0,
        accept: ["a duration", "duration", "for years"],
        explain: "„a participle can carry a duration without carrying a tense.“",
      },
    ],
  },
  {
    id: "en-b2-u16-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 16,
    title: "The catalogue entry",
    genre: "info",
    intro: "Üç isim, üç ek. Hangisinin eki hiç yok?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "verbs", tr: "fiiller" },
      { de: "underneath", tr: "altta" },
      { de: "fourth", tr: "dördüncü" },
      { de: "endings", tr: "ekler" },
      { de: "verb", tr: "fiil" },
      { de: "noun", tr: "isim" },
      { de: "object", tr: "nesne" },
      { de: "whole", tr: "bütün" },
      { de: "restored", tr: "restore etti" },
      { de: "phrase", tr: "öbek" },
      { de: "exists", tr: "var" },
      { de: "beside", tr: "yanında" },
      { de: "sentence", tr: "cümle" },
      { de: "restore", tr: "restore etmek" },
      { de: "acquire", tr: "edinmek" },
      { de: "the restoration", tr: "restorasyon" },
      { de: "the acquisition", tr: "edinim" },
      { de: "predicts", tr: "önceden kestiriyor" },
      { de: "a catalogue", tr: "katalog" },
      { de: "an entry", tr: "künye" },
      { de: "retire", tr: "emekli olmak" },
      { de: "cultural heritage", tr: "kültürel miras" },
      { de: "heritage", tr: "miras" },
      { de: "a decade", tr: "on yıl" },
      { de: "dated", tr: "modası geçmiş" },
      { de: "a frame", tr: "çerçeve" },
      { de: "standing up", tr: "ayakta" },
      { de: "documented", tr: "belgelenmiş" },
      { de: "extremely", tr: "son derece" },
    ],
    minutes: 9,
    text:
      "The restoration of the canvas took two years. The acquisition of the artwork is documented. The display of the exhibit begins in May. Three nouns, three verbs underneath them, and a catalogue that is written in almost nothing else.\n" +
      "All three take „of“, and by now that should not be a surprise and also should not be a rule. „Distinction“ takes „between“ and „parallel“ takes „with“, and a writer who has done three pages of „of“ will reach for it on the fourth and be wrong.\n" +
      "The endings are the usual list. Restore becomes restoration. Acquire becomes acquisition, which nobody predicts. Display becomes display, with no ending at all, and that is the third kind: an English verb that is already a noun and needs nothing done to it.\n" +
      "Why does a catalogue want them? Because an entry has to sit under an object for fifty years and be true the whole time. „We restored the canvas in 1998“ has a „we“ in it, and the „we“ will retire.\n" +
      "Cultural heritage is a phrase that exists for the same reason, and so is the habit of writing eras rather than decades. A fragment from the Renaissance is timeless in the catalogue and was extremely dated to the person who made it.\n" +
      "So the nouns stay. The card beside the frame gets one sentence with a verb in it, and that sentence is the only part of the entry anybody reads standing up.",
    questions: [
      {
        text: "Which verb needs no ending at all?",
        options: ["display", "restore", "acquire"],
        answer: 0,
        explain: "„Display becomes display, with no ending at all…“",
      },
      {
        text: "Why does a catalogue use nouns?",
        options: ["an entry must stay true for fifty years", "nouns are shorter", "nouns are older"],
        answer: 0,
        explain: "„Because an entry has to sit under an object for fifty years and be true the whole time.“",
      },
      {
        kind: "truefalse",
        text: "The Renaissance fragment felt timeless to its maker.",
        options: ["True", "False"],
        answer: 1,
        explain: "„is timeless in the catalogue and was extremely dated to the person who made it.“",
      },
      {
        kind: "gapfill",
        text: "The ___ of the canvas took two years.",
        options: [],
        answer: 0,
        accept: ["restoration"],
        explain: "„The restoration of the canvas took two years.“",
      },
      {
        kind: "order",
        text: "Künyenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The restoration of the canvas took two years.",
          "The acquisition of the artwork is documented.",
          "The display of the exhibit begins in May.",
          "The card beside the frame gets one verb.",
        ],
        explain: "Üç adlaştırma, en sonda tek fiilli cümle.",
      },
      {
        kind: "short_answer",
        text: "What does the card beside the frame get?",
        options: [],
        answer: 0,
        accept: ["one sentence with a verb", "a verb", "one sentence"],
        explain: "„The card beside the frame gets one sentence with a verb in it…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u16-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 16,
    title: "The season announcement",
    genre: "dialogue",
    intro: "Üç aktarma fiili, bir duyuru. Hangisi oyunculara gitmiyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "infinitive", tr: "mastar" },
      { de: "verbs", tr: "fiiller" },
      { de: "plain", tr: "yalın" },
      { de: "verb", tr: "fiil" },
      { de: "hedge", tr: "çekince" },
      { de: "deliberate", tr: "bilerek yapılmış" },
      { de: "passing it on", tr: "aktarmak" },
      { de: "a draft", tr: "taslak" },
      { de: "an amount", tr: "miktar" },
      { de: "booked", tr: "ayrılmış" },
      { de: "hedges", tr: "çekince koyuyor" },
      { de: "plan around", tr: "üstüne plan yapmak" },
      { de: "a ceremony", tr: "tören" },
      { de: "backwards", tr: "geriye" },
      { de: "weight", tr: "ağırlık" },
      { de: "ill", tr: "hasta" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Pelin", text: "The composer is said to be ill. That is all the announcement says and it is deliberate." },
      { speaker: "Arda", text: "Said by whom?" },
      { speaker: "Pelin", text: "Exactly the question, and the sentence does not answer it. „Is said to“ carries no weight of its own; somebody has said it and we are passing it on." },
      { speaker: "Arda", text: "The screenplay is expected to change." },
      { speaker: "Pelin", text: "That one is stronger. „Expected“ points forward and it rests on something — in this case a draft that three people have read." },
      { speaker: "Arda", text: "And the premiere?" },
      { speaker: "Pelin", text: "The premiere is thought to have been delayed. A view that is held, and the infinitive is looking backwards: the delaying already happened." },
      { speaker: "Arda", text: "Three verbs and three different amounts of information." },
      { speaker: "Pelin", text: "And a critic reads them that way. An audience does not, and that is the problem with putting all three on one page." },
      { speaker: "Arda", text: "So which one goes in the letter to the performers?" },
      { speaker: "Pelin", text: "None of them. The performers get a sentence with a name and a date in it, because a schedule that hedges is a schedule nobody can plan around." },
      { speaker: "Arda", text: "And the award ceremony?" },
      { speaker: "Pelin", text: "The ceremony is a fact with a room booked. Facts get the plain present, and the day I write „the ceremony is expected to take place“ is the day somebody should ask me what I know." },
    ],
    questions: [
      {
        text: "What does „is said to“ carry?",
        options: ["no weight of its own", "a model", "a date"],
        answer: 0,
        explain: "„„Is said to“ carries no weight of its own…“",
      },
      {
        text: "What do the performers get?",
        options: ["a name and a date", "the weakest verb", "a hedge"],
        answer: 0,
        explain: "„The performers get a sentence with a name and a date in it…“",
      },
      {
        kind: "truefalse",
        text: "An audience reads the three verbs differently.",
        options: ["True", "False"],
        answer: 1,
        explain: "„And a critic reads them that way. An audience does not…“",
      },
      {
        kind: "gapfill",
        text: "The screenplay is ___ to change.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The screenplay is expected to change.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The composer is said to be ill.", "The composer is said to be ill"],
        explain: "En zayıf aktarma: biri söyledi, o kadar.",
      },
      {
        kind: "short_answer",
        text: "What do facts get?",
        options: [],
        answer: 0,
        accept: ["the plain present", "plain present", "the present"],
        explain: "„Facts get the plain present…“",
      },
    ],
  },
  {
    id: "en-b2-u16-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 16,
    title: "What the play does",
    genre: "monologue",
    intro: "„is“ sonrası yalın fiil. Nerede oluyor bu?",
    gloss: [
      { de: "cleft", tr: "yarık cümle" },
      { de: "verb", tr: "fiil" },
      { de: "noun", tr: "isim" },
      { de: "sentence", tr: "cümle" },
      { de: "per", tr: "başına" },
      { de: "plain", tr: "yalın" },
      { de: "bare", tr: "yalın" },
      { de: "a construction", tr: "kuruluş" },
      { de: "soften", tr: "yumuşatmak" },
      { de: "missed", tr: "gözden kaçan" },
      { de: "the other way round", tr: "tersinden" },
      { de: "drops", tr: "atıyor" },
      { de: "resents", tr: "içerlediği" },
      { de: "a verdict", tr: "hüküm" },
      { de: "a review", tr: "eleştiri yazısı" },
      { de: "quiet", tr: "sessiz" },
      { de: "the light", tr: "ışık" },
    ],
    minutes: 7,
    segments: [
      { speaker: "İdil", text: "What the drama does is name the cost. Not describe it, not soften it: name it, and the cleft is there so that the verb cannot be missed." },
      { speaker: "İdil", text: "Look at the shape. After „is“ there is a bare verb — „name“, not „to name“ and not „naming“. That is the one place in English where a bare verb follows „is“, and it only happens in this construction." },
      { speaker: "İdil", text: "It was the tragedy that changed him. The second shape, with the light on a noun, and it answers a question about which of several things did the work." },
      { speaker: "İdil", text: "What a parody keeps is the context. A useful sentence, because it is easy to get wrong the other way round: people say a parody drops the context, and it does the opposite." },
      { speaker: "İdil", text: "One per review. The shape is loud and a page of them reads as a writer telling the reader how to feel, which in a piece about a contemporary play is the one thing a reader resents." },
      { speaker: "İdil", text: "The worldview question is where I use it, if I use it at all, because that is the paragraph somebody will quote." },
      { speaker: "İdil", text: "An artistic claim made in a plain sentence can be argued with. The same claim in a cleft sounds like a verdict, and I would rather be argued with." },
      { speaker: "İdil", text: "So the passion goes in the description and the grammar stays quiet." },
    ],
    questions: [
      {
        text: "What follows „is“ in that cleft?",
        options: ["a bare verb", "a „to“ form", "an „-ing“ form"],
        answer: 0,
        explain: "„After „is“ there is a bare verb — „name“, not „to name“ and not „naming“.“",
      },
      {
        text: "What does a parody keep?",
        options: ["the context", "the cost", "the tragedy"],
        answer: 0,
        explain: "„What a parody keeps is the context.“",
      },
      {
        kind: "truefalse",
        text: "İdil would rather sound like a verdict.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The same claim in a cleft sounds like a verdict, and I would rather be argued with.“",
      },
      {
        kind: "gapfill",
        text: "What the drama does is ___ the cost.",
        options: [],
        answer: 0,
        accept: ["name"],
        explain: "„What the drama does is name the cost.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It was the tragedy that changed him.", "It was the tragedy that changed him"],
        explain: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "short_answer",
        text: "How many of these per review?",
        options: [],
        answer: 0,
        accept: ["one", "one per review", "just one"],
        explain: "„One per review.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u16-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 16,
    title: "Wanting a new role, she left the company",
    genre: "info",
    intro: "Üç ortaç. Birincisi neden kurala aykırı değil?",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "wanting", tr: "istediği için" },
      { de: "having watched", tr: "izledikten sonra" },
      { de: "praised", tr: "övülen" },
      { de: "is said to be", tr: "olduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Yeni bir rol istediği için şirketten ayrıldı.",
        answer: "Wanting a new role, she left the company.",
        hint: "Ortaç sürerli zaman değil; durum fiili burada „-ing“ alabiliyor.",
      },
      {
        kind: "build",
        tr: "Onun provasını izledikten sonra jüri oy verdi.",
        answer: "Having watched her rehearse, the jury voted.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Yıllarca övülen oyuncu alçakgönüllü kaldı.",
        answer: "Praised for years, the actor stayed modest.",
        hint: "Üçüncü hâlle başlıyor: edilgen ortaç.",
      },
      {
        kind: "build",
        tr: "Bestecinin hasta olduğu söyleniyor.",
        answer: "The composer is said to be ill.",
        hint: "„is said to“: biri söyledi, o kadar.",
      },
      {
        kind: "form",
        prompt: "Ortaç kartını doldur.",
        facts: "Durum fiili sürerli zamanda „-ing“ almıyor; ortaçta alıyor; ortacın kendi zamanı yok; zamanını ana cümleden alıyor.",
        fields: [
          { label: "Continuous", answer: "no", accept: ["not allowed"] },
          { label: "Participle", answer: "yes", accept: ["allowed"] },
          { label: "Its own time", answer: "none", accept: ["it has none"] },
          { label: "Where from", answer: "the main clause", accept: ["main clause"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u16-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 16,
    title: "The restoration of the canvas took two years",
    genre: "info",
    intro: "Üç adlaştırma ve iki aktarma.",
    gloss: [
      { de: "the restoration", tr: "restorasyonu" },
      { de: "the acquisition", tr: "edinimi" },
      { de: "the display", tr: "teşhiri" },
      { de: "is expected to", tr: "olması bekleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Tuvalin restorasyonu iki yıl sürdü.",
        answer: "The restoration of the canvas took two years.",
        hint: "Fiil isme dönüyor: „restore“ → „restoration“.",
      },
      {
        kind: "build",
        tr: "Sanat eserinin edinimi belgelenmiş durumda.",
        answer: "The acquisition of the artwork is documented.",
        hint: "„acquire“ → „acquisition“; kimse bunu tahmin etmiyor.",
      },
      {
        kind: "build",
        tr: "Sergi eserinin teşhiri mayısta başlıyor.",
        answer: "The display of the exhibit begins in May.",
        hint: "Üçüncü tür: fiil zaten isim, eki yok.",
      },
      {
        kind: "build",
        tr: "Film senaryosunun değişmesi bekleniyor.",
        answer: "The screenplay is expected to change.",
        hint: "„is expected to“ ileriye bakıyor.",
      },
      {
        kind: "build",
        tr: "Galanın ertelendiği düşünülüyor.",
        answer: "The premiere is thought to have been delayed.",
        hint: "Tutulan bir görüş; mastar geçmişe bakıyor.",
      },
    ],
  },
];
