import type { MockPaper } from "../types";

/**
 * A1 · Deneme 8 — "Freizeit und Wetter".
 *
 * PLAN kâğıt 1–7 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: boş zaman ve hava durumu. Bu ikisi A1'de birlikte gelir,
 * çünkü planın kendisi havaya bağlı: "am Samstag soll es regnen, dann
 * gehen wir am Sonntag" cümlesi A1 öğrencisinin kurabildiği ilk koşullu
 * düşüncedir. Kâğıt bu yüzden birkaç maddede gün değiştirmeyi ölçüyor —
 * duyulanı değil, duyulandan çıkanı işaretlemek gerekiyor.
 *
 * YAZMA GÖREVİ önceki iki kâğıttan bilerek ayrıldı: orada kuruma resmî
 * yazı vardı, burada arkadaşa gayriresmî ileti. A1'de iki kayıt da
 * ölçülmeli, yoksa öğrenci `Sehr geehrte` kalıbını her yere taşıyor.
 */
export const A1_08: MockPaper = {
  id: "de-a1-08",
  course: "de",
  level: "A1",
  no: 8,
  theme: "Freizeit und Wetter",
  themeTr: "Boş zaman ve hava durumu",
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
          id: "de-a1-08-l1",
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
              title: "Von: jana.hofer@mail.de",
              body: `Hallo Ben,

am Sonntag gehe ich schwimmen. Kommst du mit?

Das Bad öffnet um zehn. Wir treffen uns um Viertel vor zehn am Eingang.

Der Eintritt kostet vier Euro fünfzig. Für Kinder ist er billiger.

Bring bitte ein Handtuch mit. Duschgel habe ich dabei.

Bis Sonntag
Jana`,
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Freibad",
              genreTr: "Açık havuzdaki duyuru",
              body: `Liebe Gäste,

bei Gewitter schließt das Freibad sofort. Bitte verlassen Sie dann das Wasser.

Die Sauna bleibt im Juli und August zu.

Am Dienstag ist das Bad nur für Kurse offen, von 14 bis 18 Uhr.

Ihr Team vom Freibad Süd`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-08-l1-1",
              no: 1,
              ref: "t1",
              text: "Jana und Ben treffen sich vor zehn Uhr.",
              answer: true,
              explain:
                "Buluşma saati \"um Viertel vor zehn\", yani 9.45. Havuz onda açılıyor; buluşma ondan önce.",
            },
            {
              kind: "bool",
              id: "de-a1-08-l1-2",
              no: 2,
              ref: "t1",
              text: "Ben muss ein Handtuch mitbringen.",
              answer: true,
              explain:
                "E-posta bir tek şey istiyor: \"Bring bitte ein Handtuch mit\".",
            },
            {
              kind: "bool",
              id: "de-a1-08-l1-3",
              no: 3,
              ref: "t1",
              text: "Jana bringt kein Duschgel mit.",
              answer: false,
              explain:
                "Duş jelini Jana getiriyor: \"Duschgel habe ich dabei\". Ben'den istenen yalnız havlu.",
            },
            {
              kind: "bool",
              id: "de-a1-08-l1-4",
              no: 4,
              ref: "t2",
              text: "Im Sommer kann man in die Sauna gehen.",
              answer: false,
              explain:
                "Duyuru iki yaz ayını adıyla sayıyor: \"Die Sauna bleibt im Juli und August zu\".",
            },
            {
              kind: "bool",
              id: "de-a1-08-l1-5",
              no: 5,
              ref: "t2",
              text: "Am Dienstagnachmittag gibt es Kurse im Bad.",
              answer: true,
              explain:
                "\"Am Dienstag ist das Bad nur für Kurse offen, von 14 bis 18 Uhr\" — 14 ile 18 arası öğleden sonradır.",
            },
          ],
        },
        {
          id: "de-a1-08-l2",
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
              id: "de-a1-08-l2-6",
              no: 6,
              text: "Ihre Tochter (6) soll am Wochenende schwimmen lernen.",
              options: [
                "Schwimmkurs für Anfänger\nsamstags 10 bis 11 Uhr\nfür Kinder ab fünf Jahren\nzehn Termine, 60 Euro",
                "Schwimmen für Erwachsene\nMontag und Mittwoch ab 20 Uhr\nnur mit Vorkenntnissen\nacht Termine, Anmeldung im Büro",
              ],
              answer: 0,
              explain:
                "Altı yaşında bir çocuk ve hafta sonu aranıyor. (a) `samstags` ve `für Kinder ab fünf Jahren` diyor. (b) de yüzme öğretiyor ama yetişkinlere, üstelik hafta içi akşam.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-l2-7",
              no: 7,
              text: "Sie wandern gern und suchen für Sonntag eine Gruppe.",
              options: [
                "Radgruppe Nord\njeden zweiten Sonntag\n40 Kilometer, eigenes Rad nötig\nTreffpunkt am Bahnhof, 9 Uhr",
                "Wandern am Sonntag\nzwei bis drei Stunden\nfür alle, auch ohne Erfahrung\nTreffpunkt Parkplatz Wald",
              ],
              answer: 1,
              explain:
                "İstenen yürüyüş. (b) `Wandern am Sonntag` diyor. (a) da pazar günü ve grup hâlinde ama bisikletle, üstelik kendi bisikletin gerekiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-l2-8",
              no: 8,
              text: "Sie möchten im Winter drinnen Sport machen. Zeit haben Sie nur am Abend.",
              options: [
                "Sporthalle am Ring\nFitness und Ballspiele\nMo–Fr 17 bis 22 Uhr\nMonatskarte 25 Euro",
                "Sportplatz im Park\nfrei für alle, kein Dach\nTore und Bänke vorhanden\nim Winter oft nass und kalt",
              ],
              answer: 0,
              explain:
                "İki koşul var: kapalı alan ve akşam saati. (a) salon ve `17 bis 22 Uhr`. (b) bedava ama `kein Dach` yazıyor, kışın kapalı alan olmuyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-l2-9",
              no: 9,
              text: "Sie suchen für Ihre Tochter (10) eine Tanzgruppe.",
              options: [
                "Tanzkurs für Paare\nab achtzehn Jahren\nfreitags 19 bis 21 Uhr\nAnmeldung nur zu zweit möglich",
                "Kindertanz\nmittwochs 16 Uhr\nfür Kinder von 8 bis 12\nerste Stunde kostenlos",
              ],
              answer: 1,
              explain:
                "Belirleyici olan yaş. (b) `für Kinder von 8 bis 12` diyor. (a) da dans kursu ama `ab achtzehn Jahren` ve yalnız çift olarak kayıt alıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-l2-10",
              no: 10,
              text: "Sie möchten am Samstag mit Freunden grillen und brauchen einen Platz.",
              options: [
                "Grillplatz im Stadtpark\nam Wochenende frei\nkeine Anmeldung nötig\nbitte den Müll mitnehmen",
                "Gartenlokal am See\nwarme Küche bis 22 Uhr\nTische bitte vorher reservieren\neigenes Essen ist nicht erlaubt",
              ],
              answer: 0,
              explain:
                "Kendi mangalı için yer aranıyor. (a) `Grillplatz` ve hafta sonu boş. (b) de bahçede yemek veriyor ama kendi yemeğini götürmek yasak: `eigenes Essen ist nicht erlaubt`.",
            },
          ],
        },
        {
          id: "de-a1-08-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild im Schwimmbad",
              genreTr: "Havuzdaki levha",
              body: `Springen nur vom rechten Beckenrand.

Kinder unter sieben Jahren nur mit Erwachsenen.

Bitte vor dem Baden duschen.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild am Sportplatz",
              genreTr: "Spor sahasındaki levha",
              body: `Der Platz ist bei Regen gesperrt.

Hunde bitte draußen lassen.

Licht bis 22 Uhr. Danach bitte leise sein.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-08-l3-11",
              no: 11,
              ref: "s1",
              text: "Man darf überall ins Wasser springen.",
              answer: false,
              explain:
                "Levha tek bir yer gösteriyor: \"Springen nur vom rechten Beckenrand\". `nur` sözcüğü kuralı tek kenara bağlıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-08-l3-12",
              no: 12,
              ref: "s1",
              text: "Kinder unter sieben brauchen einen Erwachsenen.",
              answer: true,
              explain:
                "\"Kinder unter sieben Jahren nur mit Erwachsenen\" — yedi yaşından küçükler yalnız giremiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-08-l3-13",
              no: 13,
              ref: "s1",
              text: "Duschen ist nach dem Baden nötig.",
              answer: false,
              explain:
                "Levhadaki sıra ters: \"Bitte vor dem Baden duschen\". Duş suya girmeden önce isteniyor.",
            },
            {
              kind: "bool",
              id: "de-a1-08-l3-14",
              no: 14,
              ref: "s2",
              text: "Bei Regen darf man nicht auf den Platz.",
              answer: true,
              explain:
                "İlk satır bunu söylüyor: \"Der Platz ist bei Regen gesperrt\".",
            },
            {
              kind: "bool",
              id: "de-a1-08-l3-15",
              no: 15,
              ref: "s2",
              text: "Nach 22 Uhr soll man leise sein.",
              answer: true,
              explain:
                "\"Licht bis 22 Uhr. Danach bitte leise sein\" — ışık sönünce sessizlik kuralı başlıyor.",
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
          id: "de-a1-08-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch an der Kasse im Bad",
              genreTr: "Havuz gişesinde konuşma",
              situation: "Bir aile bilet alıyor.",
              plays: 2,
              segments: [
                { speaker: "Gast", text: "Zwei Erwachsene und ein Kind, bitte." },
                { speaker: "Kassiererin", text: "Neun Euro für die Erwachsenen, zwei fünfzig für das Kind. Zusammen elf fünfzig." },
                { speaker: "Gast", text: "Hier, bitte." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın kursun olup olmadığını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Sommer", text: "Findet der Kurs heute statt?" },
                { speaker: "Trainer", text: "Nein, heute fällt er aus. Wir machen nächste Woche weiter, zur gleichen Zeit." },
                { speaker: "Frau Sommer", text: "Gut, dann komme ich später wieder." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch unter Freunden",
              genreTr: "Arkadaşlar arasında konuşma",
              situation: "İki arkadaş bisiklet turunu planlıyor.",
              plays: 2,
              segments: [
                { speaker: "Lars", text: "Sollen wir am Samstag radfahren?" },
                { speaker: "Nina", text: "Am Samstag soll es regnen. Am Sonntag wird es trocken." },
                { speaker: "Lars", text: "Dann fahren wir einen Tag später." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch im Sportverein",
              genreTr: "Spor kulübünde konuşma",
              situation: "Bir baba antrenman günlerini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Frey", text: "Wann ist das Training für die Kinder?" },
                { speaker: "Trainerin", text: "Dienstag und Donnerstag um siebzehn Uhr." },
                { speaker: "Herr Frey", text: "Dienstag geht bei uns leider nicht." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch am Eingang",
              genreTr: "Girişte konuşma",
              situation: "Bir ziyaretçi bisikletini bırakmak istiyor.",
              plays: 2,
              segments: [
                { speaker: "Besucherin", text: "Kann ich das Fahrrad hier lassen?" },
                { speaker: "Mitarbeiter", text: "Nicht am Eingang. Hinter dem Haus gibt es Ständer." },
                { speaker: "Besucherin", text: "Danke, ich stelle es dorthin." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch in der Pause",
              genreTr: "Molada konuşma",
              situation: "İki arkadaş hafta sonunu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Lars", text: "Was machst du am Samstag?" },
                { speaker: "Meryem", text: "Erst Fußball, dann ins Kino. Am Sonntag schlafe ich lang." },
                { speaker: "Lars", text: "Das klingt gut." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-08-h1-1",
              no: 1,
              ref: "a1",
              text: "Was zahlt der Gast zusammen?",
              options: ["11,50 Euro", "9,00 Euro", "2,50 Euro"],
              answer: 0,
              explain:
                "Kasiyer üç sayı söylüyor: dokuz euro yetişkinler, iki elli çocuk, \"Zusammen elf fünfzig\". Sorulan toplam.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h1-2",
              no: 2,
              ref: "a2",
              text: "Wann ist der nächste Kurs?",
              options: ["Heute Abend.", "Nächste Woche.", "In zwei Wochen."],
              answer: 1,
              explain:
                "Antrenör bugünü iptal edip yeni zamanı söylüyor: \"Wir machen nächste Woche weiter\". Saat aynı kalıyor, gün değişiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h1-3",
              no: 3,
              ref: "a3",
              text: "Wann fahren die beiden Rad?",
              options: ["Am Freitag.", "Am Samstag.", "Am Sonntag."],
              answer: 2,
              explain:
                "Cumartesi yağmur bekleniyor, \"Am Sonntag wird es trocken\". Son cümledeki \"einen Tag später\" bu yüzden pazar demek.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h1-4",
              no: 4,
              ref: "a4",
              text: "Wann kommt das Kind zum Training?",
              options: ["Am Dienstag.", "Am Donnerstag.", "An beiden Tagen."],
              answer: 1,
              explain:
                "İki gün öneriliyor, ama baba birini eliyor: \"Dienstag geht bei uns leider nicht\". Geriye perşembe kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h1-5",
              no: 5,
              ref: "a5",
              text: "Wohin stellt die Besucherin das Rad?",
              options: ["Vor den Haupteingang.", "Hinter das Haus.", "In das Café nebenan."],
              answer: 1,
              explain:
                "Görevli girişi yasaklayıp yer gösteriyor: \"Hinter dem Haus gibt es Ständer\".",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h1-6",
              no: 6,
              ref: "a6",
              text: "Was macht Meryem am Samstag?",
              options: ["Fußball und Kino.", "Nur schlafen.", "Nichts Besonderes."],
              answer: 0,
              explain:
                "Soru cumartesiyi soruyor. Uyumak pazara ait: \"Am Sonntag schlafe ich lang\". Cumartesi için iki şey sayılıyor.",
            },
          ],
        },
        {
          id: "de-a1-08-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Freibad",
              genreTr: "Açık havuzda anons",
              situation: "Fırtına yüzünden kapanış.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, wegen des Gewitters schließen wir das Bad. Bitte verlassen Sie das Wasser und gehen Sie in die Halle.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Stadion",
              genreTr: "Statta anons",
              situation: "Maç saati değişti.",
              plays: 1,
              segments: [
                {
                  text: "Achtung, eine wichtige Information: Das Spiel beginnt heute erst um sechzehn Uhr. Der Grund ist der starke Regen am Morgen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage im Park",
              genreTr: "Parkta anons",
              situation: "Bir yol kapalı.",
              plays: 1,
              segments: [
                {
                  text: "Der Weg am See ist heute gesperrt. Bitte nehmen Sie den Weg hinter dem Spielplatz. Er ist etwas länger, aber frei.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage in der Sporthalle",
              genreTr: "Spor salonunda anons",
              situation: "Kapanış saatleri.",
              plays: 1,
              segments: [
                {
                  text: "Die Halle schließt um zweiundzwanzig Uhr. Bitte verlassen Sie die Duschen schon bis Viertel vor zehn.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-08-h2-7",
              no: 7,
              ref: "d1",
              text: "Die Gäste sollen aus dem Wasser kommen.",
              answer: true,
              explain:
                "Anons iki şey istiyor ve ilki bu: \"Bitte verlassen Sie das Wasser\". Sebep fırtına.",
            },
            {
              kind: "bool",
              id: "de-a1-08-h2-8",
              no: 8,
              ref: "d2",
              text: "Das Spiel fängt früher an.",
              answer: false,
              explain:
                "Anonstaki \"erst um sechzehn Uhr\" gecikme demek. Sabahki yağmur yüzünden maç geç başlıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-08-h2-9",
              no: 9,
              ref: "d3",
              text: "Man soll den Weg hinter dem Spielplatz nehmen.",
              answer: true,
              explain:
                "Göl kenarı kapalı; anons \"Bitte nehmen Sie den Weg hinter dem Spielplatz\" diyor.",
            },
            {
              kind: "bool",
              id: "de-a1-08-h2-10",
              no: 10,
              ref: "d4",
              text: "Man kann bis zweiundzwanzig Uhr duschen.",
              answer: false,
              explain:
                "İki ayrı saat var: salon 22'de kapanıyor ama duşlar için \"bis Viertel vor zehn\", yani 21.45 deniyor.",
            },
          ],
        },
        {
          id: "de-a1-08-h3",
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
              situation: "Kulüp antrenmanın iptalini bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist der Sportverein Nord. Das Training am Mittwoch fällt aus. Wir treffen uns erst wieder am Montag. Bitte sagen Sie es auch den anderen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Havuz kartın hazır olduğunu söylüyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo, hier ist das Freibad Süd. Ihre Jahreskarte ist fertig. Sie können sie ab Montag am Eingang abholen. Bringen Sie bitte ein Foto mit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Yürüyüş grubu süreyi bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Frau Weiss, hier ist die Wandergruppe. Am Sonntag laufen wir nur zwei Stunden. Der Treffpunkt ist wie immer der Parkplatz um neun.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Dans okulu kursun başlangıcını bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Abend, hier ist die Tanzschule. Ihr Kurs beginnt am nächsten Donnerstag um neunzehn Uhr. Kommen Sie bitte mit bequemen Schuhen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Bir arkadaş yağmur yüzünden plan değiştiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Deniz, hier ist Milan. Morgen soll es den ganzen Tag regnen. Wollen wir statt Fußball ins Museum gehen? Ruf mich bitte heute Abend an.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-08-h3-11",
              no: 11,
              ref: "m1",
              text: "Wann ist das nächste Training?",
              options: ["Am Mittwoch.", "Am Freitag.", "Am Montag."],
              answer: 2,
              explain:
                "Çarşamba iptal: \"Das Training am Mittwoch fällt aus\". Yeni buluşma \"erst wieder am Montag\".",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h3-12",
              no: 12,
              ref: "m2",
              text: "Was soll der Gast mitbringen?",
              options: ["Ein Foto.", "Das alte Ticket.", "Zehn Euro."],
              answer: 0,
              explain:
                "Mesajın son cümlesi tek bir şey istiyor: \"Bringen Sie bitte ein Foto mit\". Pazartesi alma günü, getirilecek şey değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h3-13",
              no: 13,
              ref: "m3",
              text: "Wie lange dauert die Wanderung?",
              options: ["Eine Stunde.", "Zwei Stunden.", "Den ganzen Vormittag."],
              answer: 1,
              explain:
                "Süre mesajda geçiyor: \"Am Sonntag laufen wir nur zwei Stunden\". Dokuz buluşma saati, süre değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h3-14",
              no: 14,
              ref: "m4",
              text: "Was soll man mitbringen?",
              options: ["Ein kaltes Getränk.", "Eine zweite Person.", "Bequeme Schuhe."],
              answer: 2,
              explain:
                "Mesajın kapanışı bir rica: \"Kommen Sie bitte mit bequemen Schuhen\". Başka bir şey istenmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-08-h3-15",
              no: 15,
              ref: "m5",
              text: "Was schlägt Milan vor?",
              options: ["Trotzdem Fußball zu spielen.", "Ins Museum zu gehen.", "Den Ausflug abzusagen."],
              answer: 1,
              explain:
                "Yağmur yüzünden plan değişiyor ama iptal edilmiyor: \"Wollen wir statt Fußball ins Museum gehen?\"",
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
          id: "de-a1-08-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihr Nachbar Andrés Molina möchte im Sportverein Nord anfangen. Sie helfen ihm bei der Anmeldung. Andrés ist am 3. Februar 1990 geboren. Er wohnt in der Birkenstraße 24 in 68159 Mannheim. Seine E-Mail-Adresse ist a.molina@mail.de. Er möchte das Training am Donnerstag. Füllen Sie das Formular aus.",
          promptTr:
            "Komşun Andrés Molina, Sportverein Nord'a başlamak istiyor. Kayıtta ona yardım ediyorsun. Andrés 3 Şubat 1990 doğumlu. Birkenstraße 24, 68159 Mannheim adresinde oturuyor. E-posta adresi a.molina@mail.de. Antrenmanı perşembe istiyor. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung — Sportverein Nord",
              body: `Familienname, Vorname:    Molina, Andrés
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Mannheim
E-Mail:                   {{4}}
Trainingstag:             {{5}}
Unterschrift:             A. Molina`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-08-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["03.02.1990", "3.2.1990", "3. Februar 1990", "03.02.90", "3.2.90"],
              explain:
                "Yönerge \"am 3. Februar 1990 geboren\" diyor. Şubat yılın ikinci ayı, o yüzden rakamla 03.02.1990 olur.",
            },
            {
              kind: "gap",
              id: "de-a1-08-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Birkenstraße 24", "Birkenstr. 24"],
              explain:
                "Yönergedeki adres Birkenstraße 24. Bu satır yalnız sokak ve numara istiyor; şehir aşağıdaki satıra ait.",
            },
            {
              kind: "gap",
              id: "de-a1-08-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["68159"],
              explain:
                "\"in 68159 Mannheim\" — posta kodu şehir adından önce gelen beş haneli sayıdır. Mannheim formda zaten yazılı.",
            },
            {
              kind: "gap",
              id: "de-a1-08-s1-4",
              no: 4,
              text: "E-Mail",
              accept: ["a.molina@mail.de"],
              explain:
                "E-posta adresi yönergede harfi harfine veriliyor: a.molina@mail.de. Adres değiştirilmeden kopyalanır.",
            },
            {
              kind: "gap",
              id: "de-a1-08-s1-5",
              no: 5,
              text: "Trainingstag",
              accept: ["Donnerstag", "am Donnerstag", "donnerstags"],
              explain:
                "\"Er möchte das Training am Donnerstag\" — antrenman günü perşembe. Formda gün adı tek başına yeterli.",
            },
          ],
        },
        {
          id: "de-a1-08-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie möchten am Freitag mit Ihrer Freundin Sara ins Kino gehen. Schreiben Sie ihr eine Nachricht. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Cuma arkadaşın Sara ile sinemaya gitmek istiyorsun. Ona bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Sagen Sie, wann und wo Sie sich treffen.", tr: "Ne zaman ve nerede buluşacağınızı söyle." },
              { de: "Fragen Sie, welchen Film sie sehen möchte.", tr: "Hangi filmi izlemek istediğini sor." },
            ],
            sample: `Liebe Sara,

am Freitag läuft ein neuer Film im Kino. Hast du Lust?

Wir können uns um sieben Uhr vor dem Kino treffen. Es ist am Marktplatz.

Welchen Film möchtest du sehen?

Bis Freitag
Nuray`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Arkadaşa yazıldığı için `Liebe Sara` ve kısa bir veda uygun.",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Arkadaşa yazıldığı için `du` kullanıldı mı? `Sie` burada fazla resmî kalır.",
              "Buluşma hem saat hem yer olarak söylendi mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: von der Freizeit erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: boş zamanı anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-08-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie, was Sie in Ihrer Freizeit machen. Sprechen Sie zu den Stichwörtern: Sport — Tage — mit wem — Wetter — Sommer und Winter — Lieblingsplatz.",
          promptTr:
            "Boş zamanında ne yaptığını anlat. Şu anahtar sözcüklere göre konuş: spor — günler — kiminle — hava — yaz ve kış — en sevdiğin yer.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "sagen, was Sie machen", tr: "Ne yaptığını söylemek" },
              { de: "sagen, wann und mit wem", tr: "Ne zaman ve kiminle olduğunu söylemek" },
              { de: "Sommer und Winter vergleichen", tr: "Yaz ile kışı karşılaştırmak" },
            ],
            sample:
              "In meiner Freizeit spiele ich Fußball. Wir trainieren am Dienstag und am Freitag. Ich spiele mit Freunden aus meinem Kurs. Bei Regen bleiben wir zu Hause. Im Sommer bin ich draußen, im Winter gehe ich in die Halle. Mein Lieblingsplatz ist der Sportplatz im Park.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Gün ve sıklık söylenebiliyor mu? (am Dienstag, am Freitag)",
              "Yaz ve kış ayrı ayrı anlatıldı mı?",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-08-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Freizeit. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Sport — Wochenende — Wetter — Verein — Urlaub.",
          promptTr:
            "Konu: Boş zaman. Her anahtar sözcük için bir soru kur ve cevapla: spor — hafta sonu — hava — kulüp — tatil.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Freizeit. Ihr erstes Stichwort ist: Sport. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi boş zaman konusunu konuşuyoruz. İlk sözcüğün: spor. Bana bir soru sor.",
            },
            { who: "you", hint: "«Sport» sözcüğüyle bir soru kur.", expect: "Sport sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich schwimme zweimal in der Woche. Ihr nächstes Stichwort ist: Wochenende.",
              tr: "Haftada iki kez yüzüyorum. Sıradaki sözcüğün: hafta sonu.",
            },
            { who: "you", hint: "«Wochenende» için bir soru kur.", expect: "Wochenende sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Am Wochenende bin ich meistens im Park. Und jetzt eine Frage an Sie: Was machen Sie bei schlechtem Wetter?",
              tr: "Hafta sonu genelde parktayım. Şimdi sana bir soru: Hava kötüyken ne yaparsın?",
            },
            { who: "you", hint: "Kötü havada ne yaptığını söyle.", expect: "hava koşuluna bağlı bir etkinlik söylemek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wohin fahren Sie im Urlaub?",
              tr: "Teşekkürler. Son soru: Tatilde nereye gidersin?",
            },
            { who: "you", hint: "Bir yer söyle.", expect: "bir yer ifadesiyle cevap vermek (ans Meer, in die Berge …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Welchen Sport machst du? — Ich spiele Fußball. Was machst du am Wochenende? — Ich treffe Freunde. Wie ist das Wetter morgen? — Es soll regnen. Bist du in einem Verein? — Ja, seit zwei Jahren. Wohin fährst du im Urlaub? — Ans Meer.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Hava ve yer ifadeleri söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-08-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie möchten die Öffnungszeiten wissen. — Sie brauchen ein Handtuch. — Jemand bittet Sie um Ihr Fahrrad.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Açılış saatlerini öğrenmek istiyorsun. — Bir havluya ihtiyacın var. — Biri senden bisikletini istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie möchten wissen, wann das Bad öffnet. Fragen Sie mich.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Havuzun ne zaman açıldığını öğrenmek istiyorsun. Bana sor.",
            },
            {
              who: "you",
              hint: "Açılış saatini sor.",
              expect: "bir saat sorusu kurmak (Wann öffnet …)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Wir öffnen um zehn Uhr. Zweite Situation: Sie brauchen ein Handtuch. Bitten Sie mich darum.",
              tr: "Onda açıyoruz. İkinci durum: Bir havluya ihtiyacın var. Benden iste.",
            },
            { who: "you", hint: "Havlu iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Können Sie mir bitte … leihen)", seconds: 20 },
            {
              who: "partner",
              de: "Hier bitte, es kostet zwei Euro. Jetzt bitte ich Sie um etwas: Kann ich Ihr Fahrrad für eine Stunde nehmen?",
              tr: "Buyur, iki euro. Şimdi ben senden bir şey rica ediyorum: Bisikletini bir saatliğine alabilir miyim?",
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
              { de: "nach der Zeit fragen", tr: "Saati sormak" },
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Entschuldigung, wann öffnet das Bad? — Können Sie mir bitte ein Handtuch leihen? — Ja, gern. Nehmen Sie das Rad, aber bringen Sie es um vier zurück. — Tut mir leid, ich brauche es heute selbst.",
            criteria: [
              "Saat sorusu doğru kuruldu mu? (Wann öffnet …)",
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu?",
              "Gelen ricaya hem olumlu hem olumsuz karşılık verilebiliyor mu?",
              "Kabulde bir koşul ya da saat eklendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
