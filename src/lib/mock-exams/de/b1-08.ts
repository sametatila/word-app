import type { MockPaper } from "../types";

/**
 * B1 · Deneme 8 — "Ehrenamt und Miteinander".
 *
 * PLAN kâğıt 1–7 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 ana fikir · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karma · 5 üç şıklı · 7 R/F · 8 görüş)
 *   Schreiben 60 dk           80 + 80 + 40 kelime
 *   Sprechen  15 dk           birlikte planlama · kısa sunum · sorun çözme
 *
 * KONU SEÇİMİ: gönüllülük ve dernek hayatı. B1 seviyesinde ölçülmesi gereken
 * ama ilk yedi kâğıdın hiç girmediği alan: bir işi ÜSTLENMEK, üstlendiğini
 * geri çekmek, başkasının üstlenmesini rica etmek. Bunlar dilbilgisi değil
 * eylem — ve B1'in gerçek eşiği tam burada.
 *
 * SAYILAR bilerek yakın seçildi (28 yüzde / 9 yıl / 4 yıl / 2 üçte). Dinleme
 * bölümünde sayı ayırmak B1'de hâlâ ölçülmesi gereken bir beceri, ama ayrım
 * kulakta değil anlamda olsun diye her sayı farklı bir şeyi sayıyor.
 *
 * KİŞİLER görevler arasında paylaşılmıyor — okuma, eşleştirme, forum ve dört
 * dinleme görevinin her birinin kendi kadrosu var.
 */
