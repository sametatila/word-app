import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 15 — "Gezilecek yerler, kaybolmak, bisiklet ve danışma".
 *
 * Dört ders: Was kann man hier sehen? · Ich habe mich verlaufen ·
 * Mit dem Fahrrad · Am Informationsschalter. İçerik ünite 1-15'in
 * kelimeleriyle sınırlı.
 *
 *   Ünite 15: das Museum, die Kirche, der Turm, die Altstadt, empfehlen,
 *             die Sehenswürdigkeit, das Dorf, überall · sich verlaufen,
 *             die Straße, die Ampel, die Kreuzung, abbiegen, hinten, oben,
 *             unten · das Fahrrad, der Radweg, leihen, der Helm, aufpassen,
 *             Rad fahren, die Vorsicht, erlauben · der Schalter, der Fahrplan,
 *             umsteigen, die Auskunft, direkt, der Bahnsteig, die Durchsage,
 *             der Ausgang
 *   Kalıplar: Was kann man hier sehen? · Ich empfehle … · Ich habe mich
 *             verlaufen. · Biegen Sie an der Ampel rechts ab. · Ich möchte
 *             ein Fahrrad leihen. · Muss ich umsteigen? · Fährt der Zug direkt?
 *
 * "Ich habe mich verlaufen" A1'de öğretilen TEK Perfekt kalıbıdır ve kalıp
 * olarak öğretilir, çözümlenmez — Perfekt'in kendisi ünite 25'te geliyor.
 * Egzersizlerde bu cümle aynen kullanılıyor ama başka geçmiş zaman YOK.
 */
