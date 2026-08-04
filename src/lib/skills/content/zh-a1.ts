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

  {
    id: "zh-a1-r3",
    course: "gsw-zh",
    level: "A1",
    skill: "reading",
    title: "Iiladig zum Geburi",
    genre: "E-posta",
    intro: "Lena, arkadaşı Sara'yı doğum günü partisine çağırıyor. Davetiyeyi okuyacaksın.",
    gloss: [
      { de: "s Geburi", tr: "doğum günü (Geburtstag)" },
      { de: "dihäi", tr: "evde (zu Hause)" },
      { de: "es gaat … los", tr: "… başlıyor" },
      { de: "de Schtock", tr: "kat" },
      { de: "s Gschänk", tr: "hediye" },
      { de: "öb", tr: "… -ıp -madığı (ob)" },
      { de: "sich fröie uf", tr: "dört gözle beklemek" },
    ],
    minutes: 3,
    text:
      "Liebi Sara\n\nAm Samschtig wird ich drissg! Drum mach ich e chlini Party bi mir dihäi. Es gaat am sibni am Aabig los. Mini Adrässe: Langstrass 42, im zwäite Schtock.\n\nZum Ässe git s Pizza und Salaat. Öppis z trinke bringed d Gescht sälber mit. Bitte nimm kä Gschänk mit — chum äifach!\n\nChasch mer bis am Mittwuch säge, öb du chunsch? Ich fröi mi uf di.\n\nLiebi Grüess\nLena",
    questions: [
      {
        text: "Wänn gaat d Party los?",
        options: ["Am sibni am Aabig", "Am zwäi am Namitag", "Am Mittwuch"],
        answer: 0,
        explain: "„Es gaat am sibni am Aabig los“ — parti akşam yedide başlıyor.",
      },
      {
        text: "Wo isch d Party?",
        options: ["Bi de Lena dihäi", "Im Reschtorant", "Im Quartierzäntrum"],
        answer: 0,
        explain: "„Ich mach e chlini Party bi mir dihäi“ — Lena evinde, Langstrass 42'de.",
      },
      {
        text: "Richtig oder falsch? Me söll es Gschänk mitbringe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Bitte nimm kä Gschänk mit“ — hediye istemiyor, sadece gelinmesini.",
      },
      {
        text: "Bis wänn söll d Sara antworte?",
        options: ["Bis am Mittwuch", "Bis am Samschtig", "Bis am Sunntig"],
        answer: 0,
        explain: "„Chasch mer bis am Mittwuch säge, öb du chunsch?“ — çarşambaya kadar.",
      },
    ],
  },
  {
    id: "zh-a1-r4",
    course: "gsw-zh",
    level: "A1",
    skill: "reading",
    title: "Nöii Öffnigsziite",
    genre: "Duyuru",
    intro: "Mahalle kütüphanesinin kapısına asılan yeni çalışma saatleri duyurusunu okuyacaksın.",
    gloss: [
      { de: "d Öffnigsziite", tr: "açılış saatleri" },
      { de: "gschlosse / zue", tr: "kapalı" },
      { de: "zruggbringe", tr: "geri getirmek" },
      { de: "de Chaschte", tr: "kutu, dolap (Kasten)" },
      { de: "d Iigangstür", tr: "giriş kapısı" },
      { de: "usserhalb", tr: "dışında" },
    ],
    minutes: 3,
    text:
      "Liebi Bsuecherinne und Bsuecher\n\nAb em erschte Oktober händ mir nöii Öffnigsziite:\n\nMäändig: gschlosse\nZischtig bis Friitig: 9 bis 19 Uhr\nSamschtig: 9 bis 16 Uhr\nSunntig: gschlosse\n\nD Büecher chöned Si au usserhalb vo de Öffnigsziite zruggbringe: de Chaschte isch näb de Iigangstür.\n\nAchtung: Am 24. Dezämber isch d Bibliothek de ganz Tag zue.\n\nIhres Bibliothekstiim",
    questions: [
      {
        text: "Wänn isch d Bibliothek gschlosse?",
        options: ["Am Määndig und am Sunntig", "Nume am Sunntig", "Am Samschtig"],
        answer: 0,
        explain: "Listede hem „Määndig: gschlosse“ hem „Sunntig: gschlosse“ yazıyor.",
      },
      {
        text: "Bis wänn hät s am Samschtig offe?",
        options: ["Bis am vieri", "Bis am sibni", "Bis am zwölfi"],
        answer: 0,
        explain: "Cumartesi 9–16, yani saat dörde kadar. 19 (sibni) hafta içi kapanış saati.",
      },
      {
        text: "Wo cha me d Büecher zruggbringe, wänn zue isch?",
        options: ["Im Chaschte näb de Iigangstür", "Bi de Poscht", "Im Kafi näbenaa"],
        answer: 0,
        explain: "„De Chaschte isch näb de Iigangstür“ — kapalıyken kitaplar bu kutuya bırakılır.",
      },
      {
        text: "Richtig oder falsch? Am 24. Dezämber hät d Bibliothek offe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am 24. Dezämber isch d Bibliothek de ganz Tag zue.“",
      },
    ],
  },
  {
    id: "zh-a1-r5",
    course: "gsw-zh",
    level: "A1",
    skill: "reading",
    title: "Kurs im Quartierzäntrum",
    genre: "Program",
    intro: "Wipkingen semt merkezinin sonbahar kurs programını okuyacaksın.",
    gloss: [
      { de: "de Aafänger", tr: "yeni başlayan" },
      { de: "s Gricht", tr: "yemek (Gericht)" },
      { de: "d Mundart", tr: "lehçe" },
      { de: "d Aamäldig", tr: "kayıt (Anmeldung)" },
      { de: "de Schalter", tr: "gişe" },
      { de: "de Rabatt", tr: "indirim" },
      { de: "s Kulturlegi", tr: "düşük gelirliler için kültür kartı (İsviçre)" },
    ],
    minutes: 4,
    text:
      "Kurs im Quartierzäntrum Wipkinge — Herbscht\n\nChoche für Aafänger\nMäändig, 18.30–20.30 · 8 Aabig · 240 Franke\nMir choched äifachi Grichte us de ganze Wält.\n\nZüritüütsch für Aaglernti\nMittwuch, 19.00–20.30 · 10 Aabig · 200 Franke\nFür alli, wo scho Hochdüütsch chönd und jetz d Mundart wänd verstaa.\n\nYoga am Morge\nFriitig, 7.00–8.00 · 12 Mal · 180 Franke\n\nAamäldig online oder am Schalter, bis zwäi Wuche vor em Aafang. Lüüt mit em Kulturlegi überchömed drissg Prozänt Rabatt.",
    questions: [
      {
        text: "Wänn isch de Züritüütsch-Kurs?",
        options: ["Am Mittwuch am Aabig", "Am Määndig am Aabig", "Am Friitig am Morge"],
        answer: 0,
        explain: "„Züritüütsch für Aaglernti — Mittwuch, 19.00–20.30“. Pazartesi yemek kursu.",
      },
      {
        text: "Wie vil choschtet de Chochkurs?",
        options: ["240 Franke", "200 Franke", "180 Franke"],
        answer: 0,
        explain: "Yemek kursu 240 frank; 200 lehçe kursu, 180 yoga.",
      },
      {
        text: "Richtig oder falsch? Me cha sich nume online aamälde.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Aamäldig online oder am Schalter“ — gişeden de kayıt olunabiliyor.",
      },
      {
        text: "Wär überchunt Rabatt?",
        options: ["Lüüt mit em Kulturlegi", "Studänte", "Alli Aafänger"],
        answer: 0,
        explain: "Son cümle: Kulturlegi kartı olanlar %30 indirim alıyor.",
      },
    ],
  },
  {
    id: "zh-a1-r6",
    course: "gsw-zh",
    level: "A1",
    skill: "reading",
    title: "Information für üsi Fahrgäscht",
    genre: "Duyuru",
    intro: "Zürih toplu taşımasının (VBZ) duraklara astığı yol çalışması duyurusunu okuyacaksın.",
    gloss: [
      { de: "de Fahrgascht", tr: "yolcu" },
      { de: "s Gläis", tr: "ray, peron (Gleis)" },
      { de: "umbaue", tr: "yenilemek, tadilat yapmak" },
      { de: "gälte", tr: "geçerli olmak" },
      { de: "rächne mit", tr: "hesaba katmak" },
      { de: "d Umständ", tr: "zahmet, rahatsızlık" },
    ],
    minutes: 3,
    text:
      "Liebi Fahrgäscht\n\nVom 3. bis am 17. Juli baued mir d Gläis am Central um. S Tram Nummere 6 und 10 fahred i dere Ziit nöd bis zum Central.\n\nStatt em Tram fahrt en Bus. De Bus haltet vor em Hauptbahnhof, uf de andere Strasseziite.\n\nBitte rächned mit zää Minute meh Ziit. S Billett giltet au im Bus.\n\nMir entschuldiged üs für d Umständ.\nVerchehrsbetriib Züri",
    questions: [
      {
        text: "Was passiert vom 3. bis am 17. Juli?",
        options: ["D Gläis am Central wärded umbaut", "S Tram fahrt hüüfiger", "De Bahnhof isch zue"],
        answer: 0,
        explain: "„Vom 3. bis am 17. Juli baued mir d Gläis am Central um.“",
      },
      {
        text: "Welli Tram fahred nöd bis zum Central?",
        options: ["Nummere 6 und 10", "Nummere 4", "Alli Tram"],
        answer: 0,
        explain: "Yalnızca 6 ve 10 numaralı tramvaylar Central'a çıkmıyor.",
      },
      {
        text: "Wo haltet de Bus?",
        options: ["Vor em Hauptbahnhof", "Am Bellevue", "Am See"],
        answer: 0,
        explain: "„De Bus haltet vor em Hauptbahnhof, uf de andere Strasseziite.“",
      },
      {
        text: "Richtig oder falsch? Me bruucht es nöis Billett für de Bus.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „S Billett giltet au im Bus“ — mevcut bilet otobüste de geçerli.",
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

  {
    id: "zh-a1-l3",
    course: "gsw-zh",
    level: "A1",
    skill: "listening",
    title: "Uf em Märt",
    genre: "Diyalog",
    intro: "Ayşe, Bürkliplatz'taki pazarda alışveriş yapıyor. Satıcıyla konuşmasını dinleyeceksin.",
    gloss: [
      { de: "de Märt", tr: "pazar (Markt)" },
      { de: "s Rüebli", tr: "havuç" },
      { de: "s Chörbli", tr: "küçük sepet, kutu" },
      { de: "d Ärdbeeri", tr: "çilek" },
      { de: "de Peterli", tr: "maydanoz" },
      { de: "de Bund", tr: "demet" },
      { de: "bsunders", tr: "özellikle" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Verchäufer", text: "Grüezi! Was törf s sii?" },
      { speaker: "Ayşe", text: "Grüezi. Ich bruuche äis Kilo Tomate und es halbs Kilo Rüebli." },
      { speaker: "Verchäufer", text: "Gärn. D Tomate sind hüt bsunders guet — die sind us em Tessin." },
      { speaker: "Ayşe", text: "Und was choschtet s Chörbli Ärdbeeri?" },
      { speaker: "Verchäufer", text: "Sibe Franke. Wänn Si zwäi nämed, choschted si zäme zwölf." },
      { speaker: "Ayşe", text: "Guet, denn nime ich zwäi Chörbli. Und äin Bund Peterli, bitte." },
      { speaker: "Verchäufer", text: "Zäme macht das nüünzää Franke füfzg." },
      { speaker: "Ayşe", text: "Da sind zwänzg. Merci!" },
    ],
    questions: [
      {
        text: "Was chauft d Ayşe?",
        options: [
          "Tomate, Rüebli, Ärdbeeri und Peterli",
          "Nume Ärdbeeri",
          "Öpfel und Härdöpfel",
        ],
        answer: 0,
        explain: "Sırayla domates, havuç, iki sepet çilek ve bir demet maydanoz alıyor.",
      },
      {
        text: "Wie vil Chörbli Ärdbeeri nimmt si?",
        options: ["Zwäi", "Äis", "Drüü"],
        answer: 0,
        explain: "„Denn nime ich zwäi Chörbli“ — iki sepet 12 franka geliyor.",
      },
      {
        text: "Wie vil zaalt si zäme?",
        options: ["Nüünzää Franke füfzg", "Zwänzg Franke", "Zwölf Franke"],
        answer: 0,
        explain: "Satıcı „macht das nüünzää Franke füfzg“ diyor; 20 frank verdiği para.",
      },
    ],
  },
  {
    id: "zh-a1-l4",
    course: "gsw-zh",
    level: "A1",
    skill: "listening",
    title: "Aaruef i de Arztpraxis",
    genre: "Telesekreter",
    intro: "Bir doktor muayenehanesinin telesekreter mesajını dinleyeceksin.",
    gloss: [
      { de: "de Aaruef", tr: "telefon araması" },
      { de: "de Termin", tr: "randevu" },
      { de: "s Rezäpt", tr: "reçete" },
      { de: "dringend", tr: "acil" },
      { de: "de Fall", tr: "durum, vaka" },
      { de: "wähle", tr: "(numara) çevirmek" },
      { de: "drucke", tr: "basmak (drücken)" },
    ],
    minutes: 2,
    segments: [
      { text: "Grüezi und härzlich willkomme i de Praxis vom Doktor Baumann." },
      {
        text: "Üsi Öffnigsziite: Määndig bis Friitig vo de achti bis am zwölfi und vo de zwäi bis am füfi. Am Mittwuch Namitag isch d Praxis zue.",
      },
      { text: "Für en Termin drucked Si d Äis. Für es Rezäpt drucked Si d Zwäi." },
      { text: "I dringende Fäll wähled Si bitte d Nummere hundertvierevierzg." },
      { text: "Merci für Ihre Aaruef und en schööne Tag." },
    ],
    questions: [
      {
        text: "Wänn isch d Praxis am Mittwuch zue?",
        options: ["Am Namitag", "Am Morge", "De ganz Tag"],
        answer: 0,
        explain: "„Am Mittwuch Namitag isch d Praxis zue“ — sadece öğleden sonra kapalı.",
      },
      {
        text: "Was mues me drucke für en Termin?",
        options: ["D Äis", "D Zwäi", "D Drüü"],
        answer: 0,
        explain: "Randevu için 1, reçete için 2 tuşlanıyor.",
      },
      {
        text: "Welli Nummere gilt i dringende Fäll?",
        options: ["144", "117", "112"],
        answer: 0,
        explain: "„d Nummere hundertvierevierzg“ = 144, İsviçre'de ambulans numarası.",
      },
    ],
  },
  {
    id: "zh-a1-l5",
    course: "gsw-zh",
    level: "A1",
    skill: "listening",
    title: "Durchsaag im Bahnhof",
    genre: "Anons",
    intro: "Zürih Hauptbahnhof'ta bir peron anonsunu dinleyeceksin.",
    gloss: [
      { de: "d Durchsaag", tr: "anons" },
      { de: "s Gläis", tr: "peron, ray" },
      { de: "d Abfaart", tr: "kalkış" },
      { de: "öppe", tr: "yaklaşık" },
      { de: "de Täil", tr: "bölüm, kısım" },
      { de: "achte uf", tr: "…e dikkat etmek" },
    ],
    minutes: 2,
    segments: [
      {
        text: "Achtung uf Gläis sibe: De Interregio uf Sanggalle, Abfaart am halbi zää, fahrt hüt vo Gläis nüün ab.",
      },
      { text: "De Zug hät öppe füf Minute Verspaatig." },
      {
        text: "Im vordere Täil vom Zug hät s Plätz i de erschte Klass, im hindere Täil i de zwäite Klass.",
      },
      { text: "Mir bitted Si, uf d Aazäige z achte. Guet Reis!" },
    ],
    questions: [
      {
        text: "Vo welem Gläis fahrt de Zug ab?",
        options: ["Vo Gläis nüün", "Vo Gläis sibe", "Vo Gläis zää"],
        answer: 0,
        explain: "Anons 7. perondan duyuruluyor ama tren „vo Gläis nüün“ kalkıyor — peron değişti.",
      },
      {
        text: "Wie vil Verspaatig hät de Zug?",
        options: ["Öppe füf Minute", "Zää Minute", "Käini"],
        answer: 0,
        explain: "„De Zug hät öppe füf Minute Verspaatig.“",
      },
      {
        text: "Richtig oder falsch? Di zwäit Klass isch im hindere Täil.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „im hindere Täil i de zwäite Klass“.",
      },
    ],
  },
  {
    id: "zh-a1-l6",
    course: "gsw-zh",
    level: "A1",
    skill: "listening",
    title: "E Sprachnachricht vom Deniz",
    genre: "Mesaj",
    intro: "Deniz, Elif'e sesli mesaj bırakıyor. Ne istediğini dinleyeceksin.",
    gloss: [
      { de: "es bitzeli", tr: "biraz" },
      { de: "spöter", tr: "daha geç" },
      { de: "drusse", tr: "dışarıda" },
      { de: "gää", tr: "vermek (geben)" },
      { de: "Bis gliich!", tr: "Birazdan görüşürüz!" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Deniz", text: "Hoi Elif, ich bi s, de Deniz." },
      {
        speaker: "Deniz",
        text: "Du, ich chume hüt es bitzeli spöter — öppe füfzää Minute. Ich bi na im Büro.",
      },
      {
        speaker: "Deniz",
        text: "Chasch du scho emal en Tisch reserviere? Am beschte drusse, s isch so schöön warm.",
      },
      { speaker: "Deniz", text: "Und bring bitte s Buech mit, wo ich der ggää ha. Ich bruuch s morn." },
      { speaker: "Deniz", text: "Bis gliich!" },
    ],
    questions: [
      {
        text: "Warum chunt de Deniz spöter?",
        options: ["Er isch na im Büro", "Er isch chrank", "S Tram hät Verspaatig"],
        answer: 0,
        explain: "„Ich bi na im Büro“ — hâlâ ofiste olduğu için gecikiyor.",
      },
      {
        text: "Was söll d Elif mache?",
        options: [
          "En Tisch reserviere und s Buech mitbringe",
          "En Kafi chaufe",
          "Im Büro verbii choo",
        ],
        answer: 0,
        explain: "İki ricası var: masa ayırtmak ve verdiği kitabı getirmek.",
      },
      {
        text: "Wie vil spöter chunt er?",
        options: ["Öppe füfzää Minute", "E halb Stund", "Zää Minute"],
        answer: 0,
        explain: "„öppe füfzää Minute“ — yaklaşık on beş dakika.",
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
  {
    id: "zh-a1-w2",
    course: "gsw-zh",
    level: "A1",
    skill: "writing",
    title: "E Nachricht an en Kolleg",
    genre: "Mesaj",
    intro:
      "Bir buluşmayı ertelemeyi lehçeyle yazacaksın: önce cümleler kur, sonra kısa bir mesaj yaz.",
    gloss: [
      { de: "läider", tr: "maalesef (leider)" },
      { de: "chrank", tr: "hasta" },
      { de: "d Ziit", tr: "vakit, zaman" },
      { de: "passe", tr: "uymak (bir zaman için)" },
      { de: "Bschäid gää", tr: "haber vermek" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bugün maalesef gelemiyorum, hastayım.",
        answer: "Ich cha hüt läider nöd choo, ich bi chrank.",
        hint: "können lehçede chöne olur: ich cha. kommen → choo, nicht → nöd.",
      },
      {
        kind: "build",
        tr: "Yarın öğleden sonra vaktin var mı?",
        answer: "Häsch du morn am Namitag Ziit?",
        alternatives: ["Häsch du morn Namitag Ziit?"],
        hint: "haben → haa: du häsch. Nachmittag lehçede Namitag.",
      },
      {
        kind: "build",
        tr: "Sana akşam yazarım.",
        answer: "Ich schriibe der am Aabig.",
        hint: "schreiben → schriibe (uzun i çift yazılır), dir → der, Abend → Aabig.",
      },
      {
        kind: "free",
        prompt:
          "Bir arkadaşına lehçeyle kısa bir mesaj yaz: bugünkü buluşmayı erteliyorsun. Üç noktaya değin: gelemeyeceğin, nedeni, yeni bir gün önerisi.",
        checklist: [
          "Selamlama ile başladın mı? (Hoi …!)",
          "Gelemeyeceğini ve nedenini yazdın mı?",
          "Yeni bir gün/saat önerdin mi?",
          "Lehçe biçimleri kullandın mı? (ich cha, ich mues, mir chönted)",
        ],
        minWords: 25,
        phrases: [
          { de: "Ich cha läider nöd choo.", tr: "Maalesef gelemiyorum." },
          { de: "Ich mues lenger schaffe.", tr: "Daha uzun çalışmam gerek." },
          { de: "Passt s der am …?", tr: "… sana uyar mı?" },
          { de: "Mir chönted üs … träffe.", tr: "… buluşabiliriz." },
          { de: "Gib mer churz Bschäid.", tr: "Kısaca haber ver." },
        ],
        sample:
          "Hoi Murat! Sorry, ich cha hüt am Aabig läider nöd choo — ich mues lenger schaffe. Passt s der am Friitig am sächsi? Mir chönted üs bim Bellevue träffe und nachhär öppis go ässe. Gib mer churz Bschäid. Liebi Grüess, Elif",
      },
    ],
  },
  {
    id: "zh-a1-w3",
    course: "gsw-zh",
    level: "A1",
    skill: "writing",
    title: "Iichaufe und Ässe",
    genre: "Günlük yaşam",
    intro: "Alışveriş ve yemek konusunu lehçeyle yazacaksın.",
    gloss: [
      { de: "chaufe", tr: "satın almak (kaufen)" },
      { de: "de Zmorge", tr: "kahvaltı (Frühstück)" },
      { de: "de Chääs", tr: "peynir (Käse)" },
      { de: "choche", tr: "yemek pişirmek" },
      { de: "de Znacht", tr: "akşam yemeği" },
      { de: "d Iichaufsliste", tr: "alışveriş listesi" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Süt ve ekmek almam lazım.",
        answer: "Ich mues Milch und Brot chaufe.",
        hint: "müssen → müesse: ich mues. kaufen söz başındaki k yüzünden chaufe olur.",
      },
      {
        kind: "build",
        tr: "Kahvaltıda çoğunlukla peynirli ekmek yerim.",
        answer: "Zum Zmorge iss ich meischtens es Brot mit Chääs.",
        alternatives: ["Zum Zmorge iss ich meischtens Brot mit Chääs."],
        hint: "Frühstück → Zmorge, Käse → Chääs, meistens → meischtens (st → scht).",
      },
      {
        kind: "build",
        tr: "Bu akşam bize gelmek ister misin? Bir şeyler pişireceğim.",
        answer: "Wottsch du hüt am Aabig zu üs choo? Ich choche öppis.",
        hint: "wollen → wölle: du wottsch. etwas → öppis, kochen → choche.",
      },
      {
        kind: "free",
        prompt:
          "Bir arkadaşını akşam yemeğine davet eden kısa bir mesaj yaz. Üç noktaya değin: davet, ne pişireceğin, saat. İstersen ne alması gerektiğini de yaz.",
        checklist: [
          "Daveti açıkça yazdın mı?",
          "Ne pişireceğini söyledin mi?",
          "Saati belirttin mi? (am sächsi, am halbi sibni …)",
          "Lehçe biçimleri kullandın mı? (ich choche, wottsch du, mir ässed)",
        ],
        minWords: 25,
        phrases: [
          { de: "Chunsch du zum Znacht?", tr: "Akşam yemeğine gelir misin?" },
          { de: "Ich choche …", tr: "… pişiriyorum." },
          { de: "Mir ässed am …", tr: "Saat …'de yiyoruz." },
          { de: "Bring doch … mit.", tr: "… getirsene." },
          { de: "Ich fröie mi!", tr: "Sevinirim / dört gözle bekliyorum!" },
        ],
        sample:
          "Hoi Sara! Chunsch du am Friitig zum Znacht zu mir? Ich choche öppis us de Türkei — Linsesuppe und Reis mit Gmües. Mir ässed am halbi sibni. Wänn du wottsch, bring doch en Salaat mit. Säg mer bis am Dunschtig Bschäid. Ich fröie mi! Elif",
      },
    ],
  },
  {
    id: "zh-a1-w4",
    course: "gsw-zh",
    level: "A1",
    skill: "writing",
    title: "Mini Wohnig, min Alltag",
    genre: "Günlük yaşam",
    intro: "Evini ve günlük düzenini lehçeyle anlatacaksın.",
    gloss: [
      { de: "d Wohnig", tr: "daire" },
      { de: "ufschtaa", tr: "kalkmak (aufstehen)" },
      { de: "viertel ab", tr: "…i çeyrek geçe" },
      { de: "dihäi", tr: "evde" },
      { de: "läse", tr: "okumak (ich lise)" },
      { de: "de Feierabig", tr: "iş sonrası, mesai sonu" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Zürih'te küçük bir dairede oturuyorum.",
        answer: "Ich wohne z Züri i ere chliine Wohnig.",
        hint: "in einer → i ere; klein → chlii (söz başı k → ch).",
      },
      {
        kind: "build",
        tr: "Sabah yediyi çeyrek geçe kalkarım.",
        answer: "Ich schtaa am viertel ab sibni uf.",
        alternatives: ["Am Morge schtaa ich am viertel ab sibni uf."],
        hint: "aufstehen ayrılabilir: ich schtaa … uf. Saat: viertel ab sibni = 7.15.",
      },
      {
        kind: "build",
        tr: "Akşamları çoğunlukla evdeyim ve kitap okurum.",
        answer: "Am Aabig bin ich meischtens dihäi und lise es Buech.",
        hint: "zu Hause → dihäi; lesen → läse, ich lise. Buch → Buech.",
      },
      {
        kind: "free",
        prompt:
          "Bir gününü lehçeyle anlat. Üç noktaya değin: kaçta kalkıp ne yaptığın, gün içinde nereye gittiğin, akşamları ne yapmayı sevdiğin.",
        checklist: [
          "Sabah rutinini yazdın mı?",
          "Gün içinde nereye gittiğini yazdın mı? (go schaffe, i d Schuel …)",
          "Akşamları ne yaptığını yazdın mı?",
          "Saat ifadelerini lehçeyle kullandın mı? (am sibni, am halbi achti)",
        ],
        minWords: 30,
        phrases: [
          { de: "Ich schtaa am … uf.", tr: "Saat …'de kalkarım." },
          { de: "Zum Zmorge iss ich …", tr: "Kahvaltıda … yerim." },
          { de: "Ich gaa mit em Tram go schaffe.", tr: "İşe tramvayla giderim." },
          { de: "Am Namitag …", tr: "Öğleden sonra …" },
          { de: "Am Aabig bin ich dihäi.", tr: "Akşamları evdeyim." },
        ],
        sample:
          "Ich schtaa am viertel ab sibni uf. Zum Zmorge iss ich es Brot mit Chääs und trinke en Kafi. Denn gaa ich mit em Tram Nummere 11 go schaffe. Am Mittag iss ich mit mine Kollege i de Kantine. Am Namitag gaa ich no schnäll i d Migros. Am Aabig bin ich meischtens dihäi: ich choche öppis, lise es Buech oder lueg e Serie. Am Samschtig gaa ich gärn an See.",
      },
    ],
  },
];
