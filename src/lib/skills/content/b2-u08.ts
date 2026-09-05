import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 8 — "Kısaltmanın bedeli".
 *
 * Dört ders: Die große Wartung · Wer macht was beim Fest? ·
 * Hinter der Schlagzeile · Er sagte, er komme später. Dördü de aynı işi
 * yapıyor: uzun bir cümleyi kısaltıp faili arka plana itiyor — bir kez
 * edilgen yerine geçen yapılarla, bir kez kip fiiliyle, bir kez adlaştırmayla,
 * bir kez de dolaylı aktarımla.
 *
 *   Ünite 8: die Wartung, die Instandhaltung, der Verschleiß, sich abnutzen,
 *            das Ersatzteil, die Dichtung, die Korrosion, festziehen ·
 *            die Aufgabenverteilung, die Priorisierung, das Zeitfenster,
 *            die Stellvertretung, die Verpflegung, ausstatten, reibungslos,
 *            vorrangig · die Schlagzeile, die Titelseite, die Boulevardzeitung,
 *            die Auflage, die Auseinandersetzung, die Zuspitzung, reißerisch,
 *            tagesaktuell · angeblich, wiedergeben, der Kommentar,
 *            die Ankündigung, die Wortwahl, verbreiten, andeuten, erwidern
 *   Kalıplar: … ist auszutauschen · … lässt sich noch fahren ·
 *            Es muss noch … werden · Zunahme der … · Streit über … ·
 *            Er sagte, er komme … · laut … / angeblich …
 *
 * Kısaltmanın bedeli her seferinde aynı: bilgi düşer. Manşet "Streit über
 * Gebühren" der, kimin kiminle olduğunu söylemez. Bu ünite öğrenciye kısaltmayı
 * kurdurur ve arkasından düşen bilgiyi geri sordurur.
 */
