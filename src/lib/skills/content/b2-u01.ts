import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 1 — "Sunum, grafik, toplantı, tutanak".
 *
 * Dört ders: Die Präsentation eröffnen · Wie die Grafik zeigt ·
 * Das Meeting moderieren · Das Protokoll. Ünite kurum dilinin dört temel
 * hamlesini bir arada çalıştırıyor.
 *
 *   Ünite 1: der Überblick, die Gliederung, der Schwerpunkt, das Anliegen,
 *            vortragen, darlegen, strukturieren, eingehen auf · die Zunahme,
 *            der Rückgang, die Tendenz, der Anteil, die Quote, die Schwankung,
 *            betragen, erheblich · moderieren, die Tagesordnung,
 *            die Wortmeldung, einberufen, der Konsens, sich äußern,
 *            die Gesprächsführung, überziehen · das Protokoll,
 *            die Feststellung, die Anmerkung, die Mitteilung,
 *            die Dokumentation, die Freigabe, weiterleiten, bekanntgeben
 *   Kalıplar: Ziel meines Vortrags ist es, … zu … · Zunächst gebe ich einen
 *            Überblick über … · Wie in der Grafik dargestellt wurde, … ·
 *            … ist … worden · Ich würde vorschlagen, … zu … · Könnten wir
 *            festhalten, dass …? · Es wurde beschlossen, dass … ·
 *            Herr X stellte fest, … sei …
 *
 * Ölçtüğü dilbilgisi: isimleştirme (Nominalisierung), edilgen Perfekt
 * (ist … worden), dilek kipiyle öneri (Konjunktiv II) ve dolaylı aktarımın
 * girişi (sei). Dördü de kurum dilinin aynı işlevine hizmet ediyor: eylemi
 * failinden ayırmak ve mesafe kurmak.
 */
