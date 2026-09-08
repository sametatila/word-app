import type { MockPaper } from "../types";

/**
 * B1 · Deneme 11 — "Essen und Herkunft".
 *
 * PLAN kâğıt 1–10 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 ana fikir · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karma · 5 danışma · 7 R/F sunum · 8 tartışma)
 *   Schreiben 60 dk           80 + 80 + 40 kelime
 *   Sprechen  15 dk           bilgi alışverişi · sunum · birlikte planlama
 *
 * KONU SEÇİMİ: yemeğin nereden geldiği. "Gesundheit und Ernährung" kâğıdı
 * sağlıklı beslenmeyi almıştı; buradaki soru başka — bir öğünün fiyatı
 * nereye gidiyor, bölgesel ürün gerçekten daha iyi mi, artan yemekle ne
 * yapılıyor. B1'in ölçtüğü karşılaştırma ve gerekçelendirme bu alanda
 * doğal olarak çıkıyor.
 *
 * DİKKAT EDİLEN: metinlerin hiçbiri "bölgesel iyidir" demiyor. Gazete
 * yazısı porsiyon başı maliyetin arttığını ama israfın düştüğünü, forumda
 * yedi kişinin dördünün koşullu destek verdiğini gösteriyor.
 *
 * B1 dilbilgisi: Konjunktiv II, ilgi cümlesi ve ileri bağlaçlar her
 * bölümde geçiyor.
 */
