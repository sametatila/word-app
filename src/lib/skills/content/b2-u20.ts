import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 20 — "Bugünü yarına karşı tartmak".
 *
 * Dört ders: Der mutige Wechsel · An später denken · Das zweite Standbein ·
 * Das Hobby, das Geld frisst. Dördü de aynı hesabı yapıyor: şimdiki rahatlık
 * ile ilerideki sonuç arasında seçim. obwohl beklenene rağmen atılan adımı
 * anlatır, öznel kip geleceğe dair tahmini işaretler, genitif edatları koşulu
 * resmî kayda taşır, dessen/deren ise masrafı sahibiyle birlikte anar.
 *
 *   Ünite 20: der Wechsel, bereuen, die Stellenanzeige, das Anforderungsprofil,
 *             das Auswahlverfahren, antreten, ausscheiden, betriebsbedingt ·
 *             die Altersvorsorge, die Rentenversicherung, die Betriebsrente,
 *             der Ruhestand, die Berufsunfähigkeit, der Zuschuss, die Lücke,
 *             vorzeitig · nebenberuflich, die Genehmigung,
 *             die Sozialversicherung, das Arbeitslosengeld, aufstocken,
 *             einträglich, unentgeltlich, die Erschöpfung · die Ausrüstung,
 *             die Leidenschaft, die Mitgliedschaft, der Zeitvertreib,
 *             die Ratenzahlung, der Haushaltsplan, kostspielig, maßvoll
 *   Kalıplar: Obwohl …, … · Die Rente dürfte … · Wer früh anfängt, … ·
 *             während der Woche · trotz der Belastung ·
 *             ein Hobby, dessen Kosten … · Das ist es mir wert
 *
 * obwohl ile trotz aynı ilişkiyi kurar ama biri yan cümle, öteki edat öbeği
 * ister. Türkçe "rağmen" ikisini de karşıladığı için öğrenci sık sık
 * "obwohl der Belastung" gibi karma bir biçim üretir; bu ünite ikisini yan
 * yana koyup ayırt ettiriyor.
 */
