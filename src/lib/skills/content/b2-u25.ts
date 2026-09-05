import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 25 — "Kapanış: neyi başardın, sırada ne var".
 *
 * Dört ders: Das Empfehlungsschreiben · Fremd im eigenen Land · Fit für C1? ·
 * Vom Können zum Beherrschen. Seviyenin son ünitesi geriye ve ileriye birden
 * bakıyor: başkası hakkında yazılan bir değerlendirme, iki yer arasında kalmanın
 * dili, kendi eksiğini adlandırmak ve kat edilen yolu edilgen geçmişle anmak.
 *
 *   Ünite 25: das Empfehlungsschreiben, das Abschlusszeugnis, die Begabung,
 *             die Zuverlässigkeit, zielstrebig, lernbereit, wissbegierig,
 *             durchsetzungsfähig · sich entfremden, die Weltoffenheit,
 *             die Eingliederung, die Herkunftssprache, das Aufnahmeland,
 *             die Willkommenskultur, die Parallelgesellschaft, mehrsprachig ·
 *             die Wissenslücke, die Lernmethode, festigen, sich einprägen,
 *             aufholen, erlernen, sich spezialisieren, fortgeschritten ·
 *             die Etappe, zurücklegen, beherrschen, der Wortschatz,
 *             der Sprachkurs, der Muttersprachler, begreifen, akzentfrei
 *   Kalıplar: die von ihr geleistete Arbeit · ohne Einschränkung empfehlen ·
 *             Es fühlt sich an, als ob … · Beides ist Heimat ·
 *             Das dürfte machbar sein · Vieles ist erreicht worden ·
 *             Rückblickend …
 *
 * B2 boyunca kurulan yapılar burada bir arada duruyor: ortaç sıfatı, als ob,
 * öznel kip ve edilgen Perfekt. Ünite yeni bir kural getirmiyor — dördünü aynı
 * metinde çalıştırıyor. Bu, seviyenin gerçek sınavı.
 */
