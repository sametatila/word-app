import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Kalan türler: popüler bilim yazısı, ders ve deneme. Üçünde de cümle
 * başlarının seçimi belirleyici; dil bilgisi Vorfeld ve bilgi sırası.
 */
export const deC1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r5",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Die Ökonomie des Wartens",
    genre: "Bilim yazısı",
    intro: "Kuyrukların bir tasarım sorusu olduğunu savunan bir yazı okuyacaksın: hangi ilkeler var, öfkeyi ne belirliyor, ne yapılabilir.",
    gloss: [
      { de: "das Ärgernis", tr: "sıkıntı", en: "nuisance" },
      { de: "die Dringlichkeit", tr: "aciliyet", en: "urgency" },
      { de: "sich tarnen", tr: "kılığına girmek", en: "to disguise itself" },
      { de: "wahrgenommen", tr: "algılanan", en: "perceived" },
      { de: "unbeschäftigt", tr: "boş", en: "unoccupied" },
      { de: "die Empörung", tr: "öfke", en: "outrage" },
      { de: "ertragen", tr: "katlanmak", en: "to bear" },
      { de: "die Einsicht", tr: "kavrayış", en: "insight" },
    ],
    minutes: 10,
    text:
      "DIE ÖKONOMIE DES WARTENS\n\n" +
      "Warteschlangen gelten als Ärgernis, nicht als Gestaltungsfrage. Genau darin liegt der Fehler. Wer eine " +
      "Schlange plant, verteilt Zeit, und Zeit ist die einzige Ressource, von der alle gleich viel und niemand " +
      "mehr bekommen kann.\n\n" +
      "Drei Prinzipien stehen zur Wahl. Das erste ist die Reihenfolge des Eintreffens: Wer zuerst kommt, mahlt " +
      "zuerst. Es ist billig, es ist überprüfbar, und es belohnt diejenigen, die früh da sein können. Das zweite " +
      "ist die Dringlichkeit, wie in der Notaufnahme. Es rettet Leben und wird trotzdem regelmäßig als " +
      "ungerecht erlebt, weil der Wartende die Begründung nicht sieht. Das dritte ist der Preis: Wer zahlt, " +
      "wartet kürzer. Am ehrlichsten ist dieses Prinzip dort, wo es offen benannt wird, am problematischsten " +
      "dort, wo es sich als Service tarnt.\n\n" +
      "Interessanter als die Wahl zwischen den dreien ist eine Beobachtung aus der Forschung zur wahrgenommenen " +
      "Wartezeit. Nicht die Dauer bestimmt den Ärger, sondern drei andere Faktoren: unerklärtes Warten wiegt " +
      "schwerer als erklärtes, unbeschäftigtes schwerer als beschäftigtes, und ungerechtes deutlich schwerer als " +
      "beides zusammen. Eine Schlange, in der jemand ohne sichtbaren Grund vorgezogen wird, erzeugt mehr " +
      "Empörung als eine doppelt so lange faire Schlange.\n\n" +
      "Daraus folgen zwei praktische Regeln, die wenig kosten. Erstens: Nennen Sie die Zahl. Eine angezeigte " +
      "Wartezeit von zwanzig Minuten wird besser ertragen als eine unbekannte von zwölf. Zweitens: Machen Sie " +
      "die Regel sichtbar. In Ämtern, in denen an der Wand steht, welche Fälle vorgezogen werden und warum, " +
      "gehen die Beschwerden zurück, ohne dass sich eine einzige Wartezeit verkürzt.\n\n" +
      "Am Ende bleibt eine unbequeme Einsicht. Wartezeit lässt sich selten abschaffen; verteilen muss man sie " +
      "immer. Wer sie nicht sichtbar verteilt, verteilt sie trotzdem — nur nach Kriterien, die niemand " +
      "aufgeschrieben hat und die deshalb auch niemand kritisieren kann.",
    questions: [
      {
        text: "Was ist die zentrale Aussage des Textes?",
        options: [
          "Wartezeit wird immer verteilt, sichtbar oder unsichtbar.",
          "Warteschlangen lassen sich fast überall abschaffen.",
          "Das Preisprinzip ist das gerechteste der drei.",
        ],
        answer: 0,
        explain: "„Wer sie nicht sichtbar verteilt, verteilt sie trotzdem“ — son paragraf tezi açıkça söylüyor.",
      },
      {
        text: "Welcher Faktor wiegt laut Text am schwersten?",
        options: ["empfundene Ungerechtigkeit", "die reine Dauer des Wartens", "die Zahl der offenen Schalter"],
        answer: 0,
        explain: "„… und ungerechtes deutlich schwerer als beides zusammen.“",
      },
      {
        kind: "truefalse",
        text: "Der Text hält das Preisprinzip grundsätzlich für unzulässig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Am ehrlichsten ist dieses Prinzip dort, wo es offen benannt wird“ — sorun ilkede değil, gizlenmesinde.",
      },
      {
        kind: "gapfill",
        text: "Eine angezeigte Wartezeit von zwanzig Minuten wird besser ertragen als eine unbekannte von ___.",
        options: [],
        answer: 0,
        accept: ["zwölf", "12"],
        explain: "„… wird besser ertragen als eine unbekannte von zwölf.“",
      },
      {
        kind: "short_answer",
        text: "Was passiert in Ämtern mit sichtbar ausgehängter Regel?",
        options: [],
        answer: 0,
        accept: ["die Beschwerden gehen zurück", "weniger Beschwerden", "die Beschwerden sinken"],
        explain: "„… gehen die Beschwerden zurück, ohne dass sich eine einzige Wartezeit verkürzt.“",
      },
      {
        text: "Warum wird das Dringlichkeitsprinzip oft als ungerecht erlebt?",
        options: [
          "Die Begründung ist für Wartende unsichtbar.",
          "Es dauert insgesamt deutlich länger.",
          "Es kostet spürbar mehr Personal.",
        ],
        answer: 0,
        explain: "„… wird trotzdem regelmäßig als ungerecht erlebt, weil der Wartende die Begründung nicht sieht.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l5",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Patina: warum Dinge altern dürfen",
    genre: "Ders",
    intro: "Bir ders dinleyeceksin: aşınma neden bazen değer bazen kusur sayılıyor ve bu tasarım için ne anlama geliyor.",
    gloss: [
      { de: "die Abnutzung", tr: "aşınma", en: "wear" },
      { de: "der Mangel", tr: "kusur", en: "defect" },
      { de: "die Seltenheit", tr: "enderlik", en: "rarity" },
      { de: "abgerieben", tr: "aşınmış", en: "worn down" },
      { de: "gerichtet", tr: "yönlü", en: "directed" },
      { de: "die Lesbarkeit", tr: "okunabilirlik", en: "legibility" },
    ],
    minutes: 10,
    segments: [
      { text: "Guten Morgen. Wir beginnen heute mit einem Begriff, der aus der Restaurierung kommt und inzwischen weit darüber hinaus gebraucht wird: Patina." },
      { text: "Gemeint ist zunächst etwas ganz Materielles. Auf Kupfer bildet sich eine grüne Schicht, auf Leder eine dunklere Zone dort, wo die Hand liegt. Diese Schichten entstehen durch Gebrauch." },
      { text: "Interessant wird es bei der Bewertung. Bei einem Auto gilt Abnutzung als Mangel, bei einer Geige als Wert. Beide Male ist es physikalisch dasselbe." },
      { text: "Woran liegt das? Eine gängige Antwort lautet: an der Seltenheit. Diese Antwort greift zu kurz, denn abgenutzte Autos sind nicht seltener als abgenutzte Geigen." },
      { text: "Näher kommt man mit einer zweiten Überlegung. Patina wird dort geschätzt, wo sie Geschichte lesbar macht und wo diese Geschichte zum Gegenstand gehört." },
      { text: "Bei der Geige erzählt die abgeriebene Stelle, dass jemand gespielt hat, und Spielen ist der Zweck des Objekts. Beim Auto erzählt der Kratzer von einem Parkhaus, und Parken ist nicht der Zweck." },
      { text: "Daraus folgt eine Konsequenz für die Gestaltung, die in der Praxis oft übersehen wird. Wer ein Material wählt, wählt immer auch eine Alterungsform." },
      { text: "Manche Oberflächen altern gerichtet: Holz wird genau an den Stellen dunkler, an denen es berührt wird. Andere altern zufällig: Eine weiße Kunststoffkante wird an irgendeiner Stelle grau." },
      { text: "Gerichtetes Altern wird als Geschichte gelesen, zufälliges als Schaden. Das ist keine Frage des Geschmacks, sondern der Lesbarkeit." },
      { text: "Prüfen Sie das an Ihren eigenen Gegenständen. Welche sehen nach fünf Jahren gebraucht aus, welche einfach nur kaputt? Sie werden fast immer einen Materialwechsel finden." },
      { text: "In der nächsten Sitzung sehen wir uns Reparaturspuren an. Dort verschiebt sich die Frage noch einmal, denn eine sichtbare Reparatur behauptet etwas: Dieses Ding war es wert." },
    ],
    questions: [
      {
        text: "Worum geht es in der Vorlesung?",
        options: [
          "warum Abnutzung mal Wert und mal Mangel ist",
          "wie man Kupfer und Leder richtig pflegt",
          "welche Materialien am längsten halten",
        ],
        answer: 0,
        explain: "„Bei einem Auto gilt Abnutzung als Mangel, bei einer Geige als Wert. Beide Male ist es physikalisch dasselbe.“",
      },
      {
        text: "Warum reicht die Erklärung über die Seltenheit nicht?",
        options: [
          "Abgenutzte Autos sind nicht seltener.",
          "Seltenheit lässt sich gar nicht messen.",
          "Geigen sind insgesamt viel seltener.",
        ],
        answer: 0,
        explain: "„… denn abgenutzte Autos sind nicht seltener als abgenutzte Geigen.“",
      },
      {
        kind: "truefalse",
        text: "Für den Dozenten ist die Bewertung von Patina reine Geschmackssache.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Das ist keine Frage des Geschmacks, sondern der Lesbarkeit.“",
      },
      {
        kind: "short_answer",
        text: "Was wählt man laut Vorlesung mit dem Material immer mit?",
        options: [],
        answer: 0,
        accept: ["eine Alterungsform", "die Alterungsform", "Alterungsform"],
        explain: "„Wer ein Material wählt, wählt immer auch eine Alterungsform.“",
      },
      {
        kind: "dictation",
        text: "Dersin son cümlesindeki iddiayı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Dieses Ding war es wert.", "Dieses Ding war es wert"],
        explain: "„Dieses Ding war es wert.“ — görünür bir tamir bunu iddia ediyor.",
      },
      {
        text: "Was unterscheidet gerichtetes von zufälligem Altern?",
        options: [
          "seine Lesbarkeit als Geschichte",
          "seine deutlich höhere Geschwindigkeit",
          "der Preis des verwendeten Materials",
        ],
        answer: 0,
        explain: "„Gerichtetes Altern wird als Geschichte gelesen, zufälliges als Schaden.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w5",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Was ich zu spät verstanden habe",
    genre: "Deneme",
    intro: "Geç anladığın bir şeyi anlatan kısa bir deneme yazacaksın; önce iki cümle kur, sonra denemeyi yaz.",
    gloss: [
      { de: "widerlegen", tr: "çürütmek", en: "to refute" },
      { de: "die Verständigung", tr: "anlaşma", en: "mutual understanding" },
      { de: "die Überzeugung", tr: "kanaat", en: "conviction" },
      { de: "hinreichend", tr: "yeterli", en: "sufficient" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bunu ancak yıllar sonra anladım.",
        answer: "Erst nach Jahren habe ich das verstanden.",
        alternatives: ["Das habe ich erst nach Jahren verstanden."],
        hint: "Cümle başına zaman ifadesi de nesne de gelebilir; seçtiğin öğe neyin öne çıktığını belirler.",
      },
      {
        kind: "build",
        tr: "Beni ikna eden argüman değildi, bir örnekti.",
        answer: "Überzeugt hat mich nicht das Argument, sondern ein Beispiel.",
        alternatives: ["Nicht das Argument hat mich überzeugt, sondern ein Beispiel."],
        hint: "Partizip'i başa almak vurguyu güçlendirir; ikinci diziliş ise olumsuzlanan öğeyi öne çıkarır.",
      },
      {
        kind: "free",
        prompt:
          "Geç anladığın bir şeyi anlat: o zaman neye inanıyordun, seni ne sarstı, bugün ne düşünüyorsun, neden bu kadar uzun sürdü ve eski görüşünden geriye ne kaldı.",
        checklist: [
          "Eski kanaatini ve neden makul göründüğünü yaz",
          "Seni sarsan somut olayı anlat",
          "Bugünkü ayrımını tek cümleyle koy",
          "Neden geç anladığını açıkla ve eski görüşten kalanı söyle",
        ],
        minWords: 120,
        phrases: [
          { de: "Lange habe ich geglaubt, dass …", tr: "Uzun süre … olduğuna inandım" },
          { de: "Widerlegt hat das …", tr: "Bunu çürüten şey … oldu" },
          { de: "Erst nach Jahren habe ich verstanden, …", tr: "Ancak yıllar sonra anladım …" },
          { de: "So lange gedauert hat es, weil …", tr: "Bu kadar uzun sürmesinin nedeni …" },
          { de: "Was bleibt, ist …", tr: "Geriye kalan …" },
        ],
        sample:
          "Lange habe ich geglaubt, dass Missverständnisse an mangelnder Genauigkeit liegen. Wer präzise " +
          "formuliert, dachte ich, wird verstanden; wer nicht verstanden wird, war unklar. Das klang vernünftig, " +
          "und es hatte den zusätzlichen Vorteil, dass die Verantwortung immer bei der anderen Seite lag, sobald " +
          "ich mir Mühe gegeben hatte.\n\n" +
          "Widerlegt hat das eine einzige Sitzung. Ich hatte einen Vorschlag in vier sauber getrennten Punkten " +
          "vorbereitet, mit Zahlen, mit Grenzen, mit einer offenen Frage. Der Vorschlag wurde abgelehnt, und " +
          "zwar aus einem Grund, der in keinem meiner vier Punkte vorkam: Zwei Kolleginnen befürchteten, ihre " +
          "Arbeit werde damit sichtbarer bewertet. Genauer hätte ich nicht werden können. Die Unklarheit lag " +
          "nicht im Text.\n\n" +
          "Erst nach Jahren habe ich verstanden, was ich verwechselt hatte. Verständlichkeit ist eine " +
          "Eigenschaft von Sätzen, Verständigung eine von Situationen. Man kann den einen Teil beliebig " +
          "verbessern, ohne den anderen zu berühren. Was gefehlt hatte, war keine Präzision, sondern eine " +
          "Frage: Was befürchtet ihr, wenn das kommt?\n\n" +
          "So lange gedauert hat es, weil die alte Überzeugung funktionierte — nur eben in den einfachen Fällen, " +
          "und die waren die meisten. Falsche Regeln überleben nicht trotz ihrer Ausnahmen, sondern wegen ihrer " +
          "Trefferquote.\n\n" +
          "Was bleibt, ist trotzdem etwas. Genauigkeit ist keine hinreichende Bedingung, aber sie bleibt eine " +
          "notwendige. Nur weiß ich inzwischen, dass sie der leichtere Teil der Arbeit ist.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s5",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Was verdient Vorrang?",
    genre: "Monolog",
    intro: "İki dakikaya kadar konuşacaksın: yaygın çerçeveyi değiştir, ölçütünü kur ve reddettiğin seçeneği adlandır.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir kuyrukta ya da bekleme listesinde kime öncelik verilmeli? Yaygın „hak etme“ çerçevesini sorgula, kendi ölçütünü kur ve hangi uygulamayı reddettiğini söyle.",
      bulletsTr: [
        "Sorunun neden „hak etme“ üzerinden kurulmadığını söyle",
        "Eşit muamelenin neden yetmediğini göster",
        "Ölçütünü iki parçaya ayır",
        "Reddettiğin üçüncü uygulamayı adlandır",
      ],
      targets: [
        { de: "Genau da beginnt der Fehler.", tr: "Hata tam da orada başlıyor." },
        { de: "Wer eine Stunde wartet, verliert nicht gleich viel.", tr: "Bir saat bekleyen herkes aynı şeyi kaybetmiyor." },
        { de: "Mein Kriterium hätte zwei Teile.", tr: "Ölçütümün iki parçası olurdu." },
        { de: "Was ich ablehne, ist …", tr: "Reddettiğim şey …" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Vorrang wird meistens so diskutiert, als ginge es um Verdienst. Genau da beginnt der Fehler. In einer " +
        "Warteschlange verteilt man keine Belohnung, sondern Zeit, und Zeit hat bei jedem denselben Preis. " +
        "Trotzdem halte ich gleiche Behandlung nicht für die Antwort. Wer eine Stunde wartet, verliert nicht " +
        "gleich viel: Für die eine ist es ein verlorener Nachmittag, für den anderen eine unbezahlte Schicht. " +
        "Mein Kriterium hätte deshalb zwei Teile. Erstens die Härte des Verlusts: Vorrang bekommt, wer durch " +
        "Warten am meisten verliert, nicht wer am dringendsten wirkt. Zweitens die Sichtbarkeit der Regel. " +
        "Eine Bevorzugung, die an der Wand steht, wird akzeptiert; dieselbe Bevorzugung ohne Begründung erzeugt " +
        "Wut, und zwar zu Recht. Was ich ablehne, ist die dritte Variante, die man am häufigsten findet: " +
        "Vorrang nach Beharrlichkeit. Wer dreimal anruft und laut wird, kommt vor. Das ist keine Regel, das ist " +
        "die Abwesenheit einer Regel — und sie trifft immer dieselben, nämlich die, die weder Zeit noch Übung " +
        "im Fordern haben.",
      rubricHint:
        "Yaygın çerçeve açıkça sorgulanmalı, ölçüt en az iki parçaya ayrılmalı ve reddedilen bir uygulama adlandırılmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g5",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Was steht vorn?",
    genre: "Kural",
    intro: "Almanca cümlede fiilin yeri sabittir; oynayabildiğin tek şey onun önünde ne duracağıdır — ve bu seçim vurguyu kurar.",
    focus: "Vorfeld: bilgi sırası ve vurgu",
    gloss: [
      { de: "das Beispiel", tr: "örnek", en: "example" },
      { de: "überzeugen", tr: "ikna etmek", en: "to convince" },
      { de: "wiedersehen", tr: "tekrar görüşmek", en: "to see again" },
      { de: "die Regel", tr: "kural", en: "rule" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Fiilden önce tek bir öğe",
        tr: "Türkçede vurgulanan öğe fiile yaklaştırılır ve fiil sona gider. Almanca ana cümlede ise çekimli fiil ikinci sıradadır ve önünde YALNIZ BİR öğe durur. Bu yer Vorfeld'dir; oraya özne, nesne, zaman, yer, hatta bir yan cümle konabilir.",
        examples: [
          { de: "Ich habe das Beispiel gestern gelesen.", tr: "Örneği dün okudum.", note: "özne önde" },
          { de: "Gestern habe ich das Beispiel gelesen.", tr: "Dün örneği okudum.", note: "zaman önde" },
          { de: "Das Beispiel habe ich gestern gelesen.", tr: "Örneği dün okudum.", note: "nesne önde" },
        ],
      },
      {
        heading: "Bilinen önde, yeni arkada",
        tr: "Vorfeld genellikle önceki cümleye bağlanan, yani BİLİNEN bilgiyi taşır; asıl yeni bilgi cümlenin sonuna doğru gelir. „Daraus folgen zwei Regeln“ gibi cümleler bu yüzden akıcı durur: „daraus“ geriye bağlar, „zwei Regeln“ yeni haberdir.",
        examples: [
          { de: "Daraus folgen zwei praktische Regeln.", tr: "Bundan iki pratik kural çıkıyor." },
          { de: "Am Ende bleibt eine unbequeme Einsicht.", tr: "Sonunda rahatsız edici bir kavrayış kalıyor." },
          { de: "Es kamen viele Gäste.", tr: "Çok misafir geldi.", note: "„es“ yeri doldurur, yeni özne sona kalır" },
        ],
      },
      {
        heading: "Öne almak vurgulamaktır",
        tr: "Nesneyi, bir Partizip'i ya da bütün bir yan cümleyi Vorfeld'e almak onu öne çıkarır. Bu, Türkçedeki devrik cümlenin işine karşılık gelir ve yazıda tonu belirler.",
        examples: [
          { de: "Überzeugt hat mich das Beispiel.", tr: "Beni ikna eden örnek oldu.", note: "Partizip önde" },
          { de: "Widerlegt hat das eine einzige Sitzung.", tr: "Bunu tek bir toplantı çürüttü." },
          { de: "Dass er kommt, war klar.", tr: "Geleceği belliydi.", note: "yan cümle Vorfeld'de" },
        ],
      },
    ],
    questions: [
      {
        text: "___ habe ich das verstanden.",
        options: ["Erst nach Jahren", "Erst nach Jahren ich", "Ich erst nach Jahren"],
        answer: 0,
        explain: "Vorfeld'de yalnız bir öğe durabilir; özne fiilden sonraya geçer.",
      },
      {
        text: "Welcher Satz ist korrekt?",
        options: ["Daraus folgen zwei Regeln.", "Daraus zwei Regeln folgen.", "Zwei Regeln daraus folgen."],
        answer: 0,
        explain: "Çekimli fiil ikinci sırada olmalı; „daraus“ Vorfeld'i doldurunca fiil hemen arkasından gelir.",
      },
      {
        text: "Im Vorfeld eines Aussagesatzes steht …",
        options: ["genau ein Satzglied", "höchstens zwei Satzglieder", "immer das Subjekt"],
        answer: 0,
        explain: "Kural tek öğedir; özne olmak zorunda değildir, ama iki öğe olamaz.",
      },
      {
        kind: "gapfill",
        text: "„Ich habe den Brief gestern gelesen.“ → „Gestern ___ ich den Brief gelesen.“",
        options: [],
        answer: 0,
        accept: ["habe"],
        explain: "Vorfeld'e zaman ifadesi geçince çekimli fiil ikinci sırada kalır ve özne arkasına düşer.",
      },
      {
        kind: "gapfill",
        text: "Ergänze den Platzhalter: „___ kamen viele Gäste.“",
        options: [],
        answer: 0,
        accept: ["Es", "es"],
        explain: "„es“ Vorfeld'i doldurur, böylece yeni bilgi olan özne cümle sonunda kalır.",
      },
      {
        kind: "gapfill",
        text: "Betone das Objekt: „Ich habe das Beispiel gemeint.“ → „___ Beispiel habe ich gemeint.“",
        options: [],
        answer: 0,
        accept: ["Das", "das"],
        explain: "Nesne Vorfeld'e alınınca vurgulanır; fiil yine ikinci sırada durur.",
      },
      {
        kind: "gapfill",
        text: "„Wir haben uns nach Jahren wiedergesehen.“ → „Nach Jahren ___ wir uns wiedergesehen.“",
        options: [],
        answer: 0,
        accept: ["haben"],
        explain: "Vorfeld dolduğu için çekimli fiil hemen arkasından gelir: Nach Jahren haben wir …",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Daraus", "folgen", "zwei", "praktische", "Regeln"],
        explain: "Geriye bağlayan öğe önde, yeni bilgi sonda: Daraus folgen zwei praktische Regeln.",
      },
      {
        kind: "truefalse",
        text: "„Gestern ich war im Kino.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Vorfeld'de iki öğe olamaz; doğrusu „Gestern war ich im Kino.“",
      },
      {
        kind: "truefalse",
        text: "„Überzeugt hat mich nicht das Argument, sondern ein Beispiel.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Partizip Vorfeld'e alınmış, fiil ikinci sırada; vurgu bilinçli olarak kurulmuş.",
      },
    ],
  },
];
