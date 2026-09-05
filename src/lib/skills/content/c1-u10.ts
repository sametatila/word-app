import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 10 — "Para, müzik, yalancı eşdeğer, günlük kullanım".
 *
 * Dört ders: Geld zum Fenster hinaus · Den Ton angeben · Wörtlich wird's
 * falsch · Ein Tag voller Bilder.
 *
 *   Kelime: Geld zum Fenster hinauswerfen, tief in die Tasche greifen, auf
 *           Heller und Pfennig, ein Vermögen kosten, knapp bei Kasse sein, das
 *           Geld auf den Kopf hauen, jeden Cent umdrehen, die Kosten im Griff
 *           haben · den Ton angeben, nach jemandes Pfeife tanzen, Musik in
 *           meinen Ohren, die erste Geige spielen, der Ohrwurm, den richtigen
 *           Ton treffen, das ist eine andere Melodie, jemandem einen Sturm
 *           entfachen · die Falle, sinngemäß, die Entsprechung, verwechseln,
 *           missverständlich, der falsche Freund, wörtlich nehmen, seinen Senf
 *           dazugeben · der Alltag, einstreuen, dosiert, unauffällig, der
 *           Zusammenhang, ins Wasser fallen, auf Anhieb, im Gegenzug
 *
 * Deyim bloğunun kapanışı ve bilerek KENDİ ÜSTÜNE dönüyor: son ders deyim
 * kullanmayı değil, DOZUNU öğretiyor. Bir metinde üç deyim renk katar, sekiz
 * deyim yapmacık yapar — ve yabancı konuşan tam bu eşiği kaçırır, çünkü her
 * yeni öğrendiğini kullanmak ister.
 *
 * Yalancı eşdeğer dersi ise Türkçe konuşana özgü: birebir çeviri bazen
 * çalışır, bazen anlamı tersine çevirir, ve hangisinin hangisi olduğu
 * ezberlenmez — sınanır.
 */
