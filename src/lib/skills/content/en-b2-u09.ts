import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 9 — "Düzeltme, basın özeti, gazetenin savunduğu,
 * iddiayı denetlemek".
 *
 * Dört ders: The correction · A press summary · What the paper argues ·
 * Checking a claim.
 *
 *   Kelime: bias, myth, gossip, propaganda, censorship, suspicion,
 *           objectivity, neutrality, editorial, protest, scandal,
 *           controversy, movement, reform, hearing, investigation,
 *           accountability, economy, victim, probability, satire,
 *           obituary, parliament, suspect, database, methodology,
 *           projection, ambiguity, contradiction, relevance,
 *           significance, irony.
 *   Kalıp:  The bias must have been there from the start. ·
 *           The myth can't have started here. ·
 *           We should have checked the gossip. ·
 *           Having read the editorial, we wrote the summary. ·
 *           Being short, the protest got little space. ·
 *           Published on Monday, the scandal grew fast. ·
 *           What the paper argues is accountability. ·
 *           It was the economy that decided the vote. ·
 *           What is missing is the victim's own voice. ·
 *           It seems to have been taken from a database. ·
 *           Apparently the methodology was never published. ·
 *           From one angle the projection is arguably sound.
 *
 * Ünitenin tek öğretme noktası MASTARIN KENDİ ZAMANI VAR. „It seems to
 * have been taken“ — zamanı taşıyan şey ne „seems“ ne de „taken“; iki
 * sözcük, „have been“, işi görmenin ÖNÜNE atıyor. Üstelik İngilizce bunu
 * cümlenin ERKENİNDE söylüyor: okur nesneye varmadan zaman çerçevesi
 * kurulmuş oluyor.
 */
