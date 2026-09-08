import type { MockPaper } from "../types";

/**
 * A2 · Deneme 2 — "Reisen und Einkaufen".
 *
 * Yapı A2 · Deneme 1 ile birebir aynı (bkz. `a2-01.ts`). Değişen içerik alanı:
 * birinci kâğıt boş zaman ve sağlık, bu kâğıt yolculuk ve alışveriş.
 *
 * Bu kâğıtta eşleştirme görevinin çeldiricileri TEK ölçütte düşüyor ve ölçüt
 * her seferinde başka: yaş sınırı (Sprachreise), hayvan yasağı (Hotel), fiyat
 * ve hız (Flug). Amaç, ilanın yalnız başlığına bakıp seçmeyi imkânsız kılmak.
 *
 * Dinleme Teil 2 bu kez KİŞİ değil GÜN eşleştiriyor: konuşma boyunca plan iki
 * kez değişiyor (yağmur yüzünden yürüyüş kayıyor, havuz salı kapalı). Ölçülen
 * şey, bir konuşmanın sonundaki nihai kararı tutabilmek.
 */
export const A2_02: MockPaper = {
  id: "de-a2-02",
  course: "de",
  level: "A2",
  no: 2,
  theme: "Reisen und Einkaufen",
  themeTr: "Yolculuk ve alışveriş",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen einen Blogtext, einen Wegweiser, eine E-Mail und Anzeigen. Wählen Sie zu jeder Aufgabe die richtige Lösung.",
      instructionTr:
        "Bu bölümde dört görev var: bir blog yazısı, bir yön tabelası, bir e-posta ve ilanlar okuyacaksın. Her madde için doğru cevabı seç.",
      tasks: [
        {
          id: "de-a2-02-l1",
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
              title: "Ein Jahr ohne neue Kleidung",
              body: `Letzten Januar habe ich meiner Schwester etwas versprochen: Ein Jahr lang kaufe ich keine neue Kleidung. Sie hat gelacht und gesagt: "Du schaffst das nicht bis Ostern."

Am Anfang war es leicht. Mein Schrank war voll und einige Sachen habe ich lange nicht getragen.

Im April ist meine Lieblingsjacke kaputt gegangen. Ich bin zum ersten Mal zu einer Änderungsschneiderei gegangen. Die Reparatur hat zwölf Euro gekostet. Eine neue Jacke kostet bei mir normalerweise achtzig.

Im Sommer war es schwierig. Eine Kollegin hat geheiratet und ich hatte kein passendes Kleid. Deshalb habe ich eins von einer Freundin geliehen. Auf den Fotos sehe ich sehr gut aus.

Im Herbst war ich zum ersten Mal auf einem Flohmarkt. Gekauft habe ich dort nichts, aber ich habe drei Pullover verkauft.

Und jetzt? Das Jahr ist vorbei. Ich kaufe wieder, aber weniger und langsamer. Meine Schwester übrigens auch.`,
              gloss: [
                { de: "versprechen", tr: "söz vermek", en: "to promise" },
                { de: "die Änderungsschneiderei", tr: "tadilat terzisi", en: "tailoring shop" },
                { de: "leihen", tr: "ödünç almak / vermek", en: "to borrow, to lend" },
                { de: "der Flohmarkt", tr: "bit pazarı", en: "flea market" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-02-l1-1",
              no: 1,
              text: "Was hat die Autorin ihrer Schwester versprochen?",
              options: [
                "Zwölf Monate ohne neue Kleidung.",
                "Nur noch auf dem Flohmarkt einzukaufen.",
                "Ihre alte Kleidung zu verkaufen.",
              ],
              answer: 0,
              explain:
                "İlk cümlede söz veriliyor: \"Ein Jahr lang kaufe ich keine neue Kleidung\". Bir yıl on iki aydır. Bit pazarı ve satış sonradan olan şeyler, sözün içeriği değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l1-2",
              no: 2,
              text: "Was ist im April passiert?",
              options: ["Sie hat eine neue Jacke gekauft.", "Sie hat ihre Jacke reparieren lassen.", "Sie hat ihre Jacke verkauft."],
              answer: 1,
              explain:
                "Ceket bozulunca terziye gidiyor, tamir 12 euro tutuyor. 80 euro yeni ceketin fiyatı — yani almadığı şeyin.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l1-3",
              no: 3,
              text: "Wie hat sie das Problem mit dem Kleid gelöst?",
              options: ["Sie hat ein Kleid gekauft.", "Sie ist nicht zur Hochzeit gegangen.", "Sie hat ein Kleid geliehen."],
              answer: 2,
              explain:
                "\"Deshalb habe ich eins von einer Freundin geliehen\" — arkadaşından ödünç alıyor. Düğüne gittiği fotoğraflardan belli.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l1-4",
              no: 4,
              text: "Was hat sie auf dem Flohmarkt gemacht?",
              options: ["Sie hat Pullover verkauft.", "Sie hat Pullover gekauft.", "Sie hat Kleidung getauscht."],
              answer: 0,
              explain:
                "\"Gekauft habe ich dort nichts, aber ich habe drei Pullover verkauft\" — satmış, almamış. Takas hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l1-5",
              no: 5,
              text: "Wie kauft die Autorin heute ein?",
              options: ["Genau wie früher.", "Gar nicht mehr.", "Weniger als früher."],
              answer: 2,
              explain:
                "\"Ich kaufe wieder, aber weniger und langsamer\" — alışverişi bırakmamış, azaltmış. `aber` iki bilgiyi birbirinden ayırıyor.",
            },
          ],
        },
        {
          id: "de-a2-02-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Wegweiser und die Aufgaben 6 bis 10. Wählen Sie: a, b oder c.",
          promptTr: "Yön tabelasını ve 6–10. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Wegweiser im Einkaufszentrum",
              genreTr: "Alışveriş merkezi yön tabelası",
              title: "Einkaufszentrum Rheingalerie",
              body: `UNTERGESCHOSS
Supermarkt · Bäckerei · Getränkemarkt
Parkhaus (Zufahrt über die Rheinstraße)

ERDGESCHOSS
Information · Schuhe · Drogerie · Blumen
Geldautomat neben dem Eingang Süd

1. STOCK
Kleidung · Sport · Bücher · Kundentoiletten

2. STOCK
Elektro · Handys · Reparaturservice
Restaurant "Panorama" (täglich bis 22 Uhr)

3. STOCK
Büros — kein Zugang für Kunden

ÖFFNUNGSZEITEN
Montag bis Samstag 9.30–20.00 Uhr · Sonntag geschlossen

KUNDENSERVICE
Umtausch nur mit Kassenbon, im Erdgeschoss`,
              gloss: [
                { de: "der Geldautomat", tr: "bankamatik", en: "cash machine" },
                { de: "der Umtausch", tr: "değişim, iade", en: "exchange" },
                { de: "der Kassenbon", tr: "kasa fişi", en: "receipt" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-02-l2-6",
              no: 6,
              text: "Sie möchten am Sonntag einkaufen. Was ist richtig?",
              options: ["Nur der Supermarkt hat geöffnet.", "Das Zentrum ist geschlossen.", "Das Zentrum öffnet um 9.30 Uhr."],
              answer: 1,
              explain:
                "Çalışma saatleri pazartesi-cumartesi için; ardından \"Sonntag geschlossen\" yazıyor. 9.30 hafta içi açılış saati.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l2-7",
              no: 7,
              text: "Wo bekommen Sie Bargeld?",
              options: ["Im ersten Stock.", "Im Untergeschoss.", "Im Erdgeschoss."],
              answer: 2,
              explain: "«Geldautomat neben dem Eingang Süd» satırı ERDGESCHOSS başlığının altında. Bodrumda market, birinci katta giyim var.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l2-8",
              no: 8,
              text: "Ihr Handy ist kaputt. Wohin gehen Sie?",
              options: ["In den ersten Stock.", "In den zweiten Stock.", "In den dritten Stock."],
              answer: 1,
              explain:
                "«2. STOCK — Elektro · Handys · Reparaturservice». Üçüncü kat «Büros — kein Zugang für Kunden», yani müşteriye kapalı.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l2-9",
              no: 9,
              text: "Sie möchten um 21 Uhr etwas essen. Was ist möglich?",
              options: ["Das Restaurant im zweiten Stock.", "Die Bäckerei im Untergeschoss.", "Nichts, alles ist zu."],
              answer: 0,
              explain:
                "Merkez 20.00'de kapanıyor ama restoran ayrıca yazılmış: \"täglich bis 22 Uhr\". Fırın merkezin saatine tabi.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l2-10",
              no: 10,
              text: "Sie möchten eine Hose umtauschen. Was brauchen Sie?",
              options: ["Den Kassenbon.", "Einen Ausweis.", "Eine Anmeldung beim Kundenservice."],
              answer: 0,
              explain: "\"Umtausch nur mit Kassenbon\" — tek koşul fiş. Kundenservice yön tabelasında geçiyor ama orada yazan şey kayıt değil, iadenin yapıldığı yer.",
            },
          ],
        },
        {
          id: "de-a2-02-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie die E-Mail und die Aufgaben 11 bis 15. Wählen Sie: a, b oder c.",
          promptTr: "E-postayı ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "E-Mail",
              genreTr: "E-posta",
              title: "Von: Selin · An: Ferhat",
              body: `Hallo Ferhat,

danke für deine Nachricht. Ja, wir sind gut angekommen, aber die Fahrt war lang.

Der Zug hatte in Frankfurt fünfzig Minuten Verspätung. Deshalb haben wir den Anschluss verpasst und mussten zwei Stunden am Bahnhof warten. Zum Glück gab es dort ein gutes Café.

Die Wohnung ist besser als auf den Fotos. Sie liegt im vierten Stock, leider ohne Aufzug. Mit den Koffern war das anstrengend, aber der Blick ist toll.

Das Wetter ist nicht so gut. Gestern hat es den ganzen Tag geregnet, deshalb waren wir im Aquarium. Heute scheint zum ersten Mal die Sonne.

Am Freitag fahren wir mit dem Bus an die Küste. Ich schicke dir dann Fotos.

Und dein neues Fahrrad? Bist du damit schon zur Arbeit gefahren?

Liebe Grüße
Selin`,
              gloss: [
                { de: "die Verspätung", tr: "gecikme", en: "delay" },
                { de: "den Anschluss verpassen", tr: "aktarmayı kaçırmak", en: "to miss the connection" },
                { de: "anstrengend", tr: "yorucu", en: "exhausting" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-02-l3-11",
              no: 11,
              text: "Warum hat die Reise länger gedauert?",
              options: ["Der Zug nach Frankfurt war überfüllt.", "Sie haben den Anschluss verpasst.", "Sie sind falsch eingestiegen."],
              answer: 1,
              explain:
                "\"Der Zug hatte in Frankfurt fünfzig Minuten Verspätung. Deshalb haben wir den Anschluss verpasst\" — neden gecikme, sonuç kaçan aktarma. Frankfurt metinde geçiyor ama doluluk için değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l3-12",
              no: 12,
              text: "Was schreibt Selin über die Wohnung?",
              options: ["Sie hat keinen Aufzug.", "Sie ist schlechter als auf den Fotos.", "Sie ist zu klein."],
              answer: 0,
              explain:
                "\"im vierten Stock, leider ohne Aufzug\". Daire fotoğraflardan DAHA İYİ, daha kötü değil; büyüklüğünden söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l3-13",
              no: 13,
              text: "Was haben sie gestern gemacht?",
              options: ["Sie sind an der Küste spazieren gegangen.", "Sie waren im Aquarium.", "Sie sind zu Hause geblieben."],
              answer: 1,
              explain: "\"Gestern hat es den ganzen Tag geregnet, deshalb waren wir im Aquarium\". Kıyı metinde var ama CUMA günü planlanan gezi için; güneş de bugün açtı, dün değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l3-14",
              no: 14,
              text: "Was ist für Freitag geplant?",
              options: ["Eine Busfahrt ans Meer.", "Ein zweiter Besuch im Aquarium.", "Die Rückfahrt nach Hause."],
              answer: 0,
              explain: "\"Am Freitag fahren wir mit dem Bus an die Küste\" — kıyı denizdir, araç otobüs. Akvaryum DÜN gidilen yer, dönüş yolculuğundan ise hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-l3-15",
              no: 15,
              text: "Was möchte Selin von Ferhat wissen?",
              options: ["Wann er kommt.", "Ob er mit dem Rad zur Arbeit fährt.", "Wie das Wetter bei ihm ist."],
              answer: 1,
              explain:
                "Mektubun tek sorusu bu: \"Bist du damit schon zur Arbeit gefahren?\" Hava durumu Selin'in kendi haberi.",
            },
          ],
        },
        {
          id: "de-a2-02-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen ein Angebot. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler bir teklif arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Kinderbasar in der Schule Nord",
              body: "Samstag von 10 bis 14 Uhr. Kleidung, Spielzeug und Bücher aus zweiter Hand, alles geprüft und sauber. Eintritt frei.",
            },
            {
              key: "b",
              label: "Busreise Südtirol mit Reiseleitung",
              body: "Sieben Tage, Hotel und alle Ausflüge inklusive. Unsere Reiseleitung plant den ganzen Tag für Sie. Abholung in Ihrer Stadt.",
            },
            {
              key: "c",
              label: "Fahrradbörse am Rathausplatz",
              body: "Sonntag ab 9 Uhr. Räder kaufen, verkaufen oder tauschen. Standgebühr 5 Euro, Anmeldung vor Ort.",
            },
            {
              key: "d",
              label: "Nachtbus nach Berlin",
              body: "Ab 14,90 Euro. Abfahrt 23.15 Uhr, Ankunft 6.40 Uhr. Ohne Umsteigen, freie Platzwahl, WLAN an Bord.",
            },
            {
              key: "e",
              label: "Sprachreise nach Malta",
              body: "Zwei Wochen Unterricht und Gastfamilie. Für Jugendliche von 14 bis 18 Jahren. Betreuung rund um die Uhr.",
            },
            {
              key: "f",
              label: "Ferienhaus an der Ostsee",
              body: "Hunde sind herzlich willkommen. Zwei Zimmer, 300 Meter zum Strand, eigener Garten. Ab 65 Euro pro Nacht.",
            },
            {
              key: "g",
              label: "Hotel Seeblick — Wellness für zwei",
              body: "Sauna und Frühstück inklusive, ruhige Lage am See. Haustiere sind leider nicht erlaubt.",
            },
            {
              key: "h",
              label: "Flug nach Berlin",
              body: "Ab 89 Euro, täglich zweimal. Handgepäck inklusive, Flugzeit 70 Minuten.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-02-l4-16",
              no: 16,
              text: "Frau Bauer möchte mit ihrem Hund Urlaub am Meer machen.",
              answer: "f",
              explain:
                "(f) hem denize 300 metre hem de \"Hunde sind herzlich willkommen\". (g) de göl kenarında ama \"Haustiere sind leider nicht erlaubt\" — tek ölçütte düşüyor.",
            },
            {
              kind: "match",
              id: "de-a2-02-l4-17",
              no: 17,
              text: "Ein Student sucht eine billige Fahrt nach Berlin. Er hat Zeit und braucht keine schnelle Verbindung.",
              answer: "d",
              explain:
                "(d) 14,90 euro ve gece yolculuğu — ucuz ama uzun. (h) de Berlin'e gidiyor, ama 89 euro ve hızlı: öğrencinin aradığı ölçüte ters.",
            },
            {
              kind: "match",
              id: "de-a2-02-l4-18",
              no: 18,
              text: "Herr Ludwig (72) möchte eine Reise mit Programm, weil er nicht selbst planen will.",
              answer: "b",
              explain:
                "(b) rehberli: \"Unsere Reiseleitung plant den ganzen Tag für Sie\", üstelik evden alınıyor. (e) de organize ama 14–18 yaş için.",
            },
            {
              kind: "match",
              id: "de-a2-02-l4-19",
              no: 19,
              text: "Familie Kaya sucht gebrauchte Kinderkleidung in guter Qualität.",
              answer: "a",
              explain:
                "(a) ikinci el çocuk kıyafeti satıyor ve \"alles geprüft und sauber\" diyor — kalite koşulu da karşılanıyor.",
            },
            {
              kind: "match",
              id: "de-a2-02-l4-20",
              no: 20,
              text: "Lisa möchte ihr altes Fahrrad verkaufen und ein größeres kaufen.",
              answer: "c",
              explain:
                "(c) hem alım hem satım için: \"Räder kaufen, verkaufen oder tauschen\". Tek yerde iki işi birden yapabiliyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Ansagen, ein längeres Gespräch, kurze Gespräche und ein Interview. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde dört görev var: anonslar, uzun bir konuşma, kısa konuşmalar ve bir söyleşi dinleyeceksin. Önce soruları oku.",
      tasks: [
        {
          id: "de-a2-02-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text einmal.",
          promptTr: "Doğru olan hangisi? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage am Bahnhof",
              genreTr: "Garda anons",
              situation: "Peron değişikliği duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Information zu Ihrer Reise: Der Zug nach Stuttgart, Abfahrt zwölf Uhr vierzig, fährt heute von Gleis sieben. Nicht wie angezeigt von Gleis drei. Wir bitten um Entschuldigung.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kargo şirketi arıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist der Paketdienst Sander. Wir waren heute bei Ihnen, aber niemand war zu Hause. Ihr Paket liegt jetzt im Supermarkt in der Kirchgasse. Sie können es eine Woche lang abholen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Reisewetter im Radio",
              genreTr: "Radyoda tatil hava durumu",
              situation: "Tatil bölgeleri için hava durumu.",
              plays: 1,
              segments: [
                {
                  text: "Das Reisewetter: An der Nordsee bleibt es windig, aber trocken. In den Alpen regnet es bis Mittwoch. Am Mittelmeer wird es sehr warm, bis zweiunddreißig Grad.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Durchsage im Supermarkt",
              genreTr: "Markette anons",
              situation: "Markette bir duyuru yapılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, an Kasse vier ist ab sofort auch Kartenzahlung möglich. Wegen einer Störung nehmen wir dort heute leider kein Bargeld an.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Ansage am Flughafen",
              genreTr: "Havalimanı anonsu",
              situation: "Bir uçuş için duyuru.",
              plays: 1,
              segments: [
                {
                  text: "Fluggäste nach Lissabon: Ihr Flug startet später, neue Abflugzeit ist sechzehn Uhr fünfzig. Bitte bleiben Sie in der Nähe von Ausgang zwölf. Getränke bekommen Sie am Schalter kostenlos.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-02-h1-1",
              no: 1,
              ref: "h1",
              text: "Was hat sich geändert?",
              options: ["Die Abfahrtszeit.", "Das Gleis.", "Das Ziel."],
              answer: 1,
              explain:
                "Saat 12.40 aynı kalıyor, peron 3'ten 7'ye alınıyor: \"Nicht wie angezeigt von Gleis drei\".",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h1-2",
              no: 2,
              ref: "h2",
              text: "Wo ist das Paket jetzt?",
              options: ["Beim Nachbarn.", "Bei der Post.", "Im Supermarkt."],
              answer: 2,
              explain:
                "\"Ihr Paket liegt jetzt im Supermarkt in der Kirchgasse\" — bir hafta orada bekliyor. Komşu ve postane geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h1-3",
              no: 3,
              ref: "h3",
              text: "Wo regnet es?",
              options: ["In den Alpen.", "An der Nordsee.", "Am Mittelmeer."],
              answer: 0,
              explain:
                "«In den Alpen regnet es bis Mittwoch» — yağmur Alpler'de. Kuzey Denizi «windig, aber trocken», Akdeniz ise çok sıcak.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h1-4",
              no: 4,
              ref: "h4",
              text: "Was ist an Kasse vier heute nicht möglich?",
              options: ["Mit Karte zahlen.", "Bar zahlen.", "Pfandflaschen abgeben."],
              answer: 1,
              explain:
                "«an Kasse vier ist ab sofort auch Kartenzahlung möglich. Wegen einer Störung nehmen wir dort heute leider kein Bargeld an» — mümkün olan kart, olmayan nakit.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h1-5",
              no: 5,
              ref: "h5",
              text: "Was sollen die Fluggäste machen?",
              options: ["Zu einem anderen Ausgang gehen.", "Ihr Ticket umtauschen.", "Beim Ausgang warten, bis es weitergeht."],
              answer: 2,
              explain:
                "Tek yönerge bu: \"Bitte bleiben Sie in der Nähe von Ausgang zwölf\". Kapı değişmiyor, bilet de değiştirilmiyor.",
            },
          ],
        },
        {
          id: "de-a2-02-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Eine Familie plant fünf Urlaubstage. Was machen sie an welchem Tag? Ordnen Sie zu. Drei Aktivitäten bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Bir aile beş tatil gününü planlıyor. Hangi gün ne yapıyorlar? Eşleştir. Üç etkinlik artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch in der Familie",
              genreTr: "Ailede konuşma",
              situation: "Bir aile tatil haftasını planlıyor.",
              plays: 2,
              segments: [
                { speaker: "Vater", text: "Also, wir haben fünf Tage. Was machen wir am Montag?" },
                { speaker: "Mira", text: "Am Montag ist Markttag im Dorf. Da möchte ich unbedingt hin." },
                { speaker: "Vater", text: "Gut. Und am Dienstag wollten wir wandern." },
                { speaker: "Mutter", text: "Für Dienstag ist Regen gemeldet. Wandern wir lieber am Mittwoch." },
                { speaker: "Vater", text: "Dann gehen wir am Dienstag ins Museum." },
                { speaker: "Mira", text: "Im Museum war ich letztes Jahr schon. Können wir nicht schwimmen?" },
                { speaker: "Mutter", text: "Das Schwimmbad hat dienstags zu. Also Museum am Dienstag und schwimmen am Donnerstag." },
                { speaker: "Mira", text: "Einverstanden." },
                { speaker: "Vater", text: "Und am Freitag machen wir die Schifffahrt, wie versprochen." },
              ],
            },
          ],
          options: [
            { key: "a", label: "schwimmen gehen" },
            { key: "b", label: "eine Schifffahrt machen" },
            { key: "c", label: "auf den Markt gehen" },
            { key: "d", label: "ins Museum gehen" },
            { key: "e", label: "eine Fahrradtour machen" },
            { key: "f", label: "wandern" },
            { key: "g", label: "ins Konzert gehen" },
            { key: "h", label: "in den Zoo gehen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-02-h2-6",
              no: 6,
              ref: "g1",
              text: "Montag",
              answer: "c",
              explain: "\"Am Montag ist Markttag im Dorf\" — bu plan konuşma boyunca hiç değişmiyor.",
            },
            {
              kind: "match",
              id: "de-a2-02-h2-7",
              no: 7,
              ref: "g1",
              text: "Dienstag",
              answer: "d",
              explain:
                "Salı önce yürüyüş için düşünülüyor, «Für Dienstag ist Regen gemeldet» deyince kayıyor; yüzme öneriliyor ama «Das Schwimmbad hat dienstags zu». Geriye müze kalıyor.",
            },
            {
              kind: "match",
              id: "de-a2-02-h2-8",
              no: 8,
              ref: "g1",
              text: "Mittwoch",
              answer: "f",
              explain: "\"Wandern wir lieber am Mittwoch\" — yürüyüş salıdan çarşambaya alınıyor.",
            },
            {
              kind: "match",
              id: "de-a2-02-h2-9",
              no: 9,
              ref: "g1",
              text: "Donnerstag",
              answer: "a",
              explain: "Anne özetliyor: \"Museum am Dienstag und schwimmen am Donnerstag\". Mira kabul ediyor.",
            },
            {
              kind: "match",
              id: "de-a2-02-h2-10",
              no: 10,
              ref: "g1",
              text: "Freitag",
              answer: "b",
              explain: "\"Am Freitag machen wir die Schifffahrt, wie versprochen\" — sözü verilmiş tek program.",
            },
          ],
        },
        {
          id: "de-a2-02-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "k1",
              genre: "Gespräch am Schalter",
              genreTr: "Gişede konuşma",
              situation: "Bir yolcu bilet alıyor.",
              plays: 2,
              segments: [
                { speaker: "Reisender", text: "Einmal nach Nürnberg, bitte. Wann fährt der nächste Zug?" },
                { speaker: "Mitarbeiterin", text: "In zwölf Minuten, aber mit einmal Umsteigen. Der direkte fährt erst in einer Stunde." },
                { speaker: "Reisender", text: "Ich habe es eilig. Dann nehme ich den mit Umsteigen." },
              ],
            },
            {
              kind: "audio",
              id: "k2",
              genre: "Gespräch im Geschäft",
              genreTr: "Mağazada konuşma",
              situation: "Bir müşteri ürün değiştirmek istiyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Ich möchte diesen Pullover umtauschen. Er ist zu klein." },
                { speaker: "Verkäufer", text: "Haben Sie den Kassenbon dabei?" },
                { speaker: "Kundin", text: "Nein, den habe ich zu Hause." },
                { speaker: "Verkäufer", text: "Ohne Bon können wir nur einen Gutschein geben. Mit Bon bekommen Sie das Geld zurück." },
              ],
            },
            {
              kind: "audio",
              id: "k3",
              genre: "Gespräch an der Hotelrezeption",
              genreTr: "Otel resepsiyonunda konuşma",
              situation: "Bir misafir kahvaltıyı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Gast", text: "Ab wann gibt es Frühstück?" },
                { speaker: "Rezeption", text: "Unter der Woche ab sechs Uhr dreißig, am Wochenende ab acht." },
                { speaker: "Gast", text: "Und morgen ist Sonntag, richtig?" },
                { speaker: "Rezeption", text: "Genau." },
              ],
            },
            {
              kind: "audio",
              id: "k4",
              genre: "Gespräch an der Kasse",
              genreTr: "Kasada konuşma",
              situation: "Bir müşteri ödeme yapıyor.",
              plays: 2,
              segments: [
                { speaker: "Kassiererin", text: "Das macht dreiundzwanzig Euro fünfzig." },
                { speaker: "Kunde", text: "Kann ich mit Karte zahlen?" },
                { speaker: "Kassiererin", text: "Erst ab fünfundzwanzig Euro. Möchten Sie noch etwas dazunehmen?" },
                { speaker: "Kunde", text: "Nein, ich habe Bargeld dabei." },
              ],
            },
            {
              kind: "audio",
              id: "k5",
              genre: "Gespräch im Reisebüro",
              genreTr: "Seyahat acentesinde konuşma",
              situation: "Bir çift tatil arıyor.",
              plays: 2,
              segments: [
                { speaker: "Beraterin", text: "Möchten Sie lieber ein Hotel oder eine Ferienwohnung?" },
                { speaker: "Kundin", text: "Eine Wohnung. Wir kochen gern selbst." },
                { speaker: "Beraterin", text: "Dann habe ich etwas in Kroatien, zehn Minuten vom Strand." },
                { speaker: "Kundin", text: "Klingt gut. Hat sie eine Waschmaschine?" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-02-h3-11",
              no: 11,
              ref: "k1",
              text: "Welchen Zug nimmt der Reisende?",
              options: ["Den Zug mit Umsteigen.", "Den direkten Zug.", "Er fährt morgen."],
              answer: 0,
              explain:
                "«Ich habe es eilig. Dann nehme ich den mit Umsteigen» — on iki dakika sonraki aktarmalı tren seçiliyor; direkt tren bir saat sonra.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h3-12",
              no: 12,
              ref: "k2",
              text: "Was bekommt die Kundin heute?",
              options: ["Ihr Geld zurück.", "Einen größeren Pullover.", "Einen Gutschein."],
              answer: 2,
              explain:
                "«Ohne Bon können wir nur einen Gutschein geben» — fiş evde kaldığı için hediye çeki. Para iadesi ancak fişle olurdu.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h3-13",
              no: 13,
              ref: "k3",
              text: "Ab wann gibt es morgen Frühstück?",
              options: ["Ab 6.30 Uhr.", "Ab 8 Uhr.", "Ab 7 Uhr."],
              answer: 1,
              explain:
                "Yarın pazar, yani hafta sonu: kahvaltı sekizde. 6.30 hafta içi saati.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h3-14",
              no: 14,
              ref: "k4",
              text: "Wie bezahlt der Kunde?",
              options: ["Mit Bargeld.", "Mit Karte.", "Er kauft noch etwas dazu."],
              answer: 0,
              explain:
                "Kart 25 eurodan itibaren geçiyor, tutar 23,50. Müşteri ek alışveriş teklifini reddedip nakit ödüyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-02-h3-15",
              no: 15,
              ref: "k5",
              text: "Was sucht die Kundin?",
              options: ["Ein Hotel am Strand.", "Eine Ferienwohnung.", "Eine Reise mit Programm."],
              answer: 1,
              explain:
                "\"Eine Wohnung. Wir kochen gern selbst\" — kendileri pişirmek istedikleri için daire. Otel açıkça eleniyor.",
            },
          ],
        },
        {
          id: "de-a2-02-h4",
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
              situation: "Beş yıldır uçağa binmeyen bir adamla söyleşi.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Herr Feld, Sie fliegen seit fünf Jahren nicht mehr. War das eine schwere Entscheidung?" },
                { speaker: "Herr Feld", text: "Nein, gar nicht. Ich fliege einfach nicht gern. Der Umwelt hilft es zusätzlich." },
                { speaker: "Moderatorin", text: "Aber der Zug ist doch oft teurer." },
                { speaker: "Herr Feld", text: "Wenn ich früh buche, zahle ich weniger als für einen Flug. Spontan ist der Zug wirklich teuer." },
                { speaker: "Moderatorin", text: "Und die lange Fahrzeit?" },
                { speaker: "Herr Feld", text: "Im Zug arbeite ich. Am Flughafen warte ich nur. Am Ende verliere ich kaum Zeit." },
                { speaker: "Moderatorin", text: "Fahren Ihre Kinder auch mit?" },
                { speaker: "Herr Feld", text: "Meine Tochter fliegt weiter. Ich sage nichts dazu, jeder entscheidet selbst." },
                { speaker: "Moderatorin", text: "Was raten Sie unseren Hörern?" },
                { speaker: "Herr Feld", text: "Probieren Sie es einmal aus. Und buchen Sie drei Monate vorher, dann ist es günstig." },
              ],
              gloss: [
                { de: "die Entscheidung", tr: "karar", en: "decision" },
                { de: "spontan", tr: "aniden, plansız", en: "spontaneously" },
                { de: "raten", tr: "öğüt vermek", en: "to advise" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-02-h4-16",
              no: 16,
              ref: "i1",
              text: "Herr Feld hat lange über seine Entscheidung nachgedacht.",
              answer: false,
              explain:
                "\"Nein, gar nicht\" diyor: karar zor olmamış. Uçmayı zaten sevmiyor, çevre ise ek bir neden.",
            },
            {
              kind: "bool",
              id: "de-a2-02-h4-17",
              no: 17,
              ref: "i1",
              text: "Wer früh bucht, zahlt für den Zug weniger als für einen Flug.",
              answer: true,
              explain:
                "\"Wenn ich früh buche, zahle ich weniger als für einen Flug\" — koşul erken rezervasyon; son anda pahalı olduğunu kendisi de söylüyor.",
            },
            {
              kind: "bool",
              id: "de-a2-02-h4-18",
              no: 18,
              ref: "i1",
              text: "Er verliert durch die Bahn viel Zeit.",
              answer: false,
              explain:
                "Trende çalıştığı, havalimanında ise sadece beklediği için \"Am Ende verliere ich kaum Zeit\" diyor.",
            },
            {
              kind: "bool",
              id: "de-a2-02-h4-19",
              no: 19,
              ref: "i1",
              text: "Seine Tochter fliegt weiterhin.",
              answer: true,
              explain:
                "\"Meine Tochter fliegt weiter\" — kızı uçmayı sürdürüyor ve buna karışmıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-02-h4-20",
              no: 20,
              ref: "i1",
              text: "Er empfiehlt, kurz vor der Reise zu buchen.",
              answer: false,
              explain:
                "Tam tersi: \"buchen Sie drei Monate vorher, dann ist es günstig\". Son dakika rezervasyonu pahalı.",
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
          id: "de-a2-02-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie sind von einer Reise zurückgekommen. Schreiben Sie Ihrem Freund Jonas eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Bir yolculuktan döndün. Arkadaşın Jonas'a bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Erzählen Sie, wo Sie waren.", tr: "Nerede olduğunu anlat." },
              { de: "Schreiben Sie, was Ihnen am besten gefallen hat.", tr: "En çok neyin hoşuna gittiğini yaz." },
              { de: "Laden Sie Jonas zum Fotoabend ein.", tr: "Jonas'ı fotoğraf akşamına davet et." },
            ],
            sample: `Hallo Jonas,

wir sind gestern aus Portugal zurückgekommen. Zehn Tage Sonne, das war genau richtig.

Am besten hat mir die kleine Stadt am Meer gefallen. Dort haben wir jeden Abend am Hafen gegessen.

Kommst du am Samstag zu uns? Ich zeige dir die Fotos und koche etwas Portugiesisches.

Liebe Grüße
Emre`,
            criteria: [
              "Üç içerik noktası da işlendi mi?",
              "Yolculuk geçmiş zamanda anlatıldı mı? (Perfekt: sind … zurückgekommen, hat … gefallen)",
              "Arkadaşa yazıldığı için `du` kullanıldı mı?",
              "Davet gerçekten davet biçiminde mi? (Kommst du … / Hast du Lust …)",
              "Yaklaşık 40 kelime var mı?",
            ],
          },
        },
        {
          id: "de-a2-02-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Sie haben online eine Lampe bestellt. Die Lampe ist beschädigt angekommen. Schreiben Sie an den Kundenservice (circa 40 Wörter).",
          promptTr:
            "İnternetten bir lamba sipariş ettin. Lamba hasarlı geldi. Müşteri hizmetlerine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie die Bestellung und das Problem.", tr: "Siparişi ve sorunu söyle." },
              { de: "Sagen Sie, was Sie möchten.", tr: "Ne istediğini söyle." },
              { de: "Fragen Sie nach dem weiteren Weg.", tr: "Bundan sonra ne yapman gerektiğini sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 3. Mai habe ich bei Ihnen eine Tischlampe bestellt, Bestellnummer 48210. Das Paket ist gestern angekommen, aber das Glas ist gebrochen.

Ich möchte gern eine neue Lampe. Soll ich die alte zurückschicken? Bitte sagen Sie mir, wie ich das machen soll.

Mit freundlichen Grüßen
Ayla Demir`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Resmî hitap ve veda kullanıldı mı? (Sehr geehrte Damen und Herren / Mit freundlichen Grüßen)",
              "Sipariş tanımlanabilir mi? (tarih, ürün ya da sipariş numarası)",
              "İstek açıkça söylenmiş mi, yalnız şikâyet mi edilmiş?",
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
      instruction: "Dieser Teil hat drei Aufgaben: Fragen stellen und beantworten, von sich erzählen, gemeinsam etwas planen.",
      instructionTr: "Bu bölümde üç görev var: soru sorup cevaplama, kendinden söz etme, birlikte plan yapma.",
      tasks: [
        {
          id: "de-a2-02-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Einkaufen. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Supermarkt — Preise — Kleidung — Online — Lieblingsgeschäft.",
          promptTr:
            "Konu: Alışveriş. Her anahtar sözcük için bir soru sor ve kendin de cevapla: market — fiyatlar — kıyafet — internet — en sevdiğin dükkân.",
          prepSeconds: 45,
          exchange: [
            { who: "partner", de: "Unser Thema ist Einkaufen. Ihr erstes Stichwort ist: Supermarkt. Stellen Sie mir eine Frage und antworten Sie danach selbst.", tr: "Konumuz alışveriş. İlk sözcüğün: market. Bana bir soru sor, sonra kendin de cevapla." },
            { who: "you", hint: "«Supermarkt» için bir soru sor ve kendi cevabını ver.", expect: "soru kurmak ve sıklık bildiren gerekçeli bir cevap vermek", seconds: 35 },
            { who: "partner", de: "Ich gehe meistens am Abend, dann ist weniger los. Ihr nächstes Stichwort: Preise.", tr: "Genelde akşam gidiyorum, o saatte daha sakin oluyor. Sıradaki sözcüğün: fiyatlar." },
            { who: "you", hint: "Fiyatlar hakkında sor ve cevapla.", expect: "soru kurmak ve karşılaştırma yapmak (teurer als / billiger als)", seconds: 35 },
            { who: "partner", de: "Obst ist bei uns wirklich teuer geworden. Und jetzt eine Frage an Sie: Bestellen Sie online?", tr: "Bizde meyve gerçekten pahalandı. Şimdi sana bir soru: İnternetten sipariş verir misin?" },
            { who: "you", hint: "Soruyu cevapla ve nedenini söyle.", expect: "evet/hayır sorusuna gerekçeli cevap vermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antwort mit einer Begründung", tr: "Kendi cevabın ve kısa bir gerekçe" },
            ],
            sample:
              "Wie oft gehst du in den Supermarkt? — Zweimal in der Woche, meistens am Abend. Findest du die Preise hoch? — Ja, Obst ist bei uns sehr teuer geworden. Wo kaufst du Kleidung? — Meistens auf dem Flohmarkt, weil das billiger ist. Bestellst du online? — Nur Bücher, sonst nicht. Hast du ein Lieblingsgeschäft? — Ja, den kleinen Laden an der Ecke.",
            criteria: [
              "Beş sözcüğün her biri için bir soru soruldu mu?",
              "En az iki cevapta `weil` ya da `denn` ile gerekçe var mı?",
              "Sıklık belirten sözcükler kullanıldı mı? (meistens, zweimal in der Woche, nur)",
              "Sorular dilbilgisel olarak doğru kuruldu mu?",
            ],
          },
        },
        {
          id: "de-a2-02-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt: "Erzählen Sie: Wie reisen Sie am liebsten? Sprechen Sie etwa zwei Minuten.",
          promptTr: "Anlat: En çok nasıl seyahat etmeyi seviyorsun? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "Ihr Lieblingsverkehrsmittel und warum", tr: "En sevdiğin ulaşım aracı ve nedeni" },
              { de: "eine Reise, die Sie gemacht haben", tr: "Yaptığın bir yolculuk" },
              { de: "Ihre nächste Reise", tr: "Bir sonraki yolculuğun" },
            ],
            sample:
              "Am liebsten reise ich mit dem Zug. Ich kann dort lesen und aus dem Fenster schauen, und ich muss nicht drei Stunden vorher am Flughafen sein. Letztes Jahr bin ich mit dem Zug nach Wien gefahren. Die Fahrt hat acht Stunden gedauert, aber ich war ganz entspannt. Im Sommer möchte ich nach Prag fahren. Eine Freundin wohnt dort und ich habe sie lange nicht gesehen.",
            criteria: [
              "Üç içerik noktası da işlendi mi (tercih, geçmiş yolculuk, gelecek plan)?",
              "Tercih bir gerekçeyle desteklendi mi?",
              "Geçmiş yolculuk Perfekt ile anlatıldı mı?",
              "Gelecek plan `möchte` ya da `werde` ile kuruldu mu?",
            ],
          },
        },
        {
          id: "de-a2-02-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Eine Kollegin geht in Rente und Sie möchten ein Geschenk kaufen. Sprechen Sie über: Was kaufen? — Wie viel Geld? — Wer kauft? — Wann übergeben?",
          promptTr:
            "Birlikte plan yap. Bir iş arkadaşınız emekli oluyor, ona hediye alacaksınız. Şunları konuşun: Ne alınacak? — Ne kadar para? — Kim alacak? — Ne zaman verilecek?",
          prepSeconds: 45,
          exchange: [
            { who: "partner", de: "Eine Kollegin geht in Rente und wir möchten ihr etwas schenken. Was schlagen Sie vor?", tr: "Bir iş arkadaşımız emekli oluyor, ona bir hediye alalım. Ne önerirsin?" },
            { who: "you", hint: "Bir hediye öner ve gerekçelendir.", expect: "öneride bulunmak ve gerekçelendirmek", seconds: 30 },
            { who: "partner", de: "Blumen sind schön, aber sie halten nicht lange. Wie wäre es mit einem Gutschein? Und wie viel geben wir aus?", tr: "Çiçek güzel ama uzun ömürlü değil. Hediye çeki nasıl olur? Peki ne kadar harcayalım?" },
            { who: "you", hint: "Öneriye karşılık ver ve bir tutar söyle.", expect: "bir öneriyi kabul ya da reddetmek ve tutar önermek", seconds: 35 },
            { who: "partner", de: "Einverstanden. Wer kauft den Gutschein, und wann geben wir ihn ihr?", tr: "Anlaştık. Çeki kim alacak ve ne zaman vereceğiz?" },
            { who: "you", hint: "İş bölümünü ve zamanı söyle.", expect: "görev paylaşımı yapmak ve zaman belirlemek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneride bulunmak" },
              { de: "auf Vorschläge reagieren", tr: "Önerilere karşılık vermek" },
              { de: "eine gemeinsame Entscheidung treffen", tr: "Ortak bir karara varmak" },
            ],
            sample:
              "Wollen wir ihr Blumen schenken? — Blumen sind schön, aber sie halten nicht lange. Wie wäre es mit einem Gutschein? — Gute Idee. Wie viel geben wir aus? — Ich schlage fünf Euro pro Person vor. Dann kommen wir auf sechzig. Wer kauft den Gutschein? — Ich kann das morgen machen. Und wann geben wir ihn ihr? — Am Freitag in der Pause, da sind alle da.",
            criteria: [
              "Dört nokta da konuşuldu mu (ne, ne kadar, kim, ne zaman)?",
              "Öneri kalıpları kullanıldı mı? (Wollen wir … / Wie wäre es mit … / Ich schlage … vor)",
              "En az bir öneri gerekçeyle reddedilip yerine yenisi sunuldu mu?",
              "Sonunda karar açıkça söylendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
