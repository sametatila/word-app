import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 24 — "İş hayatının dört anı".
 *
 * Dört ders: Drei Angebote · Die Rückfrage-Runde · Der starke Schluss ·
 * Der Abschied. Ünite çalışma hayatının dört tipik anını alıyor ve her birine
 * kendi yapısını veriyor: karşılaştırmada je-desto, mülakatta dolaylı soru,
 * sunum kapanışında adlaştırma, vedada Plusquamperfekt.
 *
 *   Ünite 24: der Kostenvoranschlag, der Preisvergleich, das Sortiment,
 *             der Kaufvertrag, die Gutschrift, die Haltbarkeit,
 *             der Einzelhandel, die Filiale · die Probezeit, der Ablauf,
 *             der Verantwortungsbereich, das Arbeitspaket, der Meilenstein,
 *             die Fertigkeit, die Auffassungsgabe, anspruchsvoll ·
 *             die Zusammenfassung, der Ausblick, die Aufmerksamkeit,
 *             der Zwischenbericht, der Projektauftrag, die Kennzahl,
 *             die Abweichung, lückenlos · die Laufbahn, der Werdegang,
 *             die Verbundenheit, die Bewunderung, die Zuwendung,
 *             der Lebensabend, wohltuend, gesellig
 *   Kalıplar: Je detaillierter …, desto … · Mich würde interessieren, wie … ·
 *             Wann darf ich mit … rechnen? · Zusammenfassend lässt sich
 *             sagen, dass … · Nachdem wir … hatten, …
 *
 * Plusquamperfekt Almancada tek başına durmaz: her zaman bir başka geçmişe
 * göre önceliği işaretler. Türkçedeki "-mıştı" da aynı işi görür, ama Almanca
 * bunu nachdem ile birlikte kural haline getirir — nachdem yan cümlesi ana
 * cümleden bir zaman kademesi geride olmak zorundadır.
 */
