import type { MockPaper } from "../types";

/**
 * C1 · Deneme 2 — "Sprache und Gedächtnis".
 *
 * Yapı C1 · Deneme 1 ile birebir aynı (bkz. `c1-01.ts`). Değişen içerik alanı:
 * birinci kâğıt zaman ve çalışma, bu kâğıt dil, bellek ve çok dillilik.
 *
 * Bu kâğıdın belirleyici zorluğu KAYNAK AYIRT ETME: hem okuma hem dinleme
 * bölümünde birden çok ses aynı konuda konuşuyor ve savlar birbirine yakın
 * duruyor. Maddeler bilerek "kim söyledi" ile "ne söylendi" arasındaki farkın
 * üstünde: bir kişinin AKTARDIĞI görüş onun kendi görüşü değildir, ve bir
 * metinde geçen bir sözcük o metnin savı değildir.
 *
 * Teil 1'in özet boşlukları bu kez daha çok ADLAŞTIRMA istiyor (`Abrufen`,
 * `Unterdrückung`, `Zugriff`): C1 düzeyinde bir metni yeniden kurmak, çoğu
 * zaman fiil cümlesini ad öbeğine çevirmek demektir.
 */
export const C1_02: MockPaper = {
  id: "de-c1-02",
  course: "de",
  level: "C1",
  no: 2,
  theme: "Sprache und Gedächtnis",
  themeTr: "Dil ve bellek",
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
          id: "de-c1-02-l1",
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
              title: "Was bleibt, wenn eine Sprache verstummt",
              body: `Dass man eine Sprache lernen kann, gilt als selbstverständlich. Dass man sie auch wieder verlieren kann, wird dagegen häufig als Zeichen von Nachlässigkeit gedeutet. Die Forschung sieht darin etwas anderes: Sprachverlust ist kein Versagen des Gedächtnisses, sondern die Folge einer dauerhaften Konkurrenz zwischen Systemen, die sich denselben Kopf teilen.

Untersucht wird das Phänomen vor allem an Menschen, die im Erwachsenenalter ausgewandert sind. Nach einigen Jahren zeigen sich zunächst Aussetzer beim Abrufen einzelner Wörter; später greifen Satzbau und Betonung der neuen Sprache auf die alte über. Bemerkenswert ist dabei die Reihenfolge: Zuerst verloren geht, was selten gebraucht wird, und nicht etwa das zuletzt Gelernte.

Als entscheidender Faktor gilt weniger die verstrichene Zeit als die Unterdrückung. Wer täglich zwischen zwei Sprachen wechselt, muss die jeweils nicht benötigte fortlaufend hemmen, und diese Hemmung hinterlässt Spuren. In Versuchen fällt es Zweisprachigen messbar schwerer, auf ein Wort ihrer Erstsprache zuzugreifen, unmittelbar nachdem sie längere Zeit in der Zweitsprache gesprochen haben.

Uneinheitlich ist die Forschung bei der Frage, wie früh der Abbau einsetzt. Ältere Arbeiten nannten fünf Jahre ohne Gebrauch als Schwelle; neuere Erhebungen finden messbare Verzögerungen beim Abruf schon nach achtzehn Monaten, allerdings ausschließlich unter Zeitdruck. Ohne Zeitdruck bleibt die Leistung über Jahre hinweg stabil. Das erklärt einen Widerspruch, der Betroffene häufig irritiert: Im ruhigen Gespräch fällt nichts auf, in einer schnellen Diskussion dagegen sofort.

Weitgehend unstrittig ist dagegen die Rolle des Alters beim Erwerb. Wer eine Sprache vor der Pubertät erworben hat, verliert sie messbar langsamer als jemand, der sie erst als Erwachsener gelernt hat, und zwar unabhängig davon, wie gut er sie zuletzt beherrschte. Die Erklärung dafür ist umstritten; die Beobachtung selbst wird in nahezu allen Untersuchungen bestätigt.

Vollständig verschwindet eine früh erworbene Sprache gleichwohl fast nie. Eine viel zitierte Untersuchung mit Erwachsenen, die als Kleinkinder adoptiert wurden und die Sprache ihrer ersten Jahre nicht mehr beherrschen, ergab dennoch einen messbaren Vorsprung: Beim Wiedererlernen feiner Lautunterscheidungen waren sie deutlich schneller als eine Vergleichsgruppe ohne diese Vorgeschichte. Das Wissen war demnach nicht gelöscht, sondern lediglich unzugänglich geworden.

Die praktischen Folgerungen sind unspektakulär, aber belastbar. Wer eine Sprache erhalten will, benötigt keine tägliche Übung, wohl aber regelmäßige Anlässe, bei denen sie tatsächlich verwendet wird; bloßes Lesen genügt nicht, weil dabei der aktive Abruf entfällt. Und wer eine verlorene Sprache zurückholen möchte, sollte sich nicht am Nullpunkt wähnen: Der Wiedereinstieg verläuft in aller Regel erheblich rascher als der erste Erwerb.`,
              gloss: [
                { de: "der Aussetzer", tr: "kesinti, boşluk (hatırlamada)", en: "lapse" },
                { de: "übergreifen auf", tr: "bir şeye sirayet etmek", en: "to spill over into" },
                { de: "hemmen", tr: "ketlemek, bastırmak", en: "to inhibit" },
                { de: "sich wähnen", tr: "kendini bir yerde sanmak", en: "to imagine oneself to be" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              title: "Zusammenfassung mit Lücken",
              body: `Sprachverlust wird im Alltag häufig als {{1}} gedeutet, in der Forschung dagegen als Folge einer Konkurrenz zwischen Sprachen verstanden.

Bei Menschen, die als Erwachsene ausgewandert sind, treten zuerst Schwierigkeiten beim {{2}} einzelner Wörter auf; später beeinflusst die neue Sprache auch {{3}} und Betonung der alten. Zuerst verloren geht dabei, was {{4}} gebraucht wird.

Als entscheidender Faktor gilt nicht die verstrichene Zeit, sondern die {{5}} der jeweils nicht benötigten Sprache. Unmittelbar nach längerem Sprechen in der Zweitsprache ist der {{6}} auf Wörter der Erstsprache messbar erschwert.

Eine Untersuchung mit früh {{7}} Erwachsenen ergab, dass diese beim Wiedererlernen von Lautunterscheidungen {{8}} waren als eine Vergleichsgruppe. Das Wissen war demnach nicht gelöscht, sondern {{9}}.

Für die Praxis folgt daraus: Erhaltung verlangt keine tägliche Übung, wohl aber Gelegenheiten zum aktiven Gebrauch; bloßes {{10}} reicht dafür nicht aus.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-02-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Nachlässigkeit", "Versagen", "Faulheit", "Schwäche", "Bequemlichkeit", "Nachlassen"],
              explain:
                "\"wird dagegen häufig als Zeichen von Nachlässigkeit gedeutet\" — özet aynı karşıtlığı (gündelik yorum ↔ araştırma) koruduğu için buraya olumsuz değerlendirme gelir.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["Abrufen", "Abruf", "Erinnern", "Finden", "Aufrufen", "Wiederfinden"],
              explain:
                "Kaynakta \"Aussetzer beim Abrufen einzelner Wörter\" geçiyor. `beim` bir adlaştırma istediği için mastarın adlaşmış biçimi kullanılır.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Satzbau", "Syntax", "den Satzbau", "Wortstellung", "Grammatik"],
              explain:
                "\"später greifen Satzbau und Betonung der neuen Sprache auf die alte über\" — özette `und Betonung` durduğu için eksik olan ilk öge.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["selten", "kaum", "wenig"],
              explain:
                "Sıra şaşırtıcı olduğu için metin özellikle vurguluyor: en son öğrenilen değil, en az kullanılan gidiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Unterdrückung", "Hemmung", "Verdrängung", "Blockierung", "Unterdrücken"],
              explain:
                "\"Als entscheidender Faktor gilt weniger die verstrichene Zeit als die Unterdrückung\" — dişil bir ad, `die … der Sprache` yapısına oturur.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Zugriff", "Zugang", "Abruf", "Rückgriff"],
              explain:
                "Kaynakta fiil kullanılıyor: \"auf ein Wort ihrer Erstsprache zuzugreifen\". Özet bunu adlaştırıyor: `der Zugriff auf …`.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["adoptierten", "adoptierte"],
              explain:
                "Çalışma \"mit Erwachsenen, die als Kleinkinder adoptiert wurden\" yapılmış; özet bunu ortaç niteleyicisine çeviriyor: `mit früh adoptierten Erwachsenen`.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["schneller", "rascher", "erfolgreicher", "besser", "zügiger", "im Vorteil"],
              explain:
                "\"waren sie deutlich schneller als eine Vergleichsgruppe\" — `als` ile devam ettiği için karşılaştırma biçimi zorunlu.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["unzugänglich", "blockiert", "verdeckt", "unerreichbar", "nicht abrufbar", "verschüttet"],
              explain:
                "Metnin kilit ayrımı: \"nicht gelöscht, sondern lediglich unzugänglich geworden\" — bilgi duruyor, ona ulaşılamıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Lesen", "das Lesen", "Mitlesen", "Zuhören", "Verstehen"],
              explain:
                "\"bloßes Lesen genügt nicht, weil dabei der aktive Abruf entfällt\" — okuma tanımaya dayanır, üretime değil.",
            },
          ],
        },
        {
          id: "de-c1-02-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Lesen Sie die drei Stellungnahmen zum Herkunftssprachenunterricht. In welchem Text finden Sie die Aussagen 11 bis 20? Manche Aussagen stehen in keinem der Texte.",
          promptTr:
            "Köken dili dersi üzerine üç görüş yazısını oku. 11–20. ifadeleri hangi metinde buluyorsun? Bazı ifadeler metinlerin hiçbirinde yok.",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "A — Prof. Vandermeer, Sprachwissenschaftlerin",
              body: `Die Frage, ob Herkunftssprachen an Regelschulen unterrichtet werden sollen, wird meist mit dem falschen Argument geführt. Befürworter verweisen auf bessere Leistungen im Deutschen, Gegner bestreiten sie. Beide unterstellen damit, der Unterricht müsse sich über einen Nutzen für das Deutsche rechtfertigen.

Die Datenlage ist übrigens uneindeutiger, als beide Seiten behaupten. Es gibt Untersuchungen mit deutlichen Effekten und solche ohne jeden Effekt; entscheidend ist offenbar die Qualität des Unterrichts, nicht seine bloße Existenz. Wer aus einer schlecht ausgestatteten Maßnahme keinen Nutzen zieht, widerlegt damit nicht das Prinzip.

Mir liegt allerdings an einer Klarstellung. Ein Recht auf die eigene Sprache lässt sich nicht davon abhängig machen, ob es der Zweitsprache dient. Wir verlangen von keinem Musikunterricht, dass er die Mathematiknoten hebt.

Eines noch zur Begrifflichkeit, weil sie mehr anrichtet, als man gemeinhin annimmt. Wir sprechen von Herkunftssprache, als wäre sie hinter dem Kind zurückgeblieben. Für die meisten dieser Kinder ist sie jedoch keine Herkunft, sondern Gegenwart: die Sprache des Abendessens, des Telefonats am Sonntag, der Nachbarschaft. Ein Wort, das etwas in die Vergangenheit rückt, macht es leichter, es dort auch zu belassen.`,
              gloss: [
                { de: "unterstellen", tr: "örtük olarak varsaymak", en: "to presuppose, to impute" },
                { de: "widerlegen", tr: "çürütmek", en: "to refute" },
              ],
            },
            {
              kind: "text",
              id: "s2",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "B — Herr Tekin, Schulleiter",
              body: `Ich leite eine Schule, an der siebzehn Erstsprachen gesprochen werden. Wer mir sagt, wir sollten Herkunftssprachenunterricht anbieten, sagt mir selten, welche davon.

Als wir es versucht haben, konnten wir drei Sprachen abdecken. Das Ergebnis war nicht Zufriedenheit, sondern ein Konflikt: Die übrigen Familien fragten zu Recht, warum ihre Kinder leer ausgingen. Eine Maßnahme, die nur einen Teil erreicht, erzeugt am Ende mehr Unfrieden als gar keine.

Missverstehen Sie mich nicht. Ich bin nicht gegen den Unterricht, ich bin gegen die Illusion, er sei eine Frage des guten Willens einzelner Schulen. Solange die Ausbildung der Lehrkräfte nicht überregional organisiert wird, verwalten wir nur den Mangel.

Und noch etwas, das mir wichtig ist: Man verlangt von uns eine Entscheidung, die keine Schule allein treffen kann. Wenn ich drei Sprachen anbiete, habe ich damit auch gesagt, welche vierzehn ich nicht anbiete. Diese Auswahl ist unvermeidlich, aber sie gehört nicht in ein Lehrerzimmer. Sie gehört in eine Regelung, die für alle Schulen einer Region gilt und die jemand verantwortet.`,
              gloss: [
                { de: "abdecken", tr: "kapsamak, karşılamak", en: "to cover" },
                { de: "leer ausgehen", tr: "eli boş kalmak", en: "to come away empty-handed" },
                { de: "überregional", tr: "bölgeler üstü", en: "supraregional" },
              ],
            },
            {
              kind: "text",
              id: "s3",
              genre: "Stellungnahme",
              genreTr: "Görüş yazısı",
              title: "C — Frau Lindner, Elternvertreterin",
              body: `Unsere Tochter besucht seit zwei Jahren einen Kurs, der am Samstagvormittag in einem Vereinsraum stattfindet. Die Lehrerin ist hervorragend, die Bedingungen sind es nicht: kein Material, keine Zeugnisse, keine Verbindung zum Unterricht in der Woche.

Was mich daran am meisten stört, ist die Botschaft. Alles, was am Samstag in einem geliehenen Raum stattfindet, gilt als Privatsache. Damit lernen die Kinder nebenbei, welche ihrer Sprachen als richtige Schulsprache zählt.

Man hört oft, die Familien könnten das doch selbst leisten. Bei uns zu Hause funktioniert das auch, solange es ums Sprechen geht. Beim Schreiben endet es: Ich kann meiner Tochter die Sprache beibringen, aber keine Rechtschreibung, die ich selbst nie systematisch gelernt habe. Genau an dieser Stelle beginnt Unterricht, und genau dort wird er nicht angeboten.

Ich höre oft, das Ganze sei doch eine Frage des Geldes. Das stimmt zum Teil, aber es erklärt nicht, warum es keine Noten gibt. Eine Note kostet nichts, sie bedeutet nur, dass etwas ernst genommen wird.`,
              gloss: [
                { de: "die Botschaft", tr: "verilen mesaj", en: "message" },
                { de: "nebenbei", tr: "yan yolla, farkında olmadan", en: "incidentally" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-02-l2-11",
              no: 11,
              text: "Eine Maßnahme, die nur einen Teil der Betroffenen erreicht, schafft neue Konflikte.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 1,
              explain:
                "B: üç dil karşılanabilmiş ve sonuç memnuniyet değil, dışarıda kalan ailelerin haklı sorusu olmuş.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-12",
              no: 12,
              text: "Die Debatte stützt sich auf ein Argument, das der Sache nicht angemessen ist.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 0,
              explain:
                "A: tartışma \"mit dem falschen Argument\" yürütülüyor, çünkü iki taraf da dersi Almancaya yararı üzerinden meşrulaştırıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-13",
              no: 13,
              text: "Der äußere Rahmen eines Angebots vermittelt Kindern eine Rangfolge zwischen Sprachen.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 2,
              explain:
                "C: cumartesi, ödünç alınmış bir odada olan her şey \"Privatsache\" sayılıyor; çocuklar hangi dilin okul dili olduğunu böyle öğreniyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-14",
              no: 14,
              text: "Der Unterricht sollte erst ab der weiterführenden Schule angeboten werden.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 3,
              explain:
                "Hiçbir metin bir okul kademesi önermiyor. C ilkokul çağından söz ediyor ama bir sınır çizmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-15",
              no: 15,
              text: "Widersprüchliche Befunde erklären sich vor allem durch die Qualität der jeweiligen Umsetzung.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 0,
              explain:
                "A: kimi çalışmada etki var, kiminde yok; belirleyici olan \"die Qualität des Unterrichts, nicht seine bloße Existenz\".",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-16",
              no: 16,
              text: "Eine Bewertung würde nichts kosten und dennoch etwas ändern.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 2,
              explain:
                "C: \"Eine Note kostet nichts, sie bedeutet nur, dass etwas ernst genommen wird.\" Para savını kısmen kabul edip aşıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-17",
              no: 17,
              text: "Ein Bildungsangebot muss sich nicht über seinen Nutzen für ein anderes Fach rechtfertigen.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 0,
              explain:
                "A'nın kapanışındaki benzetme: müzik dersinden matematik notunu yükseltmesi istenmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-18",
              no: 18,
              text: "Zweisprachig aufwachsende Kinder beginnen später zu sprechen als einsprachige.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 3,
              explain:
                "Yaygın bir inanış, ama üç metnin hiçbirinde geçmiyor. Metinde bulunmayan bir bilgiyi metne yüklememek bu görevin asıl ölçtüğü şey.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-19",
              no: 19,
              text: "Es fehlt die Verzahnung mit dem regulären Unterricht.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 2,
              explain:
                "C: \"kein Material, keine Zeugnisse, keine Verbindung zum Unterricht in der Woche\" — üçüncü eksik tam bu.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l2-20",
              no: 20,
              text: "Ohne überregional geregelte Ausbildung bleibt jede Lösung Stückwerk.",
              options: ["Text A", "Text B", "Text C", "In keinem der Texte"],
              answer: 1,
              explain:
                "B: öğretmen yetiştirme bölgeler üstü örgütlenmedikçe \"verwalten wir nur den Mangel\". Karşı çıktığı şey ders değil, iyi niyete bırakılması.",
            },
          ],
        },
        {
          id: "de-c1-02-l3",
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
              title: "Warum uns ausgerechnet Namen entfallen",
              body: `Kaum ein Gedächtnisfehler ist so verbreitet und so peinlich wie der vergessene Name. Man erinnert den Beruf, die gemeinsame Reise, sogar den Namen des Hundes — {{21}} den Namen des Menschen, der vor einem steht.

Der Grund dafür ist weniger geheimnisvoll, als es scheint. Ein Name ist, {{22}} fast allen anderen Informationen über eine Person, willkürlich. Aus "Bäcker" folgt nichts über den Beruf, aus "Klein" nichts über die Größe. Es fehlt jede Brücke, an der sich das Wort festhalten könnte.

{{23}} kommt ein Reihenfolgeeffekt. Namen werden in Gesprächen fast immer zuerst genannt, also zu einem Zeitpunkt, an dem die Aufmerksamkeit noch bei der Situation liegt und nicht bei der Person.

Hinzu kommt ein Effekt, den man an sich selbst beobachten kann. Wer sich beim Vorstellen darauf konzentriert, gleich selbst etwas zu sagen, hört den Namen des anderen im Wortsinn nicht: Die Aufmerksamkeit liegt bereits beim eigenen Satz. Das ist keine Unhöflichkeit, sondern eine Frage der Kapazität — und genau deshalb hilft das laute Wiederholen.

Wer sich Namen besser merken will, sollte deshalb nicht mehr Mühe aufwenden, {{24}} eine andere. Wiederholen Sie den Namen einmal laut, verknüpfen Sie ihn mit einer beliebigen, ruhig unsinnigen Vorstellung, und fragen Sie im Zweifel noch einmal nach.

Der letzte Rat fällt vielen schwer, {{25}} er der wirksamste ist: Nachfragen kostet drei Sekunden Verlegenheit und spart eine Stunde Rätselraten.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-02-l3-21",
              no: 21,
              text: "Lücke 21",
              options: ["außerdem", "beziehungsweise", "nur nicht", "geschweige denn"],
              answer: 2,
              explain:
                "Sıralanan şeylerden TEK biri hatırlanmıyor; `nur nicht` bu istisnayı kurar. `geschweige denn` olumsuz bir artış bildirir ve önündeki cümle olumlu olduğu için uymaz.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l3-22",
              no: 22,
              text: "Lücke 22",
              options: ["anders als", "ähnlich wie", "statt", "entgegen"],
              answer: 0,
              explain:
                "Ad, kişiye ilişkin öteki bilgilerin AKSİNE keyfîdir. `anders als` bu karşıtlığı verir; `ähnlich wie` anlamı tersine çevirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l3-23",
              no: 23,
              text: "Lücke 23",
              options: ["Dagegen", "Immerhin", "Stattdessen", "Hinzu"],
              answer: 3,
              explain:
                "\"Hinzu kommt ein Reihenfolgeeffekt\" kalıbı ikinci bir nedeni ekler. Öteki üçü karşıtlık, ödün ya da yerine geçme bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l3-24",
              no: 24,
              text: "Lücke 24",
              options: ["als auch", "sondern eine andere", "sowie", "wie auch"],
              answer: 1,
              explain:
                "`nicht mehr Mühe …, sondern eine andere` — `nicht … sondern` düzeltme yapısıdır; ötekiler ekleme bağlaçlarıdır ve olumsuzlamayla kurulamaz.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-l3-25",
              no: 25,
              text: "Lücke 25",
              options: ["sodass", "zumal", "obwohl", "damit"],
              answer: 2,
              explain:
                "Tavsiye zor geliyor, OYSA en etkilisi o. `obwohl` bu ödün ilişkisini kurar; `zumal` gerekçe ekler ve burada anlamı bozar.",
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
          id: "de-c1-02-h1",
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
              title: "Sprachpatenschaften — Informationsabend",
              situation: "Bir gönüllülük programı tanıtılıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Rebecca Loos, ich koordiniere die Sprachpatenschaften bei uns im Stadtteilzentrum. Ich erkläre Ihnen in etwa zwanzig Minuten, worum es geht und was auf Sie zukäme.",
                },
                {
                  text: "Zunächst zur Idee. Eine Patin oder ein Pate begleitet ein Kind ein Schuljahr lang, einmal wöchentlich, für neunzig Minuten. Wichtig ist mir gleich zu Beginn eine Abgrenzung: Das ist keine Nachhilfe. Wir üben nicht für Klassenarbeiten, wir sprechen, lesen und spielen.",
                },
                {
                  text: "Wer kann mitmachen? Vorausgesetzt wird Volljährigkeit und ein sicheres Deutsch, mindestens auf dem Niveau B zwei. Eine pädagogische Ausbildung ist ausdrücklich nicht erforderlich; zwei Drittel unserer Patinnen und Paten kommen aus ganz anderen Berufen.",
                },
                {
                  text: "Vor dem ersten Treffen stehen zwei Dinge an. Erstens eine Schulung an zwei Samstagen, insgesamt zwölf Stunden. Zweitens ein erweitertes Führungszeugnis, das Sie beim Bürgeramt beantragen; die Gebühr übernehmen wir.",
                },
                {
                  text: "Die Treffen finden nicht bei Ihnen zu Hause statt, sondern in der Schule oder in der Stadtteilbibliothek. Das ist keine Formalität, sondern Bedingung, und zwar zum Schutz beider Seiten.",
                },
                {
                  text: "Zur Verbindlichkeit: Wir bitten um eine Zusage für ein volles Schuljahr. Aus Erfahrung wissen wir, dass der Nutzen erst nach etwa drei Monaten sichtbar wird. Wer nach sechs Wochen aufhört, hinterlässt beim Kind mehr Schaden als Nutzen.",
                },
                {
                  text: "Begleitet werden Sie nicht allein gelassen. Es gibt alle sechs Wochen einen Gruppenabend, an dem Sie Fälle besprechen können, und für dringende Fragen eine Telefonnummer, die von Montag bis Freitag besetzt ist.",
                },
                {
                  text: "Häufig gefragt wird nach den Fahrtkosten. Diese werden erstattet, allerdings nur gegen Beleg und nur für den öffentlichen Nahverkehr. Wer mit dem Auto kommt, bekommt nichts, das muss ich leider so deutlich sagen.",
                },
                {
                  text: "Und zum Schluss: Wenn Sie unsicher sind, hospitieren Sie einmal. Sie können bei einem laufenden Treffen zuschauen, ohne sich zu verpflichten. Melden Sie sich dafür einfach nachher bei mir.",
                },
              ],
              gloss: [
                { de: "die Abgrenzung", tr: "sınır çizme, ayrım", en: "delimitation" },
                { de: "das Führungszeugnis", tr: "adli sicil belgesi", en: "certificate of good conduct" },
                { de: "hospitieren", tr: "gözlemci olarak katılmak", en: "to sit in, to observe" },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizzettel",
              genreTr: "Not kâğıdı",
              title: "Notizen — Sprachpatenschaften",
              body: `Umfang: einmal pro Woche, {{1}} Minuten, ein Schuljahr lang.

Ausdrücklich KEINE {{2}}.

Voraussetzungen: volljährig, Deutsch mindestens {{3}}.
NICHT erforderlich: {{4}}.

Vorher: Schulung an zwei Samstagen ({{5}} Stunden) + {{6}} (Gebühr wird übernommen).

Treffpunkt: Schule oder {{7}} — nicht zu Hause.

Nutzen wird sichtbar erst nach etwa {{8}}.

Begleitung: Gruppenabend alle {{9}}; Telefon Mo–Fr.

Fahrtkosten: nur gegen Beleg und nur für {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-02-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["90", "neunzig"],
              explain: "\"einmal wöchentlich, für neunzig Minuten\" — süre buluşma başına veriliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["Nachhilfe", "eine Nachhilfe", "Nachhilfeunterricht", "Nachhilfestunden"],
              explain:
                "Konuşmacı en başta ayrımı koyuyor: \"Das ist keine Nachhilfe.\" Sınav çalışması yapılmıyor; konuşuluyor, okunuyor, oynanıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["B2", "B zwei", "Niveau B2", "auf B2"],
              explain: "\"ein sicheres Deutsch, mindestens auf dem Niveau B zwei\".",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: [
                "pädagogische Ausbildung",
                "eine pädagogische Ausbildung",
                "paedagogische Ausbildung",
                "Ausbildung",
              ],
              explain:
                "\"Eine pädagogische Ausbildung ist ausdrücklich nicht erforderlich\" — üstelik gönüllülerin üçte ikisi başka mesleklerden.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["12", "zwölf", "zwoelf"],
              explain: "İki cumartesi, toplam on iki saat. Sayı gün sayısıyla değil, toplam saatle isteniyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: [
                "erweitertes Führungszeugnis",
                "Führungszeugnis",
                "ein erweitertes Führungszeugnis",
                "erweitertes Fuehrungszeugnis",
              ],
              explain:
                "İkinci koşul belediyeden alınan genişletilmiş adli sicil belgesi; harcını kurum karşılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["Stadtteilbibliothek", "die Stadtteilbibliothek", "Bibliothek", "Bücherei", "in der Bibliothek"],
              explain:
                "Buluşmalar okulda ya da mahalle kütüphanesinde; ev açıkça dışlanıyor ve bu bir koşul olarak anılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["drei Monaten", "3 Monaten", "drei Monate", "3 Monate"],
              explain:
                "\"dass der Nutzen erst nach etwa drei Monaten sichtbar wird\" — bir yıllık taahhüdün gerekçesi bu.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["sechs Wochen", "6 Wochen"],
              explain:
                "Grup akşamı altı haftada bir. Aynı sayı konuşmada bir de olumsuz örnekte geçiyor (altı hafta sonra bırakan kişi) — ikisini karıştırmamak gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-02-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: [
                "den öffentlichen Nahverkehr",
                "öffentlichen Nahverkehr",
                "Nahverkehr",
                "Bus und Bahn",
                "öffentliche Verkehrsmittel",
                "ÖPNV",
              ],
              explain:
                "Ulaşım masrafı yalnız belge karşılığı ve yalnız toplu taşıma için; arabayla gelene ödeme yok.",
            },
          ],
        },
        {
          id: "de-c1-02-h2",
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
              situation: "Okulda çok dillilik üzerine panel.",
              plays: 1,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Guten Abend. Über Mehrsprachigkeit an Schulen wird viel geredet und wenig unterschieden. Bei mir sind Frau Dr. Baumgartner, Sprachdidaktikerin, Herr Ostrowski, Grundschullehrer, und Frau Nasri, die selbst dreisprachig aufgewachsen ist und heute Lehrkräfte fortbildet.",
                },
                {
                  speaker: "Frau Dr. Baumgartner",
                  text: "Ich beginne mit einer Zahl, die häufig falsch zitiert wird. Es heißt oft, mehrsprachige Kinder hätten einen kleineren Wortschatz. Das stimmt pro Sprache und ist gleichzeitig irreführend: Zählt man beide Sprachen zusammen, verschwindet der Unterschied.",
                },
                {
                  speaker: "Herr Ostrowski",
                  text: "Für meinen Unterricht ändert diese Zusammenrechnung wenig. Das Kind schreibt seinen Aufsatz auf Deutsch, nicht in der Summe seiner Sprachen. Ich sage das nicht als Einwand gegen Mehrsprachigkeit, sondern gegen die Beruhigung, die aus solchen Sätzen gezogen wird.",
                },
                {
                  speaker: "Frau Nasri",
                  text: "Mich stört an der Debatte etwas anderes. Wir sprechen über Kinder, als wäre Mehrsprachigkeit ein Zustand, den man hat oder nicht hat. Tatsächlich ist sie eine Praxis. Ich war mit sechs in einer Sprache stark, mit sechzehn in einer anderen, heute wieder anders.",
                },
                {
                  speaker: "Moderator",
                  text: "Herr Ostrowski, was hilft Ihnen konkret im Klassenzimmer?",
                },
                {
                  speaker: "Herr Ostrowski",
                  text: "Ehrlich gesagt: kleine Dinge. Wenn ich ein Kind bitte, ein Wort erst in seiner Erstsprache zu erklären und dann zu übersetzen, geht meist ein Licht auf — bei ihm und bei mir. Das kostet zwei Minuten und keine Fortbildung.",
                },
                {
                  speaker: "Frau Dr. Baumgartner",
                  text: "Genau das ist übrigens gut untersucht. Solche Übersetzungsaufgaben verbessern nachweislich das Verständnis, und zwar in beiden Sprachen. Sie brauchen dafür auch keine Kenntnisse der jeweiligen Sprache.",
                },
                {
                  speaker: "Frau Nasri",
                  text: "Nur wird es selten gemacht, und ich glaube, ich weiß warum. Viele Lehrkräfte fürchten, die Kontrolle zu verlieren, wenn im Raum etwas gesprochen wird, das sie nicht verstehen. Diese Sorge wird nie ausgesprochen, aber sie ist da.",
                },
                {
                  speaker: "Herr Ostrowski",
                  text: "Da haben Sie recht, und ich nehme mich nicht aus. Am Anfang war mir das unangenehm. Was geholfen hat, war nicht Überzeugung, sondern Übung.",
                },
                {
                  speaker: "Moderator",
                  text: "Frau Dr. Baumgartner, es heißt oft, entscheidend sei ein möglichst früher Beginn.",
                },
                {
                  speaker: "Frau Dr. Baumgartner",
                  text: "Für die Aussprache trifft das zu. Für Wortschatz und Grammatik dagegen sind ältere Lernende im ersten Jahr sogar schneller. Der frühe Beginn wirkt vor allem deshalb, weil er die Zeit verlängert, nicht weil er das Gehirn günstiger nutzt.",
                },
                {
                  speaker: "Frau Nasri",
                  text: "Und er wirkt nur, wenn danach etwas folgt. Ich habe unzählige Kinder erlebt, die in der Grundschule zweisprachig gefördert wurden und ab der fünften Klasse nichts mehr bekamen. Was in vier Jahren aufgebaut wurde, ist in zwei verschwunden.",
                },
                {
                  speaker: "Moderator",
                  text: "Was wäre Ihre jeweils wichtigste Forderung?",
                },
                {
                  speaker: "Herr Ostrowski",
                  text: "Zeit. Nicht mehr Material, nicht mehr Konzepte — Zeit im Stundenplan, in der so etwas überhaupt stattfinden kann.",
                },
                {
                  speaker: "Frau Dr. Baumgartner",
                  text: "Dass Lehrkräfte lernen, mit Sprachen zu arbeiten, die sie nicht sprechen. Das ist eine Technik, keine Begabung.",
                },
                {
                  speaker: "Frau Nasri",
                  text: "Durchgängigkeit. Ein Angebot, das mit dem Übergang endet, war kein Angebot, sondern eine Episode.",
                },
              ],
              gloss: [
                { de: "irreführend", tr: "yanıltıcı", en: "misleading" },
                { de: "die Beruhigung", tr: "rahatlama, içi rahat etme", en: "reassurance" },
                { de: "die Durchgängigkeit", tr: "kesintisizlik, süreklilik", en: "continuity" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-02-h2-11",
              no: 11,
              ref: "d1",
              text: "Was sagt Frau Dr. Baumgartner über den Wortschatz mehrsprachiger Kinder?",
              options: [
                "Er ist insgesamt kleiner als bei einsprachigen Kindern.",
                "Er ist pro Sprache kleiner, insgesamt aber nicht.",
                "Er ist in beiden Sprachen genauso groß.",
              ],
              answer: 1,
              explain:
                "\"Das stimmt pro Sprache und ist gleichzeitig irreführend: Zählt man beide Sprachen zusammen, verschwindet der Unterschied.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-12",
              no: 12,
              ref: "d1",
              text: "Wogegen richtet sich Herr Ostrowskis Einwand?",
              options: [
                "Gegen die beruhigende Wirkung solcher Aussagen.",
                "Gegen die Mehrsprachigkeit als solche.",
                "Gegen die Methode der zitierten Untersuchung.",
              ],
              answer: 0,
              explain:
                "Kendisi ayrımı yapıyor: \"nicht als Einwand gegen Mehrsprachigkeit, sondern gegen die Beruhigung, die aus solchen Sätzen gezogen wird\".",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-13",
              no: 13,
              ref: "d1",
              text: "Wie beschreibt Frau Nasri Mehrsprachigkeit?",
              options: [
                "Als eine Fähigkeit, die man früh erwirbt und dann besitzt.",
                "Als einen Nachteil, der sich mit der Zeit ausgleicht.",
                "Als eine Praxis, die sich im Lauf des Lebens verschiebt.",
              ],
              answer: 2,
              explain:
                "\"Tatsächlich ist sie eine Praxis\" — kendi örneğiyle: altı yaşında bir dilde, on altıda başka bir dilde güçlüymüş.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-14",
              no: 14,
              ref: "d1",
              text: "Welche Maßnahme nennt Herr Ostrowski als hilfreich?",
              options: [
                "Ein Wort erst in der Erstsprache erklären zu lassen.",
                "Zweisprachige Materialien für den Unterricht anzuschaffen.",
                "Eine zusätzliche Förderstunde pro Woche einzurichten.",
              ],
              answer: 0,
              explain:
                "İki dakika süren ve eğitim gerektirmeyen küçük bir uygulama: önce ana dilde açıklat, sonra çevirt.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-15",
              no: 15,
              ref: "d1",
              text: "Was ergänzt Frau Dr. Baumgartner dazu?",
              options: [
                "Dass diese Methode nur bei jüngeren Kindern wirkt.",
                "Dass sie ohne Kenntnisse der Erstsprache anwendbar ist.",
                "Dass sie in der Forschung umstritten ist.",
              ],
              answer: 1,
              explain:
                "\"Sie brauchen dafür auch keine Kenntnisse der jeweiligen Sprache\" — üstelik etkisi iki dilde birden ölçülmüş.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-16",
              no: 16,
              ref: "d1",
              text: "Warum wird die Methode laut Frau Nasri selten genutzt?",
              options: [
                "Weil sie im Lehrplan nicht vorgesehen ist.",
                "Weil die Kinder sie ablehnen.",
                "Weil Lehrkräfte einen Kontrollverlust fürchten.",
              ],
              answer: 2,
              explain:
                "Anlamadıkları bir dil konuşulunca denetimi yitirme korkusu — \"Diese Sorge wird nie ausgesprochen, aber sie ist da.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-17",
              no: 17,
              ref: "d1",
              text: "Wie reagiert Herr Ostrowski auf diese Vermutung?",
              options: [
                "Er hält sie für überzogen.",
                "Er bestätigt sie und bezieht sich selbst ein.",
                "Er verweist auf fehlende Fortbildungen.",
              ],
              answer: 1,
              explain:
                "\"Da haben Sie recht, und ich nehme mich nicht aus.\" Yardımcı olan şey ikna değil, alışkanlık olmuş.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-18",
              no: 18,
              ref: "d1",
              text: "Was sagt Frau Dr. Baumgartner zum frühen Beginn?",
              options: [
                "Er ist vor allem für die Aussprache entscheidend.",
                "Er ist in allen Bereichen entscheidend.",
                "Er spielt nach neueren Befunden keine Rolle.",
              ],
              answer: 0,
              explain:
                "Telaffuz için geçerli; söz varlığı ve dilbilgisinde ilk yıl büyükler daha hızlı. Etkisi süreyi uzatmasından geliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-19",
              no: 19,
              ref: "d1",
              text: "Wie erklärt sie die Wirkung des frühen Beginns?",
              options: [
                "Durch eine besondere Aufnahmefähigkeit des kindlichen Gehirns.",
                "Durch die längere Gesamtdauer des Kontakts.",
                "Durch die geringere Angst der Kinder vor Fehlern.",
              ],
              answer: 1,
              explain:
                "\"weil er die Zeit verlängert, nicht weil er das Gehirn günstiger nutzt\" — yaygın açıklamayı açıkça reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-20",
              no: 20,
              ref: "d1",
              text: "Welchen Vorbehalt fügt Frau Nasri hinzu?",
              options: [
                "Der frühe Beginn überfordere manche Familien.",
                "Der frühe Beginn nütze nur bei verwandten Sprachen.",
                "Der frühe Beginn wirke nur, wenn eine Fortsetzung folgt.",
              ],
              answer: 2,
              explain:
                "Beşinci sınıftan sonra desteği kesilen çocukları örnek veriyor: dört yılda kurulan iki yılda yok olmuş.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-21",
              no: 21,
              ref: "d1",
              text: "Was fordert Herr Ostrowski als Erstes?",
              options: [
                "Mehr Unterrichtsmaterial.",
                "Zeit im Stundenplan.",
                "Kleinere Klassen.",
              ],
              answer: 1,
              explain:
                "\"Nicht mehr Material, nicht mehr Konzepte — Zeit im Stundenplan\" — istediği şeyi neyin karşısına koyduğuyla tanımlıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-22",
              no: 22,
              ref: "d1",
              text: "Was fordert Frau Dr. Baumgartner?",
              options: [
                "Dass Lehrkräfte mit ihnen unbekannten Sprachen arbeiten lernen.",
                "Dass mehrsprachige Lehrkräfte bevorzugt eingestellt werden.",
                "Dass die Ergebnisse der Forschung stärker verbreitet werden.",
              ],
              answer: 0,
              explain:
                "\"Das ist eine Technik, keine Begabung\" — yani öğretilebilir bir beceri, kişisel bir donanım değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-23",
              no: 23,
              ref: "d1",
              text: "Was fordert Frau Nasri?",
              options: [
                "Eine frühere Diagnostik in der Grundschule.",
                "Eine bessere Ausstattung der Sprachkurse.",
                "Durchgängige Angebote über den Schulübergang hinaus.",
              ],
              answer: 2,
              explain:
                "\"Ein Angebot, das mit dem Übergang endet, war kein Angebot, sondern eine Episode.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-24",
              no: 24,
              ref: "d1",
              text: "Wie beschreibt der Moderator die öffentliche Debatte?",
              options: [
                "Als sachlich, aber zu wenig beachtet.",
                "Als von falschen Zahlen bestimmt.",
                "Als umfangreich, aber wenig differenziert.",
              ],
              answer: 2,
              explain:
                "Açılış cümlesi: \"wird viel geredet und wenig unterschieden\" — eksik olan ayrım yapmak.",
            },
            {
              kind: "mcq",
              id: "de-c1-02-h2-25",
              no: 25,
              ref: "d1",
              text: "In welchem Punkt stimmen alle drei überein?",
              options: [
                "Dass punktuelle Maßnahmen allein nicht ausreichen.",
                "Dass mehr Forschung nötig ist.",
                "Dass die Erstsprache im Unterricht vermieden werden sollte.",
              ],
              answer: 0,
              explain:
                "Üç talep de aynı yöne bakıyor: ders programında süreklilik, öğretmende kalıcı beceri, kademeler arası devamlılık. Üçü de tek seferlik önlemin yetmediğini söylüyor.",
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
          id: "de-c1-02-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Eine Fachzeitschrift führt die Reihe \"Sprachen erhalten — wessen Aufgabe?\" fort. Schreiben Sie einen Beitrag von etwa 200 Wörtern. Behandeln Sie alle fünf Leitpunkte und stellen Sie zwischen ihnen einen Zusammenhang her.",
          promptTr:
            "Bir meslek dergisi \"Dilleri korumak — kimin işi?\" dizisini sürdürüyor. Yaklaşık 200 kelimelik bir yazı yaz. Beş yönlendirme noktasının hepsini işle ve aralarında bağ kur.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Beschreiben Sie, worum es bei Spracherhalt geht.", tr: "Dilin korunmasının ne demek olduğunu betimle." },
              { de: "Nennen Sie zwei Gründe, warum Sprachen verloren gehen.", tr: "Dillerin neden yitirildiğine iki neden göster." },
              { de: "Vergleichen Sie die Lage in zwei Ländern oder Regionen.", tr: "İki ülke ya da bölgedeki durumu karşılaştır." },
              { de: "Wägen Sie ab, was Familien und was Institutionen leisten können.", tr: "Ailelerin ve kurumların ne yapabileceğini tart." },
              { de: "Formulieren Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuç yaz." },
            ],
            sample: `Spracherhalt bedeutet nicht, eine Sprache zu konservieren, sondern Gelegenheiten zu schaffen, bei denen sie tatsächlich gebraucht wird. Wo diese Gelegenheiten fehlen, verschwindet eine Sprache auch dann, wenn niemand sie aufgeben wollte.

Dafür lassen sich zwei Gründe anführen. Zum einen wird in der Zweitsprache belohnt, was in der Erstsprache lediglich geduldet wird; Kinder erkennen sehr früh, welche Sprache Zugang verschafft. Zum anderen fehlt es an Anlässen jenseits der Familie — und eine Sprache, die nur zu Hause vorkommt, verliert zwangsläufig an Reichweite.

Der Vergleich zwischen zwei Ländern macht das deutlich. Während in einem Land Herkunftssprachen als Privatsache gelten und außerhalb der Schulzeit organisiert werden, sind sie im anderen als reguläres Fach anerkannt und werden benotet. Der Unterschied liegt weniger im Geld als in der Frage, ob etwas als Leistung zählt. Wo eine Sprache benotet wird, taucht sie in Zeugnissen und Bewerbungen auf und wird damit für Jugendliche zu etwas, das sich zu behalten lohnt.

Familien können viel, aber nicht alles. Sie sichern den mündlichen Gebrauch, selten jedoch Schrift und Fachsprache; beides verlangt Unterricht. Institutionen wiederum können Struktur bieten, ersetzen aber nicht die Selbstverständlichkeit des Alltags.

Daraus folgt, dass Spracherhalt weder allein delegiert noch allein privat gelöst werden kann. Er gelingt dort, wo beide Seiten dasselbe Signal senden — nämlich, dass diese Sprache dazugehört.`,
            criteria: [
              "Beş yönlendirme noktasının hepsi işlendi mi?",
              "Noktalar arasında bağ kuruldu mu, yoksa beş ayrı bölüm mü yan yana duruyor?",
              "Karşılaştırma tek bir ölçüt üzerinden mi yürüyor (burada: bir şeyin başarı sayılıp sayılmaması)?",
              "Ailelerin ve kurumların yapabilecekleri gerçekten karşılıklı tartıldı mı?",
              "Dil C1 düzeyinde mi: adlaştırma, `während/zum einen … zum anderen/zwangsläufig` gibi bağlayıcılar, ölçü bildiren belirteçler?",
              "Yaklaşık 200 kelime var mı?",
            ],
          },
        },
        {
          id: "de-c1-02-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an eine Stiftung, die Sprachprojekte fördert. Der Entwurf unten ist zu umgangssprachlich. Ergänzen Sie die Lücken 1 bis 10 mit einer stilistisch angemessenen Wendung. Die Funktion jeder Lücke steht in Klammern.",
          promptTr:
            "Dil projelerini destekleyen bir vakfa yazıyorsun. Aşağıdaki taslak fazla günlük dilde. 1–10. boşlukları üsluba uygun bir ifadeyle tamamla. Her boşluğun işlevi parantez içinde yazılı.",
          texts: [
            {
              kind: "text",
              id: "br1",
              genre: "Formelles Schreiben",
              genreTr: "Resmî yazı",
              title: "An die Stiftung Sprachbrücke — Förderantrag",
              body: `Sehr geehrte Damen und Herren,

{{1}} bewerben wir uns um eine Förderung aus Ihrem Programm "Sprache im Stadtteil".

Unser Verein betreibt seit sechs Jahren ein Lesepatenprojekt an vier Grundschulen. Die Nachfrage {{2}} in dieser Zeit kontinuierlich gestiegen; derzeit warten achtundzwanzig Kinder auf einen Platz.

{{3}} können wir diese Nachfrage aus eigenen Mitteln nicht mehr decken. {{4}} beantragen wir einen Zuschuss zu den Personalkosten für eine halbe Koordinationsstelle.

{{5}} liegt eine detaillierte Kalkulation bei. {{6}} weisen wir darauf hin, dass die Räume von den Schulen unentgeltlich zur Verfügung gestellt werden.

{{7}}, uns bis Ende Juni eine Rückmeldung zu geben, da die Planung für das kommende Schuljahr im Juli abgeschlossen sein muss.

Für Rückfragen {{8}} gern zur Verfügung.

{{9}} für Ihre Mühe.

{{10}}
Dr. Elena Sturm, Vorstand`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-02-s2-1",
              no: 1,
              text: "Lücke 1 (Bezug auf eine Ausschreibung)",
              accept: [
                "Bezug nehmend auf Ihre Ausschreibung",
                "unter Bezugnahme auf Ihre Ausschreibung",
                "mit Bezug auf Ihre Ausschreibung",
                "Bezugnehmend auf Ihre Ausschreibung",
                "Auf Ihre Ausschreibung hin",
              ],
              explain:
                "Başvuru yazısı çağrıya göndermeyle açılır: `Bezug nehmend auf Ihre Ausschreibung …`. \"Wegen Ihrer Anzeige\" bu düzeyde uygun değildir.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-2",
              no: 2,
              text: "Lücke 2 (Hilfsverb im Perfekt zu \"steigen\")",
              accept: ["ist"],
              explain:
                "`steigen` yer/durum değişimi bildiren bir fiil olduğu için Perfekt'i `sein` ile kurulur: \"Die Nachfrage ist … gestiegen.\" `hat` yaygın bir hatadır.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-3",
              no: 3,
              text: "Lücke 3 (bedauernder Übergang)",
              accept: ["Leider", "Bedauerlicherweise", "Zu unserem Bedauern"],
              explain:
                "Olumlu gelişmeden sınıra geçiş: `Leider` ya da daha resmî `Bedauerlicherweise`. Cümle başında yer aldığı için özne-fiil sırası devrik olur.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-4",
              no: 4,
              text: "Lücke 4 (Folge: deshalb)",
              accept: ["Daher", "Deshalb", "Aus diesem Grund", "Deswegen", "Infolgedessen"],
              explain:
                "Gerekçeden istemi çıkaran bağlayıcı. Resmî yazışmada `Daher` ya da `Aus diesem Grund` yeğlenir.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-5",
              no: 5,
              text: "Lücke 5 (Hinweis auf eine Anlage)",
              accept: ["Diesem Schreiben", "Dem Antrag", "Als Anlage", "Anbei", "Beigefügt"],
              explain:
                "Ek belge duyurulur: `Diesem Schreiben liegt eine detaillierte Kalkulation bei` ya da `Als Anlage …`. Fiil `beiliegen` olduğu için datif tümleç uygun düşer.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-6",
              no: 6,
              text: "Lücke 6 (Ergänzung: außerdem)",
              accept: ["Ergänzend", "Darüber hinaus", "Zudem", "Ferner", "Außerdem", "Des Weiteren", "Überdies"],
              explain:
                "Ek bilgi getiren resmî bağlayıcı: `Ergänzend weisen wir darauf hin …` / `Darüber hinaus …`.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-7",
              no: 7,
              text: "Lücke 7 (höfliche Bitte mit Frist)",
              accept: [
                "Wir bitten Sie",
                "Wir würden Sie bitten",
                "Wir wären Ihnen dankbar",
                "Wir möchten Sie bitten",
              ],
              explain:
                "Süre içeren bir rica kibar kalıpla kurulur ve `zu`-mastarla devam eder: `Wir bitten Sie, uns bis Ende Juni …`.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-8",
              no: 8,
              text: "Lücke 8 (Bereitschaft, erreichbar zu sein)",
              accept: ["stehen wir Ihnen", "stehe ich Ihnen", "stehen wir"],
              explain:
                "Kalıplaşmış kapanış: `Für Rückfragen stehen wir Ihnen gern zur Verfügung.` Tümleç başta olduğu için fiil hemen boşlukta gelir.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-9",
              no: 9,
              text: "Lücke 9 (Dank)",
              accept: ["Wir danken Ihnen", "Vielen Dank", "Herzlichen Dank", "Wir bedanken uns", "Besten Dank", "Wir danken"],
              explain:
                "Teşekkür ayrı bir satır olarak durur: `Wir danken Ihnen für Ihre Mühe.` Resmî yazıda `Danke!` tek başına yetersiz kalır.",
            },
            {
              kind: "gap",
              id: "de-c1-02-s2-10",
              no: 10,
              text: "Lücke 10 (Grußformel)",
              accept: ["Mit freundlichen Grüßen", "Mit freundlichem Gruß", "Freundliche Grüße", "Mit besten Grüßen"],
              explain:
                "Adı bilinmeyen bir muhataba yazılan yazının kapanışı da `Mit freundlichen Grüßen`dir; hitap ile veda birbirine uyar.",
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
          id: "de-c1-02-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Was geht verloren, wenn eine Sprache verschwindet?\". Behandeln Sie fünf Inhaltspunkte: Einstieg — Beschreibung des Phänomens — Ursachen — Folgen auf verschiedenen Ebenen — eigene Bewertung mit Ausblick.",
          promptTr:
            "\"Bir dil yok olunca ne yiter?\" konusunda yaklaşık dört dakikalık bir sunum yap. Beş içerik noktasını işle: giriş — olgunun betimlenmesi — nedenler — farklı düzeylerdeki sonuçlar — kendi değerlendirmen ve öngörün.",
          prepSeconds: 240,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "das Thema pointiert einführen", tr: "Konuyu çarpıcı biçimde açmak" },
              { de: "Ursachen und Folgen auseinanderhalten", tr: "Nedenlerle sonuçları ayırmak" },
              { de: "zwischen Ebenen unterscheiden (Person, Familie, Gesellschaft)", tr: "Düzeyleri ayırmak (birey, aile, toplum)" },
              { de: "eine abgewogene Bewertung mit Ausblick geben", tr: "Ölçülü bir değerlendirme ve öngörü sunmak" },
            ],
            sample:
              "Ich möchte mit einer Unterscheidung beginnen, die selten gemacht wird: Sprachen sterben nicht, sie werden aufgegeben — meist von Menschen, die gute Gründe dafür haben. Beschreiben lässt sich das Phänomen als Kettenreaktion über drei Generationen: Die erste spricht die Sprache, die zweite versteht sie, die dritte kennt einzelne Wörter. Auffällig ist, dass der Bruch fast immer in der zweiten Generation liegt. Als Ursachen sehe ich vor allem zwei. Erstens die ungleiche Belohnung: Die eine Sprache verschafft Zugang zu Ausbildung und Arbeit, die andere wird bestenfalls geduldet. Zweitens das Fehlen von Anlässen außerhalb der Familie; was nur am Küchentisch vorkommt, deckt irgendwann nur noch den Küchentisch ab. Die Folgen liegen auf verschiedenen Ebenen. Persönlich geht der unmittelbare Zugang zu den Älteren verloren, familiär eine geteilte Selbstverständlichkeit, gesellschaftlich ein Wissensbestand, der sich nicht rekonstruieren lässt. Meine Bewertung fällt zurückhaltend aus: Ich halte wenig von Appellen an Familien, die ohnehin unter Druck stehen. Wirksam sind Angebote, die Sichtbarkeit herstellen — Unterricht, der zählt, Prüfungen, die etwas bedeuten. Wenn eine Sprache in Zeugnissen vorkommt, verschwindet sie langsamer.",
            criteria: [
              "Beş içerik noktası işlendi mi ve yapı işitilebiliyor mu?",
              "Nedenler ile sonuçlar birbirine karıştırılmadan verildi mi?",
              "Farklı düzeyler (birey, aile, toplum) gerçekten ayrıldı mı?",
              "Değerlendirme ölçülü mü ve bir öngörüyle bağlanıyor mu?",
              "Dil C1 düzeyinde mi: soyut adlar, adlaştırma, ölçü bildiren belirteçler (bestenfalls, zurückhaltend, ohnehin)?",
              "Sunum dört dakikaya yakın ve akıcı mı?",
            ],
          },
        },
        {
          id: "de-c1-02-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Eine Schule erhält Mittel für ein Sprachprojekt. Zur Wahl stehen: (a) Herkunftssprachenunterricht für die drei größten Sprachgruppen, (b) eine Fortbildung für alle Lehrkräfte zum Umgang mit Mehrsprachigkeit, (c) eine mehrsprachige Schulbibliothek. Diskutieren Sie Vor- und Nachteile und einigen Sie sich.",
          promptTr:
            "Bir okula dil projesi için bütçe veriliyor. Seçenekler: (a) en büyük üç dil grubu için köken dili dersi, (b) tüm öğretmenlere çok dillilikle çalışma eğitimi, (c) çok dilli bir okul kütüphanesi. Artı ve eksileri tartışın ve anlaşın.",
          prepSeconds: 120,
          exchange: [
            { who: "partner", de: "Eine Schule erhält Mittel für genau ein Sprachprojekt. Zur Wahl stehen Herkunftssprachenunterricht für die drei größten Sprachgruppen, eine Fortbildung für alle Lehrkräfte und eine mehrsprachige Schulbibliothek. Wofür plädieren Sie?", tr: "Bir okula tam bir dil projesi için bütçe veriliyor. Seçenekler: en büyük üç dil grubu için köken dili dersi, tüm öğretmenlere eğitim ve çok dilli bir okul kütüphanesi. Sen hangisini savunursun?" },
            { who: "you", hint: "Bir seçeneği seç ve ölçütünü adlandırarak gerekçelendir.", expect: "üç seçenekten birini seçmek ve gerekçeyi açık bir ölçüte bağlamak", seconds: 60 },
            { who: "partner", de: "Das kann ich nachvollziehen. Mit Fortbildungen habe ich allerdings schlechte Erfahrungen gemacht: Nach zwei Wochen ist der Alltag zurück, und geblieben ist nichts.", tr: "Bunu anlıyorum. Ama eğitimlerle kötü deneyimlerim oldu: İki hafta sonra rutin geri geliyor ve geriye bir şey kalmıyor." },
            { who: "you", hint: "İtirazı ele al; gerekirse konumunu düzelt.", expect: "bir itirazı ciddiye alıp karşılamak, gerekirse kendi konumunu düzeltmek", seconds: 60 },
            { who: "partner", de: "Der Unterricht hinterlässt immerhin etwas Sichtbares. Nur erreicht er drei Sprachen — die übrigen Familien fragen zu Recht, warum sie leer ausgehen.", tr: "Ders en azından görünür bir şey bırakıyor. Ama üç dile ulaşıyor; geri kalan aileler haklı olarak neden dışarıda kaldıklarını soruyor." },
            { who: "you", hint: "Kapsayıcılık ile kalıcılık arasındaki gerilimi ele al ve bir çözüm öner.", expect: "iki ölçüt arasındaki gerilimi adlandırmak ve bir çözüm önermek", seconds: 60 },
            { who: "partner", de: "Das wäre ein gangbarer Weg. Formulieren wir das gemeinsame Ergebnis, samt einer Bedingung?", tr: "Bu yürüyebilir bir yol. Ortak sonucu bir koşulla birlikte formüle edelim mi?" },
            { who: "you", hint: "Ortak kararı somut biçimde formüle et.", expect: "ortak kararı somut biçimde (oran, koşul, gözden geçirme) formüle etmek", seconds: 50 },
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
              "Ich würde für die Fortbildung plädieren, weil sie als einzige alle Kinder erreicht — auch die, deren Sprache nicht zu den drei größten gehört. — Das leuchtet mir ein, allerdings habe ich mit Fortbildungen schlechte Erfahrungen gemacht: Nach zwei Wochen ist der Alltag zurück. Der Unterricht dagegen hinterlässt etwas Sichtbares. — Der Einwand ist berechtigt, und ich würde ihn nicht wegwischen. Nur schafft der Unterricht für drei Sprachen genau das Problem, das wir kennen: Die übrigen Familien fragen zu Recht, warum sie leer ausgehen. — Die Bibliothek hätte diesen Nachteil nicht. — Sie hätte dafür einen anderen: Bücher, die niemand anleitet, bleiben im Regal. — Dann schlage ich vor, zwei Drittel in die Fortbildung zu geben und ein Drittel in einen Grundbestand für die Bibliothek, den die fortgebildeten Kolleginnen dann auch nutzen können. — Damit kann ich mitgehen, unter der Bedingung, dass wir nach einem Jahr prüfen, ob die Bücher tatsächlich eingesetzt werden.",
            criteria: [
              "Üç seçenek de gerçekten tartıldı mı?",
              "Tercih bir ölçütle gerekçelendirildi mi (kapsayıcılık, kalıcılık, kullanılabilirlik)?",
              "İtirazlar karşılandı mı ve en az bir kez ödün verildi mi?",
              "Anlaşma somut mu (oran, koşul, gözden geçirme)?",
              "Karşı çıkma ve uzlaşma kalıpları C1 düzeyinde mi? (Der Einwand ist berechtigt / Ich würde ihn nicht wegwischen / unter der Bedingung, dass …)",
            ],
          },
        },
      ],
    },
  ],
};
