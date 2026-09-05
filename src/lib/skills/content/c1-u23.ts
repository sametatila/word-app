import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 23 — "Mizah, ince farklar, kriz dili, doğaçlama".
 *
 * Dört ders: Gibt es deutschen Humor? · Die feinen Unterschiede ·
 * Die Krisensitzung · Der Plan B.
 *
 *   Kelime: trocken, das Timing, unterschätzt, die Selbstironie, der Humor,
 *           das Ensemble, inszenieren, praktizieren · die Pünktlichkeit,
 *           sparsam, die Direktheit, befremdlich, gewöhnungsbedürftig,
 *           die Konfrontation, sich abspielen, der Spielraum ·
 *           Maßnahmen ergreifen, die Schadensbegrenzung, Ruhe bewahren,
 *           die Eskalationsstufe, in Kraft setzen, anordnen, vollziehen,
 *           die Verordnung · sich behelfen, kurzfristig, notdürftig,
 *           die Zwischenlösung, tragen, entfalten, labil, lockern
 *
 * Ünitenin çekirdeği: BASKI ALTINDA DİL DARALIR — VE BU İYİ HABER.
 * Kriz dilinde hiç kimse cümle icat etmiyor: "Maßnahmen ergreifen",
 * "in Kraft setzen", "Ruhe bewahren" hazır bloklar. Yaratıcılık değil,
 * blokları bilmek gerekiyor; bu da yabancı konuşan için avantaj.
 * Doğaçlama içerikte oluyor, biçimde değil.
 *
 * Kültür hattında Türkçe konuşan için asıl mesele tek tek farklar değil,
 * İKİSİNİN BİRLEŞİMİ: eleştiri doğrudan, övgü kısık. Yeni gelen bu yüzden
 * ağırlıklı olarak eleştiri duyuyor ve başarısız olduğu sonucunu
 * çıkarıyor — oysa aynı ekipte Alman meslektaş da aynı oranı duyuyor.
 * Ünite 22'nin "takdir iş vererek gösterilir" tespitiyle doğrudan
 * bağlantılı.
 */
