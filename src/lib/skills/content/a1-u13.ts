import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 13 — "Drogeri, online sipariş, yol tarifi ve toplu taşıma".
 *
 * Dört ders: In der Drogerie · Online bestellen · Wo ist der Bahnhof? ·
 * Mit dem Bus oder mit der Bahn? İçerik ünite 1-13'ün kelimeleriyle sınırlı.
 *
 *   Ünite 13: die Zahnpasta, die Seife, das Shampoo, die Creme,
 *             das Taschentuch, benutzen, das Papier, die Toilette ·
 *             der Warenkorb, die Lieferung, das Paket, dauern, kostenlos,
 *             das Internet, anklicken, die Post · der Bahnhof, der Weg,
 *             geradeaus, links, rechts, fragen, die Frage, zwischen ·
 *             der Bus, die U-Bahn, die Haltestelle, fahren, die Linie,
 *             die Bahn, die S-Bahn, die Straßenbahn
 *   Kalıplar: Wo finde ich …? · Ich bestelle … online. · Die Lieferung dauert
 *             … Tage. · Entschuldigung, wo ist …? · Gehen Sie geradeaus. ·
 *             Ich fahre mit dem Bus. · Welche Linie fährt zum Bahnhof?
 *
 * Yol tarifi ilk kez burada geçiyor ve KONUM sözcükleri (links, rechts,
 * geradeaus, zwischen) bu üniteye kadar hiç öğretilmiyordu — önceki
 * ünitelerin egzersizlerinde bilerek kullanılmadı.
 */
