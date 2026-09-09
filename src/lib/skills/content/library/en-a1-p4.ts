import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: kısa haber, telefon siparişi ve küçük ilan. Söyleyiş odağı
 * bad/bed ayrımı; dil bilgisi can ve emir kipi.
 */
export const enA1P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r4",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "The Old Cinema Opens Again",
    genre: "article",
    intro: "Kasabanın eski sinemasının yeniden açıldığını duyuran kısa bir haber okuyacaksın.",
    gloss: [
      { de: "seat", tr: "koltuk" },
      { de: "ticket", tr: "bilet" },
      { de: "free", tr: "bedava" },
      { de: "comedy", tr: "komedi" },
      { de: "building", tr: "bina" },
      { de: "again", tr: "yeniden" },
    ],
    minutes: 4,
    text:
      "THE OLD CINEMA OPENS AGAIN\n\n" +
      "Good news for our town. The old cinema in Park Street opens again on the twelfth of March, after four years.\n\n" +
      "The building is the same, but inside everything is new: new seats, a new floor and a small café.\n\n" +
      "Tickets are seven euros. For children and students they are four euros. On Mondays all tickets are five euros.\n\n" +
      "The first film is a comedy from nineteen fifty-four. It starts at eight in the evening. " +
      "Coffee and cake are free on the first day.\n\n" +
      "The cinema is open every day from four to eleven.",
    questions: [
      {
        text: "What is the news?",
        options: ["An old cinema opens again.", "A new cinema is very expensive.", "The cinema closes in March."],
        answer: 0,
        explain: "Başlık ve ilk cümle aynı şeyi söylüyor: dört yıl sonra yeniden açılıyor.",
      },
      {
        text: "How much is a ticket for a student?",
        options: ["four euros", "seven euros", "five euros"],
        answer: 0,
        explain: "„For children and students they are four euros.“ Yedi euro normal fiyat, beş euro pazartesi fiyatı.",
      },
      {
        kind: "truefalse",
        text: "Tickets are cheaper on Mondays than on other days.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Tickets are seven euros … On Mondays all tickets are five euros.“",
      },
      {
        kind: "gapfill",
        text: "The cinema opens on the ___ of March.",
        options: [],
        answer: 0,
        accept: ["twelfth", "12th", "12"],
        explain: "„… opens again on the twelfth of March, after four years.“",
      },
      {
        kind: "short_answer",
        text: "What is free on the first day?",
        options: [],
        answer: 0,
        accept: ["coffee and cake", "coffee and cake are free", "cake and coffee"],
        explain: "„Coffee and cake are free on the first day.“",
      },
      {
        text: "When is the cinema open?",
        options: ["every day from four to eleven", "only on Mondays", "only in the evening at eight"],
        answer: 0,
        explain: "„The cinema is open every day from four to eleven.“ Saat sekiz ilk filmin saati.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l4",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "Two Pizzas, Please",
    genre: "phone",
    intro: "Telefonla yemek siparişi veren birini dinleyeceksin: ne istiyor, ne kadar tutuyor, ne zaman geliyor.",
    gloss: [
      { de: "order", tr: "ısmarlamak" },
      { de: "cheese", tr: "peynir" },
      { de: "mushroom", tr: "mantar" },
      { de: "bottle", tr: "şişe" },
      { de: "address", tr: "adres" },
      { de: "ready", tr: "hazır" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Shop", text: "Bella Pizza, good evening." },
      { speaker: "Kaan", text: "Good evening. I would like to order two pizzas, please." },
      { speaker: "Shop", text: "Of course. Which ones?" },
      { speaker: "Kaan", text: "One with cheese and tomato, and one with mushrooms. Both big, please." },
      { speaker: "Shop", text: "Big cheese and tomato, big mushroom. Anything to drink?" },
      { speaker: "Kaan", text: "Yes, two bottles of water. How much is it?" },
      { speaker: "Shop", text: "That is twenty-six euros fifty. What is your address?" },
      { speaker: "Kaan", text: "Rose Street fourteen, second floor. The name is Kaan." },
      { speaker: "Shop", text: "Thank you. It comes in forty minutes. Please have the money ready." },
      { speaker: "Kaan", text: "Great, thank you. Goodbye!" },
    ],
    questions: [
      {
        text: "What does Kaan order?",
        options: ["two pizzas and water", "one pizza and a salad", "two pizzas and coffee"],
        answer: 0,
        explain: "„… two pizzas, please“ ve sonra „two bottles of water“.",
      },
      {
        text: "How much is it?",
        options: ["twenty-six euros fifty", "twenty euros fifty", "sixteen euros fifty"],
        answer: 0,
        explain: "„That is twenty-six euros fifty.“",
      },
      {
        kind: "truefalse",
        text: "Kaan orders one small pizza.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Both big, please.“ — ikisi de büyük.",
      },
      {
        kind: "short_answer",
        text: "When does the food come?",
        options: [],
        answer: 0,
        accept: ["in forty minutes", "forty minutes", "in 40 minutes"],
        explain: "„It comes in forty minutes.“",
      },
      {
        kind: "dictation",
        text: "Dükkânın son ricasını duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Please have the money ready.", "Please have the money ready"],
        explain: "„Please have the money ready.“ — emir cümlesi özne almaz.",
      },
      {
        text: "What is on the second pizza?",
        options: ["mushrooms", "cheese and tomato", "only cheese"],
        answer: 0,
        explain: "„One with cheese and tomato, and one with mushrooms.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w4",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "Winter Boots for Sale",
    genre: "ad",
    intro: "Dolabını boşaltıyorsun; önce iki cümle kur, sonra bir eşyanı satmak için küçük bir ilan yaz.",
    gloss: [
      { de: "size", tr: "beden" },
      { de: "coat", tr: "palto" },
      { de: "warm", tr: "sıcak tutan" },
      { de: "pick up", tr: "gelip almak" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Botlar bir yaşında ve çok sıcak tutuyor.",
        answer: "The boots are one year old and very warm.",
        alternatives: ["The boots are very warm and one year old."],
        hint: "Yaş için „be … year(s) old“ kalıbı kullanılır; sıfatlar „and“ ile bağlanır.",
      },
      {
        kind: "build",
        tr: "Onları cumartesi günü gelip alabilirsin.",
        answer: "You can pick them up on Saturday.",
        alternatives: ["On Saturday you can pick them up."],
        hint: "„pick up“ ayrılabilir bir fiildir; zamir kullanılırsa mutlaka araya girer: pick them up.",
      },
      {
        kind: "free",
        prompt:
          "Bir eşyanı satmak için küçük ilan yaz: ne satıyorsun, nasıl görünüyor, kaç yaşında ve ne durumda, fiyatı ne, alıcı onu ne zaman ve nereden alabilir.",
        checklist: [
          "Ne sattığını ve nasıl göründüğünü yaz",
          "Yaşını ve durumunu söyle",
          "Fiyatı yaz",
          "Alma zamanını, yerini ve iletişimi yaz",
        ],
        minWords: 25,
        phrases: [
          { de: "For sale: …", tr: "Satılık: …" },
          { de: "It is … years old.", tr: "… yaşında." },
          { de: "The price is … euros.", tr: "Fiyatı … euro." },
          { de: "You can pick it up on …", tr: "… günü gelip alabilirsin." },
          { de: "Please write me a message!", tr: "Lütfen bana mesaj yaz!" },
        ],
        sample:
          "For sale: winter boots, size thirty-eight, and a black coat, size M. The boots are brown and one year old, " +
          "the coat is two years old. Both are warm and clean. The boots are twenty euros, the coat is thirty euros. " +
          "Together forty-five. You can pick them up on Saturday between ten and six. I live in Rose Street fourteen. " +
          "Please write me a message!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s4",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "bad or bed?",
    genre: "pronounce",
    intro: "Türkçede tek bir e sesi var; İngilizcede ise açık „a“ ile kapalı „e“ iki ayrı sestir ve kelimeyi değiştirir.",
    gloss: [
      { de: "bag", tr: "çanta" },
      { de: "bed", tr: "yatak" },
      { de: "hand", tr: "el" },
      { de: "pen", tr: "kalem" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "This bag is very bad.",
        tr: "Bu çanta çok kötü.",
        hint: "„bag“ ve „bad“ geniş bir sesle: ağzını aç, dilini indir — a ile e arası.",
        confusions: [
          { heard: ["This beg is very bed"], fix: "Ağzını daha çok aç; kapalı e söylersen „beg“ ve „bed“ olur.", expected: "bag" },
        ],
      },
      {
        de: "Send me ten letters.",
        tr: "Bana on mektup gönder.",
        hint: "„send“, „ten“ ve „letters“ üçünde de kapalı e: ağız daha kapalı, ses kısa.",
        confusions: [
          { heard: ["Sand me tan latters"], fix: "Burada geniş a yok; ağzını fazla açma: send, ten.", expected: "send" },
        ],
      },
      {
        de: "I sat on the bed.",
        tr: "Yatağa oturdum.",
        hint: "„sat“ geniş, „bed“ kapalı. İki ses aynı cümlede yan yana.",
        confusions: [
          { heard: ["I set on the bad"], fix: "„sat“ açık ağızla, „bed“ kapalı ağızla; ikisini takas etme.", expected: "sat" },
        ],
      },
      {
        de: "My hand is red.",
        tr: "Elim kırmızı.",
        hint: "„hand“ geniş a, „red“ kapalı e. Sondaki d ikisinde de duyulur.",
        confusions: [
          { heard: ["My hend is rad"], fix: "İlkinde ağzı aç, ikincisinde kapat: hand, red.", expected: "hand" },
        ],
      },
      {
        de: "Can you catch the pen?",
        tr: "Kalemi yakalayabilir misin?",
        hint: "„can“ ve „catch“ geniş; „pen“ kapalı.",
        confusions: [
          { heard: ["Ken you ketch the pan"], fix: "İlk iki kelimede ağız açık, sondaki „pen“de kapalı.", expected: "catch" },
        ],
      },
      {
        de: "The man is at the desk.",
        tr: "Adam masada.",
        hint: "„man“ ve „at“ geniş; „desk“ kapalı e.",
        confusions: [
          { heard: ["The men is at the dask"], fix: "„man“ tekil ve geniş sesli; „men“ çoğul ve kapalı sesli.", expected: "man" },
        ],
      },
      {
        de: "Sally has seven cats.",
        tr: "Sally'nin yedi kedisi var.",
        hint: "„Sally“, „has“ ve „cats“ geniş; „seven“ kapalı.",
        confusions: [
          { heard: ["Selly hes seven kets"], fix: "Üç kelimede ağzını aç, yalnız „seven“de kapat.", expected: "cats" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g4",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "can, can't and orders",
    genre: "grammar",
    intro: "Yetenek ve izin için tek bir kelime yeter; rica ve emirde ise fiil hiç değişmez.",
    focus: "can / can't ve emir kipi",
    gloss: [
      { de: "swim", tr: "yüzmek" },
      { de: "drive", tr: "araba kullanmak" },
      { de: "guitar", tr: "gitar" },
      { de: "door", tr: "kapı" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "can hiç değişmez",
        tr: "Türkçede yetenek fiile ek olarak girer: yüz-ebil-irim. İngilizcede ayrı bir kelime gelir: can. Bu kelime hiçbir kişide değişmez — üçüncü tekilde bile -s almaz — ve arkasından gelen fiil yalın kalır.",
        examples: [
          { de: "I can swim.", tr: "Yüzebilirim." },
          { de: "She can swim very well.", tr: "Çok iyi yüzebiliyor.", note: "„cans“ olmaz" },
          { de: "He can play the guitar.", tr: "Gitar çalabiliyor.", note: "„can to play“ olmaz" },
        ],
      },
      {
        heading: "Olumsuz, soru ve rica",
        tr: "Olumsuzda „cannot“ ya da kısa biçim „can't“ kullanılır. Soruda „can“ başa geçer: Can you …? Aynı yapı hem yeteneği hem izni hem de kibar ricayı anlatır.",
        examples: [
          { de: "I can't drive a car.", tr: "Araba kullanamıyorum." },
          { de: "Can I sit here?", tr: "Buraya oturabilir miyim?", note: "izin" },
          { de: "Can you open the window, please?", tr: "Pencereyi açar mısın, lütfen?", note: "rica" },
        ],
      },
      {
        heading: "Emir kipi: yalın fiil",
        tr: "Emir ve yönergede özne yazılmaz ve fiil yalın hâliyle başta durur: Come in. Olumsuz için başa „Don't“ gelir: Don't be late. Nazikleştirmek için „please“ eklenir.",
        examples: [
          { de: "Come in and sit down.", tr: "İçeri gel ve otur." },
          { de: "Don't forget your ticket.", tr: "Biletini unutma." },
          { de: "Please close the door.", tr: "Lütfen kapıyı kapat." },
        ],
      },
    ],
    questions: [
      {
        text: "She ___ swim very well.",
        options: ["can", "cans", "can to"],
        answer: 0,
        explain: "„can“ üçüncü tekilde de değişmez ve arkasından yalın fiil gelir.",
      },
      {
        text: "___ you open the window, please?",
        options: ["Can", "Do", "Are"],
        answer: 0,
        explain: "Rica „Can you …?“ ile kurulur; ayrı bir yardımcı fiil gerekmez.",
      },
      {
        text: "___ late!",
        options: ["Don't be", "Not be", "No be"],
        answer: 0,
        explain: "Olumsuz emir „Don't“ ile başlar ve arkasından yalın fiil gelir.",
      },
      {
        kind: "gapfill",
        text: "I ___ (not / drive) a car.",
        options: [],
        answer: 0,
        accept: ["can't drive", "cannot drive"],
        explain: "Olumsuz biçim can't ya da cannot; asıl fiil yalın kalır.",
      },
      {
        kind: "gapfill",
        text: "___ (come) in and sit down.",
        options: [],
        answer: 0,
        accept: ["Come", "come"],
        explain: "Emir kipinde özne yazılmaz ve fiil yalın hâliyle başta durur.",
      },
      {
        kind: "gapfill",
        text: "My brother ___ play the guitar very well.",
        options: [],
        answer: 0,
        accept: ["can"],
        explain: "Yetenek anlatılıyor ve „can“ hiçbir kişide değişmez.",
      },
      {
        kind: "gapfill",
        text: "___ (not / forget) your ticket!",
        options: [],
        answer: 0,
        accept: ["Don't forget", "Do not forget"],
        explain: "Uyarı bir olumsuz emirdir: Don't + yalın fiil.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Can", "you", "help", "me", "please"],
        explain: "Soruda „can“ başa geçer, sonra özne ve yalın fiil gelir: Can you help me, please?",
      },
      {
        kind: "truefalse",
        text: "„He cans speak Italian.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„can“ -s almaz; doğrusu „He can speak Italian.“",
      },
      {
        kind: "truefalse",
        text: "„Please close the door.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Emir kipinde özne yoktur ve fiil yalındır; „please“ cümleyi nazikleştirir.",
      },
    ],
  },
];
