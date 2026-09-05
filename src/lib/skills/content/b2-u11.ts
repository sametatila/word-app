import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 11 — "Sıfata sıkışan cümle".
 *
 * Dört ders: Die lachenden Kinder · Das gelöste Problem · KI im Alltag ·
 * Die neue Studie. İlk ikisi ortaç sıfatının iki yönünü kuruyor, son ikisi
 * onu ihtiyaç duyulan yerde çalıştırıyor: teknik metin ve araştırma özeti.
 *
 *   Ünite 11: die Innovation, die Neuerung, die Verfügbarkeit, wissenschaftlich,
 *             vielfältig, zeitgemäß, veraltet, aufwendig · das Verfahren,
 *             der Testlauf, die Handhabung, aktualisieren, ausführen,
 *             wiederherstellen, kompatibel, standardmäßig · automatisieren,
 *             der Algorithmus, die Anwendung, der Entwickler, die Rechenleistung,
 *             die Datenbank, der Roboter, programmieren · die Erkenntnis,
 *             die Meinungsumfrage, die Größenordnung, auswerten, ermitteln,
 *             signifikant, schätzungsweise, vergleichsweise
 *   Kalıplar: die steigenden Preise · die laufenden Kosten ·
 *             das entwickelte Verfahren · die getestete Methode ·
 *             … lässt sich automatisieren · Es bleibt zu fragen, … ·
 *             Die Untersuchung zeigt, dass … · Die Erkenntnis lautet: …
 *
 * Ortaç I sürer ve etkendir (steigende Preise: fiyatlar yükseliyor),
 * ortaç II biter ve edilgendir (getestete Methode: yöntem test edildi).
 * Türkçedeki "-en" ile "-mış/-dığı" ayrımı buna çok yakın durur — bu yüzden
 * ünite kuralı anlatmak yerine iki biçimi yan yana koyup seçtiriyor.
 */
