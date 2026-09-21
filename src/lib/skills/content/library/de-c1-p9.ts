import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 9.
 *
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 9 hafıza ve teknoloji hattı: bir forum tartışması, bir uygulama
 * kılavuzu, bir forum katkısı. Dil bilgisi odak ve olumsuzlama parçacıkları —
 * cümlenin neyi öne çıkardığını belirleyen küçük sözcükler.
 */
export const deC1P9: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r9",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Forum: Was wir auslagern, verlernen wir",
    genre: "forum",
    intro: "Uzun bir forum başlığı: hafızayı cihaza devretmek yetenek kaybı mı, yoksa yer açma mı.",
    gloss: [
      { de: "auslagern", tr: "dışarıya devretmek", en: "to outsource" },
      { de: "die Fähigkeit", tr: "beceri", en: "ability" },
      { de: "die Leistung", tr: "başarım", en: "achievement" },
      { de: "die Kapazität", tr: "kapasite", en: "capacity" },
      { de: "abnehmen", tr: "azalmak", en: "to decrease" },
      { de: "die Abhängigkeit", tr: "bağımlılık", en: "dependency" },
    ],
    minutes: 10,
    text:
      "Thema: Was wir auslagern, verlernen wir\n\n" +
      "mko: Seit ich navigiere statt zu suchen, finde ich in meiner eigenen Stadt Wege nicht " +
      "mehr, die ich früher im Schlaf gegangen bin. Das ist kein Gefühl, das ist messbar: " +
      "Ich bin letzte Woche zweimal falsch abgebogen, auf einer Strecke, die ich zehn Jahre " +
      "gefahren bin.\n\n" +
      "ela_w: Dass eine Fähigkeit abnimmt, wenn man sie nicht nutzt, ist trivial. " +
      "Interessant wäre, ob dabei etwas anderes gewinnt. Ich merke mir keine Telefonnummern " +
      "mehr, dafür merke ich mir, wo ich was finde — und das ist auch eine Leistung, " +
      "nur eine andere.\n\n" +
      "mko: Nur ist die zweite Leistung wertlos, sobald das Gerät weg ist. Die erste war es nicht.\n\n" +
      "tobi.h: Genau das halte ich für das eigentliche Argument, und zwar nicht nur in Bezug " +
      "auf Wege. Ein Arzt, der ohne Datenbank keine Diagnose mehr stellt, ist nicht schlechter " +
      "als früher — er ist nur anders abhängig. Die Frage ist, ob wir diese Abhängigkeit " +
      "bewusst eingehen oder ob sie uns einfach passiert.\n\n" +
      "ela_w: Das ist fair. Aber ich würde dann auch fragen, was die alte Fähigkeit " +
      "vorausgesetzt hat. Sich Wege zu merken war nie umsonst; es hat Kapazität gekostet, " +
      "die woanders gefehlt hat. Wir reden über den Verlust und nie über den Preis, " +
      "den wir vorher gezahlt haben.\n\n" +
      "mko: Der Preis war aber sichtbar. Der jetzige ist es nicht, und genau das macht mich " +
      "misstrauisch.\n\n" +
      "tobi.h: Damit sind wir bei der einzigen Frage, die sich praktisch beantworten lässt: " +
      "Welche Fähigkeit will ich behalten, auch wenn ich sie nicht brauche? " +
      "Alles andere ist Geschmack.",
    questions: [
      {
        text: "Was beobachtet mko an sich selbst?",
        options: [
          "Er findet bekannte Wege nicht mehr.",
          "Er vergisst Termine.",
          "Er fährt langsamer als früher.",
        ],
        answer: 0,
        explain: "On yıl gittiği bir güzergâhta iki kez yanlış dönmüş.",
      },
      {
        text: "Was hält ela_w dem entgegen?",
        options: [
          "dass die Beobachtung falsch ist",
          "dass an anderer Stelle eine neue Fähigkeit entsteht",
          "dass Navigation genauer ist",
        ],
        answer: 1,
        explain: "Numara yerine nerede ne bulacağını hatırlıyor; bu da bir beceri.",
      },
      {
        kind: "truefalse",
        text: "tobi.h hält den Arzt mit Datenbank für schlechter als früher.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„er ist nicht schlechter als früher — er ist nur anders abhängig“.",
      },
      {
        kind: "gapfill",
        text: "mko ist auf einer Strecke falsch abgebogen, die er ___ Jahre gefahren ist.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„auf einer Strecke, die ich zehn Jahre gefahren bin“.",
      },
      {
        kind: "short_answer",
        text: "Welche Frage hält tobi.h für praktisch beantwortbar?",
        options: [],
        answer: 0,
        accept: [
          "welche Fähigkeit man behalten will",
          "welche Fähigkeit ich behalten will",
          "was man behalten will",
        ],
        explain: "„Welche Fähigkeit will ich behalten, auch wenn ich sie nicht brauche?“",
      },
      {
        text: "Was wirft ela_w der Debatte vor?",
        options: [
          "Sie redet nur über den Verlust, nie über den früheren Preis.",
          "Sie übertreibt die Rolle der Technik.",
          "Sie beruht auf falschen Zahlen.",
        ],
        answer: 0,
        explain: "Yolları ezberlemek de kapasite maliyeti taşıyordu.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l9",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Anleitung: Ein Archiv für sich selbst",
    genre: "guide",
    intro: "Bir sesli kılavuz: kişisel not ve belge arşivini nasıl kurmalı, hangi hatalar tekrarlanıyor.",
    gloss: [
      { de: "das Archiv", tr: "arşiv", en: "archive" },
      { de: "die Ablage", tr: "dosyalama", en: "filing" },
      { de: "die Struktur", tr: "yapı", en: "structure" },
      { de: "wiederfinden", tr: "yeniden bulmak", en: "to find again" },
      { de: "der Aufwand", tr: "emek", en: "effort" },
      { de: "verzichten", tr: "vazgeçmek", en: "to do without" },
    ],
    minutes: 10,
    segments: [
      { text: "Wer ein persönliches Archiv aufbaut, macht fast immer denselben Fehler: Er beginnt mit der Struktur." },
      { text: "Ordner werden angelegt, Kategorien erfunden, und nach drei Monaten passt die Hälfte des Materials in keine davon." },
      { speaker: "Frau Dr. Petri", text: "Eine Struktur ist eine Antwort. Aber am Anfang kennt man die Frage noch nicht, und deshalb ist jede frühe Struktur eine Wette." },
      { text: "Der zweite Fehler ist die Vollständigkeit. Wer alles aufhebt, hebt nichts auf, weil das Wiederfinden am Volumen scheitert." },
      { text: "Empfohlen wird deshalb ein umgekehrtes Vorgehen: erst sammeln, dann drei Monate warten, dann ordnen — und zwar nur das, was in dieser Zeit tatsächlich gesucht wurde." },
      { speaker: "Frau Dr. Petri", text: "Das klingt nach Faulheit, ist aber das Gegenteil. Man verschiebt den Aufwand dorthin, wo er nachweislich etwas bringt." },
      { text: "Drittens: ein einziges Suchfeld schlägt jede Ordnerhierarchie, sofern die Dateinamen brauchbar sind. Der Name ist die eigentliche Ablage." },
      { text: "Und schließlich: Auf Versionen kann man fast immer verzichten, auf das Datum im Dateinamen nie." },
      { speaker: "Frau Dr. Petri", text: "Wenn Sie nur eine Regel übernehmen, dann diese. Alles andere ist Geschmack, das Datum ist Handwerk." },
    ],
    questions: [
      {
        text: "Welchen Fehler machen laut Beitrag fast alle?",
        options: [
          "Sie beginnen mit der Struktur.",
          "Sie werfen zu viel weg.",
          "Sie benutzen keine Ordner.",
        ],
        answer: 0,
        explain: "Erken kurulan yapı bir bahis; malzemenin yarısı ona uymuyor.",
      },
      {
        text: "Was wird stattdessen empfohlen?",
        options: [
          "erst sammeln, dann nach drei Monaten ordnen",
          "sofort alles löschen",
          "eine Struktur vom Fachmann kaufen",
        ],
        answer: 0,
        explain: "Ve yalnız o süre içinde gerçekten aranan şeyi düzenlemek.",
      },
      {
        kind: "truefalse",
        text: "Laut Beitrag ist der Dateiname die eigentliche Ablage.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„ein einziges Suchfeld schlägt jede Ordnerhierarchie“ — asıl dosyalama addır.",
      },
      {
        kind: "gapfill",
        text: "Man soll ___ Monate warten, bevor man ordnet.",
        options: [],
        answer: 0,
        accept: ["drei", "3"],
        explain: "„erst sammeln, dann drei Monate warten, dann ordnen“.",
      },
      {
        kind: "short_answer",
        text: "Worauf darf man laut Beitrag nie verzichten?",
        options: [],
        answer: 0,
        accept: ["auf das Datum", "das Datum", "auf das Datum im Dateinamen"],
        explain: "„auf das Datum im Dateinamen nie“.",
      },
      {
        text: "Warum ist das Vorgehen laut Frau Dr. Petri keine Faulheit?",
        options: [
          "Der Aufwand wird dorthin verschoben, wo er nachweislich wirkt.",
          "Es kostet insgesamt mehr Zeit.",
          "Es ist wissenschaftlich vorgeschrieben.",
        ],
        answer: 0,
        explain: "Emek işe yaradığı yere kaydırılıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w9",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Antwort im Forum",
    genre: "forum",
    intro: "Bir forum tartışmasına katılıyorsun: önce iki cümle kur, sonra bir ayrım getiren katkı yaz.",
    gloss: [
      { de: "die Unterscheidung", tr: "ayrım", en: "distinction" },
      { de: "der Beitrag", tr: "katkı", en: "post" },
      { de: "zuspitzen", tr: "keskinleştirmek", en: "to sharpen" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "der Einzelfall", tr: "tekil durum", en: "individual case" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Sorun yalnız unutmak değil, geri dönüşü olmaması.",
        answer: "Das Problem ist nicht nur das Vergessen, sondern seine Unumkehrbarkeit.",
        alternatives: ["Nicht nur das Vergessen ist das Problem, sondern seine Unumkehrbarkeit."],
        hint: "„nicht nur … sondern“ ikinci öğeyi öne çıkarır; „auch“ eklenebilir.",
      },
      {
        kind: "build",
        tr: "Bu durum hiçbir şekilde herkes için geçerli değil.",
        answer: "Das gilt keineswegs für alle.",
        alternatives: ["Keineswegs gilt das für alle."],
        hint: "„keineswegs“ güçlü bir olumsuzlamadır ve „nicht“ten daha kesin durur.",
      },
      {
        kind: "free",
        prompt:
          "Bir forum tartışmasına katkı yaz: hangi iki konuma yanıt verdiğini söyle, tartışmayı ilerleten bir ayrım getir, ayrımı bir örnekle göster, karşı tarafa hak verdiğin noktayı kabul et ve tartışmaya bir soru bırak.",
        checklist: [
          "Hangi konumlara yanıt verdiğini yaz",
          "Bir ayrım getir ve tanımla",
          "Ayrımı bir örnekle göster",
          "Bir noktada hak ver ve bir soru bırak",
        ],
        minWords: 140,
        phrases: [
          { de: "Ich lese hier zwei Positionen, die sich weniger widersprechen, als es scheint.", tr: "Burada göründüğünden daha az çelişen iki konum okuyorum.", en: "I read two positions here that contradict each other less than it seems." },
          { de: "Hilfreich fände ich die Unterscheidung zwischen … und …", tr: "… ile … arasındaki ayrımı yararlı bulurdum", en: "I would find the distinction between … and … helpful." },
          { de: "Konkret heißt das: …", tr: "Somut olarak bu şu demek: …", en: "Concretely, that means: …" },
          { de: "Zugeben muss ich allerdings, dass …", tr: "Ama şunu kabul etmeliyim: …", en: "I do have to admit, however, that …" },
          { de: "Offen bleibt für mich, ob …", tr: "Benim için açık kalan şey: … olup olmadığı", en: "What remains open for me is whether …" },
        ],
        sample:
          "Ich lese hier zwei Positionen, die sich weniger widersprechen, als es scheint. " +
          "mko beschreibt einen Verlust, ela_w eine Verschiebung — beides kann gleichzeitig zutreffen. " +
          "Hilfreich fände ich die Unterscheidung zwischen Fähigkeiten, die sich jederzeit " +
          "zurückholen lassen, und solchen, bei denen der Weg zurück praktisch versperrt ist. " +
          "Konkret heißt das: Telefonnummern kann ich mir wieder merken, sobald ich will; " +
          "die Kenntnis einer Stadt dagegen entsteht nur im Laufe von Jahren und nebenbei, " +
          "und wer sie einmal nicht mehr aufbaut, holt sie als Erwachsener kaum nach. " +
          "Das Problem ist also nicht nur das Vergessen, sondern seine Unumkehrbarkeit. " +
          "Zugeben muss ich allerdings, dass diese Grenze unscharf ist und im Einzelfall " +
          "schwer zu ziehen; sie gilt keineswegs für alle Fähigkeiten gleich. " +
          "Offen bleibt für mich, ob man das vorher überhaupt erkennen kann. " +
          "Wusste jemand um 2010, dass Orientierung in diese zweite Kategorie fällt? " +
          "Falls nicht, dann hilft auch der beste Vorsatz wenig, und wir reden über eine Frage, " +
          "die sich immer erst im Rückblick beantworten lässt.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s9",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Welche Fähigkeit würdest du behalten?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir seçim yap ve seçimini bir ölçütle savun.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Teknolojiye devredebileceğin ama devretmek istemediğin bir beceri seç. Seçimini tanımla, ölçütünü söyle, kendi tutarsızlığını kabul et ve bunu nasıl sürdürdüğünü anlat.",
      bulletsTr: [
        "Hangi beceriyi seçtiğini söyle",
        "Neden tam onu seçtiğini bir ölçütle açıkla",
        "Kendi tutarsızlığını kabul et",
        "Bunu pratikte nasıl sürdürdüğünü anlat",
      ],
      targets: [
        { de: "Behalten würde ich ausgerechnet …", tr: "Tam da …'i saklardım" },
        { de: "Mein Kriterium ist dabei nicht …, sondern …", tr: "Ölçütüm … değil, …" },
        { de: "Widersprüchlich ist daran, dass …", tr: "Bunun çelişkili yanı şu: …" },
        { de: "Praktisch halte ich das so: …", tr: "Pratikte şöyle yapıyorum: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Behalten würde ich ausgerechnet das Kopfrechnen, obwohl es die Fähigkeit ist, " +
        "die am leichtesten zu ersetzen wäre. " +
        "Mein Kriterium ist dabei nicht die Nützlichkeit, sondern die Frage, ob mir das " +
        "Verfahren zeigt, wann ein Ergebnis nicht stimmen kann. " +
        "Wer im Kopf überschlägt, merkt sofort, dass eine Zahl um den Faktor zehn daneben liegt; " +
        "wer nur abliest, merkt es nie, und genau dieser Fehler ist der teuerste. " +
        "Widersprüchlich ist daran, dass ich dieselbe Logik bei der Rechtschreibung nicht " +
        "anwende. Dort korrigiere ich seit Jahren automatisch und habe deutlich verlernt, " +
        "ein falsches Wort selbst zu erkennen — obwohl auch hier gilt, dass ich einen Fehler " +
        "nur bemerke, wenn ich ihn bemerken kann. " +
        "Ehrlicherweise ist meine Auswahl also keine Regel, sondern eine Gewohnheit, " +
        "die ich nachträglich begründe. " +
        "Praktisch halte ich das so, dass ich jede Zahl, die ich irgendwo eintrage, " +
        "vorher einmal grob im Kopf schätze. Das kostet zwei Sekunden und hat mich " +
        "in diesem Jahr dreimal vor einem Fehler bewahrt, der sonst niemandem aufgefallen wäre.",
      rubricHint:
        "Bir ölçüt, kendi tutarsızlığının kabulü ve somut bir uygulama beklenir; „ausgerechnet“, „nicht …, sondern“ ve „widersprüchlich ist daran, dass“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g9",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "nicht nur, keineswegs, ausgerechnet",
    genre: "grammar",
    intro: "Küçük sözcükler cümlenin neyi öne çıkardığını ve olumsuzlamanın neye değdiğini belirler.",
    focus: "Odak parçacıkları ve olumsuzlamanın kapsamı",
    gloss: [
      { de: "die Begründung", tr: "gerekçe", en: "justification" },
      { de: "gelten", tr: "geçerli olmak", en: "to apply" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "verlangen", tr: "talep etmek", en: "to demand" },
      { de: "die Aussage", tr: "ifade", en: "statement" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Odak parçacığı neyi vurguluyor?",
        tr: "„nur“, „auch“, „sogar“, „gerade“, „ausgerechnet“ kendi başlarına anlam taşımaz; ARKALARINDAKİ ögeyi öne çıkarırlar. Yerleri değişince cümlenin anlamı da değişir: „Nur er hat das gesagt“ ile „Er hat nur das gesagt“ iki ayrı iddiadır. Bu yüzden yazıda parçacığın yeri dikkatle seçilir.",
        examples: [
          { de: "Nur er hat das gesagt.", tr: "Bunu yalnız o söyledi.", note: "odak: kişi" },
          { de: "Er hat nur das gesagt.", tr: "O yalnız bunu söyledi.", note: "odak: söylenen" },
          { de: "Ausgerechnet er hat zugestimmt.", tr: "Tam da o onay verdi.", note: "beklenmedik olan vurgulanıyor" },
        ],
      },
      {
        heading: "nicht nur … sondern auch",
        tr: "„nicht nur … sondern auch“ iki öğeyi ekler ve ağırlığı İKİNCİSİNE verir. „sondern“ burada düzeltme değil ekleme bildirir, bu yüzden arkasından „auch“ gelir. „nicht … sondern“ (auch'suz) ise düzeltmedir: birincisi reddedilir.",
        examples: [
          { de: "Das betrifft nicht nur die Zahlen, sondern auch die Begründung.", tr: "Bu yalnız sayıları değil, gerekçeyi de ilgilendiriyor.", note: "ekleme" },
          { de: "Das Problem ist nicht die Zahl, sondern ihre Begründung.", tr: "Sorun sayı değil, gerekçesi.", note: "düzeltme" },
          { de: "Er hat nicht nur zugehört, sondern auch widersprochen.", tr: "Yalnız dinlemedi, itiraz da etti.", note: "iki fiil" },
        ],
      },
      {
        heading: "Olumsuzlamanın kapsamı ve güçlü biçimler",
        tr: "„nicht“ neyi olumsuzladığını YERİYLE söyler: „Ich habe das nicht gesagt“ eylemi, „Nicht ich habe das gesagt“ özneyi olumsuzlar. Güçlü olumsuzlamalar bir derece ekler: „keineswegs“ (hiçbir şekilde), „keinesfalls“ (kesinlikle olmaz), „alles andere als“ (… olmaktan çok uzak). „ohnehin“ ve „allenfalls“ ise sınırlama getirir.",
        examples: [
          { de: "Das gilt keineswegs für alle.", tr: "Bu hiçbir şekilde herkes için geçerli değil.", note: "güçlü olumsuzlama" },
          { de: "Nicht ich habe das verlangt.", tr: "Bunu ben talep etmedim.", note: "özne olumsuzlanıyor" },
          { de: "Die Aussage ist allenfalls eine Vermutung.", tr: "İfade olsa olsa bir tahmindir.", note: "sınırlama" },
        ],
      },
    ],
    questions: [
      {
        text: "„Nur er hat das gesagt.“ — Was wird betont?",
        options: ["die Person", "das Gesagte", "der Zeitpunkt"],
        answer: 0,
        explain: "Parçacık arkasındaki ögeyi öne çıkarır; burada özne.",
      },
      {
        text: "Welcher Satz fügt hinzu statt zu korrigieren?",
        options: [
          "Das Problem ist nicht die Zahl, sondern ihre Begründung.",
          "Das betrifft nicht nur die Zahlen, sondern auch die Begründung.",
          "Das ist keineswegs die Begründung.",
        ],
        answer: 1,
        explain: "„nicht nur … sondern auch“ ekleme bildirir.",
      },
      {
        text: "„Die Aussage ist allenfalls eine Vermutung.“ — Was bedeutet das?",
        options: [
          "Sie ist höchstens eine Vermutung.",
          "Sie ist sicher eine Vermutung.",
          "Sie ist keine Vermutung.",
        ],
        answer: 0,
        explain: "„allenfalls“ üst sınır koyar: olsa olsa.",
      },
      {
        kind: "gapfill",
        text: "Das gilt ___ für alle. (starke Verneinung)",
        options: [],
        answer: 0,
        accept: ["keineswegs"],
        explain: "„keineswegs“ „nicht“ten daha kesin bir olumsuzlamadır.",
      },
      {
        kind: "gapfill",
        text: "Er hat nicht nur zugehört, ___ auch widersprochen.",
        options: [],
        answer: 0,
        accept: ["sondern"],
        explain: "„nicht nur“ her zaman „sondern auch“ ile tamamlanır.",
      },
      {
        kind: "gapfill",
        text: "___ er hat zugestimmt — damit hatte niemand gerechnet.",
        options: [],
        answer: 0,
        accept: ["Ausgerechnet", "ausgerechnet"],
        explain: "Beklenmedik olanı öne çıkarmak için „ausgerechnet“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "___ ich habe das verlangt, sondern die Abteilung.",
        options: [],
        answer: 0,
        accept: ["Nicht", "nicht"],
        explain: "Olumsuzlama özneye değiyorsa „nicht“ onun önüne gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das", "betrifft", "nicht nur", "die Zahlen", "sondern auch die Begründung"],
        explain: "Odak parçacığı vurgulanan ögenin önünde, ikinci öge „sondern auch“ ile gelir.",
      },
      {
        kind: "truefalse",
        text: "„Er hat nur das gesagt.“ und „Nur er hat das gesagt.“ bedeuten dasselbe.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Parçacığın yeri odağı değiştirir: biri söyleneni, öteki kişiyi sınırlar.",
      },
      {
        kind: "truefalse",
        text: "„Das gilt keineswegs für alle.“ — Bu cümle bir olumsuzlama mı?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„keineswegs“ güçlü bir olumsuzlamadır ve ayrıca „nicht“ istemez.",
      },
    ],
  },
];
