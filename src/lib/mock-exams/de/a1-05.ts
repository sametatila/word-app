import type { MockPaper } from "../types";

/**
 * A1 · Deneme 5 — "Unterwegs in der Stadt".
 *
 * PLAN kâğıt 1–4 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: şehir içi ulaşım, A1'in sayı becerisini (saat, hat numarası,
 * fiyat, kat) kendiliğinden gerektiriyor. Maddelerin bir bölümü bu yüzden
 * iki sayıyı ayırt etmeye dayanıyor: hangisi saat, hangisi süre.
 */
export const A1_05: MockPaper = {
  id: "de-a1-05",
  course: "de",
  level: "A1",
  no: 5,
  theme: "Unterwegs in der Stadt",
  themeTr: "Şehir içinde yolculuk",
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
          id: "de-a1-05-l1",
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
              title: "Von: lena.k@mail.de",
              body: `Hallo Jonas,

am Samstag komme ich nach Bremen. Mein Bus kommt um 13.15 Uhr an.

Die Haltestelle ist am Hauptbahnhof, Ausgang Nord. Ich warte bei der Uhr.

Ich habe viel Gepäck. Kannst du mit dem Auto kommen?

Am Sonntag fahre ich schon um 9 Uhr zurück.

Bis Samstag!
Lena`,
              gloss: [
                { de: "das Gepäck", tr: "bagaj, valizler", en: "luggage" },
                { de: "die Haltestelle", tr: "durak", en: "stop" },
                { de: "der Ausgang", tr: "çıkış", en: "exit" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang an der Haltestelle",
              genreTr: "Duraktaki duyuru",
              title: "LINIE 6 — ÄNDERUNG",
              body: `Vom 2. bis 6. Juni fährt die Linie 6 nicht.

Zwischen Markt und Klinikum fahren Busse.

Die Busse brauchen 10 Minuten länger.

Fahrräder können nicht mitfahren.`,
              gloss: [
                { de: "die Änderung", tr: "değişiklik", en: "change" },
                { de: "brauchen (Zeit)", tr: "(zaman) almak", en: "to take (time)" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-05-l1-1",
              no: 1,
              ref: "t1",
              text: "Lena kommt am Nachmittag in Bremen an.",
              answer: true,
              explain:
                "Otobüsün varış saati \"um 13.15 Uhr\". 13.15 öğleden sonradır, yani cümle doğru. Saat okumak A1'de ölçülen becerilerden biri.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l1-2",
              no: 2,
              ref: "t1",
              text: "Jonas soll Lena mit dem Fahrrad abholen.",
              answer: false,
              explain:
                "Lena \"Kannst du mit dem Auto kommen?\" diye soruyor, çünkü çok bagajı var. Bisikletten hiç söz edilmiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l1-3",
              no: 3,
              ref: "t1",
              text: "Lena bleibt bis Montag in Bremen.",
              answer: false,
              explain:
                "Dönüş pazar günü: \"Am Sonntag fahre ich schon um 9 Uhr zurück\". Pazartesi metinde hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l1-4",
              no: 4,
              ref: "t2",
              text: "Im Juni können Sie Ihr Fahrrad in den Bus stellen.",
              answer: false,
              explain:
                "Duyuru \"Fahrräder können nicht mitfahren\" diyor. Yani ikame otobüslerde bisiklet taşınmıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l1-5",
              no: 5,
              ref: "t2",
              text: "Die Fahrt dauert in dieser Zeit länger.",
              answer: true,
              explain:
                "Otobüsler için \"Die Busse brauchen 10 Minuten länger\" deniyor. Yani 2–6 Haziran arası yolculuk 10 dakika uzuyor.",
            },
          ],
        },
        {
          id: "de-a1-05-l2",
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
              id: "de-a1-05-l2-6",
              no: 6,
              text: "Sie möchten am Sonntag den ganzen Tag mit Bus und Bahn fahren.",
              options: [
                "Tageskarte\ngilt bis 3 Uhr am nächsten Morgen\nauch am Wochenende\n6,90 Euro",
                "Einzelfahrschein\ngilt 90 Minuten in eine Richtung\nUmsteigen erlaubt, Rückfahrt nicht\n2,80 Euro pro Person",
              ],
              answer: 0,
              explain:
                "Bütün gün için günlük bilet gerekiyor. (a) `gilt bis 3 Uhr am nächsten Morgen` diyor ve hafta sonu da geçerli. (b) yalnız 90 dakika ve tek yön.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-l2-7",
              no: 7,
              text: "Sie fahren mit dem Auto ins Theater und suchen einen Parkplatz.",
              options: [
                "Fahrradstation am Theater\n120 Plätze, überdacht\nnur mit Karte, 1 Euro pro Tag\ntäglich 5 bis 24 Uhr",
                "Parkhaus Theater\nEinfahrt Kirchgasse\nabends ab 18 Uhr 3 Euro\n300 Plätze",
              ],
              answer: 1,
              explain:
                "Araba için otopark gerekiyor. (b) `Parkhaus Theater` ve 300 yeri var. (a) bisiklet park yeri; adında tiyatro geçiyor ama araba almıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-l2-8",
              no: 8,
              text: "Ihr Kind ist vier Jahre alt. Sie möchten wissen, was es kostet.",
              options: [
                "Kinder fahren mit\nbis 6 Jahre kostenlos\nvon 6 bis 14 Jahren halber Preis\nAusweis mitbringen",
                "Familienkarte\nfür zwei Erwachsene und drei Kinder\nnur samstags und sonntags\n14,50 Euro",
              ],
              answer: 0,
              explain:
                "Soru dört yaşındaki bir çocuğun ücreti. (a) `bis 6 Jahre kostenlos` diyor. (b) aile bileti; fiyatı var ama tek çocuğun ücretini söylemiyor ve yalnız hafta sonu geçerli.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-l2-9",
              no: 9,
              text: "Sie haben Ihre Tasche in der Bahn vergessen.",
              options: [
                "Reisezentrum\nTickets und Auskunft\nMo–Fr 7–19 Uhr, Sa 8–14 Uhr\nSitzplatz reservieren",
                "Fundbüro\nam Bahnhof, Raum 12\nMo–Fr 9–16 Uhr\nTelefon 0421 30 55 18",
              ],
              answer: 1,
              explain:
                "Unutulan eşya için kayıp eşya bürosu gerekiyor. (b) `Fundbüro` diyor ve odayı veriyor. (a) bilet ve danışma; eşya kabul etmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-l2-10",
              no: 10,
              text: "Sie fahren mit dem Rad zur Arbeit und suchen einen sicheren Platz dafür.",
              options: [
                "Radbox am Bahnhof\nabschließbar, 8 Euro im Monat\nAnmeldung im Reisezentrum\nnur für ein Fahrrad",
                "Fahrradladen Nord\nReparatur in 24 Stunden\nneue und gebrauchte Räder\nMo–Sa 9–18 Uhr",
              ],
              answer: 0,
              explain:
                "Bisiklet için güvenli bir yer aranıyor. (a) `abschließbar`, yani kilitlenebilir bir kutu. (b) tamir ve satış yapıyor; park yeri sunmuyor.",
            },
          ],
        },
        {
          id: "de-a1-05-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild an der Haltestelle",
              genreTr: "Duraktaki levha",
              body: `ERSATZHALTESTELLE

Die Busse halten hier nicht.

Bitte gehen Sie 100 Meter weiter
zur Post.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild im Bus",
              genreTr: "Otobüsteki levha",
              body: `Platz für Kinderwagen und Rollstuhl

Bitte den Wagen festhalten.

Ein Rollstuhl hat immer Vorrang.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Hinweis am Automaten",
              genreTr: "Bilet otomatındaki uyarı",
              body: `Der Automat nimmt keine Scheine.

Münzen und Karte funktionieren.

Kein Wechselgeld über 5 Euro.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Schild am Bahnsteig",
              genreTr: "Perondaki levha",
              body: `Vorsicht am Gleis

Bitte hinter der weißen Linie warten.

Der Zug fährt hier ohne Halt durch.`,
            },
            {
              kind: "text",
              id: "s5",
              genre: "Aushang im Parkhaus",
              genreTr: "Otoparktaki duyuru",
              body: `Bezahlen Sie vor der Ausfahrt am Automat.

Die Karte brauchen Sie an der Schranke.

Nach dem Bezahlen haben Sie 15 Minuten Zeit.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-05-l3-11",
              no: 11,
              ref: "s1",
              text: "Sie können hier in den Bus einsteigen.",
              answer: false,
              explain:
                "Levha \"Die Busse halten hier nicht\" diyor ve 100 metre ötedeki postaneye gönderiyor. Yani binme yeri başka.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l3-12",
              no: 12,
              ref: "s2",
              text: "Ein Rollstuhl kommt vor dem Kinderwagen.",
              answer: true,
              explain:
                "Levha sırayı belirliyor: \"Ein Rollstuhl hat immer Vorrang\". Yani yer doluysa öncelik tekerlekli sandalyede.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l3-13",
              no: 13,
              ref: "s3",
              text: "Sie können mit einem 10-Euro-Schein bezahlen.",
              answer: false,
              explain:
                "\"Der Automat nimmt keine Scheine\" — kâğıt para kabul edilmiyor. Yalnız madenî para ve kart çalışıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l3-14",
              no: 14,
              ref: "s4",
              text: "Hier hält nicht jeder Zug.",
              answer: true,
              explain:
                "Levha \"Der Zug fährt hier ohne Halt durch\" diyor; bu yüzden beyaz çizginin arkasında beklenmesi isteniyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-l3-15",
              no: 15,
              ref: "s5",
              text: "Sie bezahlen erst an der Schranke.",
              answer: false,
              explain:
                "Duyuru \"Bezahlen Sie vor der Ausfahrt am Automat\" diyor. Bariyerde yalnız kart gerekiyor, ödeme öncesinde yapılıyor.",
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
          id: "de-a1-05-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch am Automaten",
              genreTr: "Bilet otomatında konuşma",
              situation: "Bir yolcu hangi bileti alacağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Dreher", text: "Ich fahre nur bis zum Markt. Welches Ticket brauche ich?" },
                { speaker: "Mitarbeiter", text: "Die Kurzstrecke, zwei Euro. Aber nur bis zu vier Haltestellen." },
                { speaker: "Frau Dreher", text: "Es sind sechs Haltestellen." },
                { speaker: "Mitarbeiter", text: "Dann nehmen Sie den Einzelfahrschein für zwei Euro achtzig." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch auf der Straße",
              genreTr: "Sokakta konuşma",
              situation: "Biri yol soruyor.",
              plays: 2,
              segments: [
                { speaker: "Tourist", text: "Entschuldigung, wo ist das Museum?" },
                { speaker: "Passantin", text: "Gehen Sie hier geradeaus und dann die zweite Straße links." },
                { speaker: "Tourist", text: "Ist es weit?" },
                { speaker: "Passantin", text: "Zehn Minuten zu Fuß." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Taxi",
              genreTr: "Takside konuşma",
              situation: "Bir yolcu adres veriyor.",
              plays: 2,
              segments: [
                { speaker: "Fahrer", text: "Wohin darf ich Sie fahren?" },
                { speaker: "Herr Bach", text: "Zum Flughafen, bitte. Mein Flug geht um sieben." },
                { speaker: "Fahrer", text: "Um diese Zeit brauchen wir etwa vierzig Minuten." },
                { speaker: "Herr Bach", text: "Gut, dann schaffen wir es." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch an der Haltestelle",
              genreTr: "Durakta konuşma",
              situation: "İki kişi hangi hattı bekleyeceklerini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Mann", text: "Fährt die Linie 3 zum Klinikum?" },
                { speaker: "Frau", text: "Nein, die 3 fährt zum Stadion. Sie brauchen die 8." },
                { speaker: "Mann", text: "Und wann kommt die?" },
                { speaker: "Frau", text: "In sieben Minuten." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch im Zug",
              genreTr: "Trende konuşma",
              situation: "Kontrolör bileti soruyor.",
              plays: 2,
              segments: [
                { speaker: "Kontrolleurin", text: "Die Fahrkarten, bitte." },
                { speaker: "Studentin", text: "Hier. Und das ist mein Studentenausweis." },
                { speaker: "Kontrolleurin", text: "Danke. Der Ausweis ist seit März nicht mehr gültig." },
                { speaker: "Studentin", text: "Oh, das wusste ich nicht." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Biri gecikeceğini haber veriyor.",
              plays: 2,
              segments: [
                { speaker: "Nuri", text: "Ich stehe im Stau. Ich komme zwanzig Minuten später." },
                { speaker: "Eva", text: "Kein Problem. Wir warten im Café." },
                { speaker: "Nuri", text: "Bestellt schon, ich esse nichts." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-05-h1-1",
              no: 1,
              ref: "a1",
              text: "Welches Ticket kauft Frau Dreher?",
              options: ["Die Kurzstrecke für 2 Euro.", "Den Einzelfahrschein.", "Eine Tageskarte für den Markt."],
              answer: 1,
              explain:
                "Kısa mesafe bileti yalnız dört durağa kadar geçerli, oysa yolculuk altı durak. Bu yüzden 2,80 euroluk tek yön bileti alınıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h1-2",
              no: 2,
              ref: "a2",
              text: "Wie weit ist es bis zum Museum?",
              options: ["Zwei Minuten.", "Zwanzig Minuten mit dem Bus.", "Zehn Minuten."],
              answer: 2,
              explain:
                "Yaya süresi net: \"Zehn Minuten zu Fuß\". İkinci sokak bilgisi yönü veriyor, süreyi değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h1-3",
              no: 3,
              ref: "a3",
              text: "Wohin fährt Herr Bach?",
              options: ["Zum Flughafen.", "Zum Bahnhof.", "Zum Hotel."],
              answer: 0,
              explain:
                "\"Zum Flughafen, bitte\" diyor ve uçuş saatini ekliyor: yedi. Gar ve otel bu kayıtta hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h1-4",
              no: 4,
              ref: "a4",
              text: "Welche Linie fährt zum Klinikum?",
              options: ["Die Linie 3.", "Die Linie 8.", "Die Linie 7."],
              answer: 1,
              explain:
                "3 numaralı hat stadyuma gidiyor; kliniğe giden hat 8. 7 sayısı bekleme süresinden (yedi dakika) geliyor, hat numarası değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h1-5",
              no: 5,
              ref: "a5",
              text: "Was ist das Problem?",
              options: ["Die Fahrkarte fehlt ganz.", "Der Studentenausweis ist alt.", "Der Zug ist zu voll."],
              answer: 1,
              explain:
                "Bilet var, sorun kimlikte: \"Der Ausweis ist seit März nicht mehr gültig\". Yani süresi dolmuş.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h1-6",
              no: 6,
              ref: "a6",
              text: "Warum kommt Nuri später?",
              options: ["Er hat den Bus verpasst.", "Er arbeitet noch im Büro.", "Er steht im Stau."],
              answer: 2,
              explain:
                "Gerekçe ilk cümlede: \"Ich stehe im Stau\" ve gecikme yirmi dakika. Otobüs ve büro hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-a1-05-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Zug",
              genreTr: "Trende anons",
              situation: "Bir vagonun kullanılamadığı duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Sehr geehrte Fahrgäste, der Wagen zwölf ist heute geschlossen. Bitte gehen Sie in den Wagen elf oder dreizehn. Wir bitten um Entschuldigung.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage am Bahnhof",
              genreTr: "Garda anons",
              situation: "Peron değişikliği duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Achtung: Der Zug nach Oldenburg fährt heute nicht von Gleis zwei, sondern von Gleis fünf. Die Abfahrtszeit bleibt gleich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage im Bus",
              genreTr: "Otobüste anons",
              situation: "Şoför son durağı duyuruyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Fahrgäste, dieser Bus fährt nur bis zum Rathaus. Für die Fahrt zum Krankenhaus steigen Sie bitte dort in die Linie 8 um.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Parkhaus",
              genreTr: "Otoparkta anons",
              situation: "Kapanış saati duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, das Parkhaus schließt heute um zweiundzwanzig Uhr. Bitte holen Sie Ihr Auto vorher ab. Morgen öffnen wir um sechs Uhr.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-05-h2-7",
              no: 7,
              ref: "d1",
              text: "Sie können heute in Wagen elf sitzen.",
              answer: true,
              explain:
                "Kapalı olan yalnız 12 numaralı vagon; anons \"Bitte gehen Sie in den Wagen elf oder dreizehn\" diyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-h2-8",
              no: 8,
              ref: "d2",
              text: "Der Zug nach Oldenburg fährt später als geplant.",
              answer: false,
              explain:
                "Değişen yalnız peron: 2 yerine 5. Saat için \"Die Abfahrtszeit bleibt gleich\" deniyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-h2-9",
              no: 9,
              ref: "d3",
              text: "Der Bus fährt bis zum Krankenhaus.",
              answer: false,
              explain:
                "\"Dieser Bus fährt nur bis zum Rathaus\" — hastane için 8 numaralı hatta aktarma yapmak gerekiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-05-h2-10",
              no: 10,
              ref: "d4",
              text: "Morgen früh ist das Parkhaus schon um 6 Uhr offen.",
              answer: true,
              explain:
                "Anons kapanış için 22, ertesi gün açılış için \"um sechs Uhr\" diyor. Yani sabah altıda açık.",
            },
          ],
        },
        {
          id: "de-a1-05-h3",
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
              situation: "Bir tamirhane arabanın hazır olduğunu bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist die Werkstatt Ohlsen. Ihr Auto ist fertig. Sie können es ab morgen früh abholen, wir öffnen um halb acht.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "İki arkadaş buluşma yerini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ida", text: "Treffen wir uns am Bahnhof?" },
                { speaker: "Sam", text: "Lieber vor dem Kino, der Bahnhof ist zu voll." },
                { speaker: "Ida", text: "Gut, dann vor dem Kino." },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Gespräch im Reisezentrum",
              genreTr: "Bilet gişesinde konuşma",
              situation: "Bir yolcu koltuk ayırtıyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Ich möchte einen Platz am Fenster." },
                { speaker: "Mitarbeiterin", text: "Am Fenster ist alles voll. Am Gang habe ich noch etwas." },
                { speaker: "Kunde", text: "Dann nehme ich den Gang." },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Gespräch im Bus",
              genreTr: "Otobüste konuşma",
              situation: "Bir yolcu inmek istediği durağı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Fahrgast", text: "Muss ich für die Bibliothek hier aussteigen?" },
                { speaker: "Fahrer", text: "Nein, erst an der nächsten Haltestelle." },
                { speaker: "Fahrgast", text: "Danke schön." },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Gespräch zu Hause",
              genreTr: "Evde konuşma",
              situation: "İki kişi nasıl gideceklerine karar veriyor.",
              plays: 2,
              segments: [
                { speaker: "Mira", text: "Nehmen wir das Auto?" },
                { speaker: "Ben", text: "Am Samstag finden wir keinen Parkplatz. Wir fahren mit der Bahn." },
                { speaker: "Mira", text: "In Ordnung." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-05-h3-11",
              no: 11,
              ref: "m1",
              text: "Ab wann kann der Kunde das Auto abholen?",
              options: ["Ab morgen früh.", "Ab heute Abend.", "Ab Montag."],
              answer: 0,
              explain:
                "Mesaj \"ab morgen früh\" diyor ve açılış saatini veriyor: 7.30. Bugün ve pazartesi hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h3-12",
              no: 12,
              ref: "m2",
              text: "Wo treffen sich Ida und Sam?",
              options: ["Am Bahnhof.", "Vor dem Kino.", "Im Café am Markt."],
              answer: 1,
              explain:
                "Gar önerisi reddediliyor çünkü çok kalabalık; Sam \"Lieber vor dem Kino\" diyor ve Ida kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h3-13",
              no: 13,
              ref: "m3",
              text: "Welchen Platz bekommt der Kunde?",
              options: ["Einen Platz am Fenster.", "Gar keinen Platz.", "Einen Platz am Gang."],
              answer: 2,
              explain:
                "Pencere kenarı dolu, koridorda yer var ve müşteri \"Dann nehme ich den Gang\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h3-14",
              no: 14,
              ref: "m4",
              text: "Wo muss der Fahrgast aussteigen?",
              options: ["Hier.", "An der nächsten Haltestelle.", "Am Ende der Linie."],
              answer: 1,
              explain:
                "Şoför \"erst an der nächsten Haltestelle\" diyor. Yani bu durak değil, bir sonraki.",
            },
            {
              kind: "mcq",
              id: "de-a1-05-h3-15",
              no: 15,
              ref: "m5",
              text: "Womit fahren die beiden?",
              options: ["Mit dem Auto.", "Mit dem Fahrrad.", "Mit der Bahn."],
              answer: 2,
              explain:
                "Cumartesi park yeri bulunamayacağı için araba eleniyor: \"Wir fahren mit der Bahn\". Bisiklet hiç konuşulmuyor.",
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
          id: "de-a1-05-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Kollegin Rosa Iversen möchte ein Monatsticket. Sie helfen ihr beim Antrag. Rosa ist am 19. Juli 1996 geboren. Sie wohnt in der Deichstraße 4 in 28203 Bremen. Sie fährt jeden Tag von der Haltestelle Kirchweg zur Arbeit. Das Ticket soll ab dem 1. Oktober gelten. Füllen Sie das Formular aus.",
          promptTr:
            "İş arkadaşın Rosa Iversen aylık bilet istiyor. Başvuruda ona yardım ediyorsun. Rosa 19 Temmuz 1996 doğumlu. Deichstraße 4, 28203 Bremen adresinde oturuyor. Her gün Kirchweg durağından işe gidiyor. Bilet 1 Ekim'den itibaren geçerli olacak. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Antrag — Monatsticket",
              body: `Familienname, Vorname:    Iversen, Rosa
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Bremen
Starthaltestelle:         {{4}}
Gültig ab:                {{5}}
Unterschrift:             R. Iversen`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-05-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["19.07.1996", "19.7.1996", "19. Juli 1996", "19.07.96", "19.7.96"],
              explain:
                "Yönergede \"am 19. Juli 1996 geboren\" yazıyor. Almanca formlarda tarih gün.ay.yıl sırasıyla girilir: 19.07.1996.",
            },
            {
              kind: "gap",
              id: "de-a1-05-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Deichstraße 4", "Deichstr. 4"],
              explain:
                "Adres yönergede tam veriliyor: Deichstraße 4. Sokak adı ve kapı numarası aynı satıra yazılır; `-str.` kısaltması da doğrudur.",
            },
            {
              kind: "gap",
              id: "de-a1-05-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["28203"],
              explain:
                "Yönergedeki adres \"in 28203 Bremen\" biçiminde. Posta kodu beş hanelidir ve şehirden önce gelir; şehir adı formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-05-s1-4",
              no: 4,
              text: "Starthaltestelle",
              accept: ["Kirchweg", "Haltestelle Kirchweg"],
              explain:
                "\"von der Haltestelle Kirchweg zur Arbeit\" — yolculuğun başladığı durak Kirchweg. Bu satıra durağın adı yazılır.",
            },
            {
              kind: "gap",
              id: "de-a1-05-s1-5",
              no: 5,
              text: "Gültig ab",
              accept: ["01.10.", "1.10.", "1. Oktober", "01.10.2026", "Oktober"],
              explain:
                "Yönerge \"ab dem 1. Oktober\" diyor. Bu satıra başlangıç tarihi girilir, bitiş tarihi değil.",
            },
          ],
        },
        {
          id: "de-a1-05-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie sind mit Ihrer Freundin Nora um 18 Uhr am Kino verabredet. Ihr Bus hat Verspätung. Schreiben Sie ihr eine Nachricht. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Arkadaşın Nora ile saat 18'de sinemanın önünde buluşacaksın. Otobüsün gecikti. Ona bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Sagen Sie, dass Sie später kommen.", tr: "Geç kalacağını söyle." },
              { de: "Nennen Sie den Grund.", tr: "Nedenini söyle." },
              { de: "Schlagen Sie vor, was Nora bis dahin machen kann.", tr: "Nora'nın o zamana kadar ne yapabileceğini öner." },
            ],
            sample: `Liebe Nora,

ich komme leider später. Mein Bus steht im Stau und ich bin erst um halb sieben am Kino.

Kaufst du bitte schon die Karten? Dann warten wir nicht so lange.

Bis gleich!
Mert`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Arkadaşa yazıldığı için `Liebe …` ve `Bis gleich` uygun.",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Yeni saat ya da gecikme süresi somut söylendi mi?",
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
      instruction: "Dieser Teil hat drei Aufgaben: von einem Weg erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: bir yolu anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-05-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie, wie Sie zur Arbeit oder zur Schule kommen. Sprechen Sie zu den Stichwörtern: aufstehen — Verkehrsmittel — Weg — Dauer — Kosten — Probleme.",
          promptTr:
            "İşe ya da okula nasıl gittiğini anlat. Şu anahtar sözcüklere göre konuş: kalkmak — ulaşım aracı — güzergâh — süre — ücret — sorunlar.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "das Verkehrsmittel nennen", tr: "Ulaşım aracını söylemek" },
              { de: "den Weg beschreiben", tr: "Yolu tarif etmek" },
              { de: "Dauer und Kosten nennen", tr: "Süre ve ücreti söylemek" },
            ],
            sample:
              "Ich stehe um sechs Uhr auf. Dann fahre ich mit dem Bus zur Arbeit. Ich steige an der Haltestelle Kirchweg ein und fahre acht Stationen. Die Fahrt dauert zwanzig Minuten. Mein Monatsticket kostet sechzig Euro. Am Morgen ist der Bus oft sehr voll.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Ulaşım aracı doğru edatla söylendi mi? (mit dem Bus, mit der Bahn, zu Fuß)",
              "Süre ve ücret sayıyla verildi mi?",
              "Ayrılabilen fiiller doğru kullanıldı mı? (ich steige … ein)",
            ],
          },
        },
        {
          id: "de-a1-05-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Verkehr. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Bus — Fahrrad — Auto — Ticket — Weg.",
          promptTr:
            "Konu: Ulaşım. Her anahtar sözcük için bir soru kur ve cevapla: otobüs — bisiklet — araba — bilet — yol.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Verkehr. Ihr erstes Stichwort ist: Bus. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi ulaşım konusunu konuşuyoruz. İlk sözcüğün: otobüs. Bana bir soru sor.",
            },
            { who: "you", hint: "«Bus» sözcüğüyle bir soru kur.", expect: "Bus sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Der Bus vor meinem Haus fährt alle zehn Minuten. Ihr nächstes Stichwort ist: Fahrrad.",
              tr: "Evimin önündeki otobüs on dakikada bir geçiyor. Sıradaki sözcüğün: bisiklet.",
            },
            { who: "you", hint: "«Fahrrad» için bir soru kur.", expect: "Fahrrad sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Im Sommer fahre ich oft Rad. Und jetzt eine Frage an Sie: Haben Sie ein Auto?",
              tr: "Yazın sık sık bisiklete binerim. Şimdi sana bir soru: Araban var mı?",
            },
            { who: "you", hint: "Soruyu cevapla — araban var mı?", expect: "evet/hayır sorusuna tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was kostet bei Ihnen eine Fahrt mit dem Bus?",
              tr: "Teşekkürler. Son soru: Sizde otobüs bileti kaç para?",
            },
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
              "Wann kommt der Bus? — Um Viertel nach acht. Fährst du Fahrrad? — Ja, im Sommer jeden Tag. Hast du ein Auto? — Nein, ich habe kein Auto. Was kostet das Ticket? — Zwei Euro achtzig. Wie lange ist der Weg? — Zwanzig Minuten.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Fiyat ve saat gibi sayılar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-05-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie suchen den Weg zum Bahnhof. — Sie möchten am Fenster sitzen. — Jemand bittet Sie, die Tasche wegzunehmen.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Gara giden yolu arıyorsun. — Pencere kenarında oturmak istiyorsun. — Biri senden çantanı çekmeni rica ediyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie suchen den Bahnhof. Fragen Sie mich nach dem Weg.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Garı arıyorsun. Bana yolu sor.",
            },
            { who: "you", hint: "Yolu kibarca sor.", expect: "kibar bir biçimde yol sormak (Entschuldigung, wo ist …)", seconds: 20 },
            {
              who: "partner",
              de: "Gehen Sie hier geradeaus, dann rechts. Zweite Situation: Im Zug möchten Sie am Fenster sitzen. Fragen Sie mich.",
              tr: "Buradan düz gidin, sonra sağa. İkinci durum: Trende pencere kenarında oturmak istiyorsun. Bana sor.",
            },
            { who: "you", hint: "Pencere kenarındaki yer için izin iste.", expect: "izin sormak (Darf ich … / Ist der Platz frei)", seconds: 20 },
            {
              who: "partner",
              de: "Ja, der Platz ist frei. Jetzt bitte ich Sie um etwas: Können Sie bitte Ihre Tasche wegnehmen?",
              tr: "Evet, yer boş. Şimdi ben senden bir şey rica ediyorum: Çantanı çeker misin?",
            },
            {
              who: "you",
              hint: "Ricaya karşılık ver: kabul et ve kısa bir şey ekle.",
              expect: "bir ricaya kabul ile karşılık vermek ve kısa bir açıklama eklemek",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich fragen", tr: "Kibarca sormak" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Entschuldigung, wo ist der Bahnhof? — Geradeaus und dann rechts. Ist der Platz am Fenster frei? — Ja, bitte. Können Sie Ihre Tasche wegnehmen? — Ja, natürlich. Entschuldigung, ich stelle sie nach oben.",
            criteria: [
              "Soru `Entschuldigung` ile açıldı mı ve kibar bir kalıp kullanıldı mı?",
              "Yer sorma kalıbı doğru mu? (Ist der Platz frei? / Darf ich hier sitzen?)",
              "Gelen ricaya doğal bir karşılık verildi mi?",
              "Kısa bir özür ya da açıklama eklendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
