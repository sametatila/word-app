import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 2 — "Ödünün tonu, yerleşmiş eşleşme, hükmü fiil
 * taşıyor, „may well“in inceliği".
 *
 * Dört ders: The tone of concession · The settled pairing ·
 * The verb carries the verdict · The nuance of may well.
 *
 *   Kelime: concede, denounce, multilayered, ambivalent, counterstatement,
 *           unmask, mouthpiece, sensationalist, disinformation, staging,
 *           tout, presumed, precarious, incalculable, perceptible,
 *           erratic, sporadic, opaque, multifaceted.
 *   Kalıp:  Granted, the figure is high, albeit explicable. ·
 *           Much as I weigh up both sides, one is stronger. ·
 *           She would concede the point, whereas he would gloss over it. ·
 *           To have at one's disposal is not to use. ·
 *           They grapple with a question that will not catch on. ·
 *           Let it play out before you call it damage control. ·
 *           He claimed it; she conceded it; they alleged it. ·
 *           The counterstatement said less than the verb that carried it. ·
 *           They unmask a mouthpiece without naming one. ·
 *           The figure may well be presumed. ·
 *           It might have been expected to stay precarious. ·
 *           The risk would tend to be incalculable.
 *
 * Ünitenin tek öğretme noktası AKTARMA FİİLİ HÜKMÜ TAŞIYOR. „He claimed
 * it; she conceded it; they alleged it“ — üç kez aynı iş bildiriliyor ve
 * üç ayrı yargı veriliyor. B2 ünite 13 „said / thought / expected“ ile üç
 * KANIT derecesi göstermişti; burada ölçek yargıya dönüyor ve yansız
 * kalmak diye bir seçenek yok: bir fiil seçmek zorunlu.
 */
