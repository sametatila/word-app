import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 5 — "Fesih, gürültü, ısrarlı şikâyet, geri bildirim".
 *
 * Dört ders: Das Abo kündigen · Der Lärm von nebenan · Der dritte Defekt ·
 * Kritik verpacken.
 *
 *   Ünite 5: fristgerecht, die Kündigungsfrist, die Vertragslaufzeit,
 *            der Widerruf, die Einwilligung, die Auflösung, befristen,
 *            unwirksam · die Nachbarschaft, die Lärmbelästigung,
 *            die Ruhestörung, die Hausverwaltung, die Gemeinde,
 *            der Verstoß, untersagen, rücksichtsvoll · reklamieren,
 *            die Gewährleistung, das Rückgaberecht, der Kaufbeleg,
 *            der Rücktritt, bestehen auf, die Kulanz, mangelhaft ·
 *            die Rückmeldung, der Verbesserungsvorschlag, die Wertschätzung,
 *            die Beurteilung, beurteilen, der Tadel, gewissenhaft, engagiert
 *   Kalıplar: fristgerecht zum … · Ich bitte um … · Sofern Sie einverstanden
 *            sind, … · … ist bereits … worden · Ich bestehe auf … ·
 *            Mir ist aufgefallen, dass … · An Ihrer Stelle würde ich …
 *
 * Ölçtüğü dilbilgisi: isimleştirme, koşullu yan cümle (sofern), edilgen
 * Perfekt ve dilek kipiyle öneri. Dört dersin ortak sorusu şu: haklıyken
 * ilişkiyi bozmadan nasıl ısrar edilir?
 */
