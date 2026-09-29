import type { SkillExercise } from "../types";

/**
 * EN · B1 · Ünite 25 — "Korkular, sırdaşlık, şükran, ileriye bakış".
 *
 * Dört ders: Fears and worries · What they told me · Being thankful ·
 * Where I want to be. Seviyenin kapanış ünitesi.
 *
 *   Kelime: face, dark, fight, danger, escape, win, lose, later,
 *           friendship, whisper, voice, loyal, respect, excuse, often,
 *           rarely, gift, appreciate, celebrate, generous, hero, example,
 *           word, always, direction, meaning, sense, follow, guide,
 *           develop, model, freedom.
 *   Kalıp:  I decided to face the fear. ·
 *           He avoids walking in the dark. ·
 *           She kept fighting the same worry. ·
 *           She said the friendship was over. ·
 *           He told me not to whisper about it. ·
 *           They asked whether I had heard his voice. ·
 *           The gift was chosen with care. ·
 *           Her work is appreciated by everyone. ·
 *           The day must be celebrated properly. ·
 *           I changed jobs in order to find a direction. ·
 *           The work had meaning; as a result, I stayed. ·
 *           Even though it makes sense, I hesitate.
 *
 * Ünitenin tek öğretme noktası AMAÇ, SONUÇ VE ÖDÜN ÜÇ AYRI İŞ: „in order
 * to“ nedeni öne koyuyor, „as a result“ yalnız geriye bakıyor, „even
 * though“ bir şeyi kabul edip yine de diyor. Yanlışını koyunca cümle
 * yine okunuyor — bu yüzden yakalanması en zor yanlış sınıfı.
 *
 * Ünite aynı zamanda SEVİYENİN KAPANIŞ İPİNİ söylüyor: B1 az sayıda yeni
 * biçim öğretti; öğrettiği şey bilinen biçimlerin İKİNCİ İŞİ oldu — „had“
 * anlatıda ve aktarmada, edilgen olayda haberde ve işleyişte, „must“
 * zorunlulukta ve çıkarımda, „will“ gelecekte ve kanaatte.
 */
