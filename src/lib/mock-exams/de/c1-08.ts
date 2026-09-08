import type { MockPaper } from "../types";

/**
 * C1 · Deneme 8 — "Landschaft und Nutzung".
 *
 * PLAN kâğıt 1–7 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (10 özet boşluğu · 10 dört şıklı · 5 yapı boşluğu)
 *   Hören  40 dk · 25 madde   (10 not alma · 15 panel)
 *   Schreiben 80 dk           görüş yazısı (~200) + on boşluklu resmî mektup
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: peyzaj ve arazi kullanımı. C1 için verimli, çünkü tartışmanın
 * her iki tarafı da kendi konumunun bedelini ödemek zorunda: doğa korumacı
 * ödemenin onlarca yıl sürmesini kabul edecek, çiftçi ödemenin niyete değil
 * sonuca bağlanmasını. Kâğıt bu simetriyi bilerek koruyor.
 *
 * L1 METNİ bir KAVRAMI sınıyor, bir olguyu değil: "renaturasyon" sözcüğünün
 * içindeki geri dönüş varsayımını. C1 okuması budur — metnin söylediği değil,
 * söylerken varsaydığı şeyi görmek.
 *
 * L2'DE her iki tarafın da zayıf noktası yazılı: sonuç primi riski çiftliğe
 * yüklüyor, tarihsel hedeften vazgeçmek korumayı bir parka indirgeyebiliyor.
 * Maddelerin bir kısmı doğrudan bu kabulleri hedefliyor.
 *
 * SÜRE: konuşma bölümündeki iki görevin de `minutes` alanı yazılı; `taskSeconds`
 * açık süreyi ancak bölümün TÜM görevlerinde varsa kullanıyor.
 */
