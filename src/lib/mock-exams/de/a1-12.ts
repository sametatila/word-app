import type { MockPaper } from "../types";

/**
 * A1 · Deneme 12 — "Zug und Reise".
 *
 * PLAN kâğıt 1–11 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: uzun yol. "Unterwegs in der Stadt" şehir içi ulaşımı almıştı;
 * burada bilet, peron, aktarma, bagaj ve gecikme var. Bunlar A1 seviyesinde
 * gerçekten ihtiyaç duyulan ilk metinler arasında.
 *
 * DİKKAT EDİLEN: bu alanın bilgisi neredeyse tümüyle sayı — peron, saat,
 * vagon, fiyat. Maddeler bilerek yakın sayı çiftleriyle kuruldu (Gleis 7 ve
 * 17, 9:12 ve 9:20), çünkü A1'de asıl beceri sayıyı ayırt etmek.
 *
 * A1 sınırı: `würde`, `wäre`, `obwohl`, `trotzdem` bu kâğıtta hiç geçmiyor.
 */
export const A1_12: MockPaper = {
  id: "de-a1-12",
  course: "de",
  level: "A1",
  no: 12,
  theme: "Zug und Reise",
  themeTr: "Tren ve yolculuk",
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
          id: "de-a1-12-l1",
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
              title: "Von: t.berisha@mail.de",
              body: `Hallo Yusuf,

am Sonntag komme ich nach Leipzig. Mein Zug ist um 9:12 Uhr in Halle.

In Halle steige ich um. In Leipzig bin ich um 10:05 Uhr.

Kannst du mich am Bahnhof abholen? Ich habe zwei große Koffer.

Wenn es nicht geht, nehme ich ein Taxi.

Liebe Grüße
Teuta`,
              gloss: [
                { de: "umsteigen", tr: "aktarma yapmak", en: "to change trains" },
                { de: "abholen", tr: "karşılamak, almak", en: "to pick up" },
                { de: "der Koffer", tr: "bavul", en: "suitcase" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang am Bahnhof",
              genreTr: "İstasyondaki duyuru",
              body: `Liebe Fahrgäste,

vom 3. bis 7. Mai fahren keine Züge nach Erfurt.

Wir fahren in dieser Zeit mit dem Bus. Die Fahrt dauert 40 Minuten länger.

Der Bus hält vor dem Bahnhof, nicht am Gleis.

Ihre Fahrkarten gelten auch im Bus.`,
              gloss: [
                { de: "der Fahrgast", tr: "yolcu", en: "passenger" },
                { de: "das Gleis", tr: "peron", en: "platform, track" },
                { de: "gelten", tr: "geçerli olmak", en: "to be valid" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-12-l1-1",
              no: 1,
              ref: "t1",
              text: "Teuta fährt ohne Umsteigen nach Leipzig.",
              answer: false,
              explain:
                "E-posta bir aktarma bildiriyor: \"In Halle steige ich um\". Yani yolculuk iki bölümden oluşuyor.",
            },
            {
              kind: "bool",
              id: "de-a1-12-l1-2",
              no: 2,
              ref: "t1",
              text: "Teuta ist um 10:05 Uhr in Leipzig.",
              answer: true,
              explain:
                "İki saat geçiyor: 9:12 Halle'deki saat, varış ise \"In Leipzig bin ich um 10:05 Uhr\".",
            },
            {
              kind: "bool",
              id: "de-a1-12-l1-3",
              no: 3,
              ref: "t1",
              text: "Teuta hat viel Gepäck dabei.",
              answer: true,
              explain:
                "Karşılanmak istemesinin sebebi bu: \"Ich habe zwei große Koffer\". İki büyük bavul çok bagaj demek.",
            },
            {
              kind: "bool",
              id: "de-a1-12-l1-4",
              no: 4,
              ref: "t2",
              text: "Im Mai fahren die Züge nach Erfurt normal.",
              answer: false,
              explain:
                "Duyuru bir kesinti bildiriyor: \"vom 3. bis 7. Mai fahren keine Züge nach Erfurt\". O günlerde otobüs var.",
            },
            {
              kind: "bool",
              id: "de-a1-12-l1-5",
              no: 5,
              ref: "t2",
              text: "Die Fahrkarte für den Zug gilt auch für den Bus.",
              answer: true,
              explain:
                "Son satır bunu söylüyor: \"Ihre Fahrkarten gelten auch im Bus\". Yeni bilet almak gerekmiyor.",
            },
          ],
        },
        {
          id: "de-a1-12-l2",
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
              id: "de-a1-12-l2-6",
              no: 6,
              text: "Sie möchten Ihren Koffer für vier Stunden am Bahnhof lassen.",
              options: [
                "Schließfächer Halle A\ngroß und klein\n4 Euro für 24 Stunden\ngeöffnet von 5 bis 23 Uhr",
                "Reisegepäck Express\nwir schicken Ihr Gepäck nach Hause\nAbgabe bis 12 Uhr, Lieferung am nächsten Tag\nab 19,90 Euro pro Stück",
              ],
              answer: 0,
              explain:
                "Bavul birkaç saat kalacak. (a) emanet dolabı veriyor: `Schließfächer`. (b) bagajı eve gönderiyor, geri vermiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-l2-7",
              no: 7,
              text: "Sie fahren jeden Tag zur Arbeit nach Halle und suchen eine günstige Karte.",
              options: [
                "Städtereise Dresden\ndrei Tage mit Hotel\nZug und Frühstück inklusive\nab 149 Euro pro Person",
                "Monatskarte Region\nalle Fahrten im Gebiet\nMo bis So, ohne Zeitgrenze\n89 Euro im Monat",
              ],
              answer: 1,
              explain:
                "Her gün gidiliyor, o yüzden (b): `Monatskarte` ve `alle Fahrten`. (a) tek seferlik bir tatil paketi.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-l2-8",
              no: 8,
              text: "Ihr Zug hatte 90 Minuten Verspätung. Sie möchten Geld zurück.",
              options: [
                "Servicepunkt Erstattung\nFormular am Schalter 3\nab 60 Minuten Verspätung\nMo–Fr 8 bis 18 Uhr",
                "Fundbüro am Hauptbahnhof\nfür vergessene Sachen im Zug\nbitte Fahrkarte mitbringen\ntäglich 9 bis 17 Uhr, auch am Wochenende",
              ],
              answer: 0,
              explain:
                "Para iadesi için (a): `Erstattung` ve `ab 60 Minuten Verspätung`. (b) kayıp eşya ofisi.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-l2-9",
              no: 9,
              text: "Sie reisen mit einem Kind (5 Jahre) und möchten wissen, was es kostet.",
              options: [
                "Gruppenreisen Nord\nab 10 Personen\nAnmeldung vier Wochen vorher\nBeratung nur nach Termin im Büro",
                "Kinder fahren mit\nbis 6 Jahre kostenlos\nvon 6 bis 14 Jahren halber Preis\nimmer mit einem Erwachsenen",
              ],
              answer: 1,
              explain:
                "Çocuk beş yaşında, (b) yaş sınırlarını veriyor: `bis 6 Jahre kostenlos`. (a) en az on kişilik gruplar için.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-l2-10",
              no: 10,
              text: "Sie möchten Ihr Fahrrad im Zug mitnehmen.",
              options: [
                "Fahrradverleih am Bahnhof\nRäder für einen Tag\n12 Euro, Ausweis nötig\ntäglich ab 8 Uhr, letzte Rückgabe 20 Uhr",
                "Fahrrad im Zug\nnur mit Platzkarte\n6 Euro pro Fahrt\nnicht in allen Zügen möglich",
              ],
              answer: 1,
              explain:
                "Kendi bisikleti trene binecek: (b) `Fahrrad im Zug` ve yer kartı şartı. (a) bisiklet kiralıyor.",
            },
          ],
        },
        {
          id: "de-a1-12-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild am Gleis",
              genreTr: "Perondaki levha",
              body: `Vorsicht an der Bahnsteigkante.

Hinter der weißen Linie warten.

Fahrräder nur am Ende des Zuges.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild im Zug",
              genreTr: "Trendeki levha",
              body: `Ruhebereich — bitte nicht telefonieren.

Große Koffer bitte in das Regal über den Sitzen.

Fahrkarten bereithalten.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-12-l3-11",
              no: 11,
              ref: "s1",
              text: "Man soll vor der weißen Linie warten.",
              answer: false,
              explain:
                "Levha bunun tersini istiyor: \"Hinter der weißen Linie warten\". `hinter` çizginin gerisi demek, yani raydan uzak taraf.",
            },
            {
              kind: "bool",
              id: "de-a1-12-l3-12",
              no: 12,
              ref: "s1",
              text: "Fahrräder gehören ans Zugende.",
              answer: true,
              explain:
                "Yer levhada veriliyor: \"Fahrräder nur am Ende des Zuges\" — `nur` başka bir yeri dışlıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-12-l3-13",
              no: 13,
              ref: "s2",
              text: "Im Ruhebereich darf man telefonieren.",
              answer: false,
              explain:
                "Levhanın ilk satırı bunu yasaklıyor: \"Ruhebereich — bitte nicht telefonieren\".",
            },
            {
              kind: "bool",
              id: "de-a1-12-l3-14",
              no: 14,
              ref: "s2",
              text: "Große Koffer kommen nach oben.",
              answer: true,
              explain:
                "\"Große Koffer bitte in das Regal über den Sitzen\" — koltukların üstündeki raf yukarıda.",
            },
            {
              kind: "bool",
              id: "de-a1-12-l3-15",
              no: 15,
              ref: "s2",
              text: "Man muss die Fahrkarte griffbereit haben.",
              answer: true,
              explain:
                "Son satır bunu istiyor: \"Fahrkarten bereithalten\" — yani kontrolde hemen gösterilebilecek şekilde hazır tutmak.",
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
          id: "de-a1-12-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch am Schalter",
              genreTr: "Gişede konuşma",
              situation: "Bir yolcu bilet alıyor.",
              plays: 2,
              segments: [
                { speaker: "Reisende", text: "Einmal nach Halle, bitte." },
                { speaker: "Mitarbeiter", text: "Einfach oder hin und zurück?" },
                { speaker: "Reisende", text: "Hin und zurück. Ich komme am Abend wieder." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch am Gleis",
              genreTr: "Peronda konuşma",
              situation: "Bir yolcu peronu soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Yildiz", text: "Fährt der Zug nach Erfurt von Gleis sieben?" },
                { speaker: "Mitarbeiterin", text: "Heute von Gleis siebzehn. Gleis sieben ist gesperrt." },
                { speaker: "Herr Yildiz", text: "Danke, dann gehe ich rüber." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Zug",
              genreTr: "Trende konuşma",
              situation: "Kondüktör bilet kontrol ediyor.",
              plays: 2,
              segments: [
                { speaker: "Schaffner", text: "Die Fahrkarten, bitte." },
                { speaker: "Frau Berisha", text: "Hier. Ich habe sie im Internet gekauft." },
                { speaker: "Schaffner", text: "Dann brauche ich auch Ihren Ausweis." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Biri karşılama saatini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Yusuf", text: "Wann bist du da?" },
                { speaker: "Teuta", text: "Um zehn nach zehn. Der Zug hat zwanzig Minuten Verspätung." },
                { speaker: "Yusuf", text: "Gut, ich warte am Ausgang." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch am Schließfach",
              genreTr: "Emanet dolabında konuşma",
              situation: "Bir yolcu dolabı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Reisender", text: "Was kostet ein großes Schließfach?" },
                { speaker: "Mitarbeiterin", text: "Sechs Euro für einen Tag. Das kleine kostet vier." },
                { speaker: "Reisender", text: "Ich nehme das große." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch im Bus",
              genreTr: "Otobüste konuşma",
              situation: "Yolcu ikame otobüsü soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Novak", text: "Wie lange dauert es mit dem Bus?" },
                { speaker: "Fahrer", text: "Eine Stunde zwanzig. Der Zug braucht vierzig Minuten." },
                { speaker: "Frau Novak", text: "Dann komme ich zu spät." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-12-h1-1",
              no: 1,
              ref: "a1",
              text: "Welche Fahrkarte kauft die Reisende?",
              options: ["Eine einfache Fahrt.", "Hin und zurück.", "Eine Monatskarte."],
              answer: 1,
              explain:
                "Görevli iki seçenek sunuyor, kadın birini seçiyor: \"Hin und zurück. Ich komme am Abend wieder.\"",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h1-2",
              no: 2,
              ref: "a2",
              text: "Von welchem Gleis fährt der Zug heute?",
              options: ["Von Gleis 7.", "Von Gleis 70.", "Von Gleis 17."],
              answer: 2,
              explain:
                "İki benzer sayı geçiyor: yedi numaralı peron kapalı, tren \"von Gleis siebzehn\" kalkıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h1-3",
              no: 3,
              ref: "a3",
              text: "Was möchte der Schaffner noch sehen?",
              options: ["Den Ausweis.", "Die Platzkarte.", "Das Gepäck."],
              answer: 0,
              explain:
                "Bilet internetten alındığı için: \"Dann brauche ich auch Ihren Ausweis\". Kimlik biletle birlikte isteniyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h1-4",
              no: 4,
              ref: "a4",
              text: "Wann kommt Teuta an?",
              options: ["Um 10:10 Uhr.", "Um 10:00 Uhr.", "Um 10:20 Uhr."],
              answer: 0,
              explain:
                "\"Um zehn nach zehn\" onu on demek. Yirmi dakika gecikme süresi, varış saati değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h1-5",
              no: 5,
              ref: "a5",
              text: "Was zahlt der Reisende?",
              options: ["Vier Euro.", "Zehn Euro.", "Sechs Euro."],
              answer: 2,
              explain:
                "İki fiyat geçiyor: küçük dolap dört, büyük altı. Yolcu \"das große\" alıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h1-6",
              no: 6,
              ref: "a6",
              text: "Wie lange dauert die Fahrt mit dem Bus?",
              options: ["40 Minuten.", "80 Minuten.", "20 Minuten."],
              answer: 1,
              explain:
                "\"Eine Stunde zwanzig\" seksen dakika eder. Kırk dakika trenin süresi.",
            },
          ],
        },
        {
          id: "de-a1-12-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sie hören vier Durchsagen. Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Dört anons dinleyeceksin. Cümleler doğru mu yanlış mı? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage am Bahnhof",
              genreTr: "İstasyonda anons",
              situation: "Peron değişikliği.",
              plays: 1,
              segments: [
                {
                  text: "Achtung an Gleis vier: Der Zug nach Dresden fährt heute von Gleis neun. Wir bitten um Entschuldigung.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Zug",
              genreTr: "Trende anons",
              situation: "Aktarma bilgisi.",
              plays: 1,
              segments: [
                {
                  text: "Meine Damen und Herren, in wenigen Minuten erreichen wir Halle. Reisende nach Leipzig steigen bitte hier um. Der Anschlusszug wartet.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage im Zug",
              genreTr: "Trende anons",
              situation: "Yemekli vagon.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis: Das Bordrestaurant ist heute geschlossen. Kalte Getränke bekommen Sie in Wagen sechs. Wir bitten um Verständnis.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage am Bahnhof",
              genreTr: "İstasyonda anons",
              situation: "Unutulmuş çanta.",
              plays: 1,
              segments: [
                {
                  text: "Eine Bitte an alle Fahrgäste: In Halle B steht eine rote Tasche ohne Besitzer. Bitte lassen Sie Ihr Gepäck nie allein stehen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-12-h2-7",
              no: 7,
              ref: "d1",
              text: "Der Zug nach Dresden fährt von Gleis 4.",
              answer: false,
              explain:
                "Anons dört numaralı perondakilere sesleniyor ama tren başka yerden kalkıyor: \"fährt heute von Gleis neun\".",
            },
            {
              kind: "bool",
              id: "de-a1-12-h2-8",
              no: 8,
              ref: "d2",
              text: "Wer nach Leipzig fährt, muss in Halle umsteigen.",
              answer: true,
              explain:
                "Anons bunu açıkça söylüyor: \"Reisende nach Leipzig steigen bitte hier um\" — ve burası Halle.",
            },
            {
              kind: "bool",
              id: "de-a1-12-h2-9",
              no: 9,
              ref: "d3",
              text: "Im Zug gibt es heute gar nichts zu trinken.",
              answer: false,
              explain:
                "Yemekli vagon kapalı ama içecek var: \"Kalte Getränke bekommen Sie in Wagen sechs\".",
            },
            {
              kind: "bool",
              id: "de-a1-12-h2-10",
              no: 10,
              ref: "d4",
              text: "Man soll sein Gepäck immer bei sich haben.",
              answer: true,
              explain:
                "Anonsun ricası bu: \"Bitte lassen Sie Ihr Gepäck nie allein stehen\".",
            },
          ],
        },
        {
          id: "de-a1-12-h3",
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
              situation: "Bilet hazır.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Novak, hier ist das Reisebüro. Ihre Fahrkarte nach Wien ist da. Sie können sie ab morgen abholen. Wir haben bis achtzehn Uhr offen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Arkadaş buluşma yerini değiştiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Teuta, hier ist Yusuf. Ich warte nicht am Ausgang, sondern beim Bäcker in der Halle. Da ist es warm. Bis gleich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kayıp eşya bulundu.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist das Fundbüro am Hauptbahnhof. Ihr Schirm ist bei uns. Bringen Sie bitte Ihren Ausweis mit. Wir sind bis siebzehn Uhr da.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Grup gezisi bilgisi.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Herr Yildiz, hier ist der Sprachkurs. Am Samstag fahren wir nach Weimar. Treffpunkt ist um acht Uhr am Gleis drei. Bitte kommen Sie pünktlich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Para iadesi bilgisi.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist der Servicepunkt. Ihr Antrag ist bei uns angekommen. Das Geld ist in zwei Wochen auf Ihrem Konto. Sie müssen nichts mehr tun.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-12-h3-11",
              no: 11,
              ref: "m1",
              text: "Ab wann kann Frau Novak die Fahrkarte holen?",
              options: ["Ab heute.", "Ab nächster Woche.", "Ab morgen."],
              answer: 2,
              explain:
                "\"Sie können sie ab morgen abholen\" — on sekiz, kapanış saati.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h3-12",
              no: 12,
              ref: "m2",
              text: "Wo wartet Yusuf?",
              options: ["Beim Bäcker.", "Am Ausgang.", "Vor dem Bahnhof."],
              answer: 0,
              explain:
                "Yeri değiştiriyor: \"nicht am Ausgang, sondern beim Bäcker in der Halle\".",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h3-13",
              no: 13,
              ref: "m3",
              text: "Was soll die Person mitbringen?",
              options: ["Die Fahrkarte.", "Den Ausweis.", "Den Schirm."],
              answer: 1,
              explain:
                "Şemsiye zaten ofiste; getirilecek şey başka: \"Bringen Sie bitte Ihren Ausweis mit\".",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h3-14",
              no: 14,
              ref: "m4",
              text: "Wo ist der Treffpunkt?",
              options: ["Am Gleis 3.", "Vor dem Bahnhof.", "In Weimar."],
              answer: 0,
              explain:
                "Buluşma yeri saatle birlikte veriliyor: \"um acht Uhr am Gleis drei\". Weimar varılacak şehir.",
            },
            {
              kind: "mcq",
              id: "de-a1-12-h3-15",
              no: 15,
              ref: "m5",
              text: "Was muss die Person jetzt machen?",
              options: ["Ein Formular schicken.", "Nichts mehr.", "Zum Schalter kommen."],
              answer: 1,
              explain:
                "Mesaj bunu son cümlede söylüyor: \"Sie müssen nichts mehr tun\". Para iki hafta içinde geliyor.",
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
          id: "de-a1-12-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Freundin Teuta Berisha hat im Zug ihren Schirm vergessen. Sie helfen ihr beim Formular. Teuta ist am 14. September 1992 geboren. Sie wohnt in der Gutenbergstraße 8 in 06108 Halle. Ihre Telefonnummer ist 0345 227390. Der Schirm ist rot. Füllen Sie das Formular aus.",
          promptTr:
            "Arkadaşın Teuta Berisha şemsiyesini trende unutmuş. Formu doldurmasına yardım ediyorsun. Teuta 14 Eylül 1992 doğumlu. Gutenbergstraße 8, 06108 Halle adresinde oturuyor. Telefon numarası 0345 227390. Şemsiye kırmızı. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Verlustmeldung — Fundbüro Hauptbahnhof",
              body: `Familienname, Vorname:    Berisha, Teuta
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Halle
Telefon:                  {{4}}
Farbe des Schirms:        {{5}}
Unterschrift:             T. Berisha`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-12-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["14.09.1992", "14.9.1992", "14. September 1992", "14.09.92", "14.9.92"],
              explain:
                "Yönergede \"am 14. September 1992 geboren\" yazıyor. Eylül yılın dokuzuncu ayı, o yüzden rakamla 14.09.1992 olur.",
            },
            {
              kind: "gap",
              id: "de-a1-12-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Gutenbergstraße 8", "Gutenbergstr. 8"],
              explain:
                "Adres yönergede tam veriliyor: Gutenbergstraße 8. Almanca formda `Gutenbergstr. 8` kısaltması da kabul edilir.",
            },
            {
              kind: "gap",
              id: "de-a1-12-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["06108"],
              explain:
                "\"in 06108 Halle\" — posta kodu beş haneli ve baştaki sıfır yazılır. Şehir formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-12-s1-4",
              no: 4,
              text: "Telefon",
              accept: ["0345 227390", "0345227390"],
              explain:
                "Numara yönergede veriliyor: 0345 227390. Almanca formlarda alan kodu ile numara arasında boşluk bırakılır.",
            },
            {
              kind: "gap",
              id: "de-a1-12-s1-5",
              no: 5,
              text: "Farbe des Schirms",
              accept: ["rot"],
              explain:
                "Yönergenin son bilgisi: \"Der Schirm ist rot\". Bu satır rengi soruyor, eşyanın türünü değil.",
            },
          ],
        },
        {
          id: "de-a1-12-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie kommen später an als geplant. Schreiben Sie an Ihre Freundin. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Planlanandan geç varacaksın. Arkadaşına yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Sagen Sie, wann Sie ankommen.", tr: "Ne zaman varacağını söyle." },
              { de: "Fragen Sie, wo Sie sich treffen.", tr: "Nerede buluşacağınızı sor." },
            ],
            sample: `Liebe Anna,

mein Zug hat Verspätung. Ich komme heute leider später.

Ich bin erst um halb sieben in Halle. Der Anschluss in Erfurt war weg.

Wo treffen wir uns? Am Ausgang oder beim Bäcker?

Liebe Grüße
Teuta`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Arkadaşa yazıldığı için `Liebe …` ve `Liebe Grüße` uygun.",
              "Varış saati açıkça söylendi mi?",
              "Soru gerçekten soru biçiminde mi kuruldu?",
              "Yaklaşık 30 kelime yazıldı mı ve arkadaşa yazıldığı için `du` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: von einer Reise erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: bir yolculuğu anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-12-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von einer Reise. Sprechen Sie zu den Stichwörtern: wohin — wie — wie lange — mit wem — Gepäck — Wetter.",
          promptTr:
            "Bir yolculuğunu anlat. Şu anahtar sözcüklere göre konuş: nereye — nasıl — ne kadar — kiminle — bagaj — hava.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Ziel und Verkehrsmittel nennen", tr: "Gidilen yeri ve ulaşım aracını söylemek" },
              { de: "Dauer und Begleitung nennen", tr: "Süreyi ve kiminle gidildiğini söylemek" },
              { de: "vom Gepäck und vom Wetter erzählen", tr: "Bagajdan ve havadan söz etmek" },
            ],
            sample:
              "Im Sommer bin ich nach Hamburg gefahren. Ich bin mit dem Zug gefahren. Die Fahrt hat vier Stunden gedauert. Ich war mit meiner Schwester dort. Wir hatten nur einen Koffer und zwei Rucksäcke. Das Wetter war schön, aber am Sonntag hat es geregnet.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Ulaşım aracı ve süre söylendi mi?",
              "Bagaj hakkında en az bir cümle var mı?",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-12-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Reisen. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Gleis — Fahrkarte — Preis — Umsteigen — Gepäck.",
          promptTr:
            "Konu: Yolculuk. Her anahtar sözcük için bir soru kur ve cevapla: peron — bilet — fiyat — aktarma — bagaj.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Reisen. Ihr erstes Stichwort ist: Gleis. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi yolculuk konusunu konuşuyoruz. İlk sözcüğün: peron. Bana bir soru sor.",
            },
            { who: "you", hint: "«Gleis» sözcüğüyle bir soru kur.", expect: "Gleis sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Mein Zug fährt von Gleis zwölf. Ihr nächstes Stichwort ist: Fahrkarte.",
              tr: "Trenim on ikinci perondan kalkıyor. Sıradaki sözcüğün: bilet.",
            },
            { who: "you", hint: "«Fahrkarte» için bir soru kur.", expect: "Fahrkarte sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich kaufe sie immer im Internet. Und jetzt eine Frage an Sie: Müssen Sie oft umsteigen?",
              tr: "Ben hep internetten alırım. Şimdi sana bir soru: Sık sık aktarma yapman gerekiyor mu?",
            },
            { who: "you", hint: "Soruyu cevapla — sık aktarma yapıyor musun?", expect: "evet/hayır sorusuna tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wie viel Gepäck nehmen Sie mit?",
              tr: "Teşekkürler. Son soru: Ne kadar bagaj alırsın?",
            },
            { who: "you", hint: "Bir miktar söyle.", expect: "bir miktar ifadesiyle cevap vermek (einen Koffer, zwei Taschen …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Von welchem Gleis fährt der Zug? — Von Gleis vier. Wo kaufst du die Fahrkarte? — Am Automaten. Was kostet die Fahrt? — Achtzehn Euro. Muss ich umsteigen? — Ja, in Halle. Wie viel Gepäck hast du? — Einen Koffer.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Peron, fiyat ve miktar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-12-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie suchen Ihr Gleis. — Sie möchten einen Platz am Fenster. — Jemand fragt Sie nach dem Weg.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Peronunu arıyorsun. — Cam kenarı istiyorsun. — Biri sana yol soruyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie finden Ihr Gleis nicht. Fragen Sie mich.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Peronunu bulamıyorsun. Bana sor.",
            },
            {
              who: "you",
              hint: "Trenin hangi perondan kalktığını sor.",
              expect: "peron sormak (Von welchem Gleis fährt der Zug nach …)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Von Gleis neun, gleich da vorne. Zweite Situation: Sie möchten am Fenster sitzen. Fragen Sie mich.",
              tr: "Dokuzuncu perondan, hemen şurada. İkinci durum: Cam kenarında oturmak istiyorsun. Bana sor.",
            },
            { who: "you", hint: "Cam kenarı yer iste, kibarca.", expect: "kibar bir rica kurmak (Kann ich bitte einen Platz am Fenster haben)", seconds: 20 },
            {
              who: "partner",
              de: "Ja, Wagen sieben, Platz zweiundzwanzig. Jetzt eine Frage an Sie: Wo ist hier der Ausgang zur Stadt?",
              tr: "Tabii, yedinci vagon, yirmi ikinci koltuk. Şimdi sana bir soru: Şehir çıkışı nerede?",
            },
            {
              who: "you",
              hint: "Yolu tarif et, kısa ve net.",
              expect: "kısa bir yol tarifi vermek (geradeaus, dann links)",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "nach dem Gleis fragen", tr: "Peron sormak" },
              { de: "höflich um etwas bitten", tr: "Kibarca rica etmek" },
              { de: "den Weg beschreiben", tr: "Yol tarif etmek" },
            ],
            sample:
              "Entschuldigung, von welchem Gleis fährt der Zug nach Erfurt? — Kann ich bitte einen Platz am Fenster haben? — Gehen Sie geradeaus und dann links. Der Ausgang ist neben dem Bäcker.",
            criteria: [
              "Peron sorusu doğru kuruldu mu? (Von welchem Gleis …)",
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu?",
              "Yol tarifi en az iki adım içeriyor mu?",
              "Tarifte bir yön sözcüğü kullanıldı mı? (geradeaus, links, rechts)",
            ],
          },
        },
      ],
    },
  ],
};
