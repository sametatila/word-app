import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 1 — "Aynı şey üç dil düzeyinde, eksilterek söylemek,
 * ağırlık sonda, resmî talep".
 *
 * Dört ders: The same thing in three registers · Leaving it out ·
 * Weight at the end · The formal request.
 *
 *   Kelime: salutation, cordial, verbatim, journalistic, convey,
 *           discourse, argumentation, coherence, subjectivity,
 *           plausibility, construe, connotation, essayist, allusion,
 *           denotation, subtext, allegory, aphorism, polemic, convene,
 *           adjourn, exert, admonish, consolidate.
 *   Kalıp:  The salutation alone sets the register. ·
 *           A cordial note and a matter-of-fact note say the same thing. ·
 *           Quoted verbatim, the line reads differently. ·
 *           I would if I could, and so would she. ·
 *           Some call it discourse; others, argumentation. ·
 *           The first reading is careful; the second is not. ·
 *           Into the sentence creeps a connotation. ·
 *           What the essayist does next is an allusion. ·
 *           The denotation we know; the subtext we guess. ·
 *           I insist that the board convene tomorrow. ·
 *           Were it not for her firm chairing, we would adjourn. ·
 *           They ask that no one exert pressure.
 *
 * Ünitenin tek öğretme noktası İSTEK KİPİ (subjunctive). „I insist that
 * the board convene tomorrow“ — üçüncü kişide ek yok, „should“ yok,
 * olumsuzu „do“ olmadan kuruluyor, „be“ „be“ olarak kalıyor. İngilizcede
 * bu kipten geriye iki kalıntı var: talep kuran bu biçim ve „were it not
 * for“daki varsayım. Biri istiyor, öteki varsayıyor.
 */
