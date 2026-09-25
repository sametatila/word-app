import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 15.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 15 yurttaş bilimi hattı: gönüllülerin kuş sayımı üzerine bir dergi
 * yazısı, balkonlardan kurulan bir ölçüm ağı üzerine radyo dosyası, bir
 * sayım için gönüllü çağrısı. Dil bilgisi genelleyici imtiyaz cümleleri —
 * wie … auch, was auch immer, so … auch, noch so; ana cümle sırasını
 * bozmayan tek yan cümle türü.
 */
export const deC1P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r15",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Zwölftausend Augen",
    genre: "article",
    intro: "Bir dergi yazısı: gönüllülerin yürüttüğü bir kuş sayımı ve toplanan verinin ne kadar güvenilir olduğu tartışması.",
    gloss: [
      { de: "die Zählung", tr: "sayım", en: "count" },
      { de: "die Art", tr: "tür", en: "species" },
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "sich ausgleichen", tr: "dengelenmek", en: "to even out" },
      { de: "die Erhebung", tr: "veri toplama", en: "survey" },
      { de: "verknüpfen", tr: "ilişkilendirmek", en: "to link" },
    ],
    minutes: 10,
    text:
      "Zwölftausend Augen\n\n" +
      "Jedes Jahr am zweiten Maiwochenende setzen sich rund sechstausend Menschen eine Stunde " +
      "lang in ihren Garten, auf den Balkon oder auf eine Parkbank und zählen Vögel. Die " +
      "Ergebnisse melden sie über ein Formular im Internet. Veranstaltet wird die Zählung von " +
      "einem Naturschutzverband, ausgewertet wird sie von einer Hochschule.\n\n" +
      "Fachleute begegneten dem Projekt anfangs mit Misstrauen. Laien, so der Einwand, " +
      "verwechselten Arten, zählten denselben Vogel zweimal und meldeten bevorzugt, was sie " +
      "gern sähen. Tatsächlich zeigen Kontrollen, dass seltene Arten deutlich zu häufig gemeldet " +
      "werden: Wer einen Eisvogel zu sehen glaubt, meldet ihn, auch wenn es eine Blaumeise war.\n\n" +
      "Und doch hat sich die Zählung als erstaunlich brauchbar erwiesen. Der Grund liegt nicht " +
      "in der Genauigkeit des Einzelnen, sondern in der Menge. Fehler, die zufällig auftreten, " +
      "gleichen sich über Tausende Meldungen weitgehend aus. Was übrig bleibt, sind Trends, und " +
      "die decken sich in den meisten Fällen mit denen der professionellen Erhebungen.\n\n" +
      "Heikel wird es dort, wo die Fehler nicht zufällig sind. Als vor einigen Jahren in den " +
      "Medien über das Verschwinden des Haussperlings berichtet wurde, stiegen die Meldungen " +
      "dieser Art sprunghaft an. Nicht weil es mehr Spatzen gab, sondern weil mehr Menschen auf " +
      "sie achteten.\n\n" +
      "Die Hochschule reagiert darauf, indem sie jede Meldung mit Ort, Uhrzeit und Erfahrung " +
      "der Zählenden verknüpft. Wie gut jemand die Arten kennt, fragt das Formular inzwischen " +
      "ab. Wie ehrlich die Antworten sind, lässt sich allerdings nicht prüfen.\n\n" +
      "Die Leiterin des Projekts sieht darin keinen Mangel, sondern den Preis der Methode. Wer " +
      "mit Tausenden arbeitet, bekommt Tausende Perspektiven. Die Kunst bestehe darin, sie nicht " +
      "mit einer einzigen Messung zu verwechseln.",
    questions: [
      {
        text: "Wer wertet die Vogelzählung aus?",
        options: [
          "der Naturschutzverband",
          "eine Hochschule",
          "die Teilnehmenden selbst",
        ],
        answer: 1,
        explain: "Sayımı bir doğa koruma derneği düzenliyor, sonuçları bir yüksekokul değerlendiriyor.",
      },
      {
        text: "Welcher Fehler zeigt sich bei den Kontrollen?",
        options: [
          "Seltene Arten werden zu oft gemeldet.",
          "Häufige Arten werden übersehen.",
          "Die Uhrzeiten werden falsch notiert.",
        ],
        answer: 0,
        explain: "Nadir türler olduğundan çok bildiriliyor: ağaçkakan sanılan kuş bazen bir sıvacı kuşu.",
      },
      {
        kind: "truefalse",
        text: "Zufällige Fehler gleichen sich über viele Meldungen weitgehend aus.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Binlerce bildirimde rastlantısal hatalar büyük ölçüde birbirini dengeliyor; geriye eğilimler kalıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Zählung findet jedes Jahr am zweiten ___ statt.",
        options: [],
        answer: 0,
        accept: ["Maiwochenende", "Wochenende im Mai"],
        explain: "„Jedes Jahr am zweiten Maiwochenende …“",
      },
      {
        kind: "short_answer",
        text: "Warum stiegen die Meldungen des Haussperlings plötzlich an?",
        options: [],
        answer: 0,
        accept: ["mehr Menschen achteten auf ihn", "wegen der Medienberichte", "mehr Aufmerksamkeit", "weil mehr Menschen auf ihn achteten", "weil mehr Menschen auf Spatzen achteten", "wegen Medienberichten"],
        explain: "Serçe sayısı artmamıştı; haberler yüzünden daha çok insan onlara dikkat ediyordu.",
      },
      {
        text: "Wie sieht die Leiterin die unterschiedliche Erfahrung der Zählenden?",
        options: [
          "als schweren Mangel",
          "als Grund zum Abbruch",
          "als Preis der Methode",
        ],
        answer: 2,
        explain: "Binlerle çalışan binlerce bakış açısı alır; bu yöntemin bedeli sayılıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l15",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Feature: Ein Messnetz aus Balkonen",
    genre: "report",
    intro: "Bir radyo dosyası: gönüllülerin balkonlara astığı ölçüm cihazları, verinin nasıl denetlendiği ve belediyenin bu veriyle ne yaptığı.",
    gloss: [
      { de: "der Feinstaub", tr: "ince toz", en: "particulate matter" },
      { de: "die Messstation", tr: "ölçüm istasyonu", en: "monitoring station" },
      { de: "der Grenzwert", tr: "sınır değer", en: "limit value" },
      { de: "die Luftfeuchtigkeit", tr: "nem", en: "humidity" },
      { de: "der Wendepunkt", tr: "dönüm noktası", en: "turning point" },
      { de: "wegschauen", tr: "görmezden gelmek", en: "to look away" },
    ],
    minutes: 10,
    segments: [
      { text: "In Lindenau hängen an über dreihundert Balkonen kleine weiße Kästen. Sie messen Feinstaub, und zwar rund um die Uhr, inzwischen seit vier Jahren und ohne einen Cent aus der Stadtkasse." },
      { speaker: "Herr Brandl", text: "Angefangen hat es mit einem Bausatz für fünfzig Euro und einer einfachen Frage: Warum gibt es in unserer Stadt nur zwei offizielle Messstationen, beide an ruhigen Orten?" },
      { text: "Die Daten der Sensoren werden alle fünf Minuten auf eine öffentliche Karte übertragen. Jeder kann sehen, wo und wann die Werte steigen, auch die Stadtverwaltung." },
      { speaker: "Frau Dr. Nuss", text: "Wir nehmen die Daten ernst, aber wir verwenden sie nicht für Grenzwerte. Die Geräte reagieren auf Luftfeuchtigkeit, und bei Nebel zeigen sie Werte, die doppelt so hoch sind wie die tatsächlichen." },
      { text: "Die Initiative hat darauf reagiert: Seit zwei Jahren wird jeder Sensor einmal im Jahr neben einer amtlichen Station geprüft und bei Bedarf korrigiert." },
      { speaker: "Herr Brandl", text: "Das war der Wendepunkt. Seitdem streiten wir nicht mehr darüber, ob unsere Zahlen stimmen, sondern darüber, was sie bedeuten." },
      { speaker: "Frau Reiter", text: "Ich habe den Kasten aus Neugier aufgehängt. Nach einem Winter wusste ich, dass die Werte bei mir immer dann schlecht sind, wenn die Nachbarn ihre Kamine anmachen." },
      { text: "Genau solche Beobachtungen haben das Umweltamt überzeugt. An drei Straßen, die in keiner offiziellen Messung vorkamen, gelten inzwischen Tempo dreißig und ein Lkw-Verbot." },
      { speaker: "Frau Dr. Nuss", text: "Die Balkone haben uns gezeigt, wo wir genauer hinschauen müssen. Entschieden haben wir aber erst, nachdem wir dort eigene Geräte aufgestellt hatten." },
      { speaker: "Herr Brandl", text: "Damit können wir gut leben, auch wenn es manchmal langsam geht. Uns ging es nie darum, das Amt zu ersetzen, sondern darum, dass es nicht mehr wegschauen kann." },
    ],
    questions: [
      {
        text: "Was messen die Kästen an den Balkonen?",
        options: ["den Lärm", "die Temperatur", "den Feinstaub"],
        answer: 2,
        explain: "Balkonlardaki küçük beyaz kutular gece gündüz ince toz ölçüyor.",
      },
      {
        text: "Warum nutzt das Umweltamt die Daten nicht für Grenzwerte?",
        options: [
          "Die Geräte reagieren auf Feuchtigkeit.",
          "Die Daten sind nicht öffentlich.",
          "Die Sensoren sind zu teuer.",
        ],
        answer: 0,
        explain: "Cihazlar neme tepki veriyor; sisli havada gerçeğin iki katı değer gösteriyor.",
      },
      {
        kind: "truefalse",
        text: "Die Sensoren werden nie mit amtlichen Stationen verglichen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "İki yıldır her sensör yılda bir kez resmî bir istasyonun yanında kontrol ediliyor.",
      },
      {
        kind: "gapfill",
        text: "Der erste Bausatz hat ___ Euro gekostet.",
        options: [],
        answer: 0,
        accept: ["fünfzig", "50"],
        explain: "„Angefangen hat es mit einem Bausatz für fünfzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Wann sind die Werte bei Frau Reiter schlecht?",
        options: [],
        answer: 0,
        accept: ["wenn die Nachbarn Kamine anmachen", "wenn die Kamine brennen", "wenn die Nachbarn heizen", "wenn die Nachbarn ihre Kamine anmachen"],
        explain: "Komşular şömineyi yaktığında onun balkonundaki değerler kötüleşiyor.",
      },
      {
        text: "Was gilt inzwischen an drei Straßen?",
        options: [
          "neue offizielle Messstationen",
          "Tempo dreißig und ein Lkw-Verbot",
          "ein Verbot von Kaminen",
        ],
        answer: 1,
        explain: "Resmî ölçümde hiç yer almayan üç sokakta hız sınırı ve kamyon yasağı getirildi.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w15",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Aufruf im Gemeindeblatt: Zählen Sie mit!",
    genre: "article",
    intro: "Köyünün bültenine yazıyorsun: önce iki cümle kur, sonra gönüllüleri bir sayıma davet eden ve verinin sınırlarını da dürüstçe söyleyen bir çağrı yaz.",
    gloss: [
      { de: "die Kröte", tr: "kara kurbağası", en: "toad" },
      { de: "der Schutzzaun", tr: "koruma çiti", en: "protective fence" },
      { de: "der Freiwillige", tr: "gönüllü", en: "volunteer" },
      { de: "die Auswertung", tr: "analiz", en: "analysis" },
      { de: "verlässlich", tr: "güvenilir", en: "reliable" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Ne kadar dikkatli sayarsak sayalım, bazı hayvanları gözden kaçıracağız.",
        answer: "Wie sorgfältig wir auch zählen, einige Tiere werden wir übersehen.",
        alternatives: ["Einige Tiere werden wir übersehen, wie sorgfältig wir auch zählen."],
        hint: "Soru sözcüğü ve sıfat başa, „auch“ ortaya, fiil sona gider; ardından gelen ana cümle normal sırayla başlar.",
      },
      {
        kind: "build",
        tr: "Hava ne kadar soğuk olursa olsun, her akşam sayım yapılır.",
        answer: "So kalt es auch sein mag, gezählt wird jeden Abend.",
        alternatives: ["Gezählt wird jeden Abend, so kalt es auch sein mag."],
        hint: "„so“nun hemen arkasına sıfat gelir; „mag“ imtiyazı daha yazılı ve mesafeli kılar.",
      },
      {
        kind: "free",
        prompt:
          "Köyünün bültenine, ilkbaharda yol kenarındaki kurbağa göçünü saymak için gönüllü arayan bir çağrı yaz: projeyi ve amacını kısaca tanıt, katılanların somut olarak ne yapacağını anlat, toplanan verinin neye yarayıp neye yaramadığını dürüstçe söyle, katılım koşullarını belirt ve nasıl ulaşılacağını yazarak bitir.",
        checklist: [
          "Projeyi ve amacını kısaca tanıt",
          "Katılanların somut olarak ne yapacağını anlat",
          "Verinin neye yarayıp neye yaramadığını dürüstçe söyle",
          "Katılım koşullarını ve iletişim yolunu yaz",
        ],
        minWords: 150,
        phrases: [
          { de: "Auch in diesem Frühjahr suchen wir Freiwillige, die …", tr: "Bu ilkbaharda da … gönüllüler arıyoruz", en: "This spring, too, we are looking for volunteers who …" },
          { de: "Konkret heißt Mitmachen: …", tr: "Katılmak somut olarak şu demek: …", en: "In concrete terms, taking part means: …" },
          { de: "Was die Zahlen leisten können, ist …, nicht aber …", tr: "Sayıların yapabileceği şey …, ama … değil", en: "What the figures can do is …, but not …" },
          { de: "Voraussetzung ist lediglich, dass …", tr: "Tek koşul … olması", en: "The only requirement is that …" },
          { de: "Wer Fragen hat, erreicht uns …", tr: "Sorusu olan bize … ulaşabilir", en: "Anyone with questions can reach us …" },
        ],
        sample:
          "Auch in diesem Frühjahr suchen wir Freiwillige, die uns an der Kreisstraße zwischen " +
          "Oberau und dem Weiher helfen. Sobald die Nächte wärmer als fünf Grad sind, wandern dort " +
          "Tausende Kröten zu ihrem Laichgewässer, und viele von ihnen überleben die Straße nicht. " +
          "Seit sechs Jahren steht deshalb ein Schutzzaun, an dem die Tiere in Eimer fallen. " +
          "Konkret heißt Mitmachen: Sie gehen an zwei oder drei Abenden pro Woche mit einer " +
          "Taschenlampe den Zaun ab, tragen die Tiere über die Straße und notieren, wie viele " +
          "Kröten, Frösche und Molche es waren. So kalt es auch sein mag, gezählt wird jeden Abend. " +
          "Was die Zahlen leisten können, ist ein verlässlicher Trend über viele Jahre, nicht aber " +
          "eine genaue Bestandsangabe; wie sorgfältig wir auch zählen, einige Tiere werden wir " +
          "übersehen. Für die Auswertung arbeiten wir mit dem Landesamt zusammen, das unsere Daten " +
          "mit eigenen Stichproben vergleicht. " +
          "Voraussetzung ist lediglich, dass Sie eine Warnweste tragen und an unserer kurzen " +
          "Einführung am 1. März teilnehmen. Wer Fragen hat, erreicht uns jeden Dienstagabend im " +
          "Gemeindebüro.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s15",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Wie viel Wissenschaft können Laien leisten?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: gönüllülerin topladığı verinin değerini ve sınırını tart.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Gönüllülerin topladığı veriler (kuş sayımı, hava ölçümü, doğa gözlemi) bilimsel ya da siyasi kararlara temel olabilir mi? Bu verinin güçlü bir yanını adlandır, en ciddi zayıflığını kabul et, hangi kararlar için yeterli olduğunu söyle ve bir güvence öner.",
      bulletsTr: [
        "Verinin güçlü bir yanını adlandır",
        "En ciddi zayıflığını kabul et",
        "Hangi kararlar için yeterli olduğunu söyle",
        "Bir güvence öner",
      ],
      targets: [
        { de: "Die Stärke solcher Daten liegt weniger in … als in …", tr: "Bu tür verilerin gücü …'den çok …'de yatıyor" },
        { de: "Ihre größte Schwäche ist allerdings, dass …", tr: "Ama en büyük zayıflıkları şu: …" },
        { de: "Ausreichen würden sie für …, nicht aber für …", tr: "… için yeterli olurlardı, ama … için değil" },
        { de: "Eine Absicherung sähe für mich so aus: …", tr: "Benim için bir güvence şöyle olurdu: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Die Stärke solcher Daten liegt weniger in der Genauigkeit der einzelnen Beobachtung als " +
        "in ihrer Dichte. Keine Behörde kann an dreihundert Balkonen messen oder in tausend Gärten " +
        "gleichzeitig Vögel zählen; Freiwillige können das, und sie sehen dabei Dinge, nach denen " +
        "niemand gefragt hat. " +
        "Ihre größte Schwäche ist allerdings, dass Fehler nicht immer zufällig sind. Wer einen " +
        "seltenen Vogel sehen möchte, sieht ihn öfter, und wer sich über eine Straße ärgert, " +
        "misst dort genauer als anderswo. " +
        "Ausreichen würden die Daten deshalb für die Frage, wo man genauer hinschauen sollte, " +
        "nicht aber für eine Entscheidung, die Menschen etwas verbietet oder Geld kostet. Dafür " +
        "braucht es eine Messung, die jemand verantwortet. " +
        "Eine Absicherung sähe für mich so aus: Jede Datenreihe wird regelmäßig an einer " +
        "professionellen Station geprüft, und jede Entscheidung nennt offen, welcher Teil auf " +
        "Laiendaten beruht. Dann können beide Seiten einander vertrauen, ohne einander ersetzen " +
        "zu wollen.",
      rubricHint:
        "Güçlü yanın, zayıflığın ve yeterlilik sınırının açıkça ayrılması beklenir; „weniger in … als in …“, „allerdings“ ve Konjunktiv II („würden“, „sähe“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g15",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Wie sehr man sich auch bemüht …",
    genre: "grammar",
    intro: "„Ne kadar … olursa olsun“ demenin Almancada birkaç yolu var; hepsi ana cümlenin sırasını bozmadan bir kabul ekler.",
    focus: "Genelleyici imtiyaz cümleleri: wie … auch, was auch immer, so … auch, noch so",
    gloss: [
      { de: "sich bemühen", tr: "çaba göstermek", en: "to make an effort" },
      { de: "der Andrang", tr: "izdiham", en: "crowds" },
      { de: "streng", tr: "katı", en: "strict" },
      { de: "berechtigt", tr: "haklı", en: "justified" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "wie … auch ve so … auch",
        tr: "Soru sözcüğüyle ya da „so“ ile başlayan bir yan cümle „auch“ alınca „ne kadar … olursa olsun“ anlamına gelir. Yan cümlede fiil sondadır. Asıl önemli nokta ana cümlededir: öteki yan cümlelerin tersine, arkasından çekimli fiil gelmez; ana cümle normal sırayla, özneyle başlar.",
        examples: [
          { de: "Wie sehr wir uns auch bemühen, der Andrang bleibt.", tr: "Ne kadar çabalasak da kalabalık sürüyor.", note: "ana cümle normal sırada" },
          { de: "So streng die Regel auch ist, sie wird umgangen.", tr: "Kural ne kadar katı olsa da delinir.", note: "so + sıfat + auch" },
          { de: "Wie lange es auch dauert, wir warten.", tr: "Ne kadar sürerse sürsün bekleriz.", note: "wie lange" },
        ],
      },
      {
        heading: "wer, was, wo … auch immer",
        tr: "„wer auch immer“, „was auch immer“, „wo auch immer“ belirsiz bir kişiyi, şeyi ya da yeri bütünüyle kapsar: kim olursa olsun, ne olursa olsun, nerede olursa olsun. „immer“ vurguyu güçlendirir; „was immer“ biçiminde „auch“ düşebilir.",
        examples: [
          { de: "Was immer man mit dem Geld tut, es muss sich rechtfertigen lassen.", tr: "Parayla ne yapılırsa yapılsın, gerekçesi olmalı.", note: "was immer" },
          { de: "Wer auch immer kommt, muss vorher buchen.", tr: "Kim gelirse gelsin önceden yer ayırtmalı.", note: "wer auch immer" },
          { de: "Wo auch immer man parkt, es kostet eine Gebühr.", tr: "Nereye park edilirse edilsin bir ücreti var.", note: "wo auch immer" },
        ],
      },
      {
        heading: "noch so ve mögen: uç ve mesafe",
        tr: "„noch so“ bir sıfatın derecesini uca taşır: „auch wenn die Gebühr noch so hoch ist“ — ücret ne kadar yüksek olursa olsun. „mögen“ imtiyazı daha resmî ve mesafeli kılar: „so berechtigt sie auch sein mag“. İki biçim de ana cümlenin sırasına dokunmaz.",
        examples: [
          { de: "Auch wenn die Gebühr noch so hoch ist, manche kommen trotzdem.", tr: "Ücret ne kadar yüksek olursa olsun bazıları yine gelir.", note: "noch so" },
          { de: "So berechtigt die Kritik auch sein mag, sie ändert nichts.", tr: "Eleştiri ne kadar haklı olursa olsun hiçbir şey değiştirmiyor.", note: "mögen: resmî ton" },
          { de: "Wie auch immer man entscheidet, jemand wird enttäuscht sein.", tr: "Nasıl karar verilirse verilsin biri hayal kırıklığına uğrayacak.", note: "wie auch immer" },
        ],
      },
    ],
    questions: [
      {
        text: "Wie sehr wir uns auch bemühen, ___",
        options: ["bleibt der Andrang.", "der Andrang bleiben.", "der Andrang bleibt."],
        answer: 2,
        explain: "Genelleyici imtiyazdan sonra ana cümle normal sırayla, özneyle başlar.",
      },
      {
        text: "Was bedeutet „Wer auch immer kommt, muss vorher buchen“?",
        options: [
          "Nur wenige müssen buchen.",
          "Jeder, der kommt, muss buchen.",
          "Wer bucht, kommt immer.",
        ],
        answer: 1,
        explain: "„wer auch immer“ gelen herkesi, kim olursa olsun, kapsar.",
      },
      {
        text: "Welche Form klingt am formellsten?",
        options: [
          "So berechtigt die Kritik auch sein mag, …",
          "Egal wie berechtigt die Kritik ist, …",
          "Die Kritik ist berechtigt, aber …",
        ],
        answer: 0,
        explain: "„so … auch sein mag“ yazılı ve mesafeli bir tondur; „egal wie“ konuşma dilidir.",
      },
      {
        kind: "gapfill",
        text: "So streng die Regel ___ ist, sie wird umgangen.",
        options: [],
        answer: 0,
        accept: ["auch"],
        explain: "„so … auch“ ikilisi „ne kadar … olursa olsun“ anlamını kurar.",
      },
      {
        kind: "gapfill",
        text: "Was ___ man mit dem Geld tut, es muss sich rechtfertigen lassen.",
        options: [],
        answer: 0,
        accept: ["immer"],
        explain: "„was immer“ ne olursa olsun demektir; burada „auch“ düşmüş hâlidir.",
      },
      {
        kind: "gapfill",
        text: "Auch wenn die Gebühr noch ___ hoch ist, manche kommen trotzdem.",
        options: [],
        answer: 0,
        accept: ["so"],
        explain: "„noch so“ derecenin en uç noktasını da kapsar.",
      },
      {
        kind: "gapfill",
        text: "Wie lange es auch ___, wir warten. (dauern)",
        options: [],
        answer: 0,
        accept: ["dauert"],
        explain: "İmtiyaz yan cümlesinde çekimli fiil sona gider.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wie sehr", "wir uns", "auch", "bemühen", "der Andrang bleibt"],
        explain: "Soru sözcüğü başta, „auch“ ortada, fiil yan cümlenin sonunda; ana cümle özneyle başlar.",
      },
      {
        kind: "truefalse",
        text: "Nach „Wie sehr wir uns auch bemühen,“ folgt im Hauptsatz direkt das Verb.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Bu yan cümle Vorfeld'i doldurmaz; ana cümle özneyle başlar.",
      },
      {
        kind: "truefalse",
        text: "„So streng sie auch sein mag“ klingt formeller als „So streng sie auch ist“.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„mögen“ imtiyazı daha yazılı ve mesafeli kılar.",
      },
    ],
  },
];
