import type { SkillExercise } from "../types";

/** A2 — okuma, dinleme ve yazma egzersizleri. */
export const a2: SkillExercise[] = [
  // ---------------------------------------------------------------- OKUMA
  {
    id: "a2-r1",
    level: "A2",
    skill: "reading",
    title: "Grüße aus Hamburg",
    genre: "E-posta",
    intro: "Arkadaşın Merve, Hamburg tatilinden sana yazıyor — planlarını ve gördüklerini yakala.",
    gloss: [
      { de: "die Hafenrundfahrt", tr: "liman turu" },
      { de: "dauern", tr: "sürmek" },
      { de: "die Sonne scheint", tr: "güneş açıyor" },
      { de: "bekannt für", tr: "-iyle ünlü" },
      { de: "der Fischmarkt", tr: "balık pazarı" },
      { de: "bleiben", tr: "kalmak" },
      { de: "besuchen", tr: "ziyaret etmek" },
    ],
    minutes: 3,
    text:
      "Liebe Elif,\n\n" +
      "viele Grüße aus Hamburg! Ich bin seit Montag hier und bleibe noch bis Sonntag. Das Wetter war am Anfang schlecht, aber seit gestern scheint die Sonne. Gestern habe ich eine Hafenrundfahrt gemacht, das war toll! Die Fahrt hat 90 Minuten gedauert und nur 18 Euro gekostet.\n\n" +
      "Morgen will ich das Miniatur Wunderland besuchen, weil meine Schwester sagt, dass es dort sehr schön ist. Am Samstag treffe ich einen alten Freund. Wir wollen zusammen Fisch essen, denn Hamburg ist bekannt für seinen Fischmarkt.\n\n" +
      "Und du? Wie geht es dir? Schreib mir bald!\n\n" +
      "Liebe Grüße\nMerve",
    questions: [
      {
        text: "Wie lange bleibt Merve in Hamburg?",
        options: ["Bis Samstag", "Bis Sonntag", "Bis Montag"],
        answer: 1,
        explain: "Merve „bleibe noch bis Sonntag“ yazıyor. Pazartesi geliş günü, cumartesi ise arkadaşıyla buluşma günü — ikisi de çeldirici.",
      },
      {
        text: "Das Wetter war die ganze Woche schön.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Das Wetter war am Anfang schlecht“ diyor; güneş ancak dünden beri açıyor.",
      },
      {
        text: "Was hat die Hafenrundfahrt gekostet?",
        options: ["8 Euro", "18 Euro", "90 Euro"],
        answer: 1,
        explain: "Metinde „nur 18 Euro gekostet“ yazıyor. 90 tur ücreti değil, turun dakika olarak süresi.",
      },
      {
        text: "Was will Merve morgen machen?",
        options: ["Fisch essen", "Eine Hafenrundfahrt machen", "Das Miniatur Wunderland besuchen"],
        answer: 2,
        explain: "„Morgen will ich das Miniatur Wunderland besuchen“ diyor. Balık yemek cumartesi planı, liman turunu ise dün yapmış.",
      },
    ],
  },
  {
    id: "a2-r2",
    level: "A2",
    skill: "reading",
    title: "Neues Schwimmbad öffnet am Wochenende",
    genre: "Haber",
    intro: "Yerel gazeteden kısa bir haber: Leipzig'de yeni bir yüzme havuzu açılıyor.",
    gloss: [
      { de: "das Schwimmbad", tr: "yüzme havuzu" },
      { de: "die Bauzeit", tr: "inşaat süresi" },
      { de: "das Dach", tr: "çatı" },
      { de: "das Becken", tr: "havuz (bölümü)" },
      { de: "der Eintritt", tr: "giriş (ücreti)" },
      { de: "der Erwachsene", tr: "yetişkin" },
      { de: "geschlossen", tr: "kapalı" },
      { de: "täglich", tr: "her gün" },
    ],
    minutes: 3,
    text:
      "Leipzig. Nach zwei Jahren Bauzeit öffnet am Samstag das neue Schwimmbad im Stadtteil Gohlis. Das alte Bad war seit 2023 geschlossen, weil das Dach kaputt war. Das neue Gebäude hat drei Becken: ein Sportbecken, ein Kinderbecken und ein Außenbecken für den Sommer.\n\n" +
      "Am Eröffnungstag ist der Eintritt frei. Ab Sonntag kostet eine Karte für Erwachsene 5 Euro, Kinder bis 14 Jahre zahlen 2,50 Euro. Das Bad ist täglich von 7 bis 22 Uhr geöffnet, nur montags bleibt es geschlossen. Die Stadt hofft, dass viele Familien kommen.",
    questions: [
      {
        text: "Warum war das alte Schwimmbad geschlossen?",
        options: ["Es war zu klein.", "Das Dach war kaputt.", "Es war zu teuer."],
        answer: 1,
        explain: "Haberde nedeni açıkça veriliyor: „weil das Dach kaputt war“.",
      },
      {
        text: "Was kostet der Eintritt am Samstag?",
        options: ["5 Euro", "2,50 Euro", "Nichts"],
        answer: 2,
        explain: "Cumartesi açılış günü ve „Am Eröffnungstag ist der Eintritt frei“ — yani ücretsiz. 5 ve 2,50 Euro pazardan itibaren geçerli fiyatlar.",
      },
      {
        text: "Das Schwimmbad ist jeden Tag geöffnet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „nur montags bleibt es geschlossen“ — pazartesileri kapalı.",
      },
      {
        text: "Wie viele Becken hat das neue Bad?",
        options: ["Zwei", "Drei", "Vier"],
        answer: 1,
        explain: "„Das neue Gebäude hat drei Becken“: spor, çocuk ve yazlık açık havuz.",
      },
    ],
  },
  {
    id: "a2-r3",
    level: "A2",
    skill: "reading",
    title: "2-Zimmer-Wohnung in der Südstadt",
    genre: "İlan",
    intro: "Nürnberg'de kiralık daire arıyorsun — bu ilandaki detayları dikkatle oku.",
    gloss: [
      { de: "die Miete", tr: "kira" },
      { de: "die Nebenkosten", tr: "yan giderler (aidat vb.)" },
      { de: "der Keller", tr: "bodrum, kiler" },
      { de: "nach Absprache", tr: "anlaşmaya bağlı" },
      { de: "erlaubt", tr: "izinli, serbest" },
      { de: "die Besichtigung", tr: "daireyi gezme, görme" },
      { de: "der Ausweis", tr: "kimlik" },
      { de: "entfernt", tr: "uzaklıkta" },
    ],
    minutes: 3,
    text:
      "2-Zimmer-Wohnung in Nürnberg-Südstadt\n\n" +
      "Helle Wohnung im 3. Stock, 54 Quadratmeter, mit Balkon und neuer Küche. Die Miete beträgt 680 Euro plus 120 Euro Nebenkosten. Ein Keller gehört zur Wohnung, eine Garage leider nicht. Haustiere sind nach Absprache erlaubt.\n\n" +
      "Die U-Bahn-Station Aufseßplatz ist nur fünf Minuten zu Fuß entfernt, ein Supermarkt liegt direkt gegenüber. Die Wohnung ist ab dem 1. Oktober frei.\n\n" +
      "Besichtigung: Samstag, den 20. September, von 10 bis 13 Uhr. Bitte melden Sie sich vorher per E-Mail bei Frau Weber: wohnung-weber@mailbox.de. Bringen Sie zur Besichtigung bitte einen Ausweis mit.",
    questions: [
      {
        text: "Wie viel kostet die Wohnung mit Nebenkosten im Monat?",
        options: ["680 Euro", "800 Euro", "120 Euro"],
        answer: 1,
        explain: "Kira 680 Euro, yan giderler 120 Euro: toplam 800 Euro. Şıklardaki 680 ve 120 tek başına eksik kalıyor.",
      },
      {
        text: "Zur Wohnung gehört eine Garage.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Ein Keller gehört zur Wohnung, eine Garage leider nicht“ — bodrum var ama garaj yok.",
      },
      {
        text: "Ab wann ist die Wohnung frei?",
        options: ["Ab sofort", "Ab dem 20. September", "Ab dem 1. Oktober"],
        answer: 2,
        explain: "„Die Wohnung ist ab dem 1. Oktober frei.“ 20 Eylül daireyi gezme (Besichtigung) tarihi, taşınma tarihi değil.",
      },
      {
        text: "Was soll man zur Besichtigung mitbringen?",
        options: ["Einen Ausweis", "Einen Mietvertrag", "Ein Foto"],
        answer: 0,
        explain: "İlanın son cümlesi: „Bringen Sie zur Besichtigung bitte einen Ausweis mit.“",
      },
    ],
  },
  {
    id: "a2-r4",
    level: "A2",
    skill: "reading",
    title: "Sommerfest im Stadtpark",
    genre: "Program",
    intro: "Şehir parkındaki yaz festivalinin programını incele — saatler ve yerler önemli.",
    gloss: [
      { de: "die Eröffnung", tr: "açılış" },
      { de: "der Bürgermeister", tr: "belediye başkanı" },
      { de: "die Bühne", tr: "sahne" },
      { de: "das Turnier", tr: "turnuva" },
      { de: "die Anmeldung", tr: "kayıt" },
      { de: "das Feuerwerk", tr: "havai fişek" },
      { de: "ausfallen", tr: "iptal olmak" },
      { de: "der Stand", tr: "stant" },
    ],
    minutes: 4,
    text:
      "Sommerfest im Stadtpark — Programm für Samstag\n\n" +
      "11 Uhr: Eröffnung mit dem Bürgermeister auf der Hauptbühne.\n\n" +
      "12 bis 15 Uhr: Kinderprogramm mit Spielen und Schminken auf der Wiese am See. Die Teilnahme ist kostenlos.\n\n" +
      "15 Uhr: Fußballturnier der Stadtteile am Sportplatz. Anmeldung bis 14 Uhr am Infostand.\n\n" +
      "17 Uhr: Konzert der Band „Nachtzug“ auf der Hauptbühne. Karten kosten 8 Euro, Kinder unter 12 Jahren sind frei.\n\n" +
      "22 Uhr: Feuerwerk über dem See.\n\n" +
      "Essen und Getränke gibt es an über 20 Ständen. Bitte kommen Sie mit Bus oder Fahrrad, denn es gibt nur wenige Parkplätze. Bei Regen fällt das Feuerwerk aus.",
    questions: [
      {
        text: "Wo ist das Kinderprogramm?",
        options: ["Auf der Hauptbühne", "Auf der Wiese am See", "Am Sportplatz"],
        answer: 1,
        explain: "Programda çocuk etkinliği „auf der Wiese am See“ olarak veriliyor. Ana sahne açılış ve konser, spor sahası ise turnuva için.",
      },
      {
        text: "Was kostet das Konzert für Erwachsene?",
        options: ["8 Euro", "12 Euro", "Es ist kostenlos."],
        answer: 0,
        explain: "„Karten kosten 8 Euro“ — 12 sayısı fiyat değil, ücretsiz giren çocukların yaş sınırı.",
      },
      {
        text: "Bei Regen gibt es kein Feuerwerk.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: son cümlede „Bei Regen fällt das Feuerwerk aus“ deniyor, yani yağmurda iptal.",
      },
      {
        text: "Wie soll man zum Fest kommen?",
        options: ["Mit dem Auto", "Mit dem Zug", "Mit Bus oder Fahrrad"],
        answer: 2,
        explain: "„Bitte kommen Sie mit Bus oder Fahrrad“ — çünkü park yeri az. Araba bu yüzden yanlış.",
      },
    ],
  },
  {
    id: "a2-r5",
    level: "A2",
    skill: "reading",
    title: "Mein erster Monat in der neuen Arbeit",
    genre: "Blog",
    intro: "Bir blog yazarı yeni işindeki ilk ayını anlatıyor — nelerin değiştiğine dikkat et.",
    gloss: [
      { de: "die Buchhandlung", tr: "kitapçı" },
      { de: "die Verkäuferin", tr: "satış elemanı (kadın)" },
      { de: "langweilig", tr: "sıkıcı" },
      { de: "der Kontakt", tr: "iletişim, temas" },
      { de: "müde", tr: "yorgun" },
      { de: "der Kollege", tr: "iş arkadaşı" },
      { de: "frei haben", tr: "izinli olmak" },
      { de: "dafür", tr: "buna karşılık" },
    ],
    minutes: 3,
    text:
      "Seit vier Wochen arbeite ich als Verkäuferin in einer Buchhandlung in Köln. Früher habe ich in einem Büro gearbeitet, aber die Arbeit dort war mir zu langweilig. Jetzt habe ich jeden Tag Kontakt mit Menschen, und das gefällt mir viel besser.\n\n" +
      "Mein Arbeitstag beginnt um 9 Uhr und endet um 18 Uhr. Am Anfang war ich abends sehr müde, weil ich den ganzen Tag stehen muss. Aber meine Kollegen sind nett und helfen mir, wenn ich Fragen habe.\n\n" +
      "Nur eine Sache finde ich schwierig: Ich muss auch am Samstag arbeiten. Dafür habe ich montags frei.",
    questions: [
      {
        text: "Wo arbeitet die Bloggerin jetzt?",
        options: ["In einem Büro", "In einer Buchhandlung", "In einer Bibliothek"],
        answer: 1,
        explain: "İlk cümle: „arbeite ich als Verkäuferin in einer Buchhandlung“. Büro eski işi — çeldirici oradan geliyor.",
      },
      {
        text: "Warum hat sie die alte Arbeit nicht gemocht?",
        options: ["Sie war zu langweilig.", "Die Kollegen waren nicht nett.", "Sie musste am Samstag arbeiten."],
        answer: 0,
        explain: "„die Arbeit dort war mir zu langweilig“ — sıkıcı bulmuş. Cumartesi çalışması ise yeni işinin dezavantajı.",
      },
      {
        text: "Am Anfang war sie abends oft müde.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „Am Anfang war ich abends sehr müde, weil ich den ganzen Tag stehen muss.“",
      },
      {
        text: "An welchem Tag hat sie frei?",
        options: ["Am Samstag", "Am Sonntag", "Am Montag"],
        answer: 2,
        explain: "Son cümle: „Dafür habe ich montags frei.“ Cumartesi tam tersine çalıştığı gün.",
      },
    ],
  },
  {
    id: "a2-r6",
    level: "A2",
    skill: "reading",
    title: "Einladung zum Grillfest",
    genre: "Davetiye",
    intro: "Komşun Frau Schmidt apartmana bir davetiye asmış — kim, neyi, ne zaman kutluyor?",
    gloss: [
      { de: "einladen", tr: "davet etmek" },
      { de: "das Grillfest", tr: "mangal partisi" },
      { de: "der Hof", tr: "avlu" },
      { de: "sorgen für", tr: "-i üstlenmek, sağlamak" },
      { de: "der Nachtisch", tr: "tatlı" },
      { de: "der Enkel", tr: "erkek torun" },
      { de: "Bescheid sagen", tr: "haber vermek" },
      { de: "erreichen", tr: "ulaşmak" },
    ],
    minutes: 3,
    text:
      "Liebe Nachbarinnen und Nachbarn,\n\n" +
      "am Samstag, den 14. Juni, werde ich 60 Jahre alt. Das möchte ich gern mit Ihnen feiern! Ich lade Sie herzlich zu einem Grillfest in unserem Hof ein. Wir beginnen um 16 Uhr, das Ende ist offen.\n\n" +
      "Für Fleisch, Würstchen und Getränke sorge ich. Es wäre schön, wenn Sie einen Salat oder einen Nachtisch mitbringen. Wer ein Instrument spielt, kann es gern mitbringen — mein Enkel spielt Gitarre.\n\n" +
      "Bitte sagen Sie mir bis zum 10. Juni Bescheid, ob Sie kommen. Sie erreichen mich unter der Nummer 0176 4532218 oder einfach an der Wohnungstür Nummer 12.\n\n" +
      "Herzliche Grüße\nHannelore Schmidt",
    questions: [
      {
        text: "Warum feiert Frau Schmidt?",
        options: ["Sie hat eine neue Wohnung.", "Sie wird 60 Jahre alt.", "Ihr Enkel hat Geburtstag."],
        answer: 1,
        explain: "„am Samstag, den 14. Juni, werde ich 60 Jahre alt“ — 60. yaş gününü kutluyor. Torun sadece gitar çalacak kişi.",
      },
      {
        text: "Was sollen die Gäste mitbringen?",
        options: ["Fleisch und Getränke", "Einen Salat oder einen Nachtisch", "Nichts"],
        answer: 1,
        explain: "Et ve içecekleri Frau Schmidt üstleniyor („sorge ich“); misafirlerden salata veya tatlı rica ediyor.",
      },
      {
        text: "Das Fest endet um 22 Uhr.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „das Ende ist offen“ — bitiş saati belli değil, sadece başlangıç 16 Uhr.",
      },
      {
        text: "Bis wann soll man Bescheid sagen?",
        options: ["Bis zum 10. Juni", "Bis zum 12. Juni", "Bis zum 14. Juni"],
        answer: 0,
        explain: "„Bitte sagen Sie mir bis zum 10. Juni Bescheid.“ 14 Haziran partinin tarihi, 12 ise kapı numarası.",
      },
    ],
  },

  // -------------------------------------------------------------- DİNLEME
  // ── Hikâye dizisi: Pelin iş arıyor. A2'nin yeni alıştırmalarında
  //    ilan → başvuru → görüşme → sözleşme → ilk gün sırası takip edilir.
  {
    id: "a2-r7",
    level: "A2",
    skill: "reading",
    title: "Pelin hat eine Anzeige gefunden",
    genre: "Mesaj",
    intro:
      "Pelin bir iş ilanı buldu ve arkadaşına yazıyor. Bu, A2'de takip edeceğin hikâyenin başlangıcı.",
    gloss: [
      { de: "die Stelle", tr: "iş, pozisyon" },
      { de: "sich bewerben", tr: "başvurmak" },
      { de: "der Lebenslauf", tr: "özgeçmiş" },
      { de: "die Erfahrung", tr: "deneyim" },
      { de: "die Teilzeit", tr: "yarı zamanlı" },
      { de: "sich trauen", tr: "cesaret etmek" },
      { de: "vielleicht", tr: "belki" },
    ],
    minutes: 3,
    text:
      "Hey Ceyda,\n\nich habe endlich eine Stelle gefunden, die wirklich passt! Eine Apotheke in der Nähe sucht jemanden für den Empfang — Teilzeit, 25 Stunden, Montag bis Donnerstag.\n\nDas Problem: Sie wollen Erfahrung. Ich habe nur ein Praktikum gemacht, und das war vor drei Jahren. Traue ich mich überhaupt?\n\nMein Deutsch ist okay, aber am Telefon werde ich immer nervös. Und im Lebenslauf sieht meine Zeit ohne Arbeit ziemlich lang aus.\n\nAber weißt du was — ich schreibe trotzdem. Schlimmstenfalls sagen sie Nein, und dann weiß ich es wenigstens.\n\nDrück mir die Daumen!\nPelin",
    questions: [
      {
        text: "Was für eine Stelle ist es?",
        options: [
          "Empfang in einer Apotheke, Teilzeit",
          "Vollzeit in einem Büro",
          "Praktikum in einer Schule",
        ],
        answer: 0,
        explain: "„Eine Apotheke … sucht jemanden für den Empfang — Teilzeit, 25 Stunden.“",
      },
      {
        text: "Was ist Pelins größte Sorge?",
        options: [
          "Sie hat wenig Erfahrung",
          "Die Stelle ist zu weit weg",
          "Sie verdient zu wenig",
        ],
        answer: 0,
        explain: "„Sie wollen Erfahrung. Ich habe nur ein Praktikum gemacht.“",
      },
      {
        text: "Was sagt sie über ihr Deutsch?",
        options: [
          "Es ist okay, aber am Telefon wird sie nervös",
          "Es ist perfekt",
          "Sie kann fast nichts sagen",
        ],
        answer: 0,
        explain: "„Mein Deutsch ist okay, aber am Telefon werde ich immer nervös.“",
      },
      {
        text: "Was macht sie am Ende?",
        options: [
          "Sie bewirbt sich trotzdem",
          "Sie sucht eine andere Stelle",
          "Sie wartet noch",
        ],
        answer: 0,
        explain: "„Aber weißt du was — ich schreibe trotzdem.“",
      },
    ],
  },
  {
    id: "a2-r8",
    level: "A2",
    skill: "reading",
    title: "Post von der Krankenkasse",
    genre: "Resmî yazı",
    intro:
      "Almanya'da herkesin posta kutusuna düşen yazılardan biri. Sigorta şirketinden gelen mektubu okuyacaksın.",
    gloss: [
      { de: "die Krankenkasse", tr: "sağlık sigortası kurumu" },
      { de: "der Beitrag", tr: "prim, aidat" },
      { de: "der Nachweis", tr: "belge, kanıt" },
      { de: "die Frist", tr: "süre, son tarih" },
      { de: "einreichen", tr: "teslim etmek" },
      { de: "der Zuschuss", tr: "katkı payı" },
      { de: "die Brille", tr: "gözlük" },
    ],
    minutes: 4,
    text:
      "Sehr geehrte Frau Aydın,\n\nvielen Dank für Ihre Nachricht vom 3. März.\n\n1. Ihr Beitrag: Ab dem 1. April zahlen Sie 178,40 Euro im Monat. Der Betrag wird automatisch von Ihrem Konto abgebucht. Sie müssen nichts tun.\n\n2. Ihre Frage zur Brille: Wir zahlen einen Zuschuss von 120 Euro, aber nur alle zwei Jahre und nur mit einem Rezept vom Augenarzt. Bitte reichen Sie die Rechnung und das Rezept zusammen ein.\n\n3. Wichtig: Die Frist für den Antrag ist der 30. Juni. Nach diesem Datum können wir den Zuschuss leider nicht mehr zahlen.\n\nSie können alle Dokumente auch in unserer App hochladen — das geht schneller als per Post.\n\nMit freundlichen Grüßen\nA. Roth, Kundenservice",
    questions: [
      {
        text: "Was muss Frau Aydın für den neuen Beitrag tun?",
        options: ["Nichts", "Das Geld überweisen", "Ein Formular schicken"],
        answer: 0,
        explain: "„Der Betrag wird automatisch … abgebucht. Sie müssen nichts tun.“",
      },
      {
        text: "Wie viel zahlt die Kasse für eine Brille?",
        options: ["120 Euro", "178,40 Euro", "Alles"],
        answer: 0,
        explain: "„einen Zuschuss von 120 Euro“ — 178,40 aylık primi.",
      },
      {
        text: "Was braucht sie für den Zuschuss?",
        options: [
          "Rechnung und Rezept vom Augenarzt",
          "Nur die Rechnung",
          "Ein Foto der Brille",
        ],
        answer: 0,
        explain: "„Bitte reichen Sie die Rechnung und das Rezept zusammen ein.“",
      },
      {
        text: "Was passiert nach dem 30. Juni?",
        options: [
          "Es gibt keinen Zuschuss mehr",
          "Der Zuschuss wird kleiner",
          "Man muss zum Arzt",
        ],
        answer: 0,
        explain: "„Nach diesem Datum können wir den Zuschuss leider nicht mehr zahlen.“",
      },
      {
        text: "Was empfiehlt die Kasse?",
        options: [
          "Dokumente in der App hochladen",
          "Alles per Post schicken",
          "Persönlich vorbeikommen",
        ],
        answer: 0,
        explain: "„das geht schneller als per Post.“",
      },
    ],
  },
  {
    id: "a2-r9",
    level: "A2",
    skill: "reading",
    title: "Warum sind alle im Verein?",
    genre: "Kültür",
    intro:
      "Almanya'da 600.000'den fazla dernek var. Bu kısa yazı, neden herkesin bir derneğe üye olduğunu anlatıyor.",
    gloss: [
      { de: "der Verein", tr: "dernek, kulüp" },
      { de: "das Mitglied", tr: "üye" },
      { de: "der Beitrag", tr: "aidat" },
      { de: "ehrenamtlich", tr: "gönüllü (ücretsiz)" },
      { de: "die Feuerwehr", tr: "itfaiye" },
      { de: "gemeinsam", tr: "birlikte" },
      { de: "das Grillfest", tr: "mangal partisi" },
    ],
    minutes: 4,
    text:
      "In Deutschland gibt es mehr als 600.000 Vereine. Fast jeder zweite Mensch ist Mitglied in einem — oft ohne viel darüber nachzudenken.\n\nEs gibt Sportvereine, Musikvereine, Gartenvereine, Katzenvereine. Es gibt sogar einen Verein für Menschen, die alte Traktoren reparieren.\n\nWarum? Ein Verein ist billig: Der Beitrag liegt oft bei 5 bis 15 Euro im Monat. Dafür bekommt man einen Platz, Trainer, Material — und Leute.\n\nWichtiger ist aber etwas anderes: Vereine funktionieren ehrenamtlich. Niemand verdient Geld. Der Trainer ist Busfahrer, die Kassenwartin arbeitet in der Apotheke. Auch die freiwillige Feuerwehr in kleinen Städten ist ein Verein — ohne sie gäbe es dort keine Feuerwehr.\n\nFür neue Menschen im Land ist der Verein oft der schnellste Weg zu Kontakten. Man muss nicht gut Deutsch sprechen, um zusammen Fußball zu spielen. Und nach dem Training gibt es fast immer ein Grillfest, bei dem geredet wird.",
    questions: [
      {
        text: "Wie viele Menschen sind Mitglied in einem Verein?",
        options: ["Fast jeder zweite", "Fast jeder zehnte", "Fast alle"],
        answer: 0,
        explain: "„Fast jeder zweite Mensch ist Mitglied in einem.“",
      },
      {
        text: "Was kostet ein Verein oft im Monat?",
        options: ["5 bis 15 Euro", "50 Euro", "Nichts"],
        answer: 0,
        explain: "„Der Beitrag liegt oft bei 5 bis 15 Euro im Monat.“",
      },
      {
        text: "Was bedeutet „ehrenamtlich“ hier?",
        options: [
          "Die Menschen arbeiten ohne Geld",
          "Der Verein bekommt Geld vom Staat",
          "Man muss Mitglied sein",
        ],
        answer: 0,
        explain: "„Niemand verdient Geld. Der Trainer ist Busfahrer …“",
      },
      {
        text: "Warum ist der Verein gut für neue Menschen im Land?",
        options: [
          "Man findet Kontakte, auch ohne perfektes Deutsch",
          "Man lernt dort Grammatik",
          "Man bekommt eine Wohnung",
        ],
        answer: 0,
        explain: "„Man muss nicht gut Deutsch sprechen, um zusammen Fußball zu spielen.“",
      },
    ],
  },
  {
    id: "a2-r10",
    level: "A2",
    skill: "reading",
    title: "Fünf Anzeigen — was passt?",
    genre: "Sınav formatı",
    intro:
      "Goethe A2 okuma bölümünün eşleştirme görevi: kısa ilanlar ve kimin neye ihtiyacı olduğu. Önce hepsini oku.",
    gloss: [
      { de: "die Nachhilfe", tr: "özel ders" },
      { de: "die Reparatur", tr: "tamir" },
      { de: "der Umzug", tr: "taşınma" },
      { de: "der Fahrer", tr: "sürücü" },
      { de: "die Anfrage", tr: "talep, soru" },
      { de: "flexibel", tr: "esnek" },
      { de: "kostenlos", tr: "ücretsiz" },
    ],
    minutes: 4,
    text:
      "A) UMZUGSHILFE — 2 starke Studenten, Samstag und Sonntag frei. Mit Transporter. 25 €/Stunde. Tel. 0177 45 45 45\n\nB) NACHHILFE MATHE — Klasse 5–10, auch online. Erste Stunde kostenlos. Frau Öztürk, 0160 12 34 56\n\nC) FAHRRADREPARATUR im Hof — jeden Mittwoch 16–19 Uhr. Kleine Reparaturen gratis, Sie zahlen nur Material. Nachbarschaftsinitiative Lindenstraße\n\nD) SUCHE FAHRER für Lieferungen, Führerschein B nötig. Abends 17–21 Uhr, flexibel. Pizzeria Bella, bitte persönlich vorbeikommen\n\nE) DEUTSCH SPRECHEN im Café — jeden Donnerstag 18 Uhr, Café Klara. Kein Kurs, nur reden. Kostenlos, ohne Anmeldung.",
    questions: [
      {
        text: "Hasans Sohn hat schlechte Noten in Mathematik. Welche Anzeige passt?",
        options: ["B", "E", "C"],
        answer: 0,
        explain: "B ilanı 5–10. sınıf matematik özel dersi veriyor, ilk ders ücretsiz.",
      },
      {
        text: "Maria zieht am Wochenende um und hat kein Auto. Welche Anzeige passt?",
        options: ["A", "D", "C"],
        answer: 0,
        explain: "A ilanı hafta sonu müsait, kamyonet dahil.",
      },
      {
        text: "Amir möchte Deutsch üben, hat aber kein Geld für einen Kurs. Wohin geht er?",
        options: ["Ins Café Klara am Donnerstag", "Zu Frau Öztürk", "In den Hof am Mittwoch"],
        answer: 0,
        explain: "E: „Kein Kurs, nur reden. Kostenlos, ohne Anmeldung.“",
      },
      {
        text: "Deniz sucht Arbeit für den Abend und hat einen Führerschein. Was macht er?",
        options: [
          "Er geht persönlich zur Pizzeria",
          "Er ruft 0177 45 45 45 an",
          "Er kommt am Mittwoch in den Hof",
        ],
        answer: 0,
        explain: "D ilanında „bitte persönlich vorbeikommen“ yazıyor — telefon numarası yok.",
      },
      {
        text: "Bei Anzeige C: Was muss man bezahlen?",
        options: ["Nur das Material", "Nichts", "25 Euro pro Stunde"],
        answer: 0,
        explain: "„Kleine Reparaturen gratis, Sie zahlen nur Material.“",
      },
    ],
  },
  {
    id: "a2-r11",
    level: "A2",
    skill: "reading",
    title: "Pelins Arbeitsvertrag",
    genre: "Sözleşme",
    intro:
      "Hikâyenin devamı: Pelin işi aldı. İlk iş sözleşmesinin önemli maddelerini okuyacaksın.",
    gloss: [
      { de: "der Arbeitsvertrag", tr: "iş sözleşmesi" },
      { de: "die Probezeit", tr: "deneme süresi" },
      { de: "das Gehalt", tr: "maaş" },
      { de: "brutto", tr: "brüt" },
      { de: "der Urlaub", tr: "izin" },
      { de: "kündigen", tr: "fesh etmek, işten ayrılmak" },
      { de: "die Überstunde", tr: "fazla mesai" },
      { de: "der Feiertag", tr: "resmî tatil" },
    ],
    minutes: 5,
    text:
      "ARBEITSVERTRAG (Auszug)\n\nzwischen Apotheke am Markt und Frau Pelin Aydın\n\n§1 Beginn: 1. September. Die Probezeit dauert sechs Monate.\n\n§2 Arbeitszeit: 25 Stunden pro Woche, Montag bis Donnerstag, 8:30–15:00 Uhr.\n\n§3 Gehalt: 2.150 Euro brutto pro Monat. Das Gehalt kommt am letzten Werktag des Monats.\n\n§4 Urlaub: 24 Tage im Jahr. Der Urlaub muss vier Wochen vorher angemeldet werden.\n\n§5 Überstunden: Überstunden werden mit Freizeit ausgeglichen, nicht bezahlt.\n\n§6 Krankheit: Bitte melden Sie sich am ersten Tag vor 8 Uhr. Ab dem dritten Tag brauchen wir eine Krankmeldung vom Arzt.\n\n§7 Kündigung: In der Probezeit zwei Wochen, danach drei Monate zum Monatsende.",
    questions: [
      {
        text: "Wie lange dauert die Probezeit?",
        options: ["Sechs Monate", "Drei Monate", "Zwei Wochen"],
        answer: 0,
        explain: "„Die Probezeit dauert sechs Monate.“ İki hafta deneme süresindeki ihbar süresi.",
      },
      {
        text: "Wann bekommt Pelin ihr Geld?",
        options: [
          "Am letzten Werktag des Monats",
          "Am ersten Tag des Monats",
          "Jede Woche",
        ],
        answer: 0,
        explain: "„Das Gehalt kommt am letzten Werktag des Monats.“",
      },
      {
        text: "Was passiert mit Überstunden?",
        options: [
          "Sie werden mit Freizeit ausgeglichen",
          "Sie werden extra bezahlt",
          "Sie sind verboten",
        ],
        answer: 0,
        explain: "„Überstunden werden mit Freizeit ausgeglichen, nicht bezahlt.“",
      },
      {
        text: "Pelin ist am Montag krank. Was muss sie tun?",
        options: [
          "Vor 8 Uhr Bescheid sagen",
          "Sofort zum Arzt gehen",
          "Eine Krankmeldung schicken",
        ],
        answer: 0,
        explain:
          "İlk gün 8'den önce haber vermek yeterli; doktor raporu üçüncü günden itibaren gerekiyor.",
      },
      {
        text: "Wie viele Urlaubstage hat sie?",
        options: ["24", "30", "12"],
        answer: 0,
        explain: "„Urlaub: 24 Tage im Jahr“ — dört hafta önceden bildirmek şartıyla.",
      },
    ],
  },
  {
    id: "a2-r12",
    level: "A2",
    skill: "reading",
    title: "Ihre Verbindung",
    genre: "Seyahat bilgisi",
    intro:
      "Deutsche Bahn'ın verdiği yolculuk planını okuyacaksın — aktarmalı bir seyahat.",
    gloss: [
      { de: "die Verbindung", tr: "bağlantı, sefer" },
      { de: "umsteigen", tr: "aktarma yapmak" },
      { de: "die Ankunft", tr: "varış" },
      { de: "die Abfahrt", tr: "kalkış" },
      { de: "der Wagen", tr: "vagon" },
      { de: "reservieren", tr: "yer ayırtmak" },
      { de: "die Ermäßigung", tr: "indirim" },
    ],
    minutes: 4,
    text:
      "IHRE VERBINDUNG — Freitag, 12. Juli\n\nBremen Hbf ab 07:14 · ICE 645 · Gleis 3\nHannover Hbf an 08:22\n\nUmsteigen: 11 Minuten\n\nHannover Hbf ab 08:33 · ICE 692 · Gleis 8\nMünchen Hbf an 12:47\n\nSitzplatz reserviert: Wagen 24, Platz 61 (Fenster, Großraum)\n\nPreis: 68,90 € (mit BahnCard 25)\n\nHinweis: Bei einer Verspätung von mehr als 20 Minuten am Ziel können Sie Geld zurückverlangen. Ihre Fahrkarte gilt dann auch in einem späteren Zug.\n\nFahrräder: nur mit extra Karte, im ICE nicht möglich.",
    questions: [
      {
        text: "Wie lange dauert die ganze Fahrt?",
        options: [
          "Etwa fünfeinhalb Stunden",
          "Etwa vier Stunden",
          "Etwa acht Stunden",
        ],
        answer: 0,
        explain: "07:14'ten 12:47'ye — yaklaşık 5,5 saat.",
      },
      {
        text: "Wie viel Zeit hat man in Hannover?",
        options: ["11 Minuten", "22 Minuten", "33 Minuten"],
        answer: 0,
        explain: "„Umsteigen: 11 Minuten“ (08:22 varış, 08:33 kalkış).",
      },
      {
        text: "Wo sitzt der Reisende?",
        options: [
          "Wagen 24, Platz 61, am Fenster",
          "Wagen 61, Platz 24",
          "Ohne Reservierung",
        ],
        answer: 0,
        explain: "„Wagen 24, Platz 61 (Fenster, Großraum)“.",
      },
      {
        text: "Was gilt bei mehr als 20 Minuten Verspätung?",
        options: [
          "Man kann Geld zurückverlangen",
          "Man bekommt einen neuen Sitzplatz",
          "Die Fahrt ist kostenlos",
        ],
        answer: 0,
        explain:
          "20 dakikadan fazla gecikmede para iadesi talep edilebilir; bilet sonraki trende de geçerli olur.",
      },
      {
        text: "Kann man ein Fahrrad mitnehmen?",
        options: ["Nein, im ICE nicht", "Ja, kostenlos", "Ja, mit Reservierung"],
        answer: 0,
        explain: "„Fahrräder: nur mit extra Karte, im ICE nicht möglich.“",
      },
    ],
  },

  {
    id: "a2-l1",
    level: "A2",
    skill: "listening",
    title: "Ein Termin beim Arzt",
    genre: "Diyalog",
    intro: "Frau Kaya doktor muayenehanesini arıyor — randevunun gününe ve saatine kulak ver.",
    gloss: [
      { de: "die Halsschmerzen", tr: "boğaz ağrısı" },
      { de: "das Fieber", tr: "ateş" },
      { de: "der Termin", tr: "randevu" },
      { de: "die Sprechstundenhilfe", tr: "muayenehane asistanı" },
      { de: "die Versichertenkarte", tr: "sağlık sigortası kartı" },
      { de: "passen", tr: "uymak, uygun olmak" },
      { de: "voll", tr: "dolu" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Frau Kaya", text: "Guten Morgen, Praxis Doktor Lehmann? Mein Name ist Kaya. Ich habe seit zwei Tagen starke Halsschmerzen und Fieber. Kann ich heute noch einen Termin bekommen?" },
      { speaker: "Sprechstundenhilfe", text: "Guten Morgen, Frau Kaya. Heute ist es leider sehr voll. Ich kann Ihnen aber morgen früh um 8 Uhr 30 einen Termin geben." },
      { speaker: "Frau Kaya", text: "Hmm, morgen früh muss ich arbeiten. Geht es auch am Nachmittag?" },
      { speaker: "Sprechstundenhilfe", text: "Einen Moment bitte. Ja, morgen um 15 Uhr 15 ist noch etwas frei." },
      { speaker: "Frau Kaya", text: "Das passt gut. Muss ich etwas mitbringen?" },
      { speaker: "Sprechstundenhilfe", text: "Bitte bringen Sie Ihre Versichertenkarte mit. Und wenn das Fieber heute noch höher wird, rufen Sie bitte sofort wieder an." },
      { speaker: "Frau Kaya", text: "Das mache ich. Vielen Dank, auf Wiederhören!" },
    ],
    questions: [
      {
        text: "Warum ruft Frau Kaya an?",
        options: ["Sie hat Halsschmerzen und Fieber.", "Sie braucht ein Rezept.", "Sie will einen Termin absagen."],
        answer: 0,
        explain: "İlk cümlesinde söylüyor: „Ich habe seit zwei Tagen starke Halsschmerzen und Fieber.“",
      },
      {
        text: "Wann ist der Termin?",
        options: ["Heute um 15 Uhr 15", "Morgen um 8 Uhr 30", "Morgen um 15 Uhr 15"],
        answer: 2,
        explain: "Sabah 8.30 teklif edildi ama Frau Kaya çalıştığı için olmadı; anlaşılan randevu „morgen um 15 Uhr 15“.",
      },
      {
        text: "Warum passt der Termin am Morgen nicht?",
        options: ["Sie muss arbeiten.", "Sie ist nicht in der Stadt.", "Die Praxis ist dann geschlossen."],
        answer: 0,
        explain: "„Morgen früh muss ich arbeiten“ diyor — bu yüzden öğleden sonrayı istiyor.",
      },
      {
        text: "Frau Kaya soll ihre Versichertenkarte mitbringen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: asistan „Bitte bringen Sie Ihre Versichertenkarte mit“ diyor.",
      },
    ],
  },
  {
    id: "a2-l2",
    level: "A2",
    skill: "listening",
    title: "Nachricht auf dem Anrufbeantworter",
    genre: "Telesekreter",
    intro: "Jonas, arkadaşı Deniz'in telesekreterine mesaj bırakıyor — ondan ne istiyor?",
    gloss: [
      { de: "umziehen", tr: "taşınmak" },
      { de: "der Umzug", tr: "taşınma" },
      { de: "absagen", tr: "iptal etmek, vazgeçmek" },
      { de: "der Transporter", tr: "nakliye aracı" },
      { de: "der Schrank", tr: "dolap" },
      { de: "die Einweihungsparty", tr: "yeni ev partisi" },
      { de: "zurückrufen", tr: "geri aramak" },
    ],
    minutes: 2,
    segments: [
      { text: "Hallo Deniz, hier ist Jonas. Du weißt ja, ich ziehe am Samstag in meine neue Wohnung in der Gartenstraße um. Leider hat mein Bruder jetzt abgesagt, weil er krank ist. Kannst du mir vielleicht beim Umzug helfen?" },
      { text: "Wir wollen um 9 Uhr anfangen, der Transporter kommt schon um halb 9. Es gibt nicht so viele Möbel, nur das Sofa und der Schrank sind schwer." },
      { text: "Als Dankeschön bestelle ich für alle Pizza, und am Abend machen wir eine kleine Einweihungsparty. Ruf mich bitte bis Donnerstag zurück, meine Nummer hast du ja. Danke dir, tschüss!" },
    ],
    questions: [
      {
        text: "Warum ruft Jonas an?",
        options: ["Er braucht Hilfe beim Umzug.", "Er will Deniz zum Essen einladen.", "Er ist krank."],
        answer: 0,
        explain: "Asıl sorusu: „Kannst du mir vielleicht beim Umzug helfen?“ Hasta olan Jonas değil, kardeşi; pizza ise sadece teşekkür.",
      },
      {
        text: "Warum kann der Bruder nicht helfen?",
        options: ["Er muss arbeiten.", "Er ist krank.", "Er ist im Urlaub."],
        answer: 1,
        explain: "„Leider hat mein Bruder jetzt abgesagt, weil er krank ist.“",
      },
      {
        text: "Um wie viel Uhr wollen sie mit dem Umzug anfangen?",
        options: ["Um halb 9", "Um 9 Uhr", "Um 10 Uhr"],
        answer: 1,
        explain: "„Wir wollen um 9 Uhr anfangen“ — halb 9 ise nakliye aracının geliş saati.",
      },
      {
        text: "Deniz soll bis Donnerstag zurückrufen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: mesajın sonunda „Ruf mich bitte bis Donnerstag zurück“ deniyor.",
      },
    ],
  },
  {
    id: "a2-l3",
    level: "A2",
    skill: "listening",
    title: "Familientag im Technikmuseum",
    genre: "Radyo duyurusu",
    intro: "Radyoda hafta sonu için bir etkinlik önerisi var — fiyatlara ve ulaşım bilgisine dikkat.",
    gloss: [
      { de: "stattfinden", tr: "gerçekleşmek, yapılmak" },
      { de: "die Führung", tr: "rehberli tur" },
      { de: "der Eintritt", tr: "giriş ücreti" },
      { de: "das Parkhaus", tr: "katlı otopark" },
      { de: "zurzeit", tr: "şu anda" },
      { de: "die Straßenbahn", tr: "tramvay" },
      { de: "halten", tr: "durmak (araç)" },
    ],
    minutes: 2,
    segments: [
      { text: "Und hier noch ein Tipp für das Wochenende: Am Sonntag findet im Museum für Technik der große Familientag statt. Von 10 bis 17 Uhr können Kinder und Erwachsene alte Autos, Flugzeuge und Roboter ansehen." },
      { text: "Um 11 Uhr und um 14 Uhr gibt es eine Führung für Kinder ab 6 Jahren. Der Eintritt kostet für Erwachsene 7 Euro, Kinder zahlen an diesem Tag nichts." },
      { text: "Achtung: Das Parkhaus am Museum ist zurzeit geschlossen. Kommen Sie deshalb am besten mit der Straßenbahn, die Linien 3 und 7 halten direkt vor dem Museum. Alle Informationen finden Sie auch im Internet." },
    ],
    questions: [
      {
        text: "Wann ist der Familientag?",
        options: ["Am Samstag", "Am Sonntag", "Am Freitag"],
        answer: 1,
        explain: "Duyurunun başında: „Am Sonntag findet im Museum für Technik der große Familientag statt.“",
      },
      {
        text: "Was zahlen Kinder an diesem Tag?",
        options: ["7 Euro", "3 Euro", "Nichts"],
        answer: 2,
        explain: "„Kinder zahlen an diesem Tag nichts“ — 7 Euro yetişkin ücreti, 3 ise tramvay hattının numarası.",
      },
      {
        text: "Um wie viel Uhr gibt es Führungen für Kinder?",
        options: ["Um 10 und um 17 Uhr", "Um 11 und um 14 Uhr", "Nur um 14 Uhr"],
        answer: 1,
        explain: "„Um 11 Uhr und um 14 Uhr gibt es eine Führung“ — 10 ve 17 ise müzenin açılış-kapanış saatleri.",
      },
      {
        text: "Man soll am besten mit dem Auto zum Museum kommen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: otopark kapalı olduğu için tramvay öneriliyor („Kommen Sie deshalb am besten mit der Straßenbahn“).",
      },
    ],
  },
  {
    id: "a2-l4",
    level: "A2",
    skill: "listening",
    title: "Jeden Morgen im Park",
    genre: "Röportaj",
    intro: "Bir muhabir, her sabah koşan Herr Öztürk ile konuşuyor — bu alışkanlık nasıl başlamış?",
    gloss: [
      { de: "laufen", tr: "koşmak" },
      { de: "ungefähr", tr: "yaklaşık" },
      { de: "schneien", tr: "kar yağmak" },
      { de: "das Gewitter", tr: "fırtına, gök gürültülü sağanak" },
      { de: "das Ziel", tr: "hedef" },
      { de: "mitmachen", tr: "katılmak" },
      { de: "der Stadtlauf", tr: "şehir koşusu" },
      { de: "schneller als", tr: "-den daha hızlı" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Reporterin", text: "Herr Öztürk, Sie laufen jeden Morgen hier im Park. Seit wann machen Sie das?" },
      { speaker: "Herr Öztürk", text: "Seit ungefähr drei Jahren. Mein Arzt hat gesagt, dass ich mehr Sport machen soll. Am Anfang bin ich nur zehn Minuten gelaufen, heute laufe ich jeden Morgen eine halbe Stunde." },
      { speaker: "Reporterin", text: "Laufen Sie auch im Winter?" },
      { speaker: "Herr Öztürk", text: "Ja, natürlich. Wenn es schneit, laufe ich langsamer, aber ich bleibe nicht zu Hause. Nur bei Gewitter mache ich Pause." },
      { speaker: "Reporterin", text: "Und was ist Ihr nächstes Ziel?" },
      { speaker: "Herr Öztürk", text: "Im Oktober möchte ich beim Stadtlauf mitmachen, das sind zehn Kilometer. Mein Sohn läuft auch mit, er ist schneller als ich." },
    ],
    questions: [
      {
        text: "Warum hat Herr Öztürk mit dem Laufen angefangen?",
        options: ["Sein Arzt hat es gesagt.", "Sein Sohn wollte es.", "Er wollte beim Stadtlauf mitmachen."],
        answer: 0,
        explain: "„Mein Arzt hat gesagt, dass ich mehr Sport machen soll.“ Stadtlauf ise gelecekteki hedefi, başlama nedeni değil.",
      },
      {
        text: "Wie lange läuft er heute jeden Morgen?",
        options: ["Zehn Minuten", "Eine halbe Stunde", "Eine Stunde"],
        answer: 1,
        explain: "„heute laufe ich jeden Morgen eine halbe Stunde“ — on dakika sadece başlangıçtaki süresiydi.",
      },
      {
        text: "Wann macht er eine Pause?",
        options: ["Wenn es schneit", "Im Winter", "Bei Gewitter"],
        answer: 2,
        explain: "„Nur bei Gewitter mache ich Pause“ — kar yağınca sadece yavaşlıyor, evde kalmıyor.",
      },
      {
        text: "Sein Sohn läuft schneller als er.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: son cümlede „er ist schneller als ich“ diyor.",
      },
    ],
  },
  {
    id: "a2-l5",
    level: "A2",
    skill: "listening",
    title: "Probleme mit dem neuen Handy",
    genre: "Diyalog",
    intro: "Bir müşteri yeni aldığı telefonu şikayet için mağazaya getiriyor — çözüm ne olacak?",
    gloss: [
      { de: "der Akku", tr: "batarya" },
      { de: "leer", tr: "boş, bitmiş" },
      { de: "das Gerät", tr: "cihaz" },
      { de: "die Rechnung", tr: "fatura, fiş" },
      { de: "die Werkstatt", tr: "tamir atölyesi, servis" },
      { de: "das Leihgerät", tr: "ödünç cihaz" },
      { de: "dauern", tr: "sürmek" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Kundin", text: "Guten Tag. Ich habe dieses Handy vor zwei Wochen bei Ihnen gekauft, aber der Akku ist immer schon am Nachmittag leer." },
      { speaker: "Verkäufer", text: "Das tut mir leid. Haben Sie viele Apps geöffnet? Manchmal ist das das Problem." },
      { speaker: "Kundin", text: "Nein, ich benutze nur wenige Apps. Ich telefoniere und schreibe Nachrichten, das ist alles." },
      { speaker: "Verkäufer", text: "Dann schauen wir uns das Gerät genauer an. Haben Sie die Rechnung dabei?" },
      { speaker: "Kundin", text: "Ja, hier bitte." },
      { speaker: "Verkäufer", text: "Danke. Wir schicken das Handy in die Werkstatt, das dauert ungefähr eine Woche. Wenn der Akku kaputt ist, bekommen Sie ein neues Gerät. Das kostet dann natürlich nichts." },
      { speaker: "Kundin", text: "Und kann ich so lange ein anderes Handy haben?" },
      { speaker: "Verkäufer", text: "Ja, wir geben Ihnen gern ein Leihgerät mit." },
    ],
    questions: [
      {
        text: "Was ist das Problem mit dem Handy?",
        options: ["Das Display ist kaputt.", "Der Akku ist schnell leer.", "Das Handy ist zu langsam."],
        answer: 1,
        explain: "Müşteri sorunu ilk cümlede söylüyor: „der Akku ist immer schon am Nachmittag leer“.",
      },
      {
        text: "Wann hat die Kundin das Handy gekauft?",
        options: ["Vor zwei Tagen", "Vor einer Woche", "Vor zwei Wochen"],
        answer: 2,
        explain: "„Ich habe dieses Handy vor zwei Wochen bei Ihnen gekauft.“ Bir hafta ise tamirin süresi.",
      },
      {
        text: "Wie lange dauert die Reparatur ungefähr?",
        options: ["Einen Tag", "Eine Woche", "Zwei Wochen"],
        answer: 1,
        explain: "Satıcı „das dauert ungefähr eine Woche“ diyor.",
      },
      {
        text: "Die Kundin bekommt für diese Zeit ein Leihgerät.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: „wir geben Ihnen gern ein Leihgerät mit“ — tamir süresince ödünç telefon veriliyor.",
      },
    ],
  },
  {
    id: "a2-l6",
    level: "A2",
    skill: "listening",
    title: "Durchsage am Bahnhof",
    genre: "Anons",
    intro: "Gardaki anonsu dinle: München treniyle ilgili önemli değişiklikler var.",
    gloss: [
      { de: "die Verspätung", tr: "rötar, gecikme" },
      { de: "die Abfahrt", tr: "kalkış" },
      { de: "das Gleis", tr: "peron, ray" },
      { de: "der Grund", tr: "sebep" },
      { de: "gelten", tr: "geçerli olmak" },
      { de: "das Bordrestaurant", tr: "tren restoranı" },
      { de: "die Reisenden", tr: "yolcular" },
      { de: "technischer Defekt", tr: "teknik arıza" },
    ],
    minutes: 2,
    segments: [
      { text: "Achtung, eine wichtige Information für Reisende nach München: Der Intercity 512 nach München, planmäßige Abfahrt 14 Uhr 20, hat heute ungefähr 30 Minuten Verspätung. Der Grund ist ein technischer Defekt." },
      { text: "Der Zug fährt heute von Gleis 9 ab, nicht von Gleis 5. Reisende mit dem Ziel Augsburg können auch den Regionalzug um 14 Uhr 35 von Gleis 2 nehmen. Ihr Ticket gilt auch in diesem Zug." },
      { text: "Im Intercity ist heute leider kein Bordrestaurant geöffnet. Getränke bekommen Sie am Kiosk in der Bahnhofshalle. Wir bitten um Entschuldigung und wünschen Ihnen eine gute Reise." },
    ],
    questions: [
      {
        text: "Wie viel Verspätung hat der Intercity?",
        options: ["Ungefähr 20 Minuten", "Ungefähr 30 Minuten", "Ungefähr 35 Minuten"],
        answer: 1,
        explain: "„hat heute ungefähr 30 Minuten Verspätung“ — 20 kalkış saatinin dakikası, 35 ise bölgesel trenin saati.",
      },
      {
        text: "Von welchem Gleis fährt der Intercity heute ab?",
        options: ["Von Gleis 5", "Von Gleis 2", "Von Gleis 9"],
        answer: 2,
        explain: "„Der Zug fährt heute von Gleis 9 ab, nicht von Gleis 5.“ Peron 2, Augsburg'a giden bölgesel trenin peronu.",
      },
      {
        text: "Was können Reisende nach Augsburg machen?",
        options: ["Den Regionalzug um 14 Uhr 35 nehmen", "Ein neues Ticket kaufen", "Auf den nächsten Intercity warten"],
        answer: 0,
        explain: "Augsburg yolcularına 14.35'teki bölgesel tren öneriliyor; „Ihr Ticket gilt auch in diesem Zug“ — yeni bilet gerekmez.",
      },
      {
        text: "Das Bordrestaurant im Intercity ist heute geöffnet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „Im Intercity ist heute leider kein Bordrestaurant geöffnet“ — içecekler gar içindeki büfeden alınacak.",
      },
    ],
  },

  // ---------------------------------------------------------------- YAZMA
  {
    id: "a2-l7",
    level: "A2",
    skill: "listening",
    title: "Einladung zum Gespräch",
    genre: "Telefon",
    intro:
      "Hikâyenin devamı: apotek Pelin'i arıyor. Telefonda ne kararlaştırdıklarını dinleyeceksin.",
    gloss: [
      { de: "das Vorstellungsgespräch", tr: "iş görüşmesi" },
      { de: "die Bewerbung", tr: "başvuru" },
      { de: "es passt mir", tr: "bana uyar" },
      { de: "die Unterlagen", tr: "evraklar" },
      { de: "das Zeugnis", tr: "belge, referans" },
      { de: "sich melden", tr: "haber vermek, aramak" },
      { de: "der Eingang", tr: "giriş" },
    ],
    minutes: 3,
    segments: [
      {
        speaker: "Frau Kern",
        text: "Guten Tag, Frau Aydın? Kern, Apotheke am Markt. Sie haben sich bei uns beworben.",
      },
      { speaker: "Pelin", text: "Guten Tag! Ja, genau." },
      {
        speaker: "Frau Kern",
        text: "Ihre Bewerbung hat uns gefallen. Können Sie am Mittwoch um 14 Uhr zu einem Gespräch kommen?",
      },
      { speaker: "Pelin", text: "Mittwoch … Ja, das passt mir. Um 14 Uhr." },
      {
        speaker: "Frau Kern",
        text: "Schön. Bringen Sie bitte Ihre Zeugnisse mit — auch das vom Praktikum.",
      },
      { speaker: "Pelin", text: "Das Praktikum war vor drei Jahren. Ist das ein Problem?" },
      {
        speaker: "Frau Kern",
        text: "Überhaupt nicht. Wir suchen jemanden, der freundlich mit Menschen umgeht. Den Rest lernen Sie bei uns.",
      },
      { speaker: "Pelin", text: "Das beruhigt mich. Wo genau finde ich Sie?" },
      {
        speaker: "Frau Kern",
        text: "Marktstraße 4. Nicht der Haupteingang — die kleine Tür rechts, da steht „Personal“.",
      },
      { speaker: "Pelin", text: "Alles klar. Vielen Dank, bis Mittwoch!" },
    ],
    questions: [
      {
        text: "Warum ruft Frau Kern an?",
        options: [
          "Sie lädt Pelin zu einem Gespräch ein",
          "Sie sagt Pelin ab",
          "Sie will die Unterlagen per Post",
        ],
        answer: 0,
        explain: "„Können Sie am Mittwoch um 14 Uhr zu einem Gespräch kommen?“",
      },
      {
        text: "Was soll Pelin mitbringen?",
        options: ["Ihre Zeugnisse", "Ein Foto", "Nichts"],
        answer: 0,
        explain: "„Bringen Sie bitte Ihre Zeugnisse mit — auch das vom Praktikum.“",
      },
      {
        text: "Wie reagiert Frau Kern auf das alte Praktikum?",
        options: [
          "Es ist kein Problem — wichtiger ist der Umgang mit Menschen",
          "Sie findet es schlecht",
          "Sie will ein neues Praktikum",
        ],
        answer: 0,
        explain: "„Überhaupt nicht. Wir suchen jemanden, der freundlich mit Menschen umgeht.“",
      },
      {
        text: "Welche Tür soll Pelin nehmen?",
        options: [
          "Die kleine Tür rechts mit dem Schild „Personal“",
          "Den Haupteingang",
          "Den Eingang im Hof",
        ],
        answer: 0,
        explain: "„Nicht der Haupteingang — die kleine Tür rechts, da steht „Personal“.“",
      },
    ],
  },
  {
    id: "a2-l8",
    level: "A2",
    skill: "listening",
    title: "Die Nebenkostenabrechnung",
    genre: "Diyalog",
    intro:
      "Almanya'da kiracıların yılda bir kez korkuyla açtığı zarf: aidat/gider hesabı. Ev sahibiyle konuşmayı dinleyeceksin.",
    gloss: [
      { de: "die Nebenkosten", tr: "yan giderler (ısınma, su…)" },
      { de: "die Abrechnung", tr: "hesap dökümü" },
      { de: "nachzahlen", tr: "ek ödeme yapmak" },
      { de: "die Heizung", tr: "kalorifer" },
      { de: "der Vermieter", tr: "ev sahibi" },
      { de: "sparen", tr: "tasarruf etmek" },
      { de: "die Rate", tr: "taksit" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Herr Bach", text: "Frau Aydın, haben Sie die Abrechnung bekommen?" },
      {
        speaker: "Pelin",
        text: "Ja, gestern. 480 Euro nachzahlen — ich habe erst gedacht, das ist ein Fehler.",
      },
      {
        speaker: "Herr Bach",
        text: "Leider nicht. Das Gas ist im letzten Jahr sehr teuer geworden. Alle im Haus zahlen nach.",
      },
      { speaker: "Pelin", text: "480 Euro auf einmal ist viel für mich." },
      {
        speaker: "Herr Bach",
        text: "Das verstehe ich. Sie können in drei Raten zahlen — 160 Euro im Juli, August und September.",
      },
      { speaker: "Pelin", text: "Das hilft wirklich. Und nächstes Jahr?" },
      {
        speaker: "Herr Bach",
        text: "Ihre monatliche Vorauszahlung steigt von 140 auf 190 Euro. Dann kommt so eine Rechnung nicht wieder.",
      },
      { speaker: "Pelin", text: "Kann ich irgendwo sparen?" },
      {
        speaker: "Herr Bach",
        text: "Beim Lüften. Fenster ganz auf, fünf Minuten, dann zu — und die Heizung dabei runterdrehen. Das bringt am meisten.",
      },
    ],
    questions: [
      {
        text: "Wie viel muss Pelin nachzahlen?",
        options: ["480 Euro", "140 Euro", "190 Euro"],
        answer: 0,
        explain: "„480 Euro nachzahlen“ — 140 ve 190 aylık peşin ödemeler.",
      },
      {
        text: "Warum ist die Rechnung so hoch?",
        options: [
          "Das Gas ist teurer geworden",
          "Pelin heizt zu viel",
          "Der Vermieter hat sich geirrt",
        ],
        answer: 0,
        explain: "„Das Gas ist im letzten Jahr sehr teuer geworden. Alle im Haus zahlen nach.“",
      },
      {
        text: "Was schlägt Herr Bach vor?",
        options: [
          "Zahlung in drei Raten",
          "Die Hälfte zu erlassen",
          "Eine neue Heizung",
        ],
        answer: 0,
        explain: "Temmuz, ağustos, eylül için 160'ar euro.",
      },
      {
        text: "Was ändert sich nächstes Jahr?",
        options: [
          "Die Vorauszahlung steigt auf 190 Euro",
          "Die Miete steigt",
          "Nichts",
        ],
        answer: 0,
        explain: "Aylık peşin ödeme 140'tan 190 euroya çıkıyor.",
      },
      {
        text: "Welchen Tipp gibt er zum Sparen?",
        options: [
          "Kurz und ganz lüften, dabei die Heizung runterdrehen",
          "Das Fenster immer offen lassen",
          "Nie lüften",
        ],
        answer: 0,
        explain: "„Fenster ganz auf, fünf Minuten, dann zu“ — Almanya'nın klasik Stoßlüften tavsiyesi.",
      },
    ],
  },
  {
    id: "a2-l9",
    level: "A2",
    skill: "listening",
    title: "Vier kurze Gespräche",
    genre: "Sınav formatı",
    intro:
      "Goethe A2 dinleme bölümünün klasik görevi: dört kısa konuşma, her birine bir soru. Konuşmalar birbirinden bağımsız.",
    gloss: [
      { de: "das Gespräch", tr: "konuşma" },
      { de: "die Größe", tr: "beden" },
      { de: "umtauschen", tr: "değiştirmek (ürün)" },
      { de: "der Kassenbon", tr: "fiş" },
      { de: "die Haltestelle", tr: "durak" },
      { de: "aussteigen", tr: "inmek" },
      { de: "die Bestellung", tr: "sipariş" },
    ],
    minutes: 4,
    segments: [
      {
        speaker: "1 — Im Laden",
        text: "— Die Jacke ist zu klein. Kann ich sie umtauschen? — Klar, haben Sie den Kassenbon? — Ja, hier. — Gut. Größe M haben wir leider nur in Blau.",
      },
      {
        speaker: "2 — Im Bus",
        text: "— Entschuldigung, fährt der Bus zum Krankenhaus? — Nein, der Achtzehner fährt zum Bahnhof. Sie brauchen die Zwölf. — Und wo steige ich um? — An der nächsten Haltestelle, gegenüber.",
      },
      {
        speaker: "3 — Am Telefon",
        text: "— Restaurant Marino, guten Abend. — Guten Abend, ich möchte einen Tisch für vier Personen. — Für wann? — Samstag, 19 Uhr. — Samstag ist voll. Freitag oder Sonntag ginge.",
      },
      {
        speaker: "4 — Im Büro",
        text: "— Herr Weber, das Meeting ist verschoben. — Auf wann? — Von 10 auf 14 Uhr. Der Raum bleibt gleich. — Gut, dann habe ich vormittags Zeit für die Berichte.",
      },
    ],
    questions: [
      {
        text: "Gespräch 1: In welcher Farbe gibt es Größe M?",
        options: ["Nur in Blau", "In allen Farben", "Es gibt kein M"],
        answer: 0,
        explain: "„Größe M haben wir leider nur in Blau.“",
      },
      {
        text: "Gespräch 2: Welchen Bus braucht die Frau?",
        options: ["Die Zwölf", "Den Achtzehner", "Beide"],
        answer: 0,
        explain: "18 numara gara gidiyor; hastane için 12 numara gerekiyor.",
      },
      {
        text: "Gespräch 3: Wann ist noch ein Tisch frei?",
        options: ["Freitag oder Sonntag", "Samstag um 19 Uhr", "Gar nicht"],
        answer: 0,
        explain: "„Samstag ist voll. Freitag oder Sonntag ginge.“",
      },
      {
        text: "Gespräch 4: Was ändert sich am Meeting?",
        options: ["Die Uhrzeit", "Der Raum", "Das Datum"],
        answer: 0,
        explain: "„Von 10 auf 14 Uhr. Der Raum bleibt gleich.“",
      },
    ],
  },
  {
    id: "a2-l10",
    level: "A2",
    skill: "listening",
    title: "Warum ist sonntags alles zu?",
    genre: "Kültür",
    intro:
      "Almanya'ya yeni gelenlerin ilk şoku: pazar günü kapalı mağazalar. Kısa bir sohbet dinleyeceksin.",
    gloss: [
      { de: "der Ruhetag", tr: "dinlenme günü" },
      { de: "geschlossen", tr: "kapalı" },
      { de: "die Ausnahme", tr: "istisna" },
      { de: "die Tankstelle", tr: "benzin istasyonu" },
      { de: "der Bäcker", tr: "fırıncı" },
      { de: "sich gewöhnen an", tr: "…e alışmak" },
      { de: "einkaufen", tr: "alışveriş yapmak" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Pelin", text: "Sag mal, warum ist am Sonntag wirklich alles zu?" },
      {
        speaker: "Jonas",
        text: "Weil es im Gesetz steht. Der Sonntag ist ein Ruhetag — das kommt aus der Kirche, gilt aber für alle.",
      },
      { speaker: "Pelin", text: "Und wenn ich Milch brauche?" },
      {
        speaker: "Jonas",
        text: "Dann hast du Pech. Es gibt Ausnahmen: Tankstellen, Bahnhöfe, Flughäfen. Manche Bäcker machen morgens für drei Stunden auf.",
      },
      { speaker: "Pelin", text: "In der Türkei kann man immer einkaufen. Das fehlt mir." },
      {
        speaker: "Jonas",
        text: "Am Anfang hat es mich auch genervt. Aber weißt du was — jetzt mag ich es. Die Stadt ist leiser, und niemand muss arbeiten.",
      },
      { speaker: "Pelin", text: "Und was machen die Leute?" },
      {
        speaker: "Jonas",
        text: "Spazieren gehen. Kuchen essen. Verwandte besuchen. Es gibt sogar ein Wort dafür: Sonntagsspaziergang.",
      },
      { speaker: "Pelin", text: "Dann muss ich also samstags an alles denken." },
      { speaker: "Jonas", text: "Genau. Das lernt hier jeder — meistens einmal auf die harte Tour." },
    ],
    questions: [
      {
        text: "Warum sind die Läden sonntags zu?",
        options: [
          "Es steht im Gesetz — der Sonntag ist Ruhetag",
          "Die Leute wollen nicht arbeiten",
          "Es lohnt sich nicht",
        ],
        answer: 0,
        explain: "„Weil es im Gesetz steht. Der Sonntag ist ein Ruhetag.“",
      },
      {
        text: "Wo kann man trotzdem etwas kaufen?",
        options: [
          "An Tankstellen, Bahnhöfen, Flughäfen",
          "In allen Supermärkten",
          "Nirgends",
        ],
        answer: 0,
        explain: "İstisnalar: benzinlik, gar, havalimanı; bazı fırınlar sabah üç saat açık.",
      },
      {
        text: "Wie denkt Jonas heute darüber?",
        options: [
          "Er mag es inzwischen",
          "Es nervt ihn immer noch",
          "Ihm ist es egal",
        ],
        answer: 0,
        explain: "„Am Anfang hat es mich auch genervt. Aber … jetzt mag ich es.“",
      },
      {
        text: "Was machen viele Leute am Sonntag?",
        options: [
          "Spazieren gehen und Verwandte besuchen",
          "Arbeiten",
          "Einkaufen im Bahnhof",
        ],
        answer: 0,
        explain: "Hatta bunun bir adı var: „Sonntagsspaziergang“.",
      },
    ],
  },
  {
    id: "a2-l11",
    level: "A2",
    skill: "listening",
    title: "Die Lieferung kommt nicht",
    genre: "Telefon",
    intro: "Sipariş edilen mobilya gelmedi. Müşteri hizmetleriyle konuşmayı dinleyeceksin.",
    gloss: [
      { de: "die Lieferung", tr: "teslimat" },
      { de: "der Liefertermin", tr: "teslim tarihi" },
      { de: "die Bestellnummer", tr: "sipariş numarası" },
      { de: "das Lager", tr: "depo" },
      { de: "verspäten", tr: "gecikmek" },
      { de: "stornieren", tr: "iptal etmek" },
      { de: "der Gutschein", tr: "hediye çeki" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Service", text: "Möbel Nord, Kundenservice, mein Name ist Berger." },
      {
        speaker: "Pelin",
        text: "Guten Tag. Mein Schrank sollte am Dienstag kommen. Heute ist Freitag und ich habe nichts gehört.",
      },
      { speaker: "Service", text: "Das tut mir leid. Ihre Bestellnummer, bitte?" },
      { speaker: "Pelin", text: "M wie Martha, vier, neun, null, sechs." },
      {
        speaker: "Service",
        text: "Danke … Ich sehe es. Der Schrank ist nicht im Lager. Der neue Termin ist der 22., also in zwei Wochen.",
      },
      { speaker: "Pelin", text: "Zwei Wochen? Und niemand sagt mir Bescheid?" },
      {
        speaker: "Service",
        text: "Sie haben völlig recht, das hätte eine Nachricht geben müssen. Entschuldigung.",
      },
      { speaker: "Pelin", text: "Kann ich die Bestellung stornieren?" },
      {
        speaker: "Service",
        text: "Ja, jederzeit. Oder Sie warten und bekommen einen Gutschein über 30 Euro. Sie entscheiden.",
      },
      { speaker: "Pelin", text: "Ich warte. Aber bitte rufen Sie mich an, wenn sich wieder etwas ändert." },
      { speaker: "Service", text: "Mache ich. Ich schreibe es direkt in Ihre Bestellung." },
    ],
    questions: [
      {
        text: "Was ist das Problem?",
        options: [
          "Der Schrank ist nicht geliefert worden",
          "Der Schrank ist kaputt",
          "Der Preis war falsch",
        ],
        answer: 0,
        explain: "Salı gelmesi gereken dolap cuma günü hâlâ yok.",
      },
      {
        text: "Warum kommt die Lieferung nicht?",
        options: [
          "Der Schrank ist nicht im Lager",
          "Der Fahrer war krank",
          "Die Adresse war falsch",
        ],
        answer: 0,
        explain: "„Der Schrank ist nicht im Lager.“",
      },
      {
        text: "Welche zwei Möglichkeiten hat Pelin?",
        options: [
          "Stornieren oder warten mit Gutschein",
          "Nur warten",
          "Nur stornieren",
        ],
        answer: 0,
        explain: "„Oder Sie warten und bekommen einen Gutschein über 30 Euro.“",
      },
      {
        text: "Wie reagiert der Mitarbeiter auf ihre Kritik?",
        options: [
          "Er gibt ihr recht und entschuldigt sich",
          "Er sagt, sie ist selbst schuld",
          "Er legt auf",
        ],
        answer: 0,
        explain: "„Sie haben völlig recht, das hätte eine Nachricht geben müssen.“",
      },
      {
        text: "Was macht Pelin?",
        options: [
          "Sie wartet und will informiert werden",
          "Sie storniert",
          "Sie kauft woanders",
        ],
        answer: 0,
        explain: "„Ich warte. Aber bitte rufen Sie mich an, wenn sich wieder etwas ändert.“",
      },
    ],
  },
  {
    id: "a2-l12",
    level: "A2",
    skill: "listening",
    title: "Pelins erster Tag",
    genre: "Sesli mesaj",
    intro:
      "Hikâyenin sonu: Pelin işe başladı ve akşam arkadaşına sesli mesaj bırakıyor.",
    gloss: [
      { de: "der Empfang", tr: "resepsiyon, ön büro" },
      { de: "die Kollegin", tr: "kadın iş arkadaşı" },
      { de: "die Kasse", tr: "kasa" },
      { de: "sich merken", tr: "aklında tutmak" },
      { de: "der Feierabend", tr: "mesai bitişi" },
      { de: "erschöpft", tr: "bitkin" },
      { de: "stolz", tr: "gururlu" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Pelin", text: "Ceyda! Ich bin durch. Erster Tag geschafft." },
      {
        speaker: "Pelin",
        text: "Also: Ich war um Viertel nach acht da, viel zu früh natürlich. Frau Kern hat mir alles gezeigt — Empfang, Kasse, Lager, die Schubladen mit den Rezepten.",
      },
      {
        speaker: "Pelin",
        text: "Am Anfang habe ich am Telefon zweimal „Wie bitte?“ gesagt. Ich dachte, jetzt ist es vorbei. Aber die Kollegin, Marlies, hat nur gelacht und gesagt: „Das sage ich nach zwanzig Jahren auch noch.“",
      },
      {
        speaker: "Pelin",
        text: "Das Schwerste sind die Namen von den Medikamenten. Ich habe mir zwölf aufgeschrieben.",
      },
      {
        speaker: "Pelin",
        text: "Ich bin total erschöpft, aber weißt du was? Ich bin auch ein bisschen stolz. Vor zwei Monaten habe ich mich nicht mal getraut zu schreiben.",
      },
      { speaker: "Pelin", text: "Am Samstag lade ich dich ein. Ich koche. Bis dann!" },
    ],
    questions: [
      {
        text: "Wann war Pelin da?",
        options: ["Um 8:15 Uhr, zu früh", "Um 8:30 Uhr, pünktlich", "Zu spät"],
        answer: 0,
        explain: "„Ich war um Viertel nach acht da, viel zu früh natürlich.“",
      },
      {
        text: "Was ist am Telefon passiert?",
        options: [
          "Sie hat zweimal „Wie bitte?“ gesagt",
          "Sie hat aufgelegt",
          "Sie hat den Namen falsch verstanden",
        ],
        answer: 0,
        explain: "İki kez „Wie bitte?“ demiş ve kendini kötü hissetmiş.",
      },
      {
        text: "Wie hat Marlies reagiert?",
        options: [
          "Sie hat gelacht und Pelin beruhigt",
          "Sie war böse",
          "Sie hat es Frau Kern gesagt",
        ],
        answer: 0,
        explain: "„Das sage ich nach zwanzig Jahren auch noch.“",
      },
      {
        text: "Was findet Pelin am schwersten?",
        options: [
          "Die Namen der Medikamente",
          "Die Kasse",
          "Die Arbeitszeit",
        ],
        answer: 0,
        explain: "„Das Schwerste sind die Namen von den Medikamenten.“ On iki tanesini yazmış.",
      },
      {
        text: "Wie fühlt sie sich am Ende?",
        options: [
          "Erschöpft, aber stolz",
          "Enttäuscht",
          "Sie will kündigen",
        ],
        answer: 0,
        explain: "„Ich bin total erschöpft, aber … ich bin auch ein bisschen stolz.“",
      },
    ],
  },

  {
    id: "a2-w1",
    level: "A2",
    skill: "writing",
    title: "Eine Einladung beantworten",
    genre: "E-posta",
    intro: "Bir doğum günü davetine nazikçe cevap yazmayı çalışıyorsun: teşekkür, durum, öneri.",
    gloss: [
      { de: "die Einladung", tr: "davet" },
      { de: "feiern", tr: "kutlamak" },
      { de: "mitbringen", tr: "yanında getirmek" },
      { de: "leider", tr: "maalesef" },
      { de: "sich treffen", tr: "buluşmak" },
      { de: "sich freuen auf", tr: "-i iple çekmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Davetin için çok teşekkür ederim.",
        answer: "Vielen Dank für deine Einladung.",
        hint: "für edatı Akkusativ ister: für deine Einladung.",
      },
      {
        kind: "build",
        tr: "Maalesef cumartesi gelemiyorum, çünkü çalışmak zorundayım.",
        answer: "Leider kann ich am Samstag nicht kommen, weil ich arbeiten muss.",
        alternatives: ["Ich kann leider am Samstag nicht kommen, weil ich arbeiten muss."],
        hint: "weil bağlacından sonra çekimli fiil (muss) cümlenin sonuna gider.",
      },
      {
        kind: "build",
        tr: "Belki gelecek hafta buluşabiliriz.",
        answer: "Vielleicht können wir uns nächste Woche treffen.",
        alternatives: ["Wir können uns vielleicht nächste Woche treffen."],
        hint: "Cümle vielleicht ile başlarsa çekimli fiil yine ikinci sırada kalır.",
      },
      {
        kind: "free",
        prompt:
          "Lena'nın davetine kısa bir e-posta ile cevap ver: davet için teşekkür et, gelip gelemeyeceğini ve saat kaçta geleceğini söyle, yanında ne getireceğini yaz.",
        stimulus:
          "Hallo!\n\nIch feiere am Samstag meinen Geburtstag und mache eine kleine Party bei mir zu Hause. Wir fangen um 18 Uhr an. Kommst du auch? Kannst du vielleicht etwas zu essen mitbringen?\n\nViele Grüße\nLena",
        checklist: [
          "Davet için teşekkür ettin mi?",
          "Gelip gelemeyeceğini ve saatini yazdın mı?",
          "Ne getireceğini söyledin mi?",
          "Selamlama ve kapanış cümlen var mı?",
        ],
        minWords: 30,
        phrases: [
          { de: "Vielen Dank für die Einladung.", tr: "Davet için çok teşekkürler." },
          { de: "Ich komme gern.", tr: "Seve seve gelirim." },
          { de: "Leider kann ich erst um ... kommen.", tr: "Maalesef ancak saat ...'te gelebilirim." },
          { de: "Ich bringe ... mit.", tr: "Yanımda ... getiririm." },
          { de: "Ich freue mich schon auf die Party.", tr: "Partiyi şimdiden iple çekiyorum." },
          { de: "Bis Samstag!", tr: "Cumartesi görüşürüz!" },
        ],
        sample:
          "Hallo Lena,\n\nvielen Dank für die Einladung! Ich komme sehr gern zu deiner Party. Leider muss ich am Samstag bis 18 Uhr arbeiten, deshalb komme ich erst um 19 Uhr. Ich bringe einen Nudelsalat und etwas zu trinken mit. Ich freue mich schon auf die Party!\n\nViele Grüße\nDeniz",
      },
    ],
  },
  {
    id: "a2-w2",
    level: "A2",
    skill: "writing",
    title: "E-Mail an die Vermieterin",
    genre: "Resmi e-posta",
    intro: "Beğendiğin bir kiralık daire ilanına resmi bir e-posta ile başvuruyorsun.",
    gloss: [
      { de: "die Anzeige", tr: "ilan" },
      { de: "die Miete", tr: "kira" },
      { de: "die Nebenkosten", tr: "yan giderler" },
      { de: "besichtigen", tr: "gezip görmek" },
      { de: "erlaubt", tr: "izinli" },
      { de: "sich interessieren für", tr: "-e ilgi duymak" },
      { de: "die Vermieterin", tr: "ev sahibi (kadın)" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "İlanınızı internette okudum.",
        answer: "Ich habe Ihre Anzeige im Internet gelesen.",
        hint: "Perfekt: habe + Partizip 2 (gelesen) cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Daire hâlâ boş mu?",
        answer: "Ist die Wohnung noch frei?",
        hint: "Evet-hayır sorusunda çekimli fiil (ist) başa gelir.",
      },
      {
        kind: "build",
        tr: "Daireyi seve seve gezip görmek istiyorum.",
        answer: "Ich möchte die Wohnung gern besichtigen.",
        alternatives: ["Ich möchte gern die Wohnung besichtigen."],
        hint: "möchte ikinci sırada, asıl fiil (besichtigen) mastar halinde sonda.",
      },
      {
        kind: "free",
        prompt:
          "İlan sahibi Frau Weber'e resmi bir e-posta yaz: kendini kısaca tanıt, daireyle ilgilendiğini söyle, en az bir soru sor (ör. evcil hayvan, park yeri) ve daireyi görmek için randevu iste.",
        stimulus:
          "2-Zimmer-Wohnung in der Südstadt, 54 Quadratmeter, mit Balkon. 680 Euro plus Nebenkosten, frei ab dem 1. Oktober. Kontakt: Frau Weber, wohnung-weber@mailbox.de",
        checklist: [
          "Kendini tanıttın mı (isim, meslek veya aile durumu)?",
          "Daireyle ilgilendiğini açıkça yazdın mı?",
          "En az bir soru sordun mu?",
          "Resmi hitap (Sie) ve resmi kapanış kullandın mı?",
        ],
        minWords: 35,
        phrases: [
          { de: "Sehr geehrte Frau Weber, ...", tr: "Sayın Bayan Weber, ... (resmi hitap)" },
          { de: "Ich interessiere mich für die Wohnung.", tr: "Daireyle ilgileniyorum." },
          { de: "Ich arbeite als ...", tr: "... olarak çalışıyorum." },
          { de: "Ich habe noch eine Frage: ...", tr: "Bir sorum daha var: ..." },
          { de: "Sind Haustiere erlaubt?", tr: "Evcil hayvan serbest mi?" },
          { de: "Kann ich die Wohnung besichtigen?", tr: "Daireyi gezebilir miyim?" },
          { de: "Mit freundlichen Grüßen", tr: "Saygılarımla (resmi kapanış)" },
        ],
        sample:
          "Sehr geehrte Frau Weber,\n\nich habe Ihre Anzeige im Internet gelesen und interessiere mich sehr für die Wohnung. Ich heiße Emre Aydın, ich bin 29 Jahre alt und arbeite als Krankenpfleger in Nürnberg. Ich habe noch eine Frage: Sind Haustiere erlaubt? Ich habe eine kleine Katze. Kann ich die Wohnung am Samstag besichtigen?\n\nMit freundlichen Grüßen\nEmre Aydın",
      },
    ],
  },
  {
    id: "a2-w3",
    level: "A2",
    skill: "writing",
    title: "Krankmeldung an den Chef",
    genre: "Resmi e-posta",
    intro: "Hastasın ve işe gidemiyorsun — şefine kısa, resmi bir bildirim yazacaksın.",
    gloss: [
      { de: "krank", tr: "hasta" },
      { de: "das Fieber", tr: "ateş" },
      { de: "die Kopfschmerzen", tr: "baş ağrısı" },
      { de: "die Krankmeldung", tr: "hastalık raporu" },
      { de: "der Arzt", tr: "doktor" },
      { de: "zu Hause bleiben", tr: "evde kalmak" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Bugün maalesef işe gelemiyorum.",
        answer: "Ich kann heute leider nicht zur Arbeit kommen.",
        alternatives: ["Leider kann ich heute nicht zur Arbeit kommen."],
        hint: "Modal fiil (kann) ikinci sırada, asıl fiil (kommen) sonda.",
      },
      {
        kind: "build",
        tr: "Dün akşamdan beri ateşim var.",
        answer: "Ich habe seit gestern Abend Fieber.",
        hint: "seit + zaman ifadesi: seit gestern Abend.",
      },
      {
        kind: "build",
        tr: "Doktor, evde kalmam gerektiğini söyledi.",
        answer: "Der Arzt hat gesagt, dass ich zu Hause bleiben soll.",
        hint: "dass cümlesinde fiiller sona gider: bleiben soll.",
      },
      {
        kind: "free",
        prompt:
          "Şefin Herr Krause'ye kısa ve resmi bir e-posta yaz: hasta olduğunu ve bugün işe gelemeyeceğini bildir, doktora gideceğini söyle ve ne zaman dönebileceğini tahmin et.",
        checklist: [
          "Hasta olduğunu ve bugün gelemeyeceğini yazdın mı?",
          "Doktordan veya rapordan bahsettin mi?",
          "Ne zaman dönebileceğini yazdın mı?",
          "Resmi hitap ve resmi kapanış kullandın mı?",
        ],
        minWords: 25,
        phrases: [
          { de: "Sehr geehrter Herr Krause, ...", tr: "Sayın Bay Krause, ... (resmi hitap)" },
          { de: "Ich bin leider krank.", tr: "Maalesef hastayım." },
          { de: "Ich kann heute nicht zur Arbeit kommen.", tr: "Bugün işe gelemiyorum." },
          { de: "Ich gehe heute zum Arzt.", tr: "Bugün doktora gidiyorum." },
          { de: "Die Krankmeldung schicke ich Ihnen morgen.", tr: "Raporu size yarın gönderirim." },
          { de: "Mit freundlichen Grüßen", tr: "Saygılarımla" },
        ],
        sample:
          "Sehr geehrter Herr Krause,\n\nich bin leider krank und kann heute nicht zur Arbeit kommen. Ich habe Fieber und starke Kopfschmerzen. Heute Vormittag gehe ich zum Arzt. Ich glaube, dass ich am Donnerstag wieder arbeiten kann. Die Krankmeldung schicke ich Ihnen morgen per E-Mail.\n\nMit freundlichen Grüßen\nSelin Arslan",
      },
    ],
  },
  {
    id: "a2-w4",
    level: "A2",
    skill: "writing",
    title: "E-Mail aus dem Urlaub",
    genre: "E-posta",
    intro: "Tatilden döndün ve Alman arkadaşına neler yaşadığını Perfekt ile anlatacaksın.",
    gloss: [
      { de: "der Urlaub", tr: "tatil" },
      { de: "das Meer", tr: "deniz" },
      { de: "baden", tr: "denize girmek, yüzmek" },
      { de: "die Altstadt", tr: "eski şehir" },
      { de: "der Ausflug", tr: "gezi, tur" },
      { de: "gefallen", tr: "hoşuna gitmek" },
      { de: "das Wetter", tr: "hava durumu" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Geçen hafta ailemle Antalya'daydım.",
        answer: "Letzte Woche war ich mit meiner Familie in Antalya.",
        alternatives: ["Ich war letzte Woche mit meiner Familie in Antalya."],
        hint: "Präteritum: war. Zaman ifadesi başa gelirse fiil yine ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Hava her gün güneşli ve sıcaktı.",
        answer: "Das Wetter war jeden Tag sonnig und warm.",
        hint: "jeden Tag kalıbı Akkusativ ile kurulur ve zaman bildirir.",
      },
      {
        kind: "build",
        tr: "Denize girdik ve eski şehri gezdik.",
        answer: "Wir haben im Meer gebadet und die Altstadt besichtigt.",
        hint: "Perfekt: haben ... gebadet / besichtigt — iki Partizip da sonda.",
      },
      {
        kind: "free",
        prompt:
          "Alman arkadaşın Paul'a tatilini anlatan kısa bir e-posta yaz: nerede ve ne kadar süre kaldığını, orada neler yaptığını ve en çok neyi sevdiğini anlat.",
        checklist: [
          "Nerede ve ne kadar süre tatil yaptığını yazdın mı?",
          "En az iki aktiviteyi Perfekt ile anlattın mı?",
          "En çok neyi sevdiğini söyledin mi?",
          "Selamlama ve kapanış cümlen var mı?",
        ],
        minWords: 35,
        phrases: [
          { de: "Ich war eine Woche in ...", tr: "Bir hafta ...'deydim." },
          { de: "Das Wetter war super.", tr: "Hava harikaydı." },
          { de: "Wir haben ... besucht.", tr: "...'i ziyaret ettik." },
          { de: "Am besten hat mir ... gefallen.", tr: "En çok ... hoşuma gitti." },
          { de: "Ich habe viele Fotos gemacht.", tr: "Bir sürü fotoğraf çektim." },
          { de: "Nächstes Jahr möchte ich wieder dorthin.", tr: "Gelecek yıl yine oraya gitmek istiyorum." },
        ],
        sample:
          "Lieber Paul,\n\nwie geht es dir? Ich war zwei Wochen mit meiner Familie in Izmir. Das Wetter war super, fast jeden Tag Sonne! Wir haben im Meer gebadet und einen Ausflug nach Ephesos gemacht. Am besten hat mir das Essen gefallen, frischer Fisch direkt am Hafen. Ich habe viele Fotos gemacht und zeige sie dir bald.\n\nViele Grüße\nBaran",
      },
    ],
  },
  {
    id: "a2-w5",
    level: "A2",
    skill: "writing",
    title: "E-Mail an die Krankenkasse",
    genre: "Resmî yazı",
    intro:
      "a2-r8'deki mektuba cevap yazacaksın: belgeleri gönderiyor ve bir soru soruyorsun. Resmî ama sade.",
    gloss: [
      { de: "der Antrag", tr: "başvuru, talep" },
      { de: "der Anhang", tr: "ek (dosya)" },
      { de: "einreichen", tr: "sunmak, teslim etmek" },
      { de: "die Rechnung", tr: "fatura" },
      { de: "die Rückmeldung", tr: "geri dönüş" },
      { de: "die Versichertennummer", tr: "sigorta numarası" },
      { de: "überweisen", tr: "havale etmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Ekte fatura ve reçeteyi gönderiyorum.",
        answer: "Im Anhang schicke ich die Rechnung und das Rezept.",
        hint: "Cümleye „Im Anhang“ ile başlarsan fiil hemen arkasından gelir.",
      },
      {
        kind: "build",
        tr: "Gözlüğü 12 Mayıs'ta aldım.",
        answer: "Ich habe die Brille am 12. Mai gekauft.",
        hint: "Perfekt: habe … gekauft. Tarihlerde „am“ kullanılır.",
      },
      {
        kind: "build",
        tr: "Parayı ne zaman alacağımı öğrenebilir miyim?",
        answer: "Können Sie mir sagen, wann ich das Geld bekomme?",
        hint: "Yan cümlede fiil sona gider: … wann ich das Geld bekomme.",
      },
      {
        kind: "free",
        prompt:
          "Sağlık sigortana bir e-posta yaz. Beş noktaya değin: kim olduğun ve sigorta numaran, neden yazdığın, hangi belgeleri gönderdiğin, bir soru (ne zaman ödenir / başka bir şey gerekiyor mu), kibar kapanış.",
        checklist: [
          "Resmî hitap ve kapanış var mı?",
          "Sigorta numaranı yazdın mı?",
          "Neden yazdığını ilk cümlelerde söyledin mi?",
          "Gönderdiğin belgeleri saydın mı?",
          "Bir soru sordun mu?",
        ],
        minWords: 50,
        phrases: [
          { de: "Sehr geehrte Damen und Herren,", tr: "Sayın yetkili," },
          { de: "meine Versichertennummer ist …", tr: "sigorta numaram …" },
          { de: "ich möchte einen Zuschuss beantragen.", tr: "Katkı payı talep etmek istiyorum." },
          { de: "Im Anhang finden Sie …", tr: "Ekte … bulacaksınız." },
          { de: "Können Sie mir sagen, ob …", tr: "… olup olmadığını söyleyebilir misiniz?" },
          { de: "Mit freundlichen Grüßen", tr: "Saygılarımla" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\nmein Name ist Pelin Aydın, meine Versichertennummer ist K 4471 9902.\n\nIch möchte den Zuschuss für meine Brille beantragen. Ich habe die Brille am 12. Mai gekauft. Im Anhang schicke ich die Rechnung und das Rezept von meiner Augenärztin.\n\nKönnen Sie mir sagen, wann ich das Geld bekomme und ob Sie noch etwas brauchen?\n\nVielen Dank für Ihre Hilfe.\n\nMit freundlichen Grüßen\nPelin Aydın",
      },
    ],
  },
  {
    id: "a2-w6",
    level: "A2",
    skill: "writing",
    title: "Auf eine Einladung antworten",
    genre: "Sınav formatı",
    intro:
      "Goethe A2 yazma görevinin tam formatı: bir davete cevap ver, üç noktaya değin — teşekkür, kabul/ret ve bir öneri veya soru.",
    gloss: [
      { de: "die Einladung", tr: "davet" },
      { de: "absagen", tr: "reddetmek, katılamayacağını bildirmek" },
      { de: "zusagen", tr: "kabul etmek" },
      { de: "leider", tr: "maalesef" },
      { de: "mitbringen", tr: "yanında getirmek" },
      { de: "der Vorschlag", tr: "öneri" },
      { de: "sich freuen auf", tr: "dört gözle beklemek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Davet için çok teşekkürler.",
        answer: "Vielen Dank für die Einladung.",
        hint: "„danken für“ + Akkusativ.",
      },
      {
        kind: "build",
        tr: "Maalesef saat sekizden önce gelemem.",
        answer: "Leider kann ich nicht vor acht Uhr kommen.",
        hint: "Modal fiil ikinci sırada, esas fiil sonda: kann … kommen.",
      },
      {
        kind: "build",
        tr: "Bir salata getirebilirim.",
        answer: "Ich kann einen Salat mitbringen.",
        hint: "Ayrılabilen fiil mastar hâlde sonda: mitbringen.",
      },
      {
        kind: "free",
        prompt:
          "Bir arkadaşın seni doğum gününe davet etti. Cevap yaz ve şu üç noktaya değin: davet için teşekkür, geleceğin (ve saati) ya da gelemeyeceğin ve nedeni, bir öneri veya soru (ne getireyim / kimler geliyor).",
        checklist: [
          "Teşekkür ettin mi?",
          "Net bir cevap verdin mi (geliyorum / gelemiyorum)?",
          "Bir gerekçe ya da saat belirttin mi?",
          "Bir öneri ya da soru eklendi mi?",
          "Selamlama ve kapanış var mı?",
        ],
        minWords: 40,
        phrases: [
          { de: "Vielen Dank für die Einladung.", tr: "Davet için teşekkürler." },
          { de: "Ich komme gern.", tr: "Seve seve gelirim." },
          { de: "Leider kann ich nicht kommen, weil …", tr: "Maalesef gelemem çünkü …" },
          { de: "Soll ich etwas mitbringen?", tr: "Bir şey getireyim mi?" },
          { de: "Ich freue mich auf …", tr: "…'i dört gözle bekliyorum." },
        ],
        sample:
          "Liebe Ceyda,\n\nvielen Dank für die Einladung! Ich komme sehr gern.\n\nLeider kann ich nicht vor acht Uhr kommen, weil ich bis 19 Uhr arbeite. Ist das okay? Dann bin ich gegen halb neun bei dir.\n\nSoll ich etwas mitbringen? Ich kann einen Salat machen oder einen Kuchen kaufen. Sag mir einfach Bescheid.\n\nIch freue mich auf den Abend!\n\nLiebe Grüße\nPelin",
      },
    ],
  },
  {
    id: "a2-w7",
    level: "A2",
    skill: "writing",
    title: "Ein Fest beschreiben",
    genre: "Kültür",
    intro:
      "Kendi ülkendeki bir bayramı ya da kutlamayı bir Alman arkadaşına anlatacaksın — kültür karşılaştırması yazma pratiğinin en verimli konusudur.",
    gloss: [
      { de: "das Fest", tr: "bayram, kutlama" },
      { de: "feiern", tr: "kutlamak" },
      { de: "die Verwandten", tr: "akrabalar" },
      { de: "der Brauch", tr: "gelenek" },
      { de: "dauern", tr: "sürmek" },
      { de: "das Geschenk", tr: "hediye" },
      { de: "ähnlich", tr: "benzer" },
      { de: "der Unterschied", tr: "fark" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu bayram üç gün sürer.",
        answer: "Dieses Fest dauert drei Tage.",
        hint: "„dauern“ süre bildirir; Akkusativ zaman: drei Tage.",
      },
      {
        kind: "build",
        tr: "Sabahleyin bütün akrabaları ziyaret ederiz.",
        answer: "Am Morgen besuchen wir alle Verwandten.",
        hint: "Zaman ifadesi başa gelince fiil hemen arkasından gelir.",
      },
      {
        kind: "build",
        tr: "Çocuklar hediye olarak para alır.",
        answer: "Die Kinder bekommen Geld als Geschenk.",
        hint: "„als“ burada „olarak“ demektir, artikel almaz.",
      },
      {
        kind: "free",
        prompt:
          "Alman bir arkadaşına ülkendeki bir bayramı anlat. Dört noktaya değin: bayramın adı ve ne zaman olduğu, kimlerle kutlandığı, en önemli iki gelenek (yemek, ziyaret, hediye…), Almanya'daki bir bayramla benzerliği ya da farkı.",
        checklist: [
          "Bayramın adını ve zamanını yazdın mı?",
          "Kimlerle kutlandığını yazdın mı?",
          "En az iki geleneği anlattın mı?",
          "Bir karşılaştırma yaptın mı? (ähnlich wie / anders als)",
          "Bir soru ya da davetle bitirdin mi?",
        ],
        minWords: 60,
        phrases: [
          { de: "Bei uns feiert man …", tr: "Bizde … kutlanır." },
          { de: "Das Fest dauert …", tr: "Bayram … sürer." },
          { de: "Zuerst … , danach …", tr: "Önce … , sonra …" },
          { de: "Das ist ähnlich wie …", tr: "Bu … gibi benzer." },
          { de: "Anders als in Deutschland …", tr: "Almanya'dan farklı olarak …" },
        ],
        sample:
          "Hallo Jonas,\n\ndu hast mich nach unseren Festen gefragt. Das wichtigste ist das Zuckerfest, auf Türkisch „Bayram“. Es kommt nach dem Fastenmonat Ramadan und dauert drei Tage.\n\nAm Morgen besuchen wir alle Verwandten — zuerst die ältesten. Man küsst ihnen die Hand, und die Kinder bekommen Geld als Geschenk. Danach isst man zusammen, und es gibt sehr viele Süßigkeiten. Deshalb heißt es Zuckerfest.\n\nDas ist ähnlich wie Weihnachten bei euch: Familie, Essen, Geschenke. Anders als in Deutschland besucht man aber nicht nur die eigene Familie, sondern auch die Nachbarn — und niemand meldet sich vorher an.\n\nWann feiert ihr eigentlich am meisten, Weihnachten oder Silvester?\n\nViele Grüße\nPelin",
      },
    ],
  },
  {
    id: "a2-w8",
    level: "A2",
    skill: "writing",
    title: "Pelin schreibt nach dem ersten Tag",
    genre: "Mesaj",
    intro:
      "Hikâyenin son parçası: Pelin'in yerine geçip ilk iş gününü anlatan mesajı yazacaksın (a2-l12'yi dinlediysen malzemen var).",
    gloss: [
      { de: "der erste Tag", tr: "ilk gün" },
      { de: "nervös", tr: "gergin" },
      { de: "sich vorstellen", tr: "kendini tanıtmak" },
      { de: "die Aufgabe", tr: "görev" },
      { de: "der Fehler", tr: "hata" },
      { de: "helfen", tr: "yardım etmek" },
      { de: "sich freuen", tr: "sevinmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sabah çok gergindim.",
        answer: "Am Morgen war ich sehr nervös.",
        hint: "„sein“ fiilinde Präteritum günlük dilde de kullanılır: war.",
      },
      {
        kind: "build",
        tr: "Meslektaşım bana her şeyi gösterdi.",
        answer: "Meine Kollegin hat mir alles gezeigt.",
        hint: "Perfekt: hat … gezeigt. „mir“ Dativ.",
      },
      {
        kind: "build",
        tr: "Bir hata yaptım ama kimse kızmadı.",
        answer: "Ich habe einen Fehler gemacht, aber niemand war böse.",
        hint: "„aber“ bağlacı cümle sırasını değiştirmez.",
      },
      {
        kind: "free",
        prompt:
          "Bir arkadaşına yeni işindeki (ya da okulundaki, kursundaki) ilk gününü anlat. Dört noktaya değin: sabah nasıl hissettiğin, gün içinde ne yaptığın, iyi ya da kötü giden bir an, şu an nasıl hissettiğin. Geçmiş zamanı Perfekt ile kur.",
        checklist: [
          "Günün başını, ortasını ve sonunu anlattın mı?",
          "Perfekt kullandın mı (war/hatte hariç)?",
          "Somut bir an anlattın mı, sadece genel cümleler değil?",
          "Duygunu yazdın mı?",
          "Selamlama ve kapanış var mı?",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich habe es geschafft!", tr: "Başardım!" },
          { de: "Am Morgen war ich …", tr: "Sabah … idim." },
          { de: "Zuerst … , dann …", tr: "Önce … , sonra …" },
          { de: "Das Schwerste war …", tr: "En zoru … idi." },
          { de: "Jetzt bin ich müde, aber …", tr: "Şimdi yorgunum ama …" },
        ],
        sample:
          "Hey Ceyda,\n\nich habe es geschafft — erster Tag vorbei!\n\nAm Morgen war ich sehr nervös und viel zu früh da. Meine Chefin, Frau Kern, hat mir alles gezeigt: den Empfang, die Kasse und das Lager. Danach durfte ich schon selbst am Telefon sprechen.\n\nDabei habe ich einen Fehler gemacht — ich habe zweimal „Wie bitte?“ gesagt. Aber niemand war böse. Meine Kollegin Marlies hat gelacht und gesagt, sie macht das nach zwanzig Jahren auch noch.\n\nDas Schwerste waren die Namen von den Medikamenten. Ich habe mir zwölf aufgeschrieben.\n\nJetzt bin ich müde, aber auch ein bisschen stolz. Am Samstag koche ich für dich!\n\nBis dann\nPelin",
      },
    ],
  },
];