export const enC1U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u01-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 1,
    title: "A letter from Linden House",
    genre: "letter",
    intro: "Kiracı komitesinin şirket yönetimine yazdığı resmî mektup. Sakinler tam olarak ne istiyor?",
    gloss: [
      { de: "attend", tr: "katılmak" },
      { de: "propose", tr: "önermek" },
      { de: "a lawyer", tr: "avukat" },
      { de: "a misunderstanding", tr: "yanlış anlaşılma" },
      { de: "merely", tr: "yalnızca" },
      { de: "extraordinary", tr: "olağanüstü" },
      { de: "unanimously", tr: "oy birliğiyle" },
      { de: "a household", tr: "hane" },
      { de: "on behalf of", tr: "adına" },
      { de: "proposed", tr: "önerilen" },
      { de: "a boiler", tr: "kazan" },
    ],
    minutes: 11,
    text:
      "To: The Board of Directors, Northside Housing Company\n" +
      "From: The Residents' Committee, Linden House\n" +
      "Subject: Heating, repairs and the proposed rent increase\n" +
      "Dear Members of the Board,\n" +
      "We are writing on behalf of the 146 households of Linden House. At our meeting on February 3, the residents voted unanimously on three requests, which we set out below.\n" +
      "First, we request that the board convene an extraordinary meeting before the end of the month. Last winter the heating failed eleven times, and several older residents spent nights in their coats. We insist that the central boiler be replaced before October, not merely repaired again.\n" +
      "Second, it is essential that every tenant be informed in writing of the planned works, including the dates on which water or electricity will be cut. Notices on the front door are not enough; some residents rarely leave their apartments.\n" +
      "Third, we recommend that the company not raise the rent until the repairs are complete. A rent increase announced in the same letter as another delay would, we believe, damage trust that has taken years to build.\n" +
      "We also ask that no one exert pressure on tenants who have joined this committee. Two members have told us that they were warned about their contracts after speaking at our meeting. We would prefer to believe that this was a misunderstanding.\n" +
      "Were it not for the patience of our residents, this dispute would already be in the hands of lawyers. We would rather settle it at a table. We therefore propose that a representative of the committee attend the next board meeting, and we request a written reply by March 1.\n" +
      "Yours sincerely,\n" +
      "Hande Aksoy, Chair, Linden House Residents' Committee",
    questions: [
      {
        text: "What do the residents want done about the boiler?",
        options: ["It should be replaced before October.", "It should be repaired again.", "It should be switched off in summer."],
        answer: 0,
        explain: "„We insist that the central boiler be replaced before October, not merely repaired again.“",
      },
      {
        text: "Why are notices on the front door not enough?",
        options: ["Some residents rarely leave their apartments.", "The door is often locked.", "The notices are in the wrong language."],
        answer: 0,
        explain: "„Notices on the front door are not enough; some residents rarely leave their apartments.“",
      },
      {
        kind: "truefalse",
        text: "The committee wants the rent to stay the same until the repairs are finished.",
        options: ["True", "False"],
        answer: 0,
        explain: "„we recommend that the company not raise the rent until the repairs are complete.“",
      },
      {
        kind: "gapfill",
        text: "We also ask that no one ___ pressure on tenants who have joined this committee.",
        options: [],
        answer: 0,
        accept: ["exert"],
        explain: "„We also ask that no one exert pressure on tenants who have joined this committee.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The residents voted on three requests.",
          "The board should convene an extraordinary meeting.",
          "No one should exert pressure on committee members.",
          "The committee wants a written reply by March 1.",
        ],
        explain: "Oylama, üç talep, baskı uyarısı, en sonda yanıt için son tarih.",
      },
      {
        kind: "short_answer",
        text: "How many times did the heating fail last winter?",
        options: [],
        answer: 0,
        accept: ["eleven times", "eleven", "11 times", "11"],
        explain: "„Last winter the heating failed eleven times…“",
      },
    ],
  },
  {
    id: "en-c1-u01-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 1,
    title: "Essays from a rented garden",
    genre: "review",
    intro: "Bir deneme kitabı üzerine eleştiri yazısı. Eleştirmen kitabın en çok hangi yanını beğeniyor?",
    gloss: [
      { de: "directly", tr: "doğrudan" },
      { de: "history", tr: "tarih" },
      { de: "clever", tr: "zekice" },
      { de: "a packet", tr: "paket" },
      { de: "simply", tr: "sadece" },
      { de: "readable", tr: "kolay okunan" },
      { de: "lightness", tr: "hafiflik" },
      { de: "humor", tr: "mizah" },
      { de: "a bean", tr: "fasulye" },
      { de: "a fence", tr: "çit" },
      { de: "die", tr: "ölmek" },
      { de: "an essay", tr: "deneme" },
      { de: "fourth", tr: "dördüncü" },
      { de: "a seed", tr: "tohum" },
    ],
    minutes: 11,
    text:
      "BOOK REVIEW: The Quiet Plot, by Leyla Arman\n" +
      "Few books arrive with less noise than this one. Arman's fourth collection of essays is about a small garden behind a rented house in Ankara, and for the first forty pages it seems to be about nothing else.\n" +
      "Then, somewhere in the third essay, the tone changes. Into her careful notes on tomatoes and rain creeps a connotation of loss: the garden, we learn, belonged to her mother, and the house will soon be sold.\n" +
      "What the essayist does next is an allusion rather than an announcement. She never tells us that her mother has died. Instead she describes an empty chair by the fence, and the subtext does the rest.\n" +
      "Most moving are the pieces about neighbors. Beside the garden lives an old man who has grown the same beans for fifty years, and on him rests much of the book's quiet humor. Less successful is the long essay on climate change, which turns briefly into a polemic and loses the lightness that makes the rest so readable.\n" +
      "Some readers will take the whole collection as an allegory of a country losing its memory; others, simply as a book about a garden. Arman does not settle the question, and she is right not to.\n" +
      "The book ends with a short aphorism written on a seed packet: 'What you plant, you do not own.' It is the kind of line that could have sounded clever. Here, after two hundred pages of patient attention, it sounds earned.\n" +
      "Rarely does a collection this modest stay with a reader this long. Recommended, especially for anyone who has ever had to leave a place they cared for.\n" +
      "The Quiet Plot is published by Mavi Press (212 pages, $18).",
    questions: [
      {
        text: "What does the book seem to be about at first?",
        options: ["a small garden behind a rented house", "a journey across Turkey", "the history of farming"],
        answer: 0,
        explain: "„…is about a small garden behind a rented house in Ankara, and for the first forty pages it seems to be about nothing else.“",
      },
      {
        text: "How does the writer show that her mother has died?",
        options: ["She describes an empty chair.", "She says it directly.", "She quotes a letter from her mother."],
        answer: 0,
        explain: "„Instead she describes an empty chair by the fence, and the subtext does the rest.“",
      },
      {
        kind: "truefalse",
        text: "The reviewer thinks the essay on climate change is the best in the book.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Less successful is the long essay on climate change, which turns briefly into a polemic…“",
      },
      {
        kind: "gapfill",
        text: "Into her careful notes on tomatoes and rain creeps a connotation of ___.",
        options: [],
        answer: 0,
        accept: ["loss"],
        explain: "„Into her careful notes on tomatoes and rain creeps a connotation of loss…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The tone changes in the third essay.",
          "The essayist describes an empty chair.",
          "An old neighbor grows the same beans.",
          "The book ends with a line on a seed packet.",
        ],
        explain: "Tonun değişmesi, boş sandalye, komşular, en sonda tohum paketindeki söz.",
      },
      {
        kind: "short_answer",
        text: "Who has grown the same beans for fifty years?",
        options: [],
        answer: 0,
        accept: ["an old man", "the old man", "an old neighbor", "the neighbor"],
        explain: "„Beside the garden lives an old man who has grown the same beans for fifty years…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u01-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 1,
    title: "A reply in the local paper",
    genre: "dialogue",
    intro: "Şirketin bir müşteriye yazdığı yanıt gazetede çıkmış. Ekip şimdi ne yapacak?",
    gloss: [
      { de: "appear", tr: "yayımlanmak" },
      { de: "a lawyer", tr: "avukat" },
      { de: "a technician", tr: "teknisyen" },
      { de: "heartless", tr: "kalpsiz" },
      { de: "an inconvenience", tr: "rahatsızlık" },
      { de: "verbatim", tr: "kelimesi kelimesine" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Eylül", text: "Have you seen the paper this morning? Our reply to Mrs. Demir is on page three." },
      { speaker: "Sinan", text: "Our reply? The one about the broken elevator?" },
      { speaker: "Eylül", text: "That one. Quoted verbatim, the line reads differently. „We regret any inconvenience this may have caused.“ Printed next to a photo of her on the stairs, it sounds heartless." },
      { speaker: "Sinan", text: "Who sent it to the paper?" },
      { speaker: "Eylül", text: "She did, and I do not blame her. Written in a hurry on a Friday, the letter did not even use her name. The salutation was just „Dear Customer“." },
      { speaker: "Sinan", text: "So what do we do now? Apologize in public?" },
      { speaker: "Eylül", text: "First we call her. Then we send a proper letter, cordial rather than matter-of-fact, and signed by the director, not by the service team." },
      { speaker: "Sinan", text: "And the elevator?" },
      { speaker: "Eylül", text: "Repaired yesterday, according to the technicians. Before we say so in public, I want someone to check it in person." },
      { speaker: "Sinan", text: "I can go this afternoon. Anything else?" },
      { speaker: "Eylül", text: "The journalist wants a statement by five. Kept short and honest, it can convey that we got it wrong without sounding as if a lawyer wrote it." },
      { speaker: "Sinan", text: "I will draft it and send it to you by three." },
      { speaker: "Eylül", text: "Thank you. And from now on, nothing leaves this office addressed to „Dear Customer“." },
    ],
    questions: [
      {
        text: "Where did the reply to Mrs. Demir appear?",
        options: ["in the newspaper", "on the radio", "on the company website"],
        answer: 0,
        explain: "„Our reply to Mrs. Demir is on page three.“",
      },
      {
        text: "Who will sign the new letter?",
        options: ["the director", "the service team", "Sinan"],
        answer: 0,
        explain: "„…and signed by the director, not by the service team.“",
      },
      {
        kind: "truefalse",
        text: "The first letter did not use Mrs. Demir's name.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Written in a hurry on a Friday, the letter did not even use her name.“",
      },
      {
        kind: "gapfill",
        text: "The journalist wants a statement by ___.",
        options: [],
        answer: 0,
        accept: ["five", "5"],
        explain: "„The journalist wants a statement by five.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Quoted verbatim, the line reads differently.", "Quoted verbatim, the line reads differently"],
        explain: "Edilgen ortaç: aktarma bağlamı değiştiriyor.",
      },
      {
        kind: "short_answer",
        text: "When will Sinan send the draft?",
        options: [],
        answer: 0,
        accept: ["by three", "at three", "three", "by 3"],
        explain: "„I will draft it and send it to you by three.“",
      },
    ],
  },
  {
    id: "en-c1-u01-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 1,
    title: "The Eastside library branch",
    genre: "monologue",
    intro: "Yerel radyoda bir kütüphane şubesinin geleceği. Masada hangi iki plan var?",
    gloss: [
      { de: "a librarian", tr: "kütüphaneci" },
      { de: "a pensioner", tr: "emekli" },
      { de: "a roof", tr: "çatı" },
      { de: "a closure", tr: "kapatılma" },
      { de: "a branch", tr: "şube" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Bilge", text: "Good morning, and welcome to City Hour. Today: the Eastside library branch, which may close in June." },
      { speaker: "Bilge", text: "Some call the closure a saving; others, a loss. The council says the branch costs four hundred thousand dollars a year to run." },
      { speaker: "Bilge", text: "The mayor would keep it open if she could, and so would most of the council. The problem is the building, which needs a new roof." },
      { speaker: "Bilge", text: "Two plans are on the table. The first is cheap; the second is not." },
      { speaker: "Bilge", text: "The cheap plan moves the books to the school next door. The children would lose a quiet room; the pensioners, their newspapers." },
      { speaker: "Bilge", text: "The expensive plan repairs the roof and opens the branch on Sundays. Volunteers have offered to staff it, and local shops have too." },
      { speaker: "Bilge", text: "I asked the head librarian which plan she prefers. She said she would choose the second if the council would, and I believe her." },
      { speaker: "Bilge", text: "The council votes on Thursday. If you want your view heard, the meeting is open to the public, and so is the online survey." },
      { speaker: "Bilge", text: "That is all for today. Tomorrow: why the number 12 bus is always late." },
    ],
    questions: [
      {
        text: "Why might the branch close?",
        options: ["The building needs a new roof.", "Nobody uses it.", "The librarian is leaving."],
        answer: 0,
        explain: "„The problem is the building, which needs a new roof.“",
      },
      {
        text: "Who has offered to staff the branch on Sundays?",
        options: ["volunteers and local shops", "the pensioners", "the school next door"],
        answer: 0,
        explain: "„Volunteers have offered to staff it, and local shops have too.“",
      },
      {
        kind: "truefalse",
        text: "The mayor wants to close the branch.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The mayor would keep it open if she could, and so would most of the council.“",
      },
      {
        kind: "gapfill",
        text: "The council votes on ___.",
        options: [],
        answer: 0,
        accept: ["Thursday"],
        explain: "„The council votes on Thursday.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The first is cheap; the second is not.", "The first is cheap; the second is not"],
        explain: "Eksik olan „cheap“; iki yarı aynı biçimde kurulmuş.",
      },
      {
        kind: "short_answer",
        text: "How much does the branch cost a year?",
        options: [],
        answer: 0,
        accept: ["four hundred thousand dollars", "400,000 dollars", "$400,000", "400000 dollars"],
        explain: "„The council says the branch costs four hundred thousand dollars a year to run.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u01-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 1,
    title: "Requests to the board",
    genre: "info",
    intro: "Kiracıların şirket yönetiminden talepleri: cümleler ve bir not kartı.",
    gloss: [
      { de: "convene", tr: "toplanmak" },
      { de: "exert", tr: "baskı uygulamak" },
      { de: "were it not for", tr: "olmasaydı" },
      { de: "the salutation", tr: "hitap" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kurulun yarın toplanmasında ısrar ediyorum.",
        answer: "I insist that the board convene tomorrow.",
        hint: "İstek kipi: üçüncü kişide ek yok.",
      },
      {
        kind: "build",
        tr: "Kimsenin baskı uygulamamasını istiyorlar.",
        answer: "They ask that no one exert pressure.",
        hint: "Yine ek yok; aynı küçük fiil listesinden sonra.",
      },
      {
        kind: "build",
        tr: "Onun sıkı oturum başkanlığı olmasaydı ara verirdik.",
        answer: "Were it not for her firm chairing, we would adjourn.",
        hint: "Aynı kipin öteki kalıntısı: „if“siz koşul.",
      },
      {
        kind: "build",
        tr: "Hitap tek başına dil düzeyini belirliyor.",
        answer: "The salutation alone sets the register.",
        hint: "Tek sözcük bütün mektubun tonunu kuruyor.",
      },
      {
        kind: "form",
        prompt: "Kiracı komitesinin talepleri için not kartını doldur.",
        facts: "Komite, kurulun ay sonundan önce toplanmasını istiyor; ısıtma kazanının ekimden önce değiştirilmesinde ısrar ediyor; onarımlar bitene kadar kiranın artırılmamasını öneriyor; yazılı yanıtı 1 Mart'a kadar bekliyor.",
        fields: [
          { label: "Board meeting", answer: "that the board convene", accept: ["the board should convene", "before the end of the month"] },
          { label: "Heating", answer: "that it be replaced", accept: ["replaced before October", "it should be replaced"] },
          { label: "Rent", answer: "that it not be raised", accept: ["not raised", "no increase"] },
          { label: "Written reply", answer: "by March 1", accept: ["March 1", "by 1 March"] },
        ],
      },

    ],
  },
  {
    id: "en-c1-u01-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 1,
    title: "Notes on an essayist",
    genre: "opinion",
    intro: "Bir deneme yazarı üzerine okuma notları.",
    gloss: [
      { de: "the denotation", tr: "düz anlam" },
      { de: "the subtext", tr: "alt metin" },
      { de: "a connotation", tr: "yan anlam" },
      { de: "an allusion", tr: "gönderme" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Düz anlamı biliriz; alt metni tahmin ederiz.",
        answer: "The denotation we know; the subtext we guess.",
        hint: "Nesne öne çıkıyor ama özne ile fiil yer değiştirmiyor.",
      },
      {
        kind: "build",
        tr: "Cümleye bir yan anlam sızıyor.",
        answer: "Into the sentence creeps a connotation.",
        hint: "Eski bilgi başta, yeni bilgi sonda.",
      },
      {
        kind: "build",
        tr: "Deneme yazarının bundan sonra yaptığı şey bir gönderme.",
        answer: "What the essayist does next is an allusion.",
        hint: "Yarık cümle: ağırlık sona kayıyor.",
      },
      {
        kind: "build",
        tr: "Yapabilseydim yapardım, o da öyle.",
        answer: "I would if I could, and so would she.",
        hint: "Eksiltme: okur eksik olanı geri koyabiliyor.",
      },
      {
        kind: "build",
        tr: "Kimi buna söylem der; kimi, gerekçelendirme.",
        answer: "Some call it discourse; others, argumentation.",
        hint: "Virgül fiilin yerini tutuyor.",
      },
    ],
  },
];
