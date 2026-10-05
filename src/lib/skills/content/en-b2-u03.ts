import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 3 — "Resmî açılış, dikkatli söylemek, talep, sorunun
 * kendisi".
 *
 * Dört ders: Opening a formal talk · Saying it carefully · The claim ·
 * What the issue is.
 *
 *   Kelime: pleasure, moderate, assemble, introduction, speech, applause,
 *           opening, participate, apparently, admittedly, rather,
 *           nevertheless, presumably, roughly, hence, accordingly,
 *           supplier, damages, liability, dispute, remedy, correspondence,
 *           attachment, compensate, contest, threshold, unacceptable,
 *           acceptable, satisfactory, sufficient, minimal, demand.
 *   Kalıp:  Rarely have I had such a pleasure. ·
 *           Not only did she moderate, she also spoke. ·
 *           Never before has this group assembled here. ·
 *           Apparently the figures have changed. ·
 *           Admittedly, the plan is rather slow. ·
 *           The cost is high; nevertheless, we continue. ·
 *           It is claimed that the supplier was late. ·
 *           The damages are said to be small. ·
 *           Liability is thought to rest with us. ·
 *           What we contest is the delay. ·
 *           It was the threshold that changed. ·
 *           What is unacceptable is the silence.
 *
 * Ünitenin tek öğretme noktası DEVRİK SIRA ÇOK DAR BİR KAPI. Olumsuz ya
 * da sınırlayıcı bir zarf öne geçince yardımcı fiil özneden ÖNE geliyor
 * („Rarely have I …“), taşınacak yardımcı fiil yoksa „do“ bunun için
 * geliyor. Başka HİÇBİR öğe öne geçtiğinde sıra değişmiyor: „Yesterday I
 * spoke to her“ olduğu gibi kalıyor.
 */
