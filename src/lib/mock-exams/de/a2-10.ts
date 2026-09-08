import type { MockPaper } from "../types";

/**
 * A2 · Deneme 10 — "Haushalt und Reparaturen".
 *
 * PLAN kâğıt 1–9 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 ana fikir · 5 ayrıntı · 5 ayrıntı · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 üç şıklı · 5 eşleştirme · 5 üç şıklı · 5 R/F söyleşi)
 *   Schreiben 30 dk           özel ileti (~40) + yarı resmî ileti (~40)
 *   Sprechen  15 dk           soru sorma · anlatma · birlikte planlama
 *
 * KONU SEÇİMİ: ev işleri ve tamir. A2 öğrencisinin kirada otururken en sık
 * yazdığı ileti türü burada: arıza bildirimi, randevu, garanti sorusu. İlk
 * dokuz kâğıt bu alana girmedi.
 *
 * DİKKAT EDİLEN: A2-09'un denetiminde çıkan kusur bu kâğıtta baştan
 * engellendi — her maddede doğru şık bilerek en uzun şık DEĞİL, ve anahtar
 * dağılımı görev görev planlandı. Doğru cevabı tam yazıp çeldiricileri kısa
 * geçmek, yazarken fark edilmeyen ama denetimin hemen yakaladığı bir alışkanlık.
 */