export const a1U15: SkillExercise[] = [
  {
    id: "a1-u15-r1",
    level: "A1",
    skill: "reading",
    unit: 15,
    title: "Was kann man in Bremen sehen?",
    genre: "Broşür",
    intro: "Bir şehir broşürü. Nereleri gezebilirsin?",
    gloss: [
      { de: "die Sehenswürdigkeit", tr: "turistik yer", en: "sight" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
      { de: "die Altstadt", tr: "eski şehir", en: "old town" },
      { de: "der Turm", tr: "kule", en: "tower" },
    ],
    minutes: 3,
    text:
      "BREMEN — SEHENSWÜRDIGKEITEN\n\nDie Altstadt ist klein, aber schön. Hier finden Sie viele Sehenswürdigkeiten.\n\nDas Museum am Marktplatz: von 10 bis 18 Uhr. Es kostet 8 Euro, für Kinder ist es kostenlos.\n\nDie Kirche daneben ist sehr alt. Der Turm ist sehr groß — von oben sehen Sie die Stadt.\n\nWir empfehlen: Leihen Sie ein Fahrrad! Es gibt überall Radwege. Ein Fahrrad kostet 10 Euro für einen Tag.\n\nAuch die kleinen Dörfer in der Nähe sind schön. Mit der Bahn dauert es 20 Minuten.",
    questions: [
      {
        text: "Wann kann man ins Museum?",
        options: ["von 10 bis 18 Uhr", "von 8 bis 20 Uhr", "nur am Wochenende"],
        answer: 0,
        explain: "„Das Museum am Marktplatz: von 10 bis 18 Uhr.“",
      },
      {
        kind: "gapfill",
        text: "Der Turm ist sehr ___.",
        options: [],
        answer: 0,
        accept: ["groß"],
        explain: "„Der Turm ist sehr groß.“",
      },
      {
        text: "Was soll man leihen?",
        options: ["ein Fahrrad", "ein Auto", "einen Stadtplan"],
        answer: 0,
        explain: "„Wir empfehlen: Leihen Sie ein Fahrrad!“",
      },
      {
        text: "Richtig oder falsch? Kinder bezahlen auch 8 Euro.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „für Kinder ist es kostenlos.“",
      },
      {
        text: "Wie lange dauert es mit der Bahn zu den Dörfern?",
        options: ["20 Minuten", "10 Minuten", "eine Stunde"],
        answer: 0,
        explain: "„Mit der Bahn dauert es 20 Minuten.“",
      },
    ],
  },
  {
    id: "a1-u15-r2",
    level: "A1",
    skill: "reading",
    unit: 15,
    title: "Am Informationsschalter",
    genre: "Bilgilendirme",
    intro: "Gardaki danışma tabelasını okuyacaksın.",
    gloss: [
      { de: "die Auskunft", tr: "danışma", en: "information" },
      { de: "umsteigen", tr: "aktarma yapmak", en: "to change (trains)" },
      { de: "direkt", tr: "aktarmasız", en: "direct" },
      { de: "der Bahnsteig", tr: "peron", en: "platform" },
    ],
    minutes: 3,
    text:
      "AUSKUNFT — Bahnhof Bremen\n\nZüge nach Hamburg fahren direkt. Sie müssen nicht umsteigen. Fahrzeit: 60 Minuten.\n\nZüge nach Berlin: Sie steigen in Hannover um. Der Fahrplan hängt am Bahnsteig.\n\nZum Flughafen: S-Bahn, Bahnsteig 1, alle 10 Minuten.\n\nDie Durchsagen hören Sie überall im Bahnhof. Bitte passen Sie auf: Der Zug nach Hamburg fährt heute von Bahnsteig 7, nicht von 4!\n\nDer Ausgang zur Stadt ist hinten links. Taxis finden Sie gegenüber.",
    questions: [
      {
        text: "Muss man nach Hamburg umsteigen?",
        options: ["Nein, der Zug fährt direkt", "Ja, in Hannover", "Ja, in Berlin"],
        answer: 0,
        explain: "„Züge nach Hamburg fahren direkt. Sie müssen nicht umsteigen.“",
      },
      {
        text: "Wo steigt man nach Berlin um?",
        options: ["in Hannover", "in Hamburg", "am Flughafen"],
        answer: 0,
        explain: "„Züge nach Berlin: Sie steigen in Hannover um.“",
      },
      {
        kind: "gapfill",
        text: "Der Zug nach Hamburg fährt heute von Bahnsteig ___.",
        options: [],
        answer: 0,
        accept: ["7"],
        explain: "„fährt heute von Bahnsteig 7, nicht von 4!“ — dikkat, değişiklik var.",
      },
      {
        text: "Wo ist der Ausgang zur Stadt?",
        options: ["hinten links", "gegenüber", "am Bahnsteig 1"],
        answer: 0,
        explain: "„Der Ausgang zur Stadt ist hinten links.“ Taksiler karşıda.",
      },
    ],
  },
  {
    id: "a1-u15-l1",
    level: "A1",
    skill: "listening",
    unit: 15,
    title: "Ich habe mich verlaufen",
    genre: "Diyalog",
    intro: "Biri kaybolmuş ve yol soruyor. Yönleri takip et.",
    gloss: [
      { de: "sich verlaufen", tr: "kaybolmak", en: "to get lost" },
      { de: "die Ampel", tr: "trafik ışığı", en: "traffic light" },
      { de: "abbiegen", tr: "dönmek", en: "to turn" },
    ],
    minutes: 2,
    segments: [
      { text: "Entschuldigung, ich habe mich verlaufen. Wo ist die Altstadt?" },
      { text: "Kein Problem. Gehen Sie geradeaus bis zur Ampel." },
      { text: "Und dann?" },
      { text: "An der Ampel biegen Sie rechts ab. Nach der Kreuzung ist die Altstadt." },
      { text: "Ist das weit?" },
      { text: "Nein, zehn Minuten zu Fuß." },
    ],
    questions: [
      {
        text: "Was ist das Problem?",
        options: ["Die Person hat sich verlaufen", "Die Person hat kein Geld", "Der Bus fährt nicht"],
        answer: 0,
        explain: "„ich habe mich verlaufen.“",
      },
      {
        text: "Wo muss die Person rechts abbiegen?",
        options: ["an der Ampel", "an der Kreuzung", "am Marktplatz"],
        answer: 0,
        explain: "„An der Ampel biegen Sie rechts ab.“ Kavşak ondan sonra geliyor.",
      },
      {
        kind: "gapfill",
        text: "Zu Fuß dauert es ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„Nein, zehn Minuten zu Fuß.“",
      },
      {
        text: "Richtig oder falsch? Die Altstadt ist sehr weit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Nein, zehn Minuten zu Fuß.“",
      },
    ],
  },
  {
    id: "a1-u15-l2",
    level: "A1",
    skill: "listening",
    unit: 15,
    title: "Ein Fahrrad leihen",
    genre: "Diyalog",
    intro: "Bisiklet kiralanıyor. Ne kadar, neye dikkat?",
    gloss: [
      { de: "leihen", tr: "kiralamak", en: "to rent" },
      { de: "der Helm", tr: "kask", en: "helmet" },
      { de: "aufpassen", tr: "dikkat etmek", en: "to watch out" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag. Ich möchte ein Fahrrad leihen." },
      { text: "Gern. Für einen Tag oder eine Woche?" },
      { text: "Für einen Tag, bitte. Was kostet das?" },
      { text: "10 Euro. Möchten Sie auch einen Helm?" },
      { text: "Ja, bitte." },
      { text: "Gut. Passen Sie auf: Fahren Sie bitte auf dem Radweg." },
    ],
    questions: [
      {
        text: "Für wie lange leiht die Person das Fahrrad?",
        options: ["für einen Tag", "für eine Woche", "für zwei Tage"],
        answer: 0,
        explain: "„Für einen Tag, bitte.“",
      },
      {
        kind: "gapfill",
        text: "Das Fahrrad kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["10", "zehn"],
        explain: "„10 Euro.“",
      },
      {
        text: "Was möchte die Person noch?",
        options: ["einen Helm", "einen Stadtplan", "ein Ticket"],
        answer: 0,
        explain: "„Möchten Sie auch einen Helm?“ — „Ja, bitte.“",
      },
      {
        text: "Wo soll die Person fahren?",
        options: ["auf dem Radweg", "auf der Straße", "auf der Autobahn"],
        answer: 0,
        explain: "„Fahren Sie bitte auf dem Radweg.“",
      },
    ],
  },
  {
    id: "a1-u15-w1",
    level: "A1",
    skill: "writing",
    unit: 15,
    title: "Den Weg und den Zug erklären",
    genre: "Dil bilgisi",
    intro: "Yön verme ve aktarma cümleleri.",
    gloss: [
      { de: "abbiegen", tr: "dönmek", en: "to turn" },
      { de: "umsteigen", tr: "aktarma yapmak", en: "to change" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Trafik ışığında sağa dönün.",
        answer: "Biegen Sie an der Ampel rechts ab",
        hint: "abbiegen ayrılabilir: „Biegen Sie … ab“. Emir kipinde de ön ek SONDA kalır.",
      },
      {
        kind: "build",
        tr: "Aktarma yapmam gerekiyor mu?",
        answer: "Muss ich umsteigen",
        hint: "„müssen“ ile mastar SONDA durur ve ayrılabilir fiil ayrılmaz: muss ich umsteigen.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi tavsiye biçiminde yaz.",
        source: "Die Kirche ist schön.",
        answer: "Ich empfehle die Kirche.",
        alternatives: ["Ich empfehle die Kirche"],
        why: "„empfehlen“ doğrudan Akkusativ alır: Ich empfehle die Kirche / das Museum.",
      },
    ],
  },
  {
    id: "a1-u15-w2",
    level: "A1",
    skill: "writing",
    unit: 15,
    title: "Eine Stadt empfehlen",
    genre: "Forum mesajı",
    intro: "Bir gezginin sorusuna cevap yaz.",
    gloss: [
      { de: "die Sehenswürdigkeit", tr: "turistik yer", en: "sight" },
      { de: "das Museum", tr: "müze", en: "museum" },
      { de: "überall", tr: "her yerde", en: "everywhere" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Burada ne görülebilir?",
        answer: "Was kann man hier sehen",
        hint: "„man“ belirsiz özne: kişi belli değil. „Was kann man …“ = ne görülebilir.",
      },
      {
        kind: "free",
        prompt:
          "Şehrini soran birine cevap yaz (4-5 cümle). En az iki gezilecek yer öner, birine yol tarif et ve bir ulaşım önerisi ver.",
        stimulus:
          "Hallo! Ich komme am Samstag in deine Stadt. Was kann man dort sehen? Und wie komme ich am besten in die Altstadt? Tom",
        minWords: 30,
        checklist: [
          "En az iki yer önerdin mi? (das Museum, die Kirche, der Turm, die Altstadt)",
          "„empfehlen“ kullandın mı? (Ich empfehle …)",
          "Yol tarif ettin mi? (geradeaus, an der Ampel, abbiegen)",
          "Ulaşım önerdin mi? (mit dem Fahrrad, zu Fuß, mit der Bahn)",
        ],
        phrases: [
          { de: "Ich empfehle …", tr: "… tavsiye ederim", en: "I recommend …" },
          { de: "Man kann … sehen.", tr: "… görülebilir.", en: "You can see …" },
          { de: "Leih dir ein Fahrrad!", tr: "Bir bisiklet kirala!", en: "Rent a bike!" },
        ],
        sample:
          "Hallo Tom,\n\nhier kann man viel sehen! Ich empfehle das Museum am Marktplatz und die alte Kirche daneben. Der Turm ist auch schön — von oben sieht man die Stadt.\n\nIn die Altstadt kommst du zu Fuß: Geh geradeaus bis zur Ampel und biege dann rechts ab. Nach der Kreuzung bist du da.\n\nLeih dir ein Fahrrad! Es gibt überall Radwege und es kostet nur 10 Euro für einen Tag.\n\nBis Samstag!\nElif",
      },
    ],
  },
];
