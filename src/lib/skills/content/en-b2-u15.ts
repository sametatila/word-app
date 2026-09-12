import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 15 — "On yılın sonuna kadar, tutmayan kanun, fabrika
 * kalsaydı, bir grup hakkında konuşmak".
 *
 * Dört ders: By the end of the decade · The law that failed ·
 * If the plant had stayed · Speaking about a group.
 *
 *   Kelime: upturn, investment, market share, supply chain, stock market,
 *           workforce, job market, draft law, regulation, enforcement,
 *           supervision, administration, authorize, prerequisite,
 *           bankruptcy, severance pay, dismissal, termination, employment,
 *           generalization, plausible, questionable, contradictory,
 *           undeniable, nonetheless, by no means, in a sense.
 *   Kalıp:  By spring the upturn will have started. ·
 *           Next year we will be watching the investment. ·
 *           By then the market share will have doubled. ·
 *           The draft law must have been unclear. ·
 *           They can't have read the regulation. ·
 *           We should have funded enforcement. ·
 *           If the firm had avoided bankruptcy, we would have stayed. ·
 *           If the severance pay had been fair, the town would be calm now. ·
 *           If the dismissal had been legal, the case would have ended. ·
 *           It seems to be a generalization. ·
 *           Apparently the claim is plausible. ·
 *           On balance the figure is arguably questionable.
 *
 * Ünitenin tek öğretme noktası „BY NO MEANS“ OLUMSUZLUĞU KENDİ İÇİNDE
 * TAŞIYOR. „The claim is by no means settled“ cümlesinde hiçbir yerde
 * „not“ yok, ve öbeğin gücünü hisseden yazar bir „not“ ekleyince cümle
 * tersine dönüyor. A2'deki „unless“in aynısı, bir üst düzeyde. Yanında
 * çekince ölçeği duruyor: „by no means“ en sert, „in a sense“ en yumuşak,
 * „undeniable“ ise okuru konuşmanın dışına iten uç.
 */
