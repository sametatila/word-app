import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 17 — "Ara açıklama, gönderme, eksilti, kasıtlı çift anlam".
 *
 * Dört ders: Berlin, die Hauptstadt · Darauf komme ich zurück ·
 * Weniger ist mehr · Absichtlich zweideutig.
 *
 *   Kelime: die Apposition, einschieben, der Einschub, das Komma, ergänzend,
 *           die Sichtweise, der Blickwinkel, aufschlussreich · der Verweis,
 *           diesbezüglich, Letzteres, sich beziehen auf, hinweisen auf,
 *           folglich, obgleich, zugunsten · die Ellipse, weglassen, die Kürze,
 *           verständlich, der Telegrammstil, preisgeben, vorschnell,
 *           kurzsichtig · die Zweideutigkeit, absichtlich, auslegen,
 *           offenlassen, beabsichtigt, die Anspielung, subtil, verschleiern
 *
 * Ünitenin çekirdeği: ANLAMIN BÜYÜK KISMI SÖYLENMEYENDE. Dördü de aynı
 * işlemin dereceleri — ara açıklama fazlayı araya sıkıştırır, gönderme
 * sözcüğü tekrar etmeden geri işaret eder, eksilti çıkarılabileni atar,
 * kasıtlı çift anlam ise bilerek açık bırakır.
 *
 * Türkçe konuşan için asıl sürtünme gönderme hattında: Türkçe ismi
 * rahatça tekrar eder ("bu konu … bu konuda …"), Almanca aynı tekrarı
 * acemilik sayar ve "diesbezüglich", "Letzteres", "darauf" ister. Eksiltide
 * ise ters yön: Türkçe eki düşürerek kısaltır, Almanca sözcüğü atar — ve
 * neyin atılabileceği kayıt meselesidir, kısalık meselesi değil.
 */