export const b2U01: SkillExercise[] = [
  {
    id: "b2-u01-r1",
    level: "B2",
    skill: "reading",
    unit: 1,
    title: "Die ersten neunzig Sekunden",
    genre: "Meslek dergisi yazısı",
    intro: "Bir sunum eğitmeni, sunumun ilk dakikasında nelerin karara bağlandığını anlatıyor.",
    gloss: [
      { de: "der Überblick", tr: "genel bakış", en: "overview" },
      { de: "die Gliederung", tr: "ana hatlar", en: "outline" },
      { de: "der Schwerpunkt", tr: "odak", en: "focus" },
      { de: "das Anliegen", tr: "mesele", en: "concern" },
      { de: "vortragen", tr: "sunmak", en: "to present" },
      { de: "darlegen", tr: "ortaya koymak", en: "to set out" },
      { de: "strukturieren", tr: "yapılandırmak", en: "to structure" },
      { de: "eingehen auf", tr: "değinmek", en: "to address" },
    ],
    minutes: 6,
    text:
      "DIE ERSTEN NEUNZIG SEKUNDEN\n\n" +
      "Wer eine Präsentation hält, entscheidet in den ersten neunzig Sekunden darüber, ob ihm jemand zuhört. Das klingt hart, aber jede Trainerin bestätigt es. In dieser knappen Zeit muss das Anliegen auf dem Tisch liegen: Warum stehe ich hier, und was soll am Ende anders sein?\n\n" +
      "Der häufigste Fehler ist der Anlauf. Viele beginnen mit ihrem Werdegang, mit der Geschichte der Abteilung oder mit einer Entschuldigung für die Technik. Erst nach fünf Minuten legen sie dar, worum es eigentlich geht. Bis dahin hat die Hälfte des Raums das Handy in der Hand.\n\n" +
      "Besser ist die umgekehrte Reihenfolge. Zuerst kommt das Anliegen in einem Satz. Dann folgt ein Überblick über den Ablauf: drei Punkte, mehr nicht. Diese Gliederung ist kein Schmuck, sondern eine Landkarte. Wer weiß, wo er sich befindet, hört anders zu.\n\n" +
      "Wichtig ist außerdem, den eigenen Schwerpunkt früh zu nennen. Eine Präsentation kann nicht auf jedes Detail eingehen; sie muss auswählen. Wer alles vorträgt, trägt nichts vor. Fachleute im Publikum verzeihen eine Lücke, wenn sie angekündigt wurde — sie verzeihen aber nicht, wenn vierzig Minuten lang nichts Neues kommt.\n\n" +
      "Und die Technik? Sie hilft weniger, als man denkt. Ein gut strukturierter Vortrag funktioniert auch ohne Folien. Ein schlecht strukturierter wird durch Folien nur länger.",
    questions: [
      {
        text: "Was soll laut Text in den ersten neunzig Sekunden gesagt werden?",
        options: [
          "der eigene Werdegang",
          "das Anliegen des Vortrags",
          "eine Entschuldigung für die Technik",
        ],
        answer: 1,
        explain: "„In dieser knappen Zeit muss das Anliegen auf dem Tisch liegen.“ Werdegang ve teknik özrü metinde tam olarak en sık yapılan hata diye anılıyor.",
      },
      {
        kind: "gapfill",
        text: "Dann folgt ein ___ über den Ablauf: drei Punkte, mehr nicht.",
        options: [],
        answer: 0,
        accept: ["Überblick"],
        explain: "Metinde aynen geçiyor. Sunum planı önce genel bir bakışla duyurulur.",
      },
      {
        text: "Warum nennt der Text die Gliederung eine Landkarte?",
        options: [
          "Weil sie den Vortrag schmückt.",
          "Weil der Zuhörer dann weiß, wo er sich befindet.",
          "Weil sie die Technik ersetzt.",
        ],
        answer: 1,
        explain: "„Wer weiß, wo er sich befindet, hört anders zu.“ Metin süsleme ihtimalini açıkça reddediyor.",
      },
      {
        kind: "short_answer",
        text: "Was passiert laut Text, wenn jemand alles vorträgt?",
        options: [],
        answer: 0,
        accept: ["er trägt nichts vor", "nichts", "dann trägt er nichts vor"],
        explain: "„Wer alles vorträgt, trägt nichts vor.“ Sunum seçmek zorundadır.",
      },
      {
        text: "Folien machen einen schlecht strukturierten Vortrag besser.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein schlecht strukturierter wird durch Folien nur länger.“",
      },
    ],
  },

  {
    id: "b2-u01-r2",
    level: "B2",
    skill: "reading",
    unit: 1,
    title: "Was die Kurve nicht sagt",
    genre: "Köşe yazısı",
    intro: "Bir gazete yazarı, sunumlarda gösterilen sayıların neden yanıltıcı olabildiğini anlatıyor.",
    gloss: [
      { de: "die Zunahme", tr: "artış", en: "increase" },
      { de: "der Rückgang", tr: "düşüş", en: "decline" },
      { de: "die Tendenz", tr: "eğilim", en: "trend" },
      { de: "der Anteil", tr: "pay", en: "share" },
      { de: "die Quote", tr: "oran", en: "rate" },
      { de: "die Schwankung", tr: "dalgalanma", en: "fluctuation" },
      { de: "betragen", tr: "tutmak", en: "to amount to" },
      { de: "erheblich", tr: "önemli ölçüde", en: "considerably" },
    ],
    minutes: 6,
    text:
      "WAS DIE KURVE NICHT SAGT\n\n" +
      "Auf jeder zweiten Folie steht eine Kurve, und fast jede zeigt nach oben. Das ist selten gelogen und trotzdem selten die ganze Wahrheit.\n\n" +
      "Ein Beispiel aus der letzten Woche. In einer Präsentation wurde eine Zunahme von zwanzig Prozent gezeigt, dazu ein zufriedener Satz über die gute Entwicklung. Was nicht gesagt wurde: Im Jahr davor war ein Rückgang von dreißig Prozent verzeichnet worden. Die Kurve steigt also, aber sie steigt aus einem Loch heraus.\n\n" +
      "Der zweite Trick ist der Anteil ohne Grundmenge. Eine Quote von fünfzig Prozent klingt gewaltig. Wenn die Grundmenge aber vier Fälle beträgt, sind es zwei. Seriöse Folien nennen deshalb immer beides: die Quote und die Zahl dahinter.\n\n" +
      "Der dritte Punkt ist die Zeitachse. Wer nur zwei Monate zeigt, verwandelt jede normale Schwankung in eine Tendenz. Wer zehn Jahre zeigt, sieht oft, dass sich erheblich weniger verändert hat als gedacht. Beide Bilder sind mit denselben Daten erstellt worden.\n\n" +
      "Was hilft? Drei Fragen, die man laut stellen darf, ohne unhöflich zu sein: Verglichen womit? Wie viele sind es absolut? Und über welchen Zeitraum? Wer sie beantworten kann, hat gut gearbeitet. Wer ausweicht, hat die Kurve gewählt, bevor er die Zahlen gelesen hat.",
    questions: [
      {
        kind: "gapfill",
        text: "Im Jahr davor war ein ___ von dreißig Prozent verzeichnet worden.",
        options: [],
        answer: 0,
        accept: ["Rückgang"],
        explain: "Edilgen Perfekt geçmişte: war … verzeichnet worden. Artıştan önce bir düşüş var.",
      },
      {
        text: "Warum ist die gezeigte Zunahme von zwanzig Prozent irreführend?",
        options: [
          "Weil die Zahl erfunden war.",
          "Weil im Jahr davor ein größerer Rückgang war.",
          "Weil die Kurve nach unten zeigte.",
        ],
        answer: 1,
        explain: "„Die Kurve steigt also, aber sie steigt aus einem Loch heraus.“ Sayı yanlış değil, eksik.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Fälle sind fünfzig Prozent von vier?",
        options: [],
        answer: 0,
        accept: ["zwei", "2", "es sind zwei"],
        explain: "„Wenn die Grundmenge aber vier Fälle beträgt, sind es zwei.“ Oran tek başına büyüklük göstermez.",
      },
      {
        text: "Was passiert, wenn man nur zwei Monate zeigt?",
        options: [
          "Jede Schwankung sieht wie eine Tendenz aus.",
          "Die Daten werden genauer.",
          "Der Anteil wird sichtbar.",
        ],
        answer: 0,
        explain: "„Wer nur zwei Monate zeigt, verwandelt jede normale Schwankung in eine Tendenz.“",
      },
      {
        text: "Der Autor hält alle steigenden Kurven für gelogen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das ist selten gelogen und trotzdem selten die ganze Wahrheit.“",
      },
    ],
  },

  {
    id: "b2-u01-l1",
    level: "B2",
    skill: "listening",
    unit: 1,
    title: "Punkt drei, bitte",
    genre: "Toplantı",
    intro: "Bir ekip toplantısı sarkıyor. Toplantıyı yöneten kişi nasıl toparlıyor?",
    gloss: [
      { de: "moderieren", tr: "toplantıyı yönetmek", en: "to chair" },
      { de: "die Tagesordnung", tr: "gündem", en: "agenda" },
      { de: "die Wortmeldung", tr: "söz talebi", en: "request to speak" },
      { de: "einberufen", tr: "toplantıya çağırmak", en: "to convene" },
      { de: "der Konsens", tr: "uzlaşı", en: "consensus" },
      { de: "sich äußern", tr: "görüş bildirmek", en: "to comment" },
      { de: "die Gesprächsführung", tr: "görüşme yönetimi", en: "moderation" },
      { de: "überziehen", tr: "süreyi aşmak", en: "to overrun" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nadja", text: "Wir sind bei Punkt drei der Tagesordnung und haben noch zwölf Minuten. Ich moderiere heute, also achte ich auf die Zeit." },
      { speaker: "Bilal", text: "Dann fasse ich mich kurz. Ich würde vorschlagen, den Termin um eine Woche zu verschieben." },
      { speaker: "Carla", text: "Dazu möchte ich mich äußern. Eine Woche reicht meiner Meinung nach nicht." },
      { speaker: "Nadja", text: "Danke, das war die zweite Wortmeldung zu diesem Punkt. Bilal, wie lange bräuchtest du realistisch?" },
      { speaker: "Bilal", text: "Zwei Wochen wären ehrlicher. Ich habe beim letzten Mal zu optimistisch geplant." },
      { speaker: "Carla", text: "Damit könnte ich leben. Zwei Wochen, aber dann wirklich fest." },
      { speaker: "Nadja", text: "Könnten wir festhalten, dass wir um zwei Wochen verschieben? Ich sehe Nicken. Dann haben wir einen Konsens." },
      { speaker: "Bilal", text: "Und der Rest der Tagesordnung?" },
      { speaker: "Nadja", text: "Punkt vier und fünf schaffen wir heute nicht. Ich würde ungern überziehen, das bringt am Ende niemandem etwas." },
      { speaker: "Carla", text: "Berufst du dann eine kurze Sitzung für Freitag ein?" },
      { speaker: "Nadja", text: "Ja, dreißig Minuten, nur für diese zwei Punkte. Und die Gesprächsführung übernimmt Freitag jemand anderes." },
    ],
    questions: [
      {
        text: "Wie lange soll der Termin am Ende verschoben werden?",
        options: ["um eine Woche", "um zwei Wochen", "um einen Monat"],
        answer: 1,
        explain: "Bilal önce bir hafta öneriyor, sonra „Zwei Wochen wären ehrlicher“ diyor ve Carla kabul ediyor.",
      },
      {
        kind: "dictation",
        text: "Nadja'nın uzlaşıyı kayda geçirdiği soruyu yaz.",
        options: [],
        answer: 0,
        accept: ["Könnten wir festhalten, dass wir um zwei Wochen verschieben?"],
        explain: "Dilek kipiyle sorulan bu soru kararı kayda geçirir ve karşı tarafa hâlâ itiraz alanı bırakır.",
      },
      {
        kind: "short_answer",
        text: "Warum will Nadja nicht überziehen?",
        options: [],
        answer: 0,
        accept: ["es bringt niemandem etwas", "das bringt niemandem etwas", "es hilft niemandem"],
        explain: "„Ich würde ungern überziehen, das bringt am Ende niemandem etwas.“",
      },
      {
        text: "Wer moderiert die Sitzung am Freitag?",
        options: ["wieder Nadja", "jemand anderes", "Carla und Bilal zusammen"],
        answer: 1,
        explain: "„Und die Gesprächsführung übernimmt Freitag jemand anderes.“",
      },
      {
        text: "Bilal gibt zu, beim letzten Mal zu optimistisch geplant zu haben.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich habe beim letzten Mal zu optimistisch geplant.“",
      },
    ],
  },

  {
    id: "b2-u01-l2",
    level: "B2",
    skill: "listening",
    unit: 1,
    title: "Steht das so im Protokoll?",
    genre: "Diyalog",
    intro: "İki meslektaş dünkü toplantının tutanağını gözden geçiriyor. Aktarım kipine dikkat et.",
    gloss: [
      { de: "das Protokoll", tr: "tutanak", en: "minutes" },
      { de: "die Feststellung", tr: "tespit", en: "statement of fact" },
      { de: "die Anmerkung", tr: "ek açıklama", en: "remark" },
      { de: "die Mitteilung", tr: "bildirim", en: "notice" },
      { de: "die Dokumentation", tr: "belgeleme", en: "documentation" },
      { de: "die Freigabe", tr: "onay", en: "approval" },
      { de: "weiterleiten", tr: "iletmek", en: "to forward" },
      { de: "bekanntgeben", tr: "açıklamak", en: "to announce" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ruth", text: "Ich habe das Protokoll überflogen. Bei Punkt zwei fehlt mir etwas." },
      { speaker: "Yannis", text: "Was denn genau? Ich habe alles mitgeschrieben, was gesagt wurde." },
      { speaker: "Ruth", text: "Frau Weber stellte fest, die Zahlen seien noch nicht geprüft. Das steht nirgends." },
      { speaker: "Yannis", text: "Stimmt. Ich habe es als Anmerkung im Kopf gehabt und dann vergessen." },
      { speaker: "Ruth", text: "Eine Feststellung ist keine Anmerkung. Das gehört in den Beschlusstext." },
      { speaker: "Yannis", text: "Gut, ich ergänze es. Es wurde außerdem beschlossen, dass die Dokumentation bis Freitag fertig ist." },
      { speaker: "Ruth", text: "Das habe ich gelesen, ja. Und wer gibt das Ergebnis bekannt?" },
      { speaker: "Yannis", text: "Herr Klein. Er sagte, er informiere die anderen Abteilungen selbst." },
      { speaker: "Ruth", text: "Dann brauchen wir vorher die Freigabe von der Leitung. Sonst geht die Mitteilung zu früh raus." },
      { speaker: "Yannis", text: "Verstanden. Ich leite das Protokoll erst nach der Freigabe weiter." },
      { speaker: "Ruth", text: "Genau. Und schick mir vorher die korrigierte Fassung, dann lese ich noch einmal drüber." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Frau Weber'in tespitini Yannis'in tutanağa yazması gereken hâliyle yaz.",
        options: [],
        answer: 0,
        accept: ["Frau Weber stellte fest, die Zahlen seien noch nicht geprüft."],
        explain: "Tutanakta söylenen aktarım kipiyle verilir: seien. Yazan kişi ne katılıyor ne karşı çıkıyor.",
      },
      {
        text: "Warum reicht Ruth eine Anmerkung nicht?",
        options: [
          "Weil eine Feststellung in den Beschlusstext gehört.",
          "Weil Anmerkungen zu lang sind.",
          "Weil Yannis zu wenig mitgeschrieben hat.",
        ],
        answer: 0,
        explain: "„Eine Feststellung ist keine Anmerkung. Das gehört in den Beschlusstext.“",
      },
      {
        kind: "short_answer",
        text: "Was braucht das Team, bevor die Mitteilung rausgeht?",
        options: [],
        answer: 0,
        accept: ["die Freigabe", "die Freigabe von der Leitung", "eine Freigabe"],
        explain: "„Dann brauchen wir vorher die Freigabe von der Leitung.“",
      },
      {
        text: "Wer informiert die anderen Abteilungen?",
        options: ["Ruth", "Yannis", "Herr Klein"],
        answer: 2,
        explain: "„Er sagte, er informiere die anderen Abteilungen selbst.“ Aktarım kipi: informiere.",
      },
      {
        text: "Yannis leitet das Protokoll sofort weiter.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich leite das Protokoll erst nach der Freigabe weiter.“",
      },
    ],
  },

  {
    id: "b2-u01-w1",
    level: "B2",
    skill: "writing",
    unit: 1,
    title: "Vier Sätze aus dem Sitzungssaal",
    genre: "Cümle kurma",
    intro: "Ünitenin dört yapısı: isimleştirme, edilgen Perfekt, dilek kipiyle öneri ve dolaylı aktarım.",
    gloss: [
      { de: "die Gliederung", tr: "ana hatlar", en: "outline" },
      { de: "der Rückgang", tr: "düşüş", en: "decline" },
      { de: "einberufen", tr: "toplantıya çağırmak", en: "to convene" },
      { de: "die Freigabe", tr: "onay", en: "approval" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sunumumun amacı size yeni yöntemi tanıtmaktır.",
        answer: "Ziel meines Vortrags ist es, Ihnen das neue Verfahren vorzustellen",
        hint: "Sahte özne es ve mastar öbeği: ayrılabilen fiilde zu ortaya girer (vorzustellen).",
      },
      {
        kind: "build",
        tr: "Düşüş mart ayında kayda geçirildi.",
        answer: "Der Rückgang ist im März verzeichnet worden",
        hint: "Edilgen Perfekt: yardımcı fiil sein, ortaç, sonda kısalmış biçim worden.",
      },
      {
        kind: "build",
        tr: "Cuma günü için kısa bir toplantı çağırmayı öneririm.",
        answer: "Ich würde vorschlagen, für Freitag eine kurze Sitzung einzuberufen",
        hint: "Dilek kipi ana cümlede; ayrılabilen fiilde zu öneğin ardına girer.",
      },
      {
        kind: "build",
        tr: "Bay Klein rakamların henüz kontrol edilmediğini belirtti.",
        answer: "Herr Klein stellte fest, die Zahlen seien noch nicht geprüft",
        hint: "Aktarım kipi çoğulda seien; tutanak dili mesafeyi böyle kurar.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: edilgen geçmişte bir ayrıntı kaymış.",
        source: "Die Gliederung ist gestern besprochen geworden.",
        answer: "Die Gliederung ist gestern besprochen worden.",
        alternatives: ["Die Gliederung wurde gestern besprochen."],
        why: "Edilgen Perfekt'te yardımcı fiil kısalır: geworden değil worden. Türkçede tek bir 'edildi' olduğu için bu ayrım kolay kaçar; Almanca burada iki ayrı biçim tutuyor.",
      },
    ],
  },

  {
    id: "b2-u01-w2",
    level: "B2",
    skill: "writing",
    unit: 1,
    title: "Das Protokoll von gestern",
    genre: "Tutanak",
    intro: "Kısa bir toplantı tutanağı yaz: ne karara bağlandı, kim ne belirtti, ne bekliyor?",
    gloss: [
      { de: "das Protokoll", tr: "tutanak", en: "minutes" },
      { de: "die Feststellung", tr: "tespit", en: "statement of fact" },
      { de: "der Konsens", tr: "uzlaşı", en: "consensus" },
      { de: "die Freigabe", tr: "onay", en: "approval" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Dün katıldığın (ya da hayal ettiğin) bir toplantının tutanağını yaz. Gündemde ne vardı, hangi karar alındı, kim ne belirtti ve neyin onayı bekleniyor? En az bir kez edilgen geçmiş (ist … worden ya da wurde beschlossen), bir kez de aktarım kipi (sei / seien) kullan. Tutanak dili birinci tekil şahıs kullanmaz.",
        checklist: [
          "Gündem maddesi ve alınan karar yazıldı mı?",
          "En az bir edilgen geçmiş cümlesi var mı?",
          "En az bir aktarım kipi (sei ya da seien) var mı?",
          "Neyin onay beklediği söylendi mi?",
        ],
        minWords: 70,
        phrases: [
          { de: "Es wurde beschlossen, dass …", tr: "…-e karar verildi", en: "it was decided that …" },
          { de: "Frau X stellte fest, … sei …", tr: "X hanım …-in … olduğunu belirtti", en: "Ms X stated that … was …" },
          { de: "Die Freigabe steht noch aus.", tr: "onay hâlâ bekleniyor", en: "approval is still pending" },
        ],
        sample:
          "PROTOKOLL DER SITZUNG VOM 12. MÄRZ\n\n" +
          "Anwesend: vier Personen aus der Abteilung Technik.\n\n" +
          "Punkt 1: Zeitplan. Es wurde beschlossen, dass der Abgabetermin um zwei Wochen verschoben wird. Herr Bilal stellte fest, die ursprüngliche Planung sei zu optimistisch gewesen. Nach kurzer Diskussion bestand Konsens.\n\n" +
          "Punkt 2: Zahlen. Frau Weber merkte an, die Quartalszahlen seien noch nicht geprüft. Der Rückgang im Februar ist inzwischen bestätigt worden, die Zunahme im März dagegen nicht.\n\n" +
          "Punkt 3: Kommunikation. Die Mitteilung an die anderen Abteilungen ist vorbereitet worden. Sie wird erst nach der Freigabe durch die Leitung weitergeleitet. Die Freigabe steht noch aus.\n\n" +
          "Nächste Sitzung: Freitag, dreißig Minuten, nur Punkt 4 und 5.",
      },
    ],
  },
];
