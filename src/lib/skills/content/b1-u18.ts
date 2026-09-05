import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 18 — "Etki, argüman, muayene" (dersler 69–72).
 *
 * Dersler: Die Kunstausstellung · Eine kurze Debatte · Beim Hausarzt ·
 * Beim Facharzt.
 *
 * İki aktarım hatası bu ünitenin iki yarısına düşüyor:
 *   lassen ettirgeni  Türkçede ettirgenlik bir EKTİR ('muayene ettirmek'),
 *                     ayrı bir fiil yoktur — o yüzden Almancada düşüyor ve
 *                     "ich will mich untersuchen" çıkıyor, yani hasta kendi
 *                     kendini muayene ediyor. Almanca bunu lassen ile kurar.
 *   weil ↔ wegen      Türkçede '-dığı için' ve 'yüzünden' birbirinin yerine
 *                     geçebilir; Almanca ayırır: weil CÜMLE bağlar,
 *                     wegen İSİM alır (ve Genitiv ister).
 *
 * Yeni 32 kelime: der Künstler, die Ausstellung, ausstellen, das Werk,
 * die Wirkung, wirken, der Ausdruck, ähnlich, das Argument, zusammenfassen,
 * erstens, die Tatsache, der Punkt, die Runde, feststellen, begrüßen,
 * leiden, der Patient, die Patientin, behandeln, das Herz, atmen,
 * der Atem, der Husten, die Überweisung, die Operation, operieren,
 * die Krankenschwester, verschreiben, die Untersuchung, die Klinik,
 * die Vermittlung.
 */
