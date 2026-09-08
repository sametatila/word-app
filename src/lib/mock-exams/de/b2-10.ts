import type { MockPaper } from "../types";

/**
 * B2 · Deneme 10 — "Zahlen und Vertrauen".
 *
 * PLAN kâğıt 1–9 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme · 6 köşe yazısı
 *                              · 6 görüş eşleştirme · 3 yönetmelik)
 *   Hören  40 dk · 30 madde   (10 karma · 6 söyleşi · 6 tartışma · 8 ana fikir)
 *   Schreiben 75 dk           okur mektubu (~150) + yarı resmî ileti (~100)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: sayılar ve güven. B2 kâğıtlarında sayı hep bir ayrıntıydı;
 * burada konunun kendisi. Ortalamanın neyi gizlediğini görmek, bir oranın
 * paydasını sormak, bir artışın ölçme değişikliğinden mi geldiğini ayırmak —
 * bunlar B2'nin okuma becerisinin merkezinde.
 *
 * DİKKAT EDİLEN: metinler istatistiğe güvenmemeyi öğretmiyor. Her metin bir
 * sayının nasıl okunacağını gösteriyor; şüphe değil, ayrım öğretiliyor.
 *
 * AÇIKLAMALAR bu kâğıtta baştan alıntıyla yazıldı — B2-09'da cümle yerleştirme
 * görevinin beş açıklaması parafraz kaldığı için denetim hepsini işaretlemişti.
 */
