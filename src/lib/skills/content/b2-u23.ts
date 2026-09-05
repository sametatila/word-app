import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 23 — "Ne kadarı yeterli?".
 *
 * Dört ders: Gut ist gut genug · Raus aus der Geborgenheit ·
 * Sehr geehrte Damen und Herren · Die höfliche Anfrage. Ünitenin ortak sorusu
 * ölçü: mükemmeliyetçilikte kendine karşı, resmî yazışmada metne karşı. Fazla
 * nezaket muğlaklık üretir, az nezaket kabalık; ikisi de amacı kaçırır.
 *
 *   Ünite 23: der Leistungsdruck, das Selbstwertgefühl, das Schuldgefühl,
 *             die Bescheidenheit, die Empfindlichkeit, das Lampenfieber,
 *             sich aufopfern, abschneiden · das Wachstum, die Geborgenheit,
 *             die Selbstverwirklichung, der Wendepunkt, die Persönlichkeit,
 *             die Bindung, die Entfremdung, sich auseinandersetzen ·
 *             das Rundschreiben, der Posteingang, der Verteiler, die Ablage,
 *             die Aktennotiz, das Formblatt, archivieren, amtlich · zeitnah,
 *             der Klärungsbedarf, der Handlungsbedarf, der Auftraggeber,
 *             die Nutzungsbedingungen, die Versandkosten, anmahnen, terminieren
 *   Kalıplar: Ich tue so, als ob … müsste · Gut ist gut genug ·
 *             Sofern man bereit ist, … · Als Anlage erhalten Sie … ·
 *             Mit freundlichen Grüßen · Wir wären Ihnen … dankbar ·
 *             Könnten Sie uns … mitteilen?
 *
 * Resmî Almancada Konjunktiv II talebi yumuşatmaz, onu MÜZAKEREYE AÇIK kılar:
 * "könnten Sie" bir emri soruya çevirir. Türkçedeki "-ebilir misiniz" ile aynı
 * işlevdedir, o yüzden aktarımı kolay; zor olan, hangi cümlenin bu yumuşatmayı
 * hak ettiğini seçmek.
 */
