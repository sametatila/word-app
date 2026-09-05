import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 16 — "Ortaç öbeği, gerundivum, iç içe cümle, üslup dönüşümü".
 *
 * Dört ders: Die vor Jahren getroffene Wahl · Das zu lösende Problem ·
 * Der Schachtelsatz entwirrt · Vom Nominal- zum Verbalstil.
 *
 *   Kelime: verdichten, auflösen, das Attribut, vorangestellt, umfangreich,
 *           benennen, anführen, eingrenzen · die Notwendigkeit, bevorstehen,
 *           anstehend, die Herausforderung, unterschätzen, die Prognose,
 *           zwangsläufig, gewährleisten · der Schachtelsatz, der Kern,
 *           zerlegen, unübersichtlich, umformulieren, entziffern,
 *           beeinträchtigen, ergründen · der Nominalstil, umwandeln,
 *           schwerfällig, die Lesbarkeit, sperrig, distanziert, behutsam,
 *           die Vorlage
 *
 * Ünitenin çekirdeği: ALMANCA CÜMLEYİ SIKIŞTIRABİLİR. Türkçede yan cümle
 * ekle kurulur ve isim öncesine yığılır; Almanca aynı işi ortaç öbeğiyle
 * yapar — "die vor Jahren getroffene Entscheidung" bir ilgi cümlesinin
 * sıkıştırılmış hâlidir. Türkçe konuşan bu yapıyı okurken çözebilir ama
 * yazarken kurmaz, çünkü ana dilinde zaten sıkıştırılmış cümleye alışıktır
 * ve Almancada uzun yolu seçer.
 *
 * İkinci hat tersi: sıkıştırma her zaman iyi değil. Yönetmelik dili aynı
 * araçla okunmaz hâle geliyor, ve ders bunu çözmeyi de öğretiyor.
 */