export const b2U20: SkillExercise[] = [
  {
    id: "b2-u20-r1",
    level: "B2",
    skill: "reading",
    unit: 20,
    title: "An später denken",
    genre: "Bilgilendirme yazısı",
    intro: "Emeklilik birikimi üzerine bir rehber yazı. Tahmin bildiren kiplere dikkat et.",
    gloss: [
      { de: "die Altersvorsorge", tr: "emeklilik birikimi", en: "retirement provision" },
      { de: "die Rentenversicherung", tr: "emeklilik sigortası", en: "pension insurance" },
      { de: "die Betriebsrente", tr: "işyeri emekliliği", en: "company pension" },
      { de: "der Ruhestand", tr: "emeklilik", en: "retirement" },
      { de: "die Berufsunfähigkeit", tr: "iş göremezlik", en: "occupational disability" },
      { de: "der Zuschuss", tr: "sübvansiyon", en: "subsidy" },
      { de: "die Lücke", tr: "boşluk", en: "gap" },
      { de: "vorzeitig", tr: "vaktinden önce", en: "early" },
    ],
    minutes: 6,
    text:
      "AN SPÄTER DENKEN — OHNE PANIK\n\n" +
      "Die gesetzliche Rentenversicherung wird auch in dreißig Jahren zahlen. Sie dürfte nur weniger zahlen, gemessen am letzten Nettoeinkommen. Wer diesen Satz akzeptiert, kann anfangen zu rechnen; wer ihn dramatisiert, kauft am Ende das falsche Produkt.\n\n" +
      "Die erste Frage lautet deshalb nicht „welche Anlage“, sondern: Wie groß ist meine Lücke? Die jährliche Renteninformation nennt einen Betrag. Ziehen Sie davon nichts ab und rechnen Sie ehrlich, was Sie im Ruhestand brauchen werden — Miete oder abbezahltes Haus macht den größten Unterschied, größer als jede Rendite.\n\n" +
      "Die zweite Frage betrifft den Zuschuss. Viele Arbeitgeber zahlen zur Betriebsrente etwas dazu, oft mehr, als Beschäftigte glauben. Wer das nicht abruft, verschenkt Geld, das nirgendwo sonst so sicher zu bekommen ist. Fragen Sie in der Personalabteilung nach, nicht bei einem Vertreter.\n\n" +
      "Die dritte Frage ist die unbequemste. Bevor Sie fürs Alter sparen, sichern Sie den Fall ab, in dem Sie vorher nicht mehr arbeiten können. Eine Berufsunfähigkeit trifft statistisch etwa jede vierte Person vor dem Rentenalter, und keine Altersvorsorge hilft dann weiter.\n\n" +
      "Und der vorzeitige Ruhestand? Er kostet dauerhaft: pro Monat, den man früher geht, sinkt die Rente um 0,3 Prozent — lebenslang, nicht bis zum regulären Alter. Bei zwei Jahren sind das gut sieben Prozent.\n\n" +
      "Ein Trost zum Schluss: Wer früh anfängt, muss wenig zahlen. Wer spät anfängt, muss viel zahlen. Wer gar nicht anfängt, muss später sparen, und zwar an sich selbst.",
    questions: [
      {
        kind: "gapfill",
        text: "Die gesetzliche Rente ___ weniger zahlen, gemessen am letzten Nettoeinkommen.",
        options: [],
        answer: 0,
        accept: ["dürfte"],
        explain: "dürfte öznel kip olarak tahmin bildirir, kesinlik değil.",
      },
      {
        text: "Was macht laut Text den größten Unterschied im Ruhestand?",
        options: [
          "die Rendite der Anlage",
          "Miete oder abbezahltes Haus",
          "der Zeitpunkt des Renteneintritts",
        ],
        answer: 1,
        explain: "„Miete oder abbezahltes Haus macht den größten Unterschied, größer als jede Rendite.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man vor der Altersvorsorge absichern?",
        options: [],
        answer: 0,
        accept: ["die Berufsunfähigkeit", "Berufsunfähigkeit", "das Nicht-mehr-arbeiten-Können"],
        explain: "„Bevor Sie fürs Alter sparen, sichern Sie den Fall ab, in dem Sie vorher nicht mehr arbeiten können.“",
      },
      {
        text: "Wie viel kostet ein Monat früherer Ruhestand?",
        options: ["0,3 Prozent lebenslang", "3 Prozent einmalig", "gar nichts"],
        answer: 0,
        explain: "„…pro Monat, den man früher geht, sinkt die Rente um 0,3 Prozent — lebenslang.“",
      },
      {
        text: "Beim Zuschuss zur Betriebsrente soll man einen Vertreter fragen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Fragen Sie in der Personalabteilung nach, nicht bei einem Vertreter.“",
      },
    ],
  },

  {
    id: "b2-u20-r2",
    level: "B2",
    skill: "reading",
    unit: 20,
    title: "Das zweite Standbein",
    genre: "Danışma metni",
    intro: "Ek iş üzerine bir danışma yazısı. Koşulların hangi edatlarla verildiğine dikkat et.",
    gloss: [
      { de: "nebenberuflich", tr: "yan iş olarak", en: "on the side" },
      { de: "die Genehmigung", tr: "izin", en: "permission" },
      { de: "die Sozialversicherung", tr: "sosyal sigorta", en: "social insurance" },
      { de: "das Arbeitslosengeld", tr: "işsizlik maaşı", en: "unemployment benefit" },
      { de: "aufstocken", tr: "takviye etmek", en: "to top up" },
      { de: "einträglich", tr: "gelir getiren", en: "lucrative" },
      { de: "unentgeltlich", tr: "bedelsiz", en: "unpaid" },
      { de: "die Erschöpfung", tr: "tükenmişlik", en: "exhaustion" },
    ],
    minutes: 6,
    text:
      "DAS ZWEITE STANDBEIN — WAS SIE VORHER KLÄREN SOLLTEN\n\n" +
      "Ein Nebenjob ist erlaubt. Trotz dieses Grundsatzes gilt er nicht ohne Bedingungen, und die drei wichtigsten stehen selten im Arbeitsvertrag, sondern im Gesetz.\n\n" +
      "Erstens die Anzeige. Wer nebenberuflich arbeitet, muss das dem Hauptarbeitgeber in der Regel mitteilen; eine Genehmigung ist nur nötig, wenn der Vertrag sie ausdrücklich verlangt. Verboten werden darf eine Tätigkeit nur, wenn sie dem Hauptarbeitgeber Konkurrenz macht oder die Arbeitsleistung beeinträchtigt.\n\n" +
      "Zweitens die Arbeitszeit. Während der Woche zählen beide Tätigkeiten zusammen. Die gesetzliche Höchstarbeitszeit gilt für die Person, nicht pro Vertrag — wer im Hauptjob acht Stunden arbeitet, darf abends nicht noch einmal sechs anhängen. Das ist kein Formalismus: Die häufigste Folge eines zu großen zweiten Standbeins ist Erschöpfung, und die trifft zuerst den Hauptjob.\n\n" +
      "Drittens Steuern und Sozialversicherung. Bis zur Minijob-Grenze bleibt es einfach; darüber wird es schnell unübersichtlich, weil dann Beiträge auf beide Einkommen anfallen können. Wer Arbeitslosengeld bezieht und dazuverdient, muss den Verdienst melden — bis zu einem Freibetrag darf aufgestockt werden, darüber wird angerechnet.\n\n" +
      "Und die Frage, ob es sich lohnt? Rechnen Sie den Stundensatz nach Steuern, nicht brutto. Manche Nebentätigkeit ist deutlich weniger einträglich, als sie aussieht. Und eine unentgeltliche Tätigkeit im Verein ist kein Nebenjob — sie fällt unter keine dieser Regeln, kostet aber dieselbe Zeit.",
    questions: [
      {
        kind: "gapfill",
        text: "___ der Woche zählen beide Tätigkeiten zusammen.",
        options: [],
        answer: 0,
        accept: ["Während"],
        explain: "während genitif ister ve zaman aralığı bildirir.",
      },
      {
        text: "Wann darf eine Nebentätigkeit verboten werden?",
        options: [
          "immer, wenn der Arbeitgeber es will",
          "wenn sie Konkurrenz macht oder die Arbeitsleistung beeinträchtigt",
          "nur bei Selbstständigkeit",
        ],
        answer: 1,
        explain: "„Verboten werden darf eine Tätigkeit nur, wenn sie dem Hauptarbeitgeber Konkurrenz macht oder die Arbeitsleistung beeinträchtigt.“",
      },
      {
        kind: "short_answer",
        text: "Für wen gilt die gesetzliche Höchstarbeitszeit?",
        options: [],
        answer: 0,
        accept: ["für die Person", "für den Menschen", "nicht pro Vertrag"],
        explain: "„Die gesetzliche Höchstarbeitszeit gilt für die Person, nicht pro Vertrag.“",
      },
      {
        text: "Wie soll man prüfen, ob sich ein Nebenjob lohnt?",
        options: [
          "den Stundensatz nach Steuern rechnen",
          "den Bruttolohn vergleichen",
          "die Wochenstunden zählen",
        ],
        answer: 0,
        explain: "„Rechnen Sie den Stundensatz nach Steuern, nicht brutto.“",
      },
      {
        text: "Eine unentgeltliche Tätigkeit im Verein gilt als Nebenjob.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…ist kein Nebenjob — sie fällt unter keine dieser Regeln, kostet aber dieselbe Zeit.“",
      },
    ],
  },

  {
    id: "b2-u20-l1",
    level: "B2",
    skill: "listening",
    unit: 20,
    title: "Der mutige Wechsel",
    genre: "Diyalog",
    intro: "İş değiştiren biri anlatıyor. Beklenene rağmen atılan adıma dikkat et.",
    gloss: [
      { de: "der Wechsel", tr: "geçiş", en: "change" },
      { de: "bereuen", tr: "pişman olmak", en: "to regret" },
      { de: "die Stellenanzeige", tr: "iş ilanı", en: "job advert" },
      { de: "das Anforderungsprofil", tr: "aranan nitelikler", en: "job requirements" },
      { de: "das Auswahlverfahren", tr: "seçim süreci", en: "selection process" },
      { de: "antreten", tr: "göreve başlamak", en: "to take up a post" },
      { de: "ausscheiden", tr: "işten ayrılmak", en: "to leave" },
      { de: "betriebsbedingt", tr: "işletme gereği", en: "for operational reasons" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Wanda", text: "Obwohl die Stelle sicher war, bin ich gegangen. Das verstehen viele nicht." },
      { speaker: "Levin", text: "Und? Bereust du es?" },
      { speaker: "Wanda", text: "Keinen Tag. Aber die ersten drei Monate nach dem Wechsel waren hart." },
      { speaker: "Levin", text: "Wie hast du die neue Stelle gefunden?" },
      { speaker: "Wanda", text: "Über eine ganz normale Stellenanzeige. Ich hätte nach dem Anforderungsprofil eigentlich nicht gepasst." },
      { speaker: "Levin", text: "Und trotzdem hat es geklappt?" },
      { speaker: "Wanda", text: "Im Auswahlverfahren zählte am Ende etwas anderes: zwei Projekte, die ich vorher geleitet hatte." },
      { speaker: "Levin", text: "Wann hast du angetreten?" },
      { speaker: "Wanda", text: "Im September, direkt nach dem Urlaub. Das war eine gute Entscheidung." },
      { speaker: "Levin", text: "Bei uns scheiden gerade drei Leute aus, betriebsbedingt." },
      { speaker: "Wanda", text: "Dann würde ich anfangen zu suchen, bevor es dich trifft. Aus einer Stelle heraus verhandelt man besser." },
      { speaker: "Levin", text: "Das stimmt wahrscheinlich. Trotz allem hoffe ich noch, dass es sich beruhigt." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Wanda'nın kararını anlattığı ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Obwohl die Stelle sicher war, bin ich gegangen."],
        explain: "obwohl yan cümle kurar: fiil sonda; ana cümle çekimli fiille başlar.",
      },
      {
        text: "Wie hat Wanda die Stelle gefunden?",
        options: [
          "über eine Stellenanzeige",
          "über einen Bekannten",
          "über die Personalabteilung",
        ],
        answer: 0,
        explain: "„Über eine ganz normale Stellenanzeige.“",
      },
      {
        kind: "short_answer",
        text: "Was zählte im Auswahlverfahren am Ende?",
        options: [],
        answer: 0,
        accept: ["zwei geleitete Projekte", "ihre Projekterfahrung", "zwei Projekte"],
        explain: "„…zwei Projekte, die ich vorher geleitet hatte.“",
      },
      {
        text: "Was rät Wanda dem Kollegen?",
        options: [
          "abzuwarten",
          "zu suchen, bevor es ihn trifft",
          "sofort zu kündigen",
        ],
        answer: 1,
        explain: "„Dann würde ich anfangen zu suchen, bevor es dich trifft.“",
      },
      {
        text: "Wanda bereut den Wechsel.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Keinen Tag. Aber die ersten drei Monate nach dem Wechsel waren hart.“",
      },
    ],
  },

  {
    id: "b2-u20-l2",
    level: "B2",
    skill: "listening",
    unit: 20,
    title: "Das Hobby, das Geld frisst",
    genre: "Diyalog",
    intro: "Pahalı bir hobi konuşuluyor. Masrafın nasıl anlatıldığına dikkat et.",
    gloss: [
      { de: "die Ausrüstung", tr: "ekipman", en: "equipment" },
      { de: "die Leidenschaft", tr: "tutku", en: "passion" },
      { de: "die Mitgliedschaft", tr: "üyelik", en: "membership" },
      { de: "der Zeitvertreib", tr: "vakit geçirme", en: "pastime" },
      { de: "die Ratenzahlung", tr: "taksitle ödeme", en: "instalment plan" },
      { de: "der Haushaltsplan", tr: "bütçe planı", en: "household budget" },
      { de: "kostspielig", tr: "masraflı", en: "expensive" },
      { de: "maßvoll", tr: "ölçülü", en: "moderate" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ronja", text: "Ein Hobby, dessen Kosten man einmal ausrechnet, ist danach ein anderes Hobby." },
      { speaker: "Kemal", text: "So schlimm?" },
      { speaker: "Ronja", text: "Ausrüstung, Mitgliedschaft, Fahrten. Bei mir sind es knapp zweitausend im Jahr." },
      { speaker: "Kemal", text: "Das ist kostspielig. Und trotz der Kosten machst du weiter?" },
      { speaker: "Ronja", text: "Ja. Das ist es mir wert — es ist kein Zeitvertreib, es ist eine Leidenschaft." },
      { speaker: "Kemal", text: "Wie bekommst du das in den Haushaltsplan?" },
      { speaker: "Ronja", text: "Ich habe es zu einem festen Posten gemacht. Danach war es leichter, an anderer Stelle maßvoll zu sein." },
      { speaker: "Kemal", text: "Und die große Anschaffung letztes Jahr?" },
      { speaker: "Ronja", text: "Auf Ratenzahlung. Ich würde es heute nicht mehr so machen, aber es lief gut." },
      { speaker: "Kemal", text: "Warum nicht mehr so?" },
      { speaker: "Ronja", text: "Weil Raten die Entscheidung leicht machen. Bar hätte ich länger nachgedacht." },
      { speaker: "Kemal", text: "Das ist ein guter Punkt. Bei mir wäre es das Fotografieren." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Ronja'nın hobiyi tarif ettiği ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Ein Hobby, dessen Kosten man einmal ausrechnet, ist danach ein anderes Hobby."],
        explain: "dessen nötr sahip için; ardından gelen ad artikel almaz.",
      },
      {
        text: "Wie viel kostet Ronjas Hobby im Jahr?",
        options: ["knapp zweitausend", "knapp fünfhundert", "das sagt sie nicht"],
        answer: 0,
        explain: "„Bei mir sind es knapp zweitausend im Jahr.“",
      },
      {
        kind: "short_answer",
        text: "Wie hat Ronja das Hobby in den Haushaltsplan gebracht?",
        options: [],
        answer: 0,
        accept: ["als festen Posten", "fester Posten", "sie plant es fest ein"],
        explain: "„Ich habe es zu einem festen Posten gemacht.“",
      },
      {
        text: "Warum würde Ronja die Ratenzahlung heute nicht mehr wählen?",
        options: [
          "weil Raten die Entscheidung leicht machen",
          "weil die Zinsen zu hoch waren",
          "weil sie das Geld nicht hatte",
        ],
        answer: 0,
        explain: "„Weil Raten die Entscheidung leicht machen. Bar hätte ich länger nachgedacht.“",
      },
      {
        text: "Ronja nennt ihr Hobby einen Zeitvertreib.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…es ist kein Zeitvertreib, es ist eine Leidenschaft.“",
      },
    ],
  },

  {
    id: "b2-u20-w1",
    level: "B2",
    skill: "writing",
    unit: 20,
    title: "obwohl mi trotz mi",
    genre: "Cümle kurma",
    intro: "İkisi de karşıtlık kurar: obwohl yan cümle ister, trotz genitif bir ad öbeği.",
    gloss: [
      { de: "bereuen", tr: "pişman olmak", en: "to regret" },
      { de: "die Belastung", tr: "yük", en: "strain" },
      { de: "die Ausrüstung", tr: "ekipman", en: "equipment" },
      { de: "vorzeitig", tr: "vaktinden önce", en: "early" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İş güvenli olmasına rağmen ayrıldım.",
        answer: "Obwohl die Stelle sicher war, bin ich gegangen",
        hint: "obwohl yan cümle kurar; fiil sonda, ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Yüke rağmen devam ediyor.",
        answer: "Trotz der Belastung macht er weiter",
        hint: "trotz genitifli bir ad öbeği ister, yan cümle değil.",
      },
      {
        kind: "build",
        tr: "Emeklilik son net gelire göre daha az ödeyecek gibi görünüyor.",
        answer: "Die Rente dürfte weniger zahlen, gemessen am letzten Nettoeinkommen",
        hint: "dürfte tahmin bildirir; gemessen an ölçütü verir.",
      },
      {
        kind: "build",
        tr: "Masrafları hesaplanan bir hobi.",
        answer: "Ein Hobby, dessen Kosten man ausrechnet",
        hint: "Sahip nötr olduğu için dessen; ardından gelen ad artikelsiz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi trotz ile yaz: yan cümleyi ad öbeğine çevir.",
        source: "Obwohl es kostspielig ist, mache ich weiter.",
        answer: "Trotz der Kosten mache ich weiter.",
        alternatives: [
          "Trotz der Kosten mache ich weiter",
          "Trotz der hohen Kosten mache ich weiter.",
        ],
        why: "obwohl ile trotz aynı karşıtlığı kurar ama farklı şeyler ister: obwohl bir yan cümle, trotz genitifli bir ad öbeği. Türkçedeki 'rağmen' ikisini de karşıladığı için 'obwohl der Kosten' gibi karma biçimler üretiliyor - bu Almancada olmayan bir yapı.",
      },
    ],
  },

  {
    id: "b2-u20-w2",
    level: "B2",
    skill: "writing",
    unit: 20,
    title: "Die Entscheidungsnotiz",
    genre: "Karar notu",
    intro: "Vermek üzere olduğun bir kararı kendine yaz — iki tarafı da dürüstçe.",
    gloss: [
      { de: "der Wechsel", tr: "geçiş", en: "change" },
      { de: "die Lücke", tr: "boşluk", en: "gap" },
      { de: "aufstocken", tr: "takviye etmek", en: "to top up" },
      { de: "maßvoll", tr: "ölçülü", en: "moderate" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Şimdiki rahatlık ile ilerideki sonuç arasında seçim gerektiren bir kararı kendine not olarak yaz: iş değiştirmek, ek iş almak, pahalı bir şeye başlamak, birikim yapmaya başlamak. Şu sırayı tut: karar ne, şimdi ne kaybediyorsun, ileride ne kazanıyorsun, en büyük risk ve bugünkü kararın. En az bir obwohl yan cümlesi ve en az bir trotz ya da während ile kurulmuş genitif öbeği kullan. Kendini ikna etmeye çalışma; karşı tarafı da tam yaz.",
        checklist: [
          "Karar tek cümlede açıkça yazıldı mı?",
          "Şimdiki kayıp ile ilerideki kazanç ayrı mı?",
          "En az bir obwohl yan cümlesi var mı?",
          "En az bir trotz ya da während genitif öbeği var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Obwohl die Stelle sicher ist, …", tr: "iş güvenli olmasına rağmen …", en: "although the job is secure, …" },
          { de: "Trotz der Belastung …", tr: "yüke rağmen …", en: "despite the strain …" },
          { de: "Während der ersten Monate …", tr: "ilk aylar boyunca …", en: "during the first months …" },
        ],
        sample:
          "ENTSCHEIDUNGSNOTIZ — WECHSEL JA ODER NEIN\n\n" +
          "Die Frage: Bewerbe ich mich auf die Stelle in Kassel oder bleibe ich?\n\n" +
          "Was ich jetzt verliere. Obwohl die Stelle hier sicher ist und ich alle kenne, ist genau das der Punkt: Ich lerne seit zwei Jahren nichts Neues. Beim Wechsel verliere ich zwölf Jahre Vertrautheit, einen kurzen Weg und die Betriebsrente in ihrer jetzigen Form.\n\n" +
          "Was ich später gewinne. Fachlich zwei Stufen, die es hier nicht gibt. Finanziell etwa neun Prozent mehr; die Lücke in der Altersvorsorge könnte ich damit endlich aufstocken statt sie jedes Jahr zu verschieben.\n\n" +
          "Das größte Risiko. Während der ersten Monate wäre ich niemand — kein Ruf, keine Kontakte, keine Routine. Trotz der besseren Bezahlung könnte das anstrengender werden, als ich mir das heute ausmale. Und ich weiß nicht, ob mir das neue Team liegt.\n\n" +
          "Mein Stand heute. Ich bewerbe mich, ohne zu kündigen. Aus einer Stelle heraus verhandelt man besser, und ich muss die Entscheidung erst treffen, wenn ich ein Angebot habe. Bis dahin bleibe ich maßvoll optimistisch und sage niemandem etwas.",
      },
    ],
  },
];
