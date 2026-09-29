import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 23 — "Konuşsaydık, duyguyu adlandırmak, resmî mektup,
 * dosyaya göre".
 *
 * Dört ders: If we had talked · Naming a feeling · The official letter ·
 * According to the file.
 *
 *   Kelime: custody, reliability, affection, compassion, nonverbal,
 *           rephrase, enclosure, filing, template, confidentiality,
 *           status, metric, proceedings.
 *   Kalıp:  If we had talked, custody would have been shared. ·
 *           If the child support had been fair, the family would be calm now. ·
 *           If they had been reliable, we would have stayed. ·
 *           It seems to be a nonverbal signal. ·
 *           Apparently the tone of voice carried it. ·
 *           On balance the choice of words is arguably the problem. ·
 *           The filing of the enclosure is done. ·
 *           The sending of a certified letter is recorded. ·
 *           The sorting of the incoming mail starts at eight. ·
 *           The case file is said to be complete. ·
 *           The legal basis is expected to change. ·
 *           The proceedings are thought to have started.
 *
 * Ünitenin tek öğretme noktası „THE“ GELİNCE „OF“ ZORUNLU. Ünite 21 „-ing“
 * adlaştırmasının üretken kapı olduğunu göstermişti; burada onun kendi
 * kuralı geliyor: „the filing OF the enclosure“ ile „filing the enclosure“
 * — „the“ varsa nesne „of“ ile bağlanıyor, „the“ yoksa doğrudan geliyor.
 * Üçüncü bir seçenek yok: ne „the filing the enclosure“ ne „filing of
 * the enclosure“.
 */
