import type { MockPaper } from "../types";

/**
 * C1 · Deneme 1 — "Zeit und Arbeit".
 *
 * ÖLÇÜM PLANI (C1: uzun ve yapısı karmaşık metinleri, açıkça söylenmemiş
 * tutumlar dahil, ayrıntısıyla anlamak; okuduğunu KENDİ sözcükleriyle
 * yeniden kurmak):
 *
 *   Lesen  70 dk · 25 madde
 *     Teil 1 10  yazarak      özet boşlukları — metni yeniden kurma (gist)
 *     Teil 2 10  dört şıklı   üç görüş metni — hangi görüş kimde (opinion)
 *     Teil 3  5  şıklı boşluk metnin sözcüksel-dilbilgisel dokusu (structure)
 *   Hören  40 dk · 25 madde
 *     Teil 1 10  not alma     bilgilendirme konuşması — seçici dinleme (detail)
 *     Teil 2 15  üç şıklı     uzun tartışma — ana savlar ve tutumlar (gist)
 *   Schreiben 80 dk  beş yönlendirme noktasına göre metin · resmî yazıda
 *                    10 boşluk (üslup düzeyi)
 *   Sprechen  15 dk  sunum · tartışma ve uzlaşma
 *
 * TEIL 1 NEDEN YAZARAK: C1'in ayırt edici becerisi tanımak değil, YENİDEN
 * KURMAK. Özet boşlukları bilerek metindeki sözcüğün aynısını istemiyor;
 * kabul listeleri eşanlamlıları içeriyor ama metinden kopyalanan yanlış
 * sözcüğü almıyor. Boşlukların her biri dilbilgisiyle sınırlanmış (bir ad,
 * bir sıfat, bir ortaç), yoksa cevap sayısı sonsuz olurdu.
 *
 * TEIL 2'DE DÖRDÜNCÜ ŞIK: "In keinem der Texte" seçeneği bilerek var ve
 * gerçekten iki kez doğru. C1'de en sık ölçülen hata, metinde geçen bir
 * sözcüğü metnin savı sanmaktır.
 */
