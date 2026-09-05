import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 7 — "Fail sahnede yokken".
 *
 * Dört ders: Wie Schokolade entsteht · Die Altstadt wird saniert ·
 * Der Unfallbericht · In der Profiküche. Ünite 6 edilgenin biçimlerini
 * ayırdı; bu ünite aynı yapıyı ZAMAN ekseninde çalıştırıyor: şimdi olan,
 * olmuş olan, olmuş bitmiş olan ve olması gereken.
 *
 *   Ünite 7: verarbeiten, der Rohstoff, die Fertigung, das Fließband,
 *            die Montage, die Lagerung, abfüllen, die Verpackung · sanieren,
 *            die Fassade, die Renovierung, modernisieren, errichten,
 *            das Wahrzeichen, die Baugenehmigung, baufällig · die Unfallstelle,
 *            die Einsatzkraft, der Ersthelfer, alarmieren, verunglücken,
 *            sperren, der Sicherheitsabstand, fahrlässig · die Zutat, würzen,
 *            abkühlen, servieren, der Hauptgang, der Nachtisch,
 *            die Spezialität, herzhaft
 *   Kalıplar: wird/werden … + ortaç · ist … worden · wurde … + ortaç ·
 *            muss … serviert werden · darf nicht … werden
 *
 * Türkçe konuşan burada bir kolaylık bulur: Türkçe de faili düşürebiliyor.
 * Zorluk zamanın nereye kodlandığında — Almanca zamanı werden'e yükler,
 * ortaç hiç değişmez.
 */
