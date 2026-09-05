import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 15 — "Sigorta ihtilafı, kefalet, resmî itiraz, duruşma".
 *
 * Dört ders: Der strittige Fall · Für jemanden bürgen · Der Einspruch ·
 * Vor Gericht.
 *
 *   Kelime: wenngleich, gleichwohl, sich vorbehalten, der Deckungsumfang, die
 *           Obliegenheit, das Ministerium, unterbringen, das Dilemma · die
 *           Bürgschaft, der Bürge, in Haftung nehmen, sich verpflichten, das
 *           Ausfallrisiko, die Absicherung, sich revanchieren, sich auszahlen ·
 *           fristwahrend, die Begründung, nachreichen, der Bescheid, die
 *           Aufhebung, die Rechtsprechung, die Buße, die Institution ·
 *           aussagen, das Urteil, verkünden, die Kammer, die Verhandlung, die
 *           Haftanstalt, bestechen, vorbestraft
 *
 * Ünitenin çekirdeği: SÜRE HAKKIN KENDİSİNDEN ÖNCE GELİR. İtiraz süresi
 * kaçarsa gerekçe ne kadar sağlam olursa olsun dinlenmez; sigortada
 * yükümlülük ihlali tazminatı düşürür; kefil imzayı attığı anda borcun
 * yanına geçer. Üçünde de kaybedilen şey haklılık değil, hakkın kullanılma
 * penceresi.
 *
 * Bu yüzden ünitenin dilbilgisi hattı konzessiv bağlaçlar: "wenngleich",
 * "gleichwohl" — kabul ile sonucu aynı cümlede tutan yapılar. Hukuk dili
 * bunlarla yürüyor, çünkü çoğu karar "haklısınız ama" biçiminde veriliyor.
 */
