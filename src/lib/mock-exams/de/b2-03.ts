import type { MockPaper } from "../types";

/**
 * B2 · Deneme 3 — "Arbeit und Automatisierung".
 *
 * PLAN kâğıt 1 ve 2 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde
 *     Teil 1  9  dört kişi — bunu kim söylüyor (opinion)
 *     Teil 2  6  cümle yerleştirme — metnin örgüsü (structure)
 *     Teil 3  6  köşe yazısı — yazarın tutumu (opinion)
 *     Teil 4  6  sekiz görüş — ifadeyi sahibiyle eşleştir (opinion)
 *     Teil 5  3  işletme sözleşmesi — kural (instruction)
 *   Hören  40 dk · 30 madde
 *     Teil 1 10  karışık · Teil 2 6 söyleşi · Teil 3 6 tartışma · Teil 4 8 sunum
 *   Schreiben 75 dk  okur mektubu (150) + yarı resmî ileti (100)
 *   Sprechen  15 dk  sunum (4 dk) + tartışıp uzlaşma
 *
 * KONU SEÇİMİ: otomasyon, B2'nin asıl ölçtüğü şeyi zorluyor — aynı olguya
 * bakan kişilerin nerede ayrıştığını görmek. Teil 1 ve Teil 4'te kişiler
 * büyük ölçüde aynı şeyi savunuyor; madde onları ayıran ayrıntıyı soruyor.
 */
