import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 16 — "Ortaç öbeği, gerundivum, iç içe cümle, üslup dönüşümü".
 *
 * Dört ders: Die vor Jahren getroffene Wahl · Das zu lösende Problem ·
 * Der Schachtelsatz entwirrt · Vom Nominal- zum Verbalstil.
 *
 *   Kelime: verdichten, auflösen, das Attribut, vorangestellt, umfangreich,
 *           benennen, anführen, eingrenzen · die Notwendigkeit, bevorstehen,
 *           anstehend, die Herausforderung, unterschätzen, die Prognose,
 *           zwangsläufig, gewährleisten · der Schachtelsatz, der Kern,
 *           zerlegen, unübersichtlich, umformulieren, entziffern,
 *           beeinträchtigen, ergründen · der Nominalstil, umwandeln,
 *           schwerfällig, die Lesbarkeit, sperrig, distanziert, behutsam,
 *           die Vorlage
 *
 * Ünitenin çekirdeği: ALMANCA CÜMLEYİ SIKIŞTIRABİLİR. Türkçede yan cümle
 * ekle kurulur ve isim öncesine yığılır; Almanca aynı işi ortaç öbeğiyle
 * yapar — "die vor Jahren getroffene Entscheidung" bir ilgi cümlesinin
 * sıkıştırılmış hâlidir. Türkçe konuşan bu yapıyı okurken çözebilir ama
 * yazarken kurmaz, çünkü ana dilinde zaten sıkıştırılmış cümleye alışıktır
 * ve Almancada uzun yolu seçer.
 *
 * İkinci hat tersi: sıkıştırma her zaman iyi değil. Yönetmelik dili aynı
 * araçla okunmaz hâle geliyor, ve ders bunu çözmeyi de öğretiyor.
 */
