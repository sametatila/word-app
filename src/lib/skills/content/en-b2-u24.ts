import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 24 — "Gecikmenin nedeni, iş nasıl yürüyor, sorumlu
 * kişi, hiç bu kadar hızlı değildi".
 *
 * Dört ders: What caused the delay · How the work runs ·
 * The person responsible · Never so promptly.
 *
 *   Kelime: workflow, structure, relieve, arrangement, promptly, swiftly,
 *           unbroken, oblige, assure.
 *   Kalıp:  What caused the delay was a scheduling conflict. ·
 *           It was the deadline extension that saved us. ·
 *           What we lack is buffer time. ·
 *           Having read the interim report, we changed the plan. ·
 *           Asked to follow up, she wrote again. ·
 *           Wanting to carry out the test, they waited. ·
 *           My colleague, whose area of responsibility is wide, answered. ·
 *           The plan, which is a new arrangement, works. ·
 *           The division of tasks, which nobody read, is old. ·
 *           Never has an answer come so promptly. ·
 *           Rarely does a reply arrive so swiftly. ·
 *           Only after the third letter do they send a reminder.
 *
 * Ünitenin tek öğretme noktası VİRGÜLLÜ İLGİ CÜMLECİĞİNDE NESNE ADILI
 * DÜŞMÜYOR. B1 ünite 3 nesne konumundaki adılın düşebildiğini öğretmişti
 * („the report I sent“); burada sınırı geliyor: o düşme yalnız SEÇİM YAPAN
 * (virgülsüz) cümlecikte var. „The division of tasks, which nobody read,
 * is old“ cümlesinde „which“ nesne ama silinemiyor.
 */