export const enB2U09: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u09-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 9,
    title: "Checking a claim",
    genre: "opinion",
    intro: "Zamanı hangi sözcük taşıyor? Ve ne zaman söylüyor?",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "reaches", tr: "ulaşıyor" },
      { de: "exists", tr: "var" },
      { de: "tense", tr: "zaman kipi" },
      { de: "entirely", tr: "tümüyle" },
      { de: "certain", tr: "emin" },
      { de: "a state", tr: "durum" },
      { de: "the alternative", tr: "öteki seçenek" },
      { de: "open", tr: "açık" },
      { de: "settled", tr: "yerleşmiş" },
      { de: "a frame", tr: "çerçeve" },
      { de: "declines", tr: "geri çeviriyor" },
      { de: "a standpoint", tr: "duruş noktası" },
      { de: "a hedge", tr: "çekince" },
      { de: "rigorous", tr: "titiz" },
      { de: "the site", tr: "site" },
      { de: "a file", tr: "dosya" },
      { de: "early", tr: "erkenden" },
    ],
    minutes: 9,
    text:
      "It seems to have been taken from a database. Six words in and you already know three things: somebody took it, the taking is finished, and I am not certain.\n" +
      "The finished part is carried by „have“. Not by „seems“, which is in the present, and not by „taken“ on its own, which would be a state. Two words in the middle of the sentence do the whole job, and English puts them early — before the reader reaches the thing that was taken.\n" +
      "That is worth noticing, because the alternative exists. A language can leave the tense to the end, and the reader then has to hold the clause open until the last word tells them where in time they are. English decides at „have“ and lets the rest of the sentence arrive on top of a settled frame.\n" +
      "Apparently the methodology was never published. One word, and it does the same kind of work in a different way: it reports and it declines to be the source.\n" +
      "From one angle the projection is arguably sound. Two hedges, and in a check of this kind that is one too many. „From one angle“ names a standpoint and can be argued with. „Arguably“ names nothing and cannot.\n" +
      "The significance of all of this is not style. A claim that is checked has a relevance the reader can test, and every hedge is a place where a test was not made. The contradiction in the file is that a page written entirely in careful language is a page in which nothing has been checked, and the irony is that it reads as the most rigorous thing on the site.",
    questions: [
      {
        text: "Which word carries the finished part?",
        options: ["have", "seems", "taken"],
        answer: 0,
        explain: "„The finished part is carried by „have“.“",
      },
      {
        text: "Where does English decide the tense?",
        options: ["early, at „have“", "at the end", "at the last word"],
        answer: 0,
        explain: "„English decides at „have“ and lets the rest of the sentence arrive on top of a settled frame.“",
      },
      {
        kind: "truefalse",
        text: "Two hedges in a check of this kind is one too many.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Two hedges, and in a check of this kind that is one too many.“",
      },
      {
        kind: "gapfill",
        text: "It seems to ___ been taken from a database.",
        options: [],
        answer: 0,
        accept: ["have"],
        explain: "„It seems to have been taken from a database.“",
      },
      {
        kind: "order",
        text: "Denetlemenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "It seems to have been taken from a database.",
          "Apparently the methodology was never published.",
          "From one angle the projection is arguably sound.",
          "Every hedge is a place where a test was not made.",
        ],
        explain: "Mastar, tek sözcük, iki çekince, en sonda bedeli.",
      },
      {
        kind: "short_answer",
        text: "Which hedge can be argued with?",
        options: [],
        answer: 0,
        accept: ["from one angle", "the standpoint one", "the first one"],
        explain: "„„From one angle“ names a standpoint and can be argued with.“",
      },
    ],
  },
  {
    id: "en-b2-u09-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 9,
    title: "The correction",
    genre: "opinion",
    intro: "Düzeltmenin üç işi. Hangisini kimse atlamıyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "prohibition", tr: "yasak" },
      { de: "sentence", tr: "cümle" },
      { de: "spend", tr: "harcamak" },
      { de: "the accusation", tr: "suçlama" },
      { de: "a distinction", tr: "ayrım" },
      { de: "rules out", tr: "dışarıda bırakıyor" },
      { de: "ought to", tr: "gerekirdi" },
      { de: "the first person", tr: "birinci tekil" },
      { de: "the temptation", tr: "ayartı" },
      { de: "accurate", tr: "isabetli" },
      { de: "attach", tr: "yapışmak" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "map onto", tr: "karşılık gelmek" },
      { de: "a reading", tr: "okuma" },
      { de: "available", tr: "elde olan" },
      { de: "believes", tr: "inanıyor" },
    ],
    minutes: 9,
    text:
      "The bias must have been there from the start. Four words of verb before the point arrives, and every one of them is doing something.\n" +
      "„Must have been“ is the conclusion, not the accusation. It says the evidence leaves one reading. In a correction that distinction is the difference between a paragraph the paper can print and one it cannot.\n" +
      "The myth can't have started here. The negative of the same conclusion, and it is „can't have“ and never „mustn't have“ — a prohibition cannot be aimed at last March.\n" +
      "We should have checked the gossip. That one is not about evidence at all. It is about a choice that was available and was not taken, and it is the only sentence in the paragraph that anybody will remember.\n" +
      "A correction has three jobs and they map onto the three forms. Say what the evidence now shows. Say what it rules out. Say what we ought to have done, once, at the end, in the first person.\n" +
      "The temptation is to spend the paragraph on the first two, because they are about the world and the third one is about us. A correction written that way is accurate and nobody believes it.\n" +
      "Suspicion is the cost of getting this wrong, and it does not attach to the story. It attaches to the next one, and the one after that, which is why objectivity is a habit rather than a claim.",
    questions: [
      {
        text: "What is „must have been“?",
        options: ["a conclusion", "an accusation", "a prohibition"],
        answer: 0,
        explain: "„„Must have been“ is the conclusion, not the accusation.“",
      },
      {
        text: "Which sentence will people remember?",
        options: ["the one about our choice", "the one about the evidence", "the one about the myth"],
        answer: 0,
        explain: "„it is the only sentence in the paragraph that anybody will remember.“",
      },
      {
        kind: "truefalse",
        text: "A correction about the world only is believed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A correction written that way is accurate and nobody believes it.“",
      },
      {
        kind: "gapfill",
        text: "The myth ___ have started here.",
        options: [],
        answer: 0,
        accept: ["can't", "cannot"],
        explain: "„The myth can't have started here.“",
      },
      {
        kind: "order",
        text: "Düzeltmenin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The bias must have been there from the start.",
          "The myth can't have started here.",
          "We should have checked the gossip.",
          "Objectivity is a habit rather than a claim.",
        ],
        explain: "Kanıt, dışarıda bıraktığı, kendi payımız, en sonda yargı.",
      },
      {
        kind: "short_answer",
        text: "Where does the suspicion attach?",
        options: [],
        answer: 0,
        accept: ["to the next story", "the next one", "later stories"],
        explain: "„It attaches to the next one, and the one after that…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u09-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 9,
    title: "A press summary",
    genre: "dialogue",
    intro: "On bir satırlık özet. Ortaç ne kazandırıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "shortness", tr: "kısalık" },
      { de: "events", tr: "olaylar" },
      { de: "plain", tr: "yalın" },
      { de: "passive", tr: "edilgen" },
      { de: "above", tr: "yukarıda" },
      { de: "reach", tr: "ulaşmak" },
      { de: "reaches", tr: "ulaşıyor" },
      { de: "except", tr: "dışında" },
      { de: "a conjunction", tr: "bağlaç" },
      { de: "a time gap", tr: "zaman aralığı" },
      { de: "a situation", tr: "durum" },
      { de: "evasion", tr: "kaçamak" },
      { de: "careless", tr: "özensiz" },
      { de: "visibly", tr: "gözle görülür" },
      { de: "print", tr: "baskı" },
      { de: "constantly", tr: "sürekli" },
      { de: "compress", tr: "sıkıştırmak" },
      { de: "attend", tr: "katılmak" },
      { de: "the third form", tr: "üçüncü hâl" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ela", text: "Having read the editorial, we wrote the summary. The reading came first and the sentence says so without a conjunction." },
      { speaker: "Mert", text: "Why does that matter on a summary page?" },
      { speaker: "Ela", text: "Because the page is eleven lines long and half of them are names. Every „after we had“ is three words that could have been a fact." },
      { speaker: "Mert", text: "The second line has no time gap." },
      { speaker: "Ela", text: "Being short, the protest got little space. The shortness and the small space are one situation and not two events, so the plain „-ing“ is right." },
      { speaker: "Mert", text: "And the third?" },
      { speaker: "Ela", text: "Published on Monday, the scandal grew fast. Third form at the front, so it is passive and the publisher is not named — which here is not evasion, because the publisher is in the line above." },
      { speaker: "Mert", text: "What goes wrong?" },
      { speaker: "Ela", text: "The subject, always. „Having read the editorial, the summary was written“ gives the reading to the summary." },
      { speaker: "Mert", text: "Does that reach print?" },
      { speaker: "Ela", text: "It reaches print constantly, and every reader sees it and nobody stops. In a piece about an investigation, a sentence that is visibly careless is an argument against the piece." },
      { speaker: "Mert", text: "And the hearing?" },
      { speaker: "Ela", text: "The hearing goes in the last line with its date, in a plain sentence. A summary can compress everything except the thing somebody will want to attend." },
    ],
    questions: [
      {
        text: "How long is the page?",
        options: ["eleven lines", "eleven pages", "one line"],
        answer: 0,
        explain: "„the page is eleven lines long and half of them are names.“",
      },
      {
        text: "Why is the passive not evasion here?",
        options: ["the publisher is in the line above", "nobody knows", "it is shorter"],
        answer: 0,
        explain: "„which here is not evasion, because the publisher is in the line above.“",
      },
      {
        kind: "truefalse",
        text: "The broken sentence reaches print constantly.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It reaches print constantly…“",
      },
      {
        kind: "gapfill",
        text: "___ short, the protest got little space.",
        options: [],
        answer: 0,
        accept: ["Being", "being"],
        explain: "„Being short, the protest got little space.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Published on Monday, the scandal grew fast.", "Published on Monday, the scandal grew fast"],
        explain: "Üçüncü hâlle başlıyor: edilgen ortaç.",
      },
      {
        kind: "short_answer",
        text: "What can a summary not compress?",
        options: [],
        answer: 0,
        accept: ["the hearing", "the date", "what people attend"],
        explain: "„A summary can compress everything except the thing somebody will want to attend.“",
      },
    ],
  },
  {
    id: "en-b2-u09-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 9,
    title: "What the paper argues",
    genre: "monologue",
    intro: "Başyazıda kaç yarık cümle? Ve neden anma yazısında hiç?",
    gloss: [
      { de: "plain", tr: "yalın" },
      { de: "exists", tr: "var" },
      { de: "sentence", tr: "cümle" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "noun", tr: "isim" },
      { de: "per", tr: "başına" },
      { de: "none", tr: "hiçbiri" },
      { de: "the light", tr: "ışık" },
      { de: "an absence", tr: "yokluk" },
      { de: "an oversight", tr: "gözden kaçma" },
      { de: "insists", tr: "diretiyor" },
      { de: "the exception", tr: "istisna" },
      { de: "loudness", tr: "yükseklik" },
      { de: "the joke", tr: "şaka" },
      { de: "badly", tr: "kötü biçimde" },
      { de: "weaker", tr: "daha zayıf" },
      { de: "a life", tr: "bir yaşam" },
      { de: "finishes", tr: "bitiriyor" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Kuzey", text: "What the paper argues is accountability. Not reform, not the movement, not the reform of the movement: accountability." },
      { speaker: "Kuzey", text: "The plain version exists and it is weaker. „The paper argues for accountability“ is a sentence about the paper. The cleft is a sentence about the word." },
      { speaker: "Kuzey", text: "It was the economy that decided the vote. The other shape: the light falls on a noun and everything else goes behind „that“." },
      { speaker: "Kuzey", text: "That one answers a question. Somebody in the room already believes the vote was decided by something, and this sentence says which." },
      { speaker: "Kuzey", text: "What is missing is the victim's own voice. A cleft can name an absence, which a plain sentence does badly — „the victim's voice is missing“ sounds like an oversight rather than a choice." },
      { speaker: "Kuzey", text: "I keep one per piece. The shape is loud, and an editorial in which every paragraph insists is an editorial nobody finishes." },
      { speaker: "Kuzey", text: "The satire column is the exception and it runs three, because there the loudness is the joke." },
      { speaker: "Kuzey", text: "In the obituary, none. A life does not need a sentence that tells the reader where to look." },
    ],
    questions: [
      {
        text: "What does the paper argue?",
        options: ["accountability", "reform", "the movement"],
        answer: 0,
        explain: "„What the paper argues is accountability.“",
      },
      {
        text: "What does a cleft do that a plain sentence does badly?",
        options: ["name an absence", "name a person", "name a date"],
        answer: 0,
        explain: "„A cleft can name an absence, which a plain sentence does badly…“",
      },
      {
        kind: "truefalse",
        text: "The obituary takes three of them.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In the obituary, none.“",
      },
      {
        kind: "gapfill",
        text: "It was the ___ that decided the vote.",
        options: [],
        answer: 0,
        accept: ["economy"],
        explain: "„It was the economy that decided the vote.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What is missing is the victim's own voice.", "What is missing is the victim's own voice"],
        explain: "Yarık cümle bir yokluğu da adlandırabiliyor.",
      },
      {
        kind: "short_answer",
        text: "Why does the satire column run three?",
        options: [],
        answer: 0,
        accept: ["the loudness is the joke", "it is the joke", "for the joke"],
        explain: "„because there the loudness is the joke.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u09-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 9,
    title: "It seems to have been taken from a database",
    genre: "info",
    intro: "Mastarın zamanı ve iki çıkarım.",
    gloss: [
      { de: "to have been taken", tr: "alınmış" },
      { de: "apparently", tr: "görünüşe göre" },
      { de: "must have been", tr: "olmalı" },
      { de: "can't have started", tr: "başlamış olamaz" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir veri tabanından alınmış görünüyor.",
        answer: "It seems to have been taken from a database.",
        hint: "Mastarın kendi zamanı var: iş görünmeden önce olmuş.",
      },
      {
        kind: "build",
        tr: "Yöntem düzeninin hiç yayımlanmadığı anlaşılıyor.",
        answer: "Apparently the methodology was never published.",
        hint: "Tek sözcük hem bildiriyor hem geri çekiliyor.",
      },
      {
        kind: "build",
        tr: "Yanlılık en baştan beri orada olmalı.",
        answer: "The bias must have been there from the start.",
        hint: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "build",
        tr: "Efsane burada başlamış olamaz.",
        answer: "The myth can't have started here.",
        hint: "Olumsuzu „can't have“; „mustn't have“ diye bir şey yok.",
      },
      {
        kind: "form",
        prompt: "Doğrulama kartını doldur.",
        facts: "Zamanı „have“ taşıyor; „apparently“ kaynağı başka yere koyuyor; yanlılık baştan vardı; efsane burada başlamadı.",
        fields: [
          { label: "The tense", answer: "have", accept: ["to have been"] },
          { label: "The source", answer: "apparently", accept: ["not us"] },
          { label: "The bias", answer: "must have been", accept: ["from the start"] },
          { label: "The myth", answer: "can't have started", accept: ["not here"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u09-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 9,
    title: "What the paper argues is accountability",
    genre: "opinion",
    intro: "İki yarık cümle ve iki ortaç.",
    gloss: [
      { de: "what the paper argues", tr: "gazetenin savunduğu" },
      { de: "it was the economy", tr: "ekonomiydi" },
      { de: "having read", tr: "okuduktan sonra" },
      { de: "being short", tr: "kısa olduğu için" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Gazetenin savunduğu şey hesap verebilirlik.",
        answer: "What the paper argues is accountability.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Oyu belirleyen ekonomiydi.",
        answer: "It was the economy that decided the vote.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "Eksik olan mağdurun kendi sesi.",
        answer: "What is missing is the victim's own voice.",
        hint: "Yarık cümle bir yokluğu da adlandırabiliyor.",
      },
      {
        kind: "build",
        tr: "Başyazıyı okuduktan sonra özeti yazdık.",
        answer: "Having read the editorial, we wrote the summary.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Kısa olduğu için protestoya az yer verildi.",
        answer: "Being short, the protest got little space.",
        hint: "Aynı anda olan iş: yalın „-ing“.",
      },
    ],
  },
];
