import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 7 — "Yazının atladıkları, itiraz mektubu, ne kadar
 * bağlayıcı, hangi taraf önce".
 *
 * Dört ders: What the article omits · The appeal letter ·
 * How binding is it · Which party comes first.
 *
 *   Kelime: arson, bodily harm, apprehend, impassable, manhunt,
 *           deterrence, insolvency, indebtedness, levy, irrevocable,
 *           deductible, liquidity, warning strike, short-time work.
 *   Kalıp:  Some articles name arson; others, bodily harm. ·
 *           The police would apprehend if they could. ·
 *           One road is impassable; the other is not. ·
 *           Granted, the insolvency is real, albeit recent. ·
 *           Much as the indebtedness grew, the client is not insolvent. ·
 *           The levy is irrevocable, whereas the fee is not. ·
 *           The deductible may well be raised. ·
 *           It might have been expected to cover occupational disability. ·
 *           Liquidity would tend to fall first. ·
 *           What the union secured is a representation of interests. ·
 *           Into the dispute comes a warning strike. ·
 *           The short-time work we accepted; the continued pay we did not.
 *
 * Ünitenin tek öğretme noktası EKSİLTME. Bir derste üç ayrı büyüklükte
 * delik var: fiil siliniyor ve yerini virgül tutuyor; nesne siliniyor ve
 * geçişli fiil bir kişiyi değil bir siyaseti adlandırmaya başlıyor; yüklem
 * bütünüyle siliniyor ve „is not“ onu tek başına taşıyor. Yeniden ölçüm
 * şaşırtıcı çıkıyor: silme yönü DİLE değil BİÇİME bağlı. İlk cümlede
 * İngilizce virgüle muhtaç, fiili ikinci konuma koyan bir dil ise boş
 * konumun kendisiyle idare ediyor; ikincisinde İngilizce önde (yardımcı
 * fiil tek başına duruyor, Almanca ardına bir „es“ bırakmak zorunda);
 * üçüncüsünde İngilizce geride (Almanca „nicht“i yalnız bırakıyor,
 * İngilizce „is“i tutmak zorunda). Aynı ünite içinde üç satır, üç ayrı yön.
 */
