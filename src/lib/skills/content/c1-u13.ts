import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 13 — "Alıntı, panel, sözleşme maddesi, genel şartlar".
 *
 * Dört ders: Richtig zitieren · Auf dem Podium · Das Kleingedruckte ·
 * Die AGB verstehen.
 *
 *   Kelime: die Fußnote, treffend, die Urheberschaft, entstellen, die Passage,
 *           verweisen, die Integrität, entschlüsseln · das Podium, berechtigt,
 *           die Redezeit, sich einbringen, abwägend, eingreifen, die Elite,
 *           bevorzugen · vorbehaltlich, der Verzug, die Klausel, das
 *           Kleingedruckte, die Laufzeit, die Verfügung, binden, beitreten ·
 *           der Hinweis, ausgeschlossen, die Haftung, zumutbar, einbeziehen,
 *           die Rechtfertigung, das Pflichtgefühl, verfügen
 *
 * Ünitenin çekirdeği: METNİN NEYİ BAĞLADIĞI. Alıntı bağlamından koparıldığında
 * kelimeler aynı kalır ama iddia değişir; sözleşme maddesinde tek bir
 * "vorbehaltlich" bütün cümlenin geçerliliğini askıya alır; AGB'de edilgen
 * kip yükümlülüğü kimin taşıdığını gizler.
 *
 * Üçü de aynı beceriyi ister: cümlenin hangi parçasının BAĞLAYICI olduğunu
 * görebilmek. Bu yüzden okuma soruları "ne diyor" değil "ne bağlıyor" diye
 * soruyor.
 */
