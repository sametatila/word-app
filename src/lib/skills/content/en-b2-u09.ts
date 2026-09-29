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
    title: "Fact check: graduate jobs",
    genre: "article",
    intro: "Bir milletvekilinin iddiasını denetleyen haber. Rakam nereden geliyor?",
    gloss: [
      { de: "statistics", tr: "istatistik" },
      { de: "a graduate", tr: "mezun" },
      { de: "recruitment", tr: "işe alım" },
      { de: "to appear", tr: "görünmek" },
      { de: "identical", tr: "aynı" },
      { de: "calculate", tr: "hesaplamak" },
      { de: "national", tr: "ulusal" },
      { de: "a statistic", tr: "istatistik" },
      { de: "a verdict", tr: "karar" },
      { de: "misleading", tr: "yanıltıcı" },
      { de: "contact", tr: "ulaşmak" },
    ],
    minutes: 9,
    text:
      "FACT CHECK: DO 80 PERCENT OF GRADUATES REALLY FIND WORK WITHIN SIX MONTHS?\n" +
      "Last week a member of parliament said in a television debate that 80 percent of university graduates find a job within six months. The claim has since been shared thousands of times. We checked it.\n" +
      "Where does the number come from? It seems to have been taken from a database run by a private recruitment company. The same figure appears on the company website, and the wording of the claim is almost identical. The figure appears to have been published for the first time in 2019.\n" +
      "How was it calculated? Apparently the methodology was never published. We asked the company twice and received no answer. Without the methodology we cannot tell who was asked, how many people answered, or what counted as a job.\n" +
      "What do the official numbers say? The national statistics office seems to have measured something similar last year. Its survey of 20,000 graduates found that 64 percent were in work after six months, and only 41 percent were in work that needed a degree.\n" +
      "Is the claim false? From one angle, the projection is arguably sound: the private figure may include jobs with very few hours and jobs that last only a few weeks, and if you count those, a higher number is possible. But the member of parliament presented it as an official statistic, and it is not one.\n" +
      "Our verdict: MISLEADING. The number seems to have been copied from a source with no published method, and the official figure is much lower.\n" +
      "The office of the member of parliament has been contacted for a comment.",
    questions: [
      {
        text: "Where does the number seem to come from?",
        options: ["a private company database", "the statistics office", "a university survey"],
        answer: 0,
        explain: "„It seems to have been taken from a database run by a private recruitment company.“",
      },
      {
        text: "According to the official survey, how many graduates were in work after six months?",
        options: ["64 percent", "80 percent", "41 percent"],
        answer: 0,
        explain: "„found that 64 percent were in work after six months…“",
      },
      {
        kind: "truefalse",
        text: "The company did not answer questions about its methodology.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We asked the company twice and received no answer.“",
      },
      {
        kind: "gapfill",
        text: "Apparently the ___ was never published.",
        options: [],
        answer: 0,
        accept: ["methodology"],
        explain: "„Apparently the methodology was never published.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A member of parliament made the claim on television.",
          "The number seems to come from a private database.",
          "The official survey found a lower figure.",
          "The verdict is misleading.",
        ],
        explain: "İddia, kaynağı, resmî rakam, en sonda karar.",
      },
      {
        kind: "short_answer",
        text: "What is the verdict?",
        options: [],
        answer: 0,
        accept: ["misleading", "it is misleading"],
        explain: "„Our verdict: MISLEADING.“",
      },
    ],
  },
  {
    id: "en-b2-u09-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 9,
    title: "A note to our readers",
    genre: "letter",
    intro: "Gazetenin okurlarına yazdığı düzeltme notu. Hata nasıl oldu?",
    gloss: [
      { de: "an editor", tr: "editör" },
      { de: "deserve", tr: "hak etmek" },
    ],
    minutes: 9,
    text:
      "A NOTE TO OUR READERS\n" +
      "On Saturday we published a story which claimed that the new sports center had been built on land sold to the brother of the mayor. That story was wrong, and we want to explain how it happened.\n" +
      "The claim must have started with a message that was shared in a local online group. We have seen the message, and our reporter must have read it before she began her research. Several parts of our story use exactly the same words.\n" +
      "The claim can't have come from official records. The land register shows clearly that the land was sold to a housing company in 2015, and the brother of the mayor has no connection to that company. Our reporter can't have checked the register, because the register would have told her the truth in five minutes.\n" +
      "We should have checked this gossip before we printed a single line. We should also have asked the office of the mayor for a comment. We did neither, and that is not the mistake of one reporter; it is the mistake of the paper. The story must have been read by at least three editors, and none of them asked where it came from.\n" +
      "We have removed the story from our website, and we have apologized to the mayor and his brother in person.\n" +
      "We are also changing how we work. From this week, every story that makes a claim about a named person will be checked by a second editor, and that editor will ask one question: where does this come from?\n" +
      "Readers who trust us deserve better. We are sorry.\n" +
      "The Editor",
    questions: [
      {
        text: "Where must the claim have started?",
        options: ["a message in an online group", "the land register", "the office of the mayor"],
        answer: 0,
        explain: "„The claim must have started with a message that was shared in a local online group.“",
      },
      {
        text: "Who was the land sold to?",
        options: ["a housing company", "the brother of the mayor", "the sports center"],
        answer: 0,
        explain: "„the land was sold to a housing company in 2015…“",
      },
      {
        kind: "truefalse",
        text: "Only one editor read the story before it was printed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The story must have been read by at least three editors, and none of them asked where it came from.“",
      },
      {
        kind: "gapfill",
        text: "We should have checked this ___ before we printed a single line.",
        options: [],
        answer: 0,
        accept: ["gossip"],
        explain: "„We should have checked this gossip before we printed a single line.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The paper published a wrong story on Saturday.",
          "The claim started in an online group.",
          "The land was sold to a housing company.",
          "A second editor will check stories about named people.",
        ],
        explain: "Hata, kaynağı, gerçek, en sonda yeni kural.",
      },
      {
        kind: "short_answer",
        text: "How long would the register have needed to tell the truth?",
        options: [],
        answer: 0,
        accept: ["five minutes", "5 minutes"],
        explain: "„the register would have told her the truth in five minutes.“",
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
    title: "The weekly press summary",
    genre: "dialogue",
    intro: "Haftalık basın özeti hazırlanıyor. Bu hafta hangi haberler öne çıkıyor?",
    gloss: [
      { de: "national", tr: "ulusal" },
      { de: "a minister", tr: "bakan" },
      { de: "the twelfth", tr: "ayın on ikisi" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Mert", text: "Ela, the press summary has to go to the director by four. How far are you?" },
      { speaker: "Ela", text: "Nearly done. Having read all the editorials this morning, I wrote the first half before lunch." },
      { speaker: "Mert", text: "What is the main story this week?" },
      { speaker: "Ela", text: "The hospital scandal. Published on Monday, the scandal grew fast. By Wednesday every national paper had it on the front page." },
      { speaker: "Mert", text: "And the protest on Saturday?" },
      { speaker: "Ela", text: "Being short, the protest got little space. Most papers gave it two or three lines, and only one printed a photo." },
      { speaker: "Mert", text: "Is there anything about the reform?" },
      { speaker: "Ela", text: "Yes. Asked about the reform on the radio, the minister said it would go to parliament in June. That is in the second paragraph." },
      { speaker: "Mert", text: "Good. Having seen last week's summary, the director wants fewer names and more dates." },
      { speaker: "Ela", text: "Fair enough. Then I will put the date of the hearing in the last line, where nobody can miss it." },
      { speaker: "Mert", text: "When is it?" },
      { speaker: "Ela", text: "The twelfth, at ten. Written like that, it fits on one line." },
    ],
    questions: [
      {
        text: "When does the summary have to go to the director?",
        options: ["by four", "before lunch", "on Monday"],
        answer: 0,
        explain: "„Ela, the press summary has to go to the director by four.“",
      },
      {
        text: "What does the director want?",
        options: ["fewer names and more dates", "more photos", "a longer summary"],
        answer: 0,
        explain: "„the director wants fewer names and more dates.“",
      },
      {
        kind: "truefalse",
        text: "Only one paper printed a photo of the protest.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Most papers gave it two or three lines, and only one printed a photo.“",
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
        text: "When will the reform go to parliament?",
        options: [],
        answer: 0,
        accept: ["in June", "June"],
        explain: "„the minister said it would go to parliament in June.“",
      },
    ],
  },
  {
    id: "en-b2-u09-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 9,
    title: "Planning the Sunday editorial",
    genre: "monologue",
    intro: "Yazı işleri müdürü pazar günkü başyazıyı planlıyor. Gazete ne savunacak?",
    gloss: [
      { de: "a factory", tr: "fabrika" },
      { de: "an inspector", tr: "müfettiş" },
      { de: "burn", tr: "yanmak" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Kuzey", text: "Okay, let us plan the Sunday editorial on the factory fire. We have one page, and I want it to say one thing clearly." },
      { speaker: "Kuzey", text: "What the paper argues is accountability. Not new rules, not more inspectors, but people who answer for the decisions they made." },
      { speaker: "Kuzey", text: "It was the economy that decided how fast that factory grew, and that part is fine. It was the missing inspections that decided how badly it burned." },
      { speaker: "Kuzey", text: "The official report is eighty pages long. What is missing is the victim's own voice. Not one worker was interviewed." },
      { speaker: "Kuzey", text: "So what I want from you, Deniz, is two interviews with families before Friday. It is their words that should open the piece." },
      { speaker: "Kuzey", text: "What we will not do is name the suspect. The investigation is still open, and the probability of a mistake is too high." },
      { speaker: "Kuzey", text: "It is the satire page that will make jokes this week, not us. Our page stays serious." },
      { speaker: "Kuzey", text: "The obituary for the night guard goes on page three, separately, and it has no opinion in it at all." },
    ],
    questions: [
      {
        text: "What does the paper argue?",
        options: ["accountability", "new rules", "more inspectors"],
        answer: 0,
        explain: "„What the paper argues is accountability.“",
      },
      {
        text: "What does Kuzey want from Deniz?",
        options: ["two interviews with families", "a list of suspects", "the official report"],
        answer: 0,
        explain: "„So what I want from you, Deniz, is two interviews with families before Friday.“",
      },
      {
        kind: "truefalse",
        text: "The editorial will name the suspect.",
        options: ["True", "False"],
        answer: 1,
        explain: "„What we will not do is name the suspect.“",
      },
      {
        kind: "gapfill",
        text: "It was the missing ___ that decided how badly it burned.",
        options: [],
        answer: 0,
        accept: ["inspections"],
        explain: "„It was the missing inspections that decided how badly it burned.“",
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
        text: "Where does the obituary for the night guard go?",
        options: [],
        answer: 0,
        accept: ["on page three", "page three", "page 3"],
        explain: "„The obituary for the night guard goes on page three, separately…“",
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
    title: "A study under question",
    genre: "info",
    intro: "Kuşkulu bir çalışmayı denetleyen haber için cümleler kur ve kaynak kartını doldur.",
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
        tr: "Görünüşe göre çalışmanın yöntemi hiç yayımlanmadı.",
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
        prompt: "Doğrulama haberi için kaynak kartını doldur.",
        facts: "Rakam bir veri tabanından alınmış görünüyor; yöntem hiç yayımlanmamış; yanlılık en baştan beri vardı; efsane burada başlamış olamaz.",
        fields: [
          { label: "Source of the figure", answer: "a database", accept: ["database", "seems to have been taken from a database"] },
          { label: "Methodology", answer: "never published", accept: ["not published", "apparently never published"] },
          { label: "Bias", answer: "there from the start", accept: ["from the start", "must have been there from the start"] },
          { label: "Where the myth started", answer: "not here", accept: ["can't have started here", "somewhere else"] },
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
    title: "Lines for an editorial",
    genre: "opinion",
    intro: "Başyazı ve basın özeti için cümleler kur.",
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
