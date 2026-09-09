import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler parti 1'den ayrı: deneme, podcast ve köşe yazısı. Üçü de ilgi
 * cümleleriyle yoğun; dil bilgisi tanımlayıcı ve açıklayıcı ilgi cümlesi.
 */
export const enB2P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The Building That Was Easier to Knock Down",
    genre: "Deneme",
    intro: "Eski binaların neden yıkıldığını sorgulayan bir deneme okuyacaksın: hesap nasıl kuruluyor, neyi dışarıda bırakıyor.",
    gloss: [
      { de: "demolish", tr: "yıkmak" },
      { de: "convert", tr: "dönüştürmek" },
      { de: "unpredictable", tr: "öngörülemez" },
      { de: "lend", tr: "borç vermek" },
      { de: "embodied", tr: "gömülü" },
      { de: "concrete", tr: "beton" },
      { de: "enlarge", tr: "büyütmek" },
      { de: "accounting", tr: "muhasebe" },
    ],
    minutes: 9,
    text:
      "THE BUILDING THAT WAS EASIER TO KNOCK DOWN\n\n" +
      "Every town has one: a solid, ordinary building from the nineteen sixties that everybody agrees is ugly " +
      "and nobody quite dares to defend. When it comes down, the reason given is almost always the same — " +
      "it was cheaper to demolish than to convert. That sentence sounds like a fact. It is a result.\n\n" +
      "Start with the numbers that are usually quoted. A conversion, which has to work around what is already " +
      "there, is unpredictable; a new build, which starts from an empty site, can be priced to the euro. " +
      "Banks, whose job is to dislike surprises, lend more easily against the second. So the comparison is not " +
      "between two costs. It is between a cost and a guess.\n\n" +
      "Then there is the part that appears in no column at all. A building that is demolished takes its " +
      "embodied carbon with it: the energy that was spent making the concrete, which was released decades ago " +
      "and can never be recovered. A study of forty projects in three countries found that a conversion which " +
      "is thirty per cent more expensive on paper is usually cheaper once that carbon is counted at any " +
      "realistic price.\n\n" +
      "None of this means that every old building should be kept. There are structures whose floors cannot " +
      "carry modern services and whose windows cannot be enlarged without taking the walls apart. Architects " +
      "who work in this field are the first to say so.\n\n" +
      "The point is narrower. When we say that a building was not worth saving, we usually mean that our way " +
      "of counting made it look that way. That is a decision about accounting, and decisions about accounting " +
      "can be changed — which is exactly what makes them worth arguing about.",
    questions: [
      {
        text: "What is the writer's main claim?",
        options: [
          "The cost comparison is shaped by how we count.",
          "Old buildings should almost always be kept.",
          "New buildings are always cheaper to build.",
        ],
        answer: 0,
        explain: "„That sentence sounds like a fact. It is a result“ ve son paragraf aynı şeyi söylüyor.",
      },
      {
        text: "Why do banks prefer a new build?",
        options: [
          "The price is more predictable.",
          "It is always cheaper in the end.",
          "It can be finished much faster.",
        ],
        answer: 0,
        explain: "„Banks, whose job is to dislike surprises, lend more easily against the second.“",
      },
      {
        kind: "truefalse",
        text: "The writer says that every old building should be saved.",
        options: ["True", "False"],
        answer: 1,
        explain: "„None of this means that every old building should be kept.“",
      },
      {
        kind: "gapfill",
        text: "The study looked at ___ projects in three countries.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„A study of forty projects in three countries found …“",
      },
      {
        kind: "short_answer",
        text: "What can never be recovered when a building is demolished?",
        options: [],
        answer: 0,
        accept: ["its embodied carbon", "the embodied carbon", "embodied carbon"],
        explain: "„A building that is demolished takes its embodied carbon with it … and can never be recovered.“",
      },
      {
        text: "What does the last paragraph suggest?",
        options: [
          "The rules of accounting can be argued about.",
          "Architects alone should make the decision.",
          "Demolition should be forbidden by law.",
        ],
        answer: 0,
        explain: "„… decisions about accounting can be changed — which is exactly what makes them worth arguing about.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Opt In or Opt Out?",
    genre: "Podcast",
    intro: "Bir podcast bölümünde varsayılan kuralın etkisi tartışılıyor: yasa ne kadar değiştiriyor, asıl darboğaz nerede.",
    gloss: [
      { de: "donor", tr: "bağışçı" },
      { de: "switch", tr: "geçmek" },
      { de: "coordinator", tr: "koordinatör" },
      { de: "bottleneck", tr: "darboğaz" },
      { de: "tick", tr: "işaretlemek" },
      { de: "renew", tr: "yenilemek" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Host", text: "This week: a change that costs almost nothing, takes one line of law, and divides people completely. Should organ donation be opt-out?" },
      { speaker: "Host", text: "In an opt-in country, you are not a donor unless you say yes. In an opt-out country, you are a donor unless you say no. My guest is Dr. Ines Wall, who has studied both systems for fifteen years." },
      { speaker: "Ines", text: "The first thing to say is that the effect is real but smaller than the headlines. Countries that switched saw an increase, but the ones which increased most were those that also paid for more coordinators in hospitals." },
      { speaker: "Host", text: "So the law is not the main thing?" },
      { speaker: "Ines", text: "The law is the thing that makes the conversation happen. In practice, families are still asked, and a family who has never discussed it will usually say no. That is the actual bottleneck, and it is not legal." },
      { speaker: "Host", text: "What about the objection that opt-out takes something away from people?" },
      { speaker: "Ines", text: "I take it seriously, and the answer depends on how easy it is to opt out." },
      { speaker: "Ines", text: "A system where you have to write a letter is not the same as one where you tick a box when you renew your driving license." },
      { speaker: "Ines", text: "If I could change one thing, it would not be the law. It would be that every adult is asked once, clearly, in a place where they are not in a hurry." },
      { speaker: "Host", text: "Next week: the same question about pensions, where the default has already been changed." },
    ],
    questions: [
      {
        text: "What is the difference between the two systems?",
        options: [
          "whether you are a donor unless you say no",
          "whether hospitals are paid for donations",
          "whether families can be asked at all",
        ],
        answer: 0,
        explain: "„In an opt-in country, you are not a donor unless you say yes. In an opt-out country, you are a donor unless you say no.“",
      },
      {
        text: "What does Ines say matters most in practice?",
        options: [
          "whether families have discussed it",
          "how the law itself is written",
          "how many hospitals a country has",
        ],
        answer: 0,
        explain: "„… a family who has never discussed it will usually say no. That is the actual bottleneck.“",
      },
      {
        kind: "truefalse",
        text: "Ines dismisses the objection to opt-out.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I take it seriously, and I think the answer depends on how easy it is to opt out.“",
      },
      {
        kind: "short_answer",
        text: "What does Ines call the actual bottleneck?",
        options: [],
        answer: 0,
        accept: ["the families", "family conversations", "the family talk"],
        explain: "„… a family who has never discussed it will usually say no. That is the actual bottleneck.“",
      },
      {
        kind: "dictation",
        text: "Sunucunun ara sorusunu duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["So the law is not the main thing?", "So the law is not the main thing"],
        explain: "„So the law is not the main thing?“ — düz cümle sırasıyla sorulmuş bir soru.",
      },
      {
        text: "What is next week's topic?",
        options: [
          "the default rule in pensions",
          "organ donation in other countries",
          "the rules for driving licences",
        ],
        answer: 0,
        explain: "„Next week: the same question about pensions, where the default has already been changed.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Who Pays for Free Returns?",
    genre: "Yorum yazısı",
    intro: "Bir gazete için kısa bir köşe yazısı yazacaksın; önce iki cümle kur, sonra yorumu yaz.",
    gloss: [
      { de: "parcel", tr: "koli" },
      { de: "charge", tr: "ücret almak" },
      { de: "hidden", tr: "gizli" },
      { de: "flat fee", tr: "sabit ücret" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Hiçbir şeyi geri göndermeyen müşteriler farkı ödüyor.",
        answer: "The customers who never send anything back pay the difference.",
        alternatives: ["Customers who never send anything back pay the difference."],
        hint: "Tanımlayıcı ilgi cümlesi virgülsüzdür ve hangi müşteriler olduğunu belirler.",
      },
      {
        kind: "build",
        tr: "Bahsettiğim mağaza artık iadeler için ücret alıyor.",
        answer: "The shop that I mentioned now charges for returns.",
        alternatives: ["The shop I mentioned now charges for returns."],
        hint: "İlgi zamiri nesne konumundaysa atılabilir: the shop (that) I mentioned.",
      },
      {
        kind: "free",
        prompt:
          "İnternetten alışverişte ücretsiz iade üzerine köşe yazısı yaz: gözlemini somut anlat, bedelini gerçekte kimin ödediğini göster, karşı tarafın en güçlü argümanını kabul et ve tek bir somut öneriyle bitir.",
        checklist: [
          "Somut bir örnekle ve rakamla başla",
          "Bedeli gerçekte kimin ödediğini göster",
          "En güçlü karşı argümanı hakkıyla anlat",
          "Ücret dışında somut bir öneriyle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Nothing online is really free.", tr: "İnternette hiçbir şey gerçekten bedava değil." },
          { de: "The argument for … is stronger than it looks.", tr: "… lehine argüman göründüğünden güçlü" },
          { de: "A charge that looks fair on paper …", tr: "Kâğıt üstünde adil görünen bir ücret …" },
          { de: "So the answer is not …, it is …", tr: "Yani cevap … değil, …" },
          { de: "The only reason we do not see them is …", tr: "Onları görmememizin tek nedeni …" },
        ],
        sample:
          "Nothing online is really free, and returns are the clearest example. A coat that is ordered in three " +
          "sizes and sent back in two has been driven twice, handled four times and, in about a quarter of " +
          "cases, never sold again. The customers who never send anything back pay the difference, quietly, in " +
          "the price of everything else.\n\n" +
          "The argument for keeping free returns is stronger than it looks. Buying clothes you cannot try on is " +
          "a gamble, and a fee would fall hardest on the people who cannot easily get to a shop: those who live " +
          "far out, those who work shifts, those who are not the size the industry designs for. A charge that " +
          "looks fair on paper is not fair on a Tuesday in a village.\n\n" +
          "So the answer is not a flat fee, it is information. The shop that I mentioned above now shows, on the " +
          "product page, how often each item is returned and why. Sales of the worst items fell by a third in " +
          "six months, and nobody had to be charged anything. Shops already know these numbers. The only reason " +
          "we do not see them is that nobody has been made to show them.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s2",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Whose Name on the Building?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki tarafı da tart, sonra kendi ölçütünü ayrıştırarak koy.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Kamu binalarına ve spor tesislerine sponsor adı verilmeli mi? İki tarafın da en güçlü argümanını söyle, sonra hangi durumda ne yapılması gerektiğini ayır.",
      bulletsTr: [
        "Soruyu para değil, sahiplik sorusu olarak kur",
        "Sponsorluk lehine en güçlü argümanı söyle",
        "Karşı tarafın en güçlü argümanını söyle",
        "Ölçütünü ayrıştırarak bitir: hangi bina, hangi kural",
      ],
      targets: [
        { de: "The question is usually asked as …, but it is really about …", tr: "Soru genelde … diye sorulur, oysa aslında … ile ilgili" },
        { de: "The strongest argument in favor is …", tr: "Lehinde en güçlü argüman …" },
        { de: "Against that, …", tr: "Buna karşı, …" },
        { de: "My criterion would be …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "The question is usually asked as a question about money, but it is really about who a building belongs " +
        "to. The strongest argument in favor is simple and I do not want to skip it: a name on a stand can pay " +
        "for the stand, and clubs that refuse sponsorship often end up charging their own members instead. " +
        "That is not a free choice; it is a different bill sent to poorer people. Against that, a name is not " +
        "just money. A hall that is named after a company teaches everybody who walks past it that public space " +
        "is for sale, and the sentence lasts longer than the contract, which is usually five years. " +
        "My criterion would be the difference between a room and an institution. Sell the name of a stand, a " +
        "scoreboard or a summer tournament for as long as you like. Do not sell the name of the building itself, " +
        "and never sell a name that already belongs to somebody, because the second time you sell it you are " +
        "not selling space, you are erasing a person.",
      rubricHint:
        "İki tarafın da en güçlü argümanı geçmeli ve sonuç tek bir ayrımla verilmeli; ilgi cümleleri beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g2",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "the man who, the day when",
    genre: "Kural",
    intro: "İki tür ilgi cümlesi vardır ve aralarındaki fark yalnız virgül değil, anlamın kendisidir.",
    focus: "Relative clauses: defining ve non-defining",
    gloss: [
      { de: "nurse", tr: "hemşire" },
      { de: "library", tr: "kütüphane" },
      { de: "publish", tr: "yayımlamak" },
      { de: "polite", tr: "kibar" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Türkçede önde, İngilizcede arkada",
        tr: "Türkçede tarif ismin önüne gelir: „yan komşuda oturan kadın“. İngilizcede ismin arkasına tam bir yan cümle eklenir ve bu cümle who, which, that, where ya da whose ile başlar.",
        examples: [
          { de: "The woman who lives next door is a nurse.", tr: "Yan komşuda oturan kadın hemşire." },
          { de: "This is the town where I grew up.", tr: "Burası büyüdüğüm kasaba." },
          { de: "That is the man whose car was stolen.", tr: "Arabası çalınan adam o." },
        ],
      },
      {
        heading: "Tanımlayıcı: virgülsüz",
        tr: "Hangi kişi ya da şeyden söz edildiğini belirleyen ilgi cümlesi virgül almaz. Burada „that“ kullanılabilir ve ilgi zamiri NESNE konumundaysa tümüyle atılabilir.",
        examples: [
          { de: "The book that I told you about is in the library.", tr: "Sana bahsettiğim kitap kütüphanede." },
          { de: "The film we saw last night was long.", tr: "Dün gece izlediğimiz film uzundu.", note: "zamir atılmış" },
          { de: "The people who work here are all volunteers.", tr: "Burada çalışanların hepsi gönüllü." },
        ],
      },
      {
        heading: "Açıklayıcı: virgüllü",
        tr: "Zaten belli olan bir şey hakkında ek bilgi veren ilgi cümlesi iki virgülle ayrılır. Burada „that“ KULLANILMAZ ve ilgi zamiri atılamaz. Cümleyi çıkarırsan geriye anlamlı bir cümle kalır.",
        examples: [
          { de: "My brother, who lives in Rome, is a teacher.", tr: "Roma'da yaşayan erkek kardeşim öğretmen.", note: "tek kardeş" },
          { de: "The report, which was published in March, is now online.", tr: "Mart'ta yayımlanan rapor artık internette." },
          { de: "Banks, whose job is to dislike surprises, are careful.", tr: "İşi sürprizlerden hoşlanmamak olan bankalar temkinlidir." },
        ],
      },
    ],
    questions: [
      {
        text: "The woman ___ lives next door is a nurse.",
        options: ["who", "which", "whose"],
        answer: 0,
        explain: "Kişi için „who“ kullanılır ve burada özne konumundadır.",
      },
      {
        text: "My brother, ___ lives in Rome, is a teacher.",
        options: ["who", "that", "which"],
        answer: 0,
        explain: "Virgüllü açıklayıcı cümlede „that“ kullanılmaz; kişi için „who“ gelir.",
      },
      {
        text: "This is the town ___ I grew up.",
        options: ["where", "which", "who"],
        answer: 0,
        explain: "Yer için „where“ kullanılır; „which“ olsaydı arkasından bir edat gerekirdi.",
      },
      {
        kind: "gapfill",
        text: "The book ___ I told you about is in the library.",
        options: [],
        answer: 0,
        accept: ["that", "which"],
        explain: "Tanımlayıcı cümlede nesne için „that“ ya da „which“ kullanılabilir.",
      },
      {
        kind: "gapfill",
        text: "That is the man ___ car was stolen.",
        options: [],
        answer: 0,
        accept: ["whose"],
        explain: "Sahiplik için „whose“ kullanılır ve hemen arkasından isim gelir.",
      },
      {
        kind: "gapfill",
        text: "The report, ___ was published in March, is now online.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "Virgüllü açıklayıcı cümlede nesne olmayan şeyler için „which“ gelir; „that“ olmaz.",
      },
      {
        kind: "gapfill",
        text: "The people ___ work here are all volunteers.",
        options: [],
        answer: 0,
        accept: ["who", "that"],
        explain: "Tanımlayıcı cümlede kişiler için „who“ ya da „that“ kullanılabilir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The", "man", "who", "called", "was", "polite"],
        explain: "İlgi cümlesi ismin hemen arkasına girer: The man who called was polite.",
      },
      {
        kind: "truefalse",
        text: "„My sister, that lives in Rome, is a teacher.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Virgüllü açıklayıcı cümlede „that“ kullanılmaz; doğrusu „who lives in Rome“.",
      },
      {
        kind: "truefalse",
        text: "„The film we saw last night was long.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Nesne konumundaki ilgi zamiri atılabilir; cümle doğru.",
      },
    ],
  },
];