export const b2U25: SkillExercise[] = [
  {
    id: "b2-u25-r1",
    level: "B2",
    skill: "reading",
    unit: 25,
    title: "Das Empfehlungsschreiben",
    genre: "Referans mektubu",
    intro: "Bir stajyer için yazılmış referans mektubu. Ortaç sıfatlarının taşıdığı bilgiye dikkat et.",
    gloss: [
      { de: "das Empfehlungsschreiben", tr: "referans mektubu", en: "letter of recommendation" },
      { de: "das Abschlusszeugnis", tr: "mezuniyet belgesi", en: "final certificate" },
      { de: "die Begabung", tr: "kabiliyet", en: "talent" },
      { de: "die Zuverlässigkeit", tr: "güvenilirlik", en: "reliability" },
      { de: "zielstrebig", tr: "azimli", en: "focused" },
      { de: "lernbereit", tr: "öğrenmeye istekli", en: "willing to learn" },
      { de: "wissbegierig", tr: "bilgiye aç", en: "inquisitive" },
      { de: "durchsetzungsfähig", tr: "dediğini yaptırabilen", en: "assertive" },
    ],
    minutes: 6,
    text:
      "EMPFEHLUNGSSCHREIBEN\n\n" +
      "Frau Amina Yalçın war von März bis August 2026 als Werkstudentin in unserer Abteilung Planung tätig. Ich habe ihre Arbeit in diesen sechs Monaten unmittelbar begleitet und schreibe dieses Empfehlungsschreiben gern.\n\n" +
      "Die von ihr geleistete Arbeit umfasste die Auswertung von Lieferdaten, die Vorbereitung von zwei Zwischenberichten und ab Mai die eigenständige Betreuung eines kleinen Standorts. Der zuletzt genannte Bereich war ursprünglich nicht vorgesehen; wir haben ihn übertragen, nachdem sich gezeigt hatte, dass Frau Yalçın komplexe Zusammenhänge schnell begreift.\n\n" +
      "Neben einer sichtbaren fachlichen Begabung ist besonders ihre Zuverlässigkeit hervorzuheben. Zugesagte Termine wurden ausnahmslos gehalten, und zwar auch dann, wenn Zulieferungen aus anderen Bereichen fehlten — in solchen Fällen hat sie früh nachgefragt statt spät zu melden. Sie ist zielstrebig und lernbereit, ohne dabei über andere hinwegzugehen, und im besten Sinne wissbegierig: Sie fragt so lange nach, bis sie eine Sache verstanden hat, und nicht nur so lange, bis sie sie ausführen kann.\n\n" +
      "In Besprechungen mit externen Partnern hat sie sich als durchsetzungsfähig erwiesen. Zwei von ihr vorgeschlagene Änderungen am Ablauf sind übernommen worden und gelten bis heute.\n\n" +
      "Frau Yalçın verlässt uns auf eigenen Wunsch, um ihr Studium abzuschließen. Das Abschlusszeugnis wird sie im Frühjahr erhalten. Wir hätten sie gern länger beschäftigt und würden sie jederzeit wieder einstellen.\n\n" +
      "Ich empfehle Frau Yalçın ohne Einschränkung. Für Rückfragen stehe ich zur Verfügung.\n\n" +
      "Dr. Katrin Möller, Leiterin Planung",
    questions: [
      {
        kind: "gapfill",
        text: "Die von ihr ___ Arbeit umfasste die Auswertung von Lieferdaten.",
        options: [],
        answer: 0,
        accept: ["geleistete"],
        explain: "Ortaç II sıfatı edilgen anlam taşır: onun tarafından yapılan iş.",
      },
      {
        text: "Warum wurde ihr die Betreuung eines Standorts übertragen?",
        options: [
          "weil es von Anfang an geplant war",
          "weil sie komplexe Zusammenhänge schnell begreift",
          "weil niemand sonst da war",
        ],
        answer: 1,
        explain: "„…nachdem sich gezeigt hatte, dass Frau Yalçın komplexe Zusammenhänge schnell begreift.“",
      },
      {
        kind: "short_answer",
        text: "Wie viele ihrer Änderungsvorschläge wurden übernommen?",
        options: [],
        answer: 0,
        accept: ["zwei", "zwei Änderungen", "2"],
        explain: "„Zwei von ihr vorgeschlagene Änderungen am Ablauf sind übernommen worden.“",
      },
      {
        text: "Wie beschreibt der Text ihr Nachfragen?",
        options: [
          "Sie fragt, bis sie eine Sache verstanden hat.",
          "Sie fragt, bis sie loslegen kann.",
          "Sie fragt selten nach.",
        ],
        answer: 0,
        explain: "„Sie fragt so lange nach, bis sie eine Sache verstanden hat, und nicht nur so lange, bis sie sie ausführen kann.“",
      },
      {
        text: "Frau Yalçın wurde gekündigt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Frau Yalçın verlässt uns auf eigenen Wunsch, um ihr Studium abzuschließen.“",
      },
    ],
  },

  {
    id: "b2-u25-r2",
    level: "B2",
    skill: "reading",
    unit: 25,
    title: "Vom Können zum Beherrschen",
    genre: "Kapanış yazısı",
    intro: "B2'nin sonunda geriye bakış. Neyin başarıldığı nasıl anlatılıyor?",
    gloss: [
      { de: "die Etappe", tr: "etap", en: "stage" },
      { de: "zurücklegen", tr: "kat etmek", en: "to cover" },
      { de: "beherrschen", tr: "hâkim olmak", en: "to master" },
      { de: "der Wortschatz", tr: "kelime hazinesi", en: "vocabulary" },
      { de: "der Sprachkurs", tr: "dil kursu", en: "language course" },
      { de: "der Muttersprachler", tr: "ana dili konuşuru", en: "native speaker" },
      { de: "begreifen", tr: "kavramak", en: "to grasp" },
      { de: "akzentfrei", tr: "aksansız", en: "accent-free" },
    ],
    minutes: 6,
    text:
      "VOM KÖNNEN ZUM BEHERRSCHEN\n\n" +
      "Rückblickend ist eine lange Etappe zurückgelegt worden. Am Anfang stand die Frage, ob ein Satz überhaupt herauskommt. Am Ende von B2 steht eine andere: ob er genau das sagt, was gemeint war.\n\n" +
      "Was ist erreicht worden? Der Wortschatz ist um ein Vielfaches gewachsen, aber das ist nicht der eigentliche Punkt. Wichtiger ist, dass die Sprache aufgehört hat, aus Einzelteilen zu bestehen. Ein Nebensatz wird nicht mehr gebaut, er kommt. Ein Passiv wird nicht mehr überlegt, es passt. Diese Verschiebung — vom Können zum Beherrschen — ist auf B2 zum ersten Mal spürbar.\n\n" +
      "Was ist noch nicht erreicht? Zwei Dinge, und beide gehören zur nächsten Stufe. Erstens die Feinheiten der Haltung: Ironie, Andeutung, das höfliche Nein, das kein Nein sagt. Zweitens das Fachliche in fremden Feldern — ein Text über Steuerrecht bleibt schwer, auch wenn kein Wort unbekannt ist.\n\n" +
      "Ein häufiges Missverständnis sollte hier verabschiedet werden: Akzentfrei zu sprechen ist kein Ziel und war nie eines. Muttersprachler hören einen Akzent und denken nichts weiter dabei, solange sie mühelos folgen können. Verständlichkeit ist das Ziel, nicht Unsichtbarkeit.\n\n" +
      "Und der beste Rat für die Zeit nach dem Sprachkurs? Nicht mehr über die Sprache lernen, sondern in ihr etwas anderes tun: ein Buch zu einem Thema lesen, das einen ohnehin interessiert, in einem Verein mitmachen, eine Sache erklären, die man begriffen hat. Ab hier wächst Sprache nur noch als Nebenprodukt von etwas, das man wirklich will.",
    questions: [
      {
        kind: "gapfill",
        text: "Rückblickend ist eine lange Etappe zurückgelegt ___.",
        options: [],
        answer: 0,
        accept: ["worden"],
        explain: "Edilgen Perfekt: sein artı ortaç artı worden. Kat edilen yolu failsiz anar.",
      },
      {
        text: "Was ist laut Text die eigentliche Verschiebung auf B2?",
        options: [
          "ein größerer Wortschatz",
          "dass die Sprache nicht mehr aus Einzelteilen besteht",
          "akzentfreies Sprechen",
        ],
        answer: 1,
        explain: "„Wichtiger ist, dass die Sprache aufgehört hat, aus Einzelteilen zu bestehen.“",
      },
      {
        kind: "short_answer",
        text: "Was bleibt laut Text für die nächste Stufe?",
        options: [],
        answer: 0,
        accept: ["Feinheiten und Fachsprache", "Ironie und Fachtexte", "Haltung und Fachliches"],
        explain: "„Erstens die Feinheiten der Haltung … Zweitens das Fachliche in fremden Feldern.“",
      },
      {
        text: "Was ist laut Text das Ziel?",
        options: ["Unsichtbarkeit", "Verständlichkeit", "Akzentfreiheit"],
        answer: 1,
        explain: "„Verständlichkeit ist das Ziel, nicht Unsichtbarkeit.“",
      },
      {
        text: "Der Text empfiehlt, weiter vor allem über die Sprache zu lernen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Nicht mehr über die Sprache lernen, sondern in ihr etwas anderes tun.“",
      },
    ],
  },

  {
    id: "b2-u25-l1",
    level: "B2",
    skill: "listening",
    unit: 25,
    title: "Fremd im eigenen Land",
    genre: "Diyalog",
    intro: "Uzun süre yurt dışında yaşamış biri döndükten sonra anlatıyor.",
    gloss: [
      { de: "sich entfremden", tr: "yabancılaşmak", en: "to become estranged" },
      { de: "die Weltoffenheit", tr: "dünyaya açıklık", en: "openness to the world" },
      { de: "die Eingliederung", tr: "topluma uyum", en: "integration" },
      { de: "die Herkunftssprache", tr: "köken dili", en: "heritage language" },
      { de: "das Aufnahmeland", tr: "kabul eden ülke", en: "host country" },
      { de: "die Willkommenskultur", tr: "karşılama kültürü", en: "welcoming culture" },
      { de: "die Parallelgesellschaft", tr: "paralel toplum", en: "parallel society" },
      { de: "mehrsprachig", tr: "çok dilli", en: "multilingual" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Selin", text: "Ich bin nach elf Jahren zurück, und es fühlt sich an, als ob ich zu Besuch wäre." },
      { speaker: "Nuri", text: "In deiner eigenen Stadt?" },
      { speaker: "Selin", text: "Ja. Die Straßen kenne ich. Aber die Selbstverständlichkeiten nicht mehr." },
      { speaker: "Nuri", text: "Hast du dich entfremdet oder hat sich der Ort verändert?" },
      { speaker: "Selin", text: "Beides, glaube ich. Und keiner von beiden hat es gemerkt." },
      { speaker: "Nuri", text: "War die Eingliederung im Aufnahmeland damals schwer?" },
      { speaker: "Selin", text: "Am Anfang ja. Von Willkommenskultur habe ich damals wenig gemerkt, später wurde es leichter." },
      { speaker: "Nuri", text: "Und hier bist du jetzt die, die weg war." },
      { speaker: "Selin", text: "Genau. Und ich habe nie in einer Parallelgesellschaft gelebt, in keinem der beiden Länder — ich vermisse beides gleichzeitig." },
      { speaker: "Nuri", text: "Sprichst du mit deinen Kindern die Herkunftssprache?" },
      { speaker: "Selin", text: "Ja, beide Sprachen. Sie wachsen mehrsprachig auf und finden das völlig normal." },
      { speaker: "Nuri", text: "Das ist vielleicht die ehrlichste Weltoffenheit — die, die man gar nicht bemerkt." },
      { speaker: "Selin", text: "Schön gesagt. Beides ist Heimat, und ich muss mich nicht entscheiden." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Selin'in dönüşünü anlattığı ilk cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Ich bin nach elf Jahren zurück, und es fühlt sich an, als ob ich zu Besuch wäre."],
        explain: "als ob Konjunktiv II ister: wäre, çünkü gerçekte misafir değil.",
      },
      {
        text: "Was hat sich laut Selin verändert?",
        options: [
          "nur sie selbst",
          "nur der Ort",
          "beides, ohne dass es jemand gemerkt hat",
        ],
        answer: 2,
        explain: "„Beides, glaube ich. Und keiner von beiden hat es gemerkt.“",
      },
      {
        kind: "short_answer",
        text: "Wie wachsen ihre Kinder auf?",
        options: [],
        answer: 0,
        accept: ["mehrsprachig", "mit beiden Sprachen", "zweisprachig"],
        explain: "„Ja, beide Sprachen. Sie wachsen mehrsprachig auf.“",
      },
      {
        text: "Wie nennt Nuri die unbemerkte Weltoffenheit?",
        options: [
          "die ehrlichste",
          "die schwierigste",
          "die seltenste",
        ],
        answer: 0,
        explain: "„Das ist vielleicht die ehrlichste Weltoffenheit — die, die man gar nicht bemerkt.“",
      },
      {
        text: "Selin muss sich zwischen beiden Orten entscheiden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Beides ist Heimat, und ich muss mich nicht entscheiden.“",
      },
    ],
  },

  {
    id: "b2-u25-l2",
    level: "B2",
    skill: "listening",
    unit: 25,
    title: "Fit für C1?",
    genre: "Diyalog",
    intro: "Bir öğrenci bir sonraki seviye için ne yapması gerektiğini konuşuyor.",
    gloss: [
      { de: "die Wissenslücke", tr: "bilgi eksiği", en: "knowledge gap" },
      { de: "die Lernmethode", tr: "öğrenme yöntemi", en: "learning method" },
      { de: "festigen", tr: "pekiştirmek", en: "to consolidate" },
      { de: "sich einprägen", tr: "aklına kazımak", en: "to memorise" },
      { de: "aufholen", tr: "açığı kapatmak", en: "to catch up" },
      { de: "erlernen", tr: "öğrenip edinmek", en: "to acquire" },
      { de: "sich spezialisieren", tr: "uzmanlaşmak", en: "to specialise" },
      { de: "fortgeschritten", tr: "ileri düzey", en: "advanced" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Deniz", text: "B2 ist durch. Ist C1 in einem Jahr realistisch?" },
      { speaker: "Frau Weiß", text: "Das dürfte machbar sein, aber anders als bisher." },
      { speaker: "Deniz", text: "Was heißt anders?" },
      { speaker: "Frau Weiß", text: "Bis B2 haben Sie erlernt, was alle brauchen. Ab jetzt spezialisieren Sie sich." },
      { speaker: "Deniz", text: "Also nicht mehr breit, sondern tief." },
      { speaker: "Frau Weiß", text: "Genau. Wo ist bei Ihnen noch eine Wissenslücke?" },
      { speaker: "Deniz", text: "Beim Konjunktiv I. Ich erkenne ihn, aber ich benutze ihn nicht." },
      { speaker: "Frau Weiß", text: "Typisch für diese Stufe. Erkennen reicht nicht, Sie müssen ihn festigen." },
      { speaker: "Deniz", text: "Wie? Listen einprägen hat bei mir noch nie funktioniert." },
      { speaker: "Frau Weiß", text: "Dann ist es die falsche Lernmethode für Sie. Schreiben Sie stattdessen wöchentlich eine Meldung um." },
      { speaker: "Deniz", text: "Also Zeitungsnachrichten in indirekte Rede?" },
      { speaker: "Frau Weiß", text: "Ja, zehn Zeilen genügen. In drei Monaten haben Sie das aufgeholt." },
      { speaker: "Deniz", text: "Und fortgeschrittene Texte?" },
      { speaker: "Frau Weiß", text: "Lesen Sie in Ihrem eigenen Fach. Da bringen Sie das Wissen schon mit." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Frau Weiß'in C1'i mümkün gördüğü cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Das dürfte machbar sein, aber anders als bisher."],
        explain: "dürfte tahmin bildirir: kesinlik yok, ama yüksek olasılık var.",
      },
      {
        text: "Was ändert sich laut Frau Weiß ab C1?",
        options: [
          "man lernt breiter",
          "man spezialisiert sich",
          "man wiederholt nur",
        ],
        answer: 1,
        explain: "„Bis B2 haben Sie erlernt, was alle brauchen. Ab jetzt spezialisieren Sie sich.“",
      },
      {
        kind: "short_answer",
        text: "Wo hat Deniz eine Wissenslücke?",
        options: [],
        answer: 0,
        accept: ["beim Konjunktiv I", "Konjunktiv I", "indirekte Rede"],
        explain: "„Beim Konjunktiv I. Ich erkenne ihn, aber ich benutze ihn nicht.“",
      },
      {
        text: "Was empfiehlt Frau Weiß statt Listen?",
        options: [
          "wöchentlich eine Meldung umzuschreiben",
          "täglich Vokabeln zu lernen",
          "einen neuen Kurs",
        ],
        answer: 0,
        explain: "„Schreiben Sie stattdessen wöchentlich eine Meldung um.“",
      },
      {
        text: "Deniz benutzt den Konjunktiv I bereits sicher.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ich erkenne ihn, aber ich benutze ihn nicht.“",
      },
    ],
  },

  {
    id: "b2-u25-w1",
    level: "B2",
    skill: "writing",
    unit: 25,
    title: "Dördü bir arada",
    genre: "Cümle kurma",
    intro: "Ortaç sıfatı, als ob, öznel kip ve edilgen Perfekt — B2'nin dört sütunu.",
    gloss: [
      { de: "die Zuverlässigkeit", tr: "güvenilirlik", en: "reliability" },
      { de: "sich entfremden", tr: "yabancılaşmak", en: "to become estranged" },
      { de: "aufholen", tr: "açığı kapatmak", en: "to catch up" },
      { de: "zurücklegen", tr: "kat etmek", en: "to cover" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Onun yaptığı iş iki ara raporu da kapsıyordu.",
        answer: "Die von ihr geleistete Arbeit umfasste zwei Zwischenberichte",
        hint: "Ortaç II sıfatı edilgen anlam taşır; fail von ile araya girer.",
      },
      {
        kind: "build",
        tr: "Sanki misafirmişim gibi hissettiriyor.",
        answer: "Es fühlt sich an, als ob ich zu Besuch wäre",
        hint: "als ob Konjunktiv II ister; yan cümlede fiil sonda.",
      },
      {
        kind: "build",
        tr: "Bu yapılabilir gibi görünüyor.",
        answer: "Das dürfte machbar sein",
        hint: "dürfte tahmin bildirir, izin değil.",
      },
      {
        kind: "build",
        tr: "Geriye bakınca uzun bir etap kat edilmiş oldu.",
        answer: "Rückblickend ist eine lange Etappe zurückgelegt worden",
        hint: "Edilgen Perfekt: sein artı ortaç artı worden.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi referans mektubu diline çevir: ortaç sıfatı ve edilgen kullan.",
        source: "Sie hat zwei Änderungen vorgeschlagen, und wir haben sie übernommen.",
        answer: "Zwei von ihr vorgeschlagene Änderungen sind übernommen worden.",
        alternatives: [
          "Zwei von ihr vorgeschlagene Änderungen sind übernommen worden",
          "Zwei von ihr vorgeschlagene Änderungen wurden übernommen.",
        ],
        why: "Referans mektubu kişiyi değil işi öne alır: ortaç sıfatı katkıyı ada bağlar, edilgen ise kararı verenin kim olduğunu geri plana atar. Sonuç aynı bilgiyi taşır ama övgü kişisel bir yorum gibi değil, kayda geçmiş bir olgu gibi okunur - bu tür metinlerde aranan tam olarak budur.",
      },
    ],
  },

  {
    id: "b2-u25-w2",
    level: "B2",
    skill: "writing",
    unit: 25,
    title: "Ihr Empfehlungsschreiben",
    genre: "Referans mektubu",
    intro: "Birini öner — sıfatlarla değil, yaptığı işle.",
    gloss: [
      { de: "das Empfehlungsschreiben", tr: "referans mektubu", en: "letter of recommendation" },
      { de: "die Begabung", tr: "kabiliyet", en: "talent" },
      { de: "zielstrebig", tr: "azimli", en: "focused" },
      { de: "lernbereit", tr: "öğrenmeye istekli", en: "willing to learn" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Birlikte çalıştığın, okuduğun ya da bir işte gördüğün biri için referans mektubu yaz — gerçek ya da hayalî. Şu sırayı tut: kim, hangi dönemde, hangi görevde; ne yaptığı; hangi somut olayda kendini gösterdiği; ve kapanış tavsiyesi. Kural: her övgüyü bir olayla destekle. En az iki ortaç sıfatı kullan -die von ihm geleistete Arbeit gibi- ve en az bir edilgen Perfekt. Abartma; abartılmış mektup değersizdir.",
        checklist: [
          "Kişi, dönem ve görev baştan belli mi?",
          "Her övgü somut bir olayla destekleniyor mu?",
          "En az iki ortaç sıfatı var mı?",
          "En az bir edilgen Perfekt ve net bir kapanış tavsiyesi var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "die von ihm geleistete Arbeit", tr: "onun yaptığı iş", en: "the work he performed" },
          { de: "Zwei von ihr vorgeschlagene Änderungen sind übernommen worden.", tr: "onun önerdiği iki değişiklik kabul edildi", en: "two changes she proposed were adopted" },
          { de: "Ich empfehle ihn ohne Einschränkung.", tr: "onu çekincesiz öneririm", en: "I recommend him without reservation" },
        ],
        sample:
          "EMPFEHLUNGSSCHREIBEN\n\n" +
          "Herr Tobias Renner hat von September 2025 bis Juli 2026 als studentische Hilfskraft in unserem Team Veranstaltungen gearbeitet. Ich habe ihn in dieser Zeit fachlich angeleitet.\n\n" +
          "Die von ihm geleistete Arbeit umfasste die Koordination von vier Veranstaltungen mit jeweils rund zweihundert Gästen, die Betreuung der Anmeldungen und ab Januar die Abstimmung mit den externen Dienstleistern.\n\n" +
          "Wie zuverlässig er arbeitet, hat sich im Februar gezeigt. Zwei Tage vor einer Tagung ist der Cateringbetrieb ausgefallen. Herr Renner hat innerhalb eines Vormittags einen Ersatz organisiert, die Kosten neu verhandelt und alle Beteiligten informiert, bevor jemand nachfragen musste. Die von ihm vorgeschlagene Ersatzlösung ist danach dauerhaft übernommen worden.\n\n" +
          "Er ist zielstrebig und ausgesprochen lernbereit: Er hat die Buchungssoftware in zwei Wochen selbstständig erlernt und anschließend zwei Kolleginnen eingearbeitet.\n\n" +
          "Herr Renner verlässt uns, weil er sein Studium abschließt. Wir hätten ihn gern übernommen.\n\n" +
          "Ich empfehle ihn ohne Einschränkung und stehe für Rückfragen zur Verfügung.",
      },
    ],
  },
];