export const enB2U03: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u03-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 3,
    title: "The library's fiftieth birthday",
    genre: "formal",
    intro: "Belediye başkanının kütüphanenin ellinci yılı için yaptığı açılış konuşması. Kütüphane neler yaşadı?",
    gloss: [
      { de: "a generation", tr: "kuşak" },
      { de: "a roof", tr: "çatı" },
      { de: "a wing", tr: "kanat" },
      { de: "fiftieth", tr: "ellinci" },
      { de: "lend", tr: "ödünç vermek" },
      { de: "a typing course", tr: "daktilo kursu" },
      { de: "a pandemic", tr: "salgın" },
      { de: "a librarian", tr: "kütüphaneci" },
    ],
    minutes: 9,
    text:
      "Welcome speech by Mayor Elena Brooks at the fiftieth birthday of the city library\n" +
      "Good evening, and thank you all for coming.\n" +
      "Rarely have I had such a pleasure as tonight. Never before has this hall been so full, and never before have so many generations assembled under one roof: children from the reading club, students who study here every afternoon, and some of the people who opened this library fifty years ago.\n" +
      "When the library opened in 1976, it had four rooms and eleven thousand books. Not only did it lend books, it also offered the first free typing course in the city. Seldom has a public building changed so many lives with so little money.\n" +
      "The last fifty years have not always been easy. Twice the library nearly closed. Only when hundreds of families signed a letter to the council did the city agree to keep it open. Not once, however, did the staff stop working. They moderated reading groups, they taught people to use the internet, and during the pandemic they delivered books by bicycle.\n" +
      "Tonight is also about the future. Next year the library will open a new wing for young people, with study rooms, a small recording studio and longer opening hours. Never again will students have to leave at six because the building closes.\n" +
      "Many of you have participated in the planning, and I want to thank you for that. Your ideas are in every room of the new wing.\n" +
      "Now, before the applause starts and the music begins, I will keep my introduction short. Please welcome our head librarian, Maria Lopez, who has worked here for thirty-one years.",
    questions: [
      {
        text: "How many rooms did the library have in 1976?",
        options: ["four", "eleven", "fifty"],
        answer: 0,
        explain: "„When the library opened in 1976, it had four rooms and eleven thousand books.“",
      },
      {
        text: "What made the city keep the library open?",
        options: ["a letter signed by hundreds of families", "a new mayor", "money from the students"],
        answer: 0,
        explain: "„Only when hundreds of families signed a letter to the council did the city agree to keep it open.“",
      },
      {
        kind: "truefalse",
        text: "During the pandemic, the staff delivered books by bicycle.",
        options: ["True", "False"],
        answer: 0,
        explain: "„during the pandemic they delivered books by bicycle.“",
      },
      {
        kind: "gapfill",
        text: "Not only did it lend books, it also offered the first free ___ course in the city.",
        options: [],
        answer: 0,
        accept: ["typing"],
        explain: "„Not only did it lend books, it also offered the first free typing course in the city.“",
      },
      {
        kind: "order",
        text: "Açılışın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The hall has never been so full.",
          "The library opened with four rooms.",
          "The library nearly closed twice.",
          "A new wing will open next year.",
        ],
        explain: "Konuşma bugünden başlıyor, geçmişe dönüyor, zor yılları anlatıyor, en sonda geleceğe bakıyor.",
      },
      {
        kind: "short_answer",
        text: "Who speaks after the mayor?",
        options: [],
        answer: 0,
        accept: ["Maria Lopez", "the head librarian", "Maria"],
        explain: "„Please welcome our head librarian, Maria Lopez, who has worked here for thirty-one years.“",
      },
    ],
  },
  {
    id: "en-b2-u03-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 3,
    title: "A letter about a late supplier",
    genre: "letter",
    intro: "Geciken bir tedarikçiye yazılmış resmî mektup. Şirket ne talep ediyor?",
    gloss: [
      { de: "equipment", tr: "ekipman" },
      { de: "a drawing", tr: "çizim" },
      { de: "approval", tr: "onay" },
      { de: "shipping", tr: "nakliye" },
      { de: "a warehouse", tr: "depo" },
      { de: "the fall", tr: "sonbahar" },
      { de: "settle", tr: "çözmek" },
      { de: "a lawyer", tr: "avukat" },
      { de: "propose", tr: "önermek" },
    ],
    minutes: 9,
    text:
      "Dear Mr. Novak,\n" +
      "Order 4471: delivery of kitchen equipment\n" +
      "Thank you for your letter of 3 October. We have now reviewed the correspondence and the attachment you sent, and I would like to set out our position.\n" +
      "It is claimed in your letter that the delay was caused by our late approval of the drawings. Our records show that the drawings were approved on 12 August, two days before the date in the contract. The shipping company is said to have confirmed that the goods left your warehouse on 29 September, almost four weeks after the agreed date.\n" +
      "The damages are said to be small on your side, and we accept that no equipment was broken. On our side, however, the delay meant that our new restaurant opened ten days late. The loss of income is thought to be about 9,000 euros.\n" +
      "We understand that liability is thought to rest with us by your legal team. We do not share that view. It is widely reported that several of your customers had similar delays this fall, which suggests that the problem was not our drawings.\n" +
      "We would prefer to settle this without lawyers. As a remedy, we propose that you compensate us for half of the loss, 4,500 euros, and that the rest is taken off our next order.\n" +
      "Please reply by 31 October. If we do not hear from you by then, we will pass the matter to our legal department.\n" +
      "Yours sincerely,\n" +
      "Ana Ribeiro, Purchasing Manager",
    questions: [
      {
        text: "What is claimed in the supplier's letter?",
        options: ["The delay was caused by late approval of the drawings.", "Some equipment was broken.", "The restaurant opened late."],
        answer: 0,
        explain: "„It is claimed in your letter that the delay was caused by our late approval of the drawings.“",
      },
      {
        text: "When were the drawings approved?",
        options: ["on 12 August", "on 29 September", "on 3 October"],
        answer: 0,
        explain: "„Our records show that the drawings were approved on 12 August, two days before the date in the contract.“",
      },
      {
        kind: "truefalse",
        text: "Some of the equipment arrived broken.",
        options: ["True", "False"],
        answer: 1,
        explain: "„we accept that no equipment was broken.“",
      },
      {
        kind: "gapfill",
        text: "The loss of income is thought to be about ___ euros.",
        options: [],
        answer: 0,
        accept: ["9,000", "9000"],
        explain: "„The loss of income is thought to be about 9,000 euros.“",
      },
      {
        kind: "order",
        text: "Mektubun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The drawings were approved on 12 August.",
          "The restaurant opened ten days late.",
          "Other customers had similar delays.",
          "Please reply by 31 October.",
        ],
        explain: "Olgular, zarar, karşı kanıt, en sonda son tarih.",
      },
      {
        kind: "short_answer",
        text: "How much does Ana ask the supplier to pay?",
        options: [],
        answer: 0,
        accept: ["4,500 euros", "4500 euros", "half of the loss", "4,500"],
        explain: "„we propose that you compensate us for half of the loss, 4,500 euros…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u03-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 3,
    title: "Last-minute changes to the figures",
    genre: "dialogue",
    intro: "Yönetim kurulu toplantısından hemen önce iki meslektaş. Rakamlarda ne değişti?",
    gloss: [
      { de: "the board", tr: "yönetim kurulu" },
      { de: "import", tr: "içe aktarmak" },
      { de: "finance", tr: "finans" },
      { de: "growth", tr: "büyüme" },
      { de: "a campaign", tr: "kampanya" },
      { de: "a slide", tr: "slayt" },
      { de: "own", tr: "kendi" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Liam", text: "Have you seen the email from finance? Apparently the figures have changed again." },
      { speaker: "Fay", text: "Again? The board meets at two. What changed this time?" },
      { speaker: "Liam", text: "Roughly ten percent of the sales from last month were counted twice. Presumably somebody imported the same file two times." },
      { speaker: "Fay", text: "So our growth is smaller than we said." },
      { speaker: "Liam", text: "Much smaller. Admittedly, the plan was rather slow from the start. Nevertheless, we told the board it was working." },
      { speaker: "Fay", text: "Then we have to tell them the truth, and we have to tell them before finance does." },
      { speaker: "Liam", text: "Agreed. The mistake is ours; hence the correction should come from us as well." },
      { speaker: "Fay", text: "What about the marketing budget? We asked for more money because of those figures." },
      { speaker: "Liam", text: "Accordingly, I think we should drop that request for now and bring it back in June." },
      { speaker: "Fay", text: "That will hurt. But we continue with the campaign?" },
      { speaker: "Liam", text: "Yes, with the money we already have. Apparently the new ads are working, and that part of the story is still true." },
      { speaker: "Fay", text: "Fine. Can you update the slides? I will call the chair and warn her." },
      { speaker: "Liam", text: "Give me twenty minutes." },
    ],
    questions: [
      {
        text: "What happened to the sales from last month?",
        options: ["Roughly ten percent were counted twice.", "They were ten percent higher.", "Finance lost the file."],
        answer: 0,
        explain: "„Roughly ten percent of the sales from last month were counted twice.“",
      },
      {
        text: "When does the board meet?",
        options: ["at two", "in June", "in twenty minutes"],
        answer: 0,
        explain: "„The board meets at two.“",
      },
      {
        kind: "truefalse",
        text: "Liam wants the correction to come from their own team.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The mistake is ours; hence the correction should come from us as well.“",
      },
      {
        kind: "gapfill",
        text: "Admittedly, the plan was rather ___ from the start.",
        options: [],
        answer: 0,
        accept: ["slow"],
        explain: "„Admittedly, the plan was rather slow from the start.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Apparently the figures have changed again.", "Apparently the figures have changed again"],
        explain: "Bildiriyor ve aynı anda geri çekiliyor.",
      },
      {
        kind: "short_answer",
        text: "Who will Fay call?",
        options: [],
        answer: 0,
        accept: ["the chair", "the chair of the board", "her"],
        explain: "„I will call the chair and warn her.“",
      },
    ],
  },
  {
    id: "en-b2-u03-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 3,
    title: "A message to the software supplier",
    genre: "monologue",
    intro: "Bir matbaa yöneticisinin yazılım tedarikçisine bıraktığı sesli mesaj. Asıl itiraz ne?",
    gloss: [
      { de: "a print shop", tr: "matbaa" },
      { de: "a feature", tr: "özellik" },
      { de: "software", tr: "yazılım" },
      { de: "certain", tr: "belli" },
      { de: "exist", tr: "var olmak" },
      { de: "a lawyer", tr: "avukat" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Jason", text: "Hello, this is the manager at Delta Printing, calling about our software contract. I have written to you four times, so I will be brief and clear." },
      { speaker: "Jason", text: "What we contest is the delay. Not the price and not the new features. The update you promised for March still has not arrived." },
      { speaker: "Jason", text: "You wrote last month that the contract only covers updates above a certain size. It was the threshold that changed, not our needs. Last year that threshold did not exist." },
      { speaker: "Jason", text: "What is unacceptable is the silence. Three weeks, four letters from us, and not a single reply from your team." },
      { speaker: "Jason", text: "Our print shop runs on this software. Every day without the update, two of our machines work at half speed, and our customers notice." },
      { speaker: "Jason", text: "What I am asking for is small. I need a date. Not a discount yet, and not an apology. Just a date for the update." },
      { speaker: "Jason", text: "If a date is acceptable to you as well, please call me back before Friday. My number is on every one of the four letters." },
      { speaker: "Jason", text: "What we contest is the delay, and I hope we can solve it together, without lawyers." },
    ],
    questions: [
      {
        text: "What does the caller contest?",
        options: ["the delay", "the price", "the new features"],
        answer: 0,
        explain: "„What we contest is the delay.“",
      },
      {
        text: "What happens every day without the update?",
        options: ["Two machines work at half speed.", "The shop closes early.", "Customers get a discount."],
        answer: 0,
        explain: "„Every day without the update, two of our machines work at half speed, and our customers notice.“",
      },
      {
        kind: "truefalse",
        text: "The supplier has replied to one of the four letters.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Three weeks, four letters from us, and not a single reply from your team.“",
      },
      {
        kind: "gapfill",
        text: "It was the ___ that changed, not our needs.",
        options: [],
        answer: 0,
        accept: ["threshold"],
        explain: "„It was the threshold that changed, not our needs.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What is unacceptable is the silence.", "What is unacceptable is the silence"],
        explain: "Yarık cümle bu kez bir yokluğu adlandırıyor.",
      },
      {
        kind: "short_answer",
        text: "What is the caller asking for?",
        options: [],
        answer: 0,
        accept: ["a date", "a date for the update", "just a date"],
        explain: "„I need a date.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u03-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 3,
    title: "Speaking at a session",
    genre: "opinion",
    intro: "Bir oturumu açacak konuşmacı için açılış notlarını hazırla.",
    gloss: [
      { de: "rarely", tr: "nadiren" },
      { de: "not only", tr: "yalnızca değil" },
      { de: "never before", tr: "daha önce hiç" },
      { de: "apparently", tr: "görünüşe göre" },
      { de: "a typing course", tr: "daktilo kursu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Böylesi bir memnuniyeti nadiren yaşadım.",
        answer: "Rarely have I had such a pleasure.",
        hint: "Olumsuz zarf başa geçince yardımcı fiil özneden ÖNE geliyor.",
      },
      {
        kind: "build",
        tr: "Yalnızca oturumu yönetmedi, konuşma da yaptı.",
        answer: "Not only did she moderate, she also spoke.",
        hint: "Taşınacak yardımcı fiil yoksa „do“ bunun için geliyor.",
      },
      {
        kind: "build",
        tr: "Bu grup daha önce hiç burada bir araya gelmedi.",
        answer: "Never before has this group assembled here.",
        hint: "„Never before“ da olumsuz zarf; sıra bozuluyor.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre rakamlar değişti.",
        answer: "Apparently the figures have changed.",
        hint: "Bildiriyor ve aynı anda geri çekiliyor; sıra bozulmuyor.",
      },
      {
        kind: "form",
        prompt: "Kütüphanenin ellinci yılı için konuşma notlarını doldur.",
        facts: "Kütüphane 1976'da dört oda ve on bir bin kitapla açıldı; kitap ödünç vermekle kalmadı, ilk ücretsiz daktilo kursunu da verdi; iki kez kapanmanın eşiğine geldi; gelecek yıl gençler için yeni bir kanat açılacak.",
        fields: [
          { label: "Opened in", answer: "1976", accept: ["in 1976"] },
          { label: "Rooms at the start", answer: "four", accept: ["4", "four rooms"] },
          { label: "Not only books", answer: "a free typing course", accept: ["a typing course", "typing course"] },
          { label: "Nearly closed", answer: "twice", accept: ["two times"] },
          { label: "Next year", answer: "a new wing", accept: ["a new wing for young people", "new wing"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u03-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 3,
    title: "A dispute with a supplier",
    genre: "info",
    intro: "Bir tedarikçiyle yaşanan anlaşmazlık için mektup cümleleri yaz.",
    gloss: [
      { de: "what we contest", tr: "itiraz ettiğimiz şey" },
      { de: "it was the threshold", tr: "eşikti" },
      { de: "it is claimed that", tr: "ileri sürülüyor ki" },
      { de: "are said to be", tr: "olduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İtiraz ettiğimiz şey gecikme.",
        answer: "What we contest is the delay.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Değişen eşikti.",
        answer: "It was the threshold that changed.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "Kabul edilemez olan sessizlik.",
        answer: "What is unacceptable is the silence.",
        hint: "Aynı kalıp, bu kez bir yokluğu adlandırıyor.",
      },
      {
        kind: "build",
        tr: "Tedarikçinin geciktiği ileri sürülüyor.",
        answer: "It is claimed that the supplier was late.",
        hint: "Mesafe: söylenen şey henüz doğrulanmış değil.",
      },
      {
        kind: "build",
        tr: "Tazminatın düşük olduğu söyleniyor.",
        answer: "The damages are said to be small.",
        hint: "Kısa yol: özne öne çıkıyor, geriye mastar kalıyor.",
      },
    ],
  },
];