export const a1U13: SkillExercise[] = [
  {
    id: "a1-u13-r1",
    level: "A1",
    skill: "reading",
    unit: 13,
    title: "Wie komme ich zum Bahnhof?",
    genre: "Yol tarifi",
    intro: "Birine yazılı yol tarifi verilmiş. Yolu takip et.",
    gloss: [
      { de: "geradeaus", tr: "dosdoğru", en: "straight ahead" },
      { de: "die Haltestelle", tr: "durak", en: "stop" },
      { de: "zwischen", tr: "arasında", en: "between" },
      { de: "die Linie", tr: "hat", en: "line" },
    ],
    minutes: 3,
    text:
      "Hallo Amir,\n\nhier ist der Weg zum Bahnhof:\n\nDu gehst geradeaus. Nach der Bäckerei gehst du links. Der Weg ist lang — geh weiter geradeaus.\n\nDann kommt ein Marktplatz. Der Bahnhof ist rechts, zwischen der Post und einem Kiosk.\n\nZu Fuß dauert es 15 Minuten. Mit dem Bus geht es schneller: Die Haltestelle ist vor der Bäckerei, Linie 7 fährt zum Bahnhof.\n\nDie U-Bahn fährt dort nicht. Nur Bus und Straßenbahn.\n\nBis später!\nMia",
    questions: [
      {
        text: "Wohin geht man nach der Bäckerei?",
        options: ["links", "rechts", "geradeaus"],
        answer: 0,
        explain: "„Nach der Bäckerei gehst du links.“",
      },
      {
        text: "Wo ist der Bahnhof?",
        options: [
          "rechts, zwischen der Post und einem Kiosk",
          "links neben der Bäckerei",
          "am Marktplatz, geradeaus",
        ],
        answer: 0,
        explain: "„Der Bahnhof ist rechts, zwischen der Post und einem Kiosk.“",
      },
      {
        kind: "gapfill",
        text: "Zu Fuß dauert es ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["15"],
        explain: "„Zu Fuß dauert es 15 Minuten.“",
      },
      {
        text: "Welche Linie fährt zum Bahnhof?",
        options: ["Linie 7", "Linie 15", "die U-Bahn"],
        answer: 0,
        explain: "„Linie 7 fährt zum Bahnhof.“ 15 dakika yürüme süresi.",
      },
      {
        text: "Richtig oder falsch? Man kann auch mit der U-Bahn fahren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die U-Bahn fährt dort nicht. Nur Bus und Straßenbahn.“",
      },
          {
        kind: "gapfill",
        text: "Der Weg ist lang — geh weiter ___.",
        options: [],
        answer: 0,
        accept: ["geradeaus"],
        explain: "„Der Weg ist lang — geh weiter geradeaus.“",
      },
],
  },
  {
    id: "a1-u13-r2",
    level: "A1",
    skill: "reading",
    unit: 13,
    title: "Online bestellen",
    genre: "E-posta",
    intro: "Bir sipariş onay e-postası. Ne zaman geliyor, ne kadar?",
    gloss: [
      { de: "die Lieferung", tr: "teslimat", en: "delivery" },
      { de: "kostenlos", tr: "ücretsiz", en: "free" },
      { de: "das Paket", tr: "kargo paketi", en: "parcel" },
    ],
    minutes: 3,
    text:
      "Ihre Bestellung — online\n\nIm Warenkorb:\n— 2× Zahnpasta … 4,00 Euro\n— 1× Shampoo … 3,50 Euro\n— 1× Creme … 8,00 Euro\n— 1× Seife … 1,50 Euro\n\nZusammen: 17,00 Euro\n\nDie Lieferung ist kostenlos. Das Paket kommt in 2 bis 3 Tagen.\n\nSie sind nicht zu Hause? Dann geht das Paket zur Post.\n\nEine Frage? Klicken Sie hier an.",
    questions: [
      {
        text: "Was kostet die Lieferung?",
        options: ["nichts, sie ist kostenlos", "1,50 Euro", "17,00 Euro"],
        answer: 0,
        explain: "„Die Lieferung ist kostenlos.“ 17 Euro ürünlerin toplamı.",
      },
      {
        kind: "gapfill",
        text: "Das Paket kommt in 2 bis ___ Tagen.",
        options: [],
        answer: 0,
        accept: ["3", "drei"],
        explain: "„Das Paket kommt in 2 bis 3 Tagen.“",
      },
      {
        text: "Was passiert, wenn niemand zu Hause ist?",
        options: ["Das Paket geht zur Post", "Das Paket kommt am Samstag", "Die Lieferung kostet mehr"],
        answer: 0,
        explain: "„Dann geht das Paket zur Post.“",
      },
      {
        text: "Wie viele Zahnpasta sind im Warenkorb?",
        options: ["zwei", "eine", "drei"],
        answer: 0,
        explain: "„2× Zahnpasta“.",
      },
          {
        kind: "gapfill",
        text: "Die ___ ist kostenlos.",
        options: [],
        answer: 0,
        accept: ["Lieferung"],
        explain: "„Die Lieferung ist kostenlos.“",
      },
],
  },
  {
    id: "a1-u13-l1",
    level: "A1",
    skill: "listening",
    unit: 13,
    title: "Entschuldigung, wo ist …?",
    genre: "Diyalog",
    intro: "Sokakta yol soruluyor. Yönleri takip et.",
    gloss: [
      { de: "links", tr: "sol", en: "left" },
      { de: "rechts", tr: "sağ", en: "right" },
    ],
    minutes: 2,
    segments: [
      { text: "Entschuldigung, wo ist die Post?" },
      { text: "Gehen Sie geradeaus, dann rechts." },
      { text: "Und dann?" },
      { text: "Die Post ist links, zwischen der Bäckerei und dem Kiosk." },
      { text: "Wie lange dauert das zu Fuß?" },
      { text: "Fünf Minuten. Oder Sie fahren mit dem Bus, Linie 3." },
    ],
    questions: [
      {
        text: "Was sucht die Person?",
        options: ["die Post", "den Bahnhof", "die Bäckerei"],
        answer: 0,
        explain: "„wo ist die Post?“",
      },
      {
        text: "Wo genau ist die Post?",
        options: [
          "links, zwischen der Bäckerei und dem Kiosk",
          "rechts neben dem Bahnhof",
          "geradeaus am Marktplatz",
        ],
        answer: 0,
        explain: "„Die Post ist links, zwischen der Bäckerei und dem Kiosk.“",
      },
      {
        kind: "gapfill",
        text: "Zu Fuß dauert es ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["fünf", "5"],
        explain: "„Fünf Minuten.“",
      },
      {
        text: "Welche Linie kann man nehmen?",
        options: ["Linie 3", "Linie 5", "die U-Bahn"],
        answer: 0,
        explain: "„Oder Sie fahren mit dem Bus, Linie 3.“",
      },
          {
        kind: "gapfill",
        text: "Die Post ist ___, zwischen der Bäckerei und dem Kiosk.",
        options: [],
        answer: 0,
        accept: ["links"],
        explain: "„Die Post ist links, zwischen der Bäckerei und dem Kiosk.“",
      },
],
  },
  {
    id: "a1-u13-l2",
    level: "A1",
    skill: "listening",
    unit: 13,
    title: "In der Drogerie",
    genre: "Diyalog",
    intro: "Drogeride bir müşteri bir şey arıyor.",
    gloss: [
      { de: "die Seife", tr: "sabun", en: "soap" },
      { de: "das Taschentuch", tr: "kâğıt mendil", en: "tissue" },
    ],
    minutes: 2,
    segments: [
      { text: "Entschuldigung, wo finde ich Zahnpasta?" },
      { text: "Zahnpasta und Seife sind da rechts." },
      { text: "Danke. Haben Sie auch Taschentücher?" },
      { text: "Ja, die sind links, zwischen Papier und Seife." },
      { text: "Gut. Und was kostet dieses Shampoo?" },
      { text: "Das kostet 3,50 Euro." },
    ],
    questions: [
      {
        text: "Was sucht der Kunde zuerst?",
        options: ["Zahnpasta", "Shampoo", "Seife"],
        answer: 0,
        explain: "„wo finde ich Zahnpasta?“",
      },
      {
        text: "Wo sind die Taschentücher?",
        options: ["links, zwischen Papier und Seife", "rechts bei der Zahnpasta", "an der Kasse"],
        answer: 0,
        explain: "„die sind links, zwischen Papier und Seife.“",
      },
      {
        kind: "gapfill",
        text: "Das Shampoo kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["3,50", "3.50"],
        explain: "„Das kostet 3,50 Euro.“",
      },
      {
        text: "Richtig oder falsch? Zahnpasta und Seife sind zusammen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Zahnpasta und Seife sind da rechts.“ — ikisi de sağda.",
      },
          {
        kind: "gapfill",
        text: "Zahnpasta und ___ sind da rechts.",
        options: [],
        answer: 0,
        accept: ["Seife"],
        explain: "„Zahnpasta und Seife sind da rechts.“",
      },
],
  },
  {
    id: "a1-u13-w1",
    level: "A1",
    skill: "writing",
    unit: 13,
    title: "Den Weg beschreiben",
    genre: "Dil bilgisi",
    intro: "Yol tarifi ve ulaşım cümleleri.",
    gloss: [
      { de: "geradeaus", tr: "dosdoğru", en: "straight ahead" },
      { de: "fahren", tr: "araçla gitmek", en: "to go (by vehicle)" },
      { de: "die Haltestelle", tr: "durak", en: "stop" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Dosdoğru gidin, sonra sağa.",
        answer: "Gehen Sie geradeaus, dann rechts",
        hint: "Yol tarifinde emir kipi kullanılır ve resmî hitapta fiil ÖNDE: „Gehen Sie …“",
      },
      {
        kind: "build",
        tr: "Otobüsle gidiyorum.",
        answer: "Ich fahre mit dem Bus",
        hint: "Araçla gitmek „fahren“; araç „mit dem/der“ ile gelir: mit dem Bus, mit der Bahn. Yürümek ise „gehen“.",
      },
      {
        kind: "rewrite",
        prompt: "Soruyu kibar biçimde sor (Entschuldigung ile başlat).",
        source: "Wo ist der Bahnhof?",
        answer: "Entschuldigung, wo ist der Bahnhof?",
        alternatives: ["Entschuldigung, wo ist der Bahnhof"],
        why: "Yabancıya soru sorarken „Entschuldigung“ ile başlamak Almancada neredeyse zorunludur.",
      },
    ],
  },
  {
    id: "a1-u13-w2",
    level: "A1",
    skill: "writing",
    unit: 13,
    title: "Den Weg erklären",
    genre: "Mesaj",
    intro: "Bir arkadaşına evine nasıl geleceğini yaz.",
    gloss: [
      { de: "der Weg", tr: "yol", en: "way" },
      { de: "dauern", tr: "sürmek", en: "to take (time)" },
      { de: "die Linie", tr: "hat", en: "line" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Teslimat iki gün sürüyor.",
        answer: "Die Lieferung dauert zwei Tage",
        hint: "„dauern“ süre bildirir ve Akkusativ alır: dauert zwei Tage, dauert eine Stunde.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşına evine nasıl geleceğini yaz (4-5 cümle). En az iki yön ver, bir ulaşım aracı ve süre söyle.",
        stimulus:
          "Hallo! Ich komme am Samstag zu dir. Wie komme ich zu deiner Wohnung? Fahre ich mit dem Bus oder gehe ich zu Fuß? Tom",
        minWords: 30,
        checklist: [
          "En az iki yön verdin mi? (geradeaus, links, rechts)",
          "Bir ulaşım aracı yazdın mı? (mit dem Bus, mit der Bahn, zu Fuß)",
          "Süre verdin mi? (Es dauert … Minuten.)",
          "Bir yer adı kullandın mı? (die Bäckerei, die Post, der Marktplatz …)",
        ],
        phrases: [
          { de: "Geh geradeaus, dann links.", tr: "Dosdoğru git, sonra sola.", en: "Go straight, then left." },
          { de: "Es dauert … Minuten.", tr: "… dakika sürüyor.", en: "It takes … minutes." },
          { de: "Die Haltestelle ist …", tr: "Durak …", en: "The stop is …" },
        ],
        sample:
          "Hallo Tom,\n\nvom Bahnhof gehst du geradeaus. Nach der Post gehst du links.\n\nMeine Wohnung ist rechts, zwischen einer Bäckerei und einem Kiosk.\n\nZu Fuß dauert es zehn Minuten. Mit dem Bus geht es schneller: Linie 7, die Haltestelle ist vor der Post.\n\nBis Samstag!\nElif",
      },
    ],
  },
];
