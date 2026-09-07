import type { MockPaper } from "../types";

/**
 * A1 · Deneme 1 — "Ankommen und Alltag".
 *
 * ÖLÇÜM PLANI (A1 tanımı: bilinen günlük durumlarda kısa, basit metinleri
 * anlamak; tek tek bilgileri bulmak):
 *
 *   Lesen  25 dk · 15 madde
 *     Teil 1  5  Richtig/Falsch   özel mesaj — tek bilgiyi bulma (detail)
 *     Teil 2  5  iki şıklı seçme  ilan/site — hangisi bana uyar (orientation)
 *     Teil 3  5  Richtig/Falsch   levha/duyuru — kural okuma (instruction)
 *   Hören  20 dk · 15 madde
 *     Teil 1  6  üç şıklı seçme   kısa konuşma, iki kez (detail)
 *     Teil 2  4  Richtig/Falsch   anons, bir kez (instruction)
 *     Teil 3  5  üç şıklı seçme   telefon/kısa konuşma, iki kez (detail)
 *   Schreiben 20 dk  form doldurma (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk  tanışma · bilgi isteme · rica etme
 *
 * A1 SINIRI: yalnız şimdiki zaman, `können/möchten/müssen`, ayrılabilen
 * fiiller, akkusativ ve kalıplaşmış datif (mit dem Bus, im Hof). Yan cümle,
 * edilgen, Konjunktiv ve Genitiv yok. Sayı, saat ve fiyat okumak A1'in kendi
 * ölçütü olduğu için maddelerin bir kısmı bilerek bunlara dayanıyor.
 */