export const c1U15: SkillExercise[] = [
  {
    id: "c1-u15-r1",
    level: "C1",
    skill: "reading",
    unit: 15,
    title: "Die Frist schlägt das Argument",
    genre: "Rehber yazısı",
    intro: "Resmî itiraz: neden gerekçeden önce tarih gelir?",
    gloss: [
      { de: "fristwahrend", tr: "süreyi koruyan", en: "within the deadline" },
      { de: "der Bescheid", tr: "resmî karar, tebligat", en: "official decision" },
      { de: "die Begründung", tr: "gerekçe", en: "statement of grounds" },
      { de: "nachreichen", tr: "sonradan sunmak", en: "to submit subsequently" },
      { de: "die Aufhebung", tr: "iptal", en: "annulment" },
      { de: "die Rechtsprechung", tr: "içtihat", en: "case law" },
      { de: "wenngleich", tr: "her ne kadar", en: "although" },
    ],
    minutes: 7,
    text:
      "EINSPRUCH ZUERST, BEGRÜNDUNG SPÄTER\n\n" +
      "Wer einen Bescheid für falsch hält, macht meist denselben Fehler: Er setzt sich hin und schreibt eine gute Begründung. Bis sie fertig ist, ist die Frist abgelaufen.\n\n" +
      "Das Verfahren trennt beides. Der Einspruch selbst ist ein formloser Akt und braucht drei Angaben: gegen welchen Bescheid, von wem, und dass Einspruch eingelegt wird. Ein Satz genügt. Er ist fristwahrend, und mit ihm bleibt der Fall offen.\n\n" +
      "Die Begründung kann man nachreichen. Das ist kein Trick, sondern ausdrücklich vorgesehen — die Behörde weiß, dass Unterlagen Zeit brauchen. Wer schreibt „Die Begründung reiche ich bis zum 15. nach“, hat beides: die Frist gewahrt und Zeit gewonnen.\n\n" +
      "Wenngleich das einfach klingt, scheitern viele Verfahren genau hier. Die Rechtsprechung ist bei Fristen streng, und zwar unabhängig davon, wie berechtigt der Einwand in der Sache ist. Ein verspäteter Einspruch mit hervorragender Begründung wird nicht geprüft; ein rechtzeitiger mit schwacher Begründung wird geprüft.\n\n" +
      "Zwei praktische Punkte. Erstens zählt der Eingang bei der Behörde, nicht der Poststempel — bei knappen Fristen also nicht auf die Post verlassen. Zweitens beginnt die Frist mit der Bekanntgabe, meist drei Tage nach dem Datum auf dem Bescheid; wer sie ab dem Briefdatum rechnet, verschenkt drei Tage, wer ab dem Öffnen rechnet, verliert womöglich alles.\n\n" +
      "Die Aufhebung eines Bescheids beginnt fast nie mit einem starken Argument. Sie beginnt mit einem rechtzeitigen Satz.",
    questions: [
      {
        text: "Was ist der häufigste Fehler laut Text?",
        options: [
          "Eine zu kurze Begründung",
          "Zuerst die Begründung schreiben und dabei die Frist verpassen",
          "Den falschen Bescheid angreifen",
        ],
        answer: 1,
        explain: "Süre ile gerekçe ayrı işler; ikisini birleştiren süreyi kaybediyor.",
      },
      {
        kind: "gapfill",
        text: "Die ___ reiche ich bis zum 15. nach.",
        options: [],
        answer: 0,
        accept: ["Begründung"],
        explain: "nachreichen: sonradan sunmak — usulde açıkça öngörülmüş.",
      },
      {
        text: "Was zählt für die Fristwahrung?",
        options: [
          "Der Poststempel",
          "Der Eingang bei der Behörde",
          "Das Datum des Bescheids",
        ],
        answer: 1,
        explain: "„bei knappen Fristen also nicht auf die Post verlassen“.",
      },
      {
        kind: "short_answer",
        text: "Wann beginnt die Frist laut Text?",
        options: [],
        answer: 0,
        accept: [
          "mit der Bekanntgabe, meist drei Tage nach dem Datum auf dem Bescheid",
          "mit der Bekanntgabe",
          "drei Tage nach dem Bescheiddatum",
        ],
        explain: "Mektup tarihinden saymak üç gün kaybettiriyor, açtığı günden saymak her şeyi.",
      },
      {
        kind: "short_answer",
        text: "Wie fasst der letzte Absatz die Regel zusammen?",
        options: [],
        answer: 0,
        accept: [
          "sie beginnt mit einem rechtzeitigen Satz",
          "nicht mit einem starken Argument, sondern rechtzeitig",
          "ein rechtzeitiger Satz",
        ],
        explain: "Güçlü savın önünde zamanında yazılmış tek cümle var.",
      },
    ],
  },
  {
    id: "c1-u15-r2",
    level: "C1",
    skill: "reading",
    unit: 15,
    title: "Wer für andere unterschreibt",
    genre: "Bilgilendirme",
    intro: "Kefalet: imza atıldığı anda ne değişiyor?",
    gloss: [
      { de: "die Bürgschaft", tr: "kefalet", en: "guarantee" },
      { de: "der Bürge", tr: "kefil", en: "guarantor" },
      { de: "in Haftung nehmen", tr: "sorumlu tutmak", en: "to hold liable" },
      { de: "sich verpflichten", tr: "yükümlenmek", en: "to commit oneself" },
      { de: "das Ausfallrisiko", tr: "temerrüt riski", en: "default risk" },
      { de: "die Absicherung", tr: "güvence", en: "security" },
      { de: "gleichwohl", tr: "yine de", en: "nevertheless" },
    ],
    minutes: 7,
    text:
      "EINE UNTERSCHRIFT, ZWEI SCHULDNER\n\n" +
      "Eine Bürgschaft wird meist aus Freundschaft übernommen und selten aus Berechnung. Das ist verständlich und genau deshalb riskant.\n\n" +
      "Rechtlich verpflichtet sich der Bürge, für eine fremde Schuld einzustehen. Er wird nicht Mitmieter, nicht Mitkreditnehmer — er tritt neben den Schuldner. Kommt dieser nicht auf, kann der Gläubiger den Bürgen in Haftung nehmen.\n\n" +
      "Entscheidend ist die Art. Bei der Ausfallbürgschaft muss der Gläubiger zuerst erfolglos beim Hauptschuldner vollstrecken. Bei der selbstschuldnerischen Bürgschaft entfällt diese Stufe: Der Bürge kann sofort in Anspruch genommen werden, auch wenn beim Schuldner noch etwas zu holen wäre. In Verträgen mit Banken ist fast immer die zweite Form vorgesehen — sie steht in einem Halbsatz und ändert alles.\n\n" +
      "Wenngleich die Summe begrenzt scheint, ist sie es oft nicht. Eine Bürgschaft über 20.000 Euro deckt in der Regel auch Zinsen und Kosten. Und sie endet nicht mit der Freundschaft: Wer heute für die Wohnung eines Bekannten bürgt, haftet auch in fünf Jahren, wenn man sich nicht mehr sieht.\n\n" +
      "Gleichwohl ist die Bürgschaft kein Fehler an sich. Sie ist eine Absicherung, die jemandem den Zugang zu einer Wohnung oder einem Kredit überhaupt erst eröffnet. Nur sollte sie so behandelt werden wie das, was sie ist: die Übernahme eines fremden Ausfallrisikos, in voller Höhe, für die volle Laufzeit.\n\n" +
      "Die nüchterne Frage lautet deshalb nicht „Vertraue ich dieser Person?“, sondern „Könnte ich diese Summe zahlen, wenn sie es nicht kann?“",
    questions: [
      {
        text: "Was unterscheidet die selbstschuldnerische von der Ausfallbürgschaft?",
        options: [
          "Die Höhe der Summe",
          "Dass der Gläubiger nicht erst beim Hauptschuldner vollstrecken muss",
          "Die Laufzeit",
        ],
        answer: 1,
        explain: "„entfällt diese Stufe“ — kefil doğrudan istenebiliyor.",
      },
      {
        kind: "gapfill",
        text: "Kommt der Schuldner nicht auf, kann der Gläubiger den Bürgen in ___ nehmen.",
        options: [],
        answer: 0,
        accept: ["Haftung"],
        explain: "in Haftung nehmen: sabit öbek, belirteç almaz.",
      },
      {
        text: "Was deckt eine Bürgschaft über 20.000 Euro in der Regel zusätzlich?",
        options: [
          "Nur die Hauptsumme",
          "Auch Zinsen und Kosten",
          "Nur die ersten zwei Jahre",
        ],
        answer: 1,
        explain: "„Wenngleich die Summe begrenzt scheint, ist sie es oft nicht.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frage soll man sich laut Text stellen?",
        options: [],
        answer: 0,
        accept: [
          "Könnte ich diese Summe zahlen, wenn sie es nicht kann?",
          "ob man die Summe selbst zahlen könnte",
          "nicht ob ich vertraue, sondern ob ich zahlen könnte",
        ],
        explain: "Güven sorusu yerine ödeme gücü sorusu.",
      },
      {
        text: "Der Text hält Bürgschaften grundsätzlich für einen Fehler.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Gleichwohl ist die Bürgschaft kein Fehler an sich.“",
      },
    ],
  },
  {
    id: "c1-u15-l1",
    level: "C1",
    skill: "listening",
    unit: 15,
    title: "Der strittige Versicherungsfall",
    genre: "Telefon görüşmesi",
    intro: "Sigorta ödemeyi reddediyor. Gerekçe hangi maddede saklı?",
    gloss: [
      { de: "der Deckungsumfang", tr: "teminat kapsamı", en: "scope of cover" },
      { de: "die Obliegenheit", tr: "yükümlülük", en: "duty" },
      { de: "sich vorbehalten", tr: "hakkını saklı tutmak", en: "to reserve the right" },
      { de: "wenngleich", tr: "her ne kadar", en: "although" },
      { de: "gleichwohl", tr: "yine de", en: "nevertheless" },
      { de: "das Dilemma", tr: "ikilem", en: "dilemma" },
      { de: "die Aufhebung", tr: "iptal", en: "annulment" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Pohl", text: "Sie lehnen den Wasserschaden ab. Warum?" },
      { speaker: "Sachbearbeiterin", text: "Nach unseren Unterlagen wurde der Schaden erst nach elf Tagen gemeldet." },
      { speaker: "Herr Pohl", text: "Das stimmt. Ich war im Ausland." },
      { speaker: "Sachbearbeiterin", text: "Verstehe. Wenngleich das nachvollziehbar ist, besteht eine Meldeobliegenheit von einer Woche." },
      { speaker: "Herr Pohl", text: "Also zahlen Sie gar nichts?" },
      { speaker: "Sachbearbeiterin", text: "So pauschal nicht. Eine Obliegenheitsverletzung führt zur Kürzung, nicht automatisch zum vollständigen Wegfall." },
      { speaker: "Herr Pohl", text: "Und wovon hängt die Höhe ab?" },
      { speaker: "Sachbearbeiterin", text: "Davon, ob die Verspätung den Schaden vergrößert hat. Bei einem Rohrbruch ist das häufig der Fall, bei einem einmaligen Wassereintritt oft nicht." },
      { speaker: "Herr Pohl", text: "Es war ein einmaliger Eintritt. Der Klempner kann das bestätigen." },
      { speaker: "Sachbearbeiterin", text: "Dann reichen Sie das bitte schriftlich nach. Ich halte den Vorgang so lange offen." },
      { speaker: "Herr Pohl", text: "Ich stecke in einem Dilemma: Melde ich zu früh, habe ich keine Belege, melde ich zu spät, kürzen Sie." },
      { speaker: "Sachbearbeiterin", text: "Melden Sie ohne Belege und reichen Sie sie nach. Die Frist läuft für die Meldung, nicht für den Nachweis." },
      { speaker: "Herr Pohl", text: "Und wenn Sie gleichwohl ablehnen?" },
      { speaker: "Sachbearbeiterin", text: "Dann können Sie die Aufhebung unseres Bescheids verlangen — schriftlich und mit Begründung." },
      { speaker: "Sachbearbeiterin", text: "Dann steht Ihnen der Weg zum Ombudsmann offen — kostenlos, und die Frist läuft ab unserem endgültigen Bescheid." },
      { speaker: "Herr Pohl", text: "Das wusste ich nicht." },
      { speaker: "Sachbearbeiterin", text: "Ich behalte mir die Prüfung des Deckungsumfangs vor, aber ich sage Ihnen offen: Mit dem Nachweis des Klempners stehen Ihre Chancen gut." },
    ],
    questions: [
      {
        text: "Warum wurde der Schaden zunächst abgelehnt?",
        options: [
          "Der Schaden ist nicht versichert.",
          "Die Meldung kam nach elf statt nach sieben Tagen.",
          "Es fehlt ein Nachweis.",
        ],
        answer: 1,
        explain: "Meldeobliegenheit ihlali — yükümlülük süresi kaçırılmış.",
      },
      {
        kind: "gapfill",
        text: "___ das nachvollziehbar ist, besteht eine Meldeobliegenheit von einer Woche.",
        options: [],
        answer: 0,
        accept: ["Wenngleich"],
        explain: "Konzessiv bağlaç: gerekçeyi kabul edip sonucu değiştirmiyor.",
      },
      {
        text: "Wovon hängt die Höhe der Kürzung ab?",
        options: [
          "Von der Dauer der Verspätung",
          "Davon, ob die Verspätung den Schaden vergrößert hat",
          "Von der Höhe des Schadens",
        ],
        answer: 1,
        explain: "Tek seferlik su girişinde gecikme zararı büyütmüyor.",
      },
      {
        kind: "dictation",
        text: "Görevlinin ombudsman yolunu ve süreyi anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Dann steht Ihnen der Weg zum Ombudsmann offen — kostenlos, und die Frist läuft ab unserem endgültigen Bescheid.",
          "Dann steht Ihnen der Weg zum Ombudsmann offen",
        ],
        explain: "Süre nihai karardan itibaren işliyor; bu bilgi hakkın kullanılabilirliğini belirliyor.",
      },
    ],
  },
  {
    id: "c1-u15-l2",
    level: "C1",
    skill: "listening",
    unit: 15,
    title: "Vor der Kammer",
    genre: "Duruşma",
    intro: "Duruşma sahnesi. İfade nasıl kaydediliyor, karar nasıl bildiriliyor?",
    gloss: [
      { de: "die Kammer", tr: "heyet, daire", en: "chamber" },
      { de: "die Verhandlung", tr: "duruşma", en: "hearing" },
      { de: "aussagen", tr: "ifade vermek", en: "to testify" },
      { de: "das Urteil", tr: "karar", en: "judgment" },
      { de: "verkünden", tr: "tefhim etmek", en: "to pronounce" },
      { de: "vorbestraft", tr: "sabıkalı", en: "with a criminal record" },
      { de: "bestechen", tr: "rüşvet vermek", en: "to bribe" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Vorsitzender", text: "Herr Zeuge, Sie haben bei der Polizei ausgesagt, Sie hätten den Umschlag gesehen. Bleiben Sie dabei?" },
      { speaker: "Zeuge", text: "Ich habe gesehen, dass etwas übergeben wurde. Was darin war, weiß ich nicht." },
      { speaker: "Vorsitzender", text: "Im Protokoll steht: ein Umschlag." },
      { speaker: "Zeuge", text: "Das habe ich so gesagt. Heute würde ich sagen: ein flacher Gegenstand." },
      { speaker: "Verteidigerin", text: "Herr Vorsitzender, der Zeuge korrigiert seine Aussage in einem wesentlichen Punkt." },
      { speaker: "Vorsitzender", text: "Das nehme ich auf. Herr Zeuge, warum die Änderung?" },
      { speaker: "Zeuge", text: "Bei der Vernehmung wurde nach einem Umschlag gefragt. Ich habe zugestimmt, ohne genau nachzudenken." },
      { speaker: "Staatsanwalt", text: "Der Vorwurf lautet, der Angeklagte habe den Zeugen bestechen wollen. Er ist zudem einschlägig vorbestraft; das stützt die Annahme." },
      { speaker: "Verteidigerin", text: "Eine Vorstrafe ersetzt keinen Beweis. Es geht um diesen Vorgang, nicht um die Person." },
      { speaker: "Vorsitzender", text: "Dem schließt sich die Kammer an. Wir bewerten die heutige Aussage, nicht das Register." },
      { speaker: "Vorsitzender", text: "Die Verhandlung wird vertagt. Das Urteil wird am 14. Juni verkündet." },
    ],
    questions: [
      {
        text: "Worin korrigiert der Zeuge seine Aussage?",
        options: [
          "Beim Zeitpunkt",
          "Beim Gegenstand: statt Umschlag ein flacher Gegenstand",
          "Beim Ort",
        ],
        answer: 1,
        explain: "Sorgudaki soru biçimi ifadeyi yönlendirmiş; tanık bunu bugün düzeltiyor.",
      },
      {
        kind: "gapfill",
        text: "Sie haben bei der Polizei ___, Sie hätten den Umschlag gesehen.",
        options: [],
        answer: 0,
        accept: ["ausgesagt"],
        explain: "aussagen: mahkemede ifade vermek; ardından Konjunktiv ile aktarım geliyor.",
      },
      {
        text: "Wie reagiert die Kammer auf den Hinweis zur Vorstrafe?",
        options: [
          "Sie folgt dem Staatsanwalt.",
          "Sie schließt sich der Verteidigerin an: bewertet wird die Aussage, nicht das Register.",
          "Sie vertagt deswegen.",
        ],
        answer: 1,
        explain: "„Eine Vorstrafe ersetzt keinen Beweis.“",
      },
      {
        kind: "short_answer",
        text: "Warum hatte der Zeuge ursprünglich „Umschlag“ gesagt?",
        options: [],
        answer: 0,
        accept: [
          "weil bei der Vernehmung danach gefragt wurde",
          "die Frage enthielt das Wort",
          "er hat zugestimmt, ohne nachzudenken",
        ],
        explain: "Sorunun içindeki sözcük cevaba geçiyor — ifade almanın bilinen tuzağı.",
      },
    ],
  },
  {
    id: "c1-u15-w1",
    level: "C1",
    skill: "writing",
    unit: 15,
    title: "Kabul et, sonucu koru",
    genre: "Dil bilgisi",
    intro: "wenngleich ve gleichwohl: gerekçeyi tanı, kararı değiştirme.",
    gloss: [
      { de: "wenngleich", tr: "her ne kadar", en: "although" },
      { de: "gleichwohl", tr: "yine de", en: "nevertheless" },
      { de: "sich vorbehalten", tr: "hakkını saklı tutmak", en: "to reserve" },
      { de: "fristwahrend", tr: "süreyi koruyan", en: "within the deadline" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu anlaşılır olsa da bir haftalık bildirim yükümlülüğü var.",
        answer: "Wenngleich das nachvollziehbar ist, besteht eine Meldeobliegenheit von einer Woche",
        hint: "wenngleich yan cümle kurar; fiil sona gider, ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Yine de talebi reddediyoruz.",
        answer: "Gleichwohl lehnen wir den Anspruch ab",
        hint: "gleichwohl zarf: ana cümlede birinci konumda, fiil hemen ardından.",
      },
      {
        kind: "build",
        tr: "Süreyi korumak için itiraz sunuyorum.",
        answer: "Ich lege fristwahrend Einspruch ein",
        hint: "Einspruch einlegen: ayrılabilen ön ek cümlenin sonunda.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: konzessiv bağlaç ana cümle sırasını bozmuş.",
        source: "Wenngleich die Frist abgelaufen ist, wir prüfen den Antrag trotzdem.",
        answer: "Wenngleich die Frist abgelaufen ist, prüfen wir den Antrag gleichwohl.",
        alternatives: [
          "Wenngleich die Frist abgelaufen ist, prüfen wir den Antrag gleichwohl",
          "Wenngleich die Frist abgelaufen ist, prüfen wir den Antrag trotzdem.",
        ],
        why: "Yan cümle başta olduğunda ana cümle fiille başlar; ayrıca „trotzdem“ konuşma dili, resmî yazıda „gleichwohl“ tercih edilir. İki hata bir arada duruyor ve ikisi de metnin kaydını düşürüyor.",
      },
    ],
  },
  {
    id: "c1-u15-w2",
    level: "C1",
    skill: "writing",
    unit: 15,
    title: "Fristwahrender Einspruch",
    genre: "Resmî yazı",
    intro: "Önce süreyi koru: kısa itiraz, gerekçe sonra.",
    gloss: [
      { de: "fristwahrend", tr: "süreyi koruyan", en: "within the deadline" },
      { de: "der Bescheid", tr: "resmî karar", en: "official decision" },
      { de: "nachreichen", tr: "sonradan sunmak", en: "to submit later" },
      { de: "die Aufhebung", tr: "iptal", en: "annulment" },
      { de: "die Begründung", tr: "gerekçe", en: "grounds" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki tebligata karşı süreyi koruyan bir itiraz yaz. İki bölüm olsun: (1) kısa ve eksiksiz itiraz — hangi karara, kim adına, itiraz edildiği açıkça; (2) gerekçenin ne zaman sunulacağı ve neden gecikeceği. Gerekçenin kendisini YAZMA — bu yazının işi süreyi korumak. Ton resmî ve kısa olsun.",
        stimulus:
          "TEBLİGAT\n\n" +
          "Stadt Neustadt — Amt für Wohnen\n" +
          "Bescheid vom 2. Mai 2026, Az. WO-2026-4471\n\n" +
          "Ihr Antrag auf Wohngeld wird abgelehnt. Nach den vorliegenden Unterlagen übersteigt Ihr anrechenbares Einkommen die maßgebliche Grenze.\n\n" +
          "Rechtsbehelfsbelehrung: Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden.\n\n" +
          "DURUMUN: Tebligat 6 Mayıs'ta elinde. Gelir hesabında ocak ayındaki tek seferlik bir ödeme aylık gelir sayılmış. İşverenden yazılı teyit istedin, iki hafta sürecek.",
        checklist: [
          "İtiraz hangi karara ve hangi dosya numarasına, açıkça yazıldı mı?",
          "Süreyi koruduğu belirtildi mi?",
          "Gerekçenin ne zaman geleceği söylendi mi?",
          "Gerekçenin kendisi yazılmadı, kısa tutuldu mu?",
        ],
        minWords: 70,
        phrases: [
          { de: "Hiermit lege ich fristwahrend Widerspruch ein.", tr: "işbu yazıyla süreyi koruyarak itiraz ediyorum", en: "I hereby lodge an objection within the deadline" },
          { de: "Die Begründung reiche ich bis zum … nach.", tr: "gerekçeyi …-e kadar sunacağım", en: "I will submit the grounds by …" },
          { de: "Um eine kurze Eingangsbestätigung wird gebeten.", tr: "kısa bir alındı teyidi rica olunur", en: "a brief acknowledgement of receipt is requested" },
        ],
        sample:
          "Stadt Neustadt\nAmt für Wohnen\n\n" +
          "Widerspruch gegen den Bescheid vom 2. Mai 2026, Az. WO-2026-4471\n\n" +
          "Sehr geehrte Damen und Herren,\n\n" +
          "hiermit lege ich gegen den oben genannten Bescheid, zugegangen am 6. Mai 2026, fristwahrend Widerspruch ein.\n\n" +
          "Der Widerspruch richtet sich gegen die Ablehnung meines Antrags auf Wohngeld in vollem Umfang.\n\n" +
          "Die Begründung reiche ich bis zum 5. Juni 2026 nach. Sie betrifft die Ermittlung des anrechenbaren Einkommens; hierzu habe ich eine schriftliche Bestätigung meines Arbeitgebers angefordert, deren Ausstellung nach dessen Auskunft etwa zwei Wochen in Anspruch nimmt.\n\n" +
          "Um eine kurze Eingangsbestätigung wird gebeten.\n\n" +
          "Mit freundlichen Grüßen\nM. Pohl",
      },
    ],
  },
];
