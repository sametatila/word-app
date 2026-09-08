import type { MockPaper } from "../types";

/**
 * B2 · Deneme 12 — "Erfolg und Zufall".
 *
 * PLAN kâğıt 1–11 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme · 6 köşe yazısı
 *                              · 6 görüş eşleştirme · 3 yönetmelik)
 *   Hören  40 dk · 30 madde   (10 karma · 6 söyleşi · 6 tartışma · 8 ana fikir)
 *   Schreiben 75 dk           okur mektubu (~150) + yarı resmî ileti (~100)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: başarıda tesadüfün payı. B2'nin ölçtüğü akıl yürütme burada
 * çok net çıkıyor: bir açıklamanın sonradan kurulmuş olması onu yanlış
 * yapmıyor, ama tek açıklama olduğunu da göstermiyor. Metinler tesadüfü
 * yüceltmiyor; onu hesaba katmayan anlatının nasıl kurulduğunu gösteriyor.
 *
 * DİKKAT EDİLEN: dört kişi de kendi başarısını küçümsemiyor, yalnız
 * içindeki tesadüfü adlandırıyor — bu ayrım maddelerde bilerek sınanıyor.
 *
 * KONTROL: h1'in doğru/yanlış maddeleri 2 doğru / 3 yanlış olarak
 * planlandı; b2-11'de aynı görevin beş maddesi de yanlış çıkmıştı.
 */