export const B1_11: MockPaper = {
  id: "de-b1-11",
  course: "de",
  level: "B1",
  no: 11,
  theme: "Essen und Herkunft",
  themeTr: "Yemek ve kaynağı",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Bericht, kurze Texte, Anzeigen, Forumsbeiträge und Regeln.",
      instructionTr:
        "Bu bölümde beş görev var. Bir haber, kısa metinler, ilanlar, forum yorumları ve kurallar okuyacaksın.",
      tasks: [
        {
          id: "de-b1-11-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Metni ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsbericht",
              genreTr: "Gazete haberi",
              title: "Teurer eingekauft, günstiger gekocht",
              body: `Die Schulmensa in Ostheim hat vor zwei Jahren ihre Lieferanten gewechselt. Gemüse und Kartoffeln kommen seitdem von drei Höfen aus dem Landkreis, Fleisch von einem Betrieb, der vierzig Kilometer entfernt liegt.

Der Einkauf ist dadurch teurer geworden: pro Portion etwa achtzehn Cent. Die Mensaleiterin Ruth Kirchhoff hat trotzdem nicht mehr Geld gebraucht. "Wir werfen weniger weg", sagt sie. "Vorher sind jeden Tag über zwanzig Portionen in die Tonne gegangen, heute sind es sechs."

Der Grund dafür ist nicht die Herkunft, sondern die Planung. Weil die Höfe kleine Mengen liefern, muss die Küche zwei Tage vorher wissen, wie viele Kinder essen. Dafür haben die Klassen ein einfaches Meldesystem bekommen.

"Wenn wir das System nicht hätten, wäre der Wechsel gescheitert", sagt Kirchhoff. Ohne genaue Zahlen müsste die Küche zu viel bestellen, und dann wäre der teurere Einkauf ein Verlust.

Nicht alles läuft gut. Im Februar hat ein Hof wegen Krankheit nicht liefern können, und die Mensa hat für zwei Wochen wieder im Großmarkt eingekauft. "Das ist der Preis", sagt Kirchhoff. "Drei Höfe sind weniger sicher als ein Großhändler."

Andere Schulen fragen inzwischen nach dem Modell. Kirchhoff warnt jedoch davor, nur auf die Herkunft zu schauen. "Wer regional kauft und weiter zu viel kocht, zahlt einfach mehr für dieselbe Tonne."`,
              gloss: [
                { de: "der Lieferant", tr: "tedarikçi", en: "supplier" },
                { de: "die Portion", tr: "porsiyon", en: "portion" },
                { de: "die Planung", tr: "planlama", en: "planning" },
                { de: "der Großhändler", tr: "toptancı", en: "wholesaler" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-11-l1-1",
              no: 1,
              ref: "r1",
              text: "Der Einkauf ist nach dem Wechsel teurer geworden.",
              answer: true,
              explain:
                "Rakam metinde: \"pro Portion etwa achtzehn Cent\" daha pahalı — ama toplam bütçe artmamış.",
            },
            {
              kind: "bool",
              id: "de-b1-11-l1-2",
              no: 2,
              ref: "r1",
              text: "Die Mensa hat nach dem Wechsel mehr Geld bekommen.",
              answer: false,
              explain:
                "Tersi söyleniyor: \"hat trotzdem nicht mehr Geld gebraucht\", çünkü daha az yemek çöpe gidiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-11-l1-3",
              no: 3,
              ref: "r1",
              text: "Die Zahl der weggeworfenen Portionen ist deutlich gesunken.",
              answer: true,
              explain:
                "İki sayı karşılaştırılıyor: \"Vorher sind jeden Tag über zwanzig Portionen in die Tonne gegangen, heute sind es sechs.\"",
            },
            {
              kind: "bool",
              id: "de-b1-11-l1-4",
              no: 4,
              ref: "r1",
              text: "Der Rückgang kommt vor allem von der Herkunft der Ware.",
              answer: false,
              explain:
                "Yazı gerekçeyi ayırıyor: \"Der Grund dafür ist nicht die Herkunft, sondern die Planung\" — sınıflardan gelen bildirim sistemi.",
            },
            {
              kind: "bool",
              id: "de-b1-11-l1-5",
              no: 5,
              ref: "r1",
              text: "Im Februar hat die Mensa vorübergehend anders eingekauft.",
              answer: true,
              explain:
                "Bir çiftlik hastalık nedeniyle teslimat yapamamış ve mutfak iki hafta \"wieder im Großmarkt\" alışveriş etmiş.",
            },
            {
              kind: "bool",
              id: "de-b1-11-l1-6",
              no: 6,
              ref: "r1",
              text: "Frau Kirchhoff empfiehlt allen Schulen den Wechsel.",
              answer: false,
              explain:
                "Uyarıyor: \"Wer regional kauft und weiter zu viel kocht, zahlt einfach mehr für dieselbe Tonne.\"",
            },
          ],
        },
        {
          id: "de-b1-11-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die sechs Texte. Worum geht es? Wählen Sie a, b oder c.",
          promptTr: "Altı metni oku. Konu ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang in der Mensa",
              genreTr: "Yemekhanede duyuru",
              body: `Liebe Gäste,

ab Montag müssen Sie Ihr Essen zwei Tage vorher bestellen. Der Grund sind unsere neuen Lieferanten, die nur kleine Mengen bringen.

Wer nicht bestellt hat, bekommt trotzdem etwas — aber nur das Gericht, das übrig ist.

Die Preise bleiben gleich.`,
              gloss: [{ de: "übrig", tr: "artan", en: "left over" }],
            },
            {
              kind: "text",
              id: "t2",
              genre: "E-Mail eines Lieferdienstes",
              genreTr: "Teslimat servisinden e-posta",
              body: `Sehr geehrter Herr Delfs,

Ihre Bestellung vom 4. März konnten wir nicht vollständig liefern. Die Kartoffeln waren ausverkauft.

Wir haben den Betrag von 4,80 Euro auf Ihr Konto zurückgebucht. Eine Nachlieferung ist leider nicht möglich.

Ihre Bestellung für nächste Woche bleibt davon unberührt.`,
              gloss: [
                { de: "ausverkauft", tr: "tükenmiş", en: "sold out" },
                { de: "zurückbuchen", tr: "iade etmek", en: "to refund" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Nachricht in der Nachbarschaftsgruppe",
              genreTr: "Mahalle grubunda ileti",
              body: `Hallo zusammen,

wir fahren morgen früh weg und haben noch Milch, Brot und viel Gemüse im Kühlschrank.

Alles ist frisch, nichts ist abgelaufen. Wer etwas davon brauchen kann, kommt heute bis 20 Uhr bei uns vorbei.

Wegwerfen möchte ich das nicht.`,
              gloss: [{ de: "ablaufen", tr: "(tarihi) geçmek", en: "to expire" }],
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Der Wochenmarkt zieht ab April vom Rathausplatz in die Bahnhofstraße. Der Rathausplatz wird ein Jahr lang umgebaut.

Die Zahl der Stände bleibt gleich, die Zeiten ändern sich nicht: mittwochs und samstags von 7 bis 13 Uhr.

Die Stadt bittet um Verständnis für die Umstellung.`,
              gloss: [
                { de: "der Stand", tr: "tezgâh", en: "stall" },
                { de: "die Umstellung", tr: "değişiklik", en: "changeover" },
              ],
            },
            {
              kind: "text",
              id: "t5",
              genre: "Aushang am Hofladen",
              genreTr: "Çiftlik dükkânında duyuru",
              body: `Liebe Kundinnen und Kunden,

im Juli und August haben wir samstags geschlossen. In dieser Zeit ist Ernte, und wir sind alle auf dem Feld.

Bestellungen nehmen wir weiter per Telefon an. Abholung ist dann werktags von 16 bis 18 Uhr möglich.

Ab September gelten wieder die normalen Zeiten.`,
              gloss: [{ de: "die Ernte", tr: "hasat", en: "harvest" }],
            },
            {
              kind: "text",
              id: "t6",
              genre: "Nachricht an den Kundendienst",
              genreTr: "Müşteri hizmetlerine ileti",
              body: `Sehr geehrte Damen und Herren,

ich habe am Dienstag eine Kiste Obst bestellt und am Mittwoch bekommen. Auf der Rechnung steht Bio, auf den Äpfeln steht es nicht.

Bitte teilen Sie mir mit, welche Ware ich bekommen habe. Wenn es keine Bio-Ware war, möchte ich die Differenz zurück.

Mit freundlichen Grüßen
Selma Idrissi`,
              gloss: [{ de: "die Differenz", tr: "fark", en: "difference" }],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-11-l2-7",
              no: 7,
              ref: "t1",
              text: "Worum geht es in dem Text?",
              options: [
                "Die Mensa erhöht ab Montag die Preise.",
                "Gäste müssen ihr Essen früher bestellen.",
                "Die Mensa bietet weniger Gerichte an.",
              ],
              answer: 1,
              explain:
                "Duyurunun konusu bir kural değişikliği: \"ab Montag müssen Sie Ihr Essen zwei Tage vorher bestellen\". Fiyatlar aynı kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l2-8",
              no: 8,
              ref: "t2",
              text: "Worum geht es in dem Text?",
              options: [
                "Eine Bestellung wird verschoben.",
                "Ein Kunde soll neu bestellen.",
                "Ein Teil der Ware fehlte und wird erstattet.",
              ],
              answer: 2,
              explain:
                "Patatesler tükenmiş ve tutar iade edilmiş: \"Wir haben den Betrag von 4,80 Euro auf Ihr Konto zurückgebucht.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l2-9",
              no: 9,
              ref: "t3",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand verschenkt Lebensmittel vor der Abreise.",
                "Jemand sucht jemanden für die Blumen.",
                "Jemand warnt vor abgelaufener Ware.",
              ],
              answer: 0,
              explain:
                "Yiyecekler taze ve sahibi onları atmak istemiyor: \"Wer etwas davon brauchen kann, kommt heute bis 20 Uhr bei uns vorbei.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l2-10",
              no: 10,
              ref: "t4",
              text: "Worum geht es in dem Text?",
              options: [
                "Der Markt bekommt mehr Stände.",
                "Der Markt findet seltener statt.",
                "Der Markt wechselt den Ort.",
              ],
              answer: 2,
              explain:
                "Pazar taşınıyor: \"vom Rathausplatz in die Bahnhofstraße\". Tezgâh sayısı ve saatler aynı.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l2-11",
              no: 11,
              ref: "t5",
              text: "Worum geht es in dem Text?",
              options: [
                "Der Laden schließt für immer.",
                "Der Laden ändert im Sommer die Zeiten.",
                "Der Laden nimmt keine Bestellungen mehr an.",
              ],
              answer: 1,
              explain:
                "Değişiklik iki aylık ve kısmi: \"im Juli und August haben wir samstags geschlossen\", ama sipariş telefonla sürüyor ve teslim alma hafta içi 16–18 arası.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l2-12",
              no: 12,
              ref: "t6",
              text: "Worum geht es in dem Text?",
              options: [
                "Eine Kundin fragt nach der Qualität der Ware.",
                "Eine Kundin storniert ihre Kiste Obst.",
                "Eine Kundin meldet eine falsche Rechnung.",
              ],
              answer: 0,
              explain:
                "Fatura ile ürünün etiketi uyuşmuyor; müşteri \"welche Ware ich bekommen habe\" sorusunu soruyor ve gerekirse fark istiyor.",
            },
          ],
        },
        {
          id: "de-b1-11-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot rund ums Essen. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler yemekle ilgili bir hizmet arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Solidarische Landwirtschaft",
              body: "Feste Mitgliedschaft für ein Jahr, monatlich 62 Euro. Jede Woche eine Kiste Gemüse, Abholung freitags am Hof. Was in der Kiste ist, entscheidet die Ernte.",
            },
            {
              key: "b",
              label: "Kochkurs für Anfänger",
              body: "Sechs Abende, dienstags 18 bis 21 Uhr. Einfache Gerichte aus wenigen Zutaten. 90 Euro inklusive Material, ohne Vorkenntnisse.",
            },
            {
              key: "c",
              label: "Mittagstisch im Bürgerhaus",
              body: "Jeden Werktag ab 12 Uhr ein warmes Gericht für 4 Euro. Keine Anmeldung, jeder ist willkommen. Auch zum Mitnehmen.",
            },
            {
              key: "d",
              label: "Lebensmittel retten",
              body: "Wir holen Ware ab, die Läden nicht mehr verkaufen dürfen, und verteilen sie weiter. Wir suchen Helfer mit Auto, dienstags und donnerstags abends.",
            },
            {
              key: "e",
              label: "Hofladen Wiesengrund",
              body: "Gemüse, Eier und Käse direkt vom Hof. Mo bis Fr 9 bis 18 Uhr, samstags bis 13 Uhr. Im Juli und August samstags geschlossen.",
            },
            {
              key: "f",
              label: "Ernährungsberatung",
              body: "Einzelgespräche zu Zucker, Fett und Portionen. Termin nach Vereinbarung, 65 Euro pro Stunde. Die Krankenkasse zahlt manchmal einen Teil.",
            },
            {
              key: "g",
              label: "Gemeinschaftsgarten Ostheim",
              body: "Ein Beet für eine Saison, 30 Euro. Werkzeug und Wasser sind da. Vier Arbeitseinsätze im Jahr sind Pflicht.",
            },
            {
              key: "h",
              label: "Lieferdienst Frischkiste",
              body: "Wöchentliche Lieferung an die Wohnungstür, Inhalt frei wählbar. Ab 25 Euro versandfrei, Bestellung bis Sonntag 20 Uhr.",
            },
            {
              key: "i",
              label: "Küche für Vereine",
              body: "Große Küche mit zwei Öfen, für Feste und Kurse zu mieten. 40 Euro pro Tag, Schlüssel im Bürgerhaus, Reinigung selbst.",
            },
            {
              key: "j",
              label: "Marktführung für Schulklassen",
              body: "Eine Stunde über den Wochenmarkt, mit Kosten und Herkunft der Ware. Kostenlos, Anmeldung vier Wochen vorher.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-11-l3-13",
              no: 13,
              text: "Herr Aksoy hat wenig Geld und möchte mittags warm essen, ohne sich vorher anzumelden.",
              answer: "c",
              explain:
                "(c) hem ucuz hem kayıtsız: \"ein warmes Gericht für 4 Euro. Keine Anmeldung.\"",
            },
            {
              kind: "match",
              id: "de-b1-11-l3-14",
              no: 14,
              text: "Frau Pantel möchte selbst etwas anbauen, hat aber keinen Garten.",
              answer: "g",
              explain:
                "(g) bir mevsimlik parsel veriyor ve alet suyu da var; karşılığında dört çalışma günü zorunlu.",
            },
            {
              kind: "match",
              id: "de-b1-11-l3-15",
              no: 15,
              text: "Herr Wolfram hat ein Auto und möchte abends etwas Sinnvolles tun.",
              answer: "d",
              explain:
                "(d) tam bu profili arıyor: \"Wir suchen Helfer mit Auto, dienstags und donnerstags abends.\"",
            },
            {
              kind: "match",
              id: "de-b1-11-l3-16",
              no: 16,
              text: "Frau Idrissi möchte wöchentlich Gemüse bekommen und selbst entscheiden, was drin ist.",
              answer: "h",
              explain:
                "(h) içerik seçimini bırakıyor: \"Inhalt frei wählbar\". (a) haftalık kutu veriyor ama içeriğine hasat karar veriyor.",
            },
            {
              kind: "match",
              id: "de-b1-11-l3-17",
              no: 17,
              text: "Herr Baumbach kann kaum kochen und möchte es mit einfachen Rezepten lernen.",
              answer: "b",
              explain:
                "(b) başlangıç düzeyine göre: \"Einfache Gerichte aus wenigen Zutaten\" ve ön bilgi istemiyor.",
            },
            {
              kind: "match",
              id: "de-b1-11-l3-18",
              no: 18,
              text: "Frau Merzig unterrichtet eine sechste Klasse und sucht etwas Praktisches zum Thema Preise.",
              answer: "j",
              explain:
                "(j) okul sınıfları için ve tam bu konuyu işliyor: \"mit Kosten und Herkunft der Ware\".",
            },
            {
              kind: "match",
              id: "de-b1-11-l3-19",
              no: 19,
              text: "Der Elternbeirat möchte für ein Schulfest an einem Tag für hundert Leute kochen.",
              answer: "i",
              explain:
                "(i) günlük kiralanan büyük bir mutfak: \"Große Küche mit zwei Öfen, für Feste und Kurse zu mieten.\"",
            },
          ],
        },
        {
          id: "de-b1-11-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Schulmensen nur noch regionale Produkte anbieten?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Okul yemekhaneleri yalnız bölgesel ürün mü sunmalı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Nur noch aus der Region — ja oder nein?",
              body: `Ruth Kirchhoff: Ich leite eine Mensa, die genau das gemacht hat, und ich bin dafür. Der Einkauf kostet uns achtzehn Cent mehr pro Portion, aber wir werfen dreiviertel weniger weg. Wer nur auf den Einkaufspreis schaut, rechnet die Hälfte.

Timur Aksoy: Ich koche in einer Kita und bin dagegen. Nicht weil regional schlecht wäre, sondern weil wir zwei Köche für hundertzwanzig Kinder sind. Kleine Lieferungen heißen mehr Bestellungen, mehr Rechnungen, mehr Telefonate. Diese Zeit haben wir schlicht nicht.

Frau Pantel: Als Mutter bin ich dafür, aber nur, wenn der Preis für die Familien gleich bleibt. Bei uns hat eine Umstellung fünfzig Cent gekostet, und danach sind acht Kinder aus der Mensa raus. Für die war das kein besseres Essen, sondern gar keins.

Jörn Baumbach: Ich habe einen Hof und liefere selbst an zwei Schulen. Trotzdem bin ich dagegen, dass man es vorschreibt. Wir können im Februar keine hundert Kilo Salat liefern. Eine Regel, die die Küche in eine Lücke laufen lässt, hilft niemandem, auch uns nicht.

Selma Idrissi: Ich bin dafür, und zwar wegen des Unterrichts. Meine Klasse hat den Hof besucht, von dem die Kartoffeln kommen. Danach hat kein Kind mehr die Hälfte stehen lassen. Das ist keine Statistik, aber ich habe es sechs Wochen lang gesehen.

Ernst Wolfram: Ich habe dreißig Jahre in der Großküche gearbeitet und bin dagegen. Regional sagt nichts über die Qualität. Ich habe schlechte Ware aus dem Nachbardorf gesehen und gute aus achthundert Kilometern. Entscheidend ist, wer kontrolliert.

Frau Merzig: Ich bin dafür, unter einer Bedingung: Die Schule muss zwei Tage vorher wissen, wie viele essen. Ohne Meldesystem bestellt die Küche zu viel, und dann ist teurer eingekauft einfach teurer weggeworfen.`,
              gloss: [
                { de: "vorschreiben", tr: "zorunlu kılmak", en: "to prescribe" },
                { de: "die Lücke", tr: "boşluk, açık", en: "gap" },
                { de: "die Großküche", tr: "toplu yemek mutfağı", en: "industrial kitchen" },
                { de: "das Meldesystem", tr: "bildirim sistemi", en: "reporting system" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-11-l4-20",
              no: 20,
              ref: "f1",
              text: "Ruth Kirchhoff",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Kendi deneyimiyle destekliyor: alım on sekiz kuruş pahalı ama israf dörtte üç azalmış — \"Wer nur auf den Einkaufspreis schaut, rechnet die Hälfte.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l4-21",
              no: 21,
              ref: "f1",
              text: "Timur Aksoy",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Gerekçesi ürün değil kadro: \"wir zwei Köche für hundertzwanzig Kinder sind\" — küçük teslimatlar daha çok sipariş ve fatura demek.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l4-22",
              no: 22,
              ref: "f1",
              text: "Frau Pantel",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Destek koşullu ama açık: \"aber nur, wenn der Preis für die Familien gleich bleibt\" — elli kuruşluk zam sekiz çocuğu yemekhaneden çıkarmış.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l4-23",
              no: 23,
              ref: "f1",
              text: "Jörn Baumbach",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendisi üretici olmasına rağmen zorunluluğa karşı: şubatta yüz kilo salata teslim edemiyorlar, ve böyle bir kural mutfağı açıkta bırakıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l4-24",
              no: 24,
              ref: "f1",
              text: "Selma Idrissi",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Gerekçesi eğitimle ilgili: çiftliği gören sınıfta \"kein Kind mehr die Hälfte stehen lassen\" — bunu altı hafta gözlemlemiş.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l4-25",
              no: 25,
              ref: "f1",
              text: "Ernst Wolfram",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Bölgesel olmayı kalitenin ölçüsü saymıyor: komşu köyden kötü, sekiz yüz kilometreden iyi mal görmüş — \"Entscheidend ist, wer kontrolliert.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l4-26",
              no: 26,
              ref: "f1",
              text: "Frau Merzig",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Bir koşulla destekliyor: okul iki gün önceden sayıyı bilmeli, yoksa \"teurer eingekauft einfach teurer weggeworfen\" olur.",
            },
          ],
        },
        {
          id: "de-b1-11-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Mitgliedsregeln und die Aufgaben 27 bis 30. Wählen Sie a, b oder c.",
          promptTr: "Üyelik kurallarını ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Mitgliedsregeln",
              genreTr: "Üyelik kuralları",
              title: "Solidarische Landwirtschaft Wiesengrund — Regeln",
              body: `1. Mitgliedschaft
Die Mitgliedschaft gilt für ein Erntejahr, von April bis März. Ein Ausstieg während des Jahres ist nur möglich, wenn ein Nachfolger gefunden wird.

2. Beitrag
Der Beitrag beträgt 62 Euro im Monat und wird jeweils zum Dritten abgebucht. Bei Zahlungsschwierigkeiten sprechen Sie uns an; wir finden eine Lösung.

3. Abholung
Die Kisten stehen freitags von 14 bis 19 Uhr bereit. Nicht abgeholte Kisten geben wir am Samstag an die Tafel weiter; einen Ersatz gibt es nicht.

4. Inhalt
Über den Inhalt entscheidet die Ernte, nicht die Bestellung. In schlechten Wochen ist die Kiste kleiner. Der Beitrag bleibt in diesem Fall gleich.`,
              gloss: [
                { de: "der Ausstieg", tr: "çıkış", en: "withdrawal" },
                { de: "abbuchen", tr: "hesaptan çekmek", en: "to debit" },
                { de: "die Tafel", tr: "gıda bankası", en: "food bank" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-11-l5-27",
              no: 27,
              ref: "o1",
              text: "Wie kann man vorzeitig aussteigen?",
              options: [
                "Mit einer Frist von drei Monaten.",
                "Gar nicht, das Jahr läuft immer voll.",
                "Nur wenn jemand nachrückt.",
              ],
              answer: 2,
              explain:
                "Birinci madde tek yolu veriyor: \"nur möglich, wenn ein Nachfolger gefunden wird\".",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l5-28",
              no: 28,
              ref: "o1",
              text: "Was gilt bei Zahlungsschwierigkeiten?",
              options: [
                "Man soll sich an den Hof wenden.",
                "Die Mitgliedschaft endet sofort.",
                "Der Beitrag wird automatisch gesenkt.",
              ],
              answer: 0,
              explain:
                "İkinci madde bir davet içeriyor: \"sprechen Sie uns an; wir finden eine Lösung\" — otomatik bir indirim yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l5-29",
              no: 29,
              ref: "o1",
              text: "Was passiert mit einer nicht abgeholten Kiste?",
              options: [
                "Sie wird bis zur nächsten Abholung aufbewahrt.",
                "Sie wird am Samstag weitergegeben.",
                "Sie wird durch einen Ersatz ausgeglichen.",
              ],
              answer: 1,
              explain:
                "Üçüncü madde bunu açıkça düzenliyor ve telafiyi dışlıyor: \"einen Ersatz gibt es nicht\".",
            },
            {
              kind: "mcq",
              id: "de-b1-11-l5-30",
              no: 30,
              ref: "o1",
              text: "Was gilt in einer schlechten Erntewoche?",
              options: [
                "Der Beitrag wird zurückgezahlt.",
                "Die Kiste wird durch Zukauf ergänzt.",
                "Die Kiste ist kleiner, der Beitrag gleich.",
              ],
              answer: 2,
              explain:
                "Dördüncü madde riski üyeye bırakıyor: \"In schlechten Wochen ist die Kiste kleiner. Der Beitrag bleibt in diesem Fall gleich.\"",
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
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Beratungsgespräch, einen Vortrag und eine Diskussion.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir danışma görüşmesi, bir sunum ve bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-b1-11-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage in der Mensa",
              genreTr: "Yemekhanede anons",
              situation: "Bir yemek bitti.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für die Wartenden: Das Gericht mit Fisch ist ausverkauft. Wir haben noch die Gemüsepfanne und Nudeln mit Soße. Wer Fisch vorbestellt hat, bekommt ihn selbstverständlich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir çiftlik teslimatı erteliyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Idrissi, hier ist der Hof Wiesengrund. Ihre Kiste steht diese Woche erst ab sechzehn Uhr bereit, nicht ab vierzehn. Der Grund ist die Ernte. Abholzeit ist trotzdem bis neunzehn Uhr.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir sayı haberi.",
              plays: 1,
              segments: [
                {
                  text: "Im Landkreis sind im letzten Jahr rund elftausend Tonnen Lebensmittel im Müll gelandet. Der größte Teil davon, etwa sechzig Prozent, kommt aus privaten Haushalten und nicht aus dem Handel.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Gespräch am Marktstand",
              genreTr: "Pazar tezgâhında konuşma",
              situation: "Bir müşteri fiyatı soruyor.",
              plays: 1,
              segments: [
                { speaker: "Kundin", text: "Die Kartoffeln sind teurer als letzte Woche." },
                { speaker: "Händler", text: "Ja, um vierzig Cent. Das ist die neue Ernte, die alte ist zu Ende." },
                { speaker: "Kundin", text: "Dann nehme ich trotzdem zwei Kilo." },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir kurs için bilgi.",
              plays: 1,
              segments: [
                {
                  text: "Hallo Herr Baumbach, hier ist die Volkshochschule. Der Kochkurs beginnt am siebten statt am ersten März. Eine Person hat abgesagt, deshalb ist noch ein Platz frei. Sagen Sie bitte bis Freitag Bescheid.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-11-h1-1",
              no: 1,
              ref: "h1",
              text: "Wer Fisch vorbestellt hat, bekommt ihn trotzdem.",
              answer: true,
              explain:
                "Anons bunu ayrıca söylüyor: \"Wer Fisch vorbestellt hat, bekommt ihn selbstverständlich.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h1-2",
              no: 2,
              ref: "h1",
              text: "Was gibt es noch?",
              options: [
                "Nur die Gemüsepfanne.",
                "Zwei andere Gerichte.",
                "Nur Nudeln mit Soße.",
              ],
              answer: 1,
              explain:
                "İki yemek sayılıyor: \"die Gemüsepfanne und Nudeln mit Soße\".",
            },
            {
              kind: "bool",
              id: "de-b1-11-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Abholung endet diese Woche früher.",
              answer: false,
              explain:
                "Yalnız başlangıç saati kayıyor. Bitiş aynı: \"Abholzeit ist trotzdem bis neunzehn Uhr.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h1-4",
              no: 4,
              ref: "h2",
              text: "Ab wann steht die Kiste bereit?",
              options: ["Ab 14 Uhr.", "Ab 19 Uhr.", "Ab 16 Uhr."],
              answer: 2,
              explain:
                "Mesaj iki saati karşılaştırıyor: \"erst ab sechzehn Uhr bereit, nicht ab vierzehn\".",
            },
            {
              kind: "bool",
              id: "de-b1-11-h1-5",
              no: 5,
              ref: "h3",
              text: "Der größte Teil des Abfalls kommt aus dem Handel.",
              answer: false,
              explain:
                "Haber tersini söylüyor: yaklaşık yüzde altmış \"aus privaten Haushalten und nicht aus dem Handel\".",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h1-6",
              no: 6,
              ref: "h3",
              text: "Wie viel Lebensmittel landeten im Müll?",
              options: ["Rund 11.000 Tonnen.", "Rund 60.000 Tonnen.", "Rund 1.100 Tonnen."],
              answer: 0,
              explain:
                "Kayıtta bir miktar ve bir oran var: \"rund elftausend Tonnen\" ve bunun yüzde altmışı.",
            },
            {
              kind: "bool",
              id: "de-b1-11-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Kundin kauft die Kartoffeln nicht.",
              answer: false,
              explain:
                "Zamma rağmen alıyor: \"Dann nehme ich trotzdem zwei Kilo.\" `trotzdem` sözcüğü kararın fiyata rağmen verildiğini gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h1-8",
              no: 8,
              ref: "h4",
              text: "Warum sind die Kartoffeln teurer?",
              options: [
                "Der Händler hat den Preis erhöht.",
                "Die Ware ist knapp geworden.",
                "Es ist eine neue Ernte.",
              ],
              answer: 2,
              explain:
                "Satıcının gerekçesi: \"Das ist die neue Ernte, die alte ist zu Ende.\"",
            },
            {
              kind: "bool",
              id: "de-b1-11-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Kurs beginnt später als geplant.",
              answer: true,
              explain:
                "İki tarih karşılaştırılıyor: \"am siebten statt am ersten März\".",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h1-10",
              no: 10,
              ref: "h5",
              text: "Warum ist noch ein Platz frei?",
              options: [
                "Der Kurs wurde vergrößert.",
                "Jemand hat abgesagt.",
                "Es haben sich wenige gemeldet.",
              ],
              answer: 1,
              explain:
                "Gerekçe kayıtta: \"Eine Person hat abgesagt, deshalb ist noch ein Platz frei.\"",
            },
          ],
        },
        {
          id: "de-b1-11-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Beratungsgespräch. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir danışma görüşmesi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Beratungsgespräch",
              genreTr: "Danışma görüşmesi",
              situation: "Tüketici danışma merkezinde etiketler konuşuluyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Idrissi", text: "Auf der Rechnung stand Bio, auf den Äpfeln nicht. Was kann ich tun?" },
                {
                  speaker: "Berater",
                  text: "Zuerst brauchen wir die Nummer der Kontrollstelle. Bei echter Bio-Ware steht die immer auf der Verpackung oder auf dem Schild.",
                },
                { speaker: "Frau Idrissi", text: "Die Äpfel waren lose in einer Kiste." },
                {
                  speaker: "Berater",
                  text: "Dann muss das Schild an der Kiste die Nummer tragen. Wenn es das nicht getan hat, war es entweder keine Bio-Ware oder ein Fehler im Laden.",
                },
                { speaker: "Frau Idrissi", text: "Und wenn es ein Fehler war?" },
                {
                  speaker: "Berater",
                  text: "Dann bekommen Sie die Differenz zurück. Wichtig ist die Rechnung; ohne sie wird es schwierig.",
                },
                { speaker: "Frau Idrissi", text: "Soll ich zuerst den Laden anschreiben?" },
                {
                  speaker: "Berater",
                  text: "Ja, schriftlich und mit einer Frist von vierzehn Tagen. Erst danach melden Sie es der Kontrollbehörde. Umgekehrt dauert es länger.",
                },
                { speaker: "Frau Idrissi", text: "Kostet mich das etwas?" },
                {
                  speaker: "Berater",
                  text: "Die Meldung nicht. Unsere Beratung heute kostet fünf Euro, aber nur, wenn Sie kein Mitglied sind.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-11-h2-11",
              no: 11,
              ref: "g1",
              text: "Was braucht der Berater zuerst?",
              options: [
                "Die Nummer der Kontrollstelle.",
                "Ein Foto von den Äpfeln.",
                "Den Namen des Lieferanten.",
              ],
              answer: 0,
              explain:
                "\"Zuerst brauchen wir die Nummer der Kontrollstelle\" — gerçek organik üründe bu numara ambalajda ya da levhada olur.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h2-12",
              no: 12,
              ref: "g1",
              text: "Wo müsste die Nummer bei loser Ware stehen?",
              options: [
                "Auf jedem einzelnen Apfel.",
                "Nur auf der Rechnung.",
                "Auf dem Schild an der Kiste.",
              ],
              answer: 2,
              explain:
                "Danışman bunu açıkça söylüyor: \"Dann muss das Schild an der Kiste die Nummer tragen.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h2-13",
              no: 13,
              ref: "g1",
              text: "Was ist für eine Rückzahlung wichtig?",
              options: [
                "Die Verpackung.",
                "Die Rechnung.",
                "Ein Zeuge im Laden.",
              ],
              answer: 1,
              explain:
                "Danışman tek bir belgeyi öne çıkarıyor: \"Wichtig ist die Rechnung; ohne sie wird es schwierig.\" Ambalaj ya da tanık geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h2-14",
              no: 14,
              ref: "g1",
              text: "In welcher Reihenfolge soll sie vorgehen?",
              options: [
                "Erst den Laden, dann die Behörde.",
                "Erst die Behörde, dann den Laden.",
                "Beides gleichzeitig.",
              ],
              answer: 0,
              explain:
                "Sıra ve gerekçesi birlikte veriliyor: önce yazılı olarak dükkân, on dört gün süreyle, \"Erst danach melden Sie es der Kontrollbehörde. Umgekehrt dauert es länger.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h2-15",
              no: 15,
              ref: "g1",
              text: "Wann kostet die Beratung nichts?",
              options: [
                "Wenn die Meldung erfolgreich ist.",
                "Wenn man unter fünf Euro reklamiert.",
                "Wenn man Mitglied ist.",
              ],
              answer: 2,
              explain:
                "Beş avroluk ücret bir koşula bağlı: \"aber nur, wenn Sie kein Mitglied sind\".",
            },
          ],
        },
        {
          id: "de-b1-11-h3",
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
              title: "Was wirklich im Müll landet",
              situation: "Bir çevre merkezinde konuşma; konuşan tek kişi.",
              plays: 2,
              segments: [
                {
                  text: "Guten Abend. Ich spreche heute über Lebensmittelabfall, und ich beginne mit einer Zahl, die viele überrascht: Etwa sechzig Prozent der weggeworfenen Lebensmittel kommen aus privaten Küchen, nicht aus Läden.",
                },
                {
                  text: "Das ist unangenehm, weil die Debatte fast immer über den Handel geführt wird. Der Handel hat einen Anteil, aber er ist kleiner, als die meisten denken.",
                },
                {
                  text: "Der häufigste Grund ist nicht Nachlässigkeit. Es ist Einkaufen ohne Plan. Wer ohne Liste einkauft, kauft im Schnitt ein Fünftel mehr, und dieses Fünftel liegt danach im Kühlschrank.",
                },
                {
                  text: "Ein zweiter Grund ist ein Missverständnis beim Datum. Das Mindesthaltbarkeitsdatum ist kein Verfallsdatum. Joghurt ist danach oft wochenlang gut. Beim Verbrauchsdatum auf Fleisch und Fisch ist das anders; das gilt streng.",
                },
                {
                  text: "Was hilft wirklich? In den Haushalten, die wir begleitet haben, hat eine einzige Maßnahme am meisten gebracht: einmal pro Woche in den Kühlschrank schauen, bevor man einkauft. Das klingt banal und hat den Abfall um ein Drittel gesenkt.",
                },
                {
                  text: "Größere Kühlschränke haben dagegen nichts geändert. In den Haushalten mit dem größten Gerät war der Abfall sogar etwas höher.",
                },
                {
                  text: "Zum Schluss eine Einschränkung: Unsere Zahlen stammen aus dreißig Haushalten in einem Landkreis. Das ist zu wenig für allgemeine Aussagen. Ich sage Ihnen, was wir gesehen haben, nicht, was überall gilt.",
                },
              ],
              gloss: [
                { de: "die Nachlässigkeit", tr: "dikkatsizlik", en: "carelessness" },
                { de: "das Mindesthaltbarkeitsdatum", tr: "tavsiye edilen tüketim tarihi", en: "best-before date" },
                { de: "das Verbrauchsdatum", tr: "son tüketim tarihi", en: "use-by date" },
                { de: "die Einschränkung", tr: "kayıt, sınırlama", en: "qualification" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-11-h3-16",
              no: 16,
              ref: "v1",
              text: "Der größere Teil des Abfalls entsteht in privaten Küchen.",
              answer: true,
              explain:
                "Sunum bununla açılıyor: \"Etwa sechzig Prozent der weggeworfenen Lebensmittel kommen aus privaten Küchen, nicht aus Läden.\"",
            },
            {
              kind: "bool",
              id: "de-b1-11-h3-17",
              no: 17,
              ref: "v1",
              text: "Der Handel spielt überhaupt keine Rolle.",
              answer: false,
              explain:
                "Konuşmacı payı kabul ediyor, yalnız büyüklüğünü düzeltiyor: \"Der Handel hat einen Anteil, aber er ist kleiner, als die meisten denken.\"",
            },
            {
              kind: "bool",
              id: "de-b1-11-h3-18",
              no: 18,
              ref: "v1",
              text: "Wer ohne Liste einkauft, kauft mehr als nötig.",
              answer: true,
              explain:
                "Oran veriliyor: listesiz alışveriş yapan ortalama \"ein Fünftel mehr\" alıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-11-h3-19",
              no: 19,
              ref: "v1",
              text: "Nach dem Mindesthaltbarkeitsdatum muss man Joghurt wegwerfen.",
              answer: false,
              explain:
                "Sunum iki tarihi ayırıyor: tavsiye tarihi son kullanma tarihi değil, \"Joghurt ist danach oft wochenlang gut\".",
            },
            {
              kind: "bool",
              id: "de-b1-11-h3-20",
              no: 20,
              ref: "v1",
              text: "Beim Verbrauchsdatum auf Fleisch gilt eine strengere Regel.",
              answer: true,
              explain:
                "Karşılaştırma açık: \"Beim Verbrauchsdatum auf Fleisch und Fisch ist das anders; das gilt streng.\"",
            },
            {
              kind: "bool",
              id: "de-b1-11-h3-21",
              no: 21,
              ref: "v1",
              text: "Ein größerer Kühlschrank hat den Abfall gesenkt.",
              answer: false,
              explain:
                "Tersi ölçülmüş: en büyük cihazı olan evlerde israf \"sogar etwas höher\" çıkmış.",
            },
            {
              kind: "bool",
              id: "de-b1-11-h3-22",
              no: 22,
              ref: "v1",
              text: "Der Redner hält seine Zahlen für allgemein gültig.",
              answer: false,
              explain:
                "Sınırı kendisi koyuyor: otuz hane \"zu wenig für allgemeine Aussagen\" — ne gördüğünü anlattığını söylüyor.",
            },
          ],
        },
        {
          id: "de-b1-11-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Diskussion",
              genreTr: "Tartışma",
              situation: "Bir okul veli toplantısında yemekhane fiyatı tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Kirchhoff, warum soll das Essen fünfzig Cent mehr kosten?" },
                {
                  speaker: "Frau Kirchhoff",
                  text: "Weil wir die Höfe sonst nicht bezahlen können. Ich sage aber gleich dazu: Ich verstehe jede Familie, für die das viel ist.",
                },
                { speaker: "Moderatorin", text: "Frau Pantel, Sie sind dagegen." },
                {
                  speaker: "Frau Pantel",
                  text: "Ich bin nicht gegen gutes Essen. Ich bin gegen eine Erhöhung ohne Ausgleich. An unserer alten Schule sind nach fünfzig Cent acht Kinder aus der Mensa raus. Die essen jetzt nichts.",
                },
                { speaker: "Frau Kirchhoff", text: "Das Argument nehme ich ernst. Es spricht nur nicht gegen den Preis, sondern für einen Zuschuss." },
                {
                  speaker: "Frau Pantel",
                  text: "Einen Zuschuss, den es nicht gibt. Solange er nicht beschlossen ist, ist er kein Argument, sondern eine Hoffnung.",
                },
                { speaker: "Moderatorin", text: "Herr Wolfram, Sie haben lange in Großküchen gearbeitet." },
                {
                  speaker: "Herr Wolfram",
                  text: "Mich stört an der Debatte etwas anderes. Wir reden über fünfzig Cent Einkauf und nicht über die zwanzig Portionen, die täglich in die Tonne gehen. Da liegt viel mehr Geld.",
                },
                { speaker: "Frau Kirchhoff", text: "Da haben Sie recht, und wir haben genau dort angefangen. Ohne das Meldesystem hätten wir die Umstellung gar nicht geschafft." },
                {
                  speaker: "Frau Pantel",
                  text: "Wenn die Einsparung so groß ist, warum braucht es dann die fünfzig Cent?",
                },
                {
                  speaker: "Frau Kirchhoff",
                  text: "Weil sie einmalig war. Die Tonne ist jetzt leer, das spart kein zweites Mal. Der teurere Einkauf läuft jedes Jahr weiter.",
                },
                { speaker: "Moderatorin", text: "Können Sie sich auf etwas einigen?" },
                {
                  speaker: "Frau Pantel",
                  text: "Auf eine Reihenfolge: erst den Zuschuss beschließen, dann den Preis erhöhen. Nicht umgekehrt.",
                },
                {
                  speaker: "Herr Wolfram",
                  text: "Damit könnte ich leben. Ich möchte nur, dass die Abfallzahlen jedes Jahr auf den Tisch kommen. Sonst schaut in zwei Jahren wieder niemand hin.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-11-h4-23",
              no: 23,
              ref: "d1",
              text: "Womit begründet Frau Kirchhoff die Erhöhung?",
              options: [
                "Mit gestiegenen Personalkosten.",
                "Mit der Bezahlung der Höfe.",
                "Mit einer Vorgabe der Stadt.",
              ],
              answer: 1,
              explain:
                "\"Weil wir die Höfe sonst nicht bezahlen können\" — ve hemen ardından ailelere anlayış gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-24",
              no: 24,
              ref: "d1",
              text: "Wogegen ist Frau Pantel genau?",
              options: [
                "Gegen einen Aufschlag ohne Hilfe für Familien.",
                "Gegen regionale Produkte.",
                "Gegen die Mensa insgesamt.",
              ],
              answer: 0,
              explain:
                "Konumunu kendisi sınırlıyor: \"Ich bin nicht gegen gutes Essen. Ich bin gegen eine Erhöhung ohne Ausgleich.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie reagiert Frau Kirchhoff auf dieses Argument?",
              options: [
                "Sie hält es für übertrieben.",
                "Sie überhört es.",
                "Sie nimmt es an und deutet es um.",
              ],
              answer: 2,
              explain:
                "Önce kabul, sonra yön değişikliği: \"Es spricht nur nicht gegen den Preis, sondern für einen Zuschuss.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-26",
              no: 26,
              ref: "d1",
              text: "Was hält Frau Pantel dem entgegen?",
              options: [
                "Der Zuschuss ist zu niedrig.",
                "Der Zuschuss ist noch nicht beschlossen.",
                "Der Zuschuss hilft den falschen Familien.",
              ],
              answer: 1,
              explain:
                "\"Solange er nicht beschlossen ist, ist er kein Argument, sondern eine Hoffnung.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-27",
              no: 27,
              ref: "d1",
              text: "Was stört Herrn Wolfram an der Debatte?",
              options: [
                "Sie wird zu emotional geführt.",
                "Sie geht an den Eltern vorbei.",
                "Sie übersieht den Abfall.",
              ],
              answer: 2,
              explain:
                "Elli kuruş yerine günlük yirmi porsiyona bakılmasını istiyor: \"Da liegt viel mehr Geld.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-28",
              no: 28,
              ref: "d1",
              text: "Warum reicht die Einsparung nach Frau Kirchhoff nicht?",
              options: [
                "Sie war einmalig.",
                "Sie war kleiner als erwartet.",
                "Sie kommt einer anderen Stelle zugute.",
              ],
              answer: 0,
              explain:
                "\"Die Tonne ist jetzt leer, das spart kein zweites Mal\" — pahalı alım ise her yıl sürüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-29",
              no: 29,
              ref: "d1",
              text: "Worauf will sich Frau Pantel einigen?",
              options: [
                "Auf eine kleinere Erhöhung.",
                "Auf eine Reihenfolge.",
                "Auf eine Abstimmung der Eltern.",
              ],
              answer: 1,
              explain:
                "\"erst den Zuschuss beschließen, dann den Preis erhöhen. Nicht umgekehrt.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-11-h4-30",
              no: 30,
              ref: "d1",
              text: "Welche Bedingung nennt Herr Wolfram?",
              options: [
                "Eine Obergrenze für den Preis.",
                "Eine Umfrage unter den Kindern.",
                "Jährliche Abfallzahlen.",
              ],
              answer: 2,
              explain:
                "Gerekçesiyle: \"Sonst schaut in zwei Jahren wieder niemand hin.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine Nachricht, einen Forumsbeitrag und eine kurze offizielle Mitteilung.",
      instructionTr: "Bu bölümde üç görev var: bir ileti, bir forum yorumu ve kısa resmî bir bildirim.",
      tasks: [
        {
          id: "de-b1-11-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Eine Freundin hat Sie gefragt, ob sie bei der Solidarischen Landwirtschaft mitmachen soll. Schreiben Sie ihr (circa 80 Wörter). Erzählen Sie von Ihren Erfahrungen, nennen Sie einen Vorteil und einen Nachteil und geben Sie einen Rat.",
          promptTr:
            "Bir arkadaşın dayanışma tarımına katılıp katılmaması gerektiğini sordu. Ona yaz (yaklaşık 80 kelime). Deneyimlerini anlat, bir iyi bir de zor yanını söyle ve bir tavsiye ver.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "von eigenen Erfahrungen erzählen", tr: "Kendi deneyimini anlatmak" },
              { de: "einen Vorteil nennen", tr: "Bir iyi yanını söylemek" },
              { de: "einen Nachteil nennen", tr: "Bir zor yanını söylemek" },
              { de: "einen Rat geben", tr: "Bir tavsiye vermek" },
            ],
            sample: `Liebe Nadia,

ich bin seit einem Jahr dabei und würde es wieder machen, allerdings nicht ohne Warnung.

Gut ist, dass das Gemüse frisch ist und ich weiß, von welchem Hof es kommt. Ich koche seitdem auch anders, weil ich nehmen muss, was in der Kiste liegt.

Schwierig ist genau das: Ich kann nicht bestellen. In schlechten Wochen ist die Kiste klein, und der Beitrag bleibt gleich.

Wenn du gern planst, wäre ein Lieferdienst besser. Wenn dich Überraschungen nicht stören, probier es ein Jahr.

Liebe Grüße
Selma`,
            criteria: [
              "Dört içerik noktasının hepsi var mı?",
              "Deneyim somut mu (süre, ne değişti)?",
              "İyi ve zor yan gerçekten ayrı iki şey mi?",
              "Tavsiye koşullu mu, yani arkadaşın durumuna göre mi veriliyor?",
              "Yaklaşık 80 kelime var mı ve arkadaşa yazıldığı için `du` kullanıldı mı?",
              "Konjunktiv II ya da ilgi cümlesi kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-11-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Forum wird gefragt: \"Wer ist für Lebensmittelabfall verantwortlich — die Läden oder wir selbst?\" Schreiben Sie einen Beitrag (circa 80 Wörter). Nennen Sie Ihre Meinung, begründen Sie sie mit einem Beispiel und gehen Sie auf eine andere Meinung ein.",
          promptTr:
            "Bir forumda soruluyor: \"Gıda israfından kim sorumlu — mağazalar mı yoksa biz mi?\" Bir yorum yaz (yaklaşık 80 kelime). Görüşünü söyle, bir örnekle gerekçelendir ve başka bir görüşe değin.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "eine Meinung nennen", tr: "Bir görüş söylemek" },
              { de: "mit einem Beispiel begründen", tr: "Bir örnekle gerekçelendirmek" },
              { de: "auf eine andere Meinung eingehen", tr: "Başka bir görüşe değinmek" },
              { de: "einen Schluss ziehen", tr: "Bir sonuca bağlamak" },
            ],
            sample: `Ich finde, dass beide Seiten verantwortlich sind, die Haushalte aber mehr, als sie glauben.

Bei uns ist rund die Hälfte des Gemüses schlecht geworden, bevor ich angefangen habe, vor dem Einkauf in den Kühlschrank zu schauen. Seitdem werfe ich fast nichts mehr weg, und ich habe nichts anderes geändert.

Viele sagen, der Handel bestelle einfach zu viel. Das stimmt für die Regale am Abend, erklärt aber nicht, warum bei mir zu Hause etwas verdirbt.

Ich würde deshalb bei mir selbst anfangen und trotzdem strengere Regeln für Läden unterstützen.`,
            criteria: [
              "Dört içerik noktasının hepsi var mı?",
              "Görüş açıkça söylendi mi?",
              "Örnek gerçekten savı destekliyor mu?",
              "Karşı görüş güçlü hâliyle mi alındı?",
              "Yaklaşık 80 kelime var mı ve forum diline uygun mu?",
              "Konjunktiv II ya da ileri bir bağlaç kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-11-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie können Ihre Kiste am Freitag nicht abholen. Schreiben Sie an den Hof Wiesengrund (circa 40 Wörter). Erklären Sie den Grund und fragen Sie nach einer Lösung.",
          promptTr:
            "Cuma günü kutunu alamıyorsun. Wiesengrund çiftliğine yaz (yaklaşık 40 kelime). Gerekçeni açıkla ve bir çözüm sor.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "den Grund nennen", tr: "Gerekçeyi söylemek" },
              { de: "nach einer Lösung fragen", tr: "Bir çözüm sormak" },
              { de: "Anrede und Gruß", tr: "Hitap ve veda" },
            ],
            sample: `Sehr geehrte Damen und Herren,

am Freitag bin ich auf einer Fortbildung in Kassel und komme erst um 21 Uhr zurück. Die Abholzeit schaffe ich nicht.

Könnte meine Nachbarin die Kiste für mich abholen? Falls das nicht geht, sagen Sie mir bitte Bescheid.

Mit freundlichen Grüßen
Ruth Kirchhoff`,
            criteria: [
              "Gerekçe somut mu (nerede, ne zaman)?",
              "Sorulan çözüm uygulanabilir mi?",
              "Hitap ve veda var mı ve kuruma uygun mu?",
              "Yaklaşık 40 kelime var mı ve `Sie` kullanıldı mı?",
              "Konjunktiv II ile kibar bir soru kuruldu mu?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam etwas planen, einen kurzen Vortrag halten und darauf reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte plan yapmak, kısa bir sunum yapmak ve ona karşılık vermek.",
      tasks: [
        {
          id: "de-b1-11-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam ein Schulfest mit Essen. Sprechen Sie über: Datum — Gerichte — Einkauf — Helfer — Preis.",
          promptTr:
            "Birlikte yemekli bir okul şenliği planlayın. Şunları konuşun: tarih — yemekler — alışveriş — yardımcılar — fiyat.",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen das Schulfest. Ich schlage den letzten Freitag im Juni vor. Was meinen Sie?",
              tr: "Okul şenliğini planlıyoruz. Ben haziranın son cumasını öneriyorum. Sen ne diyorsun?",
            },
            { who: "you", hint: "Öneriye karşılık ver ve kendi tarihini gerekçelendir.", expect: "bir öneriye karşılık verip kendi önerisini gerekçelendirmek", seconds: 40 },
            {
              who: "partner",
              de: "Beim Essen bin ich unsicher. Kochen wir selbst oder bestellen wir? Selbst kochen ist billiger, aber wir brauchen Leute.",
              tr: "Yemekte kararsızım. Kendimiz mi pişirelim, sipariş mi verelim? Kendimiz pişirmek ucuz ama insana ihtiyacımız var.",
            },
            { who: "you", hint: "Bir seçim yap ve nasıl çözüleceğini söyle.", expect: "gerekçeli bir seçim yapıp uygulamasını anlatmak", seconds: 40 },
            {
              who: "partner",
              de: "Und wo kaufen wir ein? Der Hofladen ist teurer als der Supermarkt.",
              tr: "Nereden alışveriş yapacağız? Çiftlik dükkânı süpermarketten pahalı.",
            },
            { who: "you", hint: "Bir yer seç ve fiyat farkını tart.", expect: "bir seçim yapıp fiyat argümanını tartmak", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, was wir entschieden haben.",
              tr: "Peki. Neye karar verdiğimizi özetler misin?",
            },
            { who: "you", hint: "Kararları kısaca özetle.", expect: "varılan kararları özetlemek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneri yapmak ve gerekçelendirmek" },
              { de: "auf Vorschläge reagieren", tr: "Önerilere karşılık vermek" },
              { de: "eine Entscheidung treffen", tr: "Bir karara varmak" },
              { de: "zusammenfassen", tr: "Özetlemek" },
            ],
            sample:
              "Der letzte Freitag im Juni ist schwierig, weil in der Woche die Zeugnisse kommen. Ich würde den ersten Freitag im Juli nehmen. Beim Essen bin ich fürs Selberkochen, aber nur mit einem Plan: zwei Gerichte statt fünf, und jede Klasse stellt zwei Eltern. Beim Einkauf würde ich es teilen — Gemüse vom Hofladen, weil der Unterschied dort klein ist, Getränke aus dem Supermarkt. Zusammengefasst: erster Freitag im Juli, zwei Gerichte, selbst gekocht, Einkauf geteilt, und der Preis bleibt bei drei Euro.",
            criteria: [
              "Beş noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi?",
              "Karşı tarafın önerisine gerçekten karşılık verildi mi?",
              "Özet eksiksiz mi?",
              "B1 yapıları (Konjunktiv II, weil/obwohl) kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-11-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa drei Minuten zum Thema \"Woher unser Essen kommt\". Gliedern Sie: Einstieg — Situation in Ihrem Herkunftsland — Situation hier — Vorteile — Nachteile — eigene Meinung — Abschluss.",
          promptTr:
            "\"Yemeğimiz nereden geliyor?\" konusunda yaklaşık üç dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — buradaki durum — iyi yanları — zor yanları — kendi görüşün — kapanış.",
          prepSeconds: 60,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve bölümleme" },
              { de: "Herkunftsland und hier vergleichen", tr: "Kendi ülkeni ve burayı karşılaştırmak" },
              { de: "Vorteile und Nachteile", tr: "İyi ve zor yanlar" },
              { de: "eigene Meinung mit Begründung", tr: "Gerekçeli kendi görüşün" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute darüber sprechen, woher unser Essen kommt. Zuerst erzähle ich von meiner Heimat, dann von hier, danach nenne ich Vorteile und Nachteile und sage am Ende meine Meinung. In Marokko hat meine Familie fast alles auf dem Markt gekauft, und meine Mutter kannte die Händler mit Namen. Hier kaufe ich im Supermarkt, und ich weiß bei den meisten Sachen nicht, aus welchem Land sie kommen. Ein Vorteil hier ist die Auswahl: Es gibt im Januar alles, und die Preise sind stabil. Ein Nachteil ist, dass die Wege lang sind und man den Weg nicht sieht. Ich finde, dass man nicht alles regional kaufen muss. Aber bei Gemüse würde ich es machen, weil der Unterschied dort klein ist und man den Hof besuchen kann. Zusammenfassend: Ich schaue seit einem Jahr auf die Herkunft, und es hat mich weniger gekostet, als ich gedacht habe.",
            criteria: [
              "Yedi bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülke ile buradaki durum somut olarak karşılaştırıldı mı?",
              "En az bir iyi ve bir zor yan örnekle desteklendi mi?",
              "Görüş gerekçeli mi?",
              "Üç dakika boyunca yapı korunabildi mi?",
              "B1 yapıları (Konjunktiv II, ilgi cümlesi, ileri bağlaçlar) kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-11-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf Fragen zu Ihrem Vortrag und stellen Sie selbst eine Frage.",
          promptTr:
            "Sunumunla ilgili sorulara karşılık ver ve kendin de bir soru sor.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Danke für den Vortrag. Sie sagen, bei Gemüse lohnt sich regional. Woran merken Sie das?",
              tr: "Sunum için teşekkürler. Sebzede bölgeselin işe yaradığını söylüyorsun. Bunu nereden anlıyorsun?",
            },
            { who: "you", hint: "Somut bir gözlem ya da rakam ver.", expect: "iddiayı somut bir gözlemle desteklemek", seconds: 40 },
            {
              who: "partner",
              de: "Ein Einwand: Regionales Gemüse ist im Winter kaum zu bekommen. Was machen Sie dann?",
              tr: "Bir itiraz: Kışın bölgesel sebze neredeyse bulunmuyor. O zaman ne yapıyorsun?",
            },
            { who: "you", hint: "İtirazı kabul et ve nasıl çözdüğünü söyle.", expect: "bir itirazı kabul edip somut bir çözüm anlatmak", seconds: 40 },
            {
              who: "partner",
              de: "Jetzt sind Sie dran: Stellen Sie mir eine Frage zu meinem Einkauf.",
              tr: "Şimdi sıra sende: Bana alışverişimle ilgili bir soru sor.",
            },
            { who: "you", hint: "Açık uçlu bir soru kur.", expect: "açık uçlu ve konuya bağlı bir soru kurmak", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "auf Nachfragen antworten", tr: "Sorulara karşılık vermek" },
              { de: "einen Einwand aufnehmen", tr: "Bir itirazı ele almak" },
              { de: "selbst eine Frage stellen", tr: "Kendin bir soru sormak" },
            ],
            sample:
              "Ich habe ein halbes Jahr die Preise aufgeschrieben. Bei Kartoffeln und Zwiebeln war der Hofladen sogar günstiger, bei Paprika deutlich teurer. Ihr Einwand stimmt: Von Dezember bis März gibt es fast nur Kohl und Wurzelgemüse. Ich kaufe dann normal im Supermarkt und friere im Herbst ein, was übrig ist. Darf ich fragen: Worauf achten Sie beim Einkauf zuerst — auf den Preis oder auf die Herkunft?",
            criteria: [
              "Sorular gerçekten cevaplandı mı?",
              "İddia somut bir gözlemle desteklendi mi?",
              "İtiraz kabul edilip yanıtlandı mı?",
              "Sorulan soru açık uçlu ve konuya bağlı mı?",
            ],
          },
        },
      ],
    },
  ],
};