export const enC1U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u07-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 7,
    title: "What the article omits",
    genre: "info",
    intro: "Bir derste üç ayrı büyüklükte delik. Hangisini hangi dil kapatıyor?",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "object", tr: "nesne" },
      { de: "largest", tr: "en büyük" },
      { de: "whole", tr: "bütün" },
      { de: "itself", tr: "kendisi" },
      { de: "elsewhere", tr: "başka yerde" },
      { de: "drop", tr: "düşürmek" },
      { de: "belongs", tr: "ait" },
      { de: "confidence", tr: "güven" },
      { de: "spend", tr: "harcamak" },
      { de: "deterred", tr: "caydırılan" },
      { de: "a hole", tr: "delik" },
      { de: "a size", tr: "büyüklük" },
      { de: "the comma", tr: "virgül" },
      { de: "missing", tr: "eksik" },
      { de: "puts it back", tr: "geri koyuyor" },
      { de: "transitive", tr: "geçişli" },
      { de: "a policy", tr: "siyaset" },
      { de: "the predicate", tr: "yüklem" },
      { de: "alone", tr: "tek başına" },
      { de: "deletes", tr: "siliyor" },
      { de: "decided", tr: "belirlenen" },
      { de: "the shape", tr: "biçim" },
      { de: "second position", tr: "ikinci konum" },
      { de: "a signal", tr: "işaret" },
      { de: "punctuation", tr: "noktalama" },
      { de: "ahead", tr: "önde" },
      { de: "behind", tr: "geride" },
      { de: "a pronoun", tr: "adıl" },
      { de: "standing in", tr: "yerini tutan" },
      { de: "the negative", tr: "olumsuzluk" },
      { de: "a translator", tr: "çevirmen" },
      { de: "confident", tr: "kendinden emin" },
      { de: "free", tr: "bedava" },
      { de: "left out", tr: "dışarıda bırakılmış" },
    ],
    minutes: 12,
    text:
      "Some articles name arson; others, bodily harm. Read the second half again and look for the verb. There is none. The comma is standing where „name“ would have been, and every reader of English puts it back without being asked.\n" +
      "That is the first of three holes in this lesson, and they are of three different sizes.\n" +
      "The second is smaller. The police would apprehend if they could. Here the object has gone rather than the verb, and a transitive verb used this way stops naming a person and starts naming a policy. A paper that reports a manhunt in this shape is not telling you whom it is for.\n" +
      "The third is the largest. One road is impassable; the other is not. The whole predicate has gone and „is not“ carries it alone.\n" +
      "Now the part worth being slow about. English does not delete more than other languages. It deletes in different places, and the place is decided by the shape rather than by the language.\n" +
      "In the first sentence English needs the comma, because nothing else shows that a verb is missing. A language that keeps its verb in second position needs no comma at all: the empty second position is itself the signal, and here the punctuation is doing a job that word order has already done elsewhere.\n" +
      "In the second sentence English is ahead. „If they could“ ends there, with nothing after it, and most of its neighbours have to leave a small word behind — a pronoun standing in for the thing that was not said.\n" +
      "In the third sentence English is behind. „The other is not“ still has its verb; a good many languages drop that too and leave the negative on its own.\n" +
      "So the sentence that is shortest in English is not the shortest everywhere, and a translator who keeps the holes in the same places has translated the punctuation rather than the sentence.\n" +
      "One last warning, and it belongs to this vocabulary. A paragraph full of holes reads as confident, and the confidence is free: nothing has been argued, only left out. A report on deterrence written in this shape can spend four hundred words without once naming who is deterred.",
    questions: [
      {
        text: "What is standing where the verb would have been?",
        options: ["the comma", "a pronoun", "the subject"],
        answer: 0,
        explain: "„The comma is standing where „name“ would have been…“",
      },
      {
        text: "What decides where a language deletes?",
        options: ["the shape", "the language", "the reader"],
        answer: 0,
        explain: "„the place is decided by the shape rather than by the language.“",
      },
      {
        kind: "truefalse",
        text: "English deletes more than other languages.",
        options: ["True", "False"],
        answer: 1,
        explain: "„English does not delete more than other languages.“",
      },
      {
        kind: "gapfill",
        text: "One road is impassable; the other is ___.",
        options: [],
        answer: 0,
        accept: ["not"],
        explain: "„One road is impassable; the other is not.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Some articles name arson; others, bodily harm.",
          "The police would apprehend if they could.",
          "One road is impassable; the other is not.",
          "The place is decided by the shape.",
        ],
        explain: "Fiil, nesne, yüklem; en sonda ortak ölçü.",
      },
      {
        kind: "short_answer",
        text: "In the second sentence, what has gone?",
        options: [],
        answer: 0,
        accept: ["the object", "an object", "its object"],
        explain: "„Here the object has gone rather than the verb…“",
      },
    ],
  },
  {
    id: "en-c1-u07-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 7,
    title: "The appeal letter",
    genre: "opinion",
    intro: "İki taviz, hiçbir ödün. Zincir neden bu kadar uzun?",
    gloss: [
      { de: "passive", tr: "edilgen" },
      { de: "content", tr: "içerik" },
      { de: "belongs", tr: "ait" },
      { de: "hedges", tr: "çekinceler" },
      { de: "dropped", tr: "düşürülmüş" },
      { de: "middle", tr: "orta" },
      { de: "whole", tr: "bütün" },
      { de: "caution", tr: "ihtiyat" },
      { de: "produces", tr: "üretiyor" },
      { de: "hedge", tr: "çekince" },
      { de: "a concession", tr: "taviz" },
      { de: "given anything away", tr: "ödün vermiş" },
      { de: "argued with", tr: "karşı çıkılan" },
      { de: "takes half of it back", tr: "yarısını geri alıyor" },
      { de: "a history", tr: "geçmiş" },
      { de: "arrange", tr: "düzenlemek" },
      { de: "a hinge", tr: "menteşe" },
      { de: "admits", tr: "kabul ediyor" },
      { de: "assembling", tr: "kurmakta olduğu" },
      { de: "the refusal", tr: "ret" },
      { de: "the cold one", tr: "soğuk olanı" },
      { de: "separates", tr: "ayırıyor" },
      { de: "distance", tr: "mesafe" },
      { de: "a modal", tr: "kip fiili" },
      { de: "an adverb", tr: "belirteç" },
      { de: "stacked", tr: "üst üste konmuş" },
      { de: "machinery", tr: "düzenek" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "count", tr: "saymak" },
      { de: "lengthening", tr: "uzatmak" },
      { de: "a particle", tr: "parçacık" },
      { de: "unstressed", tr: "vurgusuz" },
      { de: "evasive", tr: "kaçamak" },
      { de: "careful", tr: "özenli" },
    ],
    minutes: 12,
    text:
      "Granted, the insolvency is real, albeit recent. Eight words, two concessions, and the letter has not given anything away.\n" +
      "„Granted“ opens by handing the reader a fact that cannot be argued with. „Albeit“ takes half of it back: the insolvency is real, and it is also three months old, and three months is not a history. Neither word carries an argument. Both of them arrange one.\n" +
      "Much as the indebtedness grew, the client is not insolvent. The same move on a different hinge. „Much as“ admits the size of the growth and then refuses the conclusion the reader was assembling, and the refusal is the only claim in the sentence.\n" +
      "The levy is irrevocable, whereas the fee is not. „Whereas“ is the cold one. It does not concede at all; it separates, and a letter that separates two items is usually about to pay one of them.\n" +
      "Then comes the second half of this register, which is not concession but distance. The deductible may well be raised. A modal, an adverb and a passive, stacked three deep, and at the end of it nobody has raised anything and nobody has promised that anybody will.\n" +
      "It might have been expected to cover occupational disability. Four words of machinery in front of the only word in the line that carries content. Liquidity would tend to fall first. „Would“, then „tend“, and the fall has become a habit that belongs to nobody.\n" +
      "This is the place where a reader from another language should stop and count. English hedges by lengthening. Each small word takes a little more weight off the claim, and the chain can run to four or five before the verb arrives.\n" +
      "Its neighbours do it in one piece. A single unstressed particle dropped into the middle of the sentence does the work of the whole English chain, and there is no second word to add because the first one has already said how sure the writer is.\n" +
      "So the same caution comes out long in one language and short in the other. A writer who carries the chain across word for word produces a sentence that sounds evasive rather than careful, and in a letter about creditworthiness that difference is the letter.",
    questions: [
      {
        text: "What does „albeit“ do?",
        options: ["takes half of it back", "adds a second fact", "opens the letter"],
        answer: 0,
        explain: "„„Albeit“ takes half of it back…“",
      },
      {
        text: "How does English hedge?",
        options: ["by lengthening", "with one particle", "with a passive"],
        answer: 0,
        explain: "„English hedges by lengthening.“",
      },
      {
        kind: "truefalse",
        text: "„Whereas“ concedes something.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It does not concede at all; it separates…“",
      },
      {
        kind: "gapfill",
        text: "The deductible may ___ be raised.",
        options: [],
        answer: 0,
        accept: ["well"],
        explain: "„The deductible may well be raised.“",
      },
      {
        kind: "order",
        text: "Mektubun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Granted, the insolvency is real, albeit recent.",
          "Much as the indebtedness grew, the client is not insolvent.",
          "The levy is irrevocable, whereas the fee is not.",
          "English hedges by lengthening.",
        ],
        explain: "İki taviz, bir ret, bir ayrım; en sonda ölçü.",
      },
      {
        kind: "short_answer",
        text: "What is the only claim in that sentence?",
        options: [],
        answer: 0,
        accept: ["the refusal", "a refusal", "only the refusal"],
        explain: "„the refusal is the only claim in the sentence.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u07-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 7,
    title: "Which party comes first",
    genre: "dialogue",
    intro: "Üç cümle, üç ayrı başlangıç. Hangisi neyi öne alıyor?",
    gloss: [
      { de: "object", tr: "nesne" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "objects", tr: "nesneler" },
      { de: "deletion", tr: "silme" },
      { de: "crime", tr: "suç" },
      { de: "pair", tr: "çift" },
      { de: "a bulletin", tr: "bülten" },
      { de: "fronted", tr: "öne alınmış" },
      { de: "the fourth word", tr: "dördüncü sözcük" },
      { de: "an announcement", tr: "duyuru" },
      { de: "arrives", tr: "geliyor" },
      { de: "the stage", tr: "sahne" },
      { de: "a paired sentence", tr: "eşli cümle" },
      { de: "the second half", tr: "ikinci yarı" },
      { de: "gone", tr: "gitmiş" },
      { de: "borrowed", tr: "ödünç alınmış" },
      { de: "a minute", tr: "tutanak" },
      { de: "neutral", tr: "yansız" },
      { de: "an order", tr: "sıra" },
      { de: "conceded", tr: "kabul edilmiş" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Nilay", text: "What the union secured is a representation of interests. That opening tells you the sentence is about to name one thing and only one." },
      { speaker: "Emre", text: "The fourth word again." },
      { speaker: "Nilay", text: "The fourth word again. „Is“ arrives and the shape is closed. If it were „secured“ you would be in a different sentence with the object fronted instead." },
      { speaker: "Emre", text: "And the bulletin opens differently." },
      { speaker: "Nilay", text: "Into the dispute comes a warning strike. The place comes first and the subject arrives last, which is how an announcement puts a new thing on the stage." },
      { speaker: "Emre", text: "Could you write that in a minute of a meeting?" },
      { speaker: "Nilay", text: "You could, once. Twice and the minute has borrowed a voice from somewhere else, and a reader who wanted a neutral record will notice." },
      { speaker: "Emre", text: "The last one is the paired sentence." },
      { speaker: "Nilay", text: "The short-time work we accepted; the continued pay we did not. Two objects fronted, and in the second half the verb has gone." },
      { speaker: "Emre", text: "So it is the same deletion as in the crime report." },
      { speaker: "Nilay", text: "The same deletion, in a colder room. Here it is doing a job: the two items are being held side by side so that the difference between them cannot be missed." },
      { speaker: "Emre", text: "And the order of the two?" },
      { speaker: "Nilay", text: "Conceded first, refused last. A paragraph that ends on what was given away has told the other side where to push tomorrow morning." },
    ],
    questions: [
      {
        text: "What closes the shape in the first sentence?",
        options: ["the fourth word", "the place", "the subject"],
        answer: 0,
        explain: "„„Is“ arrives and the shape is closed.“",
      },
      {
        text: "What arrives last in the bulletin sentence?",
        options: ["the subject", "the place", "the verb"],
        answer: 0,
        explain: "„The place comes first and the subject arrives last…“",
      },
      {
        kind: "truefalse",
        text: "A paragraph should end on what was given away.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A paragraph that ends on what was given away has told the other side where to push…“",
      },
      {
        kind: "gapfill",
        text: "The short-time work we accepted; the continued pay we ___ not.",
        options: [],
        answer: 0,
        accept: ["did"],
        explain: "„The short-time work we accepted; the continued pay we did not.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Into the dispute comes a warning strike.", "Into the dispute comes a warning strike"],
        explain: "Yer başta, özne sonda.",
      },
      {
        kind: "short_answer",
        text: "Which item comes first in the pair?",
        options: [],
        answer: 0,
        accept: ["the conceded one", "what was conceded", "the accepted one"],
        explain: "„Conceded first, refused last.“",
      },
    ],
  },
  {
    id: "en-c1-u07-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 7,
    title: "How binding is it",
    genre: "monologue",
    intro: "Bir cümlede kaç katman var? Sayarak dinle.",
    gloss: [
      { de: "passive", tr: "edilgen" },
      { de: "failure", tr: "kusur" },
      { de: "hedging", tr: "çekince koyma" },
      { de: "belongs", tr: "ait" },
      { de: "machinery", tr: "düzenek" },
      { de: "backwards", tr: "tersinden" },
      { de: "binding", tr: "bağlayıcı" },
      { de: "a layer", tr: "katman" },
      { de: "count", tr: "saymak" },
      { de: "a promise", tr: "söz" },
      { de: "quoted", tr: "alıntılanan" },
      { de: "liability", tr: "sorumluluk" },
      { de: "politeness", tr: "nezaket" },
      { de: "a court", tr: "mahkeme" },
      { de: "survives", tr: "sağ kalıyor" },
      { de: "an expectation", tr: "beklenti" },
      { de: "nobody", tr: "hiç kimse" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "insurance", tr: "sigorta" },
      { de: "a reader", tr: "okur" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Gökçe", text: "The deductible may well be raised. I want you to count the layers in that line before you decide what it means." },
      { speaker: "Gökçe", text: "„May“ is the first. „Well“ is the second, and it is the one that sounds like agreement while promising nothing at all." },
      { speaker: "Gökçe", text: "„Be raised“ is the third, and it is the one that matters: the passive has taken the insurance company out of its own sentence." },
      { speaker: "Gökçe", text: "Three layers, and at the end of them nothing is binding. That is the point of the line, not a failure of it." },
      { speaker: "Gökçe", text: "In this register hedging is not politeness. It is liability. A sentence that can be quoted in a court as a promise has cost somebody a great deal of money." },
      { speaker: "Gökçe", text: "It might have been expected to cover occupational disability. Four layers this time, and an expectation that belongs to nobody has been put on the page." },
      { speaker: "Gökçe", text: "Ask who expected it. The sentence will not tell you, and it was written so that it would not have to." },
      { speaker: "Gökçe", text: "Liquidity would tend to fall first. A fall has been turned into a habit, and a habit has no date on it." },
      { speaker: "Gökçe", text: "What survives all of this is one fact: a number will change. Everything else in the letter is machinery around that number." },
      { speaker: "Gökçe", text: "So read these letters backwards. Find the number, then ask what each layer in front of it was keeping away from a reader." },
    ],
    questions: [
      {
        text: "How many layers are in the first line?",
        options: ["three", "two", "four"],
        answer: 0,
        explain: "„Three layers, and at the end of them nothing is binding.“",
      },
      {
        text: "In this register, what is hedging?",
        options: ["liability", "politeness", "style"],
        answer: 0,
        explain: "„In this register hedging is not politeness. It is liability.“",
      },
      {
        kind: "truefalse",
        text: "The sentence says who expected the cover.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Ask who expected it. The sentence will not tell you…“",
      },
      {
        kind: "gapfill",
        text: "Liquidity would ___ to fall first.",
        options: [],
        answer: 0,
        accept: ["tend"],
        explain: "„Liquidity would tend to fall first.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The deductible may well be raised.", "The deductible may well be raised"],
        explain: "Üç katman: kip fiili, belirteç, edilgen.",
      },
      {
        kind: "short_answer",
        text: "What survives all of this?",
        options: [],
        answer: 0,
        accept: ["a number will change", "one fact", "the number"],
        explain: "„a number will change.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u07-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 7,
    title: "Some articles name arson; others, bodily harm",
    genre: "info",
    intro: "Üç ayrı büyüklükte delik ve iki ayrı başlangıç.",
    gloss: [
      { de: "comma", tr: "virgül" },
      { de: "object", tr: "nesne" },
      { de: "arson", tr: "kundaklama" },
      { de: "bodily harm", tr: "yaralama" },
      { de: "to apprehend", tr: "gözaltına almak" },
      { de: "impassable", tr: "geçilmez" },
      { de: "a warning strike", tr: "uyarı grevi" },
      { de: "short-time work", tr: "kısa çalışma" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bazı yazılar kundaklama diyor; bazıları yaralama.",
        answer: "Some articles name arson; others, bodily harm.",
        hint: "İkinci yarıda fiil yok; yerini virgül tutuyor.",
      },
      {
        kind: "build",
        tr: "Polis, elinden gelse gözaltına alırdı.",
        answer: "The police would apprehend if they could.",
        hint: "Nesne silinmiş; yardımcı fiil tek başına duruyor.",
      },
      {
        kind: "build",
        tr: "Yollardan biri geçilmez; öteki değil.",
        answer: "One road is impassable; the other is not.",
        hint: "Yüklem gitmiş, „is not“ onu tek başına taşıyor.",
      },
      {
        kind: "build",
        tr: "Sendikanın elde ettiği şey bir çıkar temsili.",
        answer: "What the union secured is a representation of interests.",
        hint: "Dördüncü sözcük „is“: yarma cümle.",
      },
      {
        kind: "build",
        tr: "Uyuşmazlığa bir uyarı grevi giriyor.",
        answer: "Into the dispute comes a warning strike.",
        hint: "Yer başta, özne sonda.",
      },
      {
        kind: "form",
        prompt: "Eksiltme kartını doldur.",
        facts: "Fiil siliniyor ve virgül yerini tutuyor; nesne siliniyor ve fiil bir siyaseti adlandırıyor; yüklem siliniyor ve olumsuzluk kalıyor; yön dile değil biçime bağlı.",
        fields: [
          { label: "First hole", answer: "the verb", accept: ["a verb"] },
          { label: "Marked by", answer: "the comma", accept: ["a comma"] },
          { label: "Second hole", answer: "the object", accept: ["an object"] },
          { label: "Decided by", answer: "the shape", accept: ["shape"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u07-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 7,
    title: "Granted, the insolvency is real, albeit recent",
    genre: "info",
    intro: "Taviz sözcükleri ve mesafe zinciri.",
    gloss: [
      { de: "insolvency", tr: "ödeme aczi" },
      { de: "indebtedness", tr: "borçluluk" },
      { de: "a levy", tr: "harç" },
      { de: "irrevocable", tr: "geri alınamaz" },
      { de: "a deductible", tr: "muafiyet tutarı" },
      { de: "liquidity", tr: "likidite" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kabul, ödeme aczi gerçek, gerçi yeni.",
        answer: "Granted, the insolvency is real, albeit recent.",
        hint: "İki taviz sözcüğü, hiçbir ödün.",
      },
      {
        kind: "build",
        tr: "Borçluluk ne kadar büyümüş olsa da müvekkil ödeme aczinde değil.",
        answer: "Much as the indebtedness grew, the client is not insolvent.",
        hint: "Büyümeyi kabul eden, sonucu reddeden menteşe.",
      },
      {
        kind: "build",
        tr: "Harç geri alınamaz, ücret ise alınabilir.",
        answer: "The levy is irrevocable, whereas the fee is not.",
        hint: "Taviz değil ayrım: soğuk bağlaç.",
      },
      {
        kind: "build",
        tr: "Muafiyet tutarı pekâlâ yükseltilebilir.",
        answer: "The deductible may well be raised.",
        hint: "Üç katman: kip fiili, belirteç, edilgen.",
      },
      {
        kind: "build",
        tr: "Likidite önce düşme eğiliminde olur.",
        answer: "Liquidity would tend to fall first.",
        hint: "Düşüş bir alışkanlığa çevrilmiş; sahibi yok.",
      },
    ],
  },
];
