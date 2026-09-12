import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 6 — "Dilekçe, aynı olay üç metinde, tanığın söyledikleri,
 * yerleşmiş hukuk kalıbı".
 *
 * Dört ders: The petition · The same event in three texts ·
 * What the witness said · The settled legal phrase.
 *
 *   Kelime: lodge, inadmissible, decree, acquittal, revocation,
 *           guardianship, enact, outvote, discretion.
 *   Kalıp:  We request that the office lodge the appeal. ·
 *           Were it not for the limitation period, the claim would stand. ·
 *           They ask that no document be inadmissible. ·
 *           A misdemeanor in one register is an administrative offense in another. ·
 *           Written as an administrative act, the same step reads colder. ·
 *           The acquittal becomes a sentence in the spoken register. ·
 *           She stated it; he conceded it; they alleged it. ·
 *           The expert report claims what the file assumes. ·
 *           To record a revocation is not to accept it. ·
 *           To enact a rule is not to enforce it. ·
 *           They outvote a group they cannot swear in. ·
 *           What a term of office grants, discretion can take.
 *
 * Ünitenin tek öğretme noktası „TO X IS TO Y“: İngilizce mastarı hiçbir
 * desteğe gerek duymadan ÖZNE yapabiliyor. Olumlu biçim bir özdeşlik
 * kuruyor, olumsuz biçim ise bir ÇIKARIMI reddediyor — olguları kabul
 * edip yalnız okurun atmak üzere olduğu adımı geri çeviriyor. Ünite 4'teki
 * öne çıkarma ile aynı alışkanlığın iki yüzü: ağır olan şey başa konuyor
 * ve okurun fiile kadar taşıması bekleniyor.
 */
