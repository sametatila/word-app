import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 16.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 16 sağlık kararları hattı: bir hekimin denemesi, ikinci görüş
 * üzerine bir bilgilendirme yayını, bir hastaneye geri bildirim. Dil bilgisi
 * Nachfeld ve Ausklammerung — fiil çerçevesinin arkasına çıkan yan cümle,
 * „zu“lu mastar, karşılaştırma ve edat öbeği; g5'teki Vorfeld'in karşı ucu.
 */
export const deC1P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r16",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Die Last der freien Wahl",
    genre: "essay",
    intro: "Bir hekimin denemesi: hastaya bütün seçenekleri sunmak neden her zaman özen anlamına gelmiyor.",
    gloss: [
      { de: "die Diagnose", tr: "teşhis", en: "diagnosis" },
      { de: "die Nebenwirkung", tr: "yan etki", en: "side effect" },
      { de: "übertragen", tr: "devretmek", en: "to transfer" },
      { de: "die Zurückhaltung", tr: "kendini tutma", en: "restraint" },
      { de: "die Aufklärung", tr: "bilgilendirme", en: "informing the patient" },
      { de: "die Abrechnung", tr: "faturalandırma", en: "billing" },
    ],
    minutes: 10,
    text:
      "Die Last der freien Wahl\n\n" +
      "Als ich vor dreißig Jahren anfing, entschieden Ärzte, und Patienten stimmten zu. Heute " +
      "ist es umgekehrt, zumindest auf dem Papier: Wir legen Optionen vor, die Patientin " +
      "wählt. Ich halte diesen Wandel für richtig. Ich halte ihn aber auch für unvollständig.\n\n" +
      "Denn eine Wahl zwischen vier Behandlungen ist nur dann frei, wenn man die vier versteht. " +
      "Legt man einem Menschen, der gerade eine schwere Diagnose erhalten hat, eine Tabelle " +
      "mit Überlebensraten und Nebenwirkungen vor, überträgt man ihm nicht nur die " +
      "Entscheidung, sondern auch die ganze Unsicherheit, die wir selbst nicht auflösen " +
      "können.\n\n" +
      "Viele Patienten reagieren darauf mit einer Frage, die in keinem Leitfaden vorkommt: " +
      "„Was würden Sie an meiner Stelle tun?“ Lange hielt ich es für meine Pflicht, diese " +
      "Frage nicht zu beantworten, um die Entscheidung nicht zu beeinflussen. Inzwischen " +
      "glaube ich, dass diese Zurückhaltung weniger dem Patienten diente als meinem Gewissen.\n\n" +
      "Habe ich eine Empfehlung, sage ich sie heute, und zwar ausdrücklich als meine. Ich " +
      "sage auch, auf welchen Annahmen sie beruht und unter welchen Umständen ich anders " +
      "entscheiden würde. Es sei denn, jemand möchte das ausdrücklich nicht hören; auch das " +
      "kommt vor, und es ist zu respektieren.\n\n" +
      "Der Unterschied zur alten Praxis liegt nicht darin, wer spricht, sondern darin, wer das " +
      "letzte Wort hat. Eine Empfehlung, die man ablehnen kann, ohne sich rechtfertigen zu " +
      "müssen, nimmt niemandem die Freiheit. Sie nimmt ihm nur die Einsamkeit.\n\n" +
      "Was dafür nötig ist, steht in keiner Abrechnung: Zeit. Eine Aufklärung, die diesen " +
      "Namen verdient, dauert nicht zehn Minuten, sondern oft zwei Gespräche mit einer Nacht " +
      "dazwischen. Vorausgesetzt, man bekommt diese Zeit, ist die freie Wahl ein Gewinn. Ohne " +
      "sie ist sie oft nur eine Last, die man weiterreicht.",
    questions: [
      {
        text: "Wie beurteilt der Autor den Wandel hin zur Wahl durch die Patienten?",
        options: [
          "als Fehler, der zu korrigieren wäre",
          "als richtig, aber unvollständig",
          "als bloße Theorie ohne Folgen",
        ],
        answer: 1,
        explain: "„Ich halte diesen Wandel für richtig. Ich halte ihn aber auch für unvollständig.“",
      },
      {
        text: "Warum beantwortete der Autor früher die Frage „Was würden Sie tun?“ nicht?",
        options: [
          "Er hatte keine eigene Meinung.",
          "Die Klinik hatte es verboten.",
          "Er wollte die Wahl nicht beeinflussen.",
        ],
        answer: 2,
        explain: "Kararı etkilememeyi görev sayıyordu; bugün bunun daha çok vicdanına hizmet ettiğini düşünüyor.",
      },
      {
        kind: "truefalse",
        text: "Der Autor gibt heute jedem eine Empfehlung, auch wenn jemand sie nicht hören will.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Es sei denn, jemand möchte das ausdrücklich nicht hören“ — bu isteğe saygı gösteriyor.",
      },
      {
        kind: "gapfill",
        text: "Eine gute Aufklärung dauert oft zwei Gespräche mit einer ___ dazwischen.",
        options: [],
        answer: 0,
        accept: ["Nacht"],
        explain: "„oft zwei Gespräche mit einer Nacht dazwischen“.",
      },
      {
        kind: "short_answer",
        text: "Was nimmt eine ablehnbare Empfehlung dem Patienten laut Autor?",
        options: [],
        answer: 0,
        accept: ["die Einsamkeit", "Einsamkeit", "nur die Einsamkeit"],
        explain: "Özgürlüğü almıyor, yalnız yalnızlığı alıyor.",
      },
      {
        text: "Was macht die freie Wahl laut Autor zu einem Gewinn?",
        options: [
          "genug Zeit für Gespräche",
          "übersichtlichere Tabellen",
          "weniger Behandlungswege",
        ],
        answer: 0,
        explain: "Bu zaman tanınırsa seçim bir kazanç; tanınmazsa devredilen bir yük.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l16",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Beratungstelefon: Die zweite Meinung",
    genre: "info",
    intro: "Bir bilgilendirme yayını: ikinci hekim görüşü kimin hakkı, nasıl alınır ve nelere dikkat etmek gerekir.",
    gloss: [
      { de: "der Eingriff", tr: "müdahale", en: "procedure" },
      { de: "der Anspruch", tr: "hak", en: "entitlement" },
      { de: "die Krankenkasse", tr: "sağlık sigortası", en: "health insurer" },
      { de: "die Überweisung", tr: "sevk", en: "referral" },
      { de: "der Befund", tr: "tetkik sonucu", en: "finding" },
      { de: "unabhängig", tr: "bağımsız", en: "independent" },
    ],
    minutes: 10,
    segments: [
      { text: "Wer vor einer geplanten Operation steht, hat bei bestimmten Eingriffen einen gesetzlichen Anspruch auf eine zweite ärztliche Meinung. Viele erfahren davon erst, wenn der Termin schon feststeht." },
      { speaker: "Frau Dr. Hensel", text: "Das Recht gilt vor allem für Eingriffe, von denen man weiß, dass sie häufiger gemacht werden, als es medizinisch nötig wäre, etwa an Knie, Schulter oder Wirbelsäule." },
      { text: "Die behandelnde Praxis muss auf dieses Recht hinweisen, und zwar mindestens zehn Tage vor dem Eingriff, sofern es sich nicht um einen Notfall handelt." },
      { speaker: "Frau Dr. Hensel", text: "Die Kosten übernimmt die Krankenkasse. Man braucht keine Überweisung, sollte aber alle Befunde mitbringen, sonst werden Untersuchungen doppelt gemacht." },
      { text: "Wichtig ist die Wahl der zweiten Praxis. Sie darf nicht zur selben Einrichtung gehören wie die erste und soll den Eingriff später auch nicht selbst durchführen." },
      { speaker: "Frau Dr. Hensel", text: "Das klingt streng, hat aber einen einfachen Grund. Wer an der Operation verdient, ist kein unabhängiger Gutachter, so ehrlich er auch sein mag." },
      { text: "Häufig gestellt wird bei uns am Telefon die Frage, was geschieht, wenn die zweite Meinung der ersten widerspricht." },
      { speaker: "Frau Dr. Hensel", text: "Dann entscheiden Sie. Viele wünschen sich an dieser Stelle eine dritte Meinung. Die ist möglich, wird aber nicht mehr automatisch bezahlt." },
      { speaker: "Frau Dr. Hensel", text: "Mein Rat: Fragen Sie beide nicht nur, was sie empfehlen, sondern auch, was passiert, wenn man zunächst gar nichts tut. Diese Frage wird erstaunlich selten gestellt." },
      { speaker: "Frau Dr. Hensel", text: "Und lassen Sie sich nicht drängen, auch nicht von der eigenen Ungeduld. Ein geplanter Eingriff, der zwei Wochen später stattfindet, ist in aller Regel nicht schlechter." },
      { text: "Informationen und eine Liste zugelassener Praxen gibt es bei der Krankenkasse sowie bei der unabhängigen Patientenberatung, auch telefonisch." },
    ],
    questions: [
      {
        text: "Wann muss die Praxis auf das Recht hinweisen?",
        options: [
          "erst nach dem Eingriff",
          "am Tag des Eingriffs",
          "mindestens zehn Tage vorher",
        ],
        answer: 2,
        explain: "Acil durum değilse müdahaleden en az on gün önce bu hak bildirilmeli.",
      },
      {
        text: "Welche Bedingung gilt für die zweite Praxis?",
        options: [
          "Sie darf später nicht selbst operieren.",
          "Sie muss in derselben Klinik liegen.",
          "Sie muss vom Hausarzt kommen.",
        ],
        answer: 0,
        explain: "Ameliyattan kazanç sağlayan biri bağımsız bir değerlendirici sayılmaz.",
      },
      {
        kind: "truefalse",
        text: "Für die zweite Meinung braucht man keine Überweisung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Man braucht keine Überweisung“ — ama bütün bulgular yanında getirilmeli.",
      },
      {
        kind: "gapfill",
        text: "Eine ___ Meinung ist möglich, wird aber nicht automatisch bezahlt.",
        options: [],
        answer: 0,
        accept: ["dritte"],
        explain: "Üçüncü görüş mümkün ama sigorta onu artık kendiliğinden ödemiyor.",
      },
      {
        kind: "short_answer",
        text: "Was soll man zur zweiten Praxis mitbringen?",
        options: [],
        answer: 0,
        accept: ["alle Befunde", "die Befunde", "Befunde"],
        explain: "Bulgular getirilmezse tetkikler iki kez yapılıyor.",
      },
      {
        text: "Welche Frage wird laut Dr. Hensel zu selten gestellt?",
        options: [
          "was die Operation kostet",
          "was passiert, wenn man nichts tut",
          "wie lange die Heilung dauert",
        ],
        answer: 1,
        explain: "Başlangıçta hiçbir şey yapılmazsa ne olacağı sorusu şaşırtıcı derecede az soruluyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w16",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Rückmeldung an eine Klinik",
    genre: "email",
    intro: "Bir hastaneye geri bildirim yazıyorsun: önce iki cümle kur, sonra hem teşekkür eden hem de somut bir eleştiri getiren dengeli bir mektup yaz.",
    gloss: [
      { de: "die Station", tr: "servis", en: "ward" },
      { de: "die Entlassung", tr: "taburcu", en: "discharge" },
      { de: "überfordert", tr: "bunalmış", en: "overwhelmed" },
      { de: "das Merkblatt", tr: "bilgi broşürü", en: "information leaflet" },
      { de: "die Nachsorge", tr: "tedavi sonrası bakım", en: "aftercare" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Bilgilendirme görüşmesi planlanandan uzun sürdü.",
        answer: "Das Aufklärungsgespräch hat länger gedauert als geplant.",
        alternatives: ["Das Aufklärungsgespräch hat länger als geplant gedauert."],
        hint: "„als“ ile kurulan karşılaştırma çoğunlukla fiil çerçevesinin arkasına, Nachfeld'e çıkar; içeride de durabilir.",
      },
      {
        kind: "build",
        tr: "Doktor bana imzalamadan önce bir gece düşünmemi tavsiye etti.",
        answer: "Die Ärztin hat mir geraten, vor der Unterschrift eine Nacht darüber zu schlafen.",
        alternatives: ["Geraten hat mir die Ärztin, vor der Unterschrift eine Nacht darüber zu schlafen."],
        hint: "„zu“lu mastar öbeği çerçevenin (hat … geraten) arkasına gider; çerçeve böylece kısa kalır.",
      },
      {
        kind: "free",
        prompt:
          "Ameliyat olduğun hastaneye geri bildirim yaz: neyi ve ne zaman yaşadığını kısaca belirt, özellikle iyi bulduğun bir şeyi somut olarak anlat, seni zorlayan bir noktayı kimseyi suçlamadan eleştir, bunun için uygulanabilir bir öneri getir ve yanıt beklentini söyleyerek kapat.",
        checklist: [
          "Neyi ve ne zaman yaşadığını belirt",
          "İyi bulduğun bir şeyi somut anlat",
          "Zorlayan noktayı suçlamadan eleştir ve bir öneri getir",
          "Yanıt beklentini söyleyerek kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "Ich wende mich an Sie im Anschluss an …", tr: "… sonrasında size yazıyorum", en: "I am writing to you following …" },
          { de: "Besonders hervorheben möchte ich …", tr: "Özellikle … vurgulamak istiyorum", en: "I would particularly like to highlight …" },
          { de: "Weniger gelungen fand ich dagegen …", tr: "Buna karşılık … daha az başarılı buldum", en: "By contrast, I found … less successful" },
          { de: "Mein Vorschlag wäre, …, sofern das organisatorisch möglich ist.", tr: "Düzen açısından mümkünse önerim … olurdu.", en: "My suggestion would be …, provided it is organisationally possible." },
          { de: "Über eine kurze Antwort würde ich mich freuen.", tr: "Kısa bir yanıt beni sevindirir.", en: "I would be glad of a short reply." },
        ],
        sample:
          "Sehr geehrte Damen und Herren, ich wende mich an Sie im Anschluss an meinen " +
          "Aufenthalt auf Ihrer orthopädischen Station im Oktober, wo ich an der Schulter operiert " +
          "wurde. " +
          "Besonders hervorheben möchte ich das Aufklärungsgespräch mit Frau Dr. Winter. Sie hat " +
          "mir nicht nur die Möglichkeiten erklärt, sondern mich ausdrücklich gebeten, eine Nacht " +
          "darüber zu schlafen, bevor ich unterschreibe. Hätte man mir diese Zeit nicht gelassen, " +
          "wäre ich mit der Entscheidung überfordert gewesen. " +
          "Das Gespräch hat länger gedauert als geplant, und genau das war richtig. " +
          "Weniger gelungen fand ich dagegen den Tag der Entlassung. Ich bekam innerhalb von zehn " +
          "Minuten vier Merkblätter, zwei Rezepte und mündliche Hinweise zur Physiotherapie, und " +
          "ein großer Teil davon war zu Hause schlicht vergessen. Das lag nicht an mangelnder " +
          "Freundlichkeit, sondern offensichtlich an Zeitdruck. " +
          "Mein Vorschlag wäre, die wichtigsten Hinweise auf einer einzigen Seite " +
          "zusammenzufassen und schon am Vortag zu besprechen, sofern das organisatorisch " +
          "möglich ist. " +
          "Sollte ich noch Fragen zur Nachsorge haben, melde ich mich erneut bei Ihnen. Über eine " +
          "kurze Antwort, ob mein Hinweis angekommen ist, würde ich mich freuen. " +
          "Mit freundlichen Grüßen, Paul Lindemann",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s16",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Wie viel Entscheidung darf man Patienten überlassen?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: özerklik ile yük arasındaki sınırı çiz ve kendi tercihini söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Hekimler hastalara ne kadar karar bırakmalı? Bir sınır öner, özerkliğin yüke dönüştüğü bir durumu örnekle, kendin hasta olsaydın ne isteyeceğini söyle ve hekimden beklediğin şeyi tek cümleyle özetle.",
      bulletsTr: [
        "Kararın nerede hastaya ait olduğunu söyle",
        "Özerkliğin yük olduğu bir durumu örnekle",
        "Kendin hasta olsan ne isteyeceğini söyle",
        "Hekimden beklentini tek cümleyle özetle",
      ],
      targets: [
        { de: "Selbst entscheiden sollte man, solange …", tr: "… olduğu sürece insan kendisi karar vermeli" },
        { de: "Zur Last wird die Freiheit, wenn …", tr: "Özgürlük … olduğunda yüke dönüşür" },
        { de: "Wäre ich selbst betroffen, würde ich …", tr: "Ben de o durumda olsaydım … isterdim" },
        { de: "Kurz gesagt erwarte ich von einer Ärztin, dass …", tr: "Kısacası bir hekimden … beklerim" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Selbst entscheiden sollte man, solange es um Werte geht und nicht um Fachwissen. Ob ich " +
        "lieber länger lebe oder besser, kann mir niemand abnehmen; welche von zwei " +
        "Operationsmethoden technisch sicherer ist, kann ich dagegen gar nicht beurteilen. " +
        "Zur Last wird die Freiheit, wenn man beides vermischt. Ein Bekannter bekam nach seiner " +
        "Diagnose drei Behandlungswege mit Statistiken vorgelegt und sollte sich innerhalb einer " +
        "Woche entscheiden. Er hat nicht gewählt, er hat gewürfelt, und er hat es mir später " +
        "genau so gesagt. " +
        "Wäre ich selbst betroffen, würde ich mir eine klare Empfehlung wünschen, verbunden mit " +
        "der Frage, was mir im Leben wichtig ist, damit die Empfehlung überhaupt zu mir passen " +
        "kann. Ablehnen möchte ich sie trotzdem dürfen, ohne mich rechtfertigen zu müssen. " +
        "Kurz gesagt erwarte ich von einer Ärztin nicht, dass sie mir die Entscheidung abnimmt, " +
        "sondern dass sie mir sagt, was sie an meiner Stelle täte und warum.",
      rubricHint:
        "Değerler ile uzmanlık bilgisi arasında bir ayrım, somut bir örnek ve kişisel bir tercih beklenir; „solange“, Konjunktiv II ve „nicht, dass …, sondern dass …“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g16",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "länger gedauert als geplant",
    genre: "grammar",
    intro: "Almanca cümle iki fiil parçası arasında bir çerçeve kurar; bazı ögeler bu çerçevenin arkasına, Nachfeld'e çıkar ve uzun cümleyi okunur kılar.",
    focus: "Nachfeld ve Ausklammerung: fiil çerçevesinin arkasında ne durabilir (g5'teki Vorfeld'in karşı ucu)",
    gloss: [
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "raten", tr: "tavsiye etmek", en: "to advise" },
      { de: "die Nachsorge", tr: "tedavi sonrası bakım", en: "aftercare" },
      { de: "die Alternative", tr: "alternatif", en: "alternative" },
      { de: "das Merkblatt", tr: "bilgi broşürü", en: "information leaflet" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Çerçeve ve arkası",
        tr: "Çekimli fiil ile fiilin ikinci parçası (Partizip, mastar, ayrılan ek) bir çerçeve (Satzklammer) kurar: „Die Ärztin hat mir … geraten.“ Çerçevenin arkasındaki alan Nachfeld'dir. Yan cümleler ve „zu“lu mastar öbekleri neredeyse her zaman oraya gider; çerçevenin içinde kalsalardı okur fiili beklerken bütün cümleyi aklında tutmak zorunda kalırdı.",
        examples: [
          { de: "Die Ärztin hat mir geraten, eine Nacht darüber zu schlafen.", tr: "Doktor bana bir gece düşünmemi tavsiye etti.", note: "zu-mastar Nachfeld'de" },
          { de: "Ich habe gefragt, ob es eine Alternative gibt.", tr: "Başka bir seçenek olup olmadığını sordum.", note: "yan cümle Nachfeld'de" },
          { de: "Die Klinik hat angefangen, die Merkblätter zu überarbeiten.", tr: "Klinik bilgi broşürlerini yeniden yazmaya başladı.", note: "çerçeve kısa kalır" },
        ],
      },
      {
        heading: "Karşılaştırma öbeği de dışarı çıkar",
        tr: "„als“ ve „wie“ ile kurulan karşılaştırmalar çoğunlukla Nachfeld'e gider: „Das Gespräch hat länger gedauert als geplant.“ Çerçevenin içinde de durabilirler („länger als geplant gedauert“); özellikle karşılaştırma uzunsa arkaya almak yazıda daha doğal ve daha anlaşılırdır.",
        examples: [
          { de: "Das Gespräch hat länger gedauert als geplant.", tr: "Görüşme planlanandan uzun sürdü.", note: "als-öbeği arkada" },
          { de: "Die Heilung ist schneller verlaufen als bei den meisten Patienten.", tr: "İyileşme çoğu hastadakinden hızlı geçti.", note: "uzun karşılaştırma" },
          { de: "Ich habe genauso lange gewartet wie beim ersten Termin.", tr: "İlk randevudaki kadar uzun bekledim.", note: "wie-öbeği" },
        ],
      },
      {
        heading: "Edat öbeğini dışarı almak: Ausklammerung",
        tr: "Uzun bir edat öbeği de vurgu ya da rahatlık için çerçevenin arkasına alınabilir; buna Ausklammerung denir: „Wir haben lange gesprochen über die Risiken.“ Konuşmada çok sıktır, resmî yazıda ölçülü kullanılır. Nesne (Akkusativ) ve kısa zarflar ise çerçevenin içinde kalır: „Ich habe gelesen das Merkblatt“ yanlıştır.",
        examples: [
          { de: "Wir haben lange gesprochen über die Risiken der Operation.", tr: "Ameliyatın riskleri üzerine uzun uzun konuştuk.", note: "edat öbeği arkada" },
          { de: "Ich habe das Merkblatt gestern gelesen.", tr: "Bilgi broşürünü dün okudum.", note: "nesne içeride kalır" },
          { de: "Ich hätte mir mehr Zeit gewünscht für die Fragen zur Nachsorge.", tr: "Bakımla ilgili sorular için daha fazla zaman isterdim.", note: "vurgu için dışarıda" },
        ],
      },
    ],
    questions: [
      {
        text: "Welcher Satz ist falsch?",
        options: [
          "Ich habe gelesen das Merkblatt.",
          "Ich habe das Merkblatt gelesen.",
          "Ich habe gelesen, was im Merkblatt steht.",
        ],
        answer: 0,
        explain: "Akkusativ nesne çerçevenin içinde kalır; yalnız yan cümle Nachfeld'e çıkar.",
      },
      {
        text: "Wo steht „eine Nacht darüber zu schlafen“ in „Die Ärztin hat mir geraten, eine Nacht darüber zu schlafen“?",
        options: ["im Vorfeld", "im Nachfeld", "im Mittelfeld"],
        answer: 1,
        explain: "„zu“lu mastar öbeği çerçevenin (hat … geraten) arkasında, Nachfeld'de durur.",
      },
      {
        text: "Was steht normalerweise NICHT im Nachfeld?",
        options: ["ein Nebensatz", "ein Vergleich mit „als“", "das Akkusativobjekt"],
        answer: 2,
        explain: "Nesne çerçevenin içinde kalır; yan cümle ve karşılaştırma arkaya çıkabilir.",
      },
      {
        kind: "gapfill",
        text: "Das Gespräch hat länger ___ als geplant. (dauern, Partizip II)",
        options: [],
        answer: 0,
        accept: ["gedauert"],
        explain: "Partizip çerçeveyi kapatır; karşılaştırma onun arkasına geçer.",
      },
      {
        kind: "gapfill",
        text: "Die Ärztin hat mir ___, eine Nacht darüber zu schlafen. (raten, Partizip II)",
        options: [],
        answer: 0,
        accept: ["geraten"],
        explain: "Çerçeve „hat … geraten“ ile kapanır; „zu“lu mastar Nachfeld'e gider.",
      },
      {
        kind: "gapfill",
        text: "Ich habe ___, ob es eine Alternative gibt. (fragen, Partizip II)",
        options: [],
        answer: 0,
        accept: ["gefragt"],
        explain: "„ob“ yan cümlesi çerçevenin arkasında durur; Partizip ondan önce gelir.",
      },
      {
        kind: "gapfill",
        text: "Ich habe genauso lange gewartet ___ beim ersten Termin.",
        options: [],
        answer: 0,
        accept: ["wie"],
        explain: "Eşitlik karşılaştırması „genauso … wie“ ile kurulur ve Nachfeld'e çıkabilir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "haben", "lange", "gesprochen über die Risiken"],
        explain: "Edat öbeği vurgu için çerçevenin arkasına alınmış: Ausklammerung.",
      },
      {
        kind: "truefalse",
        text: "„zu“-Infinitive stehen im geschriebenen Deutsch meist hinter der Satzklammer.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Çerçeve kısa kalsın diye mastar öbeği çoğunlukla Nachfeld'e gider.",
      },
      {
        kind: "truefalse",
        text: "Ein Vergleich mit „als“ darf nie hinter dem Partizip stehen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersi: „länger gedauert als geplant“ çok yaygın ve doğrudur.",
      },
    ],
  },
];
