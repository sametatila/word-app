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
 *   Kalıp:  We request that our lawyer lodge the appeal today. ·
 *           Were it not for the limitation period, the claim would stand. ·
 *           They ask that no evidence be ruled inadmissible without a hearing. ·
 *           A misdemeanor in one report is a civil infraction in another. ·
 *           Written as an administrative decision, the same step reads colder. ·
 *           In the spoken register, the acquittal becomes "he was cleared." ·
 *           She stated it; he conceded it; they alleged it. ·
 *           The expert report openly claims what the file merely assumes. ·
 *           To record a revocation is not to accept it. ·
 *           To enact a rule is not to enforce it. ·
 *           They outvoted the group before the new members were sworn in. ·
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
    title: "The unenforced bike lane ban",
    genre: "opinion",
    intro: "Yerel gazetede bir köşe yazısı: bisiklet yolu yasağı çıktı ama kimse uygulamıyor. Yazar ne istiyor?",
    gloss: [
      { de: "a ban", tr: "yasak" },
      { de: "the majority", tr: "çoğunluk" },
      { de: "cycling", tr: "bisiklet sürme" },
      { de: "a victory", tr: "zafer" },
      { de: "an officer", tr: "polis memuru" },
      { de: "elsewhere", tr: "başka yerde" },
      { de: "a cyclist", tr: "bisikletli" },
      { de: "a rider", tr: "bisiklet sürücüsü" },
      { de: "anger", tr: "öfke" },
      { de: "withdrawn", tr: "geri çekilmiş" },
      { de: "a tow truck", tr: "çekici" },
      { de: "outvote", tr: "oylamada yenmek" },
      { de: "sworn in", tr: "yemin ederek göreve başlamış" },
      { de: "enact", tr: "yürürlüğe koymak" },
      { de: "enforce", tr: "uygulatmak" },
      { de: "discretion", tr: "takdir yetkisi" },
      { de: "lodge", tr: "sunmak" },
      { de: "a revocation", tr: "iptal" },
      { de: "forfeit", tr: "kaybetmek" },
    ],
    minutes: 12,
    text:
      "Eighteen months ago the city council voted to ban parking in bike lanes. The vote was close. The old majority outvoted the cycling group two weeks before the new members were sworn in, and the ban was announced as a victory for everyone who rides to work.\n" +
      "Walk down Station Street any morning and count the delivery vans in the bike lane. I counted fourteen on Tuesday. Not one of them had a ticket.\n" +
      "To enact a rule is not to enforce it. The council has done the first and has quietly decided against the second. The police say they have no officers to spare; the traffic department says bike lanes are a police matter; and the mayor, who has discretion over both budgets, has chosen to spend the money elsewhere.\n" +
      "That is his right. What a term of office grants, discretion can take, and this mayor has wide discretion. But to use it in silence is to make a decision without owning it.\n" +
      "Cyclists have not been silent. Since January, residents have lodged more than two hundred complaints. The council records every one of them. To record a complaint, however, is not to accept it, and the answer to each of the two hundred has been the same letter: the matter has been noted.\n" +
      "Some riders now want to give up and campaign for a revocation of the whole rule, on the grounds that a ban nobody enforces is worse than no ban at all. I understand the anger, but to give in now is to forfeit the argument. A rule on the books can still be enforced by the next council. A rule that has been withdrawn has to be won again from the beginning.\n" +
      "What cyclists need is not a new vote. It is a line in the budget for next year, two officers and a tow truck. To ask for that is not to ask for much.",
    questions: [
      {
        text: "Who outvoted the cycling group?",
        options: ["the old majority", "the new members", "the police"],
        answer: 0,
        explain: "„The old majority outvoted the cycling group two weeks before the new members were sworn in…“",
      },
      {
        text: "How many vans did the writer count on Tuesday?",
        options: ["fourteen", "two hundred", "two"],
        answer: 0,
        explain: "„I counted fourteen on Tuesday.“",
      },
      {
        kind: "truefalse",
        text: "The mayor has discretion over the police and traffic budgets.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the mayor, who has discretion over both budgets, has chosen to spend the money elsewhere.“",
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
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The council voted to ban parking in bike lanes.",
          "The writer counted vans on Station Street.",
          "Residents lodged more than two hundred complaints.",
          "Some riders want the rule withdrawn.",
        ],
        explain: "Karar, sokaktaki durum, şikâyetler, en sonda kuralın geri çekilmesi tartışması.",
      },
      {
        kind: "short_answer",
        text: "What do cyclists need, according to the writer?",
        options: [],
        answer: 0,
        accept: ["a line in the budget", "two officers and a tow truck", "a budget line", "money in the budget"],
        explain: "„It is a line in the budget for next year, two officers and a tow truck.“",
      },
    ],
  },
  {
    id: "en-c1-u06-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 6,
    title: "Life after an acquittal",
    genre: "article",
    intro: "Beraat eden bir otobüs şoförünün hikâyesi. Mahkeme kararı neden onu bütünüyle kurtarmadı?",
    gloss: [
      { de: "east", tr: "doğu" },
      { de: "assault", tr: "saldırı" },
      { de: "a bar", tr: "bar" },
      { de: "a judge", tr: "yargıç" },
      { de: "a verdict", tr: "hüküm" },
      { de: "acquitted", tr: "beraat etmiş" },
      { de: "a court", tr: "mahkeme" },
      { de: "an event", tr: "olay" },
      { de: "a clerk", tr: "kâtip" },
      { de: "shrank", tr: "küçüldü" },
      { de: "bitter", tr: "kırgın" },
      { de: "precise", tr: "kesin" },
      { de: "in his favor", tr: "lehine" },
      { de: "practical", tr: "pratik" },
      { de: "a rumor", tr: "söylenti" },
      { de: "a defense", tr: "savunma" },
      { de: "inadmissible", tr: "kabul edilemez" },
      { de: "a misdemeanor", tr: "hafif suç" },
      { de: "a civil infraction", tr: "kabahat" },
      { de: "a revocation", tr: "iptal" },
      { de: "suspended", tr: "uzaklaştırılmış" },
      { de: "a precaution", tr: "önlem" },
    ],
    minutes: 12,
    text:
      "Four years ago Daniel Ortiz, a bus driver from the east side of the city, was charged with assault after a fight outside a bar. The trial lasted four days. The judge ruled two statements inadmissible, heard eleven witnesses and gave a long written verdict. Daniel was acquitted.\n" +
      "He thought that was the end of it. It was the beginning of a second, slower process that no court controls.\n" +
      "Written up in the local paper, the case took three lines: a driver had been „cleared of assault“. Read by his employer, those three lines were enough for a meeting with human resources. Asked why he had been suspended, the company called it „a precaution“.\n" +
      "Recorded by the city, the same event became something else again. A clerk had filed the original charge as a misdemeanor; a second office, reading the same file, treated it as a civil infraction and started the revocation of his license to drive a public bus. It took eight months and a lawyer to stop the process.\n" +
      "Told at the school gate, the story shrank further. „Wasn't he the one in that fight?“ is the version his daughter heard.\n" +
      "Daniel is not bitter, but he is precise. Having read the verdict many times, he can quote the reasons the court gave in his favor. „Nobody else has read it,“ he says. „They read the headline, or the letter from the city, or they heard something. Each of them kept one piece.“\n" +
      "His lawyer, Marta Gil, sees this often. Asked what she tells clients after an acquittal, she is practical: keep a copy of the verdict with you, and send it before anyone asks. Sent early, a verdict reads as information. Sent after a rumor, it reads as a defense.",
    questions: [
      {
        text: "How long did the trial last?",
        options: ["four days", "eight months", "four years"],
        answer: 0,
        explain: "„The trial lasted four days.“",
      },
      {
        text: "What did the second city office start?",
        options: ["the revocation of his license", "a new trial", "a meeting with his employer"],
        answer: 0,
        explain: "„a second office, reading the same file, treated it as a civil infraction and started the revocation of his license to drive a public bus.“",
      },
      {
        kind: "truefalse",
        text: "Many people have read the full verdict.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nobody else has read it,“",
      },
      {
        kind: "gapfill",
        text: "Sent early, a verdict reads as ___.",
        options: [],
        answer: 0,
        accept: ["information"],
        explain: "„Sent early, a verdict reads as information.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Daniel was acquitted after a four-day trial.",
          "The local paper gave the case three lines.",
          "The city started the revocation of his license.",
          "His lawyer advises clients to send the verdict early.",
        ],
        explain: "Beraat, gazete, belediye, en sonda avukatın öğüdü.",
      },
      {
        kind: "short_answer",
        text: "How long did it take to stop the revocation?",
        options: [],
        answer: 0,
        accept: ["eight months", "8 months"],
        explain: "„It took eight months and a lawyer to stop the process.“",
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
    title: "Witness statements after a crash",
    genre: "dialogue",
    intro: "İki genç avukat bir trafik kazasının tanık ifadelerini gözden geçiriyor. Hangi kanıt en güçlü?",
    gloss: [
      { de: "a crash", tr: "kaza" },
      { de: "a cyclist", tr: "bisikletli" },
      { de: "a zone", tr: "bölge" },
      { de: "a junction", tr: "kavşak" },
      { de: "braking", tr: "fren yapmak" },
      { de: "hit", tr: "çarpmak" },
      { de: "a brake", tr: "fren" },
      { de: "lead with", tr: "öne çıkarmak" },
      { de: "stolen", tr: "çalınmış" },
      { de: "conceded", tr: "kabul etti" },
      { de: "alleged", tr: "iddia etti" },
      { de: "merely", tr: "yalnızca" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Abigail", text: "Have you read the three witness statements from the crash on Park Road?" },
      { speaker: "Seth", text: "Twice. The cyclist stated that the light was red. The driver conceded that he was going a little fast, and his passenger alleged that the cyclist came out of nowhere." },
      { speaker: "Abigail", text: "Conceded? He actually admitted the speed?" },
      { speaker: "Seth", text: "Fifty-five in a fifty zone. He said it himself, before his lawyer arrived, and the officer wrote it down word for word." },
      { speaker: "Abigail", text: "That helps us. What about the camera at the junction?" },
      { speaker: "Seth", text: "It was switched off for repairs that week. The city confirmed it in writing." },
      { speaker: "Abigail", text: "So everything depends on the witnesses. What does the expert report say?" },
      { speaker: "Seth", text: "The expert report openly claims what the police file merely assumes. The car was still braking when it hit the bike." },
      { speaker: "Abigail", text: "Does the report show that, or just say it?" },
      { speaker: "Seth", text: "It shows it. There are brake marks eleven meters long, with photos and measurements on page six." },
      { speaker: "Abigail", text: "Then we lead with page six. Who else did the police speak to?" },
      { speaker: "Seth", text: "A woman at the bus stop. She stated that she heard the brakes before the crash, but she said she did not see the light." },
      { speaker: "Abigail", text: "Good. An honest witness who admits what she did not see is worth more than a confident one. We call her first." },
    ],
    questions: [
      {
        text: "Who alleged that the cyclist came out of nowhere?",
        options: ["the passenger", "the driver", "the woman at the bus stop"],
        answer: 0,
        explain: "„his passenger alleged that the cyclist came out of nowhere.“",
      },
      {
        text: "Why is there no video of the crash?",
        options: ["The camera was switched off.", "The camera was stolen.", "The police lost it."],
        answer: 0,
        explain: "„It was switched off for repairs that week.“",
      },
      {
        kind: "truefalse",
        text: "The brake marks are shown on page six.",
        options: ["True", "False"],
        answer: 0,
        explain: "„There are brake marks eleven meters long, with photos and measurements on page six.“",
      },
      {
        kind: "gapfill",
        text: "The driver ___ that he was going a little fast.",
        options: [],
        answer: 0,
        accept: ["conceded"],
        explain: "„The driver conceded that he was going a little fast…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The expert report openly claims what the police file merely assumes.",
          "The expert report openly claims what the police file merely assumes",
        ],
        explain: "Bilirkişi raporu açıkça ileri sürüyor, polis dosyası ise yalnızca varsayıyor.",
      },
      {
        kind: "short_answer",
        text: "Who will they call first?",
        options: [],
        answer: 0,
        accept: ["the woman", "the woman at the bus stop", "the witness at the bus stop"],
        explain: "„We call her first.“",
      },
    ],
  },
  {
    id: "en-c1-u06-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 6,
    title: "The community garden appeal",
    genre: "monologue",
    intro: "Mahalle derneğinin sözcüsü, bahçenin yıkımına karşı itirazı sakinlere anlatıyor. İtiraz neden bugün sunulmalı?",
    gloss: [
      { de: "a demolition", tr: "yıkım" },
      { de: "intend", tr: "niyet etmek" },
      { de: "rely on", tr: "dayanmak" },
      { de: "propose", tr: "önermek" },
      { de: "a court", tr: "mahkeme" },
      { de: "lodge", tr: "sunmak" },
      { de: "inadmissible", tr: "kabul edilemez" },
      { de: "the limitation period", tr: "zamanaşımı süresi" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Debbie", text: "Thank you all for coming. I will keep this short, because the deadline for our appeal is on Friday." },
      { speaker: "Debbie", text: "Last night the committee voted, and we have written to our lawyer. We request that she lodge the appeal against the demolition of the garden today, not on Friday." },
      { speaker: "Debbie", text: "Why today? Because the city once lost an appeal from the school parents in the post, and we do not intend to find out whether it can happen twice." },
      { speaker: "Debbie", text: "In the letter we also ask that no photo from the residents be ruled inadmissible without a hearing. The city has already tried that once." },
      { speaker: "Debbie", text: "Our lawyer is honest about the risks. Were it not for the limitation period, she says, our claim about the old contract would be very strong." },
      { speaker: "Debbie", text: "The contract is from 1998, and the limit for that kind of claim is twenty years. So we will rely on the second argument, the one about the trees." },
      { speaker: "Debbie", text: "The city insists that the work begin in March. We propose that it be delayed until the court has decided, which seems fair to everyone." },
      { speaker: "Debbie", text: "If you have photos of the garden from before 2010, please send them to me by Wednesday evening. Every picture helps." },
    ],
    questions: [
      {
        text: "When does the committee want the appeal lodged?",
        options: ["today", "on Friday", "in March"],
        answer: 0,
        explain: "„We request that she lodge the appeal against the demolition of the garden today, not on Friday.“",
      },
      {
        text: "Which argument will they rely on?",
        options: ["the one about the trees", "the one about the old contract", "the one about the school"],
        answer: 0,
        explain: "„So we will rely on the second argument, the one about the trees.“",
      },
      {
        kind: "truefalse",
        text: "The city wants the work to begin after the court has decided.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The city insists that the work begin in March.“",
      },
      {
        kind: "gapfill",
        text: "We also ask that no photo from the residents ___ ruled inadmissible without a hearing.",
        options: [],
        answer: 0,
        accept: ["be"],
        explain: "„In the letter we also ask that no photo from the residents be ruled inadmissible without a hearing.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The city insists that the work begin in March.", "The city insists that the work begin in March"],
        explain: "İstek kipi: „begin“, „begins“ değil.",
      },
      {
        kind: "short_answer",
        text: "By when should people send their photos?",
        options: [],
        answer: 0,
        accept: ["by Wednesday evening", "Wednesday evening", "Wednesday"],
        explain: "„please send them to me by Wednesday evening.“",
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
    title: "Power on the council",
    genre: "info",
    intro: "Belediye meclisindeki yetki tartışması için cümleler kur, sonra haber notunu doldur.",
    gloss: [
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
        answer: "To give in is to forfeit the argument.",
        hint: "Olumlu biçim bir özdeşlik kuruyor.",
      },
      {
        kind: "build",
        tr: "Bir görev süresinin verdiğini takdir yetkisi alabilir.",
        answer: "What a term of office grants, discretion can take.",
        hint: "Öne çıkarılmış nesne; „what“ öbeğinden sonra „is“ değil, bir özne geliyor.",
      },
      {
        kind: "build",
        tr: "Yeni üyelere yemin ettirilmeden önce grubu oylamada yendiler.",
        answer: "They outvoted the group before the new members were sworn in.",
        hint: "İki eşdizim bir cümlede; edilgende parçacık sonda kalmış.",
      },
      {
        kind: "form",
        prompt: "Yerel haber için meclis kartını doldur.",
        facts: "Meclis bisiklet yollarına park yasağını 18 ay önce kabul etti; salı günü 14 kamyonet sayıldı ve hiçbirine ceza yazılmadı; iki yüzden fazla şikâyet kayda geçti ama hiçbiri kabul edilmedi; takdir yetkisi belediye başkanında.",
        fields: [
          { label: "Ban passed", answer: "18 months ago", accept: ["eighteen months ago"] },
          { label: "Vans counted on Tuesday", answer: "14", accept: ["fourteen"] },
          { label: "Tickets issued", answer: "none", accept: ["no tickets", "0"] },
          { label: "Complaints", answer: "recorded, not accepted", accept: ["recorded but not accepted", "noted"] },
          { label: "Discretion lies with", answer: "the mayor", accept: ["mayor"] },
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
    title: "A request to the court",
    genre: "info",
    intro: "Mahkemeye sunulacak bir dilekçenin cümlelerini kur.",
    gloss: [
      { de: "lodge", tr: "sunmak" },
      { de: "inadmissible", tr: "kabul edilemez" },
      { de: "a misdemeanor", tr: "hafif suç" },
      { de: "an administrative decision", tr: "idari işlem" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Avukatımızın itirazı bugün sunmasını talep ediyoruz.",
        answer: "We request that our lawyer lodge the appeal today.",
        hint: "İstek kipi: „lodge“, „lodges“ değil.",
      },
      {
        kind: "build",
        tr: "Hiçbir delilin duruşma yapılmadan kabul edilemez sayılmamasını istiyorlar.",
        answer: "They ask that no evidence be ruled inadmissible without a hearing.",
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
        tr: "Bir raporda hafif suç olan şey, başka birinde kabahattir.",
        answer: "A misdemeanor in one report is a civil infraction in another.",
        hint: "Aynı olay, iki sözcük, iki ayrı dünya.",
      },
      {
        kind: "build",
        tr: "İdari işlem olarak yazılınca aynı adım daha soğuk okunuyor.",
        answer: "Written as an administrative decision, the same step reads colder.",
        hint: "Orta çatı: okuyan kimse adlandırılmıyor.",
      },
    ],
  },
];
