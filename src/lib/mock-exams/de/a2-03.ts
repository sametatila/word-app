import type { MockPaper } from "../types";

/**
 * A2 · Deneme 3 — "Wohnen und Nachbarschaft".
 *
 * PLAN kâğıt 1 ve 2 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde
 *     Teil 1  5  üç şıklı seçme   blog — genel anlam (gist)
 *     Teil 2  5  üç şıklı seçme   gazete yazısı — ayrıntı (detail)
 *     Teil 3  5  üç şıklı seçme   beş kısa metin — ayrıntı (detail)
 *     Teil 4  5  eşleştirme       ilan — kime uyar (orientation)
 *   Hören  30 dk · 20 madde
 *     Teil 1  5  üç şıklı seçme   kısa konuşma (detail)
 *     Teil 2  5  eşleştirme       kim ne yapıyor (detail)
 *     Teil 3  5  üç şıklı seçme   kısa konuşma (detail)
 *     Teil 4  5  Richtig/Falsch   söyleşi — tutum (opinion)
 *   Schreiben 30 dk  özel ileti (~40 kelime) + yarı resmî ileti (~40 kelime)
 *   Sprechen  15 dk  konu sorusu · anlatı · ortak planlama
 *
 * KONU SEÇİMİ: komşuluk, A2'nin iki temel işlevini aynı anda gerektiriyor —
 * bir şeyi rica etmek ve bir sorunu kibarca dile getirmek. Yazma görevleri de
 * bu iki kaydı ayırıyor: biri arkadaşça, öteki yarı resmî.
 */
