import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 41 — "Göç, dil, aidiyet" (dersler 161–164).
 *
 * Dersler: Migration · Im Konsulat · Sprache und Akzent ·
 * Minderheit und Mehrheit.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   gern / lieber /   Türkçe karşılaştırmayı DÜZENLİ kurar ('daha çok',
 *   am liebsten       'en çok'), o yüzden Almancada da düzenli ek
 *                     bekleniyor ve "gerner" çıkıyor. Almancada birkaç
 *                     sık sözcük düzensizdir: gern → lieber → am liebsten,
 *                     viel → mehr → am meisten, gut → besser → am besten.
 *                     Bunlar kuralla üretilmez, ezberlenir.
 *   yüklem yalın      sein, werden ve bleiben fiillerinden sonra gelen
 *   hâlde kalır       öğe NESNE DEĞİLDİR: hâli Nominativ'dir.
 *                     "Er ist ein guter Lehrer" — "einen guten" değil.
 *                     Türkçede yüklem hiç hâl almadığı için öğrenci
 *                     "fiil → Akkusativ" kuralını buraya da taşıyor.
 *
 * Yeni 32 kelime: die Migration, der Migrant, die Migrantin,
 * die Integration, die Flucht, fliehen, die Muttersprache,
 * die Zweitsprache, das Konsulat, die Botschaft, das Asyl, die Bürgerin,
 * die Personalien, der Zivilstand, anerkennen, zusagen, der Dialekt,
 * die Aussprache, das Alphabet, das Wörterbuch, fließend, duzen,
 * verwandt, das Geschlecht, die Minderheit, die Mehrheit, allgemein,
 * national, politisch, die Reform, der Einfluss, das Forum.
 */
