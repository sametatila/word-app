import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 5 — "Ölçülülük, sohbet, telefon tonu, parçacık birleşimi".
 *
 * Dört ders: Nicht schlecht! · Small Talk mit Feinschliff · Der Ton am Telefon ·
 * Der Partikel-Parcours.
 *
 *   Kelime: die Untertreibung, das Lob, zurückhaltend, anerkennend,
 *           übertreiben, unbestreitbar, schroff, die Abneigung · die Plauderei,
 *           unverfänglich, anknüpfen, die Floskel, auflockern, zumal, hingegen,
 *           die Sackgasse · durchstellen, der Rückruf, die Leitung,
 *           hinterlassen, umgehend, einholen, vorenthalten, eindringlich ·
 *           die Kombination, die Nuance, die Betonung, einsetzen, treffsicher,
 *           deuten, mitnichten, vielmehr
 *
 * Ünitenin çekirdeği ÖLÇEK KAYMASI. Almanca övgüde eksiltir: "Nicht schlecht"
 * bir Türkçe konuşan için soğuk, bir Alman için gerçek övgüdür. Aynı kayma
 * ters yönde de var — Türkçedeki nezaket abartısı ("çok teşekkür ederim,
 * rica etsem…") Almancada abartı olarak duyulur.
 *
 * Bu yüzden egzersizler sözcüğün anlamını değil ETKİSİNİ ölçüyor: bu cümle
 * kimin kulağında ne kadar sıcak? Telefon dersi aynı sorunun yazılı olmayan
 * hâli — ses tonu yoksa nezaket dilek kipiyle taşınmak zorunda.
 */
export const c1U05: SkillExercise[] = [
  {
    id: "c1-u05-r1",
    level: "C1",
    skill: "reading",
    unit: 5,
    title: "Warum „nicht schlecht“ ein Lob ist",
    genre: "Dergi yazısı",
    intro: "Alman övgü ölçeği üstüne bir yazı. Yabancı kulakta neden soğuk duyuluyor?",
    gloss: [
      { de: "die Untertreibung", tr: "eksiltme, az söyleme", en: "understatement" },
      { de: "das Lob", tr: "övgü", en: "praise" },
      { de: "zurückhaltend", tr: "çekingen, ölçülü", en: "reserved" },
      { de: "anerkennend", tr: "takdir edici", en: "appreciative" },
      { de: "übertreiben", tr: "abartmak", en: "to exaggerate" },
      { de: "unbestreitbar", tr: "yadsınamaz", en: "indisputable" },
      { de: "schroff", tr: "ters, sert", en: "brusque" },
      { de: "die Abneigung", tr: "hoşlanmama", en: "aversion" },
    ],
    minutes: 7,
    text:
      "„NICHT SCHLECHT“ — EIN LOB, DAS NICHT WIE EINES KLINGT\n\n" +
      "Eine internationale Studie ließ Teilnehmende dieselbe Arbeitsprobe bewerten. Die deutschen Bewertungen fielen im Schnitt eine ganze Stufe niedriger aus als die amerikanischen — bei identischer Einschätzung der Qualität.\n\n" +
      "Der Grund ist keine Abneigung gegen Lob, sondern eine andere Skala. Wo in einem Kontext „großartig“ die Mitte markiert, markiert im deutschen Berufsleben „nicht schlecht“ die Mitte. „Sehr ordentlich“ liegt darüber. „Da ist noch Luft nach oben“ ist keine Kritik am Charakter, sondern eine Aussage über Prozentpunkte.\n\n" +
      "Für Zugereiste ist das doppelt heikel. Sie hören ein zurückhaltendes Lob als Kritik — und formulieren selbst so, wie sie es gewohnt sind. Ein begeistertes „Das ist fantastisch!“ wirkt dann nicht warm, sondern unpräzise. Wer übertreibt, verliert die Möglichkeit zu steigern: Wenn alles fantastisch ist, wie klingt das wirklich Gute?\n\n" +
      "Unbestreitbar hat die Sache eine Kehrseite. Untertreibung kann schroff wirken, und wer sie nur imitiert, ohne den anerkennenden Kern zu treffen, klingt gleichgültig statt genau.\n\n" +
      "Die Regel ist am Ende einfach: Sagen Sie weniger, als Sie meinen — aber meinen Sie es.",
    questions: [
      {
        text: "Was zeigte die Studie?",
        options: [
          "Deutsche bewerteten die Qualität schlechter.",
          "Deutsche bewerteten gleich, formulierten aber niedriger.",
          "Deutsche lobten häufiger.",
        ],
        answer: 1,
        explain: "„bei identischer Einschätzung der Qualität“ — fark yargıda değil, ifadede.",
      },
      {
        kind: "gapfill",
        text: "Wer ___, verliert die Möglichkeit zu steigern.",
        options: [],
        answer: 0,
        accept: ["übertreibt"],
        explain: "Abartının bedeli: ölçek üstte tükenince gerçek övgüye yer kalmıyor.",
      },
      {
        text: "Was bedeutet „Da ist noch Luft nach oben“ laut Text?",
        options: [
          "Eine Kritik am Charakter",
          "Eine Aussage über Prozentpunkte",
          "Eine höfliche Ablehnung",
        ],
        answer: 1,
        explain: "Kişiye değil işe dair: kaç puan eksik kaldığını söylüyor.",
      },
      {
        kind: "short_answer",
        text: "Welche Kehrseite nennt der Text an der Untertreibung?",
        options: [],
        answer: 0,
        accept: [
          "sie kann schroff wirken",
          "wer sie nur imitiert, klingt gleichgültig",
          "schroff und gleichgültig statt genau",
        ],
        explain: "„Untertreibung kann schroff wirken … klingt gleichgültig statt genau.“",
      },
      {
        kind: "short_answer",
        text: "Wie lautet die Schlussregel des Textes, in eigenen Worten?",
        options: [],
        answer: 0,
        accept: [
          "untertreiben, aber aufrichtig",
          "weniger sagen, als man meint, aber es auch meinen",
          "Sagen Sie weniger, als Sie meinen — aber meinen Sie es.",
        ],
        explain: "Eksiltmenin koşulu içtenlik; taklit edilirse kayıtsızlığa dönüyor.",
      },
    ],
  },
  {
    id: "c1-u05-r2",
    level: "C1",
    skill: "reading",
    unit: 5,
    title: "Die Kunst der harmlosen Frage",
    genre: "Rehber yazısı",
    intro: "Sohbet açma rehberi. Hangi soru kapı açar, hangisi çıkmaza sokar?",
    gloss: [
      { de: "die Plauderei", tr: "hoşbeş", en: "chit-chat" },
      { de: "unverfänglich", tr: "masum, tehlikesiz", en: "innocuous" },
      { de: "anknüpfen", tr: "bağlanmak, devam etmek", en: "to pick up on" },
      { de: "die Floskel", tr: "kalıp söz", en: "empty phrase" },
      { de: "auflockern", tr: "yumuşatmak", en: "to loosen up" },
      { de: "die Sackgasse", tr: "çıkmaz", en: "dead end" },
      { de: "zumal", tr: "hele ki", en: "particularly since" },
      { de: "hingegen", tr: "buna karşılık", en: "on the other hand" },
    ],
    minutes: 7,
    text:
      "DIE HARMLOSE FRAGE IST EIN HANDWERK\n\n" +
      "Small Talk hat einen schlechten Ruf, zumal unter Menschen, die ihn für Zeitverschwendung halten. Dabei entscheidet er, ob ein Gespräch überhaupt beginnt.\n\n" +
      "Der häufigste Fehler ist die geschlossene Frage. „Waren Sie schon mal in Hamburg?“ führt in eine Sackgasse: Ja oder nein, und dann Stille. „Was hat Sie nach Hamburg gebracht?“ hingegen öffnet, weil die Antwort eine Geschichte verlangt.\n\n" +
      "Der zweite Fehler ist das Thema, das nicht unverfänglich ist. Gehalt, Gesundheit, Familienstand — in vielen Ländern normale Fragen, hier Grenzverletzungen. Wetter dagegen gilt als Floskel, funktioniert aber genau deshalb: Niemand muss sich dabei zeigen.\n\n" +
      "Am wirksamsten ist das Anknüpfen. Wer im Gespräch etwas aufgreift, das der andere beiläufig gesagt hat — „Sie haben vorhin die Werkstatt erwähnt“ —, signalisiert Zuhören, und Zuhören lockert mehr auf als jede vorbereitete Anekdote.\n\n" +
      "Damit ist auch gesagt, was diese Plauderei nicht ist: ein Vorgespräch, das man überstehen muss. Sie ist der Teil, in dem entschieden wird, wie das eigentliche Gespräch verläuft.\n\n" +
      "Eine letzte Regel: Wer Small Talk beendet, sollte es sichtbar tun. „Ich lasse Sie mal weiterziehen“ ist freundlicher als ein Blick über die Schulter — und erspart beiden das Rätselraten.",
    questions: [
      {
        text: "Warum ist „Waren Sie schon mal in Hamburg?“ problematisch?",
        options: [
          "Die Frage ist zu persönlich.",
          "Sie lässt nur ja oder nein zu.",
          "Sie ist eine Floskel.",
        ],
        answer: 1,
        explain: "„führt in eine Sackgasse: Ja oder nein, und dann Stille.“",
      },
      {
        kind: "gapfill",
        text: "Wetter gilt als ___, funktioniert aber genau deshalb.",
        options: [],
        answer: 0,
        accept: ["Floskel"],
        explain: "Kalıp söz olması kusur değil işlev: kimse kendini açmak zorunda kalmıyor.",
      },
      {
        text: "Was ist laut Text am wirksamsten?",
        options: [
          "Eine vorbereitete Anekdote",
          "Das Anknüpfen an etwas beiläufig Gesagtes",
          "Eine offene Frage zum Wetter",
        ],
        answer: 1,
        explain: "„Zuhören lockert mehr auf als jede vorbereitete Anekdote.“",
      },
      {
        kind: "short_answer",
        text: "Warum empfiehlt der Text, das Gespräch sichtbar zu beenden?",
        options: [],
        answer: 0,
        accept: [
          "es erspart beiden das Rätselraten",
          "damit niemand rätseln muss",
          "es ist freundlicher als ein Blick über die Schulter",
        ],
        explain: "Bitişi adlandırmak, kaçamak bir bakıştan kibar.",
      },
      {
        text: "Der Text hält Fragen nach Gehalt und Gesundheit für unverfänglich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „in vielen Ländern normale Fragen, hier Grenzverletzungen“.",
      },
    ],
  },
  {
    id: "c1-u05-l1",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "Dürfte ich Sie kurz stören?",
    genre: "Telefon görüşmesi",
    intro: "Telefonda nezaket. Ses tonu yokken kibarlık neyle taşınıyor?",
    gloss: [
      { de: "durchstellen", tr: "bağlamak", en: "to put through" },
      { de: "der Rückruf", tr: "geri arama", en: "call back" },
      { de: "die Leitung", tr: "hat", en: "line" },
      { de: "hinterlassen", tr: "bırakmak (mesaj)", en: "to leave" },
      { de: "umgehend", tr: "derhâl", en: "promptly" },
      { de: "einholen", tr: "almak, temin etmek", en: "to obtain" },
      { de: "vorenthalten", tr: "esirgemek", en: "to withhold" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Reimer", text: "Kanzlei Hoffmann, Reimer, guten Tag." },
      { speaker: "Herr Demir", text: "Guten Tag. Dürfte ich Sie kurz stören? Demir, Firma Netcore." },
      { speaker: "Frau Reimer", text: "Sie stören nicht. Was kann ich für Sie tun?" },
      { speaker: "Herr Demir", text: "Ich hatte Herrn Hoffmann eine Frage geschickt und noch keine Antwort. Wären Sie so freundlich, mich durchzustellen?" },
      { speaker: "Frau Reimer", text: "Herr Hoffmann ist bis Donnerstag außer Haus. Ich kann Ihnen aber gern einen Rückruf notieren." },
      { speaker: "Herr Demir", text: "Das wäre nett. Soll ich Ihnen dazu eine Nachricht hinterlassen?" },
      { speaker: "Frau Reimer", text: "Ein Stichwort genügt, damit ich es richtig einordne." },
      { speaker: "Herr Demir", text: "Es geht um die Frist am Freitag — die ist der eigentliche Grund für den Anruf." },
      { speaker: "Frau Reimer", text: "Das ändert die Lage. Fristsachen halte ich nicht bis Donnerstag zurück." },
      { speaker: "Herr Demir", text: "Ich wollte Ihnen die Dringlichkeit nicht vorenthalten, aber auch keinen Druck machen." },
      { speaker: "Frau Reimer", text: "Sagen Sie es beim nächsten Mal ruhig gleich. Ich hole heute Nachmittag eine Auskunft ein und melde mich umgehend." },
      { speaker: "Herr Demir", text: "Sehr freundlich. Soll ich Ihnen die Unterlagen noch einmal schicken?" },
      { speaker: "Frau Reimer", text: "Nicht nötig, ich habe die Akte auf der Leitung offen. Sie hören heute von mir." },
    ],
    questions: [
      {
        text: "Wie formuliert Herr Demir seine Bitte?",
        options: [
          "Im Imperativ",
          "Im Konjunktiv II",
          "Als Feststellung",
        ],
        answer: 1,
        explain: "„Dürfte ich …“, „Wären Sie so freundlich …“ — telefonda nezaket dilek kipiyle taşınıyor.",
      },
      {
        kind: "gapfill",
        text: "___ ich Sie kurz stören?",
        options: [],
        answer: 0,
        accept: ["Dürfte"],
        explain: "dürfen'in dilek kipi; „Darf ich“ da kibar ama „Dürfte“ mesafeyi bir kademe açıyor.",
      },
      {
        text: "Was ändert die Lage im Gespräch?",
        options: [
          "Dass Herr Hoffmann außer Haus ist",
          "Dass es um eine Frist geht",
          "Dass die Unterlagen fehlen",
        ],
        answer: 1,
        explain: "„Das ändert die Lage. Fristsachen halte ich nicht bis Donnerstag zurück.“",
      },
      {
        kind: "dictation",
        text: "Frau Reimer'in bir sonraki sefer için verdiği öğüdü yaz.",
        options: [],
        answer: 0,
        accept: [
          "Sagen Sie es beim nächsten Mal ruhig gleich.",
          "Sagen Sie es beim nächsten Mal ruhig gleich",
        ],
        explain: "Aciliyeti geciktirmek nezaket değil; „ruhig“ burada izin veren bir parçacık.",
      },
    ],
  },
  {
    id: "c1-u05-l2",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "Die Betonung entscheidet",
    genre: "Diyalog",
    intro: "İki parçacık bir arada. Aynı sözcükler, vurguya göre başka anlam.",
    gloss: [
      { de: "die Kombination", tr: "birleşim", en: "combination" },
      { de: "die Nuance", tr: "nüans", en: "nuance" },
      { de: "die Betonung", tr: "vurgu", en: "stress" },
      { de: "einsetzen", tr: "kullanmak, devreye sokmak", en: "to deploy" },
      { de: "treffsicher", tr: "isabetli", en: "unerring" },
      { de: "deuten", tr: "yorumlamak", en: "to interpret" },
      { de: "mitnichten", tr: "hiç de değil", en: "by no means" },
      { de: "vielmehr", tr: "aksine", en: "rather" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Tuna", text: "Ich habe „Das haben Sie ja wohl nicht ernst gemeint“ geschrieben. Die Antwort kam eisig." },
      { speaker: "Frau Weiß", text: "Kein Wunder. Sie haben zwei Partikel kombiniert, die zusammen einen Vorwurf ergeben." },
      { speaker: "Tuna", text: "Ich wollte nur Erstaunen ausdrücken." },
      { speaker: "Frau Weiß", text: "„Ja“ allein wäre Erstaunen gewesen. „Ja wohl“ ist mitnichten Erstaunen — das ist Empörung." },
      { speaker: "Tuna", text: "Und wie hätte ich es sagen sollen?" },
      { speaker: "Frau Weiß", text: "„Das war jetzt hoffentlich nicht ernst gemeint?“ Da hören Sie den Zweifel, nicht den Angriff." },
      { speaker: "Tuna", text: "Also hat sie den Satz gar nicht falsch gedeutet." },
      { speaker: "Frau Weiß", text: "Sie hat ihn genau so gedeutet, wie er dasteht. Das ist der unangenehme Teil." },
      { speaker: "Tuna", text: "Die Nuance ist wirklich fein." },
      { speaker: "Frau Weiß", text: "Sie ist fein, aber nicht zufällig. Schriftlich fehlt die Betonung, deshalb wirkt jede Kombination stärker als gemeint." },
      { speaker: "Tuna", text: "Mündlich hätte ich es also retten können?" },
      { speaker: "Frau Weiß", text: "Vielleicht. Mit der richtigen Betonung wird aus dem Vorwurf eine Nachfrage. Vielmehr rate ich Ihnen aber: schriftlich weniger Partikel, dafür treffsichere Wörter." },
      { speaker: "Tuna", text: "Also lieber ein klares Wort als zwei kleine." },
      { speaker: "Frau Weiß", text: "Genau. Partikel setzt man ein, wenn man die Stimme dazu hat." },
    ],
    questions: [
      {
        text: "Was ergibt die Kombination „ja wohl“ laut Frau Weiß?",
        options: ["Erstaunen", "Empörung", "Zustimmung"],
        answer: 1,
        explain: "„‚Ja wohl‘ ist mitnichten Erstaunen — das ist Empörung.“",
      },
      {
        kind: "gapfill",
        text: "Schriftlich fehlt die ___, deshalb wirkt jede Kombination stärker als gemeint.",
        options: [],
        answer: 0,
        accept: ["Betonung"],
        explain: "Yazıda ses tonu yok; parçacık tek başına kalınca ağırlığı artıyor.",
      },
      {
        text: "Was rät Frau Weiß für die Schriftsprache?",
        options: [
          "Mehr Partikel, um freundlicher zu klingen",
          "Weniger Partikel, dafür treffsichere Wörter",
          "Gar keine Fragen stellen",
        ],
        answer: 1,
        explain: "„schriftlich weniger Partikel, dafür treffsichere Wörter“.",
      },
      {
        kind: "short_answer",
        text: "Unter welcher Bedingung setzt man Partikel laut Frau Weiß ein?",
        options: [],
        answer: 0,
        accept: [
          "wenn die Betonung mitgeliefert wird",
          "wenn man die Stimme dazu hat",
          "nur mündlich",
        ],
        explain: "„Partikel setzt man ein, wenn man die Stimme dazu hat.“",
      },
    ],
  },
  {
    id: "c1-u05-w1",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "Eksiltme ve dilek kipi",
    genre: "Dil bilgisi",
    intro: "Az söyleyerek övmek, dilek kipiyle rica etmek — iki ayrı ölçek.",
    gloss: [
      { de: "die Untertreibung", tr: "eksiltme", en: "understatement" },
      { de: "zurückhaltend", tr: "ölçülü", en: "reserved" },
      { de: "durchstellen", tr: "bağlamak", en: "to put through" },
      { de: "vorenthalten", tr: "esirgemek", en: "to withhold" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Fena değil. Hatta oldukça iyi.",
        answer: "Nicht schlecht. Sogar ziemlich gut",
        hint: "Alman ölçeğinde „nicht schlecht“ orta değil, olumlu tarafın başlangıcı.",
      },
      {
        kind: "build",
        tr: "Sizi kısaca rahatsız edebilir miyim?",
        answer: "Dürfte ich Sie kurz stören",
        hint: "dürfen'in dilek kipi telefonda standart giriş.",
      },
      {
        kind: "build",
        tr: "Beni bağlar mısınız, rica etsem?",
        answer: "Wären Sie so freundlich, mich durchzustellen",
        hint: "sein'in dilek kipi artı zu-mastar; en kibar rica kalıbı.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi Alman ölçeğine getir: abartı burada sıcaklık değil belirsizlik üretiyor.",
        source: "Ihre Präsentation war absolut fantastisch und einfach perfekt!",
        answer: "Ihre Präsentation war wirklich sehr gut.",
        alternatives: [
          "Ihre Präsentation war wirklich sehr gut",
          "Ihre Präsentation war sehr ordentlich.",
        ],
        why: "Her şey fantastik olunca gerçekten iyi olana söylenecek söz kalmıyor; ölçeğin üst ucu tükenince övgü bilgi taşımaz olur.",
      },
    ],
  },
  {
    id: "c1-u05-w2",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "Rückmeldung mit Maß",
    genre: "Kurum yazısı",
    intro: "Bir çalışmayı değerlendir: överken şişirme, eleştirirken kişiselleştirme.",
    gloss: [
      { de: "anerkennend", tr: "takdir edici", en: "appreciative" },
      { de: "zurückhaltend", tr: "ölçülü", en: "reserved" },
      { de: "übertreiben", tr: "abartmak", en: "to exaggerate" },
      { de: "unbestreitbar", tr: "yadsınamaz", en: "indisputable" },
      { de: "eindringlich", tr: "çarpıcı, ısrarlı", en: "emphatic" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki iş örneğine yazılı geri bildirim ver. Alman ölçeğine uy: övgüyü şişirme, eksiği kişiye değil işe bağla, en az bir eksiltme kalıbı kullan („nicht schlecht“, „da ist noch Luft nach oben“, „sehr ordentlich“) ve somut bir sonraki adım söyle.",
        stimulus:
          "STAJYERİN TESLİM ETTİĞİ RAPOR — ÖZET\n\n" +
          "— Yapı net, başlıklar tutarlı, kaynakça eksiksiz\n" +
          "— Veri bölümü iyi: üç grafiğin ikisi doğru okunmuş\n" +
          "— Üçüncü grafikte eksen etiketleri karışmış, yorum bu yüzden yanlış\n" +
          "— Sonuç bölümü iki sayfa, bulgularla bağı zayıf\n" +
          "— Teslim tarihinden iki gün önce geldi",
        checklist: [
          "Övgü ölçülü mü (abartı yok)?",
          "Eksik kişiye değil işe bağlandı mı?",
          "En az bir eksiltme kalıbı var mı?",
          "Somut bir sonraki adım verdin mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Das ist sehr ordentlich gearbeitet.", tr: "bu çok düzgün bir iş", en: "that is very solid work" },
          { de: "Da ist noch Luft nach oben.", tr: "burada gelişime yer var", en: "there is room for improvement" },
          { de: "Zwei Punkte würde ich anders lösen.", tr: "iki noktayı farklı çözerdim", en: "I would solve two points differently" },
        ],
        sample:
          "Liebe Frau Kern,\n\n" +
          "danke für den Bericht — und dafür, dass er zwei Tage vor der Frist da war.\n\n" +
          "Der Aufbau ist sehr ordentlich gearbeitet: Die Gliederung trägt, die Überschriften sind konsistent, das Quellenverzeichnis ist vollständig. Das ist bei einem ersten Bericht nicht selbstverständlich.\n\n" +
          "Zwei Punkte würde ich anders lösen. Erstens Abbildung 3: Die Achsen sind vertauscht, und weil die Interpretation darauf aufbaut, kippt der ganze Absatz. Das ist schnell repariert, muss aber vor der Weitergabe passieren.\n\n" +
          "Zweitens der Schlussteil. Zwei Seiten sind für die Menge an Befunden viel; da ist noch Luft nach oben. Ich würde jede Aussage streichen, die sich nicht auf eine Abbildung zurückführen lässt — erfahrungsgemäß bleibt dann eine halbe Seite, und die ist stärker.\n\n" +
          "Können Sie beides bis Mittwoch anpassen? Danach gebe ich den Bericht weiter.\n\n" +
          "Viele Grüße\nR. Lindner",
      },
    ],
  },
];
