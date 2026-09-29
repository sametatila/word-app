import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 4 — "İğneli yanıt, kısa cevap, tartışmanın kalıpları,
 * vurguyu kaydırmak".
 *
 * Dört ders: The barbed reply · The short answer ·
 * The phrases of debate · Shifting the stress.
 *
 *   Kelime: unscrupulous, virtuous, alarmism, patronize, incite, defame,
 *           stigmatize, electorate, nonpartisan, constituency, forfeit,
 *           internalize, invalidate, enshrine, comprehend, impair,
 *           polarize, idealize, glorify, stylize, romanticize, transcend,
 *           embody.
 *   Kalıp:  Not exactly scrupulous, are they? ·
 *           I wouldn't call that virtuous. ·
 *           Hardly alarmism, is it? ·
 *           Some serve the common good; others, themselves. ·
 *           The electorate would if it could. ·
 *           One committee is nonpartisan; the other is not. ·
 *           To resign oneself is to forfeit the argument. ·
 *           They internalize a rule they cannot invalidate. ·
 *           What we enshrine we rarely comprehend. ·
 *           What the debate does is polarize. ·
 *           Into the account creeps an urge to idealize. ·
 *           The past we glorify; the present we stylize.
 *
 * Ünitenin tek öğretme noktası AYNI „WHAT“ İKİ AYRI İŞ GÖRÜYOR. „What the
 * debate does IS polarize“ bir yarık cümle; „What we enshrine WE rarely
 * comprehend“ ise öne çıkarılmış bir nesne. İlk üç sözcük aynı ve okur
 * hangisi olduğunu ancak DÖRDÜNCÜ sözcükte anlıyor: „is“ geliyorsa yarık
 * cümle, özne geliyorsa öne çıkarma.
 */
