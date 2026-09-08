import type { MockPaper } from "../types";

/**
 * A1 · Deneme 6 — "Schule und Lernen".
 *
 * PLAN kâğıt 1–5 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: kurs ve okul, A1 öğrencisinin kendi durumunu anlatabildiği
 * ilk alanlardan biri. Yazma görevi bu yüzden bilgi isteme üzerine kuruldu:
 * A1'de en çok gereken yarı resmî işlev bu.
 */
export const A1_06: MockPaper = {
  id: "de-a1-06",
  course: "de",
  level: "A1",
  no: 6,
  theme: "Schule und Lernen",
  themeTr: "Okul ve öğrenme",
  minutes: 80,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 25,
      instruction:
        "Dieser Teil hat drei Aufgaben. Sie lesen eine E-Mail, Anzeigen und Schilder. Zu jedem Text gibt es Fragen. Wählen Sie die richtige Lösung.",
      instructionTr:
        "Bu bölümde üç görev var. Bir e-posta, ilanlar ve levhalar okuyacaksın. Her metnin soruları var; doğru cevabı işaretle.",
      tasks: [
        {
          id: "de-a1-06-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 1 bis 5. Sind die Sätze richtig oder falsch?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "E-Mail",
              genreTr: "E-posta",
              title: "Von: kurse@kolibri-schule.de",
              body: `Hallo Amina,

dein Kurs beginnt am 5. September. Wir treffen uns in Raum 204.

Der Unterricht ist montags und mittwochs von 18 bis 20 Uhr.

Das Buch bekommst du am ersten Tag. Es kostet 22 Euro.

Bitte bring einen Stift und ein Heft mit.

Viele Grüße
Deine Sprachschule Kolibri`,
              gloss: [
                { de: "der Unterricht", tr: "ders", en: "lesson, class" },
                { de: "das Heft", tr: "defter", en: "exercise book" },
                { de: "mitbringen", tr: "yanında getirmek", en: "to bring along" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang in der Schule",
              genreTr: "Okuldaki duyuru",
              title: "BÜCHEREI DER SCHULE",
              body: `Öffnungszeiten: Montag bis Freitag, 8 bis 15 Uhr

Ihr könnt drei Bücher für zwei Wochen ausleihen.

Wer ein Buch verliert, bezahlt es.`,
              gloss: [
                { de: "die Bücherei", tr: "kütüphane", en: "library" },
                { de: "ausleihen", tr: "ödünç almak", en: "to borrow" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-06-l1-1",
              no: 1,
              ref: "t1",
              text: "Der Kurs ist am Wochenende.",
              answer: false,
              explain:
                "Ders günleri \"montags und mittwochs\", yani pazartesi ve çarşamba. Hafta sonu e-postada hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l1-2",
              no: 2,
              ref: "t1",
              text: "Amina bekommt das Buch am ersten Tag.",
              answer: true,
              explain:
                "E-posta \"Das Buch bekommst du am ersten Tag\" diyor ve fiyatını da veriyor: 22 euro.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l1-3",
              no: 3,
              ref: "t1",
              text: "Amina muss nichts mitbringen.",
              answer: false,
              explain:
                "Son satırda iki şey isteniyor: \"Bitte bring einen Stift und ein Heft mit\". Yani kalem ve defter gerekiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l1-4",
              no: 4,
              ref: "t2",
              text: "Man darf vier Bücher mitnehmen.",
              answer: false,
              explain:
                "Duyuru \"drei Bücher für zwei Wochen\" diyor. Üst sınır üç kitap, dört değil.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l1-5",
              no: 5,
              ref: "t2",
              text: "Am Samstag ist die Bücherei zu.",
              answer: true,
              explain:
                "Açılış günleri \"Montag bis Freitag\" olarak veriliyor. Cumartesi bu aralığın dışında kalıyor.",
            },
          ],
        },
        {
          id: "de-a1-06-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt:
            "Lesen Sie die Situationen 6 bis 10 und die Anzeigen a und b. Welche Anzeige passt? Es gibt immer nur eine Lösung.",
          promptTr:
            "6–10. durumları ve a ile b ilanlarını oku. Hangi ilan uyuyor? Her zaman tek bir doğru var.",
          items: [
            {
              kind: "mcq",
              id: "de-a1-06-l2-6",
              no: 6,
              text: "Ihr Sohn (12) hat Probleme in Mathe. Sie suchen Hilfe am Nachmittag.",
              options: [
                "Musikschule Ton\nGitarre, Klavier und Flöte\nfür Kinder ab acht Jahren\nEinzelunterricht 22 Euro",
                "Nachhilfe Mathe\nMo–Do 15–18 Uhr\nkleine Gruppen, 5. bis 10. Klasse\n12 Euro pro Stunde",
              ],
              answer: 1,
              explain:
                "Matematik ve öğleden sonra aranıyor. (b) `Mo–Do 15–18 Uhr` diyor ve 5–10. sınıf için. (a) müzik dersi veriyor; saat uygun olsa bile konu uymuyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-l2-7",
              no: 7,
              text: "Sie arbeiten bis 17 Uhr und möchten Deutsch lernen.",
              options: [
                "Deutschkurs am Abend\nDi und Do 18.30–20 Uhr\nAnfänger und A2\nAnmeldung im Büro, Raum 101",
                "Deutschkurs am Vormittag\nMontag bis Freitag 9–12 Uhr\nmit Kinderbetreuung im Haus\nzwölf Wochen, 180 Euro",
              ],
              answer: 0,
              explain:
                "Mesai 17'de bitiyor, o yüzden akşam kursu gerekiyor. (a) `18.30–20 Uhr` diyor. (b) sabah kursu; çocuk bakımı sunsa da saatleri iş saatiyle çakışıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-l2-8",
              no: 8,
              text: "Sie brauchen in den Sommerferien eine Betreuung für Ihre Tochter (7).",
              options: [
                "Ferienbetreuung\nzwei Wochen im August\nfür Kinder von 6 bis 11 Jahren\ntäglich 8 bis 16 Uhr",
                "Ferienkurs Englisch\nfür Jugendliche ab 14 Jahren\ndrei Stunden am Vormittag\nAnmeldung bis 30. Juni nötig",
              ],
              answer: 0,
              explain:
                "Yedi yaşındaki bir çocuk için bakım aranıyor. (a) `von 6 bis 11 Jahren` diyor ve bütün gün açık. (b) 14 yaş üstü gençler için, üstelik yalnız üç saat.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-l2-9",
              no: 9,
              text: "Sie möchten Gitarre lernen und haben kein Instrument.",
              options: [
                "Chor der Volkshochschule\nProben donnerstags um 19 Uhr\nkeine Vorkenntnisse nötig\nerste Probe kostenlos",
                "Gitarrenunterricht\nAnfänger, dienstags 17 Uhr\nGitarren zum Leihen da\n15 Euro pro Stunde",
              ],
              answer: 1,
              explain:
                "Hem gitar dersi hem de enstrüman gerekiyor. (b) `Gitarren zum Leihen da` diyor. (a) koro; şarkı söylüyor, gitar öğretmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-l2-10",
              no: 10,
              text: "Sie möchten am Computer schreiben lernen und fangen bei null an.",
              options: [
                "Computerkurs\nfür Anfänger, ohne Vorkenntnisse\nsechs Termine, samstags 10–12 Uhr\n40 Euro",
                "Computerhilfe im Laden\nwir reparieren Ihren Rechner\nauch Viren und Programme\nMo–Fr 9–18 Uhr, Termin nötig",
              ],
              answer: 0,
              explain:
                "Sıfırdan öğrenmek isteniyor. (a) `für Anfänger, ohne Vorkenntnisse` diyor ve altı ders sürüyor. (b) tamir yapıyor, ders vermiyor.",
            },
          ],
        },
        {
          id: "de-a1-06-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild in der Bücherei",
              genreTr: "Kütüphanedeki levha",
              body: `Handys bitte ausschalten.

Telefonieren könnt ihr draußen im Hof.

Musik nur mit Kopfhörern.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild im Klassenzimmer",
              genreTr: "Sınıftaki levha",
              body: `Essen bitte nur in der Pause.

Wasser ist immer erlaubt.

Den Müll nehmt ihr selbst mit.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Aushang in der Mensa",
              genreTr: "Yemekhanedeki duyuru",
              body: `Mittagessen: 12 bis 13.30 Uhr

Bitte das Tablett zurückbringen.

Am Freitag gibt es kein warmes Essen.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Schild im Computerraum",
              genreTr: "Bilgisayar odasındaki levha",
              body: `Der Raum ist von 8 bis 16 Uhr offen.

Ohne Lehrerin oder Lehrer bleibt er zu.

Bitte am Ende alles ausschalten.`,
            },
            {
              kind: "text",
              id: "s5",
              genre: "Zettel an der Turnhalle",
              genreTr: "Spor salonundaki not",
              body: `Diese Woche kein Sport.

Der Boden wird neu gemacht.

Ab Montag ist die Halle wieder offen.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-06-l3-11",
              no: 11,
              ref: "s1",
              text: "Sie dürfen in der Bücherei telefonieren.",
              answer: false,
              explain:
                "Levha \"Handys bitte ausschalten\" diyor; konuşmak için \"draußen im Hof\" gösteriliyor. Yani içeride telefon yok.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l3-12",
              no: 12,
              ref: "s2",
              text: "Wasser dürfen Sie auch im Unterricht trinken.",
              answer: true,
              explain:
                "Yemek yalnız teneffüste, ama su için \"Wasser ist immer erlaubt\" deniyor. `immer` sözcüğü ders saatini de kapsıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l3-13",
              no: 13,
              ref: "s3",
              text: "Am Freitag bekommen Sie in der Mensa eine warme Mahlzeit.",
              answer: false,
              explain:
                "Duyuru \"Am Freitag gibt es kein warmes Essen\" diyor. Öğle servisi 12–13.30 arası, ama cuma sıcak yemek yok.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l3-14",
              no: 14,
              ref: "s4",
              text: "Sie können allein in den Computerraum gehen.",
              answer: false,
              explain:
                "Oda 8–16 arası açık ama bir koşulla: \"Ohne Lehrerin oder Lehrer bleibt er zu\". Yani öğretmen olmadan girilmiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-l3-15",
              no: 15,
              ref: "s5",
              text: "Nächste Woche gibt es wieder Sport.",
              answer: true,
              explain:
                "Not bu hafta için spor yok diyor, ama \"Ab Montag ist die Halle wieder offen\" ekliyor. Yani gelecek hafta ders var.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 20,
      instruction:
        "Dieser Teil hat drei Aufgaben. Sie hören kurze Gespräche und Durchsagen. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde üç görev var. Kısa konuşmalar ve anonslar dinleyeceksin. Önce maddeleri oku.",
      tasks: [
        {
          id: "de-a1-06-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch im Sekretariat",
              genreTr: "Okul sekreterliğinde konuşma",
              situation: "Bir veli kurs saatini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Sarr", text: "Wann fängt der Kurs für meine Tochter an?" },
                { speaker: "Sekretärin", text: "Um Viertel vor vier. Bitte kommen Sie fünf Minuten früher." },
                { speaker: "Frau Sarr", text: "Also um zwanzig vor vier." },
                { speaker: "Sekretärin", text: "Genau." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch in der Bücherei",
              genreTr: "Kütüphanede konuşma",
              situation: "Bir öğrenci kitabı geç getirmiş.",
              plays: 2,
              segments: [
                { speaker: "Schüler", text: "Ich bringe das Buch zurück. Es tut mir leid, es ist spät." },
                { speaker: "Bibliothekarin", text: "Drei Tage zu spät. Das macht sechzig Cent." },
                { speaker: "Schüler", text: "Hier, bitte." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Unterricht",
              genreTr: "Derste konuşma",
              situation: "Öğretmen ödevi anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Lehrerin", text: "Für morgen macht ihr die Übungen auf Seite 24." },
                { speaker: "Schülerin", text: "Alle Übungen?" },
                { speaker: "Lehrerin", text: "Nur eins bis drei. Übung vier machen wir zusammen." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch auf dem Schulhof",
              genreTr: "Okul bahçesinde konuşma",
              situation: "İki öğrenci sınavı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Timo", text: "Wann ist die Prüfung? Am Dienstag?" },
                { speaker: "Lea", text: "Nein, der Dienstag ist die Wiederholung. Die Prüfung ist am Freitag." },
                { speaker: "Timo", text: "Gut, dann habe ich noch Zeit." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir veli çocuğunun gelemeyeceğini bildiriyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Blum", text: "Mein Sohn kommt heute nicht. Er hat Bauchschmerzen." },
                { speaker: "Sekretärin", text: "Danke für den Anruf. Bringen Sie morgen bitte eine Entschuldigung mit." },
                { speaker: "Herr Blum", text: "Mache ich." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch in der Mensa",
              genreTr: "Yemekhanede konuşma",
              situation: "İki öğrenci ne yiyeceklerini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Nils", text: "Nimmst du Nudeln?" },
                { speaker: "Ayse", text: "Nein, heute gibt es Suppe. Die Nudeln waren gestern." },
                { speaker: "Nils", text: "Dann nehme ich auch Suppe." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-06-h1-1",
              no: 1,
              ref: "a1",
              text: "Wann soll Frau Sarr kommen?",
              options: ["Um Viertel vor vier.", "Um vier Uhr.", "Um zwanzig vor vier."],
              answer: 2,
              explain:
                "Kurs 15.45'te başlıyor, ama beş dakika erken gelinmesi isteniyor. Frau Sarr bunu \"also um zwanzig vor vier\" diye toparlıyor ve onaylanıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h1-2",
              no: 2,
              ref: "a2",
              text: "Was muss der Schüler bezahlen?",
              options: ["60 Cent.", "3 Euro.", "Nichts."],
              answer: 0,
              explain:
                "Kitap üç gün geç getirilmiş ve ücret \"sechzig Cent\". 3 sayısı gün sayısından geliyor, tutardan değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h1-3",
              no: 3,
              ref: "a3",
              text: "Welche Übungen sind Hausaufgabe?",
              options: ["Alle auf Seite 24.", "Übung 1 bis 3.", "Nur Übung 4."],
              answer: 1,
              explain:
                "Öğretmen \"Nur eins bis drei\" diyor; dördüncü alıştırma birlikte yapılacak, yani ödev değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h1-4",
              no: 4,
              ref: "a4",
              text: "Wann ist die Prüfung?",
              options: ["Am Dienstag.", "Am Mittwoch.", "Am Freitag."],
              answer: 2,
              explain:
                "Salı günü tekrar dersi var; Lea \"Die Prüfung ist am Freitag\" diyor. Çarşamba hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h1-5",
              no: 5,
              ref: "a5",
              text: "Was soll Herr Blum morgen mitbringen?",
              options: ["Ein Buch.", "Eine Entschuldigung.", "Ein Rezept."],
              answer: 1,
              explain:
                "Sekreter \"Bringen Sie morgen bitte eine Entschuldigung mit\" diyor. Reçete ve kitap bu kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h1-6",
              no: 6,
              ref: "a6",
              text: "Was essen die beiden heute?",
              options: ["Nudeln.", "Salat.", "Suppe."],
              answer: 2,
              explain:
                "Ayse \"heute gibt es Suppe\" diyor ve makarnanın dün olduğunu ekliyor; Nils de çorba alıyor.",
            },
          ],
        },
        {
          id: "de-a1-06-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage in der Schule",
              genreTr: "Okulda anons",
              situation: "Bir dersin iptali duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für die Klasse 7 a: Die letzte Stunde fällt heute aus. Ihr könnt schon um halb eins nach Hause gehen. Die Aufgaben stehen an der Tafel.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage in der Sprachschule",
              genreTr: "Dil okulunda anons",
              situation: "Bir oda değişikliği duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Achtung, eine Information zum Kurs A eins. Der Kurs findet heute nicht in Raum 204 statt. Wir treffen uns in Raum 110 im Erdgeschoss. Die Zeit bleibt gleich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage in der Bücherei",
              genreTr: "Kütüphanede anons",
              situation: "Kapanış saati duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Schülerinnen und Schüler, wir schließen in zehn Minuten. Bitte bringt die Bücher zum Tisch. Morgen sind wir ab acht Uhr wieder da.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage vor der Prüfung",
              genreTr: "Sınav öncesi anons",
              situation: "Sınav kuralları duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Teilnehmerinnen und Teilnehmer, die Prüfung beginnt um neun. Handys und Taschen legen Sie bitte nach vorn. Ein Wörterbuch dürfen Sie benutzen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-06-h2-7",
              no: 7,
              ref: "d1",
              text: "Die Klasse 7 a hat heute früher frei.",
              answer: true,
              explain:
                "Son ders iptal ve anons \"Ihr könnt schon um halb eins nach Hause gehen\" diyor. Yani okul erken bitiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-h2-8",
              no: 8,
              ref: "d2",
              text: "Der Kurs beginnt heute später.",
              answer: false,
              explain:
                "Değişen yalnız oda: 204 yerine 110. Saat için \"Die Zeit bleibt gleich\" deniyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-h2-9",
              no: 9,
              ref: "d3",
              text: "Morgen öffnet die Bücherei um acht Uhr.",
              answer: true,
              explain:
                "Anons bugün on dakika sonra kapanacağını, yarın ise \"ab acht Uhr\" açık olacağını söylüyor.",
            },
            {
              kind: "bool",
              id: "de-a1-06-h2-10",
              no: 10,
              ref: "d4",
              text: "In der Prüfung ist ein Wörterbuch verboten.",
              answer: false,
              explain:
                "Anons tersini söylüyor: \"Ein Wörterbuch dürfen Sie benutzen\". Öne konması istenen şeyler telefon ve çanta.",
            },
          ],
        },
        {
          id: "de-a1-06-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Dil okulu bir kurs değişikliğini bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist die Sprachschule Kolibri. Ihr Kurs beginnt eine Woche später, also am zwölften September. Der Raum bleibt gleich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "İki öğrenci birlikte çalışmayı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Yara", text: "Lernen wir heute Abend zusammen?" },
                { speaker: "Kai", text: "Heute arbeite ich. Morgen Nachmittag geht es." },
                { speaker: "Yara", text: "Gut, dann morgen um drei." },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Gespräch im Kursraum",
              genreTr: "Sınıfta konuşma",
              situation: "Bir öğrenci kalem istiyor.",
              plays: 2,
              segments: [
                { speaker: "Maya", text: "Hast du einen Stift für mich?" },
                { speaker: "Ivan", text: "Einen Bleistift habe ich. Einen Kugelschreiber leider nicht." },
                { speaker: "Maya", text: "Der Bleistift reicht, danke." },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Gespräch mit der Lehrerin",
              genreTr: "Öğretmenle konuşma",
              situation: "Bir öğrenci sınav sonucunu soruyor.",
              plays: 2,
              segments: [
                { speaker: "Schülerin", text: "Wann bekommen wir die Noten?" },
                { speaker: "Lehrerin", text: "Nächste Woche, wahrscheinlich am Donnerstag." },
                { speaker: "Schülerin", text: "Und wenn Sie nicht fertig sind?" },
                { speaker: "Lehrerin", text: "Dann am Freitag." },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Gespräch zu Hause",
              genreTr: "Evde konuşma",
              situation: "Bir anne ödevi soruyor.",
              plays: 2,
              segments: [
                { speaker: "Mutter", text: "Hast du die Hausaufgaben gemacht?" },
                { speaker: "Kind", text: "Deutsch ja, Mathe noch nicht." },
                { speaker: "Mutter", text: "Dann mach zuerst Mathe, dann darfst du spielen." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-06-h3-11",
              no: 11,
              ref: "m1",
              text: "Wann beginnt der Kurs?",
              options: ["Am 5. September.", "Am 12. September.", "Am 20. September."],
              answer: 1,
              explain:
                "Mesaj kursun bir hafta ertelendiğini ve yeni tarihin \"am zwölften September\" olduğunu söylüyor. Oda değişmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h3-12",
              no: 12,
              ref: "m2",
              text: "Wann lernen die beiden zusammen?",
              options: ["Heute Abend.", "Gar nicht.", "Morgen Nachmittag."],
              answer: 2,
              explain:
                "Kai bugün çalışıyor; \"Morgen Nachmittag geht es\" diyor ve saat üçte anlaşıyorlar.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h3-13",
              no: 13,
              ref: "m3",
              text: "Was bekommt Maya?",
              options: ["Einen Bleistift.", "Einen Kugelschreiber.", "Gar nichts."],
              answer: 0,
              explain:
                "Ivan'da tükenmez kalem yok ama kurşun kalem var; Maya \"Der Bleistift reicht\" diyerek onu alıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h3-14",
              no: 14,
              ref: "m4",
              text: "Wann kommen die Noten wahrscheinlich?",
              options: ["Am Montag.", "Am Donnerstag.", "Am Freitag."],
              answer: 1,
              explain:
                "Öğretmen \"wahrscheinlich am Donnerstag\" diyor. Cuma yalnız gecikme durumundaki yedek gün.",
            },
            {
              kind: "mcq",
              id: "de-a1-06-h3-15",
              no: 15,
              ref: "m5",
              text: "Was muss das Kind zuerst machen?",
              options: ["Deutsch lernen.", "Spielen gehen.", "Mathe machen."],
              answer: 2,
              explain:
                "Almanca ödevi bitmiş; anne \"Dann mach zuerst Mathe\" diyor. Oyun ancak matematikten sonra geliyor.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "Dieser Teil hat zwei Aufgaben: ein Formular ausfüllen und eine kurze Nachricht schreiben.",
      instructionTr: "Bu bölümde iki görev var: bir form doldurmak ve kısa bir ileti yazmak.",
      tasks: [
        {
          id: "de-a1-06-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihr Freund Pawel Nowicki möchte den Computerkurs für Anfänger besuchen. Sie helfen ihm bei der Anmeldung. Pawel ist am 8. Mai 1988 geboren. Er wohnt in der Ulmenallee 17 in 45127 Essen. Seine E-Mail-Adresse ist p.nowicki@mail.de. Er möchte den Kurs am Samstag. Füllen Sie das Formular aus.",
          promptTr:
            "Arkadaşın Pawel Nowicki başlangıç seviyesi bilgisayar kursuna gitmek istiyor. Kayıtta ona yardım ediyorsun. Pawel 8 Mayıs 1988 doğumlu. Ulmenallee 17, 45127 Essen adresinde oturuyor. E-posta adresi p.nowicki@mail.de. Kursu cumartesi istiyor. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung — Computerkurs für Anfänger",
              body: `Familienname, Vorname:    Nowicki, Pawel
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Essen
E-Mail:                   {{4}}
Kurstag:                  {{5}}
Unterschrift:             P. Nowicki`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-06-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["08.05.1988", "8.5.1988", "8. Mai 1988", "08.05.88", "8.5.88"],
              explain:
                "Yönergede \"am 8. Mai 1988 geboren\" yazıyor. Almanca formlarda tarih gün.ay.yıl sırasıyla girilir: 08.05.1988.",
            },
            {
              kind: "gap",
              id: "de-a1-06-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Ulmenallee 17"],
              explain:
                "Adres yönergede tam veriliyor: Ulmenallee 17. Sokak adı ve kapı numarası aynı satıra, numara sona yazılır.",
            },
            {
              kind: "gap",
              id: "de-a1-06-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["45127"],
              explain:
                "Yönergedeki adres \"in 45127 Essen\" biçiminde. Posta kodu beş hanelidir ve şehirden önce gelir; şehir adı formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-06-s1-4",
              no: 4,
              text: "E-Mail",
              accept: ["p.nowicki@mail.de"],
              explain:
                "E-posta adresi yönergede aynen veriliyor: p.nowicki@mail.de. Adres olduğu gibi, harfi harfine yazılır.",
            },
            {
              kind: "gap",
              id: "de-a1-06-s1-5",
              no: 5,
              text: "Kurstag",
              accept: ["Samstag", "am Samstag", "Sonnabend"],
              explain:
                "\"Er möchte den Kurs am Samstag\" — kurs günü cumartesi. `Sonnabend` kuzey Almanya'da aynı günün adıdır.",
            },
          ],
        },
        {
          id: "de-a1-06-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie möchten im Herbst einen Deutschkurs besuchen. Schreiben Sie an die Sprachschule Kolibri. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Sonbaharda bir Almanca kursuna gitmek istiyorsun. Kolibri Dil Okulu'na yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Fragen Sie nach den Kurszeiten.", tr: "Kurs saatlerini sor." },
              { de: "Fragen Sie nach dem Preis.", tr: "Ücreti sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich möchte im Herbst einen Deutschkurs machen. Ich habe schon einen A1-Kurs besucht.

Wann sind die Kurse am Abend? Und was kostet ein Kurs?

Vielen Dank und freundliche Grüße
Diego Rivas`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Kuruma yazıldığı için `Sehr geehrte Damen und Herren` uygun.",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "İki soru gerçekten soru biçiminde mi kuruldu?",
              "Kuruma yazıldığı için `Sie` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: vom Lernen erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: öğrenmeyi anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-06-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie, wie Sie Deutsch lernen. Sprechen Sie zu den Stichwörtern: Kurs — Tage — Lehrerin oder Lehrer — Buch — zu Hause lernen — schwer und leicht.",
          promptTr:
            "Almancayı nasıl öğrendiğini anlat. Şu anahtar sözcüklere göre konuş: kurs — günler — öğretmen — kitap — evde çalışma — zor ve kolay olan.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "den Kurs beschreiben", tr: "Kursu tarif etmek" },
              { de: "sagen, wann und wie oft", tr: "Ne zaman ve ne sıklıkla olduğunu söylemek" },
              { de: "sagen, was schwer und was leicht ist", tr: "Neyin zor neyin kolay olduğunu söylemek" },
            ],
            sample:
              "Ich mache einen A1-Kurs in der Volkshochschule. Der Unterricht ist montags und mittwochs am Abend. Meine Lehrerin heißt Frau Weber. Wir arbeiten mit einem Buch und mit Karten. Zu Hause lerne ich jeden Tag zwanzig Minuten Wörter. Sprechen ist schwer, Lesen ist leicht.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Gün ve saat söylenebiliyor mu? (montags, am Abend)",
              "Zor ve kolay olan ayrı ayrı adlandırıldı mı?",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-06-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Lernen. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Kurs — Hausaufgaben — Buch — Prüfung — Pause.",
          promptTr:
            "Konu: Öğrenme. Her anahtar sözcük için bir soru kur ve cevapla: kurs — ödev — kitap — sınav — mola.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Lernen. Ihr erstes Stichwort ist: Kurs. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi öğrenme konusunu konuşuyoruz. İlk sözcüğün: kurs. Bana bir soru sor.",
            },
            { who: "you", hint: "«Kurs» sözcüğüyle bir soru kur.", expect: "Kurs sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Mein Kurs ist zweimal in der Woche. Ihr nächstes Stichwort ist: Hausaufgaben.",
              tr: "Kursum haftada iki kez. Sıradaki sözcüğün: ödev.",
            },
            { who: "you", hint: "«Hausaufgaben» için bir soru kur.", expect: "Hausaufgaben sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich mache die Hausaufgaben immer am Abend. Und jetzt eine Frage an Sie: Lernen Sie gern mit einem Buch?",
              tr: "Ödevlerimi hep akşam yaparım. Şimdi sana bir soru: Kitapla çalışmayı sever misin?",
            },
            { who: "you", hint: "Soruyu cevapla — kitapla çalışmayı seviyor musun?", expect: "beğeni bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wann haben Sie Ihre nächste Prüfung?",
              tr: "Teşekkürler. Son soru: Bir sonraki sınavın ne zaman?",
            },
            { who: "you", hint: "Bir zaman söyle.", expect: "bir zaman ifadesiyle cevap vermek (im Juni, nächste Woche …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wo ist dein Kurs? — In der Volkshochschule. Machst du die Hausaufgaben? — Ja, jeden Tag. Wie heißt dein Buch? — Es heißt Schritte. Wann ist die Prüfung? — Im Juni. Wie lang ist die Pause? — Fünfzehn Minuten.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Zaman ifadeleri söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-06-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie haben ein Wort nicht verstanden. — Sie brauchen ein Blatt Papier. — Jemand bittet Sie um Ihr Buch.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Bir sözcüğü anlamadın. — Bir yaprak kâğıda ihtiyacın var. — Biri senden kitabını istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie haben ein Wort nicht verstanden. Fragen Sie mich.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Bir sözcüğü anlamadın. Bana sor.",
            },
            {
              who: "you",
              hint: "Tekrar etmesini ya da açıklamasını iste.",
              expect: "anlamadığını söyleyip tekrar ya da açıklama istemek (Können Sie das bitte wiederholen)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Natürlich, ich sage es noch einmal. Zweite Situation: Sie brauchen ein Blatt Papier. Bitten Sie mich darum.",
              tr: "Tabii, bir kez daha söyleyeyim. İkinci durum: Bir yaprak kâğıda ihtiyacın var. Benden iste.",
            },
            { who: "you", hint: "Kâğıt iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Hast du … / Können Sie mir … geben)", seconds: 20 },
            {
              who: "partner",
              de: "Hier bitte. Jetzt bitte ich Sie um etwas: Können Sie mir Ihr Buch für zehn Minuten geben?",
              tr: "Buyur. Şimdi ben senden bir şey rica ediyorum: Kitabını on dakikalığına verebilir misin?",
            },
            {
              who: "you",
              hint: "Ricaya karşılık ver: kabul et ya da kısa bir gerekçeyle reddet.",
              expect: "bir ricaya kabul ya da gerekçeli ret ile karşılık vermek",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "um Wiederholung bitten", tr: "Tekrar istemek" },
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Entschuldigung, ich habe das Wort nicht verstanden. Können Sie das bitte wiederholen? — Hast du ein Blatt Papier für mich? — Kannst du mir dein Buch geben? — Ja, gern, aber ich brauche es um halb elf wieder.",
            criteria: [
              "Anlamadığını söylemek için doğru kalıp kullanıldı mı? (Ich habe … nicht verstanden)",
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu?",
              "Gelen ricaya hem olumlu hem koşullu karşılık verilebiliyor mu?",
              "Koşul ya da gerekçe kısa bir cümleyle eklendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
