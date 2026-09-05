import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 16 — "Cümlenin içine sığdırılan bilgi".
 *
 * Dört ders: Ein Roman, über den man spricht · Der Dirigent, dessen Orchester… ·
 * Nach der Premiere · Die Führung leiten. Kültür alanı ilgi cümlesinin en yoğun
 * kullanıldığı yer: bir eseri anlatmak, hakkında ne söylendiğini ve kime ait
 * olduğunu aynı cümleye sığdırmak demek.
 *
 *   Ünite 16: verfassen, der Kritiker, die Auszeichnung, die Preisverleihung,
 *             die Jury, faszinieren, künstlerisch, ausverkauft ·
 *             der Komponist, der Dirigent, der Darsteller, die Besetzung,
 *             das Theaterstück, die Tournee, der Spielplan, der Untertitel ·
 *             die Inszenierung, die Premiere, die Aufführung, die Kulisse,
 *             der Vorhang, der Beifall, proben, applaudieren · das Gemälde,
 *             die Skulptur, das Exponat, das Kunstwerk, die Leinwand,
 *             die Restaurierung, gestalten, konservieren
 *   Kalıplar: ein Buch, über das … · …, dessen … · …, deren … ·
 *             die gefeierte Inszenierung · wurde … gemalt / erbaut ·
 *             stammt aus …
 *
 * İlgi zamiri edatla birlikte gelince Türkçe konuşan için iki şey aynı anda
 * değişir: edat öne çıkar ve zamirin hâli edata bağlanır. dessen/deren ise
 * sahibin değil, SAHİP OLUNANIN cinsine göre seçilmez — bu ünitenin en sık
 * hata alınan noktası.
 */
