import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 3.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 3. seti taşır (kimlik sonu 3).
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: köşe yazısı, konferans konuşması ve okur mektubu. Üçü de edilgen
 * yerine geçen yapılarla yazılmış; dil bilgisi bu yapıları toplar.
 */
export const deC1P3: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r3",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Was eine Karte weglässt",
    genre: "opinion",
    intro: "Haritaların seçiciliği üzerine bir köşe yazısı okuyacaksın: hangi eksiltme teknik, hangisi içeriğe müdahale.",
    gloss: [
      { de: "der Maßstab", tr: "ölçek", en: "scale" },
      { de: "unvermeidbar", tr: "kaçınılmaz", en: "unavoidable" },
      { de: "vorwerfen", tr: "kusur bulmak", en: "to reproach" },
      { de: "der Trampelpfad", tr: "patika", en: "desire path" },
      { de: "widmen", tr: "kamuya tahsis etmek", en: "to dedicate" },
      { de: "gestrichelt", tr: "kesik çizgili", en: "dashed" },
      { de: "die Rangfolge", tr: "sıralama", en: "ranking" },
      { de: "sich angewöhnen", tr: "alışkanlık edinmek", en: "to get into the habit" },
    ],
    minutes: 10,
    text:
      "WAS EINE KARTE WEGLÄSST\n\n" +
      "Karten gelten als das ehrlichste Medium, das wir haben. Sie behaupten nichts, sie zeigen. Genau darin " +
      "liegt ihre Kraft — und der Grund, warum sich mit ihnen so leicht etwas verschieben lässt.\n\n" +
      "Jede Karte entsteht durch Weglassen. Der Maßstab entscheidet, was überhaupt abgebildet werden kann; " +
      "alles Kleinere fällt heraus. Das ist unvermeidbar und niemandem vorzuwerfen. Fragwürdig wird es dort, " +
      "wo das Weglassen aufhört, technisch zu sein, und anfängt, inhaltlich zu werden.\n\n" +
      "Ein Beispiel, das sich gut nachvollziehen lässt: die Darstellung von Wegen. Auf vielen Stadtplänen sind " +
      "Trampelpfade nicht verzeichnet, auch dann nicht, wenn sie täglich von Hunderten benutzt werden. Der Grund " +
      "ist bürokratisch: Was nicht gewidmet ist, ist kein Weg. Die Folge ist praktisch: Wer sich nach der Karte " +
      "richtet, geht Umwege, und wer die Umwege zählt, hält den Pfad für unnötig. Die Karte erzeugt so die " +
      "Wirklichkeit, die sie zu beschreiben vorgibt.\n\n" +
      "Ähnliches ist bei Grenzen zu beobachten, allerdings mit größerem Einsatz. Umstrittene Linien werden je " +
      "nach Ausgabe durchgezogen, gestrichelt oder gar nicht gezeichnet. Kein Verlag nennt das eine Position; " +
      "man spricht von Konvention. Doch eine gestrichelte Linie ist eine Aussage, und sie ist auch als solche " +
      "zu lesen.\n\n" +
      "Man könnte einwenden, das sei heute anders, weil digitale Karten beliebig vergrößerbar sind und der " +
      "Maßstab damit an Bedeutung verliert. Der Einwand greift zu kurz. Was angezeigt wird, hängt jetzt nicht " +
      "mehr am Papier, sondern an einer Rangfolge: Welche Objekte erscheinen zuerst, welche erst bei starker " +
      "Vergrößerung, welche nie? Diese Rangfolge ist nirgends abgedruckt, und sie ist von außen kaum zu " +
      "prüfen.\n\n" +
      "Was folgt daraus? Kein Misstrauen, sondern eine einfache Gewohnheit. Bei jeder Karte lässt sich fragen: " +
      "Wer hat sie bezahlt, wofür wurde sie gemacht, und was wäre darauf zu sehen, wenn eine andere Frage im " +
      "Vordergrund gestanden hätte? Wer sich das angewöhnt, verliert nichts. Er sieht nur zusätzlich, was nicht " +
      "da ist.",
    questions: [
      {
        text: "Was ist die These des Textes?",
        options: [
          "Jede Karte trifft Auswahlentscheidungen, die kaum sichtbar sind.",
          "Digitale Karten sind zuverlässiger als gedruckte.",
          "Stadtpläne sollten deutlich mehr Wege verzeichnen.",
        ],
        answer: 0,
        explain: "„Jede Karte entsteht durch Weglassen“ ve sonundaki üç soru bu seçimi görünür kılmayı öneriyor.",
      },
      {
        text: "Warum fehlen Trampelpfade auf vielen Stadtplänen?",
        options: [
          "Sie sind rechtlich keine Wege.",
          "Sie verändern sich zu häufig.",
          "Sie sind für den Maßstab zu schmal.",
        ],
        answer: 0,
        explain: "„Der Grund ist bürokratisch: Was nicht gewidmet ist, ist kein Weg.“",
      },
      {
        kind: "truefalse",
        text: "Der Autor hält jedes Weglassen für einen Fehler.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Das ist unvermeidbar und niemandem vorzuwerfen“ — eleştiri yalnız içeriğe dönüşen eksiltmeye.",
      },
      {
        kind: "gapfill",
        text: "Was nicht gewidmet ist, ist kein ___.",
        options: [],
        answer: 0,
        accept: ["Weg"],
        explain: "„Der Grund ist bürokratisch: Was nicht gewidmet ist, ist kein Weg.“",
      },
      {
        kind: "short_answer",
        text: "Was tritt bei digitalen Karten an die Stelle des Maßstabs?",
        options: [],
        answer: 0,
        accept: ["eine Rangfolge", "die Rangfolge", "Rangfolge"],
        explain: "„Was angezeigt wird, hängt jetzt nicht mehr am Papier, sondern an einer Rangfolge.“",
      },
      {
        text: "Was empfiehlt der Text am Ende?",
        options: [
          "drei Fragen zur Herkunft einer Karte",
          "gedruckte Karten grundsätzlich zu bevorzugen",
          "Karten insgesamt zu misstrauen",
        ],
        answer: 0,
        explain: "„Kein Misstrauen, sondern eine einfache Gewohnheit“ — arkasından üç soru geliyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l3",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Wie eine Norm entsteht",
    genre: "meeting",
    intro: "Bir konferans konuşması dinleyeceksin: teknik normları kim yazıyor, dilleri neden böyle, bağlayıcılıkları ne kadar.",
    gloss: [
      { de: "der Ausschuss", tr: "komite", en: "committee" },
      { de: "die Prüfstelle", tr: "denetim kuruluşu", en: "testing body" },
      { de: "prüfbar", tr: "sınanabilir", en: "verifiable" },
      { de: "die Belastbarkeit", tr: "dayanıklılık", en: "load capacity" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
      { de: "die Abweichung", tr: "sapma", en: "deviation" },
    ],
    minutes: 10,
    segments: [
      { text: "Vielen Dank für die Einladung. Ich spreche heute über etwas, das im Alltag unsichtbar ist und trotzdem fast alles berührt: darüber, wie eine technische Norm zustande kommt." },
      { text: "Die verbreitete Vorstellung ist, dass irgendwo eine Behörde sitzt und Regeln erlässt. Das ist fast nie der Fall. Normen werden von Ausschüssen geschrieben, in denen Hersteller, Prüfstellen und manchmal Verbraucherverbände sitzen." },
      { text: "Die Teilnahme ist freiwillig und in der Regel unbezahlt. Daraus folgt eine Auswahl, die sich nicht leicht korrigieren lässt: Wer über Jahre Personal in Sitzungen schicken kann, ist überproportional vertreten." },
      { text: "Ein zweiter Punkt betrifft die Sprache. Normtexte sind absichtlich so formuliert, dass sie prüfbar sind. Was nicht messbar ist, kommt nicht hinein, auch wenn es wichtig wäre." },
      { text: "Ein Beispiel: Bei Kinderspielzeug ist die Belastbarkeit eines Gelenks exakt festgelegt. Ob ein Kind ein Teil verschlucken kann, ist über einen Zylinder definiert. Ob ein Spielzeug frustriert, ist nicht zu normieren, also steht es nicht drin." },
      { text: "Das ist kein Vorwurf. Eine Norm ist ein Werkzeug, kein Weltbild. Problematisch wird es erst, wenn das, was messbar ist, mit dem verwechselt wird, was zählt." },
      { text: "Der dritte Punkt ist der interessanteste. Normen sind rechtlich meist nicht verbindlich. Trotzdem wirken sie fast wie Gesetze, weil Gerichte sie als Stand der Technik heranziehen und Versicherungen sich daran orientieren." },
      { text: "Man kann also von einer Regel abweichen, muss die Abweichung aber begründen können. In der Praxis heißt das: Es lässt sich abweichen, aber es lohnt sich selten." },
      { text: "Was folgt daraus für Ihre Arbeit? Erstens: Lesen Sie den Anwendungsbereich, nicht nur die Anforderungen. Er sagt Ihnen, wofür die Norm gedacht war." },
      { text: "Zweitens: Achten Sie auf das Erscheinungsjahr. Und drittens, wenn Sie etwas ändern wollen: Die Einspruchsphase ist öffentlich. Kaum jemand nutzt sie, und genau deshalb wirkt sie." },
    ],
    questions: [
      {
        text: "Wer schreibt technische Normen?",
        options: [
          "Ausschüsse mit Vertretern aus der Praxis",
          "eine dafür zuständige staatliche Behörde",
          "die Gerichte und die Versicherungen",
        ],
        answer: 0,
        explain: "„Normen werden von Ausschüssen geschrieben, in denen Hersteller, Prüfstellen und manchmal Verbraucherverbände sitzen.“",
      },
      {
        text: "Warum fehlen manche wichtigen Aspekte in Normen?",
        options: ["weil sie nicht messbar sind", "weil sie zu teuer wären", "weil die Hersteller sie ablehnen"],
        answer: 0,
        explain: "„Was nicht messbar ist, kommt nicht hinein, auch wenn es wichtig wäre.“",
      },
      {
        kind: "truefalse",
        text: "Die Mitarbeit in einem Normungsausschuss wird meistens nicht bezahlt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die Teilnahme ist freiwillig und in der Regel unbezahlt.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man in einem Normtext zuerst lesen?",
        options: [],
        answer: 0,
        accept: ["den Anwendungsbereich", "Anwendungsbereich", "den Anwendungsbereich zuerst"],
        explain: "„Lesen Sie den Anwendungsbereich, nicht nur die Anforderungen.“",
      },
      {
        kind: "dictation",
        text: "Konuşmacının normu tanımladığı kısa cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Eine Norm ist ein Werkzeug, kein Weltbild.", "Eine Norm ist ein Werkzeug kein Weltbild"],
        explain: "„Eine Norm ist ein Werkzeug, kein Weltbild.“ — ikinci öbek birinciyi düzeltir, fiil tekrarlanmaz.",
      },
      {
        text: "Warum sind manche Gruppen überrepräsentiert?",
        options: [
          "weil die Mitarbeit Zeit und Geld kostet",
          "weil sie ein doppeltes Stimmrecht haben",
          "weil sie die Sitzungen selbst leiten",
        ],
        answer: 0,
        explain: "„Die Teilnahme ist freiwillig und in der Regel unbezahlt … Wer über Jahre Personal in Sitzungen schicken kann, ist überproportional vertreten.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w3",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Ein Einwand an die Redaktion",
    genre: "opinion",
    intro: "Bir yazıya itiraz eden okur mektubu yazacaksın; önce iki cümle kur, sonra mektubu yaz.",
    gloss: [
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "die Behauptung", tr: "iddia", en: "claim" },
      { de: "belegen", tr: "kanıtlamak", en: "to substantiate" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bu iddianın kanıtlanması güç.",
        answer: "Diese Behauptung lässt sich schwer belegen.",
        alternatives: ["Schwer belegen lässt sich diese Behauptung."],
        hint: "„sich lassen“ edilgenin yerine geçer ve „kann belegt werden“ ile aynı anlama gelir.",
      },
      {
        kind: "build",
        tr: "Sayı ancak dipnotla birlikte okunabilir.",
        answer: "Die Zahl ist nur zusammen mit der Fußnote zu lesen.",
        alternatives: ["Nur zusammen mit der Fußnote ist die Zahl zu lesen."],
        hint: "„sein + zu + mastar“ da edilgen yerine geçer; bağlama göre olanak ya da zorunluluk bildirir.",
      },
      {
        kind: "free",
        prompt:
          "Bir yazıya okur mektubuyla itiraz et: katıldığın noktayı adlandır, itirazını kesin biçimde formüle et, bir örnek ya da rakamla destekle, karşı argümanı öngör ve ne istediğini söyleyerek bitir.",
        stimulus:
          "Aus dem Beitrag „Weniger Regeln, mehr Verantwortung“: „Wo Normen fehlen, entsteht nicht Chaos, " +
          "sondern Sorgfalt. Wer ohne Vorschrift baut, denkt selbst nach und haftet auch selbst. Genau das macht " +
          "das Ergebnis besser als jede Prüfliste.“",
        checklist: [
          "Katıldığın noktayı açıkça yaz",
          "İtirazını tek cümlede formüle et",
          "Bir örnek ya da rakamla destekle",
          "Karşı argümanı kabul et ve somut bir istekle bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "In einem Punkt stimme ich zu: …", tr: "Bir noktada katılıyorum: …" },
          { de: "Der Schluss daraus ist trotzdem falsch.", tr: "Yine de çıkarılan sonuç yanlış." },
          { de: "… lässt sich leicht zeigen.", tr: "… kolayca gösterilebilir." },
          { de: "Man könnte einwenden, dass …", tr: "Şu itiraz edilebilir: …" },
          { de: "Ich räume ein, dass …", tr: "… olduğunu kabul ediyorum" },
        ],
        sample:
          "Sehr geehrte Redaktion,\n\n" +
          "in einem Punkt stimme ich dem Beitrag ausdrücklich zu: Eine Prüfliste ersetzt kein Nachdenken, und " +
          "wer nur abhakt, hört auf zu fragen. Der Schluss daraus ist trotzdem falsch.\n\n" +
          "Der Beitrag behandelt Verantwortung so, als sei sie gleichmäßig verteilt. Das ist sie nicht. Wer ohne " +
          "Vorschrift baut, haftet nur dann selbst, wenn ein Schaden auch nachweisbar ist. Genau hier liegt die " +
          "Schwäche: Fehler, die sich leicht zeigen lassen, werden vermieden; Fehler, die erst nach fünfzehn " +
          "Jahren sichtbar werden, nicht. Eine Norm ist unter anderem dafür da, diese zweite Sorte abzudecken; " +
          "sie ist gewissermaßen das Gedächtnis einer Branche.\n\n" +
          "Ein Beispiel: Bei Balkongeländern wurde die Mindesthöhe nicht erhöht, weil jemand Bürokratie liebt, " +
          "sondern weil zwanzig Jahre Unfallberichte ausgewertet worden waren. Diese Erfahrung ist von einem " +
          "einzelnen Planer nicht zu erwerben.\n\n" +
          "Man könnte einwenden, dass Normen die Kosten treiben, und das trifft in Teilen zu. Ich räume auch ein, " +
          "dass die Zahl der Verweise unübersichtlich geworden ist. Daraus folgt aber, dass Normen aufgeräumt " +
          "werden sollten, nicht, dass sie abgeschafft werden können.\n\n" +
          "Ich würde mir deshalb einen zweiten Beitrag wünschen, der einmal fragt, welche Regeln tatsächlich " +
          "gestrichen werden könnten — mit Namen und Nummern, nicht als Prinzip.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s3",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Was sich regeln lässt",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: bir ayrım kur, iki alanı farklı ele al ve ölçütünü örnekle sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir kurumda neyin kuralla düzenlenebileceğini, neyin düzenlenemeyeceğini ayır. Ayrımını bir örnekle sına ve düzenlenemeyen alan için ne önerdiğini söyle.",
      bulletsTr: [
        "Alışıldık „daha çok mu az mı kural“ sorusunu bir kenara koy",
        "Ayrımını tek ölçüte bağla",
        "Düzenlenemeyen alan için bir yol öner",
        "Ayrımını somut bir örnekle sına",
      ],
      targets: [
        { de: "Regeln lassen sich dort einsetzen, wo …", tr: "Kurallar … olan yerde işe yarar" },
        { de: "Das ist anders zu behandeln.", tr: "Bunun başka türlü ele alınması gerekir." },
        { de: "… ist nicht verordenbar.", tr: "… buyrulamaz." },
        { de: "Mein Kriterium wäre …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Ich fange mit einer Unterscheidung an, die mir wichtiger scheint als die übliche Frage nach mehr oder " +
        "weniger Regeln. Regeln lassen sich sinnvoll dort einsetzen, wo sich das Ergebnis von außen prüfen " +
        "lässt. Ob ein Geländer hoch genug ist, ist messbar; ob ein Gespräch respektvoll geführt wurde, ist es " +
        "nicht. Das heißt nicht, dass der zweite Bereich regellos bleiben müsste. Er ist nur anders zu " +
        "behandeln. Prüfbare Dinge werden durch Vorschriften gesichert, nicht prüfbare durch Verfahren: durch " +
        "Zuständigkeiten, durch Fristen, durch die Frage, wer wen um was bitten kann. Ein Beispiel: Höflichkeit " +
        "ist nicht verordenbar. Regelbar ist aber, dass jede Beschwerde innerhalb von zehn Tagen von einer " +
        "namentlich benannten Person beantwortet werden muss. Der Ton lässt sich damit nicht erzwingen, das " +
        "Verschwinden aber verhindern. Mein Kriterium wäre deshalb nicht, wie wichtig ein Ziel ist, sondern ob " +
        "sich sein Erreichen von außen feststellen lässt. Wo das nicht geht, sollte man nicht das Ziel " +
        "vorschreiben, sondern den Weg dorthin absichern.",
      rubricHint:
        "Edilgen yerine geçen yapılar beklenir (lässt sich, ist zu …, -bar) ve ayrım somut bir örnekle sınanmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g3",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Das lässt sich machen",
    genre: "grammar",
    intro: "Edilgen çatının ağırlığını taşımadan aynı içeriği söylemenin üç yolu ve aralarındaki ince farklar.",
    focus: "Passiversatz: lassen sich, sein + zu, -bar",
    gloss: [
      { de: "lösen", tr: "çözmek", en: "to solve" },
      { de: "einreichen", tr: "teslim etmek", en: "to submit" },
      { de: "vermeiden", tr: "kaçınmak", en: "to avoid" },
      { de: "messen", tr: "ölçmek", en: "to measure" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Üç yol, bir anlam",
        tr: "Türkçede „yapılabilir“ tek bir ekle kurulur. Almancada „kann gemacht werden“ yerine üç hafif biçim vardır: „lässt sich machen“, „ist zu machen“ ve „ist machbar“. Üçü de faili söylemez ve resmî metinlerde werden-edilgeninden daha akıcı durur.",
        examples: [
          { de: "Das Problem lässt sich lösen.", tr: "Sorun çözülebilir.", note: "= kann gelöst werden" },
          { de: "Das Problem ist zu lösen.", tr: "Sorunun çözülmesi gerekir.", note: "bağlama göre zorunluluk" },
          { de: "Das Problem ist lösbar.", tr: "Sorun çözülebilir.", note: "sıfat biçimi" },
        ],
      },
      {
        heading: "sein + zu: olanak mı, zorunluluk mu?",
        tr: "Bu biçim iki anlamı da taşır ve hangisi olduğunu bağlam söyler. Kolaylık bildiren bir zarf varsa („leicht“, „kaum“) olanak anlaşılır; resmî bir tarih ya da koşul varsa zorunluluk.",
        examples: [
          { de: "Der Text ist leicht zu verstehen.", tr: "Metin kolay anlaşılır.", note: "olanak" },
          { de: "Der Antrag ist bis Freitag einzureichen.", tr: "Başvurunun cumaya kadar verilmesi gerekir.", note: "zorunluluk" },
          { de: "Die Rangfolge ist von außen kaum zu prüfen.", tr: "Sıralama dışarıdan neredeyse denetlenemez." },
        ],
      },
      {
        heading: "-bar her fiilden türemez",
        tr: "„-bar“ eki yalnız nesne alan fiillerden yapılır: messbar, lesbar, vermeidbar, machbar. „gehen“ ya da „schlafen“ gibi fiillerden türetilmez. Ayrıca kimi biçimler yerleşmiştir, kimi ise kulağa uydurma gelir; emin değilsen „lässt sich“ her zaman güvenlidir.",
        examples: [
          { de: "Der Fehler ist vermeidbar.", tr: "Hatadan kaçınılabilir." },
          { de: "Das ist nicht messbar.", tr: "Bu ölçülemez." },
          { de: "Das lässt sich nicht sagen.", tr: "Bu söylenemez.", note: "„sagbar“ yerine güvenli biçim" },
        ],
      },
    ],
    questions: [
      {
        text: "Das Problem ___ leicht lösen.",
        options: ["lässt sich", "ist sich", "wird sich"],
        answer: 0,
        explain: "„sich lassen“ + mastar edilgen yerine geçer: lässt sich lösen.",
      },
      {
        text: "Der Antrag ist bis Freitag ___.",
        options: ["einzureichen", "eingereicht", "einreichen"],
        answer: 0,
        explain: "„sein + zu + mastar“ yapısında ayrılabilen fiilde „zu“ ortaya girer: einzureichen.",
      },
      {
        text: "Die Schrift ist bei diesem Licht kaum ___.",
        options: ["lesbar", "lesend", "gelesen"],
        answer: 0,
        explain: "„-bar“ eki olanak bildirir: lesbar = kann gelesen werden.",
      },
      {
        kind: "gapfill",
        text: "„Das kann man reparieren.“ → „Das ___ sich reparieren.“",
        options: [],
        answer: 0,
        accept: ["lässt"],
        explain: "„können + Passiv“ yerine „sich lassen“: Das lässt sich reparieren.",
      },
      {
        kind: "gapfill",
        text: "„Der Fehler kann vermieden werden.“ → „Der Fehler ist ___.“",
        options: [],
        answer: 0,
        accept: ["vermeidbar"],
        explain: "Nesne alan fiilden -bar sıfatı türer: vermeidbar.",
      },
      {
        kind: "gapfill",
        text: "„Die Rechnung muss heute bezahlt werden.“ → „Die Rechnung ist heute zu ___.“",
        options: [],
        answer: 0,
        accept: ["bezahlen"],
        explain: "„sein + zu + mastar“ burada zorunluluk taşır: ist heute zu bezahlen.",
      },
      {
        kind: "gapfill",
        text: "„Das kann man nicht messen.“ → „Das ist nicht ___.“",
        options: [],
        answer: 0,
        accept: ["messbar"],
        explain: "„messen“ nesne alır, bu yüzden -bar türetilebilir: messbar.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der", "Text", "ist", "leicht", "zu", "verstehen"],
        explain: "„sein“ ikinci sırada, „zu + mastar“ en sonda: Der Text ist leicht zu verstehen.",
      },
      {
        kind: "truefalse",
        text: "„Das lässt sich nicht ändern.“ ile „Das kann nicht geändert werden.“ aynı anlama gelir.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„sich lassen“ tam olarak „können + Passiv“ın yerini tutar; ikisi eş anlamlıdır.",
      },
      {
        kind: "truefalse",
        text: "„Der Termin ist zu verschieben.“ her zaman bir olanak bildirir.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Bu yapı bağlama göre zorunluluk da bildirir; resmî bir metinde „ertelenmelidir“ okunur.",
      },
    ],
  },
];