export const b2U08: SkillExercise[] = [
  {
    id: "b2-u08-r1",
    level: "B2",
    skill: "reading",
    unit: 8,
    title: "Prüfliste vor dem Winter",
    genre: "Bakım kontrol listesi",
    intro: "Bir servis atölyesinin kış öncesi kontrol listesi. Kısa yazılmış: fail hiç geçmiyor.",
    gloss: [
      { de: "die Wartung", tr: "bakım", en: "maintenance" },
      { de: "die Instandhaltung", tr: "bakım onarım", en: "upkeep" },
      { de: "der Verschleiß", tr: "aşınma", en: "wear" },
      { de: "sich abnutzen", tr: "aşınmak", en: "to wear out" },
      { de: "das Ersatzteil", tr: "yedek parça", en: "spare part" },
      { de: "die Dichtung", tr: "conta", en: "seal" },
      { de: "die Korrosion", tr: "korozyon", en: "corrosion" },
      { de: "festziehen", tr: "sıkmak", en: "to tighten" },
    ],
    minutes: 6,
    text:
      "PRÜFLISTE — WARTUNG VOR DEM WINTER\n\n" +
      "Diese Liste gilt für alle Fahrzeuge im Fuhrpark. Sie ist bis zum 15. November abzuarbeiten.\n\n" +
      "1. Bremsen. Belag und Scheibe sind zu messen. Alles unter drei Millimetern ist auszutauschen, auch wenn das Fahrzeug sich noch fahren lässt. Hier wird nicht gerechnet, hier wird gewechselt.\n\n" +
      "2. Dichtungen. Teile, die sich abnutzen, gehören zur normalen Instandhaltung — bei Dichtungen ist das jedes zweite Jahr. Eine harte oder rissige Dichtung ist zu ersetzen. Das Ersatzteil ist im Lager vorrätig; falls nicht, ist es sofort zu bestellen.\n\n" +
      "3. Unterboden. Auf Korrosion ist besonders zu achten. Ein wenig Flugrost lässt sich behandeln, durchgerostete Stellen dagegen nicht — die gehen in die Werkstatt.\n\n" +
      "4. Schrauben. Alle Radschrauben lassen sich von Hand festziehen, aber nachgezogen wird mit dem Drehmomentschlüssel, nie nach Gefühl.\n\n" +
      "Hinweis zum Verschleiß: Wer einen Schaden findet, der nicht auf der Liste steht, trägt ihn unten ein. Die Liste wird jedes Jahr aus diesen Einträgen ergänzt — deshalb ist sie inzwischen vier Seiten lang und deshalb funktioniert sie.",
    questions: [
      {
        kind: "gapfill",
        text: "Alles unter drei Millimetern ist ___ (austauschen).",
        options: [],
        answer: 0,
        accept: ["auszutauschen"],
        explain: "sein + zu + mastar, edilgen yerine geçer: 'değiştirilmesi gerekir'. Ayrılabilen fiilde zu araya girer.",
      },
      {
        text: "Was gilt für Bremsen unter drei Millimetern?",
        options: [
          "Sie werden gewechselt, auch wenn das Fahrzeug noch fährt.",
          "Sie werden nur gewechselt, wenn das Fahrzeug steht.",
          "Sie werden vermessen und im Frühjahr erneut geprüft.",
        ],
        answer: 0,
        explain: "„…ist auszutauschen, auch wenn das Fahrzeug sich noch fahren lässt.“",
      },
      {
        kind: "short_answer",
        text: "Wie oft sind Dichtungen normalerweise fällig?",
        options: [],
        answer: 0,
        accept: ["jedes zweite Jahr", "alle zwei Jahre", "zweijährlich"],
        explain: "„…bei Dichtungen ist das jedes zweite Jahr.“",
      },
      {
        text: "Womit werden die Radschrauben nachgezogen?",
        options: ["von Hand", "mit dem Drehmomentschlüssel", "nach Gefühl"],
        answer: 1,
        explain: "„…nachgezogen wird mit dem Drehmomentschlüssel, nie nach Gefühl.“",
      },
      {
        text: "Die Liste ist kurz geblieben, weil nichts ergänzt wird.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Liste wird jedes Jahr aus diesen Einträgen ergänzt — deshalb ist sie inzwischen vier Seiten lang.“",
      },
    ],
  },

  {
    id: "b2-u08-r2",
    level: "B2",
    skill: "reading",
    unit: 8,
    title: "Vier Wörter, eine Titelseite",
    genre: "Medya eleştirisi",
    intro: "Manşet dilinin nasıl çalıştığını anlatan bir yazı: kısaltma neyi düşürüyor?",
    gloss: [
      { de: "die Schlagzeile", tr: "manşet", en: "headline" },
      { de: "die Titelseite", tr: "birinci sayfa", en: "front page" },
      { de: "die Boulevardzeitung", tr: "bulvar gazetesi", en: "tabloid" },
      { de: "die Auflage", tr: "tiraj", en: "circulation" },
      { de: "die Auseinandersetzung", tr: "çekişme", en: "dispute" },
      { de: "die Zuspitzung", tr: "tırmanma", en: "escalation" },
      { de: "reißerisch", tr: "sansasyonel", en: "sensationalist" },
      { de: "tagesaktuell", tr: "günü gününe güncel", en: "up to the minute" },
    ],
    minutes: 6,
    text:
      "VIER WÖRTER, EINE TITELSEITE\n\n" +
      "„Streit über Gebühren“. Vier Wörter, und die halbe Titelseite ist voll. Was steht da eigentlich? Ein Streit — aber zwischen wem? Über welche Gebühren? Seit wann? Die Schlagzeile sagt es nicht, und das ist kein Versehen.\n\n" +
      "Schlagzeilen werden nominalisiert, weil Nomen kürzer sind als Sätze. „Die Preise sind gestiegen“ braucht vier Wörter, „Anstieg der Preise“ drei — und passt in eine Zeile, die tagesaktuell gesetzt werden muss, oft in wenigen Minuten. Wer nominalisiert, spart Platz. Er spart aber auch das Subjekt ein, und damit die Frage, wer verantwortlich ist.\n\n" +
      "Genau deshalb lohnt es sich, Schlagzeilen zurückzuübersetzen. Aus „Zuspitzung der Lage“ wird „Die Lage hat sich zugespitzt“ — und sofort fragt man: wodurch? Aus „Auseinandersetzung im Stadtrat“ wird „Zwei Fraktionen haben gestritten“, und plötzlich hat der Streit Namen.\n\n" +
      "Das ist keine Frage von seriös gegen unseriös. Auch eine Boulevardzeitung mit hoher Auflage schreibt grammatisch dasselbe wie eine Wochenzeitung; der Unterschied liegt in der Wortwahl. Reißerisch wird es nicht durch die Nominalisierung, sondern durch die Wörter, die man hineinsetzt: „Chaos“ statt „Verzögerung“, „Skandal“ statt „Fehler“.\n\n" +
      "Ein Rat für Lernende: Lesen Sie eine Woche lang nur die Schlagzeilen und schreiben Sie jede als vollständigen Satz auf. Nach fünf Tagen lesen Sie deutsche Zeitungen anders — und Sie haben nebenbei zwanzig Nominalisierungen gelernt.",
    questions: [
      {
        text: "Warum werden Schlagzeilen nominalisiert?",
        options: [
          "weil Nomen kürzer sind als Sätze",
          "weil Nomen höflicher klingen",
          "weil Verben in Überschriften verboten sind",
        ],
        answer: 0,
        explain: "„Schlagzeilen werden nominalisiert, weil Nomen kürzer sind als Sätze.“",
      },
      {
        kind: "short_answer",
        text: "Welche Information geht beim Nominalisieren verloren?",
        options: [],
        answer: 0,
        accept: ["das Subjekt", "wer verantwortlich ist", "der Verantwortliche"],
        explain: "„Er spart aber auch das Subjekt ein, und damit die Frage, wer verantwortlich ist.“",
      },
      {
        kind: "gapfill",
        text: "Aus „Die Preise sind gestiegen“ wird „___ der Preise“.",
        options: [],
        answer: 0,
        accept: ["Anstieg", "Der Anstieg"],
        explain: "Adlaştırmada fiil ada döner, özne genitife geçer.",
      },
      {
        text: "Wodurch wird eine Schlagzeile laut Text reißerisch?",
        options: [
          "durch die Nominalisierung",
          "durch die Wortwahl",
          "durch die Auflage der Zeitung",
        ],
        answer: 1,
        explain: "„Reißerisch wird es nicht durch die Nominalisierung, sondern durch die Wörter, die man hineinsetzt.“",
      },
      {
        text: "Boulevardzeitungen benutzen grammatisch andere Überschriften als Wochenzeitungen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…schreibt grammatisch dasselbe wie eine Wochenzeitung; der Unterschied liegt in der Wortwahl.“",
      },
    ],
  },

  {
    id: "b2-u08-l1",
    level: "B2",
    skill: "listening",
    unit: 8,
    title: "Zwei Wochen bis zum Fest",
    genre: "Toplantı",
    intro: "Bir mahalle şenliğinin hazırlık toplantısı. Neyin öncelikli olduğuna dikkat et.",
    gloss: [
      { de: "die Aufgabenverteilung", tr: "görev dağılımı", en: "division of tasks" },
      { de: "die Priorisierung", tr: "önceliklendirme", en: "prioritisation" },
      { de: "das Zeitfenster", tr: "zaman aralığı", en: "time slot" },
      { de: "die Stellvertretung", tr: "vekâlet", en: "deputising" },
      { de: "die Verpflegung", tr: "yeme içme", en: "catering" },
      { de: "ausstatten", tr: "donatmak", en: "to equip" },
      { de: "reibungslos", tr: "sorunsuz", en: "smooth" },
      { de: "vorrangig", tr: "öncelikli", en: "priority" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nadja", text: "Zwei Wochen noch. Machen wir zuerst die Aufgabenverteilung, dann den Rest." },
      { speaker: "Kai", text: "Bevor wir verteilen: Was ist vorrangig? Sonst arbeiten wir wieder am Falschen." },
      { speaker: "Nadja", text: "Gute Priorisierung wäre: Strom, Verpflegung, Programm. In der Reihenfolge." },
      { speaker: "Kai", text: "Strom ist klar. Wir müssen sechs Stände mit Strom ausstatten, das kann nicht am Vortag passieren." },
      { speaker: "Nadja", text: "Es muss also bis Mittwoch bestellt werden. Wer übernimmt das?" },
      { speaker: "Kai", text: "Ich. Und wenn ich krank werde, brauchen wir eine Stellvertretung." },
      { speaker: "Nadja", text: "Dann Farida. Sie hat es letztes Jahr gemacht, es lief reibungslos." },
      { speaker: "Kai", text: "Einverstanden. Und die Verpflegung?" },
      { speaker: "Nadja", text: "Zwei Vereine kochen. Was noch fehlt, kann kurzfristig übernommen werden." },
      { speaker: "Kai", text: "Und der Aufbau? Wir haben nur ein Zeitfenster von sieben bis zehn." },
      { speaker: "Nadja", text: "Drei Stunden reichen, wenn vorher gepackt ist. Das ist die eigentliche Arbeit." },
      { speaker: "Kai", text: "Dann packen wir Freitagabend. Ich schreibe alles auf und schicke es rum." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Nadja'nın önceliklendirme sırasını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Gute Priorisierung wäre: Strom, Verpflegung, Programm."],
        explain: "Toplantı dilinde önce sıra, sonra dağıtım. Yazmadan önce sıralamak Kai'nin şartıydı.",
      },
      {
        text: "Warum will Kai vor der Verteilung priorisieren?",
        options: [
          "weil sonst am Falschen gearbeitet wird",
          "weil er wenig Zeit hat",
          "weil Nadja das letzte Jahr vergessen hat",
        ],
        answer: 0,
        explain: "„Bevor wir verteilen: Was ist vorrangig? Sonst arbeiten wir wieder am Falschen.“",
      },
      {
        kind: "short_answer",
        text: "Wie lang ist das Zeitfenster für den Aufbau?",
        options: [],
        answer: 0,
        accept: ["drei Stunden", "von sieben bis zehn", "3 Stunden"],
        explain: "„…nur ein Zeitfenster von sieben bis zehn“ — yani üç saat.",
      },
      {
        text: "Wer vertritt Kai, falls er ausfällt?",
        options: ["Nadja", "Farida", "niemand"],
        answer: 1,
        explain: "„Dann Farida. Sie hat es letztes Jahr gemacht, es lief reibungslos.“",
      },
      {
        text: "Der Strom kann auch noch am Vortag bestellt werden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…das kann nicht am Vortag passieren“, sipariş çarşambaya kadar verilmeli.",
      },
    ],
  },

  {
    id: "b2-u08-l2",
    level: "B2",
    skill: "listening",
    unit: 8,
    title: "Was genau hat er gesagt?",
    genre: "Diyalog",
    intro: "Toplantıda olmayan birine ne konuşulduğu aktarılıyor. Aktaran ile aktarılan sözü ayır.",
    gloss: [
      { de: "angeblich", tr: "iddiaya göre", en: "allegedly" },
      { de: "wiedergeben", tr: "aktarmak", en: "to relay" },
      { de: "der Kommentar", tr: "yorum", en: "comment" },
      { de: "die Ankündigung", tr: "duyuru", en: "announcement" },
      { de: "die Wortwahl", tr: "sözcük seçimi", en: "choice of words" },
      { de: "verbreiten", tr: "yaymak", en: "to spread" },
      { de: "andeuten", tr: "ima etmek", en: "to hint at" },
      { de: "erwidern", tr: "karşılık vermek", en: "to reply" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Timo", text: "Du warst doch drin. Was wurde gesagt?" },
      { speaker: "Bea", text: "Ich kann es nur ungenau wiedergeben, ich habe nicht mitgeschrieben." },
      { speaker: "Timo", text: "Reicht. Grob." },
      { speaker: "Bea", text: "Der Chef sagte, das Projekt laufe weiter, aber der Termin sei nicht zu halten." },
      { speaker: "Timo", text: "Hat er einen neuen genannt?" },
      { speaker: "Bea", text: "Nein. Er hat nur angedeutet, dass es Richtung Frühjahr geht." },
      { speaker: "Timo", text: "Und im Flur heißt es, das Projekt werde gestrichen." },
      { speaker: "Bea", text: "Das ist angeblich so, ja. Gesagt hat es niemand. Wir sollten das nicht weiter verbreiten." },
      { speaker: "Timo", text: "Kam eine offizielle Ankündigung?" },
      { speaker: "Bea", text: "Für Freitag ist eine angekündigt. Bis dahin ist alles nur Kommentar." },
      { speaker: "Timo", text: "Hat jemand widersprochen?" },
      { speaker: "Bea", text: "Rana. Sie erwiderte, ohne zweite Stelle sei der Frühjahrstermin genauso wenig zu halten." },
      { speaker: "Timo", text: "Und was hat er darauf gesagt?" },
      { speaker: "Bea", text: "Nichts Konkretes. Aber seine Wortwahl war vorsichtiger als sonst — das sagt schon etwas." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Bea'nın patronun söylediklerini ilk aktardığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Der Chef sagte, das Projekt laufe weiter, aber der Termin sei nicht zu halten."],
        explain: "Dolaylı aktarımda Konjunktiv I: laufe, sei. Aktaran mesafesini böyle koyuyor.",
      },
      {
        text: "Was hat der Chef zum neuen Termin gesagt?",
        options: [
          "Er hat einen festen Termin genannt.",
          "Er hat nur angedeutet, dass es Richtung Frühjahr geht.",
          "Er hat gesagt, das Projekt werde gestrichen.",
        ],
        answer: 1,
        explain: "„Er hat nur angedeutet, dass es Richtung Frühjahr geht.“",
      },
      {
        kind: "short_answer",
        text: "Wann kommt die offizielle Ankündigung?",
        options: [],
        answer: 0,
        accept: ["am Freitag", "Freitag", "für Freitag"],
        explain: "„Für Freitag ist eine angekündigt. Bis dahin ist alles nur Kommentar.“",
      },
      {
        text: "Was hat Rana erwidert?",
        options: [
          "dass der Frühjahrstermin ohne zweite Stelle auch nicht zu halten sei",
          "dass das Projekt gestrichen werde",
          "dass sie kündigen wolle",
        ],
        answer: 0,
        explain: "„Sie erwiderte, ohne zweite Stelle sei der Frühjahrstermin genauso wenig zu halten.“",
      },
      {
        text: "Jemand hat offiziell gesagt, das Projekt werde gestrichen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das ist angeblich so, ja. Gesagt hat es niemand.“",
      },
    ],
  },

  {
    id: "b2-u08-w1",
    level: "B2",
    skill: "writing",
    unit: 8,
    title: "Kısalt, sonra geri aç",
    genre: "Cümle kurma",
    intro: "Üç kısaltma yolu: sein + zu, adlaştırma ve dolaylı aktarım. Sonda biri geri açılıyor.",
    gloss: [
      { de: "die Dichtung", tr: "conta", en: "seal" },
      { de: "die Auseinandersetzung", tr: "çekişme", en: "dispute" },
      { de: "die Zuspitzung", tr: "tırmanma", en: "escalation" },
      { de: "erwidern", tr: "karşılık vermek", en: "to reply" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sert bir contanın değiştirilmesi gerekir.",
        answer: "Eine harte Dichtung ist zu ersetzen",
        hint: "sein + zu + mastar edilgen yerine geçer: 'werden zorunluluğu' anlamı verir.",
      },
      {
        kind: "build",
        tr: "Araç hâlâ sürülebiliyor.",
        answer: "Das Fahrzeug lässt sich noch fahren",
        hint: "lassen artı dönüşlü zamir olabilirlik bildirir, zorunluluk değil.",
      },
      {
        kind: "build",
        tr: "Belediye meclisinde çekişme.",
        answer: "Auseinandersetzung im Stadtrat",
        hint: "Manşet dili: fiil yok, artikel yok, yer belirteci arkada.",
      },
      {
        kind: "build",
        tr: "Rana, tarihin tutulamayacağı karşılığını verdi.",
        answer: "Rana erwiderte, der Termin sei nicht zu halten",
        hint: "Dolaylı aktarımda Konjunktiv I: ist yerine sei.",
      },
      {
        kind: "rewrite",
        prompt: "Manşeti tam cümleye geri aç ve eksik özneyi kendin ekle.",
        source: "Zuspitzung der Lage im Stadtrat",
        answer: "Die Lage im Stadtrat hat sich zugespitzt.",
        alternatives: [
          "Die Lage im Stadtrat hat sich zugespitzt",
          "Die Lage hat sich im Stadtrat zugespitzt.",
          "Die Lage hat sich im Stadtrat zugespitzt",
        ],
        why: "Adlaştırma yalnız yer kazandırmıyor, özneyi de siliyor. Geri açarken bir özne seçmek zorunda kalırsın ve manşetin söylemediği şey tam orada ortaya çıkar. Bu yüzden gazete okurken adlaştırmaları içinden cümleye çevirmek en hızlı okuma alıştırmasıdır.",
      },
    ],
  },

  {
    id: "b2-u08-w2",
    level: "B2",
    skill: "writing",
    unit: 8,
    title: "Für die, die nicht da waren",
    genre: "Toplantı notu",
    intro: "Katılmayanlara toplantıda ne konuşulduğunu yaz — kendi görüşünü karıştırmadan.",
    gloss: [
      { de: "die Aufgabenverteilung", tr: "görev dağılımı", en: "division of tasks" },
      { de: "die Ankündigung", tr: "duyuru", en: "announcement" },
      { de: "wiedergeben", tr: "aktarmak", en: "to relay" },
      { de: "angeblich", tr: "iddiaya göre", en: "allegedly" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Katılmadığı bir toplantıyı bir iş arkadaşına yaz olarak aktar (gerçek ya da hayalî). Üç şeyi ayrı tut: kimin ne söylediği, neyin karara bağlandığı ve neyin yalnızca söylenti olduğu. Söylenenleri dolaylı aktarımla ver (er sagte, … komme / sei), söylentiyi angeblich ya da es heißt ile işaretle, kararları ise kısa cümlelerle yaz. Kendi yorumunu eklersen ayrı bir cümlede ve açıkça belirt.",
        checklist: [
          "En az iki dolaylı aktarım cümlesi var mı?",
          "Söylenti angeblich ya da es heißt ile işaretlendi mi?",
          "Kararlar ayrı ve kısa yazıldı mı?",
          "Kendi yorumu, aktarılandan ayrılmış mı?",
        ],
        minWords: 70,
        phrases: [
          { de: "Er sagte, der Termin sei nicht zu halten.", tr: "tarihin tutulamayacağını söyledi", en: "he said the deadline could not be met" },
          { de: "Angeblich soll die Stelle gestrichen werden.", tr: "iddiaya göre kadro kaldırılacakmış", en: "the post is allegedly being cut" },
          { de: "Ich gebe das nur wieder.", tr: "ben yalnızca aktarıyorum", en: "I'm only relaying this" },
        ],
        sample:
          "Hallo Jonas,\n\n" +
          "kurz, was heute besprochen wurde — ich gebe es nur wieder, ich war selbst überrascht.\n\n" +
          "Der Chef sagte, das Projekt laufe weiter, der Termin im Dezember sei aber nicht zu halten. Einen neuen Termin nannte er nicht; er deutete nur an, dass es Richtung Frühjahr gehe. Rana erwiderte, ohne die zweite Stelle sei auch der Frühjahrstermin unrealistisch. Darauf kam nichts Konkretes.\n\n" +
          "Entschieden wurde zweierlei. Erstens: Die Aufgabenverteilung bleibt bis zur offiziellen Ankündigung am Freitag unverändert. Zweitens: Neue Anfragen nimmt vorerst niemand an.\n\n" +
          "Im Flur heißt es außerdem, die zweite Stelle werde angeblich ganz gestrichen. Gesagt hat das niemand im Raum, und ich würde es nicht weitergeben.\n\n" +
          "Meine eigene Einschätzung, getrennt davon: Der Frühjahrstermin hält auch nicht.\n\n" +
          "Viele Grüße\nBea",
      },
    ],
  },
];
