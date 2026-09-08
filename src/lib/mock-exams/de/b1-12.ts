import type { MockPaper } from "../types";

/**
 * B1 · Deneme 12 — "Sprache und Ankommen".
 *
 * PLAN kâğıt 1–11 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 ana fikir · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karma · 5 danışma · 7 R/F sunum · 8 tartışma)
 *   Schreiben 60 dk           80 + 80 + 40 kelime
 *   Sprechen  15 dk           bilgi alışverişi · sunum · birlikte planlama
 *
 * KONU SEÇİMİ: dil öğrenmenin kurstan sonraki kısmı. "Lernen und Arbeiten"
 * kâğıdı mesleki eğitimi almıştı; buradaki soru başka — sınavı geçmek ile
 * dili kullanabilmek arasındaki fark. Bu kâğıdın adayı tam olarak bu
 * durumun içinde, dolayısıyla metinler onun kendi deneyimini sınıyor.
 *
 * DİKKAT EDİLEN: konu adayın kendisiyle ilgili olduğu için metinler ne
 * cesaretlendiriyor ne de küçümsüyor. Gazete yazısı sınavı geçenlerin
 * işyerinde zorlandığını, sunum ise yetişkin öğrenmesinin yavaşlığının
 * kusur olmadığını söylüyor.
 *
 * B1 dilbilgisi: Konjunktiv II, ilgi cümlesi ve ileri bağlaçlar her
 * bölümde geçiyor.
 */
