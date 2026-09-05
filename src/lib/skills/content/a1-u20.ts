import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 20 — "Park, su, ekran ve kibarca hayır".
 *
 * Dört ders: Ein Tag im Park · Im Schwimmbad · Was läuft im Fernsehen? ·
 * Leider kann ich nicht. İçerik ünite 1-20'nin kelimeleriyle sınırlı.
 *
 *   Ünite 20: der Park, der See, die Wiese, das Picknick, der Baum,
 *             der Spielplatz, der Wald, der Fluss · das Schwimmbad,
 *             der Eintritt, das Handtuch, tauchen, tief, der Strand,
 *             das Meer, die Insel · die Sendung, der Kanal, die Serie,
 *             die Nachrichten, schauen, das Radio, die Zeitung, der Comic ·
 *             schade, klappen, diesmal, trotzdem, unbedingt, hoffen,
 *             vergessen, einverstanden sein
 *
 * KÜLTÜREL ÇEKİRDEK — dördüncü ders bu ünitenin en işe yarar parçası:
 * Almanca'da daveti reddetmek üç parçalıdır ve üçü de beklenir:
 *   1) "Leider kann ich nicht" — net bir hayır, muğlak bırakılmaz
 *   2) kısa bir GEREKÇE — "Ich muss arbeiten"
 *   3) SOMUT bir alternatif — "Geht es am Samstag?"
 * Türkçedeki "bakarız / belki" karşılığı burada kaba değil ama BOŞ sayılır:
 * karşı taraf yeni bir tarih bekler. Yazma görevi tam bu üç parçayı kurduruyor.
 *
 * "klappen" kişisel değil OLAY özneli kullanılır: "Es klappt nicht" —
 * "ich klappe nicht" denmez. Yazma görevinde ayrıca uyarılıyor.
 */