export const c1U13: SkillExercise[] = [
  {
    id: "c1-u13-r1",
    level: "C1",
    skill: "reading",
    unit: 13,
    title: "Aus dem Zusammenhang gerissen",
    genre: "Deneme",
    intro: "Alıntı doğru ama yanlış olabilir mi? Bağlamın taşıdığı yük.",
    gloss: [
      { de: "die Passage", tr: "pasaj", en: "passage" },
      { de: "entstellen", tr: "çarpıtmak", en: "to distort" },
      { de: "die Urheberschaft", tr: "eser sahipliği", en: "authorship" },
      { de: "treffend", tr: "isabetli", en: "apt" },
      { de: "die Fußnote", tr: "dipnot", en: "footnote" },
      { de: "verweisen", tr: "atıfta bulunmak", en: "to refer" },
      { de: "die Integrität", tr: "bütünlük, dürüstlük", en: "integrity" },
    ],
    minutes: 7,
    text:
      "WÖRTLICH UND TROTZDEM FALSCH\n\n" +
      "Ein Zitat kann Wort für Wort stimmen und die Aussage dennoch entstellen. Das ist keine Spitzfindigkeit, sondern der häufigste Fall von unsauberem Zitieren.\n\n" +
      "Der Mechanismus ist einfach. Fast jede wissenschaftliche Aussage steht unter Bedingungen: „Unter den hier untersuchten Bedingungen erhöht sich das Risiko deutlich.“ Wer den ersten Halbsatz streicht, hat kein Wort geändert und trotzdem eine allgemeine Behauptung erzeugt, die der Autor nie aufgestellt hat.\n\n" +
      "Ähnlich wirkt das Auslassungszeichen. Drei Punkte sind erlaubt, wenn sie Redundanz entfernen. Sie sind unzulässig, wenn zwischen ihnen eine Einschränkung verschwindet — und genau das lässt sich von außen nicht prüfen, weshalb die Verantwortung beim Zitierenden bleibt.\n\n" +
      "Ein dritter Fall betrifft die Urheberschaft. „Wie X treffend bemerkte, sei die Regel überholt“ suggeriert, X habe die Regel für überholt gehalten. Vielleicht hat X aber nur referiert, was andere behaupten. Wer eine Fußnote setzt, ohne die Passage im Original gelesen zu haben, übernimmt fremde Fehler und macht sie zu eigenen.\n\n" +
      "Die Regel der Zunft ist deshalb streng und einfach: Man zitiert nur, was man selbst gelesen hat, und man verweist auf die Seite, nicht auf das Werk. Wer beides einhält, kann falsch liegen — aber nicht unredlich sein. Und die Integrität eines Textes bemisst sich nicht daran, ob er recht hat, sondern daran, ob man sie überprüfen kann.",
    questions: [
      {
        text: "Wie kann ein wörtlich korrektes Zitat trotzdem entstellen?",
        options: [
          "Wenn es zu kurz ist",
          "Wenn eine Bedingung des Originalsatzes wegfällt",
          "Wenn die Fußnote fehlt",
        ],
        answer: 1,
        explain: "Koşul cümlesi silinince özel bir bulgu genel bir iddiaya dönüşüyor.",
      },
      {
        kind: "gapfill",
        text: "Man zitiert nur, was man selbst gelesen hat, und man ___ auf die Seite, nicht auf das Werk.",
        options: [],
        answer: 0,
        accept: ["verweist"],
        explain: "verweisen auf + Akkusativ; sayfa vermek denetlenebilirliğin koşulu.",
      },
      {
        text: "Wann ist das Auslassungszeichen laut Text unzulässig?",
        options: [
          "Immer",
          "Wenn dazwischen eine Einschränkung verschwindet",
          "Wenn es am Satzanfang steht",
        ],
        answer: 1,
        explain: "Ve dışarıdan denetlenemediği için sorumluluk alıntı yapanda kalıyor.",
      },
      {
        kind: "short_answer",
        text: "Welchen Fehler macht, wer ohne Lektüre des Originals eine Fußnote setzt?",
        options: [],
        answer: 0,
        accept: [
          "fremde Fehler werden zu eigenen",
          "er übernimmt fremde Fehler und macht sie zu eigenen",
          "man übernimmt Fehler anderer",
        ],
        explain: "İkinci elden atıf, hatayı da devralıyor.",
      },
      {
        kind: "short_answer",
        text: "Woran bemisst sich laut Text die Integrität eines Textes?",
        options: [],
        answer: 0,
        accept: [
          "an der Überprüfbarkeit",
          "daran, ob man sie überprüfen kann",
          "nicht daran, ob er recht hat, sondern ob man es prüfen kann",
        ],
        explain: "Doğruluk değil denetlenebilirlik ölçüt.",
      },
    ],
  },
  {
    id: "c1-u13-r2",
    level: "C1",
    skill: "reading",
    unit: 13,
    title: "Vorbehaltlich, ausgeschlossen, zumutbar",
    genre: "Bilgilendirme",
    intro: "Sözleşme dili: hangi kelime neyi askıya alır, neyi bağlar?",
    gloss: [
      { de: "vorbehaltlich", tr: "…-in kaydıyla", en: "subject to" },
      { de: "die Klausel", tr: "madde, şart", en: "clause" },
      { de: "der Verzug", tr: "temerrüt", en: "default" },
      { de: "die Laufzeit", tr: "süre, vade", en: "term" },
      { de: "ausgeschlossen", tr: "hariç tutulmuş", en: "excluded" },
      { de: "die Haftung", tr: "sorumluluk", en: "liability" },
      { de: "zumutbar", tr: "makul, beklenebilir", en: "reasonable" },
      { de: "einbeziehen", tr: "dâhil etmek", en: "to incorporate" },
    ],
    minutes: 7,
    text:
      "DREI WÖRTER, DIE EINEN VERTRAG DREHEN\n\n" +
      "Verträge sind selten schwer zu lesen. Sie sind schwer zu gewichten. Drei Wörter entscheiden häufiger als ganze Absätze.\n\n" +
      "VORBEHALTLICH. Es setzt die gesamte Zusage unter eine Bedingung. „Die Lieferung erfolgt am 3. Mai, vorbehaltlich der Verfügbarkeit“ ist kein Liefertermin, sondern eine Absichtserklärung. Wer eine Frist vereinbaren will, muss das Wort streichen — nicht die Frist verkürzen.\n\n" +
      "AUSGESCHLOSSEN. Es kappt Ansprüche. „Die Haftung für mittelbare Schäden ist ausgeschlossen“ heißt: Der Folgeschaden Ihres Produktionsausfalls ist nicht ersetzbar, auch wenn der Fehler unstrittig ist. Diese Klausel ist in Deutschland nicht unbegrenzt zulässig, aber sie wirkt, bis jemand sie angreift.\n\n" +
      "ZUMUTBAR. Es öffnet einen Ermessensspielraum. „Der Anbieter kann die Leistung anpassen, soweit dies für den Kunden zumutbar ist“ verlagert die Entscheidung in die Zukunft und zum Anbieter. Was zumutbar ist, entscheidet im Streitfall ein Gericht — und bis dahin der, der die Klausel geschrieben hat.\n\n" +
      "Ein vierter Punkt betrifft die Einbeziehung. AGB gelten nicht automatisch. Sie müssen vor Vertragsschluss so einbezogen werden, dass der andere sie zur Kenntnis nehmen kann. Ein Link in der Fußzeile einer Rechnung, die nach dem Kauf kommt, genügt nicht.\n\n" +
      "Ein fünfter Punkt ist der Verzug. Er tritt nicht dadurch ein, dass jemand unzufrieden ist, sondern durch Fälligkeit und Mahnung — und erst ab diesem Zeitpunkt entstehen Verzugszinsen und Kostenersatz.\n\n" +
      "Die Laufzeit schließlich steht meist harmlos am Ende. Sie sagt, wie lange all das gilt.",
    questions: [
      {
        text: "Was bewirkt „vorbehaltlich“ laut Text?",
        options: [
          "Es verkürzt die Frist.",
          "Es setzt die gesamte Zusage unter eine Bedingung.",
          "Es erhöht die Haftung.",
        ],
        answer: 1,
        explain: "„kein Liefertermin, sondern eine Absichtserklärung“.",
      },
      {
        kind: "gapfill",
        text: "Die Haftung für mittelbare Schäden ist ___.",
        options: [],
        answer: 0,
        accept: ["ausgeschlossen"],
        explain: "Hasar tartışmasız olsa bile dolaylı zarar karşılanmıyor.",
      },
      {
        text: "Wer entscheidet laut Text zunächst, was „zumutbar“ ist?",
        options: [
          "Der Kunde",
          "Ein Gericht sofort",
          "Der, der die Klausel geschrieben hat",
        ],
        answer: 2,
        explain: "„im Streitfall ein Gericht — und bis dahin der, der die Klausel geschrieben hat“.",
      },
      {
        kind: "short_answer",
        text: "Unter welcher Bedingung gelten AGB laut Text?",
        options: [],
        answer: 0,
        accept: [
          "vor Vertragsschluss einbezogen",
          "wenn sie vor Vertragsschluss einbezogen wurden",
          "sie müssen vorher zur Kenntnis genommen werden können",
        ],
        explain: "„Ein Link in der Fußzeile einer Rechnung … genügt nicht.“",
      },
      {
        text: "Der Text hält Verträge vor allem für sprachlich schwer lesbar.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sie sind schwer zu gewichten“ — sorun okumak değil, tartmak.",
      },
    ],
  },
  {
    id: "c1-u13-l1",
    level: "C1",
    skill: "listening",
    unit: 13,
    title: "Auf dem Podium",
    genre: "Panel",
    intro: "Panelde söz sırası ve ayrım yapma. Kim neyi kabul ediyor?",
    gloss: [
      { de: "das Podium", tr: "panel", en: "panel" },
      { de: "berechtigt", tr: "haklı", en: "legitimate" },
      { de: "die Redezeit", tr: "konuşma süresi", en: "speaking time" },
      { de: "sich einbringen", tr: "katkı vermek", en: "to contribute" },
      { de: "abwägend", tr: "tartarak", en: "weighing up" },
      { de: "eingreifen", tr: "müdahale etmek", en: "to intervene" },
      { de: "bevorzugen", tr: "tercih etmek", en: "to favour" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Moderatorin", text: "Herr Dr. Ulrich, Sie haben die Zahlen. Zwei Minuten." },
      { speaker: "Dr. Ulrich", text: "So berechtigt die Sorge um die Innenstädte ist, so wenig belegt sie die Forderung nach kostenlosem Parken." },
      { speaker: "Frau Sadik", text: "Das ist mir zu kurz. Sie messen Umsatz, wir reden über Erreichbarkeit." },
      { speaker: "Dr. Ulrich", text: "Einverstanden, das differenziere ich gern. Erreichbarkeit ist ein eigener Wert." },
      { speaker: "Moderatorin", text: "Frau Sadik, Ihre Redezeit läuft." },
      { speaker: "Frau Sadik", text: "Ich möchte an einem Punkt einhaken, den Herr Ulrich selbst gemacht hat: Er sagt, die Zahlen zeigten keinen Zusammenhang. Sie zeigen aber auch keinen gegenteiligen." },
      { speaker: "Dr. Ulrich", text: "Das räume ich ein. Fehlender Nachweis ist kein Gegenbeweis." },
      { speaker: "Moderatorin", text: "Ich greife hier einmal ein, weil wir uns im Kreis drehen." },
      { speaker: "Dr. Ulrich", text: "Bitte." },
      { speaker: "Moderatorin", text: "Auf diesem Podium sitzen drei Fachleute, und zwei streiten über eine Zahl, die keiner erhoben hat." },
      { speaker: "Moderatorin", text: "Herr Baum, Sie haben sich bisher wenig eingebracht." },
      { speaker: "Herr Baum", text: "Weil ich abwägend bleiben wollte. Beide Seiten bevorzugen die Daten, die sie kennen." },
      { speaker: "Moderatorin", text: "Das ist eine Feststellung, keine Position." },
      { speaker: "Herr Baum", text: "Stimmt. Dann meine Position: Ohne Vergleichsstadt ist keine der beiden Zahlen aussagekräftig. Ich würde die Debatte um ein Jahr verschieben und messen." },
      { speaker: "Moderatorin", text: "Danke — das ist der erste Vorschlag heute Abend, der überprüfbar ist." },
    ],
    questions: [
      {
        text: "Wie baut Dr. Ulrich seinen ersten Satz?",
        options: [
          "Als reine Ablehnung",
          "Mit einer Konzession: So berechtigt …, so wenig …",
          "Als Frage an das Publikum",
        ],
        answer: 1,
        explain: "Kaygıyı haklı buluyor ama talebi ondan çıkarmıyor — iki hamle tek cümlede.",
      },
      {
        kind: "gapfill",
        text: "So ___ die Sorge um die Innenstädte ist, so wenig belegt sie die Forderung.",
        options: [],
        answer: 0,
        accept: ["berechtigt"],
        explain: "So … so … yapısı: kabul ve sınırlandırma aynı cümlede.",
      },
      {
        text: "Was räumt Dr. Ulrich ein?",
        options: [
          "Dass seine Zahlen falsch sind",
          "Dass fehlender Nachweis kein Gegenbeweis ist",
          "Dass Erreichbarkeit unwichtig ist",
        ],
        answer: 1,
        explain: "Kendi savının sınırını kabul ediyor; bu münazarada güç kaybı değil.",
      },
      {
        kind: "dictation",
        text: "Moderatörün Herr Baum'un önerisini nasıl nitelediğini yaz.",
        options: [],
        answer: 0,
        accept: [
          "das ist der erste Vorschlag heute Abend, der überprüfbar ist",
          "Das ist der erste Vorschlag heute Abend, der überprüfbar ist.",
        ],
        explain: "Panelde değerli olan kesin görüş değil, sınanabilir öneri.",
      },
    ],
  },
  {
    id: "c1-u13-l2",
    level: "C1",
    skill: "listening",
    unit: 13,
    title: "Lesen Sie die Klausel noch einmal",
    genre: "Danışma görüşmesi",
    intro: "Bir sözleşme maddesi birlikte okunuyor. Nerede bağlayıcı, nerede değil?",
    gloss: [
      { de: "die Klausel", tr: "madde", en: "clause" },
      { de: "vorbehaltlich", tr: "…-in kaydıyla", en: "subject to" },
      { de: "die Haftung", tr: "sorumluluk", en: "liability" },
      { de: "der Verzug", tr: "temerrüt", en: "default" },
      { de: "zumutbar", tr: "makul", en: "reasonable" },
      { de: "die Laufzeit", tr: "süre", en: "term" },
      { de: "binden", tr: "bağlamak", en: "to bind" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Ekiz", text: "Hier steht: Lieferung bis 15. März, vorbehaltlich der Verfügbarkeit. Das reicht mir doch?" },
      { speaker: "Herr Dr. Ahrens", text: "Nein. Das Datum bindet niemanden. Mit diesem Wort davor haben Sie keinen Termin, sondern eine Absicht." },
      { speaker: "Frau Ekiz", text: "Aber es steht ein Datum da." },
      { speaker: "Herr Dr. Ahrens", text: "Das ist gerade der Trick. Ein Datum beruhigt, die Einschränkung wirkt." },
      { speaker: "Frau Ekiz", text: "Und wenn sie nicht liefern?" },
      { speaker: "Herr Dr. Ahrens", text: "Dann sind sie nicht in Verzug — es war ja nie fest zugesagt. Ohne Verzug kein Anspruch." },
      { speaker: "Frau Ekiz", text: "Was schlagen Sie vor?" },
      { speaker: "Herr Dr. Ahrens", text: "Streichen Sie das Wort. Wenn die Gegenseite Unsicherheit hat, soll sie ein späteres Datum nennen — nicht ein unverbindliches." },
      { speaker: "Frau Ekiz", text: "Und der Absatz zur Haftung?" },
      { speaker: "Herr Dr. Ahrens", text: "Der ist Standard, aber lesen Sie den Halbsatz am Ende: soweit zumutbar. Wer entscheidet das?" },
      { speaker: "Frau Ekiz", text: "Vermutlich sie." },
      { speaker: "Herr Dr. Ahrens", text: "Bis ein Gericht etwas anderes sagt, ja. Bei einer Laufzeit von fünf Jahren würde ich das nicht offenlassen." },
      { speaker: "Frau Ekiz", text: "Gut. Zwei Änderungen also, nicht zwanzig." },
      { speaker: "Herr Dr. Ahrens", text: "Genau. Die meisten Klauseln sind harmlos. Man muss nur wissen, welche nicht." },
    ],
    questions: [
      {
        text: "Warum bindet das Datum laut Dr. Ahrens niemanden?",
        options: [
          "Weil es zu früh ist",
          "Weil „vorbehaltlich der Verfügbarkeit“ davorsteht",
          "Weil es nicht unterschrieben ist",
        ],
        answer: 1,
        explain: "„Ein Datum beruhigt, die Einschränkung wirkt.“",
      },
      {
        kind: "gapfill",
        text: "Ohne ___ kein Anspruch.",
        options: [],
        answer: 0,
        accept: ["Verzug"],
        explain: "Temerrüt yoksa talep hakkı da doğmuyor — zincirin ilk halkası.",
      },
      {
        text: "Was schlägt Dr. Ahrens statt der Einschränkung vor?",
        options: [
          "Eine Vertragsstrafe",
          "Ein späteres, aber verbindliches Datum",
          "Eine kürzere Laufzeit",
        ],
        answer: 1,
        explain: "Belirsizlik varsa tarih ötelensin ama bağlayıcı kalsın.",
      },
      {
        kind: "short_answer",
        text: "Wie fasst Dr. Ahrens die Aufgabe am Ende zusammen?",
        options: [],
        answer: 0,
        accept: [
          "wissen, welche nicht harmlos sind",
          "die meisten Klauseln sind harmlos, man muss wissen, welche nicht",
          "man muss wissen, welche Klausel nicht harmlos ist",
        ],
        explain: "Sözleşme okumak her satırı tartmak değil, tartılacak satırı bulmak.",
      },
    ],
  },
  {
    id: "c1-u13-w1",
    level: "C1",
    skill: "writing",
    unit: 13,
    title: "Bağlayan ve askıya alan",
    genre: "Dil bilgisi",
    intro: "Bir cümlede taahhüt nerede kuruluyor, nerede boşaltılıyor?",
    gloss: [
      { de: "vorbehaltlich", tr: "…-in kaydıyla", en: "subject to" },
      { de: "ausgeschlossen", tr: "hariç tutulmuş", en: "excluded" },
      { de: "einbeziehen", tr: "dâhil etmek", en: "to incorporate" },
      { de: "verweisen", tr: "atıfta bulunmak", en: "to refer" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Teslimat 15 Mart'ta, stok durumu kaydıyla.",
        answer: "Die Lieferung erfolgt am 15. März, vorbehaltlich der Verfügbarkeit",
        hint: "vorbehaltlich + Genitiv; bütün cümleyi koşula bağlar.",
      },
      {
        kind: "build",
        tr: "Dolaylı zararlar için sorumluluk hariç tutulmuştur.",
        answer: "Die Haftung für mittelbare Schäden ist ausgeschlossen",
        hint: "Edilgen sıfat: kimin hariç tuttuğu söylenmiyor.",
      },
      {
        kind: "build",
        tr: "112. sayfadaki pasaja atıfta bulunuyorum.",
        answer: "Ich verweise auf die Passage auf Seite 112",
        hint: "verweisen auf + Akkusativ; sayfa vermek denetlenebilirlik demek.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi bağlayıcı hâle getir: taahhüt kalsın, kaçış kalksın.",
        source: "Wir liefern am 15. März, vorbehaltlich der Verfügbarkeit.",
        answer: "Wir liefern spätestens am 22. März.",
        alternatives: [
          "Wir liefern spätestens am 22. März",
          "Wir verpflichten uns, bis zum 22. März zu liefern.",
        ],
        why: "Belirsizlik varsa çözüm tarihi askıya almak değil, ötelemek. Kayıtlı bir tarih taahhüt değildir; temerrüt doğmaz, temerrüt doğmayınca talep hakkı da doğmaz.",
      },
    ],
  },
  {
    id: "c1-u13-w2",
    level: "C1",
    skill: "writing",
    unit: 13,
    title: "Zwei Änderungen, nicht zwanzig",
    genre: "Resmî yazı",
    intro: "Sözleşme taslağına yanıt: hangi iki madde değişmeli ve neden?",
    gloss: [
      { de: "die Klausel", tr: "madde", en: "clause" },
      { de: "der Verzug", tr: "temerrüt", en: "default" },
      { de: "zumutbar", tr: "makul", en: "reasonable" },
      { de: "die Laufzeit", tr: "süre", en: "term" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki sözleşme taslağına resmî bir yanıt yaz. En fazla İKİ maddeye itiraz et — en riskli olanları seç. Her itirazda: neyin sorun olduğunu tek cümlede söyle, gerekçeyi hukuki sonucuyla ver, ve somut bir alternatif metin öner. Ton talepkâr değil, çözüm önerici olsun.",
        stimulus:
          "SÖZLEŞME TASLAĞI — İLGİLİ MADDELER\n\n" +
          "§3 Lieferung. Die Lieferung erfolgt am 15. März, vorbehaltlich der Verfügbarkeit beim Vorlieferanten.\n\n" +
          "§7 Haftung. Die Haftung für mittelbare Schäden ist ausgeschlossen.\n\n" +
          "§9 Leistungsanpassung. Der Anbieter kann Leistungsinhalte anpassen, soweit dies für den Kunden zumutbar ist.\n\n" +
          "§12 Laufzeit. Der Vertrag hat eine Laufzeit von fünf Jahren und verlängert sich um jeweils zwölf Monate, sofern nicht drei Monate vor Ablauf gekündigt wird.\n\n" +
          "§15 AGB. Es gelten die Allgemeinen Geschäftsbedingungen des Anbieters in der jeweils gültigen Fassung.",
        checklist: [
          "En fazla iki maddeye itiraz edildi mi?",
          "Her itirazda hukuki sonuç yazıldı mı?",
          "Somut alternatif metin önerildi mi?",
          "Ton çözüm önerici mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Zu § 3 möchten wir eine Anpassung vorschlagen.", tr: "3. maddeye ilişkin bir değişiklik önermek istiyoruz", en: "we would like to propose an adjustment to § 3" },
          { de: "Damit entsteht kein Verzug und folglich kein Anspruch.", tr: "böylece temerrüt ve dolayısıyla talep hakkı doğmaz", en: "this means no default arises and hence no claim" },
          { de: "Wir schlagen folgende Fassung vor: …", tr: "şu ifadeyi öneriyoruz", en: "we propose the following wording" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "vielen Dank für den Entwurf. Zwei Punkte möchten wir vor Unterzeichnung anpassen; die übrigen Klauseln tragen wir mit.\n\n" +
          "ZU § 3 (LIEFERUNG). Der Zusatz „vorbehaltlich der Verfügbarkeit beim Vorlieferanten“ hebt die Bindung des genannten Datums auf. Damit entsteht bei Überschreitung kein Verzug und folglich kein Anspruch unsererseits — der Termin wäre eine Absichtserklärung. Wir schlagen folgende Fassung vor: „Die Lieferung erfolgt spätestens am 22. März.“ Sollte die Beschaffung unsicher sein, nennen Sie bitte ein späteres, aber verbindliches Datum.\n\n" +
          "ZU § 9 (LEISTUNGSANPASSUNG). Der Halbsatz „soweit dies für den Kunden zumutbar ist“ verlagert die Bewertung einseitig auf Ihre Seite; bei einer Laufzeit von fünf Jahren ist das für uns nicht kalkulierbar. Wir schlagen vor: „Änderungen des Leistungsumfangs bedürfen der Zustimmung des Kunden in Textform. Bleibt diese aus, gilt der bisherige Umfang fort.“\n\n" +
          "Zu § 15 bitten wir lediglich um die zum Vertragsschluss gültige Fassung der AGB als Anlage, damit sie wirksam einbezogen ist.\n\n" +
          "Mit freundlichen Grüßen\nF. Ekiz",
      },
    ],
  },
];
