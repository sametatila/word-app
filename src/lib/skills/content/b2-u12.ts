import type { SkillExercise } from "../types";

/**
 * B2 · Ünite 12 — "Sonuç kadar yöntem".
 *
 * Dört ders: Das Küchenexperiment · Meine Daten gehören mir ·
 * Die bedrohte Vielfalt · Der Durchbruch. Dördü de bilginin nasıl üretildiğiyle
 * ilgileniyor: indem yöntemi anlatır, kipli edilgen sınırı çizer, ortaç sıfatı
 * durumu paketler, edilgen Perfekt ise neyin denenmiş olduğunu bildirir.
 *
 *   Ünite 12: das Messgerät, die Toleranz, die Fehlerquote, das Molekül,
 *             die Zelle, vermessen, betrachten, erfassen · der Datenschutz,
 *             die Datensicherheit, der Datenmissbrauch, die Berechtigung,
 *             das Nutzerkonto, der Zugriff, verschlüsseln, unbefugt ·
 *             der Klimawandel, das Ökosystem, die Artenvielfalt,
 *             der Lebensraum, das Aussterben, die Dürre, die Nachhaltigkeit,
 *             bedrohen · der Durchbruch, das Arzneimittel, der Wirkstoff,
 *             die Dosierung, die Nebenwirkung, die Früherkennung, zulassen,
 *             lindern
 *   Kalıplar: …, indem man … · Dadurch, dass … · dürfen nicht … werden ·
 *             Dem können Sie widersprechen · die bedrohten Arten ·
 *             ist … erprobt worden
 *
 * indem Türkçedeki "-erek/-arak" ulacının karşılığıdır, ama Almanca onu yan
 * cümleye çevirir: fiil sona gider ve özne yeniden söylenir. Bu ünitenin en
 * çok hata alınan noktası orası.
 */