export const enB1U25: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-u25-r1",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 25,
    title: "A job with meaning",
    genre: "blog",
    intro: "İş değiştiren birinin yazısı. Yeni teklif neden tereddüt yaratıyor?",
    gloss: [
      { de: "an accountant", tr: "muhasebeci" },
      { de: "earned", tr: "kazandım" },
      { de: "lead", tr: "yönetmek" },
      { de: "a charity", tr: "yardım kuruluşu" },
      { de: "refugees", tr: "mülteciler" },
      { de: "a pay cut", tr: "maaş kesintisi" },
      { de: "laws", tr: "yasalar" },
      { de: "responsibility", tr: "sorumluluk" },
      { de: "hesitate", tr: "tereddüt etmek" },
      { de: "success", tr: "başarı" },
      { de: "spreadsheets", tr: "hesap tabloları" },
    ],
    minutes: 8,
    text:
      "Two years ago I was an accountant in a big company. I earned well, and I was bored every single day.\n" +
      "I changed jobs in order to find a direction. I left the company in March and started working for a small charity that helps refugees find their first apartment. I took a pay cut of almost a third in order to do it.\n" +
      "The first months were hard. I did not know the laws, I made mistakes with the forms, and I worked most weekends. But the work had meaning; as a result, I stayed. Every week I met a family who had a key in their hands for the first time in years.\n" +
      "Now the charity has asked me to lead the office in another city. It is a good offer, and it makes sense: more money, more responsibility, a team of six. Even though it makes sense, I hesitate. In the new job I would manage people, not help families, and I would sit at a desk again.\n" +
      "My sister says I am afraid of success. My friend says I am afraid of spreadsheets. They may both be right.\n" +
      "I have until Friday to decide. Whatever I choose, I know one thing now: I work better when I can see why I am working.",
    questions: [
      {
        text: "Why did the writer leave the company?",
        options: ["to find a direction", "to earn more money", "to move to another city"],
        answer: 0,
        explain: "„I changed jobs in order to find a direction.“",
      },
      {
        text: "What does the charity do?",
        options: ["helps refugees find their first apartment", "trains accountants", "builds houses"],
        answer: 0,
        explain: "„started working for a small charity that helps refugees find their first apartment.“",
      },
      {
        kind: "truefalse",
        text: "The new offer would bring more money.",
        options: ["True", "False"],
        answer: 0,
        explain: "„more money, more responsibility, a team of six.“",
      },
      {
        kind: "gapfill",
        text: "I changed jobs ___ order to find a direction.",
        options: [],
        answer: 0,
        accept: ["in"],
        explain: "„I changed jobs in order to find a direction.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "I changed jobs in order to find a direction.",
          "The work had meaning; as a result, I stayed.",
          "Even though it makes sense, I hesitate.",
          "I have until Friday to decide.",
        ],
        explain: "İş değişikliği, kalma kararı, yeni teklif, en sonda son gün.",
      },
      {
        kind: "short_answer",
        text: "When does the writer have to decide?",
        options: [],
        answer: 0,
        accept: ["by Friday", "Friday", "until Friday"],
        explain: "„I have until Friday to decide.“",
      },
    ],
  },
  {
    id: "en-b1-u25-r2",
    course: "en",
    level: "B1",
    skill: "reading",
    unit: 25,
    title: "Goodbye to Mrs. Kaya",
    genre: "info",
    intro: "Okul bülteninde bir veda duyurusu. Parti nasıl hazırlanıyor?",
    gloss: [
      { de: "retiring", tr: "emekli oluyor" },
      { de: "properly", tr: "hakkıyla" },
      { de: "appreciated", tr: "takdir ediliyor" },
      { de: "held", tr: "düzenlenecek" },
      { de: "a band", tr: "müzik grubu" },
      { de: "the art class", tr: "resim sınıfı" },
      { de: "carried", tr: "taşınmalı" },
      { de: "a hall", tr: "salon" },
      { de: "a pair of hands", tr: "yardım eli" },
      { de: "speeches", tr: "konuşmalar" },
      { de: "a wish", tr: "dilek" },
    ],
    minutes: 7,
    text:
      "GOODBYE, MRS. KAYA\n" +
      "After thirty-two years at our school, Mrs. Kaya is retiring in June, and the day must be celebrated properly.\n" +
      "Her work is appreciated by everyone: by the students she taught to read, by the parents she called on Sunday evenings, and by the teachers who learned the job from her. Many of our teachers were once her students.\n" +
      "The party will be held in the school garden on Friday, 20 June, at three o'clock. Food is being made by the parents, and the music will be played by the school band.\n" +
      "The gift was chosen with care. For months, the students collected stories about Mrs. Kaya, and the art class turned them into a book. The book will be given to her at the party, together with a small tree for her garden.\n" +
      "Cards can be left at the office until Wednesday. If you would like to help, please speak to Mr. Demir. Chairs must be carried from the hall at two o'clock, and every pair of hands is appreciated.\n" +
      "Mrs. Kaya has asked for no speeches. She will not get her wish.",
    questions: [
      {
        text: "How long has Mrs. Kaya worked at the school?",
        options: ["thirty-two years", "twenty years", "three years"],
        answer: 0,
        explain: "„After thirty-two years at our school, Mrs. Kaya is retiring in June…“",
      },
      {
        text: "Who is making the food?",
        options: ["the parents", "the school band", "the art class"],
        answer: 0,
        explain: "„Food is being made by the parents, and the music will be played by the school band.“",
      },
      {
        kind: "truefalse",
        text: "Mrs. Kaya wants a lot of speeches.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Mrs. Kaya has asked for no speeches.“",
      },
      {
        kind: "gapfill",
        text: "The gift was ___ with care.",
        options: [],
        answer: 0,
        accept: ["chosen"],
        explain: "„The gift was chosen with care.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Mrs. Kaya is retiring in June.",
          "The party will be held in the school garden.",
          "The gift was chosen with care.",
          "Cards can be left at the office.",
        ],
        explain: "Veda, parti, hediye, en sonda kartlar.",
      },
      {
        kind: "short_answer",
        text: "Until when can cards be left at the office?",
        options: [],
        answer: 0,
        accept: ["until Wednesday", "Wednesday"],
        explain: "„Cards can be left at the office until Wednesday.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-u25-l1",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 25,
    title: "Walking home in the dark",
    genre: "dialogue",
    intro: "Karanlıkta eve yürümek. Derya korkusuyla nasıl yüzleşti?",
    gloss: [
      { de: "a map", tr: "harita" },
      { de: "a taxi", tr: "taksi" },
      { de: "crossed off", tr: "üstünü çizdi" },
      { de: "the route", tr: "güzergâh" },
      { de: "a worry", tr: "endişe" },
      { de: "the saying", tr: "söylemek" },
      { de: "as well", tr: "de" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Derya", text: "I decided to face the fear in March. That was easier to say than to do, and the saying took four months." },
      { speaker: "Onur", text: "What does facing it mean here?" },
      { speaker: "Derya", text: "Walking home. He avoids walking in the dark and I used to as well. The two of us made a small map of streets we would not use." },
      { speaker: "Onur", text: "Who is he?" },
      { speaker: "Derya", text: "My brother. He still avoids walking in the dark. He takes a taxi for five hundred meters." },
      { speaker: "Onur", text: "And your mother?" },
      { speaker: "Derya", text: "She kept fighting the same worry for two years. She called us every night at ten to check that we were home." },
      { speaker: "Onur", text: "Did the map help?" },
      { speaker: "Derya", text: "The map was the danger. Every street we crossed off made the next one worse, and by the summer there were three streets left." },
      { speaker: "Onur", text: "So you lost." },
      { speaker: "Derya", text: "I lost for a year and then I won a small thing: one street, once, in October. Later it was two. The fear did not go; it stopped choosing the route." },
    ],
    questions: [
      {
        text: "When did Derya decide to face the fear?",
        options: ["in March", "in October", "in the summer"],
        answer: 0,
        explain: "„I decided to face the fear in March.“",
      },
      {
        text: "How does Derya's brother travel at night?",
        options: ["by taxi", "on foot", "by bus"],
        answer: 0,
        explain: "„He takes a taxi for five hundred meters.“",
      },
      {
        kind: "truefalse",
        text: "The map was the danger.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The map was the danger.“",
      },
      {
        kind: "gapfill",
        text: "By the summer there were ___ streets left.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„by the summer there were three streets left.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["He avoids walking in the dark and I used to as well.", "He avoids walking in the dark and I used to as well"],
        explain: "„avoid“ „-ing“ istiyor; „avoid to walk“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "What did the fear stop doing?",
        options: [],
        answer: 0,
        accept: ["choosing the route", "it stopped choosing", "the route"],
        explain: "„The fear did not go; it stopped choosing the route.“",
      },
    ],
  },
  {
    id: "en-b1-u25-l2",
    course: "en",
    level: "B1",
    skill: "listening",
    unit: 25,
    title: "The end of a friendship",
    genre: "monologue",
    intro: "Biten bir dostluk. Cemre neyi anlatıyor, neye saygı duyuyor?",
    gloss: [
      { de: "sounds", tr: "gibi geliyor" },
      { de: "either", tr: "de" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "sentence", tr: "cümle" },
      { de: "argue", tr: "tartışmak" },
      { de: "believe", tr: "inanmak" },
      { de: "warm", tr: "sıcak" },
      { de: "relieved", tr: "rahatlamış" },
      { de: "an ending", tr: "bitiş" },
      { de: "stopped using", tr: "kullanmayı bıraktı" },
      { de: "in the first place", tr: "en baştan" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Cemre", text: "She said the friendship was over. We were in her kitchen, and she said it very quietly, as if she was talking about the weather." },
      { speaker: "Cemre", text: "We had been friends for fifteen years. We met at school, and we shared an apartment for three of those years." },
      { speaker: "Cemre", text: "He told me not to whisper about it. He is her brother, and he said it kindly, but I understood that everybody already knew." },
      { speaker: "Cemre", text: "Our friends asked whether I had heard it from her or from somebody else. From her, I said, and they looked relieved." },
      { speaker: "Cemre", text: "Loyal is a word I have stopped using. It sounds like a rule, and a friendship is not a rule; it is a hundred small hours." },
      { speaker: "Cemre", text: "There was an excuse and it was a good one. Good excuses are worse than bad ones, because you cannot argue with them and you cannot believe them either." },
      { speaker: "Cemre", text: "We speak rarely now. Twice a year, and both times it is warm and neither time is close." },
      { speaker: "Cemre", text: "What I respect is that she said it out loud. Most of these endings are never reported at all, because nobody ever says the sentence in the first place." },
    ],
    questions: [
      {
        text: "Where did she say that the friendship was over?",
        options: ["in her kitchen", "on the phone", "at school"],
        answer: 0,
        explain: "„We were in her kitchen, and she said it very quietly…“",
      },
      {
        text: "How long had they been friends?",
        options: ["fifteen years", "three years", "two years"],
        answer: 0,
        explain: "„We had been friends for fifteen years.“",
      },
      {
        kind: "truefalse",
        text: "Cemre still uses the word „loyal“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Loyal is a word I have stopped using.“",
      },
      {
        kind: "gapfill",
        text: "We speak ___ now. Twice a year.",
        options: [],
        answer: 0,
        accept: ["rarely"],
        explain: "„We speak rarely now. Twice a year…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["He told me not to whisper about it.", "He told me not to whisper about it"],
        explain: "Aktarılan olumsuz buyrukta „not“ mastarın ÖNÜNE geliyor.",
      },
      {
        kind: "short_answer",
        text: "What does Cemre respect?",
        options: [],
        answer: 0,
        accept: ["she said it out loud", "saying it out loud", "that she said it"],
        explain: "„What I respect is that she said it out loud.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-u25-w1",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 25,
    title: "A change of direction",
    genre: "opinion",
    intro: "İş değiştiren birinin notları. Cümleleri kur, kartı doldur.",
    gloss: [
      { de: "in order to", tr: "-mek için" },
      { de: "as a result", tr: "sonuç olarak" },
      { de: "even though", tr: "-e rağmen" },
      { de: "hesitate", tr: "tereddüt etmek" },
      { de: "an accountant", tr: "muhasebeci" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bir yön bulmak için iş değiştirdim.",
        answer: "I changed jobs in order to find a direction.",
        hint: "Amaç: neden önce geliyor, „in order to“ + mastar.",
      },
      {
        kind: "build",
        tr: "İşin bir anlamı vardı; sonuç olarak kaldım.",
        answer: "The work had meaning; as a result, I stayed.",
        hint: "Sonuç: „as a result“ yalnız geriye bakabiliyor.",
      },
      {
        kind: "build",
        tr: "Mantıklı olsa da tereddüt ediyorum.",
        answer: "Even though it makes sense, I hesitate.",
        hint: "Ödün: bir şeyi kabul ediyor, sonra yine de diyor.",
      },
      {
        kind: "build",
        tr: "Korkuyla yüzleşmeye karar verdim.",
        answer: "I decided to face the fear.",
        hint: "„decide“ mastar istiyor.",
      },
      {
        kind: "form",
        prompt: "İş değişikliği notunu doldur.",
        facts: "Yazar eskiden büyük bir şirkette muhasebeciydi; yön bulmak için bir yardım kuruluşuna geçti; iş anlamlı olduğu için kaldı; yeni teklife cumaya kadar karar verecek.",
        fields: [
          { label: "Old job", answer: "accountant", accept: ["an accountant", "accountant in a big company"] },
          { label: "Reason for the change", answer: "to find a direction", accept: ["in order to find a direction", "find a direction", "a direction"] },
          { label: "Why I stayed", answer: "the work had meaning", accept: ["meaning", "it had meaning", "the work had meaning, so I stayed"] },
          { label: "Decision by", answer: "Friday", accept: ["by Friday", "until Friday", "on Friday"] },
        ],
      },
    ],
  },
  {
    id: "en-b1-u25-w2",
    course: "en",
    level: "B1",
    skill: "writing",
    unit: 25,
    title: "Gifts, thanks and secrets",
    genre: "info",
    intro: "Veda partisi, teşekkür ve biten bir dostluk. Olanları anlatan cümleleri kur.",
    gloss: [
      { de: "was chosen", tr: "seçildi" },
      { de: "is appreciated", tr: "takdir ediliyor" },
      { de: "must be celebrated", tr: "kutlanmalı" },
      { de: "whisper", tr: "fısıldamak" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Armağan özenle seçildi.",
        answer: "The gift was chosen with care.",
        hint: "Fail yok, çünkü cümle armağanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Onun işi herkes tarafından takdir ediliyor.",
        answer: "Her work is appreciated by everyone.",
        hint: "Fail „by“ ile geri geliyor, çünkü haber o.",
      },
      {
        kind: "build",
        tr: "Gün gerektiği gibi kutlanmalı.",
        answer: "The day must be celebrated properly.",
        hint: "Kip ve edilgen: „must“ + „be“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Arkadaşlığın bittiğini söyledi.",
        answer: "She said the friendship was over.",
        hint: "Aktarılınca „is“ bir basamak geriye kayıyor.",
      },
      {
        kind: "build",
        tr: "Bana bu konuda fısıldamamamı söyledi.",
        answer: "He told me not to whisper about it.",
        hint: "„not“ mastarın ÖNÜNE geliyor.",
      },
    ],
  },
];
