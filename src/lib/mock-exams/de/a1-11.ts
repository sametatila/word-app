import type { MockPaper } from "../types";

/**
 * A1 · Deneme 11 — "Nachbarn und Haus".
 *
 * PLAN kâğıt 1–10 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: apartman hayatı. "Wohnen und Arbeit" kâğıdı eve girmişti ama
 * binaya girmemişti: çamaşırhane listesi, çöp ayrımı, komşunun aldığı paket,
 * saat 22 kuralı. A1 öğrencisinin Almanya'da ilk haftasında karşılaştığı
 * metinler tam olarak bunlar.
 *
 * DİKKAT EDİLEN: bu alanın metinleri kural metinleri, yani hepsi bir izin ya
 * da yasak bildiriyor. Maddeler bilerek `darf` ve `muss` ekseninde kuruldu;
 * A1'de zorluk kelimede değil, iznin kime ve neye verildiğini ayırmakta.
 */
export const A1_11: MockPaper = {
  id: "de-a1-11",
  course: "de",
  level: "A1",
  no: 11,
  theme: "Nachbarn und Haus",
  themeTr: "Komşular ve apartman",
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
          id: "de-a1-11-l1",
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
              title: "Von: i.radtke@mail.de",
              body: `Hallo Frau Adamek,

heute Vormittag war der Bote da. Ich habe Ihr Paket angenommen.

Es steht bei mir im Flur. Ich bin heute bis 19 Uhr zu Hause.

Am Wochenende fahre ich weg. Bitte kommen Sie heute oder morgen.

Viele Grüße
Ilse Radtke, Wohnung 4`,
              gloss: [
                { de: "das Paket", tr: "koli", en: "parcel" },
                { de: "annehmen", tr: "teslim almak", en: "to accept" },
                { de: "der Flur", tr: "koridor", en: "hallway" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Treppenhaus",
              genreTr: "Merdiven boşluğundaki duyuru",
              body: `Liebe Hausbewohner,

die Waschküche ist ab Montag wieder offen.

Bitte tragen Sie Ihren Namen in die Liste ein.

Jede Wohnung hat zwei Termine pro Woche.

Nach dem Waschen bitte den Boden trocken wischen.

Ihre Hausverwaltung`,
              gloss: [
                { de: "die Waschküche", tr: "çamaşırhane", en: "laundry room" },
                { de: "eintragen", tr: "(listeye) yazmak", en: "to enter, sign up" },
                { de: "wischen", tr: "silmek", en: "to wipe" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-11-l1-1",
              no: 1,
              ref: "t1",
              text: "Das Paket ist bei Frau Radtke.",
              answer: true,
              explain:
                "Komşu koliyi almış ve yerini söylüyor: \"Es steht bei mir im Flur\".",
            },
            {
              kind: "bool",
              id: "de-a1-11-l1-2",
              no: 2,
              ref: "t1",
              text: "Frau Adamek kann das Paket am Samstag holen.",
              answer: false,
              explain:
                "Hafta sonu olmuyor: \"Am Wochenende fahre ich weg. Bitte kommen Sie heute oder morgen.\"",
            },
            {
              kind: "bool",
              id: "de-a1-11-l1-3",
              no: 3,
              ref: "t1",
              text: "Frau Radtke ist heute bis 19 Uhr da.",
              answer: true,
              explain:
                "Saati kendisi veriyor: \"Ich bin heute bis 19 Uhr zu Hause\". Yani akşam yediye kadar kapıyı açabilecek biri var.",
            },
            {
              kind: "bool",
              id: "de-a1-11-l1-4",
              no: 4,
              ref: "t2",
              text: "Man kann ohne Liste waschen.",
              answer: false,
              explain:
                "Duyuru listeyi zorunlu kılıyor: \"Bitte tragen Sie Ihren Namen in die Liste ein\".",
            },
            {
              kind: "bool",
              id: "de-a1-11-l1-5",
              no: 5,
              ref: "t2",
              text: "Jede Wohnung bekommt zwei Termine in der Woche.",
              answer: true,
              explain:
                "\"Jede Wohnung hat zwei Termine pro Woche\" — `pro Woche` haftada demek.",
            },
          ],
        },
        {
          id: "de-a1-11-l2",
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
              id: "de-a1-11-l2-6",
              no: 6,
              text: "Es ist 23 Uhr. Ihr Schlüssel ist kaputt. Sie kommen nicht in die Wohnung.",
              options: [
                "Schlüsseldienst Ammann\nTag und Nacht\nin 30 Minuten bei Ihnen\nTel. 0221 774510",
                "Hausmeister Löbe\nBüro im Erdgeschoss\nSprechzeit nur Mo und Do\n8 bis 10 Uhr, sonst geschlossen",
              ],
              answer: 0,
              explain:
                "Saat 23. (a) gece de geliyor: `Tag und Nacht`. (b) yalnız sabah saatlerinde açık.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-l2-7",
              no: 7,
              text: "Sie möchten ein altes Sofa wegwerfen.",
              options: [
                "Möbelhaus Nord\nSofas und Sessel ab 199 Euro\nLieferung frei Haus, auch samstags\ntäglich 10 bis 20 Uhr",
                "Sperrmüll der Stadt\nAnmeldung im Internet\nAbholung in zwei Wochen\nkostenlos für Haushalte",
              ],
              answer: 1,
              explain:
                "Atılacak eşya için (b): `Sperrmüll` ve `Abholung`. (a) yeni koltuk satıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-l2-8",
              no: 8,
              text: "Ihr Fahrrad hat keine Luft. Sie brauchen eine Pumpe.",
              options: [
                "Fahrradkeller Haus 3\nLuftpumpe an der Wand\nfür alle Bewohner\nbitte zurückhängen",
                "Fahrradladen Süd\nneue Räder und Reifen\nWerkstatt nur nach Termin\nMo–Fr 9 bis 18 Uhr",
              ],
              answer: 0,
              explain:
                "(a) pompayı ücretsiz veriyor: `Luftpumpe an der Wand`. (b) randevu ister ve bisiklet satar.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-l2-9",
              no: 9,
              text: "Sie brauchen am Samstag Hilfe. Ein Schrank muss in den vierten Stock.",
              options: [
                "Möbelhaus Nord\nAufbau nach Termin\nnur werktags von 8 bis 16 Uhr\nAnmeldung eine Woche vorher",
                "Nachbarschaftshilfe Kiez\nTragen und Aufbauen\nauch samstags\n15 Euro pro Stunde",
              ],
              answer: 1,
              explain:
                "Cumartesi çalışan (b): `auch samstags`. (a) yalnız iş günleri geliyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-l2-10",
              no: 10,
              text: "Sie möchten wissen, wann die Heizung wieder läuft.",
              options: [
                "Hausverwaltung Dziuba\nFragen zu Heizung und Wasser\nTel. 0221 550310\nMo–Fr 9 bis 12 Uhr",
                "Elektro Kwiatkowski\nLampen, Steckdosen und Sicherungen\nNotdienst am Wochenende\nTel. 0221 663420",
              ],
              answer: 0,
              explain:
                "Kalorifer sorusu (a)'ya gider: `Fragen zu Heizung und Wasser`. (b) elektrik işi yapıyor.",
            },
          ],
        },
        {
          id: "de-a1-11-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild am Müllplatz",
              genreTr: "Çöp alanındaki levha",
              body: `Papier in die blaue Tonne.

Glas bitte zum Container an der Straße.

Sperrmüll nur nach Anmeldung.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild im Treppenhaus",
              genreTr: "Merdiven boşluğundaki levha",
              body: `Fahrräder bitte im Keller abstellen.

Ein Kinderwagen darf unter der Treppe stehen.

Ab 22 Uhr bitte leise sein.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-11-l3-11",
              no: 11,
              ref: "s1",
              text: "Glas kommt in die blaue Tonne.",
              answer: false,
              explain:
                "Mavi kutu kâğıt için. Cam sokaktaki konteynere gidiyor: \"Glas bitte zum Container an der Straße\".",
            },
            {
              kind: "bool",
              id: "de-a1-11-l3-12",
              no: 12,
              ref: "s1",
              text: "Für Sperrmüll muss man sich anmelden.",
              answer: true,
              explain:
                "Levha koşul koyuyor: \"Sperrmüll nur nach Anmeldung\" — `nur nach` kaydı zorunlu kılıyor, kaydı olmayan eşya bırakılamaz.",
            },
            {
              kind: "bool",
              id: "de-a1-11-l3-13",
              no: 13,
              ref: "s2",
              text: "Ein Kinderwagen darf im Treppenhaus bleiben.",
              answer: true,
              explain:
                "Bebek arabası için izin var: \"darf unter der Treppe stehen\". Merdivenin altı da merdiven boşluğunda.",
            },
            {
              kind: "bool",
              id: "de-a1-11-l3-14",
              no: 14,
              ref: "s2",
              text: "Fahrräder darf man im Treppenhaus abstellen.",
              answer: false,
              explain:
                "Bisikletler için başka bir yer veriliyor: \"bitte im Keller abstellen\".",
            },
            {
              kind: "bool",
              id: "de-a1-11-l3-15",
              no: 15,
              ref: "s2",
              text: "Nach 22 Uhr darf man laut sein.",
              answer: false,
              explain:
                "Levha tersini istiyor: \"Ab 22 Uhr bitte leise sein\" — `ab` o saatten sonrasını kapsıyor, yani gece sessizlik başlıyor.",
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
          id: "de-a1-11-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch im Treppenhaus",
              genreTr: "Merdiven boşluğunda konuşma",
              situation: "İki komşu çamaşırhaneyi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Adamek", text: "Wann ist die Waschküche frei?" },
                { speaker: "Frau Radtke", text: "Am Dienstag und am Freitag. Am Mittwoch wasche ich." },
                { speaker: "Frau Adamek", text: "Dann trage ich mich für Dienstag ein." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch mit dem Hausmeister",
              genreTr: "Kapıcıyla konuşma",
              situation: "Bir sakin kaloriferi soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Pohl", text: "Wann läuft die Heizung wieder?" },
                { speaker: "Hausmeister", text: "Ab Oktober. Im September ist sie noch aus." },
                { speaker: "Herr Pohl", text: "Das ist noch lange." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch an der Wohnungstür",
              genreTr: "Kapıda konuşma",
              situation: "Bir koli teslim ediliyor.",
              plays: 2,
              segments: [
                { speaker: "Bote", text: "Ein Paket für Frau Adamek. Sie ist nicht da." },
                { speaker: "Frau Radtke", text: "Ich nehme es an. Ich wohne in Wohnung vier." },
                { speaker: "Bote", text: "Danke. Bitte hier unterschreiben." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir sakin gürültüden şikâyet ediyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Dziuba", text: "Gestern war es bis ein Uhr laut." },
                { speaker: "Hausverwaltung", text: "Aus welcher Wohnung?" },
                { speaker: "Frau Dziuba", text: "Aus der Wohnung über mir. Ich wohne im zweiten Stock." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch am Müllplatz",
              genreTr: "Çöp alanında konuşma",
              situation: "İki komşu iri çöpü konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Löbe", text: "Wann kommt der Sperrmüll?" },
                { speaker: "Frau Radtke", text: "Am achtzehnten. Ich habe es angemeldet." },
                { speaker: "Herr Löbe", text: "Gut, dann stelle ich meinen Tisch dazu." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch vor dem Haus",
              genreTr: "Bina önünde konuşma",
              situation: "Biri anahtarını unutmuş.",
              plays: 2,
              segments: [
                { speaker: "Herr Pohl", text: "Ich habe meinen Schlüssel oben vergessen." },
                { speaker: "Frau Dziuba", text: "Ich mache Ihnen auf. Aber die Kellertür bleibt zu." },
                { speaker: "Herr Pohl", text: "Das reicht mir, danke." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-11-h1-1",
              no: 1,
              ref: "a1",
              text: "Wann wäscht Frau Adamek?",
              options: ["Am Mittwoch.", "Am Dienstag.", "Am Freitag."],
              answer: 1,
              explain:
                "Üç gün geçiyor. Boş olanlar salı ve cuma; kadın \"für Dienstag\" yazılıyor. Çarşamba komşusunun günü.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h1-2",
              no: 2,
              ref: "a2",
              text: "Ab wann läuft die Heizung?",
              options: ["Ab September.", "Ab November.", "Ab Oktober."],
              answer: 2,
              explain:
                "İki ay geçiyor: \"Im September ist sie noch aus\", çalışmaya başlaması ise \"Ab Oktober\". Kasım hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h1-3",
              no: 3,
              ref: "a3",
              text: "Was macht Frau Radtke?",
              options: ["Sie nimmt das Paket an.", "Sie ruft Frau Adamek an.", "Sie schickt es zurück."],
              answer: 0,
              explain:
                "Kararı kendisi söylüyor: \"Ich nehme es an\" — sonra da imza atıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h1-4",
              no: 4,
              ref: "a4",
              text: "Wo wohnt Frau Dziuba?",
              options: ["Im ersten Stock.", "Im dritten Stock.", "Im zweiten Stock."],
              answer: 2,
              explain:
                "\"Ich wohne im zweiten Stock\" — gürültü üstündeki daireden geliyor, yani üçüncü kattan.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h1-5",
              no: 5,
              ref: "a5",
              text: "Wann kommt der Sperrmüll?",
              options: ["Am 18.", "Am 8.", "Am 28."],
              answer: 0,
              explain:
                "Tarih kayıtta bir kez geçiyor: \"Am achtzehnten. Ich habe es angemeldet.\" Sekiz ve yirmi sekiz hiç söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h1-6",
              no: 6,
              ref: "a6",
              text: "Was bleibt zu?",
              options: ["Die Haustür.", "Die Kellertür.", "Die Wohnungstür."],
              answer: 1,
              explain:
                "Komşu binayı açıyor ama bir kapı açılmıyor: \"die Kellertür bleibt zu\".",
            },
          ],
        },
        {
          id: "de-a1-11-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sie hören vier Durchsagen. Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Dört anons dinleyeceksin. Cümleler doğru mu yanlış mı? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Haus",
              genreTr: "Binada anons",
              situation: "Su kesintisi.",
              plays: 1,
              segments: [
                {
                  text: "Achtung, eine Information für alle Bewohner. Am Donnerstag von acht bis zwölf Uhr gibt es kein Wasser. Bitte stellen Sie sich am Mittwoch etwas Wasser bereit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Haus",
              genreTr: "Binada anons",
              situation: "Asansör bakımda.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag. Der Aufzug wird am Montag repariert. Er ist den ganzen Tag aus. Ab Dienstag können Sie ihn wieder benutzen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage im Haus",
              genreTr: "Binada anons",
              situation: "Bahçe kapısı.",
              plays: 1,
              segments: [
                {
                  text: "Eine Bitte an alle: Das Gartentor bleibt jetzt im Winter geschlossen. Der Schlüssel dafür ist der kleine silberne. Bitte machen Sie es hinter sich zu.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Haus",
              genreTr: "Binada anons",
              situation: "Toplantı duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Nachbarn, am Freitag um neunzehn Uhr treffen wir uns im Hof. Wir sprechen über die Fahrräder im Keller. Bringen Sie bitte einen Stuhl mit.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-11-h2-7",
              no: 7,
              ref: "d1",
              text: "Am Donnerstag gibt es vormittags kein Wasser.",
              answer: true,
              explain:
                "Saatler kayıtta: \"von acht bis zwölf Uhr\" — bu öğleden öncesi.",
            },
            {
              kind: "bool",
              id: "de-a1-11-h2-8",
              no: 8,
              ref: "d2",
              text: "Der Aufzug ist am Dienstag kaputt.",
              answer: false,
              explain:
                "Tamir günü pazartesi. Salı için tersi söyleniyor: \"Ab Dienstag können Sie ihn wieder benutzen\".",
            },
            {
              kind: "bool",
              id: "de-a1-11-h2-9",
              no: 9,
              ref: "d3",
              text: "Das Gartentor bleibt im Winter offen.",
              answer: false,
              explain:
                "Anons tersini söylüyor: \"Das Gartentor bleibt jetzt im Winter geschlossen\".",
            },
            {
              kind: "bool",
              id: "de-a1-11-h2-10",
              no: 10,
              ref: "d4",
              text: "Zum Treffen soll man einen Stuhl mitbringen.",
              answer: true,
              explain:
                "Son cümle bunu istiyor: \"Bringen Sie bitte einen Stuhl mit\".",
            },
          ],
        },
        {
          id: "de-a1-11-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf Nachrichten. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş mesaj dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Yönetimden randevu.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Adamek, hier ist die Hausverwaltung. Der Handwerker kommt am Dienstag zwischen zehn und zwölf. Bitte seien Sie zu Hause.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Komşu anahtar soruyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo, hier ist Herr Löbe von unten. Ich fahre morgen weg. Können Sie meine Blumen gießen? Der Schlüssel ist bei Frau Radtke.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Elektrikçi gecikiyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist Elektro Kwiatkowski. Wir kommen heute leider nicht mehr. Passt es Ihnen am Donnerstag um neun?",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Koli kapıcıda.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Herr Pohl, hier ist der Hausmeister. Ihr Paket ist bei mir im Büro. Ich bin bis halb fünf da, danach erst wieder am Montag.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kira artışı bildirimi.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Dziuba, hier ist die Hausverwaltung. Der Brief zur Miete kommt diese Woche. Bitte antworten Sie uns bis Ende des Monats.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-11-h3-11",
              no: 11,
              ref: "m1",
              text: "Wann kommt der Handwerker?",
              options: ["Am Montag.", "Am Mittwoch.", "Am Dienstag."],
              answer: 2,
              explain:
                "Mesajda tek bir gün var: \"am Dienstag zwischen zehn und zwölf\".",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h3-12",
              no: 12,
              ref: "m2",
              text: "Was soll die Person tun?",
              options: ["Die Blumen gießen.", "Den Schlüssel abgeben.", "Herrn Löbe abholen."],
              answer: 0,
              explain:
                "Rica tek: \"Können Sie meine Blumen gießen?\" Anahtar zaten komşuda duruyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h3-13",
              no: 13,
              ref: "m3",
              text: "Was schlägt die Firma vor?",
              options: ["Heute später zu kommen.", "Am Donnerstag zu kommen.", "Einen neuen Anruf morgen."],
              answer: 1,
              explain:
                "Bugün gelemiyorlar ve yeni bir gün öneriyorlar: \"Passt es Ihnen am Donnerstag um neun?\"",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h3-14",
              no: 14,
              ref: "m4",
              text: "Bis wann kann Herr Pohl das Paket holen?",
              options: ["Bis 16:30 Uhr.", "Bis 17:30 Uhr.", "Bis Montag."],
              answer: 0,
              explain:
                "\"Ich bin bis halb fünf da\" — yani 16:30. Pazartesi bir sonraki gün.",
            },
            {
              kind: "mcq",
              id: "de-a1-11-h3-15",
              no: 15,
              ref: "m5",
              text: "Was soll Frau Dziuba tun?",
              options: ["Diese Woche zahlen.", "Den Brief abholen.", "Bis Monatsende antworten."],
              answer: 2,
              explain:
                "Mektup bu hafta geliyor, istenen ise cevap: \"Bitte antworten Sie uns bis Ende des Monats\".",
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
          id: "de-a1-11-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Nachbarin Anna Dziuba meldet Sperrmüll an. Sie helfen ihr beim Formular. Anna ist am 3. März 1979 geboren. Sie wohnt in der Kastanienallee 17 in 44137 Dortmund. Ihre Telefonnummer ist 0231 445208. Sie gibt einen Schrank ab. Füllen Sie das Formular aus.",
          promptTr:
            "Komşun Anna Dziuba iri çöp için kayıt yaptırıyor. Formu doldurmasına yardım ediyorsun. Anna 3 Mart 1979 doğumlu. Kastanienallee 17, 44137 Dortmund adresinde oturuyor. Telefon numarası 0231 445208. Bir dolap veriyor. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung Sperrmüll — Stadt Dortmund",
              body: `Familienname, Vorname:    Dziuba, Anna
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Dortmund
Telefon:                  {{4}}
Möbelstück:               {{5}}
Unterschrift:             A. Dziuba`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-11-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["03.03.1979", "3.3.1979", "3. März 1979", "03.03.79", "3.3.79"],
              explain:
                "Yönergede \"am 3. März 1979 geboren\" yazıyor. Mart yılın üçüncü ayı, o yüzden rakamla 03.03.1979 olur.",
            },
            {
              kind: "gap",
              id: "de-a1-11-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Kastanienallee 17"],
              explain:
                "Adres yönergede tam veriliyor: Kastanienallee 17. Cadde adı `-allee` ile bittiği için kısaltılmaz.",
            },
            {
              kind: "gap",
              id: "de-a1-11-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["44137"],
              explain:
                "\"in 44137 Dortmund\" — posta kodu beş haneli ve şehirden önce gelir. Şehir formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-11-s1-4",
              no: 4,
              text: "Telefon",
              accept: ["0231 445208", "0231445208"],
              explain:
                "Numara yönergede veriliyor: 0231 445208. Almanca formlarda alan kodu ile numara arasında boşluk bırakılır.",
            },
            {
              kind: "gap",
              id: "de-a1-11-s1-5",
              no: 5,
              text: "Möbelstück",
              accept: ["Schrank", "ein Schrank", "Schrank (1)"],
              explain:
                "Yönergenin son bilgisi: \"Sie gibt einen Schrank ab\". Bu satır eşyanın ne olduğunu soruyor.",
            },
          ],
        },
        {
          id: "de-a1-11-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Im Treppenhaus ist das Licht kaputt. Schreiben Sie an die Hausverwaltung. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Merdiven boşluğunda ışık bozuk. Bina yönetimine yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Sagen Sie, wo das Licht kaputt ist.", tr: "Işığın nerede bozuk olduğunu söyle." },
              { de: "Fragen Sie, wann jemand kommt.", tr: "Ne zaman birinin geleceğini sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

im Treppenhaus ist seit Montag das Licht kaputt. Am Abend ist es dort ganz dunkel.

Das Licht im dritten Stock geht nicht mehr. Im Keller ist es auch dunkel.

Wann kommt jemand?

Mit freundlichen Grüßen
Anna Dziuba`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Kuruma yazıldığı için `Sehr geehrte Damen und Herren` uygun.",
              "Yer en az bir kez tam olarak söylendi mi? (kat, bodrum)",
              "Soru gerçekten soru biçiminde mi kuruldu?",
              "Yaklaşık 30 kelime yazıldı mı ve kuruma yazıldığı için `Sie` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: vom Wohnen erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: oturduğun yeri anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-11-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von Ihrem Haus. Sprechen Sie zu den Stichwörtern: Stock — Zimmer — Nachbarn — Keller — Müll — laut oder leise.",
          promptTr:
            "Oturduğun binayı anlat. Şu anahtar sözcüklere göre konuş: kat — odalar — komşular — bodrum — çöp — gürültülü mü sessiz mi.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Stock und Zimmer nennen", tr: "Katı ve odaları söylemek" },
              { de: "von den Nachbarn erzählen", tr: "Komşulardan söz etmek" },
              { de: "sagen, wo der Müll hinkommt", tr: "Çöpün nereye gittiğini söylemek" },
            ],
            sample:
              "Ich wohne im dritten Stock. Meine Wohnung hat zwei Zimmer, eine Küche und ein Bad. Meine Nachbarin heißt Frau Radtke. Sie ist sehr nett. Im Keller habe ich mein Fahrrad. Der Müll kommt in die Tonnen im Hof. Papier in die blaue Tonne. Am Abend ist es bei uns leise.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Kat ve oda sayısı söylendi mi?",
              "Komşu hakkında en az bir cümle var mı?",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-11-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Wohnen. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Stock — Miete — Aufzug — Waschküche — Nachbarn.",
          promptTr:
            "Konu: Oturma. Her anahtar sözcük için bir soru kur ve cevapla: kat — kira — asansör — çamaşırhane — komşular.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Wohnen. Ihr erstes Stichwort ist: Stock. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi oturma konusunu konuşuyoruz. İlk sözcüğün: kat. Bana bir soru sor.",
            },
            { who: "you", hint: "«Stock» sözcüğüyle bir soru kur.", expect: "Stock sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich wohne im ersten Stock. Ihr nächstes Stichwort ist: Aufzug.",
              tr: "Birinci katta oturuyorum. Sıradaki sözcüğün: asansör.",
            },
            { who: "you", hint: "«Aufzug» için bir soru kur.", expect: "Aufzug sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Nein, wir haben keinen Aufzug. Und jetzt eine Frage an Sie: Waschen Sie in der Waschküche?",
              tr: "Hayır, asansörümüz yok. Şimdi sana bir soru: Çamaşırhanede mi yıkıyorsun?",
            },
            { who: "you", hint: "Soruyu cevapla — çamaşırhanede mi yıkıyorsun?", expect: "evet/hayır sorusuna tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wie oft sehen Sie Ihre Nachbarn?",
              tr: "Teşekkürler. Son soru: Komşularını ne sıklıkla görüyorsun?",
            },
            { who: "you", hint: "Bir sıklık söyle.", expect: "bir sıklık ifadesiyle cevap vermek (jeden Tag, selten …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "In welchem Stock wohnst du? — Im dritten. Was kostet die Miete? — 600 Euro. Habt ihr einen Aufzug? — Nein. Wo ist die Waschküche? — Im Keller. Kennst du deine Nachbarn? — Ja, zwei von ihnen.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Kat, fiyat ve sıklık söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-11-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie brauchen Hilfe beim Tragen. — Sie möchten ein Paket annehmen lassen. — Jemand fragt Sie um Hilfe.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Taşımak için yardım gerekiyor. — Bir kolinin teslim alınmasını istiyorsun. — Biri senden yardım istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Ihr Schrank ist schwer. Bitten Sie mich um Hilfe.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Dolabın ağır. Benden yardım iste.",
            },
            {
              who: "you",
              hint: "Taşımak için yardım iste.",
              expect: "yardım istemek (Können Sie mir bitte helfen)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Ja, gern. Zweite Situation: Sie sind morgen nicht da. Ein Paket kommt. Fragen Sie mich.",
              tr: "Tabii, memnuniyetle. İkinci durum: Yarın evde yoksun. Bir koli gelecek. Bana sor.",
            },
            { who: "you", hint: "Koliyi teslim almasını rica et.", expect: "kibar bir rica kurmak (Können Sie bitte mein Paket annehmen)", seconds: 20 },
            {
              who: "partner",
              de: "Natürlich, ich bin morgen zu Hause. Jetzt eine Frage an Sie: Meine Waschmaschine ist kaputt. Kann ich einmal bei Ihnen waschen?",
              tr: "Tabii, yarın evdeyim. Şimdi sana bir soru: Çamaşır makinem bozuldu. Bir kez sende yıkayabilir miyim?",
            },
            {
              who: "you",
              hint: "Cevap ver ve kısa bir gerekçe ya da koşul ekle.",
              expect: "bir ricaya olumlu ya da olumsuz yanıt verip kısaca gerekçelendirmek",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "um Hilfe bitten", tr: "Yardım istemek" },
              { de: "höflich um etwas bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Bir ricaya karşılık vermek" },
            ],
            sample:
              "Entschuldigung, können Sie mir bitte kurz helfen? Der Schrank ist schwer. — Können Sie morgen bitte mein Paket annehmen? Ich bin nicht zu Hause. — Ja, gern. Kommen Sie am Abend, dann ist die Maschine frei.",
            criteria: [
              "Yardım isteği kibar bir kalıpla kuruldu mu? (Können Sie … bitte)",
              "İkinci rica açık ve tam mı?",
              "Gelen ricaya net bir yanıt verildi mi?",
              "Yanıt kısa bir gerekçe ya da koşulla desteklendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
