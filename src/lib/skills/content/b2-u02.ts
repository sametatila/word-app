import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 2 — "Soru karşılamak, asansör sohbeti, görev dağıtmak, süre".
 *
 * Dört ders: Auf Zwischenfragen reagieren · Small Talk im Aufzug ·
 * Aufgaben verteilen · Die Frist brennt.
 *
 *   Ünite 2: die Zwischenfrage, missverstehen, erläutern, klarstellen,
 *            nachfragen, das Stichwort, nachdrücklich, überzeugend ·
 *            unverbindlich, beiläufig, die Belegschaft, die Höflichkeit,
 *            das Taktgefühl, gesprächig, das Arbeitsklima, die Führungskraft ·
 *            delegieren, die Zuständigkeit, abarbeiten, die Kapazität,
 *            beauftragen, die Weisung, entlasten, federführend · einhalten,
 *            die Fristverlängerung, die Pufferzeit, die Dringlichkeit,
 *            der Engpass, termingerecht, beschleunigen, nachfassen
 *   Kalıplar: Wenn ich Sie richtig verstehe, … · Darauf komme ich gleich
 *            zurück. · Hätten Sie kurz Zeit? · Man müsste mal wieder … ·
 *            Das lässt sich bis … erledigen. · … ist zu prüfen. · Sofern
 *            nichts dazwischenkommt, … · …, es sei denn, …
 *
 * Ölçtüğü dilbilgisi: dolaylı soru (Indirekte Frage), dilek kipiyle kibarlık,
 * edilgen yerine geçen yapılar (lassen sich / sein + zu) ve koşullu söz
 * verme (sofern / es sei denn). Ünitenin ortak konusu şu: bir işi kimin,
 * ne zaman, hangi koşulla yapacağını kimseyi köşeye sıkıştırmadan söylemek.
 */
