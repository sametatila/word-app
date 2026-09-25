import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 gönüllülük hattı: derneklerin üye sorunu üzerine bir mektup,
 * bir radyo haberi, bir deneme yazısı. Dil bilgisi adlaştırma ile fiilleştirme
 * arasındaki geçiş — resmî Almancanın en görünür özelliği.
 */
export const deB2P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r8",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Offener Brief: Wer macht es nächstes Jahr?",
    genre: "letter",
    intro: "Bir derneğin yönetimi üyelere açık mektup yazıyor: sorun ne, neden acil, ne istiyorlar.",
    gloss: [
      { de: "der Vorstand", tr: "yönetim kurulu", en: "board" },
      { de: "die Satzung", tr: "tüzük", en: "statutes" },
      { de: "die Mitgliederversammlung", tr: "genel kurul", en: "members' meeting" },
      { de: "die Auflösung", tr: "fesih", en: "dissolution" },
      { de: "die Zuständigkeit", tr: "sorumluluk alanı", en: "area of responsibility" },
      { de: "entlasten", tr: "yükünü hafifletmek", en: "to relieve" },
    ],
    minutes: 8,
    text:
      "Liebe Mitglieder,\n\n" +
      "wir schreiben Ihnen heute nicht mit einer Einladung, sondern mit einer Bitte, " +
      "die wir seit zwei Jahren aufschieben.\n\n" +
      "Der Vorstand besteht seit 2019 aus denselben vier Personen. Zwei von uns haben " +
      "angekündigt, bei der nächsten Mitgliederversammlung nicht wieder zu kandidieren. " +
      "Findet sich niemand, ist der Vorstand nicht mehr beschlussfähig, und die Satzung " +
      "sieht in diesem Fall die Auflösung des Vereins vor.\n\n" +
      "Wir haben lange geglaubt, dass es an mangelndem Interesse liegt. " +
      "Nach vielen Gesprächen sind wir uns da nicht mehr sicher. " +
      "Die häufigste Antwort auf unsere Frage lautete nicht „Das interessiert mich nicht“, " +
      "sondern „Ich weiß nicht, worauf ich mich damit einlasse“.\n\n" +
      "Deshalb machen wir es dieses Mal anders. Wir haben die Arbeit des Vorstands in " +
      "sieben klar beschriebene Zuständigkeiten zerlegt, jede mit einer geschätzten " +
      "Stundenzahl pro Monat. Die Kassenführung sind vier Stunden, die Pflege der " +
      "Internetseite zwei, die Organisation des Sommerfests zwölf — allerdings nur im Juni.\n\n" +
      "Niemand muss alles übernehmen. Wer eine einzige dieser Aufgaben übernimmt, " +
      "entlastet den Vorstand spürbar. Die vollständige Liste liegt diesem Brief bei.\n\n" +
      "Bitte melden Sie sich bis zum 15. Oktober, auch mit Fragen. " +
      "Ein Verein, den niemand trägt, hört nicht mit einem Beschluss auf, sondern still.",
    questions: [
      {
        text: "Was droht dem Verein?",
        options: [
          "eine Erhöhung der Beiträge",
          "die Auflösung",
          "der Verlust der Räume",
        ],
        answer: 1,
        explain: "Yönetim karar alamaz hâle gelirse tüzük feshi öngörüyor.",
      },
      {
        text: "Was war die häufigste Antwort der Mitglieder?",
        options: [
          "dass sie kein Interesse haben",
          "dass sie keine Zeit haben",
          "dass sie nicht wissen, worauf sie sich einlassen",
        ],
        answer: 2,
        explain: "Metin ilgisizlik açıklamasını açıkça eliyor.",
      },
      {
        kind: "truefalse",
        text: "Wer sich meldet, muss die gesamte Vorstandsarbeit übernehmen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Niemand muss alles übernehmen“ — iş yedi ayrı sorumluluğa bölünmüş.",
      },
      {
        kind: "gapfill",
        text: "Die Arbeit wurde in ___ Zuständigkeiten zerlegt.",
        options: [],
        answer: 0,
        accept: ["sieben", "7"],
        explain: "„in sieben klar beschriebene Zuständigkeiten zerlegt“.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Stunden braucht die Kassenführung im Monat?",
        options: [],
        answer: 0,
        accept: ["vier", "4", "vier Stunden"],
        explain: "„Die Kassenführung sind vier Stunden.“",
      },
      {
        text: "Was will der letzte Satz sagen?",
        options: [
          "Das Ende kommt ohne formelle Entscheidung.",
          "Die Auflösung ist schon beschlossen.",
          "Der Verein soll leise weiterarbeiten.",
        ],
        answer: 0,
        explain: "Kimsenin taşımadığı bir dernek bir kararla değil, sessizce biter.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l8",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Nachrichtenbeitrag: Das Ehrenamt altert",
    genre: "report",
    intro: "Radyo haberi: gönüllü sayısı neden düşüyor, hangi model işe yarıyor.",
    gloss: [
      { de: "der Rückgang", tr: "düşüş", en: "decline" },
      { de: "die Zusage", tr: "olumlu yanıt", en: "acceptance" },
      { de: "befristet", tr: "süreli", en: "time-limited" },
      { de: "die Bereitschaft", tr: "isteklilik", en: "willingness" },
      { de: "der Einsatz", tr: "katkı", en: "contribution" },
      { de: "nachweisen", tr: "belgelemek", en: "to certify" },
    ],
    minutes: 8,
    segments: [
      { text: "Die Zahl der ehrenamtlich Engagierten ist in den letzten zehn Jahren um elf Prozent zurückgegangen." },
      { text: "Auffällig ist dabei weniger der Rückgang selbst als seine Verteilung: Bei den über Sechzigjährigen ist das Engagement sogar gestiegen." },
      { text: "Zurückgegangen ist es vor allem bei den Dreißig- bis Fünfundvierzigjährigen, also in der Lebensphase mit Kindern und Karriere." },
      { text: "Die Forscherin Dr. Halm sieht den Grund nicht in einer fehlenden Bereitschaft, sondern in der Form der Anfrage." },
      { speaker: "Dr. Halm", text: "Wer gefragt wird, ob er den Vorsitz für drei Jahre übernimmt, sagt Nein. Wer gefragt wird, ob er im Mai zwei Nachmittage organisiert, sagt oft Ja." },
      { text: "Vereine, die ihre Arbeit in befristete Aufgaben zerlegt haben, verzeichnen dem Bericht zufolge deutlich mehr Zusagen." },
      { text: "Ein zweiter Punkt ist die Anerkennung. Viele jüngere Engagierte wünschen sich, dass ihr Einsatz nachgewiesen wird, etwa für Bewerbungen." },
      { text: "Kritisch bleibt die Lage bei den Aufgaben, die sich schlecht befristen lassen: Kassenführung, Ausbildung von Nachwuchs, rechtliche Verantwortung." },
    ],
    questions: [
      {
        text: "Was ist an dem Rückgang besonders auffällig?",
        options: [
          "Er betrifft alle Altersgruppen gleich.",
          "Bei den über Sechzigjährigen ist das Engagement gestiegen.",
          "Er begann erst vor zwei Jahren.",
        ],
        answer: 1,
        explain: "Dikkat çeken şey düşüşün kendisi değil dağılımı.",
      },
      {
        text: "Worin sieht Dr. Halm den Hauptgrund?",
        options: [
          "in fehlender Bereitschaft",
          "in der Form der Anfrage",
          "in zu hohen Mitgliedsbeiträgen",
        ],
        answer: 1,
        explain: "„nicht in einer fehlenden Bereitschaft, sondern in der Form der Anfrage“.",
      },
      {
        kind: "truefalse",
        text: "Befristete Aufgaben führen zu weniger Zusagen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tersine: işi süreli görevlere bölen dernekler belirgin biçimde daha çok evet alıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Zahl ist um ___ Prozent zurückgegangen.",
        options: [],
        answer: 0,
        accept: ["elf", "11"],
        explain: "„um elf Prozent zurückgegangen“.",
      },
      {
        kind: "short_answer",
        text: "Was wünschen sich jüngere Engagierte zusätzlich?",
        options: [],
        answer: 0,
        accept: ["Anerkennung", "einen Nachweis", "dass ihr Einsatz nachgewiesen wird"],
        explain: "Başvurularda kullanmak üzere katkılarının belgelenmesini istiyorlar.",
      },
      {
        text: "Welche Aufgaben bleiben schwierig?",
        options: [
          "die, die sich schlecht befristen lassen",
          "die, die viel Geld kosten",
          "die, die im Sommer stattfinden",
        ],
        answer: 0,
        explain: "Kasa tutma, yeni üyelerin yetiştirilmesi ve hukuki sorumluluk sayılıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w8",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Warum sich niemand meldet",
    genre: "essay",
    intro: "Kısa bir deneme yazıyorsun: önce iki cümle kur, sonra bir yaygın açıklamayı sına ve kendi açıklamanı kur.",
    gloss: [
      { de: "die Annahme", tr: "varsayım", en: "assumption" },
      { de: "widerlegen", tr: "çürütmek", en: "to refute" },
      { de: "die Verantwortung", tr: "sorumluluk", en: "responsibility" },
      { de: "die Hürde", tr: "engel", en: "hurdle" },
      { de: "der Zugang", tr: "erişim", en: "access" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Üyelerin ilgisizliği yaygın bir varsayımdır.",
        answer: "Das fehlende Interesse der Mitglieder ist eine verbreitete Annahme.",
        alternatives: ["Eine verbreitete Annahme ist das fehlende Interesse der Mitglieder."],
        hint: "Adlaştırma: „Die Mitglieder interessieren sich nicht“ cümlesi isim öbeğine dönüşüyor.",
      },
      {
        kind: "build",
        tr: "Sorumluluk devralındıktan sonra bırakmak zorlaşır.",
        answer: "Nach der Übernahme der Verantwortung wird der Ausstieg schwieriger.",
        alternatives: ["Wenn man die Verantwortung übernommen hat, wird der Ausstieg schwieriger."],
        hint: "„nach + Dativ“ ile adlaştırma, yan cümlenin yerini tutar.",
      },
      {
        kind: "free",
        prompt:
          "Kısa bir deneme yaz: yaygın açıklamayı tanıt, onu sorgula, kendi açıklamanı kur ve bir gözleme dayandır, karşı okumaya yer ver ve sonucu bir cümleyle bağla.",
        checklist: [
          "Yaygın açıklamayı tanıt ve neden inandırıcı göründüğünü söyle",
          "Onu sorgula ve neye dayanarak sorguladığını yaz",
          "Kendi açıklamanı kur ve bir gözlemle destekle",
          "Karşı okumaya yer ver ve sonucu bağla",
        ],
        minWords: 130,
        phrases: [
          { de: "Die gängige Erklärung lautet, dass …", tr: "Yaygın açıklama şu: …", en: "The common explanation is that …" },
          { de: "Diese Annahme ist bequem, weil …", tr: "Bu varsayım rahat, çünkü …", en: "This assumption is convenient because …" },
          { de: "Dagegen spricht allerdings, dass …", tr: "Buna karşı olan şey ise …", en: "However, what speaks against it is that …" },
          { de: "Plausibler erscheint mir, dass …", tr: "Bana daha inandırıcı gelen şey …", en: "It seems more plausible to me that …" },
          { de: "Zugegeben: …", tr: "Kabul etmek gerek: …", en: "Admittedly: …" },
        ],
        sample:
          "Die gängige Erklärung lautet, dass sich niemand mehr ehrenamtlich engagieren will. " +
          "Das fehlende Interesse der Mitglieder ist eine verbreitete Annahme, und sie ist bequem, " +
          "weil sie die Schuld außerhalb des Vereins sucht. " +
          "Dagegen spricht allerdings, dass dieselben Menschen beim Sommerfest drei Tage lang " +
          "Tische tragen, Kuchen backen und aufräumen, ohne dass jemand lange bitten muss. " +
          "Wer wirklich kein Interesse hat, tut auch das nicht. " +
          "Plausibler erscheint mir, dass nicht die Arbeit abschreckt, sondern ihre Unbestimmtheit. " +
          "Ein Amt hat keinen Rand: Es beginnt mit einer Unterschrift und endet irgendwann, " +
          "und nach der Übernahme der Verantwortung wird der Ausstieg schwieriger, weil dann " +
          "wieder niemand da ist. Eine befristete Aufgabe dagegen hat ein Ende, das im Voraus feststeht. " +
          "Zugegeben: Manche Aufgaben lassen sich nicht befristen, die Kassenführung zum Beispiel " +
          "braucht Kontinuität. Für alles andere aber gilt, dass die Hürde nicht in der Menge der " +
          "Arbeit liegt, sondern in der fehlenden Zusage, wann sie aufhört.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s8",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Sollte Ehrenamt bezahlt werden?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir öneriyi değerlendir ve istenmeyen sonuçlarını düşün.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Gönüllü görevler için küçük bir ödeme yapılmalı mı? Görüşünü söyle, lehine bir gerekçe ver, istenmeyen bir sonucu düşün ve kendi çözümünü öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Lehine bir gerekçe ver",
        "İstenmeyen bir sonucu anlat",
        "Kendi çözümünü öner",
      ],
      targets: [
        { de: "Auf den ersten Blick spricht viel dafür, …", tr: "İlk bakışta … lehine çok şey var" },
        { de: "Problematisch wird es dann, wenn …", tr: "Sorun, … olduğunda başlıyor" },
        { de: "Es besteht die Gefahr, dass …", tr: "… tehlikesi var" },
        { de: "Ich würde deshalb dafür plädieren, …", tr: "Bu yüzden …'i savunurdum" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Auf den ersten Blick spricht viel dafür, ehrenamtliche Arbeit wenigstens symbolisch zu " +
        "bezahlen. Wer zwölf Stunden im Monat organisiert und dafür noch das Benzin selbst zahlt, " +
        "subventioniert die Gemeinschaft aus der eigenen Tasche, und das können sich nicht alle " +
        "leisten. Insofern ist eine Aufwandsentschädigung auch eine Frage des Zugangs. " +
        "Problematisch wird es dann, wenn aus der Entschädigung ein Preis wird. " +
        "Es besteht die Gefahr, dass die Arbeit dadurch vergleichbar wird: Wer zwölf Euro pro Stunde " +
        "bekommt, fragt irgendwann, warum es nicht fünfzehn sind, und der Verein steht plötzlich " +
        "in einem Markt, in dem er nicht mithalten kann. Außerdem verschwindet das Argument, " +
        "mit dem man heute jemanden gewinnt, nämlich dass alle gleich viel geben. " +
        "Ich würde deshalb dafür plädieren, klar zwischen Auslagen und Lohn zu trennen: " +
        "Fahrtkosten, Material und Telefon werden erstattet, für die Zeit selbst gibt es kein Geld, " +
        "sondern eine Bescheinigung. Damit ist die Hürde weg, ohne dass ein Preis entsteht.",
      rubricHint:
        "İstenmeyen bir sonuç ve somut bir ayrım beklenir; „auf den ersten Blick“, „es besteht die Gefahr, dass“ ve „plädieren für“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g8",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "nach der Prüfung oder nachdem geprüft wurde?",
    genre: "grammar",
    intro: "Resmî Almanca fiilleri isimleştirir; aynı içeriği iki biçimde kurmayı ve aralarında geçmeyi öğren.",
    focus: "Adlaştırma ve fiilleştirme: Nominalstil ↔ Verbalstil",
    gloss: [
      { de: "die Prüfung", tr: "inceleme", en: "examination" },
      { de: "die Abreise", tr: "hareket", en: "departure" },
      { de: "die Entscheidung", tr: "karar", en: "decision" },
      { de: "die Strafe", tr: "ceza", en: "penalty" },
      { de: "die Verzögerung", tr: "gecikme", en: "delay" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Yan cümle ↔ isim öbeği",
        tr: "Resmî metinlerde yan cümleler sık sık isim öbeğine dönüşür. Bağlaç bir edata, fiil bir isme dönüşür: „nachdem er angekommen ist“ → „nach seiner Ankunft“. İçerik aynı kalır, üslup değişir ve cümle kısalır.",
        examples: [
          { de: "Nach der Prüfung der Unterlagen entscheiden wir.", tr: "Belgeleri inceledikten sonra karar veriyoruz.", note: "nachdem … geprüft worden sind" },
          { de: "Vor seiner Abreise hat er alles geregelt.", tr: "Gitmeden önce her şeyi halletti.", note: "bevor er abgereist ist" },
          { de: "Wegen der Verzögerung fällt der Termin aus.", tr: "Gecikme yüzünden randevu iptal.", note: "weil es sich verzögert hat" },
        ],
      },
      {
        heading: "Hangi bağlaç hangi edata gider",
        tr: "Başlıca eşleşmeler şunlardır: „weil“ → „wegen“, „obwohl“ → „trotz“, „wenn/falls“ → „bei“, „nachdem“ → „nach“, „bevor“ → „vor“, „während“ → „während“ (bu ikisinde biçim aynı, hâl değişir). „wegen“, „trotz“ ve „während“ Genitiv, „bei“, „nach“ ve „vor“ Dativ ister.",
        examples: [
          { de: "Bei Regen fällt das Training aus.", tr: "Yağmur olursa antrenman iptal.", note: "wenn es regnet" },
          { de: "Trotz der Kritik blieb der Plan gleich.", tr: "Eleştiriye rağmen plan aynı kaldı.", note: "obwohl er kritisiert wurde" },
          { de: "Während der Sitzung wurde nichts entschieden.", tr: "Toplantı sırasında hiçbir şeye karar verilmedi.", note: "während die Sitzung lief" },
        ],
      },
      {
        heading: "Hangisini ne zaman?",
        tr: "İsim üslubu kısa ve resmîdir ama okuması yorucudur ve eylemi YAPANI gizler: „nach der Prüfung“ kimin incelediğini söylemez. Fiil üslubu daha açıktır. İyi bir metin ikisini karıştırır; sınav görevlerinde iki yönde de DÖNÜŞTÜRME istenebilir.",
        examples: [
          { de: "Die Entscheidung erfolgt nach Eingang aller Unterlagen.", tr: "Karar, bütün belgeler ulaştıktan sonra veriliyor.", note: "isim üslubu: özne yok" },
          { de: "Wir entscheiden, sobald alle Unterlagen eingegangen sind.", tr: "Bütün belgeler ulaşır ulaşmaz karar veriyoruz.", note: "fiil üslubu: özne açık" },
          { de: "Bei Nichtbeachtung droht eine Strafe.", tr: "Uyulmaması hâlinde ceza var.", note: "resmî dil" },
        ],
      },
    ],
    questions: [
      {
        text: "„Nachdem die Unterlagen geprüft worden sind, entscheiden wir.“ — Welche Form ist gleichbedeutend?",
        options: [
          "Nach der Prüfung der Unterlagen entscheiden wir.",
          "Bei der Prüfung der Unterlagen entscheiden wir.",
          "Trotz der Prüfung der Unterlagen entscheiden wir.",
        ],
        answer: 0,
        explain: "„nachdem“ bağlacı „nach“ edatına karşılık gelir.",
      },
      {
        text: "„Weil es sich verzögert hat, fällt der Termin aus.“ — Welche Fassung ist im Nominalstil?",
        options: [
          "Trotz der Verzögerung fällt der Termin aus.",
          "Wegen der Verzögerung fällt der Termin aus.",
          "Nach der Verzögerung fällt der Termin aus.",
        ],
        answer: 1,
        explain: "Sebep bildiren „weil“ → „wegen“.",
      },
      {
        text: "Welchen Nachteil hat der Nominalstil?",
        options: [
          "Er ist länger.",
          "Er verbirgt oft, wer handelt.",
          "Er ist in Behördentexten unüblich.",
        ],
        answer: 1,
        explain: "„nach der Prüfung“ kimin incelediğini söylemez.",
      },
      {
        kind: "gapfill",
        text: "___ Regen fällt das Training aus. (wenn es regnet)",
        options: [],
        answer: 0,
        accept: ["Bei", "bei"],
        explain: "Koşul bildiren „wenn“ isim üslubunda „bei“ olur.",
      },
      {
        kind: "gapfill",
        text: "___ der Kritik blieb der Plan gleich. (obwohl er kritisiert wurde)",
        options: [],
        answer: 0,
        accept: ["Trotz", "trotz"],
        explain: "„obwohl“ → „trotz“ + Genitiv.",
      },
      {
        kind: "gapfill",
        text: "Vor seiner ___ hat er alles geregelt. (abreisen)",
        options: [],
        answer: 0,
        accept: ["Abreise"],
        explain: "Fiil isimleşiyor: abreisen → die Abreise.",
      },
      {
        kind: "gapfill",
        text: "Wir entscheiden, ___ alle Unterlagen eingegangen sind. (sobald / wegen)",
        options: [],
        answer: 0,
        accept: ["sobald"],
        explain: "Fiil üslubunda bağlaç gerekir; „wegen“ bir edattır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Nach", "der Prüfung", "der Unterlagen", "entscheiden", "wir"],
        explain: "Edat öbeği birinci öğe; fiil ikinci sırada, özne arkasında.",
      },
      {
        kind: "truefalse",
        text: "„Wegen dass es sich verzögert hat, fällt der Termin aus.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„wegen“ bir edattır, yan cümle alamaz; ya „weil“ ya da „wegen der Verzögerung“.",
      },
      {
        kind: "truefalse",
        text: "„Bei Nichtbeachtung droht eine Strafe.“ — Bu resmî bir isim üslubu mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„wenn man es nicht beachtet“ yan cümlesinin isim biçimidir.",
      },
    ],
  },
];
