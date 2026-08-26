import type { SkillQuestion } from "../types";

/**
 * ÜRETİLMİŞ DOSYA — elle düzenleme: `npm run content:derive` yeniden yazar.
 * Okuma/dinleme egzersizlerine türetilmiş yazılı sorular (WP-72); kaynak ve
 * kurallar scripts/derive-questions.ts. Egzersiz kimliği → ek sorular;
 * bundled.ts yükleme sırasında ekler.
 */
export const DERIVED_QUESTIONS: Record<string, SkillQuestion[]> = {
  "a1-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Schöne 2-Zimmer-Wohnung in Köln-Ehrenfeld zu ___. 54 Quadratmeter, mit Balkon und neuer Küche.“",
      "options": [],
      "answer": 0,
      "accept": [
        "vermieten"
      ],
      "explain": "„Schöne 2-Zimmer-Wohnung in Köln-Ehrenfeld zu vermieten. 54 Quadratmeter, mit Balkon und neuer Küche.“ — vermieten: kiraya vermek."
    },
    {
      "kind": "short_answer",
      "text": "Was soll man bei Interesse machen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Herrn Weber anrufen"
      ],
      "explain": "İlan „Rufen Sie Herrn Weber an“ diyor, yani telefonla aramak gerekiyor. U-Bahn sadece dairenin konumu için geçiyor."
    }
  ],
  "a1-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „am Sonntag habe ich ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Geburtstag"
      ],
      "explain": "„am Sonntag habe ich Geburtstag.“ — der Geburtstag: doğum günü."
    },
    {
      "kind": "short_answer",
      "text": "Wie alt wird Julia? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "30 Jahre"
      ],
      "explain": "„Ich werde 30 Jahre alt!“ cümlesi cevabı veriyor. 12 ev numarası, 15 ise partinin başlama saati."
    }
  ],
  "a1-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Mai, haben wir neue ___: Montag bis Freitag von 8 bis 21 Uhr, Samstag von 9 bis 20 Uhr.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Öffnungszeiten"
      ],
      "explain": "„Mai, haben wir neue Öffnungszeiten: Montag bis Freitag von 8 bis 21 Uhr, Samstag von 9 bis 20 Uhr.“ — die Öffnungszeiten: çalışma saatleri."
    },
    {
      "kind": "short_answer",
      "text": "Wann öffnet die Bäckerei? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Um 7 Uhr",
        "7 Uhr"
      ],
      "explain": "„Die Bäckerei im Markt öffnet schon um 7 Uhr“ — fırın marketten daha erken, saat 7'de açılıyor."
    }
  ],
  "a1-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Yoga für ___: Dienstag, 9:00 bis 10:00 Uhr.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Anfänger"
      ],
      "explain": "„Yoga für Anfänger: Dienstag, 9:00 bis 10:00 Uhr.“ — der Anfänger: yeni başlayan."
    },
    {
      "kind": "short_answer",
      "text": "Wann ist der Deutschkurs? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Montag und Mittwoch"
      ],
      "explain": "Programda Deutsch A1 kursunun yanında „Montag und Mittwoch“ yazıyor. Salı yoga, cuma yemek kursu günü."
    }
  ],
  "a1-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Juni fährt die ___ U3 nicht zwischen Hauptbahnhof und Stadtpark.“",
      "options": [],
      "answer": 0,
      "accept": [
        "U-Bahn-Linie"
      ],
      "explain": "„Juni fährt die U-Bahn-Linie U3 nicht zwischen Hauptbahnhof und Stadtpark.“ — die U-Bahn-Linie: metro hattı."
    },
    {
      "kind": "short_answer",
      "text": "Wie oft fährt der Bus 47? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Alle 10 Minuten"
      ],
      "explain": "„Der Bus fährt alle 10 Minuten“ — 10 dakikada bir. 20 dakika yolculuğun süresi, 14 ise tarihte geçiyor."
    }
  ],
  "a1-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich habe noch keinen Tisch und kein Sofa — nur zwölf Kartons und ein ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bett"
      ],
      "explain": "„Ich habe noch keinen Tisch und kein Sofa — nur zwölf Kartons und ein Bett.“ — das Bett: yatak."
    },
    {
      "kind": "short_answer",
      "text": "Wie ist die Wohnung? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Klein, aber hell"
      ],
      "explain": "„Die Wohnung ist klein, aber hell.“ — küçük ama aydınlık."
    }
  ],
  "a1-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nach 10 Minuten ist Ihr ___ nicht mehr gültig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Termin"
      ],
      "explain": "„Nach 10 Minuten ist Ihr Termin nicht mehr gültig.“ — der Termin: randevu."
    },
    {
      "kind": "short_answer",
      "text": "Was muss Amir nicht mitbringen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ein Foto",
        "Foto"
      ],
      "explain": "Listede pasaport, kira sözleşmesi ve ev sahibi belgesi var — fotoğraf yok."
    }
  ],
  "a1-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Bei Regen: Der ___ ist am Sonntag.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Flohmarkt"
      ],
      "explain": "„Bei Regen: Der Flohmarkt ist am Sonntag.“ — der Flohmarkt: bit pazarı."
    },
    {
      "kind": "short_answer",
      "text": "Was kann man dort kaufen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Gebrauchte Sachen"
      ],
      "explain": "„Alles ist gebraucht: Bücher, Kleidung, Fahrräder, Spielzeug, Geschirr.“"
    }
  ],
  "a1-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „C) Wir ___ eine Person für den Garten.“",
      "options": [],
      "answer": 0,
      "accept": [
        "suchen"
      ],
      "explain": "„C) Wir suchen eine Person für den Garten.“ — suchen: aramak."
    },
    {
      "kind": "short_answer",
      "text": "Selin arbeitet Montag bis Freitag und will Deutsch lernen. Welche Anzeige passt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "A"
      ],
      "explain": "A ilanı Almanca dersi veriyor ve „nur am Wochenende“ — Selin hafta içi çalıştığı için tam uygun."
    }
  ],
  "a1-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Sie waren nicht zu Hause, also habe ich Ihr ___ angenommen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Paket"
      ],
      "explain": "„Sie waren nicht zu Hause, also habe ich Ihr Paket angenommen.“ — das Paket: paket."
    },
    {
      "kind": "short_answer",
      "text": "Wann soll Amir kommen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ab 17 Uhr"
      ],
      "explain": "„Ich bin ab 17 Uhr da.“"
    }
  ],
  "a1-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „___: Jede Wohnung hat einen Tag.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Waschküche"
      ],
      "explain": "„Waschküche: Jede Wohnung hat einen Tag.“ — die Waschküche: çamaşırhane."
    },
    {
      "kind": "short_answer",
      "text": "Wo darf das Fahrrad stehen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Im Keller",
        "Keller"
      ],
      "explain": "„Fahrräder: nur im Keller, nicht im Treppenhaus.“"
    }
  ],
  "a1-l2": [
    {
      "kind": "short_answer",
      "text": "Was soll man für einen Termin machen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Am Vormittag anrufen",
        "Vormittag anrufen"
      ],
      "explain": "„Dann rufen Sie bitte am Vormittag an“ — randevu için öğleden önce aranmalı. 112 sadece acil durumlar için."
    }
  ],
  "a1-l3": [
    {
      "kind": "short_answer",
      "text": "Wann startet das Flugzeug heute? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Um 15 Uhr",
        "15 Uhr"
      ],
      "explain": "„Das Flugzeug startet nicht um 14:20 Uhr, sondern um 15 Uhr“ — rötar yüzünden yeni kalkış saati 15:00. 14:15 kapıya gitme saati."
    }
  ],
  "a1-l4": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Guten Abend! Was möchten Sie ___?“",
      "options": [],
      "answer": 0,
      "accept": [
        "bestellen"
      ],
      "explain": "„Guten Abend! Was möchten Sie bestellen?“ — bestellen: sipariş etmek."
    },
    {
      "kind": "short_answer",
      "text": "Was trinkt Emre? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ein Mineralwasser",
        "Mineralwasser"
      ],
      "explain": "Emre „Ein Mineralwasser, bitte“ diyor. Elma suyu eşinin içeceği."
    }
  ],
  "a1-l5": [
    {
      "kind": "short_answer",
      "text": "Wohin möchte Deniz jetzt gehen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ins Schwimmbad"
      ],
      "explain": "Yeni fikri „Wir gehen ins Schwimmbad!“ — park eski plandı, yağmur yüzünden iptal."
    }
  ],
  "a1-l6": [
    {
      "kind": "short_answer",
      "text": "Woher kommen die Erdbeeren? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Aus Spanien"
      ],
      "explain": "Anonsta „Frische Erdbeeren aus Spanien“ deniyor. Fransa'dan gelen ürün peynir."
    }
  ],
  "a1-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Klose, ___. Sagen Sie mal — war das Ihr Müll gestern? Die Joghurtbecher in der braunen Tonne?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Hausmeister"
      ],
      "explain": "„Klose, Hausmeister. Sagen Sie mal — war das Ihr Müll gestern? Die Joghurtbecher in der braunen Tonne?“ — der Hausmeister: kapıcı."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Blaue ___. Und Glas nicht ins Haus — der Container ist an der Ecke, neben der Bäckerei.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Tonne"
      ],
      "explain": "„Blaue Tonne. Und Glas nicht ins Haus — der Container ist an der Ecke, neben der Bäckerei.“ — die Tonne: çöp konteyneri."
    }
  ],
  "a1-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Guten Morgen. Vier ___, bitte.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Brötchen"
      ],
      "explain": "„Guten Morgen. Vier Brötchen, bitte.“ — das Brötchen: küçük ekmek."
    },
    {
      "kind": "short_answer",
      "text": "Wie soll das Brot geschnitten werden? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "In dünne Scheiben",
        "dünne Scheiben"
      ],
      "explain": "„Dünne, bitte.“"
    }
  ],
  "a1-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Achtung auf ___ 5: Der Zug nach Hamburg, Abfahrt 14:12 Uhr, hat heute etwa zehn Minuten Verspätung.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gleis"
      ],
      "explain": "„Achtung auf Gleis 5: Der Zug nach Hamburg, Abfahrt 14:12 Uhr, hat heute etwa zehn Minuten Verspätung.“ — der Gleis: peron."
    },
    {
      "kind": "short_answer",
      "text": "Ansage 3: Was kostet der Eintritt um 14 Uhr? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nichts"
      ],
      "explain": "„Der Eintritt ist ab 13 Uhr frei“ — saat 14'te ücretsiz."
    }
  ],
  "a1-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Einen was? Ein ___ für Dezember?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kalender"
      ],
      "explain": "„Einen was? Ein Kalender für Dezember?“ — der Kalender: takvim."
    },
    {
      "kind": "short_answer",
      "text": "Wie viele Türchen hat ein Adventskalender? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "24"
      ],
      "explain": "„Er hat 24 kleine Türchen“ — 1'den 24 Aralık'a kadar."
    }
  ],
  "a1-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „___ Dr. Neumann, Schmidt am Apparat. Guten Tag.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Praxis"
      ],
      "explain": "„Praxis Dr. Neumann, Schmidt am Apparat. Guten Tag.“ — die Praxis: muayenehane."
    },
    {
      "kind": "short_answer",
      "text": "Was fragt die Praxis zuerst? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sein Geburtsdatum"
      ],
      "explain": "„Wie ist Ihr Geburtsdatum, bitte?“ — Almanya'da standart kimlik doğrulaması."
    }
  ],
  "a1-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Ich möchte Sie am Samstag zum Essen ___, gegen 18 Uhr. Ich koche etwas aus Syrien. Nicht scharf, keine Sorge.“",
      "options": [],
      "answer": 0,
      "accept": [
        "einladen"
      ],
      "explain": "„Ich möchte Sie am Samstag zum Essen einladen, gegen 18 Uhr. Ich koche etwas aus Syrien. Nicht scharf, keine Sorge.“ — einladen: davet etmek."
    },
    {
      "kind": "short_answer",
      "text": "Wo steht jetzt der Tisch? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "In der Küche",
        "der Küche"
      ],
      "explain": "„Der Tisch von Ihrem Sohn steht jetzt in der Küche.“"
    }
  ],
  "a2-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Gestern habe ich eine ___ gemacht, das war toll!“",
      "options": [],
      "answer": 0,
      "accept": [
        "Hafenrundfahrt"
      ],
      "explain": "„Gestern habe ich eine Hafenrundfahrt gemacht, das war toll!“ — die Hafenrundfahrt: liman turu."
    },
    {
      "kind": "short_answer",
      "text": "Wie lange bleibt Merve in Hamburg? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Bis Sonntag",
        "Sonntag"
      ],
      "explain": "Merve „bleibe noch bis Sonntag“ yazıyor. Pazartesi geliş günü, cumartesi ise arkadaşıyla buluşma günü — ikisi de çeldirici."
    }
  ],
  "a2-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nach zwei Jahren Bauzeit öffnet am Samstag das neue ___ im Stadtteil Gohlis.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schwimmbad"
      ],
      "explain": "„Nach zwei Jahren Bauzeit öffnet am Samstag das neue Schwimmbad im Stadtteil Gohlis.“ — das Schwimmbad: yüzme havuzu."
    },
    {
      "kind": "short_answer",
      "text": "Was kostet der Eintritt am Samstag? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nichts"
      ],
      "explain": "Cumartesi açılış günü ve „Am Eröffnungstag ist der Eintritt frei“ — yani ücretsiz. 5 ve 2,50 Euro pazardan itibaren geçerli fiyatlar."
    }
  ],
  "a2-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Die ___ beträgt 680 Euro plus 120 Euro Nebenkosten.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Miete"
      ],
      "explain": "„Die Miete beträgt 680 Euro plus 120 Euro Nebenkosten.“ — die Miete: kira."
    },
    {
      "kind": "short_answer",
      "text": "Wie viel kostet die Wohnung mit Nebenkosten im Monat? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "800 Euro"
      ],
      "explain": "Kira 680 Euro, yan giderler 120 Euro: toplam 800 Euro. Şıklardaki 680 ve 120 tek başına eksik kalıyor."
    }
  ],
  "a2-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „11 Uhr: ___ mit dem Bürgermeister auf der Hauptbühne.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Eröffnung"
      ],
      "explain": "„11 Uhr: Eröffnung mit dem Bürgermeister auf der Hauptbühne.“ — die Eröffnung: açılış."
    },
    {
      "kind": "short_answer",
      "text": "Was kostet das Konzert für Erwachsene? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "8 Euro"
      ],
      "explain": "„Karten kosten 8 Euro“ — 12 sayısı fiyat değil, ücretsiz giren çocukların yaş sınırı."
    }
  ],
  "a2-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Seit vier Wochen arbeite ich als Verkäuferin in einer ___ in Köln.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Buchhandlung"
      ],
      "explain": "„Seit vier Wochen arbeite ich als Verkäuferin in einer Buchhandlung in Köln.“ — die Buchhandlung: kitapçı."
    },
    {
      "kind": "short_answer",
      "text": "Wo arbeitet die Bloggerin jetzt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "In einer Buchhandlung",
        "einer Buchhandlung"
      ],
      "explain": "İlk cümle: „arbeite ich als Verkäuferin in einer Buchhandlung“. Büro eski işi — çeldirici oradan geliyor."
    }
  ],
  "a2-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich lade Sie herzlich zu einem ___ in unserem Hof ein.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Grillfest"
      ],
      "explain": "„Ich lade Sie herzlich zu einem Grillfest in unserem Hof ein.“ — das Grillfest: mangal partisi."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Es wäre schön, wenn Sie einen Salat oder einen ___ mitbringen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Nachtisch"
      ],
      "explain": "„Es wäre schön, wenn Sie einen Salat oder einen Nachtisch mitbringen.“ — der Nachtisch: tatlı."
    }
  ],
  "a2-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „ich habe endlich eine ___ gefunden, die wirklich passt!“",
      "options": [],
      "answer": 0,
      "accept": [
        "Stelle"
      ],
      "explain": "„ich habe endlich eine Stelle gefunden, die wirklich passt!“ — die Stelle: iş."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Und im ___ sieht meine Zeit ohne Arbeit ziemlich lang aus.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Lebenslauf"
      ],
      "explain": "„Und im Lebenslauf sieht meine Zeit ohne Arbeit ziemlich lang aus.“ — der Lebenslauf: özgeçmiş."
    }
  ],
  "a2-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nach diesem Datum können wir den ___ leider nicht mehr zahlen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Zuschuss"
      ],
      "explain": "„Nach diesem Datum können wir den Zuschuss leider nicht mehr zahlen.“ — der Zuschuss: destek."
    },
    {
      "kind": "short_answer",
      "text": "Was muss Frau Aydın für den neuen Beitrag tun? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nichts"
      ],
      "explain": "„Der Betrag wird automatisch … abgebucht. Sie müssen nichts tun.“"
    }
  ],
  "a2-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Es gibt sogar einen ___ für Menschen, die alte Traktoren reparieren.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Verein"
      ],
      "explain": "„Es gibt sogar einen Verein für Menschen, die alte Traktoren reparieren.“ — der Verein: dernek."
    },
    {
      "kind": "short_answer",
      "text": "Wie viele Menschen sind Mitglied in einem Verein? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Fast jeder zweite"
      ],
      "explain": "„Fast jeder zweite Mensch ist Mitglied in einem.“"
    }
  ],
  "a2-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Abends 17–21 Uhr, ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "flexibel"
      ],
      "explain": "„Abends 17–21 Uhr, flexibel.“ — flexibel: esnek."
    },
    {
      "kind": "short_answer",
      "text": "Hasans Sohn hat schlechte Noten in Mathematik. Welche Anzeige passt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "B"
      ],
      "explain": "B ilanı 5–10. sınıf matematik özel dersi veriyor, ilk ders ücretsiz."
    }
  ],
  "a2-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Die ___ dauert sechs Monate.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Probezeit"
      ],
      "explain": "„Die Probezeit dauert sechs Monate.“ — die Probezeit: deneme süresi."
    },
    {
      "kind": "short_answer",
      "text": "Wie lange dauert die Probezeit? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sechs Monate"
      ],
      "explain": "„Die Probezeit dauert sechs Monate.“ İki hafta deneme süresindeki ihbar süresi."
    }
  ],
  "a2-r12": [
    {
      "kind": "short_answer",
      "text": "Wie lange dauert die ganze Fahrt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Etwa fünfeinhalb Stunden"
      ],
      "explain": "07:14'ten 12:47'ye — yaklaşık 5,5 saat."
    }
  ],
  "a2-l1": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Bitte bringen Sie Ihre Versichertenkarte mit. Und wenn das ___ heute noch höher wird, rufen Sie bitte sofort wieder an.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Fieber"
      ],
      "explain": "„Bitte bringen Sie Ihre Versichertenkarte mit. Und wenn das Fieber heute noch höher wird, rufen Sie bitte sofort wieder an.“ — das Fieber: ateş."
    },
    {
      "kind": "short_answer",
      "text": "Warum passt der Termin am Morgen nicht? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sie muss arbeiten"
      ],
      "explain": "„Morgen früh muss ich arbeiten“ diyor — bu yüzden öğleden sonrayı istiyor."
    }
  ],
  "a2-l2": [
    {
      "kind": "short_answer",
      "text": "Warum kann der Bruder nicht helfen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Er ist krank"
      ],
      "explain": "„Leider hat mein Bruder jetzt abgesagt, weil er krank ist.“"
    }
  ],
  "a2-l3": [
    {
      "kind": "short_answer",
      "text": "Wann ist der Familientag? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Am Sonntag",
        "Sonntag"
      ],
      "explain": "Duyurunun başında: „Am Sonntag findet im Museum für Technik der große Familientag statt.“"
    }
  ],
  "a2-l4": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Herr Öztürk, Sie ___ jeden Morgen hier im Park. Seit wann machen Sie das?“",
      "options": [],
      "answer": 0,
      "accept": [
        "laufen"
      ],
      "explain": "„Herr Öztürk, Sie laufen jeden Morgen hier im Park. Seit wann machen Sie das?“ — laufen: koşmak."
    },
    {
      "kind": "short_answer",
      "text": "Wie lange läuft er heute jeden Morgen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Eine halbe Stunde",
        "halbe Stunde"
      ],
      "explain": "„heute laufe ich jeden Morgen eine halbe Stunde“ — on dakika sadece başlangıçtaki süresiydi."
    }
  ],
  "a2-l5": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Guten Tag. Ich habe dieses Handy vor zwei Wochen bei Ihnen gekauft, aber der ___ ist immer schon am Nachmittag leer.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Akku"
      ],
      "explain": "„Guten Tag. Ich habe dieses Handy vor zwei Wochen bei Ihnen gekauft, aber der Akku ist immer schon am Nachmittag leer.“ — der Akku: batarya."
    },
    {
      "kind": "short_answer",
      "text": "Wann hat die Kundin das Handy gekauft? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Vor zwei Wochen"
      ],
      "explain": "„Ich habe dieses Handy vor zwei Wochen bei Ihnen gekauft.“ Bir hafta ise tamirin süresi."
    }
  ],
  "a2-l6": [
    {
      "kind": "short_answer",
      "text": "Wie viel Verspätung hat der Intercity? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ungefähr 30 Minuten"
      ],
      "explain": "„hat heute ungefähr 30 Minuten Verspätung“ — 20 kalkış saatinin dakikası, 35 ise bölgesel trenin saati."
    }
  ],
  "a2-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Ihre ___ hat uns gefallen. Können Sie am Mittwoch um 14 Uhr zu einem Gespräch kommen?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bewerbung"
      ],
      "explain": "„Ihre Bewerbung hat uns gefallen. Können Sie am Mittwoch um 14 Uhr zu einem Gespräch kommen?“ — die Bewerbung: başvuru."
    },
    {
      "kind": "short_answer",
      "text": "Was soll Pelin mitbringen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ihre Zeugnisse"
      ],
      "explain": "„Bringen Sie bitte Ihre Zeugnisse mit — auch das vom Praktikum.“"
    }
  ],
  "a2-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Frau Aydın, haben Sie die ___ bekommen?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Abrechnung"
      ],
      "explain": "„Frau Aydın, haben Sie die Abrechnung bekommen?“ — die Abrechnung: hesap dökümü."
    },
    {
      "kind": "short_answer",
      "text": "Wie viel muss Pelin nachzahlen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "480 Euro"
      ],
      "explain": "„480 Euro nachzahlen“ — 140 ve 190 aylık peşin ödemeler."
    }
  ],
  "a2-l9": [
    {
      "kind": "short_answer",
      "text": "Gespräch 1: In welcher Farbe gibt es Größe M? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nur in Blau"
      ],
      "explain": "„Größe M haben wir leider nur in Blau.“"
    }
  ],
  "a2-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Weil es im Gesetz steht. Der Sonntag ist ein ___ — das kommt aus der Kirche, gilt aber für alle.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ruhetag"
      ],
      "explain": "„Weil es im Gesetz steht. Der Sonntag ist ein Ruhetag — das kommt aus der Kirche, gilt aber für alle.“ — der Ruhetag: dinlenme günü."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Dann hast du Pech. Es gibt Ausnahmen: Tankstellen, Bahnhöfe, Flughäfen. Manche ___ machen morgens für drei Stunden auf.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bäcker"
      ],
      "explain": "„Dann hast du Pech. Es gibt Ausnahmen: Tankstellen, Bahnhöfe, Flughäfen. Manche Bäcker machen morgens für drei Stunden auf.“ — der Bäcker: fırıncı."
    }
  ],
  "a2-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Das tut mir leid. Ihre ___, bitte?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bestellnummer"
      ],
      "explain": "„Das tut mir leid. Ihre Bestellnummer, bitte?“ — die Bestellnummer: sipariş numarası."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Danke … Ich sehe es. Der Schrank ist nicht im ___. Der neue Termin ist der 22., also in zwei Wochen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Lager"
      ],
      "explain": "„Danke … Ich sehe es. Der Schrank ist nicht im Lager. Der neue Termin ist der 22., also in zwei Wochen.“ — das Lager: depo."
    }
  ],
  "a2-l12": [
    {
      "kind": "short_answer",
      "text": "Wie fühlt sie sich am Ende? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Erschöpft, aber stolz"
      ],
      "explain": "„Ich bin total erschöpft, aber … ich bin auch ein bisschen stolz.“"
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Pelin).",
      "options": [],
      "answer": 0,
      "accept": [
        "Ceyda! Ich bin durch. Erster Tag geschafft."
      ],
      "explain": "„Ceyda! Ich bin durch. Erster Tag geschafft.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b1-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Gegen diese ___ engagiert sich das Repair-Café in Leipzig-Plagwitz.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Verschwendung"
      ],
      "explain": "„Gegen diese Verschwendung engagiert sich das Repair-Café in Leipzig-Plagwitz.“ — die Verschwendung: israf."
    },
    {
      "kind": "short_answer",
      "text": "Wie viele der gebrachten Geräte funktionieren nach der Reparatur wieder? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Etwa siebzig Prozent"
      ],
      "explain": "Karin Melzer'in sözlerinde geçiyor: „Etwa siebzig Prozent der Geräte … funktionieren danach wieder.“"
    }
  ],
  "b1-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Vor sechs Wochen habe ich ein ___ gestartet: einen Monat ohne Instagram, TikTok und Co.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Experiment"
      ],
      "explain": "„Vor sechs Wochen habe ich ein Experiment gestartet: einen Monat ohne Instagram, TikTok und Co.“ — das Experiment: deney."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Mein Fazit: Ganz ___ möchte ich nicht, aber ich habe mir feste Regeln gesetzt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "verzichten"
      ],
      "explain": "„Mein Fazit: Ganz verzichten möchte ich nicht, aber ich habe mir feste Regeln gesetzt.“ — verzichten auf: bir şeyden vazgeçmek."
    }
  ],
  "b1-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „vielen Dank für Ihre ___ um ein Praktikum in unserer Online-Redaktion.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bewerbung"
      ],
      "explain": "„vielen Dank für Ihre Bewerbung um ein Praktikum in unserer Online-Redaktion.“ — die Bewerbung: başvuru."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Leider können wir das ___ nicht bezahlen, aber Sie erhalten ein Ticket für den Nahverkehr und ein Mittagessen in unserer Kantine.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Praktikum"
      ],
      "explain": "„Leider können wir das Praktikum nicht bezahlen, aber Sie erhalten ein Ticket für den Nahverkehr und ein Mittagessen in unserer Kantine.“ — das Praktikum: staj."
    }
  ],
  "b1-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Dabei lässt sich gesunde ___ auch mit wenig Zeit organisieren.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ernährung"
      ],
      "explain": "„Dabei lässt sich gesunde Ernährung auch mit wenig Zeit organisieren.“ — die Ernährung: beslenme."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Viele ___ trinken zu wenig, was zu Kopfschmerzen und Müdigkeit führen kann.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Beschäftigte"
      ],
      "explain": "„Viele Beschäftigte trinken zu wenig, was zu Kopfschmerzen und Müdigkeit führen kann.“ — der Beschäftigte: çalışan."
    }
  ],
  "b1-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „mit großem Interesse habe ich Ihren Artikel über die geplante ___ in der Bahnhofstraße gelesen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Fußgängerzone"
      ],
      "explain": "„mit großem Interesse habe ich Ihren Artikel über die geplante Fußgängerzone in der Bahnhofstraße gelesen.“ — die Fußgängerzone: yaya bölgesi."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Als ___ kann ich die Kritik einiger Geschäftsleute nicht verstehen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Anwohnerin"
      ],
      "explain": "„Als Anwohnerin kann ich die Kritik einiger Geschäftsleute nicht verstehen.“ — die Anwohnerin: mahalle sakini."
    }
  ],
  "b1-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Immer mehr deutsche ___ testen die Vier-Tage-Woche.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Unternehmen"
      ],
      "explain": "„Immer mehr deutsche Unternehmen testen die Vier-Tage-Woche.“ — das Unternehmen: şirket."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Die Idee: Die Beschäftigten arbeiten nur noch vier Tage, bekommen aber das gleiche ___ wie vorher.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gehalt"
      ],
      "explain": "„Die Idee: Die Beschäftigten arbeiten nur noch vier Tage, bekommen aber das gleiche Gehalt wie vorher.“ — das Gehalt: maaş."
    }
  ],
  "b1-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Jetzt will ich mich ___ machen — ein kleines Café mit syrischem Frühstück, 20 Plätze.“",
      "options": [],
      "answer": 0,
      "accept": [
        "selbstständig"
      ],
      "explain": "„Jetzt will ich mich selbstständig machen — ein kleines Café mit syrischem Frühstück, 20 Plätze.“ — sich selbstständig machen: kendi işini kurmak."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich habe 18.000 Euro ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ersparnisse"
      ],
      "explain": "„Ich habe 18.000 Euro Ersparnisse.“ — die Ersparnisse: birikim."
    }
  ],
  "b1-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wer in Deutschland ein ___ betreibt, muss es anmelden — vor dem ersten Arbeitstag, nicht danach.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gewerbe"
      ],
      "explain": "„Wer in Deutschland ein Gewerbe betreibt, muss es anmelden — vor dem ersten Arbeitstag, nicht danach.“ — das Gewerbe: ticari işletme."
    },
    {
      "kind": "short_answer",
      "text": "Was dauert am längsten? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Die Gaststättenerlaubnis",
        "Gaststättenerlaubnis"
      ],
      "explain": "Kayıt 15 dakika, sağlık eğitimi bir saat; işletme izni 6–12 hafta."
    }
  ],
  "b1-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „In der IT-___, in Start-ups, in Sportgeschäften und bei IKEA werden alle geduzt, vom Praktikanten bis zur Chefin.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Branche"
      ],
      "explain": "„In der IT-Branche, in Start-ups, in Sportgeschäften und bei IKEA werden alle geduzt, vom Praktikanten bis zur Chefin.“ — die Branche: sektör."
    },
    {
      "kind": "short_answer",
      "text": "Welcher Fehler ist laut Text kleiner? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Zu lange siezen",
        "lange siezen"
      ],
      "explain": "Soğuk görünmek, fazla senli benli olmaktan daha kolay düzeltilir."
    }
  ],
  "b1-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „TEXT 5: Wer Hilfe beim Heizen braucht, kann bis Ende Oktober einen ___ stellen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Antrag"
      ],
      "explain": "„TEXT 5: Wer Hilfe beim Heizen braucht, kann bis Ende Oktober einen Antrag stellen.“ — der Antrag: başvuru."
    },
    {
      "kind": "short_answer",
      "text": "Welche Überschrift passt zu Text 1? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "b"
      ],
      "explain": "4 numaralı hat hafta sonu on dakikada bir — yani daha sık sefer."
    }
  ],
  "b1-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Trotzdem können wir den Antrag nicht in voller Höhe ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "bewilligen"
      ],
      "explain": "„Trotzdem können wir den Antrag nicht in voller Höhe bewilligen.“ — bewilligen: onaylamak."
    },
    {
      "kind": "short_answer",
      "text": "Wie viel bekommt Tarek? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "30.000 Euro"
      ],
      "explain": "45.000 istedi, banka 30.000 teklif ediyor; 18.000 kendi parası."
    }
  ],
  "b1-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „In Deutschland hat jede Arbeitnehmerin das Recht auf ein ___ — und dieses Zeugnis muss wohlwollend formuliert sein.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Arbeitszeugnis"
      ],
      "explain": "„In Deutschland hat jede Arbeitnehmerin das Recht auf ein Arbeitszeugnis — und dieses Zeugnis muss wohlwollend formuliert sein.“ — das Arbeitszeugnis: çalışma belgesi."
    },
    {
      "kind": "short_answer",
      "text": "Was bedeutet „stets zur vollen Zufriedenheit“? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Gut"
      ],
      "explain": "„vollsten“ = sehr gut, „stets zur vollen“ = gut."
    }
  ],
  "b1-l1": [
    {
      "kind": "short_answer",
      "text": "Wann beginnt die Lange Nacht der Museen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Um 18 Uhr",
        "18 Uhr"
      ],
      "explain": "Duyuruda etkinliğin akşam 18'den gece 1'e kadar sürdüğü söyleniyor. 20 Uhr yalnızca robot etkinliğinin başlangıcı — dikkat çeldiriciye."
    }
  ],
  "b1-l2": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Wie sind Sie zu diesem ___ gekommen?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ehrenamt"
      ],
      "explain": "„Wie sind Sie zu diesem Ehrenamt gekommen?“ — das Ehrenamt: gönüllü görev."
    },
    {
      "kind": "short_answer",
      "text": "Wie hat Herr Weber von der Tafel erfahren? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Durch einen Zeitungsartikel"
      ],
      "explain": "Emekli olduktan sonra Tafel hakkında bir gazete makalesi okumuş („einen Zeitungsartikel über die Tafel gelesen“) ve ertesi gün aramış."
    }
  ],
  "b1-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Hallo Elif! Hast du schon gehört? Auf der freien Fläche hinter unserem Haus soll ein ___ entstehen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gemeinschaftsgarten"
      ],
      "explain": "„Hallo Elif! Hast du schon gehört? Auf der freien Fläche hinter unserem Haus soll ein Gemeinschaftsgarten entstehen.“ — der Gemeinschaftsgarten: ortak bahçe."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Jonas).",
      "options": [],
      "answer": 0,
      "accept": [
        "Super! Ich hole dich um kurz vor zehn ab."
      ],
      "explain": "„Super! Ich hole dich um kurz vor zehn ab.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b1-l4": [
    {
      "kind": "short_answer",
      "text": "Wohin sollen Besucher gehen, die sich für den Containerhafen interessieren? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Zur Station sechs"
      ],
      "explain": "Son bölümde modern konteyner limanını merak edenlerin mavi oku izleyip yan salondaki altıncı istasyona geçmesi isteniyor."
    }
  ],
  "b1-l5": [
    {
      "kind": "short_answer",
      "text": "Wo findet diese Durchsage statt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "An einer Volkshochschule"
      ],
      "explain": "Anonsun başında yer belirtiliyor: Bochum Volkshochschule'nin açık kapı günü."
    }
  ],
  "b1-l6": [
    {
      "kind": "short_answer",
      "text": "Wie lange nutzen Jugendliche ihr Smartphone im Durchschnitt pro Tag? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Dreieinhalb Stunden"
      ],
      "explain": "Frau Lindner araştırmanın sonucunu veriyor: 12-17 yaş arası gençler telefonlarını günde ortalama üç buçuk saat („dreieinhalb Stunden“) kullanıyor."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Moderator).",
      "options": [],
      "answer": 0,
      "accept": [
        "Und schaffen sie das auch?"
      ],
      "explain": "„Und schaffen sie das auch?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b1-l7": [
    {
      "kind": "short_answer",
      "text": "Wie viel Umsatzsteuer gilt für Essen zum Mitnehmen? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "7 Prozent"
      ],
      "explain": "Kafede yemek %19, paket %7."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Tarek).",
      "options": [],
      "answer": 0,
      "accept": [
        "Was muss ich sonst noch tun?"
      ],
      "explain": "„Was muss ich sonst noch tun?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b1-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Dann komme ich nächste Woche vorbei und schaue es mir an. Das kostet nichts. Danach bekommen Sie einen schriftlichen ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kostenvoranschlag"
      ],
      "explain": "„Dann komme ich nächste Woche vorbei und schaue es mir an. Das kostet nichts. Danach bekommen Sie einen schriftlichen Kostenvoranschlag.“ — der Kostenvoranschlag: fiyat teklifi."
    },
    {
      "kind": "short_answer",
      "text": "Was kostet der erste Besuch? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nichts"
      ],
      "explain": "„Das kostet nichts. Danach bekommen Sie einen schriftlichen Kostenvoranschlag.“"
    }
  ],
  "b1-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Wahrscheinlich eine Verlängerung um ein Jahr — mit festen Lieferzeiten am Morgen. Eine endgültige ___ will im Moment niemand beschließen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Sperrung"
      ],
      "explain": "„Wahrscheinlich eine Verlängerung um ein Jahr — mit festen Lieferzeiten am Morgen. Eine endgültige Sperrung will im Moment niemand beschließen.“ — die Sperrung: kapatma."
    }
  ],
  "b1-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Teils. Im Beruf und bei Terminen mit Institutionen: ja, sehr. Im Privaten ist es viel lockerer, als das ___ sagt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Klischee"
      ],
      "explain": "„Teils. Im Beruf und bei Terminen mit Institutionen: ja, sehr. Im Privaten ist es viel lockerer, als das Klischee sagt.“ — das Klischee: klişe."
    },
    {
      "kind": "short_answer",
      "text": "Was ist bei einer Verspätung am wichtigsten? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Eine kurze Nachricht",
        "kurze Nachricht"
      ],
      "explain": "„Nicht die Zeit ist heilig, sondern die Information.“"
    }
  ],
  "b1-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Jonas, hast du kurz Zeit? Ich möchte etwas ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "ansprechen"
      ],
      "explain": "„Jonas, hast du kurz Zeit? Ich möchte etwas ansprechen.“ — ansprechen: konuyu açmak."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Lea).",
      "options": [],
      "answer": 0,
      "accept": [
        "Jonas, hast du kurz Zeit? Ich möchte etwas ansprechen."
      ],
      "explain": "„Jonas, hast du kurz Zeit? Ich möchte etwas ansprechen.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b1-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Herr Haddad, seit heute Morgen um sieben steht hier eine ___. Haben Sie damit gerechnet?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schlange"
      ],
      "explain": "„Herr Haddad, seit heute Morgen um sieben steht hier eine Schlange. Haben Sie damit gerechnet?“ — die Schlange: kuyruk."
    },
    {
      "kind": "short_answer",
      "text": "Wie lange hat der ganze Weg gedauert? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "14 Monate"
      ],
      "explain": "„Vierzehn Monate. Neun davon nur Papier.“"
    }
  ],
  "b2-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Problematisch wird es jedoch dort, wo ___ in Abhängigkeit umschlägt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bequemlichkeit"
      ],
      "explain": "„Problematisch wird es jedoch dort, wo Bequemlichkeit in Abhängigkeit umschlägt.“ — die Bequemlichkeit: rahatlık."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Der Verbraucherzentrale Bundesverband fordert deshalb seit Langem eine ___ für KI-generierte Inhalte – bislang vergeblich.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kennzeichnungspflicht"
      ],
      "explain": "„Der Verbraucherzentrale Bundesverband fordert deshalb seit Langem eine Kennzeichnungspflicht für KI-generierte Inhalte – bislang vergeblich.“ — die Kennzeichnungspflicht: etiketleme zorunluluğu."
    }
  ],
  "b2-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „In deutschen Heizungskellern vollzieht sich derzeit ein leiser Wandel: Immer mehr Haushalte ersetzen ihre Gas- oder Ölheizung durch eine ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wärmepumpe"
      ],
      "explain": "„In deutschen Heizungskellern vollzieht sich derzeit ein leiser Wandel: Immer mehr Haushalte ersetzen ihre Gas- oder Ölheizung durch eine Wärmepumpe.“ — die Wärmepumpe: ısı pompası."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Kritiker wenden ein, die Geräte seien in der ___ zu teuer und für ältere, schlecht gedämmte Gebäude ungeeignet.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Anschaffung"
      ],
      "explain": "„Kritiker wenden ein, die Geräte seien in der Anschaffung zu teuer und für ältere, schlecht gedämmte Gebäude ungeeignet.“ — die Anschaffung: satın alma."
    }
  ],
  "b2-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ist das Homeoffice ein ___?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Auslaufmodell"
      ],
      "explain": "„Ist das Homeoffice ein Auslaufmodell?“ — das Auslaufmodell: modası geçen model."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Das eigentliche Risiko ist nicht Faulheit, sondern ___: Wenn der Laptop im Wohnzimmer steht, fällt es schwer, abends abzuschalten.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Entgrenzung"
      ],
      "explain": "„Das eigentliche Risiko ist nicht Faulheit, sondern Entgrenzung: Wenn der Laptop im Wohnzimmer steht, fällt es schwer, abends abzuschalten.“ — die Entgrenzung: sınırların silinmesi."
    }
  ],
  "b2-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Rund 22 Kilogramm ___ produziert jeder Mensch in der Europäischen Union pro Jahr; nur ein Bruchteil davon wird recycelt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Elektroschrott"
      ],
      "explain": "„Rund 22 Kilogramm Elektroschrott produziert jeder Mensch in der Europäischen Union pro Jahr; nur ein Bruchteil davon wird recycelt.“ — der Elektroschrott: elektronik atık."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Dass die EU nun ein Recht auf Reparatur beschlossen hat, ist deshalb ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "überfällig"
      ],
      "explain": "„Dass die EU nun ein Recht auf Reparatur beschlossen hat, ist deshalb überfällig.“ — überfällig: çoktan gecikmiş."
    }
  ],
  "b2-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Der aktuelle nationale Bildungsbericht, der im Auftrag der Kultusministerkonferenz erstellt wurde, widmet der sprachlichen ___ an deutschen Schulen erstmals ein eigenes Kapitel.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Vielfalt"
      ],
      "explain": "„Der aktuelle nationale Bildungsbericht, der im Auftrag der Kultusministerkonferenz erstellt wurde, widmet der sprachlichen Vielfalt an deutschen Schulen erstmals ein eigenes Kapitel.“ — die Vielfalt: çeşitlilik."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Entgegen einer verbreiteten ___ wirkt sich Mehrsprachigkeit dem Bericht zufolge nicht negativ auf den Schulerfolg aus.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Annahme"
      ],
      "explain": "„Entgegen einer verbreiteten Annahme wirkt sich Mehrsprachigkeit dem Bericht zufolge nicht negativ auf den Schulerfolg aus.“ — die Annahme: varsayım."
    }
  ],
  "b2-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Darüber hinaus entfallen zwölf Parkplätze, wofür im Parkhaus an der Bergstraße vergünstigte Dauerstellplätze für ___ eingerichtet werden.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Anwohner"
      ],
      "explain": "„Darüber hinaus entfallen zwölf Parkplätze, wofür im Parkhaus an der Bergstraße vergünstigte Dauerstellplätze für Anwohner eingerichtet werden.“ — der Anwohner: mahalle sakini."
    },
    {
      "kind": "short_answer",
      "text": "Was sollen Interessierte vor der Informationsveranstaltung tun? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sich telefonisch anmelden"
      ],
      "explain": "Son paragrafta „Um Anmeldung unter der unten angegebenen Telefonnummer wird gebeten“ deniyor — telefonla kayıt rica ediliyor."
    }
  ],
  "b2-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „ich schreibe Ihnen ___ und ich weiß, dass das den Wert meiner Aussage senkt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "anonym"
      ],
      "explain": "„ich schreibe Ihnen anonym und ich weiß, dass das den Wert meiner Aussage senkt.“ — anonym: anonim."
    }
  ],
  "b2-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Der wichtigste Satz zuerst: In Betrieben mit mehr als zehn Beschäftigten und nach sechs Monaten im Job gilt der ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kündigungsschutz"
      ],
      "explain": "„Der wichtigste Satz zuerst: In Betrieben mit mehr als zehn Beschäftigten und nach sechs Monaten im Job gilt der Kündigungsschutz.“ — der Kündigungsschutz: iş güvencesi."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Verhaltensbedingt bedeutet, dass jemand Regeln verletzt — hier ist fast immer eine ___ nötig, und zwar für genau dasselbe Verhalten.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Abmahnung"
      ],
      "explain": "„Verhaltensbedingt bedeutet, dass jemand Regeln verletzt — hier ist fast immer eine Abmahnung nötig, und zwar für genau dasselbe Verhalten.“ — die Abmahnung: yazılı uyarı."
    }
  ],
  "b2-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ein ___ dagegen liegt auf dem Weg zur Arbeit.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Stolperstein"
      ],
      "explain": "„Ein Stolperstein dagegen liegt auf dem Weg zur Arbeit.“ — der Stolperstein: tökezleme taşı."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Die Stolpersteine sind das größte dezentrale ___ der Welt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Denkmal"
      ],
      "explain": "„Die Stolpersteine sind das größte dezentrale Denkmal der Welt.“ — das Denkmal: anıt."
    }
  ],
  "b2-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Thema: Sollte die ___ zum Standard werden?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Vier-Tage-Woche"
      ],
      "explain": "„Thema: Sollte die Vier-Tage-Woche zum Standard werden?“ — die Vier-Tage-Woche: dört günlük çalışma haftası."
    },
    {
      "kind": "short_answer",
      "text": "Wer nennt einen konkreten Grund, warum die Produktivität nicht fiel? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Annika"
      ],
      "explain": "„Wir haben aufgehört, sinnlose Meetings zu machen.“"
    }
  ],
  "b2-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Zur Frage nach den Umkleidezeiten: Die ___ für Beschäftigte externer Dienstleister werden zwischen dem jeweiligen Dienstleister und seinen Mitarbeitenden geregelt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rahmenbedingungen"
      ],
      "explain": "„Zur Frage nach den Umkleidezeiten: Die Rahmenbedingungen für Beschäftigte externer Dienstleister werden zwischen dem jeweiligen Dienstleister und seinen Mitarbeitenden geregelt.“ — die Rahmenbedingungen: genel koşullar."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Zur Frage nach Vertragsverlängerungen: Über den Einsatz von Beschäftigten der ___ entscheiden diese eigenständig, unter Berücksichtigung des jeweiligen Bedarfs.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Dienstleister"
      ],
      "explain": "„Zur Frage nach Vertragsverlängerungen: Über den Einsatz von Beschäftigten der Dienstleister entscheiden diese eigenständig, unter Berücksichtigung des jeweiligen Bedarfs.“ — der Dienstleister: hizmet sağlayıcı."
    }
  ],
  "b2-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ein verbreiteter Irrtum betrifft die ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Einwilligung"
      ],
      "explain": "„Ein verbreiteter Irrtum betrifft die Einwilligung.“ — die Einwilligung: rıza."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wo ein ___ existiert, muss er technischen Einrichtungen zustimmen, die Verhalten oder Leistung überwachen können.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Betriebsrat"
      ],
      "explain": "„Wo ein Betriebsrat existiert, muss er technischen Einrichtungen zustimmen, die Verhalten oder Leistung überwachen können.“ — der Betriebsrat: işçi konseyi."
    }
  ],
  "b2-l2": [
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Moderatorin).",
      "options": [],
      "answer": 0,
      "accept": [
        "Was raten Sie Menschen mit Einschlafproblemen?"
      ],
      "explain": "„Was raten Sie Menschen mit Einschlafproblemen?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l4": [
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Nachrichtensprecher).",
      "options": [],
      "answer": 0,
      "accept": [
        "Und worin bestehen die Einschränkungen?"
      ],
      "explain": "„Und worin bestehen die Einschränkungen?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l5": [
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Moderatorin).",
      "options": [],
      "answer": 0,
      "accept": [
        "Frau Berger, wie erleben die Betriebe die Situation?"
      ],
      "explain": "„Frau Berger, wie erleben die Betriebe die Situation?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l6": [
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Moderator).",
      "options": [],
      "answer": 0,
      "accept": [
        "Woran liegt das Ihrer Meinung nach?"
      ],
      "explain": "„Woran liegt das Ihrer Meinung nach?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Das ist der Punkt, an dem die Geschichte ___ wird. Können Sie das belegen?“",
      "options": [],
      "answer": 0,
      "accept": [
        "belastbar"
      ],
      "explain": "„Das ist der Punkt, an dem die Geschichte belastbar wird. Können Sie das belegen?“ — belastbar: sağlam."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Nora).",
      "options": [],
      "answer": 0,
      "accept": [
        "Waren Sie selbst dabei?"
      ],
      "explain": "„Waren Sie selbst dabei?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Ich sage Ihnen offen: 58 kann ich in diesem Jahr nicht zusagen. Das ___ ist bis März verteilt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Budget"
      ],
      "explain": "„Ich sage Ihnen offen: 58 kann ich in diesem Jahr nicht zusagen. Das Budget ist bis März verteilt.“ — das Budget: bütçe."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Frau Reuter).",
      "options": [],
      "answer": 0,
      "accept": [
        "Sie wollten über Ihr Gehalt sprechen. Schießen Sie los."
      ],
      "explain": "„Sie wollten über Ihr Gehalt sprechen. Schießen Sie los.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „In den Interviews taucht immer wieder dasselbe Wort auf: ___. Nicht „Ich verstehe es nicht“, sondern „Ich kann sowieso nichts tun“.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ohnmacht"
      ],
      "explain": "„In den Interviews taucht immer wieder dasselbe Wort auf: Ohnmacht. Nicht „Ich verstehe es nicht“, sondern „Ich kann sowieso nichts tun“.“ — die Ohnmacht: çaresizlik."
    },
    {
      "kind": "short_answer",
      "text": "Welche Erklärung weist die Referentin zurück? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Desinteresse"
      ],
      "explain": "„Sie ist falsch“ — en çok kaçınan grup ilgisizler değil, yükü ağır olanlar."
    }
  ],
  "b2-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Das Argument nehme ich ernst, ehrlich. Aber die ___ war bei jeder sprachlichen Änderung groß. „Frau Doktor“ war einmal lächerlich.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ablehnung"
      ],
      "explain": "„Das Argument nehme ich ernst, ehrlich. Aber die Ablehnung war bei jeder sprachlichen Änderung groß. „Frau Doktor“ war einmal lächerlich.“ — die Ablehnung: reddetme."
    },
    {
      "kind": "short_answer",
      "text": "Welches Beispiel nennt er für gelungenen Sprachwandel? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "„Studierende“"
      ],
      "explain": "Pratik olduğu için kendiliğinden yerleşmiş."
    }
  ],
  "b2-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Setzen Sie sich. Und vorweg: Alles hier unterliegt der ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schweigepflicht"
      ],
      "explain": "„Setzen Sie sich. Und vorweg: Alles hier unterliegt der Schweigepflicht.“ — die Schweigepflicht: sır saklama yükümlülüğü."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Mitarbeiterin).",
      "options": [],
      "answer": 0,
      "accept": [
        "Dauerhaft. Ich habe zwei Kinder, sieben und zehn."
      ],
      "explain": "„Dauerhaft. Ich habe zwei Kinder, sieben und zehn.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "b2-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Das ist Gegenstand der ___. Ich bitte um Verständnis, dass ich dem nicht vorgreife.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Prüfung"
      ],
      "explain": "„Das ist Gegenstand der Prüfung. Ich bitte um Verständnis, dass ich dem nicht vorgreife.“ — die Prüfung: inceleme."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Journalist 1).",
      "options": [],
      "answer": 0,
      "accept": [
        "Warum die Rückzahlung, wenn nichts falsch war?"
      ],
      "explain": "„Warum die Rückzahlung, wenn nichts falsch war?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "c1-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Doch dieser Vertrauensvorschuss beruht auf einer folgenreichen Verwechslung: Rechenleistung ist nicht ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Urteilskraft"
      ],
      "explain": "„Doch dieser Vertrauensvorschuss beruht auf einer folgenreichen Verwechslung: Rechenleistung ist nicht Urteilskraft.“ — die Urteilskraft: muhakeme gücü."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Daraus folgt nicht, algorithmische Systeme zu verbieten; eine solche Forderung wäre so ___ wie wirkungslos.“",
      "options": [],
      "answer": 0,
      "accept": [
        "wohlfeil"
      ],
      "explain": "„Daraus folgt nicht, algorithmische Systeme zu verbieten; eine solche Forderung wäre so wohlfeil wie wirkungslos.“ — wohlfeil: kolaycı."
    }
  ],
  "c1-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Doch während die Kommunen ___ Räume und Personal suchen, mehren sich die Zweifel, ob der Ausbau hält, was die Politik verspricht.“",
      "options": [],
      "answer": 0,
      "accept": [
        "händeringend"
      ],
      "explain": "„Doch während die Kommunen händeringend Räume und Personal suchen, mehren sich die Zweifel, ob der Ausbau hält, was die Politik verspricht.“ — händeringend: çaresizce."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Das zentrale Ergebnis wirkt zunächst ___: Der bloße Besuch einer Ganztagsschule verbessert die Leistungen in Deutsch und Mathematik im Durchschnitt kaum.“",
      "options": [],
      "answer": 0,
      "accept": [
        "ernüchternd"
      ],
      "explain": "„Das zentrale Ergebnis wirkt zunächst ernüchternd: Der bloße Besuch einer Ganztagsschule verbessert die Leistungen in Deutsch und Mathematik im Durchschnitt kaum.“ — ernüchternd: hayal kırıklığı yaratan."
    }
  ],
  "c1-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Der deutsche Arbeitsmarkt steht vor der tiefgreifendsten ___ seit der Wiedervereinigung.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Umwälzung"
      ],
      "explain": "„Der deutsche Arbeitsmarkt steht vor der tiefgreifendsten Umwälzung seit der Wiedervereinigung.“ — die Umwälzung: köklü dönüşüm."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Die Lücke von über zwei Millionen Arbeitskräften trifft eine Volkswirtschaft, deren Wohlstandsmodell auf industrieller ___ und einem dichten Netz mittelständischer Betriebe beruht.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wertschöpfung"
      ],
      "explain": "„Die Lücke von über zwei Millionen Arbeitskräften trifft eine Volkswirtschaft, deren Wohlstandsmodell auf industrieller Wertschöpfung und einem dichten Netz mittelständischer Betriebe beruht.“ — die Wertschöpfung: katma değer."
    }
  ],
  "c1-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Frau Professor Demir, Sie behaupten, ___ werde in Deutschland noch immer als Problem behandelt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Mehrsprachigkeit"
      ],
      "explain": "„Frau Professor Demir, Sie behaupten, Mehrsprachigkeit werde in Deutschland noch immer als Problem behandelt.“ — die Mehrsprachigkeit: çok dillilik."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Und wir sollten aufhören, ___ und Familiensprache gegeneinander auszuspielen: Ziel ist nicht weniger Deutsch, sondern mehr Sprachbewusstsein insgesamt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bildungssprache"
      ],
      "explain": "„Und wir sollten aufhören, Bildungssprache und Familiensprache gegeneinander auszuspielen: Ziel ist nicht weniger Deutsch, sondern mehr Sprachbewusstsein insgesamt.“ — die Bildungssprache: akademik dil."
    }
  ],
  "c1-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Die ___ dahinter ist sympathisch – das Museum, einst Tempel des Bildungsbürgertums, öffnet sich endlich allen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Verheißung"
      ],
      "explain": "„Die Verheißung dahinter ist sympathisch – das Museum, einst Tempel des Bildungsbürgertums, öffnet sich endlich allen.“ — die Verheißung: vaat."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Museen, deren ___ höher lag als ihre Besucherzahlen, haben ihren öffentlichen Auftrag verfehlt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schwellenangst"
      ],
      "explain": "„Museen, deren Schwellenangst höher lag als ihre Besucherzahlen, haben ihren öffentlichen Auftrag verfehlt.“ — die Schwellenangst: eşik korkusu."
    }
  ],
  "c1-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Pandemie, Kriege und Handelskonflikte, heißt es, beendeten das Zeitalter der grenzenlosen ___; die Zukunft gehöre der heimischen Fabrik.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Arbeitsteilung"
      ],
      "explain": "„Pandemie, Kriege und Handelskonflikte, heißt es, beendeten das Zeitalter der grenzenlosen Arbeitsteilung; die Zukunft gehöre der heimischen Fabrik.“ — die Arbeitsteilung: iş bölümü."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Von einer breiten ___ kann dennoch keine Rede sein.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rückverlagerung"
      ],
      "explain": "„Von einer breiten Rückverlagerung kann dennoch keine Rede sein.“ — die Rückverlagerung: üretimi geri taşıma."
    }
  ],
  "c1-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Jede ___ ist ein Eingriff.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Übersetzung"
      ],
      "explain": "„Jede Übersetzung ist ein Eingriff.“ — die Übersetzung: çeviri."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Denn die alte Frage — ___ oder Klang — ist falsch gestellt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Treue"
      ],
      "explain": "„Denn die alte Frage — Treue oder Klang — ist falsch gestellt.“ — die Treue: sadakat."
    }
  ],
  "c1-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wer in Deutschland ___ arbeitet, unterschreibt oft Verträge, die von großen Auftraggebern formuliert wurden.“",
      "options": [],
      "answer": 0,
      "accept": [
        "freiberuflich"
      ],
      "explain": "„Wer in Deutschland freiberuflich arbeitet, unterschreibt oft Verträge, die von großen Auftraggebern formuliert wurden.“ — freiberuflich: serbest çalışan."
    },
    {
      "kind": "short_answer",
      "text": "Welche gesetzliche Zahlungsfrist gilt ohne besondere Vereinbarung? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "30 Tage"
      ],
      "explain": "60 ve 90 gün sözleşmeyle uzatılabilen sürelerdir."
    }
  ],
  "c1-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Der Umbau zu Mischwäldern dauert Jahrzehnte und sieht in den ersten Jahren nicht nach ___ aus, sondern nach Baustelle.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Sehnsucht"
      ],
      "explain": "„Der Umbau zu Mischwäldern dauert Jahrzehnte und sieht in den ersten Jahren nicht nach Sehnsucht aus, sondern nach Baustelle.“ — die Sehnsucht: özlem."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Sie wurden gepflanzt, weil sie schnell wachsen und gerade sind — ___, kein Märchenwald.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Nutzwald"
      ],
      "explain": "„Sie wurden gepflanzt, weil sie schnell wachsen und gerade sind — Nutzwald, kein Märchenwald.“ — der Nutzwald: üretim ormanı."
    }
  ],
  "c1-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wenn Beförderung von Anwesenheit abhängt, sei das ein ___ über die Beurteilungspraxis, nicht über die Beschäftigten.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Befund"
      ],
      "explain": "„Wenn Beförderung von Anwesenheit abhängt, sei das ein Befund über die Beurteilungspraxis, nicht über die Beschäftigten.“ — der Befund: bulgu."
    }
  ],
  "c1-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Der erste Einwand lautet, ich hätte diesen Roman nicht übersetzen sollen, weil mir die ___ fehle, aus der er geschrieben ist.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Erfahrung"
      ],
      "explain": "„Der erste Einwand lautet, ich hätte diesen Roman nicht übersetzen sollen, weil mir die Erfahrung fehle, aus der er geschrieben ist.“ — die Erfahrung: deneyim."
    },
    {
      "kind": "short_answer",
      "text": "Womit verwechselt der Einwand die Übersetzung, laut Miriam? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Mit Vertretung",
        "Vertretung"
      ],
      "explain": "„Eine Übersetzerin spricht nicht für die Autorin.“"
    }
  ],
  "c1-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Entscheidend ist die ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rückkehr"
      ],
      "explain": "„Entscheidend ist die Rückkehr.“ — die Rückkehr: dönüş."
    }
  ],
  "c1-l2": [
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Moderatorin).",
      "options": [],
      "answer": 0,
      "accept": [
        "Herr Roth, Sie sind Landschaftsarchitekt und sehen das kritischer."
      ],
      "explain": "„Herr Roth, Sie sind Landschaftsarchitekt und sehen das kritischer.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "c1-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Herr Professor Lehmann, Sie erforschen den Einsatz künstlicher Intelligenz in der medizinischen ___. Wie gut sind diese Systeme inzwischen wirklich?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Diagnostik"
      ],
      "explain": "„Herr Professor Lehmann, Sie erforschen den Einsatz künstlicher Intelligenz in der medizinischen Diagnostik. Wie gut sind diese Systeme inzwischen wirklich?“ — die Diagnostik: tanı bilimi."
    }
  ],
  "c1-l6": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Technik folgt dem ___, nicht umgekehrt – das scheint mir das Fazit dieser Runde. Vielen Dank Ihnen beiden.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Konzept"
      ],
      "explain": "„Technik folgt dem Konzept, nicht umgekehrt – das scheint mir das Fazit dieser Runde. Vielen Dank Ihnen beiden.“ — das Konzept: konsept."
    }
  ],
  "c1-l7": [
    {
      "kind": "short_answer",
      "text": "Welche Option bevorzugt der Programmleiter zunächst? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Schweigen"
      ],
      "explain": "„In vier Wochen redet niemand mehr darüber.“"
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Miriam).",
      "options": [],
      "answer": 0,
      "accept": [
        "Und einer von ihnen hat recht."
      ],
      "explain": "„Und einer von ihnen hat recht.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "c1-l8": [
    {
      "kind": "short_answer",
      "text": "Welcher der beiden Alterungsprozesse ist schneller? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Der der Normen",
        "der Normen"
      ],
      "explain": "Metin bunu açıkça söylüyor."
    }
  ],
  "c1-l9": [
    {
      "kind": "short_answer",
      "text": "Worin stimmt Herr Brandt ihr zu? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Beim Leerstand"
      ],
      "explain": "„Wer eine Wohnung jahrelang leer stehen lässt, spekuliert.“"
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Moderatorin).",
      "options": [],
      "answer": 0,
      "accept": [
        "Frau Demir, Sie forschen dazu. Wer hat recht?"
      ],
      "explain": "„Frau Demir, Sie forschen dazu. Wer hat recht?“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "c1-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Für einen Text dieser Schwierigkeit ist das zu wenig. 28 wären angemessen. Und ich möchte über die ___ sprechen.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Beteiligung"
      ],
      "explain": "„Für einen Text dieser Schwierigkeit ist das zu wenig. 28 wären angemessen. Und ich möchte über die Beteiligung sprechen.“ — die Beteiligung: pay."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Wir bieten 24 Euro pro ___. Das ist unser Standard.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Normseite"
      ],
      "explain": "„Wir bieten 24 Euro pro Normseite. Das ist unser Standard.“ — die Normseite: standart sayfa."
    }
  ],
  "c1-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Das Klischee ist international: Deutsche haben keinen ___. Woher kommt das?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Humor"
      ],
      "explain": "„Das Klischee ist international: Deutsche haben keinen Humor. Woher kommt das?“ — der Humor: espri anlayışı."
    },
    {
      "kind": "dictation",
      "text": "Dikte: bir cümleyi dinle ve yaz (konuşan: Host).",
      "options": [],
      "answer": 0,
      "accept": [
        "Das klingt eher nach einem Vorteil für Pointen."
      ],
      "explain": "„Das klingt eher nach einem Vorteil für Pointen.“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli."
    }
  ],
  "zh-a1-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich ha morn am ___ frei.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Namitag"
      ],
      "explain": "„Ich ha morn am Namitag frei.“ — de Namitag: öğleden sonra (Nachmittag)."
    },
    {
      "kind": "short_answer",
      "text": "Wänn träffed sich d Lara und de Deniz? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Am zwäi",
        "zwäi"
      ],
      "explain": "Mesajta „Mir träffed üs am zwäi am Bellevue“ yazıyor — saat ikide buluşuyorlar. Akşam yalnızca cevap yazma sınırı."
    }
  ],
  "zh-a1-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D ___ isch im dritte Stock, mit Lift.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wohnig"
      ],
      "explain": "„D Wohnig isch im dritte Stock, mit Lift.“ — d Wohnig: daire (Wohnung)."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil choschtet s Zimmer im Monet? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "850 Franke"
      ],
      "explain": "„D Miete isch 850 Franke im Monet, alles inbegriffe“ — kira ayda 850 frank, giderler dahil."
    }
  ],
  "zh-a1-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Drum mach ich e chlini Party bi mir ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "dihäi"
      ],
      "explain": "„Drum mach ich e chlini Party bi mir dihäi.“ — dihäi: evde (zu Hause)."
    },
    {
      "kind": "short_answer",
      "text": "Bis wänn söll d Sara antworte? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Bis am Mittwuch",
        "am Mittwuch"
      ],
      "explain": "„Chasch mer bis am Mittwuch säge, öb du chunsch?“ — çarşambaya kadar."
    }
  ],
  "zh-a1-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D Büecher chöned Si au usserhalb vo de ___ zruggbringe: de Chaschte isch näb de Iigangstür.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Öffnigsziite"
      ],
      "explain": "„D Büecher chöned Si au usserhalb vo de Öffnigsziite zruggbringe: de Chaschte isch näb de Iigangstür.“ — d Öffnigsziite: açılış saatleri."
    },
    {
      "kind": "short_answer",
      "text": "Bis wänn hät s am Samschtig offe? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Bis am vieri",
        "am vieri"
      ],
      "explain": "Cumartesi 9–16, yani saat dörde kadar. 19 (sibni) hafta içi kapanış saati."
    }
  ],
  "zh-a1-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Für alli, wo scho Hochdüütsch chönd und jetz d ___ wänd verstaa.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Mundart"
      ],
      "explain": "„Für alli, wo scho Hochdüütsch chönd und jetz d Mundart wänd verstaa.“ — d Mundart: lehçe."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil choschtet de Chochkurs? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "240 Franke"
      ],
      "explain": "Yemek kursu 240 frank; 200 lehçe kursu, 180 yoga."
    }
  ],
  "zh-a1-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Juli baued mir d ___ am Central um.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gläis"
      ],
      "explain": "„Juli baued mir d Gläis am Central um.“ — s Gläis: ray, peron (Gleis)."
    },
    {
      "kind": "short_answer",
      "text": "Wo haltet de Bus? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Vor em Hauptbahnhof"
      ],
      "explain": "„De Bus haltet vor em Hauptbahnhof, uf de andere Strasseziite.“"
    }
  ],
  "zh-a1-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Bitte alles ___ mit em Name.“",
      "options": [],
      "answer": 0,
      "accept": [
        "aaschriibe"
      ],
      "explain": "„Bitte alles aaschriibe mit em Name.“ — aaschriibe: üzerine ad yazmak."
    },
    {
      "kind": "short_answer",
      "text": "Was söll de Kerem NÖD im Znüni haa? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Süessigkäite"
      ],
      "explain": "„käi Süessigkäite, bitte“."
    }
  ],
  "zh-a1-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Bitte s ___ imene Böxli mitgää, nöd im Plastiksäckli.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Znüni"
      ],
      "explain": "„Bitte s Znüni imene Böxli mitgää, nöd im Plastiksäckli.“ — s Znüni: kuşluk yemeği (saat 9 civarı)."
    },
    {
      "kind": "short_answer",
      "text": "Was isch verbote? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Süessi Getränk"
      ],
      "explain": "„Süessi Getränk sind bi eus verbote.“"
    }
  ],
  "zh-a1-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Dezämber chunt de ___ mit em Schmutzli is Quartier.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Samichlaus"
      ],
      "explain": "„Dezämber chunt de Samichlaus mit em Schmutzli is Quartier.“ — de Samichlaus: Noel Baba'nın İsviçre hâli (6 Aralık)."
    },
    {
      "kind": "short_answer",
      "text": "Müend d Chind es Värsli säge? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nei, si chönd"
      ],
      "explain": "„si müend aber nöd.“"
    }
  ],
  "zh-a1-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nur ___, käi Poscht.“",
      "options": [],
      "answer": 0,
      "accept": [
        "abhole"
      ],
      "explain": "„Nur abhole, käi Poscht.“ — abhole: gelip almak."
    },
    {
      "kind": "short_answer",
      "text": "D Selin schafft vo Määndig bis Friitig und wott Mundart lerne. Welli Aazäig passt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "A"
      ],
      "explain": "A ilanı yalnızca hafta sonu ders veriyor — hafta içi çalışan Selin'e uygun."
    }
  ],
  "zh-a1-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De Kerem hät sini ___ scho zwäimal vergässe.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Jagge"
      ],
      "explain": "„De Kerem hät sini Jagge scho zwäimal vergässe.“ — d Jagge: mont, ceket."
    },
    {
      "kind": "short_answer",
      "text": "Was hät de Kerem vergässe? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sini Jagge"
      ],
      "explain": "„De Kerem hät sini Jagge scho zwäimal vergässe.“"
    }
  ],
  "zh-a1-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Es ___ für äi Zone giltet 30 Minute.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Billett"
      ],
      "explain": "„Es Billett für äi Zone giltet 30 Minute.“ — s Billett: bilet."
    },
    {
      "kind": "short_answer",
      "text": "Welli Zone isch d Stadt Züri? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "110"
      ],
      "explain": "„D Stadt Züri isch d Zone 110.“"
    }
  ],
  "zh-a1-l1": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi! Was ___ sii?“",
      "options": [],
      "answer": 0,
      "accept": [
        "törfs"
      ],
      "explain": "„Grüezi! Was törfs sii?“ — Was törfs sii?: Ne alırdınız? (sipariş kalıbı)."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil choschtet alles zäme? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sächs Franke"
      ],
      "explain": "Garson „macht zäme sächs Franke“ diyor: 4.50 kahve + 1.50 kruvasan = 6 frank. 10 frank Elif'in verdiği para."
    }
  ],
  "zh-a1-l2": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „S Tram hät hüt ___ — zää Minute, staat da a de Aazäig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Verspaatig"
      ],
      "explain": "„S Tram hät hüt Verspaatig — zää Minute, staat da a de Aazäig.“ — d Verspaatig: rötar, gecikme (Verspätung)."
    },
    {
      "kind": "short_answer",
      "text": "Uf was warted d Lüüt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ufs Tram"
      ],
      "explain": "İlk cümle: „Warted Si au ufs Tram?“ — ikisi de tramvay bekliyor."
    }
  ],
  "zh-a1-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Ich bruuche äis Kilo Tomate und es halbs Kilo ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rüebli"
      ],
      "explain": "„Grüezi. Ich bruuche äis Kilo Tomate und es halbs Kilo Rüebli.“ — s Rüebli: havuç."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil Chörbli Ärdbeeri nimmt si? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Zwäi"
      ],
      "explain": "„Denn nime ich zwäi Chörbli“ — iki sepet 12 franka geliyor."
    }
  ],
  "zh-a1-l4": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Merci für Ihre ___ und en schööne Tag.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Aaruef"
      ],
      "explain": "„Merci für Ihre Aaruef und en schööne Tag.“ — de Aaruef: telefon araması."
    },
    {
      "kind": "short_answer",
      "text": "Wänn isch d Praxis am Mittwuch zue? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Am Namitag",
        "Namitag"
      ],
      "explain": "„Am Mittwuch Namitag isch d Praxis zue“ — sadece öğleden sonra kapalı."
    }
  ],
  "zh-a1-l5": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Achtung uf ___ sibe: De Interregio uf Sanggalle, Abfaart am halbi zää, fahrt hüt vo Gläis nüün ab.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gläis"
      ],
      "explain": "„Achtung uf Gläis sibe: De Interregio uf Sanggalle, Abfaart am halbi zää, fahrt hüt vo Gläis nüün ab.“ — s Gläis: peron, ray."
    },
    {
      "kind": "short_answer",
      "text": "Vo welem Gläis fahrt de Zug ab? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Vo Gläis nüün"
      ],
      "explain": "Anons 7. perondan duyuruluyor ama tren „vo Gläis nüün“ kalkıyor — peron değişti."
    }
  ],
  "zh-a1-l6": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Du, ich chume hüt es ___ spöter — öppe füfzää Minute. Ich bi na im Büro.“",
      "options": [],
      "answer": 0,
      "accept": [
        "bitzeli"
      ],
      "explain": "„Du, ich chume hüt es bitzeli spöter — öppe füfzää Minute. Ich bi na im Büro.“ — es bitzeli: biraz."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil spöter chunt er? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Öppe füfzää Minute"
      ],
      "explain": "„öppe füfzää Minute“ — yaklaşık on beş dakika."
    }
  ],
  "zh-a1-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Wörkli. Aber ich gib Ine en Tipp: Mälded Si sich für de ___ aa, au wänn Si en jetz nöd bruuched.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Hort"
      ],
      "explain": "„Wörkli. Aber ich gib Ine en Tipp: Mälded Si sich für de Hort aa, au wänn Si en jetz nöd bruuched.“ — de Hort: okul sonrası bakım."
    },
    {
      "kind": "short_answer",
      "text": "Sit wänn isch de Sohn vo de Meral im Chindsgi? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sit letschter Wuche"
      ],
      "explain": "„min Sohn hät letschti Wuche aagfange.“"
    }
  ],
  "zh-a1-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Bruuched Si es ___?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Sackli"
      ],
      "explain": "„Bruuched Si es Sackli?“ — s Sackli: poşet."
    },
    {
      "kind": "short_answer",
      "text": "Wie zaalt d Meral? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Mit Twint",
        "Twint"
      ],
      "explain": "„Cha ich mit Twint zaale?“ — İsviçre'nin telefon ödemesi."
    }
  ],
  "zh-a1-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Achtung uf ___ füf: De Zug uf Winterthur, Abfaart am zwölfi zwänzg, hät hüt öppe zää Minute Verspaatig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gläis"
      ],
      "explain": "„Achtung uf Gläis füf: De Zug uf Winterthur, Abfaart am zwölfi zwänzg, hät hüt öppe zää Minute Verspaatig.“ — s Gläis: peron."
    },
    {
      "kind": "short_answer",
      "text": "Durchsaag 1: Wänn fahrt de Zug öppe? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Am halbi äis",
        "halbi äis"
      ],
      "explain": "12:20 + yaklaşık 10 dakika = yaklaşık 12:30."
    }
  ],
  "zh-a1-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Sandra, ich bi zu me ___ iiglade. Was isch das genau?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Apéro"
      ],
      "explain": "„Sandra, ich bi zu me Apéro iiglade. Was isch das genau?“ — de Apéro: içki-atıştırmalık buluşması."
    },
    {
      "kind": "short_answer",
      "text": "Sitzt me bim Apéro? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Mäischtens nöd"
      ],
      "explain": "Ayakta olduğu için insanlar arasında dolaşmak kolay."
    }
  ],
  "zh-a1-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Ich hett gärn en Termin. Ich han sit gescht ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Zaanweh"
      ],
      "explain": "„Grüezi. Ich hett gärn en Termin. Ich han sit gescht Zaanweh.“ — d Zaanweh: diş ağrısı."
    },
    {
      "kind": "short_answer",
      "text": "Warum rüeft d Meral aa? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Si hät Zaanweh"
      ],
      "explain": "„Ich han sit gescht Zaanweh.“"
    }
  ],
  "zh-a1-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Ja, merci. De Kerem chunt gärn am ___ mit. Ich han au d Jagge gfunde — si isch under em Bett gsii.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ussflug"
      ],
      "explain": "„Ja, merci. De Kerem chunt gärn am Ussflug mit. Ich han au d Jagge gfunde — si isch under em Bett gsii.“ — de Ussflug: gezi."
    },
    {
      "kind": "short_answer",
      "text": "Wo isch d Jagge gsii? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Under em Bett"
      ],
      "explain": "„si isch under em Bett gsii.“"
    }
  ],
  "zh-a2-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Schööns ___ i de 3er-WG z Züri-Wiedike frei.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Zimmer"
      ],
      "explain": "„Schööns Zimmer i de 3er-WG z Züri-Wiedike frei.“ — s Zimmer: oda."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil choschtet s Zimmer im Monet? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "780 Franke"
      ],
      "explain": "İlanda „D Miete isch 780 Franke im Monet, alles inklusiv“ yazıyor — her şey dahil 780 frank."
    }
  ],
  "zh-a2-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Am Sunntig mached mir e chliini ___ uf de Üetliberg.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wanderig"
      ],
      "explain": "„Am Sunntig mached mir e chliini Wanderig uf de Üetliberg.“ — d Wanderig: doğa yürüyüşü."
    },
    {
      "kind": "short_answer",
      "text": "Was söll d Selin mitnää? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Öppis z Trinke"
      ],
      "explain": "Nadja soruyor: „chasch du öppis z Trinke mitnää?“ Pikniği kendisi getiriyor, Selin'den içecek istiyor."
    }
  ],
  "zh-a2-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De ___ hanget näb de Tür.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Waschplan"
      ],
      "explain": "„De Waschplan hanget näb de Tür.“ — de Waschplan: çamaşır sırası çizelgesi."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil Waschtäg hät e Wonig im Monet? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Zwäi"
      ],
      "explain": "Birinci kuralda „Jedi Wonig hät zwäi Waschtäg im Monet“ yazıyor."
    }
  ],
  "zh-a2-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Gschtern sind mir mit em ___ über de See gfahre und denn uf de Rigi ufe.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schiff"
      ],
      "explain": "„Gschtern sind mir mit em Schiff über de See gfahre und denn uf de Rigi ufe.“ — s Schiff: gemi, vapur."
    },
    {
      "kind": "short_answer",
      "text": "Sit wänn isch d Sara z Luzärn? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Sit em Määndig"
      ],
      "explain": "„Mir sind sit em Määndig da“ — pazartesiden beri oradalar."
    }
  ],
  "zh-a2-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Bi schlächtem Wätter bliibt d ___ zue.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Badi"
      ],
      "explain": "„Bi schlächtem Wätter bliibt d Badi zue.“ — d Badi: açık hava havuzu / plaj (İsviçre)."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil zaalt es Chind vo zwölf Jaar? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nüüt"
      ],
      "explain": "„Chind bis 16 gratis“ — 12 yaşındaki çocuk ücretsiz giriyor."
    }
  ],
  "zh-a2-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Café Sträähl im Chreis 6 suecht ab September e ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Uushilf"
      ],
      "explain": "„Café Sträähl im Chreis 6 suecht ab September e Uushilf.“ — d Uushilf: yardımcı eleman."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil verdient me i de Stund? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "26 Franke"
      ],
      "explain": "„Loon: 26 Franke Stundeloon.“ 12 haftalık saat sayısı, 14 ise bitiş saati."
    }
  ],
  "zh-a2-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich chume grad vo de erschte ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bsichtigung"
      ],
      "explain": "„Ich chume grad vo de erschte Bsichtigung.“ — d Bsichtigung: ev gezme randevusu."
    },
    {
      "kind": "short_answer",
      "text": "Wie vill Lüüt sind a de Bsichtigung gsii? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Öppe achtzg"
      ],
      "explain": "„Es sind öppe achtzg Lüüt do gsii. Für drei Zimmer.“"
    }
  ],
  "zh-a2-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Es vollständigs ___ isch drum wichtiger als es schöns Aaschriibe.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Dossier"
      ],
      "explain": "„Es vollständigs Dossier isch drum wichtiger als es schöns Aaschriibe.“ — s Dossier: başvuru dosyası."
    },
    {
      "kind": "short_answer",
      "text": "Was isch wichtiger als es schöns Aaschriibe? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Es vollständigs Dossier"
      ],
      "explain": "İlk paragrafın ana cümlesi."
    }
  ],
  "zh-a2-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wär also im Septämber uszieht, mues bis Ändi Juni ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "kündige"
      ],
      "explain": "„Wär also im Septämber uszieht, mues bis Ändi Juni kündige.“ — kündige: sözleşmeyi feshetmek."
    },
    {
      "kind": "short_answer",
      "text": "Bis wänn mues me kündige, wänn me im Septämber uszieht? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Bis Ändi Juni",
        "Ändi Juni"
      ],
      "explain": "Üç ay ihbar süresi: eylül için haziran sonu."
    }
  ],
  "zh-a2-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D) ___ i de Tiefgarage z vermiete, Chreis 6, 180 Franke im Monet.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Parkfäld"
      ],
      "explain": "„D) Parkfäld i de Tiefgarage z vermiete, Chreis 6, 180 Franke im Monet.“ — s Parkfäld: park yeri."
    },
    {
      "kind": "short_answer",
      "text": "D Ayla studiert und bliibt nur es halbs Jaar z Züri. Welli Aazäig passt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "A"
      ],
      "explain": "A ilanı altı aylık, eşyalı ve sadece öğrenciler için."
    }
  ],
  "zh-a2-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Mir händ üs läider für e anderi Bewärbig ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "entschäide"
      ],
      "explain": "„Mir händ üs läider für e anderi Bewärbig entschäide.“ — sich entschäide: karar vermek."
    },
    {
      "kind": "short_answer",
      "text": "Bis wänn mues de Deniz antworte? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Bis am Friitig",
        "am Friitig"
      ],
      "explain": "„Bitte gänd Si mir bis am Friitig Bschäid.“"
    }
  ],
  "zh-a2-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D ___ zaalsch jede Monet, au wänn du nie zum Arzt gaasch.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Prämie"
      ],
      "explain": "„D Prämie zaalsch jede Monet, au wänn du nie zum Arzt gaasch.“ — d Prämie: aylık prim."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D ___ isch de Betrag, wo du sälber zaalsch, bevor d Kasse öppis übernimmt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Franchise"
      ],
      "explain": "„D Franchise isch de Betrag, wo du sälber zaalsch, bevor d Kasse öppis übernimmt.“ — d Franchise: yıllık muafiyet tutarı."
    }
  ],
  "zh-a2-l1": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Bitte bringed Si Ihri Versicherigscharte mit. Und wänn s ___ hüt na höcher wird, lüted Si bitte grad wider aa.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Fieber"
      ],
      "explain": "„Bitte bringed Si Ihri Versicherigscharte mit. Und wänn s Fieber hüt na höcher wird, lüted Si bitte grad wider aa.“ — s Fieber: ateş."
    },
    {
      "kind": "short_answer",
      "text": "Warum gaat de Termin am Morge nöd? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Si mues schaffe"
      ],
      "explain": "„Morn am Morge mues ich schaffe“ diyor — lehçede çalışmak „schaffe“dir."
    }
  ],
  "zh-a2-l2": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Und was für es ___ bruuch ich?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Billett"
      ],
      "explain": "„Und was für es Billett bruuch ich?“ — s Billett: bilet."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil choschtet s Billett? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Vier Franke sächzg"
      ],
      "explain": "„Das choschtet vier Franke sächzg“ — 4.60 frank, iki bölgelik şehir bileti."
    }
  ],
  "zh-a2-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Ich bi neu z Züri züglet und möcht mi ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "aamälde"
      ],
      "explain": "„Grüezi. Ich bi neu z Züri züglet und möcht mi aamälde.“ — sich aamälde: ikamet kaydı yaptırmak."
    },
    {
      "kind": "short_answer",
      "text": "Wie vil Ziit hät er für d Chrankekasse? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Drei Mönet"
      ],
      "explain": "„Si händ drei Mönet Ziit, das z regle.“ On gün kimliğin postayla gelme süresi."
    }
  ],
  "zh-a2-l4": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Am Sunntig chömed vo Weschte her ___. Am Namitag mues me mit eme Gwitter rächne.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wulche"
      ],
      "explain": "„Am Sunntig chömed vo Weschte her Wulche. Am Namitag mues me mit eme Gwitter rächne.“ — d Wulche: bulut."
    },
    {
      "kind": "short_answer",
      "text": "Wie isch s Wätter am Samschtig am Morge? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Näbelig"
      ],
      "explain": "„Am Samschtig am Morge hät s im Flachland na Nääbel“ — sisli başlıyor."
    }
  ],
  "zh-a2-l5": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „D ___ giesse, öppe zwäimal i de Wuche. Und de Briefchaschte leere wär super.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Pflanze"
      ],
      "explain": "„D Pflanze giesse, öppe zwäimal i de Wuche. Und de Briefchaschte leere wär super.“ — d Pflanze giesse: çiçekleri sulamak."
    },
    {
      "kind": "short_answer",
      "text": "Wohi gaat d Frau Steiner? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Uf Italie"
      ],
      "explain": "„Ich gang am Friitig für zwäi Wuche uf Italie.“"
    }
  ],
  "zh-a2-l6": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Ich han geschter im Tram Nummere 11 mini Täsche ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "verlore"
      ],
      "explain": "„Grüezi. Ich han geschter im Tram Nummere 11 mini Täsche verlore.“ — verlore: kaybolmuş, kaybettim."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Momänt … Ja, do hät öpper geschter am Aabig e bruni ___ abggää. Chönd Si mer säge, was für es Buech?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Täsche"
      ],
      "explain": "„Momänt … Ja, do hät öpper geschter am Aabig e bruni Täsche abggää. Chönd Si mer säge, was für es Buech?“ — d Täsche: çanta."
    }
  ],
  "zh-a2-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Merci. Sind d ___ i de 1'760 scho drin?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Nebechoschte"
      ],
      "explain": "„Merci. Sind d Nebechoschte i de 1'760 scho drin?“ — d Nebechoschte: yan giderler."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Im ___. Jedi Wonig hät zwäi Täg im Monet. De Plan hanget a de Tür.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Keller"
      ],
      "explain": "„Im Keller. Jedi Wonig hät zwäi Täg im Monet. De Plan hanget a de Tür.“ — de Keller: bodrum."
    }
  ],
  "zh-a2-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi Herr Kovac. Ich zieh am 30. März ii und wott froge, öb ich de ___ cha reserviere.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Lift"
      ],
      "explain": "„Grüezi Herr Kovac. Ich zieh am 30. März ii und wott froge, öb ich de Lift cha reserviere.“ — de Lift: asansör."
    },
    {
      "kind": "short_answer",
      "text": "Welli Ziit überchunt de Deniz? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Achti bis zwölfi"
      ],
      "explain": "Öğleden sonra dördüncü kattaki aile taşınıyor."
    }
  ],
  "zh-a2-l9": [
    {
      "kind": "short_answer",
      "text": "Gspröch 1: I welere Farb git s d Grössi M? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nur i Blau"
      ],
      "explain": "„Grössi M hämmer läider nur na i Blau.“"
    }
  ],
  "zh-a2-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Genau. Und wänn du ___ bisch, frög äifach. Niemert findet die Frag komisch.“",
      "options": [],
      "answer": 0,
      "accept": [
        "unsicher"
      ],
      "explain": "„Genau. Und wänn du unsicher bisch, frög äifach. Niemert findet die Frag komisch.“ — unsicher: emin olmayan."
    },
    {
      "kind": "short_answer",
      "text": "Wo säit me sofort du? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Im Sportverein",
        "Sportverein"
      ],
      "explain": "Dernek/kulüpte başkanla bile „du“."
    }
  ],
  "zh-a2-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Es ___ für Büecher, öppe zwäi Meter.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gstell"
      ],
      "explain": "„Grüezi. Es Gstell für Büecher, öppe zwäi Meter.“ — de Gstell: raf."
    },
    {
      "kind": "short_answer",
      "text": "Was suecht d Sara? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Es Büechergstell"
      ],
      "explain": "„Es Gstell für Büecher, öppe zwäi Meter.“"
    }
  ],
  "zh-a2-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „De ___ hämmer am Mittwuch unterschriibe. D Kaution isch drü Monetsmiete — das hät weh taa, aber s isch dure.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Vertrag"
      ],
      "explain": "„De Vertrag hämmer am Mittwuch unterschriibe. D Kaution isch drü Monetsmiete — das hät weh taa, aber s isch dure.“ — de Vertrag: sözleşme."
    },
    {
      "kind": "short_answer",
      "text": "Wie vill Absääge hät er gha? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Vierzää"
      ],
      "explain": "„Vierzää Absääge insgesamt.“"
    }
  ],
  "zh-b1-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De Quartierverein stellt Tisch und Bänk uf, aber mir bruuched na ___ für s Ufbaue am Morge und s Ufruume am Aabig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Hälfer"
      ],
      "explain": "„De Quartierverein stellt Tisch und Bänk uf, aber mir bruuched na Hälfer für s Ufbaue am Morge und s Ufruume am Aabig.“ — de Hälfer: yardımcı, gönüllü."
    },
    {
      "kind": "short_answer",
      "text": "Wänn git s s Zmittag vom Grill? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ab de Zwölfi"
      ],
      "explain": "Duyuruda „Ab de Zwölfi git s Zmittag vom Grill“ deniyor — mangaldan öğle yemeği saat 12'den itibaren. Sächsi müziğin başlangıcı, Nüüni bitiş saati."
    }
  ],
  "zh-b1-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De ___ chunt am Samschtig am Achti, und mir sueched na zwäi, drüü Lüüt, wo chönd hälfe träge.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Zügelwage"
      ],
      "explain": "„De Zügelwage chunt am Samschtig am Achti, und mir sueched na zwäi, drüü Lüüt, wo chönd hälfe träge.“ — de Zügelwage: taşınma kamyoneti."
    },
    {
      "kind": "short_answer",
      "text": "Wohäre züügled de Sandro und sini Familie? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Uf Wiedike"
      ],
      "explain": "Mesajta „vo Örlike uf Wiedike“ deniyor: Örlike'den (Oerlikon) ayrılıp Wiedike'ye (Wiedikon) taşınıyorlar. Yön edatı „uf“ hedefi gösterir."
    }
  ],
  "zh-b1-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nach de Umfrag im Früelig händ mir d Homeoffice-___ aapasst.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Reglig"
      ],
      "explain": "„Nach de Umfrag im Früelig händ mir d Homeoffice-Reglig aapasst.“ — d Reglig: düzenleme, kural."
    },
    {
      "kind": "short_answer",
      "text": "Wie wird d Arbetsziit nöi zellt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Pro Wuche"
      ],
      "explain": "„D Arbetsziit wird nöd meh pro Tag, sondern pro Wuche zellt“ — günler arası denkleştirme serbest."
    }
  ],
  "zh-b1-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Am stärchschte ___ hät s uf de Route em Limmat naa.“",
      "options": [],
      "answer": 0,
      "accept": [
        "zuegnaa"
      ],
      "explain": "„Am stärchschte zuegnaa hät s uf de Route em Limmat naa.“ — zuegnaa: artmış (zugenommen)."
    },
    {
      "kind": "short_answer",
      "text": "Wo wott d Stadt als nächschts boue? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "I de Ussequartier"
      ],
      "explain": "Son cümle: ağın en zayıf olduğu dış mahallelerde devam edilecek."
    }
  ],
  "zh-b1-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Normale Abfall ghört i de ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Züri-Sack"
      ],
      "explain": "„Normale Abfall ghört i de Züri-Sack.“ — de Züri-Sack: resmî çöp poşeti (ücreti içinde)."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wer sin Abfall imene andere Sack usestellt, riskiert e ___ vo hundert Franke oder meh.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Buess"
      ],
      "explain": "„Wer sin Abfall imene andere Sack usestellt, riskiert e Buess vo hundert Franke oder meh.“ — d Buess: para cezası."
    }
  ],
  "zh-b1-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Mundart ___ und Mundart rede sind zwäi ganz verschiideni Sache.“",
      "options": [],
      "answer": 0,
      "accept": [
        "verstaa"
      ],
      "explain": "„Mundart verstaa und Mundart rede sind zwäi ganz verschiideni Sache.“ — verstaa: anlamak."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nach drei Mönet han ich gmerkt, dass ich sälber ___ rede.“",
      "options": [],
      "answer": 0,
      "accept": [
        "aafange"
      ],
      "explain": "„Nach drei Mönet han ich gmerkt, dass ich sälber aafange rede.“ — aafange: başlamak."
    }
  ],
  "zh-b1-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wänn ich Ine ___ vorschlaa, wo zumuetbar sind, würd ich gärn vorziitig us em Vertrag.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Nachmieter"
      ],
      "explain": "„Wänn ich Ine Nachmieter vorschlaa, wo zumuetbar sind, würd ich gärn vorziitig us em Vertrag.“ — de Nachmieter: devralacak kiracı."
    }
  ],
  "zh-b1-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Bi de ___ lauft d Verwaltig mit ere Lischte dur d Wonig und schriibt es Protokoll.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Abgab"
      ],
      "explain": "„Bi de Abgab lauft d Verwaltig mit ere Lischte dur d Wonig und schriibt es Protokoll.“ — d Abgab: teslim."
    },
    {
      "kind": "short_answer",
      "text": "Wie vill zaalt me für en Teppich, wo nach sibe Jaar kaputt gaat? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Öppe en Zäänteil"
      ],
      "explain": "Halı ömrü on yıl; kalan bir yıl hesaplanıyor."
    }
  ],
  "zh-b1-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De Uusdruck «___» beschriibt di kulturelli Gränze zwüsche de tüütsch- und französischsprachige Schwiiz.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Röstigrabe"
      ],
      "explain": "„De Uusdruck «Röstigrabe» beschriibt di kulturelli Gränze zwüsche de tüütsch- und französischsprachige Schwiiz.“ — de Röstigrabe: Almanca-Fransızca kültürel sınır."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D Schwiiz hät vier Amtssprooche: Tüütsch, Französisch, Italienisch und ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rätoromanisch"
      ],
      "explain": "„D Schwiiz hät vier Amtssprooche: Tüütsch, Französisch, Italienisch und Rätoromanisch.“ — s Rätoromanisch: Romanşça."
    }
  ],
  "zh-b1-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „TEXT 2: Nach drüü Jaar isch d ___ vom Schuelhuus Nord fertig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Sanierig"
      ],
      "explain": "„TEXT 2: Nach drüü Jaar isch d Sanierig vom Schuelhuus Nord fertig.“ — d Sanierig: yenileme."
    },
    {
      "kind": "short_answer",
      "text": "Welli Überschrift passt zu Text 1? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "b"
      ],
      "explain": "Hafta sonu on dakikada bir — daha sık sefer."
    }
  ],
  "zh-b1-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Zimmer 1: ___ im Parkett, öppe 30 cm, nöd im Iizugsprotokoll → zulaschte vom Mieter: 450 Fr.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Chratzer"
      ],
      "explain": "„Zimmer 1: Chratzer im Parkett, öppe 30 cm, nöd im Iizugsprotokoll → zulaschte vom Mieter: 450 Fr.“ — de Chratzer: çizik."
    },
    {
      "kind": "short_answer",
      "text": "Wie stellt er sich zum Rest vom Protokoll? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Er isch iiverstande"
      ],
      "explain": "„Mit em Rest bin ich iiverstande.“ — itirazı tek bir noktada."
    }
  ],
  "zh-b1-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wär e Uufenthaltsbewilligung B hät, zaalt mäistens ___: De Arbetgeber zieht d Stüür direkt vom Loon ab.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Quellestüür"
      ],
      "explain": "„Wär e Uufenthaltsbewilligung B hät, zaalt mäistens Quellestüür: De Arbetgeber zieht d Stüür direkt vom Loon ab.“ — d Quellestüür: kaynakta kesilen vergi."
    },
    {
      "kind": "short_answer",
      "text": "Wovo hänkt d Stüürhöchi stark ab? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Wo me wohnt"
      ],
      "explain": "Komşu iki belediye arasında %20 fark olabiliyor."
    }
  ],
  "zh-b1-l1": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Du Nadja, häsch scho ghört? D ___ vo morn am Zäni isch verschobe — d Chefin isch de ganz Tag in Basel.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Sitzig"
      ],
      "explain": "„Du Nadja, häsch scho ghört? D Sitzig vo morn am Zäni isch verschobe — d Chefin isch de ganz Tag in Basel.“ — d Sitzig: toplantı."
    },
    {
      "kind": "short_answer",
      "text": "Was bringt d Nadja zum Apéro mit? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Es Dessert"
      ],
      "explain": "Reto tatlı getirmesini öneriyor („Wenn du magsch, es Dessert“); içecekleri zaten şirket ödüyor."
    }
  ],
  "zh-b1-l2": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „De ___? Was isch dänn das?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Böögg"
      ],
      "explain": "„De Böögg? Was isch dänn das?“ — de Böögg: Böögg: yakılan kardan adam figürü."
    },
    {
      "kind": "short_answer",
      "text": "Was choschtet s Zueluege? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nüüt"
      ],
      "explain": "Käthi „es choschtet nüüt“ diyor — izlemek ücretsiz."
    }
  ],
  "zh-b1-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Nöd z vill, bitte — nume d ___. Si sind trocke worde.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schpitze"
      ],
      "explain": "„Grüezi. Nöd z vill, bitte — nume d Schpitze. Si sind trocke worde.“ — d Schpitze: saç uçları."
    },
    {
      "kind": "short_answer",
      "text": "Wie lang duuret s? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Öppe vierzg Minute"
      ],
      "explain": "„Denn bruuched mir öppe vierzg Minute.“ On iki, sonraki randevunun hafta sayısı."
    }
  ],
  "zh-b1-l4": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi mitenand und härzlich willkomme zum ___. Schöön, dass so vill choo sind.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Elteraabig"
      ],
      "explain": "„Grüezi mitenand und härzlich willkomme zum Elteraabig. Schöön, dass so vill choo sind.“ — de Elteraabig: veli toplantısı."
    },
    {
      "kind": "short_answer",
      "text": "Wänn chunt s Zügnis? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Im Februar",
        "Februar"
      ],
      "explain": "„S Zügnis chunt im Februar“; mayıs kamp, haziran gezi ayı."
    }
  ],
  "zh-b1-l5": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „De ___. Wänn Si hüt s Paket uf d Poscht bringed, isch s nöie i zwäi bis drüü Täg bi Ine.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ersatz"
      ],
      "explain": "„De Ersatz. Wänn Si hüt s Paket uf d Poscht bringed, isch s nöie i zwäi bis drüü Täg bi Ine.“ — de Ersatz: değişim, yenisi."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Nei. Ich schick Ine grad es Retour-___ per Mail — das drucked Si us und chläbed s ufs Paket.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Etikett"
      ],
      "explain": "„Nei. Ich schick Ine grad es Retour-Etikett per Mail — das drucked Si us und chläbed s ufs Paket.“ — s Etikett: etiket."
    }
  ],
  "zh-b1-l6": [
    {
      "kind": "short_answer",
      "text": "Was choschtet de Iitritt zum Foodfeschtival? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nüüt"
      ],
      "explain": "„De Iitritt isch gratis, s Ässe nöd“ — giriş bedava, yemek değil."
    }
  ],
  "zh-b1-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Grüezi. Ich bruuch e ___ für e 3-Zimmer-Wonig, 78 Quadratmeter, Abgab am 28. Juli.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Endreinigung"
      ],
      "explain": "„Grüezi. Ich bruuch e Endreinigung für e 3-Zimmer-Wonig, 78 Quadratmeter, Abgab am 28. Juli.“ — d Endreinigung: teslim temizliği."
    },
    {
      "kind": "short_answer",
      "text": "Wie gross isch de Priisunderschid? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "180 Franke"
      ],
      "explain": "820 − 640 = 180."
    }
  ],
  "zh-b1-l8": [
    {
      "kind": "short_answer",
      "text": "Was choschtet d Iigab bi de Schlichtigsbehörde? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nüüt"
      ],
      "explain": "„d Iigab isch koschtelos.“"
    }
  ],
  "zh-b1-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Siit drüü Mönet isch d Chäsergass für Auto gsperrt — als ___. Nächschti Wuche entschäidet de Gmeinderaat, öb s so bliibt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Versuech"
      ],
      "explain": "„Siit drüü Mönet isch d Chäsergass für Auto gsperrt — als Versuech. Nächschti Wuche entschäidet de Gmeinderaat, öb s so bliibt.“ — de Versuech: pilot uygulama."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Wahrschiinlich e Verlängerig um es Jaar — mit feschte Lieferziite am Morge. E definitivi ___ wott im Momänt niemert beschliesse.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Sperrig"
      ],
      "explain": "„Wahrschiinlich e Verlängerig um es Jaar — mit feschte Lieferziite am Morge. E definitivi Sperrig wott im Momänt niemert beschliesse.“ — d Sperrig: kapatma."
    }
  ],
  "zh-b1-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Vier Mal im Jaar chunt s ___. Warum eigentlich so oft?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Couvert"
      ],
      "explain": "„Vier Mal im Jaar chunt s Couvert. Warum eigentlich so oft?“ — s Couvert: zarf."
    },
    {
      "kind": "short_answer",
      "text": "Wie vill Unterschrifte bruucht e Initiative? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "100'000"
      ],
      "explain": "Referandum için 50.000 yeterli."
    }
  ],
  "zh-b1-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „S Huus isch hellhörig. Ich ghöre s Bass, nöd d Musik. Und am Sunntig isch de ganz Tag ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ruhezyt"
      ],
      "explain": "„S Huus isch hellhörig. Ich ghöre s Bass, nöd d Musik. Und am Sunntig isch de ganz Tag Ruhezyt.“ — d Ruhezyt: sessizlik saatleri."
    },
    {
      "kind": "short_answer",
      "text": "Wänn isch am Sunntig Ruhezyt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "De ganz Tag"
      ],
      "explain": "Hafta içi saat 22'den itibaren, pazar tüm gün."
    }
  ],
  "zh-b1-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Du, es isch erledigt. D ___ isch geschter cho.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kaution"
      ],
      "explain": "„Du, es isch erledigt. D Kaution isch geschter cho.“ — d Kaution: depozito."
    },
    {
      "kind": "short_answer",
      "text": "Wie vill wird jetz abzoge? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "180 Franke"
      ],
      "explain": "Sadece silikon kalıyor — küf ondan kaynaklanmış."
    }
  ],
  "zh-b2-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D ___ liit siit Jaare under äim Prozänt – so tüüf wie i kän andere Schwiizer Stadt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Läärwonigsziffere"
      ],
      "explain": "„D Läärwonigsziffere liit siit Jaare under äim Prozänt – so tüüf wie i kän andere Schwiizer Stadt.“ — d Läärwonigsziffere: boş konut oranı."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Und wänn öppis Neus baut wird, sind s mäischtens tüüri Wonige, wo sich normali Familie nöd chönd ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "läischte"
      ],
      "explain": "„Und wänn öppis Neus baut wird, sind s mäischtens tüüri Wonige, wo sich normali Familie nöd chönd läischte.“ — sich öppis läischte: bir şeyi (maddi olarak) karşılayabilmek."
    }
  ],
  "zh-b2-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „I de Schwiiz erwartet mer es vollschtändigs ___ mit Läbeslauf, Zügnis und Diplom – alles suuber zämegschtelt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bewärbigsdossier"
      ],
      "explain": "„I de Schwiiz erwartet mer es vollschtändigs Bewärbigsdossier mit Läbeslauf, Zügnis und Diplom – alles suuber zämegschtelt.“ — s Bewärbigsdossier: başvuru dosyası."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Bim Gsprööch sälber gilt: ___ isch s A und O.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Pünktlichkäit"
      ],
      "explain": "„Bim Gsprööch sälber gilt: Pünktlichkäit isch s A und O.“ — d Pünktlichkäit: dakiklik."
    }
  ],
  "zh-b2-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Di andere mached e ___ — drei bis vier Jaar im Betrieb, dezue äi bis zwäi Täg Berüefsschuel i de Wuche.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Lehr"
      ],
      "explain": "„Di andere mached e Lehr — drei bis vier Jaar im Betrieb, dezue äi bis zwäi Täg Berüefsschuel i de Wuche.“ — d Lehr: çıraklık eğitimi (Berufslehre)."
    },
    {
      "kind": "short_answer",
      "text": "Was isch im Kanton Züri de normal Wäg nach de Schuel? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "E Lehr"
      ],
      "explain": "Sadece %20'si liseye gidiyor; çoğunluk çıraklık yapıyor ve bu normal yol."
    }
  ],
  "zh-b2-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wär ___ drüü Stund im Monet hät, list nöd zweihundert Siite.“",
      "options": [],
      "answer": 0,
      "accept": [
        "näbebruefliech"
      ],
      "explain": "„Wär näbebruefliech drüü Stund im Monet hät, list nöd zweihundert Siite.“ — näbebruefliech: asıl işin yanında."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wahrschiinlich chunt s uf öppis derzwüsche uus: bessri ___, meh Unterschtützig, aber s Amt bliibt es Näbeamt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Entschädigung"
      ],
      "explain": "„Wahrschiinlich chunt s uf öppis derzwüsche uus: bessri Entschädigung, meh Unterschtützig, aber s Amt bliibt es Näbeamt.“ — d Entschädigung: huzur hakkı, tazminat."
    }
  ],
  "zh-b2-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Interessant isch, wohär s ___ chunt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wachstum"
      ],
      "explain": "„Interessant isch, wohär s Wachstum chunt.“ — s Wachstum: büyüme."
    },
    {
      "kind": "short_answer",
      "text": "Wie vill Wonflächi bruucht hüt e Person? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Öppe 25 m²"
      ],
      "explain": "„hüt öppe fufezwänzg Quadratmeter“ = 25 m²; otuz yıl önce 20 m² idi."
    }
  ],
  "zh-b2-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Das isch nöd Schutz vom ___, das isch Schutz vor de Konkurränz — und am Schluss verlüüred üsi Quartierläde.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Personal"
      ],
      "explain": "„Das isch nöd Schutz vom Personal, das isch Schutz vor de Konkurränz — und am Schluss verlüüred üsi Quartierläde.“ — s Personal: personel."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Zum ___: D Studie zäiged, dass d Lüüt nöd meh chaufed, si chaufed nume anderscht verteilt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Umsatz"
      ],
      "explain": "„Zum Umsatz: D Studie zäiged, dass d Lüüt nöd meh chaufed, si chaufed nume anderscht verteilt.“ — de Umsatz: ciro."
    }
  ],
  "zh-b2-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Drei Sache händ mich ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "überrascht"
      ],
      "explain": "„Drei Sache händ mich überrascht.“ — überrascht: şaşırmış."
    }
  ],
  "zh-b2-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Uf de erschte ___ staat es Dutzend Abkürzige, und di mäischte Lüüt frooged nie nach.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Loonabrächnig"
      ],
      "explain": "„Uf de erschte Loonabrächnig staat es Dutzend Abkürzige, und di mäischte Lüüt frooged nie nach.“ — d Loonabrächnig: maaş bordrosu."
    },
    {
      "kind": "short_answer",
      "text": "Wär verlüürt bim Koordinationsabzug am mäischte? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Wär Tiilzitt schafft"
      ],
      "explain": "Metin ayrıca sormaya değer olduğunu söylüyor — bazı firmalar düzeltmiş."
    }
  ],
  "zh-b2-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Zäme gänd si de Schwiizer Firme fascht de gliich Zuegang zum ___ wie eme Mitglied.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Binnemärt"
      ],
      "explain": "„Zäme gänd si de Schwiizer Firme fascht de gliich Zuegang zum Binnemärt wie eme Mitglied.“ — de Binnemärt: iç pazar."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Statt eme Beitritt git s über hundert einzelni Verträg: ___, Landverchehr, Forschig, technischi Handelshemmnis.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Persoonefreizügigkäit"
      ],
      "explain": "„Statt eme Beitritt git s über hundert einzelni Verträg: Persoonefreizügigkäit, Landverchehr, Forschig, technischi Handelshemmnis.“ — d Persoonefreizügigkäit: serbest dolaşım."
    }
  ],
  "zh-b2-r10": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Thema: Sölled alli — Fraue und Männer — es ___ leischte?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Dienschtjaar"
      ],
      "explain": "„Thema: Sölled alli — Fraue und Männer — es Dienschtjaar leischte?“ — s Dienschtjaar: hizmet yılı."
    },
    {
      "kind": "short_answer",
      "text": "Wär begründet d Zueschtimmig mit em gsellschaftliche Zämehalt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Nora"
      ],
      "explain": "Askerî gerekçeyi açıkça reddediyor."
    }
  ],
  "zh-b2-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Besten Dank für Ihri ___ als Drogistin EFZ.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bewärbig"
      ],
      "explain": "„Besten Dank für Ihri Bewärbig als Drogistin EFZ.“ — d Bewärbig: başvuru."
    }
  ],
  "zh-b2-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Di erschti ___ (AHV) isch staatlich und obligatorisch.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Süüle"
      ],
      "explain": "„Di erschti Süüle (AHV) isch staatlich und obligatorisch.“ — d Süüle: sütun."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Erschtens für Lüüt mit ___ i de zwäite Süüle: Wär e Ziit im Uusland gschafft hät oder Tiilzitt arbetet, hät automatisch weniger.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Lücke"
      ],
      "explain": "„Erschtens für Lüüt mit Lücke i de zwäite Süüle: Wär e Ziit im Uusland gschafft hät oder Tiilzitt arbetet, hät automatisch weniger.“ — d Lücke: boşluk, açık."
    }
  ],
  "zh-b2-l1": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Na nöd. Um was gaat s äigetlich gnau? Ich ha nu s Couvert gsee, aber s ___ na nöd gläse.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Büechli"
      ],
      "explain": "„Na nöd. Um was gaat s äigetlich gnau? Ich ha nu s Couvert gsee, aber s Büechli na nöd gläse.“ — s Büechli: oylama kitapçığı (resmi bilgilendirme)."
    }
  ],
  "zh-b2-l2": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Du Luca, ich han ghöört, ir wänd us de Stadt ___? Isch das ernscht?“",
      "options": [],
      "answer": 0,
      "accept": [
        "zügle"
      ],
      "explain": "„Du Luca, ich han ghöört, ir wänd us de Stadt zügle? Isch das ernscht?“ — zügle: taşınmak."
    },
    {
      "kind": "short_answer",
      "text": "Wie lang gaat s mit de S-Baan bis Züri HB? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Föifevierzg Minute"
      ],
      "explain": "Luca: „Mit de S-Baan sind s föifevierzg Minute bis Züri HB“ — 45 dakika; ayrıca haftada iki gün evden çalışabiliyor."
    }
  ],
  "zh-b2-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Perfäkt. Denn fangemer aa: Verzelled Si üs churz, warum Si sich uf die ___ bewärbed.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Stell"
      ],
      "explain": "„Perfäkt. Denn fangemer aa: Verzelled Si üs churz, warum Si sich uf die Stell bewärbed.“ — d Stell: pozisyon."
    },
    {
      "kind": "short_answer",
      "text": "Wie hööch isch s Päntum? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Achtzg Prozänt"
      ],
      "explain": "„D Stell isch uf achtzg Prozänt uusgschriibe“ — bu ona uyuyor."
    }
  ],
  "zh-b2-l5": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Iiverstande. Zwäi Wuche ___ sind realistisch, drei wäred besser — aber ich cha mit zwäi läbe.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Puffer"
      ],
      "explain": "„Iiverstande. Zwäi Wuche Puffer sind realistisch, drei wäred besser — aber ich cha mit zwäi läbe.“ — de Puffer: pay, tampon süre."
    },
    {
      "kind": "short_answer",
      "text": "Uf welle Termiin äiniged si sich? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "De fufzähnt Oktober"
      ],
      "explain": "Ağustos yarı kapasite + müşteriye 15 Ekim."
    }
  ],
  "zh-b2-l6": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Was passiert, wänn Si s ___ verfehled?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ziel"
      ],
      "explain": "„Was passiert, wänn Si s Ziel verfehled?“ — s Ziel: hedef."
    },
    {
      "kind": "short_answer",
      "text": "Wo isch d Stadt nöd im Plan? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Bi de Wärmi"
      ],
      "explain": "„Bim Struum ja, bi de Wärmi nöd“ — emisyonun %40'ı ısıtmadan geliyor."
    }
  ],
  "zh-b2-l8": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Isch es ___ nöd es verlorenes Jaar?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Brückeaagebot"
      ],
      "explain": "„Isch es Brückeaagebot nöd es verlorenes Jaar?“ — s Brückeaagebot: geçiş yılı programı."
    }
  ],
  "zh-b2-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „I de Interviews chunt immer wider s gliiche Wort: ___. Nöd „Ich verstaan s nöd“, sondern „Ich cha sowiso nüüt mache“.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Oomacht"
      ],
      "explain": "„I de Interviews chunt immer wider s gliiche Wort: Oomacht. Nöd „Ich verstaan s nöd“, sondern „Ich cha sowiso nüüt mache“.“ — d Oomacht: çaresizlik."
    },
    {
      "kind": "short_answer",
      "text": "Welli Erklärig wiist d Referentin zrugg? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Desinterässe"
      ],
      "explain": "En çok kaçınan grup ilgisizler değil, yükü ağır olanlar."
    }
  ],
  "zh-b2-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Jonas, häsch churz Ziit? Ich wett öppis ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "aaschpräche"
      ],
      "explain": "„Jonas, häsch churz Ziit? Ich wett öppis aaschpräche.“ — aaschpräche: konuyu açmak."
    }
  ],
  "zh-c1-r1": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Au d ___ veränderen d Sprach.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Zuegwanderete"
      ],
      "explain": "„Au d Zuegwanderete veränderen d Sprach.“ — d Zuegwanderete: göçle gelenler."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Das isch kän ___, das isch e nöii Farb.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Verluscht"
      ],
      "explain": "„Das isch kän Verluscht, das isch e nöii Farb.“ — de Verluscht: kayıp."
    }
  ],
  "zh-c1-r2": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich ha tänkt, mit mim guete Loon und mim suubere ___ find ich z Züri locker e Wonig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Betriibigsuszug"
      ],
      "explain": "„Ich ha tänkt, mit mim guete Loon und mim suubere Betriibigsuszug find ich z Züri locker e Wonig.“ — de Betriibigsuszug: icra sicil belgesi (İsviçre'de kiralamada istenir)."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Ich ha es Dossier gmacht, mit Foto und Motivazioonsschriibe – als wär's e ___ für en Job bi de Bank.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Bewärbig"
      ],
      "explain": "„Ich ha es Dossier gmacht, mit Foto und Motivazioonsschriibe – als wär's e Bewärbig für en Job bi de Bank.“ — d Bewärbig: başvuru."
    }
  ],
  "zh-c1-r3": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Di gliich Zruckhaltig, wo vorher wie ___ uusgseh hät, wird nachhär zu Verlässlichkäit.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Distanz"
      ],
      "explain": "„Di gliich Zruckhaltig, wo vorher wie Distanz uusgseh hät, wird nachhär zu Verlässlichkäit.“ — d Distanz: mesafe."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Underdesse gib ich zue: De ___ stimmt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Vorwurf"
      ],
      "explain": "„Underdesse gib ich zue: De Vorwurf stimmt.“ — de Vorwurf: suçlama."
    }
  ],
  "zh-c1-r4": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „E ___ kennt käi Begründigspflicht.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Abschtimmig"
      ],
      "explain": "„E Abschtimmig kennt käi Begründigspflicht.“ — d Abschtimmig: referandum, oylama."
    },
    {
      "kind": "short_answer",
      "text": "Was isch de erscht Poschte uf de Rächnig? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "S Tempo"
      ],
      "explain": "Tüm aşamalardan geçmesi gereken bir yasa on yıl sürebiliyor."
    }
  ],
  "zh-c1-r5": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Und di ___, wo am wenigschte gseh wird, isch di, wo alles andere erscht möglich macht.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Schicht"
      ],
      "explain": "„Und di Schicht, wo am wenigschte gseh wird, isch di, wo alles andere erscht möglich macht.“ — d Schicht: vardiya."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Er fahrt de ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kehrichtwage"
      ],
      "explain": "„Er fahrt de Kehrichtwage.“ — de Kehrichtwage: çöp kamyonu."
    }
  ],
  "zh-c1-r6": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „E Rede am Grab, wo alli Motiv na emal ufzellt, als hett de ___ im Schniidruum s Vertroue verlore.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Regisseur"
      ],
      "explain": "„E Rede am Grab, wo alli Motiv na emal ufzellt, als hett de Regisseur im Schniidruum s Vertroue verlore.“ — de Regisseur: yönetmen."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De ___ isch Züritüütsch und Bärndüütsch, und Ammann nimmt s ärnscht: D Figure rededt nöd Mundart, si dänked druff.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Diaalog"
      ],
      "explain": "„De Diaalog isch Züritüütsch und Bärndüütsch, und Ammann nimmt s ärnscht: D Figure rededt nöd Mundart, si dänked druff.“ — de Diaalog: diyalog."
    }
  ],
  "zh-c1-r7": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Nach zwänzg Jaar han ich s ___ iigrächt, und s Erschte, wo ich gschpürt han, isch nöd Fröid gsii, sondern Verlägeheit.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Gsuech"
      ],
      "explain": "„Nach zwänzg Jaar han ich s Gsuech iigrächt, und s Erschte, wo ich gschpürt han, isch nöd Fröid gsii, sondern Verlägeheit.“ — s Gsuech: başvuru."
    },
    {
      "kind": "short_answer",
      "text": "Was hät d Nadia zerscht gschpürt? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Verlägeheit"
      ],
      "explain": "Beklenen duygu değil — metnin çıkış noktası bu."
    }
  ],
  "zh-c1-r8": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De Kanton setzt zuesätzlichi Frischte — im Kanton Züri zwäi Jaar im Kanton — und prüeft d ___.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Integration"
      ],
      "explain": "„De Kanton setzt zuesätzlichi Frischte — im Kanton Züri zwäi Jaar im Kanton — und prüeft d Integration.“ — d Integration: uyum."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wie si das macht, isch sehr underschidlich: mängisch es Gspröch mit ere ___, mängisch nur e Aktenprüefig.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kommission"
      ],
      "explain": "„Wie si das macht, isch sehr underschidlich: mängisch es Gspröch mit ere Kommission, mängisch nur e Aktenprüefig.“ — d Kommission: komisyon."
    }
  ],
  "zh-c1-r9": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Wär en ___ brucht, entschäidet nöd, was er bedüütet.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Mythos"
      ],
      "explain": "„Wär en Mythos brucht, entschäidet nöd, was er bedüütet.“ — de Mythos: mit, efsane."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „Sini Gschicht säit: E ___, wo Underwerfig verlangt, verlüürt s Rächt uf Gehorsam.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Obrigkäit"
      ],
      "explain": "„Sini Gschicht säit: E Obrigkäit, wo Underwerfig verlangt, verlüürt s Rächt uf Gehorsam.“ — d Obrigkäit: otorite."
    }
  ],
  "zh-c1-r11": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D ___ wird druf hingwiise.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Kommission"
      ],
      "explain": "„D Kommission wird druf hingwiise.“ — d Kommission: komisyon."
    },
    {
      "kind": "short_answer",
      "text": "Wie sind d Fräge 1 und 2 uusgange? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Korrekt beantwortet"
      ],
      "explain": "İkincisi ayrıca „uusführlich“ olarak not edilmiş."
    }
  ],
  "zh-c1-r12": [
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „De ___ bestimmt, wär im Fall vo de Urteilsunfähigkäit d Personesorg, d Vermögesverwaltig und d Vertretung im Rächtsverchehr übernimmt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Vorsorgeuuftrag"
      ],
      "explain": "„De Vorsorgeuuftrag bestimmt, wär im Fall vo de Urteilsunfähigkäit d Personesorg, d Vermögesverwaltig und d Vertretung im Rächtsverchehr übernimmt.“ — de Vorsorgeuuftrag: vekâlet belgesi (ehliyetsizlik hâli için)."
    },
    {
      "kind": "gapfill",
      "text": "Metinden tamamla: „D ___ regelt d medizinischi Siite: welli Behandlige me will und welli nöd, und wär im Zwiifelsfall entschäidet.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Patientenverfüegig"
      ],
      "explain": "„D Patientenverfüegig regelt d medizinischi Siite: welli Behandlige me will und welli nöd, und wär im Zwiifelsfall entschäidet.“ — d Patientenverfüegig: hasta talimatı."
    }
  ],
  "zh-c1-l2": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Aber es git ja kä offizielli ___ für d Mundart. Isch das käs Problem?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rächtschriibig"
      ],
      "explain": "„Aber es git ja kä offizielli Rächtschriibig für d Mundart. Isch das käs Problem?“ — d Rächtschriibig: imla, yazım kuralları."
    }
  ],
  "zh-c1-l3": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Nei, das isch de Kärn. Wänn Si ___ wänd, denn konsequänt: Denn zaalt de Fuessballclub sini Polizeiiisätz sälber. Wänd Si das?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Markt"
      ],
      "explain": "„Nei, das isch de Kärn. Wänn Si Markt wänd, denn konsequänt: Denn zaalt de Fuessballclub sini Polizeiiisätz sälber. Wänd Si das?“ — de Markt: piyasa."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Frau Signer, aber s Argumänt mit em ___ bliibt: Wär gaat i die Vorstellige?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Publikum"
      ],
      "explain": "„Frau Signer, aber s Argumänt mit em Publikum bliibt: Wär gaat i die Vorstellige?“ — s Publikum: seyirci."
    }
  ],
  "zh-c1-l5": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Guete Morge. D Wuche im ___ — was passiert isch, und was mir drus gmacht händ.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Rückspiegel"
      ],
      "explain": "„Guete Morge. D Wuche im Rückspiegel — was passiert isch, und was mir drus gmacht händ.“ — de Rückspiegel: dikiz aynası."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Und zum Schluss di guet Nachricht: S Papier vo de ___ vo letschtem Jaar isch fertig. Es empfilt, e Arbetsgruppe iizsetze.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Arbetsgruppe"
      ],
      "explain": "„Und zum Schluss di guet Nachricht: S Papier vo de Arbetsgruppe vo letschtem Jaar isch fertig. Es empfilt, e Arbetsgruppe iizsetze.“ — d Arbetsgruppe: çalışma grubu."
    }
  ],
  "zh-c1-l6": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Und de ___? Übersetzige, Uusland …“",
      "options": [],
      "answer": 0,
      "accept": [
        "Verlag"
      ],
      "explain": "„Und de Verlag? Übersetzige, Uusland …“ — de Verlag: yayınevi."
    },
    {
      "kind": "short_answer",
      "text": "Wie beurtäilt si d Ussicht uf Übersetzige? (kısa cevap)",
      "options": [],
      "answer": 0,
      "accept": [
        "Ehrlich chlii"
      ],
      "explain": "Son kitabı Almanya'da yayımlanmadı ve bunu anlıyor."
    }
  ],
  "zh-c1-l7": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Genau. Ich han s abglehnt, ruhig. Und d Protokollführerin hät sälber iigwändet, dass d Frag gäge d ___ verstoosst.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wegleitig"
      ],
      "explain": "„Genau. Ich han s abglehnt, ruhig. Und d Protokollführerin hät sälber iigwändet, dass d Frag gäge d Wegleitig verstoosst.“ — d Wegleitig: yönerge."
    }
  ],
  "zh-c1-l9": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Frau Vogt, Si wänd s Verfaare ___. Was schtört Si am hütige System?“",
      "options": [],
      "answer": 0,
      "accept": [
        "vereinheitliche"
      ],
      "explain": "„Frau Vogt, Si wänd s Verfaare vereinheitliche. Was schtört Si am hütige System?“ — vereinheitliche: standartlaştırmak."
    }
  ],
  "zh-c1-l10": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Si wänd en ___. Bevor mir schriibe: Häsch Si sich überleit, öb äi Person alles mache söll oder öb Si träne wänd?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Vorsorgeuuftrag"
      ],
      "explain": "„Si wänd en Vorsorgeuuftrag. Bevor mir schriibe: Häsch Si sich überleit, öb äi Person alles mache söll oder öb Si träne wänd?“ — de Vorsorgeuuftrag: vekâlet belgesi."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Drum setzt me immer e ___ ii. Ohni die chunt trotzdem d Behörde is Spiel — genau das, wo Si vermeide wänd.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Ersatzperson"
      ],
      "explain": "„Drum setzt me immer e Ersatzperson ii. Ohni die chunt trotzdem d Behörde is Spiel — genau das, wo Si vermeide wänd.“ — d Ersatzperson: yedek kişi."
    }
  ],
  "zh-c1-l11": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Frau Kaufmann, Si händ es Buech über s Schwiizer ___ gschriibe. Isch es e Tugend?“",
      "options": [],
      "answer": 0,
      "accept": [
        "Understatement"
      ],
      "explain": "„Frau Kaufmann, Si händ es Buech über s Schwiizer Understatement gschriibe. Isch es e Tugend?“ — s Understatement: abartmama, küçümseyerek anlatma."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Si säged „___“, nöd „chliiner“.“",
      "options": [],
      "answer": 0,
      "accept": [
        "unsichtbar"
      ],
      "explain": "„Si säged „unsichtbar“, nöd „chliiner“.“ — unsichtbar: görünmez."
    }
  ],
  "zh-c1-l12": [
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „S Kantonale bruucht na öppe zwäi Mönet, das isch Formsach. D ___ isch im Novämber.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Iiburgerigsfiir"
      ],
      "explain": "„S Kantonale bruucht na öppe zwäi Mönet, das isch Formsach. D Iiburgerigsfiir isch im Novämber.“ — d Iiburgerigsfiir: vatandaşlık töreni."
    },
    {
      "kind": "gapfill",
      "text": "Dinlediğinden tamamla: „Nei. Mir händ die ___ ja sälber underschriibe. Wänn si nöd gilt, isch si nüüt wärt.“",
      "options": [],
      "answer": 0,
      "accept": [
        "Wegleitig"
      ],
      "explain": "„Nei. Mir händ die Wegleitig ja sälber underschriibe. Wänn si nöd gilt, isch si nüüt wärt.“ — d Wegleitig: yönerge."
    }
  ]
};
