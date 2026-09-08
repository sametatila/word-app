import type { MockPaper } from "../types";

/**
 * B1 · Deneme 3 — "Reisen und Mobilität".
 *
 * PLAN kâğıt 1 ve 2 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde
 *     Teil 1  6  Richtig/Falsch   deneyim yazısı — ayrıntı (detail)
 *     Teil 2  6  üç şıklı seçme   iki karşıt metin — ana fikir (gist)
 *     Teil 3  7  eşleştirme       on ilan — kime uyar (orientation)
 *     Teil 4  7  iki şıklı seçme  forum — yanında mı karşısında mı (opinion)
 *     Teil 5  4  üç şıklı seçme   taşıma koşulları — kural (instruction)
 *   Hören  40 dk · 30 madde
 *     Teil 1 10  karışık          beş kısa kayıt, bir kez (detail)
 *     Teil 2  5  üç şıklı seçme   danışma görüşmesi (detail)
 *     Teil 3  7  Richtig/Falsch   sunum (detail)
 *     Teil 4  8  üç şıklı seçme   tartışma — tutum (opinion)
 *   Schreiben 60 dk  özel ileti (80) + forum yazısı (80) + yarı resmî (40)
 *   Sprechen  15 dk  ortak planlama · sunum · soruna tepki
 *
 * KONU SEÇİMİ: ulaşım, B1'in ayırt edici becerisini doğal olarak zorluyor —
 * bir görüşün gerekçesini izlemek. Forum ve tartışma görevlerinde yorumların
 * yarısı karşı çıkışla başlayıp destekle bitiyor; anahtar sözcük avlayan
 * öğrenci bu maddelerde puan alamaz.
 */