export const b1U18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u18-r1",
    level: "B1",
    skill: "reading",
    unit: 18,
    title: "Die Ausstellung",
    genre: "Sergi tanıtımı ve yorum",
    intro: "Bir sergi ve bir ziyaretçinin notu. Hangi eser nasıl etki bırakıyor?",
    minutes: 5,
    gloss: [
      { de: "die Ausstellung", tr: "sergi", en: "exhibition" },
      { de: "das Werk", tr: "eser", en: "work" },
      { de: "die Wirkung", tr: "etki", en: "effect" },
      { de: "der Ausdruck", tr: "ifade", en: "expression" },
      { de: "ähnlich", tr: "benzer", en: "similar" },
    ],
    text:
      "Bis Ende Mai stellt das Museum am Fluss vierzig Werke einer Künstlerin " +
      "aus, die lange in dieser Stadt gelebt hat. Der Eintritt ist am Mittwoch " +
      "frei.\n\n" +
      "Die Bilder sind ähnlich aufgebaut: viel Grau, ein heller Punkt, " +
      "meistens ein Fenster. Die Wirkung ist trotzdem bei jedem Bild anders. " +
      "Das erste wirkt kalt, das letzte fast warm.\n\n" +
      "Notiz von Sedef: Mir hat der zweite Raum am besten gefallen. Dort hängen " +
      "die späten Werke, und der Ausdruck ist ganz anders — ruhiger, weniger " +
      "streng. Ich habe mir die Erklärung am Eingang geben lassen, sonst hätte " +
      "ich die Reihenfolge nicht verstanden.\n\n" +
      "Wer wenig Zeit hat, geht direkt in den zweiten Raum. Wer mehr will, " +
      "sollte vorne anfangen: der Weg vom kalten zum warmen Bild ist der " +
      "eigentliche Inhalt dieser Ausstellung.",
    questions: [
      {
        text: "Wie viele Werke werden gezeigt?",
        options: ["Vierzig", "Vierzehn", "Vier"],
        answer: 0,
        explain: "„… stellt das Museum am Fluss vierzig Werke einer Künstlerin aus …“",
      },
      {
        text: "Was ist bei allen Bildern ähnlich?",
        options: ["Der Aufbau", "Die Größe", "Der Preis"],
        answer: 0,
        explain: "„Die Bilder sind ähnlich aufgebaut: viel Grau, ein heller Punkt …“",
      },
      {
        text: "Welcher Raum hat Sedef am besten gefallen?",
        options: ["Der erste", "Der zweite", "Beide gleich"],
        answer: 1,
        explain: "„Mir hat der zweite Raum am besten gefallen.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe mir die Erklärung am Eingang geben ___.",
        options: [],
        answer: 0,
        accept: ["lassen"],
        explain: "Bir şeyi BAŞKASINA yaptırmak: „geben lassen“ — ettirgen lassen.",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag ist der Eintritt frei?",
        options: [],
        answer: 0,
        accept: ["am Mittwoch", "Mittwoch"],
        explain: "„Der Eintritt ist am Mittwoch frei.“",
      },
    ],
  },
  {
    id: "b1-u18-r2",
    level: "B1",
    skill: "reading",
    unit: 18,
    title: "Vom Hausarzt zum Facharzt",
    genre: "Sağlık bilgilendirmesi",
    intro: "Sevk süreci anlatılıyor. Hangi adım hangi sırada?",
    minutes: 5,
    gloss: [
      { de: "die Überweisung", tr: "sevk", en: "referral" },
      { de: "behandeln", tr: "tedavi etmek", en: "to treat" },
      { de: "die Untersuchung", tr: "muayene", en: "examination" },
      { de: "verschreiben", tr: "reçete etmek", en: "to prescribe" },
      { de: "leiden", tr: "acı çekmek", en: "to suffer" },
    ],
    text:
      "Wer krank ist, geht zuerst zum Hausarzt. Er behandelt das meiste selbst " +
      "und verschreibt, was nötig ist. Nur wenn eine besondere Untersuchung " +
      "gebraucht wird, schreibt er eine Überweisung.\n\n" +
      "Mit dieser Überweisung lässt man sich beim Facharzt untersuchen. " +
      "Die Wartezeit ist oft lang. Wenn Sie seit Wochen leiden, sagen Sie das " +
      "am Telefon deutlich — dann geht es manchmal schneller.\n\n" +
      "Nehmen Sie zum Termin alles mit: die Überweisung, Ihre " +
      "Medikamente und Ihre Karte. Wer schon einmal operiert wurde, bringt " +
      "auch den alten Bericht mit.\n\n" +
      "Wegen der langen Wartezeit gibt es eine Vermittlung: eine Stelle, die " +
      "für Sie einen Termin sucht. Weil viele das nicht wissen, warten sie " +
      "monatelang. Fragen Sie einfach danach.",
    questions: [
      {
        text: "Wohin geht man zuerst?",
        options: ["Zum Facharzt", "Zum Hausarzt", "In die Klinik"],
        answer: 1,
        explain: "„Wer krank ist, geht zuerst zum Hausarzt.“",
      },
      {
        text: "Wann schreibt der Hausarzt eine Überweisung?",
        options: ["Immer", "Wenn eine besondere Untersuchung nötig ist", "Nie"],
        answer: 1,
        explain: "„Nur wenn eine besondere Untersuchung gebraucht wird, schreibt er eine Überweisung.“",
      },
      {
        text: "Was macht die Vermittlung?",
        options: ["Sie sucht einen Termin", "Sie behandelt Patienten", "Sie verschreibt Medikamente"],
        answer: 0,
        explain: "„… eine Vermittlung: eine Stelle, die für Sie einen Termin sucht.“",
      },
      {
        kind: "gapfill",
        text: "Mit dieser Überweisung ___ man sich beim Facharzt untersuchen.",
        options: [],
        answer: 0,
        accept: ["lässt"],
        explain: "Muayene BAŞKASI tarafından yapılır → „sich untersuchen lassen“.",
      },
      {
        kind: "short_answer",
        text: "Was bringt jemand mit, der schon operiert wurde?",
        options: [],
        answer: 0,
        accept: ["den alten Bericht", "der alte Bericht", "Bericht"],
        explain: "„Wer schon einmal operiert wurde, bringt auch den alten Bericht mit.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u18-l1",
    level: "B1",
    skill: "listening",
    unit: 18,
    title: "Die kurze Debatte",
    genre: "Tartışma turu",
    intro: "Kısa bir tartışma turu. Kim kaç argüman getiriyor?",
    minutes: 4,
    gloss: [
      { de: "das Argument", tr: "argüman", en: "argument" },
      { de: "die Tatsache", tr: "olgu", en: "fact" },
      { de: "zusammenfassen", tr: "özetlemek", en: "to summarise" },
      { de: "feststellen", tr: "tespit etmek", en: "to establish" },
    ],
    segments: [
      { text: "Ich begrüße Sie zur zweiten Runde. Jeder hat zwei Minuten." },
      { text: "Erstens: Die Zahlen sind gestiegen. Das ist eine Tatsache." },
      { text: "Zweitens ist der Weg zu weit für viele ältere Leute." },
      { text: "Dem möchte ich widersprechen. Es gibt zwei neue Buslinien." },
      { text: "Wegen der neuen Linien ist das Problem also kleiner geworden." },
      { text: "Aber nicht weg. Wir können nur feststellen, dass es besser ist." },
      { text: "Darf ich kurz zusammenfassen? Beide Seiten sehen einen Fortschritt." },
      { text: "Einverstanden. Damit schließen wir diesen Punkt." },
    ],
    questions: [
      {
        text: "Wie viel Zeit hat jeder?",
        options: ["Zwei Minuten", "Fünf Minuten", "Eine Minute"],
        answer: 0,
        explain: "„Ich begrüße Sie zur zweiten Runde. Jeder hat zwei Minuten.“",
      },
      {
        text: "Was ist das erste Argument?",
        options: ["Der Weg ist zu weit", "Die Zahlen sind gestiegen", "Es gibt neue Busse"],
        answer: 1,
        explain: "„Erstens: Die Zahlen sind gestiegen.“",
      },
      {
        text: "Worin sind sich am Ende beide Seiten einig?",
        options: ["Es gibt einen Fortschritt", "Es hat sich nichts geändert", "Alles ist gelöst"],
        answer: 0,
        explain: "„Beide Seiten sehen einen Fortschritt.“",
      },
      {
        kind: "gapfill",
        text: "___ der neuen Linien ist das Problem kleiner geworden.",
        options: [],
        answer: 0,
        accept: ["Wegen"],
        explain: "Ardından İSİM geliyor → „wegen“. Cümle gelseydi „weil“ olurdu.",
      },
      {
        kind: "short_answer",
        text: "Wie viele neue Buslinien gibt es?",
        options: [],
        answer: 0,
        accept: ["zwei", "zwei neue Buslinien", "2"],
        explain: "„Es gibt zwei neue Buslinien.“",
      },
    ],
  },
  {
    id: "b1-u18-l2",
    level: "B1",
    skill: "listening",
    unit: 18,
    title: "In der Klinik",
    genre: "Hastane konuşması",
    intro: "Bir ameliyat öncesi konuşma. Ne zaman, kim, ne yapıyor?",
    minutes: 4,
    gloss: [
      { de: "die Operation", tr: "ameliyat", en: "operation" },
      { de: "die Krankenschwester", tr: "hemşire", en: "nurse" },
      { de: "atmen", tr: "nefes almak", en: "to breathe" },
      { de: "das Herz", tr: "kalp", en: "heart" },
    ],
    segments: [
      { text: "Guten Morgen. Die Operation ist für morgen um acht geplant." },
      { text: "Darf ich vorher noch etwas essen?" },
      { text: "Nein, ab Mitternacht nichts mehr essen und trinken." },
      { text: "Und mein Herz? Der Hausarzt hat da etwas geschrieben." },
      { text: "Das haben wir gelesen. Wir lassen Sie vorher noch untersuchen." },
      { text: "Gut. Und wie lange bleibe ich danach?" },
      { text: "Zwei Nächte. Die Krankenschwester zeigt Ihnen gleich das Zimmer." },
      { text: "Danke. Wenn ich schlecht atme, sage ich sofort Bescheid." },
    ],
    questions: [
      {
        text: "Wann ist die Operation?",
        options: ["Morgen um acht", "Heute um acht", "Übermorgen"],
        answer: 0,
        explain: "„Die Operation ist für morgen um acht geplant.“",
      },
      {
        text: "Ab wann darf der Patient nichts mehr essen?",
        options: ["Ab Mitternacht", "Ab sechs Uhr", "Ab morgen früh"],
        answer: 0,
        explain: "„Nein, ab Mitternacht nichts mehr essen und trinken.“",
      },
      {
        text: "Wie lange bleibt er danach?",
        options: ["Eine Nacht", "Zwei Nächte", "Eine Woche"],
        answer: 1,
        explain: "„Zwei Nächte.“",
      },
      {
        kind: "gapfill",
        text: "Wir ___ Sie vorher noch untersuchen.",
        options: [],
        answer: 0,
        accept: ["lassen"],
        explain: "Muayeneyi başkası yapacak → ettirgen „lassen“.",
      },
      {
        kind: "short_answer",
        text: "Wer zeigt ihm das Zimmer?",
        options: [],
        answer: 0,
        accept: ["die Krankenschwester", "Krankenschwester"],
        explain: "„Die Krankenschwester zeigt Ihnen gleich das Zimmer.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u18-w1",
    level: "B1",
    skill: "writing",
    unit: 18,
    title: "Beim Arzt",
    genre: "Şikâyet anlatımı",
    intro: "Doktora durumunu anlat. Bir işi başkasına yaptırırken 'lassen' kullan.",
    minutes: 8,
    gloss: [
      { de: "der Husten", tr: "öksürük", en: "cough" },
      { de: "der Atem", tr: "nefes", en: "breath" },
      { de: "die Untersuchung", tr: "muayene", en: "examination" },
      { de: "leiden", tr: "acı çekmek", en: "to suffer" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Üç haftadır öksürüyorum.",
        answer: "Ich habe seit drei Wochen Husten.",
        hint: "„seit“ + Dativ, şimdiki zamanla.",
      },
      {
        kind: "build",
        tr: "Kendimi muayene ettirmek istiyorum.",
        answer: "Ich möchte mich untersuchen lassen.",
        hint: "Muayeneyi doktor yapar → lassen.",
      },
      {
        kind: "build",
        tr: "Merdivende nefesim daralıyor.",
        answer: "Auf der Treppe bekomme ich schlecht Luft.",
        alternatives: ["Auf der Treppe kann ich schlecht atmen."],
        hint: "Yer öne alınınca fiil ikinci sırada.",
      },
      {
        kind: "form",
        prompt: "Muayene kartını doldur.",
        facts: "Hasta: Sedef Aydın; şikâyet: öksürük; süre: 3 hafta; ek belirti: merdivende nefes darlığı; istek: sevk.",
        fields: [
          { label: "Patientin", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Beschwerde", answer: "Husten", accept: ["der Husten", "Husten seit Wochen"] },
          { label: "Dauer", answer: "3 Wochen", accept: ["drei Wochen"] },
          { label: "Wunsch", answer: "Überweisung", accept: ["eine Überweisung", "zum Facharzt"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Ettirgen yapıyı tamamla.",
        source: "Ich will mich beim Facharzt untersuchen.",
        answer: "Ich will mich beim Facharzt untersuchen lassen.",
        why: "Türkçede ettirgenlik bir EKTİR ('muayene ettirmek'), ayrı bir fiil yoktur, o yüzden Almancada düşüyor. Ama 'lassen' olmadan cümle 'kendi kendimi muayene edeceğim' anlamına gelir. Bir işi BAŞKASINA yaptırmak Almancada daima lassen ile kurulur: schneiden lassen, reparieren lassen, geben lassen.",
      },
    ],
  },
  {
    id: "b1-u18-w2",
    level: "B1",
    skill: "writing",
    unit: 18,
    title: "Ein Debattenbeitrag",
    genre: "Tartışma katkısı",
    intro: "Kısa bir tartışma katkısı yaz. Sebep bir cümle mi, bir isim mi?",
    minutes: 12,
    gloss: [
      { de: "das Argument", tr: "argüman", en: "argument" },
      { de: "die Tatsache", tr: "olgu", en: "fact" },
      { de: "erstens", tr: "birincisi", en: "firstly" },
      { de: "zusammenfassen", tr: "özetlemek", en: "to summarise" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Uzun bekleme süresi yüzünden birçok kişi vazgeçiyor.",
        answer: "Wegen der langen Wartezeit geben viele auf.",
        hint: "Ardından İSİM var → wegen + Genitiv.",
      },
      {
        kind: "build",
        tr: "Bekleme süresi uzun olduğu için birçok kişi vazgeçiyor.",
        answer: "Weil die Wartezeit lang ist, geben viele auf.",
        hint: "Ardından CÜMLE var → weil, fiil sonda.",
      },
      {
        kind: "free",
        prompt: "Bir konuda kısa bir tartışma katkısı yaz: konuyu bir cümlede söyle, iki argüman getir (erstens / zweitens), karşı tarafın bir argümanına cevap ver, ve sonunda özetle. En az bir 'weil' ve bir 'wegen' cümlesi kullan.",
        checklist: [
          "Konu tek cümlede söylenmiş mi?",
          "İki argüman sırayla verilmiş mi?",
          "Karşı argümana cevap var mı?",
          "En az bir 'weil' ve bir 'wegen' cümlesi var mı?",
          "Sonda bir özet var mı?",
        ],
        minWords: 70,
        sample:
          "Ich möchte zu den Wartezeiten beim Facharzt etwas sagen.\n\n" +
          "Erstens ist die Lage schlechter geworden. Das ist keine Meinung, " +
          "sondern eine Tatsache: die Zahlen sind in drei Jahren gestiegen. " +
          "Zweitens trifft es vor allem ältere Leute, weil sie den weiten Weg " +
          "in die Klinik nicht schaffen.\n\n" +
          "Es wird gesagt, dass die neuen Buslinien das ändern. Dem möchte ich " +
          "widersprechen. Wegen der neuen Linien ist das Problem kleiner, " +
          "aber es ist nicht weg.\n\n" +
          "Ich fasse zusammen: Wir können feststellen, dass es einen Fortschritt " +
          "gibt. Trotzdem wartet ein Patient mit Husten immer noch acht Wochen. " +
          "Deshalb bin ich für die Vermittlung — sie kostet wenig und wirkt sofort.",
        phrases: [
          { de: "Erstens … Zweitens …", tr: "Birincisi … İkincisi …", en: "Firstly … Secondly …" },
          { de: "Dem möchte ich widersprechen.", tr: "Buna karşı çıkmak istiyorum.", en: "I would like to contradict that." },
          { de: "Ich fasse zusammen: …", tr: "Özetliyorum: …", en: "To summarise: …" },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Sebep bağlacını düzelt.",
        source: "Wegen ich krank war, bin ich nicht gekommen.",
        answer: "Weil ich krank war, bin ich nicht gekommen.",
        why: "Türkçede '-dığı için' ve 'yüzünden' çoğu zaman birbirinin yerine geçer, o yüzden ikisi de aynı Almanca sözcüğe çevriliyor. Almanca yapıya göre ayırır: weil bir CÜMLE bağlar (fiil sona gider), wegen ise bir İSİM alır ve Genitiv ister — wegen der Krankheit, wegen des Wetters.",
      },
    ],
  },
];
