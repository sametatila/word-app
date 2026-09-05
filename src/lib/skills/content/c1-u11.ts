import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 11 — "Dolaylı aktarım, ajans dili, akademik üslup, kaynak eleştirisi".
 *
 * Dört ders: Er sei im Ausland · Laut Angaben der Behörden · Es lässt sich
 * festhalten · Wer sagt das?
 *
 *   Kelime: die Wiedergabe, sich distanzieren, der Wortlaut, übereinstimmen,
 *           zuschreiben, der Informant, vertuschen, entnehmen · der
 *           Sachverhalt, dementieren, die Quellenlage, vorliegen, einordnen,
 *           die Befragung, das Archiv, die Fälschung · sich ergeben, die
 *           Berücksichtigung, der Befund, voraussetzen, die Annahme, ableiten,
 *           die Beweisführung, erforschen · nachweislich, die Primärquelle,
 *           nachprüfbar, die Interessenlage, verlässlich, hinterfragen,
 *           bezweifeln, die Überwachung
 *
 * Ünitenin çekirdeği: KONJUNKTIV I BİR NEZAKET DEĞİL, BİR SORUMLULUK
 * SINIRIDIR. "Er sagt, er ist krank" cümlesi aktaranı iddiaya ortak eder;
 * "er sei krank" etmez. Türkçede bu iş "-mış" ile görülür ama zorunlu
 * değildir, o yüzden Türkçe konuşan Almancada da atlar — ve gazetecilikte,
 * tutanakta, akademik yazıda bu atlama doğrudan bir hak iddiasına dönüşür.
 *
 * Bu yüzden sorular kipin ne olduğunu değil, kipin KİMİ BAĞLADIĞINI ölçüyor.
 */