export const b2U23: SkillExercise[] = [
  {
    id: "b2-u23-r1",
    level: "B2",
    skill: "reading",
    unit: 23,
    title: "Wie ein Schreiben durchs Haus geht",
    genre: "Kurum içi rehber",
    intro: "Bir kurumun yazışma rehberi. Resmî dilin adlaştırmalarına dikkat et.",
    gloss: [
      { de: "das Rundschreiben", tr: "genelge", en: "circular" },
      { de: "der Posteingang", tr: "gelen evrak", en: "incoming mail" },
      { de: "der Verteiler", tr: "dağıtım listesi", en: "distribution list" },
      { de: "die Ablage", tr: "dosyalama", en: "filing" },
      { de: "die Aktennotiz", tr: "dosya notu", en: "file note" },
      { de: "das Formblatt", tr: "standart form", en: "standard form" },
      { de: "archivieren", tr: "arşivlemek", en: "to archive" },
      { de: "amtlich", tr: "resmî", en: "official" },
    ],
    minutes: 6,
    text:
      "WIE EIN SCHREIBEN DURCHS HAUS GEHT — LEITFADEN FÜR NEUE KOLLEGINNEN UND KOLLEGEN\n\n" +
      "Eingang. Jede Sendung wird im Posteingang erfasst, unabhängig davon, ob sie amtlich ist oder nicht. Die Erfassung erfolgt am Tag des Eingangs; das Datum entscheidet später über Fristen und ist deshalb kein Formalismus.\n\n" +
      "Zuordnung. Danach wird das Schreiben einem Vorgang zugeordnet. Gibt es keinen, wird einer angelegt. Wichtig: Ein Schreiben ohne Vorgang verschwindet, auch wenn es auf Ihrem Schreibtisch sichtbar liegt.\n\n" +
      "Verteiler. Ein Rundschreiben geht an alle, ein Vorgang an die Zuständigen. Setzen Sie den Verteiler eng. Wer regelmäßig Post bekommt, die ihn nichts angeht, liest irgendwann auch die, die ihn etwas angeht, nicht mehr.\n\n" +
      "Bearbeitung. Wird telefonisch etwas Wesentliches besprochen, gehört eine Aktennotiz in den Vorgang — kurz, sachlich, mit Datum. Für wiederkehrende Fälle gibt es Formblätter; benutzen Sie sie, auch wenn ein eigener Text schöner wäre. Formblätter sind langweilig, aber vollständig.\n\n" +
      "Ablage und Aufbewahrung. Abgeschlossene Vorgänge werden archiviert, nicht gelöscht. Die Aufbewahrungsfristen hängen von der Art des Vorgangs ab und stehen im Intranet. Im Zweifel gilt: länger aufbewahren ist billiger als suchen.\n\n" +
      "Und der Ton? Freundlich, klar, kurz. „Als Anlage erhalten Sie …“ ist kein altmodisches Deutsch, sondern eine Information: Es gibt eine Anlage. Wer sie vergisst, schreibt zwei Briefe statt einem.",
    questions: [
      {
        text: "Wann erfolgt die Erfassung im Posteingang?",
        options: [
          "am Tag des Eingangs",
          "am Ende der Woche",
          "erst nach der Zuordnung",
        ],
        answer: 0,
        explain: "„Die Erfassung erfolgt am Tag des Eingangs; das Datum entscheidet später über Fristen.“",
      },
      {
        kind: "gapfill",
        text: "Die Zuordnung ___ zu einem Vorgang; gibt es keinen, wird einer angelegt.",
        options: [],
        answer: 0,
        accept: ["erfolgt"],
        explain: "Adlaştırma artı erfolgen: resmî usul dilinin standart kalıbı.",
      },
      {
        kind: "short_answer",
        text: "Warum soll der Verteiler eng gesetzt werden?",
        options: [],
        answer: 0,
        accept: ["sonst liest niemand mehr", "wegen zu viel Post", "damit Wichtiges gelesen wird"],
        explain: "„Wer regelmäßig Post bekommt, die ihn nichts angeht, liest irgendwann auch die … nicht mehr.“",
      },
      {
        text: "Was gehört nach einem wichtigen Telefonat in den Vorgang?",
        options: ["ein Rundschreiben", "eine Aktennotiz", "ein Formblatt"],
        answer: 1,
        explain: "„…gehört eine Aktennotiz in den Vorgang — kurz, sachlich, mit Datum.“",
      },
      {
        text: "Abgeschlossene Vorgänge werden gelöscht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Abgeschlossene Vorgänge werden archiviert, nicht gelöscht.“",
      },
    ],
  },

  {
    id: "b2-u23-r2",
    level: "B2",
    skill: "reading",
    unit: 23,
    title: "Gut ist gut genug",
    genre: "Deneme",
    intro: "Mükemmeliyetçilik üzerine bir yazı. Kendine dair kurulan varsayımlara dikkat et.",
    gloss: [
      { de: "der Leistungsdruck", tr: "performans baskısı", en: "pressure to perform" },
      { de: "das Selbstwertgefühl", tr: "özsaygı", en: "self-worth" },
      { de: "das Schuldgefühl", tr: "suçluluk duygusu", en: "guilt" },
      { de: "die Bescheidenheit", tr: "alçakgönüllülük", en: "modesty" },
      { de: "die Empfindlichkeit", tr: "hassasiyet", en: "sensitivity" },
      { de: "das Lampenfieber", tr: "sahne heyecanı", en: "stage fright" },
      { de: "sich aufopfern", tr: "kendini feda etmek", en: "to sacrifice oneself" },
      { de: "abschneiden", tr: "sonuç almak", en: "to perform" },
    ],
    minutes: 6,
    text:
      "GUT IST GUT GENUG\n\n" +
      "Perfektionismus wird oft als Tugend verkauft, im Bewerbungsgespräch sogar als hübsche Schwäche. Er ist keine. Er ist eine teure Angewohnheit, und sie kostet vor allem Zeit an den falschen Stellen.\n\n" +
      "Der Mechanismus ist einfach. Ich tue so, als ob jede Aufgabe gleich gut erledigt werden müsste. Also verwende ich auf eine interne Notiz dieselbe Sorgfalt wie auf einen Vertrag. Am Ende sind beide fertig, aber der Vertrag zu spät.\n\n" +
      "Dahinter steckt selten Ehrgeiz. Häufiger steckt dahinter ein Selbstwertgefühl, das an Ergebnisse gekoppelt ist: Wer schlecht abschneidet, fühlt sich nicht wie jemand, der schlecht abgeschnitten hat, sondern wie jemand, der weniger wert ist. Deshalb wächst mit dem Leistungsdruck auch das Schuldgefühl bei jeder Kleinigkeit.\n\n" +
      "Zwei Missverständnisse gehören dazu. Erstens wird Perfektionismus mit hohen Ansprüchen verwechselt. Hohe Ansprüche richten sich auf das Wichtige; Perfektionismus verteilt sie gleichmäßig, und das ist genau der Fehler. Zweitens wird er mit Bescheidenheit verwechselt, weil beide leise auftreten — dabei ist das eine Genügsamkeit und das andere Angst.\n\n" +
      "Was hilft? Vor jeder Aufgabe eine Sekunde für die Frage: Wie gut muss das sein? Nicht: Wie gut kann ich das? Dazu ein Zeitlimit, das vorher gesetzt wird. Und die Bereitschaft, etwas bewusst mittelmäßig abzugeben, um zu erleben, dass nichts passiert.\n\n" +
      "Das Lampenfieber vor der ersten mittelmäßigen Abgabe ist übrigens echt. Es geht nach der dritten weg. Wer sich dagegen dauerhaft aufopfert, wird nicht besser, sondern nur empfindlicher — und Empfindlichkeit macht die nächste Rückmeldung noch schwerer.",
    questions: [
      {
        kind: "gapfill",
        text: "Ich tue so, ___ ob jede Aufgabe gleich gut erledigt werden müsste.",
        options: [],
        answer: 0,
        accept: ["als"],
        explain: "als ob Konjunktiv II ister: müsste, çünkü varsayım gerçek değil.",
      },
      {
        text: "Was steckt laut Text meist hinter Perfektionismus?",
        options: [
          "Ehrgeiz",
          "ein an Ergebnisse gekoppeltes Selbstwertgefühl",
          "Bescheidenheit",
        ],
        answer: 1,
        explain: "„Häufiger steckt dahinter ein Selbstwertgefühl, das an Ergebnisse gekoppelt ist.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frage soll man vor jeder Aufgabe stellen?",
        options: [],
        answer: 0,
        accept: ["wie gut muss das sein", "wie gut es sein muss", "wie gut nötig ist"],
        explain: "„Wie gut muss das sein? Nicht: Wie gut kann ich das?“",
      },
      {
        text: "Wie unterscheiden sich hohe Ansprüche und Perfektionismus?",
        options: [
          "Hohe Ansprüche richten sich auf das Wichtige, Perfektionismus verteilt sie gleichmäßig.",
          "Sie sind dasselbe.",
          "Hohe Ansprüche kosten mehr Zeit.",
        ],
        answer: 0,
        explain: "„Hohe Ansprüche richten sich auf das Wichtige; Perfektionismus verteilt sie gleichmäßig.“",
      },
      {
        text: "Wer sich dauerhaft aufopfert, wird laut Text besser.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…wird nicht besser, sondern nur empfindlicher.“",
      },
    ],
  },

  {
    id: "b2-u23-l1",
    level: "B2",
    skill: "listening",
    unit: 23,
    title: "Die höfliche Anfrage",
    genre: "Telefon görüşmesi",
    intro: "Bir tedarikçiyle görüşme. Talebin nasıl yumuşatıldığına dikkat et.",
    gloss: [
      { de: "zeitnah", tr: "kısa sürede", en: "promptly" },
      { de: "der Klärungsbedarf", tr: "açıklığa kavuşturma ihtiyacı", en: "need for clarification" },
      { de: "der Handlungsbedarf", tr: "harekete geçme gereği", en: "need for action" },
      { de: "der Auftraggeber", tr: "sipariş veren", en: "client" },
      { de: "die Nutzungsbedingungen", tr: "kullanım koşulları", en: "terms of use" },
      { de: "die Versandkosten", tr: "kargo ücreti", en: "shipping costs" },
      { de: "anmahnen", tr: "ihtar etmek", en: "to send a reminder" },
      { de: "terminieren", tr: "tarih belirlemek", en: "to schedule" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Roth", text: "Guten Tag, es geht um unser Angebot vom 12. Da gibt es noch Klärungsbedarf." },
      { speaker: "Herr Sailer", text: "Gerne. Worum geht es genau?" },
      { speaker: "Frau Roth", text: "Könnten Sie uns mitteilen, ob die Versandkosten im Preis enthalten sind?" },
      { speaker: "Herr Sailer", text: "Bei Bestellungen über tausend Euro ja, darunter nicht." },
      { speaker: "Frau Roth", text: "Gut. Wir wären Ihnen dankbar, wenn Sie das im Angebot ausdrücklich vermerken." },
      { speaker: "Herr Sailer", text: "Mache ich. Sonst noch etwas?" },
      { speaker: "Frau Roth", text: "Ja. In den Nutzungsbedingungen steht eine Frist von vierzehn Tagen. Unser Auftraggeber braucht dreißig." },
      { speaker: "Herr Sailer", text: "Das müsste ich intern klären. Bis Freitag hätte ich eine Antwort." },
      { speaker: "Frau Roth", text: "Freitag wäre gut. Können wir für Montag ein kurzes Gespräch terminieren?" },
      { speaker: "Herr Sailer", text: "Montag um zehn?" },
      { speaker: "Frau Roth", text: "Passt. Und falls die dreißig Tage nicht gehen, sagen Sie es bitte zeitnah." },
      { speaker: "Herr Sailer", text: "Selbstverständlich. Dann besteht auf Ihrer Seite ja Handlungsbedarf." },
      { speaker: "Frau Roth", text: "Genau. Ich muss dann nichts anmahnen, sondern umplanen — das ist mir lieber." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Frau Roth'un kargo ücretini sorduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Könnten Sie uns mitteilen, ob die Versandkosten im Preis enthalten sind?"],
        explain: "Konjunktiv II talebi soruya çevirir; dolaylı soru ob ile kurulur.",
      },
      {
        text: "Ab wann sind die Versandkosten enthalten?",
        options: ["immer", "ab tausend Euro", "nie"],
        answer: 1,
        explain: "„Bei Bestellungen über tausend Euro ja, darunter nicht.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frist braucht der Auftraggeber?",
        options: [],
        answer: 0,
        accept: ["dreißig Tage", "30 Tage", "dreißig"],
        explain: "„…eine Frist von vierzehn Tagen. Unser Auftraggeber braucht dreißig.“",
      },
      {
        text: "Wann soll das kurze Gespräch stattfinden?",
        options: ["Freitag", "Montag um zehn", "das bleibt offen"],
        answer: 1,
        explain: "„Montag um zehn?“ — „Passt.“",
      },
      {
        text: "Frau Roth will bei Problemen zuerst anmahnen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich muss dann nichts anmahnen, sondern umplanen — das ist mir lieber.“",
      },
    ],
  },

  {
    id: "b2-u23-l2",
    level: "B2",
    skill: "listening",
    unit: 23,
    title: "Raus aus der Geborgenheit",
    genre: "Diyalog",
    intro: "Büyük bir değişiklik konuşuluyor. Koşullara ve tereddüde dikkat et.",
    gloss: [
      { de: "das Wachstum", tr: "büyüme", en: "growth" },
      { de: "die Geborgenheit", tr: "güven duygusu", en: "sense of security" },
      { de: "die Selbstverwirklichung", tr: "kendini gerçekleştirme", en: "self-realisation" },
      { de: "der Wendepunkt", tr: "dönüm noktası", en: "turning point" },
      { de: "die Persönlichkeit", tr: "kişilik", en: "personality" },
      { de: "die Bindung", tr: "bağ", en: "bond" },
      { de: "die Entfremdung", tr: "yabancılaşma", en: "estrangement" },
      { de: "sich auseinandersetzen", tr: "kafa yormak", en: "to grapple with" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Hedi", text: "Ich überlege, für zwei Jahre nach Lissabon zu gehen. Und ich zögere seit Monaten." },
      { speaker: "Ilja", text: "Was hält dich?" },
      { speaker: "Hedi", text: "Die Geborgenheit hier. Ich habe Freunde, eine Wohnung, alles funktioniert." },
      { speaker: "Ilja", text: "Das klingt nicht nach einem Problem." },
      { speaker: "Hedi", text: "Ist es auch nicht. Aber genau deshalb gibt es kein Wachstum mehr, es passiert einfach nichts." },
      { speaker: "Ilja", text: "Sofern du bereit bist, ein Jahr lang unbequem zu leben, ist es machbar." },
      { speaker: "Hedi", text: "Und die Bindungen hier? Ich habe Angst vor der Entfremdung." },
      { speaker: "Ilja", text: "Manche halten das aus, manche nicht. Das siehst du erst hinterher." },
      { speaker: "Hedi", text: "Das ist ehrlich, aber wenig tröstlich. Und Selbstverwirklichung klingt mir zu groß für einen Umzug." },
      { speaker: "Ilja", text: "Ich weiß. Womit hast du dich denn konkret auseinandergesetzt?" },
      { speaker: "Hedi", text: "Mit den Kosten und der Sprache. Mit dem Danach eigentlich noch nicht." },
      { speaker: "Ilja", text: "Dann fang damit an. Ein Wendepunkt für deine Persönlichkeit wird es sowieso, ob du gehst oder bleibst." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ilja'nın koşulu söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Sofern du bereit bist, ein Jahr lang unbequem zu leben, ist es machbar."],
        explain: "sofern yalnız koşul bildirir; yan cümlede fiil sona gider.",
      },
      {
        text: "Was hält Hedi zurück?",
        options: ["das Geld", "die Geborgenheit hier", "die Sprache"],
        answer: 1,
        explain: "„Die Geborgenheit hier. Ich habe Freunde, eine Wohnung, alles funktioniert.“",
      },
      {
        kind: "short_answer",
        text: "Womit hat sich Hedi noch nicht auseinandergesetzt?",
        options: [],
        answer: 0,
        accept: ["mit dem Danach", "mit der Rückkehr", "mit der Zeit danach"],
        explain: "„Mit den Kosten und der Sprache. Mit dem Danach eigentlich noch nicht.“",
      },
      {
        text: "Was sagt Ilja über die Bindungen?",
        options: [
          "Manche halten das aus, manche nicht.",
          "Alle Freundschaften überstehen das.",
          "Keine Freundschaft übersteht das.",
        ],
        answer: 0,
        explain: "„Manche halten das aus, manche nicht. Das siehst du erst hinterher.“",
      },
      {
        text: "Laut Ilja wird es nur dann ein Wendepunkt, wenn Hedi geht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein Wendepunkt für deine Persönlichkeit wird es sowieso, ob du gehst oder bleibst.“",
      },
    ],
  },

  {
    id: "b2-u23-w1",
    level: "B2",
    skill: "writing",
    unit: 23,
    title: "Ölçüyü tutturmak",
    genre: "Cümle kurma",
    intro: "Resmî kalıp, nazik talep ve kendine kurulan varsayım.",
    gloss: [
      { de: "die Versandkosten", tr: "kargo ücreti", en: "shipping costs" },
      { de: "terminieren", tr: "tarih belirlemek", en: "to schedule" },
      { de: "archivieren", tr: "arşivlemek", en: "to archive" },
      { de: "die Geborgenheit", tr: "güven duygusu", en: "sense of security" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kargo ücretinin fiyata dâhil olup olmadığını bildirebilir misiniz?",
        answer: "Könnten Sie uns mitteilen, ob die Versandkosten im Preis enthalten sind",
        hint: "Konjunktiv II talebi soruya çevirir; dolaylı soru ob ile.",
      },
      {
        kind: "build",
        tr: "Bunu açıkça belirtirseniz size minnettar oluruz.",
        answer: "Wir wären Ihnen dankbar, wenn Sie das ausdrücklich vermerken",
        hint: "wären artı wenn: resmî yazışmanın standart rica kalıbı.",
      },
      {
        kind: "build",
        tr: "Tamamlanan işlemler arşivlenir, silinmez.",
        answer: "Abgeschlossene Vorgänge werden archiviert, nicht gelöscht",
        hint: "Ortaç II sıfatı artı edilgen: resmî usul dili.",
      },
      {
        kind: "build",
        tr: "Her görevin aynı iyilikte yapılması gerekiyormuş gibi davranıyorum.",
        answer: "Ich tue so, als ob jede Aufgabe gleich gut erledigt werden müsste",
        hint: "als ob Konjunktiv II ister; yan cümlede fiil sonda.",
      },
      {
        kind: "rewrite",
        prompt: "Emri resmî bir ricaya çevir.",
        source: "Schicken Sie mir bis morgen die Zahlen.",
        answer: "Könnten Sie mir die Zahlen bis morgen zusenden?",
        alternatives: [
          "Könnten Sie mir die Zahlen bis morgen zusenden",
          "Wir wären Ihnen dankbar, wenn Sie uns die Zahlen bis morgen zusenden könnten.",
        ],
        why: "Konjunktiv II burada talebi zayıflatmıyor, onu müzakereye açıyor: karşı taraf 'yarın olmaz, öbür gün olur' diyebiliyor. Tarih ve içerik aynen duruyor, değişen tek şey cevabın da mümkün hale gelmesi. Türkçedeki '-ebilir misiniz' aynı işi görür.",
      },
    ],
  },

  {
    id: "b2-u23-w2",
    level: "B2",
    skill: "writing",
    unit: 23,
    title: "Die Anfrage",
    genre: "Resmî mektup",
    intro: "Bir kuruma ya da firmaya resmî bir bilgi talebi yaz.",
    gloss: [
      { de: "der Klärungsbedarf", tr: "açıklığa kavuşturma ihtiyacı", en: "need for clarification" },
      { de: "zeitnah", tr: "kısa sürede", en: "promptly" },
      { de: "die Nutzungsbedingungen", tr: "kullanım koşulları", en: "terms of use" },
      { de: "amtlich", tr: "resmî", en: "official" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir firmaya ya da kuruma resmî bir bilgi talebi yaz: bir teklifteki belirsizlik, bir sözleşme maddesi, bir ücret, bir süre. Şu yapıyı tut: konu satırı, hangi belgeye atıf yaptığın, iki ya da üç net soru, ne zamana kadar cevap beklediğin ve kapanış. Soruları Konjunktiv II ile sor, numaralandır. Duygu, sitem ve gereksiz açıklama olmasın; her cümle ya bilgi verir ya bilgi ister.",
        checklist: [
          "Konu satırı ve atıf yapılan belge açık mı?",
          "Sorular numaralı ve net mi?",
          "En az iki Konjunktiv II kalıbı var mı?",
          "Beklenen tarih ve kapanış formülü var mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Könnten Sie uns mitteilen, ob …", tr: "… olup olmadığını bildirebilir misiniz", en: "could you let us know whether …" },
          { de: "Wir wären Ihnen dankbar, wenn …", tr: "… için minnettar oluruz", en: "we would be grateful if …" },
          { de: "Als Anlage erhalten Sie …", tr: "ekte … bulacaksınız", en: "please find enclosed …" },
        ],
        sample:
          "Betreff: Rückfragen zu Ihrem Angebot Nr. 4471 vom 12. September\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "vielen Dank für Ihr Angebot vom 12. September. Vor einer Entscheidung besteht bei uns noch Klärungsbedarf in drei Punkten.\n\n" +
          "1. Könnten Sie uns mitteilen, ob die Versandkosten im genannten Preis enthalten sind? Im Angebot ist dazu nichts vermerkt.\n\n" +
          "2. In Ihren Nutzungsbedingungen ist unter Ziffer 6 eine Widerrufsfrist von vierzehn Tagen genannt. Unser Auftraggeber benötigt dreißig Tage. Wäre eine abweichende Vereinbarung möglich?\n\n" +
          "3. Ab welcher Menge gilt die in Ihrer Preisliste genannte Staffel? Die Angaben auf Seite 2 und Seite 4 weichen voneinander ab.\n\n" +
          "Als Anlage erhalten Sie die von uns geprüfte Stückliste mit den betroffenen Positionen.\n\n" +
          "Wir wären Ihnen dankbar, wenn Sie uns zeitnah, möglichst bis zum 30. September, antworten könnten. Für ein kurzes Telefonat stehe ich Ihnen gern zur Verfügung.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },
];