export const c1U17: SkillExercise[] = [
  {
    id: "c1-u17-r1",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "Neue Firma für die Gebäudereinigung",
    genre: "email",
    intro: "Bina yönetimi iki temizlik teklifini karşılaştırıp bir öneride bulunuyor. Hangisi, neden?",
    gloss: [
      { de: "diesbezüglich", tr: "bu konuda", en: "in this regard" },
      { de: "Letzteres", tr: "sonuncusu", en: "the latter" },
      { de: "Ersteres", tr: "ilki", en: "the former" },
      { de: "folglich", tr: "dolayısıyla", en: "consequently" },
      { de: "obgleich", tr: "her ne kadar", en: "although" },
      { de: "zugunsten", tr: "lehine", en: "in favor of" },
      { de: "die Vergabe", tr: "ihale", en: "award of a contract" },
      { de: "die Gebäudereinigung", tr: "bina temizliği", en: "building cleaning" },
      { de: "verbleiben", tr: "geriye kalmak", en: "to remain" },
      { de: "die Referenz", tr: "referans", en: "reference" },
      { de: "abschneiden", tr: "sonuç almak", en: "to perform" },
      { de: "angewiesen sein auf", tr: "muhtaç olmak", en: "to depend on" },
      { de: "vertretbar", tr: "kabul edilebilir", en: "justifiable" },
      { de: "der Engpass", tr: "darboğaz", en: "bottleneck" },
      { de: "die Inhaberin", tr: "sahibi", en: "owner" },
      { de: "die Zusage", tr: "taahhüt", en: "commitment" },
      { de: "lediglich", tr: "yalnızca", en: "merely" },
      { de: "solche", tr: "böyle", en: "such" },
    ],
    minutes: 7,
    text:
      "Betreff: Vergabe der Gebäudereinigung ab Januar\n\n" +
      "Sehr geehrte Frau Dr. Winter,\n\n" +
      "wie in der Sitzung am 4. November vereinbart, haben wir die beiden verbliebenen Angebote für die Gebäudereinigung geprüft: das der Firma Blitzblank aus Hannover und das der Firma Glanzwerk aus Celle. Letzteres erscheint uns günstiger; wir möchten es annehmen.\n\n" +
      "Zunächst zu den Kosten. Blitzblank verlangt 4.800 Euro im Monat, Glanzwerk 4.150 Euro. Der Unterschied ergibt sich vor allem aus den Fahrtkosten, die bei Ersterem deutlich höher ausfallen. Auf ein Jahr gerechnet sparen wir folglich knapp 7.800 Euro.\n\n" +
      "Obgleich der Preis entscheidend war, haben wir auch die Qualität geprüft. Beide Firmen haben uns Referenzen genannt. Diesbezüglich hat Glanzwerk besser abgeschnitten: Die Stadtbibliothek Celle, die wir angerufen haben, lobte vor allem die Zuverlässigkeit. Bei Blitzblank verwies man uns lediglich auf die Internetseite.\n\n" +
      "Ein Punkt spricht allerdings zugunsten von Blitzblank. Die Firma bietet eine Reinigung am Samstag an, was bei der anderen nicht möglich ist. Darauf sind wir aber nur im Lager angewiesen, und dort kann die Reinigung auch freitags nach 18 Uhr stattfinden. Wir halten dies deshalb für vertretbar.\n\n" +
      "Ein Risiko möchte ich nicht verschweigen: Glanzwerk ist ein kleiner Betrieb mit zwölf Beschäftigten. Fallen mehrere krank aus, könnte es Engpässe geben. Wir haben das angesprochen, und die Inhaberin hat zugesagt, in einem solchen Fall eine Partnerfirma einzusetzen. Diese Zusage möchten wir in den Vertrag aufnehmen.\n\n" +
      "Wenn Sie einverstanden sind, schicke ich den Vertragsentwurf bis Ende der Woche an die Rechtsabteilung. Der bisherige Vertrag endet am 31. Dezember; eine Verlängerung wäre folglich nicht nötig.\n\n" +
      "Mit freundlichen Grüßen\n" +
      "Tobias Feld, Gebäudemanagement",
    questions: [
      {
        text: "Welche Firma soll den Auftrag bekommen?",
        options: [
          "Blitzblank",
          "Beide Firmen gemeinsam",
          "Glanzwerk",
        ],
        answer: 2,
        explain: "„Letzteres“ ikinci sayılan teklifi, yani Glanzwerk'i gösteriyor.",
      },
      {
        kind: "gapfill",
        text: "___ erscheint uns günstiger; wir möchten es annehmen.",
        options: [],
        answer: 0,
        accept: ["Letzteres"],
        explain: "İkisinden sonuncusu; Ersteres ilkini gösterir.",
      },
      {
        text: "Was spricht für Blitzblank?",
        options: [
          "Der niedrigere Preis",
          "Eine Reinigung am Samstag",
          "Die besseren Referenzen",
        ],
        answer: 1,
        explain: "„Die Firma bietet eine Reinigung am Samstag an, was bei der anderen nicht möglich ist.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel spart das Unternehmen im Jahr?",
        options: [],
        answer: 0,
        accept: ["knapp 7.800 Euro", "7.800 Euro", "7800 Euro", "7.800"],
        explain: "„Auf ein Jahr gerechnet sparen wir folglich knapp 7.800 Euro.“",
      },
      {
        kind: "short_answer",
        text: "Welches Risiko nennt Herr Feld?",
        options: [],
        answer: 0,
        accept: [
          "Engpässe bei Krankheit",
          "die Firma ist klein",
          "kleiner Betrieb",
          "zu wenig Personal bei Krankheit",
        ],
        explain: "Firma küçük; birkaç çalışan aynı anda hastalanırsa temizlikte aksama olabilir.",
      },
    ],
  },
  {
    id: "c1-u17-r2",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "Aufbau am Messestand",
    genre: "message",
    intro: "Fuar standını kuran bir ekibin gün boyu yazışmaları. Neler aksadı, nasıl çözüldü?",
    gloss: [
      { de: "der Aufbau", tr: "kurulum", en: "setup" },
      { de: "das Plakat", tr: "afiş", en: "poster" },
      { de: "anbei", tr: "ekte", en: "attached" },
      { de: "das Muster", tr: "numune", en: "sample" },
      { de: "der Prospekt", tr: "broşür", en: "brochure" },
      { de: "die Laufkundschaft", tr: "gelip geçen müşteriler", en: "walk-in customers" },
      { de: "erledigt", tr: "halledildi", en: "done" },
      { de: "betreuen", tr: "ilgilenmek", en: "to look after" },
      { de: "aktuell", tr: "güncel", en: "current" },
      { de: "egal", tr: "fark etmez", en: "doesn't matter" },
    ],
    minutes: 7,
    text:
      "TEAMCHAT ZUR MESSE, DIENSTAG\n\n" +
      "07:42 Jana: Guten Morgen! Stand steht, Strom fehlt noch. Techniker kommt um neun.\n" +
      "07:45 Niklas: Danke. Plakate?\n" +
      "07:46 Jana: Im Auto. Bringe ich gleich rein.\n" +
      "08:10 Niklas: Anbei die Preisliste, Version 3. Wie besprochen, ohne Rabatte.\n" +
      "08:12 Jana: Gesehen. Drucke ich aus.\n" +
      "09:20 Jana: Strom läuft. Bildschirm auch. Kaffeemaschine leider nicht.\n" +
      "09:21 Niklas: Egal. Hauptsache Bildschirm.\n" +
      "10:05 Frau Hartmann: Kurze Frage an alle: Wer betreut morgen früh den Stand? Herr Sommer von der Firma Kranich hat sich für 10 Uhr angekündigt.\n" +
      "10:07 Niklas: Ich. Wenn nötig, auch schon ab acht.\n" +
      "10:08 Frau Hartmann: Danke. Bitte die neuen Muster mitnehmen, nicht die vom letzten Jahr.\n" +
      "10:09 Niklas: Klar.\n" +
      "11:30 Jana: Lieferung Prospekte: 200 statt 500. Rest angeblich morgen.\n" +
      "11:31 Frau Hartmann: Das reicht nicht. Bitte in der Druckerei anrufen und eine feste Uhrzeit verlangen.\n" +
      "11:52 Jana: Erledigt. Morgen 8 Uhr, direkt an den Stand.\n" +
      "14:15 Niklas: Herr Sommer hat abgesagt. Neuer Termin Donnerstag, 14 Uhr.\n" +
      "14:16 Frau Hartmann: Schade. Dann morgen mehr Zeit für Laufkundschaft. Bitte trotzdem pünktlich.\n" +
      "14:40 Jana: Frage: Abendessen mit dem Vertrieb heute, 19 Uhr, noch aktuell?\n" +
      "14:41 Niklas: Ja. Restaurant am Hauptbahnhof. Tisch auf Hartmann.\n" +
      "17:55 Frau Hartmann: Danke euch beiden für heute. Ein guter Aufbau, trotz Strom, Druckerei und Absage. Bis gleich beim Essen.",
    questions: [
      {
        text: "Wann trifft das Team Herrn Sommer jetzt?",
        options: [
          "Morgen um 10 Uhr",
          "Heute um 19 Uhr",
          "Am Donnerstag um 14 Uhr",
        ],
        answer: 2,
        explain: "„Herr Sommer hat abgesagt. Neuer Termin Donnerstag, 14 Uhr.“",
      },
      {
        kind: "gapfill",
        text: "Anbei die Preisliste, Version 3. ___ besprochen, ohne Rabatte.",
        options: [],
        answer: 0,
        accept: ["Wie"],
        explain: "„Wie besprochen“: fiil yok ama ekipte herkes neyin konuşulduğunu biliyor.",
      },
      {
        text: "Was fehlt am Morgen noch am Stand?",
        options: [
          "Der Strom",
          "Die Preisliste",
          "Der Bildschirm",
        ],
        answer: 0,
        explain: "„Stand steht, Strom fehlt noch.“",
      },
      {
        kind: "short_answer",
        text: "Wie viele Prospekte wurden zuerst geliefert?",
        options: [],
        answer: 0,
        accept: ["200", "zweihundert", "200 statt 500"],
        explain: "„Lieferung Prospekte: 200 statt 500.“",
      },
      {
        text: "Die Kaffeemaschine funktioniert am Vormittag.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Kaffeemaschine leider nicht.“",
      },
    ],
  },
  {
    id: "c1-u17-l1",
    level: "C1",
    skill: "listening",
    unit: 17,
    title: "Das kann man so sehen",
    genre: "dialogue",
    intro: "Kasıtlı çift anlam: söylemeden söylemek.",
    gloss: [
      { de: "die Zweideutigkeit", tr: "çift anlamlılık", en: "ambiguity" },
      { de: "auslegen", tr: "yorumlamak", en: "to interpret" },
      { de: "offenlassen", tr: "açık bırakmak", en: "to leave open" },
      { de: "beabsichtigt", tr: "kasıtlı", en: "intended" },
      { de: "die Anspielung", tr: "ima", en: "allusion" },
      { de: "subtil", tr: "ince", en: "subtle" },
      { de: "verschleiern", tr: "gizlemek", en: "to obscure" },
      { de: "positiv", tr: "olumlu", en: "positive" },
      { de: "also", tr: "yani", en: "so" },
      { de: "offen", tr: "açık", en: "open" },
      { de: "umgehen", tr: "başa çıkmak", en: "to handle" },
      { de: "besonders", tr: "özellikle", en: "especially" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Wilma", text: "Der Chef hat gesagt, meine Präsentation sei „bemerkenswert“. Ist das gut?" },
      { speaker: "Jonas", text: "Kommt darauf an, wie er es gesagt hat." },
      { speaker: "Wilma", text: "Warum sagt er dann nicht einfach, was er meint?" },
      { speaker: "Jonas", text: "Weil er sich nicht festlegen will. „Bemerkenswert“ lässt sich in beide Richtungen auslegen — er kann später sagen, er habe es positiv gemeint." },
      { speaker: "Wilma", text: "Also verschleiert er einfach seine Meinung." },
      { speaker: "Jonas", text: "Manchmal. Manchmal lässt er sie bewusst offen, weil er sie selbst noch prüft." },
      { speaker: "Wilma", text: "Also Feigheit." },
      { speaker: "Jonas", text: "Manchmal. Manchmal Rücksicht. Wenn zwanzig Leute im Raum sitzen, ist offene Kritik etwas anderes als unter vier Augen." },
      { speaker: "Wilma", text: "Und wie soll ich damit umgehen?" },
      { speaker: "Jonas", text: "Frag nach. Nicht vorwurfsvoll — einfach: „Woran haben Sie da besonders gedacht?“ Damit machst du die Zweideutigkeit sichtbar, ohne sie ihm vorzuwerfen." },
      { speaker: "Wilma", text: "Und wenn er ausweicht?" },
      { speaker: "Jonas", text: "Dann war es beabsichtigt, und du hast deine Antwort." },
      { speaker: "Wilma", text: "Ich hätte gedacht, so etwas gibt es nur bei uns zu Hause." },
      { speaker: "Jonas", text: "Das gibt es überall. Nur die Mittel sind andere. Hier läuft vieles über Untertreibung — je harmloser das Wort, desto schärfer manchmal die Anspielung." },
      { speaker: "Wilma", text: "Und woran merke ich, ob es subtil gemeint war oder ich zu viel hineinlese?" },
      { speaker: "Jonas", text: "Nie ganz sicher. Deshalb fragt man." },
      { speaker: "Wilma", text: "Das ist anstrengend." },
      { speaker: "Jonas", text: "Ist es. Aber es ist keine Geheimsprache. Wer nachfragt, kommt fast immer durch." },
    ],
    questions: [
      {
        text: "Warum sagt der Chef laut Jonas nicht direkt, was er meint?",
        options: [
          "Er weiß es selbst nicht",
          "Er will sich nicht festlegen",
          "Er hat die Präsentation nicht gesehen",
        ],
        answer: 1,
        explain: "„er kann später sagen, er habe es positiv gemeint“.",
      },
      {
        kind: "gapfill",
        text: "„Bemerkenswert“ lässt sich in beide Richtungen ___.",
        options: [],
        answer: 0,
        accept: ["auslegen"],
        explain: "auslegen: yorumlamak — çift anlamın tam fiili.",
      },
      {
        text: "Was rät Jonas?",
        options: [
          "Es ignorieren",
          "Nachfragen, ohne Vorwurf",
          "Selbst zweideutig antworten",
        ],
        answer: 1,
        explain: "„Woran haben Sie da besonders gedacht?“ — çift anlam görünür oluyor, suçlama olmadan.",
      },
      {
        kind: "dictation",
        text: "Jonas'ın Almancadaki ima mekanizmasını özetlediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Hier läuft vieles über Untertreibung — je harmloser das Wort, desto schärfer manchmal die Anspielung.",
          "je harmloser das Wort, desto schärfer manchmal die Anspielung",
        ],
        explain: "Sözcük ne kadar zararsızsa ima o kadar keskin olabiliyor.",
      },
    ],
  },
  {
    id: "c1-u17-l2",
    level: "C1",
    skill: "listening",
    unit: 17,
    title: "Stadtführung an der Nikolaikirche",
    genre: "dialogue",
    intro: "Leipzig'de bir şehir turu. 1989 sonbaharında Nikolaikirche'nin çevresinde ne oldu?",
    gloss: [
      { de: "aufschlussreich", tr: "aydınlatıcı", en: "revealing" },
      { de: "die friedliche Revolution", tr: "barışçıl devrim", en: "peaceful revolution" },
      { de: "das Friedensgebet", tr: "barış duası", en: "prayer for peace" },
      { de: "der Pfarrer", tr: "papaz", en: "pastor" },
      { de: "unauffällig", tr: "göze batmayan", en: "unassuming" },
      { de: "gläubig", tr: "inançlı", en: "religious" },
      { de: "bewaffnet", tr: "silahlı", en: "armed" },
      { de: "das Blutbad", tr: "kan gölü", en: "bloodbath" },
      { de: "die Gewalt", tr: "şiddet", en: "violence" },
      { de: "der Chefdirigent", tr: "baş şef", en: "principal conductor" },
      { de: "der Aufruf", tr: "çağrı", en: "appeal" },
      { de: "das Café", tr: "kafe", en: "café" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "vorbeikommen", tr: "uğramak", en: "to drop by" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Winkler", text: "Wir stehen hier vor der Nikolaikirche, dem wichtigsten Ort der friedlichen Revolution von 1989." },
      { speaker: "Teilnehmer", text: "Hier fanden die Friedensgebete statt, oder?" },
      { speaker: "Frau Winkler", text: "Genau. Jeden Montag, seit 1982, trafen sich hier Menschen zum Gebet. Pfarrer Christian Führer, ein ruhiger, unauffälliger Mann, öffnete die Kirche für alle." },
      { speaker: "Teilnehmerin", text: "Auch für Leute, die gar nicht gläubig waren?" },
      { speaker: "Frau Winkler", text: "Gerade für die. Am 9. Oktober 1989, einem Montag, kamen siebzigtausend Menschen auf den Ring, die große Straße um die Innenstadt." },
      { speaker: "Teilnehmer", text: "Siebzigtausend? Und die Polizei?" },
      { speaker: "Frau Winkler", text: "Die stand bereit, bewaffnet. Viele hatten Angst vor einem Blutbad. Aber niemand schoss. Die Demonstranten riefen immer wieder: „Keine Gewalt!“" },
      { speaker: "Teilnehmerin", text: "Warum hat die Polizei nichts getan?" },
      { speaker: "Frau Winkler", text: "Das ist bis heute nicht ganz geklärt. Kurt Masur, der Chefdirigent des Gewandhausorchesters, hat am Nachmittag im Radio zur Ruhe aufgerufen. Das hat sicher geholfen." },
      { speaker: "Teilnehmer", text: "Das Gewandhaus, das Konzerthaus am Augustusplatz?" },
      { speaker: "Frau Winkler", text: "Richtig, dorthin gehen wir als Nächstes. Einen Monat später, am 9. November, fiel dann die Mauer." },
      { speaker: "Teilnehmerin", text: "Und die Kirche? Wird sie heute noch so genutzt?" },
      { speaker: "Frau Winkler", text: "Die Friedensgebete gibt es immer noch, jeden Montag um fünf. Kommen Sie gern vorbei, der Eintritt ist frei." },
      { speaker: "Teilnehmer", text: "Das ist ja aufschlussreich. Wie lange dauert so ein Gebet?" },
      { speaker: "Frau Winkler", text: "Etwa eine halbe Stunde. Danach lohnt sich ein Kaffee im Café gegenüber, einem der gemütlichsten der Stadt." },
    ],
    questions: [
      {
        text: "Was geschah am 9. Oktober 1989?",
        options: [
          "Die Mauer fiel",
          "Siebzigtausend Menschen demonstrierten auf dem Ring",
          "Die Kirche wurde geschlossen",
        ],
        answer: 1,
        explain: "„Am 9. Oktober 1989, einem Montag, kamen siebzigtausend Menschen auf den Ring, die große Straße um die Innenstadt.“",
      },
      {
        kind: "gapfill",
        text: "Pfarrer Christian Führer, ein ruhiger, unauffälliger ___, öffnete die Kirche für alle.",
        options: [],
        answer: 0,
        accept: ["Mann"],
        explain: "Virgüller arasındaki ek bilgi papazı tanıtıyor; çıkarılsa da cümle eksiksiz kalır.",
      },
      {
        text: "Was tat Kurt Masur am Nachmittag?",
        options: [
          "Er rief im Radio zur Ruhe auf",
          "Er gab ein Konzert in der Kirche",
          "Er verhandelte mit der Polizei",
        ],
        answer: 0,
        explain: "„Kurt Masur, der Chefdirigent des Gewandhausorchesters, hat am Nachmittag im Radio zur Ruhe aufgerufen.“",
      },
      {
        kind: "short_answer",
        text: "Wann finden die Friedensgebete heute statt?",
        options: [],
        answer: 0,
        accept: [
          "montags um fünf",
          "jeden Montag um fünf",
          "montags um 17 Uhr",
          "jeden Montag",
        ],
        explain: "„Die Friedensgebete gibt es immer noch, jeden Montag um fünf.“",
      },
    ],
  },
  {
    id: "c1-u17-w1",
    level: "C1",
    skill: "writing",
    unit: 17,
    title: "Zwei Angebote im Vergleich",
    genre: "grammar",
    intro: "Gönderme sözcükleri, ara açıklama ve eksilti.",
    gloss: [
      { de: "Letzteres", tr: "ikincisi", en: "the latter" },
      { de: "diesbezüglich", tr: "bu konuda", en: "in this regard" },
      { de: "der Einschub", tr: "ara ekleme", en: "insertion" },
      { de: "einschieben", tr: "araya sıkıştırmak", en: "to insert" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "İkincisi bize daha uygun görünüyor.",
        answer: "Letzteres erscheint uns günstiger",
        hint: "Letzteres iki seçenekten sonuncusunu alır; büyük harfle yazılır.",
      },
      {
        kind: "build",
        tr: "Buna daha sonra döneceğim.",
        answer: "Darauf komme ich später zurück",
        hint: "da(r)- + edat bütün bir olguyu tek sözcükte taşır.",
      },
      {
        kind: "build",
        tr: "Almanya'nın başkenti Berlin büyümeye devam ediyor.",
        answer: "Berlin, die Hauptstadt Deutschlands, wächst weiter",
        hint: "Ara açıklama iki virgül arasında durur — biri değil, ikisi.",
      },
      {
        kind: "rewrite",
        prompt: "Metni düzelt: aynı öbek gereksiz tekrarlanıyor.",
        source: "Wir haben zwei Angebote geprüft. Das zweite Angebot erscheint uns günstiger, deshalb möchten wir das zweite Angebot annehmen.",
        answer: "Wir haben zwei Angebote geprüft. Letzteres erscheint uns günstiger; wir möchten es annehmen.",
        alternatives: [
          "Wir haben zwei Angebote geprüft. Letzteres erscheint uns günstiger; wir möchten es annehmen",
          "Wir haben zwei Angebote geprüft. Letzteres erscheint uns günstiger, daher möchten wir es annehmen.",
        ],
        why: "Türkçe ismi rahatça tekrar eder, Almanca olgu metni (Sachtext) etmez: okurun öncekini hatırladığı varsayılır. Aynı öbeği üçüncü kez yazmak dilbilgisi hatası değil ama metni çeviri gibi gösterir.",
      },
    ],
  },
  {
    id: "c1-u17-w2",
    level: "C1",
    skill: "writing",
    unit: 17,
    title: "Zu kurz war zu teuer",
    genre: "formal",
    intro: "Telgraf üslubuyla yazılmış bir ret mektubunu yeniden yaz.",
    gloss: [
      { de: "die Ellipse", tr: "eksilti", en: "ellipsis" },
      { de: "der Telegrammstil", tr: "telgraf üslubu", en: "telegraphic style" },
      { de: "preisgeben", tr: "açık etmek", en: "to reveal" },
      { de: "kurzsichtig", tr: "kısa görüşlü", en: "short-sighted" },
      { de: "die Sichtweise", tr: "bakış açısı", en: "viewpoint" },
      { de: "beruhen", tr: "dayanmak", en: "to be based on" },
      { de: "ausschlaggebend", tr: "belirleyici", en: "decisive" },
      { de: "mehrere", tr: "birden fazla", en: "several" },
      { de: "zuweisen", tr: "tahsis etmek", en: "to allocate" },
      { de: "investieren", tr: "yatırım yapmak", en: "to invest" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki ret mektubu dört satırda yazılmış ve alıcıda karşılık bulmamış. Aynı kararı veren ama okuyanı harcamayan bir metin yaz. Kararı yumuşatma — reddediyorsun; değiştirilecek olan bilgi değil, kayıt. En az bir gönderme sözcüğü (diesbezüglich / Letzteres / darauf) ve bir ara açıklama kullan.",
        stimulus:
          "GÖNDERİLEN METİN\n\n" +
          "Betreff: Ihre Bewerbung\n\n" +
          "Absage. Andere Kandidaten passten besser. Unterlagen vernichtet.\n\n" +
          "MfG\nK. Bauer\n\n" +
          "GELEN CEVAP\n\n" +
          "„Vielen Dank für die drei Sätze. Ich hatte zwei Tage in die Aufgabe investiert.“\n\n" +
          "DURUMUN: İki finalistten biri seçildi. Diğerinin teknik çözümü iyiydi, ekip liderliği deneyimi yetersiz kaldı. Altı ay içinde ikinci bir pozisyon açılacak ve bu kişiyi tekrar davet etmek istiyorsun.",
        checklist: [
          "Ret açık mı, yumuşatılıp belirsizleştirilmemiş mi?",
          "Gerekçe somut mu (teknik çözüm iyi, ekip liderliği deneyimi eksik)?",
          "Altı ay sonraki pozisyon gerçekçi bir dille mi anıldı?",
          "En az bir gönderme sözcüğü ve bir ara açıklama var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Wir haben uns für eine andere Bewerberin entschieden.", tr: "başka bir aday lehine karar verdik", en: "we have decided in favor of another candidate" },
          { de: "Diesbezüglich möchte ich offen sein:", tr: "bu konuda açık olmak isterim", en: "I want to be open about this" },
          { de: "Ihre Lösung, gerade im technischen Teil, hat uns überzeugt.", tr: "çözümünüz, özellikle teknik bölümde, bizi ikna etti", en: "your solution, particularly in the technical part, convinced us" },
        ],
        sample:
          "Betreff: Ihre Bewerbung als Teamleitung — Rückmeldung\n\n" +
          "Sehr geehrte Frau Graf,\n\n" +
          "wir haben uns nach der zweiten Runde für eine andere Bewerberin entschieden. Das Ergebnis tut mir leid, und ich möchte Ihnen sagen, worauf es beruht.\n\n" +
          "Ihre Lösung, gerade im technischen Teil, hat uns überzeugt; sie war die durchdachteste der Runde. Ausschlaggebend war ein anderer Punkt: Die Stelle führt vom ersten Tag an ein Team von neun Personen, und diesbezüglich hatte die andere Kandidatin mehrere Jahre Erfahrung vorzuweisen.\n\n" +
          "Ihre Unterlagen löschen wir, wie vorgeschrieben, nach Abschluss des Verfahrens — es sei denn, Sie stimmen einer Speicherung zu. Letzteres würde ich mir wünschen: Im Frühjahr besetzen wir eine zweite Stelle im selben Bereich, und ich würde Sie gern erneut einladen.\n\n" +
          "Vielen Dank für die Zeit, die Sie in die Aufgabe investiert haben.\n\n" +
          "Mit freundlichen Grüßen\nK. Bauer",
      },
    ],
  },
];