export const enB2U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u15-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 15,
    title: "Speaking about a group",
    genre: "opinion",
    intro: "Beş çekince ve bir tuzak. „not“ nerede?",
    gloss: [
      { de: "sentences", tr: "cümleler" },
      { de: "itself", tr: "kendisi" },
      { de: "sentence", tr: "cümle" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "trap", tr: "tuzak" },
      { de: "large", tr: "büyük" },
      { de: "a hedge", tr: "çekince" },
      { de: "settled", tr: "kapanmış" },
      { de: "a phrase", tr: "öbek" },
      { de: "the force", tr: "güç" },
      { de: "to match", tr: "denk düşürmek" },
      { de: "the opposite", tr: "tersi" },
      { de: "a scale", tr: "ölçek" },
      { de: "a refusal", tr: "ret" },
      { de: "concedes", tr: "ödün veriyor" },
      { de: "the weight", tr: "ağırlık" },
      { de: "denies", tr: "yadsıyan" },
      { de: "the conversation", tr: "konuşma" },
      { de: "flat", tr: "düz" },
      { de: "honest", tr: "dürüst" },
      { de: "catches", tr: "yakalıyor" },
    ],
    minutes: 9,
    text:
      "It seems to be a generalization. Apparently the claim is plausible. On balance the figure is arguably questionable. Three sentences about the same paragraph, and between them they use five hedges, which is three too many.\n" +
      "The one worth stopping on is not in those three. It is „by no means“, and it is the strongest thing on the list: the claim is by no means settled. That phrase is a negative all by itself, and the sentence around it has no „not“ anywhere.\n" +
      "That is the trap. A writer who feels the force of the phrase adds a „not“ to match it, and „is not by no means settled“ says the opposite of what was meant. It is the same shape as „unless“, which carried its own negative two levels ago, and it catches the same people.\n" +
      "The rest of the list is a scale. „By no means“ is a flat refusal. „Questionable“ and „contradictory“ put the weight on the claim. „Nonetheless“ concedes and then turns. „In a sense“ agrees with something small so that the next sentence can disagree with something large.\n" +
      "„Undeniable“ is at the other end and should almost never be written, because a reader who denies it is now outside the conversation.\n" +
      "So the paragraph keeps one. If the point is strong, „by no means“ and nothing else. If it is weak, „in a sense“ and an honest second sentence.",
    questions: [
      {
        text: "What is „by no means“?",
        options: ["a negative by itself", "a soft word", "a question"],
        answer: 0,
        explain: "„That phrase is a negative all by itself…“",
      },
      {
        text: "Which earlier word has the same shape?",
        options: ["unless", "although", "despite"],
        answer: 0,
        explain: "„It is the same shape as „unless“, which carried its own negative two levels ago…“",
      },
      {
        kind: "truefalse",
        text: "„Undeniable“ is a good word for a report.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„Undeniable“ is at the other end and should almost never be written…“",
      },
      {
        kind: "gapfill",
        text: "The claim is by no ___ settled.",
        options: [],
        answer: 0,
        accept: ["means"],
        explain: "„the claim is by no means settled.“",
      },
      {
        kind: "order",
        text: "Ölçeğin sırası: en sertten en yumuşağa koy.",
        options: [],
        answer: 0,
        items: [
          "By no means is a flat refusal.",
          "Questionable puts the weight on the claim.",
          "Nonetheless concedes and then turns.",
          "In a sense agrees with something small.",
        ],
        explain: "Ret, ağırlık, ödün, küçük bir kabul.",
      },
      {
        kind: "short_answer",
        text: "What happens to a reader who denies it?",
        options: [],
        answer: 0,
        accept: ["outside the conversation", "they are outside", "out of it"],
        explain: "„a reader who denies it is now outside the conversation.“",
      },
    ],
  },
  {
    id: "en-b2-u15-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 15,
    title: "The law that failed",
    genre: "info",
    intro: "Üç kip, üç iş. Hangisi hatırlanıyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "sentence", tr: "cümle" },
      { de: "modal", tr: "kip" },
      { de: "prohibition", tr: "yasak" },
      { de: "whole", tr: "bütün" },
      { de: "spend", tr: "harcamak" },
      { de: "an explanation", tr: "açıklama" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "backwards", tr: "geriye" },
      { de: "rules out", tr: "dışarıda bırakıyor" },
      { de: "the temptation", tr: "ayartı" },
      { de: "accurate", tr: "isabetli" },
      { de: "a gazette", tr: "resmî gazete" },
      { de: "funded", tr: "fonladı" },
      { de: "a decision", tr: "karar" },
      { de: "earn", tr: "hak etmek" },
      { de: "applied", tr: "uyguladı" },
      { de: "unclear", tr: "belirsiz" },
    ],
    minutes: 9,
    text:
      "The draft law must have been unclear. Four words of verb, and the first of them is not giving an order.\n" +
      "„Must have been“ reads the evidence. Three administrations applied the same regulation in three different ways, and only one explanation survives that. The sentence is a conclusion and it says so with a modal rather than with an argument.\n" +
      "They can't have read the regulation. The negative, and it is „can't have“ and never „mustn't have“: a prohibition cannot be sent backwards to last year.\n" +
      "We should have funded enforcement. The third one, and it is the only sentence in the paragraph about us. It is not about what happened; it is about what did not, and a public official reading the note will remember that line and forget the other two.\n" +
      "That is the whole of a review of this kind. What the evidence shows. What it rules out. What we did not do.\n" +
      "The temptation is to spend the page on supervision and prerequisites, because those are about the world. A note written that way is accurate and it changes nothing, because nobody in it has a name or a decision.\n" +
      "So the third sentence is written first, and the rest of the page is built to earn it. A draft law that nobody was authorized to enforce was never a law; it was a sentence in a gazette with a number on it.",
    questions: [
      {
        text: "What does „must have been“ read?",
        options: ["the evidence", "the regulation", "the order"],
        answer: 0,
        explain: "„„Must have been“ reads the evidence.“",
      },
      {
        text: "Which line will the official remember?",
        options: ["the one about us", "the one about the law", "the one about reading"],
        answer: 0,
        explain: "„a public official reading the note will remember that line and forget the other two.“",
      },
      {
        kind: "truefalse",
        text: "A note about supervision only changes things.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A note written that way is accurate and it changes nothing…“",
      },
      {
        kind: "gapfill",
        text: "They ___ have read the regulation.",
        options: [],
        answer: 0,
        accept: ["can't", "cannot"],
        explain: "„They can't have read the regulation.“",
      },
      {
        kind: "order",
        text: "İncelemenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The draft law must have been unclear.",
          "They can't have read the regulation.",
          "We should have funded enforcement.",
          "The third sentence is written first.",
        ],
        explain: "Kanıt, dışarıda bıraktığı, kendi payımız, en sonda yazma sırası.",
      },
      {
        kind: "short_answer",
        text: "What was the draft law really?",
        options: [],
        answer: 0,
        accept: ["a sentence in a gazette", "a numbered sentence", "not a law"],
        explain: "„it was a sentence in a gazette with a number on it.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u15-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 15,
    title: "If the plant had stayed",
    genre: "dialogue",
    intro: "Üç koşul, bir kasaba. Hangisi bu sabaha ait?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "lawyers", tr: "avukatlar" },
      { de: "closed", tr: "kapalı" },
      { de: "calm", tr: "sakin" },
      { de: "the street", tr: "sokak" },
      { de: "legal", tr: "yasal" },
      { de: "running", tr: "sürmekte" },
      { de: "a council", tr: "konsey" },
      { de: "entirely", tr: "tümüyle" },
      { de: "regret", tr: "hayıflanmak" },
      { de: "describe", tr: "betimlemek" },
      { de: "avoided", tr: "kaçındı" },
      { de: "fair", tr: "adil" },
      { de: "mixed", tr: "karışık" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Nesrin", text: "If the firm had avoided bankruptcy, we would have stayed. Closed on both sides, and it is the sentence everybody in the town says first." },
      { speaker: "Kerem", text: "And it changes nothing." },
      { speaker: "Nesrin", text: "It changes nothing, because the firm did not avoid it and the staying was available only in that year." },
      { speaker: "Kerem", text: "The second one is different." },
      { speaker: "Nesrin", text: "If the severance pay had been fair, the town would be calm now. The cause is finished and the result is on the street this morning, so the second half comes forward." },
      { speaker: "Kerem", text: "Mixed." },
      { speaker: "Nesrin", text: "Mixed, and it is the only one of the three that anybody can still act on. A town that is not calm is a fact with a date of today." },
      { speaker: "Kerem", text: "And the third?" },
      { speaker: "Nesrin", text: "If the dismissal had been legal, the case would have ended. Closed, correctly: the case is still running because the dismissal was not legal." },
      { speaker: "Kerem", text: "Does the works council use these?" },
      { speaker: "Nesrin", text: "The council uses the mixed one and the lawyers use the closed ones, and that difference is not a style. A closed sentence is about a termination. A mixed one is about a town." },
      { speaker: "Kerem", text: "And the collective agreement?" },
      { speaker: "Nesrin", text: "The agreement is written entirely in the present, which is why nobody argues about its grammar. Employment is a thing you describe, not a thing you regret." },
    ],
    questions: [
      {
        text: "Which sentence can people still act on?",
        options: ["the mixed one", "the first one", "the third one"],
        answer: 0,
        explain: "„it is the only one of the three that anybody can still act on.“",
      },
      {
        text: "Why is the case still running?",
        options: ["the dismissal was not legal", "the pay was fair", "the firm stayed"],
        answer: 0,
        explain: "„the case is still running because the dismissal was not legal.“",
      },
      {
        kind: "truefalse",
        text: "The lawyers use the mixed sentence.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The council uses the mixed one and the lawyers use the closed ones…“",
      },
      {
        kind: "gapfill",
        text: "If the severance pay had been fair, the town would be calm ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the severance pay had been fair, the town would be calm now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If the dismissal had been legal, the case would have ended.", "If the dismissal had been legal, the case would have ended"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "How is the agreement written?",
        options: [],
        answer: 0,
        accept: ["the present", "present", "entirely present"],
        explain: "„The agreement is written entirely in the present…“",
      },
    ],
  },
  {
    id: "en-b2-u15-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 15,
    title: "By the end of the decade",
    genre: "monologue",
    intro: "Öngörüde iki biçim. Hangisi geri getiriliyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "continuous", tr: "sürerli" },
      { de: "a forecast", tr: "öngörü" },
      { de: "a forecaster", tr: "öngören kişi" },
      { de: "quoted back", tr: "geri alıntılanan" },
      { de: "a column", tr: "sütun" },
      { de: "a draft", tr: "taslak" },
      { de: "a range", tr: "aralık" },
      { de: "produced", tr: "üreten" },
      { de: "cause", tr: "yol açmak" },
      { de: "published", tr: "yayımladı" },
      { de: "empty", tr: "boş" },
      { de: "watching", tr: "izlemek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Doruk", text: "By spring the upturn will have started. A point in time, a finished state, and no person in the sentence." },
      { speaker: "Doruk", text: "That is the right shape for a forecast, because a forecast is about the world and not about the forecaster." },
      { speaker: "Doruk", text: "Next year we will be watching the investment. Inside the work rather than after it, and honest: watching is what we do, not what we cause." },
      { speaker: "Doruk", text: "By then the market share will have doubled. The same four words again, and this is the sentence that gets quoted back at me." },
      { speaker: "Doruk", text: "A supply chain that was described in the future perfect two years ago is the reason I now keep a list of every such sentence I have published." },
      { speaker: "Doruk", text: "The list has a column for the evidence and a column for the date, and where the first column is empty the sentence goes out of the draft." },
      { speaker: "Doruk", text: "The stock market does not read the drafts and the job market does not either, but a workforce of two thousand does, and one of them will bring the page back." },
      { speaker: "Doruk", text: "So the economic climate gets a continuous form and a range, and the market share gets a perfect form only where I have the model that produced it." },
    ],
    questions: [
      {
        text: "What is a forecast about?",
        options: ["the world", "the forecaster", "the draft"],
        answer: 0,
        explain: "„a forecast is about the world and not about the forecaster.“",
      },
      {
        text: "What happens when the evidence column is empty?",
        options: ["the sentence goes out", "the date changes", "the column is filled"],
        answer: 0,
        explain: "„where the first column is empty the sentence goes out of the draft.“",
      },
      {
        kind: "truefalse",
        text: "Nobody brings the page back.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a workforce of two thousand does, and one of them will bring the page back.“",
      },
      {
        kind: "gapfill",
        text: "By spring the ___ will have started.",
        options: [],
        answer: 0,
        accept: ["upturn"],
        explain: "„By spring the upturn will have started.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By then the market share will have doubled.", "By then the market share will have doubled"],
        explain: "Gelecekte bir tarihten geriye bakış: „will have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does the economic climate get?",
        options: [],
        answer: 0,
        accept: ["a continuous form", "a range", "a form and a range"],
        explain: "„the economic climate gets a continuous form and a range…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u15-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 15,
    title: "On balance the figure is arguably questionable",
    genre: "opinion",
    intro: "Üç çekince ve bir olumsuz öbek.",
    gloss: [
      { de: "refusal", tr: "ret" },
      { de: "it seems to be", tr: "olduğu anlaşılıyor" },
      { de: "apparently", tr: "görünüşe göre" },
      { de: "on balance", tr: "sonuçta" },
      { de: "by no means", tr: "hiç de değil" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bunun bir genelleme olduğu anlaşılıyor.",
        answer: "It seems to be a generalization.",
        hint: "Tek çekince yeter; „seems“ işi yapıyor.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre iddia akla yatkın.",
        answer: "Apparently the claim is plausible.",
        hint: "Bildiriyor ve kaynağı üstlenmiyor.",
      },
      {
        kind: "build",
        tr: "Sonuçta rakam tartışmaya açık görünüyor.",
        answer: "On balance the figure is arguably questionable.",
        hint: "„on balance“ bir tartma yapıldığını söylüyor; „arguably“ hiçbir şey söylemiyor.",
      },
      {
        kind: "build",
        tr: "İddia hiç de kesinleşmiş değil.",
        answer: "The claim is by no means settled.",
        hint: "„by no means“ olumsuzluğu kendi içinde taşıyor; ikinci bir „not“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Çekince kartını doldur.",
        facts: "„by no means“ düpedüz ret; „questionable“ ağırlığı iddiaya koyuyor; „nonetheless“ ödün verip dönüyor; „in a sense“ küçük bir şeyi kabul ediyor.",
        fields: [
          { label: "Strongest", answer: "by no means", accept: ["a flat refusal"] },
          { label: "The weight", answer: "questionable", accept: ["on the claim"] },
          { label: "Concedes and turns", answer: "nonetheless", accept: ["turns"] },
          { label: "Softest", answer: "in a sense", accept: ["something small"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u15-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 15,
    title: "The draft law must have been unclear",
    genre: "info",
    intro: "Üç kip ve iki koşul. Hangisi bize dair?",
    gloss: [
      { de: "must have been unclear", tr: "belirsiz olmuş olmalı" },
      { de: "can't have read", tr: "okumuş olamaz" },
      { de: "should have funded", tr: "fonlamamız gerekirdi" },
      { de: "bankruptcy", tr: "iflas" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kanun tasarısı belirsiz olmuş olmalı.",
        answer: "The draft law must have been unclear.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "build",
        tr: "Yönetmeliği okumuş olamazlar.",
        answer: "They can't have read the regulation.",
        hint: "Olumsuzu „can't have“; „mustn't have“ yok.",
      },
      {
        kind: "build",
        tr: "Uygulatmayı fonlamamız gerekirdi.",
        answer: "We should have funded enforcement.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Firma iflastan kaçınsaydı kalırdık.",
        answer: "If the firm had avoided bankruptcy, we would have stayed.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Kıdem tazminatı adil olsaydı kasaba şimdi sakin olurdu.",
        answer: "If the severance pay had been fair, the town would be calm now.",
        hint: "Karışık koşul: sonuç bu sabahın sokağında.",
      },
    ],
  },
];
