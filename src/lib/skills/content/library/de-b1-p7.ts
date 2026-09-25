import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 eğitim hattı: ödev tartışması üzerine söyleşi, halk eğitim merkezinin
 * duyurusu, okula yazılan bir mektup. Dil bilgisi anlatı geçmişi —
 * Präteritum'un konuşmadaki değil yazıdaki yeri.
 */
export const deB1P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r7",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "„Hausaufgaben sind kein Training“",
    genre: "interview",
    intro: "Bir okul müdürüyle söyleşi: ödevi neden kaldırdılar, yerine ne koydular, itirazlara ne diyorlar.",
    gloss: [
      { de: "die Hausaufgabe", tr: "ev ödevi", en: "homework" },
      { de: "abschaffen", tr: "kaldırmak", en: "to abolish" },
      { de: "der Elternabend", tr: "veli toplantısı", en: "parents' evening" },
      { de: "die Betreuung", tr: "destek", en: "supervision" },
      { de: "benachteiligt", tr: "dezavantajlı", en: "disadvantaged" },
      { de: "der Widerstand", tr: "direniş", en: "resistance" },
    ],
    minutes: 6,
    text:
      "Seit zwei Jahren gibt es an der Ostschule keine Hausaufgaben mehr. " +
      "Wir haben mit der Schulleiterin Frau Dr. Rehm gesprochen.\n\n" +
      "Frage: Warum haben Sie die Hausaufgaben abgeschafft?\n" +
      "Rehm: Weil sie nicht das gemacht haben, was sie sollten. " +
      "Kinder mit Hilfe zu Hause gaben saubere Hefte ab, die anderen gar nichts. " +
      "Die Aufgabe hat also nicht geübt, sondern sortiert.\n\n" +
      "Frage: Was machen Sie stattdessen?\n" +
      "Rehm: Die letzte Stunde am Tag ist eine Übungsstunde mit Betreuung. " +
      "Wer schnell fertig ist, liest oder hilft. Zu Hause soll gelesen werden, sonst nichts.\n\n" +
      "Frage: Gab es Widerstand?\n" +
      "Rehm: Und wie. Am ersten Elternabend war es laut. " +
      "Viele Eltern hatten Angst, dass die Kinder weniger lernen. " +
      "Nach einem Jahr kam die Frage dann fast nicht mehr, weil die Noten stabil geblieben sind " +
      "und der Streit am Abendbrottisch weg war.\n\n" +
      "Frage: Würden Sie es anderen Schulen empfehlen?\n" +
      "Rehm: Nur mit der Übungsstunde. Hausaufgaben einfach zu streichen, ohne Ersatz, " +
      "würde genau die Kinder treffen, die ohnehin benachteiligt sind.",
    questions: [
      {
        text: "Was war laut Frau Rehm das Hauptproblem mit Hausaufgaben?",
        options: [
          "Sie haben zu viel Zeit gekostet.",
          "Sie haben Unterschiede sichtbar gemacht statt zu üben.",
          "Die Lehrer konnten sie nicht korrigieren.",
        ],
        answer: 1,
        explain: "„Die Aufgabe hat also nicht geübt, sondern sortiert.“",
      },
      {
        text: "Was tritt an die Stelle der Hausaufgaben?",
        options: [
          "eine Übungsstunde mit Betreuung",
          "mehr Prüfungen",
          "freiwillige Aufgaben im Internet",
        ],
        answer: 0,
        explain: "„Die letzte Stunde am Tag ist eine Übungsstunde mit Betreuung.“",
      },
      {
        kind: "truefalse",
        text: "Die Eltern waren von Anfang an einverstanden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Am ersten Elternabend war es laut“ — itiraz bir yıl sonra azalmış.",
      },
      {
        kind: "gapfill",
        text: "Zu Hause soll nur noch ___ werden.",
        options: [],
        answer: 0,
        accept: ["gelesen"],
        explain: "„Zu Hause soll gelesen werden, sonst nichts.“",
      },
      {
        kind: "short_answer",
        text: "Warum kam die Frage nach einem Jahr kaum noch?",
        options: [],
        answer: 0,
        accept: ["die Noten blieben stabil", "die Noten sind stabil geblieben", "stabile Noten"],
        explain: "Notlar sabit kalmış ve akşam masasındaki tartışma bitmiş.",
      },
      {
        text: "Unter welcher Bedingung empfiehlt sie das Modell?",
        options: [
          "nur an kleinen Schulen",
          "nur mit einer Übungsstunde als Ersatz",
          "nur wenn die Eltern zustimmen",
        ],
        answer: 1,
        explain: "„Nur mit der Übungsstunde“ — karşılıksız kaldırmak dezavantajlı çocukları vururdu.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l7",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Das neue Programm der Volkshochschule",
    genre: "info",
    intro: "Halk eğitim merkezinin yeni dönem duyurusu: hangi kurslar var, ne değişti, kayıt nasıl.",
    gloss: [
      { de: "das Semester", tr: "dönem", en: "term" },
      { de: "die Ermäßigung", tr: "indirim", en: "reduction" },
      { de: "die Anmeldung", tr: "kayıt", en: "registration" },
      { de: "die Warteliste", tr: "yedek liste", en: "waiting list" },
      { de: "der Abschluss", tr: "bitirme belgesi", en: "qualification" },
      { de: "nachholen", tr: "telafi etmek", en: "to catch up on" },
    ],
    minutes: 6,
    segments: [
      { text: "Willkommen bei der Volkshochschule Nordstadt. Das neue Semester beginnt am zwölften September." },
      { text: "Neu im Programm sind vier Kurse: Reparieren im Haushalt, Nähen für Anfänger, Podcast machen und Stadtgeschichte." },
      { text: "Die Sprachkurse bleiben im Angebot, aber mit einer Änderung: Es gibt jetzt zwei Tempi: Kurse mit zwei Terminen pro Woche und Kurse mit einem Termin pro Woche." },
      { text: "Wer einen Schulabschluss nachholen möchte, meldet sich bitte persönlich. Für diese Kurse gibt es ein Beratungsgespräch." },
      { text: "Die Gebühren steigen leider um vier Prozent. Eine Ermäßigung von fünfzig Prozent bekommen Menschen ohne Arbeit und Studierende." },
      { text: "Die Anmeldung läuft ab Montag online. Kurse mit wenigen Plätzen sind oft nach zwei Tagen voll." },
      { text: "Bitte melden Sie sich trotzdem auf der Warteliste an. Erfahrungsgemäß werden bis Kursbeginn zwanzig Prozent der Plätze wieder frei." },
    ],
    questions: [
      {
        text: "Was ist bei den Sprachkursen neu?",
        options: [
          "Sie sind kostenlos.",
          "Es gibt zwei verschiedene Tempi.",
          "Sie finden nur noch online statt.",
        ],
        answer: 1,
        explain: "„Es gibt jetzt zwei Tempi: Kurse mit zwei Terminen pro Woche und Kurse mit einem Termin pro Woche.“",
      },
      {
        text: "Wie meldet man sich für den Schulabschluss an?",
        options: ["online", "persönlich mit Beratungsgespräch", "telefonisch"],
        answer: 1,
        explain: "„meldet sich bitte persönlich. Für diese Kurse gibt es ein Beratungsgespräch.“",
      },
      {
        kind: "truefalse",
        text: "Die Gebühren bleiben gleich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Die Gebühren steigen leider um vier Prozent.“",
      },
      {
        kind: "gapfill",
        text: "Studierende bekommen eine Ermäßigung von ___ Prozent.",
        options: [],
        answer: 0,
        accept: ["fünfzig", "50"],
        explain: "„Eine Ermäßigung von fünfzig Prozent bekommen Menschen ohne Arbeit und Studierende.“",
      },
      {
        kind: "short_answer",
        text: "Warum lohnt sich die Warteliste?",
        options: [],
        answer: 0,
        accept: [
          "zwanzig Prozent werden frei",
          "Plätze werden wieder frei",
          "es werden Plätze frei",
          "zwanzig Prozent der Plätze werden wieder frei",
          "weil Plätze wieder frei werden",
          "weil zwanzig Prozent der Plätze wieder frei werden",
          "weil oft Plätze frei werden",
        ],
        explain: "„werden bis Kursbeginn zwanzig Prozent der Plätze wieder frei“.",
      },
      {
        text: "Wann beginnt die Anmeldung?",
        options: ["am Montag online", "am zwölften September", "nach dem Beratungsgespräch"],
        answer: 0,
        explain: "„Die Anmeldung läuft ab Montag online“; 12 Eylül dönemin başlangıcı.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w7",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Brief an die Schulleitung",
    genre: "letter",
    intro: "Okul yönetimine bir öneri götürüyorsun: önce iki cümle kur, sonra gerekçeli bir mektup yaz.",
    gloss: [
      { de: "der Vorschlag", tr: "öneri", en: "proposal" },
      { de: "die Schulleitung", tr: "okul yönetimi", en: "school management" },
      { de: "der Aufwand", tr: "emek", en: "effort" },
      { de: "umsetzen", tr: "hayata geçirmek", en: "to implement" },
      { de: "die Bitte", tr: "rica", en: "request" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Veli olarak bir öneri getirmek istiyorum.",
        answer: "Als Elternteil möchte ich einen Vorschlag machen.",
        alternatives: ["Ich möchte als Elternteil einen Vorschlag machen."],
        hint: "„als“ burada rol bildiriyor ve isim artikelsiz kalır.",
      },
      {
        kind: "build",
        tr: "Bunun büyük bir emek gerektirmediğine inanıyorum.",
        answer: "Ich glaube, dass das keinen großen Aufwand bedeutet.",
        alternatives: ["Ich glaube nicht, dass das einen großen Aufwand bedeutet."],
        hint: "„dass“ yan cümlesinde çekimli fiil sona gider; „kein“ ismi olumsuzlar.",
      },
      {
        kind: "free",
        prompt:
          "Okul yönetimine bir mektup yaz: kim olduğunu ve hangi sınıfla ilgili yazdığını söyle, önerini açıkça anlat, iki gerekçe ver, olası bir itirazı öngörüp cevapla ve somut bir sonraki adım öner.",
        checklist: [
          "Kendini tanıt ve neden yazdığını söyle",
          "Öneriyi tek cümleyle net biçimde yaz",
          "İki gerekçe ver",
          "Olası bir itirazı yaz ve somut bir adım öner",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich wende mich an Sie, weil …", tr: "Size şunun için yazıyorum: …", en: "I am writing to you because …" },
          { de: "Mein Vorschlag wäre, …", tr: "Önerim şu olurdu: …", en: "My suggestion would be …" },
          { de: "Dafür spricht erstens …, zweitens …", tr: "Bunun lehine birincisi …, ikincisi …", en: "In favour of this are, firstly … and secondly …" },
          { de: "Mir ist bewusst, dass …", tr: "Şunun farkındayım: …", en: "I am aware that …" },
          { de: "Ich würde mich freuen, wenn wir darüber sprechen könnten.", tr: "Bunu konuşabilirsek sevinirim.", en: "I would be glad if we could talk about it." },
        ],
        sample:
          "Sehr geehrte Frau Dr. Rehm,\n\nmein Name ist Sinan Aktas und meine Tochter besucht die Klasse 6c. " +
          "Ich wende mich an Sie, weil viele Kinder aus unserer Straße mit dem Rad zur Schule kommen " +
          "und die Abstellplätze nicht reichen. Mein Vorschlag wäre, den kleinen Hof hinter der Turnhalle " +
          "für zwanzig weitere Fahrräder zu öffnen. Dafür spricht erstens, dass der Hof morgens leer steht, " +
          "und zweitens, dass die Räder dort vom Fenster des Sekretariats aus zu sehen sind. " +
          "Mir ist bewusst, dass dafür ein Tor geöffnet und abends wieder geschlossen werden müsste. " +
          "Ich glaube aber, dass das keinen großen Aufwand bedeutet, und einige Eltern haben schon angeboten, " +
          "sich dabei abzuwechseln. Ich würde mich freuen, wenn wir am nächsten " +
          "Elternabend zehn Minuten darüber sprechen könnten.\n\nMit freundlichen Grüßen\nSinan Aktas",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s7",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Lernt man abends oder morgens besser?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: kendi öğrenme düzenini anlat ve genel bir tavsiye ver.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Sen ne zaman daha iyi öğreniyorsun? Kendi düzenini anlat, bunu nasıl fark ettiğini söyle ve bu düzeni kuramayan birine ne önerirsin.",
      bulletsTr: [
        "Kendi düzenini tek cümleyle söyle",
        "Bunu nasıl fark ettiğini anlat",
        "Düzenin bozulduğu bir durumu yaz",
        "Başkasına somut bir tavsiye ver",
      ],
      targets: [
        { de: "Bei mir funktioniert es am besten, wenn …", tr: "Bende en iyi … olduğunda işliyor" },
        { de: "Gemerkt habe ich das, als …", tr: "Bunu … olduğunda fark ettim" },
        { de: "Schwierig wird es immer dann, wenn …", tr: "Hep … olduğunda zorlaşıyor" },
        { de: "Ich würde jedem raten, …", tr: "Herkese … tavsiye ederim" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Bei mir funktioniert es am besten, wenn ich direkt nach dem Frühstück anfange, also zwischen sieben " +
        "und neun. Gemerkt habe ich das, als ich ein Semester lang jeden Abend gelernt habe und immer " +
        "dieselben zwei Seiten dreimal lesen musste, bevor etwas hängen blieb. Am Morgen brauche ich für " +
        "dieselbe Seite die Hälfte der Zeit. Schwierig wird es immer dann, wenn ich früh einen Termin habe, " +
        "denn danach komme ich nicht mehr richtig hinein. Deshalb schiebe ich Termine, wenn es geht, " +
        "auf den Nachmittag. Ich würde jedem raten, zwei Wochen lang aufzuschreiben, wie lange eine " +
        "bestimmte Aufgabe morgens und abends dauert. Man diskutiert dann nicht mehr über Gefühle, " +
        "sondern sieht die Zahlen und kann seinen Tag danach planen.",
      rubricHint:
        "Kendi düzeninin nasıl fark edildiği somut anlatılmalı ve tavsiye uygulanabilir olmalı; „als“, „immer dann, wenn“ ve „würde … raten“ yapıları beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g7",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Als ich klein war, wohnten wir …",
    genre: "grammar",
    intro: "Yazılı anlatımın geçmiş zamanı Perfekt değil Präteritum'dur; biçimlerini ve nerede kullanıldığını öğren.",
    focus: "Präteritum: düzenli, düzensiz ve karma fiiller",
    gloss: [
      { de: "erzählen", tr: "anlatmak", en: "to tell" },
      { de: "das Märchen", tr: "masal", en: "fairy tale" },
      { de: "fahren", tr: "gitmek", en: "to travel" },
      { de: "bringen", tr: "getirmek", en: "to bring" },
      { de: "damals", tr: "o zamanlar", en: "back then" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Nerede kullanılır?",
        tr: "Präteritum yazılı anlatımın zamanıdır: haber, hikâye, masal, rapor, biyografi. Konuşmada ise Perfekt kullanılır — tek istisna „sein“, „haben“ ve modal fiillerdir; onlar konuşmada da Präteritum'la gelir.",
        examples: [
          { de: "Damals wohnten wir in einem kleinen Dorf.", tr: "O zamanlar küçük bir köyde otururduk.", note: "anlatı → Präteritum" },
          { de: "Ich hatte gestern keine Zeit.", tr: "Dün vaktim yoktu.", note: "haben: konuşmada da Präteritum" },
          { de: "Wir mussten leider absagen.", tr: "Maalesef iptal etmek zorunda kaldık.", note: "modal fiil: aynı" },
        ],
      },
      {
        heading: "Düzenli fiiller: -te",
        tr: "Düzenli fiiller köke -te ekler ve kişi eklerini onun üstüne alır: ich sagte, du sagtest, er sagte, wir sagten. Birinci ve üçüncü tekil kişi AYNIDIR. Kökü -t ya da -d ile bitenlerde araya -e girer: arbeitete, redete.",
        examples: [
          { de: "Sie erzählte jeden Abend ein Märchen.", tr: "Her akşam bir masal anlatırdı.", note: "erzählen → erzählte" },
          { de: "Wir arbeiteten damals zu zweit.", tr: "O zamanlar iki kişi çalışıyorduk.", note: "araya -e girer" },
          { de: "Er antwortete nicht.", tr: "Cevap vermedi.", note: "antworten → antwortete" },
        ],
      },
      {
        heading: "Düzensiz ve karma fiiller",
        tr: "Düzensiz fiillerde kök ünlüsü değişir ve tekil birinci ile üçüncü kişi EKSİZDİR: ich fuhr, er fuhr, wir fuhren. Karma fiiller ikisini birden yapar: kök değişir AMA -te eki de gelir — bringen → brachte, denken → dachte, wissen → wusste.",
        examples: [
          { de: "Wir fuhren mit dem Nachtzug nach Wien.", tr: "Viyana'ya gece treniyle gittik.", note: "fahren → fuhr" },
          { de: "Er brachte uns jeden Morgen Brot.", tr: "Bize her sabah ekmek getirirdi.", note: "karma: brachte" },
          { de: "Niemand wusste die Antwort.", tr: "Cevabı kimse bilmiyordu.", note: "karma: wusste" },
        ],
      },
    ],
    questions: [
      {
        text: "Damals ___ wir in einem kleinen Dorf.",
        options: ["wohnten", "wohnen", "gewohnt"],
        answer: 0,
        explain: "Anlatı geçmişi: düzenli fiil çoğul birinci kişide -ten alır.",
      },
      {
        text: "Welche Form ist Präteritum von „fahren“ (er)?",
        options: ["fahrte", "fuhr", "gefahren"],
        answer: 1,
        explain: "„fahren“ düzensizdir: kök ünlüsü değişir ve üçüncü tekil kişi eksizdir.",
      },
      {
        text: "In welchem Text erwartet man Präteritum?",
        options: ["in einem Gespräch beim Kaffee", "in einer Kurzgeschichte", "in einer Sprachnachricht"],
        answer: 1,
        explain: "Präteritum yazılı anlatımın zamanıdır; konuşmada Perfekt kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Sie ___ jeden Abend ein Märchen. (erzählen)",
        options: [],
        answer: 0,
        accept: ["erzählte"],
        explain: "Düzenli fiil, üçüncü tekil kişi: erzählte.",
      },
      {
        kind: "gapfill",
        text: "Er ___ uns jeden Morgen Brot. (bringen)",
        options: [],
        answer: 0,
        accept: ["brachte"],
        explain: "Karma fiil: kök değişir ve -te eki de gelir.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ damals zu zweit. (arbeiten)",
        options: [],
        answer: 0,
        accept: ["arbeiteten"],
        explain: "Kökü -t ile bittiği için araya -e girer: arbeiteten.",
      },
      {
        kind: "gapfill",
        text: "Niemand ___ die Antwort. (wissen)",
        options: [],
        answer: 0,
        accept: ["wusste"],
        explain: "Karma fiil: wissen → wusste.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "fuhren", "mit dem Nachtzug", "nach Wien"],
        explain: "Präteritum'da çekimli fiil yine ikinci sırada durur.",
      },
      {
        kind: "truefalse",
        text: "„Ich hatte gestern keine Zeit.“ — Bu cümle günlük konuşmada doğal mı?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„haben“ konuşmada da Präteritum ile kullanılır.",
      },
      {
        kind: "truefalse",
        text: "„Er fahrte nach Wien.“ — Bu biçim doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„fahren“ düzensizdir; doğrusu „Er fuhr nach Wien.“",
      },
    ],
  },
];
