import type { SkillExercise } from "../types";

/**
 * Zürih Almancası (gsw-zh) A1 — okuma, dinleme ve yazma egzersizleri.
 * Metinler Züritüütsch (Dieth yazımı, data/zurich/style-guide.md bağlayıcı);
 * yönerge ve açıklamalar Türkçe.
 */
export const zhA1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "zh-a1-r1",
    course: "gsw-zh",
    level: "A1",
    skill: "reading",
    title: "Träffe mer üs am Bellevue?",
    genre: "Mesaj",
    intro: "Lara'nın arkadaşı Deniz'e lehçeyle yazdığı bir WhatsApp mesajını okuyacaksın.",
    gloss: [
      { de: "Wie gaats der?", tr: "Nasılsın? (wie geht es dir)" },
      { de: "de Namitag", tr: "öğleden sonra (Nachmittag)" },
      { de: "an See gaa", tr: "göle gitmek" },
      { de: "d Tramhaltstell", tr: "tramvay durağı" },
      { de: "s Velo", tr: "bisiklet (İsviçre'de Fahrrad yerine)" },
      { de: "d Glace", tr: "dondurma (İsviçre'de Eis yerine)" },
      { de: "de Aabig", tr: "akşam (Abend)" },
    ],
    minutes: 3,
    text:
      "Hoi Deniz! Wie gaats der? Ich ha morn am Namitag frei. S Wätter isch schöön — wämmer zäme an See gaa? Mir träffed üs am zwäi am Bellevue, bi de Tramhaltstell. Ich nime s Velo, du chasch mit em Tram Nummere 4 choo. Nachhär gömmer no es Glace ässe. Mini Kollegin Anna chunt au mit. Schriib mer bitte bis hüt am Aabig!\n\nLiebi Grüess\nLara",
    questions: [
      {
        text: "Wänn träffed sich d Lara und de Deniz?",
        options: ["Am zwäi", "Am vieri", "Am Aabig"],
        answer: 0,
        explain:
          "Mesajta „Mir träffed üs am zwäi am Bellevue“ yazıyor — saat ikide buluşuyorlar. Akşam yalnızca cevap yazma sınırı.",
      },
      {
        text: "Richtig oder falsch? De Deniz söll mit em Velo choo.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Bisikleti Lara alıyor („Ich nime s Velo“), Deniz'e 4 numaralı tramvayla gelmesini söylüyor.",
      },
      {
        text: "Was mached si nachhär?",
        options: ["Es Glace ässe", "E Pizza ässe", "Häi gaa"],
        answer: 0,
        explain: "„Nachhär gömmer no es Glace ässe“ — sonrasında dondurma yemeye gidiyorlar.",
      },
      {
        text: "Wär chunt au no mit?",
        options: ["D Anna", "De Murat", "Niemert"],
        answer: 0,
        explain: "„Mini Kollegin Anna chunt au mit“ — Lara'nın arkadaşı Anna da geliyor.",
      },
    ],
  },
  {
    id: "zh-a1-r2",
    course: "gsw-zh",
    level: "A1",
    skill: "reading",
    title: "Zimmer z Züri z vermiete",
    genre: "İlan",
    intro: "Zürih'in 4. bölgesinde (Chreis 4) kiralık bir oda ilanı okuyacaksın.",
    gloss: [
      { de: "z vermiete", tr: "kiralık (zu vermieten)" },
      { de: "de Chreis", tr: "Zürih'te ilçe/bölge (Kreis)" },
      { de: "d Wohnig", tr: "daire (Wohnung)" },
      { de: "inbegriffe", tr: "dahil (giderler kiraya dahil)" },
      { de: "ewägg", tr: "uzakta (entfernt/weg)" },
      { de: "s Huustier", tr: "evcil hayvan" },
      { de: "aalüte", tr: "telefon etmek (anrufen)" },
      { de: "d Bsichtigung", tr: "evi gezip görme" },
    ],
    minutes: 3,
    text:
      "Schööns Zimmer i de Stadt Züri z vermiete, im Chreis 4. S Zimmer isch 18 Quadratmeter grooss und hät en grosse Balkon. D Wohnig isch im dritte Stock, mit Lift. D Miete isch 850 Franke im Monet, alles inbegriffe. D Tramhaltstell isch nur zwäi Minute z Fuess ewägg. Käi Huustier! Frei ab em 1. Septämber.\n\nHäsch Intresse? Denn lüt em Herr Huber aa: 044 123 45 67. Bsichtigung am Samschtig vo de zääni bis am zwölfi.",
    questions: [
      {
        text: "Richtig oder falsch? S Zimmer hät en Balkon.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: İlanda „hät en grosse Balkon“ yazıyor.",
      },
      {
        text: "Wie vil choschtet s Zimmer im Monet?",
        options: ["850 Franke", "1'044 Franke", "450 Franke"],
        answer: 0,
        explain:
          "„D Miete isch 850 Franke im Monet, alles inbegriffe“ — kira ayda 850 frank, giderler dahil.",
      },
      {
        text: "Wänn cha me s Zimmer go aaluege?",
        options: ["Am Samschtig vo 10 bis 12", "Am 1. Septämber", "Am Sunntig am Namitag"],
        answer: 0,
        explain:
          "Son cümle: „Bsichtigung am Samschtig vo de zääni bis am zwölfi“. 1 Eylül odanın boşalacağı tarih.",
      },
      {
        text: "Richtig oder falsch? Me törf e Chatz mitnää.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Käi Huustier!“ — evcil hayvan (kedi dahil) yasak.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "zh-a1-l1",
    course: "gsw-zh",
    level: "A1",
    skill: "listening",
    title: "Im Kafi",
    genre: "Diyalog",
    intro: "Elif Zürih'te bir kafede sipariş veriyor; garsonla konuşmasını dinleyeceksin.",
    gloss: [
      { de: "Was törfs sii?", tr: "Ne alırdınız? (sipariş kalıbı)" },
      { de: "Ich hett gärn …", tr: "… rica ediyorum / … alayım" },
      { de: "de Kafi crème", tr: "sütlü kahve (İsviçre klasiği)" },
      { de: "s Gipfeli", tr: "kruvasan" },
      { de: "choschte", tr: "fiyatı … olmak (kosten)" },
      { de: "zrugg", tr: "geri (para üstü)" },
      { de: "Merci vilmal", tr: "çok teşekkürler (İsviçre'de yaygın)" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Serviererin", text: "Grüezi! Was törfs sii?" },
      { speaker: "Elif", text: "Grüezi. Ich hett gärn en Kafi crème, bitte." },
      {
        speaker: "Serviererin",
        text: "Gärn. Möchted Si au öppis z ässe? Mir händ frischi Gipfeli.",
      },
      { speaker: "Elif", text: "Ja, es Gipfeli, bitte. Was choschtet das zäme?" },
      {
        speaker: "Serviererin",
        text: "De Kafi choschtet vier Franke füfzg und s Gipfeli äis füfzg — macht zäme sächs Franke.",
      },
      { speaker: "Elif", text: "Da sind zää Franke." },
      { speaker: "Serviererin", text: "Merci vilmal. Und vier Franke zrugg. En schööne Taag no!" },
    ],
    questions: [
      {
        text: "Was bstellt d Elif?",
        options: ["En Kafi und es Gipfeli", "Nume en Kafi", "En Tee und es Brötli"],
        answer: 0,
        explain:
          "Elif önce „en Kafi crème“, sonra „es Gipfeli“ istiyor — yani kahve ve kruvasan.",
      },
      {
        text: "Wie vil choschtet alles zäme?",
        options: ["Sächs Franke", "Vier Franke füfzg", "Zää Franke"],
        answer: 0,
        explain:
          "Garson „macht zäme sächs Franke“ diyor: 4.50 kahve + 1.50 kruvasan = 6 frank. 10 frank Elif'in verdiği para.",
      },
      {
        text: "Richtig oder falsch? D Elif zaalt mit zää Franke.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Da sind zää Franke“ diyor ve 4 frank para üstü alıyor.",
      },
    ],
  },
  {
    id: "zh-a1-l2",
    course: "gsw-zh",
    level: "A1",
    skill: "listening",
    title: "A de Tramhaltstell",
    genre: "Diyalog",
    intro:
      "Herr Yılmaz tramvay durağında komşusu Frau Keller ile karşılaşıyor; konuşmalarını dinleyeceksin.",
    gloss: [
      { de: "warte uf", tr: "…i beklemek" },
      { de: "d Verspaatig", tr: "rötar, gecikme (Verspätung)" },
      { de: "d Aazäig", tr: "gösterge, pano (Anzeige)" },
      { de: "go schaffe", tr: "işe (çalışmaya) gitmek" },
      { de: "d Egge", tr: "köşe" },
      { de: "näb", tr: "yanında (neben)" },
      { de: "Ade", tr: "hoşça kal (İsviçre vedası)" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Frau Keller", text: "Grüezi Herr Yilmaz! Warted Si au ufs Tram?" },
      {
        speaker: "Herr Yilmaz",
        text: "Grüezi Frau Keller. Ja, ufs Tram Nummere vier, Richtig Hauptbahnhof.",
      },
      {
        speaker: "Frau Keller",
        text: "S Tram hät hüt Verspaatig — zää Minute, staat da a de Aazäig.",
      },
      { speaker: "Herr Yilmaz", text: "Oje. Ich mues am nüüni bi de Arbet sii." },
      {
        speaker: "Frau Keller",
        text: "Denn nämed Si doch de Bus Nummere 31, de fahrt au zum Hauptbahnhof.",
      },
      { speaker: "Herr Yilmaz", text: "Gueti Idee! Wo isch d Bushaltstell?" },
      { speaker: "Frau Keller", text: "Grad um d Egge, näb de Migros." },
      { speaker: "Herr Yilmaz", text: "Merci vilmal! Ade!" },
    ],
    questions: [
      {
        text: "Uf was warted d Lüüt?",
        options: ["Ufs Tram", "Uf de Zug", "Ufs Taxi"],
        answer: 0,
        explain: "İlk cümle: „Warted Si au ufs Tram?“ — ikisi de tramvay bekliyor.",
      },
      {
        text: "Wie vil Verspaatig hät s Tram?",
        options: ["Zää Minute", "Föif Minute", "E halb Stund"],
        answer: 0,
        explain: "Frau Keller „zää Minute“ diyor — panoda 10 dakika gecikme yazıyor.",
      },
      {
        text: "Richtig oder falsch? De Herr Yilmaz nimmt de Bus Nummere 31.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Doğru: Frau Keller 31 numaralı otobüsü öneriyor, Herr Yılmaz „Gueti Idee!“ diyerek kabul ediyor.",
      },
      {
        text: "Wo isch d Bushaltstell?",
        options: ["Näb de Migros", "Am Hauptbahnhof", "Vor em Kino"],
        answer: 0,
        explain: "„Grad um d Egge, näb de Migros“ — köşeyi dönünce, Migros'un yanında.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "zh-a1-w1",
    course: "gsw-zh",
    level: "A1",
    skill: "writing",
    title: "Sich vorstelle",
    genre: "Tanışma",
    intro:
      "Kendini lehçeyle tanıtmayı çalışacaksın: önce cümleler kur, sonra kısa bir grup mesajı yaz.",
    gloss: [
      { de: "häisse", tr: "adında olmak (heißen)" },
      { de: "choo us", tr: "…den gelmek, …li olmak (ich chume us …)" },
      { de: "wohne z", tr: "…de oturmak (z Züri = Zürih'te)" },
      { de: "schaffe als", tr: "… olarak çalışmak (arbeiten yerine)" },
      { de: "s Hobby", tr: "hobi" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Benim adım Elif ve Türkiye'den geliyorum.",
        answer: "Ich häisse Elif und chume us de Türkei.",
        hint: "heißen lehçede häisse; kommen fiilinin şimdiki hali: ich chume.",
      },
      {
        kind: "build",
        tr: "Zürih'te oturuyorum ve tramvayla işe gidiyorum.",
        answer: "Ich wohne z Züri und gaa mit em Tram go schaffe.",
        alternatives: ["Ich wohne z Züri und gaa go schaffe mit em Tram."],
        hint: "z Züri = Zürih'te; «go schaffe» kalıbı: işe/çalışmaya gitmek.",
      },
      {
        kind: "build",
        tr: "Öğretmen olarak çalışıyorum.",
        answer: "Ich schaffe als Lehrerin.",
        hint: "arbeiten yerine lehçede schaffe kullanılır; meslek söylerken «als», artikel gerekmez.",
      },
      {
        kind: "free",
        prompt:
          "Zürih'teki dil kursunun grup sohbetine kendini lehçeyle tanıtan kısa bir mesaj yaz. Şu üç noktaya değin: adın ve nereli olduğun, nerede oturduğun, işin veya hobin.",
        checklist: [
          "Selamlama ile başladın mı? (Hoi zäme!)",
          "Üç içerik noktasının hepsine değindin mi: isim ve memleket, oturduğun yer, iş veya hobi?",
          "Lehçe biçimlerini kullandın mı? (ich bi, ich ha, ich chume, ich schaffe)",
          "Veda ile bitirdin mi? (Bis bald! / Ade!)",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich häisse …", tr: "Benim adım …" },
          { de: "Ich chume us …", tr: "…den geliyorum / …liyim" },
          { de: "Ich wohne z …", tr: "…de oturuyorum" },
          { de: "Ich schaffe als …", tr: "… olarak çalışıyorum" },
          { de: "Mis Hobby isch …", tr: "Hobim …" },
          { de: "Bis bald!", tr: "Görüşürüz!" },
        ],
        sample:
          "Hoi zäme! Ich häisse Emre und chume us de Türkei, us Ankara. Jetz wohne ich z Züri, im Chreis 5. Ich schaffe als Ingenieur. Mini Hobbys sind Fuessball und Choche. Ich lerne Züritüütsch für de Alltag. Bis bald! Emre",
      },
    ],
  },
];
