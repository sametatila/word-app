import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 5 · Transfer (İngilizce kursu).
 *
 * SAF TEKRAR DEĞİL. W1–W4'ün hedefleri yeni bağlamlarda soruluyor: aynı kural,
 * başka cümle, başka metin türü. Aynı bağlamda tekrar sormak TANIMAYI ölçer,
 * yeni bağlamda sormak ÖĞRENMEYİ.
 *
 * Metin türü bilerek değişti: ilk dört hafta tanıtım/blog/not/betimleme gördü,
 * bu hafta bir MEKTUP — aynı dil, tanıdık olmayan çerçeve.
 *
 * Hiçbir madde yeni bir kural getirmiyor; yeni olan tek şey bağlam.
 */
export const EN_A1_W05: QuizWeek = {
  id: "en-a1-w05",
  course: "en",
  level: "A1",
  no: 5,
  theme: "A letter from London",
  themeTr: "Transfer — Londra'dan mektup",
  canDo: ["A1.SPK.1", "A1.RD.2", "A1.LS.4", "A1.GR.2", "A1.GR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Letter",
      genreTr: "Mektup",
      title: "Hello Tim!",
      body:
        "Hello Tim! I am in London now. " +
        "I live in a small room with a family. " +
        "I get up at 7 and go to school by bus. I learn English. " +
        "Then I go to the shop and buy bread and milk. That is not expensive. " +
        "Sometimes I meet friends in the city. The city is big and good. " +
        "How are you?",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Phone call",
      genreTr: "Telefon konuşması",
      plays: 2,
      segments: [
        { speaker: "Tim", text: "Hello! How are you in London?" },
        { speaker: "Nina", text: "Good, thank you. But I do not have much time." },
        { speaker: "Tim", text: "Why? What do you do?" },
        { speaker: "Nina", text: "I learn English and I work. I get up at 6." },
        { speaker: "Tim", text: "And where do you live?" },
        { speaker: "Nina", text: "With a family. My room is small, but the house is good." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-a1-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Where does the person live?",
      options: ["In a house alone", "With a family", "At school", "With friends"],
      answer: 1,
      why: "\"I live in a small room with a family.\" Arkadaşlar mektupta geçiyor ama şehirde buluşulan kişiler olarak, ev arkadaşı olarak değil.",
      targets: ["reading.detail", "preposition.with"],
    },
    {
      id: "en-a1-w05-r2",
      block: "read",
      ref: "t1",
      stem: "What does the person buy?",
      options: ["A book", "Coffee", "Bread and milk", "Nothing"],
      answer: 2,
      why: "\"Then I go to the shop and buy bread and milk.\" Alışveriş ve ürünler aynı cümlede bağlı.",
      targets: ["reading.detail", "wordfield.shopping"],
    },
    {
      id: "en-a1-w05-r3",
      block: "read",
      ref: "t1",
      stem: "How does the person go to school?",
      options: ["By bus", "By bicycle", "By train"],
      answer: 0,
      why: "\"I get up at 7 and go to school by bus.\" Kalkma saati ve araç aynı cümlede veriliyor.",
      targets: ["reading.detail", "wordfield.transport"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-a1-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "When does Nina get up?",
      options: ["At 7", "At 5", "At 6", "At 8"],
      answer: 2,
      why: "\"I get up at 6.\" Mektuptaki kişi 7'de kalkıyordu — iki ayrı kişi, iki ayrı saat; hangisinin sorulduğuna dikkat.",
      targets: ["listening.detail", "time.clock"],
    },
    {
      id: "en-a1-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Why does Nina not have much time?",
      options: ["She is sick", "She learns and works", "She lives far from work", "She has no bus"],
      answer: 1,
      why: "\"I learn English and I work.\" Sebep `why` sorusundan sonra geliyor ama `because` gibi bir bağlaçla işaretlenmiyor — iki cümleyi birleştirmek gerekiyor.",
      targets: ["listening.inference", "question.why"],
    },
    {
      id: "en-a1-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "How is Nina's room?",
      options: ["Big", "Small", "New", "Expensive"],
      answer: 1,
      why: "\"My room is small, but the house is good.\" `but` iki ayrı şeyi karşılaştırıyor: oda küçük, EV iyi — sıfatı yanlış özneye bağlamamak gerekiyor.",
      targets: ["listening.detail", "connector.but"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-a1-w05-g1",
      block: "grammar",
      stem: "My friend ___ English at school.",
      options: ["learn", "learns", "learning", "is learn"],
      answer: 1,
      why: "Üçüncü tekil öznede fiil `-s` alır: my friend learns. Kural W2, W3 ve W4'te üç ayrı biçimde geçti; burada dördüncü bağlamı.",
      targets: ["verb.3sg-s", "tense.present-simple"],
    },
    {
      id: "en-a1-w05-g2",
      block: "grammar",
      stem: "I ___ have much time.",
      options: ["am not", "not", "does not", "do not"],
      answer: 3,
      why: "Geniş zaman olumsuzu `do not` ile kurulur ve asıl fiil yalın kalır. `am not` yalnız `be` fiiliyle, `does not` üçüncü tekille.",
      targets: ["negation.do-not", "question.do-support"],
      byNative: {
        tr: {
          options: ["am not", "not", "does not", "do not"],
          answer: 3,
          why: "Türkçede olumsuzluk fiile ek olarak gelir (\"yok\", \"-me\"), ayrı bir yardımcı fiil yoktur. İngilizcede `do not` gerekiyor.",
        },
        de: {
          options: ["am not", "not", "does not", "do not"],
          answer: 3,
          why: "Almancada `nicht` doğrudan fiile eklenir (`Ich habe nicht viel Zeit`), o yüzden yalın `not` doğru görünür. İngilizcede `do` yardımcı fiili şart.",
        },
      },
    },
    {
      id: "en-a1-w05-g3",
      block: "grammar",
      stem: "Which sentence is correct?",
      options: [
        "I go sometimes to the city.",
        "I go to the city sometimes always.",
        "Sometimes I go to the city.",
        "I to the city sometimes go.",
      ],
      answer: 2,
      why: "Sıklık zarfı ya asıl fiilden önce (`I sometimes go`) ya da cümlenin başında (`Sometimes I go`) durur — fiilden hemen sonra gelmez.",
      targets: ["adverb.frequency", "word-order.adverb"],
      byNative: {
        de: {
          options: [
            "I go sometimes to the city.",
            "I go to the city sometimes always.",
            "Sometimes I go to the city.",
            "I to the city sometimes go.",
          ],
          answer: 2,
          why: "Almancada zarf fiilden sonra durur (`Ich gehe manchmal…`), o yüzden `I go sometimes…` doğru görünür. İngilizcede zarf fiilin önüne ya da cümlenin başına geçer.",
        },
      },
    },
    {
      id: "en-a1-w05-g4",
      block: "grammar",
      stem: "I buy ___ milk and ___ book.",
      options: ["some / a", "a / some", "an / a", "some / an"],
      answer: 0,
      why: "`milk` sayılamaz, belirsiz miktar `some` ister; `book` sayılabilir ve tekil, ünsüzle başladığı için `a`. W3'teki iki kural aynı cümlede.",
      targets: ["noun.uncountable", "article.a-an", "article.indefinite"],
    },
    {
      id: "en-a1-w05-g5",
      block: "grammar",
      stem: "___ are you from?",
      options: ["When", "Who", "Where", "How"],
      answer: 2,
      why: "Cevap bir ülke ya da şehir olduğuna göre soru sözcüğü `where`. W1'deki aynı kalıp; burada öteki soru sözcükleriyle birlikte sınanıyor.",
      targets: ["question.where-from", "question.words"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-a1-w05-v1",
      block: "vocab",
      stem: "The bread is not expensive, it is ___.",
      options: ["big", "new", "good", "cheap"],
      answer: 3,
      why: "`expensive`in karşıtı `cheap`. W3'te aynı çift ters yönden sorulmuştu — burada zıtlığın öteki ucu isteniyor.",
      targets: ["wordfield.price", "adjective.opposite"],
    },
    {
      id: "en-a1-w05-v2",
      block: "vocab",
      stem: "Sometimes I ___ friends in the city.",
      options: ["meet", "stand", "cost", "live"],
      answer: 0,
      why: "Biriyle buluşmak `meet`. `live` oturmak, `cost` fiyat bildirmek — ikisi de kişiyle kurulmaz.",
      targets: ["verb.meet", "wordfield.introduction"],
    },
    {
      id: "en-a1-w05-v3",
      block: "vocab",
      stem: "I get up ___ 7 and go to school.",
      options: ["in", "on", "at", "by"],
      answer: 2,
      why: "Saat `at` ile kurulur: at 7. W2'de `at 6 in the morning` olarak geçmişti; burada yalnız saat var.",
      targets: ["preposition.time", "time.clock"],
    },
  ],
};
