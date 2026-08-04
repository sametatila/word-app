import type { SkillExercise } from "../types";

/**
 * Zürih Almancası (gsw-zh) A2 — okuma, dinleme ve yazma.
 * Yazım data/zurich/style-guide.md'ye (Dieth temelli) uyar; açıklamalar Türkçe.
 */
export const zhA2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "zh-a2-r1",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "WG-Zimmer z Züri-Wiedike",
    genre: "İlan",
    intro: "Zürih Wiedikon'da bir öğrenci evinin (WG) oda ilanını okuyacaksın.",
    gloss: [
      { de: "s Zimmer", tr: "oda" },
      { de: "d Miete", tr: "kira" },
      { de: "sueche", tr: "aramak" },
      { de: "s Huustier", tr: "evcil hayvan" },
      { de: "erlaubt", tr: "izinli, serbest" },
      { de: "z Fuess", tr: "yürüyerek" },
      { de: "d Bsichtigung", tr: "evi gezip görme" },
    ],
    minutes: 3,
    text:
      "Schööns Zimmer i de 3er-WG z Züri-Wiedike frei. S Zimmer isch 16 Quadratmeter grooss und hät en Balkon. Mir sind zwoo Studäntine und sind vil dihäi. D Miete isch 780 Franke im Monet, alles inklusiv. S Tram Nummere 9 halted grad vor em Huus, und de Bahnhof Wiedike isch nu füüf Minuute z Fuess ewäg. Mir sueched öpper, wo gärn zäme chocht und am Aabig nöd z lut Musig loset. Es Huustier isch leider nöd erlaubt. S Zimmer isch ab em 1. Oktober frei.\n\nHäsch Intresse? Dänn schriib eus es Mail bis am Friitig. D Bsichtigung isch am Samschtig am Namittag.",
    questions: [
      {
        text: "Wie vil choschtet s Zimmer im Monet?",
        options: ["780 Franke", "870 Franke", "780 Franke plus Näbechöschte"],
        answer: 0,
        explain:
          "İlanda „D Miete isch 780 Franke im Monet, alles inklusiv“ yazıyor — her şey dahil 780 frank.",
      },
      {
        text: "Richtig oder falsch? Es Huustier isch i de WG erlaubt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Es Huustier isch leider nöd erlaubt“ — evcil hayvan yasak.",
      },
      {
        text: "Wänn isch d Bsichtigung?",
        options: ["Am Samschtig am Namittag", "Am Friitig am Morge", "Am 1. Oktober"],
        answer: 0,
        explain:
          "Son cümle: „D Bsichtigung isch am Samschtig am Namittag.“ 1 Ekim odanın boşalacağı tarih, cuma ise yazma sınırı.",
      },
      {
        text: "Was für öpper sueched d Studäntine?",
        options: [
          "Öpper, wo gärn zäme chocht",
          "Öpper, wo lut Musig loset",
          "Öpper mit eme Huustier",
        ],
        answer: 0,
        explain:
          "Metinde „Mir sueched öpper, wo gärn zäme chocht“ deniyor — birlikte yemek pişirmeyi seven biri. Lehçede ilgi cümlesi „wo“ ile kurulur.",
      },
    ],
  },
  {
    id: "zh-a2-r2",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Wanderig uf de Üetliberg",
    genre: "Mesaj",
    intro: "Nadja'nın arkadaşı Selin'e yazdığı hafta sonu yürüyüş planını okuyacaksın.",
    gloss: [
      { de: "d Wanderig", tr: "doğa yürüyüşü" },
      { de: "sich träffe", tr: "buluşmak" },
      { de: "s Züügli", tr: "küçük tren (Uetlibergbahn)" },
      { de: "d Ussicht", tr: "manzara" },
      { de: "mitnää", tr: "yanında getirmek" },
      { de: "rägne", tr: "yağmur yağmak" },
      { de: "Bschäid gää", tr: "haber vermek" },
    ],
    minutes: 3,
    text:
      "Hoi Selin! Wie gaats der? Am Sunntig mached mir e chliini Wanderig uf de Üetliberg. Mir träffed eus am zäni am Hauptbahnhof und näämed s Züügli bis uf d Station Üetliberg. Vo dört laufed mir öppe e halbi Stund bis zum Gipfel. S Wätter söll schöön werde! Obe hät me e tolli Ussicht uf d Stadt und de See. Ich nime es Picknick mit — chasch du öppis z Trinke mitnää? Wänns rägnet, gömmer statt däm is Museum. Gib mer bitte bis am Friitig Bschäid.\n\nLiebi Grüess\nNadja",
    questions: [
      {
        text: "Wänn träffed sich Nadja und Selin?",
        options: ["Am Sunntig am zäni", "Am Friitig am zäni", "Am Sunntig am zwölfi"],
        answer: 0,
        explain:
          "Mesajda „Am Sunntig … mir träffed eus am zäni am Hauptbahnhof“ diyor — pazar sabahı saat onda.",
      },
      {
        text: "Was söll d Selin mitnää?",
        options: ["Öppis z Trinke", "Es Picknick", "E Charte"],
        answer: 0,
        explain:
          "Nadja soruyor: „chasch du öppis z Trinke mitnää?“ Pikniği kendisi getiriyor, Selin'den içecek istiyor.",
      },
      {
        text: "Richtig oder falsch? Wänns rägnet, gönd si is Museum.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Wänns rägnet, gömmer statt däm is Museum“ — yağmur planı müze.",
      },
      {
        text: "Wie lang laufed si vo de Station bis zum Gipfel?",
        options: ["Öppe e halbi Stund", "Zwoo Stunde", "Zää Minuute"],
        answer: 0,
        explain: "„Vo dört laufed mir öppe e halbi Stund bis zum Gipfel“ — yaklaşık yarım saat.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "zh-a2-l1",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "En Termin bim Dokter",
    genre: "Diyalog",
    intro: "Frau Yıldız muayenehaneyi arıyor — randevunun gününe ve saatine kulak ver.",
    gloss: [
      { de: "s Halsweh", tr: "boğaz ağrısı" },
      { de: "s Fieber", tr: "ateş" },
      { de: "de Termin", tr: "randevu" },
      { de: "übercho", tr: "almak (bekommen)" },
      { de: "d Versicherigscharte", tr: "sağlık sigortası kartı" },
      { de: "aalüte", tr: "telefon etmek" },
      { de: "voll", tr: "dolu" },
    ],
    minutes: 3,
    segments: [
      {
        speaker: "Frau Yıldız",
        text: "Grüezi, isch das d Praxis vom Dokter Huber? Ich häisse Yıldız. Ich ha siit geschter Halsweh und Fieber. Chan ich hüt na en Termin übercho?",
      },
      {
        speaker: "Praxisassistäntin",
        text: "Grüezi Frau Yıldız. Hüt isch es leider ganz voll. Aber morn am halbi nüüni chan ich Ihne en Termin gää.",
      },
      {
        speaker: "Frau Yıldız",
        text: "Hmm, morn am Morge mues ich schaffe. Gaats au am Namittag?",
      },
      {
        speaker: "Praxisassistäntin",
        text: "En Momänt bitte … Ja, morn am viertel ab drüü isch na öppis frei.",
      },
      { speaker: "Frau Yıldız", text: "Das passt guet. Mues ich öppis mitbringe?" },
      {
        speaker: "Praxisassistäntin",
        text: "Bitte bringed Si Ihri Versicherigscharte mit. Und wänn s Fieber hüt na höcher wird, lüted Si bitte grad wider aa.",
      },
      { speaker: "Frau Yıldız", text: "Mach ich. Merci vilmal, uf Widerlose!" },
    ],
    questions: [
      {
        text: "Warum lütet d Frau Yıldız aa?",
        options: [
          "Si hät Halsweh und Fieber.",
          "Si bruucht es Rezäpt.",
          "Si wott en Termin absäge.",
        ],
        answer: 0,
        explain:
          "İlk cümlesinde söylüyor: „Ich ha siit geschter Halsweh und Fieber.“ Randevu iptali ya da reçete geçmiyor.",
      },
      {
        text: "Wänn isch de Termin?",
        options: ["Morn am viertel ab drüü", "Morn am halbi nüüni", "Hüt am Namittag"],
        answer: 0,
        explain:
          "Sabah 8.30 teklif edildi ama Frau Yıldız çalışıyor; anlaşılan randevu „morn am viertel ab drüü“ — yarın 15.15.",
      },
      {
        text: "Warum gaat de Termin am Morge nöd?",
        options: ["Si mues schaffe.", "D Praxis isch zue.", "Si isch nöd i de Stadt."],
        answer: 0,
        explain: "„Morn am Morge mues ich schaffe“ diyor — lehçede çalışmak „schaffe“dir.",
      },
      {
        text: "D Frau Yıldız söll d Versicherigscharte mitbringe.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: asistan „Bitte bringed Si Ihri Versicherigscharte mit“ diyor.",
      },
    ],
  },
  {
    id: "zh-a2-l2",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Mit em Tram zum Zoo",
    genre: "Diyalog",
    intro: "Selin, Zürih'te tramvay ve bilet soruyor — hat numarasına ve fiyata dikkat et.",
    gloss: [
      { de: "s Billett", tr: "bilet" },
      { de: "d Zone", tr: "bölge (ZVV tarife bölgesi)" },
      { de: "gälte", tr: "geçerli olmak" },
      { de: "iistiige", tr: "binmek" },
      { de: "d Buess", tr: "para cezası" },
      { de: "d Ändstation", tr: "son durak" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Selin", text: "Grüezi! Ich mues zum Zoo. Weles Tram nimm ich am beschte?" },
      {
        speaker: "Herr Frei",
        text: "Grüezi! Si nämed s Tram Nummere säx bis a d Ändstation Zoo. Es faart grad da vorne ab.",
      },
      { speaker: "Selin", text: "Und was für es Billett bruuch ich?" },
      {
        speaker: "Herr Frei",
        text: "Für d Stadt Züri bruuched Si es Billett für zwoo Zone. Das choschtet vier Franke sächzg und gilt äi Stund.",
      },
      { speaker: "Selin", text: "Chan ich s Billett au mit em Handy chaufe?" },
      {
        speaker: "Herr Frei",
        text: "Ja, mit de ZVV-App gaats ganz eifach. Aber chaufed Sis, bevor Si iistiiged — susch gits bi de Kontrolle e Buess.",
      },
      { speaker: "Selin", text: "Guet z wüsse! Und wie lang gaats bis zum Zoo?" },
      {
        speaker: "Herr Frei",
        text: "Öppe zwänzg Minuute. Bim Zoo müend Si dänn na es chliises Stück de Bärg uf laufe.",
      },
      { speaker: "Selin", text: "Merci vilmal für d Hilf!" },
    ],
    questions: [
      {
        text: "Weles Tram söll d Selin nää?",
        options: ["S Tram Nummere säx", "S Tram Nummere nüün", "De Bus Nummere säx"],
        answer: 0,
        explain: "Herr Frei „s Tram Nummere säx bis a d Ändstation Zoo“ diyor.",
      },
      {
        text: "Wie vil choschtet s Billett?",
        options: ["Vier Franke sächzg", "Säx Franke vierzg", "Zwoo Franke"],
        answer: 0,
        explain: "„Das choschtet vier Franke sächzg“ — 4.60 frank, iki bölgelik şehir bileti.",
      },
      {
        text: "Wo chan d Selin s Billett au chaufe?",
        options: ["Mit de ZVV-App", "Nume am Schalter", "Bim Tramchauffeur"],
        answer: 0,
        explain:
          "„Mit de ZVV-App gaats ganz eifach“ — ama tramvaya binmeden önce almak gerekiyor, yoksa ceza var.",
      },
      {
        text: "S Billett gilt zwoo Stunde.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: bilet „äi Stund“ — yalnızca bir saat geçerli.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "zh-a2-w1",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "En Iiladig beantworte",
    genre: "Mesaj",
    intro: "Komşunun Apéro davetine nazikçe cevap yazmayı çalışıyorsun: teşekkür, durum, öneri.",
    gloss: [
      { de: "d Iiladig", tr: "davet" },
      { de: "de Apéro", tr: "aperitif buluşması (İsviçre geleneği)" },
      { de: "mitbringe", tr: "yanında getirmek" },
      { de: "leider", tr: "maalesef" },
      { de: "sich träffe", tr: "buluşmak" },
      { de: "sich fröie uf", tr: "-i iple çekmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Davetin için çok teşekkür ederim.",
        answer: "Merci vilmal für dini Iiladig.",
        hint: "Günlük teşekkür kalıbı „Merci vilmal“; für'den sonra „dini Iiladig“ gelir.",
      },
      {
        kind: "build",
        tr: "Maalesef cumartesi gelemiyorum, çünkü çalışmak zorundayım.",
        answer: "Leider chan ich am Samschtig nöd choo, wil ich schaffe mues.",
        alternatives: ["Ich chan leider am Samschtig nöd choo, wil ich schaffe mues."],
        hint: "„wil“ bağlacından sonra çekimli fiil (mues) sona gider; „arbeiten“ değil, lehçede schaffe.",
      },
      {
        kind: "build",
        tr: "Belki gelecek hafta buluşabiliriz.",
        answer: "Villicht chönd mir eus nächscht Wuche träffe.",
        alternatives: ["Mir chönd eus villicht nächscht Wuche träffe."],
        hint: "Cümle „villicht“ ile başlasa da çekimli fiil (chönd) ikinci sırada kalır.",
      },
      {
        kind: "free",
        prompt:
          "Komşun Rosmarie'nin Apéro davetine kısa bir mesajla cevap ver: davet için teşekkür et, gelip gelemeyeceğini ve saat kaçta geleceğini söyle, yanında ne getireceğini yaz.",
        stimulus:
          "Hoi mitenand!\n\nMir mached am Friitig ab de sächsi en chliine Apéro uf üsem Balkon. Chunsch au? Es git Wii, Moscht und öppis Chliises z Ässe. Gib mer doch churz Bschäid.\n\nLiebi Grüess\nRosmarie us em 3. Stock",
        checklist: [
          "Davet için teşekkür ettin mi?",
          "Gelip gelemeyeceğini ve saatini yazdın mı?",
          "Ne getireceğini söyledin mi?",
          "Selamlama ve kapanış cümlen var mı?",
        ],
        minWords: 30,
        phrases: [
          { de: "Merci vilmal für d Iiladig.", tr: "Davet için çok teşekkürler." },
          { de: "Ich chume gärn.", tr: "Seve seve gelirim." },
          { de: "Leider chan ich ersch am ... choo.", tr: "Maalesef ancak saat ...'te gelebilirim." },
          { de: "Ich bringe ... mit.", tr: "Yanımda ... getiririm." },
          { de: "Ich fröie mi scho uf de Apéro.", tr: "Apéro'yu şimdiden iple çekiyorum." },
          { de: "Bis am Friitig!", tr: "Cuma görüşürüz!" },
        ],
        sample:
          "Hoi Rosmarie\n\nMerci vilmal für d Iiladig! Ich chume sehr gärn. Ich mues aber bis am halbi sibni schaffe, drum chume ich ersch öppe am sibni. Ich bringe e Flasche Moscht und es paar Salzstängeli mit. Ich fröie mi scho uf de Apéro!\n\nLiebi Grüess\nDeniz",
      },
    ],
  },
];