export const b2U16: SkillExercise[] = [
  {
    id: "b2-u16-r1",
    level: "B2",
    skill: "reading",
    unit: 16,
    title: "Die Führung durch Saal 3",
    genre: "Müze rehber metni",
    intro: "Bir müze rehberinin salon metni. Neyin ne zaman yapıldığına dikkat et.",
    gloss: [
      { de: "das Gemälde", tr: "tablo", en: "painting" },
      { de: "die Skulptur", tr: "heykel", en: "sculpture" },
      { de: "das Exponat", tr: "sergi eseri", en: "exhibit" },
      { de: "das Kunstwerk", tr: "sanat eseri", en: "artwork" },
      { de: "die Leinwand", tr: "tuval", en: "canvas" },
      { de: "die Restaurierung", tr: "restorasyon", en: "restoration" },
      { de: "gestalten", tr: "tasarlamak", en: "to design" },
      { de: "konservieren", tr: "muhafaza etmek", en: "to conserve" },
    ],
    minutes: 6,
    text:
      "SAAL 3 — WAS SIE HIER SEHEN\n\n" +
      "Dieser Saal wurde 1904 als Lesesaal gebaut und erst nach dem Krieg zum Ausstellungsraum umgestaltet. Die hohen Fenster stammen noch aus der ersten Bauphase; das Oberlicht wurde 1957 eingesetzt, weil die Gemälde an der Nordwand zu dunkel hingen.\n\n" +
      "Das große Bild links wurde um 1620 gemalt, der Maler ist unbekannt. Lange galt es als Werkstattarbeit. Bei der letzten Restaurierung wurde unter der oberen Farbschicht eine zweite Figur gefunden — vermutlich hat der Maler sie selbst übermalt. Die Leinwand ist an drei Stellen ergänzt worden, was man von Nahem gut sieht.\n\n" +
      "Die Skulptur in der Mitte ist das älteste Exponat des Hauses. Sie wurde 1911 aus einer Privatsammlung erworben und stand bis 1980 im Treppenhaus, wo sie durch Zugluft gelitten hat. Heute wird sie bei konstanter Feuchte konserviert, deshalb die Vitrine.\n\n" +
      "Rechts hängen vier kleine Arbeiten, die erst seit letztem Jahr gezeigt werden. Es sind Vorstudien; die dazugehörigen Hauptwerke hängen in Kassel. Wir zeigen sie bewusst zusammen, weil man an ihnen sehen kann, wie ein Kunstwerk entsteht — mit Umwegen.\n\n" +
      "Ein Hinweis zum Blitzlicht: Es ist nicht wegen der Rechte verboten, sondern wegen der Farben. Und eine Bitte: Fragen Sie ruhig. Ein Saal, in dem nicht gefragt wird, ist ein Lagerraum.",
    questions: [
      {
        kind: "gapfill",
        text: "Das große Bild links ___ um 1620 gemalt.",
        options: [],
        answer: 0,
        accept: ["wurde"],
        explain: "Edilgen Präteritum: sanat ve tarih metinlerinin standart zamanı.",
      },
      {
        text: "Was wurde bei der letzten Restaurierung gefunden?",
        options: [
          "eine Unterschrift des Malers",
          "eine zweite Figur unter der Farbschicht",
          "ein zweites Gemälde auf der Rückseite",
        ],
        answer: 1,
        explain: "„Bei der letzten Restaurierung wurde unter der oberen Farbschicht eine zweite Figur gefunden.“",
      },
      {
        kind: "short_answer",
        text: "Warum steht die Skulptur heute in einer Vitrine?",
        options: [],
        answer: 0,
        accept: ["wegen der Feuchte", "sie wird konserviert", "wegen konstanter Feuchte"],
        explain: "„Heute wird sie bei konstanter Feuchte konserviert, deshalb die Vitrine.“",
      },
      {
        text: "Warum ist Blitzlicht verboten?",
        options: ["wegen der Rechte", "wegen der Farben", "wegen der Besucher"],
        answer: 1,
        explain: "„Es ist nicht wegen der Rechte verboten, sondern wegen der Farben.“",
      },
      {
        text: "Der Saal war von Anfang an ein Ausstellungsraum.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Dieser Saal wurde 1904 als Lesesaal gebaut.“",
      },
    ],
  },

  {
    id: "b2-u16-r2",
    level: "B2",
    skill: "reading",
    unit: 16,
    title: "Ein Roman, über den man spricht",
    genre: "Kitap eleştirisi",
    intro: "Ödül almış bir romanın eleştirisi. İlgi cümlelerinin taşıdığı bilgiye dikkat et.",
    gloss: [
      { de: "verfassen", tr: "kaleme almak", en: "to write" },
      { de: "der Kritiker", tr: "eleştirmen", en: "critic" },
      { de: "die Auszeichnung", tr: "ödül", en: "award" },
      { de: "die Preisverleihung", tr: "ödül töreni", en: "award ceremony" },
      { de: "die Jury", tr: "jüri", en: "jury" },
      { de: "faszinieren", tr: "büyülemek", en: "to fascinate" },
      { de: "künstlerisch", tr: "sanatsal", en: "artistic" },
      { de: "ausverkauft", tr: "biletleri tükenmiş", en: "sold out" },
    ],
    minutes: 6,
    text:
      "EIN ROMAN, ÜBER DEN MAN SPRICHT\n\n" +
      "Es gibt Bücher, über die geredet wird, und Bücher, die gelesen werden. „Der Nachtzug nach Halle“ ist beides, und das ist selten.\n\n" +
      "Verfasst hat ihn eine Autorin, von der bis vor zwei Jahren niemand gehört hatte. Sie hat zwölf Jahre als Zugbegleiterin gearbeitet, und man merkt es auf jeder Seite: Die Menschen, mit denen ihre Erzählerin spricht, reden wie Menschen reden — abgebrochen, wiederholend, mit Sätzen, die nirgends hinführen.\n\n" +
      "Die Handlung dreht sich um eine Nacht. Eine Zugbegleiterin, deren Schicht eigentlich um Mitternacht endet, bleibt wegen eines Streckenschadens bis zum Morgen mit fünf Fahrgästen im stehenden Zug. Mehr passiert nicht. Und trotzdem hat mich kein Buch dieses Jahres so fasziniert.\n\n" +
      "Die Auszeichnung kam für viele überraschend. Die Jury, die den Preis vergeben hat, nannte das Buch in ihrer Begründung „künstlerisch bescheiden und literarisch genau“ — eine Formulierung, über die sich mehrere Kritiker geärgert haben. Zu Unrecht, finde ich: Genau das ist es.\n\n" +
      "Bei der Preisverleihung sagte die Autorin einen Satz, der besser ist als jede Rezension: Sie habe nichts erfunden, sie habe nur zugehört und die langweiligen Stellen weggelassen.\n\n" +
      "Die Lesung nächste Woche im Literaturhaus ist übrigens seit gestern ausverkauft. Wer sie verpasst: Das Buch reicht.",
    questions: [
      {
        kind: "gapfill",
        text: "Es gibt Bücher, ___ die geredet wird, und Bücher, die gelesen werden.",
        options: [],
        answer: 0,
        accept: ["über"],
        explain: "İlgi cümlesi edatla kurulunca edat en öne geçer: über die.",
      },
      {
        text: "Was hat die Autorin vorher gemacht?",
        options: [
          "Sie war Kritikerin.",
          "Sie hat zwölf Jahre als Zugbegleiterin gearbeitet.",
          "Sie hat in einem Literaturhaus gearbeitet.",
        ],
        answer: 1,
        explain: "„Sie hat zwölf Jahre als Zugbegleiterin gearbeitet, und man merkt es auf jeder Seite.“",
      },
      {
        kind: "short_answer",
        text: "Worum dreht sich die Handlung?",
        options: [],
        answer: 0,
        accept: ["um eine Nacht", "eine Nacht im Zug", "eine Nacht"],
        explain: "„Die Handlung dreht sich um eine Nacht.“",
      },
      {
        text: "Was sagte die Autorin bei der Preisverleihung?",
        options: [
          "Sie habe alles erfunden.",
          "Sie habe zugehört und die langweiligen Stellen weggelassen.",
          "Sie schreibe nie wieder ein Buch.",
        ],
        answer: 1,
        explain: "„Sie habe nichts erfunden, sie habe nur zugehört und die langweiligen Stellen weggelassen.“",
      },
      {
        text: "Die Lesung im Literaturhaus hat noch freie Plätze.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Lesung nächste Woche im Literaturhaus ist übrigens seit gestern ausverkauft.“",
      },
    ],
  },

  {
    id: "b2-u16-l1",
    level: "B2",
    skill: "listening",
    unit: 16,
    title: "Der Dirigent, dessen Orchester",
    genre: "Diyalog",
    intro: "İki kişi bir konser programını konuşuyor. Kimin neyi olduğuna dikkat et.",
    gloss: [
      { de: "der Komponist", tr: "besteci", en: "composer" },
      { de: "der Dirigent", tr: "orkestra şefi", en: "conductor" },
      { de: "der Darsteller", tr: "oyuncu", en: "performer" },
      { de: "die Besetzung", tr: "oyuncu kadrosu", en: "cast" },
      { de: "das Theaterstück", tr: "tiyatro oyunu", en: "play" },
      { de: "die Tournee", tr: "turne", en: "tour" },
      { de: "der Spielplan", tr: "oyun programı", en: "programme" },
      { de: "der Untertitel", tr: "altyazı", en: "subtitle" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nora", text: "Schau mal in den Spielplan. Im Mai kommt der Dirigent, dessen Orchester wir letztes Jahr gehört haben." },
      { speaker: "Vitali", text: "Der aus Leipzig? Mit dem langen Programmheft?" },
      { speaker: "Nora", text: "Genau der. Diesmal mit einem Komponisten, dessen Name mir nichts sagt." },
      { speaker: "Vitali", text: "Und die Sängerin, deren Aufnahme du immer hörst? Ist die dabei?" },
      { speaker: "Nora", text: "Nein, die ist auf Tournee. Sie kommt erst im Herbst zurück." },
      { speaker: "Vitali", text: "Schade. Was steht sonst drin?" },
      { speaker: "Nora", text: "Ein Theaterstück, dessen Besetzung komplett neu ist. Nur die Regie ist dieselbe." },
      { speaker: "Vitali", text: "Neue Darsteller sind gut. Die alten haben zuletzt nur noch Routine gespielt." },
      { speaker: "Nora", text: "Und ein Gastspiel auf Polnisch, mit deutschen Untertiteln über der Bühne." },
      { speaker: "Vitali", text: "Funktioniert das? Ich lese dann nur und sehe nichts." },
      { speaker: "Nora", text: "Nach zehn Minuten geht es. Man gewöhnt sich schneller daran, als man denkt." },
      { speaker: "Vitali", text: "Gut, dann nehmen wir das und den Dirigenten im Mai." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Nora'nın mayısta gelecek şefi anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Im Mai kommt der Dirigent, dessen Orchester wir letztes Jahr gehört haben."],
        explain: "dessen eril ve nötr sahipler için; hâli sahip olunan öbeğe göre değil, sahibe göre seçilir.",
      },
      {
        text: "Warum kommt die Sängerin nicht?",
        options: ["sie ist krank", "sie ist auf Tournee", "sie singt kein Deutsch"],
        answer: 1,
        explain: "„Nein, die ist auf Tournee. Sie kommt erst im Herbst zurück.“",
      },
      {
        kind: "short_answer",
        text: "Was ist am Theaterstück neu?",
        options: [],
        answer: 0,
        accept: ["die Besetzung", "die Darsteller", "die ganze Besetzung"],
        explain: "„Ein Theaterstück, dessen Besetzung komplett neu ist. Nur die Regie ist dieselbe.“",
      },
      {
        text: "Wie wird das polnische Gastspiel verständlich gemacht?",
        options: [
          "durch deutsche Untertitel über der Bühne",
          "durch einen Dolmetscher im Saal",
          "durch ein Programmheft",
        ],
        answer: 0,
        explain: "„…ein Gastspiel auf Polnisch, mit deutschen Untertiteln über der Bühne.“",
      },
      {
        text: "Nora kennt den Komponisten gut.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…mit einem Komponisten, dessen Name mir nichts sagt.“",
      },
    ],
  },

  {
    id: "b2-u16-l2",
    level: "B2",
    skill: "listening",
    unit: 16,
    title: "Nach der Premiere",
    genre: "Diyalog",
    intro: "Prömiyer sonrası fuayede iki seyirci konuşuyor.",
    gloss: [
      { de: "die Inszenierung", tr: "sahneleme", en: "staging" },
      { de: "die Premiere", tr: "prömiyer", en: "premiere" },
      { de: "die Aufführung", tr: "temsil", en: "performance" },
      { de: "die Kulisse", tr: "dekor", en: "set" },
      { de: "der Vorhang", tr: "perde", en: "curtain" },
      { de: "der Beifall", tr: "alkış", en: "applause" },
      { de: "proben", tr: "prova yapmak", en: "to rehearse" },
      { de: "applaudieren", tr: "alkışlamak", en: "to applaud" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Dilek", text: "Und? Die gefeierte Inszenierung — hat sie dich überzeugt?" },
      { speaker: "Falk", text: "Die zweite Hälfte ja. Die erste war mir zu langsam." },
      { speaker: "Dilek", text: "Mir auch. Aber nach der Pause hat es plötzlich funktioniert." },
      { speaker: "Falk", text: "Was mich gestört hat, war die Kulisse. Diese Wand hat alles verstellt." },
      { speaker: "Dilek", text: "Ich fand sie gut. Der Raum sollte ja eng wirken." },
      { speaker: "Falk", text: "Kann sein. Der Beifall war jedenfalls ehrlich, das hört man." },
      { speaker: "Dilek", text: "Vier Vorhänge. Bei einer Premiere ist das viel." },
      { speaker: "Falk", text: "Man hat gemerkt, dass sie lange geprobt haben. Kein Text saß daneben." },
      { speaker: "Dilek", text: "Nur der junge Darsteller war unsicher am Anfang." },
      { speaker: "Falk", text: "Bei der dritten Aufführung ist das weg. Das war nur Premierennervosität." },
      { speaker: "Dilek", text: "Am Ende haben sogar die Leute im Rang applaudiert, die sonst früh gehen." },
      { speaker: "Falk", text: "Gutes Zeichen. Gehen wir noch etwas trinken?" },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Dilek'in sahnelemeyi sorduğu ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Die gefeierte Inszenierung — hat sie dich überzeugt?"],
        explain: "gefeiert ortaç II sıfatı: 'övülen sahneleme'. Sıfat artikel ile ad arasında.",
      },
      {
        text: "Welche Hälfte hat Falk überzeugt?",
        options: ["die erste", "die zweite", "keine"],
        answer: 1,
        explain: "„Die zweite Hälfte ja. Die erste war mir zu langsam.“",
      },
      {
        kind: "short_answer",
        text: "Wie viele Vorhänge gab es?",
        options: [],
        answer: 0,
        accept: ["vier", "vier Vorhänge", "4"],
        explain: "„Vier Vorhänge. Bei einer Premiere ist das viel.“",
      },
      {
        text: "Was hat Falk an der Kulisse gestört?",
        options: [
          "Die Wand hat alles verstellt.",
          "Sie war zu bunt.",
          "Sie hat gewackelt.",
        ],
        answer: 0,
        explain: "„Was mich gestört hat, war die Kulisse. Diese Wand hat alles verstellt.“",
      },
      {
        text: "Der junge Darsteller war laut Falk dauerhaft schlecht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Bei der dritten Aufführung ist das weg. Das war nur Premierennervosität.“",
      },
    ],
  },

  {
    id: "b2-u16-w1",
    level: "B2",
    skill: "writing",
    unit: 16,
    title: "Kimin, ne hakkında",
    genre: "Cümle kurma",
    intro: "Edatlı ilgi cümlesinde edat öne geçer; dessen ve deren sahibe göre seçilir.",
    gloss: [
      { de: "verfassen", tr: "kaleme almak", en: "to write" },
      { de: "der Dirigent", tr: "orkestra şefi", en: "conductor" },
      { de: "die Besetzung", tr: "oyuncu kadrosu", en: "cast" },
      { de: "gestalten", tr: "tasarlamak", en: "to design" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Hakkında konuşulan kitaplar var.",
        answer: "Es gibt Bücher, über die geredet wird",
        hint: "Edat ilgi zamirinin önünde durur ve hâli o belirler.",
      },
      {
        kind: "build",
        tr: "Orkestrasını geçen yıl dinlediğimiz şef mayısta geliyor.",
        answer: "Im Mai kommt der Dirigent, dessen Orchester wir gehört haben",
        hint: "dessen eril sahip için; ardından gelen ad artikelsiz kalır.",
      },
      {
        kind: "build",
        tr: "Kadrosu tamamen yeni olan bir oyun.",
        answer: "Ein Theaterstück, dessen Besetzung komplett neu ist",
        hint: "Sahip nötr (das Theaterstück) olduğu için yine dessen.",
      },
      {
        kind: "build",
        tr: "Salon savaştan sonra sergi alanına dönüştürüldü.",
        answer: "Der Saal wurde nach dem Krieg zum Ausstellungsraum umgestaltet",
        hint: "Edilgen Präteritum: müze ve tarih metinlerinin zamanı.",
      },
      {
        kind: "rewrite",
        prompt: "İki cümleyi deren ile birleştir.",
        source: "Die Autorin hat den Roman verfasst. Ihre Schicht endet um Mitternacht.",
        answer: "Die Autorin, deren Schicht um Mitternacht endet, hat den Roman verfasst.",
        alternatives: ["Die Autorin, deren Schicht um Mitternacht endet, hat den Roman verfasst"],
        why: "dessen ve deren SAHİBİN cinsine göre seçilir, sahip olunanın cinsine göre değil: die Autorin dişil olduğu için deren gelir, arkasındaki Schicht dişil olsa da olmasa da. Ayrıca ilgi cümlesindeki ad artikel almaz — 'deren die Schicht' olmaz.",
      },
    ],
  },

  {
    id: "b2-u16-w2",
    level: "B2",
    skill: "writing",
    unit: 16,
    title: "Ihre Kritik",
    genre: "Eleştiri yazısı",
    intro: "Gördüğün ya da okuduğun bir şeyi değerlendir — övgüyü de itirazı da gerekçelendir.",
    gloss: [
      { de: "die Aufführung", tr: "temsil", en: "performance" },
      { de: "der Kritiker", tr: "eleştirmen", en: "critic" },
      { de: "faszinieren", tr: "büyülemek", en: "to fascinate" },
      { de: "künstlerisch", tr: "sanatsal", en: "artistic" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir kitap, film, sergi ya da konser üzerine kısa bir eleştiri yaz. Şu sırayı tut: ne olduğu ve neyi anlattığı, en iyi yanı, zayıf yanı ve kime tavsiye ettiğin. Konuyu özetlerken sonu açık etme. En az iki ilgi cümlesi kullan; bunlardan biri edatlı -über den, mit dem, von der- ya da dessen/deren ile kurulsun. Beğenmediğin yeri de gerekçelendir; 'iyiydi' ya da 'kötüydü' tek başına eleştiri değil.",
        checklist: [
          "Eserin ne olduğu ve konusu açık mı?",
          "En az iki ilgi cümlesi var mı?",
          "Bunlardan biri edatlı ya da dessen/deren ile mi kurulmuş?",
          "Hem övgü hem itiraz gerekçelendirilmiş mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "ein Buch, über das viel geredet wird", tr: "hakkında çok konuşulan bir kitap", en: "a book much talked about" },
          { de: "die Autorin, deren Sätze kurz sind", tr: "cümleleri kısa olan yazar", en: "the author whose sentences are short" },
          { de: "Was mich gestört hat, war …", tr: "beni rahatsız eden şey …", en: "what bothered me was …" },
        ],
        sample:
          "EIN ABEND, DER LANGSAM ANFÄNGT\n\n" +
          "Gesehen habe ich die neue Inszenierung von „Der Besuch“ im Stadttheater — ein Stück, über das seit Wochen geredet wird, weil die Besetzung komplett ausgetauscht wurde.\n\n" +
          "Die Geschichte ist bekannt: Eine reiche Frau kehrt in ihren verarmten Heimatort zurück und macht ein Angebot, das niemand annehmen will und am Ende alle annehmen. Mehr verrate ich nicht.\n\n" +
          "Am stärksten ist die zweite Hälfte. Die Regisseurin, deren letzte Arbeit ich nicht mochte, nimmt hier das Tempo völlig heraus, und plötzlich hört man jedem Satz zu. Fasziniert hat mich vor allem der junge Darsteller in der Rolle des Lehrers, der fast nichts sagt und trotzdem die ganze Zeit anwesend ist.\n\n" +
          "Was mich gestört hat, war die erste halbe Stunde. Die Kulisse mit der großen Wand verstellt den Blick, und die Szenen am Bahnhof wirken bemüht. Künstlerisch mag das Absicht sein; im Zuschauerraum wurde trotzdem gehustet.\n\n" +
          "Empfehlen würde ich die Aufführung allen, die Geduld für den Anfang mitbringen. Wer nach zwanzig Minuten geht, verpasst das eigentliche Stück.",
      },
    ],
  },
];
