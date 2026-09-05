import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 4 — "Çağrı merkezi, tazminat, uzlaşma, gerilim".
 *
 * Dört ders: In der Warteschleife · Wer zahlt den Schaden? ·
 * Der goldene Mittelweg · Ruhig bleiben.
 *
 *   Ünite 4: der Kundendienst, der Sachbearbeiter, der Dienstleister,
 *            der Systemausfall, die Fehlermeldung, beheben, störanfällig,
 *            die Grundgebühr · der Schadenersatz, infolge, haften,
 *            die Rückerstattung, der Rechtsanspruch, die Rechtsgrundlage,
 *            die Beweislast, zustehen · nachgeben, einvernehmlich,
 *            die Schlichtungsstelle, der Streitfall, die Zusatzvereinbarung,
 *            verpflichten, bestreiten, stillschweigend · die Wut, sachlich,
 *            einfühlsam, respektieren, abklingen, impulsiv, zumuten,
 *            die Erleichterung
 *   Kalıplar: Das Problem lässt sich … · Es ist zu klären, ob/wo … ·
 *            wegen / infolge + Genitiv · Anspruch auf … haben · zwar …,
 *            aber … · sowohl … als auch … · Ich kann … gut verstehen. ·
 *            Wäre es hilfreich, wenn …?
 *
 * Ölçtüğü dilbilgisi: edilgen yerine geçen yapılar, tamlayan hâli edatları,
 * iki parçalı bağlaçlar ve dilek kipiyle yatıştırma. Ünitenin ortak konusu
 * bir anlaşmazlığın tırmanmadan çözülmesi — dil burada teknik değil, sosyal
 * bir araç.
 */