export const c1U10: SkillExercise[] = [
  {
    id: "c1-u10-r1",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "Wer den Ton angibt",
    genre: "Deneme",
    intro: "Müzik ve para deyimleri: ikisi de güç ilişkisini tarif ediyor.",
    gloss: [
      { de: "den Ton angeben", tr: "havayı belirlemek", en: "to call the tune" },
      { de: "nach jemandes Pfeife tanzen", tr: "birinin dediğini yapmak", en: "to dance to someone's tune" },
      { de: "die erste Geige spielen", tr: "birinci kemanı çalmak", en: "to play first fiddle" },
      { de: "Musik in meinen Ohren", tr: "kulağa hoş gelen", en: "music to my ears" },
      { de: "den richtigen Ton treffen", tr: "doğru tonu tutturmak", en: "to strike the right note" },
      { de: "das Geld auf den Kopf hauen", tr: "har vurup harman savurmak", en: "to blow one's money" },
      { de: "die Kosten im Griff haben", tr: "maliyeti kontrol altında tutmak", en: "to have costs under control" },
    ],
    minutes: 7,
    text:
      "ORCHESTER UND KASSENBUCH\n\n" +
      "Zwei Bildfelder beschreiben in fast jeder Sprache Macht: Musik und Geld. Im Deutschen sind beide auffällig genau.\n\n" +
      "Wer „den Ton angibt“, bestimmt nicht, was gespielt wird, sondern in welcher Höhe alle einsetzen. Das Bild sagt also: Diese Person legt nicht den Inhalt fest, sondern den Rahmen. Wer dagegen „nach jemandes Pfeife tanzt“, hat weder das eine noch das andere.\n\n" +
      "„Die erste Geige spielen“ liegt dazwischen. Die erste Geige führt, aber sie dirigiert nicht — sie ist die sichtbarste Stimme, nicht die entscheidende. Wer den Unterschied kennt, kann in einem Satz sagen, wie eine Abteilung wirklich funktioniert.\n\n" +
      "Bei den Geldbildern zeigt sich eine andere Feinheit: Sie bewerten. „Das Geld auf den Kopf hauen“ ist nie neutral; „jeden Cent umdrehen“ auch nicht, aber in die andere Richtung. Wer sachlich bleiben will, sagt „die Kosten im Griff haben“ — das einzige Bild dieser Familie, das ohne Urteil auskommt.\n\n" +
      "Deshalb sind Geldbilder in Protokollen heikel und Musikbilder erstaunlich brauchbar. „Wer gibt hier eigentlich den Ton an?“ ist eine Frage nach Zuständigkeit, gestellt in vier Wörtern — und dabei so höflich, dass niemand sie abwehren kann.",
    questions: [
      {
        text: "Was bedeutet „den Ton angeben“ laut Text genau?",
        options: [
          "Den Inhalt bestimmen",
          "Den Rahmen bestimmen, in dem alle einsetzen",
          "Am lautesten sprechen",
        ],
        answer: 1,
        explain: "„Diese Person legt nicht den Inhalt fest, sondern den Rahmen.“",
      },
      {
        kind: "gapfill",
        text: "Die erste Geige führt, aber sie ___ nicht.",
        options: [],
        answer: 0,
        accept: ["dirigiert"],
        explain: "En görünür ses ile karar veren ses aynı değil — deyimin taşıdığı ayrım bu.",
      },
      {
        text: "Welches Geldbild kommt laut Text ohne Urteil aus?",
        options: [
          "das Geld auf den Kopf hauen",
          "jeden Cent umdrehen",
          "die Kosten im Griff haben",
        ],
        answer: 2,
        explain: "„das einzige Bild dieser Familie, das ohne Urteil auskommt“.",
      },
      {
        kind: "short_answer",
        text: "Warum ist „Wer gibt hier eigentlich den Ton an?“ laut Text so brauchbar?",
        options: [],
        answer: 0,
        accept: [
          "es ist eine Frage nach Zuständigkeit, aber so höflich, dass niemand sie abwehren kann",
          "höfliche Frage nach Zuständigkeit",
          "sie fragt nach Zuständigkeit ohne anzugreifen",
        ],
        explain: "Dört kelimede yetki sorusu — ve reddedilemeyecek kadar kibar.",
      },
      {
        text: "Der Text hält Geldbilder für besonders geeignet in Protokollen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Geldbilder in Protokollen heikel“ — çünkü çoğu yargı taşıyor.",
      },
    ],
  },
  {
    id: "c1-u10-r2",
    level: "C1",
    skill: "reading",
    unit: 10,
    title: "Wörtlich wird's falsch",
    genre: "Rehber yazısı",
    intro: "Türkçeden Almancaya deyim taşımak: hangisi geçer, hangisi tuzak?",
    gloss: [
      { de: "der falsche Freund", tr: "yalancı eşdeğer", en: "false friend" },
      { de: "die Entsprechung", tr: "karşılık", en: "equivalent" },
      { de: "sinngemäß", tr: "anlamca", en: "in substance" },
      { de: "verwechseln", tr: "karıştırmak", en: "to confuse" },
      { de: "missverständlich", tr: "yanlış anlaşılmaya açık", en: "ambiguous" },
      { de: "wörtlich nehmen", tr: "kelimesi kelimesine almak", en: "to take literally" },
      { de: "die Falle", tr: "tuzak", en: "trap" },
    ],
    minutes: 7,
    text:
      "DREI ARTEN VON ÜBERSETZUNG\n\n" +
      "Wer eine Redewendung aus dem Türkischen ins Deutsche bringen will, steht vor drei Fällen — und der zweite ist die eigentliche Falle.\n\n" +
      "ERSTER FALL: Das Bild existiert in beiden Sprachen und meint dasselbe. „Den Stier bei den Hörnern packen“ — hier kann man wörtlich arbeiten. Solche Fälle sind häufiger, als Lernende glauben, weil viele Bilder aus gemeinsamen Quellen stammen.\n\n" +
      "ZWEITER FALL: Das Bild existiert in beiden Sprachen und meint etwas anderes. Das ist der falsche Freund unter den Redewendungen, und er ist gefährlicher als ein unbekanntes Wort — weil man nicht merkt, dass man etwas nicht weiß. Wer glaubt, verstanden zu haben, fragt nicht nach.\n\n" +
      "DRITTER FALL: Das Bild existiert nur in einer Sprache. Das ist unangenehm, aber harmlos: Man merkt sofort, dass es nicht funktioniert, und weicht auf eine sinngemäße Formulierung aus.\n\n" +
      "Die praktische Konsequenz ist unerwartet. Man sollte nicht das Unbekannte fürchten, sondern das Vertraute. Ein Bild, das sich mühelos übersetzen lässt, verdient eine kurze Prüfung — genau weil es keinen Widerstand leistet.\n\n" +
      "Und wenn keine Entsprechung existiert? Dann sagt man es einfach. Ein klarer Satz ohne Bild ist nie falsch; eine missverständliche Redewendung schon.",
    questions: [
      {
        text: "Welcher der drei Fälle ist laut Text die eigentliche Falle?",
        options: ["Der erste", "Der zweite", "Der dritte"],
        answer: 1,
        explain: "İki dilde var ama farklı anlama gelen — çünkü bilmediğini fark etmiyorsun.",
      },
      {
        kind: "gapfill",
        text: "Ein klarer Satz ohne Bild ist nie falsch; eine ___ Redewendung schon.",
        options: [],
        answer: 0,
        accept: ["missverständliche"],
        explain: "Deyim kullanmamak risksiz; yanlış anlaşılan deyim risklidir.",
      },
      {
        text: "Warum ist der zweite Fall gefährlicher als ein unbekanntes Wort?",
        options: [
          "Weil er seltener vorkommt",
          "Weil man nicht merkt, dass man etwas nicht weiß",
          "Weil er schwerer zu lernen ist",
        ],
        answer: 1,
        explain: "„Wer glaubt, verstanden zu haben, fragt nicht nach.“",
      },
      {
        kind: "short_answer",
        text: "Was ist die überraschende praktische Konsequenz des Textes?",
        options: [],
        answer: 0,
        accept: [
          "nicht das Unbekannte fürchten, sondern das Vertraute",
          "das Vertraute prüfen",
          "gerade leicht übersetzbare Bilder prüfen",
        ],
        explain: "„genau weil es keinen Widerstand leistet“ — direnç göstermeyen çeviri sınanmalı.",
      },
      {
        kind: "short_answer",
        text: "Was tut man laut Text, wenn keine Entsprechung existiert?",
        options: [],
        answer: 0,
        accept: [
          "man sagt es einfach, ohne Bild",
          "sinngemäß formulieren",
          "einen klaren Satz ohne Bild schreiben",
        ],
        explain: "Üçüncü durum rahatsız ama zararsız: hemen fark ediliyor.",
      },
    ],
  },
  {
    id: "c1-u10-l1",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "Knapp bei Kasse",
    genre: "Diyalog",
    intro: "Bütçe konuşması. Para deyimleri hangi yargıyı taşıyor?",
    gloss: [
      { de: "knapp bei Kasse sein", tr: "parası kıt olmak", en: "to be short of money" },
      { de: "Geld zum Fenster hinauswerfen", tr: "parayı çöpe atmak", en: "to throw money out of the window" },
      { de: "tief in die Tasche greifen", tr: "cebinden çok para çıkarmak", en: "to dig deep" },
      { de: "ein Vermögen kosten", tr: "servete mal olmak", en: "to cost a fortune" },
      { de: "jeden Cent umdrehen", tr: "her kuruşu hesaplamak", en: "to count every penny" },
      { de: "auf Heller und Pfennig", tr: "kuruşuna kadar", en: "down to the last penny" },
      { de: "die Kosten im Griff haben", tr: "maliyeti kontrol altında tutmak", en: "to have costs under control" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Bode", text: "Die neue Software kostet ein Vermögen. Vierzigtausend im ersten Jahr." },
      { speaker: "Herr Lorenz", text: "Und die alte kostet uns jeden Monat drei Tage Handarbeit." },
      { speaker: "Frau Bode", text: "Trotzdem: Wir sind knapp bei Kasse. Der Vorstand dreht gerade jeden Cent um." },
      { speaker: "Herr Lorenz", text: "Dann müssen wir es so rechnen, dass er es nachvollziehen kann. Drei Tage im Monat sind sechsunddreißig im Jahr." },
      { speaker: "Frau Bode", text: "Das ist ein Argument. Aber ich möchte es auf Heller und Pfennig belegen, nicht schätzen." },
      { speaker: "Herr Lorenz", text: "Einverstanden. Ich ziehe die Stundenzettel." },
      { speaker: "Frau Bode", text: "Und noch etwas: Sagen Sie im Vorstand bitte nicht, die alte Lösung sei Geld zum Fenster hinausgeworfen." },
      { speaker: "Herr Lorenz", text: "Warum nicht? Es stimmt doch." },
      { speaker: "Frau Bode", text: "Weil zwei der Anwesenden sie damals beschlossen haben. Sagen Sie lieber: Wir haben die Kosten damit nicht im Griff." },
      { speaker: "Herr Lorenz", text: "Verstanden. Gleiche Aussage, kein Vorwurf." },
      { speaker: "Frau Bode", text: "Genau. Wir müssen einmal tief in die Tasche greifen — nicht jemanden bloßstellen." },
    ],
    questions: [
      {
        text: "Warum soll Herr Lorenz „Geld zum Fenster hinausgeworfen“ nicht sagen?",
        options: [
          "Weil es unhöflich klingt",
          "Weil zwei Anwesende die alte Lösung beschlossen haben",
          "Weil es zu umgangssprachlich ist",
        ],
        answer: 1,
        explain: "Deyim yargı taşıyor ve yargı odadaki kişilere düşüyor.",
      },
      {
        kind: "gapfill",
        text: "Wir sind ___ bei Kasse.",
        options: [],
        answer: 0,
        accept: ["knapp"],
        explain: "knapp bei Kasse sein: para sıkıntısı — nötr ve toplantıda kullanılabilir.",
      },
      {
        text: "Welche Formulierung schlägt Frau Bode stattdessen vor?",
        options: [
          "Die alte Lösung war ein Fehler.",
          "Wir haben die Kosten damit nicht im Griff.",
          "Das hat ein Vermögen gekostet.",
        ],
        answer: 1,
        explain: "„Gleiche Aussage, kein Vorwurf.“ Yargısız olan tek para deyimi bu.",
      },
      {
        kind: "dictation",
        text: "Frau Bode'nin kanıt konusundaki isteğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Aber ich möchte es auf Heller und Pfennig belegen, nicht schätzen.",
          "Ich möchte es auf Heller und Pfennig belegen, nicht schätzen.",
        ],
        explain: "auf Heller und Pfennig: kuruşuna kadar — tahmine karşı kesinlik.",
      },
    ],
  },
  {
    id: "c1-u10-l2",
    level: "C1",
    skill: "listening",
    unit: 10,
    title: "Dosiert einstreuen",
    genre: "Diyalog",
    intro: "Metinde kaç deyim fazla? Bir yazı üstünden dozaj konuşması.",
    gloss: [
      { de: "einstreuen", tr: "serpiştirmek", en: "to sprinkle in" },
      { de: "dosiert", tr: "dozunda", en: "in measured amounts" },
      { de: "unauffällig", tr: "göze batmayan", en: "unobtrusive" },
      { de: "der Zusammenhang", tr: "bağlam", en: "context" },
      { de: "ins Wasser fallen", tr: "suya düşmek", en: "to fall through" },
      { de: "auf Anhieb", tr: "ilk seferde", en: "straight away" },
      { de: "im Gegenzug", tr: "buna karşılık", en: "in return" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Vogt", text: "Ihr Text ist gut. Aber Sie haben acht Redewendungen auf anderthalb Seiten." },
      { speaker: "Leyla", text: "Ich dachte, das macht ihn lebendig." },
      { speaker: "Herr Vogt", text: "Zwei machen ihn lebendig. Acht machen ihn zu einem Sprachkurs." },
      { speaker: "Leyla", text: "Woran merken Sie das?" },
      { speaker: "Herr Vogt", text: "Daran, dass ich beim Lesen die Bilder zähle statt der Argumente. Sobald das passiert, ist die Dosis zu hoch." },
      { speaker: "Leyla", text: "Welche würden Sie behalten?" },
      { speaker: "Herr Vogt", text: "„Der Termin ist ins Wasser gefallen“ — die sitzt, weil sie einen Sachverhalt abkürzt. Und „auf Anhieb“, weil sie unauffällig ist." },
      { speaker: "Leyla", text: "Und die anderen sechs?" },
      { speaker: "Herr Vogt", text: "Die stehen im falschen Zusammenhang. Eine Redewendung braucht einen Satz davor, der sie trägt — sonst wirkt sie eingestreut, und man sieht das Einstreuen." },
      { speaker: "Leyla", text: "Im Gegenzug wird der Text dann trockener." },
      { speaker: "Herr Vogt", text: "Nein, genauer. Trocken wird er, wenn Sie stattdessen nichts setzen. Streichen Sie sechs Bilder und schreiben Sie an zwei Stellen einen konkreten Satz." },
      { speaker: "Leyla", text: "Also nicht weniger Farbe, sondern andere." },
      { speaker: "Herr Vogt", text: "Richtig. Ein Detail wirkt stärker als ein Bild — und niemand hat es schon hundertmal gelesen." },
    ],
    questions: [
      {
        text: "Woran merkt Herr Vogt, dass die Dosis zu hoch ist?",
        options: [
          "Der Text wird zu lang.",
          "Er zählt beim Lesen die Bilder statt der Argumente.",
          "Die Redewendungen sind falsch gebildet.",
        ],
        answer: 1,
        explain: "Ölçüt sayı değil, okurun dikkatinin nereye kaydığı.",
      },
      {
        kind: "gapfill",
        text: "Streue Redewendungen ___ ein.",
        options: [],
        answer: 0,
        accept: ["dosiert"],
        explain: "dosiert: dozunda. Ayrılabilen fiil ön eki cümle sonunda.",
      },
      {
        text: "Warum behält er „auf Anhieb“?",
        options: [
          "Weil sie kurz ist",
          "Weil sie unauffällig ist",
          "Weil sie selten benutzt wird",
        ],
        answer: 1,
        explain: "Göze batmayan deyim metnin akışını bozmuyor.",
      },
      {
        kind: "short_answer",
        text: "Was braucht eine Redewendung laut Herrn Vogt, um zu wirken?",
        options: [],
        answer: 0,
        accept: [
          "einen Satz davor, der sie trägt",
          "den richtigen Zusammenhang",
          "einen tragenden Satz davor",
        ],
        explain: "„sonst wirkt sie eingestreut, und man sieht das Einstreuen“.",
      },
    ],
  },
  {
    id: "c1-u10-w1",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "Yargı taşıyan deyim, taşımayan deyim",
    genre: "Dil bilgisi",
    intro: "Aynı olguyu iki deyimle söyle: biri suçlar, öteki tarif eder.",
    gloss: [
      { de: "die Kosten im Griff haben", tr: "maliyeti kontrol altında tutmak", en: "to have costs under control" },
      { de: "Geld zum Fenster hinauswerfen", tr: "parayı çöpe atmak", en: "to throw money away" },
      { de: "sinngemäß", tr: "anlamca", en: "in substance" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Maliyeti bununla kontrol altında tutamadık.",
        answer: "Wir haben die Kosten damit nicht im Griff gehabt",
        hint: "im Griff haben: yargısız, olguyu tarif eden biçim.",
      },
      {
        kind: "build",
        tr: "Bir kez cebimizden çok para çıkarmamız gerekiyor.",
        answer: "Wir müssen einmal tief in die Tasche greifen",
        hint: "tief in die Tasche greifen: harcamayı kabul, suçlama yok.",
      },
      {
        kind: "build",
        tr: "Toplantı suya düştü.",
        answer: "Der Termin ist ins Wasser gefallen",
        hint: "sein ile çekiliyor; olgu bildiriyor, kimseyi işaret etmiyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi yargısız hâle getir: aynı olgu kalsın, suçlama gitsin.",
        source: "Die alte Lösung war Geld zum Fenster hinausgeworfen.",
        answer: "Mit der alten Lösung hatten wir die Kosten nicht im Griff.",
        alternatives: [
          "Mit der alten Lösung hatten wir die Kosten nicht im Griff",
          "Die alte Lösung hat die Kosten nicht im Griff gehalten.",
        ],
        why: "İki cümle aynı olguyu bildiriyor ama birincisi kararı verenleri de yargılıyor. Toplantıda o kişiler oturuyorsa deyim tartışmayı olgudan kişiye kaydırır — C1'de deyim seçimi bir nezaket değil, strateji sorusudur.",
      },
    ],
  },
  {
    id: "c1-u10-w2",
    level: "C1",
    skill: "writing",
    unit: 10,
    title: "Zwei Bilder, nicht acht",
    genre: "Metin düzeltme",
    intro: "Deyimle dolu bir metni seyrelt: altısını at, ikisini bırak, iki somut cümle yaz.",
    gloss: [
      { de: "dosiert", tr: "dozunda", en: "in measured amounts" },
      { de: "unauffällig", tr: "göze batmayan", en: "unobtrusive" },
      { de: "der Zusammenhang", tr: "bağlam", en: "context" },
      { de: "einstreuen", tr: "serpiştirmek", en: "to sprinkle in" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki metin deyimle dolu. Yeniden yaz: en fazla İKİ deyim bırak (taşıyan ve göze batmayan olanları seç), kalanları at ve yerine en az iki SOMUT cümle koy — rakam, tarih ya da ayrıntı. Bilgi kaybolmasın.",
        stimulus:
          "DÜZELTİLECEK METİN (proje raporu girişi):\n\n" +
          "Das Projekt ist im letzten Quartal ins Wasser gefallen. Wir haben Geld zum Fenster hinausgeworfen, mussten tief in die Tasche greifen und standen am Ende doch mit leeren Händen da. Der Kollege aus dem Vertrieb hat von Anfang an den Ton angegeben, während wir nach seiner Pfeife getanzt haben. Auf Anhieb schien alles das Gelbe vom Ei zu sein, aber im Gegenzug hat niemand die Kosten im Griff gehabt. Unterm Strich haben wir aus einer Mücke einen Elefanten gemacht.",
        checklist: [
          "En fazla iki deyim kaldı mı?",
          "Kalan deyimler taşıyor ve göze batmıyor mu?",
          "En az iki somut cümle (rakam, tarih, ayrıntı) eklendi mi?",
          "Suçlayıcı deyimler yargısız ifadeyle mi değiştirildi?",
        ],
        minWords: 80,
        phrases: [
          { de: "Das Projekt ist im letzten Quartal ins Wasser gefallen.", tr: "proje geçen çeyrekte suya düştü", en: "the project fell through last quarter" },
          { de: "Die Zuständigkeit war zu keinem Zeitpunkt schriftlich geregelt.", tr: "yetki hiçbir aşamada yazılı değildi", en: "responsibility was never set down in writing" },
          { de: "Wir haben die Kosten nicht im Griff gehabt.", tr: "maliyeti kontrol altında tutamadık", en: "we did not have the costs under control" },
        ],
        sample:
          "Das Projekt ist im letzten Quartal ins Wasser gefallen.\n\n" +
          "Die Kosten haben wir dabei nicht im Griff gehabt: Von veranschlagten 90.000 Euro sind 138.000 abgeflossen, der größte Teil davon in zwei Nachbestellungen im August und im Oktober.\n\n" +
          "Die zweite Ursache ist nicht finanzieller Art. Die Zuständigkeit war zu keinem Zeitpunkt schriftlich geregelt. Freigaben kamen aus dem Vertrieb, die Verantwortung lag formal bei uns — eine Konstellation, in der Entscheidungen schnell fallen und niemand sie später vertreten muss.\n\n" +
          "Rückblickend war der Fehler nicht die einzelne Ausgabe, sondern dass wir das Missverhältnis erst im vierten Monat angesprochen haben. Für das Folgeprojekt schlagen wir vor, Freigabegrenzen und Zuständigkeiten vor dem Start auf einer Seite festzuhalten.",
      },
    ],
  },
];