export const b2U05: SkillExercise[] = [
  {
    id: "b2-u05-r1",
    level: "B2",
    skill: "reading",
    unit: 5,
    title: "Kündigen, aber richtig",
    genre: "Tüketici rehberi",
    intro: "Bir abonelik nasıl geçerli biçimde feshedilir? Yazının uyardığı üç tuzağa dikkat et.",
    gloss: [
      { de: "fristgerecht", tr: "süresine uygun", en: "within the deadline" },
      { de: "die Kündigungsfrist", tr: "ihbar süresi", en: "notice period" },
      { de: "die Vertragslaufzeit", tr: "sözleşme süresi", en: "contract term" },
      { de: "der Widerruf", tr: "cayma", en: "withdrawal" },
      { de: "die Einwilligung", tr: "rıza", en: "consent" },
      { de: "die Auflösung", tr: "fesih", en: "termination" },
      { de: "befristen", tr: "süreyle sınırlamak", en: "to limit in time" },
      { de: "unwirksam", tr: "hükümsüz", en: "invalid" },
    ],
    minutes: 6,
    text:
      "KÜNDIGEN, ABER RICHTIG\n\n" +
      "Die meisten Kündigungen scheitern nicht am Willen, sondern an drei Kleinigkeiten. Wer sie kennt, spart sich ein Jahr Ärger.\n\n" +
      "Erstens die Frist. Fast jeder Vertrag nennt eine Kündigungsfrist, oft drei Monate zum Ende der Vertragslaufzeit. Wer den Vertrag von vornherein befristen kann, umgeht dieses Problem ganz. Wer einen Tag zu spät kündigt, hat nicht gekündigt, sondern verlängert. Deshalb gehört in jedes Schreiben der Satz, dass fristgerecht zum nächstmöglichen Termin gekündigt wird — dann ist auch bei falsch berechnetem Datum klar, was gemeint war.\n\n" +
      "Zweitens die Form. Viele Anbieter verlangen Schriftform. Eine Kündigung im Chatfenster ist bequem, aber schwer zu beweisen. Wer per Post kündigt, sollte die Auflösung des Vertrags ausdrücklich benennen und eine schriftliche Bestätigung verlangen.\n\n" +
      "Drittens der Unterschied zwischen Kündigung und Widerruf. Der Widerruf gilt nur in den ersten vierzehn Tagen und macht den Vertrag rückwirkend unwirksam. Danach hilft nur noch die Kündigung, die den Vertrag für die Zukunft beendet.\n\n" +
      "Ein häufiger Streitpunkt bleibt die Einwilligung in Werbung. Sie ist rechtlich vom Vertrag getrennt und kann jederzeit widerrufen werden, auch wenn der Vertrag weiterläuft.\n\n" +
      "Und wenn der Anbieter einfach nicht antwortet? Dann gilt die Kündigung trotzdem, sofern sie nachweislich zugegangen ist. Genau deshalb lohnt sich das Einschreiben: Es kostet vier Euro und beendet die Diskussion, bevor sie beginnt.",
    questions: [
      {
        kind: "gapfill",
        text: "In jedes Schreiben gehört der Satz, dass ___ zum nächstmöglichen Termin gekündigt wird.",
        options: [],
        answer: 0,
        accept: ["fristgerecht"],
        explain: "Bu tek kelime, tarihi yanlış hesaplasan bile ne kastettiğini belli eder.",
      },
      {
        text: "Was passiert, wenn man einen Tag zu spät kündigt?",
        options: [
          "Die Kündigung gilt trotzdem.",
          "Der Vertrag verlängert sich.",
          "Der Anbieter muss zustimmen.",
        ],
        answer: 1,
        explain: "„Wer einen Tag zu spät kündigt, hat nicht gekündigt, sondern verlängert.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange gilt der Widerruf?",
        options: [],
        answer: 0,
        accept: ["vierzehn Tage", "14 Tage", "die ersten vierzehn Tage"],
        explain: "„Der Widerruf gilt nur in den ersten vierzehn Tagen.“ Sonrasında yalnız fesih kalır.",
      },
      {
        text: "Was gilt für die Einwilligung in Werbung?",
        options: [
          "Sie endet automatisch mit dem Vertrag.",
          "Sie kann jederzeit widerrufen werden.",
          "Sie ist nach vierzehn Tagen unwirksam.",
        ],
        answer: 1,
        explain: "„Sie ist rechtlich vom Vertrag getrennt und kann jederzeit widerrufen werden.“",
      },
      {
        text: "Ohne Antwort des Anbieters ist die Kündigung ungültig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Dann gilt die Kündigung trotzdem, sofern sie nachweislich zugegangen ist.“",
      },
    ],
  },

  {
    id: "b2-u05-r2",
    level: "B2",
    skill: "reading",
    unit: 5,
    title: "Erst klingeln, dann schreiben",
    genre: "Belediye broşürü",
    intro: "Bir belediyenin gürültü broşürü. Hangi adım hangi sırada geliyor?",
    gloss: [
      { de: "die Nachbarschaft", tr: "komşuluk", en: "neighbourhood" },
      { de: "die Lärmbelästigung", tr: "gürültü rahatsızlığı", en: "noise nuisance" },
      { de: "die Ruhestörung", tr: "huzur bozma", en: "disturbance of the peace" },
      { de: "die Hausverwaltung", tr: "bina yönetimi", en: "property management" },
      { de: "die Gemeinde", tr: "belediye", en: "municipality" },
      { de: "der Verstoß", tr: "ihlal", en: "violation" },
      { de: "untersagen", tr: "men etmek", en: "to prohibit" },
      { de: "rücksichtsvoll", tr: "düşünceli", en: "considerate" },
    ],
    minutes: 6,
    text:
      "LÄRM IN DER NACHBARSCHAFT — WAS TUN?\n\n" +
      "Jede Woche erreichen uns Anrufe zu Lärm. Fast immer geht es um dieselbe Frage: Wann darf ich mich beschweren, und bei wem?\n\n" +
      "Zunächst die Regel. Die Hausordnung untersagt Lärm zwischen zweiundzwanzig und sechs Uhr sowie sonntags ganztägig. Das ist keine Erfindung einzelner Häuser, sondern in fast allen Gemeinden ähnlich geregelt. Ein einmaliger Geburtstag ist übrigens kein Verstoß, ein wöchentlicher wäre einer.\n\n" +
      "Der erste Schritt ist das Gespräch. Das klingt banal, löst aber nach unserer Erfahrung etwa drei Viertel aller Fälle. Viele wissen schlicht nicht, wie dünn die Wände sind. Wer freundlich klingelt und sagt, was ihn stört, wird meist rücksichtsvoll behandelt — jedenfalls beim ersten Mal.\n\n" +
      "Bleibt die Lärmbelästigung bestehen, folgt der zweite Schritt: die Hausverwaltung. Sie ist zuständig für die Einhaltung der Hausordnung und kann abmahnen. Wichtig ist ein einfaches Lärmprotokoll — Datum, Uhrzeit, Dauer, Art des Lärms. Ohne diese Notizen bleibt jede Beschwerde eine Behauptung.\n\n" +
      "Erst im dritten Schritt kommt die Gemeinde ins Spiel, und zwar nur bei wiederholter Ruhestörung. Wir schicken niemanden nachts los, weil eine Waschmaschine läuft.\n\n" +
      "Ein letzter Hinweis: Sofern Sie einverstanden sind, vermitteln wir kostenlos ein Gespräch zu dritt. Das ist unangenehm und dauert eine Stunde — es ist aber immer noch angenehmer als drei Jahre Schweigen im Treppenhaus.",
    questions: [
      {
        text: "Was ist der erste Schritt bei Lärm?",
        options: ["die Hausverwaltung", "das Gespräch mit den Nachbarn", "die Gemeinde"],
        answer: 1,
        explain: "„Der erste Schritt ist das Gespräch. […] löst aber nach unserer Erfahrung etwa drei Viertel aller Fälle.“",
      },
      {
        kind: "short_answer",
        text: "Was gehört in ein Lärmprotokoll?",
        options: [],
        answer: 0,
        accept: ["Datum Uhrzeit Dauer Art", "Datum, Uhrzeit, Dauer", "Datum und Uhrzeit"],
        explain: "„Datum, Uhrzeit, Dauer, Art des Lärms.“ Bu notlar olmadan şikâyet iddia olarak kalıyor.",
      },
      {
        kind: "gapfill",
        text: "___ Sie einverstanden sind, vermitteln wir kostenlos ein Gespräch zu dritt.",
        options: [],
        answer: 0,
        accept: ["Sofern"],
        explain: "Koşul bağlacı; yan cümle başta olduğu için ana cümle fiille başlıyor (vermitteln wir).",
      },
      {
        text: "Wann wird ein Geburtstag zum Verstoß?",
        options: [
          "wenn er einmalig ist",
          "wenn er wöchentlich stattfindet",
          "wenn er sonntags stattfindet",
        ],
        answer: 1,
        explain: "„Ein einmaliger Geburtstag ist übrigens kein Verstoß, ein wöchentlicher wäre einer.“",
      },
      {
        text: "Die Gemeinde kommt schon beim ersten Vorfall.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Erst im dritten Schritt kommt die Gemeinde ins Spiel, und zwar nur bei wiederholter Ruhestörung.“",
      },
    ],
  },

  {
    id: "b2-u05-l1",
    level: "B2",
    skill: "listening",
    unit: 5,
    title: "Zum dritten Mal kaputt",
    genre: "Mağaza görüşmesi",
    intro: "Aynı cihaz üçüncü kez bozuldu. Edilgen geçmişin listeyi nasıl güçlendirdiğine dikkat et.",
    gloss: [
      { de: "reklamieren", tr: "şikâyet etmek", en: "to make a complaint" },
      { de: "die Gewährleistung", tr: "yasal garanti", en: "statutory warranty" },
      { de: "das Rückgaberecht", tr: "iade hakkı", en: "right of return" },
      { de: "der Kaufbeleg", tr: "satın alma belgesi", en: "receipt" },
      { de: "der Rücktritt", tr: "sözleşmeden dönme", en: "withdrawal from contract" },
      { de: "bestehen auf", tr: "ısrar etmek", en: "to insist on" },
      { de: "die Kulanz", tr: "iyi niyet jesti", en: "goodwill" },
      { de: "mangelhaft", tr: "kusurlu", en: "defective" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Deniz", text: "Guten Tag. Ich möchte dieses Gerät reklamieren. Es ist zum dritten Mal kaputt." },
      { speaker: "Verkäufer", text: "Das tut mir leid. Haben Sie den Kaufbeleg dabei?" },
      { speaker: "Deniz", text: "Ja, und die beiden Reparaturbelege. Das Gerät ist bereits zweimal repariert worden." },
      { speaker: "Verkäufer", text: "Dann schicke ich es noch einmal ein. Das geht am schnellsten." },
      { speaker: "Deniz", text: "Nein. Nach zwei Versuchen bestehe ich auf einem Rücktritt vom Kaufvertrag." },
      { speaker: "Verkäufer", text: "Das Rückgaberecht ist nach vierzehn Tagen abgelaufen, das wissen Sie sicher." },
      { speaker: "Deniz", text: "Es geht nicht um Rückgabe, sondern um Gewährleistung. Das Gerät war von Anfang an mangelhaft." },
      { speaker: "Verkäufer", text: "Verstehe. Da muss ich meine Chefin fragen, das entscheide ich nicht allein." },
      { speaker: "Deniz", text: "Gern. Sagen Sie ihr bitte, dass zwei Nachbesserungen dokumentiert sind." },
      { speaker: "Verkäufer", text: "Mache ich. Wenn sie zustimmt, bekommen Sie das Geld zurück, sonst ein neues Gerät aus Kulanz." },
      { speaker: "Deniz", text: "Das Geld wäre mir lieber. Ich habe das Vertrauen in dieses Modell verloren." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Deniz'in şimdiye kadar yapılanları saydığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Das Gerät ist bereits zweimal repariert worden."],
        explain: "Edilgen Perfekt kimin tamir ettiğini söylemez; önemli olan tamirin işe yaramamış olması.",
      },
      {
        text: "Worauf besteht Deniz?",
        options: ["auf einer dritten Reparatur", "auf einem Rücktritt vom Kaufvertrag", "auf einem Preisnachlass"],
        answer: 1,
        explain: "„Nach zwei Versuchen bestehe ich auf einem Rücktritt vom Kaufvertrag.“",
      },
      {
        kind: "short_answer",
        text: "Worum geht es Deniz statt um Rückgabe?",
        options: [],
        answer: 0,
        accept: ["um Gewährleistung", "Gewährleistung", "um die Gewährleistung"],
        explain: "„Es geht nicht um Rückgabe, sondern um Gewährleistung.“ İkisi ayrı haklar.",
      },
      {
        text: "Was passiert, wenn die Chefin nicht zustimmt?",
        options: [
          "Deniz bekommt das Geld zurück.",
          "Deniz bekommt ein neues Gerät aus Kulanz.",
          "Das Gerät wird ein drittes Mal repariert.",
        ],
        answer: 1,
        explain: "„Wenn sie zustimmt, bekommen Sie das Geld zurück, sonst ein neues Gerät aus Kulanz.“",
      },
      {
        text: "Deniz hat den Kaufbeleg nicht dabei.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ja, und die beiden Reparaturbelege.“",
      },
    ],
  },

  {
    id: "b2-u05-l2",
    level: "B2",
    skill: "listening",
    unit: 5,
    title: "Drei Beobachtungen",
    genre: "Geri bildirim görüşmesi",
    intro: "Zor bir geri bildirim. Gözlem, öneri ve soru hangi sırayla geliyor?",
    gloss: [
      { de: "die Rückmeldung", tr: "geri bildirim", en: "feedback" },
      { de: "der Verbesserungsvorschlag", tr: "iyileştirme önerisi", en: "suggestion for improvement" },
      { de: "die Wertschätzung", tr: "takdir", en: "appreciation" },
      { de: "die Beurteilung", tr: "değerlendirme", en: "assessment" },
      { de: "beurteilen", tr: "değerlendirmek", en: "to assess" },
      { de: "der Tadel", tr: "azar", en: "reprimand" },
      { de: "gewissenhaft", tr: "özenli", en: "conscientious" },
      { de: "engagiert", tr: "gayretli", en: "committed" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Sonja", text: "Danke, dass du Zeit hast. Das ist eine Rückmeldung, kein Tadel — das sage ich vorweg." },
      { speaker: "Ilkay", text: "Ich höre schon am Ton, dass etwas kommt." },
      { speaker: "Sonja", text: "Zuerst das Ehrliche: Du arbeitest gewissenhaft, und im Kundenkontakt bist du der Engagierteste im Team." },
      { speaker: "Ilkay", text: "Aber?" },
      { speaker: "Sonja", text: "Mir ist aufgefallen, dass die Berichte oft erst am Montag kommen, obwohl Freitag vereinbart ist." },
      { speaker: "Ilkay", text: "Freitags sitze ich bis sechs bei Kunden. Danach schreibe ich keinen guten Bericht mehr." },
      { speaker: "Sonja", text: "Das verstehe ich. An deiner Stelle würde ich den Termin ändern statt die Arbeitsweise." },
      { speaker: "Ilkay", text: "Also Montagmittag als offizieller Termin? Das wäre ehrlicher als jede Woche zu spät." },
      { speaker: "Sonja", text: "Genau das war mein Verbesserungsvorschlag. Was hältst du davon?" },
      { speaker: "Ilkay", text: "Gut. Und danke, dass die Beurteilung mit dem anfängt, was funktioniert." },
      { speaker: "Sonja", text: "Wertschätzung ist kein Vorwort. Wer nur Fehler beurteilt, bekommt am Ende nur Fehler zu sehen." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Sonja'nın gözlemi kişiselleştirmeden aktardığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Mir ist aufgefallen, dass die Berichte oft erst am Montag kommen, obwohl Freitag vereinbart ist."],
        explain: "Özne 'sen' değil, gözlemin kendisi. Suçlama yok, olgu var.",
      },
      {
        text: "Was schlägt Sonja vor?",
        options: [
          "die Arbeitsweise zu ändern",
          "den Termin zu ändern",
          "die Berichte kürzer zu machen",
        ],
        answer: 1,
        explain: "„An deiner Stelle würde ich den Termin ändern statt die Arbeitsweise.“",
      },
      {
        kind: "short_answer",
        text: "Warum schreibt Ilkay freitags keinen guten Bericht?",
        options: [],
        answer: 0,
        accept: ["er ist bei Kunden", "wegen der Kundentermine", "er arbeitet bis sechs"],
        explain: "„Freitags sitze ich bis sechs bei Kunden. Danach schreibe ich keinen guten Bericht mehr.“",
      },
      {
        text: "Womit beginnt Sonja das Gespräch inhaltlich?",
        options: [
          "mit dem Problem",
          "mit dem, was funktioniert",
          "mit einer Frage an Ilkay",
        ],
        answer: 1,
        explain: "„Zuerst das Ehrliche: Du arbeitest gewissenhaft …“ Ilkay bunu sonunda ayrıca teşekkür ederek anıyor.",
      },
      {
        text: "Sonja hält Wertschätzung für ein Vorwort.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wertschätzung ist kein Vorwort.“",
      },
    ],
  },

  {
    id: "b2-u05-w1",
    level: "B2",
    skill: "writing",
    unit: 5,
    title: "Vier Sätze, in denen man recht hat",
    genre: "Cümle kurma",
    intro: "İsimleştirme, koşullu yan cümle, edilgen geçmiş ve dilek kipiyle öneri.",
    gloss: [
      { de: "fristgerecht", tr: "süresine uygun", en: "within the deadline" },
      { de: "die Ruhestörung", tr: "huzur bozma", en: "disturbance of the peace" },
      { de: "bestehen auf", tr: "ısrar etmek", en: "to insist on" },
      { de: "der Verbesserungsvorschlag", tr: "iyileştirme önerisi", en: "suggestion for improvement" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sözleşmeyi süresine uygun olarak en yakın tarihte feshediyorum.",
        answer: "Ich kündige den Vertrag fristgerecht zum nächstmöglichen Termin",
        hint: "Kalıplaşmış zaman ifadesi zum ile; zarf fiilden hemen sonra.",
      },
      {
        kind: "build",
        tr: "Siz de kabul ederseniz masrafları paylaşırız.",
        answer: "Sofern Sie einverstanden sind, teilen wir die Kosten",
        hint: "Yan cümle başta; ana cümle çekimli fiille başlar.",
      },
      {
        kind: "build",
        tr: "Cihaz şimdiden iki kez tamir edildi.",
        answer: "Das Gerät ist bereits zweimal repariert worden",
        hint: "Edilgen Perfekt: sein, ortaç, sonda kısalmış biçim worden.",
      },
      {
        kind: "build",
        tr: "Sizin yerinizde olsam tarihi değiştirirdim.",
        answer: "An Ihrer Stelle würde ich den Termin ändern",
        hint: "Tümleç başta, dilek kipi ikinci sırada, mastar en sonda.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: fiilin sabit edatı ve hâli karışmış.",
        source: "Ich bestehe auf ein neues Gerät.",
        answer: "Ich bestehe auf einem neuen Gerät.",
        alternatives: ["Ich bestehe auf einem neuen Gerät"],
        why: "bestehen auf yönelme hâli ister: auf einem neuen Gerät. Türkçede 'ısrar etmek' hâl bilgisi taşımadığı için Almancadaki edat-hâl çifti ezberlenmek zorunda; auf hem belirtme hem yönelme alabildiği için de tahmin işe yaramıyor.",
      },
    ],
  },

  {
    id: "b2-u05-w2",
    level: "B2",
    skill: "writing",
    unit: 5,
    title: "Die Kündigung",
    genre: "Resmî mektup",
    intro: "Bir aboneliği geçerli biçimde fesheden kısa bir mektup yaz.",
    gloss: [
      { de: "die Kündigungsfrist", tr: "ihbar süresi", en: "notice period" },
      { de: "die Auflösung", tr: "fesih", en: "termination" },
      { de: "der Widerruf", tr: "cayma", en: "withdrawal" },
      { de: "die Einwilligung", tr: "rıza", en: "consent" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir aboneliği (spor salonu, dergi, telefon hattı — sen seç) fesheden resmî bir mektup yaz. Müşteri numaranı ve tarihi belirt, süresine uygun feshettiğini yaz, yazılı onay iste ve reklam için verdiğin rızayı da geri çek. Kısa tut ve gerekçe verme — fesih için gerekçe gerekmiyor, bu da metnin bir parçası.",
        checklist: [
          "Müşteri numarası ve sözleşme belirtildi mi?",
          "fristgerecht zum … kalıbı kullanıldı mı?",
          "Yazılı onay istendi mi?",
          "Reklam rızasının geri çekilmesi ayrıca yazıldı mı?",
        ],
        minWords: 60,
        phrases: [
          { de: "Hiermit kündige ich … fristgerecht zum …", tr: "işbu yazıyla …-i süresine uygun olarak … tarihine feshediyorum", en: "I hereby terminate … effective …" },
          { de: "Ich bitte um eine schriftliche Bestätigung.", tr: "yazılı bir onay rica ediyorum", en: "I request written confirmation" },
          { de: "Meine Einwilligung in Werbung widerrufe ich.", tr: "reklam için verdiğim rızayı geri çekiyorum", en: "I withdraw my consent to advertising" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "hiermit kündige ich meinen Vertrag mit der Kundennummer 4471-08 fristgerecht zum nächstmöglichen Termin. Sollte die von Ihnen berechnete Kündigungsfrist ein späteres Datum ergeben, gilt diese Kündigung zu diesem Datum.\n\n" +
          "Ich bitte um eine schriftliche Bestätigung der Auflösung mit Angabe des Enddatums. Eine Bestätigung per E-Mail genügt mir.\n\n" +
          "Meine Einwilligung in Werbung per Post und E-Mail widerrufe ich hiermit ebenfalls. Dieser Widerruf gilt unabhängig vom Vertrag.\n\n" +
          "Eine Begründung gebe ich nicht an; sie ist für die Kündigung nicht erforderlich.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },
];
