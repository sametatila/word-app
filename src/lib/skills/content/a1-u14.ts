import type { SkillExercise } from "../types";

/**
 * A1 · Ünite 14 — "Bilet, gecikme, taksi ve mesafe".
 *
 * Dört ders: Eine Fahrkarte, bitte · Der Zug hat Verspätung · Mit dem Taxi ·
 * Ist das weit? İçerik ünite 1-14'ün kelimeleriyle sınırlı.
 *
 *   Ünite 14: die Fahrkarte, der Automat, einfach, hin und zurück, das Gleis,
 *             das Ticket, gültig, der Platz · der Zug, die Verspätung, warten,
 *             pünktlich, die Abfahrt, die Ankunft, der Abflug, der Anschluss ·
 *             das Taxi, der Fahrer, der Flughafen, halten, das Trinkgeld,
 *             das Auto, die Autobahn, einsteigen · der Stadtplan, die Brücke,
 *             die Nähe, zu Fuß, gegenüber, die Mitte, daneben, laufen
 *   Kalıplar: Einmal nach … bitte. · Von welchem Gleis fährt der Zug? ·
 *             Der Zug hat Verspätung. · Zum Flughafen, bitte. · Stimmt so. ·
 *             Ist das weit? · Das ist fünf Minuten zu Fuß.
 *
 * Konum sözcükleri bu ünitede genişliyor: ünite 13 zwischen'i öğretmişti,
 * burada gegenüber, daneben ve die Mitte geliyor. Egzersizler üçünü de
 * kullanıyor — önceki ünitelerde bilerek kullanılmadılar.
 */
