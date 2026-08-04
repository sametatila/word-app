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
];