export const B1_08: MockPaper = {
  id: "de-b1-08",
  course: "de",
  level: "B1",
  no: 8,
  theme: "Ehrenamt und Miteinander",
  themeTr: "Gönüllülük ve dayanışma",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Bericht, kurze Texte, Anzeigen, Forumsbeiträge und Einsatzregeln.",
      instructionTr:
        "Bu bölümde beş görev var. Bir haber metni, kısa metinler, ilanlar, forum yorumları ve görev kuralları okuyacaksın.",
      tasks: [
        {
          id: "de-b1-08-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Bericht und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Haber metnini ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsbericht",
              genreTr: "Gazete haberi",
              title: "Die Bücherei, die es nicht mehr geben sollte",
              body: `Als die Gemeinde Ostheim ihre Bücherei schließen wollte, ging es um 14.000 Euro im Jahr.

Heute hat die Bücherei mehr Leser als damals. Betrieben wird sie von einunddreißig Freiwilligen.

"Wir waren am Anfang sieben und dachten, das reicht", sagt Marlies Kurz, die den Dienstplan schreibt.

Geöffnet ist an fünf Tagen, insgesamt achtzehn Stunden. Vor der Übernahme waren es zwölf.

Die Gemeinde zahlt weiterhin Strom und Heizung. Für neue Bücher sammelt der Verein selbst.

Einfach ist es nicht. Zweimal im Jahr fällt eine Schicht aus, weil sich niemand einträgt.

"Ehrenamt heißt nicht, dass immer jemand da ist", sagt Frau Kurz. "Es heißt, dass sich jemand kümmert, wenn niemand da ist."

Die größte Sorge ist das Alter. Zwei Drittel der Freiwilligen sind über sechzig, und Nachwuchs kommt kaum.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-08-l1-1",
              no: 1,
              ref: "r1",
              text: "Der Gemeinde ging es beim Schließen um mehr als 20.000 Euro im Jahr.",
              answer: false,
              explain:
                "İlk cümle tutarı veriyor: \"ging es um 14.000 Euro im Jahr\". On dört bin, yirmi binin altında.",
            },
            {
              kind: "bool",
              id: "de-b1-08-l1-2",
              no: 2,
              ref: "r1",
              text: "Die Bücherei hat heute mehr Leser als vor der Übernahme.",
              answer: true,
              explain:
                "\"Heute hat die Bücherei mehr Leser als damals\" — kıyas doğrudan kapanma tehdidi dönemiyle yapılıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-08-l1-3",
              no: 3,
              ref: "r1",
              text: "Die Öffnungszeiten sind seit der Übernahme länger geworden.",
              answer: true,
              explain:
                "İki sayı karşılaştırılıyor: bugün haftada on sekiz saat, \"Vor der Übernahme waren es zwölf\".",
            },
            {
              kind: "bool",
              id: "de-b1-08-l1-4",
              no: 4,
              ref: "r1",
              text: "Die Gemeinde bezahlt auch die neuen Bücher.",
              answer: false,
              explain:
                "Metin ikisini ayırıyor: belediye elektrik ve ısınmayı ödüyor, ama \"Für neue Bücher sammelt der Verein selbst\".",
            },
            {
              kind: "bool",
              id: "de-b1-08-l1-5",
              no: 5,
              ref: "r1",
              text: "Es kommt vor, dass eine Schicht ausfällt.",
              answer: true,
              explain:
                "\"Zweimal im Jahr fällt eine Schicht aus, weil sich niemand einträgt\" — yılda iki kez, yani bazen.",
            },
            {
              kind: "bool",
              id: "de-b1-08-l1-6",
              no: 6,
              ref: "r1",
              text: "Die meisten Freiwilligen sind jünger als sechzig.",
              answer: false,
              explain:
                "Son cümle tersini söylüyor: \"Zwei Drittel der Freiwilligen sind über sechzig\". Üçte iki çoğunluk demek.",
            },
          ],
        },
        {
          id: "de-b1-08-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die sechs Texte. Was ist die Kernaussage? Wählen Sie a, b oder c.",
          promptTr: "Altı metni oku. Ana ileti ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang im Vereinsheim",
              genreTr: "Dernek binasındaki duyuru",
              body: `Liebe Mitglieder,

der Schlüssel für den Geräteraum hängt ab sofort nicht mehr am Brett.

Wer ihn braucht, meldet sich bei Herrn Weidner.

Grund sind zwei Geräte, die seit März fehlen.`,
            },
            {
              kind: "text",
              id: "t2",
              genre: "E-Mail einer Freiwilligenagentur",
              genreTr: "Gönüllü merkezinden e-posta",
              body: `Sehr geehrte Frau Lorbeer,

vielen Dank für Ihr Interesse. Für den Besuchsdienst im Pflegeheim brauchen wir ein erweitertes Führungszeugnis.

Das beantragen Sie beim Bürgeramt; die Kosten übernehmen wir.

Ohne dieses Papier dürfen wir Sie leider nicht einsetzen.`,
            },
            {
              kind: "text",
              id: "t3",
              genre: "Anzeige",
              genreTr: "İlan",
              body: `Wir suchen Menschen, die einmal im Monat drei Stunden Zeit haben.

Vorkenntnisse braucht niemand — eingearbeitet wird bei uns immer.

Wer allerdings nur einmalig helfen möchte, ist bei unserem Sommerfest besser aufgehoben.`,
            },
            {
              kind: "text",
              id: "t4",
              genre: "Nachricht in der Vereinsgruppe",
              genreTr: "Dernek grubundaki mesaj",
              body: `Kurze Bitte: Am Samstag fehlen uns noch zwei Leute für den Auf- und Abbau.

Der Abbau ist der schwierigere Teil, dafür meldet sich fast nie jemand.

Wer nur eine Stunde kann, soll sich trotzdem melden.`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "Aushang zur Abrechnung",
              genreTr: "Masraf duyurusu",
              body: `Ab Januar gilt: Fahrtkosten werden nur noch mit Beleg erstattet.

Wer mit dem eigenen Auto fährt, bekommt dreißig Cent pro Kilometer.

Anträge, die später als vier Wochen nach dem Einsatz kommen, können wir nicht mehr bearbeiten.`,
            },
            {
              kind: "text",
              id: "t6",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Die Zahl der Vereinsmitglieder im Landkreis ist stabil geblieben.

Zugleich ist die Zahl derer, die ein Amt im Vorstand übernehmen, um ein Drittel gesunken.

Vereine finden also Mitglieder, aber keine Verantwortlichen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-08-l2-7",
              no: 7,
              ref: "t1",
              text: "Warum wurde die Regel geändert?",
              options: [
                "Weil der Raum umgebaut wird.",
                "Weil zu wenige Mitglieder kommen.",
                "Weil Geräte verschwunden sind.",
              ],
              answer: 2,
              explain:
                "Gerekçe son cümlede: \"Grund sind zwei Geräte, die seit März fehlen\". Tadilat ya da katılım hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l2-8",
              no: 8,
              ref: "t2",
              text: "Was ist die Bedingung für den Einsatz?",
              options: [
                "Eine Ausbildung für das Pflegeheim.",
                "Die Kosten trägt die Bewerberin.",
                "Ein Papier vom Amt.",
              ],
              answer: 2,
              explain:
                "Koşul belge: \"brauchen wir ein erweitertes Führungszeugnis\", başvuru yeri de veriliyor. Ücreti kurum karşılıyor, yani katkı payı yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l2-9",
              no: 9,
              ref: "t3",
              text: "Wen sucht die Anzeige?",
              options: [
                "Leute für regelmäßige Einsätze.",
                "Leute mit einschlägiger Erfahrung.",
                "Leute nur für das Sommerfest.",
              ],
              answer: 0,
              explain:
                "İlan düzenliliği istiyor — \"einmal im Monat drei Stunden\" — ve tek seferliklere başka bir yer gösteriyor. Ön bilgi ise açıkça gerekmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l2-10",
              no: 10,
              ref: "t4",
              text: "Wobei fehlt am meisten Hilfe?",
              options: ["Beim Aufbau am Samstag.", "Beim Abbau.", "Beim Melden für eine Stunde."],
              answer: 1,
              explain:
                "İki iş de sayılıyor ama biri ayrılıyor: \"Der Abbau ist der schwierigere Teil, dafür meldet sich fast nie jemand\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l2-11",
              no: 11,
              ref: "t5",
              text: "Was ist ab Januar neu?",
              options: [
                "Erstattungen entfallen ganz.",
                "Der Betrag pro Kilometer steigt.",
                "Ein Beleg ist nötig.",
              ],
              answer: 2,
              explain:
                "Değişiklik `nur noch` ile işaretleniyor: \"Fahrtkosten werden nur noch mit Beleg erstattet\". Kilometre başına tutar bir bilgi, bir yenilik değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l2-12",
              no: 12,
              ref: "t6",
              text: "Worin liegt das Problem?",
              options: [
                "Es fehlt an Vorstandsleuten.",
                "Die Vereine verlieren viele Mitglieder.",
                "Die Vereine haben zu wenig Geld.",
              ],
              answer: 0,
              explain:
                "Metin iki eğilimi karşı karşıya koyuyor: üye sayısı sabit, ama yönetim görevi alanlar üçte bir azalmış — \"Mitglieder, aber keine Verantwortlichen\".",
            },
          ],
        },
        {
          id: "de-b1-08-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen eine ehrenamtliche Aufgabe. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler gönüllü bir görev arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Lesepatin oder Lesepate",
              body: "Einmal pro Woche eine Stunde mit einem Kind lesen. Grundschule Ostheim, vormittags. Einführung an einem Nachmittag.",
            },
            {
              key: "b",
              label: "Hausaufgabenhilfe",
              body: "Dienstag und Donnerstag 15 bis 17 Uhr. Für Jugendliche ab Klasse 7, vor allem Mathematik. Fachkenntnisse erwünscht.",
            },
            {
              key: "c",
              label: "Fahrdienst für Ältere",
              body: "Wir fahren zu Arztterminen. Eigener Führerschein nötig, das Auto stellen wir. Einsatz nach Absprache, meist vormittags.",
            },
            {
              key: "d",
              label: "Reparaturtreff",
              body: "Jeden ersten Samstag im Monat. Wir suchen Leute, die mit Werkzeug umgehen können. Ersatzteile bezahlt der Verein.",
            },
            {
              key: "e",
              label: "Übersetzen bei Terminen",
              body: "Begleitung zu Ämtern und Arztbesuchen. Gesucht werden vor allem Türkisch, Arabisch und Ukrainisch.",
            },
            {
              key: "f",
              label: "Kasse und Buchhaltung",
              body: "Der Verein sucht eine Person für die Kasse. Etwa vier Stunden im Monat, gern mit kaufmännischer Erfahrung.",
            },
            {
              key: "g",
              label: "Sommerfest — einmalige Hilfe",
              body: "Wir brauchen am 12. Juli Hände für Aufbau, Kuchen und Abbau. Keine feste Verpflichtung, nur dieser eine Tag.",
            },
            {
              key: "h",
              label: "Besuchsdienst im Pflegeheim",
              body: "Eine Stunde pro Woche Zeit für ein Gespräch. Erweitertes Führungszeugnis erforderlich, die Kosten übernehmen wir.",
            },
            {
              key: "i",
              label: "Garten der Kita",
              body: "Beete pflegen und Hochbeete bauen, samstagvormittags zusammen mit den Kindern. Werkzeug ist vorhanden.",
            },
            {
              key: "j",
              label: "Website betreuen",
              body: "Termine eintragen und Fotos hochladen. Etwa zwei Stunden im Monat, von zu Hause aus und zu freier Zeit.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-08-l3-13",
              no: 13,
              text: "Herr Anand ist Rentner, fährt gern Auto und hat vormittags Zeit.",
              answer: "c",
              explain:
                "(c) üç koşulu birden karşılıyor: ehliyet, araç kurumdan ve \"meist vormittags\". (h) de yaşlılarla ilgili ama araba kullanmayı içermiyor.",
            },
            {
              kind: "match",
              id: "de-b1-08-l3-14",
              no: 14,
              text: "Frau Simic spricht Türkisch und möchte Menschen bei Behördengängen helfen.",
              answer: "e",
              explain:
                "(e) hem dili hem işi adıyla sayıyor: \"Begleitung zu Ämtern\" ve aranan diller arasında Türkçe ilk sırada.",
            },
            {
              kind: "match",
              id: "de-b1-08-l3-15",
              no: 15,
              text: "Herr Kalb war Buchhalter und sucht eine Aufgabe mit wenigen Stunden.",
              answer: "f",
              explain:
                "(f) mesleği ve yükü birlikte veriyor: \"Etwa vier Stunden im Monat, gern mit kaufmännischer Erfahrung\".",
            },
            {
              kind: "match",
              id: "de-b1-08-l3-16",
              no: 16,
              text: "Frau Terzi arbeitet Vollzeit und kann nur abends von zu Hause aus etwas tun.",
              answer: "j",
              explain:
                "(j) tek uzaktan görev: \"von zu Hause aus und zu freier Zeit\". Öteki ilanların hepsi belirli bir saatte bir yerde olmayı istiyor.",
            },
            {
              kind: "match",
              id: "de-b1-08-l3-17",
              no: 17,
              text: "Herr Rummel repariert gern Dinge und hat einmal im Monat einen Samstag frei.",
              answer: "d",
              explain:
                "(d) sıklığı ve beceriyi eşliyor: \"Jeden ersten Samstag im Monat\" ve alet kullanabilen kişiler. (i) de cumartesi ama bahçe işi.",
            },
            {
              kind: "match",
              id: "de-b1-08-l3-18",
              no: 18,
              text: "Frau Hoheisel möchte einem Kind beim Lesen helfen und hat vormittags frei.",
              answer: "a",
              explain:
                "(a) okuma ve saati birlikte veriyor: \"eine Stunde mit einem Kind lesen … vormittags\". (b) de çocuklara yardım ama öğleden sonra ve matematik.",
            },
            {
              kind: "match",
              id: "de-b1-08-l3-19",
              no: 19,
              text: "Herr Bode hat nur einen einzigen Tag Zeit und möchte trotzdem helfen.",
              answer: "g",
              explain:
                "(g) tek gün için kurulmuş: \"Keine feste Verpflichtung, nur dieser eine Tag\". Öteki ilanların hepsi süreklilik istiyor.",
            },
          ],
        },
        {
          id: "de-b1-08-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Soll ehrenamtliche Arbeit bezahlt werden?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Gönüllü çalışma ücretlendirilmeli mi?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Ehrenamt bezahlen — ja oder nein?",
              body: `Katrin Wollny: Ich koordiniere seit acht Jahren einen Fahrdienst und bekomme keinen Cent dafür. Trotzdem bin ich dagegen. Sobald Geld fließt, kommt die Frage, wer wie viel bekommt — und dann ist der Verein kein Verein mehr, sondern ein kleiner Betrieb mit schlechten Löhnen.

Ismail Cakir: Wer sagt, Ehrenamt müsse unbezahlt sein, hat meistens genug Geld. Bei uns fahren Leute vierzig Kilometer zum Einsatz und legen das Benzin selbst drauf. Eine Aufwandsentschädigung ist keine Bezahlung, sondern das Mindeste.

Herr Dietz: Ich bin Vorstand in einem Sportverein und wäre dafür, wenn die Regeln es zuließen. Sobald wir etwas zahlen, ändert sich unser Status, und wir verlieren Zuschüsse. Das Problem liegt also nicht am Willen, sondern an den Vorschriften.

Frau Nkemelu: Ich habe beides erlebt. In der bezahlten Nachbarschaftshilfe kam niemand mehr eine Viertelstunde früher, weil sich das nicht abrechnen ließ. In der unbezahlten kommen die Leute, wenn es nötig ist. Diesen Unterschied möchte ich nicht verlieren.

Jörg Frings: Man tut so, als ginge es um Löhne. Es geht um Fahrtkosten, um Telefongebühren, um das Essen bei einem Zwölf-Stunden-Einsatz. Wer das nicht ersetzt bekommt, hört irgendwann auf. Ich bin dafür, und zwar aus Erfahrung.

Beate Kirchner: Bei uns wurde eine Pauschale für Übungsleiter eingeführt. Seitdem melden sich mehr Leute — aber es sind andere. Die Alten sind gegangen, weil ihnen der Ton nicht mehr passte. Unterm Strich haben wir nichts gewonnen.

Timo Reichert: Bezahlung nein, Ersatz der Auslagen ja. Und vor allem: Versicherung. Ich habe mir bei einem Einsatz die Hand gebrochen und musste drei Wochen selbst klären, wer das zahlt. Darüber sollten wir reden, nicht über Stundenlöhne.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-08-l4-20",
              no: 20,
              ref: "f1",
              text: "Katrin Wollny",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Karşılıksız çalışan biri olduğu hâlde karşı: \"Trotzdem bin ich dagegen\". Korkusu derneğin \"ein kleiner Betrieb mit schlechten Löhnen\" hâline gelmesi.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l4-21",
              no: 21,
              ref: "f1",
              text: "Ismail Cakir",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Masrafın gönüllüde kalmasını haksız buluyor: \"Eine Aufwandsentschädigung ist keine Bezahlung, sondern das Mindeste\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l4-22",
              no: 22,
              ref: "f1",
              text: "Herr Dietz",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Koşullu ama açık: \"wäre dafür, wenn die Regeln es zuließen\". Engeli isteğe değil mevzuata bağlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l4-23",
              no: 23,
              ref: "f1",
              text: "Frau Nkemelu",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "İki deneyimi karşılaştırıp ücretsizi seçiyor: \"Diesen Unterschied möchte ich nicht verlieren\" — ücretli düzende kimse çeyrek saat erken gelmiyormuş.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l4-24",
              no: 24,
              ref: "f1",
              text: "Jörg Frings",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Tartışmayı maaştan masrafa çekip taraf oluyor: \"Ich bin dafür, und zwar aus Erfahrung\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l4-25",
              no: 25,
              ref: "f1",
              text: "Beate Kirchner",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendi derneğindeki denemenin bilançosunu çıkarıyor: yeni gelenler var ama eskiler gitmiş — \"Unterm Strich haben wir nichts gewonnen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l4-26",
              no: 26,
              ref: "f1",
              text: "Timo Reichert",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "İlk üç sözcüğü konumunu veriyor: \"Bezahlung nein\". Masraf ve sigorta istiyor, bunlar ücret değil.",
            },
          ],
        },
        {
          id: "de-b1-08-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Einsatzregeln und die Aufgaben 27 bis 30. Wählen Sie a, b oder c.",
          promptTr: "Görev kurallarını ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Einsatzregeln",
              genreTr: "Görev kuralları",
              title: "Einsatzregeln — Freiwilligenagentur Ostheim",
              body: `1. Anmeldung und Nachweise
Vor dem ersten Einsatz ist ein Gespräch in der Agentur nötig. Für Einsätze mit Kindern oder pflegebedürftigen Menschen verlangen wir ein erweitertes Führungszeugnis. Die Gebühr erstatten wir nach Vorlage der Quittung.

2. Versicherung
Alle Freiwilligen sind während des Einsatzes unfall- und haftpflichtversichert. Der Schutz beginnt mit der Eintragung in den Dienstplan und endet mit dem Ende der Schicht. Wege von und zur Einsatzstelle sind eingeschlossen.

3. Absagen
Wer eine Schicht nicht übernehmen kann, sagt spätestens achtundvierzig Stunden vorher ab. Bei Krankheit gilt diese Frist nicht. Wer dreimal ohne Absage fehlt, wird aus dem Plan genommen.

4. Auslagen
Fahrtkosten erstatten wir mit dreißig Cent je Kilometer, andere Auslagen nur nach vorheriger Absprache. Anträge sind innerhalb von vier Wochen einzureichen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-08-l5-27",
              no: 27,
              ref: "o1",
              text: "Wann beginnt der Versicherungsschutz?",
              options: [
                "Mit dem Gespräch in der Agentur.",
                "Mit der Eintragung in den Plan.",
                "Erst an der Einsatzstelle.",
              ],
              answer: 1,
              explain:
                "İkinci madde başlangıcı tek bir ana bağlıyor: \"beginnt mit der Eintragung in den Dienstplan\". Görüşme birinci maddeye ait bir koşul.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l5-28",
              no: 28,
              ref: "o1",
              text: "In welchem Fall ist ein Führungszeugnis nötig?",
              options: [
                "Bei jedem Einsatz ohne Ausnahme.",
                "Bei der Arbeit mit Kindern.",
                "Nur bei Fahrdiensten.",
              ],
              answer: 1,
              explain:
                "Kural iki grubu sayıyor: \"Für Einsätze mit Kindern oder pflegebedürftigen Menschen verlangen wir ein erweitertes Führungszeugnis\". Yani her görevde değil, ama çocuklarla çalışmada gerekiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l5-29",
              no: 29,
              ref: "o1",
              text: "Was gilt bei Krankheit?",
              options: [
                "Die Absagefrist entfällt.",
                "Man muss ein Attest einreichen.",
                "Man wird sofort aus dem Plan genommen.",
              ],
              answer: 0,
              explain:
                "Kırk sekiz saatlik kural için bir istisna yazılı: \"Bei Krankheit gilt diese Frist nicht\". Rapor istenmiyor, plandan çıkarma ise üç kez habersiz gelmemeye bağlı.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-l5-30",
              no: 30,
              ref: "o1",
              text: "Bis wann müssen Anträge auf Auslagen eingehen?",
              options: [
                "Innerhalb von achtundvierzig Stunden.",
                "Am Ende des Kalenderjahres.",
                "Spätestens einen Monat danach.",
              ],
              answer: 2,
              explain:
                "Dördüncü madde süreyi veriyor: \"Anträge sind innerhalb von vier Wochen einzureichen\" — dört hafta kabaca bir ay eder. Kırk sekiz saat üçüncü maddeye, iptal kuralına ait.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Gespräch, einen Vortrag und eine Diskussion.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir konuşma, bir sunum ve bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-b1-08-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Gönüllü merkezi randevuyu değiştiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Malzahn, hier ist die Freiwilligenagentur. Ihr Termin am Montag passt uns leider nicht mehr, die Kollegin ist krank. Dienstag oder Mittwoch, jeweils vierzehn Uhr, würde bei uns gehen. Rufen Sie bitte kurz zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Gönüllülük üzerine bir araştırma aktarılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Erhebung des Landkreises zeigt: Wer als Kind in einem Verein war, engagiert sich später dreimal so häufig. Auf die Frage, warum sie aufhören, nennen Freiwillige aber selten Zeitmangel. Am häufigsten genannt wird das Gefühl, dass die eigene Arbeit niemandem auffällt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Sprachnachricht in der Vereinsgruppe",
              genreTr: "Dernek grubunda sesli mesaj",
              situation: "Tamir buluşmasıyla ilgili bilgi.",
              plays: 1,
              segments: [
                {
                  text: "Hallo zusammen, der Reparaturtreff am Samstag findet statt, aber wir sind nur zu zweit. Wenn ihr Werkzeug habt, bringt es bitte mit — unsere Bohrmaschine ist kaputt. Und sagt den Leuten, dass es diesmal erst um elf losgeht.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei der Mitgliederversammlung",
              genreTr: "Genel kurulda duyuru",
              situation: "Seçim öncesi bir uyarı.",
              plays: 1,
              segments: [
                {
                  text: "Kurz vor der Wahl noch ein Hinweis: Wir suchen weiterhin jemanden für die Kasse. Wenn sich heute niemand findet, muss der Vorstand die Aufgabe übernehmen — und das geht laut Satzung höchstens ein Jahr lang. Danach ist der Verein handlungsunfähig.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Okul, tanışma toplantısını bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Sedlacek, hier ist die Grundschule. Vielen Dank für Ihre Anmeldung als Lesepate. Die Einführung ist am Donnerstag um sechzehn Uhr, sie dauert etwa zwei Stunden. Bringen Sie bitte Ihren Ausweis mit, wir brauchen die Nummer für die Versicherung.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-08-h1-1",
              no: 1,
              ref: "h1",
              text: "Der Termin am Montag findet wie geplant statt.",
              answer: false,
              explain:
                "Mesaj iptali gerekçesiyle veriyor: \"Ihr Termin am Montag passt uns leider nicht mehr, die Kollegin ist krank\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h1-2",
              no: 2,
              ref: "h1",
              text: "Was soll Frau Malzahn tun?",
              options: ["Am Dienstag einfach kommen.", "Zurückrufen.", "Eine Mail schreiben."],
              answer: 1,
              explain:
                "İki tarih öneriliyor ama karar telefonda: \"Rufen Sie bitte kurz zurück\". Yani doğrudan gelmek istenmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h1-3",
              no: 3,
              ref: "h2",
              text: "Zeitmangel ist der häufigste Grund zum Aufhören.",
              answer: false,
              explain:
                "Haber tam bu beklentiyi düzeltiyor: \"nennen Freiwillige aber selten Zeitmangel\". En sık söylenen şey fark edilmeme duygusu.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h1-4",
              no: 4,
              ref: "h2",
              text: "Was nennen Freiwillige am häufigsten als Grund?",
              options: ["Fehlende Anerkennung.", "Der ständige Zeitmangel.", "Der Streit im Vorstand."],
              answer: 0,
              explain:
                "\"das Gefühl, dass die eigene Arbeit niemandem auffällt\" — bu tanınmama demek. Kavga hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h1-5",
              no: 5,
              ref: "h3",
              text: "Der Reparaturtreff fällt am Samstag aus.",
              answer: false,
              explain:
                "İlk cümle tersini söylüyor: \"der Reparaturtreff am Samstag findet statt\". Sorun katılımcı sayısı ve alet eksikliği.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h1-6",
              no: 6,
              ref: "h3",
              text: "Was hat sich geändert?",
              options: ["Der Ort des Treffens.", "Die Anfangszeit.", "Der Wochentag."],
              answer: 1,
              explain:
                "Değişen tek şey saat: \"dass es diesmal erst um elf losgeht\". Gün ve yer aynı kalıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h1-7",
              no: 7,
              ref: "h4",
              text: "Ohne Kassenwart muss der Vorstand die Aufgabe übernehmen.",
              answer: true,
              explain:
                "Duyuru koşulu ve sonucu birlikte veriyor: \"Wenn sich heute niemand findet, muss der Vorstand die Aufgabe übernehmen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h1-8",
              no: 8,
              ref: "h4",
              text: "Was passiert nach einem Jahr ohne eigenen Kassenwart?",
              options: [
                "Der Verein löst sich automatisch auf.",
                "Die Satzung ändert sich von selbst.",
                "Der Verein wird handlungsunfähig.",
              ],
              answer: 2,
              explain:
                "Süre tüzükten geliyor: en fazla bir yıl, \"Danach ist der Verein handlungsunfähig\". Kendiliğinden fesih ya da tüzük değişikliği geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h1-9",
              no: 9,
              ref: "h5",
              text: "Die Einführung dauert etwa zwei Stunden.",
              answer: true,
              explain:
                "Mesaj süreyi açıkça veriyor: \"sie dauert etwa zwei Stunden\", saati de söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h1-10",
              no: 10,
              ref: "h5",
              text: "Warum soll er den Ausweis mitbringen?",
              options: ["Für die Versicherung.", "Für den Zutritt zur Schule.", "Für die Bibliothekskarte."],
              answer: 0,
              explain:
                "Gerekçe son cümlede: \"wir brauchen die Nummer für die Versicherung\".",
            },
          ],
        },
        {
          id: "de-b1-08-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Erstgespräch in einer Freiwilligenagentur. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Gönüllü merkezindeki ilk görüşmeyi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Beratungsgespräch",
              genreTr: "Danışma görüşmesi",
              situation: "Bir aday ziyaret hizmeti için başvuruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Weidner", text: "Frau Lorbeer, Sie haben Besuchsdienst angekreuzt. Wie viel Zeit hätten Sie denn?" },
                { speaker: "Frau Lorbeer", text: "Eine Stunde pro Woche. Mehr geht neben der Arbeit nicht." },
                {
                  speaker: "Herr Weidner",
                  text: "Das reicht völlig. Wichtiger als die Menge ist, dass es regelmäßig ist. Die Bewohner merken sofort, wenn jemand unregelmäßig kommt.",
                },
                { speaker: "Frau Lorbeer", text: "Und wenn ich im Urlaub bin?" },
                { speaker: "Herr Weidner", text: "Kein Problem, das planen wir vorher zusammen. Schwierig wird es nur bei kurzfristigen Absagen." },
                { speaker: "Frau Lorbeer", text: "Brauche ich das Führungszeugnis schon vorher?" },
                {
                  speaker: "Herr Weidner",
                  text: "Ja, vor dem ersten Besuch. Beantragen Sie es diese Woche, es dauert etwa zehn Tage. Die Gebühr bekommen Sie von uns zurück.",
                },
                { speaker: "Frau Lorbeer", text: "Und wenn es mir nach zwei Monaten doch nicht liegt?" },
                { speaker: "Herr Weidner", text: "Dann sagen Sie es uns. Das ist kein Problem — ein stiller Rückzug wäre eines." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-08-h2-11",
              no: 11,
              ref: "g1",
              text: "Wie viel Zeit bringt Frau Lorbeer mit?",
              options: ["Eine Stunde pro Woche.", "Drei Stunden pro Woche.", "Einen ganzen Tag im Monat."],
              answer: 0,
              explain:
                "Kendi söylüyor ve sınırını da veriyor: \"Eine Stunde pro Woche. Mehr geht neben der Arbeit nicht.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h2-12",
              no: 12,
              ref: "g1",
              text: "Was ist Herrn Weidner am wichtigsten?",
              options: ["Die Menge der Stunden.", "Die Erfahrung im Pflegebereich.", "Die Regelmäßigkeit."],
              answer: 2,
              explain:
                "İkisini açıkça karşılaştırıyor: \"Wichtiger als die Menge ist, dass es regelmäßig ist\". Ön deneyim hiç istenmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h2-13",
              no: 13,
              ref: "g1",
              text: "Was ist bei Urlaub zu tun?",
              options: ["Es vorher ansagen.", "Ersatz selbst organisieren.", "Den Dienst ganz aufgeben."],
              answer: 0,
              explain:
                "Tatil sorun değil çünkü önceden planlanıyor: \"das planen wir vorher zusammen\". Sorun olan kısa süreli iptaller.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h2-14",
              no: 14,
              ref: "g1",
              text: "Wann muss das Führungszeugnis vorliegen?",
              options: ["Nach dem ersten Besuch.", "Vor dem ersten Besuch.", "Erst nach zwei Monaten."],
              answer: 1,
              explain:
                "Cevap tek sözcükle veriliyor ve zamanlanıyor: \"Ja, vor dem ersten Besuch\" — başvuru on gün sürdüğü için bu hafta yapılmalı.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h2-15",
              no: 15,
              ref: "g1",
              text: "Was erwartet Herr Weidner, falls es nicht passt?",
              options: [
                "Auf jeden Fall ein ganzes Jahr zu bleiben.",
                "Bei Zweifeln Bescheid zu sagen.",
                "Es einfach still auszuprobieren.",
              ],
              answer: 1,
              explain:
                "Bırakmak sorun değil, sessizce bırakmak sorun: \"Dann sagen Sie es uns … ein stiller Rückzug wäre eines\".",
            },
          ],
        },
        {
          id: "de-b1-08-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Sind die Aussagen richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir sunum dinleyeceksin. İfadeler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              situation: "Gönüllülük üzerine çalışan bir araştırmacı konuşuyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Grasmück",
                  text: "Ich forsche seit zwölf Jahren zum Ehrenamt. Drei Befunde überraschen die Leute regelmäßig.",
                },
                {
                  speaker: "Frau Grasmück",
                  text: "Erstens: Die Zahl der Engagierten sinkt nicht. Sie liegt seit zwanzig Jahren bei etwa achtundzwanzig Prozent. Was sinkt, ist die Dauer. Früher blieb man im Schnitt neun Jahre, heute sind es knapp vier.",
                },
                {
                  speaker: "Frau Grasmück",
                  text: "Zweitens: Menschen mit wenig Zeit engagieren sich häufiger als Menschen mit viel Zeit. Wer ohnehin viel vorhat, sagt öfter Ja.",
                },
                {
                  speaker: "Frau Grasmück",
                  text: "Drittens: Der wichtigste Grund für den Einstieg ist nicht ein Thema, sondern eine Person. In zwei von drei Fällen hat jemand direkt gefragt.",
                },
                {
                  speaker: "Frau Grasmück",
                  text: "Was Vereine daraus lernen können: Aufrufe an alle wirken kaum. Eine direkte Frage wirkt.",
                },
                {
                  speaker: "Frau Grasmück",
                  text: "Und ein Hinweis zum Aufhören: Die meisten hören nicht aus Ärger auf, sondern weil ein Lebensabschnitt endet — ein Umzug, ein Studienbeginn, ein Kind.",
                },
                {
                  speaker: "Frau Grasmück",
                  text: "Zum Schluss: Ein Dankeschön am Jahresende ersetzt keine Rückmeldung im Alltag. Das ist der häufigste Fehler, den ich sehe.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-08-h3-16",
              no: 16,
              ref: "v1",
              text: "Die Zahl der Engagierten ist in zwanzig Jahren stark gesunken.",
              answer: false,
              explain:
                "Sunum bunu ilk bulgu olarak reddediyor: \"Die Zahl der Engagierten sinkt nicht\" — oran yirmi yıldır yaklaşık %28.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h3-17",
              no: 17,
              ref: "v1",
              text: "Menschen bleiben heute kürzer im Ehrenamt als früher.",
              answer: true,
              explain:
                "Düşen şey süre: \"Früher blieb man im Schnitt neun Jahre, heute sind es knapp vier\".",
            },
            {
              kind: "bool",
              id: "de-b1-08-h3-18",
              no: 18,
              ref: "v1",
              text: "Wer viel Zeit hat, engagiert sich am häufigsten.",
              answer: false,
              explain:
                "İkinci bulgu tersini söylüyor: \"Menschen mit wenig Zeit engagieren sich häufiger als Menschen mit viel Zeit\".",
            },
            {
              kind: "bool",
              id: "de-b1-08-h3-19",
              no: 19,
              ref: "v1",
              text: "In den meisten Fällen führt eine direkte Frage zum Einstieg.",
              answer: true,
              explain:
                "\"In zwei von drei Fällen hat jemand direkt gefragt\" — üçte iki çoğunluk demek, ve belirleyici olan konu değil kişi.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h3-20",
              no: 20,
              ref: "v1",
              text: "Frau Grasmück hält allgemeine Aufrufe für wirksam.",
              answer: false,
              explain:
                "İkisini karşı karşıya koyuyor: \"Aufrufe an alle wirken kaum. Eine direkte Frage wirkt.\"",
            },
            {
              kind: "bool",
              id: "de-b1-08-h3-21",
              no: 21,
              ref: "v1",
              text: "Die meisten hören wegen Ärger im Verein auf.",
              answer: false,
              explain:
                "Sebep başka: \"nicht aus Ärger … sondern weil ein Lebensabschnitt endet\" — taşınma, öğrenim, çocuk.",
            },
            {
              kind: "bool",
              id: "de-b1-08-h3-22",
              no: 22,
              ref: "v1",
              text: "Rückmeldung im Alltag ist ihr wichtiger als ein Dank am Jahresende.",
              answer: true,
              explain:
                "Kapanış cümlesi bunu söylüyor: \"Ein Dankeschön am Jahresende ersetzt keine Rückmeldung im Alltag\" — ve bunu en sık gördüğü hata sayıyor.",
            },
          ],
        },
        {
          id: "de-b1-08-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Derneklerde ücretli kadro tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Ohlendorf, Sie leiten einen Verein mit sechshundert Mitgliedern. Brauchen Sie bezahltes Personal?" },
                {
                  speaker: "Frau Ohlendorf",
                  text: "Wir haben seit zwei Jahren eine halbe Stelle, und ohne die wäre ich nicht mehr im Amt. Nicht wegen der Arbeitsmenge — wegen der Erreichbarkeit. Jemand muss vormittags ans Telefon gehen.",
                },
                { speaker: "Moderator", text: "Herr Prantl, die Stelle wird aus Steuergeld bezuschusst. Ist das richtig so?" },
                {
                  speaker: "Herr Prantl",
                  text: "In diesem Fall ja. Ich sehe aber ein Muster: Sobald es eine Stelle gibt, ziehen sich die Freiwilligen zurück. Nicht sofort, aber nach drei, vier Jahren.",
                },
                {
                  speaker: "Frau Ohlendorf",
                  text: "Das kenne ich anders. Bei uns ist die Zahl der Aktiven gestiegen, weil die Stelle den Papierkram übernimmt — Anträge, Abrechnungen, Listen.",
                },
                {
                  speaker: "Herr Prantl",
                  text: "Das mag bei Ihnen stimmen. Ich rede über den Durchschnitt, und da ist die Zahl seit Einführung der Förderung leicht gesunken.",
                },
                { speaker: "Moderator", text: "Wo sind Sie sich einig?" },
                {
                  speaker: "Herr Prantl",
                  text: "Dass eine Stelle nichts nützt, wenn sie nur ein Jahr lang finanziert ist. Dann sucht die Person ab Monat neun eine neue Arbeit.",
                },
                { speaker: "Frau Ohlendorf", text: "Genau. Kurze Förderungen sind schlimmer als gar keine." },
                { speaker: "Moderator", text: "Ein letzter Punkt: Gibt es Konkurrenz um Freiwillige?" },
                { speaker: "Frau Ohlendorf", text: "Die gibt es, aber nicht zwischen den Vereinen. Der Gegner heißt Überstunden." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-08-h4-23",
              no: 23,
              ref: "d1",
              text: "Warum ist die Stelle für Frau Ohlendorf wichtig?",
              options: [
                "Wegen der Erreichbarkeit.",
                "Wegen der hohen Mitgliederzahl.",
                "Wegen der schwierigen Finanzen.",
              ],
              answer: 0,
              explain:
                "Kendisi iki gerekçeyi ayırıyor: \"Nicht wegen der Arbeitsmenge — wegen der Erreichbarkeit\". Altı yüz üye bir bağlam, bir gerekçe değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-24",
              no: 24,
              ref: "d1",
              text: "Welches Muster sieht Herr Prantl?",
              options: [
                "Freiwillige ziehen sich zurück.",
                "Die Vereine werden deutlich größer.",
                "Die Kosten steigen immer weiter.",
              ],
              answer: 0,
              explain:
                "\"Sobald es eine Stelle gibt, ziehen sich die Freiwilligen zurück\" — gözlemi bir kural olarak değil eğilim olarak sunuyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie schnell zeigt sich das nach Herrn Prantl?",
              options: [
                "Praktisch sofort im ersten Jahr.",
                "Nach drei bis vier Jahren.",
                "Erst nach zehn Jahren.",
              ],
              answer: 1,
              explain:
                "Zamanlamayı kendisi düzeltiyor: \"Nicht sofort, aber nach drei, vier Jahren\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-26",
              no: 26,
              ref: "d1",
              text: "Womit widerspricht Frau Ohlendorf?",
              options: ["Mit einer Studie.", "Mit ihrer eigenen Erfahrung.", "Mit Zahlen des Landkreises."],
              answer: 1,
              explain:
                "\"Das kenne ich anders. Bei uns ist die Zahl der Aktiven gestiegen\" — dayanağı kendi derneği, bir araştırma değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-27",
              no: 27,
              ref: "d1",
              text: "Was übernimmt die Stelle nach Frau Ohlendorf?",
              options: ["Den Papierkram.", "Die gesamten Trainingsstunden.", "Die Öffentlichkeitsarbeit."],
              answer: 0,
              explain:
                "Üç örnekle sayıyor: \"Anträge, Abrechnungen, Listen\". Antrenman ve tanıtım hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-28",
              no: 28,
              ref: "d1",
              text: "Wie reagiert Herr Prantl darauf?",
              options: [
                "Er bestreitet ihre Erfahrung rundweg.",
                "Er wechselt sofort das Thema.",
                "Er verweist auf den Durchschnitt.",
              ],
              answer: 2,
              explain:
                "Onun örneğini kabul edip ölçeği değiştiriyor: \"Das mag bei Ihnen stimmen. Ich rede über den Durchschnitt.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-29",
              no: 29,
              ref: "d1",
              text: "Worin sind sich beide einig?",
              options: [
                "Dass Stellen grundsätzlich schaden.",
                "Dass Vereine mehr Mitglieder brauchen.",
                "Dass kurze Förderungen nichts bringen.",
              ],
              answer: 2,
              explain:
                "Prantl gerekçeyi veriyor — dokuzuncu aydan sonra yeni iş aranıyor — Ohlendorf da onaylıyor: \"Kurze Förderungen sind schlimmer als gar keine\".",
            },
            {
              kind: "mcq",
              id: "de-b1-08-h4-30",
              no: 30,
              ref: "d1",
              text: "Wen sieht Frau Ohlendorf als eigentliche Konkurrenz?",
              options: ["Die anderen Vereine im Ort.", "Die sozialen Netzwerke.", "Die Überstunden."],
              answer: 2,
              explain:
                "Beklenen cevabı eleyip kendi cevabını veriyor: \"aber nicht zwischen den Vereinen. Der Gegner heißt Überstunden.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine Antwort, einen Beitrag und eine kurze halb offizielle Mail.",
      instructionTr: "Bu bölümde üç görev var: bir yanıt, bir yazı ve kısa bir yarı resmî e-posta.",
      tasks: [
        {
          id: "de-b1-08-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Freund Jonas fragt, ob Sie zusammen beim Sommerfest des Vereins helfen. Sie möchten helfen, aber nicht den ganzen Tag. Schreiben Sie ihm (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Jonas, derneğin yaz şenliğinde birlikte yardım etmeyi soruyor. Yardım etmek istiyorsun ama bütün gün değil. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Reagieren Sie auf die Anfrage.", tr: "İsteğe karşılık ver." },
              { de: "Sagen Sie, was bei Ihnen nicht geht.", tr: "Neyin sende olmayacağını söyle." },
              { de: "Machen Sie einen konkreten Gegenvorschlag.", tr: "Somut bir karşı öneri sun." },
              { de: "Fragen Sie nach seiner Meinung.", tr: "Onun görüşünü sor." },
            ],
            sample: `Hallo Jonas,

klar bin ich dabei, ich helfe gern mit. Das Fest war letztes Jahr richtig schön.

Nur den ganzen Tag schaffe ich nicht. Ich habe morgens meinen Kurs und komme frühestens um zwei aus der Stadt zurück.

Ich könnte dafür den kompletten Abbau übernehmen, ab achtzehn Uhr. Dafür meldet sich sonst nie jemand, und ich bin sowieso gern der Letzte.

Wärst du dann eher am Vormittag da, damit wir uns nicht doppeln und trotzdem beide dabei sind?

Sag kurz Bescheid.

Viele Grüße
Ana`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Sınır somut bir gerekçeyle mi konuldu (kurs, saat), yoksa yalnız `ich kann nicht` mi?",
              "Karşı öneri gerçekten işe yarar mı — derneğin ihtiyacına denk düşüyor mu?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı ve ton uygun mu?",
              "Yaklaşık 80 kelime var mı ve soru gerçekten sorulmuş mu?",
            ],
          },
        },
        {
          id: "de-b1-08-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Schreiben Sie einen Beitrag für die Vereinszeitung: Warum bleiben heute weniger Menschen lange bei einer ehrenamtlichen Aufgabe? (circa 80 Wörter)",
          promptTr:
            "Dernek gazetesi için bir yazı yaz: Bugün neden daha az insan gönüllü bir görevde uzun süre kalıyor? (yaklaşık 80 kelime)",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie einen Grund.", tr: "Bir sebep söyle." },
              { de: "Bringen Sie ein Beispiel.", tr: "Bir örnek ver." },
              { de: "Nennen Sie eine Gegenposition.", tr: "Karşı bir görüşü de söyle." },
              { de: "Machen Sie einen Vorschlag.", tr: "Bir öneri sun." },
            ],
            sample: `Ich glaube, es liegt seltener am Willen als an der Form der Aufgaben. Wer sich meldet, bekommt oft gleich ein Amt für drei Jahre.

Bei uns hat eine Kollegin zugesagt, einmal im Monat zu helfen. Zwei Monate später war sie im Vorstand und nach einem Jahr weg.

Man kann natürlich sagen, dass ein Verein ohne feste Ämter nicht funktioniert. Das stimmt auch.

Trotzdem: Wir sollten kleine, klar begrenzte Aufgaben anbieten und das auch so ausschreiben. Wer drei Stunden zusagt, sagt später vielleicht dreißig zu.`,
            criteria: [
              "Dört içerik noktası da işlendi mi?",
              "Sebep genel bir tespit değil, savunulan bir sav mı?",
              "Örnek somut mu (kim, ne kadar sürede, ne oldu)?",
              "Karşı görüş gerçekten karşı bir görüş mü, yoksa aynı savın tekrarı mı?",
              "Yaklaşık 80 kelime var mı ve öneri savla tutarlı mı?",
            ],
          },
        },
        {
          id: "de-b1-08-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben sich für die Schicht am Samstag eingetragen, können aber nicht kommen. Schreiben Sie der Koordinatorin (circa 40 Wörter).",
          promptTr:
            "Cumartesi vardiyasına yazılmıştın ama gelemiyorsun. Koordinatöre yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Sagen Sie ab und nennen Sie den Grund.", tr: "İptal et ve sebebini söyle." },
              { de: "Entschuldigen Sie sich für die kurze Frist.", tr: "Kısa süre için özür dile." },
              { de: "Bieten Sie etwas an.", tr: "Bir şey öner." },
            ],
            sample: `Liebe Frau Kurz,

leider kann ich die Schicht am Samstag nicht übernehmen: Mein Sohn ist krank geworden und ich bekomme niemanden zur Betreuung.

Es tut mir leid, dass ich so kurzfristig absage.

Ich habe schon Herrn Anand gefragt; er hat Zeit und würde einspringen. Am Samstag darauf bin ich wieder dabei.

Viele Grüße
Ana Brahim`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "İptal açık mı, yoksa belirsiz bırakılmış mı?",
              "Sebep kısa ve somut mu?",
              "Sunulan şey gerçek bir çözüm mü (yerine biri, sonraki tarih), yoksa yalnız özür mü?",
              "Yaklaşık 40 kelime var mı ve ton yarı resmî mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, einen kurzen Vortrag halten, auf einen Vorwurf reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte planlama, kısa sunum, bir suçlamaya karşılık verme.",
      tasks: [
        {
          id: "de-b1-08-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam einen Tag der offenen Tür für Ihren Verein. Sprechen Sie über: Termin — Programm — wie Sie neue Leute erreichen — wer welche Aufgabe übernimmt.",
          promptTr:
            "Derneğiniz için birlikte bir açık kapı günü planla. Şunları konuş: tarih — program — yeni insanlara nasıl ulaşılacak — kim hangi işi üstlenecek?",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Tag der offenen Tür. Zuerst der Termin: Im Herbst sind die Wochenenden voll, im Sommer sind viele im Urlaub. Was schlagen Sie vor?",
              tr: "Açık kapı gününü birlikte planlıyoruz. Önce tarih: Sonbaharda hafta sonları dolu, yazın çoğu tatilde. Ne önerirsin?",
            },
            { who: "you", hint: "Somut bir tarih öner ve iki itirazı da hesaba kat.", expect: "somut bir tarih önermek ve iki itirazı birden dikkate almak", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Und das Programm? Letztes Mal haben wir nur Kaffee angeboten, und nach einer halben Stunde war es still.",
              tr: "Peki. Program ne olacak? Geçen sefer yalnız kahve vardı ve yarım saat sonra ortalık sessizleşti.",
            },
            { who: "you", hint: "İnsanları tutacak somut bir program öner.", expect: "insanların kalmasını sağlayacak somut bir program önermek", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Wie erreichen wir Leute, die uns noch nicht kennen? Ein Aushang im Vereinsheim bringt ja nichts.",
              tr: "Anlaştık. Bizi tanımayanlara nasıl ulaşacağız? Dernek binasındaki duyuru işe yaramıyor.",
            },
            { who: "you", hint: "Dernek dışına çıkan bir yol öner ve gerekçelendir.", expect: "dernek çevresinin dışına ulaşan bir yol önermek ve gerekçelendirmek", seconds: 45 },
            {
              who: "partner",
              de: "Bleiben die Aufgaben. Ich kann nicht wieder alles machen, letztes Jahr bin ich damit allein geblieben.",
              tr: "Geriye görevler kaldı. Yine her şeyi ben yapamam, geçen yıl bu işte yalnız kaldım.",
            },
            { who: "you", hint: "Görevleri paylaştır ve en az birini açıkça üstlen.", expect: "görevleri paylaştırmak ve açıkça bir iş üstlenmek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneri sunmak ve gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "eine Aufgabe übernehmen", tr: "Bir işi üstlenmek" },
            ],
            sample:
              "Ich schlage den ersten Samstag im Mai vor: Da sind die Ferien vorbei und der Herbstkalender ist noch weit weg. Beim Programm würde ich etwas zum Mitmachen anbieten, eine kurze Führung um elf und um zwei — Kaffee allein hält niemanden. Erreichen können wir neue Leute über die Schule und den Wochenmarkt; wer nur im Vereinsheim liest, ist ohnehin schon Mitglied. Und bei den Aufgaben machen wir eine Liste mit Namen: Ich übernehme die Führungen und frage zwei Leute für den Kuchen, du kümmerst dich nur um die Anmeldung.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu (tarih, saat, kanal), yoksa genel onay mı?",
              "Her itiraz (dolu takvim, sessiz kalan salon, işe yaramayan duyuru, yalnız kalma) gerçekten karşılandı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Gerekçe bağlaçları kullanıldı mı? (weil, damit, deshalb)",
            ],
          },
        },
        {
          id: "de-b1-08-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag: Ehrenamt — freie Entscheidung oder gesellschaftliche Pflicht? Sprechen Sie über beide Seiten und Ihre eigene Erfahrung. Sprechen Sie etwa drei Minuten.",
          promptTr:
            "Kısa bir sunum yap: Gönüllülük — özgür bir seçim mi, toplumsal bir görev mi? İki tarafı ve kendi deneyimini anlat. Yaklaşık üç dakika konuş.",
          prepSeconds: 60,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "beide Seiten darstellen", tr: "İki tarafı da ortaya koymak" },
              { de: "eigene Erfahrung einbringen", tr: "Kendi deneyimini katmak" },
              { de: "eine eigene Position begründen", tr: "Kendi konumunu gerekçelendirmek" },
            ],
            sample:
              "Für die freie Entscheidung spricht, dass erzwungene Hilfe keine Hilfe ist. Wer muss, macht das Nötigste und geht. Auf der anderen Seite funktioniert vieles nur, weil Leute etwas tun, wofür sie nicht bezahlt werden: die Feuerwehr auf dem Land, die Bücherei bei uns im Ort. Wenn niemand mehr mitmacht, verschwindet das einfach. Ich habe zwei Jahre Hausaufgabenhilfe gemacht. Angefangen habe ich, weil eine Nachbarin mich direkt gefragt hat, nicht wegen eines Aufrufs. Aufgehört habe ich, als ich die Stelle gewechselt habe. Für mich ist es deshalb eine freie Entscheidung — aber eine, die man Menschen leicht machen muss. Kleine Aufgaben und eine direkte Frage bringen mehr als jeder Appell an die Pflicht.",
            criteria: [
              "Her iki taraf da gerçekten anlatıldı mı?",
              "Kendi deneyimi somut mu (ne, ne kadar süre, neden başladı, neden bitti)?",
              "Konum gerekçelendirildi mi ve anlatılanlarla tutarlı mı?",
              "Karşıtlık ve sonuç bağlaçları kullanıldı mı? (auf der anderen Seite, deshalb, trotzdem)",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-08-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf einen Vorwurf. Jemand aus dem Verein sagt, Sie hätten sich eingetragen und seien dann nicht gekommen. Hören Sie zu, antworten Sie und suchen Sie eine Lösung.",
          promptTr:
            "Bir suçlamaya karşılık ver. Dernekten biri, listeye yazılıp gelmediğini söylüyor. Dinle, cevap ver ve bir çözüm ara.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Ich muss das mal ansprechen. Du warst am Samstag für den Abbau eingetragen und bist nicht gekommen. Wir waren zu dritt statt zu sechst.",
              tr: "Bunu konuşmam gerek. Cumartesi toplama işine yazılmıştın ve gelmedin. Altı yerine üç kişiydik.",
            },
            {
              who: "you",
              hint: "Sorumluluğu kabul et ve ne olduğunu açıkla.",
              expect: "sorumluluğu savunmaya geçmeden kabul etmek ve durumu açıklamak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Das verstehe ich. Aber eine kurze Nachricht wäre möglich gewesen, oder? Wir haben bis halb sechs auf dich gewartet.",
              tr: "Anlıyorum. Ama kısa bir mesaj mümkündü, değil mi? Beş buçuğa kadar seni bekledik.",
            },
            {
              who: "you",
              hint: "Bu itirazı kabul et ve bir daha olmaması için somut bir şey öner.",
              expect: "haklı itirazı kabul etmek ve tekrarını önleyecek somut bir şey önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Gut. Und was ist mit dem nächsten Mal? Ich möchte nicht wieder in der gleichen Lage sein.",
              tr: "Peki. Bir dahaki sefere ne olacak? Aynı duruma yine düşmek istemiyorum.",
            },
            {
              who: "you",
              hint: "Somut bir taahhüt ver ya da yükü gerçekçi biçimde sınırla.",
              expect: "somut bir taahhüt vermek ya da yükü gerçekçi biçimde sınırlamak",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "einen Vorwurf annehmen", tr: "Suçlamayı kabul etmek" },
              { de: "die eigene Lage erklären", tr: "Kendi durumunu açıklamak" },
              { de: "eine Lösung anbieten", tr: "Bir çözüm önermek" },
            ],
            sample:
              "Du hast recht, das war mein Fehler. Meine Tochter ist am Samstagmittag gestürzt, und wir sind in die Notaufnahme gefahren. Trotzdem hätte ich unterwegs kurz schreiben können — das gebe ich zu. Ich schlage vor, dass wir eine Telefonnummer in den Plan schreiben, dann erreicht man jemanden auch ohne Gruppe. Und beim nächsten Fest trage ich mich nur noch für den Aufbau ein. Da weiß ich sicher, dass ich kann. Beim Abbau frage ich lieber kurzfristig, wenn es passt.",
            criteria: [
              "Suçlama savunmaya geçmeden kabul edildi mi?",
              "Açıklama bir mazeret değil bir bilgi olarak sunuldu mu?",
              "Haklı olan itiraz (haber vermemek) ayrıca kabul edildi mi?",
              "Öneri somut ve tekrarı önleyecek nitelikte mi?",
              "Taahhüt gerçekçi mi — yerine getirilemeyecek bir söz verilmedi mi?",
            ],
          },
        },
      ],
    },
  ],
};
