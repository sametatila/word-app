import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 13 — "Sebep hangi kayıtta söyleniyor?".
 *
 * Dört ders: Warum geht das nicht? · Morgen schon Realität? ·
 * Wegen des Wetters, trotz allem · Aufgrund der Lage. Almanca aynı nedeni iki
 * ayrı kayıtta söylüyor: günlük dilde wegen ve trotz, resmî dilde aufgrund,
 * infolge ve angesichts. İki teknoloji dersi de bu iki kaydın canlı örneği —
 * biri kullanıcının sinirli anlatımı, öteki üreticinin ölçülü tahmini.
 *
 *   Ünite 13: abstürzen, das Endgerät, das Ladegerät, die Stromversorgung,
 *             der Virenschutz, freischalten, blockieren, kabellos ·
 *             sich durchsetzen, der Prototyp, der Sensor, die Fernsteuerung,
 *             der Halbleiter, die Elektromobilität, die Ladestation,
 *             serienreif · das Unwetter, der Niederschlag, der Hagel,
 *             der Frost, das Tauwetter, die Temperaturschwankung,
 *             der Umstand, betreffen · die Maßnahme, angesichts,
 *             die Bekanntmachung, erlassen, aussetzen, vorübergehend,
 *             gegebenenfalls, ordnungsgemäß
 *   Kalıplar: Man löst es, indem man … · … dürfte sich durchsetzen ·
 *             Es bleibt abzuwarten, … · wegen + Genitiv · trotz + Genitiv ·
 *             aufgrund + Genitiv · infolge + Genitiv
 *
 * Kayıt farkı ölçülebilir bir şey: aynı olay "wegen des Sturms" ile mahalleye,
 * "aufgrund der Wetterlage" ile ilan panosuna yazılır. Ünite bu yüzden aynı
 * içeriği iki kayıtta yazdırıyor.
 */