export const b2U07: SkillExercise[] = [
  {
    id: "b2-u07-r1",
    level: "B2",
    skill: "reading",
    unit: 7,
    title: "Eine Führung durch das Werk",
    genre: "Fabrika turu metni",
    intro: "Bir fabrikanın ziyaretçi turu için hazırladığı metin. Her istasyonda ne yapıldığı anlatılıyor.",
    gloss: [
      { de: "verarbeiten", tr: "işlemek", en: "to process" },
      { de: "der Rohstoff", tr: "hammadde", en: "raw material" },
      { de: "die Fertigung", tr: "imalat", en: "production" },
      { de: "das Fließband", tr: "montaj bandı", en: "assembly line" },
      { de: "die Montage", tr: "montaj", en: "assembly" },
      { de: "die Lagerung", tr: "depolama", en: "storage" },
      { de: "abfüllen", tr: "şişelemek", en: "to bottle" },
      { de: "die Verpackung", tr: "ambalaj", en: "packaging" },
    ],
    minutes: 6,
    text:
      "WERKFÜHRUNG — WAS SIE AUF DEN VIER STATIONEN SEHEN\n\n" +
      "Station 1: Anlieferung. Hier kommt an, was wir brauchen. Der Rohstoff wird angeliefert, gewogen und geprüft. Was die Prüfung nicht besteht, geht zurück — das sind im Schnitt zwei Lieferungen im Monat. Anschließend beginnt die Lagerung, und zwar getrennt nach Charge, damit später jederzeit nachvollzogen werden kann, woher ein Fehler kommt.\n\n" +
      "Station 2: Fertigung. In der Fertigung wird der Rohstoff in vier Schritten verarbeitet. Der Weg dauert knapp elf Minuten. Sie sehen hier kein Fließband im klassischen Sinn: Die Behälter fahren einzeln, weil jeder Auftrag eine andere Rezeptur hat.\n\n" +
      "Station 3: Abfüllung und Montage. Zuerst wird abgefüllt, dann folgt die Montage von Deckel und Ausgießer. Beide Schritte laufen automatisch, aber an jedem steht ein Mensch — nicht um zu arbeiten, sondern um zu sehen, wenn etwas nicht stimmt.\n\n" +
      "Station 4: Verpackung. Zum Schluss wird verpackt und etikettiert. Die Verpackung ist seit vorigem Jahr aus einem Material, das sortenrein recycelt werden kann. Das war teurer, hat uns aber zwei große Kunden gebracht.\n\n" +
      "Eine Bitte: Bleiben Sie hinter der gelben Linie. Fotografieren ist erlaubt, Filmen nicht.",
    questions: [
      {
        kind: "gapfill",
        text: "In der Fertigung ___ der Rohstoff in vier Schritten verarbeitet.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Edilgen şimdiki zaman: werden çekimli, ortaç sonda. Zaman werden'e yüklenir.",
      },
      {
        text: "Warum wird getrennt nach Charge gelagert?",
        options: [
          "damit die Lagerung billiger wird",
          "damit man später nachvollziehen kann, woher ein Fehler kommt",
          "weil die Rohstoffe sonst verderben",
        ],
        answer: 1,
        explain: "„…getrennt nach Charge, damit später jederzeit nachvollzogen werden kann, woher ein Fehler kommt.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert der Weg durch die Fertigung?",
        options: [],
        answer: 0,
        accept: ["knapp elf Minuten", "elf Minuten", "11 Minuten"],
        explain: "„Der Weg dauert knapp elf Minuten.“",
      },
      {
        text: "Warum steht an den automatischen Schritten trotzdem ein Mensch?",
        options: [
          "um mitzuarbeiten",
          "um zu sehen, wenn etwas nicht stimmt",
          "um die Besucher zu führen",
        ],
        answer: 1,
        explain: "„…nicht um zu arbeiten, sondern um zu sehen, wenn etwas nicht stimmt.“",
      },
      {
        text: "Die neue Verpackung war billiger als die alte.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das war teurer, hat uns aber zwei große Kunden gebracht.“",
      },
    ],
  },

  {
    id: "b2-u07-r2",
    level: "B2",
    skill: "reading",
    unit: 7,
    title: "Zwölf Jahre Altstadt",
    genre: "Yerel gazete haberi",
    intro: "Uzun süren bir restorasyonun bittiği gün yazılmış bir haber. Neyin ne zaman yapıldığına dikkat et.",
    gloss: [
      { de: "sanieren", tr: "restore etmek", en: "to renovate" },
      { de: "die Fassade", tr: "cephe", en: "façade" },
      { de: "die Renovierung", tr: "tadilat", en: "renovation" },
      { de: "modernisieren", tr: "modernleştirmek", en: "to modernise" },
      { de: "errichten", tr: "inşa etmek", en: "to erect" },
      { de: "das Wahrzeichen", tr: "simge yapı", en: "landmark" },
      { de: "die Baugenehmigung", tr: "yapı ruhsatı", en: "building permit" },
      { de: "baufällig", tr: "harap", en: "dilapidated" },
    ],
    minutes: 6,
    text:
      "ZWÖLF JAHRE ALTSTADT — HEUTE IST DIE LETZTE ABSPERRUNG GEFALLEN\n\n" +
      "Es hat länger gedauert als geplant, aber es ist geschafft: Die Altstadt ist saniert worden. Zwölf Jahre, vierzig Häuser, ein Budget, das zweimal erhöht werden musste.\n\n" +
      "Angefangen hat alles mit dem Haus in der Krämergasse 4. Es war so baufällig, dass es 2014 gesperrt wurde. Abgerissen worden ist es dann doch nicht — die Stadt entschied sich für die teurere Lösung, und heute ist genau dieses Haus das Wahrzeichen der Altstadt.\n\n" +
      "Die Fassaden sind nach alten Fotos wiederhergestellt worden, das Innere dagegen ist konsequent modernisiert worden: Fußbodenheizung, neue Leitungen, Aufzüge in drei Gebäuden. „Von außen historisch, von innen 2026“, sagt die Bauleiterin, „anders wäre da niemand eingezogen.“\n\n" +
      "Nicht alles lief glatt. Für zwei Häuser ist die Baugenehmigung erst nach elf Monaten erteilt worden; in dieser Zeit stand die Renovierung still und die Gerüste kosteten weiter. Ein Anbau, der 2019 errichtet worden war, musste 2021 wieder zurückgebaut werden, weil er dem Denkmalschutz widersprach.\n\n" +
      "Was bleibt? Vierzig Häuser, in denen wieder gewohnt wird. Und eine Rechnung, über die noch lange gestritten werden wird.",
    questions: [
      {
        kind: "gapfill",
        text: "Die Altstadt ist in zwölf Jahren saniert ___.",
        options: [],
        answer: 0,
        accept: ["worden"],
        explain: "Edilgen Perfekt: sein + ortaç + worden. geworden değil.",
      },
      {
        text: "Was ist mit dem Haus in der Krämergasse 4 passiert?",
        options: [
          "Es wurde abgerissen.",
          "Es wurde saniert und ist heute das Wahrzeichen.",
          "Es steht bis heute leer.",
        ],
        answer: 1,
        explain: "„Abgerissen worden ist es dann doch nicht … heute ist genau dieses Haus das Wahrzeichen der Altstadt.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange musste auf zwei Baugenehmigungen gewartet werden?",
        options: [],
        answer: 0,
        accept: ["elf Monate", "elf Monaten", "11 Monate"],
        explain: "„…erst nach elf Monaten erteilt worden“ — bu sürede tadilat durdu.",
      },
      {
        text: "Warum musste der Anbau von 2019 zurückgebaut werden?",
        options: [
          "weil er dem Denkmalschutz widersprach",
          "weil das Geld fehlte",
          "weil er baufällig war",
        ],
        answer: 0,
        explain: "„…musste 2021 wieder zurückgebaut werden, weil er dem Denkmalschutz widersprach.“",
      },
      {
        text: "Die Häuser sind auch von innen historisch geblieben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…das Innere dagegen ist konsequent modernisiert worden.“",
      },
    ],
  },

  {
    id: "b2-u07-l1",
    level: "B2",
    skill: "listening",
    unit: 7,
    title: "Was ist gestern passiert?",
    genre: "Telefon görüşmesi",
    intro: "Bir radyo muhabiri polis basın sözcüsünü arıyor. Dün olan bir kaza konuşuluyor.",
    gloss: [
      { de: "die Unfallstelle", tr: "kaza yeri", en: "accident site" },
      { de: "die Einsatzkraft", tr: "müdahale görevlisi", en: "emergency responder" },
      { de: "der Ersthelfer", tr: "ilk yardımcı", en: "first responder" },
      { de: "alarmieren", tr: "alarma geçirmek", en: "to alert" },
      { de: "verunglücken", tr: "kaza geçirmek", en: "to have an accident" },
      { de: "sperren", tr: "yolu kapatmak", en: "to close off" },
      { de: "der Sicherheitsabstand", tr: "güvenlik mesafesi", en: "safe distance" },
      { de: "fahrlässig", tr: "ihmalkâr", en: "negligent" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Muhabir", text: "Guten Morgen, können Sie mir sagen, was gestern auf der B31 passiert ist?" },
      { speaker: "Sözcü", text: "Gegen 16:40 Uhr wurden wir alarmiert. Drei Fahrzeuge waren beteiligt." },
      { speaker: "Muhabir", text: "Ist jemand verunglückt?" },
      { speaker: "Sözcü", text: "Zwei Personen wurden leicht verletzt, eine schwer. Alle drei sind ansprechbar." },
      { speaker: "Muhabir", text: "Wie schnell waren Sie vor Ort?" },
      { speaker: "Sözcü", text: "Die ersten Einsatzkräfte waren nach neun Minuten an der Unfallstelle." },
      { speaker: "Muhabir", text: "Und bis dahin?" },
      { speaker: "Sözcü", text: "Zwei Ersthelfer aus dem nachfolgenden Wagen haben sofort geholfen. Das war entscheidend." },
      { speaker: "Muhabir", text: "Die Straße war lange dicht." },
      { speaker: "Sözcü", text: "Sie wurde bis 21 Uhr gesperrt. Die Fahrbahn musste gereinigt werden." },
      { speaker: "Muhabir", text: "Steht die Ursache schon fest?" },
      { speaker: "Sözcü", text: "Ermittelt wird noch. Der Sicherheitsabstand war offenbar deutlich zu klein." },
      { speaker: "Muhabir", text: "Also fahrlässig?" },
      { speaker: "Sözcü", text: "Das entscheidet die Staatsanwaltschaft, nicht ich. Zeugen werden weiterhin gesucht." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Sözcünün ilk ekiplerin kaza yerine ne kadar sürede vardığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Die ersten Einsatzkräfte waren nach neun Minuten an der Unfallstelle."],
        explain: "Edilgen Präteritum haberde kural; ama burada sein ile kurulmuş bir yer bildirimi var.",
      },
      {
        text: "Wie viele Personen wurden schwer verletzt?",
        options: ["keine", "eine", "zwei"],
        answer: 1,
        explain: "„Zwei Personen wurden leicht verletzt, eine schwer.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann wurde die Straße gesperrt?",
        options: [],
        answer: 0,
        accept: ["bis 21 Uhr", "21 Uhr", "bis einundzwanzig Uhr"],
        explain: "„Sie wurde bis 21 Uhr gesperrt. Die Fahrbahn musste gereinigt werden.“",
      },
      {
        text: "Wer hat vor den Einsatzkräften geholfen?",
        options: [
          "niemand",
          "zwei Ersthelfer aus dem nachfolgenden Wagen",
          "die Fahrer selbst",
        ],
        answer: 1,
        explain: "„Zwei Ersthelfer aus dem nachfolgenden Wagen haben sofort geholfen.“",
      },
      {
        text: "Der Sprecher sagt klar, dass jemand fahrlässig gehandelt hat.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das entscheidet die Staatsanwaltschaft, nicht ich.“",
      },
    ],
  },

  {
    id: "b2-u07-l2",
    level: "B2",
    skill: "listening",
    unit: 7,
    title: "Erster Tag in der Küche",
    genre: "Diyalog",
    intro: "Bir aşçı yeni gelen yardımcıya kuralları anlatıyor. Neyin zorunlu, neyin yasak olduğunu ayır.",
    gloss: [
      { de: "die Zutat", tr: "malzeme", en: "ingredient" },
      { de: "würzen", tr: "baharatlamak", en: "to season" },
      { de: "abkühlen", tr: "soğumak", en: "to cool down" },
      { de: "servieren", tr: "servis etmek", en: "to serve" },
      { de: "der Hauptgang", tr: "ana yemek", en: "main course" },
      { de: "der Nachtisch", tr: "tatlı", en: "dessert" },
      { de: "die Spezialität", tr: "yöresel yemek", en: "speciality" },
      { de: "herzhaft", tr: "tuzlu", en: "savoury" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Aşçı", text: "Willkommen. Drei Regeln, dann kannst du anfangen." },
      { speaker: "Yardımcı", text: "Ich höre." },
      { speaker: "Aşçı", text: "Erstens: Jede Zutat wird bei uns frisch geschnitten, nichts kommt aus der Dose." },
      { speaker: "Yardımcı", text: "Auch die Soßen?" },
      { speaker: "Aşçı", text: "Auch die. Zweitens: Gewürzt wird erst am Schluss, und nie von zwei Leuten." },
      { speaker: "Yardımcı", text: "Warum nie von zwei Leuten?" },
      { speaker: "Aşçı", text: "Weil dann doppelt gewürzt wird und niemand es merkt. Das darf nicht passieren." },
      { speaker: "Yardımcı", text: "Verstanden. Und drittens?" },
      { speaker: "Aşçı", text: "Der Hauptgang muss heiß serviert werden, der Nachtisch muss vorher abkühlen." },
      { speaker: "Yardımcı", text: "Wie lange kühlt der Nachtisch?" },
      { speaker: "Aşçı", text: "Mindestens vierzig Minuten. Wird er warm serviert, kommt er zurück." },
      { speaker: "Yardımcı", text: "Und was ist eure Spezialität?" },
      { speaker: "Aşçı", text: "Ein herzhafter Kuchen mit Käse und Zwiebeln. Der wird nur samstags gemacht." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Aşçının üçüncü kuralı söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Der Hauptgang muss heiß serviert werden, der Nachtisch muss vorher abkühlen."],
        explain: "Kipli edilgen: muss + ortaç + werden; ikinci yarıda abkühlen etken kalıyor.",
      },
      {
        text: "Warum darf nicht von zwei Leuten gewürzt werden?",
        options: [
          "weil es länger dauert",
          "weil dann doppelt gewürzt wird und es niemand merkt",
          "weil es in der Küche zu eng ist",
        ],
        answer: 1,
        explain: "„Weil dann doppelt gewürzt wird und niemand es merkt.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange muss der Nachtisch mindestens abkühlen?",
        options: [],
        answer: 0,
        accept: ["mindestens vierzig Minuten", "vierzig Minuten", "40 Minuten"],
        explain: "„Mindestens vierzig Minuten. Wird er warm serviert, kommt er zurück.“",
      },
      {
        text: "Wann gibt es die Spezialität?",
        options: ["täglich", "nur samstags", "nur im Sommer"],
        answer: 1,
        explain: "„Ein herzhafter Kuchen mit Käse und Zwiebeln. Der wird nur samstags gemacht.“",
      },
      {
        text: "Die Soßen kommen aus der Dose.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Jede Zutat wird bei uns frisch geschnitten, nichts kommt aus der Dose.“ — soslar da dâhil.",
      },
    ],
  },

  {
    id: "b2-u07-w1",
    level: "B2",
    skill: "writing",
    unit: 7,
    title: "Zaman werden'de durur",
    genre: "Cümle kurma",
    intro: "Aynı edilgen cümle üç zamanda ve bir kip altında. Değişen tek şey werden.",
    gloss: [
      { de: "verarbeiten", tr: "işlemek", en: "to process" },
      { de: "sanieren", tr: "restore etmek", en: "to renovate" },
      { de: "sperren", tr: "yolu kapatmak", en: "to close off" },
      { de: "servieren", tr: "servis etmek", en: "to serve" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Hammadde dört adımda işleniyor.",
        answer: "Der Rohstoff wird in vier Schritten verarbeitet",
        hint: "Şimdiki zaman edilgeni: wird ikinci sırada, ortaç sonda.",
      },
      {
        kind: "build",
        tr: "Eski şehir on iki yılda restore edildi.",
        answer: "Die Altstadt ist in zwölf Jahren saniert worden",
        hint: "Edilgen Perfekt: ist + ortaç + worden.",
      },
      {
        kind: "build",
        tr: "Yol saat 21'e kadar kapatıldı.",
        answer: "Die Straße wurde bis 21 Uhr gesperrt",
        hint: "Edilgen Präteritum: haber dilinin zamanı. wurde + ortaç.",
      },
      {
        kind: "build",
        tr: "Ana yemek sıcak servis edilmek zorunda.",
        answer: "Der Hauptgang muss heiß serviert werden",
        hint: "Kipli edilgen: kip fiili çekimli, sonda ortaç ve werden.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi edilgen Perfekt'e çevir; anlamı değiştirme.",
        source: "Die Stadt hat die Fassaden nach alten Fotos wiederhergestellt.",
        answer: "Die Fassaden sind nach alten Fotos wiederhergestellt worden.",
        alternatives: ["Die Fassaden sind nach alten Fotos wiederhergestellt worden"],
        why: "Etken Perfekt haben ile kurulur, edilgen Perfekt sein ile. Nesne özneye geçer ve geworden yerine kısalmış worden gelir. Fail (die Stadt) burada zaten önemsiz olduğu için düşürülüyor — edilgenin asıl işi bu.",
      },
    ],
  },

  {
    id: "b2-u07-w2",
    level: "B2",
    skill: "writing",
    unit: 7,
    title: "Wie es gemacht wird",
    genre: "Süreç anlatımı",
    intro: "Bir işin nasıl yapıldığını adım adım anlat — ama kimin yaptığını söylemeden.",
    gloss: [
      { de: "die Fertigung", tr: "imalat", en: "production" },
      { de: "die Lagerung", tr: "depolama", en: "storage" },
      { de: "die Verpackung", tr: "ambalaj", en: "packaging" },
      { de: "abfüllen", tr: "şişelemek", en: "to bottle" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bildiğin bir sürecin nasıl işlediğini anlat: bir ürünün üretimi, bir başvurunun işlenmesi, evde bir yemeğin hazırlanışı — sen seç. Adımları sırayla ver ve baştan sona edilgen kullan; 'ich' ya da 'man' ile kaçma. Sıralamayı zuerst, dann, anschließend, zum Schluss ile kur. Sonda bir adımın neden en zor adım olduğunu bir cümleyle söyle.",
        checklist: [
          "En az dört adım sırayla verildi mi?",
          "Bütün adımlar edilgen mi (fail yok)?",
          "Sıralama bağlaçları kullanıldı mı?",
          "Sonda hangi adımın zor olduğu söylendi mi?",
        ],
        minWords: 70,
        phrases: [
          { de: "Zuerst wird … geprüft.", tr: "önce … kontrol edilir", en: "first, … is checked" },
          { de: "Anschließend wird … verarbeitet.", tr: "ardından … işlenir", en: "then … is processed" },
          { de: "Zum Schluss wird verpackt.", tr: "en sonunda paketlenir", en: "finally it is packaged" },
        ],
        sample:
          "So entsteht bei uns eine Flasche Saft.\n\n" +
          "Zuerst wird das Obst angeliefert und gewogen. Es wird sortiert, gewaschen und geprüft; was nicht in Ordnung ist, wird aussortiert. Dann beginnt die Lagerung, getrennt nach Lieferung, damit später nachvollzogen werden kann, woher eine Charge stammt.\n\n" +
          "Anschließend geht es in die Fertigung. Das Obst wird gepresst, der Saft wird erhitzt und wieder abgekühlt. Danach wird abgefüllt — vierhundert Flaschen in der Stunde, langsamer als bei den Großen, aber wir arbeiten mit kleinen Chargen.\n\n" +
          "Zum Schluss folgen Verschluss, Etikett und Verpackung. Die Kartons werden am selben Tag verladen.\n\n" +
          "Am schwierigsten ist die Sortierung: Sie wird von Hand gemacht, und wer dort einen Fehler übersieht, den findet niemand mehr.",
      },
    ],
  },
];
