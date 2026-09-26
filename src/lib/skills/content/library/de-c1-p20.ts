import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 20.
 *
 * Hücreyi YİRMİYE tamamlayan partilerin sonuncusu (11–20): bununla C1'in
 * beş beceri hücresinin her biri yirmi egzersize ulaşıyor. Kurallar ve
 * emsal: `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 20 yavaş yolculuk hattı: bir gece treni denemesi, bir tüketici
 * bilgilendirme yayını, bir demiryolu şirketine şikâyet. Dil bilgisi çift
 * mastar (Ersatzinfinitiv) ve yan cümlede yardımcı fiilin öne geçmesi —
 * B2'deki „hätte … müssen“den farkı, kuralın Perfekt'te, lassen/sehen'de
 * ve yan cümle dizilişinde bütünüyle işlenmesi.
 */
export const deC1P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r20",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Die Nacht im Liegewagen",
    genre: "essay",
    intro: "Bir yolculuk denemesi: uçak yerine gece trenine binen yazar yavaşlığın neyi değiştirdiğini ve kime erişilebilir olduğunu düşünüyor.",
    gloss: [
      { de: "der Liegewagen", tr: "kuşetli vagon", en: "couchette car" },
      { de: "das Abteil", tr: "kompartıman", en: "compartment" },
      { de: "rangieren", tr: "manevra yapmak", en: "to shunt" },
      { de: "der Übergang", tr: "geçiş", en: "transition" },
      { de: "überspringen", tr: "atlamak", en: "to skip" },
      { de: "die Entschleunigung", tr: "yavaşlama", en: "slowing down" },
    ],
    minutes: 10,
    text:
      "Die Nacht im Liegewagen\n\n" +
      "Ich hätte fliegen können. Der Flug nach Wien hätte eine Stunde gedauert und weniger " +
      "gekostet als der Platz im Liegewagen, den ich schließlich gebucht habe. Dass ich " +
      "trotzdem den Nachtzug genommen habe, hatte zunächst keinen edlen Grund: Ich hatte zu " +
      "lange gewartet, und der Flug war ausgebucht.\n\n" +
      "Um halb neun fuhr der Zug ab. Im Abteil saßen eine Studentin mit einem Cello, ein " +
      "älterer Herr, der jedes Jahr um dieselbe Zeit seine Schwester besucht, und ich. Man " +
      "stellt sich vor, man fragt einander, wohin die Reise geht, und dann entsteht etwas, das " +
      "es im Flugzeug nicht gibt: eine gemeinsame Nacht mit Fremden.\n\n" +
      "Geschlafen habe ich schlecht. Das gehört zur Wahrheit, die in den begeisterten " +
      "Berichten über das Zugfahren gern fehlt. Die Liegen sind schmal, an jedem " +
      "Grenzbahnhof wird rangiert, und um vier Uhr hat der Zug eine Stunde stehen müssen, " +
      "weil vor uns ein Güterzug liegen geblieben war.\n\n" +
      "Und trotzdem bin ich anders angekommen. Nicht ausgeruht, aber angekommen. Ich hatte " +
      "die Strecke gesehen, den Übergang von der Ebene in die Berge, das Licht über der Donau " +
      "am Morgen. Ein Flug überspringt diesen Übergang, und man merkt erst, was fehlt, wenn " +
      "man ihn einmal nicht übersprungen hat.\n\n" +
      "Ich will daraus keine Moral machen. Wer zwei Tage Urlaub hat und kleine Kinder, für den " +
      "ist eine Nacht im Zug keine Entschleunigung, sondern eine Zumutung. Langsamkeit setzt " +
      "Zeit voraus, und Zeit ist ungleich verteilt.\n\n" +
      "Aber ich habe mir vorgenommen, vor der nächsten Reise wenigstens zu prüfen, ob ich " +
      "hätte fahren können, bevor ich fliege. Beim letzten Mal habe ich es mir gar nicht erst " +
      "überlegen wollen.",
    questions: [
      {
        text: "Warum nahm der Autor zunächst den Nachtzug?",
        options: [
          "aus fester Überzeugung",
          "weil der Zug billiger war",
          "weil der Flug ausgebucht war",
        ],
        answer: 2,
        explain: "Başta asil bir neden yoktu: çok beklemişti ve uçak dolmuştu.",
      },
      {
        text: "Was gibt es laut Text im Flugzeug nicht?",
        options: [
          "eine gemeinsame Nacht mit Fremden",
          "einen Platz am Fenster",
          "eine pünktliche Ankunft",
        ],
        answer: 0,
        explain: "Tanışma, karşılıklı sorular ve yabancılarla paylaşılan bir gece yalnız trende oluyor.",
      },
      {
        kind: "truefalse",
        text: "Der Autor hat im Zug sehr gut geschlafen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Geschlafen habe ich schlecht“ — yatak dar, manevra var, tren bir saat durmuş.",
      },
      {
        kind: "gapfill",
        text: "Um vier Uhr hat der Zug eine ___ stehen müssen.",
        options: [],
        answer: 0,
        accept: ["Stunde"],
        explain: "Önlerinde bir yük treni kaldığı için tren bir saat beklemek zorunda kalmış.",
      },
      {
        kind: "short_answer",
        text: "Was setzt Langsamkeit laut Autor voraus?",
        options: [],
        answer: 0,
        accept: ["Zeit", "freie Zeit"],
        explain: "„Langsamkeit setzt Zeit voraus, und Zeit ist ungleich verteilt.“",
      },
      {
        text: "Was hat sich der Autor für die nächste Reise vorgenommen?",
        options: [
          "nie mehr zu fliegen",
          "zu prüfen, ob er fahren kann",
          "nur noch Nachtzüge zu buchen",
        ],
        answer: 1,
        explain: "Uçmadan önce trenle gidip gidemeyeceğini en azından kontrol edecek.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l20",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Verbraucherinfo: Nachtzug buchen",
    genre: "info",
    intro: "Bir tüketici bilgilendirme yayını: gece treni biletinde nelere dikkat edilmeli, gecikme ve iptalde hangi haklar var.",
    gloss: [
      { de: "die Buchung", tr: "rezervasyon", en: "booking" },
      { de: "der Sitzwagen", tr: "oturmalı vagon", en: "seated coach" },
      { de: "das Schlafabteil", tr: "yataklı kompartıman", en: "sleeping compartment" },
      { de: "der Anschluss", tr: "aktarma", en: "connection" },
      { de: "die Entschädigung", tr: "tazminat", en: "compensation" },
      { de: "beantragen", tr: "başvurmak", en: "to apply for" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Moderatorin", text: "Nachtzüge sind wieder gefragt, und mit der Nachfrage wachsen die Beschwerden. Die Verbraucherzentrale hat die häufigsten Fragen gesammelt und beantwortet." },
      { speaker: "Moderatorin", text: "Zunächst zur Buchung: Es gibt drei Kategorien, den Sitzwagen, den Liegewagen mit vier oder sechs Betten und das Schlafabteil mit eigenem Waschbecken." },
      { speaker: "Herr Wolter", text: "Der Preisunterschied ist groß, und viele buchen den Sitzwagen, um zu sparen. Davon rate ich ab, wenn die Fahrt länger als acht Stunden dauert. Da spart man am falschen Ende." },
      { speaker: "Moderatorin", text: "Die Plätze werden meist erst drei bis sechs Monate vor der Fahrt freigegeben. Wer früher sucht, findet oft nichts und hält den Zug fälschlich für ausgebucht." },
      { speaker: "Herr Wolter", text: "Das ist die häufigste Enttäuschung, von der wir hören. Die Leute hätten buchen können, sie haben nur zu früh gesucht." },
      { speaker: "Moderatorin", text: "Bei Verspätungen gelten die europäischen Fahrgastrechte. Ab sechzig Minuten Verspätung am Ziel gibt es ein Viertel des Fahrpreises zurück, ab zwei Stunden die Hälfte." },
      { speaker: "Herr Wolter", text: "Wichtig ist der Anschluss. Wer mit einem einzigen Ticket bis zum Endziel gebucht hat, ist abgesichert. Wer zwei Tickets kombiniert, verliert diesen Schutz, sobald er den Anschluss verpasst." },
      { speaker: "Moderatorin", text: "Fällt ein Nachtzug ganz aus, muss das Unternehmen eine Alternative anbieten oder die Übernachtung in einem Hotel bezahlen." },
      { speaker: "Herr Wolter", text: "Heben Sie dafür alle Belege auf und fordern Sie die Bestätigung des Ausfalls schriftlich an. Mündliche Zusagen am Bahnsteig helfen Ihnen später wenig." },
      { speaker: "Moderatorin", text: "Die Entschädigung wird nicht automatisch ausgezahlt. Man muss sie innerhalb von drei Monaten beantragen, am besten über das Formular des Unternehmens." },
      { speaker: "Herr Wolter", text: "Und ein letzter Rat: Packen Sie Ohrstöpsel ein. Die erstattet Ihnen niemand, aber sie retten so manche Nacht im Liegewagen." },
    ],
    questions: [
      {
        text: "Wovon rät Herr Wolter bei langen Fahrten ab?",
        options: ["vom Schlafabteil", "vom Sitzwagen", "vom Liegewagen"],
        answer: 1,
        explain: "Sekiz saatten uzun yolculukta oturmalı vagonla tasarruf yanlış yerden tasarruf.",
      },
      {
        text: "Warum halten viele den Zug fälschlich für ausgebucht?",
        options: [
          "weil die Website fehlerhaft ist",
          "weil Gruppen alles reservieren",
          "weil sie zu früh suchen",
        ],
        answer: 2,
        explain: "Yerler çoğunlukla yolculuktan üç ila altı ay önce satışa açılıyor.",
      },
      {
        kind: "truefalse",
        text: "Wer zwei Tickets kombiniert, verliert beim verpassten Anschluss seinen Schutz.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Tek biletle son durağa kadar alan korunuyor; iki bileti birleştiren bu korumayı kaybediyor.",
      },
      {
        kind: "gapfill",
        text: "Ab zwei Stunden Verspätung gibt es die ___ des Fahrpreises zurück.",
        options: [],
        answer: 0,
        accept: ["Hälfte"],
        explain: "Altmış dakikadan itibaren dörtte bir, iki saatten itibaren yarısı geri ödeniyor.",
      },
      {
        kind: "short_answer",
        text: "Innerhalb welcher Frist muss man die Entschädigung beantragen?",
        options: [],
        answer: 0,
        accept: ["innerhalb von drei Monaten", "drei Monate", "in drei Monaten"],
        explain: "Tazminat kendiliğinden ödenmiyor; üç ay içinde başvurmak gerekiyor.",
      },
      {
        text: "Was soll man bei einem Ausfall schriftlich anfordern?",
        options: [
          "die Bestätigung des Ausfalls",
          "einen neuen Fahrplan",
          "eine Liste mit Hotels",
        ],
        answer: 0,
        explain: "Peronda verilen sözlü sözler sonradan pek işe yaramıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w20",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Beschwerde mit Augenmaß",
    genre: "email",
    intro: "Bir demiryolu şirketine şikâyet yazıyorsun: önce iki cümle kur, sonra öfkeyi değil olguları öne çıkaran ve talebini net söyleyen bir e-posta yaz.",
    gloss: [
      { de: "die Buchungsnummer", tr: "rezervasyon numarası", en: "booking number" },
      { de: "ausfallen", tr: "iptal olmak", en: "to be canceled" },
      { de: "die Übernachtung", tr: "konaklama", en: "overnight stay" },
      { de: "der Beleg", tr: "makbuz", en: "receipt" },
      { de: "die Erstattung", tr: "geri ödeme", en: "refund" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Başka bir bağlantıyla gitmek zorunda kaldık.",
        answer: "Wir haben einen anderen Anschluss nehmen müssen.",
        alternatives: ["Einen anderen Anschluss haben wir nehmen müssen."],
        hint: "Modal fiil başka bir mastarla Perfekt'e girince „gemusst“ yerine mastar („müssen“) gelir ve en sona gider.",
      },
      {
        kind: "build",
        tr: "Bize daha önce haber verilebilirdi.",
        answer: "Man hätte uns früher informieren können.",
        alternatives: ["Früher hätte man uns informieren können."],
        hint: "Konjunktiv II'nin geçmişinde modal fiil mastar hâlinde kalır: hätte … informieren können.",
      },
      {
        kind: "free",
        prompt:
          "Gece treni iptal edilen bir yolcu olarak demiryolu şirketine e-posta yaz: rezervasyonu ve olayı tarih, saat ve olgularla anlat, yaşadığın somut zararı belirt, hangi hakka dayandığını söyle, ne talep ettiğini tutarıyla açıkça yaz ve bir süre belirterek nazikçe kapat.",
        checklist: [
          "Rezervasyonu ve olayı olgularla anlat",
          "Somut zararı ve masrafları belirt",
          "Dayandığın hakkı söyle ve talebini tutarıyla yaz",
          "Bir süre belirterek nazikçe kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "Unter der Buchungsnummer … hatte ich … gebucht.", tr: "… numaralı rezervasyonla … ayırtmıştım.", en: "Under booking number … I had booked …" },
          { de: "Der Zug fiel ersatzlos aus, sodass …", tr: "Tren yerine başka bir sefer konmadan iptal edildi, bu yüzden …", en: "The train was canceled without replacement, so that …" },
          { de: "Dadurch sind mir folgende Kosten entstanden: …", tr: "Bu yüzden şu masraflarım oldu: …", en: "This caused me the following costs: …" },
          { de: "Gemäß den Fahrgastrechten steht mir … zu.", tr: "Yolcu haklarına göre … hakkım var.", en: "Under passenger rights I am entitled to …" },
          { de: "Ich bitte Sie, den Betrag bis zum … zu erstatten.", tr: "Tutarı … tarihine kadar geri ödemenizi rica ediyorum.", en: "I ask you to refund the amount by …" },
        ],
        sample:
          "Sehr geehrte Damen und Herren, unter der Buchungsnummer 48213-K hatte ich für den " +
          "3. November zwei Plätze im Liegewagen des Nachtzugs von Hamburg nach Wien gebucht. " +
          "Etwa eine Stunde vor der Abfahrt erhielten wir am Bahnsteig die mündliche Auskunft, " +
          "der Zug falle wegen eines technischen Defekts aus. Der Zug fiel ersatzlos aus, sodass " +
          "wir um 22 Uhr noch ein Hotel in Bahnhofsnähe suchen mussten. Am nächsten Morgen " +
          "haben wir einen anderen Anschluss nehmen müssen. " +
          "Dadurch sind mir neben dem ursprünglichen Fahrpreis von 149 Euro folgende Kosten " +
          "entstanden: 164 Euro für die Übernachtung und 58 Euro für die neuen Fahrkarten. Alle " +
          "Belege liegen dieser E-Mail bei. " +
          "Man hätte uns früher informieren können, da der Defekt nach Auskunft des Personals " +
          "schon am Nachmittag bekannt war; das ist mir wichtig, auch wenn es keinen Anspruch " +
          "begründet. " +
          "Gemäß den Fahrgastrechten steht mir die Erstattung des Fahrpreises sowie der " +
          "angemessenen Übernachtungskosten zu. Ich bitte Sie daher, den Betrag von insgesamt " +
          "371 Euro bis zum 30. November auf mein unten genanntes Konto zu erstatten. " +
          "Mit freundlichen Grüßen, Selin Hartmann",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s20",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Ist langsames Reisen ein Privileg?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir değeri savun ve onun kime erişilebilir olduğunu dürüstçe sorgula.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Yavaş yolculuk (tren, bisiklet, yürüyüş) bir erdem mi, yoksa zamanı ve parası olanların ayrıcalığı mı? Yavaşlığın bir değerini adlandır, kime erişilemez olduğunu kabul et, bu eşitsizliği azaltacak bir önlem öner ve kendi alışkanlığınla bitir.",
      bulletsTr: [
        "Yavaşlığın bir değerini adlandır",
        "Kime erişilemez olduğunu kabul et",
        "Eşitsizliği azaltacak bir önlem öner",
        "Kendi alışkanlığınla bitir",
      ],
      targets: [
        { de: "Was man beim langsamen Reisen gewinnt, ist …", tr: "Yavaş yolculukta kazanılan şey …" },
        { de: "Man muss allerdings zugeben, dass …", tr: "Ama şunu kabul etmek gerekir: …" },
        { de: "Ändern ließe sich das, wenn …", tr: "… olursa bu değiştirilebilirdi" },
        { de: "Ich selbst hätte … können, bin aber …", tr: "Ben de … yapabilirdim, ama …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Was man beim langsamen Reisen gewinnt, ist nicht in erster Linie Ruhe, sondern der " +
        "Übergang: Man sieht, wie sich eine Landschaft verändert, und kommt an einem Ort an, " +
        "statt plötzlich dort zu sein. Das klingt romantisch, hat aber eine praktische Folge, " +
        "denn wer den Weg kennt, hat eine andere Vorstellung von Entfernung. " +
        "Man muss allerdings zugeben, dass sich diese Erfahrung nicht jeder leisten kann. Wer " +
        "zehn Tage Urlaub im Jahr hat und Kinder, die am Montag wieder in die Schule müssen, " +
        "verliert mit einer Zugreise von vierzehn Stunden einen ganzen Urlaubstag. " +
        "Ändern ließe sich das, wenn Arbeitgeber Reisetage nicht als Urlaub zählen würden, " +
        "sofern man mit dem Zug statt mit dem Flugzeug fährt; einige Firmen machen das bereits. " +
        "Ich selbst hätte im letzten Jahr zweimal mit dem Zug fahren können, bin aber geflogen, " +
        "weil es bequemer war und niemand danach gefragt hat. Das ist kein Privileg, sondern " +
        "Gewohnheit, und eine Gewohnheit lässt sich leichter ändern als ein Arbeitsvertrag.",
      rubricHint:
        "Bir değer, eşitsizliğin dürüstçe kabulü, somut bir önlem ve kişisel bir itiraf beklenir; „zugeben, dass“, „ließe sich“ ve „hätte … können“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g20",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "dass wir haben warten müssen",
    genre: "grammar",
    intro: "Modal fiil Perfekt'e ya da Konjunktiv II'nin geçmişine girince Almanca beklenmedik bir kurala uyar: ortaç yerine mastar gelir ve yardımcı fiil yer değiştirir.",
    focus: "Çift mastar (Ersatzinfinitiv) ve yan cümlede yardımcı fiilin öne geçmesi: dass wir haben warten müssen",
    gloss: [
      { de: "umsteigen", tr: "aktarma yapmak", en: "to change trains" },
      { de: "die Durchsage", tr: "anons", en: "announcement" },
      { de: "umbuchen", tr: "rezervasyonu değiştirmek", en: "to rebook" },
      { de: "informieren", tr: "bilgilendirmek", en: "to inform" },
      { de: "das Ticket", tr: "bilet", en: "ticket" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Perfekt'te modal fiil: gemusst değil müssen",
        tr: "Modal fiil başka bir mastarla birlikte Perfekt'e girince ortaç (gemusst, gekonnt) yerine MASTAR biçimi gelir: „Der Zug hat warten müssen.“ Buna Ersatzinfinitiv denir. Modal fiil tek başına kullanılırsa normal ortaç kalır: „Er hat es gemusst.“ „hätte … müssen“ yapısı aynı kuralın Konjunktiv II'deki uygulamasıdır.",
        examples: [
          { de: "Der Zug hat eine Stunde stehen müssen.", tr: "Tren bir saat durmak zorunda kaldı.", note: "Ersatzinfinitiv" },
          { de: "Wir haben in Salzburg umsteigen müssen.", tr: "Salzburg'da aktarma yapmak zorunda kaldık.", note: "gemusst değil" },
          { de: "Ich habe es nicht gewollt.", tr: "Bunu istemedim.", note: "tek başına: ortaç" },
        ],
      },
      {
        heading: "lassen, sehen, hören de aynı kurala uyar",
        tr: "„lassen“ ve algı fiilleri (sehen, hören) bir mastarla birlikteyken Perfekt'te de mastar biçimini alır: „Ich habe das Ticket umbuchen lassen.“ „sehen“ ve „hören“de ortaçlı biçim de duyulur, ama yazıda mastar daha yaygındır. „lassen“de ise ortaçlı biçim („gelassen“) bu yapıda yanlış sayılır.",
        examples: [
          { de: "Ich habe mein Ticket umbuchen lassen.", tr: "Biletimi değiştirttim.", note: "lassen" },
          { de: "Wir haben den Zug kommen sehen.", tr: "Trenin geldiğini gördük.", note: "sehen" },
          { de: "Sie hat die Durchsage nicht verstehen können.", tr: "Anonsu anlayamadı.", note: "können" },
        ],
      },
      {
        heading: "Yan cümlede yardımcı fiil öne geçer",
        tr: "Çift mastar varsa yan cümlede çekimli yardımcı fiil sona değil, iki mastarın ÖNÜNE geçer: „…, dass wir haben warten müssen“, „…, weil man uns hätte informieren sollen“. Bu, yan cümlede çekimli fiilin sona gittiği kuralın en önemli istisnasıdır.",
        examples: [
          { de: "Ich ärgere mich, dass wir haben warten müssen.", tr: "Beklemek zorunda kalmamıza sinirleniyorum.", note: "haben öne geçer" },
          { de: "Er sagt, dass man uns hätte informieren sollen.", tr: "Bize haber verilmesi gerektiğini söylüyor.", note: "hätte öne geçer" },
          { de: "Weil ich das Ticket habe umbuchen lassen, fahre ich später.", tr: "Bileti değiştirttiğim için daha geç gidiyorum.", note: "lassen ile de" },
        ],
      },
    ],
    questions: [
      {
        text: "Der Zug hat eine Stunde stehen ___.",
        options: ["müssen", "gemusst", "zu müssen"],
        answer: 0,
        explain: "Modal fiil başka bir mastarla Perfekt'te mastar biçimini alır: stehen müssen.",
      },
      {
        text: "Welcher Nebensatz ist richtig?",
        options: [
          "…, dass wir warten müssen haben.",
          "…, dass wir haben warten müssen.",
          "…, dass wir warten haben müssen.",
        ],
        answer: 1,
        explain: "Çift mastarlı yan cümlede yardımcı fiil iki mastarın önüne geçer.",
      },
      {
        text: "In welchem Satz steht das Partizip „gemusst“ zu Recht?",
        options: [
          "Wir haben umsteigen gemusst.",
          "Er hat früher gehen gemusst.",
          "Er hat es gemusst.",
        ],
        answer: 2,
        explain: "Modal fiil yanında başka bir mastar yoksa normal ortaç kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Ich habe mein Ticket umbuchen ___. (lassen)",
        options: [],
        answer: 0,
        accept: ["lassen"],
        explain: "„lassen“ bir mastarla birlikteyken Perfekt'te de mastar kalır.",
      },
      {
        kind: "gapfill",
        text: "Man ___ uns früher informieren können. (haben, Konjunktiv II)",
        options: [],
        answer: 0,
        accept: ["hätte"],
        explain: "Konjunktiv II'nin geçmişi „hätte“ ile kurulur; modal fiil mastar kalır.",
      },
      {
        kind: "gapfill",
        text: "Sie hat die Durchsage nicht verstehen ___. (können)",
        options: [],
        answer: 0,
        accept: ["können"],
        explain: "„gekonnt“ değil: başka bir mastarın yanında modal fiil mastar biçimindedir.",
      },
      {
        kind: "gapfill",
        text: "Er sagt, dass man uns ___ informieren sollen. (haben, Konjunktiv II)",
        options: [],
        answer: 0,
        accept: ["hätte"],
        explain: "Yan cümlede „hätte“ sona değil, iki mastarın önüne gelir.",
      },
      {
        kind: "order",
        text: "Yan cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["weil", "wir", "haben", "umsteigen", "müssen"],
        explain: "Çift mastar varsa yardımcı fiil „haben“ iki mastarın önünde durur.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe das Rad reparieren gelassen.“ ist die übliche Form.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Doğrusu „reparieren lassen“: mastarla birlikte „lassen“ ortaç almaz.",
      },
      {
        kind: "truefalse",
        text: "Steht ein Modalverb allein, bildet es das Perfekt mit dem Partizip, etwa „gekonnt“.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Er hat es gekonnt“: yanında başka mastar yoksa ortaç kullanılır.",
      },
    ],
  },
];