export const C1_01: MockPaper = {
  id: "de-c1-01",
  course: "de",
  level: "C1",
  no: 1,
  theme: "Zeit und Arbeit",
  themeTr: "Zaman ve çalışma",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben. Sie lesen einen Sachtext mit einer lückenhaften Zusammenfassung, drei Stellungnahmen und einen Text mit Lücken. Sie können mit jeder Aufgabe beginnen.",
      instructionTr:
        "Bu bölümde üç görev var: eksik özetiyle birlikte bir bilgi metni, üç görüş yazısı ve boşluklu bir metin okuyacaksın. İstediğin görevle başlayabilirsin.",
      tasks: [
        {
          id: "de-c1-01-l1",
          no: 1,
          format: "gap",
          goal: "gist",
          prompt:
            "Lesen Sie den Text und die Zusammenfassung darunter. Ergänzen Sie die Lücken 1 bis 10 sinngemäß. Schreiben Sie in jede Lücke ein Wort. Die Wörter stehen nicht immer wörtlich im Text.",
          promptTr:
            "Metni ve altındaki özeti oku. 1–10. boşlukları anlama uygun biçimde tamamla. Her boşluğa bir sözcük yaz. Sözcükler metinde her zaman birebir geçmiyor.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Sachtext",
              genreTr: "Bilgi metni",
              title: "Zeitwohlstand — Karriere eines Begriffs",
              body: `Wohlstand wird üblicherweise in Geld gemessen. Seit einigen Jahren gewinnt jedoch ein Begriff an Boden, der eine andere Größe in den Mittelpunkt rückt: Zeitwohlstand. Gemeint ist damit nicht die bloße Menge freier Stunden, sondern die Verfügung über die eigene Zeit — also die Frage, wer darüber bestimmt, wann sie beginnt und wann sie endet.

Dass diese Unterscheidung mehr ist als eine begriffliche Spitzfindigkeit, zeigt ein Befund, der die Forschung lange irritiert hat: Menschen mit vergleichbarer Wochenarbeitszeit berichten von sehr unterschiedlichem Zeitdruck. Ausschlaggebend ist offenbar weniger der Umfang als die Vorhersehbarkeit. Wer seinen Dienstplan vierzehn Tage im Voraus kennt, empfindet dieselbe Stundenzahl als deutlich weniger belastend als jemand, dem sie kurzfristig mitgeteilt wird.

Historisch ist der Begriff jünger, als seine heutige Selbstverständlichkeit vermuten lässt. Die Arbeiterbewegung des neunzehnten Jahrhunderts kämpfte um die Verkürzung des Arbeitstages, nicht um dessen Gestaltbarkeit. Erst nachdem die Arbeitszeit in vielen Branchen unter vierzig Stunden gefallen war, trat die zweite Frage hervor — und mit ihr die Einsicht, dass gewonnene Stunden ihren Wert weitgehend einbüßen, wenn sie zerstreut anfallen.

Kritiker halten dem entgegen, der Begriff verlagere ein strukturelles Problem in die Biografie des Einzelnen. Wer über seine Zeit verfüge, so das Argument, verfüge in aller Regel auch über ein höheres Einkommen; Zeitwohlstand sei mithin nur ein anderer Name für eine längst bekannte Ungleichheit. Der Einwand ist ernst zu nehmen, trifft aber nicht vollständig: Untersuchungen aus dem Pflegebereich zeigen, dass Beschäftigte mit vergleichbarem Verdienst sehr unterschiedlich über ihre Zeit verfügen, je nachdem, wie ihre Einrichtung plant.

Messbar ist Zeitwohlstand bislang allerdings nur behelfsweise. Die gängigen Erhebungen fragen nach der Zahl der Stunden und nach der Zufriedenheit, selten jedoch nach der Verfügung: Wer legt den Beginn fest, wie kurzfristig ändert sich der Plan, wie oft wird außerhalb der vereinbarten Zeit gefragt? Dort, wo diese Fragen gestellt wurden — etwa in einer skandinavischen Erhebung mit rund elftausend Beschäftigten — fielen die Unterschiede zwischen den Branchen größer aus als die Unterschiede zwischen den Ländern. Das spricht gegen die verbreitete Annahme, es handle sich in erster Linie um eine Frage der nationalen Arbeitskultur.

Für die betriebliche Praxis folgt daraus eine unbequeme Konsequenz. Maßnahmen, die den Zeitwohlstand erhöhen, kosten selten Geld, wohl aber Kontrolle. Ein Dienstplan, der drei Wochen im Voraus feststeht, bindet die Leitung stärker als einer, der wöchentlich angepasst wird. Genau hier, und nicht am Budget, scheitern die meisten Versuche.`,
              gloss: [
                { de: "die Spitzfindigkeit", tr: "kılı kırk yaran ayrım", en: "hairsplitting" },
                { de: "ausschlaggebend", tr: "belirleyici", en: "decisive" },
                { de: "einbüßen", tr: "yitirmek", en: "to forfeit" },
                { de: "mithin", tr: "dolayısıyla", en: "therefore" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              title: "Zusammenfassung mit Lücken",
              body: `Der Begriff Zeitwohlstand bezeichnet nicht die Menge freier Stunden, sondern die {{1}} über die eigene Zeit. Untersuchungen zeigen, dass für das Empfinden von Zeitdruck weniger der Umfang der Arbeitszeit entscheidend ist als ihre {{2}}. Wer seinen Dienstplan früh kennt, fühlt sich bei gleicher Stundenzahl weniger {{3}}.

Historisch ist der Begriff {{4}}, als seine heutige Selbstverständlichkeit vermuten lässt. Die Arbeiterbewegung forderte zunächst allein eine {{5}} des Arbeitstages. Die Frage der Gestaltung stellte sich erst später; dabei zeigte sich, dass {{6}} anfallende Stunden an Wert verlieren.

Kritiker wenden ein, der Begriff mache aus einem strukturellen Problem eine {{7}} Frage, weil Zeitverfügung meist mit einem höheren {{8}} einhergehe. Untersuchungen aus der Pflege sprechen jedoch dagegen.

Für Betriebe bedeutet das: Mehr Zeitwohlstand kostet kaum {{9}}, wohl aber {{10}}. Genau daran scheitern die meisten Versuche.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-01-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Verfügung", "Kontrolle", "Selbstbestimmung", "Herrschaft", "Verfügungsgewalt", "Bestimmung"],
              explain:
                "Metin karşıtlığı kuruyor: \"nicht die bloße Menge freier Stunden, sondern die Verfügung über die eigene Zeit\". Boşluk `die … über` yapısında bir ad istiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["Vorhersehbarkeit", "Planbarkeit", "Berechenbarkeit", "Vorhersagbarkeit", "Verlässlichkeit"],
              explain:
                "\"Ausschlaggebend ist offenbar weniger der Umfang als die Vorhersehbarkeit.\" Özet aynı karşıtlığı kurduğu için ikinci öğe gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["belastet", "gestresst", "unter Druck", "beansprucht", "überlastet", "unter Zeitdruck"],
              explain:
                "Kaynak metin \"als deutlich weniger belastend\" diyor; özette özne kişi olduğu için ortaç `belastet` biçimine geçiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["jünger", "neuer"],
              explain:
                "\"Historisch ist der Begriff jünger, als seine heutige Selbstverständlichkeit vermuten lässt\" — karşılaştırma yapısı `als` ile devam ettiği için sıfatın üstünlük biçimi gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Verkürzung", "Kürzung", "Reduzierung", "Verringerung", "Begrenzung", "Senkung"],
              explain:
                "İşçi hareketi \"um die Verkürzung des Arbeitstages\" mücadele etmiş; boşluk `eine … des Arbeitstages` kalıbında dişil bir ad istiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["zerstreut", "verteilt", "zersplittert", "unregelmäßig", "verstreut", "bruchstückhaft"],
              explain:
                "\"wenn sie zerstreut anfallen\" — kazanılan saatler dağınık geldiğinde değerini yitiriyor. Boşluk `anfallende Stunden` ad öbeğinde bir niteleyici bekliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["individuelle", "persönliche", "biografische", "private", "biographische", "eigene"],
              explain:
                "Eleştiri, sorunun \"in die Biografie des Einzelnen\" kaydırıldığını söylüyor. `eine … Frage` yapısı için dişil, -e ekli bir sıfat gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Einkommen", "Gehalt", "Verdienst", "Lohn", "Entgelt"],
              explain:
                "\"verfüge in aller Regel auch über ein höheres Einkommen\" — `mit einem höheren …` yapısı yalın bir yansız ad istiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Geld", "Budget", "Mittel", "Kosten"],
              explain:
                "Son paragrafın karşıtlığı: \"kosten selten Geld, wohl aber Kontrolle\". Boşluk bu çiftin ilk ögesi.",
            },
            {
              kind: "gap",
              id: "de-c1-01-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Kontrolle", "Steuerung", "Macht", "Entscheidungsmacht", "Kontrollverzicht", "Verfügungsmacht"],
              explain:
                "Aynı karşıtlığın ikinci ögesi. Metin bunu somutlaştırıyor: üç hafta önceden sabitlenen bir plan yönetimi daha çok bağlar.",
            },
          ],
        },
        {
          id: "de-c1-01-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Lesen Sie die drei Stellungnahmen. In welchem Text finden Sie die Aussagen 11 bis 20? Manche Aussagen stehen in keinem der Texte.",
          promptTr:
            "Üç görüş yazısını oku. 11–20. ifadeleri hangi metinde buluyorsun? Bazı ifadeler metinlerin hiçbirinde yok.",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "A — Dr. Ackermann, Arbeitsrechtlerin",
              body: `Die Debatte über flexible Arbeitszeit krankt daran, dass zwei Dinge verwechselt werden: die Freiheit, die Lage der Arbeitszeit zu wählen, und die Erwartung, jederzeit verfügbar zu sein. Rechtlich sind das gegensätzliche Sachverhalte; im Alltag treten sie regelmäßig gemeinsam auf.

Ich halte die verbreitete Forderung nach weniger Regulierung deshalb für kurzsichtig. Wer Höchstarbeitszeiten aufweicht, erhöht die Freiheit derjenigen, die ohnehin verhandeln können, und verringert sie für alle übrigen. Ein Recht, das nur ausgeübt werden kann, wenn man ersetzbar ist, ist kein Recht.

Was mich an der Diskussion darüber hinaus stört, ist ihre Fixierung auf Bildschirmberufe. Über zwei Drittel der Beschäftigten arbeiten an Orten, an denen sich die Frage nach dem Homeoffice überhaupt nicht stellt. Für sie entscheidet nicht die Technik, sondern der Dienstplan.

Hinzu kommt eine Gruppe, die praktisch nie vorkommt: Teilzeitbeschäftigte. Für sie bedeutet Flexibilität regelmäßig, dass die vereinbarten Stunden über die ganze Woche verstreut liegen. Rechtlich ist das zulässig, praktisch verhindert es jede zweite Tätigkeit — eine Weiterbildung, eine Pflegeaufgabe, einen zweiten Vertrag. Wer den Umfang reduziert, verliert Einkommen; wer die Lage nicht bestimmen kann, verliert den Rest des Tages dazu.`,
              gloss: [
                { de: "kranken an", tr: "bir kusurdan mustarip olmak", en: "to suffer from" },
                { de: "aufweichen", tr: "gevşetmek", en: "to soften, to dilute" },
                { de: "ersetzbar", tr: "yeri doldurulabilir", en: "replaceable" },
              ],
            },
            {
              kind: "text",
              id: "s2",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "B — Herr Bogdan, Betriebsrat",
              body: `In unserem Betrieb haben wir vor vier Jahren die Vertrauensarbeitszeit eingeführt, und ich war einer ihrer lautesten Befürworter. Heute bin ich vorsichtiger geworden, ohne die Entscheidung zu bereuen.

Was funktioniert hat: Die Zahl der Konflikte um einzelne Stunden ist praktisch verschwunden. Was nicht funktioniert hat: Die durchschnittliche Wochenarbeitszeit ist gestiegen, und zwar am stärksten bei denen, die vorher schon am längsten geblieben sind. Ohne Erfassung sieht das niemand, auch die Betroffenen nicht.

Wir haben deshalb nachgesteuert und die Erfassung wieder eingeführt, allerdings ohne Kontrollfunktion: Die Zahlen gehen an die Beschäftigten, nicht an die Leitung. Das klingt nach einem Kompromiss und ist auch einer. Er hat den Vorteil, dass er beide Seiten unzufrieden zurücklässt und trotzdem hält.

Was ich heute anders machen würde: Wir haben die Regelung eingeführt, ohne vorher festzulegen, woran wir ihren Erfolg messen wollen. Vier Jahre später streiten wir über Eindrücke. Ein einziger Satz in der Vereinbarung — welche Zahl nach zwölf Monaten geprüft wird und wer sie vorlegt — hätte uns diese Debatte erspart. Das gilt für fast jede Betriebsvereinbarung, die ich kenne.`,
              gloss: [
                { de: "die Vertrauensarbeitszeit", tr: "güvene dayalı çalışma süresi (saat kaydı olmadan)", en: "trust-based working time" },
                { de: "nachsteuern", tr: "sonradan düzeltmek", en: "to readjust" },
              ],
            },
            {
              kind: "text",
              id: "s3",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "C — Frau Cerny, Unternehmerin",
              body: `Ich führe einen Betrieb mit neunzig Beschäftigten und höre seit Jahren, Flexibilität sei ein Geschenk an die Arbeitgeber. Meine Erfahrung ist eine andere: Sie ist zunächst einmal Arbeit, und zwar für die Leitung.

Als wir die Schichtplanung drei Wochen im Voraus festgelegt haben, war der Aufwand erheblich, und wir konnten auf Auftragsspitzen schlechter reagieren. Der Nutzen zeigte sich später: Die Fluktuation ist um etwa ein Drittel gesunken. Gerechnet auf die Kosten einer Neubesetzung war das die bessere Rechnung.

Noch ein Wort zu den Zahlen, weil sie in solchen Diskussionen gern fehlen. Eine Neubesetzung kostet uns im Schnitt gut neuntausend Euro, gerechnet mit Ausschreibung, Einarbeitung und der Zeit, die erfahrene Kolleginnen dafür abgeben. Bei neunzig Beschäftigten und einer Fluktuation von fünfzehn Prozent ergibt das eine sechsstellige Summe im Jahr. Vor diesem Hintergrund ist verlässliche Planung keine Wohltat, sondern schlicht billiger.

Was ich allerdings zurückweise, ist die Vorstellung, das lasse sich verordnen. Ein Gesetz, das für einen Betrieb mit neunzig Leuten dasselbe vorschreibt wie für einen mit neun, erzeugt nur Ausnahmen und Papier. Ich bin für Transparenzpflichten, nicht für Vorgaben.`,
              gloss: [
                { de: "die Auftragsspitze", tr: "sipariş yoğunluğu", en: "order peak" },
                { de: "die Fluktuation", tr: "personel devir hızı", en: "staff turnover" },
                { de: "verordnen", tr: "yukarıdan dayatmak", en: "to mandate" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-01-l2-11",
              no: 11,
              text: "Zwei Sachverhalte werden in der Debatte regelmäßig miteinander verwechselt.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 0,
              explain:
                "A: seçme özgürlüğü ile sürekli erişilebilirlik beklentisi \"rechtlich gegensätzliche Sachverhalte\" ama günlük hayatta birlikte görünüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-12",
              no: 12,
              text: "Eine anfänglich befürwortete Neuerung wird heute zurückhaltender beurteilt.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 1,
              explain:
                "B: \"ich war einer ihrer lautesten Befürworter. Heute bin ich vorsichtiger geworden, ohne die Entscheidung zu bereuen.\" Ne geri adım ne eski coşku.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-13",
              no: 13,
              text: "Eine organisatorische Umstellung war zunächst teuer und rechnete sich erst später.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 2,
              explain:
                "C: «war der Aufwand erheblich» ama sonra «Die Fluktuation ist um etwa ein Drittel gesunken. Gerechnet auf die Kosten einer Neubesetzung war das die bessere Rechnung».",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-14",
              no: 14,
              text: "Jüngere Beschäftigte legen mehr Wert auf freie Zeiteinteilung als ältere.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 3,
              explain:
                "Hiçbir metin kuşaklar arasında böyle bir ayrım yapmıyor. B'de «am stärksten bei denen, die vorher schon am längsten geblieben sind» deniyor — bu yaş değil, alışkanlık ayrımı.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-15",
              no: 15,
              text: "Die Diskussion vernachlässigt Berufe, in denen ortsgebunden gearbeitet wird.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 0,
              explain:
                "A: tartışmanın \"Fixierung auf Bildschirmberufe\" eleştiriliyor; çalışanların üçte ikisi için ev ofis sorusu hiç doğmuyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-16",
              no: 16,
              text: "Ohne Messung bleibt eine unerwünschte Entwicklung selbst den Betroffenen verborgen.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 1,
              explain:
                "B: \"Ohne Erfassung sieht das niemand, auch die Betroffenen nicht.\" Ölçüm burada denetim değil, görünürlük aracı.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-17",
              no: 17,
              text: "Einheitliche gesetzliche Vorgaben passen nicht auf sehr unterschiedliche Betriebsgrößen.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 2,
              explain:
                "C: doksan kişilik ve dokuz kişilik işletmeye aynı şeyi buyuran yasa \"nur Ausnahmen und Papier\" üretir.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-18",
              no: 18,
              text: "Eine Lockerung von Schutzvorschriften nützt vor allem denen, die ohnehin verhandeln können.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 0,
              explain:
                "A: «Wer Höchstarbeitszeiten aufweicht, erhöht die Freiheit derjenigen, die ohnehin verhandeln können, und verringert sie für alle übrigen.»",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-19",
              no: 19,
              text: "Homeoffice führt nachweislich zu geringerer Produktivität.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 3,
              explain:
                "Hiçbir metin verimlilik üzerine bir bulgu ileri sürmüyor. A ev ofisini yalnız tartışmanın dar kapsamını göstermek için anıyor: «ihre Fixierung auf Bildschirmberufe».",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l2-20",
              no: 20,
              text: "Ein Kompromiss wird gerade deshalb für tragfähig gehalten, weil er keine Seite zufriedenstellt.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 1,
              explain:
                "B'nin kapanışı: \"Er hat den Vorteil, dass er beide Seiten unzufrieden zurücklässt und trotzdem hält.\"",
            },
          ],
        },
        {
          id: "de-c1-01-l3",
          no: 3,
          format: "gapMcq",
          goal: "structure",
          prompt: "Lesen Sie den Text und ergänzen Sie die Lücken 21 bis 25. Welche Lösung passt: a, b, c oder d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi seçenek uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Zeitschriftentext",
              genreTr: "Dergi metni",
              title: "Die stille Rückkehr der Anwesenheit",
              body: `Nach Jahren, in denen das Büro als Auslaufmodell galt, mehren sich die Anzeichen für eine Gegenbewegung. Immer mehr Unternehmen bestehen wieder auf festen Anwesenheitstagen — {{21}} sie damit gegen die erklärten Wünsche eines großen Teils ihrer Belegschaft handeln.

Die Begründungen ähneln sich auffällig. Fast immer ist von Zusammenarbeit die Rede, von Einarbeitung und vom sogenannten Zufall des Flurgesprächs. Belege dafür sind {{22}} dünn; die wenigen vorliegenden Untersuchungen kommen zu widersprüchlichen Ergebnissen.

Aufschlussreicher als die offiziellen Gründe ist ein Blick auf die Struktur der Entscheidungen. Sie werden fast durchweg dort getroffen, wo Anwesenheit ohnehin selbstverständlich ist. Wer selbst täglich im Haus arbeitet, {{23}} die Kosten des Weges systematisch.

Beobachten lässt sich zudem eine Verschiebung im Ton. Wo vor drei Jahren von Vertrauen die Rede war, steht heute die Formulierung von einer gemeinsamen Kultur, die sich nur vor Ort herstellen lasse. Das klingt versöhnlicher und meint dasselbe. Bemerkenswert ist dabei weniger die Wortwahl als der Umstand, dass die Begründung gewechselt hat, während die Maßnahme dieselbe geblieben ist.

Damit soll die Gegenbewegung nicht als bloße Laune abgetan werden. Für Berufsanfängerinnen ist die Anwesenheit anderer tatsächlich schwer zu ersetzen. {{24}} wäre daraus zu folgern, dass dieselbe Regel für alle sinnvoll ist.

Am Ende dürfte sich weniger die Frage stellen, ob im Büro gearbeitet wird, {{25}} wer darüber entscheidet.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-01-l3-21",
              no: 21,
              text: "Lücke 21",
              options: ["obwohl", "sofern", "indem", "damit"],
              answer: 0,
              explain:
                "Cümle bir çelişki kuruyor: şirketler devam günü istiyor, oysa bu çalışanların isteğine aykırı. `obwohl` bu karşıtlığı verir; `sofern` koşul, `indem` araç, `damit` amaç bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l3-22",
              no: 22,
              text: "Lücke 22",
              options: ["ohnehin", "allerdings", "immerhin", "insofern"],
              answer: 1,
              explain:
                "Gerekçeler sıralandıktan sonra bir sınırlama geliyor: kanıtlar zayıf. `allerdings` tam bu kısıtlayıcı işlevi görür. `immerhin` olumlu bir kalanı, `ohnehin` zaten var olanı belirtir.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l3-23",
              no: 23,
              text: "Lücke 23",
              options: ["übertreibt", "unterschätzt", "verweigert", "überschätzt"],
              answer: 1,
              explain:
                "Kararı alanlar zaten binadaki insanlar; yol maliyetini kendileri yaşamadıkları için sistematik olarak KÜÇÜMSÜYORLAR. `überschätzt` anlamı tersine çevirirdi.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l3-24",
              no: 24,
              text: "Lücke 24",
              options: ["Voreilig", "Folgerichtig", "Naheliegend", "Zwangsläufig"],
              answer: 0,
              explain:
                "Önceki cümle karşı tarafa bir hak veriyor; bu cümle o haktan çıkarılacak GENEL kuralı reddediyor. `Voreilig wäre daraus zu folgern …` bu reddi kurar; öteki üçü tam tersini söylerdi.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-l3-25",
              no: 25,
              text: "Lücke 25",
              options: ["als vielmehr", "sondern auch", "sowie auch", "geschweige denn"],
              answer: 0,
              explain:
                "`weniger …, als vielmehr …` kalıbı iki soruyu karşılaştırıp ikinciyi öne alır. `sondern auch` yalnız `nicht nur` ile, `geschweige denn` olumsuz bir artış bildirir.",
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
        "Dieser Teil hat zwei Aufgaben. Zuerst hören Sie eine Informationsveranstaltung und machen Notizen, danach eine längere Diskussion.",
      instructionTr:
        "Bu bölümde iki görev var: önce bir bilgilendirme konuşması dinleyip not alacaksın, sonra uzun bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-c1-01-h1",
          no: 1,
          format: "notes",
          goal: "detail",
          prompt:
            "Sie hören eine Informationsveranstaltung. Ergänzen Sie die Notizen 1 bis 10. Schreiben Sie höchstens drei Wörter in jede Lücke. Sie hören den Text einmal.",
          promptTr:
            "Bir bilgilendirme konuşması dinleyeceksin. 1–10. notları tamamla. Her boşluğa en çok üç sözcük yaz. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Informationsveranstaltung",
              genreTr: "Bilgilendirme konuşması",
              title: "Das Zeitwertkonto — Informationsabend",
              situation: "Bir işletmede çalışma saati hesabı anlatılıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend und danke, dass Sie gekommen sind. Ich bin Andrea Ferber aus der Personalabteilung und stelle Ihnen heute das Zeitwertkonto vor. Ich brauche dafür etwa zwanzig Minuten, Ihre Fragen kommen danach.",
                },
                {
                  text: "Zunächst kurz, worum es geht. Auf ein Zeitwertkonto können Sie Überstunden, nicht genommenen Urlaub und Teile Ihres Gehalts einzahlen. Angespart wird das Ganze nicht in Stunden, sondern in Geld — das ist wichtig, weil Ihr Guthaben so unabhängig von späteren Tariferhöhungen bleibt.",
                },
                {
                  text: "Wofür können Sie das Guthaben verwenden? Vorgesehen sind vier Zwecke: eine berufliche Weiterbildung, die Pflege von Angehörigen, eine Verlängerung der Elternzeit und der vorgezogene Ausstieg vor der Rente. Ein Sabbatical zum Reisen ist ausdrücklich nicht vorgesehen; das war die meistgestellte Frage im letzten Jahr.",
                },
                {
                  text: "Zur Teilnahme. Anspruchsberechtigt sind alle Beschäftigten nach Ablauf der Probezeit. Befristete Verträge sind nicht ausgeschlossen, allerdings muss die Laufzeit mindestens achtzehn Monate betragen. Auszubildende können nicht teilnehmen.",
                },
                {
                  text: "Wie viel dürfen Sie einzahlen? Pro Jahr höchstens dreißig Prozent Ihres Bruttojahresgehalts. Nach oben ist das Konto auf insgesamt zwei Jahresgehälter begrenzt. Wer diese Grenze erreicht, wird automatisch benachrichtigt.",
                },
                {
                  text: "Ein Punkt, der oft übersehen wird: Die Anmeldung ist nicht jederzeit möglich. Sie können nur zum ersten Juli oder zum ersten Januar einsteigen, und der Antrag muss acht Wochen vorher vorliegen.",
                },
                {
                  text: "Zur Sicherheit Ihres Guthabens. Das Geld liegt nicht bei uns im Haus, sondern bei einem externen Treuhänder. Im Fall einer Insolvenz ist es dadurch geschützt — das ist gesetzlich vorgeschrieben und keine Freundlichkeit des Unternehmens.",
                },
                {
                  text: "Was passiert bei einem Wechsel? Wenn Sie das Unternehmen verlassen, haben Sie drei Möglichkeiten: Übertragung auf den neuen Arbeitgeber, sofern dieser ein solches Konto führt, Übertragung an die Rentenversicherung oder Auszahlung. Die Auszahlung ist die ungünstigste Variante, weil der gesamte Betrag in einem Jahr versteuert wird.",
                },
                {
                  text: "Und schließlich: Wer beraten werden möchte, kann das tun, bevor er sich entscheidet. Wir haben dafür eine unabhängige Stelle beauftragt; die Beratung ist für Sie kostenlos und findet nicht in diesem Haus statt. Termine bekommen Sie über das Intranet.",
                },
              ],
              gloss: [
                { de: "das Guthaben", tr: "birikmiş bakiye", en: "credit balance" },
                { de: "der Treuhänder", tr: "yediemin, mutemet", en: "trustee" },
                { de: "die Insolvenz", tr: "iflas", en: "insolvency" },
                { de: "anspruchsberechtigt", tr: "hak sahibi", en: "entitled" },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizzettel",
              genreTr: "Not kâğıdı",
              title: "Notizen — Zeitwertkonto",
              body: `Angespart wird in {{1}}, nicht in Stunden.

Vier zulässige Zwecke; ausdrücklich NICHT möglich: {{2}}.

Teilnahme erst nach {{3}}.
Befristete Verträge: nur ab einer Laufzeit von {{4}}.
Ausgeschlossen sind {{5}}.

Einzahlung pro Jahr: höchstens {{6}} des Bruttojahresgehalts.
Obergrenze des Kontos: {{7}}.

Einstieg nur zum 1. Juli oder 1. Januar; Antrag {{8}} vorher.

Guthaben liegt bei {{9}} → bei Insolvenz geschützt.

Beim Arbeitgeberwechsel ungünstigste Variante: {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-01-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Geld", "in Geld", "Euro"],
              explain:
                "\"Angespart wird das Ganze nicht in Stunden, sondern in Geld\" — gerekçesi de veriliyor: bakiye sonraki zam kararlarından bağımsız kalsın.",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["Sabbatical", "ein Sabbatical", "Reisen", "Sabbatical zum Reisen", "Sabbatjahr", "Auszeit zum Reisen"],
              explain:
                "Dört amaç sayıldıktan sonra açıkça dışlanan tek şey: \"Ein Sabbatical zum Reisen ist ausdrücklich nicht vorgesehen\".",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["der Probezeit", "Probezeit", "Ablauf der Probezeit", "Ende der Probezeit"],
              explain: "\"Anspruchsberechtigt sind alle Beschäftigten nach Ablauf der Probezeit\".",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["18 Monaten", "achtzehn Monaten", "18 Monate", "achtzehn Monate"],
              explain:
                "«Befristete Verträge sind nicht ausgeschlossen, allerdings muss die Laufzeit mindestens achtzehn Monate betragen» — sayıyı ve koşulu birlikte tutmak gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["Auszubildende", "Azubis", "die Auszubildenden", "Lehrlinge"],
              explain:
                "\"Auszubildende können nicht teilnehmen\" — süreli sözleşmelilerle karıştırılmaması gereken ayrı bir grup.",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["30 Prozent", "dreißig Prozent", "30 %", "30%"],
              explain: "\"Pro Jahr höchstens dreißig Prozent Ihres Bruttojahresgehalts\".",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["zwei Jahresgehälter", "2 Jahresgehälter", "zwei Jahresgehältern"],
              explain:
                "Yıllık sınır ile toplam sınır iki ayrı sayı: yılda %30, toplamda iki yıllık maaş.",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["acht Wochen", "8 Wochen", "acht Wochen vorher"],
              explain: "\"der Antrag muss acht Wochen vorher vorliegen\" — iki giriş tarihinden önce gelen süre.",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["einem externen Treuhänder", "externem Treuhänder", "einem Treuhänder", "Treuhänder", "externer Treuhänder", "einer Treuhandstelle"],
              explain:
                "«Das Geld liegt nicht bei uns im Haus, sondern bei einem externen Treuhänder»; konuşmacı bunun yasal zorunluluk olduğunu ayrıca vurguluyor.",
            },
            {
              kind: "gap",
              id: "de-c1-01-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["Auszahlung", "die Auszahlung", "Auszahlen"],
              explain:
                "«Die Auszahlung ist die ungünstigste Variante, weil der gesamte Betrag in einem Jahr versteuert wird.»",
            },
          ],
        },
        {
          id: "de-c1-01-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 11 bis 25: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir tartışma dinleyeceksin. 11–25. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              situation: "Çalışma sürelerinin kaydı ve esneklik üzerine panel.",
              plays: 1,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Guten Abend. Seit der Pflicht zur Arbeitszeiterfassung streiten zwei Lager, die einander gern missverstehen. Bei mir sind Frau Reuter, Arbeitswissenschaftlerin, Herr Falkenberg, Geschäftsführer eines Softwarehauses, und Frau Odonkor, Pflegedienstleiterin.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Ich möchte gleich zu Beginn ein Missverständnis ausräumen. Erfassung und Kontrolle sind nicht dasselbe. Die Pflicht sagt nichts darüber, wer die Daten sieht. Dass sie fast überall als Überwachung gelesen wird, sagt mehr über die Betriebe als über die Regel.",
                },
                {
                  speaker: "Herr Falkenberg",
                  text: "Das ist juristisch korrekt und praktisch weltfremd. Sobald eine Zahl existiert, wird sie irgendwann jemand auswerten. Ich sage nicht, dass ich das vorhabe; ich sage, dass ich es nicht dauerhaft verhindern kann.",
                },
                {
                  speaker: "Frau Odonkor",
                  text: "In meinem Bereich klingt diese Debatte fast luxuriös. Wir erfassen seit dreißig Jahren jede Minute, und niemand hat das je als Freiheitsverlust bezeichnet. Unser Problem ist nicht die Messung, sondern dass die gemessene Zeit nicht bezahlt wird.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Reuter, damit ist der Vorwurf im Raum, die Debatte werde von einer Minderheit geführt.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Der Vorwurf trifft zu, und ich schließe mich nicht aus. Wir diskutieren seit Jahren über Wissensberufe, in denen etwa ein Viertel der Beschäftigten arbeitet. Für die übrigen ist die entscheidende Größe nicht das Homeoffice, sondern die Verlässlichkeit des Plans.",
                },
                {
                  speaker: "Herr Falkenberg",
                  text: "Nun, meine Leute wollen die Erfassung nicht. Ich habe intern abgestimmt: siebzig Prozent dagegen.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Solche Abstimmungen kenne ich, und ich halte wenig von ihnen. Gefragt wird meist: Wollen Sie kontrolliert werden? Fragen Sie stattdessen: Möchten Sie, dass Ihre Überstunden sichtbar sind? Dann kippt das Ergebnis regelmäßig.",
                },
                {
                  speaker: "Herr Falkenberg",
                  text: "Das ist ein fairer Einwand. Ich gebe zu, dass die Frage suggestiv war. Trotzdem bleibt: Wer bei uns anfängt, kommt oft gerade wegen der Freiheit, seinen Tag selbst zu schneiden.",
                },
                {
                  speaker: "Frau Odonkor",
                  text: "Diese Freiheit hätte ich auch gern. Nur würde bei uns niemand behaupten, sie sei eine Frage der Haltung. Sie ist eine Frage der Besetzung. Solange eine Kollegin für zwölf Menschen zuständig ist, ist jede Flexibilität eine Umverteilung von Belastung.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Gibt es einen Punkt, an dem Sie drei sich einig sind?",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Ja, vermutlich diesen: Zeit, die nicht sichtbar ist, wird nicht verhandelt. Ob daraus Kontrolle wird, hängt an der Frage, wer die Zahlen bekommt — nicht daran, ob es sie gibt.",
                },
                {
                  speaker: "Herr Falkenberg",
                  text: "Dem kann ich zustimmen. Ich würde ergänzen: Es hängt auch daran, was mit den Zahlen nicht passieren darf. Ohne eine solche Zusage glaubt es niemand.",
                },
                {
                  speaker: "Frau Odonkor",
                  text: "Und ich würde ergänzen, dass Sichtbarkeit allein nichts löst. Bei uns ist seit Jahren alles sichtbar. Verändert hat sich erst etwas, als die Zahlen in einer Tarifverhandlung auf dem Tisch lagen.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Ein letzter Durchgang, jeweils ein Satz: Was müsste sich als Erstes ändern?",
                },
                {
                  speaker: "Frau Odonkor",
                  text: "Die Personalbemessung. Alles andere ist Verwaltung des Mangels.",
                },
                {
                  speaker: "Herr Falkenberg",
                  text: "Eine verbindliche Regel, wer die Daten unter keinen Umständen sehen darf.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Dass wir aufhören, über Flexibilität zu sprechen, ohne zu sagen, für wen sie gilt.",
                },
              ],
              gloss: [
                { de: "ausräumen", tr: "ortadan kaldırmak (yanlış anlamayı)", en: "to clear up" },
                { de: "weltfremd", tr: "hayattan kopuk", en: "unworldly" },
                { de: "suggestiv", tr: "yönlendirici", en: "leading (question)" },
                { de: "die Personalbemessung", tr: "kadro hesabı", en: "staffing levels" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-01-h2-11",
              no: 11,
              ref: "d1",
              text: "Welches Missverständnis will Frau Reuter zu Beginn ausräumen?",
              options: [
                "Dass Erfassung und Kontrolle dasselbe seien.",
                "Dass die Pflicht nur große Betriebe betreffe.",
                "Dass die Regel neu eingeführt worden sei.",
              ],
              answer: 0,
              explain:
                "\"Erfassung und Kontrolle sind nicht dasselbe. Die Pflicht sagt nichts darüber, wer die Daten sieht.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-12",
              no: 12,
              ref: "d1",
              text: "Wie begründet Herr Falkenberg seinen Widerspruch?",
              options: [
                "Die Regel sei rechtlich fehlerhaft formuliert.",
                "Eine vorhandene Zahl werde früher oder später ausgewertet.",
                "Die Erfassung sei technisch zu aufwendig.",
              ],
              answer: 1,
              explain:
                "Hukuki tespiti kabul edip pratikte tutmayacağını söylüyor: \"Sobald eine Zahl existiert, wird sie irgendwann jemand auswerten.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-13",
              no: 13,
              ref: "d1",
              text: "Was sagt Frau Odonkor über die Erfassung in ihrem Bereich?",
              options: [
                "Sie wurde dort erst kürzlich eingeführt.",
                "Sie wird dort als Eingriff in die Freiheit empfunden.",
                "Sie ist dort seit Langem selbstverständlich.",
              ],
              answer: 2,
              explain:
                "\"Wir erfassen seit dreißig Jahren jede Minute, und niemand hat das je als Freiheitsverlust bezeichnet.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-14",
              no: 14,
              ref: "d1",
              text: "Worin besteht für sie das eigentliche Problem?",
              options: [
                "In der Genauigkeit der Messung.",
                "Darin, dass die erfasste Zeit nicht vergütet wird.",
                "In der Weitergabe der Daten an die Leitung.",
              ],
              answer: 1,
              explain:
                "\"Unser Problem ist nicht die Messung, sondern dass die gemessene Zeit nicht bezahlt wird.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-15",
              no: 15,
              ref: "d1",
              text: "Wie reagiert Frau Reuter auf den Vorwurf, die Debatte werde von einer Minderheit geführt?",
              options: [
                "Sie räumt ihn ein und bezieht sich selbst mit ein.",
                "Sie weist ihn mit Zahlen zurück.",
                "Sie hält ihn für eine Ablenkung vom Thema.",
              ],
              answer: 0,
              explain:
                "\"Der Vorwurf trifft zu, und ich schließe mich nicht aus.\" Kendi alanını da eleştirinin içine katıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-16",
              no: 16,
              ref: "d1",
              text: "Welche Größe hält sie für die Mehrheit der Beschäftigten für entscheidend?",
              options: [
                "Die Höhe des Einkommens.",
                "Die Möglichkeit zum Homeoffice.",
                "Die Verlässlichkeit der Planung.",
              ],
              answer: 2,
              explain:
                "\"Für die übrigen ist die entscheidende Größe nicht das Homeoffice, sondern die Verlässlichkeit des Plans.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-17",
              no: 17,
              ref: "d1",
              text: "Wie bewertet Frau Reuter die betriebsinterne Abstimmung?",
              options: [
                "Als aussagekräftig, aber nicht übertragbar.",
                "Als abhängig von der Formulierung der Frage.",
                "Als methodisch einwandfrei, aber veraltet.",
              ],
              answer: 1,
              explain:
                "Sorunun biçimini değiştirdiğinizde sonucun \"regelmäßig kippt\" olduğunu söylüyor — itiraz yöntemedir, sayıya değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-18",
              no: 18,
              ref: "d1",
              text: "Wie verhält sich Herr Falkenberg zu diesem Einwand?",
              options: [
                "Er gibt einen Teil davon zu.",
                "Er hält ihn für unsachlich.",
                "Er zieht sein Ergebnis vollständig zurück.",
              ],
              answer: 0,
              explain:
                "\"Das ist ein fairer Einwand. Ich gebe zu, dass die Frage suggestiv war.\" Ama savını \"Trotzdem bleibt …\" ile sürdürüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-19",
              no: 19,
              ref: "d1",
              text: "Wie kontert Frau Odonkor das Argument der Freiheit?",
              options: [
                "Sie bestreitet, dass es diese Freiheit überhaupt gibt.",
                "Sie führt sie auf die Personalausstattung zurück.",
                "Sie hält sie für eine Frage der inneren Haltung.",
              ],
              answer: 1,
              explain:
                "\"Sie ist eine Frage der Besetzung\" — bir çalışan on iki kişiden sorumluyken esneklik yükün yer değiştirmesi demek.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-20",
              no: 20,
              ref: "d1",
              text: "Worin sieht Frau Reuter den gemeinsamen Nenner?",
              options: [
                "Darin, dass Erfassung grundsätzlich schadet.",
                "Darin, dass unsichtbare Zeit nicht verhandelt wird.",
                "Darin, dass gesetzliche Regeln überflüssig sind.",
              ],
              answer: 1,
              explain:
                "\"Zeit, die nicht sichtbar ist, wird nicht verhandelt\" — üçünün de kabul edebileceği önerme. Kontrole dönüşüp dönüşmemesi ayrı bir soru.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-21",
              no: 21,
              ref: "d1",
              text: "Was ergänzt Herr Falkenberg dazu?",
              options: [
                "Eine verbindliche Festlegung dessen, was mit den Daten unterbleiben muss.",
                "Eine gesetzliche Obergrenze für Überstunden.",
                "Eine jährliche Befragung der Beschäftigten.",
              ],
              answer: 0,
              explain:
                "Görünürlüğü kabul ediyor ama bir yasak listesi istiyor: \"Ohne eine solche Zusage glaubt es niemand.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-22",
              no: 22,
              ref: "d1",
              text: "Welchen Einwand erhebt Frau Odonkor gegen die Sichtbarkeit?",
              options: [
                "Sichtbarkeit erzeuge zusätzlichen Verwaltungsaufwand.",
                "Sichtbarkeit allein bewirke noch keine Veränderung.",
                "Sichtbarkeit gefährde den Datenschutz der Beschäftigten.",
              ],
              answer: 1,
              explain:
                "Frau Odonkor: «Bei uns ist seit Jahren alles sichtbar. Verändert hat sich erst etwas, als die Zahlen in einer Tarifverhandlung auf dem Tisch lagen.»",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-23",
              no: 23,
              ref: "d1",
              text: "Was nennt Frau Odonkor als erste notwendige Änderung?",
              options: [
                "Eine höhere Vergütung der Überstunden.",
                "Eine verbindliche Dienstplanfrist.",
                "Eine bessere Personalbemessung.",
              ],
              answer: 2,
              explain:
                "\"Die Personalbemessung. Alles andere ist Verwaltung des Mangels.\" Ücret ve plan bunun ardından gelir.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-24",
              no: 24,
              ref: "d1",
              text: "Was fordert Herr Falkenberg zum Schluss?",
              options: [
                "Eine Regel darüber, wer die Daten keinesfalls einsehen darf.",
                "Eine Ausnahme für kleine Unternehmen.",
                "Eine längere Übergangsfrist für die Umsetzung.",
              ],
              answer: 0,
              explain:
                "«Eine verbindliche Regel, wer die Daten unter keinen Umständen sehen darf» — tek cümlelik son turda istediği şey bir yasak kuralı.",
            },
            {
              kind: "mcq",
              id: "de-c1-01-h2-25",
              no: 25,
              ref: "d1",
              text: "Womit schließt Frau Reuter die Diskussion?",
              options: [
                "Mit der Forderung nach mehr Untersuchungen.",
                "Mit einer Kritik an der Gesetzgebung.",
                "Mit der Forderung, den Geltungsbereich von Flexibilität stets zu benennen.",
              ],
              answer: 2,
              explain:
                "«Dass wir aufhören, über Flexibilität zu sprechen, ohne zu sagen, für wen sie gilt» — kapanış cümlesi tartışmanın kendi kör noktasına dönüyor.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction:
        "Dieser Teil hat zwei Aufgaben. Zuerst schreiben Sie einen zusammenhängenden Text zu fünf Leitpunkten, danach ergänzen Sie ein formelles Schreiben.",
      instructionTr:
        "Bu bölümde iki görev var: önce beş yönlendirme noktasına göre bütünlüklü bir metin yazacaksın, sonra resmî bir yazıyı tamamlayacaksın.",
      tasks: [
        {
          id: "de-c1-01-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Fachzeitschrift erscheint eine Reihe mit dem Titel \"Arbeitszeit — wem gehört sie?\". Schreiben Sie einen Beitrag von etwa 200 Wörtern. Behandeln Sie alle fünf Leitpunkte und stellen Sie zwischen ihnen einen Zusammenhang her.",
          promptTr:
            "Bir meslek dergisinde \"Çalışma süresi — kime ait?\" başlıklı bir dizi yayımlanıyor. Yaklaşık 200 kelimelik bir yazı yaz. Beş yönlendirme noktasının hepsini işle ve aralarında bağ kur.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Beschreiben Sie die Ausgangslage.", tr: "Çıkış durumunu betimle." },
              { de: "Nennen Sie zwei Ursachen für die gegenwärtige Entwicklung.", tr: "Bugünkü gidişin iki nedenini söyle." },
              { de: "Stellen Sie die Lage in Ihrem Herkunftsland gegenüber.", tr: "Kendi ülkendeki durumla karşılaştır." },
              { de: "Wägen Sie Vor- und Nachteile flexibler Modelle ab.", tr: "Esnek modellerin artı ve eksilerini tart." },
              { de: "Formulieren Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuç yaz." },
            ],
            sample: `Wer heute über Arbeitszeit spricht, meint selten dieselbe Sache. Während die einen die Dauer im Blick haben, geht es den anderen um die Verfügung darüber — und erst diese Unterscheidung macht die Debatte verständlich.

Für die gegenwärtige Entwicklung lassen sich zwei Ursachen anführen. Zum einen hat die Digitalisierung die Grenze zwischen Arbeit und Nicht-Arbeit durchlässig gemacht, ohne dass sich die betriebliche Steuerung entsprechend geändert hätte. Zum anderen ist der Arbeitsmarkt in vielen Bereichen so angespannt, dass Betriebe Zugeständnisse machen, die sie vor zehn Jahren abgelehnt hätten.

In meinem Herkunftsland stellt sich die Frage anders. Dort ist die formale Arbeitszeit zwar geregelt, die tatsächliche jedoch weitgehend informell; wer früh geht, gilt als wenig engagiert. Nicht das Gesetz entscheidet, sondern die Erwartung der Umgebung.

Flexible Modelle bringen unbestreitbare Vorteile: Sie erlauben es, Sorgearbeit und Beruf zu verbinden, und sie senken erwiesenermaßen die Fluktuation. Ihr Nachteil liegt darin, dass sie Ungleichheit verstärken können, wenn nur ein Teil der Belegschaft sie in Anspruch nehmen kann. Hinzu kommt, dass die gewonnene Freiheit nicht selten mit einer stillschweigenden Erwartung dauerhafter Erreichbarkeit erkauft wird, die in keinem Vertrag steht und gerade deshalb schwer zu begrenzen ist.

Daraus folgt für mich, dass Flexibilität nur dann ein Fortschritt ist, wenn sie an verlässliche Planung gebunden wird. Andernfalls verschiebt sie lediglich, wer die Unsicherheit trägt.`,
            criteria: [
              "Beş yönlendirme noktasının hepsi işlendi mi? C1'de eksik nokta metni doğrudan alt basamağa düşürür.",
              "Noktalar arasında bağ kuruldu mu, yoksa beş ayrı paragraf mı yan yana duruyor?",
              "Karşılaştırma gerçek bir karşılaştırma mı (aynı ölçüt iki durumda)?",
              "Tartma iki yönlü mü ve her iki yön de gerekçelendirilmiş mi?",
              "Dil C1 düzeyinde mi: ad öbekleriyle yoğunlaşma, `während/zum einen … zum anderen/andernfalls` gibi bağlayıcılar, Konjunktiv II ile ölçülü ifade?",
              "Yaklaşık 200 kelime var mı?",
            ],
          },
        },
        {
          id: "de-c1-01-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an die Personalabteilung. Der Entwurf unten ist zu umgangssprachlich. Ergänzen Sie die Lücken 1 bis 10 mit einer stilistisch angemessenen Wendung. Die Funktion jeder Lücke steht in Klammern.",
          promptTr:
            "İnsan kaynaklarına yazıyorsun. Aşağıdaki taslak fazla günlük dilde. 1–10. boşlukları üsluba uygun bir ifadeyle tamamla. Her boşluğun işlevi parantez içinde yazılı.",
          texts: [
            {
              kind: "text",
              id: "br1",
              genre: "Formelles Schreiben",
              genreTr: "Resmî yazı",
              title: "An die Personalabteilung — Antrag auf ein Zeitwertkonto",
              body: `Sehr geehrte Frau Ferber,

{{1}} Ihre Informationsveranstaltung vom 12. März möchte ich einen Antrag auf Einrichtung eines Zeitwertkontos stellen.

Mein Arbeitsverhältnis besteht seit vier Jahren; die Probezeit ist {{2}} abgeschlossen. Die von Ihnen genannten Voraussetzungen erfülle ich {{3}}.

{{4}} sind mir zwei Punkte unklar geblieben. Erstens {{5}}, ob eine bereits zugesagte Weiterbildung rückwirkend aus dem Guthaben finanziert werden kann. Zweitens {{6}} die Frage, wie sich ein unbezahlter Sonderurlaub auf die Einzahlungsgrenze auswirkt.

{{7}}, mir hierzu eine schriftliche Auskunft zukommen zu lassen. Über einen Gesprächstermin in den kommenden zwei Wochen {{8}}.

{{9}} füge ich die ausgefüllte Anmeldung sowie eine Kopie meines Arbeitsvertrags bei.

{{10}}
Halim Yücel`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-01-s2-1",
              no: 1,
              text: "Lücke 1 (Bezug auf eine frühere Veranstaltung)",
              accept: [
                "Bezug nehmend auf",
                "unter Bezugnahme auf",
                "mit Bezug auf",
                "im Anschluss an",
                "Bezugnehmend auf",
              ],
              explain:
                "Resmî yazışmada bir önceki temasa gönderme kalıplaşmıştır: `Bezug nehmend auf …` ya da `im Anschluss an …`. Günlük dildeki \"wegen Ihrer Veranstaltung\" bu düzeyde uygun değildir.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-2",
              no: 2,
              text: "Lücke 2 (Zeitangabe: schon lange vorbei)",
              accept: ["seit Langem", "längst", "lange"],
              explain:
                "\"Die Probezeit ist längst abgeschlossen\" — `längst` ya da `seit Langem` hem kesinlik hem üslup düzeyi verir; \"schon lange her\" konuşma dilidir.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-3",
              no: 3,
              text: "Lücke 3 (vollständig, ohne Ausnahme)",
              accept: ["vollständig", "sämtlich", "in vollem Umfang", "ausnahmslos", "durchweg", "gänzlich", "restlos"],
              explain:
                "Koşulların tamamının karşılandığını bildiren ölçülü bir belirteç gerekiyor: `vollständig` / `in vollem Umfang`. \"komplett\" günlük dildir.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-4",
              no: 4,
              text: "Lücke 4 (einschränkender Übergang)",
              accept: ["Allerdings", "Gleichwohl", "Dennoch", "Indes", "Jedoch", "Freilich", "Nichtsdestotrotz"],
              explain:
                "Olumlu tespitin ardından bir sınırlama geliyor. `Allerdings` ya da `Gleichwohl` bu geçişi kurar; \"aber\" cümle başında bu üslupta zayıf kalır.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-5",
              no: 5,
              text: "Lücke 5 (unpersönliche Formulierung einer Frage)",
              accept: [
                "ist mir nicht klar",
                "stellt sich mir die Frage",
                "wäre zu klären",
                "ist mir unklar geblieben",
                "würde mich interessieren",
              ],
              explain:
                "Doğrudan \"ich will wissen\" yerine kişisiz ya da yumuşatılmış bir kalıp: `stellt sich mir die Frage, ob …` / `wäre zu klären, ob …`.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-6",
              no: 6,
              text: "Lücke 6 (Verb zu \"die Frage\": sich erheben)",
              accept: ["stellt sich", "erhebt sich", "ergibt sich", "besteht"],
              explain:
                "`die Frage stellt sich` kalıbı ikinci noktayı ilkine paralel bağlar. Özne `die Frage` olduğu için dönüşlü yapı gerekir.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-7",
              no: 7,
              text: "Lücke 7 (höfliche Bitte, Konjunktiv II)",
              accept: [
                "Ich wäre Ihnen dankbar",
                "Ich würde Sie bitten",
                "Ich möchte Sie bitten",
                "Ich wäre Ihnen sehr verbunden",
                "Ich bitte Sie",
              ],
              explain:
                "Resmî rica Konjunktiv II ile yumuşatılır: `Ich wäre Ihnen dankbar, mir … zukommen zu lassen`. Buyurucu \"Schicken Sie mir\" bu bağlamda uygunsuzdur.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-8",
              no: 8,
              text: "Lücke 8 (Freude über eine mögliche Zusage)",
              accept: ["würde ich mich freuen", "wäre ich dankbar", "freue ich mich"],
              explain:
                "`Über einen Gesprächstermin … würde ich mich freuen` — edat tümleci başta olduğu için fiil hemen boşlukta gelir ve Konjunktiv II ölçüyü korur.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-9",
              no: 9,
              text: "Lücke 9 (Hinweis auf Anlagen)",
              accept: ["Als Anlage", "Anbei", "Beigefügt", "In der Anlage", "Beiliegend", "Als Anlagen"],
              explain:
                "Ek belgeler `Als Anlage füge ich … bei` ya da `Anbei …` ile duyurulur; \"hier sind\" yazışma diline ait değildir.",
            },
            {
              kind: "gap",
              id: "de-c1-01-s2-10",
              no: 10,
              text: "Lücke 10 (Grußformel)",
              accept: ["Mit freundlichen Grüßen", "Mit freundlichem Gruß", "Freundliche Grüße", "Mit besten Grüßen"],
              explain:
                "Adıyla hitap edilen resmî bir yazının kapanışı `Mit freundlichen Grüßen`. \"Liebe Grüße\" özel yazışmaya aittir.",
            },
          ],
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag und eine Diskussion mit Aushandlung.",
      instructionTr: "Bu bölümde iki görev var: bir sunum ve uzlaşma arayan bir tartışma.",
      tasks: [
        {
          id: "de-c1-01-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Verfügbarkeit als neue Währung\". Behandeln Sie fünf Inhaltspunkte: Einstieg — Beschreibung der heutigen Lage — Ursachen — Folgen für verschiedene Gruppen — eigene Bewertung mit Ausblick.",
          promptTr:
            "\"Yeni bir para birimi olarak erişilebilirlik\" konusunda yaklaşık dört dakikalık bir sunum yap. Beş içerik noktasını işle: giriş — bugünkü durumun betimlenmesi — nedenler — farklı gruplar için sonuçlar — kendi değerlendirmen ve öngörün.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "das Thema pointiert einführen", tr: "Konuyu çarpıcı biçimde açmak" },
              { de: "Ursachen und Folgen auseinanderhalten", tr: "Nedenlerle sonuçları birbirinden ayırmak" },
              { de: "nach Betroffenengruppen unterscheiden", tr: "Etkilenen gruplara göre ayrım yapmak" },
              { de: "eine abgewogene Bewertung mit Ausblick geben", tr: "Ölçülü bir değerlendirme ve öngörü sunmak" },
            ],
            sample:
              "Ich möchte mit einer Beobachtung beginnen, die banal klingt und es nicht ist: Erreichbarkeit kostet inzwischen etwas. Wer abends antwortet, gibt nicht Zeit her, sondern Verfügung über Zeit — und genau diese wird knapper. Beschreiben lässt sich die Lage in einem Satz: Die Grenze zwischen Arbeit und Nicht-Arbeit verläuft nicht mehr entlang des Ortes, sondern entlang der Erwartung. Zwei Ursachen scheinen mir tragend. Erstens sind die technischen Kosten einer Kontaktaufnahme praktisch auf null gefallen, während die sozialen Kosten des Nichtantwortens gestiegen sind. Zweitens fehlt in vielen Betrieben eine Regel, was ausdrücklich nicht erwartet wird; wo nichts geregelt ist, entscheidet die vorsichtigste Vermutung. Die Folgen sind ungleich verteilt. Wer ersetzbar ist, kann schlecht ablehnen; wer gesucht wird, kann Bedingungen stellen. Für Sorgearbeit Leistende verschärft sich das zusätzlich, weil ihre freie Zeit ohnehin fremdbestimmt ist. Meine Bewertung fällt zurückhaltend aus: Ich erwarte keine Rückkehr klarer Feierabendgrenzen, halte aber ausdrückliche Nichterwartungen für den realistischeren Weg. Wenn Betriebe aufschreiben, worauf niemand antworten muss, gewinnen sie mehr als durch jede Kampagne zur Achtsamkeit.",
            criteria: [
              "Beş içerik noktası işlendi mi ve sunumun yapısı işitilebiliyor mu?",
              "Nedenler ile sonuçlar birbirine karıştırılmadan verildi mi?",
              "Etkilenen gruplar arasında gerçek bir ayrım yapıldı mı?",
              "Değerlendirme ölçülü mü, mutlak yargılardan kaçınılıyor mu?",
              "Dil C1 düzeyinde mi: soyut adlar, ad öbekleriyle yoğunlaşma, ölçü bildiren belirteçler (weitgehend, tendenziell, zurückhaltend)?",
              "Sunum dört dakikaya yakın ve akıcı mı?",
            ],
          },
        },
        {
          id: "de-c1-01-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihre Abteilung erhält Mittel für eine Maßnahme. Zur Wahl stehen: (a) Dienstpläne drei Wochen im Voraus, (b) ein Budget für Weiterbildung, (c) zwei zusätzliche freie Tage im Jahr. Diskutieren Sie Vor- und Nachteile und einigen Sie sich auf eine Lösung.",
          promptTr:
            "Bölümünüze bir uygulama için bütçe ayrıldı. Seçenekler: (a) üç hafta önceden hazırlanan vardiya planları, (b) eğitim bütçesi, (c) yılda iki ek izin günü. Artı ve eksileri tartışın ve bir çözümde anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            { who: "partner", de: "Unsere Abteilung erhält Mittel für genau eine Maßnahme. Zur Wahl stehen Dienstpläne drei Wochen im Voraus, ein Weiterbildungsbudget und zwei zusätzliche freie Tage. Wofür würden Sie plädieren?", tr: "Bölümümüze tam bir uygulama için bütçe ayrıldı. Seçenekler: üç hafta önceden vardiya planı, eğitim bütçesi ve yılda iki ek izin günü. Sen hangisini savunursun?" },
            { who: "you", hint: "Bir seçeneği seç ve ölçütünü adlandırarak gerekçelendir.", expect: "üç seçenekten birini seçmek ve gerekçeyi açık bir ölçüte bağlamak (kapsayıcılık, dayanıklılık, maliyet)", seconds: 60 },
            { who: "partner", de: "Das leuchtet mir ein, allerdings sehe ich einen Haken: Feste Pläne binden uns bei Auftragsspitzen, und die haben wir dreimal im Jahr verlässlich.", tr: "Bu bana mantıklı geldi, ama bir pürüz görüyorum: Sabit planlar sipariş yoğunluğunda elimizi bağlıyor, o da yılda üç kez düzenli oluyor." },
            { who: "you", hint: "İtirazı ele al; gerekirse konumunu düzelt.", expect: "bir itirazı ciddiye alıp karşılamak, gerekirse kendi konumunu düzeltmek", seconds: 60 },
            { who: "partner", de: "Möglich, nur fürchte ich, dass aus der Ausnahme schnell die Regel wird. Die freien Tage hätten diesen Nachteil nicht — dafür lösen sie das eigentliche Problem nicht.", tr: "Olabilir, ama istisnanın çabucak kurala dönüşmesinden korkuyorum. İzin günlerinin bu sakıncası olmaz, ama asıl sorunu da çözmez." },
            { who: "you", hint: "İki seçeneği karşılaştır ve bir orta yol öner.", expect: "iki seçeneği ölçütler üzerinden karşılaştırmak ve koşullu bir orta yol önermek", seconds: 60 },
            { who: "partner", de: "Damit kann ich mitgehen, unter einer Bedingung. Formulieren wir das gemeinsame Ergebnis?", tr: "Buna varım, tek bir koşulla. Ortak sonucu formüle edelim mi?" },
            { who: "you", hint: "Ortak kararı somut biçimde formüle et.", expect: "ortak kararı somut biçimde (süre, sayı, gözden geçirme tarihi) formüle etmek", seconds: 50 },
          ],
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "alle drei Vorschläge abwägen", tr: "Üç öneriyi de tartmak" },
              { de: "eigene Präferenz begründen", tr: "Kendi tercihini gerekçelendirmek" },
              { de: "auf Einwände eingehen und nachgeben können", tr: "İtirazları karşılamak ve gerektiğinde geri adım atmak" },
              { de: "eine gemeinsame Entscheidung aushandeln", tr: "Ortak bir karara varmak" },
            ],
            sample:
              "Ich würde für die Dienstpläne plädieren, und zwar nicht aus Prinzip, sondern weil der Effekt am breitesten verteilt ist: Davon profitieren alle, auch die, die nie zu einer Fortbildung fahren. — Das leuchtet mir ein, allerdings sehe ich einen Haken. Feste Pläne binden uns bei Auftragsspitzen, und die haben wir dreimal im Jahr verlässlich. — Der Einwand ist berechtigt. Ließe sich das nicht über eine Ausnahmeregel für benannte Wochen auffangen? — Möglich, nur fürchte ich, dass aus der Ausnahme die Regel wird. Ich neige daher eher zu den freien Tagen, weil sie sich nicht aushöhlen lassen. — Da gebe ich Ihnen recht, was die Robustheit angeht. Umgekehrt lösen zwei Tage im Jahr das eigentliche Problem nicht, nämlich die kurzfristige Planung. — Einigen wir uns doch darauf: Wir führen die Dreiwochenfrist ein, definieren höchstens drei Ausnahmewochen und überprüfen die Regelung nach einem Jahr. — Damit kann ich mitgehen, unter einer Bedingung: Die Ausnahmewochen werden im Januar festgelegt, nicht kurzfristig.",
            criteria: [
              "Üç seçenek de gerçekten tartıldı mı?",
              "Tercih bir ölçütle gerekçelendirildi mi (yaygınlık, dayanıklılık, maliyet)?",
              "İtirazlar karşılandı mı, en az bir kez geri adım atıldı mı?",
              "Anlaşma somut mu (süre, sayı, gözden geçirme tarihi)?",
              "Karşı çıkma ve uzlaşma kalıpları C1 düzeyinde mi? (Der Einwand ist berechtigt / Ließe sich das nicht … / unter einer Bedingung)",
            ],
          },
        },
      ],
    },
  ],
};
