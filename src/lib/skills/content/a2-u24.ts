import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 24 — "Kuyruk, kütüphane, kurs kaydı, gelecek planları".
 *
 * Dört ders: Lange Warteschlange am Amt · In der Bibliothek · Ein Kurs an der
 * VHS · Meine Pläne. İçerik ünite 1-24'ün kelimeleriyle sınırlı.
 *
 *   Ünite 24: die Warteschlange, die Reihe, unpünktlich, zeitweise,
 *             das Erdgeschoss, das Obergeschoss, der Wegweiser, geehrte ·
 *             das E-Book, das Kochbuch, das Schulbuch, aufschlagen, sortieren,
 *             nachlesen, das Pfand, flüstern · teilnehmen, die Universität,
 *             die Fachhochschule, der Stundenplan, der Workshop, beibringen,
 *             das Klassenzimmer, das Instrument · das Ziel, wählen, vorwärts,
 *             jedenfalls, bauen, anstatt, beenden, das Ferienhaus
 *   Kalıplar: Ich habe zwei Stunden gewartet. · Sehr geehrte Frau Meyer, … ·
 *             Wie lange darf ich das behalten? · Hier darf man nur flüstern. ·
 *             Ich möchte am Kurs teilnehmen. · Der Kurs wird im Herbst
 *             beginnen. · Ich werde meine Ausbildung beenden. · Was ist dein
 *             Ziel?
 *
 * Ünitenin ölçtüğü şey gelecek zamanın iki yüzü: werden + mastar gerçek bir
 * gelecek kurar (Der Kurs wird im Herbst beginnen), ama Almanca günlük dilde
 * gelecek çoğu zaman şimdiki zamanla ve bir zaman zarfıyla söylenir (Nächste
 * Woche fange ich an). Öğrenci her gelecek cümlesine werden koyuyor ve dil
 * ağırlaşıyor. Kurs kaydı ile plan konuşması bu iki biçimin yan yana durduğu
 * doğal bağlam.
 */