export const b2U12: SkillExercise[] = [
  {
    id: "b2-u12-r1",
    level: "B2",
    skill: "reading",
    unit: 12,
    title: "Was mit Ihren Daten geschieht",
    genre: "Bilgilendirme metni",
    intro: "Bir kurumun kullanıcılarına gönderdiği bilgilendirme. Neyin yasak olduğuna dikkat et.",
    gloss: [
      { de: "der Datenschutz", tr: "veri koruma", en: "data protection" },
      { de: "die Datensicherheit", tr: "veri güvenliği", en: "data security" },
      { de: "der Datenmissbrauch", tr: "veri kötüye kullanımı", en: "data misuse" },
      { de: "die Berechtigung", tr: "yetki", en: "authorisation" },
      { de: "das Nutzerkonto", tr: "kullanıcı hesabı", en: "user account" },
      { de: "der Zugriff", tr: "erişim", en: "access" },
      { de: "verschlüsseln", tr: "şifrelemek", en: "to encrypt" },
      { de: "unbefugt", tr: "yetkisiz", en: "unauthorised" },
    ],
    minutes: 6,
    text:
      "WAS MIT IHREN DATEN GESCHIEHT — EINE SEITE, KEIN JURISTENDEUTSCH\n\n" +
      "Datenschutz und Datensicherheit sind zwei verschiedene Dinge. Datenschutz regelt, was mit Ihren Daten gemacht werden darf. Datensicherheit sorgt dafür, dass niemand Unbefugtes an sie herankommt. Man kann das eine gut machen und das andere schlecht.\n\n" +
      "Was wir speichern: Name, Adresse, Vertragsnummer, Zahlungen. Was wir nicht speichern: die Zeiten, zu denen Sie sich anmelden, und die Seiten, die Sie danach ansehen. Beides bräuchten wir nur für Werbung, und die machen wir nicht.\n\n" +
      "Wer darf zugreifen? Zugriff hat, wer eine Berechtigung für den jeweiligen Vorgang besitzt — im Regelfall vier Personen im Kundenservice. Jeder Zugriff wird protokolliert. Ihre Daten dürfen ohne Ihre Zustimmung nicht an Dritte weitergegeben werden, auch nicht an verbundene Unternehmen.\n\n" +
      "Wie sichern wir? Die Verbindung zum Nutzerkonto ist verschlüsselt, und die Zahlungsdaten liegen ebenfalls verschlüsselt in einem getrennten System. Das schützt nicht gegen alles; gegen den häufigsten Fall von Datenmissbrauch — ein weitergegebenes Passwort — hilft keine Technik.\n\n" +
      "Was Sie tun können: Sie dürfen jederzeit erfahren, welche Daten wir über Sie führen. Sie können falsche Angaben berichtigen lassen und der Nutzung für Statistikzwecke widersprechen. Dem können Sie formlos widersprechen, eine E-Mail genügt; ein Grund muss nicht angegeben werden.\n\n" +
      "Und wenn doch etwas passiert? Dann erfahren Sie es von uns, nicht aus der Zeitung. Das ist keine Freundlichkeit, sondern Pflicht — aber wir halten sie auch dann ein, wenn es unangenehm ist.",
    questions: [
      {
        text: "Was ist der Unterschied zwischen Datenschutz und Datensicherheit?",
        options: [
          "Es ist dasselbe mit zwei Namen.",
          "Datenschutz regelt, was erlaubt ist; Datensicherheit hält Unbefugte fern.",
          "Datenschutz gilt für Firmen, Datensicherheit für Privatpersonen.",
        ],
        answer: 1,
        explain: "„Datenschutz regelt, was mit Ihren Daten gemacht werden darf. Datensicherheit sorgt dafür, dass niemand Unbefugtes an sie herankommt.“",
      },
      {
        kind: "gapfill",
        text: "Ihre Daten ___ ohne Ihre Zustimmung nicht an Dritte weitergegeben werden.",
        options: [],
        answer: 0,
        accept: ["dürfen"],
        explain: "Kipli edilgen ile yasak: dürfen nicht … werden.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Personen haben im Regelfall Zugriff?",
        options: [],
        answer: 0,
        accept: ["vier", "vier Personen", "4 Personen"],
        explain: "„…im Regelfall vier Personen im Kundenservice.“",
      },
      {
        text: "Wogegen hilft laut Text keine Technik?",
        options: [
          "gegen ein weitergegebenes Passwort",
          "gegen unverschlüsselte Verbindungen",
          "gegen fehlende Berechtigungen",
        ],
        answer: 0,
        explain: "„…gegen den häufigsten Fall von Datenmissbrauch — ein weitergegebenes Passwort — hilft keine Technik.“",
      },
      {
        text: "Für einen Widerspruch muss ein Grund angegeben werden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „…eine E-Mail genügt; ein Grund muss nicht angegeben werden.“",
      },
    ],
  },

  {
    id: "b2-u12-r2",
    level: "B2",
    skill: "reading",
    unit: 12,
    title: "Die bedrohte Vielfalt",
    genre: "Bilim yazısı",
    intro: "Tür çeşitliliği üzerine bir yazı. Sıfat öbeklerinin ne kadar bilgi taşıdığına dikkat et.",
    gloss: [
      { de: "der Klimawandel", tr: "iklim değişikliği", en: "climate change" },
      { de: "das Ökosystem", tr: "ekosistem", en: "ecosystem" },
      { de: "die Artenvielfalt", tr: "tür çeşitliliği", en: "biodiversity" },
      { de: "der Lebensraum", tr: "yaşam alanı", en: "habitat" },
      { de: "das Aussterben", tr: "yok oluş", en: "extinction" },
      { de: "die Dürre", tr: "kuraklık", en: "drought" },
      { de: "die Nachhaltigkeit", tr: "sürdürülebilirlik", en: "sustainability" },
      { de: "bedrohen", tr: "tehdit etmek", en: "to threaten" },
    ],
    minutes: 6,
    text:
      "DIE BEDROHTE VIELFALT\n\n" +
      "Über den Klimawandel wird viel gesprochen, über die Artenvielfalt zu wenig. Dabei hängen beide zusammen — und der zweite Verlust ist der endgültigere: Ein wärmeres Jahr kann kühler werden, eine ausgestorbene Art kommt nicht zurück.\n\n" +
      "Was bedroht die Arten? Nicht in erster Linie die Temperatur, sondern der veränderte Lebensraum. Ein durch Straßen zerschnittenes Waldstück bleibt Wald, aber es ist für viele Tiere kein zusammenhängender Lebensraum mehr. Die dort lebenden Populationen werden klein, und kleine Populationen sterben aus, ohne dass jemand sie gejagt hätte.\n\n" +
      "Dazu kommt die Dürre. Mehrere trockene Sommer hintereinander verändern ein Ökosystem stärker als ein einzelner Rekordsommer, weil den Bäumen die Erholungszeit fehlt. Die in den letzten Jahren beobachteten Schäden in deutschen Wäldern gehen fast alle auf diese Kette zurück: Trockenheit, geschwächte Bäume, dann Insekten.\n\n" +
      "Was hilft? Vor allem Verbindungen. Zwei kleine, miteinander verbundene Schutzgebiete tragen mehr Arten als zwei gleich große getrennte. Das ist keine neue Erkenntnis, aber sie ist teuer, weil sie Flächen zwischen den Gebieten braucht — genau dort, wo gebaut wird.\n\n" +
      "Und Nachhaltigkeit? Das Wort steht inzwischen auf jeder Packung. Ursprünglich stammt es aus der Forstwirtschaft und bedeutete etwas sehr Konkretes: nicht mehr Holz entnehmen, als nachwächst. In dieser Strenge gelesen ist es ein nützlicher Begriff — und ein unbequemer.",
    questions: [
      {
        text: "Warum ist der Verlust von Arten endgültiger als ein warmes Jahr?",
        options: [
          "weil eine ausgestorbene Art nicht zurückkommt",
          "weil das Klima sich nie ändert",
          "weil Arten schneller reagieren",
        ],
        answer: 0,
        explain: "„Ein wärmeres Jahr kann kühler werden, eine ausgestorbene Art kommt nicht zurück.“",
      },
      {
        kind: "gapfill",
        text: "Die dort ___ Populationen werden klein.",
        options: [],
        answer: 0,
        accept: ["lebenden"],
        explain: "Ortaç I sıfatı: 'die Populationen, die dort leben' — süren, etken.",
      },
      {
        kind: "short_answer",
        text: "Was bedroht die Arten laut Text in erster Linie?",
        options: [],
        answer: 0,
        accept: ["der veränderte Lebensraum", "der Lebensraum", "die Zerschneidung"],
        explain: "„Nicht in erster Linie die Temperatur, sondern der veränderte Lebensraum.“",
      },
      {
        text: "Was tragen mehr Arten?",
        options: [
          "zwei getrennte Schutzgebiete",
          "zwei kleine, miteinander verbundene Schutzgebiete",
          "ein einzelnes großes Gebiet ohne Umgebung",
        ],
        answer: 1,
        explain: "„Zwei kleine, miteinander verbundene Schutzgebiete tragen mehr Arten als zwei gleich große getrennte.“",
      },
      {
        text: "„Nachhaltigkeit“ stammt ursprünglich aus der Werbung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ursprünglich stammt es aus der Forstwirtschaft.“",
      },
    ],
  },

  {
    id: "b2-u12-l1",
    level: "B2",
    skill: "listening",
    unit: 12,
    title: "Wie habt ihr das gemessen?",
    genre: "Diyalog",
    intro: "Bir öğrenci deneyinin nasıl yapıldığı anlatılıyor. Yöntem cümlelerine dikkat et.",
    gloss: [
      { de: "das Messgerät", tr: "ölçüm aleti", en: "measuring device" },
      { de: "die Toleranz", tr: "tolerans", en: "tolerance" },
      { de: "die Fehlerquote", tr: "hata oranı", en: "error rate" },
      { de: "das Molekül", tr: "molekül", en: "molecule" },
      { de: "die Zelle", tr: "hücre", en: "cell" },
      { de: "vermessen", tr: "ölçüm yapmak", en: "to measure up" },
      { de: "betrachten", tr: "incelemek", en: "to examine" },
      { de: "erfassen", tr: "kaydetmek", en: "to record" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Öğretmen", text: "Erklärt mir bitte, wie ihr das gemessen habt. Nicht das Ergebnis, den Weg." },
      { speaker: "Lin", text: "Wir haben die Proben vermessen, indem wir jede dreimal gewogen haben." },
      { speaker: "Öğretmen", text: "Warum dreimal?" },
      { speaker: "Lin", text: "Weil das Messgerät eine Toleranz von zwei Milligramm hat. Einmal sagt wenig." },
      { speaker: "Öğretmen", text: "Gut. Und wie habt ihr die Werte erfasst?" },
      { speaker: "Ben", text: "Direkt in die Tabelle, nicht erst auf Papier. Dadurch, dass wir gleich eingetragen haben, gab es keine Übertragungsfehler." },
      { speaker: "Öğretmen", text: "Und eure Fehlerquote?" },
      { speaker: "Ben", text: "Bei knapp vier Prozent. Zwei Proben mussten wir wiederholen." },
      { speaker: "Öğretmen", text: "Was habt ihr unter dem Mikroskop betrachtet?" },
      { speaker: "Lin", text: "Die Zellen der zweiten Probe. Einzelne Moleküle sieht man damit natürlich nicht." },
      { speaker: "Öğretmen", text: "Richtig, das ist eine andere Größenordnung. Was würdet ihr nächstes Mal ändern?" },
      { speaker: "Ben", text: "Die Reihenfolge. Wir haben zuerst gewogen und dann sortiert; umgekehrt wäre schneller." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Lin'in ölçümü nasıl yaptıklarını anlattığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Wir haben die Proben vermessen, indem wir jede dreimal gewogen haben."],
        explain: "indem yöntemi bildirir ve yan cümle kurar: özne tekrarlanır, fiil sona gider.",
      },
      {
        text: "Warum wurde jede Probe dreimal gewogen?",
        options: [
          "weil das Messgerät eine Toleranz von zwei Milligramm hat",
          "weil die Proben zu klein waren",
          "weil die Tabelle drei Spalten hat",
        ],
        answer: 0,
        explain: "„Weil das Messgerät eine Toleranz von zwei Milligramm hat. Einmal sagt wenig.“",
      },
      {
        kind: "short_answer",
        text: "Wie hoch war die Fehlerquote?",
        options: [],
        answer: 0,
        accept: ["knapp vier Prozent", "vier Prozent", "4 Prozent"],
        explain: "„Bei knapp vier Prozent. Zwei Proben mussten wir wiederholen.“",
      },
      {
        text: "Wodurch wurden Übertragungsfehler vermieden?",
        options: [
          "durch das direkte Eintragen in die Tabelle",
          "durch das Notieren auf Papier",
          "durch eine zweite Person",
        ],
        answer: 0,
        explain: "„Dadurch, dass wir gleich eingetragen haben, gab es keine Übertragungsfehler.“",
      },
      {
        text: "Unter dem Mikroskop wurden einzelne Moleküle betrachtet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Einzelne Moleküle sieht man damit natürlich nicht.“",
      },
    ],
  },

  {
    id: "b2-u12-l2",
    level: "B2",
    skill: "listening",
    unit: 12,
    title: "Ist das wirklich ein Durchbruch?",
    genre: "Diyalog",
    intro: "Bir eczacı hastaya yeni bir ilacı anlatıyor. Neyin denenmiş olduğuna dikkat et.",
    gloss: [
      { de: "der Durchbruch", tr: "atılım", en: "breakthrough" },
      { de: "das Arzneimittel", tr: "ilaç", en: "medicine" },
      { de: "der Wirkstoff", tr: "etken madde", en: "active ingredient" },
      { de: "die Dosierung", tr: "dozaj", en: "dosage" },
      { de: "die Nebenwirkung", tr: "yan etki", en: "side effect" },
      { de: "die Früherkennung", tr: "erken teşhis", en: "early detection" },
      { de: "zulassen", tr: "ruhsatlandırmak", en: "to approve" },
      { de: "lindern", tr: "hafifletmek", en: "to relieve" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Hasta", text: "In der Zeitung stand, das sei ein Durchbruch. Stimmt das?" },
      { speaker: "Eczacı", text: "Es ist ein Fortschritt. Ein Durchbruch wäre etwas anderes." },
      { speaker: "Hasta", text: "Was heißt das konkret?" },
      { speaker: "Eczacı", text: "Der Wirkstoff ist an gut zweitausend Patienten erprobt worden. Das ist solide, aber nicht riesig." },
      { speaker: "Hasta", text: "Und zugelassen ist es?" },
      { speaker: "Eczacı", text: "Seit April, ja. Zugelassen worden ist es allerdings nur für eine bestimmte Gruppe." },
      { speaker: "Hasta", text: "Gehöre ich dazu?" },
      { speaker: "Eczacı", text: "Das entscheidet Ihre Ärztin. Die Dosierung hängt außerdem am Gewicht." },
      { speaker: "Hasta", text: "Und die Nebenwirkungen? Meine Nachbarin sagt, es sei harmlos." },
      { speaker: "Eczacı", text: "Harmlos ist kein Arzneimittel. Untersucht worden sind vor allem Magenbeschwerden, bei etwa einem von zwölf." },
      { speaker: "Hasta", text: "Hilft es denn gegen die Schmerzen?" },
      { speaker: "Eczacı", text: "Es lindert sie, es beseitigt sie nicht. Wer mehr verspricht, verkauft etwas." },
      { speaker: "Hasta", text: "Und diese Früherkennung, von der alle reden?" },
      { speaker: "Eczacı", text: "Das ist ein anderes Thema und ehrlich gesagt das wichtigere." },
    ],
    questions: [
      {
        kind: "dictation",
        text: "Eczacının etken maddenin kaç hastada denendiğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Der Wirkstoff ist an gut zweitausend Patienten erprobt worden."],
        explain: "Edilgen Perfekt: ist … erprobt worden. Denemenin bitmiş olduğunu bildirir.",
      },
      {
        text: "Für wen ist das Mittel zugelassen?",
        options: [
          "für alle Patienten",
          "nur für eine bestimmte Gruppe",
          "noch für niemanden",
        ],
        answer: 1,
        explain: "„Zugelassen worden ist es allerdings nur für eine bestimmte Gruppe.“",
      },
      {
        kind: "short_answer",
        text: "Bei wie vielen treten Magenbeschwerden auf?",
        options: [],
        answer: 0,
        accept: ["bei einem von zwölf", "einer von zwölf", "etwa jeder zwölfte"],
        explain: "„Untersucht worden sind vor allem Magenbeschwerden, bei etwa einem von zwölf.“",
      },
      {
        text: "Was sagt der Apotheker über die Schmerzen?",
        options: [
          "Das Mittel beseitigt sie.",
          "Das Mittel lindert sie, beseitigt sie aber nicht.",
          "Das Mittel wirkt gar nicht.",
        ],
        answer: 1,
        explain: "„Es lindert sie, es beseitigt sie nicht. Wer mehr verspricht, verkauft etwas.“",
      },
      {
        text: "Der Apotheker nennt das Mittel harmlos.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Harmlos ist kein Arzneimittel.“",
      },
    ],
  },

  {
    id: "b2-u12-w1",
    level: "B2",
    skill: "writing",
    unit: 12,
    title: "Yöntem, sınır, sonuç",
    genre: "Cümle kurma",
    intro: "indem yöntemi verir, dürfen nicht sınırı çizer, edilgen Perfekt sonucu bildirir.",
    gloss: [
      { de: "vermessen", tr: "ölçüm yapmak", en: "to measure up" },
      { de: "der Zugriff", tr: "erişim", en: "access" },
      { de: "bedrohen", tr: "tehdit etmek", en: "to threaten" },
      { de: "zulassen", tr: "ruhsatlandırmak", en: "to approve" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Numuneleri her birini üç kez tartarak ölçtük.",
        answer: "Wir haben die Proben vermessen, indem wir jede dreimal gewogen haben",
        hint: "indem yan cümle kurar: özne tekrarlanır, çekimli fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Verileriniz üçüncü kişilere verilemez.",
        answer: "Ihre Daten dürfen nicht an Dritte weitergegeben werden",
        hint: "Kipli edilgen ile yasak: dürfen nicht + ortaç + werden.",
      },
      {
        kind: "build",
        tr: "Tehdit altındaki türler koruma alanlarına muhtaç.",
        answer: "Die bedrohten Arten brauchen Schutzgebiete",
        hint: "Ortaç II sıfatı edilgen anlam taşır: tehdit edilen türler.",
      },
      {
        kind: "build",
        tr: "İlaç nisandan beri ruhsatlı.",
        answer: "Das Arzneimittel ist seit April zugelassen",
        hint: "Durum edilgeni: sonuç sürüyor, işlem değil.",
      },
      {
        kind: "rewrite",
        prompt: "Ulaç yapısını indem'li yan cümleye çevir.",
        source: "Durch dreimaliges Wiegen haben wir die Toleranz ausgeglichen.",
        answer: "Wir haben die Toleranz ausgeglichen, indem wir dreimal gewogen haben.",
        alternatives: ["Wir haben die Toleranz ausgeglichen, indem wir dreimal gewogen haben"],
        why: "Almanca adlaştırılmış bir yöntem belirtecini -durch dreimaliges Wiegen- indem'li yan cümleye çevirebilir; bu biçim daha okunur ve kimin ne yaptığını söyler. Türkçedeki '-erek' ulacı özneyi tekrarlamaz, Almanca ise yan cümlede özneyi zorunlu kılar.",
      },
    ],
  },

  {
    id: "b2-u12-w2",
    level: "B2",
    skill: "writing",
    unit: 12,
    title: "Der Methodenteil",
    genre: "Yöntem açıklaması",
    intro: "Bir sonuca nasıl vardığını anlat — sonucu değil, yolu.",
    gloss: [
      { de: "erfassen", tr: "kaydetmek", en: "to record" },
      { de: "die Fehlerquote", tr: "hata oranı", en: "error rate" },
      { de: "betrachten", tr: "incelemek", en: "to examine" },
      { de: "die Toleranz", tr: "tolerans", en: "tolerance" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bir şeyi nasıl öğrendiğini ya da ölçtüğünü anlat: küçük bir deney, bir hesap, bir karşılaştırma, bir anket — gerçek ya da hayalî olabilir. Sonucu değil YOLU yaz. En az iki kez indem ya da dadurch, dass kullan. Sonda yöntemin sınırını da söyle: neyi ölçemedin, hangi hata payı var? Sayı verirsen nereden geldiğini belirt.",
        checklist: [
          "Yöntem adım adım anlatılmış mı?",
          "En az iki indem ya da dadurch, dass var mı?",
          "Verilerin nasıl kaydedildiği söylendi mi?",
          "Sonda yöntemin sınırı belirtilmiş mi?",
        ],
        minWords: 80,
        phrases: [
          { de: "…, indem wir jede Probe dreimal gewogen haben", tr: "her numuneyi üç kez tartarak", en: "by weighing each sample three times" },
          { de: "Dadurch, dass wir gleich eingetragen haben, …", tr: "hemen kaydettiğimiz için …", en: "because we entered it right away, …" },
          { de: "Nicht erfasst wurde …", tr: "… kaydedilmedi", en: "… was not recorded" },
        ],
        sample:
          "WIE WIR DEN VERBRAUCH GEMESSEN HABEN\n\n" +
          "Gemessen wurde vier Wochen lang in zwei Wohnungen desselben Hauses, gleicher Grundriss, gleiche Himmelsrichtung.\n\n" +
          "Wir haben den Verbrauch erfasst, indem wir jeden Abend um 20 Uhr den Zählerstand abgelesen und sofort in eine gemeinsame Tabelle eingetragen haben. Dadurch, dass immer dieselbe Person abgelesen hat, sind Ablesefehler zumindest gleichmäßig verteilt. Die Außentemperatur haben wir aus den Werten der Wetterstation im Nachbarort übernommen, weil wir kein eigenes Messgerät hatten.\n\n" +
          "Betrachtet wurden am Ende nur volle Tage; drei Tage mit Besuch haben wir herausgenommen und das auch vermerkt. Die Fehlerquote schätzen wir auf etwa fünf Prozent, vor allem wegen der Toleranz beim Ablesen.\n\n" +
          "Was wir nicht messen konnten: das Lüftungsverhalten. Wer wie oft und wie lange gelüftet hat, wurde nicht erfasst — und genau das erklärt vermutlich einen Teil des Unterschieds, den wir gefunden haben.",
      },
    ],
  },
];