export const c1U16: SkillExercise[] = [
  {
    id: "c1-u16-r1",
    level: "C1",
    skill: "reading",
    unit: 16,
    title: "Der Satz, der sich zusammenfaltet",
    genre: "Dil yazısı",
    intro: "Ortaç öbeği ne yapıyor? Bir ilgi cümlesinin sıkıştırılmış hâli.",
    gloss: [
      { de: "verdichten", tr: "yoğunlaştırmak", en: "to condense" },
      { de: "auflösen", tr: "çözmek, açmak", en: "to unpack" },
      { de: "das Attribut", tr: "niteleyici", en: "modifier" },
      { de: "vorangestellt", tr: "öne konmuş", en: "preposed" },
      { de: "umfangreich", tr: "kapsamlı", en: "extensive" },
      { de: "eingrenzen", tr: "sınırlandırmak", en: "to narrow down" },
      { de: "die Lesbarkeit", tr: "okunabilirlik", en: "readability" },
    ],
    minutes: 7,
    text:
      "ZWEI WEGE, DASSELBE ZU SAGEN\n\n" +
      "„Die Entscheidung, die vor Jahren getroffen wurde, wirkt bis heute.“ Und: „Die vor Jahren getroffene Entscheidung wirkt bis heute.“\n\n" +
      "Beide Sätze sind korrekt. Der zweite ist um vier Wörter kürzer und verlagert das Gewicht: Das Attribut steht vorangestellt, der Leser bekommt die Einschränkung, bevor er das Nomen hat.\n\n" +
      "Genau darin liegt Nutzen und Gefahr. Der Nutzen: Der Satz verdichtet, ohne Information zu verlieren, und die Hauptaussage rückt näher zusammen. In Fachtexten spart das über eine Seite hinweg erhebliche Länge.\n\n" +
      "Die Gefahr beginnt bei der Länge des Attributs. „Die vor Jahren nach umfangreichen und teilweise kontrovers geführten Beratungen unter Beteiligung aller Fachabteilungen getroffene Entscheidung“ ist grammatisch einwandfrei und praktisch unlesbar: Zwischen Artikel und Nomen liegen vierzehn Wörter, und der Leser weiß bis zum Schluss nicht, wovon die Rede ist.\n\n" +
      "Eine brauchbare Grenze liegt bei etwa vier Wörtern. Darüber hinaus sollte man auflösen — in einen Relativsatz, oder besser in zwei Sätze.\n\n" +
      "Bemerkenswert ist, was Lernende tun. Sie lösen im Lesen mühelos auf, bauen die Konstruktion beim Schreiben aber nie selbst. Der Grund ist selten Unkenntnis: Man wählt den Weg, den man sicher beherrscht. Wer die Konstruktion einmal bewusst einsetzt und die Länge eingrenzt, gewinnt an Lesbarkeit — und klingt zugleich weniger nach Übersetzung.",
    questions: [
      {
        text: "Was verändert die vorangestellte Konstruktion gegenüber dem Relativsatz?",
        options: [
          "Sie fügt Information hinzu",
          "Sie verdichtet und stellt die Einschränkung vor das Nomen",
          "Sie macht den Satz höflicher",
        ],
        answer: 1,
        explain: "„der Leser bekommt die Einschränkung, bevor er das Nomen hat“.",
      },
      {
        kind: "gapfill",
        text: "Die vor Jahren ___ Entscheidung wirkt bis heute.",
        options: [],
        answer: 0,
        accept: ["getroffene"],
        explain: "Partizip II niteleyici olarak çekiliyor: getroffene.",
      },
      {
        text: "Wo liegt laut Text die brauchbare Grenze?",
        options: [
          "Bei etwa vier Wörtern",
          "Bei zehn Wörtern",
          "Es gibt keine Grenze",
        ],
        answer: 0,
        explain: "Üstünü ilgi cümlesine ya da iki cümleye çözmek gerekiyor.",
      },
      {
        kind: "short_answer",
        text: "Was tun Lernende laut Text mit dieser Konstruktion?",
        options: [],
        answer: 0,
        accept: [
          "verstehen ja, verwenden nein",
          "sie lösen sie beim Lesen auf, bauen sie aber beim Schreiben nicht",
          "sie verwenden sie beim Schreiben nicht",
        ],
        explain: "„Man wählt den Weg, den man sicher beherrscht.“",
      },
      {
        kind: "short_answer",
        text: "Warum ist das Beispiel mit vierzehn Wörtern trotz korrekter Grammatik problematisch?",
        options: [],
        answer: 0,
        accept: [
          "es ist unlesbar",
          "der Leser weiß bis zum Schluss nicht, wovon die Rede ist",
          "zwischen Artikel und Nomen liegen vierzehn Wörter",
        ],
        explain: "Dilbilgisi doğruluğu okunabilirliği garanti etmiyor.",
      },
    ],
  },
  {
    id: "c1-u16-r2",
    level: "C1",
    skill: "reading",
    unit: 16,
    title: "Vom Nominalstil zurück",
    genre: "Rehber yazısı",
    intro: "İsim üslubu ne zaman işe yarıyor, ne zaman metni boğuyor?",
    gloss: [
      { de: "der Nominalstil", tr: "isim üslubu", en: "nominal style" },
      { de: "umwandeln", tr: "dönüştürmek", en: "to convert" },
      { de: "schwerfällig", tr: "ağır, hantal", en: "ponderous" },
      { de: "sperrig", tr: "hantal, ele avuca sığmaz", en: "unwieldy" },
      { de: "umformulieren", tr: "yeniden ifade etmek", en: "to rephrase" },
      { de: "beeinträchtigen", tr: "olumsuz etkilemek", en: "to impair" },
      { de: "der Kern", tr: "çekirdek", en: "core" },
    ],
    minutes: 7,
    text:
      "„DIE DURCHFÜHRUNG DER PRÜFUNG ERFOLGT“\n\n" +
      "Vier Wörter für eine Sache, die zwei brauchen würde: „Wir prüfen.“\n\n" +
      "Der Nominalstil entsteht, wenn das Verb in ein Substantiv wandert und ein blasses Hilfsverb seinen Platz einnimmt — erfolgen, vornehmen, durchführen, zur Anwendung kommen. Übrig bleibt ein Satz ohne Handlung.\n\n" +
      "Er hat gute Gründe. Er ist unpersönlich, und manchmal soll er das sein: In einer Verfahrensbeschreibung ist gleichgültig, wer prüft. Er ist auch kompakt, wenn man mehrere Vorgänge aufzählt.\n\n" +
      "Schwerfällig wird er dort, wo eine Handlung wirklich stattfindet und jemand sie ausführt. „Nach erfolgter Prüfung der eingereichten Unterlagen durch die zuständige Stelle ergeht ein Bescheid“ enthält drei Substantive für einen Vorgang und keinen einzigen Handelnden im Nominativ.\n\n" +
      "Der Kern eines solchen Satzes ist immer eine Handlung; sie steckt nur im falschen Wortart-Gewand.\n\n" +
      "Die Umwandlung ist mechanisch. Man sucht das Substantiv, das eine Handlung enthält (Prüfung), macht daraus ein Verb (prüfen), und fragt: Wer tut das? Die Antwort wird zum Subjekt. Aus vier Zeilen werden zwei: „Wir prüfen Ihre Unterlagen und schicken Ihnen danach einen Bescheid.“\n\n" +
      "Wer so umformuliert, verliert manchmal etwas — die Distanz. Deshalb lautet die Regel nicht „Nominalstil vermeiden“, sondern: Er ist ein Werkzeug für Verfahren und ein Fehler für Mitteilungen. Wenn er die Lesbarkeit beeinträchtigt, ohne Distanz zu gewinnen, ist er nur noch sperrig.",
    questions: [
      {
        text: "Wie entsteht der Nominalstil laut Text?",
        options: [
          "Durch zu lange Sätze",
          "Wenn das Verb in ein Substantiv wandert und ein blasses Hilfsverb bleibt",
          "Durch Fremdwörter",
        ],
        answer: 1,
        explain: "„Übrig bleibt ein Satz ohne Handlung.“",
      },
      {
        kind: "gapfill",
        text: "Die Durchführung der Prüfung erfolgt → Wir ___.",
        options: [],
        answer: 0,
        accept: ["prüfen"],
        explain: "İsimden fiile dönüş; eylem geri geliyor.",
      },
      {
        text: "Wann ist der Nominalstil laut Text berechtigt?",
        options: [
          "In Mitteilungen an Kunden",
          "In Verfahrensbeschreibungen, wo der Handelnde gleichgültig ist",
          "Immer in offiziellen Texten",
        ],
        answer: 1,
        explain: "„Er ist ein Werkzeug für Verfahren und ein Fehler für Mitteilungen.“",
      },
      {
        kind: "short_answer",
        text: "Nenne die drei Schritte der Umwandlung.",
        options: [],
        answer: 0,
        accept: [
          "Substantiv, Verb, Handelnder",
          "Substantiv finden, Verb daraus machen, fragen wer es tut",
          "Handlungssubstantiv suchen, zum Verb machen, Handelnden als Subjekt",
        ],
        explain: "„Die Antwort wird zum Subjekt.“",
      },
      {
        kind: "short_answer",
        text: "Was verliert man bei der Umwandlung manchmal?",
        options: [],
        answer: 0,
        accept: ["die Distanz", "Distanz", "die unpersönliche Distanz"],
        explain: "Mesafe kazanmadan okunabilirliği düşürüyorsa yalnızca hantal.",
      },
    ],
  },
  {
    id: "c1-u16-l1",
    level: "C1",
    skill: "listening",
    unit: 16,
    title: "Diesen Satz versteht niemand",
    genre: "Diyalog",
    intro: "Bir yönetmelik cümlesi birlikte çözülüyor. Önce çekirdek.",
    gloss: [
      { de: "der Schachtelsatz", tr: "iç içe cümle", en: "convoluted sentence" },
      { de: "der Kern", tr: "çekirdek", en: "core" },
      { de: "zerlegen", tr: "parçalara ayırmak", en: "to break down" },
      { de: "unübersichtlich", tr: "izlenemez", en: "hard to follow" },
      { de: "entziffern", tr: "deşifre etmek", en: "to decipher" },
      { de: "umformulieren", tr: "yeniden yazmak", en: "to rephrase" },
      { de: "ergründen", tr: "derinine inmek", en: "to fathom" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Alina", text: "Ich lese diesen Satz zum vierten Mal und verstehe ihn nicht." },
      { speaker: "Herr Renz", text: "Lesen Sie ihn nicht noch einmal. Zerlegen Sie ihn." },
      { speaker: "Alina", text: "Ich versuche seit zehn Minuten, diesen Schachtelsatz zu entziffern." },
      { speaker: "Herr Renz", text: "Und je länger Sie ihn ergründen wollen, desto sicherer verlieren Sie den Anfang." },
      { speaker: "Alina", text: "Wie meinen Sie das?" },
      { speaker: "Herr Renz", text: "Suchen Sie zuerst das finite Verb im Hauptsatz. Nur das. Alles andere ignorieren Sie." },
      { speaker: "Alina", text: "„… ist zu entrichten.“ Das steht ganz am Ende." },
      { speaker: "Herr Renz", text: "Gut. Und wer oder was ist zu entrichten?" },
      { speaker: "Alina", text: "Eine Gebühr." },
      { speaker: "Herr Renz", text: "Damit haben Sie den Kern: Eine Gebühr ist zu entrichten. Der Rest sind Bedingungen." },
      { speaker: "Alina", text: "Es sind drei." },
      { speaker: "Herr Renz", text: "Schreiben Sie sie untereinander. Ein Satz mit drei Bedingungen ist unübersichtlich; drei Zeilen mit je einer sind es nicht." },
      { speaker: "Alina", text: "Jetzt sehe ich es. Die zweite Bedingung hebt die erste teilweise auf." },
      { speaker: "Herr Renz", text: "Und genau deshalb war der Satz so gebaut. Er sollte nicht verständlich sein, er sollte vollständig sein." },
      { speaker: "Alina", text: "Muss ich das jetzt für den Antragsteller umformulieren?" },
      { speaker: "Herr Renz", text: "Ja. Der Verordnungstext bleibt, wie er ist — Ihre Mitteilung nicht. Sie schreiben: In diesen zwei Fällen zahlen Sie nichts; sonst fünfundvierzig Euro." },
    ],
    questions: [
      {
        text: "Was ist der erste Schritt beim Zerlegen?",
        options: [
          "Die Bedingungen zählen",
          "Das finite Verb im Hauptsatz suchen",
          "Den Satz laut lesen",
        ],
        answer: 1,
        explain: "„Nur das. Alles andere ignorieren Sie.“",
      },
      {
        kind: "gapfill",
        text: "Damit haben Sie den ___: Eine Gebühr ist zu entrichten.",
        options: [],
        answer: 0,
        accept: ["Kern"],
        explain: "Çekirdek bulununca kalan her şey koşul olarak sıralanabiliyor.",
      },
      {
        text: "Warum war der Satz laut Herrn Renz so gebaut?",
        options: [
          "Aus Nachlässigkeit",
          "Er sollte vollständig sein, nicht verständlich",
          "Um Platz zu sparen",
        ],
        answer: 1,
        explain: "Yönetmelik dilinin amacı eksiksizlik; anlaşılırlık ayrı bir iş.",
      },
      {
        kind: "dictation",
        text: "Herr Renz'in yönetmelik metni ile bildirim arasındaki farkı söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Der Verordnungstext bleibt, wie er ist — Ihre Mitteilung nicht.",
          "Der Verordnungstext bleibt, wie er ist, Ihre Mitteilung nicht.",
        ],
        explain: "Kaynak metin değişmiyor; vatandaşa yazılan metin değişmek zorunda.",
      },
    ],
  },
  {
    id: "c1-u16-l2",
    level: "C1",
    skill: "listening",
    unit: 16,
    title: "Das zu lösende Problem",
    genre: "Toplantı",
    intro: "Gerundivum bir toplantıda. Zorunluluk nasıl tek sıfata sığıyor?",
    gloss: [
      { de: "die Notwendigkeit", tr: "zorunluluk", en: "necessity" },
      { de: "bevorstehen", tr: "kapıda olmak", en: "to be imminent" },
      { de: "anstehend", tr: "sırada bekleyen", en: "pending" },
      { de: "unterschätzen", tr: "hafife almak", en: "to underestimate" },
      { de: "zwangsläufig", tr: "kaçınılmaz olarak", en: "inevitably" },
      { de: "gewährleisten", tr: "güvence altına almak", en: "to ensure" },
      { de: "die Prognose", tr: "öngörü", en: "forecast" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Lenz", text: "Auf der Liste stehen vier anstehende Punkte. Einer davon ist kein Punkt, sondern eine Notwendigkeit." },
      { speaker: "Herr Duman", text: "Sie meinen die Serverumstellung." },
      { speaker: "Frau Lenz", text: "Ja. Das ist das im dritten Quartal zu lösende Problem — nicht eines von mehreren." },
      { speaker: "Herr Duman", text: "Warum sagen Sie es so umständlich? „Wir müssen im dritten Quartal umstellen“ wäre kürzer." },
      { speaker: "Frau Lenz", text: "Es wäre kürzer und schwächer. „Wir müssen“ lädt zur Diskussion ein, wer müssen sagt. „Das zu lösende Problem“ macht es zu einer Eigenschaft der Sache." },
      { speaker: "Herr Duman", text: "Das ist ein rhetorischer Trick." },
      { speaker: "Frau Lenz", text: "Es ist ein Werkzeug. Bei einer Prognose würde ich es nicht verwenden — da wäre es unehrlich." },
      { speaker: "Herr Duman", text: "Uns steht ohnehin die Zertifizierung bevor." },
      { speaker: "Frau Lenz", text: "Was uns im vierten Quartal bevorsteht, ist die Zertifizierung — und genau deshalb muss die Umstellung im dritten fertig sein." },
      { speaker: "Herr Duman", text: "Und der Aufwand?" },
      { speaker: "Frau Lenz", text: "Eine nicht zu unterschätzende Rolle spielt die Migration der Altdaten. Das sind sechs Wochen, keine sechs Tage." },
      { speaker: "Herr Duman", text: "Dann steht uns ein unangenehmer Herbst bevor." },
      { speaker: "Frau Lenz", text: "Zwangsläufig. Aber wenn wir jetzt planen, können wir den Betrieb während der Umstellung gewährleisten." },
    ],
    questions: [
      {
        text: "Was bewirkt „das zu lösende Problem“ laut Frau Lenz?",
        options: [
          "Es ist höflicher.",
          "Es macht die Notwendigkeit zu einer Eigenschaft der Sache.",
          "Es ist kürzer.",
        ],
        answer: 1,
        explain: "„‚Wir müssen‘ lädt zur Diskussion ein, wer müssen sagt.“",
      },
      {
        kind: "gapfill",
        text: "Eine nicht ___ Rolle spielt die Migration der Altdaten.",
        options: [],
        answer: 0,
        accept: ["zu unterschätzende"],
        explain: "Gerundivum olumsuzla: hafife alınmaması gereken.",
      },
      {
        text: "Wann würde Frau Lenz die Konstruktion nicht verwenden?",
        options: [
          "In Protokollen",
          "Bei einer Prognose",
          "In E-Mails",
        ],
        answer: 1,
        explain: "„da wäre es unehrlich“ — öngörüde zorunluluk yaratmak dürüst değil.",
      },
      {
        kind: "short_answer",
        text: "Wie lange dauert die Migration der Altdaten?",
        options: [],
        answer: 0,
        accept: ["sechs Wochen", "6 Wochen", "sechs Wochen, keine sechs Tage"],
        explain: "„Das sind sechs Wochen, keine sechs Tage.“",
      },
    ],
  },
  {
    id: "c1-u16-w1",
    level: "C1",
    skill: "writing",
    unit: 16,
    title: "Sıkıştır ve çöz",
    genre: "Dil bilgisi",
    intro: "İlgi cümlesi ↔ ortaç öbeği, isim üslubu ↔ fiil üslubu.",
    gloss: [
      { de: "auflösen", tr: "çözmek", en: "to unpack" },
      { de: "umwandeln", tr: "dönüştürmek", en: "to convert" },
      { de: "vorangestellt", tr: "öne konmuş", en: "preposed" },
      { de: "gewährleisten", tr: "güvence altına almak", en: "to ensure" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yıllar önce alınan karar bugün hâlâ etkili.",
        answer: "Die vor Jahren getroffene Entscheidung wirkt bis heute",
        hint: "Ortaç öbeği artikel ile isim arasında durur ve çekilir.",
      },
      {
        kind: "build",
        tr: "Üçüncü çeyrekte çözülmesi gereken sorun bu.",
        answer: "Das ist das im dritten Quartal zu lösende Problem",
        hint: "Gerundivum: zu + Partizip I, sıfat gibi çekiliyor.",
      },
      {
        kind: "build",
        tr: "Belgelerinizi inceliyoruz ve size sonra bir karar gönderiyoruz.",
        answer: "Wir prüfen Ihre Unterlagen und schicken Ihnen danach einen Bescheid",
        hint: "İsim üslubundan fiil üslubuna: eylemi yapan özne olur.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi çöz: ortaç öbeği okunamayacak kadar uzamış.",
        source: "Die vor Jahren nach umfangreichen und kontrovers geführten Beratungen unter Beteiligung aller Fachabteilungen getroffene Entscheidung wirkt bis heute.",
        answer: "Die Entscheidung, die vor Jahren nach langen Beratungen getroffen wurde, wirkt bis heute.",
        alternatives: [
          "Die Entscheidung, die vor Jahren nach langen Beratungen getroffen wurde, wirkt bis heute",
          "Die Entscheidung wurde vor Jahren nach langen Beratungen getroffen. Sie wirkt bis heute.",
        ],
        why: "Yapı dilbilgisi olarak kusursuz ama artikel ile isim arasına on dört kelime giriyor ve okur sonuna kadar neyden söz edildiğini bilmiyor. Dört kelimeyi aşan niteleyici ilgi cümlesine ya da iki ayrı cümleye çözülür.",
      },
    ],
  },
  {
    id: "c1-u16-w2",
    level: "C1",
    skill: "writing",
    unit: 16,
    title: "Amtsdeutsch übersetzen",
    genre: "Kurum yazısı",
    intro: "Yönetmelik cümlesini vatandaşın okuyacağı bildirime çevir.",
    gloss: [
      { de: "umformulieren", tr: "yeniden yazmak", en: "to rephrase" },
      { de: "zerlegen", tr: "parçalara ayırmak", en: "to break down" },
      { de: "der Kern", tr: "çekirdek", en: "core" },
      { de: "die Lesbarkeit", tr: "okunabilirlik", en: "readability" },
      { de: "behutsam", tr: "özenli", en: "careful" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki yönetmelik cümlesini, başvuru sahibine gidecek bir bildirime dönüştür. Yöntemi uygula: önce çekirdeği bul, koşulları alt alta yaz, isim üslubunu fiil üslubuna çevir ve eylemi yapanı adlandır. Hiçbir bilgi kaybolmasın; hukuki içeriği değiştirme, yalnız okunabilir kıl.",
        stimulus:
          "VERORDNUNGSTEXT § 14 Abs. 2\n\n" +
          "Für die Bearbeitung des Antrags ist eine Gebühr in Höhe von 45 Euro zu entrichten, es sei denn, der Antragsteller weist durch Vorlage eines gültigen Bescheides nach, dass er laufende Leistungen zur Sicherung des Lebensunterhalts bezieht, oder der Antrag wird vor Beginn der Bearbeitung, spätestens jedoch innerhalb von zwei Wochen nach Eingang, zurückgenommen; im letztgenannten Fall erfolgt eine Erstattung bereits entrichteter Beträge binnen vier Wochen.",
        checklist: [
          "Çekirdek ilk cümlede mi (ücret ne kadar)?",
          "İki istisna ayrı ayrı, alt alta mı?",
          "İsim üslubu fiile çevrildi mi, eylemi yapan adlandırıldı mı?",
          "Bilgi kaybı var mı — dört haftalık iade süresi yazıldı mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Für die Bearbeitung Ihres Antrags zahlen Sie …", tr: "başvurunuzun işlenmesi için … ödersiniz", en: "you pay … for processing your application" },
          { de: "In zwei Fällen entfällt die Gebühr:", tr: "iki durumda ücret alınmaz", en: "the fee does not apply in two cases" },
          { de: "Wir erstatten Ihnen den Betrag innerhalb von vier Wochen.", tr: "tutarı dört hafta içinde iade ederiz", en: "we will refund the amount within four weeks" },
        ],
        sample:
          "Gebühr für Ihren Antrag\n\n" +
          "Für die Bearbeitung Ihres Antrags zahlen Sie 45 Euro.\n\n" +
          "In zwei Fällen entfällt die Gebühr:\n\n" +
          "1. Sie beziehen laufende Leistungen zur Sicherung des Lebensunterhalts. Legen Sie uns dafür bitte einen gültigen Bescheid vor.\n\n" +
          "2. Sie nehmen den Antrag zurück, bevor wir mit der Bearbeitung beginnen — spätestens jedoch zwei Wochen nach Eingang.\n\n" +
          "Haben Sie in diesem zweiten Fall bereits gezahlt, erstatten wir Ihnen den Betrag innerhalb von vier Wochen.\n\n" +
          "Bei Fragen erreichen Sie uns unter der oben genannten Nummer.",
      },
    ],
  },
];