export const B1_03: MockPaper = {
  id: "de-b1-03",
  course: "de",
  level: "B1",
  no: 3,
  theme: "Reisen und Mobilität",
  themeTr: "Yolculuk ve ulaşım",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Erfahrungsbericht, zwei Meinungstexte, Anzeigen, Forumsbeiträge und eine Beförderungsordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Bir deneyim yazısı, iki görüş metni, ilanlar, forum yorumları ve bir taşıma yönetmeliği okuyacaksın.",
      tasks: [
        {
          id: "de-b1-03-l1",
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
              title: "Mit dem Nachtzug nach Warschau",
              body: `Im April bin ich mit dem Nachtzug von Berlin nach Warschau gefahren. Geflogen wäre ich in einer Stunde, aber ich wollte wissen, ob sich die alte Art zu reisen wieder lohnt.

Der Zug ist um 22.40 Uhr abgefahren. Ich hatte einen Platz im Liegewagen gebucht, das billigste Abteil mit sechs Betten. Es kostete 49 Euro; ein Flug hätte an diesem Tag 39 Euro gekostet. Wer nur auf den Preis schaut, steigt also nicht in den Zug.

Im Abteil waren wir zu fünft: zwei Studentinnen, ein Mann, der jeden Monat zu seiner Familie fährt, und eine ältere Frau, die Angst vor dem Fliegen hat. Nach zwanzig Minuten kannten wir uns alle mit Namen. Das passiert im Flugzeug selten.

Geschlafen habe ich schlecht. Der Zug hält nachts mehrmals, und an der Grenze geht kurz das Licht an. Wer einen leichten Schlaf hat, sollte das wissen. Trotzdem war ich am Morgen weniger müde als nach einem frühen Flug, weil ich nicht um vier Uhr aufstehen musste.

Um 6.55 Uhr waren wir da. Der Bahnhof liegt mitten in der Stadt, deshalb stand ich zwanzig Minuten später vor dem Hotel. Vom Flughafen dauert derselbe Weg mit dem Bus fast eine Stunde.

Was mich überrascht hat: Der Zug war voll. Die Bahn sagt, dass die Zahl der Reisenden seit drei Jahren steigt. Neue Wagen kommen aber erst in einigen Jahren.

Würde ich es wieder machen? Ja, aber nicht auf jeder Strecke. Unter sechs Stunden nehme ich den normalen Zug. Über zwölf Stunden wird die Nacht zu lang. Dazwischen ist der Nachtzug für mich die beste Lösung.`,
              gloss: [
                { de: "der Liegewagen", tr: "kuşetli vagon", en: "couchette car" },
                { de: "das Abteil", tr: "kompartıman", en: "compartment" },
                { de: "die Strecke", tr: "güzergâh, hat", en: "route" },
                { de: "sich lohnen", tr: "değmek, kârlı olmak", en: "to be worth it" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-03-l1-1",
              no: 1,
              ref: "t1",
              text: "Der Flug wäre an diesem Tag teurer gewesen als die Zugfahrt.",
              answer: false,
              explain:
                "Sayılar tersini söylüyor: kuşet 49 euro, uçak o gün 39 euro. Yazar da bunu \"Wer nur auf den Preis schaut, steigt also nicht in den Zug\" diye bağlıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-l1-2",
              no: 2,
              ref: "t1",
              text: "Die Reisenden im Abteil sind schnell miteinander ins Gespräch gekommen.",
              answer: true,
              explain:
                "\"Nach zwanzig Minuten kannten wir uns alle mit Namen\" — yirmi dakikada tanışıyorlar. Yazar bunu uçakla karşılaştırıp orada ender olduğunu ekliyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-l1-3",
              no: 3,
              ref: "t1",
              text: "Der Autor hat im Zug gut geschlafen.",
              answer: false,
              explain:
                "\"Geschlafen habe ich schlecht\" — tren gece birkaç kez duruyor, sınırda ışık yanıyor. Uyku ve dinlenmişlik ayrı şeyler; metin ikisini bilerek ayırıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-l1-4",
              no: 4,
              ref: "t1",
              text: "Am Morgen war der Autor ausgeruhter als nach einem frühen Flug.",
              answer: true,
              explain:
                "\"war ich am Morgen weniger müde als nach einem frühen Flug\" — gerekçesi de veriliyor: saat dörtte kalkmak gerekmiyor. Kötü uyumasına rağmen bu böyle.",
            },
            {
              kind: "bool",
              id: "de-b1-03-l1-5",
              no: 5,
              ref: "t1",
              text: "Vom Warschauer Bahnhof ins Hotel dauert es länger als vom Flughafen.",
              answer: false,
              explain:
                "\"Der Bahnhof liegt mitten in der Stadt\" — gardan otele 20 dakika, havalimanından aynı yol otobüsle neredeyse 1 saat. Yani ilişki tersine.",
            },
            {
              kind: "bool",
              id: "de-b1-03-l1-6",
              no: 6,
              ref: "t1",
              text: "Neue Wagen sind schon bestellt, kommen aber nicht sofort.",
              answer: true,
              explain:
                "Metin yolcu sayısının üç yıldır arttığını, buna karşılık \"Neue Wagen kommen aber erst in einigen Jahren\" diyor. Yani bekleniyorlar ama hemen değil.",
            },
          ],
        },
        {
          id: "de-b1-03-l2",
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
              title: "Ein Jahr ohne Auto",
              body: `Vor einem Jahr habe ich mein Auto verkauft. Nicht aus Überzeugung, sondern weil die Reparatur teurer gewesen wäre als der Wagen wert war.

Die ersten Wochen waren hart. Ich habe gemerkt, wie viele Wege ich aus Gewohnheit mit dem Auto gemacht habe: zum Bäcker, zur Post, zum Sportplatz. Alle drei sind zu Fuß in zehn Minuten erreichbar.

Teuer geworden ist es trotzdem nicht. Ich zahle jetzt 58 Euro im Monat für das Nahverkehrsticket, dazu etwa 30 Euro für Leihräder und ein paar Fahrten mit dem Mietwagen. Vorher waren es mit Versicherung, Steuer und Werkstatt gut 300 Euro.

Schwierig sind die Ausnahmen. Als meine Mutter im Krankenhaus lag, musste ich dreimal in der Woche 40 Kilometer fahren — mit dem Bus dauert das je zwei Stunden. In solchen Wochen fehlt das Auto wirklich.

Was ich nicht erwartet hatte: Ich bin pünktlicher geworden. Ein Bus fährt, wenn er fährt. Früher bin ich losgefahren, wenn ich fertig war, und stand dann im Stau.

Ob ich wieder ein Auto kaufe? Wenn ich aufs Land ziehe, sofort. In der Stadt sehe ich keinen Grund mehr.`,
              gloss: [
                { de: "aus Überzeugung", tr: "inandığı için, bilinçli olarak", en: "out of conviction" },
                { de: "erreichbar", tr: "ulaşılabilir", en: "reachable" },
                { de: "der Stau", tr: "trafik sıkışıklığı", en: "traffic jam" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Leserbrief",
              genreTr: "Okur mektubu",
              title: "Warum ich mein Auto behalte",
              body: `Ich lese seit Monaten, dass wir alle das Auto stehen lassen sollen. Als Krankenpflegerin im Schichtdienst kann ich das nicht.

Meine Schicht beginnt um 5.45 Uhr. Der erste Bus in meinem Ort fährt um 6.10 Uhr. Wer dafür eine Lösung hat, soll sie mir bitte schreiben.

Ich bin nicht gegen Busse und Bahnen. Ich bin dagegen, dass man Menschen ein schlechtes Gewissen macht, obwohl es für sie gar kein Angebot gibt. In der Stadt lässt sich vieles ändern, auf dem Dorf nicht.

Mein Vorschlag: Bevor Parkplätze verschwinden, muss der Bus fahren. Nicht danach. Bei uns wurde die Linie 12 gestrichen, und zwei Jahre später hat die Gemeinde die Parkgebühren erhöht. Das ist die falsche Reihenfolge.

Ich fahre gern Fahrrad, im Sommer sogar zur Arbeit. Aber im Januar um halb sechs bei Regen ist das keine Frage der Einstellung, sondern der Sicherheit.`,
              gloss: [
                { de: "der Schichtdienst", tr: "vardiyalı çalışma", en: "shift work" },
                { de: "ein schlechtes Gewissen machen", tr: "vicdan azabı çektirmek", en: "to guilt-trip" },
                { de: "streichen (eine Linie)", tr: "(hattı) kaldırmak", en: "to scrap (a line)" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-03-l2-7",
              no: 7,
              ref: "t2",
              text: "Warum hat der Autor sein Auto verkauft?",
              options: ["Aus Überzeugung.", "Weil die Reparatur zu teuer war.", "Weil er vom Land in die Stadt gezogen ist."],
              answer: 1,
              explain:
                "İlk cümle iki şeyi birden söylüyor: \"Nicht aus Überzeugung, sondern weil die Reparatur teurer gewesen wäre\". Yani inanç değil, ekonomik zorunluluk; taşınma hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l2-8",
              no: 8,
              ref: "t2",
              text: "Wie hat sich die finanzielle Lage des Autors verändert?",
              options: ["Er gibt deutlich weniger aus.", "Er gibt ungefähr gleich viel aus.", "Er gibt mehr aus als vorher."],
              answer: 0,
              explain:
                "Yeni giderler 58 artı yaklaşık 30 euro; eskisi sigorta, vergi ve servisle birlikte 300 euronun üstünde. Fark yaklaşık üç katı ve metin bunu \"Teuer geworden ist es trotzdem nicht\" diye özetliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l2-9",
              no: 9,
              ref: "t2",
              text: "Was hat den Autor überrascht?",
              options: ["Dass er mehr Sport macht.", "Dass er weniger Zeit für Wege hat.", "Dass er pünktlicher ist."],
              answer: 2,
              explain:
                "\"Ich bin pünktlicher geworden\" — sebebi de veriliyor: otobüs beklemez, eskiden hazır olunca çıkıp trafikte kalırdı. Spor ve zaman kaybı metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l2-10",
              no: 10,
              ref: "t3",
              text: "Was ist das Hauptproblem der Autorin?",
              options: ["Die Fahrkarten sind ihr im Monat zu teuer.", "Ihr Dienst beginnt vor dem ersten Bus.", "Sie kann nicht Fahrrad fahren."],
              answer: 1,
              explain:
                "İki saat karşılaştırılıyor: vardiya 5.45'te başlıyor, ilk otobüs 6.10'da kalkıyor. Bisiklete gelince yazar yazın işe bile gittiğini söylüyor, yani süremiyor değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l2-11",
              no: 11,
              ref: "t3",
              text: "Was kritisiert die Autorin an der Politik?",
              options: ["Dass die Busse zu voll und zu selten sind.", "Dass das Parken zu billig ist.", "Dass die Reihenfolge falsch ist."],
              answer: 2,
              explain:
                "Somut örnekle anlatıyor: 12 numaralı hat kaldırılmış, iki yıl sonra park ücretleri artmış. Kendi cümlesi: \"Das ist die falsche Reihenfolge\".",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l2-12",
              no: 12,
              ref: "t3",
              text: "Wie steht die Autorin zum Fahrrad?",
              options: ["Sie fährt im Sommer damit zur Arbeit.", "Sie hält das Fahrrad im Winter für unsicher.", "Sie fährt grundsätzlich nicht Rad."],
              answer: 0,
              explain:
                "\"Ich fahre gern Fahrrad, im Sommer sogar zur Arbeit\" diyor. Güvenlik itirazı bisiklete değil, ocak ayında sabah beş buçukta yağmurda gitmeye.",
            },
          ],
        },
        {
          id: "de-b1-03-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Reiseangebot. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler bir yolculuk teklifi arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Fernbus nach Prag",
              body: "Täglich 7.30 Uhr ab Busbahnhof, Ankunft 13.10 Uhr. 19 Euro, ein Gepäckstück inklusive. WLAN an Bord, keine Sitzplatzwahl, keine Fahrräder.",
            },
            {
              key: "b",
              label: "Mitfahrgelegenheit Freiburg–Zürich",
              body: "Freitags 16 Uhr, 15 Euro pro Person. Nur Handgepäck, keine Tiere. Anmeldung ausschließlich über die App, Bezahlung im Auto.",
            },
            {
              key: "c",
              label: "Radtour für Familien",
              body: "Drei Tage entlang des Flusses, 20 bis 30 Kilometer pro Tag. Gepäcktransport zwischen den Unterkünften inklusive. Kinderräder können geliehen werden.",
            },
            {
              key: "d",
              label: "Sprachreise für Jugendliche",
              body: "Zwei Wochen im Juli für 14- bis 17-Jährige. Englischunterricht am Vormittag, Programm am Nachmittag. 890 Euro mit Unterkunft und Halbpension.",
            },
            {
              key: "e",
              label: "Nachtzug nach Wien",
              body: "Abfahrt 21.50 Uhr, Ankunft 8.40 Uhr. Liegewagen ab 59 Euro. Fahrräder können gegen Aufpreis mitgenommen werden.",
            },
            {
              key: "f",
              label: "Wanderwoche in den Bergen",
              body: "Sieben Tage in kleiner Gruppe, Etappen bis 900 Höhenmeter. Ausdrücklich nicht für Anfänger. Halbpension in Berghütten.",
            },
            {
              key: "g",
              label: "Städtereise mit Führung",
              body: "Vier Tage, Hotel im Zentrum, täglich eine Führung zu Fuß oder im Rollstuhl. Barrierefreie Zimmer und Transfer auf Anfrage.",
            },
            {
              key: "h",
              label: "Camping am See",
              body: "Stellplatz ab 14 Euro pro Nacht. Hunde ausdrücklich erlaubt. Sanitärgebäude neu, Strom gegen Gebühr, Brötchenservice am Morgen.",
            },
            {
              key: "i",
              label: "Kurzurlaub am Meer, letzte Plätze",
              body: "Fünf Nächte, Abreise übermorgen, 249 Euro pro Person. Nur für zwei Personen zusammen buchbar, Anreise mit eigenem Auto.",
            },
            {
              key: "j",
              label: "Bahnfahrt mit Kindern",
              body: "Kinder bis 14 Jahre fahren in Begleitung kostenlos. Sitzplatzreservierung 4,50 Euro pro Person, nur im Fernverkehr.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-03-l3-13",
              no: 13,
              text: "Frau Adamik nimmt ihr Fahrrad mit und möchte über Nacht unterwegs sein.",
              answer: "e",
              explain:
                "(e) hem gece treni hem de ek ücretle bisiklet taşıyor — iki ölçüt de tutuyor. (a) da uzun yol ama gündüz ve bisiklet almıyor; (c) bisikletli ama üç günlük bir tur, gece yolculuğu değil.",
            },
            {
              kind: "match",
              id: "de-b1-03-l3-14",
              no: 14,
              text: "Marek reist allein ins Ausland, hat nur einen Rucksack und wenig Geld.",
              answer: "b",
              explain:
                "(b) 15 euroyla en ucuzu, yurt dışına gidiyor ve zaten yalnız el bagajı kabul ediyor. (a) da yurt dışı ama 19 euro; tek ölçütte geride kalıyor.",
            },
            {
              kind: "match",
              id: "de-b1-03-l3-15",
              no: 15,
              text: "Familie Behr will mit zwei Kindern mehrere Tage draußen sein, aber kein Gepäck tragen.",
              answer: "c",
              explain:
                "(c) çocuk bisikleti veriyor ve bagajı konaklamalar arasında taşıyor. (f) de doğada ama açıkça \"nicht für Anfänger\" diyor ve bagaj taşıması yok.",
            },
            {
              kind: "match",
              id: "de-b1-03-l3-16",
              no: 16,
              text: "Herr Osman sitzt im Rollstuhl und möchte eine fremde Stadt kennenlernen.",
              answer: "g",
              explain:
                "(g) turu tekerlekli sandalyeyle de yapılabiliyor ve engelsiz oda sunuyor. Öteki ilanların hiçbirinde erişilebilirlikle ilgili tek satır yok.",
            },
            {
              kind: "match",
              id: "de-b1-03-l3-17",
              no: 17,
              text: "Yusuf (16) soll in den Sommerferien sein Englisch verbessern.",
              answer: "d",
              explain:
                "(d) temmuzda, 14–17 yaş için ve sabahları İngilizce dersi var. Yaş aralığı ve dil, iki ölçütü birlikte karşılayan tek ilan.",
            },
            {
              kind: "match",
              id: "de-b1-03-l3-18",
              no: 18,
              text: "Frau Wenzel reist mit ihrem Hund und übernachtet gern im Freien.",
              answer: "h",
              explain:
                "(h) köpeğe açıkça izin veriyor ve kamp yeri. (b) de ucuz ama \"keine Tiere\" diyor; hayvan yasağı burada belirleyici ölçüt.",
            },
            {
              kind: "match",
              id: "de-b1-03-l3-19",
              no: 19,
              text: "Herr Timm will übermorgen mit seiner Frau ans Meer fahren und hat rund 500 Euro.",
              answer: "i",
              explain:
                "(i) yarından sonra kalkıyor, denize gidiyor, kişi başı 249 euro (toplam 498) ve yalnız iki kişi için satılıyor — dört ölçüt de tutuyor.",
            },
          ],
        },
        {
          id: "de-b1-03-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Innenstädte autofrei werden?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Şehir merkezleri araçsız mı olmalı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Autofreie Innenstadt — ja oder nein?",
              body: `Melis A.: Ich habe gegen die Sperrung gestimmt, das gebe ich zu. Mein Laden lebt von Laufkundschaft und ich hatte Angst um den Umsatz. Nach anderthalb Jahren muss ich sagen: Es kommen mehr Leute, nicht weniger. Sie bleiben nur länger stehen. Zurück will ich nicht.

Torben H.: Alle reden von der Innenstadt, niemand von den Straßen daneben. Der Verkehr ist nicht verschwunden, er fährt jetzt an meinem Fenster vorbei. Solange man nur verlagert statt zu verringern, ist das keine Lösung, sondern eine Verschiebung des Problems.

Frau Dr. Lange: Als Ärztin sehe ich vor allem die Zahlen zur Luft. Seit der Sperrung sind die Werte messbar besser, und die Zahl der Kinder mit Atembeschwerden in meiner Praxis ist zurückgegangen. Über Parkplätze kann man streiten, über Lungen nicht.

Kevin S.: Ich bin Handwerker. Mein Wagen wiegt mit Werkzeug zwei Tonnen, das trage ich nicht durch die Fußgängerzone. Man hat uns Ausnahmegenehmigungen versprochen, bekommen habe ich sie bis heute nicht. Erst die Regeln, dann die Sperrung — hier war es umgekehrt.

Ilona P.: Ich bin 74 und komme schlecht zu Fuß. Zuerst war ich entsetzt, weil ich dachte, ich komme gar nicht mehr in die Stadt. Jetzt fährt ein kleiner Elektrobus alle zehn Minuten durch die Zone und hält direkt vor der Apotheke. Für mich ist es besser geworden, nicht schlechter.

Ahmet Y.: Ich finde die Idee gut, wirklich. Aber unsere Stadt hat es falsch gemacht: keine neuen Buslinien, kein Parkhaus am Rand, dafür sofort Bußgelder. Wer so anfängt, verliert die Leute, die er eigentlich überzeugen will. Ich bin dagegen, bis das nachgeholt ist.

Nora B.: Man vergisst schnell, wie es vorher war. Ich bin hier aufgewachsen und wir haben als Kinder auf dem Bürgersteig gespielt, weil kein Platz war. Meine Tochter spielt jetzt auf dem Marktplatz. Das ist kein Nebeneffekt, das ist der eigentliche Gewinn.`,
              gloss: [
                { de: "die Laufkundschaft", tr: "geçerken uğrayan müşteri", en: "passing trade" },
                { de: "verlagern", tr: "başka yere kaydırmak", en: "to shift elsewhere" },
                { de: "die Ausnahmegenehmigung", tr: "istisna izni", en: "special permit" },
                { de: "der Nebeneffekt", tr: "yan etki", en: "side effect" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-03-l4-20",
              no: 20,
              ref: "f1",
              text: "Melis A.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Karşı oy verdiğini kendisi söylüyor, ama sonucu net: müşteri azalmadı, arttı ve \"Zurück will ich nicht\" diyor. Yorumun başı değil sonu tutumu belirliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l4-21",
              no: 21,
              ref: "f1",
              text: "Torben H.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Trafiğin kaybolmadığını, yalnız yan sokaklara kaydığını söylüyor: \"keine Lösung, sondern eine Verschiebung des Problems\". Yani uygulamanın kendisini reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l4-22",
              no: 22,
              ref: "f1",
              text: "Frau Dr. Lange",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Hava ölçümlerinin düzeldiğini ve solunum şikâyetli çocuk sayısının azaldığını söylüyor. Kapanış cümlesi tartışmayı kapatıyor: \"über Lungen nicht\".",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l4-23",
              no: 23,
              ref: "f1",
              text: "Kevin S.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "İtirazı sıraya değil sonuca kadar uzanıyor: söz verilen istisna izinlerini alamamış ve \"hier war es umgekehrt\" diyor. Fikri değil, bu uygulamayı reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l4-24",
              no: 24,
              ref: "f1",
              text: "Ilona P.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Önce dehşete kapıldığını yazıyor, sonra elektrikli otobüsü anlatıyor ve \"Für mich ist es besser geworden\" diye bitiriyor. Başlangıçtaki korku tutum değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l4-25",
              no: 25,
              ref: "f1",
              text: "Ahmet Y.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Fikri iyi bulduğunu söylüyor ama tutumu son cümlede: \"Ich bin dagegen, bis das nachgeholt ist\". Koşullu bir ret de rettir.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l4-26",
              no: 26,
              ref: "f1",
              text: "Nora B.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Eskiyi ve bugünü karşılaştırıyor: kaldırımda oynanan çocukluk, meydanda oynayan kızı. \"das ist der eigentliche Gewinn\" açık bir destek.",
            },
          ],
        },
        {
          id: "de-b1-03-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Beförderungsbedingungen und die Aufgaben 27 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Taşıma koşullarını ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Beförderungsbedingungen",
              genreTr: "Taşıma koşulları",
              title: "Beförderungsbedingungen der Regionalbus GmbH",
              body: `1. Fahrkarten
Fahrkarten sind vor dem Einstieg zu entwerten. Beim Fahrer gekaufte Karten gelten als entwertet. Wer ohne gültige Karte angetroffen wird, zahlt ein erhöhtes Beförderungsentgelt von 60 Euro, auch wenn er eine Karte besitzt und sie nur nicht entwertet hat.

2. Fahrräder
Fahrräder werden nur außerhalb der Hauptverkehrszeit befördert, also nicht zwischen 6 und 9 Uhr und nicht zwischen 15 und 18 Uhr. Pro Bus werden höchstens zwei Fahrräder mitgenommen. Klappräder gelten als Gepäck und sind jederzeit erlaubt.

3. Tiere
Kleine Tiere in geschlossenen Behältern fahren kostenlos. Hunde brauchen eine Kinderfahrkarte und einen Maulkorb. Blindenführhunde sind davon ausgenommen.

4. Verspätung
Erreichen Sie wegen einer Verspätung von mehr als 20 Minuten Ihren Anschluss nicht, erstatten wir die Kosten für ein Taxi bis 25 Euro. Der Anspruch muss innerhalb von sieben Tagen schriftlich geltend gemacht werden; die Quittung ist beizulegen.

5. Fundsachen
Gefundene Gegenstände werden vier Wochen im Betriebshof aufbewahrt. Danach gehen sie an das städtische Fundbüro. Für Wertsachen gilt eine Aufbewahrungsfrist von drei Monaten.`,
              gloss: [
                { de: "entwerten", tr: "(bileti) basmak, geçerli kılmak", en: "to validate" },
                { de: "das Beförderungsentgelt", tr: "taşıma bedeli, ceza ücreti", en: "fare charge" },
                { de: "geltend machen", tr: "hak talebinde bulunmak", en: "to assert (a claim)" },
                { de: "die Aufbewahrungsfrist", tr: "saklama süresi", en: "retention period" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-03-l5-27",
              no: 27,
              ref: "o1",
              text: "Sie haben eine Fahrkarte gekauft, aber vergessen zu entwerten. Was passiert bei einer Kontrolle?",
              options: [
                "Nichts, weil Sie eine Karte haben.",
                "Sie zahlen 60 Euro.",
                "Sie müssen die Karte nachträglich entwerten.",
              ],
              answer: 1,
              explain:
                "Madde 1 bu durumu ayrıca yazıyor: ceza \"auch wenn er eine Karte besitzt und sie nur nicht entwertet hat\" uygulanıyor. Yani bilet almış olmak kurtarmıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie wollen um 16 Uhr mit einem Klapprad einsteigen. Geht das?",
              options: [
                "Nein, zwischen 15 und 18 Uhr gar nicht.",
                "Nur wenn noch kein anderes Fahrrad im Bus ist.",
                "Ja, weil ein Klapprad als Gepäck zählt.",
              ],
              answer: 2,
              explain:
                "Saat ve adet sınırı normal bisikletler için. Katlanır bisiklet için ayrı bir cümle var: \"gelten als Gepäck und sind jederzeit erlaubt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l5-29",
              no: 29,
              ref: "o1",
              text: "Was gilt für einen Blindenführhund?",
              options: [
                "Er fährt ohne Fahrkarte und ohne Maulkorb.",
                "Er braucht eine Kinderfahrkarte.",
                "Er muss in einem Behälter transportiert werden.",
              ],
              answer: 0,
              explain:
                "Köpekler için çocuk bileti ve ağızlık şartı var, ama rehber köpekler bundan \"ausgenommen\", yani muaf. Kutu kuralı yalnız küçük hayvanlar için.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-l5-30",
              no: 30,
              ref: "o1",
              text: "Ihr Bus hatte 25 Minuten Verspätung und Sie sind mit dem Taxi weitergefahren. Was müssen Sie tun?",
              options: [
                "Die Fahrt sofort beim Fahrer melden.",
                "Innerhalb einer Woche schriftlich melden und die Quittung beilegen.",
                "Nichts, die Erstattung kommt automatisch.",
              ],
              answer: 1,
              explain:
                "Madde 4 iki koşul koyuyor: yedi gün içinde yazılı başvuru ve makbuzun eklenmesi. Otomatik ödeme ya da şoföre bildirim yönetmelikte geçmiyor.",
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
          id: "de-b1-03-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage am Bahnhof",
              genreTr: "Garda anons",
              situation: "Bir tren gecikmesi ve alternatif duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Achtung an Gleis vier: Der Regionalexpress nach Kassel hat etwa fünfundzwanzig Minuten Verspätung. Grund ist eine Störung an einem vorausfahrenden Zug. Reisende mit Anschluss in Fulda nutzen bitte den Zug um sechzehn Uhr zwölf ab Gleis sieben; dieser hält allerdings nicht in Neuhof. Wer nach Neuhof möchte, wartet auf den verspäteten Zug.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Ansage im Radio",
              genreTr: "Radyoda duyuru",
              situation: "Şehirde yeni bir ulaşım düzenlemesi duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Ab dem ersten Oktober fährt die Buslinie neun nicht mehr über den Marktplatz, sondern über die Ringstraße. Die Fahrt wird dadurch etwa vier Minuten kürzer. Zwei Haltestellen entfallen, dafür kommt eine neue am Krankenhaus dazu. Die Stadt bittet Fahrgäste, die alten Fahrpläne wegzuwerfen, weil an den Haltestellen zunächst beide Pläne hängen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Araç kiralama şirketi bir sorunu bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Berisha, hier ist Autoverleih Sander. Ihr gebuchter Kombi ist leider noch nicht zurück. Wir können Ihnen stattdessen einen kleineren Wagen zum gleichen Preis geben, oder Sie holen den Kombi zwei Stunden später ab. Rufen Sie bitte kurz zurück, damit wir nichts falsch machen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Reiseinformation",
              genreTr: "Yolculuk duyurusu",
              situation: "Feribot seferleri için bilgilendirme.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für Fährgäste: Wegen starkem Wind fällt die Zwölf-Uhr-Fähre aus. Die nächste Verbindung geht um vierzehn Uhr dreißig und ist bereits gut gebucht. Fahrzeuge werden auf dieser Fahrt nicht befördert, Fußgänger und Radfahrer schon. Tickets der ausgefallenen Fahrt behalten ihre Gültigkeit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage im Reisebus",
              genreTr: "Otobüste anons",
              situation: "Şoför mola düzenini anlatıyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Fahrgäste, wir machen gleich eine Pause von fünfundzwanzig Minuten. Bitte merken Sie sich das Kennzeichen, es stehen heute mehrere Busse unserer Farbe auf dem Rastplatz. Wer raucht, geht bitte hinter das Gebäude. Wir fahren pünktlich weiter, auch wenn nicht alle zurück sind.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-03-h1-1",
              no: 1,
              ref: "h1",
              text: "Wer nach Neuhof will, sollte in den Zug um 16.12 Uhr umsteigen.",
              answer: false,
              explain:
                "Anons tam bunu dışlıyor: erken kalkan tren Neuhof'ta durmuyor, o yüzden \"Wer nach Neuhof möchte, wartet auf den verspäteten Zug\" deniyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h1-2",
              no: 2,
              ref: "h1",
              text: "Warum hat der Zug Verspätung?",
              options: ["Wegen einer Störung an einem anderen Zug.", "Wegen eines Unwetters im ganzen Streckennetz.", "Wegen Bauarbeiten an der Strecke."],
              answer: 0,
              explain:
                "Anons gerekçeyi veriyor: \"eine Störung an einem vorausfahrenden Zug\". Hava ve inşaat bu kayıtta hiç geçmiyor; başka anonslardan tanıdık geldikleri için çeldirici.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Buslinie neun wird durch die Änderung schneller.",
              answer: true,
              explain:
                "Yeni güzergâh Ringstraße üzerinden geçiyor ve yolculuk yaklaşık dört dakika kısalıyor. Yani değişiklik süreyi uzatmıyor, kısaltıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h1-4",
              no: 4,
              ref: "h2",
              text: "Was passiert mit den Haltestellen?",
              options: ["Alle Haltestellen bleiben wie bisher.", "Zwei fallen weg, eine kommt dazu.", "Drei neue kommen dazu."],
              answer: 1,
              explain:
                "\"Zwei Haltestellen entfallen\" ve hastanede 1 yeni durak açılıyor. Net değişim eksi 1 durak; üç yeni durak diye bir şey söylenmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h1-5",
              no: 5,
              ref: "h3",
              text: "Frau Berisha kann zwischen zwei Lösungen wählen.",
              answer: true,
              explain:
                "Mesaj iki yol sunuyor: \"einen kleineren Wagen zum gleichen Preis\" ya da kombiyi 2 saat sonra almak. Karar müşteride, bu yüzden geri aranması isteniyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h1-6",
              no: 6,
              ref: "h3",
              text: "Was kostet der kleinere Wagen?",
              options: ["Deutlich weniger als gebucht.", "Mehr als gebucht.", "Genauso viel wie gebucht."],
              answer: 2,
              explain:
                "Mesaj küçük aracı \"zum gleichen Preis\" sunuyor, yani fiyat değişmiyor. Ne indirim ne zam söz konusu.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h1-7",
              no: 7,
              ref: "h4",
              text: "Wer mit dem Auto reist, kommt mit der 14.30-Fähre mit.",
              answer: false,
              explain:
                "Anons açık: \"Fahrzeuge werden auf dieser Fahrt nicht befördert\", yalnız yayalar ve bisikletliler alınıyor. Araçla gelenler için başka bir çözüm verilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h1-8",
              no: 8,
              ref: "h4",
              text: "Was gilt für die Tickets der ausgefallenen Fahrt?",
              options: ["Sie bleiben gültig.", "Sie werden erstattet.", "Sie verlieren ihren Wert."],
              answer: 0,
              explain:
                "Anons \"Tickets der ausgefallenen Fahrt behalten ihre Gültigkeit\" diyor. Para iadesinden hiç söz edilmiyor; geçerlilik ile iade aynı şey değil.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Bus wartet, bis alle Fahrgäste zurück sind.",
              answer: false,
              explain:
                "Şoför tersini söylüyor: \"Wir fahren pünktlich weiter, auch wenn nicht alle zurück sind\". Uyarı bu yüzden plakayı akılda tutmakla birlikte veriliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h1-10",
              no: 10,
              ref: "h5",
              text: "Warum soll man sich das Kennzeichen merken?",
              options: [
                "Weil der Bus während der Pause den Platz wechselt.",
                "Weil mehrere ähnliche Busse dort stehen.",
                "Weil man es beim Einsteigen zeigen muss.",
              ],
              answer: 1,
              explain:
                "Gerekçe anonsta: \"es stehen heute mehrere Busse unserer Farbe auf dem Rastplatz\". Yer değiştirme ya da kontrol hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-b1-03-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Beratungsgespräch. Wählen Sie zu den Aufgaben 11 bis 15: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir danışma görüşmesi dinleyeceksin. 11–15. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Beratungsgespräch im Reisebüro",
              genreTr: "Seyahat acentesinde danışma",
              situation: "Bir müşteri iki hafta sürecek bir yolculuk planlıyor.",
              plays: 2,
              segments: [
                { speaker: "Berater", text: "Sie wollten also zwei Wochen weg, Anfang September. Womit möchten Sie reisen?" },
                {
                  speaker: "Frau Roth",
                  text: "Am liebsten mit dem Zug. Fliegen wäre schneller, aber ich habe letztes Jahr acht Stunden am Flughafen gestanden.",
                },
                { speaker: "Berater", text: "Verstehe. Dann kommt eine Rundreise mit der Bahn in Frage. Wie viele Städte sollen es sein?" },
                { speaker: "Frau Roth", text: "Höchstens drei. Bei vier packe ich nur noch Koffer." },
                {
                  speaker: "Berater",
                  text: "Gut. Ich hätte hier Ljubljana, Zagreb und Triest. Die Strecken sind kurz, keine mehr als vier Stunden.",
                },
                { speaker: "Frau Roth", text: "Und die Unterkünfte?" },
                {
                  speaker: "Berater",
                  text: "Mittelklassehotels, alle in Bahnhofsnähe. Frühstück ist dabei, Abendessen nicht. Das kostet zusammen 1180 Euro pro Person.",
                },
                { speaker: "Frau Roth", text: "Das ist mehr, als ich wollte. Geht es auch ohne Frühstück?" },
                {
                  speaker: "Berater",
                  text: "Dann sparen Sie etwa achtzig Euro. Deutlich mehr bringt es, wenn Sie eine Woche später fahren: Ab dem fünfzehnten September sinken die Preise um fast zweihundert Euro.",
                },
                { speaker: "Frau Roth", text: "Das geht leider nicht, ich habe nur bis Mitte September Urlaub." },
                {
                  speaker: "Berater",
                  text: "Dann schlage ich vor: Wir lassen das Frühstück weg und nehmen in Zagreb eine einfachere Unterkunft. So kommen wir auf 1020 Euro.",
                },
                { speaker: "Frau Roth", text: "Das passt. Buchen Sie das bitte." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-03-h2-11",
              no: 11,
              ref: "b1",
              text: "Warum will Frau Roth nicht fliegen?",
              options: ["Fliegen ist ihr zu teuer.", "Sie hatte eine schlechte Erfahrung.", "Sie hat Angst vor dem Fliegen."],
              answer: 1,
              explain:
                "Gerekçe kendi cümlesinde: \"ich habe letztes Jahr acht Stunden am Flughafen gestanden\". Uçağın daha hızlı olduğunu kabul ediyor, yani itiraz hıza ya da korkuya değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h2-12",
              no: 12,
              ref: "b1",
              text: "Wie viele Städte möchte sie besuchen?",
              options: ["Höchstens drei.", "Genau vier.", "So viele wie möglich."],
              answer: 0,
              explain:
                "\"Höchstens drei\" diyor ve gerekçelendiriyor: dörtte yolculuk bavul toplamaya dönüyor. Dört sayısı bu yüzden reddedilen sayı.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h2-13",
              no: 13,
              ref: "b1",
              text: "Was ist im ersten Angebot enthalten?",
              options: ["Frühstück und Abendessen.", "Nur das Frühstück.", "Keine Mahlzeiten."],
              answer: 1,
              explain:
                "Danışman ayrımı açıkça yapıyor: \"Frühstück ist dabei, Abendessen nicht\". İlk fiyat 1180 euro bu kapsamla veriliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h2-14",
              no: 14,
              ref: "b1",
              text: "Warum verschiebt Frau Roth die Reise nicht auf den 15. September?",
              options: ["Weil dann die Hotels voll sind.", "Weil die Strecken dann länger sind.", "Weil ihr Urlaub vorher endet."],
              answer: 2,
              explain:
                "İki yüz euroluk indirimi duyuyor ama \"ich habe nur bis Mitte September Urlaub\" diyor. Engel fiyat değil, izin süresi.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h2-15",
              no: 15,
              ref: "b1",
              text: "Wie kommt der Endpreis von 1020 Euro zustande?",
              options: [
                "Ohne Frühstück und mit einer einfacheren Unterkunft.",
                "Durch eine spätere Abreise.",
                "Durch eine Stadt weniger.",
              ],
              answer: 0,
              explain:
                "Son öneri iki değişiklik içeriyor: kahvaltı çıkarılıyor ve Zagreb'de daha basit bir konaklama alınıyor. Tarih değişmiyor, şehir sayısı da üç kalıyor.",
            },
          ],
        },
        {
          id: "de-b1-03-h3",
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
              situation: "Bir ulaşım plancısı ilçenin yeni ulaşım planını anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Kohl",
                  text: "Guten Abend. Ich stelle Ihnen heute das Mobilitätskonzept für die kommenden fünf Jahre vor. Vorweg: Es ist kein Plan gegen das Auto, sondern ein Plan für die, die keines haben.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Zurzeit besitzen in unserer Gemeinde 43 Prozent der Haushalte kein eigenes Auto. Für sie gibt es abends nach zwanzig Uhr keine Verbindung mehr. Das ist der Kern des Problems.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Der erste Schritt ist deshalb ein Rufbus. Man bestellt ihn telefonisch oder in der App, spätestens dreißig Minuten vorher. Er fährt keine feste Route, sondern von Haltestelle zu Haltestelle nach Bedarf.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Der Rufbus kostet so viel wie eine normale Fahrkarte. Nachts zwischen dreiundzwanzig und fünf Uhr kommt ein Zuschlag von zwei Euro dazu.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Zweitens: sichere Radwege zur Schule. Wir haben die Wege von allen Grundschulen aus geprüft und dabei elf gefährliche Stellen gefunden. Sieben davon lassen sich mit Farbe und Pollern lösen, vier brauchen einen Umbau.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Drittens: Wir bauen keine neuen Parkplätze im Zentrum, aber wir nehmen auch keine weg. Das ist ein Kompromiss, mit dem beide Seiten leben können.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Zur Finanzierung: Zwei Drittel kommen vom Land, ein Drittel trägt die Gemeinde. Wenn die Landesmittel wegfallen, verschiebt sich der Radwegbau, der Rufbus aber nicht.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Und noch ein Hinweis: Der Rufbus startet im März als Versuch. Nach einem Jahr entscheidet der Gemeinderat, ob er bleibt. Ihre Rückmeldungen zählen dabei mehr als unsere Zahlen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-03-h3-16",
              no: 16,
              ref: "v1",
              text: "Das Konzept richtet sich vor allem an Menschen ohne eigenes Auto.",
              answer: true,
              explain:
                "Frau Kohl daha ilk cümlede çerçeveyi kuruyor: \"kein Plan gegen das Auto, sondern ein Plan für die, die keines haben\". 43 yüzdelik sayı da bunu destekliyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h3-17",
              no: 17,
              ref: "v1",
              text: "Der Rufbus muss mindestens eine Stunde vorher bestellt werden.",
              answer: false,
              explain:
                "Sunum \"spätestens dreißig Minuten vorher\" diyor, yani yarım saat. Bir saat şartı kayıtta hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h3-18",
              no: 18,
              ref: "v1",
              text: "Nachts ist der Rufbus teurer als am Tag.",
              answer: true,
              explain:
                "Gündüz normal bilet fiyatı geçerli; 23 ile 5 arasında iki euroluk bir ek ücret ekleniyor. Yani gece pahalı.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h3-19",
              no: 19,
              ref: "v1",
              text: "Alle gefährlichen Stellen lassen sich ohne Umbau beheben.",
              answer: false,
              explain:
                "11 tehlikeli noktadan 7'si için \"lassen sich mit Farbe und Pollern lösen\" deniyor, kalan 4'ü için inşaat gerekiyor. Yani hepsi değil.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h3-20",
              no: 20,
              ref: "v1",
              text: "Im Zentrum sollen Parkplätze wegfallen.",
              answer: false,
              explain:
                "Plan iki yönlü bir uzlaşma: yeni park yeri yapılmıyor ama var olanlar da kaldırılmıyor. Sunum bunu açıkça \"Kompromiss\" diye adlandırıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h3-21",
              no: 21,
              ref: "v1",
              text: "Die Gemeinde zahlt den größten Teil der Kosten.",
              answer: false,
              explain:
                "\"Zwei Drittel kommen vom Land, ein Drittel trägt die Gemeinde\" — büyük payı belediye değil eyalet taşıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-03-h3-22",
              no: 22,
              ref: "v1",
              text: "Ob der Rufbus bleibt, entscheidet sich nach einem Jahr.",
              answer: true,
              explain:
                "Mart'ta deneme olarak başlıyor: \"Nach einem Jahr entscheidet der Gemeinderat, ob er bleibt\". Frau Kohl geri bildirimlerin sayılardan çok sayılacağını da ekliyor.",
            },
          ],
        },
        {
          id: "de-b1-03-h4",
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
              situation: "İki konuk kısa mesafeli uçuşları tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Kurzstreckenflüge unter fünfhundert Kilometern: abschaffen oder nicht? Herr Weiler, Sie sind Verkehrsforscher.",
                },
                {
                  speaker: "Herr Weiler",
                  text: "Abschaffen ist das falsche Wort. Man muss sie nicht verbieten, sie verschwinden von selbst, sobald der Zug schneller und pünktlicher ist als der Flug samt Weg zum Flughafen.",
                },
                { speaker: "Moderatorin", text: "Frau Sander, Sie arbeiten für einen Regionalflughafen." },
                {
                  speaker: "Frau Sander",
                  text: "Ich stimme Herrn Weiler in einem Punkt zu: Der Wettbewerb entscheidet. Nur ist die Bahn bei uns eben nicht schneller. Wer aus unserer Region nach Hamburg will, sitzt mit dem Zug fünf Stunden.",
                },
                {
                  speaker: "Herr Weiler",
                  text: "Das ist richtig, und genau da liegt das Problem. Wir subventionieren seit Jahren die Flughäfen, statt die Strecke auszubauen. Das Geld war da, es wurde nur anders ausgegeben.",
                },
                {
                  speaker: "Frau Sander",
                  text: "Da widerspreche ich. Ohne unseren Flughafen wären zwölfhundert Arbeitsplätze weg, und der Ausbau der Bahnstrecke dauert mindestens zehn Jahre. Was machen die Leute in dieser Zeit?",
                },
                {
                  speaker: "Moderatorin",
                  text: "Herr Weiler, ein Einwand: Nicht jeder kann warten.",
                },
                {
                  speaker: "Herr Weiler",
                  text: "Einverstanden. Deshalb sage ich auch nicht: morgen zumachen. Ich sage: keine neuen Subventionen. Wer heute noch fliegen muss, soll fliegen. Aber wir dürfen nicht in zehn Jahren dasselbe Gespräch führen.",
                },
                {
                  speaker: "Frau Sander",
                  text: "Das kann ich unterschreiben. Mein Vorschlag: Die Subventionen laufen aus, aber gebunden an den Baufortschritt der Bahn. Nicht nach Kalender, sondern nach Kilometern.",
                },
                {
                  speaker: "Herr Weiler",
                  text: "Das ist ein guter Gedanke. Ehrlich gesagt hätte ich ihn von Ihrer Seite nicht erwartet.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Dann halten wir fest: kein Verbot, aber ein klarer Zeitplan, der an den Ausbau gekoppelt ist. Vielen Dank Ihnen beiden.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-03-h4-23",
              no: 23,
              ref: "d1",
              text: "Was hält Herr Weiler von einem Verbot?",
              options: ["Er hält es für nötig.", "Er hält es für überflüssig.", "Er hält es für zu spät für einen Beschluss."],
              answer: 1,
              explain:
                "\"Man muss sie nicht verbieten\" diyor; kısa uçuşların tren yeterince hızlanınca kendiliğinden kaybolacağını savunuyor. Yani yasağı gereksiz buluyor, geç ya da şart değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-24",
              no: 24,
              ref: "d1",
              text: "In welchem Punkt stimmt Frau Sander Herrn Weiler zu?",
              options: ["Dass der Wettbewerb entscheidet.", "Dass Flughäfen zu viel Geld bekommen.", "Dass die Bahn schneller ist."],
              answer: 0,
              explain:
                "Kendi cümlesiyle: \"Ich stimme Herrn Weiler in einem Punkt zu: Der Wettbewerb entscheidet\". Trenin hızlı olduğunu ise tam tersine reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie lange dauert die Zugfahrt nach Hamburg aus ihrer Region?",
              options: ["Zwei Stunden.", "Drei Stunden.", "Fünf Stunden."],
              answer: 2,
              explain:
                "Frau Sander \"fünf Stunden\" diyor ve bunu uçağın neden hâlâ tercih edildiğinin kanıtı olarak kullanıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-26",
              no: 26,
              ref: "d1",
              text: "Was kritisiert Herr Weiler an der bisherigen Politik?",
              options: [
                "Dass zu wenig Geld da war.",
                "Dass das Geld falsch verteilt wurde.",
                "Dass die Bahn für viele Reisende zu teuer ist.",
              ],
              answer: 1,
              explain:
                "\"Das Geld war da, es wurde nur anders ausgegeben\" — eleştiri miktara değil, yöne. Bilet fiyatı bu konuşmada hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-27",
              no: 27,
              ref: "d1",
              text: "Womit begründet Frau Sander den Erhalt des Flughafens?",
              options: ["Mit Arbeitsplätzen und der Bauzeit.", "Mit dem Klimaschutz.", "Mit den Wünschen der Reisenden aus der Region."],
              answer: 0,
              explain:
                "İki somut gerekçe veriyor: bin iki yüz iş ve hattın en az on yıllık yapım süresi. \"Was machen die Leute in dieser Zeit?\" sorusu bunu bağlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-28",
              no: 28,
              ref: "d1",
              text: "Was fordert Herr Weiler konkret?",
              options: ["Die sofortige Schließung des Flughafens.", "Höhere Ticketpreise.", "Keine neuen Subventionen."],
              answer: 2,
              explain:
                "Talebini kendisi sınırlıyor: \"Deshalb sage ich auch nicht: morgen zumachen. Ich sage: keine neuen Subventionen.\" Bilet fiyatı önerisi ondan gelmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-29",
              no: 29,
              ref: "d1",
              text: "Was schlägt Frau Sander am Ende vor?",
              options: [
                "Subventionen enden nach einem festen Datum.",
                "Subventionen enden je nach Baufortschritt.",
                "Subventionen bleiben unverändert.",
              ],
              answer: 1,
              explain:
                "Önerisini takvimle değil ilerlemeyle bağlıyor: \"Nicht nach Kalender, sondern nach Kilometern\". Bu, sabit tarihten farklı bir ölçüt.",
            },
            {
              kind: "mcq",
              id: "de-b1-03-h4-30",
              no: 30,
              ref: "d1",
              text: "Wie endet die Diskussion?",
              options: ["Mit einer gemeinsamen Linie.", "Ohne ein gemeinsames Ergebnis der beiden Gäste.", "Mit einem Streit."],
              answer: 0,
              explain:
                "Herr Weiler öneriyi \"ein guter Gedanke\" buluyor ve sunucu ortak sonucu özetliyor: yasak yok, ama yapıma bağlı bir takvim var.",
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
          id: "de-b1-03-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Marta hat Sie eingeladen, im Sommer zwei Wochen mit ihr durch Italien zu reisen. Sie können nur eine Woche mitkommen. Schreiben Sie ihr (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Marta seni yazın iki hafta boyunca İtalya'yı dolaşmaya davet etti. Sen ancak bir hafta katılabiliyorsun. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Bedanken Sie sich für die Einladung.", tr: "Davet için teşekkür et." },
              { de: "Erklären Sie, warum Sie nur eine Woche Zeit haben.", tr: "Neden yalnız bir hafta vaktin olduğunu açıkla." },
              { de: "Machen Sie einen Vorschlag, wie es trotzdem klappt.", tr: "Yine de nasıl yürüyebileceğine dair bir öneri sun." },
              { de: "Fragen Sie nach der Anreise.", tr: "Yolculuğun nasıl olacağını sor." },
            ],
            sample: `Liebe Marta,

vielen Dank für die Einladung — Italien wollte ich schon lange sehen!

Leider kann ich nur eine Woche mitkommen. Mein Chef hat den Urlaub schon geplant und ich bekomme im August nur sieben Tage frei. Das tut mir wirklich leid.

Mein Vorschlag: Ich komme in der zweiten Woche dazu. Du fährst zuerst allein nach Florenz und ich treffe dich in Rom. So verlierst du keine Zeit.

Wie kommst du eigentlich hin, mit dem Zug oder mit dem Auto? Wenn du fliegst, buche ich denselben Rückflug.

Liebe Grüße
Ana`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Ret kibar ve gerekçeli mi? (leider, weil, deshalb)",
              "Öneri somut mu — ne zaman, nerede buluşulacak?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı ve ton uygun mu?",
              "Yaklaşık 80 kelime var mı ve metin paragraflara ayrılmış mı?",
            ],
          },
        },
        {
          id: "de-b1-03-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Online-Forum wird diskutiert: \"Soll der Nahverkehr für alle kostenlos sein?\" Schreiben Sie einen Beitrag (circa 80 Wörter). Nennen Sie Ihre Meinung, ein Argument dafür und ein Argument dagegen.",
          promptTr:
            "Bir çevrimiçi forumda tartışılıyor: \"Toplu taşıma herkes için ücretsiz mi olmalı?\" Bir yorum yaz (yaklaşık 80 kelime). Görüşünü, bir destekleyici ve bir karşı argüman söyle.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie Ihre Meinung klar.", tr: "Görüşünü açıkça söyle." },
              { de: "Geben Sie ein Argument dafür.", tr: "Lehte bir gerekçe ver." },
              { de: "Geben Sie ein Argument dagegen.", tr: "Aleyhte bir gerekçe ver." },
              { de: "Ziehen Sie ein Fazit.", tr: "Bir sonuca bağla." },
            ],
            sample: `Ich finde die Idee grundsätzlich gut, aber sie ist nur der zweite Schritt.

Dafür spricht viel: Wer wenig verdient, spart im Monat leicht sechzig Euro. Außerdem steigen mehr Menschen um, wenn sie an der Haltestelle nicht erst über den Preis nachdenken müssen.

Dagegen spricht, dass kostenlose Busse nichts nützen, wenn sie nur zweimal am Tag fahren. Bei uns auf dem Dorf ist das genau so.

Mein Fazit: erst mehr Verbindungen, dann günstigere Preise. Sonst wird der Nahverkehr billig, aber bleibt unbrauchbar.`,
            criteria: [
              "Görüş ilk cümlelerde net söylenmiş mi?",
              "Lehte ve aleyhte birer gerekçe gerçekten ayrı ayrı verilmiş mi?",
              "Gerekçeler somut mu (sayı, örnek, kendi deneyimi)?",
              "Sonuç, verilen iki gerekçeyle tutarlı mı?",
              "Forum yazısına uygun bir ton ve yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-03-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Bus hatte 40 Minuten Verspätung und Sie mussten ein Taxi nehmen. Die Quittung über 22 Euro haben Sie. Schreiben Sie an die Regionalbus GmbH (circa 40 Wörter).",
          promptTr:
            "Otobüsün 40 dakika geç kaldı ve taksiye binmek zorunda kaldın. 22 euroluk makbuz elinde. Regionalbus GmbH'ye yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie Fahrt, Datum und Verspätung.", tr: "Seferi, tarihi ve gecikmeyi belirt." },
              { de: "Beschreiben Sie, was Sie deshalb tun mussten.", tr: "Bu yüzden ne yapmak zorunda kaldığını anlat." },
              { de: "Bitten Sie um Erstattung und verweisen Sie auf die Quittung.", tr: "İadeyi rica et ve makbuza atıf yap." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 14. Mai hatte die Linie 12 um 17.05 Uhr ab Hauptbahnhof rund 40 Minuten Verspätung. Meinen Anschluss in Bergen habe ich dadurch nicht erreicht und bin mit dem Taxi weitergefahren.

Ich bitte Sie um Erstattung der Taxikosten von 22 Euro. Die Quittung liegt bei.

Mit freundlichen Grüßen
Jan Petrov`,
            criteria: [
              "Sefer somut tanımlanmış mı? (hat, saat, tarih, durak)",
              "Gecikme ile taksi arasındaki neden-sonuç açık mı?",
              "İade talebi ve tutar açıkça yazılmış mı?",
              "Makbuza atıf var mı? (Die Quittung liegt bei / anbei)",
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
          id: "de-b1-03-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam eine Wochenendreise für Ihre Lerngruppe. Sprechen Sie über: Ziel — Verkehrsmittel — Übernachtung — Kosten — Programm.",
          promptTr:
            "Kursunuz için birlikte bir hafta sonu gezisi planlayın. Şunları konuşun: yer — ulaşım — konaklama — bütçe — program.",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen die Wochenendreise. Fangen wir mit dem Ziel an: Wohin sollen wir fahren?",
              tr: "Hafta sonu gezisini birlikte planlıyoruz. Yerle başlayalım: Nereye gidelim?",
            },
            { who: "you", hint: "Bir yer öner ve neden orayı seçtiğini söyle.", expect: "somut bir hedef önermek ve gerekçelendirmek", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Und wie kommen wir hin? Der Zug ist bequem, aber für zwölf Personen ziemlich teuer.",
              tr: "Anlaştık. Peki nasıl gideceğiz? Tren rahat ama on iki kişi için epey pahalı.",
            },
            {
              who: "you",
              hint: "Fiyat itirazına karşılık ver ve bir ulaşım biçimi öner.",
              expect: "bir itiraza karşılık vermek ve alternatif bir ulaşım önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Gut. Bei der Übernachtung habe ich zwei Ideen: Jugendherberge oder eine große Ferienwohnung. Was meinen Sie?",
              tr: "Peki. Konaklama için iki fikrim var: gençlik yurdu ya da büyük bir tatil dairesi. Sen ne dersin?",
            },
            {
              who: "you",
              hint: "İki seçenekten birini seç ve tercihini gerekçelendir.",
              expect: "iki seçenek arasında karşılaştırmalı bir tercih yapmak",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Bleibt das Programm. Manche wollen wandern, andere lieber ins Museum. Wie lösen wir das?",
              tr: "Geriye program kaldı. Bazıları yürüyüş, bazıları müze istiyor. Bunu nasıl çözelim?",
            },
            {
              who: "you",
              hint: "İki isteği birleştiren bir çözüm öner.",
              expect: "çatışan iki isteği birleştiren bir öneri sunmak",
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
              "Ich schlage Dresden vor, weil es mit dem Zug nur zwei Stunden entfernt ist und viel zu sehen bietet. Wenn der Zug zu teuer ist, könnten wir ein Gruppenticket nehmen oder einen Kleinbus mieten. Ich wäre für die Ferienwohnung, weil wir dort zusammen kochen können und das billiger wird. Beim Programm machen wir es so: Am Samstagvormittag wandern wir, am Nachmittag geht jeder dorthin, wohin er will. Abends treffen wir uns alle wieder.",
            criteria: [
              "Beş noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi? (weil, deshalb, denn)",
              "Karşı tarafın itirazına gerçekten karşılık verildi mi, yoksa konu mu değiştirildi?",
              "Karşılaştırma yapılabildi mi? (günstiger als, lieber … als)",
              "Konuşma bir karara bağlandı mı?",
            ],
          },
        },
        {
          id: "de-b1-03-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag zum Thema \"Reisen früher und heute\". Gliedern Sie: Einleitung — Situation in Ihrem Heimatland — eigene Erfahrung — Vorteile und Nachteile — Ihre Meinung.",
          promptTr:
            "\"Eskiden ve bugün yolculuk\" konusunda kısa bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — kendi deneyimin — artılar ve eksiler — kendi görüşün.",
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
              "Ich möchte heute über das Thema Reisen sprechen. Zuerst erzähle ich, wie man bei uns früher gereist ist, dann von meiner eigenen Erfahrung, und am Ende sage ich meine Meinung. In der Türkei sind früher fast alle mit dem Bus gefahren; Flüge waren teuer und selten. Heute fliegen viele Familien im Inland, weil es oft billiger ist als der Bus. Ich selbst bin als Kind zwölf Stunden im Bus zu meinen Großeltern gefahren. Das war anstrengend, aber wir haben unterwegs viele Leute kennengelernt. Ein Vorteil von heute ist die Zeit: Man ist in einer Stunde da. Ein Nachteil ist, dass man vom Land nichts mehr sieht. Meiner Meinung nach ist das Reisen bequemer, aber ärmer geworden.",
            criteria: [
              "Beş bölümün hepsi var mı ve sırayla mı?",
              "Giriş sunumun yapısını duyuruyor mu? (Zuerst … dann … am Ende)",
              "Kendi deneyimi somut mu (yer, süre, yaş)?",
              "En az bir artı ve bir eksi karşılaştırmalı biçimde verildi mi?",
              "Görüş gerekçeli mi ve önceki bölümlerle tutarlı mı?",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-03-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf ein Problem. Eine Kollegin bittet Sie, ihre Schicht am Samstag zu übernehmen, weil sie verreisen möchte. Sie haben an diesem Tag schon etwas vor.",
          promptTr:
            "Bir soruna tepki ver. Bir iş arkadaşın cumartesi vardiyasını devralmanı istiyor, çünkü yolculuğa çıkacak. Senin o gün başka bir planın var.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Du, ich habe eine Bitte. Könntest du am Samstag meine Schicht übernehmen? Ich habe einen günstigen Flug gefunden.",
              tr: "Bir ricam var. Cumartesi vardiyamı devralabilir misin? Ucuz bir uçuş buldum.",
            },
            {
              who: "you",
              hint: "Ricayı geri çevir ama nedenini söyle ve kapıyı kapatma.",
              expect: "bir ricayı kibarca reddetmek ve gerekçelendirmek",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Das verstehe ich. Aber sonst finde ich niemanden und der Flug ist schon gebucht. Gibt es wirklich keine Möglichkeit?",
              tr: "Anlıyorum. Ama başka kimseyi bulamıyorum ve uçak bileti alındı. Gerçekten hiçbir yolu yok mu?",
            },
            {
              who: "you",
              hint: "Kısmi bir çözüm ya da alternatif öner.",
              expect: "kısmi bir çözüm ya da üçüncü bir yol önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Das wäre eine Möglichkeit. Und wenn ich dafür deine Schicht am nächsten Freitag übernehme?",
              tr: "Bu bir ihtimal olabilir. Peki karşılığında ben de gelecek cuma senin vardiyanı alsam?",
            },
            {
              who: "you",
              hint: "Teklife karşılık ver ve anlaşmayı netleştir.",
              expect: "bir takas teklifini kabul ya da reddederek anlaşmayı netleştirmek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich ablehnen und begründen", tr: "Kibarca reddetmek ve gerekçelendirmek" },
              { de: "eine Alternative anbieten", tr: "Alternatif sunmak" },
              { de: "eine Vereinbarung treffen", tr: "Bir anlaşmaya varmak" },
            ],
            sample:
              "Das tut mir leid, am Samstag geht es wirklich nicht — meine Schwester heiratet und ich bin schon eingeladen. Aber ich könnte den Sonntag übernehmen, wenn dir das hilft. Oder du fragst Kemal, er hat letzte Woche gesagt, dass er Stunden sammeln will. Wenn du dafür meinen Freitag nimmst, machen wir es so: Ich nehme deinen Sonntag, du meinen Freitag. Einverstanden?",
            criteria: [
              "Ret kibar ve gerekçeli mi? (Das tut mir leid, weil …)",
              "Gerçekten bir alternatif sunuldu mu, yoksa yalnız reddedildi mi?",
              "Karşı teklife ayrıntılı karşılık verildi mi?",
              "Anlaşma sonunda net olarak özetlendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
