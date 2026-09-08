import type { MockPaper } from "../types";

/**
 * B1 · Deneme 7 — "Wohnen und Zusammenleben".
 *
 * PLAN kâğıt 1–6 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 ana fikir · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karma · 5 üç şıklı · 7 R/F · 8 görüş)
 *   Schreiben 60 dk           80 + 80 + 40 kelime
 *   Sprechen  15 dk           birlikte planlama · kısa sunum · sorun çözme
 *
 * KONU SEÇİMİ: konut ve birlikte yaşama. B1'in ölçtüğü şey artık bilgi değil
 * TUTUM: bir öneriye karşı çıkabilmek, çekince söyleyebilmek, kendi çıkarına
 * ters düşen bir görüşü savunabilmek. Kirada oturmak bu tutumların hepsini
 * gerçek hayatta zorunlu kılan ilk alan.
 *
 * FORUM GÖREVİ bilerek kolay okunmayacak biçimde kuruldu: yorumların üçü
 * kendi çıkarına ters konuşuyor (kendi köpeği olan biri genel izne karşı,
 * alerjisi olan biri izin lehine). "Kim ne der" tahminiyle çözülemesin diye.
 *
 * KİŞİLER bölümler arasında paylaşılmıyor. Aynı adın hem okuma metninde hem
 * dinleme kaydında geçmesi, adayı iki metni birbirine bağlamaya itiyor ve
 * ölçümü bozuyor — A1 turunda bu kusur bulunup düzeltilmişti.
 */
