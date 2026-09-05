import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 22 — "Ortak olan" (dersler 85–88).
 *
 * Dersler: Das Gartenprojekt · Wetterextreme · Das Ehrenamt ·
 * Stadtentwicklung.
 *
 * Ünitenin dili ORTAK BİR ŞEYİ anlatmak: bir bahçe, bir iklim, bir mahalle.
 * İki aktarım hatası buraya düşüyor:
 *   yer tutucu "es"  Türkçede özne YOKSA hiçbir şey konmaz ('yağmur
 *                    yağıyor', 'soğuk'). Almanca cümleyi öznesiz kurmaz:
 *                    es regnet, es wird kälter, es gibt. Yer tutucu 'es'
 *                    anlam taşımaz, o yüzden çevrilirken bütünüyle düşüyor
 *                    ve cümle öznesiz kalıyor.
 *   viel ↔ viele     Türkçede 'çok' değişmez ('çok ağaç', 'çok su').
 *                    Almanca SAYILABİLENDE çoğul çeker (viele Bäume),
 *                    SAYILAMAYANDA çekmez (viel Wasser). Aynı ayrım
 *                    wenig/wenige için de geçerli.
 *
 * Yeni 32 kelime: pflanzen, die Ernte, sich beteiligen, die Teilnahme,
 * die Erde, wachsen, die Gemeinschaft, verteilen, die Hitze, zunehmen,
 * das Klima, die Temperatur, der Wetterbericht, die Wettervorhersage,
 * das Zeichen, die Art, die Verantwortung, sinnvoll, freiwillig,
 * die Pflicht, der Dienst, das Mitglied, der Bewohner, führen,
 * das Viertel, steigen, sich verändern, die Bewohnerin, städtisch,
 * die Einwohnerin, die Vergangenheit, sich ereignen.
 */
export const b1U22: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u22-r1",
    level: "B1",
    skill: "reading",
    unit: 22,
    title: "Der Garten hinter dem Haus",
    genre: "Proje duyurusu",
    intro: "Ortak bir bahçe kuruluyor. Kim ne yapıyor, ürün nasıl paylaşılıyor?",
    minutes: 5,
    gloss: [
      { de: "pflanzen", tr: "dikmek", en: "to plant" },
      { de: "die Ernte", tr: "hasat", en: "harvest" },
      { de: "sich beteiligen", tr: "katılmak", en: "to take part" },
      { de: "verteilen", tr: "paylaştırmak", en: "to distribute" },
      { de: "die Gemeinschaft", tr: "topluluk", en: "community" },
    ],
    text:
      "Hinter dem Haus liegt seit Jahren eine leere Fläche. Ab April machen " +
      "wir daraus einen Garten. Es gibt viele Ideen und genug Platz für alle.\n\n" +
      "Wer sich beteiligen möchte, meldet sich unten im Flur. " +
      "Die Teilnahme kostet nichts. Wir brauchen keine Erfahrung, nur Leute, " +
      "die kommen: Erde tragen, pflanzen, Wasser holen.\n\n" +
      "Die Ernte wird gleich verteilt, egal wie viel jemand gearbeitet hat. " +
      "Das ist eine bewusste Entscheidung. Wer im Sommer krank wird, soll " +
      "trotzdem etwas bekommen.\n\n" +
      "Am Anfang wächst wenig und es sieht nach nichts aus. Im zweiten Jahr " +
      "wird es besser. Eine Gemeinschaft entsteht nicht in einem Monat, " +
      "sondern über zwei Sommer.",
    questions: [
      {
        text: "Was passiert ab April?",
        options: ["Die Fläche wird ein Garten", "Das Haus wird renoviert", "Der Hof wird geschlossen"],
        answer: 0,
        explain: "„Ab April machen wir daraus einen Garten.“",
      },
      {
        text: "Was kostet die Teilnahme?",
        options: ["Nichts", "Zehn Euro", "Eine Stunde pro Woche"],
        answer: 0,
        explain: "„Die Teilnahme kostet nichts.“",
      },
      {
        text: "Wie wird die Ernte verteilt?",
        options: ["Nach Arbeitszeit", "Gleich für alle", "Gar nicht"],
        answer: 1,
        explain: "„Die Ernte wird gleich verteilt, egal wie viel jemand gearbeitet hat.“",
      },
      {
        kind: "gapfill",
        text: "Am Anfang wächst wenig und ___ sieht nach nichts aus.",
        options: [],
        answer: 0,
        accept: ["es"],
        explain: "Almanca cümle öznesiz kurulmaz; anlamı olmayan yer tutucu „es“ gelir.",
      },
      {
        kind: "short_answer",
        text: "Wo meldet man sich?",
        options: [],
        answer: 0,
        accept: ["im Flur", "unten im Flur", "Flur"],
        explain: "„… meldet sich unten im Flur.“",
      },
    ],
  },
  {
    id: "b1-u22-r2",
    level: "B1",
    skill: "reading",
    unit: 22,
    title: "Wie sich das Viertel verändert hat",
    genre: "Mahalle yazısı",
    intro: "Bir mahallenin geçmişi ve bugünü. Ne arttı, ne azaldı?",
    minutes: 5,
    gloss: [
      { de: "das Viertel", tr: "mahalle", en: "quarter" },
      { de: "der Bewohner", tr: "sakin", en: "resident" },
      { de: "sich verändern", tr: "değişmek", en: "to change" },
      { de: "die Vergangenheit", tr: "geçmiş", en: "past" },
      { de: "steigen", tr: "yükselmek", en: "to rise" },
    ],
    text:
      "In der Vergangenheit war dieses Viertel vor allem ein Ort zum Arbeiten. " +
      "Es gab viele kleine Werkstätten und wenige Läden. Wer hier wohnte, " +
      "arbeitete meistens auch hier.\n\n" +
      "Das hat sich verändert. Die Werkstätten sind weg, dafür gibt es jetzt " +
      "viele Cafés. Die Mieten sind in zehn Jahren stark gestiegen, und " +
      "manche Bewohner konnten nicht bleiben.\n\n" +
      "Nicht alles ist schlechter geworden. Es gibt mehr Bäume, weniger Autos " +
      "und eine Schule, die vorher fehlte. Eine Einwohnerin sagte uns: " +
      "„Früher war hier viel Lärm und wenig Leben. Heute ist es andersherum.“\n\n" +
      "Die städtische Planung will das Viertel bis 2030 weiterentwickeln. " +
      "Was dabei mit den letzten günstigen Wohnungen passiert, weiß niemand " +
      "genau. Das ist die eigentliche Frage.",
    questions: [
      {
        text: "Was war das Viertel früher?",
        options: ["Ein Ort zum Arbeiten", "Ein Park", "Ein teures Wohnviertel"],
        answer: 0,
        explain: "„In der Vergangenheit war dieses Viertel vor allem ein Ort zum Arbeiten.“",
      },
      {
        text: "Was ist mit den Mieten passiert?",
        options: ["Sie sind gefallen", "Sie sind stark gestiegen", "Sie sind gleich geblieben"],
        answer: 1,
        explain: "„Die Mieten sind in zehn Jahren stark gestiegen …“",
      },
      {
        text: "Was ist besser geworden?",
        options: ["Mehr Bäume und weniger Autos", "Mehr Werkstätten", "Günstigere Mieten"],
        answer: 0,
        explain: "„Es gibt mehr Bäume, weniger Autos und eine Schule, die vorher fehlte.“",
      },
      {
        kind: "gapfill",
        text: "Es gab ___ kleine Werkstätten und ___ Läden.",
        options: [],
        answer: 0,
        accept: ["viele wenige", "viele / wenige"],
        explain: "Sayılabilir isim → çoğul çekim: vielE Werkstätten, wenigE Läden.",
      },
      {
        kind: "short_answer",
        text: "Bis wann will die städtische Planung weiterentwickeln?",
        options: [],
        answer: 0,
        accept: ["bis 2030", "2030"],
        explain: "„Die städtische Planung will das Viertel bis 2030 weiterentwickeln.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u22-l1",
    level: "B1",
    skill: "listening",
    unit: 22,
    title: "Der Wetterbericht",
    genre: "Hava durumu konuşması",
    intro: "Sıcak bir hafta konuşuluyor. Ne bekleniyor, ne yapılıyor?",
    minutes: 4,
    gloss: [
      { de: "die Hitze", tr: "sıcak", en: "heat" },
      { de: "die Temperatur", tr: "sıcaklık", en: "temperature" },
      { de: "zunehmen", tr: "artmak", en: "to increase" },
      { de: "die Wettervorhersage", tr: "hava tahmini", en: "forecast" },
    ],
    segments: [
      { text: "Hast du die Wettervorhersage gesehen? Es wird noch heißer." },
      { text: "Wie hoch soll die Temperatur denn gehen?" },
      { text: "Sechsunddreißig am Donnerstag. Das ist zu viel für die Kinder." },
      { text: "Diese Wochen nehmen zu. Früher war das einmal im Sommer." },
      { text: "Der Wetterbericht sagt, es bleibt bis Sonntag so." },
      { text: "Dann machen wir den Garten morgens um sieben." },
      { text: "Gute Idee. Bei der Hitze am Mittag arbeitet sowieso niemand." },
      { text: "Und wir nehmen abends Wasser, sonst ist es sofort weg." },
    ],
    questions: [
      {
        text: "Wie hoch soll die Temperatur gehen?",
        options: ["Sechsunddreißig Grad", "Dreißig Grad", "Vierzig Grad"],
        answer: 0,
        explain: "„Sechsunddreißig am Donnerstag.“",
      },
      {
        text: "Wie lange bleibt es so?",
        options: ["Bis Sonntag", "Bis Donnerstag", "Nur einen Tag"],
        answer: 0,
        explain: "„Der Wetterbericht sagt, es bleibt bis Sonntag so.“",
      },
      {
        text: "Wann arbeiten sie im Garten?",
        options: ["Morgens um sieben", "Mittags", "Abends"],
        answer: 0,
        explain: "„Dann machen wir den Garten morgens um sieben.“",
      },
      {
        kind: "gapfill",
        text: "Hast du die Wettervorhersage gesehen? ___ wird noch heißer.",
        options: [],
        answer: 0,
        accept: ["Es"],
        explain: "Hava cümleleri Almancada daima „es“ ile kurulur.",
      },
      {
        kind: "short_answer",
        text: "Wann nehmen sie Wasser?",
        options: [],
        answer: 0,
        accept: ["abends", "am Abend"],
        explain: "„Und wir nehmen abends Wasser, sonst ist es sofort weg.“",
      },
    ],
  },
  {
    id: "b1-u22-l2",
    level: "B1",
    skill: "listening",
    unit: 22,
    title: "Freiwillig oder Pflicht?",
    genre: "Gönüllülük konuşması",
    intro: "Gönüllü hizmet konuşuluyor. Hangi görev, ne kadar sorumluluk?",
    minutes: 4,
    gloss: [
      { de: "freiwillig", tr: "gönüllü", en: "voluntary" },
      { de: "die Pflicht", tr: "yükümlülük", en: "duty" },
      { de: "die Verantwortung", tr: "sorumluluk", en: "responsibility" },
      { de: "das Mitglied", tr: "üye", en: "member" },
    ],
    segments: [
      { text: "Wir suchen noch Leute für den Dienst am Samstag." },
      { text: "Ist das freiwillig oder eine Pflicht für Mitglieder?" },
      { text: "Ganz freiwillig. Niemand muss, aber es hilft sehr." },
      { text: "Wie viel Verantwortung ist das denn?" },
      { text: "Du machst die Tür auf und bleibst zwei Stunden da. Mehr nicht." },
      { text: "Das klingt machbar. Ich habe wenig Zeit, aber zwei Stunden gehen." },
      { text: "Perfekt. Es kommen meistens viele Kinder, dann wird es lebendig." },
      { text: "Dann trage mich ein. Sinnvoll ist es auf jeden Fall." },
    ],
    questions: [
      {
        text: "Ist der Dienst freiwillig?",
        options: ["Ja, ganz freiwillig", "Nein, Pflicht für Mitglieder", "Nur für neue Mitglieder"],
        answer: 0,
        explain: "„Ganz freiwillig. Niemand muss, aber es hilft sehr.“",
      },
      {
        text: "Was ist die Aufgabe?",
        options: ["Die Tür aufmachen und zwei Stunden bleiben", "Kochen", "Die Kinder unterrichten"],
        answer: 0,
        explain: "„Du machst die Tür auf und bleibst zwei Stunden da.“",
      },
      {
        text: "Warum sagt die zweite Person zu?",
        options: ["Sie hat viel Zeit", "Zwei Stunden gehen", "Sie bekommt Geld"],
        answer: 1,
        explain: "„Ich habe wenig Zeit, aber zwei Stunden gehen.“",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___ Zeit, aber zwei Stunden gehen.",
        options: [],
        answer: 0,
        accept: ["wenig"],
        explain: "„Zeit“ sayılamaz → çekimsiz „wenig“. Sayılabilseydi „wenige“ olurdu.",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag ist der Dienst?",
        options: [],
        answer: 0,
        accept: ["am Samstag", "Samstag"],
        explain: "„Wir suchen noch Leute für den Dienst am Samstag.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u22-w1",
    level: "B1",
    skill: "writing",
    unit: 22,
    title: "Notiz zum Wetter",
    genre: "Duyuru notu",
    intro: "Sıcak hafta için bir not yaz. Almanca cümle öznesiz kurulmaz.",
    minutes: 8,
    gloss: [
      { de: "die Hitze", tr: "sıcak", en: "heat" },
      { de: "das Klima", tr: "iklim", en: "climate" },
      { de: "zunehmen", tr: "artmak", en: "to increase" },
      { de: "das Zeichen", tr: "işaret", en: "sign" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Perşembe günü daha da sıcak olacak.",
        answer: "Am Donnerstag wird es noch heißer.",
        hint: "Hava cümlesinde „es“ zorunlu.",
      },
      {
        kind: "build",
        tr: "Öğlen sıcağında bahçede kimse çalışmıyor.",
        answer: "Bei der Hitze am Mittag arbeitet niemand im Garten.",
        hint: "Burada gerçek özne var (niemand), „es“ gelmez.",
      },
      {
        kind: "build",
        tr: "Bu tür haftalar artıyor, iklim için açık bir işaret.",
        answer: "Diese Wochen nehmen zu, ein deutliches Zeichen für das Klima.",
        hint: "Ayrılabilen fiil: önek sonda.",
      },
      {
        kind: "form",
        prompt: "Sıcak hafta duyuru kartını doldur.",
        facts: "Konu: sıcak hafta; en yüksek: perşembe 36 derece; bahçe saati: sabah 7; sulama: akşam; süre: pazara kadar.",
        fields: [
          { label: "Höchste Temperatur", answer: "36 Grad", accept: ["sechsunddreißig", "36"] },
          { label: "Tag", answer: "Donnerstag", accept: ["am Donnerstag"] },
          { label: "Gartenzeit", answer: "morgens um sieben", accept: ["um sieben", "morgens"] },
          { label: "Wasser", answer: "abends", accept: ["am Abend"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Eksik özneyi ekle.",
        source: "Wird immer wärmer und regnet kaum. Gibt fast keine kalten Nächte mehr.",
        answer: "Es wird immer wärmer und es regnet kaum. Es gibt fast keine kalten Nächte mehr.",
        why: "Türkçede özne yoksa hiçbir şey konmaz ('yağmur yağıyor', 'soğuk'), o yüzden Almancada da cümle öznesiz bırakılıyor. Almanca cümleyi öznesiz kurmaz: hava, zaman ve varlık cümlelerinde anlamı olmayan bir yer tutucu gelir — es regnet, es wird kälter, es gibt. 'es' çevrilmez, çünkü karşılığı yoktur; ama düşerse cümle bozulur.",
      },
    ],
  },
  {
    id: "b1-u22-w2",
    level: "B1",
    skill: "writing",
    unit: 22,
    title: "Mein Viertel früher und heute",
    genre: "Karşılaştırmalı yazı",
    intro: "Mahalleni anlat. 'çok' ve 'az' sayılabilirliğe göre çekilir.",
    minutes: 12,
    gloss: [
      { de: "der Bewohner", tr: "sakin", en: "resident" },
      { de: "die Vergangenheit", tr: "geçmiş", en: "past" },
      { de: "städtisch", tr: "kentsel", en: "urban" },
      { de: "sich verändern", tr: "değişmek", en: "to change" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Eskiden çok atölye ve az dükkân vardı.",
        answer: "Früher gab es viele Werkstätten und wenige Läden.",
        hint: "İkisi de sayılabilir → çoğul çekim.",
      },
      {
        kind: "build",
        tr: "Eskiden çok gürültü ve az hayat vardı.",
        answer: "Früher gab es viel Lärm und wenig Leben.",
        hint: "İkisi de sayılamaz → çekimsiz.",
      },
      {
        kind: "free",
        prompt: "Yaşadığın ya da bildiğin bir mahalleyi anlat: eskiden nasıldı, ne değişti, ne iyileşti, ne kötüleşti, ve geleceği için ne düşünüyorsun. En az iki 'viel/viele' ve bir 'wenig/wenige' kullan.",
        checklist: [
          "Geçmiş durumu anlatılmış mı?",
          "En az iki somut değişiklik var mı?",
          "Hem iyileşen hem kötüleşen bir yön var mı?",
          "viel/viele ve wenig/wenige doğru çekilmiş mi?",
          "Gelecek üzerine bir cümle var mı?",
        ],
        minWords: 70,
        sample:
          "In der Vergangenheit war mein Viertel vor allem ein Ort zum Arbeiten. " +
          "Es gab viele kleine Werkstätten, wenige Läden und sehr viel Lärm.\n\n" +
          "Das hat sich stark verändert. Heute gibt es viele Cafés und wenig " +
          "Arbeit im Haus. Die Straße vor meinem Haus ist ruhiger geworden, weil " +
          "weniger Autos durchfahren. Es gibt auch mehr Bäume als früher.\n\n" +
          "Nicht alles ist besser. Die Mieten sind in zehn Jahren stark " +
          "gestiegen, und einige Bewohner konnten nicht bleiben. Eine Nachbarin, " +
          "die vierzig Jahre hier gewohnt hat, ist letztes Jahr weggezogen.\n\n" +
          "Die städtische Planung will bis 2030 weiterbauen. Ich hoffe, dass " +
          "dabei an die alten Bewohner gedacht wird. Ein Viertel ist nicht nur " +
          "die Fläche, sondern die Leute darauf.",
        phrases: [
          { de: "In der Vergangenheit war …", tr: "Geçmişte … idi.", en: "In the past … was …" },
          { de: "Das hat sich verändert.", tr: "Bu değişti.", en: "That has changed." },
          { de: "Nicht alles ist besser geworden.", tr: "Her şey iyileşmedi.", en: "Not everything has improved." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„viel“ ve „wenig“ çekimlerini düzelt.",
        source: "Es gibt viel Bäume, wenig Läden und viele Lärm.",
        answer: "Es gibt viele Bäume, wenige Läden und viel Lärm.",
        why: "Türkçede 'çok' ve 'az' hiç değişmez ('çok ağaç', 'çok su'), o yüzden Almancada da tek biçim kullanılıyor. Almanca sayılabilirliğe bakar: SAYILABİLEN çoğul isimde çekim alır (viele Bäume, wenige Läden), SAYILAMAYAN isimde almaz (viel Lärm, wenig Zeit). Ölçüt anlam değil, ismin çoğulu olup olmadığı.",
      },
    ],
  },
];