export const a1U20: SkillExercise[] = [
  {
    id: "a1-u20-r1",
    level: "A1",
    skill: "reading",
    unit: 20,
    title: "Ein Tag im Park",
    genre: "Bilgi tabelası",
    intro: "Parkın girişindeki tabela. Nerede ne var, ne yasak?",
    gloss: [
      { de: "die Wiese", tr: "çayır", en: "meadow" },
      { de: "der Spielplatz", tr: "oyun alanı", en: "playground" },
      { de: "der See", tr: "göl", en: "lake" },
      { de: "der Baum", tr: "ağaç", en: "tree" },
    ],
    minutes: 3,
    text:
      "STADTPARK — HERZLICH WILLKOMMEN\n\nDer Park ist von 6 bis 22 Uhr auf. Der Eintritt ist frei.\n\nDie große Wiese: Hier dürfen Sie Fußball spielen und ein Picknick machen.\n\nDer Spielplatz: für Kinder bis 12 Jahre. Direkt neben dem Café.\n\nDer See: Baden ist hier nicht erlaubt — das Wasser ist zu tief und zu kalt. Zum Schwimmen gehen Sie bitte ins Schwimmbad in der Bahnhofstraße.\n\nDer Wald hinter dem Fluss: Bitte gehen Sie nur auf dem Weg.\n\nBäume und Blumen sind für alle. Bitte nehmen Sie Ihren Müll wieder mit!",
    questions: [
      {
        text: "Wie viel kostet der Eintritt?",
        options: ["nichts", "zwei Euro", "nur für Kinder nichts"],
        answer: 0,
        explain: "„Der Eintritt ist frei.“ — Almanya'da şehir parkları ücretsizdir.",
      },
      {
        text: "Darf man im See schwimmen?",
        options: ["Nein", "Ja, immer", "Ja, aber nur im Sommer"],
        answer: 0,
        explain: "„Baden ist hier nicht erlaubt — das Wasser ist zu tief und zu kalt.“",
      },
      {
        kind: "gapfill",
        text: "Der Spielplatz ist für Kinder bis ___ Jahre.",
        options: [],
        answer: 0,
        accept: ["12"],
        explain: "„für Kinder bis 12 Jahre“",
      },
      {
        text: "Wo kann man ein Picknick machen?",
        options: ["auf der großen Wiese", "im Wald", "am See"],
        answer: 0,
        explain: "„Die große Wiese: Hier dürfen Sie Fußball spielen und ein Picknick machen.“",
      },
      {
        text: "Was soll man wieder mitnehmen?",
        options: ["den Müll", "die Blumen", "das Handtuch"],
        answer: 0,
        explain: "„Bitte nehmen Sie Ihren Müll wieder mit!“",
      },
    ],
  },
  {
    id: "a1-u20-r2",
    level: "A1",
    skill: "reading",
    unit: 20,
    title: "Was läuft heute Abend?",
    genre: "Program",
    intro: "Televizyon programı. Hangi kanalda ne var?",
    gloss: [
      { de: "die Sendung", tr: "program", en: "programme" },
      { de: "die Nachrichten", tr: "haberler", en: "the news" },
      { de: "die Serie", tr: "dizi", en: "series" },
      { de: "der Kanal", tr: "kanal", en: "channel" },
    ],
    minutes: 3,
    text:
      "HEUTE ABEND IM FERNSEHEN\n\nKanal 1\n19:00 Die Nachrichten\n19:30 Wetter für morgen\n20:15 Film: Eine Insel im Meer\n\nKanal 2\n19:15 Sport: Fußball\n20:15 Serie: Familie Berger\n21:00 Musik aus Berlin — ein Konzert\n\nKanal 3\n19:30 Ein Comic für Kinder\n20:15 Eine Sendung für Kinder\n21:00 Die Nachrichten\n\nSie haben keinen Fernseher? Alle Sendungen laufen auch im Radio oder im Internet.",
    questions: [
      {
        text: "Wann kommen die Nachrichten auf Kanal 1?",
        options: ["um 19 Uhr", "um 20:15 Uhr", "um 21 Uhr"],
        answer: 0,
        explain: "„Kanal 1 · 19:00 Die Nachrichten“. Kanal 3'te 21:00'de.",
      },
      {
        text: "Auf welchem Kanal läuft die Serie?",
        options: ["Kanal 2", "Kanal 1", "Kanal 3"],
        answer: 0,
        explain: "„20:15 Serie: Familie Berger“ — Kanal 2.",
      },
      {
        kind: "gapfill",
        text: "Der Film heißt „Eine ___ im Meer“.",
        options: [],
        answer: 0,
        accept: ["Insel"],
        explain: "„20:15 Film: Eine Insel im Meer“",
      },
      {
        text: "Richtig oder falsch? Um 20:15 Uhr beginnen drei Sendungen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: Film, Serie ve çocuk programı — üçü de 20:15. Almanya'da 20:15 klasik akşam saatidir.",
      },
    ],
  },
  {
    id: "a1-u20-l1",
    level: "A1",
    skill: "listening",
    unit: 20,
    title: "Im Schwimmbad",
    genre: "Gişe",
    intro: "Yüzme havuzunun gişesinde. Fiyat, saat, ne getirmeli?",
    gloss: [
      { de: "der Eintritt", tr: "giriş (ücreti)", en: "admission" },
      { de: "das Handtuch", tr: "havlu", en: "towel" },
      { de: "tief", tr: "derin", en: "deep" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag. Was kostet der Eintritt?" },
      { text: "Für Erwachsene 5 Euro, für Kinder 3 Euro." },
      { text: "Zweimal Erwachsene, bitte. Wie lange ist heute auf?" },
      { text: "Bis 20 Uhr. Das sind 10 Euro." },
      { text: "Danke. Kann man ein Handtuch kaufen?" },
      { text: "Ja, für 4 Euro. Und bitte nicht im tiefen Wasser tauchen!" },
    ],
    questions: [
      {
        kind: "gapfill",
        text: "Der Eintritt für Kinder kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["3", "drei"],
        explain: "„Für Erwachsene 5 Euro, für Kinder 3 Euro.“",
      },
      {
        text: "Wie viel zahlt die Person?",
        options: ["10 Euro", "5 Euro", "14 Euro"],
        answer: 0,
        explain: "İki yetişkin: 2 × 5 = 10 Euro. Havlu daha alınmadı.",
      },
      {
        text: "Bis wann ist das Schwimmbad heute auf?",
        options: ["bis 20 Uhr", "bis 22 Uhr", "bis 18 Uhr"],
        answer: 0,
        explain: "„Bis 20 Uhr.“",
      },
      {
        text: "Was ist nicht erlaubt?",
        options: ["im tiefen Wasser tauchen", "ein Handtuch kaufen", "mit Kindern kommen"],
        answer: 0,
        explain: "„Und bitte nicht im tiefen Wasser tauchen!“",
      },
    ],
  },
  {
    id: "a1-u20-l2",
    level: "A1",
    skill: "listening",
    unit: 20,
    title: "Leider kann ich nicht",
    genre: "Telefon",
    intro:
      "Bir davet reddediliyor. Almanca'da hayır demek üç parçalıdır: net hayır + gerekçe + SOMUT alternatif.",
    gloss: [
      { de: "schade", tr: "yazık", en: "what a pity" },
      { de: "klappen", tr: "olmak, denk gelmek", en: "to work out" },
      { de: "einverstanden", tr: "anlaştık, tamam", en: "agreed" },
    ],
    minutes: 2,
    segments: [
      { text: "Wir machen am Samstag ein Picknick im Park. Kommst du?" },
      { text: "Oh, leider kann ich nicht. Ich muss arbeiten." },
      { text: "Schade!" },
      { text: "Ja, diesmal klappt es nicht. Aber geht es am Sonntag?" },
      { text: "Am Sonntag? Ja, gern!" },
      { text: "Super, dann komme ich unbedingt. Vergiss es nicht: Sonntag um zwölf!" },
    ],
    questions: [
      {
        text: "Warum kann die Person am Samstag nicht kommen?",
        options: ["Sie muss arbeiten.", "Sie ist krank.", "Sie mag keine Picknicks."],
        answer: 0,
        explain: "„Leider kann ich nicht. Ich muss arbeiten.“ — hayırdan sonra GEREKÇE gelir.",
      },
      {
        text: "Welchen Tag sagt sie dann?",
        options: ["den Sonntag", "den Freitag", "nächste Woche"],
        answer: 0,
        explain:
          "„Aber geht es am Sonntag?“ — Almanca'da reddederken somut bir alternatif sunmak beklenir; „belki“ demek boş sayılır.",
      },
      {
        kind: "gapfill",
        text: "„Diesmal ___ es nicht.“",
        options: [],
        answer: 0,
        accept: ["klappt"],
        explain: "„Diesmal klappt es nicht.“ — özne ES, kişi değil.",
      },
      {
        text: "Wie endet das Gespräch?",
        options: ["Sie sind einverstanden.", "Sie streiten.", "Sie legen ohne Antwort auf."],
        answer: 0,
        explain: "„Einverstanden!“ — anlaşma kapanış sözcüğü.",
      },
    ],
  },
  {
    id: "a1-u20-w1",
    level: "A1",
    skill: "writing",
    unit: 20,
    title: "Nein sagen, aber richtig",
    genre: "Dil bilgisi",
    intro: "Reddetmenin üç parçasını tek tek kur.",
    gloss: [
      { de: "leider", tr: "maalesef", en: "unfortunately" },
      { de: "klappen", tr: "olmak, denk gelmek", en: "to work out" },
      { de: "schade", tr: "yazık", en: "what a pity" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Maalesef gelemiyorum.",
        answer: "Leider kann ich nicht kommen",
        hint: "„Leider“ başa gelince fiil hemen arkasından gelir: Leider KANN ich … Bu Almanca'nın ikinci-konum kuralı.",
      },
      {
        kind: "build",
        tr: "Bu sefer olmuyor.",
        answer: "Diesmal klappt es nicht",
        hint: "DİKKAT: özne „es“ — „ich klappe nicht“ DENMEZ. Olayın olup olmadığını anlatır, kişinin değil.",
      },
      {
        kind: "rewrite",
        prompt: "Bu boş cevabı somut bir alternatife çevir.",
        source: "Mal sehen.",
        answer: "Geht es am Sonntag?",
        alternatives: ["Geht es am Samstag?", "Hast du am Sonntag Zeit?", "Geht es am Sonntag"],
        why:
          "„Mal sehen“ Almanca'da kaba değil ama BOŞ sayılır — karşı taraf yeni bir tarih bekler. Somut gün sormak nezaketin kendisidir.",
      },
    ],
  },
  {
    id: "a1-u20-w2",
    level: "A1",
    skill: "writing",
    unit: 20,
    title: "Danke, aber leider …",
    genre: "Mesaj",
    intro: "Bir arkadaşın davetini reddet — ama kapıyı açık bırak.",
    gloss: [
      { de: "hoffen", tr: "ummak", en: "to hope" },
      { de: "trotzdem", tr: "yine de", en: "nevertheless" },
      { de: "unbedingt", tr: "mutlaka", en: "definitely" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir dahaki sefere mutlaka geleceğim.",
        answer: "Das nächste Mal komme ich unbedingt",
        hint: "Zaman ifadesi başa gelince yine fiil ikinci sırada: Das nächste Mal KOMME ich …",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın seni cumartesi göle piknige çağırdı ama gidemiyorsun. Mesaj yaz (4-5 cümle): teşekkür et, net bir hayır ver, gerekçeni söyle ve BAŞKA bir gün öner.",
        minWords: 30,
        checklist: [
          "Teşekkür ettin mi? (Danke für die Einladung!)",
          "NET bir hayır verdin mi? (Leider kann ich nicht …)",
          "Gerekçe yazdın mı? (Ich muss …)",
          "SOMUT bir gün önerdin mi? („vielleicht später“ yeterli değil)",
        ],
        phrases: [
          { de: "Danke für die Einladung!", tr: "Davet için teşekkürler!", en: "Thanks for the invitation!" },
          { de: "Leider kann ich nicht.", tr: "Maalesef gelemiyorum.", en: "Unfortunately I can't." },
          { de: "Geht es am Sonntag?", tr: "Pazar olur mu?", en: "Does Sunday work?" },
        ],
        sample:
          "Hallo Jonas,\n\ndanke für die Einladung! Ein Picknick am See ist eine schöne Idee.\n\nLeider kann ich am Samstag nicht. Ich muss am Samstag arbeiten — diesmal klappt es einfach nicht. Schade!\n\nAber geht es am Sonntag? Ich hoffe, das Wetter ist dann auch schön. Ich komme unbedingt.\n\nSchreib mir kurz. Bis dann!\nDein Ali",
      },
    ],
  },
];
