import type { MockPaper } from "../types";

/**
 * A2 · Deneme 7 — "Medien und Kommunikation".
 *
 * PLAN kâğıt 1–6 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 ana fikir · 5 ayrıntı · 5 ayrıntı · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 üç şıklı · 5 eşleştirme · 5 üç şıklı · 5 R/F söyleşi)
 *   Schreiben 30 dk           özel ileti (~40) + yarı resmî ileti (~40)
 *   Sprechen  15 dk           soru sorma · anlatma · birlikte planlama
 *
 * KONU SEÇİMİ: iletişim araçları. İlk altı kâğıt bu alana hiç girmedi, oysa
 * A2 öğrencisinin Almanya'da en çok yazılı iş çevirdiği yer burası: kurumdan
 * gelen e-posta, müşteri hizmetleriyle telefon, gruptaki mesajın kaçırılması.
 *
 * DİKKAT EDİLEN: konu teknik olduğu için metinlerin teknik sözcüğe boğulma
 * riski vardı. Bilerek tersi yapıldı — metinler cihazları değil insanları
 * anlatıyor, çünkü ölçülen şey teknik bilgi değil okuduğunu anlama.
 */
export const A2_07: MockPaper = {
  id: "de-a2-07",
  course: "de",
  level: "A2",
  no: 7,
  theme: "Medien und Kommunikation",
  themeTr: "Medya ve iletişim",
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
          id: "de-a2-07-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die fünf Texte. Worum geht es? Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Beş metni oku. Konu ne? a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Kurznachricht",
              genreTr: "Kısa mesaj",
              body: `Hallo Yusuf,

mein Handy ist gestern kaputtgegangen. Ich schreibe dir vom Rechner meiner Schwester.

Ruf mich bitte nicht an, schick lieber eine E-Mail. Ab Freitag habe ich wieder ein Gerät.

Melda`,
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Hausflur",
              genreTr: "Apartman girişindeki duyuru",
              body: `Liebe Bewohnerinnen und Bewohner,

ab Montag arbeiten wir am Internetkabel im Haus.

Zwischen 9 und 15 Uhr kann das Netz kurz ausfallen. Das Telefon funktioniert weiter.

Die Arbeiten dauern drei Tage.`,
            },
            {
              kind: "text",
              id: "t3",
              genre: "E-Mail",
              genreTr: "E-posta",
              body: `Sehr geehrte Frau Hübner,

wir haben Ihre Anfrage erhalten. Leider können wir Ihren Vertrag nicht am Telefon ändern.

Bitte schicken Sie uns das Formular per Post oder bringen Sie es in unser Büro.

Mit freundlichen Grüßen
Kundendienst`,
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Immer mehr Menschen lesen Nachrichten nur noch auf dem Handy.

Gedruckte Zeitungen verlieren Leser, vor allem bei jungen Leuten.

Ältere Leserinnen und Leser bleiben dem Papier dagegen treu.`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "Nachricht in einer Gruppe",
              genreTr: "Grup mesajı",
              body: `Leute, ich habe die Fotos vom Ausflug hochgeladen.

Der Link ist nur zwei Wochen gültig. Ladet euch die Bilder bitte vorher herunter.

Wer keinen Link bekommen hat, meldet sich bei mir.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-07-l1-1",
              no: 1,
              ref: "t1",
              text: "Worum geht es in der Nachricht?",
              options: [
                "Yusuf soll eine andere Telefonnummer benutzen.",
                "Yusuf soll das kaputte Handy reparieren.",
                "Yusuf soll bis Freitag lieber schreiben.",
              ],
              answer: 2,
              explain:
                "İki cümle birlikte okunmalı: \"Ruf mich bitte nicht an, schick lieber eine E-Mail\" ve \"Ab Freitag habe ich wieder ein Gerät\". Yani cumaya kadar yazışma.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l1-2",
              no: 2,
              ref: "t2",
              text: "Was sagt der Aushang?",
              options: [
                "Das Internet kann tagsüber ausfallen.",
                "Das Telefon fällt drei Tage lang komplett aus.",
                "Die Bewohner müssen zu Hause bleiben.",
              ],
              answer: 0,
              explain:
                "\"Zwischen 9 und 15 Uhr kann das Netz kurz ausfallen\" — kesinti gündüz ve kısa. Telefon için tam tersi yazıyor: \"Das Telefon funktioniert weiter\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l1-3",
              no: 3,
              ref: "t3",
              text: "Was soll Frau Hübner tun?",
              options: [
                "Noch einmal im Büro anrufen.",
                "Einen ganz neuen Vertrag abschließen.",
                "Das Formular einreichen.",
              ],
              answer: 2,
              explain:
                "Telefon yolu kapalı: \"nicht am Telefon ändern\" deniyor ve karşılığında iki yol veriliyor — \"per Post oder bringen Sie es in unser Büro\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l1-4",
              no: 4,
              ref: "t4",
              text: "Was ist die Hauptaussage?",
              options: [
                "Junge Leute lesen überhaupt keine Nachrichten.",
                "Jüngere lesen lieber am Handy.",
                "Zeitungen verschwinden in kurzer Zeit ganz.",
              ],
              answer: 1,
              explain:
                "Metin gençlerin haber okumadığını değil, nerede okuduğunu söylüyor: kayıp \"vor allem bei jungen Leuten\", yaşlılar ise kâğıda sadık.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l1-5",
              no: 5,
              ref: "t5",
              text: "Was soll man machen?",
              options: [
                "Die Bilder speichern.",
                "Möglichst neue Fotos hochladen.",
                "Sich einen anderen Link besorgen.",
              ],
              answer: 0,
              explain:
                "Bağlantının süresi sınırlı — \"nur zwei Wochen gültig\" — ve rica bu yüzden geliyor: \"Ladet euch die Bilder bitte vorher herunter\".",
            },
          ],
        },
        {
          id: "de-a2-07-l2",
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
              title: "Dienstags ist die Bücherei voll",
              body: `Die Bücherei in Rotenfeld ist klein. Trotzdem kommen jeden Dienstag über dreißig Menschen.

Der Grund ist ein Kurs. Zwei junge Leute erklären älteren Nachbarn das Internet.

"Am Anfang wollten wir nur zeigen, wie man E-Mails schreibt", sagt Nadja Steiner. Sie ist neunzehn und studiert noch.

Heute sind die Fragen andere. Viele Teilnehmer möchten mit ihren Enkeln telefonieren und sie dabei sehen.

Die Bücherei leiht auch Geräte aus. Wer keinen Rechner hat, bekommt für zwei Wochen einen Laptop.

Ein Problem gibt es aber: Das Netz im Dorf ist langsam. Videotelefonate brechen oft ab.

Die Gemeinde hat jetzt Geld für ein besseres Kabel bekommen. Im Herbst soll es verlegt werden.

Frau Steiner freut sich darüber. Sie sagt aber auch: "Technik allein reicht nicht. Man braucht jemanden, der Zeit hat."`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-07-l2-6",
              no: 6,
              ref: "r1",
              text: "Warum kommen dienstags so viele Leute in die Bücherei?",
              options: ["Weil sie dort Bücher tauschen können.", "Wegen eines Kurses.", "Weil die Bücherei neu eröffnet hat."],
              answer: 1,
              explain:
                "Metin soruyu doğrudan cevaplıyor: \"Der Grund ist ein Kurs\". Otuzdan fazla kişi bu yüzden geliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l2-7",
              no: 7,
              ref: "r1",
              text: "Was hat sich seit dem Anfang geändert?",
              options: ["Die Fragen der Teilnehmer.", "Es kommen weniger Teilnehmer.", "Der Kurs findet woanders statt."],
              answer: 0,
              explain:
                "Başlangıçta amaç e-posta yazmaktı; \"Heute sind die Fragen andere\" cümlesi değişimi söylüyor. Katılımcı sayısı ya da yer hiç değişmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l2-8",
              no: 8,
              ref: "r1",
              text: "Was bekommt jemand, der keinen Rechner hat?",
              options: ["Einen Laptop.", "Geld für ein neues eigenes Gerät.", "Einen Platz im nächsten Kurs."],
              answer: 0,
              explain:
                "\"Wer keinen Rechner hat, bekommt für zwei Wochen einen Laptop\" — kütüphane cihaz ödünç veriyor, para vermiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l2-9",
              no: 9,
              ref: "r1",
              text: "Welches Problem nennt der Text?",
              options: ["Es gibt zu wenige Laptops.", "Die Verbindung ist zu langsam.", "Die jungen Leute haben keine Zeit."],
              answer: 1,
              explain:
                "\"Das Netz im Dorf ist langsam. Videotelefonate brechen oft ab\" — sorun bağlantıda. Laptop sayısı ve gençlerin zamanı hiç sorun olarak geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l2-10",
              no: 10,
              ref: "r1",
              text: "Was meint Frau Steiner am Ende?",
              options: [
                "Ein besseres Kabel löst schon alles.",
                "Der Kurs sollte öfter stattfinden.",
                "Es braucht auch Zeit von Menschen.",
              ],
              answer: 2,
              explain:
                "Son alıntı iki parçalı: \"Technik allein reicht nicht. Man braucht jemanden, der Zeit hat.\" Yani kablo tek başına yetmiyor.",
            },
          ],
        },
        {
          id: "de-a2-07-l3",
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
              title: "Vier Wochen ohne Smartphone",
              body: `Im Februar habe ich mein Handy in eine Schublade gelegt. Ich wollte wissen, was dann passiert.

Die ersten drei Tage waren schlimm. Ich habe ständig in meine leere Hosentasche gegriffen.

Danach wurde es besser. Ich habe wieder Zeitung gelesen und bin öfter zu Fuß gegangen.

Schwierig war nur die Arbeit. Meine Kollegen schreiben alles in eine Gruppe, und ich habe die Hälfte nicht mitbekommen.

Zweimal bin ich deshalb zu spät zu einem Termin gekommen. Das war mir sehr unangenehm.

Am Ende des Monats habe ich das Handy wieder ausgepackt. Aber ich habe alle Töne ausgeschaltet.

Heute schaue ich dreimal am Tag auf den Bildschirm. Vorher waren es sicher fünfzig Mal.

Ich empfehle den Versuch. Ganz ohne Handy zu leben, das geht bei mir aber nicht.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-07-l3-11",
              no: 11,
              ref: "r2",
              text: "Warum hat der Autor das Handy weggelegt?",
              options: ["Weil es kaputt war.", "Aus Neugier.", "Weil sein Chef es wollte."],
              answer: 1,
              explain:
                "Sebep ikinci cümlede: \"Ich wollte wissen, was dann passiert\". Ne arıza ne de başkasının isteği geçiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l3-12",
              no: 12,
              ref: "r2",
              text: "Wie waren die ersten Tage?",
              options: ["Sehr schwer.", "Ganz normal.", "Angenehm ruhig."],
              answer: 0,
              explain:
                "\"Die ersten drei Tage waren schlimm\" — rahatlama ancak sonra geliyor: \"Danach wurde es besser\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l3-13",
              no: 13,
              ref: "r2",
              text: "Wo gab es das größte Problem?",
              options: ["Beim Lesen der Zeitung.", "Bei der Arbeit.", "Beim Einkaufen im Ort."],
              answer: 1,
              explain:
                "\"Schwierig war nur die Arbeit\" — `nur` sözcüğü sorunu tek alana bağlıyor. Gazete metinde geçiyor ama sorun olarak değil, tersine: telefonsuz dönemin kazancı.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l3-14",
              no: 14,
              ref: "r2",
              text: "Was war die Folge der Gruppen-Nachrichten?",
              options: ["Der Autor kam zu spät.", "Die Kollegen waren sehr beleidigt.", "Der Autor hat schließlich gekündigt."],
              answer: 0,
              explain:
                "Mesajların yarısı kaçırılınca sonuç geliyor: \"Zweimal bin ich deshalb zu spät zu einem Termin gekommen\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-l3-15",
              no: 15,
              ref: "r2",
              text: "Was macht der Autor heute anders?",
              options: ["Er hat gar kein Handy mehr.", "Er benutzt nur noch die Zeitung.", "Er schaut viel seltener hin."],
              answer: 2,
              explain:
                "İki sayı karşılaştırılıyor: bugün \"dreimal am Tag\", eskiden \"sicher fünfzig Mal\". Telefonu tümden bıraktığını ise açıkça yalanlıyor.",
            },
          ],
        },
        {
          id: "de-a2-07-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen Hilfe. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler yardım arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Handy-Reparatur Schnell",
              body: "Display und Akku in einer Stunde. Ohne Termin, Mo–Sa 10 bis 19 Uhr. Für alle Geräte, Preis vorher am Tresen.",
            },
            {
              key: "b",
              label: "Deutsch am Telefon",
              body: "Wir üben Telefonate für Ämter und Arztpraxen. Einzeln, 45 Minuten, 15 Euro. Auch am Abend möglich.",
            },
            {
              key: "c",
              label: "Internet für Senioren",
              body: "Kleine Gruppen, höchstens sechs Personen. Wir bringen die Geräte mit. Dienstagvormittag im Bürgerhaus, kostenlos.",
            },
            {
              key: "d",
              label: "Vom Papier auf den Rechner",
              body: "Wir scannen alte Bilder und Dias. Ab 50 Stück, 20 Cent pro Bild. Abgabe und Abholung im Laden.",
            },
            {
              key: "e",
              label: "Laptop leihen",
              body: "Für Schülerinnen und Schüler bis 18 Jahre. Zwei Wochen kostenlos, Verlängerung möglich. Anmeldung nur mit Schulausweis.",
            },
            {
              key: "f",
              label: "Zeitung vorlesen",
              body: "Freiwillige lesen einmal pro Woche vor. Für Menschen, die schlecht sehen. Wir kommen nach Hause, ohne Kosten.",
            },
            {
              key: "g",
              label: "Videokurs für Anfänger",
              body: "Sie lernen, wie man ein Video aufnimmt und schneidet. Sechs Abende, 60 Euro. Eigenes Gerät mitbringen.",
            },
            {
              key: "h",
              label: "Briefe verstehen",
              body: "Sie bekommen Post vom Amt und wissen nicht weiter? Wir erklären den Brief. Mittwochs 14 bis 17 Uhr, kostenlos.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-07-l4-16",
              no: 16,
              text: "Frau Okonkwo hat einen Brief von der Krankenkasse bekommen und versteht ihn nicht.",
              answer: "h",
              explain:
                "(h) tam bunu yapıyor: \"Sie bekommen Post vom Amt und wissen nicht weiter? Wir erklären den Brief.\" (b) de kurumla iletişimi çalıştırıyor ama telefonda konuşmayı, mektup okumayı değil.",
            },
            {
              kind: "match",
              id: "de-a2-07-l4-17",
              no: 17,
              text: "Herr Tamm sieht sehr schlecht und möchte trotzdem wissen, was in der Stadt passiert.",
              answer: "f",
              explain:
                "(f) \"Für Menschen, die schlecht sehen\" diyor ve haberi eve getiriyor. Görme sorunu yalnız bu ilanda geçiyor.",
            },
            {
              kind: "match",
              id: "de-a2-07-l4-18",
              no: 18,
              text: "Frau Malik ist 68 und möchte in einer kleinen Gruppe das Internet lernen. Sie hat kein eigenes Gerät.",
              answer: "c",
              explain:
                "(c) iki koşulu birden karşılıyor: \"höchstens sechs Personen\" ve \"Wir bringen die Geräte mit\". (g) de kurs veriyor ama kendi cihazını istiyor.",
            },
            {
              kind: "match",
              id: "de-a2-07-l4-19",
              no: 19,
              text: "Der Sohn von Herrn Reiss ist 16 und braucht für die Schule einen Rechner.",
              answer: "e",
              explain:
                "(e) \"Für Schülerinnen und Schüler bis 18 Jahre\" diyor ve ücretsiz veriyor. On altı yaş bu sınırın içinde.",
            },
            {
              kind: "match",
              id: "de-a2-07-l4-20",
              no: 20,
              text: "Frau Doria hat viele alte Familienbilder auf Papier und möchte sie auf dem Rechner haben.",
              answer: "d",
              explain:
                "(d) \"Wir scannen alte Bilder und Dias\" diyor — kâğıttaki resmi dosyaya çeviren tek ilan bu.",
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
          id: "de-a2-07-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch im Handyladen",
              genreTr: "Telefon dükkânında konuşma",
              situation: "Bir müşteri pil sorununu anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Mein Akku ist schon nach vier Stunden leer. Kann man das reparieren?" },
                { speaker: "Verkäufer", text: "Ja, ein neuer Akku kostet fünfundsechzig Euro. Ein neues Gerät kostet viel mehr." },
                { speaker: "Kundin", text: "Dann machen wir das." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Telefongespräch mit dem Kundendienst",
              genreTr: "Müşteri hizmetleriyle telefon",
              situation: "Bir müşteri internetinin kesildiğini bildiriyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Reiss", text: "Mein Internet ist seit gestern weg." },
                { speaker: "Mitarbeiterin", text: "Bei Ihnen im Haus wird gerade gearbeitet. Ab Donnerstag läuft es wieder." },
                { speaker: "Herr Reiss", text: "Und bis dahin?" },
                { speaker: "Mitarbeiterin", text: "Leider können wir da nichts machen." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch in der Bücherei",
              genreTr: "Kütüphanede konuşma",
              situation: "Bir kadın dizüstü bilgisayar ödünç almak istiyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Malik", text: "Ich möchte einen Laptop leihen." },
                { speaker: "Mitarbeiter", text: "Gern. Sind Sie über achtzehn? Dann brauchen wir nur Ihren Ausweis." },
                { speaker: "Frau Malik", text: "Ich bin achtundsechzig." },
                { speaker: "Mitarbeiter", text: "Dann geht es sofort." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch unter Kollegen",
              genreTr: "İş arkadaşları arasında konuşma",
              situation: "Biri gruptaki mesajı kaçırmış.",
              plays: 2,
              segments: [
                { speaker: "Herr Tamm", text: "Hast du die Nachricht in der Gruppe gelesen?" },
                { speaker: "Frau Grün", text: "Nein, ich bin da nicht mehr drin. Zu viele Nachrichten." },
                { speaker: "Herr Tamm", text: "Die Besprechung ist auf Mittwoch verschoben. Der Raum bleibt gleich." },
                { speaker: "Frau Grün", text: "Danke, das wusste ich nicht." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch am Empfang",
              genreTr: "Danışmada konuşma",
              situation: "Bir kadın cevapsız kalan e-postasını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Doria", text: "Ich habe eine E-Mail geschrieben, aber keine Antwort bekommen." },
                { speaker: "Mitarbeiter", text: "Wann war das?" },
                { speaker: "Frau Doria", text: "Vor zehn Tagen." },
                { speaker: "Mitarbeiter", text: "Dann schauen wir gleich nach. Manchmal landet Post im falschen Ordner." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-07-h1-1",
              no: 1,
              ref: "a1",
              text: "Wofür entscheidet sich die Kundin?",
              options: ["Für einen neuen Akku.", "Für ein neues Handy.", "Für gar keine Reparatur."],
              answer: 0,
              explain:
                "Satıcı iki yol veriyor ve fiyatı olanı adlandırıyor: \"ein neuer Akku kostet fünfundsechzig Euro\". Müşterinin \"Dann machen wir das\" cevabı bunu onaylıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h1-2",
              no: 2,
              ref: "a2",
              text: "Wann funktioniert das Internet wieder?",
              options: ["Schon heute Abend.", "Ab Donnerstag.", "Erst nächsten Monat."],
              answer: 1,
              explain:
                "Görevli tek tarih söylüyor: \"Ab Donnerstag läuft es wieder\". O zamana kadar yapılabilecek bir şey olmadığını da ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h1-3",
              no: 3,
              ref: "a3",
              text: "Was braucht Frau Malik?",
              options: ["Nur ihren Ausweis.", "Eine Anmeldung im Kurs.", "Die Unterschrift der Familie."],
              answer: 0,
              explain:
                "Koşul yaşa bağlı: on sekizden büyükler için \"brauchen wir nur Ihren Ausweis\". Kadın altmış sekiz olduğunu söyleyince işlem hemen yapılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h1-4",
              no: 4,
              ref: "a4",
              text: "Was hat sich geändert?",
              options: ["Der Ort der großen Besprechung.", "Der Tag der Besprechung.", "Die Gruppe im Chat."],
              answer: 1,
              explain:
                "Kayıt ikisini ayırıyor: \"Die Besprechung ist auf Mittwoch verschoben. Der Raum bleibt gleich.\" Değişen gün, yer değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h1-5",
              no: 5,
              ref: "a5",
              text: "Was macht der Mitarbeiter?",
              options: ["Er schreibt die E-Mail neu.", "Er ruft Frau Doria später an.", "Er sucht die Nachricht."],
              answer: 2,
              explain:
                "\"Dann schauen wir gleich nach\" — hemen arayacağını söylüyor ve nedenini de veriyor: mesaj yanlış klasöre düşmüş olabilir.",
            },
          ],
        },
        {
          id: "de-a2-07-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen sagen, was sie lernen möchten. Wer möchte was? Ordnen Sie zu. Drei Themen bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi ne öğrenmek istediğini söylüyor. Kim neyi istiyor? Eşleştir. Üç konu artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch im Kurs",
              genreTr: "Kursta konuşma",
              situation: "Kurs başlarken herkes beklentisini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Kursleiterin", text: "Damit ich den Kurs planen kann: Was möchte jede und jeder lernen? Herr Tamm?" },
                { speaker: "Herr Tamm", text: "Ich möchte meine Fotos vom Handy auf den Rechner bringen." },
                { speaker: "Kursleiterin", text: "Gut. Frau Okonkwo?" },
                {
                  speaker: "Frau Okonkwo",
                  text: "Fotos kann ich schon. Mir geht es um die Briefe vom Amt — ich möchte sie am Rechner ausfüllen.",
                },
                { speaker: "Kursleiterin", text: "Und Sie, Frau Malik?" },
                { speaker: "Frau Malik", text: "Ich will endlich mit meiner Tochter in Kanada sprechen und sie dabei sehen." },
                { speaker: "Kursleiterin", text: "Herr Reiss?" },
                { speaker: "Herr Reiss", text: "Bei mir ist es einfacher. Ich verliere ständig meine Passwörter." },
                { speaker: "Kursleiterin", text: "Und zum Schluss Frau Doria." },
                { speaker: "Frau Doria", text: "Ich kaufe gern im Netz ein, aber beim Bezahlen traue ich mich nicht." },
              ],
            },
          ],
          options: [
            { key: "a", label: "Fotos übertragen" },
            { key: "b", label: "Formulare am Rechner ausfüllen" },
            { key: "c", label: "Videotelefonate führen" },
            { key: "d", label: "Passwörter verwalten" },
            { key: "e", label: "sicher online bezahlen" },
            { key: "f", label: "eine eigene Seite bauen" },
            { key: "g", label: "Musik herunterladen" },
            { key: "h", label: "Briefe ausdrucken" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-07-h2-6",
              no: 6,
              ref: "g1",
              text: "Herr Tamm",
              answer: "a",
              explain:
                "\"Ich möchte meine Fotos vom Handy auf den Rechner bringen\" — aktarma isteği yalnız onda geçiyor.",
            },
            {
              kind: "match",
              id: "de-a2-07-h2-7",
              no: 7,
              ref: "g1",
              text: "Frau Okonkwo",
              answer: "b",
              explain:
                "Mektuptan söz ediyor ama istediği yazdırmak değil: \"ich möchte sie am Rechner ausfüllen\". (h) tam bu yüzden çeldirici.",
            },
            {
              kind: "match",
              id: "de-a2-07-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Malik",
              answer: "c",
              explain:
                "İki şeyi birlikte istiyor: konuşmak \"und sie dabei sehen\". Görüntülü görüşme bunun karşılığı.",
            },
            {
              kind: "match",
              id: "de-a2-07-h2-9",
              no: 9,
              ref: "g1",
              text: "Herr Reiss",
              answer: "d",
              explain:
                "\"Ich verliere ständig meine Passwörter\" — sorun tek cümlede ve başka kimse şifreden söz etmiyor.",
            },
            {
              kind: "match",
              id: "de-a2-07-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Doria",
              answer: "e",
              explain:
                "Alışverişi zaten yapıyor; çekindiği yer belirli: \"beim Bezahlen traue ich mich nicht\".",
            },
          ],
        },
        {
          id: "de-a2-07-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Ansage einer Hotline",
              genreTr: "Çağrı merkezi anonsu",
              situation: "Müşteri hizmetleri karşılama anonsu.",
              plays: 2,
              segments: [
                {
                  text: "Willkommen beim Kundendienst. Für Fragen zum Vertrag drücken Sie die Eins, für Störungen die Zwei. Alle Mitarbeiter sind gerade im Gespräch. Die Wartezeit beträgt etwa acht Minuten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kütüphane rezervasyonu haber veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Frau Grün, hier ist die Bücherei. Der Laptop, den Sie reserviert haben, ist da. Wir halten ihn bis Freitag für Sie zurück. Danach geht er an die nächste Person.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Durchsage im Zug",
              genreTr: "Trende anons",
              situation: "Trende internet arızası.",
              plays: 2,
              segments: [
                {
                  text: "Sehr geehrte Fahrgäste, das Internet im Zug fällt heute aus. Wir arbeiten daran. Telefonieren ist weiter möglich. Wir bitten um Ihr Verständnis.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Bir toplantı bağlantısı gönderiliyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Kim, ich schicke dir gleich den Link für die Besprechung. Er funktioniert nur einmal. Wenn du ihn weitergibst, kommt die andere Person nicht mehr rein.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Meldung im Radio",
              genreTr: "Radyo haberi",
              situation: "Bölgeye hızlı internet geliyor.",
              plays: 2,
              segments: [
                {
                  text: "Und zum Schluss die Meldung des Tages: Ab September gibt es im ganzen Landkreis schnelleres Internet. Die Arbeiten beginnen schon im Juli. Bis dahin bleibt alles wie bisher.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-07-h3-11",
              no: 11,
              ref: "m1",
              text: "Wie lange muss man ungefähr warten?",
              options: ["Etwa zwei Minuten.", "Etwa acht Minuten.", "Etwa achtzehn Minuten."],
              answer: 1,
              explain:
                "Anonsta üç sayı geçiyor ve ikisi tuş numarası: bir ve iki. Bekleme süresi ayrı söyleniyor: \"Die Wartezeit beträgt etwa acht Minuten\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h3-12",
              no: 12,
              ref: "m2",
              text: "Bis wann wird der Laptop zurückgehalten?",
              options: ["Nur bis heute Abend.", "Bis Freitag.", "Bis Ende des Monats."],
              answer: 1,
              explain:
                "\"Wir halten ihn bis Freitag für Sie zurück\" — sonrasında sıradaki kişiye gidiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h3-13",
              no: 13,
              ref: "m3",
              text: "Was funktioniert noch?",
              options: ["Das Internet.", "Nur die Steckdosen.", "Das Telefonieren."],
              answer: 2,
              explain:
                "Anons ikisini karşı karşıya koyuyor: internet arızalı, ama \"Telefonieren ist weiter möglich\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h3-14",
              no: 14,
              ref: "m4",
              text: "Was gilt für den Link?",
              options: ["Nur einer kommt damit rein.", "Er gilt eine ganze Woche lang.", "Man darf ihn ruhig weitergeben."],
              answer: 0,
              explain:
                "İki cümle birlikte anlam veriyor: \"Er funktioniert nur einmal\" ve paylaşılırsa \"kommt die andere Person nicht mehr rein\".",
            },
            {
              kind: "mcq",
              id: "de-a2-07-h3-15",
              no: 15,
              ref: "m5",
              text: "Wann beginnen die Arbeiten?",
              options: ["Im Juli.", "Im September.", "Erst im nächsten Jahr."],
              answer: 0,
              explain:
                "Haber iki ay veriyor ve ayırıyor: sonuç eylülde, ama \"Die Arbeiten beginnen schon im Juli\".",
            },
          ],
        },
        {
          id: "de-a2-07-h4",
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
              situation: "Yaşlılara internet kursu veren biri anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Steiner, Sie geben Internetkurse für ältere Menschen. Was überrascht Sie am meisten?" },
                {
                  speaker: "Frau Steiner",
                  text: "Wie schnell es geht. Die meisten brauchen keine zehn Stunden. Was fehlt, ist nicht der Kopf, sondern jemand, der in Ruhe zeigt.",
                },
                { speaker: "Moderator", text: "Haben die Teilnehmer Angst vor der Technik?" },
                {
                  speaker: "Frau Steiner",
                  text: "Angst vor der Technik ist das falsche Wort. Sie haben Angst davor, etwas kaputt zu machen. Das ist etwas anderes.",
                },
                { speaker: "Moderator", text: "Was lernen die Leute zuerst?" },
                {
                  speaker: "Frau Steiner",
                  text: "Fast alle wollen Bilder von den Enkeln sehen. Damit fangen wir an, nicht mit E-Mail.",
                },
                { speaker: "Moderator", text: "Brauchen Ihre Kurse teure Geräte?" },
                {
                  speaker: "Frau Steiner",
                  text: "Nein. Wir arbeiten mit den Geräten, die die Leute schon haben. Ein neues Tablet macht niemanden sicherer.",
                },
                { speaker: "Moderator", text: "Und was raten Sie den Familien?" },
                {
                  speaker: "Frau Steiner",
                  text: "Nicht für die Eltern klicken. Wer immer nur zuschaut, lernt nichts.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-07-h4-16",
              no: 16,
              ref: "i1",
              text: "Frau Steiner findet, dass die Teilnehmer sehr lange brauchen.",
              answer: false,
              explain:
                "Tam tersini söylüyor ve şaşırdığı şey bu: \"Wie schnell es geht. Die meisten brauchen keine zehn Stunden.\"",
            },
            {
              kind: "bool",
              id: "de-a2-07-h4-17",
              no: 17,
              ref: "i1",
              text: "Nach Frau Steiner haben die Teilnehmer Angst, etwas kaputt zu machen.",
              answer: true,
              explain:
                "Korkuyu reddetmiyor, adını değiştiriyor: \"Sie haben Angst davor, etwas kaputt zu machen. Das ist etwas anderes.\"",
            },
            {
              kind: "bool",
              id: "de-a2-07-h4-18",
              no: 18,
              ref: "i1",
              text: "Der Kurs beginnt mit dem Schreiben von E-Mails.",
              answer: false,
              explain:
                "Başlangıç açıkça söyleniyor ve e-posta dışlanıyor: \"Damit fangen wir an, nicht mit E-Mail\". Başlangıç torunların fotoğrafları.",
            },
            {
              kind: "bool",
              id: "de-a2-07-h4-19",
              no: 19,
              ref: "i1",
              text: "Frau Steiner hält ein neues Gerät nicht für nötig.",
              answer: true,
              explain:
                "\"Wir arbeiten mit den Geräten, die die Leute schon haben\" diyor ve ekliyor: \"Ein neues Tablet macht niemanden sicherer\".",
            },
            {
              kind: "bool",
              id: "de-a2-07-h4-20",
              no: 20,
              ref: "i1",
              text: "Frau Steiner rät den Familien, die Aufgaben selbst zu übernehmen.",
              answer: false,
              explain:
                "Öğüdü bunun tersi: \"Nicht für die Eltern klicken. Wer immer nur zuschaut, lernt nichts.\"",
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
          id: "de-a2-07-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Nadja hat Ihnen ihr altes Tablet geliehen. Schreiben Sie ihr eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Arkadaşın Nadja sana eski tabletini ödünç verdi. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Bedanken Sie sich.", tr: "Teşekkür et." },
              { de: "Sagen Sie, wofür Sie das Tablet benutzen.", tr: "Tableti ne için kullandığını söyle." },
              { de: "Fragen Sie, wie lange Sie es behalten dürfen.", tr: "Ne kadar süre tutabileceğini sor." },
            ],
            sample: `Liebe Nadja,

vielen Dank für das Tablet! Es hat mir schon am ersten Abend sehr geholfen.

Ich schaue damit die Videos für meinen Deutschkurs an und schreibe die Hausaufgaben darauf.

Wie lange darf ich es behalten? Wenn du es früher brauchst, sag mir einfach Bescheid.

Herzliche Grüße
Elif`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı? `Sie` burada fazla resmî kalır.",
              "Kullanım somut mu (ne için, hangi durumda), yoksa genel bir cümle mi?",
              "Süre sorusu gerçekten soru biçiminde mi kuruldu?",
              "Yaklaşık 40 kelime var mı ve hitap ile veda var mı?",
            ],
          },
        },
        {
          id: "de-a2-07-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Ihr Internetanschluss funktioniert seit einer Woche nicht. Schreiben Sie an den Kundendienst Ihres Anbieters (circa 40 Wörter).",
          promptTr:
            "İnternet bağlantın bir haftadır çalışmıyor. Sağlayıcının müşteri hizmetlerine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu tarif et." },
              { de: "Sagen Sie, was Sie schon versucht haben.", tr: "Neyi denediğini söyle." },
              { de: "Bitten Sie um einen Termin.", tr: "Bir randevu iste." },
            ],
            sample: `Sehr geehrte Damen und Herren,

seit dem 3. März funktioniert mein Internet nicht mehr. Der Anschluss läuft auf meinen Namen, Kundennummer 48120.

Ich habe das Gerät zweimal aus- und wieder eingeschaltet. Das hat leider nichts geändert.

Können Sie mir bitte in dieser Woche einen Termin geben?

Mit freundlichen Grüßen
Ismail Ayaz`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı?",
              "Sorun ne zamandan beri sürdüğü belirtilerek somutlandı mı?",
              "Denenen şey gerçekten bir adım mı (kapatıp açmak, kablo kontrolü), yoksa genel bir cümle mi?",
              "Randevu talebi rica biçiminde kuruldu mu ve yaklaşık 40 kelime mi?",
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
          id: "de-a2-07-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Handy und Internet. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Handy — Nachrichten — Fotos — Internet — Kosten.",
          promptTr:
            "Konu: Telefon ve internet. Her anahtar sözcük için bir soru sor ve kendin de cevapla: telefon — mesajlar — fotoğraflar — internet — masraf.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Handy und Internet. Ihr erstes Stichwort ist: Handy. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi telefon ve internet konusunu konuşuyoruz. İlk sözcüğün: telefon. Bana bir soru sor.",
            },
            { who: "you", hint: "«Handy» sözcüğüyle bir soru kur.", expect: "Handy sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Ich habe mein Handy seit vier Jahren. Ihr nächstes Stichwort ist: Nachrichten.",
              tr: "Telefonum dört yıllık. Sıradaki sözcüğün: mesajlar.",
            },
            { who: "you", hint: "«Nachrichten» için bir soru kur.", expect: "Nachrichten sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Ich schreibe lieber, als zu telefonieren. Und jetzt eine Frage an Sie: Machen Sie viele Fotos mit dem Handy?",
              tr: "Telefon etmektense yazmayı yeğlerim. Şimdi sana bir soru: Telefonla çok fotoğraf çeker misin?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısaca gerekçelendir.", expect: "`weil` ile gerekçelendirilmiş tam bir cevap vermek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wie viel zahlen Sie im Monat für Handy und Internet?",
              tr: "Teşekkürler. Son soru: Telefon ve internet için ayda ne kadar ödüyorsun?",
            },
            { who: "you", hint: "Bir tutar söyle ve kısaca değerlendir.", expect: "bir tutar söylemek ve pahalı/uygun bulduğunu belirtmek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Wie lange hast du dein Handy schon? — Seit zwei Jahren. Schreibst du viele Nachrichten? — Ja, jeden Tag. Machst du oft Fotos? — Ja, weil ich sie meiner Familie schicke. Wie schnell ist dein Internet? — Zu Hause geht es, im Zug nicht. Was zahlst du im Monat? — Ungefähr dreißig Euro, das finde ich in Ordnung.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Tutar ve süre gibi sayılar söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a2-07-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie: Wie halten Sie Kontakt zu Ihrer Familie und zu Ihren Freunden, und was hat sich in den letzten Jahren geändert? Sprechen Sie etwa zwei Minuten.",
          promptTr:
            "Anlat: Ailenle ve arkadaşlarınla nasıl bağını koruyorsun, son yıllarda ne değişti? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "sagen, wie Sie Kontakt halten", tr: "Nasıl iletişim kurduğunu söylemek" },
              { de: "eine Veränderung beschreiben", tr: "Bir değişimi anlatmak" },
              { de: "sagen, was Ihnen besser gefällt", tr: "Neyi daha çok sevdiğini söylemek" },
            ],
            sample:
              "Mit meiner Familie spreche ich fast jeden Sonntag. Wir sehen uns dabei auf dem Bildschirm, meine Mutter mag das sehr. Früher haben wir nur telefoniert, und das war teuer. Meine Großmutter hat lange Briefe geschrieben. Die habe ich bis heute aufgehoben. Heute geht alles schneller, aber wir schreiben weniger. Am liebsten telefoniere ich mit Bild, weil ich dann sehe, wie es allen geht.",
            criteria: [
              "İletişim yolları somut anlatıldı mı (kim, ne sıklıkla, hangi araçla)?",
              "Değişim gerçekten karşılaştırma biçiminde mi verildi? (früher … heute …)",
              "Geçmiş zaman kullanılabildi mi?",
              "Kendi tercihi söylendi ve gerekçelendirildi mi?",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-07-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Ihr Kurs möchte eine gemeinsame Gruppe im Netz gründen. Sprechen Sie über: Wer richtet die Gruppe ein? — Welche Regeln? — Wann darf man schreiben? — Was tun, wenn jemand kein Handy hat?",
          promptTr:
            "Birlikte plan yap. Kursunuz ortak bir grup kurmak istiyor. Şunları konuş: Grubu kim kuracak? — Hangi kurallar? — Ne zaman yazılabilir? — Telefonu olmayan biri varsa ne yapılacak?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen die Kursgruppe. Jemand muss sie einrichten. Wer macht das?",
              tr: "Kurs grubunu birlikte planlıyoruz. Birinin kurması gerek. Kim yapacak?",
            },
            { who: "you", hint: "İşi üstlen ya da gerekçeli bir alternatif öner.", expect: "bir görevi üstlenmek ya da gerekçeli bir alternatif sunmak", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und welche Regeln brauchen wir? Bei mir im letzten Kurs war es sehr unruhig.",
              tr: "Peki. Hangi kurallar gerekli? Geçen kursumda çok gürültülüydü.",
            },
            { who: "you", hint: "Somut bir kural öner ve nedenini söyle.", expect: "somut bir kural önermek ve gerekçelendirmek", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Und wann darf man schreiben? Ich arbeite im Schichtdienst.",
              tr: "Anlaştık. Peki ne zaman yazılabilir? Ben vardiyalı çalışıyorum.",
            },
            { who: "you", hint: "Bir zaman düzeni öner ve itirazı hesaba kat.", expect: "bir zaman düzeni önermek ve karşı tarafın durumunu dikkate almak", seconds: 35 },
            {
              who: "partner",
              de: "Noch etwas: Frau Malik hat kein Handy. Wie machen wir das?",
              tr: "Bir şey daha: Frau Malik'in telefonu yok. Bunu nasıl çözeriz?",
            },
            { who: "you", hint: "Onu dışarıda bırakmayan somut bir çözüm öner.", expect: "kimseyi dışarıda bırakmayan somut bir çözüm önermek", seconds: 35 },
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
              "Ich richte die Gruppe ein, ich habe das schon einmal gemacht. Als Regel schlage ich vor: nur Sachen zum Kurs, keine langen Videos. Schreiben können wir zwischen acht und zwanzig Uhr, dann stört es dich in der Nachtschicht nicht. Für Frau Malik drucke ich die wichtigen Nachrichten aus und bringe sie am Dienstag mit.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu, yoksa genel bir onay mı?",
              "Karşı tarafın itirazı (vardiya, telefonu olmaması) gerçekten hesaba katıldı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Öneri kalıpları kullanıldı mı? (Ich schlage vor …, Wir können …)",
            ],
          },
        },
      ],
    },
  ],
};