export const B2_10: MockPaper = {
  id: "de-b2-10",
  course: "de",
  level: "B2",
  no: 10,
  theme: "Zahlen und Vertrauen",
  themeTr: "Sayılar ve güven",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Texte, einen Sachtext mit Lücken, einen Kommentar, Meinungsbeiträge und eine Richtlinie.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel metinler, boşluklu bir bilgi metni, bir köşe yazısı, görüş yazıları ve bir yönerge okuyacaksın.",
      tasks: [
        {
          id: "de-b2-10-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben darüber, wie sie beruflich mit Zahlen umgehen. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi mesleklerinde sayılarla nasıl çalıştıklarını yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Rehberg, Statistikerin im Landesamt",
              body: `Die häufigste Frage an mich lautet, ob eine Zahl stimmt. Die richtige Frage wäre, was sie zählt.

Wir haben vor drei Jahren die Erhebung zur Wohnungslosigkeit umgestellt. Seitdem sind die Zahlen um vierzig Prozent höher. Verändert hat sich nicht die Lage, sondern die Definition.

Das erkläre ich in jedem Bericht, meistens auf Seite zwei. Zitiert wird trotzdem die Zahl von Seite eins.

Was mich stört, ist nicht die Verkürzung. Es ist die Empörung darüber, dass wir angeblich vorher falsch gezählt hätten. Wir haben anders gezählt, und das steht schwarz auf weiß.`,
              gloss: [
                { de: "die Erhebung", tr: "veri toplama", en: "survey, data collection" },
                { de: "umstellen", tr: "yöntemi değiştirmek", en: "to change over" },
                { de: "die Verkürzung", tr: "kısaltma, basitleştirme", en: "abbreviation, simplification" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Kaltschmidt, Redakteur",
              body: `In meiner Redaktion gilt eine einfache Regel: Keine Prozentzahl ohne die absolute Zahl daneben.

Sie klingt banal und ist erstaunlich unbeliebt. Eine Verdopplung sieht dramatisch aus, bis daneben steht, dass es um zwei Fälle statt einem geht.

Ich verteidige diese Regel auch gegen mich selbst. Meine besten Überschriften sind die, die ich nach dieser Prüfung streichen musste.

Am schwersten fällt sie bei Themen, die uns wichtig sind. Wer eine Sache voranbringen will, greift zur größeren Zahl — auch ohne böse Absicht.`,
              gloss: [
                { de: "die Verdopplung", tr: "iki katına çıkma", en: "doubling" },
                { de: "voranbringen", tr: "ilerletmek", en: "to advance" },
                { de: "die Absicht", tr: "niyet", en: "intention" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Uzun, Ärztin",
              body: `Patientinnen fragen mich oft nach der Wahrscheinlichkeit. Ich habe gelernt, nicht mit Prozent zu antworten.

Wenn ich sage, das Risiko steige um fünfzig Prozent, hört jemand etwas Bedrohliches. Wenn ich sage, es steige von zwei auf drei von tausend, hört dieselbe Person etwas anderes. Beides ist richtig.

Das ist keine Beruhigungstechnik. Es ist die einzige Form, in der die Zahl das leistet, wofür sie gedacht ist: eine Entscheidung zu stützen.

Was ich nicht schaffe, ist die Zeit. Ein solches Gespräch dauert zehn Minuten, und ich habe im Schnitt sieben.`,
              gloss: [
                { de: "die Wahrscheinlichkeit", tr: "olasılık", en: "probability" },
                { de: "bedrohlich", tr: "tehditkâr", en: "threatening" },
                { de: "stützen", tr: "desteklemek", en: "to support" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Dellwig, Lehrer",
              body: `Am Elternabend zeige ich seit Jahren keinen Notendurchschnitt mehr.

Der Grund ist nicht, dass er falsch wäre. Er ist richtig und sagt fast nichts. In einer Klasse mit dem Schnitt drei kann jeder eine Drei haben oder die Hälfte eine Eins und die Hälfte eine Fünf.

Stattdessen zeige ich die Verteilung. Das dauert länger und führt zu unangenehmeren Fragen, aber es sind die richtigen.

Widerstand kam anfangs nicht von den Eltern, sondern aus dem Kollegium. Eine Verteilung zeigt auch, wie unterschiedlich wir bewerten.`,
              gloss: [
                { de: "der Notendurchschnitt", tr: "not ortalaması", en: "grade average" },
                { de: "die Verteilung", tr: "dağılım", en: "distribution" },
                { de: "bewerten", tr: "değerlendirmek, not vermek", en: "to grade, assess" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-10-l1-1",
              no: 1,
              text: "Wer nennt eine Regel, die auch gegen die eigenen Interessen gilt?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 1,
              explain:
                "\"Ich verteidige diese Regel auch gegen mich selbst\" — en iyi başlıklarını bu denetimden sonra silmek zorunda kalmış.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-2",
              no: 2,
              text: "Wer beschreibt Widerstand aus dem eigenen Berufsfeld?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 3,
              explain:
                "\"Widerstand kam anfangs nicht von den Eltern, sondern aus dem Kollegium\" — çünkü dağılım değerlendirme farklarını da gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-3",
              no: 3,
              text: "Wer erklärt einen Anstieg mit einer geänderten Definition?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 0,
              explain:
                "\"Seitdem sind die Zahlen um vierzig Prozent höher. Verändert hat sich nicht die Lage, sondern die Definition.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-4",
              no: 4,
              text: "Wer nennt zwei richtige Darstellungen desselben Risikos?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 2,
              explain:
                "Yüzde elli artış ile \"von zwei auf drei von tausend\" aynı şeyi anlatıyor: \"Beides ist richtig.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-5",
              no: 5,
              text: "Wer sagt, dass eine richtige Zahl fast nichts aussagen kann?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 3,
              explain:
                "\"Er ist richtig und sagt fast nichts\" — üç ortalamasıyla bir sınıfta herkes üç alabilir ya da yarısı bir yarısı beş.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-6",
              no: 6,
              text: "Wer ärgert sich über einen Vorwurf, der auf einem Missverständnis beruht?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 0,
              explain:
                "\"Es ist die Empörung darüber, dass wir angeblich vorher falsch gezählt hätten. Wir haben anders gezählt.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-7",
              no: 7,
              text: "Wer nennt Zeit als das eigentliche Hindernis?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 2,
              explain:
                "\"Ein solches Gespräch dauert zehn Minuten, und ich habe im Schnitt sieben\" — yöntem doğru ama süre yetmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-8",
              no: 8,
              text: "Wer sagt, dass die Versuchung zur größeren Zahl ohne böse Absicht entsteht?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 1,
              explain:
                "\"Wer eine Sache voranbringen will, greift zur größeren Zahl — auch ohne böse Absicht.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l1-9",
              no: 9,
              text: "Wer erklärt seine Methode regelmäßig, ohne dass es ankommt?",
              options: ["Frau Rehberg", "Herr Kaltschmidt", "Frau Uzun", "Herr Dellwig"],
              answer: 0,
              explain:
                "\"Das erkläre ich in jedem Bericht, meistens auf Seite zwei. Zitiert wird trotzdem die Zahl von Seite eins.\"",
            },
          ],
        },
        {
          id: "de-b2-10-l2",
          no: 2,
          format: "match",
          goal: "structure",
          prompt:
            "Lesen Sie den Text. In den Lücken 10 bis 15 fehlt jeweils ein Satz. Welcher Satz a bis h passt in welche Lücke? Zwei Sätze passen nirgends.",
          promptTr:
            "Metni oku. 10–15. boşluklarda birer cümle eksik. a–h cümlelerinden hangisi hangi boşluğa uyar? İki cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Sachtext",
              genreTr: "Bilgi metni",
              title: "Was ein Durchschnitt verschweigt",
              body: `Kaum eine Zahl wird so oft genannt und so selten geprüft wie der Durchschnitt. Er hat einen unschlagbaren Vorteil: Er ist eine einzige Zahl. {{10}}

Das erste Problem betrifft die Streuung. Zwei Gruppen können denselben Mittelwert haben und trotzdem nichts gemeinsam. {{11}}

Das zweite Problem ist der Ausreißer. Ein einzelner sehr großer Wert zieht den Durchschnitt nach oben, ohne dass sich für die Mehrheit etwas ändert. {{12}}

Hinzu kommt die Frage nach der Grundgesamtheit. Ein Durchschnitt gilt immer nur für die Menge, aus der er berechnet wurde. {{13}}

Auffällig ist, wie selten die Alternative genannt wird. Der Median teilt eine Verteilung in zwei gleich große Hälften und reagiert kaum auf einzelne Extremwerte. {{14}}

Aus alldem folgt kein Verzicht auf den Durchschnitt. Es folgt eine Gewohnheit: Wer einen Mittelwert nennt, sollte eine zweite Zahl danebenstellen. {{15}}

Was bleibt, ist eine unbequeme Erkenntnis: Die Zahl, die am leichtesten zu merken ist, ist selten die, die am meisten erklärt.`,
              gloss: [
                { de: "die Streuung", tr: "yayılım", en: "spread, dispersion" },
                { de: "der Ausreißer", tr: "aykırı değer", en: "outlier" },
                { de: "die Grundgesamtheit", tr: "ana kütle", en: "population" },
                { de: "der Median", tr: "ortanca", en: "median" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Genau diese Sparsamkeit macht ihn beliebt und zugleich gefährlich.",
            },
            {
              key: "b",
              label: "b",
              body: "Wer den Kreis der Befragten nicht kennt, kennt auch die Aussage nicht.",
            },
            {
              key: "c",
              label: "c",
              body: "Die eine kann aus lauter mittleren Werten bestehen, die andere aus lauter extremen.",
            },
            {
              key: "d",
              label: "d",
              body: "Trotzdem taucht er in Berichten deutlich seltener auf als der Mittelwert.",
            },
            {
              key: "e",
              label: "e",
              body: "In kleinen Gruppen genügt dafür bereits ein einziger Fall.",
            },
            {
              key: "f",
              label: "f",
              body: "Welche das ist, hängt davon ab, was der Leser mit der Zahl anfangen soll.",
            },
            { key: "g", label: "g", body: "Die Zahl der veröffentlichten Statistiken ist zuletzt deutlich gestiegen." },
            { key: "h", label: "h", body: "Über die Methode entscheidet in der Regel das zuständige Ministerium." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-10-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "a",
              explain:
                "Önceki cümle avantajı veriyor: \"Er ist eine einzige Zahl\". (a) bu tasarrufun iki yüzünü birden söylüyor: \"macht ihn beliebt und zugleich gefährlich\" — ve sonraki paragraflar tam o tehlikeyi sayıyor.",
            },
            {
              kind: "match",
              id: "de-b2-10-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "c",
              explain:
                "İddia veriliyor: \"denselben Mittelwert haben und trotzdem nichts gemeinsam\". (c) bunu örnekliyor: \"aus lauter mittleren Werten … aus lauter extremen\".",
            },
            {
              kind: "match",
              id: "de-b2-10-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "e",
              explain:
                "Aykırı değer paragrafı \"Ein einzelner sehr großer Wert\" diyor; (e) bunu ölçekle bağlıyor: \"In kleinen Gruppen genügt dafür bereits ein einziger Fall.\"",
            },
            {
              kind: "match",
              id: "de-b2-10-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "b",
              explain:
                "Paragraf ana kütleyi konu ediyor: \"gilt immer nur für die Menge, aus der er berechnet wurde\". (b) sonucu çıkarıyor: \"Wer den Kreis der Befragten nicht kennt, kennt auch die Aussage nicht.\"",
            },
            {
              kind: "match",
              id: "de-b2-10-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "d",
              explain:
                "Medyanın üstünlüğü sayıldıktan sonra bir karşıtlık gerekiyor; (d) onu veriyor: \"taucht er in Berichten deutlich seltener auf als der Mittelwert\" — bu da \"wie selten die Alternative genannt wird\" cümlesini kapatıyor.",
            },
            {
              kind: "match",
              id: "de-b2-10-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "f",
              explain:
                "Öneri \"eine zweite Zahl danebenstellen\" diyor ama hangisi olduğunu söylemiyor; (f) tam bunu tamamlıyor: \"Welche das ist, hängt davon ab, was der Leser mit der Zahl anfangen soll.\"",
            },
          ],
        },
        {
          id: "de-b2-10-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Kommentar und die Aufgaben 16 bis 21. Wählen Sie: a, b oder c.",
          promptTr: "Köşe yazısını ve 16–21. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "k1",
              genre: "Kommentar",
              genreTr: "Köşe yazısı",
              title: "Die Zahl, die niemand nachrechnet",
              body: `Seit Wochen kursiert in unserer Stadt eine Zahl: Die Zahl der Einbrüche sei um sechzig Prozent gestiegen. Sie steht auf Plakaten, in Reden und inzwischen in einem Antrag.

Nachgerechnet hat sie offenbar niemand. Die sechzig Prozent beziehen sich auf ein Quartal, nicht auf ein Jahr, und sie vergleichen mit dem schwächsten Quartal seit zwölf Jahren. Gegenüber demselben Quartal des Vorjahres beträgt der Anstieg elf Prozent.

Elf Prozent sind keine gute Nachricht. Sie sind aber eine andere Nachricht, und sie führen zu anderen Maßnahmen.

Man wird einwenden, das sei Haarspalterei; steigend bleibe steigend. Der Einwand hat einen wahren Kern: Die Richtung stimmt in beiden Fällen. Nur bemisst sich die Höhe der Ausgaben nicht an der Richtung, sondern am Ausmaß.

Bemerkenswert ist, wie die Zahl entstanden ist. Nicht durch Erfindung, sondern durch Auswahl — jemand hat den Vergleichszeitraum gewählt, der die größte Zahl ergab. Das ist nicht strafbar und in der politischen Kommunikation üblich.

Mich überzeugt der Hinweis auf die Üblichkeit nicht, und ich nehme mich nicht aus. Auch in dieser Zeitung haben wir Quartalszahlen zitiert, wenn sie deutlicher aussahen.

Mein Vorschlag ist deshalb bescheiden: Wer eine Veränderung nennt, nennt den Vergleichszeitraum im selben Satz. Nicht in der Fußnote, im selben Satz.`,
              gloss: [
                { de: "kursieren", tr: "dolaşımda olmak", en: "to circulate" },
                { de: "die Haarspalterei", tr: "kılı kırk yarma", en: "hairsplitting" },
                { de: "das Ausmaß", tr: "boyut, ölçek", en: "extent, scale" },
                { de: "der Vergleichszeitraum", tr: "karşılaştırma dönemi", en: "comparison period" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-10-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie ist die Zahl von sechzig Prozent zustande gekommen?",
              options: [
                "Durch einen Rechenfehler der Behörde.",
                "Durch eine bewusste Erfindung.",
                "Durch die Wahl des Zeitraums.",
              ],
              answer: 2,
              explain:
                "\"Nicht durch Erfindung, sondern durch Auswahl — jemand hat den Vergleichszeitraum gewählt, der die größte Zahl ergab.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l3-17",
              no: 17,
              ref: "k1",
              text: "Wie hoch ist der Anstieg im Jahresvergleich?",
              options: ["Elf Prozent.", "Sechzig Prozent.", "Zwölf Prozent."],
              answer: 0,
              explain:
                "\"Gegenüber demselben Quartal des Vorjahres beträgt der Anstieg elf Prozent\" — on iki, karşılaştırılan zayıf çeyreğin kaç yıl geriye gittiği.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l3-18",
              no: 18,
              ref: "k1",
              text: "Wie geht der Autor mit dem Vorwurf der Haarspalterei um?",
              options: [
                "Er nennt den Einwand Haarspalterei.",
                "Er stimmt ihm zum Teil zu.",
                "Er hält den Einwand für unehrlich.",
              ],
              answer: 1,
              explain:
                "\"Der Einwand hat einen wahren Kern: Die Richtung stimmt in beiden Fällen\" — ama harcamanın ölçüsü yöne değil boyuta bağlı.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l3-19",
              no: 19,
              ref: "k1",
              text: "Warum ist der Unterschied nach ihm praktisch bedeutsam?",
              options: [
                "Weil die Richtung sich dadurch umkehrt.",
                "Weil die Zahl sonst falsch wäre.",
                "Weil davon die Ausgaben abhängen.",
              ],
              answer: 2,
              explain:
                "\"Nur bemisst sich die Höhe der Ausgaben nicht an der Richtung, sondern am Ausmaß.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l3-20",
              no: 20,
              ref: "k1",
              text: "Wie verhält sich der Autor zum Hinweis auf die Üblichkeit?",
              options: [
                "Er lässt ihn nicht gelten und schließt sich ein.",
                "Er akzeptiert ihn für die Politik.",
                "Er hält ihn für strafrechtlich bedenklich.",
              ],
              answer: 0,
              explain:
                "\"Mich überzeugt der Hinweis auf die Üblichkeit nicht, und ich nehme mich nicht aus\" — kendi gazetesinin de çeyrek verilerini kullandığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l3-21",
              no: 21,
              ref: "k1",
              text: "Was schlägt er vor?",
              options: [
                "Prozentangaben in Fußnoten zu vermeiden.",
                "Die verglichene Zeitspanne mitzunennen.",
                "Zahlen vor der Rede amtlich prüfen zu lassen.",
              ],
              answer: 1,
              explain:
                "Öneriyi iki kez vurguluyor: \"nennt den Vergleichszeitraum im selben Satz. Nicht in der Fußnote, im selben Satz.\"",
            },
          ],
        },
        {
          id: "de-b2-10-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Behörden ihre Rohdaten grundsätzlich veröffentlichen sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, kurumların ham verilerini ilke olarak yayımlaması gerekip gerekmediği konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Marquardt, Statistikerin",
              body: "Ich veröffentliche gern, aber Rohdaten ohne Methodenbericht sind kein Gewinn. Wer die Fragebogenformulierung nicht kennt, rechnet mit den Zahlen Dinge aus, die sie nie hergegeben haben.",
            },
            {
              key: "b",
              label: "b — Herr Sebald, Datenjournalist",
              body: "Der Einwand mit der Methode ist berechtigt und wird trotzdem als Vorwand benutzt. In den drei Fällen, in denen wir Daten erstritten haben, kam die Warnung vor Missbrauch jedes Mal zuerst und der Methodenbericht nie.",
            },
            {
              key: "c",
              label: "c — Frau Ilkay, Datenschutzbeauftragte",
              body: "Bei kleinen Gemeinden lässt sich aus vermeintlich anonymen Zahlen die einzelne Person rekonstruieren. Das ist kein theoretisches Risiko; wir hatten den Fall zweimal.",
            },
            {
              key: "d",
              label: "d — Herr Wohlrab, Bürgermeister",
              body: "Ich habe die Veröffentlichung eingeführt und nach einem Jahr eingeschränkt. Nicht wegen des Missbrauchs, sondern weil meine Verwaltung die Anfragen zu den Daten nicht mehr bewältigt hat.",
            },
            {
              key: "e",
              label: "e — Frau Detering, Forscherin",
              body: "Ohne Rohdaten lässt sich keine Auswertung überprüfen. Solange nur Ergebnisse veröffentlicht werden, müssen wir jeder Behörde glauben — und genau das ist das Gegenteil von Wissenschaft.",
            },
            {
              key: "f",
              label: "f — Herr Baranek, Softwareentwickler",
              body: "Technisch ist das Ganze in einer Woche gelöst. Was Jahre dauert, ist die Frage, wer haftet, wenn jemand mit den Daten etwas Falsches behauptet. Diese Frage stellt niemand rechtzeitig.",
            },
            {
              key: "g",
              label: "g — Frau Zeidler, Amtsleiterin",
              body: "Meine Sorge ist nicht die Öffentlichkeit, sondern die Vergleichbarkeit. Sobald unsere Zahlen neben denen anderer Städte stehen, werden wir an Definitionen gemessen, die wir nie verwendet haben.",
            },
            {
              key: "h",
              label: "h — Herr Trautner, Rentner",
              body: "Ich verstehe beide Seiten und habe deshalb keine feste Meinung. Sicher ist mir nur, dass die Debatte weitgehend unter Fachleuten geführt wird.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-10-l4-22",
              no: 22,
              text: "Daten ohne Erläuterung der Methode führen zu falschen Berechnungen.",
              answer: "a",
              explain:
                "(a) sorunu adlandırıyor: anket sorusunun biçimini bilmeyen \"rechnet mit den Zahlen Dinge aus, die sie nie hergegeben haben\".",
            },
            {
              kind: "match",
              id: "de-b2-10-l4-23",
              no: 23,
              text: "Ein berechtigter Einwand wird in der Praxis als Ausrede verwendet.",
              answer: "b",
              explain:
                "(b) itirazın haklılığını kabul edip kullanımını eleştiriyor: uyarı hep önce gelmiş, yöntem raporu \"nie\".",
            },
            {
              kind: "match",
              id: "de-b2-10-l4-24",
              no: 24,
              text: "In kleinen Einheiten lassen sich Einzelpersonen wiedererkennen.",
              answer: "c",
              explain:
                "(c) bunu kuramsal saymıyor: \"wir hatten den Fall zweimal\".",
            },
            {
              kind: "match",
              id: "de-b2-10-l4-25",
              no: 25,
              text: "Die Einschränkung erfolgte aus Kapazitätsgründen, nicht wegen Missbrauchs.",
              answer: "d",
              explain:
                "(d) gerekçeyi kendisi ayırıyor: \"Nicht wegen des Missbrauchs, sondern weil meine Verwaltung die Anfragen … nicht mehr bewältigt hat.\"",
            },
            {
              kind: "match",
              id: "de-b2-10-l4-26",
              no: 26,
              text: "Ohne Zugang zu den Daten bleibt nur das Vertrauen in die Stelle, die sie erhoben hat.",
              answer: "e",
              explain:
                "(e) bunu bilimle karşı karşıya koyuyor: \"müssen wir jeder Behörde glauben — und genau das ist das Gegenteil von Wissenschaft\".",
            },
            {
              kind: "match",
              id: "de-b2-10-l4-27",
              no: 27,
              text: "Die eigentliche Verzögerung liegt bei der Haftungsfrage, nicht bei der Technik.",
              answer: "f",
              explain:
                "(f) süreleri karşılaştırıyor: teknik bir haftada çözülüyor, yıllar alan şey \"wer haftet, wenn jemand mit den Daten etwas Falsches behauptet\".",
            },
          ],
        },
        {
          id: "de-b2-10-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Richtlinie und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Yönergeyi ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Veröffentlichungsrichtlinie",
              genreTr: "Yayımlama yönergesi",
              title: "Richtlinie zur Veröffentlichung statistischer Auswertungen — Auszug",
              body: `§1 Grundsatz
Auswertungen werden veröffentlicht, sobald sie geprüft sind. Eine Veröffentlichung ohne Methodenbericht ist unzulässig; der Bericht ist Teil der Veröffentlichung und nicht Anlage.

§2 Schutz kleiner Fallzahlen
Werte, die auf weniger als fünf Fällen beruhen, werden nicht ausgewiesen. Ersatzweise wird die nächsthöhere Zusammenfassung veröffentlicht. Eine Ausweisung als Null ist ausgeschlossen, da sie eine Aussage enthielte.

§3 Korrekturen
Fehler werden binnen fünf Werktagen nach Feststellung korrigiert. Die ursprüngliche Fassung bleibt abrufbar und wird als überholt gekennzeichnet; eine Entfernung findet nicht statt.

§4 Vergleiche
Bei Zeitvergleichen ist der Vergleichszeitraum im Fließtext zu nennen. Wurde die Erhebungsmethode geändert, ist auf die eingeschränkte Vergleichbarkeit an derselben Stelle hinzuweisen.`,
              gloss: [
                { de: "die Anlage", tr: "ek", en: "annex, attachment" },
                { de: "ausweisen", tr: "(veriyi) göstermek", en: "to report, show" },
                { de: "überholt", tr: "geçerliliğini yitirmiş", en: "superseded" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-10-l5-28",
              no: 28,
              ref: "o1",
              text: "Welchen Status hat der Methodenbericht?",
              options: [
                "Er ist eine Anlage zur Auswertung.",
                "Er gehört zur Veröffentlichung selbst.",
                "Er wird nur auf Anfrage erstellt.",
              ],
              answer: 1,
              explain:
                "§1 bunu açıkça ayırıyor: \"der Bericht ist Teil der Veröffentlichung und nicht Anlage\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l5-29",
              no: 29,
              ref: "o1",
              text: "Was geschieht mit Werten unter fünf Fällen?",
              options: [
                "Sie werden als Null ausgewiesen.",
                "Sie werden ohne Kennzeichnung übernommen.",
                "Es wird gröber zusammengefasst.",
              ],
              answer: 2,
              explain:
                "§2 yerine geçen yolu veriyor: \"Ersatzweise wird die nächsthöhere Zusammenfassung veröffentlicht\" — sıfır göstermek ise açıkça yasak.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-l5-30",
              no: 30,
              ref: "o1",
              text: "Was passiert mit einer fehlerhaften Fassung?",
              options: [
                "Sie bleibt gekennzeichnet abrufbar.",
                "Sie wird nach der Feststellung entfernt.",
                "Sie wird nach fünf Werktagen ersetzt.",
              ],
              answer: 0,
              explain:
                "§3 iki şeyi birlikte söylüyor: eski sürüm erişilebilir kalıyor, \"als überholt gekennzeichnet; eine Entfernung findet nicht statt\".",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Interview, eine Diskussion und acht kurze Beiträge.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir söyleşi, bir tartışma ve sekiz kısa parça dinleyeceksin.",
      tasks: [
        {
          id: "de-b2-10-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage im Landesamt",
              genreTr: "Eyalet dairesinde anons",
              situation: "Bir yayın ertelendi.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für die Presse: Die für heute angekündigte Auswertung erscheint erst am Freitag. Der Grund ist ein Fehler in der Zuordnung zweier Altersgruppen. Die Zahlen selbst sind unverändert, nur ihre Aufteilung war falsch.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Bir artışın nedeni açıklanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Die gemeldeten Fälle sind im Landkreis um dreißig Prozent gestiegen. Die Behörde weist darauf hin, dass seit Januar auch telefonische Meldungen gezählt werden, die vorher nicht erfasst wurden. Wie groß der tatsächliche Anstieg ist, lässt sich derzeit nicht sagen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir veri talebi yanıtlanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Sebald, hier ist das Amt für Statistik. Ihre Anfrage können wir teilweise erfüllen. Die Jahreswerte bekommen Sie, die Monatswerte nicht — bei den kleinen Gemeinden liegen wir dort unter fünf Fällen. Den Methodenbericht schicken wir mit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Sitzung",
              genreTr: "Oturumda duyuru",
              situation: "Bir rakamın kaynağı soruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir abstimmen, eine Bitte: Die im Antrag genannten sechzig Prozent stammen aus einem Quartalsvergleich. Ich schlage vor, dass wir die Jahreszahl nachreichen lassen und erst danach entscheiden. Der Antrag selbst bleibt auf der Tagesordnung.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir düzeltme bildiriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Detering, hier ist die Redaktion. Wir haben Ihren Hinweis geprüft und geben Ihnen recht: Die Prozentangabe war auf die falsche Grundgesamtheit bezogen. Die Korrektur erscheint morgen, die alte Fassung bleibt gekennzeichnet online.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-10-h1-1",
              no: 1,
              ref: "h1",
              text: "Die Zahlen selbst mussten korrigiert werden.",
              answer: false,
              explain:
                "Anons ikisini ayırıyor: \"Die Zahlen selbst sind unverändert, nur ihre Aufteilung war falsch.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h1-2",
              no: 2,
              ref: "h1",
              text: "Warum verschiebt sich die Veröffentlichung?",
              options: [
                "Wegen fehlender Daten aus den Gemeinden.",
                "Wegen einer Krankheit im Team.",
                "Wegen einer falschen Zuordnung.",
              ],
              answer: 2,
              explain:
                "Gerekçe tek cümlede: \"ein Fehler in der Zuordnung zweier Altersgruppen\".",
            },
            {
              kind: "bool",
              id: "de-b2-10-h1-3",
              no: 3,
              ref: "h2",
              text: "Ein Teil des Anstiegs geht auf eine geänderte Erfassung zurück.",
              answer: true,
              explain:
                "Kurum bunu kendisi söylüyor: ocaktan beri telefonla yapılan bildirimler de sayılıyor, \"die vorher nicht erfasst wurden\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h1-4",
              no: 4,
              ref: "h2",
              text: "Was lässt sich derzeit nicht sagen?",
              options: [
                "Die Zahl der gemeldeten Fälle.",
                "Der reale Umfang der Zunahme.",
                "Der Anteil telefonischer Meldungen.",
              ],
              answer: 1,
              explain:
                "Son cümle sınırı çiziyor: \"lässt sich derzeit nicht sagen\". Bildirilen artış ise biliniyor: yüzde otuz.",
            },
            {
              kind: "bool",
              id: "de-b2-10-h1-5",
              no: 5,
              ref: "h3",
              text: "Die Anfrage wird vollständig abgelehnt.",
              answer: false,
              explain:
                "Mesaj kısmi bir kabul veriyor: \"Ihre Anfrage können wir teilweise erfüllen\" — yıllık veriler gönderiliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h1-6",
              no: 6,
              ref: "h3",
              text: "Warum bekommt er die Monatswerte nicht?",
              options: [
                "Wegen zu kleiner Fallzahlen.",
                "Weil sie noch nicht geprüft sind.",
                "Weil die Frist abgelaufen ist.",
              ],
              answer: 0,
              explain:
                "Gerekçe küçük birimlerde: \"bei den kleinen Gemeinden liegen wir dort unter fünf Fällen\".",
            },
            {
              kind: "bool",
              id: "de-b2-10-h1-7",
              no: 7,
              ref: "h4",
              text: "Der Antrag wird von der Tagesordnung genommen.",
              answer: false,
              explain:
                "Duyuru tersini söylüyor: \"Der Antrag selbst bleibt auf der Tagesordnung\" — yalnız oylama erteleniyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h1-8",
              no: 8,
              ref: "h4",
              text: "Was soll vor der Entscheidung geschehen?",
              options: [
                "Der Antrag soll neu formuliert werden.",
                "Die Jahreszahl soll nachgereicht werden.",
                "Eine externe Prüfung soll beauftragt werden.",
              ],
              answer: 1,
              explain:
                "Öneri açık: \"dass wir die Jahreszahl nachreichen lassen und erst danach entscheiden\".",
            },
            {
              kind: "bool",
              id: "de-b2-10-h1-9",
              no: 9,
              ref: "h5",
              text: "Die alte Fassung wird gelöscht.",
              answer: false,
              explain:
                "Mesaj bunun tersini söylüyor: \"die alte Fassung bleibt gekennzeichnet online\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h1-10",
              no: 10,
              ref: "h5",
              text: "Worin bestand der Fehler?",
              options: [
                "In einer falschen Prozentrechnung.",
                "In einer veralteten Quelle.",
                "In der falschen Bezugsgröße.",
              ],
              answer: 2,
              explain:
                "\"Die Prozentangabe war auf die falsche Grundgesamtheit bezogen\" — hesap değil, neye oranlandığı yanlış.",
            },
          ],
        },
        {
          id: "de-b2-10-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Interview. Wählen Sie: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir söyleşi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir istatistikçi anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Rehberg, wie oft werden Ihre Zahlen falsch verstanden?" },
                {
                  speaker: "Frau Rehberg",
                  text: "Falsch verstanden selten. Verkürzt fast immer. Das ist ein Unterschied, und er ist mir wichtig.",
                },
                { speaker: "Moderatorin", text: "Können Sie ein Beispiel nennen?" },
                {
                  speaker: "Frau Rehberg",
                  text: "Unsere Erhebung zur Wohnungslosigkeit. Wir haben die Definition erweitert, und die Zahlen sind um vierzig Prozent gestiegen. In der Berichterstattung stand: vierzig Prozent mehr Wohnungslose. Das ist nicht falsch zitiert, aber es ist eine andere Aussage.",
                },
                { speaker: "Moderatorin", text: "Wie gehen Sie damit um?" },
                {
                  speaker: "Frau Rehberg",
                  text: "Wir schreiben es inzwischen in den ersten Absatz statt auf Seite zwei. Das hat geholfen, aber weniger, als ich gehofft hatte.",
                },
                { speaker: "Moderatorin", text: "Wäre eine Rückkehr zur alten Definition eine Lösung?" },
                {
                  speaker: "Frau Rehberg",
                  text: "Nein, das wäre der schlechteste Weg. Die alte Definition hat Menschen nicht gezählt, die es gibt. Ein Bruch in der Zeitreihe ist unangenehm, aber ehrlicher als eine bequeme Fortschreibung.",
                },
                { speaker: "Moderatorin", text: "Was würden Sie sich von den Medien wünschen?" },
                {
                  speaker: "Frau Rehberg",
                  text: "Eine einzige Gewohnheit: bei jeder Veränderung den Vergleichszeitraum nennen. Nicht mehr. Das würde die meisten Missverständnisse erledigen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-10-h2-11",
              no: 11,
              ref: "i1",
              text: "Welchen Unterschied betont Frau Rehberg?",
              options: [
                "Zwischen Verkürzung und Missverständnis.",
                "Zwischen Presse und Politik.",
                "Zwischen alten und neuen Zahlen.",
              ],
              answer: 0,
              explain:
                "\"Falsch verstanden selten. Verkürzt fast immer. Das ist ein Unterschied, und er ist mir wichtig.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h2-12",
              no: 12,
              ref: "i1",
              text: "Was war an der Berichterstattung problematisch?",
              options: [
                "Sie hat die Zahl erfunden.",
                "Sie hat falsch gerechnet.",
                "Sie hat die Ursache weggelassen.",
              ],
              answer: 2,
              explain:
                "Alıntı doğruydu ama tanım değişikliği düşmüş: \"Das ist nicht falsch zitiert, aber es ist eine andere Aussage.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h2-13",
              no: 13,
              ref: "i1",
              text: "Was hat ihre Umstellung im Bericht bewirkt?",
              options: [
                "Gar nichts.",
                "Etwas, aber weniger als erhofft.",
                "Deutlich mehr als erwartet.",
              ],
              answer: 1,
              explain:
                "\"Das hat geholfen, aber weniger, als ich gehofft hatte\" — açıklama artık ilk paragrafta.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h2-14",
              no: 14,
              ref: "i1",
              text: "Wie bewertet sie eine Rückkehr zur alten Definition?",
              options: [
                "Als schlechtesten Weg.",
                "Als vertretbaren Kompromiss.",
                "Als technisch unmöglich.",
              ],
              answer: 0,
              explain:
                "\"Nein, das wäre der schlechteste Weg\" — çünkü eski tanım var olan insanları saymıyormuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h2-15",
              no: 15,
              ref: "i1",
              text: "Wie begründet sie das?",
              options: [
                "Mit dem Aufwand der Umstellung.",
                "Mit der Kritik aus der Politik.",
                "Mit der Ehrlichkeit gegenüber dem Bruch.",
              ],
              answer: 2,
              explain:
                "\"Ein Bruch in der Zeitreihe ist unangenehm, aber ehrlicher als eine bequeme Fortschreibung.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h2-16",
              no: 16,
              ref: "i1",
              text: "Was wünscht sie sich von den Medien?",
              options: [
                "Weniger Zahlen zu veröffentlichen.",
                "Den Vergleichszeitraum zu nennen.",
                "Statistiken vorab prüfen zu lassen.",
              ],
              answer: 1,
              explain:
                "Tek bir alışkanlık istiyor: \"bei jeder Veränderung den Vergleichszeitraum nennen. Nicht mehr.\"",
            },
          ],
        },
        {
          id: "de-b2-10-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Ham verilerin yayımlanması tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Detering, sollen Behörden ihre Rohdaten veröffentlichen?" },
                {
                  speaker: "Frau Detering",
                  text: "Ja, und zwar aus einem Grund, der oft untergeht: Ohne Rohdaten kann niemand eine Auswertung nachrechnen. Wir müssten dann glauben, und Glauben ist keine Grundlage für Politik.",
                },
                { speaker: "Moderator", text: "Frau Ilkay, Sie sehen ein Risiko." },
                {
                  speaker: "Frau Ilkay",
                  text: "Ich sehe ein bestimmtes Risiko, nicht das allgemeine. In einer Gemeinde mit vierhundert Einwohnern ist eine Tabelle mit Alter und Beruf keine Statistik mehr, sondern eine Personenbeschreibung. Wir hatten den Fall zweimal.",
                },
                {
                  speaker: "Frau Detering",
                  text: "Das bestreite ich nicht. Nur ist die Antwort darauf eine Schwelle für kleine Fallzahlen, keine grundsätzliche Zurückhaltung. Diese Schwelle gibt es längst.",
                },
                {
                  speaker: "Frau Ilkay",
                  text: "In der Theorie. In der Praxis wird sie auf jede Tabelle einzeln angewandt, und die Kombination mehrerer Tabellen prüft niemand.",
                },
                { speaker: "Moderator", text: "Das klingt nach einem ungelösten Problem." },
                {
                  speaker: "Frau Detering",
                  text: "Ist es auch, und es spricht für mehr Personal, nicht für weniger Veröffentlichung. Wer die Prüfung nicht leisten kann, veröffentlicht heute einfach gar nicht — das ist die bequemste Lösung.",
                },
                {
                  speaker: "Frau Ilkay",
                  text: "Da haben Sie recht, und ich sage das ungern. Zurückhaltung ist bei uns oft keine Abwägung, sondern Personalmangel mit gutem Argument.",
                },
                { speaker: "Moderator", text: "Ein gemeinsamer Punkt?" },
                {
                  speaker: "Frau Detering",
                  text: "Dass niemand ohne Methodenbericht veröffentlichen sollte. Rohdaten allein sind kein Fortschritt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-10-h3-17",
              no: 17,
              ref: "d1",
              text: "Womit begründet Frau Detering ihre Position?",
              options: [
                "Mit den Kosten der Verwaltung.",
                "Mit der Nachprüfbarkeit.",
                "Mit dem Interesse der Presse.",
              ],
              answer: 1,
              explain:
                "\"Ohne Rohdaten kann niemand eine Auswertung nachrechnen\" — güvenin siyasete temel olamayacağını ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h3-18",
              no: 18,
              ref: "d1",
              text: "Wie beschreibt Frau Ilkay ihr Bedenken?",
              options: [
                "Als bestimmtes, nicht allgemeines Risiko.",
                "Als grundsätzlichen Einwand gegen die Praxis.",
                "Als rein theoretische Möglichkeit.",
              ],
              answer: 0,
              explain:
                "Kendisi sınırlıyor: \"Ich sehe ein bestimmtes Risiko, nicht das allgemeine\" — dört yüz kişilik bir yerde tablo kişi tarifine dönüşüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h3-19",
              no: 19,
              ref: "d1",
              text: "Was hält Frau Detering für die richtige Antwort darauf?",
              options: [
                "Grundsätzliche Zurückhaltung.",
                "Eine Genehmigung für jeden einzelnen Fall.",
                "Eine Untergrenze bei geringen Zahlen.",
              ],
              answer: 2,
              explain:
                "Riski kabul edip çözümü daraltıyor: \"eine Schwelle für kleine Fallzahlen, keine grundsätzliche Zurückhaltung\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h3-20",
              no: 20,
              ref: "d1",
              text: "Welche Lücke nennt Frau Ilkay bei dieser Schwelle?",
              options: [
                "Sie gilt nur für die größeren Gemeinden.",
                "Die Kombination bleibt ungeprüft.",
                "Sie ist rechtlich nicht wirklich verbindlich.",
              ],
              answer: 1,
              explain:
                "Eşik tek tek uygulanıyor ama \"die Kombination mehrerer Tabellen prüft niemand\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h3-21",
              no: 21,
              ref: "d1",
              text: "Was räumt Frau Ilkay am Ende ein?",
              options: [
                "Dass das Risiko deutlich übertrieben war.",
                "Dass die Schwelle völlig ausreicht.",
                "Dass oft Personalmangel dahintersteckt.",
              ],
              answer: 2,
              explain:
                "İsteksizce kabul ediyor: \"Zurückhaltung ist bei uns oft keine Abwägung, sondern Personalmangel mit gutem Argument.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h3-22",
              no: 22,
              ref: "d1",
              text: "Worin sind sich beide einig?",
              options: [
                "Dass Rohdaten für sich genommen genügen.",
                "Dass ein Methodenbericht nötig ist.",
                "Dass mehr Personal unnötig ist.",
              ],
              answer: 1,
              explain:
                "Kapanış cümlesi: \"Dass niemand ohne Methodenbericht veröffentlichen sollte. Rohdaten allein sind kein Fortschritt.\"",
            },
          ],
        },
        {
          id: "de-b2-10-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören acht kurze Beiträge. Worum geht es jeweils? Sie hören jeden Text einmal.",
          promptTr: "Sekiz kısa parça dinleyeceksin. Her birinde konu ne? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage im Amt",
              genreTr: "Dairede anons",
              situation: "Bir tablo geri çekildi.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zur heutigen Veröffentlichung: Tabelle vier haben wir vorübergehend zurückgezogen. Bei zwei Gemeinden lagen die Fallzahlen unter der Schwelle. Die übrigen Tabellen bleiben unverändert abrufbar.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir oran haberi.",
              plays: 1,
              segments: [
                {
                  text: "Die Quote der Schulabbrüche liegt im Land bei fünf Komma zwei Prozent und damit auf dem niedrigsten Stand seit zehn Jahren. Zwischen den Kreisen bleibt die Spanne allerdings groß: Sie reicht von zwei bis über elf Prozent.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir düzeltme talebi kabul edildi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist die Redaktion. Ihr Hinweis war berechtigt: Wir haben eine Verdopplung gemeldet, ohne die absoluten Zahlen zu nennen. Es ging um drei statt anderthalb Fällen. Die Korrektur läuft morgen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Ansage im Verein",
              genreTr: "Dernekte duyuru",
              situation: "Üye sayısı açıklanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Zur Mitgliederentwicklung: Wir haben achtzehn Eintritte und vierzehn Austritte, also ein Plus von vier. Der Kassenbericht weist trotzdem weniger Beiträge aus, weil die neuen Mitglieder erst ab Juli zahlen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Podcast-Ausschnitt",
              genreTr: "Podcast parçası",
              situation: "Anket sonuçları üzerine.",
              plays: 1,
              segments: [
                {
                  text: "Zwei Umfragen zum selben Thema kommen zu Ergebnissen, die sich um vierzehn Punkte unterscheiden. Erklären lässt sich das nicht durch die Stichprobe, sondern durch die Frageformulierung: Die eine fragte nach Zustimmung, die andere nach Ablehnung.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m6",
              genre: "Durchsage im Krankenhaus",
              genreTr: "Hastanede anons",
              situation: "Bekleme süresi bilgisi.",
              plays: 1,
              segments: [
                {
                  text: "Zur Information: Die durchschnittliche Wartezeit beträgt heute vierzig Minuten. Bitte beachten Sie, dass wir nach Dringlichkeit aufrufen; die Zeit im Einzelfall kann deutlich kürzer oder länger sein.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m7",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir veri talebi için ücret.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Marquardt, hier ist das Archiv. Die Daten liegen vor, für die Aufbereitung entstehen allerdings Kosten von hundertzwanzig Euro. Ohne Ihre Zusage beginnen wir nicht; die Anfrage bleibt bis dahin offen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m8",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir karşılaştırma uyarısı.",
              plays: 1,
              segments: [
                {
                  text: "Die Stadt weist darauf hin, dass ihre Zahlen mit denen der Nachbarstädte nur eingeschränkt vergleichbar sind. Dort wird eine andere Altersgrenze verwendet. Wer die Werte nebeneinanderstellt, vergleicht zwei unterschiedliche Definitionen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-10-h4-23",
              no: 23,
              ref: "m1",
              text: "Worum geht es?",
              options: [
                "Die gesamte Veröffentlichung fällt heute aus.",
                "Alle Tabellen werden neu berechnet.",
                "Ein Teil wird wegen kleiner Zahlen gesperrt.",
              ],
              answer: 2,
              explain:
                "Yalnız bir tablo çekiliyor: \"Bei zwei Gemeinden lagen die Fallzahlen unter der Schwelle\" — ötekiler erişilebilir kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-24",
              no: 24,
              ref: "m2",
              text: "Worum geht es?",
              options: [
                "Ein guter Landeswert verdeckt Unterschiede.",
                "Die Quote ist zum ersten Mal wieder gestiegen.",
                "Die Kreise melden keine Zahlen mehr.",
              ],
              answer: 0,
              explain:
                "Ortalama on yılın en düşüğü, ama \"Sie reicht von zwei bis über elf Prozent\" — dağılım geniş.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-25",
              no: 25,
              ref: "m3",
              text: "Worum geht es?",
              options: [
                "Eine Zahl war offenbar frei erfunden.",
                "Eine Prozentangabe stand ohne Bezug.",
                "Eine Quelle wurde nicht genannt.",
              ],
              answer: 1,
              explain:
                "Hata mutlak sayının eksikliği: \"Wir haben eine Verdopplung gemeldet, ohne die absoluten Zahlen zu nennen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-26",
              no: 26,
              ref: "m4",
              text: "Worum geht es?",
              options: [
                "Der Verein verliert weiter an Mitgliedern.",
                "Die Beiträge werden erhöht.",
                "Zuwachs und Einnahmen fallen auseinander.",
              ],
              answer: 2,
              explain:
                "Üye sayısı dört artmış ama aidat düşük görünüyor, \"weil die neuen Mitglieder erst ab Juli zahlen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-27",
              no: 27,
              ref: "m5",
              text: "Worum geht es?",
              options: [
                "Die Stichprobe war offenbar zu klein.",
                "Die Fragestellung erklärt die Lücke.",
                "Eine der beiden Umfragen war gefälscht.",
              ],
              answer: 1,
              explain:
                "Örneklem açıkça eleniyor: fark \"durch die Frageformulierung\" — biri onayı, öteki reddi sormuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-28",
              no: 28,
              ref: "m6",
              text: "Worum geht es?",
              options: [
                "Ein Mittelwert gilt nicht für den Einzelfall.",
                "Die Wartezeit ist heute besonders kurz.",
                "Die Reihenfolge richtet sich nach der Ankunft.",
              ],
              answer: 0,
              explain:
                "Kırk dakika ortalama; anons uyarıyor: \"die Zeit im Einzelfall kann deutlich kürzer oder länger sein\".",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-29",
              no: 29,
              ref: "m7",
              text: "Worum geht es?",
              options: [
                "Die Daten sind im Archiv nicht auffindbar.",
                "Die Anfrage wurde abgelehnt.",
                "Die Bearbeitung wartet auf eine Zusage.",
              ],
              answer: 2,
              explain:
                "Veri var ama masraf çıkıyor: \"Ohne Ihre Zusage beginnen wir nicht; die Anfrage bleibt bis dahin offen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-10-h4-30",
              no: 30,
              ref: "m8",
              text: "Worum geht es?",
              options: [
                "Die Nachbarstädte rechnen falsch.",
                "Ein Vergleich wäre irreführend.",
                "Die Altersgrenze wird angeglichen.",
              ],
              answer: 1,
              explain:
                "Şehir hata değil uyumsuzluk bildiriyor: \"Wer die Werte nebeneinanderstellt, vergleicht zwei unterschiedliche Definitionen.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 75,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Leserbrief und eine halb offizielle Nachricht.",
      instructionTr: "Bu bölümde iki görev var: bir okur mektubu ve yarı resmî bir ileti.",
      tasks: [
        {
          id: "de-b2-10-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Zahlen lügen nicht — wer sie bestreitet, hat etwas zu verbergen.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Sayılar yalan söylemez — onlara itiraz edenin gizleyecek bir şeyi vardır.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 150,
            points: [
              { de: "Beziehen Sie sich auf die Aussage.", tr: "İddiaya açıkça atıf yap." },
              { de: "Nennen Sie mindestens zwei Argumente.", tr: "En az iki gerekçe sun." },
              { de: "Gehen Sie auf einen Einwand ein.", tr: "Karşı bir görüşü ele al." },
              { de: "Ziehen Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Sehr geehrte Redaktion,

Ihr Satz ist in einem Punkt richtig und im entscheidenden falsch. Zahlen lügen tatsächlich nicht — aber sie antworten nur auf die Frage, die man ihnen gestellt hat.

Ein Beispiel aus dieser Stadt: Die Zahl der Wohnungslosen stieg um vierzig Prozent, nachdem die Definition erweitert worden war. Wer diesen Anstieg bestreitet, verbirgt nichts; er weist auf eine geänderte Zählweise hin.

Zweitens verschweigt jeder Durchschnitt seine Verteilung. Eine Schulabbruchquote von fünf Prozent klingt beruhigend, solange nicht danebensteht, dass sie zwischen zwei und elf Prozent schwankt. Beide Zahlen sind korrekt, und nur zusammen sind sie eine Aussage.

Nun ließe sich einwenden, ständiges Nachfragen lähme jede Debatte und spiele denen in die Hände, die ohnehin nichts ändern wollen. Das trifft zu, wenn der Zweifel zum Selbstzweck wird und jede Zahl grundsätzlich bestritten wird. Es trifft nicht zu, wenn nach dem Vergleichszeitraum oder der Grundgesamtheit gefragt wird — das dauert einen einzigen Satz und macht die Debatte schärfer, nicht langsamer.

Deshalb halte ich Ihren Satz für gefährlich: Er erklärt Nachfragen zum Schuldeingeständnis.

Mit freundlichen Grüßen
Nadja Detering`,
            criteria: [
              "İddiaya açıkça atıf yapıldı mı ve tartışma o cümle üzerinden mi yürüyor?",
              "En az iki bağımsız gerekçe var mı (tanım değişikliği ve dağılım gibi)?",
              "Karşı görüş güçlü hâliyle mi alındı ve gerçekten yanıtlandı mı?",
              "Sonuç gerekçelerden çıkıyor mu?",
              "Yaklaşık 150 kelime var mı; okur mektubu biçimi korunmuş mu?",
              "Bağlaç ve edilgen yapılar B2 düzeyinde kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-b2-10-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "In einem Bericht Ihrer Gemeinde steht eine Prozentzahl ohne Angabe des Vergleichszeitraums. Schreiben Sie an die zuständige Stelle (circa 100 Wörter).",
          promptTr:
            "Belediyenin bir raporunda karşılaştırma dönemi belirtilmeden bir yüzde veriliyor. İlgili birime yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nennen Sie die Stelle im Bericht genau.", tr: "Rapordaki yeri tam olarak belirt." },
              { de: "Erklären Sie, warum die Angabe fehlt.", tr: "Eksik olan bilginin neden gerektiğini açıkla." },
              { de: "Sagen Sie, was Sie erwarten.", tr: "Ne beklediğini söyle." },
              { de: "Bleiben Sie sachlich und nennen Sie eine Frist.", tr: "Nesnel kal ve bir süre belirt." },
            ],
            sample: `Sehr geehrte Damen und Herren,

im Sozialbericht 2026 heißt es auf Seite 14, die Zahl der Beratungsfälle sei um sechzig Prozent gestiegen. Ein Vergleichszeitraum wird nicht genannt.

Ohne diese Angabe lässt sich die Zahl nicht einordnen: Ein Quartalsvergleich und ein Jahresvergleich führen zu sehr unterschiedlichen Schlüssen, und der Bericht dient als Grundlage für den Haushaltsantrag im Mai.

Ich bitte Sie daher um zweierlei: mir den zugrunde liegenden Vergleichszeitraum mitzuteilen und ihn in der nächsten Fassung des Berichts unmittelbar neben der Prozentangabe im Fließtext zu ergänzen, nicht in einer Fußnote.

Über eine Antwort bis zum 30. April würde ich mich freuen.

Mit freundlichen Grüßen
Nadja Detering`,
            criteria: [
              "Rapordaki yer sayfa ve içerikle belirtildi mi?",
              "Eksikliğin neden sorun olduğu somut olarak açıklandı mı?",
              "Beklenen şey iki adımlı ve uygulanabilir mi (bilgi + düzeltme)?",
              "Ton nesnel kaldı mı, suçlayıcı olmadı mı?",
              "Süre verildi mi ve yaklaşık 100 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und gemeinsam eine Entscheidung treffen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve birlikte karar vermek.",
      tasks: [
        {
          id: "de-b2-10-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wie viel Statistik braucht eine öffentliche Debatte?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"Kamusal bir tartışma ne kadar istatistiğe ihtiyaç duyar?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
          minutes: 7,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Lage im Herkunftsland", tr: "Kendi ülkendeki durum" },
              { de: "Argumente für beide Seiten", tr: "İki tarafın da gerekçeleri" },
              { de: "Beispiele", tr: "Örnekler" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute darüber sprechen, wie viel Statistik eine öffentliche Debatte verträgt. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In Polen werden Zahlen in der Politik häufig genannt, aber selten mit Quelle. Meine Mutter hat vor der letzten Wahl drei verschiedene Arbeitslosenzahlen gehört, alle für dasselbe Jahr, und keine mit Angabe der Methode. Für mehr Statistik spricht, dass ohne Zahlen jede Behauptung gleich viel wiegt. Wer über Kriminalität spricht, ohne die Entwicklung zu kennen, redet über sein Gefühl. Dagegen spricht, dass Zahlen eine Debatte auch schließen können. Wer eine Statistik nennt, wirkt sachlich, und wer nachfragt, wirkt umständlich. Genau daran scheitern viele Gespräche. Meine Position ist deshalb: Nicht mehr Zahlen, sondern weniger Zahlen mit mehr Kontext. Eine einzige Angabe mit Vergleichszeitraum und Grundgesamtheit nützt mehr als fünf ohne. Zusammenfassend: Statistik ersetzt die Debatte nicht — sie sorgt nur dafür, dass beide Seiten über dasselbe streiten.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut ve açıklayıcı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Konum gerekçeli mi ve karşı tarafın noktasını kabul ediyor mu?",
              "Dört dakika boyunca yapı korunabildi mi?",
            ],
          },
        },
        {
          id: "de-b2-10-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Gemeinde hat 30.000 Euro, um ihre Daten besser zugänglich zu machen. Zur Wahl stehen: ein Datenportal, eine halbe Stelle für Anfragen, verständliche Zusammenfassungen der Berichte, Schulungen für Mitarbeitende. Einigen Sie sich auf eine Verwendung.",
          promptTr:
            "Birlikte bir karar verin. Bir belediyenin verilerini daha erişilebilir kılmak için 30.000 avrosu var. Seçenekler: bir veri portalı, talepler için yarım kadro, raporların anlaşılır özetleri, personel eğitimi. Bir kullanım üzerinde anlaşın.",
          minutes: 8,
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Ich fange an: Ich bin für das Datenportal. Es ist einmal gebaut und danach für alle da. Was meinen Sie?",
              tr: "Ben başlayayım: Veri portalından yanayım. Bir kez kuruluyor ve sonra herkese açık. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve 'bir kez kurulur' gerekçesini doğrudan ele al.",
              expect: "bir seçeneği gerekçelendirmek ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Einwand: Eine halbe Stelle ist nach zwei Jahren weg, das Portal bleibt. Ist das nicht der bessere Einsatz?",
              tr: "Bir itiraz: Yarım kadro iki yıl sonra biter, portal kalır. Bu daha iyi bir kullanım değil mi?",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve gerekirse bir birleşim öner.",
              expect: "itirazı ele almak ve gerekirse birleşik bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Für alle vier reicht das Geld nicht. Was streichen wir, und mit welcher Begründung?",
              tr: "Para dördü birden için yetmiyor. Neyi eliyoruz ve hangi gerekçeyle?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden elediğini söyle.",
              expect: "gerekçeli bir önceliklendirme yapmak ve elemeyi savunmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin?",
            },
            {
              who: "you",
              hint: "Varılan anlaşmayı kısa ve eksiksiz özetle.",
              expect: "anlaşmayı eksiksiz ve kısa biçimde özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 8,
            points: [
              { de: "einen Vorschlag begründen", tr: "Bir öneriyi gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "priorisieren und begründen", tr: "Önceliklendirmek ve gerekçelendirmek" },
              { de: "das Ergebnis zusammenfassen", tr: "Sonucu özetlemek" },
            ],
            sample:
              "Ihr Argument mit der Dauerhaftigkeit stimmt für die Technik, nicht für die Wirkung. Ein Portal bleibt bestehen, aber niemand liest eine Tabelle ohne Methodenbericht — und den schreibt kein Portal. Ich schlage deshalb vor: zwölftausend für die verständlichen Zusammenfassungen, zwölftausend für die halbe Stelle, sechstausend für ein einfaches Portal ohne Suchfunktion. Zum Einwand mit den zwei Jahren: Das ist ein reales Problem, aber eine Stelle, die zwei Jahre lang zeigt, welche Fragen überhaupt kommen, macht das spätere Portal besser. Streichen würde ich die Schulungen. Nicht weil sie überflüssig wären, sondern weil sie nur wirken, wenn es etwas zu schulen gibt — und das entsteht erst mit den anderen drei. Zusammengefasst: Schwerpunkt auf Zusammenfassungen und Personal, ein einfaches Portal dazu, Schulungen erst im nächsten Haushalt.",
            criteria: [
              "Öneri gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "İtiraz kabul edilip yanıtlandı mı, yoksa görmezden mi gelindi?",
              "Önceliklendirme yapıldı mı ve eleme gerekçelendirildi mi?",
              "Özet eksiksiz mi — anlaşılan her şey geçiyor mu?",
              "Tartışma dili B2 düzeyinde mi (einwenden, priorisieren, abwägen)?",
            ],
          },
        },
      ],
    },
  ],
};