export const enB2U23: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u23-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 23,
    title: "Mail room rules from Monday",
    genre: "info",
    intro: "Bir ofisin posta odasıyla ilgili yeni kurallar. Pazartesiden itibaren ne değişiyor?",
    gloss: [
      { de: "a notice", tr: "duyuru" },
      { de: "staff", tr: "personel" },
      { de: "a procedure", tr: "işleyiş" },
      { de: "carefully", tr: "dikkatle" },
      { de: "incoming", tr: "gelen" },
      { de: "an envelope", tr: "zarf" },
      { de: "confidential", tr: "gizli" },
      { de: "outgoing", tr: "giden" },
      { de: "certified", tr: "taahhütlü" },
      { de: "attach", tr: "eklemek" },
      { de: "a court", tr: "mahkeme" },
      { de: "special", tr: "özel" },
      { de: "extension", tr: "dahili numara" },
    ],
    minutes: 9,
    text:
      "NOTICE TO ALL STAFF: CHANGES IN THE MAIL ROOM FROM MONDAY\n" +
      "From Monday, March 3, the mail room will follow a new procedure. Please read this notice carefully and keep it on file.\n" +
      "1. Incoming mail. The sorting of the incoming mail starts at eight and should be finished by nine. Opening envelopes that are marked „confidential“ is not allowed in the mail room; they go straight to the person named on them.\n" +
      "2. Outgoing mail. The sending of a certified letter is recorded in the new online template. Please fill in the template before you bring the letter down. Bringing letters after three in the afternoon means that they will leave the next day.\n" +
      "3. Enclosures. The filing of the enclosure is done by the department that sends the letter, not by the mail room. Attach a copy of every enclosure to the case file before sending.\n" +
      "4. Confidentiality. The handling of court papers and custody documents needs special care. Only two people, Ms. Demir and Mr. Kurt, may sign for them.\n" +
      "5. Status. You can check the status of any letter online. The recording of each step makes it easy to find out where a letter is at any moment.\n" +
      "Why the change? Last year three important letters were lost, and finding them took weeks. We hope the new system will improve the reliability of our service.\n" +
      "Questions? Contact Burak Kurt, extension 214.",
    questions: [
      {
        text: "When does the sorting of the incoming mail start?",
        options: ["at eight", "at nine", "at three"],
        answer: 0,
        explain: "„The sorting of the incoming mail starts at eight and should be finished by nine.“",
      },
      {
        text: "Who files the enclosures?",
        options: ["the department that sends the letter", "the mail room", "Ms. Demir"],
        answer: 0,
        explain: "„The filing of the enclosure is done by the department that sends the letter, not by the mail room.“",
      },
      {
        kind: "truefalse",
        text: "Letters brought down after three in the afternoon leave the next day.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Bringing letters after three in the afternoon means that they will leave the next day.“",
      },
      {
        kind: "gapfill",
        text: "The sending of a certified letter is recorded in the new online ___.",
        options: [],
        answer: 0,
        accept: ["template"],
        explain: "„The sending of a certified letter is recorded in the new online template.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The sorting of the incoming mail starts at eight.",
          "The sending of a certified letter is recorded.",
          "Enclosures are filed by the department.",
          "The status of a letter can be checked online.",
        ],
        explain: "Gelen posta, giden posta, ekler, en sonda çevrimiçi durum takibi.",
      },
      {
        kind: "short_answer",
        text: "Who may sign for court papers?",
        options: [],
        answer: 0,
        accept: ["Ms. Demir and Mr. Kurt", "Demir and Kurt", "two people"],
        explain: "„Only two people, Ms. Demir and Mr. Kurt, may sign for them.“",
      },
    ],
  },
  {
    id: "en-b2-u23-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 23,
    title: "Parents sue over school closure",
    genre: "article",
    intro: "Okulun kapatılmasına karşı dava açan velilerle ilgili bir yerel haber. Neler kesin, neler yalnızca söyleniyor?",
    gloss: [
      { de: "a closure", tr: "kapatılma" },
      { de: "a court", tr: "mahkeme" },
      { de: "a reporter", tr: "muhabir" },
      { de: "file a case", tr: "dava açmak" },
      { de: "primary school", tr: "ilkokul" },
      { de: "proper", tr: "gerektiği gibi" },
      { de: "consultation", tr: "danışma" },
      { de: "a lawyer", tr: "avukat" },
      { de: "a hearing", tr: "duruşma" },
      { de: "comment", tr: "yorum yapmak" },
      { de: "citing", tr: "gerekçe göstererek" },
      { de: "confirm", tr: "doğrulamak" },
      { de: "a spokesperson", tr: "sözcü" },
      { de: "a district", tr: "ilçe" },
      { de: "a state law", tr: "eyalet yasası" },
      { de: "come into force", tr: "yürürlüğe girmek" },
      { de: "a council member", tr: "meclis üyesi" },
      { de: "judge", tr: "değerlendirmek" },
    ],
    minutes: 9,
    text:
      "PARENTS TAKE CITY TO COURT OVER SCHOOL CLOSURE\n" +
      "By Mina Arslan, city reporter\n" +
      "The fight over the closing of Hill Street Primary School has moved from the town hall to the courts. A group of forty parents is reported to have filed a case against the city last week, and the proceedings are thought to have started on Monday.\n" +
      "The city decided in March to close the school at the end of the year and send its 220 children to two larger schools across the river. Parents say the decision was taken without proper consultation. The city is said to have held only one public meeting, and that meeting is reported to have lasted less than an hour.\n" +
      "According to the parents' lawyer, Daniel Price, the case file is said to be complete, and a first hearing is expected to take place in November. Price would not comment on the details, citing confidentiality, but he confirmed that the families are asking the court to stop the closure until a new consultation has been held.\n" +
      "The position of the city is harder to judge. A spokesperson said only that the decision had been made in the interest of all children in the district. However, the legal basis for school closures is expected to change next year, when a new state law comes into force, and some council members are thought to prefer waiting for it.\n" +
      "For the families, the status of the case matters less than the calendar. „If the school closes in July, a decision in December will not help my daughter,“ said one mother, who asked not to be named.\n" +
      "The city has until October 15 to reply.",
    questions: [
      {
        text: "How many parents are reported to have filed the case?",
        options: ["forty", "twenty", "two hundred"],
        answer: 0,
        explain: "„A group of forty parents is reported to have filed a case against the city last week…“",
      },
      {
        text: "What are the families asking the court to do?",
        options: ["stop the closure for now", "build a new school", "pay the parents"],
        answer: 0,
        explain: "„the families are asking the court to stop the closure until a new consultation has been held.“",
      },
      {
        kind: "truefalse",
        text: "The city held several long public meetings.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The city is said to have held only one public meeting…“",
      },
      {
        kind: "gapfill",
        text: "According to the lawyer, the case file is said to be ___.",
        options: [],
        answer: 0,
        accept: ["complete"],
        explain: "„the case file is said to be complete…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Parents filed a case against the city.",
          "The city decided in March to close the school.",
          "A first hearing is expected in November.",
          "The city has until October 15 to reply.",
        ],
        explain: "Haber davayla açılıyor, kararın geçmişine dönüyor, avukatın sözlerini veriyor, son tarihle bitiyor.",
      },
      {
        kind: "short_answer",
        text: "When is the first hearing expected?",
        options: [],
        answer: 0,
        accept: ["in November", "November"],
        explain: "„a first hearing is expected to take place in November.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u23-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 23,
    title: "A phone call from Mom",
    genre: "dialogue",
    intro: "İki kardeş, yıllar önce boşanan anne babalarını konuşuyor. Anneleri dün akşam ne söylemiş?",
    gloss: [
      { de: "a divorce", tr: "boşanma" },
      { de: "a mediator", tr: "arabulucu" },
      { de: "exact", tr: "tam" },
      { de: "forgive", tr: "affetmek" },
      { de: "divorce", tr: "boşanmak" },
      { de: "probably", tr: "muhtemelen" },
      { de: "fight", tr: "kavga etmek" },
      { de: "lonely", tr: "yalnız" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Su", text: "Mom called last night. She said something I did not expect: if they had talked more, the divorce would never have happened." },
      { speaker: "Ali Rıza", text: "Twenty years later. Did she say why they did not talk?" },
      { speaker: "Su", text: "She said Dad was never at home. If he had been more reliable, she would have stayed." },
      { speaker: "Ali Rıza", text: "That is not fair. He worked two jobs because of us." },
      { speaker: "Su", text: "I know. And if the child support had been fair, Mom would be less angry now. She still talks about the money." },
      { speaker: "Ali Rıza", text: "Does she think custody would have been different if they had used a mediator?" },
      { speaker: "Su", text: "Maybe. Those were her exact words. If we had talked, custody would have been shared." },
      { speaker: "Ali Rıza", text: "We were eight and ten. If someone had asked us, we would have said that we wanted both of them." },
      { speaker: "Su", text: "Nobody asked. That is the part I still cannot forgive." },
      { speaker: "Ali Rıza", text: "I almost can. If they had not divorced, we would probably still be listening to them fight every night." },
      { speaker: "Su", text: "True. And you would not be living in Berlin now." },
      { speaker: "Ali Rıza", text: "Exactly. So let us call Mom this weekend, both of us. She sounds lonely." },
    ],
    questions: [
      {
        text: "Who called Su last night?",
        options: ["her mother", "her father", "a mediator"],
        answer: 0,
        explain: "„Mom called last night.“",
      },
      {
        text: "Why did the father work two jobs?",
        options: ["because of the children", "because he liked his work", "because of the divorce"],
        answer: 0,
        explain: "„He worked two jobs because of us.“",
      },
      {
        kind: "truefalse",
        text: "Nobody asked the children what they wanted.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nobody asked.“",
      },
      {
        kind: "gapfill",
        text: "If the child support had been fair, Mom would be less ___ now.",
        options: [],
        answer: 0,
        accept: ["angry"],
        explain: "„And if the child support had been fair, Mom would be less angry now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If we had talked, custody would have been shared.", "If we had talked, custody would have been shared"],
        explain: "Geçmişte olmayan bir koşul ve olmayan sonucu: „had“ + üçüncü hâl, „would have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "Where does the brother live now?",
        options: [],
        answer: 0,
        accept: ["in Berlin", "Berlin"],
        explain: "„And you would not be living in Berlin now.“",
      },
    ],
  },
  {
    id: "en-b2-u23-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 23,
    title: "A message from the kindergarten",
    genre: "monologue",
    intro: "Anaokulu öğretmeni bir anneye sesli mesaj bırakıyor. Emre'ye ne olmuş olabilir?",
    gloss: [
      { de: "a kindergarten", tr: "anaokulu" },
      { de: "serious", tr: "ciddi" },
      { de: "prefer", tr: "tercih etmek" },
      { de: "alone", tr: "yalnız başına" },
      { de: "laugh at", tr: "gülmek" },
      { de: "a drawing", tr: "resim" },
      { de: "mention", tr: "söz etmek" },
      { de: "look away", tr: "başını çevirmek" },
      { de: "tightly", tr: "sıkıca" },
      { de: "upset", tr: "üzgün" },
      { de: "a phase", tr: "dönem" },
      { de: "a sign", tr: "işaret" },
      { de: "happily", tr: "mutlu bir şekilde" },
      { de: "notice", tr: "fark etmek" },
      { de: "asleep", tr: "uykuda" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Mina", text: "Hello Mrs. Kaya, this is Mina from Sunflower Kindergarten. I am calling about Emre, and please do not worry, nothing serious has happened." },
      { speaker: "Mina", text: "Over the last two weeks Emre seems to have become much quieter. He still plays, but he seems to prefer playing alone, which is new for him." },
      { speaker: "Mina", text: "Apparently something happened on the bus last Monday. Another child told me that two older boys laughed at a drawing Emre had made." },
      { speaker: "Mina", text: "Emre has not said anything about it himself. But when the bus is mentioned, he looks away and holds his bag very tightly. It seems to be a nonverbal signal that he is upset." },
      { speaker: "Mina", text: "On balance, I do not think this is a big problem. Children his age often go through a quiet phase, and it is arguably a good sign that he still comes to school happily." },
      { speaker: "Mina", text: "Apparently he also told his grandmother on Friday that he does not want to take the bus anymore." },
      { speaker: "Mina", text: "So I would like to hear what you have noticed at home. Could we meet on Thursday after four? It would only take twenty minutes." },
      { speaker: "Mina", text: "Thank you, and have a nice evening." },
    ],
    questions: [
      {
        text: "What seems to have changed in Emre?",
        options: ["He has become quieter.", "He has become angry.", "He no longer comes to school."],
        answer: 0,
        explain: "„Over the last two weeks Emre seems to have become much quieter.“",
      },
      {
        text: "What happened on the bus?",
        options: ["Older boys laughed at his drawing.", "He lost his bag.", "He fell asleep."],
        answer: 0,
        explain: "„Another child told me that two older boys laughed at a drawing Emre had made.“",
      },
      {
        kind: "truefalse",
        text: "Mina thinks this is a big problem.",
        options: ["True", "False"],
        answer: 1,
        explain: "„On balance, I do not think this is a big problem.“",
      },
      {
        kind: "gapfill",
        text: "It seems to be a ___ signal that he is upset.",
        options: [],
        answer: 0,
        accept: ["nonverbal"],
        explain: "„It seems to be a nonverbal signal that he is upset.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Apparently something happened on the bus last Monday.", "Apparently something happened on the bus last Monday"],
        explain: "„Apparently“ bilginin başkasından geldiğini gösteriyor: öğretmen olayı kendisi görmemiş.",
      },
      {
        kind: "short_answer",
        text: "When does Mina want to meet?",
        options: [],
        answer: 0,
        accept: ["on Thursday", "Thursday after four", "Thursday"],
        explain: "„Could we meet on Thursday after four?“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u23-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 23,
    title: "The mail room",
    genre: "info",
    intro: "Ofisin posta odası için kayıt cümleleri kur, sonra yeni işleyişi özetleyen bir bilgi kartı doldur.",
    gloss: [
      { de: "the filing", tr: "dosyalanması" },
      { de: "the sending", tr: "gönderilmesi" },
      { de: "the sorting", tr: "ayıklanması" },
      { de: "is said to be", tr: "olduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İlişik belgenin dosyalanması bitti.",
        answer: "The filing of the enclosure is done.",
        hint: "„the“ varsa nesne „of“ ile bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Taahhütlü bir mektubun gönderilmesi kayda geçiyor.",
        answer: "The sending of a certified letter is recorded.",
        hint: "Aynı biçim; başlık dili böyle kuruluyor.",
      },
      {
        kind: "build",
        tr: "Gelen postanın ayıklanması sekizde başlıyor.",
        answer: "The sorting of the incoming mail starts at eight.",
        hint: "Üçüncü kayıt satırı, aynı iki parça.",
      },
      {
        kind: "build",
        tr: "Dava dosyasının tam olduğu söyleniyor.",
        answer: "The case file is said to be complete.",
        hint: "En zayıf aktarma: biri söyledi.",
      },
      {
        kind: "form",
        prompt: "Posta odası için bilgi kartını doldur.",
        facts: "Gelen postanın ayıklanması sekizde başlıyor ve dokuzda bitiyor; taahhütlü mektuplar çevrimiçi şablona kaydediliyor; ekleri mektubu gönderen birim dosyalıyor; mahkeme evrakını yalnız Demir ve Kurt imzalayabiliyor.",
        fields: [
          { label: "Sorting of the incoming mail", answer: "starts at eight", accept: ["at eight", "eight to nine"] },
          { label: "Sending of certified letters", answer: "recorded online", accept: ["recorded in the template", "in the online template"] },
          { label: "Filing of enclosures", answer: "done by the sending department", accept: ["the sending department", "the department"] },
          { label: "Court papers signed by", answer: "Ms. Demir and Mr. Kurt", accept: ["Demir and Kurt"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u23-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 23,
    title: "After the divorce",
    genre: "opinion",
    intro: "Boşanmanın ardından bir aile geçmişe bakıyor: ne olsaydı ne değişirdi, bugün ne görünüyor?",
    gloss: [
      { de: "would have been shared", tr: "paylaşılmış olurdu" },
      { de: "would be calm", tr: "sakin olurdu" },
      { de: "would have stayed", tr: "kalırdık" },
      { de: "a nonverbal signal", tr: "sözsüz işaret" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Konuşsaydık velayet paylaşılmış olurdu.",
        answer: "If we had talked, custody would have been shared.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Nafaka adil olsaydı aile şimdi sakin olurdu.",
        answer: "If the child support had been fair, the family would be calm now.",
        hint: "Karışık koşul: sonuç bu haftaya ait.",
      },
      {
        kind: "build",
        tr: "Güvenilir olsalardı kalırdık.",
        answer: "If they had been reliable, we would have stayed.",
        hint: "Yine kapalı; sitem gibi okunuyor.",
      },
      {
        kind: "build",
        tr: "Bu, sözsüz bir işaret gibi görünüyor.",
        answer: "It seems to be a nonverbal signal.",
        hint: "Tek çekince yeter.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre onu ses tonu taşıdı.",
        answer: "Apparently the tone of voice carried it.",
        hint: "Bildiriyor ve kaynağı üstlenmiyor.",
      },
    ],
  },
];