export const B2_12: MockPaper = {
  id: "de-b2-12",
  course: "de",
  level: "B2",
  no: 12,
  theme: "Erfolg und Zufall",
  themeTr: "Başarı ve tesadüf",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Texte, einen Sachtext mit Lücken, einen Kommentar, Meinungsbeiträge und eine Ordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel metinler, boşluklu bir bilgi metni, bir köşe yazısı, görüş yazıları ve bir yönetmelik okuyacaksın.",
      tasks: [
        {
          id: "de-b2-12-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über den Anteil des Zufalls an ihrem Weg. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi kendi yolunda tesadüfün payı üzerine yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Wollschläger, Personalleiterin",
              body: `Ich lese seit siebzehn Jahren Bewerbungen und weiß deshalb, wie wenig ich weiß.

Von hundert Unterlagen sind achtzig fachlich passend. Wen ich einlade, entscheidet sich an Kleinigkeiten: an einem Wort im Anschreiben, an der Stelle im Stapel, manchmal an der Uhrzeit.

Das gebe ich ungern zu, weil es meinen Beruf beschädigt. Es ist trotzdem so, und ich halte es für ehrlicher, es zu sagen, als eine Methode zu behaupten, die ich nicht habe.

Was ich geändert habe: Ich lese den Stapel jetzt zweimal, in umgekehrter Reihenfolge. Das kostet mich zwei Stunden im Monat und hat mir drei Einstellungen gebracht, die ich sonst übersehen hätte.`,
              gloss: [
                { de: "die Unterlagen", tr: "belgeler, dosya", en: "documents" },
                { de: "das Anschreiben", tr: "ön yazı", en: "cover letter" },
                { de: "beschädigen", tr: "zedelemek", en: "to damage" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Bittner, Handwerksmeister",
              body: `Wenn mich Leute nach meinem Weg fragen, erzähle ich eine schöne Geschichte. Die stimmt sogar, nur ist sie nicht vollständig.

Ich habe meinen Betrieb übernommen, weil mein Chef keinen Nachfolger fand und ich zufällig der Einzige war, der geblieben ist. Zwei Kollegen waren besser als ich. Sie waren im entscheidenden Jahr woanders.

Das schmälert meine Arbeit nicht. Ich habe den Betrieb siebzehn Jahre lang gehalten, und das war nicht Glück.

Aber ich bin dagegen, den Anfang wegzulassen. Wer nur das Ende erzählt, verkauft eine Landkarte, auf der die Umwege fehlen.`,
              gloss: [
                { de: "der Nachfolger", tr: "halef", en: "successor" },
                { de: "schmälern", tr: "küçültmek, azaltmak", en: "to diminish" },
                { de: "der Umweg", tr: "dolambaçlı yol", en: "detour" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Mahnke, Wissenschaftlerin",
              body: `In meinem Fach gilt Zufall als Ausrede. Wer ihn nennt, klingt, als wolle er sich vor dem Vergleich drücken.

Ich habe drei Jahre an einem Thema gearbeitet, das damals niemanden interessiert hat, und bin heute gefragt, weil sich die Förderlinie geändert hat. Meine Arbeit ist dieselbe geblieben.

Ich sage das meinen Doktorandinnen, und es hilft ihnen nicht immer. Manche hören daraus, dass Anstrengung egal sei. Das ist der Kurzschluss, den ich fürchte.

Gemeint ist etwas anderes: Anstrengung ist notwendig und erklärt nicht das Ergebnis. Beides gleichzeitig auszuhalten, ist die eigentliche Leistung.`,
              gloss: [
                { de: "die Förderlinie", tr: "destek programı", en: "funding stream" },
                { de: "der Kurzschluss", tr: "aceleci çıkarım", en: "false shortcut" },
                { de: "aushalten", tr: "katlanmak, taşımak", en: "to endure" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Duschek, Musiker",
              body: `Ich habe zwanzig Jahre in Kellern gespielt und dann ein Jahr lang überall.

Der Unterschied war kein besseres Album. Es war ein Regisseur, der ein altes Stück von mir in einer Serie verwendet hat. Ich kannte ihn nicht und kenne ihn bis heute nicht.

Was mich stört, ist nicht der Zufall. Es ist, dass mir seither Leute erklären, warum es so kommen musste. Dieselben Leute haben mich vorher nicht gebucht.

Ich bin nicht bitter. Ich bin nur vorsichtig geworden mit Erklärungen, die erst nachher entstehen.`,
              gloss: [
                { de: "der Regisseur", tr: "yönetmen", en: "director" },
                { de: "buchen", tr: "(sanatçıyı) tutmak", en: "to book" },
                { de: "bitter", tr: "kırgın", en: "bitter" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-12-l1-1",
              no: 1,
              text: "Wer nennt eine schöne Geschichte, die unvollständig ist?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 1,
              explain:
                "\"Die stimmt sogar, nur ist sie nicht vollständig\" — anlatının eksik yeri devralmanın başlangıcı.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-2",
              no: 2,
              text: "Wer ist misstrauisch gegenüber nachträglichen Erklärungen?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 3,
              explain:
                "\"Ich bin nur vorsichtig geworden mit Erklärungen, die erst nachher entstehen\" — aynı kişiler onu önceden tutmamış.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-3",
              no: 3,
              text: "Wer gibt etwas zu, das dem eigenen Berufsstand schadet?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 0,
              explain:
                "\"Das gebe ich ungern zu, weil es meinen Beruf beschädigt\" — davetin ayrıntılara bağlı olması.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-4",
              no: 4,
              text: "Wer fürchtet, falsch verstanden zu werden?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 2,
              explain:
                "Bazı doktora öğrencileri çabanın önemsiz olduğunu anlıyor: \"Das ist der Kurzschluss, den ich fürchte.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-5",
              no: 5,
              text: "Wer beschreibt eine Wende, die von einer fremden Person ausging?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 3,
              explain:
                "Eski bir parçasını dizide kullanan yönetmeni tanımıyor: \"Ich kannte ihn nicht und kenne ihn bis heute nicht.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-6",
              no: 6,
              text: "Wer hat das eigene Verfahren geändert und den Aufwand beziffert?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 0,
              explain:
                "Yığını ters sırada ikinci kez okuyor: \"Das kostet mich zwei Stunden im Monat und hat mir drei Einstellungen gebracht.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-7",
              no: 7,
              text: "Wer sagt, dass sich die Bewertung geändert hat, die Arbeit aber nicht?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 2,
              explain:
                "Destek programı değişince aranan biri olmuş: \"Meine Arbeit ist dieselbe geblieben.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-8",
              no: 8,
              text: "Wer sagt, dass andere fachlich besser waren?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 1,
              explain:
                "\"Zwei Kollegen waren besser als ich. Sie waren im entscheidenden Jahr woanders.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l1-9",
              no: 9,
              text: "Wer nennt es eine Leistung, zwei Dinge gleichzeitig anzuerkennen?",
              options: ["Frau Wollschläger", "Herr Bittner", "Frau Mahnke", "Herr Duschek"],
              answer: 2,
              explain:
                "\"Anstrengung ist notwendig und erklärt nicht das Ergebnis. Beides gleichzeitig auszuhalten, ist die eigentliche Leistung.\"",
            },
          ],
        },
        {
          id: "de-b2-12-l2",
          no: 2,
          format: "match",
          goal: "structure",
          prompt:
            "Lesen Sie den Text. In den Lücken 10 bis 15 fehlt jeweils ein Satz. Welcher Satz a bis h passt in welche Lücke? Zwei Sätze passen nirgends.",
          promptTr:
            "Metni oku. 10–15. boşluklarda birer cümle eksik. a–h cümlelerinden hangisi hangi boşluğa uyar? İki cümle hiçbir yere uymuyor.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Sachtext",
              genreTr: "Bilgi metni",
              title: "Warum wir den Zufall nachträglich streichen",
              body: `Wer über einen erfolgreichen Weg berichtet, erzählt fast immer eine Kette von Entscheidungen. Zufälle kommen darin selten vor. {{10}}

Der Grund liegt nicht im Willen zur Täuschung. Unser Gedächtnis ordnet Ereignisse nachträglich zu einer Linie. {{11}}

Sichtbar wird das in Untersuchungen, in denen dieselben Personen vor und nach einem Ergebnis befragt werden. Vorher nennen sie mehrere mögliche Verläufe. {{12}}

Praktisch folgenreich ist das bei der Auswahl von Personal. Wer glaubt, Erfolg lasse sich vollständig erklären, sucht in Lebensläufen nach Merkmalen, die es so nicht gibt. {{13}}

Die Gegenbewegung geht allerdings zu weit. Aus der Feststellung, dass Zufall eine Rolle spielt, folgt nicht, dass nur er eine Rolle spielt. {{14}}

Nützlich ist eine bescheidenere Haltung. Die Frage, warum jemand erfolgreich wurde, ließe sich ersetzen durch die Frage, unter welchen Bedingungen sein Weg wahrscheinlicher war. {{15}}

Was bleibt, ist unbequem: Die überzeugendste Erklärung ist selten die vollständigste, sondern die, die am besten erzählt werden kann.`,
              gloss: [
                { de: "die Täuschung", tr: "aldatma", en: "deception" },
                { de: "der Verlauf", tr: "seyir, gidişat", en: "course" },
                { de: "das Merkmal", tr: "özellik, belirti", en: "characteristic" },
                { de: "bescheiden", tr: "alçakgönüllü", en: "modest" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Auffällig ist, dass auch die Erzählenden selbst daran glauben.",
            },
            {
              key: "b",
              label: "b",
              body: "Was am Ende geschehen ist, erscheint uns rückblickend als das Wahrscheinliche.",
            },
            {
              key: "c",
              label: "c",
              body: "Danach ist es fast immer nur noch einer, und der wirkt zwingend.",
            },
            {
              key: "d",
              label: "d",
              body: "Dieselbe Anstrengung führt unter anderen Bedingungen zu anderen Ergebnissen.",
            },
            {
              key: "e",
              label: "e",
              body: "Diese Frage lässt sich beantworten und hilft bei der nächsten Entscheidung.",
            },
            {
              key: "f",
              label: "f",
              body: "Wer ausschließlich so denkt, spricht am Ende jedem jede Verantwortung ab.",
            },
            { key: "g", label: "g", body: "Die Zahl der Bewerbungen pro Stelle ist zuletzt deutlich gestiegen." },
            { key: "h", label: "h", body: "Über die Besetzung entscheidet in der Regel die Personalabteilung." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-12-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "a",
              explain:
                "İlk paragraf anlatının biçimini veriyor; (a) bunu bir adım ileri götürüyor: \"auch die Erzählenden selbst daran glauben\" — yani mesele kasıtlı bir yanıltma değil, ve sonraki paragraf tam bunu söylüyor.",
            },
            {
              kind: "match",
              id: "de-b2-12-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "b",
              explain:
                "Belleğin olayları \"nachträglich zu einer Linie\" dizdiği söyleniyor; (b) sonucu adlandırıyor: \"erscheint uns rückblickend als das Wahrscheinliche\".",
            },
            {
              kind: "match",
              id: "de-b2-12-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "c",
              explain:
                "Öncesinde \"mehrere mögliche Verläufe\" sayılıyor; (c) sonrasını veriyor: \"fast immer nur noch einer, und der wirkt zwingend\".",
            },
            {
              kind: "match",
              id: "de-b2-12-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "d",
              explain:
                "Var olmayan özellikler aranıyor; (d) bunun neden boşuna olduğunu söylüyor: \"Dieselbe Anstrengung führt unter anderen Bedingungen zu anderen Ergebnissen.\"",
            },
            {
              kind: "match",
              id: "de-b2-12-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "f",
              explain:
                "Karşı akımın aşırılığı anlatılıyor; (f) bunun sonucunu adlandırıyor: \"spricht am Ende jedem jede Verantwortung ab\".",
            },
            {
              kind: "match",
              id: "de-b2-12-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "e",
              explain:
                "Önerilen soru koşullara bakıyor; (e) bu sorunun üstünlüğünü veriyor: \"lässt sich beantworten und hilft bei der nächsten Entscheidung\".",
            },
          ],
        },
        {
          id: "de-b2-12-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Kommentar und die Aufgaben 16 bis 21. Wählen Sie: a, b oder c.",
          promptTr: "Köşe yazısını ve 16–21. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "k1",
              genre: "Kommentar",
              genreTr: "Köşe yazısı",
              title: "Die Bewerbung, die niemand gelesen hat",
              body: `Unsere Stadtverwaltung hat im letzten Jahr vierzehnhundert Bewerbungen bekommen und zweiundsechzig Stellen besetzt. Über den Rest steht in keinem Bericht etwas.

Ich habe deshalb nachgefragt, wie lange eine Bewerbung im Schnitt gelesen wird. Die Antwort war ehrlicher, als ich erwartet hatte: zwischen neunzig Sekunden und drei Minuten.

Das ist kein Vorwurf an die Personalabteilung. Bei vierzehnhundert Unterlagen und sechs Mitarbeitenden ist mehr nicht möglich. Der Vorwurf gilt der Erzählung, die wir darüber legen.

Denn die Erklärung nach außen lautet weiterhin, man suche die beste Person. Bei neunzig Sekunden sucht man die auffälligste, und das ist etwas anderes.

Man wird einwenden, erfahrene Leserinnen erkennen Qualität schnell. Der Einwand hat einen wahren Kern: Vieles lässt sich tatsächlich in kurzer Zeit sehen. Nur zeigt dieselbe Erfahrung auch, dass die Reihenfolge im Stapel wirkt — und Reihenfolge ist keine Eigenschaft der Bewerberin.

Bemerkenswert finde ich, wie leicht das zu prüfen wäre. Man müsste den Stapel zweimal lesen, das zweite Mal umgekehrt. Eine Personalleiterin, mit der ich gesprochen habe, macht genau das und hat dadurch drei Einstellungen anders entschieden.

Mein Vorschlag ist deshalb bescheiden: nicht mehr Personal, sondern eine zweite Runde. Sie kostet zwei Stunden im Monat und würde der Erzählung wenigstens einen Teil ihrer Wahrheit zurückgeben.`,
              gloss: [
                { de: "besetzen", tr: "(kadroyu) doldurmak", en: "to fill (a post)" },
                { de: "auffällig", tr: "göze çarpan", en: "conspicuous" },
                { de: "der wahre Kern", tr: "doğru yanı", en: "kernel of truth" },
                { de: "die Eigenschaft", tr: "nitelik", en: "attribute" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-12-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie lange wird eine Bewerbung im Schnitt gelesen?",
              options: [
                "Zwischen fünf und zehn Minuten.",
                "Etwa eine Viertelstunde.",
                "Höchstens drei Minuten.",
              ],
              answer: 2,
              explain:
                "Kurumun verdiği aralık: \"zwischen neunzig Sekunden und drei Minuten\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l3-17",
              no: 17,
              ref: "k1",
              text: "Wem gilt der Vorwurf des Autors?",
              options: [
                "Der Erzählung über das Verfahren.",
                "Der Personalabteilung.",
                "Den Bewerberinnen selbst.",
              ],
              answer: 0,
              explain:
                "Yazı ikisini ayırıyor: \"Das ist kein Vorwurf an die Personalabteilung … Der Vorwurf gilt der Erzählung, die wir darüber legen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l3-18",
              no: 18,
              ref: "k1",
              text: "Was sucht man nach ihm bei neunzig Sekunden?",
              options: [
                "Die Person mit der besten Bewerbung.",
                "Die auffälligste Person.",
                "Die Person oben im Stapel.",
              ],
              answer: 1,
              explain:
                "Karşıtlık tek cümlede: dışarıya \"die beste Person\" deniyor, gerçekte aranan ise \"die auffälligste\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l3-19",
              no: 19,
              ref: "k1",
              text: "Wie geht er mit dem Einwand der Erfahrung um?",
              options: [
                "Er weist den Einwand vollständig zurück.",
                "Er hält den Einwand für vorgeschoben.",
                "Er gibt zu, dass etwas daran stimmt.",
              ],
              answer: 2,
              explain:
                "\"Der Einwand hat einen wahren Kern\" — ama aynı deneyim yığındaki sıranın da etkili olduğunu gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l3-20",
              no: 20,
              ref: "k1",
              text: "Warum ist die Reihenfolge für ihn ein Problem?",
              options: [
                "Sie sagt nichts über die Person.",
                "Sie lässt sich technisch nicht ändern.",
                "Sie ist von der Abteilung gewollt.",
              ],
              answer: 0,
              explain:
                "Yazının kilit cümlesi: \"Reihenfolge ist keine Eigenschaft der Bewerberin.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l3-21",
              no: 21,
              ref: "k1",
              text: "Was schlägt er vor?",
              options: [
                "Mehr Personal in der Abteilung.",
                "Weniger Bewerbungen zuzulassen.",
                "Eine zweite Leserunde.",
              ],
              answer: 2,
              explain:
                "Öneriyi maliyetiyle veriyor: \"nicht mehr Personal, sondern eine zweite Runde. Sie kostet zwei Stunden im Monat.\"",
            },
          ],
        },
        {
          id: "de-b2-12-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Bewerbungen anonym sein sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, başvuruların anonim olup olmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Ilic, Personalerin",
              body: "Wir haben es zwei Jahre gemacht. Die Einladungen wurden vielfältiger, die Einstellungen kaum. Der Engpass sitzt nicht beim ersten Blick, sondern im Gespräch danach.",
            },
            {
              key: "b",
              label: "b — Herr Rehbein, Betriebsrat",
              body: "Ich bin dafür, und zwar nicht wegen der Wirkung, sondern wegen der Begründungspflicht. Wer ohne Namen aussortiert, muss sagen, welches Kriterium er benutzt hat. Genau das fehlte uns vorher.",
            },
            {
              key: "c",
              label: "c — Frau Kunkel, Bewerberin",
              body: "Ich habe unter meinem Geburtsnamen zwei Einladungen bekommen und unter dem meines Mannes elf. Gleiche Unterlagen, gleiche Firmen, ein Jahr Abstand. Mehr muss ich dazu nicht sagen.",
            },
            {
              key: "d",
              label: "d — Herr Sarrazin, Geschäftsführer",
              body: "Ich halte das für Symbolpolitik. Bei uns bewerben sich achtzig Leute auf eine Stelle, und wir laden acht ein. Die Frage ist nicht, wie wir lesen, sondern dass wir gar nicht lesen können.",
            },
            {
              key: "e",
              label: "e — Frau Emmerich, Forscherin",
              body: "Die Befunde sind eindeutiger, als die Debatte vermuten lässt: Anonyme Verfahren erhöhen die Einladungsquote messbar. Was danach passiert, ist ein anderes Problem und wird oft mit dem ersten verwechselt.",
            },
            {
              key: "f",
              label: "f — Herr Tolksdorf, Handwerker",
              body: "In meinem Betrieb sind wir sieben. Ich kenne die meisten Bewerber vom Sehen, und das lässt sich nicht anonymisieren. Für große Häuser mag es taugen, für uns ist es eine Formalität.",
            },
            {
              key: "g",
              label: "g — Frau Zabel, Ausbilderin",
              body: "Mich stört an der Debatte, dass immer über Zugang geredet wird und nie über das, was danach kommt. Wir haben viele eingeladen und die Hälfte im ersten Jahr wieder verloren.",
            },
            {
              key: "h",
              label: "h — Herr Nolde, Rentner",
              body: "Ich habe dazu keine feste Meinung. Auffällig finde ich nur, dass alle Beteiligten von Fairness sprechen und dabei völlig verschiedene Dinge meinen.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-12-l4-22",
              no: 22,
              text: "Die Wirkung zeigt sich bei der Einladung, nicht bei der Einstellung.",
              answer: "a",
              explain:
                "(a) iki aşamayı ayırıyor: davetler çeşitlenmiş, işe alımlar neredeyse değişmemiş — \"Der Engpass sitzt … im Gespräch danach.\"",
            },
            {
              kind: "match",
              id: "de-b2-12-l4-23",
              no: 23,
              text: "Der eigentliche Gewinn liegt darin, das Kriterium nennen zu müssen.",
              answer: "b",
              explain:
                "(b) gerekçesini etkiden ayırıyor: \"nicht wegen der Wirkung, sondern wegen der Begründungspflicht\".",
            },
            {
              kind: "match",
              id: "de-b2-12-l4-24",
              no: 24,
              text: "Dieselben Unterlagen haben unter zwei Namen sehr verschieden gewirkt.",
              answer: "c",
              explain:
                "(c) sayıyla veriyor: iki davete karşılık on bir davet, \"Gleiche Unterlagen, gleiche Firmen, ein Jahr Abstand.\"",
            },
            {
              kind: "match",
              id: "de-b2-12-l4-25",
              no: 25,
              text: "Das Problem ist die Menge, nicht die Art des Lesens.",
              answer: "d",
              explain:
                "(d) soruyu kaydırıyor: \"Die Frage ist nicht, wie wir lesen, sondern dass wir gar nicht lesen können.\"",
            },
            {
              kind: "match",
              id: "de-b2-12-l4-26",
              no: 26,
              text: "Zwei verschiedene Fragen werden in der Debatte vermischt.",
              answer: "e",
              explain:
                "(e) bulguyu verip sınırını çiziyor: sonrasında olanlar \"ein anderes Problem und wird oft mit dem ersten verwechselt\".",
            },
            {
              kind: "match",
              id: "de-b2-12-l4-27",
              no: 27,
              text: "In sehr kleinen Betrieben lässt sich das kaum umsetzen.",
              answer: "f",
              explain:
                "(f) ölçeği gerekçe yapıyor: yedi kişilik işletmede adayları görmekten tanıyor, \"das lässt sich nicht anonymisieren\".",
            },
          ],
        },
        {
          id: "de-b2-12-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Auswahlordnung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Seçim yönetmeliğini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Auswahlordnung",
              genreTr: "Seçim yönetmeliği",
              title: "Stadtverwaltung Ostheim — Ordnung für Auswahlverfahren (Auszug)",
              body: `§1 Grundsatz
Die Auswahl erfolgt nach Eignung, Befähigung und fachlicher Leistung. Andere Merkmale bleiben außer Betracht; ihre Nennung in den Unterlagen ist unschädlich.

§2 Erste Sichtung
Jede Bewerbung wird von zwei Personen unabhängig gesichtet. Weichen die Bewertungen um mehr als eine Stufe voneinander ab, entscheidet eine dritte Person.

§3 Reihenfolge
Der Stapel wird in der zweiten Runde in umgekehrter Reihenfolge gelesen. Diese Vorgabe ist verbindlich und wird im Vermerk festgehalten.

§4 Begründung
Ablehnungen nach der Sichtung sind in Stichworten zu begründen. Der Vermerk verbleibt zwei Jahre in der Akte und ist der Bewerberin auf Verlangen zugänglich.`,
              gloss: [
                { de: "die Eignung", tr: "uygunluk", en: "aptitude" },
                { de: "die Sichtung", tr: "ön inceleme", en: "screening" },
                { de: "der Vermerk", tr: "not, tutanak", en: "memo, record" },
                { de: "auf Verlangen", tr: "talep üzerine", en: "on request" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-12-l5-28",
              no: 28,
              ref: "o1",
              text: "Was geschieht, wenn zwei Bewertungen weit auseinanderliegen?",
              options: [
                "Es kommt ein Dritter dazu.",
                "Die Bewerbung fällt heraus.",
                "Beide Bewertungen werden gemittelt.",
              ],
              answer: 0,
              explain:
                "§2 eşiği ve sonucunu birlikte veriyor: sapma bir kademeden fazlaysa \"entscheidet eine dritte Person\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l5-29",
              no: 29,
              ref: "o1",
              text: "Welchen Status hat die umgekehrte Lesereihenfolge?",
              options: [
                "Sie ist eine Empfehlung ohne Pflicht.",
                "Sie ist bindend und wird dokumentiert.",
                "Sie gilt nur bei mehr als 100 Bewerbungen.",
              ],
              answer: 1,
              explain:
                "§3 iki şey söylüyor: \"Diese Vorgabe ist verbindlich und wird im Vermerk festgehalten.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-l5-30",
              no: 30,
              ref: "o1",
              text: "Wer darf den Vermerk zu einer Ablehnung einsehen?",
              options: [
                "Nur die sichtende Person.",
                "Ausschließlich die dritte Person.",
                "Die abgelehnte Bewerberin.",
              ],
              answer: 2,
              explain:
                "§4 erişimi bir koşula bağlıyor ama açıkça veriyor: \"ist der Bewerberin auf Verlangen zugänglich\".",
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
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Interview, eine Diskussion und acht kurze Beiträge.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir söyleşi, bir tartışma ve sekiz kısa parça dinleyeceksin.",
      tasks: [
        {
          id: "de-b2-12-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage in der Verwaltung",
              genreTr: "İdarede anons",
              situation: "Bir usul değişikliği.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für die Sichtung: Ab dem nächsten Verfahren lesen wir den Stapel in der zweiten Runde rückwärts. Das ist keine Empfehlung mehr, sondern verbindlich, und es wird im Vermerk festgehalten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Bir sayı yorumlanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Die Stadt hat im vergangenen Jahr vierzehnhundert Bewerbungen erhalten und zweiundsechzig Stellen besetzt. Die Zahl der Bewerbungen ist damit doppelt so hoch wie vor fünf Jahren, die Zahl der Stellen ist unverändert.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir başvuru sonucu.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Kunkel, hier ist die Stadtverwaltung. Ihre Bewerbung ist in die zweite Runde gekommen. Den Vermerk zur ersten Sichtung können Sie einsehen, wenn Sie das wünschen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Sitzung",
              genreTr: "Oturumda duyuru",
              situation: "Bir değerlendirme erteleniyor.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir über das anonyme Verfahren abstimmen: Die vorliegende Auswertung umfasst nur die Einladungen, nicht die Einstellungen. Ich schlage vor, die zweite Zahl nachzufordern und heute nicht zu entscheiden.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir görüşme daveti.",
              plays: 1,
              segments: [
                {
                  text: "Hallo Herr Tolksdorf, hier ist die Handwerkskammer. Ihr Beitrag für die Podiumsdiskussion passt uns gut. Wir haben allerdings nur noch fünfzehn Minuten statt der geplanten zwanzig.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-12-h1-1",
              no: 1,
              ref: "h1",
              text: "Die umgekehrte Lesereihenfolge ist ab jetzt Pflicht.",
              answer: true,
              explain:
                "Anons bunu açıkça değiştiriyor: \"Das ist keine Empfehlung mehr, sondern verbindlich, und es wird im Vermerk festgehalten.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h1-2",
              no: 2,
              ref: "h1",
              text: "Wann wird rückwärts gelesen?",
              options: [
                "Schon bei der ersten Sichtung.",
                "In der zweiten Runde.",
                "Nur bei strittigen Fällen.",
              ],
              answer: 1,
              explain:
                "Anons zamanı belirtiyor: \"lesen wir den Stapel in der zweiten Runde rückwärts\".",
            },
            {
              kind: "bool",
              id: "de-b2-12-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Zahl der Stellen ist mit den Bewerbungen mitgewachsen.",
              answer: false,
              explain:
                "Haber ikisini ayırıyor: başvurular beş yıl öncesinin iki katı, \"die Zahl der Stellen ist unverändert\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h1-4",
              no: 4,
              ref: "h2",
              text: "Wie viele Stellen wurden besetzt?",
              options: ["Zweiundsechzig.", "Vierzehnhundert.", "Etwa dreihundert."],
              answer: 0,
              explain:
                "Kayıtta iki sayı var: 1400 başvuru sayısı, 62 ise doldurulan kadro sayısı.",
            },
            {
              kind: "bool",
              id: "de-b2-12-h1-5",
              no: 5,
              ref: "h3",
              text: "Frau Kunkel darf den Vermerk auf Wunsch sehen.",
              answer: true,
              explain:
                "Mesaj bunu koşula bağlıyor ama açıkça veriyor: \"können Sie einsehen, wenn Sie das wünschen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h1-6",
              no: 6,
              ref: "h3",
              text: "In welchem Stand ist ihre Bewerbung?",
              options: [
                "Sie wurde abgelehnt.",
                "Sie liegt noch bei der ersten Sichtung.",
                "Sie ist eine Runde weiter.",
              ],
              answer: 2,
              explain:
                "\"Ihre Bewerbung ist in die zweite Runde gekommen\" — yani ilk elemeyi geçmiş.",
            },
            {
              kind: "bool",
              id: "de-b2-12-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Auswertung enthält beide Zahlen.",
              answer: false,
              explain:
                "Duyuru eksiği adlandırıyor: değerlendirme \"nur die Einladungen, nicht die Einstellungen\" içeriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h1-8",
              no: 8,
              ref: "h4",
              text: "Was schlägt die sprechende Person vor?",
              options: [
                "Heute mit Vorbehalt zu beschließen.",
                "Die zweite Zahl nachzufordern.",
                "Das Verfahren ganz zu beenden.",
              ],
              answer: 1,
              explain:
                "Öneri iki bölümlü: eksik sayı istenecek ve \"heute nicht zu entscheiden\".",
            },
            {
              kind: "bool",
              id: "de-b2-12-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Beitrag wurde abgesagt.",
              answer: false,
              explain:
                "Katkı uygun bulunmuş: \"Ihr Beitrag für die Podiumsdiskussion passt uns gut\" — yalnız süre kısalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h1-10",
              no: 10,
              ref: "h5",
              text: "Wie lange darf er sprechen?",
              options: ["Fünfzehn Minuten.", "Zwanzig Minuten.", "Fünf Minuten."],
              answer: 0,
              explain:
                "Mesaj iki süreyi karşılaştırıyor: \"nur noch fünfzehn Minuten statt der geplanten zwanzig\".",
            },
          ],
        },
        {
          id: "de-b2-12-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Interview. Wählen Sie: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir söyleşi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir insan kaynakları yöneticisi anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Wollschläger, wie viel Zufall steckt in einer Einladung?" },
                {
                  speaker: "Frau Wollschläger",
                  text: "Mehr, als mir lieb ist. Von hundert Unterlagen sind achtzig fachlich passend. Der Unterschied entsteht danach, und er ist selten fachlich.",
                },
                { speaker: "Moderatorin", text: "Woran entscheidet es sich dann?" },
                {
                  speaker: "Frau Wollschläger",
                  text: "An Kleinigkeiten. An einem Wort im Anschreiben, an der Stelle im Stapel, manchmal an der Uhrzeit. Das klingt schlimmer, als es ist, und es ist schlimm genug.",
                },
                { speaker: "Moderatorin", text: "Warum sagen Sie das so offen?" },
                {
                  speaker: "Frau Wollschläger",
                  text: "Weil die Alternative wäre, eine Methode zu behaupten, die ich nicht habe. Das würde meinen Beruf mehr beschädigen als das Eingeständnis.",
                },
                { speaker: "Moderatorin", text: "Sie haben Ihr Verfahren geändert." },
                {
                  speaker: "Frau Wollschläger",
                  text: "Ich lese den Stapel zweimal, das zweite Mal rückwärts. Das kostet zwei Stunden im Monat. In zwei Jahren habe ich dadurch drei Personen eingestellt, die ich sonst übersehen hätte.",
                },
                { speaker: "Moderatorin", text: "Wären anonyme Bewerbungen die bessere Lösung?" },
                {
                  speaker: "Frau Wollschläger",
                  text: "Sie helfen bei der Einladung, nachweislich. Beim Gespräch danach helfen sie nicht, und dort sitzt bei uns der größere Teil des Problems.",
                },
                { speaker: "Moderatorin", text: "Was würden Sie sich wünschen?" },
                {
                  speaker: "Frau Wollschläger",
                  text: "Dass wir aufhören, von der besten Person zu sprechen. Bei neunzig Sekunden pro Unterlage suchen wir die auffälligste. Wer das ausspricht, kann anfangen, es zu ändern.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-12-h2-11",
              no: 11,
              ref: "i1",
              text: "Wie viele Unterlagen sind fachlich passend?",
              options: ["Etwa die Hälfte.", "Etwa ein Drittel.", "Etwa achtzig Prozent."],
              answer: 2,
              explain:
                "Oran kayıtta: \"Von hundert Unterlagen sind achtzig fachlich passend.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h2-12",
              no: 12,
              ref: "i1",
              text: "Woran entscheidet sich die Einladung nach ihr?",
              options: [
                "An der fachlichen Tiefe.",
                "An Kleinigkeiten.",
                "An der Länge der Erfahrung.",
              ],
              answer: 1,
              explain:
                "Üç örnek sayıyor: \"An einem Wort im Anschreiben, an der Stelle im Stapel, manchmal an der Uhrzeit.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h2-13",
              no: 13,
              ref: "i1",
              text: "Warum spricht sie offen darüber?",
              options: [
                "Eine behauptete Methode schadete mehr.",
                "Die Leitung hat sie dazu aufgefordert.",
                "Sie möchte das Verfahren abschaffen.",
              ],
              answer: 0,
              explain:
                "Alternatifi tartıyor: sahip olmadığı bir yöntemi iddia etmek \"würde meinen Beruf mehr beschädigen als das Eingeständnis\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h2-14",
              no: 14,
              ref: "i1",
              text: "Was hat ihre Änderung gebracht?",
              options: [
                "Eine kürzere Bearbeitungszeit.",
                "Weniger Beschwerden von Bewerbern.",
                "Drei Einstellungen in zwei Jahren.",
              ],
              answer: 2,
              explain:
                "Maliyet ve sonuç birlikte: ayda iki saat, ve \"drei Personen eingestellt, die ich sonst übersehen hätte\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h2-15",
              no: 15,
              ref: "i1",
              text: "Wie bewertet sie anonyme Bewerbungen?",
              options: [
                "Als wirkungslos.",
                "Als hilfreich, aber begrenzt.",
                "Als die beste verfügbare Lösung.",
              ],
              answer: 1,
              explain:
                "Davette kanıtlanmış biçimde yardımcı, ama \"Beim Gespräch danach helfen sie nicht\" — asıl sorun orada.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h2-16",
              no: 16,
              ref: "i1",
              text: "Was wünscht sie sich?",
              options: [
                "Eine ehrlichere Sprache über das Verfahren.",
                "Mehr Personal in der Abteilung.",
                "Eine gesetzliche Vorgabe für alle.",
              ],
              answer: 0,
              explain:
                "\"Dass wir aufhören, von der besten Person zu sprechen\" — doksan saniyede aranan \"die auffälligste\".",
            },
          ],
        },
        {
          id: "de-b2-12-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Anonim başvuru tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Emmerich, was zeigen die Untersuchungen?" },
                {
                  speaker: "Frau Emmerich",
                  text: "Bei der Einladungsquote einen messbaren Effekt. Bei der Einstellung fast keinen. Das ist kein Widerspruch, sondern ein Hinweis darauf, wo das Problem sitzt.",
                },
                { speaker: "Moderator", text: "Herr Sarrazin, Sie halten das für Symbolpolitik." },
                {
                  speaker: "Herr Sarrazin",
                  text: "Ich halte es für eine Antwort auf die falsche Frage. Bei achtzig Bewerbungen auf eine Stelle lade ich acht ein. Ob mit oder ohne Namen — zweiundsiebzig Leute bekommen eine Absage, die niemand richtig gelesen hat.",
                },
                {
                  speaker: "Frau Emmerich",
                  text: "Das Argument stimmt und es spricht nicht gegen das Verfahren. Es spricht gegen die Erwartung, dass ein Verfahren einen Personalmangel behebt.",
                },
                { speaker: "Moderator", text: "Herr Rehbein, Sie kommen aus dem Betriebsrat." },
                {
                  speaker: "Herr Rehbein",
                  text: "Mich überzeugt ein anderer Punkt. Wer ohne Namen aussortiert, muss angeben, welches Kriterium er benutzt hat. Diese Begründung hatten wir vorher nicht, und sie ist mehr wert als die Quote.",
                },
                {
                  speaker: "Herr Sarrazin",
                  text: "Da haben Sie recht, und das sage ich ungern. Die Begründungspflicht hat bei uns mehr verändert als die Anonymisierung selbst.",
                },
                { speaker: "Moderator", text: "Frau Emmerich, überrascht Sie das?" },
                {
                  speaker: "Frau Emmerich",
                  text: "Nein, aber es wird selten so gemessen. Wir erheben Quoten, weil sie leicht zu erheben sind. Die Qualität einer Begründung erhebt fast niemand.",
                },
                { speaker: "Moderator", text: "Ein gemeinsamer Vorschlag?" },
                {
                  speaker: "Herr Rehbein",
                  text: "Begründungspflicht auch ohne Anonymisierung. Dann streiten wir nicht mehr über das Etikett, sondern über den Inhalt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-12-h3-17",
              no: 17,
              ref: "d1",
              text: "Was zeigen die Untersuchungen laut Frau Emmerich?",
              options: [
                "Wirkung bei der Einladung, kaum bei der Einstellung.",
                "Wirkung an beiden Stellen gleichermaßen.",
                "Gar keine messbare Wirkung.",
              ],
              answer: 0,
              explain:
                "Bunu çelişki saymıyor: \"ein Hinweis darauf, wo das Problem sitzt\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h3-18",
              no: 18,
              ref: "d1",
              text: "Wie beschreibt Herr Sarrazin das Verfahren?",
              options: [
                "Als schädlich vor allem für kleine Betriebe.",
                "Als rechtlich zweifelhaft.",
                "Als Lösung für ein anderes Problem.",
              ],
              answer: 2,
              explain:
                "Sayıyla açıklıyor: seksen başvurudan sekizi davet ediliyor, \"zweiundsiebzig Leute bekommen eine Absage, die niemand richtig gelesen hat\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h3-19",
              no: 19,
              ref: "d1",
              text: "Wie reagiert Frau Emmerich darauf?",
              options: [
                "Sie hält den Einwand für falsch.",
                "Sie nimmt ihn an und richtet ihn um.",
                "Sie geht nicht darauf ein.",
              ],
              answer: 1,
              explain:
                "\"Das Argument stimmt und es spricht nicht gegen das Verfahren\" — beklentiye karşı bir argüman olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h3-20",
              no: 20,
              ref: "d1",
              text: "Was überzeugt Herrn Rehbein am meisten?",
              options: [
                "Die Pflicht, ein Kriterium zu nennen.",
                "Die höhere Einladungsquote.",
                "Der geringere Aufwand im Verfahren.",
              ],
              answer: 0,
              explain:
                "Gerekçelendirme yükümlülüğünü kotanın önüne koyuyor: \"sie ist mehr wert als die Quote\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h3-21",
              no: 21,
              ref: "d1",
              text: "Was räumt Herr Sarrazin ein?",
              options: [
                "Seine Zahlen waren zu hoch gegriffen.",
                "Anonymisierung wirkt doch bei der Einstellung.",
                "Die Begründungspflicht hat mehr bewirkt.",
              ],
              answer: 2,
              explain:
                "İsteksizce kabul ediyor: \"Da haben Sie recht, und das sage ich ungern.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h3-22",
              no: 22,
              ref: "d1",
              text: "Warum wird das selten gemessen?",
              options: [
                "Quoten sind leichter zu erheben.",
                "Die Betriebe verweigern die Auskunft.",
                "Es fehlt die rechtliche Grundlage.",
              ],
              answer: 0,
              explain:
                "\"Wir erheben Quoten, weil sie leicht zu erheben sind. Die Qualität einer Begründung erhebt fast niemand.\"",
            },
          ],
        },
        {
          id: "de-b2-12-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören acht kurze Beiträge. Worum geht es jeweils? Sie hören jeden Text einmal.",
          promptTr: "Sekiz kısa parça dinleyeceksin. Her birinde konu ne? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage in der Verwaltung",
              genreTr: "İdarede anons",
              situation: "Bir eğitim duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis: Die Schulung zur neuen Auswahlordnung findet am Dienstag statt, nicht am Montag. Teilnahme ist für alle Sichtenden verpflichtend; wer fehlt, darf im nächsten Verfahren nicht sichten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir sonuç haberi.",
              plays: 1,
              segments: [
                {
                  text: "Nach zwei Jahren mit anonymen Bewerbungen zieht die Stadt eine gemischte Bilanz: Die Einladungen wurden vielfältiger, die Einstellungen kaum. Die Verwaltung will das Verfahren dennoch fortführen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir belge talebi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist die Personalstelle. Sie haben den Vermerk zu Ihrer Absage angefordert. Wir schicken ihn diese Woche; er bleibt zwei Jahre in der Akte und kann in dieser Zeit jederzeit erneut angefordert werden.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Ansage im Betrieb",
              genreTr: "İşletmede duyuru",
              situation: "İşe alım sayıları.",
              plays: 1,
              segments: [
                {
                  text: "Zur Personalentwicklung: Wir haben neun Stellen ausgeschrieben und sieben besetzt. Bei den zwei offenen Stellen lag es nicht an fehlenden Bewerbungen, sondern daran, dass beide Kandidaten kurzfristig abgesagt haben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Podcast-Ausschnitt",
              genreTr: "Podcast parçası",
              situation: "Bir araştırma bulgusu.",
              plays: 1,
              segments: [
                {
                  text: "Bemerkenswert ist, wie sich Begründungen ändern. Vor dem Ergebnis nennen Befragte mehrere mögliche Verläufe, danach fast immer nur einen. Erklärt wird derselbe Weg, aber mit anderer Sicherheit.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m6",
              genre: "Durchsage in der Hochschule",
              genreTr: "Yüksekokulda anons",
              situation: "Bir başvuru tarihi.",
              plays: 1,
              segments: [
                {
                  text: "Zur Information: Die Frist für die Stipendienbewerbung endet am fünfzehnten Mai. Verspätete Unterlagen nehmen wir nicht an, auch nicht mit Begründung. Die Vergabe erfolgt im Juli.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m7",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir görüşme daveti.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Duschek, hier ist das Kulturamt. Wir möchten Sie für den Abend im Juni buchen. Das Honorar liegt bei sechshundert Euro; über den Ablauf sprechen wir noch.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m8",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir karşılaştırma uyarısı.",
              plays: 1,
              segments: [
                {
                  text: "Die Kammer weist darauf hin, dass ihre Einstellungszahlen mit denen der Nachbarkammer nur bedingt vergleichbar sind. Dort werden befristete Verträge mitgezählt, hier nur unbefristete.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-12-h4-23",
              no: 23,
              ref: "m1",
              text: "Worum geht es?",
              options: [
                "Die Schulung entfällt in dieser Woche.",
                "Eine Pflichtschulung wird verschoben.",
                "Die Auswahlordnung wird zurückgenommen.",
              ],
              answer: 1,
              explain:
                "Gün değişiyor ve katılım zorunlu: \"wer fehlt, darf im nächsten Verfahren nicht sichten\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-24",
              no: 24,
              ref: "m2",
              text: "Worum geht es?",
              options: [
                "Ein Verfahren wird dennoch fortgeführt.",
                "Ein Verfahren wird nach zwei Jahren beendet.",
                "Ein Verfahren hat alle Erwartungen erfüllt.",
              ],
              answer: 0,
              explain:
                "Davetler çeşitlenmiş, işe alımlar neredeyse değişmemiş — yine de \"will das Verfahren dennoch fortführen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-25",
              no: 25,
              ref: "m3",
              text: "Worum geht es?",
              options: [
                "Ein Dokument wurde vernichtet.",
                "Eine Absage wird zurückgenommen.",
                "Ein Dokument wird verschickt.",
              ],
              answer: 2,
              explain:
                "Not bu hafta gönderiliyor ve iki yıl dosyada kalıyor, \"kann in dieser Zeit jederzeit erneut angefordert werden\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-26",
              no: 26,
              ref: "m4",
              text: "Worum geht es?",
              options: [
                "Es fehlten geeignete und erfahrene Bewerbungen.",
                "Zwei Stellen blieben wegen Absagen offen.",
                "Die Stellen wurden gestrichen.",
              ],
              answer: 1,
              explain:
                "Duyuru gerekçeyi ayırıyor: eksik başvuru değil, \"beide Kandidaten kurzfristig abgesagt haben\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-27",
              no: 27,
              ref: "m5",
              text: "Worum geht es?",
              options: [
                "Erklärungen werden im Nachhinein eindeutiger.",
                "Befragte erinnern sich an weniger Details.",
                "Die Befragten ändern ihre Bewertung des ganzen Wegs.",
              ],
              answer: 0,
              explain:
                "Sonuçtan önce birkaç seyir, sonra neredeyse tek bir seyir: \"derselbe Weg, aber mit anderer Sicherheit\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-28",
              no: 28,
              ref: "m6",
              text: "Worum geht es?",
              options: [
                "Die Frist wurde um zwei Wochen verlängert.",
                "Die Vergabe wurde vorgezogen.",
                "Eine Frist gilt ohne Ausnahme.",
              ],
              answer: 2,
              explain:
                "Anons istisnayı açıkça kapatıyor: \"Verspätete Unterlagen nehmen wir nicht an, auch nicht mit Begründung.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-29",
              no: 29,
              ref: "m7",
              text: "Worum geht es?",
              options: [
                "Eine Anfrage mit offenem Detail.",
                "Eine Absage aus Kostengründen des Amts.",
                "Eine Bitte um ein Angebot.",
              ],
              answer: 0,
              explain:
                "Tarih ve ücret belli, ama \"über den Ablauf sprechen wir noch\".",
            },
            {
              kind: "mcq",
              id: "de-b2-12-h4-30",
              no: 30,
              ref: "m8",
              text: "Worum geht es?",
              options: [
                "Die Nachbarkammer arbeitet fehlerhaft.",
                "Zwei Zahlen sind nicht vergleichbar.",
                "Die Zählweise wird vereinheitlicht.",
              ],
              answer: 1,
              explain:
                "Oda hata değil uyumsuzluk bildiriyor: \"Dort werden befristete Verträge mitgezählt, hier nur unbefristete.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 75,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Leserbrief und eine halb offizielle Nachricht.",
      instructionTr: "Bu bölümde iki görev var: bir okur mektubu ve yarı resmî bir ileti.",
      tasks: [
        {
          id: "de-b2-12-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer sich anstrengt, kommt auch an — alles andere ist eine Ausrede.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Çabalayan varır — gerisi bahanedir.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 150,
            points: [
              { de: "Beziehen Sie sich auf die Aussage.", tr: "İddiaya açıkça atıf yap." },
              { de: "Nennen Sie mindestens zwei Argumente.", tr: "En az iki gerekçe sun." },
              { de: "Gehen Sie auf einen Einwand ein.", tr: "Karşı bir görüşü ele al." },
              { de: "Ziehen Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Sehr geehrte Redaktion,

Ihr Satz macht aus einer notwendigen Bedingung eine hinreichende, und genau darin liegt der Fehler.

Anstrengung ist nötig — daran zweifelt niemand. Sie erklärt aber nicht das Ergebnis. Eine Bekannte von mir hat unter ihrem Geburtsnamen zwei Einladungen bekommen und unter dem Namen ihres Mannes elf, mit denselben Unterlagen und im Abstand eines Jahres. Ihre Anstrengung war in beiden Jahren dieselbe.

Hinzu kommt, dass in unserer Stadtverwaltung eine Bewerbung im Schnitt zwischen neunzig Sekunden und drei Minuten gelesen wird. In dieser Zeit entscheidet auch die Stelle im Stapel — und die ist keine Eigenschaft der Bewerberin.

Nun ließe sich einwenden, wer den Zufall betone, nehme sich die eigene Verantwortung. Der Einwand trifft, wenn man es dabei belässt. Er trifft nicht, wenn man daraus Verfahren ableitet: eine zweite Leserunde etwa kostet zwei Stunden im Monat.

Ihr Satz tröstet die Angekommenen. Den anderen sagt er nur, dass sie selbst schuld sind.

Mit freundlichen Grüßen
Regina Mahnke`,
            criteria: [
              "İddiaya açıkça atıf yapıldı mı ve tartışma o cümle üzerinden mi yürüyor?",
              "En az iki bağımsız gerekçe var mı?",
              "Karşı görüş güçlü hâliyle mi alındı ve gerçekten yanıtlandı mı?",
              "Sonuç gerekçelerden çıkıyor mu?",
              "Yaklaşık 150 kelime var mı; okur mektubu biçimi korunmuş mu?",
              "Bağlaç ve edilgen yapılar B2 düzeyinde kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-b2-12-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben eine Absage bekommen und möchten den Vermerk zur Sichtung einsehen. Schreiben Sie an die Personalstelle (circa 100 Wörter).",
          promptTr:
            "Bir ret cevabı aldın ve ön inceleme notunu görmek istiyorsun. İnsan kaynakları birimine yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nennen Sie die Absage genau.", tr: "Ret cevabını tam olarak belirt." },
              { de: "Berufen Sie sich auf die Regelung.", tr: "Düzenlemeye dayan." },
              { de: "Sagen Sie, was Sie erwarten.", tr: "Ne beklediğini söyle." },
              { de: "Bleiben Sie sachlich und nennen Sie eine Frist.", tr: "Nesnel kal ve bir süre belirt." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 8. März habe ich eine Absage zu meiner Bewerbung auf die Stelle als Sachbearbeiterin, Kennziffer 2026-114, erhalten.

Nach § 4 Ihrer Auswahlordnung ist der Vermerk zur ersten Sichtung der Bewerberin auf Verlangen zugänglich. Von diesem Recht möchte ich Gebrauch machen.

Ich bitte Sie daher, mir den Vermerk in Kopie zu übersenden. Sollte eine Einsichtnahme nur vor Ort möglich sein, teilen Sie mir bitte zwei mögliche Termine mit.

Falls dem Vermerk aus Ihrer Sicht etwas entgegensteht, bitte ich um eine kurze Begründung unter Angabe der Rechtsgrundlage.

Über eine Antwort bis zum 31. März würde ich mich freuen.

Mit freundlichen Grüßen
Beatrix Kunkel`,
            criteria: [
              "Ret cevabı tarih ve pozisyon numarasıyla belirtildi mi?",
              "Talep bir düzenlemeye dayandırıldı mı?",
              "Beklenen şey uygulanabilir mi ve ikinci bir yol öneriliyor mu?",
              "Ton nesnel kaldı mı, suçlayıcı olmadı mı?",
              "Süre verildi mi ve yaklaşık 100 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und gemeinsam eine Entscheidung treffen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve birlikte karar vermek.",
      tasks: [
        {
          id: "de-b2-12-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wie viel Zufall steckt in einem Berufsweg?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"Bir meslek yolunda ne kadar tesadüf vardır?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
          minutes: 7,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Lage im Herkunftsland", tr: "Kendi ülkendeki durum" },
              { de: "Argumente für beide Seiten", tr: "İki tarafın da gerekçeleri" },
              { de: "Beispiele", tr: "Örnekler" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute darüber sprechen, wie viel Zufall in einem Berufsweg steckt. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In Serbien wird der Anteil des Zufalls offen benannt, oft zu offen: Viele sagen, ohne Beziehungen gehe gar nichts. Das ist bequem, weil es die eigene Anstrengung von vornherein entlastet. Für diese Sicht spricht trotzdem einiges. Mein Onkel ist Ingenieur und hat elf Jahre keine Stelle gefunden, weil sein Fachgebiet damals niemanden interessierte. Heute wäre er gefragt. Dagegen spricht, dass Zufall nicht gleichmäßig wirkt. Wer sich vorbereitet hat, kann eine Gelegenheit nutzen; wer nicht, sieht sie nicht einmal. Meine Position ist deshalb, dass beide Seiten dieselbe Sache von zwei Seiten beschreiben. Anstrengung entscheidet, ob man bereit ist. Der Zufall entscheidet, wann. Zusammenfassend: Wer nur von Leistung spricht, tröstet die Angekommenen; wer nur vom Zufall spricht, entlastet alle anderen. Beides ist zu einfach.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut ve açıklayıcı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Konum gerekçeli mi ve karşı tarafın noktasını kabul ediyor mu?",
              "Dört dakika boyunca yapı korunabildi mi?",
            ],
          },
        },
        {
          id: "de-b2-12-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Verwaltung will ihr Auswahlverfahren verbessern und hat Zeit für eine Maßnahme. Zur Wahl stehen: anonyme Bewerbungen, eine zweite Leserunde in umgekehrter Reihenfolge, eine Begründungspflicht bei Absagen, strukturierte Fragebögen für das Gespräch. Einigen Sie sich auf eine Maßnahme.",
          promptTr:
            "Birlikte bir karar verin. Bir idare seçim sürecini iyileştirmek istiyor ve tek bir önlem için zamanı var. Seçenekler: anonim başvuru, ters sırada ikinci okuma turu, retlerde gerekçelendirme zorunluluğu, görüşme için yapılandırılmış soru formu. Bir önlemde anlaşın.",
          minutes: 8,
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Ich fange an: Ich bin für anonyme Bewerbungen. Die Wirkung ist belegt, und man sieht sie in der Quote. Was meinen Sie?",
              tr: "Ben başlayayım: Anonim başvurudan yanayım. Etkisi kanıtlanmış ve kotada görülüyor. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve 'kotada görülüyor' gerekçesini doğrudan ele al.",
              expect: "bir seçeneği gerekçelendirmek ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Einwand: Eine Begründungspflicht schafft nur Papier. Am Ende schreibt jeder denselben Satz. Sehen Sie das anders?",
              tr: "Bir itiraz: Gerekçelendirme zorunluluğu yalnız kâğıt üretir. Sonunda herkes aynı cümleyi yazar. Sen farklı mı görüyorsun?",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve gerekirse bir koşul öner.",
              expect: "itirazı ele almak ve gerekirse koşullu bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Für mehrere Maßnahmen reicht die Zeit nicht. Was streichen wir, und mit welcher Begründung?",
              tr: "Birden çok önlem için zaman yetmiyor. Neyi eliyoruz ve hangi gerekçeyle?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden elediğini söyle.",
              expect: "gerekçeli bir önceliklendirme yapmak ve elemeyi savunmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin?",
            },
            {
              who: "you",
              hint: "Varılan anlaşmayı kısa ve eksiksiz özetle.",
              expect: "anlaşmayı eksiksiz ve kısa biçimde özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 8,
            points: [
              { de: "einen Vorschlag begründen", tr: "Bir öneriyi gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "priorisieren und begründen", tr: "Önceliklendirmek ve gerekçelendirmek" },
              { de: "das Ergebnis zusammenfassen", tr: "Sonucu özetlemek" },
            ],
            sample:
              "Ihr Argument mit der Quote überzeugt mich halb. Die Einladungsquote steigt tatsächlich, nur ändert sich bei den Einstellungen fast nichts — und dort sitzt der größere Teil des Problems. Ich schlage deshalb die Begründungspflicht vor. Zu Ihrem Einwand mit dem Papier: Er trifft, wenn man nur ein Feld ins Formular setzt. Er trifft nicht, wenn zwei Bedingungen dazukommen: Der Vermerk muss ein Kriterium nennen, und er muss der abgelehnten Person auf Verlangen zugänglich sein. Ein Satz, den jemand lesen kann, wird anders geschrieben. Streichen würde ich die strukturierten Fragebögen. Nicht weil sie schlecht wären, sondern weil sie erst im Gespräch wirken — und dorthin kommt nur, wer die Sichtung überstanden hat. Zusammengefasst: Begründungspflicht mit Kriterium und Einsichtsrecht, die zweite Leserunde als kleiner Zusatz, Anonymisierung und Fragebögen später.",
            criteria: [
              "Öneri gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "İtiraz kabul edilip yanıtlandı mı, yoksa görmezden mi gelindi?",
              "Önceliklendirme yapıldı mı ve eleme gerekçelendirildi mi?",
              "Özet eksiksiz mi — anlaşılan her şey geçiyor mu?",
              "Tartışma dili B2 düzeyinde mi (einwenden, priorisieren, abwägen)?",
            ],
          },
        },
      ],
    },
  ],
};