export const b2U04: SkillExercise[] = [
  {
    id: "b2-u04-r1",
    level: "B2",
    skill: "reading",
    unit: 4,
    title: "Wer haftet eigentlich?",
    genre: "Tüketici rehberi",
    intro: "Bir tüketici danışma merkezinin yazısı: zarar doğduğunda kim ne kanıtlamak zorunda?",
    gloss: [
      { de: "der Schadenersatz", tr: "tazminat", en: "compensation" },
      { de: "infolge", tr: "sonucunda", en: "as a result of" },
      { de: "haften", tr: "sorumlu olmak", en: "to be liable" },
      { de: "die Rückerstattung", tr: "geri ödeme", en: "refund" },
      { de: "der Rechtsanspruch", tr: "yasal hak", en: "legal claim" },
      { de: "die Rechtsgrundlage", tr: "yasal dayanak", en: "legal basis" },
      { de: "die Beweislast", tr: "ispat yükü", en: "burden of proof" },
      { de: "zustehen", tr: "hakkı olmak", en: "to be entitled to" },
    ],
    minutes: 6,
    text:
      "WER HAFTET EIGENTLICH?\n\n" +
      "Wenn infolge einer Lieferung ein Schaden entsteht, stellen sich immer dieselben drei Fragen: Wer haftet, was steht mir zu, und wer muss es beweisen?\n\n" +
      "Die erste Frage ist meist die einfachste. Es haftet, wer den Schaden verursacht hat — nicht unbedingt der, mit dem man gerade telefoniert. Der Kundendienst eines Unternehmens ist selten selbst der Verursacher, aber er ist der richtige Weg zum Verursacher.\n\n" +
      "Die zweite Frage hängt an der Rechtsgrundlage. Wer nur unzufrieden ist, hat keinen Rechtsanspruch. Wer einen konkreten Schaden hat, meistens schon. Zwischen Schadenersatz und Rückerstattung liegt dabei ein Unterschied, den viele übersehen: Die Rückerstattung gibt das zurück, was gezahlt wurde. Der Schadenersatz ersetzt darüber hinaus, was durch den Fehler zusätzlich entstanden ist.\n\n" +
      "Die dritte Frage entscheidet in der Praxis fast alles. Die Beweislast liegt in den ersten Monaten beim Verkäufer, danach beim Käufer. Wer also einen Mangel bemerkt, sollte ihn früh und schriftlich melden — nicht am Telefon, wo nichts davon bleibt.\n\n" +
      "Ein praktischer Hinweis zum Schluss: Fotografieren Sie den Schaden am Tag, an dem Sie ihn entdecken. Ein Foto mit Datum ist kein Beweis vor Gericht, aber es beendet die meisten Diskussionen, bevor sie beginnen.",
    questions: [
      {
        text: "Wer haftet laut Text?",
        options: [
          "der Kundendienst",
          "wer den Schaden verursacht hat",
          "immer der Verkäufer",
        ],
        answer: 1,
        explain: "„Es haftet, wer den Schaden verursacht hat — nicht unbedingt der, mit dem man gerade telefoniert.“",
      },
      {
        kind: "short_answer",
        text: "Wo liegt die Beweislast in den ersten Monaten?",
        options: [],
        answer: 0,
        accept: ["beim Verkäufer", "der Verkäufer", "bei dem Verkäufer"],
        explain: "„Die Beweislast liegt in den ersten Monaten beim Verkäufer, danach beim Käufer.“",
      },
      {
        kind: "gapfill",
        text: "Wenn ___ einer Lieferung ein Schaden entsteht, stellen sich drei Fragen.",
        options: [],
        answer: 0,
        accept: ["infolge"],
        explain: "Sonuç bildiren edat; ardından tamlayan hâli gelir (einer Lieferung).",
      },
      {
        text: "Was ist der Unterschied zwischen Rückerstattung und Schadenersatz?",
        options: [
          "Der Schadenersatz ersetzt zusätzlich entstandene Kosten.",
          "Die Rückerstattung ist immer höher.",
          "Beide bedeuten dasselbe.",
        ],
        answer: 0,
        explain: "„Der Schadenersatz ersetzt darüber hinaus, was durch den Fehler zusätzlich entstanden ist.“",
      },
      {
        text: "Ein Foto mit Datum gilt laut Text als Beweis vor Gericht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein Foto mit Datum ist kein Beweis vor Gericht, aber es beendet die meisten Diskussionen.“",
      },
    ],
  },

  {
    id: "b2-u04-r2",
    level: "B2",
    skill: "reading",
    unit: 4,
    title: "Der goldene Mittelweg ist kein Ort",
    genre: "Köşe yazısı",
    intro: "Bir arabulucu, uzlaşmanın neden ortada bir yerde durmadığını anlatıyor.",
    gloss: [
      { de: "nachgeben", tr: "geri adım atmak", en: "to give in" },
      { de: "einvernehmlich", tr: "karşılıklı rızayla", en: "by mutual consent" },
      { de: "die Schlichtungsstelle", tr: "uzlaştırma kurulu", en: "arbitration board" },
      { de: "der Streitfall", tr: "uyuşmazlık", en: "dispute" },
      { de: "die Zusatzvereinbarung", tr: "ek anlaşma", en: "supplementary agreement" },
      { de: "verpflichten", tr: "yükümlü kılmak", en: "to oblige" },
      { de: "bestreiten", tr: "inkâr etmek", en: "to dispute" },
      { de: "stillschweigend", tr: "üstü kapalı", en: "tacitly" },
    ],
    minutes: 6,
    text:
      "DER GOLDENE MITTELWEG IST KEIN ORT\n\n" +
      "Seit elf Jahren sitze ich in Streitfällen zwischen zwei Parteien, und ein Missverständnis begegnet mir in fast jedem zweiten Fall: Man hält den Kompromiss für einen Punkt in der Mitte. Zwei Zahlen, geteilt durch zwei. So funktioniert es fast nie.\n\n" +
      "Wer nur die Mitte sucht, verliert beide Seiten. Die eine fühlt sich betrogen, weil sie mit einer ehrlichen Zahl gekommen ist. Die andere fühlt sich bestätigt, weil ihre übertriebene Forderung belohnt wurde. Zwar ist der Streit dann beendet, aber die Beziehung ist es auch.\n\n" +
      "Ein tragfähiger Kompromiss entsteht anders. Man sucht nicht die Mitte der Zahlen, sondern die Punkte, an denen die Seiten unterschiedlich stark interessiert sind. Sowohl der Preis als auch der Termin stehen im Raum — und fast immer ist einer Seite das eine wichtiger und der anderen das andere. Wer beim Preis nachgibt und beim Termin nicht, verliert nichts.\n\n" +
      "Wichtig ist außerdem, das Ergebnis aufzuschreiben. Eine einvernehmliche Lösung, die nur mündlich existiert, hält bis zum ersten schlechten Tag. Eine kurze Zusatzvereinbarung verpflichtet beide Seiten und nimmt der späteren Erinnerung die Arbeit ab.\n\n" +
      "Und wenn gar nichts geht? Dann bleibt die Schlichtungsstelle. Sie ist kein Gericht und kostet fast nichts. Der größte Vorteil ist aber ein anderer: Vor einer dritten Person bestreitet niemand mehr, was er stillschweigend längst zugegeben hat.",
    questions: [
      {
        kind: "short_answer",
        text: "Was hält der Autor für ein Missverständnis?",
        options: [],
        answer: 0,
        accept: ["die Mitte", "der Kompromiss als Mitte", "die halbe Zahl"],
        explain: "„Man hält den Kompromiss für einen Punkt in der Mitte. […] So funktioniert es fast nie.“",
      },
      {
        text: "Warum verliert man laut Text beide Seiten, wenn man nur die Mitte sucht?",
        options: [
          "Weil die Rechnung zu kompliziert wird.",
          "Weil die ehrliche Seite sich betrogen fühlt.",
          "Weil die Schlichtungsstelle das verbietet.",
        ],
        answer: 1,
        explain: "„Die eine fühlt sich betrogen, weil sie mit einer ehrlichen Zahl gekommen ist.“",
      },
      {
        kind: "gapfill",
        text: "___ ist der Streit dann beendet, aber die Beziehung ist es auch.",
        options: [],
        answer: 0,
        accept: ["Zwar"],
        explain: "İki parçalı bağlaç: zwar önce kabul eder, aber sonra sınırı koyar.",
      },
      {
        text: "Wie entsteht laut Text ein tragfähiger Kompromiss?",
        options: [
          "durch das Teilen der Zahlen",
          "durch Punkte mit unterschiedlich starkem Interesse",
          "durch eine schnelle Entscheidung",
        ],
        answer: 1,
        explain: "„Man sucht […] die Punkte, an denen die Seiten unterschiedlich stark interessiert sind.“",
      },
      {
        text: "Die Schlichtungsstelle ist laut Text ein Gericht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Sie ist kein Gericht und kostet fast nichts.“",
      },
    ],
  },

  {
    id: "b2-u04-l1",
    level: "B2",
    skill: "listening",
    unit: 4,
    title: "Seit Dienstag kein Netz",
    genre: "Telefon görüşmesi",
    intro: "Teknik destek hattı. Edilgen yerine geçen yapılara dikkat et.",
    gloss: [
      { de: "der Kundendienst", tr: "müşteri hizmetleri", en: "customer service" },
      { de: "der Sachbearbeiter", tr: "ilgili görevli", en: "case handler" },
      { de: "der Dienstleister", tr: "hizmet sağlayıcı", en: "service provider" },
      { de: "der Systemausfall", tr: "sistem arızası", en: "system failure" },
      { de: "die Fehlermeldung", tr: "hata mesajı", en: "error message" },
      { de: "beheben", tr: "gidermek", en: "to fix" },
      { de: "störanfällig", tr: "arızaya yatkın", en: "prone to failure" },
      { de: "die Grundgebühr", tr: "sabit ücret", en: "basic fee" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Alev", text: "Guten Tag, ich rufe wegen einer Störung an. Seit Dienstag habe ich kein Netz." },
      { speaker: "Support", text: "Das tut mir leid. Sehen Sie eine Fehlermeldung auf dem Gerät?" },
      { speaker: "Alev", text: "Ja, immer dieselbe: keine Verbindung zum Anbieter. Der Router ist ohnehin störanfällig." },
      { speaker: "Support", text: "Bei uns ist am Montag ein Systemausfall verzeichnet worden. Das Problem lässt sich vermutlich aus der Ferne beheben." },
      { speaker: "Alev", text: "Vermutlich? Ich arbeite von zu Hause, das ist mir zu wenig." },
      { speaker: "Support", text: "Verstehe ich. Es ist zu klären, ob Ihr Anschluss betroffen war. Das prüft ein Sachbearbeiter heute noch." },
      { speaker: "Alev", text: "Und wenn nicht? Dann liegt es am Gerät." },
      { speaker: "Support", text: "Dann schicken wir einen Techniker. Der Dienstleister kommt in der Regel innerhalb von zwei Werktagen." },
      { speaker: "Alev", text: "Gut. Eine Frage noch: Die Grundgebühr läuft ja weiter." },
      { speaker: "Support", text: "Für die Tage ohne Anschluss wird sie erstattet. Das macht der Kundendienst automatisch, Sie müssen nichts beantragen." },
      { speaker: "Alev", text: "Das beruhigt mich. Dann warte ich auf den Rückruf." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Destek görevlisinin arızanın uzaktan giderilebileceğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Das Problem lässt sich vermutlich aus der Ferne beheben."],
        explain: "lassen artı dönüşlü zamir edilgen yerine geçer ve failini söylemez.",
      },
      {
        text: "Was ist am Montag passiert?",
        options: ["ein Systemausfall", "ein Gerätewechsel", "ein Technikerbesuch"],
        answer: 0,
        explain: "„Bei uns ist am Montag ein Systemausfall verzeichnet worden.“",
      },
      {
        kind: "short_answer",
        text: "Was passiert mit der Grundgebühr?",
        options: [],
        answer: 0,
        accept: ["sie wird erstattet", "erstattet", "sie wird zurückgezahlt"],
        explain: "„Für die Tage ohne Anschluss wird sie erstattet.“ Başvuru gerekmiyor.",
      },
      {
        text: "Wie schnell kommt der Techniker in der Regel?",
        options: ["am selben Tag", "innerhalb von zwei Werktagen", "innerhalb einer Woche"],
        answer: 1,
        explain: "„Der Dienstleister kommt in der Regel innerhalb von zwei Werktagen.“",
      },
      {
        text: "Alev muss die Erstattung selbst beantragen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das macht der Kundendienst automatisch, Sie müssen nichts beantragen.“",
      },
    ],
  },

  {
    id: "b2-u04-l2",
    level: "B2",
    skill: "listening",
    unit: 4,
    title: "Erst die Wut, dann die Sache",
    genre: "Diyalog",
    intro: "Öfkeli bir müşteri arıyor. Gerilim hangi sırayla düşüyor?",
    gloss: [
      { de: "die Wut", tr: "öfke", en: "anger" },
      { de: "sachlich", tr: "nesnel", en: "matter-of-fact" },
      { de: "einfühlsam", tr: "empatik", en: "empathetic" },
      { de: "respektieren", tr: "saygı duymak", en: "to respect" },
      { de: "abklingen", tr: "yatışmak", en: "to subside" },
      { de: "impulsiv", tr: "fevri", en: "impulsive" },
      { de: "zumuten", tr: "katlanmasını beklemek", en: "to expect somebody to put up with" },
      { de: "die Erleichterung", tr: "rahatlama", en: "relief" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kunde", text: "Das ist jetzt das dritte Mal! Ich habe keine Lust mehr auf Ausreden. Was machen Sie jetzt?" },
      { speaker: "Jonas", text: "Ich kann Ihre Wut gut verstehen. Dreimal dasselbe kann man niemandem zumuten." },
      { speaker: "Kunde", text: "Danke, dass Sie das wenigstens sagen. Die Letzte hat mit mir diskutiert." },
      { speaker: "Jonas", text: "Ich möchte nicht diskutieren, sondern sachlich klären, was genau seit Montag passiert ist." },
      { speaker: "Kunde", text: "Das ist mir recht. Wenn jemand einfühlsam zuhört, klingt der Ärger schneller ab." },
      { speaker: "Jonas", text: "Und ich respektiere, dass Sie dreimal Zeit investiert haben. Das gehört mit ins Protokoll." },
      { speaker: "Kunde", text: "Montag Termin, niemand kam. Mittwoch angerufen, keine Rückmeldung. Heute Ihre automatische Mail." },
      { speaker: "Jonas", text: "Das steht so bei mir im System, ja. Ich sehe hier auch, warum: Der Termin wurde nie eingetragen." },
      { speaker: "Kunde", text: "Also ein Fehler bei Ihnen." },
      { speaker: "Jonas", text: "Ja. Wäre es hilfreich, wenn ich Ihnen morgen früh einen festen Termin gebe, mit Namen und Uhrzeit?" },
      { speaker: "Kunde", text: "Das wäre das erste Konkrete seit einer Woche." },
      { speaker: "Jonas", text: "Neun Uhr, Herr Baumann kommt. Ich rufe Sie um acht selbst an, damit Sie nicht warten müssen." },
      { speaker: "Kunde", text: "Gut. Ehrlich gesagt war ich vorhin ziemlich impulsiv. Jetzt ist die Erleichterung größer als der Ärger." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Jonas'ın çözümü soru biçiminde sunduğu cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Wäre es hilfreich, wenn ich Ihnen morgen früh einen festen Termin gebe, mit Namen und Uhrzeit?"],
        explain: "Dilek kipinde sahte özne; çözüm dayatılmıyor, teklif ediliyor ve kontrol karşı tarafta kalıyor.",
      },
      {
        text: "Was macht Jonas als Erstes?",
        options: [
          "Er erklärt die Technik.",
          "Er erkennt die Wut des Kunden an.",
          "Er bietet sofort Geld an.",
        ],
        answer: 1,
        explain: "„Ich kann Ihre Wut gut verstehen.“ Önce duygu tanınıyor, sonra konuya geçiliyor.",
      },
      {
        kind: "short_answer",
        text: "Was war der eigentliche Fehler?",
        options: [],
        answer: 0,
        accept: ["der Termin wurde nie eingetragen", "der Termin fehlte im System", "kein Termin eingetragen"],
        explain: "„Ich sehe hier auch, warum: Der Termin wurde nie eingetragen.“",
      },
      {
        text: "Was schlägt Jonas konkret vor?",
        options: [
          "einen festen Termin mit Namen und Uhrzeit",
          "eine schriftliche Entschuldigung",
          "eine Rückerstattung",
        ],
        answer: 0,
        explain: "„Neun Uhr, Herr Baumann kommt. Ich rufe Sie um acht selbst an.“",
      },
      {
        text: "Der Kunde bleibt am Ende genauso wütend.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Jetzt ist die Erleichterung größer als der Ärger.“",
      },
    ],
  },

  {
    id: "b2-u04-w1",
    level: "B2",
    skill: "writing",
    unit: 4,
    title: "Vier Sätze im Konflikt",
    genre: "Cümle kurma",
    intro: "Edilgen yerine geçen yapı, tamlayan hâli edatı, iki parçalı bağlaç ve dilek kipiyle yatıştırma.",
    gloss: [
      { de: "beheben", tr: "gidermek", en: "to fix" },
      { de: "der Schadenersatz", tr: "tazminat", en: "compensation" },
      { de: "nachgeben", tr: "geri adım atmak", en: "to give in" },
      { de: "sachlich", tr: "nesnel", en: "matter-of-fact" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sorun uzaktan giderilebilir.",
        answer: "Das Problem lässt sich aus der Ferne beheben",
        hint: "lassen artı dönüşlü zamir; mastar en sonda.",
      },
      {
        kind: "build",
        tr: "Gecikme sonucunda ek masraflar doğdu.",
        answer: "Infolge der Verspätung sind zusätzliche Kosten entstanden",
        hint: "infolge tamlayan hâli ister; hareket fiili sein ile çekilir.",
      },
      {
        kind: "build",
        tr: "Fiyatta geri adım atıyorum ama tarihte atmıyorum.",
        answer: "Beim Preis gebe ich nach, aber beim Termin nicht",
        hint: "Tümleç başta olduğu için fiil ikinci sırada; ayrılabilen önek sonda.",
      },
      {
        kind: "build",
        tr: "Size yarın sabit bir randevu versem yardımcı olur mu?",
        answer: "Wäre es hilfreich, wenn ich Ihnen morgen einen festen Termin gebe",
        hint: "Dilek kipinde sahte özne es; koşul cümlesinde fiil sonda.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: olumsuzlanan şeyin yerine doğrusu konuyor.",
        source: "Das ist kein Vorwurf, aber eine Bitte.",
        answer: "Das ist kein Vorwurf, sondern eine Bitte.",
        alternatives: ["Das ist kein Vorwurf, sondern eine Bitte"],
        why: "Olumsuzlanan bir şeyin yerine doğrusu konuyorsa bağlaç sondern olur, aber değil. Türkçede ikisi de 'ama' ile karşılandığı için bu ayrım kolayca kayboluyor ve cümle yatıştırmak yerine tartışma açıyor.",
      },
    ],
  },

  {
    id: "b2-u04-w2",
    level: "B2",
    skill: "writing",
    unit: 4,
    title: "Die Antwort auf eine wütende Mail",
    genre: "İş yazışması",
    intro: "Öfkeli bir müşteri e-postasına cevap yaz: önce duygu, sonra olgu, en son çözüm.",
    gloss: [
      { de: "die Wut", tr: "öfke", en: "anger" },
      { de: "einfühlsam", tr: "empatik", en: "empathetic" },
      { de: "die Rückerstattung", tr: "geri ödeme", en: "refund" },
      { de: "einvernehmlich", tr: "karşılıklı rızayla", en: "by mutual consent" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Bu e-postaya cevap yaz. Sırayı koru: önce duyguyu tanı, sonra olguyu nesnel olarak anlat, en son çözümü soru biçiminde sun. En az bir kez dilek kipiyle teklif (Wäre es hilfreich, wenn …?) kullan ve hiçbir yerde suçlama kurma.",
        stimulus:
          "Betreff: Zum dritten Mal!\n\nSehr geehrte Damen und Herren,\n\nich habe jetzt dreimal angerufen und dreimal wurde mir ein Rückruf zugesagt. Gekommen ist nie einer. Der Techniker war am Montag nicht da, obwohl der Termin seit zwei Wochen steht. Ich arbeite von zu Hause und habe seit acht Tagen kein Netz.\n\nIch erwarte heute eine Antwort, in der etwas Konkretes steht.",
        phrases: [
          { de: "Ich kann Ihre Wut gut verstehen.", tr: "öfkenizi çok iyi anlıyorum", en: "I can well understand your anger" },
          { de: "Wäre es hilfreich, wenn …?", tr: "… olsa yardımcı olur mu?", en: "would it help if …?" },
          { de: "Das ist ein Fehler auf unserer Seite.", tr: "bu bizim tarafımızda bir hata", en: "that is a mistake on our side" },
        ],
        checklist: [
          "İlk paragrafta duygu tanınıyor mu?",
          "Ne olduğu nesnel ve suçlamasız anlatılmış mı?",
          "Çözüm dilek kipiyle teklif edildi mi?",
          "Somut bir tarih ya da saat verildi mi?",
        ],
        minWords: 80,
        sample:
          "Sehr geehrter Herr Yildirim,\n\n" +
          "Ihre Wut kann ich gut verstehen. Acht Tage ohne Anschluss kann man niemandem zumuten, und drei zugesagte Rückrufe ohne Rückruf machen es nicht besser.\n\n" +
          "Ich habe den Vorgang gerade geprüft. Der Termin am Montag ist bei uns nie eingetragen worden; die Zusage aus dem Telefonat ist im System nicht angekommen. Das ist ein Fehler auf unserer Seite, und ich bestreite ihn nicht.\n\n" +
          "Wäre es hilfreich, wenn ich Ihnen morgen um neun Uhr einen festen Termin gebe, mit Namen des Technikers? Ich rufe Sie um acht selbst an, damit Sie nicht umsonst warten. Die Grundgebühr für die acht Tage wird Ihnen ohne Antrag erstattet; die Rückerstattung erscheint auf der nächsten Rechnung.\n\n" +
          "Wenn Ihnen ein anderer Tag lieber ist, sagen Sie mir bitte kurz Bescheid.\n\n" +
          "Mit freundlichen Grüßen",
      },
    ],
  },
];
