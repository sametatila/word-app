import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 3 · Alışveriş ve fiyat (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: alışveriş konuşmasını izlemek, fiyat sormak. Hedef dilin kendi
 * zorlukları: sayılabilirlik (`much`/`many`, çoğul `-s`), `a`/`an` seçimi ve
 * `How much…?` kalıbı.
 *
 * ARALIKLI TEKRAR: `w03-g2` W2'nin `quantifier.much-many` hedefine soru
 * biçiminde dönüyor; `w03-g4` W1'in `article.indefinite` hedefini `a`/`an`
 * ayrımıyla sınıyor.
 *
 * SAYILABİLİRLİK BU HAFTANIN OMURGASI ve bunun sebebi iki anadilde de aynı:
 * ne Türkçede ne Almancada isim sayılabilirliği İngilizcedeki kadar sıkı
 * belirleyici — `bread`, `milk`, `money` üçü de çoğul almıyor ve bu üç öğrenci
 * için de sezgiye aykırı.
 */
export const EN_A1_W03: QuizWeek = {
  id: "en-a1-w03",
  course: "en",
  level: "A1",
  no: 3,
  theme: "Shopping",
  themeTr: "Alışveriş",
  canDo: ["A1.SPK.3", "A1.LS.2", "A1.RD.1", "A1.GR.1", "A1.GR.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Note",
      genreTr: "Not",
      title: "Shopping",
      body:
        "Today I go to the supermarket. I need bread, milk and water. " +
        "The bread costs 3 euros. The milk is cheap, only 1 euro. " +
        "I buy an egg and some cheese for breakfast. " +
        "The cheese is expensive, but I like it. " +
        "I have 20 euros. That is enough. " +
        "Then I go to the bookstore and buy a book.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "In the shop",
      genreTr: "Dükkânda",
      plays: 2,
      segments: [
        { speaker: "Anna", text: "Hello! How much is this book?" },
        { speaker: "Shop", text: "The book is 12 euros." },
        { speaker: "Anna", text: "That is expensive. And the card?" },
        { speaker: "Shop", text: "The card costs 2 euros." },
        { speaker: "Anna", text: "Good, I buy the card. I have only 10 euros." },
        { speaker: "Shop", text: "No problem. Thank you!" },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-a1-w03-r1",
      block: "read",
      ref: "t1",
      stem: "What is cheap?",
      options: ["The cheese", "The milk", "The book", "The bread"],
      answer: 1,
      why: "\"The milk is cheap, only 1 euro.\" Peynir için tam tersi yazıyor: `expensive`. Metin iki sıfatı da açıkça veriyor.",
      targets: ["reading.detail", "wordfield.price"],
    },
    {
      id: "en-a1-w03-r2",
      block: "read",
      ref: "t1",
      stem: "How much money does the person have?",
      options: ["3 euros", "1 euro", "20 euros", "12 euros"],
      answer: 2,
      why: "\"I have 20 euros.\" Öteki sayılar tek tek ürünlerin fiyatı — metinde birkaç sayı var ve yalnız biri cüzdandaki para.",
      targets: ["reading.detail", "wordfield.price"],
    },
    {
      id: "en-a1-w03-r3",
      block: "read",
      ref: "t1",
      stem: "Where does the person buy a book?",
      options: ["In the supermarket", "At school", "In the city", "In the bookstore"],
      answer: 3,
      why: "Son cümle: \"Then I go to the bookstore and buy a book.\" Süpermarket (`supermarket`) yiyecek içindi.",
      targets: ["reading.detail", "question.where"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-a1-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "How much is the book?",
      options: ["2 euros", "10 euros", "12 euros", "20 euros"],
      answer: 2,
      why: "\"The book is 12 euros.\" 2 euro kartın fiyatı, 10 euro Anna'nın parası — üç sayı da konuşmada geçiyor.",
      targets: ["listening.detail", "wordfield.price"],
    },
    {
      id: "en-a1-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "What does Anna buy?",
      options: ["The book", "The card", "Both", "Nothing"],
      answer: 1,
      why: "\"Good, I buy the card.\" Kitabı `expensive` bulup almıyor; kitaptan vazgeçtiğini doğrudan söylemiyor, fiyatı yorumlayarak belli ediyor.",
      targets: ["listening.inference", "verb.buy"],
    },
    {
      id: "en-a1-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "Why does Anna not buy the book?",
      options: ["It is expensive", "It is too small", "She has it", "The shop is closed"],
      answer: 0,
      why: "\"That is expensive\" diyor ve sonra yalnız 10 euro'su olduğunu ekliyor. Sebep iki cümleye yayılmış.",
      targets: ["listening.inference", "wordfield.price"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-a1-w03-g1",
      block: "grammar",
      stem: "___ is the bread?",
      options: ["How many", "How much", "How", "What many"],
      answer: 1,
      why: "Fiyat sorusu `How much…?` ile kurulur çünkü para sayılamaz. `How many` sayılabilir isimlerle kullanılır (how many books).",
      targets: ["question.how-much", "quantifier.much-many"],
    },
    {
      id: "en-a1-w03-g2",
      block: "grammar",
      stem: "How ___ books do you buy?",
      options: ["many", "much", "long", "big"],
      answer: 0,
      why: "`books` sayılabilir ve çoğul, o yüzden `many`. Bir önceki maddedeki `How much` para içindi — ayrım ismin sayılabilirliğinde.",
      targets: ["quantifier.much-many", "noun.countable"],
      byNative: {
        de: {
          options: ["many", "much", "long", "big"],
          answer: 0,
          why: "Almancada `wie viel` / `wie viele` ayrımı var ama günlük dilde ikisi de `wie viel` diye söylenebiliyor. İngilizcede ayrım zorunlu: sayılabilirse `many`.",
        },
      },
    },
    {
      id: "en-a1-w03-g3",
      block: "grammar",
      stem: "I need ___ water.",
      options: ["a", "an", "many", "some"],
      answer: 3,
      why: "`water` sayılamaz: ne `a` alır ne çoğul olur. Belirsiz bir miktar için `some` kullanılır.",
      targets: ["noun.uncountable", "article.indefinite"],
      byNative: {
        tr: {
          options: ["a", "an", "many", "some"],
          answer: 3,
          why: "Türkçede \"bir su\" denebiliyor, o yüzden `a water` doğru görünür. İngilizcede `water` sayılamaz ve belirsiz miktar `some` ile kurulur.",
        },
        de: {
          options: ["a", "an", "many", "some"],
          answer: 3,
          why: "Almancada `ein Wasser` günlük dilde söylenebiliyor (bir bardak su anlamında). İngilizcede `water` sayılamaz; `some water` denir.",
        },
      },
    },
    {
      id: "en-a1-w03-g4",
      block: "grammar",
      stem: "I buy ___ egg for breakfast.",
      options: ["an", "a", "the", "some"],
      answer: 0,
      why: "`an` ünlü SESLE başlayan sözcüklerden önce gelir: an egg, an hour. Yazıya değil sese bakılır.",
      targets: ["article.indefinite", "article.a-an"],
    },
    {
      id: "en-a1-w03-g5",
      block: "grammar",
      stem: "The book ___ 12 euros.",
      options: ["cost", "is cost", "costs", "costing"],
      answer: 2,
      why: "Özne üçüncü tekil (`the book`), o yüzden fiil `-s` alır: costs. W2'deki aynı kural, bu kez bir nesne öznesiyle.",
      targets: ["verb.3sg-s", "tense.present-simple"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-a1-w03-v1",
      block: "vocab",
      stem: "The book is not cheap, it is ___.",
      options: ["small", "new", "good", "expensive"],
      answer: 3,
      why: "`cheap`in karşıtı `expensive`. Öteki üç sıfat da kitabı anlatabilir ama cümle `not … , it is …` ile açık bir zıtlık kuruyor.",
      targets: ["wordfield.price", "adjective.opposite"],
    },
    {
      id: "en-a1-w03-v2",
      block: "vocab",
      stem: "I ___ bread and milk.",
      options: ["cost", "know", "buy", "come"],
      answer: 2,
      why: "`buy` satın almak; `cost` bir şeyin fiyatının olması demek ve öznesi ÜRÜN olur (\"the bread costs…\"), insan değil.",
      targets: ["verb.buy-cost", "wordfield.shopping"],
      byNative: {
        de: {
          options: ["cost", "know", "buy", "come"],
          answer: 2,
          why: "Almancada `kaufen`/`kosten` ayrımı aynı; tuzak sözcüklerin birbirine benzemesi. Özne insan ise `buy`, ürün ise `cost`.",
        },
      },
    },
    {
      id: "en-a1-w03-v3",
      block: "vocab",
      stem: "I have 20 euros. That is ___.",
      options: ["enough", "cheap", "expensive", "many"],
      answer: 0,
      why: "`enough` yeterli demek ve para için doğrudan kullanılır. `cheap`/`expensive` paranın değil ÜRÜNÜN niteliğidir — para pahalı olmaz.",
      targets: ["wordfield.quantity", "wordfield.price"],
    },
  ],
};
