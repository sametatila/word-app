import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 16.
 *
 * Hücreyi YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `en-c1.ts` (parti 1), `en-c1-p6` … `p10` ve `data/content/SPEC.md`.
 *
 * Parti 16 eleştiri hattı: yayımlanmayan bir tiyatro eleştirisi üzerine blog
 * yazısı, olumsuz kitap eleştirisi basan bir editörle söyleşi, küçük bir
 * sahnedeki oyun için değerlendirme. Dil bilgisi mesafe için geçmiş ve
 * sürekli biçimler — I was wondering, I was hoping, we were going to ask,
 * I'd have thought: zaman değil kibarlık ve temkin.
 */
export const enC1P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r16",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The Review I Didn't Publish",
    genre: "blog",
    intro: "Bir eleştirmenin blog yazısı: yeni bir yazarın ilk oyunu için yazdığı olumsuz eleştiriyi neden göndermediği.",
    gloss: [
      { de: "to stage", tr: "sahnelemek" },
      { de: "audience", tr: "seyirci" },
      { de: "to collapse", tr: "çökmek" },
      { de: "verdict", tr: "hüküm" },
      { de: "to soften", tr: "yumuşatmak" },
      { de: "to owe", tr: "borçlu olmak" },
      { de: "established", tr: "köklü" },
      { de: "budget", tr: "bütçe" },
      { de: "notice", tr: "eleştiri yazısı" },
      { de: "venue", tr: "mekân" },
      { de: "specific", tr: "somut" },
      { de: "neutral", tr: "tarafsız" },
      { de: "permanent", tr: "kalıcı" },
      { de: "criticism", tr: "eleştiri" },
    ],
    minutes: 10,
    text:
      "The review I didn't publish\n\n" +
      "Last winter I saw a first play by a writer in her twenties, staged in a room above a pub for an " +
      "audience of about forty. It was not good. The second act collapsed, two of the characters spoke as if " +
      "they had been written by different people, and the ending explained what the play should have shown. " +
      "I wrote four hundred words saying so, and then I did not send them.\n\n" +
      "My editor would rather I had. Her view, which I respect, is that a critic who softens the verdict for " +
      "beginners is being unhelpful rather than kind: the audience is misled and the writer learns " +
      "nothing. Suppose a reader bought a ticket because of my silence; what would I owe them?\n\n" +
      "It is a strong argument, and for established companies I agree with it completely. A national theater " +
      "with a large budget can survive a bad notice, and it is high time some of them received a few more. " +
      "But a small production is in a different position. A review in a city paper may be the only public " +
      "record the play ever gets. If that record says only that it failed, it will be the first thing anyone " +
      "finds when they search for the writer's name, perhaps for years.\n\n" +
      "What I have settled on is a rule rather than a feeling. For a first work in a small venue, I review it " +
      "only if I can say something specific that is worth reading, good or bad. If all I have is a verdict, " +
      "I would rather write nothing than publish a verdict dressed up as criticism.\n\n" +
      "I am not sure the rule is right. It treats silence as neutral, and it is not: a play nobody writes " +
      "about is a play nobody goes to see. But it is time we admitted that a review does two jobs at once, " +
      "advice to readers and a permanent record about someone, and that the second one lasts much longer.",
    questions: [
      {
        text: "What was wrong with the play, according to the writer?",
        options: [
          "The actors forgot their lines.",
          "The second act collapsed.",
          "The room was too small for it.",
        ],
        answer: 1,
        explain: "İkinci perde çöktü, iki karakter farklı kişilerce yazılmış gibi konuştu, son gösterilmesi gerekeni anlattı.",
      },
      {
        text: "What is the editor's view?",
        options: [
          "Softening a verdict for beginners helps nobody.",
          "Beginners should never be reviewed.",
          "Only good plays deserve a review.",
        ],
        answer: 0,
        explain: "Seyirci yanıltılıyor, yazar da hiçbir şey öğrenmiyor.",
      },
      {
        kind: "truefalse",
        text: "The writer believes large theaters should be protected from bad reviews.",
        options: ["True", "False"],
        answer: 1,
        explain: "Tersine: „it is high time some of them received a few more“.",
      },
      {
        kind: "gapfill",
        text: "The play was staged for an audience of about ___ people.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„staged in a room above a pub for an audience of about forty“.",
      },
      {
        kind: "short_answer",
        text: "Besides advice to readers, what else is a review?",
        options: [],
        answer: 0,
        accept: ["a permanent record", "a record", "a permanent record about someone"],
        explain: "Eleştiri iki iş görüyor ve ikincisi, biri hakkındaki kalıcı kayıt, çok daha uzun sürüyor.",
      },
      {
        text: "What weakness in the rule does the writer admit?",
        options: [
          "It is too strict on large theaters.",
          "It is hard to apply to new writers.",
          "It treats silence as neutral.",
        ],
        answer: 2,
        explain: "Hakkında kimsenin yazmadığı bir oyuna kimse gitmiyor; sessizlik tarafsız değil.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l16",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "Why We Still Print Bad Reviews",
    genre: "interview",
    intro: "Bir gazetenin kitap editörüyle söyleşi: olumsuz eleştiri neden basılır, sınır nerede çizilir, ilk romanlar nasıl ele alınır.",
    gloss: [
      { de: "consequence", tr: "netice" },
      { de: "advertising", tr: "reklam" },
      { de: "to praise", tr: "övmek" },
      { de: "dull", tr: "sıkıcı" },
      { de: "to speculate", tr: "tahmin yürütmek" },
      { de: "moral", tr: "ahlaki" },
      { de: "brief", tr: "görev tanımı" },
      { de: "debut", tr: "ilk eser" },
      { de: "ambitious", tr: "iddialı" },
      { de: "savage", tr: "acımasız" },
      { de: "accurate", tr: "hatasız" },
      { de: "coverage", tr: "haber yeri" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Host", text: "Your books pages publish more negative reviews than any other paper in the country. Is that a policy?" },
      { speaker: "Mr Whitlow", text: "It's a consequence of one. We review what our readers are likely to buy, not what publishers would rather we noticed. Those books are often weaker than their advertising suggests." },
      { speaker: "Host", text: "Authors must hate you." },
      { speaker: "Mr Whitlow", text: "Some do. But a review that only ever praises is not a review. It's time the industry stopped treating every critical sentence as if it were an attack." },
      { speaker: "Mr Whitlow", text: "One novelist sent me a four-page letter. I printed a paragraph of it, because it made a fair point about our reviewer, and we corrected the review online." },
      { speaker: "Host", text: "Where do you draw the line?" },
      { speaker: "Mr Whitlow", text: "At personal remarks. A reviewer can say a book is dull. They can't speculate about why the author wrote it, or write as though the book were a moral failing." },
      { speaker: "Host", text: "And first novels?" },
      { speaker: "Mr Whitlow", text: "They get a separate column with a different brief: describe what the book is trying to do, then say whether it manages. Suppose a debut fails at something ambitious; that deserves careful words." },
      { speaker: "Host", text: "Has a review ever made you change the policy?" },
      { speaker: "Mr Whitlow", text: "Once. We ran a savage notice of a small press title that sold four hundred copies. It was accurate, and it was the only coverage the book ever got. Now we ask whether a review tells the whole story." },
    ],
    questions: [
      {
        text: "Which books does the paper choose to review?",
        options: [
          "the ones publishers promote most",
          "what readers are likely to buy",
          "mostly first novels",
        ],
        answer: 1,
        explain: "„We review what our readers are likely to buy, not what publishers would rather we noticed.“",
      },
      {
        text: "Where does Mr Whitlow draw the line?",
        options: [
          "at negative adjectives",
          "at reviews of famous authors",
          "at personal remarks",
        ],
        answer: 2,
        explain: "Kitabın sıkıcı olduğu söylenebilir; yazarın niyeti üzerine tahmin yürütülemez.",
      },
      {
        kind: "truefalse",
        text: "First novels are reviewed in a separate column with a different brief.",
        options: ["True", "False"],
        answer: 0,
        explain: "„They get a separate column with a different brief“.",
      },
      {
        kind: "gapfill",
        text: "The small press title sold four ___ copies.",
        options: [],
        answer: 0,
        accept: ["hundred"],
        explain: "„a small press title that sold four hundred copies“.",
      },
      {
        kind: "short_answer",
        text: "What must a first-novel review describe first?",
        options: [],
        answer: 0,
        accept: ["what the book attempts", "the book's aim", "what the book is trying to do", "what the book tries to do"],
        explain: "Önce kitabın ne yapmaya çalıştığı, sonra bunu başarıp başaramadığı.",
      },
      {
        text: "What question does the paper now ask?",
        options: [
          "whether a review tells the whole story",
          "whether the author is well known",
          "whether the book is expensive",
        ],
        answer: 0,
        explain: "Doğru ama tek haber olan bir eleştiri politikanın değişmesine yol açmış.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w16",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A Review of a Small Production",
    genre: "review",
    intro: "Küçük bir sahnedeki oyunu değerlendiriyorsun: önce iki cümle kur, sonra hem dürüst hem somut bir eleştiri yaz.",
    gloss: [
      { de: "revival", tr: "yeniden sahneleme" },
      { de: "director", tr: "yönetmen" },
      { de: "scene", tr: "sahne" },
      { de: "cast", tr: "oyuncu kadrosu" },
      { de: "playwright", tr: "oyun yazarı" },
      { de: "rehearsal", tr: "prova" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "On sezon eski oyunları sahneledikten sonra topluluğun artık risk almasının zamanı geldi.",
        answer: "After ten seasons of revivals, it is high time the company took a risk.",
        alternatives: ["It is high time the company took a risk after ten seasons of revivals."],
        hint: "„It is (high) time“ bugünkü bir isteği bildirir ama arkasından geçmiş zaman gelir: „took“.",
      },
      {
        kind: "build",
        tr: "Son sahnede yönetmenin seyirciye güvenmiş olmasını tercih ederdim.",
        answer: "In the final scene, I would rather the director had trusted the audience.",
        alternatives: ["I would rather the director had trusted the audience in the final scene."],
        hint: "„would rather“ + başka bir özne geçmiş zaman alır; geçmişteki bir şey için past perfect gelir.",
      },
      {
        kind: "free",
        prompt:
          "Küçük bir sahnedeki bir oyun için eleştiri yaz: oyunu ve mekânı kısaca tanıt, oyunun ne yapmaya çalıştığını söyle, işe yarayan bir şeyi ve yaramayan bir şeyi somut olarak anlat, kime önereceğini yaz.",
        checklist: [
          "Oyunu ve mekânı kısaca tanıt",
          "Oyunun ne yapmaya çalıştığını söyle",
          "İşe yarayan ve yaramayan birer şeyi somut anlat",
          "Kime önereceğini yaz",
        ],
        minWords: 160,
        phrases: [
          { de: "… is the kind of play that …", tr: "… , … türden bir oyun", en: "" },
          { de: "What it is trying to do is …", tr: "Yapmaya çalıştığı şey …", en: "" },
          { de: "It works best when …", tr: "En iyi … olduğunda işliyor", en: "" },
          { de: "I would rather the director had …", tr: "Yönetmenin … yapmış olmasını tercih ederdim", en: "" },
          { de: "Go if …; stay at home if …", tr: "… ise gidin; … ise evde kalın", en: "" },
        ],
        sample:
          "The Lighthouse Keeper's Daughter, now playing in the back room of the Anchor, is the kind of play " +
          "that small venues exist for: a first work, four actors, one set and a ninety-minute running time " +
          "without an interval.\n\n" +
          "What it is trying to do is ambitious. It tells the same evening three times, from the point of view " +
          "of three people who each believe they caused the accident at its center, and it asks the audience to " +
          "decide which account to trust.\n\n" +
          "It works best when it trusts that structure. The second version, told by the brother, is the finest " +
          "twenty minutes I have seen on a small stage this year, largely because the cast play it quietly, as " +
          "though nothing much were happening, and let the audience notice what has changed.\n\n" +
          "The ending is weaker. In the final scene, I would rather the director had trusted the audience; " +
          "instead a character steps forward and explains what we have just watched, as if the playwright were " +
          "afraid we had missed it. We had not.\n\n" +
          "Go if you enjoy work that asks something of you and are willing to forgive a first play its last five " +
          "minutes. Stay at home if you need every question answered before the lights come up.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s16",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Should Critics Go Easy on Beginners?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: acemilere karşı eleştirinin ölçüsünü tart ve bir ilke öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Eleştirmenler yeni başlayanlara karşı daha yumuşak mı olmalı? Konumunu söyle, karşı tarafın en güçlü gerekçesini kur, iki durumu birbirinden ayır ve uygulanabilir bir ilke öner.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Karşı tarafın en güçlü gerekçesini kur",
        "İki durumu birbirinden ayır",
        "Uygulanabilir bir ilke öner",
      ],
      targets: [
        { de: "I'd rather critics were honest, but honesty has more than one form.", tr: "Eleştirmenlerin dürüst olmasını isterim ama dürüstlüğün birden çok biçimi var." },
        { de: "The best case for being tougher is …", tr: "Daha sert olmanın en iyi gerekçesi …" },
        { de: "Suppose a review were the only record of …", tr: "Diyelim ki bir eleştiri … hakkındaki tek kayıt olsaydı" },
        { de: "It's time we treated … as …", tr: "…'i … olarak görmemizin zamanı geldi" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "I'd rather critics were honest, but honesty has more than one form, and the argument usually confuses " +
        "them. " +
        "The best case for being tougher is that a soft review is a quiet lie to the reader. Someone spends an " +
        "evening and a ticket on the strength of it, and the writer loses the one piece of outside judgement " +
        "they were going to get. " +
        "But the two situations are not the same. A large company has marketing, a budget and a dozen other " +
        "reviews; a bad notice is one voice among many. " +
        "Suppose a review were the only record of a first play in a small room. Then it is no longer just " +
        "advice to readers. It is the first result for the writer's name, perhaps for ten years. " +
        "So my principle would be this: be exactly as honest with beginners, but be more specific. " +
        "Say what the play was attempting, what worked and what did not, in terms the writer could use. " +
        "A verdict without reasons is harmless to a national theater and cruel to a beginner. " +
        "It's time we treated reviews of new work as part of how people learn the craft, rather than as if " +
        "they were a consumer warning.",
      rubricHint:
        "İki durumun ayrımı, karşı gerekçenin dürüstçe kurulması ve somut bir ilke beklenir; „I'd rather … were“, „Suppose … were“, „It's time we …“ gibi yapılar kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g16",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "I was wondering, I'd have thought",
    genre: "grammar",
    intro: "Geçmiş ve sürekli biçimler bazen zamanı değil mesafeyi anlatır: rica, öneri ya da görüş bir adım geriden, daha yumuşak gelir.",
    focus: "Mesafe için geçmiş ve sürekli biçimler: I was wondering, I was hoping, we were going to ask, I'd have thought — kibarlık ve temkin (gerçek dışı geçmiş ya da B2'deki gerçekleşmemiş plan değil)",
    gloss: [
      { de: "script", tr: "metin" },
      { de: "review", tr: "eleştiri" },
      { de: "act", tr: "perde" },
      { de: "scene", tr: "sahne" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "I was wondering, I was hoping: ricayı yumuşatmak",
        tr: "Bir ricayı şimdiki zamanla söylemek doğrudandır: „I wonder if you could …“. Geçmiş zaman („I wondered if …“) bir adım uzaklaştırır; geçmiş sürekli („I was wondering if …“) en yumuşak olanıdır, çünkü ricayı bitmemiş ve geri çekilebilir bir düşünce gibi sunar. Anlam bugündür, geçmiş değil. Aynı iş „hope“, „want“ ve „think“ ile de görülür.",
        examples: [
          { de: "I was wondering if you could send me the script.", tr: "Metni bana gönderebilir misiniz diye düşünüyordum.", note: "en yumuşak rica" },
          { de: "I was hoping you might see the second night.", tr: "İkinci geceyi görebileceğinizi umuyordum.", note: "hope: baskısız" },
          { de: "I wanted to ask about the ending.", tr: "Sonla ilgili bir şey sormak istiyordum.", note: "want: konuya giriş" },
        ],
      },
      {
        heading: "We were going to ask, I was thinking: öneriye yol açmak",
        tr: "B2'de „was going to“ gerçekleşmemiş bir planı anlatıyordu. Konuşmada aynı biçim bir isteği ya da öneriyi yumuşatarak açar: „We were going to ask whether you'd write a longer piece.“ Plan iptal edilmemiştir; konuşan soruyu kesin bir karar gibi değil, taslak gibi sunar. „I was thinking we could …“ da aynı işi görür.",
        examples: [
          { de: "We were going to ask whether you'd review the new play.", tr: "Yeni oyunun eleştirisini yazar mısınız diye soracaktık.", note: "yumuşak istek" },
          { de: "I was thinking we could run both reviews.", tr: "İki eleştiriyi de yayımlayabiliriz diye düşünüyordum.", note: "öneri" },
          { de: "Were you going to say something about the actors?", tr: "Oyuncular hakkında bir şey söyleyecek miydiniz?", note: "karşıdakine söz vermek" },
        ],
      },
      {
        heading: "I'd have thought, I would say: görüşü temkinle söylemek",
        tr: "„I'd have thought“ bir itirazı ya da şaşkınlığı yumuşatır: „I'd have thought the second act was the problem“ — bence sorun ikinci perdeydi, ama belki yanılıyorum. „I would say“ ve „I'd suggest“ de bir hükmü kesin olmaktan çıkarır. Bunlar koşul cümlesi değildir; arkalarında gizli bir „if“ aranmaz.",
        examples: [
          { de: "I'd have thought the second act was the problem.", tr: "Ben sorunun ikinci perde olduğunu düşünürdüm.", note: "yumuşak itiraz" },
          { de: "I would say the play is not quite finished.", tr: "Oyunun tam olarak bitmediğini söylerdim.", note: "temkinli hüküm" },
          { de: "I'd suggest cutting the final scene.", tr: "Son sahneyi çıkarmayı önerirdim.", note: "öneri" },
        ],
      },
    ],
    questions: [
      {
        text: "Which request is the most tentative?",
        options: [
          "I wonder if you could send the script.",
          "Could you send the script, please?",
          "I was wondering if you could send the script.",
        ],
        answer: 2,
        explain: "Geçmiş sürekli ricayı en fazla uzaklaştırır, bu yüzden en yumuşak olanıdır.",
      },
      {
        text: "“I was hoping you might come on Friday.” — When is the speaker hoping?",
        options: ["now", "last week", "before the play closed"],
        answer: 0,
        explain: "Geçmiş sürekli burada zamanı değil mesafeyi anlatır; umut bugündür.",
      },
      {
        text: "___ have thought the ending was the weakest part.",
        options: ["I'm", "I'd", "I've"],
        answer: 1,
        explain: "„I'd have thought“ bir görüşü temkinle, itiraz eder gibi söyler.",
      },
      {
        kind: "gapfill",
        text: "I was ___ if you could send me the script. (wonder)",
        options: [],
        answer: 0,
        accept: ["wondering"],
        explain: "„I was wondering if …“ en yumuşak rica kalıbıdır.",
      },
      {
        kind: "gapfill",
        text: "We were ___ to ask whether you'd review the new play.",
        options: [],
        answer: 0,
        accept: ["going"],
        explain: "„We were going to ask“ isteği taslak gibi, yumuşatarak açar.",
      },
      {
        kind: "gapfill",
        text: "I was ___ we could run both reviews. (think)",
        options: [],
        answer: 0,
        accept: ["thinking"],
        explain: "„I was thinking we could …“ bir öneriyi baskısız sunar.",
      },
      {
        kind: "gapfill",
        text: "I'd ___ thought the actors were the best part of it.",
        options: [],
        answer: 0,
        accept: ["have"],
        explain: "Kalıp „I'd have thought“: görüşü bir adım geriden söyler.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We were going", "to ask", "about", "the ending"],
        explain: "„were going to“ + mastar: yumuşatılmış bir soru girişi.",
      },
      {
        kind: "truefalse",
        text: "“I was wondering if you could help.” — Bu cümle geçmişteki bir düşünceyi anlatır.",
        options: ["True", "False"],
        answer: 1,
        explain: "Geçmiş sürekli burada bugünkü bir ricayı yumuşatır.",
      },
      {
        kind: "truefalse",
        text: "“I'd have thought the second act was the problem.” — Konuşan görüşünü yumuşatarak söylüyor.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I'd have thought“ itirazı kesin bir hüküm gibi değil, temkinli bir görüş gibi sunar.",
      },
    ],
  },
];
