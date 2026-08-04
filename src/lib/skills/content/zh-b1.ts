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

  // ── Hikâye dizisi: Yusuf daireden çıkıyor. B1'in yeni alıştırmalarında
  //    fesih → teslim → tutanak → depozito sırası izlenir.
  {
    id: "zh-b1-r7",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "S Kündigungsschriibe",
    genre: "Resmî yazı",
    intro:
      "Yusuf dairesinden çıkıyor. Fesih mektubu ve yönetimin cevabı — İsviçre kira hukukunun en pratik köşesi.",
    gloss: [
      { de: "kündige", tr: "sözleşmeyi feshetmek" },
      { de: "de Kündigungstermin", tr: "fesih tarihi" },
      { de: "d Frischt", tr: "süre" },
      { de: "iigschriibe", tr: "iadeli taahhütlü" },
      { de: "de Nachmieter", tr: "devralacak kiracı" },
      { de: "zumuetbar", tr: "kabul edilebilir" },
      { de: "vorziitig", tr: "erken, vadesinden önce" },
      { de: "hafte", tr: "sorumlu olmak" },
    ],
    minutes: 6,
    text:
      "SCHRIIBE VOM YUSUF — 20. Mai\n\nSehr geehrti Frau Bächtold\n\nHiermit kündige ich d 3-Zimmer-Wonig a de Bertastrass 9, 2. Schtock, uf de nächschtmögliche Termin, also uf de 30. Septämber.\n\nIch würd aber gärn scho im Juli uszüge. Wänn ich Ine Nachmieter vorschlaa, wo zumuetbar sind, würd ich gärn vorziitig us em Vertrag.\n\nFründlichi Grüess\nYusuf Demir\n\n\nANTWORT — 26. Mai\n\nGuete Tag Herr Demir\n\nMir bestätiged Ihri Kündigung uf de 30. Septämber. Bitte beachted Si: Kündigunge müend iigschriibe verschickt wärde — mir akzeptiered Ihres Mail als Vorabinformation, s Original erwarted mir bis am 31. Mai.\n\nZum vorziitige Uszug: Si chönd üs Nachmieter vorschlaa. Zumuetbar häisst, dass si zaalungsfähig sind und de Vertrag zu de gliiche Konditione übernämed. Mir prüefed jede Vorschlag innerhalb vo zää Täg.\n\nWichtig: Bis en zumuetbare Nachmieter da isch, haftet Si für d Miete. Es git kä automatischi Befreiig, nur will Si früener uszüged.\n\nFründlichi Grüess\nR. Bächtold",
    questions: [
      {
        text: "Uf wänn hät de Yusuf kündet?",
        options: ["Uf de 30. Septämber", "Uf de 31. Mai", "Uf de Juli"],
        answer: 0,
        explain: "Bir sonraki mümkün fesih tarihi 30 Eylül.",
      },
      {
        text: "Was fählt a sinere Kündigung?",
        options: [
          "S Original per iigschriibene Brief",
          "D Unterschrift",
          "S Datum",
        ],
        answer: 0,
        explain: "E-posta yalnızca ön bilgi sayılıyor; asıl belge 31 Mayıs'a kadar bekleniyor.",
      },
      {
        text: "Was häisst „zumuetbar“ bi de Nachmieter?",
        options: [
          "Zaalungsfähig und bereit, di gliiche Konditione z übernää",
          "Sympathisch und ruhig",
          "Us em gliiche Quartier",
        ],
        answer: 0,
        explain: "Yönetim iki ölçüt veriyor.",
      },
      {
        text: "Wie lang prüeft d Verwaltig en Vorschlag?",
        options: ["Innerhalb vo zää Täg", "Innerhalb vo eme Monet", "Es isch nöd gsäit"],
        answer: 0,
        explain: "„Mir prüefed jede Vorschlag innerhalb vo zää Täg.“",
      },
      {
        text: "Was passiert, bis en Nachmieter gfunde isch?",
        options: [
          "De Yusuf haftet wiiter für d Miete",
          "D Miete wird halbiert",
          "De Vertrag ändet automatisch",
        ],
        answer: 0,
        explain: "„Es git kä automatischi Befreiig, nur will Si früener uszüged.“",
      },
    ],
  },
  {
    id: "zh-b1-r8",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "D Wonigsabgab",
    genre: "Rehber",
    intro:
      "İsviçre'de daireyi teslim etmek bir tören gibidir: liste, kontrol, tutanak. Ne kontrol edildiğini anlatan rehber.",
    gloss: [
      { de: "d Abgab", tr: "teslim" },
      { de: "s Protokoll", tr: "tutanak" },
      { de: "de Mangel", tr: "kusur, hasar" },
      { de: "d Abnutzig", tr: "normal yıpranma" },
      { de: "d Läbensduur", tr: "kullanım ömrü" },
      { de: "hafte für", tr: "…den sorumlu olmak" },
      { de: "d Endreinigung", tr: "son temizlik" },
      { de: "de Abzug", tr: "kesinti" },
    ],
    minutes: 7,
    text:
      "Bi de Abgab lauft d Verwaltig mit ere Lischte dur d Wonig und schriibt es Protokoll. Was drin staat, entschäidet, wie vill vo de Kaution zruggchunt.\n\nDe wichtigscht Underschid isch: normali Abnutzig gäge Schade. Für normali Abnutzig haftet me nöd. E Wand, wo nach acht Jaar nöd meh wiiss isch, isch normal. Es Loch i de Wand isch es nöd.\n\nDezue git s d Läbensduurtabälle. Jedes Täil hät e erwarteti Läbensduur: Teppich zää Jaar, Farbe a de Wand ächt Jaar, Chuchiabdeckig zwänzg. Wär nach sibe Jaar en Teppich beschädigt, zaalt nöd de ganz Teppich, sondern nur s letschte Jaar — also en Zäänteil.\n\nD Endreinigung mues «bsenraini» sii. Was das genau häisst, staat mängisch im Vertrag: Bode gwüsche, Chuchi und Bad putzt, Backofe suuber, Fänschter gputzt, Silikonfugen ohni Schimmel.\n\nVill Lüüt nämed e Putzfirma mit Abnaamegarantie. Die choschtet öppe 600 bis 900 Franke für e 3-Zimmer-Wonig — und die Firma chunt nomal, wänn d Verwaltig öppis reklamiert. Ohni Garantie isch s billiger, aber s Risiko lit bi eu.\n\nUnterschriibed Si s Protokoll nur, wänn Si iiverstande sind. Si dörfed „mit Vorbehalt“ dezueschriibe — das schadet nöd und ghaltet Ihri Rächt offe.",
    questions: [
      {
        text: "Was entschäidet über d Kaution?",
        options: [
          "Was im Protokoll staat",
          "Wie lang me gwohnt hät",
          "Wie höch d Miete gsii isch",
        ],
        answer: 0,
        explain: "Yönetim listeyle geziyor ve tutanağa yazıyor.",
      },
      {
        text: "Welles Biispil isch normali Abnutzig?",
        options: [
          "E Wand, wo nach acht Jaar nöd meh wiiss isch",
          "Es Loch i de Wand",
          "En brochne Fänschtergriff",
        ],
        answer: 0,
        explain: "Normal yıpranmadan sorumlu olunmuyor.",
      },
      {
        text: "Wie vill zaalt me für en Teppich, wo nach sibe Jaar kaputt gaat?",
        options: [
          "Öppe en Zäänteil",
          "De ganz Priis",
          "D Hälfti",
        ],
        answer: 0,
        explain: "Halı ömrü on yıl; kalan bir yıl hesaplanıyor.",
      },
      {
        text: "Was isch de Vortäil vo ere Abnaamegarantie?",
        options: [
          "D Firma chunt nomal, wänn d Verwaltig reklamiert",
          "Si isch günschtiger",
          "Me mues s Protokoll nöd unterschriibe",
        ],
        answer: 0,
        explain: "600–900 frank; garantisiz seçenek ucuz ama risk kiracıda.",
      },
      {
        text: "Was cha me tue, wänn me mit em Protokoll nöd iiverstande isch?",
        options: [
          "„Mit Vorbehalt“ dezueschriibe",
          "Nöd unterschriibe und gaa",
          "S Protokoll spöter ändere",
        ],
        answer: 0,
        explain: "Bu, hakları açık tutuyor ve zarar vermiyor.",
      },
    ],
  },
  {
    id: "zh-b1-r9",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Es Land, vier Sprooche",
    genre: "Kültür",
    intro:
      "İsviçre'nin dört resmî dili var — ama günlük hayatta bu nasıl işliyor? „Röstigraben“ ne demek?",
    gloss: [
      { de: "d Amtssprooch", tr: "resmî dil" },
      { de: "de Röstigrabe", tr: "Almanca-Fransızca kültürel sınır" },
      { de: "s Rätoromanisch", tr: "Romanşça" },
      { de: "d Minderheit", tr: "azınlık" },
      { de: "s Territorialprinzip", tr: "bölgesellik ilkesi" },
      { de: "d Abstimmig", tr: "referandum" },
      { de: "übersetze", tr: "çevirmek" },
      { de: "s Verständnis", tr: "anlayış" },
    ],
    minutes: 6,
    text:
      "D Schwiiz hät vier Amtssprooche: Tüütsch, Französisch, Italienisch und Rätoromanisch. Öppe 62 Prozänt reded Tüütsch, 23 Französisch, 8 Italienisch — und weniger als äi Prozänt Rätoromanisch.\n\nWichtig isch s Territorialprinzip: Nöd d Person hät e Sprooch, sondern de Ort. Wär vo Züri uf Losanne zieht, chunt in e französischi Gmeind — d Schuel, s Amt und d Strassenäme wächsled, nöd d Lüüt.\n\nDe Uusdruck «Röstigrabe» beschriibt di kulturelli Gränze zwüsche de tüütsch- und französischsprachige Schwiiz. Er chunt vom Rösti, wo im Oschte gässe wird. Sichtbar wird er bi Abstimmige: D Welschschwiiz stimmt hüüfiger für meh Staat und für Europa, di Tüütschschwiiz zruckhaltender. Bi öppe jedere zwänzgschte Vorlag entschäided di zwei Landestäil verschiide.\n\nIm Alltag isch d Mehrsprachigkäit weniger romantisch, als me dänkt. Vill Tüütschschwiizer reded besser Änglisch als Französisch, und umgekehrt. A Sitzige mit gmischte Team wird drum hüüfig Änglisch gredt — was offiziell niemert gärn zuegit.\n\nS Rätoromanisch isch de schwierigscht Fall. Es hät fünf Idiome und öppe 40'000 Schprächer. Ohni staatlichi Unterstützig wär s wahrschiinlich scho verschwunde. Genau das isch aber au s Argumänt für d Unterstützig: E Sprooch mit 40'000 Lüüt cha sich nöd sälber trage.",
    questions: [
      {
        text: "Was säit s Territorialprinzip?",
        options: [
          "D Sprooch ghört zum Ort, nöd zur Person",
          "Jede darf sini Sprooch bruuche",
          "Alli Sprooche sind gliich verbreitet",
        ],
        answer: 0,
        explain: "Lozan'a taşınan kişi Fransızca bir belediyeye girer.",
      },
      {
        text: "Wohär chunt de Uusdruck „Röstigrabe“?",
        options: [
          "Vom Rösti, wo im Oschte gässe wird",
          "Vo eme Fluss",
          "Vo eme Politiker",
        ],
        answer: 0,
        explain: "Kültürel sınırı anlatan yemek metaforu.",
      },
      {
        text: "Wie hüüfig entschäided di zwei Landestäil verschiide?",
        options: [
          "Öppe bi jedere zwänzgschte Vorlag",
          "Bi jedere Vorlag",
          "Fascht nie",
        ],
        answer: 0,
        explain: "Metin bu oranı veriyor.",
      },
      {
        text: "Was passiert a Sitzige mit gmischte Team?",
        options: [
          "Es wird hüüfig Änglisch gredt",
          "Jede redt sini Sprooch",
          "Es wird übersetzt",
        ],
        answer: 0,
        explain: "„was offiziell niemert gärn zuegit.“",
      },
      {
        text: "Welles Argumänt nennt de Text für d Unterstützig vom Rätoromanisch?",
        options: [
          "E Sprooch mit 40'000 Lüüt cha sich nöd sälber trage",
          "Es isch di elteschti Sprooch",
          "Es bringt Tourischte",
        ],
        answer: 0,
        explain: "Zayıflığın kendisi destek gerekçesi hâline geliyor.",
      },
    ],
  },
  {
    id: "zh-b1-r10",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "Überschrifte zueordne",
    genre: "Sınav formatı",
    intro:
      "Beş kısa haber, altı başlık — biri fazla. Sınavın klasik eşleştirme görevi.",
    gloss: [
      { de: "d Überschrift", tr: "başlık" },
      { de: "zueordne", tr: "eşleştirmek" },
      { de: "d Spänd", tr: "bağış" },
      { de: "d Sanierig", tr: "yenileme" },
      { de: "sinke", tr: "düşmek" },
      { de: "de Aatrag", tr: "başvuru" },
      { de: "d Frischt", tr: "süre" },
    ],
    minutes: 5,
    text:
      "TEXT 1: Ab Septämber fahrt s Tram Nummere 8 au am Wuchenänd alli zää Minute. D Stadt reagiert damit uf vill Reklamatione us de Ussequartier.\n\nTEXT 2: Nach drüü Jaar isch d Sanierig vom Schuelhuus Nord fertig. D Klasse zügled i de Ferie zrugg, de Underricht fangt wie planet aa.\n\nTEXT 3: D Zaal vo de Velodiebstähl isch im letschte Jaar um achtzää Prozänt gsunke. D Polizei erklärt das mit de nöie Veloparkplätz am Bahnhof.\n\nTEXT 4: Am Quartierfäscht sind 12'400 Franke zämecho. S Gäld gaat as Fraueshuus, wo siit Jaare z wenig Platz hät.\n\nTEXT 5: Wär Hilf bim Heize bruucht, cha bis Ändi Oktober en Aatrag stelle. Formular git s online und im Chräiszbüro.\n\nÜBERSCHRIFTE:\na) Weniger Velo gschtole\nb) Meh Tram am Wuchenänd\nc) Schuelhuus wider offe\nd) Fescht bringt Gäld für en guete Zwäck\ne) Nöii Bauschtell am Bahnhof\nf) Underschtützig beaatrage — d Frischt lauft",
    questions: [
      {
        text: "Welli Überschrift passt zu Text 1?",
        options: ["b", "e", "c"],
        answer: 0,
        explain: "Hafta sonu on dakikada bir — daha sık sefer.",
      },
      {
        text: "Welli Überschrift passt zu Text 3?",
        options: ["a", "e", "f"],
        answer: 0,
        explain: "Bisiklet hırsızlığı %18 azalmış.",
      },
      {
        text: "Welli Überschrift passt zu Text 4?",
        options: ["d", "f", "b"],
        answer: 0,
        explain: "Şenlikte toplanan para kadın sığınmaevine gidiyor.",
      },
      {
        text: "Welli Überschrift passt zu Text 5?",
        options: ["f", "d", "a"],
        answer: 0,
        explain: "Süre vurgusu var: ekim sonuna kadar.",
      },
      {
        text: "Welli Überschrift bliibt übrig?",
        options: ["e", "c", "b"],
        answer: 0,
        explain: "Üçüncü metinde gardan söz ediliyor ama şantiye yok.",
      },
    ],
  },
  {
    id: "zh-b1-r11",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "S Protokoll vo de Abgab",
    genre: "Tutanak",
    intro:
      "Hikâyenin devamı: teslim yapıldı. Tutanağı ve Yusuf'un eklediği notu okuyacaksın.",
    gloss: [
      { de: "de Mangel", tr: "kusur" },
      { de: "de Chratzer", tr: "çizik" },
      { de: "de Schimmel", tr: "küf" },
      { de: "d Silikonfuge", tr: "silikon derz" },
      { de: "zulaschte vo", tr: "…in hesabına" },
      { de: "de Vorbehalt", tr: "ihtirazi kayıt" },
      { de: "d Bestätigung", tr: "onay" },
      { de: "de Ersatz", tr: "yenisiyle değiştirme" },
    ],
    minutes: 6,
    text:
      "ABGABEPROTOKOLL — Bertastrass 9, 2. Schtock — 28. Juli\n\nAawesend: R. Bächtold (Verwaltig), Y. Demir (Mieter)\n\nChuchi: i Ornig. Backofe suuber.\nBad: Silikonfuge bi de Dusche mit Schimmel → Ersatz, zulaschte vom Mieter: 180 Fr.\nZimmer 1: Chratzer im Parkett, öppe 30 cm, nöd im Iizugsprotokoll → zulaschte vom Mieter: 450 Fr.\nZimmer 2: i Ornig.\nWohnzimmer: Wand mit zwäi Löcher (Regal) → gspachtlet, in Ornig.\nFänschter: gputzt.\nTeppich Gang: stark abgnutzt, Alter 9 Jaar → normali Abnutzig, käi Abzug.\n\nTotal zulaschte vom Mieter: 630 Fr.\nKaution: 5'280 Fr. Uszaalig nach Abzug: 4'650 Fr.\n\nBEMERKIG VOM MIETER (mit Vorbehalt unterschriibe):\nDe Chratzer im Parkett isch bim Iizug scho da gsii. Im Iizugsprotokoll staat er nöd, das schtimmt — ich han damals nüüt bemerkt. Ich han aber es Foti vom Iizugstag, wo me d Stell gseet. Ich schick s bis am 4. Auguscht und bitte um e neui Prüefig vo dem Punkt. Mit em Rest bin ich iiverstande.\n\nY. Demir",
    questions: [
      {
        text: "Was chunt zulaschte vom Mieter?",
        options: [
          "D Silikonfuge und de Chratzer im Parkett",
          "Au de Teppich",
          "Nur d Silikonfuge",
        ],
        answer: 0,
        explain: "180 + 450 = 630 frank.",
      },
      {
        text: "Warum git s für de Teppich käin Abzug?",
        options: [
          "Nüün Jaar gilt als normali Abnutzig",
          "Er isch nöd im Protokoll",
          "De Mieter hät en ersetzt",
        ],
        answer: 0,
        explain: "Halının beklenen ömrü on yıl.",
      },
      {
        text: "Was isch mit de Löcher i de Wand?",
        options: [
          "Si sind gspachtlet und in Ornig",
          "Si choschted 180 Franke",
          "Si sind im Vorbehalt",
        ],
        answer: 0,
        explain: "Sıvanmış, itiraz konusu değil.",
      },
      {
        text: "Wie argumentiert de Yusuf bim Chratzer?",
        options: [
          "Er hät es Foti vom Iizugstag",
          "De Chratzer isch z chlii",
          "S Parkett isch alt",
        ],
        answer: 0,
        explain: "Giriş tutanağında yok — bunu kabul ediyor ama fotoğrafı var.",
      },
      {
        text: "Wie stellt er sich zum Rest vom Protokoll?",
        options: [
          "Er isch iiverstande",
          "Er lehnt alles ab",
          "Er wott e neui Abgab",
        ],
        answer: 0,
        explain: "„Mit em Rest bin ich iiverstande.“ — itirazı tek bir noktada.",
      },
    ],
  },
  {
    id: "zh-b1-r12",
    course: "gsw-zh",
    level: "B1",
    skill: "reading",
    title: "D Stüürerklärig",
    genre: "Rehber",
    intro:
      "İsviçre'de vergi beyannamesi kendin doldurulur — ve çoğu kişi hakkı olan indirimleri bilmez.",
    gloss: [
      { de: "d Stüürerklärig", tr: "vergi beyannamesi" },
      { de: "de Abzug", tr: "indirim" },
      { de: "d Quellestüür", tr: "kaynakta kesilen vergi" },
      { de: "s Vermöge", tr: "servet" },
      { de: "d Frischt verlängere", tr: "süre uzatmak" },
      { de: "d Beleg", tr: "belge" },
      { de: "provisorisch", tr: "geçici" },
      { de: "nachzaale", tr: "ek ödeme yapmak" },
    ],
    minutes: 7,
    text:
      "D Stüüre wärded i de Schwiiz uf drei Ebene zaalt: Bund, Kanton und Gmeind. Wie vill me zaalt, hänkt drum stark devo ab, wo me wohnt — zwüsche zwo Nachbargmeinde chan de Underschid zwänzg Prozänt betrage.\n\nWär e Uufenthaltsbewilligung B hät, zaalt mäistens Quellestüür: De Arbetgeber zieht d Stüür direkt vom Loon ab. Vill dänked, denn seiged si fertig. Das stimmt nöd immer: Ab eme gwüsse Iikomme (im Kanton Züri 120'000 Franke) mues me trotzdem e Stüürerklärig mache — und wär Abzüg gältend mache wott, cha das freiwillig verlange.\n\nDenn nämli chunt de wichtig Täil: d Abzüg. Hüüfig vergässe wärded Fahrchoschte zur Arbet, Uuswärtsverpflegig, Wiiterbildige, Chinderbetreuig, Spändä und Chrankechoschte über eme Sälbstbehalt. Au d Prämie vo de Chrankekasse cha me abzüge — bis zu eme Maximum.\n\nWichtig für alli: D Frischt isch mäistens de 31. März. Me cha si aber ganz äifach verlängere, online und ohni Begründig, mäistens bis im Septämber. Das choschtet nüüt und isch nöd verdächtig.\n\nWär öppis nöd sicher weiss, schriibt es dezue statt es wägzloo. E falschi Zaal wird korrigiert; e verschwiegeni Iinaam isch es Problem.",
    questions: [
      {
        text: "Wovo hänkt d Stüürhöchi stark ab?",
        options: [
          "Wo me wohnt",
          "Wie alt me isch",
          "Wie lang me scho da isch",
        ],
        answer: 0,
        explain: "Komşu iki belediye arasında %20 fark olabiliyor.",
      },
      {
        text: "Was gilt bi de Quellestüür?",
        options: [
          "De Arbetgeber zieht si direkt vom Loon ab",
          "Me zaalt si am Jaresändi",
          "Si gilt nur für Schwiizer",
        ],
        answer: 0,
        explain: "Bu yüzden çoğu kişi iş bitti sanıyor.",
      },
      {
        text: "Ab welem Iikomme mues me im Kanton Züri e Erklärig mache?",
        options: ["Ab 120'000 Franke", "Ab 80'000 Franke", "Immer"],
        answer: 0,
        explain: "Ayrıca indirim talep etmek isteyen gönüllü olarak isteyebiliyor.",
      },
      {
        text: "Welle Abzug wird laut Text hüüfig vergässe?",
        options: [
          "Fahrchoschte und Wiiterbildige",
          "D Miete",
          "S Ässe dihäi",
        ],
        answer: 0,
        explain: "Ayrıca çocuk bakımı, bağış ve sağlık masrafları.",
      },
      {
        text: "Was säit de Text über d Frischt?",
        options: [
          "Me cha si online ohni Begründig verlängere",
          "Si isch fescht und nöd verhandelbar",
          "Verlängerig choschtet 50 Franke",
        ],
        answer: 0,
        explain: "„Das choschtet nüüt und isch nöd verdächtig.“",
      },
      {
        text: "Was ratet de Text bi Unsicherheit?",
        options: [
          "Es dezueschriibe statt wägzloo",
          "Es wägloo",
          "En Trüehänder nää",
        ],
        answer: 0,
        explain: "Yanlış rakam düzeltilir; gizlenen gelir sorun olur.",
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
    id: "zh-b1-l7",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Mit de Putzfirma verhandle",
    genre: "Telefon",
    intro:
      "Hikâyenin devamı: Yusuf teslim temizliği için teklif alıyor. Garantinin ne anlama geldiğine dikkat et.",
    gloss: [
      { de: "d Endreinigung", tr: "teslim temizliği" },
      { de: "d Abnaamegarantie", tr: "teslim garantisi" },
      { de: "d Offerte", tr: "teklif" },
      { de: "de Quadratmeter", tr: "metrekare" },
      { de: "de Zueschlag", tr: "ek ücret" },
      { de: "d Nachbesserig", tr: "düzeltme" },
      { de: "verbindlich", tr: "bağlayıcı" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Firma", text: "Reinigung Sauber, grüezi." },
      {
        speaker: "Yusuf",
        text: "Grüezi. Ich bruuch e Endreinigung für e 3-Zimmer-Wonig, 78 Quadratmeter, Abgab am 28. Juli.",
      },
      { speaker: "Firma", text: "Mit oder ohni Abnaamegarantie?" },
      { speaker: "Yusuf", text: "Was isch de Underschid genau?" },
      {
        speaker: "Firma",
        text: "Mit Garantie chömed mir nomal, wänn d Verwaltig öppis reklamiert — so oft, bis si abnimmt. Ohni Garantie putzed mir äimal; wänn d Verwaltig denn öppis findet, isch das Ihres Problem.",
      },
      { speaker: "Yusuf", text: "Und de Priis?" },
      {
        speaker: "Firma",
        text: "Ohni Garantie 640 Franke, mit Garantie 820. Fänschter sind bi bäidem drin, de Backofe au.",
      },
      { speaker: "Yusuf", text: "Und wänn s Silikon Schimmel hät?" },
      {
        speaker: "Firma",
        text: "Putze chömer s, ersetze nöd. Neus Silikon isch en Zueschlag vo 150 pro Bad — das mached aber d Verwaltige mängisch sälber und ziehnd s ab.",
      },
      { speaker: "Yusuf", text: "Denn nimm ich mit Garantie. Und s Silikon lass ich uf mich zuecho." },
      {
        speaker: "Firma",
        text: "Vernünftig. Ich schick Ine d Offerte schriftlich — die isch verbindlich, wänn Si bis am Friitig bestätiged.",
      },
    ],
    questions: [
      {
        text: "Was bedüütet d Abnaamegarantie?",
        options: [
          "D Firma chunt nomal, bis d Verwaltig abnimmt",
          "Me zaalt erscht nach de Abgab",
          "D Firma haftet für Schade",
        ],
        answer: 0,
        explain: "Garantisiz seçenekte tek seferlik temizlik yapılıyor.",
      },
      {
        text: "Wie gross isch de Priisunderschid?",
        options: ["180 Franke", "150 Franke", "640 Franke"],
        answer: 0,
        explain: "820 − 640 = 180.",
      },
      {
        text: "Was isch bi bäidne Aagebot inbegriffe?",
        options: ["Fänschter und Backofe", "S Silikon", "D Nachbesserig"],
        answer: 0,
        explain: "„Fänschter sind bi bäidem drin, de Backofe au.“",
      },
      {
        text: "Was macht d Firma mit em Schimmel im Silikon?",
        options: [
          "Nur putze, nöd ersetze",
          "Ersetze für 150 Franke",
          "Gar nüüt",
        ],
        answer: 0,
        explain: "Değişim ek ücret; yönetim çoğu zaman kendi yaptırıp kesiyor.",
      },
      {
        text: "Wänn isch d Offerte verbindlich?",
        options: [
          "Wänn er bis am Friitig bestätigt",
          "Sofort",
          "Nach de Abgab",
        ],
        answer: 0,
        explain: "Yazılı teklif cumaya kadar onaylanırsa bağlayıcı.",
      },
    ],
  },
  {
    id: "zh-b1-l8",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Bi de Schlichtigsbehörde",
    genre: "Danışma",
    intro:
      "Depozito anlaşmazlığında İsviçre'nin sessiz ama çok işlevli kurumu: uzlaştırma makamı. Ücretsizdir.",
    gloss: [
      { de: "d Schlichtigsbehörde", tr: "kira uzlaştırma makamı" },
      { de: "s Verfaare", tr: "usul, süreç" },
      { de: "koschtelos", tr: "ücretsiz" },
      { de: "d Iigab", tr: "başvuru" },
      { de: "d Verjährung", tr: "zamanaşımı" },
      { de: "d Einigung", tr: "uzlaşma" },
      { de: "d Fritig", tr: "süre" },
      { de: "s Bewiismittel", tr: "delil" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Beraterin", text: "Erzeeled Si churz — worum gaat s?" },
      {
        speaker: "Yusuf",
        text: "D Verwaltig ziet 450 Franke ab für en Chratzer im Parkett. De isch aber scho bim Iizug da gsii.",
      },
      { speaker: "Beraterin", text: "Staat er im Iizugsprotokoll?" },
      { speaker: "Yusuf", text: "Nei. Ich han damals nüüt bemerkt." },
      { speaker: "Beraterin", text: "Und was händ Si als Bewiis?" },
      {
        speaker: "Yusuf",
        text: "Es Foti vom Iizugstag. Me gseet d Stell, und s Datum isch im Bild gspeicheret.",
      },
      {
        speaker: "Beraterin",
        text: "Das isch besser als nüüt, aber nöd sicher. S Foti zäigt, dass en Chratzer da gsii isch — nöd unbedingt, dass es de gliich isch. Trotzdem: Mit eme Foti isch Ihri Poschtion deutlich stercher.",
      },
      { speaker: "Yusuf", text: "Was chan ich mache?" },
      {
        speaker: "Beraterin",
        text: "Schriibed Si zerscht de Verwaltig und setzed Si e Frischt vo zää Täg. Wänn si nöd iiglenkt, chömed Si zu üs — d Iigab isch koschtelos.",
      },
      { speaker: "Yusuf", text: "Und wie lang duuret das?" },
      {
        speaker: "Beraterin",
        text: "Bi eus im Schnitt zwäi bis drüü Mönet bis zur Verhandlig. Öppe siebzg Prozänt vo de Fäll ändet mit ere Einigung — mängisch scho, will me überhaupt schriibt.",
      },
      { speaker: "Yusuf", text: "Und wänn nöd?" },
      {
        speaker: "Beraterin",
        text: "Denn chönd Si vor Gricht. Für 450 Franke ratet ich Ine das nöd. Aber sowiit chunt s sälte.",
      },
    ],
    questions: [
      {
        text: "Worum gaat s bim Yusuf?",
        options: [
          "Um en Abzug vo 450 Franke für en Chratzer",
          "Um e Kündigung",
          "Um d Nebechoschte",
        ],
        answer: 0,
        explain: "Çiziğin girişte var olduğunu iddia ediyor.",
      },
      {
        text: "Wie bewertet d Beraterin s Foti?",
        options: [
          "Besser als nüüt, aber nöd sicher",
          "Als vollständige Bewiis",
          "Als wärtlos",
        ],
        answer: 0,
        explain: "Aynı çizik olduğunu kanıtlamıyor ama pozisyonu güçlendiriyor.",
      },
      {
        text: "Was söll er zerscht mache?",
        options: [
          "De Verwaltig schriibe und e Frischt setze",
          "Direkt zur Behörde",
          "Vor Gricht gaa",
        ],
        answer: 0,
        explain: "On günlük süre verilerek yazılıyor.",
      },
      {
        text: "Was choschtet d Iigab bi de Schlichtigsbehörde?",
        options: ["Nüüt", "450 Franke", "Es hänkt vom Fall ab"],
        answer: 0,
        explain: "„d Iigab isch koschtelos.“",
      },
      {
        text: "Wie hüüfig ändet s mit ere Einigung?",
        options: ["Öppe siebzg Prozänt", "Öppe zwänzg Prozänt", "Fascht nie"],
        answer: 0,
        explain: "Bazen sırf yazıldığı için çözülüyor.",
      },
    ],
  },
  {
    id: "zh-b1-l9",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Radio: Weniger Auto i de Stadt",
    genre: "Sınav formatı",
    intro:
      "Bir radyo haberi ve içerik soruları. Bir kez baştan sona dinlemeyi dene, sonra soruları çöz.",
    gloss: [
      { de: "de Versuech", tr: "pilot uygulama" },
      { de: "d Sperrig", tr: "kapatma" },
      { de: "de Umsatz", tr: "ciro" },
      { de: "befürchte", tr: "endişe etmek" },
      { de: "d Uuswertig", tr: "değerlendirme" },
      { de: "vorläufig", tr: "geçici" },
      { de: "d Verlängerig", tr: "uzatma" },
      { de: "d Lieferziit", tr: "teslimat saati" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Moderator",
        text: "Siit drüü Mönet isch d Chäsergass für Auto gsperrt — als Versuech. Nächschti Wuche entschäidet de Gmeinderaat, öb s so bliibt.",
      },
      {
        speaker: "Reporterin",
        text: "Am Aafang isch d Uufregig gross gsii. Vierzg Gschäft händ underschriibe, si händ weniger Chundschaft befürchtet. Hüt tönt s anders.",
      },
      {
        speaker: "Ladebsitzerin",
        text: "Ich bi degäge gsii, ganz klar. Ich han dänkt, ohni Parkplätz chunt niemert meh. Aber min Umsatz isch um siebe Prozänt gschtiige. D Lüüt bliibed äifach lenger.",
      },
      {
        speaker: "Reporterin",
        text: "Nöd alli sind zfriede. Wär schweri Ware verchauft — Möbel, Getränk —, klagt über d Lieferige.",
      },
      {
        speaker: "Händler",
        text: "Für mich isch s schlächter worde. Mini Chunde chaufed Chäschte, nöd Blueme. Die cha me nöd trage.",
      },
      {
        speaker: "Reporterin",
        text: "D vorläufigi Uuswertig vo de Stadt zäigt: De Umsatz im ganze Bereich isch um vier Prozänt gschtiige, d Zaal vo de Bsuecher um elf. Gliichziitig git s driissg Prozänt meh Reklamatione über de Lieferverchehr i de Näbestrasse.",
      },
      { speaker: "Moderator", text: "Und de Entschäid?" },
      {
        speaker: "Reporterin",
        text: "Wahrschiinlich e Verlängerig um es Jaar — mit feschte Lieferziite am Morge. E definitivi Sperrig wott im Momänt niemert beschliesse.",
      },
    ],
    questions: [
      {
        text: "Worum gaat s im Biitrag?",
        options: [
          "Um e Strasseperrig als Versuech",
          "Um nöii Parkhüüser",
          "Um höcheri Miete",
        ],
        answer: 0,
        explain: "Chäsergass üç aydır deneme olarak kapalı.",
      },
      {
        text: "Wie hät sich d Meinig vo de Ladebsitzerin gänderet?",
        options: [
          "Si isch degäge gsii, jetz hät si meh Umsatz",
          "Si isch immer defür gsii",
          "Si isch witer degäge",
        ],
        answer: 0,
        explain: "„min Umsatz isch um siebe Prozänt gschtiige.“",
      },
      {
        text: "Wär hät Probleem?",
        options: [
          "Händler mit schwere Ware",
          "Kafis und Reschtorant",
          "D Aawohner",
        ],
        answer: 0,
        explain: "Sandık taşınamıyor.",
      },
      {
        text: "Was zäigt d Uuswertig?",
        options: [
          "Meh Umsatz und Bsuecher, aber meh Reklamatione bim Lieferverchehr",
          "Weniger Umsatz insgesamt",
          "Käi Veränderig",
        ],
        answer: 0,
        explain: "+%4 ciro, +%11 ziyaretçi, +%30 şikâyet.",
      },
      {
        text: "Was wird wahrschiinlich beschlosse?",
        options: [
          "E Verlängerig um es Jaar mit feschte Lieferziite",
          "E definitivi Sperrig",
          "S Ändi vom Versuech",
        ],
        answer: 0,
        explain: "Kimse şimdilik kalıcı karar almak istemiyor.",
      },
    ],
  },
  {
    id: "zh-b1-l10",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Warum mir so vill abschtimmed",
    genre: "Podcast",
    intro:
      "Yılda dört kez oy pusulası. İsviçre'de yaşayan herkesin merak ettiği sistem, kısa bir sohbette.",
    gloss: [
      { de: "d Abstimmig", tr: "referandum" },
      { de: "d Initiative", tr: "halk girişimi" },
      { de: "s Referändum", tr: "yasaya karşı referandum" },
      { de: "d Unterschrift", tr: "imza" },
      { de: "d Stimmbetäiligung", tr: "katılım oranı" },
      { de: "s Couvert", tr: "zarf" },
      { de: "s Abstimmigsbüechli", tr: "resmî bilgi kitapçığı" },
      { de: "sich informiere", tr: "bilgi edinmek" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Host", text: "Vier Mal im Jaar chunt s Couvert. Warum eigentlich so oft?" },
      {
        speaker: "Politologin",
        text: "Well s zwäi Instrumänt git. Mit ere Initiative chan s Volch öppis Nöis verlange — dezue bruucht s 100'000 Unterschrifte. Mit em Referändum cha me es Gsetz vom Parlamänt stoppe — dezue bruucht s 50'000.",
      },
      { speaker: "Host", text: "Und wie vill Lüüt gönd würkli abschtimme?" },
      {
        speaker: "Politologin",
        text: "Im Schnitt öppe 45 Prozänt. Das tönt tüüf, isch aber irreführend: Über es ganzes Jaar gseh beteiliged sich viel meh Lüüt — nur nöd immer di gliiche. Jede wählt d Theme uus, wo en betreffed.",
      },
      { speaker: "Host", text: "Wie informiert me sich?" },
      {
        speaker: "Politologin",
        text: "Im Couvert isch s Abstimmigsbüechli. Dört staat d Vorlag, d Meinig vom Bundesrat und — das isch s Interessante — au d Meinig vom Komitee degäge, im Originalton.",
      },
      { speaker: "Host", text: "Also schriibt de Staat d Gägenargumänt sälber ab?" },
      {
        speaker: "Politologin",
        text: "Er druckt si. Er darf si nöd ändere. Das isch e Regle, wo vill Länder nöd händ.",
      },
      { speaker: "Host", text: "Und wänn me e Vorlag nöd verstaat?" },
      {
        speaker: "Politologin",
        text: "Denn cha me läär iileere — das isch legitim. Vill Lüüt schtimmed bewusst nur bi dem ab, wo si sich sicher fühled.",
      },
    ],
    questions: [
      {
        text: "Wie vill Unterschrifte bruucht e Initiative?",
        options: ["100'000", "50'000", "45'000"],
        answer: 0,
        explain: "Referandum için 50.000 yeterli.",
      },
      {
        text: "Was cha me mit em Referändum mache?",
        options: [
          "Es Gsetz vom Parlamänt stoppe",
          "Öppis Nöis verlange",
          "En Politiker abwähle",
        ],
        answer: 0,
        explain: "İki aracın farkı tam burada.",
      },
      {
        text: "Warum isch d Zaal vo 45 Prozänt irreführend?",
        options: [
          "Über s Jaar gseh beteiliged sich meh Lüüt, nur nöd immer di gliiche",
          "Si isch falsch gmässe",
          "Si gilt nur für d Stadt",
        ],
        answer: 0,
        explain: "Herkes kendini ilgilendiren konuyu seçiyor.",
      },
      {
        text: "Was isch bsunders am Abstimmigsbüechli?",
        options: [
          "D Gägenargumänt stönd im Originalton drin",
          "Es chunt nur uf Tüütsch",
          "Es isch freiwillig",
        ],
        answer: 0,
        explain: "Devlet karşı komitenin metnini basar ve değiştiremez.",
      },
      {
        text: "Was cha me mache, wänn me e Vorlag nöd verstaat?",
        options: [
          "Läär iileere — das isch legitim",
          "Nöd abschtimme dörfe",
          "Es Formular uusfülle",
        ],
        answer: 0,
        explain: "Birçok kişi yalnızca emin olduğu konuda oy veriyor.",
      },
    ],
  },
  {
    id: "zh-b1-l11",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "Es Gspröch über de Lärm",
    genre: "Diyalog",
    intro:
      "Komşuyla gürültü konuşmak — İsviçre'de doğrudan ama kırmadan yapılması gereken konuşma.",
    gloss: [
      { de: "de Lärm", tr: "gürültü" },
      { de: "d Ruhezyt", tr: "sessizlik saatleri" },
      { de: "sich beklage", tr: "şikâyet etmek" },
      { de: "d Rücksicht", tr: "saygı, dikkat" },
      { de: "aaschprääche", tr: "konuyu açmak" },
      { de: "d Verwaltig iischalte", tr: "yönetimi devreye sokmak" },
      { de: "s Verständnis", tr: "anlayış" },
      { de: "abmache", tr: "kararlaştırmak" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Britschgi", text: "Herr Demir, händ Si churz Ziit? Ich wett öppis aaschpräche." },
      { speaker: "Yusuf", text: "Sicher. Isch öppis?" },
      {
        speaker: "Frau Britschgi",
        text: "Am Sunntig am zäni am Aabig händ Si Musik gha. Ich mues am Määndig am füfi uf.",
      },
      {
        speaker: "Yusuf",
        text: "Das tuet mer läid. Ich han nöd dänkt, dass me s ghört — s isch nöd luut gsii.",
      },
      {
        speaker: "Frau Britschgi",
        text: "S Huus isch hellhörig. Ich ghöre s Bass, nöd d Musik. Und am Sunntig isch de ganz Tag Ruhezyt.",
      },
      { speaker: "Yusuf", text: "De ganz Tag? Das han ich würkli nöd gwüsst." },
      {
        speaker: "Frau Britschgi",
        text: "Staat i de Huusornig. Under de Wuche isch s ab zäni, am Sunntig immer.",
      },
      {
        speaker: "Yusuf",
        text: "Guet, ich pass uuf. Und wänn ich emal Bsuech han und s spöter wird — söll ich Ine Bschäid gää?",
      },
      {
        speaker: "Frau Britschgi",
        text: "Das wär mir am liebschte. Denn weiss ich, dass s äimalig isch. Ich bi nöd d Polizei, ich mues nur schlaafe.",
      },
      { speaker: "Yusuf", text: "Abgmacht. Und merci, dass Si direkt zu mir cho sind." },
      {
        speaker: "Frau Britschgi",
        text: "Ich gaa immer zerscht sälber. D Verwaltig iischalte cha me nachhär immer no.",
      },
    ],
    questions: [
      {
        text: "Was isch s Problem?",
        options: [
          "Musik am Sunntig am zäni am Aabig",
          "Es Fescht i de Nacht",
          "En kaputte Boden",
        ],
        answer: 0,
        explain: "Komşusu pazartesi beşte kalkıyor.",
      },
      {
        text: "Was ghört d Nachbarin genau?",
        options: ["S Bass, nöd d Musik", "D Stimme", "De Fernseh"],
        answer: 0,
        explain: "„S Huus isch hellhörig.“",
      },
      {
        text: "Wänn isch am Sunntig Ruhezyt?",
        options: ["De ganz Tag", "Ab zäni", "Ab achti"],
        answer: 0,
        explain: "Hafta içi saat 22'den itibaren, pazar tüm gün.",
      },
      {
        text: "Was schlaat de Yusuf vor?",
        options: [
          "Bschäid z gää, wänn s emal spöter wird",
          "Nie meh Musik z ghöre",
          "En Teppich z chaufe",
        ],
        answer: 0,
        explain: "Komşusu bunu tercih ediyor: tek seferlik olduğunu bilmek.",
      },
      {
        text: "Warum isch si zerscht direkt zu ihm cho?",
        options: [
          "Si gaat immer zerscht sälber — d Verwaltig cha me nachhär iischalte",
          "Si kennt d Verwaltig nöd",
          "Si hät Angscht vor eme Streit",
        ],
        answer: 0,
        explain: "„Ich bi nöd d Polizei, ich mues nur schlaafe.“",
      },
    ],
  },
  {
    id: "zh-b1-l12",
    course: "gsw-zh",
    level: "B1",
    skill: "listening",
    title: "D Kaution isch zrugg",
    genre: "Sesli mesaj",
    intro: "Hikâyenin sonu: Yusuf sonucu anlatıyor.",
    gloss: [
      { de: "d Kaution", tr: "depozito" },
      { de: "iiglenkt", tr: "geri adım atmış" },
      { de: "de Abzug", tr: "kesinti" },
      { de: "s Foti", tr: "fotoğraf" },
      { de: "sich luune", tr: "değmek, kârlı olmak" },
      { de: "d Antwort", tr: "cevap" },
      { de: "erledigt", tr: "hallolmuş" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Yusuf", text: "Du, es isch erledigt. D Kaution isch geschter cho." },
      {
        speaker: "Yusuf",
        text: "Ich han de Verwaltig gschriibe, mit em Foti im Aahang, und e Frischt vo zää Täg gsetzt. Ganz sachlich, käi Emotion.",
      },
      {
        speaker: "Yusuf",
        text: "Nach acht Täg isch d Antwort cho: Si strichet de Abzug für de Chratzer. Nöd will si zuegänd, dass er scho da gsii isch — si schriibed „im Sinne einer Kulanz“. Isch mir egal, wie si s nänned.",
      },
      {
        speaker: "Yusuf",
        text: "Also 180 statt 630. S Silikon zaal ich, das isch fair — de Schimmel isch vo mir cho.",
      },
      {
        speaker: "Yusuf",
        text: "Und weisch was s Verruckte isch? Zur Schlichtigsbehörde han ich gar nie müesse. Es hät greicht, dass ich gwüsst han, dass es si git.",
      },
      {
        speaker: "Yusuf",
        text: "Also: Fotiered eui Wonig am Iizugstag. Alli Zimmer, au wänn s blöd tönt. Das isch de bescht Rat, wo ich der cha gää.",
      },
    ],
    questions: [
      {
        text: "Wie hät de Yusuf gschriibe?",
        options: [
          "Sachlich, mit Foti und ere Frischt",
          "Mit Vorwürf",
          "Über en Aawalt",
        ],
        answer: 0,
        explain: "„Ganz sachlich, käi Emotion.“",
      },
      {
        text: "Wie hät d Verwaltig reagiert?",
        options: [
          "Si hät de Abzug gstriche, ohni de Fähler zuezgää",
          "Si hät alles bezaalt",
          "Si hät nöd gantwortet",
        ],
        answer: 0,
        explain: "„im Sinne einer Kulanz“ — jest olarak sunuyorlar.",
      },
      {
        text: "Wie vill wird jetz abzoge?",
        options: ["180 Franke", "630 Franke", "450 Franke"],
        answer: 0,
        explain: "Sadece silikon kalıyor — küf ondan kaynaklanmış.",
      },
      {
        text: "Isch er zur Schlichtigsbehörde?",
        options: [
          "Nei — es hät greicht, dass er gwüsst hät, dass es si git",
          "Ja, mit Erfolg",
          "Ja, aber ohni Erfolg",
        ],
        answer: 0,
        explain: "Kurumun varlığını bilmek yetmiş.",
      },
      {
        text: "Welle Rat git er am Schluss?",
        options: [
          "D Wonig am Iizugstag fotiere",
          "Immer e Putzfirma nää",
          "S Protokoll nöd unterschriibe",
        ],
        answer: 0,
        explain: "„Alli Zimmer, au wänn s blöd tönt.“",
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
  {
    id: "zh-b1-w5",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "D Kündigung schriibe",
    genre: "Resmî yazı",
    intro:
      "Kira sözleşmesini feshetmek: kısa, tarihli ve biçime uygun olmalı — yoksa geçersiz sayılır.",
    gloss: [
      { de: "kündige", tr: "feshetmek" },
      { de: "de Kündigungstermin", tr: "fesih tarihi" },
      { de: "iigschriibe", tr: "iadeli taahhütlü" },
      { de: "de Nachmieter", tr: "devralacak kiracı" },
      { de: "d Bestätigung", tr: "onay" },
      { de: "d Abgab", tr: "teslim" },
      { de: "vorziitig", tr: "erken" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Daireyi bir sonraki mümkün tarihe feshediyorum.",
        answer: "Ich kündige d Wonig uf de nächschtmöglich Termin.",
        hint: "kündigen → kündige; auf → uf + Akkusativ tarih.",
      },
      {
        kind: "build",
        tr: "Bunun onayını rica ediyorum.",
        answer: "Ich bitte Si um e Bestätigung.",
        hint: "bitten um + Akkusativ; nezaket biçimi Si.",
      },
      {
        kind: "build",
        tr: "Erken çıkabilmek için kiracı önerebilirim.",
        answer: "Ich chan Ine Nachmieter vorschlaa, zum vorziitig uszüge.",
        hint: "vorschlagen → vorschlaa; „zum … “ + mastar amaç bildirir.",
      },
      {
        kind: "free",
        prompt:
          "Ev sahibine/yönetime fesih mektubu yaz. Beş noktaya değin: hangi daireyi (tam adres ve kat), hangi tarihe feshettiğin, onay talebin, erken çıkma isteğin varsa bunu ve kiracı önerme teklifin, teslim için müsait olduğun tarihler. Kısa ve nesnel olsun.",
        checklist: [
          "Daireyi tam tanımladın mı (adres, kat)?",
          "Fesih tarihini net yazdın mı?",
          "Onay talep ettin mi?",
          "Erken çıkma konusunda öneri sundun mu?",
          "Teslim için müsaitliğini yazdın mı?",
          "Tarih ve imza var mı?",
        ],
        minWords: 70,
        phrases: [
          { de: "Hiermit kündige ich …", tr: "İşbu yazıyla …'i feshediyorum." },
          { de: "uf de nächschtmöglich Termin, also uf de …", tr: "bir sonraki mümkün tarihe, yani …'e" },
          { de: "Ich bitte Si um e schriftlichi Bestätigung.", tr: "Yazılı onay rica ediyorum." },
          { de: "Gärn schlaa ich Ine Nachmieter vor.", tr: "Memnuniyetle kiracı önerebilirim." },
          { de: "Für d Abgab bin ich ab em … verfüegbar.", tr: "Teslim için …'den itibaren müsaitim." },
          { de: "Fründlichi Grüess", tr: "Saygılarımla" },
        ],
        sample:
          "Sehr geehrti Frau Bächtold\n\nHiermit kündige ich d 3-Zimmer-Wonig a de Bertastrass 9, 2. Schtock, links, uf de nächschtmöglich Termin, also uf de 30. Septämber.\n\nIch bitte Si um e schriftlichi Bestätigung vo dere Kündigung.\n\nGärn würd ich scho früener uszüge. Wänn Si iiverstande sind, schlaa ich Ine Nachmieter vor, wo zaalungsfähig sind und de Vertrag zu de gliiche Konditione übernämed.\n\nFür d Wonigsabgab bin ich ab Mitti Juli verfüegbar, am liebschte am Vormittag. Bitte gänd Si mer rächtziitig Bschäid, damit ich d Endreinigung cha organisiere.\n\nFründlichi Grüess\nYusuf Demir\n\nZüri, 20. Mai",
      },
    ],
  },
  {
    id: "zh-b1-w6",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "Forumsbiitrag mit Meinig",
    genre: "Sınav formatı",
    intro:
      "Sınavın klasik yazma görevi: bir forum yazısına kendi görüşünle cevap ver — görüş, gerekçe, örnek, öneri.",
    gloss: [
      { de: "de Biitrag", tr: "gönderi" },
      { de: "d Meinig", tr: "görüş" },
      { de: "de Vortäil", tr: "avantaj" },
      { de: "de Nachtäil", tr: "dezavantaj" },
      { de: "einersiits … anderersiits", tr: "bir yandan … öte yandan" },
      { de: "vorschlaa", tr: "önermek" },
      { de: "d Erfaarig", tr: "deneyim" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bence okullar cep telefonlarını yasaklamamalı.",
        answer: "Miner Meinig nach sötted d Schuele d Händy nöd verbüüte.",
        hint: "sollten → sötted; verbieten → verbüüte.",
      },
      {
        kind: "build",
        tr: "Bir yandan bu dikkat dağıtıyor, öte yandan öğrenmeye de yardım ediyor.",
        answer: "Einersiits lenkt das ab, anderersiits hilft s au bim Lerne.",
        hint: "İki bölümde de fiil ikinci sırada kalır.",
      },
      {
        kind: "build",
        tr: "Bu yüzden net kuralların olmasını öneriyorum.",
        answer: "Drum schlaa ich vor, dass es klari Regle git.",
        hint: "vorschlagen ayrılabilir; dass yan cümlesinde fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "Bir forumda şu tartışılıyor: „Sötted alli Chind i de Schuel Mundart rede oder Hochdüütsch?“ Kendi görüşünle bir yorum yaz. Dört noktaya değin: görüşün, en az iki gerekçe, kendi hayatından bir örnek, somut bir öneri.",
        checklist: [
          "Görüşünü ilk cümlelerde net söyledin mi?",
          "En az iki gerekçe verdin mi?",
          "Kişisel bir örnek verdin mi?",
          "Karşı görüşe bir cümleyle değindin mi?",
          "Somut bir öneriyle bitirdin mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich han de Biitrag vo … gläse.", tr: "…'in yazısını okudum." },
          { de: "Miner Meinig nach …", tr: "Bence …" },
          { de: "De wichtigscht Grund isch …", tr: "En önemli neden …" },
          { de: "Bi mir isch s so gsii, dass …", tr: "Bende şöyle oldu: …" },
          { de: "Natürli git s au …", tr: "Elbette … de var." },
          { de: "Drum schlaa ich vor, dass …", tr: "Bu yüzden … öneriyorum." },
        ],
        sample:
          "Ich han de Biitrag vo lehrer_zh gläse und find d Frag würkli spannend.\n\nMiner Meinig nach söll im Underricht Hochdüütsch gredt wärde, in de Pause aber Mundart. De wichtigscht Grund isch s Schriibe: D Chind schriibed später Hochdüütsch, und wär s nie ghört, hät en Nachtäil. De zwäit Grund isch d Grächtigkäit — Chind, wo dihäi käi Mundart ghöred, sind susch doppelt im Rückschtand.\n\nBi mir isch s so gsii, dass ich Hochdüütsch us de Schuel kennt han und Mundart erscht uf em Pauseplatz glernt han. Das hät funktioniert, aber d Pause isch entschäidend gsii — dört isch d Sprooch würkli passiert.\n\nNatürli git s au s Argumänt, dass Mundart zur Identität ghört. Das stimmt, und drum wär s falsch, si us de Schuel z verbanne.\n\nDrum schlaa ich vor, dass es klari Regle git: Underricht uf Hochdüütsch, Pause und Turne uf Mundart. So lerned alli bäides — und niemert mues sich für sini Sprooch schäme.",
      },
    ],
  },
  {
    id: "zh-b1-w7",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "Mehrsprachigkäit: dini Erfaarig",
    genre: "Kültür",
    intro:
      "zh-b1-r9'daki konuyu kendi deneyiminle yazacaksın: diller arasında yaşamak nasıl bir şey?",
    gloss: [
      { de: "d Mehrsprachigkäit", tr: "çok dillilik" },
      { de: "sich schäme", tr: "utanmak" },
      { de: "de Akzent", tr: "aksan" },
      { de: "wächsle", tr: "geçmek, değiştirmek" },
      { de: "sich verbessere", tr: "gelişmek" },
      { de: "s Selbstvertraue", tr: "özgüven" },
      { de: "de Rat", tr: "tavsiye" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Başlangıçta konuşmaya utanıyordum.",
        answer: "Am Aafang han ich mich gschämt z rede.",
        hint: "sich schämen → sich schäme; Perfekt: han mich gschämt.",
      },
      {
        kind: "build",
        tr: "İnsanlar hemen Hochdeutsch'a geçiyordu.",
        answer: "D Lüüt sind sofort uf Hochdüütsch gwächslet.",
        hint: "wechseln → wächsle, Perfekt sein ile: sind … gwächslet.",
      },
      {
        kind: "build",
        tr: "Bugün aksanımı bir sorun olarak görmüyorum.",
        answer: "Hüt gseh ich min Akzent nöd als Problem.",
        hint: "sehen → gseh; „als“ ile yüklem tümleci.",
      },
      {
        kind: "free",
        prompt:
          "Diller arasında yaşamakla ilgili kendi deneyimini yaz. Dört noktaya değin: bir durum (nerede, kiminle), o an ne hissettiğin, o zamandan bugüne ne değiştiği, yeni gelen birine tavsiyen. Sahneyle başla, açıklamayla değil.",
        checklist: [
          "Somut bir sahneyle başladın mı?",
          "Duyguyu adlandırdın mı?",
          "Bugünle geçmişi karşılaştırdın mı?",
          "Net bir tavsiyeyle bitirdin mi?",
          "Perfekt kullandın mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Als ich nöi da gsii bi, …", tr: "Buraya yeni geldiğimde …" },
          { de: "Ich han mich gschämt, …", tr: "… konusunda utandım." },
          { de: "D Lüüt sind sofort uf … gwächslet.", tr: "İnsanlar hemen …'a geçti." },
          { de: "Underdesse …", tr: "Bu arada …" },
          { de: "Min Rat wär: …", tr: "Tavsiyem şu olurdu: …" },
        ],
        sample:
          "Als ich nöi da gsii bi, han ich im Gschäft en Satz uf Mundart probiert. Ich han gsäit: „Chunsch au go Mittag ässe?“ Di Kollegin hät gnickt — und denn uf Hochdüütsch gantwortet.\n\nDas isch nöd bös gmeint gsii. Aber ich han mich gschämt und han drei Wuche nüüt meh probiert. D Lüüt sind sowieso sofort uf Hochdüütsch gwächslet, sobald si min Akzent ghört händ, und ich han gläbt, wie i eme Zimmer, wo alli höflich sind und niemert eim rediglaat.\n\nGänderet hät s en Kollege us em Lager. Er hät äifach wiiter Mundart gredt, au wänn ich uf Hochdüütsch gantwortet han. Nach zwäi Mönet han ich gmerkt, dass ich alles verstaan. Nach sächs Mönet han ich gantwortet.\n\nUnderdesse redt ich Mundart mit em halbe Team. Hüt gseh ich min Akzent nöd als Problem — er säit nur, wo ich härchume.\n\nMin Rat wär: Säged de Lüüt, si sölled Mundart wiiterrede. Di mäischte fröied sich sogar — si wüssed nur nöd, öb si dörfed.",
      },
    ],
  },
  {
    id: "zh-b1-w8",
    course: "gsw-zh",
    level: "B1",
    skill: "writing",
    title: "S Schriibe wäge de Kaution",
    genre: "Şikâyet",
    intro:
      "Hikâyenin son parçası: Yusuf'un yerine geçip depozito kesintisine itiraz mektubunu yazacaksın. Nesnel kal — bu mektup işe yarayanı gösteriyor.",
    gloss: [
      { de: "de Abzug", tr: "kesinti" },
      { de: "s Iizugsprotokoll", tr: "giriş tutanağı" },
      { de: "de Nachwiis", tr: "kanıt" },
      { de: "d Frischt setze", tr: "süre vermek" },
      { de: "d Uszaalig", tr: "ödeme, iade" },
      { de: "d Schlichtigsbehörde", tr: "uzlaştırma makamı" },
      { de: "iiverstande", tr: "hemfikir" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "450 franklık kesintiye itiraz ediyorum.",
        answer: "Ich bin mit em Abzug vo 450 Franke nöd iiverstande.",
        hint: "„nöd iiverstande sii mit“ + Dativ — nesnel itiraz kalıbı.",
      },
      {
        kind: "build",
        tr: "Çizik giriş günü zaten oradaydı.",
        answer: "De Chratzer isch am Iizugstag scho da gsii.",
        hint: "Perfekt: isch … gsii (war yerine).",
      },
      {
        kind: "build",
        tr: "Size 10 Ağustos'a kadar süre veriyorum.",
        answer: "Ich setze Ine e Frischt bis am 10. Auguscht.",
        hint: "„e Frischt setze“ + Dativ (Ine).",
      },
      {
        kind: "free",
        prompt:
          "Yönetime depozito kesintisine itiraz mektubu yaz. Beş noktaya değin: hangi kesintiye itiraz ettiğin, gerekçen ve kanıtın, kabul ettiğin kalemler, net talebin ve süre, sonraki adım (uzlaştırma makamı) — tehdit gibi değil, bilgi olarak. Duygusal cümle kurma.",
        checklist: [
          "İtiraz ettiğin kalemi ve tutarı net yazdın mı?",
          "Kanıtını belirttin mi?",
          "Kabul ettiğin kalemleri de yazdın mı?",
          "Net bir talep ve süre verdin mi?",
          "Sonraki adımı nesnel biçimde belirttin mi?",
          "Ton sakin mi?",
        ],
        minWords: 100,
        phrases: [
          { de: "Ich beziehe mich uf s Abgabeprotokoll vom …", tr: "…tarihli teslim tutanağına atıfla" },
          { de: "Mit em Abzug vo … bin ich nöd iiverstande.", tr: "… kesintisine katılmıyorum." },
          { de: "Als Nachwiis lege ich … bii.", tr: "Kanıt olarak … ekliyorum." },
          { de: "Mit de andere Punkt bin ich iiverstande.", tr: "Diğer kalemlere itirazım yok." },
          { de: "Ich bitte Si, … uszzaale.", tr: "…'i ödemenizi rica ediyorum." },
          { de: "Andernfalls wärd ich d Schlichtigsbehörde aarüefe.", tr: "Aksi hâlde uzlaştırma makamına başvuracağım." },
        ],
        sample:
          "Sehr geehrti Frau Bächtold\n\nIch beziehe mich uf s Abgabeprotokoll vom 28. Juli, wo ich mit Vorbehalt unterschriibe han.\n\nMit em Abzug vo 450 Franke für de Chratzer im Parkett bin ich nöd iiverstande. De Chratzer isch am Iizugstag scho da gsii. Im Iizugsprotokoll staat er nöd — das schtimmt, ich han en damals nöd bemerkt. Als Nachwiis lege ich es Foti bii, wo am 1. April 2022 uufgnoo worde isch; s Datum isch i de Bilddatei gspeicheret und d Stell isch klar erkennbar.\n\nMit de andere Punkt im Protokoll bin ich iiverstande. De Abzug vo 180 Franke für s Silikon im Bad akzeptier ich.\n\nIch bitte Si drum, mir vo de Kaution vo 5'280 Franke insgesamt 5'100 Franke uszzaale, und setze Ine e Frischt bis am 10. Auguscht.\n\nSötted mir üs nöd einig wärde, wärd ich d Schlichtigsbehörde in Mietsache aarüefe. Ich gaa aber devo uus, dass mir das nöd bruuched.\n\nFründlichi Grüess\nYusuf Demir",
      },
    ],
  },
];
