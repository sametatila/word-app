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
    genre: "article",
    intro: "Alman övgü ölçeği üstüne bir yazı. Yabancı kulakta neden soğuk duyuluyor?",
    gloss: [
      { de: "die Untertreibung", tr: "eksiltme / az söyleme", en: "understatement" },
      { de: "das Lob", tr: "övgü", en: "praise" },
      { de: "zurückhaltend", tr: "çekingen / ölçülü", en: "reserved" },
      { de: "anerkennend", tr: "takdir edici", en: "appreciative" },
      { de: "übertreiben", tr: "abartmak", en: "to exaggerate" },
      { de: "unbestreitbar", tr: "yadsınamaz", en: "indisputable" },
      { de: "schroff", tr: "ters / sert", en: "brusque" },
      { de: "die Abneigung", tr: "hoşlanmama", en: "aversion" },
      { de: "international", tr: "uluslararası", en: "international" },
      { de: "die Stufe", tr: "basamak", en: "step" },
      { de: "niedrig", tr: "düşük", en: "low" },
      { de: "die Einschätzung", tr: "değerlendirme", en: "assessment" },
      { de: "markieren", tr: "işaretlemek", en: "to mark" },
      { de: "die Aussage", tr: "ifade", en: "statement" },
      { de: "doppelt", tr: "iki kat", en: "double" },
      { de: "formulieren", tr: "ifade etmek", en: "to phrase" },
      { de: "steigern", tr: "artırmak", en: "to increase" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "stets", tr: "daima", en: "always" },
      { de: "lesen", tr: "okumak", en: "to read" },
      { de: "ausfallen", tr: "sonuçlanmak", en: "to turn out" },
      { de: "geschlossen sein", tr: "tamamlanmış olmak", en: "to be completed" },
      { de: "offen", tr: "açık", en: "open" },
      { de: "bedeuten", tr: "anlamına gelmek", en: "to mean" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "befriedigend", tr: "yeterli", en: "satisfactory" },
    ],
    minutes: 7,
    text:
      "„NICHT SCHLECHT“ — EIN LOB, DAS NICHT WIE EINES KLINGT\n\n" +
      "Eine internationale Studie ließ Teilnehmende dieselbe Arbeitsprobe bewerten. Die deutschen Bewertungen fielen im Schnitt eine ganze Stufe niedriger aus als die amerikanischen — bei identischer Einschätzung der Qualität.\n\n" +
      "Der Grund ist keine Abneigung gegen Lob, sondern eine andere Skala. Wo anderswo „großartig“ die Mitte markiert, markiert im deutschen Berufsleben „nicht schlecht“ die Mitte. „Sehr ordentlich“ liegt darüber. „Da ist noch Luft nach oben“ ist keine Kritik am Charakter, sondern eine Aussage über Prozentpunkte.\n\n" +
      "Für Zugereiste ist das doppelt heikel. Sie hören ein zurückhaltendes Lob als Kritik — und formulieren selbst so, wie sie es gewohnt sind. Ein begeistertes „Das ist fantastisch!“ wirkt dann nicht warm, sondern unpräzise. Wer übertreibt, verliert die Möglichkeit zu steigern: Wenn alles fantastisch ist, wie klingt das wirklich Gute?\n\n" +
      "Unbestreitbar hat die Sache eine Kehrseite. Untertreibung kann schroff wirken, und wer sie nur imitiert, ohne den anerkennenden Kern zu treffen, klingt gleichgültig statt genau.\n\n" +
      "Praktisch wirkt sich die Skala vor allem dort aus, wo sie unsichtbar bleibt: in Zeugnissen und Beurteilungen. „Zu unserer vollen Zufriedenheit“ ist dort keine Bestnote, sondern die dritte Stufe; die Bestnote lautet „stets zu unserer vollsten Zufriedenheit“. Wer die Formel nicht kennt, liest ein befriedigendes Zeugnis und hält es für ein sehr gutes.\n\n" +
      "Dieselbe Verschiebung gilt in die andere Richtung. Ein deutscher Vorgesetzter, der „das war in Ordnung“ sagt, hat in vielen Fällen zugestimmt und nicht abgewertet. Wer darauf mit einer Rechtfertigung antwortet, macht aus einer abgeschlossenen Sache eine offene.\n\n" +
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
    genre: "guide",
    intro: "Sohbet açma rehberi. Hangi soru kapı açar, hangisi çıkmaza sokar?",
    gloss: [
      { de: "die Plauderei", tr: "hoşbeş", en: "chit-chat" },
      { de: "unverfänglich", tr: "masum / tehlikesiz", en: "innocuous" },
      { de: "anknüpfen", tr: "bağlanmak / devam etmek", en: "to pick up on" },
      { de: "die Floskel", tr: "kalıp söz", en: "empty phrase" },
      { de: "auflockern", tr: "yumuşatmak", en: "to loosen up" },
      { de: "die Sackgasse", tr: "çıkmaz", en: "dead end" },
      { de: "zumal", tr: "hele ki", en: "particularly since" },
      { de: "hingegen", tr: "buna karşılık", en: "on the other hand" },
      { de: "geschlossen sein", tr: "kapalı olmak", en: "to be closed" },
      { de: "die Stille", tr: "sessizlik", en: "silence" },
      { de: "normal", tr: "normal", en: "normal" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "vorhin", tr: "az önce", en: "a little while ago" },
      { de: "das Signal", tr: "sinyal", en: "signal" },
      { de: "befürchten", tr: "endişe etmek", en: "to fear" },
      { de: "die Länge", tr: "uzunluk", en: "length" },
      { de: "der Blick", tr: "bakış", en: "look" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "das Rätsel", tr: "bilmece", en: "riddle" },
    ],
    minutes: 7,
    text:
      "DIE HARMLOSE FRAGE IST EIN HANDWERK\n\n" +
      "Small Talk hat einen schlechten Ruf, zumal unter Menschen, die ihn für Zeitverschwendung halten. Dabei entscheidet er, ob ein Gespräch überhaupt beginnt.\n\n" +
      "Der häufigste Fehler ist die geschlossene Frage. „Waren Sie schon mal in Hamburg?“ führt in eine Sackgasse: Ja oder nein, und dann Stille. „Was hat Sie nach Hamburg gebracht?“ hingegen öffnet, weil die Antwort eine Geschichte verlangt.\n\n" +
      "Der zweite Fehler ist das Thema, das nicht unverfänglich ist. Gehalt, Gesundheit, Familienstand — in vielen Ländern normale Fragen, hier Grenzverletzungen. Wetter dagegen gilt als Floskel, funktioniert aber genau deshalb: Niemand muss sich dabei zeigen.\n\n" +
      "Am wirksamsten ist das Anknüpfen. Wer im Gespräch etwas aufgreift, das der andere beiläufig gesagt hat — „Sie haben vorhin die Werkstatt erwähnt“ —, signalisiert Zuhören, und Zuhören lockert mehr auf als jede vorbereitete Anekdote.\n\n" +
      "Damit ist auch gesagt, was diese Plauderei nicht ist: ein Vorgespräch, das man überstehen muss. Sie ist der Teil, in dem entschieden wird, wie das eigentliche Gespräch verläuft.\n\n" +
      "Eine Frage taucht bei Zugereisten regelmäßig auf: Wie lange muss das dauern? Die ehrliche Antwort lautet zwei bis vier Minuten, und sie ist kürzer, als die meisten befürchten. Länger wird es nur, wenn beide es wollen — dann ist es aber kein Small Talk mehr, sondern ein Gespräch.\n\n" +
      "Wer diese Minuten überspringt und sofort zur Sache kommt, wirkt nicht effizient, sondern angespannt. Umgekehrt gilt dasselbe: Wer nach zehn Minuten immer noch über die Anfahrt spricht, hält den anderen auf und merkt es nicht.\n\n" +
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
        text: "Der Text hält Fragen nach Gehalt und Gesundheit hier für Grenzverletzungen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İfade doğru: „in vielen Ländern normale Fragen, hier Grenzverletzungen“.",
      },
    ],
  },
  {
    id: "c1-u05-l1",
    level: "C1",
    skill: "listening",
    unit: 5,
    title: "Dürfte ich Sie kurz stören?",
    genre: "phone",
    intro: "Telefonda nezaket. Ses tonu yokken kibarlık neyle taşınıyor?",
    gloss: [
      { de: "durchstellen", tr: "bağlamak", en: "to put through" },
      { de: "der Rückruf", tr: "geri arama", en: "callback" },
      { de: "die Leitung", tr: "hat", en: "line" },
      { de: "hinterlassen", tr: "bırakmak", en: "to leave", note: "mesaj için" },
      { de: "umgehend", tr: "derhâl", en: "promptly" },
      { de: "einholen", tr: "almak / temin etmek", en: "to obtain" },
      { de: "vorenthalten", tr: "esirgemek", en: "to withhold" },
      { de: "zustellen", tr: "tebliğ etmek", en: "to deliver" },
      { de: "außer", tr: "hariç", en: "except" },
      { de: "genügen", tr: "yetmek", en: "to be enough" },
      { de: "die Akte", tr: "dosya", en: "case file" },
      { de: "offen", tr: "açık", en: "open" },
      { de: "formulieren", tr: "ifade etmek", en: "to phrase" },
      { de: "durchzustellen", tr: "bağlamak", en: "to put through" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Reimer", text: "Kanzlei Hoffmann, Reimer, guten Tag." },
      { speaker: "Herr Böhm", text: "Guten Tag. Dürfte ich Sie kurz stören? Böhm, Firma Netcore." },
      { speaker: "Frau Reimer", text: "Sie stören nicht. Was kann ich für Sie tun?" },
      { speaker: "Herr Böhm", text: "Ich hatte Herrn Hoffmann eine Frage geschickt und noch keine Antwort. Wären Sie so freundlich, mich durchzustellen?" },
      { speaker: "Frau Reimer", text: "Herr Hoffmann ist bis Donnerstag außer Haus. Ich kann Ihnen aber gern einen Rückruf notieren." },
      { speaker: "Herr Böhm", text: "Das wäre nett. Soll ich Ihnen dazu eine Nachricht hinterlassen?" },
      { speaker: "Frau Reimer", text: "Ein Stichwort genügt, damit ich es richtig einordne." },
      { speaker: "Herr Böhm", text: "Es geht um die Frist am Freitag — die ist der eigentliche Grund für den Anruf." },
      { speaker: "Frau Reimer", text: "Das ändert die Lage. Fristsachen halte ich nicht bis Donnerstag zurück." },
      { speaker: "Herr Böhm", text: "Ich wollte Ihnen die Dringlichkeit nicht vorenthalten, aber auch keinen Druck machen." },
      { speaker: "Frau Reimer", text: "Sagen Sie es beim nächsten Mal ruhig gleich. Ich hole heute Nachmittag eine Auskunft ein und melde mich umgehend." },
      { speaker: "Herr Böhm", text: "Sehr freundlich. Soll ich Ihnen die Unterlagen noch einmal schicken?" },
      { speaker: "Frau Reimer", text: "Nicht nötig, die Akte liegt offen vor mir. Bleiben Sie noch kurz in der Leitung, ich notiere Ihre Nummer. Sie hören heute von mir." },
    ],
    questions: [
      {
        text: "Wie formuliert Herr Böhm seine Bitte?",
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
    title: "Eine Mail an die Lieferantin",
    genre: "dialogue",
    intro: "Patrick'in tedarikçiye yazdığı e-posta soğuk bir yanıt almış. Ekip lideri durumu nasıl toparlamayı öneriyor?",
    gloss: [
      { de: "die Nuance", tr: "nüans", en: "nuance" },
      { de: "die Betonung", tr: "vurgu", en: "stress" },
      { de: "treffsicher", tr: "yerinde", en: "well-aimed" },
      { de: "mitnichten", tr: "asla / hiç de", en: "by no means" },
      { de: "vielmehr", tr: "daha çok / aksine", en: "rather" },
      { de: "eisig", tr: "buz gibi", en: "icy" },
      { de: "die Lieferantin", tr: "tedarikçi", en: "supplier" },
      { de: "zuverlässig", tr: "güvenilir", en: "reliable" },
      { de: "daneben", tr: "yersiz", en: "off the mark" },
      { de: "der Karton", tr: "koli", en: "box" },
      { de: "die Messe", tr: "fuar", en: "trade fair" },
      { de: "machbar", tr: "yapılabilir", en: "feasible" },
      { de: "in die Ecke drängen", tr: "köşeye sıkıştırmak", en: "to back someone into a corner" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Patrick", text: "Frau Weiß, haben Sie kurz Zeit? Die Firma Lehmann hat eben geantwortet, und die Antwort ist eisig." },
      { speaker: "Frau Weiß", text: "Zeigen Sie mal. Worum ging es denn?" },
      { speaker: "Patrick", text: "Die Lieferung für Montag kommt erst am Donnerstag. Ich habe zurückgeschrieben: „Das haben Sie ja wohl nicht ernst gemeint.“" },
      { speaker: "Frau Weiß", text: "Und Frau Lehmann hat das als Vorwurf gelesen. Das ist mitnichten ein Missverständnis: Geschrieben klingt der Satz genau so, denn jede Nuance der Stimme fehlt." },
      { speaker: "Patrick", text: "Ich war ja auch verärgert. Aber angreifen wollte ich sie doch nicht." },
      { speaker: "Frau Weiß", text: "Das glaube ich Ihnen. Nur: Frau Lehmann ist seit zwölf Jahren unsere zuverlässigste Lieferantin. Die verlieren wir nicht wegen einer Mail." },
      { speaker: "Patrick", text: "Soll ich mich schriftlich entschuldigen?" },
      { speaker: "Frau Weiß", text: "Rufen Sie sie an, heute noch. Am Telefon hört sie die Betonung, und Sie können Ihre Frage vielmehr als Frage stellen." },
      { speaker: "Patrick", text: "Und was sage ich ihr?" },
      { speaker: "Frau Weiß", text: "Zuerst, dass Ihr Ton daneben war. Dann die eigentliche Frage: Kann sie wenigstens einen Teil schon am Montag liefern?" },
      { speaker: "Patrick", text: "Für die Messe reichen uns sechzig Kartons. Den Rest brauchen wir erst in der Woche danach." },
      { speaker: "Frau Weiß", text: "Sehen Sie, das ist ein treffsicheres Angebot. Damit kann sie arbeiten. Mit einem Vorwurf kann sie nichts anfangen." },
      { speaker: "Patrick", text: "Und wenn sie trotzdem nein sagt?" },
      { speaker: "Frau Weiß", text: "Dann fragen Sie, was bis Montag machbar ist. Wer so lange mit uns arbeitet, findet eine Lösung — wenn man sie nicht in die Ecke drängt." },
    ],
    questions: [
      {
        text: "Wie hat Frau Lehmann Patricks Mail verstanden?",
        options: [
          "Als Scherz",
          "Als Frage",
          "Als Vorwurf",
        ],
        answer: 2,
        explain: "Patrick'in cümlesi tedarikçiye suçlama gibi gelmiş; Frau Weiß da cümlenin tam böyle okunduğunu söylüyor.",
      },
      {
        kind: "gapfill",
        text: "Am Telefon hört sie die ___, und Sie können Ihre Frage vielmehr als Frage stellen.",
        options: [],
        answer: 0,
        accept: ["Betonung"],
        explain: "Telefonda ses duyuluyor; yazıda kaybolan vurgu orada yanlış anlamayı önlüyor.",
      },
      {
        text: "Was soll Patrick Frau Lehmann anbieten?",
        options: [
          "Einen Rabatt auf die nächste Bestellung",
          "Eine Teillieferung am Montag",
          "Einen längeren Vertrag",
        ],
        answer: 1,
        explain: "Fuar için altmış koli yetiyor; gerisi bir hafta sonra da gelebilir.",
      },
      {
        kind: "short_answer",
        text: "Wie lange arbeitet die Firma schon mit Frau Lehmann zusammen?",
        options: [],
        answer: 0,
        accept: [
          "seit zwölf Jahren",
          "zwölf Jahre",
          "seit 12 Jahren",
          "12 Jahre",
        ],
        explain: "„Frau Lehmann ist seit zwölf Jahren unsere zuverlässigste Lieferantin.“",
      },
    ],
  },
  {
    id: "c1-u05-w1",
    level: "C1",
    skill: "writing",
    unit: 5,
    title: "Lob und Bitten am Telefon",
    genre: "grammar",
    intro: "Az söyleyerek övmek, dilek kipiyle rica etmek — iki ayrı ölçek.",
    gloss: [
      { de: "die Untertreibung", tr: "az söyleme", en: "understatement" },
      { de: "zurückhaltend", tr: "ölçülü", en: "reserved" },
      { de: "durchstellen", tr: "bağlamak", en: "to put through" },
      { de: "vorenthalten", tr: "esirgemek", en: "to withhold" },
      { de: "zustellen", tr: "tebliğ etmek", en: "to deliver" },
      { de: "durchzustellen", tr: "bağlamak", en: "to put through" },
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
    genre: "formal",
    intro: "Bir çalışmayı değerlendir: överken şişirme, eleştirirken kişiselleştirme.",
    gloss: [
      { de: "anerkennend", tr: "takdir edici", en: "appreciative" },
      { de: "zurückhaltend", tr: "ölçülü", en: "reserved" },
      { de: "übertreiben", tr: "abartmak", en: "to exaggerate" },
      { de: "unbestreitbar", tr: "yadsınamaz", en: "indisputable" },
      { de: "eindringlich", tr: "çarpıcı / ısrarlı", en: "emphatic" },
      { de: "die Konsistenz", tr: "tutarlılık", en: "consistency" },
      { de: "tauschen", tr: "takas etmek", en: "to swap" },
      { de: "aufbauen", tr: "kurmak", en: "to set up" },
      { de: "der Absatz", tr: "paragraf", en: "paragraph" },
      { de: "die Aussage", tr: "ifade", en: "statement" },
      { de: "zurückführen auf", tr: "dayandırmak", en: "to attribute" },
      { de: "stärken", tr: "güçlendirmek", en: "to strengthen" },
      { de: "vertauscht", tr: "karıştırılmış", en: "swapped" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki iş örneğine yazılı geri bildirim ver. Alman ölçeğine uy: övgüyü şişirme, eksiği kişiye değil işe bağla, en az bir az söyleme kalıbı kullan („nicht schlecht“, „da ist noch Luft nach oben“, „sehr ordentlich“) ve somut bir sonraki adım söyle.",
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
          "En az bir az söyleme kalıbı var mı?",
          "Somut bir sonraki adım verdin mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Das ist sehr ordentlich gearbeitet.", tr: "bu çok düzgün bir iş", en: "that is very solid work" },
          { de: "Da ist noch Luft nach oben.", tr: "burada gelişime yer var", en: "there is room for improvement" },
          { de: "Zwei Punkte würde ich anders lösen.", tr: "iki noktayı farklı çözerdim", en: "I would handle two points differently" },
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