export const c1U11: SkillExercise[] = [
  {
    id: "c1-u11-r1",
    level: "C1",
    skill: "reading",
    unit: 11,
    title: "Ein Satz, zwei Verantwortliche",
    genre: "Dil yazısı",
    intro: "Aktarım kipi kimi bağlar? İki cümle, iki farklı sorumluluk.",
    gloss: [
      { de: "die Wiedergabe", tr: "aktarım", en: "rendering" },
      { de: "sich distanzieren", tr: "mesafe koymak", en: "to distance oneself" },
      { de: "der Wortlaut", tr: "metnin lafzı", en: "wording" },
      { de: "zuschreiben", tr: "atfetmek", en: "to attribute" },
      { de: "übereinstimmen", tr: "örtüşmek", en: "to match" },
      { de: "entnehmen", tr: "çıkarmak, anlamak", en: "to gather from" },
      { de: "vertuschen", tr: "örtbas etmek", en: "to cover up" },
    ],
    minutes: 7,
    text:
      "WER HAFTET FÜR DEN SATZ?\n\n" +
      "„Der Geschäftsführer sagt, er ist am Freitag im Ausland gewesen.“ Und: „Der Geschäftsführer sagt, er sei am Freitag im Ausland gewesen.“ Der Unterschied ist ein Buchstabe und eine Haftungsfrage.\n\n" +
      "Im ersten Satz übernimmt der Schreibende die Aussage. Er berichtet nicht nur, dass etwas gesagt wurde, sondern behandelt es als Tatsache. Stellt sich später heraus, dass der Geschäftsführer in der Stadt war, hat der Schreibende falsch berichtet.\n\n" +
      "Im zweiten Satz ist die Wiedergabe markiert. Der Konjunktiv I schreibt die Aussage ihrem Urheber zu und lässt den Berichtenden daneben stehen. Er distanziert sich, ohne zu widersprechen — und das ist der entscheidende Punkt: Distanz ist kein Zweifel.\n\n" +
      "Viele Lernende meiden die Form, weil sie unhöflich wirkt. Das Gegenteil ist der Fall. Wer den Konjunktiv weglässt, tut so, als kenne er die Wahrheit; wer ihn setzt, gibt zu, dass er nur den Wortlaut kennt.\n\n" +
      "Zwei Fälle verlangen ihn zwingend. Erstens, wenn die Aussagen zweier Seiten nicht übereinstimmen — dann darf der Bericht keine Partei ergreifen. Zweitens, wenn ein Vorwurf im Raum steht: Wer schreibt „Die Firma hat die Zahlen vertuscht“, statt „habe vertuscht“, erhebt den Vorwurf selbst.\n\n" +
      "Umgekehrt fällt auf, wenn die Zuschreibung fehlt. Ein Bericht, der ohne jede Quelle auskommt, wirkt entweder sehr sicher oder sehr nachlässig, und der Leser kann die beiden nicht unterscheiden — das ist der eigentliche Preis des weggelassenen Konjunktivs.\n\n" +
      "In Nachrichtenagenturen gehört die Zuschreibung deshalb zu den wenigen Regeln, die auch unter Zeitdruck nicht fallen.\n\n" +
      "Der Leser entnimmt das nicht bewusst. Er merkt nur, ob ein Text vorsichtig ist oder nicht.",
    questions: [
      {
        text: "Was ändert sich mit dem Konjunktiv I?",
        options: [
          "Die Höflichkeit des Satzes",
          "Wer für die Aussage einsteht",
          "Der Zeitpunkt des Geschehens",
        ],
        answer: 1,
        explain: "„eine Haftungsfrage“ — kip aktaranı iddianın dışında bırakıyor.",
      },
      {
        kind: "gapfill",
        text: "Der Geschäftsführer sagt, er ___ am Freitag im Ausland gewesen.",
        options: [],
        answer: 0,
        accept: ["sei"],
        explain: "Konjunktiv I: aktarım, iddianın sahipliğini konuşana bırakıyor.",
      },
      {
        text: "Was bedeutet Distanz laut Text NICHT?",
        options: ["Vorsicht", "Zweifel", "Wiedergabe"],
        answer: 1,
        explain: "„Er distanziert sich, ohne zu widersprechen — Distanz ist kein Zweifel.“",
      },
      {
        kind: "short_answer",
        text: "Welche zwei Fälle verlangen den Konjunktiv laut Text zwingend?",
        options: [],
        answer: 0,
        accept: [
          "bei Widerspruch und bei Vorwürfen",
          "wenn Aussagen nicht übereinstimmen und wenn ein Vorwurf im Raum steht",
          "widersprüchliche Aussagen und Vorwürfe",
        ],
        explain: "İkisinde de bildirme kipi tarafsızlığı bozuyor.",
      },
      {
        kind: "short_answer",
        text: "Warum ist das Weglassen laut Text gerade nicht bescheiden?",
        options: [],
        answer: 0,
        accept: [
          "er würde die Wahrheit kennen", "wer ihn weglässt, tut so, als kenne er die Wahrheit",
          "es behauptet Wissen über die Wahrheit",
          "man tut so, als wüsste man es",
        ],
        explain: "Kipi koymak ise yalnız lafzı bildiğini kabul etmek.",
      },
    ],
  },
  {
    id: "c1-u11-r2",
    level: "C1",
    skill: "reading",
    unit: 11,
    title: "Laut Angaben der Behörden",
    genre: "Haber metni",
    intro: "Bir ajans haberi. Hangi cümle olgu, hangisi aktarım?",
    gloss: [
      { de: "der Sachverhalt", tr: "olgu, vaka", en: "the facts of the case" },
      { de: "dementieren", tr: "yalanlamak", en: "to deny" },
      { de: "die Quellenlage", tr: "kaynak durumu", en: "state of the sources" },
      { de: "vorliegen", tr: "mevcut olmak", en: "to be available" },
      { de: "einordnen", tr: "yerine oturtmak", en: "to put in context" },
      { de: "die Fälschung", tr: "sahtecilik", en: "forgery" },
      { de: "nachweislich", tr: "kanıtlanabilir biçimde", en: "demonstrably" },
    ],
    minutes: 7,
    text:
      "BRAND IN LAGERHALLE — ERMITTLUNGEN DAUERN AN\n\n" +
      "In einer Lagerhalle im Gewerbegebiet Nord ist am Donnerstagabend ein Feuer ausgebrochen. Verletzt wurde niemand. Die Halle brannte vollständig aus.\n\n" +
      "Laut Angaben der Feuerwehr sei der Alarm um 21:14 Uhr eingegangen. Die ersten Kräfte seien elf Minuten später vor Ort gewesen. Ein technischer Defekt könne nach derzeitigem Stand nicht ausgeschlossen werden.\n\n" +
      "Der Eigentümer der Halle dementierte am Freitag Berichte, wonach die Brandschutzanlage seit Monaten außer Betrieb gewesen sei. Er habe die Anlage im Mai warten lassen; entsprechende Belege lägen vor.\n\n" +
      "Nachweislich hat die Stadt die Halle zuletzt im Jahr 2019 geprüft. Ein Protokoll aus dem Archiv weist zwei Mängel aus, die als behoben vermerkt sind.\n\n" +
      "Die Staatsanwaltschaft teilte mit, es werde in alle Richtungen ermittelt. Zur Frage einer möglichen Fälschung der Wartungsbelege äußerte sie sich nicht.\n\n" +
      "Auffällig ist auch, was in den Mitteilungen fehlt. Weder die Feuerwehr noch die Staatsanwaltschaft nennt einen Sachschaden; die in mehreren Berichten kursierende Zahl von 1,4 Millionen Euro stammt aus einer Pressemitteilung des Eigentümers und ist bislang von niemandem bestätigt worden.\n\n" +
      "Zwei Angaben stehen bislang unverbunden nebeneinander. Ein Mitarbeiter, der namentlich nicht genannt werden möchte, gibt an, die Anlage habe im Sommer wiederholt Fehlalarme ausgelöst und sei daraufhin stummgeschaltet worden. Der Eigentümer erklärt, davon sei ihm nichts bekannt; eine Stummschaltung sei technisch nur mit Passwort möglich.\n\n" +
      "Ob beide Aussagen zutreffen können, ist offen. Der Hersteller der Anlage teilte auf Anfrage mit, das Passwort werde bei Wartungen regelmäßig an das Personal weitergegeben — eine Auskunft, die keine der beiden Darstellungen widerlegt.\n\n" +
      "Die Quellenlage bleibt vorerst dünn: Außer der Mitteilung der Feuerwehr und dem Protokoll von 2019 liegt bislang kein Dokument vor, das den Sachverhalt unabhängig einordnen könnte.",
    questions: [
      {
        text: "Welche Aussage steht im Indikativ, also als Tatsache des Berichts?",
        options: [
          "Der Alarm sei um 21:14 Uhr eingegangen.",
          "Die Halle brannte vollständig aus.",
          "Der Eigentümer habe die Anlage warten lassen.",
        ],
        answer: 1,
        explain: "Yangının çıkması ve halin yanması gazetenin kendi tespiti; kalanı aktarım.",
      },
      {
        kind: "gapfill",
        text: "Laut Angaben der Feuerwehr ___ der Alarm um 21:14 Uhr eingegangen.",
        options: [],
        answer: 0,
        accept: ["sei"],
        explain: "Ajans dili: kaynak belirtilince fiil Konjunktiv I'e geçiyor.",
      },
      {
        text: "Was genau hat der Eigentümer dementiert?",
        options: [
          "Dass es gebrannt hat",
          "Berichte, die Brandschutzanlage sei außer Betrieb gewesen",
          "Dass die Stadt geprüft hat",
        ],
        answer: 1,
        explain: "Yalanlama yalnız o iddiaya yönelik; başka hiçbir şey reddedilmiyor.",
      },
      {
        kind: "short_answer",
        text: "Welche Formulierung markiert die einzige unabhängig belegte Angabe im Text?",
        options: [],
        answer: 0,
        accept: [
          "nachweislich",
          "Nachweislich hat die Stadt die Halle 2019 geprüft.",
          "nachweislich hat die Stadt geprüft",
        ],
        explain: "Tek belgelenmiş cümle bu; gerisi ya aktarım ya da eksik.",
      },
      {
        kind: "short_answer",
        text: "Wie bewertet der Bericht seine eigene Grundlage?",
        options: [],
        answer: 0,
        accept: [
          "die Quellenlage bleibt dünn",
          "sie bleibt vorerst dünn",
          "es liegt kein unabhängiges Dokument vor",
        ],
        explain: "Kendi sınırını bildiren haber, güvenilirliğini artırıyor.",
      },
    ],
  },
  {
    id: "c1-u11-l1",
    level: "C1",
    skill: "listening",
    unit: 11,
    title: "Zwei Aussagen, ein Protokoll",
    genre: "Toplantı",
    intro: "Tutanak yazan biri iki ifadeyi nasıl kaydediyor?",
    gloss: [
      { de: "sich distanzieren", tr: "mesafe koymak", en: "to distance oneself" },
      { de: "der Wortlaut", tr: "lafız", en: "wording" },
      { de: "übereinstimmen", tr: "örtüşmek", en: "to match" },
      { de: "zuschreiben", tr: "atfetmek", en: "to attribute" },
      { de: "der Sachverhalt", tr: "olgu", en: "the facts" },
      { de: "einordnen", tr: "yerine oturtmak", en: "to contextualise" },
      { de: "hinterfragen", tr: "sorgulamak", en: "to question" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Ott", text: "Ich schreibe das Protokoll. Herr Baumann, was ist am Dienstag passiert?" },
      { speaker: "Herr Baumann", text: "Ich habe die Freigabe am Montag geschickt. Frau Kirsch hat sie nicht geöffnet." },
      { speaker: "Frau Kirsch", text: "Die Mail ist nie angekommen. Ich habe das Postfach durchsucht." },
      { speaker: "Frau Ott", text: "Gut. Dann steht im Protokoll: Herr Baumann gibt an, er habe die Freigabe am Montag versandt. Frau Kirsch erklärt, die Mail sei nicht eingegangen." },
      { speaker: "Herr Baumann", text: "Warum schreiben Sie nicht, dass ich sie geschickt habe? Ich habe sie geschickt." },
      { speaker: "Frau Ott", text: "Weil ich es nicht gesehen habe. Ich schreibe, was Sie sagen — nicht, was war." },
      { speaker: "Frau Kirsch", text: "Das klingt, als würden Sie uns beiden misstrauen." },
      { speaker: "Frau Ott", text: "Es klingt nur so. Die Form schreibt die Aussage Ihnen zu, sie hinterfragt sie nicht. Wenn ich Partei ergreife, ist das Protokoll später wertlos." },
      { speaker: "Frau Kirsch", text: "Sie distanzieren sich also von beiden Darstellungen." },
      { speaker: "Frau Ott", text: "Ich distanziere mich von keiner. Der Konjunktiv gibt den Wortlaut wieder und sagt dazu, wessen Wortlaut es ist." },
      { speaker: "Herr Baumann", text: "Und wie klären wir, was stimmt?" },
      { speaker: "Frau Ott", text: "Gar nicht hier. Die IT kann den Versand prüfen. Bis dahin stehen zwei Aussagen nebeneinander, die nicht übereinstimmen — genau das ist der Sachverhalt." },
      { speaker: "Frau Kirsch", text: "Einverstanden." },
      { speaker: "Frau Ott", text: "Ich ergänze noch, dass die Protokollantin den Vorgang nicht selbst beobachtet hat. Dann kann es später jeder einordnen." },
    ],
    questions: [
      {
        text: "Warum schreibt Frau Ott im Konjunktiv?",
        options: [
          "Weil sie den Beteiligten misstraut",
          "Weil sie den Vorgang nicht selbst gesehen hat",
          "Weil das Protokoll kürzer wird",
        ],
        answer: 1,
        explain: "„Ich schreibe, was Sie sagen — nicht, was war.“",
      },
      {
        kind: "gapfill",
        text: "Frau Kirsch erklärt, die Mail ___ nicht eingegangen.",
        options: [],
        answer: 0,
        accept: ["sei"],
        explain: "İki ifade de aynı kipte; tutanak taraf tutmuyor.",
      },
      {
        text: "Was ist laut Frau Ott der eigentliche Sachverhalt?",
        options: [
          "Dass die Mail nicht ankam",
          "Dass zwei Aussagen nebeneinanderstehen, die nicht übereinstimmen",
          "Dass Herr Baumann recht hat",
        ],
        answer: 1,
        explain: "Çelişkinin kendisi kayda geçirilecek olgu.",
      },
      {
        kind: "dictation",
        text: "Frau Ott'un tarafsızlığı gerekçelendirdiği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Wenn ich Partei ergreife, ist das Protokoll später wertlos.",
          "Wenn ich Partei ergreife, ist das Protokoll später wertlos",
        ],
        explain: "Tarafsızlık bir erdem değil, belgenin kullanılabilirlik koşulu.",
      },
    ],
  },
  {
    id: "c1-u11-l2",
    level: "C1",
    skill: "listening",
    unit: 11,
    title: "Wer sagt das?",
    genre: "Diyalog",
    intro: "Bir çalışma paylaşılıyor. Kaynak nasıl sınanıyor?",
    gloss: [
      { de: "die Primärquelle", tr: "birincil kaynak", en: "primary source" },
      { de: "nachprüfbar", tr: "doğrulanabilir", en: "verifiable" },
      { de: "die Interessenlage", tr: "çıkar durumu", en: "vested interests" },
      { de: "verlässlich", tr: "güvenilir", en: "reliable" },
      { de: "bezweifeln", tr: "kuşku duymak", en: "to doubt" },
      { de: "hinterfragen", tr: "sorgulamak", en: "to question" },
      { de: "der Befund", tr: "bulgu", en: "finding" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kaan", text: "Hast du die Studie gesehen? Achtzig Prozent der Betriebe sagen, die Regelung sei praxisfern." },
      { speaker: "Frau Nolte", text: "Wer hat sie in Auftrag gegeben?" },
      { speaker: "Kaan", text: "Ein Branchenverband." },
      { speaker: "Frau Nolte", text: "Dann hinterfragen wir nicht den Befund, sondern die Frage, die gestellt wurde." },
      { speaker: "Kaan", text: "Ich bezweifle die Zahl nicht." },
      { speaker: "Frau Nolte", text: "Ich auch nicht. Aber wenn man fragt „Halten Sie die Regelung für praxisfern?“, bekommt man andere achtzig Prozent als bei „Welche drei Vorschriften kosten Sie am meisten Zeit?“" },
      { speaker: "Kaan", text: "Steht die Frageformulierung drin?" },
      { speaker: "Frau Nolte", text: "Genau das ist der Test. Wenn ja, ist die Studie nachprüfbar. Wenn nicht, ist sie eine Behauptung mit Prozentzeichen." },
      { speaker: "Kaan", text: "Und die Interessenlage disqualifiziert sie nicht?" },
      { speaker: "Frau Nolte", text: "Nein. Auch ein Verband kann sauber erheben. Sie verlangt nur, dass wir die Primärquelle lesen statt der Pressemitteilung." },
      { speaker: "Kaan", text: "Die Pressemitteilung war es, ja." },
      { speaker: "Frau Nolte", text: "Dann fangen wir dort an. Verlässlich ist eine Zahl erst, wenn man weiß, worauf sie antwortet." },
    ],
    questions: [
      {
        text: "Was hinterfragt Frau Nolte?",
        options: [
          "Die Zahl selbst",
          "Die gestellte Frage",
          "Die Anzahl der Betriebe",
        ],
        answer: 1,
        explain: "„nicht den Befund, sondern die Frage, die gestellt wurde“.",
      },
      {
        kind: "gapfill",
        text: "Wenn nicht, ist sie eine Behauptung mit ___.",
        options: [],
        answer: 0,
        accept: ["Prozentzeichen"],
        explain: "Yöntemi görünmeyen rakam, iddiadan fazlası değil.",
      },
      {
        text: "Disqualifiziert die Interessenlage die Studie?",
        options: [
          "Ja, ein Verband kann nicht neutral erheben.",
          "Nein, aber sie verlangt, die Primärquelle zu lesen.",
          "Nur wenn die Zahl hoch ist.",
        ],
        answer: 1,
        explain: "„Auch ein Verband kann sauber erheben.“ Çıkar durumu şüphe değil, dikkat gerektiriyor.",
      },
      {
        kind: "short_answer",
        text: "Wann ist eine Zahl laut Frau Nolte verlässlich?",
        options: [],
        answer: 0,
        accept: [
          "wenn die Frage bekannt ist",
          "wenn man weiß, worauf sie antwortet",
          "erst wenn man die Frage kennt",
        ],
        explain: "Rakamın anlamı sorusunda saklı.",
      },
    ],
  },
  {
    id: "c1-u11-w1",
    level: "C1",
    skill: "writing",
    unit: 11,
    title: "Aktarım kipi ve sorumluluk",
    genre: "Dil bilgisi",
    intro: "Konjunktiv I aktaranı iddianın dışında bırakır — bildirme kipi bırakmaz.",
    gloss: [
      { de: "sich distanzieren", tr: "mesafe koymak", en: "to distance oneself" },
      { de: "zuschreiben", tr: "atfetmek", en: "to attribute" },
      { de: "vertuschen", tr: "örtbas etmek", en: "to cover up" },
      { de: "dementieren", tr: "yalanlamak", en: "to deny" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Müdür cuma günü yurt dışında olduğunu söylüyor.",
        answer: "Der Geschäftsführer sagt, er sei am Freitag im Ausland gewesen",
        hint: "Konjunktiv I: sei + Partizip.",
      },
      {
        kind: "build",
        tr: "İtfaiyenin verdiği bilgiye göre alarm 21:14'te gelmiş.",
        answer: "Laut Angaben der Feuerwehr sei der Alarm um 21:14 Uhr eingegangen",
        hint: "Kaynak belirtilince fiil aktarım kipine geçer.",
      },
      {
        kind: "build",
        tr: "Mal sahibi haberleri yalanladı.",
        answer: "Der Eigentümer dementierte die Berichte",
        hint: "Yalanlamanın kendisi olgu; bildirme kipinde kalır.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: yazar başkasının suçlamasını kendi iddiası gibi yazmış.",
        source: "Nach Angaben der Anwohner hat die Firma die Messwerte vertuscht.",
        answer: "Nach Angaben der Anwohner habe die Firma die Messwerte vertuscht.",
        alternatives: ["Nach Angaben der Anwohner habe die Firma die Messwerte vertuscht"],
        why: "Bildirme kipiyle yazınca suçlamayı gazete kendi üstlenir; kaynak belirtmek yetmez. Konjunktiv I iddiayı sahibine bağlar ve aktaranı hukuki olarak da dışarıda tutar.",
      },
    ],
  },
  {
    id: "c1-u11-w2",
    level: "C1",
    skill: "writing",
    unit: 11,
    title: "Ein Bericht, zwei Aussagen",
    genre: "Kurum yazısı",
    intro: "Çelişkili iki ifadeyi taraf tutmadan kaydet.",
    gloss: [
      { de: "übereinstimmen", tr: "örtüşmek", en: "to match" },
      { de: "der Sachverhalt", tr: "olgu", en: "the facts" },
      { de: "nachprüfbar", tr: "doğrulanabilir", en: "verifiable" },
      { de: "einordnen", tr: "yerine oturtmak", en: "to contextualise" },
      { de: "vorliegen", tr: "mevcut olmak", en: "to be available" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki iki ifadeyi bir tutanak notunda kaydet. Kurallar: iki ifadeyi de Konjunktiv I ile aktar, kendi gözlemin varsa onu bildirme kipinde yaz ve açıkça ayır, taraf tutma, sonunda neyin doğrulanabilir olduğunu ve nasıl doğrulanacağını yaz.",
        stimulus:
          "İFADELER\n\n" +
          "Herr Weiss (Lager): Die Lieferung sei am 12. Mai um 7:30 Uhr angekommen und vollständig gewesen. Er habe den Lieferschein unterschrieben.\n\n" +
          "Frau Adam (Einkauf): Bei der Prüfung am 13. Mai hätten zwei Kartons gefehlt. Der Lieferschein weise 14 Kartons aus, gezählt worden seien 12.\n\n" +
          "SENİN GÖZLEMİN: Lieferschein'i gördün, üstünde 14 yazıyor ve imza var. Kartonları saymadın.",
        checklist: [
          "İki ifade de Konjunktiv I ile mi aktarıldı?",
          "Kendi gözlemin bildirme kipinde ve ayrı mı?",
          "Taraf tutulmadı mı?",
          "Doğrulama yolu somut olarak yazıldı mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Herr Weiss gibt an, die Lieferung sei …", tr: "Weiss Bey teslimatın … olduğunu belirtiyor", en: "Mr Weiss states that the delivery was …" },
          { de: "Die Aussagen stimmen in einem Punkt nicht überein.", tr: "ifadeler bir noktada örtüşmüyor", en: "the statements do not match on one point" },
          { de: "Nachprüfbar ist dies durch …", tr: "bu şununla doğrulanabilir", en: "this can be verified by …" },
        ],
        sample:
          "AKTENNOTIZ — Lieferung vom 12. Mai\n\n" +
          "Herr Weiss (Lager) gibt an, die Lieferung sei am 12. Mai gegen 7:30 Uhr eingetroffen und vollständig gewesen; er habe den Lieferschein daraufhin unterschrieben.\n\n" +
          "Frau Adam (Einkauf) erklärt, bei der Prüfung am folgenden Tag hätten zwei Kartons gefehlt. Der Lieferschein weise vierzehn Kartons aus, gezählt worden seien zwölf.\n\n" +
          "Die beiden Aussagen stimmen in einem Punkt nicht überein: im Zustand der Lieferung zum Zeitpunkt der Übergabe. Zum Zeitpunkt der Zählung selbst liegen keine widersprüchlichen Angaben vor, da nur eine Seite gezählt hat.\n\n" +
          "Eigene Feststellung: Mir liegt der Lieferschein vor. Er weist vierzehn Kartons aus und trägt eine Unterschrift. Die Kartons habe ich nicht selbst gezählt.\n\n" +
          "Nachprüfbar ist der Sachverhalt über zwei Wege: die Wiegeprotokolle des Spediteurs vom 12. Mai und die Aufzeichnung der Rampenkamera zwischen 7:00 und 8:00 Uhr. Beides ist bis zum 30. Mai verfügbar; ich habe die Sicherung heute angefordert.",
      },
    ],
  },
];
