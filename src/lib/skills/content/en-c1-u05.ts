import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 5 — "Önerge dili, iddian ne kadar güçlü, aynı itiraz,
 * uzun bir argümanı bağlamak".
 *
 * Dört ders: The language of motions · How strong is your claim ·
 * The same objection · Binding a long argument.
 *
 *   Kelime: codetermination, cohesion, incumbent, marginalize, exploit,
 *           problematize, dehumanize, instrumentalize, coarsen,
 *           scandalize, disparity, scandalization, disempowerment,
 *           paradigm, causality, empirical.
 *   Kalıp:  We move that the board grant codetermination. ·
 *           Were it not for the constitutional state, cohesion would fail. ·
 *           They ask that no member abstain. ·
 *           The wording may well marginalize. ·
 *           It might have been expected to exploit less. ·
 *           Such a text would tend to problematize everything. ·
 *           A wave of outrage reads differently in each register. ·
 *           The echo chamber is a filter bubble with a name. ·
 *           Quoted in a ruling, the same words become opinion manipulation. ·
 *           This alone holds the chain of argument together. ·
 *           Such an explanatory approach is rare. ·
 *           The latter reflects the state of research.
 *
 * Ünitenin tek öğretme noktası ORTA ÇATI. „A wave of outrage reads
 * differently“ — fiil etken biçimde ama özne eylemi YAPAN değil, eylemin
 * UYGULANDIĞI şey. Edilgen değil: edilgende gizli bir fail var, burada
 * hiç fail yok. Üç koşulu var: neredeyse hep bir zarf gerekiyor, fiil
 * küçük bir listeden geliyor, ve özne asla bir kişi olmuyor.
 */
