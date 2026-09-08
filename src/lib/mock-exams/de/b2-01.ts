import type { MockPaper } from "../types";

/**
 * B2 · Deneme 1 — "Medien und Öffentlichkeit".
 *
 * ÖLÇÜM PLANI (B2: soyut ve karmaşık metinlerin ana hattını izlemek, yazarın
 * TUTUMUNU ve savın nasıl kurulduğunu görmek):
 *
 *   Lesen  65 dk · 30 madde
 *     Teil 1  9  dört şıklı   dört kişi anlatıyor — kim bunu söylüyor (opinion)
 *     Teil 2  6  eşleştirme   metne cümle yerleştirme — bağdaşıklık (structure)
 *     Teil 3  6  üç şıklı     yorum yazısı — yazarın tutumu (opinion)
 *     Teil 4  6  eşleştirme   sekiz okur yorumu — hangi görüş kimde (opinion)
 *     Teil 5  3  üç şıklı     işyeri yönergesi — kural (instruction)
 *   Hören  40 dk · 30 madde
 *     Teil 1 10  karışık      beş gündelik konuşma, her birine R/F + üç şıklı
 *     Teil 2  6  üç şıklı     radyo söyleşisi (detail)
 *     Teil 3  6  üç şıklı     üç kişilik iş konuşması — bunu kim söyledi (opinion)
 *     Teil 4  8  üç şıklı     bilimsel sunum (gist)
 *   Schreiben 75 dk  görüş yazısı (~150 kelime) · yarı resmî ileti (~100 kelime)
 *   Sprechen  15 dk  sunum ve sorular · tartışma
 *
 * B2 SINIRI YOKTUR, ZORLUK VARDIR: edilgen, Konjunktiv I ile dolaylı aktarım,
 * ad öbekleriyle kurulmuş yoğun cümleler, `zumal/hingegen/allerdings` gibi
 * bağlayıcılar serbest. Buna karşılık her maddenin cevabı metinde KANITLANABİLİR
 * olmak zorunda: B2'de zorluk, çıkarım yapmakla dünya bilgisi kullanmak
 * arasındaki farkı korumaktan gelir.
 *
 * TEIL 2 (cümle yerleştirme) kâğıdın tek dilbilgisi-yakın görevi: doğru cümle
 * yalnız anlamdan değil, gönderme öğelerinden (`sie`, `dieses Muster`, `deshalb`)
 * de bulunur. İki çeldirici cümle konuyla ilgili ama hiçbir boşluğun önündeki
 * cümleye bağlanmıyor.
 */
