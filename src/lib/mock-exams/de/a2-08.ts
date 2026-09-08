import type { MockPaper } from "../types";

/**
 * A2 · Deneme 8 — "Umwelt und Verkehr".
 *
 * PLAN kâğıt 1–7 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 ana fikir · 5 ayrıntı · 5 ayrıntı · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 üç şıklı · 5 eşleştirme · 5 üç şıklı · 5 R/F söyleşi)
 *   Schreiben 30 dk           özel ileti (~40) + yarı resmî ileti (~40)
 *   Sprechen  15 dk           soru sorma · anlatma · birlikte planlama
 *
 * KONU SEÇİMİ: çevre ve ulaşım. A2 öğrencisinin günlük hayatta en çok
 * yön sorduğu, en çok duyuru okuduğu alan burası — durak değişikliği,
 * çöp kuralları, iptal edilen tren. Metinler bu yüzden hep bir DEĞİŞİKLİK
 * anlatıyor: eskisi ile yenisi arasındaki farkı yakalamak A2'nin işi.
 *
 * DİKKAT EDİLEN: konu kolayca ahlak dersine dönüyor. Metinlerin hiçbiri
 * öğrenciye ne yapması gerektiğini söylemiyor; anlatılanlar olmuş şeyler,
 * itirazlarıyla birlikte — arabasız merkezi savunan söyleşi bile iki
 * dükkânın taşındığını kendi ağzıyla söylüyor.
 */
