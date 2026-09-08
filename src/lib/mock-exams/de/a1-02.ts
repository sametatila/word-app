import type { MockPaper } from "../types";

/**
 * A1 · Deneme 2 — "Wohnen und Arbeit".
 *
 * Yapı A1 · Deneme 1 ile birebir aynı (bkz. `a1-01.ts`); iki kâğıdın puanı
 * ancak aynı planda kıyaslanabilir. Değişen tek şey İÇERİK ALANI: birinci
 * kâğıt varış, alışveriş ve gündelik hizmetler etrafında dönüyor, bu kâğıt
 * konut ve iş etrafında. İkisi birlikte A1 tema listesini kapsıyor.
 *
 * Maddelerin bir kısmı bilerek ÇELİŞEN İKİ BİLGİ üzerine kurulu (eski/yeni
 * randevu, soğuk/sıcak kira, kışın/yazın ulaşım): A1 düzeyinde en sık ölçülen
 * beceri, metindeki iki benzer bilgiden doğru olanı seçmek.
 */
export const A1_02: MockPaper = {
  id: "de-a1-02",
  course: "de",
  level: "A1",
  no: 2,
  theme: "Wohnen und Arbeit",
  themeTr: "Konut ve iş",
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
          id: "de-a1-02-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 1 bis 5. Sind die Sätze richtig oder falsch?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Nachricht einer Kollegin",
              genreTr: "İş arkadaşından ileti",
              title: "Von: Katrin",
              body: `Hallo Deniz,

ich bin heute krank und bleibe zu Hause. Kannst du bitte den Termin mit Frau Weber um 11 Uhr übernehmen?

Die Unterlagen liegen auf meinem Schreibtisch, im blauen Ordner. Der Schlüssel für das Zimmer ist bei Herrn Roth.

Morgen bin ich wieder da. Danke dir!

Katrin`,
              gloss: [
                { de: "die Unterlagen", tr: "evraklar", en: "documents" },
                { de: "übernehmen", tr: "devralmak, üstlenmek", en: "to take over" },
                { de: "der Ordner", tr: "klasör", en: "folder" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Brief der Vermieterin",
              genreTr: "Ev sahibinden mektup",
              title: "An Frau Adamu, Wohnung 4 A",
              body: `Sehr geehrte Frau Adamu,

am Dienstag kommt der Handwerker und repariert die Heizung in Ihrer Wohnung. Er kommt zwischen 9 und 12 Uhr.

Bitte bleiben Sie zu Hause. Sie können mir auch Ihren Schlüssel geben. Ich wohne im Erdgeschoss, Wohnung 1.

Mit freundlichen Grüßen
S. Brandt`,
              gloss: [
                { de: "der Handwerker", tr: "tamirci, usta", en: "repairman" },
                { de: "die Heizung", tr: "kalorifer", en: "heating" },
                { de: "das Erdgeschoss", tr: "zemin kat", en: "ground floor" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-02-l1-1",
              no: 1,
              ref: "t1",
              text: "Katrin kommt heute nicht ins Büro.",
              answer: true,
              explain:
                "\"ich bin heute krank und bleibe zu Hause\" — bugün evde. Yarın döneceğini de yazıyor, yani bugünkü yokluğu kesin.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l1-2",
              no: 2,
              ref: "t1",
              text: "Deniz muss die Unterlagen bei Katrin zu Hause abholen.",
              answer: false,
              explain:
                "Evraklar Katrin'in ofisteki masasında, mavi klasörde. Evden alınacak bir şey yok; evde olan Katrin'in kendisi.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l1-3",
              no: 3,
              ref: "t2",
              text: "Der Handwerker kommt am Nachmittag.",
              answer: false,
              explain:
                "Usta 9 ile 12 arası geliyor; bu sabah saatidir (Vormittag). `zwischen … und …` iki saat arasını gösterir.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l1-4",
              no: 4,
              ref: "t2",
              text: "Frau Adamu kann ihren Schlüssel bei Frau Brandt lassen.",
              answer: true,
              explain:
                "\"Sie können mir auch Ihren Schlüssel geben\" — evde kalmak zorunlu değil, anahtarı bırakmak ikinci seçenek.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l1-5",
              no: 5,
              ref: "t2",
              text: "Frau Brandt wohnt im gleichen Haus.",
              answer: true,
              explain:
                "\"Ich wohne im Erdgeschoss, Wohnung 1\" — aynı binanın zemin katında oturuyor. Mektubun üstündeki adres de aynı binayı gösteriyor (Wohnung 4 A).",
            },
          ],
        },
        {
          id: "de-a1-02-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt: "Lesen Sie die Situationen 6 bis 10 und die zwei Anzeigen dazu. Wo finden Sie die Information: a oder b?",
          promptTr: "6–10. durumları ve yanlarındaki iki ilanı oku. Bilgiyi nerede bulursun: a mı b mi?",
          items: [
            {
              kind: "mcq",
              id: "de-a1-02-l2-6",
              no: 6,
              text: "Sie suchen eine kleine Wohnung für eine Person in der Stadt.",
              options: [
                "Wohnung frei ab 1. Juni\n1 Zimmer, 32 m², Küche und Bad\nStadtmitte, 4. Stock\n420 € warm",
                "Haus zu verkaufen\n5 Zimmer, 140 m², großer Garten\n20 km von der Stadt, ruhige Lage\nBesichtigung nach Termin\n240 000 €",
              ],
              answer: 0,
              explain:
                "İstenen: şehirde, tek kişilik küçük daire. (a) tek odalı, 32 m², şehir merkezinde ve kiralık. (b) satılık, beş odalı ve şehirden 20 km uzakta.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-l2-7",
              no: 7,
              text: "Sie möchten am Wochenende arbeiten und suchen einen Job.",
              options: [
                "Sprachkurse für den Beruf\nDeutsch am Arbeitsplatz\nDienstag und Donnerstag, 18 Uhr",
                "Café Löwe sucht Aushilfe\nSamstag und Sonntag, 10–16 Uhr\n14 € pro Stunde\nTelefon 0341 22 08 71",
              ],
              answer: 1,
              explain:
                "Aranan şey hafta sonu bir iş. (b) cumartesi-pazar çalışacak eleman arıyor ve saat ücretini veriyor. (a) bir dil kursu; iş değil, üstelik hafta içi.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-l2-8",
              no: 8,
              text: "Ihre Waschmaschine ist kaputt. Sie brauchen heute saubere Wäsche.",
              options: [
                "Waschsalon Blau\ntäglich 6–23 Uhr\nWaschen 4 €, Trocknen 2 €\nkeine Anmeldung nötig",
                "Elektro Simon\nWir reparieren Waschmaschinen und Trockner\nAlle Marken, auch ältere Geräte\nTermine erst ab nächster Woche",
              ],
              answer: 0,
              explain:
                "Bugün temiz çamaşır lazım. (a) çamaşırhane, her gün açık, randevusuz. (b) makineyi tamir eder ama randevular gelecek haftadan itibaren — bugün işe yaramaz.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-l2-9",
              no: 9,
              text: "Sie möchten wissen, wie viel Ihre Wohnung im Monat kostet.",
              options: [
                "Möbelhaus Nord\nSofas, Tische, Betten\ndiese Woche 15 % günstiger",
                "Hausverwaltung Nord\nFragen zu Miete und Nebenkosten\nSprechstunde Montag und Mittwoch, 9–12 Uhr",
              ],
              answer: 1,
              explain:
                "Aylık konut gideri kira ve aidattır. (b) tam bunu yanıtlıyor: `Miete und Nebenkosten`. (a) mobilya satıyor — aynı sözcük \"Nord\" iki ilanda da geçiyor, bu bir çeldirici.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-l2-10",
              no: 10,
              text: "Die Lampe im Wohnzimmer geht nicht mehr. Sie brauchen Hilfe.",
              options: [
                "Malerbetrieb Frey\nWir streichen Ihre Wohnung, innen und außen\nAuch Tapeten und Böden\nkostenlose Beratung bei Ihnen zu Hause",
                "Elektriker Yıldız\nLampen, Steckdosen, Kabel\nauch abends und am Samstag",
              ],
              answer: 1,
              explain:
                "Lamba elektrik işidir. (b) lamba, priz ve kablo yazıyor. (a) boyacı; duvar boyar, lambayı değil.",
            },
          ],
        },
        {
          id: "de-a1-02-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild in der Waschküche",
              genreTr: "Çamaşırlıktaki levha",
              body: `WASCHKÜCHE

Bitte tragen Sie sich in die Liste ein.
Jede Wohnung hat zwei Tage pro Woche.

Nach 22 Uhr bitte nicht waschen.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Zettel am Briefkasten",
              genreTr: "Posta kutusundaki not",
              body: `Keine Werbung, bitte!

Zeitungen und Briefe
bitte hier einwerfen.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Zettel am Kopierer",
              genreTr: "Fotokopi makinesindeki not",
              body: `Kopierer defekt.

Der zweite Kopierer steht
in Raum 214.

Papier finden Sie im Schrank daneben.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Schild am Eingang",
              genreTr: "Giriş kapısındaki levha",
              body: `Besucher melden sich bitte
am Empfang im Erdgeschoss.

Ohne Ausweis kein Zutritt.`,
            },
            {
              kind: "text",
              id: "s5",
              genre: "Schild am Automaten",
              genreTr: "Otomattaki levha",
              body: `Dieser Automat nimmt nur Münzen.

Karten und Scheine
funktionieren hier nicht.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-02-l3-11",
              no: 11,
              ref: "s1",
              text: "Sie dürfen um 23 Uhr Wäsche waschen.",
              answer: false,
              explain:
                "\"Nach 22 Uhr bitte nicht waschen\" — saat 22'den sonra yasak, 23 de bunun içinde.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l3-12",
              no: 12,
              ref: "s2",
              text: "Briefe dürfen in diesen Briefkasten.",
              answer: true,
              explain:
                "Not yalnız reklamı geri çeviriyor (`Keine Werbung`); gazete ve mektup için \"bitte hier einwerfen\" yazıyor. Yasak tüm posta için değil, sadece reklam için.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l3-13",
              no: 13,
              ref: "s3",
              text: "In Raum 214 können Sie kopieren.",
              answer: true,
              explain:
                "Bozuk olan buradaki makine; ikinci makine 214 numaralı odada duruyor ve kâğıdı da yanındaki dolapta.",
            },
            {
              kind: "bool",
              id: "de-a1-02-l3-14",
              no: 14,
              ref: "s4",
              text: "Besucher können direkt in die Büros gehen.",
              answer: false,
              explain:
                "Önce zemin kattaki resepsiyona uğramak gerekiyor; kimliksiz giriş yok (`kein Zutritt`).",
            },
            {
              kind: "bool",
              id: "de-a1-02-l3-15",
              no: 15,
              ref: "s5",
              text: "Sie können mit einem Zehn-Euro-Schein bezahlen.",
              answer: false,
              explain:
                "Otomat yalnız madeni para (`Münzen`) alıyor; kâğıt para (`Scheine`) ve kart çalışmıyor. 10 euro bir banknottur.",
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
          id: "de-a1-02-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch beim Bäcker",
              genreTr: "Fırında konuşma",
              situation: "Bir müşteri ekmek alıyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Guten Morgen. Ich möchte zwei Brötchen und ein Brot, bitte." },
                { speaker: "Verkäufer", text: "Ein Brötchen kostet sechzig Cent, das Brot drei Euro zwanzig." },
                { speaker: "Kundin", text: "Oh, dann nehme ich heute nur das Brot." },
                { speaker: "Verkäufer", text: "Gern. Drei Euro zwanzig, bitte." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch unter Freunden",
              genreTr: "Arkadaşlar arasında konuşma",
              situation: "İki arkadaş işten konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Frau", text: "Arbeitest du noch im Krankenhaus?" },
                { speaker: "Mann", text: "Nein, seit März nicht mehr. Jetzt bin ich in einer Apotheke." },
                { speaker: "Frau", text: "Und deine Schwester?" },
                { speaker: "Mann", text: "Sie ist immer noch im Krankenhaus." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Büro",
              genreTr: "Ofiste konuşma",
              situation: "İki çalışan toplantı saatini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Ott", text: "Die Besprechung ist um zehn, oder?" },
                { speaker: "Frau Lang", text: "Sie war um zehn. Jetzt fängt sie erst um halb elf an." },
                { speaker: "Herr Ott", text: "Gut, dann habe ich noch Zeit für einen Kaffee." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch am Arbeitsplatz",
              genreTr: "İş yerinde konuşma",
              situation: "Bir meslektaş nasıl işe geldiğini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Mann", text: "Fährst du mit dem Auto ins Büro?" },
                { speaker: "Frau", text: "Nein, das Auto ist zu teuer in der Stadt. Ich fahre mit dem Rad." },
                { speaker: "Mann", text: "Auch im Winter?" },
                { speaker: "Frau", text: "Im Winter nehme ich die Straßenbahn." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch im Supermarkt",
              genreTr: "Markette konuşma",
              situation: "Bir müşteri kahvenin yerini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Entschuldigung, wo finde ich Kaffee?" },
                { speaker: "Mitarbeiterin", text: "Kaffee und Tee sind im Gang drei, gleich neben dem Zucker." },
                { speaker: "Kunde", text: "Und Milch?" },
                { speaker: "Mitarbeiterin", text: "Milch ist hinten links, im Kühlregal." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın restoranda masa ayırtıyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Kern", text: "Guten Tag, ich möchte einen Tisch für Freitag reservieren." },
                { speaker: "Kellner", text: "Gern. Für wie viele Personen?" },
                { speaker: "Frau Kern", text: "Wir sind zu sechst. Moment — Tarek kommt nicht. Also fünf." },
                { speaker: "Kellner", text: "Fünf Personen, Freitag. Um wie viel Uhr?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-02-h1-1",
              no: 1,
              ref: "a1",
              text: "Was bezahlt die Kundin?",
              options: ["3,20 Euro.", "60 Cent.", "4,40 Euro."],
              answer: 0,
              explain:
                "İki ekmek + bir somun 4,40 ederdi, ama müşteri fikrini değiştirip yalnız somunu alıyor: 3,20. Fiyat duyulduktan SONRA gelen karar belirleyici.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h1-2",
              no: 2,
              ref: "a2",
              text: "Wo arbeitet der Mann jetzt?",
              options: ["Im Krankenhaus.", "In einer Praxis.", "In einer Apotheke."],
              answer: 2,
              explain:
                "Hastane geçmişte kaldı (`seit März nicht mehr`); şimdi eczanede. Hâlâ hastanede olan kız kardeşi.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h1-3",
              no: 3,
              ref: "a3",
              text: "Wann beginnt die Besprechung?",
              options: ["Um zehn Uhr.", "Um halb elf.", "Um elf Uhr."],
              answer: 1,
              explain:
                "\"Sie war um zehn\" — saat ondu, değişti. Yeni saat 10.30 (`halb elf`). Almancada `halb elf` on buçuk demektir, on bir buçuk değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h1-4",
              no: 4,
              ref: "a4",
              text: "Wie kommt die Frau im Winter zur Arbeit?",
              options: ["Mit dem Auto.", "Mit dem Rad.", "Mit der Straßenbahn."],
              answer: 2,
              explain:
                "Normalde bisiklet, ama soru kışı soruyor: \"Im Winter nehme ich die Straßenbahn\". Araba zaten baştan eleniyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h1-5",
              no: 5,
              ref: "a5",
              text: "Wo findet der Kunde den Kaffee?",
              options: ["Im Gang drei.", "Im Kühlregal.", "Hinten links."],
              answer: 0,
              explain:
                "Kahve üçüncü koridorda, şekerin yanında. Soğutucu ve \"arka solda\" sütün yeri — iki ürünü karıştırmamak gerekiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h1-6",
              no: 6,
              ref: "a6",
              text: "Für wie viele Personen ist der Tisch?",
              options: ["Für sechs.", "Für fünf.", "Für vier."],
              answer: 1,
              explain:
                "Önce altı deniyor, sonra düzeltiliyor: Tarek gelmiyor, yani beş. Garson da \"Fünf Personen\" diye onaylıyor.",
            },
          ],
        },
        {
          id: "de-a1-02-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Bürohaus",
              genreTr: "İş merkezinde anons",
              situation: "Çalışanlara duyuru.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für alle Mitarbeiter: Morgen früh testen wir den Feueralarm. Der Alarm kommt kurz nach acht Uhr. Bitte bleiben Sie an Ihrem Arbeitsplatz.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Baumarkt",
              genreTr: "Yapı marketinde anons",
              situation: "Kampanya duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, heute ist der letzte Tag für unser Sommerangebot. Alle Gartenmöbel sind dreißig Prozent günstiger. Ab morgen gelten wieder die normalen Preise.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage in der Straßenbahn",
              genreTr: "Tramvayda anons",
              situation: "Hat değişikliği duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Nächste Haltestelle: Hauptpost. Hier fahren auch die Linien acht und zwölf. Bitte beachten Sie: Die Linie acht fährt heute nur bis zum Stadtpark.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Ansage am Telefon",
              genreTr: "Telefondaki sesli mesaj",
              situation: "Bir yönetim şirketinin telefon anonsu.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist die Hausverwaltung Berger. Unser Büro ist heute geschlossen. Sie erreichen uns wieder am Montag ab neun Uhr.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-02-h2-7",
              no: 7,
              ref: "d1",
              text: "Die Mitarbeiter sollen morgen an ihrem Platz bleiben.",
              answer: true,
              explain:
                "\"Bitte bleiben Sie an Ihrem Arbeitsplatz\" — alarm bir deneme, bina boşaltılmayacak.",
            },
            {
              kind: "bool",
              id: "de-a1-02-h2-8",
              no: 8,
              ref: "d2",
              text: "Das Angebot gilt auch morgen.",
              answer: false,
              explain:
                "Bugün son gün; yarından itibaren normal fiyatlar geçerli. `ab morgen` sınırı çiziyor.",
            },
            {
              kind: "bool",
              id: "de-a1-02-h2-9",
              no: 9,
              ref: "d3",
              text: "Die Linie acht fährt heute nicht die ganze Strecke.",
              answer: true,
              explain:
                "\"nur bis zum Stadtpark\" — hattın tamamı gidilmiyor, park son durak oluyor.",
            },
            {
              kind: "bool",
              id: "de-a1-02-h2-10",
              no: 10,
              ref: "d4",
              text: "Das Büro ist heute geöffnet.",
              answer: false,
              explain:
                "\"Unser Büro ist heute geschlossen\" — bugün kapalı, pazartesi dokuzdan itibaren açık.",
            },
          ],
        },
        {
          id: "de-a1-02-h3",
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
              situation: "Bir muayenehane randevu değişikliği bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Sahin, hier ist die Praxis Neumann. Ihr Termin am Mittwoch um vierzehn Uhr geht leider nicht. Wir haben Donnerstag um neun Uhr frei. Bitte rufen Sie zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Gespräch bei der Wohnungsbesichtigung",
              genreTr: "Daire gezme sırasında konuşma",
              situation: "Bir kiracı adayı kirayı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Interessent", text: "Wie hoch ist die Miete?" },
                { speaker: "Vermieterin", text: "Vierhundertfünfzig Euro kalt. Mit Heizung und Wasser sind es fünfhundertneunzig." },
                { speaker: "Interessent", text: "Und der Strom?" },
                { speaker: "Vermieterin", text: "Den zahlen Sie extra." },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Gespräch mit der Chefin",
              genreTr: "Patronla konuşma",
              situation: "Fazla mesai konuşuluyor.",
              plays: 2,
              segments: [
                { speaker: "Chefin", text: "Herr Bilic, können Sie am Freitag länger bleiben?" },
                { speaker: "Herr Bilic", text: "Freitag habe ich einen Arzttermin. Aber Donnerstag geht." },
                { speaker: "Chefin", text: "Gut, dann Donnerstag bis achtzehn Uhr." },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir kız babasına mesaj bırakıyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Papa, ich bin es, Mira. Der Bus hat Verspätung, ich komme erst um halb sieben. Kannst du bitte den Hund rausbringen? Bis später!",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Gespräch am Empfang",
              genreTr: "Resepsiyonda konuşma",
              situation: "Bir ziyaretçi kime gideceğini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Besucherin", text: "Guten Tag, ich habe einen Termin bei Frau Özkan." },
                { speaker: "Empfang", text: "Frau Özkan ist im dritten Stock, Zimmer dreihundertzwölf." },
                { speaker: "Besucherin", text: "Danke. Und wo kann ich meinen Mantel lassen?" },
                { speaker: "Empfang", text: "Die Garderobe ist gleich hier links." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-02-h3-11",
              no: 11,
              ref: "m1",
              text: "Wann war der alte Termin?",
              options: ["Donnerstag um neun Uhr.", "Mittwoch um vierzehn Uhr.", "Donnerstag um vierzehn Uhr."],
              answer: 1,
              explain:
                "\"Ihr Termin am Mittwoch um vierzehn Uhr\" iptal olan randevu; perşembe dokuz yeni teklif. Soru ESKİ randevuyu soruyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h3-12",
              no: 12,
              ref: "m2",
              text: "Wie viel kostet die Wohnung warm?",
              options: ["450 Euro.", "500 Euro.", "590 Euro."],
              answer: 2,
              explain:
                "`kalt` ısıtma ve su hariç kira (450), `warm` bunlar dahil (590). Elektrik ikisine de dahil değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h3-13",
              no: 13,
              ref: "m3",
              text: "An welchem Tag arbeitet Herr Bilic länger?",
              options: ["Am Donnerstag.", "Am Freitag.", "Am Samstag."],
              answer: 0,
              explain:
                "«Freitag habe ich einen Arzttermin. Aber Donnerstag geht» — cuma teklif ediliyor, doktor randevusu yüzünden reddediliyor, perşembede anlaşılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h3-14",
              no: 14,
              ref: "m4",
              text: "Was soll der Vater machen?",
              options: ["Mira abholen.", "Mit dem Hund rausgehen.", "Das Essen kochen."],
              answer: 1,
              explain:
                "Tek rica bu: \"Kannst du bitte den Hund rausbringen?\" Otobüs gecikmesi yalnız neden geç kalacağını açıklıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-02-h3-15",
              no: 15,
              ref: "m5",
              text: "In welchem Zimmer arbeitet Frau Özkan?",
              options: ["Zimmer 213.", "Zimmer 302.", "Zimmer 312."],
              answer: 2,
              explain:
                "\"dreihundertzwölf\" 312 demek. 302 ve 213 aynı rakamlardan kurulmuş çeldiriciler; üç haneli sayıları dinlemek A1'in kendi ölçütü.",
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
          id: "de-a1-02-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihr Nachbar Omar Haddad möchte einen Bibliotheksausweis. Er ist am 4. März 1990 geboren. Er wohnt in der Gartenstraße 21, 99084 Erfurt. Er ist Koch. Den Ausweis möchte er für ein Jahr. Im Formular fehlen fünf Informationen. Schreiben Sie sie in die Lücken.",
          promptTr:
            "Komşun Omar Haddad kütüphane kartı istiyor. 4 Mart 1990 doğumlu. Gartenstraße 21, 99084 Erfurt adresinde oturuyor. Mesleği aşçı. Kartı bir yıllığına istiyor. Formda beş bilgi eksik; boşluklara yaz.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Antrag — Bibliotheksausweis",
              body: `Familienname, Vorname:    Haddad, Omar
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Erfurt
Beruf:                    {{4}}
Ausweis gültig für:       {{5}}
Unterschrift:             O. Haddad`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-02-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["04.03.1990", "4.3.1990", "4. März 1990", "04.03.90"],
              explain: "Doğum tarihi \"4. März 1990\" olarak veriliyor. Almanca formda gün.ay.yıl sırasıyla yazılır: 04.03.1990.",
            },
            {
              kind: "gap",
              id: "de-a1-02-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Gartenstraße 21", "Gartenstrasse 21", "Gartenstr. 21"],
              explain: "Sokak adı ve kapı numarası birlikte yazılır. `-straße` kısaltması (`-str.`) da kabul edilir.",
            },
            {
              kind: "gap",
              id: "de-a1-02-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["99084"],
              explain: "Erfurt'un posta kodu yönergede veriliyor: 99084. Şehir adı zaten formda yazılı.",
            },
            {
              kind: "gap",
              id: "de-a1-02-s1-4",
              no: 4,
              text: "Beruf",
              accept: ["Koch"],
              explain: "\"Er ist Koch\" — meslek aşçı. Almancada meslek adı artikelsiz yazılır.",
            },
            {
              kind: "gap",
              id: "de-a1-02-s1-5",
              no: 5,
              text: "Ausweis gültig für",
              accept: ["ein Jahr", "1 Jahr", "12 Monate", "ein Jahr lang"],
              explain: "\"Den Ausweis möchte er für ein Jahr\" — geçerlilik süresi bir yıl.",
            },
          ],
        },
        {
          id: "de-a1-02-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie können am Samstag nicht zum Deutschkurs kommen. Schreiben Sie eine Nachricht an Ihre Lehrerin, Frau Bauer. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Cumartesi Almanca kursuna gidemeyeceksin. Öğretmenin Frau Bauer'e bir ileti yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Warum können Sie nicht kommen?", tr: "Neden gelemiyorsun?" },
              { de: "Fragen Sie nach den Hausaufgaben.", tr: "Ödevleri sor." },
            ],
            sample: `Liebe Frau Bauer,

leider kann ich am Samstag nicht zum Kurs kommen. Meine Schwester heiratet und ich fahre nach Bremen. Können Sie mir bitte die Hausaufgaben schicken?

Vielen Dank und liebe Grüße
Nadia Amiri`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Hitap kişiye uygun mu? Öğretmene `Liebe Frau Bauer` ve `Sie` ile yazılır.",
              "Gelememe nedeni tek cümleyle olsa da söyleniyor mu?",
              "Ödev sorusu gerçekten SORU biçiminde mi kurulmuş?",
              "Yaklaşık 30 kelime var mı?",
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
          id: "de-a1-02-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt: "Stellen Sie sich vor. Sprechen Sie zu den Stichwörtern: Name — Alter — Land — Wohnort — Familie — Arbeit — Sprachen.",
          promptTr: "Kendini tanıt. Şu anahtar sözcüklere göre konuş: ad — yaş — ülke — yaşadığın yer — aile — iş — diller.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Name, Alter, Land", tr: "Ad, yaş, ülke" },
              { de: "Wohnort und Familie", tr: "Yaşadığın yer ve aile" },
              { de: "Arbeit und Sprachen", tr: "İş ve diller" },
            ],
            sample:
              "Ich heiße Omar Haddad. Ich bin fünfunddreißig Jahre alt und komme aus Syrien. Ich wohne jetzt in Erfurt, in der Gartenstraße. Ich bin verheiratet und habe eine Tochter. Ich arbeite als Koch in einem Restaurant. Ich spreche Arabisch, Englisch und Deutsch.",
            criteria: [
              "Yedi anahtar sözcüğün her birine değinildi mi?",
              "\"Ich bin … Jahre alt\" ve \"Ich komme aus …\" kalıpları doğru kuruldu mu?",
              "Meslek `als` ile ya da artikelsiz söylendi mi? (Ich arbeite als Koch / Ich bin Koch)",
              "Anlaşılır bir tempoda mı konuşuldu?",
            ],
          },
        },
        {
          id: "de-a1-02-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt: "Thema: Wohnen. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Wohnung — Zimmer — Miete — Nachbarn — Balkon.",
          promptTr: "Konu: Konut. Her anahtar sözcük için bir soru kur ve cevapla: daire — oda — kira — komşular — balkon.",
          prepSeconds: 30,
          exchange: [
            { who: "partner", de: "Unser Thema ist Wohnen. Ihr erstes Stichwort ist: Wohnung. Stellen Sie mir bitte eine Frage.", tr: "Konumuz konut. İlk sözcüğün: daire. Bana bir soru sor." },
            { who: "you", hint: "«Wohnung» sözcüğüyle bir soru kur.", expect: "Wohnung sözcüğüyle doğru bir soru kurmak", seconds: 25 },
            { who: "partner", de: "Meine Wohnung liegt im dritten Stock. Ihr nächstes Stichwort ist: Miete.", tr: "Dairem üçüncü katta. Sıradaki sözcüğün: kira." },
            { who: "you", hint: "Kirayı sor.", expect: "fiyat ya da miktar soran bir soru kurmak (Wie hoch … / Was kostet …)", seconds: 25 },
            { who: "partner", de: "Sie kostet fünfhundert Euro warm. Und jetzt eine Frage an Sie: Wie viele Zimmer hat Ihre Wohnung?", tr: "Isıtma dahil beş yüz euro. Şimdi sana bir soru: Senin dairen kaç odalı?" },
            { who: "you", hint: "Soruyu cevapla.", expect: "sayı içeren tam bir cümleyle cevap vermek", seconds: 25 },
            { who: "partner", de: "Danke. Noch eine Frage: Sind Ihre Nachbarn nett?", tr: "Teşekkürler. Bir soru daha: Komşuların iyi mi?" },
            { who: "you", hint: "Komşularını kısaca anlat.", expect: "evet/hayır sorusuna kısa bir gerekçeyle cevap vermek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wo ist deine Wohnung? — Meine Wohnung ist im Zentrum. Wie viele Zimmer hast du? — Ich habe zwei Zimmer. Wie hoch ist die Miete? — Sie kostet vierhundert Euro. Sind die Nachbarn nett? — Ja, sie sind sehr nett. Hast du einen Balkon? — Nein, leider nicht.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "W-sorusunda fiil ikinci sırada mı? (Wie hoch ist …)",
              "Evet/hayır sorusunda fiil başta mı? (Hast du …)",
              "Cevaplar tam cümle mi, yoksa yalnız tek kelime mi?",
            ],
          },
        },
        {
          id: "de-a1-02-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie brauchen Hilfe beim Umzug. — Sie möchten das Licht anmachen. — Jemand bittet Sie um Ihr Ladekabel.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Taşınmak için yardım lazım. — Işığı açmak istiyorsun. — Biri senden şarj kablonu istiyor.",
          prepSeconds: 20,
          exchange: [
            { who: "partner", de: "Wir üben Bitten. Erste Situation: Sie ziehen am Samstag um und brauchen Hilfe. Bitten Sie mich.", tr: "Rica etmeyi çalışıyoruz. İlk durum: Cumartesi taşınıyorsun ve yardıma ihtiyacın var. Benden iste." },
            { who: "you", hint: "Taşınma için yardım iste.", expect: "kibar bir rica kalıbıyla yardım istemek ve günü söylemek", seconds: 25 },
            { who: "partner", de: "Am Samstag habe ich Zeit, das mache ich gern. Zweite Situation: Es ist dunkel. Fragen Sie, ob Sie das Licht anmachen dürfen.", tr: "Cumartesi vaktim var, memnuniyetle. İkinci durum: Ortalık karanlık. Işığı açıp açamayacağını sor." },
            { who: "you", hint: "Işığı açmak için izin iste.", expect: "izin sormak (Darf ich …)", seconds: 20 },
            { who: "partner", de: "Ja, bitte. Jetzt eine Bitte von mir: Leihen Sie mir bitte Ihr Ladekabel?", tr: "Evet, aç lütfen. Şimdi benden bir rica: Şarj kablonu bana ödünç verir misin?" },
            { who: "you", hint: "Ricaya karşılık ver: kabul et ya da gerekçeyle reddet.", expect: "bir ricaya kabul ya da gerekçeli ret ile karşılık vermek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "zustimmen oder höflich ablehnen", tr: "Kabul etmek ya da kibarca reddetmek" },
            ],
            sample:
              "Kannst du mir am Samstag beim Umzug helfen? — Ja, gern. Um wie viel Uhr? Darf ich das Licht anmachen? — Ja, natürlich. Gibst du mir bitte dein Ladekabel? — Tut mir leid, mein Handy lädt gerade. In zwanzig Minuten kannst du es haben.",
            criteria: [
              "Rica kibar bir kalıpla kuruldu mu? (Kannst du … / Darf ich … / Können Sie …)",
              "`bitte` sözcüğü kullanıldı mı?",
              "Hem kabul hem ret örneği verildi mi?",
              "Ret kısa bir gerekçeyle yumuşatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