export const b1U41: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u41-r1",
    level: "B1",
    skill: "reading",
    unit: 41,
    title: "Zwei Sprachen, ein Kopf",
    genre: "Kişisel yazı",
    intro: "İki dille büyümek. Hangi dil ne zaman öne çıkıyor?",
    minutes: 5,
    gloss: [
      { de: "die Muttersprache", tr: "ana dil", en: "mother tongue" },
      { de: "die Zweitsprache", tr: "ikinci dil", en: "second language" },
      { de: "der Dialekt", tr: "lehçe", en: "dialect" },
      { de: "die Aussprache", tr: "telaffuz", en: "pronunciation" },
      { de: "fließend", tr: "akıcı", en: "fluent" },
    ],
    text:
      "Meine Muttersprache ist Türkisch, meine Zweitsprache Deutsch. " +
      "Beide spreche ich fließend, aber nicht gleich gern in jeder " +
      "Situation.\n\n" +
      "Über Gefühle rede ich lieber auf Türkisch. Über Arbeit am liebsten " +
      "auf Deutsch — nicht weil es besser ist, sondern weil ich die Wörter " +
      "dort gelernt habe. Ein Wörterbuch hilft dabei wenig.\n\n" +
      "Meine Aussprache ist gut, aber man hört etwas. Früher hat mich das " +
      "gestört, heute nicht mehr. Ein Kollege aus Bayern spricht einen " +
      "Dialekt, den ich manchmal schwerer verstehe als jeden Akzent.\n\n" +
      "Was ich am meisten gelernt habe: Zwei Sprachen sind kein halbes " +
      "Zuhause in jeder, sondern ein ganzes in beiden. Das habe ich lange " +
      "gebraucht, um es zu glauben.",
    questions: [
      {
        text: "Worüber redet die Person lieber auf Türkisch?",
        options: ["Über Arbeit", "Über Gefühle", "Über Politik"],
        answer: 1,
        explain: "„Über Gefühle rede ich lieber auf Türkisch.“",
      },
      {
        text: "Warum redet sie über Arbeit auf Deutsch?",
        options: ["Weil Deutsch besser ist", "Weil sie die Wörter dort gelernt hat", "Weil alle das machen"],
        answer: 1,
        explain: "„… sondern weil ich die Wörter dort gelernt habe.“",
      },
      {
        text: "Was versteht sie manchmal schwerer als einen Akzent?",
        options: ["Einen Dialekt", "Ein Wörterbuch", "Die Aussprache"],
        answer: 0,
        explain: "„Ein Kollege aus Bayern spricht einen Dialekt, den ich manchmal schwerer verstehe als jeden Akzent.“",
      },
      {
        kind: "gapfill",
        text: "Über Gefühle rede ich ___ auf Türkisch, über Arbeit ___ ___ auf Deutsch.",
        options: [],
        answer: 0,
        accept: ["lieber am liebsten", "lieber / am liebsten"],
        explain: "gern → lieber → am liebsten. Düzensizdir, „gerner“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "Was hat sie am meisten gelernt?",
        options: [],
        answer: 0,
        accept: ["dass zwei Sprachen ein ganzes Zuhause sind", "zwei Sprachen sind ein ganzes Zuhause"],
        explain: "„Zwei Sprachen sind kein halbes Zuhause in jeder, sondern ein ganzes in beiden.“",
      },
    ],
  },
  {
    id: "b1-u41-r2",
    level: "B1",
    skill: "reading",
    unit: 41,
    title: "Mehrheit und Minderheit",
    genre: "Deneme",
    intro: "Çoğunluk ve azınlık üzerine kısa bir yazı. Hangi soru soruluyor?",
    minutes: 5,
    gloss: [
      { de: "die Mehrheit", tr: "çoğunluk", en: "majority" },
      { de: "die Minderheit", tr: "azınlık", en: "minority" },
      { de: "allgemein", tr: "genel", en: "general" },
      { de: "der Einfluss", tr: "etki", en: "influence" },
      { de: "die Reform", tr: "reform", en: "reform" },
    ],
    text:
      "Eine Mehrheit ist keine Wahrheit. Das ist einfach, wird aber " +
      "in politischen Diskussionen ständig vergessen.\n\n" +
      "Wenn achtzig Prozent etwas gut finden, heißt das nur: achtzig " +
      "Prozent finden es gut. Ob es richtig ist, steht auf einem anderen " +
      "Blatt. Eine Reform ist deshalb nicht automatisch gut, weil viele " +
      "dafür sind — und nicht automatisch schlecht, weil wenige es sind.\n\n" +
      "Umgekehrt gilt dasselbe. Eine Minderheit hat nicht recht, nur weil " +
      "sie klein ist. Wer allgemein sagt „die Mehrheit versteht das nicht“, " +
      "hat noch kein Argument gebracht, sondern nur eine Gruppe genannt.\n\n" +
      "Der Einfluss einer Gruppe ist fast nie so groß, wie sie selbst denkt. " +
      "In einem Forum sieht das anders aus als im Land. Deshalb ist die " +
      "bessere Frage nicht „wer sagt das“, sondern „warum“.",
    questions: [
      {
        text: "Was heißt es, wenn achtzig Prozent etwas gut finden?",
        options: ["Dass es richtig ist", "Nur, dass achtzig Prozent es gut finden", "Dass eine Reform kommt"],
        answer: 1,
        explain: "„… heißt das nur: achtzig Prozent finden es gut.“",
      },
      {
        text: "Was gilt für eine Minderheit?",
        options: ["Sie hat immer recht", "Sie hat nicht recht, nur weil sie klein ist", "Sie hat nie recht"],
        answer: 1,
        explain: "„Eine Minderheit hat nicht recht, nur weil sie klein ist.“",
      },
      {
        text: "Was ist laut Text die bessere Frage?",
        options: ["Wer sagt das", "Warum", "Wie viele"],
        answer: 1,
        explain: "„Deshalb ist die bessere Frage nicht „wer sagt das“, sondern „warum“.“",
      },
      {
        kind: "gapfill",
        text: "Eine Mehrheit ist ___ ___.",
        options: [],
        answer: 0,
        accept: ["keine Wahrheit"],
        explain: "„sein“ sonrası yüklem YALIN hâlde kalır: keine Wahrheit, „keine“ Nominativ.",
      },
      {
        kind: "short_answer",
        text: "Wo sieht der Einfluss einer Gruppe anders aus?",
        options: [],
        answer: 0,
        accept: ["in einem Forum", "im Forum", "in einem Forum anders als im Land"],
        explain: "„In einem Forum sieht das anders aus als im Land.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u41-l1",
    level: "B1",
    skill: "listening",
    unit: 41,
    title: "Im Konsulat",
    genre: "Resmî işlem",
    intro: "Bir belge işlemi. Ne gerekiyor, ne kadar sürüyor?",
    minutes: 4,
    gloss: [
      { de: "das Konsulat", tr: "konsolosluk", en: "consulate" },
      { de: "die Personalien", tr: "kimlik bilgileri", en: "personal details" },
      { de: "der Zivilstand", tr: "medeni hâl", en: "marital status" },
      { de: "anerkennen", tr: "tanımak", en: "to recognise" },
    ],
    segments: [
      { text: "Guten Tag. Ich brauche eine Bestätigung für die Botschaft." },
      { text: "Gern. Bitte zuerst die Personalien und den Zivilstand." },
      { text: "Hier ist mein Ausweis. Ledig, seit letztem Jahr geschieden." },
      { text: "Danke. Wird Ihr Abschluss hier schon anerkannt?" },
      { text: "Teilweise. Der Rest wird noch geprüft." },
      { text: "Dann brauchen wir davon eine Kopie." },
      { text: "Die habe ich dabei. Wie lange dauert die Bestätigung?" },
      { text: "Etwa zehn Tage. Wir sagen Ihnen den Termin schriftlich zu." },
    ],
    questions: [
      {
        text: "Was braucht die Person?",
        options: ["Eine Bestätigung für die Botschaft", "Einen neuen Ausweis", "Ein Visum"],
        answer: 0,
        explain: "„Ich brauche eine Bestätigung für die Botschaft.“",
      },
      {
        text: "Ist der Abschluss anerkannt?",
        options: ["Ja, ganz", "Teilweise", "Nein"],
        answer: 1,
        explain: "„Teilweise. Der Rest wird noch geprüft.“",
      },
      {
        text: "Wie lange dauert die Bestätigung?",
        options: ["Zehn Tage", "Zehn Wochen", "Einen Tag"],
        answer: 0,
        explain: "„Etwa zehn Tage.“",
      },
      {
        kind: "gapfill",
        text: "Wir sagen Ihnen den Termin schriftlich ___.",
        options: [],
        answer: 0,
        accept: ["zu"],
        explain: "„zusagen“ ayrılabilen fiildir: önek sona gider.",
      },
      {
        kind: "short_answer",
        text: "Was soll die Person zuerst geben?",
        options: [],
        answer: 0,
        accept: ["die Personalien und den Zivilstand", "Personalien und Zivilstand"],
        explain: "„Bitte zuerst die Personalien und den Zivilstand.“",
      },
    ],
  },
  {
    id: "b1-u41-l2",
    level: "B1",
    skill: "listening",
    unit: 41,
    title: "Duzen oder siezen?",
    genre: "Dil üzerine sohbet",
    intro: "Hitap biçimi konuşuluyor. Ne zaman hangisi?",
    minutes: 4,
    gloss: [
      { de: "duzen", tr: "sen diye hitap etmek", en: "to address informally" },
      { de: "das Alphabet", tr: "alfabe", en: "alphabet" },
      { de: "das Wörterbuch", tr: "sözlük", en: "dictionary" },
      { de: "verwandt", tr: "akraba / ilişkili", en: "related" },
    ],
    segments: [
      { text: "Im Kurs duzen sich alle. Im Betrieb nicht. Warum eigentlich?" },
      { text: "Es hängt von der Gruppe ab, nicht vom Alter." },
      { text: "Bei uns duzt der Chef alle, aber niemand duzt ihn zurück." },
      { text: "Das ist seltsam. Dann lieber niemanden duzen." },
      { text: "Sehe ich auch so. Am liebsten fragt man einfach." },
      { text: "Genau. Ein Wörterbuch hilft da gar nicht." },
      { text: "Nein. Das steht in keinem Buch, das lernt man nur so." },
      { text: "Wie das Alphabet: man lernt es einmal und denkt nie mehr daran." },
    ],
    questions: [
      {
        text: "Wovon hängt es ab?",
        options: ["Vom Alter", "Von der Gruppe", "Vom Beruf"],
        answer: 1,
        explain: "„Es hängt von der Gruppe ab, nicht vom Alter.“",
      },
      {
        text: "Was ist im Betrieb der zweiten Person seltsam?",
        options: ["Der Chef duzt alle, aber niemand ihn", "Alle siezen sich", "Niemand redet"],
        answer: 0,
        explain: "„Bei uns duzt der Chef alle, aber niemand duzt ihn zurück.“",
      },
      {
        text: "Was ist die beste Lösung?",
        options: ["Einfach fragen", "Niemanden duzen", "Immer duzen"],
        answer: 0,
        explain: "„Am liebsten fragt man einfach.“",
      },
      {
        kind: "gapfill",
        text: "___ ___ fragt man einfach.",
        options: [],
        answer: 0,
        accept: ["Am liebsten"],
        explain: "gern'in üstünlük biçimi: am liebsten.",
      },
      {
        kind: "short_answer",
        text: "Womit vergleicht die Person es am Ende?",
        options: [],
        answer: 0,
        accept: ["mit dem Alphabet", "dem Alphabet", "Alphabet"],
        explain: "„Wie das Alphabet: man lernt es einmal …“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u41-w1",
    level: "B1",
    skill: "writing",
    unit: 41,
    title: "Meine Sprachen",
    genre: "Dil özgeçmişi",
    intro: "Dillerini anlat. 'daha çok' Almancada düzensizdir, kalıpla üretilmez.",
    minutes: 8,
    gloss: [
      { de: "die Muttersprache", tr: "ana dil", en: "mother tongue" },
      { de: "die Zweitsprache", tr: "ikinci dil", en: "second language" },
      { de: "die Aussprache", tr: "telaffuz", en: "pronunciation" },
      { de: "der Dialekt", tr: "lehçe", en: "dialect" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Duygular hakkında Türkçe konuşmayı daha çok seviyorum.",
        answer: "Über Gefühle rede ich lieber auf Türkisch.",
        hint: "gern → lieber, „gerner“ değil.",
      },
      {
        kind: "build",
        tr: "İş hakkında en çok Almanca konuşurum.",
        answer: "Über Arbeit rede ich am liebsten auf Deutsch.",
        hint: "gern → am liebsten.",
      },
      {
        kind: "build",
        tr: "En çok öğrendiğim şey sabırdı.",
        answer: "Am meisten habe ich Geduld gelernt.",
        hint: "viel → mehr → am meisten.",
      },
      {
        kind: "form",
        prompt: "Dil kartını doldur.",
        facts: "Kişi: Sedef Aydın; ana dil: Türkçe; ikinci dil: Almanca; duygular için: Türkçe; iş için: Almanca.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Muttersprache", answer: "Türkisch", accept: ["türkisch"] },
          { label: "Zweitsprache", answer: "Deutsch", accept: ["deutsch"] },
          { label: "Für Gefühle", answer: "Türkisch", accept: ["auf Türkisch", "die Muttersprache"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Düzensiz karşılaştırma biçimlerini düzelt.",
        source: "Ich rede gerner auf Türkisch und habe vieler gelernt als früher.",
        answer: "Ich rede lieber auf Türkisch und habe mehr gelernt als früher.",
        why: "Türkçe karşılaştırmayı DÜZENLİ kurar ('daha çok', 'en çok'), o yüzden Almancada da düzenli ek bekleniyor. Almancada birkaç çok sık sözcük düzensizdir ve kuralla üretilemez: gern → lieber → am liebsten, viel → mehr → am meisten, gut → besser → am besten, hoch → höher → am höchsten.",
      },
    ],
  },
  {
    id: "b1-u41-w2",
    level: "B1",
    skill: "writing",
    unit: 41,
    title: "Wer gehört dazu?",
    genre: "Görüş yazısı",
    intro: "Aidiyet üzerine yaz. 'sein' sonrası yüklem yalın hâlde kalır.",
    minutes: 12,
    gloss: [
      { de: "die Integration", tr: "uyum", en: "integration" },
      { de: "die Bürgerin", tr: "yurttaş (kadın)", en: "citizen" },
      { de: "politisch", tr: "siyasal", en: "political" },
      { de: "national", tr: "ulusal", en: "national" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "O iyi bir öğretmen ve aynı zamanda bir göçmen.",
        answer: "Er ist ein guter Lehrer und gleichzeitig ein Migrant.",
        hint: "„sein“ sonrası yalın hâl: ein guter, „einen guten“ değil.",
      },
      {
        kind: "build",
        tr: "Gelecek yıl yurttaş oluyor.",
        answer: "Nächstes Jahr wird sie Bürgerin.",
        hint: "„werden“ de yalın hâl ister.",
      },
      {
        kind: "free",
        prompt: "Aidiyet üzerine bir görüş yaz: 'buraya ait olmak' sence ne demek, hangi ölçüt önemli ve hangisi değil, kendi ya da bildiğin bir deneyim, ve karşı bir görüşe cevap. En az iki 'sein/werden + yalın yüklem' cümlesi kullan.",
        checklist: [
          "Konu tek cümlede tanıtılmış mı?",
          "En az iki ölçüt tartışılmış mı?",
          "Somut bir deneyim var mı?",
          "Karşı görüşe cevap var mı?",
          "sein/werden sonrası yüklem yalın hâlde mi?",
        ],
        minWords: 70,
        sample:
          "Für mich ist Integration keine Prüfung, sondern eine Frage von " +
          "Zeit und Gelegenheit.\n\n" +
          "Die Sprache gehört dazu, das bestreitet niemand. Aber sie ist " +
          "nicht das wichtigste Zeichen. Mein Nachbar ist seit dreißig Jahren " +
          "hier und spricht mit starkem Akzent. Er ist ein guter Nachbar " +
          "und war zwanzig Jahre lang Betriebsrat in seiner Firma.\n\n" +
          "Manche sagen, dass man ohne perfekte Sprache nicht richtig hier ist. " +
          "Dem möchte ich widersprechen. Eine Mehrheit entscheidet " +
          "nicht, wer hier zu Hause ist — sonst wäre jede Minderheit für immer " +
          "draußen.\n\n" +
          "Nächstes Jahr wird meine Schwester Bürgerin. Sie freut sich " +
          "darauf, endlich mit abzustimmen. Für sie ist das kein politisches " +
          "Zeichen, sondern einfach der letzte Schritt eines langen Wegs.",
        phrases: [
          { de: "Für mich ist Integration …", tr: "Bana göre uyum …", en: "For me integration is …" },
          { de: "Dem möchte ich widersprechen.", tr: "Buna karşı çıkmak isterim.", en: "I would like to contradict that." },
          { de: "… der letzte Schritt eines langen Wegs", tr: "… uzun bir yolun son adımı", en: "… the last step of a long road" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Yüklemin hâlini düzelt.",
        source: "Er ist einen guten Lehrer und wird nächstes Jahr einen Bürger.",
        answer: "Er ist ein guter Lehrer und wird nächstes Jahr Bürger.",
        why: "Türkçede yüklem hiç hâl almaz ('o iyi bir öğretmen'), ama öğrenci Almancada öğrendiği 'fiil → Akkusativ' kuralını buraya da taşıyor. sein, werden ve bleiben fiillerinden sonra gelen öğe NESNE DEĞİLDİR — özneyle aynı şeyi anlatır ve hâli Nominativ'dir: er ist ein guter Lehrer, sie wird Bürgerin, es bleibt ein Problem.",
      },
    ],
  },
];
