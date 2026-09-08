import type { MockPaper } from "../types";

/**
 * A1 · Deneme 7 — "Einkaufen und Post".
 *
 * PLAN kâğıt 1–6 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: alışveriş ve posta, A1 öğrencisinin ilk günden itibaren
 * kaçamadığı iki alan. İkisi de sayı, saat ve fiyat taşıyor; bu yüzden
 * dinleme bölümünün ağırlığı bilerek rakam ayrımına verildi — A1'de
 * "vierzehn achtzig" ile "fünfzehn achtzig" arasındaki farkı duymak
 * kelime bilgisinden önce gelen bir beceri.
 */
export const A1_07: MockPaper = {
  id: "de-a1-07",
  course: "de",
  level: "A1",
  no: 7,
  theme: "Einkaufen und Post",
  themeTr: "Alışveriş ve posta",
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
          id: "de-a1-07-l1",
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
              title: "Von: lina.gerber@mail.de",
              body: `Hallo Nadia,

dein Paket ist heute gekommen. Ich habe es für dich angenommen.

Ich bin bis 19 Uhr zu Hause. Danach fahre ich zu meiner Schwester.

Klingel bitte bei Gerber, zweiter Stock.

Morgen früh geht es nicht. Da muss ich um sieben zur Arbeit.

Liebe Grüße
Lina`,
              gloss: [
                { de: "annehmen", tr: "teslim almak", en: "to accept, take in" },
                { de: "klingeln", tr: "zil çalmak", en: "to ring the doorbell" },
                { de: "der Stock", tr: "kat", en: "floor, storey" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Supermarkt",
              genreTr: "Süpermarketteki duyuru",
              body: `Liebe Kundinnen und Kunden,

am Montag bleibt unser Markt geschlossen. Wir bekommen neue Regale.

Ab Dienstag sind wir wieder für Sie da, von 7 bis 21 Uhr.

Der Bäcker am Eingang hat auch am Montag offen.

Ihr Team vom Markt am Ring`,
              gloss: [
                { de: "das Regal", tr: "raf", en: "shelf" },
                { de: "der Bäcker", tr: "fırıncı", en: "baker" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-07-l1-1",
              no: 1,
              ref: "t1",
              text: "Lina ist am Abend bis sieben Uhr zu Hause.",
              answer: true,
              explain:
                "E-posta \"Ich bin bis 19 Uhr zu Hause\" diyor. Almancada öğleden sonraki saatler 13'ten 24'e kadar sayılır, yani 19 Uhr akşam yedi demek.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l1-2",
              no: 2,
              ref: "t1",
              text: "Nadia muss das Paket bei der Post abholen.",
              answer: false,
              explain:
                "Paket komşuda: \"Ich habe es für dich angenommen\". Postaneden söz eden tek bir cümle bile yok.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l1-3",
              no: 3,
              ref: "t1",
              text: "Lina wohnt im zweiten Stock.",
              answer: true,
              explain:
                "\"Klingel bitte bei Gerber, zweiter Stock\" — Lina'nın soyadı Gerber ve zili ikinci katta.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l1-4",
              no: 4,
              ref: "t2",
              text: "Der Markt ist am Montag offen.",
              answer: false,
              explain:
                "Duyurunun ilk cümlesi tersini söylüyor: \"am Montag bleibt unser Markt geschlossen\". Yalnız girişteki fırın o gün açık.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l1-5",
              no: 5,
              ref: "t2",
              text: "Ab Dienstag öffnet der Markt um sieben Uhr.",
              answer: true,
              explain:
                "\"Ab Dienstag sind wir wieder für Sie da, von 7 bis 21 Uhr\" — salıdan itibaren açılış saati 7.",
            },
          ],
        },
        {
          id: "de-a1-07-l2",
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
              id: "de-a1-07-l2-6",
              no: 6,
              text: "Sie möchten am Samstagvormittag ein Paket nach Polen schicken.",
              options: [
                "Postfiliale im Markt\nMo–Fr 9 bis 18 Uhr, Sa geschlossen\nPakete, Briefe und Briefmarken\nBeratung auch auf Englisch",
                "Paketshop am Ring\nMo–Sa 8 bis 20 Uhr\nPakete in alle Länder\nauch am Samstag offen",
              ],
              answer: 1,
              explain:
                "Cumartesi sabahı gerekiyor. (b) `Mo–Sa 8 bis 20 Uhr` diyor ve yurt dışına paket alıyor. (a) da paket kabul ediyor ama tam o gün kapalı: `Sa geschlossen`.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-l2-7",
              no: 7,
              text: "Sie brauchen am Sonntag Milch und Brot.",
              options: [
                "Supermarkt Nord\ntäglich 7 bis 22 Uhr\ngroße Auswahl und eigene Bäckerei\nSonntag und Feiertag geschlossen",
                "Kiosk am Bahnhof\njeden Tag von 6 bis 23 Uhr\nMilch, Brot und Getränke\nauch sonntags offen",
              ],
              answer: 1,
              explain:
                "Belirleyici olan gün. (b) `auch sonntags offen` diyor. (a) süt ve ekmeği de veriyor, hatta kendi fırını var, ama `Sonntag und Feiertag geschlossen`.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-l2-8",
              no: 8,
              text: "Sie haben eine Hose gekauft. Sie ist zu klein und Sie möchten Ihr Geld zurück.",
              options: [
                "Kleiderladen Fina\nUmtausch in vierzehn Tagen\nmit Kassenzettel\nMo–Sa 10 bis 19 Uhr",
                "Schneiderei am Markt\nwir ändern Ihre Kleidung\nHosen kürzen ab zwölf Euro\nin drei Tagen fertig, ohne Termin",
              ],
              answer: 0,
              explain:
                "Pantolon geri verilecek. (a) `Umtausch in vierzehn Tagen` diyor. (b) aynı pantolonla ilgilenir ama onu değiştirmez, sadece dikişini düzeltir.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-l2-9",
              no: 9,
              text: "Sie suchen Blumen für Ihre Nachbarin. Es ist schon 19 Uhr.",
              options: [
                "Blumen Aster\nMo–Fr 9 bis 18.30 Uhr\nSträuße nach Wunsch\nLieferung in der ganzen Stadt möglich",
                "Blumen am Bahnhof\ntäglich bis 21 Uhr\nfertige Sträuße ab 8 Euro\nauch am Wochenende",
              ],
              answer: 1,
              explain:
                "Saat 19 olduğu için tek ölçüt kapanış saati. (b) `täglich bis 21 Uhr` açık. (a) `18.30 Uhr`'de kapanmış oluyor, yarım saat geç kalınmış.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-l2-10",
              no: 10,
              text: "Sie möchten leere Flaschen zurückgeben und dafür Geld bekommen.",
              options: [
                "Getränkemarkt Süd\nLeergut Mo–Sa 8 bis 20 Uhr\nauch Kisten von anderen Läden\nGeld sofort an der Kasse",
                "Altglas-Container am Parkplatz\nhinter dem großen Markt\nbitte kein Papier hineinwerfen\nnicht nach 20 Uhr benutzen, es ist laut",
              ],
              answer: 0,
              explain:
                "Şişeler için para isteniyor. (a) `Geld sofort an der Kasse` diyor. (b) de şişe alıyor ama konteyner para vermez, cam orada yalnız toplanır.",
            },
          ],
        },
        {
          id: "de-a1-07-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild an der Kasse",
              genreTr: "Kasadaki levha",
              body: `Bitte legen Sie Ihre Waren einzeln auf das Band.

Karte erst ab zehn Euro.

Kleine Beträge bitte bar zahlen.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild am Paketautomaten",
              genreTr: "Paket otomatındaki levha",
              body: `Ihr Paket wartet drei Tage auf Sie.

Danach geht es zurück an den Absender.

Den Code finden Sie in Ihrer E-Mail.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-07-l3-11",
              no: 11,
              ref: "s1",
              text: "Man kann jeden Betrag mit Karte zahlen.",
              answer: false,
              explain:
                "Levhada bir alt sınır var: \"Karte erst ab zehn Euro\". On euronun altında kart geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l3-12",
              no: 12,
              ref: "s1",
              text: "Die Waren sollen einzeln auf das Band.",
              answer: true,
              explain:
                "İlk satır bunu istiyor: \"Bitte legen Sie Ihre Waren einzeln auf das Band\".",
            },
            {
              kind: "bool",
              id: "de-a1-07-l3-13",
              no: 13,
              ref: "s1",
              text: "Kleine Beträge zahlt man bar.",
              answer: true,
              explain:
                "Son satır bunu söylüyor: \"Kleine Beträge bitte bar zahlen\". Kart sınırının altındaki tutarlar nakit ödenir.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l3-14",
              no: 14,
              ref: "s2",
              text: "Das Paket bleibt eine Woche im Automaten.",
              answer: false,
              explain:
                "Levha \"Ihr Paket wartet drei Tage auf Sie\" diyor. Üç gün, bir hafta değil.",
            },
            {
              kind: "bool",
              id: "de-a1-07-l3-15",
              no: 15,
              ref: "s2",
              text: "Den Code bekommt man per E-Mail.",
              answer: true,
              explain:
                "\"Den Code finden Sie in Ihrer E-Mail\" — kod e-postayla geliyor, otomatta yazmıyor.",
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
          id: "de-a1-07-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch an der Kasse",
              genreTr: "Kasada konuşma",
              situation: "Bir müşteri ödemesini yapıyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Was macht das zusammen?" },
                { speaker: "Kassiererin", text: "Vierzehn Euro achtzig. Mit der Tüte fünfzehn Euro." },
                { speaker: "Kunde", text: "Ohne Tüte, bitte. Ich habe eine dabei." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın paketinin ne zaman geleceğini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Tekin", text: "Wann kommt mein Paket heute?" },
                { speaker: "Mitarbeiter", text: "Zwischen zwei und sechs. Der Fahrer klingelt zweimal." },
                { speaker: "Frau Tekin", text: "Vor drei bin ich noch nicht da." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Laden",
              genreTr: "Mağazada konuşma",
              situation: "Bir müşteri ceket deniyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Diese Jacke ist zu groß. Haben Sie eine Nummer kleiner?" },
                { speaker: "Verkäufer", text: "In Blau leider nicht mehr. In Grün habe ich sie noch." },
                { speaker: "Kundin", text: "Gut, dann probiere ich die andere Farbe." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch am Postschalter",
              genreTr: "Posta gişesinde konuşma",
              situation: "Bir adam mektup gönderiyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Nowak", text: "Ich möchte diesen Brief nach Italien schicken." },
                { speaker: "Angestellte", text: "Als Standard ein Euro zehn. Schneller kostet vier Euro." },
                { speaker: "Herr Nowak", text: "Es hat Zeit. Nehmen Sie das Günstigere." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch im Getränkemarkt",
              genreTr: "İçecek marketinde konuşma",
              situation: "Bir müşteri boş kasaları getiriyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Ich bringe die Kisten zurück. Wie viel bekomme ich?" },
                { speaker: "Verkäuferin", text: "Drei Kisten, das sind sieben Euro fünfzig." },
                { speaker: "Kunde", text: "Dann nehme ich noch Wasser mit." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch im Supermarkt",
              genreTr: "Süpermarkette konuşma",
              situation: "Bir müşteri raf soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ilic", text: "Entschuldigung, wo finde ich Zucker?" },
                { speaker: "Mitarbeiter", text: "Gang vier, neben dem Mehl. Ganz unten im Regal." },
                { speaker: "Frau Ilic", text: "Danke, ich schaue dort." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-07-h1-1",
              no: 1,
              ref: "a1",
              text: "Wie viel zahlt der Kunde?",
              options: ["14,80 Euro", "15,00 Euro", "15,80 Euro"],
              answer: 0,
              explain:
                "Kasiyer iki fiyat söylüyor: poşetsiz \"vierzehn Euro achtzig\", poşetle on beş euro. Müşteri \"Ohne Tüte\" diyor, yani düşük olan geçerli.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h1-2",
              no: 2,
              ref: "a2",
              text: "Ab wann ist Frau Tekin zu Hause?",
              options: ["Ab zwei Uhr.", "Ab drei Uhr.", "Ab sechs Uhr."],
              answer: 1,
              explain:
                "Teslimat aralığı iki ile altı arası, ama kadın \"Vor drei bin ich noch nicht da\" diyor. Yani üçten itibaren evde.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h1-3",
              no: 3,
              ref: "a3",
              text: "Welche Jacke nimmt die Kundin?",
              options: ["Die blaue.", "Die grüne.", "Gar keine."],
              answer: 1,
              explain:
                "Küçük beden yalnız yeşilde var: \"In Blau leider nicht mehr. In Grün habe ich sie noch\". Müşteri öbür rengi deneyeceğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h1-4",
              no: 4,
              ref: "a4",
              text: "Was zahlt Herr Nowak?",
              options: ["1,10 Euro", "4,00 Euro", "5,10 Euro"],
              answer: 0,
              explain:
                "İki fiyat var: standart \"ein Euro zehn\", hızlısı dört euro. Adam \"Es hat Zeit\" deyip ucuz olanı seçiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h1-5",
              no: 5,
              ref: "a5",
              text: "Wie viel Geld bekommt der Kunde für die Kisten?",
              options: ["Drei Euro.", "Fünf Euro fünfzig.", "Sieben Euro fünfzig."],
              answer: 2,
              explain:
                "Kayıtta iki sayı geçiyor ve karışması kolay: kasa sayısı üç, para \"sieben Euro fünfzig\". Sorulan para.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h1-6",
              no: 6,
              ref: "a6",
              text: "Wo steht der Zucker?",
              options: ["Ganz oben in Gang vier.", "Neben der Kasse, im Gang zwei.", "Unten in Gang vier."],
              answer: 2,
              explain:
                "Görevli iki bilgi veriyor ve ikisi de gerekiyor: koridor numarası ve raf yüksekliği — \"Gang vier\" ve \"Ganz unten im Regal\".",
            },
          ],
        },
        {
          id: "de-a1-07-h2",
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
              genreTr: "Süpermarkette anons",
              situation: "Kapanış anonsu.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, unser Markt schließt in zehn Minuten. Bitte kommen Sie langsam zur Kasse. Morgen sind wir ab sieben Uhr wieder für Sie da.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Kaufhaus",
              genreTr: "Mağazada anons",
              situation: "İndirim duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für Sie: Im dritten Stock ist heute alles zwanzig Prozent günstiger. Das Angebot gilt nur bis achtzehn Uhr. Danach zahlen Sie wieder den normalen Preis.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage in der Post",
              genreTr: "Postanede anons",
              situation: "Gişe kapanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Schalter drei ist ab jetzt geschlossen. Bitte gehen Sie zu Schalter eins oder zwei. Wir danken für Ihr Verständnis.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Markt",
              genreTr: "Markette anons",
              situation: "Kayıp çocuk anonsu.",
              plays: 1,
              segments: [
                {
                  text: "Wir suchen ein Kind: einen Jungen, vier Jahre alt, mit roter Jacke. Er heißt Emil. Bitte bringen Sie ihn zur Information neben dem Eingang.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-07-h2-7",
              no: 7,
              ref: "d1",
              text: "Der Markt macht in zehn Minuten zu.",
              answer: true,
              explain:
                "Anons \"unser Markt schließt in zehn Minuten\" diyor ve müşterileri kasaya çağırıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-07-h2-8",
              no: 8,
              ref: "d2",
              text: "Das Angebot gilt den ganzen Tag.",
              answer: false,
              explain:
                "Bir saat sınırı var: \"Das Angebot gilt nur bis achtzehn Uhr\". Sonrasında normal fiyat geçerli.",
            },
            {
              kind: "bool",
              id: "de-a1-07-h2-9",
              no: 9,
              ref: "d3",
              text: "Man soll zu Schalter eins oder zwei gehen.",
              answer: true,
              explain:
                "Üç numaralı gişe kapandı; anons \"Bitte gehen Sie zu Schalter eins oder zwei\" diyor.",
            },
            {
              kind: "bool",
              id: "de-a1-07-h2-10",
              no: 10,
              ref: "d4",
              text: "Das Kind wartet an der Information.",
              answer: false,
              explain:
                "Tam tersi: çocuk aranıyor. Anons onu bulanlardan \"Bitte bringen Sie ihn zur Information\" diye rica ediyor.",
            },
          ],
        },
        {
          id: "de-a1-07-h3",
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
              situation: "Çiçekçi siparişi haber veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist der Blumenladen Aster. Ihre Bestellung ist fertig. Sie können sie ab morgen abholen. Wir haben bis achtzehn Uhr offen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Komşu paketi almış.",
              plays: 2,
              segments: [
                {
                  text: "Hallo, hier ist Frau Voss von nebenan. Ich habe dein Paket bekommen. Heute Abend bin ich ab sieben da. Ruf mich bitte kurz an.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kargo firması bilgi veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist der Paketdienst. Wir waren heute bei Ihnen, aber niemand war zu Hause. Ihr Paket liegt jetzt im Paketshop in der Rosenstraße.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Ayakkabıcı tamiri bitirmiş.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Herr Mensah, hier ist der Schuhladen am Ring. Ihre Schuhe sind fertig. Die Reparatur kostet zwölf Euro. Wir haben bis Samstag Mittag offen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Market teslimat saatini bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Radu. Ihr Einkauf kommt am Donnerstag zwischen neun und elf. Bitte sagen Sie uns Bescheid, wenn das nicht geht.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-07-h3-11",
              no: 11,
              ref: "m1",
              text: "Wann kann man die Bestellung abholen?",
              options: ["Noch heute.", "Ab morgen.", "Erst nächste Woche."],
              answer: 1,
              explain:
                "Mesaj iki bilgi veriyor ve yalnız biri gün söylüyor: \"Sie können sie ab morgen abholen\". On sekiz saat bilgisi kapanışa ait.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h3-12",
              no: 12,
              ref: "m2",
              text: "Was soll der Nachbar tun?",
              options: ["Zur Post gehen.", "Morgen früh klingeln.", "Kurz anrufen."],
              answer: 2,
              explain:
                "Mesajın son cümlesi bir rica: \"Ruf mich bitte kurz an\". Akşam yedi saati evde olduğu zamanı söylüyor, istenen şeyi değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h3-13",
              no: 13,
              ref: "m3",
              text: "Wo ist das Paket jetzt?",
              options: ["Im Paketshop.", "Beim Nachbarn.", "Wieder beim Absender."],
              answer: 0,
              explain:
                "Kimse evde olmadığı için paket başka yere bırakılmış: \"Ihr Paket liegt jetzt im Paketshop in der Feldstraße\".",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h3-14",
              no: 14,
              ref: "m4",
              text: "Was kostet die Reparatur?",
              options: ["Zwei Euro.", "Zwölf Euro.", "Zwanzig Euro."],
              answer: 1,
              explain:
                "Mesaj tek fiyat söylüyor: \"Die Reparatur kostet zwölf Euro\". Üç şık da benzer sesle başlıyor, ayrım kulakta.",
            },
            {
              kind: "mcq",
              id: "de-a1-07-h3-15",
              no: 15,
              ref: "m5",
              text: "Wann kommt der Einkauf?",
              options: ["Am Dienstag.", "Am Mittwoch.", "Am Donnerstag."],
              answer: 2,
              explain:
                "Gün mesajda açıkça söyleniyor: \"Ihr Einkauf kommt am Donnerstag zwischen neun und elf\". Dokuz ve on bir saat, gün değil.",
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
          id: "de-a1-07-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Freundin Marta Kowalczyk möchte eine Kundenkarte für den Markt am Ring. Sie helfen ihr beim Ausfüllen. Marta ist am 21. Juli 1995 geboren. Sie wohnt in der Feldstraße 6 in 30159 Hannover. Ihre Telefonnummer ist 0511 442310. Sie möchte die Karte per E-Mail bekommen. Füllen Sie das Formular aus.",
          promptTr:
            "Arkadaşın Marta Kowalczyk, Markt am Ring için müşteri kartı istiyor. Formu doldurmasına yardım ediyorsun. Marta 21 Temmuz 1995 doğumlu. Feldstraße 6, 30159 Hannover adresinde oturuyor. Telefon numarası 0511 442310. Kartı e-postayla almak istiyor. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Antrag — Kundenkarte Markt am Ring",
              body: `Familienname, Vorname:    Kowalczyk, Marta
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Hannover
Telefon:                  {{4}}
Karte senden per:         {{5}}
Unterschrift:             M. Kowalczyk`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-07-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["21.07.1995", "21.7.1995", "21. Juli 1995", "21.07.95", "21.7.95"],
              explain:
                "Yönergede \"am 21. Juli 1995 geboren\" yazıyor. Almanca formlarda tarih gün.ay.yıl sırasıyla girilir: 21.07.1995.",
            },
            {
              kind: "gap",
              id: "de-a1-07-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Feldstraße 6", "Feldstr. 6"],
              explain:
                "Adres yönergede tam veriliyor: Feldstraße 6. Sokak adı önce, kapı numarası sonra yazılır.",
            },
            {
              kind: "gap",
              id: "de-a1-07-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["30159"],
              explain:
                "Yönergedeki adres \"in 30159 Hannover\" biçiminde. Posta kodu beş hanelidir ve şehirden önce gelir; şehir adı formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-07-s1-4",
              no: 4,
              text: "Telefon",
              accept: ["0511 442310", "0511442310"],
              explain:
                "Telefon numarası yönergede aynen veriliyor: 0511 442310. Alan kodu başta kalır, boşlukla ya da bitişik yazılabilir.",
            },
            {
              kind: "gap",
              id: "de-a1-07-s1-5",
              no: 5,
              text: "Karte senden per",
              accept: ["E-Mail", "per E-Mail", "Mail"],
              explain:
                "\"Sie möchte die Karte per E-Mail bekommen\" — gönderim yolu e-posta. Satır bir yol soruyor, adres istemiyor.",
            },
          ],
        },
        {
          id: "de-a1-07-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben im Markt am Ring Ihren Schal vergessen. Schreiben Sie an den Markt. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Markt am Ring'de atkını unutmuşsun. Markete yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Beschreiben Sie den Schal.", tr: "Atkıyı tarif et." },
              { de: "Fragen Sie, wann Sie kommen können.", tr: "Ne zaman gelebileceğini sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich war gestern in Ihrem Markt. Dort habe ich meinen Schal vergessen.

Der Schal ist blau und sehr lang. Er lag bei der Kasse zwei.

Wann kann ich ihn abholen?

Vielen Dank und freundliche Grüße
Elif Yalçın`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Kuruma yazıldığı için `Sehr geehrte Damen und Herren` uygun.",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Atkı en az iki özellikle tarif edildi mi? (renk, boy, nerede kaldığı)",
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
      instruction: "Dieser Teil hat drei Aufgaben: vom Einkaufen erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: alışverişi anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-07-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie, wo und wie Sie einkaufen. Sprechen Sie zu den Stichwörtern: Laden — Tage — was Sie kaufen — bezahlen — Preise — Lieblingsladen.",
          promptTr:
            "Nerede ve nasıl alışveriş yaptığını anlat. Şu anahtar sözcüklere göre konuş: mağaza — günler — ne aldığın — ödeme — fiyatlar — en sevdiğin dükkân.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "sagen, wo Sie einkaufen", tr: "Nerede alışveriş yaptığını söylemek" },
              { de: "sagen, wann und wie oft", tr: "Ne zaman ve ne sıklıkla olduğunu söylemek" },
              { de: "sagen, wie Sie bezahlen", tr: "Nasıl ödediğini söylemek" },
            ],
            sample:
              "Ich kaufe im Supermarkt neben meiner Wohnung ein. Meistens gehe ich am Samstag, manchmal auch am Mittwoch. Ich kaufe Brot, Gemüse, Milch und Kaffee. An der Kasse zahle ich fast immer mit Karte. Obst ist hier nicht teuer. Mein Lieblingsladen ist der kleine Markt am Bahnhof.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Gün ve sıklık söylenebiliyor mu? (am Samstag, manchmal)",
              "Ödeme biçimi adlandırıldı mı? (bar, mit Karte)",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-07-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Einkaufen. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Markt — Preis — Tüte — Kasse — Öffnungszeiten.",
          promptTr:
            "Konu: Alışveriş. Her anahtar sözcük için bir soru kur ve cevapla: market — fiyat — poşet — kasa — açılış saatleri.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Einkaufen. Ihr erstes Stichwort ist: Markt. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi alışveriş konusunu konuşuyoruz. İlk sözcüğün: market. Bana bir soru sor.",
            },
            { who: "you", hint: "«Markt» sözcüğüyle bir soru kur.", expect: "Markt sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich gehe meistens zum Markt am Ring. Ihr nächstes Stichwort ist: Preis.",
              tr: "Genelde Markt am Ring'e giderim. Sıradaki sözcüğün: fiyat.",
            },
            { who: "you", hint: "«Preis» için bir soru kur.", expect: "Preis sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Das Brot dort kostet zwei Euro vierzig. Und jetzt eine Frage an Sie: Nehmen Sie eine Tüte mit?",
              tr: "Oradaki ekmek iki euro kırk. Şimdi sana bir soru: Yanında poşet götürür müsün?",
            },
            { who: "you", hint: "Soruyu cevapla — poşet götürüyor musun?", expect: "evet/hayır sorusuna tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wann hat Ihr Supermarkt offen?",
              tr: "Teşekkürler. Son soru: Süpermarketin ne zaman açık?",
            },
            { who: "you", hint: "Bir saat aralığı söyle.", expect: "bir saat aralığıyla cevap vermek (von acht bis zwanzig Uhr …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wo ist der Markt? — Am Bahnhof. Was kostet das Brot? — Zwei Euro vierzig. Brauchst du eine Tüte? — Nein, ich habe eine dabei. Wo ist die Kasse? — Ganz vorne. Wann hat der Laden offen? — Von acht bis zwanzig Uhr.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve saat söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-07-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie finden den Zucker nicht. — Sie brauchen eine Tüte. — Jemand bittet Sie um Kleingeld.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Şekeri bulamıyorsun. — Bir poşete ihtiyacın var. — Biri senden bozuk para istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie finden den Zucker nicht. Fragen Sie mich.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Şekeri bulamıyorsun. Bana sor.",
            },
            {
              who: "you",
              hint: "Şekerin nerede olduğunu sor.",
              expect: "bir yer sorusu kurmak (Entschuldigung, wo finde ich …)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Der steht in Gang vier, ganz unten. Zweite Situation: Sie brauchen eine Tüte. Bitten Sie mich darum.",
              tr: "Dört numaralı koridorda, en altta. İkinci durum: Bir poşete ihtiyacın var. Benden iste.",
            },
            { who: "you", hint: "Poşet iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Können Sie mir bitte … geben)", seconds: 20 },
            {
              who: "partner",
              de: "Hier bitte, sie kostet zwanzig Cent. Jetzt bitte ich Sie um etwas: Haben Sie Kleingeld für den Einkaufswagen?",
              tr: "Buyur, yirmi sent. Şimdi ben senden bir şey rica ediyorum: Alışveriş arabası için bozuk paran var mı?",
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
              { de: "nach einem Ort fragen", tr: "Bir yeri sormak" },
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Entschuldigung, wo finde ich den Zucker? — Können Sie mir bitte eine Tüte geben? — Ja, gern. Ich habe einen Euro. Nehmen Sie ihn. — Tut mir leid, ich habe heute kein Kleingeld dabei.",
            criteria: [
              "Yer sorusu doğru kuruldu mu? (Wo finde ich …)",
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu?",
              "Gelen ricaya hem olumlu hem olumsuz karşılık verilebiliyor mu?",
              "Ret bir gerekçeyle yumuşatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