export const B1_07: MockPaper = {
  id: "de-b1-07",
  course: "de",
  level: "B1",
  no: 7,
  theme: "Wohnen und Zusammenleben",
  themeTr: "Konut ve birlikte yaşama",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Bericht, kurze Texte, Anzeigen, Forumsbeiträge und eine Hausordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Bir haber metni, kısa metinler, ilanlar, forum yorumları ve bir bina yönetmeliği okuyacaksın.",
      tasks: [
        {
          id: "de-b1-07-l1",
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
              title: "Das Haus, in dem alle mitreden",
              body: `Als die Eigentümerin des Hauses in der Reuterstraße verkaufen wollte, hatten die achtzehn Mietparteien drei Monate Zeit.

Sie gründeten einen Verein, nahmen einen Kredit auf und kauften das Haus selbst. Das war vor sieben Jahren.

"Wir haben damals nicht gerechnet, sondern gehofft", sagt Ilka Hollstein, die den Verein bis heute leitet.

Heute liegt die Miete etwa fünfzehn Prozent unter dem Durchschnitt des Viertels. Erhöht wird sie nur, wenn eine Reparatur es nötig macht.

Entschieden wird in einer Versammlung, die viermal im Jahr zusammenkommt. Wer nicht kommen kann, stimmt vorher schriftlich ab.

Nicht alles ist leichter geworden. Über die Dachsanierung wurde zwei Jahre gestritten, bis eine Lösung stand.

"Wenn man sein Haus selbst verwaltet, verschwinden die Konflikte nicht", sagt Frau Hollstein. "Sie bekommen nur einen Ort, an dem man sie austragen kann."

Inzwischen fragen andere Häuser um Rat. Der Verein gibt seine Unterlagen weiter, warnt aber auch: Ohne zwei oder drei Leute, die viel Zeit haben, funktioniert es nicht.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-07-l1-1",
              no: 1,
              ref: "r1",
              text: "Die Mieter hatten ein halbes Jahr Zeit für ihre Entscheidung.",
              answer: false,
              explain:
                "İlk cümle süreyi veriyor: \"hatten die achtzehn Mietparteien drei Monate Zeit\". Üç ay, altı ay değil.",
            },
            {
              kind: "bool",
              id: "de-b1-07-l1-2",
              no: 2,
              ref: "r1",
              text: "Der Verein besteht seit sieben Jahren.",
              answer: true,
              explain:
                "Satın alma anlatıldıktan sonra tarih veriliyor: \"Das war vor sieben Jahren\".",
            },
            {
              kind: "bool",
              id: "de-b1-07-l1-3",
              no: 3,
              ref: "r1",
              text: "Die Miete wird jedes Jahr automatisch erhöht.",
              answer: false,
              explain:
                "Zam koşula bağlı: \"Erhöht wird sie nur, wenn eine Reparatur es nötig macht\". `nur … wenn` otomatik artışı dışlıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-07-l1-4",
              no: 4,
              ref: "r1",
              text: "Wer zur Versammlung nicht kommen kann, darf trotzdem abstimmen.",
              answer: true,
              explain:
                "Metin bu yolu açıkça bırakıyor: \"Wer nicht kommen kann, stimmt vorher schriftlich ab\".",
            },
            {
              kind: "bool",
              id: "de-b1-07-l1-5",
              no: 5,
              ref: "r1",
              text: "Nach dem Kauf gab es im Haus keine Streitigkeiten mehr.",
              answer: false,
              explain:
                "Metin tam tersini örnekliyor: \"Über die Dachsanierung wurde zwei Jahre gestritten\". Frau Hollstein de çatışmaların kaybolmadığını söylüyor.",
            },
            {
              kind: "bool",
              id: "de-b1-07-l1-6",
              no: 6,
              ref: "r1",
              text: "Der Verein gibt seine Erfahrungen an andere Häuser weiter.",
              answer: true,
              explain:
                "\"Der Verein gibt seine Unterlagen weiter\" — bunu yaparken bir koşulu da hatırlatıyor: çok zamanı olan iki üç kişi gerekiyor.",
            },
          ],
        },
        {
          id: "de-b1-07-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die sechs Texte. Was ist die Kernaussage? Wählen Sie a, b oder c.",
          promptTr: "Altı metni oku. Ana ileti ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang im Treppenhaus",
              genreTr: "Merdiven boşluğundaki duyuru",
              body: `Liebe Hausgemeinschaft,

ab dem 1. Oktober wird der Keller neu aufgeteilt.

Wer sein Abteil behalten möchte, meldet sich bis zum 20. September im Büro. Wer sich nicht meldet, bekommt ein Abteil zugewiesen.

Beschwerden danach sind zwecklos.`,
            },
            {
              kind: "text",
              id: "t2",
              genre: "E-Mail der Hausverwaltung",
              genreTr: "Site yönetiminden e-posta",
              body: `Sehr geehrte Frau Vukovic,

Ihre Meldung zum tropfenden Wasserhahn haben wir erhalten. Der Handwerker kommt am Donnerstag zwischen acht und zwölf.

Falls Sie dann nicht da sind, geben Sie bitte einem Nachbarn den Schlüssel. Ein zweiter Termin ist erst in vier Wochen möglich.`,
            },
            {
              kind: "text",
              id: "t3",
              genre: "Wohnungsanzeige",
              genreTr: "Konut ilanı",
              body: `WG-Zimmer frei, 18 qm, ab sofort.

Wir sind drei Leute zwischen 24 und 31 und kochen fast jeden Abend zusammen.

Wer lieber für sich bleibt, wird bei uns nicht glücklich. Besichtigung nur samstags.`,
            },
            {
              kind: "text",
              id: "t4",
              genre: "Nachricht in der Hausgruppe",
              genreTr: "Bina grubundaki mesaj",
              body: `Kurze Info: Der Aufzug fällt am Montag und Dienstag aus.

Wer schlecht zu Fuß ist, kann sich bei mir melden — ich gehe sowieso zweimal am Tag einkaufen.

Bitte gebt es an die Leute weiter, die nicht in der Gruppe sind.`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "Aushang in der Waschküche",
              genreTr: "Çamaşırhanedeki duyuru",
              body: `Wegen wiederholter Beschwerden:

Waschen ist von 22 bis 7 Uhr nicht erlaubt. Das gilt auch am Wochenende.

Wer die Regel dreimal bricht, verliert den Zugang zur Waschküche für einen Monat.`,
            },
            {
              kind: "text",
              id: "t6",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Die Zahl der Einpersonenhaushalte ist in der Stadt auf 44 Prozent gestiegen.

Gleichzeitig fehlen kleine Wohnungen.

Wer allein lebt, bleibt deshalb oft in einer Wohnung, die für zwei oder drei Personen gedacht war.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-07-l2-7",
              no: 7,
              ref: "t1",
              text: "Was ist die Kernaussage?",
              options: [
                "Alle Kellerabteile werden geräumt.",
                "Wer nichts sagt, verliert die Wahl.",
                "Der Keller wird ab Oktober gesperrt.",
              ],
              answer: 1,
              explain:
                "Duyuru bir tarih ve bir sonuç veriyor: bildirmeyen \"bekommt ein Abteil zugewiesen\", sonrasında itiraz kabul edilmiyor. Bodrum kapanmıyor, yeniden bölünüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l2-8",
              no: 8,
              ref: "t2",
              text: "Was ist an dieser Mail wichtig?",
              options: [
                "Der Termin lässt sich leicht verschieben.",
                "Der Hahn wird nicht repariert.",
                "Ohne Zugang dauert es lange.",
              ],
              answer: 2,
              explain:
                "Anahtar cümle sonda: \"Ein zweiter Termin ist erst in vier Wochen möglich\". Yani kimse açmazsa tamir bir aya kayıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l2-9",
              no: 9,
              ref: "t3",
              text: "Was sagt die Anzeige über die WG?",
              options: [
                "Gemeinsames Leben ist erwünscht.",
                "Das Zimmer ist erst später frei.",
                "Besichtigungen sind jederzeit möglich.",
              ],
              answer: 0,
              explain:
                "İlan iki kez aynı şeyi söylüyor: her akşam birlikte yemek ve \"Wer lieber für sich bleibt, wird bei uns nicht glücklich\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l2-10",
              no: 10,
              ref: "t4",
              text: "Was bietet die Person an?",
              options: [
                "Sie repariert den Aufzug.",
                "Sie hilft beim Einkaufen.",
                "Sie organisiert eine Versammlung.",
              ],
              answer: 1,
              explain:
                "Teklif gerekçesiyle geliyor: \"ich gehe sowieso zweimal am Tag einkaufen\". Asansör arızası teklifin sebebi, konusu değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l2-11",
              no: 11,
              ref: "t5",
              text: "Was droht bei mehrfachem Verstoß?",
              options: [
                "Der Ausschluss für vier Wochen.",
                "Eine Geldstrafe von fünfzig Euro.",
                "Eine schriftliche Verwarnung.",
              ],
              answer: 0,
              explain:
                "Yaptırım son cümlede ve süreli: üç ihlalden sonra \"verliert den Zugang zur Waschküche für einen Monat\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l2-12",
              no: 12,
              ref: "t6",
              text: "Worin liegt das Problem?",
              options: [
                "Es gibt zu viele große Wohnungen.",
                "Die Mieten steigen zu schnell.",
                "Kleine Wohnungen fehlen.",
              ],
              answer: 2,
              explain:
                "İki olgu yan yana konuyor: tek kişilik hane oranı %44'e çıkmış ve \"Gleichzeitig fehlen kleine Wohnungen\". Kira metinde hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-b1-07-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler bir hizmet arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Möbel abzugeben",
              body: "Sofa, Tisch und zwei Regale, gut erhalten. Abholung bis 30. April, nur mit eigenem Transport. Kostenlos.",
            },
            {
              key: "b",
              label: "Nachbarschaftshilfe Reuterstraße",
              body: "Wir gießen Blumen, holen Post und versorgen Katzen, wenn Sie verreisen. Kostenlos, Gegenleistung bei Gelegenheit.",
            },
            {
              key: "c",
              label: "Umzugswagen mieten",
              body: "Kleintransporter mit Ladefläche, 39 Euro am Tag plus Kilometer. Führerschein B reicht. Abholung nur werktags.",
            },
            {
              key: "d",
              label: "Mietrecht-Beratung",
              body: "Kostenlose Erstberatung für Mieterinnen und Mieter. Dienstag 16 bis 19 Uhr, ohne Anmeldung, Bürgerhaus Raum 3.",
            },
            {
              key: "e",
              label: "Zimmer gegen Hilfe",
              body: "Ältere Dame bietet ein Zimmer für kleine Miete. Erwartet werden fünf Stunden Hilfe im Haushalt pro Woche.",
            },
            {
              key: "f",
              label: "Gemeinschaftsgarten im Innenhof",
              body: "Freie Beete, Werkzeug ist vorhanden. Nur für Bewohnerinnen und Bewohner des Blocks. Kein Beitrag.",
            },
            {
              key: "g",
              label: "Handwerkliche Hilfe gesucht",
              body: "Wir suchen Leute, die kleine Reparaturen im Haus übernehmen. Stundenlohn nach Absprache.",
            },
            {
              key: "h",
              label: "Wohnungstausch",
              body: "Zwei Zimmer im Erdgeschoss gegen drei Zimmer, gern weiter oben. Beide Wohnungen im selben Bezirk.",
            },
            {
              key: "i",
              label: "Einlagerung",
              body: "Trockene Kellerräume ab 4 qm, monatlich kündbar, 25 Euro. Zugang jederzeit mit eigenem Schlüssel.",
            },
            {
              key: "j",
              label: "Sprachcafé im Haus",
              body: "Jeden Mittwoch 18 Uhr im Gemeinschaftsraum. Deutsch üben ohne Kurs und ohne Kosten.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-07-l3-13",
              no: 13,
              text: "Frau Cimen fährt drei Wochen weg und sorgt sich um ihre Pflanzen und ihre Katze.",
              answer: "b",
              explain:
                "(b) üçünü de sayıyor: \"gießen Blumen, holen Post und versorgen Katzen, wenn Sie verreisen\". Başka hiçbir ilan hayvan bakımına girmiyor.",
            },
            {
              kind: "match",
              id: "de-b1-07-l3-14",
              no: 14,
              text: "Herr Radtke streitet mit der Verwaltung über die Nebenkosten und hat kein Geld für einen Anwalt.",
              answer: "d",
              explain:
                "(d) \"Kostenlose Erstberatung für Mieterinnen und Mieter\" veriyor ve randevu bile istemiyor. Ücretsiz hukuki yol yalnız burada.",
            },
            {
              kind: "match",
              id: "de-b1-07-l3-15",
              no: 15,
              text: "Frau Kaltenbach zieht in eine kleinere Wohnung und weiß nicht, wohin mit ihren Kisten.",
              answer: "i",
              explain:
                "(i) \"Trockene Kellerräume ab 4 qm, monatlich kündbar\" sunuyor — geçici depolama isteyen tek ilan bu.",
            },
            {
              kind: "match",
              id: "de-b1-07-l3-16",
              no: 16,
              text: "Herr Ohnesorg braucht am Dienstag ein Fahrzeug für seinen Umzug.",
              answer: "c",
              explain:
                "(c) aracı veriyor ve koşulu uyuyor: \"Abholung nur werktags\" — salı iş günü. Ehliyet sınıfı da sıradan bir B ehliyeti.",
            },
            {
              kind: "match",
              id: "de-b1-07-l3-17",
              no: 17,
              text: "Frau Pilz studiert, hat wenig Geld und kann gut im Haushalt helfen.",
              answer: "e",
              explain:
                "(e) tam bu takası kuruyor: küçük kira karşılığında \"fünf Stunden Hilfe im Haushalt pro Woche\". (g) de yardım arıyor ama para ödüyor, konut vermiyor.",
            },
            {
              kind: "match",
              id: "de-b1-07-l3-18",
              no: 18,
              text: "Herr Steg wohnt allein im dritten Stock und möchte lieber ebenerdig wohnen.",
              answer: "h",
              explain:
                "(h) ilanı veren kişi zemin kattadır ve yukarısını ister — Herr Steg'in isteği tam tersi, yani iki taraf birbirini tamamlıyor.",
            },
            {
              kind: "match",
              id: "de-b1-07-l3-19",
              no: 19,
              text: "Frau Bergk möchte Gemüse anbauen und wohnt in dem Block.",
              answer: "f",
              explain:
                "(f) hem yeri hem koşulu karşılıyor: avluda boş tarhlar ve \"Nur für Bewohnerinnen und Bewohner des Blocks\".",
            },
          ],
        },
        {
          id: "de-b1-07-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Haustiere in Mietshäusern generell erlaubt sein?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Kiralık binalarda evcil hayvan genel olarak serbest olmalı mı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Haustiere im Mietshaus — generell erlauben?",
              body: `Marek D.: Ich habe zwanzig Jahre Wohnungen verwaltet und war immer dagegen. Dann habe ich die Zahlen unseres Bestands gesehen: Die teuersten Schäden kamen nie von Tieren, sondern von Waschmaschinen und Blumentöpfen. Seitdem halte ich das Verbot für ein Gefühl und nicht für eine Regel.

Susanne Rehm: Mir geht es nicht um die Tiere, sondern um die Absprachen. In meinem Haus wohnen vier Hunde, und keiner der Halter hat je gefragt, ob jemand Angst hat. Eine allgemeine Erlaubnis nimmt genau dieses Gespräch weg.

Ercan Yildirim: Ich bin Allergiker und trotzdem für die Erlaubnis. Ein Verbot hilft mir nämlich nicht: Die Katze der Nachbarin sitzt seit Jahren im Treppenhaus, und niemand kontrolliert das. Helfen würden getrennte Aufgänge oder eine Absprache, nicht ein Satz im Vertrag, an den sich keiner hält.

Frau Dr. Petrick: Als Tierärztin sehe ich, was passiert, wenn Menschen heimlich Tiere halten. Sie kommen zu spät in die Praxis, weil sie Angst vor der Kündigung haben. Eine Erlaubnis wäre für die Tiere die bessere Lösung, auch wenn sie den Vermietern mehr Arbeit macht.

Tobias Grabow: Ich habe selbst einen Hund und bin trotzdem gegen ein generelles Ja. In unserem Haus mit sechs Parteien geht das gut, weil wir uns kennen. In einem Block mit achtzig Wohnungen würde ich das nicht wollen. Die Größe des Hauses gehört in die Regel hinein.

Rosa Lienhard: Die Diskussion wird immer mit Hunden geführt. Bei uns war das Problem ein Papagei, der jeden Morgen um fünf angefangen hat. Nach acht Monaten ist die Familie freiwillig ausgezogen. Ohne die Möglichkeit, etwas zu untersagen, hätte niemand von uns geschlafen.

Jonas Feddersen: Vermieter dürfen schon heute jeden Einzelfall prüfen, und genau das tun sie nicht — sie schreiben pauschal Nein. Ein klares Ja mit Grenzen wäre ehrlicher als ein Verbot, das ohnehin ständig gebrochen wird.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-07-l4-20",
              no: 20,
              ref: "f1",
              text: "Marek D.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Kendi geçmişine rağmen dönmüş: \"war immer dagegen\", ama kendi verilerini görünce yasağı \"für ein Gefühl und nicht für eine Regel\" saymaya başlamış.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l4-21",
              no: 21,
              ref: "f1",
              text: "Susanne Rehm",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "İtirazı hayvana değil usule: genel izin \"nimmt genau dieses Gespräch weg\" diyor, yani komşuya sorma zorunluluğunu ortadan kaldırıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l4-22",
              no: 22,
              ref: "f1",
              text: "Ercan Yildirim",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Alerjisi var ama izinden yana: \"Ein Verbot hilft mir nämlich nicht\" — denetlenmeyen bir yasak onu korumuyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l4-23",
              no: 23,
              ref: "f1",
              text: "Frau Dr. Petrick",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Gizli hayvan bakımının sonucunu anlatıyor ve sonucu bağlıyor: \"Eine Erlaubnis wäre für die Tiere die bessere Lösung\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l4-24",
              no: 24,
              ref: "f1",
              text: "Tobias Grabow",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendi köpeği olduğu hâlde karşı: \"bin trotzdem gegen ein generelles Ja\". İtirazı büyüklüğe — seksen daireli blokta aynı düzen yürümez diyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l4-25",
              no: 25,
              ref: "f1",
              text: "Rosa Lienhard",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Yasaklama imkânını savunuyor: \"Ohne die Möglichkeit, etwas zu untersagen, hätte niemand von uns geschlafen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l4-26",
              no: 26,
              ref: "f1",
              text: "Jonas Feddersen",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Sınırlı bir izni yasağa yeğliyor: \"Ein klares Ja mit Grenzen wäre ehrlicher als ein Verbot\".",
            },
          ],
        },
        {
          id: "de-b1-07-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Hausordnung und die Aufgaben 27 bis 30. Wählen Sie a, b oder c.",
          promptTr: "Bina yönetmeliğini ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Hausordnung",
              genreTr: "Bina yönetmeliği",
              title: "Hausordnung — Wohnanlage Reuterstraße 14 bis 18",
              body: `1. Ruhezeiten
Von 22 bis 6 Uhr sowie sonntags ganztägig ist Lärm zu vermeiden. Musizieren ist außerhalb der Ruhezeiten bis zu zwei Stunden täglich erlaubt. Für Feiern gilt keine Ausnahme; ein Zettel im Treppenhaus ersetzt die Rücksicht nicht.

2. Treppenhaus und Flure
Fluchtwege müssen frei bleiben. Kinderwagen dürfen im Erdgeschoss abgestellt werden, Fahrräder nicht. Schuhe und Schränke vor der Wohnungstür sind nicht zulässig.

3. Waschküche
Die Belegung erfolgt über den Plan an der Tür. Ein Termin verfällt, wenn er dreißig Minuten nach Beginn nicht genutzt wird. Wäsche ist spätestens am Folgetag zu entnehmen.

4. Müll
Papier, Glas und Restmüll werden getrennt. Sperrmüll gehört nicht in den Hof; die Abholung ist selbst zu beauftragen. Wer Müll falsch entsorgt, trägt die Kosten der Nachsortierung.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-07-l5-27",
              no: 27,
              ref: "o1",
              text: "Wie lange darf man musizieren?",
              options: [
                "Täglich zwei Stunden, nur nicht sonntags.",
                "Sonntags bis zu zwei Stunden am Nachmittag.",
                "Höchstens eine Stunde, auch in den Ruhezeiten.",
              ],
              answer: 0,
              explain:
                "Kural iki koşulu birleştiriyor: \"bis zu zwei Stunden täglich\" ve sessizlik saatlerinin dışında. Pazar günü tamamen sessizlik saatidir, o yüzden müzik o gün hiç yapılamaz.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l5-28",
              no: 28,
              ref: "o1",
              text: "Was darf im Erdgeschoss abgestellt werden?",
              options: ["Fahrräder und Kinderwagen.", "Kinderwagen.", "Schuhe und Schränke."],
              answer: 1,
              explain:
                "Aynı cümle birini serbest bırakıp ötekini yasaklıyor: \"Kinderwagen dürfen im Erdgeschoss abgestellt werden, Fahrräder nicht\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l5-29",
              no: 29,
              ref: "o1",
              text: "Was passiert mit einem nicht genutzten Waschtermin?",
              options: [
                "Er wird auf den Folgetag übertragen.",
                "Er verfällt nach einer halben Stunde.",
                "Er bleibt bis zum Ende des Plans reserviert.",
              ],
              answer: 1,
              explain:
                "\"Ein Termin verfällt, wenn er dreißig Minuten nach Beginn nicht genutzt wird\" — otuz dakika yarım saat demek. Metindeki `Folgetag` çamaşırın alınmasına ait, randevunun aktarılmasına değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-l5-30",
              no: 30,
              ref: "o1",
              text: "Wer zahlt, wenn Müll falsch entsorgt wird?",
              options: ["Die Hausverwaltung.", "Alle Mietparteien zusammen.", "Die verursachende Person."],
              answer: 2,
              explain:
                "Son cümle sorumluyu tek kişiye bağlıyor: \"Wer Müll falsch entsorgt, trägt die Kosten der Nachsortierung\".",
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
          id: "de-b1-07-h1",
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
              situation: "Site yönetimi bir randevuyu erteliyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Trautmann, hier ist die Hausverwaltung Reuter. Der Termin für die Heizungsablesung am Mittwoch verschiebt sich auf Freitag, zur gleichen Zeit. Wenn Sie freitags arbeiten, können Sie den Zählerstand auch selbst fotografieren und uns schicken.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Ortak alanlarla ilgili bir araştırma aktarılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Untersuchung aus Leipzig zeigt: In Häusern mit einem Gemeinschaftsraum kennen die Bewohner im Schnitt doppelt so viele Nachbarn wie in vergleichbaren Häusern ohne. Auf die Zufriedenheit mit der Wohnung wirkt sich das allerdings kaum aus — dort zählt vor allem die Miete.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Sprachnachricht in der Hausgruppe",
              genreTr: "Bina grubunda sesli mesaj",
              situation: "Avludaki çalışmalar duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Hallo zusammen, kurze Info zum Hof: Die Bank ist repariert, aber der Sandkasten bleibt bis Ende Mai gesperrt. Der neue Sand kommt erst dann. Bitte sagt es euren Kindern, die Absperrung wird sonst jeden Tag verschoben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Mieterversammlung",
              genreTr: "Kiracı toplantısında duyuru",
              situation: "Oylama öncesi hatırlatma.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir abstimmen, ein Hinweis: Wer eine Vollmacht dabei hat, gibt sie bitte vorne ab. Ohne Vollmacht kann niemand für eine andere Partei stimmen. Und noch einmal: Es geht heute nur um das Dach, nicht um die Fassade.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Nakliye firması bir koşul bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Barsch, hier ist die Spedition Kranz. Für Ihren Umzug am Sechzehnten brauchen wir eine Halteverbotszone vor dem Haus. Die beantragen Sie selbst beim Ordnungsamt, das dauert zehn Werktage. Wenn Sie das nicht schaffen, müssen wir weiter weg parken, und das kostet extra.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-07-h1-1",
              no: 1,
              ref: "h1",
              text: "Der Termin findet jetzt am Freitag statt.",
              answer: true,
              explain:
                "Mesaj kaymayı doğrudan söylüyor: \"verschiebt sich auf Freitag, zur gleichen Zeit\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h1-2",
              no: 2,
              ref: "h1",
              text: "Was kann man tun, wenn man am Freitag arbeitet?",
              options: [
                "Einen dritten Termin verlangen.",
                "Den Stand selbst schicken.",
                "Den Schlüssel beim Nachbarn abgeben.",
              ],
              answer: 1,
              explain:
                "Alternatif mesajın sonunda: \"können Sie den Zählerstand auch selbst fotografieren und uns schicken\". Üçüncü randevudan hiç söz edilmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h1-3",
              no: 3,
              ref: "h2",
              text: "Ein Gemeinschaftsraum erhöht die Zufriedenheit mit der Wohnung deutlich.",
              answer: false,
              explain:
                "Araştırma ikisini ayırıyor: komşu tanıma iki katına çıkıyor, ama memnuniyete etkisi \"kaum\" — belirleyici olan kira.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h1-4",
              no: 4,
              ref: "h2",
              text: "Was zeigt die Untersuchung?",
              options: [
                "Man kennt mehr Nachbarn.",
                "Die Mieten sind dort niedriger.",
                "Die Bewohner ziehen seltener um.",
              ],
              answer: 0,
              explain:
                "Tek ölçülen sonuç bu: \"doppelt so viele Nachbarn wie in vergleichbaren Häusern ohne\". Kira bir açıklama olarak geçiyor, bir bulgu olarak değil.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h1-5",
              no: 5,
              ref: "h3",
              text: "Der Sandkasten kann wieder benutzt werden.",
              answer: false,
              explain:
                "Mesaj ikisini ayırıyor: bank tamir edilmiş ama \"der Sandkasten bleibt bis Ende Mai gesperrt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h1-6",
              no: 6,
              ref: "h3",
              text: "Warum bleibt der Sandkasten gesperrt?",
              options: [
                "Weil die Bank noch fehlt.",
                "Weil der Sand fehlt.",
                "Weil Kinder die Absperrung verschieben.",
              ],
              answer: 1,
              explain:
                "Gerekçe hemen arkasından geliyor: \"Der neue Sand kommt erst dann\". Bariyerin kaydırılması sonucun kendisi, sebebi değil.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h1-7",
              no: 7,
              ref: "h4",
              text: "Man kann ohne Vollmacht für eine andere Partei stimmen.",
              answer: false,
              explain:
                "Duyuru bunu kesin dille kapatıyor: \"Ohne Vollmacht kann niemand für eine andere Partei stimmen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h1-8",
              no: 8,
              ref: "h4",
              text: "Worüber wird heute abgestimmt?",
              options: ["Über das Dach.", "Über die Fassade.", "Über beides."],
              answer: 0,
              explain:
                "Konu açıkça sınırlanıyor: \"Es geht heute nur um das Dach, nicht um die Fassade\".",
            },
            {
              kind: "bool",
              id: "de-b1-07-h1-9",
              no: 9,
              ref: "h5",
              text: "Die Halteverbotszone muss der Kunde selbst beantragen.",
              answer: true,
              explain:
                "Sorumluluk müşteride: \"Die beantragen Sie selbst beim Ordnungsamt, das dauert zehn Werktage\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h1-10",
              no: 10,
              ref: "h5",
              text: "Was passiert ohne Halteverbotszone?",
              options: [
                "Der Umzug fällt aus.",
                "Der Termin verschiebt sich um zehn Tage.",
                "Es wird teurer.",
              ],
              answer: 2,
              explain:
                "Sonuç son cümlede: uzağa park etmek gerekiyor \"und das kostet extra\". On iş günü başvurunun süresi, ertelemenin değil.",
            },
          ],
        },
        {
          id: "de-b1-07-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Gespräch bei einer Wohnungsübergabe. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir daire teslimindeki konuşmayı dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch bei der Wohnungsübergabe",
              genreTr: "Daire tesliminde konuşma",
              situation: "Kiracı ile yönetici teslim tutanağını gözden geçiriyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Nolte", text: "Frau Adiga, dann gehen wir das Protokoll durch. Die Küche ist gestrichen, gut. Der Fleck im Flur — war der schon beim Einzug da?" },
                { speaker: "Frau Adiga", text: "Ja, das steht auch im alten Protokoll. Ich habe es mitgebracht." },
                { speaker: "Herr Nolte", text: "Perfekt, dann streichen wir das. Bleibt das Fenster im Bad. Der Griff ist ab." },
                { speaker: "Frau Adiga", text: "Der ist letzte Woche abgebrochen. Ich habe sofort angerufen, aber es ist niemand gekommen." },
                { speaker: "Herr Nolte", text: "Das notiere ich als offen. Die Kosten trägt in dem Fall die Verwaltung, weil wir nicht reagiert haben." },
                { speaker: "Frau Adiga", text: "Und die Kaution?" },
                { speaker: "Herr Nolte", text: "Die überweisen wir in der Regel nach drei Monaten. Wenn die Nebenkostenabrechnung noch offen ist, kann es länger dauern — bis zu einem Jahr." },
                { speaker: "Frau Adiga", text: "Ein Jahr? Das steht so nicht in meinem Vertrag." },
                { speaker: "Herr Nolte", text: "Im Vertrag steht die Frist für den Normalfall. Ich schicke Ihnen die Regel schriftlich, dann können Sie es prüfen lassen." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-07-h2-11",
              no: 11,
              ref: "g1",
              text: "Wie klärt sich der Fleck im Flur?",
              options: [
                "Frau Adiga bezahlt die Reinigung.",
                "Er stand im alten Protokoll.",
                "Er wird neu gestrichen.",
              ],
              answer: 1,
              explain:
                "Kiracı kanıtı yanında getirmiş: \"das steht auch im alten Protokoll\". Yönetici bunun üzerine maddeyi siliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h2-12",
              no: 12,
              ref: "g1",
              text: "Wer zahlt den abgebrochenen Fenstergriff?",
              options: ["Die Verwaltung.", "Frau Adiga.", "Beide je zur Hälfte."],
              answer: 0,
              explain:
                "Yönetici kendi kurumunu sorumlu tutuyor: \"Die Kosten trägt in dem Fall die Verwaltung\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h2-13",
              no: 13,
              ref: "g1",
              text: "Womit begründet Herr Nolte diese Entscheidung?",
              options: [
                "Weil der Griff schon sehr alt gewesen ist.",
                "Weil Frau Adiga ausgezogen ist.",
                "Weil niemand reagiert hat.",
              ],
              answer: 2,
              explain:
                "Gerekçe `weil` ile veriliyor: \"weil wir nicht reagiert haben\". Kiracı hemen aramış ama kimse gelmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h2-14",
              no: 14,
              ref: "g1",
              text: "Wann kommt die Kaution normalerweise zurück?",
              options: ["Sofort nach der Übergabe.", "Nach drei Monaten.", "Erst nach einem Jahr."],
              answer: 1,
              explain:
                "\"in der Regel nach drei Monaten\" — bir yıl istisna, yani aidat hesabı hâlâ açıksa geçerli olan süre.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h2-15",
              no: 15,
              ref: "g1",
              text: "Was schlägt Herr Nolte am Ende vor?",
              options: [
                "Den Mietvertrag nachträglich zu ändern.",
                "Die Kaution sofort zu zahlen.",
                "Die Regel schriftlich zu schicken.",
              ],
              answer: 2,
              explain:
                "Anlaşmazlık çözülmüyor, denetlenebilir hâle getiriliyor: \"Ich schicke Ihnen die Regel schriftlich, dann können Sie es prüfen lassen\".",
            },
          ],
        },
        {
          id: "de-b1-07-h3",
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
              situation: "Bir arabulucu komşu anlaşmazlıklarını anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Sagert",
                  text: "Ich bin seit elf Jahren Schiedsperson in diesem Bezirk. Zu mir kommen Menschen, bevor sie zum Gericht gehen — in vielen Bundesländern ist dieser Schritt bei Nachbarstreit sogar vorgeschrieben.",
                },
                {
                  speaker: "Frau Sagert",
                  text: "Der häufigste Anlass ist nicht Lärm, wie viele denken, sondern sind Bäume und Hecken. Ungefähr vier von zehn Fällen drehen sich um Pflanzen an der Grenze.",
                },
                {
                  speaker: "Frau Sagert",
                  text: "Die zweithäufigste Ursache ist der Geruch vom Grill. Lärm kommt erst an dritter Stelle.",
                },
                {
                  speaker: "Frau Sagert",
                  text: "Etwa zwei Drittel der Verfahren enden bei mir mit einer Einigung. Das klingt viel, hat aber einen Grund: Wer freiwillig kommt, will meistens schon eine Lösung.",
                },
                {
                  speaker: "Frau Sagert",
                  text: "Am schwierigsten sind Streitigkeiten, die älter als fünf Jahre sind. Da geht es längst nicht mehr um die Hecke.",
                },
                {
                  speaker: "Frau Sagert",
                  text: "Ein Rat: Schreiben Sie den ersten Brief nie am selben Abend. Ich habe kaum einen Fall gesehen, in dem ein spät abends geschriebener Brief geholfen hätte.",
                },
                {
                  speaker: "Frau Sagert",
                  text: "Und noch etwas: Eine Einigung bei mir ist rechtlich bindend. Viele glauben, es sei nur ein Gespräch. Das ist es nicht.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-07-h3-16",
              no: 16,
              ref: "v1",
              text: "Frau Sagert arbeitet seit über zehn Jahren als Schiedsperson.",
              answer: true,
              explain:
                "İlk cümle süreyi veriyor: \"seit elf Jahren Schiedsperson in diesem Bezirk\". On bir, ondan fazladır.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h3-17",
              no: 17,
              ref: "v1",
              text: "Der häufigste Streitgrund ist Lärm.",
              answer: false,
              explain:
                "Sunum tam bu yanılgıyı düzeltiyor: \"nicht Lärm, wie viele denken, sondern sind Bäume und Hecken\". Gürültü üçüncü sırada.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h3-18",
              no: 18,
              ref: "v1",
              text: "Etwa vierzig Prozent der Fälle betreffen Pflanzen.",
              answer: true,
              explain:
                "\"Ungefähr vier von zehn Fällen drehen sich um Pflanzen an der Grenze\" — onda dört, yüzde kırk demek.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h3-19",
              no: 19,
              ref: "v1",
              text: "Der Geruch vom Grill steht an dritter Stelle.",
              answer: false,
              explain:
                "Sıra tersine: koku \"die zweithäufigste Ursache\", üçüncü sıradaki gürültü.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h3-20",
              no: 20,
              ref: "v1",
              text: "Ungefähr zwei von drei Verfahren enden mit einer Einigung.",
              answer: true,
              explain:
                "\"Etwa zwei Drittel der Verfahren enden bei mir mit einer Einigung\" — konuşmacı bunun sebebini de ekliyor: gönüllü gelen zaten çözüm istiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-07-h3-21",
              no: 21,
              ref: "v1",
              text: "Alte Streitigkeiten lassen sich besonders leicht klären.",
              answer: false,
              explain:
                "Tam tersi: \"Am schwierigsten sind Streitigkeiten, die älter als fünf Jahre sind\".",
            },
            {
              kind: "bool",
              id: "de-b1-07-h3-22",
              no: 22,
              ref: "v1",
              text: "Eine Einigung bei der Schiedsperson ist rechtlich bindend.",
              answer: true,
              explain:
                "Sunum bir yanılgıyla kapanıyor: \"Eine Einigung bei mir ist rechtlich bindend. Viele glauben, es sei nur ein Gespräch.\"",
            },
          ],
        },
        {
          id: "de-b1-07-h4",
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
              situation: "Alt kiraya verme konusu tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Herr Wienert, warum ist Untervermietung so ein Streitthema?" },
                {
                  speaker: "Herr Wienert",
                  text: "Weil zwei Interessen aufeinandertreffen. Der Vermieter will wissen, wer in seinem Haus wohnt. Der Mieter will nicht für eine leere Wohnung zahlen, wenn er ein halbes Jahr im Ausland arbeitet. Beides ist verständlich.",
                },
                { speaker: "Moderatorin", text: "Frau Dallmann, Sie sagen Nein?" },
                {
                  speaker: "Frau Dallmann",
                  text: "Nicht grundsätzlich. Ich sage Nein, wenn ich den Namen erst erfahre, nachdem jemand eingezogen ist. Bei zwei von sechs Wohnungen ist mir das passiert. Wer vorher fragt, bekommt bei mir fast immer ein Ja.",
                },
                { speaker: "Moderatorin", text: "Herr Wienert, ist das nicht ein fairer Umgang?" },
                {
                  speaker: "Herr Wienert",
                  text: "Doch, durchaus. Nur ist Frau Dallmann nicht der Normalfall. In unserer Beratung sehen wir vor allem pauschale Absagen ohne Begründung. Und die sind rechtlich oft gar nicht haltbar.",
                },
                { speaker: "Moderatorin", text: "Was raten Sie den Mietern?" },
                {
                  speaker: "Herr Wienert",
                  text: "Schriftlich fragen, mit Namen und Zeitraum, und die Antwort abwarten. Wer ohne Erlaubnis untervermietet, riskiert die Kündigung — auch wenn er im Recht gewesen wäre.",
                },
                { speaker: "Moderatorin", text: "Frau Dallmann, was ärgert Sie am meisten?" },
                {
                  speaker: "Frau Dallmann",
                  text: "Ehrlich? Nicht die Untermieter. Die Kurzzeitvermietung an Touristen. Das ist etwas anderes, und es wird ständig in einen Topf geworfen.",
                },
                { speaker: "Herr Wienert", text: "Da sind wir uns einig. Das ist kein Wohnen mehr, das ist ein Gewerbe." },
                { speaker: "Moderatorin", text: "Und der Preis? Darf der Mieter etwas verdienen?" },
                {
                  speaker: "Herr Wienert",
                  text: "Ein kleiner Aufschlag für Möbel ist üblich. Wer aber das Doppelte nimmt, verliert vor Gericht — und meistens auch die Wohnung.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-07-h4-23",
              no: 23,
              ref: "d1",
              text: "Warum ist das Thema nach Herrn Wienert schwierig?",
              options: [
                "Weil das Gesetz sehr unklar formuliert ist.",
                "Weil zwei Interessen kollidieren.",
                "Weil Vermieter selten reagieren.",
              ],
              answer: 1,
              explain:
                "İlk cümlesi bunu söylüyor: \"Weil zwei Interessen aufeinandertreffen\" — ve ikisini de anlaşılır buluyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-24",
              no: 24,
              ref: "d1",
              text: "Wann sagt Frau Dallmann Nein?",
              options: [
                "Grundsätzlich immer.",
                "Wenn der Untermieter jünger als dreißig ist.",
                "Wenn sie es erst hinterher erfährt.",
              ],
              answer: 2,
              explain:
                "Koşulu kendisi kuruyor: \"wenn ich den Namen erst erfahre, nachdem jemand eingezogen ist\". Önceden soran neredeyse hep onay alıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie bewertet Herr Wienert diesen Umgang?",
              options: [
                "Er hält ihn für fair, aber selten.",
                "Er hält ihn für eindeutig gesetzwidrig.",
                "Er hält ihn für viel zu großzügig.",
              ],
              answer: 0,
              explain:
                "Önce onaylıyor — \"Doch, durchaus\" — sonra sınırlıyor: \"Nur ist Frau Dallmann nicht der Normalfall\".",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-26",
              no: 26,
              ref: "d1",
              text: "Was sieht der Mieterverein in der Beratung meistens?",
              options: [
                "Gut begründete Absagen.",
                "Absagen ohne Begründung.",
                "Zustimmung ohne Bedingungen.",
              ],
              answer: 1,
              explain:
                "\"vor allem pauschale Absagen ohne Begründung\" — üstelik bunların hukuken çoğu zaman geçersiz olduğunu da ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-27",
              no: 27,
              ref: "d1",
              text: "Was rät Herr Wienert den Mietern?",
              options: [
                "Einfach ohne Nachfrage untervermieten.",
                "Zuerst zum Gericht gehen.",
                "Schriftlich fragen und warten.",
              ],
              answer: 2,
              explain:
                "Öğüdü iki adımlı: \"Schriftlich fragen, mit Namen und Zeitraum, und die Antwort abwarten\" — izinsiz hareket haklı olsa bile fesih riski taşıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-28",
              no: 28,
              ref: "d1",
              text: "Was ärgert Frau Dallmann am meisten?",
              options: [
                "Die Untermieter und ihre Gäste.",
                "Die Kurzzeitvermietung.",
                "Die hohen Nebenkosten.",
              ],
              answer: 1,
              explain:
                "Kendi ayrımını yapıyor: \"Nicht die Untermieter. Die Kurzzeitvermietung an Touristen.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-29",
              no: 29,
              ref: "d1",
              text: "Worin sind sich die beiden einig?",
              options: [
                "Dass Kurzzeitvermietung etwas anderes ist.",
                "Dass Untervermietung grundsätzlich verboten gehört.",
                "Dass Vermieter mehr Rechte brauchen.",
              ],
              answer: 0,
              explain:
                "Herr Wienert araya giriyor: \"Da sind wir uns einig. Das ist kein Wohnen mehr, das ist ein Gewerbe.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-07-h4-30",
              no: 30,
              ref: "d1",
              text: "Was sagt Herr Wienert über den Preis?",
              options: [
                "Jeder Aufschlag ist verboten.",
                "Der Preis darf frei bestimmt werden.",
                "Ein kleiner Aufschlag ist üblich.",
              ],
              answer: 2,
              explain:
                "Sınırı çiziyor: mobilya için küçük bir fark olağan, ama \"Wer aber das Doppelte nimmt, verliert vor Gericht\".",
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
          id: "de-b1-07-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Nachbarin Frau Trautmann schlägt vor, im Hof einen Gemeinschaftsgarten anzulegen. Sie finden die Idee gut, haben aber Bedenken. Schreiben Sie ihr (circa 80 Wörter).",
          promptTr:
            "Komşun Frau Trautmann avluda ortak bir bahçe kurmayı öneriyor. Fikri iyi buluyorsun ama çekincelerin var. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Reagieren Sie auf den Vorschlag.", tr: "Öneriye karşılık ver." },
              { de: "Nennen Sie Ihre Bedenken.", tr: "Çekincelerini söyle." },
              { de: "Machen Sie einen konkreten Gegenvorschlag.", tr: "Somut bir karşı öneri sun." },
              { de: "Fragen Sie nach ihrer Meinung.", tr: "Onun görüşünü sor." },
            ],
            sample: `Liebe Frau Trautmann,

Ihre Idee mit dem Gemeinschaftsgarten gefällt mir sehr. Der Hof steht seit Jahren leer, und ein paar Beete würden ihn deutlich freundlicher machen.

Zwei Dinge machen mir allerdings Sorgen. Erstens brauchen Beete im Sommer fast täglich Wasser, und im Moment ist dafür niemand zuständig. Zweitens stehen im hinteren Teil die Fahrräder — wenn wir dort pflanzen, fehlt der Platz.

Mein Vorschlag wäre, mit vier Hochbeeten an der Südseite anzufangen und einen Gießplan an die Haustür zu hängen. Nach einem Sommer sehen wir weiter.

Was halten Sie davon?

Viele Grüße
Ana Brahim`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Çekinceler somut mu (sulama sorumluluğu, yer sıkıntısı), yoksa genel bir tereddüt mü?",
              "Karşı öneri uygulanabilir ve ölçülebilir mi (kaç tarh, hangi düzen)?",
              "Komşuya yazıldığı için `Sie` kullanılıp ton sıcak tutulmuş mu?",
              "Yaklaşık 80 kelime var mı ve soru gerçekten sorulmuş mu?",
            ],
          },
        },
        {
          id: "de-b1-07-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Schreiben Sie einen Beitrag für die Hauszeitung: Was macht gutes Zusammenleben in einem Mietshaus aus? (circa 80 Wörter)",
          promptTr:
            "Bina gazetesi için bir yazı yaz: Kiralık bir binada iyi bir birlikte yaşamayı ne sağlar? (yaklaşık 80 kelime)",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie ein Beispiel aus Ihrer Erfahrung.", tr: "Kendi deneyiminden bir örnek ver." },
              { de: "Sagen Sie, was Ihrer Meinung nach am wichtigsten ist.", tr: "Sence en önemlisinin ne olduğunu söyle." },
              { de: "Nennen Sie etwas, das oft schiefgeht.", tr: "Sık sık ters giden bir şeyi söyle." },
              { de: "Geben Sie einen konkreten Rat.", tr: "Somut bir öneride bulun." },
            ],
            sample: `Als ich hier eingezogen bin, hat mir eine Nachbarin am zweiten Tag gezeigt, wie der Müllplan funktioniert. Das klingt klein, aber ich habe mich sofort weniger fremd gefühlt.

Am wichtigsten finde ich, dass man Dinge anspricht, solange sie noch klein sind. Wer drei Monate schweigt und dann einen Zettel schreibt, hat schon verloren.

Schief geht es meistens bei der Waschküche. Dort treffen feste Pläne auf Menschen mit Schichtdienst.

Mein Rat: Klopfen Sie an, bevor Sie schreiben. Ein Gespräch dauert fünf Minuten, ein Streit dauert Jahre.`,
            criteria: [
              "Dört içerik noktası da işlendi mi?",
              "Örnek gerçekten kişisel bir sahne mi, yoksa genel bir cümle mi?",
              "Ters giden şey somut bir yerde mi geçiyor (çamaşırhane, çöp, avlu)?",
              "Öğüt uygulanabilir mi ve yazının kalanıyla tutarlı mı?",
              "Yaklaşık 80 kelime var mı ve metin bir gazete yazısı gibi mi kurulmuş?",
            ],
          },
        },
        {
          id: "de-b1-07-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Die Hausverwaltung hat eine Wohnungsbesichtigung für Donnerstagvormittag angesetzt. Da arbeiten Sie. Schreiben Sie eine kurze Mail (circa 40 Wörter).",
          promptTr:
            "Site yönetimi perşembe sabahına daire gösterimi koydu; o saatte çalışıyorsun. Kısa bir e-posta yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Sagen Sie, warum Sie schreiben.", tr: "Neden yazdığını söyle." },
              { de: "Bitten Sie um einen anderen Termin.", tr: "Başka bir gün iste." },
              { de: "Nennen Sie zwei mögliche Zeiten.", tr: "İki uygun zaman öner." },
            ],
            sample: `Sehr geehrte Damen und Herren,

Sie haben die Besichtigung für Donnerstag, 10 Uhr, angesetzt. Zu dieser Zeit bin ich leider im Dienst und kann niemanden hereinlassen.

Möglich wären bei mir Donnerstag ab 17 Uhr oder Samstagvormittag.

Bitte sagen Sie mir kurz Bescheid, welcher Termin Ihnen passt.

Mit freundlichen Grüßen
Ana Brahim`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî bir e-posta olarak kurulmuş mu (hitap, `Sie`, veda)?",
              "Reddin gerekçesi kısa ve somut mu?",
              "İki alternatif gerçekten iki farklı zaman mı?",
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
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, einen kurzen Vortrag halten, auf eine Beschwerde reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte planlama, kısa sunum, bir şikâyete karşılık verme.",
      tasks: [
        {
          id: "de-b1-07-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam ein Hoffest für Ihr Haus. Sprechen Sie über: Termin — Essen — Musik und Ruhezeiten — Wer lädt die Nachbarn ein?",
          promptTr:
            "Binanız için birlikte bir avlu şenliği planla. Şunları konuş: tarih — yemek — müzik ve sessizlik saatleri — komşuları kim davet edecek?",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen das Hoffest. Zuerst der Termin: Im Juni ist fast jedes Wochenende belegt. Was schlagen Sie vor?",
              tr: "Avlu şenliğini birlikte planlıyoruz. Önce tarih: Haziranda neredeyse her hafta sonu dolu. Ne önerirsin?",
            },
            { who: "you", hint: "Somut bir tarih öner ve bu itirazı hesaba kat.", expect: "somut bir tarih önermek ve bir itirazı dikkate almak", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Und das Essen? Ich möchte nicht, dass wieder eine Person alles kocht.",
              tr: "Peki. Yemek ne olacak? Yine her şeyi tek kişinin pişirmesini istemiyorum.",
            },
            { who: "you", hint: "Yemek için bir düzen öner ve yükü paylaştır.", expect: "yükü paylaştıran somut bir düzen önermek", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Jetzt die Musik. Im Erdgeschoss wohnt eine Familie mit einem Baby.",
              tr: "Anlaştık. Şimdi müzik. Zemin katta bebekli bir aile oturuyor.",
            },
            { who: "you", hint: "Müzik için bir sınır öner ve gerekçelendir.", expect: "bir saat sınırı önermek ve gerekçelendirmek", seconds: 45 },
            {
              who: "partner",
              de: "Bleibt die Einladung. Nicht alle sind in der Hausgruppe, und ich kenne die im Seitenflügel kaum.",
              tr: "Geriye davet kaldı. Herkes bina grubunda değil ve yan kanattakileri pek tanımıyorum.",
            },
            { who: "you", hint: "Kimsenin atlanmayacağı bir davet yolu öner ve bir işi üstlen.", expect: "kimseyi dışarıda bırakmayan bir yol önermek ve bir işi üstlenmek", seconds: 35 },
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
              "Ich schlage den letzten Samstag im Juni vor, da ist noch nichts eingetragen. Beim Essen machen wir es als Buffet: Jede Wohnung bringt eine Sache mit, und ich hänge eine Liste auf, damit wir nicht fünf Kartoffelsalate haben. Musik bis zweiundzwanzig Uhr, danach nur noch reden — mit einem Baby im Erdgeschoss finde ich das fair. Für die Einladung stecke ich Zettel in alle Briefkästen, auch im Seitenflügel; auf die Hausgruppe allein können wir uns nicht verlassen.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu (tarih, saat, düzen), yoksa genel onay mı?",
              "Her itiraz (dolu takvim, tek kişinin yükü, bebek, tanınmayan komşular) gerçekten karşılandı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Öneri ve gerekçe kalıpları kullanıldı mı? (Ich schlage vor …, damit …, weil …)",
            ],
          },
        },
        {
          id: "de-b1-07-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag: Wohnen in der Stadt oder auf dem Land? Sprechen Sie über Vorteile, Nachteile und Ihre eigene Erfahrung. Sprechen Sie etwa drei Minuten.",
          promptTr:
            "Kısa bir sunum yap: Şehirde mi kırsalda mı yaşamalı? Avantajları, dezavantajları ve kendi deneyimini anlat. Yaklaşık üç dakika konuş.",
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
              "In der Stadt ist alles nah: Arzt, Kurs, Arbeit. Ich brauche kein Auto und komme abends um elf noch nach Hause. Dafür ist die Wohnung klein und teuer, und ich kenne kaum jemanden im Haus. Auf dem Land war das umgekehrt. Ich habe zwei Jahre in einem Dorf gewohnt: viel Platz, günstige Miete, und nach drei Wochen kannte mich der halbe Ort. Aber der letzte Bus fuhr um achtzehn Uhr, und für jeden Termin brauchte ich jemanden mit Auto. Für mich überwiegt heute die Stadt, weil ich unabhängig sein möchte. Wenn ich Kinder hätte, würde ich vielleicht anders entscheiden.",
            criteria: [
              "Her iki taraf da gerçekten anlatıldı mı, yoksa biri tek cümlede mi geçildi?",
              "Kendi deneyimi somut mu (yer, süre, olay)?",
              "Konum gerekçelendirildi mi ve gerekçe anlatılanlarla tutarlı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (dafür, dagegen, umgekehrt, überwiegt)",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-07-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf eine Beschwerde. Ihr Nachbar sagt, Ihre Waschmaschine laufe zu oft am Abend. Hören Sie zu, antworten Sie und suchen Sie eine Lösung.",
          promptTr:
            "Bir şikâyete karşılık ver. Komşun çamaşır makineni akşamları çok sık çalıştırdığını söylüyor. Dinle, cevap ver ve bir çözüm ara.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Entschuldigen Sie, ich muss etwas ansprechen. Ihre Waschmaschine läuft fast jeden Abend nach zweiundzwanzig Uhr. Mein Schlafzimmer liegt direkt darunter.",
              tr: "Affedersin, bir şeyi konuşmam gerek. Çamaşır makinen neredeyse her akşam yirmi ikiden sonra çalışıyor. Yatak odam tam altında.",
            },
            {
              who: "you",
              hint: "Şikâyeti kabul et ve kendi durumunu da açıkla.",
              expect: "şikâyeti savunmaya geçmeden kabul etmek ve kendi durumunu açıklamak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Das verstehe ich, aber ich stehe um fünf auf. Und es ist ja nicht einmal die Woche, sondern fast täglich.",
              tr: "Anlıyorum ama ben beşte kalkıyorum. Üstelik haftada bir değil, neredeyse her gün oluyor.",
            },
            {
              who: "you",
              hint: "İtirazı ciddiye al ve somut bir çözüm öner.",
              expect: "itirazı ciddiye almak ve uygulanabilir bir çözüm önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Und wenn es doch mal spät wird? Ich möchte nicht jedes Mal klopfen müssen.",
              tr: "Peki yine geç olursa? Her seferinde kapını çalmak istemiyorum.",
            },
            {
              who: "you",
              hint: "İstisnalar için bir anlaşma öner.",
              expect: "istisna durumlar için basit bir anlaşma önermek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "eine Beschwerde annehmen", tr: "Şikâyeti kabul etmek" },
              { de: "die eigene Lage erklären", tr: "Kendi durumunu açıklamak" },
              { de: "eine Lösung aushandeln", tr: "Bir çözüm üzerinde anlaşmak" },
            ],
            sample:
              "Das tut mir leid, davon wusste ich nichts. Ich arbeite bis halb neun und komme erst um neun nach Hause, deshalb ist es bei mir immer spät geworden. Ab jetzt stelle ich die Maschine morgens vor der Arbeit an, dann ist sie um sieben fertig. Und wenn es doch einmal spät wird, schreibe ich Ihnen kurz eine Nachricht — dann müssen Sie nicht klopfen. Sagen Sie mir bitte auch, wenn es trotzdem stört.",
            criteria: [
              "Şikâyet savunmaya geçmeden kabul edildi mi?",
              "Kendi durumu bir mazeret değil bir açıklama olarak sunuldu mu?",
              "Çözüm somut ve uygulanabilir mi (saat değişikliği, haber verme)?",
              "İstisnalar için bir düzen önerildi mi?",
              "Ton nazik ve konuşmayı sürdürmeye açık mı?",
            ],
          },
        },
      ],
    },
  ],
};