export const enC1U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u05-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 5,
    title: "The same objection",
    genre: "info",
    intro: "Fiil etken, özne edilgen. Bu hangi çatı?",
    gloss: [
      { de: "active", tr: "etken" },
      { de: "middle", tr: "orta" },
      { de: "easily", tr: "kolayca" },
      { de: "passive", tr: "edilgen" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "none", tr: "hiçbiri" },
      { de: "definition", tr: "tanım" },
      { de: "noun", tr: "isim" },
      { de: "unit", tr: "ünite" },
      { de: "whole", tr: "bütün" },
      { de: "passage", tr: "pasaj" },
      { de: "accusation", tr: "suçlama" },
      { de: "a marker", tr: "işaretleyici" },
      { de: "an agent", tr: "eyleyen" },
      { de: "an adverb", tr: "zarf" },
      { de: "extended", tr: "genişletilmiş" },
      { de: "apposition", tr: "açıklayıcı öbek" },
      { de: "renames", tr: "yeniden adlandırıyor" },
      { de: "separate", tr: "ayrı" },
      { de: "a ruling", tr: "karar" },
      { de: "behaves", tr: "davranıyor" },
      { de: "empirical", tr: "ampirik" },
      { de: "the cloth", tr: "kumaş" },
      { de: "hidden", tr: "gizli" },
      { de: "a construction", tr: "kuruluş" },
      { de: "fails", tr: "tutmuyor" },
    ],
    minutes: 12,
    text:
      "A wave of outrage reads differently in each register. Look at the verb. „Reads“ is active in form, and the subject is not doing the reading — it is the thing being read.\n" +
      "This is the middle voice, and English has no marker for it at all. „The sentence reads well.“ „The book sells badly.“ „That line translates into nothing.“ „The cloth washes easily.“ In every case the subject is what the action is done to, and the verb is in the active form with no passive and no agent anywhere.\n" +
      "It is not a passive. „The book is sold badly“ means somebody is selling it badly; „the book sells badly“ means something about the book. The first has an agent hidden in it and the second has none, and a sentence about how a text behaves is exactly the place where you do not want an agent.\n" +
      "Three things go with this construction and all three are needed. There is almost always an adverb — well, badly, differently, colder — and without it the sentence usually fails: „the book sells“ says something else. The verb comes from a small list and cannot be extended freely. And the subject is never a person.\n" +
      "The echo chamber is a filter bubble with a name. That is a different tool on the same page: a definition by apposition, where the second noun renames the first and the reader is told that two words they thought were separate are one thing.\n" +
      "Quoted in a ruling, the same words become opinion manipulation. And here is why the middle voice matters in this unit. The whole subject of the lesson is that a text changes value depending on where it is printed, and the middle voice is the only construction in English that can say that without naming a reader.\n" +
      "„The passage reads as an accusation“ makes no claim about who read it that way. The moment you write „readers take the passage as an accusation“ you have made an empirical claim about people, and somebody can ask you which readers.",
    questions: [
      {
        text: "What is the subject doing in the middle voice?",
        options: ["nothing — it is acted on", "the reading", "the selling"],
        answer: 0,
        explain: "„the subject is not doing the reading — it is the thing being read.“",
      },
      {
        text: "What does the passive have that the middle voice does not?",
        options: ["a hidden agent", "an adverb", "a subject"],
        answer: 0,
        explain: "„The first has an agent hidden in it and the second has none…“",
      },
      {
        kind: "truefalse",
        text: "The subject of such a sentence can be a person.",
        options: ["True", "False"],
        answer: 1,
        explain: "„And the subject is never a person.“",
      },
      {
        kind: "gapfill",
        text: "A wave of outrage ___ differently in each register.",
        options: [],
        answer: 0,
        accept: ["reads"],
        explain: "„A wave of outrage reads differently in each register.“",
      },
      {
        kind: "order",
        text: "Üç koşulun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "There is almost always an adverb.",
          "The verb comes from a small list.",
          "The subject is never a person.",
          "The middle voice names no reader.",
        ],
        explain: "Zarf, fiil listesi, özne; en sonda neden işe yaradığı.",
      },
      {
        kind: "short_answer",
        text: "What can somebody ask about the empirical version?",
        options: [],
        answer: 0,
        accept: ["which readers", "who they are", "which people"],
        explain: "„somebody can ask you which readers.“",
      },
    ],
  },
  {
    id: "en-c1-u05-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 5,
    title: "Binding a long argument",
    genre: "info",
    intro: "Yirmi sayfayı üç sözcük tutuyor. Hangisi güvenli?",
    gloss: [
      { de: "dangerous", tr: "tehlikeli" },
      { de: "noun", tr: "isim" },
      { de: "whole", tr: "bütün" },
      { de: "unit", tr: "ünite" },
      { de: "a chain", tr: "zincir" },
      { de: "available", tr: "elde olan" },
      { de: "a summary word", tr: "toplayıcı sözcük" },
      { de: "carried forward", tr: "ileriye taşınan" },
      { de: "backwards", tr: "geriye" },
      { de: "a distance", tr: "mesafe" },
      { de: "a section break", tr: "bölüm arası" },
      { de: "fragile", tr: "kırılgan" },
      { de: "recently", tr: "yakın zamanda" },
      { de: "rivals", tr: "rakipler" },
      { de: "count", tr: "saymak" },
      { de: "a paragraph break", tr: "paragraf arası" },
      { de: "survived", tr: "sağ kalmış" },
    ],
    minutes: 11,
    text:
      "This alone holds the chain of argument together. A paper of twenty pages, and the sentence that carries it is three words long before it reaches its verb.\n" +
      "„This“ is doing the work, and in a document of that length it is the most dangerous word available. It can point at the last noun, the last clause, the last paragraph or the whole of the last section, and the reader chooses.\n" +
      "The fix is the same one the last unit gave and it matters more here: follow it with a summary word. „This approach“, „this objection“, „this reading“. The writer then chooses what is carried forward, and a reader who disagrees can say which of the four things they are disagreeing with.\n" +
      "Such an explanatory approach is rare. „Such“ points backwards at a quality and cannot point at an argument, which is why it is safe over a long distance and why it is the one I use across a section break.\n" +
      "The latter reflects the state of research. „The latter“ is the narrowest and the most fragile: it needs exactly two things, named recently, with nothing between them. In a paper about a paradigm and its rivals there are never exactly two, and a reader who counts three will stop and count again.\n" +
      "So a long argument is held together by a small set of words, and the choice between them is a choice about how far back the reader has to look.\n" +
      "Near links for near things. „Such“ for a quality that has just been described. A full summary word for anything across a paragraph break. And „the latter“ almost never, because a chain of argument that has survived twenty pages should not be broken by a reader who has to go back and count.",
    questions: [
      {
        text: "Why is „this“ dangerous in a long paper?",
        options: ["it can point at four things", "it is short", "it is informal"],
        answer: 0,
        explain: "„It can point at the last noun, the last clause, the last paragraph or the whole of the last section…“",
      },
      {
        text: "Which one is safe over a long distance?",
        options: ["such", "this", "the latter"],
        answer: 0,
        explain: "„which is why it is safe over a long distance…“",
      },
      {
        kind: "truefalse",
        text: "„The latter“ works well in a paper with several rivals.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In a paper about a paradigm and its rivals there are never exactly two…“",
      },
      {
        kind: "gapfill",
        text: "___ an explanatory approach is rare.",
        options: [],
        answer: 0,
        accept: ["Such", "such"],
        explain: "„Such an explanatory approach is rare.“",
      },
      {
        kind: "order",
        text: "Bağlayıcıların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "This alone holds the chain of argument together.",
          "Such an explanatory approach is rare.",
          "The latter reflects the state of research.",
          "The choice is about how far back the reader must look.",
        ],
        explain: "En gevşek, güvenli olan, en kırılgan; en sonda ölçüt.",
      },
      {
        kind: "short_answer",
        text: "What should never break a chain of argument?",
        options: [],
        answer: 0,
        accept: ["a reader counting back", "going back to count", "a count"],
        explain: "„should not be broken by a reader who has to go back and count.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u05-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "The language of motions",
    genre: "dialogue",
    intro: "Bir harf eksik ve belge türü değişiyor. Hangisi?",
    gloss: [
      { de: "subjunctive", tr: "istek kipi" },
      { de: "whole", tr: "bütün" },
      { de: "defer", tr: "ertelemek" },
      { de: "title", tr: "başlık" },
      { de: "spend", tr: "harcamak" },
      { de: "redraft", tr: "yeniden yazmak" },
      { de: "a motion", tr: "önerge" },
      { de: "an agenda", tr: "gündem" },
      { de: "abstain", tr: "çekimser kalmak" },
      { de: "queries", tr: "sorguluyor" },
      { de: "supposing", tr: "varsayarak" },
      { de: "redrafting", tr: "yeniden yazma" },
      { de: "a ground", tr: "dayanak" },
      { de: "a translation", tr: "çeviri" },
      { de: "defining", tr: "tanımlamak" },
      { de: "rarer", tr: "daha seyrek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Melek", text: "We move that the board grant codetermination. „Grant“, not „grants“, and the sentence is a motion because of that one missing letter." },
      { speaker: "Tunç", text: "„Move that“ is doing some of it." },
      { speaker: "Melek", text: "„Move that“ is the verb that puts the sentence on the agenda, and it takes the subjunctive the way „insist“ and „request“ do. The three of them are the whole vocabulary of a motion." },
      { speaker: "Tunç", text: "And the negative?" },
      { speaker: "Melek", text: "They ask that no member abstain. Notice where the negative is: in the subject, not on the verb. „That no member abstain“, and never „that members not abstain“ unless you want it to sound like a translation." },
      { speaker: "Tunç", text: "Is the other one wrong?" },
      { speaker: "Melek", text: "It is not wrong and it is rarer, and in a document that will be read by a supervisory board the rarer form is the one somebody queries." },
      { speaker: "Tunç", text: "The third line has no motion in it." },
      { speaker: "Melek", text: "Were it not for the constitutional state, cohesion would fail. That is the other half of the same mood and it is doing the opposite job: not asking for something but supposing its absence." },
      { speaker: "Tunç", text: "Why keep both in one paragraph?" },
      { speaker: "Melek", text: "Because a motion that has a reason attached is harder to defer. The demand is in the first sentence and the ground is in the third, and between them there is nothing a chair can send back for redrafting." },
      { speaker: "Tunç", text: "And self-government?" },
      { speaker: "Melek", text: "That word goes in the title and nowhere else. A word that big in a motion is a word somebody will spend the meeting defining." },
    ],
    questions: [
      {
        text: "What makes the sentence a motion?",
        options: ["one missing letter", "the word „board“", "the word „grant“ alone"],
        answer: 0,
        explain: "„the sentence is a motion because of that one missing letter.“",
      },
      {
        text: "Where does the negative sit?",
        options: ["in the subject", "on the verb", "at the end"],
        answer: 0,
        explain: "„Notice where the negative is: in the subject, not on the verb.“",
      },
      {
        kind: "truefalse",
        text: "The other negative form is wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is not wrong and it is rarer…“",
      },
      {
        kind: "gapfill",
        text: "They ask that no member ___.",
        options: [],
        answer: 0,
        accept: ["abstain"],
        explain: "„They ask that no member abstain.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["We move that the board grant codetermination.", "We move that the board grant codetermination"],
        explain: "İstek kipi: „grant“, „grants“ değil.",
      },
      {
        kind: "short_answer",
        text: "Why is a motion with a reason harder to defer?",
        options: [],
        answer: 0,
        accept: ["nothing to send back", "no room to redraft", "the ground is there"],
        explain: "„between them there is nothing a chair can send back for redrafting.“",
      },
    ],
  },
  {
    id: "en-c1-u05-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "How strong is your claim",
    genre: "monologue",
    intro: "Yığılan kipler. Nerede ölçüm, nerede mesafe?",
    gloss: [
      { de: "possibility", tr: "olasılık" },
      { de: "entirely", tr: "tümüyle" },
      { de: "stacked", tr: "üst üste konmuş" },
      { de: "modals", tr: "kipler" },
      { de: "myself", tr: "kendime" },
      { de: "modal", tr: "kip" },
      { de: "per", tr: "başına" },
      { de: "analysis", tr: "çözümleme" },
      { de: "none", tr: "hiçbiri" },
      { de: "plain", tr: "yalın" },
      { de: "a layer", tr: "katman" },
      { de: "entitled", tr: "hakkı olan" },
      { de: "hypothetical", tr: "varsayımsal" },
      { de: "a tendency", tr: "eğilim" },
      { de: "actual", tr: "gerçek" },
      { de: "a failure mode", tr: "bozulma biçimi" },
      { de: "performed", tr: "sahnelemiş" },
      { de: "a limit", tr: "sınır" },
      { de: "an example", tr: "örnek" },
      { de: "flatly", tr: "düpedüz" },
      { de: "a quotation", tr: "alıntı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Rüzgar", text: "The wording may well marginalize. Three words of verb and only one of them is about marginalizing." },
      { speaker: "Rüzgar", text: "„May“ gives possibility and „well“ raises it, and together they say: likely, and I am not going to say how likely." },
      { speaker: "Rüzgar", text: "It might have been expected to exploit less. Four layers, and the useful one is „expected“, because it brings in people who are not in the sentence." },
      { speaker: "Rüzgar", text: "Whose expectation? The text does not say, and in a paper about how language works that is a question the reader is entitled to ask." },
      { speaker: "Rüzgar", text: "Such a text would tend to problematize everything. „Would“ makes it hypothetical and „tend to“ makes it a tendency, and between them the sentence has stopped being about any actual text." },
      { speaker: "Rüzgar", text: "That is the failure mode of this register and it is not rare. A paragraph about how wording can dehumanize, written entirely in stacked modals, has performed the distance it is describing." },
      { speaker: "Rüzgar", text: "So I set myself a limit that is easy to check. One modal layer per sentence in the analysis, and none at all in the sentence that names the example." },
      { speaker: "Rüzgar", text: "The example gets a plain verb and a quotation. Everything else can be as careful as it likes, because the reader has already seen one thing stated flatly and will believe the rest." },
    ],
    questions: [
      {
        text: "Which layer brings in people who are not in the sentence?",
        options: ["expected", "might", "have been"],
        answer: 0,
        explain: "„the useful one is „expected“, because it brings in people who are not in the sentence.“",
      },
      {
        text: "What has a paragraph of stacked modals performed?",
        options: ["the distance it describes", "the wording", "the example"],
        answer: 0,
        explain: "„has performed the distance it is describing.“",
      },
      {
        kind: "truefalse",
        text: "The example sentence also gets a modal layer.",
        options: ["True", "False"],
        answer: 1,
        explain: "„and none at all in the sentence that names the example.“",
      },
      {
        kind: "gapfill",
        text: "The wording may ___ marginalize.",
        options: [],
        answer: 0,
        accept: ["well"],
        explain: "„The wording may well marginalize.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Such a text would tend to problematize everything.", "Such a text would tend to problematize everything"],
        explain: "„would“ varsayım, „tend to“ eğilim; cümle artık gerçek bir metinle ilgili değil.",
      },
      {
        kind: "short_answer",
        text: "What does the example get?",
        options: [],
        answer: 0,
        accept: ["a plain verb", "a verb and a quotation", "no modal"],
        explain: "„The example gets a plain verb and a quotation.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u05-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "A wave of outrage reads differently in each register",
    genre: "info",
    intro: "Orta çatı ve iki bağlayıcı. Fail nerede?",
    gloss: [
      { de: "active", tr: "etken" },
      { de: "none", tr: "hiçbiri" },
      { de: "adverb", tr: "zarf" },
      { de: "reads differently", tr: "başka okunuyor" },
      { de: "a filter bubble", tr: "filtre balonu" },
      { de: "quoted", tr: "alıntılanan" },
      { de: "holds together", tr: "bir arada tutuyor" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bir öfke dalgası her dil düzeyinde başka okunuyor.",
        answer: "A wave of outrage reads differently in each register.",
        hint: "Orta çatı: özne okunan şey, fiil etken biçimde.",
      },
      {
        kind: "build",
        tr: "Yankı odası, adı konmuş bir filtre balonu.",
        answer: "The echo chamber is a filter bubble with a name.",
        hint: "İki isim: ikincisi birincisini yeniden adlandırıyor.",
      },
      {
        kind: "build",
        tr: "Bir kararda alıntılanınca aynı sözcükler kamuoyu manipülasyonu oluyor.",
        answer: "Quoted in a ruling, the same words become opinion manipulation.",
        hint: "Edilgen ortaç: bağlam değişince değer değişiyor.",
      },
      {
        kind: "build",
        tr: "Yalnızca bu, argüman zincirini bir arada tutuyor.",
        answer: "This alone holds the chain of argument together.",
        hint: "Uzun bir metinde en tehlikeli sözcük.",
      },
      {
        kind: "form",
        prompt: "Orta çatı kartını doldur.",
        facts: "Fiil etken biçimde; fail hiç yok; neredeyse hep bir zarf gerekiyor; özne asla bir kişi değil.",
        fields: [
          { label: "The form", answer: "active", accept: ["reads"] },
          { label: "The agent", answer: "none", accept: ["there is none"] },
          { label: "What is needed", answer: "an adverb", accept: ["differently"] },
          { label: "The subject", answer: "never a person", accept: ["a thing"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u05-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "We move that the board grant codetermination",
    genre: "info",
    intro: "Önergenin kipi ve iki kip katmanı.",
    gloss: [
      { de: "we move that", tr: "öneriyoruz ki" },
      { de: "abstain", tr: "çekimser kalmak" },
      { de: "may well", tr: "pekâlâ" },
      { de: "tend to", tr: "eğiliminde olmak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kurulun söz hakkı tanımasını öneriyoruz.",
        answer: "We move that the board grant codetermination.",
        hint: "İstek kipi: „grant“, „grants“ değil.",
      },
      {
        kind: "build",
        tr: "Hiçbir üyenin çekimser kalmamasını istiyorlar.",
        answer: "They ask that no member abstain.",
        hint: "Olumsuz öznede duruyor, fiilde değil.",
      },
      {
        kind: "build",
        tr: "Hukuk devleti olmasa bütünlük çökerdi.",
        answer: "Were it not for the constitutional state, cohesion would fail.",
        hint: "Aynı kipin öteki yarısı: varsayım.",
      },
      {
        kind: "build",
        tr: "İfade biçimi pekâlâ ötekileştirebilir.",
        answer: "The wording may well marginalize.",
        hint: "„may well“: olası, ama ne kadar olduğu söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Daha az sömürmesi beklenmiş olabilirdi.",
        answer: "It might have been expected to exploit less.",
        hint: "Dört katman; işe yarayan „expected“.",
      },
    ],
  },
];
