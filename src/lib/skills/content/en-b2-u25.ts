import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 25 — "Sözleşme kapanırken, yanıtlanan şikâyet, teklif
 * tutsaydı, kapanış satırı". Seviyenin kapanış ünitesi.
 *
 * Dört ders: When the contract closes · The complaint answered ·
 * If the offer had held · The closing line.
 *
 *   Kelime: contractual, misleading, deceive, chargeable, overpriced,
 *           redeem, voucher, retail, in view of, provided that,
 *           make clear, lay out, casually.
 *   Kalıp:  By March we will have signed the supplementary agreement. ·
 *           Next month we will be checking the price adjustment. ·
 *           By then the remaining amount will have been paid. ·
 *           The advert must have been misleading. ·
 *           They can't have meant to deceive us. ·
 *           We should have kept the proof of purchase. ·
 *           If the voucher had arrived, we would have ordered. ·
 *           If the rate plan had been clear, the base fee would be lower now. ·
 *           If the insurance coverage had been wider, we would have claimed. ·
 *           It seems to be settled, in view of your letter. ·
 *           Apparently we can close this, provided that the file is complete. ·
 *           On balance I would arguably make clear one last point.
 *
 * Ünitenin öğretme noktası „PROVIDED THAT“: koşulun üçüncü biçimi ve „if“
 * ile aynı şey değil — „if“ bir durumu betimliyor, „provided that“ bir
 * ŞART KOYUYOR. Yanında „in view of“ duruyor: geriye bakan, masadaki bir
 * şeye dayanan neden.
 *
 * Ünite aynı zamanda SEVİYENİN KAPANIŞ İPİNİ söylüyor: B2 yeni bir zaman
 * öğretmedi. Öğrettiği on yapının her biri KİMİN GÖRÜNECEĞİNE dair bir
 * karar — edilgen faili gizliyor, adlaştırma kişiyi gizliyor, yarık cümle
 * okuru yönlendiriyor, çekince kaynak olmayı reddediyor, devrik sıra sesi
 * yükseltiyor, ortaç iki şeyin birbirine ait olduğunu söylüyor, aktarma
 * fiili kanıtı derecelendiriyor.
 */
