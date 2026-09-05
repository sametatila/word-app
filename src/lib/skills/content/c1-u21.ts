import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 21 — "İroni, mizahın sınırı, kelime oyunu, bölge klişeleri".
 *
 * Dört ders: Na, das lief ja super · Witz oder Spitze? ·
 * Der feine Wortwitz · Nord gegen Süd.
 *
 *   Kelime: der Unterton, das Gegenteil, der Tonfall, sarkastisch, entlarven,
 *           die Ironie, der Erzähler, gespalten · der Scherz, verletzend,
 *           ankommen, die Zielscheibe, zurücknehmen, bloßstellen,
 *           schikanieren, die Provokation · das Wortspiel, der doppelte Boden,
 *           der Kalauer, der Witz, gelingen, der Reim, das Tabu, interpretieren ·
 *           das Klischee, das Augenzwinkern, zugeknöpft, der Landstrich,
 *           pauschal, die Sitte, der Aberglaube, der Kult
 *
 * Ünitenin çekirdeği: MİZAHIN HÜKMÜ ALICIDA. Almancanın kendi deyimi bunu
 * dilbilgisiyle söylüyor: "Das ist nicht gut angekommen" — özne şaka,
 * fiil varış, karar karşı tarafta. Niyet ("ich habe es nicht so gemeint")
 * sonucu değiştirmiyor.
 *
 * İkinci hat yabancı dilde ironinin geç gelmesi. Almanca ironi çoğu zaman
 * İŞARETSİZ: gülümseme yok, ton düz, abartı küçük. Türkçe konuşan ilk
 * yıllarda düz anlamı duyuyor, sonraki yıllarda ters tarafa düşüp gerçek
 * eleştiriyi de şaka sanabiliyor. Okuma metni ipuçlarını sayıyor
 * (bağlam çelişkisi, abartılı olumlu, "ja/aber/wohl" parçacıkları).
 */
