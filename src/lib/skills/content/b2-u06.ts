import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 6 — "Edilgenin dört yüzü".
 *
 * Dört ders: Es ist erledigt worden · Das muss geprüft werden ·
 * Die Tür ist geöffnet · Das lässt sich machen. Seviyenin en teknik ünitesi:
 * dört ders de aynı yapının dört farklı biçimini öğretiyor.
 *
 *   Ünite 6: bearbeiten, die Erledigung, der Arbeitsgang, die Abnahme,
 *            die Zertifizierung, der Ausfall, ausliefern, zügig · bedenken,
 *            die Sicherheitsvorschrift, die Betriebsanleitung, vorschreiben,
 *            vorlegen, absegnen, fachgerecht, unverzüglich · der Vorgang,
 *            betriebsbereit, bezugsfertig, einwandfrei, barrierefrei,
 *            die Absperrung, stilllegen, beseitigen · nachweisen, bewältigen,
 *            überschaubar, wiederverwendbar, belastbar, akzeptabel,
 *            justieren, nachrüsten
 *   Kalıplar: … ist … worden · muss/kann/soll … werden · wird geöffnet /
 *            ist geöffnet · Das lässt sich … · Das ist zu …
 *
 * Ölçtüğü ayrım tek bir soru etrafında dönüyor: cümle bir SÜRECİ mi yoksa bir
 * DURUMU mu bildiriyor? Türkçe konuşan için asıl tuzak burada, çünkü Türkçe
 * ikisini de aynı ekle ("-ildi", "-ik") karşılayabiliyor.
 */
