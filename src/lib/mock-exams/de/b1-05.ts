import type { MockPaper } from "../types";

/**
 * B1 · Deneme 5 — "Gesundheit und Ernährung".
 *
 * PLAN kâğıt 1–4 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 gist · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karışık · 5 danışma · 7 R/F sunum · 8 tartışma)
 *   Schreiben 60 dk           (80 + 80 + 40 kelime)
 *   Sprechen  15 dk           planlama · sunum · soruna tepki
 *
 * KONU SEÇİMİ: sağlık ve beslenme, herkesin bir görüşü olduğu için B1'in
 * asıl ölçtüğü şeyi zorluyor: bir metnin neyi kabul edip neyi reddettiğini
 * ayırmak. Forum yorumlarının çoğu kendi tarafının bir zayıflığını da
 * kabul ediyor.
 */
export const B1_05: MockPaper = {
  id: "de-b1-05",
  course: "de",
  level: "B1",
  no: 5,
  theme: "Gesundheit und Ernährung",
  themeTr: "Sağlık ve beslenme",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Erfahrungsbericht, zwei Meinungstexte, Anzeigen, Forumsbeiträge und Teilnahmebedingungen.",
      instructionTr:
        "Bu bölümde beş görev var. Bir deneyim yazısı, iki görüş metni, ilanlar, forum yorumları ve katılım koşulları okuyacaksın.",
      tasks: [
        {
          id: "de-b1-05-l1",
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
              title: "Was mir die Ernährungsberatung wirklich gebracht hat",
              body: `Zur Ernährungsberatung bin ich nicht freiwillig gegangen. Mein Hausarzt hat mir die Überweisung fast aufgedrängt, nachdem zwei Blutwerte auffällig waren.

Ich hatte einen Vortrag über Kalorien erwartet. Stattdessen hat die Beraterin mich gebeten, zwei Wochen lang alles aufzuschreiben, was ich esse — ohne etwas zu ändern. Das kam mir sinnlos vor. Beim dritten Termin hat sie das Heft aufgeschlagen und mir gezeigt, dass ich an Arbeitstagen zwischen zehn und vierzehn Uhr nichts esse und abends dafür zweimal.

Diesen Zusammenhang hätte ich allein nie gesehen. Ich dachte, mein Problem sei Schokolade. Tatsächlich war es der Mittag, den es bei mir nicht gab.

Geändert habe ich am Ende wenig. Ich nehme mir morgens etwas mit, das ich am Schreibtisch essen kann, und ich trinke Wasser statt Saft. Die Beraterin hat mir ausdrücklich abgeraten, mehr als zwei Dinge gleichzeitig zu verändern.

Nach vier Monaten waren die Werte wieder normal. Abgenommen habe ich dabei kaum, und das hat mich zuerst enttäuscht. Die Beraterin fand es dagegen gut: Der Körper habe nicht weniger bekommen, sondern regelmäßiger.

Zwei Dinge nehme ich mit. Erstens: Ein Ernährungsproblem ist oft ein Zeitproblem. Zweitens: Wer alles gleichzeitig ändert, ändert nach drei Wochen nichts mehr.`,
              gloss: [
                { de: "die Überweisung", tr: "sevk belgesi", en: "referral" },
                { de: "auffällig", tr: "dikkat çekici, normal dışı", en: "abnormal, striking" },
                { de: "abraten", tr: "vazgeçirmeye çalışmak", en: "to advise against" },
                { de: "abnehmen", tr: "kilo vermek", en: "to lose weight" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-05-l1-1",
              no: 1,
              ref: "t1",
              text: "Der Autor hat die Beratung selbst gesucht.",
              answer: false,
              explain:
                "İlk cümle tersini söylüyor: \"nicht freiwillig\" gitmiş ve sevki hekim \"fast aufgedrängt\". Gerekçe de iki kan değerinin bozuk çıkması.",
            },
            {
              kind: "bool",
              id: "de-b1-05-l1-2",
              no: 2,
              ref: "t1",
              text: "In den ersten zwei Wochen sollte er sein Essen nicht umstellen.",
              answer: true,
              explain:
                "Danışman yalnız kayıt tutmasını istemiş: \"alles aufzuschreiben, was ich esse — ohne etwas zu ändern\". Değişiklik sonraya bırakılıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-l1-3",
              no: 3,
              ref: "t1",
              text: "Sein eigentliches Problem war die Schokolade.",
              answer: false,
              explain:
                "Kendisi öyle sanıyordu, ama defter başka bir şey gösteriyor: iş günlerinde 10–14 arası hiçbir şey yemiyor. \"Tatsächlich war es der Mittag, den es bei mir nicht gab.\"",
            },
            {
              kind: "bool",
              id: "de-b1-05-l1-4",
              no: 4,
              ref: "t1",
              text: "Die Beraterin hat ihm von zu vielen Änderungen auf einmal abgeraten.",
              answer: true,
              explain:
                "Metin bunu açıkça söylüyor: \"ausdrücklich abgeraten, mehr als zwei Dinge gleichzeitig zu verändern\". Son paragraf da aynı sonucu tekrarlıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-l1-5",
              no: 5,
              ref: "t1",
              text: "Nach vier Monaten hatte er deutlich abgenommen.",
              answer: false,
              explain:
                "Kan değerleri normale dönmüş ama \"Abgenommen habe ich dabei kaum\". Yazar bunu önce hayal kırıklığı olarak yaşıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-l1-6",
              no: 6,
              ref: "t1",
              text: "Die Beraterin bewertete das Ergebnis positiv.",
              answer: true,
              explain:
                "Danışman aynı sonucu iyi buluyor ve gerekçelendiriyor: vücut daha az değil, \"regelmäßiger\" beslenmiş.",
            },
          ],
        },
        {
          id: "de-b1-05-l2",
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
              title: "Warum ich Sport nicht mag und trotzdem laufe",
              body: `Ich habe Sport in der Schule gehasst, und daran hat sich nichts geändert. Trotzdem laufe ich seit drei Jahren dreimal pro Woche.

Der Grund ist unromantisch: Mein Weg zur Arbeit dauert mit dem Bus zweiundzwanzig Minuten und zu Fuß fünfunddreißig. Als die Linie im Winter zweimal ausgefallen ist, bin ich gelaufen — und war schneller da als die Kollegen, die im Stau standen.

Seitdem laufe ich morgens, aber nicht als Sport. Ich nenne es Weg. Dieser Unterschied klingt albern und ist für mich entscheidend: Für Sport bräuchte ich Motivation, für einen Weg nicht.

Was ich anderen rate, klingt deshalb anders als die üblichen Tipps. Sucht euch keine Sportart, die euch Spaß macht. Sucht eine Bewegung, die ihr sowieso machen müsst, und macht sie länger.

Natürlich hat das Grenzen. Wer Kinder in die Kita bringt, kann seinen Weg nicht verlängern. Und mein Rücken wäre mit richtigem Krafttraining wahrscheinlich besser dran. Aber ein mittelmäßiger Plan, den ich seit drei Jahren durchhalte, schlägt den perfekten, den ich nach zwei Wochen aufgebe.`,
              gloss: [
                { de: "albern", tr: "gülünç, çocukça", en: "silly" },
                { de: "durchhalten", tr: "sürdürebilmek", en: "to keep up" },
                { de: "mittelmäßig", tr: "vasat", en: "mediocre" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Leserbrief",
              genreTr: "Okur mektubu",
              title: "Kochen gehört auf den Stundenplan",
              body: `Sie haben letzte Woche geschrieben, Schulen sollten sich um Bildung kümmern und nicht ums Essen. Als Lehrerin an einer Gesamtschule sehe ich das anders, und zwar aus einem sehr praktischen Grund.

In meiner letzten neunten Klasse konnten vier von sechsundzwanzig Schülerinnen und Schülern eine warme Mahlzeit zubereiten. Nicht kochen im Sinne von Rezepten — sondern Reis aufsetzen, ohne dass er anbrennt.

Man wendet gern ein, das sei Aufgabe der Eltern. Formal stimmt das. Nur ändert dieser Satz nichts an den zweiundzwanzig anderen Jugendlichen, die in drei Jahren allein wohnen werden.

Ich fordere kein neues Fach. Wir haben zwei Stunden Hauswirtschaft, die in den meisten Schulen zuerst gestrichen werden, wenn Lehrkräfte fehlen. Es würde reichen, sie nicht zu streichen.

Der teuerste Teil ist übrigens nicht das Essen, sondern die Küche. Bei uns kostet ein Kurs mit zwölf Jugendlichen etwa vierzig Euro an Zutaten. Das ist weniger als ein Klassensatz Arbeitshefte.`,
              gloss: [
                { de: "zubereiten", tr: "hazırlamak (yemek)", en: "to prepare (food)" },
                { de: "anbrennen", tr: "dibi tutmak, yanmak", en: "to burn (food)" },
                { de: "einwenden", tr: "itiraz etmek", en: "to object" },
                { de: "streichen", tr: "kaldırmak, iptal etmek", en: "to cut, to scrap" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-05-l2-7",
              no: 7,
              ref: "t2",
              text: "Wie kam der Autor zum Laufen?",
              options: [
                "Durch eine Empfehlung seines Arztes.",
                "Weil zweimal der Bus ausgefallen ist.",
                "Weil ihm Sport in der Schule Spaß gemacht hat.",
              ],
              answer: 1,
              explain:
                "Başlangıç noktası \"Als die Linie im Winter zweimal ausgefallen ist\"; o gün yürüyerek trafikte kalanlardan önce varmış. Okuldaki spordan nefret ettiğini ise ilk cümlede söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l2-8",
              no: 8,
              ref: "t2",
              text: "Warum nennt er das Laufen keinen Sport?",
              options: [
                "Weil er ohne Motivation auskommen will.",
                "Weil er keinen festen Plan braucht.",
                "Weil er dafür keine besondere Ausrüstung braucht.",
              ],
              answer: 0,
              explain:
                "Ayrımı kendisi kuruyor: \"Für Sport bräuchte ich Motivation, für einen Weg nicht\". Kulüp ve ekipman metinde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l2-9",
              no: 9,
              ref: "t2",
              text: "Wie steht der Autor zu den Grenzen seines Rats?",
              options: [
                "Er hält Einwände dagegen für unbegründet.",
                "Er nennt keine Nachteile seines Vorgehens.",
                "Er räumt zwei Schwächen offen ein.",
              ],
              answer: 2,
              explain:
                "Son paragrafta iki sınırı kendisi sayıyor: kreşe çocuk götüren yolunu uzatamaz, ve \"mein Rücken wäre mit richtigem Krafttraining wahrscheinlich besser dran\".",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l2-10",
              no: 10,
              ref: "t3",
              text: "Womit begründet die Lehrerin ihre Forderung?",
              options: [
                "Mit einer Beobachtung in ihrer eigenen Klasse.",
                "Mit einer Studie aus mehreren Bundesländern.",
                "Mit den Wünschen der Eltern an der Schule.",
              ],
              answer: 0,
              explain:
                "Gerekçesi kendi sınıfından bir sayı: 26 öğrenciden yalnız dördü sıcak bir yemek hazırlayabiliyor. Araştırma ya da veli talebi metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l2-11",
              no: 11,
              ref: "t3",
              text: "Wie geht sie mit dem Einwand um, das sei Sache der Eltern?",
              options: [
                "Sie hält die Eltern in dieser Frage für überfordert.",
                "Sie nennt ihn formal richtig, aber folgenlos.",
                "Sie geht darauf nicht weiter ein.",
              ],
              answer: 1,
              explain:
                "\"Formal stimmt das\" diyor ve hemen ardından bunun kalan yirmi iki genç için hiçbir şeyi değiştirmediğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l2-12",
              no: 12,
              ref: "t3",
              text: "Was fordert sie konkret?",
              options: [
                "Ein neues Schulfach für Ernährung.",
                "Eine neue Küche in jeder Schule.",
                "Den vorhandenen Unterricht nicht mehr zu streichen.",
              ],
              answer: 2,
              explain:
                "\"Ich fordere kein neues Fach\" diyor; talebi var olan iki saatin öğretmen açığında ilk kaldırılan ders olmaktan çıkması.",
            },
          ],
        },
        {
          id: "de-b1-05-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot rund um Gesundheit. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler sağlıkla ilgili bir hizmet arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Rückenkurs am Abend",
              body: "Zehn Termine, dienstags 19 bis 20 Uhr. Für Menschen mit sitzender Arbeit. Die Krankenkasse zahlt bis zu 80 Prozent zurück.",
            },
            {
              key: "b",
              label: "Kochkurs für Anfänger",
              body: "Vier Samstage, jeweils drei Stunden. Einfache Gerichte für den Alltag, alle Zutaten inklusive. 60 Euro, ohne Vorkenntnisse.",
            },
            {
              key: "c",
              label: "Laufgruppe Anfänger",
              body: "Sonntags 8.30 Uhr am Sportplatz. Wechsel aus Gehen und Laufen, Strecken bis fünf Kilometer. Kostenlos, keine Anmeldung.",
            },
            {
              key: "d",
              label: "Ernährungsberatung für Familien",
              body: "Einzeltermine, auch mit Kindern. Erstgespräch 60 Minuten. Mit ärztlicher Überweisung übernimmt die Kasse die Kosten.",
            },
            {
              key: "e",
              label: "Wassergymnastik am Vormittag",
              body: "Dienstag und Freitag 10 Uhr im warmen Becken. Besonders bei Gelenkproblemen. Kein Schwimmen nötig, 8 Euro pro Termin.",
            },
            {
              key: "f",
              label: "Raucherentwöhnung",
              body: "Sechs Abende in kleiner Gruppe, Beginn im März. Mit ärztlicher Begleitung. 90 Euro, Rückerstattung durch viele Kassen möglich.",
            },
            {
              key: "g",
              label: "Yoga für Schwangere",
              body: "Ab der zwölften Woche, mittwochs 17 Uhr. Kleine Gruppen, Matten vorhanden. Zehn Termine, 120 Euro.",
            },
            {
              key: "h",
              label: "Mittagstisch im Stadtteilhaus",
              body: "Montag bis Freitag warmes Essen für 4,50 Euro. Ohne Anmeldung, auch zum Mitnehmen. Vegetarisch immer im Angebot.",
            },
            {
              key: "i",
              label: "Schlafberatung",
              body: "Zwei Einzeltermine plus ein Schlaftagebuch über zwei Wochen. Für Menschen, die schlecht einschlafen. 140 Euro, keine Kassenleistung.",
            },
            {
              key: "j",
              label: "Erste Hilfe am Kind",
              body: "Ein Samstag, sechs Stunden. Für Eltern und Großeltern. 45 Euro, Kinderbetreuung im Haus möglich.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-05-l3-13",
              no: 13,
              text: "Frau Ehlers sitzt acht Stunden am Schreibtisch und hat abends Rückenschmerzen. Tagsüber kann sie nicht.",
              answer: "a",
              explain:
                "(a) hem akşam saatinde hem de \"für Menschen mit sitzender Arbeit\" kurulmuş; üstelik kasa maliyetin çoğunu geri ödüyor. (e) de sırt için iyi ama sabah 10'da.",
            },
            {
              kind: "match",
              id: "de-b1-05-l3-14",
              no: 14,
              text: "Herr Palm wohnt seit dem Tod seiner Frau allein und hat nie gekocht.",
              answer: "b",
              explain:
                "(b) başlangıç düzeyi, \"ohne Vorkenntnisse\" ve günlük basit yemekler öğretiyor. (h) sıcak yemek veriyor ama pişirmeyi öğretmiyor.",
            },
            {
              kind: "match",
              id: "de-b1-05-l3-15",
              no: 15,
              text: "Frau Ito möchte mit Bewegung anfangen, traut sich aber nicht in einen Verein und hat kein Geld dafür.",
              answer: "c",
              explain:
                "(c) ücretsiz, kayıt gerektirmiyor ve yürüyüşle koşuyu değiştirerek başlıyor — yeni başlayan için tasarlanmış tek ilan.",
            },
            {
              kind: "match",
              id: "de-b1-05-l3-16",
              no: 16,
              text: "Familie Osmani hat vom Kinderarzt eine Überweisung bekommen und soll die Ernährung umstellen.",
              answer: "d",
              explain:
                "(d) aile danışmanlığı yapıyor ve \"mit ärztlicher Überweisung\" masrafı kasa üstleniyor. Sevk belgesi bu ilanla eşleşen ölçüt.",
            },
            {
              kind: "match",
              id: "de-b1-05-l3-17",
              no: 17,
              text: "Herr Djalili hat Probleme mit den Knien und kann nicht schwimmen.",
              answer: "e",
              explain:
                "(e) eklem sorunları için sıcak havuzda jimnastik sunuyor ve \"Kein Schwimmen nötig\" diyor. İki ölçütü birlikte karşılayan tek ilan.",
            },
            {
              kind: "match",
              id: "de-b1-05-l3-18",
              no: 18,
              text: "Frau Brenner liegt jede Nacht stundenlang wach und war deswegen schon beim Arzt.",
              answer: "i",
              explain:
                "(i) doğrudan uykuya dalamayanlar için: iki görüşme ve iki haftalık uyku günlüğü. Ücreti kasa karşılamıyor, ama ihtiyacı karşılayan tek ilan bu.",
            },
            {
              kind: "match",
              id: "de-b1-05-l3-19",
              no: 19,
              text: "Herr Nagel wird im Sommer Großvater und möchte im Notfall richtig reagieren können.",
              answer: "j",
              explain:
                "(j) açıkça \"Für Eltern und Großeltern\" ve çocukta ilk yardım öğretiyor. Bir günlük olması da uygunluğu artırıyor.",
            },
          ],
        },
        {
          id: "de-b1-05-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Soll es in Kantinen einen Tag ohne Fleisch geben?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Yemekhanelerde etsiz bir gün olmalı mı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Ein Tag ohne Fleisch in der Kantine — ja oder nein?",
              body: `Sonja W.: Ich habe die Umstellung bei uns mitgemacht und war anfangs genervt. Man hat uns nicht gefragt, das ärgert mich bis heute. Trotzdem: Seit dem Donnerstag ohne Fleisch essen mehr Leute in der Kantine, nicht weniger, weil die vegetarischen Gerichte endlich besser geworden sind. Ich würde nicht zurückgehen wollen.

Erik B.: Ich arbeite auf dem Bau und brauche mittags etwas Richtiges. Man sagt mir, es gebe genug Eiweiß in Linsen. Mag sein. Nach vier Stunden auf dem Dach entscheide ich das aber lieber selbst. Wer den ganzen Tag sitzt, soll nicht über meinen Teller bestimmen.

Frau Dr. Neuhoff: Als Betriebsärztin sehe ich vor allem eine Zahl: Die Hälfte unserer Beschäftigten hat Werte, die von weniger rotem Fleisch profitieren würden. Ein fester Tag ist ein grobes Mittel, aber er wirkt, weil er niemanden zur Entscheidung zwingt.

Marek T.: Ich esse selbst kaum Fleisch. Trotzdem halte ich Vorschriften für den falschen Weg. Bei uns wurde der Preis für das vegetarische Gericht um einen Euro gesenkt — die Quote ist ohne jeden Zwang von 20 auf 45 Prozent gestiegen. Warum verbieten, wenn rechnen reicht?

Ilse K.: Ich bin 61 und esse seit sechzig Jahren fast täglich Fleisch. Als es hieß, wir bekommen einen fleischlosen Tag, habe ich unterschrieben, dass ich dagegen bin. Inzwischen freue ich mich donnerstags auf den Auflauf. Man muss alte Leute nicht fragen, ob sie etwas Neues wollen. Man muss es ihnen zweimal geben.

Tobias R.: Mich stört nicht der Tag, mich stört die Begründung. Erst hieß es Gesundheit, dann Klima, jetzt Kosten. Wer bei jedem Widerspruch das Argument wechselt, hat kein Argument. Solange das so läuft, bin ich dagegen.

Anja P.: In unserer Kantine essen 400 Leute. Ohne festen Tag kocht die Küche jeden Tag zwei Linien und wirft mehr weg. Der eine Tag hat den Abfall um ein Fünftel gesenkt. Über Geschmack kann man streiten, über die Tonne nicht.`,
              gloss: [
                { de: "die Umstellung", tr: "değişiklik, geçiş", en: "changeover" },
                { de: "das Eiweiß", tr: "protein", en: "protein" },
                { de: "der Zwang", tr: "zorlama", en: "compulsion" },
                { de: "der Abfall", tr: "atık", en: "waste" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-05-l4-20",
              no: 20,
              ref: "f1",
              text: "Sonja W.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Sürecin sorulmadan yürütülmesine hâlâ kızıyor, ama sonucu net: yemekhaneye daha çok kişi geliyor ve \"Ich würde nicht zurückgehen wollen\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l4-21",
              no: 21,
              ref: "f1",
              text: "Erik B.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Mercimekteki proteini tartışmıyor bile; itirazı karar yetkisine: \"entscheide ich das aber lieber selbst\" ve masasına karışılmasını reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l4-22",
              no: 22,
              ref: "f1",
              text: "Frau Dr. Neuhoff",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Sabit günü \"ein grobes Mittel\" diye niteliyor ama işe yaradığını söylüyor, çünkü kimseyi karar vermeye zorlamıyor. Kaba bulmak reddetmek değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l4-23",
              no: 23,
              ref: "f1",
              text: "Marek T.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendisi neredeyse et yemiyor, ama kuralı yanlış yol buluyor ve fiyat indiriminin zorlamasız işe yaradığını gösteriyor: \"Warum verbieten, wenn rechnen reicht?\"",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l4-24",
              no: 24,
              ref: "f1",
              text: "Ilse K.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Başta karşı imza atmış, ama şimdi perşembe yemeğini iple çekiyor: \"Inzwischen freue ich mich donnerstags auf den Auflauf\". Kapanış cümlesi tutumu belirliyor: yeni bir şeyi sormak yerine iki kez vermek gerekir.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l4-25",
              no: 25,
              ref: "f1",
              text: "Tobias R.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Günün kendisine değil gerekçelerin değişmesine itiraz ediyor, ama sonucu açık: \"Solange das so läuft, bin ich dagegen\". Koşullu bir ret de rettir.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l4-26",
              no: 26,
              ref: "f1",
              text: "Anja P.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Tartışmayı damak tadından çıkarıp atığa taşıyor: sabit gün çöpü beşte bir azaltmış. \"Über die Tonne\" tartışılamayacağını söylemesi destek anlamına geliyor.",
            },
          ],
        },
        {
          id: "de-b1-05-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Teilnahmebedingungen und die Aufgaben 27 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Katılım koşullarını ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Teilnahmebedingungen",
              genreTr: "Katılım koşulları",
              title: "Teilnahmebedingungen — Gesundheitskurse der Kasse",
              body: `1. Wer teilnehmen kann
Teilnehmen können alle Versicherten ab 18 Jahren. Für Kurse mit dem Vermerk "Aufbau" ist die Teilnahme an einem Grundkurs innerhalb der letzten zwei Jahre nachzuweisen.

2. Kosten und Erstattung
Sie zahlen den Kurs zunächst selbst. Erstattet werden 80 Prozent, höchstens jedoch 100 Euro je Kurs und zwei Kurse pro Kalenderjahr. Die Erstattung setzt voraus, dass Sie an mindestens 80 Prozent der Termine teilgenommen haben.

3. Nachweis
Die Kursleitung führt eine Anwesenheitsliste. Reichen Sie die unterschriebene Bescheinigung zusammen mit der Rechnung innerhalb von drei Monaten nach Kursende ein. Später eingehende Unterlagen können nicht berücksichtigt werden.

4. Absage
Bis vierzehn Tage vor Kursbeginn können Sie kostenlos absagen. Danach wird eine Bearbeitungsgebühr von 15 Euro fällig. Bei einer Absage aus gesundheitlichen Gründen entfällt die Gebühr, wenn ein Attest vorliegt.

5. Ausfall von Terminen
Fällt ein Termin durch die Kursleitung aus, wird er nachgeholt. Ist das nicht möglich, verringert sich der Kurspreis anteilig; die Mindestteilnahme von 80 Prozent bezieht sich dann auf die tatsächlich stattgefundenen Termine.`,
              gloss: [
                { de: "der Vermerk", tr: "not, kayıt", en: "note, marking" },
                { de: "die Erstattung", tr: "geri ödeme", en: "reimbursement" },
                { de: "die Bescheinigung", tr: "belge", en: "certificate" },
                { de: "anteilig", tr: "oransal olarak", en: "proportionally" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-05-l5-27",
              no: 27,
              ref: "o1",
              text: "Sie haben einen Kurs für 150 Euro bezahlt und alle Termine besucht. Wie viel bekommen Sie zurück?",
              options: ["150 Euro.", "120 Euro.", "100 Euro."],
              answer: 2,
              explain:
                "Yüzde 80 hesabı 120 euro yapar, ama madde 2 bir üst sınır koyuyor: \"höchstens jedoch 100 Euro je Kurs\". Üst sınır yüzdeyi keser.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie reichen die Unterlagen vier Monate nach Kursende ein. Was passiert?",
              options: [
                "Es gibt keine Erstattung mehr.",
                "Die Erstattung wird um 15 Euro gekürzt.",
                "Die Frist verlängert sich auf sechs Monate.",
              ],
              answer: 0,
              explain:
                "Madde 3 süreyi üç ayla sınırlıyor ve \"Später eingehende Unterlagen können nicht berücksichtigt werden\" diyor. 15 euro ise iptal ücreti, gecikme cezası değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l5-29",
              no: 29,
              ref: "o1",
              text: "Sie sagen zehn Tage vor Beginn ab, weil Sie krank sind, und haben ein Attest. Was zahlen Sie?",
              options: ["Die vollen Kurskosten.", "15 Euro Bearbeitungsgebühr.", "Nichts."],
              answer: 2,
              explain:
                "On gün kala normalde 15 euro alınır, ama madde 4 istisna koyuyor: sağlık nedeniyle iptalde rapor varsa \"entfällt die Gebühr\".",
            },
            {
              kind: "mcq",
              id: "de-b1-05-l5-30",
              no: 30,
              ref: "o1",
              text: "Von zehn Terminen fallen zwei durch die Kursleitung aus und werden nicht nachgeholt. Woran misst sich Ihre Mindestteilnahme?",
              options: [
                "An den ursprünglich geplanten zehn Terminen.",
                "An den acht tatsächlich stattgefundenen Terminen.",
                "An der Hälfte aller geplanten Termine.",
              ],
              answer: 1,
              explain:
                "Madde 5 ölçüyü kaydırıyor: yüzde 80 koşulu \"auf die tatsächlich stattgefundenen Termine\" göre hesaplanıyor, yani sekiz üzerinden.",
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
          id: "de-b1-05-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Ansage in der Arztpraxis",
              genreTr: "Muayenehanede anons",
              situation: "Bekleme odasında bir düzenleme duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für alle Wartenden: Die Blutabnahme findet heute nicht im Zimmer drei statt, sondern im Labor am Ende des Ganges. Wer nüchtern gekommen ist, wird zuerst aufgerufen. Alle anderen bitten wir um etwa zwanzig Minuten Geduld.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Bir araştırmanın sonucu aktarılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Untersuchung aus Leipzig hat 1200 Berufstätige begleitet. Wer die Mittagspause außerhalb des Gebäudes verbringt, berichtet am Nachmittag über deutlich mehr Konzentration. Auf die Länge der Pause kam es dabei kaum an; entscheidend war, den Arbeitsplatz überhaupt zu verlassen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Kurs yönetimi bir değişiklik bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Halim, hier ist der Rückenkurs im Gesundheitszentrum. Der Termin am Dienstag fällt aus, unsere Kursleiterin ist krank. Wir hängen den Termin am Ende an, der Kurs endet also eine Woche später. Eine Erstattung ist deshalb nicht nötig.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Durchsage im Schwimmbad",
              genreTr: "Yüzme havuzunda anons",
              situation: "Bir kulvar düzenlemesi duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, das warme Becken ist heute ab sechzehn Uhr für die Wassergymnastik reserviert. Das große Becken bleibt frei. Wer bereits im warmen Becken ist, kann selbstverständlich bleiben, bis die Gruppe beginnt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Ansage in der Kantine",
              genreTr: "Yemekhanede anons",
              situation: "Menüde bir değişiklik duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, das angekündigte Fischgericht ist heute leider nicht verfügbar. Als Ersatz bieten wir einen Gemüseauflauf zum selben Preis an. Wer bereits bezahlt hat, bekommt an der Kasse die Differenz zurück.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-05-h1-1",
              no: 1,
              ref: "h1",
              text: "Wer nichts gegessen hat, kommt früher dran.",
              answer: true,
              explain:
                "Anons sırayı belirliyor: \"Wer nüchtern gekommen ist, wird zuerst aufgerufen\". Aç gelenler öne alınıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h1-2",
              no: 2,
              ref: "h1",
              text: "Wo findet die Blutabnahme heute statt?",
              options: [
                "Im Zimmer drei wie sonst auch.",
                "In einem Raum am Ende des Flurs.",
                "In einem anderen Gebäude der Praxis.",
              ],
              answer: 1,
              explain:
                "Yer değişikliği açık: üç numaralı oda yerine \"im Labor am Ende des Ganges\". Başka bir bina hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h1-3",
              no: 3,
              ref: "h2",
              text: "Für das Ergebnis war vor allem die Dauer der Pause wichtig.",
              answer: false,
              explain:
                "Haber tersini söylüyor: \"Auf die Länge der Pause kam es dabei kaum an\". Belirleyici olan iş yerinden çıkmak.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h1-4",
              no: 4,
              ref: "h2",
              text: "Was war laut Untersuchung entscheidend?",
              options: [
                "Ein Spaziergang von mindestens zwanzig Minuten.",
                "Ein warmes Mittagessen in der Kantine.",
                "Das Verlassen des Arbeitsplatzes.",
              ],
              answer: 2,
              explain:
                "Sonuç doğrudan veriliyor: \"entscheidend war, den Arbeitsplatz überhaupt zu verlassen\". Yürüyüş süresi ya da sıcak yemek geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h1-5",
              no: 5,
              ref: "h3",
              text: "Frau Halim bekommt Geld zurück.",
              answer: false,
              explain:
                "Ders iptal değil, sona ekleniyor; bu yüzden \"Eine Erstattung ist deshalb nicht nötig\" deniyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h1-6",
              no: 6,
              ref: "h3",
              text: "Was ändert sich für den Kurs?",
              options: [
                "Er endet eine Woche später.",
                "Er beginnt eine Woche früher.",
                "Er wird an einen anderen Ort verlegt.",
              ],
              answer: 0,
              explain:
                "Kaçan ders sona ekleniyor, dolayısıyla \"der Kurs endet also eine Woche später\". Yer ve başlangıç değişmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h1-7",
              no: 7,
              ref: "h4",
              text: "Wer schon im warmen Becken ist, muss sofort heraus.",
              answer: false,
              explain:
                "Anons istisna tanıyor: içeride olanlar \"kann selbstverständlich bleiben, bis die Gruppe beginnt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h1-8",
              no: 8,
              ref: "h4",
              text: "Was gilt für das große Becken?",
              options: [
                "Es ist ab sechzehn Uhr reserviert.",
                "Es bleibt für alle offen.",
                "Es wird heute gar nicht genutzt.",
              ],
              answer: 1,
              explain:
                "Rezervasyon yalnız sıcak havuz için; büyük havuz için \"bleibt frei\" deniyor, yani herkese açık.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h1-9",
              no: 9,
              ref: "h5",
              text: "Das Ersatzgericht kostet genauso viel wie das geplante.",
              answer: true,
              explain:
                "Anons \"einen Gemüseauflauf zum selben Preis\" diyor. Fiyat farkı yalnız önceden ödeyenler için söz konusu.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h1-10",
              no: 10,
              ref: "h5",
              text: "Was bekommen Gäste, die schon bezahlt haben?",
              options: [
                "Einen Gutschein für den nächsten Tag.",
                "Das ganze Geld an der Kasse zurück.",
                "Die Differenz an der Kasse.",
              ],
              answer: 2,
              explain:
                "Anons yalnız farkın iadesini duyuruyor: \"bekommt an der Kasse die Differenz zurück\". Tam iade ya da fiş geçmiyor.",
            },
          ],
        },
        {
          id: "de-b1-05-h2",
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
              situation: "Bir danışan beslenme danışmanlığına geliyor.",
              plays: 2,
              segments: [
                { speaker: "Beraterin", text: "Sie sind mit einer Überweisung hier. Was möchten Sie erreichen?" },
                {
                  speaker: "Herr Vogler",
                  text: "Ehrlich gesagt weiß ich das nicht genau. Mein Arzt sagt, ich soll abnehmen. Ich fühle mich aber vor allem müde.",
                },
                { speaker: "Beraterin", text: "Dann fangen wir mit der Müdigkeit an. Wann ist sie am stärksten?" },
                { speaker: "Herr Vogler", text: "Nachmittags, so gegen halb drei. Da bin ich zu nichts zu gebrauchen." },
                { speaker: "Beraterin", text: "Und was essen Sie mittags?" },
                {
                  speaker: "Herr Vogler",
                  text: "Meistens nichts. Ich frühstücke groß, dann arbeite ich durch und esse abends um acht richtig.",
                },
                {
                  speaker: "Beraterin",
                  text: "Das erklärt vieles. Ich schlage nichts Kompliziertes vor: eine Kleinigkeit gegen zwölf, auch wenn Sie keinen Hunger haben.",
                },
                { speaker: "Herr Vogler", text: "Und das Abnehmen?" },
                {
                  speaker: "Beraterin",
                  text: "Das kommt später. Wenn wir jetzt gleichzeitig weniger essen und den Rhythmus ändern, halten Sie es nicht durch.",
                },
                { speaker: "Herr Vogler", text: "Muss ich etwas aufschreiben?" },
                {
                  speaker: "Beraterin",
                  text: "Zwei Wochen lang, ja. Aber nur die Uhrzeiten, nicht die Mengen. Die Mengen schauen wir uns beim nächsten Mal an.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-05-h2-11",
              no: 11,
              ref: "b1",
              text: "Was ist Herrn Voglers eigenes Anliegen?",
              options: [
                "Er möchte etwas gegen seine Müdigkeit tun.",
                "Er möchte vor allem Gewicht verlieren.",
                "Er möchte seine Blutwerte kontrollieren lassen.",
              ],
              answer: 0,
              explain:
                "Kilo vermek hekimin isteği; kendisi \"Ich fühle mich aber vor allem müde\" diyor. Danışman da bu yüzden yorgunlukla başlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h2-12",
              no: 12,
              ref: "b1",
              text: "Wann ist die Müdigkeit am stärksten?",
              options: ["Direkt nach dem Frühstück.", "Am frühen Nachmittag.", "Kurz vor dem Abendessen."],
              answer: 1,
              explain:
                "Kendi verdiği saat \"gegen halb drei\", yani öğleden sonranın başı. Akşam yemeği saat sekizde ve ayrı bir bilgi.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h2-13",
              no: 13,
              ref: "b1",
              text: "Was schlägt die Beraterin als Erstes vor?",
              options: [
                "Kleinere Portionen am Abend.",
                "Einen genauen Ernährungsplan.",
                "Eine Kleinigkeit um die Mittagszeit.",
              ],
              answer: 2,
              explain:
                "Önerisi bilinçli olarak küçük: öğlene doğru bir şeyler yemek, \"auch wenn Sie keinen Hunger haben\". Ayrıntılı plan bu görüşmede yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h2-14",
              no: 14,
              ref: "b1",
              text: "Warum kommt das Abnehmen erst später?",
              options: [
                "Weil zwei Änderungen gleichzeitig nicht durchzuhalten sind.",
                "Weil der Arzt es noch nicht freigegeben hat.",
                "Weil zuerst weitere Werte gemessen werden müssen.",
              ],
              answer: 0,
              explain:
                "Danışman gerekçeyi veriyor: aynı anda hem az yemek hem ritmi değiştirmek \"halten Sie es nicht durch\".",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h2-15",
              no: 15,
              ref: "b1",
              text: "Was soll Herr Vogler aufschreiben?",
              options: ["Die Mengen von allem, was er isst.", "Nur die Uhrzeiten.", "Sein Gewicht jeden Morgen."],
              answer: 1,
              explain:
                "İki hafta boyunca yalnız saatler: \"nur die Uhrzeiten, nicht die Mengen\". Miktarlar bir sonraki görüşmeye bırakılıyor.",
            },
          ],
        },
        {
          id: "de-b1-05-h3",
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
              situation: "Bir uzman gündelik harekete dair bir sunum yapıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Tas",
                  text: "Guten Abend. Ich spreche heute über Bewegung im Alltag, und ich beginne mit einer Enttäuschung: Die berühmten zehntausend Schritte sind keine medizinische Zahl. Sie stammen aus einer Werbekampagne der Sechzigerjahre.",
                },
                {
                  speaker: "Frau Tas",
                  text: "Das heißt nicht, dass Schritte egal sind. Die Untersuchungen zeigen den größten Gewinn zwischen zweitausend und siebentausend Schritten. Wer von zweitausend auf viertausend geht, gewinnt mehr als jemand, der von achttausend auf zehntausend geht.",
                },
                {
                  speaker: "Frau Tas",
                  text: "Zweiter Punkt: die Verteilung. Dreimal zehn Minuten wirken fast genauso gut wie einmal dreißig. Das ist praktisch wichtig, weil dreißig Minuten am Stück für viele Menschen nicht in den Tag passen.",
                },
                {
                  speaker: "Frau Tas",
                  text: "Drittens, und das überrascht viele: Wer im Beruf viel steht, ist nicht automatisch besser dran. Stehen allein zählt nicht als Bewegung; entscheidend ist der Wechsel zwischen Positionen.",
                },
                {
                  speaker: "Frau Tas",
                  text: "Zum Rücken eine Einschränkung. Bewegung hilft bei den meisten Rückenschmerzen, aber nicht bei allen. Wer Schmerzen hat, die ins Bein ziehen, sollte zuerst zum Arzt und nicht ins Fitnessstudio.",
                },
                {
                  speaker: "Frau Tas",
                  text: "Was am besten wirkt, ist übrigens nicht die Sportart, sondern die Verabredung. In unseren Kursen kommen Menschen, die sich mit jemandem treffen, doppelt so lange wie Menschen, die allein trainieren.",
                },
                {
                  speaker: "Frau Tas",
                  text: "Ich schließe mit einem Hinweis: Alles, was ich gesagt habe, gilt für gesunde Erwachsene. Für Menschen mit Herzerkrankungen gelten andere Empfehlungen, und die bespricht man nicht in einem Vortrag.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-05-h3-16",
              no: 16,
              ref: "v1",
              text: "Die Zahl von zehntausend Schritten stammt aus der Medizin.",
              answer: false,
              explain:
                "Sunum bunu baştan çürütüyor: sayı \"aus einer Werbekampagne der Sechzigerjahre\" geliyor, tıptan değil.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h3-17",
              no: 17,
              ref: "v1",
              text: "Der größte Gewinn liegt im unteren Bereich der Schrittzahl.",
              answer: true,
              explain:
                "\"zwischen zweitausend und siebentausend Schritten\" en büyük kazancı veriyor; ikiden dört bine çıkmak, sekizden ona çıkmaktan fazlasını sağlıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h3-18",
              no: 18,
              ref: "v1",
              text: "Eine halbe Stunde am Stück ist deutlich besser als drei kurze Einheiten.",
              answer: false,
              explain:
                "Sunum ikisini eşitliyor: \"Dreimal zehn Minuten wirken fast genauso gut wie einmal dreißig\", üstelik günlük hayata daha kolay sığıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h3-19",
              no: 19,
              ref: "v1",
              text: "Wer im Beruf viel steht, bewegt sich damit ausreichend.",
              answer: false,
              explain:
                "\"Stehen allein zählt nicht als Bewegung\" deniyor; belirleyici olan pozisyonlar arasındaki değişim.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h3-20",
              no: 20,
              ref: "v1",
              text: "Bei Schmerzen, die ins Bein ziehen, rät sie zuerst zum Arzt.",
              answer: true,
              explain:
                "Bu tek istisna açıkça veriliyor: bacağa vuran ağrılarda \"zuerst zum Arzt und nicht ins Fitnessstudio\".",
            },
            {
              kind: "bool",
              id: "de-b1-05-h3-21",
              no: 21,
              ref: "v1",
              text: "Entscheidend für das Durchhalten ist die Wahl der Sportart.",
              answer: false,
              explain:
                "Sunum tersini söylüyor: belirleyici olan spor türü değil \"die Verabredung\"; biriyle buluşanlar iki kat daha uzun sürdürüyor.",
            },
            {
              kind: "bool",
              id: "de-b1-05-h3-22",
              no: 22,
              ref: "v1",
              text: "Ihre Empfehlungen gelten nicht für alle Gruppen.",
              answer: true,
              explain:
                "Kapanışta sınırı çiziyor: söyledikleri \"für gesunde Erwachsene\" geçerli; kalp hastalıkları olanlar için başka öneriler geçerli.",
            },
          ],
        },
        {
          id: "de-b1-05-h4",
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
              situation: "İki konuk şekerli içeceklere vergi konmasını tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Eine Steuer auf gezuckerte Getränke — Herr Ruf, Sie forschen zu Ernährung.",
                },
                {
                  speaker: "Herr Ruf",
                  text: "Ich fange mit dem an, was gegen mich spricht: Eine Steuer ist ungerecht, weil sie Menschen mit wenig Geld stärker trifft. Das lässt sich nicht wegdiskutieren. Nur trifft die Krankheit dieselben Menschen noch stärker.",
                },
                { speaker: "Moderatorin", text: "Frau Kohl, Sie vertreten die Getränkehersteller." },
                {
                  speaker: "Frau Kohl",
                  text: "In einem Punkt stimme ich Herrn Ruf zu: Der Zuckergehalt muss runter. Wir haben ihn seit 2018 freiwillig um achtzehn Prozent gesenkt. Eine Steuer hätte das nicht schneller gemacht, sie hätte nur Arbeitsplätze gekostet.",
                },
                {
                  speaker: "Herr Ruf",
                  text: "Achtzehn Prozent stimmen, aber sie verteilen sich sehr ungleich. Bei den Getränken, die Jugendliche trinken, ist fast nichts passiert. Freiwilligkeit wirkt dort, wo es ohnehin leicht ist.",
                },
                {
                  speaker: "Frau Kohl",
                  text: "Das ist ein fairer Einwand. Nur sehe ich in Großbritannien, dass die Leute nach der Steuer auf andere süße Produkte ausgewichen sind.",
                },
                {
                  speaker: "Herr Ruf",
                  text: "Teilweise ja. Der Gesamtzucker ist trotzdem gesunken, um etwa fünf Prozent. Das ist wenig für eine Schlagzeile und viel für eine Bevölkerung.",
                },
                { speaker: "Moderatorin", text: "Was wäre Ihr Kompromiss?" },
                {
                  speaker: "Frau Kohl",
                  text: "Eine Steuer, die nur über einem bestimmten Zuckergehalt greift. Dann kann jeder Hersteller ihr ausweichen, indem er das Rezept ändert. Das wäre kein Strafgeld, sondern ein Anreiz.",
                },
                {
                  speaker: "Herr Ruf",
                  text: "Genau das ist auch mein Vorschlag, und ich sage das nicht oft: Frau Kohl beschreibt das britische Modell ziemlich genau.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Bleibt die Frage der Gerechtigkeit.",
                },
                {
                  speaker: "Herr Ruf",
                  text: "Die bleibt. Deshalb gehört zu jeder solchen Steuer, dass die Einnahmen zurückfließen — in Schulessen zum Beispiel. Ohne das ist sie schwer zu verteidigen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-05-h4-23",
              no: 23,
              ref: "d1",
              text: "Womit beginnt Herr Ruf?",
              options: [
                "Mit einer Zahl aus seiner eigenen Forschung.",
                "Mit einem Einwand gegen die eigene Position.",
                "Mit einer Kritik an den Herstellern.",
              ],
              answer: 1,
              explain:
                "\"Ich fange mit dem an, was gegen mich spricht\" diyor ve verginin az gelirliyi daha çok vurduğunu kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-24",
              no: 24,
              ref: "d1",
              text: "Wie entkräftet er diesen Einwand?",
              options: [
                "Die Krankheit treffe sie noch härter.",
                "Die Steuer sei ohnehin sehr niedrig.",
                "Arme Haushalte kauften kaum solche Getränke.",
              ],
              answer: 0,
              explain:
                "İtirazı geçersiz kılmıyor, karşısına daha ağır bir yük koyuyor: \"Nur trifft die Krankheit dieselben Menschen noch stärker\".",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-25",
              no: 25,
              ref: "d1",
              text: "Worin stimmt Frau Kohl ihm zu?",
              options: [
                "Dass eine Steuer schneller wirkt.",
                "Dass Arbeitsplätze zweitrangig sind.",
                "Dass der Zuckergehalt sinken muss.",
              ],
              answer: 2,
              explain:
                "\"In einem Punkt stimme ich Herrn Ruf zu: Der Zuckergehalt muss runter\" diyor. Vergiye ise karşı çıkıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-26",
              no: 26,
              ref: "d1",
              text: "Was kritisiert Herr Ruf an der freiwilligen Senkung?",
              options: [
                "Die Zahl von achtzehn Prozent sei falsch.",
                "Bei Jugendgetränken sei nichts passiert.",
                "Sie sei zu spät begonnen worden.",
              ],
              answer: 1,
              explain:
                "Rakamı doğruluyor ama dağılımı eleştiriyor: gençlerin içtiği içeceklerde \"fast nichts passiert\". Gönüllülük kolay olan yerde işliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-27",
              no: 27,
              ref: "d1",
              text: "Welchen Einwand bringt Frau Kohl aus Großbritannien?",
              options: [
                "Die Steuer sei dort wieder abgeschafft worden.",
                "Die Preise seien dort insgesamt gestiegen.",
                "Der Konsum sei nur verlagert worden.",
              ],
              answer: 2,
              explain:
                "İtirazı ikame etkisi üzerine: vergiden sonra insanlar \"auf andere süße Produkte ausgewichen\". Verginin kaldırıldığı söylenmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-28",
              no: 28,
              ref: "d1",
              text: "Wie antwortet Herr Ruf darauf?",
              options: [
                "Er bestreitet die Ausweichbewegung.",
                "Er räumt sie ein, verweist aber auf den Gesamtzucker.",
                "Er hält den britischen Fall für nicht vergleichbar mit Deutschland.",
              ],
              answer: 1,
              explain:
                "\"Teilweise ja\" diyor ve toplam şeker tüketiminin yine de yaklaşık yüzde beş düştüğünü ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-29",
              no: 29,
              ref: "d1",
              text: "Worauf einigen sich beide?",
              options: [
                "Auf eine Steuer ab einem bestimmten Zuckergehalt.",
                "Auf eine Steuer auf alle süßen Produkte im Handel.",
                "Auf ein Werbeverbot statt einer Steuer.",
              ],
              answer: 0,
              explain:
                "Frau Kohl eşik üstü bir vergi öneriyor, Herr Ruf da \"Genau das ist auch mein Vorschlag\" diyor. İkisi de bunu ceza değil teşvik sayıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-05-h4-30",
              no: 30,
              ref: "d1",
              text: "Welche Bedingung nennt Herr Ruf zum Schluss?",
              options: [
                "Die Steuer müsse zeitlich begrenzt sein.",
                "Die Einnahmen müssten zurückfließen.",
                "Die Hersteller müssten zustimmen.",
              ],
              answer: 1,
              explain:
                "Adalet sorunu için tek koşul koyuyor: \"dass die Einnahmen zurückfließen — in Schulessen zum Beispiel\". Aksi hâlde vergiyi savunmayı zor buluyor.",
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
          id: "de-b1-05-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Rike hat Sie eingeladen, dreimal pro Woche mit ihr zu laufen. Sie schaffen nur einmal pro Woche. Schreiben Sie ihr (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Rike seni haftada üç kez birlikte koşmaya çağırdı. Sen ancak haftada bir kez yapabiliyorsun. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Bedanken Sie sich für die Einladung.", tr: "Davet için teşekkür et." },
              { de: "Erklären Sie, warum dreimal nicht geht.", tr: "Neden üç kez olmadığını açıkla." },
              { de: "Machen Sie einen realistischen Gegenvorschlag.", tr: "Gerçekçi bir karşı öneri sun." },
              { de: "Fragen Sie nach Ort und Uhrzeit.", tr: "Yeri ve saati sor." },
            ],
            sample: `Liebe Rike,

danke, dass du mich gefragt hast! Ich wollte schon lange wieder anfangen und allein schaffe ich es nie.

Dreimal pro Woche geht bei mir leider nicht. Ich hole dienstags und donnerstags meine Tochter aus der Kita, und danach bin ich zu nichts mehr zu gebrauchen.

Mein Vorschlag: Ich komme am Sonntag fest mit, und wenn ich es unter der Woche schaffe, schreibe ich dir kurz. Lieber einmal sicher als dreimal versprochen.

Wo treffen wir uns denn, und um welche Uhrzeit?

Liebe Grüße
Nadja`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Ret kibar ve gerekçeli mi, yoksa yalnız reddediliyor mu?",
              "Karşı öneri gerçekçi ve somut mu?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı ve ton uygun mu?",
              "Yaklaşık 80 kelime var mı ve metin paragraflara ayrılmış mı?",
            ],
          },
        },
        {
          id: "de-b1-05-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Online-Forum wird diskutiert: \"Soll Werbung für süße Lebensmittel im Kinderfernsehen verboten werden?\" Schreiben Sie einen Beitrag (circa 80 Wörter). Nennen Sie Ihre Meinung, ein Argument dafür und ein Argument dagegen.",
          promptTr:
            "Bir çevrimiçi forumda tartışılıyor: \"Çocuk televizyonunda tatlı ürün reklamları yasaklanmalı mı?\" Bir yorum yaz (yaklaşık 80 kelime). Görüşünü, bir destekleyici ve bir karşı argüman söyle.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie Ihre Meinung klar.", tr: "Görüşünü açıkça söyle." },
              { de: "Geben Sie ein Argument dafür.", tr: "Lehte bir gerekçe ver." },
              { de: "Geben Sie ein Argument dagegen.", tr: "Aleyhte bir gerekçe ver." },
              { de: "Ziehen Sie ein Fazit.", tr: "Bir sonuca bağla." },
            ],
            sample: `Ich bin dafür, aber ich glaube nicht, dass es allein reicht.

Für ein Verbot spricht, dass kleine Kinder Werbung nicht als Werbung erkennen. Mein Sohn ist vier und wollte nach einem Spot genau die Milchschnitte, die er dort gesehen hat. Das ist keine freie Entscheidung.

Dagegen spricht, dass Kinder heute kaum noch klassisches Fernsehen schauen. Ein Verbot würde also einen Kanal treffen, der ohnehin an Bedeutung verliert.

Mein Fazit: Das Verbot ist richtig, muss aber für Videoplattformen genauso gelten. Sonst verschiebt sich nur der Ort.`,
            criteria: [
              "Görüş ilk cümlelerde net söylenmiş mi?",
              "Lehte ve aleyhte birer gerekçe gerçekten ayrı ayrı verilmiş mi?",
              "Gerekçeler somut mu (örnek, sayı, kendi deneyimi)?",
              "Sonuç iki gerekçeyle tutarlı mı?",
              "Forum yazısına uygun bir ton ve yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-05-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben einen Rückenkurs gebucht, können aber aus gesundheitlichen Gründen nicht teilnehmen. Ein Attest haben Sie. Schreiben Sie an das Gesundheitszentrum (circa 40 Wörter).",
          promptTr:
            "Bir sırt kursuna kaydoldun ama sağlık nedeniyle katılamıyorsun. Raporun var. Sağlık merkezine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie Kurs und Termin.", tr: "Kursu ve tarihi belirt." },
              { de: "Sagen Sie ab und nennen Sie den Grund.", tr: "İptal ettiğini ve nedenini söyle." },
              { de: "Verweisen Sie auf das Attest und fragen Sie nach der Gebühr.", tr: "Rapora atıf yap ve ücreti sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich bin für den Rückenkurs am Dienstag um 19 Uhr angemeldet, Beginn am 8. April.

Leider muss ich absagen: Mein Arzt hat mir nach einer Operation für sechs Wochen von Sport abgeraten. Das Attest lege ich bei.

Entfällt die Bearbeitungsgebühr in diesem Fall?

Mit freundlichen Grüßen
Erol Kaya`,
            criteria: [
              "Kurs somut tanımlanmış mı? (gün, saat, başlangıç tarihi)",
              "İptal ve gerekçe açıkça yazılmış mı?",
              "Rapora atıf var mı? (Das Attest lege ich bei / anbei)",
              "Ücret sorusu açıkça sorulmuş mu?",
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
          id: "de-b1-05-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam einen Gesundheitstag für Ihren Kurs. Sprechen Sie über: Termin — Programm — Essen — Kosten — Werbung.",
          promptTr:
            "Kursunuz için birlikte bir sağlık günü planlayın. Şunları konuşun: tarih — program — yemek — bütçe — duyuru.",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Gesundheitstag. Fangen wir mit dem Termin an: Wann soll er stattfinden?",
              tr: "Sağlık gününü birlikte planlıyoruz. Tarihle başlayalım: Ne zaman olsun?",
            },
            { who: "you", hint: "Bir tarih öner ve neden uygun olduğunu söyle.", expect: "somut bir tarih önermek ve gerekçelendirmek", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Und das Programm? Ein Vortrag ist einfach zu organisieren, aber viele finden Vorträge langweilig.",
              tr: "Anlaştım. Peki program? Bir sunum düzenlemesi kolay ama çoğu kişi sunumları sıkıcı buluyor.",
            },
            {
              who: "you",
              hint: "Bu itiraza karşılık ver ve bir program öner.",
              expect: "bir itiraza karşılık vermek ve alternatif bir program önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Gut. Beim Essen habe ich zwei Ideen: Jeder bringt etwas mit oder wir bestellen zusammen. Was meinen Sie?",
              tr: "Peki. Yemek için iki fikrim var: Herkes bir şey getirsin ya da birlikte sipariş verelim. Sen ne dersin?",
            },
            {
              who: "you",
              hint: "İki seçenekten birini seç ve tercihini gerekçelendir.",
              expect: "iki seçenek arasında karşılaştırmalı bir tercih yapmak",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Bleibt die Werbung. Wie erfahren die anderen Kurse davon?",
              tr: "Geriye duyuru kaldı. Öteki kurslar bunu nasıl duyacak?",
            },
            {
              who: "you",
              hint: "En az iki duyuru yolu öner ve işleri paylaş.",
              expect: "birden çok duyuru yolu önermek ve görev paylaşımı yapmak",
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
              "Ich schlage den letzten Freitag im Monat vor, weil dann der Kurs früher endet. Statt eines Vortrags könnten wir Stationen machen: eine zum Blutdruckmessen, eine mit einfachen Rückenübungen, eine mit Essen. Dann muss niemand vierzig Minuten stillsitzen. Beim Essen wäre ich dafür, dass jeder etwas mitbringt, weil das billiger ist und weil dann auch Gerichte aus verschiedenen Ländern dabei sind. Für die Werbung machen wir beides: einen Zettel an jeder Tür und eine Nachricht in den Kursgruppen. Ich übernehme die Zettel, wenn du die Nachrichten schreibst.",
            criteria: [
              "Beş noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi? (weil, damit, deshalb)",
              "Karşı tarafın itirazına gerçekten karşılık verildi mi?",
              "En az bir karşılaştırma yapıldı mı? (billiger als, lieber … als)",
              "Konuşma bir karara bağlandı mı?",
            ],
          },
        },
        {
          id: "de-b1-05-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag zum Thema \"Essen früher und heute\". Gliedern Sie: Einleitung — Situation in Ihrem Heimatland — eigene Erfahrung — Vorteile und Nachteile — Ihre Meinung.",
          promptTr:
            "\"Eskiden ve bugün yemek\" konusunda kısa bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — kendi deneyimin — artılar ve eksiler — kendi görüşün.",
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
              "Ich möchte heute über Essen sprechen: zuerst wie es bei uns früher war, dann meine eigene Erfahrung, danach Vor- und Nachteile und am Ende meine Meinung. In Marokko hat meine Großmutter jeden Tag frisch gekocht, oft zwei Stunden lang. Eingekauft wurde auf dem Markt, und im Winter gab es einfach kein Obst aus warmen Ländern. Ich selbst koche heute in zwanzig Minuten und kaufe fast alles im Supermarkt. Ein Vorteil ist die Zeit: Ich arbeite acht Stunden und könnte gar nicht zwei Stunden kochen. Ein Nachteil ist, dass ich viel öfter dasselbe esse. Meiner Meinung nach haben wir mehr Auswahl im Laden und weniger Vielfalt auf dem Teller.",
            criteria: [
              "Beş bölümün hepsi var mı ve sırayla mı?",
              "Giriş sunumun yapısını duyuruyor mu?",
              "Kendi deneyimi somut mu (süre, yer, ne yapıldığı)?",
              "En az bir artı ve bir eksi karşılaştırmalı biçimde verildi mi?",
              "Görüş gerekçeli mi ve önceki bölümlerle tutarlı mı?",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-05-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf ein Problem. Eine Kollegin bringt jeden Freitag Kuchen mit und ist gekränkt, wenn jemand nichts nimmt. Sie möchten weniger Süßes essen.",
          promptTr:
            "Bir soruna tepki ver. Bir iş arkadaşın her cuma pasta getiriyor ve almayan olunca alınıyor. Sen ise daha az tatlı yemek istiyorsun.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Du hast letzte Woche gar nichts genommen. Schmeckt dir mein Kuchen nicht mehr?",
              tr: "Geçen hafta hiç almadın. Pastam artık hoşuna gitmiyor mu?",
            },
            {
              who: "you",
              hint: "Yanlış anlamayı gider ve kendi durumunu açıkla.",
              expect: "bir yanlış anlamayı düzeltmek ve kendi durumunu açıklamak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Ach, ein Stück macht doch nichts. Ich backe extra für euch, das ist mir wichtig.",
              tr: "Bir dilim bir şey yapmaz. Sizin için özel yapıyorum, benim için önemli.",
            },
            {
              who: "you",
              hint: "Onun emeğini kabul et ama kararının arkasında dur.",
              expect: "karşı tarafın emeğini kabul etmek ve kendi kararını korumak",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Und wenn ich beim nächsten Mal etwas ohne Zucker mitbringe? Wäre dir das lieber?",
              tr: "Peki bir dahaki sefere şekersiz bir şey getirsem? Böylesi daha iyi olur mu?",
            },
            {
              who: "you",
              hint: "Teklife karşılık ver ve birlikte bir düzen öner.",
              expect: "bir öneriye karşılık vermek ve sürdürülebilir bir düzen önermek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "ein Missverständnis klären", tr: "Yanlış anlamayı gidermek" },
              { de: "die eigene Entscheidung erklären", tr: "Kendi kararını açıklamak" },
              { de: "eine gemeinsame Lösung finden", tr: "Ortak bir çözüm bulmak" },
            ],
            sample:
              "Nein, dein Kuchen ist wirklich gut — daran liegt es überhaupt nicht. Mein Arzt hat gesagt, ich soll weniger Zucker essen, und freitags fällt es mir am schwersten. Ich weiß, dass du extra backst, und das finde ich schön. Deshalb möchte ich nicht, dass du aufhörst. Ich nehme in Zukunft ein halbes Stück und trinke einen Kaffee mit. Und wenn du wirklich Lust hast, etwas ohne Zucker zu probieren, komme ich am Freitag gern früher und helfe dir.",
            criteria: [
              "Yanlış anlama açıkça giderildi mi?",
              "Kendi kararı gerekçelendirildi mi, yoksa yalnız reddedildi mi?",
              "Karşı tarafın emeği ve duygusu kabul edildi mi?",
              "Çözüm sürdürülebilir ve somut mu?",
            ],
          },
        },
      ],
    },
  ],
};
