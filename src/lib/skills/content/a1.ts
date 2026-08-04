import type { SkillExercise } from "../types";

/** A1 — okuma, dinleme ve yazma egzersizleri. */
export const a1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "a1-r1",
    level: "A1",
    skill: "reading",
    title: "Gehen wir ins Kino?",
    genre: "Mesaj",
    intro: "Sofia'nın arkadaşı Murat'a yazdığı bir WhatsApp mesajını okuyacaksın.",
    gloss: [
      { de: "frei haben", tr: "boş olmak, izinli olmak" },
      { de: "das Kino", tr: "sinema" },
      { de: "sich treffen", tr: "buluşmak" },
      { de: "danach", tr: "ondan sonra" },
      { de: "mitkommen", tr: "birlikte gelmek" },
      { de: "Viele Grüße", tr: "sevgiler (mesaj sonu kalıbı)" },
    ],
    minutes: 3,
    text:
      "Hallo Murat! Wie geht es dir? Ich habe heute frei. Wollen wir zusammen ins Kino gehen? Der Film beginnt um 20 Uhr. Wir können uns um 19:30 Uhr vor dem Kino treffen. Danach essen wir vielleicht eine Pizza. Meine Schwester Lena kommt auch mit. Schreib mir bitte bis 17 Uhr!\n\nViele Grüße\nSofia",
    questions: [
      {
        text: "Wann beginnt der Film?",
        options: ["Um 17 Uhr", "Um 19:30 Uhr", "Um 20 Uhr"],
        answer: 2,
        explain:
          "Mesajta „Der Film beginnt um 20 Uhr“ yazıyor. 19:30 buluşma saati, 17 ise cevap yazma sınırı.",
      },
      {
        text: "Richtig oder falsch? Sofia kommt allein ins Kino.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Meine Schwester Lena kommt auch mit“ diyor, yani kız kardeşi Lena da geliyor.",
      },
      {
        text: "Was wollen sie nach dem Film machen?",
        options: ["Eine Pizza essen", "Nach Hause gehen", "Lena besuchen"],
        answer: 0,
        explain:
          "„Danach essen wir vielleicht eine Pizza“ cümlesi filmden sonraki planı söylüyor.",
      },
      {
        text: "Bis wann soll Murat antworten?",
        options: ["Bis 17 Uhr", "Bis 19:30 Uhr", "Bis 20 Uhr"],
        answer: 0,
        explain:
          "Son cümle „Schreib mir bitte bis 17 Uhr!“ — Murat en geç saat 17'ye kadar yazmalı.",
      },
    ],
  },
  {
    id: "a1-r2",
    level: "A1",
    skill: "reading",
    title: "Wohnung zu vermieten",
    genre: "İlan",
    intro: "Köln'de kiralık bir daire ilanı okuyacaksın.",
    gloss: [
      { de: "vermieten", tr: "kiraya vermek" },
      { de: "die Wohnung", tr: "daire" },
      { de: "der Balkon", tr: "balkon" },
      { de: "der Stock", tr: "kat" },
      { de: "die Miete", tr: "kira" },
      { de: "die Nebenkosten", tr: "yan giderler (aidat, ısınma vb.)" },
      { de: "das Haustier", tr: "evcil hayvan" },
      { de: "die Besichtigung", tr: "daireyi gezip görme" },
    ],
    minutes: 3,
    text:
      "Schöne 2-Zimmer-Wohnung in Köln-Ehrenfeld zu vermieten. 54 Quadratmeter, mit Balkon und neuer Küche. Die Wohnung liegt im dritten Stock. Miete: 650 Euro pro Monat plus Nebenkosten. Die U-Bahn ist nur 5 Minuten zu Fuß entfernt. Keine Haustiere! Frei ab 1. September.\n\nHaben Sie Interesse? Rufen Sie Herrn Weber an: 0221 456789. Besichtigung am Samstag von 10 bis 12 Uhr.",
    questions: [
      {
        text: "Richtig oder falsch? Die Wohnung hat einen Balkon.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: İlanda „mit Balkon und neuer Küche“ yazıyor.",
      },
      {
        text: "Wann kann man die Wohnung besichtigen?",
        options: ["Am Samstag von 10 bis 12 Uhr", "Am 1. September", "Am Sonntagvormittag"],
        answer: 0,
        explain:
          "Son cümlede „Besichtigung am Samstag von 10 bis 12 Uhr“ deniyor. 1 Eylül dairenin boşalacağı tarih, gezme günü değil.",
      },
      {
        text: "Richtig oder falsch? Hunde und Katzen sind in der Wohnung erlaubt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Keine Haustiere!“ — evcil hayvan yasak.",
      },
      {
        text: "Was soll man bei Interesse machen?",
        options: ["Herrn Weber anrufen", "Eine E-Mail schreiben", "Zur U-Bahn gehen"],
        answer: 0,
        explain:
          "İlan „Rufen Sie Herrn Weber an“ diyor, yani telefonla aramak gerekiyor. U-Bahn sadece dairenin konumu için geçiyor.",
      },
    ],
  },
  {
    id: "a1-r3",
    level: "A1",
    skill: "reading",
    title: "Einladung zum Geburtstag",
    genre: "E-posta",
    intro: "Julia'nın arkadaşı Ayşe'ye gönderdiği doğum günü davetini okuyacaksın.",
    gloss: [
      { de: "der Geburtstag", tr: "doğum günü" },
      { de: "die Party", tr: "parti" },
      { de: "grillen", tr: "mangal yapmak" },
      { de: "der Garten", tr: "bahçe" },
      { de: "der Kuchen", tr: "pasta, kek" },
      { de: "mitbringen", tr: "yanında getirmek" },
      { de: "die Adresse", tr: "adres" },
    ],
    minutes: 2,
    text:
      "Liebe Ayşe,\n\nam Sonntag habe ich Geburtstag. Ich werde 30 Jahre alt! Ich mache eine kleine Party bei mir zu Hause. Wir grillen im Garten und meine Mutter macht einen Kuchen. Die Party beginnt um 15 Uhr. Kannst du kommen? Bring bitte einen Salat mit. Meine Adresse: Gartenstraße 12.\n\nBis Sonntag!\nDeine Julia",
    questions: [
      {
        text: "Wie alt wird Julia?",
        options: ["12 Jahre", "15 Jahre", "30 Jahre"],
        answer: 2,
        explain:
          "„Ich werde 30 Jahre alt!“ cümlesi cevabı veriyor. 12 ev numarası, 15 ise partinin başlama saati.",
      },
      {
        text: "Was soll Ayşe mitbringen?",
        options: ["Einen Kuchen", "Einen Salat", "Fleisch zum Grillen"],
        answer: 1,
        explain:
          "„Bring bitte einen Salat mit“ — Ayşe salata getirmeli. Pastayı Julia'nın annesi yapıyor.",
      },
      {
        text: "Richtig oder falsch? Die Party ist in einem Restaurant.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Julia „bei mir zu Hause“ diyor, parti kendi evinde, bahçede mangal yapacaklar.",
      },
      {
        text: "Wann beginnt die Party?",
        options: ["Um 12 Uhr", "Um 15 Uhr", "Um 18 Uhr"],
        answer: 1,
        explain: "Metinde açıkça „Die Party beginnt um 15 Uhr“ yazıyor.",
      },
    ],
  },
  {
    id: "a1-r4",
    level: "A1",
    skill: "reading",
    title: "Neue Öffnungszeiten",
    genre: "Duyuru",
    intro: "Bir süpermarketin kapısına asılmış duyuruyu okuyacaksın.",
    gloss: [
      { de: "die Öffnungszeiten", tr: "açılış saatleri" },
      { de: "geschlossen", tr: "kapalı" },
      { de: "das Angebot", tr: "indirim, kampanya" },
      { de: "das Mineralwasser", tr: "maden suyu" },
      { de: "die Bäckerei", tr: "fırın" },
      { de: "der Kunde", tr: "müşteri" },
    ],
    minutes: 2,
    text:
      "Liebe Kundinnen und Kunden!\n\nAb Montag, dem 4. Mai, haben wir neue Öffnungszeiten: Montag bis Freitag von 8 bis 21 Uhr, Samstag von 9 bis 20 Uhr. Am Sonntag ist unser Markt geschlossen.\n\nDiese Woche im Angebot: 1 Kilo Tomaten für nur 1,99 Euro und Mineralwasser für 0,49 Euro. Die Bäckerei im Markt öffnet schon um 7 Uhr.\n\nIhr REWE-Team in der Bahnhofstraße",
    questions: [
      {
        text: "Wann ist der Markt am Samstag geöffnet?",
        options: ["Von 8 bis 21 Uhr", "Von 9 bis 20 Uhr", "Von 7 bis 20 Uhr"],
        answer: 1,
        explain:
          "Duyuruda „Samstag von 9 bis 20 Uhr“ yazıyor. 8–21 hafta içi saatleri, 7 ise fırının açılış saati.",
      },
      {
        text: "Wann öffnet die Bäckerei?",
        options: ["Um 7 Uhr", "Um 8 Uhr", "Um 9 Uhr"],
        answer: 0,
        explain:
          "„Die Bäckerei im Markt öffnet schon um 7 Uhr“ — fırın marketten daha erken, saat 7'de açılıyor.",
      },
      {
        text: "Richtig oder falsch? Am Sonntag kann man im Markt einkaufen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Am Sonntag ist unser Markt geschlossen“ — pazar günü kapalı.",
      },
      {
        text: "Richtig oder falsch? Ein Kilo Tomaten kostet diese Woche 1,99 Euro.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Doğru: Kampanya bölümünde „1 Kilo Tomaten für nur 1,99 Euro“ deniyor. 0,49 Euro maden suyunun fiyatı.",
      },
    ],
  },
  {
    id: "a1-r5",
    level: "A1",
    skill: "reading",
    title: "Kurse an der Volkshochschule",
    genre: "Program",
    intro: "Bir halk eğitim merkezinin sonbahar kurs programını okuyacaksın.",
    gloss: [
      { de: "die Volkshochschule", tr: "halk eğitim merkezi" },
      { de: "der Anfänger", tr: "başlangıç seviyesindeki kişi" },
      { de: "der Kursleiter", tr: "kurs öğretmeni" },
      { de: "das Erdgeschoss", tr: "zemin kat" },
      { de: "voll", tr: "dolu" },
      { de: "die Anmeldung", tr: "kayıt" },
    ],
    minutes: 3,
    text:
      "Volkshochschule Bremen — Kurse im Herbst\n\nDeutsch A1 für Anfänger: Montag und Mittwoch, 18:00 bis 19:30 Uhr, Raum 204. Kursleiterin: Frau Schmidt. Preis: 120 Euro.\n\nKochkurs „Italienische Küche“: Freitag, 17:00 bis 20:00 Uhr, Küche im Erdgeschoss. Preis: 45 Euro pro Abend.\n\nYoga für Anfänger: Dienstag, 9:00 bis 10:00 Uhr. Der Kurs ist leider schon voll.\n\nAnmeldung im Büro (Raum 101) oder auf unserer Webseite.",
    questions: [
      {
        text: "Wann ist der Deutschkurs?",
        options: ["Montag und Mittwoch", "Dienstag", "Freitag"],
        answer: 0,
        explain:
          "Programda Deutsch A1 kursunun yanında „Montag und Mittwoch“ yazıyor. Salı yoga, cuma yemek kursu günü.",
      },
      {
        text: "Was kostet der Kochkurs pro Abend?",
        options: ["45 Euro", "120 Euro", "150 Euro"],
        answer: 0,
        explain:
          "Yemek kursu için „Preis: 45 Euro pro Abend“ deniyor. 120 Euro Almanca kursunun toplam ücreti.",
      },
      {
        text: "Richtig oder falsch? Man kann noch im Yogakurs mitmachen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Der Kurs ist leider schon voll“ — yoga kursu dolu, artık kayıt alınmıyor.",
      },
      {
        text: "Wo ist die Anmeldung?",
        options: ["In Raum 101", "In Raum 204", "Im Erdgeschoss"],
        answer: 0,
        explain:
          "Son satırda „Anmeldung im Büro (Raum 101)“ yazıyor. 204 Almanca kursunun sınıfı, zemin kat ise mutfağın yeri.",
      },
    ],
  },
  {
    id: "a1-r6",
    level: "A1",
    skill: "reading",
    title: "Information für unsere Fahrgäste",
    genre: "Duyuru",
    intro: "Metro istasyonuna asılmış bir yolcu bilgilendirme duyurusunu okuyacaksın.",
    gloss: [
      { de: "der Fahrgast", tr: "yolcu" },
      { de: "die U-Bahn-Linie", tr: "metro hattı" },
      { de: "der Hauptbahnhof", tr: "ana tren garı" },
      { de: "das Gleis", tr: "ray" },
      { de: "abfahren", tr: "kalkmak, hareket etmek" },
      { de: "dauern", tr: "sürmek" },
      { de: "gültig", tr: "geçerli" },
      { de: "das Verständnis", tr: "anlayış" },
    ],
    minutes: 3,
    text:
      "Information für unsere Fahrgäste\n\nVom 10. bis 14. Juni fährt die U-Bahn-Linie U3 nicht zwischen Hauptbahnhof und Stadtpark. Wir bauen neue Gleise. Bitte nehmen Sie den Bus 47. Der Bus fährt alle 10 Minuten vom Hauptbahnhof ab. Die Fahrt dauert circa 20 Minuten. Ihre Tickets für die U-Bahn sind auch im Bus gültig. Wir danken für Ihr Verständnis.\n\nIhre Verkehrsbetriebe München",
    questions: [
      {
        text: "Was ist das Problem?",
        options: [
          "Die U3 fährt nicht zwischen Hauptbahnhof und Stadtpark.",
          "Der Bus 47 fährt nicht.",
          "Der Hauptbahnhof ist geschlossen.",
        ],
        answer: 0,
        explain:
          "İlk cümle sorunu söylüyor: U3 hattı gar ile Stadtpark arasında çalışmıyor. 47 numaralı otobüs tam tersine çözüm olarak öneriliyor.",
      },
      {
        text: "Wie oft fährt der Bus 47?",
        options: ["Alle 10 Minuten", "Alle 14 Minuten", "Alle 20 Minuten"],
        answer: 0,
        explain:
          "„Der Bus fährt alle 10 Minuten“ — 10 dakikada bir. 20 dakika yolculuğun süresi, 14 ise tarihte geçiyor.",
      },
      {
        text: "Richtig oder falsch? Man muss für den Bus ein neues Ticket kaufen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Ihre Tickets für die U-Bahn sind auch im Bus gültig“ — metro bileti otobüste de geçerli.",
      },
      {
        text: "Wie lange dauert die Fahrt mit dem Bus?",
        options: ["Circa 10 Minuten", "Circa 20 Minuten", "Circa 47 Minuten"],
        answer: 1,
        explain: "„Die Fahrt dauert circa 20 Minuten“ cümlesi süreyi veriyor. 47 otobüsün numarası.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "a1-l1",
    level: "A1",
    skill: "listening",
    title: "Auf dem Markt",
    genre: "Diyalog",
    intro: "Lena manavda alışveriş yapıyor; satıcıyla konuşmasını dinleyeceksin.",
    gloss: [
      { de: "suchen", tr: "aramak" },
      { de: "der Apfel", tr: "elma" },
      { de: "das Kilo", tr: "kilo" },
      { de: "frisch", tr: "taze" },
      { de: "leider", tr: "maalesef" },
      { de: "zahlen", tr: "ödemek" },
      { de: "die Bäckerei", tr: "fırın" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Verkäufer", text: "Guten Tag! Kann ich Ihnen helfen?" },
      { speaker: "Lena", text: "Ja, gern. Ich suche Äpfel." },
      { speaker: "Verkäufer", text: "Ja, hier bitte. Ein Kilo kostet 2 Euro 50." },
      {
        speaker: "Lena",
        text: "Gut, dann nehme ich zwei Kilo. Und haben Sie auch frisches Brot?",
      },
      {
        speaker: "Verkäufer",
        text: "Nein, leider nicht. Aber die Bäckerei ist gleich neben dem Markt.",
      },
      { speaker: "Lena", text: "Ah, danke. Dann zahle ich nur die Äpfel. Hier sind 5 Euro." },
      { speaker: "Verkäufer", text: "Vielen Dank und auf Wiedersehen!" },
    ],
    questions: [
      {
        text: "Was kauft Lena?",
        options: ["Äpfel", "Brot", "Äpfel und Brot"],
        answer: 0,
        explain:
          "Lena sadece elma alıyor: „Dann zahle ich nur die Äpfel.“ Ekmek istiyor ama satıcıda yok.",
      },
      {
        text: "Wie viel kostet ein Kilo Äpfel?",
        options: ["2 Euro 50", "5 Euro", "2 Euro"],
        answer: 0,
        explain:
          "Satıcı „Ein Kilo kostet 2 Euro 50“ diyor. 5 Euro Lena'nın iki kilo için verdiği para.",
      },
      {
        text: "Richtig oder falsch? Der Verkäufer hat frisches Brot.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: Satıcı „Nein, leider nicht“ diye cevap veriyor, ekmek yok.",
      },
      {
        text: "Wo ist die Bäckerei?",
        options: ["Gleich neben dem Markt", "Im Markt", "Am Bahnhof"],
        answer: 0,
        explain:
          "Satıcı „die Bäckerei ist gleich neben dem Markt“ diyor — fırın pazarın hemen yanında.",
      },
    ],
  },
  {
    id: "a1-l2",
    level: "A1",
    skill: "listening",
    title: "Anruf bei der Arztpraxis",
    genre: "Telesekreter",
    intro: "Bir doktor muayenehanesinin telesekreter kaydını dinleyeceksin.",
    gloss: [
      { de: "die Praxis", tr: "muayenehane" },
      { de: "geöffnet", tr: "açık" },
      { de: "der Termin", tr: "randevu" },
      { de: "der Vormittag", tr: "öğleden önce" },
      { de: "der Notfall", tr: "acil durum" },
      { de: "wählen", tr: "(numara) çevirmek" },
      { de: "Auf Wiederhören", tr: "hoşça kalın (telefonda)" },
    ],
    minutes: 2,
    segments: [
      {
        text: "Guten Tag. Hier ist die Praxis von Doktor Meyer. Unsere Praxis ist von Montag bis Freitag von 8 bis 12 Uhr geöffnet, am Dienstag und Donnerstag auch von 15 bis 18 Uhr. Am Mittwochnachmittag ist die Praxis geschlossen. Möchten Sie einen Termin? Dann rufen Sie bitte am Vormittag an oder schreiben Sie uns eine E-Mail. In Notfällen wählen Sie bitte die 112. Vielen Dank und auf Wiederhören.",
      },
    ],
    questions: [
      {
        text: "Wann ist die Praxis am Vormittag geöffnet?",
        options: ["Von 8 bis 12 Uhr", "Von 15 bis 18 Uhr", "Von 8 bis 18 Uhr"],
        answer: 0,
        explain:
          "Kayıtta „von Montag bis Freitag von 8 bis 12 Uhr geöffnet“ deniyor. 15–18 sadece salı ve perşembe öğleden sonraları.",
      },
      {
        text: "Richtig oder falsch? Am Mittwochnachmittag ist die Praxis geöffnet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Am Mittwochnachmittag ist die Praxis geschlossen“ — çarşamba öğleden sonra kapalı.",
      },
      {
        text: "Was soll man für einen Termin machen?",
        options: ["Am Vormittag anrufen", "Am Nachmittag vorbeikommen", "Die 112 wählen"],
        answer: 0,
        explain:
          "„Dann rufen Sie bitte am Vormittag an“ — randevu için öğleden önce aranmalı. 112 sadece acil durumlar için.",
      },
    ],
  },
  {
    id: "a1-l3",
    level: "A1",
    skill: "listening",
    title: "Durchsage am Flughafen",
    genre: "Anons",
    intro: "Havaalanında İstanbul uçuşuyla ilgili bir anons dinleyeceksin.",
    gloss: [
      { de: "die Durchsage", tr: "anons" },
      { de: "der Passagier", tr: "yolcu" },
      { de: "der Flug", tr: "uçuş" },
      { de: "die Verspätung", tr: "rötar, gecikme" },
      { de: "starten", tr: "kalkmak (uçak)" },
      { de: "das Gate", tr: "biniş kapısı" },
    ],
    minutes: 2,
    segments: [
      {
        text: "Achtung, eine wichtige Durchsage für alle Passagiere nach Istanbul. Der Flug TK 1624 hat 40 Minuten Verspätung. Das Flugzeug startet nicht um 14:20 Uhr, sondern um 15 Uhr. Bitte gehen Sie erst um 14:15 Uhr zum Gate. Achtung, das Gate ist neu: Der Flug startet heute von Gate B12, nicht von Gate B7. Wir wünschen Ihnen einen guten Flug.",
      },
    ],
    questions: [
      {
        text: "Wann startet das Flugzeug heute?",
        options: ["Um 14:20 Uhr", "Um 15 Uhr", "Um 14:15 Uhr"],
        answer: 1,
        explain:
          "„Das Flugzeug startet nicht um 14:20 Uhr, sondern um 15 Uhr“ — rötar yüzünden yeni kalkış saati 15:00. 14:15 kapıya gitme saati.",
      },
      {
        text: "Von welchem Gate startet der Flug?",
        options: ["Von Gate B12", "Von Gate B7", "Von Gate B40"],
        answer: 0,
        explain:
          "Anonsta „Der Flug startet heute von Gate B12, nicht von Gate B7“ deniyor. B7 eski kapı.",
      },
      {
        text: "Richtig oder falsch? Der Flug nach Istanbul hat Verspätung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Der Flug TK 1624 hat 40 Minuten Verspätung“ — uçuşta 40 dakika rötar var.",
      },
      {
        text: "Wann sollen die Passagiere zum Gate gehen?",
        options: ["Um 14:15 Uhr", "Um 14:20 Uhr", "Um 15 Uhr"],
        answer: 0,
        explain:
          "„Bitte gehen Sie erst um 14:15 Uhr zum Gate“ — yolculardan kapıya 14:15'te gitmeleri isteniyor.",
      },
    ],
  },
  {
    id: "a1-l4",
    level: "A1",
    skill: "listening",
    title: "Im Restaurant",
    genre: "Diyalog",
    intro: "Emre ile bir garson arasındaki restoran konuşmasını dinleyeceksin.",
    gloss: [
      { de: "bestellen", tr: "sipariş vermek" },
      { de: "die Tomatensuppe", tr: "domates çorbası" },
      { de: "das Hähnchen", tr: "tavuk" },
      { de: "der Reis", tr: "pirinç, pilav" },
      { de: "der Apfelsaft", tr: "elma suyu" },
      { de: "sofort", tr: "hemen" },
      { de: "die Toilette", tr: "tuvalet" },
    ],
    minutes: 2,
    segments: [
      { speaker: "Kellner", text: "Guten Abend! Was möchten Sie bestellen?" },
      {
        speaker: "Emre",
        text: "Guten Abend. Ich nehme die Tomatensuppe und danach das Hähnchen mit Reis.",
      },
      { speaker: "Kellner", text: "Gern. Und was möchten Sie trinken?" },
      {
        speaker: "Emre",
        text: "Ein Mineralwasser, bitte. Und meine Frau nimmt den Salat mit Käse und einen Apfelsaft.",
      },
      {
        speaker: "Kellner",
        text: "Also eine Tomatensuppe, ein Hähnchen mit Reis, ein Salat mit Käse, ein Mineralwasser und ein Apfelsaft. Kommt sofort!",
      },
      { speaker: "Emre", text: "Danke schön! Ach, eine Frage: Wo sind die Toiletten?" },
      { speaker: "Kellner", text: "Gleich links neben der Bar." },
    ],
    questions: [
      {
        text: "Was trinkt Emre?",
        options: ["Ein Mineralwasser", "Einen Apfelsaft", "Eine Cola"],
        answer: 0,
        explain:
          "Emre „Ein Mineralwasser, bitte“ diyor. Elma suyu eşinin içeceği.",
      },
      {
        text: "Wer nimmt den Salat mit Käse?",
        options: ["Emres Frau", "Emre", "Der Kellner"],
        answer: 0,
        explain:
          "Emre „meine Frau nimmt den Salat mit Käse“ diyor — salatayı eşi alıyor, kendisi çorba ve tavuk yiyor.",
      },
      {
        text: "Richtig oder falsch? Emre bestellt eine Tomatensuppe.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich nehme die Tomatensuppe und danach das Hähnchen mit Reis“ diyor.",
      },
      {
        text: "Wo sind die Toiletten?",
        options: ["Links neben der Bar", "Rechts neben der Küche", "Neben dem Eingang"],
        answer: 0,
        explain: "Garsonun son cevabı: „Gleich links neben der Bar.“",
      },
    ],
  },
  {
    id: "a1-l5",
    level: "A1",
    skill: "listening",
    title: "Eine Nachricht von Deniz",
    genre: "Mesaj",
    intro: "Deniz, arkadaşı Ceren'in telesekreterine yarınki plan hakkında mesaj bırakıyor.",
    gloss: [
      { de: "das Wetter", tr: "hava durumu" },
      { de: "regnen", tr: "yağmur yağmak" },
      { de: "das Grad", tr: "derece" },
      { de: "das Schwimmbad", tr: "yüzme havuzu" },
      { de: "drinnen", tr: "içeride, kapalı alanda" },
      { de: "abholen", tr: "gelip almak" },
      { de: "zurückrufen", tr: "geri aramak" },
    ],
    minutes: 2,
    segments: [
      {
        speaker: "Deniz",
        text: "Hallo Ceren, hier ist Deniz. Wir wollen doch morgen zusammen in den Park gehen. Aber das Wetter wird leider schlecht. Es regnet morgen den ganzen Tag und es sind nur 12 Grad. Ich habe eine Idee: Wir gehen ins Schwimmbad! Das Schwimmbad ist ja drinnen. Es kostet 4 Euro. Ich hole dich um 11 Uhr mit dem Auto ab. Ruf mich bitte zurück. Tschüss!",
      },
    ],
    questions: [
      {
        text: "Wie wird das Wetter morgen?",
        options: ["Es regnet den ganzen Tag.", "Es ist sonnig und warm.", "Es schneit."],
        answer: 0,
        explain:
          "Deniz „Es regnet morgen den ganzen Tag und es sind nur 12 Grad“ diyor — bütün gün yağmurlu.",
      },
      {
        text: "Wohin möchte Deniz jetzt gehen?",
        options: ["Ins Schwimmbad", "In den Park", "Ins Kino"],
        answer: 0,
        explain:
          "Yeni fikri „Wir gehen ins Schwimmbad!“ — park eski plandı, yağmur yüzünden iptal.",
      },
      {
        text: "Richtig oder falsch? Deniz holt Ceren um 11 Uhr ab.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Ich hole dich um 11 Uhr mit dem Auto ab“ diyor.",
      },
      {
        text: "Was kostet das Schwimmbad?",
        options: ["4 Euro", "11 Euro", "12 Euro"],
        answer: 0,
        explain:
          "„Es kostet 4 Euro“ cümlesi havuzun ücretini söylüyor. 11 buluşma saati, 12 ise hava sıcaklığı.",
      },
    ],
  },
  {
    id: "a1-l6",
    level: "A1",
    skill: "listening",
    title: "Durchsage im Supermarkt",
    genre: "Anons",
    intro: "Bir süpermarketin günün kampanyalarını duyurduğu anonsu dinleyeceksin.",
    gloss: [
      { de: "das Angebot", tr: "indirim, kampanya" },
      { de: "die Erdbeere", tr: "çilek" },
      { de: "der Käse", tr: "peynir" },
      { de: "die Fleischtheke", tr: "et reyonu" },
      { de: "schließen", tr: "kapanmak" },
      { de: "die Kasse", tr: "kasa" },
      { de: "der Einkauf", tr: "alışveriş" },
    ],
    minutes: 2,
    segments: [
      {
        text: "Liebe Kundinnen und Kunden, herzlich willkommen! Heute haben wir viele Angebote für Sie. Frische Erdbeeren aus Spanien: 500 Gramm für nur 1 Euro 99. Käse aus Frankreich: 100 Gramm für 1 Euro 29. Und an unserer Fleischtheke: Hähnchen, das Kilo für 3 Euro 49. Unser Markt schließt heute um 20 Uhr. Die Kasse 5 ist geschlossen, bitte gehen Sie zu den Kassen 1 bis 4. Wir wünschen Ihnen einen schönen Einkauf!",
      },
    ],
    questions: [
      {
        text: "Woher kommen die Erdbeeren?",
        options: ["Aus Spanien", "Aus Frankreich", "Aus Deutschland"],
        answer: 0,
        explain:
          "Anonsta „Frische Erdbeeren aus Spanien“ deniyor. Fransa'dan gelen ürün peynir.",
      },
      {
        text: "Was kostet der Käse?",
        options: [
          "100 Gramm für 1 Euro 29",
          "500 Gramm für 1 Euro 99",
          "Das Kilo für 3 Euro 49",
        ],
        answer: 0,
        explain:
          "„Käse aus Frankreich: 100 Gramm für 1 Euro 29.“ Diğer fiyatlar çilek ve tavuğa ait.",
      },
      {
        text: "Richtig oder falsch? Der Markt schließt heute um 20 Uhr.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Unser Markt schließt heute um 20 Uhr“ cümlesi bunu söylüyor.",
      },
      {
        text: "Welche Kasse ist geschlossen?",
        options: ["Kasse 5", "Kasse 1", "Kasse 4"],
        answer: 0,
        explain:
          "„Die Kasse 5 ist geschlossen“ — müşteriler 1'den 4'e kadar olan kasalara yönlendiriliyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "a1-w1",
    level: "A1",
    skill: "writing",
    title: "Sich vorstellen",
    genre: "Tanışma",
    intro: "Kendini tanıtmayı çalışacaksın: önce cümleler kur, sonra kısa bir forum mesajı yaz.",
    gloss: [
      { de: "heißen", tr: "adında olmak" },
      { de: "kommen aus", tr: "…den gelmek, …li olmak" },
      { de: "wohnen", tr: "oturmak, ikamet etmek" },
      { de: "arbeiten als", tr: "… olarak çalışmak" },
      { de: "das Hobby", tr: "hobi" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Benim adım Elif ve İzmir'den geliyorum.",
        answer: "Ich heiße Elif und komme aus Izmir.",
        hint: "Fiil ikinci pozisyonda; şehir adlarıyla „aus“ kullanılır.",
      },
      {
        kind: "build",
        tr: "Berlin'de küçük bir dairede oturuyorum.",
        answer: "Ich wohne in Berlin in einer kleinen Wohnung.",
        alternatives: ["In Berlin wohne ich in einer kleinen Wohnung."],
        hint: "„wohnen in“ kalıbı; die Wohnung dişil olduğu için „in einer kleinen Wohnung“.",
      },
      {
        kind: "build",
        tr: "Öğretmen olarak çalışıyorum.",
        answer: "Ich arbeite als Lehrerin.",
        hint: "Meslek söylerken „als“ kullanılır, artikel gerekmez.",
      },
      {
        kind: "free",
        prompt:
          "Yeni Almanca kursunun forumuna kendini tanıtan kısa bir mesaj yaz. Şu üç noktaya değin: adın ve nereli olduğun, nerede oturduğun, işin veya hobin.",
        checklist: [
          "Selamlama ile başladın mı? (Hallo zusammen!)",
          "Üç içerik noktasının hepsine değindin mi: isim ve memleket, oturduğun yer, iş veya hobi?",
          "Fiiller ikinci pozisyonda mı? (Ich heiße…, Ich wohne…)",
          "Veda cümlesiyle bitirdin mi? (Bis bald!)",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich heiße …", tr: "Benim adım …" },
          { de: "Ich komme aus …", tr: "…den geliyorum / …liyim" },
          { de: "Ich wohne in …", tr: "…de oturuyorum" },
          { de: "Ich arbeite als …", tr: "… olarak çalışıyorum" },
          { de: "Mein Hobby ist …", tr: "Hobim …" },
          { de: "Bis bald!", tr: "Görüşürüz!" },
        ],
        sample:
          "Hallo zusammen! Ich heiße Emre und ich komme aus der Türkei, aus Ankara. Jetzt wohne ich in Hamburg. Ich arbeite als Ingenieur. Meine Hobbys sind Fußball und Kochen. Ich lerne Deutsch für die Arbeit. Bis bald! Emre",
      },
    ],
  },
  {
    id: "a1-w2",
    level: "A1",
    skill: "writing",
    title: "Eine Nachricht an einen Freund",
    genre: "Mesaj",
    intro: "Arkadaşlarla plan yapmayı çalışacaksın: cümleler kur, sonra bir davete cevap yaz.",
    gloss: [
      { de: "sich treffen", tr: "buluşmak" },
      { de: "die Einladung", tr: "davet" },
      { de: "leider", tr: "maalesef" },
      { de: "die Zeit haben", tr: "vakti olmak" },
      { de: "vorschlagen", tr: "önermek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Yarın sinemaya gidiyoruz.",
        answer: "Wir gehen morgen ins Kino.",
        alternatives: ["Morgen gehen wir ins Kino."],
        hint: "Zaman zarfı başa gelirse fiil yine ikinci pozisyonda kalır, özne fiilden sonra gelir.",
      },
      {
        kind: "build",
        tr: "Saat kaçta buluşuyoruz?",
        answer: "Um wie viel Uhr treffen wir uns?",
        hint: "Soru ifadesi başta, fiil hemen ardından gelir; „sich treffen“ dönüşlü fiil.",
      },
      {
        kind: "build",
        tr: "Maalesef bugün gelemiyorum.",
        answer: "Leider kann ich heute nicht kommen.",
        alternatives: [
          "Ich kann heute leider nicht kommen.",
          "Ich kann leider heute nicht kommen.",
          "Heute kann ich leider nicht kommen.",
        ],
        hint: "kann ikinci pozisyonda, kommen mastarı cümlenin sonunda.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın Jonas seni partisine davet etti ama cumartesi gelemiyorsun. Ona kısa bir mesaj yaz: teşekkür et, neden gelemediğini söyle, başka bir gün öner.",
        stimulus:
          "Hallo! Kommst du am Samstag zu meiner Party? Sie beginnt um 18 Uhr. Liebe Grüße, Jonas",
        checklist: [
          "Selamlama ve davet için teşekkür var mı?",
          "Gelemediğini ve nedenini yazdın mı?",
          "Yeni bir gün veya plan önerdin mi?",
          "Veda ile bitirdin mi? (Viele Grüße …)",
        ],
        minWords: 20,
        phrases: [
          { de: "Danke für deine Einladung!", tr: "Davetin için teşekkürler!" },
          { de: "Ich kann leider nicht kommen.", tr: "Maalesef gelemiyorum." },
          { de: "Ich muss arbeiten.", tr: "Çalışmam gerekiyor." },
          { de: "Hast du am Sonntag Zeit?", tr: "Pazar günü vaktin var mı?" },
          { de: "Viele Grüße", tr: "Sevgiler (mesaj sonu)" },
        ],
        sample:
          "Hallo Jonas, danke für deine Einladung! Aber ich kann am Samstag leider nicht kommen. Ich muss am Abend arbeiten. Hast du am Sonntag Zeit? Wir können zusammen Kaffee trinken. Viele Grüße, Selin",
      },
    ],
  },
  {
    id: "a1-w3",
    level: "A1",
    skill: "writing",
    title: "Essen und Einkaufen",
    genre: "Günlük yaşam",
    intro: "Alışveriş ve yemek cümleleri kuracak, sonra bir arkadaşını akşam yemeğine davet edeceksin.",
    gloss: [
      { de: "kaufen", tr: "satın almak" },
      { de: "das Frühstück", tr: "kahvaltı" },
      { de: "kochen", tr: "yemek pişirmek" },
      { de: "der Nachtisch", tr: "tatlı" },
      { de: "mitbringen", tr: "yanında getirmek" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir kilo domates almak istiyorum.",
        answer: "Ich möchte ein Kilo Tomaten kaufen.",
        hint: "möchte ikinci pozisyonda, kaufen mastarı cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Kahvaltıda ekmek ve peynir yiyorum.",
        answer: "Zum Frühstück esse ich Brot und Käse.",
        alternatives: ["Ich esse zum Frühstück Brot und Käse."],
        hint: "„Zum Frühstück“ başa gelince fiil ikinci pozisyonda kalır, özne sonra gelir.",
      },
      {
        kind: "build",
        tr: "Çay mı yoksa kahve mi içiyorsun?",
        answer: "Trinkst du Tee oder Kaffee?",
        hint: "Soru kelimesi olmayan sorularda fiil cümlenin başına gelir.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın Mia'yı evinde akşam yemeğine davet eden kısa bir e-posta yaz. Şu üç noktaya değin: yemek ne zaman, ne pişiriyorsun, Mia ne getirsin.",
        checklist: [
          "Selamlama ile başladın mı? (Liebe Mia / Hallo Mia)",
          "Gün ve saat verdin mi?",
          "Ne pişireceğini ve Mia'nın ne getireceğini yazdın mı?",
          "Veda ile bitirdin mi?",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich lade dich zum Abendessen ein.", tr: "Seni akşam yemeğine davet ediyorum." },
          { de: "Ich koche …", tr: "… pişiriyorum" },
          { de: "Hast du Zeit?", tr: "Vaktin var mı?" },
          { de: "Bring bitte … mit.", tr: "Lütfen … getir." },
          { de: "Bis Freitag!", tr: "Cumaya görüşürüz!" },
        ],
        sample:
          "Liebe Mia, ich lade dich zum Abendessen ein. Hast du am Freitag um 19 Uhr Zeit? Ich koche Nudeln mit Tomatensoße und einen Salat. Bring bitte einen Nachtisch mit. Ich freue mich! Bis Freitag! Deine Aylin",
      },
    ],
  },
  {
    id: "a1-w4",
    level: "A1",
    skill: "writing",
    title: "Meine Wohnung, mein Alltag",
    genre: "Günlük yaşam",
    intro: "Ev ve günlük rutin cümleleri kuracak, sonra yeni evini bir arkadaşına anlatacaksın.",
    gloss: [
      { de: "die Wohnung", tr: "daire" },
      { de: "das Schlafzimmer", tr: "yatak odası" },
      { de: "hell", tr: "aydınlık" },
      { de: "die Arbeit", tr: "iş" },
      { de: "fernsehen", tr: "televizyon izlemek" },
      { de: "besuchen", tr: "ziyaret etmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Dairem küçük ama çok güzel.",
        answer: "Meine Wohnung ist klein, aber sehr schön.",
        hint: "„aber“ bağlacından önce virgül gelir ve kelime sırasını değiştirmez.",
      },
      {
        kind: "build",
        tr: "İşe otobüsle gidiyorum.",
        answer: "Ich fahre mit dem Bus zur Arbeit.",
        alternatives: [
          "Zur Arbeit fahre ich mit dem Bus.",
          "Mit dem Bus fahre ich zur Arbeit.",
        ],
        hint: "Ulaşım aracı „mit + Dativ“ ile söylenir: mit dem Bus.",
      },
      {
        kind: "build",
        tr: "Akşamları televizyon izliyorum.",
        answer: "Am Abend sehe ich fern.",
        alternatives: ["Ich sehe am Abend fern."],
        hint: "fernsehen ayrılabilen fiildir: „fern“ parçası cümlenin sonuna gider.",
      },
      {
        kind: "free",
        prompt:
          "Yeni bir daireye taşındın. Arkadaşın Tom'a kısa bir e-posta yaz: dairen kaç odalı ve nasıl, hangi şehirde veya semtte, Tom seni ne zaman ziyaret edebilir.",
        checklist: [
          "Selamlama ile başladın mı?",
          "Daireyi tanıttın mı: oda sayısı ve bir özellik (büyük, aydınlık, balkonlu…)?",
          "Nerede oturduğunu yazdın mı?",
          "Tom'u ziyarete davet ettin mi ve veda ile bitirdin mi?",
        ],
        minWords: 20,
        phrases: [
          { de: "Ich habe eine neue Wohnung.", tr: "Yeni bir dairem var." },
          { de: "Die Wohnung hat zwei Zimmer.", tr: "Dairenin iki odası var." },
          { de: "Sie liegt im Zentrum.", tr: "Merkezde bulunuyor." },
          { de: "Willst du mich besuchen?", tr: "Beni ziyaret etmek ister misin?" },
          { de: "Du kannst am Wochenende kommen.", tr: "Hafta sonu gelebilirsin." },
        ],
        sample:
          "Hallo Tom, ich habe eine neue Wohnung in München! Sie hat zwei Zimmer, eine Küche und einen kleinen Balkon. Die Wohnung ist hell und liegt im Zentrum. Willst du mich besuchen? Du kannst am Samstag kommen. Viele Grüße, Deniz",
      },
    ],
  },
];