export const enC1U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u06-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 6,
    title: "The settled legal phrase",
    genre: "info",
    intro: "Mastar özne olabiliyor. Olumsuz biçim neyi reddediyor?",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "natural", tr: "doğal" },
      { de: "asserts", tr: "ileri sürüyor" },
      { de: "academic", tr: "akademik" },
      { de: "object", tr: "nesne" },
      { de: "fourth", tr: "dördüncü" },
      { de: "construction", tr: "kuruluş" },
      { de: "pronoun", tr: "adıl" },
      { de: "phrasal", tr: "öbeksi" },
      { de: "underneath", tr: "altta" },
      { de: "an infinitive", tr: "mastar" },
      { de: "support", tr: "destek" },
      { de: "hold it up", tr: "ayakta tutmak" },
      { de: "in translation", tr: "çeviride" },
      { de: "affirmative", tr: "olumlu" },
      { de: "an identity", tr: "özdeşlik" },
      { de: "an inference", tr: "çıkarım" },
      { de: "refused", tr: "geri çevrilen" },
      { de: "characteristic", tr: "karakteristik" },
      { de: "a particle", tr: "parçacık" },
      { de: "stranded", tr: "arkada bırakılmış" },
      { de: "without comment", tr: "hiç ses çıkarmadan" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "trust", tr: "güven" },
      { de: "slowly", tr: "yavaşça" },
    ],
    minutes: 12,
    text:
      "To enact a rule is not to enforce it. Two infinitives, one on each side of „be“, and the sentence denies that the two things are the same.\n" +
      "English lets an infinitive be the subject of a sentence without any support. „To enact a rule“ stands at the front, carries the weight of a noun, and nothing has to be put in front of it to hold it up. That is not true of every language, and it is the reason this shape feels natural here and heavy in translation.\n" +
      "The affirmative version asserts an identity. „To resign oneself is to forfeit the argument“ says the two are one thing, and a reader who accepts the first half has accepted the second before noticing.\n" +
      "The negative version is the more useful of the two, and it is the characteristic sentence of a legal or an academic paragraph. It denies an inference without denying a fact. Everything before it can stand; only the step the reader was about to take is refused. To record a revocation is not to accept it. To report a claim is not to falsify it.\n" +
      "What a term of office grants, discretion can take. A different shape on the same page: the object has been fronted, and by now the fourth word tells you which construction you are in.\n" +
      "They outvote a group they cannot swear in. And here the relative pronoun has gone, which a choosing clause allows, and the phrasal verb has been left with its particle stranded at the end, which English does without comment and many languages cannot do at all.\n" +
      "Three shapes and one habit underneath them. Each of them puts something heavy at the front of the sentence and trusts the reader to carry it until the verb arrives. That trust is the register. A paragraph written this way is telling the reader that it expects to be read slowly, and a reader who is not going to read it slowly should be given a different paragraph.",
    questions: [
      {
        text: "What does English let an infinitive be?",
        options: ["the subject, without support", "an object only", "a verb"],
        answer: 0,
        explain: "„English lets an infinitive be the subject of a sentence without any support.“",
      },
      {
        text: "What does the negative version deny?",
        options: ["an inference", "a fact", "everything before it"],
        answer: 0,
        explain: "„It denies an inference without denying a fact.“",
      },
      {
        kind: "truefalse",
        text: "Every language can front an infinitive like this.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is not true of every language…“",
      },
      {
        kind: "gapfill",
        text: "To enact a rule is not to ___ it.",
        options: [],
        answer: 0,
        accept: ["enforce"],
        explain: "„To enact a rule is not to enforce it.“",
      },
      {
        kind: "order",
        text: "Üç biçimin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "To enact a rule is not to enforce it.",
          "What a term of office grants, discretion can take.",
          "They outvote a group they cannot swear in.",
          "Each puts something heavy at the front.",
        ],
        explain: "Mastar özne, öne çıkarılmış nesne, düşmüş adıl; en sonda ortak alışkanlık.",
      },
      {
        kind: "short_answer",
        text: "What is the trust?",
        options: [],
        answer: 0,
        accept: ["the register", "it is the register", "how it is read"],
        explain: "„That trust is the register.“",
      },
    ],
  },
  {
    id: "en-c1-u06-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 6,
    title: "The same event in three texts",
    genre: "opinion",
    intro: "Aynı olay, üç metin. Hangi olgular yolculuğa dayanıyor?",
    gloss: [
      { de: "whole", tr: "bütün" },
      { de: "middle", tr: "orta" },
      { de: "unit", tr: "ünite" },
      { de: "precise", tr: "kesin" },
      { de: "court", tr: "mahkeme" },
      { de: "verdict", tr: "hüküm" },
      { de: "acquitted", tr: "beraat etmiş" },
      { de: "spends", tr: "harcıyor" },
      { de: "practical", tr: "işe dönük" },
      { de: "cross", tr: "geçmek" },
      { de: "unchanged", tr: "değiştirilmeden" },
      { de: "a code", tr: "kanun" },
      { de: "a procedure", tr: "usul" },
      { de: "an item", tr: "kalem" },
      { de: "a corridor", tr: "koridor" },
      { de: "in his favour", tr: "lehine" },
      { de: "survive", tr: "sağ kalmak" },
      { de: "the outcome", tr: "sonuç" },
      { de: "the reasoning", tr: "gerekçe" },
      { de: "narrow", tr: "dar" },
      { de: "rewritten", tr: "yeniden yazılmış" },
      { de: "carried across", tr: "olduğu gibi taşınan" },
      { de: "at home", tr: "kendi yerinde" },
      { de: "colder", tr: "daha soğuk" },
    ],
    minutes: 12,
    text:
      "A misdemeanor in one register is an administrative offense in another. The same act, the same file, two words, and the second one has taken the person out of it.\n" +
      "That is the whole of this lesson and it is worth being slow about. „Misdemeanor“ has somebody in it: a person did a thing that has a name in the code. „Administrative offense“ has a procedure in it, and the person has become an item in one.\n" +
      "Written as an administrative act, the same step reads colder. Note the verb again: „reads“, middle voice, no reader named, and this unit has now used it twice because it is the only way to talk about how a text behaves.\n" +
      "The acquittal becomes a sentence in the spoken register. That one goes the other way. A word that is precise in a court becomes a word with a verdict attached in a corridor, and the man who was acquitted spends ten years explaining a term that had been in his favour.\n" +
      "So register here is not politeness and it is not style. It is which facts survive the move from one document to another, and the answer is never all of them.\n" +
      "What survives a move into the administrative register is the procedure. What survives a move into the spoken register is the outcome. Neither keeps the reasoning, and the reasoning was the part that took the court four days.\n" +
      "The practical consequence for a writer is narrow and hard. When a fact has to cross between registers, it has to be rewritten in each one rather than translated, and a sentence that has been carried across unchanged is almost always saying something it did not say at home.",
    questions: [
      {
        text: "What has the second word taken out?",
        options: ["the person", "the act", "the file"],
        answer: 0,
        explain: "„the second one has taken the person out of it.“",
      },
      {
        text: "What survives a move into the spoken register?",
        options: ["the outcome", "the procedure", "the reasoning"],
        answer: 0,
        explain: "„What survives a move into the spoken register is the outcome.“",
      },
      {
        kind: "truefalse",
        text: "The reasoning survives both moves.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Neither keeps the reasoning…“",
      },
      {
        kind: "gapfill",
        text: "Written as an administrative act, the same step reads ___.",
        options: [],
        answer: 0,
        accept: ["colder"],
        explain: "„Written as an administrative act, the same step reads colder.“",
      },
      {
        kind: "order",
        text: "Üç metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A misdemeanor in one register is an administrative offense in another.",
          "Written as an administrative act, the same step reads colder.",
          "The acquittal becomes a sentence in the spoken register.",
          "A fact has to be rewritten in each register.",
        ],
        explain: "İki sözcük, idari kayıt, konuşma dili; en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "How long did the reasoning take the court?",
        options: [],
        answer: 0,
        accept: ["four days", "4 days", "four"],
        explain: "„the reasoning was the part that took the court four days.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u06-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 6,
    title: "What the witness said",
    genre: "dialogue",
    intro: "Bir dosyada üç fiil. Hangisi yansız?",
    gloss: [
      { de: "neutral", tr: "yansız" },
      { de: "itself", tr: "kendisi" },
      { de: "verdict", tr: "hüküm" },
      { de: "deserves", tr: "hak ediyor" },
      { de: "infinitives", tr: "mastarlar" },
      { de: "deserve", tr: "hak etmek" },
      { de: "a record", tr: "kayıt" },
      { de: "a signal", tr: "işaret" },
      { de: "credible", tr: "inandırıcı" },
      { de: "a lawyer", tr: "avukat" },
      { de: "a page reference", tr: "sayfa göndermesi" },
      { de: "asserts", tr: "ileri sürüyor" },
      { de: "demonstrates", tr: "gösteriyor" },
      { de: "prevent", tr: "önlemek" },
      { de: "a reading", tr: "okuma" },
      { de: "an acceptance", tr: "kabul" },
      { de: "an adjective", tr: "sıfat" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Simge", text: "She stated it; he conceded it; they alleged it. Three verbs in one line of a file, and a reader who knows the scale learns more from them than from the three claims." },
      { speaker: "Volkan", text: "„Stated“ is the neutral one here." },
      { speaker: "Simge", text: "In a file it is. „Said“ is neutral in a newspaper and „stated“ is neutral in a record, and using the wrong neutral verb is itself a signal." },
      { speaker: "Volkan", text: "And „conceded“?" },
      { speaker: "Simge", text: "He did not want to say it. Which makes it more credible and also makes the file a document with an opinion in it, and that is the part a lawyer will read twice." },
      { speaker: "Volkan", text: "The expert report claims what the file assumes." },
      { speaker: "Simge", text: "That sentence is a verdict on two documents and I would not write it without a page reference for each." },
      { speaker: "Volkan", text: "Is „claims“ fair there?" },
      { speaker: "Simge", text: "It is fair if the report asserts something it does not show. If it shows it, „claims“ is a small act of damage and the report deserves „demonstrates“." },
      { speaker: "Volkan", text: "And the last line?" },
      { speaker: "Simge", text: "To record a revocation is not to accept it. Two infinitives, and it is in the file because somebody once read a record of a revocation as an acceptance of one." },
      { speaker: "Volkan", text: "So the sentence is there to prevent a reading." },
      { speaker: "Simge", text: "Most sentences in a file are there to prevent a reading. That is the difference between a record and a story, and it is why the verbs in a record are chosen more carefully than the adjectives." },
    ],
    questions: [
      {
        text: "Which verb is neutral in a record?",
        options: ["stated", "said", "alleged"],
        answer: 0,
        explain: "„„stated“ is neutral in a record…“",
      },
      {
        text: "What does the report deserve if it shows what it says?",
        options: ["demonstrates", "claims", "assumes"],
        answer: 0,
        explain: "„If it shows it, „claims“ is a small act of damage and the report deserves „demonstrates“.“",
      },
      {
        kind: "truefalse",
        text: "The adjectives in a record are chosen more carefully than the verbs.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the verbs in a record are chosen more carefully than the adjectives.“",
      },
      {
        kind: "gapfill",
        text: "She stated it; he ___ it; they alleged it.",
        options: [],
        answer: 0,
        accept: ["conceded"],
        explain: "„She stated it; he conceded it; they alleged it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The expert report claims what the file assumes.", "The expert report claims what the file assumes"],
        explain: "İki belge hakkında bir cümle ve ikisi hakkında bir hüküm.",
      },
      {
        kind: "short_answer",
        text: "What are most sentences in a file there to do?",
        options: [],
        answer: 0,
        accept: ["prevent a reading", "stop a reading", "block a reading"],
        explain: "„Most sentences in a file are there to prevent a reading.“",
      },
    ],
  },
  {
    id: "en-c1-u06-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 6,
    title: "The petition",
    genre: "monologue",
    intro: "Eksik bir harf belgenin türünü değiştiriyor. Sıra neden önemli?",
    gloss: [
      { de: "supposing", tr: "varsayarak" },
      { de: "whole", tr: "bütün" },
      { de: "appears", tr: "beliriyor" },
      { de: "a petition", tr: "dilekçe" },
      { de: "a request", tr: "talep" },
      { de: "asking", tr: "istemek" },
      { de: "a ground", tr: "dayanak" },
      { de: "considered", tr: "değerlendirilmiş" },
      { de: "in words", tr: "yazıyla" },
      { de: "repeats itself", tr: "kendini yineliyor" },
      { de: "a version", tr: "sürüm" },
      { de: "a report", tr: "rapor" },
      { de: "earn", tr: "hak etmek" },
      { de: "an order", tr: "sıra" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Zümrüt", text: "We request that the office lodge the appeal. „Lodge“, with no ending, and the sentence is a petition because of it." },
      { speaker: "Zümrüt", text: "This is the one place in English where a missing letter changes what a document is. „The office lodges the appeal“ is a report; „that the office lodge the appeal“ is a request." },
      { speaker: "Zümrüt", text: "They ask that no document be inadmissible. „Be“, not „is“, and the negative sits in the subject where this register prefers it." },
      { speaker: "Zümrüt", text: "Were it not for the limitation period, the claim would stand. The other half of the same mood, supposing rather than asking, and it is the sentence the whole petition is built to earn." },
      { speaker: "Zümrüt", text: "The order matters. Request first, ground last, and everything in between is dates." },
      { speaker: "Zümrüt", text: "A petition that puts the ground first reads as an argument, and an argument can be answered without the request ever being considered." },
      { speaker: "Zümrüt", text: "The cut-off period is the only number in the document that is written twice: once in the first paragraph and once in the last line, in words." },
      { speaker: "Zümrüt", text: "Everything else appears once. A document that repeats itself is a document somebody will read looking for the difference between the two versions." },
    ],
    questions: [
      {
        text: "What does the missing letter change?",
        options: ["what the document is", "the date", "the office"],
        answer: 0,
        explain: "„a missing letter changes what a document is.“",
      },
      {
        text: "What happens if the ground comes first?",
        options: ["it reads as an argument", "it reads as a request", "it is ignored"],
        answer: 0,
        explain: "„A petition that puts the ground first reads as an argument…“",
      },
      {
        kind: "truefalse",
        text: "Several numbers are written twice.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The cut-off period is the only number in the document that is written twice…“",
      },
      {
        kind: "gapfill",
        text: "They ask that no document ___ inadmissible.",
        options: [],
        answer: 0,
        accept: ["be"],
        explain: "„They ask that no document be inadmissible.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["We request that the office lodge the appeal.", "We request that the office lodge the appeal"],
        explain: "İstek kipi: „lodge“, „lodges“ değil.",
      },
      {
        kind: "short_answer",
        text: "What will a reader look for in a document that repeats itself?",
        options: [],
        answer: 0,
        accept: ["the difference", "a difference", "what changed"],
        explain: "„somebody will read looking for the difference between the two versions.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u06-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 6,
    title: "To enact a rule is not to enforce it",
    genre: "info",
    intro: "Mastar özne, öne çıkarılmış nesne, düşmüş adıl.",
    gloss: [
      { de: "identity", tr: "özdeşlik" },
      { de: "untouched", tr: "el değmemiş" },
      { de: "to enact", tr: "yürürlüğe koymak" },
      { de: "to enforce", tr: "uygulatmak" },
      { de: "discretion", tr: "takdir yetkisi" },
      { de: "swear in", tr: "yemin ettirmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bir kuralı yürürlüğe koymak onu uygulatmak değildir.",
        answer: "To enact a rule is not to enforce it.",
        hint: "Mastar özne olabiliyor; olumsuz biçim bir çıkarımı reddediyor.",
      },
      {
        kind: "build",
        tr: "Boyun eğmek tartışmayı yitirmektir.",
        answer: "To resign oneself is to forfeit the argument.",
        hint: "Olumlu biçim bir özdeşlik kuruyor.",
      },
      {
        kind: "build",
        tr: "Bir görev süresinin verdiğini takdir yetkisi alabilir.",
        answer: "What a term of office grants, discretion can take.",
        hint: "Öne çıkarılmış nesne; dördüncü sözcük „is“ değil.",
      },
      {
        kind: "build",
        tr: "Yemin ettiremedikleri bir grubu oylamada yeniyorlar.",
        answer: "They outvote a group they cannot swear in.",
        hint: "İlgi adılı düşmüş; parçacık sonda kalmış.",
      },
      {
        kind: "form",
        prompt: "Mastar kartını doldur.",
        facts: "Mastar desteksiz özne olabiliyor; olumlu biçim özdeşlik kuruyor; olumsuz biçim çıkarımı reddediyor; olgular ayakta kalıyor.",
        fields: [
          { label: "As a subject", answer: "no support needed", accept: ["it stands alone"] },
          { label: "Affirmative", answer: "an identity", accept: ["one thing"] },
          { label: "Negative", answer: "denies an inference", accept: ["the step"] },
          { label: "The facts", answer: "still stand", accept: ["untouched"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u06-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 6,
    title: "We request that the office lodge the appeal",
    genre: "info",
    intro: "Dilekçenin kipi ve iki dil düzeyi.",
    gloss: [
      { de: "lodge", tr: "sunmak" },
      { de: "inadmissible", tr: "kabul edilemez" },
      { de: "a misdemeanor", tr: "hafif suç" },
      { de: "an administrative act", tr: "idari işlem" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Büronun itirazı sunmasını talep ediyoruz.",
        answer: "We request that the office lodge the appeal.",
        hint: "İstek kipi: „lodge“, „lodges“ değil.",
      },
      {
        kind: "build",
        tr: "Hiçbir belgenin kabul edilemez olmamasını istiyorlar.",
        answer: "They ask that no document be inadmissible.",
        hint: "„be“ olduğu gibi kalıyor; olumsuz öznede.",
      },
      {
        kind: "build",
        tr: "Zamanaşımı olmasa talep ayakta kalırdı.",
        answer: "Were it not for the limitation period, the claim would stand.",
        hint: "Varsayım: dilekçenin dayanağı.",
      },
      {
        kind: "build",
        tr: "Bir kayıtta hafif suç olan, başka bir kayıtta kabahat.",
        answer: "A misdemeanor in one register is an administrative offense in another.",
        hint: "Aynı olay, iki sözcük, iki ayrı dünya.",
      },
      {
        kind: "build",
        tr: "İdari işlem olarak yazılınca aynı adım daha soğuk okunuyor.",
        answer: "Written as an administrative act, the same step reads colder.",
        hint: "Orta çatı: okuyan kimse adlandırılmıyor.",
      },
    ],
  },
];