export const c1U21: SkillExercise[] = [
  {
    id: "c1-u21-r1",
    level: "C1",
    skill: "reading",
    unit: 21,
    title: "Na, das lief ja super",
    genre: "Dil yazısı",
    intro: "İroniyi tonsuz nasıl tanırsın? Metinde gülümseme yok.",
    gloss: [
      { de: "die Ironie", tr: "ironi", en: "irony" },
      { de: "der Unterton", tr: "alt ton", en: "undertone" },
      { de: "der Tonfall", tr: "ses tonu", en: "intonation" },
      { de: "das Gegenteil", tr: "tersi", en: "the opposite" },
      { de: "sarkastisch", tr: "alaycı", en: "sarcastic" },
      { de: "entlarven", tr: "maskesini düşürmek", en: "to expose" },
      { de: "gespalten", tr: "ikiye bölünmüş", en: "divided" },
    ],
    minutes: 7,
    text:
      "WENN DER TON FEHLT\n\n" +
      "„Na, das lief ja super.“ Im Gespräch verrät der Tonfall alles. In einer Nachricht steht dasselbe da wie ein Lob.\n\n" +
      "Deutsche Ironie ist oft unmarkiert. Es fehlt das Lachen, die Übertreibung bleibt klein, das Gesicht bleibt ernst. Wer aus einer Sprache kommt, in der Ironie deutlicher angezeigt wird, hört jahrelang das Gegenteil dessen, was gemeint ist — und merkt es meist erst, wenn jemand nachfragt.\n\n" +
      "Es gibt dennoch Anhaltspunkte, und sie stehen im Text, nicht in der Stimme.\n\n" +
      "Erstens der Widerspruch zur Lage. Nach einem gescheiterten Projekt ist „das lief ja super“ nicht mehrdeutig, sondern eindeutig ironisch. Wer die Fakten kennt, kennt die Bedeutung.\n\n" +
      "Zweitens die Partikeln. „ja“, „aber“, „wohl“ und „vielleicht“ tragen in solchen Sätzen mehr als ihr Wörterbucheintrag: „Du bist mir aber einer“ ist kein Kompliment. „Das war ja klar“ enthält Vorwurf, nicht Feststellung.\n\n" +
      "Drittens die übertriebene Wortwahl. Wer statt „gut“ plötzlich „großartig“, „phänomenal“ oder „ein Traum“ schreibt, obwohl es um einen verspäteten Bus geht, meint das Gegenteil.\n\n" +
      "Zwei Fehler liegen nahe. Der erste ist, alles wörtlich zu nehmen. Der zweite kommt später und ist unangenehmer: alles für Ironie zu halten. Wer echte Kritik als Scherz behandelt, entlarvt sich schneller als jemand, der nachfragt. Und Nachfragen ist erlaubt — „War das ironisch gemeint?“ ist eine normale Frage, keine Kapitulation.",
    questions: [
      {
        text: "Warum ist deutsche Ironie für Lernende schwer?",
        options: [
          "Sie ist besonders häufig",
          "Sie ist oft unmarkiert: kein Lachen, kleine Übertreibung, ernstes Gesicht",
          "Sie kommt nur in Schriftform vor",
        ],
        answer: 1,
        explain: "İşaret yoksa düz anlam duyuluyor.",
      },
      {
        kind: "gapfill",
        text: "Na, das lief ___ super.",
        options: [],
        answer: 0,
        accept: ["ja"],
        explain: "Parçacık sözlük anlamından fazlasını taşıyor.",
      },
      {
        text: "Welcher Fehler kommt laut Text später und ist unangenehmer?",
        options: [
          "Alles wörtlich zu nehmen",
          "Alles für Ironie zu halten",
          "Zu viel nachzufragen",
        ],
        answer: 1,
        explain: "Gerçek eleştiriyi şaka sayan kendini daha hızlı ele veriyor.",
      },
      {
        kind: "short_answer",
        text: "Nenne die drei Anhaltspunkte im Text.",
        options: [],
        answer: 0,
        accept: [
          "Widerspruch zur Lage, Partikeln, übertriebene Wortwahl",
          "der Widerspruch zur Situation, die Partikeln und die Übertreibung",
          "Lage, Partikeln, Übertreibung",
        ],
        explain: "Üçü de metinde duruyor, seste değil.",
      },
      {
        kind: "short_answer",
        text: "Wie bewertet der Text die Frage „War das ironisch gemeint?“",
        options: [],
        answer: 0,
        accept: [
          "als normale Frage, keine Kapitulation",
          "sie ist erlaubt und normal",
          "eine normale Frage",
        ],
        explain: "Sormak zayıflık değil.",
      },
    ],
  },
  {
    id: "c1-u21-r2",
    level: "C1",
    skill: "reading",
    unit: 21,
    title: "Witz oder Spitze?",
    genre: "Deneme",
    intro: "Şakanın hükmü kimde? Almanca deyimin kendisi cevap veriyor.",
    gloss: [
      { de: "ankommen", tr: "karşı tarafa varmak, tutmak", en: "to land, to go down" },
      { de: "die Zielscheibe", tr: "hedef tahtası", en: "target" },
      { de: "bloßstellen", tr: "mahcup etmek", en: "to expose, to humiliate" },
      { de: "zurücknehmen", tr: "geri almak", en: "to retract" },
      { de: "verletzend", tr: "kırıcı", en: "hurtful" },
      { de: "die Provokation", tr: "kışkırtma", en: "provocation" },
      { de: "der Scherz", tr: "şaka", en: "joke" },
    ],
    minutes: 7,
    text:
      "„DAS IST NICHT GUT ANGEKOMMEN“\n\n" +
      "Der deutsche Satz für einen misslungenen Scherz sagt schon alles. Subjekt ist der Witz, das Verb beschreibt eine Ankunft, und der Ort der Entscheidung ist der Empfänger. Nicht: „Ich habe es falsch gesagt.“ Sondern: Es ist dort nicht angekommen.\n\n" +
      "Das ist unbequem, weil es die übliche Verteidigung entwertet. „So war das nicht gemeint“ beschreibt die Absicht und ändert nichts an der Wirkung. Beides kann gleichzeitig wahr sein: Der Sprecher wollte niemanden verletzen, und der Scherz war verletzend.\n\n" +
      "Ein brauchbarer Maßstab ist die Zielscheibe. Wen trifft der Witz — und kann diese Person zurückschießen? Ein Scherz über den Chef, gemacht von einem Praktikanten, ist Mut. Derselbe Scherz über den Praktikanten, gemacht vom Chef, ist etwas anderes, auch wenn der Wortlaut identisch bleibt. Humor bewegt sich nach oben leicht und nach unten nie.\n\n" +
      "Der zweite Maßstab ist die Wiederholung. Eine einmalige Spitze ist eine Spitze. Dieselbe Spitze über Monate hinweg, immer gegen dieselbe Person, ist keine Reihe von Scherzen mehr.\n\n" +
      "Bleibt die Frage, was man tut, wenn es schiefgegangen ist. Die schwächste Reaktion ist „Man wird ja wohl noch Spaß verstehen dürfen“ — sie verlangt vom Getroffenen, auch noch die Verantwortung zu tragen. Die stärkste ist kurz: „Das war unpassend, ich nehme es zurück.“ Ohne Erklärung, warum es eigentlich lustig war. Diese Erklärung interessiert an dieser Stelle niemanden, und sie macht es regelmäßig schlimmer.",
    questions: [
      {
        text: "Was verrät die Formulierung „Das ist nicht gut angekommen“?",
        options: [
          "Dass der Sprecher sich falsch ausgedrückt hat",
          "Dass der Ort der Entscheidung der Empfänger ist",
          "Dass der Witz zu spät kam",
        ],
        answer: 1,
        explain: "Fiil varış bildiriyor; hüküm karşı tarafta.",
      },
      {
        kind: "gapfill",
        text: "Das war unpassend, ich ___ es zurück.",
        options: [],
        answer: 0,
        accept: ["nehme"],
        explain: "zurücknehmen: ayrılabilen ön ek sona gidiyor.",
      },
      {
        text: "Was ist der Maßstab „Zielscheibe“?",
        options: [
          "Wie viele Leute lachen",
          "Wen der Witz trifft und ob diese Person zurückschießen kann",
          "Ob der Witz neu ist",
        ],
        answer: 1,
        explain: "„Humor bewegt sich nach oben leicht und nach unten nie.“",
      },
      {
        kind: "short_answer",
        text: "Warum ist „So war das nicht gemeint“ laut Text keine ausreichende Antwort?",
        options: [],
        answer: 0,
        accept: [
          "es beschreibt die Absicht und ändert nichts an der Wirkung",
          "Absicht ändert die Wirkung nicht",
          "beides kann gleichzeitig wahr sein",
        ],
        explain: "Niyet ile etki birbirini iptal etmiyor.",
      },
      {
        text: "Der Text empfiehlt, nach einer Entschuldigung zu erklären, warum der Witz lustig war.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tersi: bu açıklama kimseyi ilgilendirmiyor ve durumu kötüleştiriyor.",
      },
    ],
  },
  {
    id: "c1-u21-l1",
    level: "C1",
    skill: "listening",
    unit: 21,
    title: "Der doppelte Boden",
    genre: "Diyalog",
    intro: "Kelime oyunu çeviride ölüyor. Bu kimin eksiği?",
    gloss: [
      { de: "das Wortspiel", tr: "kelime oyunu", en: "wordplay" },
      { de: "der doppelte Boden", tr: "çift dip, ikinci anlam", en: "double meaning" },
      { de: "der Kalauer", tr: "ucuz kelime şakası", en: "pun, groaner" },
      { de: "gelingen", tr: "başarılı olmak", en: "to succeed" },
      { de: "interpretieren", tr: "yorumlamak", en: "to interpret" },
      { de: "der Reim", tr: "kafiye", en: "rhyme" },
      { de: "das Tabu", tr: "tabu", en: "taboo" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "Alle haben gelacht und ich habe nur „Bank“ verstanden." },
      { speaker: "Tobias", text: "Genau da liegt der Witz. „Bank“ ist Geldinstitut und Sitzgelegenheit." },
      { speaker: "Ela", text: "Und das reicht für einen Lacher?" },
      { speaker: "Tobias", text: "Für einen kleinen. Das war ein Kalauer, kein guter Witz. Bei einem Kalauer stöhnt man mehr, als man lacht." },
      { speaker: "Ela", text: "Warum macht ihr sie dann?" },
      { speaker: "Tobias", text: "Weil das Stöhnen dazugehört. Es ist ein Signal: Wir sind entspannt genug für schlechte Witze." },
      { speaker: "Ela", text: "Ich merke, dass ich Wortspiele nie mitbekomme." },
      { speaker: "Tobias", text: "Die kommen zuletzt. Erst versteht man die Wörter, dann die Sätze, dann den Ton — und ganz am Ende den doppelten Boden." },
      { speaker: "Ela", text: "Das klingt tröstlich und trotzdem ärgerlich." },
      { speaker: "Tobias", text: "Es ist keine Frage der Intelligenz. Mir geht es auf Türkisch genauso — du hast mir mal einen erklärt, und ich habe verstanden, warum er funktioniert, ohne dass er lustig wurde." },
      { speaker: "Ela", text: "Der geht in der Übersetzung verloren." },
      { speaker: "Tobias", text: "Und das ist der Unterschied zu allem anderen. Eine Nachricht kann man übersetzen. Ein Wortspiel muss man neu erfinden." },
    ],
    questions: [
      {
        text: "Was ist ein Kalauer laut Tobias?",
        options: [
          "Ein besonders guter Witz",
          "Ein schwacher Wortwitz, bei dem man mehr stöhnt als lacht",
          "Ein Witz mit Reim",
        ],
        answer: 1,
        explain: "İnleme de şakanın parçası — rahatlık işareti.",
      },
      {
        kind: "gapfill",
        text: "Das Wortspiel geht in der Übersetzung ___.",
        options: [],
        answer: 0,
        accept: ["verloren"],
        explain: "verloren gehen: kalıp fiil, ayrı yazılır.",
      },
      {
        text: "In welcher Reihenfolge kommt das Verstehen laut Tobias?",
        options: [
          "Wörter, Sätze, Ton, doppelter Boden",
          "Ton, Wörter, Witze",
          "Doppelter Boden zuerst",
        ],
        answer: 0,
        explain: "Kelime oyunu en sona kalıyor — zekâ meselesi değil.",
      },
      {
        kind: "dictation",
        text: "Tobias'ın çeviri ile kelime oyunu arasındaki farkı söylediği son cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Eine Nachricht kann man übersetzen. Ein Wortspiel muss man neu erfinden.",
          "Ein Wortspiel muss man neu erfinden",
        ],
        explain: "Çeviri değil, yeniden yaratma işi.",
      },
    ],
  },
  {
    id: "c1-u21-l2",
    level: "C1",
    skill: "listening",
    unit: 21,
    title: "Nord gegen Süd",
    genre: "Sohbet",
    intro: "Bölge klişeleri göz kırpmayla söyleniyor — göz kırpma düşerse?",
    gloss: [
      { de: "das Klischee", tr: "klişe", en: "cliché" },
      { de: "das Augenzwinkern", tr: "göz kırpma", en: "wink" },
      { de: "zugeknöpft", tr: "ketum, kapalı", en: "reserved" },
      { de: "der Landstrich", tr: "yöre", en: "region" },
      { de: "pauschal", tr: "toptan", en: "sweeping" },
      { de: "die Sitte", tr: "âdet", en: "custom" },
      { de: "der Kult", tr: "kült, tapınma", en: "cult" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Mareike", text: "Du bist aus Hamburg? Dann sagst du also drei Sätze am Tag." },
      { speaker: "Halil", text: "Zwei. Der dritte war der hier." },
      { speaker: "Mareike", text: "Sehr gut. Ich bin aus Bayern, ich rede also ununterbrochen und trinke Bier zum Frühstück." },
      { speaker: "Halil", text: "Ich hätte gesagt: Weißwurst." },
      { speaker: "Mareike", text: "Vor zwölf Uhr, sonst ist es ein Verbrechen. Das ist übrigens kein Klischee, das ist ein Kult." },
      { speaker: "Halil", text: "Bei uns im Norden gibt es das auch. Nur ohne Kult, mit Fischbrötchen und ohne Erklärung." },
      { speaker: "Mareike", text: "Das ist der eigentliche Unterschied. Nicht was ihr esst, sondern dass ihr nichts dazu sagt." },
      { speaker: "Halil", text: "Wobei — bei den Sprüchen über Norddeutsche fällt mir auf, dass sie immer wir selbst machen." },
      { speaker: "Mareike", text: "Stimmt. Über die eigene Region darf man alles sagen." },
      { speaker: "Halil", text: "Und über eine andere nur mit Augenzwinkern. Fehlt das Zwinkern, ist es keine Übertreibung mehr, sondern eine Behauptung." },
      { speaker: "Mareike", text: "Genau deshalb funktioniert es zwischen uns und nicht überall." },
      { speaker: "Halil", text: "Man sagt das eben, aber man meint eine Landkarte, keine Menschen." },
    ],
    questions: [
      {
        text: "Was ist laut Mareike der eigentliche Unterschied zwischen Nord und Süd?",
        options: [
          "Das Essen",
          "Dass im Norden nichts dazu gesagt wird",
          "Die Uhrzeit",
        ],
        answer: 1,
        explain: "Fark yiyecekte değil, ona dair konuşmada.",
      },
      {
        kind: "gapfill",
        text: "Über eine andere Region redet man nur mit ___.",
        options: [],
        answer: 0,
        accept: ["Augenzwinkern"],
        explain: "mit einem Augenzwinkern: abartının işareti.",
      },
      {
        text: "Was passiert laut Halil, wenn das Augenzwinkern fehlt?",
        options: [
          "Der Witz wird schärfer",
          "Es ist keine Übertreibung mehr, sondern eine Behauptung",
          "Niemand versteht ihn",
        ],
        answer: 1,
        explain: "İşaret düşünce şaka iddiaya dönüşüyor.",
      },
      {
        kind: "short_answer",
        text: "Was fällt Halil an den Sprüchen über Norddeutsche auf?",
        options: [],
        answer: 0,
        accept: [
          "dass sie immer sie selbst machen",
          "sie machen sie über sich selbst",
          "die Norddeutschen machen sie selbst",
        ],
        explain: "Kendi yöresi hakkında herkes her şeyi söyleyebiliyor.",
      },
    ],
  },
  {
    id: "c1-u21-w1",
    level: "C1",
    skill: "writing",
    unit: 21,
    title: "İroninin ve şakanın dili",
    genre: "Dil bilgisi",
    intro: "Şakanın varışı, geri alma ve göz kırpma kalıbı.",
    gloss: [
      { de: "ankommen", tr: "karşı tarafa varmak", en: "to land" },
      { de: "zurücknehmen", tr: "geri almak", en: "to retract" },
      { de: "das Augenzwinkern", tr: "göz kırpma", en: "wink" },
      { de: "der doppelte Boden", tr: "ikinci anlam", en: "double meaning" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu iyi karşılanmadı.",
        answer: "Das ist nicht gut angekommen",
        hint: "ankommen ayrılabilen fiil, Perfekt sein ile kurulur.",
      },
      {
        kind: "build",
        tr: "Bu uygunsuzdu, geri alıyorum.",
        answer: "Das war unpassend, ich nehme es zurück",
        hint: "zurücknehmen: ön ek cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Bunu bir göz kırpmayla söyledi.",
        answer: "Er hat das mit einem Augenzwinkern gesagt",
        hint: "mit einem Augenzwinkern: sabit öbek, artikelli.",
      },
      {
        kind: "rewrite",
        prompt: "Cevabı düzelt: özür sorumluluğu karşı tarafa yüklüyor.",
        source: "Tut mir leid, wenn du das falsch verstanden hast — so war das nicht gemeint, man wird ja wohl noch Spaß verstehen dürfen.",
        answer: "Das war unpassend, ich nehme es zurück.",
        alternatives: [
          "Das war unpassend, ich nehme es zurück",
          "Das war unpassend. Ich nehme es zurück und werde es nicht wiederholen.",
        ],
        why: "„wenn du das falsch verstanden hast“ hatayı alıcıya yazıyor, „so war das nicht gemeint“ niyeti anlatıyor ama etkiyi değiştirmiyor, son yarısı ise kırılan kişiden bir de sorumluluk istiyor. Almanca deyimin kendisi hükmü alıcıya veriyor: angekommen. Kısa, gerekçesiz geri alış tek işleyen biçim.",
      },
    ],
  },
  {
    id: "c1-u21-w2",
    level: "C1",
    skill: "writing",
    unit: 21,
    title: "Şaka tutmadığında",
    genre: "İş yazışması",
    intro: "Toplantıda yaptığın espri kimseyi güldürmedi. Şimdi ne yazacaksın?",
    gloss: [
      { de: "die Zielscheibe", tr: "hedef tahtası", en: "target" },
      { de: "bloßstellen", tr: "mahcup etmek", en: "to embarrass" },
      { de: "zurücknehmen", tr: "geri almak", en: "to retract" },
      { de: "verletzend", tr: "kırıcı", en: "hurtful" },
      { de: "pauschal", tr: "toptan", en: "sweeping" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Espriyi yapan sensin. Etkilenen kişiye kısa bir mesaj yaz. Kurallar: (1) niyetini savunma — „so war das nicht gemeint“ yasak; (2) neden komik olduğunu açıklama; (3) neyin yanlış olduğunu somut adlandır (hedef ve tanıklık); (4) tek bir sonraki adım öner. Yalvarma da yapma — kısa ve net kal. Kendini gereğinden fazla alçaltmak da karşı tarafa iş çıkarır.",
        stimulus:
          "DURUM\n\n" +
          "Ekip toplantısı, on bir kişi. Meslektaşın Yusuf üç aydır ilk kez sunum yaptı ve sunum sırasında iki kez duraksadı.\n\n" +
          "Sen sunumdan sonra şunu söyledin: „Sehr souverän — vor allem die Pausen. Da hatten wir alle Zeit zum Nachdenken.“\n\n" +
          "İki kişi güldü. Yusuf gülmedi ve toplantının kalanında konuşmadı. Bir meslektaşın sana sonradan yazdı: „Das war unnötig.“\n\n" +
          "Yusuf akşam yazdı: „Ich möchte nicht darüber reden.“",
        checklist: [
          "Niyet savunması yok mu?",
          "Neyin yanlış olduğu somut mu (hedef seçimi + on bir kişinin önünde)?",
          "Yusuf'un „konuşmak istemiyorum“ isteğine saygı gösterildi mi?",
          "Tek bir somut sonraki adım var mı, aşırı yalvarma yok mu?",
        ],
        minWords: 70,
        phrases: [
          { de: "Das war unpassend, und ich nehme es zurück.", tr: "uygunsuzdu, geri alıyorum", en: "that was inappropriate, and I retract it" },
          { de: "vor elf Leuten", tr: "on bir kişinin önünde", en: "in front of eleven people" },
          { de: "Du musst darauf nicht antworten.", tr: "buna cevap vermek zorunda değilsin", en: "you don't have to reply to this" },
        ],
        sample:
          "Hallo Yusuf,\n\n" +
          "mein Kommentar zu deinen Pausen war unpassend, und ich nehme ihn zurück.\n\n" +
          "Es waren zwei Dinge falsch daran. Du hast zum ersten Mal seit Monaten präsentiert, und ich habe ausgerechnet die Stelle herausgegriffen, die dir schwerfiel. Und ich habe es vor elf Leuten getan, nicht unter vier Augen — das war der eigentliche Fehler.\n\n" +
          "Du musst darauf nicht antworten, und wir müssen auch nicht darüber reden; ich habe deine Nachricht verstanden.\n\n" +
          "Was ich anbiete: In der Runde am Donnerstag sage ich vor denselben Leuten, dass der Kommentar von mir unangebracht war. Wenn dir das unangenehm ist, lasse ich es — sag einfach kurz Bescheid.\n\n" +
          "Viele Grüße\nTim",
      },
    ],
  },
];