export const B2_03: MockPaper = {
  id: "de-b2-03",
  course: "de",
  level: "B2",
  no: 3,
  theme: "Arbeit und Automatisierung",
  themeTr: "İş ve otomasyon",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Berichte, einen Sachtext, einen Kommentar, Meinungsäußerungen und eine Betriebsvereinbarung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel anlatılar, bir bilgi metni, bir köşe yazısı, görüş bildirimleri ve bir işletme sözleşmesi okuyacaksın.",
      tasks: [
        {
          id: "de-b2-03-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben darüber, wie automatische Werkzeuge ihre Arbeit verändert haben. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi, otomatik araçların işlerini nasıl değiştirdiğini yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht A",
              genreTr: "Deneyim yazısı A",
              title: "Aylin, Übersetzerin",
              body: `Seit zwei Jahren übersetze ich kaum noch von null. Der erste Entwurf kommt aus der Maschine, ich prüfe ihn und schreibe die Hälfte um. Das klingt nach weniger Arbeit, ist aber anstrengender: Fehler in einem flüssigen Text zu finden verlangt mehr Aufmerksamkeit als selbst zu formulieren.

Bezahlt werde ich inzwischen nach Zeilen, die ich ändere. Wer schnell prüft, verdient weniger als früher; wer gründlich prüft, verdient ebenfalls weniger, weil er langsamer ist. Diese Rechnung geht für niemanden auf, und darüber wird in meiner Branche zu selten offen gesprochen.

Trotzdem würde ich das Werkzeug nicht abgeben. Bei Gebrauchsanleitungen und Verträgen ist es besser als sein Ruf. Nur behauptet niemand mehr, dass literarische Texte ähnlich funktionieren — das haben inzwischen alle einmal ausprobiert.`,
              gloss: [
                { de: "der Entwurf", tr: "taslak", en: "draft" },
                { de: "aufgehen (Rechnung)", tr: "hesap tutmak", en: "to add up" },
                { de: "besser als sein Ruf", tr: "adı çıktığı kadar kötü değil", en: "better than its reputation" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht B",
              genreTr: "Deneyim yazısı B",
              title: "Robert, Pflegefachkraft",
              body: `Bei uns wurde vor einem Jahr die Dokumentation umgestellt. Ich spreche jetzt in ein Gerät, und der Text landet fertig in der Akte. Die Umstellung hat mir pro Schicht ungefähr vierzig Minuten zurückgegeben, und diese Minuten sind zum Patienten gegangen, nicht zu weiteren Aufgaben.

Das war allerdings kein Selbstläufer. In den ersten Wochen hat das Gerät Namen falsch verstanden, und zweimal stand in der Akte etwas, das so niemand gesagt hatte. Erst nachdem eine Kollegin die Fehler systematisch gesammelt hatte, wurde nachgebessert.

Was mich stört, ist die Erwartung, die daraus entstanden ist. Weil die Dokumentation schneller geht, sollen wir jetzt einen Patienten mehr betreuen. Damit ist der Gewinn wieder weg, und zwar für alle außer für den Träger.`,
              gloss: [
                { de: "die Akte", tr: "dosya, kayıt", en: "file, record" },
                { de: "der Selbstläufer", tr: "kendiliğinden yürüyen iş", en: "something that runs by itself" },
                { de: "nachbessern", tr: "sonradan düzeltmek", en: "to rectify" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht C",
              genreTr: "Deneyim yazısı C",
              title: "Frau Doll, Kfz-Meisterin",
              body: `In meiner Werkstatt steht seit drei Jahren ein Diagnosegerät, das jeden Fehlercode liest und einen Vorschlag macht. Junge Kollegen vertrauen dem Vorschlag zu schnell. Ich lasse sie deshalb erst sagen, was sie selbst vermuten, und dann darf das Gerät sprechen.

Der Nutzen ist unbestritten: Wir finden elektrische Fehler in Minuten, für die wir früher einen halben Tag gebraucht haben. Verloren geht dabei etwas anderes, nämlich die Fähigkeit, ein Geräusch einzuordnen. Diese Fähigkeit entsteht nur, wenn man oft danebenliegt.

Ich bilde weiter aus, und die Prüfung ist inzwischen leichter geworden. Ob die Ausbildung dadurch besser geworden ist, bezweifle ich. Man kann eine Diagnose bestehen, ohne je selbst eine gestellt zu haben.`,
              gloss: [
                { de: "unbestritten", tr: "tartışmasız", en: "undisputed" },
                { de: "einordnen", tr: "yerli yerine oturtmak, teşhis etmek", en: "to classify" },
                { de: "danebenliegen", tr: "yanılmak", en: "to be wrong" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht D",
              genreTr: "Deneyim yazısı D",
              title: "Nils, Lehrer",
              body: `Meine Schüler nutzen die Werkzeuge sowieso, das war nie die Frage. Die Frage ist, wofür ich noch Noten gebe. Ein Aufsatz zu Hause sagt mir seit zwei Jahren nichts mehr über den Schüler, sondern über sein Werkzeug.

Ich habe deshalb umgestellt: geschrieben wird im Unterricht, überarbeitet wird zu Hause mit allen Hilfsmitteln, und benotet wird die Überarbeitung samt Begründung. Das ist mehr Arbeit für mich und ehrlicher für alle.

Kollegen halten mir vor, ich machte es den Schülern zu leicht. Ich sehe es umgekehrt: Wer erklären muss, warum er einen Satz geändert hat, kommt an dieser Stelle nicht mit einem Klick durch. Die Prüfung ist damit näher an dem, was später verlangt wird.`,
              gloss: [
                { de: "der Aufsatz", tr: "kompozisyon", en: "essay" },
                { de: "überarbeiten", tr: "üzerinden geçip düzeltmek", en: "to revise" },
                { de: "vorhalten", tr: "yüzüne vurmak, eleştirmek", en: "to reproach" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-03-l1-1",
              no: 1,
              text: "Wer beschreibt, dass die Prüfung des maschinellen Ergebnisses mehr Konzentration verlangt als die eigene Arbeit?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 0,
              explain:
                "Aylin: \"Fehler in einem flüssigen Text zu finden verlangt mehr Aufmerksamkeit als selbst zu formulieren\". Frau Doll da güvene değiniyor ama zihinsel yükü değil, genç meslektaşların acele etmesini eleştiriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-2",
              no: 2,
              text: "Wer berichtet, dass eine Verbesserung erst nach dokumentierten Fehlern kam?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 1,
              explain:
                "Robert: \"Erst nachdem eine Kollegin die Fehler systematisch gesammelt hatte, wurde nachgebessert\" — düzeltme ancak belgelenmiş hatalardan sonra geliyor. Öteki üç metinde böyle bir düzeltme süreci anlatılmıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-3",
              no: 3,
              text: "Wer sieht eine Fähigkeit verschwinden, die nur durch eigene Irrtümer entsteht?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 2,
              explain:
                "Frau Doll sesi yerli yerine oturtma becerisini kastediyor: \"Diese Fähigkeit entsteht nur, wenn man oft danebenliegt\". Nils de bir kayıptan söz ediyor ama onunki ölçme sorunu.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-4",
              no: 4,
              text: "Wer hat die eigene Bewertungspraxis grundlegend geändert?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 3,
              explain:
                "Nils düzeni tersine çevirmiş: \"geschrieben wird im Unterricht, überarbeitet wird zu Hause\" ve not gerekçeli düzeltmeye veriliyor. Frau Doll sınavın kolaylaştığını söylüyor ama bunu kendisi değiştirmiş değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-5",
              no: 5,
              text: "Wer stellt fest, dass die Bezahlung unabhängig vom Arbeitstempo schlechter ausfällt?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 0,
              explain:
                "Aylin iki yolu da kapalı buluyor: hızlı denetleyen az kazanıyor, dikkatli denetleyen de yavaş olduğu için az kazanıyor. \"Diese Rechnung geht für niemanden auf\".",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-6",
              no: 6,
              text: "Wer verlangt von Auszubildenden eine eigene Einschätzung, bevor das Gerät antwortet?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 2,
              explain:
                "Frau Doll'un yöntemi: önce genç meslektaş kendi tahminini söylüyor, \"und dann darf das Gerät sprechen\". Sıralamayı bilerek tersine çeviriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-7",
              no: 7,
              text: "Wer weist den Vorwurf zurück, die eigene Lösung mache es den Betroffenen zu bequem?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 3,
              explain:
                "Nils meslektaşlarının eleştirisini aktarıp \"Ich sehe es umgekehrt\" diyor: bir cümleyi neden değiştirdiğini açıklamak zorunda olan tek tıkla kurtulamaz.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-8",
              no: 8,
              text: "Wer betont, dass das Werkzeug trotz aller Kritik in bestimmten Textsorten überzeugt?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 0,
              explain:
                "Aylin kullanım kılavuzları ve sözleşmeler için \"besser als sein Ruf\" diyor, edebî metinler için değil. Yani eleştirisi tümden bir ret değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l1-9",
              no: 9,
              text: "Wer beschreibt, dass ein Zeitgewinn durch höhere Anforderungen wieder aufgezehrt wurde?",
              options: ["Aylin", "Robert", "Frau Doll", "Nils"],
              answer: 1,
              explain:
                "Robert vardiya başına kazanılan 40 dakikayı anlatıyor, ardından bir hasta daha bakma beklentisini: \"Damit ist der Gewinn wieder weg\".",
            },
          ],
        },
        {
          id: "de-b2-03-l2",
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
              title: "Warum Automatisierung selten ganze Berufe ersetzt",
              body: `Die öffentliche Debatte spricht von Berufen, die verschwinden. Die Untersuchungen der letzten Jahre legen etwas anderes nahe: Verschwunden sind fast nie Berufe, sondern einzelne Tätigkeiten innerhalb eines Berufs. {{10}}

Der Grund liegt in der Zusammensetzung der Arbeit. Ein Beruf besteht aus einem Bündel sehr verschiedener Aufgaben, von denen sich meist nur ein Teil beschreiben und damit automatisieren lässt. {{11}}

Deutlich wird das an der Buchhaltung. Das Erfassen von Belegen ist heute weitgehend automatisiert, die Klärung eines widersprüchlichen Falls hingegen nicht. {{12}}

Daraus folgt eine Verschiebung, die in Statistiken kaum sichtbar wird. Die Zahl der Stellen bleibt stabil, während sich der Inhalt derselben Stelle innerhalb weniger Jahre verändert. {{13}}

Für die Betroffenen ist diese Verschiebung nicht harmlos. Wer in einem Beruf gelernt hat, die einfachen Fälle zu bearbeiten, verliert genau die Stufe, auf der man früher Sicherheit gewonnen hat. {{14}}

Die Politik reagiert bislang vor allem mit Programmen für Umschulung. Sinnvoller wäre es, die Weiterbildung dorthin zu verlagern, wo die Veränderung tatsächlich stattfindet. {{15}}`,
              gloss: [
                { de: "die Tätigkeit", tr: "yapılan iş, faaliyet", en: "activity, task" },
                { de: "das Bündel", tr: "demet, küme", en: "bundle" },
                { de: "der Beleg", tr: "belge, fiş", en: "receipt, voucher" },
                { de: "die Verschiebung", tr: "kayma, yer değiştirme", en: "shift" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Wer heute dort anfängt, beginnt sofort mit den schwierigen Fällen — ohne die Übung, die früher davor lag.",
            },
            {
              key: "b",
              label: "b",
              body: "Übrig bleibt in der Regel das, was Abwägung, Verantwortung oder den Umgang mit Menschen verlangt.",
            },
            {
              key: "c",
              label: "c",
              body: "Gemeint sind damit vor allem Tätigkeiten, die sich in klaren Schritten beschreiben lassen und häufig wiederkehren.",
            },
            {
              key: "d",
              label: "d",
              body: "Gemeint ist damit der Betrieb selbst, in dem die neuen Werkzeuge eingeführt werden und die Fragen zuerst auftauchen.",
            },
            {
              key: "e",
              label: "e",
              body: "Der Anteil der Beschäftigten mit Hochschulabschluss ist in diesem Zeitraum um mehrere Prozentpunkte gestiegen.",
            },
            {
              key: "f",
              label: "f",
              body: "Wer nur die Zahl der Arbeitsplätze betrachtet, übersieht deshalb genau das, worauf es ankommt.",
            },
            {
              key: "g",
              label: "g",
              body: "In vielen Betrieben werden Belege inzwischen ausschließlich digital aufbewahrt.",
            },
            {
              key: "h",
              label: "h",
              body: "Wie stark ein Beruf betroffen ist, hängt folglich weniger von seinem Namen ab als von diesem Anteil.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-03-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "c",
              explain:
                "Boşluktan önce \"einzelne Tätigkeiten\" deniyor; (c) bu ifadeyi \"Gemeint sind damit\" ile alıp tanımlıyor. (b) de tanım gibi görünüyor ama artakalanı anlatır, kaybolanı değil.",
            },
            {
              kind: "match",
              id: "de-b2-03-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "b",
              explain:
                "Paragraf sınırı koyuyor: \"von denen sich meist nur ein Teil beschreiben und damit automatisieren lässt\"; (b) geriye ne kaldığını tamamlıyor: tartıp karar verme, sorumluluk, insanla ilişki.",
            },
            {
              kind: "match",
              id: "de-b2-03-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "h",
              explain:
                "Muhasebe örneği iki tür işi karşılaştırıyor — \"Das Erfassen von Belegen ist heute weitgehend automatisiert\", çelişkili vakanın çözümü değil; (h) buradan genel kuralı çıkarıyor: belirleyici olan mesleğin adı değil bu oran. (g) de muhasebeden söz ediyor ama argümanı ilerletmiyor.",
            },
            {
              kind: "match",
              id: "de-b2-03-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "f",
              explain:
                "Paragraf \"Die Zahl der Stellen bleibt stabil\" derken içeriğin değiştiğini ekliyor; (f) bunun sonucunu bağlıyor: yalnız sayıya bakan asıl meseleyi kaçırıyor.",
            },
            {
              kind: "match",
              id: "de-b2-03-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "a",
              explain:
                "Kaybolan şey \"die Stufe, auf der man früher Sicherheit gewonnen hat\"; (a) bunun somut sonucunu veriyor: yeni başlayan doğrudan zor vakalarla başlıyor.",
            },
            {
              kind: "match",
              id: "de-b2-03-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "d",
              explain:
                "Metin eğitimin \"dorthin\" kaydırılmasını öneriyor ve orasının neresi olduğunu söylemiyor; (d) \"Gemeint ist damit der Betrieb selbst\" diyerek boşluğu dolduruyor.",
            },
          ],
        },
        {
          id: "de-b2-03-l3",
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
              title: "Umschulung ist kein Rettungsring",
              body: `Wenn in einer Branche Stellen wegfallen, folgt die Antwort der Politik seit dreißig Jahren demselben Muster: ein Programm, ein Budget, eine Zahl von Plätzen. Die Vorstellung dahinter ist einfach — wer seine Arbeit verliert, lernt eben etwas Neues.

Man sollte diese Programme nicht kleinreden. Sie haben vielen Menschen einen zweiten Beruf ermöglicht, und die Evaluationen zeigen bei jüngeren Teilnehmenden ordentliche Ergebnisse. Nur beantworten sie eine Frage, die inzwischen seltener gestellt wird.

Denn der typische Fall ist heute nicht mehr die geschlossene Fabrik. Der typische Fall ist die Stelle, die es weiterhin gibt, deren Inhalt sich aber binnen drei Jahren zur Hälfte verändert hat. Für diesen Fall ist eine zweijährige Umschulung das falsche Werkzeug: Sie setzt einen Bruch voraus, den es gar nicht gibt.

Was fehlt, ist unspektakulär. Es fehlt Zeit im laufenden Arbeitsverhältnis — bezahlte, verbindlich geplante Zeit, in der Beschäftigte lernen, was ihr Betrieb gerade einführt. Wer das nur der Freiwilligkeit überlässt, bekommt Weiterbildung dort, wo ohnehin schon viel gelernt wird, und keine dort, wo sie am dringendsten wäre.

Die Betriebe verweisen an dieser Stelle gern auf die Kosten. Das Argument ist ernst zu nehmen, allerdings nicht so, wie es gemeint ist: Weiterbildung im Betrieb ist tatsächlich teurer als ein staatliches Programm — nur zahlt beim Programm ein anderer.

Es wäre also ehrlicher, offen über die Verteilung dieser Kosten zu streiten, statt weiter Plätze zu zählen. Die Zahl der Umschulungsplätze sagt nichts darüber, ob jemand seiner Arbeit gewachsen bleibt.`,
              gloss: [
                { de: "kleinreden", tr: "küçümsemek, önemsizleştirmek", en: "to play down" },
                { de: "der Bruch", tr: "kopuş, kırılma", en: "break, rupture" },
                { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
                { de: "gewachsen sein", tr: "üstesinden gelebilmek", en: "to be up to (a task)" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-03-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie bewertet der Autor die bestehenden Umschulungsprogramme?",
              options: [
                "Als grundsätzlich gescheitert und deshalb ersatzlos abzuschaffen.",
                "Als wirksam, aber am falschen Fall orientiert.",
                "Als Programme, deren Nutzen die Evaluationen nicht belegen.",
              ],
              answer: 1,
              explain:
                "Yazar programları \"nicht kleinreden\" diyor ve genç katılımcılarda iyi sonuç verdiklerini kabul ediyor; itirazı yalnız artık seyrek görülen bir duruma yanıt vermeleri. Maliyet eleştirisi işletmelerin ağzından geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l3-17",
              no: 17,
              ref: "k1",
              text: "Was ist nach Ansicht des Autors der typische Fall von heute?",
              options: [
                "Ein Betrieb, der schließt und seine Belegschaft entlässt.",
                "Ein Beruf, der aus dem Berufsverzeichnis gestrichen wird.",
                "Ein Arbeitsplatz mit stark gewandelten Aufgaben.",
              ],
              answer: 2,
              explain:
                "Metin karşıtlığı kendisi kuruyor: kapanan fabrika değil, içeriği \"binnen drei Jahren zur Hälfte verändert\" olan kadro. Bu yüzden iki yıllık yeniden eğitim yanlış araç sayılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l3-18",
              no: 18,
              ref: "k1",
              text: "Warum passt eine zweijährige Umschulung für diesen Fall nicht?",
              options: [
                "Weil sie einen Bruch unterstellt.",
                "Weil zwei Jahre für einen neuen Beruf zu kurz sind.",
                "Weil die Teilnehmenden dafür zu alt geworden sind.",
              ],
              answer: 0,
              explain:
                "Gerekçe açıkça veriliyor: \"Sie setzt einen Bruch voraus, den es gar nicht gibt\". Yaş yalnız programların işe yaradığı grubu tarif ederken geçiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l3-19",
              no: 19,
              ref: "k1",
              text: "Was kritisiert der Autor an freiwilliger Weiterbildung?",
              options: [
                "Dass die Angebote inhaltlich zu anspruchsvoll gestaltet sind.",
                "Dass sie dort stattfindet, wo ohnehin gelernt wird.",
                "Dass die Betriebe sie nicht ausreichend bewerben.",
              ],
              answer: 1,
              explain:
                "Metin dağılım sorununu adlandırıyor: gönüllülük \"bekommt Weiterbildung dort, wo ohnehin schon viel gelernt wird\" sonucunu doğuruyor, en gerekli olduğu yerde ise hiç olmuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l3-20",
              no: 20,
              ref: "k1",
              text: "Wie geht der Autor mit dem Kostenargument der Betriebe um?",
              options: [
                "Er weist es als vorgeschoben zurück.",
                "Er übernimmt es und fordert deshalb staatliche Programme.",
                "Er erkennt es an, deutet es aber um.",
              ],
              answer: 2,
              explain:
                "\"Das Argument ist ernst zu nehmen, allerdings nicht so, wie es gemeint ist\" — maliyetin gerçekten yüksek olduğunu kabul ediyor, ama asıl meseleyi kimin ödediğine kaydırıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l3-21",
              no: 21,
              ref: "k1",
              text: "Worauf zielt der letzte Absatz?",
              options: [
                "Auf einen offenen Streit über die Kosten.",
                "Auf eine deutliche Erhöhung der Zahl der Plätze.",
                "Auf ein Ende der staatlichen Förderung insgesamt.",
              ],
              answer: 0,
              explain:
                "Son paragrafın önerisi \"statt weiter Plätze zu zählen\" maliyetin dağılımını açıkça tartışmak. Devlet desteğinin tümden kaldırılması metinde hiçbir yerde savunulmuyor.",
            },
          ],
        },
        {
          id: "de-b2-03-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Betriebe zu bezahlter Weiterbildung verpflichtet werden sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, işletmelerin ücretli eğitime zorunlu tutulup tutulmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Kilian, Handwerksmeisterin",
              body: "Ich bilde selbst aus und schicke meine Leute auf Kurse, ohne dass mich jemand zwingt. Eine Pflicht träfe genau die kleinen Betriebe, die es ohnehin tun, und nicht die großen, die es sich sparen.",
            },
            {
              key: "b",
              label: "b — Herr Sandberg, Betriebsrat",
              body: "Freiwilligkeit hat bei uns fünfzehn Jahre lang bedeutet: Wer fragt, bekommt etwas. Gefragt haben die, die schon studiert hatten. Erst seit es einen festen Anspruch gibt, sitzen auch Leute aus der Produktion in den Kursen.",
            },
            {
              key: "c",
              label: "c — Frau Dr. Weill, Ökonomin",
              body: "Die Wirkung hängt fast vollständig davon ab, wer die Inhalte bestimmt. Wo Betriebe die Themen wählen, steigt die Produktivität. Wo Beschäftigte allein entscheiden, steigt vor allem ihre Mobilität — das ist gut für sie und schlecht für den Betrieb, der zahlt.",
            },
            {
              key: "d",
              label: "d — Herr Bruns, Personalleiter",
              body: "Mein Einwand ist nicht das Geld, sondern die Zeit. Wenn drei von fünfzehn Leuten gleichzeitig in einem Kurs sitzen, steht bei uns eine Linie. Eine Pflicht ohne Ersatzregelung ist deshalb für Schichtbetriebe nicht umsetzbar.",
            },
            {
              key: "e",
              label: "e — Frau Kirchhoff, Weiterbildnerin",
              body: "Ich unterrichte seit zwanzig Jahren Erwachsene und sehe den Unterschied sofort: Wer freiwillig kommt, lernt mehr. Eine Pflicht füllt Räume, keine Köpfe. Man sollte lieber die Bedingungen verbessern, unter denen jemand freiwillig kommt.",
            },
            {
              key: "f",
              label: "f — Herr Yildiz, Facharbeiter",
              body: "Bei uns wurde eine neue Anlage eingeführt und die Einweisung fand in der Freizeit statt, unbezahlt. Ich habe teilgenommen, weil ich meine Stelle behalten wollte. Freiwillig war daran nichts, nur unbezahlt.",
            },
            {
              key: "g",
              label: "g — Frau Steinlein, Juristin",
              body: "Rechtlich ist eine solche Pflicht unproblematisch, sie existiert im Arbeitsschutz längst. Entscheidend ist nicht das Ob, sondern die Frage, wer im Streitfall nachweisen muss, dass die Weiterbildung notwendig war.",
            },
            {
              key: "h",
              label: "h — Herr Netz, Gründer",
              body: "In meiner Branche ist das Wissen nach zwei Jahren veraltet, da brauche ich kein Gesetz. Was ich brauche, sind Kurse, die es überhaupt gibt. Für unsere Themen finde ich im Umkreis von hundert Kilometern nichts.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-03-l4-22",
              no: 22,
              text: "Eine Pflicht würde vor allem diejenigen belasten, die sich ohnehin schon kümmern.",
              answer: "a",
              explain:
                "Frau Kilian yükün küçük işletmelere bineceğini, tasarruf edenlerin ise büyükler olduğunu söylüyor. Herr Bruns de yük görüyor ama onunki zaman ve vardiya sorunu, adalet değil.",
            },
            {
              kind: "match",
              id: "de-b2-03-l4-23",
              no: 23,
              text: "Erst eine feste Regel hat dafür gesorgt, dass nicht nur ohnehin Qualifizierte teilnehmen.",
              answer: "b",
              explain:
                "Herr Sandberg on beş yıllık gönüllülüğün sonucunu anlatıyor: soranlar zaten üniversite bitirmişlerdi. Üretimden gelenler ancak bağlayıcı hak sonrası kursa girmiş.",
            },
            {
              kind: "match",
              id: "de-b2-03-l4-24",
              no: 24,
              text: "Wem die Weiterbildung nützt, hängt davon ab, wer die Themen auswählt.",
              answer: "c",
              explain:
                "Frau Dr. Weill iki durumu ayırıyor: konuları işletme seçerse verimlilik, çalışan seçerse hareketlilik artıyor. Faydanın yönü bu seçime bağlı.",
            },
            {
              kind: "match",
              id: "de-b2-03-l4-25",
              no: 25,
              text: "Ohne eine Regelung für den Ersatz ist die Forderung im Schichtbetrieb nicht umsetzbar.",
              answer: "d",
              explain:
                "Herr Bruns itirazını parada değil zamanda görüyor: on beş kişiden üçü aynı anda kurstaysa hat duruyor. Bu yüzden yerine koyma düzenlemesi şart.",
            },
            {
              kind: "match",
              id: "de-b2-03-l4-26",
              no: 26,
              text: "Was formal freiwillig heißt, kann in der Praxis erzwungen sein.",
              answer: "f",
              explain:
                "Herr Yildiz eğitime işini kaybetmemek için katıldığını söylüyor: \"Freiwillig war daran nichts, nur unbezahlt\". Gönüllülük burada yalnız kâğıt üstünde.",
            },
            {
              kind: "match",
              id: "de-b2-03-l4-27",
              no: 27,
              text: "Eine Verpflichtung nützt nichts, solange es die passenden Angebote nicht gibt.",
              answer: "h",
              explain:
                "Herr Netz yasaya ihtiyacı olmadığını, ihtiyacının kursların var olması olduğunu söylüyor: yüz kilometrelik çevrede kendi konularında hiçbir şey bulamıyor.",
            },
          ],
        },
        {
          id: "de-b2-03-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Betriebsvereinbarung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "İşletme sözleşmesini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Betriebsvereinbarung",
              genreTr: "İşletme sözleşmesi",
              title: "Betriebsvereinbarung über den Einsatz automatischer Assistenzsysteme",
              body: `§ 1 Geltungsbereich
Diese Vereinbarung gilt für alle Beschäftigten des Standorts, einschließlich der Leiharbeitnehmerinnen und Leiharbeitnehmer, nicht jedoch für Auszubildende im ersten Lehrjahr.

§ 2 Zulässige Nutzung
Assistenzsysteme dürfen zur Vorbereitung von Texten, Auswertungen und Übersetzungen eingesetzt werden. Das Ergebnis ist vor der Weitergabe an Dritte durch eine beschäftigte Person zu prüfen; die Verantwortung für den Inhalt verbleibt in jedem Fall bei dieser Person.

§ 3 Personenbezogene Daten
Die Eingabe personenbezogener Daten von Kundinnen, Kunden oder Beschäftigten ist untersagt. Eine Ausnahme besteht für die im Anhang aufgeführten geprüften Systeme; auch dort ist die Eingabe von Gesundheitsdaten ausgeschlossen.

§ 4 Leistungskontrolle
Protokolldaten der Systeme dürfen nicht zur Bewertung individueller Leistung ausgewertet werden. Eine Auswertung in anonymisierter Form zur Verbesserung der Abläufe ist zulässig, sofern der Betriebsrat vorher zugestimmt hat.

§ 5 Qualifizierung
Beschäftigte, deren Aufgaben durch die Einführung eines Systems zu mindestens einem Drittel verändert werden, haben Anspruch auf 24 Stunden bezahlte Schulung pro Jahr. Der Anspruch verfällt nicht, wenn er im laufenden Jahr nicht in Anspruch genommen wird, sondern wird einmalig in das Folgejahr übertragen.

§ 6 Streitfälle
Kommt es über die Auslegung dieser Vereinbarung zu Streit, entscheidet eine paritätisch besetzte Kommission. Bis zu deren Entscheidung gilt die für die Beschäftigten günstigere Auslegung.`,
              gloss: [
                { de: "der Geltungsbereich", tr: "kapsam", en: "scope" },
                { de: "untersagt", tr: "yasak", en: "prohibited" },
                { de: "die Auslegung", tr: "yorum", en: "interpretation" },
                { de: "paritätisch besetzt", tr: "eşit sayıda temsilcili", en: "equally staffed" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-03-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie geben in ein im Anhang genanntes System den Namen und die Diagnose einer Patientin ein. Ist das zulässig?",
              options: [
                "Ja, weil das System geprüft ist.",
                "Ja, sofern der Betriebsrat zugestimmt hat.",
                "Nein.",
              ],
              answer: 2,
              explain:
                "§ 3 iki katmanlı: onaylı sistemler kişisel veri yasağının istisnası, ama sağlık verileri o istisnanın da dışında tutulmuş. Teşhis sağlık verisidir.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l5-29",
              no: 29,
              ref: "o1",
              text: "Ihre Aufgaben haben sich zur Hälfte verändert. Sie nehmen die Schulung in diesem Jahr nicht wahr. Was passiert?",
              options: [
                "Der Anspruch geht einmalig ins nächste Jahr über.",
                "Der Anspruch verfällt zum Jahresende.",
                "Der Anspruch verdoppelt sich im Folgejahr dauerhaft.",
              ],
              answer: 0,
              explain:
                "§ 5 hakkın düşmediğini, \"einmalig in das Folgejahr übertragen\" edildiğini söylüyor. Yani bir kez devrediliyor, kalıcı olarak birikmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-l5-30",
              no: 30,
              ref: "o1",
              text: "Über die Auslegung von § 2 entsteht Streit. Was gilt, bis die Kommission entschieden hat?",
              options: [
                "Die Auffassung der Geschäftsleitung.",
                "Die Lesart, die den Beschäftigten mehr nützt.",
                "Die Vereinbarung ist bis zur Entscheidung ausgesetzt.",
              ],
              answer: 1,
              explain:
                "§ 6 geçici kuralı açıkça koyuyor: karara kadar çalışanlar lehine yorum geçerli. Sözleşmenin askıya alınması diye bir hüküm yok.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat vier Aufgaben. Sie hören Durchsagen, ein Interview, eine Diskussion und einen Vortrag.",
      instructionTr: "Bu bölümde dört görev var. Anonslar, bir söyleşi, bir tartışma ve bir sunum dinleyeceksin.",
      tasks: [
        {
          id: "de-b2-03-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage im Betrieb",
              genreTr: "İş yerinde anons",
              situation: "Yeni bir sistemin devreye alınması duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für alle Beschäftigten der Montage: Das neue Auftragssystem geht am Montag in Betrieb. In der ersten Woche laufen beide Systeme parallel; verbindlich ist in dieser Zeit weiterhin das alte. Wer die Einweisung noch nicht hatte, meldet sich bis Freitag bei der Schichtleitung. Ohne Einweisung ist die Bedienung ab dem zweiten Montag nicht gestattet.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Bir araştırmanın sonuçları aktarılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Untersuchung aus Mannheim hat 1400 Betriebe befragt. Danach hat gut die Hälfte automatische Assistenzsysteme eingeführt, aber nur ein Fünftel hat die Arbeitsabläufe dabei verändert. Die Autorinnen sehen darin den Hauptgrund, warum die erwarteten Effekte oft ausbleiben. Nicht die Technik fehle, sondern die Bereitschaft, die Organisation anzupassen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "İnsan kaynakları bir eğitim hakkında bilgi bırakıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Örs, hier ist Rehm aus der Personalabteilung. Ihre Anmeldung für die Schulung im Mai ist angekommen. Der Kurs ist allerdings ausgebucht; ich habe Sie deshalb für den Junitermin vorgemerkt. Falls Ihnen das nicht passt, sagen Sie bitte bis Donnerstag Bescheid, dann setze ich Sie auf die Warteliste für Mai zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage in der Werkhalle",
              genreTr: "Üretim salonunda anons",
              situation: "Bir arıza ve geçici düzen duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Achtung an Linie zwei: Die automatische Prüfstation ist ausgefallen. Bis zur Reparatur wird von Hand geprüft, und zwar in Stichproben von jedem zehnten Teil. Die Taktzeit bleibt unverändert; wer die Prüfung nicht schafft, meldet das sofort, statt Teile durchzulassen. Die Reparatur ist für morgen früh angekündigt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage im Jobcenter",
              genreTr: "İş kurumunda anons",
              situation: "Bir danışma hizmeti duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für Wartende: Die Beratung zu Weiterbildungsgutscheinen findet heute nicht im Raum 12, sondern im Erdgeschoss statt. Wer bereits eine Nummer gezogen hat, behält sie. Die Beratung dauert höchstens zwanzig Minuten; ausführliche Gespräche werden auf einen eigenen Termin gelegt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-03-h1-1",
              no: 1,
              ref: "h1",
              text: "In der ersten Woche ist weiterhin das alte System maßgeblich.",
              answer: true,
              explain:
                "Anons iki sistemin paralel çalışacağını, ama \"verbindlich ist in dieser Zeit weiterhin das alte\" olduğunu söylüyor. Yani bağlayıcı olan eski sistem.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h1-2",
              no: 2,
              ref: "h1",
              text: "Was gilt für Beschäftigte ohne Einweisung?",
              options: [
                "Sie dürfen das System nur unter Aufsicht einer Fachkraft bedienen.",
                "Ab der zweiten Woche dürfen sie es nicht mehr bedienen.",
                "Sie werden automatisch für einen Kurs angemeldet.",
              ],
              answer: 1,
              explain:
                "Anons son cümlede kuralı koyuyor: \"Ohne Einweisung ist die Bedienung ab dem zweiten Montag nicht gestattet\". Gözetim altında kullanım ya da otomatik kayıt geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-03-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Mehrheit der befragten Betriebe hat auch die Abläufe angepasst.",
              answer: false,
              explain:
                "Sistemleri kuran işletmeler yarıdan biraz fazla, ama \"nur ein Fünftel hat die Arbeitsabläufe dabei verändert\". Yani çoğunluk uyarlama yapmamış.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h1-4",
              no: 4,
              ref: "h2",
              text: "Worin sehen die Autorinnen den Hauptgrund für ausbleibende Effekte?",
              options: [
                "In veralteter Technik in den Betrieben.",
                "In fehlender Schulung der Beschäftigten.",
                "In der Organisation der Arbeit.",
              ],
              answer: 2,
              explain:
                "Haber gerekçeyi doğrudan aktarıyor: \"Nicht die Technik fehle, sondern die Bereitschaft, die Organisation anzupassen\". Eğitim bu kayıtta hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-03-h1-5",
              no: 5,
              ref: "h3",
              text: "Frau Örs ist ohne ihr Zutun für einen späteren Termin eingetragen worden.",
              answer: true,
              explain:
                "Mayıs kursu dolu olduğu için \"ich habe Sie deshalb für den Junitermin vorgemerkt\" deniyor; itirazı varsa perşembeye kadar bildirmesi isteniyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h1-6",
              no: 6,
              ref: "h3",
              text: "Was passiert, wenn Frau Örs sich bis Donnerstag meldet?",
              options: [
                "Sie wird wieder für den Maitermin vorgemerkt.",
                "Ihre Anmeldung wird vollständig gelöscht und muss neu erfolgen.",
                "Sie erhält einen Platz im Mai garantiert.",
              ],
              answer: 0,
              explain:
                "Mesaj tek bir alternatif sunuyor: \"dann setze ich Sie auf die Warteliste für Mai zurück\". Garanti bir yer sözü verilmiyor, kayıt da silinmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-03-h1-7",
              no: 7,
              ref: "h4",
              text: "Während der Handprüfung wird die Taktzeit verlängert.",
              answer: false,
              explain:
                "Anons tersini söylüyor: \"Die Taktzeit bleibt unverändert\". Yetişemeyenden beklenen şey süre istemek değil, durumu hemen bildirmek.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h1-8",
              no: 8,
              ref: "h4",
              text: "Wie wird bis zur Reparatur geprüft?",
              options: [
                "Jedes Teil wird von Hand geprüft.",
                "Es wird gar nicht geprüft.",
                "Nur jedes zehnte Teil.",
              ],
              answer: 2,
              explain:
                "Anons örneklem kuralını veriyor: elle ve \"in Stichproben von jedem zehnten Teil\". Yani ne her parça ne de hiçbiri.",
            },
            {
              kind: "bool",
              id: "de-b2-03-h1-9",
              no: 9,
              ref: "h5",
              text: "Wer schon eine Nummer gezogen hat, muss sie nicht neu ziehen.",
              answer: true,
              explain:
                "Anons yer değişikliğine rağmen \"Wer bereits eine Nummer gezogen hat, behält sie\" diyor. Yalnız oda değişiyor, sıra düzeni değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h1-10",
              no: 10,
              ref: "h5",
              text: "Was gilt für längere Beratungen?",
              options: [
                "Sie sind heute gar nicht möglich.",
                "Sie werden am Ende des Tages angehängt.",
                "Sie bekommen einen eigenen Termin.",
              ],
              answer: 2,
              explain:
                "Bugünkü danışma en fazla 20 dakika; ayrıntılı görüşmeler için ayrı randevu veriliyor. Yani mümkün, ama başka bir günde.",
            },
          ],
        },
        {
          id: "de-b2-03-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Interview. Wählen Sie zu den Aufgaben 11 bis 16: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir söyleşi dinleyeceksin. 11–16. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Interview",
              genreTr: "Söyleşi",
              situation: "Bir işçi temsilcisi yeni sistemlerin devreye alınışını anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Cordes, Sie begleiten seit sechs Jahren Einführungen von Assistenzsystemen. Was geht am häufigsten schief?" },
                {
                  speaker: "Frau Cordes",
                  text: "Fast immer dasselbe: Das System wird gekauft, bevor jemand aufgeschrieben hat, welches Problem es lösen soll. Danach sucht man ein Problem, das dazu passt.",
                },
                { speaker: "Moderator", text: "Das klingt fast zu einfach." },
                {
                  speaker: "Frau Cordes",
                  text: "Ist es aber nicht. In einem Betrieb, den ich begleitet habe, wollte die Leitung Schreibarbeit sparen. Gemessen wurde am Ende die Zahl der Dokumente, nicht die Zeit. Die Zahl stieg, die Zeit auch. Trotzdem galt das Projekt als Erfolg.",
                },
                { speaker: "Moderator", text: "Was raten Sie Betriebsräten in der ersten Phase?" },
                {
                  speaker: "Frau Cordes",
                  text: "Nicht über die Technik zu verhandeln, sondern über die Daten. Wer Protokolldaten auswerten darf und zu welchem Zweck — das entscheidet später mehr über den Alltag als die Frage, welches Produkt gekauft wird.",
                },
                { speaker: "Moderator", text: "Und die Beschäftigten selbst?" },
                {
                  speaker: "Frau Cordes",
                  text: "Sie sind erstaunlich offen, solange sie zwei Dinge wissen: dass ihre Fehler nicht ausgewertet werden und dass die eingesparte Zeit nicht sofort verplant ist. Fehlt eine dieser Zusagen, kippt die Stimmung innerhalb weniger Wochen.",
                },
                { speaker: "Moderator", text: "Sie haben einmal gesagt, Schulungen kämen meist zu früh." },
                {
                  speaker: "Frau Cordes",
                  text: "Zu früh und zu allgemein. Drei Wochen vor dem Start sitzen alle in einem Raum und lernen Funktionen, die sie noch nicht brauchen. Wirksam ist eine kurze Einweisung vor dem Start und eine zweite nach sechs Wochen, wenn die echten Fragen da sind.",
                },
                { speaker: "Moderator", text: "Gibt es einen Fall, der gut gelaufen ist?" },
                {
                  speaker: "Frau Cordes",
                  text: "Ja, eine Spedition mit vierzig Beschäftigten. Dort hat die Fahrerin, die am längsten dabei war, die Auswahl geleitet. Nicht weil sie Technikerin ist, sondern weil sie als Einzige alle Abläufe kannte. Das Ergebnis war kein besseres System, aber ein passenderes.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-03-h2-11",
              no: 11,
              ref: "i1",
              text: "Was ist nach Frau Cordes der häufigste Fehler?",
              options: [
                "Das System wird ohne definiertes Problem gekauft.",
                "Die Betriebe wählen zu billige und veraltete Produkte aus.",
                "Die Einführung wird zu lange hinausgezögert.",
              ],
              answer: 0,
              explain:
                "\"Das System wird gekauft, bevor jemand aufgeschrieben hat, welches Problem es lösen soll\" — sonra da sisteme uyan bir sorun aranıyor. Fiyat ve gecikme hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h2-12",
              no: 12,
              ref: "i1",
              text: "Was war das Problem in dem Betrieb, den sie als Beispiel nennt?",
              options: [
                "Das System funktionierte technisch nicht.",
                "Es wurde die falsche Größe gemessen.",
                "Die Beschäftigten haben es nicht benutzt.",
              ],
              answer: 1,
              explain:
                "Amaç yazı işini azaltmaktı, ama \"Gemessen wurde am Ende die Zahl der Dokumente, nicht die Zeit\". Hem sayı hem süre arttığı hâlde proje başarılı sayıldı; sorun ölçütün kendisi.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h2-13",
              no: 13,
              ref: "i1",
              text: "Worüber sollten Betriebsräte zuerst verhandeln?",
              options: ["Über die Auswahl des passenden Produkts.", "Über die Zahl der Schulungen.", "Über den Umgang mit den Protokolldaten."],
              answer: 2,
              explain:
                "Tavsiyesi açık: \"Nicht über die Technik zu verhandeln, sondern über die Daten\" — kim, hangi amaçla protokol verilerini değerlendirebilir. Ona göre bu, hangi ürünün alındığından daha belirleyici.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h2-14",
              no: 14,
              ref: "i1",
              text: "Unter welcher Bedingung bleiben Beschäftigte offen?",
              options: [
                "Wenn Fehler nicht ausgewertet und Zeit nicht verplant wird.",
                "Wenn sie das System vor der Einführung selbst auswählen dürfen.",
                "Wenn die Einführung schrittweise erfolgt.",
              ],
              answer: 0,
              explain:
                "İki koşulu birlikte sayıyor — \"dass ihre Fehler nicht ausgewertet werden\" ve kazanılan zamanın hemen doldurulmaması — birinin eksikliğinde hava haftalar içinde dönüyor. Ürünü kendilerinin seçmesi koşullar arasında yok.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h2-15",
              no: 15,
              ref: "i1",
              text: "Wie sollten Schulungen nach ihrer Ansicht gelegt werden?",
              options: [
                "Vollständig vor dem Start, damit alle gut vorbereitet sind.",
                "Kurz vor dem Start und ein zweites Mal nach sechs Wochen.",
                "Erst dann, wenn die ersten Probleme gemeldet werden.",
              ],
              answer: 1,
              explain:
                "İki adımlı bir düzen öneriyor: \"eine kurze Einweisung vor dem Start und eine zweite nach sechs Wochen\" — gerçek soruların ortaya çıktığı an.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h2-16",
              no: 16,
              ref: "i1",
              text: "Warum war der Fall der Spedition erfolgreich?",
              options: [
                "Weil das gewählte System technisch das beste war.",
                "Weil der Betrieb besonders klein war.",
                "Weil jemand mit Überblick die Auswahl leitete.",
              ],
              answer: 2,
              explain:
                "Seçimi en kıdemli sürücü yönetmiş, teknisyen olduğu için değil, bütün süreçleri bilen tek kişi olduğu için. Sonuç \"kein besseres System, aber ein passenderes\".",
            },
          ],
        },
        {
          id: "de-b2-03-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 17 bis 22: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. 17–22. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              situation: "İki uzman ücretli eğitim hakkını tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Ein gesetzlicher Anspruch auf bezahlte Weiterbildung — Herr Adler, Sie vertreten die Arbeitgeberseite.",
                },
                {
                  speaker: "Herr Adler",
                  text: "Ich fange mit einem Zugeständnis an: Die Kritik an der Freiwilligkeit ist berechtigt. Die Zahlen zeigen, dass sie ungleich wirkt. Nur folgt daraus für mich nicht automatisch ein Gesetz, sondern zunächst die Frage, warum Betriebe zögern.",
                },
                { speaker: "Moderatorin", text: "Frau Lehnert?" },
                {
                  speaker: "Frau Lehnert",
                  text: "Sie zögern, weil sich die Investition für sie nicht rechnet, sobald jemand kündigt. Das ist betriebswirtschaftlich vernünftig und gesamtwirtschaftlich schädlich. Genau für solche Fälle gibt es Gesetze.",
                },
                {
                  speaker: "Herr Adler",
                  text: "Da widerspreche ich nicht grundsätzlich. Aber ein pauschaler Anspruch von fünf Tagen im Jahr trifft die Werkhalle und das Büro gleich, obwohl der Bedarf völlig unterschiedlich ist. Ich hätte lieber eine Kopplung an die tatsächliche Veränderung der Tätigkeit.",
                },
                {
                  speaker: "Frau Lehnert",
                  text: "Das klingt vernünftig und ist in der Praxis kaum zu prüfen. Wer stellt fest, ob sich eine Tätigkeit um dreißig Prozent verändert hat? Am Ende streiten Sie vor Gericht über Prozentsätze statt zu lernen.",
                },
                {
                  speaker: "Herr Adler",
                  text: "Dann eben eine Mischung: ein kleiner fester Anspruch für alle und ein größerer, der an eine dokumentierte Umstellung gebunden ist. Damit könnte ich leben.",
                },
                {
                  speaker: "Frau Lehnert",
                  text: "Interessant. Über diese Konstruktion würde ich reden, allerdings nur, wenn der feste Teil nicht symbolisch klein ausfällt. Zwei Tage sind kein Anspruch, das ist eine Geste.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Ein letzter Punkt: Wer zahlt bei kleinen Betrieben?",
                },
                {
                  speaker: "Frau Lehnert",
                  text: "Ein Fonds, in den alle einzahlen. Sonst tragen die Kleinen die Kosten und die Großen ernten die ausgebildeten Leute.",
                },
                {
                  speaker: "Herr Adler",
                  text: "Dem stimme ich zu, und das sage ich nicht oft. Ohne Ausgleich zwischen den Betriebsgrößen wird das nichts.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-03-h3-17",
              no: 17,
              ref: "d1",
              text: "Wie beginnt Herr Adler seinen Beitrag?",
              options: [
                "Mit einer klaren Ablehnung des Vorschlags.",
                "Mit einer Rückfrage an die Moderatorin.",
                "Er gibt der Gegenseite zuerst recht.",
              ],
              answer: 2,
              explain:
                "\"Ich fange mit einem Zugeständnis an\" diyor ve gönüllülük eleştirisini haklı buluyor. İtirazı ancak bundan sonra geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h3-18",
              no: 18,
              ref: "d1",
              text: "Womit erklärt Frau Lehnert das Zögern der Betriebe?",
              options: [
                "Mit dem Risiko, dass ausgebildete Leute kündigen.",
                "Mit fehlendem Interesse der Beschäftigten.",
                "Mit einem Mangel an geeigneten Kursen.",
              ],
              answer: 0,
              explain:
                "Yatırımın biri istifa ettiğinde karşılığını vermediğini söylüyor ve bunu \"betriebswirtschaftlich vernünftig und gesamtwirtschaftlich schädlich\" diye niteliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h3-19",
              no: 19,
              ref: "d1",
              text: "Was kritisiert Herr Adler an einem pauschalen Anspruch?",
              options: [
                "Dass er für Betriebe zu teuer ist.",
                "Dass er sehr unterschiedlichen Bedarf gleich behandelt.",
                "Dass er die Beschäftigten überfordert.",
              ],
              answer: 1,
              explain:
                "Genel hakkın \"trifft die Werkhalle und das Büro gleich\" olduğunu, oysa ihtiyacın bambaşka olduğunu söylüyor. Maliyet burada gerekçe değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h3-20",
              no: 20,
              ref: "d1",
              text: "Warum lehnt Frau Lehnert die Kopplung an die Tätigkeitsveränderung ab?",
              options: [
                "Weil sie den Bedarf falsch einschätzt.",
                "Weil sie zu wenige Beschäftigte erfassen würde.",
                "Weil sie praktisch kaum überprüfbar wäre.",
              ],
              answer: 2,
              explain:
                "Ölçülebilirliği sorguluyor: \"Wer stellt fest, ob sich eine Tätigkeit um dreißig Prozent verändert hat?\" Sonucun mahkemede yüzde tartışmasına döneceğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h3-21",
              no: 21,
              ref: "d1",
              text: "Wie reagiert Frau Lehnert auf Herrn Adlers Mischmodell?",
              options: [
                "Sie lehnt es als unpraktikabel ab.",
                "Sie nimmt es unter einer Bedingung an.",
                "Sie geht darauf nicht ein.",
              ],
              answer: 1,
              explain:
                "\"Über diese Konstruktion würde ich reden, allerdings nur, wenn der feste Teil nicht symbolisch klein ausfällt\" — koşullu bir kabul. İki gün için \"das ist eine Geste\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h3-22",
              no: 22,
              ref: "d1",
              text: "Worin sind sich beide am Ende einig?",
              options: [
                "In der Höhe des festen Anspruchs.",
                "Darin, dass kleine Betriebe entlastet werden müssen.",
                "Darin, dass ein Gesetz überflüssig ist.",
              ],
              answer: 1,
              explain:
                "Frau Lehnert ortak bir fon öneriyor, Herr Adler da \"Ohne Ausgleich zwischen den Betriebsgrößen wird das nichts\" diyerek katılıyor. Sabit hakkın miktarında ise hâlâ anlaşamıyorlar.",
            },
          ],
        },
        {
          id: "de-b2-03-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören einen Vortrag. Wählen Sie zu den Aufgaben 23 bis 30: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir sunum dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              situation: "Bir iktisatçı otomasyonun istihdam üzerindeki etkilerini anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Prof. Rehm",
                  text: "Ich werde heute nicht die Frage beantworten, wie viele Arbeitsplätze verschwinden. Diese Frage ist gestellt worden, seit es Maschinen gibt, und sie hat noch nie zu einer brauchbaren Prognose geführt.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Nützlicher ist eine andere Beobachtung. Historisch verschwindet Arbeit nicht dort, wo eine Tätigkeit besonders schwer ist, sondern dort, wo sie besonders gut beschreibbar ist. Das ist ein wichtiger Unterschied, denn Schwierigkeit und Beschreibbarkeit fallen selten zusammen.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Ein Beispiel: Das Sortieren von Post galt lange als anspruchslos und ist heute weitgehend automatisiert. Das Falten von Wäsche gilt als noch anspruchsloser und ist es bis heute nicht.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Der zweite Punkt betrifft die Löhne. In den betroffenen Bereichen sinken sie selten. Häufiger sinkt die Zahl der Stellen bei stabilen Löhnen, und das erklärt, warum viele Betroffene die Veränderung erst spät bemerken.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Drittens: Die Verteilung ist regional sehr ungleich. In einer Region mit vier großen Arbeitgebern wirkt dieselbe Technik anders als in einer Region mit vierhundert kleinen. Diese Verteilung wird in nationalen Statistiken systematisch unterschätzt.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Viertens, und das überrascht viele: Der stärkste Effekt liegt nicht bei den Beschäftigten, sondern bei denen, die gerade in den Beruf eintreten. Wer schon drin ist, wechselt die Aufgaben. Wer neu kommt, findet die Einstiegsstufe nicht mehr vor.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Daraus folgt eine unbequeme Empfehlung. Programme, die auf Entlassene zielen, kommen für die eigentliche Gruppe zu spät. Wirksamer wären Einstiegsstellen, die bewusst nicht produktiv sein müssen — also genau das, was in den letzten zwanzig Jahren abgeschafft wurde.",
                },
                {
                  speaker: "Prof. Rehm",
                  text: "Ich schließe mit einer Einschränkung: Alles, was ich gesagt habe, beruht auf Daten aus Branchen, in denen die Umstellung abgeschlossen ist. Ob es sich übertragen lässt, wissen wir in etwa zehn Jahren.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-03-h4-23",
              no: 23,
              ref: "v1",
              text: "Welche Frage will Prof. Rehm ausdrücklich nicht beantworten?",
              options: [
                "Wie sich Löhne in betroffenen Branchen entwickeln.",
                "Wie viele Arbeitsplätze verschwinden werden.",
                "Welche Regionen besonders betroffen sind.",
              ],
              answer: 1,
              explain:
                "Sunum \"wie viele Arbeitsplätze verschwinden\" sorusunu baştan reddediyor: makineler var olduğundan beri soruluyor ve hiç kullanışlı bir öngörüye götürmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-24",
              no: 24,
              ref: "v1",
              text: "Wo verschwindet Arbeit nach seiner Beobachtung?",
              options: [
                "Dort, wo Tätigkeiten gut beschreibbar sind.",
                "Dort, wo Tätigkeiten besonders schwer sind.",
                "Dort, wo besonders viele Menschen arbeiten.",
              ],
              answer: 0,
              explain:
                "Ayrımı kendisi kuruyor: \"sondern dort, wo sie besonders gut beschreibbar ist\" — belirleyici olan zorluk değil, ve bu ikisi ender çakışıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-25",
              no: 25,
              ref: "v1",
              text: "Wozu dient das Beispiel von Post und Wäsche?",
              options: [
                "Es zeigt, dass einfache Arbeit zuerst verschwindet.",
                "Es zeigt, dass Technik in Haushalten langsamer wirkt.",
                "Es zeigt, dass beides nicht zusammenfällt.",
              ],
              answer: 2,
              explain:
                "İki iş de \"anspruchslos\" sayılıyor ama biri otomatikleşti, öteki olmadı. Örnek tam bu yüzden zorluk ile otomatikleştirilebilirliğin ayrıldığını gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-26",
              no: 26,
              ref: "v1",
              text: "Was passiert in betroffenen Bereichen meist mit den Löhnen?",
              options: [
                "Sie steigen wegen des allgemeinen Fachkräftemangels.",
                "Sie bleiben stabil, während Stellen wegfallen.",
                "Sie sinken deutlich und schnell.",
              ],
              answer: 1,
              explain:
                "\"Häufiger sinkt die Zahl der Stellen bei stabilen Löhnen\" — ücret değil kadro azalıyor. Prof. Rehm bunu, değişimin neden geç fark edildiğinin açıklaması olarak kullanıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-27",
              no: 27,
              ref: "v1",
              text: "Was sagt er über nationale Statistiken?",
              options: [
                "Sie überschätzen die Zahl der betroffenen Branchen deutlich.",
                "Sie erfassen die regionale Ungleichheit zu schwach.",
                "Sie werden zu selten veröffentlicht.",
              ],
              answer: 1,
              explain:
                "Aynı teknolojinin dört büyük işverenli bir bölgede ve dört yüz küçük işletmeli bir bölgede farklı sonuç verdiğini söylüyor; ulusal istatistik bunu \"systematisch unterschätzt\".",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-28",
              no: 28,
              ref: "v1",
              text: "Wen trifft die Veränderung nach ihm am stärksten?",
              options: [
                "Wer neu in den Beruf kommt.",
                "Beschäftigte kurz vor der Rente.",
                "Führungskräfte in mittleren Betrieben.",
              ],
              answer: 0,
              explain:
                "İçeride olan görev değiştiriyor; \"Wer neu kommt, findet die Einstiegsstufe nicht mehr vor\".",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-29",
              no: 29,
              ref: "v1",
              text: "Warum nennt er seine Empfehlung unbequem?",
              options: [
                "Weil sie sehr hohe Kosten verursachen würde.",
                "Weil sie eine Rückkehr verlangt.",
                "Weil sie erst in zehn Jahren wirken kann.",
              ],
              answer: 1,
              explain:
                "Önerisi üretken olmak zorunda olmayan giriş kadroları — \"also genau das, was in den letzten zwanzig Jahren abgeschafft wurde\". Rahatsız edici olan bu geri dönüş talebi.",
            },
            {
              kind: "mcq",
              id: "de-b2-03-h4-30",
              no: 30,
              ref: "v1",
              text: "Womit schließt der Vortrag?",
              options: [
                "Mit einer Aufforderung an die Politik.",
                "Mit einer klaren Prognose für das kommende Jahrzehnt.",
                "Mit einem Hinweis auf die Grenzen seiner Daten.",
              ],
              answer: 2,
              explain:
                "Son cümleler verilerin sınırını çiziyor: \"Ob es sich übertragen lässt, wissen wir in etwa zehn Jahren\". Bu bir öngörü değil, sınır beyanı.",
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
          id: "de-b2-03-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer mit der Technik nicht Schritt hält, ist selbst schuld.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Teknolojiye ayak uyduramayan kendi kabahati.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz, wer nicht Schritt halte, sei selbst schuld, klingt entschlossen, blendet aber die entscheidende Frage aus: Wer hat überhaupt die Gelegenheit dazu?

In meinem Betrieb wurde vor einem Jahr ein neues System eingeführt. Die Einweisung fand an einem Freitagabend statt, unbezahlt und freiwillig. Von den Kolleginnen in der Schicht konnte niemand teilnehmen, weil die Kinderbetreuung um sechs endet. Von Schuld zu sprechen setzt voraus, dass eine Wahl bestand.

Hinzu kommt, dass sich die Anforderungen schneller ändern als jede Weiterbildung. Wer heute lernt, was der Betrieb morgen einführt, kann übermorgen wieder von vorn beginnen. Diese Last allein den Einzelnen zu übertragen, ist bequem, aber nicht redlich.

Natürlich gibt es Menschen, die Angebote ausschlagen, obwohl sie ihnen offenstehen. Das kommt vor und ist ärgerlich. Es rechtfertigt jedoch keinen Satz, der für alle gilt.

Mein Schluss: Verantwortung ja — aber erst dann, wenn bezahlte Zeit und erreichbare Angebote tatsächlich vorhanden sind.

Mit freundlichen Grüßen
Ilse Sander`,
            criteria: [
              "İddiaya doğrudan atıf yapıldı mı ve tutum net mi?",
              "En az iki farklı gerekçe var mı ve bunlar somut mu (örnek, sayı, deneyim)?",
              "Karşı görüş gerçekten ele alınıp yanıtlandı mı, yoksa yalnız anılıp geçildi mi?",
              "Sonuç, sunulan gerekçelerden çıkıyor mu?",
              "Metin bağlaçlarla örülmüş mü? (allerdings, hinzu kommt, jedoch, folglich)",
              "Resmî hitap ve veda var mı, yaklaşık 150 kelime mi?",
            ],
          },
        },
        {
          id: "de-b2-03-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Betrieb führt ein neues Assistenzsystem ein. Die geplante Schulung liegt an einem Samstag. Schreiben Sie an Ihre Abteilungsleitung (circa 100 Wörter): Sie können an diesem Termin nicht, halten die Schulung aber für nötig.",
          promptTr:
            "İşletmen yeni bir yardımcı sistem kuruyor. Planlanan eğitim cumartesi günü. Bölüm yönetimine yaz (yaklaşık 100 kelime): O tarihte gelemiyorsun ama eğitimi gerekli buluyorsun.",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nehmen Sie Bezug auf die Ankündigung.", tr: "Duyuruya atıf yap." },
              { de: "Begründen Sie, warum der Termin nicht geht.", tr: "Tarihin neden uymadığını gerekçelendir." },
              { de: "Betonen Sie, dass Sie teilnehmen wollen.", tr: "Katılmak istediğini vurgula." },
              { de: "Schlagen Sie eine konkrete Lösung vor.", tr: "Somut bir çözüm öner." },
            ],
            sample: `Sehr geehrte Frau Brandt,

vielen Dank für die Ankündigung der Schulung zum neuen Auftragssystem am 14. Juni.

An diesem Samstag kann ich leider nicht teilnehmen, da ich an den Wochenenden die Betreuung meines Vaters übernehme; eine Vertretung ist kurzfristig nicht zu organisieren.

Mir ist wichtig, dass Sie das nicht als Desinteresse verstehen. Ich arbeite täglich mit den betroffenen Abläufen und möchte die Umstellung von Anfang an mittragen.

Wäre es möglich, einen zweiten Termin unter der Woche anzubieten? Falls sich das nicht einrichten lässt, würde ich die Inhalte gern in zwei kürzeren Einheiten während der Schicht nachholen und die Kolleginnen anschließend selbst einweisen.

Mit freundlichen Grüßen
Deniz Kaya`,
            criteria: [
              "Duyuruya somut atıf var mı (tarih, konu)?",
              "Ret gerekçesi inandırıcı ve kısa mı, savunmaya kaçmıyor mu?",
              "Katılma isteği açıkça belirtilmiş mi?",
              "Önerilen çözüm gerçekten uygulanabilir mi ve alternatifi de var mı?",
              "Yarı resmî kayıt korunmuş mu, yaklaşık 100 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und gemeinsam zu einer Entscheidung kommen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve birlikte bir karara varmak.",
      tasks: [
        {
          id: "de-b2-03-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Sollen Betriebe verpflichtet werden, ihre Beschäftigten weiterzubilden?\". Gliedern Sie: Einstieg — Lage in Ihrem Heimatland — Vorteile — Nachteile — eigene Position — Abschluss.",
          promptTr:
            "\"İşletmeler çalışanlarını eğitmeye zorunlu tutulmalı mı?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — artılar — eksiler — kendi konumun — kapanış.",
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Lage im Heimatland", tr: "Kendi ülkendeki durum" },
              { de: "Vorteile mit Beispiel", tr: "Örnekle desteklenmiş artılar" },
              { de: "Nachteile mit Beispiel", tr: "Örnekle desteklenmiş eksiler" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute über eine Pflicht zur Weiterbildung sprechen. Zuerst schildere ich die Lage in meinem Heimatland, dann nenne ich Vor- und Nachteile, danach meine eigene Position. In der Türkei gibt es einen solchen Anspruch nur in wenigen Branchen; in den meisten Betrieben entscheidet die Leitung von Fall zu Fall. Ein Vorteil einer Pflicht liegt auf der Hand: Sie erreicht die Beschäftigten, die von sich aus nie fragen würden. Meine Cousine arbeitet seit zwölf Jahren in einem Lager und ist noch nie auf einem Kurs gewesen. Ein Nachteil ist die Belastung kleiner Betriebe. Wenn in einem Betrieb mit acht Leuten zwei gleichzeitig fehlen, steht der Betrieb. Meine Position ist deshalb eine Mischung: ein verbindlicher Grundanspruch für alle, ergänzt durch einen Ausgleichsfonds für kleine Betriebe. Ohne diesen Ausgleich würde die Pflicht genau die treffen, die sie am wenigsten tragen können. Zusammenfassend: Ich bin dafür, aber nur mit einer Finanzierung, die die Betriebsgröße berücksichtigt.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut anlatıldı mı?",
              "Artı ve eksi birer örnekle desteklendi mi?",
              "Konum gerekçeli mi ve dile getirilen eksiği hesaba katıyor mu?",
              "Bağlayıcılar kullanıldı mı? (zunächst, ein Vorteil liegt darin, dagegen, zusammenfassend)",
              "Dört dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b2-03-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihre Abteilung bekommt 5000 Euro für Weiterbildung. Einigen Sie sich mit Ihrer Gesprächspartnerin darauf, wofür das Geld ausgegeben wird: ein großer Kurs für alle, mehrere kleine Kurse, eine externe Beratung oder Freistellung für Selbstlernzeit.",
          promptTr:
            "Bölümünüze eğitim için 5000 euro veriliyor. Bu paranın nereye harcanacağı konusunda karşındakiyle anlaş: herkese açık büyük bir kurs, birkaç küçük kurs, dışarıdan danışmanlık ya da kendi kendine öğrenme için izin.",
          prepSeconds: 90,
          exchange: [
            {
              who: "partner",
              de: "Wir müssen uns bis Freitag entscheiden. Ich wäre für einen großen Kurs für alle — das ist gerecht und organisatorisch am einfachsten. Was halten Sie davon?",
              tr: "Cumaya kadar karar vermemiz gerek. Ben herkese açık büyük bir kurstan yanayım — hem adil hem de düzenlemesi en kolay. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve gerekçelendir; karşı tarafın gerekçesine de değin.",
              expect: "bir seçeneği gerekçelendirerek savunmak ve karşı gerekçeyi ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das leuchtet mir teilweise ein. Aber bedenken Sie: Bei mehreren kleinen Kursen bekommt am Ende jede Gruppe etwas anderes, und wir verlieren die gemeinsame Sprache im Team.",
              tr: "Kısmen mantıklı. Ama şunu düşün: Birkaç küçük kursta her grup başka bir şey öğrenir ve ekipte ortak dil kalmaz.",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve bir uzlaşma modeli öner.",
              expect: "bir itiraza karşılık verip iki seçeneği birleştiren bir model önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Über eine Mischung könnte ich reden. Nur reicht das Geld dann nicht für alles. Woran würden Sie zuerst sparen?",
              tr: "Karma bir çözümü konuşabilirim. Ama o zaman para her şeye yetmez. İlk neyden kısarsın?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden feda ettiğini söyle.",
              expect: "kaynakları önceliklendirmek ve bir seçeneği gerekçeyle elemek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen wir zusammen, damit ich es am Freitag vortragen kann: Worauf haben wir uns geeinigt?",
              tr: "Peki. Cumada aktarabilmem için toparlayalım: Neyde anlaştık?",
            },
            {
              who: "you",
              hint: "Varılan anlaşmayı kısa ve eksiksiz özetle.",
              expect: "varılan anlaşmayı eksiksiz ve doğru biçimde özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "eine Position begründen", tr: "Bir konumu gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara karşılık vermek" },
              { de: "Prioritäten setzen", tr: "Öncelik belirlemek" },
              { de: "das Ergebnis zusammenfassen", tr: "Sonucu özetlemek" },
            ],
            sample:
              "Ich sehe den Vorteil eines gemeinsamen Kurses, halte ihn aber für zu grob: Die Hälfte des Teams arbeitet gar nicht mit dem System. Ich wäre für zwei kleine Kurse plus einen halben Tag für alle, damit die gemeinsame Sprache erhalten bleibt. Ihren Einwand nehme ich damit auf. Sparen würde ich zuerst an der externen Beratung, weil wir das Wissen im Haus haben und eine Beratung ohne Umsetzung wenig bringt. Wir hätten uns also geeinigt auf: einen gemeinsamen Halbtag für alle, zwei vertiefende Kurse für die betroffenen Gruppen, keine externe Beratung, und der Rest bleibt als Selbstlernzeit reserviert.",
            criteria: [
              "Kendi konumu gerekçelendirildi mi?",
              "Karşı tarafın itirazı gerçekten ele alındı mı, yoksa yalnız tekrar mı edildi?",
              "Öncelik belirlenirken neyin feda edildiği ve nedeni söylendi mi?",
              "Özet eksiksiz mi ve konuşmada gerçekten varılan şeyi yansıtıyor mu?",
              "Tartışma dili kullanıldı mı? (Ich sehe den Vorteil, allerdings, ich würde zunächst, wir hätten uns geeinigt auf)",
            ],
          },
        },
      ],
    },
  ],
};
