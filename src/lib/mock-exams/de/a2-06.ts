import type { MockPaper } from "../types";

/**
 * A2 · Deneme 6 — "Feste, Traditionen und Gäste".
 *
 * PLAN kâğıt 1–5 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 gist · 5 detail · 5 kısa metin · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 · 5 eşleştirme · 5 · 5 R/F söyleşi)
 *   Schreiben 30 dk           özel ileti (~40) + yarı resmî ileti (~40)
 *   Sprechen  15 dk           konu sorusu · anlatı · ortak planlama
 *
 * KONU SEÇİMİ: davet ve misafirlik, A2'de en çok gereken iki işlevi bir
 * arada ölçüyor — kabul/ret ve teşekkür. Maddelerin bir bölümü de kültürel
 * beklentiyi okumaya dayanıyor: ne getirilir, ne zaman gelinir, ne sorulur.
 */
export const A2_06: MockPaper = {
  id: "de-a2-06",
  course: "de",
  level: "A2",
  no: 6,
  theme: "Feste, Traditionen und Gäste",
  themeTr: "Kutlamalar, gelenekler ve misafirlik",
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
          id: "de-a2-06-l1",
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
              title: "Zu Gast — mein erster Abend bei Nachbarn",
              body: `Nach drei Monaten in Rostock hat mich meine Nachbarin zum Essen eingeladen. Ich habe mich sehr gefreut und dann drei Tage überlegt, was ich falsch machen kann.

Bei uns kommt man zu einer Einladung um acht ein bisschen später. Ich bin also um Viertel nach acht gekommen. Frau Lorenz hat gelächelt und gesagt, dass die Suppe schon kalt ist. Das war mir peinlich.

Ich habe Blumen mitgebracht, und das war richtig. Nur habe ich sie noch im Papier gegeben. Später habe ich gelernt, dass man das Papier vorher wegnimmt.

Beim Essen hat mich am meisten überrascht, dass alle gleichzeitig angefangen haben. Zu Hause wartet man, bis die älteste Person isst. Hier hat Frau Lorenz einfach "Guten Appetit" gesagt.

Um halb elf sind die anderen Gäste gegangen. Ich wollte noch bleiben und beim Aufräumen helfen. Frau Lorenz hat aber gesagt, dass ich mich setzen soll. Das habe ich nicht verstanden, es war aber freundlich gemeint.

Heute lade ich selbst ein. Meine Gäste kommen pünktlich und niemand hilft in der Küche. Ich habe mich daran gewöhnt und finde es sogar praktisch.`,
              gloss: [
                { de: "die Einladung", tr: "davet", en: "invitation" },
                { de: "peinlich", tr: "utandırıcı", en: "embarrassing" },
                { de: "sich gewöhnen an", tr: "alışmak", en: "to get used to" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-06-l1-1",
              no: 1,
              text: "Warum war der Autor am Anfang unsicher?",
              options: [
                "Er kannte seine Nachbarin überhaupt nicht.",
                "Er wusste nicht, was hier von Gästen erwartet wird.",
                "Er konnte an diesem Abend nur schlecht Deutsch sprechen.",
              ],
              answer: 1,
              explain:
                "Yazar davetten sonra üç gün \"was ich falsch machen kann\" diye düşünmüş. Belirsizlik dilde ya da tanışıklıkta değil, beklentide.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l1-2",
              no: 2,
              text: "Was war beim Ankommen das Problem?",
              options: [
                "Er kam zu spät.",
                "Er hat die Adresse nicht gefunden.",
                "Er hat an der falschen Tür geklingelt.",
              ],
              answer: 0,
              explain:
                "Saat sekiz için çeyrek geçe gelmiş ve Frau Lorenz çorbanın soğuduğunu söylemiş. Almanya'da davet saati başlangıç saatidir.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l1-3",
              no: 3,
              text: "Was hat er über die Blumen gelernt?",
              options: [
                "Blumen sind als Geschenk nicht üblich.",
                "Man soll lieber etwas zu essen mitbringen.",
                "Man nimmt vorher das Papier ab.",
              ],
              answer: 2,
              explain:
                "Çiçek getirmesi doğruymuş; \"dass man das Papier vorher wegnimmt\" kısmı sonradan öğrendiği ayrıntı.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l1-4",
              no: 4,
              text: "Was hat ihn beim Essen am meisten überrascht?",
              options: [
                "Der Beginn ohne Warten auf die Älteste.",
                "Die Suppe war zu kalt für alle Gäste.",
                "Es gab kein Fleisch auf dem ganzen Tisch.",
              ],
              answer: 0,
              explain:
                "Kendi ülkesinde en yaşlı kişi başlayana kadar beklenirmiş; burada herkes aynı anda başlamış ve ev sahibi yalnız \"Guten Appetit\" demiş.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l1-5",
              no: 5,
              text: "Wie sieht der Autor die Unterschiede heute?",
              options: [
                "Seine Gäste stören ihn immer noch.",
                "Er hat sich daran gewöhnt.",
                "Er lädt deshalb niemanden mehr ein.",
              ],
              answer: 1,
              explain:
                "Son paragraf açık: artık kendisi davet ediyor ve \"Ich habe mich daran gewöhnt und finde es sogar praktisch\" diyor.",
            },
          ],
        },
        {
          id: "de-a2-06-l2",
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
              title: "Das Hoffest kommt zurück",
              body: `In Rostock gab es im letzten Sommer 84 Hoffeste. Vor fünf Jahren waren es nur 31.

Die Stadt hat dafür ein kleines Programm gemacht. Wer ein Fest im Hof plant, bekommt 150 Euro und leiht Tische und Bänke kostenlos. Dafür muss man das Fest zwei Wochen vorher anmelden.

Marion Deska aus dem Stadtteilbüro sagt: "Am Anfang haben viele gedacht, dass man dafür eine große Organisation braucht. Das stimmt nicht. Die meisten Feste machen drei oder vier Nachbarn."

Nicht alles läuft gut. Bei fünfzehn Festen hat es Beschwerden wegen Lärm gegeben. Die Stadt bittet deshalb darum, dass die Musik um 22 Uhr leiser wird.

Interessant ist ein anderes Ergebnis. Das Stadtteilbüro hat die Gastgeber später gefragt, was sich geändert hat. Fast alle haben geantwortet, dass sie jetzt mehr Nachbarn mit Namen kennen. Über das Fest selbst hat kaum jemand gesprochen.

Für dieses Jahr sind schon 60 Feste angemeldet.`,
              gloss: [
                { de: "der Gastgeber", tr: "ev sahibi", en: "host" },
                { de: "die Beschwerde", tr: "şikâyet", en: "complaint" },
                { de: "anmelden", tr: "kaydettirmek, bildirmek", en: "to register" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-06-l2-6",
              no: 6,
              text: "Wie viele Hoffeste gab es im letzten Sommer?",
              options: ["Ungefähr dreißig Feste in der Stadt.", "Sechzig Feste, wie im Jahr davor auch.", "84."],
              answer: 2,
              explain:
                "Sayı ilk cümlede: geçen yaz 84 şenlik. 31 beş yıl öncesine, 60 ise bu yıl kayıtlı olanlara ait.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l2-7",
              no: 7,
              text: "Was bekommt man von der Stadt?",
              options: [
                "Eine Genehmigung für die ganze Straße.",
                "Geld und Möbel zum Leihen.",
                "Hilfe beim Aufbau durch Mitarbeiter der Stadt.",
              ],
              answer: 1,
              explain:
                "Şehir 150 euro veriyor ve masa ile bankları ücretsiz ödünç veriyor. Kurulum yardımı ya da cadde izni metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l2-8",
              no: 8,
              text: "Was muss man vorher machen?",
              options: [
                "Das Fest rechtzeitig melden.",
                "Alle Nachbarn schriftlich fragen.",
                "Eine Versicherung für das Fest abschließen.",
              ],
              answer: 0,
              explain:
                "Koşul tek: \"muss man das Fest zwei Wochen vorher anmelden\". Yazılı komşu onayı ya da sigorta metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l2-9",
              no: 9,
              text: "Was sagt Marion Deska über die Organisation?",
              options: [
                "Ohne einen Verein im Rücken geht es kaum.",
                "Ein Fest kostet mehr Zeit, als die Leute denken.",
                "Meistens reichen wenige Nachbarn.",
              ],
              answer: 2,
              explain:
                "\"Die meisten Feste machen drei oder vier Nachbarn\" diyor ve büyük bir örgüt gerektiği inancını yanlış buluyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l2-10",
              no: 10,
              text: "Was hat sich für die Gastgeber verändert?",
              options: [
                "Sie streiten öfter mit den Nachbarn als vorher.",
                "Sie kennen die Leute im Haus jetzt beim Namen.",
                "Sie feiern seitdem jedes Jahr zweimal.",
              ],
              answer: 1,
              explain:
                "Sonradan sorulduğunda neredeyse hepsi aynı şeyi söylemiş: \"dass sie jetzt mehr Nachbarn mit Namen kennen\". Şenliğin kendisinden neredeyse kimse söz etmemiş.",
            },
          ],
        },
        {
          id: "de-a2-06-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie die fünf kurzen Texte und die Aufgaben 11 bis 15. Wählen Sie: a, b oder c.",
          promptTr: "Beş kısa metni ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "n1",
              genre: "Einladungskarte",
              genreTr: "Davetiye",
              title: "Wir feiern!",
              body: `Am Samstag, 18. Mai, ab 16 Uhr bei uns im Garten.

Für Essen und Getränke ist gesorgt.

Bitte sagt bis Mittwoch Bescheid, damit wir planen können.

Lina und Ferhat`,
            },
            {
              kind: "text",
              id: "n2",
              genre: "Aushang im Hausflur",
              genreTr: "Apartman girişindeki duyuru",
              title: "Hoffest am 7. Juni",
              body: `Ab 15 Uhr im Hof. Kuchen bringt jeder selbst mit.

Tische und Bänke holen wir am Freitag aus dem Keller.

Wer helfen kann, trägt sich unten in die Liste ein.`,
            },
            {
              kind: "text",
              id: "n3",
              genre: "Kurznachricht",
              genreTr: "Kısa mesaj",
              body: `Hi Selin, ich habe das Geschenk gekauft.

Es hat 32 Euro gekostet, wir sind vier Personen.

Bring bitte am Samstag acht Euro mit. Die Karte schreibe ich noch.`,
            },
            {
              kind: "text",
              id: "n4",
              genre: "E-Mail vom Verein",
              genreTr: "Dernekten e-posta",
              title: "Helferliste Sommerfest",
              body: `Liebe Mitglieder,

für das Sommerfest brauchen wir noch Hilfe am Abend beim Aufräumen.

Vormittags und mittags sind alle Plätze schon besetzt.

Bitte antwortet nur, wenn ihr am Abend Zeit habt.`,
            },
            {
              kind: "text",
              id: "n5",
              genre: "Aushang zur Hausordnung",
              genreTr: "Ev düzeni duyurusu",
              title: "Feiern im Haus",
              body: `Feiern ist erlaubt. Bitte informieren Sie vorher die Nachbarn.

Ab 22 Uhr gilt die Nachtruhe. Musik dann bitte leise.

Der Hof ist ab 24 Uhr frei zu halten.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-06-l3-11",
              no: 11,
              ref: "n1",
              text: "Was sollen die Gäste tun?",
              options: [
                "Bis Mittwoch antworten.",
                "Etwas zu essen mitbringen.",
                "Sich vorher in eine Liste eintragen.",
              ],
              answer: 0,
              explain:
                "Davetiye tek şey istiyor: \"Bitte sagt bis Mittwoch Bescheid\". Yemek ve içecek ev sahiplerinde.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l3-12",
              no: 12,
              ref: "n2",
              text: "Was bringen die Nachbarn selbst mit?",
              options: [
                "Tische und Bänke aus dem Keller.",
                "Getränke für den ganzen Hof.",
                "Kuchen.",
              ],
              answer: 2,
              explain:
                "Duyuru \"Kuchen bringt jeder selbst mit\" diyor. Masa ve banklar bodrumdan birlikte taşınıyor, kişisel katkı değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l3-13",
              no: 13,
              ref: "n3",
              text: "Wie viel soll Selin bezahlen?",
              options: ["32 Euro für das ganze Geschenk.", "8 Euro.", "Nichts, es ist schon bezahlt."],
              answer: 1,
              explain:
                "Hediye 32 euro ve dört kişiye bölünüyor; mesaj \"Bring bitte am Samstag acht Euro mit\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l3-14",
              no: 14,
              ref: "n4",
              text: "Wer soll auf die E-Mail antworten?",
              options: [
                "Alle Mitglieder des Vereins.",
                "Wer am Vormittag helfen möchte.",
                "Nur wer abends kommen kann.",
              ],
              answer: 2,
              explain:
                "Sabah ve öğlen yerleri dolu; e-posta \"Bitte antwortet nur, wenn ihr am Abend Zeit habt\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-l3-15",
              no: 15,
              ref: "n5",
              text: "Was gilt ab 22 Uhr?",
              options: [
                "Die Musik muss leiser sein.",
                "Die Nachbarn müssen dann informiert werden.",
                "Der Hof muss ganz leer sein.",
              ],
              answer: 0,
              explain:
                "22'de gece sessizliği başlıyor ve müzik kısılıyor. Avlunun boşaltılması ayrı bir kural ve saat 24'ten itibaren.",
            },
          ],
        },
        {
          id: "de-a2-06-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 planen ein Fest. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler bir kutlama planlıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Saal im Bürgerhaus",
              body: "Platz für 60 Personen, Küche vorhanden. 80 Euro für einen Abend. Nur an Wochenenden frei, Buchung mindestens vier Wochen vorher.",
            },
            {
              key: "b",
              label: "Torten nach Wunsch",
              body: "Wir backen mit Foto und Namen. Bestellung drei Tage vorher, ab 28 Euro. Auch ohne Zucker und ohne Milch möglich.",
            },
            {
              key: "c",
              label: "Musik für Ihr Fest",
              body: "Zwei Musiker mit Gitarre und Gesang, alle Sprachen. Zwei Stunden 180 Euro. Auch draußen, Strom muss da sein.",
            },
            {
              key: "d",
              label: "Geschirr und Gläser leihen",
              body: "Teller, Gläser und Besteck für bis zu 50 Gäste. 20 Euro, ungespült zurückgeben ist erlaubt. Abholung nur mit Auto.",
            },
            {
              key: "e",
              label: "Kinderprogramm",
              body: "Zwei Stunden Spiele und Schminken für Kinder von 3 bis 10 Jahren. 90 Euro, im Freien oder im Raum.",
            },
            {
              key: "f",
              label: "Fotografin für Feiern",
              body: "Reportage von zwei Stunden, Bilder digital nach einer Woche. 150 Euro. Termine nur samstags.",
            },
            {
              key: "g",
              label: "Reinigung nach dem Fest",
              body: "Wir putzen am nächsten Morgen Räume und Küche. Ab 70 Euro je nach Größe. Anfrage bis 20 Uhr am Vortag.",
            },
            {
              key: "h",
              label: "Getränke auf Kommission",
              body: "Kisten mit Wasser, Saft und Limonade. Was übrig bleibt, nehmen wir zurück. Lieferung ab 40 Euro Bestellwert.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-06-l4-16",
              no: 16,
              text: "Herr Vogel feiert mit 45 Gästen und hat zu Hause nicht genug Teller.",
              answer: "d",
              explain:
                "(d) 50 kişiye kadar tabak, bardak ve çatal bıçak veriyor. 45 misafir bu sınırın içinde; öteki ilanların hiçbiri mutfak eşyası vermiyor.",
            },
            {
              kind: "match",
              id: "de-a2-06-l4-17",
              no: 17,
              text: "Frau Baumgart möchte einen Kuchen für ihre Tochter, die keine Milch verträgt.",
              answer: "b",
              explain:
                "(b) sipariş üzerine pasta yapıyor ve açıkça \"auch ohne Zucker und ohne Milch möglich\" diyor. Süt koşulu yalnız bu ilanda karşılanıyor.",
            },
            {
              kind: "match",
              id: "de-a2-06-l4-18",
              no: 18,
              text: "Familie Toth feiert im Hof und sucht etwas für acht Kinder zwischen vier und neun.",
              answer: "e",
              explain:
                "(e) 3–10 yaş için iki saatlik oyun programı sunuyor ve açık havada da yapılabiliyor. Yaş aralığı tam oturuyor.",
            },
            {
              kind: "match",
              id: "de-a2-06-l4-19",
              no: 19,
              text: "Herr Adam braucht einen Raum für 55 Personen und will am Samstag feiern.",
              answer: "a",
              explain:
                "(a) 60 kişilik salon ve yalnız hafta sonları boş. 55 misafir kapasitenin altında kalıyor.",
            },
            {
              kind: "match",
              id: "de-a2-06-l4-20",
              no: 20,
              text: "Frau Simon weiß nicht, wie viel getrunken wird, und will nichts wegwerfen.",
              answer: "h",
              explain:
                "(h) kalanı geri alıyor: \"Was übrig bleibt, nehmen wir zurück\". Böylece fazla sipariş riski ortadan kalkıyor.",
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
          id: "de-a2-06-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "k1",
              genre: "Gespräch in der Bäckerei",
              genreTr: "Fırında konuşma",
              situation: "Bir müşteri pasta sipariş ediyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Ich brauche eine Torte für Samstag, für zwölf Personen." },
                { speaker: "Verkäufer", text: "Für zwölf Personen nehmen Sie besser die große. Die kostet 34 Euro." },
                { speaker: "Kundin", text: "Gut. Kann ich sie am Samstag früh abholen?" },
                { speaker: "Verkäufer", text: "Ab acht Uhr steht sie bereit." },
              ],
            },
            {
              kind: "audio",
              id: "k2",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Biri davete cevap veriyor.",
              plays: 2,
              segments: [
                { speaker: "Nora", text: "Kommst du am Freitag zu meinem Fest?" },
                { speaker: "Jan", text: "Am Freitag arbeite ich bis neun. Ich komme später, so gegen halb zehn." },
                { speaker: "Nora", text: "Super, dann ist noch genug da." },
              ],
            },
            {
              kind: "audio",
              id: "k3",
              genre: "Gespräch im Geschäft",
              genreTr: "Mağazada konuşma",
              situation: "Bir müşteri hediye arıyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Ich suche ein Geschenk für eine Kollegin. So bis 20 Euro." },
                { speaker: "Verkäuferin", text: "Wie wäre eine Tasse mit Namen? Die kostet 18 Euro." },
                { speaker: "Kunde", text: "Sie trinkt keinen Kaffee. Haben Sie etwas anderes?" },
                { speaker: "Verkäuferin", text: "Dann vielleicht eine Pflanze für 16 Euro." },
              ],
            },
            {
              kind: "audio",
              id: "k4",
              genre: "Gespräch im Treppenhaus",
              genreTr: "Merdiven boşluğunda konuşma",
              situation: "Bir komşu partiden haber veriyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Bruhn", text: "Wir feiern am Samstag. Es kann bis elf lauter werden." },
                { speaker: "Herr Kilic", text: "Kein Problem, wir sind am Wochenende weg." },
                { speaker: "Frau Bruhn", text: "Gut. Nach elf machen wir die Musik leise." },
              ],
            },
            {
              kind: "audio",
              id: "k5",
              genre: "Gespräch im Restaurant",
              genreTr: "Restoranda konuşma",
              situation: "Biri masa ayırtıyor.",
              plays: 2,
              segments: [
                { speaker: "Gast", text: "Ich möchte einen Tisch für acht Personen am Sonntag." },
                { speaker: "Kellnerin", text: "Sonntagmittag ist alles voll. Am Abend ab sieben geht es." },
                { speaker: "Gast", text: "Dann nehmen wir sieben Uhr." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-06-h1-1",
              no: 1,
              ref: "k1",
              text: "Wann kann die Kundin die Torte abholen?",
              options: ["Ab acht Uhr am Samstag.", "Erst am Samstagnachmittag.", "Schon am Freitagabend."],
              answer: 0,
              explain:
                "Satıcı \"Ab acht Uhr steht sie bereit\" diyor ve gün cumartesi. Cuma ve öğleden sonra bu kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h1-2",
              no: 2,
              ref: "k2",
              text: "Wann kommt Jan zum Fest?",
              options: ["Er kommt an diesem Abend gar nicht.", "Pünktlich zum Anfang um neun.", "Gegen halb zehn."],
              answer: 2,
              explain:
                "Jan dokuza kadar çalışıyor ve \"Ich komme später, so gegen halb zehn\" diyor. Yani geliyor, ama geç.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h1-3",
              no: 3,
              ref: "k3",
              text: "Was schlägt die Verkäuferin am Ende vor?",
              options: ["Eine Tasse mit Namen für 18 Euro.", "Eine Pflanze.", "Einen Gutschein für 20 Euro."],
              answer: 1,
              explain:
                "Kupa eleniyor çünkü meslektaş kahve içmiyor; ikinci öneri 16 euroluk bir bitki. Hediye çeki hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h1-4",
              no: 4,
              ref: "k4",
              text: "Warum stört das Fest Herrn Kilic nicht?",
              options: ["Er hört sowieso schlecht.", "Er feiert am Samstag mit.", "Er ist am Wochenende nicht da."],
              answer: 2,
              explain:
                "Herr Kilic \"wir sind am Wochenende weg\" diyor. Yani gürültü onu ilgilendirmiyor, çünkü evde olmayacak.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h1-5",
              no: 5,
              ref: "k5",
              text: "Wann bekommt der Gast einen Tisch?",
              options: ["Am Sonntagmittag um zwölf.", "Am Sonntag um neunzehn Uhr.", "Erst am Montagabend."],
              answer: 1,
              explain:
                "Pazar öğlen dolu; akşam yediden itibaren yer var ve müşteri \"Dann nehmen wir sieben Uhr\" diyor.",
            },
          ],
        },
        {
          id: "de-a2-06-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen sagen, was sie zum Fest mitbringen. Wer bringt was? Ordnen Sie zu. Drei Sachen bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi kutlamaya ne getireceğini söylüyor. Kim ne getiriyor? Eşleştir. Üç şey artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch unter Freunden",
              genreTr: "Arkadaşlar arasında konuşma",
              situation: "Arkadaşlar kutlama için ne getireceklerini paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Pia", text: "Also, das Fest ist am Samstag. Kemal, bringst du den Salat?" },
                { speaker: "Kemal", text: "Salat habe ich letztes Mal gemacht. Diesmal backe ich lieber den Kuchen." },
                { speaker: "Pia", text: "Gut. Frau Dahl, Sie kochen so gern. Übernehmen Sie den Salat?" },
                { speaker: "Frau Dahl", text: "Ja, gern. Soll ich auch die Getränke kaufen?" },
                { speaker: "Pia", text: "Nein danke, die Getränke bringt Robin. Er hat ein Auto." },
                { speaker: "Robin", text: "Genau. Ich bringe dann auch meine Musikbox mit." },
                { speaker: "Pia", text: "Die Musik mache ich, du schleppst schon die Kisten." },
                { speaker: "Robin", text: "Stimmt, das reicht auch." },
              ],
            },
          ],
          options: [
            { key: "a", label: "den Kuchen backen" },
            { key: "b", label: "den Salat machen" },
            { key: "c", label: "die Getränke kaufen" },
            { key: "d", label: "für Musik sorgen" },
            { key: "e", label: "Stühle mitbringen" },
            { key: "f", label: "Teller und Gläser leihen" },
            { key: "g", label: "Blumen besorgen" },
            { key: "h", label: "am Ende aufräumen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-06-h2-6",
              no: 6,
              ref: "g1",
              text: "Kemal",
              answer: "a",
              explain:
                "Salata işi ona teklif ediliyor ama geçen sefer yaptığını söyleyip reddediyor: \"Diesmal backe ich lieber den Kuchen\".",
            },
            {
              kind: "match",
              id: "de-a2-06-h2-7",
              no: 7,
              ref: "g1",
              text: "Frau Dahl",
              answer: "b",
              explain:
                "Kemal reddedince salatayı Frau Dahl üstleniyor. İçecekleri de teklif ediyor ama Pia \"Nein danke\" diyor.",
            },
            {
              kind: "match",
              id: "de-a2-06-h2-8",
              no: 8,
              ref: "g1",
              text: "Robin",
              answer: "c",
              explain:
                "İçecekler Robin'de, çünkü arabası var: \"die Getränke bringt Robin\". Müzik kutusunu da teklif ediyor ama o iş ona kalmıyor.",
            },
            {
              kind: "match",
              id: "de-a2-06-h2-9",
              no: 9,
              ref: "g1",
              text: "Pia",
              answer: "d",
              explain:
                "Robin kasaları taşıdığı için müziği Pia üstleniyor: \"Die Musik mache ich\". Pia ayrıca işleri dağıtan kişi.",
            },
            {
              kind: "match",
              id: "de-a2-06-h2-10",
              no: 10,
              ref: "g1",
              text: "Was übernimmt im Gespräch niemand?",
              answer: "h",
              explain:
                "Konuşmada yalnız pasta, salata, içecek ve müzik paylaşılıyor — \"die Getränke bringt Robin\" gibi. Sonunda toplamaktan hiç söz edilmiyor.",
            },
          ],
        },
        {
          id: "de-a2-06-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "s1",
              genre: "Gespräch vor der Tür",
              genreTr: "Kapı önünde konuşma",
              situation: "Bir misafir geliyor.",
              plays: 2,
              segments: [
                { speaker: "Gast", text: "Soll ich die Schuhe ausziehen?" },
                { speaker: "Gastgeberin", text: "Wie du magst. Bei uns machen das die meisten." },
                { speaker: "Gast", text: "Dann ziehe ich sie aus." },
              ],
            },
            {
              kind: "audio",
              id: "s2",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "Biri daveti reddediyor.",
              plays: 2,
              segments: [
                { speaker: "Tarek", text: "Schaffst du es am Sonntag?" },
                { speaker: "Hanna", text: "Leider nicht, meine Schwester heiratet an dem Tag." },
                { speaker: "Tarek", text: "Schade. Dann feiern wir zwei nächste Woche." },
              ],
            },
            {
              kind: "audio",
              id: "s3",
              genre: "Gespräch beim Essen",
              genreTr: "Yemekte konuşma",
              situation: "Bir misafir ikinci porsiyon istemiyor.",
              plays: 2,
              segments: [
                { speaker: "Gastgeber", text: "Möchtest du noch etwas?" },
                { speaker: "Gast", text: "Es war sehr gut, aber ich bin wirklich satt." },
                { speaker: "Gastgeber", text: "Dann bringe ich später den Kuchen." },
              ],
            },
            {
              kind: "audio",
              id: "s4",
              genre: "Gespräch im Hof",
              genreTr: "Avluda konuşma",
              situation: "İki komşu şenlik saatini konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Petz", text: "Fängt das Hoffest um drei an?" },
                { speaker: "Frau Adler", text: "Um drei bauen wir auf. Los geht es um vier." },
                { speaker: "Herr Petz", text: "Dann komme ich um vier." },
              ],
            },
            {
              kind: "audio",
              id: "s5",
              genre: "Gespräch nach dem Fest",
              genreTr: "Kutlamadan sonra konuşma",
              situation: "İki arkadaş akşamı değerlendiriyor.",
              plays: 2,
              segments: [
                { speaker: "Ida", text: "Wie fandest du gestern?" },
                { speaker: "Milo", text: "Sehr schön. Nur waren wir viel zu wenige Leute." },
                { speaker: "Ida", text: "Stimmt, viele haben abgesagt." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-06-h3-11",
              no: 11,
              ref: "s1",
              text: "Was macht der Gast?",
              options: ["Er behält die Schuhe an.", "Er zieht die Schuhe aus.", "Er fragt nicht weiter nach."],
              answer: 1,
              explain:
                "Ev sahibi serbest bırakıyor ama çoğunun çıkardığını söylüyor; misafir de \"Dann ziehe ich sie aus\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h3-12",
              no: 12,
              ref: "s2",
              text: "Warum kommt Hanna nicht?",
              options: ["Ihre Schwester heiratet.", "Sie muss an dem Tag arbeiten.", "Sie ist im Urlaub."],
              answer: 0,
              explain:
                "Gerekçe açık: \"meine Schwester heiratet an dem Tag\". İş ve tatil bu kayıtta geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h3-13",
              no: 13,
              ref: "s3",
              text: "Warum nimmt der Gast nichts mehr?",
              options: [
                "Das Essen hat ihm nicht geschmeckt.",
                "Er wartet lieber auf den Kuchen.",
                "Er ist satt.",
              ],
              answer: 2,
              explain:
                "Misafir yemeği övüyor ve \"ich bin wirklich satt\" diyor. Pastadan söz eden ev sahibi, misafir değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h3-14",
              no: 14,
              ref: "s4",
              text: "Wann beginnt das Hoffest?",
              options: ["Um drei Uhr.", "Um vier Uhr.", "Um fünf Uhr."],
              answer: 1,
              explain:
                "Saat üçte kurulum yapılıyor; Frau Adler \"Los geht es um vier\" diyor. Yani şenlik dörtte başlıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-06-h3-15",
              no: 15,
              ref: "s5",
              text: "Was hat Milo am Fest gestört?",
              options: ["Das Essen war zu wenig.", "Die Musik war zu laut.", "Es waren zu wenige Gäste."],
              answer: 2,
              explain:
                "Milo akşamı güzel buluyor, tek eleştirisi \"viel zu wenige Leute\". Ida da birçok kişinin iptal ettiğini doğruluyor.",
            },
          ],
        },
        {
          id: "de-a2-06-h4",
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
              situation: "Mahalle şenlikleri düzenleyen biri anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Herr Weiss, Sie helfen Menschen bei Hoffesten. Was ist am schwersten?" },
                {
                  speaker: "Herr Weiss",
                  text: "Der erste Schritt. Fast alle denken, dass sie zuerst eine Genehmigung brauchen. In den meisten Höfen braucht man gar keine.",
                },
                { speaker: "Moderatorin", text: "Und was kostet so ein Fest?" },
                {
                  speaker: "Herr Weiss",
                  text: "Weniger als die Leute glauben. Mit 100 Euro kommt man weit, wenn jeder etwas mitbringt.",
                },
                { speaker: "Moderatorin", text: "Wie viele Leute braucht man für die Organisation?" },
                {
                  speaker: "Herr Weiss",
                  text: "Drei reichen. Bei mehr als sechs wird es schwierig, weil dann jeder auf den anderen wartet.",
                },
                { speaker: "Moderatorin", text: "Gibt es oft Streit mit Nachbarn?" },
                {
                  speaker: "Herr Weiss",
                  text: "Selten, und fast nie wegen der Musik. Meistens geht es um den Müll am nächsten Morgen.",
                },
                { speaker: "Moderatorin", text: "Ihr wichtigster Rat?" },
                {
                  speaker: "Herr Weiss",
                  text: "Ladet auch die Leute ein, die nie kommen. Die Einladung ist wichtiger als der Besuch.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-06-h4-16",
              no: 16,
              ref: "i1",
              text: "Für ein Hoffest braucht man meistens eine Genehmigung.",
              answer: false,
              explain:
                "Herr Weiss tersini söylüyor: \"In den meisten Höfen braucht man gar keine\". İnsanların bunu sanması ilk adımı zorlaştırıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-06-h4-17",
              no: 17,
              ref: "i1",
              text: "Ein Hoffest ist billiger, als viele denken.",
              answer: true,
              explain:
                "\"Weniger als die Leute glauben\" diyor ve rakam veriyor: herkes bir şey getirirse 100 euro yetiyor.",
            },
            {
              kind: "bool",
              id: "de-a2-06-h4-18",
              no: 18,
              ref: "i1",
              text: "Je mehr Leute organisieren, desto besser.",
              answer: false,
              explain:
                "Üç kişi yetiyor; altıdan fazlasında \"weil dann jeder auf den anderen wartet\" diyor. Yani kalabalık işi zorlaştırıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-06-h4-19",
              no: 19,
              ref: "i1",
              text: "Streit gibt es meistens wegen der Musik.",
              answer: false,
              explain:
                "\"fast nie wegen der Musik\" diyor; tartışma çoğunlukla ertesi sabahki çöp yüzünden çıkıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-06-h4-20",
              no: 20,
              ref: "i1",
              text: "Er rät, auch Leute einzuladen, die wahrscheinlich nicht kommen.",
              answer: true,
              explain:
                "Son tavsiyesi bu: \"Ladet auch die Leute ein, die nie kommen\" ve gerekçesi davetin ziyaretten önemli olması.",
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
          id: "de-a2-06-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Nachbarin Frau Lorenz hat Sie zum Essen eingeladen. Schreiben Sie ihr am nächsten Tag eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Komşun Frau Lorenz seni yemeğe davet etti. Ertesi gün ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Bedanken Sie sich für den Abend.", tr: "Akşam için teşekkür et." },
              { de: "Sagen Sie, was Ihnen besonders gefallen hat.", tr: "En çok neyi beğendiğini söyle." },
              { de: "Laden Sie Frau Lorenz zu sich ein.", tr: "Frau Lorenz'i kendine davet et." },
            ],
            sample: `Liebe Frau Lorenz,

vielen Dank für den schönen Abend gestern! Ich habe mich bei Ihnen sehr wohl gefühlt.

Am besten hat mir die Suppe geschmeckt. Können Sie mir das Rezept geben?

Nächsten Monat möchte ich Sie gern zu mir einladen. Ich koche dann etwas aus meiner Heimat.

Herzliche Grüße
Amir`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Komşuya yazıldığı için nazik ama sıcak bir ton mu? `Sie` kullanmak burada doğru.",
              "Beğeni somut mu (ne beğenildi), yoksa genel bir övgü mü?",
              "Davet gerçekten davet biçiminde mi kuruldu?",
              "Yaklaşık 40 kelime var mı ve hitap ile veda var mı?",
            ],
          },
        },
        {
          id: "de-a2-06-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Sie möchten am 12. Juli im Hof Ihres Hauses ein kleines Fest machen. Sie brauchen die Erlaubnis der Hausverwaltung. Schreiben Sie an die Hausverwaltung (circa 40 Wörter).",
          promptTr:
            "12 Temmuz'da binanızın avlusunda küçük bir kutlama yapmak istiyorsun. Site yönetiminin iznine ihtiyacın var. Site yönetimine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie Datum, Uhrzeit und Ort.", tr: "Tarihi, saati ve yeri belirt." },
              { de: "Sagen Sie, wie viele Gäste kommen.", tr: "Kaç misafir geleceğini söyle." },
              { de: "Bitten Sie um die Erlaubnis und sagen Sie, wann Schluss ist.", tr: "İzin iste ve ne zaman biteceğini söyle." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich wohne in der Bergstraße 9. Am Samstag, dem 12. Juli, möchte ich von 15 bis 22 Uhr ein kleines Fest im Hof machen.

Es kommen ungefähr zwanzig Gäste, vor allem Nachbarn aus dem Haus. Um 22 Uhr machen wir die Musik aus und räumen auf.

Dürfen wir den Hof dafür nutzen?

Mit freundlichen Grüßen
Katja Berg`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı?",
              "Tarih, saat ve yer somut verildi mi?",
              "Bitiş saati ve gürültü konusuna değinildi mi?",
              "İzin talebi soru ya da rica biçiminde kuruldu mu ve yaklaşık 40 kelime mi?",
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
          id: "de-a2-06-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Feiern. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Geburtstag — Gäste — Essen — Geschenk — Musik.",
          promptTr:
            "Konu: Kutlamalar. Her anahtar sözcük için bir soru sor ve kendin de cevapla: doğum günü — misafirler — yemek — hediye — müzik.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Feiern. Ihr erstes Stichwort ist: Geburtstag. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi kutlamalar konusunu konuşuyoruz. İlk sözcüğün: doğum günü. Bana bir soru sor.",
            },
            { who: "you", hint: "«Geburtstag» sözcüğüyle bir soru kur.", expect: "Geburtstag sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Ich feiere meinen Geburtstag meistens im kleinen Kreis. Ihr nächstes Stichwort ist: Gäste.",
              tr: "Doğum günümü genelde küçük bir grupla kutlarım. Sıradaki sözcüğün: misafirler.",
            },
            { who: "you", hint: "«Gäste» için bir soru kur.", expect: "Gäste sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Bei mir sind es selten mehr als zehn Leute. Und jetzt eine Frage an Sie: Kochen Sie für Ihre Gäste selbst?",
              tr: "Bende ender olarak on kişiyi geçer. Şimdi sana bir soru: Misafirlerin için kendin mi pişirirsin?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısaca gerekçelendir.", expect: "`weil` ile gerekçelendirilmiş tam bir cevap vermek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was schenken Sie einer Freundin zum Geburtstag?",
              tr: "Teşekkürler. Son soru: Bir arkadaşına doğum gününde ne hediye edersin?",
            },
            { who: "you", hint: "Bir hediye söyle ve nedenini ekle.", expect: "somut bir hediye söylemek ve kısaca gerekçelendirmek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Wann hast du Geburtstag? — Im Mai. Wie viele Gäste lädst du ein? — Ungefähr zehn. Kochst du selbst? — Ja, weil ich gern koche. Was schenkst du deiner Freundin? — Meistens ein Buch. Wer macht die Musik? — Mein Bruder, er hat eine Box.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Cevaplar tek sözcük değil, tam cümle mi?",
            ],
          },
        },
        {
          id: "de-a2-06-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt: "Erzählen Sie: Wie feiert man in Ihrem Heimatland ein Fest, und was ist hier anders? Sprechen Sie etwa zwei Minuten.",
          promptTr: "Anlat: Kendi ülkende bir kutlama nasıl yapılır ve burada ne farklı? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "ein Fest beschreiben", tr: "Bir kutlamayı tarif etmek" },
              { de: "einen Unterschied nennen", tr: "Bir farkı söylemek" },
              { de: "sagen, was einem besser gefällt", tr: "Neyi daha çok sevdiğini söylemek" },
            ],
            sample:
              "Bei uns kommen zu einem Fest sehr viele Leute, oft die ganze Familie und die Nachbarn. Man lädt nicht genau ein, man sagt einfach Bescheid. Hier ist das anders: Man bekommt eine Einladung und antwortet vorher. Am Anfang war das für mich seltsam. Heute finde ich es praktisch, weil man weiß, wie viel man kochen muss. Das Laute und Volle vermisse ich trotzdem manchmal.",
            criteria: [
              "Kutlama somut anlatıldı mı (kim gelir, ne yapılır)?",
              "Fark gerçekten karşılaştırma biçiminde mi verildi?",
              "Kendi tercihi söylendi ve gerekçelendirildi mi?",
              "Geçmiş zaman kullanılabildi mi? (Am Anfang war das …)",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-06-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Eine Freundin besucht Sie für ein Wochenende. Sprechen Sie über: Wann abholen? — Was am Samstag? — Wo essen? — Wer bezahlt was?",
          promptTr:
            "Birlikte plan yap. Bir arkadaşın hafta sonu için ziyaretine geliyor. Şunları konuş: Ne zaman karşılanacak? — Cumartesi ne yapılacak? — Nerede yenecek? — Kim neyi ödeyecek?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen das Wochenende. Ihr Zug kommt am Freitag um 19 Uhr an. Wer holt sie ab?",
              tr: "Hafta sonunu birlikte planlıyoruz. Treni cuma saat 19'da geliyor. Onu kim karşılayacak?",
            },
            { who: "you", hint: "Karşılamayı üstlen ya da başka bir çözüm öner.", expect: "bir görevi üstlenmek ya da gerekçeli bir alternatif sunmak", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und was machen wir am Samstag? Sie war noch nie in unserer Stadt.",
              tr: "Peki. Cumartesi ne yapalım? Şehrimize hiç gelmemiş.",
            },
            { who: "you", hint: "Bir program öner ve nedenini söyle.", expect: "somut bir etkinlik önermek ve gerekçelendirmek", seconds: 35 },
            {
              who: "partner",
              de: "Das klingt gut. Wo essen wir am Abend? Ich koche nicht so gern für Gäste.",
              tr: "Kulağa hoş geliyor. Akşam nerede yiyelim? Misafir için yemek yapmayı pek sevmiyorum.",
            },
            { who: "you", hint: "Bir yer öner ve itirazı da hesaba kat.", expect: "bir öneri sunmak ve karşı tarafın itirazını dikkate almak", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Und wie machen wir das mit dem Geld?",
              tr: "Anlaştık. Peki para işini nasıl yapalım?",
            },
            { who: "you", hint: "Ödeme için somut bir düzen öner.", expect: "masrafların paylaşımı için somut bir düzen önermek", seconds: 35 },
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
              "Ich hole sie ab, ich habe am Freitag frei. Am Samstag können wir zuerst auf den Markt gehen und danach ins Museum, das ist nicht weit. Zum Essen gehen wir in das kleine Lokal am Hafen, dann musst du nicht kochen. Beim Geld machen wir es so: Ich bezahle das Essen, du die Karten für das Museum.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneri kalıpları kullanıldı mı? (Wir können … / Wie wäre es …)",
              "Karşı tarafın itirazı (yemek yapmak istemiyor) gerçekten dikkate alındı mı?",
              "Ödeme düzeni somut mu?",
            ],
          },
        },
      ],
    },
  ],
};
