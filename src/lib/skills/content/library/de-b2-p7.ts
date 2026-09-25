import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 iş ve otomasyon hattı: bir blog yazısı, iki meslektaş arasında
 * konuşma, bir iş arkadaşına yazılan mektup. Dil bilgisi geçmişteki
 * gerçekdışı koşul — Konjunktiv II'nin geçmiş biçimi.
 */
export const deB2P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r7",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Was die Maschine mir abgenommen hat",
    genre: "blog",
    intro: "Bir çevirmen kendi işindeki değişimi anlatıyor: ne kayboldu, ne başka bir şeye dönüştü.",
    gloss: [
      { de: "die Ironie", tr: "ironi", en: "irony" },
      { de: "der Entwurf", tr: "taslak", en: "draft" },
      { de: "die Nuance", tr: "nüans", en: "nuance" },
      { de: "der Fachbegriff", tr: "terim", en: "technical term" },
      { de: "der Auftraggeber", tr: "işveren", en: "client" },
      { de: "die Routine", tr: "rutin", en: "routine" },
    ],
    minutes: 8,
    text:
      "Was die Maschine mir abgenommen hat\n\n" +
      "Vor fünf Jahren habe ich einen Text zuerst gelesen, dann übersetzt und am Ende " +
      "überarbeitet. Heute lese ich einen fertigen Entwurf und entscheide Satz für Satz, " +
      "ob er bleiben darf. Die Arbeit ist nicht weniger geworden, aber sie ist eine andere.\n\n" +
      "Was wirklich verschwunden ist, ist die Routine: die mittleren Sätze, die man auch müde " +
      "richtig hinbekommt. Übrig bleiben die schwierigen Stellen — Ironie, Fachbegriffe, " +
      "Nuancen zwischen „möglich“ und „wahrscheinlich“. Ein ganzer Tag besteht jetzt nur noch " +
      "aus diesen Stellen, und das ist anstrengender, als es klingt.\n\n" +
      "Hätte mir das jemand vor fünf Jahren erzählt, ich hätte mich gefreut. " +
      "Wer will schon die langweiligen Sätze? Heute weiß ich, dass die Routine auch eine " +
      "Funktion hatte: Sie gab dem Kopf zwischendurch Pausen.\n\n" +
      "Verändert hat sich auch das Gespräch mit den Auftraggebern. Früher ging es um Termine " +
      "und Preise, heute muss ich regelmäßig erklären, warum ein Entwurf, der flüssig klingt, " +
      "trotzdem falsch sein kann. Das ist eine Aufgabe, auf die mich niemand vorbereitet hat.\n\n" +
      "Wäre ich heute zwanzig, würde ich den Beruf wieder lernen — aber ich würde von Anfang " +
      "an üben, Fehler zu erklären und nicht nur, sie zu vermeiden.",
    questions: [
      {
        text: "Wie hat sich die Arbeit der Autorin verändert?",
        options: [
          "Sie ist deutlich weniger geworden.",
          "Sie besteht heute vor allem aus schwierigen Stellen.",
          "Sie übersetzt heute nur noch Fachtexte.",
        ],
        answer: 1,
        explain: "Rutin kısımlar kaybolmuş, geriye zor yerler kalmış.",
      },
      {
        text: "Welche Funktion hatte die Routine?",
        options: [
          "Sie brachte mehr Geld.",
          "Sie gab dem Kopf Pausen.",
          "Sie war bei Auftraggebern beliebt.",
        ],
        answer: 1,
        explain: "„Sie gab dem Kopf zwischendurch Pausen.“",
      },
      {
        kind: "truefalse",
        text: "Die Autorin hätte diese Entwicklung früher bedauert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Hätte mir das jemand vor fünf Jahren erzählt, ich hätte mich gefreut.“",
      },
      {
        kind: "gapfill",
        text: "Die Autorin liest heute einen fertigen ___ und prüft ihn Satz für Satz.",
        options: [],
        answer: 0,
        accept: ["Entwurf"],
        explain: "„Heute lese ich einen fertigen Entwurf.“",
      },
      {
        kind: "short_answer",
        text: "Worum ging es früher im Gespräch mit Auftraggebern?",
        options: [],
        answer: 0,
        accept: ["um Termine und Preise", "Termine und Preise", "Preise und Termine"],
        explain: "„Früher ging es um Termine und Preise“ — bugün konu taslağın neden yanlış olabileceği.",
      },
      {
        text: "Was würde sie heute anders lernen?",
        options: [
          "Fehler erklären, nicht nur vermeiden",
          "schneller tippen",
          "mehr Fachbegriffe auswendig lernen",
        ],
        answer: 0,
        explain: "Son cümle tam bunu söylüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l7",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Hätten wir früher reagieren müssen?",
    genre: "dialogue",
    intro: "İki meslektaş biten bir projeyi konuşuyor: nerede yanlış gitti, kim ne zaman ne bilebilirdi.",
    gloss: [
      { de: "der Zeitplan", tr: "zaman planı", en: "schedule" },
      { de: "die Rückmeldung", tr: "geri bildirim", en: "feedback" },
      { de: "einschätzen", tr: "değerlendirmek", en: "to assess" },
      { de: "eskalieren", tr: "üst makama taşımak", en: "to escalate" },
      { de: "der Vorwurf", tr: "suçlama", en: "reproach" },
      { de: "im Nachhinein", tr: "sonradan bakınca", en: "in hindsight" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Frau Jansen", text: "Ich gehe das Projekt noch einmal durch. Ab wann war eigentlich klar, dass der Zeitplan nicht hält?" },
      { speaker: "Herr Petrov", text: "Ehrlich? Im Nachhinein schon im März. Damals kamen die Rückmeldungen aus der Fachabteilung zwei Wochen zu spät." },
      { speaker: "Frau Jansen", text: "Und warum haben wir nicht reagiert? Hätten wir das damals eskaliert, wären uns vier Monate Ärger erspart geblieben." },
      { speaker: "Herr Petrov", text: "Weil zwei Wochen damals nach einem einmaligen Ausrutscher aussahen. Das war schwer anders einzuschätzen." },
      { speaker: "Frau Jansen", text: "Das ist kein Vorwurf, ich will nur verstehen, woran wir es hätten sehen können." },
      { speaker: "Herr Petrov", text: "Am zweiten Mal, würde ich sagen. Wenn dieselbe Verzögerung zweimal auftritt, ist es ein Muster und kein Zufall." },
      { speaker: "Frau Jansen", text: "Dann schreiben wir genau das in die Lessons Learned: beim zweiten Mal eskalieren, nicht beim vierten." },
      { speaker: "Herr Petrov", text: "Und wir brauchen jemanden, der das beobachtet. Wir beide waren mittendrin und haben es deshalb nicht gesehen." },
      { speaker: "Frau Jansen", text: "Guter Punkt. Ich schlage vor, bei größeren Projekten eine Person von außen mit auf die Liste zu setzen." },
    ],
    questions: [
      {
        text: "Wann war im Nachhinein das Problem erkennbar?",
        options: ["im Januar", "im März", "erst im Sommer"],
        answer: 1,
        explain: "„Im Nachhinein schon im März“ — geri bildirimler iki hafta gecikmiş.",
      },
      {
        text: "Warum hat damals niemand reagiert?",
        options: [
          "Es sah nach einem einmaligen Ausrutscher aus.",
          "Niemand war zuständig.",
          "Die Abteilung hat nichts gemeldet.",
        ],
        answer: 0,
        explain: "„Weil zwei Wochen damals nach einem einmaligen Ausrutscher aussahen.“",
      },
      {
        kind: "truefalse",
        text: "Frau Jansen macht Herrn Petrov einen Vorwurf.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Das ist kein Vorwurf, ich will nur verstehen.“",
      },
      {
        kind: "gapfill",
        text: "Die neue Regel lautet: beim ___ Mal eskalieren.",
        options: [],
        answer: 0,
        accept: ["zweiten", "2."],
        explain: "„beim zweiten Mal eskalieren, nicht beim vierten“.",
      },
      {
        kind: "short_answer",
        text: "Wen wollen sie künftig zusätzlich einbeziehen?",
        options: [],
        answer: 0,
        accept: ["eine Person von außen", "jemanden von außen", "eine externe Person"],
        explain: "„eine Person von außen mit auf die Liste zu setzen“.",
      },
      {
        text: "Warum haben die beiden das Muster nicht gesehen?",
        options: [
          "Sie waren selbst mitten im Projekt.",
          "Sie waren im Urlaub.",
          "Die Zahlen waren falsch.",
        ],
        answer: 0,
        explain: "„Wir beide waren mittendrin und haben es deshalb nicht gesehen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w7",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Brief an eine ehemalige Kollegin",
    genre: "letter",
    intro: "Eski bir iş arkadaşına yazıyorsun: önce iki cümle kur, sonra hem haber veren hem tavsiye isteyen bir mektup yaz.",
    gloss: [
      { de: "die Umstellung", tr: "geçiş", en: "transition" },
      { de: "zögern", tr: "tereddüt etmek", en: "to hesitate" },
      { de: "der Rat", tr: "tavsiye", en: "advice" },
      { de: "die Gelegenheit", tr: "fırsat", en: "opportunity" },
      { de: "bereuen", tr: "pişman olmak", en: "to regret" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "O zaman kabul etseydim bugün başka bir şehirde olurdum.",
        answer: "Hätte ich damals zugesagt, wäre ich heute in einer anderen Stadt.",
        alternatives: ["Wenn ich damals zugesagt hätte, wäre ich heute in einer anderen Stadt."],
        hint: "Geçmişteki gerçekdışı koşul: „hätte … zugesagt“ + bugüne bakan sonuç „wäre“.",
      },
      {
        kind: "build",
        tr: "Bunu daha önce bilseydim daha erken sorardım.",
        answer: "Wenn ich das früher gewusst hätte, hätte ich früher gefragt.",
        alternatives: ["Hätte ich das früher gewusst, hätte ich früher gefragt."],
        hint: "İki yan da geçmişte kalıyorsa iki yanda da „hätte + Partizip“ gelir.",
      },
      {
        kind: "free",
        prompt:
          "Eski bir iş arkadaşına mektup yaz: kendi durumundaki değişikliği anlat, geriye dönüp baktığında neyi farklı yapardın söyle, karşındakinin durumunu sor, somut bir tavsiye iste ve buluşma öner.",
        checklist: [
          "Kendi durumundaki değişikliği anlat",
          "Geçmişe bakarak neyi farklı yapardın yaz",
          "Karşı tarafın durumunu sor",
          "Somut bir tavsiye iste ve buluşma öner",
        ],
        minWords: 120,
        phrases: [
          { de: "Es ist lange her, dass wir …", tr: "… üzerinden uzun zaman geçti", en: "It has been a long time since we …" },
          { de: "Inzwischen hat sich einiges verändert: …", tr: "Bu arada bazı şeyler değişti: …", en: "In the meantime, a few things have changed: …" },
          { de: "Im Nachhinein hätte ich wohl …", tr: "Sonradan bakınca herhâlde … yapardım", en: "In hindsight I would probably have …" },
          { de: "Mich würde interessieren, wie du …", tr: "Senin … nasıl … merak ederdim", en: "I would be interested to know how you …" },
          { de: "Für einen Rat wäre ich dir dankbar.", tr: "Bir tavsiyen olursa minnettar olurum.", en: "I would be grateful for any advice." },
        ],
        sample:
          "Liebe Christina, es ist lange her, dass wir uns geschrieben haben — zuletzt wohl auf der " +
          "Abschiedsfeier von Herrn Adam. Inzwischen hat sich einiges verändert: Ich arbeite seit Januar " +
          "in der Qualitätssicherung und prüfe Texte, die eine Maschine geschrieben hat. " +
          "Die Umstellung war größer, als ich dachte. Die einfachen Aufgaben sind weg, übrig bleibt " +
          "das Schwierige, und das den ganzen Tag. " +
          "Im Nachhinein hätte ich wohl früher fragen sollen, wie sich die Stelle entwickelt; " +
          "hätte ich das früher gewusst, hätte ich die Einarbeitung anders geplant. " +
          "Bereut habe ich den Wechsel trotzdem nicht. " +
          "Mich würde interessieren, wie du mit der neuen Software in eurer Abteilung zurechtkommst. " +
          "Gibt es bei euch eine feste Regel, wer einen Entwurf freigibt? " +
          "Für einen Rat wäre ich dir dankbar, weil wir gerade genau darüber streiten. " +
          "Und wenn du im Herbst in der Stadt bist, melde dich — ein Kaffee wäre längst fällig. " +
          "Herzliche Grüße, Derya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s7",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Welche Aufgabe würdest du nie abgeben?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir sınır çiz ve gerekçesini savun.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "İşinde ya da okulunda hangi görevi bir makineye asla devretmezdin? Görevi adlandır, gerekçesini anlat, geçmişten bir örnek ver ve fikrinin değişeceği koşulu söyle.",
      bulletsTr: [
        "Hangi görevi devretmeyeceğini tek cümleyle söyle",
        "Gerekçeni anlat",
        "Geçmişten bir örnek ver",
        "Hangi koşulda fikrinin değişeceğini söyle",
      ],
      targets: [
        { de: "Abgeben würde ich vieles, aber nicht …", tr: "Çoğu şeyi devrederdim ama … hayır" },
        { de: "Der Grund liegt weniger in … als in …", tr: "Sebep …'den çok …'de yatıyor" },
        { de: "Rückblickend war das bei … deutlich zu sehen.", tr: "Geriye bakınca bu … olayında açıkça görülüyordu." },
        { de: "Ändern würde sich meine Haltung erst, wenn …", tr: "Tutumum ancak … olursa değişir" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Abgeben würde ich vieles, aber nicht das erste Gespräch mit jemandem, der sich beschwert. " +
        "Der Grund liegt weniger in der Sprache als in dem, was in so einem Gespräch " +
        "nebenbei passiert: Man hört, was der andere eigentlich will, und das steht fast nie im " +
        "ersten Satz. Rückblickend war das bei einem Fall im letzten Jahr deutlich zu sehen. " +
        "Eine Kundin hat sich schriftlich über eine Rechnung beschwert, und ein automatisch " +
        "erzeugtes Antwortschreiben hat ihr korrekt erklärt, dass die Rechnung stimmt. " +
        "Hätte jemand angerufen, wäre in zwei Minuten klar gewesen, dass es gar nicht um das Geld " +
        "ging, sondern darum, dass niemand ihren Namen richtig geschrieben hatte. " +
        "Ändern würde sich meine Haltung erst, wenn ein System zuverlässig sagen könnte: " +
        "Hier geht es um etwas anderes als das, was dasteht. " +
        "Solange das nicht geht, bleibt dieser Teil bei einem Menschen.",
      rubricHint:
        "Somut bir örnek ve bir koşul beklenir; „weniger … als“, geçmiş Konjunktiv II („hätte … angerufen“) ve „erst, wenn“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g7",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Hätte ich das gewusst …",
    genre: "grammar",
    intro: "Olmamış bir geçmişi konuşmak için ayrı bir biçim var; kuruluşu ve sık yapılan hatası burada.",
    focus: "Konjunktiv II der Vergangenheit ve gerçekdışı koşul",
    gloss: [
      { de: "anrufen", tr: "telefon etmek", en: "to call" },
      { de: "zusagen", tr: "kabul etmek", en: "to accept" },
      { de: "informieren", tr: "bilgilendirmek", en: "to inform" },
      { de: "rechtzeitig", tr: "zamanında", en: "in time" },
      { de: "der Zug", tr: "tren", en: "train" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Tek bir geçmiş biçimi var",
        tr: "Konjunktiv II'nin geçmişi her zaman „hätte“ ya da „wäre“ + Partizip II ile kurulur. Perfekt'te hangisini kullanıyorsan onu alırsın: „gemacht“ → hätte gemacht, „gefahren“ → wäre gefahren. Geçmiş için başka bir biçim YOKTUR: „wüsste“, „käme“ gibi biçimler Präteritum kökünden gelse de şimdiki zamanı anlatır.",
        examples: [
          { de: "Ich hätte früher gefragt.", tr: "Daha erken sorardım.", note: "fragen → haben" },
          { de: "Wir wären fast zu spät gekommen.", tr: "Neredeyse geç kalıyorduk.", note: "kommen → sein" },
          { de: "Das hätte ich nicht gedacht.", tr: "Bunu düşünmezdim.", note: "sık kullanılan kalıp" },
        ],
      },
      {
        heading: "Gerçekdışı koşul: iki yan",
        tr: "Koşul da sonuç da geçmişteyse iki yanda da geçmiş biçim gelir. „wenn“ atılabilir; o zaman yan cümle FİİLLE başlar ve virgülden sonra ana cümle gelir. Bu, yazıda çok kullanılan zarif bir biçimdir.",
        examples: [
          { de: "Wenn ich das gewusst hätte, hätte ich abgesagt.", tr: "Bunu bilseydim iptal ederdim.", note: "iki yan da geçmiş" },
          { de: "Hätte ich das gewusst, hätte ich abgesagt.", tr: "Bunu bilseydim iptal ederdim.", note: "„wenn“ düştü, fiil başta" },
          { de: "Wärst du früher losgefahren, hättest du den Zug bekommen.", tr: "Daha erken yola çıksaydın treni yakalardın.", note: "sein + haben karışık" },
        ],
      },
      {
        heading: "Karışık zamanlar ve modal fiiller",
        tr: "Koşul geçmişte, sonuç BUGÜNDE olabilir: „Hätte ich damals zugesagt, wäre ich heute in Berlin.“ Modal fiilli geçmişte ise Partizip yerine MASTAR gelir ve iki mastar yan yana durur: „hätte fragen müssen“, „hätte kommen können“.",
        examples: [
          { de: "Hätte ich damals zugesagt, wäre ich heute in Berlin.", tr: "O zaman kabul etseydim bugün Berlin'de olurdum.", note: "geçmiş koşul, bugün sonuç" },
          { de: "Ich hätte früher fragen müssen.", tr: "Daha erken sormalıydım.", note: "iki mastar" },
          { de: "Du hättest anrufen können.", tr: "Telefon edebilirdin.", note: "sitem bildirir" },
        ],
      },
    ],
    questions: [
      {
        text: "Wenn ich das gewusst hätte, ___ ich abgesagt.",
        options: ["würde", "hätte", "wäre"],
        answer: 1,
        explain: "„absagen“ Perfekt'te haben ile kurulur; Konjunktiv II geçmişte hätte gelir.",
      },
      {
        text: "Wärst du früher losgefahren, ___ du den Zug bekommen.",
        options: ["hättest", "wärst", "würdest"],
        answer: 0,
        explain: "„bekommen“ haben ister; iki yan farklı yardımcı fiil alabilir.",
      },
      {
        text: "Welcher Satz drückt einen Vorwurf aus?",
        options: [
          "Du hättest anrufen können.",
          "Du kannst anrufen.",
          "Du wirst anrufen.",
        ],
        answer: 0,
        explain: "Geçmiş Konjunktiv II modal fiille sitem ya da kaçırılmış bir imkân bildirir.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ früher fragen müssen. (haben, Konjunktiv II)",
        options: [],
        answer: 0,
        accept: ["hätte"],
        explain: "Modal fiilli geçmişte yardımcı fiil hätte'dir ve iki mastar arkadan gelir.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ fast zu spät gekommen. (sein, Konjunktiv II)",
        options: [],
        answer: 0,
        accept: ["wären"],
        explain: "„kommen“ sein ister: wären gekommen.",
      },
      {
        kind: "gapfill",
        text: "___ ich damals zugesagt, wäre ich heute in Berlin. (haben)",
        options: [],
        answer: 0,
        accept: ["Hätte", "hätte"],
        explain: "„wenn“ düşünce yan cümle çekimli fiille başlar.",
      },
      {
        kind: "gapfill",
        text: "Du ___ mich rechtzeitig informieren können. (haben)",
        options: [],
        answer: 0,
        accept: ["hättest"],
        explain: "İkinci tekil kişi: hättest + iki mastar.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Hätte", "ich", "das", "gewusst", "hätte ich abgesagt"],
        explain: "„wenn“siz koşul fiille başlar, Partizip sonda; ardından ana cümle gelir.",
      },
      {
        kind: "truefalse",
        text: "„Wenn ich das wusste, hätte ich abgesagt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Gösterge kipindeki „wusste“ gerçekdışı koşul kuramaz; geçmişte olmamış bir koşul için tek biçim „gewusst hätte“dir.",
      },
      {
        kind: "truefalse",
        text: "„Ich hätte früher fragen müssen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Modal fiilli geçmişte Partizip değil mastar gelir: fragen müssen.",
      },
    ],
  },
];