export const b2U06: SkillExercise[] = [
  {
    id: "b2-u06-r1",
    level: "B2",
    skill: "reading",
    unit: 6,
    title: "Der Bericht aus der Fertigung",
    genre: "Haftalık durum raporu",
    intro: "Bir üretim biriminin haftalık raporu. Neyin yapıldığı, neyin yapılması gerektiği ayrı ayrı yazılmış.",
    gloss: [
      { de: "bearbeiten", tr: "işleme almak", en: "to process" },
      { de: "die Erledigung", tr: "yapılacak iş", en: "task" },
      { de: "der Arbeitsgang", tr: "iş adımı", en: "operation" },
      { de: "die Abnahme", tr: "kabul", en: "acceptance" },
      { de: "die Zertifizierung", tr: "sertifikasyon", en: "certification" },
      { de: "der Ausfall", tr: "kesinti", en: "outage" },
      { de: "ausliefern", tr: "sevk etmek", en: "to deliver" },
      { de: "zügig", tr: "hızlıca", en: "swiftly" },
    ],
    minutes: 6,
    text:
      "WOCHENBERICHT KW 14 — FERTIGUNG\n\n" +
      "Erledigt. Von den achtzehn offenen Aufträgen sind zwölf bearbeitet worden. Die restlichen sechs hängen an einem einzigen Arbeitsgang, für den die Maschine seit Dienstag stillsteht. Der Ausfall ist gemeldet worden; ein Techniker war am Mittwoch da, konnte aber ohne Ersatzteil nichts machen.\n\n" +
      "Ausgeliefert. Vier Sendungen sind zügig ausgeliefert worden, drei davon einen Tag früher als zugesagt. Eine fünfte wartet noch auf die Abnahme durch den Kunden.\n\n" +
      "Offen. Die Zertifizierung der neuen Linie ist beantragt, aber noch nicht erteilt worden. Der Prüfer kommt in KW 16. Bis dahin darf auf der Linie nur intern produziert werden.\n\n" +
      "Auffällig. Bei drei Aufträgen ist dieselbe Erledigung zweimal eingetragen worden, einmal von der Frühschicht und einmal von der Spätschicht. Das kostet keine Zeit, verfälscht aber die Zahlen. Wir stellen die Eingabe kommende Woche um.\n\n" +
      "Nächste Woche. Das Ersatzteil ist bestellt und soll am Montag eintreffen. Sobald es da ist, wird der Arbeitsgang wieder aufgenommen und die sechs Aufträge werden bis Mittwoch bearbeitet. Sollte die Lieferung sich verzögern, melden wir das sofort und nicht erst im nächsten Bericht.",
    questions: [
      {
        kind: "gapfill",
        text: "Von den achtzehn offenen Aufträgen sind zwölf bearbeitet ___.",
        options: [],
        answer: 0,
        accept: ["worden"],
        explain: "Edilgen Perfekt'te yardımcı fiil kısalır: geworden değil worden.",
      },
      {
        text: "Warum stehen sechs Aufträge still?",
        options: [
          "weil ein Arbeitsgang durch einen Maschinenausfall blockiert ist",
          "weil die Zertifizierung fehlt",
          "weil die Kunden nicht abgenommen haben",
        ],
        answer: 0,
        explain: "„Die restlichen sechs hängen an einem einzigen Arbeitsgang, für den die Maschine seit Dienstag stillsteht.“",
      },
      {
        kind: "short_answer",
        text: "Wann kommt der Prüfer für die Zertifizierung?",
        options: [],
        answer: 0,
        accept: ["in KW 16", "KW 16", "in Kalenderwoche 16"],
        explain: "„Der Prüfer kommt in KW 16.“ O zamana kadar hatta yalnız iç üretim yapılabiliyor.",
      },
      {
        text: "Was ist bei drei Aufträgen passiert?",
        options: [
          "Sie wurden zu spät ausgeliefert.",
          "Dieselbe Erledigung wurde zweimal eingetragen.",
          "Sie wurden nicht abgenommen.",
        ],
        answer: 1,
        explain: "„…ist dieselbe Erledigung zweimal eingetragen worden, einmal von der Frühschicht und einmal von der Spätschicht.“",
      },
      {
        text: "Die doppelte Eingabe kostet Zeit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das kostet keine Zeit, verfälscht aber die Zahlen.“",
      },
    ],
  },

  {
    id: "b2-u06-r2",
    level: "B2",
    skill: "reading",
    unit: 6,
    title: "Geöffnet oder wird geöffnet?",
    genre: "Dil köşesi",
    intro: "Bir dil köşesi yazısı: Almancada süreç ile durum neden ayrı yazılır?",
    gloss: [
      { de: "der Vorgang", tr: "işlem", en: "process" },
      { de: "betriebsbereit", tr: "çalışmaya hazır", en: "operational" },
      { de: "bezugsfertig", tr: "oturmaya hazır", en: "ready for occupancy" },
      { de: "einwandfrei", tr: "kusursuz", en: "flawless" },
      { de: "barrierefrei", tr: "engelsiz", en: "barrier-free" },
      { de: "die Absperrung", tr: "bariyer", en: "barrier" },
      { de: "stilllegen", tr: "tesisi kapatmak", en: "to shut down" },
      { de: "beseitigen", tr: "gidermek", en: "to remove" },
    ],
    minutes: 6,
    text:
      "GEÖFFNET ODER WIRD GEÖFFNET?\n\n" +
      "Zwei Sätze, ein Buchstabe Unterschied, zwei völlig verschiedene Aussagen. „Die Tür wird geöffnet“ beschreibt einen Vorgang: gerade passiert etwas. „Die Tür ist geöffnet“ beschreibt einen Zustand: irgendwann hat jemand geöffnet, und jetzt ist sie offen.\n\n" +
      "Im Deutschen sind das zwei verschiedene Formen, im Türkischen oft dieselbe. Wer aus dem Türkischen kommt, hört den Unterschied deshalb nicht sofort — er muss ihn lernen wie eine Vokabel.\n\n" +
      "Warum lohnt sich das? Weil in Verträgen, Berichten und Bauplänen genau dieser Unterschied entscheidet. „Die Wohnung wird bezugsfertig gemacht“ heißt: Es wird noch gearbeitet. „Die Wohnung ist bezugsfertig“ heißt: Sie können einziehen. Der Bauleiter, der das erste sagt, und der Mieter, der das zweite hört, streiten drei Wochen später.\n\n" +
      "Dasselbe gilt für Anlagen. „Die Anlage wird stillgelegt“ ist eine Ankündigung. „Die Anlage ist stillgelegt“ ist ein Befund. Und „die Anlage ist betriebsbereit“ sagt nicht, dass sie läuft — nur, dass sie laufen könnte.\n\n" +
      "Eine kleine Faustregel hilft weiter: Wenn man „gerade jetzt“ einsetzen kann, ist es ein Vorgang und braucht werden. Wenn man „seit gestern“ einsetzen kann, ist es ein Zustand und braucht sein.\n\n" +
      "Und wo steht der Unterschied besonders oft? In Sicherheitstexten. „Die Absperrung wird beseitigt“ heißt, es ist noch gefährlich. „Der Zugang ist barrierefrei“ und „die Prüfung ist einwandfrei verlaufen“ dagegen sind fertige Zustände — genau das, was man lesen will.",
    questions: [
      {
        text: "Was beschreibt „Die Tür wird geöffnet“?",
        options: ["einen Zustand", "einen Vorgang", "eine Absicht"],
        answer: 1,
        explain: "„…beschreibt einen Vorgang: gerade passiert etwas.“",
      },
      {
        kind: "short_answer",
        text: "Welches Wort passt zum Zustand: „gerade jetzt“ oder „seit gestern“?",
        options: [],
        answer: 0,
        accept: ["seit gestern", "seit gestern passt", "seit"],
        explain: "„Wenn man 'seit gestern' einsetzen kann, ist es ein Zustand und braucht sein.“",
      },
      {
        kind: "gapfill",
        text: "Die Wohnung ___ bezugsfertig — Sie können einziehen.",
        options: [],
        answer: 0,
        accept: ["ist"],
        explain: "Durum edilgeni sein ile kurulur. wird olsaydı işin sürdüğü anlaşılırdı.",
      },
      {
        text: "Was sagt „die Anlage ist betriebsbereit“?",
        options: [
          "Sie läuft gerade.",
          "Sie könnte laufen.",
          "Sie wird abgeschaltet.",
        ],
        answer: 1,
        explain: "„…sagt nicht, dass sie läuft — nur, dass sie laufen könnte.“",
      },
      {
        text: "Im Türkischen gibt es für beide Bedeutungen immer zwei getrennte Formen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Im Deutschen sind das zwei verschiedene Formen, im Türkischen oft dieselbe.“",
      },
    ],
  },

  {
    id: "b2-u06-l1",
    level: "B2",
    skill: "listening",
    unit: 6,
    title: "Das muss noch abgesegnet werden",
    genre: "Diyalog",
    intro: "İki mühendis bir onay sürecini konuşuyor. Kipli edilgene dikkat et.",
    gloss: [
      { de: "bedenken", tr: "göz önünde bulundurmak", en: "to consider" },
      { de: "die Sicherheitsvorschrift", tr: "güvenlik kuralı", en: "safety regulation" },
      { de: "die Betriebsanleitung", tr: "işletme kılavuzu", en: "operating manual" },
      { de: "vorschreiben", tr: "zorunlu kılmak", en: "to prescribe" },
      { de: "vorlegen", tr: "ibraz etmek", en: "to submit" },
      { de: "absegnen", tr: "onaydan geçirmek", en: "to sign off" },
      { de: "fachgerecht", tr: "tekniğine uygun", en: "properly" },
      { de: "unverzüglich", tr: "derhâl", en: "without delay" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Rita", text: "Kann die Linie am Montag starten? Der Kunde fragt seit Freitag." },
      { speaker: "Ömer", text: "Technisch ja. Aber das muss vorher noch abgesegnet werden, und das dauert." },
      { speaker: "Rita", text: "Von wem? Reicht deine Unterschrift nicht?" },
      { speaker: "Ömer", text: "Nein. Die Sicherheitsvorschrift schreibt eine zweite Person vor, mindestens Abteilungsleitung." },
      { speaker: "Rita", text: "Dann legen wir das heute vor. Was muss dabei sein?" },
      { speaker: "Ömer", text: "Die Betriebsanleitung in der aktuellen Fassung und der Nachweis, dass fachgerecht montiert wurde." },
      { speaker: "Rita", text: "Der Nachweis liegt bei mir. Die Anleitung ist noch die alte." },
      { speaker: "Ömer", text: "Das sollte bedacht werden, bevor wir einreichen. Mit alter Fassung kommt alles zurück." },
      { speaker: "Rita", text: "Gut, ich aktualisiere sie heute Nachmittag. Und dann?" },
      { speaker: "Ömer", text: "Dann muss es unverzüglich weitergeleitet werden. Wer freitags einreicht, wartet bis Dienstag." },
      { speaker: "Rita", text: "Verstanden. Heute raus, damit Montag realistisch bleibt." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ömer'in ikinci imzayı hangi kuralın zorunlu kıldığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Die Sicherheitsvorschrift schreibt eine zweite Person vor, mindestens Abteilungsleitung."],
        explain: "Ayrılabilen fiil vorschreiben: önek cümlenin sonunda.",
      },
      {
        text: "Was fehlt noch für die Einreichung?",
        options: [
          "der Nachweis der Montage",
          "die aktuelle Betriebsanleitung",
          "die Unterschrift von Ömer",
        ],
        answer: 1,
        explain: "„Der Nachweis liegt bei mir. Die Anleitung ist noch die alte.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange wartet, wer freitags einreicht?",
        options: [],
        answer: 0,
        accept: ["bis Dienstag", "Dienstag", "bis zum Dienstag"],
        explain: "„Wer freitags einreicht, wartet bis Dienstag.“ Bu yüzden bugün göndermek gerekiyor.",
      },
      {
        text: "Wer muss laut Sicherheitsvorschrift mit unterschreiben?",
        options: ["der Kunde", "mindestens die Abteilungsleitung", "ein externer Prüfer"],
        answer: 1,
        explain: "„…eine zweite Person vor, mindestens Abteilungsleitung.“",
      },
      {
        text: "Technisch könnte die Linie am Montag starten.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Technisch ja. Aber das muss vorher noch abgesegnet werden.“",
      },
    ],
  },

  {
    id: "b2-u06-l2",
    level: "B2",
    skill: "listening",
    unit: 6,
    title: "Lässt sich das machen?",
    genre: "Diyalog",
    intro: "Bir öneri konuşuluyor: neyin mümkün, neyin zorunlu olduğunu ayır.",
    gloss: [
      { de: "nachweisen", tr: "kanıtlamak", en: "to prove" },
      { de: "bewältigen", tr: "üstesinden gelmek", en: "to manage" },
      { de: "überschaubar", tr: "idare edilebilir", en: "manageable" },
      { de: "wiederverwendbar", tr: "yeniden kullanılabilir", en: "reusable" },
      { de: "belastbar", tr: "dayanıklı", en: "resilient" },
      { de: "akzeptabel", tr: "kabul edilebilir", en: "acceptable" },
      { de: "justieren", tr: "ayarlamak", en: "to adjust" },
      { de: "nachrüsten", tr: "sonradan takmak", en: "to retrofit" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Lea", text: "Ich hätte da eine Idee: Wir bauen die Halterungen so, dass sie wiederverwendbar sind." },
      { speaker: "Tarik", text: "Lässt sich das machen? Der Aufwand klingt erstmal groß." },
      { speaker: "Lea", text: "Er ist überschaubar. Wir müssen nur zwei Maße justieren, sonst bleibt alles gleich." },
      { speaker: "Tarik", text: "Und die alten Halterungen? Die sind ja schon montiert." },
      { speaker: "Lea", text: "Die lassen sich nachrüsten. Das ist die eigentliche Arbeit, aber sie ist an einem Tag zu bewältigen." },
      { speaker: "Tarik", text: "Ist das Material dann noch belastbar genug? Das ist zu prüfen, bevor wir anfangen." },
      { speaker: "Lea", text: "Das habe ich schon nachgewiesen, mit den Zahlen vom letzten Test." },
      { speaker: "Tarik", text: "Dann klingt das akzeptabel. Was kostet es?" },
      { speaker: "Lea", text: "Einmalig achthundert Euro, danach sparen wir pro Auftrag sechzig." },
      { speaker: "Tarik", text: "Also nach vierzehn Aufträgen. Das ist rechnerisch einwandfrei." },
      { speaker: "Lea", text: "Genau. Ich lege dir morgen die Zahlen vor, dann entscheidest du." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Tarik'in yapılabilirliği sorduğu kısa soruyu yaz.",
        options: [],
        answer: 0,
        accept: ["Lässt sich das machen?"],
        explain: "lassen artı dönüşlü zamir edilgen yerine geçiyor ve 'yapılabilir mi' anlamını taşıyor.",
      },
      {
        text: "Wie groß ist der Aufwand laut Lea?",
        options: ["sehr groß", "überschaubar", "nicht zu bewältigen"],
        answer: 1,
        explain: "„Er ist überschaubar. Wir müssen nur zwei Maße justieren.“",
      },
      {
        kind: "short_answer",
        text: "Ab wie vielen Aufträgen rechnet sich die Änderung?",
        options: [],
        answer: 0,
        accept: ["nach vierzehn Aufträgen", "vierzehn", "nach 14 Aufträgen"],
        explain: "800 euro tek seferlik, sipariş başına 60 euro tasarruf: „Also nach vierzehn Aufträgen.“",
      },
      {
        text: "Was hat Lea bereits nachgewiesen?",
        options: [
          "dass das Material belastbar genug ist",
          "dass die Halterungen billiger sind",
          "dass die Montage einen Tag dauert",
        ],
        answer: 0,
        explain: "„Das habe ich schon nachgewiesen, mit den Zahlen vom letzten Test.“",
      },
      {
        text: "Die alten Halterungen müssen komplett ersetzt werden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die lassen sich nachrüsten.“",
      },
    ],
  },

  {
    id: "b2-u06-w1",
    level: "B2",
    skill: "writing",
    unit: 6,
    title: "Vorgang oder Zustand",
    genre: "Cümle kurma",
    intro: "Edilgenin dört biçimi: geçmiş, kipli, durum ve edilgen yerine geçenler.",
    gloss: [
      { de: "ausliefern", tr: "sevk etmek", en: "to deliver" },
      { de: "absegnen", tr: "onaydan geçirmek", en: "to sign off" },
      { de: "betriebsbereit", tr: "çalışmaya hazır", en: "operational" },
      { de: "bewältigen", tr: "üstesinden gelmek", en: "to manage" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Mal dün sevk edildi.",
        answer: "Die Ware ist gestern ausgeliefert worden",
        hint: "Edilgen Perfekt: sein, ortaç, sonda kısalmış biçim worden.",
      },
      {
        kind: "build",
        tr: "Bunun önce onaydan geçirilmesi gerekiyor.",
        answer: "Das muss vorher abgesegnet werden",
        hint: "Kipli edilgen: kip fiili ikinci sırada, sonda ortaç ve werden.",
      },
      {
        kind: "build",
        tr: "Tesis dünden beri çalışmaya hazır.",
        answer: "Die Anlage ist seit gestern betriebsbereit",
        hint: "'seit gestern' varsa bu bir durumdur; sein kullanılır, werden değil.",
      },
      {
        kind: "build",
        tr: "Bu bir günde halledilebilir.",
        answer: "Das lässt sich an einem Tag bewältigen",
        hint: "lassen artı dönüşlü zamir; mastar en sonda.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: süreç ile durum karışmış.",
        source: "Die Wohnung wird seit gestern bezugsfertig.",
        answer: "Die Wohnung ist seit gestern bezugsfertig.",
        alternatives: ["Die Wohnung ist seit gestern bezugsfertig"],
        why: "'seit gestern' süren bir durumu gösterir, o yüzden sein gerekir. werden ile kurulunca cümle 'daire dünden beri hazır hâle getiriliyor' anlamına kayar. Türkçede ikisi de aynı ekle söylendiği için bu ayrım kolayca gözden kaçar.",
      },
    ],
  },

  {
    id: "b2-u06-w2",
    level: "B2",
    skill: "writing",
    unit: 6,
    title: "Der Wochenbericht",
    genre: "Durum raporu",
    intro: "Kısa bir haftalık durum raporu yaz: ne yapıldı, ne yapılmalı, ne şu an hangi durumda?",
    gloss: [
      { de: "der Arbeitsgang", tr: "iş adımı", en: "operation" },
      { de: "die Abnahme", tr: "kabul", en: "acceptance" },
      { de: "unverzüglich", tr: "derhâl", en: "without delay" },
      { de: "einwandfrei", tr: "kusursuz", en: "flawless" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir haftanın durum raporunu yaz (kendi işin, bir proje ya da hayalî bir üretim birimi — sen seç). Üç bölüm olsun: yapılanlar, yapılması gerekenler ve şu anki durum. Yapılanlarda edilgen geçmiş (ist … worden), yapılması gerekenlerde kipli edilgen (muss … werden), durumda ise sein ile kurulan durum edilgeni kullan. Birinci tekil şahıs yerine olguyu öne al.",
        checklist: [
          "Üç bölüm ayrı ayrı yazıldı mı?",
          "En az bir edilgen geçmiş (ist … worden) var mı?",
          "En az bir kipli edilgen (muss/soll … werden) var mı?",
          "En az bir durum edilgeni (ist + ortaç) var mı?",
        ],
        minWords: 70,
        phrases: [
          { de: "… ist bearbeitet worden", tr: "… işleme alındı", en: "… has been processed" },
          { de: "Das muss noch abgesegnet werden.", tr: "bunun hâlâ onaydan geçmesi gerekiyor", en: "that still has to be signed off" },
          { de: "Die Anlage ist betriebsbereit.", tr: "tesis çalışmaya hazır", en: "the plant is operational" },
        ],
        sample:
          "WOCHENBERICHT KW 15\n\n" +
          "Erledigt. Von den sechs offenen Aufträgen sind fünf bearbeitet worden. Zwei Sendungen sind am Dienstag ausgeliefert worden, eine davon einen Tag früher als zugesagt. Der Ausfall aus der Vorwoche ist behoben worden.\n\n" +
          "Offen. Der letzte Auftrag muss noch abgesegnet werden; dafür ist die aktualisierte Betriebsanleitung vorzulegen. Sie soll morgen fertig sein und wird dann unverzüglich weitergeleitet. Außerdem ist zu klären, wer die Abnahme beim Kunden übernimmt.\n\n" +
          "Zustand. Die Linie ist betriebsbereit, läuft aber noch nicht. Die neue Halterung ist montiert und die Prüfung ist einwandfrei verlaufen. Der Zugang zur Halle ist seit Mittwoch wieder frei; die Absperrung ist beseitigt.\n\n" +
          "Nächste Woche wird der zweite Arbeitsgang wieder aufgenommen.",
      },
    ],
  },
];
