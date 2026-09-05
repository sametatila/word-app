import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 19 — "İşi kendi eline almak".
 *
 * Dört ders: Der Sprung in die Selbstständigkeit · Gründen auf Deutsch ·
 * Arbeiten, um zu leben? · Vitamin B. Ünite kendi işini kurmanın dört yüzünü
 * alıyor: koşul (sofern), resmî usul (adlaştırma), amaç (um-zu) ve ilişki ağı
 * (edilgen yerine geçenler).
 *
 *   Ünite 19: die Existenzgründung, das Eigenkapital, die Liquidität,
 *             der Umsatz, konkurrieren, florieren, scheitern, absichern ·
 *             das Gewerbe, die Bescheinigung, das Finanzamt, der Antragsteller,
 *             die Umsatzsteuer, die Buchführung, bewilligen, gebührenfrei ·
 *             der Ausgleich, die Belastung, die Arbeitszeit, die Schichtarbeit,
 *             der Urlaubsanspruch, die Elternzeit, die Regeneration,
 *             erwerbstätig · die Referenz, das Arbeitszeugnis,
 *             die Personalabteilung, der Abteilungsleiter, die Berufserfahrung,
 *             anwerben, kooperieren, mitwirken
 *   Kalıplar: Sofern …, … · auf eigene Rechnung · Nach der Bewilligung … ·
 *             Die Anmeldung des … erfolgt … · …, um … zu … ·
 *             Es geht darum, … zu … · Kontakte lassen sich … ·
 *             Gute Arbeit spricht sich herum
 *
 * sofern wenn'den daha dar: yalnız koşul bildirir, zaman bildirmez. Türkçeye
 * ikisi de "-se" ile çevrildiği için ayrım kaybolur; resmî metinde sofern
 * seçmek koşulun tek şart olduğunu söylemektir.
 */
