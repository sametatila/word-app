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
    id: "zh-a2-r3",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "D Waschchuchi-Ornig",
    genre: "Duyuru",
    intro:
      "Bir Zürih apartmanında çamaşırhane kurallarını okuyacaksın — İsviçre'de ev hayatının klasik konusu.",
    gloss: [
      { de: "d Waschchuchi", tr: "çamaşırhane (Waschküche)" },
      { de: "de Waschplan", tr: "çamaşır sırası çizelgesi" },
      { de: "de Tumbler", tr: "kurutma makinesi (İsviçre)" },
      { de: "putze", tr: "temizlemek" },
      { de: "s Sigel", tr: "işaret, plaka" },
      { de: "abmache", tr: "anlaşmak, kararlaştırmak" },
      { de: "s Fänschter", tr: "pencere" },
    ],
    minutes: 4,
    text:
      "Liebi Bewohnerinne und Bewohner\n\nDamit s i de Waschchuchi rund lauft, gäled ab sofort die Regle:\n\n1. Jedi Wonig hät zwäi Waschtäg im Monet. De Waschplan hanget näb de Tür.\n2. Wäsche vo de Maschine nää, sobald si fertig isch. Nach ere halbe Stund darf öpper anders si uselaa.\n3. De Tumbler-Filter nach jedem Bruuch putze — susch trochnet er schlächt.\n4. Am Sunntig und nach de zäni am Aabig wird nöd gwäsche.\n5. Zum Schluss: Bode wüsche und s Fänschter zuemache.\n\nWänn Ihre Tag emal nöd passt, chönd Si mit ere andere Partei tuusche — machend s äifach under enand ab.\n\nBsete Dank\nD Huusverwaltig",
    questions: [
      {
        text: "Wie vil Waschtäg hät e Wonig im Monet?",
        options: ["Zwäi", "Äin", "Vier"],
        answer: 0,
        explain: "Birinci kuralda „Jedi Wonig hät zwäi Waschtäg im Monet“ yazıyor.",
      },
      {
        text: "Was passiert, wänn d Wäsche z lang i de Maschine bliibt?",
        options: [
          "Nach ere halbe Stund darf öpper anders si uselaa",
          "Si wird wäggworfe",
          "Me mues zaale",
        ],
        answer: 0,
        explain:
          "İkinci kural: yarım saat sonra başka biri çamaşırı makineden çıkarabilir.",
      },
      {
        text: "Richtig oder falsch? Am Sunntig cha me wäsche.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Sunntig und nach de zäni am Aabig wird nöd gwäsche.“",
      },
      {
        text: "Was cha me mache, wänn de äige Tag nöd passt?",
        options: [
          "Mit ere andere Partei tuusche",
          "D Verwaltig aalüte",
          "Zwäi Täg spöter wäsche",
        ],
        answer: 0,
        explain:
          "Son paragraf: gün uymuyorsa başka bir daireyle kendi aranızda değiş tokuş yapabilirsiniz.",
      },
    ],
  },
  {
    id: "zh-a2-r4",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Grüess us de Ferie",
    genre: "Kart",
    intro: "Sara, Vierwaldstättersee'den arkadaşına tatil kartı yazmış. Kartı okuyacaksın.",
    gloss: [
      { de: "d Ferie", tr: "tatil (Ferien)" },
      { de: "s Schiff", tr: "gemi, vapur" },
      { de: "d Wanderig", tr: "doğa yürüyüşü" },
      { de: "gschtern", tr: "dün (gestern)" },
      { de: "s Wätter", tr: "hava" },
      { de: "rägne", tr: "yağmur yağmak" },
      { de: "de Bärg", tr: "dağ" },
    ],
    minutes: 3,
    text:
      "Liebi Fatma\n\nGrüess us Luzärn! Mir sind sit em Määndig da und s gfallt üs sehr guet. S Hotel isch chlii, aber ganz näb em See.\n\nGschtern sind mir mit em Schiff über de See gfahre und denn uf de Rigi ufe. D Uussicht vo obe isch der Wahnsinn — me gseet d Bärge und de ganz See.\n\nHüt rägnet s läider, drum bliibed mir i de Stadt und gönd is Verchehrshuus. Morn wämmer no e chlini Wanderig mache, wänn s Wätter besser wird.\n\nAm Sunntig sind mir wider z Züri. Denn verzell ich der alles!\n\nLiebi Grüess\nSara",
    questions: [
      {
        text: "Sit wänn isch d Sara z Luzärn?",
        options: ["Sit em Määndig", "Sit em Sunntig", "Sit gschtern"],
        answer: 0,
        explain: "„Mir sind sit em Määndig da“ — pazartesiden beri oradalar.",
      },
      {
        text: "Was händ si gschtern gmacht?",
        options: [
          "Si sind mit em Schiff gfahre und uf d Rigi ggange",
          "Si sind is Verchehrshuus ggange",
          "Si händ e Wanderig gmacht",
        ],
        answer: 0,
        explain:
          "Dün gemiyle göl turu ve Rigi dağı. Verkehrshaus bugünün planı, yürüyüş yarının.",
      },
      {
        text: "Warum gönd si hüt is Verchehrshuus?",
        options: ["Wil s rägnet", "Wil s Hotel zue isch", "Wil s billiger isch"],
        answer: 0,
        explain: "„Hüt rägnet s läider, drum bliibed mir i de Stadt“ — hava yağmurlu.",
      },
      {
        text: "Richtig oder falsch? D Sara chunt am Samschtig zrugg uf Züri.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Sunntig sind mir wider z Züri“ — pazar dönüyorlar.",
      },
    ],
  },
  {
    id: "zh-a2-r5",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Summer i de Badi",
    genre: "Program",
    intro: "Zürih'te bir açık hava havuzunun (Badi) yaz programını okuyacaksın.",
    gloss: [
      { de: "d Badi", tr: "açık hava havuzu / plaj (İsviçre)" },
      { de: "s Iitrittsgäld", tr: "giriş ücreti" },
      { de: "s Abo", tr: "abonman" },
      { de: "de Iigang", tr: "giriş" },
      { de: "gratis", tr: "ücretsiz" },
      { de: "s Grillplätzli", tr: "mangal alanı" },
      { de: "d Liegwiese", tr: "güneşlenme çimenliği" },
    ],
    minutes: 4,
    text:
      "Badi Utoquai — Summerprogramm\n\nOffe: Määndig bis Sunntig, 9 bis 20 Uhr. Bi schlächtem Wätter bliibt d Badi zue.\n\nIitrittsgäld: Erwachsni 8 Franke, Chind bis 16 gratis. S Summerabo choschtet 120 Franke und giltet i allne Badine vo de Stadt.\n\nFrüehschwümme: Zischtig und Dunschtig ab de sächsi am Morge, nume mit em Abo.\n\nUf de Liegwiese hät s zwäi Grillplätzli. Si chönd nöd reserviert wärde — wär zerscht chunt, chunt zerscht dra.\n\nS Bistro hät bis am nüüni offe. Am Mittwuch am Aabig git s Musig.",
    questions: [
      {
        text: "Wie vil zaalt es Chind vo zwölf Jaar?",
        options: ["Nüüt", "8 Franke", "120 Franke"],
        answer: 0,
        explain: "„Chind bis 16 gratis“ — 12 yaşındaki çocuk ücretsiz giriyor.",
      },
      {
        text: "Wänn cha me früeh schwümme gaa?",
        options: ["Am Zischtig und Dunschtig", "Jede Tag", "Am Wuchenänd"],
        answer: 0,
        explain: "„Früehschwümme: Zischtig und Dunschtig ab de sächsi“, üstelik sadece abonmanla.",
      },
      {
        text: "Richtig oder falsch? Me cha es Grillplätzli reserviere.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Si chönd nöd reserviert wärde“ — gelen ilk kişi kullanır.",
      },
      {
        text: "Was isch bsunders am Mittwuch?",
        options: ["Es git Musig am Aabig", "De Iitritt isch gratis", "D Badi isch bis 22 Uhr offe"],
        answer: 0,
        explain: "Son cümle: „Am Mittwuch am Aabig git s Musig.“",
      },
    ],
  },
  {
    id: "zh-a2-r6",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Uushilf im Café gsuecht",
    genre: "İlan",
    intro: "Zürih'te bir kafenin yarı zamanlı eleman ilanını okuyacaksın.",
    gloss: [
      { de: "d Uushilf", tr: "yardımcı eleman" },
      { de: "sueche", tr: "aramak" },
      { de: "de Loon", tr: "ücret, maaş" },
      { de: "d Erfaarig", tr: "deneyim" },
      { de: "zueverlässig", tr: "güvenilir" },
      { de: "sich mälde", tr: "başvurmak, haber vermek" },
      { de: "de Stundeloon", tr: "saat ücreti" },
    ],
    minutes: 3,
    text:
      "Café Sträähl im Chreis 6 suecht ab September e Uushilf.\n\nArbetsziite: Friitig und Samschtig, 8 bis 14 Uhr. Öppe zwölf Stund i de Wuche.\n\nDini Ufgabe: Gescht bediene, Kafi mache, abruume und d Chuchi suuber haa.\n\nMir wünsched üs: Erfaarig im Service isch schöön, aber käi Muess. Wichtiger sind Fründlichkäit und dass du zueverlässig bisch. Tüütsch bruuchsch, Mundart muesch nöd perfekt rede — bi eus lernsch si schnäll.\n\nLoon: 26 Franke Stundeloon.\n\nMäld di mit eme churze Mail bi de Frau Brunner: job@cafestraehl.ch. Mir mälded üs innerhalb vo ere Wuche.",
    questions: [
      {
        text: "Wänn mues me schaffe?",
        options: [
          "Am Friitig und Samschtig am Morge",
          "Jede Aabig",
          "Vo Määndig bis Friitig",
        ],
        answer: 0,
        explain: "„Friitig und Samschtig, 8 bis 14 Uhr“ — haftada iki gün, sabahları.",
      },
      {
        text: "Richtig oder falsch? Me mues scho Erfaarig im Service haa.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Erfaarig im Service isch schöön, aber käi Muess“ — şart değil.",
      },
      {
        text: "Wie vil verdient me i de Stund?",
        options: ["26 Franke", "12 Franke", "14 Franke"],
        answer: 0,
        explain: "„Loon: 26 Franke Stundeloon.“ 12 haftalık saat sayısı, 14 ise bitiş saati.",
      },
      {
        text: "Wie mäldet me sich?",
        options: [
          "Mit eme churze Mail a d Frau Brunner",
          "Persönlich im Café",
          "Mit eme Telefonaaruef",
        ],
        answer: 0,
        explain: "„Mäld di mit eme churze Mail bi de Frau Brunner“ — kısa bir e-postayla.",
      },
    ],
  },

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
    id: "zh-a2-l3",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Aamäldig im Chräiszbüro",
    genre: "Diyalog",
    intro:
      "Zürih'e taşınan Murat, ikamet kaydı için semt bürosunda. Görevliyle konuşmasını dinleyeceksin.",
    gloss: [
      { de: "sich aamälde", tr: "ikamet kaydı yaptırmak" },
      { de: "de Uuswiis", tr: "kimlik" },
      { de: "de Miatvertrag", tr: "kira sözleşmesi" },
      { de: "d Chrankekasse", tr: "sağlık sigortası (İsviçre'de zorunlu)" },
      { de: "d Frischt", tr: "süre, mühlet" },
      { de: "zügle", tr: "taşınmak (umziehen)" },
      { de: "d Gebüür", tr: "harç, ücret" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Beamtin", text: "Grüezi, was cha ich für Si tue?" },
      { speaker: "Murat", text: "Grüezi. Ich bi neu z Züri züglet und möcht mi aamälde." },
      {
        speaker: "Beamtin",
        text: "Gärn. Händ Si de Uuswiis und de Miatvertrag debii?",
      },
      { speaker: "Murat", text: "Ja, beides han ich da. Bruuched Si na öppis?" },
      {
        speaker: "Beamtin",
        text: "En Nochwiis vo de Chrankekasse. Wänn Si na käini händ: Si händ drei Mönet Ziit, das z regle.",
      },
      { speaker: "Murat", text: "Guet. Und was choschtet d Aamäldig?" },
      {
        speaker: "Beamtin",
        text: "Zwänzg Franke. Si chönd mit Karte zaale. De Uuswiis überchömed Si i öppe zää Täg mit de Poscht.",
      },
      { speaker: "Murat", text: "Merci vilmal!" },
    ],
    questions: [
      {
        text: "Warum isch de Murat im Büro?",
        options: ["Er wott sich aamälde", "Er suecht e Wonig", "Er wott en Pass abhole"],
        answer: 0,
        explain: "„Ich bi neu z Züri züglet und möcht mi aamälde“ — ikamet kaydı için.",
      },
      {
        text: "Was fehlt em na?",
        options: [
          "En Nochwiis vo de Chrankekasse",
          "De Miatvertrag",
          "De Uuswiis",
        ],
        answer: 0,
        explain: "Kimlik ve kira sözleşmesi yanında; eksik olan sağlık sigortası belgesi.",
      },
      {
        text: "Wie vil Ziit hät er für d Chrankekasse?",
        options: ["Drei Mönet", "Zää Täg", "E Wuche"],
        answer: 0,
        explain: "„Si händ drei Mönet Ziit, das z regle.“ On gün kimliğin postayla gelme süresi.",
      },
      {
        text: "Wie vil choschtet d Aamäldig?",
        options: ["Zwänzg Franke", "Zää Franke", "Nüüt"],
        answer: 0,
        explain: "„Zwänzg Franke. Si chönd mit Karte zaale.“",
      },
    ],
  },
  {
    id: "zh-a2-l4",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "D Wättervorhersaag",
    genre: "Radyo",
    intro: "Radyoda hafta sonu hava tahminini dinleyeceksin.",
    gloss: [
      { de: "d Vorhersaag", tr: "tahmin" },
      { de: "d Wulche", tr: "bulut" },
      { de: "de Nääbel", tr: "sis (Nebel)" },
      { de: "ufhäitere", tr: "açmak (hava)" },
      { de: "de Grad", tr: "derece" },
      { de: "s Gwitter", tr: "fırtına, gök gürültülü sağanak" },
      { de: "chüel", tr: "serin (kühl)" },
    ],
    minutes: 2,
    segments: [
      { text: "Und jetz s Wätter für s Wuchenänd." },
      {
        text: "Am Samschtig am Morge hät s im Flachland na Nääbel. Gäge Mittag häiteret s uf und d Sunne chunt.",
      },
      { text: "D Temperature stiiged uf zwänzgedrüü Grad — für de Oktober rächt warm." },
      {
        text: "Am Sunntig chömed vo Weschte her Wulche. Am Namitag mues me mit eme Gwitter rächne.",
      },
      { text: "I de Nacht uf Määndig wird s chüeler: nume na achti bis zää Grad." },
    ],
    questions: [
      {
        text: "Wie isch s Wätter am Samschtig am Morge?",
        options: ["Näbelig", "Sunnig", "Es rägnet"],
        answer: 0,
        explain: "„Am Samschtig am Morge hät s im Flachland na Nääbel“ — sisli başlıyor.",
      },
      {
        text: "Wie warm wird s am Samschtig?",
        options: ["23 Grad", "10 Grad", "8 Grad"],
        answer: 0,
        explain: "„zwänzgedrüü Grad“ = 23 derece; 8–10 derece pazartesi gecesi.",
      },
      {
        text: "Was passiert am Sunntig am Namitag?",
        options: ["Es cha es Gwitter gää", "D Sunne schiint", "Es schneit"],
        answer: 0,
        explain: "„Am Namitag mues me mit eme Gwitter rächne.“",
      },
    ],
  },
  {
    id: "zh-a2-l5",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Es Telefon mit de Nochbarin",
    genre: "Telefon",
    intro:
      "Frau Steiner tatile çıkıyor ve komşusundan bir ricası var. Telefon konuşmasını dinleyeceksin.",
    gloss: [
      { de: "d Nochbarin", tr: "kadın komşu" },
      { de: "d Pflanze giesse", tr: "çiçekleri sulamak" },
      { de: "de Schlüssel", tr: "anahtar" },
      { de: "de Briefchaschte", tr: "posta kutusu" },
      { de: "leere", tr: "boşaltmak" },
      { de: "es Gfalle tue", tr: "iyilik yapmak" },
      { de: "sicher", tr: "elbette, tabii" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Steiner", text: "Grüezi Frau Ochsner, do isch d Steiner vom zwäite Schtock." },
      { speaker: "Frau Ochsner", text: "Grüezi! Wie gaat s Ine?" },
      {
        speaker: "Frau Steiner",
        text: "Guet, merci. Du — ich gang am Friitig für zwäi Wuche uf Italie. Chönted Si mer es Gfalle tue?",
      },
      { speaker: "Frau Ochsner", text: "Sicher, gärn. Um was gaat s?" },
      {
        speaker: "Frau Steiner",
        text: "D Pflanze giesse, öppe zwäimal i de Wuche. Und de Briefchaschte leere wär super.",
      },
      { speaker: "Frau Ochsner", text: "Käi Problem. Händ Si en Schlüssel für mi?" },
      {
        speaker: "Frau Steiner",
        text: "Ja, ich bring en am Dunschtig verbii. D Pflanze staned uf em Balkon und i de Chuchi.",
      },
      { speaker: "Frau Ochsner", text: "Alles klar. Schööni Ferie und guet Reis!" },
    ],
    questions: [
      {
        text: "Wohi gaat d Frau Steiner?",
        options: ["Uf Italie", "Uf Luzärn", "I d Bärge"],
        answer: 0,
        explain: "„Ich gang am Friitig für zwäi Wuche uf Italie.“",
      },
      {
        text: "Was söll d Nochbarin mache?",
        options: [
          "D Pflanze giesse und de Briefchaschte leere",
          "D Chatz füettere",
          "D Wonig putze",
        ],
        answer: 0,
        explain: "İki rica: çiçekleri sulamak ve posta kutusunu boşaltmak.",
      },
      {
        text: "Wänn bringt si de Schlüssel verbii?",
        options: ["Am Dunschtig", "Am Friitig", "Am Määndig"],
        answer: 0,
        explain: "„Ich bring en am Dunschtig verbii“ — perşembe. Cuma gidiş günü.",
      },
      {
        text: "Wie oft mues me d Pflanze giesse?",
        options: ["Öppe zwäimal i de Wuche", "Jede Tag", "Äimal im Monet"],
        answer: 0,
        explain: "„öppe zwäimal i de Wuche“ — haftada yaklaşık iki kez.",
      },
    ],
  },
  {
    id: "zh-a2-l6",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Im Fundbüro",
    genre: "Diyalog",
    intro: "Elif tramvayda çantasını unutmuş. Kayıp eşya bürosundaki konuşmayı dinleyeceksin.",
    gloss: [
      { de: "s Fundbüro", tr: "kayıp eşya bürosu" },
      { de: "verlore", tr: "kaybolmuş, kaybettim" },
      { de: "d Täsche", tr: "çanta" },
      { de: "abgää", tr: "teslim etmek" },
      { de: "de Inhalt", tr: "içindekiler" },
      { de: "s Portmonnee", tr: "cüzdan (İsviçre'de yaygın)" },
      { de: "abhole", tr: "gelip almak" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Aagschtellte", text: "Grüezi, was cha ich für Si tue?" },
      {
        speaker: "Elif",
        text: "Grüezi. Ich han geschter im Tram Nummere 11 mini Täsche verlore.",
      },
      { speaker: "Aagschtellte", text: "Wie gseet si uus?" },
      {
        speaker: "Elif",
        text: "Si isch brun, us Läder, nöd sehr grooss. Inne sind es Buech und mis Portmonnee.",
      },
      {
        speaker: "Aagschtellte",
        text: "Momänt … Ja, do hät öpper geschter am Aabig e bruni Täsche abggää. Chönd Si mer säge, was für es Buech?",
      },
      { speaker: "Elif", text: "Es türkisches Chochbuech, rot." },
      {
        speaker: "Aagschtellte",
        text: "Das stimmt. Denn ghört si Ine. Bitte de Uuswiis zäige und da underschriibe.",
      },
      { speaker: "Elif", text: "Oh, super! Merci vilmal — das isch e Erliichterig." },
    ],
    questions: [
      {
        text: "Wo hät d Elif d Täsche verlore?",
        options: ["Im Tram Nummere 11", "Im Bus", "Im Zug"],
        answer: 0,
        explain: "„Ich han geschter im Tram Nummere 11 mini Täsche verlore.“",
      },
      {
        text: "Wie gseet d Täsche uus?",
        options: ["Brun und us Läder", "Schwarz und grooss", "Rot us Stoff"],
        answer: 0,
        explain: "„Si isch brun, us Läder, nöd sehr grooss.“ Kırmızı olan içindeki kitap.",
      },
      {
        text: "Womit bewiist d Elif, dass d Täsche ire ghört?",
        options: [
          "Si beschriibt s Buech i de Täsche",
          "Si zäigt es Foti",
          "Si nennt de Priis",
        ],
        answer: 0,
        explain: "Görevli içindeki kitabı soruyor; Elif „es türkisches Chochbuech, rot“ diyor.",
      },
      {
        text: "Was mues si am Schluss mache?",
        options: [
          "De Uuswiis zäige und underschriibe",
          "Zwänzg Franke zaale",
          "Morn wider choo",
        ],
        answer: 0,
        explain: "„Bitte de Uuswiis zäige und da underschriibe.“",
      },
    ],
  },

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
  {
    id: "zh-a2-w2",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "E Mail a d Verwaltig",
    genre: "E-posta",
    intro:
      "Evindeki bir arızayı yönetime lehçeyle bildireceksin: önce cümleler kur, sonra kısa bir e-posta yaz.",
    gloss: [
      { de: "d Huusverwaltig", tr: "bina yönetimi" },
      { de: "kaputt", tr: "bozuk" },
      { de: "d Heizig", tr: "kalorifer" },
      { de: "tropfe", tr: "damlamak" },
      { de: "de Hauswart", tr: "kapıcı, bina görevlisi (Abwart)" },
      { de: "vorbiicho", tr: "uğramak" },
      { de: "erreichbar", tr: "ulaşılabilir" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Kaloriferimiz iki gündür çalışmıyor.",
        answer: "Üsi Heizig gaat sit zwäi Täg nöd meh.",
        alternatives: ["Üsi Heizig funktioniert sit zwäi Täg nöd meh."],
        hint: "unsere → üsi; seit zwei Tagen → sit zwäi Täg; nicht mehr → nöd meh.",
      },
      {
        kind: "build",
        tr: "Mutfaktaki musluk da damlıyor.",
        answer: "De Hahne i de Chuchi tropft au.",
        hint: "Küche → Chuchi (söz başı k → ch, uzun ü/u); auch → au.",
      },
      {
        kind: "build",
        tr: "Perşembe öğleden sonra evdeyim.",
        answer: "Am Dunschtig am Namitag bin ich dihäi.",
        hint: "Donnerstag → Dunschtig (st → scht); zu Hause → dihäi.",
      },
      {
        kind: "free",
        prompt:
          "Bina yönetimine kısa bir e-posta yaz. Dört noktaya değin: kim olduğun ve hangi dairede oturduğun, sorunun ne olduğu, ne zamandır sürdüğü, ne zaman evde olduğun.",
        checklist: [
          "Hitap ve isim/daire bilgisi var mı? (Grüezi Frau/Herr …, ich wohne im … Schtock)",
          "Sorunu açıkça anlattın mı?",
          "Ne zamandır sürdüğünü yazdın mı?",
          "Ne zaman ulaşılabilir olduğunu yazdın mı?",
          "Kibar bir kapanış var mı? (Fründlichi Grüess)",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich wohne im … Schtock.", tr: "… katta oturuyorum." },
          { de: "… isch kaputt.", tr: "… bozuk." },
          { de: "Es gaat sit … nöd meh.", tr: "… beri çalışmıyor." },
          { de: "Chönted Si de Hauswart schicke?", tr: "Bina görevlisini gönderebilir misiniz?" },
          { de: "Ich bi am … dihäi.", tr: "… evdeyim." },
          { de: "Fründlichi Grüess", tr: "Saygılarımla" },
        ],
        sample:
          "Grüezi Frau Brunner\n\nIch bi de Murat Aydın und wohne a de Badenerstrass 12 im dritte Schtock. Üsi Heizig gaat sit zwäi Täg nöd meh — i de Wonig isch s am Morge nume na sibzää Grad. Zudem tropft de Hahne i de Chuchi.\n\nChönted Si bitte de Hauswart verbiischicke? Ich bi am Dunschtig und am Friitig am Namitag dihäi, susch bin ich uf em Handy erreichbar.\n\nMerci vilmal und fründlichi Grüess\nMurat Aydın",
      },
    ],
  },
  {
    id: "zh-a2-w3",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "Mis letschte Wuchenänd",
    genre: "Anlatı",
    intro:
      "Geçen hafta sonunu lehçeyle anlatacaksın. Lehçede geçmiş zaman hep Perfekt'tir — Präteritum yoktur.",
    gloss: [
      { de: "s Wuchenänd", tr: "hafta sonu" },
      { de: "gsii", tr: "olmuş (gewesen)" },
      { de: "ggange", tr: "gitmiş (gegangen)" },
      { de: "gsee", tr: "görmek (sehen) / gesehen" },
      { de: "z Fuess", tr: "yürüyerek" },
      { de: "de Sunntig", tr: "pazar" },
      { de: "gschlaafe", tr: "uyumuş (geschlafen)" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi göle gittim.",
        answer: "Am Samschtig bin ich an See ggange.",
        hint: "Perfekt: bin + ggange (gegangen). Präteritum lehçede kullanılmaz.",
      },
      {
        kind: "build",
        tr: "Akşam arkadaşlarımla pizza yedik.",
        answer: "Am Aabig händ mir mit mine Kollege Pizza ggässe.",
        hint: "wir haben → mir händ; gegessen → ggässe.",
      },
      {
        kind: "build",
        tr: "Pazar günü uzun uyudum ve hava çok güzeldi.",
        answer: "Am Sunntig han ich lang gschlaafe und s Wätter isch sehr schöön gsii.",
        hint: "war → isch … gsii (Perfekt); schön → schöön.",
      },
      {
        kind: "free",
        prompt:
          "Geçen hafta sonunu anlatan kısa bir metin yaz. Üç noktaya değin: cumartesi ne yaptığın, kiminle olduğun, pazar günü ne yaptığın. Hepsini Perfekt ile yaz.",
        checklist: [
          "Cumartesi ve pazarı ayrı ayrı anlattın mı?",
          "Kiminle olduğunu yazdın mı?",
          "Sadece Perfekt kullandın mı (Präteritum yok)?",
          "En az bir yer adı geçiyor mu? (an See, uf de Üetliberg, i d Stadt)",
        ],
        minWords: 40,
        phrases: [
          { de: "Am Samschtig bin ich … ggange.", tr: "Cumartesi …'e gittim." },
          { de: "Mir händ … gmacht.", tr: "… yaptık." },
          { de: "Es isch … gsii.", tr: "… idi." },
          { de: "Zerscht … und denn …", tr: "Önce … sonra …" },
          { de: "Am Sunntig han ich …", tr: "Pazar günü …" },
        ],
        sample:
          "Am Samschtig bin ich am Morge uf de Märt ggange und han Gmües und Brot kauft. Am Namitag han ich mi mit de Anna troffe — mir sind mit em Velo em See naa gfahre und händ es Glace ggässe. Am Aabig händ mir bi mir dihäi Pizza gmacht. Am Sunntig han ich lang gschlaafe. Denn bin ich uf de Üetliberg gwanderet. D Uussicht isch super gsii. Am Aabig han ich no es Buech gläse. Es isch es schööns Wuchenänd gsii.",
      },
    ],
  },
  {
    id: "zh-a2-w4",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "Uf e Stelleaazäig antworte",
    genre: "Başvuru",
    intro:
      "Kafe ilanına (zh-a2-r6) kısa bir başvuru mesajı yazacaksın. İsviçre'de ilk temas çoğu zaman kısa ve nettir.",
    gloss: [
      { de: "d Stell", tr: "iş, pozisyon" },
      { de: "sich intressiere für", tr: "…yle ilgilenmek" },
      { de: "d Erfaarig", tr: "deneyim" },
      { de: "verfüegbar", tr: "müsait" },
      { de: "de Läbeslauf", tr: "özgeçmiş (CV)" },
      { de: "sich fröie", tr: "sevinmek, memnun olmak" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "İlanınızı internette gördüm.",
        answer: "Ich han Ihri Aazäig im Internet gsee.",
        hint: "sehen → gsee (Perfekt: han … gsee); Ihre → Ihri.",
      },
      {
        kind: "build",
        tr: "İki yıl bir kafede çalıştım.",
        answer: "Ich han zwäi Jaar imene Café gschaffet.",
        alternatives: ["Ich han zwäi Jaar i eme Café gschaffet."],
        hint: "arbeiten → schaffe, Perfekt: han … gschaffet. Jahr → Jaar.",
      },
      {
        kind: "build",
        tr: "Cuma ve cumartesi müsaitim.",
        answer: "Am Friitig und am Samschtig bin ich verfüegbar.",
        hint: "Freitag → Friitig, Samstag → Samschtig.",
      },
      {
        kind: "free",
        prompt:
          "Café Sträähl'in ilanına kısa bir e-posta yaz. Dört noktaya değin: hangi iş için yazdığın, kim olduğun, deneyimin (varsa yoksa da bunu dürüstçe yaz), ne zaman müsait olduğun.",
        checklist: [
          "Hangi ilan için yazdığını belirttin mi?",
          "Kendini kısaca tanıttın mı?",
          "Deneyimin hakkında bir şey yazdın mı?",
          "Müsait olduğun günleri yazdın mı?",
          "Kibar bir kapanış var mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Ich schriibe Ine wäge de Stell als …", tr: "… pozisyonu için yazıyorum." },
          { de: "Ich han Ihri Aazäig gsee.", tr: "İlanınızı gördüm." },
          { de: "Ich han scho … gschaffet.", tr: "Daha önce … çalıştım." },
          { de: "Ich ha na käi Erfaarig, aber …", tr: "Henüz deneyimim yok ama …" },
          { de: "Ich chönt ab em … aafange.", tr: "…'den itibaren başlayabilirim." },
          { de: "Gärn schick ich Ine min Läbeslauf.", tr: "Memnuniyetle CV'mi gönderirim." },
        ],
        sample:
          "Grüezi Frau Brunner\n\nIch schriibe Ine wäge de Stell als Uushilf im Café Sträähl. Ich han Ihri Aazäig im Internet gsee.\n\nIch häisse Elif Demir, bi vieredrissg und wohne sit eme Jaar z Züri im Chreis 6. I de Türkei han ich zwäi Jaar imene Café gschaffet, drum kenne ich de Service und d Kassa.\n\nAm Friitig und am Samschtig bin ich de ganz Tag verfüegbar; ich chönt ab em erschte Septämber aafange. Mis Tüütsch isch guet, d Mundart verstaan ich scho rächt guet und lerne wiiter.\n\nGärn schick ich Ine min Läbeslauf. Ich fröie mi uf Ihri Antwort.\n\nFründlichi Grüess\nElif Demir",
      },
    ],
  },
];