export const A2_03: MockPaper = {
  id: "de-a2-03",
  course: "de",
  level: "A2",
  no: 3,
  theme: "Wohnen und Nachbarschaft",
  themeTr: "Konut ve komşuluk",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen einen Blogbeitrag, einen Zeitungstext, kurze Mitteilungen und Anzeigen.",
      instructionTr:
        "Bu bölümde dört görev var. Bir blog yazısı, bir gazete metni, kısa iletiler ve ilanlar okuyacaksın.",
      tasks: [
        {
          id: "de-a2-03-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 5. Wählen Sie: a, b oder c.",
          promptTr: "Metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Sechs Monate im Hinterhaus",
              body: `Im Februar bin ich in eine kleine Wohnung im Hinterhaus gezogen. Vorher habe ich zehn Jahre lang an einer großen Straße gewohnt.

Die neue Wohnung ist billiger, aber sie ist auch dunkler. Am Anfang habe ich das sehr gemerkt. Im Wohnzimmer musste ich schon am Nachmittag das Licht anmachen.

Dafür ist es hier ruhig. In der alten Wohnung habe ich jede Nacht die Autos gehört. Jetzt höre ich nur die Kinder im Hof.

Am zweiten Tag hat Frau Öztürk aus dem Erdgeschoss geklingelt. Sie hat mir Suppe gebracht und gefragt, ob ich Hilfe brauche. Ich war überrascht, weil ich meine alten Nachbarn nie kennengelernt habe.

Im Haus gibt es viele Regeln. Man darf nach zehn Uhr keine Wäsche waschen. Der Müll muss in vier verschiedene Tonnen. Am Anfang habe ich das kompliziert gefunden.

Nach sechs Monaten kann ich sagen: Ich vermisse das Licht, aber ich vermisse die alte Straße nicht.

Nächsten Monat machen wir zusammen ein Hoffest. Frau Öztürk kocht, ich baue die Tische auf. Ich glaube, ich bleibe hier.`,
              gloss: [
                { de: "das Hinterhaus", tr: "arka bina", en: "rear building" },
                { de: "der Hof", tr: "avlu", en: "courtyard" },
                { de: "die Tonne", tr: "çöp konteyneri", en: "bin" },
                { de: "vermissen", tr: "özlemek", en: "to miss" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-03-l1-1",
              no: 1,
              text: "Was ist der größte Nachteil der neuen Wohnung?",
              options: ["Die Miete ist zu hoch.", "Sie bekommt wenig Licht.", "Die Nachbarn sind zu laut."],
              answer: 1,
              explain:
                "Metin karanlığı iki kez işaretliyor: \"sie ist auch dunkler\" ve öğleden sonra bile lamba yakma zorunluluğu. Kira daha ucuz, komşular ise sorun değil — avludan gelen tek ses çocukların sesi.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l1-2",
              no: 2,
              text: "Wie hat die Autorin ihre Nachbarin kennengelernt?",
              options: ["Die Nachbarin ist zu ihr gekommen.", "Sie haben sich im Hof getroffen.", "Sie hat bei der Nachbarin geklingelt."],
              answer: 0,
              explain:
                "Zili çalan komşu: \"hat Frau Öztürk aus dem Erdgeschoss geklingelt\", yazar değil. Avluda karşılaşma metinde hiç geçmiyor; avlu yalnız çocuk sesiyle anılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l1-3",
              no: 3,
              text: "Was hat die Autorin am Anfang schwierig gefunden?",
              options: ["Die kleinen Zimmer.", "Die alten Nachbarn.", "Die Hausordnung."],
              answer: 2,
              explain:
                "Metin ev kurallarını sayıyor — saat ondan sonra çamaşır yok, dört ayrı çöp kutusu — ve yazar bunu \"kompliziert\" buluyor. Odaların küçüklüğünden şikâyet yok; eski komşularıyla ise hiç tanışmamış.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l1-4",
              no: 4,
              text: "Wie fühlt sich die Autorin nach sechs Monaten?",
              options: ["Sie will wieder umziehen.", "Sie ist zufrieden.", "Sie ist noch unsicher."],
              answer: 1,
              explain:
                "Son bölüm kararı veriyor: eski caddeyi özlemiyor ve \"ich bleibe hier\" diyor. Ayrıca komşusuyla birlikte avlu şenliği planlıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l1-5",
              no: 5,
              text: "Was passiert nächsten Monat?",
              options: ["Ein Fest im Hof.", "Ein Umzug.", "Eine Renovierung."],
              answer: 0,
              explain:
                "\"Nächsten Monat machen wir zusammen ein Hoffest\" — avluda bir şenlik. Taşınma altı ay önce olmuş, tadilattan ise hiç söz edilmiyor.",
            },
          ],
        },
        {
          id: "de-a2-03-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 6 bis 10. Wählen Sie: a, b oder c.",
          promptTr: "Metni ve 6–10. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Der Garten der Weststadt",
              body: `Seit drei Jahren gibt es in der Weststadt einen Nachbarschaftsgarten. Auf einer alten Parkfläche wachsen heute Tomaten, Kräuter und Blumen.

Die Idee hatte Miriam Falk. Sie arbeitet als Erzieherin und wollte, dass die Kinder aus dem Viertel sehen, wie Gemüse wächst. Zuerst haben nur vier Familien mitgemacht.

Heute sind es 38 Personen. Jede Familie hat ein kleines Beet. Dafür zahlt sie 20 Euro im Jahr. Das Geld ist für Erde und Wasser.

Der Garten ist jeden Tag von 8 bis 20 Uhr offen. Am Samstagvormittag arbeiten alle zusammen. Wer dreimal nicht kommt, verliert sein Beet.

Nicht alle im Viertel finden das Projekt gut. Einige Nachbarn sagen, dass am Wochenende zu viele Leute im Garten sind. Die Stadt hat deshalb im letzten Jahr eine Hecke gepflanzt.

Im Sommer gibt es jeden Monat ein Gartenfest. Dann kocht jeder etwas mit Gemüse aus dem eigenen Beet.`,
              gloss: [
                { de: "das Beet", tr: "tarhçık, küçük bahçe parseli", en: "plot, bed" },
                { de: "die Erzieherin", tr: "anaokulu öğretmeni", en: "preschool teacher" },
                { de: "die Hecke", tr: "çit", en: "hedge" },
                { de: "das Viertel", tr: "mahalle", en: "neighbourhood" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-03-l2-6",
              no: 6,
              text: "Warum hat Miriam Falk den Garten angefangen?",
              options: [
                "Sie wollte selbst Gemüse essen.",
                "Sie hat einen zweiten Job gesucht.",
                "Die Kinder im Viertel sollen Gemüse wachsen sehen.",
              ],
              answer: 2,
              explain:
                "Metin gerekçeyi açıkça veriyor: mahalledeki çocuklar sebzenin nasıl büyüdüğünü görsün. Miriam zaten anaokulu öğretmeni; ikinci iş aradığına dair hiçbir bilgi yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l2-7",
              no: 7,
              text: "Wie viel zahlt eine Familie im Jahr?",
              options: ["Vier Euro.", "20 Euro.", "38 Euro."],
              answer: 1,
              explain:
                "Yıllık ücret 20 euro ve toprakla su için toplanıyor. 4 ilk katılan aile sayısı, 38 ise bugünkü kişi sayısı; ikisi de ücret değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l2-8",
              no: 8,
              text: "Wann arbeiten alle gemeinsam?",
              options: ["Am Samstagvormittag.", "Jeden Tag von 8 bis 20 Uhr.", "Einmal im Monat."],
              answer: 0,
              explain:
                "Ortak çalışma cumartesi sabahı. 8–20 arası bahçenin açık olduğu saat; ayda bir olan şey ise yaz aylarındaki bahçe şenliği.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l2-9",
              no: 9,
              text: "Was passiert, wenn jemand dreimal nicht zur gemeinsamen Arbeit kommt?",
              options: [
                "Er muss im nächsten Jahr mehr Geld zahlen.",
                "Er bekommt eine Warnung.",
                "Er darf das Beet nicht mehr behalten.",
              ],
              answer: 2,
              explain:
                "Kural net: üç kez gelmeyen parselini kaybediyor. Uyarı ya da ek ödeme metinde hiç geçmiyor; 20 euro yıllık aidat ve cezayla ilgisi yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l2-10",
              no: 10,
              text: "Warum hat die Stadt eine Hecke gepflanzt?",
              options: [
                "Weil die Blumen im Sommer mehr Schatten brauchen.",
                "Wegen der Beschwerden aus dem Viertel.",
                "Weil Kinder auf die Straße gelaufen sind.",
              ],
              answer: 1,
              explain:
                "Metin sırayı kuruyor: bazı komşular hafta sonu kalabalığından rahatsız, \"deshalb\" şehir çit dikiyor. Gölge ve sokağa kaçan çocuklar hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-a2-03-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie die fünf kurzen Texte und die Aufgaben 11 bis 15. Wählen Sie: a, b oder c.",
          promptTr: "Beş kısa metni ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "n1",
              genre: "E-Mail der Hausverwaltung",
              genreTr: "Site yönetiminden e-posta",
              title: "Fensterarbeiten im Treppenhaus",
              body: `Sehr geehrte Mieterinnen und Mieter,

am Dienstag, dem 9. April, kommt die Firma und tauscht die Fenster im Treppenhaus.

Die Arbeiten dauern von 8 bis 16 Uhr. In dieser Zeit müssen die Wohnungstüren geschlossen bleiben.

Der Aufzug funktioniert normal.

Ihre Hausverwaltung Berg`,
            },
            {
              kind: "text",
              id: "n2",
              genre: "Zettel im Treppenhaus",
              genreTr: "Merdiven boşluğundaki not",
              body: `Liebe Nachbarn,

wir haben am Freitag eine kleine Feier. Es kann bis 23 Uhr lauter werden.

Wer möchte, kann gern vorbeikommen. Wir wohnen im dritten Stock rechts.

Familie Marchetti`,
            },
            {
              kind: "text",
              id: "n3",
              genre: "Aushang am Waschkeller",
              genreTr: "Çamaşırlık kapısındaki duyuru",
              body: `WASCHKELLER

Bitte tragen Sie Ihren Namen in die Liste ein.

Jede Wohnung hat zwei Termine pro Woche.

Nach dem Waschen bitte den Filter sauber machen.`,
            },
            {
              kind: "text",
              id: "n4",
              genre: "Anzeige am schwarzen Brett",
              genreTr: "İlan panosundaki duyuru",
              body: `Nachbarschaftshilfe

Ich hole für Sie Einkäufe, wenn Sie krank sind oder schlecht laufen können.

Kostenlos, ich wohne selbst im Haus.

Bitte klingeln bei Weber, 1. Stock.`,
            },
            {
              kind: "text",
              id: "n5",
              genre: "Kurznachricht",
              genreTr: "Kısa mesaj",
              body: `Hi Jonas, ich bin heute erst um 19 Uhr zu Hause.

Kannst du das Paket für mich annehmen? Der Bote kommt zwischen 14 und 16 Uhr.

Danke! Ich bringe dir morgen Kuchen mit.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-03-l3-11",
              no: 11,
              ref: "n1",
              text: "Was müssen die Mieter am 9. April tun?",
              options: ["Die Wohnungstür zumachen.", "Den Aufzug nicht benutzen.", "Zu Hause bleiben."],
              answer: 0,
              explain:
                "E-posta tek bir şey istiyor: daire kapıları kapalı kalsın. Asansör \"funktioniert normal\", evde kalma şartı ise hiç konmamış.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l3-12",
              no: 12,
              ref: "n2",
              text: "Was schreibt Familie Marchetti?",
              options: ["Sie sucht neue Nachbarn.", "Sie zieht am Freitag aus.", "Sie lädt die Nachbarn ein."],
              answer: 2,
              explain:
                "Not hem uyarı hem davet: \"Wer möchte, kann gern vorbeikommen\". Taşınmaktan ya da komşu aramaktan söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l3-13",
              no: 13,
              ref: "n3",
              text: "Was muss man nach dem Waschen machen?",
              options: ["Den Namen in die Liste eintragen.", "Den Filter reinigen.", "Die Tür abschließen."],
              answer: 1,
              explain:
                "Levha yıkama sonrası tek bir iş veriyor: \"Nach dem Waschen bitte den Filter sauber machen\". Listeye ad yazmak yıkamadan ÖNCE yapılıyor, kapı kilidinden ise hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l3-14",
              no: 14,
              ref: "n4",
              text: "Was bietet die Person aus dem ersten Stock an?",
              options: ["Einkaufen für Nachbarn.", "Eine Wohnung im ersten Stock.", "Hilfe beim Umzug."],
              answer: 0,
              explain:
                "İlan \"Ich hole für Sie Einkäufe\" diyor ve bunu hasta ya da zor yürüyen komşular için ücretsiz yapıyor. Birinci kat ilan sahibinin adresi; kiralık daire değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-l3-15",
              no: 15,
              ref: "n5",
              text: "Was soll Jonas machen?",
              options: ["Bis 19 Uhr warten.", "Kuchen kaufen.", "Ein Paket annehmen."],
              answer: 2,
              explain:
                "İstenen tek şey kargoyu teslim almak; kurye 14–16 arası geliyor. 19 gönderenin eve dönüş saati, pasta ise teşekkür olarak yarın getirilecek.",
            },
          ],
        },
        {
          id: "de-a2-03-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen eine Wohnung oder ein Zimmer. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler ev ya da oda arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Zimmer in der WG",
              body: "Helles Zimmer, 18 m², in einer Wohnung mit drei Studenten. 320 Euro warm. Küche und Bad werden geteilt, wir kochen oft zusammen. Ab sofort frei.",
            },
            {
              key: "b",
              label: "Kleine Wohnung mit Garten",
              body: "Zwei Zimmer im Erdgeschoss, 55 m², eigener Garten. 690 Euro warm. Haustiere nach Absprache erlaubt. Frei ab 1. Juli.",
            },
            {
              key: "c",
              label: "Zimmer für Pendler",
              body: "Möbliertes Zimmer, nur Montag bis Freitag. 250 Euro im Monat. Keine Küche, kein Besuch. Zentral am Bahnhof.",
            },
            {
              key: "d",
              label: "Vier Zimmer im Altbau",
              body: "110 m² im dritten Stock ohne Aufzug. 1250 Euro warm. Zwei Bäder, großer Balkon. Gut für Familien mit Kindern.",
            },
            {
              key: "e",
              label: "Ein-Zimmer-Wohnung für Senioren",
              body: "40 m² im Erdgeschoss, breite Türen, Dusche ohne Stufe. 520 Euro warm. Nur an Personen ab 65 Jahren.",
            },
            {
              key: "f",
              label: "Zimmer gegen Hilfe",
              body: "Kleines Zimmer kostenlos. Dafür zwei Stunden am Tag im Haushalt und im Garten helfen. Nur Nichtraucher.",
            },
            {
              key: "g",
              label: "Wohnung auf Zeit",
              body: "Möbliert, 45 m², für drei bis sechs Monate. 800 Euro warm, alles inklusive. Internet und Handtücher sind vorhanden.",
            },
            {
              key: "h",
              label: "Reihenhaus zu verkaufen",
              body: "Fünf Zimmer, kleiner Garten, Garage. 289.000 Euro. Besichtigung nur am Samstag nach Termin.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-03-l4-16",
              no: 16,
              text: "Hanna (21) studiert und sucht ein günstiges Zimmer. Sie kocht gern mit anderen zusammen.",
              answer: "a",
              explain:
                "(a) öğrenci evi, 320 euro ve \"wir kochen oft zusammen\" — üç ölçüt de tutuyor. (c) de oda ama mutfağı yok ve yalnız hafta içi; (f) bedava, karşılığında günde iki saat iş isteniyor.",
            },
            {
              kind: "match",
              id: "de-a2-03-l4-17",
              no: 17,
              text: "Familie Costa hat zwei Kinder und braucht mindestens vier Zimmer. Ein Balkon ist wichtig.",
              answer: "d",
              explain:
                "(d) dört oda, büyük balkon ve çocuklu aileler için uygun deniyor. (h) beş odalı ama satılık, kiralık değil; (b) bahçeli ama yalnız iki oda.",
            },
            {
              kind: "match",
              id: "de-a2-03-l4-18",
              no: 18,
              text: "Herr Baumann (72) läuft schlecht und sucht eine Wohnung ohne Treppen.",
              answer: "e",
              explain:
                "(e) zemin kat, geniş kapı ve basamaksız duş — hareket kısıtı için kurulmuş, üstelik 65 yaş üstü şartı da uyuyor. (b) de zemin katta ama erişilebilirlikle ilgili hiçbir şey yazmıyor.",
            },
            {
              kind: "match",
              id: "de-a2-03-l4-19",
              no: 19,
              text: "Frau Devi arbeitet vier Monate in der Stadt und bringt keine Möbel mit.",
              answer: "g",
              explain:
                "(g) mobilyalı ve üç-altı ay için, yani dört ay tam oturuyor. (c) de mobilyalı ama yalnız hafta içi kalınıyor; hafta sonu kalacak yeri olmaz.",
            },
            {
              kind: "match",
              id: "de-a2-03-l4-20",
              no: 20,
              text: "Tobias hat im Moment kein Geld und kann dafür im Haushalt helfen.",
              answer: "f",
              explain:
                "(f) odayı bedava veriyor, karşılığı günde iki saat ev ve bahçe işi. (a) en ucuz kiralık ama yine de 320 euro istiyor.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction: "Dieser Teil hat vier Aufgaben. Sie hören Gespräche und ein Interview. Lesen Sie zuerst die Aufgaben.",
      instructionTr: "Bu bölümde dört görev var. Konuşmalar ve bir söyleşi dinleyeceksin. Önce maddeleri oku.",
      tasks: [
        {
          id: "de-a2-03-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "k1",
              genre: "Gespräch im Treppenhaus",
              genreTr: "Merdiven boşluğunda konuşma",
              situation: "İki komşu tadilatı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Roth", text: "Haben Sie den Zettel gesehen? Am Dienstag kommen die Handwerker." },
                { speaker: "Herr Ali", text: "Ja. Ich bin aber den ganzen Tag arbeiten." },
                { speaker: "Frau Roth", text: "Kein Problem, sie arbeiten nur im Treppenhaus." },
              ],
            },
            {
              kind: "audio",
              id: "k2",
              genre: "Telefongespräch mit der Hausverwaltung",
              genreTr: "Site yönetimiyle telefon konuşması",
              situation: "Bir kiracı arıza bildiriyor.",
              plays: 2,
              segments: [
                { speaker: "Mieterin", text: "Die Heizung im Schlafzimmer wird nicht warm." },
                { speaker: "Verwaltung", text: "Seit wann denn?" },
                { speaker: "Mieterin", text: "Seit Montag. Im Wohnzimmer funktioniert sie." },
                { speaker: "Verwaltung", text: "Gut, der Techniker kommt am Donnerstag." },
              ],
            },
            {
              kind: "audio",
              id: "k3",
              genre: "Gespräch im Hausflur",
              genreTr: "Bina koridorunda konuşma",
              situation: "Bir komşu bisikletin yerini konu ediyor.",
              plays: 2,
              segments: [
                { speaker: "Nachbar", text: "Ist das dein Fahrrad im Flur?" },
                { speaker: "Nachbarin", text: "Ja, warum?" },
                { speaker: "Nachbar", text: "Im Flur dürfen keine Fahrräder stehen. Unten im Keller ist Platz." },
              ],
            },
            {
              kind: "audio",
              id: "k4",
              genre: "Gespräch an der Haustür",
              genreTr: "Bina kapısında konuşma",
              situation: "Kurye bir kargo getiriyor.",
              plays: 2,
              segments: [
                { speaker: "Postbote", text: "Ein Paket für Frau Lehmann. Ist sie da?" },
                { speaker: "Nachbar", text: "Nein, aber ich nehme es an." },
                { speaker: "Postbote", text: "Gern. Bitte hier unterschreiben." },
              ],
            },
            {
              kind: "audio",
              id: "k5",
              genre: "Gespräch im Aufzug",
              genreTr: "Asansörde konuşma",
              situation: "İki komşu tanışıyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Weiß", text: "Sie sind neu hier, oder?" },
                { speaker: "Frau Sar", text: "Ja, seit zwei Wochen. Ich wohne im vierten Stock." },
                { speaker: "Herr Weiß", text: "Dann sind wir Nachbarn. Ich bin gegenüber." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-03-h1-1",
              no: 1,
              ref: "k1",
              text: "Wo wird am Dienstag gearbeitet?",
              options: ["Im Treppenhaus.", "In allen Wohnungen.", "Im Keller."],
              answer: 0,
              explain:
                "Frau Roth endişeyi gideriyor: \"sie arbeiten nur im Treppenhaus\". Herr Ali'nin bütün gün işte olması tam bu yüzden sorun değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h1-2",
              no: 2,
              ref: "k2",
              text: "Was funktioniert nicht?",
              options: ["Die Heizung in der ganzen Wohnung.", "Das Fenster im Schlafzimmer.", "Die Heizung in einem Zimmer."],
              answer: 2,
              explain:
                "Yatak odasındaki radyatör ısınmıyor ama \"Im Wohnzimmer funktioniert sie\" deniyor. Yani arıza tek bir odada; pencereden hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h1-3",
              no: 3,
              ref: "k3",
              text: "Was soll die Nachbarin tun?",
              options: ["Das Fahrrad verkaufen.", "Das Fahrrad in den Keller stellen.", "Einen Platz im Hof für das Fahrrad suchen."],
              answer: 1,
              explain:
                "Koridorda bisiklet duramıyor ve komşu alternatifi söylüyor: \"Unten im Keller ist Platz\". Satmaktan ya da avludan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h1-4",
              no: 4,
              ref: "k4",
              text: "Was macht der Nachbar?",
              options: ["Er nimmt das Paket an.", "Er ruft Frau Lehmann an.", "Er schickt das Paket zurück."],
              answer: 0,
              explain:
                "Komşu \"ich nehme es an\" diyor ve imza atıyor. Frau Lehmann evde yok ama aranmıyor; iade hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h1-5",
              no: 5,
              ref: "k5",
              text: "Wo wohnt Herr Weiß?",
              options: ["Im zweiten Stock links.", "Im Erdgeschoss.", "Im vierten Stock."],
              answer: 2,
              explain:
                "Frau Sar dördüncü katta oturuyor ve Herr Weiß \"Ich bin gegenüber\" diyor: aynı kat. İki hafta yeni taşınma süresi, kat numarası değil.",
            },
          ],
        },
        {
          id: "de-a2-03-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen übernehmen eine Aufgabe für den Umzug. Was macht wer? Ordnen Sie zu. Drei Aufgaben bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi taşınma için bir iş üstleniyor. Kim ne yapıyor? Eşleştir. Üç iş artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch unter Freunden",
              genreTr: "Arkadaşlar arasında konuşma",
              situation: "Arkadaşlar bir taşınma için işleri paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Yasin", text: "Also, der Umzug ist am Samstag. Marie, was machst du?" },
                { speaker: "Marie", text: "Ich fahre den Transporter. Ich habe den Führerschein dafür." },
                { speaker: "Yasin", text: "Perfekt. Rico, kaufst du das Essen für alle?" },
                { speaker: "Rico", text: "Essen habe ich letztes Mal gemacht. Diesmal packe ich lieber die Bücher ein." },
                { speaker: "Yasin", text: "Gut. Frau Kern, Sie kennen die neue Wohnung schon. Übernehmen Sie das Essen?" },
                { speaker: "Frau Kern", text: "Ja, gern. Soll ich auch die Kartons besorgen?" },
                { speaker: "Yasin", text: "Nein danke, die Kartons bringt Tim schon am Freitag." },
                { speaker: "Tim", text: "Genau. Ich putze dann am Sonntag auch die alte Wohnung." },
                { speaker: "Yasin", text: "Die alte Wohnung putze ich, du hast am Sonntag Dienst." },
                { speaker: "Tim", text: "Stimmt, das hatte ich vergessen." },
              ],
            },
          ],
          options: [
            { key: "a", label: "den Transporter fahren" },
            { key: "b", label: "Bücher einpacken" },
            { key: "c", label: "Essen besorgen" },
            { key: "d", label: "Kartons bringen" },
            { key: "e", label: "die alte Wohnung putzen" },
            { key: "f", label: "Möbel abbauen" },
            { key: "g", label: "die Schlüssel abgeben" },
            { key: "h", label: "am Abend aufräumen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-03-h2-6",
              no: 6,
              ref: "g1",
              text: "Marie",
              answer: "a",
              explain: "\"Ich fahre den Transporter\" — ehliyeti olduğu için bu iş ona düşüyor ve sonradan değişmiyor.",
            },
            {
              kind: "match",
              id: "de-a2-03-h2-7",
              no: 7,
              ref: "g1",
              text: "Rico",
              answer: "b",
              explain:
                "Yemek işi ona teklif ediliyor ama geçen sefer yaptığını söyleyip reddediyor: \"Diesmal packe ich lieber die Bücher ein\".",
            },
            {
              kind: "match",
              id: "de-a2-03-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Kern",
              answer: "c",
              explain:
                "Rico reddedince yemeği Frau Kern üstleniyor. Kolileri de teklif ediyor ama Yasin \"Nein danke\" diyor.",
            },
            {
              kind: "match",
              id: "de-a2-03-h2-9",
              no: 9,
              ref: "g1",
              text: "Tim",
              answer: "d",
              explain:
                "Koliler Tim'de: \"die Kartons bringt Tim schon am Freitag\". Eski evi temizlemeyi teklif ediyor ama pazar günü nöbeti olduğu için o iş ona kalmıyor.",
            },
            {
              kind: "match",
              id: "de-a2-03-h2-10",
              no: 10,
              ref: "g1",
              text: "Yasin",
              answer: "e",
              explain:
                "Tim pazar günü çalıştığı için eski evi Yasin temizliyor: \"Die alte Wohnung putze ich\". Yasin ayrıca işleri dağıtan kişi.",
            },
          ],
        },
        {
          id: "de-a2-03-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "s1",
              genre: "Gespräch beim Einzug",
              genreTr: "Eve girerken konuşma",
              situation: "Ev sahibi anahtarları veriyor.",
              plays: 2,
              segments: [
                { speaker: "Vermieter", text: "Hier sind zwei Schlüssel. Einen dritten bekommen Sie in einer Woche." },
                { speaker: "Mieterin", text: "Und der Briefkasten?" },
                { speaker: "Vermieter", text: "Der Schlüssel dafür ist der kleine." },
              ],
            },
            {
              kind: "audio",
              id: "s2",
              genre: "Gespräch über die Nebenkosten",
              genreTr: "Aidat hesabı üzerine konuşma",
              situation: "Bir kiracı ek ödeme geldiğini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Mieter", text: "Die Abrechnung ist gekommen. Ich muss 180 Euro nachzahlen." },
                { speaker: "Freundin", text: "Warum denn so viel?" },
                { speaker: "Mieter", text: "Das Wasser ist teurer geworden. Der Strom nicht." },
              ],
            },
            {
              kind: "audio",
              id: "s3",
              genre: "Gespräch an der Wohnungstür",
              genreTr: "Daire kapısında konuşma",
              situation: "Bir komşudan çiçek sulaması isteniyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ilic", text: "Können Sie am Wochenende meine Blumen gießen?" },
                { speaker: "Herr Braun", text: "Am Samstag bin ich weg. Am Sonntag gern." },
                { speaker: "Frau Ilic", text: "Sonntag reicht." },
              ],
            },
            {
              kind: "audio",
              id: "s4",
              genre: "Gespräch im Hausflur",
              genreTr: "Bina koridorunda konuşma",
              situation: "Avlu temizliği sırası konuşuluyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Kim", text: "Wer räumt diese Woche den Hof?" },
                { speaker: "Frau Lang", text: "Wohnung 4. Aber die Familie ist im Urlaub." },
                { speaker: "Herr Kim", text: "Dann mache ich es. Nächste Woche sind sie wieder da." },
              ],
            },
            {
              kind: "audio",
              id: "s5",
              genre: "Gespräch über Lärm",
              genreTr: "Gürültü üzerine konuşma",
              situation: "Bir komşu akşamki piyano sesinden söz ediyor.",
              plays: 2,
              segments: [
                { speaker: "Nachbarin", text: "Ihr Kind spielt abends Klavier. Das höre ich sehr gut." },
                { speaker: "Vater", text: "Entschuldigung. Ab wann stört es Sie?" },
                { speaker: "Nachbarin", text: "Nach acht ist es schwierig. Vorher ist alles in Ordnung." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-03-h3-11",
              no: 11,
              ref: "s1",
              text: "Wie viele Schlüssel bekommt die Mieterin heute?",
              options: ["Einen.", "Zwei.", "Drei."],
              answer: 1,
              explain:
                "\"Hier sind zwei Schlüssel\" — bugün 2 anahtar veriliyor, 3. anahtar bir hafta sonra geliyor. Küçük olan posta kutusunun anahtarı ve zaten bu ikisinden biri.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h3-12",
              no: 12,
              ref: "s2",
              text: "Was ist teurer geworden?",
              options: ["Das Wasser.", "Der Strom im Winter.", "Die Miete."],
              answer: 0,
              explain:
                "180 euro ek ödemenin sebebi su; elektrik için açıkça \"Der Strom nicht\" deniyor. Kiradan hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h3-13",
              no: 13,
              ref: "s3",
              text: "Wann gießt Herr Braun die Blumen?",
              options: ["Am Samstag.", "Am ganzen Wochenende.", "Am Sonntag."],
              answer: 2,
              explain:
                "Cumartesi şehir dışında, pazar için \"gern\" diyor ve Frau Ilic \"Sonntag reicht\" diyerek kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h3-14",
              no: 14,
              ref: "s4",
              text: "Wer räumt diese Woche den Hof?",
              options: ["Die Familie aus Wohnung 4.", "Herr Kim.", "Frau Lang."],
              answer: 1,
              explain:
                "Sıra 4 numaralı dairede ama aile tatilde; Herr Kim \"Dann mache ich es\" diyor. Frau Lang yalnız bilgiyi veriyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-03-h3-15",
              no: 15,
              ref: "s5",
              text: "Was möchte die Nachbarin?",
              options: ["Kein Klavier mehr im Haus.", "Eine andere Wohnung.", "Klavier nur bis 20 Uhr."],
              answer: 2,
              explain:
                "Komşu piyanoyu tümden yasaklamıyor: sekizden öncesi için \"alles in Ordnung\" diyor. Sorun yalnız akşam sekizden sonrası.",
            },
          ],
        },
        {
          id: "de-a2-03-h4",
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
              situation: "Komşu anlaşmazlıklarında arabuluculuk yapan biri anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Kraus, Sie helfen bei Streit zwischen Nachbarn. Worum geht es meistens?" },
                { speaker: "Frau Kraus", text: "Fast immer um Lärm. Musik, Kinder, Maschinen im Keller." },
                { speaker: "Moderator", text: "Und was raten Sie den Leuten?" },
                {
                  speaker: "Frau Kraus",
                  text: "Zuerst soll man selbst klingeln und ruhig reden. Viele schreiben lieber einen Zettel, aber ein Zettel klingt schnell hart.",
                },
                { speaker: "Moderator", text: "Funktioniert das immer?" },
                { speaker: "Frau Kraus", text: "Nein. In etwa jedem dritten Fall kommen wir dazu. Dann sitzen alle an einem Tisch." },
                { speaker: "Moderator", text: "Wie lange dauert so ein Gespräch?" },
                { speaker: "Frau Kraus", text: "Meistens zwei Stunden. Manchmal brauchen wir einen zweiten Termin." },
                { speaker: "Moderator", text: "Und wer zahlt das?" },
                { speaker: "Frau Kraus", text: "Bei uns in der Stadt ist es kostenlos. In anderen Städten kostet es Geld." },
                { speaker: "Moderator", text: "Was ist Ihr wichtigster Rat?" },
                { speaker: "Frau Kraus", text: "Nicht warten. Wer ein Jahr lang ärgerlich ist, kann nicht mehr ruhig sprechen." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-03-h4-16",
              no: 16,
              ref: "i1",
              text: "Bei den meisten Konflikten geht es um Lärm.",
              answer: true,
              explain:
                "Frau Kraus \"Fast immer um Lärm\" diyor ve örnekleri sayıyor: müzik, çocuklar, bodrumdaki makineler.",
            },
            {
              kind: "bool",
              id: "de-a2-03-h4-17",
              no: 17,
              ref: "i1",
              text: "Frau Kraus empfiehlt, zuerst einen Zettel zu schreiben.",
              answer: false,
              explain:
                "Tam tersini öneriyor: önce zili çalıp sakin konuşmak. Not için \"ein Zettel klingt schnell hart\" diyor, yani ilk adım olarak uygun bulmuyor.",
            },
            {
              kind: "bool",
              id: "de-a2-03-h4-18",
              no: 18,
              ref: "i1",
              text: "Die Mediatorin kommt in jedem Fall dazu.",
              answer: false,
              explain:
                "Frau Kraus \"In etwa jedem dritten Fall kommen wir dazu\" diyor: yaklaşık her üç durumun yalnız birinde devreye giriyorlar, kalanını komşular kendi çözüyor.",
            },
            {
              kind: "bool",
              id: "de-a2-03-h4-19",
              no: 19,
              ref: "i1",
              text: "Ein Gespräch dauert meistens zwei Stunden.",
              answer: true,
              explain:
                "Süre için \"Meistens zwei Stunden\" deniyor. Bazen ikinci bir randevu gerekiyor, ama olağan süre bu.",
            },
            {
              kind: "bool",
              id: "de-a2-03-h4-20",
              no: 20,
              ref: "i1",
              text: "In allen Städten ist die Hilfe kostenlos.",
              answer: false,
              explain:
                "Ücretsizlik yalnız kendi şehirleri için geçerli: \"In anderen Städten kostet es Geld\".",
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
          id: "de-a2-03-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Nachbarin Frau Kraus hat eine Woche lang Ihre Pflanzen gegossen, während Sie weg waren. Schreiben Sie ihr eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Sen yokken komşun Frau Kraus bir hafta boyunca çiçeklerini suladı. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Bedanken Sie sich.", tr: "Teşekkür et." },
              { de: "Erzählen Sie kurz von Ihrer Reise.", tr: "Yolculuğundan kısaca söz et." },
              { de: "Laden Sie Frau Kraus zum Kaffee ein.", tr: "Frau Kraus'u kahveye davet et." },
            ],
            sample: `Liebe Frau Kraus,

vielen Dank, dass Sie meine Pflanzen gegossen haben. Alle sind noch grün!

Ich war eine Woche bei meiner Schwester in Bremen. Das Wetter war leider schlecht, aber wir hatten trotzdem eine schöne Zeit.

Möchten Sie am Sonntag zum Kaffee kommen? Ich backe einen Kuchen.

Herzliche Grüße
Elena Ruiz`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Komşuya yazıldığı için nazik ama sıcak bir ton mu? `Sie` kullanmak burada doğru.",
              "Hitap ve veda var mı? (Liebe Frau … / Herzliche Grüße)",
              "Davet gerçekten davet biçiminde mi? (Möchten Sie … / Kommen Sie doch …)",
              "Yaklaşık 40 kelime var mı ve cümleler bağlaçla bağlanmış mı?",
            ],
          },
        },
        {
          id: "de-a2-03-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Seit zwei Wochen ist das Licht im Treppenhaus kaputt. Abends ist es dort ganz dunkel. Schreiben Sie an die Hausverwaltung (circa 40 Wörter).",
          promptTr:
            "İki haftadır merdiven boşluğundaki ışık bozuk. Akşamları orası zifiri karanlık. Site yönetimine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu anlat." },
              { de: "Sagen Sie, seit wann es besteht.", tr: "Ne zamandır sürdüğünü söyle." },
              { de: "Bitten Sie um eine schnelle Reparatur.", tr: "Hızlı bir onarım rica et." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich wohne in der Gartenstraße 21 im zweiten Stock. Seit zwei Wochen funktioniert das Licht im Treppenhaus nicht mehr. Am Abend ist die Treppe sehr dunkel und das ist gefährlich, besonders für ältere Nachbarn.

Können Sie das bitte bald reparieren lassen?

Mit freundlichen Grüßen
Nuri Aydın`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı? (Sehr geehrte Damen und Herren / Mit freundlichen Grüßen)",
              "Sorun somut anlatıldı mı? (nerede, ne zamandan beri, neden önemli)",
              "Rica kibar bir kalıpla kuruldu mu? (Können Sie … bitte …)",
              "Yaklaşık 40 kelime var mı?",
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
          id: "de-a2-03-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Wohnen. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Wohnung — Nachbarn — Miete — Umzug — Balkon.",
          promptTr:
            "Konu: Konut. Her anahtar sözcük için bir soru sor ve kendin de cevapla: daire — komşular — kira — taşınma — balkon.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Wohnen. Ihr erstes Stichwort ist: Wohnung. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi konut konusunu konuşuyoruz. İlk sözcüğün: daire. Bana bir soru sor.",
            },
            { who: "you", hint: "«Wohnung» sözcüğüyle bir soru kur.", expect: "Wohnung sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Ich wohne in einer Zweizimmerwohnung im zweiten Stock. Ihr nächstes Stichwort ist: Nachbarn.",
              tr: "İki odalı bir dairede, ikinci katta oturuyorum. Sıradaki sözcüğün: komşular.",
            },
            { who: "you", hint: "«Nachbarn» için bir soru kur.", expect: "Nachbarn sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Meine Nachbarn sind sehr freundlich. Und jetzt eine Frage an Sie: Wie lange wohnen Sie schon in Ihrer Wohnung?",
              tr: "Komşularım çok cana yakın. Şimdi sana bir soru: Şu anki evinde ne zamandır oturuyorsun?",
            },
            { who: "you", hint: "Soruyu cevapla — ne zamandan beri orada oturuyorsun?", expect: "`seit` ile bir süre bildiren tam bir cümle kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was ist Ihnen bei einer Wohnung am wichtigsten?",
              tr: "Teşekkürler. Son soru: Bir evde senin için en önemli şey ne?",
            },
            { who: "you", hint: "Bir ölçüt söyle ve kısaca gerekçelendir.", expect: "bir tercihi `weil` ile gerekçelendirmek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Wie groß ist deine Wohnung? — Sie hat zwei Zimmer. Kennst du deine Nachbarn? — Ja, wir grüßen uns jeden Tag. Ist die Miete hier hoch? — Ziemlich, ich zahle 600 Euro warm. Bist du oft umgezogen? — Dreimal in zehn Jahren. Hast du einen Balkon? — Ja, und im Sommer frühstücke ich dort.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`seit` ve `weil` gibi A2 yapıları kullanılabiliyor mu?",
              "Cevaplar tek sözcük değil, tam cümle mi?",
            ],
          },
        },
        {
          id: "de-a2-03-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt: "Erzählen Sie: Wie wohnen Sie und was möchten Sie an Ihrer Wohnsituation ändern? Sprechen Sie etwa zwei Minuten.",
          promptTr: "Anlat: Nasıl bir evde oturuyorsun ve durumunda neyi değiştirmek isterdin? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "die Wohnung beschreiben", tr: "Evi tarif etmek" },
              { de: "sagen, was gut ist", tr: "Neyin iyi olduğunu söylemek" },
              { de: "einen Wunsch nennen und begründen", tr: "Bir isteği söylemek ve gerekçelendirmek" },
            ],
            sample:
              "Ich wohne mit meiner Schwester in einer Wohnung im dritten Stock. Wir haben zwei Zimmer, eine kleine Küche und ein Bad. Gut finde ich, dass der Supermarkt gleich unten ist. Die Nachbarn sind auch nett. Aber die Wohnung ist im Winter kalt, weil die Fenster alt sind. Ich möchte gern einen Balkon, weil ich im Sommer draußen sitzen will.",
            criteria: [
              "Ev somut tarif edildi mi? (kaç oda, hangi kat, kimlerle)",
              "En az bir olumlu ve bir olumsuz yön söylendi mi?",
              "İstek `möchte` ile ve gerekçesiyle birlikte verildi mi?",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-03-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Ihr Haus macht ein Hoffest. Sprechen Sie über: Wann? — Was zu essen? — Wer lädt ein? — Was machen die Kinder?",
          promptTr:
            "Birlikte plan yap. Binanız avlu şenliği yapacak. Şunları konuş: Ne zaman? — Ne yenecek? — Kim davet edecek? — Çocuklar ne yapacak?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen das Hoffest. Fangen wir mit dem Termin an: Wann sollen wir feiern?",
              tr: "Avlu şenliğini birlikte planlıyoruz. Tarihle başlayalım: Ne zaman yapalım?",
            },
            { who: "you", hint: "Bir tarih ve saat öner.", expect: "somut bir gün ve saat önermek", seconds: 30 },
            {
              who: "partner",
              de: "Das passt mir gut. Und was essen wir? Ich kann einen Salat machen.",
              tr: "Bana uyar. Peki ne yiyeceğiz? Ben salata yapabilirim.",
            },
            { who: "you", hint: "Bir yemek öner ve ne getireceğini söyle.", expect: "bir öneri sunmak ve kendi katkısını belirtmek", seconds: 35 },
            {
              who: "partner",
              de: "Gut. Wer sagt den Nachbarn Bescheid? Ich habe diese Woche wenig Zeit.",
              tr: "Güzel. Komşulara kim haber verecek? Bu hafta pek vaktim yok.",
            },
            { who: "you", hint: "İşi üstlen ya da başka bir çözüm öner.", expect: "bir görevi üstlenmek ya da gerekçeli bir alternatif sunmak", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Und die Kinder? Sie werden schnell langweilig finden, wenn wir nur reden.",
              tr: "Anlaştık. Peki çocuklar? Yalnız konuşursak çabuk sıkılırlar.",
            },
            { who: "you", hint: "Çocuklar için bir şey öner.", expect: "çocuklara yönelik somut bir etkinlik önermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneri sunmak" },
              { de: "auf Vorschläge reagieren", tr: "Önerilere karşılık vermek" },
              { de: "eine Aufgabe übernehmen", tr: "Bir işi üstlenmek" },
            ],
            sample:
              "Sollen wir am Samstag um vier feiern? — Gut. Ich bringe Kuchen mit, du machst den Salat. Ich schreibe einen Zettel für das Treppenhaus, das dauert nur zehn Minuten. Für die Kinder können wir Spiele im Hof machen, zum Beispiel Fußball oder Malen.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneri kalıpları kullanıldı mı? (Sollen wir … / Wollen wir … / Wie wäre es mit …)",
              "Karşı tarafın söylediğine gerçekten karşılık verildi mi?",
              "En az bir iş açıkça üstlenildi mi?",
            ],
          },
        },
      ],
    },
  ],
};
