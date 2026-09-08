import type { MockPaper } from "../types";

/**
 * A2 · Deneme 5 — "Geld, Verträge und Ämter".
 *
 * PLAN kâğıt 1–4 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 gist · 5 detail · 5 kısa metin · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 · 5 eşleştirme · 5 · 5 R/F söyleşi)
 *   Schreiben 30 dk           özel ileti (~40) + yarı resmî ileti (~40)
 *   Sprechen  15 dk           konu sorusu · anlatı · ortak planlama
 *
 * KONU SEÇİMİ: para ve resmî işler, A2'nin en çok ihtiyaç duyulan ama en az
 * çalışılan alanı. Maddelerin çoğu tek bir koşulu okumaya dayanıyor: ücret
 * var ama şu koşulla yok, süre şu tarihe kadar, iptal şu biçimde.
 */
export const A2_05: MockPaper = {
  id: "de-a2-05",
  course: "de",
  level: "A2",
  no: 5,
  theme: "Geld, Verträge und Ämter",
  themeTr: "Para, sözleşmeler ve resmî işler",
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
          id: "de-a2-05-l1",
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
              title: "Mein erstes Konto in Deutschland",
              body: `Als ich vor zwei Jahren nach Kiel gekommen bin, hatte ich einen Koffer und kein Konto. Ohne Konto bekommt man aber keine Wohnung und keinen Lohn.

In der ersten Bank hat man mir gesagt, dass ich eine Meldebescheinigung brauche. Die bekommt man im Bürgeramt, und dafür braucht man eine Adresse. Ich hatte aber noch keine Wohnung. Ich bin dreimal hin- und hergelaufen und war ziemlich müde.

Geholfen hat mir am Ende ein Kollege. Er hat mich bei sich angemeldet, weil ich zwei Wochen bei ihm gewohnt habe. Danach ging alles schnell.

In der Bank musste ich eine Stunde warten. Der Mitarbeiter war freundlich, aber er hat sehr schnell gesprochen. Ich habe nur die Hälfte verstanden und trotzdem unterschrieben. Das war ein Fehler.

Erst nach drei Monaten habe ich gemerkt, dass mein Konto fünf Euro im Monat kostet. Für Studenten und für junge Leute unter 27 ist es kostenlos. Ich war damals 25 und hätte nur fragen müssen.

Heute habe ich ein anderes Konto und zahle nichts. Mein Rat: Unterschreiben Sie nichts, wenn Sie nicht alles verstanden haben. Fragen ist nicht peinlich, teuer ist peinlich.`,
              gloss: [
                { de: "die Meldebescheinigung", tr: "ikametgâh belgesi", en: "registration certificate" },
                { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
                { de: "peinlich", tr: "utandırıcı", en: "embarrassing" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-05-l1-1",
              no: 1,
              text: "Warum brauchte der Autor sofort ein Konto?",
              options: ["Weil er Geld sparen wollte.", "Weil er sonst keine Wohnung findet.", "Weil die Bank ihn nach der Ankunft angerufen hat."],
              answer: 1,
              explain:
                "İlk paragraf gerekçeyi veriyor: \"Ohne Konto bekommt man aber keine Wohnung und keinen Lohn\". Biriktirmek ya da bankanın araması metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l1-2",
              no: 2,
              text: "Warum war der Anfang so schwierig?",
              options: [
                "Die Bank war jeden Tag geschlossen.",
                "Er hatte kein Geld für die Gebühr.",
                "Für das Amt brauchte er eine Adresse.",
              ],
              answer: 2,
              explain:
                "Belge için ikametgâh, ikametgâh için adres gerekiyordu; yazar \"dreimal hin- und hergelaufen\" diyor. Banka her gün kapalı değildi, ücret sorunu da sonradan çıkıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l1-3",
              no: 3,
              text: "Wie hat der Kollege geholfen?",
              options: ["Er hat ihn bei sich angemeldet.", "Er hat mit der Bank telefoniert.", "Er hat ihm Geld geliehen."],
              answer: 0,
              explain:
                "Metin \"Er hat mich bei sich angemeldet\" diyor, çünkü yazar iki hafta onda kalmış. Telefon ve borç para hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l1-4",
              no: 4,
              text: "Was war in der Bank der eigentliche Fehler?",
              options: [
                "Er hat eine Stunde gewartet.",
                "Er hat unterschrieben, ohne alles zu verstehen.",
                "Er hat den falschen Mitarbeiter gefragt.",
              ],
              answer: 1,
              explain:
                "Yazar yalnız yarısını anladığını, buna rağmen imzaladığını söylüyor: \"Das war ein Fehler\". Bekleme süresi rahatsızlık, hata değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l1-5",
              no: 5,
              text: "Warum hat er drei Monate lang fünf Euro bezahlt?",
              options: ["Weil er über 27 war.", "Weil die Bank einen Fehler gemacht hat.", "Weil er nicht nach dem Preis gefragt hat."],
              answer: 2,
              explain:
                "27 yaş altı için hesap ücretsizdi ve o sırada 25 yaşındaydı: \"hätte nur fragen müssen\". Yani sorun bankanın hatası değil, sormamış olması.",
            },
          ],
        },
        {
          id: "de-a2-05-l2",
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
              title: "Der Vertrag, den fast niemand liest",
              body: `Eine Verbraucherzentrale hat 500 Menschen gefragt, ob sie ihren Handyvertrag gelesen haben. Nur 62 Personen haben Ja gesagt.

Das ist teuer. Viele Verträge laufen 24 Monate. Wer nicht rechtzeitig kündigt, verlängert automatisch. Seit 2022 gilt aber eine neue Regel: Nach dem ersten Jahr kann man jeden Monat kündigen.

Die Beraterin Nina Frisch sagt: "Die meisten Leute rufen erst an, wenn die Rechnung schon hoch ist." Ihr Tipp ist einfach. Man soll das Kündigungsdatum sofort in den Kalender schreiben, am besten drei Monate vorher.

Ein zweites Problem sind die Zusatzleistungen. Ein Musikdienst oder mehr Datenvolumen kostet oft nur zwei oder drei Euro im Monat. In zwei Jahren sind das aber bis zu 72 Euro.

Die Verbraucherzentrale hat auch etwas Gutes gefunden. Wenn man anruft und kündigen will, bekommen viele Kunden sofort ein besseres Angebot. Bei 40 Prozent der Anrufe wurde der Preis kleiner.

Frisch sagt zum Schluss: "Lesen dauert zehn Minuten. Ein falscher Vertrag dauert zwei Jahre."`,
              gloss: [
                { de: "die Verbraucherzentrale", tr: "tüketici danışma merkezi", en: "consumer advice centre" },
                { de: "kündigen", tr: "fesih bildirimi yapmak", en: "to give notice" },
                { de: "die Zusatzleistung", tr: "ek hizmet", en: "add-on service" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-05-l2-6",
              no: 6,
              text: "Wie viele der Befragten haben ihren Vertrag gelesen?",
              options: ["Fast alle von den 500.", "Etwa die Hälfte der befragten Menschen.", "62 von 500."],
              answer: 2,
              explain:
                "Sayı metinde: 500 kişiden \"nur 62 Personen\" sözleşmesini okumuş. Bu yarının çok altında.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l2-7",
              no: 7,
              text: "Was gilt seit 2022?",
              options: ["Verträge laufen nur noch zwölf Monate.", "Nach einem Jahr kann man monatlich kündigen.", "Man kann gar nicht mehr kündigen."],
              answer: 1,
              explain:
                "Yeni kural şu: \"Nach dem ersten Jahr kann man jeden Monat kündigen\". Sözleşmelerin süresi hâlâ 24 ay olabiliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l2-8",
              no: 8,
              text: "Was rät Nina Frisch?",
              options: [
                "Sich das Datum rechtzeitig notieren.",
                "Jeden Monat bei der Firma anrufen und nachfragen.",
                "Immer den billigsten Vertrag nehmen.",
              ],
              answer: 0,
              explain:
                "Tavsiyesi tarihle ilgili: fesih tarihini hemen takvime, \"am besten drei Monate vorher\" yazmak. Her ay aramak ya da en ucuzu seçmek metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l2-9",
              no: 9,
              text: "Warum sind Zusatzleistungen ein Problem?",
              options: [
                "Sie funktionieren oft nicht richtig.",
                "Der kleine Monatsbetrag summiert sich stark.",
                "Man kann sie nur zusammen mit dem Vertrag kündigen.",
              ],
              answer: 1,
              explain:
                "Metin hesabı yapıyor: ayda iki üç euro, iki yılda \"bis zu 72 Euro\". Yani sorun aylık fiyat değil, toplam.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l2-10",
              no: 10,
              text: "Was passiert oft, wenn Kunden kündigen wollen?",
              options: ["Die Firma legt sofort auf.", "Die Rechnung wird noch höher.", "Sie bekommen ein besseres Angebot."],
              answer: 2,
              explain:
                "Aramaların yüzde 40'ında fiyat düşmüş: \"bekommen viele Kunden sofort ein besseres Angebot\". Bu, metnin bulduğu olumlu nokta.",
            },
          ],
        },
        {
          id: "de-a2-05-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie die fünf kurzen Texte und die Aufgaben 11 bis 15. Wählen Sie: a, b oder c.",
          promptTr: "Beş kısa metni ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "n1",
              genre: "Brief der Bank",
              genreTr: "Bankadan mektup",
              title: "Änderung Ihrer Kontogebühr",
              body: `Sehr geehrte Frau Ilves,

ab dem 1. Juli kostet Ihr Konto 4,90 Euro im Monat statt 3,90 Euro.

Wenn Sie damit nicht einverstanden sind, können Sie bis zum 30. Juni kostenlos kündigen.

Ihre Nordbank`,
            },
            {
              kind: "text",
              id: "n2",
              genre: "E-Mail vom Bürgeramt",
              genreTr: "Nüfus dairesinden e-posta",
              title: "Ihr Termin",
              body: `Guten Tag,

Ihr Termin am 14. März um 10.20 Uhr ist bestätigt.

Bringen Sie bitte den Pass und den Mietvertrag mit. Ohne Mietvertrag können wir Sie nicht anmelden.

Kommen Sie höchstens zehn Minuten früher.`,
            },
            {
              kind: "text",
              id: "n3",
              genre: "Aushang im Verein",
              genreTr: "Dernekteki duyuru",
              title: "Mitgliedsbeitrag 2027",
              body: `Der Beitrag bleibt bei 60 Euro im Jahr.

Neu ist die Zahlung: Wir buchen ab sofort einmal im Jahr im Februar ab.

Wer bar zahlen möchte, meldet sich bis Januar im Büro.`,
            },
            {
              kind: "text",
              id: "n4",
              genre: "Kurznachricht",
              genreTr: "Kısa mesaj",
              body: `Hi Deniz, ich habe die 40 Euro auf dein Konto überwiesen.

Das Geld ist morgen bei dir.

Die Karten für das Konzert hole ich am Samstag ab. Du musst nichts mehr machen.`,
            },
            {
              kind: "text",
              id: "n5",
              genre: "Aushang der Volkshochschule",
              genreTr: "Halk eğitim merkezi duyurusu",
              title: "Kursgebühr und Rückgabe",
              body: `Die Gebühr zahlen Sie vor dem ersten Termin.

Bis zwei Wochen vor Kursbeginn bekommen Sie alles zurück.

Danach behalten wir 20 Prozent. Ab dem ersten Termin gibt es keine Rückgabe.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-05-l3-11",
              no: 11,
              ref: "n1",
              text: "Was kann Frau Ilves tun, wenn sie den neuen Preis nicht will?",
              options: ["Den Vertrag bis Ende Juni ohne Kosten beenden.", "Den alten Preis wie bisher weiterzahlen und nichts tun.", "Bis Juli eine Antwort schreiben."],
              answer: 0,
              explain:
                "Mektup tek bir seçenek veriyor: \"bis zum 30. Juni kostenlos kündigen\". Eski fiyatı sürdürmek ya da yalnız cevap yazmak yazmıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l3-12",
              no: 12,
              ref: "n2",
              text: "Was passiert ohne Mietvertrag?",
              options: ["Der Termin wird auf einen anderen Tag gelegt.", "Die Anmeldung ist nicht möglich.", "Es kostet extra."],
              answer: 1,
              explain:
                "E-posta koşulu net koyuyor: \"Ohne Mietvertrag können wir Sie nicht anmelden\". Erteleme ya da ek ücret geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l3-13",
              no: 13,
              ref: "n3",
              text: "Was ist am Beitrag neu?",
              options: ["Der Beitrag selbst.", "Die Zahl der Mitglieder im Verein.", "Der Zeitpunkt der Zahlung."],
              answer: 2,
              explain:
                "Tutar 60 euroda kalıyor; değişen şey \"Neu ist die Zahlung\" — artık yılda bir kez şubatta çekiliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l3-14",
              no: 14,
              ref: "n4",
              text: "Was muss Deniz noch machen?",
              options: ["Nichts.", "Die Karten abholen.", "Das Geld überweisen."],
              answer: 0,
              explain:
                "Para gönderilmiş, biletleri de gönderen alacak: \"Du musst nichts mehr machen\". Deniz'e kalan bir iş yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-l3-15",
              no: 15,
              ref: "n5",
              text: "Sie sagen eine Woche vor Kursbeginn ab. Was bekommen Sie?",
              options: ["Alles zurück.", "Gar nichts zurück.", "80 Prozent der Gebühr."],
              answer: 2,
              explain:
                "Tam iade yalnız iki haftadan önce; sonrasında kurum \"20 Prozent\" alıkoyuyor, yani geriye 80 kalıyor. Sıfır iade ancak ilk dersten sonra.",
            },
          ],
        },
        {
          id: "de-a2-05-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen Hilfe oder ein Angebot. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler yardım ya da bir hizmet arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Schuldnerberatung",
              body: "Kostenlose Beratung, wenn Rechnungen offen sind. Termine Mo und Do, auch mit Dolmetscher. Anmeldung telefonisch, Wartezeit etwa drei Wochen.",
            },
            {
              key: "b",
              label: "Girokonto Jung",
              body: "Ohne Grundgebühr für alle unter 27 Jahren. Karte inklusive, Online-Konto. Nachweis über Alter oder Studium nötig.",
            },
            {
              key: "c",
              label: "Mieterverein",
              body: "Wir prüfen Ihre Nebenkostenabrechnung und schreiben für Sie an den Vermieter. Mitgliedschaft 8 Euro im Monat, erste Prüfung nach drei Monaten.",
            },
            {
              key: "d",
              label: "Hilfe bei der Steuererklärung",
              body: "Für Arbeitnehmer und Rentner. Wir rechnen und senden alles digital. Beitrag nach Einkommen, ab 60 Euro im Jahr.",
            },
            {
              key: "e",
              label: "Handytarif Welt",
              body: "Telefonieren in 40 Länder ohne Aufpreis. 12 Euro im Monat, monatlich kündbar. Keine Zusatzleistungen im Preis.",
            },
            {
              key: "f",
              label: "Sparkurs am Abend",
              body: "Vier Abende über Haushaltsbuch, Konto und Versicherungen. 25 Euro, Kinderbetreuung im Haus. Beginn im Oktober.",
            },
            {
              key: "g",
              label: "Termin im Bürgeramt",
              body: "Online buchbar, aktuell frühestens in sechs Wochen. Ohne Termin nur dienstags von 7 bis 9 Uhr im Rathaus.",
            },
            {
              key: "h",
              label: "Versicherungsberatung",
              body: "Unabhängig, wir verkaufen nichts. Erstgespräch 30 Minuten kostenlos, danach 40 Euro pro Stunde. Termine auch am Samstag.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-05-l4-16",
              no: 16,
              text: "Frau Adamec kann ihre Rechnungen seit Monaten nicht bezahlen und spricht wenig Deutsch.",
              answer: "a",
              explain:
                "(a) ödenmemiş faturalar için ücretsiz danışma veriyor ve \"auch mit Dolmetscher\" diyor. Dil desteği bu ilanda var, ötekilerde yok.",
            },
            {
              kind: "match",
              id: "de-a2-05-l4-17",
              no: 17,
              text: "Timur (24) studiert und möchte ein Konto ohne monatliche Gebühr.",
              answer: "b",
              explain:
                "(b) 27 yaş altı için temel ücret almıyor ve öğrenci belgesi kabul ediyor. Timur 24 yaşında, yani koşulu karşılıyor.",
            },
            {
              kind: "match",
              id: "de-a2-05-l4-18",
              no: 18,
              text: "Herr Baric findet seine Nebenkostenabrechnung zu hoch und weiß nicht, was er schreiben soll.",
              answer: "c",
              explain:
                "(c) aidat hesabını inceliyor ve ev sahibine mektubu kendisi yazıyor. Bu iki iş birlikte yalnız bu ilanda geçiyor.",
            },
            {
              kind: "match",
              id: "de-a2-05-l4-19",
              no: 19,
              text: "Frau Nowak telefoniert jede Woche mit ihrer Familie im Ausland.",
              answer: "e",
              explain:
                "(e) \"Telefonieren in 40 Länder ohne Aufpreis\" diyor ve aylık iptal edilebiliyor. Yurt dışı görüşme ölçütünü karşılayan tek ilan.",
            },
            {
              kind: "match",
              id: "de-a2-05-l4-20",
              no: 20,
              text: "Herr Lang ist Rentner und braucht Hilfe bei seiner Steuererklärung.",
              answer: "d",
              explain:
                "(d) açıkça \"Für Arbeitnehmer und Rentner\" diyor. (h) de danışmanlık ama konusu sigorta, vergi değil.",
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
          id: "de-a2-05-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "k1",
              genre: "Gespräch in der Bank",
              genreTr: "Bankada konuşma",
              situation: "Bir müşteri kart sorunu bildiriyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Meine Karte funktioniert seit gestern nicht mehr." },
                { speaker: "Mitarbeiterin", text: "Ihre Karte ist im März abgelaufen. Die neue haben wir Ihnen im Februar geschickt." },
                { speaker: "Kunde", text: "Die habe ich nie bekommen." },
                { speaker: "Mitarbeiterin", text: "Dann bestellen wir sie neu. In fünf Tagen ist sie da." },
              ],
            },
            {
              kind: "audio",
              id: "k2",
              genre: "Gespräch am Schalter",
              genreTr: "Gişede konuşma",
              situation: "Bir müşteri para göndermek istiyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Sen", text: "Ich möchte 200 Euro nach Polen überweisen." },
                { speaker: "Mitarbeiter", text: "Am Schalter kostet das sechs Euro, online zwei." },
                { speaker: "Frau Sen", text: "Dann mache ich es lieber online." },
              ],
            },
            {
              kind: "audio",
              id: "k3",
              genre: "Telefongespräch mit dem Bürgeramt",
              genreTr: "Nüfus dairesiyle telefon konuşması",
              situation: "Biri randevu almak istiyor.",
              plays: 2,
              segments: [
                { speaker: "Anrufer", text: "Ich brauche einen Termin zum Anmelden." },
                { speaker: "Mitarbeiterin", text: "Der nächste freie Termin ist am 3. Mai." },
                { speaker: "Anrufer", text: "Das ist spät. Geht es früher?" },
                { speaker: "Mitarbeiterin", text: "Dienstags früh können Sie ohne Termin kommen." },
              ],
            },
            {
              kind: "audio",
              id: "k4",
              genre: "Gespräch im Handyladen",
              genreTr: "Telefoncuda konuşma",
              situation: "Bir müşteri sözleşmeyi iptal etmek istiyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Ich möchte meinen Vertrag kündigen." },
                { speaker: "Verkäufer", text: "Ihr Vertrag läuft noch bis Oktober. Danach können Sie monatlich kündigen." },
                { speaker: "Kundin", text: "Also erst im Oktober." },
                { speaker: "Verkäufer", text: "Genau. Schreiben Sie es sich auf." },
              ],
            },
            {
              kind: "audio",
              id: "k5",
              genre: "Gespräch zu Hause",
              genreTr: "Evde konuşma",
              situation: "İki kişi bir faturayı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Jonas", text: "Die Stromrechnung ist gekommen. Wir müssen 90 Euro nachzahlen." },
                { speaker: "Rita", text: "So viel? Haben wir mehr verbraucht?" },
                { speaker: "Jonas", text: "Nein, der Preis ist gestiegen. Der Verbrauch ist gleich geblieben." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-05-h1-1",
              no: 1,
              ref: "k1",
              text: "Was ist mit der Karte passiert?",
              options: ["Sie ist abgelaufen.", "Sie wurde gesperrt.", "Sie ist kaputtgegangen."],
              answer: 0,
              explain:
                "Banka çalışanı \"Ihre Karte ist im März abgelaufen\" diyor. Bloke ya da fiziksel arıza hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h1-2",
              no: 2,
              ref: "k2",
              text: "Wie überweist Frau Sen das Geld?",
              options: ["Am Schalter für sechs Euro.", "Sie überweist es gar nicht.", "Online für zwei Euro."],
              answer: 2,
              explain:
                "Gişe 6, internet 2 euro; Frau Sen \"Dann mache ich es lieber online\" diyor. Karar fiyat farkına dayanıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h1-3",
              no: 3,
              ref: "k3",
              text: "Was kann der Anrufer machen, wenn ihm der 3. Mai zu spät ist?",
              options: ["Er kann dienstags früh ohne Termin kommen.", "Er kann online anmelden.", "Er muss bis Mai warten."],
              answer: 0,
              explain:
                "Görevli tek alternatif veriyor: \"Dienstags früh können Sie ohne Termin kommen\". Çevrimiçi kayıt bu konuşmada geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h1-4",
              no: 4,
              ref: "k4",
              text: "Wann kann die Kundin kündigen?",
              options: ["Sofort.", "Ab Oktober.", "Erst im nächsten Jahr."],
              answer: 1,
              explain:
                "Sözleşme ekime kadar sürüyor; \"Danach können Sie monatlich kündigen\" deniyor. Müşteri de bunu \"Also erst im Oktober\" diye onaylıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h1-5",
              no: 5,
              ref: "k5",
              text: "Warum müssen die beiden nachzahlen?",
              options: ["Sie haben mehr Strom verbraucht.", "Sie haben eine Rechnung vergessen.", "Der Preis für Strom ist gestiegen."],
              answer: 2,
              explain:
                "Jonas gerekçeyi ayırıyor: \"der Preis ist gestiegen. Der Verbrauch ist gleich geblieben\". Yani tüketim değil fiyat arttı.",
            },
          ],
        },
        {
          id: "de-a2-05-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen übernehmen eine Aufgabe für die neue Wohnung. Was macht wer? Ordnen Sie zu. Drei Aufgaben bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi yeni ev için bir iş üstleniyor. Kim ne yapıyor? Eşleştir. Üç iş artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch in der WG",
              genreTr: "Ev arkadaşları arasında konuşma",
              situation: "Beş kişi resmî işleri paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Ela", text: "Wir müssen diese Woche alles anmelden. Bruno, machst du den Strom?" },
                { speaker: "Bruno", text: "Den Strom habe ich beim letzten Umzug gemacht. Diesmal bestelle ich lieber das Internet." },
                { speaker: "Ela", text: "In Ordnung. Frau Perez, Sie waren schon beim Bürgeramt. Übernehmen Sie den Strom?" },
                { speaker: "Frau Perez", text: "Ja, gern. Soll ich auch die alte Versicherung kündigen?" },
                { speaker: "Ela", text: "Nein danke, die Versicherung kündigt Aylin. Sie hat die Papiere." },
                { speaker: "Aylin", text: "Genau. Ich richte dann auch den Nachsendeauftrag bei der Post ein." },
                { speaker: "Ela", text: "Den Nachsendeauftrag mache ich, du hast diese Woche Prüfungen." },
                { speaker: "Aylin", text: "Stimmt, das hatte ich vergessen." },
              ],
            },
          ],
          options: [
            { key: "a", label: "das Internet bestellen" },
            { key: "b", label: "den Strom anmelden" },
            { key: "c", label: "die Versicherung kündigen" },
            { key: "d", label: "den Nachsendeauftrag einrichten" },
            { key: "e", label: "das Konto ummelden" },
            { key: "f", label: "die Möbel bestellen" },
            { key: "g", label: "den Mietvertrag kopieren" },
            { key: "h", label: "die Schlüssel abholen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-05-h2-6",
              no: 6,
              ref: "g1",
              text: "Bruno",
              answer: "a",
              explain:
                "Elektrik işi ona teklif ediliyor ama geçen taşınmada yaptığını söyleyip reddediyor: \"Diesmal bestelle ich lieber das Internet\".",
            },
            {
              kind: "match",
              id: "de-a2-05-h2-7",
              no: 7,
              ref: "g1",
              text: "Frau Perez",
              answer: "b",
              explain:
                "Bruno reddedince elektriği Frau Perez üstleniyor. Sigortayı da teklif ediyor ama Ela \"Nein danke\" diyor.",
            },
            {
              kind: "match",
              id: "de-a2-05-h2-8",
              no: 8,
              ref: "g1",
              text: "Aylin",
              answer: "c",
              explain:
                "Sigorta Aylin'de: \"die Versicherung kündigt Aylin. Sie hat die Papiere\". Posta işini de teklif ediyor ama sınavları olduğu için ona kalmıyor.",
            },
            {
              kind: "match",
              id: "de-a2-05-h2-9",
              no: 9,
              ref: "g1",
              text: "Ela",
              answer: "d",
              explain:
                "Aylin'in sınavları olduğu için posta yönlendirmesini Ela alıyor: \"Den Nachsendeauftrag mache ich\".",
            },
            {
              kind: "match",
              id: "de-a2-05-h2-10",
              no: 10,
              ref: "g1",
              text: "Wer kümmert sich um nichts von der Liste?",
              answer: "h",
              explain:
                "Anahtarları almak konuşmada hiç dağıtılmıyor; listede kalan işlerden biri. Konuşmada yalnız internet, elektrik, sigorta ve posta paylaşılıyor.",
            },
          ],
        },
        {
          id: "de-a2-05-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "s1",
              genre: "Gespräch im Amt",
              genreTr: "Resmî dairede konuşma",
              situation: "Bir vatandaş belgeyi getirmemiş.",
              plays: 2,
              segments: [
                { speaker: "Mitarbeiter", text: "Haben Sie die Kopie vom Pass dabei?" },
                { speaker: "Herr Kim", text: "Nein, nur das Original." },
                { speaker: "Mitarbeiter", text: "Kein Problem, wir kopieren das hier. Das kostet 20 Cent." },
              ],
            },
            {
              kind: "audio",
              id: "s2",
              genre: "Gespräch über die Miete",
              genreTr: "Kira üzerine konuşma",
              situation: "İki kişi kira artışını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Nadia", text: "Der Vermieter will die Miete um 40 Euro erhöhen." },
                { speaker: "Ruben", text: "Ab wann denn?" },
                { speaker: "Nadia", text: "Ab Januar. Aber ich habe zwei Monate Zeit zu antworten." },
              ],
            },
            {
              kind: "audio",
              id: "s3",
              genre: "Gespräch in der Beratung",
              genreTr: "Danışmada konuşma",
              situation: "Bir danışan ücreti soruyor.",
              plays: 2,
              segments: [
                { speaker: "Klientin", text: "Was kostet die Beratung?" },
                { speaker: "Berater", text: "Das erste Gespräch ist kostenlos. Danach 40 Euro pro Stunde." },
                { speaker: "Klientin", text: "Und wenn ich nur eine Frage habe?" },
                { speaker: "Berater", text: "Dann reicht das erste Gespräch meistens." },
              ],
            },
            {
              kind: "audio",
              id: "s4",
              genre: "Gespräch am Automaten",
              genreTr: "Bankamatikte konuşma",
              situation: "Biri para çekemiyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Hoff", text: "Der Automat gibt mir kein Geld." },
                { speaker: "Passant", text: "Wie viel möchten Sie denn?" },
                { speaker: "Frau Hoff", text: "Dreißig Euro." },
                { speaker: "Passant", text: "Der Automat gibt nur Fünfziger. Versuchen Sie es mit fünfzig." },
              ],
            },
            {
              kind: "audio",
              id: "s5",
              genre: "Gespräch mit einer Freundin",
              genreTr: "Bir arkadaşla konuşma",
              situation: "İki arkadaş bir hediyeyi paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Mira", text: "Das Geschenk kostet 45 Euro. Wir sind zu dritt." },
                { speaker: "Levi", text: "Also 15 Euro pro Person." },
                { speaker: "Mira", text: "Ja. Tom zahlt später, er hat gerade kein Bargeld." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-05-h3-11",
              no: 11,
              ref: "s1",
              text: "Was macht der Mitarbeiter?",
              options: ["Er schickt Herrn Kim wieder weg.", "Er kopiert den Pass im Amt.", "Er nimmt das Original und behält es."],
              answer: 1,
              explain:
                "Görevli sorunu yerinde çözüyor: \"wir kopieren das hier\" ve ücreti 20 cent. Geri gönderme ya da belgeye el koyma yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h3-12",
              no: 12,
              ref: "s2",
              text: "Ab wann soll die Miete höher sein?",
              options: ["Ab Januar.", "Ab März.", "Sofort."],
              answer: 0,
              explain:
                "Nadia \"Ab Januar\" diyor. İki ay ise cevap için tanınan süre, artışın başlangıcı değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h3-13",
              no: 13,
              ref: "s3",
              text: "Was kostet das erste Gespräch?",
              options: ["40 Euro.", "20 Euro.", "Nichts."],
              answer: 2,
              explain:
                "Danışman \"Das erste Gespräch ist kostenlos\" diyor; 40 euro sonraki saatler için geçerli.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h3-14",
              no: 14,
              ref: "s4",
              text: "Warum bekommt Frau Hoff kein Geld?",
              options: ["Ihre Karte ist gesperrt.", "Der Automat ist leer.", "Sie will einen Betrag unter fünfzig."],
              answer: 2,
              explain:
                "Otomat yalnız ellilik veriyor, o ise otuz istiyor: \"Versuchen Sie es mit fünfzig\". Kart ya da boş otomat geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-05-h3-15",
              no: 15,
              ref: "s5",
              text: "Wie viel zahlt jede Person?",
              options: ["45 Euro.", "15 Euro.", "30 Euro."],
              answer: 1,
              explain:
                "Hediye 45 euro ve üç kişiye bölünüyor; Levi hesabı yapıyor: \"Also 15 Euro pro Person\".",
            },
          ],
        },
        {
          id: "de-a2-05-h4",
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
              situation: "Bir tüketici danışmanı sık yapılan hataları anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Brandt, Sie beraten Menschen bei Geldfragen. Was ist der häufigste Fehler?" },
                { speaker: "Frau Brandt", text: "Die Leute unterschreiben zu schnell. Fast niemand liest den Vertrag zu Ende." },
                { speaker: "Moderator", text: "Ist das wirklich so schlimm?" },
                {
                  speaker: "Frau Brandt",
                  text: "Meistens nicht. Aber wenn etwas schiefgeht, ist es teuer. Ein Vertrag über zwei Jahre kostet oft mehr als tausend Euro.",
                },
                { speaker: "Moderator", text: "Und was raten Sie?" },
                {
                  speaker: "Frau Brandt",
                  text: "Nehmen Sie den Vertrag mit nach Hause. Kein seriöses Angebot verschwindet in einer Stunde.",
                },
                { speaker: "Moderator", text: "Kommen die Leute früh genug zu Ihnen?" },
                {
                  speaker: "Frau Brandt",
                  text: "Leider nein. Die meisten kommen erst, wenn schon ein Brief vom Anwalt da ist. Dann kann ich viel weniger tun.",
                },
                { speaker: "Moderator", text: "Kostet Ihre Beratung etwas?" },
                {
                  speaker: "Frau Brandt",
                  text: "Bei uns nicht, wir arbeiten mit Geld von der Stadt. In anderen Städten muss man zahlen.",
                },
                { speaker: "Moderator", text: "Ihr wichtigster Satz?" },
                { speaker: "Frau Brandt", text: "Fragen kostet nichts. Nicht fragen kostet Geld." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-05-h4-16",
              no: 16,
              ref: "i1",
              text: "Die meisten Menschen lesen ihren Vertrag ganz.",
              answer: false,
              explain:
                "Frau Brandt tersini söylüyor: \"Fast niemand liest den Vertrag zu Ende\". En sık hata olarak da bunu gösteriyor.",
            },
            {
              kind: "bool",
              id: "de-a2-05-h4-17",
              no: 17,
              ref: "i1",
              text: "Frau Brandt findet, dass ein schneller Vertrag immer schlimm ist.",
              answer: false,
              explain:
                "\"Meistens nicht\" diyor; sorun ancak bir şey ters gittiğinde ortaya çıkıyor ve o zaman pahalıya patlıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-05-h4-18",
              no: 18,
              ref: "i1",
              text: "Sie rät, den Vertrag zuerst mit nach Hause zu nehmen.",
              answer: true,
              explain:
                "Tavsiyesi açık: \"Nehmen Sie den Vertrag mit nach Hause\" ve gerekçesi ciddi bir teklifin bir saatte kaybolmayacağı.",
            },
            {
              kind: "bool",
              id: "de-a2-05-h4-19",
              no: 19,
              ref: "i1",
              text: "Die meisten Menschen kommen zu spät in die Beratung.",
              answer: true,
              explain:
                "\"Die meisten kommen erst, wenn schon ein Brief vom Anwalt da ist\" — o aşamada yapabileceği çok az kalıyor.",
            },
            {
              kind: "bool",
              id: "de-a2-05-h4-20",
              no: 20,
              ref: "i1",
              text: "Die Beratung ist überall kostenlos.",
              answer: false,
              explain:
                "Ücretsizlik yalnız kendi kurumları için geçerli: \"In anderen Städten muss man zahlen\".",
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
          id: "de-a2-05-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Freund Mattis ist mit Ihnen zum Bürgeramt gegangen und hat beim Formular geholfen. Schreiben Sie ihm eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Arkadaşın Mattis seninle nüfus dairesine geldi ve formda yardım etti. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Bedanken Sie sich.", tr: "Teşekkür et." },
              { de: "Erzählen Sie, wie es weitergegangen ist.", tr: "Sonra ne olduğunu anlat." },
              { de: "Laden Sie ihn zum Essen ein.", tr: "Onu yemeğe davet et." },
            ],
            sample: `Lieber Mattis,

vielen Dank für deine Hilfe im Bürgeramt! Allein hätte ich das Formular nicht geschafft.

Die Anmeldung hat geklappt. Der Brief ist schon gekommen und ich kann jetzt endlich ein Konto eröffnen.

Möchtest du am Samstag zum Essen kommen? Ich koche etwas aus meiner Heimat.

Liebe Grüße
Sara`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı?",
              "Hitap ve veda var mı? (Lieber … / Liebe Grüße)",
              "Sonuç somut anlatıldı mı (ne oldu, şimdi ne mümkün)?",
              "Yaklaşık 40 kelime var mı ve davet gerçekten davet biçiminde mi?",
            ],
          },
        },
        {
          id: "de-a2-05-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Sie haben eine Rechnung für einen Musikdienst bekommen, den Sie nie bestellt haben: 4,99 Euro im Monat, seit drei Monaten. Schreiben Sie an den Kundenservice (circa 40 Wörter).",
          promptTr:
            "Hiç sipariş etmediğin bir müzik hizmeti için fatura geldi: ayda 4,99 euro, üç aydır. Müşteri hizmetlerine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu anlat." },
              { de: "Sagen Sie, seit wann es besteht.", tr: "Ne zamandan beri sürdüğünü söyle." },
              { de: "Fordern Sie eine Lösung.", tr: "Bir çözüm talep et." },
            ],
            sample: `Sehr geehrte Damen und Herren,

auf meiner Rechnung steht seit drei Monaten ein Musikdienst für 4,99 Euro. Diesen Dienst habe ich nie bestellt und auch nie benutzt.

Bitte beenden Sie den Dienst sofort und zahlen Sie mir die 14,97 Euro zurück.

Meine Kundennummer ist 88 21 05.

Mit freundlichen Grüßen
Ana Molnar`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı?",
              "Sorun somut anlatıldı mı (ne, ne kadar, ne zamandan beri)?",
              "Talep açık mı — hem durdurma hem iade istendi mi?",
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
          id: "de-a2-05-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Geld im Alltag. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Konto — Bargeld — Sparen — Rechnung — Handyvertrag.",
          promptTr:
            "Konu: Gündelik hayatta para. Her anahtar sözcük için bir soru sor ve kendin de cevapla: hesap — nakit — biriktirme — fatura — telefon sözleşmesi.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über Geld im Alltag. Ihr erstes Stichwort ist: Konto. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi gündelik hayatta parayı konuşuyoruz. İlk sözcüğün: hesap. Bana bir soru sor.",
            },
            { who: "you", hint: "«Konto» sözcüğüyle bir soru kur.", expect: "Konto sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Ich habe mein Konto seit zehn Jahren bei derselben Bank. Ihr nächstes Stichwort ist: Bargeld.",
              tr: "Hesabım on yıldır aynı bankada. Sıradaki sözcüğün: nakit.",
            },
            { who: "you", hint: "«Bargeld» için bir soru kur.", expect: "Bargeld sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Ich zahle fast immer mit Karte. Und jetzt eine Frage an Sie: Sparen Sie jeden Monat etwas?",
              tr: "Neredeyse hep kartla ödüyorum. Şimdi sana bir soru: Her ay bir şeyler biriktiriyor musun?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısaca gerekçelendir.", expect: "`weil` ile gerekçelendirilmiş tam bir cevap vermek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was kostet Ihr Handyvertrag im Monat?",
              tr: "Teşekkürler. Son soru: Telefon sözleşmen ayda kaç para?",
            },
            { who: "you", hint: "Bir tutar söyle.", expect: "aylık bir tutarı Almanca söylemek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Bei welcher Bank hast du dein Konto? — Bei der Sparkasse. Hast du oft Bargeld dabei? — Nein, fast nie. Sparst du jeden Monat? — Ja, weil ich ein Auto kaufen möchte. Bezahlst du die Rechnungen online? — Immer online. Was kostet dein Handyvertrag? — Zwölf Euro im Monat.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Tutarlar doğru söylendi mi?",
            ],
          },
        },
        {
          id: "de-a2-05-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt: "Erzählen Sie: Wie bezahlen Sie im Alltag und was ist in Ihrem Heimatland üblich? Sprechen Sie etwa zwei Minuten.",
          promptTr: "Anlat: Gündelik hayatta nasıl ödeme yapıyorsun ve kendi ülkende ne yaygın? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "die eigene Gewohnheit beschreiben", tr: "Kendi alışkanlığını anlatmak" },
              { de: "das Heimatland vergleichen", tr: "Kendi ülkenle karşılaştırmak" },
              { de: "einen Vorteil und einen Nachteil nennen", tr: "Bir artı ve bir eksi söylemek" },
            ],
            sample:
              "Ich bezahle in Deutschland fast alles mit Karte. Nur beim Bäcker und auf dem Markt nehme ich Bargeld. In meinem Heimatland war das anders: Vor fünf Jahren hat man dort fast überall bar bezahlt. Heute benutzen viele Leute das Handy. Ein Vorteil von der Karte ist, dass man nicht zur Bank gehen muss. Ein Nachteil ist, dass man schneller zu viel ausgibt.",
            criteria: [
              "Kendi alışkanlığı somut anlatıldı mı (nerede kart, nerede nakit)?",
              "Karşılaştırma gerçekten karşılaştırma mı (aynı konu iki ülkede)?",
              "Bir artı ve bir eksi ayrı ayrı söylendi mi?",
              "Geçmiş zaman kullanılabildi mi? (vor fünf Jahren hat man …)",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-05-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Ihre Gruppe kauft ein Abschiedsgeschenk für die Lehrerin. Sprechen Sie über: Was kaufen? — Wie viel pro Person? — Wer sammelt das Geld? — Wann übergeben?",
          promptTr:
            "Birlikte plan yap. Grubunuz öğretmen için veda hediyesi alacak. Şunları konuş: Ne alınacak? — Kişi başı ne kadar? — Parayı kim toplayacak? — Ne zaman verilecek?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen das Geschenk. Was sollen wir kaufen? Ich habe an Blumen gedacht.",
              tr: "Hediyeyi birlikte planlıyoruz. Ne alalım? Ben çiçek düşünmüştüm.",
            },
            { who: "you", hint: "Bir hediye öner ve nedenini söyle.", expect: "somut bir hediye önermek ve gerekçelendirmek", seconds: 30 },
            {
              who: "partner",
              de: "Gute Idee. Und wie viel zahlt jede Person? Wir sind zwölf Leute im Kurs.",
              tr: "İyi fikir. Peki kişi başı ne kadar? Kursta on iki kişiyiz.",
            },
            { who: "you", hint: "Bir tutar öner ve toplamı söyle.", expect: "kişi başı tutar önermek ve toplamı hesaplamak", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Wer sammelt das Geld ein? Ich bin nächste Woche krankgeschrieben.",
              tr: "Anlaştık. Parayı kim toplayacak? Ben gelecek hafta raporluyum.",
            },
            { who: "you", hint: "İşi üstlen ya da başka bir çözüm öner.", expect: "bir görevi üstlenmek ya da gerekçeli bir alternatif sunmak", seconds: 35 },
            {
              who: "partner",
              de: "Danke. Und wann übergeben wir das Geschenk? Am letzten Tag ist der Unterricht kürzer.",
              tr: "Sağ ol. Peki hediyeyi ne zaman verelim? Son gün ders daha kısa.",
            },
            { who: "you", hint: "Bir zaman öner ve nasıl olacağını söyle.", expect: "bir zaman önermek ve akışı kısaca planlamak", seconds: 35 },
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
              "Blumen sind schön, aber sie halten nur eine Woche. Wie wäre es mit einem Gutschein für eine Buchhandlung? Wenn jeder fünf Euro gibt, haben wir sechzig Euro. Ich sammle das Geld ein, du bist ja krank. Wir geben das Geschenk am letzten Tag nach der Pause, dann sind alle da.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneri kalıpları kullanıldı mı? (Wie wäre es mit … / Sollen wir …)",
              "Basit bir hesap yapılabildi mi (kişi başı × kişi sayısı)?",
              "Karşı tarafın engeline (hastalık) gerçekten karşılık verildi mi?",
            ],
          },
        },
      ],
    },
  ],
};