export const A2_08: MockPaper = {
  id: "de-a2-08",
  course: "de",
  level: "A2",
  no: 8,
  theme: "Umwelt und Verkehr",
  themeTr: "Çevre ve ulaşım",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen kurze Nachrichten, zwei längere Texte und Anzeigen. Wählen Sie jeweils die richtige Lösung.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa iletiler, iki uzun metin ve ilanlar okuyacaksın. Her seferinde doğru cevabı işaretle.",
      tasks: [
        {
          id: "de-a2-08-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die fünf Texte. Worum geht es? Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Beş metni oku. Konu ne? a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang an der Mülltonne",
              genreTr: "Çöp konteynerindeki duyuru",
              body: `Liebe Nachbarinnen und Nachbarn,

die braune Tonne wird ab April jede Woche geleert, nicht mehr alle vierzehn Tage.

Bitte werfen Sie keine Plastiktüten hinein, weil sie die Anlage stören.

Kleine Tüten aus Papier sind erlaubt.`,
            },
            {
              kind: "text",
              id: "t2",
              genre: "Kurznachricht",
              genreTr: "Kısa mesaj",
              body: `Hallo Deniz,

jemand hat mein Rad am Bahnhof geklaut. Ich komme morgen mit dem Bus.

Der fährt aber nur alle zwanzig Minuten. Kannst du mich um Viertel nach sieben abholen?

Ich weiß, dass du früh raus musst. Wenn es nicht geht, nehme ich den früheren Bus.`,
            },
            {
              kind: "text",
              id: "t3",
              genre: "Aushang im Bus",
              genreTr: "Otobüsteki duyuru",
              body: `Ab Montag fährt die Linie 7 eine andere Strecke.

Die Haltestelle Marktplatz entfällt. Wenn Sie zum Markt möchten, steigen Sie bitte am Rathaus aus.

Der Weg zum Markt dauert von dort fünf Minuten zu Fuß.`,
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Seit die Innenstadt für Autos gesperrt ist, kommen mehr Menschen zu Fuß in die Läden.

Die Händler hatten zuerst Angst vor weniger Kunden.

Nach einem Jahr sagen die meisten: Es läuft besser als vorher.`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "E-Mail vom Amt",
              genreTr: "Kurumdan e-posta",
              body: `Sehr geehrter Herr Färber,

Ihr Antrag für den Fahrradkeller ist bei uns eingegangen.

Wir brauchen aber noch eine Kopie Ihres Mietvertrags, weil wir den Platz sonst nicht vergeben dürfen.

Mit freundlichen Grüßen
Stadtverwaltung`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-08-l1-1",
              no: 1,
              ref: "t1",
              text: "Was ändert sich?",
              options: [
                "Die Tonne wird öfter geleert.",
                "Es gibt eine neue braune Tonne.",
                "Papiertüten sind ab April verboten.",
              ],
              answer: 0,
              explain:
                "Değişiklik sıklıkta: \"jede Woche geleert, nicht mehr alle vierzehn Tage\". Kâğıt torbalar için tersi yazıyor — onlar serbest.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l1-2",
              no: 2,
              ref: "t2",
              text: "Was möchte der Schreiber?",
              options: [
                "Am Bahnhof ein neues Rad kaufen.",
                "Dass Deniz ihn abholt.",
                "Den Bus zwanzig Minuten früher nehmen.",
              ],
              answer: 1,
              explain:
                "Tek rica soru cümlesinde: \"Kannst du mich um Viertel nach sieben abholen?\" Erken otobüs metinde geçiyor ama ikinci seçenek olarak — istenen şey o değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l1-3",
              no: 3,
              ref: "t3",
              text: "Was sollen die Fahrgäste tun?",
              options: [
                "Eine andere Linie nehmen.",
                "Fünf Minuten früher losfahren.",
                "Am Rathaus aussteigen.",
              ],
              answer: 2,
              explain:
                "Durak kalkınca yeni yer veriliyor: \"Bitte steigen Sie am Rathaus aus\". Beş dakika yürüme süresi, erken çıkma önerisi değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l1-4",
              no: 4,
              ref: "t4",
              text: "Was ist die Hauptaussage?",
              options: [
                "Die Händler hatten von Anfang an recht.",
                "Die Sperrung hat den Läden genützt.",
                "Es kommen weniger Kunden als früher.",
              ],
              answer: 1,
              explain:
                "Korku ile sonuç karşı karşıya konuyor: önce \"Angst vor weniger Kunden\", bir yıl sonra \"Es läuft besser als vorher\".",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l1-5",
              no: 5,
              ref: "t5",
              text: "Was fehlt noch?",
              options: ["Ein Dokument.", "Der Antrag selbst.", "Die Miete für den Keller."],
              answer: 0,
              explain:
                "Başvuru ulaşmış — \"ist bei uns eingegangen\" — eksik olan tek şey \"eine Kopie Ihres Mietvertrags\".",
            },
          ],
        },
        {
          id: "de-a2-08-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 6 bis 10. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Metni ve 6–10. maddeleri oku. a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Der Bus, den die Nachbarn selbst fahren",
              body: `In Kleinried fuhr der letzte Bus vor drei Jahren. Danach war das Dorf ohne Verbindung.

Heute steht wieder ein kleiner Bus vor dem Feuerwehrhaus. Er gehört dem Ort, und am Steuer sitzen Nachbarn.

"Wir sind vierzehn Fahrerinnen und Fahrer", sagt Ilse Wilms. Sie ist seit dem ersten Tag dabei, weil sie früher selbst Busfahrerin war.

Der Bus fährt viermal am Tag zum Bahnhof in der Kreisstadt. Eine Fahrt kostet zwei Euro.

Am wichtigsten ist die Fahrt um halb neun. Damit kommen die Schulkinder zum Zug.

Geld verdient der Verein nicht. Die Fahrkarten decken den Diesel, mehr nicht.

Ein Problem bleibt: Es fehlen jüngere Fahrer, denn die meisten im Team sind über sechzig. Frau Wilms sagt, dass sie deshalb jedes Jahr neu sucht.

"Wer mitfahren will, muss auch mitmachen wollen", sagt Frau Wilms und lacht.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-08-l2-6",
              no: 6,
              ref: "r1",
              text: "Wie war die Lage vor drei Jahren?",
              options: ["Es gab keinen Bus.", "Der Bus fuhr nur samstags.", "Der Bus war meistens zu voll."],
              answer: 0,
              explain:
                "İlk iki cümle durumu veriyor: son otobüs üç yıl önce kalkmış ve \"Danach war das Dorf ohne Verbindung\".",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l2-7",
              no: 7,
              ref: "r1",
              text: "Wer fährt den Bus heute?",
              options: ["Leute aus dem Ort.", "Angestellte der Stadt.", "Eine Firma aus der Kreisstadt."],
              answer: 0,
              explain:
                "\"Er gehört dem Ort, und am Steuer sitzen Nachbarn\" — direksiyondaki on dört kişi köyün kendi insanları.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l2-8",
              no: 8,
              ref: "r1",
              text: "Warum ist die Fahrt um halb neun besonders wichtig?",
              options: [
                "Weil dann die meisten Leute mitfahren.",
                "Weil die Kinder den Zug erreichen.",
                "Weil sie am billigsten ist.",
              ],
              answer: 1,
              explain:
                "Gerekçe hemen arkasından geliyor: \"Damit kommen die Schulkinder zum Zug\". Fiyat her sefer için aynı: iki euro.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l2-9",
              no: 9,
              ref: "r1",
              text: "Was passiert mit dem Geld aus den Fahrkarten?",
              options: ["Es bleibt beim Verein als Gewinn.", "Es geht an die Gemeinde.", "Es zahlt den Kraftstoff."],
              answer: 2,
              explain:
                "İki cümle birlikte: \"Geld verdient der Verein nicht\" ve \"Die Fahrkarten decken den Diesel, mehr nicht\".",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l2-10",
              no: 10,
              ref: "r1",
              text: "Welches Problem nennt der Text?",
              options: ["Der Bus ist zu klein.", "Es fehlt an jungen Fahrern.", "Die Fahrkarten sind zu teuer."],
              answer: 1,
              explain:
                "Sorun açıkça adlandırılıyor: \"Es fehlen jüngere Fahrer\" ve gerekçesi veriliyor — ekibin çoğu altmış yaşın üstünde.",
            },
          ],
        },
        {
          id: "de-a2-08-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Blogtext und die Aufgaben 11 bis 15. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Blog metnini ve 11–15. maddeleri oku. a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "r2",
              genre: "Blogtext",
              genreTr: "Blog yazısı",
              title: "Ein Jahr ohne Auto",
              body: `Im April haben wir unser Auto verkauft, weil wir sehen wollten, ob es auch ohne geht.

Zum Einkaufen war es leichter als gedacht. Der Supermarkt liegt zehn Minuten zu Fuß entfernt.

Schwer wurde es bei den Kindern, weil der Sportverein im Nachbarort liegt. Abends fährt dorthin kein Bus mehr.

Wir haben deshalb ein Lastenrad gekauft. Im Sommer war das eine Freude, im Januar weniger.

Zweimal haben wir uns für ein paar Stunden ein Auto geliehen. Das kostet weniger, als ich dachte.

Am meisten überrascht hat mich etwas anderes: Wir fahren jetzt seltener weg, aber wir sehen mehr von der Stadt.

Ganz ohne Auto bleiben wir wohl nicht für immer. Ein eigenes brauchen wir aber nicht mehr.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-08-l3-11",
              no: 11,
              ref: "r2",
              text: "Warum haben sie das Auto verkauft?",
              options: ["Weil es kaputt war.", "Um es auszuprobieren.", "Weil sie Geld brauchten."],
              answer: 1,
              explain:
                "Sebep ikinci cümlede: \"Wir wollten sehen, ob es ohne geht\". Arıza ya da para sıkıntısı hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l3-12",
              no: 12,
              ref: "r2",
              text: "Was war leichter als erwartet?",
              options: ["Das Einkaufen.", "Der Weg zum Sportverein.", "Der Winter mit dem Rad."],
              answer: 0,
              explain:
                "\"Zum Einkaufen war es leichter als gedacht\" — market on dakika yürüme mesafesinde. Spor kulübü ve ocak ayı ise metinde zor tarafta duruyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l3-13",
              no: 13,
              ref: "r2",
              text: "Wo lag das größte Problem?",
              options: ["Beim Einkaufen im Supermarkt.", "Bei den Wegen der Kinder.", "Bei den hohen Kosten."],
              answer: 1,
              explain:
                "\"Schwer wurde es bei den Kindern\" — akşamları komşu köye otobüs kalmıyor. Masraf için ise tam tersi söyleniyor: beklenenden ucuz.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l3-14",
              no: 14,
              ref: "r2",
              text: "Was sagt der Autor über das Leihen eines Autos?",
              options: ["Es war viel teurer als gedacht.", "Es hat nie funktioniert.", "Es war günstiger als gedacht."],
              answer: 2,
              explain:
                "\"Das kostet weniger, als ich dachte\" — üstelik iki kez denenmiş, yani işe yaramış.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-l3-15",
              no: 15,
              ref: "r2",
              text: "Was hat den Autor am meisten überrascht?",
              options: [
                "Der neue Blick auf die Stadt.",
                "Die Freude der Kinder am Rad.",
                "Das gute Gefühl im Winter mit dem Rad.",
              ],
              answer: 0,
              explain:
                "Sürpriz açıkça işaretleniyor: \"Am meisten überrascht hat mich etwas anderes\" — daha az yola çıkıyorlar ama şehri daha çok görüyorlar.",
            },
          ],
        },
        {
          id: "de-a2-08-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen ein Angebot. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler bir hizmet arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Fahrrad-Werkstatt zum Selbermachen",
              body: "Werkzeug und Hilfe kostenlos, Ersatzteile gegen Geld. Donnerstag 16 bis 20 Uhr im Hinterhof.",
            },
            {
              key: "b",
              label: "Mitfahren zur Arbeit",
              body: "Wir suchen Leute für eine Fahrgemeinschaft ins Gewerbegebiet. Abfahrt 6.30 Uhr, wir teilen die Kosten.",
            },
            {
              key: "c",
              label: "Kleider weitergeben",
              body: "Bringen Sie saubere Sachen, nehmen Sie mit, was passt. Kein Geld nötig. Samstags 10 bis 14 Uhr.",
            },
            {
              key: "d",
              label: "Reparieren statt wegwerfen",
              body: "Ehrenamtliche reparieren Toaster, Lampen und Radios. Erster Mittwoch im Monat, ohne Anmeldung.",
            },
            {
              key: "e",
              label: "Garten für alle",
              body: "Zehn freie Beete am Kanal. Wasser ist da, Werkzeug bringen Sie mit. Jahresbeitrag 25 Euro.",
            },
            {
              key: "f",
              label: "Sperrmüll abholen",
              body: "Wir holen große Sachen bei Ihnen ab. Termin online oder telefonisch, Wartezeit etwa drei Wochen.",
            },
            {
              key: "g",
              label: "Lastenrad leihen",
              body: "Kostenlos für einen Tag, auch für Umzüge. Abholung an der Bücherei, Ausweis nötig.",
            },
            {
              key: "h",
              label: "Führung durchs Klärwerk",
              body: "Wie wird Wasser wieder sauber? Zwei Stunden, für Gruppen ab acht Personen, kostenlos.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-08-l4-16",
              no: 16,
              text: "Frau Kubis möchte ihren kaputten Toaster nicht wegwerfen.",
              answer: "d",
              explain:
                "(d) cihazı adıyla sayıyor: \"Ehrenamtliche reparieren Toaster, Lampen und Radios\". (a) da tamir yapıyor ama yalnız bisiklet.",
            },
            {
              kind: "match",
              id: "de-a2-08-l4-17",
              no: 17,
              text: "Herr Sagdic muss einen alten Schrank loswerden und hat kein Auto.",
              answer: "f",
              explain:
                "(f) \"Wir holen große Sachen bei Ihnen ab\" diyor — araba gerekmiyor. Üç haftalık bekleme dolabı atmayı geciktirir ama engellemez.",
            },
            {
              kind: "match",
              id: "de-a2-08-l4-18",
              no: 18,
              text: "Frau Prohaska möchte Gemüse anbauen, hat aber keinen Garten.",
              answer: "e",
              explain:
                "(e) \"Zehn freie Beete am Kanal\" veriyor ve su da var. Ekip biçmek için yer sunan tek ilan bu.",
            },
            {
              kind: "match",
              id: "de-a2-08-l4-19",
              no: 19,
              text: "Herr Larsen will am Samstag eine Waschmaschine transportieren und hat nur ein Rad.",
              answer: "g",
              explain:
                "(g) \"auch für Umzüge\" diyor ve bir günlüğüne ücretsiz. (a) da bisikletle ilgili ama taşımaya değil tamire yarıyor.",
            },
            {
              kind: "match",
              id: "de-a2-08-l4-20",
              no: 20,
              text: "Frau Yildiz fährt jeden Morgen allein ins Gewerbegebiet und möchte Kosten sparen.",
              answer: "b",
              explain:
                "(b) hem yeri hem tasarrufu karşılıyor: \"eine Fahrgemeinschaft ins Gewerbegebiet\" ve \"wir teilen die Kosten\".",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie hören Gespräche, ein längeres Gespräch, Ansagen und ein Interview.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, uzun bir konuşma, anonslar ve bir söyleşi dinleyeceksin.",
      tasks: [
        {
          id: "de-a2-08-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch am Fahrkartenschalter",
              genreTr: "Bilet gişesinde konuşma",
              situation: "Bir yolcu bilet alıyor.",
              plays: 2,
              segments: [
                { speaker: "Reisende", text: "Eine Karte nach Kleinried, bitte. Der Automat nimmt meine Karte nicht." },
                { speaker: "Mitarbeiter", text: "Bar geht immer. Das macht zwei Euro achtzig." },
                { speaker: "Reisende", text: "Ich habe nur einen Zehner." },
                { speaker: "Mitarbeiter", text: "Kein Problem, ich habe Wechselgeld." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch im Hausflur",
              genreTr: "Apartman girişinde konuşma",
              situation: "Bir komşu eski pili nereye atacağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Färber", text: "Wohin kommt die alte Batterie?" },
                { speaker: "Nachbarin", text: "Nicht in den Hausmüll. Die nimmt der Supermarkt zurück." },
                { speaker: "Herr Färber", text: "Auch ohne Kassenzettel?" },
                { speaker: "Nachbarin", text: "Ja, immer." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch am Bahnsteig",
              genreTr: "Peronda konuşma",
              situation: "Bir yolcu treninin nereden kalktığını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Wilms", text: "Fährt der Zug nach Norden von hier?" },
                { speaker: "Mitarbeiter", text: "Heute nicht. Wegen der Bauarbeiten fahren Sie ab Gleis fünf, drüben." },
                { speaker: "Frau Wilms", text: "Und die Zeit bleibt gleich?" },
                { speaker: "Mitarbeiter", text: "Nein, zehn Minuten später, um 14.20 Uhr." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch im Rathaus",
              genreTr: "Belediyede konuşma",
              situation: "Bir kadın bisiklet deposu için başvuruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Yildiz", text: "Ich möchte einen Platz im Fahrradkeller." },
                { speaker: "Mitarbeiter", text: "Da gibt es eine Liste. Im Moment warten neun Leute." },
                { speaker: "Frau Yildiz", text: "Wie lange dauert das ungefähr?" },
                { speaker: "Mitarbeiter", text: "Etwa ein halbes Jahr." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch im Bus",
              genreTr: "Otobüste konuşma",
              situation: "Bir yolcu hastane durağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Fahrgast", text: "Hält der Bus am Krankenhaus?" },
                { speaker: "Fahrer", text: "Nur bis achtzehn Uhr. Danach steigen Sie am Park aus und laufen zehn Minuten." },
                { speaker: "Fahrgast", text: "Es ist halb sieben." },
                { speaker: "Fahrer", text: "Dann leider Park." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-08-h1-1",
              no: 1,
              ref: "a1",
              text: "Wie zahlt die Reisende?",
              options: ["Mit der Bankkarte.", "Mit Bargeld.", "Sie zahlt später."],
              answer: 1,
              explain:
                "Kart çalışmıyor ve görevli tek yol bırakıyor: \"Bar geht immer\". Onluk banknot bozuk parayla karşılanıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h1-2",
              no: 2,
              ref: "a2",
              text: "Wohin soll die Batterie?",
              options: ["Zum Supermarkt.", "In den Hausmüll.", "Zum Wertstoffhof am Rand."],
              answer: 0,
              explain:
                "Komşu önce yeri eliyor — \"Nicht in den Hausmüll\" — sonra doğrusunu söylüyor: \"Die nimmt der Supermarkt zurück\".",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h1-3",
              no: 3,
              ref: "a3",
              text: "Was hat sich geändert?",
              options: ["Ausschließlich das Gleis.", "Ausschließlich die Uhrzeit.", "Gleis und Zeit."],
              answer: 2,
              explain:
                "İki değişiklik birlikte söyleniyor: \"ab Gleis fünf\" ve \"zehn Minuten später, um 14.20 Uhr\". Tek birini seçmek eksik kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h1-4",
              no: 4,
              ref: "a4",
              text: "Wie lange muss Frau Yildiz warten?",
              options: ["Etwa neun Wochen.", "Sechs Monate.", "Nur wenige Tage."],
              answer: 1,
              explain:
                "Kayıtta iki sayı var ve karışması kolay: sıradaki kişi sayısı dokuz, süre ise \"etwa ein halbes Jahr\", yani altı ay.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h1-5",
              no: 5,
              ref: "a5",
              text: "Wo steigt der Fahrgast aus?",
              options: ["Am Park.", "Am Krankenhaus.", "Er bleibt bis zur Endstation sitzen."],
              answer: 0,
              explain:
                "Hastane durağı \"nur bis achtzehn Uhr\" işliyor. Saat altı buçuk olduğu için şoförün cevabı net: \"Dann leider Park\".",
            },
          ],
        },
        {
          id: "de-a2-08-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen sagen, wie sie zur Arbeit kommen. Wer fährt wie? Ordnen Sie zu. Drei Möglichkeiten bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi işe nasıl gittiğini söylüyor. Kim nasıl gidiyor? Eşleştir. Üç seçenek artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Umfrage im Radio",
              genreTr: "Radyoda sokak röportajı",
              situation: "Beş kişiye işe nasıl gittikleri soruluyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Wir fragen heute: Wie kommen Sie zur Arbeit? Frau Kubis?" },
                { speaker: "Frau Kubis", text: "Mit dem Rad, jeden Tag, auch im Winter. Zwölf Kilometer." },
                { speaker: "Moderatorin", text: "Herr Sagdic?" },
                { speaker: "Herr Sagdic", text: "Früher bin ich selbst gefahren. Jetzt nehme ich den Zug und arbeite unterwegs." },
                { speaker: "Moderatorin", text: "Frau Prohaska?" },
                { speaker: "Frau Prohaska", text: "Bei mir sind es nur zehn Minuten. Ich gehe zu Fuß." },
                { speaker: "Moderatorin", text: "Herr Larsen?" },
                { speaker: "Herr Larsen", text: "Wir sind zu dritt in einem Wagen. Jede Woche fährt eine andere Person." },
                { speaker: "Moderatorin", text: "Und Frau Yildiz?" },
                { speaker: "Frau Yildiz", text: "Ich muss gar nicht mehr hin. Ich sitze zu Hause am Rechner." },
              ],
            },
          ],
          options: [
            { key: "a", label: "mit dem Rad" },
            { key: "b", label: "mit dem Zug" },
            { key: "c", label: "zu Fuß" },
            { key: "d", label: "in einer Fahrgemeinschaft" },
            { key: "e", label: "von zu Hause aus" },
            { key: "f", label: "mit dem Motorrad" },
            { key: "g", label: "mit dem Bus" },
            { key: "h", label: "allein im eigenen Auto" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-08-h2-6",
              no: 6,
              ref: "g1",
              text: "Frau Kubis",
              answer: "a",
              explain:
                "\"Mit dem Rad, jeden Tag, auch im Winter\" — on iki kilometre bunu zorlaştırıyor ama değiştirmiyor.",
            },
            {
              kind: "match",
              id: "de-a2-08-h2-7",
              no: 7,
              ref: "g1",
              text: "Herr Sagdic",
              answer: "b",
              explain:
                "Eskiyi bugünden ayırıyor: \"Früher bin ich selbst gefahren. Jetzt nehme ich den Zug\". (h) tam bu yüzden çeldirici — o eski hâli.",
            },
            {
              kind: "match",
              id: "de-a2-08-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Prohaska",
              answer: "c",
              explain:
                "\"Ich gehe zu Fuß\" — on dakikalık mesafe için başka bir araç saymıyor.",
            },
            {
              kind: "match",
              id: "de-a2-08-h2-9",
              no: 9,
              ref: "g1",
              text: "Herr Larsen",
              answer: "d",
              explain:
                "Araba var ama tek başına değil: \"Wir sind zu dritt in einem Wagen. Jede Woche fährt eine andere Person.\"",
            },
            {
              kind: "match",
              id: "de-a2-08-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Yildiz",
              answer: "e",
              explain:
                "Yolculuk hiç yok: \"Ich muss gar nicht mehr hin. Ich sitze zu Hause am Rechner.\"",
            },
          ],
        },
        {
          id: "de-a2-08-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage am Bahnhof",
              genreTr: "Garda anons",
              situation: "Bir tren iptal edildi.",
              plays: 2,
              segments: [
                {
                  text: "Information für Reisende nach Kleinried: Der Zug um 14.20 Uhr fällt heute aus. Nehmen Sie bitte den Bus vor dem Bahnhof. Er fährt zehn Minuten später.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Meldung im Radio",
              genreTr: "Radyo haberi",
              situation: "Bir köprü kapanıyor.",
              plays: 2,
              segments: [
                {
                  text: "Und noch eine Meldung für Autofahrer: Ab morgen ist die Brücke am Kanal für vier Wochen gesperrt. Radfahrer und Fußgänger kommen weiter durch.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Belediye başvuru sonucunu bildiriyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist die Stadtverwaltung. Ihr Antrag für den Fahrradkeller ist angenommen. Den Schlüssel bekommen Sie ab Montag im Rathaus, Zimmer zwölf.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Durchsage im Supermarkt",
              genreTr: "Süpermarkette anons",
              situation: "Yeni bir toplama kutusu.",
              plays: 2,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, unsere Sammelbox für alte Batterien steht ab heute neben dem Ausgang. Bitte werfen Sie dort keine anderen Sachen hinein.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht in einer Gruppe",
              genreTr: "Grup mesajı",
              situation: "Yük bisikleti için müsaitlik.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Team, das Lastenrad ist am Freitag schon reserviert. Am Samstag ist es frei. Sagt mir bis Donnerstag Bescheid, sonst gebe ich es weiter.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-08-h3-11",
              no: 11,
              ref: "m1",
              text: "Was sollen die Reisenden tun?",
              options: ["Auf den nächsten Zug warten.", "Den Bus nehmen.", "Zum anderen Gleis gehen."],
              answer: 1,
              explain:
                "Tren iptal ve karşılığında tek yol veriliyor: \"Nehmen Sie bitte den Bus vor dem Bahnhof\". On dakika gecikme otobüse ait.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h3-12",
              no: 12,
              ref: "m2",
              text: "Für wen ist die Brücke gesperrt?",
              options: ["Für alle Verkehrsteilnehmer.", "Nur für Fußgänger.", "Nur für Autos."],
              answer: 2,
              explain:
                "Haber baştan kime seslendiğini söylüyor — \"für Autofahrer\" — ve ötekileri dışarıda bırakıyor: \"Radfahrer und Fußgänger kommen weiter durch\".",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h3-13",
              no: 13,
              ref: "m3",
              text: "Was ist mit dem Antrag?",
              options: ["Er hat Erfolg gehabt.", "Er ist immer noch offen.", "Er kam leider zu spät."],
              answer: 0,
              explain:
                "\"Ihr Antrag für den Fahrradkeller ist angenommen\" — üstelik anahtarın nereden alınacağı da söyleniyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h3-14",
              no: 14,
              ref: "m4",
              text: "Was ist neu?",
              options: ["Ein anderer Ausgang.", "Eine Box für Batterien.", "Eine längere Öffnungszeit."],
              answer: 1,
              explain:
                "\"unsere Sammelbox für alte Batterien steht ab heute neben dem Ausgang\" — yeni olan kutu, çıkış değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-08-h3-15",
              no: 15,
              ref: "m5",
              text: "Wann ist das Lastenrad frei?",
              options: ["Am Donnerstag.", "Am Freitag.", "Am Samstag."],
              answer: 2,
              explain:
                "Üç gün geçiyor ve ayrılmalı: cuma dolu, \"Am Samstag ist es frei\", perşembe ise haber verme sınırı.",
            },
          ],
        },
        {
          id: "de-a2-08-h4",
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
              situation: "Arabaya kapatılan şehir merkezi bir yılı doldurdu.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Herr Grasser, seit einem Jahr ist die Innenstadt für Autos gesperrt. Waren die Händler dafür?" },
                {
                  speaker: "Herr Grasser",
                  text: "Am Anfang fast niemand. Von dreißig Läden haben achtundzwanzig einen Brief dagegen geschrieben.",
                },
                { speaker: "Moderatorin", text: "Und heute?" },
                {
                  speaker: "Herr Grasser",
                  text: "Heute wollen die meisten die Sperrung behalten. Zwei Läden sind trotzdem weggezogen, das gehört zur Wahrheit.",
                },
                { speaker: "Moderatorin", text: "Kommen wirklich mehr Kunden?" },
                {
                  speaker: "Herr Grasser",
                  text: "Mehr Menschen, ja. Ob sie mehr kaufen, weiß ich nicht. Das misst bei uns niemand.",
                },
                { speaker: "Moderatorin", text: "Was war der größte Fehler?" },
                {
                  speaker: "Herr Grasser",
                  text: "Wir haben zuerst gesperrt und erst danach über die Lieferungen gesprochen. Das war die falsche Reihenfolge.",
                },
                { speaker: "Moderatorin", text: "Ihr Rat an andere Städte?" },
                {
                  speaker: "Herr Grasser",
                  text: "Fangt mit einer Straße an, nicht mit der ganzen Stadt. Und redet vorher mit den Leuten.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-08-h4-16",
              no: 16,
              ref: "i1",
              text: "Die Händler waren von Anfang an für die Sperrung.",
              answer: false,
              explain:
                "Tam tersi ve sayıyla: \"Am Anfang fast niemand\" — otuz dükkândan yirmi sekizi karşı mektup yazmış.",
            },
            {
              kind: "bool",
              id: "de-a2-08-h4-17",
              no: 17,
              ref: "i1",
              text: "Nach einem Jahr sind die meisten Händler dafür.",
              answer: true,
              explain:
                "\"Heute wollen die meisten die Sperrung behalten\" — görüş bir yılda tersine dönmüş.",
            },
            {
              kind: "bool",
              id: "de-a2-08-h4-18",
              no: 18,
              ref: "i1",
              text: "Herr Grasser sagt, dass alle Läden geblieben sind.",
              answer: false,
              explain:
                "Kendi kendine itiraz ediyor: \"Zwei Läden sind trotzdem weggezogen, das gehört zur Wahrheit\".",
            },
            {
              kind: "bool",
              id: "de-a2-08-h4-19",
              no: 19,
              ref: "i1",
              text: "Herr Grasser weiß sicher, dass die Kunden mehr kaufen.",
              answer: false,
              explain:
                "İki şeyi ayırıyor: insan sayısı arttı, ama \"Ob sie mehr kaufen, weiß ich nicht. Das misst bei uns niemand.\"",
            },
            {
              kind: "bool",
              id: "de-a2-08-h4-20",
              no: 20,
              ref: "i1",
              text: "Herr Grasser rät, mit einer einzigen Straße zu beginnen.",
              answer: true,
              explain:
                "Öğüdü açık: \"Fangt mit einer Straße an, nicht mit der ganzen Stadt.\"",
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
          id: "de-a2-08-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie sind mit dem Rad gestürzt und können nächste Woche nicht in den Kurs kommen. Schreiben Sie Ihrer Lernpartnerin Meral eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Bisikletle düştün ve haftaya kursa gelemeyeceksin. Ders arkadaşın Meral'e bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Sagen Sie, was passiert ist.", tr: "Ne olduğunu söyle." },
              { de: "Bitten Sie um die Aufgaben.", tr: "Ödevleri iste." },
              { de: "Schlagen Sie einen Termin zum Lernen vor.", tr: "Birlikte çalışmak için bir gün öner." },
            ],
            sample: `Liebe Meral,

gestern bin ich mit dem Rad gestürzt. Mein Arm tut sehr weh, und ich darf ihn eine Woche nicht bewegen.

Deshalb komme ich nächste Woche nicht in den Kurs. Kannst du mir die Aufgaben schicken?

Vielleicht lernen wir am Samstag zusammen bei mir?

Liebe Grüße
Tomasz`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Ders arkadaşına yazıldığı için `du` kullanıldı mı?",
              "Olay somut anlatıldı mı (ne oldu, sonucu ne), yoksa yalnız `ich bin krank` mı?",
              "Ödev isteği ve buluşma önerisi gerçekten soru ya da öneri biçiminde mi kuruldu?",
              "Yaklaşık 40 kelime var mı ve hitap ile veda var mı?",
            ],
          },
        },
        {
          id: "de-a2-08-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Die Mülltonnen in Ihrer Straße sind seit zwei Wochen voll. Schreiben Sie an die Hausverwaltung (circa 40 Wörter).",
          promptTr:
            "Sokağındaki çöp konteynerleri iki haftadır dolu. Site yönetimine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu tarif et." },
              { de: "Sagen Sie, welche Folgen es hat.", tr: "Sonuçlarının ne olduğunu söyle." },
              { de: "Bitten Sie um eine Lösung und nennen Sie eine Frist.", tr: "Çözüm iste ve bir süre belirt." },
            ],
            sample: `Sehr geehrte Damen und Herren,

seit zwei Wochen holt niemand die Tonnen in der Ahornstraße 12 ab. Sie sind voll, und der Müll steht jetzt daneben auf dem Gehweg.

Abends riecht es stark, und mit dem Kinderwagen kommt man kaum vorbei.

Können Sie das bitte bis Freitag klären?

Mit freundlichen Grüßen
Ana Prohaska`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı?",
              "Sorun ne zamandan beri sürdüğü ve nerede olduğu belirtilerek somutlandı mı?",
              "Sonuç gerçek bir sonuç mu (koku, geçiş zorluğu), yoksa yalnız `das ist schlecht` mi?",
              "Bir tarih ya da süre verildi mi ve yaklaşık 40 kelime mi?",
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
          id: "de-a2-08-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Unterwegs. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Bus — Fahrrad — Weg zur Arbeit — Wetter — Kosten.",
          promptTr:
            "Konu: Yolda. Her anahtar sözcük için bir soru sor ve kendin de cevapla: otobüs — bisiklet — işe giden yol — hava — masraf.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Unterwegs. Ihr erstes Stichwort ist: Bus. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi yolda olmak konusunu konuşuyoruz. İlk sözcüğün: otobüs. Bana bir soru sor.",
            },
            { who: "you", hint: "«Bus» sözcüğüyle bir soru kur.", expect: "Bus sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Der Bus fährt bei mir alle zwanzig Minuten. Ihr nächstes Stichwort ist: Fahrrad.",
              tr: "Bizde otobüs yirmi dakikada bir geçiyor. Sıradaki sözcüğün: bisiklet.",
            },
            { who: "you", hint: "«Fahrrad» için bir soru kur.", expect: "Fahrrad sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Im Sommer fahre ich fast immer mit dem Rad. Und jetzt eine Frage an Sie: Wie lange brauchen Sie zur Arbeit?",
              tr: "Yazın neredeyse hep bisikletle giderim. Şimdi sana bir soru: İşe gitmen ne kadar sürüyor?",
            },
            { who: "you", hint: "Süreyi söyle ve kısaca gerekçelendir.", expect: "bir süre söylemek ve `weil` ile gerekçelendirmek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was machen Sie, wenn es stark regnet?",
              tr: "Teşekkürler. Son soru: Şiddetli yağmurda ne yapıyorsun?",
            },
            { who: "you", hint: "Hava kötüyken ne yaptığını söyle.", expect: "hava koşuluna bağlı bir çözüm söylemek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Wie oft fährt bei dir der Bus? — Alle zehn Minuten. Hast du ein Fahrrad? — Ja, seit einem Jahr. Wie lange brauchst du zur Arbeit? — Zwanzig Minuten, weil ich das Rad nehme. Was machst du bei Regen? — Dann fahre ich mit dem Bus. Was kostet die Monatskarte? — Neununddreißig Euro.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Süre, sıklık ve tutar gibi sayılar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a2-08-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie: Wie kommen Sie im Alltag von einem Ort zum anderen, und was möchten Sie in Ihrer Stadt gern ändern? Sprechen Sie etwa zwei Minuten.",
          promptTr:
            "Anlat: Günlük hayatta bir yerden bir yere nasıl gidiyorsun ve şehrinde neyi değiştirmek isterdin? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "die eigenen Wege beschreiben", tr: "Kendi yollarını anlatmak" },
              { de: "ein Problem nennen", tr: "Bir sorunu adlandırmak" },
              { de: "einen Wunsch begründen", tr: "Bir isteği gerekçelendirmek" },
            ],
            sample:
              "Zur Arbeit fahre ich mit der Straßenbahn, das dauert eine halbe Stunde. Zum Einkaufen gehe ich zu Fuß, der Markt ist gleich um die Ecke. Am Wochenende leihe ich manchmal ein Auto. Ein Problem ist der Abend: Nach zweiundzwanzig Uhr fährt fast nichts mehr. Deshalb möchte ich, dass die Bahn länger fährt. Dann müsste ich nicht immer früher nach Hause gehen.",
            criteria: [
              "Farklı yollar somut anlatıldı mı (nereye, hangi araçla, ne kadar sürüyor)?",
              "Adlandırılan sorun gerçekten kendi deneyiminden mi geliyor?",
              "İstek gerekçelendirildi mi? (Deshalb möchte ich …, weil …)",
              "Sıklık ve süre ifadeleri kullanılabildi mi?",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-08-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Ihr Kurs möchte einen Ausflug ohne Auto machen. Sprechen Sie über: Wohin? — Wie kommen alle hin? — Wann? — Wer plant was?",
          promptTr:
            "Birlikte plan yap. Kursunuz arabasız bir gezi yapmak istiyor. Şunları konuş: Nereye? — Herkes oraya nasıl gidecek? — Ne zaman? — Kim neyi planlayacak?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Ausflug. Zuerst das Ziel: Wohin möchten Sie?",
              tr: "Geziyi birlikte planlıyoruz. Önce yer: Nereye gitmek istersin?",
            },
            { who: "you", hint: "Bir yer öner ve nedenini söyle.", expect: "somut bir yer önermek ve gerekçelendirmek", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und wie kommen wir hin? Zwei Personen im Kurs haben kein Fahrrad.",
              tr: "Peki. Oraya nasıl gideceğiz? Kursta iki kişinin bisikleti yok.",
            },
            { who: "you", hint: "Bir ulaşım çözümü öner ve o iki kişiyi de hesaba kat.", expect: "bir ulaşım çözümü önermek ve kimseyi dışarıda bırakmamak", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Wann machen wir das? Ich arbeite samstags bis mittags.",
              tr: "Anlaştık. Ne zaman yapalım? Ben cumartesileri öğlene kadar çalışıyorum.",
            },
            { who: "you", hint: "Bir zaman öner ve itirazı hesaba kat.", expect: "bir zaman önermek ve karşı tarafın durumunu dikkate almak", seconds: 35 },
            {
              who: "partner",
              de: "Passt. Und wer kümmert sich um was? Ich kann nicht alles allein machen.",
              tr: "Uyar. Peki kim neyle ilgilenecek? Ben hepsini tek başıma yapamam.",
            },
            { who: "you", hint: "Görevleri paylaş ve en az birini kendine al.", expect: "görevleri paylaşmak ve açıkça bir iş üstlenmek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneri sunmak" },
              { de: "auf Einwände reagieren", tr: "İtirazlara karşılık vermek" },
              { de: "eine Aufgabe übernehmen", tr: "Bir işi üstlenmek" },
            ],
            sample:
              "Ich schlage den See im Nachbarort vor, dorthin fährt der Zug direkt. Für die zwei ohne Rad kaufen wir einfach Zugkarten, dann kommen alle mit. Wir treffen uns am Samstag um vierzehn Uhr, dann bist du mit der Arbeit fertig. Ich frage nach den Gruppenkarten, und du schreibst die Liste, wer mitkommt.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu, yoksa genel bir onay mı?",
              "Karşı tarafın itirazı (bisikleti olmayanlar, cumartesi mesaisi) gerçekten hesaba katıldı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Öneri kalıpları kullanıldı mı? (Ich schlage vor …, Wir können …)",
            ],
          },
        },
      ],
    },
  ],
};