export const enC1U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u02-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 2,
    title: "The verb carries the verdict",
    genre: "opinion",
    intro: "Üç kez aynı iş bildiriliyor. Üç ayrı yargı nereden geliyor?",
    gloss: [
      { de: "event", tr: "olay" },
      { de: "except", tr: "dışında" },
      { de: "court", tr: "mahkeme" },
      { de: "unit", tr: "ünite" },
      { de: "variety", tr: "çeşitlilik" },
      { de: "provides", tr: "sağlıyor" },
      { de: "judgement", tr: "yargı" },
      { de: "stylistic", tr: "üslupla ilgili" },
      { de: "slightly", tr: "biraz" },
      { de: "desperate", tr: "çaresiz" },
      { de: "receives", tr: "alıyor" },
      { de: "whole", tr: "bütün" },
      { de: "object", tr: "nesne" },
      { de: "uncomfortable", tr: "rahatsız edici" },
      { de: "dull", tr: "sıkıcı" },
      { de: "alleged", tr: "iddia edildi" },
      { de: "a verdict", tr: "hüküm" },
      { de: "neutral", tr: "yansız" },
      { de: "an adjective", tr: "sıfat" },
      { de: "doubt", tr: "kuşku" },
      { de: "unproven", tr: "kanıtlanmamış" },
      { de: "disputed", tr: "tartışmalı" },
      { de: "invisible", tr: "görünmez" },
      { de: "a byline", tr: "imza satırı" },
    ],
    minutes: 11,
    text:
      "He claimed it; she conceded it; they alleged it. Three sentences about one event, and nothing in them is different except the verb.\n" +
      "„Claimed“ puts doubt on it. Whatever follows is what the speaker says, and the reader is told, quietly, that nobody has checked. „Conceded“ does the opposite for the speaker and the same for the fact: she did not want to say it, so it is probably true. „Alleged“ says the thing is unproven and may be disputed in a court, and no journalist uses it by accident.\n" +
      "None of those three is neutral, and that is the point of the unit. The neutral verb is „said“, and it is the only one, and a page that needs more variety than „said“ provides has to buy that variety with judgement.\n" +
      "So the choice is not stylistic. „Pointed out“ makes the following clause a fact. „Admitted“ makes it damaging. „Insisted“ makes it repeated and slightly desperate. „Noted“ makes it small. Each of them arrives without an adjective and without a source, and the reader receives the verdict before reaching the claim.\n" +
      "The counterstatement said less than the verb that carried it. That sentence is the whole problem in one line: a reply can be quoted in full and still lose, because the reporting verb was chosen by somebody else.\n" +
      "They unmask a mouthpiece without naming one. Here two of the same kind sit together, and „unmask“ is doing to the subject what „alleged“ does to the object.\n" +
      "What follows from this is uncomfortable. A writer cannot be invisible in reported speech. There is no way to report without choosing, and the only honest options are to use „said“ and be dull, or to choose the loaded verb and know that the choice has a byline on it whether or not the sentence carries one.",
    questions: [
      {
        text: "Which verb is the neutral one?",
        options: ["said", "claimed", "noted"],
        answer: 0,
        explain: "„The neutral verb is „said“, and it is the only one…“",
      },
      {
        text: "What does „conceded“ suggest about the fact?",
        options: ["it is probably true", "it is unproven", "it is small"],
        answer: 0,
        explain: "„she did not want to say it, so it is probably true.“",
      },
      {
        kind: "truefalse",
        text: "A writer can stay invisible in reported speech.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A writer cannot be invisible in reported speech.“",
      },
      {
        kind: "gapfill",
        text: "He claimed it; she ___ it; they alleged it.",
        options: [],
        answer: 0,
        accept: ["conceded"],
        explain: "„He claimed it; she conceded it; they alleged it.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "He claimed it; she conceded it; they alleged it.",
          "The neutral verb is „said“.",
          "The counterstatement said less than the verb that carried it.",
          "A writer cannot be invisible in reported speech.",
        ],
        explain: "Üç yargı, yansız olan, bedeli, en sonda sonuç.",
      },
      {
        kind: "short_answer",
        text: "What are the two honest options?",
        options: [],
        answer: 0,
        accept: ["„said“ or a known choice", "be dull or choose", "say it or own it"],
        explain: "„to use „said“ and be dull, or to choose the loaded verb and know that the choice has a byline on it.“",
      },
    ],
  },
  {
    id: "en-c1-u02-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 2,
    title: "The nuance of may well",
    genre: "info",
    intro: "Üst üste binen kipler. Her katman ne ekliyor?",
    gloss: [
      { de: "possibility", tr: "olasılık" },
      { de: "merely", tr: "yalnızca" },
      { de: "reasonably", tr: "makul biçimde" },
      { de: "adverb", tr: "zarf" },
      { de: "modal", tr: "kip" },
      { de: "passive", tr: "edilgen" },
      { de: "agent", tr: "eyleyen" },
      { de: "presuming", tr: "varsayma" },
      { de: "particular", tr: "belirli" },
      { de: "quite", tr: "tam olarak" },
      { de: "assume", tr: "varsaymak" },
      { de: "statistic", tr: "istatistik" },
      { de: "invisible", tr: "görünmez" },
      { de: "whole", tr: "bütün" },
      { de: "hypothetical", tr: "varsayımsal" },
      { de: "content", tr: "içerik" },
      { de: "stacks", tr: "yığınlar" },
      { de: "native", tr: "yerleşik" },
      { de: "certain", tr: "emin" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "themselves", tr: "kendileri" },
      { de: "failure", tr: "kusur" },
      { de: "stack", tr: "yığın" },
      { de: "underneath", tr: "altta" },
      { de: "a layer", tr: "katman" },
      { de: "a tendency", tr: "eğilim" },
      { de: "unpacked", tr: "açılmış" },
      { de: "a report", tr: "rapor" },
      { de: "three deep", tr: "üç kat" },
      { de: "a remark", tr: "söz" },
    ],
    minutes: 11,
    text:
      "The figure may well be presumed. Four words of verb and three of them are doing something other than naming an action.\n" +
      "„May“ gives possibility. „Well“ raises it: not merely possible but reasonably likely, and „may well“ is one of the few places in English where an adverb changes a modal rather than a verb. „Be presumed“ is a passive with no agent, so the presuming is done by nobody in particular.\n" +
      "Unpacked, the sentence says: it is quite likely that people assume this, and I am not one of the people. That is a great deal of work for a line that looks like a statistic.\n" +
      "It might have been expected to stay precarious. Now four layers. „Might“ is weaker than „may“. „Have been“ puts it before now. „Expected“ brings in a second, invisible group of people. „To stay“ carries the whole claim, and by the time the reader reaches it the writer has stepped back three times.\n" +
      "The risk would tend to be incalculable. „Would“ makes it hypothetical, „tend to“ makes it a tendency rather than a fact, and „incalculable“ is the only content word in the sentence.\n" +
      "These stacks are the native register of a certain kind of report, and they are not dishonest in themselves. A writer who genuinely does not know how likely something is has to say so, and English gives him a fine instrument for it.\n" +
      "The failure is when the stack is three deep and the thing underneath is known. Then the layers are not measurement; they are distance, and a reader who unpacks one such sentence will unpack the rest of the page and find the same thing.\n" +
      "So I allow two layers in a sentence and one sentence of that kind in a paragraph, and anything that needs more gets a remark of its own with a name in it.",
    questions: [
      {
        text: "What does „well“ do in „may well“?",
        options: ["raises it", "lowers it", "removes the modal"],
        answer: 0,
        explain: "„„Well“ raises it: not merely possible but reasonably likely…“",
      },
      {
        text: "How many times has the writer stepped back in the second example?",
        options: ["three", "one", "five"],
        answer: 0,
        explain: "„by the time the reader reaches it the writer has stepped back three times.“",
      },
      {
        kind: "truefalse",
        text: "These stacks are dishonest in themselves.",
        options: ["True", "False"],
        answer: 1,
        explain: "„they are not dishonest in themselves.“",
      },
      {
        kind: "gapfill",
        text: "The figure may ___ be presumed.",
        options: [],
        answer: 0,
        accept: ["well"],
        explain: "„The figure may well be presumed.“",
      },
      {
        kind: "order",
        text: "Katmanların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The figure may well be presumed.",
          "It might have been expected to stay precarious.",
          "The risk would tend to be incalculable.",
          "Two layers in a sentence, one such sentence in a paragraph.",
        ],
        explain: "Üç katman, dört katman, üç katman; en sonda sınır.",
      },
      {
        kind: "short_answer",
        text: "When are the layers distance rather than measurement?",
        options: [],
        answer: 0,
        accept: ["when the thing is known", "if it is known", "when nothing is unclear"],
        explain: "„when the stack is three deep and the thing underneath is known.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u02-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 2,
    title: "The tone of concession",
    genre: "dialogue",
    intro: "Ödün vermenin üç aracı. Hangisi hiçbir şey bırakmıyor?",
    gloss: [
      { de: "neither", tr: "ikisi de değil" },
      { de: "adjective", tr: "sıfat" },
      { de: "phrase", tr: "öbek" },
      { de: "shortness", tr: "kısalık" },
      { de: "anyway", tr: "yine de" },
      { de: "whole", tr: "bütün" },
      { de: "verdict", tr: "hüküm" },
      { de: "easily", tr: "kolayca" },
      { de: "granted", tr: "kabul" },
      { de: "albeit", tr: "her ne kadar" },
      { de: "explicable", tr: "açıklanabilir" },
      { de: "much as", tr: "her ne kadar" },
      { de: "weigh up", tr: "ölçüp biçmek" },
      { de: "gloss over", tr: "geçiştirmek" },
      { de: "a device", tr: "araç" },
      { de: "an argument", tr: "tartışma" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Devrim", text: "Granted, the figure is high, albeit explicable. Two concessions in one sentence and neither of them gives anything away." },
      { speaker: "Ilgın", text: "„Granted“ sounds like agreement." },
      { speaker: "Devrim", text: "It sounds like agreement and it is a move. „Granted“ takes a point off the table before the other side plays it, and „albeit“ takes half of it back in the same breath." },
      { speaker: "Ilgın", text: "And „albeit“ is not a full clause." },
      { speaker: "Devrim", text: "It takes an adjective or a phrase and never a subject. „Albeit explicable“, not „albeit it is explicable“, and that shortness is why it can sit at the end without slowing anything." },
      { speaker: "Ilgın", text: "The second line is longer." },
      { speaker: "Devrim", text: "Much as I weigh up both sides, one is stronger. „Much as“ is a concession with a person in it: I did the weighing, and I am telling you the result anyway." },
      { speaker: "Ilgın", text: "It sounds fairer than it is." },
      { speaker: "Devrim", text: "It sounds fairer than it is, and that is the whole device. A reader who has been shown the weighing accepts the verdict more easily than one who has only been given it." },
      { speaker: "Ilgın", text: "And the third?" },
      { speaker: "Devrim", text: "She would concede the point, whereas he would gloss over it. „Whereas“ is the only one of the three that is not about me; it puts two people side by side and lets the reader choose." },
      { speaker: "Ilgın", text: "So one of them is honest." },
      { speaker: "Devrim", text: "One of them is not about me, which is not the same thing, and in a multilayered argument that difference is worth a paragraph." },
    ],
    questions: [
      {
        text: "What does „granted“ do?",
        options: ["takes a point off the table", "gives the point away", "asks a question"],
        answer: 0,
        explain: "„„Granted“ takes a point off the table before the other side plays it…“",
      },
      {
        text: "What does „albeit“ take?",
        options: ["an adjective or a phrase", "a full clause", "a subject"],
        answer: 0,
        explain: "„It takes an adjective or a phrase and never a subject.“",
      },
      {
        kind: "truefalse",
        text: "„Whereas“ is about the writer.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„Whereas“ is the only one of the three that is not about me…“",
      },
      {
        kind: "gapfill",
        text: "Granted, the figure is high, ___ explicable.",
        options: [],
        answer: 0,
        accept: ["albeit"],
        explain: "„Granted, the figure is high, albeit explicable.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Much as I weigh up both sides, one is stronger.", "Much as I weigh up both sides, one is stronger"],
        explain: "Ödün, ama içinde bir kişi var: tartan ben.",
      },
      {
        kind: "short_answer",
        text: "Why does a reader accept the verdict more easily?",
        options: [],
        answer: 0,
        accept: ["they saw the weighing", "the weighing was shown", "they watched it"],
        explain: "„A reader who has been shown the weighing accepts the verdict more easily…“",
      },
    ],
  },
  {
    id: "en-c1-u02-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 2,
    title: "The settled pairing",
    genre: "monologue",
    intro: "Yerleşmiş eşleşmeler. Neden değiştirilemiyor?",
    gloss: [
      { de: "phrase", tr: "öbek" },
      { de: "command", tr: "buyruk" },
      { de: "exists", tr: "var" },
      { de: "preposition", tr: "edat" },
      { de: "guessable", tr: "tahmin edilebilir" },
      { de: "exist", tr: "var olmak" },
      { de: "noun", tr: "isim" },
      { de: "at one's disposal", tr: "elinde" },
      { de: "grapple with", tr: "boğuşmak" },
      { de: "catch on", tr: "yaygınlaşmak" },
      { de: "play out", tr: "yaşanmak" },
      { de: "damage control", tr: "hasar kontrolü" },
      { de: "a pairing", tr: "eşleşme" },
      { de: "settled", tr: "yerleşmiş" },
      { de: "swap", tr: "yerini değiştirmek" },
      { de: "a synonym", tr: "eş anlamlı" },
      { de: "audible", tr: "duyulur" },
      { de: "a learner", tr: "öğrenen" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Yalın", text: "To have at one's disposal is not to use. Six words of fixed phrase and not one of them can be swapped for a synonym." },
      { speaker: "Yalın", text: "„At one's command“ exists and means something near it. „At one's disposal“ is the one that goes with resources, and a reader hears the difference before deciding what it is." },
      { speaker: "Yalın", text: "They grapple with a question that will not catch on. Two settled pairings in one line: you grapple WITH a problem, and an idea catches ON." },
      { speaker: "Yalın", text: "Neither preposition is guessable. „Grapple against“ and „catch up“ both exist and both say something else, and that is the danger with this class of phrase." },
      { speaker: "Yalın", text: "Let it play out before you call it damage control. „Play out“ means run to its end; „damage control“ is a noun that arrived from one field and settled in every other." },
      { speaker: "Yalın", text: "What makes these hard is not the meaning. A learner at this level can work out every one of them from context on the first reading." },
      { speaker: "Yalın", text: "What cannot be worked out is which of the near versions is the right one, and that is only learnt by meeting the phrase in place, many times, in the register that owns it." },
      { speaker: "Yalın", text: "So I read these the way I read a list of names. Not to understand them — that is free — but to know them well enough that the wrong version is audible." },
    ],
    questions: [
      {
        text: "What goes with resources?",
        options: ["at one's disposal", "at one's command", "in one's hand"],
        answer: 0,
        explain: "„„At one's disposal“ is the one that goes with resources…“",
      },
      {
        text: "What cannot be worked out from context?",
        options: ["which near version is right", "the meaning", "the register"],
        answer: 0,
        explain: "„What cannot be worked out is which of the near-misses is the real one…“",
      },
      {
        kind: "truefalse",
        text: "The meaning of these phrases is what makes them hard.",
        options: ["True", "False"],
        answer: 1,
        explain: "„What makes these hard is not the meaning.“",
      },
      {
        kind: "gapfill",
        text: "They grapple ___ a question that will not catch on.",
        options: [],
        answer: 0,
        accept: ["with"],
        explain: "„They grapple with a question that will not catch on.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Let it play out before you call it damage control.", "Let it play out before you call it damage control"],
        explain: "Yerleşmiş eşleşme: parçaları değiştirilemiyor.",
      },
      {
        kind: "short_answer",
        text: "How well does he want to know them?",
        options: [],
        answer: 0,
        accept: ["the wrong version is audible", "well enough to hear it", "to hear the wrong one"],
        explain: "„to know them well enough that the wrong version is audible.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u02-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 2,
    title: "He claimed it; she conceded it; they alleged it",
    genre: "opinion",
    intro: "Üç aktarma fiili. Yargı nereden geliyor?",
    gloss: [
      { de: "unwilling", tr: "isteksiz" },
      { de: "court", tr: "mahkeme" },
      { de: "claimed", tr: "ileri sürdü" },
      { de: "conceded", tr: "kabul etti" },
      { de: "alleged", tr: "iddia etti" },
      { de: "a mouthpiece", tr: "sözcü" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "O ileri sürdü; o kabul etti; onlar iddia etti.",
        answer: "He claimed it; she conceded it; they alleged it.",
        hint: "Üç ayrı yargı, tek fark fiilde.",
      },
      {
        kind: "build",
        tr: "Karşı açıklama, onu taşıyan fiilden daha azını söyledi.",
        answer: "The counterstatement said less than the verb that carried it.",
        hint: "Tam alıntılanan bir yanıt yine de kaybedebiliyor.",
      },
      {
        kind: "build",
        tr: "Bir sözcünün maskesini adını anmadan düşürüyorlar.",
        answer: "They unmask a mouthpiece without naming one.",
        hint: "Fiil, nesneye „alleged“ın yaptığını özneye yapıyor.",
      },
      {
        kind: "build",
        tr: "Rakam pekâlâ varsayılıyor olabilir.",
        answer: "The figure may well be presumed.",
        hint: "„well“ kipi güçlendiriyor; edilgende fail yok.",
      },
      {
        kind: "form",
        prompt: "Fiil kartını doldur.",
        facts: "„claimed“ kuşku koyuyor; „conceded“ doğruluğu artırıyor; „alleged“ kanıtlanmamış diyor; yansız olan yalnız „said“.",
        fields: [
          { label: "Doubt", answer: "claimed", accept: ["nobody checked"] },
          { label: "Probably true", answer: "conceded", accept: ["unwilling"] },
          { label: "Unproven", answer: "alleged", accept: ["a court"] },
          { label: "Neutral", answer: "said", accept: ["the only one"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u02-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 2,
    title: "Granted, the figure is high, albeit explicable",
    genre: "opinion",
    intro: "Üç ödün aracı ve iki kip katmanı.",
    gloss: [
      { de: "granted", tr: "kabul" },
      { de: "albeit", tr: "her ne kadar" },
      { de: "much as", tr: "her ne kadar" },
      { de: "whereas", tr: "oysa" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kabul, rakam yüksek, her ne kadar açıklanabilir olsa da.",
        answer: "Granted, the figure is high, albeit explicable.",
        hint: "„albeit“ sıfat ya da öbek alıyor, cümle almıyor.",
      },
      {
        kind: "build",
        tr: "Her ne kadar iki tarafı da tartsam da biri daha güçlü.",
        answer: "Much as I weigh up both sides, one is stronger.",
        hint: "İçinde bir kişi olan ödün: tartan ben.",
      },
      {
        kind: "build",
        tr: "O noktayı kabul ederdi, oysa öteki geçiştirirdi.",
        answer: "She would concede the point, whereas he would gloss over it.",
        hint: "„whereas“ iki kişiyi yan yana koyuyor.",
      },
      {
        kind: "build",
        tr: "Güvencesiz kalması beklenmiş olabilirdi.",
        answer: "It might have been expected to stay precarious.",
        hint: "Dört katman: „might“, „have been“, „expected“, mastar.",
      },
      {
        kind: "build",
        tr: "Risk hesaplanamaz olma eğiliminde olurdu.",
        answer: "The risk would tend to be incalculable.",
        hint: "„would“ varsayım, „tend to“ eğilim.",
      },
    ],
  },
];