export const enC1U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u04-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 4,
    title: "The museum and the factory",
    genre: "opinion",
    intro: "Kasaba müzesindeki yıl dönümü sergisi üzerine bir köşe yazısı. Yazar sergide neyin eksik olduğunu düşünüyor?",
    gloss: [
      { de: "grandchildren", tr: "torunlar" },
      { de: "fought for", tr: "için mücadele etti" },
      { de: "textiles", tr: "tekstil ürünleri" },
      { de: "struggle", tr: "zorlanmak" },
      { de: "a choir", tr: "koro" },
      { de: "medical", tr: "tıbbi" },
      { de: "decoration", tr: "süs" },
      { de: "history", tr: "tarih" },
      { de: "assume", tr: "varsaymak" },
      { de: "a parcel", tr: "koli" },
      { de: "pack", tr: "paketlemek" },
      { de: "an owner", tr: "sahip" },
      { de: "a strike", tr: "grev" },
      { de: "dust", tr: "toz" },
      { de: "a brass band", tr: "bando" },
      { de: "appear", tr: "görünmek" },
      { de: "a factory", tr: "fabrika" },
      { de: "textile", tr: "tekstil" },
      { de: "a crowd", tr: "kalabalık" },
      { de: "deserve", tr: "hak etmek" },
      { de: "an anniversary", tr: "yıl dönümü" },
      { de: "fiftieth", tr: "ellinci" },
      { de: "romanticize", tr: "romantikleştirmek" },
    ],
    minutes: 12,
    text:
      "THE FACTORY WE MISS AND THE ONE WE IGNORE\n" +
      "The town museum is celebrating its fiftieth anniversary with an exhibition called „Our Industrial Past“, and the line on opening day went around the block. It deserves the crowds. It also deserves a question.\n" +
      "What the exhibition does, with great skill, is romanticize. The old textile factory appears in soft old photographs: women laughing at their machines, children waiting at the gate, a brass band on the first of May. Into these rooms creeps an urge to idealize a place that, by most accounts, was loud, dangerous and badly paid.\n" +
      "What the photographs do not show is the dust. My grandmother worked there for nineteen years and coughed for the rest of her life. Her story is not in the exhibition, and neither are the strikes of 1971, when the owners closed the gates for three months.\n" +
      "The past we glorify; the present we hardly notice. Two kilometers from the museum stands a warehouse where four hundred people pack parcels through the night. Nobody photographs it, and nobody will open an exhibition about it in fifty years, or so we assume.\n" +
      "What we enshrine we rarely comprehend. A museum that only celebrates turns history into decoration, and decoration asks nothing of its visitors. What I would like the museum to add is one more room: letters, medical records, the voices of people who were glad when the factory closed.\n" +
      "None of this is an argument against the exhibition. What it gets right, it gets very right, and the section on the factory choir is moving. But a town that remembers only the good years will struggle to understand why its grandparents fought for the rights that its grandchildren now take for granted.\n" +
      "The exhibition runs until the end of November. Go, and then ask your oldest relative what it was really like.",
    questions: [
      {
        text: "What did the old factory make?",
        options: ["textiles", "machines", "parcels"],
        answer: 0,
        explain: "„The old textile factory appears in soft old photographs…“",
      },
      {
        text: "What happened in 1971?",
        options: ["The owners closed the gates for three months.", "The museum opened.", "The factory was sold."],
        answer: 0,
        explain: "„…the strikes of 1971, when the owners closed the gates for three months.“",
      },
      {
        kind: "truefalse",
        text: "The writer still thinks people should visit the exhibition.",
        options: ["True", "False"],
        answer: 0,
        explain: "„None of this is an argument against the exhibition.“",
      },
      {
        kind: "gapfill",
        text: "What the exhibition does, with great skill, is ___.",
        options: [],
        answer: 0,
        accept: ["romanticize"],
        explain: "„What the exhibition does, with great skill, is romanticize.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The line went around the block.",
          "The photographs show women laughing.",
          "A grandmother coughed for years.",
          "The writer asks for one more room.",
        ],
        explain: "Açılış, fotoğraflar, büyükannenin hikâyesi, en sonda yazarın önerisi.",
      },
      {
        kind: "short_answer",
        text: "How long did the grandmother of the writer work at the factory?",
        options: [],
        answer: 0,
        accept: ["nineteen years", "19 years", "nineteen"],
        explain: "„My grandmother worked there for nineteen years…“",
      },
    ],
  },
  {
    id: "en-c1-u04-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 4,
    title: "Young voters who stay home",
    genre: "opinion",
    intro: "Gençlerin sandığa gitmemesi üzerine bir köşe yazısı. Yazar oy kullanmayı neden savunuyor?",
    gloss: [
      { de: "rich", tr: "zengin" },
      { de: "registration", tr: "kayıt" },
      { de: "a teenager", tr: "ergen" },
      { de: "a leaflet", tr: "el ilanı" },
      { de: "represent", tr: "temsil etmek" },
      { de: "elect", tr: "seçmek" },
      { de: "simply", tr: "sadece" },
      { de: "a punishment", tr: "ceza" },
      { de: "concrete", tr: "somut" },
      { de: "harsh", tr: "sert" },
      { de: "neutral", tr: "tarafsız" },
      { de: "forfeit", tr: "kaybetmek" },
    ],
    minutes: 11,
    text:
      "STAYING HOME IS ALSO A VOTE\n" +
      "In the local election last year, fewer than half of the people in our city under thirty voted. When reporters asked why, the most common answer was some version of „it makes no difference“.\n" +
      "I understand the feeling. I do not accept the conclusion. To stay at home on election day is not to stay neutral; it is to let others decide for you. The result counts your silence as agreement.\n" +
      "To resign oneself is to forfeit the argument. That sounds harsh, so here is a concrete case. Two years ago the council cut the budget for night buses by a third. The areas that lost their buses were the areas where turnout was lowest. Nobody planned that as a punishment. Council members simply listened to the people who had elected them.\n" +
      "Some young voters tell me that no party represents them. That may be true, and it is a serious problem. But to vote for a small party is not to waste your vote. It shows the larger parties where votes are waiting, and they notice quickly. Others say that they do not know enough. To admit that is not to be excused from voting; the leaflets and the debates on local radio take about an hour to follow.\n" +
      "There are also people who cannot vote at all: residents without citizenship, and teenagers under eighteen. To speak for them is not the same as to be them, but those of us who have a vote can at least use it with them in mind.\n" +
      "The next election is on May 14. Registration closes three weeks earlier. To register takes ten minutes online. To complain afterward takes four years.",
    questions: [
      {
        text: "How many people under thirty voted last year?",
        options: ["fewer than half", "about a third", "almost all"],
        answer: 0,
        explain: "„…fewer than half of the people in our city under thirty voted.“",
      },
      {
        text: "Which areas lost their night buses?",
        options: ["the areas where turnout was lowest", "the richest areas", "the areas near the university"],
        answer: 0,
        explain: "„The areas that lost their buses were the areas where turnout was lowest.“",
      },
      {
        kind: "truefalse",
        text: "The writer thinks that voting for a small party wastes your vote.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But to vote for a small party is not to waste your vote.“",
      },
      {
        kind: "gapfill",
        text: "To resign oneself is to ___ the argument.",
        options: [],
        answer: 0,
        accept: ["forfeit"],
        explain: "„To resign oneself is to forfeit the argument.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Fewer than half of young people voted.",
          "The council cut the night buses.",
          "Some say no party represents them.",
          "The next election is on May 14.",
        ],
        explain: "Düşük katılım, otobüs örneği, itirazlar, en sonda seçim tarihi.",
      },
      {
        kind: "short_answer",
        text: "How long does it take to register online?",
        options: [],
        answer: 0,
        accept: ["ten minutes", "10 minutes"],
        explain: "„To register takes ten minutes online.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u04-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 4,
    title: "A flyer in every mailbox",
    genre: "dialogue",
    intro: "Posta kutularına bırakılan bir seçim broşürü. Aylin ve Cenk broşürün hangi kısmına inanıyor?",
    gloss: [
      { de: "poison", tr: "zehir" },
      { de: "east", tr: "doğu" },
      { de: "real", tr: "gerçek" },
      { de: "a court", tr: "mahkeme" },
      { de: "a capital letter", tr: "büyük harf" },
      { de: "shake hands", tr: "el sıkışmak" },
      { de: "a builder", tr: "inşaatçı" },
      { de: "a flyer", tr: "broşür" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Cenk", text: "Have you seen this? It was in every mailbox on our street this morning." },
      { speaker: "Aylin", text: "The flyer from the Citizens List? I read it on the stairs. Not exactly scrupulous, are they?" },
      { speaker: "Cenk", text: "They say the mayor took money from the builders of the new mall. Is there any proof?" },
      { speaker: "Aylin", text: "None that I can see. There is a photo of her shaking hands with a builder at an opening, and a headline in capital letters." },
      { speaker: "Cenk", text: "That could defame her, surely. She might take them to court." },
      { speaker: "Aylin", text: "She might. I wouldn't call that virtuous campaigning, whoever wins the case." },
      { speaker: "Cenk", text: "On the other hand, the second page is about the rent increases, and those are real." },
      { speaker: "Aylin", text: "True. Rents on the east side rose eighteen percent in two years. Hardly alarmism, is it?" },
      { speaker: "Cenk", text: "So the flyer is half fair and half poison." },
      { speaker: "Aylin", text: "Which is worse than all poison, because people believe the whole thing." },
      { speaker: "Cenk", text: "Should we write to the local paper?" },
      { speaker: "Aylin", text: "I would rather ask them a question at their meeting on Thursday: where is the proof?" },
      { speaker: "Cenk", text: "I will come with you. Seven o'clock at the community center?" },
      { speaker: "Aylin", text: "Seven o'clock. Bring the flyer." },
    ],
    questions: [
      {
        text: "Where did Cenk find the flyer?",
        options: ["in the mailbox", "on the stairs", "at the community center"],
        answer: 0,
        explain: "„It was in every mailbox on our street this morning.“",
      },
      {
        text: "What does the flyer say about the mayor?",
        options: ["She took money from builders.", "She raised the rents.", "She closed the mall."],
        answer: 0,
        explain: "„They say the mayor took money from the builders of the new mall.“",
      },
      {
        kind: "truefalse",
        text: "Rents on the east side have really gone up.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Rents on the east side rose eighteen percent in two years.“",
      },
      {
        kind: "gapfill",
        text: "Rents on the east side rose ___ percent in two years.",
        options: [],
        answer: 0,
        accept: ["eighteen", "18"],
        explain: "„Rents on the east side rose eighteen percent in two years.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "I wouldn't call that virtuous campaigning, whoever wins the case.",
          "I wouldn't call that virtuous campaigning, whoever wins the case",
          "I would not call that virtuous campaigning, whoever wins the case.",
        ],
        explain: "Olumsuz sıfatta değil, söyleme fiilinde.",
      },
      {
        kind: "short_answer",
        text: "When is the meeting?",
        options: [],
        answer: 0,
        accept: ["on Thursday", "Thursday", "Thursday at seven"],
        explain: "„…at their meeting on Thursday…“",
      },
    ],
  },
  {
    id: "en-c1-u04-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 4,
    title: "The stadium vote",
    genre: "monologue",
    intro: "Yerel radyoda stadyum oylaması üzerine bir yorum. Karar kimi memnun etti, kimi etmedi?",
    gloss: [
      { de: "a referendum", tr: "halk oylaması" },
      { de: "finance", tr: "finans" },
      { de: "a stadium", tr: "stadyum" },
      { de: "nonpartisan", tr: "tarafsız" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Nergis", text: "Last night the city council voted on the new stadium, and the result was closer than anyone expected: twenty-one to nineteen." },
      { speaker: "Nergis", text: "Some members voted for the fans; others, for the budget. The stadium will cost ninety million dollars, and the city will pay a third." },
      { speaker: "Nergis", text: "Two committees advised the council. One committee is nonpartisan; the other is not. Their reports did not agree." },
      { speaker: "Nergis", text: "The planning committee found that the stadium would create about six hundred jobs. The finance committee found fewer, and asked who would pay for the roads." },
      { speaker: "Nergis", text: "Most voters wanted a referendum. The electorate would have demanded one if it could, and many people I spoke to still would." },
      { speaker: "Nergis", text: "The mayor would not. She said a referendum would delay the project by a year and add to the cost." },
      { speaker: "Nergis", text: "Building starts in March. The club has promised cheaper tickets for local families; the city, a new bus line to the stadium." },
      { speaker: "Nergis", text: "Whether either promise is kept, we will find out in two years. I will be there on opening day, and I suspect most of you will too." },
    ],
    questions: [
      {
        text: "What was the result of the vote?",
        options: ["twenty-one to nineteen", "thirty to ten", "forty to nothing"],
        answer: 0,
        explain: "„…the result was closer than anyone expected: twenty-one to nineteen.“",
      },
      {
        text: "How much of the cost will the city pay?",
        options: ["a third", "all of it", "none of it"],
        answer: 0,
        explain: "„The stadium will cost ninety million dollars, and the city will pay a third.“",
      },
      {
        kind: "truefalse",
        text: "The two committees agreed on the number of jobs.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The finance committee found fewer, and asked who would pay for the roads.“",
      },
      {
        kind: "gapfill",
        text: "Building starts in ___.",
        options: [],
        answer: 0,
        accept: ["March"],
        explain: "„Building starts in March.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["One committee is nonpartisan; the other is not.", "One committee is nonpartisan; the other is not"],
        explain: "Eksik olan bir sıfat; iki yarı aynı biçimde kurulmuş.",
      },
      {
        kind: "short_answer",
        text: "What has the city promised?",
        options: [],
        answer: 0,
        accept: ["a new bus line", "a bus line", "new buses"],
        explain: "„The club has promised cheaper tickets for local families; the city, a new bus line to the stadium.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u04-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 4,
    title: "Myths about the past",
    genre: "opinion",
    intro: "Geçmişi yücelten sergiler üzerine notlar: cümleler ve bir yorum kartı.",
    gloss: [
      { de: "a factory", tr: "fabrika" },
      { de: "a strike", tr: "grev" },
      { de: "dust", tr: "toz" },
      { de: "romanticize", tr: "romantikleştirmek" },
      { de: "enshrine", tr: "güvence altına almak" },
      { de: "comprehend", tr: "idrak etmek" },
      { de: "polarize", tr: "kutuplaştırmak" },
      { de: "stylize", tr: "stilize etmek" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Güvence altına aldığımız şeyi nadiren idrak ederiz.",
        answer: "What we enshrine we rarely comprehend.",
        hint: "Öne çıkarılmış nesne: „what“ öbeğinden sonra „is“ değil, bir özne geliyor.",
      },
      {
        kind: "build",
        tr: "Tartışmanın yaptığı şey kutuplaştırmak.",
        answer: "What the debate does is polarize.",
        hint: "Yarık cümle: „what“ öbeğinden sonra „is“ geliyor.",
      },
      {
        kind: "build",
        tr: "Geçmişi yüceltiriz; bugünü stilize ederiz.",
        answer: "The past we glorify; the present we stylize.",
        hint: "İki nesne öne çıkmış; özne ile fiil yer değiştirmiyor.",
      },
      {
        kind: "build",
        tr: "Anlatıya idealleştirme dürtüsü sızıyor.",
        answer: "Into the account creeps an urge to idealize.",
        hint: "Uzun ve yeni olan özne sona gidiyor.",
      },
      {
        kind: "form",
        prompt: "Müze sergisi için yorum kartını doldur.",
        facts: "Müze ellinci yılını „Our Industrial Past“ sergisiyle kutluyor; sergi eski fabrikayı romantikleştiriyor; fabrikanın tozundan ve 1971 grevinden söz edilmiyor; yazar bir oda daha eklenmesini istiyor.",
        fields: [
          { label: "Exhibition", answer: "Our Industrial Past", accept: ["Our Industrial Past exhibition"] },
          { label: "What it does", answer: "romanticize the factory", accept: ["romanticize", "it romanticizes the factory"] },
          { label: "What is missing", answer: "the dust and the strike", accept: ["the dust", "the strike of 1971", "the 1971 strike"] },
          { label: "Request", answer: "one more room", accept: ["another room", "a new room"] },
        ],
      },

    ],
  },
  {
    id: "en-c1-u04-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 4,
    title: "Comments on politicians",
    genre: "opinion",
    intro: "Politikacılar hakkında iğneli ama kibar yorumlar.",
    gloss: [
      { de: "not exactly", tr: "tam da değil" },
      { de: "wouldn't call", tr: "demezdim" },
      { de: "hardly", tr: "pek de değil" },
      { de: "the common good", tr: "kamu yararı" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Tam da vicdanlı sayılmazlar, değil mi?",
        answer: "Not exactly scrupulous, are they?",
        hint: "Olumsuzla söylenen olumlu; soru eki odaya devrediyor.",
      },
      {
        kind: "build",
        tr: "Buna erdemli demezdim.",
        answer: "I wouldn't call that virtuous.",
        hint: "Olumsuz sıfatta değil, söyleme fiilinde.",
      },
      {
        kind: "build",
        tr: "Pek de felaket tellallığı sayılmaz, değil mi?",
        answer: "Hardly alarmism, is it?",
        hint: "„hardly“ zaten olumsuz; ikinci „not“ yok.",
      },
      {
        kind: "build",
        tr: "Kimi kamu yararına hizmet eder; kimi kendine.",
        answer: "Some serve the common good; others, themselves.",
        hint: "Virgül „serve“in yerini tutuyor.",
      },
      {
        kind: "build",
        tr: "Seçmen kitlesi yapabilse yapardı.",
        answer: "The electorate would if it could.",
        hint: "Sondaki boşluk: fiil bir önceki cümleden geliyor.",
      },
    ],
  },
];
