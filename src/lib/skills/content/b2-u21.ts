import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 21 — "Öyle görünmek ile öyle olmak".
 *
 * Dört ders: Als ob nichts wäre · Das dürfte stimmen · Was Gesten verraten ·
 * Das große Missverständnis. Ünite görünen ile olan arasındaki boşlukla
 * uğraşıyor: als ob boşluğu açıkça işaretler, öznel kip tahmini derecelendirir,
 * indem ise bir izlenimin nasıl doğduğunu söyler.
 *
 *   Ünite 21: gleichgültig, die Verlegenheit, das Unbehagen, sich schämen,
 *             nachahmen, zugeben, launisch, oberflächlich · die Vermutung,
 *             die Deutung, die Auslegung, das Gegenargument,
 *             die Selbstsicherheit, wahrnehmen, zögern, misstrauen ·
 *             die Geste, die Mimik, der Blickkontakt, die Verhaltensweise,
 *             zwischenmenschlich, aufgeschlossen, selbstbewusst,
 *             sich zurückziehen · das Missverständnis, die Sprachbarriere,
 *             die Umgangssprache, das Sprachgefühl, das Fremdwort,
 *             die Aussagekraft, die Sprechhemmung, geläufig
 *   Kalıplar: Er tut so, als ob … wäre · Als wäre nichts passiert ·
 *             dürfte / müsste / könnte · Das schließe ich nicht aus ·
 *             …, indem wir … · Blickkontakt halten · Es klang, als ob … ·
 *             Gemeint war aber …
 *
 * als ob Konjunktiv II ister ve bu tesadüf değil: yapı zaten gerçek olmayan
 * bir durumu anlatıyor. Türkçedeki "sanki" kip değiştirmediği için Türkçe
 * konuşan burada düz haber kipiyle devam etmeye yatkındır.
 */
