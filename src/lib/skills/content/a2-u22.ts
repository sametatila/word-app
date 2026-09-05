import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 22 — "Bekleyen cevap, bozulan bilgisayar, fotoğraflar, podcast".
 *
 * Dört ders: Ich warte auf deine Antwort · Der Computer spinnt · Schau mal,
 * meine Fotos · Mein Lieblingspodcast. İçerik ünite 1-22'nin kelimeleriyle
 * sınırlı.
 *
 *   Ünite 22: ungeduldig, geduldig, andauernd, sich absprechen, anstehen,
 *             erneut, beantworten, nerven · speichern, die Datei, das Passwort,
 *             der Akku, das Update, die Software, anschalten, herunterladen ·
 *             teilen, witzig, der Himmel, der Sonnenschein, auffällig,
 *             blättern, köstlich, lebendig · der Podcast, sich interessieren,
 *             das Interesse, das Interview, nützlich, plaudern, erwähnen,
 *             stundenlang
 *   Kalıplar: Ich warte auf deine Antwort. · Können Sie meine Frage bitte
 *             beantworten? · Speichere die Datei zuerst! · Mein Akku ist fast
 *             leer. · Dieses Foto gefällt mir am besten. · Schau mal, das ist
 *             am Meer. · Ich interessiere mich für Fußball. · Ich habe großes
 *             Interesse an Kunst.
 *
 * Ünitenin çekirdeği edatlı fiiller: warten AUF, sich interessieren FÜR,
 * Interesse AN. Türkçede bu ilgiyi hâl eki taşır ve edat yoktur, o yüzden
 * öğrenci fiili doğru bilse de edatı atlıyor ya da yanlışını koyuyor. Edat
 * fiille birlikte ezberlenmek zorunda — egzersizler bu yüzden aynı üç kalıbı
 * okuma, dinleme ve yazmada üç ayrı bağlamda döndürüyor.
 */