export const c1U16: SkillExercise[] = [
  {
    id: "c1-u16-r1",
    level: "C1",
    skill: "reading",
    unit: 16,
    title: "Das Hallenbad Nord öffnet wieder",
    genre: "article",
    intro: "Altı yıl kapalı kalan kapalı yüzme havuzu yeniden açılıyor. Neden kapanmıştı, ne değişti?",
    gloss: [
      { de: "umfangreich", tr: "kapsamlı", en: "extensive" },
      { de: "das Hallenbad", tr: "kapalı yüzme havuzu", en: "indoor pool" },
      { de: "umstritten", tr: "tartışmalı", en: "controversial" },
      { de: "das Gutachten", tr: "bilirkişi raporu", en: "expert report" },
      { de: "der Mangel", tr: "kusur", en: "defect" },
      { de: "die Lüftung", tr: "havalandırma", en: "ventilation" },
      { de: "die Schätzung", tr: "tahmin", en: "estimate" },
      { de: "die Bürgerinitiative", tr: "yurttaş girişimi", en: "citizens' action group" },
      { de: "ersatzlos", tr: "yerine bir şey konmadan", en: "without replacement" },
      { de: "die Wende", tr: "dönüm noktası", en: "turning point" },
      { de: "das Blockheizkraftwerk", tr: "kojenerasyon santrali", en: "combined heat and power plant" },
      { de: "veranschlagen", tr: "öngörmek", en: "to estimate" },
      { de: "das Becken", tr: "havuz", en: "pool" },
      { de: "die Tribüne", tr: "tribün", en: "stand" },
      { de: "ermäßigt", tr: "indirimli", en: "reduced" },
      { de: "das Seepferdchen", tr: "yüzme başlangıç belgesi", en: "beginner swimming badge" },
      { de: "gegründet", tr: "kurulmuş", en: "founded" },
      { de: "vorgesehen", tr: "öngörülmüş", en: "planned" },
      { de: "gedacht", tr: "tasarlanmış", en: "intended" },
      { de: "geplant", tr: "planlanmış", en: "planned" },
      { de: "die Demonstration", tr: "gösteri", en: "demonstration" },
      { de: "entfernt", tr: "uzakta", en: "away" },
      { de: "gesamt", tr: "tüm", en: "entire" },
      { de: "innerhalb", tr: "içinde", en: "within" },
      { de: "der Lehrplan", tr: "müfredat", en: "curriculum" },
      { de: "rund", tr: "yaklaşık", en: "about, roughly" },
      { de: "senken", tr: "düşürmek", en: "to lower" },
    ],
    minutes: 7,
    text:
      "DAS HALLENBAD IST ZURÜCK\n\n" +
      "Nach sechs Jahren Pause öffnet das Hallenbad Nord am Samstag wieder. Die vor sechs Jahren getroffene Entscheidung, das Bad zu schließen, war damals heftig umstritten. Ein vom Gesundheitsamt in Auftrag gegebenes Gutachten hatte schwere Mängel an der Lüftung festgestellt; eine Reparatur hätte nach damaliger Schätzung fast so viel gekostet wie ein Neubau.\n\n" +
      "Die daraufhin gegründete Bürgerinitiative „Rettet das Nordbad“ sammelte innerhalb von drei Monaten 9.000 Unterschriften. Ihr Argument: Das nächste Bad liegt zwölf Kilometer entfernt, und die im Lehrplan der Grundschulen vorgesehenen Schwimmstunden fielen ersatzlos aus. Eine von der Initiative organisierte Demonstration vor dem Rathaus brachte schließlich die Wende.\n\n" +
      "Die umfangreichen Arbeiten begannen vor zweieinhalb Jahren. Erneuert wurden die Lüftung, die Heizung und das gesamte Dach. Das neu eingebaute Blockheizkraftwerk soll den Energieverbrauch um rund ein Drittel senken. Die ursprünglich mit 11 Millionen Euro veranschlagten Kosten erhöhten sich allerdings auf 14,5 Millionen.\n\n" +
      "Einiges ist neu: ein flaches, für Kinder und Nichtschwimmer gedachtes Becken, eine Sauna und längere Öffnungszeiten am Abend. Die von vielen Vereinen gewünschte Tribüne fehlt dagegen; sie wurde aus Kostengründen gestrichen.\n\n" +
      "In den ersten zwei Wochen gilt ein ermäßigter Eintritt von drei Euro. Die Schulen der Stadt haben ihre für den Herbst geplanten Schwimmkurse bereits angemeldet. „Die seit Jahren fehlenden Stunden holen wir nicht mehr nach“, sagt Schulamtsleiterin Birgit Nowak, „aber kein Kind soll mehr ohne Seepferdchen die Grundschule verlassen.“",
    questions: [
      {
        text: "Warum wurde das Bad vor sechs Jahren geschlossen?",
        options: [
          "Wegen schwerer Mängel an der Lüftung",
          "Wegen zu weniger Besucher",
          "Wegen eines Brandes",
        ],
        answer: 0,
        explain: "„Ein vom Gesundheitsamt in Auftrag gegebenes Gutachten hatte schwere Mängel an der Lüftung festgestellt.“",
      },
      {
        kind: "gapfill",
        text: "Die vor sechs Jahren ___ Entscheidung, das Bad zu schließen, war damals heftig umstritten.",
        options: [],
        answer: 0,
        accept: ["getroffene"],
        explain: "Partizip II niteleyici olarak çekiliyor: getroffene.",
      },
      {
        text: "Was brachte schließlich die Wende?",
        options: [
          "Ein neues Gutachten",
          "Eine Demonstration vor dem Rathaus",
          "Ein Zuschuss des Landes",
        ],
        answer: 1,
        explain: "„Eine von der Initiative organisierte Demonstration vor dem Rathaus brachte schließlich die Wende.“",
      },
      {
        kind: "short_answer",
        text: "Was fehlt im erneuerten Bad?",
        options: [],
        answer: 0,
        accept: ["eine Tribüne", "die Tribüne", "Tribüne"],
        explain: "„Die von vielen Vereinen gewünschte Tribüne fehlt dagegen; sie wurde aus Kostengründen gestrichen.“",
      },
      {
        kind: "short_answer",
        text: "Wie hoch waren die Kosten am Ende?",
        options: [],
        answer: 0,
        accept: ["14,5 Millionen Euro", "14,5 Millionen", "vierzehneinhalb Millionen"],
        explain: "„Die ursprünglich mit 11 Millionen Euro veranschlagten Kosten erhöhten sich allerdings auf 14,5 Millionen.“",
      },
    ],
  },
  {
    id: "c1-u16-r2",
    level: "C1",
    skill: "reading",
    unit: 16,
    title: "Vollsperrung der Brückenstraße",
    genre: "info",
    intro: "Belediyenin resmî duyurusu: bir cadde yaz boyunca trafiğe kapanıyor. Kimi nasıl etkiliyor?",
    gloss: [
      { de: "die Bekanntmachung", tr: "duyuru", en: "public notice" },
      { de: "die Sanierung", tr: "yenileme", en: "renovation" },
      { de: "die Vollsperrung", tr: "trafiğe tamamen kapatma", en: "full closure" },
      { de: "die Fertigstellung", tr: "tamamlanma", en: "completion" },
      { de: "die Umleitung", tr: "güzergâh değişikliği", en: "detour" },
      { de: "der Durchgangsverkehr", tr: "transit trafik", en: "through traffic" },
      { de: "gewährleisten", tr: "güvence altına almak", en: "to ensure" },
      { de: "die Belieferung", tr: "mal teslimi", en: "delivery" },
      { de: "die Zufahrt", tr: "giriş yolu", en: "access road" },
      { de: "die Ersatzhaltestelle", tr: "geçici durak", en: "temporary stop" },
      { de: "der Sonderparkausweis", tr: "özel park kartı", en: "special parking permit" },
      { de: "die Vorlage", tr: "ibraz", en: "presentation" },
      { de: "der Fahrzeugschein", tr: "araç ruhsatı", en: "vehicle registration" },
      { de: "die Lärmbelastung", tr: "gürültü yükü", en: "noise pollution" },
      { de: "der Straßenbelag", tr: "yol kaplaması", en: "road surface" },
      { de: "die Beeinträchtigung", tr: "rahatsızlık", en: "disruption" },
      { de: "das Tiefbauamt", tr: "yol yapım dairesi", en: "civil engineering office" },
      { de: "gesamt", tr: "tüm", en: "entire" },
      { de: "die Information", tr: "bilgi", en: "information" },
      { de: "insbesondere", tr: "özellikle", en: "especially" },
    ],
    minutes: 7,
    text:
      "AMTLICHE BEKANNTMACHUNG DER STADT LINDENAU\n\n" +
      "Sanierung der Brückenstraße: Vollsperrung vom 3. Juni bis 30. August\n\n" +
      "Zur Durchführung der Sanierungsarbeiten an der Brückenstraße erfolgt ab dem 3. Juni eine Vollsperrung zwischen Marktplatz und Bahnhof. Die Fertigstellung ist für Ende August vorgesehen.\n\n" +
      "Die Umleitung des Durchgangsverkehrs erfolgt über die Ringstraße. Die Erreichbarkeit der Geschäfte in der Brückenstraße für Fußgänger bleibt während der gesamten Bauzeit gewährleistet. Die Belieferung der Geschäfte ist werktags zwischen 6 und 9 Uhr über die Zufahrt Schulstraße möglich.\n\n" +
      "Die Buslinien 3 und 7 werden für die Dauer der Arbeiten umgeleitet. Die Einrichtung einer Ersatzhaltestelle erfolgt in der Ringstraße auf Höhe der Stadtbibliothek. Mit Verspätungen von bis zu zehn Minuten ist zu rechnen.\n\n" +
      "Für die Anwohnerinnen und Anwohner ist die Ausgabe von Sonderparkausweisen für den Parkplatz am Stadion vorgesehen. Die Beantragung erfolgt bis zum 20. Mai im Bürgerbüro unter Vorlage des Personalausweises und des Fahrzeugscheins.\n\n" +
      "Während der Arbeiten ist mit erhöhter Lärmbelastung zu rechnen, insbesondere in den ersten zwei Wochen durch die Entfernung des alten Straßenbelags. Nachtarbeiten finden nicht statt.\n\n" +
      "Die Stadt bittet um Verständnis für die mit der Maßnahme verbundenen Beeinträchtigungen. Für Rückfragen steht das Tiefbauamt montags bis freitags von 8 bis 12 Uhr zur Verfügung. Die Information der Öffentlichkeit über den Fortschritt der Arbeiten erfolgt regelmäßig auf der Internetseite der Stadt.",
    questions: [
      {
        text: "Wie lange ist die Brückenstraße gesperrt?",
        options: [
          "Nur an Werktagen",
          "Bis zum 20. Mai",
          "Vom 3. Juni bis zum 30. August",
        ],
        answer: 2,
        explain: "„Vollsperrung vom 3. Juni bis 30. August“",
      },
      {
        kind: "gapfill",
        text: "Die Umleitung des Durchgangsverkehrs ___ über die Ringstraße.",
        options: [],
        answer: 0,
        accept: ["erfolgt"],
        explain: "Resmî duyuruda eylem isme dönüşüyor; fiil olarak yalnız „erfolgen“ kalıyor.",
      },
      {
        text: "Wann können die Geschäfte beliefert werden?",
        options: [
          "Werktags zwischen 6 und 9 Uhr",
          "Nur nachts",
          "Während der Bauzeit gar nicht",
        ],
        answer: 0,
        explain: "„Die Belieferung der Geschäfte ist werktags zwischen 6 und 9 Uhr über die Zufahrt Schulstraße möglich.“",
      },
      {
        kind: "short_answer",
        text: "Was muss man für einen Sonderparkausweis vorlegen?",
        options: [],
        answer: 0,
        accept: [
          "Personalausweis und Fahrzeugschein",
          "den Personalausweis und den Fahrzeugschein",
        ],
        explain: "Başvuru 20 Mayıs'a kadar vatandaş bürosunda, kimlik kartı ve araç ruhsatıyla yapılıyor.",
      },
      {
        kind: "short_answer",
        text: "Wo befindet sich die Ersatzhaltestelle?",
        options: [],
        answer: 0,
        accept: [
          "in der Ringstraße",
          "bei der Stadtbibliothek",
          "Ringstraße auf Höhe der Stadtbibliothek",
        ],
        explain: "„Die Einrichtung einer Ersatzhaltestelle erfolgt in der Ringstraße auf Höhe der Stadtbibliothek.“",
      },
    ],
  },
  {
    id: "c1-u16-l1",
    level: "C1",
    skill: "listening",
    unit: 16,
    title: "Post von der Ausländerbehörde",
    genre: "dialogue",
    intro: "Alina yabancılar dairesinden gelen mektubun bir paragrafını anlamıyor. Herr Renz'le birlikte ne yapması gerektiğini çıkarıyorlar.",
    gloss: [
      { de: "der Kern", tr: "çekirdek", en: "core" },
      { de: "entrichten", tr: "yatırmak", en: "to pay" },
      { de: "die Ausländerbehörde", tr: "yabancılar dairesi", en: "immigration office" },
      { de: "der Absatz", tr: "paragraf", en: "paragraph" },
      { de: "der Aufenthaltstitel", tr: "oturma izni", en: "residence permit" },
      { de: "die Befreiung", tr: "muafiyet", en: "exemption" },
      { de: "das Beiwerk", tr: "süs", en: "trimmings" },
      { de: "die Abholung", tr: "teslim alma", en: "collection" },
      { de: "das Bargeld", tr: "nakit", en: "cash" },
      { de: "die Vorlage", tr: "ibraz", en: "presentation" },
      { de: "der Nachweis", tr: "belge", en: "proof" },
      { de: "die Bescheinigung", tr: "belge", en: "certificate" },
      { de: "übersehen", tr: "gözden kaçırmak", en: "to overlook" },
      { de: "sofern", tr: "şartıyla", en: "provided that" },
      { de: "das BAföG", tr: "öğrenim yardımı", en: "student grant" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "der Pass", tr: "pasaport", en: "passport" },
      { de: "schiefgehen", tr: "ters gitmek", en: "to go wrong" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Alina", text: "Herr Renz, haben Sie kurz Zeit? Ich habe Post von der Ausländerbehörde und verstehe den zweiten Absatz nicht." },
      { speaker: "Herr Renz", text: "Zeigen Sie mal. Das ist ein typischer Behördensatz. Lesen Sie ihn vor." },
      { speaker: "Alina", text: "„Für die Verlängerung des Aufenthaltstitels, die von Ihnen am 12. Mai beantragt wurde, ist, sofern keine Befreiung vorliegt, eine Gebühr von 93 Euro zu entrichten.“" },
      { speaker: "Herr Renz", text: "Gut. Was ist zu entrichten?" },
      { speaker: "Alina", text: "Eine Gebühr. 93 Euro." },
      { speaker: "Herr Renz", text: "Genau. Das ist der Kern des Satzes: Sie müssen 93 Euro bezahlen. Alles andere ist Beiwerk." },
      { speaker: "Alina", text: "Und die Befreiung? Muss ich die beantragen?" },
      { speaker: "Herr Renz", text: "Nur wenn Sie Bürgergeld oder BAföG bekommen. Ist das bei Ihnen so?" },
      { speaker: "Alina", text: "Nein, ich arbeite ja Vollzeit." },
      { speaker: "Herr Renz", text: "Dann betrifft Sie das nicht. Steht da auch, bis wann Sie zahlen müssen?" },
      { speaker: "Alina", text: "Im nächsten Satz: bei Abholung des Dokuments. Und die Abholung ist am 3. Juli um 10 Uhr." },
      { speaker: "Herr Renz", text: "Dann nehmen Sie das Geld am besten gleich mit, oder eine Karte. Manche Ämter nehmen kein Bargeld mehr." },
      { speaker: "Alina", text: "Und das hier? „Die Vorlage eines gültigen Nachweises über die Krankenversicherung ist erforderlich.“" },
      { speaker: "Herr Renz", text: "Das heißt: Bringen Sie eine Bescheinigung Ihrer Krankenkasse mit. Die Karte allein reicht meistens nicht." },
      { speaker: "Alina", text: "Das hätte ich übersehen. Ich hätte nur den Pass eingesteckt." },
      { speaker: "Herr Renz", text: "Machen Sie sich eine Liste: Pass, Foto, Bescheinigung, Geld. Dann kann am 3. Juli nichts schiefgehen." },
    ],
    questions: [
      {
        text: "Wie viel muss Alina bezahlen?",
        options: [
          "Nichts, sie ist befreit",
          "45 Euro",
          "93 Euro",
        ],
        answer: 2,
        explain: "Mektup, oturma izninin uzatılması için 93 avroluk harç istiyor.",
      },
      {
        kind: "gapfill",
        text: "Das ist der ___ des Satzes: Sie müssen 93 Euro bezahlen.",
        options: [],
        answer: 0,
        accept: ["Kern"],
        explain: "Uzun resmî cümlenin çekirdeği: kim ne ödeyecek.",
      },
      {
        text: "Warum muss Alina keine Befreiung beantragen?",
        options: [
          "Weil sie Vollzeit arbeitet und keine Leistungen bekommt",
          "Weil sie schon bezahlt hat",
          "Weil die Frist abgelaufen ist",
        ],
        answer: 0,
        explain: "Muafiyet yalnız Bürgergeld ya da BAföG alanlar için; Alina tam zamanlı çalışıyor.",
      },
      {
        kind: "dictation",
        text: "Herr Renz'in Alina'ya yanına alması gerekenleri saydığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Machen Sie sich eine Liste: Pass, Foto, Bescheinigung, Geld.",
          "Machen Sie sich eine Liste: Pass, Foto, Bescheinigung, Geld",
        ],
        explain: "Pasaport, fotoğraf, sigorta belgesi ve para: randevuda bunların hepsi gerekiyor.",
      },
    ],
  },
  {
    id: "c1-u16-l2",
    level: "C1",
    skill: "listening",
    unit: 16,
    title: "Serverumstellung im dritten Quartal",
    genre: "meeting",
    intro: "Bir ekip toplantısında sunucu değişikliği planlanıyor. Asıl zorluk ne, kim neyi üstleniyor?",
    gloss: [
      { de: "anstehend", tr: "sırada bekleyen", en: "pending" },
      { de: "unterschätzen", tr: "hafife almak", en: "to underestimate" },
      { de: "die Prognose", tr: "öngörü", en: "forecast" },
      { de: "die Herausforderung", tr: "zorluk", en: "challenge" },
      { de: "die Serverumstellung", tr: "sunucu değişikliği", en: "server migration" },
      { de: "auslaufen", tr: "süresi dolmak", en: "to expire" },
      { de: "die Einrichtung", tr: "kurulum", en: "setup" },
      { de: "die Altdaten", tr: "eski veriler", en: "legacy data" },
      { de: "migrieren", tr: "taşımak", en: "to migrate" },
      { de: "der Dienstleister", tr: "hizmet sağlayıcı", en: "service provider" },
      { de: "der Ausfall", tr: "kesinti", en: "outage" },
      { de: "verantworten", tr: "sorumluluğunu üstlenmek", en: "to justify" },
      { de: "also", tr: "yani", en: "so" },
      { de: "von außen", tr: "dışarıdan", en: "from outside" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "schiefgehen", tr: "ters gitmek", en: "to go wrong" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Lenz", text: "Auf der Liste stehen vier anstehende Punkte. Beginnen wir mit dem wichtigsten: der Serverumstellung im dritten Quartal." },
      { speaker: "Herr Schott", text: "Das ist das eigentlich zu lösende Problem. Die anderen drei Punkte sind Routine." },
      { speaker: "Frau Lenz", text: "Was genau steht uns bevor?" },
      { speaker: "Herr Schott", text: "Der Vertrag für den alten Server läuft Ende September aus. Danach liefert der Hersteller keine Sicherheitsupdates mehr, also müssen wir vorher umziehen." },
      { speaker: "Frau Lenz", text: "Und wie viel Zeit brauchen wir dafür?" },
      { speaker: "Herr Schott", text: "Die Einrichtung selbst dauert zwei Wochen. Eine nicht zu unterschätzende Rolle spielt aber die Migration der Altdaten." },
      { speaker: "Frau Lenz", text: "Warum? Das sind doch nur Dateien." },
      { speaker: "Herr Schott", text: "Fünfzehn Jahre Kundendaten, teilweise in Formaten, die niemand mehr öffnen kann. Ich rechne mit sechs Wochen, wenn nichts schiefgeht." },
      { speaker: "Frau Lenz", text: "Dann müssen wir im Juli anfangen. Wer kümmert sich darum?" },
      { speaker: "Herr Schott", text: "Die zu migrierenden Daten liegen in drei Abteilungen. Jede muss vorher prüfen, was gelöscht werden darf." },
      { speaker: "Frau Lenz", text: "Das übernehme ich. Ich schicke den Abteilungen bis Freitag eine Liste der zu prüfenden Ordner." },
      { speaker: "Herr Schott", text: "Gut. Außerdem brauchen wir Hilfe von außen. Die Prognose unseres Dienstleisters liegt bei zwölftausend Euro." },
      { speaker: "Frau Lenz", text: "Das ist im Budget. Die Herausforderung ist nicht das Geld, sondern der Termin. Ein Ausfall im Oktober wäre nicht zu verantworten." },
    ],
    questions: [
      {
        text: "Warum muss der Server umgestellt werden?",
        options: [
          "Weil er zu langsam geworden ist",
          "Weil ein Dienstleister es verlangt",
          "Weil es nach September keine Sicherheitsupdates mehr gibt",
        ],
        answer: 2,
        explain: "Eski sunucunun sözleşmesi eylül sonunda bitiyor; ondan sonra güvenlik güncellemesi gelmiyor.",
      },
      {
        kind: "gapfill",
        text: "Eine nicht ___ Rolle spielt aber die Migration der Altdaten.",
        options: [],
        answer: 0,
        accept: ["zu unterschätzende"],
        explain: "Gerundivum olumsuzla: hafife alınmaması gereken.",
      },
      {
        text: "Was übernimmt Frau Lenz?",
        options: [
          "Die Einrichtung des neuen Servers",
          "Die Verhandlung mit dem Dienstleister",
          "Eine Liste der zu prüfenden Ordner für die Abteilungen",
        ],
        answer: 2,
        explain: "„Ich schicke den Abteilungen bis Freitag eine Liste der zu prüfenden Ordner.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert die Migration der Altdaten?",
        options: [],
        answer: 0,
        accept: ["sechs Wochen", "etwa sechs Wochen", "6 Wochen"],
        explain: "„Ich rechne mit sechs Wochen, wenn nichts schiefgeht.“",
      },
    ],
  },
  {
    id: "c1-u16-w1",
    level: "C1",
    skill: "writing",
    unit: 16,
    title: "Behördenbriefe, einfacher gesagt",
    genre: "grammar",
    intro: "İlgi cümlesi ↔ ortaç öbeği, isim üslubu ↔ fiil üslubu.",
    gloss: [
      { de: "auflösen", tr: "çözmek", en: "to unpack" },
      { de: "umwandeln", tr: "dönüştürmek", en: "to convert" },
      { de: "vorangestellt", tr: "öne konmuş", en: "preposed" },
      { de: "gewährleisten", tr: "güvence altına almak", en: "to ensure" },
      { de: "kontrovers", tr: "ihtilaflı", en: "controversial" },
      { de: "aller", tr: "hepsinden", en: "of all" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yıllar önce alınan karar bugün hâlâ etkili.",
        answer: "Die vor Jahren getroffene Entscheidung wirkt bis heute",
        hint: "Ortaç öbeği artikel ile isim arasında durur ve çekilir.",
      },
      {
        kind: "build",
        tr: "Üçüncü çeyrekte çözülmesi gereken sorun bu.",
        answer: "Das ist das im dritten Quartal zu lösende Problem",
        hint: "Gerundivum: zu + Partizip I, sıfat gibi çekiliyor.",
      },
      {
        kind: "build",
        tr: "Belgelerinizi inceliyoruz ve size sonra bir karar gönderiyoruz.",
        answer: "Wir prüfen Ihre Unterlagen und schicken Ihnen danach einen Bescheid",
        hint: "İsim üslubundan fiil üslubuna: eylemi yapan özne olur.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi çöz: ortaç öbeği okunamayacak kadar uzamış.",
        source: "Die vor Jahren nach umfangreichen und kontrovers geführten Beratungen unter Beteiligung aller Fachabteilungen getroffene Entscheidung wirkt bis heute.",
        answer: "Die Entscheidung, die vor Jahren nach langen Beratungen getroffen wurde, wirkt bis heute.",
        alternatives: [
          "Die Entscheidung, die vor Jahren nach langen Beratungen getroffen wurde, wirkt bis heute",
          "Die Entscheidung wurde vor Jahren nach langen Beratungen getroffen. Sie wirkt bis heute.",
        ],
        why: "Yapı dilbilgisi olarak kusursuz ama artikel ile isim arasına on üç kelime giriyor ve okur sonuna kadar neyden söz edildiğini bilmiyor. Dört kelimeyi aşan niteleyici ilgi cümlesine ya da iki ayrı cümleye çözülür.",
      },
    ],
  },
  {
    id: "c1-u16-w2",
    level: "C1",
    skill: "writing",
    unit: 16,
    title: "Amtsdeutsch übersetzen",
    genre: "formal",
    intro: "Yönetmelik cümlesini vatandaşın okuyacağı bildirime çevir.",
    gloss: [
      { de: "umformulieren", tr: "yeniden yazmak", en: "to rephrase" },
      { de: "zerlegen", tr: "parçalara ayırmak", en: "to break down" },
      { de: "der Kern", tr: "çekirdek", en: "core" },
      { de: "die Lesbarkeit", tr: "okunabilirlik", en: "readability" },
      { de: "behutsam", tr: "özenli", en: "careful" },
      { de: "entrichten", tr: "yatırmak", en: "to pay" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki yönetmelik cümlesini, başvuru sahibine gidecek bir bildirime dönüştür. Yöntemi uygula: önce çekirdeği bul, koşulları alt alta yaz, isim üslubunu fiil üslubuna çevir ve eylemi yapanı adlandır. Hiçbir bilgi kaybolmasın; hukuki içeriği değiştirme, yalnız okunabilir kıl.",
        stimulus:
          "VERORDNUNGSTEXT § 14 Abs. 2\n\n" +
          "Für die Bearbeitung des Antrags ist eine Gebühr in Höhe von 45 Euro zu entrichten, es sei denn, der Antragsteller weist durch Vorlage eines gültigen Bescheides nach, dass er laufende Leistungen zur Sicherung des Lebensunterhalts bezieht, oder der Antrag wird vor Beginn der Bearbeitung, spätestens jedoch innerhalb von zwei Wochen nach Eingang, zurückgenommen; im letztgenannten Fall erfolgt eine Erstattung bereits entrichteter Beträge binnen vier Wochen.",
        checklist: [
          "Çekirdek ilk cümlede mi (ücret ne kadar)?",
          "İki istisna ayrı ayrı, alt alta mı?",
          "İsim üslubu fiile çevrildi mi, eylemi yapan adlandırıldı mı?",
          "Bilgi kaybı var mı — dört haftalık iade süresi yazıldı mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Für die Bearbeitung Ihres Antrags zahlen Sie …", tr: "başvurunuzun işlenmesi için … ödersiniz", en: "you pay … for processing your application" },
          { de: "In zwei Fällen entfällt die Gebühr:", tr: "iki durumda ücret alınmaz", en: "the fee does not apply in two cases" },
          { de: "Wir erstatten Ihnen den Betrag innerhalb von vier Wochen.", tr: "tutarı dört hafta içinde iade ederiz", en: "we will refund the amount within four weeks" },
        ],
        sample:
          "Gebühr für Ihren Antrag\n\n" +
          "Für die Bearbeitung Ihres Antrags zahlen Sie 45 Euro.\n\n" +
          "In zwei Fällen entfällt die Gebühr:\n\n" +
          "1. Sie beziehen laufende Leistungen zur Sicherung des Lebensunterhalts. Legen Sie uns dafür bitte einen gültigen Bescheid vor.\n\n" +
          "2. Sie nehmen den Antrag zurück, bevor wir mit der Bearbeitung beginnen — spätestens jedoch zwei Wochen nach Eingang.\n\n" +
          "Haben Sie in diesem zweiten Fall bereits gezahlt, erstatten wir Ihnen den Betrag innerhalb von vier Wochen.\n\n" +
          "Bei Fragen erreichen Sie uns unter der oben genannten Nummer.",
      },
    ],
  },
];