export const b2U02: SkillExercise[] = [
  {
    id: "b2-u02-r1",
    level: "B2",
    skill: "reading",
    unit: 2,
    title: "Die Frage hinter der Frage",
    genre: "Blog yazısı",
    intro: "Sunum sonrası soru turunu yöneten biri, iyi cevabın sorudan önce başladığını anlatıyor.",
    gloss: [
      { de: "die Zwischenfrage", tr: "ara soru", en: "interposed question" },
      { de: "missverstehen", tr: "yanlış anlamak", en: "to misunderstand" },
      { de: "erläutern", tr: "açıklamak", en: "to explain" },
      { de: "klarstellen", tr: "netleştirmek", en: "to clarify" },
      { de: "nachfragen", tr: "sorup öğrenmek", en: "to ask back" },
      { de: "das Stichwort", tr: "anahtar kelime", en: "keyword" },
      { de: "nachdrücklich", tr: "ısrarla", en: "emphatically" },
      { de: "überzeugend", tr: "ikna edici", en: "convincing" },
    ],
    minutes: 6,
    text:
      "DIE FRAGE HINTER DER FRAGE\n\n" +
      "Die meisten Vorträge scheitern nicht am Vortrag. Sie scheitern in den zehn Minuten danach, wenn die erste Zwischenfrage kommt und der Redner sofort antwortet.\n\n" +
      "Sofort antworten klingt souverän, ist es aber selten. Wer sofort antwortet, antwortet auf die Frage, die er gehört hat — nicht auf die, die gestellt wurde. Genau so entstehen Missverständnisse, die hinterher niemand mehr aufräumen kann.\n\n" +
      "Der bessere Weg dauert vier Sekunden. Man wiederholt die Frage mit eigenen Worten: „Wenn ich Sie richtig verstehe, geht es Ihnen um die Kosten.“ Wer so beginnt, gewinnt Zeit und prüft gleichzeitig, ob er die Frage missverstanden hat. In der Hälfte der Fälle folgt eine kleine Korrektur — und die ist Gold wert, denn ohne sie hätte man fünf Minuten am Thema vorbeigeredet. Oft muss man erst klarstellen, was überhaupt gefragt war.\n\n" +
      "Ein zweiter Trick ist das Stichwort. Wer die Frage auf ein einziges Wort bringt, merkt sofort, ob er sie erläutern oder nur beantworten muss. „Kosten“ ist eine Frage. „Vertrauen“ ist eine andere, auch wenn beide gleich klingen.\n\n" +
      "Und wenn die Antwort wirklich nicht in dieses Gespräch passt? Dann darf man das sagen: „Darauf komme ich gleich zurück.“ Das ist kein Ausweichen, solange man wirklich zurückkommt. Wer dagegen nachdrücklich behauptet, alles sofort beantworten zu können, wirkt nicht überzeugend, sondern nervös.\n\n" +
      "Übrigens: Wer selbst im Publikum sitzt, darf ebenso nachfragen. Eine höfliche Rückfrage ist keine Störung, sondern der einzige Weg, ein Missverständnis zu klären, bevor es teuer wird.",
    questions: [
      {
        text: "Warum ist sofortiges Antworten laut Text riskant?",
        options: [
          "Weil es unhöflich wirkt.",
          "Weil man auf die gehörte statt auf die gestellte Frage antwortet.",
          "Weil man dabei zu langsam spricht.",
        ],
        answer: 1,
        explain: "„Wer sofort antwortet, antwortet auf die Frage, die er gehört hat — nicht auf die, die gestellt wurde.“",
      },
      {
        kind: "gapfill",
        text: "___ ich Sie richtig verstehe, geht es Ihnen um die Kosten.",
        options: [],
        answer: 0,
        accept: ["Wenn"],
        explain: "Koşul yan cümlesi başta; ana cümle fiille devam ediyor (geht es).",
      },
      {
        kind: "short_answer",
        text: "Auf wie viele Wörter soll man die Frage bringen?",
        options: [],
        answer: 0,
        accept: ["auf ein Wort", "ein Wort", "auf ein einziges Wort"],
        explain: "„Wer die Frage auf ein einziges Wort bringt …“ — o tek kelime sorunun asıl konusunu gösterir.",
      },
      {
        text: "Wann ist „Darauf komme ich gleich zurück“ kein Ausweichen?",
        options: [
          "Wenn man wirklich zurückkommt.",
          "Wenn niemand nachfragt.",
          "Wenn die Frage unhöflich war.",
        ],
        answer: 0,
        explain: "„Das ist kein Ausweichen, solange man wirklich zurückkommt.“",
      },
      {
        text: "Der Text hält Rückfragen aus dem Publikum für eine Störung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Eine höfliche Rückfrage ist keine Störung, sondern der einzige Weg, ein Missverständnis zu klären.“",
      },
    ],
  },

  {
    id: "b2-u02-r2",
    level: "B2",
    skill: "reading",
    unit: 2,
    title: "Wer macht was bis wann",
    genre: "İç bülten yazısı",
    intro: "Bir ekip lideri, görev dağıtmanın neden bir zaman meselesi değil bir dil meselesi olduğunu yazıyor.",
    gloss: [
      { de: "delegieren", tr: "görev devretmek", en: "to delegate" },
      { de: "die Zuständigkeit", tr: "sorumluluk alanı", en: "area of responsibility" },
      { de: "abarbeiten", tr: "sırayla bitirmek", en: "to work through" },
      { de: "die Kapazität", tr: "kapasite", en: "capacity" },
      { de: "beauftragen", tr: "görevlendirmek", en: "to commission" },
      { de: "die Weisung", tr: "talimat", en: "instruction" },
      { de: "entlasten", tr: "yükünü hafifletmek", en: "to relieve" },
      { de: "federführend", tr: "baş sorumlu", en: "in the lead" },
    ],
    minutes: 6,
    text:
      "WER MACHT WAS BIS WANN\n\n" +
      "In unserer letzten Umfrage stand ein Satz, der mich seit Wochen beschäftigt: „Ich weiß nie genau, ob eine Aufgabe wirklich mir gehört.“ Achtzehn von vierzig Kolleginnen und Kollegen haben etwas Ähnliches geschrieben.\n\n" +
      "Das ist kein Motivationsproblem. Es ist ein Sprachproblem. Zwischen „Könnte da jemand mal draufschauen?“ und „Frau Sahin ist federführend, Abgabe Donnerstag“ liegt der ganze Unterschied.\n\n" +
      "Wer delegiert, muss drei Dinge sagen: wer, was und bis wann. Fehlt eines davon, wandert die Aufgabe durch die Abteilung, bis sie jemand aus schlechtem Gewissen übernimmt — meistens die Person mit der geringsten Kapazität, weil sie am schwersten Nein sagt.\n\n" +
      "Genauso wichtig ist die Frage, was nicht dazugehört. Eine Zuständigkeit ohne Grenze entlastet niemanden. Wer beauftragt wird, ein Thema zu betreuen, sollte auch hören, wofür er ausdrücklich nicht zuständig ist.\n\n" +
      "Und die Reihenfolge? Wir haben in diesem Quartal versucht, alle offenen Punkte parallel abzuarbeiten. Das Ergebnis war, dass alles gleichzeitig zu achtzig Prozent fertig war und nichts abgeschlossen. Seit August arbeiten wir wieder in Reihenfolge, und die Stimmung ist messbar besser.\n\n" +
      "Ein letzter Punkt, weil er oft missverstanden wird: Eine Weisung ist kein Misstrauen. Klare Ansagen sind freundlicher als vage. Vage Ansagen verschieben die Verantwortung nur nach unten.",
    questions: [
      {
        kind: "short_answer",
        text: "Welche drei Angaben braucht laut Text jede Delegation?",
        options: [],
        answer: 0,
        accept: ["wer was bis wann", "wer, was und bis wann", "wer was und wann"],
        explain: "„Wer delegiert, muss drei Dinge sagen: wer, was und bis wann.“",
      },
      {
        text: "Wer übernimmt laut Text meistens die herrenlose Aufgabe?",
        options: [
          "die Person mit der größten Kapazität",
          "die Person mit der geringsten Kapazität",
          "die Führungskraft selbst",
        ],
        answer: 1,
        explain: "„…meistens die Person mit der geringsten Kapazität, weil sie am schwersten Nein sagt.“",
      },
      {
        kind: "gapfill",
        text: "Eine ___ ohne Grenze entlastet niemanden.",
        options: [],
        answer: 0,
        accept: ["Zuständigkeit"],
        explain: "Metinde aynen geçiyor: sorumluluk alanı ancak sınırı belliyse yük alır.",
      },
      {
        text: "Was war das Ergebnis der parallelen Bearbeitung?",
        options: [
          "Alles war zu achtzig Prozent fertig und nichts abgeschlossen.",
          "Alle Aufgaben wurden schneller fertig.",
          "Die Stimmung wurde besser.",
        ],
        answer: 0,
        explain: "„…dass alles gleichzeitig zu achtzig Prozent fertig war und nichts abgeschlossen.“ Ruh hâli ancak sıraya dönülünce düzelmiş.",
      },
      {
        text: "Der Text hält vage Ansagen für freundlicher als klare.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Klare Ansagen sind freundlicher als vage.“",
      },
    ],
  },

  {
    id: "b2-u02-l1",
    level: "B2",
    skill: "listening",
    unit: 2,
    title: "Sechs Stockwerke",
    genre: "Diyalog",
    intro: "Asansörde kısa bir sohbet. Konu ne zaman açılıyor, nasıl kapanıyor?",
    gloss: [
      { de: "unverbindlich", tr: "bağlayıcı olmayan", en: "non-committal" },
      { de: "beiläufig", tr: "laf arasında", en: "casually" },
      { de: "die Belegschaft", tr: "çalışanlar", en: "workforce" },
      { de: "die Höflichkeit", tr: "nezaket", en: "politeness" },
      { de: "das Taktgefühl", tr: "incelik", en: "tact" },
      { de: "gesprächig", tr: "konuşkan", en: "talkative" },
      { de: "das Arbeitsklima", tr: "çalışma ortamı", en: "working atmosphere" },
      { de: "die Führungskraft", tr: "yönetici", en: "manager" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ilir", text: "Guten Morgen, Frau Brandt. Sie sind heute früh dran." },
      { speaker: "Brandt", text: "Guten Morgen. Ja, um acht ist das Haus noch ruhig. Und Sie sind sonst nicht so gesprächig im Aufzug." },
      { speaker: "Ilir", text: "Stimmt. Hätten Sie diese Woche kurz Zeit? Ganz unverbindlich, zwanzig Minuten." },
      { speaker: "Brandt", text: "Worum geht es denn? Sagen Sie es ruhig beiläufig, wir haben noch vier Stockwerke." },
      { speaker: "Ilir", text: "Um das Arbeitsklima im Team. Seit dem Umbau reden alle weniger miteinander." },
      { speaker: "Brandt", text: "Das höre ich nicht zum ersten Mal. In der ganzen Belegschaft ist das ein Thema." },
      { speaker: "Ilir", text: "Und als Führungskraft hören Sie es vermutlich zuletzt. Höflichkeit hält vieles zurück." },
      { speaker: "Ilir", text: "Ich wollte es nur ansprechen, bevor es größer wird." },
      { speaker: "Brandt", text: "Das war klug. Man müsste mal wieder gemeinsam Mittag essen, aber richtig geplant, nicht zufällig." },
      { speaker: "Ilir", text: "Genau das habe ich gedacht." },
      { speaker: "Brandt", text: "Gut. Schicken Sie mir zwei Termine, dann suche ich einen aus. Und danke fürs Taktgefühl — Sie hätten das auch vor allen sagen können." },
      { speaker: "Ilir", text: "Dafür ist der Aufzug ja da." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ilir'in kibarca vakit istediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Hätten Sie diese Woche kurz Zeit?"],
        explain: "Dilek kipi ricayı yumuşatır. Düz kipteki „Haben Sie Zeit?“ bir talep gibi durur.",
      },
      {
        text: "Worum geht es Ilir?",
        options: ["um seinen Urlaub", "um das Arbeitsklima im Team", "um eine Gehaltserhöhung"],
        answer: 1,
        explain: "„Um das Arbeitsklima im Team. Seit dem Umbau reden alle weniger miteinander.“",
      },
      {
        kind: "short_answer",
        text: "Was schlägt Frau Brandt vor?",
        options: [],
        answer: 0,
        accept: ["gemeinsam Mittag essen", "zusammen Mittag essen", "ein geplantes Mittagessen"],
        explain: "„Man müsste mal wieder gemeinsam Mittag essen, aber richtig geplant.“",
      },
      {
        text: "Wofür bedankt sich Frau Brandt?",
        options: ["für die Pünktlichkeit", "für das Taktgefühl", "für den Vorschlag"],
        answer: 1,
        explain: "„Und danke fürs Taktgefühl — Sie hätten das auch vor allen sagen können.“",
      },
      {
        text: "Frau Brandt hört zum ersten Mal von dem Problem.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das höre ich nicht zum ersten Mal.“",
      },
    ],
  },

  {
    id: "b2-u02-l2",
    level: "B2",
    skill: "listening",
    unit: 2,
    title: "Sofern nichts dazwischenkommt",
    genre: "Telefon görüşmesi",
    intro: "Bir teslim tarihi tehlikede. Koşullu söz ile boş söz arasındaki farka dikkat et.",
    gloss: [
      { de: "einhalten", tr: "uymak", en: "to keep to" },
      { de: "die Fristverlängerung", tr: "süre uzatımı", en: "deadline extension" },
      { de: "die Pufferzeit", tr: "yedek süre", en: "buffer time" },
      { de: "die Dringlichkeit", tr: "aciliyet", en: "urgency" },
      { de: "der Engpass", tr: "darboğaz", en: "bottleneck" },
      { de: "termingerecht", tr: "süresinde", en: "on schedule" },
      { de: "beschleunigen", tr: "hızlandırmak", en: "to speed up" },
      { de: "nachfassen", tr: "takip etmek", en: "to follow up" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kunde", text: "Ich rufe wegen des Abgabetermins an. Schaffen Sie den Freitag noch?" },
      { speaker: "Melis", text: "Sofern nichts dazwischenkommt, ja. Ich sage Ihnen aber gleich, wo der Engpass liegt." },
      { speaker: "Kunde", text: "Bitte, das ist mir lieber als eine schöne Antwort." },
      { speaker: "Melis", text: "Die Daten aus Ihrer Abteilung fehlen noch. Ohne die kann ich den Termin nicht einhalten." },
      { speaker: "Kunde", text: "Die kommen morgen. Ich fasse gleich nach." },
      { speaker: "Melis", text: "Gut. Dann bleibt eine Pufferzeit von einem Tag, und das reicht." },
      { speaker: "Kunde", text: "Und wenn sie doch erst Donnerstag kommen?" },
      { speaker: "Melis", text: "Dann liefere ich Montag, es sei denn, Sie beschleunigen die Prüfung auf Ihrer Seite." },
      { speaker: "Kunde", text: "Wäre eine Fristverlängerung um zwei Tage für Sie einfacher?" },
      { speaker: "Melis", text: "Ehrlich gesagt ja. Dann arbeite ich termingerecht statt in Panik." },
      { speaker: "Kunde", text: "Dann machen wir Dienstag. Die Dringlichkeit war ohnehin eher gefühlt als echt." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Melis'in koşullu söz verdiği ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Sofern nichts dazwischenkommt, ja."],
        explain: "sofern bir koşul bağlacıdır: söz veriliyor ama koşulu da açıkça söyleniyor.",
      },
      {
        text: "Warum kann Melis den Termin gefährdet sehen?",
        options: [
          "Weil ihr Team zu klein ist.",
          "Weil die Daten aus der Abteilung des Kunden fehlen.",
          "Weil sie im Urlaub ist.",
        ],
        answer: 1,
        explain: "„Die Daten aus Ihrer Abteilung fehlen noch. Ohne die kann ich den Termin nicht einhalten.“",
      },
      {
        kind: "gapfill",
        text: "Dann liefere ich Montag, ___ ___ ___, Sie beschleunigen die Prüfung auf Ihrer Seite.",
        options: [],
        answer: 0,
        accept: ["es sei denn"],
        explain: "Tek istisnayı bildiren kalıp; ardından düz cümle dizilimi korunur.",
      },
      {
        text: "Worauf einigen sich die beiden am Ende?",
        options: ["auf Freitag", "auf Montag", "auf Dienstag"],
        answer: 2,
        explain: "„Dann machen wir Dienstag.“ Müşteri iki günlük uzatmayı kendisi öneriyor.",
      },
      {
        text: "Der Kunde hält die Dringlichkeit am Ende für echt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Die Dringlichkeit war ohnehin eher gefühlt als echt.“",
      },
    ],
  },

  {
    id: "b2-u02-w1",
    level: "B2",
    skill: "writing",
    unit: 2,
    title: "Vier Sätze, die niemanden festnageln",
    genre: "Cümle kurma",
    intro: "Dolaylı soru, dilek kipiyle rica, edilgen yerine geçen yapı ve koşullu söz.",
    gloss: [
      { de: "klarstellen", tr: "netleştirmek", en: "to clarify" },
      { de: "die Kapazität", tr: "kapasite", en: "capacity" },
      { de: "abarbeiten", tr: "sırayla bitirmek", en: "to work through" },
      { de: "die Pufferzeit", tr: "yedek süre", en: "buffer time" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sorunuzun neye dayandığını sorabilir miyim?",
        answer: "Darf ich fragen, worauf sich Ihre Frage bezieht",
        hint: "Dolaylı soruda edat soru zamiriyle kaynaşır (worauf) ve fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Bir dakikanız olur muydu?",
        answer: "Hätten Sie kurz einen Moment Zeit",
        hint: "haben fiilinin dilek kipi ricayı yumuşatır: hätten.",
      },
      {
        kind: "build",
        tr: "Bu perşembeye kadar halledilebilir.",
        answer: "Das lässt sich bis Donnerstag erledigen",
        hint: "lassen artı dönüşlü zamir edilgen yerine geçer; mastar en sonda.",
      },
      {
        kind: "build",
        tr: "Aksilik çıkmazsa yedek süre bir gün kalır.",
        answer: "Sofern nichts dazwischenkommt, bleibt ein Tag Pufferzeit",
        hint: "Yan cümle başta; ana cümle çekimli fiille başlar (bleibt).",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: dolaylı soruda bir şey ana cümle gibi kurulmuş.",
        source: "Ich möchte klarstellen, worum geht es hier.",
        answer: "Ich möchte klarstellen, worum es hier geht.",
        alternatives: ["Ich möchte klarstellen, worum es hier geht"],
        why: "Dolaylı soru bir yan cümledir, o yüzden çekimli fiil en sona gider: geht. Türkçede soru cümlesinin dizilişi değişmediği için bu adım kolayca atlanıyor.",
      },
    ],
  },

  {
    id: "b2-u02-w2",
    level: "B2",
    skill: "writing",
    unit: 2,
    title: "Die Mail an das Team",
    genre: "İş yazışması",
    intro: "Görev dağıtan ve süreyi koşula bağlayan kısa bir ekip e-postası yaz.",
    gloss: [
      { de: "federführend", tr: "baş sorumlu", en: "in the lead" },
      { de: "die Zuständigkeit", tr: "sorumluluk alanı", en: "area of responsibility" },
      { de: "termingerecht", tr: "süresinde", en: "on schedule" },
      { de: "nachfassen", tr: "takip etmek", en: "to follow up" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Ekibine kısa bir e-posta yaz: yaklaşan bir teslim için kimin neyi üstlendiğini, kimin baş sorumlu olduğunu ve hangi koşulla süreye uyulacağını bildir. En az bir kez edilgen yerine geçen bir yapı (lässt sich … / ist zu …), bir kez de koşullu söz (sofern ya da es sei denn) kullan. Kimseyi köşeye sıkıştırmadan, ama kim ne yapacak belirsiz kalmadan yaz.",
        checklist: [
          "Kimin neyi üstlendiği açık mı?",
          "Baş sorumlu kim, yazıldı mı?",
          "En az bir lässt sich ya da ist zu yapısı var mı?",
          "Süre bir koşula bağlandı mı (sofern / es sei denn)?",
        ],
        minWords: 70,
        phrases: [
          { de: "Federführend ist …", tr: "baş sorumlu …", en: "the lead is …" },
          { de: "Das lässt sich bis … erledigen.", tr: "bu …-e kadar halledilebilir", en: "that can be done by …" },
          { de: "Sofern nichts dazwischenkommt, …", tr: "aksilik çıkmazsa …", en: "provided nothing comes up …" },
        ],
        sample:
          "Liebes Team,\n\n" +
          "kurz zur Abgabe am Freitag, damit niemand raten muss.\n\n" +
          "Federführend ist Frau Sahin. Sie sammelt die Zahlen und schickt die Endfassung raus. Herr Weber liefert bis Mittwoch die Daten aus der Technik; das lässt sich seiner Aussage nach bis Dienstagabend erledigen. Alles Weitere ist noch zu prüfen und gehört ausdrücklich nicht zu dieser Zuständigkeit — bitte nichts nebenbei mitmachen.\n\n" +
          "Sofern die Daten am Mittwoch da sind, arbeiten wir termingerecht und behalten einen Tag Pufferzeit. Es sei denn, in der Technik gibt es einen Engpass; dann sagt mir Herr Weber bitte am Dienstag Bescheid, und ich fasse bei der Leitung nach.\n\n" +
          "Danke euch. Fragen gern direkt an mich, nicht in die große Runde.\n\n" +
          "Viele Grüße",
      },
    ],
  },
];
