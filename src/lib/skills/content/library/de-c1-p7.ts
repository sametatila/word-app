import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 kamusal alan ve miras hattı: bir açık mektup, bir radyo dosyası,
 * bir itiraz dilekçesi. Dil bilgisi tartışma bağlaçları — zwar … aber,
 * zumal, insofern, geschweige denn.
 */
export const deC1P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r7",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Offener Brief zur Umgestaltung des Bahnhofsvorplatzes",
    genre: "letter",
    intro: "Bir girişimin belediyeye açık mektubu: neye itiraz ediyorlar, neyi kabul ediyorlar, ne istiyorlar.",
    gloss: [
      { de: "die Planung", tr: "planlama", en: "planning" },
      { de: "die Aufenthaltsqualität", tr: "vakit geçirme niteliği", en: "quality as a place to stay" },
      { de: "die Armlehne", tr: "kol dayama", en: "armrest" },
      { de: "die Verwaltung", tr: "idare", en: "administration" },
      { de: "die Sitzgelegenheit", tr: "oturma yeri", en: "seating" },
      { de: "nachvollziehbar", tr: "anlaşılabilir", en: "comprehensible" },
    ],
    minutes: 10,
    text:
      "Sehr geehrte Frau Oberbürgermeisterin,\n\n" +
      "wir begrüßen ausdrücklich, dass der Bahnhofsvorplatz nach zwanzig Jahren umgestaltet wird. " +
      "Der jetzige Zustand ist niemandem zuzumuten, und die vorgelegte Planung enthält Elemente, " +
      "die wir seit Jahren fordern: mehr Bäume, eine klare Wegführung, Fahrradstellplätze in " +
      "ausreichender Zahl.\n\n" +
      "Unser Einwand betrifft einen einzigen Punkt, der in den Unterlagen kaum auffällt. " +
      "Die geplanten Sitzgelegenheiten sind sämtlich als Einzelhocker mit Armlehnen ausgeführt. " +
      "Diese Bauform ist zwar wetterfest und pflegeleicht, verhindert aber, dass sich jemand " +
      "hinlegt — und genau darin besteht bekanntlich ihr eigentlicher Zweck.\n\n" +
      "Wir halten es für problematisch, eine soziale Frage über die Form eines Möbels zu " +
      "beantworten, zumal die Stadt im selben Papier von „Aufenthaltsqualität für alle“ spricht. " +
      "Wer nachts keinen anderen Ort hat, verschwindet durch eine Armlehne nicht; " +
      "er wechselt lediglich in die Seitenstraßen, wo ihn niemand sieht und niemand erreicht.\n\n" +
      "Uns ist bewusst, dass die Verwaltung hier unter Druck steht und dass Beschwerden aus " +
      "der Nachbarschaft vorliegen. Diese Beschwerden sind nachvollziehbar und wir nehmen sie " +
      "ernst. Nur folgt daraus nicht, dass die Antwort im Mobiliar liegen muss.\n\n" +
      "Wir beantragen daher, in der weiteren Planung mindestens ein Drittel der Sitzflächen " +
      "als durchgehende Bänke auszuführen und parallel das bereits beschlossene Konzept für " +
      "Notunterkünfte vorzuziehen. Beides gehört zusammen; das eine ohne das andere wäre " +
      "entweder unwirksam oder unehrlich.\n\n" +
      "Für ein Gespräch stehen wir jederzeit zur Verfügung.",
    questions: [
      {
        text: "Wie steht die Initiative zur Umgestaltung insgesamt?",
        options: [
          "Sie lehnt sie ab.",
          "Sie begrüßt sie und kritisiert einen Punkt.",
          "Sie fordert eine völlig neue Planung.",
        ],
        answer: 1,
        explain: "Metin planı açıkça olumlu buluyor; itiraz tek bir noktaya.",
      },
      {
        text: "Was ist der eigentliche Zweck der Armlehnen laut Brief?",
        options: [
          "Sie sollen das Hinlegen verhindern.",
          "Sie erleichtern die Reinigung.",
          "Sie schützen vor Wetter.",
        ],
        answer: 0,
        explain: "Hava ve bakım kolaylığı kabul ediliyor ama asıl amaç yatmayı engellemek.",
      },
      {
        kind: "truefalse",
        text: "Die Initiative hält die Beschwerden der Nachbarschaft für unberechtigt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Diese Beschwerden sind nachvollziehbar und wir nehmen sie ernst.“",
      },
      {
        kind: "gapfill",
        text: "Gefordert wird, mindestens ein ___ der Sitzflächen als durchgehende Bänke auszuführen.",
        options: [],
        answer: 0,
        accept: ["Drittel"],
        explain: "„mindestens ein Drittel der Sitzflächen als durchgehende Bänke“.",
      },
      {
        kind: "short_answer",
        text: "Welches zweite Vorhaben soll vorgezogen werden?",
        options: [],
        answer: 0,
        accept: [
          "das Konzept für Notunterkünfte",
          "die Notunterkünfte",
          "das Notunterkunftskonzept",
        ],
        explain: "„das bereits beschlossene Konzept für Notunterkünfte vorzuziehen“.",
      },
      {
        text: "Was meint der Satz „das eine ohne das andere wäre entweder unwirksam oder unehrlich“?",
        options: [
          "Beide Maßnahmen müssen zusammen kommen.",
          "Keine der beiden Maßnahmen wirkt.",
          "Die Stadt soll sich für eine entscheiden.",
        ],
        answer: 0,
        explain: "Banklar tek başına yetersiz, barınak tek başına görünmez kalır.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l7",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Feature: Was ein Platz erlaubt",
    genre: "report",
    intro: "Bir radyo dosyası: kentsel mobilyanın sessiz kuralları, üç ses ve bir örnek.",
    gloss: [
      { de: "die Bank", tr: "bank", en: "bench" },
      { de: "die Absicht", tr: "niyet", en: "intention" },
      { de: "unauffällig", tr: "göze çarpmayan", en: "inconspicuous" },
      { de: "die Zugänglichkeit", tr: "erişilebilirlik", en: "accessibility" },
      { de: "die Anordnung", tr: "düzenleme", en: "arrangement" },
      { de: "rückgängig machen", tr: "geri almak", en: "to reverse" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Reporterin", text: "Ein Platz sagt selten, was er will. Er zeigt es: durch die Anordnung der Bänke, durch die Breite der Wege, durch das, was fehlt." },
      { speaker: "Frau Prof. Ohler", text: "Das Interessante ist, dass diese Entscheidungen fast nie begründet werden. Sie stehen in Ausschreibungen als technische Angaben." },
      { speaker: "Reporterin", text: "Armlehnen in der Mitte einer Bank etwa erscheinen in den Unterlagen als Komfortmerkmal. Ihre Wirkung ist eine andere." },
      { speaker: "Herr Kienle", text: "Ich habe sechzehn Jahre für eine Stadtverwaltung geplant. Niemand hat je gesagt: Wir wollen Leute vertreiben. Gesagt wurde: pflegeleicht, robust, unauffällig." },
      { speaker: "Reporterin", text: "Unauffällig ist hier das entscheidende Wort. Was nicht begründet wird, muss auch nicht verteidigt werden." },
      { speaker: "Frau Prof. Ohler", text: "Und es lässt sich schwer rückgängig machen. Eine Bank steht dreißig Jahre. Ein Beschluss dagegen lässt sich in zwei Jahren ändern." },
      { speaker: "Reporterin", text: "In Rotterdam hat eine Bürgerinitiative vor fünf Jahren durchgesetzt, dass jede Sitzgelegenheit im Vergabetext eine Zeile zur Zugänglichkeit enthält." },
      { speaker: "Herr Kienle", text: "Das klingt nach Bürokratie, hat aber genau das bewirkt, was Diskussionen nicht bewirkt hatten: Die Absicht musste aufgeschrieben werden." },
      { speaker: "Reporterin", text: "Seitdem stehen dort wieder durchgehende Bänke — nicht überall, aber an sieben von zwölf umgebauten Plätzen." },
    ],
    questions: [
      {
        text: "Wie erscheinen Armlehnen laut Feature in den Unterlagen?",
        options: ["als Komfortmerkmal", "als Sicherheitsmaßnahme", "als Sparmaßnahme"],
        answer: 0,
        explain: "Belgelerde konfor özelliği olarak geçiyor; etkisi başka.",
      },
      {
        text: "Welches Wort nennt der Beitrag als entscheidend?",
        options: ["robust", "unauffällig", "pflegeleicht"],
        answer: 1,
        explain: "„Unauffällig ist hier das entscheidende Wort“ — gerekçelendirilmeyen savunulmak zorunda da kalmıyor.",
      },
      {
        kind: "truefalse",
        text: "Herr Kienle berichtet, die Absicht sei offen ausgesprochen worden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Niemand hat je gesagt: Wir wollen Leute vertreiben.“",
      },
      {
        kind: "gapfill",
        text: "Herr Kienle hat ___ Jahre für eine Stadtverwaltung geplant.",
        options: [],
        answer: 0,
        accept: ["sechzehn", "16"],
        explain: "„Ich habe sechzehn Jahre für eine Stadtverwaltung geplant.“",
      },
      {
        kind: "short_answer",
        text: "Was musste in Rotterdam in den Vergabetext?",
        options: [],
        answer: 0,
        accept: [
          "eine Zeile zur Zugänglichkeit",
          "Zugänglichkeit",
          "eine Zeile über Zugänglichkeit",
        ],
        explain: "Her oturma yeri için erişilebilirliğe dair bir satır.",
      },
      {
        text: "Warum wiegt eine Bank laut Frau Prof. Ohler schwerer als ein Beschluss?",
        options: [
          "Sie ist teurer.",
          "Sie steht dreißig Jahre und ist schwer rückgängig zu machen.",
          "Sie wird öfter benutzt.",
        ],
        answer: 1,
        explain: "Karar iki yılda değişir, bank otuz yıl durur.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w7",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Einwand im Beteiligungsverfahren",
    genre: "formal",
    intro: "Resmî bir katılım sürecine itiraz yazıyorsun: önce iki cümle kur, sonra kabul ettiğin ve itiraz ettiğin noktayı ayıran bir dilekçe yaz.",
    gloss: [
      { de: "das Verfahren", tr: "süreç", en: "procedure" },
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "die Auslegung", tr: "askıya çıkarma", en: "public display" },
      { de: "die Begründung", tr: "gerekçe", en: "justification" },
      { de: "die Maßnahme", tr: "önlem", en: "measure" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Plan teknik olarak ikna edici olsa da sosyal etkisi gerekçelendirilmemiş.",
        answer: "Der Plan ist zwar technisch überzeugend, seine soziale Wirkung ist aber nicht begründet.",
        alternatives: ["Zwar ist der Plan technisch überzeugend, seine soziale Wirkung ist aber nicht begründet."],
        hint: "„zwar … aber“ ikilisi bir kabulü ve arkasından gelen itirazı bağlar.",
      },
      {
        kind: "build",
        tr: "Bu, özellikle idarenin kendisi „herkes için“ dediği için ağır basıyor.",
        answer: "Das wiegt umso schwerer, als die Verwaltung selbst von „für alle“ spricht.",
        alternatives: ["Umso schwerer wiegt das, als die Verwaltung selbst von „für alle“ spricht."],
        hint: "„umso … als“ bir gerekçeyi güçlendirir; „zumal“ ile de kurulabilir.",
      },
      {
        kind: "free",
        prompt:
          "Bir plana resmî itiraz yaz: hangi belgeye ve hangi süreye atıf yaptığını söyle, planın kabul ettiğin yanını adlandır, itirazını tek bir noktada topla ve gerekçelendir, olası karşı argümanı kendin kur ve yanıtla, somut bir istekle bitir.",
        checklist: [
          "Belgeye ve süreye atıf yap",
          "Kabul ettiğin yanı adlandır",
          "İtirazını tek noktada topla ve gerekçelendir",
          "Karşı argümanı kendin kur, yanıtla ve somut istekle bitir",
        ],
        minWords: 150,
        phrases: [
          { de: "Im Rahmen der Auslegung vom … erhebe ich folgenden Einwand:", tr: "… tarihli askı süresi kapsamında şu itirazı yapıyorum:", en: "Within the public display from …, I raise the following objection:" },
          { de: "Ausdrücklich begrüße ich, dass …", tr: "… olmasını açıkça olumlu buluyorum", en: "I expressly welcome that …" },
          { de: "Mein Einwand beschränkt sich auf …", tr: "İtirazım yalnız … ile sınırlı", en: "My objection is limited to …" },
          { de: "Dem könnte entgegengehalten werden, dass …", tr: "Buna … diye karşı çıkılabilir", en: "It could be objected that …" },
          { de: "Ich beantrage daher, …", tr: "Bu yüzden … talep ediyorum", en: "I therefore request that …" },
        ],
        sample:
          "Im Rahmen der Auslegung vom 3. bis 31. Mai erhebe ich folgenden Einwand zum Entwurf " +
          "der Umgestaltung des Bahnhofsvorplatzes (Vorlage 2026/114). " +
          "Ausdrücklich begrüße ich, dass die Zahl der Bäume verdoppelt und die Wegführung " +
          "vereinfacht wird; beides entspricht seit Jahren vorgetragenen Anregungen. " +
          "Mein Einwand beschränkt sich auf Ziffer 4.2, die Ausführung der Sitzgelegenheiten. " +
          "Der Plan ist zwar technisch überzeugend, seine soziale Wirkung ist aber nicht begründet: " +
          "Sämtliche Sitzflächen sind als Einzelhocker mit Armlehnen vorgesehen, und diese " +
          "Bauform schließt eine Nutzungsform aus, ohne dass die Unterlagen dies auch nur erwähnen. " +
          "Das wiegt umso schwerer, als die Verwaltung im selben Papier von Aufenthaltsqualität " +
          "für alle spricht. " +
          "Dem könnte entgegengehalten werden, dass durchgehende Bänke höhere Reinigungskosten " +
          "verursachen und dass Beschwerden aus der Nachbarschaft vorliegen. " +
          "Die Kosten sind unstrittig; sie rechtfertigen jedoch keine Maßnahme, deren Zweck " +
          "im Verfahren nicht benannt wird. Die Beschwerden wiederum betreffen ein Problem, " +
          "das durch Möblierung nicht gelöst, sondern lediglich verschoben wird. " +
          "Ich beantrage daher, mindestens ein Drittel der Sitzflächen als durchgehende Bänke " +
          "auszuführen und die Begründung zu Ziffer 4.2 um einen Absatz zur beabsichtigten " +
          "Nutzung zu ergänzen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s7",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Darf Gestaltung erziehen?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir ayrım kur ve onu iki örnekle sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Kamusal alanın tasarımı davranışı yönlendirebilir mi, yönlendirmeli mi? Bir ayrım kur, iki örnekle sına, kendi ayrımının zayıf noktasını söyle ve bir usul önerisiyle bitir.",
      bulletsTr: [
        "Bir ayrım kur ve tanımla",
        "Ayrımı iki örnekle sına",
        "Ayrımının zayıf noktasını söyle",
        "Bir usul önerisiyle bitir",
      ],
      targets: [
        { de: "Ich würde zwischen … und … unterscheiden.", tr: "… ile … arasında ayrım yapardım." },
        { de: "Das eine ist deshalb zulässig, weil …", tr: "Biri şu yüzden meşru: …" },
        { de: "Die Schwäche dieser Unterscheidung liegt darin, dass …", tr: "Bu ayrımın zayıf yanı şu: …" },
        { de: "Deshalb plädiere ich weniger für ein Ergebnis als für ein Verfahren: …", tr: "Bu yüzden bir sonuçtan çok bir usul savunuyorum: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Ich würde zwischen Gestaltung, die etwas ermöglicht, und Gestaltung, die etwas " +
        "unmöglich macht, unterscheiden. " +
        "Das eine ist deshalb zulässig, weil es Alternativen offenlässt: Wer eine breite Stufe " +
        "baut, lädt zum Sitzen ein, verbietet aber nichts. " +
        "Eine Armlehne in der Mitte einer Bank dagegen entfernt eine Möglichkeit vollständig, " +
        "und zwar ausgerechnet für die Gruppe, die am wenigsten Ausweichmöglichkeiten hat. " +
        "Ein zweites Beispiel zeigt, dass die Grenze nicht immer so klar liegt: " +
        "Ein Zaun um ein Gleis macht ebenfalls etwas unmöglich, und niemand hält ihn für " +
        "unzulässig, weil das verhinderte Verhalten tödlich wäre. " +
        "Die Schwäche meiner Unterscheidung liegt also darin, dass sie die Frage nur verschiebt: " +
        "Sie zwingt mich zu sagen, welches Verhalten ich für schutzwürdig halte, " +
        "und das ist eine politische und keine gestalterische Entscheidung. " +
        "Deshalb plädiere ich weniger für ein Ergebnis als für ein Verfahren: " +
        "Wenn eine Maßnahme ein Verhalten ausschließt, muss dieses Verhalten in den Unterlagen " +
        "benannt werden. Dann kann man darüber streiten — heute streitet man über Sitzhöhen, " +
        "weil das andere gar nicht dasteht.",
      rubricHint:
        "Bir ayrım, iki sınama ve kendi konumunun zayıf yanının kabulü beklenir; „unterscheiden zwischen“, „ausgerechnet“ ve „plädieren für“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g7",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "zwar … aber, zumal, insofern",
    genre: "grammar",
    intro: "Tartışmanın Almancası bağlaçlarla kurulur; her biri okura cümlenin nereye gittiğini önceden söyler.",
    focus: "Tartışma bağlaçları: zwar … aber, zumal, insofern, geschweige denn",
    gloss: [
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "überzeugend", tr: "ikna edici", en: "convincing" },
      { de: "die Kritik", tr: "eleştiri", en: "criticism" },
      { de: "zutreffen", tr: "geçerli olmak", en: "to apply" },
      { de: "begründen", tr: "gerekçelendirmek", en: "to justify" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "zwar … aber: önce kabul, sonra itiraz",
        tr: "„zwar“ okura şunu haber verir: şimdi bir kabul geliyor, ama asıl söylenecek şey arkadan gelecek. Bu yüzden „zwar“lı cümleyi tek başına bırakmak yarım kalmış sayılır. „aber“ yerine „doch“ ya da „allerdings“ da gelebilir; anlam aynı, üslup biraz daha yazılıdır.",
        examples: [
          { de: "Der Plan ist zwar überzeugend, aber teuer.", tr: "Plan ikna edici ama pahalı.", note: "kabul + itiraz" },
          { de: "Zwar trifft die Kritik zu, allerdings ändert sie nichts.", tr: "Eleştiri geçerli ama bir şey değiştirmiyor.", note: "zwar başa da gelebilir" },
          { de: "Die Zahlen stimmen zwar; begründet ist die Maßnahme damit nicht.", tr: "Sayılar doğru; ama önlem bununla gerekçelenmiş olmuyor.", note: "noktalı virgülle de olur" },
        ],
      },
      {
        heading: "zumal: gerekçeyi ağırlaştırır",
        tr: "„zumal“ zaten verilmiş bir gerekçenin üstüne EK ve daha ağır bir gerekçe koyar — „hele ki“, „üstelik“. Yan cümle kurar, yani fiil sona gider. „weil“ ile karıştırılmaz: „weil“ ilk gerekçeyi verir, „zumal“ ikinciyi ve daha güçlüsünü.",
        examples: [
          { de: "Der Einwand ist berechtigt, zumal die Unterlagen nichts dazu sagen.", tr: "İtiraz haklı, üstelik belgeler bu konuda susuyor.", note: "fiil sonda" },
          { de: "Wir sollten warten, zumal noch Daten fehlen.", tr: "Beklemeliyiz, hele ki veriler eksikken.", note: "ek gerekçe" },
          { de: "Das wiegt schwer, zumal es sich wiederholt hat.", tr: "Bu ağır basıyor, üstelik tekrarlandı.", note: "Perfekt: fiil yine sonda" },
        ],
      },
      {
        heading: "insofern ve geschweige denn",
        tr: "„insofern“ bir sınırlama koyar: „bu bakımdan“, „şu ölçüde“. „insofern … als“ biçiminde de gelir ve o zaman yan cümle kurar. „geschweige denn“ ise bir artırma yapar ve yalnız OLUMSUZ cümlede kullanılır: en küçüğü bile olmuyorsa büyüğü hiç olmaz.",
        examples: [
          { de: "Insofern hat die Kritik recht.", tr: "Bu bakımdan eleştiri haklı.", note: "sınırlama" },
          { de: "Der Vergleich ist insofern falsch, als die Fälle nicht gleich sind.", tr: "Karşılaştırma şu ölçüde yanlış: olaylar aynı değil.", note: "insofern … als" },
          { de: "Er hat den Antrag nicht gelesen, geschweige denn begründet.", tr: "Başvuruyu okumadı bile, gerekçelendirmek şöyle dursun.", note: "olumsuz cümle şart" },
        ],
      },
    ],
    questions: [
      {
        text: "Der Plan ist ___ überzeugend, aber zu teuer.",
        options: ["zwar", "zumal", "insofern"],
        answer: 0,
        explain: "„zwar … aber“ ikilisi kabul ve itirazı bağlar.",
      },
      {
        text: "Der Einwand ist berechtigt, ___ die Unterlagen nichts dazu sagen.",
        options: ["zwar", "zumal", "geschweige denn"],
        answer: 1,
        explain: "Ek ve daha ağır bir gerekçe geliyor: zumal.",
      },
      {
        text: "In welchem Satz passt „geschweige denn“?",
        options: [
          "Er hat den Antrag gelesen, geschweige denn begründet.",
          "Er hat den Antrag nicht gelesen, geschweige denn begründet.",
          "Er hat den Antrag begründet, geschweige denn gelesen.",
        ],
        answer: 1,
        explain: "„geschweige denn“ yalnız olumsuz cümlede kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Der Vergleich ist ___ falsch, als die Fälle nicht vergleichbar sind.",
        options: [],
        answer: 0,
        accept: ["insofern", "insoweit"],
        explain: "„insofern … als“ bir sınırlama kurar.",
      },
      {
        kind: "gapfill",
        text: "Wir sollten warten, zumal noch Daten ___. (fehlen)",
        options: [],
        answer: 0,
        accept: ["fehlen"],
        explain: "„zumal“ yan cümle kurar; çekimli fiil sona gider.",
      },
      {
        kind: "gapfill",
        text: "___ trifft die Kritik zu, allerdings ändert sie nichts.",
        options: [],
        answer: 0,
        accept: ["Zwar", "zwar"],
        explain: "„zwar“ başa gelebilir; ardından özne fiilin arkasına düşer.",
      },
      {
        kind: "gapfill",
        text: "Das wiegt schwer, zumal es sich wiederholt ___. (haben)",
        options: [],
        answer: 0,
        accept: ["hat"],
        explain: "Perfekt yan cümlede çekimli yardımcı fiil en sonda durur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Einwand", "ist", "berechtigt", "zumal", "die Unterlagen nichts dazu sagen"],
        explain: "Ana cümle normal sırada, „zumal“ yan cümlesinde fiil sonda.",
      },
      {
        kind: "truefalse",
        text: "„Der Plan ist zwar überzeugend.“ — Bu cümle tek başına tamam mı?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„zwar“ bir karşıtlık vaat eder; „aber“ ya da „allerdings“ ile devam etmelidir.",
      },
      {
        kind: "truefalse",
        text: "„Insofern hat die Kritik recht.“ — Bu cümle bir sınırlama bildiriyor mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„insofern“ geçerliliği belli bir bakımdan sınırlar.",
      },
    ],
  },
];