export const b2U11: SkillExercise[] = [
  {
    id: "b2-u11-r1",
    level: "B2",
    skill: "reading",
    unit: 11,
    title: "Was sich automatisieren lässt",
    genre: "Popüler bilim yazısı",
    intro: "Yapay zekânın gündelik hayattaki yerini anlatan bir yazı. Sıfat öbeklerine dikkat et.",
    gloss: [
      { de: "automatisieren", tr: "otomatikleştirmek", en: "to automate" },
      { de: "der Algorithmus", tr: "algoritma", en: "algorithm" },
      { de: "die Anwendung", tr: "uygulama", en: "application" },
      { de: "der Entwickler", tr: "geliştirici", en: "developer" },
      { de: "die Rechenleistung", tr: "işlem gücü", en: "computing power" },
      { de: "die Datenbank", tr: "veri tabanı", en: "database" },
      { de: "der Roboter", tr: "robot", en: "robot" },
      { de: "programmieren", tr: "programlamak", en: "to program" },
    ],
    minutes: 6,
    text:
      "WAS SICH AUTOMATISIEREN LÄSST — UND WAS NICHT\n\n" +
      "Die meisten Menschen denken bei künstlicher Intelligenz an einen sprechenden Roboter. Die tatsächlich eingesetzten Anwendungen sehen anders aus: Sie sortieren Bewerbungen, schlagen Diagnosen vor und entscheiden, welcher Antrag zuerst bearbeitet wird.\n\n" +
      "Der entscheidende Punkt ist alt und einfach. Ein Algorithmus lernt aus den Daten, die man ihm gibt. Eine über zehn Jahre gefüllte Datenbank enthält die Entscheidungen dieser zehn Jahre — mit allen Fehlern. Wer sie zum Training benutzt, automatisiert nicht die beste Praxis, sondern die bisherige.\n\n" +
      "Zweitens: Rechenleistung ersetzt kein Ziel. Ein System lässt sich darauf trainieren, die Bearbeitungszeit zu senken. Ob dabei die richtigen Fälle schneller werden, steht auf einem anderen Blatt — das muss jemand vorher definieren, und dieser Jemand ist selten der Entwickler.\n\n" +
      "Drittens: Vieles lässt sich automatisieren, was sich nicht lohnt. Wer eine dreimal im Jahr anfallende Aufgabe programmieren lässt, zahlt mehr für die Pflege als für die Handarbeit. Die Frage ist nie „geht das?“, sondern „wie oft passiert das?“.\n\n" +
      "Es bleibt zu fragen, wer haftet, wenn eine automatisierte Entscheidung falsch ist. Bisher lautet die Antwort meist: die Person, die sie hätte prüfen sollen — also jemand, dem man gleichzeitig sagt, er solle dem System vertrauen. Das ist keine technische Lücke, sondern eine organisatorische.",
    questions: [
      {
        kind: "gapfill",
        text: "Vieles ___ sich automatisieren, was sich nicht lohnt.",
        options: [],
        answer: 0,
        accept: ["lässt"],
        explain: "lassen artı dönüşlü zamir, edilgen yerine geçer: 'otomatikleştirilebilir'.",
      },
      {
        text: "Warum automatisiert man mit alten Daten nicht die beste Praxis?",
        options: [
          "weil alte Daten zu klein sind",
          "weil die Datenbank die bisherigen Entscheidungen samt Fehlern enthält",
          "weil Algorithmen keine Daten brauchen",
        ],
        answer: 1,
        explain: "„Eine über zehn Jahre gefüllte Datenbank enthält die Entscheidungen dieser zehn Jahre — mit allen Fehlern.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frage ist laut Text die richtige?",
        options: [],
        answer: 0,
        accept: ["wie oft passiert das", "wie oft das passiert", "wie häufig es vorkommt"],
        explain: "„Die Frage ist nie 'geht das?', sondern 'wie oft passiert das?'.“",
      },
      {
        text: "Wer haftet bisher meist für eine falsche automatisierte Entscheidung?",
        options: [
          "der Entwickler",
          "die Person, die sie hätte prüfen sollen",
          "niemand",
        ],
        answer: 1,
        explain: "„…die Person, die sie hätte prüfen sollen — also jemand, dem man gleichzeitig sagt, er solle dem System vertrauen.“",
      },
      {
        text: "Mehr Rechenleistung legt automatisch das richtige Ziel fest.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Rechenleistung ersetzt kein Ziel … das muss jemand vorher definieren.“",
      },
    ],
  },

  {
    id: "b2-u11-r2",
    level: "B2",
    skill: "reading",
    unit: 11,
    title: "Was die Studie wirklich sagt",
    genre: "Araştırma özeti",
    intro: "Bir araştırmanın basına yansıyan hâli ile gerçek bulguları karşılaştırılıyor.",
    gloss: [
      { de: "die Erkenntnis", tr: "bulgu", en: "finding" },
      { de: "die Meinungsumfrage", tr: "kamuoyu araştırması", en: "opinion poll" },
      { de: "die Größenordnung", tr: "büyüklük mertebesi", en: "order of magnitude" },
      { de: "auswerten", tr: "çözümlemek", en: "to analyse" },
      { de: "ermitteln", tr: "tespit etmek", en: "to determine" },
      { de: "signifikant", tr: "anlamlı", en: "significant" },
      { de: "schätzungsweise", tr: "tahminen", en: "estimated" },
      { de: "vergleichsweise", tr: "görece", en: "comparatively" },
    ],
    minutes: 6,
    text:
      "WAS DIE STUDIE WIRKLICH SAGT\n\n" +
      "„Jeder Zweite will das Auto abschaffen“ — so stand es vorige Woche in mehreren Zeitungen. Die zugrunde liegende Untersuchung sagt etwas deutlich Vorsichtigeres.\n\n" +
      "Zum Aufbau: Befragt wurden 2.104 Personen in vier Städten; ausgewertet wurden 1.987 Fragebögen. Es handelt sich also um eine Meinungsumfrage, nicht um eine Messung des Verhaltens. Menschen sagen in Umfragen regelmäßig, was sie für vernünftig halten, und tun anschließend etwas anderes.\n\n" +
      "Die zentrale Erkenntnis lautet: 48 Prozent der Befragten könnten sich vorstellen, in fünf Jahren ohne eigenes Auto zu leben, wenn Bus und Bahn zuverlässig verfügbar wären. Der zweite Halbsatz fehlt in fast allen Überschriften, obwohl er die eigentliche Bedingung enthält.\n\n" +
      "Signifikant ist das Ergebnis nur in den zwei größeren Städten. In den beiden kleineren liegt der Unterschied zur Vorjahresbefragung innerhalb der Fehlerspanne, ist also vergleichsweise schwach. Die Autoren schreiben das auch — auf Seite 34.\n\n" +
      "Zur Größenordnung: Ermittelt wurde außerdem, dass schätzungsweise 12 Prozent der Haushalte in diesen Städten heute schon kein Auto besitzen. Der Sprung von 12 auf 48 Prozent wäre also gewaltig, und genau deshalb sollte man die Bedingung mitlesen.\n\n" +
      "Fazit für Leser: Wer eine Zahl aus einer Studie sieht, sollte drei Dinge suchen — die Stichprobe, den Zeitraum und den Nebensatz.",
    questions: [
      {
        text: "Welche Bedingung fehlt in den Überschriften?",
        options: [
          "dass Bus und Bahn zuverlässig verfügbar wären",
          "dass die Befragten unter 40 sind",
          "dass die Studie fünf Jahre alt ist",
        ],
        answer: 0,
        explain: "„…wenn Bus und Bahn zuverlässig verfügbar wären. Der zweite Halbsatz fehlt in fast allen Überschriften.“",
      },
      {
        kind: "short_answer",
        text: "Wie viele Fragebögen wurden ausgewertet?",
        options: [],
        answer: 0,
        accept: ["1.987", "1987", "1987 Fragebögen"],
        explain: "„Befragt wurden 2.104 Personen … ausgewertet wurden 1.987 Fragebögen.“",
      },
      {
        text: "Wo ist das Ergebnis signifikant?",
        options: [
          "in allen vier Städten",
          "nur in den zwei größeren Städten",
          "nur in den zwei kleineren Städten",
        ],
        answer: 1,
        explain: "„Signifikant ist das Ergebnis nur in den zwei größeren Städten.“",
      },
      {
        kind: "gapfill",
        text: "Ermittelt wurde, dass ___ 12 Prozent der Haushalte heute kein Auto besitzen.",
        options: [],
        answer: 0,
        accept: ["schätzungsweise"],
        explain: "schätzungsweise sayının kesin değil tahmini olduğunu işaretler.",
      },
      {
        text: "Die Studie hat gemessen, wie sich die Befragten tatsächlich verhalten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Es handelt sich also um eine Meinungsumfrage, nicht um eine Messung des Verhaltens.“",
      },
    ],
  },

  {
    id: "b2-u11-l1",
    level: "B2",
    skill: "listening",
    unit: 11,
    title: "Die steigenden Kosten",
    genre: "Diyalog",
    intro: "Eski bir sistemin değişip değişmeyeceği konuşuluyor. Süren ile biten arasındaki farkı dinle.",
    gloss: [
      { de: "die Innovation", tr: "inovasyon", en: "innovation" },
      { de: "die Neuerung", tr: "yenilik", en: "novelty" },
      { de: "die Verfügbarkeit", tr: "kullanılabilirlik", en: "availability" },
      { de: "wissenschaftlich", tr: "bilimsel", en: "scientific" },
      { de: "vielfältig", tr: "çeşitli", en: "diverse" },
      { de: "zeitgemäß", tr: "çağa uygun", en: "up to date" },
      { de: "veraltet", tr: "eskimiş", en: "outdated" },
      { de: "aufwendig", tr: "zahmetli", en: "costly" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ruth", text: "Wir müssen über die steigenden Kosten reden. Die laufenden Ausgaben fressen das Budget." },
      { speaker: "Bilal", text: "Das liegt am System. Es ist veraltet, und jede Reparatur ist aufwendig." },
      { speaker: "Ruth", text: "Ein Ersatz kostet aber einmalig sehr viel." },
      { speaker: "Bilal", text: "Einmalig, ja. Danach sinken die laufenden Kosten deutlich." },
      { speaker: "Ruth", text: "Rechne mir das vor, nicht mit Gefühl, sondern nachvollziehbar." },
      { speaker: "Bilal", text: "Mache ich. Wichtig ist auch die Verfügbarkeit: Ersatzteile gibt es nur noch gebraucht." },
      { speaker: "Ruth", text: "Das ist ein Argument. Und was heißt zeitgemäß in diesem Fall?" },
      { speaker: "Bilal", text: "Nicht die neueste Innovation. Nur ein System, für das es noch Updates gibt." },
      { speaker: "Ruth", text: "Gut, denn eine Neuerung um der Neuerung willen zahle ich nicht." },
      { speaker: "Bilal", text: "Ich auch nicht. Die Auswahl ist vielfältig genug, wir nehmen das Langweiligste." },
      { speaker: "Ruth", text: "Gibt es dazu etwas Belastbares, wissenschaftlich oder wenigstens aus der Praxis?" },
      { speaker: "Bilal", text: "Zwei Erfahrungsberichte aus vergleichbaren Häusern. Ich schicke sie dir." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ruth'un konuyu açtığı ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Wir müssen über die steigenden Kosten reden."],
        explain: "steigend ortaç I sıfatı: masraf hâlâ yükseliyor, iş bitmiş değil.",
      },
      {
        text: "Warum ist die Verfügbarkeit ein Argument?",
        options: [
          "weil Ersatzteile nur noch gebraucht zu bekommen sind",
          "weil das System zu schnell läuft",
          "weil es keine Updates mehr braucht",
        ],
        answer: 0,
        explain: "„Ersatzteile gibt es nur noch gebraucht.“",
      },
      {
        kind: "short_answer",
        text: "Was heißt „zeitgemäß“ für Bilal?",
        options: [],
        answer: 0,
        accept: ["ein System mit Updates", "dass es Updates gibt", "noch unterstützt"],
        explain: "„Nicht die neueste Innovation. Nur ein System, für das es noch Updates gibt.“",
      },
      {
        text: "Was schickt Bilal an Ruth?",
        options: [
          "zwei Erfahrungsberichte aus vergleichbaren Häusern",
          "eine wissenschaftliche Studie",
          "ein Angebot des Herstellers",
        ],
        answer: 0,
        explain: "„Zwei Erfahrungsberichte aus vergleichbaren Häusern. Ich schicke sie dir.“",
      },
      {
        text: "Ruth will das neueste und innovativste System.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…eine Neuerung um der Neuerung willen zahle ich nicht.“",
      },
    ],
  },

  {
    id: "b2-u11-l2",
    level: "B2",
    skill: "listening",
    unit: 11,
    title: "Der Testlauf am Freitag",
    genre: "Diyalog",
    intro: "Yapılmış bir deneme çalışmasının sonucu konuşuluyor. Biten işler ortaç II ile anılıyor.",
    gloss: [
      { de: "das Verfahren", tr: "yöntem", en: "procedure" },
      { de: "der Testlauf", tr: "deneme çalışması", en: "test run" },
      { de: "die Handhabung", tr: "kullanım", en: "handling" },
      { de: "aktualisieren", tr: "güncellemek", en: "to update" },
      { de: "ausführen", tr: "çalıştırmak", en: "to execute" },
      { de: "wiederherstellen", tr: "geri yüklemek", en: "to restore" },
      { de: "kompatibel", tr: "uyumlu", en: "compatible" },
      { de: "standardmäßig", tr: "varsayılan olarak", en: "by default" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nils", text: "Wie war der Testlauf am Freitag?" },
      { speaker: "Yara", text: "Das getestete Verfahren funktioniert. Zwei Punkte sind offen." },
      { speaker: "Nils", text: "Welche?" },
      { speaker: "Yara", text: "Erstens die Handhabung. Drei von acht Leuten haben den zweiten Schritt nicht gefunden." },
      { speaker: "Nils", text: "Das ist viel. Liegt es an der Anleitung?" },
      { speaker: "Yara", text: "Teils. Die aktualisierte Anleitung war noch nicht verteilt, das war mein Fehler." },
      { speaker: "Nils", text: "Und zweitens?" },
      { speaker: "Yara", text: "Der Import ist nicht kompatibel mit den alten Dateien. Die müssen konvertiert werden." },
      { speaker: "Nils", text: "Wurde der Import überhaupt ausgeführt?" },
      { speaker: "Yara", text: "Ja, dreimal. Beim dritten Mal mit den konvertierten Dateien, da lief er sauber." },
      { speaker: "Nils", text: "Und wenn etwas schiefgeht? Kommen wir zurück?" },
      { speaker: "Yara", text: "Ja, der gesicherte Stand lässt sich in zwanzig Minuten wiederherstellen. Das haben wir geprüft." },
      { speaker: "Nils", text: "Gut. Ist die Konvertierung standardmäßig eingeschaltet?" },
      { speaker: "Yara", text: "Noch nicht. Genau das schlage ich für die nächste Version vor." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Yara'nın denemenin sonucunu özetlediği ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Das getestete Verfahren funktioniert."],
        explain: "getestet ortaç II sıfatı: test bitmiş, sonucu duruyor.",
      },
      {
        text: "Warum haben drei Leute den zweiten Schritt nicht gefunden?",
        options: [
          "weil das Verfahren nicht funktioniert",
          "unter anderem, weil die aktualisierte Anleitung nicht verteilt war",
          "weil der Import fehlschlug",
        ],
        answer: 1,
        explain: "„Die aktualisierte Anleitung war noch nicht verteilt, das war mein Fehler.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert die Wiederherstellung?",
        options: [],
        answer: 0,
        accept: ["zwanzig Minuten", "20 Minuten", "in zwanzig Minuten"],
        explain: "„…der gesicherte Stand lässt sich in zwanzig Minuten wiederherstellen.“",
      },
      {
        text: "Wann lief der Import sauber?",
        options: [
          "beim ersten Mal",
          "beim dritten Mal mit den konvertierten Dateien",
          "gar nicht",
        ],
        answer: 1,
        explain: "„Beim dritten Mal mit den konvertierten Dateien, da lief er sauber.“",
      },
      {
        text: "Die Konvertierung ist bereits standardmäßig eingeschaltet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Noch nicht. Genau das schlage ich für die nächste Version vor.“",
      },
    ],
  },

  {
    id: "b2-u11-w1",
    level: "B2",
    skill: "writing",
    unit: 11,
    title: "Süren mi, biten mi",
    genre: "Cümle kurma",
    intro: "Ortaç I sürer ve etkendir, ortaç II biter ve edilgendir. Doğru olanı seç.",
    gloss: [
      { de: "das Verfahren", tr: "yöntem", en: "procedure" },
      { de: "aufwendig", tr: "zahmetli", en: "costly" },
      { de: "automatisieren", tr: "otomatikleştirmek", en: "to automate" },
      { de: "auswerten", tr: "çözümlemek", en: "to analyse" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Yükselen masraflar bütçeyi bitiriyor.",
        answer: "Die steigenden Kosten fressen das Budget",
        hint: "Ortaç I: masraf hâlâ yükseliyor. Sıfat gibi çekimlenir.",
      },
      {
        kind: "build",
        tr: "Test edilen yöntem işe yarıyor.",
        answer: "Das getestete Verfahren funktioniert",
        hint: "Ortaç II: test bitmiş, edilgen anlam taşıyor.",
      },
      {
        kind: "build",
        tr: "Bu adım otomatikleştirilebilir.",
        answer: "Dieser Schritt lässt sich automatisieren",
        hint: "lassen artı dönüşlü zamir; mastar sonda.",
      },
      {
        kind: "build",
        tr: "1987 anket formu değerlendirildi.",
        answer: "Ausgewertet wurden 1.987 Fragebögen",
        hint: "Rapor dilinde ortaç öne çekilir, edilgen fiil arkasından gelir.",
      },
      {
        kind: "rewrite",
        prompt: "İlgi cümlesini ortaç sıfatına çevir ve doğru ortacı seç.",
        source: "Die Anleitung, die gerade aktualisiert wird, ist noch nicht verteilt.",
        answer: "Die gerade aktualisierte Anleitung ist noch nicht verteilt.",
        alternatives: ["Die gerade aktualisierte Anleitung ist noch nicht verteilt"],
        why: "İlgi cümlesi edilgen olduğu için ortaç II gerekir; ortaç I burada 'kılavuz güncelliyor' anlamına kayardı. Kural şu: edilgen ya da bitmiş iş ortaç II, süren ve etken iş ortaç I. Belirteç -gerade- ortacın önüne, artikelden sonraya taşınır.",
      },
    ],
  },

  {
    id: "b2-u11-w2",
    level: "B2",
    skill: "writing",
    unit: 11,
    title: "Der Testbericht",
    genre: "Deneme raporu",
    intro: "Bir denemenin sonucunu yaz: ne işledi, ne açık kaldı, ne öneriyorsun?",
    gloss: [
      { de: "der Testlauf", tr: "deneme çalışması", en: "test run" },
      { de: "die Erkenntnis", tr: "bulgu", en: "finding" },
      { de: "die Handhabung", tr: "kullanım", en: "handling" },
      { de: "ermitteln", tr: "tespit etmek", en: "to determine" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir denemenin ya da küçük bir araştırmanın sonucunu rapor et — yazılım denemesi, yeni bir çalışma yöntemi, evde denenmiş bir düzen, sen seç. Şu sırayı tut: ne denendi ve nasıl, ne işledi, ne açık kaldı, ne öneriyorsun. Biten işleri ortaç II sıfatıyla kısalt, süren durumları ortaç I ile ver. Sayı verirsen nereden geldiğini de söyle.",
        checklist: [
          "Denemenin kurulumu -kaç kişi, ne kadar süre- söylendi mi?",
          "En az bir ortaç II sıfatı var mı?",
          "En az bir ortaç I sıfatı var mı?",
          "Açık kalan noktalar ile öneri ayrı mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Das getestete Verfahren funktioniert.", tr: "test edilen yöntem işliyor", en: "the tested procedure works" },
          { de: "Offen bleiben zwei Punkte.", tr: "iki nokta açık kalıyor", en: "two points remain open" },
          { de: "Ermittelt wurde außerdem, dass …", tr: "ayrıca … tespit edildi", en: "it was also determined that …" },
        ],
        sample:
          "TESTLAUF NEUE ABLAGE — BERICHT\n\n" +
          "Aufbau. Getestet wurde vier Wochen lang mit acht Personen aus zwei Abteilungen. Ausgewertet wurden 214 abgelegte Vorgänge und ein kurzer Fragebogen.\n\n" +
          "Was funktioniert. Das getestete Verfahren funktioniert im Alltag. Die durchschnittliche Suchzeit sank von 2:40 auf 0:55 Minuten; ermittelt wurde das aus den protokollierten Zugriffen, nicht aus Selbsteinschätzungen.\n\n" +
          "Was offen bleibt. Die Handhabung ist noch zu kompliziert: Drei von acht Personen fanden den zweiten Schritt nicht. Die aktualisierte Anleitung lag beim Start nicht vor — das erklärt einen Teil, aber nicht alles. Außerdem sind die steigenden Dateigrößen ein Thema; der Import läuft mit alten Dateien nicht sauber.\n\n" +
          "Vorschlag. Zweiten Schritt umbenennen, Anleitung vorher verteilen, Konvertierung standardmäßig einschalten. Danach ein zweiter Testlauf mit denselben acht Personen — nur so ist der Unterschied vergleichbar.",
      },
    ],
  },
];
