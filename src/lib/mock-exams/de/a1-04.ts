import type { MockPaper } from "../types";

/**
 * A1 · Deneme 4 — "Essen, Feste und Freunde".
 *
 * PLAN kâğıt 1–3 ile birebir aynı; değişen yalnız konu alanı.
 *
 *   Lesen  25 dk · 15 madde
 *     Teil 1  5  Richtig/Falsch   davet e-postası + sokak şenliği ilanı (detail)
 *     Teil 2  5  iki şıklı seçme  ilan — hangisi bana uyar (orientation)
 *     Teil 3  5  Richtig/Falsch   levha/duyuru — kural okuma (instruction)
 *   Hören  20 dk · 15 madde
 *     Teil 1  6  üç şıklı seçme   kısa konuşma, iki kez (detail)
 *     Teil 2  4  Richtig/Falsch   anons, bir kez (instruction)
 *     Teil 3  5  üç şıklı seçme   telefon/kısa konuşma, iki kez (detail)
 *   Schreiben 20 dk  form doldurma (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk  kutlama anlatma · konu sorusu kurma · rica etme
 *
 * KONU SEÇİMİ: yemek ve davet, A1'de sayının (adet, fiyat, saat) ve kabul-ret
 * kalıplarının birlikte ölçülebildiği ender alanlardan biri. Kâğıdın yazma
 * görevi de bu yüzden bir daveti nazikçe geri çevirmeye dayanıyor.
 */