export const b2U19: SkillExercise[] = [
  {
    id: "b2-u19-r1",
    level: "B2",
    skill: "reading",
    unit: 19,
    title: "Gründen auf Deutsch",
    genre: "Resmî bilgilendirme",
    intro: "Bir ticaret odasının iş kurma rehberi. Resmî dilin adlaştırmalarına dikkat et.",
    gloss: [
      { de: "das Gewerbe", tr: "ticari faaliyet", en: "trade" },
      { de: "die Bescheinigung", tr: "belge", en: "certificate" },
      { de: "das Finanzamt", tr: "vergi dairesi", en: "tax office" },
      { de: "der Antragsteller", tr: "başvuru sahibi", en: "applicant" },
      { de: "die Umsatzsteuer", tr: "KDV", en: "VAT" },
      { de: "die Buchführung", tr: "muhasebe", en: "bookkeeping" },
      { de: "bewilligen", tr: "kabul etmek", en: "to approve" },
      { de: "gebührenfrei", tr: "ücretsiz", en: "free of charge" },
    ],
    minutes: 6,
    text:
      "GRÜNDEN AUF DEUTSCH — DIE ERSTEN VIER SCHRITTE\n\n" +
      "1. Anmeldung des Gewerbes. Die Anmeldung erfolgt beim Gewerbeamt der Gemeinde, in der die Tätigkeit ausgeübt wird. Mitzubringen sind Ausweis und, sofern erforderlich, die Erlaubnis für erlaubnispflichtige Tätigkeiten. Die Gebühr liegt je nach Kommune zwischen 15 und 60 Euro; die Beratung im Vorfeld ist gebührenfrei.\n\n" +
      "2. Meldung beim Finanzamt. Nach der Anmeldung erhält der Antragsteller automatisch den Fragebogen zur steuerlichen Erfassung. Hier wird unter anderem entschieden, ob die Kleinunternehmerregelung genutzt wird — dann wird keine Umsatzsteuer ausgewiesen, aber auch keine erstattet. Die Entscheidung bindet mehrere Jahre und sollte deshalb nicht nebenbei getroffen werden.\n\n" +
      "3. Buchführung einrichten. Für die meisten Gründungen genügt die einfache Einnahmenüberschussrechnung. Wichtig ist weniger das Programm als die Gewohnheit: Belege am selben Tag ablegen, nicht am Jahresende suchen.\n\n" +
      "4. Absicherung prüfen. Kranken- und Rentenversicherung laufen nicht automatisch weiter. Zuschüsse werden nur auf Antrag bewilligt, und zwar vor Aufnahme der Tätigkeit — nachträglich ist nichts zu machen.\n\n" +
      "Ein Hinweis aus der Praxis: Die häufigste Bescheinigung, die später fehlt, ist die einfachste — die Gewerbeanmeldung selbst. Legen Sie sie doppelt ab.\n\n" +
      "Und ein zweiter: Rechnen Sie mit vier bis sechs Wochen, bis alles zusammen ist. Wer den Start auf den Tag genau plant, plant falsch.",
    questions: [
      {
        text: "Wo erfolgt die Anmeldung des Gewerbes?",
        options: [
          "beim Finanzamt",
          "beim Gewerbeamt der Gemeinde",
          "bei der Krankenkasse",
        ],
        answer: 1,
        explain: "„Die Anmeldung erfolgt beim Gewerbeamt der Gemeinde, in der die Tätigkeit ausgeübt wird.“",
      },
      {
        kind: "gapfill",
        text: "Mitzubringen sind Ausweis und, ___ erforderlich, die Erlaubnis.",
        options: [],
        answer: 0,
        accept: ["sofern"],
        explain: "sofern yalnız koşul bildirir; wenn'den dar ve resmî metnin tercihidir.",
      },
      {
        kind: "short_answer",
        text: "Wann müssen Zuschüsse beantragt werden?",
        options: [],
        answer: 0,
        accept: ["vor Aufnahme der Tätigkeit", "vor dem Start", "vorher"],
        explain: "„…und zwar vor Aufnahme der Tätigkeit — nachträglich ist nichts zu machen.“",
      },
      {
        text: "Was ist bei der Buchführung laut Text wichtiger als das Programm?",
        options: ["die Gewohnheit", "der Steuerberater", "die Software-Lizenz"],
        answer: 0,
        explain: "„Wichtig ist weniger das Programm als die Gewohnheit.“",
      },
      {
        text: "Die Beratung im Vorfeld kostet eine Gebühr.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…die Beratung im Vorfeld ist gebührenfrei.“",
      },
    ],
  },

  {
    id: "b2-u19-r2",
    level: "B2",
    skill: "reading",
    unit: 19,
    title: "Arbeiten, um zu leben?",
    genre: "Deneme",
    intro: "İş ile yaşam arasındaki denge üzerine bir yazı. Amaç cümlelerine dikkat et.",
    gloss: [
      { de: "der Ausgleich", tr: "denge", en: "balance" },
      { de: "die Belastung", tr: "yük", en: "strain" },
      { de: "die Arbeitszeit", tr: "çalışma süresi", en: "working hours" },
      { de: "die Schichtarbeit", tr: "vardiyalı çalışma", en: "shift work" },
      { de: "der Urlaubsanspruch", tr: "izin hakkı", en: "leave entitlement" },
      { de: "die Elternzeit", tr: "ebeveyn izni", en: "parental leave" },
      { de: "die Regeneration", tr: "toparlanma", en: "recovery" },
      { de: "erwerbstätig", tr: "iş sahibi", en: "in employment" },
    ],
    minutes: 6,
    text:
      "ARBEITEN, UM ZU LEBEN?\n\n" +
      "Der Satz klingt gut und hilft wenig. Fast niemand arbeitet nur, um zu leben, und fast niemand lebt nur, um zu arbeiten. Interessanter ist die Frage, wovon die Belastung tatsächlich abhängt.\n\n" +
      "Nicht allein von der Stundenzahl. Untersuchungen zeigen seit Jahren dasselbe: Zwei Menschen mit identischer Arbeitszeit erleben sie völlig verschieden, je nachdem, wie viel sie selbst über die Lage der Stunden entscheiden. Wer seine Zeit einteilen kann, hält vierzig Stunden besser aus als jemand, der bei dreißig Stunden ständig auf Abruf ist.\n\n" +
      "Am deutlichsten ist das bei Schichtarbeit. Sie belastet nicht, weil sie anstrengend wäre, sondern weil sie die Regeneration stört: Der Körper braucht Rhythmus, und wechselnde Schichten nehmen ihn ihm. Deshalb sind hier feste Rotationen wichtiger als zusätzliche Pausen.\n\n" +
      "Was hilft sonst? Erstens der Ausgleich — nicht als Hobby-Pflicht, sondern als etwas, das nicht bewertet wird. Zweitens klare Grenzen: Wer abends erreichbar ist, um schneller zu sein, wird selten schneller, aber zuverlässig unruhiger. Drittens der Urlaubsanspruch, und zwar am Stück. Drei Tage sind Erholung, zwei Wochen sind Regeneration.\n\n" +
      "Und die Elternzeit? Sie ist der Moment, in dem viele zum ersten Mal merken, wie ihre Arbeit organisiert ist — weil sie plötzlich nicht mehr erwerbstätig sind und trotzdem ununterbrochen arbeiten. Wer danach zurückkommt, verhandelt anders. Das ist keine Nebenwirkung, das ist der eigentliche Effekt.",
    questions: [
      {
        text: "Wovon hängt die Belastung laut Text vor allem ab?",
        options: [
          "von der Stundenzahl",
          "davon, wie viel man selbst über die Lage der Stunden entscheidet",
          "vom Gehalt",
        ],
        answer: 1,
        explain: "„…je nachdem, wie viel sie selbst über die Lage der Stunden entscheiden.“",
      },
      {
        kind: "gapfill",
        text: "Wer abends erreichbar ist, ___ schneller zu sein, wird selten schneller.",
        options: [],
        answer: 0,
        accept: ["um"],
        explain: "um … zu amaç bildirir; iki cümlenin öznesi aynı olmalıdır.",
      },
      {
        kind: "short_answer",
        text: "Warum belastet Schichtarbeit?",
        options: [],
        answer: 0,
        accept: ["sie stört die Regeneration", "der Rhythmus fehlt", "wegen des Rhythmus"],
        explain: "„Sie belastet … weil sie die Regeneration stört: Der Körper braucht Rhythmus.“",
      },
      {
        text: "Wie sollte Urlaub laut Text genommen werden?",
        options: ["in einzelnen Tagen", "am Stück", "gar nicht"],
        answer: 1,
        explain: "„Drittens der Urlaubsanspruch, und zwar am Stück. Drei Tage sind Erholung, zwei Wochen sind Regeneration.“",
      },
      {
        text: "Bei Schichtarbeit helfen zusätzliche Pausen mehr als feste Rotationen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Deshalb sind hier feste Rotationen wichtiger als zusätzliche Pausen.“",
      },
    ],
  },

  {
    id: "b2-u19-l1",
    level: "B2",
    skill: "listening",
    unit: 19,
    title: "Der Sprung",
    genre: "Diyalog",
    intro: "Kendi işini kurmayı düşünen biri deneyimli birine danışıyor. Koşullara dikkat et.",
    gloss: [
      { de: "die Existenzgründung", tr: "iş kurma", en: "starting a business" },
      { de: "das Eigenkapital", tr: "öz sermaye", en: "equity" },
      { de: "die Liquidität", tr: "likidite", en: "liquidity" },
      { de: "der Umsatz", tr: "ciro", en: "turnover" },
      { de: "konkurrieren", tr: "rekabet etmek", en: "to compete" },
      { de: "florieren", tr: "iyi gitmek", en: "to flourish" },
      { de: "scheitern", tr: "başarısız olmak", en: "to fail" },
      { de: "absichern", tr: "güvenceye almak", en: "to secure" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Tuna", text: "Ich denke ernsthaft über eine Existenzgründung nach. Was rätst du mir?" },
      { speaker: "Renate", text: "Sofern du zwei Dinge hast, ist es machbar: Eigenkapital und ein Jahr Puffer." },
      { speaker: "Tuna", text: "Ein ganzes Jahr? Ich habe mit sechs Monaten gerechnet." },
      { speaker: "Renate", text: "Zu knapp. Der Umsatz kommt fast immer später als geplant, die Kosten sofort." },
      { speaker: "Tuna", text: "Also Liquidität vor Gewinn." },
      { speaker: "Renate", text: "Genau. Die meisten scheitern nicht am Geschäft, sondern an einem leeren Konto im dritten Monat." },
      { speaker: "Tuna", text: "Mein Vorteil wäre der Preis. Ich könnte günstiger konkurrieren als die Großen." },
      { speaker: "Renate", text: "Das ist der gefährlichste Satz überhaupt. Über den Preis gewinnst du nur, solange du billiger bist." },
      { speaker: "Tuna", text: "Und wenn das Geschäft floriert?" },
      { speaker: "Renate", text: "Dann sichere dich zuerst ab. Krankenversicherung, Rücklage, dann Investition." },
      { speaker: "Tuna", text: "Klingt wenig romantisch." },
      { speaker: "Renate", text: "Ist es auch nicht. Aber es ist der Unterschied zwischen selbstständig und ständig selbst." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Renate'nin iki koşulu söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Sofern du zwei Dinge hast, ist es machbar: Eigenkapital und ein Jahr Puffer."],
        explain: "sofern yalnız koşul bildirir: 'ancak şu varsa'. wenn'den dardır.",
      },
      {
        text: "Woran scheitern die meisten laut Renate?",
        options: [
          "am Geschäft selbst",
          "an einem leeren Konto im dritten Monat",
          "an fehlenden Kunden",
        ],
        answer: 1,
        explain: "„Die meisten scheitern nicht am Geschäft, sondern an einem leeren Konto im dritten Monat.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel Puffer empfiehlt Renate?",
        options: [],
        answer: 0,
        accept: ["ein Jahr", "zwölf Monate", "ein Jahr Puffer"],
        explain: "„…Eigenkapital und ein Jahr Puffer.“ Tuna altı ay hesaplamıştı.",
      },
      {
        text: "Warum ist der Preisvorteil gefährlich?",
        options: [
          "weil man nur gewinnt, solange man billiger ist",
          "weil Preise verboten sind",
          "weil die Großen sofort aufgeben",
        ],
        answer: 0,
        explain: "„Über den Preis gewinnst du nur, solange du billiger bist.“",
      },
      {
        text: "Renate rät, zuerst zu investieren und danach abzusichern.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Krankenversicherung, Rücklage, dann Investition.“",
      },
    ],
  },

  {
    id: "b2-u19-l2",
    level: "B2",
    skill: "listening",
    unit: 19,
    title: "Vitamin B",
    genre: "Diyalog",
    intro: "İlişki ağının işe yarayıp yaramadığı konuşuluyor.",
    gloss: [
      { de: "die Referenz", tr: "referans", en: "reference" },
      { de: "das Arbeitszeugnis", tr: "iş referansı", en: "employment reference" },
      { de: "die Personalabteilung", tr: "insan kaynakları", en: "HR department" },
      { de: "der Abteilungsleiter", tr: "bölüm müdürü", en: "head of department" },
      { de: "die Berufserfahrung", tr: "iş deneyimi", en: "professional experience" },
      { de: "anwerben", tr: "eleman toplamak", en: "to recruit" },
      { de: "kooperieren", tr: "işbirliği yapmak", en: "to cooperate" },
      { de: "mitwirken", tr: "yer almak", en: "to take part" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sarah", text: "Ich habe die Stelle über einen Bekannten bekommen. Fühlt sich komisch an." },
      { speaker: "Gino", text: "Warum? Kontakte lassen sich nicht kaufen, die entstehen durch Arbeit." },
      { speaker: "Sarah", text: "Trotzdem — andere hatten mehr Berufserfahrung." },
      { speaker: "Gino", text: "Und die kannte niemand. Ein Name in der Personalabteilung heißt: Es hat schon mal jemand für dich gebürgt." },
      { speaker: "Sarah", text: "Mein Arbeitszeugnis war auch gut, und ich hatte zwei Referenzen." },
      { speaker: "Gino", text: "Eben. Der Kontakt hat dich in den Stapel gebracht, das Zeugnis hat dich drin gehalten." },
      { speaker: "Sarah", text: "Der Abteilungsleiter hat mich direkt angerufen, noch vor dem Gespräch." },
      { speaker: "Gino", text: "Weil er anwerben wollte, bevor jemand anders es tut. Das ist normal." },
      { speaker: "Sarah", text: "Wie baut man so etwas eigentlich auf? Ich kenne kaum Leute in der Branche." },
      { speaker: "Gino", text: "Indem du an Projekten mitwirkst, bei denen andere zusehen. Gute Arbeit spricht sich herum." },
      { speaker: "Sarah", text: "Also nicht auf Netzwerkveranstaltungen Visitenkarten sammeln?" },
      { speaker: "Gino", text: "Das kannst du auch. Aber wer mit dir kooperiert hat, empfiehlt dich — wer deine Karte hat, nicht." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Gino'nun ilişkilerin nasıl doğduğunu söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Kontakte lassen sich nicht kaufen, die entstehen durch Arbeit."],
        explain: "lassen artı dönüşlü zamir edilgen yerine geçer: 'satın alınamaz'.",
      },
      {
        text: "Was hat laut Gino der Kontakt bewirkt?",
        options: [
          "Er hat Sarah in den Stapel gebracht.",
          "Er hat ihr die Stelle garantiert.",
          "Er hat das Arbeitszeugnis ersetzt.",
        ],
        answer: 0,
        explain: "„Der Kontakt hat dich in den Stapel gebracht, das Zeugnis hat dich drin gehalten.“",
      },
      {
        kind: "short_answer",
        text: "Wie baut man Kontakte laut Gino auf?",
        options: [],
        answer: 0,
        accept: ["durch Mitwirken an Projekten", "durch gute Arbeit", "indem man mitwirkt"],
        explain: "„Indem du an Projekten mitwirkst, bei denen andere zusehen.“",
      },
      {
        text: "Warum hat der Abteilungsleiter direkt angerufen?",
        options: [
          "weil er anwerben wollte, bevor jemand anders es tut",
          "weil die Personalabteilung geschlossen war",
          "weil das Zeugnis fehlte",
        ],
        answer: 0,
        explain: "„Weil er anwerben wollte, bevor jemand anders es tut.“",
      },
      {
        text: "Gino hält gesammelte Visitenkarten für so wertvoll wie gemeinsame Arbeit.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…wer mit dir kooperiert hat, empfiehlt dich — wer deine Karte hat, nicht.“",
      },
    ],
  },

  {
    id: "b2-u19-w1",
    level: "B2",
    skill: "writing",
    unit: 19,
    title: "Koşul, amaç, usul",
    genre: "Cümle kurma",
    intro: "sofern koşulu daraltır, um-zu amacı verir, adlaştırma usulü resmîleştirir.",
    gloss: [
      { de: "das Eigenkapital", tr: "öz sermaye", en: "equity" },
      { de: "das Gewerbe", tr: "ticari faaliyet", en: "trade" },
      { de: "der Ausgleich", tr: "denge", en: "balance" },
      { de: "mitwirken", tr: "yer almak", en: "to take part" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Öz sermayen varsa yapılabilir.",
        answer: "Sofern du Eigenkapital hast, ist es machbar",
        hint: "sofern yan cümle kurar: fiil sonda, ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Ticari faaliyetin kaydı belediyede yapılır.",
        answer: "Die Anmeldung des Gewerbes erfolgt bei der Gemeinde",
        hint: "Adlaştırma artı erfolgen: resmî usul dilinin standart kalıbı.",
      },
      {
        kind: "build",
        tr: "Daha hızlı olmak için akşamları da ulaşılabilir kalıyor.",
        answer: "Er bleibt abends erreichbar, um schneller zu sein",
        hint: "um … zu amaç bildirir ve iki yarıda özne aynı olmalıdır.",
      },
      {
        kind: "build",
        tr: "İlişkiler satın alınamaz.",
        answer: "Kontakte lassen sich nicht kaufen",
        hint: "lassen artı dönüşlü zamir; olanaksızlık bildiriyor.",
      },
      {
        kind: "rewrite",
        prompt: "damit'li cümleyi um … zu ile yaz.",
        source: "Ich arbeite mehr, damit ich schneller fertig werde.",
        answer: "Ich arbeite mehr, um schneller fertig zu werden.",
        alternatives: ["Ich arbeite mehr, um schneller fertig zu werden"],
        why: "İki yarının öznesi aynıysa um … zu tercih edilir; damit ancak özneler farklıysa gerekir. Türkçede '-mek için' bu ayrımı yapmaz, o yüzden Türkçe konuşan aynı öznede de damit kurmaya yatkındır - yanlış değil ama ağır durur.",
      },
    ],
  },

  {
    id: "b2-u19-w2",
    level: "B2",
    skill: "writing",
    unit: 19,
    title: "Die Vorhabenbeschreibung",
    genre: "Proje tanımı",
    intro: "Bir işi kısaca tarif et: ne yapacaksın, hangi koşulla, hangi amaçla?",
    gloss: [
      { de: "der Umsatz", tr: "ciro", en: "turnover" },
      { de: "die Liquidität", tr: "likidite", en: "liquidity" },
      { de: "absichern", tr: "güvenceye almak", en: "to secure" },
      { de: "die Bescheinigung", tr: "belge", en: "certificate" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Kurmayı düşündüğün ya da hayal ettiğin bir işi bir sayfada tarif et — bir atölye, bir hizmet, küçük bir dükkân, serbest bir uğraş. Şu sırayı tut: ne yapacağın, kimin için, hangi koşullar sağlanırsa başlayacağın, ilk yılın parası ve neyi riskli gördüğün. Koşulları sofern ile kur, amaçları um … zu ile bağla, resmî adımları adlaştırmayla yaz. Sonda kendi kendine dürüst bir cümle: bu iş neden başarısız olabilir?",
        checklist: [
          "İş ve hedef kitle açık mı?",
          "En az bir sofern koşulu var mı?",
          "En az bir um … zu amaç cümlesi var mı?",
          "Sonda risk açıkça yazılmış mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Sofern die Genehmigung vorliegt, …", tr: "izin varsa …", en: "provided the permit is in place, …" },
          { de: "Die Anmeldung des Gewerbes erfolgt im März.", tr: "işletme kaydı mart ayında yapılır", en: "the business registration takes place in March" },
          { de: "…, um die ersten Monate abzusichern", tr: "ilk ayları güvenceye almak için", en: "to secure the first months" },
        ],
        sample:
          "VORHABEN: KLEINE HOLZWERKSTATT MIT REPARATURSERVICE\n\n" +
          "Was. Reparatur und Anpassung von Möbeln, dazu Kleinserien für zwei Läden im Ort. Kein Neubau von Küchen — dafür fehlt mir die Maschinenausstattung.\n\n" +
          "Für wen. Privathaushalte im Umkreis von zwanzig Kilometern und zwei Einrichtungsgeschäfte, mit denen ich schon zweimal kooperiert habe.\n\n" +
          "Bedingungen. Sofern der Mietvertrag für die Halle zustande kommt und die Bescheinigung der Berufsgenossenschaft vorliegt, beginne ich im März. Die Anmeldung des Gewerbes erfolgt in derselben Woche.\n\n" +
          "Geld. Eigenkapital 14.000 Euro, davon 9.000 für Maschinen. Den Rest halte ich zurück, um die ersten Monate abzusichern; ich rechne im ersten Jahr mit einem Umsatz, der die Kosten gerade deckt.\n\n" +
          "Risiko. Der schwächste Punkt ist die Liquidität im Winter: Reparaturen werden im Frühjahr beauftragt, die Miete läuft aber ab März. Wenn ich scheitere, dann daran — nicht an fehlenden Kunden.",
      },
    ],
  },
];