export const A2_10: MockPaper = {
  id: "de-a2-10",
  course: "de",
  level: "A2",
  no: 10,
  theme: "Haushalt und Reparaturen",
  themeTr: "Ev işleri ve tamir",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen kurze Nachrichten, zwei längere Texte und Anzeigen. Wählen Sie jeweils die richtige Lösung.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa iletiler, iki uzun metin ve ilanlar okuyacaksın. Her seferinde doğru cevabı işaretle.",
      tasks: [
        {
          id: "de-a2-10-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die fünf Texte. Worum geht es? Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Beş metni oku. Konu ne? a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Nachricht an die Hausverwaltung",
              genreTr: "Site yönetimine ileti",
              body: `Sehr geehrte Damen und Herren,

seit Montag wird meine Heizung im Wohnzimmer nicht mehr warm.

In der Küche funktioniert sie, deshalb glaube ich nicht, dass es an der Anlage im Keller liegt.

Können Sie bitte jemanden schicken? Vormittags bin ich zu Hause.`,
              gloss: [
                { de: "die Heizung", tr: "kalorifer", en: "heating" },
                { de: "die Anlage", tr: "tesisat", en: "system, installation" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Treppenhaus",
              genreTr: "Merdiven boşluğundaki duyuru",
              body: `Am Mittwoch wird von 8 bis 14 Uhr das Wasser abgestellt.

Der Grund ist eine Reparatur am Rohr im Keller.

Bitte lassen Sie an dem Tag keine Waschmaschine laufen und stellen Sie sich etwas Wasser bereit.`,
              gloss: [{ de: "das Rohr", tr: "boru", en: "pipe" }],
            },
            {
              kind: "text",
              id: "t3",
              genre: "E-Mail einer Werkstatt",
              genreTr: "Atölyeden e-posta",
              body: `Sehr geehrter Herr Mohr,

Ihre Waschmaschine läuft wieder. Das Teil war günstiger als gedacht: statt neunzig nur fünfundfünfzig Euro.

Abholen können Sie sie ab morgen. Bitte bringen Sie den Zettel mit, den Sie bei der Abgabe bekommen haben.`,
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Im Landkreis gibt es inzwischen elf Reparatur-Cafés.

Am häufigsten gebracht werden Lampen und Toaster, weil die Reparatur dort oft nur eine Schraube kostet.

Fernseher dagegen nehmen die meisten Cafés nicht an, weil dafür Spezialwerkzeug nötig ist.`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "Nachricht in der Hausgruppe",
              genreTr: "Bina grubundaki mesaj",
              body: `Hat jemand eine Bohrmaschine, die ich am Wochenende leihen kann?

Ich brauche sie nur für zwei Löcher im Bad.

Wenn niemand eine hat, miete ich eine im Baumarkt, aber das kostet für einen Tag schon zwölf Euro.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-10-l1-1",
              no: 1,
              ref: "t1",
              text: "Was möchte die Person?",
              options: [
                "Einen Handwerker am Vormittag.",
                "Eine neue Heizung für die ganze Wohnung.",
                "Eine Reparatur der Anlage im Keller.",
              ],
              answer: 0,
              explain:
                "Rica tek cümlede: \"Können Sie bitte jemanden schicken? Vormittags bin ich zu Hause.\" Bodrumdaki tesisatı ise kendisi olası sebep saymıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l1-2",
              no: 2,
              ref: "t2",
              text: "Was sagt der Aushang?",
              options: [
                "Am Mittwoch fällt der Strom für sechs Stunden aus.",
                "Man soll am Mittwoch nicht waschen.",
                "Die Reparatur dauert den ganzen Tag.",
              ],
              answer: 1,
              explain:
                "Duyuru iki şey istiyor ve ilki bu: \"lassen Sie an dem Tag keine Waschmaschine laufen\". Kesinti sudadır ve 8–14 arası sürer.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l1-3",
              no: 3,
              ref: "t3",
              text: "Was ist die wichtigste Information?",
              options: [
                "Die Reparatur hat neunzig Euro gekostet.",
                "Die Maschine muss noch einmal in die Werkstatt.",
                "Die Reparatur war billiger als gedacht.",
              ],
              answer: 2,
              explain:
                "İki fiyat karşılaştırılıyor: \"statt neunzig nur fünfundfünfzig Euro\". Makine hazır, ikinci bir işlem gerekmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l1-4",
              no: 4,
              ref: "t4",
              text: "Was ist die Hauptaussage?",
              options: [
                "Kleine Geräte werden am häufigsten repariert.",
                "Reparatur-Cafés nehmen alle Geräte an.",
                "Im Landkreis schließen viele Reparatur-Cafés.",
              ],
              answer: 0,
              explain:
                "Metin en sık gelenleri sayıyor — lamba ve tost makinesi — ve bir grubu dışlıyor: \"Fernseher dagegen nehmen die meisten Cafés nicht an\".",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l1-5",
              no: 5,
              ref: "t5",
              text: "Was möchte die Person?",
              options: [
                "Eine Bohrmaschine im Baumarkt kaufen.",
                "Hilfe bei zwei Löchern im Badezimmer.",
                "Ein Gerät für kurze Zeit leihen.",
              ],
              answer: 2,
              explain:
                "Soru ödünç alma üzerine: \"Hat jemand eine Bohrmaschine, die ich am Wochenende leihen kann?\" Kiralama yalnız bir yedek plan.",
            },
          ],
        },
        {
          id: "de-a2-10-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 6 bis 10. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Metni ve 6–10. maddeleri oku. a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Samstags wird geschraubt",
              body: `Im Bürgerhaus in Rehfeld stehen an jedem ersten Samstag im Monat sechs Tische.

An jedem Tisch sitzt jemand, der etwas reparieren kann. Die Gäste bringen ihre kaputten Sachen mit und schauen zu.

"Wir reparieren nicht für die Leute, sondern mit ihnen", sagt Anna Sikora, die das Café vor vier Jahren angefangen hat.

Am Anfang kamen zwölf Leute. Heute sind es an einem guten Tag über achtzig.

Repariert wird alles außer Handys. Dafür fehlt den Ehrenamtlichen das Werkzeug, und die Geräte sind zu fest verklebt.

Etwa zwei von drei Sachen werden wieder heil. Bei den anderen erklärt jemand wenigstens, warum es nicht geht.

Geld nimmt das Café nicht. Wer möchte, wirft etwas in eine Dose, und davon werden Schrauben und Kabel gekauft.

Ein Problem gibt es doch: Es fehlen jüngere Helfer. Die meisten am Tisch sind über sechzig.`,
              gloss: [
                { de: "schrauben", tr: "vidalamak", en: "to screw" },
                { de: "verklebt", tr: "yapıştırılmış", en: "glued shut" },
                { de: "heil", tr: "sağlam", en: "intact, working" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-10-l2-6",
              no: 6,
              ref: "r1",
              text: "Wie oft findet das Reparatur-Café statt?",
              options: [
                "An jedem Samstag im Monat.",
                "Einmal im Monat.",
                "Alle zwei Wochen am Samstag.",
              ],
              answer: 1,
              explain:
                "İlk cümle sıklığı veriyor: \"an jedem ersten Samstag im Monat\" — yani ayda bir.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l2-7",
              no: 7,
              ref: "r1",
              text: "Was ist Frau Sikora wichtig?",
              options: [
                "Dass die Reparatur schnell geht.",
                "Dass die Gäste nichts bezahlen müssen.",
                "Dass die Gäste dabei sind.",
              ],
              answer: 2,
              explain:
                "Kendi cümlesi bunu söylüyor: \"Wir reparieren nicht für die Leute, sondern mit ihnen\". Misafirler izliyor ve katılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l2-8",
              no: 8,
              ref: "r1",
              text: "Warum werden Handys nicht repariert?",
              options: [
                "Weil das Werkzeug fehlt.",
                "Weil die Geräte zu neu sind.",
                "Weil die Ehrenamtlichen zu wenige sind.",
              ],
              answer: 0,
              explain:
                "İki sebep birlikte veriliyor: \"Dafür fehlt den Ehrenamtlichen das Werkzeug, und die Geräte sind zu fest verklebt.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l2-9",
              no: 9,
              ref: "r1",
              text: "Wie viele Sachen werden wieder heil?",
              options: [
                "Ungefähr die Hälfte aller Geräte.",
                "Etwa zwei Drittel.",
                "Fast alle Sachen, die kommen.",
              ],
              answer: 1,
              explain:
                "\"Etwa zwei von drei Sachen werden wieder heil\" — üçte iki demek. Kalanlarda en azından sebep açıklanıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l2-10",
              no: 10,
              ref: "r1",
              text: "Welches Problem nennt der Text?",
              options: [
                "Es kommen zu wenige Gäste ins Bürgerhaus.",
                "Das Café hat kein Geld für Werkzeug.",
                "Es fehlen junge Helfer.",
              ],
              answer: 2,
              explain:
                "Sorun son cümlede ve gerekçeli: \"Es fehlen jüngere Helfer. Die meisten am Tisch sind über sechzig.\"",
            },
          ],
        },
        {
          id: "de-a2-10-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Blogtext und die Aufgaben 11 bis 15. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Blog metnini ve 11–15. maddeleri oku. a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "r2",
              genre: "Blogtext",
              genreTr: "Blog yazısı",
              title: "Ein Jahr nichts Neues gekauft",
              body: `Im Januar habe ich beschlossen, ein Jahr lang kein Gerät neu zu kaufen.

Kaputt gegangen sind in diesem Jahr fünf Dinge: eine Lampe, ein Wasserkocher, ein Staubsauger, eine Uhr und mein Fahrrad.

Vier davon konnte ich reparieren lassen. Nur der Staubsauger war nicht zu retten.

Am meisten überrascht hat mich der Wasserkocher. Ich dachte, so etwas wirft man weg. Es war aber nur ein Kabel.

Gespart habe ich weniger, als ich gehofft hatte. Die Reparaturen haben zusammen etwa hundertzwanzig Euro gekostet.

Gewonnen habe ich etwas anderes: Ich weiß jetzt, wie mein Fahrrad innen aussieht.

Schwierig war die Zeit. Für den Staubsauger bin ich dreimal zur Werkstatt gefahren, bis jemand gesagt hat, dass es nicht geht.

Im nächsten Jahr mache ich weiter. Aber ich frage vorher, ob eine Reparatur überhaupt möglich ist.`,
              gloss: [
                { de: "der Wasserkocher", tr: "su ısıtıcısı", en: "kettle" },
                { de: "retten", tr: "kurtarmak", en: "to save" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-10-l3-11",
              no: 11,
              ref: "r2",
              text: "Wie viele Geräte konnte der Autor reparieren lassen?",
              options: ["Alle fünf Geräte im Jahr.", "Nur eines.", "Vier."],
              answer: 2,
              explain:
                "İki sayı ayrılmalı: beş şey bozulmuş, \"Vier davon konnte ich reparieren lassen\". Kalan tek şey elektrikli süpürge.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l3-12",
              no: 12,
              ref: "r2",
              text: "Was hat ihn am meisten überrascht?",
              options: [
                "Dass der Wasserkocher zu retten war.",
                "Dass die Uhr kaputtgegangen ist.",
                "Dass das Fahrrad so teuer war.",
              ],
              answer: 0,
              explain:
                "\"Am meisten überrascht hat mich der Wasserkocher\" — atılacağını sanmış, oysa sorun yalnız bir kabloymuş.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l3-13",
              no: 13,
              ref: "r2",
              text: "Was sagt der Autor über das Geld?",
              options: [
                "Er hat überhaupt nichts gespart.",
                "Er hat weniger gespart als erwartet.",
                "Er hat mehr gespart als erwartet.",
              ],
              answer: 1,
              explain:
                "\"Gespart habe ich weniger, als ich gehofft hatte\" — tamirler toplam yüz yirmi euro tutmuş.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l3-14",
              no: 14,
              ref: "r2",
              text: "Was war schwierig?",
              options: [
                "Die hohen Kosten der Reparaturen.",
                "Die Suche nach einer Werkstatt.",
                "Der Zeitaufwand.",
              ],
              answer: 2,
              explain:
                "\"Schwierig war die Zeit\" — bir cihaz için üç kez atölyeye gitmiş ve sonunda olmadığını öğrenmiş.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-l3-15",
              no: 15,
              ref: "r2",
              text: "Was macht er im nächsten Jahr anders?",
              options: [
                "Er fragt vorher nach.",
                "Er kauft den Staubsauger neu.",
                "Er fährt öfter zur Werkstatt.",
              ],
              answer: 0,
              explain:
                "Devam ediyor ama bir adım ekliyor: \"Aber ich frage vorher, ob eine Reparatur überhaupt möglich ist.\"",
            },
          ],
        },
        {
          id: "de-a2-10-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 brauchen Hilfe im Haushalt. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler evle ilgili yardım arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Reparatur-Café Rehfeld",
              body: "Erster Samstag im Monat, 14 bis 18 Uhr im Bürgerhaus. Kleine Geräte und Fahrräder, kein Handy. Kostenlos.",
            },
            {
              key: "b",
              label: "Werkzeug ausleihen",
              body: "Bohrmaschine, Leiter und Säge für einen Tag. 5 Euro, Ausweis nötig. Ausgabe Mo bis Fr 16 bis 19 Uhr.",
            },
            {
              key: "c",
              label: "Notdienst Sanitär",
              body: "Rund um die Uhr erreichbar, auch am Wochenende. Anfahrt 60 Euro, danach nach Aufwand.",
            },
            {
              key: "d",
              label: "Umzugshilfe",
              body: "Zwei Studenten mit Transporter, 25 Euro pro Stunde. Termine samstags, Anfragen per Nachricht.",
            },
            {
              key: "e",
              label: "Nähen und Ändern",
              body: "Reißverschlüsse, Knöpfe, Hosen kürzen. Abgabe Di und Do, Abholung nach drei Tagen.",
            },
            {
              key: "f",
              label: "Haushaltshilfe gesucht",
              body: "Wir suchen jemanden für Putzen und Einkaufen, vier Stunden pro Woche. Bezahlung nach Absprache.",
            },
            {
              key: "g",
              label: "Elektro-Schnellhilfe",
              body: "Steckdosen, Lampen, Sicherungen. Termin innerhalb von 48 Stunden, Werktag zwischen 8 und 17 Uhr.",
            },
            {
              key: "h",
              label: "Möbelaufbau",
              body: "Wir bauen Ihre Schränke und Betten auf. Ab 40 Euro, Werkzeug bringen wir mit. Auch abends.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-10-l4-16",
              no: 16,
              text: "Frau Dobrev hat einen kaputten Toaster und möchte nichts bezahlen.",
              answer: "a",
              explain:
                "(a) küçük cihazları alıyor ve ücretsiz. Telefon almadığı yazıyor ama tost makinesi bu gruba giriyor.",
            },
            {
              kind: "match",
              id: "de-a2-10-l4-17",
              no: 17,
              text: "Herr Lichtenberg braucht am Samstag eine Leiter für einen Tag.",
              answer: "b",
              explain:
                "(b) merdiveni günlük veriyor: \"Bohrmaschine, Leiter und Säge für einen Tag. 5 Euro\".",
            },
            {
              kind: "match",
              id: "de-a2-10-l4-18",
              no: 18,
              text: "Bei Frau Ergün läuft nachts Wasser aus dem Rohr unter der Spüle.",
              answer: "c",
              explain:
                "(c) tek gece hizmeti: \"Rund um die Uhr erreichbar, auch am Wochenende\". Öteki ilanlar mesai saatinde çalışıyor.",
            },
            {
              kind: "match",
              id: "de-a2-10-l4-19",
              no: 19,
              text: "Herr Behrens hat einen neuen Schrank gekauft und kann ihn nicht allein aufbauen.",
              answer: "h",
              explain:
                "(h) tam bu iş için: \"Wir bauen Ihre Schränke und Betten auf\" ve aleti kendileri getiriyor.",
            },
            {
              kind: "match",
              id: "de-a2-10-l4-20",
              no: 20,
              text: "Frau Sikora hat eine Lampe ohne Strom und braucht diese Woche einen Termin.",
              answer: "g",
              explain:
                "(g) hem işi hem süreyi karşılıyor: \"Steckdosen, Lampen, Sicherungen. Termin innerhalb von 48 Stunden.\"",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie hören Gespräche, ein längeres Gespräch, Ansagen und ein Interview.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, uzun bir konuşma, anonslar ve bir söyleşi dinleyeceksin.",
      tasks: [
        {
          id: "de-a2-10-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Telefongespräch mit der Hausverwaltung",
              genreTr: "Site yönetimiyle telefon",
              situation: "Bir kiracı arıza bildiriyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ergün", text: "Meine Heizung wird seit Montag nicht mehr warm." },
                { speaker: "Mitarbeiter", text: "Der Handwerker kann am Donnerstag zwischen acht und zwölf kommen." },
                { speaker: "Frau Ergün", text: "Da arbeite ich. Geht auch der Nachmittag?" },
                { speaker: "Mitarbeiter", text: "Dann erst nächste Woche Dienstag." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch in der Werkstatt",
              genreTr: "Atölyede konuşma",
              situation: "Bir müşteri tamir fiyatını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Mohr", text: "Was kostet die Reparatur ungefähr?" },
                { speaker: "Meisterin", text: "Das Teil kostet fünfundfünfzig Euro, die Arbeit dreißig." },
                { speaker: "Herr Mohr", text: "Also fünfundachtzig zusammen." },
                { speaker: "Meisterin", text: "Genau." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Baumarkt",
              genreTr: "Yapı marketinde konuşma",
              situation: "Bir müşteri alet kiralamak istiyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Kann ich eine Bohrmaschine für einen Tag mieten?" },
                { speaker: "Mitarbeiterin", text: "Ja, zwölf Euro. Sie brauchen aber einen Ausweis und dreißig Euro Pfand." },
                { speaker: "Kunde", text: "Das Pfand bekomme ich zurück?" },
                { speaker: "Mitarbeiterin", text: "Ja, bei der Rückgabe." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch im Reparatur-Café",
              genreTr: "Tamir kafesinde konuşma",
              situation: "Bir kadın lambasını getiriyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Dobrev", text: "Können Sie sich die Lampe ansehen?" },
                { speaker: "Helfer", text: "Gern. Setzen Sie sich bitte dazu, wir machen das zusammen." },
                { speaker: "Frau Dobrev", text: "Ich kann so etwas gar nicht." },
                { speaker: "Helfer", text: "Deshalb sitzen Sie ja daneben." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir müşteri garantiyi soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Behrens", text: "Die Maschine ist erst ein Jahr alt. Zahlt die Garantie?" },
                { speaker: "Mitarbeiterin", text: "Zwei Jahre haben Sie Garantie. Bringen Sie bitte den Kassenzettel mit." },
                { speaker: "Herr Behrens", text: "Den habe ich noch." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-10-h1-1",
              no: 1,
              ref: "a1",
              text: "Wann kommt der Handwerker?",
              options: [
                "Nächste Woche Dienstag.",
                "Am Donnerstag am Vormittag.",
                "Am Donnerstag am Nachmittag.",
              ],
              answer: 0,
              explain:
                "İlk öneri mesai saatine denk geliyor, o yüzden geçerli olan ikinci: \"Dann erst nächste Woche Dienstag\".",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h1-2",
              no: 2,
              ref: "a2",
              text: "Was kostet die Reparatur zusammen?",
              options: ["Fünfundfünfzig Euro.", "Dreißig Euro für alles.", "Fünfundachtzig Euro."],
              answer: 2,
              explain:
                "İki tutar toplanmalı: \"Das Teil kostet fünfundfünfzig Euro, die Arbeit dreißig\". Müşteri kendisi topluyor — \"Also fünfundachtzig zusammen\" — ve usta onaylıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h1-3",
              no: 3,
              ref: "a3",
              text: "Was braucht der Kunde außer Geld?",
              options: [
                "Eine schriftliche Anmeldung.",
                "Einen Ausweis.",
                "Einen zweiten Schlüssel für das Gerät.",
              ],
              answer: 1,
              explain:
                "Görevli iki koşul sayıyor: \"Sie brauchen aber einen Ausweis und dreißig Euro Pfand\". Depozito para, belge değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h1-4",
              no: 4,
              ref: "a4",
              text: "Was erwartet der Helfer von Frau Dobrev?",
              options: [
                "Dass sie dabeibleibt.",
                "Dass sie das Werkzeug mitbringt.",
                "Dass sie später wiederkommt.",
              ],
              answer: 0,
              explain:
                "İki kez söylüyor: \"Setzen Sie sich bitte dazu, wir machen das zusammen\" ve \"Deshalb sitzen Sie ja daneben\".",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h1-5",
              no: 5,
              ref: "a5",
              text: "Was soll Herr Behrens mitbringen?",
              options: [
                "Eine Rechnung von der Werkstatt.",
                "Die Garantiekarte des Herstellers.",
                "Den Kassenzettel.",
              ],
              answer: 2,
              explain:
                "İstenen tek belge: \"Bringen Sie bitte den Kassenzettel mit\" — ve müşteride hâlâ duruyor.",
            },
          ],
        },
        {
          id: "de-a2-10-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen sagen, was bei ihnen kaputt ist. Wer hat welches Problem? Ordnen Sie zu. Drei Sachen bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi evinde neyin bozuk olduğunu söylüyor. Kimde hangi sorun var? Eşleştir. Üç şey artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch im Reparatur-Café",
              genreTr: "Tamir kafesinde konuşma",
              situation: "Gelenler sırayla ne getirdiklerini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Helferin", text: "Damit wir die Tische verteilen können: Was haben Sie mitgebracht? Frau Ergün?" },
                { speaker: "Frau Ergün", text: "Meine Nähmaschine. Sie macht Geräusche, näht aber noch." },
                { speaker: "Helferin", text: "Gut. Herr Mohr?" },
                { speaker: "Herr Mohr", text: "Bei mir ist es der Wasserkocher. Er wird nicht mehr heiß." },
                { speaker: "Helferin", text: "Und Sie, Frau Dobrev?" },
                { speaker: "Frau Dobrev", text: "Eine Lampe. Der Schalter geht, aber das Licht bleibt aus." },
                { speaker: "Helferin", text: "Herr Behrens?" },
                { speaker: "Herr Behrens", text: "Mein Fahrrad. Die Bremse hinten zieht nicht mehr." },
                { speaker: "Helferin", text: "Und zum Schluss Herr Lichtenberg." },
                { speaker: "Herr Lichtenberg", text: "Eine Jacke. Der Reißverschluss ist ab." },
              ],
            },
          ],
          options: [
            { key: "a", label: "Nähmaschine mit Geräusch" },
            { key: "b", label: "Wasserkocher wird nicht heiß" },
            { key: "c", label: "Lampe ohne Licht" },
            { key: "d", label: "Fahrradbremse defekt" },
            { key: "e", label: "Reißverschluss kaputt" },
            { key: "f", label: "Radio ohne Ton" },
            { key: "g", label: "Uhr geht zu langsam" },
            { key: "h", label: "Stuhl wackelt" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-10-h2-6",
              no: 6,
              ref: "g1",
              text: "Frau Ergün",
              answer: "a",
              explain:
                "\"Meine Nähmaschine. Sie macht Geräusche, näht aber noch\" — makine tümden bozulmamış, yalnız ses çıkarıyor. Bu yüzden `defekt` diyen bir seçenek onun durumunu karşılamaz.",
            },
            {
              kind: "match",
              id: "de-a2-10-h2-7",
              no: 7,
              ref: "g1",
              text: "Herr Mohr",
              answer: "b",
              explain:
                "\"Bei mir ist es der Wasserkocher. Er wird nicht mehr heiß\" — cihaz çalışıyor gibi görünüyor ama ısıtmıyor. Sorunun adı bu, marka ya da yaş değil.",
            },
            {
              kind: "match",
              id: "de-a2-10-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Dobrev",
              answer: "c",
              explain:
                "Düğme çalışıyor ama ışık yanmıyor: \"Der Schalter geht, aber das Licht bleibt aus\".",
            },
            {
              kind: "match",
              id: "de-a2-10-h2-9",
              no: 9,
              ref: "g1",
              text: "Herr Behrens",
              answer: "d",
              explain:
                "\"Mein Fahrrad. Die Bremse hinten zieht nicht mehr\" — sorun bisikletin kendisinde değil, arka frende. Getirdiği tek şey bu.",
            },
            {
              kind: "match",
              id: "de-a2-10-h2-10",
              no: 10,
              ref: "g1",
              text: "Herr Lichtenberg",
              answer: "e",
              explain:
                "\"Eine Jacke. Der Reißverschluss ist ab.\" Getirdiği tek şey bu.",
            },
          ],
        },
        {
          id: "de-a2-10-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage im Haus",
              genreTr: "Binada anons",
              situation: "Asansör bakımı.",
              plays: 2,
              segments: [
                {
                  text: "Ein Hinweis für alle Bewohner: Der Aufzug wird am Freitag gewartet und steht von neun bis dreizehn Uhr still. Wer Hilfe beim Tragen braucht, meldet sich bitte vorher bei der Hausverwaltung.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Atölye parça bekliyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Ergün, hier ist die Werkstatt. Ihre Nähmaschine ist noch nicht fertig, wir warten auf ein Teil. Wir rufen an, sobald es da ist, das dauert etwa eine Woche.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Ansage im Baumarkt",
              genreTr: "Yapı marketinde duyuru",
              situation: "Alet kiralama saatleri değişti.",
              plays: 2,
              segments: [
                {
                  text: "Eine Information zur Werkzeugausleihe: Ab Montag geben wir die Geräte nur noch bis achtzehn Uhr aus. Die Rückgabe ist weiterhin bis zwanzig Uhr möglich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Usta gelemiyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Herr Behrens, hier ist die Firma Kranz. Unser Kollege ist krank geworden, wir schaffen den Termin heute nicht. Passt Ihnen morgen die gleiche Zeit?",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Durchsage im Reparatur-Café",
              genreTr: "Tamir kafesinde anons",
              situation: "Kapanış yaklaşıyor.",
              plays: 2,
              segments: [
                {
                  text: "Wir schließen in einer halben Stunde. Wer noch nicht dran war, kommt bitte beim nächsten Mal wieder. Neue Sachen nehmen wir heute nicht mehr an.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-10-h3-11",
              no: 11,
              ref: "m1",
              text: "Was sollen Bewohner tun, die Hilfe brauchen?",
              options: [
                "Am Freitag im Treppenhaus warten.",
                "Sich vorher melden.",
                "Den Aufzug trotzdem benutzen.",
              ],
              answer: 1,
              explain:
                "Anonsun ricası: \"meldet sich bitte vorher bei der Hausverwaltung\" — asansör dokuz ile on üç arası çalışmıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h3-12",
              no: 12,
              ref: "m2",
              text: "Warum ist die Maschine noch nicht fertig?",
              options: [
                "Es fehlt ein Ersatzteil.",
                "Die Werkstatt hat zu viel Arbeit.",
                "Die Rechnung ist noch offen.",
              ],
              answer: 0,
              explain:
                "Gerekçe açık: \"wir warten auf ein Teil\" — yaklaşık bir hafta sürüyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h3-13",
              no: 13,
              ref: "m3",
              text: "Was ändert sich ab Montag?",
              options: [
                "Die Rückgabe ist nur bis achtzehn Uhr.",
                "Die Geräte werden teurer.",
                "Die Ausgabe endet früher.",
              ],
              answer: 2,
              explain:
                "Duyuru ikisini ayırıyor: teslim on sekizde bitiyor, ama \"Die Rückgabe ist weiterhin bis zwanzig Uhr möglich\".",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h3-14",
              no: 14,
              ref: "m4",
              text: "Was fragt die Firma?",
              options: [
                "Ob der Kunde selbst reparieren kann.",
                "Ob morgen zur gleichen Zeit passt.",
                "Ob der Termin ganz entfallen soll.",
              ],
              answer: 1,
              explain:
                "Son cümle bir soru: \"Passt Ihnen morgen die gleiche Zeit?\" Randevu iptal değil, kaydırılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-10-h3-15",
              no: 15,
              ref: "m5",
              text: "Was gilt für neue Gäste?",
              options: [
                "Sie kommen beim nächsten Mal.",
                "Sie sollen eine halbe Stunde warten.",
                "Sie bekommen einen festen Termin.",
              ],
              answer: 0,
              explain:
                "Anons kapıyı bugün için kapatıyor: \"Neue Sachen nehmen wir heute nicht mehr an\" ve sırası gelmeyenleri bir sonrakine çağırıyor.",
            },
          ],
        },
        {
          id: "de-a2-10-h4",
          no: 4,
          format: "truefalse",
          goal: "opinion",
          prompt: "Sie hören ein Interview. Sind die Sätze richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir söyleşi dinleyeceksin. Cümleler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir tamir kafesini kuran kişi anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Sikora, viele denken, Reparieren lohnt sich nicht mehr. Stimmt das?" },
                {
                  speaker: "Frau Sikora",
                  text: "Bei manchen Geräten stimmt es. Bei den meisten aber nicht. Was uns am häufigsten begegnet, ist ein Kabel oder eine Schraube.",
                },
                { speaker: "Moderator", text: "Warum werfen die Leute die Sachen dann weg?" },
                {
                  speaker: "Frau Sikora",
                  text: "Nicht aus Faulheit. Sie wissen einfach nicht, dass es geht. Wer einmal bei uns war, kommt fast immer wieder.",
                },
                { speaker: "Moderator", text: "Reparieren Sie alles?" },
                {
                  speaker: "Frau Sikora",
                  text: "Nein. Handys nehmen wir nicht an, weil sie verklebt sind. Da fehlt uns das Werkzeug.",
                },
                { speaker: "Moderator", text: "Was ist Ihr größtes Problem?" },
                {
                  speaker: "Frau Sikora",
                  text: "Nicht das Geld. Uns fehlen jüngere Leute an den Tischen. Die meisten von uns sind über sechzig.",
                },
                { speaker: "Moderator", text: "Was raten Sie anderen Städten?" },
                {
                  speaker: "Frau Sikora",
                  text: "Mit wenigen Tischen anfangen. Wir hatten am Anfang zwei und haben lange gebraucht, bis es sechs wurden.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-10-h4-16",
              no: 16,
              ref: "i1",
              text: "Frau Sikora sagt, dass sich Reparieren bei den meisten Geräten lohnt.",
              answer: true,
              explain:
                "İki durumu ayırıyor: bazı cihazlarda doğru, ama \"Bei den meisten aber nicht\" — yani çoğunda tamir işe yarıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-10-h4-17",
              no: 17,
              ref: "i1",
              text: "Nach ihr werfen die Leute Sachen aus Faulheit weg.",
              answer: false,
              explain:
                "Açıkça reddediyor: \"Nicht aus Faulheit. Sie wissen einfach nicht, dass es geht.\"",
            },
            {
              kind: "bool",
              id: "de-a2-10-h4-18",
              no: 18,
              ref: "i1",
              text: "Das Café repariert auch Handys.",
              answer: false,
              explain:
                "Tek istisna bu: \"Handys nehmen wir nicht an, weil sie verklebt sind\".",
            },
            {
              kind: "bool",
              id: "de-a2-10-h4-19",
              no: 19,
              ref: "i1",
              text: "Das größte Problem des Cafés ist das Geld.",
              answer: false,
              explain:
                "Parayı eliyor: \"Nicht das Geld. Uns fehlen jüngere Leute an den Tischen.\"",
            },
            {
              kind: "bool",
              id: "de-a2-10-h4-20",
              no: 20,
              ref: "i1",
              text: "Sie rät anderen Städten, klein anzufangen.",
              answer: true,
              explain:
                "Öğüdü ve kendi örneği: \"Mit wenigen Tischen anfangen. Wir hatten am Anfang zwei.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "Dieser Teil hat zwei Aufgaben. Sie schreiben eine private Nachricht und eine halb offizielle Nachricht.",
      instructionTr: "Bu bölümde iki görev var: bir özel ileti ve bir yarı resmî ileti yazacaksın.",
      tasks: [
        {
          id: "de-a2-10-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Nachbar Herr Lichtenberg hat Ihnen seine Bohrmaschine geliehen. Schreiben Sie ihm eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Komşun Herr Lichtenberg matkabını sana ödünç verdi. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Bedanken Sie sich.", tr: "Teşekkür et." },
              { de: "Sagen Sie, wofür Sie sie gebraucht haben.", tr: "Ne için kullandığını söyle." },
              { de: "Sagen Sie, wann Sie sie zurückbringen.", tr: "Ne zaman geri getireceğini söyle." },
            ],
            sample: `Lieber Herr Lichtenberg,

vielen Dank für die Bohrmaschine. Ohne sie hätte ich das Regal nicht aufhängen können.

Ich habe zwei Löcher im Bad gebohrt, mehr war es gar nicht.

Am Sonntagnachmittag bringe ich sie zurück. Wenn Sie sie früher brauchen, sagen Sie einfach Bescheid.

Herzliche Grüße
Sina Dobrev`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Komşuya yazıldığı için `Sie` kullanıldı mı? Ton nazik ama sıcak mı?",
              "Kullanım somut mu (ne yapıldı, kaç delik), yoksa genel bir cümle mi?",
              "İade zamanı belirli bir gün ya da saatle verildi mi?",
              "Yaklaşık 40 kelime var mı ve hitap ile veda var mı?",
            ],
          },
        },
        {
          id: "de-a2-10-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Ihre Waschmaschine ist seit zwei Wochen kaputt und die Hausverwaltung hat noch niemanden geschickt. Schreiben Sie an die Hausverwaltung (circa 40 Wörter).",
          promptTr:
            "Çamaşır makinen iki haftadır bozuk ve site yönetimi hâlâ kimseyi göndermedi. Site yönetimine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu tarif et." },
              { de: "Sagen Sie, was Sie schon gemacht haben.", tr: "Ne yaptığını söyle." },
              { de: "Bitten Sie um einen Termin und nennen Sie eine Zeit.", tr: "Randevu iste ve bir zaman söyle." },
            ],
            sample: `Sehr geehrte Damen und Herren,

seit dem 3. Mai läuft in meiner Wohnung kein Wasser mehr in die Waschmaschine. Ich wohne in der Rosenstraße 12, zweiter Stock.

Ich habe am 5. Mai angerufen und mir wurde ein Termin versprochen. Bisher ist niemand gekommen.

Können Sie mir bitte diese Woche einen Termin geben? Nachmittags bin ich immer da.

Mit freundlichen Grüßen
Sina Dobrev`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı?",
              "Sorun ne zamandan beri sürdüğü belirtilerek somutlandı mı?",
              "Daha önce yapılan şey (arama, bildirim) tarihle mi verildi?",
              "Uygun bir zaman söylendi mi ve yaklaşık 40 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: Fragen stellen, erzählen und gemeinsam planen.",
      instructionTr: "Bu bölümde üç görev var: soru sorma, anlatma ve birlikte planlama.",
      tasks: [
        {
          id: "de-a2-10-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Reparieren. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Werkzeug — kaputt — Werkstatt — Kosten — selbst machen.",
          promptTr:
            "Konu: Tamir. Her anahtar sözcük için bir soru sor ve kendin de cevapla: alet — bozuk — atölye — masraf — kendin yapmak.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Reparieren. Ihr erstes Stichwort ist: Werkzeug. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi tamir konusunu konuşuyoruz. İlk sözcüğün: alet. Bana bir soru sor.",
            },
            { who: "you", hint: "«Werkzeug» sözcüğüyle bir soru kur.", expect: "Werkzeug sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Ich habe nur einen Schraubenzieher und eine Zange. Ihr nächstes Stichwort ist: kaputt.",
              tr: "Bende yalnız bir tornavida ve bir pense var. Sıradaki sözcüğün: bozuk.",
            },
            { who: "you", hint: "«kaputt» için bir soru kur.", expect: "kaputt sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Bei mir ist letzte Woche der Toaster kaputtgegangen. Und jetzt eine Frage an Sie: Reparieren Sie Sachen selbst?",
              tr: "Bende geçen hafta tost makinesi bozuldu. Şimdi sana bir soru: Bir şeyleri kendin tamir eder misin?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısaca gerekçelendir.", expect: "`weil` ile gerekçelendirilmiş tam bir cevap vermek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was darf eine Reparatur höchstens kosten?",
              tr: "Teşekkürler. Son soru: Bir tamir en fazla ne kadar tutmalı?",
            },
            { who: "you", hint: "Bir tutar söyle ve nedenini ekle.", expect: "bir tutar söylemek ve kısaca gerekçelendirmek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Welches Werkzeug hast du zu Hause? — Einen Hammer und einen Schraubenzieher. Was ist bei dir zuletzt kaputtgegangen? — Meine Lampe. Gibt es hier eine Werkstatt? — Ja, am Bahnhof. Reparierst du selbst? — Manchmal, weil es schneller geht. Was darf das kosten? — Höchstens die Hälfte vom neuen Preis.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Tutar ve zaman ifadeleri kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-a2-10-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie: Wie macht man in Ihrem Herkunftsland Reparaturen, und was ist hier anders? Sprechen Sie etwa zwei Minuten.",
          promptTr:
            "Anlat: Kendi ülkende tamir işleri nasıl yapılır ve burada ne farklı? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "beschreiben, wie es zu Hause läuft", tr: "Kendi ülkende nasıl olduğunu anlatmak" },
              { de: "einen Unterschied nennen", tr: "Bir farkı söylemek" },
              { de: "sagen, was einem besser gefällt", tr: "Neyi daha çok sevdiğini söylemek" },
            ],
            sample:
              "Bei uns kennt fast jede Familie jemanden, der reparieren kann. Man ruft einen Onkel oder einen Nachbarn an, und er kommt am selben Tag. Bezahlt wird mit Geld oder mit Essen. Hier ist das anders: Man ruft eine Firma an und bekommt einen Termin in zwei Wochen. Dafür weiß man vorher, was es kostet. Am Anfang war mir das Warten fremd. Heute finde ich den festen Preis gut, aber die schnelle Hilfe fehlt mir.",
            criteria: [
              "Kendi ülkedeki düzen somut anlatıldı mı (kim gelir, ne kadar sürer, nasıl ödenir)?",
              "Fark gerçekten karşılaştırma biçiminde mi verildi?",
              "Kendi tercihi söylendi ve gerekçelendirildi mi?",
              "Geçmiş zaman kullanılabildi mi? (war, habe gefunden)",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-10-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. In Ihrem Haus soll ein Werkzeugschrank für alle entstehen. Sprechen Sie über: Welches Werkzeug? — Wo steht der Schrank? — Wer hat den Schlüssel? — Was passiert bei Schäden?",
          promptTr:
            "Birlikte plan yap. Binanızda herkesin kullanacağı bir alet dolabı kurulacak. Şunları konuş: Hangi aletler? — Dolap nerede duracak? — Anahtar kimde olacak? — Bir şey kırılırsa ne olacak?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Werkzeugschrank. Zuerst der Inhalt: Ich würde eine Bohrmaschine kaufen, aber die ist teuer. Was meinen Sie?",
              tr: "Alet dolabını birlikte planlıyoruz. Önce içerik: Bir matkap alalım derim ama pahalı. Sen ne diyorsun?",
            },
            { who: "you", hint: "Bir öneri sun ve fiyat itirazını hesaba kat.", expect: "somut bir öneri sunmak ve maliyet itirazını dikkate almak", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und wo stellen wir den Schrank hin? Im Keller ist es feucht, im Treppenhaus stört er.",
              tr: "Peki. Dolabı nereye koyalım? Bodrum nemli, merdivende engel olur.",
            },
            { who: "you", hint: "Bir yer öner ve iki itirazı da hesaba kat.", expect: "bir yer önermek ve iki itirazı birden dikkate almak", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Wer bekommt den Schlüssel? Alle achtzehn Parteien geht nicht.",
              tr: "Anlaştık. Anahtar kimde olacak? On sekiz dairenin hepsinde olmaz.",
            },
            { who: "you", hint: "Somut bir anahtar düzeni öner.", expect: "uygulanabilir bir anahtar düzeni önermek", seconds: 35 },
            {
              who: "partner",
              de: "Und wenn etwas kaputtgeht? Ich möchte nicht am Ende alles allein bezahlen.",
              tr: "Peki bir şey bozulursa? Sonunda her şeyi tek başıma ödemek istemiyorum.",
            },
            { who: "you", hint: "Hasar için bir düzen öner ve kimseyi tek başına bırakma.", expect: "hasar için adil ve somut bir düzen önermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneri sunmak" },
              { de: "auf Einwände reagieren", tr: "İtirazlara karşılık vermek" },
              { de: "eine Aufgabe übernehmen", tr: "Bir işi üstlenmek" },
            ],
            sample:
              "Ich schlage vor, dass wir mit einfachem Werkzeug anfangen: Hammer, Zange, Schraubenzieher. Die Bohrmaschine kaufen wir später, wenn wir sehen, dass der Schrank benutzt wird. Für den Ort nehmen wir die Ecke im Fahrradkeller, dort ist es trocken und niemand läuft vorbei. Den Schlüssel bekommen drei Personen aus verschiedenen Stockwerken, und ich mache gern eine davon. Bei Schäden zahlen wir aus einer kleinen Kasse; jede Wohnung gibt einmal im Jahr fünf Euro dazu.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu (hangi alet, hangi yer, kaç kişi)?",
              "Her itiraz (fiyat, nem, geçiş, tek başına ödeme) gerçekten karşılandı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Öneri kalıpları kullanıldı mı? (Ich schlage vor …, Wir können …)",
            ],
          },
        },
      ],
    },
  ],
};