export const c1U23: SkillExercise[] = [
  {
    id: "c1-u23-r1",
    level: "C1",
    skill: "reading",
    unit: 23,
    title: "Die feinen Unterschiede",
    genre: "Deneme",
    intro: "Doğrudan eleştiri, kısık övgü — ve ikisinin birleşimi.",
    gloss: [
      { de: "die Direktheit", tr: "doğrudanlık", en: "directness" },
      { de: "sparsam", tr: "cimri, ölçülü", en: "sparing" },
      { de: "befremdlich", tr: "yadırgatıcı", en: "off-putting" },
      { de: "gewöhnungsbedürftig", tr: "alışmak gereken", en: "takes getting used to" },
      { de: "die Konfrontation", tr: "yüzleşme", en: "confrontation" },
      { de: "der Spielraum", tr: "hareket alanı", en: "leeway" },
      { de: "die Pünktlichkeit", tr: "dakiklik", en: "punctuality" },
    ],
    minutes: 8,
    text:
      "ZWEI REGELN, DIE ZUSAMMEN WIRKEN\n\n" +
      "Über deutsche Direktheit ist alles gesagt worden, und meistens einzeln. Interessant wird es erst, wenn man zwei Beobachtungen nebeneinanderlegt: Kritik ist direkt, und Lob ist sparsam.\n\n" +
      "Einzeln ist keine der beiden dramatisch. Zusammen erzeugen sie für Neue eine schiefe Bilanz. Wer in den ersten Monaten fünf konkrete Korrekturen und ein knappes „passt“ hört, schließt daraus, dass er schlecht arbeitet. Dabei hört die deutsche Kollegin am Nebentisch dasselbe Verhältnis — sie deutet es nur nicht als Urteil über ihre Person.\n\n" +
      "Befremdlich wirkt das nur am Anfang, und gewöhnungsbedürftig bleibt es unterschiedlich lange. Wer Kritik als Konfrontation gelernt hat, braucht länger als jemand, der sie als Arbeitsschritt kennt.\n\n" +
      "Der Unterschied liegt nicht in der Menge der Kritik, sondern in ihrer Adresse. „Der Absatz ist unverständlich“ ist ein Satz über den Absatz. In vielen Sprachen wird derselbe Inhalt eingepackt — „vielleicht könnte man überlegen, ob …“ —, und das Auspacken ist Teil der Verständigung. Wer aus einer solchen Sprache kommt, hört im deutschen Satz eine Schärfe, die nicht drin ist. Umgekehrt hört der deutsche Zuhörer im eingepackten Satz eine Unentschiedenheit, die auch nicht drin ist.\n\n" +
      "Es gibt einen einfachen Prüfstein. Wenn Kritik direkt und trotzdem freundlich gemeint ist, folgt fast immer ein Vorschlag. „Der Absatz ist unverständlich — nimm den zweiten Satz nach vorn.“ Fehlt der Vorschlag über längere Zeit, ist es tatsächlich Unzufriedenheit; dann ist Nachfragen angebracht.\n\n" +
      "Und die Pünktlichkeit? Sie ist real, aber der Spielraum ist größer als ihr Ruf. Fünf Minuten sind pünktlich, zehn Minuten kosten eine kurze Nachricht, und niemand erwartet Entschuldigungen für den Verkehr. Was übel genommen wird, ist das schweigende Zuspätkommen — nicht die Verspätung selbst, sondern der fehlende Satz dazu.\n\n" +
      "Anders, nicht falsch: Das ist die brauchbarste Zusammenfassung, solange man sie in beide Richtungen liest.",
    questions: [
      {
        text: "Warum ist die Kombination der beiden Regeln problematisch?",
        options: [
          "Weil zu viel kritisiert wird",
          "Weil Neue eine schiefe Bilanz ziehen und sich für schlecht halten",
          "Weil Lob verboten ist",
        ],
        answer: 1,
        explain: "Alman meslektaş da aynı oranı duyuyor ama kişisel yargı olarak okumuyor.",
      },
      {
        kind: "gapfill",
        text: "Kritik ist direkt, Lob ist ___.",
        options: [],
        answer: 0,
        accept: ["sparsam"],
        explain: "İkisi birlikte yeni gelenin bilançosunu bozuyor.",
      },
      {
        text: "Welchen Prüfstein nennt der Text?",
        options: [
          "Die Lautstärke der Kritik",
          "Ob ein Vorschlag folgt",
          "Ob die Kritik schriftlich kommt",
        ],
        answer: 1,
        explain: "Uzun süre öneri gelmiyorsa gerçekten memnuniyetsizlik var.",
      },
      {
        kind: "short_answer",
        text: "Was wird bei Verspätung übel genommen?",
        options: [],
        answer: 0,
        accept: [
          "wenn man nichts sagt",
          "das schweigende Zuspätkommen, der fehlende Satz dazu",
          "nicht die Verspätung, sondern die fehlende Nachricht",
        ],
        explain: "Gecikme değil, haber vermemek.",
      },
      {
        kind: "short_answer",
        text: "Wie hört der deutsche Zuhörer den „eingepackten“ Satz?",
        options: [],
        answer: 0,
        accept: [
          "als Unentschiedenheit",
          "er hört eine Unentschiedenheit, die nicht drin ist",
          "unentschieden",
        ],
        explain: "Yanlış anlama iki yönde de işliyor.",
      },
    ],
  },
  {
    id: "c1-u23-r2",
    level: "C1",
    skill: "reading",
    unit: 23,
    title: "Die Sprache der Krise",
    genre: "Rehber yazısı",
    intro: "Baskı altında Almanca hazır bloklara geçiyor. Bu bir avantaj.",
    gloss: [
      { de: "Maßnahmen ergreifen", tr: "önlem almak", en: "to take measures" },
      { de: "in Kraft setzen", tr: "yürürlüğe koymak", en: "to put into force" },
      { de: "die Eskalationsstufe", tr: "tırmanma kademesi", en: "escalation level" },
      { de: "die Schadensbegrenzung", tr: "hasar sınırlama", en: "damage control" },
      { de: "anordnen", tr: "talimat vermek", en: "to order" },
      { de: "vollziehen", tr: "icra etmek", en: "to carry out" },
      { de: "Ruhe bewahren", tr: "sakin kalmak", en: "to keep calm" },
    ],
    minutes: 7,
    text:
      "FERTIGTEILE STATT SÄTZE\n\n" +
      "In einer Krisensitzung sagt niemand „Wir sollten vielleicht etwas unternehmen“. Es heißt: „Wir müssen umgehend Maßnahmen ergreifen.“\n\n" +
      "Das klingt schwerfällig und ist es auch. Aber diese Wendungen — Maßnahmen ergreifen, in Kraft setzen, zur Anwendung bringen, Ruhe bewahren — sind Fertigteile. Sie werden nicht gebaut, sondern eingesetzt. Genau deshalb funktionieren sie unter Druck: Niemand muss unter Stress eine Formulierung erfinden, und alle im Raum wissen sofort, welche Stufe gemeint ist.\n\n" +
      "Für Nichtmuttersprachler ist das eine gute Nachricht, auch wenn es zunächst nach mehr Vokabeln aussieht. Der kreative Teil der Sprache fällt hier weg. Wer zwanzig Wendungen kennt, spricht in einer Krisensitzung angemessen — auch mit Akzent, auch mit einfacher Satzstruktur.\n\n" +
      "Dieselben Fertigteile benennen auch die Lage: Wer von Schadensbegrenzung spricht, hat das eigentliche Ziel bereits aufgegeben, und wer eine Eskalationsstufe nennt, sagt damit, welche Regeln ab jetzt gelten.\n\n" +
      "Wichtig ist die Abstufung, denn die Wendungen tragen Ränge. „Ich schlage vor“ ist ein Vorschlag. „Ich ordne an“ ist eine Anweisung und setzt Befugnis voraus. „Ich setze den Notfallplan in Kraft“ bedeutet, dass ab jetzt ein festgelegtes Verfahren läuft und andere Zuständigkeiten greifen. Wer diese Sätze verwechselt, klingt nicht entschlossen, sondern übergriffig — angeordnet wird nur, was man auch vollziehen lassen darf.\n\n" +
      "Und der Rest? „Wir behelfen uns kurzfristig mit einer Zwischenlösung“ ist der ehrlichste Satz jeder Krise. Er sagt: Das hier ist nicht die Lösung, es trägt bis Freitag. Wer eine Zwischenlösung als Lösung verkauft, gewinnt eine Sitzung und verliert die nächste.",
    questions: [
      {
        text: "Warum funktionieren feste Wendungen laut Text unter Druck?",
        options: [
          "Weil sie kürzer sind",
          "Weil niemand eine Formulierung erfinden muss und alle die Stufe kennen",
          "Weil sie höflicher sind",
        ],
        answer: 1,
        explain: "Hazır bloklar; kurulmuyor, yerleştiriliyor.",
      },
      {
        kind: "gapfill",
        text: "Wir müssen umgehend Maßnahmen ___.",
        options: [],
        answer: 0,
        accept: ["ergreifen"],
        explain: "Funktionsverbgefüge: isim taşıyor, fiil sabit.",
      },
      {
        text: "Was bedeutet „Ich setze den Notfallplan in Kraft“?",
        options: [
          "Ein Vorschlag",
          "Ab jetzt läuft ein festgelegtes Verfahren, andere Zuständigkeiten greifen",
          "Eine Bitte um Zustimmung",
        ],
        answer: 1,
        explain: "Rütbe farkı: vorschlagen / anordnen / in Kraft setzen.",
      },
      {
        kind: "short_answer",
        text: "Warum ist das für Nichtmuttersprachler eine gute Nachricht?",
        options: [],
        answer: 0,
        accept: [
          "zwanzig Wendungen reichen aus",
          "der kreative Teil der Sprache fällt weg; zwanzig Wendungen genügen",
          "man muss nichts erfinden, nur die Wendungen kennen",
        ],
        explain: "Aksanla ve basit cümle yapısıyla da yerinde konuşulabiliyor.",
      },
      {
        kind: "short_answer",
        text: "Was riskiert, wer eine Zwischenlösung als Lösung verkauft?",
        options: [],
        answer: 0,
        accept: [
          "er verliert die nächste Sitzung",
          "er gewinnt eine Sitzung und verliert die nächste",
          "die nächste Sitzung",
        ],
        explain: "Ara çözümün dürüst adı ara çözüm.",
      },
    ],
  },
  {
    id: "c1-u23-l1",
    level: "C1",
    skill: "listening",
    unit: 23,
    title: "Trocken, nicht abwesend",
    genre: "Sohbet",
    intro: "Alman mizahı var mı? Soru yanlış kurulmuş olabilir.",
    gloss: [
      { de: "trocken", tr: "kuru (mizah)", en: "deadpan" },
      { de: "das Timing", tr: "zamanlama", en: "timing" },
      { de: "die Selbstironie", tr: "kendiyle dalga geçme", en: "self-irony" },
      { de: "unterschätzt", tr: "hafife alınmış", en: "underrated" },
      { de: "inszenieren", tr: "sahnelemek", en: "to stage" },
      { de: "praktizieren", tr: "uygulamak", en: "to practise" },
      { de: "das Ensemble", tr: "topluluk", en: "ensemble" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Pedro", text: "In meinem Heimatland heißt es, Deutsche hätten keinen Humor." },
      { speaker: "Nadja", text: "Das hören wir oft. Meistens von Leuten, die ihn nicht erkannt haben." },
      { speaker: "Pedro", text: "Und wie erkennt man ihn?" },
      { speaker: "Nadja", text: "Er ist trocken. Kein Aufbau, keine Ankündigung, kein Lachen des Erzählers. Der Satz kommt und geht weiter." },
      { speaker: "Pedro", text: "Also nichts, was jemand inszeniert." },
      { speaker: "Nadja", text: "Genau. Auf der Bühne ist es anders — da spielt ein Ensemble und baut auf. Im Alltag praktiziert man das Gegenteil davon." },
      { speaker: "Pedro", text: "Gib mir ein Beispiel." },
      { speaker: "Nadja", text: "Mein Chef letzte Woche, nach vier Stunden Sitzung: „Das war ein sehr effizienter Vormittag.“ Nichts weiter. Alle haben es gehört." },
      { speaker: "Pedro", text: "Das hätte ich für ernst gehalten." },
      { speaker: "Nadja", text: "Das ist der Punkt. Wer nicht mitlacht, wird nicht ausgeschlossen — es wird nur nicht wiederholt." },
      { speaker: "Pedro", text: "Und Selbstironie?" },
      { speaker: "Nadja", text: "Die ist hoch angesehen und wird unterschätzt. Über sich selbst zu lachen ist die sicherste Form: Man nimmt niemanden als Zielscheibe und zeigt trotzdem, dass man locker ist." },
      { speaker: "Pedro", text: "Kann ich das als Ausländer machen?" },
      { speaker: "Nadja", text: "Besser als alles andere. „Mein Dativ ist noch in der Ausbildung“ funktioniert in jedem Raum. Timing ist alles — sag es beiläufig, nicht als Vorstellungsrunde." },
    ],
    questions: [
      {
        text: "Wie beschreibt Nadja deutschen Humor?",
        options: [
          "Laut und mit Aufbau",
          "Trocken: kein Aufbau, keine Ankündigung, kein Lachen des Erzählers",
          "Nur schriftlich",
        ],
        answer: 1,
        explain: "Cümle gelir, geçer — anlatan gülmez.",
      },
      {
        kind: "gapfill",
        text: "Deutscher Humor ist ___, nicht abwesend.",
        options: [],
        answer: 0,
        accept: ["trocken"],
        explain: "Yokluk değil, işaretsizlik.",
      },
      {
        text: "Warum empfiehlt Nadja Selbstironie?",
        options: [
          "Weil sie leichter ist",
          "Weil sie niemanden zur Zielscheibe macht und trotzdem Lockerheit zeigt",
          "Weil sie typisch deutsch ist",
        ],
        answer: 1,
        explain: "Ünite 21'in hedef tahtası ölçütüyle aynı mantık.",
      },
      {
        kind: "dictation",
        text: "Nadja'nın gülmeyen kişiye ne olduğunu anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Wer nicht mitlacht, wird nicht ausgeschlossen — es wird nur nicht wiederholt.",
          "Wer nicht mitlacht, wird nicht ausgeschlossen, es wird nur nicht wiederholt",
        ],
        explain: "Dışlanma yok; sadece o şaka bir daha yapılmıyor.",
      },
    ],
  },
  {
    id: "c1-u23-l2",
    level: "C1",
    skill: "listening",
    unit: 23,
    title: "Die Krisensitzung",
    genre: "Toplantı",
    intro: "Kademeler, yetki ve ara çözüm — hepsi on dakikada.",
    gloss: [
      { de: "die Eskalationsstufe", tr: "tırmanma kademesi", en: "escalation level" },
      { de: "in Kraft setzen", tr: "yürürlüğe koymak", en: "to activate" },
      { de: "die Schadensbegrenzung", tr: "hasar sınırlama", en: "damage control" },
      { de: "sich behelfen", tr: "idare etmek", en: "to make do" },
      { de: "die Zwischenlösung", tr: "ara çözüm", en: "interim solution" },
      { de: "notdürftig", tr: "derme çatma", en: "makeshift" },
      { de: "labil", tr: "kararsız, oynak", en: "unstable" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Neubert", text: "Kurz und sachlich, bitte. Was liegt an?" },
      { speaker: "Herr Yildirim", text: "Der Zahlungsdienstleister ist seit 8:40 nicht erreichbar. Keine Bestellung geht durch." },
      { speaker: "Frau Neubert", text: "Eskalationsstufe zwei. Ich setze den Notfallplan in Kraft — ab jetzt läuft die Kommunikation über Frau Baum." },
      { speaker: "Herr Yildirim", text: "Verstanden." },
      { speaker: "Frau Neubert", text: "Was können wir sofort tun?" },
      { speaker: "Herr Yildirim", text: "Kurzfristig schlage ich Folgendes vor: Wir behelfen uns mit dem alten Anbieter. Der läuft noch, ist aber labil bei hoher Last." },
      { speaker: "Frau Baum", text: "Wie labil?" },
      { speaker: "Herr Yildirim", text: "Bis etwa vierzig Vorgänge die Minute trägt er. Darüber wird es notdürftig." },
      { speaker: "Frau Neubert", text: "Dann ist es eine Zwischenlösung, und wir nennen sie auch so — nach außen und nach innen." },
      { speaker: "Frau Baum", text: "Ich formuliere die Kundenmitteilung. Sage ich, wann es behoben ist?" },
      { speaker: "Frau Neubert", text: "Nein. Sagen Sie, was gerade geht und wann wir das nächste Mal informieren. Ein Zeitpunkt, den wir nicht halten, kostet mehr als die Störung." },
      { speaker: "Herr Yildirim", text: "Und die Schadensbegrenzung bei den offenen Warenkörben?" },
      { speaker: "Frau Neubert", text: "Bewahren Sie sie und schreiben Sie die Kunden morgen an. Heute keine Aktion mehr, die wir nicht überblicken. Ruhe bewahren heißt hier: nichts Zusätzliches kaputtmachen." },
    ],
    questions: [
      {
        text: "Was ändert sich mit „Ich setze den Notfallplan in Kraft“?",
        options: [
          "Nichts, es ist ein Vorschlag",
          "Ein festgelegtes Verfahren läuft; die Kommunikation geht über Frau Baum",
          "Die Sitzung ist beendet",
        ],
        answer: 1,
        explain: "Yürürlüğe koymak yetkiyi ve süreci değiştiriyor.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ uns mit dem alten Anbieter.",
        options: [],
        answer: 0,
        accept: ["behelfen"],
        explain: "sich behelfen mit: idare etmek — ara çözümün fiili.",
      },
      {
        text: "Warum soll Frau Baum keinen Behebungszeitpunkt nennen?",
        options: [
          "Weil es verboten ist",
          "Weil ein nicht gehaltener Zeitpunkt mehr kostet als die Störung",
          "Weil die Kunden es nicht lesen",
        ],
        answer: 1,
        explain: "Bunun yerine ne çalıştığı ve bir sonraki bilgilendirme zamanı.",
      },
      {
        kind: "short_answer",
        text: "Was heißt „Ruhe bewahren“ laut Frau Neubert konkret?",
        options: [],
        answer: 0,
        accept: [
          "nichts Zusätzliches kaputtmachen",
          "keine Aktion, die wir nicht überblicken",
          "nichts zusätzlich kaputt machen",
        ],
        explain: "Sakinlik burada duygu değil, eylem kuralı.",
      },
    ],
  },
  {
    id: "c1-u23-w1",
    level: "C1",
    skill: "writing",
    unit: 23,
    title: "Hazır bloklar",
    genre: "Dil bilgisi",
    intro: "Funktionsverbgefüge ve kademe farkı.",
    gloss: [
      { de: "Maßnahmen ergreifen", tr: "önlem almak", en: "to take measures" },
      { de: "in Kraft setzen", tr: "yürürlüğe koymak", en: "to activate" },
      { de: "sich behelfen", tr: "idare etmek", en: "to make do" },
      { de: "anordnen", tr: "talimat vermek", en: "to order" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Derhal önlem almalıyız.",
        answer: "Wir müssen umgehend Maßnahmen ergreifen",
        hint: "Maßnahmen ergreifen: sabit öbek, fiil mastar olarak sonda.",
      },
      {
        kind: "build",
        tr: "Acil durum planını yürürlüğe koyuyorum.",
        answer: "Ich setze den Notfallplan in Kraft",
        hint: "in Kraft setzen: in Kraft öbeği fiilden önce.",
      },
      {
        kind: "build",
        tr: "Kısa vadede şunu öneriyorum.",
        answer: "Kurzfristig schlage ich Folgendes vor",
        hint: "Zarf birinci konumda; vorschlagen ayrılıyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: kriz toplantısında kademe ve yetki karışmış.",
        source: "Ich ordne an, dass wir vielleicht mal überlegen sollten, ob wir eventuell etwas unternehmen.",
        answer: "Kurzfristig schlage ich Folgendes vor: Wir behelfen uns mit dem alten Anbieter.",
        alternatives: [
          "Kurzfristig schlage ich Folgendes vor: Wir behelfen uns mit dem alten Anbieter",
          "Ich schlage vor, dass wir uns kurzfristig mit dem alten Anbieter behelfen.",
        ],
        why: "„Ich ordne an“ talimat kipidir ve yetki gerektirir; ardından gelen „vielleicht … eventuell“ ise öneriden bile zayıf. Kip ile içerik birbirini iptal ediyor, konuşan hem yetkisini aşmış hem hiçbir şey söylememiş oluyor. Kriz dilinde kademe seçilir: vorschlagen, anordnen, in Kraft setzen.",
      },
    ],
  },
  {
    id: "c1-u23-w2",
    level: "C1",
    skill: "writing",
    unit: 23,
    title: "Kriz durumu bildirimi",
    genre: "Kurum yazısı",
    intro: "Ara çözümü ara çözüm diye yaz, tarih verme.",
    gloss: [
      { de: "die Zwischenlösung", tr: "ara çözüm", en: "interim solution" },
      { de: "die Schadensbegrenzung", tr: "hasar sınırlama", en: "damage control" },
      { de: "notdürftig", tr: "derme çatma", en: "makeshift" },
      { de: "Ruhe bewahren", tr: "sakin kalmak", en: "to keep calm" },
      { de: "der Spielraum", tr: "hareket alanı", en: "leeway" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Kriz toplantısının kararlarını iki metne dök. (A) Ekip için durum bildirimi: kademe, yetki, ara çözüm ve sınırı, bugün yapılmayacaklar. (B) Müşteri bildirimi: neyin çalıştığı, neyin çalışmadığı, bir sonraki bilgilendirme zamanı. Kural: ÇÖZÜM TARİHİ VERME, ve ara çözümü iki metinde de ara çözüm diye adlandır. Hazır blokları kullan.",
        stimulus:
          "TOPLANTI KARARLARI\n\n" +
          "· Ödeme sağlayıcısı 8:40'tan beri erişilemiyor. Sipariş geçmiyor.\n" +
          "· Eskalasyon kademesi 2. Acil durum planı yürürlükte; iletişim Frau Baum üzerinden.\n" +
          "· Ara çözüm: eski sağlayıcı devrede. Dakikada ~40 işleme kadar taşıyor, üstünde oynak.\n" +
          "· Açık sepetler saklanacak, müşterilere YARIN yazılacak.\n" +
          "· Bugün gözden kaçabilecek başka aksiyon alınmayacak.\n" +
          "· Bir sonraki bilgilendirme: bugün 16:00.",
        checklist: [
          "Çözüm tarihi verilmedi, bir sonraki bilgilendirme zamanı verildi mi?",
          "Ara çözüm iki metinde de ara çözüm olarak adlandırıldı mı?",
          "İç metinde kademe ve yetki açık mı?",
          "Müşteri metninde neyin çalıştığı da yazıldı mı?",
        ],
        minWords: 120,
        phrases: [
          { de: "Wir haben umgehend Maßnahmen ergriffen.", tr: "derhal önlem aldık", en: "we have taken immediate measures" },
          { de: "Es handelt sich um eine Zwischenlösung.", tr: "bu bir ara çözümdür", en: "this is an interim solution" },
          { de: "Wir informieren Sie erneut um 16:00 Uhr.", tr: "saat 16:00'da yeniden bilgilendireceğiz", en: "we will update you again at 16:00" },
        ],
        sample:
          "A — INTERN\n\n" +
          "Status Zahlungsausfall, Stand 10:15\n\n" +
          "Der Zahlungsdienstleister ist seit 8:40 nicht erreichbar. Eskalationsstufe zwei, der Notfallplan ist in Kraft. Die gesamte Kommunikation nach außen läuft ab sofort über Frau Baum.\n\n" +
          "Wir behelfen uns mit dem alten Anbieter. Es handelt sich um eine Zwischenlösung: Sie trägt bis etwa vierzig Vorgänge pro Minute, darüber wird sie labil. Bitte keine Lasttests, keine Kampagnen, keine Nachbuchungen heute.\n\n" +
          "Offene Warenkörbe werden gesichert, die Kundinnen und Kunden schreiben wir morgen an. Weitere Aktionen finden heute nicht statt — was wir jetzt nicht überblicken, machen wir nicht.\n\n" +
          "Nächste Lagebesprechung: 16:00.\n\n" +
          "B — AN DIE KUNDEN\n\n" +
          "Betreff: Störung beim Bezahlvorgang\n\n" +
          "Sehr geehrte Kundinnen und Kunden,\n\n" +
          "seit heute Morgen ist der Bezahlvorgang in unserem Shop gestört. Wir haben umgehend Maßnahmen ergriffen und arbeiten mit einer Zwischenlösung, über die Bestellungen wieder möglich sind.\n\n" +
          "Was funktioniert: Sie können Artikel auswählen, in den Warenkorb legen und bestellen. Was nicht sicher funktioniert: Bezahlvorgänge zu Stoßzeiten können abbrechen. Bereits gefüllte Warenkörbe bleiben erhalten.\n\n" +
          "Einen Zeitpunkt für die vollständige Behebung nennen wir bewusst nicht, solange wir ihn nicht zusagen können. Wir informieren Sie erneut um 16:00 Uhr.\n\n" +
          "Mit freundlichen Grüßen\nIhr Kundenservice",
      },
    ],
  },
];
