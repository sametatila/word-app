import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 1 — "Tanışma ve ben" (immersion tema-hizalı içerik).
 *
 * Bu ünitenin dört dersi (Hallo! · Wie geht's? · Du oder Sie? · Woher kommst du?)
 * yalnızca şu kelimeleri/kalıpları öğretir; içerik BUNUN DIŞINA çıkmaz — A1'in
 * ilk ünitesinde öğrenci neredeyse hiçbir şey bilmez:
 *
 *   Kelime: hallo, heißen, kommen, wohnen, der Name, gehen, gut, schlecht,
 *           müde, danke, du, Sie, der Chef, die Kollegin, höflich, woher, wo,
 *           was, das Land, die Stadt.
 *   Kalıp:  Ich heiße… · Ich komme aus… · Ich wohne in… · Wie geht es dir? ·
 *           Mir geht es gut. · Und dir? · Wie heißt du? · Wie heißen Sie? ·
 *           Sind Sie…? · Woher kommst du? · Wo wohnst du? · Was ist das?
 *
 * Bunun dışında yalnızca özel adlar (kişi, şehir, ülke) ve zorunlu birkaç bağ
 * sözcüğü (ja, jetzt, Guten Tag, Frau, Herr) geçer — hepsi sözlükçede verilir.
 * Soru tipleri başlangıç düzeyine göre: çoğu çoktan seçmeli; „yazılı“ olarak da
 * boşluk-doldurma (tek tanıdık sözcük) ve sıralama (dokunarak, yazmadan) var —
 * dikte gibi ağır tipler ilk ünitede yok.
 *
 * Yerleşim: dizinin EN BAŞINDA durur → builder ünite 1'in okuma/dinleme/yazma
 * slotlarını bunlarla doldurur (konuma göre). İçerik-hizalamanın pilotu.
 */
export const a1U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "a1-u1-r1",
    level: "A1",
    skill: "reading",
    unit: 1,
    title: "Drei Namen",
    genre: "Tanışma",
    intro: "Üç kişi kendini tanıtıyor. Herkes adını, nereli olduğunu ve nerede oturduğunu söylüyor.",
    gloss: [
      { de: "Deutschland", tr: "Almanya", en: "Germany" },
      { de: "der Türkei", tr: "Türkiye", en: "Turkey" },
      { de: "Österreich", tr: "Avusturya", en: "Austria" },
      { de: "Hamburg / Berlin / Wien", tr: "Hamburg / Berlin / Viyana (şehirler)", en: "cities" },
    ],
    minutes: 3,
    text:
      "Hallo! Ich heiße Mia. Ich komme aus Deutschland. Ich wohne in Hamburg.\n\n" +
      "Hallo! Ich heiße Ali. Ich komme aus der Türkei. Ich wohne in Berlin.\n\n" +
      "Hallo! Ich heiße Nora. Ich komme aus Österreich. Ich wohne in Wien.",
    questions: [
      {
        text: "Wie heißt die Frau aus Hamburg?",
        options: ["Mia", "Ali", "Nora"],
        answer: 0,
        explain: "„Ich heiße Mia … Ich wohne in Hamburg.“ — Hamburg'da oturan Mia.",
      },
      {
        text: "Woher kommt Ali?",
        options: ["aus Deutschland", "aus der Türkei", "aus Österreich"],
        answer: 1,
        explain: "Ali „Ich komme aus der Türkei“ diyor — Türkiye'den geliyor.",
      },
      {
        text: "Wo wohnt Nora?",
        options: ["in Berlin", "in Hamburg", "in Wien"],
        answer: 2,
        explain: "„Ich wohne in Wien.“ — Nora Viyana'da oturuyor.",
      },
      {
        kind: "gapfill",
        text: "Mia wohnt in ___.",
        options: [],
        answer: 0,
        accept: ["Hamburg"],
        explain: "Mia „Ich wohne in Hamburg.“ diyor — boşluğa şehri yaz: Hamburg.",
      },
      {
        kind: "gapfill",
        text: "Nora kommt aus ___.",
        options: [],
        answer: 0,
        accept: ["Österreich", "Osterreich"],
        explain: "Nora „Ich komme aus Österreich.“ diyor.",
      },
    ],
  },
  {
    id: "a1-u1-r2",
    level: "A1",
    skill: "reading",
    unit: 1,
    title: "Hallo! Wie heißt du?",
    genre: "Diyalog",
    intro: "Ben ile Sara ilk kez tanışıyor. Kısa bir selamlaşma ve tanışma konuşması.",
    gloss: [
      { de: "der Schweiz", tr: "İsviçre", en: "Switzerland" },
      { de: "Italien", tr: "İtalya", en: "Italy" },
      { de: "München", tr: "Münih (şehir)", en: "Munich" },
      { de: "Und du?", tr: "Ya sen?", en: "And you?" },
    ],
    minutes: 3,
    text:
      "Ben: Hallo! Wie heißt du?\n" +
      "Sara: Ich heiße Sara. Und du?\n" +
      "Ben: Ich heiße Ben. Woher kommst du, Sara?\n" +
      "Sara: Ich komme aus Italien. Ich wohne in München. Und du?\n" +
      "Ben: Ich komme aus der Schweiz. Wie geht es dir?\n" +
      "Sara: Mir geht es gut, danke! Ich bin froh. Und dir?\n" +
      "Ben: Nicht so gut. Ich bin heute traurig.",
    questions: [
      {
        text: "Wie heißt der Mann?",
        options: ["Ben", "Sara", "Mia"],
        answer: 0,
        explain: "„Ich heiße Ben.“ — erkeğin adı Ben.",
      },
      {
        text: "Woher kommt Sara?",
        options: ["aus der Schweiz", "aus Italien", "aus der Türkei"],
        answer: 1,
        explain: "Sara „Ich komme aus Italien“ diyor.",
      },
      {
        text: "Wie geht es Sara?",
        options: ["Es geht ihr gut.", "Sie ist müde.", "Es geht ihr schlecht."],
        answer: 0,
        explain: "„Mir geht es gut, danke!“ — Sara iyi.",
      },
      {
        text: "Wie ist Ben heute?",
        options: ["traurig", "froh", "müde"],
        answer: 0,
        explain: "„Ich bin heute traurig.“ Sara ise „Ich bin froh“ diyor — iki karşıt duygu yan yana.",
      },
      {
        kind: "gapfill",
        text: "Sara wohnt in ___.",
        options: [],
        answer: 0,
        accept: ["München", "Munchen", "Munich"],
        explain: "Sara „Ich wohne in München.“ diyor.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: ["Ben fragt: Wie heißt du?", "Sara sagt ihren Namen.", "Sara fragt: Woher kommst du?", "Ben fragt: Wie geht es dir?"],
        explain: "Önce ad sorulur, ad söylenir, memleket sorulur, en sonda „nasılsın“ gelir.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "a1-u1-l1",
    level: "A1",
    skill: "listening",
    unit: 1,
    title: "Ich heiße Emma",
    genre: "Tanışma",
    intro: "Emma kendini tanıtıyor. Dinle: adı ne, nereden geliyor, nerede oturuyor?",
    gloss: [
      { de: "Frankreich", tr: "Fransa", en: "France" },
      { de: "Wie geht es dir?", tr: "Nasılsın?", en: "How are you?" },
    ],
    minutes: 2,
    segments: [
      { text: "Hallo! Ich heiße Emma." },
      { text: "Ich komme aus Frankreich." },
      { text: "Ich wohne in Berlin." },
      { text: "Wie geht es dir?" },
    ],
    questions: [
      {
        text: "Wie heißt die Frau?",
        options: ["Emma", "Mia", "Nora"],
        answer: 0,
        explain: "„Ich heiße Emma.“",
      },
      {
        text: "Woher kommt Emma?",
        options: ["aus Frankreich", "aus Deutschland", "aus Italien"],
        answer: 0,
        explain: "„Ich komme aus Frankreich.“ — Fransa'dan.",
      },
      {
        text: "Wo wohnt Emma?",
        options: ["in Berlin", "in Wien", "in München"],
        answer: 0,
        explain: "„Ich wohne in Berlin.“",
      },
      {
        kind: "gapfill",
        text: "Emma kommt aus ___.",
        options: [],
        answer: 0,
        accept: ["Frankreich"],
        explain: "„Ich komme aus Frankreich.“ — boşluğa ülkeyi yaz.",
      },
      {
        kind: "gapfill",
        text: "Emma wohnt in ___.",
        options: [],
        answer: 0,
        accept: ["Berlin"],
        explain: "„Ich wohne in Berlin.“",
      },
    ],
  },
  {
    id: "a1-u1-l2",
    level: "A1",
    skill: "listening",
    unit: 1,
    title: "Sind Sie Frau Yılmaz?",
    genre: "Diyalog",
    intro: "Resmî bir tanışma (siz/Sie). Bay Koch, Bayan Yılmaz'la tanışıyor. Dikkat: burada „Sie“ (siz) kullanılıyor.",
    gloss: [
      { de: "Guten Tag", tr: "iyi günler", en: "good day" },
      { de: "Frau / Herr", tr: "Bayan / Bay", en: "Mrs / Mr" },
      { de: "ja", tr: "evet", en: "yes" },
      { de: "jetzt", tr: "şimdi", en: "now" },
      { de: "Izmir / Frankfurt", tr: "İzmir / Frankfurt (şehirler)", en: "cities" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Koch", text: "Guten Tag! Sind Sie Frau Yılmaz?" },
      { speaker: "Frau Yılmaz", text: "Ja, ich heiße Elif Yılmaz." },
      { speaker: "Herr Koch", text: "Woher kommen Sie?" },
      { speaker: "Frau Yılmaz", text: "Ich komme aus der Türkei, aus Izmir." },
      { speaker: "Herr Koch", text: "Und wo wohnen Sie jetzt?" },
      { speaker: "Frau Yılmaz", text: "Jetzt wohne ich in Frankfurt." },
      { speaker: "Herr Koch", text: "Gut. Ich bin hier der Chef." },
      { speaker: "Frau Yılmaz", text: "Und wer ist die Dame?" },
      { speaker: "Herr Koch", text: "Die Dame heißt Frau Berger." },
    ],
    questions: [
      {
        text: "Wie heißt die Frau?",
        options: ["Elif Yılmaz", "Emma", "Mia"],
        answer: 0,
        explain: "„Ja, ich heiße Elif Yılmaz.“",
      },
      {
        text: "Woher kommt Frau Yılmaz?",
        options: ["aus der Türkei", "aus Deutschland", "aus Frankreich"],
        answer: 0,
        explain: "„Ich komme aus der Türkei, aus Izmir.“",
      },
      {
        text: "Wer ist Herr Koch?",
        options: ["der Chef", "ein Kollege", "der Lehrer"],
        answer: 0,
        explain: "„Ich bin hier der Chef.“",
      },
      {
        text: "Sagt Herr Koch „du“ oder „Sie“?",
        options: ["Sie (resmî)", "du (samimi)"],
        answer: 0,
        explain: "Resmî tanışma: „Sind Sie…?“, „Woher kommen Sie?“ — „Sie“ (siz), „du“ değil.",
      },
      {
        kind: "gapfill",
        text: "Frau Yılmaz wohnt jetzt in ___.",
        options: [],
        answer: 0,
        accept: ["Frankfurt"],
        explain: "„Jetzt wohne ich in Frankfurt.“",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: ["Herr Koch fragt: Sind Sie Frau Yılmaz?", "Sie sagt ihren Namen.", "Herr Koch fragt: Woher kommen Sie?", "Sie sagt: aus der Türkei."],
        explain: "Önce „siz misiniz“, sonra ad, sonra „nerelisiniz“, sonra cevap.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "a1-u1-w1",
    level: "A1",
    skill: "writing",
    unit: 1,
    title: "Ich stelle mich vor",
    genre: "Tanışma",
    intro: "Kendini tanıtmayı yazarak çalış. Parçaları birleştir, sonra formu doldur. Sadece bu ünitenin kalıpları.",
    gloss: [
      { de: "Ich heiße …", tr: "Benim adım …", en: "My name is …" },
      { de: "Ich komme aus …", tr: "…'den geliyorum", en: "I come from …" },
      { de: "Ich wohne in …", tr: "…'de oturuyorum", en: "I live in …" },
    ],
    minutes: 5,
    tasks: [
      {
        kind: "build",
        tr: "Benim adım Lena.",
        answer: "Ich heiße Lena.",
        hint: "„Ich heiße …“ + ad. Fiil ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Almanya'dan geliyorum.",
        answer: "Ich komme aus Deutschland.",
        hint: "„Ich komme aus …“ + ülke.",
      },
      {
        kind: "build",
        tr: "Berlin'de oturuyorum.",
        answer: "Ich wohne in Berlin.",
        hint: "„Ich wohne in …“ + şehir.",
      },
      {
        kind: "build",
        tr: "Memleketim Türkiye.",
        answer: "Meine Heimat ist die Türkei.",
        hint: "„die Heimat“ = memleket. DİKKAT: bazı ülkeler artikel taşır — „die Türkei“, „die Schweiz“ — çoğu taşımaz (Deutschland, Italien).",
      },
      {
        kind: "form",
        prompt: "Tanışma kartını Ali için doldur.",
        facts: "Ali Demir; Türkiye'den (memleket ülkesi Türkei); şu an Berlin'de oturuyor.",
        fields: [
          { label: "Name", answer: "Ali Demir", accept: ["Ali", "Demir"] },
          { label: "Land", answer: "Türkei", accept: ["die Türkei", "Turkei"] },
          { label: "Stadt", answer: "Berlin" },
        ],
      },
    ],
  },
  {
    id: "a1-u1-w2",
    level: "A1",
    skill: "writing",
    unit: 1,
    title: "du oder Sie?",
    genre: "Tanışma",
    intro: "Soru sormayı ve resmî/samimi ayrımını (du/Sie) yaz. Kısa cümleler yeter.",
    gloss: [
      { de: "du", tr: "sen (samimi)", en: "you (informal)" },
      { de: "Sie", tr: "siz (resmî)", en: "you (formal)" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Nasılsın? (bir arkadaşına)",
        answer: "Wie geht es dir?",
        hint: "Samimi hâl: „Wie geht es dir?“",
      },
      {
        kind: "rewrite",
        prompt: "Aynı soruyu resmî hitapla (Sie) yaz.",
        source: "Wie heißt du?",
        answer: "Wie heißen Sie?",
        why: "Resmî hâlde özne „Sie“ (büyük harf) ve fiil „-en“: heißen Sie.",
      },
      {
        kind: "rewrite",
        prompt: "Resmî hitapla yaz.",
        source: "Woher kommst du?",
        answer: "Woher kommen Sie?",
        why: "„du kommst“ → „Sie kommen“. Resmî hâlde fiil kommen.",
      },
      {
        kind: "build",
        tr: "Nerede oturuyorsun? (bir arkadaşına)",
        answer: "Wo wohnst du?",
        hint: "„wo“ = nerede; samimi „du wohnst“.",
      },
    ],
  },
];
