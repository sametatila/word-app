import type { MockPaper } from "../types";

/**
 * B1 · Deneme 2 — "Stadt und Umwelt".
 *
 * Yapı B1 · Deneme 1 ile birebir aynı (bkz. `b1-01.ts`). Değişen içerik alanı:
 * birinci kâğıt öğrenme ve çalışma, bu kâğıt kent yaşamı ve çevre.
 *
 * TEIL 4 bu kâğıtta bir adım daha zor: yorumların ikisi kendi tarafını sona
 * saklıyor, biri de karşı tarafın en güçlü savını önce kabul ediyor. Bu
 * bilinçli — B1'de ölçülmesi gereken şey, metnin ilk cümlesine değil vardığı
 * SONUCA bakabilmek.
 *
 * Dinleme Teil 3'te iki komşu bir şeyi yanlış hatırlıyor ve sonra düzeltiyor.
 * Maddelerden ikisi bu düzeltmenin üstünde duruyor: bir konuşmada söylenen ilk
 * sayı çoğu zaman doğru olan değildir.
 */
export const B1_02: MockPaper = {
  id: "de-b1-02",
  course: "de",
  level: "B1",
  no: 2,
  theme: "Stadt und Umwelt",
  themeTr: "Şehir ve çevre",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Blogtext, Zeitungstexte, Anzeigen, Leserkommentare und eine Hausordnung. Sie können mit jeder Aufgabe beginnen.",
      instructionTr:
        "Bu bölümde beş görev var: bir blog yazısı, gazete metinleri, ilanlar, okur yorumları ve bir apartman yönetmeliği okuyacaksın. İstediğin görevle başlayabilirsin.",
      tasks: [
        {
          id: "de-b1-02-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Metni ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Ein Jahr ohne Auto — in einer Kleinstadt",
              body: `Als unser alter Kombi im Januar den Dienst quittierte, standen wir vor einer Frage: neues Auto oder keins? Wir wohnen in einer Stadt mit siebzehntausend Einwohnern. Alle sagten uns, ohne Auto gehe das hier nicht.

Wir haben es trotzdem probiert, zunächst für sechs Monate. Aus den sechs Monaten ist ein Jahr geworden.

Der Anfang war unangenehm. Der Weg zur Arbeit dauert mit dem Rad achtzehn Minuten statt neun, und im Februar ist das kein Vergnügen. Was mich mehr gestört hat, waren allerdings die Blicke. In einer Kleinstadt fällt auf, wer keinen Wagen hat.

Praktisch gelöst haben wir es mit drei Dingen. Erstens ein Lastenrad, das wir gebraucht gekauft haben. Zweitens eine Mitgliedschaft beim Carsharing im Nachbarort — sechs Fahrten im Jahr, mehr brauchten wir nicht. Drittens der Zug, der immerhin jede Stunde fährt.

Gerechnet haben wir natürlich auch. Ohne Versicherung, Steuer, Reparaturen und Sprit sparen wir etwa dreitausendvierhundert Euro im Jahr. Das Lastenrad hat sich nach fünf Monaten bezahlt gemacht.

Ehrlich bleiben will ich trotzdem: Zweimal war es wirklich schwierig. Einmal, als unsere Tochter nachts hohes Fieber hatte, und einmal beim Umzug meiner Mutter. Beide Male haben uns Nachbarn geholfen. Wer das nicht hat, für den sieht die Rechnung anders aus.`,
              gloss: [
                { de: "den Dienst quittieren", tr: "çalışmayı bırakmak, pes etmek (araç)", en: "to give up the ghost" },
                { de: "das Lastenrad", tr: "yük bisikleti", en: "cargo bike" },
                { de: "der Sprit", tr: "yakıt (günlük dil)", en: "fuel (colloquial)" },
                { de: "sich bezahlt machen", tr: "masrafını çıkarmak", en: "to pay for itself" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-02-l1-1",
              no: 1,
              text: "Die Familie wollte anfangs nur ein halbes Jahr ohne Auto leben.",
              answer: true,
              explain:
                "\"zunächst für sechs Monate\" — deneme altı ay için planlanmış, sonra bir yıla uzamış. `zunächst` başlangıçtaki niyeti gösteriyor.",
            },
            {
              kind: "bool",
              id: "de-b1-02-l1-2",
              no: 2,
              text: "Der Arbeitsweg dauert mit dem Rad neun Minuten.",
              answer: false,
              explain:
                "Bisikletle 18 dakika, arabayla 9. Metin iki süreyi \"statt\" ile karşılaştırıyor; ilk duyulan sayıya atlamamak gerekiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-02-l1-3",
              no: 3,
              text: "Am unangenehmsten fand der Autor die Reaktionen der anderen.",
              answer: true,
              explain:
                "Soğuk havayı anlatıp \"Was mich mehr gestört hat, waren allerdings die Blicke\" diyor — karşılaştırma açıkça bakışları öne koyuyor.",
            },
            {
              kind: "bool",
              id: "de-b1-02-l1-4",
              no: 4,
              text: "Das Lastenrad war neu.",
              answer: false,
              explain: "\"das wir gebraucht gekauft haben\" — ikinci el alınmış. Bu, beş ayda masrafını çıkarmasının da nedeni.",
            },
            {
              kind: "bool",
              id: "de-b1-02-l1-5",
              no: 5,
              text: "Die Familie nutzt das Carsharing fast jede Woche.",
              answer: false,
              explain:
                "\"sechs Fahrten im Jahr, mehr brauchten wir nicht\" — yılda altı kez, yani ayda birden bile az.",
            },
            {
              kind: "bool",
              id: "de-b1-02-l1-6",
              no: 6,
              text: "Der Autor sagt, dass sein Weg nicht für alle funktioniert.",
              answer: true,
              explain:
                "Son cümle bunu açıkça söylüyor: komşu yardımı olmayan biri için \"sieht die Rechnung anders aus\". Metin kendi çözümünü genellemiyor.",
            },
          ],
        },
        {
          id: "de-b1-02-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 7 bis 12. Wählen Sie: a, b oder c.",
          promptTr: "İki metni ve 7–12. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Warum die Innenstädte leerer werden",
              body: `In mittelgroßen Städten steht inzwischen jedes zehnte Ladenlokal leer. Die naheliegende Erklärung lautet: Der Onlinehandel ist schuld. So einfach ist es nach Ansicht mehrerer Studien jedoch nicht.

Untersuchungen aus dem Ruhrgebiet zeigen, dass der Leerstand dort am größten ist, wo die Mieten in den Jahren davor am stärksten gestiegen sind. Wo die Mieten stabil blieben, halten sich auch kleine Geschäfte.

Hinzu kommt ein Wandel, den viele Städte unterschätzt haben. Menschen kommen heute seltener in die Innenstadt, um etwas zu kaufen, und häufiger, um Zeit zu verbringen. Cafés, Bibliotheken und Plätze zum Sitzen ziehen mehr Besucher an als eine weitere Modekette.

Einige Kommunen haben darauf reagiert. In Herten wurden leere Läden für ein Jahr mietfrei an Vereine und Werkstätten vergeben. Von zwölf Räumen sind neun bis heute belegt, sieben davon zahlen inzwischen Miete.

Fachleute warnen allerdings davor, das Modell zu überschätzen. Es hilft dort, wo noch Leben in der Straße ist. In einer Straße mit dreißig leeren Läden bringt auch ein kostenloser Raum niemanden zurück.`,
              gloss: [
                { de: "der Leerstand", tr: "boş dükkân, boşluk", en: "vacancy" },
                { de: "der Wandel", tr: "değişim", en: "change, shift" },
                { de: "die Kommune", tr: "belediye", en: "municipality" },
                { de: "belegt", tr: "dolu, kullanımda", en: "occupied" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Strom vom eigenen Balkon",
              body: `Kleine Solaranlagen für den Balkon sind zum meistverkauften Produkt vieler Baumärkte geworden. Zwei Module, ein Kabel, eine Steckdose — mehr braucht es nicht.

Der Grund für den Boom ist weniger die Umwelt als der Preis. Ein Gerät kostet inzwischen zwischen dreihundert und sechshundert Euro und liefert im Jahr Strom im Wert von etwa hundertzwanzig Euro. Nach vier bis fünf Jahren ist die Anlage bezahlt, danach spart sie Geld.

Lange war der bürokratische Aufwand das größere Hindernis. Anmeldung beim Netzbetreiber, Zustimmung der Vermieterin, ein bestimmter Zähler: Viele haben schon vorher aufgegeben. Ein Teil dieser Regeln ist gefallen, andere gelten weiter.

Wichtig bleibt die Frage nach dem richtigen Ort. Ein Balkon nach Norden bringt kaum etwas, ein verschatteter Balkon ebenfalls nicht. Wer unsicher ist, sollte einen Tag lang notieren, wann dort tatsächlich Sonne liegt.

Und noch etwas übersehen viele: Der Strom nützt nur, wenn er auch verbraucht wird. Wer tagsüber nie zu Hause ist und kein Gerät laufen lässt, schickt den Strom kostenlos ins Netz.`,
              gloss: [
                { de: "das Modul", tr: "panel", en: "module, panel" },
                { de: "der Aufwand", tr: "zahmet, iş yükü", en: "effort" },
                { de: "der Netzbetreiber", tr: "şebeke işletmecisi", en: "grid operator" },
                { de: "verschattet", tr: "gölgede kalan", en: "shaded" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-02-l2-7",
              no: 7,
              ref: "t2",
              text: "Was sagen die Studien über den Leerstand?",
              options: [
                "Er hängt ausschließlich mit dem Onlinehandel zusammen und lässt sich kaum beeinflussen.",
                "Er entsteht dort, wo die Innenstädte zu klein geplant wurden.",
                "Er ist dort am größten, wo die Mieten stark gestiegen sind.",
              ],
              answer: 2,
              explain:
                "Ruhr bölgesi araştırması kirayı öne çıkarıyor: kiraların en çok arttığı yerde boşluk en büyük. Metin online ticareti \"naheliegende Erklärung\" diye anıp reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l2-8",
              no: 8,
              ref: "t2",
              text: "Wie hat sich das Verhalten der Besucher verändert?",
              options: [
                "Der Aufenthalt ist wichtiger geworden als der Einkauf.",
                "Sie kommen häufiger, aber bleiben kürzer.",
                "Sie kommen nur noch am Wochenende in die Stadt.",
              ],
              answer: 0,
              explain:
                "\"seltener in die Innenstadt, um etwas zu kaufen, und häufiger, um Zeit zu verbringen\" — amaç değişmiş. Kalış süresi ve haftanın günü metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l2-9",
              no: 9,
              ref: "t2",
              text: "Was schreibt der Text über das Modell in Herten?",
              options: [
                "Alle vergebenen Räume stehen inzwischen wieder leer.",
                "Die Mehrheit der Räume ist weiter belegt.",
                "Das Modell wurde nach einem Jahr wieder abgeschafft.",
              ],
              answer: 1,
              explain:
                "«Von zwölf Räumen sind neun bis heute belegt, sieben davon zahlen inzwischen Miete» — çoğunluk ayakta ve model kaldırılmamış.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l2-10",
              no: 10,
              ref: "t3",
              text: "Warum kaufen viele Menschen eine Balkonanlage?",
              options: [
                "Weil die Anlagen inzwischen fast wartungsfrei geworden sind.",
                "Weil der Staat jede Anlage großzügig bezuschusst.",
                "Weil sie sich nach wenigen Jahren rechnet.",
              ],
              answer: 2,
              explain:
                "\"Der Grund für den Boom ist weniger die Umwelt als der Preis\": dört-beş yılda kendini amorti ediyor. Destek ve bakım metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l2-11",
              no: 11,
              ref: "t3",
              text: "Was hat sich bei den Vorschriften geändert?",
              options: [
                "Ein Teil der Regeln wurde abgeschafft.",
                "Alle Genehmigungen sind vollständig entfallen und werden nicht mehr geprüft.",
                "Die Anmeldung ist neuerdings vorgeschrieben.",
              ],
              answer: 0,
              explain:
                "\"Ein Teil dieser Regeln ist gefallen, andere gelten weiter\" — bir bölümü kalktı, hepsi değil. `alle` seçeneği metni abartıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l2-12",
              no: 12,
              ref: "t3",
              text: "Warum lohnt sich eine Anlage für manche Haushalte kaum?",
              options: [
                "Weil ihr Balkon nach Süden zeigt und im Sommer zu heiß wird.",
                "Weil sie den Strom tagsüber nicht verbrauchen.",
                "Weil sie die Anlage nicht selbst montieren dürfen.",
              ],
              answer: 1,
              explain:
                "Son paragraf: gündüz evde olmayan ve cihaz çalıştırmayan kişi elektriği bedava şebekeye veriyor. Güneye bakan balkon iyidir, kötü olan kuzey.",
            },
          ],
        },
        {
          id: "de-b1-02-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot in ihrer Stadt. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler şehirlerinde bir olanak arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Repair-Café im Bürgerhaus",
              body: "Jeden zweiten Samstag von 14 bis 18 Uhr. Ehrenamtliche helfen beim Reparieren von Kleingeräten und Fahrrädern. Ersatzteile zahlen Sie selbst, die Hilfe ist kostenlos.",
            },
            {
              key: "b",
              label: "Gemeinschaftsgarten Alte Gärtnerei",
              body: "Wir vergeben zehn Beete an Menschen ohne eigenen Garten. Beitrag 40 Euro im Jahr, Werkzeug ist vorhanden. Voraussetzung: mindestens ein Arbeitseinsatz pro Monat.",
            },
            {
              key: "c",
              label: "Lastenrad zum Ausleihen",
              body: "Kostenlos für alle, die in der Stadt gemeldet sind. Buchung online, Abholung an der Stadtbibliothek. Höchstens zwei Tage am Stück, Kaution 50 Euro.",
            },
            {
              key: "d",
              label: "Energieberatung für Mietwohnungen",
              body: "Kostenloser Hausbesuch durch eine unabhängige Beraterin. Wir prüfen Heizung, Fenster und Stromverbrauch und rechnen aus, was sich lohnt. Termine ab drei Wochen Wartezeit.",
            },
            {
              key: "e",
              label: "Wohnungstausch für Ältere",
              body: "Sie wohnen allein in einer großen Wohnung und möchten kleiner wohnen? Wir vermitteln Tauschpartner im Stadtgebiet und übernehmen die Umzugskosten bis 1.500 Euro.",
            },
            {
              key: "f",
              label: "Stadtführung zur Geschichte der Werften",
              body: "Sonntags um 11 Uhr, Dauer zwei Stunden. Erwachsene 12 Euro, ermäßigt 8 Euro. Anmeldung nicht nötig, Treffpunkt am Hafentor.",
            },
            {
              key: "g",
              label: "Kleiderkammer im Nordviertel",
              body: "Ausgabe von gebrauchter Kleidung dienstags und freitags, 10 bis 13 Uhr. Bitte bringen Sie einen Nachweis über Ihr Einkommen mit.",
            },
            {
              key: "h",
              label: "Nachbarschaftshilfe Einkaufen",
              body: "Freiwillige erledigen den Wocheneinkauf für Menschen, die nicht mehr gut zu Fuß sind. Anruf genügt, kein Beitrag. Wir suchen auch neue Helferinnen und Helfer.",
            },
            {
              key: "i",
              label: "Balkonmodule — Beratung und Verkauf",
              body: "Wir zeigen Ihnen im Laden, welche Anlage auf Ihren Balkon passt, und übernehmen die Anmeldung beim Netzbetreiber. Geräte ab 349 Euro.",
            },
            {
              key: "j",
              label: "Schwimmkurs für Erwachsene",
              body: "Zehn Termine mittwochs abends im Hallenbad Ost. Für Anfängerinnen und Anfänger ohne Vorkenntnisse. Kursgebühr 95 Euro.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-02-l3-13",
              no: 13,
              text: "Herr Weiss hat einen alten Toaster, den er nicht wegwerfen will. Geld ausgeben möchte er dafür nicht.",
              answer: "a",
              explain:
                "(a) küçük cihazları onarmaya yardım ediyor ve yardım ücretsiz; yalnız yedek parça ödeniyor. Toaster açıkça \"Kleingeräte\" kapsamında.",
            },
            {
              kind: "match",
              id: "de-b1-02-l3-14",
              no: 14,
              text: "Frau Petrova wohnt im vierten Stock ohne Balkon und möchte trotzdem Gemüse anbauen. Sie kann samstags mithelfen.",
              answer: "b",
              explain:
                "(b) bahçesi olmayanlara parsel veriyor; koşulu ayda bir çalışma günü ve o bunu karşılıyor. Bahçe işi için alet de mevcut.",
            },
            {
              kind: "match",
              id: "de-b1-02-l3-15",
              no: 15,
              text: "Familie Sonner muss einen Schrank quer durch die Stadt transportieren. Ein Auto haben sie nicht.",
              answer: "c",
              explain:
                "(c) yük bisikletini şehirde kayıtlı herkese ücretsiz veriyor, iki güne kadar. Tek seferlik bir taşıma için tam uygun.",
            },
            {
              kind: "match",
              id: "de-b1-02-l3-16",
              no: 16,
              text: "Herr Achterberg zahlt sehr hohe Heizkosten und möchte wissen, was sich in seiner Mietwohnung ändern lässt.",
              answer: "d",
              explain:
                "(d) kiralık daireler için ücretsiz danışmanlık; ısıtma, pencere ve elektriği yerinde inceliyor. (i) yalnız balkon panelleri satıyor, ısıtmaya bakmıyor.",
            },
            {
              kind: "match",
              id: "de-b1-02-l3-17",
              no: 17,
              text: "Frau Lindqvist (79) lebt allein in einer Vier-Zimmer-Wohnung. Sie möchte umziehen, hat aber Angst vor den Kosten.",
              answer: "e",
              explain:
                "(e) tam bu durum için: küçük eve geçmek isteyen yaşlılara takas partneri buluyor ve taşınma masrafını 1.500 euroya kadar üstleniyor.",
            },
            {
              kind: "match",
              id: "de-b1-02-l3-18",
              no: 18,
              text: "Herr Klose kann nach seiner Operation nicht mehr weit laufen und braucht Hilfe beim Einkaufen.",
              answer: "h",
              explain:
                "(h) uzun yürüyemeyenler için haftalık alışverişi yapıyor, üstelik ücretsiz ve tek bir telefonla.",
            },
            {
              kind: "match",
              id: "de-b1-02-l3-19",
              no: 19,
              text: "Frau Tan möchte eine kleine Solaranlage, traut sich aber die Anmeldung beim Netzbetreiber nicht zu.",
              answer: "i",
              explain:
                "(i) hem uygun paneli seçiyor hem de \"übernehmen die Anmeldung beim Netzbetreiber\" — çekindiği işi devralıyor.",
            },
          ],
        },
        {
          id: "de-b1-02-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Soll die Innenstadt autofrei werden?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Şehir merkezi araç trafiğine kapatılmalı mı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Autofreie Innenstadt — Ihre Meinung",
              body: `[20] Ricarda M.: Ich habe zwanzig Jahre an der Marktstraße gewohnt und kenne den Lärm. Trotzdem: Wer die Autos aussperrt, ohne vorher den Bus zu verbessern, sperrt vor allem die Leute aus den Außenbezirken aus. Erst der Takt, dann die Sperrung. In dieser Reihenfolge, sonst nicht.

[21] Ben Hofer: Klar, die ersten Monate werden chaotisch, das war in jeder Stadt so. Aber ich war im Sommer in Gent, und niemand dort möchte zurück. Kinder auf der Straße, Cafés bis zum Bordstein, kein Gehupe. Ich verstehe nicht, worauf wir noch warten.

[22] G. Sailer: Ich betreibe seit achtzehn Jahren ein Schuhgeschäft in der Fußgängerzone. Alle behaupten, autofrei bringe mehr Kundschaft. In meiner Straße ist seit der Sperrung der letzten Querstraße genau das Gegenteil passiert: Die Älteren kommen nicht mehr.

[23] Frau Cordes: Als Ärztin sehe ich jeden Winter dieselben Atemwegserkrankungen, und ich sehe auch, in welchen Straßen die Kinder wohnen. Die Diskussion über Parkplätze finde ich fast zynisch. Eine Stadt gehört zuerst denen, die in ihr atmen.

[24] Timo Berger: Ich fahre einen Lieferwagen und beliefere zwölf Läden in der Innenstadt. Wenn ich nicht mehr in die Straßen darf, muss jemand die Kisten hundert Meter schieben — und dieser Jemand bin ich, für dasselbe Geld. Von mir aus autofrei, aber dann für alle außer Lieferverkehr. So wie es geplant ist, ist es eine Sperrung auf meinem Rücken.

[25] Ute Bahr: Die Luft wird besser, schön. Nur wird niemand darüber sprechen, dass die Mieten in genau diesen ruhigen Straßen anschließend steigen. Am Ende ist die Innenstadt sauber, leise und für die Leute, die heute dort wohnen, nicht mehr bezahlbar. Deshalb bin ich dagegen.

[26] Jan P.: Meine erste Reaktion war Ablehnung, ehrlich gesagt. Ich brauche das Auto für die Arbeit. Dann habe ich nachgerechnet, wie oft ich wirklich in die Innenstadt fahre: viermal im Jahr. Für diese vier Fahrten will ich niemandem den Platz vor der Haustür wegnehmen.`,
              gloss: [
                { de: "der Takt", tr: "sefer sıklığı", en: "service frequency" },
                { de: "aussperren", tr: "dışarıda bırakmak", en: "to shut out" },
                { de: "der Lieferverkehr", tr: "teslimat trafiği", en: "delivery traffic" },
                { de: "die Ablehnung", tr: "reddediş", en: "rejection" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-02-l4-20",
              no: 20,
              ref: "f1",
              text: "Ricarda M.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Gürültüden yakınıyor ama koşul öne sürüyor: önce otobüs seferleri, sonra kapatma — \"In dieser Reihenfolge, sonst nicht\". Bugünkü haliyle karşı.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l4-21",
              no: 21,
              ref: "f1",
              text: "Ben Hofer",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "İlk aylardaki karmaşayı kabul ediyor, sonra başka bir kentin örneğini veriyor ve \"worauf wir noch warten\" diye bitiriyor — açık destek.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l4-22",
              no: 22,
              ref: "f1",
              text: "G. Sailer",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendi caddesindeki deneyimi öne sürüyor: kapatmadan sonra yaşlı müşteriler gelmez olmuş, yani \"genau das Gegenteil\".",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l4-23",
              no: 23,
              ref: "f1",
              text: "Frau Cordes",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Park yeri tartışmasını \"zynisch\" buluyor ve kenti önce orada nefes alanlara ait sayıyor — sağlık gerekçesiyle kapatmadan yana.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l4-24",
              no: 24,
              ref: "f1",
              text: "Timo Berger",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "\"Von mir aus autofrei\" diyor ama hemen koşulu ekliyor: teslimat hariç. Planlanan biçimi \"eine Sperrung auf meinem Rücken\" diye reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l4-25",
              no: 25,
              ref: "f1",
              text: "Ute Bahr",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Havanın düzeleceğini kabul ediyor, ama kira artışını gerekçe gösterip kapanışta tarafını açıkça söylüyor: \"Deshalb bin ich dagegen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l4-26",
              no: 26,
              ref: "f1",
              text: "Jan P.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "«Meine erste Reaktion war Ablehnung» diye başlıyor, sonra hesap yapıyor: «Für diese vier Fahrten will ich niemandem den Platz vor der Haustür wegnehmen». Sonuç destek.",
            },
          ],
        },
        {
          id: "de-b1-02-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Hausordnung und die Aufgaben 27 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Apartman yönetmeliğini ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Hausordnung",
              genreTr: "Apartman yönetmeliği",
              title: "Hausordnung Lindenhof 12–16",
              body: `1. Ruhezeiten
Von 22 bis 7 Uhr sowie sonntags ganztägig ist Zimmerlautstärke einzuhalten. Bohren und Hämmern sind werktags zwischen 9 und 12 sowie 15 und 19 Uhr erlaubt.

2. Abfall
Papier, Verpackung und Restmüll werden im Hof getrennt. Glas gehört in die Container an der Ecke Lindenweg, nicht in die Tonnen. Wer falsch trennt, sorgt dafür, dass die Tonne stehen bleibt — die Kosten trägt dann das ganze Haus.

3. Treppenhaus
Fahrräder, Schuhe und Kinderwagen dürfen nicht im Treppenhaus stehen; das ist eine Auflage der Feuerwehr. Für Kinderwagen steht der Raum neben der Waschküche zur Verfügung.

4. Waschküche
Jede Wohnung trägt sich in den Plan ein. Nicht genutzte Termine bitte spätestens am Vortag streichen, damit andere sie übernehmen können.

5. Grillen
Auf den Balkonen ist Grillen mit Kohle nicht gestattet. Elektrogrills sind erlaubt. Im Hof darf an höchstens vier Terminen im Jahr gegrillt werden, nach Absprache mit der Verwaltung.

6. Schlüssel
Der Verlust eines Schlüssels ist umgehend zu melden. Die Kosten für eine neue Schließanlage trägt, wer den Verlust nicht meldet.`,
              gloss: [
                { de: "die Zimmerlautstärke", tr: "oda sesi düzeyi (komşuyu rahatsız etmeyen)", en: "moderate indoor volume" },
                { de: "die Auflage", tr: "resmî şart", en: "official requirement" },
                { de: "gestattet", tr: "izinli", en: "permitted" },
                { de: "umgehend", tr: "derhal", en: "immediately" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-02-l5-27",
              no: 27,
              ref: "o1",
              text: "Sie möchten am Samstag um 16 Uhr ein Regal an die Wand bohren. Was gilt?",
              options: [
                "Das ist verboten, weil am Wochenende gar nicht gebohrt werden darf.",
                "Das ist erlaubt.",
                "Das ist nur mit Zustimmung der Verwaltung erlaubt.",
              ],
              answer: 1,
              explain:
                "Delme işi \"werktags\" 15–19 arası serbest ve cumartesi Almanya'da iş günüdür; yasak olan pazar. Saat de aralığın içinde.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l5-28",
              no: 28,
              ref: "o1",
              text: "Was passiert, wenn jemand den Müll falsch trennt?",
              options: [
                "Die Verwaltung schreibt die Person persönlich an.",
                "Die Person zahlt eine Strafe von 50 Euro.",
                "Die Tonne wird nicht geleert und alle zahlen dafür.",
              ],
              answer: 2,
              explain:
                "\"sorgt dafür, dass die Tonne stehen bleibt — die Kosten trägt dann das ganze Haus\". Kişisel ceza ya da uyarı öngörülmüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l5-29",
              no: 29,
              ref: "o1",
              text: "Wo darf ein Kinderwagen abgestellt werden?",
              options: [
                "In dem Nebenraum der Waschküche.",
                "Im Treppenhaus, wenn er nicht im Weg steht.",
                "In der Waschküche selbst, außerhalb der Waschzeiten.",
              ],
              answer: 0,
              explain:
                "«Für Kinderwagen steht der Raum neben der Waschküche zur Verfügung». Merdivende bırakmak itfaiye şartı («eine Auflage der Feuerwehr») nedeniyle yasak.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-l5-30",
              no: 30,
              ref: "o1",
              text: "Sie haben Ihren Schlüssel verloren. Was ist richtig?",
              options: [
                "Sie zahlen in jedem Fall die neue Schließanlage.",
                "Wenn Sie den Verlust melden, tragen Sie die Kosten nicht.",
                "Sie müssen den Verlust erst nach einer Woche melden.",
              ],
              answer: 1,
              explain:
                "«Die Kosten für eine neue Schließanlage trägt, wer den Verlust nicht meldet» — masrafı üstlenen bildirmeyen kişi. Bildirim «umgehend» isteniyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Ansagen, einen Vortrag, ein Gespräch und eine Diskussion. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde dört görev var: duyurular, bir sunum, bir konuşma ve bir tartışma dinleyeceksin. Önce soruları oku.",
      tasks: [
        {
          id: "de-b1-02-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Ansage im Radio",
              genreTr: "Radyoda duyuru",
              situation: "Belediyenin bir duyurusu okunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis der Stadtwerke: Wegen einer Reparatur an der Hauptleitung bleibt das Wasser am Dienstag zwischen acht und dreizehn Uhr abgestellt. Betroffen sind die Straßen rund um den Marktplatz. Bitte bevorraten Sie sich am Montagabend. Ein Tankwagen steht ab neun Uhr vor der Kirche bereit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Durchsage im Museum",
              genreTr: "Müzede anons",
              situation: "Müzede ziyaretçilere duyuru.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Besucherinnen und Besucher, die Sonderausstellung im Obergeschoss schließt heute bereits um sechzehn Uhr, weil dort am Abend eine Veranstaltung stattfindet. Die Dauerausstellung können Sie wie gewohnt bis achtzehn Uhr besuchen. Ihre Eintrittskarte gilt an einem anderen Tag noch einmal.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir danışmanlık merkezi randevu için arıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Achterberg, hier ist die Energieberatung der Verbraucherzentrale. Ihr Termin für den Hausbesuch steht: kommenden Donnerstag um vierzehn Uhr. Bitte legen Sie Ihre letzte Heizkostenabrechnung bereit. Falls Sie den Termin nicht schaffen, rufen Sie uns bitte bis Mittwochmittag an.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Durchsage im Wohnhaus",
              genreTr: "Apartmanda duyuru",
              situation: "Yönetimden sakinlere duyuru.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information der Hausverwaltung: Ab Montag wird das Dach saniert. Die Arbeiten dauern etwa sechs Wochen. In dieser Zeit können Sie die Balkone weiter nutzen, sollten aber keine Wäsche draußen aufhängen. Der Innenhof bleibt ab Montag gesperrt, Fahrräder bitte bis Sonntag herausholen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Tipp im Radio",
              genreTr: "Radyoda öneri",
              situation: "Dinleyicilere bir etkinlik öneriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Zum Schluss noch ein Tipp: Am Sonntag findet auf dem Gelände der alten Gärtnerei ein Pflanzentauschmarkt statt, von zehn bis fünfzehn Uhr. Bringen Sie mit, was bei Ihnen zu viel ist, und nehmen Sie mit, was Sie brauchen. Geld wird dort nicht verwendet. Bei Regen fällt der Markt aus.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-02-h1-1",
              no: 1,
              ref: "h1",
              text: "Die Abstellung betrifft nur einen Teil der Stadt.",
              answer: true,
              explain:
                "\"Betroffen sind die Straßen rund um den Marktplatz\" — kesinti şehrin tamamını değil, meydan çevresindeki sokakları kapsıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h1-2",
              no: 2,
              ref: "h1",
              text: "Was empfiehlt die Ansage?",
              options: ["Am Dienstagmorgen besonders früh aufzustehen.", "Am Montagabend Wasser vorzubereiten.", "Zum Nachbarort zu fahren."],
              answer: 1,
              explain: "\"Bitte bevorraten Sie sich am Montagabend\" — kesintiden önceki akşam su hazırlamak.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Dauerausstellung schließt heute früher als sonst.",
              answer: false,
              explain:
                "Erken kapanan sergi üst kattaki özel sergi. Sürekli sergi \"wie gewohnt bis achtzehn Uhr\" açık.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h1-4",
              no: 4,
              ref: "h2",
              text: "Was gilt für die Eintrittskarte?",
              options: [
                "Sie wird an der Kasse teilweise erstattet.",
                "Sie gilt nur für die Dauerausstellung weiter.",
                "Man darf mit ihr ein zweites Mal kommen.",
              ],
              answer: 2,
              explain: "\"Ihre Eintrittskarte gilt an einem anderen Tag noch einmal\" — para iadesi değil, ikinci bir giriş hakkı.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h1-5",
              no: 5,
              ref: "h3",
              text: "Herr Achterberg soll Unterlagen bereitlegen.",
              answer: true,
              explain: "\"Bitte legen Sie Ihre letzte Heizkostenabrechnung bereit\" — ziyaret için bir belge isteniyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h1-6",
              no: 6,
              ref: "h3",
              text: "Bis wann muss er absagen, wenn er nicht kann?",
              options: ["Bis Mittwochmittag.", "Bis Donnerstagmorgen.", "Bis Dienstagabend."],
              answer: 0,
              explain: "\"rufen Sie uns bitte bis Mittwochmittag an\" — randevu perşembe, iptal sınırı çarşamba öğlen.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Balkone bleiben während der Arbeiten nutzbar.",
              answer: true,
              explain:
                "\"In dieser Zeit können Sie die Balkone weiter nutzen\" — kullanım serbest, yalnız çamaşır asılmaması isteniyor. Kapatılan yer iç avlu.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h1-8",
              no: 8,
              ref: "h4",
              text: "Was sollen die Bewohner bis Sonntag tun?",
              options: ["Die Wäsche von allen Balkonen abhängen.", "Die Balkone räumen.", "Die Fahrräder aus dem Hof holen."],
              answer: 2,
              explain: "İç avlu pazartesi kapanıyor, bu yüzden \"Fahrräder bitte bis Sonntag herausholen\".",
            },
            {
              kind: "bool",
              id: "de-b1-02-h1-9",
              no: 9,
              ref: "h5",
              text: "Auf dem Markt kann man Pflanzen kaufen.",
              answer: false,
              explain: "\"Geld wird dort nicht verwendet\" — takas pazarı; alınıp verilen şey para değil bitki.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h1-10",
              no: 10,
              ref: "h5",
              text: "Was passiert bei schlechtem Wetter?",
              options: ["Der Markt wird verschoben.", "Der Markt findet nicht statt.", "Der Markt zieht in die überdachte Markthalle."],
              answer: 1,
              explain: "\"Bei Regen fällt der Markt aus\" — iptal. Erteleme ya da kapalı alana taşınma söylenmiyor.",
            },
          ],
        },
        {
          id: "de-b1-02-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Wählen Sie zu den Aufgaben 11 bis 15: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir sunum dinleyeceksin. 11–15. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              title: "Das Projekt Essbare Stadt",
              situation: "Bir mahalle toplantısında proje tanıtılıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend und danke, dass Sie so zahlreich gekommen sind. Ich stelle Ihnen heute das Projekt Essbare Stadt vor. In zehn Minuten, das verspreche ich.",
                },
                {
                  text: "Die Idee ist schnell erklärt: Auf öffentlichen Flächen wachsen nicht nur Blumen, sondern Obst, Kräuter und Gemüse. Und zwar so, dass jede und jeder ernten darf. Ohne Schild, ohne Anmeldung.",
                },
                {
                  text: "Angefangen haben wir vor drei Jahren mit vier Hochbeeten vor der Bücherei. Ehrlich gesagt haben wir damit gerechnet, dass alles innerhalb einer Woche geplündert oder zerstört wird. Nichts davon ist passiert.",
                },
                {
                  text: "Heute sind es einundvierzig Flächen. Bezahlt wird das Ganze nicht aus dem Stadthaushalt, sondern über Patenschaften: Ein Betrieb oder eine Familie übernimmt ein Beet und zahlt achtzig Euro im Jahr.",
                },
                {
                  text: "Der häufigste Einwand lautet: Wer gießt im Sommer? Das war tatsächlich unser größtes Problem. Gelöst haben wir es mit einer einfachen Liste im Netz, in die man sich für eine Woche einträgt. Seit es diese Liste gibt, ist uns kein Beet mehr vertrocknet.",
                },
                {
                  text: "Was wir nicht schaffen, will ich auch sagen: Die Flächen am Bahnhof haben wir aufgegeben. Der Boden dort ist belastet, und wir wollen nichts anbieten, was wir nicht selbst essen würden.",
                },
                {
                  text: "Wenn Sie mitmachen möchten, sprechen Sie mich nachher an. Wir suchen im Moment weniger Geld als Menschen, die einmal im Monat zwei Stunden Zeit haben.",
                },
              ],
              gloss: [
                { de: "das Hochbeet", tr: "yüksek tarh (yükseltilmiş ekim yatağı)", en: "raised bed" },
                { de: "die Patenschaft", tr: "sponsorluk, koruyuculuk", en: "sponsorship" },
                { de: "der Einwand", tr: "itiraz", en: "objection" },
                { de: "belastet", tr: "kirlenmiş (toprak)", en: "contaminated" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-02-h2-11",
              no: 11,
              ref: "v1",
              text: "Was ist die Idee des Projekts?",
              options: [
                "Gemüse wird günstig an Bedürftige verkauft.",
                "Auf öffentlichen Flächen wächst Essbares, das alle ernten dürfen.",
                "Familien bekommen einen eigenen Garten am Stadtrand.",
              ],
              answer: 1,
              explain:
                "\"jede und jeder ernten darf. Ohne Schild, ohne Anmeldung\" — kamusal alanda serbest hasat. Satış ya da özel bahçe söz konusu değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h2-12",
              no: 12,
              ref: "v1",
              text: "Was hat die Gruppe am Anfang befürchtet?",
              options: [
                "Dass die Beete zerstört werden.",
                "Dass sich niemand für das Projekt interessiert.",
                "Dass die Stadt die Erlaubnis zurückzieht.",
              ],
              answer: 0,
              explain:
                "\"gerechnet, dass alles innerhalb einer Woche geplündert oder zerstört wird\" — korku buydu ve gerçekleşmedi.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h2-13",
              no: 13,
              ref: "v1",
              text: "Wie wird das Projekt finanziert?",
              options: [
                "Aus dem Haushalt der Stadt.",
                "Durch den Verkauf der Ernte auf dem Wochenmarkt.",
                "Über Patenschaften für einzelne Beete.",
              ],
              answer: 2,
              explain:
                "\"nicht aus dem Stadthaushalt, sondern über Patenschaften\" — tarh başına yılda 80 euro. Belediye bütçesi açıkça eleniyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h2-14",
              no: 14,
              ref: "v1",
              text: "Wie wurde das Problem mit dem Gießen gelöst?",
              options: [
                "Durch eine automatische Bewässerung mit Zeitschaltuhr.",
                "Durch eine Liste im Internet.",
                "Durch bezahlte Helferinnen und Helfer im Sommer.",
              ],
              answer: 1,
              explain:
                "\"mit einer einfachen Liste im Netz, in die man sich für eine Woche einträgt\" — teknik ya da ücretli bir çözüm değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h2-15",
              no: 15,
              ref: "v1",
              text: "Warum wurden die Flächen am Bahnhof aufgegeben?",
              options: [
                "Weil der Boden dort belastet ist.",
                "Weil die Beete dort ständig beschädigt wurden.",
                "Weil die Bahn die Flächen selbst braucht.",
              ],
              answer: 0,
              explain:
                "\"Der Boden dort ist belastet\" ve kendilerinin yemeyeceği bir şeyi sunmak istemiyorlar. Bu, sunumun dürüstlük kısmı.",
            },
          ],
        },
        {
          id: "de-b1-02-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören ein Gespräch. Sind die Aussagen 16 bis 22 richtig oder falsch? Sie hören den Text einmal.",
          promptTr: "Bir konuşma dinleyeceksin. 16–22. ifadeler doğru mu yanlış mı? Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch unter Nachbarn",
              genreTr: "Komşular arasında konuşma",
              situation: "İki komşu avludaki inşaat planını konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Herr Rau", text: "Haben Sie den Aushang gelesen? Sie wollen im Hof zwölf Stellplätze bauen." },
                { speaker: "Frau Demirel", text: "Zwölf? Auf dem Blatt standen doch sechs." },
                { speaker: "Herr Rau", text: "Sie haben recht, sechs. Zwölf war die erste Planung vom letzten Jahr, die ist vom Tisch." },
                { speaker: "Frau Demirel", text: "Und was passiert mit den Bäumen?" },
                { speaker: "Herr Rau", text: "Zwei müssen weg, die alte Kastanie bleibt. Das war die Bedingung der Stadt." },
                { speaker: "Frau Demirel", text: "Immerhin. Wissen Sie, wann angefangen wird?" },
                { speaker: "Herr Rau", text: "Im Aushang steht April. Im Gespräch mit der Verwaltung war aber von Juni die Rede, weil eine Genehmigung fehlt." },
                { speaker: "Frau Demirel", text: "Typisch. Und die Kosten? Zahlen wir Mieter das mit?" },
                { speaker: "Herr Rau", text: "Nein, das darf nicht auf die Miete umgelegt werden. Nur wer einen Stellplatz mietet, zahlt dafür — fünfundvierzig Euro im Monat." },
                { speaker: "Frau Demirel", text: "Dann brauche ich keinen. Ich habe kein Auto mehr, seit ich in Rente bin." },
                { speaker: "Herr Rau", text: "Es gibt auch Abstellplätze für Fahrräder, überdacht. Die sind im Preis nicht enthalten, aber sehr günstig." },
                { speaker: "Frau Demirel", text: "Das wäre etwas für mich. Kommen Sie am Donnerstag zur Versammlung?" },
                { speaker: "Herr Rau", text: "Eigentlich schon, aber ich bin da auf Montage. Können Sie mir danach erzählen, was beschlossen wurde?" },
              ],
              gloss: [
                { de: "der Stellplatz", tr: "park yeri", en: "parking space" },
                { de: "vom Tisch sein", tr: "gündemden kalkmış olmak", en: "to be off the table" },
                { de: "umlegen auf", tr: "yansıtmak (masrafı)", en: "to pass on (costs)" },
                { de: "auf Montage sein", tr: "şehir dışı işte olmak", en: "to be away on assembly work" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-02-h3-16",
              no: 16,
              ref: "g1",
              text: "Im Hof sollen sechs Stellplätze gebaut werden.",
              answer: true,
              explain:
                "Herr Rau önce on iki diyor, Frau Demirel düzeltiyor ve o da kabul ediyor: \"Sie haben recht, sechs\". On iki geçen yılın iptal edilmiş planı.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h3-17",
              no: 17,
              ref: "g1",
              text: "Alle Bäume im Hof bleiben stehen.",
              answer: false,
              explain: "«Zwei müssen weg, die alte Kastanie bleibt» — iki ağaç kesiliyor; kalan yalnız yaşlı kestane ve bu belediyenin koşulu.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h3-18",
              no: 18,
              ref: "g1",
              text: "Der Baubeginn ist noch nicht sicher.",
              answer: true,
              explain:
                "«Im Aushang steht April. Im Gespräch mit der Verwaltung war aber von Juni die Rede, weil eine Genehmigung fehlt» — iki tarih arasında karar yok.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h3-19",
              no: 19,
              ref: "g1",
              text: "Alle Mieter zahlen über die Miete für die Stellplätze mit.",
              answer: false,
              explain:
                "\"das darf nicht auf die Miete umgelegt werden\" — sadece park yeri kiralayan öder, ayda 45 euro.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h3-20",
              no: 20,
              ref: "g1",
              text: "Frau Demirel möchte einen Stellplatz mieten.",
              answer: false,
              explain: "Emekli olduğundan beri arabası yok: \"Dann brauche ich keinen\". İlgilendiği şey bisiklet yeri.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h3-21",
              no: 21,
              ref: "g1",
              text: "Für Fahrräder ist ein überdachter Platz geplant.",
              answer: true,
              explain: "\"Es gibt auch Abstellplätze für Fahrräder, überdacht\" — ayrı ve çok ucuz bir seçenek olarak anılıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-02-h3-22",
              no: 22,
              ref: "g1",
              text: "Herr Rau nimmt an der Versammlung teil.",
              answer: false,
              explain:
                "\"Eigentlich schon, aber ich bin da auf Montage\" — gitmek isterdi ama gidemiyor, bu yüzden sonradan anlatılmasını rica ediyor.",
            },
          ],
        },
        {
          id: "de-b1-02-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Sie hören eine Diskussion. Wer sagt das? Wählen Sie zu den Aufgaben 23 bis 30. Sie hören den Text zweimal.",
          promptTr:
            "Bir tartışma dinleyeceksin. Bunu kim söylüyor? 23–30. maddeler için seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Şehir merkezinin geleceği tartışılıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Willkommen. Über die Zukunft unserer Innenstadt wird seit Jahren geredet, aber verändert hat sich wenig. Bei mir sind Frau Kessler, Stadtplanerin, und Herr Brunner, Inhaber eines Buchladens.",
                },
                {
                  speaker: "Frau Kessler",
                  text: "Ich fange mit einer Zahl an: Zwei Drittel der Fläche in unserer Innenstadt gehören dem Verkehr. Das ist keine Naturgesetzlichkeit, das war eine Entscheidung.",
                },
                {
                  speaker: "Herr Brunner",
                  text: "Zahlen kenne ich auch. Seit die Bushaltestelle verlegt wurde, kommen bei mir vierzig Prozent weniger Leute über sechzig in den Laden.",
                },
                {
                  speaker: "Moderator",
                  text: "Frau Kessler, das ist doch genau der Vorwurf: Planung wird über die Köpfe der Betroffenen hinweg gemacht.",
                },
                {
                  speaker: "Frau Kessler",
                  text: "Der Vorwurf ist berechtigt, und ich nehme ihn an. Wir haben damals die Händler zu spät eingeladen, das würde ich heute anders machen.",
                },
                {
                  speaker: "Herr Brunner",
                  text: "Was mir wirklich hilft, ist übrigens nicht die große Umgestaltung, sondern eine Kleinigkeit: Bänke. Wer sich hinsetzen kann, bleibt länger.",
                },
                {
                  speaker: "Frau Kessler",
                  text: "Da sind wir uns einig. Nur reicht das allein nicht — ohne bezahlbare Mieten für die Läden nützen die schönsten Bänke nichts.",
                },
                {
                  speaker: "Moderator",
                  text: "Eine Frage zum Schluss: Kann eine Stadt von einer anderen abschreiben?",
                },
                {
                  speaker: "Herr Brunner",
                  text: "Abschreiben ist gefährlich. Was in einer Stadt mit Universität funktioniert, geht bei uns nicht automatisch.",
                },
                {
                  speaker: "Frau Kessler",
                  text: "Und trotzdem sollten wir schneller anfangen. Wir planen sieben Jahre und wundern uns, dass die Läden vorher zumachen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-02-h4-23",
              no: 23,
              ref: "d1",
              text: "Über die Innenstadt wird viel geredet, aber wenig getan.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 0,
              explain: "Programın açılış cümlesi: \"seit Jahren geredet, aber verändert hat sich wenig\".",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-24",
              no: 24,
              ref: "d1",
              text: "Der größte Teil der Innenstadtfläche gehört dem Verkehr.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 1,
              explain: "Frau Kessler bir sayıyla başlıyor: alanın üçte ikisi trafiğe ait ve bunun bir karar olduğunu ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-25",
              no: 25,
              ref: "d1",
              text: "Seit der Verlegung der Haltestelle kommen weniger ältere Kunden.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 2,
              explain: "«Seit die Bushaltestelle verlegt wurde, kommen bei mir vierzig Prozent weniger Leute über sechzig in den Laden» — kendi dükkânından somut bir oran.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-26",
              no: 26,
              ref: "d1",
              text: "Der Vorwurf ist berechtigt, die Händler wurden zu spät eingeladen.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 1,
              explain:
                "Suçlamayı sunucu dile getiriyor, ama kabul eden Frau Kessler: \"Der Vorwurf ist berechtigt, und ich nehme ihn an\".",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-27",
              no: 27,
              ref: "d1",
              text: "Bänke helfen mehr als eine große Umgestaltung.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 2,
              explain: "Herr Brunner'in \"Kleinigkeit\" dediği şey: oturabilen insan daha uzun kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-28",
              no: 28,
              ref: "d1",
              text: "Planung wird oft über die Köpfe der Betroffenen hinweg gemacht.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 0,
              explain:
                "Bunu sunucu bir eleştiri olarak ortaya atıyor. Frau Kessler ardından kabul ediyor ama cümlenin sahibi değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-29",
              no: 29,
              ref: "d1",
              text: "Andere Städte kann man nicht einfach kopieren.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 2,
              explain:
                "\"Abschreiben ist gefährlich\" — üniversiteli bir kentte işleyenin burada işlemeyebileceğini söyleyen Herr Brunner.",
            },
            {
              kind: "mcq",
              id: "de-b1-02-h4-30",
              no: 30,
              ref: "d1",
              text: "Es wird zu lange geplant, die Läden schließen vorher.",
              options: ["Der Moderator.", "Frau Kessler.", "Herr Brunner."],
              answer: 1,
              explain: "Kapanış cümlesi Frau Kessler'e ait: \"Wir planen sieben Jahre und wundern uns, dass die Läden vorher zumachen\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine persönliche E-Mail, einen Forumsbeitrag und eine formelle Nachricht.",
      instructionTr: "Bu bölümde üç görev var: kişisel bir e-posta, bir forum yorumu ve resmî bir ileti.",
      tasks: [
        {
          id: "de-b1-02-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Freund Milan zieht in Ihre Stadt und fragt Sie, in welchem Viertel er wohnen soll. Antworten Sie ihm (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Milan senin şehrine taşınıyor ve hangi mahallede oturması gerektiğini soruyor. Ona cevap yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Freuen Sie sich über die Nachricht.", tr: "Habere sevindiğini belirt." },
              { de: "Empfehlen Sie ein Viertel und begründen Sie das.", tr: "Bir mahalle öner ve gerekçelendir." },
              { de: "Nennen Sie auch einen Nachteil.", tr: "Bir sakıncasını da söyle." },
              { de: "Bieten Sie konkrete Hilfe an.", tr: "Somut bir yardım öner." },
            ],
            sample: `Lieber Milan,

was für eine gute Nachricht! Dass du wirklich herkommst, hätte ich vor einem Jahr nicht gedacht.

Ich würde dir das Nordviertel empfehlen. Die Mieten sind dort niedriger als in der Innenstadt, und du bist mit dem Rad in zehn Minuten am Büro. Außerdem gibt es einen Wochenmarkt und viele kleine Läden.

Ein Nachteil ist der Lärm an der Hauptstraße. Achte darauf, dass die Wohnung nach hinten liegt.

Wenn du willst, schaue ich mir Wohnungen mit dir an. Ich habe ab dem 20. frei.

Liebe Grüße
Sarah`,
            criteria: [
              "Dört içerik noktası da işlendi mi?",
              "Öneri gerekçelendirildi mi, yoksa yalnız mahalle adı mı verildi?",
              "Sakınca gerçekten adlandırıldı mı ve bir tavsiyeyle yumuşatıldı mı?",
              "Arkadaşa yazıldığı için baştan sona `du` kullanıldı mı?",
              "Yardım teklifi somut mu (tarih, eylem), yoksa \"melde dich\" gibi genel mi?",
              "Yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-02-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Online-Forum lesen Sie: \"Sollen Städte das Parken in Wohnstraßen deutlich teurer machen?\" Schreiben Sie Ihre Meinung (circa 80 Wörter).",
          promptTr:
            "Bir forumda şunu okuyorsun: \"Şehirler oturma bölgelerinde park ücretini belirgin biçimde artırmalı mı?\" Görüşünü yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Sagen Sie, was Sie von der Idee halten.", tr: "Fikir hakkında ne düşündüğünü söyle." },
              { de: "Begründen Sie Ihre Meinung.", tr: "Görüşünü gerekçelendir." },
              { de: "Gehen Sie auf ein Gegenargument ein.", tr: "Karşı bir savı ele al." },
              { de: "Schließen Sie mit einem Vorschlag.", tr: "Bir öneriyle bitir." },
            ],
            sample: `Ich finde höhere Parkgebühren in Wohnstraßen grundsätzlich richtig. Der Platz vor den Häusern gehört allen, wird aber fast umsonst an einzelne Autos vergeben. Wer eine Garage mietet, zahlt dafür ein Vielfaches.

Natürlich wird eingewendet, dass vor allem Menschen mit wenig Geld darunter leiden. Das stimmt für Pflegekräfte oder Handwerkerinnen, die im Schichtdienst arbeiten und keinen Bus haben.

Deshalb schlage ich vor, die Gebühr nach Einkommen zu staffeln und Berufe mit Nachtarbeit auszunehmen. So bleibt der Anreiz erhalten, ohne dass es die Falschen trifft.`,
            criteria: [
              "Görüş açıkça belirtildi mi?",
              "Gerekçe savunulabilir bir düşünceye dayanıyor mu?",
              "Karşı sav gerçekten ele alındı mı, yoksa yalnız anıldı mı?",
              "Öneri karşı savı dikkate alıyor mu?",
              "Metin bağlaçlarla örülmüş mü? (natürlich … deshalb … so …)",
              "Yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-02-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Seit drei Wochen ist der Aufzug in Ihrem Haus defekt. Schreiben Sie an die Hausverwaltung, Herrn Sattler (circa 40 Wörter).",
          promptTr:
            "Binandaki asansör üç haftadır bozuk. Bina yönetiminden Herr Sattler'e yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu anlat." },
              { de: "Erklären Sie, warum es Sie besonders betrifft.", tr: "Seni neden özellikle etkilediğini açıkla." },
              { de: "Bitten Sie um einen Termin für die Reparatur.", tr: "Tamir için bir tarih iste." },
            ],
            sample: `Sehr geehrter Herr Sattler,

seit drei Wochen ist der Aufzug im Haus Lindenhof 14 außer Betrieb. Ich wohne im fünften Stock und bin nach einer Operation am Knie nur eingeschränkt beweglich.

Könnten Sie mir bitte mitteilen, wann die Reparatur erfolgt?

Mit freundlichen Grüßen
Elena Vogt`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Resmî hitap doğru mu? (Sehr geehrter Herr … / Mit freundlichen Grüßen)",
              "Sorun tanımlanabilir mi (ne zamandan beri, hangi bina)?",
              "İstek kibar bir soru biçiminde mi, yoksa emir kipinde mi?",
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
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, ein Thema präsentieren, auf eine Präsentation reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte plan yapma, bir konuyu sunma, sunuma karşılık verme.",
      tasks: [
        {
          id: "de-b1-02-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam. In Ihrem Haus soll ein Hoffest stattfinden. Sprechen Sie über: Wann? — Wer wird eingeladen? — Was gibt es zu essen? — Wer kümmert sich worum?",
          promptTr:
            "Birlikte plan yapın. Binanızda bir avlu şenliği düzenlenecek. Şunları konuşun: Ne zaman? — Kimler davet edilecek? — Ne yenecek? — Kim neyle ilgilenecek?",
          prepSeconds: 60,
          exchange: [
            { who: "partner", de: "In unserem Haus soll ein Hoffest stattfinden und wir planen es zusammen. Wann wäre Ihrer Meinung nach ein guter Termin?", tr: "Binamızda bir avlu şenliği yapılacak, birlikte planlayacağız. Sence uygun bir tarih ne olur?" },
            { who: "you", hint: "Bir tarih öner ve gerekçelendir.", expect: "bir tarih önermek ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "Samstag ist gut, aber nicht der erste im Monat, da ist Markt. Nehmen wir den zweiten? Und wen laden wir ein?", tr: "Cumartesi iyi ama ayın ilki olmasın, o gün pazar var. İkincisini alalım mı? Peki kimleri davet edelim?" },
            { who: "you", hint: "Karşı öneriye karşılık ver ve kimlerin çağrılacağını söyle.", expect: "bir düzeltmeyi kabul etmek ve davet listesini önermek", seconds: 40 },
            { who: "partner", de: "Gute Idee. Beim Essen frage ich mich, ob wir gemeinsam einkaufen oder ob jeder etwas mitbringt.", tr: "İyi fikir. Yemekte kararsızım: Birlikte mi alışveriş yapalım, yoksa herkes bir şey mi getirsin?" },
            { who: "you", hint: "İki seçenekten birini seç ve nedenini söyle.", expect: "iki seçenek arasında gerekçeli seçim yapmak", seconds: 40 },
            { who: "partner", de: "Damit bin ich einverstanden. Wer kümmert sich um die Tische und wer spricht mit der Verwaltung?", tr: "Buna varım. Masalarla kim ilgilenecek, yönetimle kim konuşacak?" },
            { who: "you", hint: "İş bölümünü yap ve kararı özetle.", expect: "görev dağıtmak ve ortak kararı özetlemek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneride bulunmak ve gerekçelendirmek" },
              { de: "auf Vorschläge des Partners eingehen", tr: "Karşı tarafın önerisine gerçekten karşılık vermek" },
              { de: "gemeinsam entscheiden", tr: "Ortak karara varmak" },
            ],
            sample:
              "Ich wäre für einen Samstagnachmittag, da haben die Familien mit Kindern am ehesten Zeit. — Samstag ist gut, aber nicht der erste im Monat, da ist Markt. Nehmen wir den zweiten? — Einverstanden. Wen laden wir ein? — Alle im Haus, und ich würde die Nachbarn aus Nummer 14 dazunehmen, die kennen wir kaum. — Gute Idee. Beim Essen schlage ich vor, dass jeder etwas mitbringt, dann kauft niemand für dreißig Leute ein. — Dann mache ich die Liste, und du sprichst mit der Verwaltung wegen der Tische.",
            criteria: [
              "Dört nokta da konuşuldu mu?",
              "Öneriler gerekçelendirildi mi?",
              "En az bir öneri gerekçeyle düzeltildi mi? (Samstag ja, aber nicht der erste …)",
              "İş bölümü sonunda somutlaştı mı (kim ne yapıyor)?",
            ],
          },
        },
        {
          id: "de-b1-02-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie eine kurze Präsentation zum Thema \"Müll trennen im Alltag\". Sprechen Sie zu diesen fünf Punkten: Einstieg ins Thema — die Lage in Ihrem Heimatland — die Lage in Deutschland — Vor- und Nachteile — Ihre eigene Meinung.",
          promptTr:
            "\"Günlük hayatta çöp ayrıştırma\" konusunda kısa bir sunum yap. Şu beş noktaya değin: konuya giriş — kendi ülkendeki durum — Almanya'daki durum — artı ve eksiler — kendi görüşün.",
          prepSeconds: 90,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "das Thema vorstellen", tr: "Konuyu tanıtmak" },
              { de: "zwei Situationen vergleichen", tr: "İki durumu karşılaştırmak" },
              { de: "Vor- und Nachteile nennen", tr: "Artı ve eksileri sıralamak" },
              { de: "die eigene Meinung begründen", tr: "Kendi görüşünü gerekçelendirmek" },
            ],
            sample:
              "Ich spreche heute über das Trennen von Müll im Alltag. Das Thema klingt klein, aber es betrifft jeden Haushalt jeden Tag. In meinem Heimatland gibt es in vielen Städten nur eine Tonne für alles; getrennt wird eher inoffiziell, weil Menschen Flaschen und Metall sammeln und verkaufen. In Deutschland ist die Trennung dagegen fest geregelt, mit vier oder fünf Behältern pro Haus. Der Vorteil ist klar: Mehr Material wird wiederverwendet und weniger verbrannt. Ein Nachteil ist, dass die Regeln kompliziert sind. Ich habe zwei Jahre gebraucht, bis ich wusste, wohin ein Kassenbon gehört. Meiner Meinung nach funktioniert Trennung nur, wenn sie einfach erklärt wird. Ein Bild an der Tonne hilft mehr als ein Merkblatt in Amtsdeutsch.",
            criteria: [
              "Beş noktanın hepsine değinildi mi?",
              "Karşılaştırma açık bağlaçlarla kuruldu mu? (dagegen, im Unterschied dazu)",
              "Hem artı hem eksi söylendi mi?",
              "Görüş bir gerekçeyle ya da kişisel bir örnekle desteklendi mi?",
              "Süre yaklaşık üç dakika mı?",
            ],
          },
        },
        {
          id: "de-b1-02-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf die Präsentation Ihres Partners: Geben Sie eine kurze Rückmeldung und stellen Sie eine Frage zum Inhalt. Antworten Sie danach auf die Frage Ihres Partners.",
          promptTr:
            "Karşındakinin sunumuna karşılık ver: kısa bir geri bildirim yap ve içerikle ilgili bir soru sor. Ardından sana sorulan soruyu cevapla.",
          prepSeconds: 45,
          exchange: [
            { who: "partner", de: "Danke für Ihre Präsentation. Besonders gut fand ich Ihr eigenes Beispiel. Eine Frage habe ich: Hat sich Ihre Meinung zum Thema mit der Zeit verändert?", tr: "Sunumun için teşekkürler. Özellikle kendi örneğin çok iyiydi. Bir sorum var: Bu konudaki görüşün zamanla değişti mi?" },
            { who: "you", hint: "Soruyu cevapla.", expect: "kendi görüşündeki bir değişimi anlatmak ve gerekçelendirmek", seconds: 40 },
            { who: "partner", de: "Interessant. Jetzt sind Sie dran: Geben Sie mir bitte eine Rückmeldung zu meiner Präsentation und stellen Sie eine Frage zum Inhalt.", tr: "İlginç. Şimdi sıra sende: Benim sunumuma geri bildirim ver ve içerikle ilgili bir soru sor." },
            { who: "you", hint: "Somut bir geri bildirim ver ve içerikle ilgili bir soru sor.", expect: "somut bir geri bildirim vermek ve içeriğe ilişkin bir soru sormak", seconds: 50 },
            { who: "partner", de: "Danke für die Frage. Bei uns wird der Müll zwar getrennt, aber die Behälter stehen so weit weg, dass viele es doch nicht machen.", tr: "Soru için teşekkürler. Bizde çöp ayrıştırılıyor ama konteynerler o kadar uzakta ki çoğu kişi yine de yapmıyor." },
            { who: "you", hint: "Cevaba kısaca karşılık ver ve konuşmayı kapat.", expect: "bir cevabı alımlamak ve konuşmayı doğal biçimde kapatmak", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "eine Rückmeldung geben", tr: "Geri bildirim vermek" },
              { de: "eine inhaltliche Frage stellen", tr: "İçeriğe ilişkin bir soru sormak" },
              { de: "auf eine Frage antworten", tr: "Sorulan soruyu cevaplamak" },
            ],
            sample:
              "Danke, mir hat besonders gefallen, dass du ein eigenes Beispiel gebracht hast — das mit dem Kassenbon kenne ich genau so. Meine Frage: Du hast gesagt, in deinem Heimatland wird inoffiziell getrennt. Funktioniert das am Ende besser oder schlechter? — Zu deiner Frage: Bei Metall und Glas funktioniert es erstaunlich gut, weil damit Geld verdient wird. Bei Papier dagegen fast gar nicht, weil sich das nicht lohnt.",
            criteria: [
              "Geri bildirim sunumun somut bir yerine mi gönderme yapıyor?",
              "Soru içeriğe ilişkin mi ve gerçekten cevaplanabilir mi?",
              "Cevap soruyu karşılıyor ve bir ayrım yapıyor mu?",
              "Konuşma karşılıklı akıyor mu?",
            ],
          },
        },
      ],
    },
  ],
};