export const b2U21: SkillExercise[] = [
  {
    id: "b2-u21-r1",
    level: "B2",
    skill: "reading",
    unit: 21,
    title: "Was Gesten verraten",
    genre: "Popüler bilim yazısı",
    intro: "Beden dili üzerine ölçülü bir yazı. Neyin gerçekten okunabildiğine dikkat et.",
    gloss: [
      { de: "die Geste", tr: "jest", en: "gesture" },
      { de: "die Mimik", tr: "yüz ifadesi", en: "facial expression" },
      { de: "der Blickkontakt", tr: "göz teması", en: "eye contact" },
      { de: "die Verhaltensweise", tr: "davranış biçimi", en: "behaviour" },
      { de: "zwischenmenschlich", tr: "kişiler arası", en: "interpersonal" },
      { de: "aufgeschlossen", tr: "açık fikirli", en: "open-minded" },
      { de: "selbstbewusst", tr: "özgüvenli", en: "self-assured" },
      { de: "sich zurückziehen", tr: "geri çekilmek", en: "to withdraw" },
    ],
    minutes: 6,
    text:
      "WAS GESTEN VERRATEN — UND WAS NICHT\n\n" +
      "Über verschränkte Arme ist mehr Unsinn geschrieben worden als über fast jede andere Verhaltensweise. Sie bedeuten nicht Ablehnung. Sie bedeuten meistens, dass jemand friert oder dass der Stuhl keine Lehnen hat.\n\n" +
      "Trotzdem ist an der Sache etwas dran, nur anders, als die Ratgeber behaupten. Einzelne Gesten sagen fast nichts. Aussagekraft entsteht erst durch Veränderung: Wenn jemand zwanzig Minuten offen dasitzt und sich bei einem bestimmten Thema plötzlich zurückzieht, dann ist nicht die Haltung interessant, sondern der Moment des Wechsels.\n\n" +
      "Am zuverlässigsten ist die Mimik, und zwar in den ersten Sekundenbruchteilen. Danach übernimmt die Kontrolle. Deshalb wirken Fotos oft ehrlicher als Gespräche — sie erwischen die Zeit vor der Korrektur.\n\n" +
      "Und Blickkontakt? Wir halten ihn nicht, um selbstbewusst zu wirken, sondern wir wirken selbstbewusst, indem wir ihn in normalen Abständen unterbrechen. Wer starrt, wirkt nicht souverän, sondern anstrengend. Die Regel ist kulturell verschieden, und genau darin liegt eine häufige Quelle zwischenmenschlicher Fehlurteile.\n\n" +
      "Ein letzter Hinweis für alle, die sich in Gesprächen unsicher fühlen: Man wirkt nicht dadurch aufgeschlossen, dass man bestimmte Gesten nachmacht. Man wirkt aufgeschlossen, indem man zuhört und nachfragt. Der Rest folgt von allein — und wenn nicht, hat es niemand gemerkt.",
    questions: [
      {
        text: "Was bedeuten verschränkte Arme laut Text meistens?",
        options: [
          "Ablehnung",
          "dass jemand friert oder der Stuhl keine Lehnen hat",
          "Unsicherheit",
        ],
        answer: 1,
        explain: "„Sie bedeuten meistens, dass jemand friert oder dass der Stuhl keine Lehnen hat.“",
      },
      {
        kind: "gapfill",
        text: "Wir wirken selbstbewusst, ___ wir den Blickkontakt in normalen Abständen unterbrechen.",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "indem 'nasıl' sorusuna cevap verir; yan cümlede fiil sona gider.",
      },
      {
        kind: "short_answer",
        text: "Wodurch entsteht Aussagekraft?",
        options: [],
        answer: 0,
        accept: ["durch Veränderung", "durch den Wechsel", "durch den Moment des Wechsels"],
        explain: "„Aussagekraft entsteht erst durch Veränderung.“",
      },
      {
        text: "Warum wirken Fotos oft ehrlicher als Gespräche?",
        options: [
          "weil sie die Zeit vor der Korrektur erwischen",
          "weil man auf Fotos nicht spricht",
          "weil die Mimik dort größer ist",
        ],
        answer: 0,
        explain: "„…sie erwischen die Zeit vor der Korrektur.“",
      },
      {
        text: "Man wirkt aufgeschlossen, indem man Gesten nachmacht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Man wirkt aufgeschlossen, indem man zuhört und nachfragt.“",
      },
    ],
  },

  {
    id: "b2-u21-r2",
    level: "B2",
    skill: "reading",
    unit: 21,
    title: "Das große Missverständnis",
    genre: "Deneme",
    intro: "Yabancı dilde yanlış anlaşılmanın nerede doğduğunu anlatan bir yazı.",
    gloss: [
      { de: "das Missverständnis", tr: "yanlış anlama", en: "misunderstanding" },
      { de: "die Sprachbarriere", tr: "dil engeli", en: "language barrier" },
      { de: "die Umgangssprache", tr: "günlük konuşma dili", en: "colloquial language" },
      { de: "das Sprachgefühl", tr: "dil sezgisi", en: "feel for the language" },
      { de: "das Fremdwort", tr: "yabancı kelime", en: "foreign word" },
      { de: "die Aussagekraft", tr: "ifade gücü", en: "expressiveness" },
      { de: "die Sprechhemmung", tr: "konuşma çekingenliği", en: "reluctance to speak" },
      { de: "geläufig", tr: "aşina", en: "familiar" },
    ],
    minutes: 6,
    text:
      "DAS GROSSE MISSVERSTÄNDNIS\n\n" +
      "„Das können wir so machen.“ Der Satz klang, als ob alles geklärt wäre. Gemeint war aber: Ich habe verstanden, was du willst, und ich sage dir jetzt nicht, dass es nicht geht.\n\n" +
      "Die meisten Missverständnisse zwischen Sprachen entstehen nicht an der Sprachbarriere im engeren Sinn. Die Wörter sind bekannt, die Grammatik stimmt — und trotzdem kommt etwas anderes an. Der Grund liegt eine Ebene tiefer, in dem, was als höflich, direkt oder verbindlich gilt.\n\n" +
      "Ein Beispiel. Im Deutschen ist ein klares „nein“ nicht unfreundlich, sondern zeitsparend. Wer aus einer Sprachkultur kommt, in der Ablehnung indirekt formuliert wird, hört darin Härte, wo keine gemeint ist. Umgekehrt hören Deutschsprachige in einer höflichen Umschreibung oft eine Zusage. Beide Seiten haben korrekt gesprochen und sich trotzdem verpasst.\n\n" +
      "Dazu kommt die Umgangssprache. Wer die Standardsprache gut beherrscht, versteht im Büro alles und im Aufenthaltsraum nichts — dort laufen Abkürzungen, Ironie und halbe Sätze. Genau das erzeugt Sprechhemmung: Man traut sich nicht mehr, weil man den Ton nicht trifft.\n\n" +
      "Was hilft? Erstens: nachfragen, auch wenn es sich dumm anfühlt. „Heißt das ja oder heißt das vielleicht?“ ist eine völlig normale Frage. Zweitens: nicht das seltenste Fremdwort suchen, sondern das geläufige. Die Aussagekraft eines Satzes hängt nicht am Vokabular. Und drittens: Sprachgefühl kommt nicht vom Lernen, sondern vom Danebenliegen und Korrigiertwerden.",
    questions: [
      {
        kind: "gapfill",
        text: "Der Satz klang, ___ ob alles geklärt wäre.",
        options: [],
        answer: 0,
        accept: ["als"],
        explain: "als ob yapısı Konjunktiv II ister: wäre, çünkü durum gerçekte öyle değil.",
      },
      {
        text: "Wo entstehen die meisten Missverständnisse laut Text?",
        options: [
          "bei den Wörtern",
          "bei dem, was als höflich, direkt oder verbindlich gilt",
          "bei der Grammatik",
        ],
        answer: 1,
        explain: "„Der Grund liegt eine Ebene tiefer, in dem, was als höflich, direkt oder verbindlich gilt.“",
      },
      {
        kind: "short_answer",
        text: "Warum entsteht Sprechhemmung im Aufenthaltsraum?",
        options: [],
        answer: 0,
        accept: ["wegen der Umgangssprache", "man trifft den Ton nicht", "wegen Ironie und Abkürzungen"],
        explain: "„…dort laufen Abkürzungen, Ironie und halbe Sätze. Genau das erzeugt Sprechhemmung.“",
      },
      {
        text: "Woher kommt Sprachgefühl laut Text?",
        options: [
          "vom Lernen",
          "vom Danebenliegen und Korrigiertwerden",
          "vom Lesen",
        ],
        answer: 1,
        explain: "„Sprachgefühl kommt nicht vom Lernen, sondern vom Danebenliegen und Korrigiertwerden.“",
      },
      {
        text: "Ein klares „nein“ gilt im Deutschen als unfreundlich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Im Deutschen ist ein klares 'nein' nicht unfreundlich, sondern zeitsparend.“",
      },
    ],
  },

  {
    id: "b2-u21-l1",
    level: "B2",
    skill: "listening",
    unit: 21,
    title: "Als wäre nichts passiert",
    genre: "Diyalog",
    intro: "İki arkadaş bir davranışı konuşuyor. Görünen ile olan arasındaki farka dikkat et.",
    gloss: [
      { de: "gleichgültig", tr: "kayıtsız", en: "indifferent" },
      { de: "die Verlegenheit", tr: "mahcubiyet", en: "embarrassment" },
      { de: "das Unbehagen", tr: "huzursuzluk", en: "unease" },
      { de: "sich schämen", tr: "utanmak", en: "to be ashamed" },
      { de: "nachahmen", tr: "taklit etmek", en: "to imitate" },
      { de: "zugeben", tr: "itiraf etmek", en: "to admit" },
      { de: "launisch", tr: "kaprisli", en: "moody" },
      { de: "oberflächlich", tr: "yüzeysel", en: "superficial" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Meral", text: "Er ist heute reingekommen, als wäre nichts passiert. Kein Wort über gestern." },
      { speaker: "Til", text: "Vielleicht schämt er sich einfach." },
      { speaker: "Meral", text: "Er tut so, als ob es ihm gleichgültig wäre. Das ist etwas anderes." },
      { speaker: "Til", text: "Ist es das? Genau so sieht Verlegenheit oft aus." },
      { speaker: "Meral", text: "Meinst du?" },
      { speaker: "Til", text: "Ja. Wer sein Unbehagen zeigt, muss darüber reden. Wer gleichgültig tut, muss es nicht." },
      { speaker: "Meral", text: "Trotzdem könnte er es kurz zugeben. Ein Satz würde reichen." },
      { speaker: "Til", text: "Da stimme ich dir zu. Aber launisch ist er nicht, das war ein einzelner Abend." },
      { speaker: "Meral", text: "Stimmt. Ich fand nur die Reaktion danach so oberflächlich." },
      { speaker: "Til", text: "Sprich ihn an. Nicht vorwurfsvoll, einfach fragen, wie er es sieht." },
      { speaker: "Meral", text: "Und wenn er wieder ausweicht?" },
      { speaker: "Til", text: "Dann weißt du mehr als jetzt. Sein Verhalten nachahmen bringt jedenfalls nichts." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Meral'in davranışı tarif ettiği ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Er ist heute reingekommen, als wäre nichts passiert."],
        explain: "als + Konjunktiv II: ob düşünce fiil hemen als'ın arkasına gelir.",
      },
      {
        text: "Wie erklärt Til das Verhalten?",
        options: [
          "als Gleichgültigkeit",
          "als Verlegenheit",
          "als Launenhaftigkeit",
        ],
        answer: 1,
        explain: "„Vielleicht schämt er sich einfach.“ — „Genau so sieht Verlegenheit oft aus.“",
      },
      {
        kind: "short_answer",
        text: "Was rät Til am Ende?",
        options: [],
        answer: 0,
        accept: ["ihn anzusprechen", "fragen, wie er es sieht", "mit ihm reden"],
        explain: "„Sprich ihn an. Nicht vorwurfsvoll, einfach fragen, wie er es sieht.“",
      },
      {
        text: "Warum muss laut Til jemand, der gleichgültig tut, nicht reden?",
        options: [
          "weil niemand ihn fragt",
          "weil nur wer Unbehagen zeigt, darüber reden muss",
          "weil er nichts gemerkt hat",
        ],
        answer: 1,
        explain: "„Wer sein Unbehagen zeigt, muss darüber reden. Wer gleichgültig tut, muss es nicht.“",
      },
      {
        text: "Til hält den Kollegen für grundsätzlich launisch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Aber launisch ist er nicht, das war ein einzelner Abend.“",
      },
    ],
  },

  {
    id: "b2-u21-l2",
    level: "B2",
    skill: "listening",
    unit: 21,
    title: "Das dürfte stimmen",
    genre: "Diyalog",
    intro: "Bir tahmin tartışılıyor. Kesinlik derecelerini kiplerden çıkar.",
    gloss: [
      { de: "die Vermutung", tr: "tahmin", en: "assumption" },
      { de: "die Deutung", tr: "yorum", en: "interpretation" },
      { de: "die Auslegung", tr: "yorumlama", en: "reading" },
      { de: "das Gegenargument", tr: "karşı argüman", en: "counterargument" },
      { de: "die Selbstsicherheit", tr: "kendine güven", en: "self-confidence" },
      { de: "wahrnehmen", tr: "algılamak", en: "to perceive" },
      { de: "zögern", tr: "tereddüt etmek", en: "to hesitate" },
      { de: "misstrauen", tr: "güvenmemek", en: "to distrust" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kaan", text: "Meine Vermutung: Die Zahlen stammen aus dem alten System." },
      { speaker: "Silke", text: "Das dürfte stimmen. Die Spaltenüberschriften sehen jedenfalls so aus." },
      { speaker: "Kaan", text: "Könnte es auch ein Exportfehler sein?" },
      { speaker: "Silke", text: "Das schließe ich nicht aus. Aber dann müssten die Summen anders abweichen." },
      { speaker: "Kaan", text: "Wie meinst du das?" },
      { speaker: "Silke", text: "Bei einem Exportfehler fehlen ganze Zeilen. Hier stimmt die Zeilenzahl." },
      { speaker: "Kaan", text: "Das ist ein gutes Gegenargument." },
      { speaker: "Silke", text: "Es ist eine Deutung, mehr nicht. Ich würde nicht darauf wetten." },
      { speaker: "Kaan", text: "Du zögerst. Warum?" },
      { speaker: "Silke", text: "Weil ich meiner eigenen Auslegung misstraue, wenn sie zu gut passt." },
      { speaker: "Kaan", text: "Das ist eine seltene Form von Selbstsicherheit." },
      { speaker: "Silke", text: "Ich will nur wahrnehmen, was da steht, nicht was ich erwarte. Prüfen wir zwei Datensätze." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Silke'nin tahmini destekleyip kesinlik vermediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Das dürfte stimmen."],
        explain: "dürfte yüksek olasılık bildirir; müsste mantıksal çıkarım, könnte zayıf olasılıktır.",
      },
      {
        text: "Was spricht gegen einen Exportfehler?",
        options: [
          "Die Zeilenzahl stimmt.",
          "Die Spaltenüberschriften fehlen.",
          "Das Datum ist falsch.",
        ],
        answer: 0,
        explain: "„Bei einem Exportfehler fehlen ganze Zeilen. Hier stimmt die Zeilenzahl.“",
      },
      {
        kind: "short_answer",
        text: "Warum misstraut Silke ihrer eigenen Deutung?",
        options: [],
        answer: 0,
        accept: ["weil sie zu gut passt", "sie passt zu gut", "es sieht zu glatt aus"],
        explain: "„…wenn sie zu gut passt.“ Bu yüzden iki veri seti daha kontrol edilecek.",
      },
      {
        text: "Was schlägt Silke am Ende vor?",
        options: [
          "zwei Datensätze zu prüfen",
          "das alte System abzuschalten",
          "nichts zu tun",
        ],
        answer: 0,
        explain: "„Prüfen wir zwei Datensätze.“",
      },
      {
        text: "Silke schließt einen Exportfehler völlig aus.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das schließe ich nicht aus.“",
      },
    ],
  },

  {
    id: "b2-u21-w1",
    level: "B2",
    skill: "writing",
    unit: 21,
    title: "Sanki ve galiba",
    genre: "Cümle kurma",
    intro: "als ob gerçek olmayanı, öznel kip ise kesinliğin derecesini işaretler.",
    gloss: [
      { de: "gleichgültig", tr: "kayıtsız", en: "indifferent" },
      { de: "die Vermutung", tr: "tahmin", en: "assumption" },
      { de: "der Blickkontakt", tr: "göz teması", en: "eye contact" },
      { de: "geläufig", tr: "aşina", en: "familiar" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Hiçbir şey olmamış gibi içeri girdi.",
        answer: "Er ist reingekommen, als wäre nichts passiert",
        hint: "ob düşünce fiil hemen als'ın arkasına gelir; kip Konjunktiv II'dir.",
      },
      {
        kind: "build",
        tr: "Umurunda değilmiş gibi davranıyor.",
        answer: "Er tut so, als ob es ihm gleichgültig wäre",
        hint: "als ob ile kurulunca fiil yan cümlenin sonuna gider.",
      },
      {
        kind: "build",
        tr: "Bu doğru olsa gerek.",
        answer: "Das dürfte stimmen",
        hint: "dürfte yüksek olasılık; müsste mantıksal çıkarım, könnte zayıf ihtimaldir.",
      },
      {
        kind: "build",
        tr: "Göz temasını normal aralıklarla keserek özgüvenli görünüyoruz.",
        answer: "Wir wirken selbstbewusst, indem wir den Blickkontakt unterbrechen",
        hint: "indem yan cümlesinde özne tekrarlanır, fiil sona gider.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi als ob ile yaz ve doğru kipi seç.",
        source: "Es klang so. Alles ist geklärt.",
        answer: "Es klang, als ob alles geklärt wäre.",
        alternatives: [
          "Es klang, als ob alles geklärt wäre",
          "Es klang, als wäre alles geklärt.",
        ],
        why: "als ob Konjunktiv II ister, çünkü yapı zaten gerçek olmayan bir durumu anlatıyor: kulağa öyle geldi ama değildi. Türkçedeki 'sanki' kipi değiştirmediği için Türkçe konuşan burada düz haber kipiyle devam etmeye yatkındır - 'als ob alles geklärt ist' kulağa doğru gelir ama değildir.",
      },
    ],
  },

  {
    id: "b2-u21-w2",
    level: "B2",
    skill: "writing",
    unit: 21,
    title: "Ein Missverständnis",
    genre: "Anlatı",
    intro: "Yaşadığın bir yanlış anlamayı anlat — iki tarafın da ne demek istediğini göster.",
    gloss: [
      { de: "das Missverständnis", tr: "yanlış anlama", en: "misunderstanding" },
      { de: "die Umgangssprache", tr: "günlük konuşma dili", en: "colloquial language" },
      { de: "zugeben", tr: "itiraf etmek", en: "to admit" },
      { de: "wahrnehmen", tr: "algılamak", en: "to perceive" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir yanlış anlamayı anlat: dilden, kültürden ya da sadece bir cümlenin tonundan doğmuş olabilir. Şu sırayı tut: durum ve söylenen cümle, senin nasıl anladığın, karşı tarafın ne demek istediği, nasıl çözüldüğü ve bugün ne düşündüğün. En az bir kez als ob ya da als + Konjunktiv II kullan, en az bir kez de tahmin bildiren bir kip -dürfte, könnte, müsste-. Kimseyi haksız çıkarmaya çalışma.",
        checklist: [
          "Söylenen cümle ile anlaşılan ayrı ayrı verildi mi?",
          "En az bir als ob ya da als + Konjunktiv II var mı?",
          "En az bir tahmin kipi kullanıldı mı?",
          "Çözüm ve bugünkü değerlendirme var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Es klang, als ob alles geklärt wäre.", tr: "her şey çözülmüş gibi geldi", en: "it sounded as if everything were settled" },
          { de: "Gemeint war aber etwas anderes.", tr: "ama kastedilen başkaydı", en: "but something else was meant" },
          { de: "Das dürfte an der Umgangssprache gelegen haben.", tr: "bu günlük dilden olsa gerek", en: "that was probably down to the colloquial language" },
        ],
        sample:
          "„DAS KÖNNEN WIR SO MACHEN“\n\n" +
          "In meiner zweiten Woche im Betrieb habe ich einen Vorschlag gemacht, wie wir die Übergabe am Freitag umstellen könnten. Mein Abteilungsleiter hörte zu, nickte und sagte: „Das können wir so machen.“\n\n" +
          "Für mich klang das, als ob die Sache entschieden wäre. Ich habe die neue Reihenfolge am Freitag einfach angewendet — und stand allein da, weil niemand sonst davon wusste.\n\n" +
          "Gemeint war etwas ganz anderes. Er wollte sagen: Der Vorschlag ist grundsätzlich möglich, wir reden noch darüber. Ich habe eine Zusage wahrgenommen, wo eine Einschätzung stand. Das dürfte auch an der Umgangssprache gelegen haben; im Lehrbuch stand dieser Satz nicht.\n\n" +
          "Geklärt hat es sich am Montag in drei Minuten. Er hat zugegeben, dass er sich unklar ausgedrückt hatte, und ich habe zugegeben, dass ich nicht nachgefragt hatte.\n\n" +
          "Heute stelle ich eine dumme Frage mehr: „Heißt das ja oder heißt das vielleicht?“ Niemand hat mich dafür je schief angesehen.",
      },
    ],
  },
];