export const b2U13: SkillExercise[] = [
  {
    id: "b2-u13-r1",
    level: "B2",
    skill: "reading",
    unit: 13,
    title: "Amtliche Bekanntmachung",
    genre: "Resmî duyuru",
    intro: "Bir belediyenin resmî duyurusu. Aynı bilgi günlük dilde nasıl söylenirdi?",
    gloss: [
      { de: "die Maßnahme", tr: "tedbir", en: "measure" },
      { de: "angesichts", tr: "karşısında", en: "in view of" },
      { de: "die Bekanntmachung", tr: "resmî duyuru", en: "public notice" },
      { de: "erlassen", tr: "yürürlüğe koymak", en: "to issue" },
      { de: "aussetzen", tr: "askıya almak", en: "to suspend" },
      { de: "vorübergehend", tr: "geçici", en: "temporary" },
      { de: "gegebenenfalls", tr: "gerekirse", en: "if necessary" },
      { de: "ordnungsgemäß", tr: "kurallara uygun", en: "in due form" },
    ],
    minutes: 6,
    text:
      "STADT WEIDENBACH — BEKANNTMACHUNG NR. 14/2026\n\n" +
      "Aufgrund der anhaltenden Trockenheit wird für das Stadtgebiet eine vorübergehende Allgemeinverfügung erlassen. Sie tritt am Tag nach dieser Bekanntmachung in Kraft und gilt zunächst bis zum 30. September.\n\n" +
      "1. Infolge der niedrigen Pegelstände wird die Entnahme von Wasser aus Bächen und Teichen ausgesetzt. Dies betrifft auch das Gießen von Gärten und Grünflächen zwischen 8 und 20 Uhr.\n\n" +
      "2. Angesichts der Waldbrandgefahr ist offenes Feuer im gesamten Stadtwald untersagt. Grillplätze bleiben bis auf Weiteres geschlossen.\n\n" +
      "3. Die Maßnahmen können gegebenenfalls verlängert oder vorzeitig aufgehoben werden. Die Entscheidung wird ortsüblich bekannt gemacht.\n\n" +
      "4. Zuwiderhandlungen können mit einem Bußgeld geahndet werden. Anträge auf Ausnahmen sind schriftlich und ordnungsgemäß begründet an das Umweltamt zu richten; über sie wird innerhalb von zehn Arbeitstagen entschieden.\n\n" +
      "Hinweis: Diese Verfügung ersetzt die Bekanntmachung Nr. 9/2026. Wer bereits eine Ausnahme nach der alten Verfügung besitzt, muss keinen neuen Antrag stellen.\n\n" +
      "Weidenbach, den 3. August 2026 — Der Bürgermeister",
    questions: [
      {
        kind: "gapfill",
        text: "___ der anhaltenden Trockenheit wird eine Allgemeinverfügung erlassen.",
        options: [],
        answer: 0,
        accept: ["Aufgrund"],
        explain: "Resmî kayıtta neden aufgrund + genitif ile verilir; günlük dilde wegen olurdu.",
      },
      {
        text: "Was gilt für das Gießen von Gärten?",
        options: [
          "Es ist zwischen 8 und 20 Uhr betroffen.",
          "Es ist rund um die Uhr erlaubt.",
          "Es ist vollständig verboten.",
        ],
        answer: 0,
        explain: "„Dies betrifft auch das Gießen von Gärten und Grünflächen zwischen 8 und 20 Uhr.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann gilt die Verfügung zunächst?",
        options: [],
        answer: 0,
        accept: ["bis zum 30. September", "30. September", "bis 30.9."],
        explain: "„…gilt zunächst bis zum 30. September.“",
      },
      {
        text: "Wer bereits eine Ausnahme nach der alten Verfügung hat, …",
        options: [
          "muss einen neuen Antrag stellen.",
          "muss keinen neuen Antrag stellen.",
          "verliert sie automatisch.",
        ],
        answer: 1,
        explain: "„Wer bereits eine Ausnahme nach der alten Verfügung besitzt, muss keinen neuen Antrag stellen.“",
      },
      {
        text: "Über Ausnahmeanträge wird innerhalb von zehn Arbeitstagen entschieden.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „…über sie wird innerhalb von zehn Arbeitstagen entschieden.“",
      },
    ],
  },

  {
    id: "b2-u13-r2",
    level: "B2",
    skill: "reading",
    unit: 13,
    title: "Morgen schon Realität?",
    genre: "Teknoloji yazısı",
    intro: "Gelecek teknolojileri üzerine ölçülü bir yazı. Tahmin bildiren kiplere dikkat et.",
    gloss: [
      { de: "sich durchsetzen", tr: "yaygınlaşmak", en: "to catch on" },
      { de: "der Prototyp", tr: "prototip", en: "prototype" },
      { de: "der Sensor", tr: "sensör", en: "sensor" },
      { de: "die Fernsteuerung", tr: "uzaktan kontrol", en: "remote control" },
      { de: "der Halbleiter", tr: "yarı iletken", en: "semiconductor" },
      { de: "die Elektromobilität", tr: "elektrikli ulaşım", en: "electric mobility" },
      { de: "die Ladestation", tr: "şarj istasyonu", en: "charging station" },
      { de: "serienreif", tr: "seri üretime hazır", en: "ready for production" },
    ],
    minutes: 6,
    text:
      "MORGEN SCHON REALITÄT?\n\n" +
      "Zwischen einem funktionierenden Prototyp und einem serienreifen Produkt liegen im Schnitt sieben Jahre. Wer das im Kopf behält, liest Technikmeldungen deutlich ruhiger.\n\n" +
      "Der Prototyp muss nämlich nur einmal funktionieren, und zwar unter guten Bedingungen. Serienreif heißt: hunderttausendmal, bei Frost und Hitze, gebaut aus Teilen, die es tatsächlich zu kaufen gibt. Genau daran scheitern die meisten Ankündigungen — nicht an der Idee, sondern am Halbleiter, den es in dieser Menge nicht gibt.\n\n" +
      "Zwei Beispiele. Sensoren in Verpackungen, die den Zustand von Lebensmitteln melden, gibt es seit fünfzehn Jahren im Labor. Durchgesetzt haben sie sich nicht, weil sie pro Packung mehr kosten als das Lebensmittel darin. Die Technik war nie das Problem.\n\n" +
      "Die Elektromobilität dagegen dürfte sich weiter durchsetzen, aber langsamer, als die Zahlen der letzten Jahre nahelegen. Der Grund steht selten in den Meldungen: Es fehlt nicht an Fahrzeugen, sondern an Ladestationen dort, wo Menschen ohne eigene Garage wohnen. Das ist kein technisches, sondern ein Verteilungsproblem.\n\n" +
      "Und die Fernsteuerung von Maschinen über große Entfernungen? Technisch längst möglich, rechtlich in weiten Teilen ungeklärt. Es bleibt abzuwarten, wer im Schadensfall haftet — solange das offen ist, kauft kein Betrieb so ein System.\n\n" +
      "Die nützlichste Frage bei jeder Technikmeldung lautet deshalb nicht „geht das?“, sondern „was fehlt noch außer der Technik?“.",
    questions: [
      {
        text: "Wie lange dauert es im Schnitt vom Prototyp zur Serienreife?",
        options: ["ein Jahr", "sieben Jahre", "fünfzehn Jahre"],
        answer: 1,
        explain: "„Zwischen einem funktionierenden Prototyp und einem serienreifen Produkt liegen im Schnitt sieben Jahre.“",
      },
      {
        kind: "gapfill",
        text: "Die Elektromobilität ___ sich weiter durchsetzen.",
        options: [],
        answer: 0,
        accept: ["dürfte"],
        explain: "dürfte öznel kip olarak tahmin bildirir: 'yaygınlaşacak gibi görünüyor'.",
      },
      {
        kind: "short_answer",
        text: "Warum haben sich Sensoren in Verpackungen nicht durchgesetzt?",
        options: [],
        answer: 0,
        accept: ["sie sind zu teuer", "wegen der Kosten", "teurer als das Lebensmittel"],
        explain: "„…weil sie pro Packung mehr kosten als das Lebensmittel darin.“",
      },
      {
        text: "Woran fehlt es bei der Elektromobilität laut Text?",
        options: [
          "an Fahrzeugen",
          "an Ladestationen dort, wo Menschen ohne Garage wohnen",
          "an Halbleitern",
        ],
        answer: 1,
        explain: "„Es fehlt nicht an Fahrzeugen, sondern an Ladestationen dort, wo Menschen ohne eigene Garage wohnen.“",
      },
      {
        text: "Die Fernsteuerung von Maschinen ist technisch noch unmöglich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Technisch längst möglich, rechtlich in weiten Teilen ungeklärt.“",
      },
    ],
  },

  {
    id: "b2-u13-l1",
    level: "B2",
    skill: "listening",
    unit: 13,
    title: "Der Anruf beim Support",
    genre: "Telefon görüşmesi",
    intro: "Sinirli bir kullanıcı destek hattını arıyor. Çözüm nasıl anlatılıyor?",
    gloss: [
      { de: "abstürzen", tr: "çökmek", en: "to crash" },
      { de: "das Endgerät", tr: "uç cihaz", en: "end device" },
      { de: "das Ladegerät", tr: "şarj cihazı", en: "charger" },
      { de: "die Stromversorgung", tr: "elektrik beslemesi", en: "power supply" },
      { de: "der Virenschutz", tr: "virüs koruması", en: "antivirus" },
      { de: "freischalten", tr: "etkinleştirmek", en: "to unlock" },
      { de: "blockieren", tr: "engellemek", en: "to block" },
      { de: "kabellos", tr: "kablosuz", en: "wireless" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kullanıcı", text: "Das Programm stürzt seit dem Update jedes Mal beim Speichern ab. Das nervt." },
      { speaker: "Destek", text: "Verstehe. Passiert das auf einem Endgerät oder auf allen?" },
      { speaker: "Kullanıcı", text: "Auf dem Laptop. Auf dem Tablet läuft es." },
      { speaker: "Destek", text: "Dann liegt es wahrscheinlich am Virenschutz. Der blockiert seit dem Update den Schreibzugriff." },
      { speaker: "Kullanıcı", text: "Und wie löse ich das?" },
      { speaker: "Destek", text: "Man löst es, indem man den Ordner im Virenschutz freischaltet. Zwei Klicks." },
      { speaker: "Kullanıcı", text: "Warum macht das Update das überhaupt?" },
      { speaker: "Destek", text: "Weil sich der Speicherort geändert hat. Der neue Pfad ist dem Virenschutz unbekannt." },
      { speaker: "Kullanıcı", text: "Gut. Noch etwas: Der Laptop geht manchmal einfach aus." },
      { speaker: "Destek", text: "Das ist ein anderes Thema. Hängt er dabei am Ladegerät?" },
      { speaker: "Kullanıcı", text: "Meistens nicht. Ich arbeite kabellos, auch die Maus." },
      { speaker: "Destek", text: "Dann prüfen wir zuerst die Stromversorgung, bevor wir etwas anderes vermuten." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Destek görevlisinin çözümü anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Man löst es, indem man den Ordner im Virenschutz freischaltet."],
        explain: "indem yöntemi verir; man öznesi yan cümlede tekrarlanır.",
      },
      {
        text: "Auf welchem Gerät tritt der Fehler auf?",
        options: ["auf dem Tablet", "auf dem Laptop", "auf beiden"],
        answer: 1,
        explain: "„Auf dem Laptop. Auf dem Tablet läuft es.“",
      },
      {
        kind: "short_answer",
        text: "Warum blockiert der Virenschutz?",
        options: [],
        answer: 0,
        accept: ["der Speicherort hat sich geändert", "neuer Pfad", "wegen des neuen Pfads"],
        explain: "„Weil sich der Speicherort geändert hat. Der neue Pfad ist dem Virenschutz unbekannt.“",
      },
      {
        text: "Was wird beim zweiten Problem zuerst geprüft?",
        options: ["der Virenschutz", "die Stromversorgung", "das Update"],
        answer: 1,
        explain: "„Dann prüfen wir zuerst die Stromversorgung, bevor wir etwas anderes vermuten.“",
      },
      {
        text: "Der Laptop hängt beim Ausgehen meistens am Ladegerät.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Meistens nicht. Ich arbeite kabellos.“",
      },
    ],
  },

  {
    id: "b2-u13-l2",
    level: "B2",
    skill: "listening",
    unit: 13,
    title: "Wegen des Wetters",
    genre: "Diyalog",
    intro: "Hava yüzünden bir plan değişiyor. Neden ile rağmen arasındaki farkı dinle.",
    gloss: [
      { de: "das Unwetter", tr: "fırtına", en: "storm" },
      { de: "der Niederschlag", tr: "yağış", en: "precipitation" },
      { de: "der Hagel", tr: "dolu", en: "hail" },
      { de: "der Frost", tr: "don", en: "frost" },
      { de: "das Tauwetter", tr: "karların erimesi", en: "thaw" },
      { de: "die Temperaturschwankung", tr: "sıcaklık dalgalanması", en: "temperature swing" },
      { de: "der Umstand", tr: "koşul", en: "circumstance" },
      { de: "betreffen", tr: "ilgilendirmek", en: "to affect" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Gero", text: "Wegen des Unwetters am Samstag müssen wir umplanen. Der Platz steht unter Wasser." },
      { speaker: "Hanne", text: "Trotz des Regens? Ich dachte, der Boden zieht das weg." },
      { speaker: "Gero", text: "Normalerweise ja. Aber nach dem Frost letzte Woche ist der Boden noch dicht." },
      { speaker: "Hanne", text: "Ach so. Und jetzt kommt das Tauwetter dazu." },
      { speaker: "Gero", text: "Genau. Diese Temperaturschwankungen sind das eigentliche Problem, nicht der Niederschlag allein." },
      { speaker: "Hanne", text: "War auch Hagel dabei? Bei mir hat es aufs Dach geprasselt." },
      { speaker: "Gero", text: "Kurz, ja. Schaden gab es aber keinen, nur Lärm." },
      { speaker: "Hanne", text: "Und was heißt das für Samstag? Betrifft es alle Gruppen?" },
      { speaker: "Gero", text: "Nur die beiden draußen. Die Halle ist trocken, die läuft normal." },
      { speaker: "Hanne", text: "Trotz allem also nicht absagen, sondern verlegen." },
      { speaker: "Gero", text: "So sehe ich das auch. Unter diesen Umständen ist Verlegen ehrlicher als Absagen." },
      { speaker: "Hanne", text: "Gut, ich schreibe den Eltern heute Abend." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Gero'nun planı neden değiştirmek gerektiğini söylediği ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Wegen des Unwetters am Samstag müssen wir umplanen."],
        explain: "wegen genitif ister: des Unwetters. Günlük kaydın neden edatı.",
      },
      {
        text: "Warum zieht der Boden das Wasser nicht weg?",
        options: [
          "weil er nach dem Frost noch dicht ist",
          "weil zu wenig Regen gefallen ist",
          "weil der Platz zu klein ist",
        ],
        answer: 0,
        explain: "„Aber nach dem Frost letzte Woche ist der Boden noch dicht.“",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Gero das eigentliche Problem?",
        options: [],
        answer: 0,
        accept: ["die Temperaturschwankungen", "Temperaturschwankungen", "Frost und Tauwetter"],
        explain: "„Diese Temperaturschwankungen sind das eigentliche Problem, nicht der Niederschlag allein.“",
      },
      {
        text: "Welche Gruppen sind betroffen?",
        options: ["alle", "nur die beiden draußen", "nur die Halle"],
        answer: 1,
        explain: "„Nur die beiden draußen. Die Halle ist trocken, die läuft normal.“",
      },
      {
        text: "Der Hagel hat Schaden angerichtet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Schaden gab es aber keinen, nur Lärm.“",
      },
    ],
  },

  {
    id: "b2-u13-w1",
    level: "B2",
    skill: "writing",
    unit: 13,
    title: "İki kayıt, aynı sebep",
    genre: "Cümle kurma",
    intro: "wegen ve trotz sokakta, aufgrund ve infolge ilan panosunda. İkisi de genitif ister.",
    gloss: [
      { de: "das Unwetter", tr: "fırtına", en: "storm" },
      { de: "aussetzen", tr: "askıya almak", en: "to suspend" },
      { de: "freischalten", tr: "etkinleştirmek", en: "to unlock" },
      { de: "sich durchsetzen", tr: "yaygınlaşmak", en: "to catch on" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Fırtına yüzünden yeniden planlamamız gerekiyor.",
        answer: "Wegen des Unwetters müssen wir umplanen",
        hint: "wegen genitif ister: des Unwetters. Günlük kayıt.",
      },
      {
        kind: "build",
        tr: "Yağmura rağmen dışarıda oynuyoruz.",
        answer: "Trotz des Regens spielen wir draußen",
        hint: "trotz de genitif ister ve beklenene karşıtlık kurar.",
      },
      {
        kind: "build",
        tr: "Düşük su seviyeleri nedeniyle su alımı askıya alınmıştır.",
        answer: "Infolge der niedrigen Pegelstände wird die Entnahme ausgesetzt",
        hint: "infolge sonucu vurgular ve resmî kayda aittir.",
      },
      {
        kind: "build",
        tr: "Klasörü virüs korumasında etkinleştirerek çözülür.",
        answer: "Man löst es, indem man den Ordner im Virenschutz freischaltet",
        hint: "indem yan cümlesinde özne tekrarlanır, fiil sona gider.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi resmî kayda taşı: nedeni aufgrund ile kur.",
        source: "Wegen der Trockenheit machen wir das Wasser aus den Bächen dicht.",
        answer: "Aufgrund der Trockenheit wird die Wasserentnahme aus den Bächen ausgesetzt.",
        alternatives: [
          "Aufgrund der Trockenheit wird die Entnahme von Wasser aus den Bächen ausgesetzt.",
          "Aufgrund der Trockenheit wird die Wasserentnahme aus den Bächen ausgesetzt",
        ],
        why: "Kayıt değişimi tek kelimeyle olmuyor: wegen aufgrund olurken fiil de edilgene geçiyor ve gündelik 'dicht machen' yerine terim 'aussetzen' geliyor. Resmî Almanca faili söylemeyip işlemi adlandırır — üç değişiklik birlikte yürür.",
      },
    ],
  },

  {
    id: "b2-u13-w2",
    level: "B2",
    skill: "writing",
    unit: 13,
    title: "Zweimal dieselbe Nachricht",
    genre: "Kayıt alıştırması",
    intro: "Aynı haberi iki kez yaz: bir kez arkadaşlara, bir kez ilan panosuna.",
    gloss: [
      { de: "die Bekanntmachung", tr: "resmî duyuru", en: "public notice" },
      { de: "vorübergehend", tr: "geçici", en: "temporary" },
      { de: "die Maßnahme", tr: "tedbir", en: "measure" },
      { de: "betreffen", tr: "ilgilendirmek", en: "to affect" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir etkinliğin ya da hizmetin geçici olarak durduğunu duyur — hava, tadilat, arıza, personel eksikliği, sen seç. Aynı haberi İKİ KEZ yaz. Önce gruba kısa ve gündelik: wegen ve trotz ile, doğrudan hitapla. Sonra ilan panosuna resmî: aufgrund, infolge ya da angesichts ile, edilgen ve adlaştırmayla, kimseye hitap etmeden. İçerik aynı kalsın; değişen yalnız kayıt olsun.",
        checklist: [
          "İki metin de aynı bilgiyi veriyor mu?",
          "Birincide wegen ya da trotz var mı?",
          "İkincide aufgrund, infolge ya da angesichts var mı?",
          "Resmî metinde doğrudan hitap kaldırılmış mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Wegen des Unwetters fällt … aus.", tr: "fırtına yüzünden … iptal", en: "due to the storm, … is cancelled" },
          { de: "Aufgrund der Wetterlage wird … ausgesetzt.", tr: "hava durumu nedeniyle … askıya alınır", en: "owing to the weather, … is suspended" },
          { de: "Die Maßnahme gilt vorübergehend.", tr: "tedbir geçicidir", en: "the measure applies temporarily" },
        ],
        sample:
          "AN DIE GRUPPE\n\n" +
          "Kurz zu Samstag: Wegen des Unwetters steht der Platz unter Wasser, wir müssen umplanen. Trotz des Regens fällt aber nichts aus — wir gehen in die Halle, gleiche Uhrzeit. Betroffen sind nur die beiden Außengruppen. Bringt bitte Hallenschuhe mit. Wenn sich etwas ändert, schreibe ich Freitagabend nochmal.\n\n" +
          "AUSHANG AM EINGANG\n\n" +
          "MITTEILUNG NR. 3\n\n" +
          "Aufgrund der Wetterlage wird der Trainingsbetrieb auf den Außenplätzen am Samstag, 12. September, vorübergehend ausgesetzt. Infolge der anhaltenden Niederschläge ist der Untergrund nicht nutzbar.\n\n" +
          "Die Maßnahme betrifft ausschließlich die Außenplätze. Der Hallenbetrieb findet unverändert statt; die Trainingszeiten bleiben bestehen.\n\n" +
          "Über eine Verlängerung oder vorzeitige Aufhebung wird gegebenenfalls am Freitag entschieden und an dieser Stelle bekannt gemacht.",
      },
    ],
  },
];