export const enB2U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u25-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 25,
    title: "The closing line",
    genre: "opinion",
    intro: "Şart koymak ile durumu betimlemek. Ve seviyenin kendi ipi.",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "units", tr: "üniteler" },
      { de: "actually", tr: "aslında" },
      { de: "passive", tr: "edilgen" },
      { de: "nominalisation", tr: "adlaştırma" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "hedge", tr: "çekince" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "participle", tr: "ortaç" },
      { de: "belong", tr: "ait olmak" },
      { de: "verb", tr: "fiil" },
      { de: "tense", tr: "zaman kipi" },
      { de: "settled", tr: "kapanmış" },
      { de: "in view of", tr: "göz önüne alındığında" },
      { de: "provided that", tr: "şartıyla" },
      { de: "a condition", tr: "koşul" },
      { de: "requiring", tr: "talep eden" },
      { de: "backwards", tr: "geriye" },
      { de: "a negotiation", tr: "pazarlık" },
      { de: "hides", tr: "gizliyor" },
      { de: "the doer", tr: "eyleyen" },
      { de: "declines", tr: "reddediyor" },
      { de: "grades", tr: "derecelendiriyor" },
      { de: "visible", tr: "görünür" },
      { de: "a position", tr: "konum" },
      { de: "disappears", tr: "kayboluyor" },
      { de: "willing", tr: "istekli" },
      { de: "a briefing", tr: "bilgilendirme" },
    ],
    minutes: 10,
    text:
      "It seems to be settled, in view of your letter. Apparently we can close this, provided that the file is complete. On balance I would arguably make clear one last point.\n" +
      "Two of those three are old friends by now. The third has a word in it this course has not used: „provided that“.\n" +
      "„Provided that“ is a condition and it is not „if“. „If the file is complete, we can close this“ describes a situation. „Provided that the file is complete“ sets a condition — it is something I am requiring, and the difference is who is speaking.\n" +
      "„In view of“ does the opposite job. It gives a reason and it points backwards, at something already on the table: your letter. A sentence can hold both, and then it is a whole negotiation in twenty words.\n" +
      "There is something larger to say here, at the end of a level. Look at what these twenty-five units have actually taught.\n" +
      "The passive that hides the doer. The nominalisation that hides the person. The cleft that tells the reader where to look. The hedge that declines to be the source. The inversion that raises the voice. The participle that says two things belong together. The reporting verb that grades the evidence.\n" +
      "Not one of those is a new tense. Every one of them is a decision about who is visible, and B2 is the level where the grammar stops being about time and starts being about position.\n" +
      "So the last thing to say is the thing that has been true since the first briefing. Before choosing a shape, ask who disappears when you use it, and whether you would be willing to say their name.",
    questions: [
      {
        text: "What does „provided that“ do?",
        options: ["sets a condition", "describes a situation", "gives a reason"],
        answer: 0,
        explain: "„„Provided that the file is complete“ sets a condition…“",
      },
      {
        text: "Which way does „in view of“ point?",
        options: ["backwards", "forwards", "at nothing"],
        answer: 0,
        explain: "„It gives a reason and it points backwards…“",
      },
      {
        kind: "truefalse",
        text: "This level taught no new tense.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not one of those is a new tense.“",
      },
      {
        kind: "gapfill",
        text: "We can close this, ___ that the file is complete.",
        options: [],
        answer: 0,
        accept: ["provided"],
        explain: "„we can close this, provided that the file is complete.“",
      },
      {
        kind: "order",
        text: "Kapanışın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It seems to be settled, in view of your letter.",
          "We can close this, provided that the file is complete.",
          "Every one of them is a decision about who is visible.",
          "Ask who disappears when you use it.",
        ],
        explain: "Neden, şart, seviyenin ipi, en sonda tek soru.",
      },
      {
        kind: "short_answer",
        text: "What should you ask before choosing a shape?",
        options: [],
        answer: 0,
        accept: ["who disappears", "who is hidden", "who goes"],
        explain: "„ask who disappears when you use it…“",
      },
    ],
  },
  {
    id: "en-b2-u25-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 25,
    title: "The complaint answered",
    genre: "info",
    intro: "Üç kip bir şikâyette. Hangisi kişiyle yanıtlanıyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "none", tr: "hiçbiri" },
      { de: "sentence", tr: "cümle" },
      { de: "explanation", tr: "açıklama" },
      { de: "contains", tr: "içeriyor" },
      { de: "adjective", tr: "sıfat" },
      { de: "easily", tr: "kolayca" },
      { de: "whole", tr: "bütün" },
      { de: "sentences", tr: "cümleler" },
      { de: "an advert", tr: "ilan" },
      { de: "an accusation", tr: "suçlama" },
      { de: "a customer", tr: "müşteri" },
      { de: "refunded", tr: "parayı iade etti" },
      { de: "corrected", tr: "düzeltti" },
      { de: "the complainant", tr: "şikâyet eden" },
      { de: "a judgement", tr: "yargı" },
      { de: "issued", tr: "düzenlenen" },
      { de: "a credit note", tr: "alacak dekontu" },
      { de: "a request", tr: "istek" },
      { de: "an apology", tr: "özür" },
      { de: "free", tr: "bedava" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "proof of purchase", tr: "satın alma belgesi" },
    ],
    minutes: 9,
    text:
      "The advert must have been misleading. Four words of verb, and none of them is an accusation.\n" +
      "„Must have been“ reads the evidence. Three customers wrote the same sentence in the same week without knowing each other, and one explanation survives that.\n" +
      "They can't have meant to deceive us. The negative, and note why the strong form is here: the evidence really is strong. The company corrected the page within a day and refunded without being asked.\n" +
      "We should have kept the proof of purchase. The third form, about us, and it is the only line in the letter anybody will remember, which is exactly why it goes in.\n" +
      "A complaint that contains no sentence about the complainant is answered by a form. A complaint that contains one is answered by a person, and that is worth more than any adjective in the first paragraph.\n" +
      "The words that do not help are the ones that come easily: overpriced, chargeable, the whole list. Each of them is a judgement and none of them is a fact, and a credit note is issued on facts.\n" +
      "So the letter has three sentences of evidence, one sentence about us, and one request. The request is for a credit note and not for an apology, because an apology is free and a credit note is on a page somebody has to sign.",
    questions: [
      {
        text: "Why is the strong negative used?",
        options: ["the evidence is strong", "the writer is angry", "it is shorter"],
        answer: 0,
        explain: "„note why the strong form is here: the evidence really is strong.“",
      },
      {
        text: "How is a complaint with no sentence about the complainant answered?",
        options: ["by a form", "by a person", "by a credit note"],
        answer: 0,
        explain: "„A complaint that contains no sentence about the complainant is answered by a form.“",
      },
      {
        kind: "truefalse",
        text: "The letter asks for an apology.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The request is for a credit note and not for an apology…“",
      },
      {
        kind: "gapfill",
        text: "We should have kept the proof of ___.",
        options: [],
        answer: 0,
        accept: ["purchase"],
        explain: "„We should have kept the proof of purchase.“",
      },
      {
        kind: "order",
        text: "Şikâyetin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The advert must have been misleading.",
          "They can't have meant to deceive us.",
          "We should have kept the proof of purchase.",
          "The request is for a credit note.",
        ],
        explain: "Kanıt, dışarıda bıraktığı, kendi payımız; en sonda istek.",
      },
      {
        kind: "short_answer",
        text: "What is a credit note issued on?",
        options: [],
        answer: 0,
        accept: ["facts", "on facts", "not judgements"],
        explain: "„a credit note is issued on facts.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u25-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 25,
    title: "If the offer had held",
    genre: "dialogue",
    intro: "Üç koşul, bir fatura. Hangisi bir şey istiyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "middle", tr: "orta" },
      { de: "conditional", tr: "koşul cümlesi" },
      { de: "a voucher", tr: "hediye çeki" },
      { de: "closed", tr: "kapalı" },
      { de: "a rate plan", tr: "tarife" },
      { de: "a base fee", tr: "sabit ücret" },
      { de: "a bill", tr: "fatura" },
      { de: "claimed", tr: "talepte bulundu" },
      { de: "the window", tr: "süre penceresi" },
      { de: "shut", tr: "kapandı" },
      { de: "a preference", tr: "tercih" },
      { de: "a grievance", tr: "yakınma" },
      { de: "mixed", tr: "karışık" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Tuana", text: "If the voucher had arrived, we would have ordered. Closed on both sides: it did not arrive and we did not order." },
      { speaker: "Uras", text: "Nothing to do there." },
      { speaker: "Tuana", text: "Nothing to do there, and it is still the first sentence in every one of these letters, because it is the one that feels true." },
      { speaker: "Uras", text: "The second?" },
      { speaker: "Tuana", text: "If the rate plan had been clear, the base fee would be lower now. The cause is finished and the fee is on this month's bill." },
      { speaker: "Uras", text: "Mixed." },
      { speaker: "Tuana", text: "Mixed, and it is the only sentence in the letter that asks for anything. A bill that is wrong today can be changed today." },
      { speaker: "Uras", text: "And the third?" },
      { speaker: "Tuana", text: "If the insurance coverage had been wider, we would have claimed. Closed, and correctly: the claim was never made and the window has shut." },
      { speaker: "Uras", text: "Do you keep it?" },
      { speaker: "Tuana", text: "I keep it, in the middle, because it explains why the second sentence matters. Without it the base fee looks like a small complaint." },
      { speaker: "Uras", text: "And the product range?" },
      { speaker: "Tuana", text: "The product range goes nowhere near a conditional. It is a preference, and a preference in this shape reads as a grievance." },
    ],
    questions: [
      {
        text: "Which sentence asks for something?",
        options: ["the mixed one", "the first one", "the third one"],
        answer: 0,
        explain: "„it is the only sentence in the letter that asks for anything.“",
      },
      {
        text: "Why keep the third sentence?",
        options: ["it explains the second", "it is the strongest", "it is the shortest"],
        answer: 0,
        explain: "„because it explains why the second sentence matters.“",
      },
      {
        kind: "truefalse",
        text: "The product range goes nowhere near a conditional.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The product range goes nowhere near a conditional.“",
      },
      {
        kind: "gapfill",
        text: "If the rate plan had been clear, the base fee would be lower ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the rate plan had been clear, the base fee would be lower now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If the voucher had arrived, we would have ordered.", "If the voucher had arrived, we would have ordered"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "How does a preference in that shape read?",
        options: [],
        answer: 0,
        accept: ["as a grievance", "a grievance", "like a complaint"],
        explain: "„a preference in this shape reads as a grievance.“",
      },
    ],
  },
  {
    id: "en-b2-u25-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 25,
    title: "When the contract closes",
    genre: "monologue",
    intro: "Tek edilgen. Neden orada duruyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "passive", tr: "edilgen" },
      { de: "a supplementary agreement", tr: "ek anlaşma" },
      { de: "a price adjustment", tr: "fiyat ayarlaması" },
      { de: "the remaining amount", tr: "kalan tutar" },
      { de: "a state", tr: "durum" },
      { de: "the hand", tr: "el" },
      { de: "a department", tr: "birim" },
      { de: "genuinely", tr: "gerçekten" },
      { de: "hiding", tr: "gizleyen" },
      { de: "a covering letter", tr: "üst yazı" },
      { de: "compares", tr: "karşılaştıran" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Defne", text: "By March we will have signed the supplementary agreement. A point in time, a finished state, and nobody named as the person signing." },
      { speaker: "Defne", text: "In a contract note that is right, because the thing that matters is the state and not the hand." },
      { speaker: "Defne", text: "Next month we will be checking the price adjustment. Inside the work rather than after it, and honest: checking is what we will be doing for three weeks." },
      { speaker: "Defne", text: "By then the remaining amount will have been paid. Four words of verb — will, have, been, third form — and it is the only passive on the page." },
      { speaker: "Defne", text: "It is passive because I do not know who pays it. The department has changed twice this year and the answer is genuinely not in my hands." },
      { speaker: "Defne", text: "That is the honest use of the shape, and it has a test. If I could name the person and chose not to, the passive is hiding somebody." },
      { speaker: "Defne", text: "Here I cannot name them, so it stays. And in the covering letter, where the person is known, the same fact is written with a name in it." },
      { speaker: "Defne", text: "Two pages, one fact, two shapes, and a reader who compares them learns more about us than about the payment." },
    ],
    questions: [
      {
        text: "What matters in a contract note?",
        options: ["the state", "the hand", "the date"],
        answer: 0,
        explain: "„the thing that matters is the state and not the hand.“",
      },
      {
        text: "Why is that line passive?",
        options: ["she does not know who pays", "it is shorter", "it is formal"],
        answer: 0,
        explain: "„It is passive because I do not know who pays it.“",
      },
      {
        kind: "truefalse",
        text: "The covering letter uses the same passive.",
        options: ["True", "False"],
        answer: 1,
        explain: "„in the covering letter, where the person is known, the same fact is written with a name in it.“",
      },
      {
        kind: "gapfill",
        text: "By then the remaining amount will have been ___.",
        options: [],
        answer: 0,
        accept: ["paid"],
        explain: "„By then the remaining amount will have been paid.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By March we will have signed the supplementary agreement.", "By March we will have signed the supplementary agreement"],
        explain: "Gelecekte bir tarihten geriye bakış: bitmiş bir durum.",
      },
      {
        kind: "short_answer",
        text: "What does a reader who compares the pages learn about?",
        options: [],
        answer: 0,
        accept: ["about us", "us", "the people"],
        explain: "„a reader who compares them learns more about us than about the payment.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u25-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 25,
    title: "It seems to be settled, in view of your letter",
    genre: "opinion",
    intro: "Bir neden, bir şart, bir çekince.",
    gloss: [
      { de: "disappears", tr: "yok oluyor" },
      { de: "in view of", tr: "göz önüne alındığında" },
      { de: "provided that", tr: "şartıyla" },
      { de: "make clear", tr: "açıkça belirtmek" },
      { de: "misleading", tr: "yanıltıcı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Mektubunuz göz önüne alındığında konu kapanmış görünüyor.",
        answer: "It seems to be settled, in view of your letter.",
        hint: "„in view of“ geriye bakan bir neden veriyor.",
      },
      {
        kind: "build",
        tr: "Dosya tam olmak şartıyla bunu kapatabiliriz.",
        answer: "Apparently we can close this, provided that the file is complete.",
        hint: "„provided that“ bir şart koyuyor; „if“ yalnızca durumu betimliyor.",
      },
      {
        kind: "build",
        tr: "Sonuçta son bir noktayı açıkça belirtirdim.",
        answer: "On balance I would arguably make clear one last point.",
        hint: "İki çekince; söylediği olan „on balance“.",
      },
      {
        kind: "build",
        tr: "İlan yanıltıcı olmuş olmalı.",
        answer: "The advert must have been misleading.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Kapanış kartını doldur.",
        facts: "„in view of“ geriye bakıyor; „provided that“ şart koyuyor; „if“ durumu betimliyor; seviyenin sorusu kimin kaybolduğu.",
        fields: [
          { label: "A reason", answer: "in view of", accept: ["your letter"] },
          { label: "A condition", answer: "provided that", accept: ["the file"] },
          { label: "Plain „if“", answer: "describes", accept: ["a situation"] },
          { label: "The question", answer: "who disappears", accept: ["who is hidden"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u25-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 25,
    title: "The advert must have been misleading",
    genre: "info",
    intro: "İki kip, iki koşul ve bir takvim.",
    gloss: [
      { de: "can't have meant", tr: "amaçlamış olamaz" },
      { de: "should have kept", tr: "saklamamız gerekirdi" },
      { de: "would have ordered", tr: "sipariş verirdik" },
      { de: "would be lower", tr: "daha düşük olurdu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bizi kandırmayı amaçlamış olamazlar.",
        answer: "They can't have meant to deceive us.",
        hint: "Sert olumsuz: kanıt güçlü olduğu için.",
      },
      {
        kind: "build",
        tr: "Satın alma belgesini saklamamız gerekirdi.",
        answer: "We should have kept the proof of purchase.",
        hint: "Kendi payımız; mektupta hatırlanan tek satır.",
      },
      {
        kind: "build",
        tr: "Hediye çeki gelseydi sipariş verirdik.",
        answer: "If the voucher had arrived, we would have ordered.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Tarife açık olsaydı sabit ücret şimdi daha düşük olurdu.",
        answer: "If the rate plan had been clear, the base fee would be lower now.",
        hint: "Karışık koşul: sonuç bu ayın faturasında.",
      },
      {
        kind: "build",
        tr: "Marta kadar ek anlaşmayı imzalamış olacağız.",
        answer: "By March we will have signed the supplementary agreement.",
        hint: "Gelecekte bir tarihten geriye bakış.",
      },
    ],
  },
];