export const B1_12: MockPaper = {
  id: "de-b1-12",
  course: "de",
  level: "B1",
  no: 12,
  theme: "Sprache und Ankommen",
  themeTr: "Dil ve yerleşme",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Bericht, kurze Texte, Anzeigen, Forumsbeiträge und Regeln.",
      instructionTr:
        "Bu bölümde beş görev var. Bir haber, kısa metinler, ilanlar, forum yorumları ve kurallar okuyacaksın.",
      tasks: [
        {
          id: "de-b1-12-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Metni ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsbericht",
              genreTr: "Gazete haberi",
              title: "Bestanden — und trotzdem sprachlos",
              body: `Fast alle Teilnehmenden des Integrationskurses in Ostheim haben die B1-Prüfung bestanden. Trotzdem meldeten sich im Jahr danach zwölf von achtzehn zurück und fragten nach einem weiteren Kurs.

"Das hat uns überrascht", sagt die Kursleiterin Anke Grothusen. "Wir dachten zuerst, die Prüfung sei zu leicht gewesen. Das war sie nicht."

Der Grund lag woanders. Im Kurs sprechen alle langsam und deutlich, weil alle Lernende sind. Am Arbeitsplatz spricht niemand so. "Meine Kollegen reden schnell und mit Dialekt", sagt Tesfay Tadesse, der als Pfleger arbeitet. "Nach zwei Monaten habe ich gedacht, ich hätte nichts gelernt."

Die Volkshochschule hat daraufhin kein neues Kursformat entwickelt, sondern etwas Einfacheres versucht: Sprachpatenschaften. Jede Person trifft sich einmal pro Woche eine Stunde mit jemandem aus dem Ort. Es gibt kein Material und keine Hausaufgaben, nur die Regel, dass Deutsch gesprochen wird.

Nach einem Jahr sagten neun von zwölf, dass ihnen die Stunde mehr gebracht habe als die letzten vier Wochen im Kurs. Grothusen ist damit vorsichtig: "Das sind zwölf Personen. Ich würde daraus keine Empfehlung für alle machen."

Schwierig war die Suche nach Patinnen und Paten. Auf den ersten Aufruf meldeten sich vier Leute. Erst als der Verein nach festen Zeiten gefragt hat statt nach Hilfe im Allgemeinen, kamen genug zusammen.`,
              gloss: [
                { de: "der Teilnehmende", tr: "katılımcı", en: "participant" },
                { de: "die Patenschaft", tr: "gönüllü eşlik, hamilik", en: "sponsorship, mentoring" },
                { de: "der Aufruf", tr: "çağrı", en: "call, appeal" },
                { de: "im Allgemeinen", tr: "genel olarak", en: "in general" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-12-l1-1",
              no: 1,
              ref: "r1",
              text: "Die meisten Teilnehmenden sind durch die Prüfung gefallen.",
              answer: false,
              explain:
                "Metnin ilk cümlesi tersini söylüyor: \"Fast alle Teilnehmenden … haben die B1-Prüfung bestanden.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-l1-2",
              no: 2,
              ref: "r1",
              text: "Mehr als die Hälfte hat später nach einem weiteren Kurs gefragt.",
              answer: true,
              explain:
                "Oran veriliyor: \"zwölf von achtzehn\" geri dönmüş — bu yarıdan fazla.",
            },
            {
              kind: "bool",
              id: "de-b1-12-l1-3",
              no: 3,
              ref: "r1",
              text: "Die Kursleiterin hält die Prüfung für zu leicht.",
              answer: false,
              explain:
                "Bunu ilk düşündüklerini ama sonra reddettiklerini söylüyor: \"Wir dachten zuerst, die Prüfung sei zu leicht gewesen. Das war sie nicht.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-l1-4",
              no: 4,
              ref: "r1",
              text: "Im Kurs wird anders gesprochen als am Arbeitsplatz.",
              answer: true,
              explain:
                "Karşıtlık metinde: kursta herkes yavaş ve net konuşuyor, işyerinde ise \"Meine Kollegen reden schnell und mit Dialekt\".",
            },
            {
              kind: "bool",
              id: "de-b1-12-l1-5",
              no: 5,
              ref: "r1",
              text: "Bei den Patenschaften gibt es weder Material noch Hausaufgaben.",
              answer: true,
              explain:
                "\"Es gibt kein Material und keine Hausaufgaben, nur die Regel, dass Deutsch gesprochen wird.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-l1-6",
              no: 6,
              ref: "r1",
              text: "Frau Grothusen empfiehlt das Modell allen Volkshochschulen.",
              answer: false,
              explain:
                "Temkinli davranıyor: \"Das sind zwölf Personen. Ich würde daraus keine Empfehlung für alle machen.\"",
            },
          ],
        },
        {
          id: "de-b1-12-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die sechs Texte. Worum geht es? Wählen Sie a, b oder c.",
          promptTr: "Altı metni oku. Konu ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang in der Volkshochschule",
              genreTr: "Halk eğitim merkezinde duyuru",
              body: `Liebe Kursteilnehmerinnen und Kursteilnehmer,

der Raum für den Abendkurs wechselt ab nächster Woche von 108 in 214.

Der Grund ist die Gruppengröße: In 214 passen sechs Personen mehr hinein.

Zeiten und Lehrkraft bleiben gleich.`,
              gloss: [{ de: "die Lehrkraft", tr: "öğretmen", en: "teacher" }],
            },
            {
              kind: "text",
              id: "t2",
              genre: "E-Mail vom Prüfungsamt",
              genreTr: "Sınav biriminden e-posta",
              body: `Sehr geehrter Herr Tadesse,

Ihre Anmeldung zur Prüfung am 14. Juni ist eingegangen. Der schriftliche Teil beginnt um 9 Uhr, der mündliche folgt am Nachmittag.

Bitte bringen Sie einen gültigen Ausweis mit. Ohne Ausweis ist eine Teilnahme nicht möglich.

Die Gebühr von 195 Euro ist bereits bei uns eingegangen.`,
              gloss: [
                { de: "gültig", tr: "geçerli", en: "valid" },
                { de: "die Gebühr", tr: "ücret", en: "fee" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Nachricht in der Kursgruppe",
              genreTr: "Kurs grubunda ileti",
              body: `Hallo zusammen,

ich habe die Prüfung geschafft, aber im Betrieb verstehe ich trotzdem oft nichts.

Hat jemand Lust, sich einmal pro Woche zum Sprechen zu treffen? Ohne Buch, einfach reden.

Ich hätte Zeit am Mittwochabend. Wer mitmachen möchte, schreibt mir.`,
              gloss: [{ de: "der Betrieb", tr: "işyeri", en: "workplace" }],
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Das Sprachcafé im Bürgerhaus sucht Menschen, die einmal in der Woche eine Stunde Deutsch sprechen möchten — mit jemandem, der gerade Deutsch lernt.

Man braucht keine Ausbildung als Lehrkraft. Es geht nicht um Grammatik, sondern um Gespräche.

Feste Zeiten werden vorher vereinbart.`,
              gloss: [{ de: "vereinbaren", tr: "kararlaştırmak", en: "to agree on" }],
            },
            {
              kind: "text",
              id: "t5",
              genre: "Aushang in der Bibliothek",
              genreTr: "Kütüphanede duyuru",
              body: `Neu bei uns: Bücher in einfacher Sprache.

Die Regale stehen im Erdgeschoss neben der Zeitungsecke. Ausleihe wie immer für vier Wochen.

Wir nehmen gern Wünsche entgegen. Sagen Sie uns, welche Themen Ihnen fehlen.

Der Ausweis für die Bibliothek ist für Kursteilnehmende im ersten Jahr kostenlos.`,
              gloss: [{ de: "entgegennehmen", tr: "kabul etmek, almak", en: "to accept" }],
            },
            {
              kind: "text",
              id: "t6",
              genre: "Nachricht an das Sekretariat",
              genreTr: "Sekreterliğe ileti",
              body: `Sehr geehrte Damen und Herren,

ich bin im Kurs A2.2 angemeldet, arbeite aber seit Februar im Schichtdienst. Der Abendkurs liegt genau in meiner Schicht.

Gibt es einen Kurs am Vormittag, in den ich wechseln könnte? Ich möchte nicht abbrechen.

Mit freundlichen Grüßen
Ayla Cakir`,
              gloss: [{ de: "abbrechen", tr: "yarıda bırakmak", en: "to drop out" }],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-12-l2-7",
              no: 7,
              ref: "t1",
              text: "Worum geht es in dem Text?",
              options: [
                "Der Kurs bekommt eine neue Lehrkraft.",
                "Der Kurs findet zu einer anderen Zeit statt.",
                "Der Kurs zieht in einen größeren Raum.",
              ],
              answer: 2,
              explain:
                "Gerekçe boyut: \"In 214 passen sechs Personen mehr hinein.\" Saatler ve öğretmen aynı kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l2-8",
              no: 8,
              ref: "t2",
              text: "Worum geht es in dem Text?",
              options: [
                "Eine Anmeldung wird bestätigt.",
                "Eine Gebühr wird angemahnt.",
                "Ein Prüfungstermin wird verschoben.",
              ],
              answer: 0,
              explain:
                "\"Ihre Anmeldung zur Prüfung am 14. Juni ist eingegangen\" — ücret de zaten ödenmiş.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l2-9",
              no: 9,
              ref: "t3",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand sucht Hilfe bei den Hausaufgaben.",
                "Jemand sucht Leute zum Sprechen.",
                "Jemand meldet sich vom Kurs ab.",
              ],
              answer: 1,
              explain:
                "Rica açık: \"sich einmal pro Woche zum Sprechen zu treffen? Ohne Buch, einfach reden.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l2-10",
              no: 10,
              ref: "t4",
              text: "Worum geht es in dem Text?",
              options: [
                "Das Sprachcafé sucht Gesprächspartner.",
                "Das Sprachcafé sucht ausgebildete Lehrkräfte.",
                "Das Sprachcafé bietet einen Grammatikkurs an.",
              ],
              answer: 0,
              explain:
                "Eğitim gerekmiyor ve konu dilbilgisi değil: \"Es geht nicht um Grammatik, sondern um Gespräche.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l2-11",
              no: 11,
              ref: "t5",
              text: "Worum geht es in dem Text?",
              options: [
                "Die Bibliothek ändert die Ausleihfrist.",
                "Die Bibliothek zieht ins Erdgeschoss.",
                "Die Bibliothek hat ein neues Angebot.",
              ],
              answer: 2,
              explain:
                "Duyuru bir yenilikle açılıyor: \"Neu bei uns: Bücher in einfacher Sprache.\" Ödünç süresi değişmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l2-12",
              no: 12,
              ref: "t6",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand meldet sich vom Abendkurs ab.",
                "Jemand möchte den Kurs wechseln.",
                "Jemand beschwert sich über den Schichtdienst.",
              ],
              answer: 1,
              explain:
                "Soru bir geçiş isteği: \"Gibt es einen Kurs am Vormittag, in den ich wechseln könnte? Ich möchte nicht abbrechen.\"",
            },
          ],
        },
        {
          id: "de-b1-12-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot zum Deutschlernen. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler Almanca öğrenmek için bir imkân arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Sprachpatenschaft",
              body: "Einmal pro Woche eine Stunde reden, ohne Buch und ohne Hausaufgaben. Zeit und Ort vereinbaren Sie selbst. Kostenlos, Anmeldung im Bürgerhaus.",
            },
            {
              key: "b",
              label: "Vormittagskurs B1",
              body: "Mo bis Do 9 bis 12 Uhr, zwölf Wochen. 320 Euro, Ratenzahlung möglich. Einstufungstest vorher nötig.",
            },
            {
              key: "c",
              label: "Prüfungstraining",
              body: "Vier Samstage vor dem Termin, je fünf Stunden. Nur der mündliche Teil. 80 Euro, Anmeldung bis zwei Wochen vorher.",
            },
            {
              key: "d",
              label: "Deutsch für den Pflegeberuf",
              body: "Fachwörter, Übergabe und Telefonate auf Station. Dienstags 16 bis 18 Uhr. Für Beschäftigte in Pflegeeinrichtungen, 40 Euro.",
            },
            {
              key: "e",
              label: "Bücher in einfacher Sprache",
              body: "Regal im Erdgeschoss der Bibliothek, Romane und Sachbücher. Ausleihe vier Wochen, Ausweis im ersten Jahr kostenlos.",
            },
            {
              key: "f",
              label: "Online-Abendkurs",
              body: "Zweimal wöchentlich 19 bis 20:30 Uhr am Bildschirm. Kamera nicht nötig. 180 Euro, Start jeden Monat.",
            },
            {
              key: "g",
              label: "Alphabetisierungskurs",
              body: "Für Menschen, die noch nicht in lateinischer Schrift schreiben. Kleine Gruppen, viermal wöchentlich vormittags. Kostenlos.",
            },
            {
              key: "h",
              label: "Kinderbetreuung während des Kurses",
              body: "Für Kinder von 1 bis 5 Jahren, parallel zum Vormittagskurs. Anmeldung eine Woche vorher, 2 Euro pro Termin.",
            },
            {
              key: "i",
              label: "Schreibwerkstatt Bewerbung",
              body: "Lebenslauf und Anschreiben auf Deutsch. Drei Termine, freitags 17 Uhr. Bringen Sie Ihre alten Unterlagen mit.",
            },
            {
              key: "j",
              label: "Einbürgerungstest — Vorbereitung",
              body: "Ein Wochenende, Samstag und Sonntag je sechs Stunden. Fragen zu Politik, Geschichte und Gesellschaft. 60 Euro.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-12-l3-13",
              no: 13,
              text: "Herr Tadesse hat die Prüfung bestanden und möchte einfach mehr sprechen, ohne Unterricht.",
              answer: "a",
              explain:
                "(a) tam bunu veriyor: \"Einmal pro Woche eine Stunde reden, ohne Buch und ohne Hausaufgaben.\"",
            },
            {
              kind: "match",
              id: "de-b1-12-l3-14",
              no: 14,
              text: "Frau Cakir arbeitet abends im Schichtdienst und sucht einen Kurs am Vormittag.",
              answer: "b",
              explain:
                "(b) sabah saatlerinde: \"Mo bis Do 9 bis 12 Uhr\" — üstelik taksitle ödeme de mümkün.",
            },
            {
              kind: "match",
              id: "de-b1-12-l3-15",
              no: 15,
              text: "Frau Lohse hat einen dreijährigen Sohn und kann ihn während des Kurses nicht allein lassen.",
              answer: "h",
              explain:
                "(h) yaş grubunu ve zamanlamayı veriyor: \"Für Kinder von 1 bis 5 Jahren, parallel zum Vormittagskurs.\"",
            },
            {
              kind: "match",
              id: "de-b1-12-l3-16",
              no: 16,
              text: "Herr Bendig arbeitet im Altenheim und versteht die Übergabe am Schichtende schlecht.",
              answer: "d",
              explain:
                "(d) tam bu durumu işliyor: \"Fachwörter, Übergabe und Telefonate auf Station.\"",
            },
            {
              kind: "match",
              id: "de-b1-12-l3-17",
              no: 17,
              text: "Frau Sperling hat in ihrer Heimat nie schreiben gelernt.",
              answer: "g",
              explain:
                "(g) tam bu grup için: \"Für Menschen, die noch nicht in lateinischer Schrift schreiben.\"",
            },
            {
              kind: "match",
              id: "de-b1-12-l3-18",
              no: 18,
              text: "Herr Kollatz möchte sich bewerben und weiß nicht, wie ein deutscher Lebenslauf aussieht.",
              answer: "i",
              explain:
                "(i) doğrudan bu iki belgeyi çalışıyor: \"Lebenslauf und Anschreiben auf Deutsch.\"",
            },
            {
              kind: "match",
              id: "de-b1-12-l3-19",
              no: 19,
              text: "Frau Nauheimer hat nur an Wochenenden Zeit und bereitet sich auf den Test für den Pass vor.",
              answer: "j",
              explain:
                "(j) hafta sonuna sığıyor ve konusu tam bu: \"Fragen zu Politik, Geschichte und Gesellschaft.\"",
            },
          ],
        },
        {
          id: "de-b1-12-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Betriebe Deutschkurse in der Arbeitszeit anbieten?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"İşyerleri mesai içinde Almanca kursu sunmalı mı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Deutschkurs während der Arbeitszeit — ja oder nein?",
              body: `Anke Grothusen: Ich unterrichte seit vierzehn Jahren und bin dafür. Abendkurse nach einer Schicht sind eine Kapitulation vor dem Kalender: Die Leute kommen, aber sie lernen nichts mehr. Zwei Stunden am Vormittag bringen mehr als vier am Abend.

Tesfay Tadesse: Ich arbeite in der Pflege und bin dagegen, obwohl ich den Kurs bräuchte. Wenn ich zwei Stunden im Unterricht sitze, macht meine Kollegin meine Arbeit mit. Solange niemand die Stelle ersetzt, geht der Kurs auf ihre Kosten und nicht auf die des Betriebs.

Ayla Cakir: Ich bin dafür, und zwar aus Erfahrung. Mein alter Betrieb hat es angeboten, mein neuer nicht. Im alten habe ich in einem Jahr mehr gelernt als vorher in dreien. Der Unterschied war nicht der Kurs, sondern dass ich nicht müde war.

Jörg Bendig: Als Betriebsleiter bin ich dagegen, dass man es vorschreibt. Bei uns arbeiten neunzehn Leute. Wenn drei gleichzeitig im Kurs sind, steht die Werkstatt. Freiwillig mache ich gern mit, aber eine Pflicht würde kleine Betriebe härter treffen als große.

Irene Lohse: Ich bin dafür, mit einer Bedingung: Der Kurs muss zum Beruf passen. Wir hatten einen allgemeinen Kurs im Haus, und nach vier Wochen kam kaum noch jemand. Beim Kurs für die Übergabe auf Station war der Raum voll.

Marek Kollatz: Ich bin dagegen. Nicht wegen der Zeit, sondern wegen der Freiwilligkeit. Wer im Betrieb lernt, wird beobachtet. Ich habe gesehen, wie Kolleginnen aufgehört haben, weil sie vor dem Chef keine Fehler machen wollten.

Frau Sperling: Ich bin dafür. Bei uns bezahlt die Firma die Hälfte der Zeit und wir die andere. Das war ein Kompromiss, und er hält seit sechs Jahren. Ganz umsonst wäre mir sogar unangenehm.`,
              gloss: [
                { de: "die Kapitulation", tr: "teslim olma", en: "capitulation" },
                { de: "ersetzen", tr: "yerini doldurmak", en: "to replace" },
                { de: "vorschreiben", tr: "zorunlu kılmak", en: "to prescribe" },
                { de: "die Freiwilligkeit", tr: "gönüllülük", en: "voluntariness" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-12-l4-20",
              no: 20,
              ref: "f1",
              text: "Anke Grothusen",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Gerekçesi öğrenme verimi: \"Zwei Stunden am Vormittag bringen mehr als vier am Abend\" — akşam kursunu takvime teslim olmak sayıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l4-21",
              no: 21,
              ref: "f1",
              text: "Tesfay Tadesse",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kursa ihtiyacı olduğunu kabul ediyor ama yükü kimin taşıdığına bakıyor: \"geht der Kurs auf ihre Kosten und nicht auf die des Betriebs\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l4-22",
              no: 22,
              ref: "f1",
              text: "Ayla Cakir",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "İki işyerini karşılaştırıyor ve farkı adlandırıyor: \"Der Unterschied war nicht der Kurs, sondern dass ich nicht müde war.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l4-23",
              no: 23,
              ref: "f1",
              text: "Jörg Bendig",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Gönüllü katılıma açık ama zorunluluğa karşı: on dokuz kişilik işyerinde üç kişi kursa gidince \"steht die Werkstatt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l4-24",
              no: 24,
              ref: "f1",
              text: "Irene Lohse",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Koşullu destek: \"Der Kurs muss zum Beruf passen.\" Genel kursa \"nach vier Wochen kam kaum noch jemand\", meslek kursunda ise \"war der Raum voll\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l4-25",
              no: 25,
              ref: "f1",
              text: "Marek Kollatz",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "İtirazı zamanla değil gözlenmeyle ilgili: meslektaşları \"vor dem Chef keine Fehler machen\" istemedikleri için bırakmış.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l4-26",
              no: 26,
              ref: "f1",
              text: "Frau Sperling",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Yarı yarıya paylaşılan bir düzeni savunuyor ve altı yıldır sürdüğünü söylüyor: \"Ganz umsonst wäre mir sogar unangenehm.\"",
            },
          ],
        },
        {
          id: "de-b1-12-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Kursordnung und die Aufgaben 27 bis 30. Wählen Sie a, b oder c.",
          promptTr: "Kurs yönetmeliğini ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Kursordnung",
              genreTr: "Kurs yönetmeliği",
              title: "Volkshochschule Ostheim — Kursordnung (Auszug)",
              body: `1. Anmeldung
Für alle Kurse ab Stufe A2 ist ein Einstufungstest nötig. Der Test ist kostenlos und gilt sechs Monate. Wer den Test nicht macht, kann nur in den Anfängerkurs.

2. Fehlzeiten
Wer mehr als ein Viertel der Termine versäumt, erhält keine Bescheinigung. Ärztlich belegte Fehltage zählen dabei nicht mit.

3. Wechsel
Ein Wechsel in einen anderen Kurs ist bis zur vierten Woche möglich, sofern dort ein Platz frei ist. Danach ist ein Wechsel nur zum nächsten Semester möglich.

4. Rücktritt
Bei einem Rücktritt bis eine Woche vor Kursbeginn erstatten wir die volle Gebühr. Danach behalten wir 30 Euro Bearbeitungsgebühr ein.`,
              gloss: [
                { de: "der Einstufungstest", tr: "seviye belirleme sınavı", en: "placement test" },
                { de: "die Fehlzeit", tr: "devamsızlık", en: "absence" },
                { de: "die Bescheinigung", tr: "belge", en: "certificate" },
                { de: "der Rücktritt", tr: "kayıttan çekilme", en: "withdrawal" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-12-l5-27",
              no: 27,
              ref: "o1",
              text: "Was gilt für den Einstufungstest?",
              options: [
                "Er ist bei jeder neuen Anmeldung zu wiederholen.",
                "Er ist gratis und ein halbes Jahr gültig.",
                "Er kostet Gebühr und gilt unbegrenzt.",
              ],
              answer: 1,
              explain:
                "Birinci madde iki bilgi veriyor: \"Der Test ist kostenlos und gilt sechs Monate.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l5-28",
              no: 28,
              ref: "o1",
              text: "Wann bekommt man keine Bescheinigung?",
              options: [
                "Bei jedem Termin ohne Bescheinigung.",
                "Bei mehr als drei ärztlich belegten Tagen.",
                "Bei über einem Viertel Fehlzeit.",
              ],
              answer: 2,
              explain:
                "Sınır ikinci maddede: \"mehr als ein Viertel der Termine\" — doktor raporlu günler bu hesaba girmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l5-29",
              no: 29,
              ref: "o1",
              text: "Was gilt für einen Kurswechsel?",
              options: [
                "Er ist jederzeit im Semester möglich.",
                "Er setzt einen freien Platz voraus.",
                "Er ist nur in der allerersten Woche erlaubt.",
              ],
              answer: 1,
              explain:
                "Üçüncü madde hem süreyi hem koşulu veriyor: dördüncü haftaya kadar ve \"sofern dort ein Platz frei ist\". Yer yoksa süre içinde de olmuyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-l5-30",
              no: 30,
              ref: "o1",
              text: "Was passiert bei einem Rücktritt nach Kursbeginn?",
              options: [
                "Die Gebühr wird ganz erstattet.",
                "Es gibt gar keine Erstattung.",
                "Ein Teil wird einbehalten.",
              ],
              answer: 2,
              explain:
                "Dördüncü madde bir tutar veriyor: \"behalten wir 30 Euro Bearbeitungsgebühr ein\" — yani kalanı iade ediliyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Beratungsgespräch, einen Vortrag und eine Diskussion.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir danışma görüşmesi, bir sunum ve bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-b1-12-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage in der Volkshochschule",
              genreTr: "Halk eğitim merkezinde anons",
              situation: "Sınav odası değişti.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für die Prüflinge: Der schriftliche Teil findet heute in Raum 214 statt, nicht in 108. Der mündliche Teil bleibt in 108. Beginn ist unverändert um neun Uhr.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir kurs yeri boşaldı.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Cakir, hier ist die Volkshochschule. Im Vormittagskurs ist ein Platz frei geworden. Der Kurs läuft seit zwei Wochen, Sie könnten also noch wechseln. Bitte melden Sie sich bis Donnerstag.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir sayı haberi.",
              plays: 1,
              segments: [
                {
                  text: "Im Landkreis haben im letzten Jahr rund zweitausendvierhundert Menschen einen Integrationskurs besucht. Etwa ein Drittel von ihnen hat den Kurs abgebrochen, meistens aus beruflichen Gründen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Gespräch im Bürgerhaus",
              genreTr: "Halk evinde konuşma",
              situation: "İki kişi buluşma saatini konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Frau Sperling", text: "Passt Ihnen der Mittwoch um siebzehn Uhr?" },
                { speaker: "Herr Tadesse", text: "Mittwoch ja, aber erst ab achtzehn. Vorher habe ich Dienst." },
                { speaker: "Frau Sperling", text: "Gut, dann achtzehn Uhr. Jede Woche gleich." },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir seviye sınavı hakkında.",
              plays: 1,
              segments: [
                {
                  text: "Hallo Herr Kollatz, hier ist das Sekretariat. Ihr Einstufungstest ist ausgewertet: Sie kommen in den Kurs B1.1, nicht in B1.2. Der Test gilt ein halbes Jahr, Sie müssen ihn also nicht wiederholen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-12-h1-1",
              no: 1,
              ref: "h1",
              text: "Beide Prüfungsteile finden in demselben Raum statt.",
              answer: false,
              explain:
                "Anons ikisini ayırıyor: yazılı 214'te, \"Der mündliche Teil bleibt in 108.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h1-2",
              no: 2,
              ref: "h1",
              text: "Was ändert sich nicht?",
              options: ["Der Raum für den schriftlichen Teil.", "Der Beginn.", "Die Reihenfolge der Teile."],
              answer: 1,
              explain:
                "Anons bunu ayrıca söylüyor: \"Beginn ist unverändert um neun Uhr.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-h1-3",
              no: 3,
              ref: "h2",
              text: "Der Vormittagskurs hat noch nicht begonnen.",
              answer: false,
              explain:
                "Kurs başlamış: \"Der Kurs läuft seit zwei Wochen\" — ama geçiş hâlâ mümkün.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h1-4",
              no: 4,
              ref: "h2",
              text: "Bis wann soll sich Frau Cakir melden?",
              options: ["Bis Mittwoch.", "Bis Freitag.", "Bis Donnerstag."],
              answer: 2,
              explain:
                "Mesajın son cümlesi: \"Bitte melden Sie sich bis Donnerstag.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-h1-5",
              no: 5,
              ref: "h3",
              text: "Die meisten Abbrüche haben mit der Arbeit zu tun.",
              answer: true,
              explain:
                "Haberde gerekçe veriliyor: bırakanlar \"meistens aus beruflichen Gründen\" ayrılmış.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h1-6",
              no: 6,
              ref: "h3",
              text: "Wie viele Menschen haben einen Kurs besucht?",
              options: ["Rund 2.400.", "Rund 800.", "Rund 24.000."],
              answer: 0,
              explain:
                "Kayıtta bir toplam ve bir oran var: \"rund zweitausendvierhundert Menschen\" ve bunların yaklaşık üçte biri.",
            },
            {
              kind: "bool",
              id: "de-b1-12-h1-7",
              no: 7,
              ref: "h4",
              text: "Die beiden treffen sich am Mittwoch um 17 Uhr.",
              answer: false,
              explain:
                "Gün doğru ama saat değil: \"Mittwoch ja, aber erst ab achtzehn\" — sonunda on sekizde anlaşıyorlar.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h1-8",
              no: 8,
              ref: "h4",
              text: "Wie oft wollen sie sich treffen?",
              options: ["Jeden Monat.", "Zweimal in der Woche.", "Jede Woche einmal."],
              answer: 2,
              explain:
                "Anlaşmanın son sözü: \"Jede Woche gleich\" — yani her hafta aynı gün ve saat.",
            },
            {
              kind: "bool",
              id: "de-b1-12-h1-9",
              no: 9,
              ref: "h5",
              text: "Herr Kollatz muss den Test wiederholen.",
              answer: false,
              explain:
                "Tersi söyleniyor: test yarım yıl geçerli, \"Sie müssen ihn also nicht wiederholen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h1-10",
              no: 10,
              ref: "h5",
              text: "In welchen Kurs kommt er?",
              options: ["In B1.1.", "In B1.2.", "In A2.2."],
              answer: 0,
              explain:
                "Mesaj iki seviyeyi karşılaştırıyor: \"Sie kommen in den Kurs B1.1, nicht in B1.2.\"",
            },
          ],
        },
        {
          id: "de-b1-12-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Beratungsgespräch. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir danışma görüşmesi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Beratungsgespräch",
              genreTr: "Danışma görüşmesi",
              situation: "Halk eğitim merkezinde sınav kaydı konuşuluyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Tadesse", text: "Ich möchte mich für die B1-Prüfung anmelden. Was brauche ich?" },
                {
                  speaker: "Beraterin",
                  text: "Das Formular, einen gültigen Ausweis und die Gebühr. Der Ausweis ist am Prüfungstag Pflicht; ohne ihn dürfen wir Sie nicht hereinlassen.",
                },
                { speaker: "Herr Tadesse", text: "Muss ich einen Kurs besucht haben?" },
                {
                  speaker: "Beraterin",
                  text: "Nein, die Prüfung ist für alle offen. Wir empfehlen aber den Einstufungstest, damit Sie wissen, wo Sie stehen. Der kostet nichts.",
                },
                { speaker: "Herr Tadesse", text: "Und wenn ich einen Teil nicht bestehe?" },
                {
                  speaker: "Beraterin",
                  text: "Dann wiederholen Sie nur diesen Teil, aber innerhalb eines Jahres. Danach zählt das Ergebnis nicht mehr, und Sie machen alles neu.",
                },
                { speaker: "Herr Tadesse", text: "Wie viel kostet eine Wiederholung?" },
                {
                  speaker: "Beraterin",
                  text: "Ein einzelner Teil kostet neunzig Euro, die ganze Prüfung hundertfünfundneunzig. Es lohnt sich also, die Frist einzuhalten.",
                },
                { speaker: "Herr Tadesse", text: "Kann ich mich noch für Juni anmelden?" },
                {
                  speaker: "Beraterin",
                  text: "Bis Freitag ja. Danach ist der Termin voll, und der nächste ist erst im September.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-12-h2-11",
              no: 11,
              ref: "g1",
              text: "Was ist am Prüfungstag Pflicht?",
              options: [
                "Eine Kursbescheinigung.",
                "Ein gültiger Ausweis.",
                "Der Einstufungstest.",
              ],
              answer: 1,
              explain:
                "Danışman koşulu sertçe veriyor: \"ohne ihn dürfen wir Sie nicht hereinlassen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h2-12",
              no: 12,
              ref: "g1",
              text: "Muss man vorher einen Kurs besuchen?",
              options: [
                "Nein, die Prüfung steht allen offen.",
                "Ja, mindestens einen Abendkurs.",
                "Nur bei der ersten Anmeldung.",
              ],
              answer: 0,
              explain:
                "\"Nein, die Prüfung ist für alle offen\" — seviye sınavı yalnız tavsiye ediliyor ve ücretsiz.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h2-13",
              no: 13,
              ref: "g1",
              text: "Was gilt bei einem nicht bestandenen Teil?",
              options: [
                "Man muss immer alles wiederholen.",
                "Man kann den Teil unbefristet nachholen.",
                "Man wiederholt ihn binnen eines Jahres.",
              ],
              answer: 2,
              explain:
                "Süre sınırı ve sonucu birlikte: bir yıl içinde tek bölüm, sonrasında \"zählt das Ergebnis nicht mehr\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h2-14",
              no: 14,
              ref: "g1",
              text: "Was kostet die Wiederholung eines Teils?",
              options: ["195 Euro.", "90 Euro.", "60 Euro."],
              answer: 1,
              explain:
                "İki fiyat karşılaştırılıyor: \"Ein einzelner Teil kostet neunzig Euro, die ganze Prüfung hundertfünfundneunzig.\" 90 ve 195.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h2-15",
              no: 15,
              ref: "g1",
              text: "Bis wann kann er sich für Juni anmelden?",
              options: [
                "Bis Freitag.",
                "Bis zum Prüfungstag.",
                "Gar nicht mehr, erst im September.",
              ],
              answer: 0,
              explain:
                "\"Bis Freitag ja. Danach ist der Termin voll\" — eylül ise bir sonraki tarih.",
            },
          ],
        },
        {
          id: "de-b1-12-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Sind die Aussagen richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir sunum dinleyeceksin. İfadeler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              title: "Wie Erwachsene eine Sprache lernen",
              situation: "Bir halk eğitim merkezinde konuşma; konuşan tek kişi.",
              plays: 2,
              segments: [
                {
                  text: "Guten Abend. Ich möchte mit einem Satz beginnen, den viele von Ihnen kennen: Kinder lernen Sprachen leichter. Das ist nur zur Hälfte richtig, und die andere Hälfte ist die interessantere.",
                },
                {
                  text: "Bei der Aussprache stimmt es. Wer nach der Pubertät anfängt, behält in aller Regel einen Akzent. Daran ändert auch viel Übung wenig.",
                },
                {
                  text: "Bei Wortschatz und Grammatik ist es umgekehrt. Erwachsene lernen schneller, weil sie schon eine Sprache analysieren können. Ein Kind braucht für dieselbe Regel deutlich mehr Beispiele.",
                },
                {
                  text: "Was Erwachsene wirklich bremst, ist selten das Gehirn. Es ist die Zeit. Ein Kind hört die Sprache neun Stunden am Tag, eine berufstätige Person vielleicht neunzig Minuten.",
                },
                {
                  text: "Deshalb ist unser wichtigster Rat unspektakulär: kurze Einheiten, aber täglich. Zwanzig Minuten an sechs Tagen bringen mehr als drei Stunden am Sonntag. In unseren Gruppen war der Unterschied nach einem halben Jahr deutlich sichtbar.",
                },
                {
                  text: "Ein zweiter Punkt betrifft die Fehler. Wer wartet, bis ein Satz richtig ist, spricht ihn nie. Die Teilnehmenden, die am schnellsten vorankamen, waren nicht die genauesten, sondern die, die am meisten geredet haben.",
                },
                {
                  text: "Zum Schluss eine Einschränkung: Unsere Beobachtungen stammen aus vier Kursen mit insgesamt achtundfünfzig Personen. Das ist eine Erfahrung, keine Studie. Nehmen Sie es als Hinweis, nicht als Beweis.",
                },
              ],
              gloss: [
                { de: "die Aussprache", tr: "telaffuz", en: "pronunciation" },
                { de: "analysieren", tr: "çözümlemek", en: "to analyse" },
                { de: "bremsen", tr: "yavaşlatmak", en: "to slow down" },
                { de: "vorankommen", tr: "ilerlemek", en: "to make progress" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-12-h3-16",
              no: 16,
              ref: "v1",
              text: "Bei der Aussprache haben Kinder einen Vorteil.",
              answer: true,
              explain:
                "\"Bei der Aussprache stimmt es. Wer nach der Pubertät anfängt, behält in aller Regel einen Akzent.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-h3-17",
              no: 17,
              ref: "v1",
              text: "Auch bei der Grammatik lernen Kinder schneller.",
              answer: false,
              explain:
                "Burada tersi geçerli: yetişkinler zaten bir dili çözümleyebildikleri için daha hızlı, çocuklar \"deutlich mehr Beispiele\" gerektiriyor.",
            },
            {
              kind: "bool",
              id: "de-b1-12-h3-18",
              no: 18,
              ref: "v1",
              text: "Das größte Hindernis für Erwachsene ist die Zeit.",
              answer: true,
              explain:
                "\"Was Erwachsene wirklich bremst, ist selten das Gehirn. Es ist die Zeit\" — çocuk günde dokuz saat, çalışan kişi belki doksan dakika duyuyor.",
            },
            {
              kind: "bool",
              id: "de-b1-12-h3-19",
              no: 19,
              ref: "v1",
              text: "Täglich kurz zu lernen bringt mehr als einmal lange.",
              answer: true,
              explain:
                "Karşılaştırma sayıyla veriliyor: \"Zwanzig Minuten an sechs Tagen bringen mehr als drei Stunden am Sonntag.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-h3-20",
              no: 20,
              ref: "v1",
              text: "Die genauesten Teilnehmenden kamen am schnellsten voran.",
              answer: false,
              explain:
                "Sunum tersini söylüyor: en hızlı ilerleyenler \"nicht die genauesten, sondern die, die am meisten geredet haben\".",
            },
            {
              kind: "bool",
              id: "de-b1-12-h3-21",
              no: 21,
              ref: "v1",
              text: "Der Redner stützt sich auf eine große Studie.",
              answer: false,
              explain:
                "Kendi sınırını koyuyor: dört kurs, elli sekiz kişi — \"Das ist eine Erfahrung, keine Studie.\"",
            },
            {
              kind: "bool",
              id: "de-b1-12-h3-22",
              no: 22,
              ref: "v1",
              text: "Der Redner rät dazu, trotz Fehlern zu sprechen.",
              answer: true,
              explain:
                "Konuşmacı bunu iki kez söylüyor: \"Wer wartet, bis ein Satz richtig ist, spricht ihn nie\" — ve en hızlı ilerleyenler en çok konuşanlar olmuş.",
            },
          ],
        },
        {
          id: "de-b1-12-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Diskussion",
              genreTr: "Tartışma",
              situation: "Bir bakım kurumunda mesai içi kurs tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Lohse, Sie wollen den Kurs in die Arbeitszeit legen. Warum?" },
                {
                  speaker: "Frau Lohse",
                  text: "Weil der Abendkurs bei uns gescheitert ist. Von vierzehn Angemeldeten kamen nach zwei Monaten noch vier. Nicht aus Faulheit — die Leute hatten Spätdienst.",
                },
                { speaker: "Moderatorin", text: "Herr Bendig, Sie führen einen kleinen Betrieb." },
                {
                  speaker: "Herr Bendig",
                  text: "Und deshalb sehe ich das anders. Bei neunzehn Beschäftigten fehlen mir drei Leute, wenn drei im Kurs sind. Für einen Konzern sind das Prozente, für mich ist das die halbe Frühschicht.",
                },
                {
                  speaker: "Frau Lohse",
                  text: "Der Einwand ist berechtigt. Er spricht aber gegen die Pflicht, nicht gegen das Angebot. Wir haben es freiwillig gemacht und trotzdem alle Plätze gefüllt.",
                },
                { speaker: "Moderatorin", text: "Herr Kollatz, Sie haben einen anderen Einwand." },
                {
                  speaker: "Herr Kollatz",
                  text: "Mir geht es nicht um die Stunden. Wer im Betrieb lernt, macht Fehler vor Kolleginnen und vor dem Chef. Zwei Frauen bei uns haben genau deswegen aufgehört.",
                },
                {
                  speaker: "Frau Lohse",
                  text: "Das habe ich auch erlebt, und wir haben daraus etwas gelernt: Die Leitung sitzt nicht im Raum. Seitdem ist es besser, aber nicht gelöst.",
                },
                { speaker: "Moderatorin", text: "Herr Bendig, wäre das für Sie ein Weg?" },
                {
                  speaker: "Herr Bendig",
                  text: "Ein Teil davon. Mir fehlt die Vertretung. Solange niemand die Schicht übernimmt, verschiebe ich die Arbeit nur auf die, die dableiben.",
                },
                {
                  speaker: "Frau Lohse",
                  text: "Da sind wir uns einig. Ohne Ersatzkraft ist es keine Lösung, sondern eine Umverteilung.",
                },
                { speaker: "Moderatorin", text: "Was schlagen Sie gemeinsam vor?" },
                {
                  speaker: "Herr Kollatz",
                  text: "Freiwillig, ohne Leitung im Raum, und mit einer bezahlten Vertretung. Wenn eins davon fehlt, wird es wieder das, was es vorher war.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-12-h4-23",
              no: 23,
              ref: "d1",
              text: "Warum ist der Abendkurs gescheitert?",
              options: [
                "Wegen der Dienstzeiten.",
                "Wegen der Kosten.",
                "Wegen des Lehrmaterials.",
              ],
              answer: 0,
              explain:
                "Frau Lohse tembelliği açıkça eliyor: \"Nicht aus Faulheit — die Leute hatten Spätdienst.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-24",
              no: 24,
              ref: "d1",
              text: "Was ist Herrn Bendigs Hauptargument?",
              options: [
                "Der Kurs bringt fachlich wenig.",
                "Die Beschäftigten wollen das nicht.",
                "Kleine Betriebe trifft es härter.",
              ],
              answer: 2,
              explain:
                "Karşılaştırmayı kendisi kuruyor: bir holding için yüzde, onun için \"die halbe Frühschicht\".",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie geht Frau Lohse mit diesem Einwand um?",
              options: [
                "Sie weist ihn zurück.",
                "Sie erkennt ihn an und grenzt ihn ein.",
                "Sie verschiebt ihn auf später.",
              ],
              answer: 1,
              explain:
                "\"Der Einwand ist berechtigt. Er spricht aber gegen die Pflicht, nicht gegen das Angebot.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-26",
              no: 26,
              ref: "d1",
              text: "Worum geht es Herrn Kollatz?",
              options: [
                "Um das Lernen vor den Vorgesetzten.",
                "Um die Zahl der Stunden.",
                "Um die Qualität der Lehrkräfte.",
              ],
              answer: 0,
              explain:
                "\"Mir geht es nicht um die Stunden\" — sorun patronun ve meslektaşların önünde hata yapmak; iki kişi bu yüzden bırakmış.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-27",
              no: 27,
              ref: "d1",
              text: "Wie hat Frau Lohses Einrichtung darauf reagiert?",
              options: [
                "Sie hat den Kurs abgeschafft.",
                "Sie hat die Gruppen verkleinert.",
                "Die Leitung nimmt nicht mehr teil.",
              ],
              answer: 2,
              explain:
                "\"Die Leitung sitzt nicht im Raum\" — ve durumun iyileştiğini ama çözülmediğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-28",
              no: 28,
              ref: "d1",
              text: "Was fehlt Herrn Bendig weiterhin?",
              options: [
                "Ein passender Raum.",
                "Eine Vertretung für die Schicht.",
                "Eine Zusage der Krankenkasse.",
              ],
              answer: 1,
              explain:
                "\"Solange niemand die Schicht übernimmt, verschiebe ich die Arbeit nur auf die, die dableiben.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-29",
              no: 29,
              ref: "d1",
              text: "Wie nennt Frau Lohse eine Lösung ohne Ersatzkraft?",
              options: [
                "Einen ersten Schritt.",
                "Einen Kompromiss.",
                "Eine Umverteilung.",
              ],
              answer: 2,
              explain:
                "\"Ohne Ersatzkraft ist es keine Lösung, sondern eine Umverteilung.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-12-h4-30",
              no: 30,
              ref: "d1",
              text: "Was schlagen die drei gemeinsam vor?",
              options: [
                "Drei Bedingungen zusammen.",
                "Eine Pflicht für große Betriebe.",
                "Einen Kurs nur am Wochenende.",
              ],
              answer: 0,
              explain:
                "Üçü birlikte sayılıyor — gönüllülük, yönetimin odada olmaması, ücretli vekil — ve \"Wenn eins davon fehlt, wird es wieder das, was es vorher war.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine Nachricht, einen Forumsbeitrag und eine kurze offizielle Mitteilung.",
      instructionTr: "Bu bölümde üç görev var: bir ileti, bir forum yorumu ve kısa resmî bir bildirim.",
      tasks: [
        {
          id: "de-b1-12-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ein Freund hat gerade die B1-Prüfung bestanden und fragt Sie, wie es weitergeht. Schreiben Sie ihm (circa 80 Wörter). Erzählen Sie von Ihrer eigenen Erfahrung nach der Prüfung, nennen Sie eine Schwierigkeit und geben Sie einen Rat.",
          promptTr:
            "Bir arkadaşın B1 sınavını yeni geçti ve bundan sonra ne yapacağını soruyor. Ona yaz (yaklaşık 80 kelime). Sınavdan sonraki kendi deneyimini anlat, bir zorluk söyle ve bir tavsiye ver.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "von der eigenen Erfahrung erzählen", tr: "Kendi deneyimini anlatmak" },
              { de: "eine Schwierigkeit nennen", tr: "Bir zorluk söylemek" },
              { de: "einen Rat geben", tr: "Bir tavsiye vermek" },
              { de: "zum Weitermachen ermutigen", tr: "Devam etmeye cesaretlendirmek" },
            ],
            sample: `Hallo Tesfay,

herzlichen Glückwunsch! Bei mir kam nach der Prüfung erst der schwierige Teil.

Im Kurs habe ich fast alles verstanden, im Betrieb dann kaum etwas. Meine Kollegen sprechen schnell und im Dialekt, und niemand wiederholt etwas.

Was mir geholfen hat, war nicht ein neuer Kurs, sondern eine feste Stunde pro Woche mit einer Nachbarin. Ohne Buch, einfach reden.

Wenn du magst, frag im Bürgerhaus nach einer Patenschaft. Und rede viel, auch mit Fehlern — darauf wartet sonst niemand.

Viele Grüße
Ayla`,
            criteria: [
              "Dört içerik noktasının hepsi var mı?",
              "Deneyim somut mu (ne zaman, ne oldu)?",
              "Zorluk gerçekten adlandırıldı mı?",
              "Tavsiye uygulanabilir mi?",
              "Yaklaşık 80 kelime var mı ve arkadaşa yazıldığı için `du` kullanıldı mı?",
              "Konjunktiv II ya da ilgi cümlesi kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-12-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Forum wird gefragt: \"Lernt man eine Sprache besser im Kurs oder im Alltag?\" Schreiben Sie einen Beitrag (circa 80 Wörter). Nennen Sie Ihre Meinung, begründen Sie sie mit einem Beispiel und gehen Sie auf eine andere Meinung ein.",
          promptTr:
            "Bir forumda soruluyor: \"Bir dil kursta mı daha iyi öğrenilir, günlük hayatta mı?\" Bir yorum yaz (yaklaşık 80 kelime). Görüşünü söyle, bir örnekle gerekçelendir ve başka bir görüşe değin.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "eine Meinung nennen", tr: "Bir görüş söylemek" },
              { de: "mit einem Beispiel begründen", tr: "Bir örnekle gerekçelendirmek" },
              { de: "auf eine andere Meinung eingehen", tr: "Başka bir görüşe değinmek" },
              { de: "einen Schluss ziehen", tr: "Bir sonuca bağlamak" },
            ],
            sample: `Ich glaube, dass die Frage falsch gestellt ist. Beides zusammen wirkt, einzeln fast nicht.

Ich habe zwei Jahre Kurse besucht und konnte danach jede Regel erklären. Am ersten Arbeitstag habe ich trotzdem die Hälfte nicht verstanden, weil im Kurs niemand schnell spricht.

Manche sagen, Kurse seien reine Zeitverschwendung. Das finde ich zu einfach: Ohne den Kurs hätte ich im Betrieb nicht einmal gemerkt, welche Wörter ich nicht kenne.

Deshalb würde ich beides machen — Kurs für die Regeln, Alltag für das Tempo.`,
            criteria: [
              "Dört içerik noktasının hepsi var mı?",
              "Görüş açıkça söylendi mi?",
              "Örnek gerçekten savı destekliyor mu?",
              "Karşı görüş güçlü hâliyle mi alındı?",
              "Yaklaşık 80 kelime var mı ve forum diline uygun mu?",
              "Konjunktiv II ya da ileri bir bağlaç kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-12-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie können am Prüfungstag nicht kommen. Schreiben Sie an das Prüfungsamt (circa 40 Wörter). Erklären Sie den Grund und fragen Sie nach dem weiteren Vorgehen.",
          promptTr:
            "Sınav günü gelemiyorsun. Sınav birimine yaz (yaklaşık 40 kelime). Gerekçeni açıkla ve bundan sonra ne yapman gerektiğini sor.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "den Grund nennen", tr: "Gerekçeyi söylemek" },
              { de: "nach dem Vorgehen fragen", tr: "Nasıl ilerleneceğini sormak" },
              { de: "Anrede und Gruß", tr: "Hitap ve veda" },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 14. Juni kann ich leider nicht zur Prüfung kommen. Ich bin seit Montag krank und habe eine Bescheinigung vom Arzt.

Könnten Sie mir mitteilen, ob ich den Termin verschieben kann und bis wann ich das Attest einreichen muss?

Mit freundlichen Grüßen
Tesfay Tadesse`,
            criteria: [
              "Gerekçe somut mu ve belge belirtildi mi?",
              "Soru gerçekten ilerleyişi soruyor mu?",
              "Hitap ve veda var mı ve kuruma uygun mu?",
              "Yaklaşık 40 kelime var mı ve `Sie` kullanıldı mı?",
              "Konjunktiv II ile kibar bir soru kuruldu mu?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam etwas planen, einen kurzen Vortrag halten und darauf reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte plan yapmak, kısa bir sunum yapmak ve ona karşılık vermek.",
      tasks: [
        {
          id: "de-b1-12-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam eine Sprachgruppe für Ihren Ort. Sprechen Sie über: Zeit — Ort — Teilnehmerzahl — Ablauf — Werbung.",
          promptTr:
            "Bulunduğun yer için birlikte bir konuşma grubu planlayın. Şunları konuşun: zaman — yer — katılımcı sayısı — akış — duyuru.",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen eine Sprachgruppe. Ich schlage den Mittwochabend vor. Was meinen Sie?",
              tr: "Bir konuşma grubu planlıyoruz. Ben çarşamba akşamını öneriyorum. Sen ne diyorsun?",
            },
            { who: "you", hint: "Öneriye karşılık ver ve kendi zamanını gerekçelendir.", expect: "bir öneriye karşılık verip kendi önerisini gerekçelendirmek", seconds: 40 },
            {
              who: "partner",
              de: "Und wo? Im Bürgerhaus ist es kostenlos, aber laut. Im Café ist es angenehmer, aber wir müssen etwas bestellen.",
              tr: "Nerede? Halk evi bedava ama gürültülü. Kafe daha rahat ama bir şeyler ısmarlamak gerekiyor.",
            },
            { who: "you", hint: "Bir yer seç ve iki gerekçeyi de tart.", expect: "gerekçeli bir seçim yapıp iki argümanı da tartmak", seconds: 40 },
            {
              who: "partner",
              de: "Wie viele Leute sollen kommen? Ich hätte gern zwanzig, dann lohnt es sich.",
              tr: "Kaç kişi gelsin? Ben yirmi kişi isterdim, o zaman değer.",
            },
            { who: "you", hint: "Bir sayı öner ve neden olduğunu söyle.", expect: "gerekçeli bir sayı önermek", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, was wir entschieden haben.",
              tr: "Peki. Neye karar verdiğimizi özetler misin?",
            },
            { who: "you", hint: "Kararları kısaca özetle.", expect: "varılan kararları özetlemek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneri yapmak ve gerekçelendirmek" },
              { de: "auf Vorschläge reagieren", tr: "Önerilere karşılık vermek" },
              { de: "eine Entscheidung treffen", tr: "Bir karara varmak" },
              { de: "zusammenfassen", tr: "Özetlemek" },
            ],
            sample:
              "Mittwochabend ist schwierig, weil viele im Schichtdienst arbeiten und um achtzehn Uhr noch nicht frei sind. Ich würde später anfangen, ab neunzehn Uhr. Beim Ort bin ich für das Bürgerhaus, obwohl es lauter ist. Im Café müsste jeder etwas bestellen, und genau das hält Leute fern, für die Geld eine Rolle spielt. Zwanzig finde ich zu viel: In einer großen Gruppe reden immer dieselben drei. Acht bis zehn wären besser. Zusammengefasst: mittwochs ab neunzehn Uhr im Bürgerhaus, acht bis zehn Personen, und wir hängen Zettel in der Volkshochschule und in der Bibliothek auf.",
            criteria: [
              "Beş noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi?",
              "Karşı tarafın önerisine gerçekten karşılık verildi mi?",
              "Özet eksiksiz mi?",
              "B1 yapıları (Konjunktiv II, weil/obwohl) kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-12-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa drei Minuten zum Thema \"Eine Sprache lernen — was wirklich hilft\". Gliedern Sie: Einstieg — eigene Erfahrung — was leicht war — was schwer war — ein Rat — Einwand dagegen — Abschluss.",
          promptTr:
            "\"Bir dil öğrenmek — gerçekten ne işe yarıyor?\" konusunda yaklaşık üç dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi deneyimin — kolay olan — zor olan — bir tavsiye — ona bir itiraz — kapanış.",
          prepSeconds: 60,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve bölümleme" },
              { de: "eigene Erfahrung schildern", tr: "Kendi deneyimini anlatmak" },
              { de: "Leichtes und Schweres unterscheiden", tr: "Kolay ve zor olanı ayırmak" },
              { de: "einen Rat mit Einwand", tr: "Bir tavsiye ve ona itiraz" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute darüber sprechen, was beim Sprachenlernen wirklich hilft. Zuerst erzähle ich von mir, dann trenne ich das Leichte vom Schweren, danach gebe ich einen Rat und nenne einen Einwand dagegen. Ich lerne seit drei Jahren Deutsch und habe im Juni die B1-Prüfung bestanden. Leicht war für mich die Grammatik, weil ich in meiner Sprache ähnliche Fälle habe und schon wusste, wonach ich suchen muss. Schwer war und ist das Zuhören. Im Kurs verstehe ich fast alles, im Betrieb höre ich Dialekt und schnelles Sprechen, und dann bin ich wieder Anfängerin. Mein Rat wäre: Suchen Sie sich eine feste Stunde pro Woche mit einer Person, die kein Lehrer ist. Der Einwand dagegen ist ernst: Nicht jeder findet so eine Person, und man kann sie nicht kaufen. Bei uns hat der Verein erst genug Leute gefunden, als er nach festen Zeiten gefragt hat statt nach Hilfe. Zusammenfassend: Der Kurs gibt die Regeln, aber das Tempo lernt man nur bei Menschen, die keine Rücksicht nehmen.",
            criteria: [
              "Yedi bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kolay ile zor olan gerçekten ayrıldı mı?",
              "Tavsiye somut mu?",
              "İtiraz gerçek bir itiraz mı, yoksa göstermelik mi?",
              "Üç dakika boyunca yapı korunabildi mi?",
              "B1 yapıları (Konjunktiv II, ilgi cümlesi, ileri bağlaçlar) kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-12-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt: "Reagieren Sie auf Fragen zu Ihrem Vortrag und stellen Sie selbst eine Frage.",
          promptTr: "Sunumunla ilgili sorulara karşılık ver ve kendin de bir soru sor.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Danke für den Vortrag. Sie sagen, das Zuhören sei am schwersten. Woran liegt das genau?",
              tr: "Sunum için teşekkürler. En zor şeyin dinlemek olduğunu söylüyorsun. Bu tam olarak neden?",
            },
            { who: "you", hint: "Somut bir durumla açıkla.", expect: "iddiayı somut bir durumla açıklamak", seconds: 40 },
            {
              who: "partner",
              de: "Ein Einwand: Man kann Hörverstehen doch mit Videos üben. Warum reicht das nicht?",
              tr: "Bir itiraz: Dinlemeyi videoyla da çalışabilirsin. Bu neden yetmiyor?",
            },
            { who: "you", hint: "İtirazı kabul et ve sınırını göster.", expect: "bir itirazı kabul edip sınırını göstermek", seconds: 40 },
            {
              who: "partner",
              de: "Jetzt sind Sie dran: Stellen Sie mir eine Frage zu meinem Lernen.",
              tr: "Şimdi sıra sende: Bana öğrenme sürecimle ilgili bir soru sor.",
            },
            { who: "you", hint: "Açık uçlu bir soru kur.", expect: "açık uçlu ve konuya bağlı bir soru kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "auf Nachfragen antworten", tr: "Sorulara karşılık vermek" },
              { de: "einen Einwand aufnehmen", tr: "Bir itirazı ele almak" },
              { de: "selbst eine Frage stellen", tr: "Kendin bir soru sormak" },
            ],
            sample:
              "Bei der Übergabe am Schichtende sprechen drei Leute gleichzeitig, und niemand wiederholt etwas. In dieser Minute entscheidet sich, ob ich die Nacht gut anfange. Ihr Einwand stimmt teilweise: Mit Videos habe ich das Tempo geübt, und das hat geholfen. Nur kann ich ein Video anhalten, meine Kollegin nicht. Deshalb übe ich beides. Darf ich fragen: Was machen Sie, wenn Sie in einem Gespräch etwas nicht verstehen — fragen Sie sofort nach oder warten Sie ab?",
            criteria: [
              "Sorular gerçekten cevaplandı mı?",
              "Açıklama somut bir durumla desteklendi mi?",
              "İtiraz kabul edilip sınırı gösterildi mi?",
              "Sorulan soru açık uçlu ve konuya bağlı mı?",
            ],
          },
        },
      ],
    },
  ],
};
