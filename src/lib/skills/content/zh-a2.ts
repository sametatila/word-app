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

  // ── Hikâye dizisi: Deniz ve Sara Zürih'te ev arıyor. A2'nin yeni
  //    alıştırmalarında ilan → dosya → red → kabul → taşınma sırası.
  {
    id: "zh-a2-r7",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Achtzg Lüüt a de Bsichtigung",
    genre: "Mesaj",
    intro:
      "Deniz ilk ev gezmesine gitti ve arkadaşına yazıyor. A2'de takip edeceğin hikâyenin başlangıcı.",
    gloss: [
      { de: "d Bsichtigung", tr: "ev gezme randevusu" },
      { de: "d Schlange", tr: "kuyruk" },
      { de: "s Dossier", tr: "başvuru dosyası" },
      { de: "de Betriibigsuszug", tr: "icra kaydı belgesi" },
      { de: "d Chance", tr: "şans" },
      { de: "uufgää", tr: "vazgeçmek" },
      { de: "wiitersueche", tr: "aramaya devam etmek" },
    ],
    minutes: 4,
    text:
      "Hoi Murat\n\nIch chume grad vo de erschte Bsichtigung. Du glaubsch mer s nöd: Es sind öppe achtzg Lüüt do gsii. Für drei Zimmer.\n\nMe hät i de Schlange gwartet, denn isch me sibe Minute dure d Wonig gloffe, und am Uusgang hät e Frau vo de Verwaltig d Dossiers iigsammlet. Käi Gspröch, käi Frag. Nur: „Merci, mir mälded üs.“\n\nEs Dossier bruuchsch komplett: Loonuuszüüg, Betriibigsuszug, Kopie vom Uuswiis. Wär s nöd debii hät, chunt gar nöd i Frag. Ich han s zum Glück gha.\n\nD Wonig sälber isch okay gsii. Chlii, aber häll, und s Tram isch vor de Tür.\n\nIch gib mir drei Mönet. Wänn s bis denn nöd klappt, sueche mir usserhalb.\n\nLiebi Grüess\nDeniz",
    questions: [
      {
        text: "Wie vill Lüüt sind a de Bsichtigung gsii?",
        options: ["Öppe achtzg", "Öppe achti", "Drei"],
        answer: 0,
        explain: "„Es sind öppe achtzg Lüüt do gsii. Für drei Zimmer.“",
      },
      {
        text: "Wie lang hät d Bsichtigung duuret?",
        options: ["Sibe Minute", "E halbi Stund", "Zwo Stund"],
        answer: 0,
        explain: "„isch me sibe Minute dure d Wonig gloffe.“",
      },
      {
        text: "Was passiert mit em Dossier?",
        options: [
          "Am Uusgang wird s iigsammlet",
          "Me schickt s per Poscht",
          "Me git s im Gspröch ab",
        ],
        answer: 0,
        explain: "Görüşme ya da soru yok — sadece „Merci, mir mälded üs.“",
      },
      {
        text: "Was passiert, wänn s Dossier nöd komplett isch?",
        options: [
          "Me chunt gar nöd i Frag",
          "Me cha s spöter schicke",
          "Me zaalt meh Kaution",
        ],
        answer: 0,
        explain: "„Wär s nöd debii hät, chunt gar nöd i Frag.“",
      },
      {
        text: "Was macht de Deniz, wänn s nöd klappt?",
        options: [
          "Nach drei Mönet usserhalb sueche",
          "Sofort uufgää",
          "E grösseri Wonig sueche",
        ],
        answer: 0,
        explain: "„Ich gib mir drei Mönet.“",
      },
    ],
  },
  {
    id: "zh-a2-r8",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "S Dossier für e Wonig",
    genre: "Rehber",
    intro:
      "Zürih'te ev bulmanın asıl sınavı: dosya. Neyin gerektiğini anlatan bir rehber.",
    gloss: [
      { de: "s Dossier", tr: "başvuru dosyası" },
      { de: "de Loonuuszug", tr: "maaş bordrosu" },
      { de: "de Betriibigsuszug", tr: "icra takibi kaydı" },
      { de: "d Referänz", tr: "referans" },
      { de: "de Vermieter", tr: "ev sahibi" },
      { de: "d Kaution", tr: "depozito" },
      { de: "vollständig", tr: "eksiksiz" },
      { de: "d Absaag", tr: "ret" },
    ],
    minutes: 5,
    text:
      "Wär z Züri e Wonig suecht, konkurriert mit vilne. Es vollständigs Dossier isch drum wichtiger als es schöns Aaschriibe.\n\nDas ghört immer dezue:\n– Aamäldigsformular vo de Verwaltig, komplett uusgfüllt\n– Kopie vom Uuswiis oder Pass (mit Uufenthaltsbewilligung)\n– di letschte drei Loonuuszüüg\n– en aktuelle Betriibigsuszug (nöd elter als drei Mönet, choschtet 17 Franke)\n– d Referänz vom letschte Vermieter mit Telefonnummere\n\nWas hilft, aber nöd nötig isch: es churzes Schriibe über eu sälber. Zwäi, drei Sätz gnüeged — wär ihr sind, was ihr schaffed, wie vill Lüüt iizieht.\n\nDrei praktischi Punkt:\n\n1. Mached s Dossier äimal als PDF und schicked immer s gliiche. So verlüüred ihr käi Ziit.\n2. D Kaution isch mäischtens drei Monetsmiete. Es git au Firme, wo si versichered — das isch tüürer, aber me mues nöd alles uf äimal haa.\n3. E Absaag isch normal. Di mäischte Lüüt bruuched zwänzg bis vierzg Bewärbige. Das häisst nöd, dass öppis mit eu nöd stimmt.",
    questions: [
      {
        text: "Was isch wichtiger als es schöns Aaschriibe?",
        options: [
          "Es vollständigs Dossier",
          "E hooche Kaution",
          "E gueti Referänz",
        ],
        answer: 0,
        explain: "İlk paragrafın ana cümlesi.",
      },
      {
        text: "Wie alt darf de Betriibigsuszug sii?",
        options: ["Höchschtens drei Mönet", "Es Jaar", "Es spielt käi Rolle"],
        answer: 0,
        explain: "„nöd elter als drei Mönet, choschtet 17 Franke.“",
      },
      {
        text: "Wie lang söll s Schriibe über sich sälber sii?",
        options: ["Zwäi, drei Sätz", "E ganzi Siite", "Es isch nöd erlaubt"],
        answer: 0,
        explain: "Zorunlu değil ama iki üç cümle yardımcı oluyor.",
      },
      {
        text: "Wie vill isch d Kaution mäischtens?",
        options: ["Drei Monetsmiete", "Ei Monetsmiete", "17 Franke"],
        answer: 0,
        explain: "Sigortalayan firmalar da var ama daha pahalıya geliyor.",
      },
      {
        text: "Was säit de Text über Absääge?",
        options: [
          "Si sind normal — di mäischte bruuched 20 bis 40 Bewärbige",
          "Si bedüüted, dass s Dossier schlächt isch",
          "Si sind sälte",
        ],
        answer: 0,
        explain: "„Das häisst nöd, dass öppis mit eu nöd stimmt.“",
      },
    ],
  },
  {
    id: "zh-a2-r9",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "De Zügeltermin",
    genre: "Kültür",
    intro:
      "İsviçre'de neredeyse herkes aynı iki günde taşınır. Bunun nedenini anlatan kısa bir yazı.",
    gloss: [
      { de: "de Zügeltermin", tr: "resmî taşınma tarihi" },
      { de: "zügle", tr: "taşınmak" },
      { de: "kündige", tr: "sözleşmeyi feshetmek" },
      { de: "d Frischt", tr: "süre" },
      { de: "de Zügelwage", tr: "nakliye aracı" },
      { de: "usbuecht", tr: "dolu, yer kalmamış" },
      { de: "d Übergab", tr: "teslim" },
    ],
    minutes: 4,
    text:
      "Wär im März oder im Septämber dur Züri lauft, gseet überall Zügelwäge. Das isch käi Zuefall.\n\nI de mäischte Mietverträg staat, dass me nur uf bestimmti Termin cha kündige — mäischtens de 31. März und de 30. Septämber. Dezue chunt e Kündigigsfrischt vo drei Mönet. Wär also im Septämber uszieht, mues bis Ändi Juni kündige.\n\nD Folg: Alli zügled am gliiche Tag. Zügelfirme sind Mönet vorher usbuecht, und en Lieferwage z miete am 31. März isch fascht unmöglich.\n\nFür Nöiaakömmlig isch das komisch. Es hät aber en Vortäil: Wär e Wonig suecht, findet grad vor dene Termin am mäischte Aagebot.\n\nEn Tipp: Wänn ihr chönd, zügled ihr am Tag vorher oder am Tag nachhär. D Priise sind tüüfer und ihr händ Ziit für d Übergab.",
    questions: [
      {
        text: "Warum zügled alli am gliiche Tag?",
        options: [
          "Well me nur uf bestimmti Termin cha kündige",
          "Well d Priise denn tüüfer sind",
          "Well s Wätter besser isch",
        ],
        answer: 0,
        explain: "Sözleşmeler 31 Mart ve 30 Eylül'e bağlıyor.",
      },
      {
        text: "Bis wänn mues me kündige, wänn me im Septämber uszieht?",
        options: ["Bis Ändi Juni", "Bis Ändi Auguscht", "Bis Ändi März"],
        answer: 0,
        explain: "Üç ay ihbar süresi: eylül için haziran sonu.",
      },
      {
        text: "Was isch am 31. März schwiirig?",
        options: [
          "En Lieferwage z miete",
          "E Wonig z finde",
          "D Kündigung z schriibe",
        ],
        answer: 0,
        explain: "Nakliye firmaları aylar öncesinden dolu.",
      },
      {
        text: "Welle Vortäil nennt de Text?",
        options: [
          "Vor dene Termin git s am mäischte Aagebot",
          "D Miete isch günschtiger",
          "Me mues nöd putze",
        ],
        answer: 0,
        explain: "Ev arayan için bu tarihlerden önce arz en yüksek.",
      },
      {
        text: "Was empfilt de Text?",
        options: [
          "En Tag vorher oder nachhär zügle",
          "Immer am 31. März zügle",
          "Ohni Zügelfirma zügle",
        ],
        answer: 0,
        explain: "Fiyatlar düşük olur ve teslim için vakit kalır.",
      },
    ],
  },
  {
    id: "zh-a2-r10",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Füf Aazäige",
    genre: "Sınav formatı",
    intro:
      "Kısa ilanlar ve kimin neye ihtiyacı olduğu. Önce hepsini oku, sonra eşleştir.",
    gloss: [
      { de: "möbliert", tr: "eşyalı" },
      { de: "s Untermiet", tr: "kiracıdan kiralama" },
      { de: "befristet", tr: "süreli" },
      { de: "s Parkfäld", tr: "park yeri" },
      { de: "d Nachmiete", tr: "devralan kiracı" },
      { de: "per sofort", tr: "hemen" },
      { de: "s Zimmer", tr: "oda" },
    ],
    minutes: 4,
    text:
      "A) Zimmer im Untermiet, möbliert, Chreis 3. Befristet für sächs Mönet, ab 1. Oktober. 890 Franke inkl. Nur für Studänte. Tel. 079 331 22 11\n\nB) 2-Zimmer-Wonig, Chreis 11, 1'450 Franke. Per sofort. Kä Huustier. Bsichtigung am Zischtig am sibni. Verwaltung Hubmann, 044 311 55 00\n\nC) Suechen Nachmiete für mini 3-Zimmer-Wonig im Chreis 4 ab 1. April, 1'980 Franke. Balkon, Lift. Schriibed mer: nachmiete.chreis4@mail.ch\n\nD) Parkfäld i de Tiefgarage z vermiete, Chreis 6, 180 Franke im Monet. Sofort frei. Tel. 076 900 41 41\n\nE) WG suecht neus Mitglied, 27 m², Chreis 5, 1'050 Franke. Mir sind drü Lüüt zwüsche 24 und 31. Bsichtigung nach Abmachig: wg-limmat@mail.ch",
    questions: [
      {
        text: "D Ayla studiert und bliibt nur es halbs Jaar z Züri. Welli Aazäig passt?",
        options: ["A", "C", "E"],
        answer: 0,
        explain: "A ilanı altı aylık, eşyalı ve sadece öğrenciler için.",
      },
      {
        text: "E Familie mit ere Chatz suecht e Wonig. Welli Aazäig passt NÖD?",
        options: ["B", "C", "D"],
        answer: 0,
        explain: "B ilanında „Kä Huustier“ yazıyor.",
      },
      {
        text: "Wär suecht öpper, wo sini Wonig übernimmt?",
        options: ["C", "B", "A"],
        answer: 0,
        explain: "„Suechen Nachmiete für mini 3-Zimmer-Wonig.“",
      },
      {
        text: "De Tarek hät e Wonig, aber käi Platz für s Auto. Welli Nummere?",
        options: ["076 900 41 41", "044 311 55 00", "079 331 22 11"],
        answer: 0,
        explain: "D ilanı yeraltı otoparkta park yeri kiralıyor.",
      },
      {
        text: "Bi welere Aazäig git s käin feschte Bsichtigungstermin?",
        options: ["E", "B", "A"],
        answer: 0,
        explain: "„Bsichtigung nach Abmachig“ — randevuyla.",
      },
    ],
  },
  {
    id: "zh-a2-r11",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "D Absaag — und denn s Mail",
    genre: "E-posta",
    intro:
      "Hikâyenin devamı: Deniz on dört ret aldı. Sonra beklemediği bir mesaj geldi.",
    gloss: [
      { de: "d Absaag", tr: "ret" },
      { de: "leider", tr: "maalesef" },
      { de: "sich entschäide", tr: "karar vermek" },
      { de: "d Zuesaag", tr: "olumlu cevap" },
      { de: "de Vertrag", tr: "sözleşme" },
      { de: "unterschriibe", tr: "imzalamak" },
      { de: "d Schlüsselübergab", tr: "anahtar teslimi" },
    ],
    minutes: 4,
    text:
      "MAIL 1 — 4. Februar\n\nGuete Tag Herr Yılmaz\n\nBesten Dank für Ihres Interässe a de Wonig a de Zurlindenstrass 22. Mir händ üs läider für e anderi Bewärbig entschäide.\n\nMir wünsched Ine wiiterhin vill Erfolg bi de Suechi.\n\nFründlichi Grüess\nVerwaltung Hubmann\n\n\nMAIL 2 — 26. Februar\n\nGuete Tag Herr Yılmaz\n\nSi händ sich im Dezämber uf d 3-Zimmer-Wonig a de Bertastrass 9 beworbe. Damals händ mir e anderi Partei gnoo — die hät jetz aber churzfrischtig abgsäit.\n\nWänn Si na Interässe händ, chönted Si d Wonig ab em 1. April übernää. D Miete isch wie im Inserat: 1'760 Franke inkl.\n\nBitte gänd Si mir bis am Friitig Bschäid. Wänn s passt, mached mir de Vertrag nächschti Wuche und d Schlüsselübergab am 30. März.\n\nFründlichi Grüess\nR. Bächtold, Verwaltung Nord",
    questions: [
      {
        text: "Was säit s erschte Mail?",
        options: [
          "E Absaag für d Zurlindenstrass",
          "E Zuesaag",
          "E Iiladig zur Bsichtigung",
        ],
        answer: 0,
        explain: "„Mir händ üs läider für e anderi Bewärbig entschäide.“",
      },
      {
        text: "Warum schriibt d Verwaltung Nord im Februar?",
        options: [
          "Di ander Partei hät churzfrischtig abgsäit",
          "D Miete isch gsunke",
          "Si händ s Dossier verlore",
        ],
        answer: 0,
        explain: "Aralıkta seçtikleri kişi vazgeçmiş.",
      },
      {
        text: "Ab wänn wär d Wonig frei?",
        options: ["Ab em 1. April", "Ab em 30. März", "Sofort"],
        answer: 0,
        explain: "30 Mart anahtar teslim tarihi, 1 Nisan başlangıç.",
      },
      {
        text: "Bis wänn mues de Deniz antworte?",
        options: ["Bis am Friitig", "Bis am 30. März", "Bis nächschti Wuche"],
        answer: 0,
        explain: "„Bitte gänd Si mir bis am Friitig Bschäid.“",
      },
      {
        text: "Wie vill choschtet d Wonig?",
        options: ["1'760 Franke inkl.", "1'450 Franke", "1'980 Franke"],
        answer: 0,
        explain: "İlanda yazan tutarla aynı.",
      },
    ],
  },
  {
    id: "zh-a2-r12",
    course: "gsw-zh",
    level: "A2",
    skill: "reading",
    title: "Prämie und Franchise",
    genre: "Bilgi yazısı",
    intro:
      "İsviçre'de sağlık sigortası zorunludur ve iki sayı her şeyi belirler: prim ve muafiyet.",
    gloss: [
      { de: "d Chrankekasse", tr: "sağlık sigortası" },
      { de: "d Prämie", tr: "aylık prim" },
      { de: "d Franchise", tr: "yıllık muafiyet tutarı" },
      { de: "de Selbstbehalt", tr: "katılım payı" },
      { de: "obligatorisch", tr: "zorunlu" },
      { de: "wächsle", tr: "değiştirmek" },
      { de: "d Prämieverbilligung", tr: "prim desteği" },
      { de: "d Rächnig", tr: "fatura" },
    ],
    minutes: 5,
    text:
      "D Grundversicherig isch für alli obligatorisch. Was si zaalt, isch überall s Gliiche — nur de Priis isch verschiide. Drum lohnt sich vergliiche.\n\nZwo Zaale sind wichtig:\n\nD Prämie zaalsch jede Monet, au wänn du nie zum Arzt gaasch. Z Züri sind das für Erwachsni öppe 400 bis 500 Franke.\n\nD Franchise isch de Betrag, wo du sälber zaalsch, bevor d Kasse öppis übernimmt. Du chasch zwüsche 300 und 2'500 Franke wähle. Hööchi Franchise häisst: tüüfi Prämie, aber du zaalsch meh sälber.\n\nD Fuuschtregel: Wär gsund isch und sälte zum Arzt gaat, nimmt e hööchi Franchise. Wär regelmässig Behandlige bruucht, nimmt e tüüfi.\n\nWichtig: D Kasse cha me nur uf Ändi Jaar wächsle, und me mues bis am 30. Novämber kündige.\n\nWänn d Prämie z hööch isch für s Iikomme, cha me e Prämieverbilligung beaatrage. Vill Lüüt wüssed das nöd und zaaled z vill.",
    questions: [
      {
        text: "Was isch bi allne Kasse s Gliiche?",
        options: [
          "Was d Grundversicherig zaalt",
          "D Prämie",
          "D Franchise",
        ],
        answer: 0,
        explain: "Kapsam aynı, yalnızca fiyat farklı — bu yüzden karşılaştırmak mantıklı.",
      },
      {
        text: "Was isch d Franchise?",
        options: [
          "De Betrag, wo me sälber zaalt, bevor d Kasse zaalt",
          "D monetlichi Zaalig",
          "E Buess",
        ],
        answer: 0,
        explain: "300 ile 2.500 frank arasında seçiliyor.",
      },
      {
        text: "Was gilt bi ere hooche Franchise?",
        options: [
          "Tüüfi Prämie, aber me zaalt meh sälber",
          "Hööchi Prämie und weniger sälber",
          "Alles isch gratis",
        ],
        answer: 0,
        explain: "Metin bu takası açıkça anlatıyor.",
      },
      {
        text: "Wär söll e hööchi Franchise nää?",
        options: [
          "Wär gsund isch und sälte zum Arzt gaat",
          "Wär regelmässig Behandlige bruucht",
          "Alli",
        ],
        answer: 0,
        explain: "Metnin verdiği genel kural.",
      },
      {
        text: "Bis wänn mues me kündige, zum d Kasse wächsle?",
        options: ["Bis am 30. Novämber", "Bis am 31. Dezämber", "Jederziit"],
        answer: 0,
        explain: "Kasa yalnızca yıl sonunda değiştirilebiliyor.",
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
    id: "zh-a2-l7",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "A de Bsichtigung",
    genre: "Diyalog",
    intro:
      "Hikâyenin devamı: Deniz ev gezmesinde yönetimden kadına soru soruyor — yedi dakika içinde.",
    gloss: [
      { de: "d Verwaltig", tr: "yönetim şirketi" },
      { de: "d Nebechoschte", tr: "yan giderler" },
      { de: "d Waschchuchi", tr: "çamaşırhane" },
      { de: "de Keller", tr: "bodrum" },
      { de: "de Iizugstermin", tr: "giriş tarihi" },
      { de: "d Frag", tr: "soru" },
      { de: "sich mälde", tr: "haber vermek" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Hubmann", text: "Bitte chömed Si ane. Sibe Minute, denn chunt di nächschti Gruppe." },
      { speaker: "Deniz", text: "Merci. Sind d Nebechoschte i de 1'760 scho drin?" },
      { speaker: "Frau Hubmann", text: "Ja, inklusiv. Nur de Struum zaaled Si sälber." },
      { speaker: "Deniz", text: "Und d Waschchuchi?" },
      {
        speaker: "Frau Hubmann",
        text: "Im Keller. Jedi Wonig hät zwäi Täg im Monet. De Plan hanget a de Tür.",
      },
      { speaker: "Deniz", text: "Git s en Keller zu de Wonig?" },
      { speaker: "Frau Hubmann", text: "Ja, sächs Quadratmeter. Und en Veloplatz im Hof." },
      { speaker: "Deniz", text: "Ab wänn wär si frei?" },
      { speaker: "Frau Hubmann", text: "Ab em 1. April. Vorher chan i niemert iizüge laa." },
      { speaker: "Deniz", text: "Und wänn entschäided Si?" },
      {
        speaker: "Frau Hubmann",
        text: "I zwo bis drüü Wuche. Mir mälded üs nur, wänn s klappt — susch chunt es Mail.",
      },
      { speaker: "Deniz", text: "Alles klar. Do isch mis Dossier." },
    ],
    questions: [
      {
        text: "Was isch i de Miete drin?",
        options: [
          "D Nebechoschte, aber nöd de Struum",
          "Alles, au de Struum",
          "Nüüt, alles chunt dezue",
        ],
        answer: 0,
        explain: "„Ja, inklusiv. Nur de Struum zaaled Si sälber.“",
      },
      {
        text: "Wie oft cha me wäsche?",
        options: ["Zwäi Täg im Monet", "Jede Tag", "Äimal i de Wuche"],
        answer: 0,
        explain: "„Jedi Wonig hät zwäi Täg im Monet.“",
      },
      {
        text: "Was ghört zur Wonig?",
        options: [
          "En Keller und en Veloplatz",
          "En Parkplatz",
          "En Balkon",
        ],
        answer: 0,
        explain: "Altı metrekare bodrum ve avluda bisiklet yeri.",
      },
      {
        text: "Wie erfahrt de Deniz d Antwort?",
        options: [
          "Si mälded sich nur, wänn s klappt — susch per Mail",
          "Am gliiche Tag",
          "Er mues sälber aalüte",
        ],
        answer: 0,
        explain: "İki üç hafta içinde karar veriliyor.",
      },
    ],
  },
  {
    id: "zh-a2-l8",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "De Lift reserviere",
    genre: "Telefon",
    intro:
      "Taşınma günü öncesi klasik iş: asansörü ve yükleme yerini ayırtmak.",
    gloss: [
      { de: "de Lift", tr: "asansör" },
      { de: "reserviere", tr: "ayırtmak" },
      { de: "de Hauswart", tr: "kapıcı" },
      { de: "d Bewilligung", tr: "izin" },
      { de: "de Halteplatz", tr: "durma/yükleme yeri" },
      { de: "sperre", tr: "kapatmak" },
      { de: "s Formular", tr: "form" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Hauswart", text: "Grüezi, Bertastrass, Kovac." },
      {
        speaker: "Deniz",
        text: "Grüezi Herr Kovac. Ich zieh am 30. März ii und wott froge, öb ich de Lift cha reserviere.",
      },
      { speaker: "Hauswart", text: "Am 30.? Do zügled na zwo anderi Parteie." },
      { speaker: "Deniz", text: "Oje." },
      {
        speaker: "Hauswart",
        text: "Nöd schlimm, mir teiled uf. Wänn chämed Si? Am Morge oder am Namitag?",
      },
      { speaker: "Deniz", text: "Am Morge wär besser. Öppe ab de achti." },
      {
        speaker: "Hauswart",
        text: "Denn gäb ich Ine achti bis zwölfi. Danach chunt d Familie us em vierte Schtock.",
      },
      { speaker: "Deniz", text: "Perfäkt. Und de Zügelwage — wo cha de staa?" },
      {
        speaker: "Hauswart",
        text: "Vor em Huus. Aber dört isch Parkverbot. Si bruuched e Bewilligung vo de Stadt, susch git s e Buess.",
      },
      { speaker: "Deniz", text: "Wo überchunt me die?" },
      {
        speaker: "Hauswart",
        text: "Online, öppe zää Täg vorher. Choschtet 40 Franke. Mached Si s früeh — s duuret.",
      },
      { speaker: "Deniz", text: "Merci vilmal für de Tipp." },
    ],
    questions: [
      {
        text: "Warum isch de 30. März schwiirig?",
        options: [
          "Es zügled na zwo anderi Parteie",
          "De Lift isch kaputt",
          "De Hauswart hät frei",
        ],
        answer: 0,
        explain: "Klasik Zügeltermin sorunu — aynı gün herkes taşınıyor.",
      },
      {
        text: "Welli Ziit überchunt de Deniz?",
        options: ["Achti bis zwölfi", "Zwölfi bis vieri", "De ganz Tag"],
        answer: 0,
        explain: "Öğleden sonra dördüncü kattaki aile taşınıyor.",
      },
      {
        text: "Was bruucht er für de Zügelwage?",
        options: [
          "E Bewilligung vo de Stadt",
          "En Schlüssel vom Hauswart",
          "Nüüt",
        ],
        answer: 0,
        explain: "Ev önü park yasağı; izinsiz ceza yazılıyor.",
      },
      {
        text: "Was säit de Hauswart über d Bewilligung?",
        options: [
          "Online, öppe zää Täg vorher, 40 Franke",
          "Am gliiche Tag am Schalter",
          "Si isch gratis",
        ],
        answer: 0,
        explain: "„Mached Si s früeh — s duuret.“",
      },
    ],
  },
  {
    id: "zh-a2-l9",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Vier churzi Gspröch",
    genre: "Sınav formatı",
    intro:
      "Dört kısa konuşma, her birine bir soru. Konuşmalar birbirinden bağımsız.",
    gloss: [
      { de: "umtusche", tr: "değiştirmek (ürün)" },
      { de: "de Bon", tr: "fiş" },
      { de: "d Haltstell", tr: "durak" },
      { de: "umschtiige", tr: "aktarma yapmak" },
      { de: "reserviere", tr: "yer ayırtmak" },
      { de: "d Sitzig", tr: "toplantı" },
      { de: "verschobe", tr: "ertelenmiş" },
    ],
    minutes: 4,
    segments: [
      {
        speaker: "1 — Im Lade",
        text: "— Die Jagge isch z chlii. Cha ich si umtusche? — Sicher, händ Si de Bon? — Ja, do. — Guet. Grössi M hämmer läider nur na i Blau.",
      },
      {
        speaker: "2 — Im Tram",
        text: "— Entschuldiged Si, fahrt das Tram zum Spital? — Nei, de Vierer fahrt zum Bahnhof. Si bruuched de Nüüner. — Und wo mues ich umschtiige? — A de nächschte Haltstell, grad gägenüber.",
      },
      {
        speaker: "3 — Am Telefon",
        text: "— Reschtorant Sonne, guete Aabig. — Grüezi, ich hett gärn en Tisch für vieri. — Für wänn? — Am Samschtig am sibni. — Am Samschtig sind mir voll. Am Friitig oder Sunntig gäb s na öppis.",
      },
      {
        speaker: "4 — Im Büro",
        text: "— Du, d Sitzig isch verschobe. — Uf wänn? — Vo de zäni uf di zwöi. De Ruum bliibt gliich. — Guet, denn han ich am Morge Ziit für de Bricht.",
      },
    ],
    questions: [
      {
        text: "Gspröch 1: I welere Farb git s d Grössi M?",
        options: ["Nur i Blau", "I allne Farbe", "Es git käi M"],
        answer: 0,
        explain: "„Grössi M hämmer läider nur na i Blau.“",
      },
      {
        text: "Gspröch 2: Welles Tram bruucht d Frau?",
        options: ["De Nüüner", "De Vierer", "Bäidi"],
        answer: 0,
        explain: "4 numara gara, hastane için 9 numara gerekiyor.",
      },
      {
        text: "Gspröch 3: Wänn git s na en Tisch?",
        options: ["Am Friitig oder Sunntig", "Am Samschtig am sibni", "Gar nöd"],
        answer: 0,
        explain: "Cumartesi dolu.",
      },
      {
        text: "Gspröch 4: Was ändert sich a de Sitzig?",
        options: ["D Ziit", "De Ruum", "S Datum"],
        answer: 0,
        explain: "„Vo de zäni uf di zwöi. De Ruum bliibt gliich.“",
      },
    ],
  },
  {
    id: "zh-a2-l10",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Duzis mache",
    genre: "Kültür",
    intro:
      "İsviçre'de „du“ demeye geçmenin kendine has bir adı ve kuralı var: Duzis. Kısa bir sohbet.",
    gloss: [
      { de: "duzis mache", tr: "„du“ demeye geçmek (İsviçre kalıbı)" },
      { de: "sieze", tr: "„Sie“ demek" },
      { de: "aabüüte", tr: "teklif etmek" },
      { de: "d Aared", tr: "hitap" },
      { de: "gnaut", tr: "tam olarak" },
      { de: "unsicher", tr: "emin olmayan" },
      { de: "zrugg", tr: "geri" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Deniz", text: "Sag emal — wänn säit me da du und wänn Si?" },
      {
        speaker: "Nina",
        text: "Fuuschtregel: Im Gschäft under Kollege du, mit Chunde Si. A de Behörde Si. Im Sportverein sofort du, au mit em Präsidänt.",
      },
      { speaker: "Deniz", text: "Und wär aafangt?" },
      {
        speaker: "Nina",
        text: "Di elteri Person oder di höcheri Poschtion. Bi eus säit me: „Wämmer duzis mache?“ Das isch e richtigi Frag, und me schüttlet mängisch d Hand.",
      },
      { speaker: "Deniz", text: "Und wänn ich s zerscht säge?" },
      {
        speaker: "Nina",
        text: "Bi glichaltrige Lüüt isch das kä Problem. Bi de Chefin würd ich warte.",
      },
      { speaker: "Deniz", text: "Und wänn ich s falsch mach?" },
      {
        speaker: "Nina",
        text: "Denn merksch es: Di ander Person antwortet witer mit Si. Zrugg gaat s nöd würkli — es git käi Siezis mache.",
      },
      { speaker: "Deniz", text: "Also lieber warte." },
      {
        speaker: "Nina",
        text: "Genau. Und wänn du unsicher bisch, frög äifach. Niemert findet die Frag komisch.",
      },
    ],
    questions: [
      {
        text: "Wo säit me sofort du?",
        options: ["Im Sportverein", "A de Behörde", "Mit Chunde"],
        answer: 0,
        explain: "Dernek/kulüpte başkanla bile „du“.",
      },
      {
        text: "Wär büütet s du aa?",
        options: [
          "Di elteri Person oder di höcheri Poschtion",
          "Immer di jüngeri Person",
          "Bäidi gliichziitig",
        ],
        answer: 0,
        explain: "„Wämmer duzis mache?“ diye sorulur, bazen el sıkışılır.",
      },
      {
        text: "Was passiert, wänn me s falsch macht?",
        options: [
          "Di ander Person antwortet witer mit Si",
          "Me mues sich entschuldige",
          "Nüüt, es merkt niemert",
        ],
        answer: 0,
        explain: "Ve geri dönüş yok: „es git käi Siezis mache.“",
      },
      {
        text: "Was empfilt d Nina bi Unsicherheit?",
        options: ["Äifach froge", "Immer du säge", "Immer Si säge"],
        answer: 0,
        explain: "„Niemert findet die Frag komisch.“",
      },
    ],
  },
  {
    id: "zh-a2-l11",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Im Brockenhuus",
    genre: "Diyalog",
    intro:
      "İsviçre'nin ikinci el mağazaları: Brockenhaus. Taşınan herkesin ilk durağı.",
    gloss: [
      { de: "s Brockenhuus", tr: "ikinci el mağazası" },
      { de: "de Gstell", tr: "raf" },
      { de: "de Zuestand", tr: "durum, hâl" },
      { de: "handle", tr: "pazarlık etmek" },
      { de: "d Lieferig", tr: "teslimat" },
      { de: "de Transport", tr: "taşıma" },
      { de: "reduziert", tr: "indirimli" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Verchäuferin", text: "Grüezi, sueched Si öppis Bestimmts?" },
      { speaker: "Sara", text: "Grüezi. Es Gstell für Büecher, öppe zwäi Meter." },
      {
        speaker: "Verchäuferin",
        text: "Do häre. Das isch Massivholz, 120 Franke. Und das dört isch günschtiger, 45.",
      },
      { speaker: "Sara", text: "Und de Zuestand?" },
      {
        speaker: "Verchäuferin",
        text: "S günschtige hät hinde en Chratzer. Me gseet en nöd, wänn s a de Wand staat.",
      },
      { speaker: "Sara", text: "Chönd Si öppis am Priis mache?" },
      {
        speaker: "Verchäuferin",
        text: "Bi eus sind d Priise fescht. Aber jede Zischtig isch alles um zwänzg Prozänt reduziert.",
      },
      { speaker: "Sara", text: "Hüt isch Määndig …" },
      { speaker: "Verchäuferin", text: "Genau. Wänn Si warted, zaaled Si morn 36 statt 45." },
      { speaker: "Sara", text: "Und bringed Si s au?" },
      {
        speaker: "Verchäuferin",
        text: "Mir liefered im Stadtgebiet für 60 Franke. Bi eme Gstell für 36 lohnt sich das nöd — nämed Si liber es Auto oder es Cargovelo.",
      },
    ],
    questions: [
      {
        text: "Was suecht d Sara?",
        options: ["Es Büechergstell", "En Tisch", "Es Bett"],
        answer: 0,
        explain: "„Es Gstell für Büecher, öppe zwäi Meter.“",
      },
      {
        text: "Was isch mit em günschtige Gstell?",
        options: [
          "Es hät hinde en Chratzer",
          "Es isch z chlii",
          "Es isch scho verchauft",
        ],
        answer: 0,
        explain: "Duvara dayanınca görünmüyor.",
      },
      {
        text: "Cha me handle?",
        options: [
          "Nei, aber am Zischtig git s 20 % Rabatt",
          "Ja, immer",
          "Nur bi tüüre Sache",
        ],
        answer: 0,
        explain: "„Bi eus sind d Priise fescht.“",
      },
      {
        text: "Was ratet d Verchäuferin bim Transport?",
        options: [
          "Sälber transportiere, d Lieferig lohnt sich nöd",
          "D Lieferig für 60 Franke z nää",
          "S Gstell z reserviere",
        ],
        answer: 0,
        explain: "36 franklık raf için 60 franklık teslimat mantıklı değil.",
      },
    ],
  },
  {
    id: "zh-a2-l12",
    course: "gsw-zh",
    level: "A2",
    skill: "listening",
    title: "Mir händ si übercho!",
    genre: "Sesli mesaj",
    intro:
      "Hikâyenin sonu: Deniz arkadaşına sesli mesaj bırakıyor.",
    gloss: [
      { de: "überchoo", tr: "almak, elde etmek" },
      { de: "de Vertrag", tr: "sözleşme" },
      { de: "d Kaution", tr: "depozito" },
      { de: "d Schlüsselübergab", tr: "anahtar teslimi" },
      { de: "de Iizugsapéro", tr: "taşınma sonrası davet" },
      { de: "de Rekord", tr: "rekor" },
      { de: "endlich", tr: "nihayet" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Deniz", text: "Murat! Mir händ si übercho. D Wonig a de Bertastrass." },
      {
        speaker: "Deniz",
        text: "Und weisch was s Verruckte isch? Ich han mich im Dezämber beworbe und e Absaag übercho. Jetz hät di ander Partei abgsäit — und si händ mich wider aagschriibe.",
      },
      {
        speaker: "Deniz",
        text: "Vierzää Absääge insgesamt. Ich glaub, das isch kä Rekord, aber es hät sich so aagfühlt.",
      },
      {
        speaker: "Deniz",
        text: "De Vertrag hämmer am Mittwuch unterschriibe. D Kaution isch drü Monetsmiete — das hät weh taa, aber s isch dure.",
      },
      {
        speaker: "Deniz",
        text: "Schlüsselübergab am 30. März am zäni. De Lift han ich scho reserviert, achti bis zwölfi.",
      },
      {
        speaker: "Deniz",
        text: "Und du chunsch am 12. April zum Iizugsapéro. Nöd frooge — du chunsch. Bis dänn!",
      },
    ],
    questions: [
      {
        text: "Warum hät de Deniz d Wonig doch übercho?",
        options: [
          "Di ander Partei hät abgsäit",
          "Er hät nomal e Bsichtigung gha",
          "D Miete isch gsunke",
        ],
        answer: 0,
        explain: "Aralıkta ret almış, sonra yeniden yazılmışlar.",
      },
      {
        text: "Wie vill Absääge hät er gha?",
        options: ["Vierzää", "Drü", "Zwänzg"],
        answer: 0,
        explain: "„Vierzää Absääge insgesamt.“",
      },
      {
        text: "Wie hööch isch d Kaution?",
        options: ["Drü Monetsmiete", "Ei Monetsmiete", "1'760 Franke"],
        answer: 0,
        explain: "„das hät weh taa, aber s isch dure.“",
      },
      {
        text: "Wänn isch d Schlüsselübergab?",
        options: ["Am 30. März am zäni", "Am 12. April", "Am Mittwuch"],
        answer: 0,
        explain: "Sözleşme çarşamba, davet 12 Nisan.",
      },
      {
        text: "Was isch am 12. April?",
        options: ["De Iizugsapéro", "D Schlüsselübergab", "S Vertragsgspröch"],
        answer: 0,
        explain: "„Nöd frooge — du chunsch.“",
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
  {
    id: "zh-a2-w5",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "S Schriibe zum Wonigsdossier",
    genre: "Resmî yazı",
    intro:
      "Dosyaya konan iki üç cümlelik tanıtım yazısı. Kısa olmalı — ama seni seksen kişiden ayıran tek şey bu.",
    gloss: [
      { de: "s Dossier", tr: "başvuru dosyası" },
      { de: "sich vorstelle", tr: "kendini tanıtmak" },
      { de: "de Haushalt", tr: "hane" },
      { de: "ruhig", tr: "sakin" },
      { de: "unbefristet", tr: "süresiz (sözleşme)" },
      { de: "s Iikomme", tr: "gelir" },
      { de: "iizüge", tr: "taşınıp girmek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Karım ve ben iki kişilik bir eviz.",
        answer: "Mini Frau und ich sind en Zwäipersonehuushalt.",
        hint: "meine → mini; sind çoğul fiil.",
      },
      {
        kind: "build",
        tr: "İkimizin de süresiz iş sözleşmesi var.",
        answer: "Mir händ bäidi en unbefrischtete Arbetsvertrag.",
        hint: "wir haben → mir händ; beide → bäidi.",
      },
      {
        kind: "build",
        tr: "1 Nisan'dan itibaren taşınabiliriz.",
        answer: "Mir chönd ab em 1. April iizüge.",
        hint: "können → chöne: mir chönd; iizüge ayrılabilir ama mastar hâlde sonda.",
      },
      {
        kind: "free",
        prompt:
          "Ev başvuru dosyasına konacak kısa bir tanıtım yaz. Dört noktaya değin: kim olduğunuz ve kaç kişisiniz, ne iş yaptığınız, ne zaman taşınabileceğiniz, kısa bir kişisel cümle (neden bu daire/semt). En fazla altı yedi cümle — uzun yazma.",
        checklist: [
          "Hitap ve kapanış var mı?",
          "Hane büyüklüğünü ve işinizi yazdın mı?",
          "Taşınma tarihini yazdın mı?",
          "Kısa bir kişisel cümle var mı?",
          "Metin gerçekten kısa mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Grüezi Frau / Herr …", tr: "Sayın …," },
          { de: "Mir sind en Zwäipersonehuushalt.", tr: "İki kişilik bir haneyiz." },
          { de: "Ich schaffe als … bi …", tr: "…'de … olarak çalışıyorum." },
          { de: "Mir chönd ab em … iizüge.", tr: "…'den itibaren taşınabiliriz." },
          { de: "Mir sind ruhig und nöd-Raucher.", tr: "Sessiziz ve sigara içmiyoruz." },
          { de: "Fründlichi Grüess", tr: "Saygılarımla" },
        ],
        sample:
          "Grüezi Frau Bächtold\n\nMini Frau und ich sind en Zwäipersonehuushalt ohni Chind und ohni Huustier. Ich schaffe als Pflegefachmaa im Triemli, mini Frau als Buechhalterin. Mir händ bäidi en unbefrischtete Arbetsvertrag; d Loonuuszüüg sind im Dossier.\n\nMir wohned siit vier Jaar im Chreis 3 und suecheder öppis Grösseres im gliiche Quartier — mini Frau schafft am Bahnhof Wiedike.\n\nMir chönd ab em 1. April iizüge und sind gärn bereit, d Wonig vorher aazluege.\n\nFründlichi Grüess\nDeniz Yılmaz",
      },
    ],
  },
  {
    id: "zh-a2-w6",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "En Termin verschiebe",
    genre: "Sınav formatı",
    intro:
      "Sınav görevinin tam biçimi: kısa bir mesajda üç noktaya değinmek — iptal, gerekçe, yeni öneri.",
    gloss: [
      { de: "verschiebe", tr: "ertelemek" },
      { de: "de Termin", tr: "randevu" },
      { de: "läider", tr: "maalesef" },
      { de: "passe", tr: "uymak" },
      { de: "de Vorschlag", tr: "öneri" },
      { de: "Bschäid gää", tr: "haber vermek" },
      { de: "entschuldige", tr: "özür dilemek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Salı günkü randevuya maalesef gelemem.",
        answer: "Am Zischtig chan ich läider nöd zum Termin choo.",
        hint: "können → chöne: ich cha/chan; leider → läider.",
      },
      {
        kind: "build",
        tr: "Aynı gün bir toplantım var.",
        answer: "Am gliiche Tag han ich e Sitzig.",
        hint: "gleich → gliich; haben → haa: han ich.",
      },
      {
        kind: "build",
        tr: "Perşembe ya da cuma bana uyar.",
        answer: "Am Dunschtig oder am Friitig passt s mer.",
        hint: "mir → mer; „es passt mir“ kalıbı.",
      },
      {
        kind: "free",
        prompt:
          "Bir randevuyu erteleyen kısa bir mesaj yaz (doktor, kuaför, yönetim — kendin seç). Üç noktaya değin: hangi randevuya gelemeyeceğin (gün ve saat), nedeni, yeni bir öneri. Kısa ve kibar olsun.",
        checklist: [
          "Hangi randevu olduğunu net yazdın mı?",
          "Nedenini yazdın mı?",
          "Yeni bir gün/saat önerdin mi?",
          "Özür ve kapanış var mı?",
          "Adını yazdın mı?",
        ],
        minWords: 35,
        phrases: [
          { de: "Ich han am … en Termin bi Ine.", tr: "…günü sizde randevum var." },
          { de: "Läider chan ich nöd choo, well …", tr: "Maalesef gelemem çünkü …" },
          { de: "Chönted mir en andere Termin abmache?", tr: "Başka bir randevu ayarlayabilir miyiz?" },
          { de: "Mer passt s am …", tr: "Bana … uyar." },
          { de: "Entschuldiged Si bitte.", tr: "Lütfen kusura bakmayın." },
        ],
        sample:
          "Grüezi Frau Meier\n\nIch han am Zischtig, em 14. Mai, am halbi drüü en Termin bi Ine. Läider chan ich nöd choo — ich han am gliiche Tag e Sitzig im Gschäft, wo verschobe worde isch.\n\nChönted mir en andere Termin abmache? Mer passt s am Dunschtig oder am Friitig, am liebschte am Namitag.\n\nEntschuldiged Si bitte die churzfrischtigi Absaag.\n\nFründlichi Grüess\nSara Yılmaz",
      },
    ],
  },
  {
    id: "zh-a2-w7",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "Es Fescht bi eus",
    genre: "Kültür",
    intro:
      "Kendi ülkendeki bir bayramı İsviçreli bir arkadaşına anlatacaksın — ve bir karşılaştırma yapacaksın.",
    gloss: [
      { de: "s Fescht", tr: "bayram, kutlama" },
      { de: "fiire", tr: "kutlamak" },
      { de: "d Verwandte", tr: "akrabalar" },
      { de: "de Bruuch", tr: "gelenek" },
      { de: "duure", tr: "sürmek" },
      { de: "s Gschänk", tr: "hediye" },
      { de: "änlich", tr: "benzer" },
      { de: "de Unterschid", tr: "fark" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bu bayram üç gün sürer.",
        answer: "Das Fescht duuret drü Täg.",
        hint: "dauern → duure; drei → drü.",
      },
      {
        kind: "build",
        tr: "Sabahleyin bütün akrabaları ziyaret ederiz.",
        answer: "Am Morge bsueched mir alli Verwandte.",
        hint: "besuchen → bsueche; mir händ değil, mir bsueched (Präsens).",
      },
      {
        kind: "build",
        tr: "Çocuklar hediye olarak para alır.",
        answer: "D Chind überchömed Gäld als Gschänk.",
        hint: "bekommen → überchoo: si überchömed.",
      },
      {
        kind: "free",
        prompt:
          "İsviçreli bir arkadaşına ülkendeki bir bayramı anlat. Dört noktaya değin: adı ve zamanı, kimlerle kutlandığı, en az iki gelenek, İsviçre'deki bir bayramla benzerliği ya da farkı.",
        checklist: [
          "Adını ve zamanını yazdın mı?",
          "Kimlerle kutlandığını yazdın mı?",
          "En az iki geleneği anlattın mı?",
          "Bir karşılaştırma yaptın mı? (änlich wie / anders als)",
          "Soru ya da davetle bitirdin mi?",
        ],
        minWords: 60,
        phrases: [
          { de: "Bi eus fiiret me …", tr: "Bizde … kutlanır." },
          { de: "S Fescht duuret …", tr: "Bayram … sürer." },
          { de: "Zerscht … , denn …", tr: "Önce … , sonra …" },
          { de: "Das isch änlich wie …", tr: "Bu … gibi." },
          { de: "Anders als i de Schwiiz …", tr: "İsviçre'den farklı olarak …" },
        ],
        sample:
          "Hoi Nina\n\nDu häsch mich nach üsne Fescht gfrogt. S wichtigscht isch s Zuckerfescht, uf Türkisch „Bayram“. Es chunt nach em Fastemonet Ramadan und duuret drü Täg.\n\nAm Morge bsueched mir alli Verwandte — zerscht di Elteschte. Me küsst ne d Hand, und d Chind überchömed Gäld als Gschänk. Denn isst me zäme, und es git sehr vill Süesses. Drum häisst es Zuckerfescht.\n\nDas isch änlich wie Wienachte bi eu: Familie, Ässe, Gschänk. Anders als i de Schwiiz bsueched mir aber nöd nur d Familie, sondern au d Nochbere — und niemert mäldet sich vorher aa.\n\nWänn fiired ihr eigentlich am mäischte, a Wienachte oder a Silveschter?\n\nLiebi Grüess\nSara",
      },
    ],
  },
  {
    id: "zh-a2-w8",
    course: "gsw-zh",
    level: "A2",
    skill: "writing",
    title: "Iiladig zum Iizugsapéro",
    genre: "Davet",
    intro:
      "Hikâyenin son parçası: Deniz'in yerine geçip yeni komşulara asılacak daveti yazacaksın.",
    gloss: [
      { de: "de Iizugsapéro", tr: "taşınma sonrası tanışma daveti" },
      { de: "iizoge", tr: "taşınmış" },
      { de: "sich vorstelle", tr: "kendini tanıtmak" },
      { de: "vorbiicho", tr: "uğramak" },
      { de: "sich fröie uf", tr: "dört gözle beklemek" },
      { de: "de Innehoof", tr: "iç avlu" },
      { de: "Bschäid gää", tr: "haber vermek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Nisan başından beri üçüncü katta oturuyoruz.",
        answer: "Mir wohned siit Aafang April im dritte Schtock.",
        hint: "seit → siit + Dativ; wohnen → wohne, mir wohned.",
      },
      {
        kind: "build",
        tr: "Sizi bir kadeh içkiye davet ediyoruz.",
        answer: "Mir laded eu uf es Glas ii.",
        alternatives: ["Mir laded Si uf es Glas ii."],
        hint: "einladen → iilade, ayrılabilir: mir laded … ii.",
      },
      {
        kind: "build",
        tr: "Bir şey getirmenize gerek yok.",
        answer: "Ihr müend nüüt mitbringe.",
        hint: "müssen → müesse: ihr müend; nichts → nüüt.",
      },
      {
        kind: "free",
        prompt:
          "Yeni komşulara asılacak bir tanışma daveti yaz. Beş noktaya değin: kim olduğunuz ve ne zaman taşındığınız, davetin ne zaman ve nerede olduğu, ne ikram edileceği, bir şey getirmeye gerek olmadığı, gelemeyenler için sıcak bir cümle. Kısa ve davetkâr olsun.",
        checklist: [
          "Kim olduğunuzu ve daire numaranızı yazdın mı?",
          "Tarih, saat ve yeri yazdın mı?",
          "Ne ikram edileceğini yazdın mı?",
          "Bir şey getirmeye gerek olmadığını belirttin mi?",
          "Gelemeyenlere de bir cümle var mı?",
        ],
        minWords: 45,
        phrases: [
          { de: "Mir sind nöi iizoge.", tr: "Yeni taşındık." },
          { de: "Mir wohned im … Schtock.", tr: "… katta oturuyoruz." },
          { de: "Mir laded eu härzlich ii.", tr: "Sizi içtenlikle davet ediyoruz." },
          { de: "Es git Wii, Saft und öppis Chliises z ässe.", tr: "Şarap, meyve suyu ve küçük ikramlar var." },
          { de: "Ihr müend nüüt mitbringe.", tr: "Bir şey getirmenize gerek yok." },
          { de: "Mir fröied üs uf eu.", tr: "Sizi görmeyi bekliyoruz." },
        ],
        sample:
          "Liebi Nochbere\n\nMir sind d Sara und de Deniz und wohned siit Aafang April im dritte Schtock. Bis jetz händ mir di mäischte vo eu nur im Träppehuus gseh — das wämmer ändere.\n\nAm Samschtig, em 12. April, ab de füfi mached mir en chliine Iizugsapéro im Innehoof. Es git Wii, Saft und öppis Chliises z ässe. Ihr müend nüüt mitbringe.\n\nWänn ihr am Samschtig käi Ziit händ: Chömed doch äifach emal verbii, mir sind mäischtens am Aabig dihei.\n\nMir fröied üs uf eu!\nSara und Deniz (Wonig 7)",
      },
    ],
  },
];