export const a2U22: SkillExercise[] = [
  {
    id: "a2-u22-r1",
    level: "A2",
    skill: "reading",
    unit: 22,
    title: "Wenn niemand antwortet",
    genre: "Blog yazısı",
    intro: "Cevapsız kalan mesajlar üstüne bir yazı. Ne zaman hatırlatmalı?",
    gloss: [
      { de: "ungeduldig", tr: "sabırsız", en: "impatient" },
      { de: "geduldig", tr: "sabırlı", en: "patient" },
      { de: "andauernd", tr: "sürekli", en: "constantly" },
      { de: "beantworten", tr: "cevaplamak", en: "to answer" },
      { de: "erneut", tr: "yeniden", en: "again" },
      { de: "nerven", tr: "sinir etmek", en: "to annoy" },
      { de: "sich absprechen", tr: "sözleşmek, kararlaştırmak", en: "to coordinate" },
    ],
    minutes: 4,
    text:
      "ICH WARTE AUF DEINE ANTWORT\n\n" +
      "Sie haben eine wichtige Mail geschrieben. Zwei Tage später: nichts. Werden Sie ungeduldig?\n\n" +
      "Die meisten warten zu lange und schreiben dann zu scharf. Dabei ist die Regel einfach: bei privaten Nachrichten drei Tage, bei der Arbeit zwei. Danach fragen Sie erneut — freundlich und kurz.\n\n" +
      "Was nervt wirklich? Nicht die Erinnerung, sondern das andauernde Nachfragen. Wer alle vier Stunden schreibt, bekommt seine Antwort nicht schneller.\n\n" +
      "Ein Satz, der fast immer funktioniert: „Können Sie meine Frage bitte beantworten? Ich brauche die Information bis Freitag.“ Damit sagen Sie, was Sie wollen und bis wann.\n\n" +
      "Und wenn Sie selbst der Langsame sind? Antworten Sie in einer Zeile: „Habe ich gesehen, melde mich Donnerstag.“ Das kostet zehn Sekunden und der andere muss nicht mehr geduldig sein.\n\n" +
      "Bei größeren Sachen lohnt es sich, sich vorher abzusprechen: wer antwortet wann. Dann wartet niemand umsonst.",
    questions: [
      {
        text: "Wie lange soll man bei der Arbeit warten?",
        options: ["Vier Stunden", "Zwei Tage", "Eine Woche"],
        answer: 1,
        explain: "„bei privaten Nachrichten drei Tage, bei der Arbeit zwei“.",
      },
      {
        kind: "gapfill",
        text: "Ich warte ___ deine Antwort.",
        options: [],
        answer: 0,
        accept: ["auf"],
        explain: "warten fiili auf edatını ister ve ardından belirtme hâli gelir; Türkçede edat yok, bu yüzden atlanıyor.",
      },
      {
        text: "Was nervt laut Text wirklich?",
        options: [
          "Eine freundliche Erinnerung",
          "Das andauernde Nachfragen",
          "Eine kurze Antwort",
        ],
        answer: 1,
        explain: "„Nicht die Erinnerung, sondern das andauernde Nachfragen.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man schreiben, wenn man selbst langsam ist?",
        options: [],
        answer: 0,
        accept: [
          "dass man sich später meldet",
          "Habe ich gesehen, melde mich Donnerstag.",
          "eine Zeile",
        ],
        explain: "Tek satırlık ara cevap: „Habe ich gesehen, melde mich Donnerstag.“",
      },
      {
        text: "Wer alle vier Stunden schreibt, bekommt schneller eine Antwort.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wer alle vier Stunden schreibt, bekommt seine Antwort nicht schneller.“",
      },
    ],
  },
  {
    id: "a2-u22-r2",
    level: "A2",
    skill: "reading",
    unit: 22,
    title: "Drei Podcasts für den Weg zur Arbeit",
    genre: "Öneri yazısı",
    intro: "Podcast önerileri. Hangisi kime, ne kadar sürüyor?",
    gloss: [
      { de: "der Podcast", tr: "podcast", en: "podcast" },
      { de: "sich interessieren", tr: "ilgilenmek", en: "to be interested" },
      { de: "das Interesse", tr: "ilgi", en: "interest" },
      { de: "das Interview", tr: "söyleşi", en: "interview" },
      { de: "nützlich", tr: "faydalı", en: "useful" },
      { de: "plaudern", tr: "çene çalmak", en: "to chat away" },
      { de: "erwähnen", tr: "anmak, değinmek", en: "to mention" },
      { de: "stundenlang", tr: "saatlerce", en: "for hours" },
    ],
    minutes: 4,
    text:
      "DREI PODCASTS FÜR DEN WEG ZUR ARBEIT\n\n" +
      "„Zwanzig Minuten Stadt“ — Jede Folge ein Interview mit jemandem aus der Nachbarschaft: der Bäckerin, dem Busfahrer, der Ärztin im Erdgeschoss. Kurz, ruhig, und man lernt die eigene Stadt neu kennen. Wer sich für Menschen interessiert, fängt hier an.\n\n" +
      "„Erklär mir das“ — Zwei Lehrerinnen erklären jede Woche eine Sache, die alle kennen und niemand versteht: Warum ist Wasser blau? Wie funktioniert eine Waschmaschine? Sehr nützlich, manchmal etwas lang. Sie plaudern gern und kommen erst nach zehn Minuten zum Thema.\n\n" +
      "„Küchentisch“ — Drei Freunde reden stundenlang über nichts. Entweder man liebt es oder man schaltet nach fünf Minuten ab. Ich habe großes Interesse an solchen Gesprächen, meine Schwester findet sie furchtbar.\n\n" +
      "Ein Hinweis noch: Alle drei erwähnen regelmäßig ihre Werbepartner. Das steht nicht immer im Titel, aber es ist ehrlich gesagt der Preis für kostenlose Folgen.",
    questions: [
      {
        text: "Worum geht es bei „Zwanzig Minuten Stadt“?",
        options: [
          "Um Interviews mit Leuten aus der Nachbarschaft",
          "Um Erklärungen von Lehrerinnen",
          "Um drei Freunde am Küchentisch",
        ],
        answer: 0,
        explain: "„Jede Folge ein Interview mit jemandem aus der Nachbarschaft.“",
      },
      {
        kind: "gapfill",
        text: "Wer sich ___ Menschen interessiert, fängt hier an.",
        options: [],
        answer: 0,
        accept: ["für"],
        explain: "sich interessieren fiili für edatını ister; Interesse ismi ise an ister — ikisi karıştırılıyor.",
      },
      {
        text: "Was ist der Nachteil von „Erklär mir das“?",
        options: [
          "Es ist nicht nützlich.",
          "Sie kommen erst nach zehn Minuten zum Thema.",
          "Es gibt keine neuen Folgen.",
        ],
        answer: 1,
        explain: "„Sie plaudern gern und kommen erst nach zehn Minuten zum Thema.“",
      },
      {
        kind: "short_answer",
        text: "Was erwähnen alle drei Podcasts regelmäßig?",
        options: [],
        answer: 0,
        accept: ["ihre Werbepartner", "Werbepartner", "die Werbung"],
        explain: "„Alle drei erwähnen regelmäßig ihre Werbepartner.“",
      },
      {
        text: "Die Schwester des Autors mag „Küchentisch“ auch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „meine Schwester findet sie furchtbar“.",
      },
    ],
  },
  {
    id: "a2-u22-l1",
    level: "A2",
    skill: "listening",
    unit: 22,
    title: "Der Computer spinnt",
    genre: "Diyalog",
    intro: "Bilgisayar sorunu telefonda çözülüyor. Sırayla ne yapılıyor?",
    gloss: [
      { de: "speichern", tr: "kaydetmek", en: "to save" },
      { de: "die Datei", tr: "dosya", en: "file" },
      { de: "das Passwort", tr: "şifre", en: "password" },
      { de: "der Akku", tr: "batarya", en: "battery" },
      { de: "das Update", tr: "güncelleme", en: "update" },
      { de: "die Software", tr: "yazılım", en: "software" },
      { de: "anschalten", tr: "açmak", en: "to turn on" },
      { de: "herunterladen", tr: "indirmek", en: "to download" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Merve", text: "Emre, mein Computer spinnt. Alles ist total langsam." },
      { speaker: "Emre", text: "Okay, ruhig. Speichere die Datei zuerst, bevor wir irgendetwas machen." },
      { speaker: "Merve", text: "Gespeichert. Und jetzt?" },
      { speaker: "Emre", text: "Schau unten rechts. Läuft da ein Update?" },
      { speaker: "Merve", text: "Ja! Es lädt seit heute Morgen etwas herunter." },
      { speaker: "Emre", text: "Das ist es. Die Software installiert im Hintergrund, deshalb ist alles langsam." },
      { speaker: "Merve", text: "Also einfach warten?" },
      { speaker: "Emre", text: "Warten und den Stecker drin lassen. Wie ist dein Akku?" },
      { speaker: "Merve", text: "Fast leer, elf Prozent." },
      { speaker: "Emre", text: "Dann schnell anstecken. Wenn er mitten im Update ausgeht, wird es unangenehm." },
      { speaker: "Merve", text: "Mache ich. Und danach schalte ich ihn einmal aus und wieder an?" },
      { speaker: "Emre", text: "Genau. Und schreib dir dein Passwort auf, du brauchst es danach vielleicht neu." },
    ],
    questions: [
      {
        text: "Was soll Merve als Erstes machen?",
        options: ["Den Computer ausschalten", "Die Datei speichern", "Das Passwort ändern"],
        answer: 1,
        explain: "„Speichere die Datei zuerst, bevor wir irgendetwas machen.“",
      },
      {
        kind: "gapfill",
        text: "Mein ___ ist fast leer, elf Prozent.",
        options: [],
        answer: 0,
        accept: ["Akku"],
        explain: "Güncelleme sırasında bataryanın bitmesi asıl riskli an.",
      },
      {
        text: "Warum ist der Computer langsam?",
        options: [
          "Der Akku ist leer.",
          "Die Software installiert ein Update im Hintergrund.",
          "Das Passwort ist falsch.",
        ],
        answer: 1,
        explain: "„Die Software installiert im Hintergrund, deshalb ist alles langsam.“",
      },
      {
        kind: "dictation",
        text: "Emre'nin ilk verdiği emri yaz.",
        options: [],
        answer: 0,
        accept: [
          "Speichere die Datei zuerst, bevor wir irgendetwas machen.",
          "Speichere die Datei zuerst!",
          "Speichere die Datei zuerst",
        ],
        explain: "du emrinde fiil kökü kullanılır ve özne söylenmez: speichere.",
      },
    ],
  },
  {
    id: "a2-u22-l2",
    level: "A2",
    skill: "listening",
    unit: 22,
    title: "Schau mal, meine Fotos",
    genre: "Diyalog",
    intro: "Tatil fotoğrafları gösteriliyor. Hangisi en çok beğeniliyor?",
    gloss: [
      { de: "teilen", tr: "paylaşmak", en: "to share" },
      { de: "witzig", tr: "komik", en: "funny" },
      { de: "der Himmel", tr: "gökyüzü", en: "sky" },
      { de: "der Sonnenschein", tr: "güneş ışığı", en: "sunshine" },
      { de: "auffällig", tr: "göze çarpan", en: "striking" },
      { de: "blättern", tr: "sayfa çevirmek", en: "to flick through" },
      { de: "köstlich", tr: "nefis", en: "delicious" },
      { de: "lebendig", tr: "canlı", en: "lively" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Selin", text: "Schau mal, das ist am Meer. Blätter ruhig weiter." },
      { speaker: "Ayhan", text: "Der Himmel ist ja unglaublich. Ist das bearbeitet?" },
      { speaker: "Selin", text: "Nein, echt. Wir hatten drei Tage nur Sonnenschein." },
      { speaker: "Ayhan", text: "Und das hier? Wer sitzt da mit dem großen Hut?" },
      { speaker: "Selin", text: "Meine Schwiegermutter. Der Hut war ihr zu auffällig, sie hat ihn nach einer Stunde ausgezogen." },
      { speaker: "Ayhan", text: "Das Bild ist wirklich witzig. Und dieses Essen …" },
      { speaker: "Selin", text: "Fisch mit Zitrone, direkt am Hafen. Köstlich, und billiger als bei uns." },
      { speaker: "Ayhan", text: "Welches gefällt dir eigentlich am besten?" },
      { speaker: "Selin", text: "Das mit dem Markt. Nicht das schönste, aber am lebendigsten — alle reden durcheinander." },
      { speaker: "Ayhan", text: "Stimmt, das ist das beste. Teilst du mir ein paar?" },
      { speaker: "Selin", text: "Klar, ich schicke dir heute Abend zehn Stück." },
    ],
    questions: [
      {
        text: "Wie war das Wetter im Urlaub?",
        options: ["Drei Tage Regen", "Drei Tage nur Sonnenschein", "Wechselhaft"],
        answer: 1,
        explain: "„Wir hatten drei Tage nur Sonnenschein.“",
      },
      {
        kind: "gapfill",
        text: "Welches Foto gefällt dir ___ besten?",
        options: [],
        answer: 0,
        accept: ["am"],
        explain: "En üstün derece yüklem konumunda am ... -sten kalıbıyla kurulur.",
      },
      {
        text: "Warum hat die Schwiegermutter den Hut ausgezogen?",
        options: ["Er war zu warm.", "Er war ihr zu auffällig.", "Er war zu klein."],
        answer: 1,
        explain: "„Der Hut war ihr zu auffällig, sie hat ihn nach einer Stunde ausgezogen.“",
      },
      {
        kind: "short_answer",
        text: "Welches Foto findet Selin am besten und warum?",
        options: [],
        answer: 0,
        accept: [
          "das mit dem Markt",
          "das mit dem Markt, weil es am lebendigsten ist",
          "das Marktfoto",
        ],
        explain: "„Das mit dem Markt. Nicht das schönste, aber am lebendigsten.“",
      },
    ],
  },
  {
    id: "a2-u22-w1",
    level: "A2",
    skill: "writing",
    unit: 22,
    title: "Fiilin edatı",
    genre: "Dil bilgisi",
    intro: "warten auf, sich interessieren für, Interesse an — edat fiile bağlıdır.",
    gloss: [
      { de: "warten auf", tr: "beklemek", en: "to wait for" },
      { de: "sich interessieren für", tr: "ilgilenmek", en: "to be interested in" },
      { de: "das Interesse an", tr: "…-e ilgi", en: "interest in" },
      { de: "beantworten", tr: "cevaplamak", en: "to answer" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Cevabını bekliyorum.",
        answer: "Ich warte auf deine Antwort",
        hint: "warten fiili auf ister ve ardından belirtme hâli gelir.",
      },
      {
        kind: "build",
        tr: "Futbolla ilgileniyorum.",
        answer: "Ich interessiere mich für Fußball",
        hint: "sich interessieren für — dönüşlü zamir fiilden hemen sonra gelir.",
      },
      {
        kind: "build",
        tr: "Sorumu cevaplayabilir misiniz?",
        answer: "Können Sie meine Frage bitte beantworten",
        hint: "beantworten edat almaz, soruyu doğrudan nesne olarak alır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: fiilin istediği edat yanlış.",
        source: "Ich interessiere mich an Kunst.",
        answer: "Ich interessiere mich für Kunst.",
        alternatives: ["Ich interessiere mich für Kunst", "Ich habe Interesse an Kunst."],
        why: "Fiil için edatı für'dür; an ise isimle gider — Interesse AN Kunst. Aynı anlamı iki yapı taşır ama edatları farklıdır ve değiş tokuş edilemez.",
      },
    ],
  },
  {
    id: "a2-u22-w2",
    level: "A2",
    skill: "writing",
    unit: 22,
    title: "Höflich nachfragen",
    genre: "Resmî yazı",
    intro: "Cevapsız kalan yazına hatırlatma yaz: ne sormuştun, ne zamana lazım?",
    gloss: [
      { de: "beantworten", tr: "cevaplamak", en: "to answer" },
      { de: "erneut", tr: "yeniden", en: "again" },
      { de: "geduldig", tr: "sabırlı", en: "patient" },
      { de: "sich absprechen", tr: "kararlaştırmak", en: "to coordinate" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "İlk yazına cevap gelmedi. Kibar bir hatırlatma yaz: ne zaman ve ne sorduğunu hatırlat, neden gerektiğini söyle, bir tarih ver ve teşekkür et.",
        stimulus:
          "GÖNDERDİĞİN İLK E-POSTA (12 gün önce, cevapsız):\n\n" +
          "Betreff: Frage zum Kurs im Herbst\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich möchte am Deutschkurs B1 im Herbst teilnehmen. Kann ich mich schon jetzt anmelden, und was kostet der Kurs?\n\n" +
          "Mit freundlichen Grüßen\nDeniz Aydın",
        checklist: [
          "İlk yazını ne zaman gönderdiğini hatırlattın mı?",
          "Ne sorduğunu kısaca tekrarladın mı?",
          "Neden bilgiye ihtiyacın olduğunu ve bir tarih verdin mi?",
          "Ton kibar kaldı mı (suçlamadan)?",
        ],
        minWords: 45,
        phrases: [
          { de: "Ich habe Ihnen am … geschrieben.", tr: "…-de size yazmıştım", en: "I wrote to you on …" },
          { de: "Können Sie meine Frage bitte beantworten?", tr: "sorumu cevaplayabilir misiniz", en: "could you please answer my question" },
          { de: "Ich brauche die Information bis …", tr: "bilgiye …-e kadar ihtiyacım var", en: "I need the information by …" },
        ],
        sample:
          "Betreff: Erneute Frage zum Kurs im Herbst\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich habe Ihnen am 12. Mai geschrieben und warte noch auf eine Antwort. Vielleicht ist meine Mail untergegangen, deshalb frage ich erneut.\n\n" +
          "Meine Frage war: Kann ich mich schon jetzt für den Deutschkurs B1 im Herbst anmelden, und was kostet er?\n\n" +
          "Können Sie meine Frage bitte beantworten? Ich brauche die Information bis Freitag, weil ich mich sonst bei einer anderen Schule anmelden muss.\n\n" +
          "Vielen Dank für Ihre Mühe.\n\n" +
          "Mit freundlichen Grüßen\nDeniz Aydın",
      },
    ],
  },
];