export const a1U14: SkillExercise[] = [
  {
    id: "a1-u14-r1",
    level: "A1",
    skill: "reading",
    unit: 14,
    title: "Am Fahrkartenautomat",
    genre: "Bilgilendirme",
    intro: "Bilet otomatındaki bilgi ekranını okuyacaksın.",
    gloss: [
      { de: "die Fahrkarte", tr: "bilet", en: "ticket" },
      { de: "einfach", tr: "tek yön", en: "one way" },
      { de: "gültig", tr: "geçerli", en: "valid" },
      { de: "das Gleis", tr: "peron", en: "platform" },
    ],
    minutes: 3,
    text:
      "FAHRKARTEN — Automat 3\n\nEinfach nach Bremen … 12,00 Euro\nHin und zurück nach Bremen … 20,00 Euro\nEinfach nach Hamburg … 28,00 Euro\n\nKinder unter 6 Jahren fahren kostenlos.\n\nIhre Fahrkarte ist einen Tag gültig. Sie können auch mit Bus und Straßenbahn fahren.\n\nZüge nach Bremen: Gleis 4. Züge nach Hamburg: Gleis 7.\n\nSie können mit Karte oder bar bezahlen. Eine Frage? Fragen Sie gegenüber.",
    questions: [
      {
        text: "Was kostet hin und zurück nach Bremen?",
        options: ["20,00 Euro", "12,00 Euro", "28,00 Euro"],
        answer: 0,
        explain: "„Hin und zurück nach Bremen … 20,00 Euro“. 12 Euro tek yön.",
      },
      {
        kind: "gapfill",
        text: "Züge nach Bremen fahren von Gleis ___.",
        options: [],
        answer: 0,
        accept: ["4"],
        explain: "„Züge nach Bremen: Gleis 4.“",
      },
      {
        text: "Wie lange ist die Fahrkarte gültig?",
        options: ["einen Tag", "eine Stunde", "eine Woche"],
        answer: 0,
        explain: "„Ihre Fahrkarte ist einen Tag gültig.“",
      },
      {
        text: "Richtig oder falsch? Kleine Kinder bezahlen auch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Kinder unter 6 Jahren fahren kostenlos.“",
      },
      {
        text: "Wo kann man fragen?",
        options: ["gegenüber", "daneben", "in der Mitte"],
        answer: 0,
        explain: "„Eine Frage? Fragen Sie gegenüber.“",
      },
    ],
  },
  {
    id: "a1-u14-r2",
    level: "A1",
    skill: "reading",
    unit: 14,
    title: "Der Zug hat Verspätung",
    genre: "Anons metni",
    intro: "Garda yazılı bir duyuru. Trenler ne durumda?",
    gloss: [
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "pünktlich", tr: "dakik", en: "on time" },
      { de: "der Anschluss", tr: "aktarma", en: "connection" },
      { de: "die Abfahrt", tr: "kalkış", en: "departure" },
    ],
    minutes: 3,
    text:
      "BAHNHOF BREMEN\n\nDer Zug nach Hamburg, Abfahrt 14:20, hat 20 Minuten Verspätung. Abfahrt jetzt: 14:40, Gleis 7.\n\nDer Zug nach Berlin, Abfahrt 15:00, ist pünktlich. Gleis 4.\n\nIhr Anschluss in Hamburg: Sie warten dort 10 Minuten. Der Anschluss ist sicher.\n\nSie fahren zum Flughafen? Die S-Bahn fährt alle 10 Minuten von Gleis 1.\n\nEin Taxi finden Sie gegenüber vom Bahnhof. Zu Fuß gehen Sie über die Brücke.",
    questions: [
      {
        text: "Wie viel Verspätung hat der Zug nach Hamburg?",
        options: ["20 Minuten", "10 Minuten", "keine"],
        answer: 0,
        explain: "„hat 20 Minuten Verspätung“ — 14:20 yerine 14:40.",
      },
      {
        text: "Welcher Zug ist pünktlich?",
        options: ["der Zug nach Berlin", "der Zug nach Hamburg", "die S-Bahn"],
        answer: 0,
        explain: "„Der Zug nach Berlin … ist pünktlich.“",
      },
      {
        kind: "gapfill",
        text: "Die Abfahrt nach Hamburg ist jetzt um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["14:40", "14.40"],
        explain: "„Abfahrt jetzt: 14:40, Gleis 7.“",
      },
      {
        text: "Wie kommt man zum Flughafen?",
        options: ["mit der S-Bahn von Gleis 1", "mit dem Zug nach Berlin", "zu Fuß"],
        answer: 0,
        explain: "„Die S-Bahn fährt alle 10 Minuten von Gleis 1.“",
      },
    ],
  },
  {
    id: "a1-u14-l1",
    level: "A1",
    skill: "listening",
    unit: 14,
    title: "Einmal nach Bremen",
    genre: "Diyalog",
    intro: "Gişede bilet alınıyor. Tek yön mü gidiş dönüş mü?",
    gloss: [
      { de: "hin und zurück", tr: "gidiş dönüş", en: "return" },
      { de: "das Gleis", tr: "peron", en: "platform" },
      { de: "die Abfahrt", tr: "kalkış", en: "departure" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag. Einmal nach Bremen, bitte." },
      { text: "Einfach oder hin und zurück?" },
      { text: "Hin und zurück, bitte. Was kostet das?" },
      { text: "20 Euro. Der Zug fährt um 14:20 von Gleis 4." },
      { text: "Danke. Ist der Zug pünktlich?" },
      { text: "Ja, heute hat er keine Verspätung." },
    ],
    questions: [
      {
        text: "Welche Fahrkarte kauft die Person?",
        options: ["hin und zurück", "einfach", "für Kinder"],
        answer: 0,
        explain: "„Hin und zurück, bitte.“",
      },
      {
        kind: "gapfill",
        text: "Der Zug fährt von Gleis ___.",
        options: [],
        answer: 0,
        accept: ["4"],
        explain: "„Der Zug fährt um 14:20 von Gleis 4.“",
      },
      {
        text: "Hat der Zug Verspätung?",
        options: ["Nein, er ist pünktlich", "Ja, 20 Minuten", "Das sagt der Text nicht"],
        answer: 0,
        explain: "„heute hat er keine Verspätung.“",
      },
      {
        text: "Was kostet die Fahrkarte?",
        options: ["20 Euro", "14 Euro", "12 Euro"],
        answer: 0,
        explain: "„20 Euro.“ 14:20 ise kalkış saati.",
      },
    ],
  },
  {
    id: "a1-u14-l2",
    level: "A1",
    skill: "listening",
    unit: 14,
    title: "Zum Flughafen, bitte",
    genre: "Diyalog",
    intro: "Takside bir yolculuk. Ne kadar sürüyor, ne kadar tutuyor?",
    gloss: [
      { de: "der Fahrer", tr: "şoför", en: "driver" },
      { de: "das Trinkgeld", tr: "bahşiş", en: "tip" },
      { de: "die Autobahn", tr: "otoyol", en: "motorway" },
    ],
    minutes: 2,
    segments: [
      { text: "Guten Tag. Zum Flughafen, bitte." },
      { text: "Gern. Steigen Sie ein." },
      { text: "Wie lange dauert es?" },
      { text: "Über die Autobahn 25 Minuten." },
      { text: "Gut. — So, wir sind da. Das macht 38 Euro." },
      { text: "Hier sind 40. Stimmt so." },
    ],
    questions: [
      {
        text: "Wohin fährt die Person?",
        options: ["zum Flughafen", "zum Bahnhof", "in die Stadt"],
        answer: 0,
        explain: "„Zum Flughafen, bitte.“",
      },
      {
        kind: "gapfill",
        text: "Die Fahrt dauert ___ Minuten.",
        options: [],
        answer: 0,
        accept: ["25"],
        explain: "„Über die Autobahn 25 Minuten.“",
      },
      {
        text: "Was kostet die Fahrt?",
        options: ["38 Euro", "40 Euro", "25 Euro"],
        answer: 0,
        explain: "„Das macht 38 Euro.“ 40 Euro verilen para — üstü bahşiş.",
      },
      {
        text: "Was heißt „Stimmt so“?",
        options: [
          "Der Rest ist Trinkgeld",
          "Der Preis ist falsch",
          "Die Person möchte Geld zurück",
        ],
        answer: 0,
        explain: "„Stimmt so“ = üstü kalsın. 38 Euro'luk yolculuğa 40 Euro veriliyor.",
      },
    ],
  },
  {
    id: "a1-u14-w1",
    level: "A1",
    skill: "writing",
    unit: 14,
    title: "Fahrkarte und Verspätung",
    genre: "Dil bilgisi",
    intro: "Bilet alma ve gecikme cümleleri.",
    gloss: [
      { de: "die Fahrkarte", tr: "bilet", en: "ticket" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "warten", tr: "beklemek", en: "to wait" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bremen'e bir bilet, lütfen.",
        answer: "Einmal nach Bremen, bitte",
        hint: "Gişede sabit kalıp: „Einmal nach …, bitte.“ Şehir adı „nach“ ile gelir.",
      },
      {
        kind: "build",
        tr: "Tren yirmi dakika gecikmeli.",
        answer: "Der Zug hat zwanzig Minuten Verspätung",
        hint: "Almancada gecikme „haben“ ile kurulur: „hat Verspätung“ — „ist verspätet“ değil.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi gidiş dönüş biletine çevir.",
        source: "Einmal einfach nach Hamburg.",
        answer: "Einmal hin und zurück nach Hamburg.",
        alternatives: ["Einmal hin und zurück nach Hamburg"],
        why: "„einfach“ tek yön, „hin und zurück“ gidiş dönüş demek.",
      },
    ],
  },
  {
    id: "a1-u14-w2",
    level: "A1",
    skill: "writing",
    unit: 14,
    title: "Ist das weit?",
    genre: "Mesaj",
    intro: "Arkadaşına gardan nasıl geleceğini ve ne kadar süreceğini yaz.",
    gloss: [
      { de: "die Nähe", tr: "yakınlık", en: "vicinity" },
      { de: "zu Fuß", tr: "yürüyerek", en: "on foot" },
      { de: "gegenüber", tr: "karşısında", en: "opposite" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bu beş dakika yürüme mesafesinde.",
        answer: "Das ist fünf Minuten zu Fuß",
        hint: "„zu Fuß“ değişmez bir kalıp: yürüyerek. Araçla olsa „mit dem Bus“ derdik.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşının mesajına cevap yaz (4-5 cümle). Gardan nasıl geleceğini, ne kadar süreceğini ve yakında ne olduğunu yaz.",
        stimulus:
          "Hallo! Mein Zug kommt um 14:40 in Bremen an. Wohnst du weit vom Bahnhof? Kommst du zum Bahnhof oder gehe ich zu Fuß? Tom",
        minWords: 30,
        checklist: [
          "Uzak mı yakın mı yazdın mı? (Das ist in der Nähe. / Das ist weit.)",
          "Süre verdin mi? (… Minuten zu Fuß / mit dem Bus)",
          "Bir konum sözcüğü kullandın mı? (gegenüber, daneben, in der Mitte, zwischen)",
          "Bir öneri yaptın mı? (Geh zu Fuß. / Fahr mit dem Bus.)",
        ],
        phrases: [
          { de: "Das ist in der Nähe.", tr: "Burası yakın.", en: "That's nearby." },
          { de: "… Minuten zu Fuß", tr: "… dakika yürüyerek", en: "… minutes on foot" },
          { de: "gegenüber vom Bahnhof", tr: "garın karşısında", en: "opposite the station" },
        ],
        sample:
          "Hallo Tom,\n\nich wohne nicht weit. Es ist zehn Minuten zu Fuß vom Bahnhof.\n\nGeh geradeaus, dann links. Meine Wohnung ist gegenüber von der Post, daneben ist eine Bäckerei.\n\nEin Taxi brauchst du nicht — es ist wirklich in der Nähe. Mit dem Bus geht es auch, Linie 7.\n\nIch warte um 14:40 am Bahnhof!\nElif",
      },
    ],
  },
];