export const C1_08: MockPaper = {
  id: "de-c1-08",
  course: "de",
  level: "C1",
  no: 8,
  theme: "Landschaft und Nutzung",
  themeTr: "Peyzaj ve arazi kullanımı",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben: eine Zusammenfassung ergänzen, einen Essay auswerten und einen Text strukturell schließen.",
      instructionTr:
        "Bu bölümde üç görev var: bir özeti tamamlamak, bir deneme metnini çözümlemek ve bir metni yapısal olarak kapatmak.",
      tasks: [
        {
          id: "de-c1-08-l1",
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
              title: "Die Rückkehr, die keine war",
              body: `Wenn ein Fluss begradigt wurde und Jahrzehnte später wieder mäandrieren darf, spricht man von Renaturierung. Der Begriff enthält indes eine Annahme, die selten geprüft wird: dass es einen Zustand gibt, zu dem zurückgekehrt werden kann.

Diese Annahme ist historisch schwach. Die mitteleuropäische Landschaft wird seit Jahrtausenden bearbeitet; ein unberührter Ausgangspunkt lässt sich nicht bestimmen. Wer ein Datum wählt, wählt mithin eine Vorliebe und keine Tatsache.

Praktisch ist das weniger folgenlos, als es klingt. Projekte werden an Zielbildern gemessen, und Zielbilder entscheiden über Erfolg. Ein Auenwald von 1750 verlangt andere Maßnahmen als eine Fläche, die möglichst viele Arten trägt.

Die Fachdiskussion hat sich deshalb verschoben. Statt nach dem früheren Zustand wird zunehmend nach Funktionen gefragt: Rückhalt bei Hochwasser, Kühlung, Speicherung von Kohlenstoff. Das ist bescheidener und zugleich überprüfbar.

Widerstand kommt nicht nur von den Nutzern der Fläche. Auch im Naturschutz selbst gilt der Verzicht auf ein historisches Ziel manchen als Aufgabe des eigentlichen Anliegens. Wer nur noch Funktionen sichert, so das Argument, verteidigt am Ende einen Park.

Der Einwand hat Gewicht und lässt sich gleichwohl entkräften. Funktionen sind messbar, historische Bilder sind es nicht — und was ohnehin nicht gemessen wird, geht im Konflikt um Flächen regelmäßig verloren.`,
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              body: `Der Begriff Renaturierung unterstellt einen {{1}}, zu dem eine Landschaft zurückkehren könnte. Historisch ist diese Annahme {{2}}, weil die mitteleuropäische Landschaft seit Jahrtausenden {{3}} wird.

Wer dennoch ein Datum festlegt, trifft damit eine {{4}} und keine Feststellung. Folgenlos ist das nicht, denn Projekte werden an {{5}} gemessen, und diese entscheiden über den Erfolg.

Die Fachdiskussion fragt deshalb zunehmend nach {{6}} statt nach dem früheren Zustand. Genannt werden Hochwasserrückhalt, Kühlung und die {{7}} von Kohlenstoff.

Widerstand kommt auch aus dem {{8}} selbst: Wer auf ein historisches Ziel verzichte, gebe das eigentliche Anliegen auf und verteidige am Ende nur noch einen {{9}}.

Der Autor hält dagegen, dass Funktionen {{10}} sind und historische Bilder nicht.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-08-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Zustand", "Ausgangspunkt", "Urzustand"],
              explain:
                "Metin varsayımı adıyla veriyor: \"dass es einen Zustand gibt, zu dem zurückgekehrt werden kann\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["schwach", "haltlos", "fragwürdig"],
              explain:
                "Yargı doğrudan veriliyor: \"Diese Annahme ist historisch schwach.\" Gerekçe de hemen ardından geliyor — bin yıllardır işlenen bir peyzajda dokunulmamış bir başlangıç noktası saptanamıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["bearbeitet", "genutzt", "verändert"],
              explain:
                "Gerekçe aynı cümlede: \"Die mitteleuropäische Landschaft wird seit Jahrtausenden bearbeitet.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["Vorliebe", "Wahl", "Entscheidung"],
              explain:
                "\"Wer ein Datum wählt, wählt mithin eine Vorliebe und keine Tatsache\" — tarih seçimi bir tercihtir.",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Zielbildern", "Zielen", "Leitbildern"],
              explain:
                "\"Projekte werden an Zielbildern gemessen, und Zielbilder entscheiden über Erfolg.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Funktionen", "Leistungen", "Wirkungen"],
              explain:
                "Kayma metinde: \"Statt nach dem früheren Zustand wird zunehmend nach Funktionen gefragt.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["Speicherung", "Bindung", "Festlegung"],
              explain:
                "Üç işlev sayılıyor ve üçüncüsü bu: \"Rückhalt bei Hochwasser, Kühlung, Speicherung von Kohlenstoff\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Naturschutz", "Lager", "Fach"],
              explain:
                "\"Auch im Naturschutz selbst gilt der Verzicht auf ein historisches Ziel manchen als Aufgabe des eigentlichen Anliegens.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Park", "Garten", "Ziergarten"],
              explain:
                "İtirazın son sözü: \"verteidigt am Ende einen Park\" — yani korunan şey doğa olmaktan çıkıp bakımlı bir alan hâline gelir.",
            },
            {
              kind: "gap",
              id: "de-c1-08-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["messbar", "überprüfbar", "quantifizierbar"],
              explain:
                "Yazarın karşı savı: \"Funktionen sind messbar, historische Bilder sind es nicht\".",
            },
          ],
        },
        {
          id: "de-c1-08-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Essay und die Aufgaben 11 bis 20. Wählen Sie: a, b, c oder d.",
          promptTr: "Deneme metnini ve 11–20. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Essay",
              genreTr: "Deneme",
              title: "Das Feld und das Bild",
              body: `Wer im Frühjahr durch eine Agrarlandschaft fährt, sieht zwei Dinge gleichzeitig, ohne sie voneinander trennen zu können: eine Produktionsfläche und ein Bild. Die Fläche ernährt, das Bild beruhigt. Der Konflikt, der seit Jahren geführt wird, ist zu einem erheblichen Teil ein Konflikt zwischen diesen beiden.

Das zeigt sich an einem Detail, das selten auffällt. In Befragungen nennen Menschen als Wunschlandschaft fast immer eine Struktur, die es so nur unter bestimmten wirtschaftlichen Bedingungen gab: kleine Schläge, Hecken, Streuobst. Diese Struktur war nicht das Ergebnis einer Vorliebe, sondern der Preis fehlender Maschinen. Sie kehrt nicht zurück, indem man sie lobt; sie kehrt zurück, wenn jemand sie bezahlt.

Genau das geschieht seit Jahren, und die Ergebnisse fallen uneinheitlich aus. Programme, die einzelne Maßnahmen honorieren, erreichen viele Betriebe und wenig Wirkung. Programme, die Ergebnisse honorieren — eine bestimmte Zahl von Arten auf einer Fläche —, erreichen wenige Betriebe und weitaus mehr Wirkung. Der Grund ist banal: Das erste Modell verlangt eine Unterschrift, das zweite ein Risiko.

Hier beginnt der Teil der Debatte, der ungern geführt wird. Wer Ergebnisse honoriert, verlagert Unsicherheit auf den Betrieb. Ein trockener Sommer kann eine Zahlung kosten, die längst eingeplant war. Landwirtschaftliche Betriebe sind, anders als das öffentliche Bild nahelegt, überwiegend nicht in der Lage, solche Schwankungen zu tragen.

Man kann daraus schließen, dass Ergebnisprämien ungeeignet seien. Näher liegt eine andere Folgerung: Sie sind geeignet, aber zu knapp bemessen. Eine Prämie, die das Risiko nicht mitbezahlt, ist keine Prämie, sondern eine Wette.

Bemerkenswert ist, wie selten die Gegenrechnung aufgemacht wird. Was kostet die Alternative? Hochwasserschäden, Trinkwasseraufbereitung, der Rückgang der Bestäubung — all das erscheint in anderen Haushalten und wird deshalb nicht zugerechnet. Solange getrennt gebucht wird, sieht jede Maßnahme teuer aus.

Ein weiterer Punkt betrifft die Sprache. In der öffentlichen Debatte stehen Landwirtschaft und Naturschutz einander gegenüber, als handelte es sich um zwei geschlossene Gruppen. Tatsächlich verläuft die Trennlinie quer durch beide. Es gibt Betriebe, die seit zwanzig Jahren Flächen extensivieren, und es gibt Verbände, die auf Flächen bestehen, deren Pflege niemand leisten kann.

Was folgt daraus? Zunächst eine Zumutung für beide Seiten. Wer Landschaft will, muss sie bezahlen, und zwar verlässlich über Jahrzehnte und nicht in Förderperioden. Wer Betriebe schützen will, muss hinnehmen, dass Zahlungen an Ergebnisse gebunden werden und nicht an Absichten.

Ich vermute, dass beides nicht geschehen wird. Nicht weil die Argumente fehlten, sondern weil ein Haushalt in Legislaturperioden denkt und eine Hecke in Jahrzehnten. Dieses Auseinanderfallen der Fristen ist das eigentliche Hindernis, und es lässt sich mit besserer Argumentation nicht auflösen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-08-l2-11",
              no: 11,
              ref: "t2",
              text: "Worin sieht der Autor den Kern des Konflikts?",
              options: [
                "Ein Streit zwischen zwei festen Gruppen.",
                "Der Gegensatz von Fläche und Bild.",
                "Die wachsende Zahl der Maschinen.",
                "Die Höhe der Förderung.",
              ],
              answer: 1,
              explain:
                "İlk paragraf iki şeyi ayırıyor: \"Die Fläche ernährt, das Bild beruhigt\" — ve çatışmayı \"zu einem erheblichen Teil ein Konflikt zwischen diesen beiden\" olarak tanımlıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-12",
              no: 12,
              ref: "t2",
              text: "Wie erklärt der Autor die Wunschlandschaft der Befragten?",
              options: [
                "Als Ausdruck einer alten Vorliebe.",
                "Als Ergebnis gezielter Förderung.",
                "Als reine Erfindung der Werbung.",
                "Als Folge fehlender Maschinen.",
              ],
              answer: 3,
              explain:
                "Beğeni açıklamasını açıkça reddediyor: \"nicht das Ergebnis einer Vorliebe, sondern der Preis fehlender Maschinen\".",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-13",
              no: 13,
              ref: "t2",
              text: "Worin unterscheiden sich die beiden Programmtypen?",
              options: [
                "In Reichweite und Wirkung.",
                "In der Höhe der Zahlungen.",
                "In der Dauer der jeweiligen Laufzeit.",
                "In der zuständigen Behörde.",
              ],
              answer: 0,
              explain:
                "Karşıtlık simetrik kuruluyor: biri \"viele Betriebe und wenig Wirkung\", öteki \"wenige Betriebe und weitaus mehr Wirkung\".",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-14",
              no: 14,
              ref: "t2",
              text: "Was verlangt das Ergebnismodell vom Betrieb?",
              options: ["Eine Unterschrift.", "Eine Zertifizierung.", "Ein Risiko.", "Eine Investition."],
              answer: 2,
              explain:
                "Fark tek cümleye indiriliyor: \"Das erste Modell verlangt eine Unterschrift, das zweite ein Risiko.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-15",
              no: 15,
              ref: "t2",
              text: "Wie bewertet der Autor Ergebnisprämien?",
              options: [
                "Als im Kern verfehlt.",
                "Als tauglich, aber zu gering.",
                "Als vollständig ausreichend.",
                "Als rechtlich völlig unzulässig.",
              ],
              answer: 1,
              explain:
                "Yaygın çıkarımı geride bırakıyor: \"Näher liegt eine andere Folgerung: Sie sind geeignet, aber zu knapp bemessen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-16",
              no: 16,
              ref: "t2",
              text: "Was kritisiert der Autor an der Kostenrechnung?",
              options: [
                "Folgekosten werden anderswo gebucht.",
                "Die Prämien sind viel zu hoch angesetzt.",
                "Die Betriebe rechnen falsch.",
                "Die Behörden rechnen doppelt.",
              ],
              answer: 0,
              explain:
                "Sel hasarı, su arıtımı ve tozlaşma kaybı \"erscheint in anderen Haushalten und wird deshalb nicht zugerechnet\" — ayrı defter tutulduğu sürece her önlem pahalı görünüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-17",
              no: 17,
              ref: "t2",
              text: "Was sagt der Autor über die Aufteilung in zwei Lager?",
              options: [
                "Sie entspricht der öffentlichen Debatte.",
                "Sie trennt Betriebe von Verbänden.",
                "Sie ist erst neu entstanden.",
                "Sie geht mitten durch beide Lager.",
              ],
              answer: 3,
              explain:
                "Kamusal tabloyu düzeltiyor: \"Tatsächlich verläuft die Trennlinie quer durch beide\" — hem uzun süredir yoğunluğu azaltan çiftlikler hem de bakımı imkânsız alanlarda ısrar eden dernekler var.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-18",
              no: 18,
              ref: "t2",
              text: "Welche Zumutung nennt er für diejenigen, die Landschaft erhalten wollen?",
              options: [
                "Zahlungen an Ergebnisse zu binden.",
                "Förderperioden deutlich zu verkürzen.",
                "Landschaft dauerhaft zu bezahlen.",
                "Auf Flächen ganz zu verzichten.",
              ],
              answer: 2,
              explain:
                "İki külfet simetrik veriliyor; bu taraf için olanı: \"muss sie bezahlen, und zwar verlässlich über Jahrzehnte und nicht in Förderperioden\".",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-19",
              no: 19,
              ref: "t2",
              text: "Worin sieht der Autor das eigentliche Hindernis?",
              options: [
                "In den bislang fehlenden Argumenten.",
                "Im Auseinanderfallen der Fristen.",
                "Im organisierten Widerstand der Betriebe.",
                "In der geltenden Gesetzgebung.",
              ],
              answer: 1,
              explain:
                "Engeli argümanlarda görmüyor: bütçe seçim dönemleriyle, çit ise onlarca yılla düşünüyor — \"Dieses Auseinanderfallen der Fristen ist das eigentliche Hindernis\".",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l2-20",
              no: 20,
              ref: "t2",
              text: "Wie schätzt der Autor die Aussicht auf Umsetzung ein?",
              options: [
                "Er hält sie für wahrscheinlich.",
                "Er äußert sich nicht dazu.",
                "Er hält sie für gesichert.",
                "Er hält sie für gering.",
              ],
              answer: 3,
              explain:
                "\"Ich vermute, dass beides nicht geschehen wird\" — üstelik gerekçeyi argümanların zayıflığına değil zaman ölçeklerinin uyuşmazlığına bağlıyor.",
            },
          ],
        },
        {
          id: "de-c1-08-l3",
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
              title: "Der Wald, der gepflanzt wird",
              body: `Nach jedem trockenen Sommer wird gepflanzt. Gepflanzt wird dabei {{21}} das, was gerade verfügbar ist.

Fachleute halten das für den teuersten Weg. Eine Fläche, auf der Bäume von selbst aufwachsen, bringt in der Regel mehr Arten hervor, {{22}} sie langsamer beginnt. Die ersten Jahre sehen nach Versäumnis aus.

Dagegen steht ein praktisches Problem: Wild frisst junge Triebe. Ohne Regulierung entsteht {{23}} kein Wald, sondern eine Wiese mit einzelnen Bäumen.

Die Fachdebatte ist deshalb weniger eine über das Pflanzen {{24}} eine über die Jagd. Gesagt wird das selten, weil der zweite Streit der unangenehmere ist.

Was sich sagen lässt: Wer heute pflanzt, entscheidet über einen Bestand, {{25}} in achtzig Jahren geerntet wird.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-08-l3-21",
              no: 21,
              ref: "t3",
              text: "Lücke 21",
              options: ["allzu häufig", "so gut wie nie", "in keinem Fall", "zu keiner Zeit"],
              answer: 0,
              explain:
                "Sonraki paragraf bu uygulamayı eleştiriyor (\"den teuersten Weg\"), yani sık yapıldığını varsayıyor. Üç olumsuz seçenek metnin kendi eleştirisini anlamsız kılardı.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l3-22",
              no: 22,
              ref: "t3",
              text: "Lücke 22",
              options: ["sofern", "damit", "als ob", "auch wenn"],
              answer: 3,
              explain:
                "Yavaş başlaması bir dezavantaj, tür zenginliği bir avantaj: ödün bildiren `auch wenn` bu karşıtlığı kurar. `sofern` koşul, `damit` amaç bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l3-23",
              no: 23,
              ref: "t3",
              text: "Lücke 23",
              options: ["indes", "immerhin", "mithin", "gleichwohl"],
              answer: 2,
              explain:
                "Yaban hayvanı sürgünleri yiyorsa sonuç çıkarımdır; `mithin` bu çıkarımı işaretler. `indes` ve `gleichwohl` karşıtlık kurar, `immerhin` ödün verir.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l3-24",
              no: 24,
              ref: "t3",
              text: "Lücke 24",
              options: ["wie", "als", "denn", "sondern"],
              answer: 1,
              explain:
                "`weniger …` karşılaştırması `als` ister: \"weniger eine über das Pflanzen als eine über die Jagd\". `sondern` önünde olumsuzlama gerektirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-l3-25",
              no: 25,
              ref: "t3",
              text: "Lücke 25",
              options: ["den", "dem", "dessen", "der"],
              answer: 3,
              explain:
                "İlgi cümlesinin öznesi `Bestand` ve yüklem edilgen: \"einen Bestand, der in achtzig Jahren geerntet wird\". Yalın hâl gerekiyor.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat zwei Aufgaben: Notizen ergänzen und eine Podiumsdiskussion auswerten.",
      instructionTr: "Bu bölümde iki görev var: notları tamamlamak ve bir panel tartışmasını çözümlemek.",
      tasks: [
        {
          id: "de-c1-08-h1",
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
              title: "Die Aue am Mühlbach — Bürgerinformation",
              situation: "Su işleri dairesinden biri bir dere projesini anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Beate Ahrens, ich arbeite beim Wasserwirtschaftsamt. Ich stelle Ihnen heute das Vorhaben am Mühlbach vor und beginne mit dem, was es nicht ist: Es ist keine Rückkehr zu einem früheren Zustand. Diesen Zustand könnten wir gar nicht bestimmen.",
                },
                {
                  text: "Es geht um eine Strecke von zwei Komma vier Kilometern zwischen der Brücke am Sägewerk und der Gemeindegrenze. Der Bach wurde dort in den fünfziger Jahren begradigt.",
                },
                {
                  text: "Das Ziel ist nicht ein bestimmtes Bild, sondern eine Funktion: Rückhalt bei Hochwasser. Gerechnet wird mit rund vierzigtausend Kubikmetern, die die Fläche bei einem größeren Ereignis aufnehmen kann.",
                },
                {
                  text: "Zur Fläche: Wir brauchen etwa achtzehn Hektar. Vierzehn davon gehören bereits der Gemeinde. Über die restlichen vier verhandeln wir, und zwar über Tausch, nicht über Enteignung. Das sage ich deutlich, weil das die häufigste Sorge ist.",
                },
                {
                  text: "Die Bauzeit beträgt voraussichtlich zwei Jahre. Der Weg am Nordufer bleibt durchgehend offen; gesperrt wird nur der südliche Uferweg, und der auch nicht dauerhaft.",
                },
                {
                  text: "Zur Finanzierung: Achtzig Prozent trägt das Land, den Rest die Gemeinde. Für die Unterhaltung danach ist ausschließlich die Gemeinde zuständig, und das über mindestens fünfundzwanzig Jahre.",
                },
                {
                  text: "Ein Punkt, der oft unterschätzt wird: Die Wirkung zeigt sich nicht sofort. Bei vergleichbaren Vorhaben hat es etwa sieben Jahre gedauert, bis die Vegetation den Rückhalt tatsächlich stabilisiert hat.",
                },
                {
                  text: "Was wir messen werden: den Wasserstand, die Fließgeschwindigkeit und die Zahl der Arten auf drei festen Probeflächen. Die Ergebnisse veröffentlichen wir jährlich im Amtsblatt.",
                },
                {
                  text: "Und was wir von Ihnen brauchen: Einwendungen bitte schriftlich bis zum dreißigsten September. Danach ist eine Berücksichtigung im Verfahren nicht mehr möglich.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizen",
              genreTr: "Notlar",
              body: `Vorhaben ist ausdrücklich keine {{1}} zu einem früheren Zustand.

Länge der Strecke: {{2}}.

Ziel ist eine Funktion: {{3}} bei Hochwasser.

Aufnahmevermögen der Fläche: rund {{4}} Kubikmeter.

Benötigte Fläche insgesamt: etwa {{5}} Hektar.

Über die restlichen vier Hektar wird verhandelt — über {{6}}, nicht über Enteignung.

Gesperrt wird nur der {{7}} Uferweg.

Unterhaltung danach: allein die {{8}}, mindestens 25 Jahre.

Wirkung zeigt sich erst nach etwa {{9}}.

Einwendungen schriftlich bis {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-08-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Rückkehr", "Wiederherstellung"],
              explain:
                "Konuşma bununla açılıyor: \"Es ist keine Rückkehr zu einem früheren Zustand. Diesen Zustand könnten wir gar nicht bestimmen.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["2,4 Kilometer", "zwei Komma vier Kilometer", "2,4 km"],
              explain:
                "\"eine Strecke von zwei Komma vier Kilometern zwischen der Brücke am Sägewerk und der Gemeindegrenze\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["Rückhalt", "Wasserrückhalt"],
              explain:
                "Hedef bir görüntü değil bir işlev: \"Das Ziel ist nicht ein bestimmtes Bild, sondern eine Funktion: Rückhalt bei Hochwasser.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["40.000", "vierzigtausend", "40000"],
              explain:
                "\"Gerechnet wird mit rund vierzigtausend Kubikmetern, die die Fläche bei einem größeren Ereignis aufnehmen kann.\"",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["18", "achtzehn"],
              explain:
                "İki sayı ayrılmalı: gereken toplam \"etwa achtzehn Hektar\", bunun on dördü zaten belediyenin.",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["Tausch", "Flächentausch"],
              explain:
                "Konuşmacı bunu özellikle vurguluyor: \"und zwar über Tausch, nicht über Enteignung\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["südliche", "südlichen", "Süduferweg"],
              explain:
                "Kuzey yakası açık kalıyor; \"gesperrt wird nur der südliche Uferweg, und der auch nicht dauerhaft\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["Gemeinde", "Kommune"],
              explain:
                "Yapım masrafının yüzde sekseni eyalete ait, ama sonrasında \"ist ausschließlich die Gemeinde zuständig\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["sieben Jahren", "7 Jahren", "sieben Jahre"],
              explain:
                "\"hat es etwa sieben Jahre gedauert, bis die Vegetation den Rückhalt tatsächlich stabilisiert hat\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["30. September", "dreißigsten September", "30.09."],
              explain:
                "Son cümle süreyi ve sonucunu veriyor: \"bis zum dreißigsten September. Danach ist eine Berücksichtigung im Verfahren nicht mehr möglich.\"",
            },
          ],
        },
        {
          id: "de-c1-08-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 11 bis 25: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. 11–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              situation: "Üç konuk tarım alanlarının kullanımını tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Herr Wollschläger, Sie bewirtschaften zweihundert Hektar. Was stört Sie an der aktuellen Förderung am meisten?",
                },
                {
                  speaker: "Herr Wollschläger",
                  text: "Nicht die Höhe, sondern die Laufzeit. Ich soll eine Hecke pflanzen, deren Förderung in fünf Jahren ausläuft, und die Hecke steht dann vierzig Jahre. Wer pflegt sie im Jahr sechs?",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Baumgartner, Sie vertreten einen Naturschutzverband. Ist das ein berechtigter Einwand?",
                },
                {
                  speaker: "Frau Baumgartner",
                  text: "Er ist berechtigt, und wir hören ihn ungern, weil er auf unsere eigene Schwäche zeigt. Wir haben jahrelang Anlage gefordert und Pflege für selbstverständlich gehalten. Das war ein Fehler.",
                },
                {
                  speaker: "Herr Nedelcu",
                  text: "Aus kommunaler Sicht kommt etwas hinzu: Wir bekommen Mittel für Investitionen und fast keine für Unterhaltung. Das ist keine Bosheit, sondern Haushaltslogik. Investitionen lassen sich abbilden, Pflege nicht.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Baumgartner, was folgt daraus für Ihre Forderungen?",
                },
                {
                  speaker: "Frau Baumgartner",
                  text: "Dass wir weniger Flächen fordern sollten und längere Zeiträume. Eine gepflegte Fläche über dreißig Jahre bringt mehr als drei angelegte über fünf.",
                },
                {
                  speaker: "Herr Wollschläger",
                  text: "Dem stimme ich zu, mit einer Einschränkung: Lange Bindung heißt für mich auch, dass ich über die Fläche nicht mehr verfüge. Wer das verlangt, muss es bezahlen — und zwar nicht nach Aufwand, sondern nach entgangenem Ertrag.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Herr Nedelcu, ist das für eine Gemeinde tragbar?",
                },
                {
                  speaker: "Herr Nedelcu",
                  text: "Ehrlich gesagt nein, nicht aus eigener Kraft. Ich halte den Ansatz trotzdem für richtig. Wenn das Land das nicht mitträgt, sollten wir es lassen, statt es halb zu tun.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Baumgartner, ein häufiger Vorwurf lautet, der Naturschutz kenne die Betriebe nicht.",
                },
                {
                  speaker: "Frau Baumgartner",
                  text: "Für einen Teil unserer Verbände trifft das zu. Wer eine Bewirtschaftung fordert, ohne je eine Kalkulation gesehen zu haben, sollte damit vorsichtig sein.",
                },
                {
                  speaker: "Herr Wollschläger",
                  text: "Und umgekehrt gilt dasselbe. Ich kenne Kollegen, die über Artenzahlen sprechen, ohne je eine Kartierung gelesen zu haben. Der Vorwurf lässt sich in beide Richtungen erheben.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Ein letzter Punkt: Was wäre der erste Schritt?",
                },
                {
                  speaker: "Herr Nedelcu",
                  text: "Unterhaltung eigenständig finanzieren. Solange sie im Investitionshaushalt mitläuft, verschwindet sie beim ersten Sparbeschluss.",
                },
                {
                  speaker: "Herr Wollschläger",
                  text: "Verträge über zwanzig Jahre statt über fünf. Alles andere ist für einen Betrieb nicht planbar.",
                },
                {
                  speaker: "Frau Baumgartner",
                  text: "Und weniger Fläche, dafür verbindlich. Ich weiß, wie das in unseren eigenen Reihen ankommt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-08-h2-11",
              no: 11,
              ref: "d1",
              text: "Was stört Herrn Wollschläger an der Förderung?",
              options: ["Die Höhe der Beträge.", "Die kurze Laufzeit.", "Der bürokratische Aufwand."],
              answer: 1,
              explain:
                "İlk cümlesi ayrımı kuruyor: \"Nicht die Höhe, sondern die Laufzeit.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-12",
              no: 12,
              ref: "d1",
              text: "Womit veranschaulicht er das Problem?",
              options: [
                "Mit dem Verhältnis von Förderdauer und Standzeit.",
                "Mit den Preisen für Setzlinge.",
                "Mit der Zahl seiner Hektar.",
              ],
              answer: 0,
              explain:
                "Beş yıllık destekle kırk yıl duran bir çit karşılaştırılıyor: \"Wer pflegt sie im Jahr sechs?\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-13",
              no: 13,
              ref: "d1",
              text: "Wie reagiert Frau Baumgartner auf den Einwand?",
              options: [
                "Sie weist ihn zurück.",
                "Sie hält ihn für zweitrangig.",
                "Sie erkennt ihn an.",
              ],
              answer: 2,
              explain:
                "Kabul edip kendi tarafına yöneltiyor: \"Er ist berechtigt, und wir hören ihn ungern, weil er auf unsere eigene Schwäche zeigt.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-14",
              no: 14,
              ref: "d1",
              text: "Welchen Fehler räumt sie für ihre Seite ein?",
              options: [
                "Anlage gefordert, Pflege vorausgesetzt.",
                "Zu wenige Flächen verlangt.",
                "Betriebe zu stark einbezogen.",
              ],
              answer: 0,
              explain:
                "\"Wir haben jahrelang Anlage gefordert und Pflege für selbstverständlich gehalten. Das war ein Fehler.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-15",
              no: 15,
              ref: "d1",
              text: "Wie erklärt Herr Nedelcu das kommunale Problem?",
              options: [
                "Mit fehlendem politischen Willen.",
                "Mit der Logik des Haushalts.",
                "Mit dem Widerstand der Betriebe.",
              ],
              answer: 1,
              explain:
                "Kötü niyeti açıkça eliyor: \"Das ist keine Bosheit, sondern Haushaltslogik. Investitionen lassen sich abbilden, Pflege nicht.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-16",
              no: 16,
              ref: "d1",
              text: "Was schließt Frau Baumgartner daraus für ihre Forderungen?",
              options: [
                "Mehr Flächen, kürzere Zeiträume.",
                "Gleich viel Fläche, mehr Geld.",
                "Weniger Flächen, längere Zeiträume.",
              ],
              answer: 2,
              explain:
                "Karşılaştırmayı sayıyla veriyor: \"Eine gepflegte Fläche über dreißig Jahre bringt mehr als drei angelegte über fünf.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-17",
              no: 17,
              ref: "d1",
              text: "Welche Einschränkung macht Herr Wollschläger dazu?",
              options: [
                "Lange Bindung muss vergütet werden.",
                "Lange Bindung ist grundsätzlich abzulehnen.",
                "Lange Bindung betrifft nur große Betriebe.",
              ],
              answer: 0,
              explain:
                "Onaylıyor ama koşul koyuyor: uzun bağlanma tasarruf hakkını alıyor, \"Wer das verlangt, muss es bezahlen\".",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-18",
              no: 18,
              ref: "d1",
              text: "Wonach soll die Vergütung nach ihm bemessen werden?",
              options: [
                "Nach dem Aufwand.",
                "Nach der Fläche.",
                "Nach dem entgangenen Ertrag.",
              ],
              answer: 2,
              explain:
                "İki ölçütü karşı karşıya koyuyor: \"nicht nach Aufwand, sondern nach entgangenem Ertrag\".",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-19",
              no: 19,
              ref: "d1",
              text: "Wie antwortet Herr Nedelcu auf die Frage nach der Tragbarkeit?",
              options: [
                "Tragbar, aber unerwünscht.",
                "Nicht tragbar, dennoch richtig.",
                "Tragbar und unproblematisch.",
              ],
              answer: 1,
              explain:
                "İkisini birlikte söylüyor: \"Ehrlich gesagt nein, nicht aus eigener Kraft. Ich halte den Ansatz trotzdem für richtig.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-20",
              no: 20,
              ref: "d1",
              text: "Was zieht er einer halben Umsetzung vor?",
              options: ["Den Verzicht.", "Eine Verschiebung.", "Eine Teilfinanzierung."],
              answer: 0,
              explain:
                "\"Wenn das Land das nicht mitträgt, sollten wir es lassen, statt es halb zu tun.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie geht Frau Baumgartner mit dem Vorwurf gegen den Naturschutz um?",
              options: [
                "Sie bestreitet ihn für alle Verbände.",
                "Sie hält ihn für böswillig.",
                "Sie bestätigt ihn für einen Teil.",
              ],
              answer: 2,
              explain:
                "Sınırlı bir kabul: \"Für einen Teil unserer Verbände trifft das zu\" — hesap görmeden işletme biçimi talep edenleri uyarıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-22",
              no: 22,
              ref: "d1",
              text: "Was ergänzt Herr Wollschläger dazu?",
              options: [
                "Der Vorwurf gilt auch umgekehrt.",
                "Der Vorwurf ist unbegründet.",
                "Der Vorwurf betrifft nur Verbände.",
              ],
              answer: 0,
              explain:
                "Kendi tarafına da uyguluyor: kartlama okumadan tür sayısı konuşan meslektaşları var — \"Der Vorwurf lässt sich in beide Richtungen erheben.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-23",
              no: 23,
              ref: "d1",
              text: "Was nennt Herr Nedelcu als ersten Schritt?",
              options: [
                "Längere Verträge.",
                "Eigenständige Finanzierung der Pflege.",
                "Weniger Fläche.",
              ],
              answer: 1,
              explain:
                "Gerekçesiyle: yatırım bütçesinde kaldığı sürece bakım \"beim ersten Sparbeschluss\" kayboluyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-24",
              no: 24,
              ref: "d1",
              text: "Was fordert Herr Wollschläger als ersten Schritt?",
              options: [
                "Verträge über zwanzig Jahre.",
                "Höhere Prämien je Hektar.",
                "Weniger Auflagen.",
              ],
              answer: 0,
              explain:
                "\"Verträge über zwanzig Jahre statt über fünf. Alles andere ist für einen Betrieb nicht planbar.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-08-h2-25",
              no: 25,
              ref: "d1",
              text: "Was ist an Frau Baumgartners Schlusssatz bemerkenswert?",
              options: [
                "Sie stellt eine neue Forderung auf.",
                "Sie widerspricht den beiden anderen.",
                "Sie rechnet mit Widerstand in den eigenen Reihen.",
              ],
              answer: 2,
              explain:
                "Talebini söyledikten sonra bedelini de ekliyor: \"Ich weiß, wie das in unseren eigenen Reihen ankommt.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "Dieser Teil hat zwei Aufgaben: eine Stellungnahme und einen förmlichen Brief mit Lücken.",
      instructionTr: "Bu bölümde iki görev var: bir görüş yazısı ve boşluklu resmî bir mektup.",
      tasks: [
        {
          id: "de-c1-08-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Regionalzeitung stand: \"Wer Landschaft erhalten will, soll Flächen kaufen statt Auflagen zu machen.\" Schreiben Sie eine Stellungnahme (circa 200 Wörter). Ordnen Sie die These ein, prüfen Sie sie an einem Beispiel, nennen Sie einen Einwand gegen Ihre eigene Position und ziehen Sie eine Schlussfolgerung.",
          promptTr:
            "Bir yerel gazetede şöyle yazdı: \"Peyzajı korumak isteyen şart koşmak yerine arazi satın alsın.\" Bir görüş yazısı yaz (yaklaşık 200 kelime). Savı yerine oturt, bir örnekle sına, kendi konumuna yönelik bir itirazı da söyle ve bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Die These präzise einordnen.", tr: "Savı tam olarak yerine oturt." },
              { de: "An einem Beispiel prüfen.", tr: "Bir örnekle sına." },
              { de: "Einen Einwand gegen die eigene Position nennen.", tr: "Kendi konumuna itiraz getir." },
              { de: "Eine begründete Schlussfolgerung ziehen.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Der Vorschlag klingt nach einer sauberen Lösung und verschiebt doch nur den Ort des Problems. Wer eine Fläche kauft, hat sie erworben, aber nicht gepflegt. Eine Wiese, die niemand mäht, verliert binnen weniger Jahre genau die Arten, um derentwillen sie gekauft wurde. Der Kaufpreis ist eine einmalige Zahl; die Pflege ist eine dauerhafte.

Prüfen lässt sich das an den kommunalen Ausgleichsflächen. Sie sind erworben, rechtlich gesichert und in vielen Gemeinden seit Jahren ungepflegt, weil Investitionsmittel bereitstanden und Unterhaltungsmittel nicht. Die Fläche gehört der Allgemeinheit und leistet gleichwohl weniger als ein bewirtschafteter Streifen, für den jemand jährlich bezahlt wird. Erworben ist eben noch nicht erhalten, und genau diese Verwechslung steckt in der zitierten Empfehlung.

Gegen meine eigene Position spricht allerdings ein starkes Argument: Auflagen binden Betriebe an Entscheidungen, die sie nicht getroffen haben, und sie enden mit der Förderperiode. Eigentum endet nicht. Wer auf Verträge setzt, muss deshalb erklären, was im Jahr einundzwanzig geschieht — und diese Antwort fällt regelmäßig dünn aus.

Meine Schlussfolgerung lautet daher nicht Kauf oder Auflage, sondern Bindung an Dauer. Beide Wege sind tragfähig, sobald die Pflege gesichert ist, und beide scheitern, sobald sie es nicht ist. Entscheidend ist nicht, wem die Fläche gehört, sondern ob die Pflege über Jahrzehnte finanziert ist. Alles andere erzeugt Eigentum ohne Wirkung.`,
            criteria: [
              "Sav gerçekten yerine oturtuldu mu — hangi ayrım kurulmadan sav ayakta duruyor?",
              "Örnek savı sınıyor mu, yoksa yalnız yazarın konumunu resimliyor mu?",
              "İtiraz kendi konumuna mı yönelik ve gerçekten güçlü mü?",
              "Sonuç itirazdan sonra hâlâ ayakta mı?",
              "Yaklaşık 200 kelime var mı; metin bölümlenmiş ve bağlaçlarla yürütülmüş mü?",
              "C1 yapıları (adlaştırma, edilgen, ölçü belirteçleri, `lässt sich`) kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-c1-08-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben als Anwohnerin an die Gemeinde und erheben Einwendungen gegen ein Vorhaben. Ergänzen Sie die Lücken 1 bis 10 im Brief. Schreiben Sie in jede Lücke ein Wort.",
          promptTr:
            "Bir sakin olarak belediyeye yazıyor ve bir projeye itiraz ediyorsun. Mektuptaki 1–10. boşlukları tamamla. Her boşluğa bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Einwendung",
              genreTr: "İtiraz dilekçesi",
              title: "An die Gemeindeverwaltung",
              body: `Sehr geehrte Damen und Herren,

{{1}} auf die Bürgerinformation vom 14. Juni erhebe ich fristgerecht Einwendungen gegen das Vorhaben am Mühlbach.

Vorab: Das Ziel des Rückhalts halte ich für richtig. Meine Einwendungen richten sich {{2}} gegen das Vorhaben als solches, sondern gegen zwei Punkte der Ausführung.

Erstens soll der südliche Uferweg während der Bauzeit gesperrt werden. Für die Anwohner des Ostufers ist er der einzige barrierefreie Zugang zum Ortskern. Eine Ersatzstrecke wurde bislang {{3}} benannt.

Zweitens ist die Unterhaltung nach Fertigstellung {{4}} der Gemeinde zugeordnet, ohne dass ein Betrag genannt wird. Angesichts der genannten Dauer von fünfundzwanzig Jahren halte ich eine Bezifferung für {{5}}.

Ich beantrage {{6}}, die Sperrung auf die Monate außerhalb der Schulzeit zu beschränken und die Unterhaltungskosten im Erläuterungsbericht auszuweisen.

Für Rückfragen stehe ich Ihnen gern zur {{7}}. Über eine Eingangsbestätigung {{8}} zum 30. September wäre ich Ihnen verbunden.

Mit {{9}} Grüßen
Beate {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-08-s2-1",
              no: 1,
              text: "Lücke 1 (Bezugnahme auf eine Veranstaltung)",
              accept: ["Bezugnehmend", "Bezug"],
              explain:
                "Resmî yazının açılış kalıbı: `Bezugnehmend auf die Bürgerinformation …` ya da `Bezug nehmend`. Cümle `auf` ile sürdüğü için bu iki biçim oturur.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-2",
              no: 2,
              text: "Lücke 2 (Verneinung vor „sondern“)",
              accept: ["nicht"],
              explain:
                "`nicht … sondern` ikilisi gerekiyor: itiraz projenin kendisine değil, uygulamanın iki noktasına yönelik.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-3",
              no: 3,
              text: "Lücke 3 (Verneinung eines bisherigen Zustands)",
              accept: ["nicht", "nirgends", "keineswegs"],
              explain:
                "\"Eine Ersatzstrecke wurde bislang nicht benannt\" — `bislang` ile birlikte olumsuzlama, eksikliği zaman içinde yerleştiriyor.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-4",
              no: 4,
              text: "Lücke 4 (Ausschließlichkeit)",
              accept: ["allein", "ausschließlich", "einzig"],
              explain:
                "Bilgilendirmede bu açıkça söylenmişti: \"Für die Unterhaltung danach ist ausschließlich die Gemeinde zuständig\". Mektup aynı kısıtlamayı yineliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-5",
              no: 5,
              text: "Lücke 5 (Notwendigkeit)",
              accept: ["erforderlich", "geboten", "notwendig"],
              explain:
                "Yirmi beş yıllık süre karşısında bir rakam verilmesi gerekiyor: \"halte ich eine Bezifferung für erforderlich\".",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-6",
              no: 6,
              text: "Lücke 6 (Folgerung im Mittelfeld)",
              accept: ["daher", "deshalb", "folglich"],
              explain:
                "İki gerekçeden sonra gelen talep: \"Ich beantrage daher, …\". Sonuç bildiren belirteç fiilin ardında durur.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-7",
              no: 7,
              text: "Lücke 7 (feste Wendung: zur … stehen)",
              accept: ["Verfügung"],
              explain:
                "Kalıp değişmez: `zur Verfügung stehen`. Başka bir ad bu kalıba girmiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-8",
              no: 8,
              text: "Lücke 8 (Frist)",
              accept: ["bis"],
              explain:
                "Son tarih için `bis zum 30. September`. `ab` süreyi başlatır, `seit` geçmişe bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-9",
              no: 9,
              text: "Lücke 9 (Grußformel)",
              accept: ["freundlichen", "besten", "vorzüglichen"],
              explain:
                "Kuruma yazılan dilekçenin vedası `Mit freundlichen Grüßen`. Gündelik biçimler bu kayda uymaz.",
            },
            {
              kind: "gap",
              id: "de-c1-08-s2-10",
              no: 10,
              text: "Lücke 10 (Nachname der Absenderin)",
              accept: ["Ahrens"],
              explain:
                "Mektubu yazan kişi dinleme bölümünde konuşan uzmanla aynı adı taşıyor: Beate Ahrens.",
            },
          ],
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
          id: "de-c1-08-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Landschaft: Erbe oder Ressource?\". Gliedern Sie: Einstieg — Begriffsklärung — Argumente für die eine Seite — Argumente für die andere — eigene Position mit Einwand — Abschluss.",
          promptTr:
            "\"Peyzaj: miras mı kaynak mı?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavram açıklaması — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun ve ona itiraz — kapanış.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve bölümleme" },
              { de: "Begriffe klären", tr: "Kavramları açmak" },
              { de: "Argumente für beide Seiten", tr: "İki tarafın da gerekçeleri" },
              { de: "eigene Position mit Einwand", tr: "Kendi konumun ve ona itiraz" },
              { de: "Beispiele", tr: "Örnekler" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte darüber sprechen, ob Landschaft als Erbe oder als Ressource zu verstehen ist. Ich kläre zuerst die Begriffe, stelle dann beide Seiten dar und komme am Ende zu meiner Position, gegen die ich selbst einen Einwand vorbringen werde. Mit Erbe meine ich einen Bestand, der weitergegeben und dessen Veränderung begründet werden muss; mit Ressource eine Fläche, deren Nutzung sich nach ihrem Ertrag richtet. Für die Lesart als Erbe spricht, dass viele Wirkungen erst über Jahrzehnte entstehen. Eine Hecke, die heute gepflanzt wird, trägt in fünfzehn Jahren; wer sie nach Ertrag bewertet, pflanzt sie nie. Für die Lesart als Ressource spricht, dass Flächen bewirtschaftet werden müssen und dass Menschen davon leben. Eine Landschaft, die niemand nutzt, wird ohnehin nicht gepflegt — die ungepflegten kommunalen Ausgleichsflächen zeigen das deutlich genug. Meine Position ist, dass die Gegenüberstellung selbst in die Irre führt: Entscheidend ist nicht der Status der Fläche, sondern die Dauer der Zusage. Der Einwand dagegen wiegt allerdings schwer. Wer alles auf Verträge stellt, macht Landschaft von Haushalten abhängig, und Haushalte werden gekürzt. Eigentum wäre insofern robuster. Ich halte die Position gleichwohl, weil auch Eigentum ohne Pflegemittel wirkungslos bleibt. Zusammenfassend: Nicht wem die Fläche gehört, entscheidet über ihren Zustand, sondern wie lange jemand für sie einsteht.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavramlar gerçekten açıldı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Kendi konumuna yönelik itiraz gerçek bir itiraz mı ve yanıtlandı mı?",
              "Dört dakika boyunca yapı korunabildi mi?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-08-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Gemeinde hat 400.000 Euro für Landschaftsmaßnahmen und muss vier Fragen klären: Kauf oder Vertrag? Viele kleine oder eine große Fläche? Wer übernimmt die Pflege? Was passiert nach zwanzig Jahren? Einigen Sie sich.",
          promptTr:
            "Birlikte bir karar verin. Bir belediyenin peyzaj önlemleri için 400.000 avrosu var ve dört soruyu çözmesi gerekiyor: Satın alma mı sözleşme mi? Çok sayıda küçük alan mı, tek büyük alan mı? Bakımı kim üstlenecek? Yirmi yıl sonra ne olacak? Anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich beginne: Ich wäre für den Kauf. Was uns gehört, kann uns niemand kündigen, und in zwanzig Jahren sitzt vielleicht ein anderer Gemeinderat. Was meinen Sie?",
              tr: "Ben başlayayım: Satın almadan yanayım. Bizim olan şeyi kimse feshedemez, üstelik yirmi yıl sonra belediye meclisi başka olabilir. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir konum al ve 'kimse feshedemez' gerekçesini doğrudan ele al.",
              expect: "bir konum almak ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Zur Größe: Viele kleine Flächen sind sichtbar und politisch leichter zu vermitteln. Eine große wirkt ökologisch mehr, sieht aber nach wenig aus. Wie entscheiden Sie das?",
              tr: "Büyüklük meselesi: Çok sayıda küçük alan görünür ve siyaseten anlatması kolay. Tek büyük alan ekolojik olarak daha etkili ama az iş yapılmış gibi görünüyor. Sen nasıl karar verirsin?",
            },
            {
              who: "you",
              hint: "Bir seçim yap ve görünürlük gerekçesini de tart.",
              expect: "gerekçeli bir seçim yapmak ve siyasi görünürlük argümanını tartmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Die Pflege: Wenn wir sie an einen Betrieb vergeben, hängen wir von ihm ab. Wenn wir sie selbst machen, fehlt uns das Personal. Beides ist unbefriedigend. Was schlagen Sie vor?",
              tr: "Bakım: Bir işletmeye verirsek ona bağımlı oluruz. Kendimiz yaparsak personelimiz yok. İkisi de tatmin edici değil. Ne önerirsin?",
            },
            {
              who: "you",
              hint: "Somut bir çözüm öner ve bağımlılık riskini nasıl sınırladığını söyle.",
              expect: "somut bir çözüm önermek ve riski nasıl sınırladığını açıklamak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben, einschließlich der Punkte, die offen bleiben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin — açık kalan noktalar da dâhil?",
            },
            {
              who: "you",
              hint: "Anlaşmayı ve açık kalanları eksiksiz özetle.",
              expect: "anlaşmayı ve açık kalan noktaları eksiksiz özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 7,
            points: [
              { de: "eine Position begründen", tr: "Bir konumu gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "einen Kompromiss formulieren", tr: "Bir uzlaşı biçimlendirmek" },
              { de: "Ergebnis und offene Punkte zusammenfassen", tr: "Sonucu ve açık noktaları özetlemek" },
            ],
            sample:
              "Ihr Argument gegen die Kündbarkeit überzeugt mich zur Hälfte. Eigentum sichert die Fläche, aber es sichert nicht die Pflege — und ungepflegte Ausgleichsflächen gibt es in jeder zweiten Gemeinde. Ich schlage deshalb eine Aufteilung vor: dreihunderttausend für den Kauf einer zusammenhängenden Fläche, hunderttausend als Rücklage, die ausschließlich der Unterhaltung dient. Zur Größe entscheide ich mich für die große Fläche. Die politische Sichtbarkeit ist ein reales Argument, nur lässt sie sich anders herstellen — mit einem Weg und zwei Tafeln, nicht mit fünf verstreuten Parzellen, die niemand mäht. Bei der Pflege würde ich an einen Betrieb vergeben, allerdings in Losen von je fünf Jahren und mit einer offengelegten Leistungsbeschreibung. Dann ist ein Wechsel möglich, ohne dass wir von vorn anfangen. Zusammengefasst: eine große Fläche im Eigentum, ein gebundener Unterhaltungsfonds, Pflege extern in Fünfjahreslosen. Offen bleibt ausdrücklich die Frage nach zwanzig Jahren — die Rücklage reicht dafür nicht, und ich möchte das nicht durch eine optimistische Annahme verdecken.",
            criteria: [
              "Konum gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "Görünürlük gibi siyasi argüman tartıldı mı, yoksa yok mu sayıldı?",
              "Bağımlılık riski somut bir düzenlemeyle sınırlandı mı?",
              "Özet açık kalan noktayı da içeriyor mu, yoksa anlaşma varmış gibi mi kapatıyor?",
              "Tartışma dili C1 düzeyinde mi (einräumen, abwägen, offenlegen)?",
            ],
          },
        },
      ],
    },
  ],
};