export const a2U24: SkillExercise[] = [
  {
    id: "a2-u24-r1",
    level: "A2",
    skill: "reading",
    unit: 24,
    title: "Kurse im Herbst",
    genre: "Program broşürü",
    intro: "Halk eğitim programı. Hangi kurs ne zaman, kim katılabilir?",
    gloss: [
      { de: "der Stundenplan", tr: "ders programı", en: "timetable" },
      { de: "der Workshop", tr: "atölye", en: "workshop" },
      { de: "beibringen", tr: "öğretmek", en: "to teach" },
      { de: "das Klassenzimmer", tr: "sınıf", en: "classroom" },
      { de: "das Instrument", tr: "çalgı", en: "instrument" },
      { de: "die Fachhochschule", tr: "uygulamalı bilimler yüksekokulu", en: "university of applied sciences" },
      { de: "das Erdgeschoss", tr: "zemin kat", en: "ground floor" },
    ],
    minutes: 4,
    text:
      "VOLKSHOCHSCHULE — HERBSTPROGRAMM\n\n" +
      "DEUTSCH B1 (Kurs 204). Der Kurs wird im Herbst beginnen, am 6. Oktober, und läuft bis Februar. Montag und Mittwoch, 18–20 Uhr, Klassenzimmer 12 im Erdgeschoss. 180 Euro, für Arbeitslose 60.\n\n" +
      "GITARRE FÜR ANFÄNGER (Kurs 311). Zehn Abende. Ein Instrument bekommen Sie hier, Sie müssen also nichts kaufen. Unsere Kollegin bringt Ihnen die ersten Griffe bei; Noten lesen lernen Sie nicht.\n\n" +
      "WORKSHOP BEWERBUNG (Kurs 470). Ein Samstag, 9–16 Uhr. Wir schauen uns Ihre Unterlagen an und üben das Gespräch. Bringen Sie einen ausgedruckten Lebenslauf mit.\n\n" +
      "ANMELDUNG. Sie können sich online anmelden oder im Büro, Zimmer 3. Wer an der Universität oder der Fachhochschule studiert, zahlt bei allen Kursen die Hälfte — bringen Sie dafür Ihren Ausweis mit.\n\n" +
      "Den vollständigen Stundenplan finden Sie auf der letzten Seite.",
    questions: [
      {
        text: "Wann beginnt der Deutschkurs?",
        options: ["Am 6. Oktober", "Im Februar", "Am Samstag"],
        answer: 0,
        explain: "„Der Kurs wird im Herbst beginnen, am 6. Oktober, und läuft bis Februar.“",
      },
      {
        kind: "gapfill",
        text: "Der Kurs ___ im Herbst beginnen.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Gelecek zaman werden ile kurulur ve mastar cümlenin sonunda durur.",
      },
      {
        text: "Was gilt für den Gitarrenkurs?",
        options: [
          "Man muss ein Instrument kaufen.",
          "Man bekommt ein Instrument dort.",
          "Man muss Noten lesen können.",
        ],
        answer: 1,
        explain: "„Ein Instrument bekommen Sie hier, Sie müssen also nichts kaufen.“",
      },
      {
        kind: "short_answer",
        text: "Wer zahlt bei allen Kursen die Hälfte?",
        options: [],
        answer: 0,
        accept: [
          "wer an der Universität oder der Fachhochschule studiert",
          "Studenten",
          "Studierende",
        ],
        explain: "„Wer an der Universität oder der Fachhochschule studiert, zahlt … die Hälfte.“",
      },
      {
        text: "Im Gitarrenkurs lernt man Noten lesen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Noten lesen lernen Sie nicht.“",
      },
    ],
  },
  {
    id: "a2-u24-r2",
    level: "A2",
    skill: "reading",
    unit: 24,
    title: "Zwei Stunden am Amt",
    genre: "Şikâyet mektubu",
    intro: "Uzun kuyruk üstüne resmî bir şikâyet. Ne olmuş, ne isteniyor?",
    gloss: [
      { de: "die Warteschlange", tr: "kuyruk", en: "queue" },
      { de: "die Reihe", tr: "sıra", en: "row, turn" },
      { de: "unpünktlich", tr: "vaktinde olmayan", en: "unpunctual" },
      { de: "zeitweise", tr: "zaman zaman", en: "at times" },
      { de: "das Obergeschoss", tr: "üst kat", en: "upper floor" },
      { de: "der Wegweiser", tr: "yön levhası", en: "signpost" },
      { de: "geehrte", tr: "sayın", en: "esteemed" },
    ],
    minutes: 4,
    text:
      "Sehr geehrte Frau Meyer,\n\n" +
      "ich schreibe Ihnen wegen meines Termins am Dienstag, dem 14. Mai, um 9:30 Uhr.\n\n" +
      "Ich war pünktlich da. Trotzdem habe ich zwei Stunden gewartet. Die Warteschlange ging bis auf die Straße, und zeitweise wusste niemand, welche Reihe zu welchem Zimmer gehört.\n\n" +
      "Das eigentliche Problem war aber ein anderes: Es gibt keinen Wegweiser. Ich bin zuerst ins Obergeschoss gegangen, weil mir jemand das gesagt hat, und musste dann wieder hinunter ins Erdgeschoss. Eine ältere Dame vor mir hat das dreimal gemacht.\n\n" +
      "Ich bin nicht unzufrieden mit Ihren Mitarbeitern — die Kollegin am Schalter war freundlich und schnell. Unpünktlich war nicht sie, sondern das System.\n\n" +
      "Mein Vorschlag: ein Schild an der Tür, auf dem steht, welche Nummer in welches Stockwerk gehört. Das kostet fast nichts und spart jedem eine halbe Stunde.\n\n" +
      "Mit freundlichen Grüßen\nH. Kaya",
    questions: [
      {
        text: "Wie lange hat Herr Kaya gewartet?",
        options: ["Eine halbe Stunde", "Zwei Stunden", "Den ganzen Tag"],
        answer: 1,
        explain: "„Ich war pünktlich da. Trotzdem habe ich zwei Stunden gewartet.“",
      },
      {
        kind: "gapfill",
        text: "Sehr ___ Frau Meyer,",
        options: [],
        answer: 0,
        accept: ["geehrte"],
        explain: "Resmî mektubun standart hitabı; adı bilinen kadına „Sehr geehrte Frau …“.",
      },
      {
        text: "Was war laut Brief das eigentliche Problem?",
        options: [
          "Die Mitarbeiter waren unfreundlich.",
          "Es gibt keinen Wegweiser.",
          "Der Termin war zu früh.",
        ],
        answer: 1,
        explain: "„Das eigentliche Problem war aber ein anderes: Es gibt keinen Wegweiser.“",
      },
      {
        kind: "short_answer",
        text: "Was schlägt Herr Kaya vor?",
        options: [],
        answer: 0,
        accept: [
          "ein Schild an der Tür",
          "ein Schild mit den Nummern und Stockwerken",
          "ein Schild",
        ],
        explain: "„ein Schild an der Tür, auf dem steht, welche Nummer in welches Stockwerk gehört“.",
      },
      {
        text: "Herr Kaya beschwert sich über die Kollegin am Schalter.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „die Kollegin am Schalter war freundlich und schnell“.",
      },
    ],
  },
  {
    id: "a2-u24-l1",
    level: "A2",
    skill: "listening",
    unit: 24,
    title: "In der Bibliothek",
    genre: "Diyalog",
    intro: "Kütüphane üyeliği. Ne kadar süreyle, hangi kurallarla?",
    gloss: [
      { de: "das E-Book", tr: "e-kitap", en: "e-book" },
      { de: "das Kochbuch", tr: "yemek kitabı", en: "cookbook" },
      { de: "das Schulbuch", tr: "ders kitabı", en: "schoolbook" },
      { de: "sortieren", tr: "sıralamak", en: "to sort" },
      { de: "nachlesen", tr: "bakıp okumak", en: "to look up" },
      { de: "das Pfand", tr: "depozito", en: "deposit" },
      { de: "flüstern", tr: "fısıldamak", en: "to whisper" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Herr Gül", text: "Guten Tag, ich möchte einen Ausweis. Was kostet das?" },
      { speaker: "Bibliothekarin", text: "Für Erwachsene zwölf Euro im Jahr, dazu fünf Euro Pfand." },
      { speaker: "Herr Gül", text: "Und wie lange darf ich ein Buch behalten?" },
      { speaker: "Bibliothekarin", text: "Vier Wochen. Einmal verlängern geht online, dann acht." },
      { speaker: "Herr Gül", text: "Haben Sie auch E-Books?" },
      { speaker: "Bibliothekarin", text: "Ja, über unsere Website. Die laufen nach drei Wochen automatisch ab, da können Sie nichts vergessen." },
      { speaker: "Herr Gül", text: "Praktisch. Wo finde ich Kochbücher?" },
      { speaker: "Bibliothekarin", text: "Erstes Obergeschoss, hinten links. Sie sind nach Ländern sortiert, nicht nach Autoren." },
      { speaker: "Herr Gül", text: "Gut zu wissen. Und mein Sohn braucht ein Schulbuch zum Nachlesen." },
      { speaker: "Bibliothekarin", text: "Schulbücher sind im Erdgeschoss, die dürfen aber nicht mit nach Hause." },
      { speaker: "Herr Gül", text: "Also hier lesen. Darf er dabei sprechen?" },
      { speaker: "Bibliothekarin", text: "Hier darf man nur flüstern. Zum Reden gibt es den Gruppenraum." },
    ],
    questions: [
      {
        text: "Wie lange darf man ein Buch normal behalten?",
        options: ["Zwei Wochen", "Vier Wochen", "Acht Wochen"],
        answer: 1,
        explain: "„Vier Wochen. Einmal verlängern geht online, dann acht.“",
      },
      {
        kind: "gapfill",
        text: "Hier ___ man nur flüstern.",
        options: [],
        answer: 0,
        accept: ["darf"],
        explain: "İzin ve yasak dürfen ile söylenir; müsaade edilen tek şey fısıldamak.",
      },
      {
        text: "Was ist bei Schulbüchern anders?",
        options: [
          "Sie kosten extra.",
          "Sie dürfen nicht mit nach Hause.",
          "Es gibt sie nur als E-Book.",
        ],
        answer: 1,
        explain: "„Schulbücher sind im Erdgeschoss, die dürfen aber nicht mit nach Hause.“",
      },
      {
        kind: "dictation",
        text: "Herr Gül'ün kitabı ne kadar tutabileceğini sorduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Wie lange darf ich ein Buch behalten?", "Und wie lange darf ich ein Buch behalten?"],
        explain: "Süre sorusu + dürfen: kütüphanede en çok sorulan cümle.",
      },
    ],
  },
  {
    id: "a2-u24-l2",
    level: "A2",
    skill: "listening",
    unit: 24,
    title: "Was ist dein Ziel?",
    genre: "Diyalog",
    intro: "İki arkadaş geleceği konuşuyor. Planlar ne kadar somut?",
    gloss: [
      { de: "das Ziel", tr: "hedef", en: "goal" },
      { de: "wählen", tr: "seçmek", en: "to choose" },
      { de: "beenden", tr: "bitirmek", en: "to finish" },
      { de: "anstatt", tr: "yerine", en: "instead of" },
      { de: "jedenfalls", tr: "her hâlükârda", en: "in any case" },
      { de: "vorwärts", tr: "ileri", en: "forward" },
      { de: "das Ferienhaus", tr: "yazlık", en: "holiday home" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Yusuf", text: "Sag mal, was ist eigentlich dein Ziel? So in fünf Jahren." },
      { speaker: "Lea", text: "Konkret? Ich werde meine Ausbildung beenden, das ist im Juni." },
      { speaker: "Yusuf", text: "Und danach?" },
      { speaker: "Lea", text: "Danach fange ich in der Firma an, in der ich jetzt schon arbeite. Sie haben mir eine Stelle angeboten." },
      { speaker: "Yusuf", text: "Also nicht studieren?" },
      { speaker: "Lea", text: "Anstatt zu studieren, arbeite ich lieber erst ein paar Jahre. Studieren kann ich später immer noch." },
      { speaker: "Yusuf", text: "Mutig. Ich weiß immer noch nicht, was ich wählen soll." },
      { speaker: "Lea", text: "Du hast doch von einer Fachhochschule gesprochen." },
      { speaker: "Yusuf", text: "Ja, jedenfalls irgendetwas mit Technik. Mein Vater will, dass ich zu ihm in die Werkstatt komme." },
      { speaker: "Lea", text: "Und was willst du?" },
      { speaker: "Yusuf", text: "Ehrlich? Ich weiß es nicht. Aber ich will vorwärts, nicht dasselbe wie mit zwanzig." },
      { speaker: "Lea", text: "Das ist auch ein Ziel. Nicht jedes muss ein Ferienhaus am Meer sein." },
    ],
    questions: [
      {
        text: "Was macht Lea im Juni?",
        options: [
          "Sie fängt ein Studium an.",
          "Sie beendet ihre Ausbildung.",
          "Sie zieht um.",
        ],
        answer: 1,
        explain: "„Ich werde meine Ausbildung beenden, das ist im Juni.“",
      },
      {
        kind: "gapfill",
        text: "Ich ___ meine Ausbildung beenden.",
        options: [],
        answer: 0,
        accept: ["werde"],
        explain: "Uzak ve kesin bir plan werden ile kuruluyor; hemen ardından gelen cümlede ise şimdiki zaman yetiyor (danach fange ich an).",
      },
      {
        text: "Warum studiert Lea nicht sofort?",
        options: [
          "Sie hat keinen Platz bekommen.",
          "Sie will erst ein paar Jahre arbeiten.",
          "Es ist zu teuer.",
        ],
        answer: 1,
        explain: "„Anstatt zu studieren, arbeite ich lieber erst ein paar Jahre.“",
      },
      {
        kind: "short_answer",
        text: "Was will Yusufs Vater?",
        options: [],
        answer: 0,
        accept: [
          "dass Yusuf in die Werkstatt kommt",
          "dass er zu ihm in die Werkstatt kommt",
          "dass er in der Werkstatt arbeitet",
        ],
        explain: "„Mein Vater will, dass ich zu ihm in die Werkstatt komme.“",
      },
    ],
  },
  {
    id: "a2-u24-w1",
    level: "A2",
    skill: "writing",
    unit: 24,
    title: "Gelecek: werden mi, şimdiki zaman mı?",
    genre: "Dil bilgisi",
    intro: "Almanca gelecek çoğu zaman zaman zarfıyla söylenir; werden ağırlık taşır.",
    gloss: [
      { de: "beenden", tr: "bitirmek", en: "to finish" },
      { de: "teilnehmen", tr: "katılmak", en: "to take part" },
      { de: "das Ziel", tr: "hedef", en: "goal" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Eğitimimi bitireceğim.",
        answer: "Ich werde meine Ausbildung beenden",
        hint: "werden çekilir, mastar cümlenin en sonuna gider.",
      },
      {
        kind: "build",
        tr: "Kursa katılmak istiyorum.",
        answer: "Ich möchte am Kurs teilnehmen",
        hint: "teilnehmen an ister ve an + Dativ olur: am Kurs.",
      },
      {
        kind: "build",
        tr: "Kurs sonbaharda başlayacak.",
        answer: "Der Kurs wird im Herbst beginnen",
        hint: "Resmî duyuruda werden doğal durur — broşür dili budur.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi günlük dile çevir: zaman zarfı varken werden gereksiz ağırlık yapıyor.",
        source: "Nächste Woche werde ich anfangen.",
        answer: "Nächste Woche fange ich an.",
        alternatives: ["Nächste Woche fange ich an"],
        why: "Zaman zarfı geleceği zaten gösterdiği için Almanca günlük dilde şimdiki zaman kullanılır; werden'i her cümleye koymak dili resmîleştirir.",
      },
    ],
  },
  {
    id: "a2-u24-w2",
    level: "A2",
    skill: "writing",
    unit: 24,
    title: "Anmeldung zum Kurs",
    genre: "Resmî yazı",
    intro: "Kursa kayıt yaz: hangi kurs, hangi indirim, hangi soru?",
    gloss: [
      { de: "teilnehmen", tr: "katılmak", en: "to take part" },
      { de: "der Stundenplan", tr: "ders programı", en: "timetable" },
      { de: "die Universität", tr: "üniversite", en: "university" },
      { de: "das Ziel", tr: "hedef", en: "goal" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Broşürdeki bir kursa kayıt e-postası yaz. Hangi kursa katılmak istediğini, neden istediğini, indirimden yararlanıp yararlanamayacağını yaz ve program hakkında bir soru sor.",
        stimulus:
          "VOLKSHOCHSCHULE — HERBSTPROGRAMM\n\n" +
          "DEUTSCH B1 (Kurs 204) — ab 6. Oktober, Mo + Mi 18–20 Uhr, 180 € (Arbeitslose 60 €)\n" +
          "GITARRE FÜR ANFÄNGER (Kurs 311) — zehn Abende, Instrument wird gestellt, 95 €\n" +
          "WORKSHOP BEWERBUNG (Kurs 470) — ein Samstag, 9–16 Uhr, 40 €\n\n" +
          "Wer an der Universität oder der Fachhochschule studiert, zahlt die Hälfte.\n" +
          "Anmeldung: anmeldung@vhs-mitte.de",
        checklist: [
          "Hangi kursa katılmak istediğini kurs numarasıyla yazdın mı?",
          "Neden katılmak istediğini söyledin mi?",
          "İndirim durumunu belirttin mi?",
          "Program ya da yer hakkında bir soru sordun mu?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich möchte am Kurs … teilnehmen.", tr: "… kursuna katılmak istiyorum", en: "I'd like to take part in course …" },
          { de: "Mein Ziel ist es, …", tr: "hedefim …", en: "my goal is to …" },
          { de: "Wie sieht der Stundenplan aus?", tr: "ders programı nasıl", en: "what does the timetable look like" },
        ],
        sample:
          "Betreff: Anmeldung Kurs 204 — Deutsch B1\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich möchte am Kurs 204, Deutsch B1, teilnehmen. Mein Ziel ist es, im Frühjahr die B1-Prüfung abzulegen; im Moment arbeite ich als Küchenhilfe und möchte mich später bewerben.\n\n" +
          "Ich studiere an der Fachhochschule, also zahle ich die Hälfte. Meinen Ausweis bringe ich zum ersten Termin mit.\n\n" +
          "Eine Frage habe ich noch: Wie sieht der Stundenplan in den Ferien aus — fällt der Kurs im Oktober zwei Wochen aus, oder läuft er durch?\n\n" +
          "Vielen Dank im Voraus.\n\n" +
          "Mit freundlichen Grüßen\nSelma Koç",
      },
    ],
  },
];