export const B2_01: MockPaper = {
  id: "de-b2-01",
  course: "de",
  level: "B2",
  no: 1,
  theme: "Medien und Öffentlichkeit",
  themeTr: "Medya ve kamuoyu",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen Erfahrungsberichte, einen Sachtext, einen Kommentar, Leserstimmen und eine Betriebsvereinbarung. Sie können mit jeder Aufgabe beginnen.",
      instructionTr:
        "Bu bölümde beş görev var: kişisel anlatılar, bir bilgi metni, bir yorum yazısı, okur görüşleri ve bir işyeri sözleşmesi okuyacaksın. İstediğin görevle başlayabilirsin.",
      tasks: [
        {
          id: "de-b2-01-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über ihren Umgang mit Nachrichten. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi haberlerle kurduğu ilişkiyi yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "p1",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Erik, 32, Softwareentwickler",
              body: `Vor zwei Jahren habe ich sämtliche Nachrichten-Apps von meinem Telefon gelöscht — nicht aus Protest, sondern weil ich nach einer Stunde Lesen nicht mehr sagen konnte, was ich eigentlich gelesen hatte.

Heute abonniere ich eine Wochenzeitung und gehe sie samstags in zwei Stunden durch. Dabei ist mir etwas aufgefallen: Von den Meldungen, die mich unter der Woche aufgeregt hätten, steht am Samstag ungefähr die Hälfte gar nicht mehr drin. Sie hat sich offenbar von selbst erledigt.

Vermissen tue ich vor allem eines: das Gefühl, früh Bescheid zu wissen. Es war ein angenehmes Gefühl, und es war fast immer wertlos.`,
              gloss: [
                { de: "sich erledigen", tr: "kendiliğinden çözülmek, konu olmaktan çıkmak", en: "to sort itself out" },
                { de: "der Aufreger", tr: "ortalığı karıştıran haber", en: "hot-button story" },
              ],
            },
            {
              kind: "text",
              id: "p2",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Katharina, 58, Lehrerin",
              body: `Ich unterrichte seit dreißig Jahren und lese vermutlich mehr Zeitungen als meine gesamte Klasse zusammen. Sorge bereitet mir dabei nicht die Menge, sondern die Frage, woher meine Schülerinnen und Schüler ihre Informationen beziehen.

Wenn ich frage, wo sie etwas gelesen haben, folgt meistens ein Achselzucken. Nicht, weil es ihnen gleichgültig wäre — sie haben schlicht nie gelernt, dass diese Frage überhaupt wichtig ist.

Ich beginne deshalb seit einiger Zeit jede Stunde mit fünf Minuten Herkunftsprüfung. Anfangs hielten das viele für Zeitverschwendung, auch im Kollegium. Inzwischen fragen die Jugendlichen von selbst, bevor ich es tue.`,
              gloss: [
                { de: "das Achselzucken", tr: "omuz silkme", en: "shrug" },
                { de: "das Kollegium", tr: "öğretmenler kurulu", en: "teaching staff" },
              ],
            },
            {
              kind: "text",
              id: "p3",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Franzi, 24, Studentin",
              body: `Mir wird regelmäßig erklärt, dass man sich in kurzen Videos nicht ernsthaft informieren könne. Ich halte das für eine bequeme Behauptung.

Ich folge einer Handvoll Leute, die ihre Quellen in der Beschreibung angeben, und ich prüfe diese Angaben stichprobenartig — vermutlich häufiger, als die meisten eine gedruckte Zeitung prüfen.

Was allerdings zutrifft: Die Auswahl trifft keine Redaktion, sondern ein Programm, das mir zeigt, was mich möglichst lange hält. Damit muss man umgehen können. Ich sehe mir deshalb einmal in der Woche bewusst etwas an, das ich mir nie selbst ausgesucht hätte.`,
              gloss: [
                { de: "stichprobenartig", tr: "örnekleme yoluyla", en: "by spot check" },
                { de: "zutreffen", tr: "doğru olmak", en: "to be true, to apply" },
              ],
            },
            {
              kind: "text",
              id: "p4",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Nils, 45, Krankenpfleger",
              body: `Ich arbeite in Nachtschichten, und das prägt meinen Nachrichtenkonsum stärker als jede Überzeugung. Wenn ich um sechs Uhr morgens nach Hause komme, will ich nichts lesen, was mich noch beschäftigt.

Ich höre dann zwanzig Minuten Radio, reine Meldungen, keine Kommentare. Meinungsbeiträge lese ich frühestens am freien Tag, und auch dann nur, wenn ich weiß, wer sie geschrieben hat.

Am meisten ärgert mich etwas anderes: Über meinen Beruf wird viel geschrieben, aber fast nie mit jemandem, der ihn ausübt. Nach zwei Absätzen merke ich, ob jemand jemals in einem Krankenzimmer gestanden hat.`,
              gloss: [
                { de: "prägen", tr: "biçimlendirmek, belirlemek", en: "to shape" },
                { de: "der Meinungsbeitrag", tr: "yorum yazısı", en: "opinion piece" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-01-l1-1",
              no: 1,
              text: "Wer hat den eigenen Nachrichtenkonsum bewusst verlangsamt?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 0,
              explain:
                "Erik: «habe ich sämtliche Nachrichten-Apps von meinem Telefon gelöscht» ve haberi haftada bir, iki saatte topluca okuyor. Nils de kendi ritmini anlatıyor ama bu bir yavaşlatma kararı değil, vardiya zorunluluğu.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-2",
              no: 2,
              text: "Wer richtet den Nachrichtenkonsum nach dem Arbeitsrhythmus aus?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 3,
              explain:
                "\"Ich arbeite in Nachtschichten, und das prägt meinen Nachrichtenkonsum stärker als jede Überzeugung\" — belirleyen şey inanç değil, çalışma düzeni.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-3",
              no: 3,
              text: "Wer kritisiert, dass über die eigene Berufsgruppe ohne deren Beteiligung geschrieben wird?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 3,
              explain:
                "\"Über meinen Beruf wird viel geschrieben, aber fast nie mit jemandem, der ihn ausübt\" — eleştirilen şey metnin yokluğu değil, mesleği yapanın sesinin yokluğu.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-4",
              no: 4,
              text: "Wer weist ein verbreitetes Urteil über ein Medienformat zurück?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 2,
              explain:
                "Franzi kısa videolarla ciddi bilgi edinilemeyeceği görüşünü \"eine bequeme Behauptung\" diye reddediyor ve buna karşı kendi denetim yöntemini koyuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-5",
              no: 5,
              text: "Wer hat eine neue Gewohnheit gegen anfänglichen Widerstand durchgesetzt?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 1,
              explain:
                "Katharina'nın \"fünf Minuten Herkunftsprüfung\" uygulaması başta zaman kaybı sayılmış — hem öğrencilerce hem meslektaşlarınca — ama sürdürülmüş.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-6",
              no: 6,
              text: "Wer sorgt absichtlich dafür, auch nicht selbst gewählte Inhalte zu sehen?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 2,
              explain:
                "Franzi: «Ich sehe mir deshalb einmal in der Woche bewusst etwas an, das ich mir nie selbst ausgesucht hätte» — algoritmanın seçimine karşı kurulmuş bir alışkanlık.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-7",
              no: 7,
              text: "Wer beschreibt ein angenehmes Gefühl, das kaum einen Nutzen hatte?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 0,
              explain:
                "Erik'in son cümlesi: erken haberdar olma duygusu \"ein angenehmes Gefühl, und es war fast immer wertlos\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-8",
              no: 8,
              text: "Wer stellt fest, dass die Frage nach der Herkunft einer Information nie gelernt wurde?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 1,
              explain:
                "Katharina, öğrencilerinin ilgisiz olmadığını özellikle belirtiyor: \"sie haben schlicht nie gelernt, dass diese Frage überhaupt wichtig ist\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l1-9",
              no: 9,
              text: "Wer liest Meinungstexte nur unter einer bestimmten Bedingung?",
              options: ["Erik", "Katharina", "Franzi", "Nils"],
              answer: 3,
              explain:
                "Nils yorum yazılarını ancak izin gününde ve \"nur, wenn ich weiß, wer sie geschrieben hat\" koşuluyla okuyor.",
            },
          ],
        },
        {
          id: "de-b2-01-l2",
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
              title: "Warum Korrekturen sich schlechter verbreiten als Falschmeldungen",
              body: `Eine falsche Meldung ist binnen weniger Stunden um die halbe Welt gegangen; die Richtigstellung erreicht am nächsten Tag einen Bruchteil derselben Menschen. {{10}}

Ein erster Grund liegt in der Bauform der Erzählung. Eine Falschmeldung ist in der Regel vollständig: Sie nennt einen Schuldigen, ein Motiv und ein Ergebnis. Eine Korrektur dagegen besteht im Kern aus einer Verneinung. {{11}}

Hinzu kommt ein zeitlicher Effekt. Wer eine Meldung am Morgen gelesen hat, begegnet der Korrektur häufig erst am Abend, und dann in einem völlig anderen Zusammenhang. {{12}}

Besonders schwer wiegt der soziale Anteil. Nachrichten werden nicht nur gelesen, sondern weitergegeben. {{13}}

Was folgt daraus für Redaktionen? Vor allem, dass die übliche Form der Korrektur wenig taugt: Ein kurzer Hinweis unter dem alten Text erreicht kaum jemanden. {{14}}

Ganz auflösen lässt sich das Problem damit allerdings nicht. Wer die erste Fassung einer Geschichte gehört hat, behält von ihr etwas zurück, selbst wenn er die Korrektur ausdrücklich akzeptiert. {{15}}`,
              gloss: [
                { de: "die Richtigstellung", tr: "düzeltme, tekzip", en: "correction" },
                { de: "der Bruchteil", tr: "çok küçük bir kısım", en: "fraction" },
                { de: "die Verneinung", tr: "olumsuzlama", en: "negation" },
                { de: "taugen", tr: "işe yaramak", en: "to be of use" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Fachleute empfehlen deshalb, die richtige Version als eigene Geschichte zu erzählen, statt die falsche noch einmal zu wiederholen." },
            { key: "b", label: "b", body: "Wer sie später zurücknimmt, korrigiert damit nicht nur eine Information, sondern auch das eigene Urteil vor anderen." },
            { key: "c", label: "c", body: "Dieses Muster lässt sich seit Jahren beobachten, und es ändert sich auch dann nicht, wenn die Korrektur ungewöhnlich schnell erscheint." },
            { key: "d", label: "d", body: "Gedruckte Zeitungen erscheinen heute in fast allen Regionen später am Tag als noch vor zehn Jahren." },
            { key: "e", label: "e", body: "In der Zwischenzeit hat die erste Fassung ihre Arbeit längst getan." },
            { key: "f", label: "f", body: "Realistisch ist deshalb weniger das Löschen eines Irrtums als seine Abschwächung." },
            { key: "g", label: "g", body: "Wer sich aber merken soll, dass etwas nicht stattgefunden hat, erinnert am Ende häufig nur das Ereignis." },
            { key: "h", label: "h", body: "Die Zahl der Abonnements ist im selben Zeitraum um knapp ein Drittel gesunken." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-01-l2-10",
              no: 10,
              text: "Lücke 10",
              answer: "c",
              explain:
                "Boşluktan önce gözlemin kendisi anlatılıyor; (c) buna \"Dieses Muster\" diye geri gönderme yapıp genelliyor ve ardından gelen \"Ein erster Grund\" cümlesine zemin hazırlıyor.",
            },
            {
              kind: "match",
              id: "de-b2-01-l2-11",
              no: 11,
              text: "Lücke 11",
              answer: "g",
              explain:
                "Önceki cümle düzeltmenin özünün bir olumsuzlama olduğunu söylüyor; (g) \"Wer sich aber merken soll, dass etwas nicht stattgefunden hat …\" diyerek tam bunun sonucunu veriyor.",
            },
            {
              kind: "match",
              id: "de-b2-01-l2-12",
              no: 12,
              text: "Lücke 12",
              answer: "e",
              explain:
                "Sabah/akşam aralığından söz ediliyor; (e) \"In der Zwischenzeit\" ile o aralığa gönderme yapıyor. Başka hiçbir cümlede zaman göndermesi yok.",
            },
            {
              kind: "match",
              id: "de-b2-01-l2-13",
              no: 13,
              text: "Lücke 13",
              answer: "b",
              explain:
                "Önceki cümle haberin başkalarına aktarıldığını söylüyor; (b) bu aktarımı \"Wer sie später zurücknimmt\" diye sürdürüyor. `sie` doğrudan `Nachrichten`e bağlanıyor.",
            },
            {
              kind: "match",
              id: "de-b2-01-l2-14",
              no: 14,
              text: "Lücke 14",
              answer: "a",
              explain:
                "Alışılmış düzeltme biçiminin işe yaramadığı söylendikten sonra (a) yerine ne konması gerektiğini veriyor: \"deshalb … statt die falsche noch einmal zu wiederholen\".",
            },
            {
              kind: "match",
              id: "de-b2-01-l2-15",
              no: 15,
              text: "Lücke 15",
              answer: "f",
              explain:
                "Boşluktan önce «Ganz auflösen lässt sich das Problem damit allerdings nicht» deniyor; (f) bundan çıkan ölçülü sonucu kuruyor: silmek değil, zayıflatmak. (d) ve (h) konuyla ilgili ama hiçbir boşluğun önündeki cümleye bağlanmıyor.",
            },
          ],
        },
        {
          id: "de-b2-01-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Kommentar und die Aufgaben 16 bis 21. Wählen Sie: a, b oder c.",
          promptTr: "Yorum yazısını ve 16–21. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "k1",
              genre: "Kommentar",
              genreTr: "Yorum yazısı",
              title: "Was verschwindet, wenn die Lokalzeitung verschwindet",
              body: `Wenn in einem Landkreis die letzte Lokalredaktion schließt, wird das meist als kultureller Verlust beschrieben. Diese Beschreibung ist freundlich gemeint und trifft die Sache nicht.

Untersuchungen aus mehreren Ländern zeigen etwas Nüchterneres: Dort, wo die lokale Berichterstattung endet, steigen die Kosten der Gemeinden für Kredite, weil niemand mehr die Haushalte prüft. Die Beteiligung an Kommunalwahlen sinkt. Und die Zahl der Kandidaten, die überhaupt antreten, geht zurück — wer nicht sichtbar wird, gewinnt auch nichts.

Man kann einwenden, dass die Lücke längst gefüllt sei. In fast jedem Ort gibt es heute eine Gruppe im Netz, in der schneller steht, wo gebaut wird und wo die Straße gesperrt ist. Das stimmt, und es ist mehr wert, als Zeitungsleute lange zugeben wollten. Nur ersetzt es das Entscheidende nicht: Niemand in diesen Gruppen sitzt drei Jahre lang in Ausschusssitzungen und liest Protokolle, an denen sonst nichts hängt.

Die Verlage haben ihren Anteil daran, und es hilft niemandem, das zu übergehen. Zwanzig Jahre lang wurden Redaktionen zusammengelegt, Außenbüros geschlossen und Mantelteile geteilt. Das Ergebnis war eine Zeitung, die überall gleich aussah — und dann wunderte man sich, dass niemand für sie zahlen wollte.

Was also tun? Die Rufe nach staatlicher Förderung sind verständlich, doch eine Presse, die vom Rathaus finanziert wird, kann das Rathaus schlecht kontrollieren. Genossenschaften, Stiftungen und Leserfinanzierung sind mühsamer, und sie sind bisher das Einzige, was in mehreren Städten tatsächlich funktioniert hat.

Vielleicht ist das die eigentliche Nachricht: Lokaljournalismus ist keine Frage der Romantik, sondern der Buchhaltung. Wer ihn will, muss ihn bezahlen — und zwar bevor er weg ist, nicht danach.`,
              gloss: [
                { de: "nüchtern", tr: "duygusuz, olgusal", en: "sober, matter-of-fact" },
                { de: "der Ausschuss", tr: "komisyon", en: "committee" },
                { de: "der Mantelteil", tr: "gazetelerin ortak basılan genel bölümü", en: "shared national section" },
                { de: "die Genossenschaft", tr: "kooperatif", en: "cooperative" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-01-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie bewertet der Autor die Rede vom \"kulturellen Verlust\"?",
              options: [
                "Als treffend, aber zu selten gebraucht.",
                "Als übertrieben dramatisch.",
                "Als wohlwollend, aber am Kern vorbei.",
              ],
              answer: 2,
              explain:
                "\"Diese Beschreibung ist freundlich gemeint und trifft die Sache nicht\" — iyi niyetli ama isabetsiz. Yazar bunu abartı değil, konuyu ıskalama olarak niteliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l3-17",
              no: 17,
              ref: "k1",
              text: "Welche Folge nennt der Text für die Gemeinden?",
              options: [
                "Ihre Kredite werden teurer.",
                "Sie müssen mehr Personal einstellen.",
                "Sie veröffentlichen ihre Haushalte nicht mehr.",
              ],
              answer: 0,
              explain:
                "\"steigen die Kosten der Gemeinden für Kredite, weil niemand mehr die Haushalte prüft\" — bütçenin yayımlanması değil, denetlenmesi kesiliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l3-18",
              no: 18,
              ref: "k1",
              text: "Wie geht der Autor mit dem Einwand um, Netzgruppen füllten die Lücke?",
              options: [
                "Er weist ihn als unbegründet zurück.",
                "Er gibt ihm teilweise recht.",
                "Er hält ihn für die beste Lösung.",
              ],
              answer: 1,
              explain:
                "\"Das stimmt, und es ist mehr wert, als Zeitungsleute lange zugeben wollten\" — kısmen haklı buluyor, ardından `Nur …` ile sınırını çiziyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l3-19",
              no: 19,
              ref: "k1",
              text: "Worin sieht der Autor die eigentliche Leistung von Lokalredaktionen?",
              options: [
                "In der Geschwindigkeit ihrer Meldungen.",
                "In der Nähe zu den Leserinnen und Lesern.",
                "In der ausdauernden Beobachtung von Gremien.",
              ],
              answer: 2,
              explain:
                "Ayırt edici şey hız değil: \"Niemand … sitzt drei Jahre lang in Ausschusssitzungen und liest Protokolle\". Hızda ağ grupları zaten üstün sayılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l3-20",
              no: 20,
              ref: "k1",
              text: "Welche Haltung nimmt der Autor gegenüber den Verlagen ein?",
              options: [
                "Er spricht sie von Verantwortung frei.",
                "Er hält ihnen eigene Fehler vor.",
                "Er lastet ihnen die gesamte Entwicklung an.",
              ],
              answer: 1,
              explain:
                "\"Die Verlage haben ihren Anteil daran\" — payları var, tamamı değil; ardından somut kararlar sıralanıyor. Ne aklama ne tek suçlu ilan etme.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l3-21",
              no: 21,
              ref: "k1",
              text: "Warum lehnt der Autor staatliche Förderung eher ab?",
              options: [
                "Weil sie in der Praxis zu spät käme.",
                "Weil sie die Kontrollfunktion beschädigen würde.",
                "Weil die Summen zu gering wären.",
              ],
              answer: 1,
              explain:
                "\"eine Presse, die vom Rathaus finanziert wird, kann das Rathaus schlecht kontrollieren\" — sorun miktar ya da zamanlama değil, bağımlılık.",
            },
          ],
        },
        {
          id: "de-b2-01-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Medienbildung ein eigenes Schulfach werden soll. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, medya eğitiminin ayrı bir ders olup olmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Herr Malik, Schulleiter",
              body: "Ein neues Fach klingt entschlossen, ändert aber wenig, solange keine Stunde gestrichen wird. Man müsste sagen, was dafür wegfällt. Diesen Satz sagt in der Debatte niemand.",
            },
            {
              key: "b",
              label: "b — Frau Reinhold, Informatikerin",
              body: "Ich unterrichte seit vier Jahren nebenbei Medienthemen und merke: Was fehlt, sind nicht Stunden, sondern Lehrkräfte, die selbst wissen, wie Empfehlungssysteme arbeiten. Ein Fach ohne Fachleute bleibt eine Überschrift.",
            },
            {
              key: "c",
              label: "c — Tobias Renn, Vater",
              body: "Meine Tochter hat in Deutsch gelernt, wie man eine Quelle prüft, in Geschichte, wie Propaganda funktioniert. Genau so gehört es hin: mitten in die Fächer, nicht daneben.",
            },
            {
              key: "d",
              label: "d — Frau Öztürk, Schülervertreterin",
              body: "Wir bekommen ständig Regeln erklärt, aber nie gezeigt, wie eine Redaktion arbeitet. Ich wäre für ein Fach, in dem wir selbst etwas veröffentlichen und dafür geradestehen müssen.",
            },
            {
              key: "e",
              label: "e — Dr. Sauer, Bildungsforscher",
              body: "Die Daten sind eindeutiger, als beide Lager behaupten: Wo Medienbildung als eigenes Fach eingeführt wurde, stiegen die Ergebnisse messbar — allerdings nur dort, wo die Lehrkräfte fortgebildet wurden.",
            },
            {
              key: "f",
              label: "f — Herr Lindner, Lehrer",
              body: "Ich halte die ganze Debatte für ein Ablenkungsmanöver. Solange in meiner Klasse das WLAN nicht trägt und die Hälfte der Geräte alt ist, ist ein neues Fach reine Symbolpolitik.",
            },
            {
              key: "g",
              label: "g — Frau Baumann, Journalistin",
              body: "Ich gehe seit Jahren in Schulen und sehe, wie schnell Jugendliche verstehen, sobald jemand aus der Praxis erzählt. Ob das ein Fach heißt oder ein Projekt, ist mir gleich.",
            },
            {
              key: "h",
              label: "h — Herr Kovac, Ausbilder",
              body: "In der Berufsschule merke ich, dass die Lücke nicht beim Erkennen von Falschmeldungen liegt, sondern beim Schreiben. Wer keine drei zusammenhängenden Sätze formuliert, prüft auch keine Quelle.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-01-l4-22",
              no: 22,
              text: "Ohne Fortbildung der Lehrkräfte bringt ein neues Fach keinen messbaren Vorteil.",
              answer: "e",
              explain:
                "Dr. Sauer sayıların net olduğunu söylüyor ama koşulu ekliyor: yalnız öğretmenlerin eğitildiği yerlerde sonuç yükselmiş. Frau Reinhold de öğretmen eksikliğinden söz ediyor, ama ölçüm ve veriden değil.",
            },
            {
              kind: "match",
              id: "de-b2-01-l4-23",
              no: 23,
              text: "Medienbildung gehört in die bestehenden Fächer, nicht in ein zusätzliches.",
              answer: "c",
              explain:
                "Tobias Renn kızının Almanca ve Tarih derslerinde öğrendiklerini örnek gösterip \"mitten in die Fächer, nicht daneben\" diyor.",
            },
            {
              kind: "match",
              id: "de-b2-01-l4-24",
              no: 24,
              text: "Wer ein neues Fach fordert, muss auch sagen, welches Fach dafür Stunden abgibt.",
              answer: "a",
              explain:
                "Herr Malik'in tek savı bu: \"Man müsste sagen, was dafür wegfällt\" — ve bunu kimsenin söylemediğini ekliyor.",
            },
            {
              kind: "match",
              id: "de-b2-01-l4-25",
              no: 25,
              text: "Der Streit über ein Fach lenkt von der fehlenden Ausstattung ab.",
              answer: "f",
              explain:
                "Herr Lindner tartışmayı \"Ablenkungsmanöver\" ve \"Symbolpolitik\" olarak niteliyor; sorunu WLAN ve eski cihazlarda görüyor.",
            },
            {
              kind: "match",
              id: "de-b2-01-l4-26",
              no: 26,
              text: "Jugendliche sollten selbst veröffentlichen und die Folgen tragen.",
              answer: "d",
              explain:
                "Frau Öztürk kural anlatımından değil, üretimden yana: \"in dem wir selbst etwas veröffentlichen und dafür geradestehen müssen\".",
            },
            {
              kind: "match",
              id: "de-b2-01-l4-27",
              no: 27,
              text: "Das eigentliche Defizit liegt beim Formulieren, nicht beim Erkennen.",
              answer: "h",
              explain:
                "Herr Kovac boşluğu yazma tarafına koyuyor: \"Wer keine drei zusammenhängenden Sätze formuliert, prüft auch keine Quelle\".",
            },
          ],
        },
        {
          id: "de-b2-01-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Betriebsvereinbarung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "İşyeri sözleşmesini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Betriebsvereinbarung",
              genreTr: "İşyeri sözleşmesi",
              title: "Betriebsvereinbarung über die Nutzung dienstlicher Geräte",
              body: `§ 1 Geltungsbereich
Diese Vereinbarung gilt für alle Beschäftigten, denen ein dienstliches Gerät überlassen wird, einschließlich befristet Beschäftigter und Auszubildender. Für Leiharbeitskräfte gilt sie entsprechend, soweit der Einsatz drei Monate überschreitet.

§ 2 Private Nutzung
Die private Nutzung dienstlicher Geräte ist in geringem Umfang gestattet, sofern dienstliche Belange nicht beeinträchtigt werden. Ein Rechtsanspruch auf private Nutzung entsteht dadurch nicht; die Erlaubnis kann mit einer Frist von vier Wochen widerrufen werden.

§ 3 Protokolldaten
Verbindungsdaten werden ausschließlich zur Sicherung des Netzbetriebs gespeichert und nach sieben Tagen gelöscht. Eine Auswertung personenbezogener Daten findet nicht statt. Bei einem konkreten Verdacht auf eine Straftat kann die Geschäftsführung eine Auswertung beantragen; sie bedarf der Zustimmung des Betriebsrats.

§ 4 Erreichbarkeit
Außerhalb der vereinbarten Arbeitszeit besteht keine Pflicht, dienstliche Nachrichten zu lesen oder zu beantworten. Anordnungen, die dem widersprechen, sind unwirksam. Von der Regelung ausgenommen ist der Bereitschaftsdienst nach gesonderter Vereinbarung.

§ 5 Verlust und Schaden
Der Verlust eines Geräts ist unverzüglich zu melden. Bei grober Fahrlässigkeit kann eine Beteiligung an den Kosten verlangt werden, höchstens jedoch in Höhe eines Bruttomonatsgehalts.`,
              gloss: [
                { de: "der Geltungsbereich", tr: "kapsam", en: "scope" },
                { de: "widerrufen", tr: "geri almak (izni)", en: "to revoke" },
                { de: "der Verdacht", tr: "şüphe", en: "suspicion" },
                { de: "grobe Fahrlässigkeit", tr: "ağır ihmal", en: "gross negligence" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-01-l5-28",
              no: 28,
              ref: "b1",
              text: "Welche Aussage zur privaten Nutzung trifft zu?",
              options: [
                "Sie ist ausdrücklich untersagt.",
                "Sie ist erlaubt, kann aber wieder zurückgenommen werden.",
                "Sie ist ein einmal erworbenes Recht der Beschäftigten.",
              ],
              answer: 1,
              explain:
                "§2 sınırlı bir izin veriyor ama \"Ein Rechtsanspruch … entsteht dadurch nicht\" ve dört haftalık süreyle geri alınabiliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l5-29",
              no: 29,
              ref: "b1",
              text: "Unter welcher Bedingung dürfen Verbindungsdaten ausgewertet werden?",
              options: [
                "Wenn die Geschäftsführung es für nötig hält.",
                "Wenn die Daten älter als sieben Tage sind.",
                "Bei konkretem Verdacht und mit Zustimmung des Betriebsrats.",
              ],
              answer: 2,
              explain:
                "«Bei einem konkreten Verdacht auf eine Straftat kann die Geschäftsführung eine Auswertung beantragen; sie bedarf der Zustimmung des Betriebsrats» — iki koşul birlikte aranıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-l5-30",
              no: 30,
              ref: "b1",
              text: "Was gilt für Nachrichten außerhalb der Arbeitszeit?",
              options: [
                "Antworten muss nur, wer Bereitschaftsdienst hat.",
                "Die Beschäftigten müssen einmal täglich in ihr Postfach sehen.",
                "Vorgesetzte dürfen eine Antwort innerhalb von 24 Stunden verlangen.",
              ],
              answer: 0,
              explain:
                "§4 yükümlülüğü kaldırıyor ve aksi yöndeki talimatları geçersiz sayıyor; tek istisna ayrıca sözleşmeye bağlanan nöbet hizmeti.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Alltagsgespräche, ein Interview, eine Besprechung und einen Vortrag. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde dört görev var: gündelik konuşmalar, bir söyleşi, bir toplantı ve bir sunum dinleyeceksin. Önce soruları oku.",
      tasks: [
        {
          id: "de-b2-01-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben. Sie hören jedes Gespräch einmal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Her konuşma için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch in der Redaktion",
              genreTr: "Yayın kurulunda konuşma",
              situation: "İki gazeteci bir haberin yayımlanıp yayımlanmayacağını konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Ines", text: "Wir haben die Geschichte, aber nur eine Quelle. Ich würde warten." },
                { speaker: "Jonas", text: "Wenn wir warten, hat sie morgen jemand anderes." },
                { speaker: "Ines", text: "Dann hat sie morgen jemand anderes. Eine falsche Meldung kostet uns mehr als ein verlorener Tag." },
                { speaker: "Jonas", text: "Gut. Ich versuche bis achtzehn Uhr eine zweite Bestätigung. Wenn sie kommt, gehen wir heute raus." },
              ],
            },
            {
              kind: "audio",
              id: "g2",
              genre: "Gespräch in der Bibliothek",
              genreTr: "Kütüphanede konuşma",
              situation: "Bir öğrenci kaynak taraması için yardım istiyor.",
              plays: 1,
              segments: [
                { speaker: "Student", text: "Ich finde zu meinem Thema nur Zeitungsartikel, keine Studien." },
                { speaker: "Bibliothekarin", text: "Dann suchen Sie vermutlich mit den Wörtern aus den Artikeln. Fachtexte benutzen andere Begriffe." },
                { speaker: "Student", text: "Und wie komme ich an die richtigen?" },
                { speaker: "Bibliothekarin", text: "Nehmen Sie einen guten Artikel, gehen Sie in seine Fußnoten und arbeiten Sie sich rückwärts. Das dauert eine Stunde und spart Ihnen drei Tage." },
              ],
            },
            {
              kind: "audio",
              id: "g3",
              genre: "Gespräch am Arbeitsplatz",
              genreTr: "İş yerinde konuşma",
              situation: "İki çalışan yeni bir bildirim düzenini konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Aylin", text: "Hast du gesehen, dass die Benachrichtigungen abends jetzt automatisch stumm sind?" },
                { speaker: "Pierre", text: "Ja, und ich finde es ehrlich gesagt unangenehm. Ich arbeite gern spät und will nicht, dass das aussieht wie Faulheit." },
                { speaker: "Aylin", text: "Es sieht nach gar nichts aus. Die Nachricht kommt an, sie klingelt nur nicht." },
                { speaker: "Pierre", text: "Das wusste ich nicht. Dann nehme ich die Hälfte meiner Beschwerde zurück." },
              ],
            },
            {
              kind: "audio",
              id: "g4",
              genre: "Gespräch beim Kundenservice",
              genreTr: "Müşteri hizmetlerinde konuşma",
              situation: "Bir abone aboneliğini durdurmak istiyor.",
              plays: 1,
              segments: [
                { speaker: "Kundin", text: "Ich möchte mein Abo kündigen, zum Ende des Monats." },
                { speaker: "Mitarbeiter", text: "Zum Monatsende geht leider nicht mehr, die Frist war vorgestern. Wir können zum Quartalsende kündigen." },
                { speaker: "Kundin", text: "Und wenn ich pausiere?" },
                { speaker: "Mitarbeiter", text: "Pausieren können Sie sofort, bis zu drei Monate. Die Zeit wird hinten angehängt, gekündigt ist damit aber nichts." },
              ],
            },
            {
              kind: "audio",
              id: "g5",
              genre: "Gespräch nach einer Veranstaltung",
              genreTr: "Etkinlik sonrası konuşma",
              situation: "İki katılımcı bir paneli değerlendiriyor.",
              plays: 1,
              segments: [
                { speaker: "Halid", text: "Ich fand die Runde zäh. Vier Leute, die sich in allem einig waren." },
                { speaker: "Marlene", text: "Mir ging es umgekehrt. Gerade weil niemand streiten musste, kamen die Details vor." },
                { speaker: "Halid", text: "Details ja, aber keine Prüfung. Wenn niemand widerspricht, klingt jede Zahl richtig." },
                { speaker: "Marlene", text: "Da hast du recht. Eine Gegenstimme hätte der Sache gutgetan." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-01-h1-1",
              no: 1,
              ref: "g1",
              text: "Ines hält den Zeitvorsprung für wichtiger als die Absicherung.",
              answer: false,
              explain:
                "Tam tersini savunuyor: \"Eine falsche Meldung kostet uns mehr als ein verlorener Tag\". Hız kaygısını dile getiren Jonas.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h1-2",
              no: 2,
              ref: "g1",
              text: "Worauf einigen sich die beiden?",
              options: [
                "Die Geschichte wird ohne weitere Prüfung veröffentlicht.",
                "Bis zu einer Frist wird eine zweite Quelle gesucht.",
                "Die Geschichte wird ganz aufgegeben.",
              ],
              answer: 1,
              explain:
                "Jonas 18.00'e kadar ikinci bir doğrulama arayacak; gelirse bugün yayımlanacak. Ne koşulsuz yayın ne de vazgeçme.",
            },
            {
              kind: "bool",
              id: "de-b2-01-h1-3",
              no: 3,
              ref: "g2",
              text: "Die Bibliothekarin führt das Problem auf die verwendeten Suchbegriffe zurück.",
              answer: true,
              explain:
                "\"Dann suchen Sie vermutlich mit den Wörtern aus den Artikeln. Fachtexte benutzen andere Begriffe\" — sorunun kaynağı arama sözcükleri.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h1-4",
              no: 4,
              ref: "g2",
              text: "Was empfiehlt sie konkret?",
              options: [
                "Eine andere Datenbank mit Fachzeitschriften zu benutzen.",
                "Eine Beratung zu buchen.",
                "Über die Fußnoten eines Artikels rückwärts zu suchen.",
              ],
              answer: 2,
              explain:
                "«Nehmen Sie einen guten Artikel, gehen Sie in seine Fußnoten und arbeiten Sie sich rückwärts» — bir saat sürüp üç gün kazandırdığını da ekliyor.",
            },
            {
              kind: "bool",
              id: "de-b2-01-h1-5",
              no: 5,
              ref: "g3",
              text: "Pierre ändert seine Meinung teilweise.",
              answer: true,
              explain:
                "Bildirimin geldiğini ama ses çıkarmadığını öğrenince \"Dann nehme ich die Hälfte meiner Beschwerde zurück\" diyor — kısmi geri adım.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h1-6",
              no: 6,
              ref: "g3",
              text: "Was befürchtet Pierre zunächst?",
              options: [
                "Dass sein spätes Arbeiten falsch verstanden wird.",
                "Dass er wichtige Nachrichten gar nicht bekommt.",
                "Dass er abends nicht mehr erreichbar sein darf.",
              ],
              answer: 0,
              explain:
                "\"will nicht, dass das aussieht wie Faulheit\" — korkusu görünürlük ve algı. Mesajın ulaşmadığını sanmıyor, sesin kesilmesinden rahatsız.",
            },
            {
              kind: "bool",
              id: "de-b2-01-h1-7",
              no: 7,
              ref: "g4",
              text: "Die Kundin kann wie gewünscht zum Monatsende kündigen.",
              answer: false,
              explain: "«Zum Monatsende geht leider nicht mehr, die Frist war vorgestern» — süre iki gün önce dolmuş; mümkün olan en yakın fesih çeyrek sonu.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h1-8",
              no: 8,
              ref: "g4",
              text: "Was bewirkt eine Pause?",
              options: [
                "Sie beendet den Vertrag vorzeitig und ohne weitere Frist.",
                "Sie verschiebt die Laufzeit nach hinten.",
                "Sie verkürzt die Kündigungsfrist.",
              ],
              answer: 1,
              explain:
                "\"Die Zeit wird hinten angehängt, gekündigt ist damit aber nichts\" — süre uzuyor, sözleşme sona ermiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-01-h1-9",
              no: 9,
              ref: "g5",
              text: "Marlene stimmt Halid am Ende in einem Punkt zu.",
              answer: true,
              explain:
                "Baştan itiraz ediyor ama sonunda \"Da hast du recht. Eine Gegenstimme hätte der Sache gutgetan\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h1-10",
              no: 10,
              ref: "g5",
              text: "Was kritisiert Halid an der Veranstaltung?",
              options: [
                "Die Beiträge waren zu detailliert.",
                "Die eingeladenen Fachleute waren fachlich nicht qualifiziert.",
                "Die Aussagen wurden von niemandem überprüft.",
              ],
              answer: 2,
              explain:
                "\"Wenn niemand widerspricht, klingt jede Zahl richtig\" — eleştirdiği şey karşı sesin ve denetimin yokluğu, ayrıntının fazlalığı değil.",
            },
          ],
        },
        {
          id: "de-b2-01-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Interview. Wählen Sie zu den Aufgaben 11 bis 16: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir söyleşi dinleyeceksin. 11–16. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir doğrulama biriminin yöneticisiyle söyleşi.",
              plays: 1,
              segments: [
                { speaker: "Moderatorin", text: "Frau Steinbach, Sie leiten seit sechs Jahren eine Faktenprüfung. Was hat sich in dieser Zeit am stärksten verändert?" },
                {
                  speaker: "Frau Steinbach",
                  text: "Am Anfang ging es fast immer um erfundene Behauptungen. Heute ist der größere Teil unserer Arbeit anders gelagert: Die Zahlen stimmen, aber sie stehen in einem Zusammenhang, in den sie nicht gehören.",
                },
                { speaker: "Moderatorin", text: "Können Sie ein Beispiel geben?" },
                {
                  speaker: "Frau Steinbach",
                  text: "Ein Diagramm über Kriminalität, das bei einem besonders niedrigen Jahr beginnt. Nichts daran ist gefälscht. Trotzdem führt es zu einem falschen Bild, und genau das ist schwerer zu widerlegen als eine erfundene Zahl.",
                },
                { speaker: "Moderatorin", text: "Wie schnell müssen Sie sein?" },
                {
                  speaker: "Frau Steinbach",
                  text: "Wir haben die Erfahrung gemacht, dass es nicht auf Minuten ankommt. Wer nach zwei Stunden veröffentlicht und dabei einen Fehler macht, verliert mehr, als er durch das Tempo gewinnt. Wir nehmen uns lieber einen halben Tag.",
                },
                { speaker: "Moderatorin", text: "Erreichen Ihre Korrekturen die Menschen, die die falsche Meldung gesehen haben?" },
                {
                  speaker: "Frau Steinbach",
                  text: "Ehrlich gesagt: selten. Deshalb arbeiten wir seit zwei Jahren anders. Wir schreiben weniger Widerlegungen und mehr Erklärstücke, die vor der nächsten Welle da sind. Das nennt sich Vorwegnahme, und es wirkt deutlich besser.",
                },
                { speaker: "Moderatorin", text: "Was wünschen Sie sich von den Plattformen?" },
                {
                  speaker: "Frau Steinbach",
                  text: "Weniger Löschen, mehr Kennzeichnen. Wenn ein Beitrag verschwindet, entsteht sofort die Geschichte von der Zensur. Ein Hinweis, der stehen bleibt, ist unbequemer für uns, aber wirksamer.",
                },
                { speaker: "Moderatorin", text: "Und von den Leserinnen und Lesern?" },
                {
                  speaker: "Frau Steinbach",
                  text: "Eine einzige Gewohnheit: vor dem Teilen kurz nach dem Datum sehen. Ein großer Teil dessen, was uns erreicht, ist nicht erfunden, sondern alt.",
                },
              ],
              gloss: [
                { de: "widerlegen", tr: "çürütmek", en: "to refute" },
                { de: "die Vorwegnahme", tr: "önceden karşılama, öncelemek", en: "prebunking, anticipation" },
                { de: "kennzeichnen", tr: "işaretlemek, etiketlemek", en: "to label" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-01-h2-11",
              no: 11,
              ref: "i1",
              text: "Was hat sich laut Frau Steinbach am stärksten verändert?",
              options: [
                "Falsche Angaben werden seltener, irreführende Zusammenhänge häufiger.",
                "Die Zahl der Falschmeldungen ist insgesamt stark gestiegen.",
                "Die Behauptungen sind technisch aufwendiger und schwerer zu prüfen geworden.",
              ],
              answer: 0,
              explain:
                "\"Die Zahlen stimmen, aber sie stehen in einem Zusammenhang, in den sie nicht gehören\" — kayma uydurmadan yanıltıcı bağlama.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h2-12",
              no: 12,
              ref: "i1",
              text: "Warum ist das genannte Diagramm problematisch?",
              options: [
                "Die Zahlen darin sind gefälscht.",
                "Es stammt aus einer unbekannten und nicht überprüfbaren Quelle.",
                "Der gewählte Anfangszeitpunkt erzeugt ein falsches Bild.",
              ],
              answer: 2,
              explain:
                "Grafik özellikle düşük bir yıldan başlıyor: \"Nichts daran ist gefälscht. Trotzdem führt es zu einem falschen Bild\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h2-13",
              no: 13,
              ref: "i1",
              text: "Wie steht sie zum Tempo der Veröffentlichung?",
              options: [
                "Geschwindigkeit ist entscheidend für die Wirkung einer Korrektur.",
                "Sorgfalt ist wichtiger als ein Vorsprung von Stunden.",
                "Beides lässt sich problemlos verbinden.",
              ],
              answer: 1,
              explain:
                "\"Wer nach zwei Stunden veröffentlicht und dabei einen Fehler macht, verliert mehr, als er durch das Tempo gewinnt\" — yarım gün beklemeyi tercih ediyorlar.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h2-14",
              no: 14,
              ref: "i1",
              text: "Wie hat die Redaktion auf die geringe Reichweite von Korrekturen reagiert?",
              options: [
                "Sie veröffentlicht Erklärungen, bevor ein Thema hochkommt.",
                "Sie veröffentlicht Korrekturen zusätzlich als Video.",
                "Sie hat die Zahl der veröffentlichten Korrekturen deutlich erhöht.",
              ],
              answer: 0,
              explain:
                "\"weniger Widerlegungen und mehr Erklärstücke, die vor der nächsten Welle da sind\" — sonradan düzeltmek yerine önden açıklamak.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h2-15",
              no: 15,
              ref: "i1",
              text: "Was erwartet sie von den Plattformen?",
              options: [
                "Konsequentes Löschen problematischer Beiträge.",
                "Beiträge stehen zu lassen und sie zu kennzeichnen.",
                "Eine engere Zusammenarbeit mit den Behörden.",
              ],
              answer: 1,
              explain:
                "\"Weniger Löschen, mehr Kennzeichnen\" — silme sansür anlatısı üretiyor; kalan bir uyarı kendileri için daha rahatsız ama daha etkili.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h2-16",
              no: 16,
              ref: "i1",
              text: "Welche Gewohnheit empfiehlt sie den Leserinnen und Lesern?",
              options: [
                "Nur Beiträge bekannter Medien zu teilen.",
                "Beiträge grundsätzlich nicht weiterzuleiten.",
                "Vor dem Teilen auf das Datum zu achten.",
              ],
              answer: 2,
              explain:
                "Tek bir alışkanlık öneriyor, çünkü gelen içeriğin büyük bölümü \"nicht erfunden, sondern alt\".",
            },
          ],
        },
        {
          id: "de-b2-01-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Sie hören eine Besprechung mit drei Personen. Wer sagt das? Wählen Sie zu den Aufgaben 17 bis 22. Sie hören den Text zweimal.",
          promptTr:
            "Üç kişilik bir toplantı dinleyeceksin. Bunu kim söylüyor? 17–22. maddeler için seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Besprechung",
              genreTr: "Toplantı",
              situation: "Bir kurumda iç iletişim aracı tartışılıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Hübner",
                  text: "Ich fasse zusammen: Wir haben drei Kanäle für dieselbe Information, und niemand weiß mehr, welcher gilt. Das ist der eigentliche Punkt, nicht die Software.",
                },
                {
                  speaker: "Herr Draghi",
                  text: "Aus der Werkstatt gesehen ist es einfacher: Die Kollegen dort haben keinen Rechner. Was nicht auf dem Aushang steht, kommt bei ihnen nicht an — egal, wie gut das Programm ist.",
                },
                {
                  speaker: "Frau Yilmaz",
                  text: "Ich würde die Sache anders anfassen. Bevor wir wieder ein Werkzeug einführen, sollten wir einmal messen, wie viele Nachrichten überhaupt gelesen werden. Wir raten seit Jahren.",
                },
                {
                  speaker: "Frau Hübner",
                  text: "Messen ist gut, kostet aber Zeit, die wir vor dem Umbau nicht haben.",
                },
                {
                  speaker: "Herr Draghi",
                  text: "Dann bitte wenigstens eine Regel: Alles, was für die Werkstatt gilt, wird zusätzlich ausgedruckt. Das kostet niemanden etwas.",
                },
                {
                  speaker: "Frau Yilmaz",
                  text: "Damit habe ich kein Problem, solange es eine Übergangslösung bleibt. Ein Aushang ist keine Kommunikationsstrategie.",
                },
                {
                  speaker: "Frau Hübner",
                  text: "Einverstanden. Ich schlage vor, wir entscheiden über den Kanal erst nach der Sommerpause und legen bis dahin nur die Regel fest.",
                },
                {
                  speaker: "Herr Draghi",
                  text: "Und ich hätte gern, dass jemand einmal in die Halle geht und fragt. Von hier oben sieht das alles sehr geordnet aus.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-01-h3-17",
              no: 17,
              ref: "b1",
              text: "Das Problem liegt nicht am Programm, sondern an der Zahl der Kanäle.",
              options: ["Frau Hübner.", "Herr Draghi.", "Frau Yilmaz."],
              answer: 0,
              explain: "Açılış özetini Frau Hübner yapıyor: \"Das ist der eigentliche Punkt, nicht die Software\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h3-18",
              no: 18,
              ref: "b1",
              text: "Ein Teil der Belegschaft erreicht digitale Nachrichten grundsätzlich nicht.",
              options: ["Frau Hübner.", "Herr Draghi.", "Frau Yilmaz."],
              answer: 1,
              explain:
                "Herr Draghi atölyeyi hatırlatıyor: bilgisayarı olmayan çalışanlara \"Was nicht auf dem Aushang steht, kommt bei ihnen nicht an\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h3-19",
              no: 19,
              ref: "b1",
              text: "Vor einer neuen Lösung sollte die Nutzung erst gemessen werden.",
              options: ["Frau Hübner.", "Herr Draghi.", "Frau Yilmaz."],
              answer: 2,
              explain: "Frau Yilmaz: \"sollten wir einmal messen, wie viele Nachrichten überhaupt gelesen werden. Wir raten seit Jahren\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h3-20",
              no: 20,
              ref: "b1",
              text: "Ein Aushang darf nur eine Übergangslösung sein.",
              options: ["Frau Hübner.", "Herr Draghi.", "Frau Yilmaz."],
              answer: 2,
              explain:
                "Kuralı kabul eden Frau Yilmaz, ama koşullu: \"solange es eine Übergangslösung bleibt. Ein Aushang ist keine Kommunikationsstrategie\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h3-21",
              no: 21,
              ref: "b1",
              text: "Die Entscheidung über den Kanal soll verschoben werden.",
              options: ["Frau Hübner.", "Herr Draghi.", "Frau Yilmaz."],
              answer: 0,
              explain: "Frau Hübner öneriyor: kanal kararı yaz tatilinden sonraya, şimdilik yalnız kural.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h3-22",
              no: 22,
              ref: "b1",
              text: "Jemand sollte die Betroffenen vor Ort selbst befragen.",
              options: ["Frau Hübner.", "Herr Draghi.", "Frau Yilmaz."],
              answer: 1,
              explain:
                "Herr Draghi'nin son isteği: \"jemand einmal in die Halle geht und fragt. Von hier oben sieht das alles sehr geordnet aus\".",
            },
          ],
        },
        {
          id: "de-b2-01-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören einen Vortrag. Wählen Sie zu den Aufgaben 23 bis 30: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir sunum dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              title: "Aufmerksamkeit und Erinnerung beim Lesen",
              situation: "Bir üniversite konferansında okuma üzerine sunum.",
              plays: 1,
              segments: [
                {
                  text: "Vielen Dank für die Einladung. Ich spreche heute über eine Frage, die harmloser klingt, als sie ist: Was passiert eigentlich, wenn wir am Bildschirm lesen statt auf Papier?",
                },
                {
                  text: "Vorweg eine Einschränkung, die in den Schlagzeilen meist fehlt. Für kurze Texte lässt sich kein Unterschied nachweisen. Wer eine Nachricht von zweihundert Wörtern liest, behält sie am Bildschirm ebenso gut wie gedruckt. Der Unterschied entsteht erst bei längeren und schwierigeren Texten.",
                },
                {
                  text: "Dort allerdings ist er stabil. In einer Zusammenfassung von vierundfünfzig Einzelstudien schnitten Leserinnen und Leser am Bildschirm bei Verständnisfragen schlechter ab. Die Größe des Effekts war moderat, aber sie hat über zwei Jahrzehnte nicht abgenommen. Die Vermutung, das sei eine Gewöhnungsfrage der älteren Generation, hat sich damit nicht bestätigt.",
                },
                {
                  text: "Interessanter als das Ob ist das Warum. Drei Erklärungen werden diskutiert. Die erste betrifft den Körper: Ein Buch hat einen festen Ort für jede Information. Man erinnert sich, dass etwas oben links auf einer rechten Seite stand. Ein Bildschirmtext hat diese Landkarte nicht.",
                },
                {
                  text: "Die zweite Erklärung ist die interessantere. Sie betrifft nicht das Medium, sondern die Erwartung. Wir haben gelernt, dass Bildschirme schnelle, kurze Inhalte liefern, und bringen diese Haltung mit. In Versuchen, in denen Studierende vor dem Lesen gebeten wurden, den Text als Prüfungsstoff zu behandeln, verschwand der Unterschied fast vollständig.",
                },
                {
                  text: "Die dritte Erklärung ist die banalste und wahrscheinlich die stärkste: Unterbrechungen. Auf dem Gerät, auf dem wir lesen, befindet sich alles andere auch.",
                },
                {
                  text: "Was folgt daraus für die Praxis? Sicher nicht die Rückkehr zum Papier. Die praktischen Empfehlungen sind unspektakulär: längere Texte im Vollbild lesen, Benachrichtigungen aussetzen und sich nach jedem Abschnitt in einem Satz selbst sagen, was dort stand.",
                },
                {
                  text: "Ein letzter Punkt, der mir wichtig ist. Der Effekt ist kein Argument gegen digitale Bildung. Er ist ein Argument dafür, das Lesen am Bildschirm zu unterrichten, statt vorauszusetzen, dass es sich von selbst versteht.",
                },
              ],
              gloss: [
                { de: "die Einschränkung", tr: "kayıt, sınırlama", en: "qualification, caveat" },
                { de: "abschneiden", tr: "sonuç almak", en: "to perform" },
                { de: "voraussetzen", tr: "önceden varsaymak", en: "to presuppose" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-01-h4-23",
              no: 23,
              ref: "v1",
              text: "Welche Einschränkung nennt der Vortragende zu Beginn?",
              options: [
                "Die Forschung ist noch sehr jung.",
                "Bei kurzen Texten gibt es keinen Unterschied.",
                "Die Ergebnisse gelten nur für Studierende.",
              ],
              answer: 1,
              explain:
                "\"Für kurze Texte lässt sich kein Unterschied nachweisen\" — fark ancak uzun ve zor metinlerde ortaya çıkıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-24",
              no: 24,
              ref: "v1",
              text: "Was sagt die Zusammenfassung der Einzelstudien aus?",
              options: [
                "Der Effekt ist über zwei Jahrzehnte gleich geblieben.",
                "Der Effekt hat sich mit der Zeit deutlich verkleinert.",
                "Der Effekt tritt nur bei älteren Menschen auf.",
              ],
              answer: 0,
              explain:
                "Etki orta büyüklükte ama \"über zwei Jahrzehnte nicht abgenommen\" — bu, alışkanlık açıklamasını çürütüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-25",
              no: 25,
              ref: "v1",
              text: "Was besagt die erste Erklärung?",
              options: [
                "Bildschirme ermüden die Augen schneller.",
                "Gedruckte Texte sind meist besser gegliedert.",
                "Auf Papier hat jede Information einen festen Ort.",
              ],
              answer: 2,
              explain:
                "Kitapta bilgi mekânsal olarak yerleşiyor (\"oben links auf einer rechten Seite\"); ekran metninde bu harita yok.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-26",
              no: 26,
              ref: "v1",
              text: "Warum hält er die zweite Erklärung für interessanter?",
              options: [
                "Weil sie sich auf die Haltung der Lesenden bezieht.",
                "Weil sie durch die meisten Studien belegt ist.",
                "Weil sie den Effekt vollständig erklärt.",
              ],
              answer: 0,
              explain:
                "\"Sie betrifft nicht das Medium, sondern die Erwartung\" — yani değiştirilebilir bir tutum. Bu yüzden ilginç.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-27",
              no: 27,
              ref: "v1",
              text: "Was geschah in den Versuchen mit veränderter Erwartung?",
              options: [
                "Der Unterschied verschwand nahezu.",
                "Der Unterschied kehrte sich um.",
                "Der Unterschied blieb unverändert.",
              ],
              answer: 0,
              explain:
                "Metni sınav malzemesi gibi ele almaları istendiğinde \"verschwand der Unterschied fast vollständig\".",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-28",
              no: 28,
              ref: "v1",
              text: "Wie bewertet er die dritte Erklärung?",
              options: [
                "Als die am wenigsten überzeugende.",
                "Als die einfachste, aber vermutlich wirksamste.",
                "Als eine, die weiterer Forschung bedarf.",
              ],
              answer: 1,
              explain:
                "\"die banalste und wahrscheinlich die stärkste\" — sıradanlığı gücünü azaltmıyor; okunan cihazda her şey birden mevcut.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-29",
              no: 29,
              ref: "v1",
              text: "Welche Empfehlung gibt er?",
              options: [
                "Lange Texte grundsätzlich auszudrucken.",
                "Nach jedem Abschnitt kurz zusammenzufassen.",
                "Digitale Texte in kürzere Einheiten zu teilen.",
              ],
              answer: 1,
              explain:
                "«sich nach jedem Abschnitt in einem Satz selbst sagen, was dort stand» — üç öneriden biri tam bu. Kâğıda dönüşü («Sicher nicht die Rückkehr zum Papier») açıkça reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-01-h4-30",
              no: 30,
              ref: "v1",
              text: "Welchen Schluss zieht er für die Bildung?",
              options: [
                "Digitales Lesen sollte in der Schule seltener eingesetzt werden.",
                "Der Effekt spricht gegen digitale Bildung.",
                "Bildschirmlesen muss unterrichtet werden.",
              ],
              answer: 2,
              explain:
                "«Er ist ein Argument dafür, das Lesen am Bildschirm zu unterrichten, statt vorauszusetzen, dass es sich von selbst versteht» — bulgu dijital eğitime karşı değil.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 75,
      instruction: "Dieser Teil hat zwei Aufgaben: eine Meinungsäußerung und eine halb formelle Mitteilung.",
      instructionTr: "Bu bölümde iki görev var: bir görüş yazısı ve yarı resmî bir ileti.",
      tasks: [
        {
          id: "de-b2-01-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Unter einem Zeitungsartikel mit dem Titel \"Nachrichten ohne Redaktion — reicht das?\" können Leserinnen und Leser kommentieren. Schreiben Sie einen Beitrag (circa 150 Wörter).",
          promptTr:
            "\"Yayın kurulu olmadan haber — yeter mi?\" başlıklı bir gazete yazısının altına okurlar yorum yazabiliyor. Bir yorum yaz (yaklaşık 150 kelime).",
          items: [],
          rubric: {
            minWords: 150,
            points: [
              { de: "Nehmen Sie Stellung zur Frage des Artikels.", tr: "Yazının sorusuna karşı tutumunu belirt." },
              { de: "Begründen Sie Ihre Position mit mindestens zwei Argumenten.", tr: "Tutumunu en az iki savla gerekçelendir." },
              { de: "Gehen Sie auf eine Gegenposition ein.", tr: "Karşı bir görüşü ele al." },
              { de: "Machen Sie einen Vorschlag oder ziehen Sie ein Fazit.", tr: "Bir öneride bulun ya da sonuca bağla." },
            ],
            sample: `Die Frage ist berechtigt, die Antwort fällt für mich aber eindeutig aus: Nachrichten ohne Redaktion reichen nicht, so nützlich einzelne Konten auch sind.

Zum einen entsteht Verlässlichkeit nicht durch Reichweite, sondern durch ein Verfahren. In einer Redaktion liest jemand gegen, der nicht in die Geschichte verliebt ist. Fehlt diese zweite Instanz, veröffentlicht am Ende jeder das, was er ohnehin für richtig hält.

Zum anderen wird die unspektakuläre Arbeit sonst niemand übernehmen. Wer verfolgt drei Jahre lang einen Ausschuss, ohne dass daraus eine gute Geschichte wird? Genau daran hängt aber die Kontrolle vor Ort.

Nun wird eingewendet, dass unabhängige Autorinnen schneller und näher an den Menschen seien. Das trifft oft zu, und die Verlage haben sich diesen Vorwurf selbst eingehandelt.

Trotzdem halte ich das für kein Entweder-oder. Sinnvoller wäre, unabhängige Angebote an redaktionelle Standards zu binden und sie dafür zu finanzieren — etwa über Stiftungen. Wer Kontrolle will, muss ihre Bedingungen bezahlen.`,
            criteria: [
              "Dört içerik noktası da var mı? B2'de karşı görüşün ele alınmaması metni doğrudan düşürür.",
              "İki sav gerçekten farklı mı, yoksa aynı düşüncenin iki söylenişi mi?",
              "Karşı görüş yalnız anılmakla kalmayıp yanıtlanmış mı?",
              "Metin bağlaçlarla kurulmuş mu? (zum einen … zum anderen … nun wird eingewendet … trotzdem)",
              "Sözcük seçimi B2 düzeyinde mi (soyut adlar, kalıplaşmış bağlayıcılar) yoksa günlük dilde mi kalıyor?",
              "Yaklaşık 150 kelime var mı ve paragraflara ayrılmış mı?",
            ],
          },
        },
        {
          id: "de-b2-01-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben an einer Fortbildung Ihres Betriebs zum Thema \"Digitale Kommunikation\" teilgenommen. Die Personalabteilung bittet um eine Rückmeldung. Schreiben Sie an Frau Wendt (circa 100 Wörter).",
          promptTr:
            "İşyerinde \"Dijital iletişim\" konulu bir eğitime katıldın. İnsan kaynakları geri bildirim istiyor. Frau Wendt'e yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nennen Sie, was Sie nützlich fanden.", tr: "Neyi yararlı bulduğunu söyle." },
              { de: "Üben Sie höflich Kritik an einem Punkt.", tr: "Bir noktayı kibarca eleştir." },
              { de: "Machen Sie einen konkreten Verbesserungsvorschlag.", tr: "Somut bir iyileştirme öner." },
              { de: "Fragen Sie nach einer Folgeveranstaltung.", tr: "Devam eğitimi olup olmayacağını sor." },
            ],
            sample: `Sehr geehrte Frau Wendt,

vielen Dank für die Möglichkeit, an der Fortbildung teilzunehmen. Besonders hilfreich fand ich den Teil zu den Betreffzeilen; die Beispiele aus unserem eigenen Postfach haben den Unterschied sofort deutlich gemacht.

Weniger überzeugt hat mich der zweite Vormittag. Die Übungen waren für eine Gruppe von zwanzig Personen zu umfangreich, sodass wir keine davon zu Ende gebracht haben.

Für die nächste Runde würde ich vorschlagen, die Gruppe zu teilen oder die Zahl der Übungen zu halbieren. Beides ließe sich ohne zusätzlichen Aufwand umsetzen.

Ist bereits geplant, eine Folgeveranstaltung anzubieten? Ich würde gern teilnehmen.

Mit freundlichen Grüßen
Deniz Aktas`,
            criteria: [
              "Dört içerik noktası da var mı?",
              "Eleştiri kibar bir dille ve somut bir gerekçeyle mi yapılmış?",
              "Öneri uygulanabilir mi, yoksa genel bir dilek mi?",
              "Yarı resmî üslup korunmuş mu? (Sehr geehrte Frau … / Konjunktiv II ile yumuşatma: würde ich vorschlagen, ließe sich)",
              "Yaklaşık 100 kelime var mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag mit Nachfragen und eine Diskussion.",
      instructionTr: "Bu bölümde iki görev var: sorularla birlikte bir sunum ve bir tartışma.",
      tasks: [
        {
          id: "de-b2-01-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wie informieren wir uns in zehn Jahren?\". Gliedern Sie ihn: Einleitung — heutige Lage — zwei mögliche Entwicklungen — Bewertung — Schluss. Beantworten Sie anschließend zwei Nachfragen.",
          promptTr:
            "\"On yıl sonra nasıl haber alacağız?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şöyle böl: giriş — bugünkü durum — iki olası gelişme — değerlendirme — sonuç. Ardından iki soruyu cevapla.",
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "den Vortrag klar gliedern", tr: "Sunumu açıkça bölümlemek" },
              { de: "zwei Entwicklungen unterscheiden und belegen", tr: "İki gelişmeyi ayırmak ve dayanak vermek" },
              { de: "eine begründete Bewertung abgeben", tr: "Gerekçeli bir değerlendirme yapmak" },
              { de: "auf Nachfragen sachlich antworten", tr: "Sorulara konu üzerinden cevap vermek" },
            ],
            sample:
              "Ich möchte in den nächsten Minuten der Frage nachgehen, wie wir uns in zehn Jahren informieren werden. Dazu schildere ich zunächst die heutige Lage, stelle dann zwei mögliche Entwicklungen gegenüber und komme abschließend zu einer Einschätzung. Heute liegt die Auswahl weitgehend bei Programmen, die auf Verweildauer optimiert sind; die Redaktion entscheidet nicht mehr, was zuerst erscheint. Denkbar ist erstens eine weitere Verschiebung hin zu automatisch erzeugten Zusammenfassungen: bequem, aber schwer überprüfbar, weil die Quelle unsichtbar wird. Denkbar ist zweitens eine Gegenbewegung — kleinere, bezahlte Angebote mit klarer Herkunft, wie wir sie bei Genossenschaftsmodellen bereits beobachten. Ich halte die zweite Entwicklung nicht für wahrscheinlicher, aber für die belastbarere, und zwar aus einem einfachen Grund: Vertrauen lässt sich nicht automatisieren. Mein Fazit lautet deshalb, dass nicht die Technik entscheidet, sondern die Frage, wofür Menschen bereit sind zu zahlen.",
            criteria: [
              "Sunumun bölümleri işitiliyor mu? (zunächst … dann … abschließend)",
              "İki gelişme birbirinden gerçekten ayrılıyor mu?",
              "Değerlendirme bir gerekçeye dayanıyor mu?",
              "Sorular kaçamaksız ve konu üzerinden cevaplanıyor mu?",
              "Söz dağarcığı B2 düzeyinde mi? (Einschätzung, belastbar, Verweildauer gibi)",
              "Süre dört dakikaya yakın mı?",
            ],
          },
        },
        {
          id: "de-b2-01-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Diskutieren Sie: \"Sollen Plattformen verpflichtet werden, die Herkunft von Bildern und Videos zu kennzeichnen?\" Vertreten Sie eine Position, gehen Sie auf Ihr Gegenüber ein und suchen Sie am Ende einen gemeinsamen Nenner.",
          promptTr:
            "Tartış: \"Platformlar görüntü ve videoların kaynağını işaretlemekle yükümlü kılınmalı mı?\" Bir tutum al, karşındakine karşılık ver ve sonunda ortak bir zemin ara.",
          prepSeconds: 90,
          exchange: [
            { who: "partner", de: "Unsere Frage lautet: Sollen Plattformen verpflichtet werden, die Herkunft von Bildern und Videos zu kennzeichnen? Ich beginne: Ich halte eine solche Pflicht für überfällig. Wie sehen Sie das?", tr: "Sorumuz şu: Platformlar görüntü ve videoların kaynağını işaretlemekle yükümlü kılınmalı mı? Ben başlıyorum: Bence böyle bir yükümlülük çoktan gerekliydi. Sen ne düşünüyorsun?" },
            { who: "you", hint: "Tutumunu açıkça belirt ve bir savla gerekçelendir.", expect: "bir tutum almak ve onu bir savla gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "Ihr Argument leuchtet mir ein, allerdings sehe ich ein praktisches Problem: Wenn wir auf technisch perfekte Lösungen warten, kommt die Regel nie zustande.", tr: "Savın bana mantıklı geldi, ama pratik bir sorun görüyorum: Teknik olarak kusursuz çözümleri beklersek kural hiç çıkmaz." },
            { who: "you", hint: "Bu itirazı ele al — geçiştirme, karşılık ver.", expect: "karşı savı gerçekten ele almak ve kendi konumunu düzeltmek ya da savunmak", seconds: 50 },
            { who: "partner", de: "Das ist ein fairer Punkt. Trotzdem bleibt die Frage der Verteilung: Große Anbieter können so etwas umsetzen, ein kleines Forum nicht.", tr: "Bu adil bir nokta. Yine de dağılım sorusu duruyor: Büyük sağlayıcılar bunu uygulayabilir, küçük bir forum uygulayamaz." },
            { who: "you", hint: "Bir uzlaşma öner.", expect: "koşullu bir uzlaşma önermek (eşik, istisna, aşamalı geçiş)", seconds: 50 },
            { who: "partner", de: "Damit könnte ich leben. Fassen wir zusammen, worauf wir uns einigen?", tr: "Buna razı olabilirim. Neyde anlaştığımızı özetleyelim mi?" },
            { who: "you", hint: "Ortak zemini özetle.", expect: "varılan ortak sonucu açıkça özetlemek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "die eigene Position klar vertreten", tr: "Kendi tutumunu açıkça savunmak" },
              { de: "das Gegenargument aufnehmen, nicht übergehen", tr: "Karşı savı geçiştirmeden ele almak" },
              { de: "höflich widersprechen", tr: "Kibarca karşı çıkmak" },
              { de: "zu einem gemeinsamen Ergebnis kommen", tr: "Ortak bir sonuca varmak" },
            ],
            sample:
              "Ich bin dafür, allerdings mit einer Einschränkung. Eine Kennzeichnungspflicht bringt nur dann etwas, wenn sie technisch überprüfbar ist; sonst kennzeichnen die Sorgfältigen und die anderen nicht. — Da würde ich widersprechen. Wenn wir auf technische Perfektion warten, kommt die Regel nie. — Das ist ein fairer Punkt, den ich so nicht bedacht hatte. Mir geht es aber weniger ums Warten als um die Verteilung: Große Anbieter können das umsetzen, ein kleines Forum nicht. — Dann sind wir vielleicht näher beieinander, als es klang. Eine Pflicht ab einer bestimmten Nutzerzahl, verbunden mit einem einheitlichen Standard — damit könnte ich leben. — Ich auch. Halten wir das als gemeinsames Ergebnis fest.",
            criteria: [
              "Tutum açıkça alındı mı ve tartışma boyunca korundu mu?",
              "Karşı sav gerçekten ele alındı mı? (\"Das ist ein fairer Punkt …\")",
              "Karşı çıkışlar kibar kalıplarla mı yapıldı? (Da würde ich widersprechen …)",
              "Sonuçta ortak bir zemin adlandırıldı mı?",
              "Konuşma sırası doğal biçimde paylaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
