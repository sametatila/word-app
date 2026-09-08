import type { MockPaper } from "../types";

/**
 * B1 · Deneme 6 — "Geld und Konsum".
 *
 * PLAN kâğıt 1–5 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 gist · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karışık · 5 danışma · 7 R/F sunum · 8 tartışma)
 *   Schreiben 60 dk           (80 + 80 + 40 kelime)
 *   Sprechen  15 dk           planlama · sunum · soruna tepki
 *
 * KONU SEÇİMİ: tüketim, B1'in ayırt edici becerisini doğal olarak
 * gerektiriyor — bir görüşün gerekçesini sonuna kadar izlemek. Forum
 * yorumlarının çoğu kendi tarafının bir zayıflığını da adlandırıyor.
 */
export const B1_06: MockPaper = {
  id: "de-b1-06",
  course: "de",
  level: "B1",
  no: 6,
  theme: "Geld und Konsum",
  themeTr: "Para ve tüketim",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Erfahrungsbericht, zwei Meinungstexte, Anzeigen, Forumsbeiträge und Rückgabebedingungen.",
      instructionTr:
        "Bu bölümde beş görev var. Bir deneyim yazısı, iki görüş metni, ilanlar, forum yorumları ve iade koşulları okuyacaksın.",
      tasks: [
        {
          id: "de-b1-06-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Metni ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Ein Jahr ohne neue Kleidung",
              body: `Angefangen hat es nicht mit einer Überzeugung, sondern mit einem Umzug. Beim Packen standen dreizehn Kartons mit Kleidung im Flur, und ich habe gemerkt, dass ich die Hälfte davon seit Jahren nicht getragen hatte.

Ich habe mir vorgenommen, zwölf Monate nichts Neues zu kaufen. Erlaubt waren Secondhand, Reparaturen und Socken. Diese drei Ausnahmen klingen nach Schummeln und waren der Grund, warum ich durchgehalten habe.

Die ersten Wochen waren leicht. Schwierig wurde es im November, als bei einer Kollegin eine Hochzeit anstand und ich nichts Passendes hatte. Ich habe mir ein Kleid geliehen. Das war mir peinlich, bis die Braut mir erzählte, dass ihr eigenes Kleid ebenfalls geliehen war.

Gespart habe ich weniger, als ich dachte: knapp vierhundert Euro. Das liegt daran, dass ich vorher gar nicht so viel gekauft hatte, wie ich glaubte. Zwei Drittel meiner Kartons stammten aus einer einzigen Phase vor sechs Jahren.

Verändert hat sich etwas anderes. Ich kenne jetzt eine Schneiderin in meiner Straße, und drei Hosen, die ich weggeworfen hätte, trage ich wieder. Reparieren kostet Zeit, aber es kostet weniger Entscheidungen.

Heute kaufe ich wieder Neues, aber selten. Wenn mich jemand nach dem Jahr fragt, sage ich nicht, dass ich Geld gespart habe. Ich sage, dass mein Schrank endlich zu mir passt.`,
              gloss: [
                { de: "sich vornehmen", tr: "kendine söz vermek", en: "to resolve to" },
                { de: "schummeln", tr: "hile yapmak", en: "to cheat" },
                { de: "anstehen", tr: "yaklaşmak, gündeme gelmek", en: "to be coming up" },
                { de: "die Schneiderin", tr: "terzi", en: "seamstress" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-06-l1-1",
              no: 1,
              ref: "t1",
              text: "Der Anlass für den Versuch war ein Umzug.",
              answer: true,
              explain:
                "İlk cümle bunu söylüyor: \"nicht mit einer Überzeugung, sondern mit einem Umzug\". Koridordaki on üç koli yazarın kararını tetikliyor.",
            },
            {
              kind: "bool",
              id: "de-b1-06-l1-2",
              no: 2,
              ref: "t1",
              text: "Während des Jahres waren keinerlei Ausnahmen erlaubt.",
              answer: false,
              explain:
                "Üç istisna baştan tanımlı: \"Secondhand, Reparaturen und Socken\". Yazar bu istisnaları dayanabilmesinin sebebi olarak gösteriyor.",
            },
            {
              kind: "bool",
              id: "de-b1-06-l1-3",
              no: 3,
              ref: "t1",
              text: "Für die Hochzeit hat er sich etwas geliehen.",
              answer: true,
              explain:
                "Kasımdaki düğün için uygun bir şeyi yokmuş: \"Ich habe mir ein Kleid geliehen\". Gelinin de ödünç aldığını öğrenince utancı geçiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-06-l1-4",
              no: 4,
              ref: "t1",
              text: "Die Ersparnis war größer als erwartet.",
              answer: false,
              explain:
                "Tam tersi: \"Gespart habe ich weniger, als ich dachte: knapp vierhundert Euro\". Sebebi de eskiden sandığı kadar çok almamış olması.",
            },
            {
              kind: "bool",
              id: "de-b1-06-l1-5",
              no: 5,
              ref: "t1",
              text: "Ein großer Teil seiner Kleidung stammt aus einer kurzen Phase.",
              answer: true,
              explain:
                "Metin oranı veriyor: \"Zwei Drittel meiner Kartons stammten aus einer einzigen Phase vor sechs Jahren\".",
            },
            {
              kind: "bool",
              id: "de-b1-06-l1-6",
              no: 6,
              ref: "t1",
              text: "Heute kauft er grundsätzlich nichts Neues mehr.",
              answer: false,
              explain:
                "Son paragraf sınırlıyor: \"Heute kaufe ich wieder Neues, aber selten\". Yani tümden bir vazgeçiş değil.",
            },
          ],
        },
        {
          id: "de-b1-06-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 7 bis 12. Wählen Sie: a, b oder c.",
          promptTr: "İki metni ve 7–12. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Secondhand kaufen und trotzdem zu viel besitzen",
              body: `Ich kaufe seit sechs Jahren fast nur gebraucht. Lange habe ich das für die Lösung gehalten. Inzwischen ist mein Keller voll, und ich muss zugeben: Das Problem war nie der Neupreis.

Gebrauchte Dinge sind billig, und billig heißt, dass man leichter Ja sagt. Ein Pullover für vier Euro wird nicht geprüft, er wird mitgenommen. So sind bei mir in einem Jahr elf Pullover zusammengekommen, von denen ich drei trage.

Man wendet ein, das sei immer noch besser als neu zu kaufen. Für die Umwelt stimmt das vermutlich. Für meine Wohnung und für meine Zeit stimmt es nicht.

Geändert habe ich deshalb nicht, wo ich kaufe, sondern wann. Ich gehe nur noch mit einer Liste in den Laden, und ich gehe nicht mehr, wenn ich schlecht gelaunt bin. Das klingt banal und hat mehr gebracht als sechs Jahre Secondhand.

Trotzdem gehe ich weiter dorthin. Nicht weil es günstig ist, sondern weil ich dort etwas finde, das es sonst nicht gibt. Der Preis war nie der Grund — ich habe ihn nur lange dafür gehalten.`,
              gloss: [
                { de: "zugeben", tr: "kabul etmek, itiraf etmek", en: "to admit" },
                { de: "einwenden", tr: "itiraz etmek", en: "to object" },
                { de: "banal", tr: "sıradan, basmakalıp", en: "banal" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Leserbrief",
              genreTr: "Okur mektubu",
              title: "Reparieren darf nicht teurer sein als Wegwerfen",
              body: `Sie haben geschrieben, die Menschen seien zu bequem geworden und würfen zu schnell weg. Als Elektrotechniker mit einer kleinen Werkstatt sehe ich das jeden Tag anders.

Letzte Woche kam eine Kundin mit einer Kaffeemaschine. Das Ersatzteil kostet neunundzwanzig Euro, meine Arbeit vierzig. Ein neues Gerät derselben Marke kostet neunundfünfzig. Die Frau war nicht bequem, sie hat gerechnet.

Man müsste also nicht die Menschen ändern, sondern die Rechnung. In Österreich gibt es einen Bonus, der die Hälfte der Reparaturkosten übernimmt. Bei uns wurde ein ähnliches Programm nach acht Monaten wieder eingestellt.

Dass ich davon profitieren würde, gebe ich offen zu. Nur nützt es mir wenig, wenn ich Geräte repariere, die danach trotzdem im Keller stehen. Entscheidend ist etwas anderes: Hersteller müssten Ersatzteile zehn Jahre lang liefern. Bei einem Drittel meiner Aufträge scheitert die Reparatur nicht am Preis, sondern daran, dass es das Teil nicht mehr gibt.

Solange das so bleibt, ist der Vorwurf an die Kundschaft billig — im doppelten Sinn.`,
              gloss: [
                { de: "das Ersatzteil", tr: "yedek parça", en: "spare part" },
                { de: "einstellen (ein Programm)", tr: "(programı) durdurmak", en: "to discontinue" },
                { de: "die Kundschaft", tr: "müşteriler", en: "customers" },
                { de: "der Vorwurf", tr: "suçlama", en: "accusation" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-06-l2-7",
              no: 7,
              ref: "t2",
              text: "Was hat die Autorin über Secondhand gelernt?",
              options: [
                "Gebrauchte Sachen halten weniger lange.",
                "Secondhand ist am Ende teurer als neu.",
                "Billig macht das Ja leichter.",
              ],
              answer: 2,
              explain:
                "\"billig heißt, dass man leichter Ja sagt\" — dört euroluk kazak denetlenmeden alınıyor. Kalite ve toplam maliyet metinde tartışılmıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l2-8",
              no: 8,
              ref: "t2",
              text: "Wie geht sie mit dem Einwand um, gebraucht sei besser als neu?",
              options: [
                "Sie hält ihn für falsch, weil ihr Keller voll ist.",
                "Sie akzeptiert ihn nur teilweise.",
                "Sie hält ihn für unwichtig.",
              ],
              answer: 1,
              explain:
                "\"Für die Umwelt stimmt das vermutlich. Für meine Wohnung und für meine Zeit stimmt es nicht.\" Yani itirazı kısmen kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l2-9",
              no: 9,
              ref: "t2",
              text: "Was hat sie tatsächlich verändert?",
              options: [
                "Den Zeitpunkt ihrer Einkäufe.",
                "Den Ort, an dem sie einkauft.",
                "Die Menge, die sie monatlich ausgibt.",
              ],
              answer: 0,
              explain:
                "Değişen şey nerede değil ne zaman: listeyle gidiyor ve keyifsizken gitmiyor. \"Geändert habe ich deshalb nicht, wo ich kaufe, sondern wann.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l2-10",
              no: 10,
              ref: "t3",
              text: "Was zeigt das Beispiel mit der Kaffeemaschine?",
              options: [
                "Die Kundin hat sich falsch entschieden.",
                "Reparieren dauert länger als Neukaufen.",
                "Reparieren rechnet sich nicht.",
              ],
              answer: 2,
              explain:
                "Sayılar karşılaştırılıyor: 29 artı 40 euroya karşı 59 euroluk yeni cihaz. Yazar da \"Die Frau war nicht bequem, sie hat gerechnet\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l2-11",
              no: 11,
              ref: "t3",
              text: "Wie steht er zu seinem eigenen Interesse?",
              options: [
                "Er verschweigt es bewusst.",
                "Er nennt es offen.",
                "Er bestreitet, dass es eines gibt.",
              ],
              answer: 1,
              explain:
                "Programdan kazançlı çıkacağını kendisi söylüyor (\"gebe ich offen zu\") ve hemen sınırlıyor: bodruma kalkacak cihazları onarmak ona bir şey kazandırmaz.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l2-12",
              no: 12,
              ref: "t3",
              text: "Was hält er für die wichtigste Maßnahme?",
              options: [
                "Einen Bonus für Reparaturkosten.",
                "Höhere Preise für neue Geräte.",
                "Ersatzteile über zehn Jahre.",
              ],
              answer: 2,
              explain:
                "\"Entscheidend ist etwas anderes\" diyor ve on yıllık yedek parça yükümlülüğünü öne çıkarıyor; işlerinin üçte birinde parça bulunamıyor.",
            },
          ],
        },
        {
          id: "de-b1-06-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot rund um Einkaufen und Geld. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler alışveriş ve parayla ilgili bir hizmet arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Repair-Café im Stadtteilhaus",
              body: "Jeden zweiten Samstag, 14 bis 17 Uhr. Wir helfen beim Reparieren, wir reparieren nicht für Sie. Werkzeug vorhanden, Ersatzteile bringen Sie selbst mit. Kostenlos, Spende erwünscht.",
            },
            {
              key: "b",
              label: "Kleiderbörse für Kinder",
              body: "Zweimal im Jahr, im März und September. Verkauf gebrauchter Kinderkleidung bis Größe 176. Wer verkaufen will, meldet sich vier Wochen vorher an und zahlt 5 Euro Standgebühr.",
            },
            {
              key: "c",
              label: "Haushaltsbuch-Kurs",
              body: "Fünf Abende, mittwochs 18 bis 20 Uhr. Wir schauen gemeinsam auf Ihre festen Kosten und finden Sparmöglichkeiten. 30 Euro, mit Bescheinigung der Kasse kostenlos.",
            },
            {
              key: "d",
              label: "Möbel aus zweiter Hand",
              body: "Große Halle am Hafen, geöffnet Di bis Sa. Lieferung innerhalb der Stadt für 25 Euro. Abholung nur mit eigenem Transporter möglich.",
            },
            {
              key: "e",
              label: "Schuldnerberatung der Stadt",
              body: "Kostenlose Beratung bei offenen Rechnungen und Mahnungen. Termine nach Vereinbarung, Wartezeit derzeit vier Wochen. Bringen Sie alle Briefe mit.",
            },
            {
              key: "f",
              label: "Werkzeug leihen statt kaufen",
              body: "Bohrmaschine, Leiter, Nähmaschine und mehr. Erste drei Tage kostenlos, danach 2 Euro pro Tag. Mitgliedschaft 15 Euro im Jahr.",
            },
            {
              key: "g",
              label: "Onlineshop-Beratung",
              body: "Wir prüfen mit Ihnen Verträge, Rückgabefristen und Bewertungen. Einzeltermin 30 Minuten, 20 Euro. Auch telefonisch.",
            },
            {
              key: "h",
              label: "Tauschregal in der Bibliothek",
              body: "Bücher, Spiele und CDs. Nehmen Sie mit, was Sie brauchen, bringen Sie mit, was Sie nicht mehr brauchen. Immer offen, kein Ausweis nötig.",
            },
            {
              key: "i",
              label: "Nähkurs für Anfänger",
              body: "Sechs Termine, donnerstags 17 bis 19 Uhr. Reißverschluss, Saum und einfache Änderungen. Maschinen stehen zur Verfügung, 70 Euro.",
            },
            {
              key: "j",
              label: "Flohmarkt am Fluss",
              body: "Jeden ersten Sonntag von April bis Oktober, ab 7 Uhr. Standplatz 12 Euro, Anmeldung online. Keine gewerblichen Händler.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-06-l3-13",
              no: 13,
              text: "Herr Pehlivan hat einen kaputten Toaster und möchte lernen, ihn selbst zu öffnen.",
              answer: "a",
              explain:
                "(a) tam bunu yapıyor: \"Wir helfen beim Reparieren, wir reparieren nicht für Sie\". Öğrenme isteği bu ilanla eşleşen ölçüt.",
            },
            {
              kind: "match",
              id: "de-b1-06-l3-14",
              no: 14,
              text: "Frau Steiner braucht einmal eine Bohrmaschine und will kein Gerät kaufen.",
              answer: "f",
              explain:
                "(f) matkabı ödünç veriyor ve ilk üç gün ücretsiz. Tek seferlik ihtiyacı satın almadan karşılayan tek ilan.",
            },
            {
              kind: "match",
              id: "de-b1-06-l3-15",
              no: 15,
              text: "Herr Novotny weiß nicht, wohin sein Gehalt jeden Monat verschwindet.",
              answer: "c",
              explain:
                "(c) sabit giderlere birlikte bakıyor ve tasarruf noktaları arıyor. Borç değil, genel bir hesap sorunu olduğu için (e) uymuyor.",
            },
            {
              kind: "match",
              id: "de-b1-06-l3-16",
              no: 16,
              text: "Frau Sonnleitner möchte die Sachen ihrer Kinder verkaufen und hat noch sechs Wochen Zeit.",
              answer: "b",
              explain:
                "(b) çocuk kıyafeti satışı için kurulmuş ve satıcıların dört hafta önce kaydolması gerekiyor; altı hafta bu süreye yetiyor.",
            },
            {
              kind: "match",
              id: "de-b1-06-l3-17",
              no: 17,
              text: "Herr Lampe hat drei Mahnungen bekommen und weiß nicht, worauf er zuerst antworten soll.",
              answer: "e",
              explain:
                "(e) ödenmemiş faturalar ve ihtarnameler için ücretsiz danışma veriyor ve bütün mektupların getirilmesini istiyor.",
            },
            {
              kind: "match",
              id: "de-b1-06-l3-18",
              no: 18,
              text: "Frau Cardoso möchte ihre Hosen selbst kürzen können.",
              answer: "i",
              explain:
                "(i) etek ucu, fermuar ve basit tadilatları öğretiyor ve makineleri sağlıyor. (a) da tamir ediyor ama dikiş dersi vermiyor.",
            },
            {
              kind: "match",
              id: "de-b1-06-l3-19",
              no: 19,
              text: "Herr Ziegler liest viel, hat aber kein Geld für Bücher und keinen Bibliotheksausweis.",
              answer: "h",
              explain:
                "(h) ücretsiz ve \"kein Ausweis nötig\" diyor. Kitap alma ve bırakma karşılıklı, yani kart gerektirmiyor.",
            },
          ],
        },
        {
          id: "de-b1-06-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Geschäfte auch am Sonntag öffnen dürfen?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Mağazalar pazar günü de açılabilmeli mi?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Sonntagsöffnung — ja oder nein?",
              body: `Britta L.: Ich habe zwölf Jahre im Einzelhandel gearbeitet und kenne alle Argumente für längere Öffnungszeiten. Sie klingen gut, bis man selbst in der Schicht steht. Meine Kinder haben mich sonntags nie gesehen, und niemand hat je gefragt, ob das für mich geht. Für die Kundschaft ist es bequem, für uns ist es der letzte freie Tag.

Herr Osterloh: Ich betreibe einen Laden mit vier Angestellten und wäre gern offen — aber nicht so. Große Ketten können sonntags zusätzliches Personal einstellen, ich nicht. Eine allgemeine Öffnung würde nicht mir helfen, sondern denen, die ohnehin gewinnen. Deshalb bin ich dagegen, obwohl es gegen mein eigenes Interesse klingt.

Nadja W.: Ich arbeite unter der Woche bis achtzehn Uhr und pendle eine Stunde. Wann soll ich Schuhe kaufen? Man sagt mir, ich könne online bestellen. Kann ich, und ich tue es auch — aber dann wundert sich niemand, wenn die Innenstadt leer ist. Wer den Läden das Wochenende verbietet, treibt uns zu genau den Firmen, über die er sich beschwert.

Timo F.: Erst war ich dagegen, und zwar wegen der Dienstpläne. Dann hat unser Supermarkt einen verkaufsoffenen Sonntag im Monat eingeführt. Meine Nachbarin arbeitet dort seit acht Jahren. Sie hat seitdem zum ersten Mal einen freien Wochentag, weil der Sonntag ausgeglichen wird. Ich bin inzwischen dafür, solange es bei einem Tag im Monat bleibt.

Frau Dr. Amrein: Als Ökonomin sage ich: Der Umsatz steigt kaum, er verschiebt sich nur. Die Menschen geben nicht mehr Geld aus, weil ein Tag dazukommt. Was steigt, sind die Kosten für Personal und Energie. Ich sehe darin keinen Gewinn, den es zu verteilen gäbe.

Kilian S.: In meiner Stadt gibt es vier verkaufsoffene Sonntage im Jahr, und sie sind gut besucht. Niemand wird gezwungen, dort zu arbeiten; bei uns melden sich mehr Leute freiwillig, als wir brauchen, weil es Zuschläge gibt. Ich verstehe die Sorge, teile sie aber nach fünf Jahren Erfahrung nicht.

Frau Endres: Ich bin katholisch und höre oft, mein Argument sei von gestern. Deshalb sage ich es anders: Eine Gesellschaft braucht einen Tag, an dem nicht alle gleichzeitig erreichbar sind. Ob man den Sonntag nennt oder anders — ohne so einen Tag verschwindet er einfach.`,
              gloss: [
                { de: "der Einzelhandel", tr: "perakende", en: "retail" },
                { de: "die Kette", tr: "zincir mağaza", en: "chain" },
                { de: "der Dienstplan", tr: "vardiya çizelgesi", en: "duty roster" },
                { de: "der Zuschlag", tr: "ek ücret, prim", en: "bonus, surcharge" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-06-l4-20",
              no: 20,
              ref: "f1",
              text: "Britta L.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Argümanları bildiğini söylüyor ama kendi vardiyasından bakıyor: pazar \"der letzte freie Tag\" ve çocukları onu hiç görmemiş. Bilmek katılmak değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l4-21",
              no: 21,
              ref: "f1",
              text: "Herr Osterloh",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Açmak istediğini söylüyor, ama genel bir açılışın zincirlere yarayacağını görüyor: \"Deshalb bin ich dagegen, obwohl es gegen mein eigenes Interesse klingt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l4-22",
              no: 22,
              ref: "f1",
              text: "Nadja W.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Çevrimiçi alışverişi kabul ediyor ama sonucunu eleştiriyor: \"treibt uns zu genau den Firmen, über die er sich beschwert\". Yani açılıştan yana.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l4-23",
              no: 23,
              ref: "f1",
              text: "Timo F.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Başta vardiya çizelgeleri yüzünden karşıymış; komşusunun \"zum ersten Mal einen freien Wochentag\" aldığını görünce dönmüş. Desteği koşullu: ayda bir günle sınırlı kalmalı.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l4-24",
              no: 24,
              ref: "f1",
              text: "Frau Dr. Amrein",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Cirodaki artışı reddediyor: satış yalnız kayıyor, buna karşılık personel ve enerji maliyeti artıyor. \"keinen Gewinn, den es zu verteilen gäbe\".",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l4-25",
              no: 25,
              ref: "f1",
              text: "Kilian S.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Kaygıyı anladığını söylüyor ama paylaşmıyor: \"nach fünf Jahren Erfahrung nicht\". Primler yüzünden gönüllü sayısı ihtiyaçtan fazla.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l4-26",
              no: 26,
              ref: "f1",
              text: "Frau Endres",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Dinî gerekçeyi bir kenara bırakıp toplumsal bir gerekçe kuruyor: \"Eine Gesellschaft braucht einen Tag, an dem nicht alle gleichzeitig erreichbar sind\".",
            },
          ],
        },
        {
          id: "de-b1-06-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Rückgabebedingungen und die Aufgaben 27 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "İade koşullarını ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Rückgabebedingungen",
              genreTr: "İade koşulları",
              title: "Rückgabe und Erstattung — Onlineshop Talwerk",
              body: `1. Frist
Sie können bestellte Waren innerhalb von vierzehn Tagen ohne Angabe von Gründen zurückgeben. Die Frist beginnt an dem Tag, an dem Sie die Ware erhalten. Bei mehreren Teilen einer Bestellung zählt der Tag der letzten Lieferung.

2. Zustand
Die Ware darf anprobiert, aber nicht benutzt werden. Ein Kleidungsstück mit entferntem Etikett gilt als benutzt. Die Originalverpackung ist nicht nötig, eine sichere Verpackung schon.

3. Kosten
Ab einem Bestellwert von 50 Euro übernehmen wir das Rückporto. Darunter tragen Sie 3,95 Euro, die wir von der Erstattung abziehen. Bei einem Fehler unsererseits zahlen wir das Porto immer.

4. Erstattung
Wir erstatten innerhalb von zehn Werktagen nach Eingang der Rücksendung, und zwar über dasselbe Zahlungsmittel. Eine Auszahlung in bar oder auf ein anderes Konto ist ausgeschlossen.

5. Ausnahmen
Nicht zurückgeben können Sie Waren, die nach Ihren Angaben angefertigt wurden, sowie geöffnete Hygieneartikel. Gutscheine sind von der Rückgabe ausgenommen, verfallen aber nicht.`,
              gloss: [
                { de: "das Etikett", tr: "etiket", en: "label, tag" },
                { de: "das Rückporto", tr: "iade kargo ücreti", en: "return postage" },
                { de: "abziehen", tr: "düşmek, kesmek", en: "to deduct" },
                { de: "anfertigen", tr: "imal etmek, üretmek", en: "to make (to order)" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-06-l5-27",
              no: 27,
              ref: "o1",
              text: "Ihre Bestellung kommt in zwei Paketen, am 3. und am 9. Mai. Wann endet die Frist?",
              options: ["Am 23. Mai.", "Am 17. Mai.", "Am 9. Mai."],
              answer: 0,
              explain:
                "Madde 1 birden çok teslimatta \"der Tag der letzten Lieferung\" diyor, yani 9 Mayıs. On dört gün eklenince 23 Mayıs çıkıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie haben bei einer Jacke das Etikett abgeschnitten. Was gilt?",
              options: [
                "Die Rückgabe ist trotzdem möglich.",
                "Die Jacke zählt nicht mehr als neu.",
                "Die Erstattung wird um die Hälfte gekürzt.",
              ],
              answer: 1,
              explain:
                "Madde 2 bunu ayrıca tanımlıyor: \"Ein Kleidungsstück mit entferntem Etikett gilt als benutzt\". Denemek serbest, kullanmak değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l5-29",
              no: 29,
              ref: "o1",
              text: "Sie senden eine Bestellung über 38 Euro zurück, weil sie Ihnen nicht gefällt. Was bekommen Sie?",
              options: ["34,05 Euro.", "38 Euro.", "38 Euro plus Porto."],
              answer: 0,
              explain:
                "50 euronun altında iade kargosunu müşteri taşıyor ve tutar iadeden düşülüyor: 38 eksi 3,95 eşittir 34,05 euro.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-l5-30",
              no: 30,
              ref: "o1",
              text: "Sie möchten die Erstattung lieber auf ein anderes Konto bekommen. Geht das?",
              options: [
                "Ja, wenn Sie es bei der Rücksendung angeben.",
                "Nein.",
                "Ja, gegen eine Gebühr von 3,95 Euro.",
              ],
              answer: 1,
              explain:
                "Madde 4 bunu kapatıyor: iade \"über dasselbe Zahlungsmittel\" yapılıyor ve başka bir hesaba ödeme \"ausgeschlossen\".",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Durchsagen, ein Beratungsgespräch, einen Vortrag und eine Diskussion.",
      instructionTr:
        "Bu bölümde dört görev var. Anonslar, bir danışma görüşmesi, bir sunum ve bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-b1-06-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage im Kaufhaus",
              genreTr: "Mağaza anonsu",
              situation: "Bir indirim ve kasa düzeni duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, in der zweiten Etage finden Sie ab heute Winterjacken zum halben Preis. Bitte beachten Sie: Reduzierte Ware kann getauscht, aber nicht gegen Geld zurückgegeben werden. Die Kassen im Erdgeschoss schließen heute bereits um neunzehn Uhr.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "İadelerle ilgili bir araştırma aktarılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Auswertung aus Nordrhein-Westfalen hat drei Millionen Onlinebestellungen untersucht. Jedes fünfte Kleidungsstück ging zurück, bei Schuhen sogar jedes dritte. Die Autoren führen das weniger auf schlechte Qualität zurück als auf die Gewohnheit, dieselbe Sache in zwei Größen zu bestellen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir tamirhane müşteriyi bilgilendiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Ackerhaus, hier ist die Werkstatt Bramfeld. Ihre Waschmaschine läuft wieder, das Teil war günstiger als gedacht: statt achtzig nur fünfundfünfzig Euro. Abholen können Sie ab morgen. Bezahlen bitte in bar oder mit Karte, Überweisung geht bei uns leider nicht.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage im Second-Hand-Laden",
              genreTr: "İkinci el mağazasında anons",
              situation: "Bir kabul kuralı duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für alle, die Kleidung abgeben möchten: Wir nehmen heute nur Sommersachen an. Winterware bringen Sie bitte erst ab September. Und bitte alles gewaschen — ungewaschene Sachen müssen wir leider zurückgeben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage im Supermarkt",
              genreTr: "Markette anons",
              situation: "Bir fiyat hatası duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, im Regal bei den Konserven steht ein falscher Preis. Die Tomaten kosten nicht neunundneunzig Cent, sondern eins neunundvierzig. Wer heute schon gekauft hat, bekommt an der Information die Differenz erstattet. Wir bitten um Entschuldigung.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-06-h1-1",
              no: 1,
              ref: "h1",
              text: "Reduzierte Ware kann man gegen Geld zurückgeben.",
              answer: false,
              explain:
                "Anons ayrımı yapıyor: indirimli ürün değiştirilebiliyor ama \"nicht gegen Geld zurückgegeben werden\".",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h1-2",
              no: 2,
              ref: "h1",
              text: "Was ist heute anders als sonst?",
              options: [
                "Die Winterjacken sind in einer anderen Etage.",
                "Die Kassen schließen früher.",
                "Es gibt nur eine geöffnete Kasse.",
              ],
              answer: 1,
              explain:
                "Anons \"schließen heute bereits um neunzehn Uhr\" diyor; `bereits` olağandan erken olduğunu gösteriyor. Kat bilgisi ise indirimin yeri.",
            },
            {
              kind: "bool",
              id: "de-b1-06-h1-3",
              no: 3,
              ref: "h2",
              text: "Bei Schuhen ist die Rückgabequote höher als bei Kleidung.",
              answer: true,
              explain:
                "Giyimde her beşinci parça, ayakkabıda \"sogar jedes dritte\" geri gidiyor. Üçte bir, beşte birden yüksektir.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h1-4",
              no: 4,
              ref: "h2",
              text: "Worauf führen die Autoren die Rücksendungen zurück?",
              options: [
                "Auf die Gewohnheit, zwei Größen zu bestellen.",
                "Auf die schlechte Qualität der Ware.",
                "Auf zu lange Lieferzeiten der Händler.",
              ],
              answer: 0,
              explain:
                "Haber gerekçeyi ayırıyor: kaliteden çok \"die Gewohnheit, dieselbe Sache in zwei Größen zu bestellen\".",
            },
            {
              kind: "bool",
              id: "de-b1-06-h1-5",
              no: 5,
              ref: "h3",
              text: "Die Reparatur war günstiger als erwartet.",
              answer: true,
              explain:
                "Mesaj rakamları veriyor: parça \"statt achtzig nur fünfundfünfzig Euro\". Yani beklenenden 25 euro ucuz.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h1-6",
              no: 6,
              ref: "h3",
              text: "Wie kann Frau Ackerhaus bezahlen?",
              options: [
                "Nur in bar.",
                "Auch per Überweisung.",
                "Nur vor Ort, nicht per Bank.",
              ],
              answer: 2,
              explain:
                "Mesaj iki yol veriyor ve birini dışlıyor: \"in bar oder mit Karte, Überweisung geht bei uns leider nicht\".",
            },
            {
              kind: "bool",
              id: "de-b1-06-h1-7",
              no: 7,
              ref: "h4",
              text: "Heute wird auch Winterkleidung angenommen.",
              answer: false,
              explain:
                "Anons yalnız yazlıkları kabul ediyor; kışlıklar için \"erst ab September\" deniyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h1-8",
              no: 8,
              ref: "h4",
              text: "Was passiert mit ungewaschener Kleidung?",
              options: [
                "Sie wird im Laden gewaschen.",
                "Sie wird zurückgegeben.",
                "Sie wird günstiger angenommen.",
              ],
              answer: 1,
              explain:
                "Anons açık: \"ungewaschene Sachen müssen wir leider zurückgeben\". Mağazada yıkama ya da indirimli kabul yok.",
            },
            {
              kind: "bool",
              id: "de-b1-06-h1-9",
              no: 9,
              ref: "h5",
              text: "Die Tomaten sind billiger als angeschrieben.",
              answer: false,
              explain:
                "Doğru fiyat rafta yazandan yüksek: 99 cent değil 1,49 euro. Yani ürün daha pahalı, daha ucuz değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h1-10",
              no: 10,
              ref: "h5",
              text: "Was bekommen Kunden, die heute schon gekauft haben?",
              options: [
                "Den vollen Kaufpreis zurück.",
                "Einen Gutschein für den nächsten Einkauf.",
                "Die Differenz an der Information.",
              ],
              answer: 2,
              explain:
                "Anons yalnız farkın iadesini duyuruyor: \"bekommt an der Information die Differenz erstattet\".",
            },
          ],
        },
        {
          id: "de-b1-06-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Beratungsgespräch. Wählen Sie zu den Aufgaben 11 bis 15: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir danışma görüşmesi dinleyeceksin. 11–15. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Beratungsgespräch",
              genreTr: "Danışma görüşmesi",
              situation: "Bir danışan aylık giderlerini gözden geçiriyor.",
              plays: 2,
              segments: [
                { speaker: "Berater", text: "Sie haben Ihre Kontoauszüge mitgebracht. Was ist Ihr Ziel?" },
                {
                  speaker: "Frau Rutkowski",
                  text: "Ich möchte im Monat zweihundert Euro sparen. Am Ende des Monats ist aber immer nichts übrig.",
                },
                { speaker: "Berater", text: "Dann schauen wir zuerst auf die festen Kosten. Wie hoch ist Ihre Miete?" },
                { speaker: "Frau Rutkowski", text: "780 warm. Das ist viel, aber umziehen möchte ich nicht." },
                {
                  speaker: "Berater",
                  text: "Die Miete lassen wir. Interessanter sind die kleinen Verträge: Sie zahlen für zwei Musikdienste und ein Fitnessstudio, in dem Sie laut eigener Aussage seit Februar nicht waren.",
                },
                { speaker: "Frau Rutkowski", text: "Das Studio wollte ich schon lange kündigen." },
                {
                  speaker: "Berater",
                  text: "Zusammen sind das 61 Euro im Monat. Das ist ein Drittel Ihres Ziels, ohne dass Sie an einem einzigen Tag anders leben.",
                },
                { speaker: "Frau Rutkowski", text: "Und die restlichen 140?" },
                {
                  speaker: "Berater",
                  text: "Die kommen nicht aus dem Sparen, sondern aus der Reihenfolge. Richten Sie einen Dauerauftrag am Tag nach dem Gehaltseingang ein. Was zuerst weg ist, fehlt am Ende nicht.",
                },
                { speaker: "Frau Rutkowski", text: "Und wenn das Geld dann knapp wird?" },
                {
                  speaker: "Berater",
                  text: "Dann holen Sie es zurück, das ist kein Problem. Wichtig ist nur, dass die Entscheidung am Anfang des Monats fällt und nicht am Ende.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-06-h2-11",
              no: 11,
              ref: "b1",
              text: "Was ist Frau Rutkowskis Ziel?",
              options: [
                "Eine günstigere Wohnung finden.",
                "Monatlich zweihundert Euro zurücklegen.",
                "Alle Verträge kündigen.",
              ],
              answer: 1,
              explain:
                "Hedefini kendisi söylüyor: \"Ich möchte im Monat zweihundert Euro sparen\". Taşınmayı ise açıkça istemiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h2-12",
              no: 12,
              ref: "b1",
              text: "Warum lässt der Berater die Miete außen vor?",
              options: [
                "Weil sie im Vergleich niedrig ist.",
                "Weil sie sich kurzfristig nicht ändern lässt.",
                "Weil sie nicht zu den festen Kosten zählt.",
              ],
              answer: 1,
              explain:
                "Danışan taşınmak istemiyor, bu yüzden \"Die Miete lassen wir\" deniyor ve küçük sözleşmelere geçiliyor. Kira yüksek ama değiştirilebilir değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h2-13",
              no: 13,
              ref: "b1",
              text: "Wie viel bringen die kleinen Verträge zusammen?",
              options: ["61 Euro im Monat.", "140 Euro im Monat.", "200 Euro im Monat."],
              answer: 0,
              explain:
                "Danışman topluyor: iki müzik servisi ve spor salonu \"zusammen 61 Euro im Monat\". 140 kalan tutar, 200 ise hedef.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h2-14",
              no: 14,
              ref: "b1",
              text: "Woher soll der Rest des Betrags kommen?",
              options: [
                "Aus einem Nebenjob am Wochenende.",
                "Aus dem Verzicht auf Einkäufe.",
                "Aus einem Dauerauftrag direkt nach dem Gehalt.",
              ],
              answer: 2,
              explain:
                "Danışman \"nicht aus dem Sparen, sondern aus der Reihenfolge\" diyor: maaştan hemen sonra otomatik talimat. \"Was zuerst weg ist, fehlt am Ende nicht.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h2-15",
              no: 15,
              ref: "b1",
              text: "Was sagt er zum Fall, dass das Geld knapp wird?",
              options: [
                "Dann kann sie es zurückholen.",
                "Dann sollte sie den Betrag halbieren.",
                "Dann muss sie den Dauerauftrag löschen.",
              ],
              answer: 0,
              explain:
                "\"Dann holen Sie es zurück, das ist kein Problem\" diyor; önemli olan kararın ay başında verilmesi, ay sonunda değil.",
            },
          ],
        },
        {
          id: "de-b1-06-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Sind die Aussagen 16 bis 22 richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir sunum dinleyeceksin. 16–22. ifadeler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              situation: "Bir uzman satın alma kararlarını anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Herr Lindqvist",
                  text: "Guten Abend. Ich beginne mit einer Warnung vor der einfachsten Erklärung: Werbung sorgt selten dafür, dass Sie etwas kaufen, das Sie überhaupt nicht wollen. Sie sorgt dafür, dass Sie sich zwischen zwei Dingen anders entscheiden.",
                },
                {
                  speaker: "Herr Lindqvist",
                  text: "Der stärkste Effekt liegt nicht im Fernsehen, sondern im Regal. Ware auf Augenhöhe verkauft sich in unseren Messungen etwa doppelt so gut wie dieselbe Ware im untersten Fach. Für diesen Platz zahlen Hersteller, und das erklärt mehr als jeder Spot.",
                },
                {
                  speaker: "Herr Lindqvist",
                  text: "Zweitens die Zahl der Möglichkeiten. Bei sechs Sorten Marmelade kaufen mehr Menschen etwas als bei vierundzwanzig. Zu viel Auswahl führt nicht zu besseren Entscheidungen, sondern zu gar keiner.",
                },
                {
                  speaker: "Herr Lindqvist",
                  text: "Drittens der Preis als Information. Wenn zwei Produkte gleich aussehen und eines kostet deutlich mehr, halten viele das teurere für besser — auch dann, wenn es dieselbe Fabrik verlassen hat.",
                },
                {
                  speaker: "Herr Lindqvist",
                  text: "Was hilft dagegen? Listen helfen, aber weniger als man denkt. Deutlich stärker wirkt der Zeitpunkt: Wer nach dem Essen einkauft, gibt in unseren Erhebungen rund zehn Prozent weniger aus als jemand, der hungrig kommt.",
                },
                {
                  speaker: "Herr Lindqvist",
                  text: "Ein letzter Punkt, der oft falsch verstanden wird: Sparen ist keine Charakterfrage. Wer wenig Geld hat, trifft nicht schlechtere Entscheidungen, sondern muss mehr Entscheidungen treffen. Das kostet Kraft, und die ist begrenzt.",
                },
                {
                  speaker: "Herr Lindqvist",
                  text: "Ich schließe mit einer Einschränkung: Unsere Zahlen stammen aus Supermärkten. Für größere Anschaffungen wie Möbel oder Autos gelten teilweise andere Regeln, und die haben wir nicht untersucht.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-06-h3-16",
              no: 16,
              ref: "v1",
              text: "Werbung bringt Menschen meist dazu, ganz neue Wünsche zu haben.",
              answer: false,
              explain:
                "Sunum bunu baştan reddediyor: reklam istemediğiniz şeyi aldırmaz, \"zwischen zwei Dingen anders\" karar verdirir.",
            },
            {
              kind: "bool",
              id: "de-b1-06-h3-17",
              no: 17,
              ref: "v1",
              text: "Der Platz im Regal wirkt stärker als Fernsehwerbung.",
              answer: true,
              explain:
                "Göz hizasındaki ürün en alt raftakinin yaklaşık iki katı satıyor ve üreticiler bu yer için ödüyor: \"das erklärt mehr als jeder Spot\".",
            },
            {
              kind: "bool",
              id: "de-b1-06-h3-18",
              no: 18,
              ref: "v1",
              text: "Mehr Auswahl führt zu mehr Käufen.",
              answer: false,
              explain:
                "Altı çeşit reçelde daha çok kişi alıyor, yirmi dörtte daha az: fazla seçenek \"zu gar keiner\" karara götürüyor.",
            },
            {
              kind: "bool",
              id: "de-b1-06-h3-19",
              no: 19,
              ref: "v1",
              text: "Ein höherer Preis wird oft als Zeichen für Qualität gelesen.",
              answer: true,
              explain:
                "İki ürün aynı görünüyorsa pahalı olan daha iyi sanılıyor — \"auch dann, wenn es dieselbe Fabrik verlassen hat\".",
            },
            {
              kind: "bool",
              id: "de-b1-06-h3-20",
              no: 20,
              ref: "v1",
              text: "Einkaufslisten wirken stärker als der Zeitpunkt des Einkaufs.",
              answer: false,
              explain:
                "Listeler yardım ediyor \"aber weniger als man denkt\"; yemekten sonra alışveriş yapan yaklaşık yüzde on az harcıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-06-h3-21",
              no: 21,
              ref: "v1",
              text: "Wer wenig Geld hat, muss mehr Entscheidungen treffen.",
              answer: true,
              explain:
                "Sunum tasarrufu karakter meselesi saymıyor: az parası olan daha kötü değil, \"mehr Entscheidungen\" veriyor ve bu güç harcatıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-06-h3-22",
              no: 22,
              ref: "v1",
              text: "Die Ergebnisse gelten auch für den Kauf von Möbeln.",
              answer: false,
              explain:
                "Kapanışta sınır çiziliyor: sayılar süpermarketlerden geliyor, mobilya ve otomobil gibi büyük alımlar \"haben wir nicht untersucht\".",
            },
          ],
        },
        {
          id: "de-b1-06-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 23 bis 30: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "İki konuk pazar günü açılışı tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Sollen Geschäfte sonntags öffnen dürfen? Frau Renz, Sie vertreten den Handelsverband.",
                },
                {
                  speaker: "Frau Renz",
                  text: "Ich beginne mit einem Zugeständnis: Der Umsatz steigt dadurch kaum. Das zeigen alle Auswertungen, und ich bestreite es nicht. Nur geht es uns nicht um mehr Umsatz, sondern darum, dass die Innenstadt an einem Tag stattfindet, an dem Menschen Zeit haben.",
                },
                { speaker: "Moderator", text: "Herr Faber, Sie sind Gewerkschaftssekretär." },
                {
                  speaker: "Herr Faber",
                  text: "Wenn der Umsatz nicht steigt, ist die Sache doch entschieden. Dann bleiben nur die Kosten — und die zahlen die Beschäftigten, nicht mit Geld, sondern mit Wochenenden.",
                },
                {
                  speaker: "Frau Renz",
                  text: "Das ist mir zu einfach. Ein Café darf sonntags öffnen, ein Buchladen nicht. Diese Grenze ist historisch gewachsen und heute schwer zu erklären.",
                },
                {
                  speaker: "Herr Faber",
                  text: "Da haben Sie recht, die Grenze ist willkürlich. Nur folgt daraus für mich das Gegenteil: Dann sollte man das Café stärker schützen, statt den Buchladen zu öffnen.",
                },
                {
                  speaker: "Moderator",
                  text: "Frau Renz, in mehreren Städten melden sich mehr Freiwillige, als gebraucht werden.",
                },
                {
                  speaker: "Frau Renz",
                  text: "Richtig, und das liegt an den Zuschlägen. Ich gebe aber zu: Freiwilligkeit funktioniert nur so lange, wie es genug Freiwillige gibt. In einer angespannten Personalsituation wird aus Freiwilligkeit schnell Erwartung.",
                },
                {
                  speaker: "Herr Faber",
                  text: "Das ist der ehrlichste Satz des Abends. Genau dort liegt unser Problem, nicht bei den vier Sonntagen im Jahr.",
                },
                { speaker: "Moderator", text: "Gibt es eine gemeinsame Linie?" },
                {
                  speaker: "Herr Faber",
                  text: "Vielleicht. Wenn eine Öffnung verbindlich an einen Personalschlüssel und an echte Freiwilligkeit gebunden wäre, könnte ich über einzelne Sonntage reden.",
                },
                {
                  speaker: "Frau Renz",
                  text: "Damit könnte ich leben, allerdings nur, wenn die Zahl der Sonntage vorher feststeht. Sonst verhandeln wir jedes Jahr neu, und das ist für niemanden gut.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-06-h4-23",
              no: 23,
              ref: "d1",
              text: "Womit beginnt Frau Renz?",
              options: [
                "Mit einem Zugeständnis.",
                "Mit einer Zahl aus dem Handel.",
                "Mit einer Kritik an der Gewerkschaft.",
              ],
              answer: 0,
              explain:
                "\"Ich beginne mit einem Zugeständnis\" diyor ve cironun neredeyse artmadığını kabul ediyor. Kendi gerekçesini ancak sonra kuruyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-24",
              no: 24,
              ref: "d1",
              text: "Worum geht es ihr stattdessen?",
              options: [
                "Um höhere Löhne im Handel.",
                "Um weniger Konkurrenz durch Onlinehandel.",
                "Um eine belebte Innenstadt.",
              ],
              answer: 2,
              explain:
                "Amacı ciro değil: şehir merkezinin insanların vakti olduğu bir günde \"stattfindet\" olması. Ücret ve rekabet bu bölümde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie nutzt Herr Faber ihr Zugeständnis?",
              options: [
                "Er sagt, dann blieben nur die Kosten.",
                "Er bezweifelt die vorliegenden Auswertungen.",
                "Er verlangt höhere Zuschläge.",
              ],
              answer: 0,
              explain:
                "Ciro artmıyorsa \"bleiben nur die Kosten\" diyor ve bunu çalışanların hafta sonlarıyla ödediğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-26",
              no: 26,
              ref: "d1",
              text: "Welches Beispiel bringt Frau Renz für eine unklare Regel?",
              options: [
                "Tankstellen und Supermärkte.",
                "Café und Buchladen.",
                "Apotheken und Bäckereien.",
              ],
              answer: 1,
              explain:
                "Örneği net: kafe pazar günü açılabiliyor, kitapçı açılamıyor. Bu sınırı \"historisch gewachsen und heute schwer zu erklären\" buluyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-27",
              no: 27,
              ref: "d1",
              text: "Wie reagiert Herr Faber auf dieses Beispiel?",
              options: [
                "Er bestreitet, dass die Grenze willkürlich ist.",
                "Er zieht daraus den umgekehrten Schluss.",
                "Er hält das Beispiel für nebensächlich.",
              ],
              answer: 1,
              explain:
                "Sınırın keyfî olduğunu kabul ediyor ama \"folgt daraus für mich das Gegenteil\" diyor: kitapçıyı açmak yerine kafeyi daha çok korumak gerekir.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-28",
              no: 28,
              ref: "d1",
              text: "Was räumt Frau Renz zur Freiwilligkeit ein?",
              options: [
                "Sie braucht genug Personal.",
                "Sie wird von den Zuschlägen verhindert.",
                "Sie gilt nur in kleinen Städten.",
              ],
              answer: 0,
              explain:
                "\"Freiwilligkeit funktioniert nur so lange, wie es genug Freiwillige gibt\" diyor; personel darlığında gönüllülük beklentiye dönüşüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-29",
              no: 29,
              ref: "d1",
              text: "Unter welcher Bedingung könnte Herr Faber zustimmen?",
              options: [
                "Wenn die Zuschläge deutlich verdoppelt werden.",
                "Wenn nur kleine Läden öffnen dürfen.",
                "Wenn beides verbindlich geregelt ist.",
              ],
              answer: 2,
              explain:
                "Koşulunu kendisi sayıyor: \"verbindlich an einen Personalschlüssel und an echte Freiwilligkeit gebunden\" olursa tek tek pazar günlerini konuşabilir.",
            },
            {
              kind: "mcq",
              id: "de-b1-06-h4-30",
              no: 30,
              ref: "d1",
              text: "Welche Bedingung stellt Frau Renz dagegen?",
              options: [
                "Die Zahl muss vorher feststehen.",
                "Die Regel muss bundesweit gelten.",
                "Die Gewerkschaft muss jedes Jahr zustimmen.",
              ],
              answer: 0,
              explain:
                "Kabul ediyor ama bir şartla: pazar günlerinin sayısı önceden belli olmalı, yoksa \"verhandeln wir jedes Jahr neu\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine private Nachricht, einen Forumsbeitrag und eine halb offizielle Nachricht.",
      instructionTr: "Bu bölümde üç görev var: özel bir ileti, bir forum yazısı ve yarı resmî bir ileti.",
      tasks: [
        {
          id: "de-b1-06-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Freund Malte schlägt vor, gemeinsam eine teure Bohrmaschine zu kaufen und sie zu teilen. Sie sind unsicher. Schreiben Sie ihm (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Malte pahalı bir matkabı birlikte alıp paylaşmayı öneriyor. Sen kararsızsın. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Reagieren Sie auf den Vorschlag.", tr: "Öneriye karşılık ver." },
              { de: "Nennen Sie Ihre Bedenken.", tr: "Çekincelerini söyle." },
              { de: "Machen Sie einen anderen Vorschlag.", tr: "Başka bir öneri sun." },
              { de: "Fragen Sie nach seiner Meinung.", tr: "Onun görüşünü sor." },
            ],
            sample: `Hallo Malte,

die Idee finde ich grundsätzlich gut, und teilen ist mir lieber als zweimal kaufen.

Ehrlich gesagt habe ich aber zwei Bedenken. Erstens brauche ich so eine Maschine höchstens zweimal im Jahr. Zweitens wohnst du am anderen Ende der Stadt — bis ich bei dir bin, habe ich das Loch längst gebohrt.

Wie wäre es, wenn wir es erst einmal mit der Werkzeugausleihe im Stadtteilhaus probieren? Die ersten drei Tage sind dort kostenlos.

Was hältst du davon?

Liebe Grüße
Ines`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Çekinceler somut mu (sıklık, mesafe, maliyet)?",
              "Karşı öneri gerçekçi ve uygulanabilir mi?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı ve ton uygun mu?",
              "Yaklaşık 80 kelime var mı ve soru gerçekten sorulmuş mu?",
            ],
          },
        },
        {
          id: "de-b1-06-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Online-Forum wird diskutiert: \"Sollen Geschäfte auch am Sonntag öffnen dürfen?\" Schreiben Sie einen Beitrag (circa 80 Wörter). Nennen Sie Ihre Meinung, ein Argument dafür und ein Argument dagegen.",
          promptTr:
            "Bir çevrimiçi forumda tartışılıyor: \"Mağazalar pazar günü de açılabilmeli mi?\" Bir yorum yaz (yaklaşık 80 kelime). Görüşünü, bir destekleyici ve bir karşı argüman söyle.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie Ihre Meinung klar.", tr: "Görüşünü açıkça söyle." },
              { de: "Geben Sie ein Argument dafür.", tr: "Lehte bir gerekçe ver." },
              { de: "Geben Sie ein Argument dagegen.", tr: "Aleyhte bir gerekçe ver." },
              { de: "Ziehen Sie ein Fazit.", tr: "Bir sonuca bağla." },
            ],
            sample: `Ich bin dagegen, aber nicht aus religiösen Gründen.

Dafür spricht durchaus etwas: Wer Vollzeit arbeitet und pendelt, hat unter der Woche kaum eine Chance, in Ruhe einzukaufen. Meine Schwester schafft es nur samstags, und dann ist überall Schlange.

Dagegen spricht, dass die Rechnung nicht aufgeht. Der Umsatz steigt nach allem, was ich gelesen habe, kaum — es verteilt sich nur anders. Bezahlt wird das mit den Wochenenden der Beschäftigten.

Mein Fazit: Lieber längere Öffnungszeiten am Abend als ein weiterer Arbeitstag am Sonntag.`,
            criteria: [
              "Görüş ilk cümlelerde net söylenmiş mi?",
              "Lehte ve aleyhte birer gerekçe gerçekten ayrı ayrı verilmiş mi?",
              "Gerekçeler somut mu (örnek, sayı, kendi deneyimi)?",
              "Sonuç iki gerekçeyle tutarlı mı ve bir alternatif sunuyor mu?",
              "Forum yazısına uygun bir ton ve yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-06-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben eine Jacke online zurückgeschickt. Die Erstattung ist nach vier Wochen noch nicht da. Schreiben Sie an den Onlineshop (circa 40 Wörter).",
          promptTr:
            "İnternetten aldığın bir montu iade ettin. Dört hafta geçti, para hâlâ gelmedi. Çevrimiçi mağazaya yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie Bestellnummer und Datum der Rücksendung.", tr: "Sipariş numarasını ve iade tarihini belirt." },
              { de: "Beschreiben Sie das Problem.", tr: "Sorunu anlat." },
              { de: "Fordern Sie die Erstattung und nennen Sie eine Frist.", tr: "İadeyi talep et ve bir süre belirt." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 4. März habe ich die Jacke aus der Bestellung 77-40915 zurückgeschickt. Der Sendungsverlauf zeigt, dass das Paket am 6. März bei Ihnen angekommen ist.

Die Erstattung von 89,90 Euro habe ich bis heute nicht erhalten.

Ich bitte Sie, den Betrag bis zum 15. April zu überweisen.

Mit freundlichen Grüßen
Ferit Alkan`,
            criteria: [
              "Sipariş ve iade somut tanımlanmış mı? (numara, tarih, tutar)",
              "Sorun açık mı — kargonun ulaştığı ama paranın gelmediği yazılmış mı?",
              "Talep ve süre net mi?",
              "Resmî hitap ve veda doğru mu, yaklaşık 40 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, ein Thema präsentieren und auf ein Problem reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte planlama, bir konuyu sunma ve bir soruna tepki verme.",
      tasks: [
        {
          id: "de-b1-06-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam einen Tauschmarkt für Ihren Kurs. Sprechen Sie über: Termin — Ort — Was getauscht wird — Regeln — Werbung.",
          promptTr:
            "Kursunuz için birlikte bir takas pazarı planlayın. Şunları konuşun: tarih — yer — neyin takas edileceği — kurallar — duyuru.",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Tauschmarkt. Wann soll er stattfinden? Am Wochenende haben viele Familie.",
              tr: "Takas pazarını birlikte planlıyoruz. Ne zaman olsun? Hafta sonu çoğunun ailesi var.",
            },
            { who: "you", hint: "Bir tarih öner ve bu itirazı da hesaba kat.", expect: "somut bir tarih önermek ve bir itirazı dikkate almak", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Und wo? Der Kursraum ist klein, die Aula müssten wir beantragen.",
              tr: "Peki. Nerede? Sınıf küçük, salon için başvuru gerekiyor.",
            },
            {
              who: "you",
              hint: "İki seçenekten birini seç ve tercihini gerekçelendir.",
              expect: "iki seçenek arasında karşılaştırmalı bir tercih yapmak",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Einverstanden. Was soll getauscht werden? Kleidung ist einfach, aber am Ende bleibt viel liegen.",
              tr: "Anlaştık. Ne takas edilsin? Kıyafet kolay ama sonunda çok şey elde kalıyor.",
            },
            {
              who: "you",
              hint: "Bir sınırlama öner ve artakalanlar için bir çözüm söyle.",
              expect: "kapsamı sınırlamak ve artakalanlar için çözüm önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Bleiben die Regeln und die Werbung. Was schlagen Sie vor?",
              tr: "Geriye kurallar ve duyuru kaldı. Ne önerirsin?",
            },
            {
              who: "you",
              hint: "En az bir kural ve iki duyuru yolu öner, işleri paylaş.",
              expect: "kural ve duyuru önermek, görev paylaşımı yapmak",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneri sunmak ve gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara karşılık vermek" },
              { de: "zu einer Entscheidung kommen", tr: "Bir karara varmak" },
            ],
            sample:
              "Dann machen wir es an einem Donnerstag direkt nach dem Kurs, so muss niemand extra kommen. Ich wäre für die Aula, weil im Kursraum keine zwanzig Leute mit Taschen stehen können; den Antrag kann ich schreiben. Damit nicht alles liegen bleibt, würde ich sagen: höchstens fünf Teile pro Person, und was übrig bleibt, bringen wir gemeinsam zur Kleiderkammer. Als Regel reicht eigentlich eine: Wer etwas mitnimmt, hat vorher etwas gebracht. Für die Werbung mache ich einen Zettel für die Türen, und du schreibst in die Kursgruppen.",
            criteria: [
              "Beş noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi? (weil, damit, deshalb)",
              "İtirazlara (aile, küçük oda, artakalanlar) gerçekten karşılık verildi mi?",
              "En az bir karşılaştırma yapıldı mı?",
              "İşler sonunda paylaşıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-06-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag zum Thema \"Einkaufen früher und heute\". Gliedern Sie: Einleitung — Situation in Ihrem Heimatland — eigene Erfahrung — Vorteile und Nachteile — Ihre Meinung.",
          promptTr:
            "\"Eskiden ve bugün alışveriş\" konusunda kısa bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — kendi deneyimin — artılar ve eksiler — kendi görüşün.",
          prepSeconds: 60,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "Einleitung und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Situation im Heimatland", tr: "Kendi ülkendeki durum" },
              { de: "eigene Erfahrung", tr: "Kendi deneyimin" },
              { de: "Vorteile und Nachteile", tr: "Artılar ve eksiler" },
              { de: "eigene Meinung mit Begründung", tr: "Gerekçeli kendi görüşün" },
            ],
            sample:
              "Ich möchte heute über das Einkaufen sprechen: zuerst wie es bei uns früher war, dann meine eigene Erfahrung, danach Vor- und Nachteile und am Ende meine Meinung. In Bulgarien sind meine Eltern jeden zweiten Tag auf den Markt gegangen, weil man dort billiger und frischer eingekauft hat. Einen großen Supermarkt gab es in unserer Stadt erst ab 2005. Ich selbst bestelle heute fast alles online, auch Waschmittel. Ein Vorteil ist die Zeit: Ich spare in der Woche gut zwei Stunden. Ein Nachteil ist, dass ich niemanden mehr treffe. Meine Mutter hat auf dem Markt zwanzig Minuten geredet, ich rede beim Bestellen mit niemandem. Meiner Meinung nach ist Einkaufen praktischer geworden und gleichzeitig einsamer.",
            criteria: [
              "Beş bölümün hepsi var mı ve sırayla mı?",
              "Giriş sunumun yapısını duyuruyor mu?",
              "Kendi deneyimi somut mu (ne, ne sıklıkla, ne kadar)?",
              "En az bir artı ve bir eksi karşılaştırmalı biçimde verildi mi?",
              "Görüş gerekçeli mi ve önceki bölümlerle tutarlı mı?",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-06-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf ein Problem. Ein Freund leiht sich seit Monaten immer wieder kleine Beträge von Ihnen und gibt sie nicht zurück.",
          promptTr:
            "Bir soruna tepki ver. Bir arkadaşın aylardır senden küçük tutarlar borç alıyor ve geri vermiyor.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Du, kannst du mir bis Freitag zwanzig Euro leihen? Ich habe mein Konto überzogen.",
              tr: "Cumaya kadar bana yirmi euro borç verebilir misin? Hesabımı aştım.",
            },
            {
              who: "you",
              hint: "İsteği geri çevir ama sorunu adlandır, suçlamadan.",
              expect: "bir isteği reddetmek ve altta yatan sorunu suçlamadan adlandırmak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Jetzt tust du so, als ginge es um viel Geld. Es sind doch nur zwanzig Euro.",
              tr: "Şimdi çok paraymış gibi yapıyorsun. Sadece yirmi euro.",
            },
            {
              who: "you",
              hint: "Meselenin tutar olmadığını açıkla ve somut ol.",
              expect: "sorunun tutar değil süreklilik olduğunu somut biçimde açıklamak",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Okay, ich verstehe. Was schlägst du vor? Ich will unsere Freundschaft deswegen nicht kaputtmachen.",
              tr: "Tamam, anlıyorum. Ne öneriyorsun? Bu yüzden arkadaşlığımızı bozmak istemem.",
            },
            {
              who: "you",
              hint: "Somut ve uygulanabilir bir düzen öner.",
              expect: "ilişkiyi koruyan somut bir düzen önermek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich ablehnen", tr: "Kibarca reddetmek" },
              { de: "das eigentliche Problem benennen", tr: "Asıl sorunu adlandırmak" },
              { de: "eine tragfähige Lösung finden", tr: "Sürdürülebilir bir çözüm bulmak" },
            ],
            sample:
              "Diesmal lieber nicht, und das hat einen Grund. Es geht mir nicht um die zwanzig Euro, sondern darum, dass seit Februar ungefähr hundertzwanzig zusammengekommen sind und wir nie darüber gesprochen haben. Genau das finde ich unangenehm, nicht das Geld. Mein Vorschlag: Wir schreiben einmal auf, was offen ist, und du gibst mir monatlich dreißig zurück, so wie es dir passt. Und wenn du wieder etwas brauchst, sag es mir direkt — dann sage ich ehrlich Ja oder Nein.",
            criteria: [
              "Ret kibar ve gerekçeli mi?",
              "Asıl sorun (tutar değil süreklilik) adlandırıldı mı?",
              "Somut sayı ya da örnek kullanıldı mı?",
              "Çözüm ilişkiyi koruyor ve uygulanabilir mi?",
            ],
          },
        },
      ],
    },
  ],
};