export const A1_01: MockPaper = {
  id: "de-a1-01",
  course: "de",
  level: "A1",
  no: 1,
  theme: "Ankommen und Alltag",
  themeTr: "Varış ve gündelik hayat",
  minutes: 80,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 25,
      instruction:
        "Dieser Teil hat drei Aufgaben. Sie lesen kurze Nachrichten, Anzeigen und Schilder. Zu jedem Text gibt es Fragen. Wählen Sie die richtige Lösung.",
      instructionTr:
        "Bu bölümde üç görev var. Kısa iletiler, ilanlar ve levhalar okuyacaksın. Her metnin soruları var; doğru cevabı işaretle.",
      tasks: [
        {
          id: "de-a1-01-l1",
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
              title: "Von: ewa.k@post.de",
              body: `Hallo Marek,

morgen komme ich nach Köln! Mein Zug ist um 14.20 Uhr am Hauptbahnhof. Ich warte vor dem Kiosk, direkt neben Gleis 5.

Mein Handy funktioniert leider nicht. Der Akku ist kaputt und ich kaufe erst nächste Woche einen neuen.

Am Abend möchte ich gern Pizza essen. Kochst du oder gehen wir zusammen ins Restaurant?

Bis morgen!
Ewa`,
              gloss: [
                { de: "der Akku", tr: "pil", en: "battery" },
                { de: "das Gleis", tr: "peron", en: "platform" },
                { de: "erst", tr: "ancak, daha önce değil", en: "not until" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Haus",
              genreTr: "Apartman ilanı",
              title: "An alle Nachbarn",
              body: `Liebe Nachbarn,

am Samstag, dem 12. Mai, machen wir ein kleines Fest im Hof. Wir fangen um 15 Uhr an.

Kaffee und Kuchen kosten nichts. Für das Essen am Abend bezahlt jeder 5 Euro.

Bringen Sie bitte Ihre Kinder mit! Wir haben Spiele und Musik.

Bei Regen feiern wir unten im Waschkeller.

Familie Yılmaz, Wohnung 3 B`,
              gloss: [
                { de: "der Hof", tr: "avlu", en: "courtyard" },
                { de: "kosten nichts", tr: "ücretsiz", en: "free of charge" },
                { de: "der Waschkeller", tr: "bodrumdaki çamaşırlık", en: "laundry room in the basement" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-01-l1-1",
              no: 1,
              ref: "t1",
              text: "Ewas Zug kommt vor 15 Uhr an.",
              answer: true,
              explain:
                "Metinde tren saati 14.20 olarak veriliyor; 14.20, saat 15'ten öncedir. A1'de saat okumak ölçülen becerilerden biri, bu yüzden madde doğrudan saate dayanıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l1-2",
              no: 2,
              ref: "t1",
              text: "Marek kann Ewa auf dem Handy anrufen.",
              answer: false,
              explain:
                "Ewa \"Mein Handy funktioniert leider nicht\" diyor ve yeni pili ancak gelecek hafta alacak. Yani telefonla ulaşılamıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l1-3",
              no: 3,
              ref: "t2",
              text: "Das Fest beginnt am Nachmittag.",
              answer: true,
              explain:
                "\"Wir fangen um 15 Uhr an\" — saat 15 öğleden sonradır (Nachmittag). Ayrılabilen fiil `anfangen` A1 kelimesidir.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l1-4",
              no: 4,
              ref: "t2",
              text: "Der Kuchen ist kostenlos.",
              answer: true,
              explain:
                "\"Kaffee und Kuchen kosten nichts\" — bedava. 5 euro yalnız akşam yemeği için isteniyor; iki bilgiyi karıştırmamak maddenin sınadığı şey.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l1-5",
              no: 5,
              ref: "t2",
              text: "Bei schlechtem Wetter fällt das Fest aus.",
              answer: false,
              explain:
                "\"Bei Regen feiern wir unten im Waschkeller\" — yağmurda iptal edilmiyor, yer değişiyor. `ausfallen` (iptal olmak) bilinmese bile metindeki alternatif yer cevabı veriyor.",
            },
          ],
        },
        {
          id: "de-a1-01-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt: "Lesen Sie die Situationen 6 bis 10 und die zwei Anzeigen dazu. Wo finden Sie die Information: a oder b?",
          promptTr: "6–10. durumları ve yanlarındaki iki ilanı oku. Bilgiyi nerede bulursun: a mı b mi?",
          items: [
            {
              kind: "mcq",
              id: "de-a1-01-l2-6",
              no: 6,
              text: "Sie möchten am Sonntag mit Ihrer Familie schwimmen gehen.",
              options: [
                "Schwimmbad Nordpark\nMontag bis Freitag 7–21 Uhr\nSamstag und Sonntag 9–19 Uhr\nFamilienkarte 12 €",
                "Schwimmschule Delfin\nAnfängerkurse für Kinder\nDienstag und Donnerstag 16 Uhr\nAnmeldung im Büro",
              ],
              answer: 0,
              explain:
                "İstenen şey pazar günü ailece yüzmek. (a) hafta sonu saatlerini ve aile biletini veriyor. (b) bir kurs; yalnız salı ve perşembe, üstelik çocuklar için ders — pazar günü serbest yüzme değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-l2-7",
              no: 7,
              text: "Ihr Fahrrad ist kaputt. Sie brauchen schnell Hilfe.",
              options: [
                "Rad & Tour\nFahrräder und Zubehör\nNeue Modelle ab 299 €\nBeratung nach Termin",
                "Radwerkstatt Kern\nReparatur oft am gleichen Tag\nOhne Termin\nMo–Sa 8–18 Uhr",
              ],
              answer: 1,
              explain:
                "Bozuk bisiklet tamir ister. (b) `Reparatur` diyor ve randevusuz, aynı gün. (a) bisiklet satıyor — `Modelle ab 299 €` satış fiyatıdır, tamir değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-l2-8",
              no: 8,
              text: "Sie suchen einen Deutschkurs am Abend, weil Sie tagsüber arbeiten.",
              options: [
                "Sprachschule Aurora\nDeutsch A1–B2\nAbendkurse 18.30–20.30 Uhr\nStart jeden Monat",
                "Sprachschule Aurora — Kinderclub\nDeutsch spielend lernen\nMittwoch 15–16.30 Uhr\nFür Kinder von 6 bis 10",
              ],
              answer: 0,
              explain:
                "\"am Abend\" ve \"tagsüber arbeiten\" akşam kursu demek. (a) 18.30–20.30 akşam saatidir. (b) aynı okulun çocuk kulübü ve saat 15'te — yetişkin için de akşam için de değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-l2-9",
              no: 9,
              text: "Sie möchten wissen, wann der letzte Bus nach Hause fährt.",
              options: [
                "Stadtbus Regenau\nNeue Busse ab Januar\nMehr Platz, weniger Lärm\nFotos und Infos zum Projekt",
                "Stadtbus Regenau\nFahrplan Linie 4\nAbfahrten Montag bis Sonntag\nLetzte Fahrt 23.40 Uhr",
              ],
              answer: 1,
              explain:
                "Son otobüs saati bir tarifedir. (b) `Fahrplan` ve `Letzte Fahrt 23.40 Uhr` diyor. (a) yeni otobüsleri tanıtan bir haber; saat yok.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-l2-10",
              no: 10,
              text: "Sie haben Zahnschmerzen und brauchen heute einen Termin.",
              options: [
                "Zahnarztpraxis Dr. Bühl\nNotfälle täglich 8–10 Uhr ohne Termin\nTelefon 0221 55 40 12",
                "Apotheke am Markt\nZahnbürsten und Zahnpasta\ndiese Woche 20 % günstiger\nMo–Fr 8.30–19 Uhr",
              ],
              answer: 0,
              explain:
                "Diş ağrısı için bugün muayene lazım. (a) `Notfälle täglich ... ohne Termin` — acil, her gün, randevusuz. (b) eczane; diş fırçası satıyor, tedavi etmiyor.",
            },
          ],
        },
        {
          id: "de-a1-01-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild an der Bibliothek",
              genreTr: "Kütüphane kapısındaki levha",
              body: `STADTBIBLIOTHEK

Essen und Trinken bitte nur im Café
im Erdgeschoss.

Wasser in Flaschen ist überall erlaubt.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Aushang im Supermarkt",
              genreTr: "Markette asılı duyuru",
              body: `Liebe Kundinnen und Kunden,

am Mittwoch bleibt unser Markt wegen Renovierung
geschlossen.

Ab Donnerstag sind wir wieder für Sie da —
mit neuen Öffnungszeiten: 7 bis 22 Uhr.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Schild im Park",
              genreTr: "Parktaki levha",
              body: `Hunde sind im Park willkommen.

Bitte an der Leine führen.

Auf der Wiese für Kinder: Hunde verboten.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Zettel im Treppenhaus",
              genreTr: "Merdiven boşluğundaki not",
              body: `Der Aufzug ist bis Freitag kaputt.

Die Firma kommt am Donnerstag.

Bitte benutzen Sie die Treppe.`,
            },
            {
              kind: "text",
              id: "s5",
              genre: "Schild am Museum",
              genreTr: "Müze girişindeki levha",
              body: `Eintritt 9 €

Kinder bis 14 Jahre frei

Jeden ersten Sonntag im Monat
zahlen alle nur 3 €.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-01-l3-11",
              no: 11,
              ref: "s1",
              text: "Sie dürfen im Lesesaal einen Kaffee trinken.",
              answer: false,
              explain:
                "Levha \"Essen und Trinken bitte nur im Café im Erdgeschoss\" diyor: yeme-içme sadece zemin kattaki kafede. Okuma salonu buna dahil değil. Şişedeki su istisnası kahveyi kapsamıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l3-12",
              no: 12,
              ref: "s2",
              text: "Am Mittwoch können Sie im Markt einkaufen.",
              answer: false,
              explain:
                "\"am Mittwoch bleibt unser Markt ... geschlossen\" — çarşamba kapalı. Yeni saatler perşembeden itibaren geçerli.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l3-13",
              no: 13,
              ref: "s3",
              text: "Sie können mit dem Hund in den Park gehen.",
              answer: true,
              explain:
                "\"Hunde sind im Park willkommen\" — köpekler parka girebilir, ama tasmalı. Yasak yalnız çocuk çimenliği için.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l3-14",
              no: 14,
              ref: "s4",
              text: "Am Donnerstag funktioniert der Aufzug wieder.",
              answer: false,
              explain:
                "Asansör cumaya kadar bozuk; firma perşembe geliyor. Perşembe tamirin yapılacağı gün, çalışacağı gün değil.",
            },
            {
              kind: "bool",
              id: "de-a1-01-l3-15",
              no: 15,
              ref: "s5",
              text: "Ein Kind von zehn Jahren bezahlt keinen Eintritt.",
              answer: true,
              explain:
                "\"Kinder bis 14 Jahre frei\" — 14 yaşına kadar ücretsiz, 10 yaş bunun içinde. `frei` burada \"bedava\" demek.",
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
        "Dieser Teil hat drei Aufgaben. Sie hören kurze Gespräche und Ansagen. Lesen Sie zuerst die Aufgabe, hören Sie dann den Text.",
      instructionTr:
        "Bu bölümde üç görev var. Kısa konuşmalar ve anonslar dinleyeceksin. Önce soruyu oku, sonra kaydı dinle.",
      tasks: [
        {
          id: "de-a1-01-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch im Geschäft",
              genreTr: "Mağazada konuşma",
              situation: "Bir müşteri kazağın fiyatını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Entschuldigung, was kostet dieser Pullover?" },
                { speaker: "Verkäufer", text: "Der blaue? Der kostet neunundzwanzig Euro neunzig." },
                { speaker: "Kundin", text: "Und der graue daneben?" },
                { speaker: "Verkäufer", text: "Der ist im Angebot, nur neunzehn Euro." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "İki arkadaş buluşma saatini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Jonas", text: "Hallo Sara, treffen wir uns um sieben?" },
                { speaker: "Sara", text: "Um sieben schaffe ich das nicht. Ich habe bis halb sieben Unterricht." },
                { speaker: "Jonas", text: "Gut, dann um acht." },
                { speaker: "Sara", text: "Ja, acht Uhr ist perfekt." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Restaurant",
              genreTr: "Restoranda konuşma",
              situation: "Bir kadın yemek sipariş ediyor.",
              plays: 2,
              segments: [
                { speaker: "Kellner", text: "Was möchten Sie essen?" },
                { speaker: "Gast", text: "Ich nehme die Suppe und dann den Fisch, bitte." },
                { speaker: "Kellner", text: "Der Fisch ist heute leider aus." },
                { speaker: "Gast", text: "Schade. Dann nehme ich das Hähnchen." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch in der Schule",
              genreTr: "Okulda konuşma",
              situation: "Bir anne oğlunun sınıfından söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Lehrerin", text: "Guten Tag, Frau Heger. In welche Klasse geht Ihr Sohn?" },
                { speaker: "Frau Heger", text: "Letztes Jahr war er in der dritten. Jetzt ist er in der vierten." },
                { speaker: "Lehrerin", text: "Ah, dann kennt er unsere Schule schon gut." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch im Kaufhaus",
              genreTr: "Mağazada yol sorma",
              situation: "Bir kadın ikinci kata nasıl çıkacağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Entschuldigung, wie komme ich in den zweiten Stock?" },
                { speaker: "Mitarbeiter", text: "Der Aufzug ist heute leider kaputt." },
                { speaker: "Kundin", text: "Und die Rolltreppe?" },
                { speaker: "Mitarbeiter", text: "Die geht nur bis in den ersten Stock. Nehmen Sie bitte die Treppe dort hinten." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch am Bahnhof",
              genreTr: "Garda konuşma",
              situation: "İki komşu tren peronunda karşılaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Kern", text: "Herr Albers! Fahren Sie in Urlaub?" },
                { speaker: "Herr Albers", text: "Nein, leider nicht. Meine Mutter ist krank, ich fahre zu ihr nach Bremen." },
                { speaker: "Frau Kern", text: "Oh, gute Besserung! Und wann sind Sie zurück?" },
                { speaker: "Herr Albers", text: "Am Sonntag. Montag muss ich wieder ins Büro." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-01-h1-1",
              no: 1,
              ref: "a1",
              text: "Was kostet der graue Pullover?",
              options: ["29,90 Euro.", "19 Euro.", "90 Euro."],
              answer: 1,
              explain:
                "İki fiyat geçiyor: mavi kazak 29,90; gri olan indirimde ve 19 euro. Soru grinin fiyatını soruyor. 90 sayısı `neunzig` içinden gelen tuzak.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h1-2",
              no: 2,
              ref: "a2",
              text: "Wann treffen sich Jonas und Sara?",
              options: ["Um halb sieben.", "Um sieben.", "Um acht."],
              answer: 2,
              explain:
                "Yedi teklif ediliyor ama Sara yetişemiyor; 6.30 dersinin bittiği saat. Anlaşılan saat sekiz: \"acht Uhr ist perfekt\".",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h1-3",
              no: 3,
              ref: "a3",
              text: "Was isst die Frau als Hauptgericht?",
              options: ["Suppe.", "Fisch.", "Hähnchen."],
              answer: 2,
              explain:
                "Balık istiyor ama kalmamış (\"ist heute leider aus\"), bunun üzerine tavuk alıyor. Çorba ana yemek değil, öncesinde.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h1-4",
              no: 4,
              ref: "a4",
              text: "In welche Klasse geht der Sohn?",
              options: ["In die dritte Klasse.", "In die vierte Klasse.", "In die neunte Klasse."],
              answer: 1,
              explain:
                "Üçüncü sınıf geçen yıldı (`letztes Jahr`), şimdi dördüncü. Sıra sayılarını ve zaman zarfını birlikte tutmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h1-5",
              no: 5,
              ref: "a5",
              text: "Wie kommt die Frau in den zweiten Stock?",
              options: ["Mit dem Aufzug.", "Mit der Rolltreppe.", "Über die Treppe."],
              answer: 2,
              explain:
                "Asansör bozuk, yürüyen merdiven yalnız birinci kata gidiyor. Geriye merdiven kalıyor: \"Nehmen Sie bitte die Treppe\".",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h1-6",
              no: 6,
              ref: "a6",
              text: "Warum fährt Herr Albers nach Bremen?",
              options: ["Er macht Urlaub.", "Er besucht seine Mutter.", "Er arbeitet dort."],
              answer: 1,
              explain:
                "Tatil sorusuna \"Nein, leider nicht\" diyor; hasta annesine gidiyor. Büro pazartesi ve Bremen'de değil, dönüşte.",
            },
          ],
        },
        {
          id: "de-a1-01-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Kaufhaus",
              genreTr: "Mağaza anonsu",
              situation: "Mağazada kapanış anonsu.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, unser Haus schließt in fünfzehn Minuten. Bitte kommen Sie jetzt zu den Kassen im Erdgeschoss. Wir öffnen morgen wieder um neun Uhr.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Zug",
              genreTr: "Trende anons",
              situation: "Trende yolculara duyuru.",
              plays: 1,
              segments: [
                {
                  text: "Sehr geehrte Fahrgäste, wir erreichen in wenigen Minuten Mainz. Der Zug endet hier. Bitte steigen Sie alle aus und nehmen Sie Ihr Gepäck mit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage am Flughafen",
              genreTr: "Havalimanı anonsu",
              situation: "Bir yolcu aranıyor.",
              plays: 1,
              segments: [
                {
                  text: "Herr Daniel Kovac, gebucht nach Wien, bitte sofort zum Ausgang B zwölf. Ihr Flug schließt in fünf Minuten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Schwimmbad",
              genreTr: "Yüzme havuzu anonsu",
              situation: "Havuzda akşam duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Achtung, eine Information: Das große Becken schließt heute schon um sechs Uhr. Das kleine Becken bleibt bis acht Uhr offen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-01-h2-7",
              no: 7,
              ref: "d1",
              text: "Die Kunden sollen zu den Kassen gehen.",
              answer: true,
              explain:
                "\"Bitte kommen Sie jetzt zu den Kassen\" — anonsun istediği tam olarak bu. `sollen` yönergeyi aktarıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-01-h2-8",
              no: 8,
              ref: "d2",
              text: "Die Fahrgäste sollen im Zug bleiben.",
              answer: false,
              explain:
                "Tren orada son buluyor (\"Der Zug endet hier\") ve herkesin inmesi isteniyor. Tam tersi söyleniyor.",
            },
            {
              kind: "bool",
              id: "de-a1-01-h2-9",
              no: 9,
              ref: "d3",
              text: "Herr Kovac soll sofort zum Ausgang kommen.",
              answer: true,
              explain:
                "Anons adıyla çağırıyor: \"bitte sofort zum Ausgang B zwölf\". Uçuşu beş dakika içinde kapanıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-01-h2-10",
              no: 10,
              ref: "d4",
              text: "Das kleine Becken schließt um sechs Uhr.",
              answer: false,
              explain:
                "Altıda kapanan büyük havuz. Küçük havuz sekize kadar açık. İki saat ve iki havuz bilerek karıştırılıyor.",
            },
          ],
        },
        {
          id: "de-a1-01-h3",
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
              situation: "Bir tamirhane arıyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist die Werkstatt Kern. Ihr Fahrrad ist fertig. Rufen Sie uns bitte zurück: null zwei zwei eins, acht sechs, vier vier, zwei null.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "İki kişi nerede buluşacaklarını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Tim", text: "Wo treffen wir uns? Am Zug?" },
                { speaker: "Nour", text: "Nein, der Bahnsteig ist zu voll. Komm lieber zur Information in der Halle." },
                { speaker: "Tim", text: "Gut, an der Information also." },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Gespräch im Wartezimmer",
              genreTr: "Bekleme odasında konuşma",
              situation: "Bir hasta ne kadar bekleyeceğini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Patient", text: "Wie lange dauert es noch?" },
                { speaker: "Sprechstundenhilfe", text: "Etwa zwanzig Minuten." },
                { speaker: "Patient", text: "So lange kann ich nicht warten. Ich habe um halb drei einen Termin. Ich warte noch zehn Minuten." },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın randevu alıyor.",
              plays: 2,
              segments: [
                { speaker: "Praxis", text: "Wann möchten Sie kommen? Am Montag oder am Samstag?" },
                { speaker: "Frau Roth", text: "Montag arbeite ich. Samstag ist gut." },
                { speaker: "Praxis", text: "Samstag um elf, in Ordnung?" },
                { speaker: "Frau Roth", text: "Ja, das passt." },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Gespräch zu Hause",
              genreTr: "Evde konuşma",
              situation: "Bir aile bozulan aleti konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Vater", text: "Der Fernseher geht wieder. Ich habe nur das Kabel gewechselt." },
                { speaker: "Lena", text: "Und der Computer?" },
                { speaker: "Vater", text: "Der ist kaputt. Wir müssen ihn in die Werkstatt bringen." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-01-h3-11",
              no: 11,
              ref: "m1",
              text: "Wie ist die Telefonnummer?",
              options: ["0221 86 44 20", "0221 68 44 20", "0221 86 42 20"],
              answer: 0,
              explain:
                "Numara okunurken \"acht sechs\" (86) geliyor, \"sechs acht\" değil; ardından \"vier vier, zwei null\" (44 20). Sayı dinlemek A1'in kendi ölçütü.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h3-12",
              no: 12,
              ref: "m2",
              text: "Wo treffen sich die beiden?",
              options: ["Am Zug.", "Auf dem Bahnsteig.", "An der Information."],
              answer: 2,
              explain:
                "Tren yanı öneriliyor ama peron kalabalık; danışmada buluşuyorlar. İlk söylenen seçenek çoğu zaman doğru olan değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h3-13",
              no: 13,
              ref: "m3",
              text: "Wie lange will der Patient noch warten?",
              options: ["Zwanzig Minuten.", "Zehn Minuten.", "Bis halb drei."],
              answer: 1,
              explain:
                "Yirmi dakika görevlinin verdiği süre; hasta o kadar bekleyemiyor ve \"Ich warte noch zehn Minuten\" diyor. 14.30 başka bir randevunun saati.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h3-14",
              no: 14,
              ref: "m4",
              text: "An welchem Tag kommt Frau Roth?",
              options: ["Am Montag.", "Am Samstag.", "Am Sonntag."],
              answer: 1,
              explain:
                "Pazartesi çalışıyor, bu yüzden cumartesiyi seçiyor: \"Samstag ist gut\" ve saat 11'de anlaşıyorlar.",
            },
            {
              kind: "mcq",
              id: "de-a1-01-h3-15",
              no: 15,
              ref: "m5",
              text: "Was ist kaputt?",
              options: ["Der Fernseher.", "Das Kabel.", "Der Computer."],
              answer: 2,
              explain:
                "Televizyon artık çalışıyor, kablo değiştirildi. Bozuk olan bilgisayar: \"Der ist kaputt\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "Dieser Teil hat zwei Aufgaben. Sie füllen ein Formular aus und schreiben eine kurze Nachricht.",
      instructionTr: "Bu bölümde iki görev var: bir form dolduracak ve kısa bir ileti yazacaksın.",
      tasks: [
        {
          id: "de-a1-01-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Freundin Amina Sarr meldet ihren Sohn für einen Schwimmkurs an. Ihr Sohn ist sieben Jahre alt. Familie Sarr wohnt in der Lindenstraße 8, 04277 Leipzig. Der Kurs soll am Samstag sein. Frau Sarr bezahlt mit Karte, nicht bar. Im Formular fehlen fünf Informationen. Schreiben Sie sie in die Lücken.",
          promptTr:
            "Arkadaşın Amina Sarr oğlunu yüzme kursuna yazdırıyor. Oğlu yedi yaşında. Aile Lindenstraße 8, 04277 Leipzig adresinde oturuyor. Kurs cumartesi olsun istiyor. Frau Sarr nakit değil kartla ödüyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung — Schwimmkurs für Kinder",
              body: `Familienname, Vorname:    Sarr, Amina
Alter des Kindes:         {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Leipzig
Kurstag:                  {{4}}
Zahlungsweise:            {{5}}
Unterschrift:             A. Sarr`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-01-s1-1",
              no: 1,
              text: "Alter des Kindes",
              accept: ["7", "7 Jahre", "sieben", "sieben Jahre"],
              explain: "Yönergede \"Ihr Sohn ist sieben Jahre alt\" geçiyor. Rakam da yazı da kabul edilir.",
            },
            {
              kind: "gap",
              id: "de-a1-01-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Lindenstraße 8", "Lindenstrasse 8", "Lindenstr. 8"],
              explain: "Adres yönergede tam veriliyor. Sokak adı ve kapı numarası birlikte yazılır; `-straße` kısaltması da doğrudur.",
            },
            {
              kind: "gap",
              id: "de-a1-01-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["04277", "4277"],
              explain: "Posta kodu beş hanelidir ve baştaki sıfırla yazılır: 04277.",
            },
            {
              kind: "gap",
              id: "de-a1-01-s1-4",
              no: 4,
              text: "Kurstag",
              accept: ["Samstag", "am Samstag", "Sonnabend"],
              explain: "\"Der Kurs soll am Samstag sein\" — kurs günü cumartesi. `Sonnabend` kuzey Almanya'da aynı günün adıdır.",
            },
            {
              kind: "gap",
              id: "de-a1-01-s1-5",
              no: 5,
              text: "Zahlungsweise",
              accept: ["Karte", "mit Karte", "EC-Karte", "Kartenzahlung"],
              explain: "\"bezahlt mit Karte, nicht bar\" — ödeme şekli kart. `bar` yazmak yönergeye aykırı olur.",
            },
          ],
        },
        {
          id: "de-a1-01-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie möchten im Juli nach Hamburg fahren. Schreiben Sie an die Touristeninformation. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Temmuzda Hamburg'a gitmek istiyorsun. Turizm danışmasına yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Bitten Sie um Informationen über Museen und Konzerte.", tr: "Müzeler ve konserler hakkında bilgi iste." },
              { de: "Fragen Sie nach günstigen Hotels.", tr: "Uygun fiyatlı otelleri sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

im Juli komme ich nach Hamburg. Bitte schicken Sie mir Informationen über Museen und Konzerte. Können Sie mir auch günstige Hotels nennen?

Vielen Dank und freundliche Grüße
Ana Ferreira`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? (Sehr geehrte Damen und Herren … / Mit freundlichen Grüßen …)",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Cümleler anlaşılıyor mu? A1'de birkaç hata cümlenin anlaşılmasını engellemiyorsa sorun değil.",
              "Resmî hitapta `Sie` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: sich vorstellen, um Informationen bitten, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: kendini tanıtma, bilgi isteme, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-01-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Stellen Sie sich vor. Sprechen Sie zu den Stichwörtern: Name — Alter — Land — Wohnort — Sprachen — Beruf — Hobby.",
          promptTr: "Kendini tanıt. Şu anahtar sözcüklere göre konuş: ad — yaş — ülke — yaşadığın yer — diller — meslek — hobi.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Name und Alter", tr: "Ad ve yaş" },
              { de: "Land und Wohnort", tr: "Ülke ve yaşanılan yer" },
              { de: "Sprachen und Beruf", tr: "Diller ve meslek" },
              { de: "ein Hobby", tr: "Bir hobi" },
            ],
            sample:
              "Ich heiße Elif Demir. Ich bin dreiundzwanzig Jahre alt und komme aus der Türkei. Jetzt wohne ich in Leipzig. Ich spreche Türkisch, Englisch und ein bisschen Deutsch. Ich bin Krankenpflegerin. In meiner Freizeit schwimme ich gern.",
            criteria: [
              "Yedi anahtar sözcüğün her birine değinildi mi?",
              "Cümleler kısa ve tam mı? A1'de \"Ich heiße …\", \"Ich komme aus …\" kalıpları yeterli.",
              "Sayılar (yaş) doğru söylendi mi?",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "de-a1-01-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Einkaufen. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Supermarkt — Brot — Preis — Samstag — Tasche.",
          promptTr:
            "Konu: Alışveriş. Her anahtar sözcük için bir soru kur ve cevapla: market — ekmek — fiyat — cumartesi — çanta.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Wir sprechen jetzt über das Thema Einkaufen. Ihr erstes Stichwort ist: Supermarkt. Stellen Sie mir bitte eine Frage.", tr: "Şimdi alışveriş konusunu konuşuyoruz. İlk sözcüğün: market. Bana bir soru sor." },
            { who: "you", hint: "«Supermarkt» sözcüğüyle bir soru kur.", expect: "Supermarkt sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "Der Supermarkt in unserer Straße hat bis zwanzig Uhr geöffnet. Ihr nächstes Stichwort ist: Brot.", tr: "Sokağımızdaki market akşam sekize kadar açık. Sıradaki sözcüğün: ekmek." },
            { who: "you", hint: "«Brot» için bir soru kur.", expect: "Brot sözcüğüyle bir soru kurmak", seconds: 25 },
            { who: "partner", de: "Ich kaufe fast jeden Tag frisches Brot. Und jetzt eine Frage an Sie: Wie oft gehen Sie einkaufen?", tr: "Neredeyse her gün taze ekmek alıyorum. Şimdi sana bir soru: Ne sıklıkla alışverişe gidiyorsun?" },
            { who: "you", hint: "Soruyu cevapla — ne sıklıkla alışverişe gidiyorsun?", expect: "sıklık bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            { who: "partner", de: "Danke. Letzte Frage: Was kostet bei Ihnen ein Kilo Äpfel?", tr: "Teşekkürler. Son soru: Sizde bir kilo elma kaç para?" },
            { who: "you", hint: "Bir fiyat söyle.", expect: "bir fiyatı Almanca söylemek (Euro ve Cent)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wo ist der Supermarkt? — Der Supermarkt ist in der Bahnhofstraße. Kaufst du Brot? — Ja, ich kaufe jeden Tag Brot. Was kostet das Brot? — Es kostet zwei Euro fünfzig. Gehst du am Samstag einkaufen? — Ja, am Samstag um zehn. Hast du eine Tasche? — Nein, ich brauche eine Tasche.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve saat gibi sayılar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-01-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie brauchen einen Stift. — Sie möchten das Fenster öffnen. — Jemand bittet Sie um Ihr Wörterbuch.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Kaleme ihtiyacın var. — Pencereyi açmak istiyorsun. — Biri senden sözlüğünü istiyor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Wir üben jetzt Bitten. Erste Situation: Sie brauchen einen Stift. Bitten Sie mich darum.", tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Kaleme ihtiyacın var. Benden iste." },
            { who: "you", hint: "Kalem iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Kannst du … / Können Sie … bitte)", seconds: 20 },
            { who: "partner", de: "Ja, gern, hier bitte. Zweite Situation: Sie möchten das Fenster öffnen. Fragen Sie mich.", tr: "Tabii, buyur. İkinci durum: Pencereyi açmak istiyorsun. Bana sor." },
            { who: "you", hint: "Pencereyi açmak için izin iste.", expect: "izin sormak (Darf ich … / Kann ich …)", seconds: 20 },
            { who: "partner", de: "Natürlich, machen Sie das. Jetzt bitte ich Sie um etwas: Können Sie mir bitte Ihr Wörterbuch geben?", tr: "Elbette, aç. Şimdi ben senden bir şey rica ediyorum: Sözlüğünü bana verebilir misin?" },
            { who: "you", hint: "Ricaya karşılık ver: kabul et ya da kısa bir gerekçeyle reddet.", expect: "bir ricaya kabul ya da gerekçeli ret ile karşılık vermek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Kannst du mir bitte einen Stift geben? — Ja, gern, hier bitte. Darf ich das Fenster öffnen? — Ja, natürlich. Gibst du mir bitte dein Wörterbuch? — Tut mir leid, ich brauche es gerade. In zehn Minuten gebe ich es dir.",
            criteria: [
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu? (Kannst du … / Darf ich … / Können Sie …)",
              "Gelen ricaya hem olumlu hem olumsuz karşılık verilebiliyor mu?",
              "Olumsuz cevap kısa bir gerekçeyle yumuşatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