export const enB2U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u24-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 24,
    title: "The person responsible",
    genre: "info",
    intro: "Nesne adılı bazen düşüyor, bazen düşmüyor. Sınır nerede?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "pronoun", tr: "adıl" },
      { de: "none", tr: "hiçbiri" },
      { de: "commas", tr: "virgüller" },
      { de: "picking", tr: "seçen" },
      { de: "noun", tr: "isim" },
      { de: "phrase", tr: "öbek" },
      { de: "dropping", tr: "düşüren" },
      { de: "an object", tr: "nesne" },
      { de: "dropped", tr: "düşürülmüş" },
      { de: "choosing", tr: "seçen" },
      { de: "extra", tr: "fazladan" },
      { de: "a limit", tr: "sınır" },
      { de: "possession", tr: "iyelik" },
      { de: "an arrangement", tr: "düzenleme" },
      { de: "closes", tr: "kapatıyor" },
      { de: "wide", tr: "geniş" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "silently", tr: "sessizce" },
      { de: "a rule with a hole", tr: "delikli kural" },
      { de: "finally", tr: "sonunda" },
    ],
    minutes: 9,
    text:
      "The division of tasks, which nobody read, is old. Look at „which“ in that sentence: it is the object of „read“, and two levels ago you learnt that an object pronoun can be dropped.\n" +
      "„The report I sent“ has no „which“ and needs none. So why can this one not lose it?\n" +
      "Because that rule had a limit nobody stated at the time. An object pronoun can be dropped only in a clause that is choosing — the kind without commas. „The report I sent“ is picking one report out of several.\n" +
      "This clause is not choosing. There is one division of tasks, the commas say so, and the clause is extra. In an extra clause the pronoun stays, whether it is subject or object, and whether it is „who“ or „which“.\n" +
      "The plan, which is a new arrangement, works. Same shape, and this one can lose two words for a different reason: „which is“ can go before a noun phrase.\n" +
      "My colleague, whose area of responsibility is wide, answered. „Whose“ carries possession and nothing goes.\n" +
      "So the rule with a hole in it finally closes. Drop the object pronoun where the clause chooses. Keep it everywhere else. A writer who has been dropping it by habit will now find one sentence a page where it was silently wrong.",
    questions: [
      {
        text: "When can the object pronoun be dropped?",
        options: ["in a clause that is choosing", "in a clause with commas", "always"],
        answer: 0,
        explain: "„An object pronoun can be dropped only in a clause that is choosing…“",
      },
      {
        text: "What happens in an extra clause?",
        options: ["the pronoun stays", "the pronoun goes", "the commas go"],
        answer: 0,
        explain: "„In an extra clause the pronoun stays, whether it is subject or object…“",
      },
      {
        kind: "truefalse",
        text: "„The report I sent“ names one report out of several.",
        options: ["True", "False"],
        answer: 0,
        explain: "„„The report I sent“ is picking one report out of several.“",
      },
      {
        kind: "gapfill",
        text: "The division of tasks, ___ nobody read, is old.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "„The division of tasks, which nobody read, is old.“",
      },
      {
        kind: "order",
        text: "Kuralın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The division of tasks, which nobody read, is old.",
          "The report I sent has no „which“.",
          "Drop it where the clause chooses.",
          "Keep it everywhere else.",
        ],
        explain: "Düşmeyen örnek, düşen örnek, sonra iki yarım kural.",
      },
      {
        kind: "short_answer",
        text: "What will a writer now find?",
        options: [],
        answer: 0,
        accept: ["one sentence a page", "a wrong sentence", "one mistake a page"],
        explain: "„will now find one sentence a page where it was silently wrong.“",
      },
    ],
  },
  {
    id: "en-b2-u24-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 24,
    title: "What caused the delay",
    genre: "opinion",
    intro: "Üç yarık cümle. Hangisi bir eksikliği adlandırıyor?",
    gloss: [
      { de: "assumed", tr: "varsaydı" },
      { de: "sentence", tr: "cümle" },
      { de: "plain", tr: "yalın" },
      { de: "specific", tr: "belirli" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "search", tr: "arayış" },
      { de: "dropped", tr: "düşürülmüş" },
      { de: "noun", tr: "isim" },
      { de: "per", tr: "başına" },
      { de: "clefts", tr: "yarık cümleler" },
      { de: "a scheduling conflict", tr: "program çakışması" },
      { de: "a deadline extension", tr: "süre uzatımı" },
      { de: "buffer time", tr: "yedek süre" },
      { de: "the light", tr: "ışık" },
      { de: "a candidate", tr: "aday" },
      { de: "an absence", tr: "yokluk" },
      { de: "lack", tr: "eksik olmak" },
      { de: "insisting", tr: "direten" },
      { de: "a workflow", tr: "iş akışı" },
      { de: "saved us", tr: "bizi kurtardı" },
      { de: "an admission", tr: "kabul" },
    ],
    minutes: 9,
    text:
      "What caused the delay was a scheduling conflict. Not the supplier, not the weather, not the thing everybody assumed: a scheduling conflict, and the shape of the sentence says that the list has been gone through.\n" +
      "The plain version is weaker in a specific way. „A scheduling conflict caused the delay“ is a sentence about the conflict. The cleft is a sentence about the search, and it tells the reader that the other candidates were looked at and dropped.\n" +
      "It was the deadline extension that saved us. The second shape, with the light on a noun, answering a question the room had already asked: something saved this, and here is which thing.\n" +
      "What we lack is buffer time. Now look at this one, because it is naming an absence rather than a cause. A plain sentence would be „we do not have enough buffer time“, and that reads as a complaint about resources.\n" +
      "„What we lack is buffer time“ reads as an admission, and an admission from the person writing the report is the only sentence in it that changes a workflow.\n" +
      "One per report. The shape is loud and a page of clefts is a page insisting, and a business process that has just failed does not need the grammar to raise its voice as well.\n" +
      "The need for action goes in the last line in a plain sentence, because that is the line somebody has to act on and nobody acts on a sentence that is performing.",
    questions: [
      {
        text: "What is the cleft a sentence about?",
        options: ["the search", "the conflict", "the weather"],
        answer: 0,
        explain: "„The cleft is a sentence about the search…“",
      },
      {
        text: "What does „What we lack is buffer time“ read as?",
        options: ["an admission", "a complaint", "a plan"],
        answer: 0,
        explain: "„„What we lack is buffer time“ reads as an admission…“",
      },
      {
        kind: "truefalse",
        text: "The need for action goes in a cleft.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The need for action goes in the last line in a plain sentence…“",
      },
      {
        kind: "gapfill",
        text: "What we lack is ___ time.",
        options: [],
        answer: 0,
        accept: ["buffer"],
        explain: "„What we lack is buffer time.“",
      },
      {
        kind: "order",
        text: "Raporun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What caused the delay was a scheduling conflict.",
          "It was the deadline extension that saved us.",
          "What we lack is buffer time.",
          "The need for action goes in a plain sentence.",
        ],
        explain: "Neden, kurtaran, eksik olan; en sonda yalın satır.",
      },
      {
        kind: "short_answer",
        text: "Which sentence changes a workflow?",
        options: [],
        answer: 0,
        accept: ["the admission", "the one about lack", "an admission"],
        explain: "„an admission from the person writing the report is the only sentence in it that changes a workflow.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u24-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 24,
    title: "How the work runs",
    genre: "dialogue",
    intro: "Üç ortaç bir iş akışında. Hangisi edilgen?",
    gloss: [
      { de: "compress", tr: "sıkıştırmak" },
      { de: "passive", tr: "edilgen" },
      { de: "sequence", tr: "sıra dizisi" },
      { de: "participles", tr: "ortaçlar" },
      { de: "sentences", tr: "cümleler" },
      { de: "unrelated", tr: "ilgisiz" },
      { de: "participle", tr: "ortaç" },
      { de: "belong", tr: "ait olmak" },
      { de: "an interim report", tr: "ara rapor" },
      { de: "follow up", tr: "geri dönüş yapmak" },
      { de: "carry out", tr: "yürütmek" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "a package", tr: "paket" },
      { de: "a step", tr: "adım" },
      { de: "preparatory", tr: "hazırlık" },
      { de: "one after another", tr: "arka arkaya" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ege", text: "Having read the interim report, we changed the plan. The reading came first and no conjunction is saying so." },
      { speaker: "Zehra Nur", text: "Why compress it?" },
      { speaker: "Ege", text: "Because a work package has eleven lines and four of them are dates. Every „after we had“ is three words that could have been a fact." },
      { speaker: "Zehra Nur", text: "The second one is passive." },
      { speaker: "Ege", text: "Asked to follow up, she wrote again. Short for „having been asked“, and English throws those two words away without losing anything." },
      { speaker: "Zehra Nur", text: "And the third?" },
      { speaker: "Ege", text: "Wanting to carry out the test, they waited. Active, a state, and a reason: they waited because they wanted to run it properly." },
      { speaker: "Zehra Nur", text: "Three in one paragraph is a lot." },
      { speaker: "Ege", text: "It is, and here it is right, because the paragraph is a sequence. Three steps one after another, and the participles are what makes them read as steps." },
      { speaker: "Zehra Nur", text: "Where would it go wrong?" },
      { speaker: "Ege", text: "In the preparatory work section, where the sentences are not a sequence. Three participles there would tell the reader that four unrelated things happened in order." },
      { speaker: "Zehra Nur", text: "So the shape carries a claim." },
      { speaker: "Ege", text: "The shape carries a claim, and that is the part people forget. A participle does not only save words; it says these two things belong together." },
    ],
    questions: [
      {
        text: "Why does Ege compress it?",
        options: ["the package has eleven lines", "it sounds better", "the plan changed"],
        answer: 0,
        explain: "„Because a work package has eleven lines and four of them are dates.“",
      },
      {
        text: "Where would three participles go wrong?",
        options: ["in the preparatory work section", "in the sequence", "in the dates"],
        answer: 0,
        explain: "„In the preparatory work section, where the sentences are not a sequence.“",
      },
      {
        kind: "truefalse",
        text: "A participle does more than save words.",
        options: ["True", "False"],
        answer: 0,
        explain: "„A participle does not only save words; it says these two things belong together.“",
      },
      {
        kind: "gapfill",
        text: "___ to follow up, she wrote again.",
        options: [],
        answer: 0,
        accept: ["Asked", "asked"],
        explain: "„Asked to follow up, she wrote again.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Having read the interim report, we changed the plan.", "Having read the interim report, we changed the plan"],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does the shape carry?",
        options: [],
        answer: 0,
        accept: ["a claim", "it carries a claim", "an order"],
        explain: "„The shape carries a claim…“",
      },
    ],
  },
  {
    id: "en-b2-u24-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 24,
    title: "Never so promptly",
    genre: "monologue",
    intro: "Devrik sıra bir şikâyet mektubunda. Ne kazandırıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "ironic", tr: "ironik" },
      { de: "sentences", tr: "cümleler" },
      { de: "plain", tr: "yalın" },
      { de: "entirely", tr: "tümüyle" },
      { de: "anger", tr: "öfke" },
      { de: "middle", tr: "orta" },
      { de: "relationship", tr: "ilişki" },
      { de: "either", tr: "ikisinden biri" },
      { de: "rewrote", tr: "yeniden yazdı" },
      { de: "promptly", tr: "derhal" },
      { de: "swiftly", tr: "çabucak" },
      { de: "a reminder", tr: "hatırlatma" },
      { de: "an ending", tr: "ek" },
      { de: "irony", tr: "ironi" },
      { de: "sincere", tr: "içten" },
      { de: "a complaint", tr: "şikâyet" },
      { de: "read as", tr: "şöyle okunuyor" },
      { de: "assure", tr: "güvence vermek" },
      { de: "unbroken", tr: "kesintisiz" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Alp", text: "Never has an answer come so promptly. „Has“ in front of the subject, and it is the first line of a letter about a reply that took nine weeks." },
      { speaker: "Alp", text: "So it is irony, and irony in this shape is a risk: the sentence is also a perfectly good sincere sentence." },
      { speaker: "Alp", text: "Rarely does a reply arrive so swiftly. The same again in the present, so „does“ arrives and „arrive“ loses its ending." },
      { speaker: "Alp", text: "Only after the third letter do they send a reminder. That one is not irony at all; it is a fact with a number in it." },
      { speaker: "Alp", text: "And that is why it works. Two ironic sentences and one plain one, and the plain one is the sentence that can be answered." },
      { speaker: "Alp", text: "A complaint written entirely in irony is read as anger, and anger in a letter is answered by a form." },
      { speaker: "Alp", text: "So the irony is in the first two lines, the facts are in the middle, and the last paragraph asks for one thing and assures them of the unbroken business relationship." },
      { speaker: "Alp", text: "That last sentence is not irony either, and it is the one I rewrote four times." },
    ],
    questions: [
      {
        text: "How long did the reply take?",
        options: ["nine weeks", "three letters", "one day"],
        answer: 0,
        explain: "„a letter about a reply that took nine weeks.“",
      },
      {
        text: "Which sentence can be answered?",
        options: ["the plain one", "the first one", "the ironic one"],
        answer: 0,
        explain: "„the plain one is the sentence that can be answered.“",
      },
      {
        kind: "truefalse",
        text: "A complaint written entirely in irony gets a good answer.",
        options: ["True", "False"],
        answer: 1,
        explain: "„anger in a letter is answered by a form.“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ a reply arrive so swiftly.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Rarely does a reply arrive so swiftly.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Only after the third letter do they send a reminder.", "Only after the third letter do they send a reminder"],
        explain: "„only“ sınırlama; „does“ ve „do“ aynı işi görüyor.",
      },
      {
        kind: "short_answer",
        text: "Which line did Alp write four times?",
        options: [],
        answer: 0,
        accept: ["the last one", "the closing line", "the one about the relationship"],
        explain: "„That last sentence is not irony either, and it is the one I rewrote four times.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u24-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 24,
    title: "The division of tasks, which nobody read, is old",
    genre: "info",
    intro: "Üç ilgi cümlesi. Hangisinden ne düşüyor?",
    gloss: [
      { de: "drop", tr: "düşürmek" },
      { de: "noun", tr: "isim" },
      { de: "phrase", tr: "öbek" },
      { de: "possession", tr: "iyelik" },
      { de: "which nobody read", tr: "kimsenin okumadığı" },
      { de: "which is", tr: "olan" },
      { de: "whose area", tr: "alanı olan" },
      { de: "what caused", tr: "neden olan şey" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kimsenin okumadığı görev dağılımı eski.",
        answer: "The division of tasks, which nobody read, is old.",
        hint: "Virgüllü cümlecikte nesne adılı düşmüyor.",
      },
      {
        kind: "build",
        tr: "Yeni bir düzenleme olan plan işe yarıyor.",
        answer: "The plan, which is a new arrangement, works.",
        hint: "Burada „which is“ silinebilir: arkasında isim öbeği var.",
      },
      {
        kind: "build",
        tr: "Sorumluluk alanı geniş olan meslektaşım yanıtladı.",
        answer: "My colleague, whose area of responsibility is wide, answered.",
        hint: "„whose“ iyelik taşıyor; hiçbir şey düşmüyor.",
      },
      {
        kind: "build",
        tr: "Gecikmeye yol açan şey bir program çakışmasıydı.",
        answer: "What caused the delay was a scheduling conflict.",
        hint: "Yarık cümle: liste gözden geçirilmiş demek.",
      },
      {
        kind: "form",
        prompt: "Adıl kartını doldur.",
        facts: "Seçim yapan cümlecikte nesne adılı düşüyor; virgüllü cümlecikte düşmüyor; „which is“ isim öbeğinden önce silinebiliyor; „whose“ hiç silinmiyor.",
        fields: [
          { label: "Choosing", answer: "drop it", accept: ["the report I sent"] },
          { label: "Extra", answer: "keep it", accept: ["which nobody read"] },
          { label: "„which is“", answer: "can go", accept: ["before a noun phrase"] },
          { label: "„whose“", answer: "stays", accept: ["possession"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u24-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 24,
    title: "Never has an answer come so promptly",
    genre: "opinion",
    intro: "Üç devrik cümle ve iki ortaç.",
    gloss: [
      { de: "so promptly", tr: "bu kadar derhal" },
      { de: "so swiftly", tr: "bu kadar çabuk" },
      { de: "a reminder", tr: "hatırlatma" },
      { de: "asked to follow up", tr: "geri dönüş istenince" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir yanıt hiç bu kadar çabuk gelmedi.",
        answer: "Never has an answer come so promptly.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir yanıt nadiren bu kadar hızlı ulaşır.",
        answer: "Rarely does a reply arrive so swiftly.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Ancak üçüncü mektuptan sonra hatırlatma gönderiyorlar.",
        answer: "Only after the third letter do they send a reminder.",
        hint: "„only“ sınırlama; „do“ taşıyor.",
      },
      {
        kind: "build",
        tr: "Ara raporu okuduktan sonra planı değiştirdik.",
        answer: "Having read the interim report, we changed the plan.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Geri dönüş yapması istenince yeniden yazdı.",
        answer: "Asked to follow up, she wrote again.",
        hint: "Edilgen ortaç: „having been“ düşüyor.",
      },
    ],
  },
];