export const b2U24: SkillExercise[] = [
  {
    id: "b2-u24-r1",
    level: "B2",
    skill: "reading",
    unit: 24,
    title: "Drei Angebote",
    genre: "İşletme yazısı",
    intro: "Teklif karşılaştırmasının nasıl yapıldığını anlatan bir yazı.",
    gloss: [
      { de: "der Kostenvoranschlag", tr: "fiyat teklifi", en: "cost estimate" },
      { de: "der Preisvergleich", tr: "fiyat karşılaştırması", en: "price comparison" },
      { de: "das Sortiment", tr: "ürün yelpazesi", en: "product range" },
      { de: "der Kaufvertrag", tr: "satış sözleşmesi", en: "purchase contract" },
      { de: "die Gutschrift", tr: "alacak kaydı", en: "credit note" },
      { de: "die Haltbarkeit", tr: "raf ömrü", en: "shelf life" },
      { de: "der Einzelhandel", tr: "perakende", en: "retail" },
      { de: "die Filiale", tr: "şube", en: "branch" },
    ],
    minutes: 6,
    text:
      "DREI ANGEBOTE — UND WARUM DAS BILLIGSTE SELTEN GEWINNT\n\n" +
      "Je detaillierter ein Kostenvoranschlag ist, desto besser lässt er sich vergleichen — und desto höher wirkt er auf den ersten Blick. Das ist der Grundwiderspruch jedes Preisvergleichs: Wer alles aufführt, sieht teurer aus als jemand, der pauschal anbietet und später nachfordert.\n\n" +
      "Deshalb lohnt sich die Mühe, drei Angebote auf dieselbe Struktur zu bringen, bevor man Summen nebeneinanderlegt. Fragen Sie gezielt nach dem, was fehlt: Ist die Anfahrt enthalten? Wer entsorgt das alte Gerät? Was kostet eine Verzögerung, die wir verursachen?\n\n" +
      "Der zweite Punkt betrifft das, was nach dem Kauf passiert. Ein Kaufvertrag regelt den Normalfall; interessant ist der Ausnahmefall. Wie schnell kommt eine Gutschrift, wenn etwas zurückgeht? Gilt sie für das ganze Sortiment oder nur für Lagerware? Im Einzelhandel klingen solche Fragen kleinlich — bis zum ersten Fall.\n\n" +
      "Drittens die Nähe. Ein Anbieter mit einer Filiale in der Nähe ist bei Problemen oft mehr wert als drei Prozent Preisvorteil. Das gilt besonders bei Waren mit begrenzter Haltbarkeit, bei denen eine Ersatzlieferung schnell gehen muss.\n\n" +
      "Und wenn alles ungefähr gleich ist? Dann entscheidet die Erreichbarkeit. Wer schon in der Angebotsphase drei Tage für eine Antwort braucht, wird nach Vertragsabschluss nicht schneller.\n\n" +
      "Ein letzter Rat: Sagen Sie den beiden Anbietern ab, die Sie nicht nehmen — mit einem Satz, ohne Begründungspflicht. Sie brauchen sie beim nächsten Mal wieder.",
    questions: [
      {
        kind: "gapfill",
        text: "Je detaillierter ein Kostenvoranschlag ist, ___ besser lässt er sich vergleichen.",
        options: [],
        answer: 0,
        accept: ["desto"],
        explain: "je yan cümlede, desto ana cümlede; ikisi de karşılaştırma biçimi ister.",
      },
      {
        text: "Was ist der Grundwiderspruch beim Preisvergleich?",
        options: [
          "Wer alles aufführt, sieht teurer aus.",
          "Billige Angebote sind immer schlecht.",
          "Detaillierte Angebote sind unverständlich.",
        ],
        answer: 0,
        explain: "„Wer alles aufführt, sieht teurer aus als jemand, der pauschal anbietet und später nachfordert.“",
      },
      {
        kind: "short_answer",
        text: "Was entscheidet, wenn alle Angebote gleich sind?",
        options: [],
        answer: 0,
        accept: ["die Erreichbarkeit", "Erreichbarkeit", "wie schnell geantwortet wird"],
        explain: "„Dann entscheidet die Erreichbarkeit.“",
      },
      {
        text: "Wann ist eine Filiale in der Nähe besonders wertvoll?",
        options: [
          "bei Waren mit begrenzter Haltbarkeit",
          "bei sehr teuren Geräten",
          "bei Online-Bestellungen",
        ],
        answer: 0,
        explain: "„Das gilt besonders bei Waren mit begrenzter Haltbarkeit.“",
      },
      {
        text: "Man muss abgelehnten Anbietern die Gründe nennen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…mit einem Satz, ohne Begründungspflicht.“",
      },
    ],
  },

  {
    id: "b2-u24-r2",
    level: "B2",
    skill: "reading",
    unit: 24,
    title: "Der starke Schluss",
    genre: "Sunum rehberi",
    intro: "Sunumun son iki dakikasını anlatan bir rehber. Kapanış kalıplarına dikkat et.",
    gloss: [
      { de: "die Zusammenfassung", tr: "özet", en: "summary" },
      { de: "der Ausblick", tr: "ileriye bakış", en: "outlook" },
      { de: "die Aufmerksamkeit", tr: "dikkat", en: "attention" },
      { de: "der Zwischenbericht", tr: "ara rapor", en: "interim report" },
      { de: "der Projektauftrag", tr: "proje görev tanımı", en: "project brief" },
      { de: "die Kennzahl", tr: "gösterge", en: "key figure" },
      { de: "die Abweichung", tr: "sapma", en: "deviation" },
      { de: "lückenlos", tr: "kesintisiz", en: "seamless" },
    ],
    minutes: 6,
    text:
      "DER STARKE SCHLUSS\n\n" +
      "Die letzten zwei Minuten einer Präsentation bleiben hängen. Trotzdem werden sie am seltensten geprobt — meistens fällt der Schluss ins Wasser, weil die Zeit knapp wird und man die letzten Folien durchblättert.\n\n" +
      "Ein guter Schluss hat drei Teile, und alle drei sind kurz. Erstens die Zusammenfassung: „Zusammenfassend lässt sich sagen, dass wir zwei der drei Ziele erreicht haben.“ Nennen Sie höchstens drei Punkte. Wer sieben Punkte zusammenfasst, hat nicht zusammengefasst.\n\n" +
      "Zweitens der Ausblick. Was passiert als Nächstes, bis wann, durch wen? Ein Zwischenbericht ohne nächsten Schritt ist eine Beschreibung, keine Vorlage zur Entscheidung.\n\n" +
      "Drittens die Frage an den Raum. Nicht „Gibt es Fragen?“, sondern die konkrete Frage, die Sie tatsächlich beantwortet haben wollen: „Sollen wir die Abweichung im nächsten Quartal aufholen oder den Projektauftrag anpassen?“ Damit steuern Sie die Diskussion, statt sie abzuwarten.\n\n" +
      "Zwei Fehler kommen besonders häufig vor. Der erste: Kennzahlen im Schluss neu einführen. Was am Ende auftaucht, muss vorher schon dagewesen sein — sonst diskutiert der Raum zwanzig Minuten über eine Zahl, die er zum ersten Mal sieht. Der zweite: sich für die Aufmerksamkeit bedanken und dann noch zwei Minuten weiterreden. Der Dank ist das Signal für Schluss; danach ist Schluss.\n\n" +
      "Und die lückenlose Dokumentation? Sie gehört in die Anlage, nicht auf die Folie. Niemand liest im Sitzen eine Tabelle mit vierzig Zeilen.",
    questions: [
      {
        text: "Warum fällt der Schluss oft ins Wasser?",
        options: [
          "weil er am seltensten geprobt wird und die Zeit knapp wird",
          "weil niemand mehr zuhört",
          "weil die Technik ausfällt",
        ],
        answer: 0,
        explain: "„Trotzdem werden sie am seltensten geprobt — meistens fällt der Schluss ins Wasser, weil die Zeit knapp wird.“",
      },
      {
        kind: "gapfill",
        text: "___ lässt sich sagen, dass wir zwei der drei Ziele erreicht haben.",
        options: [],
        answer: 0,
        accept: ["Zusammenfassend"],
        explain: "Sunum kapanışının standart kalıbı; ardından en fazla üç madde gelir.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Punkte soll eine Zusammenfassung höchstens haben?",
        options: [],
        answer: 0,
        accept: ["drei", "höchstens drei", "3"],
        explain: "„Nennen Sie höchstens drei Punkte.“",
      },
      {
        text: "Welche Frage empfiehlt der Text am Schluss?",
        options: [
          "„Gibt es Fragen?“",
          "die konkrete Frage, die man beantwortet haben will",
          "gar keine Frage",
        ],
        answer: 1,
        explain: "„Nicht 'Gibt es Fragen?', sondern die konkrete Frage, die Sie tatsächlich beantwortet haben wollen.“",
      },
      {
        text: "Neue Kennzahlen gehören in den Schluss.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Was am Ende auftaucht, muss vorher schon dagewesen sein.“",
      },
    ],
  },

  {
    id: "b2-u24-l1",
    level: "B2",
    skill: "listening",
    unit: 24,
    title: "Die Rückfrage-Runde",
    genre: "Diyalog",
    intro: "Mülakatın sonunda aday soru soruyor. Dolaylı soru kalıplarına dikkat et.",
    gloss: [
      { de: "die Probezeit", tr: "deneme süresi", en: "probation period" },
      { de: "der Ablauf", tr: "akış", en: "process" },
      { de: "der Verantwortungsbereich", tr: "sorumluluk alanı", en: "area of responsibility" },
      { de: "das Arbeitspaket", tr: "iş paketi", en: "work package" },
      { de: "der Meilenstein", tr: "kilometre taşı", en: "milestone" },
      { de: "die Fertigkeit", tr: "beceri", en: "skill" },
      { de: "die Auffassungsgabe", tr: "kavrayış", en: "grasp" },
      { de: "anspruchsvoll", tr: "zorlu", en: "demanding" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Bode", text: "Wir sind durch. Haben Sie noch Fragen an uns?" },
      { speaker: "Aday", text: "Ja, drei. Mich würde interessieren, wie der Ablauf in den ersten Wochen aussieht." },
      { speaker: "Frau Bode", text: "Zwei Wochen Einarbeitung, danach ein eigenes Arbeitspaket, aber mit Begleitung." },
      { speaker: "Aday", text: "Und wie ist der Verantwortungsbereich abgegrenzt? Im Text stand es allgemein." },
      { speaker: "Frau Bode", text: "Sie führen die Planung für zwei Standorte. Der Einkauf gehört ausdrücklich nicht dazu." },
      { speaker: "Aday", text: "Gut, das ist klar. Und woran messen Sie nach der Probezeit?" },
      { speaker: "Frau Bode", text: "An zwei Meilensteinen: dem ersten Quartalsbericht und der Übergabe im Juni." },
      { speaker: "Aday", text: "Das klingt anspruchsvoll, aber machbar." },
      { speaker: "Frau Bode", text: "Es ist beides. Uns ist die Auffassungsgabe wichtiger als fertige Fertigkeiten." },
      { speaker: "Aday", text: "Das höre ich gern. Wann darf ich mit einer Rückmeldung rechnen?" },
      { speaker: "Frau Bode", text: "Bis Freitag nächster Woche. Wenn es später wird, melden wir uns trotzdem." },
      { speaker: "Aday", text: "Vielen Dank. Dann warte ich bis Freitag." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Adayın ilk sorusunu yaz.",
        options: [],
        answer: 0,
        accept: ["Mich würde interessieren, wie der Ablauf in den ersten Wochen aussieht."],
        explain: "Dolaylı soru: soru sözcüğü yan cümleyi açar, çekimli fiil sona gider.",
      },
      {
        text: "Was gehört ausdrücklich nicht zum Verantwortungsbereich?",
        options: ["die Planung", "der Einkauf", "die Übergabe"],
        answer: 1,
        explain: "„Der Einkauf gehört ausdrücklich nicht dazu.“",
      },
      {
        kind: "short_answer",
        text: "Woran wird nach der Probezeit gemessen?",
        options: [],
        answer: 0,
        accept: ["an zwei Meilensteinen", "Quartalsbericht und Übergabe", "an zwei Terminen"],
        explain: "„An zwei Meilensteinen: dem ersten Quartalsbericht und der Übergabe im Juni.“",
      },
      {
        text: "Was ist der Firma wichtiger als fertige Fertigkeiten?",
        options: ["die Auffassungsgabe", "die Berufserfahrung", "der Abschluss"],
        answer: 0,
        explain: "„Uns ist die Auffassungsgabe wichtiger als fertige Fertigkeiten.“",
      },
      {
        text: "Bei Verzögerung meldet sich die Firma nicht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Wenn es später wird, melden wir uns trotzdem.“",
      },
    ],
  },

  {
    id: "b2-u24-l2",
    level: "B2",
    skill: "listening",
    unit: 24,
    title: "Der Abschied",
    genre: "Diyalog",
    intro: "Emekli olan bir meslektaş için veda hazırlığı. Zaman kademelerine dikkat et.",
    gloss: [
      { de: "die Laufbahn", tr: "meslek yolu", en: "career" },
      { de: "der Werdegang", tr: "meslek geçmişi", en: "career path" },
      { de: "die Verbundenheit", tr: "bağlılık", en: "attachment" },
      { de: "die Bewunderung", tr: "hayranlık", en: "admiration" },
      { de: "die Zuwendung", tr: "sevgi", en: "attentiveness" },
      { de: "der Lebensabend", tr: "yaşlılık günleri", en: "later years" },
      { de: "wohltuend", tr: "iyi gelen", en: "soothing" },
      { de: "gesellig", tr: "sosyal", en: "sociable" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Erol", text: "Ich soll am Freitag die Rede halten. Wo fange ich an?" },
      { speaker: "Lore", text: "Nicht beim Werdegang. Den kennen alle, das wird eine Aufzählung." },
      { speaker: "Erol", text: "Womit dann?" },
      { speaker: "Lore", text: "Mit einem Moment. Nachdem wir 2014 das Lager verloren hatten, hat sie die ganze Abteilung zusammengehalten." },
      { speaker: "Erol", text: "Stimmt, daran erinnern sich alle." },
      { speaker: "Lore", text: "Genau. Ein Bild sagt mehr als vierzig Jahre Laufbahn in Stichpunkten." },
      { speaker: "Erol", text: "Und dann?" },
      { speaker: "Lore", text: "Dann ein Satz über deine Bewunderung. Ehrlich, nicht feierlich." },
      { speaker: "Erol", text: "Ihre Zuwendung zu neuen Kollegen. Sie hat sich immer Zeit genommen." },
      { speaker: "Lore", text: "Das ist gut. Das ist konkret und wahr." },
      { speaker: "Erol", text: "Und zum Schluss etwas über den Lebensabend?" },
      { speaker: "Lore", text: "Kurz. Sie ist gesellig, sie wird nicht verschwinden. Sag lieber, dass die Tür offen bleibt." },
      { speaker: "Erol", text: "Verbundenheit zeigt man so. Das ist wohltuender als jeder Wunsch für die Zukunft." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Lore'nin 2014'teki anı anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Nachdem wir 2014 das Lager verloren hatten, hat sie die ganze Abteilung zusammengehalten."],
        explain: "nachdem yan cümlesi bir zaman kademesi geride durur: Plusquamperfekt artı Perfekt.",
      },
      {
        text: "Womit soll die Rede nicht anfangen?",
        options: ["mit einem Moment", "mit dem Werdegang", "mit einem Dank"],
        answer: 1,
        explain: "„Nicht beim Werdegang. Den kennen alle, das wird eine Aufzählung.“",
      },
      {
        kind: "short_answer",
        text: "Was bewundert Erol an der Kollegin?",
        options: [],
        answer: 0,
        accept: ["ihre Zuwendung zu Neuen", "ihre Zeit für Neue", "die Zuwendung"],
        explain: "„Ihre Zuwendung zu neuen Kollegen. Sie hat sich immer Zeit genommen.“",
      },
      {
        text: "Was soll Erol statt Zukunftswünschen sagen?",
        options: [
          "dass die Tür offen bleibt",
          "dass sie fehlen wird",
          "wie lange sie da war",
        ],
        answer: 0,
        explain: "„Sag lieber, dass die Tür offen bleibt.“",
      },
      {
        text: "Lore empfiehlt eine feierliche Formulierung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ehrlich, nicht feierlich.“",
      },
    ],
  },

  {
    id: "b2-u24-w1",
    level: "B2",
    skill: "writing",
    unit: 24,
    title: "Dört an, dört yapı",
    genre: "Cümle kurma",
    intro: "Karşılaştırma, dolaylı soru, kapanış kalıbı ve zaman kademesi.",
    gloss: [
      { de: "der Kostenvoranschlag", tr: "fiyat teklifi", en: "cost estimate" },
      { de: "der Ablauf", tr: "akış", en: "process" },
      { de: "die Zusammenfassung", tr: "özet", en: "summary" },
      { de: "die Laufbahn", tr: "meslek yolu", en: "career" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Teklif ne kadar ayrıntılıysa o kadar iyi karşılaştırılabilir.",
        answer: "Je detaillierter ein Kostenvoranschlag ist, desto besser lässt er sich vergleichen",
        hint: "je yan cümlede fiil sonda; desto'dan sonra fiil hemen gelir.",
      },
      {
        kind: "build",
        tr: "İlk haftaların nasıl işlediğini merak ediyorum.",
        answer: "Mich würde interessieren, wie der Ablauf in den ersten Wochen aussieht",
        hint: "Dolaylı soru: soru sözcüğü yan cümleyi açar, fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Özetle üç hedeften ikisine ulaştığımızı söyleyebiliriz.",
        answer: "Zusammenfassend lässt sich sagen, dass wir zwei der drei Ziele erreicht haben",
        hint: "Sunum kapanışının kalıbı; ardından en fazla üç madde.",
      },
      {
        kind: "build",
        tr: "Depoyu kaybettikten sonra bütün bölümü bir arada tuttu.",
        answer: "Nachdem wir das Lager verloren hatten, hat sie die Abteilung zusammengehalten",
        hint: "nachdem yan cümlesi Plusquamperfekt ister, ana cümle Perfekt.",
      },
      {
        kind: "rewrite",
        prompt: "İki cümleyi nachdem ile birleştir ve zaman kademesini kur.",
        source: "Wir haben das Angebot geprüft. Danach haben wir den Vertrag unterschrieben.",
        answer: "Nachdem wir das Angebot geprüft hatten, haben wir den Vertrag unterschrieben.",
        alternatives: ["Nachdem wir das Angebot geprüft hatten, haben wir den Vertrag unterschrieben"],
        why: "nachdem yan cümlesi ana cümleden bir zaman kademesi geride olmak zorundadır: ana cümle Perfekt ise yan cümle Plusquamperfekt olur. Türkçedeki '-dikten sonra' bu kademeyi zaten taşıdığı için anlam tanıdıktır; Almancada eksik bırakılan şey biçimdir, çünkü 'nachdem wir geprüft haben' kulağa doğru gelir ama zaman ilişkisini bozar.",
      },
    ],
  },

  {
    id: "b2-u24-w2",
    level: "B2",
    skill: "writing",
    unit: 24,
    title: "Der Schluss",
    genre: "Kapanış metni",
    intro: "Bir kapanış yaz: ya bir sunumun son iki dakikası, ya bir veda konuşması.",
    gloss: [
      { de: "der Ausblick", tr: "ileriye bakış", en: "outlook" },
      { de: "die Abweichung", tr: "sapma", en: "deviation" },
      { de: "die Verbundenheit", tr: "bağlılık", en: "attachment" },
      { de: "der Werdegang", tr: "meslek geçmişi", en: "career path" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "İki kapanıştan birini yaz. A: Bir sunumun son iki dakikası — özet en fazla üç madde, sonra ileriye bakış -ne, ne zaman, kim- ve sonda salona sorulan somut soru. B: Ayrılan ya da emekli olan bir meslektaş için kısa veda konuşması — bir anıyla başla, sonra somut olarak neye hayran olduğunu söyle, sonda kapıyı açık bırak. Hangisini seçersen seç: yeni bilgi ekleme, tarih ve isimleri somut ver. B'yi seçersen en az bir nachdem cümlesi kur ve zaman kademesini doğru yap.",
        checklist: [
          "Hangi kapanış türü olduğu metinden anlaşılıyor mu?",
          "Özet ya da anı en fazla üç noktaya sığdırılmış mı?",
          "Somut tarih, sayı ya da isim var mı?",
          "Son cümle gerçekten kapanıyor mu?",
        ],
        minWords: 80,
        phrases: [
          { de: "Zusammenfassend lässt sich sagen, dass …", tr: "özetle şunu söyleyebiliriz …", en: "in summary, one can say that …" },
          { de: "Nachdem wir … hatten, …", tr: "… ettikten sonra …", en: "after we had …, …" },
          { de: "Die Tür bleibt offen.", tr: "kapı açık kalıyor", en: "the door stays open" },
        ],
        sample:
          "SCHLUSS DER PROJEKTPRÄSENTATION — 14. NOVEMBER\n\n" +
          "Zusammenfassend lässt sich sagen, dass wir zwei der drei Ziele erreicht haben. Die Durchlaufzeit ist von elf auf sieben Tage gesunken. Die Fehlerquote liegt bei 1,8 Prozent und damit unter der Zielmarke. Das dritte Ziel, die Umstellung der Altdaten, haben wir nicht geschafft — die Abweichung beträgt zwei Monate.\n\n" +
          "Zum Ausblick. Bis zum 15. Dezember stellt Team Nord die verbleibenden Altdaten um; Frau Deniz übernimmt die Prüfung. Der nächste Zwischenbericht kommt in der zweiten Januarwoche.\n\n" +
          "Und damit zu meiner Frage an Sie, die eigentliche Frage dieses Termins: Sollen wir die zwei Monate im ersten Quartal aufholen — dann brauchen wir eine halbe Stelle mehr — oder passen wir den Projektauftrag an und verschieben den Endtermin auf Ende März?\n\n" +
          "Beides ist vertretbar, aber wir sollten es heute entscheiden. Vielen Dank für Ihre Aufmerksamkeit.",
      },
    ],
  },
];