export const A1_04: MockPaper = {
  id: "de-a1-04",
  course: "de",
  level: "A1",
  no: 4,
  theme: "Essen, Feste und Freunde",
  themeTr: "Yemek, kutlamalar ve arkadaşlar",
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
          id: "de-a1-04-l1",
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
              title: "Von: kemal.d@mail.de",
              body: `Hallo Marta,

am Samstag habe ich Geburtstag. Wir feiern bei mir ab 18 Uhr.

Ich koche eine große Suppe. Bring bitte nichts mit!

Meine Wohnung ist im vierten Stock. Der Aufzug ist leider klein.

Sag mir bis Donnerstag Bescheid, okay?

Viele Grüße
Kemal`,
              gloss: [
                { de: "feiern", tr: "kutlamak", en: "to celebrate" },
                { de: "Bescheid sagen", tr: "haber vermek", en: "to let someone know" },
                { de: "der Aufzug", tr: "asansör", en: "lift" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Viertel",
              genreTr: "Mahalledeki duyuru",
              title: "STRASSENFEST IN DER LINDENGASSE",
              body: `Sonntag, 14. Juni, ab 12 Uhr

Kuchen und Kaffee gibt es umsonst.
Für Würstchen zahlen Sie 2 Euro.

Am Nachmittag spielt eine Band.

Bei Regen fällt das Fest aus.`,
              gloss: [
                { de: "umsonst", tr: "bedava", en: "free of charge" },
                { de: "ausfallen", tr: "iptal olmak", en: "to be cancelled" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-04-l1-1",
              no: 1,
              ref: "t1",
              text: "Marta soll etwas zu essen mitbringen.",
              answer: false,
              explain:
                "E-postada \"Bring bitte nichts mit!\" yazıyor. Kemal çorbayı kendi pişiriyor, yani misafirden yiyecek beklenmiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l1-2",
              no: 2,
              ref: "t1",
              text: "Kemal wohnt nicht im Erdgeschoss.",
              answer: true,
              explain:
                "Daire \"im vierten Stock\", yani dördüncü katta. Asansörün küçük olduğu uyarısı da katın yüksek olduğunu doğruluyor.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l1-3",
              no: 3,
              ref: "t1",
              text: "Marta antwortet bis Donnerstag.",
              answer: true,
              explain:
                "\"Sag mir bis Donnerstag Bescheid\" — cevap için son gün perşembe. Parti cumartesi, ama sorulan tarih cevabın tarihi.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l1-4",
              no: 4,
              ref: "t2",
              text: "Der Kaffee kostet nichts.",
              answer: true,
              explain:
                "\"Kuchen und Kaffee gibt es umsonst\" — kahve bedava. Para istenen tek şey sosis ve o da 2 euro.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l1-5",
              no: 5,
              ref: "t2",
              text: "Bei Regen feiert man in der Halle.",
              answer: false,
              explain:
                "İlan \"Bei Regen fällt das Fest aus\" diyor: yağmurda şenlik iptal. Kapalı bir mekândan hiç söz edilmiyor.",
            },
          ],
        },
        {
          id: "de-a1-04-l2",
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
              id: "de-a1-04-l2-6",
              no: 6,
              text: "Sie möchten am Sonntagmittag mit Freunden essen gehen.",
              options: [
                "Gasthaus Anker\nSonntag Ruhetag\nMo–Sa 17–23 Uhr\nTische bitte reservieren",
                "Restaurant Olive\nSonntag Mittagsbuffet 12–15 Uhr\nKinder bis 6 Jahre frei\nTelefon 0511 44 32 10",
              ],
              answer: 1,
              explain:
                "Pazar öğlen aranıyor. (b) `Sonntag Mittagsbuffet 12–15 Uhr` diyor. (a) pazar günü kapalı ve hafta içi de ancak akşam 17'de açılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-l2-7",
              no: 7,
              text: "Sie suchen eine Torte für den Geburtstag Ihrer Tochter.",
              options: [
                "Bäckerei Stern\nTorten auf Bestellung\nbitte drei Tage vorher\nMo–Sa 6–18 Uhr",
                "Metzgerei Stern\nWurst und Fleisch aus der Region\nMittagstisch 11–14 Uhr\nMo–Fr 7–18 Uhr",
              ],
              answer: 0,
              explain:
                "Doğum günü pastası aranıyor. (a) `Torten auf Bestellung` diyor. (b) kasap; adı aynı olduğu için yalnız isme bakmak yetmiyor, satılan şeye bakmak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-l2-8",
              no: 8,
              text: "Sie brauchen für ein Fest zwanzig Stühle.",
              options: [
                "Möbelhaus Reich\nSofas und Betten günstig\nLieferung in die Wohnung\ntäglich 10–20 Uhr",
                "Festservice Kroll\nTische, Stühle und Gläser mieten\nab 10 Stück\nAbholung Mo–Sa",
              ],
              answer: 1,
              explain:
                "Yirmi sandalye kısa süreliğine gerekiyor. (b) `Stühle ... mieten` diyor ve alt sınır 10 adet. (a) mobilya satıyor, kiralamıyor; sandalye de listesinde yok.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-l2-9",
              no: 9,
              text: "Sie essen kein Fleisch und suchen ein Lokal.",
              options: [
                "Café Grün\nnur vegetarische Küche\nSuppen, Salate, Aufläufe\nMi–So ab 12 Uhr",
                "Grill am Park\nSteaks und Burger\nauch zum Mitnehmen\ntäglich 11–22 Uhr",
              ],
              answer: 0,
              explain:
                "Etsiz bir yer aranıyor. (a) `nur vegetarische Küche` diyor. (b) menüsü tamamen etten oluşuyor; her gün açık olması işe yaramıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-l2-10",
              no: 10,
              text: "Sie möchten kochen lernen und suchen einen Kurs.",
              options: [
                "Volkshochschule\nKochkurs für Anfänger\nsechs Abende, Start 3. März\nAnmeldung im Büro",
                "Küchenstudio Weber\nneue Küchen planen und einbauen lassen\nBeratung nur nach Termin\nMo–Fr 9–18 Uhr",
              ],
              answer: 0,
              explain:
                "Yemek kursu aranıyor. (a) `Kochkurs für Anfänger` diyor ve altı akşam sürüyor. (b) mutfak satıyor; `Küche` sözcüğü geçse de ders vermiyor.",
            },
          ],
        },
        {
          id: "de-a1-04-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild am Restaurant",
              genreTr: "Restoran kapısındaki levha",
              body: `Heute Ruhetag.

Ab Donnerstag sind wir wieder für Sie da.

Reservierungen per Telefon: 0341 55 20 11`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Aushang im Hausflur",
              genreTr: "Apartman girişindeki duyuru",
              body: `LIEBE NACHBARN

Am Freitag feiern wir in Wohnung 2 A.

Es kann bis 22 Uhr etwas lauter werden.

Danach machen wir die Musik aus.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Schild im Park",
              genreTr: "Parktaki levha",
              body: `GRILLEN

Grillen ist nur auf dem Platz hinter dem See erlaubt.

Bitte nehmen Sie Ihren Müll wieder mit.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Zettel in der Gemeinschaftsküche",
              genreTr: "Ortak mutfaktaki not",
              body: `Bitte das Geschirr sofort abwaschen.

Essen im Kühlschrank bitte mit Namen.

Am Sonntag putzt Zimmer 5.`,
            },
            {
              kind: "text",
              id: "s5",
              genre: "Schild in der Bäckerei",
              genreTr: "Fırındaki levha",
              body: `Brot vom Vortag: halber Preis

Nur solange der Vorrat reicht.

Wir backen täglich ab 5 Uhr.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-04-l3-11",
              no: 11,
              ref: "s1",
              text: "Sie können heute im Restaurant essen.",
              answer: false,
              explain:
                "Levhada \"Heute Ruhetag\" yazıyor: bugün kapalı. Tekrar açılış perşembe; telefon numarası yalnız rezervasyon için.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l3-12",
              no: 12,
              ref: "s2",
              text: "Nach 22 Uhr ist die Musik aus.",
              answer: true,
              explain:
                "Duyuru gürültünün \"bis 22 Uhr\" süreceğini, sonrasında müziğin kapatılacağını söylüyor. Yani 22'den sonra sessizlik var.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l3-13",
              no: 13,
              ref: "s3",
              text: "Sie dürfen überall im Park grillen.",
              answer: false,
              explain:
                "Levha izni bir yerle sınırlıyor: \"nur auf dem Platz hinter dem See\". `nur` sözcüğü kuralın tamamını değiştiriyor.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l3-14",
              no: 14,
              ref: "s4",
              text: "Ihr Essen im Kühlschrank braucht einen Namen.",
              answer: true,
              explain:
                "Notta \"Essen im Kühlschrank bitte mit Namen\" yazıyor. Yani buzdolabına konan yiyeceğin üstünde ad olmalı.",
            },
            {
              kind: "bool",
              id: "de-a1-04-l3-15",
              no: 15,
              ref: "s5",
              text: "Frisches Brot kostet halb so viel.",
              answer: false,
              explain:
                "Yarı fiyat yalnız \"Brot vom Vortag\" için geçerli, yani dünkü ekmek için. Taze ekmek her gün saat 5'ten itibaren pişiyor ve indirimli değil.",
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
          id: "de-a1-04-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch im Restaurant",
              genreTr: "Restoranda konuşma",
              situation: "Bir müşteri sipariş veriyor.",
              plays: 2,
              segments: [
                { speaker: "Kellner", text: "Was möchten Sie trinken?" },
                { speaker: "Gast", text: "Einen Apfelsaft, bitte. Ohne Eis." },
                { speaker: "Kellner", text: "Gern. Und zu essen?" },
                { speaker: "Gast", text: "Erst später, danke." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Biri partiye ne zaman geleceğini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Lena", text: "Kommst du am Samstag zu meinem Fest?" },
                { speaker: "Ben", text: "Samstag muss ich arbeiten. Aber ich komme später, so gegen neun." },
                { speaker: "Lena", text: "Super, das reicht." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch beim Bäcker",
              genreTr: "Fırında konuşma",
              situation: "Bir müşteri siparişini düzeltiyor.",
              plays: 2,
              segments: [
                { speaker: "Verkäuferin", text: "Vier Brötchen, richtig?" },
                { speaker: "Kunde", text: "Nein, sechs bitte. Und ein Brot." },
                { speaker: "Verkäuferin", text: "Sechs Brötchen und ein Brot. Das macht vier Euro zwanzig." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch zu Hause",
              genreTr: "Evde konuşma",
              situation: "Bir çocuk akşam ne yeneceğini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Sohn", text: "Was kochst du heute?" },
                { speaker: "Mutter", text: "Nudeln mit Gemüse. Fleisch haben wir nicht mehr." },
                { speaker: "Sohn", text: "Gut. Ich habe großen Hunger." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch auf dem Markt",
              genreTr: "Pazarda konuşma",
              situation: "Bir müşteri fiyatın yarın ne olacağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Verkäufer", text: "Die Erdbeeren kosten heute drei Euro." },
                { speaker: "Kundin", text: "Und morgen?" },
                { speaker: "Verkäufer", text: "Morgen sind sie teurer. Heute ist Markttag." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch im Café",
              genreTr: "Kafede konuşma",
              situation: "İki arkadaş ikinci siparişi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Freundin", text: "Nehmen wir noch einen Kuchen?" },
                { speaker: "Freund", text: "Ich nicht, ich bin satt. Aber einen Tee gern." },
                { speaker: "Freundin", text: "Gut, zwei Tee dann." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-04-h1-1",
              no: 1,
              ref: "a1",
              text: "Was bestellt der Gast jetzt?",
              options: ["Eine Suppe.", "Ein Wasser mit Eis.", "Einen Apfelsaft."],
              answer: 2,
              explain:
                "Şu an ısmarlanan tek şey elma suyu; yemek için \"Erst später\" diyor. Buz açıkça istenmiyor (\"Ohne Eis\"), çorba ise hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h1-2",
              no: 2,
              ref: "a2",
              text: "Wann kommt Ben zum Fest?",
              options: ["Gegen neun Uhr.", "Er kommt gar nicht.", "Am Sonntag."],
              answer: 0,
              explain:
                "Ben cumartesi çalışıyor ama gelmiyorum demiyor: \"ich komme später, so gegen neun\". Yani geç geliyor; pazar hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h1-3",
              no: 3,
              ref: "a3",
              text: "Wie viele Brötchen kauft der Kunde?",
              options: ["Vier.", "Sechs.", "Zwanzig."],
              answer: 1,
              explain:
                "Satıcı dört diyor, müşteri düzeltiyor: altı. 20 sayısı fiyattan geliyor (\"vier Euro zwanzig\"), adetten değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h1-4",
              no: 4,
              ref: "a4",
              text: "Was gibt es heute zu essen?",
              options: ["Fleisch mit Reis und Salat.", "Eine große Suppe.", "Nudeln mit Gemüse."],
              answer: 2,
              explain:
                "Anne makarna ve sebze pişiriyor; et için \"haben wir nicht mehr\" diyor. Çorbadan bu kayıtta hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h1-5",
              no: 5,
              ref: "a5",
              text: "Wann sind die Erdbeeren günstiger?",
              options: ["Heute.", "Morgen.", "Am Wochenende."],
              answer: 0,
              explain:
                "Bugünkü fiyat üç euro ve satıcı \"Morgen sind sie teurer\" diyor. Yani ucuz olan gün bugün; hafta sonu hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h1-6",
              no: 6,
              ref: "a6",
              text: "Was nimmt der Freund noch?",
              options: ["Einen Kuchen.", "Einen Tee.", "Nichts mehr."],
              answer: 1,
              explain:
                "Arkadaş pasta istemiyor çünkü doymuş, ama \"einen Tee gern\" diyor. Bu yüzden hiçbir şey almıyor şıkkı da yanlış.",
            },
          ],
        },
        {
          id: "de-a1-04-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Supermarkt",
              genreTr: "Market anonsu",
              situation: "Günlük indirim duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, heute gibt es frische Erdbeeren zum halben Preis. Das Angebot gilt nur bis achtzehn Uhr. Sie finden die Erdbeeren am Eingang.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage auf dem Straßenfest",
              genreTr: "Sokak şenliğinde anons",
              situation: "Konserin başlama saati duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, das Konzert beginnt in einer halben Stunde auf der großen Bühne. Bitte stellen Sie Ihre Fahrräder nicht vor den Eingang.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage im Zug",
              genreTr: "Trende anons",
              situation: "Trende yeme içme imkânı duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Sehr geehrte Fahrgäste, das Bordrestaurant im Wagen sechs ist heute geschlossen. Getränke bekommen Sie am Automaten im Wagen vier.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage in der Kantine",
              genreTr: "Yemekhanede anons",
              situation: "Kapanış ve kalan yemekler duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, wir schließen um vierzehn Uhr. Das warme Essen ist leider aus. Suppe und Salat gibt es noch.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-04-h2-7",
              no: 7,
              ref: "d1",
              text: "Die Erdbeeren sind den ganzen Tag günstig.",
              answer: false,
              explain:
                "Anonsta \"Das Angebot gilt nur bis achtzehn Uhr\" deniyor. Yani indirim akşam 18'de bitiyor, gün boyu sürmüyor.",
            },
            {
              kind: "bool",
              id: "de-a1-04-h2-8",
              no: 8,
              ref: "d2",
              text: "Das Konzert beginnt bald.",
              answer: true,
              explain:
                "Anons konserin \"in einer halben Stunde\" başlayacağını söylüyor. Yarım saat, `bald` sayılır; konser henüz başlamamış.",
            },
            {
              kind: "bool",
              id: "de-a1-04-h2-9",
              no: 9,
              ref: "d3",
              text: "Sie können im Zug etwas zu trinken kaufen.",
              answer: true,
              explain:
                "Vagon altıdaki restoran kapalı, ama \"Getränke bekommen Sie am Automaten im Wagen vier\" deniyor. Yani içecek almak mümkün.",
            },
            {
              kind: "bool",
              id: "de-a1-04-h2-10",
              no: 10,
              ref: "d4",
              text: "Es gibt noch warmes Essen.",
              answer: false,
              explain:
                "Anons \"Das warme Essen ist leider aus\" diyor. Geriye yalnız çorba ve salata kalıyor, sıcak yemek kalmıyor.",
            },
          ],
        },
        {
          id: "de-a1-04-h3",
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
              situation: "Bir arkadaş plan değişikliğini bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo, hier ist Ela. Das Essen am Freitag verschiebt sich auf Samstag. Der Ort bleibt gleich. Bis dann!",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Gespräch beim Einkaufen",
              genreTr: "Alışverişte konuşma",
              situation: "İki kişi ne alacaklarına karar veriyor.",
              plays: 2,
              segments: [
                { speaker: "Nils", text: "Nehmen wir Käse oder Wurst?" },
                { speaker: "Ida", text: "Käse. Sarah isst kein Fleisch." },
                { speaker: "Nils", text: "Stimmt. Dann zwei Stück Käse." },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Gespräch im Restaurant",
              genreTr: "Restoranda konuşma",
              situation: "Bir müşteri şikâyet ediyor.",
              plays: 2,
              segments: [
                { speaker: "Gast", text: "Die Suppe ist leider kalt." },
                { speaker: "Kellner", text: "Das tut mir leid. Ich bringe Ihnen eine neue." },
                { speaker: "Gast", text: "Danke, das ist nett." },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "Kaç kişi geleceği konuşuluyor.",
              plays: 2,
              segments: [
                { speaker: "Onkel", text: "Wie viele Leute kommen am Sonntag?" },
                { speaker: "Nichte", text: "Wir sind acht. Zwei können nicht." },
                { speaker: "Onkel", text: "Also acht. Ich kaufe genug ein." },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Gespräch nach dem Fest",
              genreTr: "Kutlamadan sonra konuşma",
              situation: "Bir arkadaş partiyi değerlendiriyor.",
              plays: 2,
              segments: [
                { speaker: "Tom", text: "War das Fest schön?" },
                { speaker: "Rana", text: "Ja, sehr. Nur die Musik war zu laut." },
                { speaker: "Tom", text: "Und das Essen?" },
                { speaker: "Rana", text: "Das Essen war super." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-04-h3-11",
              no: 11,
              ref: "m1",
              text: "Was ist neu?",
              options: ["Der Tag.", "Der Ort.", "Die Uhrzeit."],
              answer: 0,
              explain:
                "Yemek cumadan cumartesiye alınıyor, yani değişen gün. Mesaj \"Der Ort bleibt gleich\" diyor ve saatten hiç söz etmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h3-12",
              no: 12,
              ref: "m2",
              text: "Warum kaufen die beiden Käse?",
              options: ["Käse ist billiger.", "Eine Freundin isst kein Fleisch.", "Die Wurst ist heute schon ausverkauft."],
              answer: 1,
              explain:
                "Sebep açıkça söyleniyor: \"Sarah isst kein Fleisch\". Fiyat da sosisin bitmiş olması da kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h3-13",
              no: 13,
              ref: "m3",
              text: "Was macht der Kellner?",
              options: ["Er bringt eine neue Suppe.", "Er nimmt kein Geld für die Suppe.", "Er ruft den Koch."],
              answer: 0,
              explain:
                "Garson \"Ich bringe Ihnen eine neue\" diyor. Özür dilemesi bir çözüm sunmasının yerine geçmiyor; para ve aşçı hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h3-14",
              no: 14,
              ref: "m4",
              text: "Wie viele Personen kommen?",
              options: ["Zwei.", "Acht.", "Zehn."],
              answer: 1,
              explain:
                "Gelen kişi sayısı sekiz; ayrıca iki kişi gelemiyor. 10 sayısı sekiz artı iki toplamı olduğu için tuzak, kayıtta söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-04-h3-15",
              no: 15,
              ref: "m5",
              text: "Was hat Rana nicht gefallen?",
              options: ["Das Essen.", "Die Gäste.", "Die Musik."],
              answer: 2,
              explain:
                "Rana yemeği \"super\" buluyor; tek şikâyeti müziğin çok yüksek olması. Misafirlerden hiç söz edilmiyor.",
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
          id: "de-a1-04-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Freundin Lea Novak möchte auf dem Straßenfest einen Kuchenstand machen. Sie helfen ihr bei der Anmeldung. Lea wohnt in der Lindengasse 7 in 04109 Leipzig. Ihre Telefonnummer ist 0341 66 24 08. Sie bringt zehn Kuchen mit und braucht einen Tisch. Füllen Sie das Formular aus.",
          promptTr:
            "Arkadaşın Lea Novak sokak şenliğinde pasta standı açmak istiyor. Kayıtta ona yardım ediyorsun. Lea, Lindengasse 7, 04109 Leipzig adresinde oturuyor. Telefonu 0341 66 24 08. On pasta getirecek ve bir masaya ihtiyacı var. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung — Straßenfest Lindengasse",
              body: `Familienname, Vorname:    Novak, Lea
Straße, Hausnummer:       {{1}}
PLZ, Ort:                 {{2}} Leipzig
Telefon:                  {{3}}
Was bringen Sie mit?      {{4}}
Brauchen Sie einen Tisch? {{5}}
Unterschrift:             L. Novak`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-04-s1-1",
              no: 1,
              text: "Straße, Hausnummer",
              accept: ["Lindengasse 7", "Lindengasse Nr. 7"],
              explain:
                "Adres yönergede tam veriliyor: Lindengasse 7. Sokak adı ve kapı numarası aynı satıra, numara sona yazılır.",
            },
            {
              kind: "gap",
              id: "de-a1-04-s1-2",
              no: 2,
              text: "PLZ",
              accept: ["04109", "4109"],
              explain:
                "Yönergedeki adres \"in 04109 Leipzig\" biçiminde. Posta kodu beş hanelidir ve baştaki sıfır yazılır; şehir adı formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-04-s1-3",
              no: 3,
              text: "Telefon",
              accept: ["0341 66 24 08", "0341662408", "0341 662408", "0341/66 24 08"],
              explain:
                "Telefon numarası yönergede veriliyor: 0341 66 24 08. Boşluklar ya da eğik çizgi fark etmez, rakamların sırası önemlidir.",
            },
            {
              kind: "gap",
              id: "de-a1-04-s1-4",
              no: 4,
              text: "Was bringen Sie mit?",
              accept: ["Kuchen", "zehn Kuchen", "10 Kuchen", "Kuchen (10)"],
              explain:
                "\"Sie bringt zehn Kuchen mit\" — getirilen şey pasta. Adet yazmak da doğrudur, ama bu satırda asıl istenen ürünün kendisi.",
            },
            {
              kind: "gap",
              id: "de-a1-04-s1-5",
              no: 5,
              text: "Brauchen Sie einen Tisch?",
              accept: ["ja", "ja, bitte", "ja einen", "einen"],
              explain:
                "Yönergede \"braucht einen Tisch\" deniyor, yani cevap evet. Bu satır bir soru sorduğu için tek sözcüklü cevap yeterli.",
            },
          ],
        },
        {
          id: "de-a1-04-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Lea hat Sie zu ihrem Geburtstag eingeladen. Sie können nicht kommen. Schreiben Sie ihr eine kurze Nachricht. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Arkadaşın Lea seni doğum gününe çağırdı. Gidemiyorsun. Ona kısa bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Danken Sie für die Einladung.", tr: "Davet için teşekkür et." },
              { de: "Sagen Sie, warum Sie nicht kommen.", tr: "Neden gelemediğini söyle." },
              { de: "Machen Sie einen neuen Vorschlag.", tr: "Yeni bir öneri sun." },
            ],
            sample: `Liebe Lea,

vielen Dank für die Einladung! Leider kann ich am Samstag nicht kommen, denn ich arbeite bis zweiundzwanzig Uhr. Ich wünsche dir ein schönes Fest. Wollen wir am Sonntag zusammen Kaffee trinken?

Liebe Grüße
Yusuf`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Arkadaşa yazıldığı için `Liebe …` ve `Liebe Grüße` uygun.",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Reddetme kibar mı? `Leider` ile yumuşatmak A1'de beklenen kalıptır.",
              "Arkadaşa yazıldığı için `du` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: von einem Fest erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: bir kutlamayı anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-04-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von einem Fest in Ihrer Familie. Sprechen Sie zu den Stichwörtern: Fest — wann — wer kommt — Essen — Musik — Geschenke.",
          promptTr:
            "Ailende kutlanan bir bayramı ya da özel günü anlat. Şu anahtar sözcüklere göre konuş: kutlama — ne zaman — kimler geliyor — yemek — müzik — hediyeler.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "das Fest nennen und einordnen", tr: "Kutlamayı adlandırmak ve ne zaman olduğunu söylemek" },
              { de: "Personen nennen", tr: "Kimlerin geldiğini söylemek" },
              { de: "Essen, Musik und Geschenke beschreiben", tr: "Yemek, müzik ve hediyelerden söz etmek" },
            ],
            sample:
              "Bei uns ist das Zuckerfest sehr wichtig. Es ist im Frühling und dauert drei Tage. Meine Eltern, meine Schwester und viele Nachbarn kommen. Wir essen Reis, Fleisch und süße Kekse. Meine Mutter macht Musik an. Die Kinder bekommen Geld und kleine Geschenke.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Zaman ifadesi verildi mi? (im Frühling, im Dezember, drei Tage …)",
              "Kişiler çoğul biçimde doğru söylendi mi? (meine Eltern, die Kinder)",
              "Cümleler kısa ve anlaşılır mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-04-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Essen und Trinken. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Frühstück — Restaurant — kochen — Getränk — Markt.",
          promptTr:
            "Konu: Yemek ve içecek. Her anahtar sözcük için bir soru kur ve cevapla: kahvaltı — restoran — yemek pişirmek — içecek — pazar.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Essen und Trinken. Ihr erstes Stichwort ist: Frühstück. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi yemek ve içecek konusunu konuşuyoruz. İlk sözcüğün: kahvaltı. Bana bir soru sor.",
            },
            { who: "you", hint: "«Frühstück» sözcüğüyle bir soru kur.", expect: "Frühstück sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich frühstücke meistens um sieben. Ihr nächstes Stichwort ist: Restaurant.",
              tr: "Genelde saat yedide kahvaltı ederim. Sıradaki sözcüğün: restoran.",
            },
            { who: "you", hint: "«Restaurant» için bir soru kur.", expect: "Restaurant sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich gehe einmal im Monat ins Restaurant. Und jetzt eine Frage an Sie: Kochen Sie gern?",
              tr: "Ayda bir kez restorana giderim. Şimdi sana bir soru: Yemek pişirmeyi sever misin?",
            },
            { who: "you", hint: "Soruyu cevapla — yemek pişirmeyi seviyor musun?", expect: "beğeni bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was trinken Sie zum Frühstück?",
              tr: "Teşekkürler. Son soru: Kahvaltıda ne içersin?",
            },
            { who: "you", hint: "Bir içecek söyle.", expect: "bir içeceği belirtili biçimde söylemek (einen Tee, einen Kaffee …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Was isst du zum Frühstück? — Brot mit Käse. Gehst du oft ins Restaurant? — Nein, nur am Wochenende. Kochst du gern? — Ja, sehr gern. Was trinkst du gern? — Ich trinke gern Tee. Wo kaufst du Obst? — Auf dem Markt am Samstag.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "`gern` ile beğeni ifade edilebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-04-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie brauchen einen Stuhl mehr. — Sie möchten die Rechnung. — Jemand bittet Sie um das Salz.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Bir sandalye daha gerekiyor. — Hesabı istiyorsun. — Biri senden tuzu istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Am Tisch fehlt ein Stuhl. Bitten Sie mich darum.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Masada bir sandalye eksik. Benden iste.",
            },
            { who: "you", hint: "Bir sandalye iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Können Sie … / Könnten wir … bitte)", seconds: 20 },
            {
              who: "partner",
              de: "Ja, gern, ich bringe einen. Zweite Situation: Sie möchten jetzt zahlen. Sagen Sie es mir.",
              tr: "Tabii, hemen getiriyorum. İkinci durum: Şimdi ödemek istiyorsun. Bunu bana söyle.",
            },
            { who: "you", hint: "Hesabı iste.", expect: "hesap istemek için kibar bir kalıp kullanmak (Die Rechnung, bitte / Können wir zahlen)", seconds: 20 },
            {
              who: "partner",
              de: "Natürlich, einen Moment. Jetzt bitte ich Sie um etwas: Geben Sie mir bitte das Salz?",
              tr: "Elbette, bir dakika. Şimdi ben senden bir şey rica ediyorum: Tuzu bana uzatır mısın?",
            },
            {
              who: "you",
              hint: "Ricaya karşılık ver: uzat ya da kısa bir gerekçeyle bekletmesini söyle.",
              expect: "bir ricaya kabul ya da gerekçeli erteleme ile karşılık vermek",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Können Sie uns bitte noch einen Stuhl bringen? — Ja, gern. Wir möchten zahlen, die Rechnung bitte. — Natürlich, einen Moment. Geben Sie mir bitte das Salz? — Ja, hier bitte. Brauchen Sie auch den Pfeffer?",
            criteria: [
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu? (Können Sie … / Könnten wir … / Darf ich …)",
              "Restoranda kullanılan hazır kalıplar biliniyor mu? (die Rechnung, bitte)",
              "Gelen ricaya doğal bir karşılık verildi mi?",
            ],
          },
        },
      ],
    },
  ],
};
