import type { SkillExercise } from "../types";

/**
 * Zürih kursu (gsw-zh) — B1 okuma, dinleme ve yazma egzersizleri.
 * Tüm lehçe metinler data/zurich/style-guide.md'deki Dieth yazımına uyar;
 * yönergeler ve açıklamalar Türkçe, sorular Züritüütsch.
 */
export const zhB1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "zh-b1-r1",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Quartierfäscht im Innehoof",
    genre: "Duyuru",
    intro: "Mahalle derneğinin bina girişine astığı şenlik duyurusunu okuyacaksın.",
    gloss: [
      { de: "s Quartier", tr: "mahalle, semt" },
      { de: "de Innehoof", tr: "iç avlu" },
      { de: "de Hälfer", tr: "yardımcı, gönüllü" },
      { de: "s Ufbaue", tr: "kurulum (masa, çadır kurma)" },
      { de: "s Ufruume", tr: "toplama, temizlik" },
      { de: "sich mälde", tr: "haber vermek, kaydolmak" },
      { de: "de Gmeindssaal", tr: "mahalle/cemaat salonu" },
      { de: "iiglade", tr: "davetli" },
    ],
    minutes: 3,
    text:
      "Grüezi mitenand!\n\nAm Samschtig, 14. Juni, fiired mir wider s Quartierfäscht im Innehoof a de Roseschtraass 12. Ab de Zwölfi git s Zmittag vom Grill — Würscht, Salaat und Glace für d Chind. De Quartierverein stellt Tisch und Bänk uf, aber mir bruuched na Hälfer für s Ufbaue am Morge und s Ufruume am Aabig.\n\nWär cha hälfe, söll sich bitte bis am Mittwuch bi de Frau Meier mälde (044 271 35 80). Bi Räge findet s Fäscht im Gmeindssaal statt. D Musig spilt ab de Sächsi, und um di Nüüni isch fertig — mir wänd d Nachbare nöd störe.\n\nAlli sind härzlich iiglade, au d Chind und d Grosseltere!",
    questions: [
      {
        text: "Wänn git s s Zmittag vom Grill?",
        options: ["Ab de Zwölfi", "Ab de Sächsi", "Am Nüüni"],
        answer: 0,
        explain:
          "Duyuruda „Ab de Zwölfi git s Zmittag vom Grill“ deniyor — mangaldan öğle yemeği saat 12'den itibaren. Sächsi müziğin başlangıcı, Nüüni bitiş saati.",
      },
      {
        text: "Für was suecht de Verein na Hälfer?",
        options: [
          "Für s Ufbaue und s Ufruume",
          "Für s Choche vom Zmittag",
          "Für d Musig am Aabig",
        ],
        answer: 0,
        explain:
          "Metin sabah kurulum (Ufbaue) ve akşam toplama (Ufruume) için gönüllü arandığını söylüyor; yemek ve müzik için değil.",
      },
      {
        text: "Richtig oder falsch? Bi Räge fallt s Fäscht us.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Yağmur yağarsa şenlik iptal olmuyor, Gmeindssaal'a (kapalı salona) taşınıyor: „Bi Räge findet s Fäscht im Gmeindssaal statt.“",
      },
      {
        text: "Bis wänn muess me sich mälde, wenn me hälfe wott?",
        options: ["Bis am Mittwuch", "Bis am Samschtig", "Bis Ändi Monet"],
        answer: 0,
        explain:
          "„Wär cha hälfe, söll sich bitte bis am Mittwuch bi de Frau Meier mälde“ — kayıt için son gün çarşamba.",
      },
      {
        text: "Warum hört d Musig scho um di Nüüni uf?",
        options: [
          "Wil d Nachbare nöd wänd gstört wärde",
          "Wil de Saal dänn zue isch",
          "Wil d Band nüme cha spile",
        ],
        answer: 0,
        explain:
          "Gerekçe metinde açık: „mir wänd d Nachbare nöd störe“ — komşular rahatsız edilmesin diye müzik 21'de bitiyor.",
      },
    ],
  },
  {
    id: "zh-b1-r2",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Mir züügled — wär hilft?",
    genre: "Mesaj",
    intro: "Sandro'nun arkadaş grubuna attığı taşınma mesajını okuyacaksın.",
    gloss: [
      { de: "züügle", tr: "taşınmak (İsviçre'ye özgü fiil)" },
      { de: "de Zügelwage", tr: "taşınma kamyoneti" },
      { de: "d Chischte", tr: "koli, kutu" },
      { de: "de Nachmieter", tr: "sonraki kiracı" },
      { de: "de Znüni", tr: "kuşluk atıştırması (İsviçre)" },
      { de: "Bschäid gää", tr: "haber vermek" },
      { de: "träge", tr: "taşımak" },
    ],
    minutes: 3,
    text:
      "Hoi zäme!\n\nÄndi Monet isch es sowiit: Mir züügled vo Örlike uf Wiedike, a d Bertaschtraass 8. De Zügelwage chunt am Samschtig am Achti, und mir sueched na zwäi, drüü Lüüt, wo chönd hälfe träge. Es git natürli Znüni und Zmittag für alli Hälfer — d Pizza gaat uf üüs!\n\nS Klavier bliibt zum Glück da, das übernimmt de Nachmieter. Wär am Samschtig käi Ziit hät, cha au scho am Friitig bim Chischte packe hälfe.\n\nBitte gänd mir bis am Donnschtig Bschäid, damit ich cha plane. Merci vilmal und bis gli!\n\nSandro",
    questions: [
      {
        text: "Wohäre züügled de Sandro und sini Familie?",
        options: ["Uf Wiedike", "Uf Örlike", "Uf Basel"],
        answer: 0,
        explain:
          "Mesajta „vo Örlike uf Wiedike“ deniyor: Örlike'den (Oerlikon) ayrılıp Wiedike'ye (Wiedikon) taşınıyorlar. Yön edatı „uf“ hedefi gösterir.",
      },
      {
        text: "Wänn chunt de Zügelwage?",
        options: ["Am Samschtig am Achti", "Am Friitig am Achti", "Am Donnschtig z Mittag"],
        answer: 0,
        explain: "„De Zügelwage chunt am Samschtig am Achti“ — kamyonet cumartesi sabah 8'de geliyor.",
      },
      {
        text: "Richtig oder falsch? S Klavier muess me au i di neu Wonig träge.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Piyano eski dairede kalıyor, onu sonraki kiracı (Nachmieter) devralıyor — taşınmasına gerek yok.",
      },
      {
        text: "Was cha me am Friitig mache, wenn me am Samschtig käi Ziit hät?",
        options: ["Bim Chischte packe hälfe", "D Pizza zaale", "De Zügelwage fahre"],
        answer: 0,
        explain:
          "Cumartesi vakti olmayanlar için alternatif cuma günü koli paketlemeye yardım etmek: „cha au scho am Friitig bim Chischte packe hälfe“.",
      },
      {
        text: "Bis wänn söll me em Sandro Bschäid gää?",
        options: ["Bis am Donnschtig", "Bis Ändi Monet", "Bis am Samschtig"],
        answer: 0,
        explain:
          "Planlama yapabilmesi için perşembeye kadar haber istiyor: „Bitte gänd mir bis am Donnschtig Bschäid“.",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "zh-b1-r3",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Nöii Homeoffice-Reglig",
    genre: "E-posta",
    intro:
      "Bir Zürih şirketinin ekibine gönderdiği yeni evden çalışma düzeni e-postasını okuyacaksın.",
    gloss: [
      { de: "d Reglig", tr: "düzenleme, kural" },
      { de: "de Aaspruch", tr: "hak" },
      { de: "abmache", tr: "kararlaştırmak" },
      { de: "d Sitzig", tr: "toplantı" },
      { de: "d Präsänz", tr: "ofiste bulunma" },
      { de: "d Uusnaam", tr: "istisna" },
      { de: "gälte", tr: "geçerli olmak" },
      { de: "de Iisatz", tr: "çaba, katkı" },
    ],
    minutes: 5,
    text:
      "Liebs Team\n\nNach de Umfrag im Früelig händ mir d Homeoffice-Reglig aapasst. Ab em erschte Mai gilt Folgends:\n\nJedi und jede hät Aaspruch uf zwäi Homeoffice-Täg i de Wuche. Wie mir die verteiled, mached mir im Team ab — wichtig isch nume, dass am Zischtig alli da sind. De Zischtig isch üse Präsänztag: Sitzige, Uusbildig und alles, wo me besser persönlich macht, lauft a dem Tag.\n\nWär meh als zwäi Täg dihäi schaffe wott, redt mit em Vorgsetzte. Uusnaame git s, aber si müend en Grund haa — zum Bispil en lange Aarbetswäg oder e Betreuigsufgab.\n\nNöi isch au: D Arbetsziit wird nöd meh pro Tag, sondern pro Wuche zellt. Wer am Mittwuch früener ufhört und am Dunschtig lenger macht, mues niemert um Erlaubnis frööge.\n\nWichtig bliibt: Mir sind erreichbar zwüsche de nüüni und de füfi. Wer i dere Ziit nöd cha, säit s vorane im Team-Chat.\n\nMerci für euere Iisatz\nD Gschäftsleitig",
    questions: [
      {
        text: "Uf wie vil Homeoffice-Täg hät jede Aaspruch?",
        options: ["Zwäi i de Wuche", "Drei i de Wuche", "Äine im Monet"],
        answer: 0,
        explain: "„Jedi und jede hät Aaspruch uf zwäi Homeoffice-Täg i de Wuche.“",
      },
      {
        text: "Was isch am Zischtig anderscht?",
        options: [
          "Alli sind im Büro, well Sitzige a dem Tag laufed",
          "Alli schaffed dihäi",
          "Me mues lenger schaffe",
        ],
        answer: 0,
        explain:
          "Salı „Präsänztag“: toplantılar, eğitimler ve yüz yüze olması iyi olan her şey o gün.",
      },
      {
        text: "Wer meh als zwäi Täg dihäi schaffe wott, …",
        options: [
          "mues mit em Vorgsetzte rede und en Grund haa",
          "cha das äifach so mache",
          "mues es im Team-Chat schriibe",
        ],
        answer: 0,
        explain:
          "İstisna mümkün ama gerekçe (uzun yol, bakım yükümlülüğü) ve amirle konuşma şart.",
      },
      {
        text: "Wie wird d Arbetsziit nöi zellt?",
        options: ["Pro Wuche", "Pro Tag", "Pro Monet"],
        answer: 0,
        explain:
          "„D Arbetsziit wird nöd meh pro Tag, sondern pro Wuche zellt“ — günler arası denkleştirme serbest.",
      },
      {
        text: "Richtig oder falsch? Me mues de ganz Tag erreichbar sii.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: erişilebilirlik yalnızca 9–17 arası, o saatlerde de olamayan önceden haber veriyor.",
      },
    ],
  },
  {
    id: "zh-b1-r4",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "S Velo erooberet d Stadt",
    genre: "Gazete haberi",
    intro:
      "Zürih'te bisiklet kullanımının artışını anlatan bir yerel gazete haberini okuyacaksın.",
    gloss: [
      { de: "erooberä", tr: "fethetmek, ele geçirmek" },
      { de: "d Zellig", tr: "sayım" },
      { de: "zuegnaa", tr: "artmış (zugenommen)" },
      { de: "d Velospur", tr: "bisiklet şeridi" },
      { de: "de Uusbau", tr: "genişletme, inşa" },
      { de: "d Kritik", tr: "eleştiri" },
      { de: "de Parkplatz", tr: "otopark yeri" },
      { de: "d Umfrag", tr: "anket" },
    ],
    minutes: 5,
    text:
      "Z Züri wird immer meh Velo gfahre. D Zellig vo de Stadt zäigt: Im letschte Jaar sind uf de wichtigschte Achse öppe füfezwänzg Prozänt meh Velo underwägs gsii als vor füf Jaar. Am stärchschte zuegnaa hät s uf de Route em Limmat naa.\n\nD Stadt erklärt sich das mit em Uusbau: I de letschte drei Jaar sind vierzäh Kilometer nöii Velospure entstande, viili devo baulich trennt vom Autoverchehr. „Wär sich sicher fühlt, fahrt au“, säit d Projäktleiterin Andrea Wyss.\n\nEs git aber au Kritik. S Gwärb bemängelet, dass für d Velospure Parkplätz verschwunde sind. „Üsi Chundschaft chunt vo usserhalb und bruucht s Auto“, säit en Ladebsitzer us em Chreis 3.\n\nE Umfrag under Ladebsitzer im Chreis 4 zäigt es anders Bild: Zwäi Dritel händ käi Umsatzverluscht gschpürt, äine vo drüü sogar meh Chundschaft. D Stadt wott jetz au i de Ussequartier wiiterbaue — dört isch s Netz bis hüt am schwächschte.",
    questions: [
      {
        text: "Wie hät sich de Veloverchehr entwicklet?",
        options: [
          "Er isch i füf Jaar öppe en Viertel gwachse",
          "Er isch gliich bliibe",
          "Er isch zrugggange",
        ],
        answer: 0,
        explain: "„öppe füfezwänzg Prozänt meh Velo … als vor füf Jaar“ — yaklaşık dörtte bir artış.",
      },
      {
        text: "Womit erklärt d Stadt de Aastiig?",
        options: [
          "Mit em Uusbau vo de Velospure",
          "Mit de höchere Benzinpriis",
          "Mit em Wätter",
        ],
        answer: 0,
        explain:
          "Şehir 14 km yeni bisiklet şeridine işaret ediyor: güvende hissedince insanlar biniyor.",
      },
      {
        text: "Was kritisiert s Gwärb?",
        options: [
          "Dass Parkplätz verschwunde sind",
          "Dass d Velospure z schmal sind",
          "Dass d Stadt z langsam bout",
        ],
        answer: 0,
        explain: "Esnaf, bisiklet şeritleri için park yerlerinin kaldırılmasından şikâyetçi.",
      },
      {
        text: "Was zäigt d Umfrag im Chreis 4?",
        options: [
          "Zwäi Dritel händ käi Umsatzverluscht gschpürt",
          "Alli händ weniger Umsatz",
          "D Ladebsitzer wänd meh Parkplätz",
        ],
        answer: 0,
        explain:
          "Ankete göre üçte ikisi ciro kaybı yaşamamış, hatta üçte biri daha fazla müşteri görmüş.",
      },
      {
        text: "Wo wott d Stadt als nächschts boue?",
        options: ["I de Ussequartier", "Nume em Limmat naa", "Im Zäntrum"],
        answer: 0,
        explain: "Son cümle: ağın en zayıf olduğu dış mahallelerde devam edilecek.",
      },
    ],
  },
  {
    id: "zh-b1-r5",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Rezykliere z Züri",
    genre: "Rehber",
    intro:
      "Zürih'te çöp ve geri dönüşüm kuralları — yeni gelenlerin en çok hata yaptığı konu. Rehberi okuyacaksın.",
    gloss: [
      { de: "de Chübel", tr: "kova, çöp kovası" },
      { de: "de Züri-Sack", tr: "resmî çöp poşeti (ücreti içinde)" },
      { de: "d Buess", tr: "para cezası" },
      { de: "d Sammelstell", tr: "toplama noktası" },
      { de: "gratis", tr: "ücretsiz" },
      { de: "de Chartongg", tr: "karton" },
      { de: "abgää", tr: "teslim etmek, bırakmak" },
      { de: "zämebinde", tr: "bağlamak, demet yapmak" },
    ],
    minutes: 5,
    text:
      "Wer nöi z Züri isch, staunt zerscht: Abfall choschtet Gäld — aber nöd alle.\n\nNormale Abfall ghört i de Züri-Sack. De Sack choschtet meh als en normale, wil d Gebüür scho drin isch. Wer sin Abfall imene andere Sack usestellt, riskiert e Buess vo hundert Franke oder meh. D Sack wärded am Abfuhrtag am Morge vor de sibni usegstellt, nöd am Aabig vorher — susch chömed d Füchs.\n\nGratis isch hingäge alles, wo me rezykliert: Glas, Metall und Textilie bringt me a d Sammelstell im Quartier. Papier und Chartongg wärded zämebunde vor s Huus gstellt — aber nume a de Täg, wo im Abfuhrkaländer staned. De Kaländer chunt jedes Jaar mit de Poscht und isch au online.\n\nPET und Batterie nimmt jede Lade zrugg, wo si verchauft. Für alte Elektro giltet s gliich: Wer Elektro verchauft, mues es au zruggnää — au wänn me s Grät dört nöd kauft hät.\n\nGrossi Sache wie Möbel hollt d Stadt gäge Bezaalig ab. Wer s sälber uf d Entsorgigsstell bringt, zaalt weniger.",
    questions: [
      {
        text: "Warum choschtet de Züri-Sack meh als en normale Sack?",
        options: [
          "Well d Abfallgebüür scho im Priis drin isch",
          "Well er dicker isch",
          "Well er us Recyclingmaterial isch",
        ],
        answer: 0,
        explain: "„De Sack choschtet meh …, wil d Gebüür scho drin isch“ — çöp vergisi poşetin fiyatında.",
      },
      {
        text: "Wänn stellt me de Sack use?",
        options: [
          "Am Abfuhrtag vor de sibni am Morge",
          "Am Aabig vorher",
          "Wänn me wott",
        ],
        answer: 0,
        explain:
          "Sabah yediden önce; akşamdan çıkarmak yasak, çünkü tilkiler poşetleri parçalıyor.",
      },
      {
        text: "Was isch gratis?",
        options: [
          "Glas, Metall, Textilie, Papier",
          "Nume Papier",
          "Alles usser Möbel",
        ],
        answer: 0,
        explain: "Geri dönüştürülen her şey ücretsiz; para ödenen yalnızca normal çöp ve büyük eşya.",
      },
      {
        text: "Wo cha me alti Elektrogrät abgää?",
        options: [
          "I jedem Lade, wo Elektro verchauft",
          "Nume dört, wo me s kauft hät",
          "Bi de Poscht",
        ],
        answer: 0,
        explain:
          "Elektronik satan her mağaza geri almak zorunda — cihazı oradan almamış olsanız bile.",
      },
      {
        text: "Wie chunt me günschtiger vo Möbel ewägg?",
        options: [
          "Sälber uf d Entsorgigsstell bringe",
          "Si vor s Huus stelle",
          "Si i de Züri-Sack tue",
        ],
        answer: 0,
        explain: "„Wer s sälber uf d Entsorgigsstell bringt, zaalt weniger.“",
      },
    ],
  },
  {
    id: "zh-b1-r6",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Wie lern ich Mundart?",
    genre: "Forum",
    intro:
      "Bir dil forumunda lehçe öğrenmeye çalışan birinin sorusu ve üç yanıtı okuyacaksın.",
    gloss: [
      { de: "de Biitrag", tr: "gönderi, katkı" },
      { de: "verstaa", tr: "anlamak" },
      { de: "d Hemmig", tr: "çekingenlik" },
      { de: "aafange", tr: "başlamak" },
      { de: "sich gwöhne a", tr: "…e alışmak" },
      { de: "de Alltag", tr: "günlük hayat" },
      { de: "d Uussprooch", tr: "telaffuz" },
      { de: "s Vorbild", tr: "örnek, model" },
    ],
    minutes: 5,
    text:
      "MERVE_ZH: Ich wohne sit zwäi Jaar z Züri und ha s Tüütsch-Zertifikat B1. Trotzdem verstaan ich i de Pause im Gschäft fascht nüüt. Alli wächsled zwar uf Hochdüütsch, wänn ich debii bi — aber das isch mer fascht na unagnämer. Wie händ ihr das gmacht?\n\nBRUNO64: Zerscht emal: Das isch normal, und es lit nöd a dir. Mundart verstaa und Mundart rede sind zwäi ganz verschiideni Sache. Fang mit em Verstaa aa und säg de Lüüt äifach: „Redet ruig Schwiizerdüütsch, ich verstaan s scho.“ Di mäischte fröied sich sogar.\n\nLINA_M: Mir hät Radio ghölfe — aber nöd d Nachrichte, die sind uf Hochdüütsch. Nimm Sändige, wo d Lüüt äifach schwätzed. Am Aafang verstaasch drei Wörter, nach eme halbe Jaar de halb Satz. Und lueg Serie us de Schwiiz mit Undertitel.\n\nTOBI: Ich würd s andersch mache: Suech der äi Person, wo mit dir nume Mundart redt. Bi mir isch das min Nachbar gsii. Zwänzg Minute am Tag, immer s gliiche Thema — s Wätter, de Fuessball, egal. Nach drei Mönet han ich gmerkt, dass ich sälber aafange rede. Wichtig: Perfäkti Uussprooch bruuchsch nöd. Niemert erwartet, dass du tönsch wie z Züri ufgwachse.",
    questions: [
      {
        text: "Was isch s Hauptproblem vo MERVE_ZH?",
        options: [
          "Si verstaat d Mundart im Gschäft nöd",
          "Si hät käis Zertifikat",
          "Si findet käi Kurs",
        ],
        answer: 0,
        explain: "B1 sertifikası var ama iş yerindeki mola sohbetlerini anlamıyor.",
      },
      {
        text: "Was findet si unagnäm?",
        options: [
          "Dass alli uf Hochdüütsch wächsled, wänn si debii isch",
          "Dass niemert mit ere redt",
          "Dass d Kollege z schnäll redet",
        ],
        answer: 0,
        explain: "„Alli wächsled zwar uf Hochdüütsch … aber das isch mer fascht na unagnämer.“",
      },
      {
        text: "Was empfilt de BRUNO64?",
        options: [
          "Zerscht s Verstaa üebe und d Lüüt bitte, Mundart z rede",
          "En Sprachkurs bsueche",
          "Nume na Mundart rede",
        ],
        answer: 0,
        explain:
          "Anlama ile başla ve çevrene „Redet ruig Schwiizerdüütsch“ de — çoğu buna sevinir.",
      },
      {
        text: "Was säit d LINA_M über s Radio?",
        options: [
          "Nachrichte helfed nöd, well si uf Hochdüütsch sind",
          "Radio bringt gar nüüt",
          "Me söll nume Nachrichte lose",
        ],
        answer: 0,
        explain:
          "Haberler standart Almanca olduğu için işe yaramıyor; serbest sohbet programlarını öneriyor.",
      },
      {
        text: "Was isch em TOBI am wichtigschte?",
        options: [
          "Regelmässig mit ere Person Mundart rede",
          "E perfäkti Uussprooch",
          "Vill Grammatik lerne",
        ],
        answer: 0,
        explain:
          "Her gün yirmi dakika aynı kişiyle konuşmak; mükemmel telaffuzun gerekmediğini de ekliyor.",
      },
    ],
  },

  {
    id: "zh-b1-l1",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "In de Znüni-Pause",
    genre: "Diyalog",
    intro:
      "Reto ile Nadja iş yerinde kuşluk molasında konuşuyor: ertelenen bir toplantı ve bir veda kutlaması.",
    gloss: [
      { de: "d Sitzig", tr: "toplantı" },
      { de: "verschobe", tr: "ertelenmiş" },
      { de: "d Zaale", tr: "rakamlar, sayılar" },
      { de: "s Quartal", tr: "çeyrek (üç aylık dönem)" },
      { de: "parat", tr: "hazır" },
      { de: "de Apéro", tr: "kutlama içeceği, aperitif buluşması" },
      { de: "i Pension gaa", tr: "emekli olmak" },
      { de: "zaale", tr: "ödemek" },
    ],
    minutes: 3,
    segments: [
      {
        speaker: "Reto",
        text: "Du Nadja, häsch scho ghört? D Sitzig vo morn am Zäni isch verschobe — d Chefin isch de ganz Tag in Basel.",
      },
      { speaker: "Nadja", text: "Aha, uf wänn dänn?" },
      {
        speaker: "Reto",
        text: "Uf Donnschtig am Zwäi. Und mir sölled bis dänn d Zaale vom letschte Quartal parat haa.",
      },
      {
        speaker: "Nadja",
        text: "Guet z wüsse. Ich schaffe am Donnschtig übrigens im Homeoffice — ich chume dänn eifach online dezue.",
      },
      {
        speaker: "Reto",
        text: "Käis Problem. Ah, und na öppis: Am Friitig nach de Arbet mached mir en chliine Apéro für de Markus — är gaat i Pension. Chunsch au?",
      },
      { speaker: "Nadja", text: "Klar chume ich! Söll ich öppis mitbringe?" },
      { speaker: "Reto", text: "Wenn du magsch, es Dessert. D Getränk zaalt d Firma." },
    ],
    questions: [
      {
        text: "Warum isch d Sitzig vo morn verschobe?",
        options: [
          "D Chefin isch in Basel",
          "D Zaale sind na nöd parat",
          "De Reto isch im Homeoffice",
        ],
        answer: 0,
        explain:
          "Reto sebebini ilk cümlede söylüyor: „d Chefin isch de ganz Tag in Basel“ — patron bütün gün Basel'de.",
      },
      {
        text: "Wänn findet d Sitzig neu statt?",
        options: ["Am Donnschtig am Zwäi", "Morn am Zäni", "Am Friitig nach de Arbet"],
        answer: 0,
        explain:
          "Yeni tarih perşembe saat 14: „Uf Donnschtig am Zwäi“. Morn am Zäni eski zamandı, cuma ise Apéro günü.",
      },
      {
        text: "Was muess bis zur Sitzig parat sii?",
        options: [
          "D Zaale vom letschte Quartal",
          "S Programm für s nöchscht Jaar",
          "En Bricht über Basel",
        ],
        answer: 0,
        explain: "Reto: „mir sölled bis dänn d Zaale vom letschte Quartal parat haa“ — geçen çeyreğin rakamları.",
      },
      {
        text: "Wie nimmt d Nadja a de Sitzig täil?",
        options: ["Online us em Homeoffice", "Si chunt is Büro", "Si chunt gar nöd"],
        answer: 0,
        explain:
          "Nadja perşembe evden çalışıyor ve toplantıya çevrim içi katılacak: „ich chume dänn eifach online dezue“.",
      },
      {
        text: "Was bringt d Nadja zum Apéro mit?",
        options: ["Es Dessert", "D Getränk", "Nüüt"],
        answer: 0,
        explain:
          "Reto tatlı getirmesini öneriyor („Wenn du magsch, es Dessert“); içecekleri zaten şirket ödüyor.",
      },
    ],
  },
  {
    id: "zh-b1-l2",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Was isch s Sächsilüüte?",
    genre: "Diyalog",
    intro:
      "Zürih'e yeni taşınan Elif, iş arkadaşı Käthi'ye şehrin bahar festivalini soruyor.",
    gloss: [
      { de: "d Zunft", tr: "lonca (tarihî esnaf birliği)" },
      { de: "verbränne", tr: "yakmak" },
      { de: "de Böögg", tr: "Böögg: yakılan kardan adam figürü" },
      { de: "d Watte", tr: "pamuk" },
      { de: "de Chracher", tr: "patlayıcı, maytap" },
      { de: "aazünde", tr: "tutuşturmak, ateşlemek" },
      { de: "explodiere", tr: "patlamak" },
      { de: "zueluege", tr: "izlemek, seyretmek" },
    ],
    minutes: 3,
    segments: [
      {
        speaker: "Elif",
        text: "Du Käthi, was isch äigentli das Sächsilüüte, wo grad alli devoo reded?",
      },
      {
        speaker: "Käthi",
        text: "Das isch s Zürcher Früeligsfäscht, immer am dritte Mäntig im April. D Zünft laufed in ihrne alte Chläider dur d Schtadt, und am Aabig verbränned si de Böögg.",
      },
      { speaker: "Elif", text: "De Böögg? Was isch dänn das?" },
      {
        speaker: "Käthi",
        text: "En groosse Schneemaa us Watte, mit Chracher im Chopf. Är schtaat uf em Sächsilüüteplatz uf eme hoche Hufe Holz, und am Punkt Sächsi zünded si s Füür aa.",
      },
      { speaker: "Elif", text: "Und warum macht me das?" },
      {
        speaker: "Käthi",
        text: "De Böögg isch s Symbol vom Winter. Je schnäller sin Chopf explodiert, descht schööner wird de Summer — säged d Lüüt. Letscht Jaar hät s öppe zwänzg Minuute duuret, das isch lang.",
      },
      { speaker: "Elif", text: "Spannend! Und cha me das eifach go zueluege?" },
      {
        speaker: "Käthi",
        text: "Klar, es choschtet nüüt. Aber gang früe hii, susch gseesch nüüt — es hät mega vil Lüüt. Mir chönd ja zäme gaa, wenn d magsch.",
      },
    ],
    questions: [
      {
        text: "Wänn findet s Sächsilüüte statt?",
        options: [
          "Am dritte Mäntig im April",
          "Am erschte Samschtig im Mai",
          "Immer am Oschtermäntig",
        ],
        answer: 0,
        explain:
          "Käthi tarihi net veriyor: „immer am dritte Mäntig im April“ — nisanın üçüncü pazartesisi.",
      },
      {
        text: "Was isch de Böögg?",
        options: [
          "En Schneemaa us Watte mit Chracher im Chopf",
          "En alte Maa us de Zunft",
          "Es Füürwärch über em See",
        ],
        answer: 0,
        explain:
          "Böögg, kafasında maytaplar olan pamuktan dev bir kardan adam: „En groosse Schneemaa us Watte, mit Chracher im Chopf“.",
      },
      {
        text: "Richtig oder falsch? Je länger de Böögg brännt, descht schööner wird de Summer.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış — tam tersi: kafa ne kadar ÇABUK patlarsa yaz o kadar güzel olur deniyor („Je schnäller sin Chopf explodiert…“).",
      },
      {
        text: "Was choschtet s Zueluege?",
        options: ["Nüüt", "Zwänzg Franke", "Nur d Zünftler zaaled"],
        answer: 0,
        explain: "Käthi „es choschtet nüüt“ diyor — izlemek ücretsiz.",
      },
      {
        text: "Warum söll d Elif früe hiigaa?",
        options: [
          "Wil s susch weg de vile Lüüt nüüt gseet",
          "Wil s Füür scho am Mittag brännt",
          "Wil d Träm dänn nüme fahred",
        ],
        answer: 0,
        explain:
          "Kalabalık yüzünden: „gang früe hii, susch gseesch nüüt — es hät mega vil Lüüt“.",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "zh-b1-l3",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Bim Coiffeur",
    genre: "Diyalog",
    intro: "Elif kuaförde ne istediğini anlatıyor. Konuşmayı dinleyeceksin.",
    gloss: [
      { de: "de Coiffeur", tr: "kuaför (İsviçre'de Friseur yerine)" },
      { de: "d Schpitze", tr: "saç uçları" },
      { de: "schniide", tr: "kesmek" },
      { de: "de Pony", tr: "kâkül" },
      { de: "föne", tr: "fön çekmek" },
      { de: "de Termin", tr: "randevu" },
      { de: "zwäg mache", tr: "hazırlamak, yapmak (saç)" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Coiffeuse", text: "Grüezi Frau Demir, chömed Si grad ane. Was mached mir hüt?" },
      {
        speaker: "Elif",
        text: "Grüezi. Nöd z vill, bitte — nume d Schpitze. Si sind trocke worde.",
      },
      { speaker: "Coiffeuse", text: "Also öppe zwäi Zentimeter? Und d Läng suscht so laa?" },
      {
        speaker: "Elif",
        text: "Genau. Und de Pony chönted Si es bitzeli chürzer mache, aber würkli nume es bitzeli.",
      },
      {
        speaker: "Coiffeuse",
        text: "Alles klar. Wänd Si nachhär föne, oder lönd Si s lieber lufttrochne?",
      },
      { speaker: "Elif", text: "Föne, bitte. Ich mues nachhär grad no a e Sitzig." },
      {
        speaker: "Coiffeuse",
        text: "Guet. Denn bruuched mir öppe vierzg Minute. Wänd Si en Kafi?",
      },
      { speaker: "Elif", text: "Sehr gärn, merci. Und chönt ich grad de nöchscht Termin abmache?" },
      {
        speaker: "Coiffeuse",
        text: "Sicher. I öppe zwölf Wuche? Denn hettemer am Dunschtig am vieri Platz.",
      },
      { speaker: "Elif", text: "Das passt mer guet." },
    ],
    questions: [
      {
        text: "Was wott d Elif gmacht haa?",
        options: [
          "Nume d Schpitze und de Pony chürzer",
          "E ganz nöii Frisur",
          "D Haar färbe",
        ],
        answer: 0,
        explain: "İki santim uç ve „es bitzeli“ kâkül; boyu aynı kalıyor.",
      },
      {
        text: "Warum wott si föne?",
        options: [
          "Well si nachhär a e Sitzig mues",
          "Well s chalt isch",
          "Well si s so gärn hät",
        ],
        answer: 0,
        explain: "„Ich mues nachhär grad no a e Sitzig“ — hemen ardından toplantısı var.",
      },
      {
        text: "Wie lang duuret s?",
        options: ["Öppe vierzg Minute", "Zwölf Minute", "E ganzi Stund"],
        answer: 0,
        explain: "„Denn bruuched mir öppe vierzg Minute.“ On iki, sonraki randevunun hafta sayısı.",
      },
      {
        text: "Wänn isch de nöchscht Termin?",
        options: [
          "I öppe zwölf Wuche, am Dunschtig am vieri",
          "Nächschti Wuche",
          "I drei Mönet am Määndig",
        ],
        answer: 0,
        explain: "„I öppe zwölf Wuche? Denn hettemer am Dunschtig am vieri Platz.“",
      },
    ],
  },
  {
    id: "zh-b1-l4",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Elteraabig i de Schuel",
    genre: "Konuşma",
    intro:
      "Bir Zürih ilkokulunda veli toplantısında öğretmenin açılış konuşmasını dinleyeceksin.",
    gloss: [
      { de: "de Elteraabig", tr: "veli toplantısı" },
      { de: "d Uufgab", tr: "ödev, görev" },
      { de: "s Zügnis", tr: "karne" },
      { de: "d Exkursion", tr: "gezi" },
      { de: "s Lager", tr: "okul kampı (İsviçre klasiği)" },
      { de: "de Beitrag", tr: "katkı payı" },
      { de: "sich mälde", tr: "haber vermek, başvurmak" },
      { de: "d Betreuig", tr: "gözetim, refakat" },
    ],
    minutes: 4,
    segments: [
      {
        speaker: "Lehrerin",
        text: "Grüezi mitenand und härzlich willkomme zum Elteraabig. Schöön, dass so vill choo sind.",
      },
      {
        speaker: "Lehrerin",
        text: "Zerscht es paar Wort zum Alltag: D Chind händ jetz jede Tag öppe zwänzg bis drissg Minute Uufgabe. Wänn s dihäi lenger duuret, schriibed Si mer s — denn passed mir s aa.",
      },
      {
        speaker: "Lehrerin",
        text: "S Zügnis chunt im Februar. Vorher git s Elterngspröch; d Termin chönd Si ab nächschter Wuche online usläse.",
      },
      {
        speaker: "Lehrerin",
        text: "Im Mai gömmer is Klasselager uf d Lenzerheide, vo Määndig bis Friitig. De Beitrag isch hundertsächzg Franke. Wänn das für e Familie schwiirig isch, mäldet Si sich bi mir — es git en Fonds, und das bliibt under üs.",
      },
      {
        speaker: "Lehrerin",
        text: "Und zum Schluss: Für d Exkursion im Juni sueched mir zwäi Eltere für d Betreuig. Wär cha, schriibt sich hinde uf de Lischte ii.",
      },
    ],
    questions: [
      {
        text: "Wie lang söled d Uufgabe duure?",
        options: [
          "Öppe zwänzg bis drissg Minute",
          "E ganzi Stund",
          "Zwäi Stund",
        ],
        answer: 0,
        explain: "„jede Tag öppe zwänzg bis drissg Minute Uufgabe“ — uzun sürerse haber verilecek.",
      },
      {
        text: "Wänn chunt s Zügnis?",
        options: ["Im Februar", "Im Mai", "Im Juni"],
        answer: 0,
        explain: "„S Zügnis chunt im Februar“; mayıs kamp, haziran gezi ayı.",
      },
      {
        text: "Was säit d Lehrerin zum Beitrag vom Lager?",
        options: [
          "Familie mit Schwiirigkäite chönd sich mälde, es git en Fonds",
          "De Beitrag mues bis Määndig zaalt sii",
          "S Lager isch gratis",
        ],
        answer: 0,
        explain:
          "160 frank; ödemekte zorlanan aileler için bir fon var ve bu gizli kalıyor.",
      },
      {
        text: "Was suecht si für d Exkursion?",
        options: [
          "Zwäi Eltere für d Betreuig",
          "En Bus",
          "Gäld für s Material",
        ],
        answer: 0,
        explain: "Haziran gezisi için refakat edecek iki veli arıyor; liste arkada.",
      },
    ],
  },
  {
    id: "zh-b1-l5",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "E Reklamation am Telefon",
    genre: "Telefon",
    intro:
      "Murat, internetten aldığı bozuk bir ürün için müşteri hizmetlerini arıyor. Konuşmayı dinleyeceksin.",
    gloss: [
      { de: "d Reklamation", tr: "şikâyet, iade talebi" },
      { de: "d Bstellig", tr: "sipariş" },
      { de: "d Rächnig", tr: "fatura" },
      { de: "de Ersatz", tr: "değişim, yenisi" },
      { de: "zrugggää", tr: "iade etmek" },
      { de: "s Etikett", tr: "etiket" },
      { de: "d Frischt", tr: "süre" },
      { de: "guetschriibe", tr: "hesaba geçirmek, iade etmek" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Kundedienscht", text: "Grüezi, Kundedienscht Bergmann, Sie schprächt d Frau Roth." },
      {
        speaker: "Murat",
        text: "Grüezi. Ich han vor ere Wuche e Kaffimaschine bstellt. Si isch aacho, aber si lauft nöd — s Wasser bliibt chalt.",
      },
      { speaker: "Frau Roth", text: "Das tuet mer läid. Händ Si d Bstellnummere zur Hand?" },
      { speaker: "Murat", text: "Ja: A wie Anna, sibe, sibe, drü, zwäi." },
      {
        speaker: "Frau Roth",
        text: "Merci, ich han s. Sie händ zwäi Möglichkäite: Mir schicked Ine en Ersatz, oder Si gänd s Grät zrugg und mir schriibed Ine de Betrag guet.",
      },
      { speaker: "Murat", text: "Was gaat schnäller?" },
      {
        speaker: "Frau Roth",
        text: "De Ersatz. Wänn Si hüt s Paket uf d Poscht bringed, isch s nöie i zwäi bis drüü Täg bi Ine.",
      },
      { speaker: "Murat", text: "Guet, denn de Ersatz. Mues ich s Porto zaale?" },
      {
        speaker: "Frau Roth",
        text: "Nei. Ich schick Ine grad es Retour-Etikett per Mail — das drucked Si us und chläbed s ufs Paket.",
      },
      { speaker: "Murat", text: "Perfäkt, merci vilmal." },
    ],
    questions: [
      {
        text: "Was isch s Problem?",
        options: [
          "D Kaffimaschine ercha s Wasser nöd warm mache",
          "S Paket isch nie aacho",
          "Si händ s falsche Modäll gschickt",
        ],
        answer: 0,
        explain: "„Si isch aacho, aber si lauft nöd — s Wasser bliibt chalt.“",
      },
      {
        text: "Welli zwäi Möglichkäite git s?",
        options: [
          "Ersatz oder Gäld zrugg",
          "Reparatur oder Rabatt",
          "Nume Reparatur",
        ],
        answer: 0,
        explain: "Ya yenisi gönderilir ya da ürün iade edilip tutar hesaba geçilir.",
      },
      {
        text: "Warum wählt de Murat de Ersatz?",
        options: [
          "Well s schnäller gaat",
          "Well s billiger isch",
          "Well er s Gäld nöd wott",
        ],
        answer: 0,
        explain: "„Was gaat schnäller?“ diye soruyor; cevap „De Ersatz“ — 2-3 gün.",
      },
      {
        text: "Wär zaalt s Porto?",
        options: ["D Firma — si schickt es Retour-Etikett", "De Murat", "Niemert, er bringt s sälber"],
        answer: 0,
        explain: "„Nei. Ich schick Ine grad es Retour-Etikett per Mail.“",
      },
    ],
  },
  {
    id: "zh-b1-l6",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Radio: Verchehr und Veraastaltige",
    genre: "Radyo",
    intro: "Yerel radyoda trafik durumu ve hafta sonu etkinlik duyurularını dinleyeceksin.",
    gloss: [
      { de: "d Veraastaltig", tr: "etkinlik" },
      { de: "de Stau", tr: "trafik sıkışıklığı" },
      { de: "d Umleitig", tr: "güzergâh değişikliği" },
      { de: "de Iisatz", tr: "müdahale (itfaiye/polis)" },
      { de: "d Sperrig", tr: "kapatma" },
      { de: "s Feschtgländ", tr: "festival alanı" },
      { de: "de Iitritt", tr: "giriş" },
    ],
    minutes: 4,
    segments: [
      { text: "Es isch zää vor achti — de Verchehr und denn üsi Tipps für s Wuchenänd." },
      {
        text: "Uf de A1 zwüsche Wettige und em Gubrist stoot s: sächs Kilometer Stau nach eme Unfall. D Polizei isch im Iisatz, di linggi Schpur isch gschperrt. Rächned mit zwänzg Minute Verluscht.",
      },
      {
        text: "I de Stadt sälber isch d Langstrass wäge Bauarbete bis am Friitig zue. S Tram Nummere achti fahrt e Umleitig über s Escher-Wyss-Platz.",
      },
      {
        text: "Und jetz s Wuchenänd: Uf em Kasernenareal staat s Foodfeschtival — vo Friitig bis Sunntig, elfi bis am zäni am Aabig. De Iitritt isch gratis, s Ässe nöd.",
      },
      {
        text: "Am Sunntig am zwölfi git s im Quartier Wipkinge en Flohmärt. Bi Räge wird er uf de nöchscht Sunntig verschobe.",
      },
    ],
    questions: [
      {
        text: "Was isch uf de A1 passiert?",
        options: [
          "En Unfall — sächs Kilometer Stau",
          "E Bauschtell",
          "Es hät gschneit",
        ],
        answer: 0,
        explain: "„sächs Kilometer Stau nach eme Unfall“, sol şerit kapalı.",
      },
      {
        text: "Warum fahrt s Tram achti e Umleitig?",
        options: [
          "D Langstrass isch wäge Bauarbete zue",
          "Wäge em Foodfeschtival",
          "Wäge em Unfall uf de A1",
        ],
        answer: 0,
        explain: "„I de Stadt … isch d Langstrass wäge Bauarbete bis am Friitig zue.“",
      },
      {
        text: "Was choschtet de Iitritt zum Foodfeschtival?",
        options: ["Nüüt", "Zää Franke", "Elf Franke"],
        answer: 0,
        explain: "„De Iitritt isch gratis, s Ässe nöd“ — giriş bedava, yemek değil.",
      },
      {
        text: "Was passiert mit em Flohmärt bi Räge?",
        options: [
          "Er wird uf de nöchscht Sunntig verschobe",
          "Er findet trotzdem statt",
          "Er fallt uus",
        ],
        answer: 0,
        explain: "„Bi Räge wird er uf de nöchscht Sunntig verschobe.“",
      },
    ],
  },

  {
    id: "zh-b1-w1",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "En Grillaabig im Innehoof",
    genre: "Mesaj",
    intro:
      "Apartmanın avlusunda mangal akşamı düzenliyorsun — önce cümle kur, sonra komşuların mesaj grubuna davet yaz.",
    gloss: [
      { de: "grilliere", tr: "mangal yapmak (İsviçre)" },
      { de: "de Innehoof", tr: "iç avlu" },
      { de: "mitbringe", tr: "yanında getirmek" },
      { de: "de Lärm", tr: "gürültü" },
      { de: "ufruume", tr: "toplamak, temizlemek" },
      { de: "verschiebe", tr: "ertelemek" },
      { de: "Bschäid gää", tr: "haber vermek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Cumartesi akşamı iç avluda mangal yapıyoruz.",
        answer: "Am Samschtigaabig grilliered mir im Innehoof.",
        alternatives: ["Mir grilliered am Samschtigaabig im Innehoof."],
        hint: "İsviçre'de 'mangal yapmak' grilliere'dir (grille değil). Çekimli fiil ikinci sırada: zaman öne gelince özne fiilden sonraya kayar.",
      },
      {
        kind: "build",
        tr: "Herkes içecek bir şey getirebilir.",
        answer: "Jede cha öppis z trinke mitbringe.",
        alternatives: ["Öppis z trinke cha jede mitbringe."],
        hint: "„öppis z trinke“ = içecek bir şey. Kip fiili cha ikinci pozisyonda, asıl fiil mitbringe mastar hâlde sonda.",
      },
      {
        kind: "free",
        prompt:
          "Apartmanın WhatsApp grubuna Züritüütsch bir mesaj yaz: kendini kısaca tanıt (üçüncü katta oturuyorsun), cumartesi saat 18'den itibaren avluda küçük bir mangal akşamı yapacağını söyle, herkesi davet et, yiyecek-içecek katkısı iste, saat 22'de toplayacağınızı belirt ve yağmur yağarsa ertelemeyi ekle.",
        checklist: [
          "Selamlama (Hoi zäme / Grüezi mitenand) ve kendini tanıtma var mı?",
          "Gün, saat ve yer bilgisini net verdin mi?",
          "Katkı ricasını kibarca kurdun mu (es wär schöön, wenn …)?",
          "Gürültü/toplama saatine ve yağmur planına değindin mi?",
        ],
        minWords: 50,
        phrases: [
          { de: "Ich bi de/d … us em dritte Schtock.", tr: "Üçüncü kattan … benim." },
          { de: "Ihr sind alli härzlich iiglade!", tr: "Hepiniz davetlisiniz!" },
          { de: "Es wär schöön, wenn jede … mitbringt.", tr: "Herkes … getirse ne güzel olur." },
          { de: "Käi Angscht wäge em Lärm.", tr: "Gürültü konusunda merak etmeyin." },
          { de: "Wenn s rägnet, verschiebed mir s.", tr: "Yağmur yağarsa erteleriz." },
          { de: "Gänd mir churz Bschäid, wär chunt.", tr: "Kimin geleceğini kısaca bildirin." },
        ],
        sample:
          "Hoi zäme!\n\nIch bi de Deniz us em dritte Schtock — ich wohne siit em Früelig da. Am Samschtig ab de Sächsi mached mir en chliine Grillaabig im Innehoof, und ihr sind alli härzlich iiglade!\n\nWürscht und Broot händ mir gnueg, aber es wär schöön, wenn jede na öppis z trinke oder en Salaat mitbringt. Käi Angscht wäge em Lärm: Um di Zääni ruumed mir uf, versproche. Wenn s rägnet, verschiebed mir s eifach uf de nöchscht Samschtig.\n\nGänd mir doch churz Bschäid, wär chunt. Ich fröi mi uf eu!\n\nDeniz",
      },
    ],
  },
  {
    id: "zh-b1-w2",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "E Reklamation schriibe",
    genre: "Şikâyet",
    intro:
      "Bir üründen memnun kalmadın ve yazılı olarak bildiriyorsun. Lehçede yazarken bile net ve kibar kalmak esas.",
    gloss: [
      { de: "d Reklamation", tr: "şikâyet" },
      { de: "d Bstellig", tr: "sipariş" },
      { de: "beschädiget", tr: "hasarlı" },
      { de: "de Ersatz", tr: "değişim" },
      { de: "d Frischt", tr: "süre" },
      { de: "erwarte", tr: "beklemek" },
      { de: "d Lösig", tr: "çözüm" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sipariş ettiğim lamba hasarlı geldi.",
        answer: "D Lampe, wo ich bstellt han, isch beschädiget aacho.",
        hint: "İlgi cümlesi lehçede „wo“ ile kurulur: d Lampe, wo ich bstellt han.",
      },
      {
        kind: "build",
        tr: "Faturanın bir kopyasını ekte gönderiyorum.",
        answer: "E Kopie vo de Rächnig schick ich im Aahang mit.",
        hint: "Genitiv yok: „vo de Rächnig“. Anhang → Aahang.",
      },
      {
        kind: "build",
        tr: "Bir hafta içinde bir çözüm bekliyorum.",
        answer: "Ich erwarte innerhalb vo ere Wuche e Lösig.",
        hint: "innerhalb einer Woche → innerhalb vo ere Wuche.",
      },
      {
        kind: "free",
        prompt:
          "Bir mağazaya şikâyet e-postası yaz. Dört noktaya değin: ne aldığın ve ne zaman, sorunun ne olduğu, şimdiye kadar ne yaptığın, ne istediğin (değişim mi para iadesi mi) ve hangi süre içinde.",
        checklist: [
          "Ürünü ve sipariş tarihini/numarasını yazdın mı?",
          "Sorunu somut anlattın mı?",
          "Daha önce iletişime geçtiysen bunu belirttin mi?",
          "Ne istediğini açıkça yazdın mı?",
          "Bir süre verdin mi ve kibar bir kapanış yaptın mı?",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich han am … bi Ine … bstellt.", tr: "… tarihinde sizden … sipariş ettim." },
          { de: "Läider isch … beschädiget aacho.", tr: "Maalesef … hasarlı geldi." },
          { de: "Ich han scho am … aaglüte.", tr: "… tarihinde zaten aramıştım." },
          { de: "Ich bitte Si um en Ersatz.", tr: "Sizden değişim rica ediyorum." },
          { de: "Ich erwarte bis am … e Antwort.", tr: "…'e kadar yanıt bekliyorum." },
          { de: "Fründlichi Grüess", tr: "Saygılarımla" },
        ],
        sample:
          "Grüezi mitenand\n\nAm zwölfte März han ich bi Ine e Schriibtischlampe bstellt (Bstellnummere A-7732). S Paket isch am Friitig aacho, aber d Lampe, wo ich bstellt han, isch beschädiget: de Fuess isch broche und s Kabel hät en Riss.\n\nIch han scho am Samschtig aaglüte, aber niemert isch erreichbar gsii. E Kopie vo de Rächnig schick ich im Aahang mit, sowie zwäi Fotene.\n\nIch bitte Si um en Ersatz. Wänn Si käine meh händ, hetti ich au gärn s Gäld zrugg. Ich erwarte innerhalb vo ere Wuche e Lösig.\n\nFründlichi Grüess\nMurat Aydın",
      },
    ],
  },
  {
    id: "zh-b1-w3",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "Läserbrief: Meh Bäum i de Stadt",
    genre: "Okur mektubu",
    intro:
      "Yerel gazeteye kısa bir okur mektubu yazacaksın: bir görüş belirtip gerekçelendireceksin.",
    gloss: [
      { de: "de Läserbrief", tr: "okur mektubu" },
      { de: "de Schatte", tr: "gölge" },
      { de: "d Hitz", tr: "sıcak, sıcaklık" },
      { de: "d Meinig", tr: "görüş" },
      { de: "iiverstande", tr: "hemfikir" },
      { de: "s Argumänt", tr: "argüman" },
      { de: "vorschlaa", tr: "önermek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bence şehrin daha çok ağaca ihtiyacı var.",
        answer: "Ich finde, d Stadt bruucht meh Bäum.",
        alternatives: ["Miner Meinig nach bruucht d Stadt meh Bäum."],
        hint: "„Ich finde, …“ ya da „Miner Meinig nach …“ — ikisi de doğal.",
      },
      {
        kind: "build",
        tr: "Yazın gölgede beş derece daha serin oluyor.",
        answer: "Im Summer isch s im Schatte füf Grad chüeler.",
        hint: "kühler → chüeler (söz başı k → ch).",
      },
      {
        kind: "build",
        tr: "Bu yüzden her yeni sokakta ağaç dikilmesini öneriyorum.",
        answer: "Drum schlaa ich vor, dass me i jedere nöie Strass Bäum pflanzt.",
        hint: "vorschlagen ayrılabilir: ich schlaa … vor. deshalb → drum.",
      },
      {
        kind: "free",
        prompt:
          "Gazeteye kısa bir okur mektubu yaz: şehirde daha fazla ağaç konusunda görüşünü belirt. Dört noktaya değin: hangi yazıya cevap verdiğin, görüşün, en az iki gerekçe, somut bir öneri.",
        checklist: [
          "Hangi yazıya/konuya cevap verdiğini yazdın mı?",
          "Görüşünü açıkça belirttin mi?",
          "En az iki gerekçe verdin mi?",
          "Somut bir öneri yaptın mı?",
          "İsim ve semtle bitirdin mi? (okur mektuplarında âdet)",
        ],
        minWords: 60,
        phrases: [
          { de: "Zu Ihrem Artikel vom …", tr: "…tarihli yazınıza dair" },
          { de: "Ich bi ganz iiverstande, dass …", tr: "…konusunda tamamen hemfikirim." },
          { de: "Zerscht: … Zwäitens: …", tr: "Birincisi: … İkincisi: …" },
          { de: "Es cha doch nöd sii, dass …", tr: "Olacak şey değil ki …" },
          { de: "Drum schlaa ich vor, dass …", tr: "Bu yüzden … öneriyorum." },
        ],
        sample:
          "Zu Ihrem Artikel vom letschte Samschtig über d Hitz i de Stadt:\n\nIch bi ganz iiverstande, dass mir es Problem händ — aber d Lösig isch günschtiger, als vill mäined. Mir bruuched äifach meh Bäum.\n\nZerscht: Im Summer isch s im Schatte füf bis siebe Grad chüeler. Wär im Chreis 4 wohnt und käi Balkon hät, gspürt de Unterschid sofort. Zwäitens: Bäum schlucked Wasser. Bi eme starche Gwitter lauft weniger uf d Strass, und d Kanalisation haltet besser.\n\nEs cha doch nöd sii, dass mir bi jedem Umbau zerscht Bäum fälled und denn über d Hitz klaged.\n\nDrum schlaa ich vor, dass me i jedere nöie Strass Bäum pflanzt und für jede gfällt Baum zwäi nöii setzt.\n\nAndrea Bühler, Züri-Wiedike",
      },
    ],
  },
  {
    id: "zh-b1-w4",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "Min erschte Monet z Züri",
    genre: "Anlatı",
    intro:
      "Zürih'teki ilk ayını anlatan kişisel bir metin yazacaksın: olaylar, duygular ve bir sonuç.",
    gloss: [
      { de: "de Aafang", tr: "başlangıç" },
      { de: "sich gwöhne", tr: "alışmak" },
      { de: "ungwont", tr: "alışılmadık" },
      { de: "s Hämmli", tr: "burukluk, ev özlemi (Heimweh → s Häimweh)" },
      { de: "uffalle", tr: "dikkat çekmek, göze çarpmak" },
      { de: "schtuune", tr: "şaşırmak" },
      { de: "sich iiläbe", tr: "yerleşmek, alışmak" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "İlk başta her şey bana çok pahalı geldi.",
        answer: "Am Aafang isch mer alles sehr tüür vorcho.",
        hint: "vorkommen → vorcho: es chunt mer … vor. Perfekt: isch … vorcho.",
      },
      {
        kind: "build",
        tr: "İnsanların ne kadar dakik olması dikkatimi çekti.",
        answer: "Es isch mer uufgfalle, wie pünktlich d Lüüt sind.",
        hint: "auffallen ayrılabilir; Perfekt: isch mer uufgfalle.",
      },
      {
        kind: "build",
        tr: "Bugün burada kendimi çok daha rahat hissediyorum.",
        answer: "Hüt fühl ich mi da vill wooler.",
        alternatives: ["Hüt fühl ich mi da vill besser."],
        hint: "wohl → wool, karşılaştırma: wooler.",
      },
      {
        kind: "free",
        prompt:
          "Zürih'teki (ya da yaşadığın şehirdeki) ilk ayını anlat. Dört noktaya değin: geliş ve ilk izlenim, en zor gelen şey, seni şaşırtan bir şey, bugün nasıl hissettiğin.",
        checklist: [
          "Geçmişi Perfekt ile anlattın mı?",
          "En az bir zorluk ve bir olumlu sürpriz yazdın mı?",
          "Duyguları da yazdın mı, sadece olayları değil?",
          "Bugünle biten bir sonuç cümlen var mı?",
        ],
        minWords: 70,
        phrases: [
          { de: "Am Aafang isch alles … gsii.", tr: "Başlangıçta her şey … idi." },
          { de: "Am schwiirigschte isch … gsii.", tr: "En zoru … idi." },
          { de: "Es isch mer uufgfalle, dass …", tr: "… olduğu dikkatimi çekti." },
          { de: "Ich han gschtuunet, wie …", tr: "Ne kadar … olduğuna şaşırdım." },
          { de: "Underdesse han ich mi iiglebt.", tr: "Bu arada alıştım." },
        ],
        sample:
          "Ich bi im Auguscht z Züri aacho, mit zwäi Koffere und käim einzige Bekannte. Am Aafang isch mer alles sehr tüür vorcho — de erscht Iichauf im Coop han ich fascht nöd glaubt.\n\nAm schwiirigschte isch d Sprach gsii. Ich han Hochdüütsch glernt, aber i de Migros händ d Lüüt Mundart gredt, und ich han nume Bahnhof verstande. Zwäi Wuche lang han ich am Aabig Häimweh gha.\n\nDenn isch mer öppis uufgfalle: Wänn ich gfrögt han, händ alli gärn ghulfe — nume vo sich uus säit niemert öppis. Und ich han gschtuunet, wie pünktlich s Tram chunt. Uf d Sekunde.\n\nUnderdesse han ich mi iiglebt. Ich kenne mini Nochbere, ich verstaan im Gschäft s mäischte, und hüt fühl ich mi da vill wooler als am Aafang.",
      },
    ],
  },
];
