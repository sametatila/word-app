import type { MockPaper } from "../types";

/**
 * B2 · Deneme 6 — "Umwelt und Verantwortung".
 *
 * PLAN kâğıt 1–5 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme ·
 *                              6 köşe yazısı · 6 görüş eşleştirme · 3 kural)
 *   Hören  40 dk · 30 madde   (10 karışık · 6 söyleşi · 6 tartışma · 8 sunum)
 *   Schreiben 75 dk           okur mektubu (150) + yarı resmî ileti (100)
 *   Sprechen  15 dk           sunum (4 dk) + uzlaşma
 *
 * KONU SEÇİMİ: çevre, tarafların birbirine çok benzeyen gerekçelerle karşıt
 * sonuçlara vardığı bir alan. Maddeler bu yüzden sonucu değil, sonuca giden
 * ölçütü soruyor: kim neyi ölçüyor, kim hangi maliyeti hesaba katmıyor.
 */
export const B2_06: MockPaper = {
  id: "de-b2-06",
  course: "de",
  level: "B2",
  no: 6,
  theme: "Umwelt und Verantwortung",
  themeTr: "Çevre ve sorumluluk",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Berichte, einen Sachtext, einen Kommentar, Meinungsäußerungen und eine Abfallsatzung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel anlatılar, bir bilgi metni, bir köşe yazısı, görüş bildirimleri ve bir atık yönetmeliği okuyacaksın.",
      tasks: [
        {
          id: "de-b2-06-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben darüber, wie sie mit Umweltfragen umgehen. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi çevre sorunlarıyla nasıl baş ettiğini yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht A",
              genreTr: "Deneyim yazısı A",
              title: "Herr Baltes, Landwirt",
              body: `Ich bewirtschafte achtzig Hektar und höre seit zwanzig Jahren, was ich anders machen soll. Das meiste davon habe ich inzwischen gemacht: weniger Dünger, breitere Streifen am Bach, andere Sorten. Nicht aus Einsicht allein, sondern weil es sich gerechnet hat.

Was mich stört, ist die Erzählung. In der Stadt wird über Landwirtschaft gesprochen, als gäbe es eine Entscheidung zwischen Umwelt und Ertrag. Diese Entscheidung treffe ich nicht einmal im Jahr, sondern bei jedem Feld neu, und meistens hängt sie am Wetter der letzten drei Wochen.

Ein Beispiel: Die Zwischenfrucht, die alle fordern, funktioniert bei mir in vier von fünf Jahren. Im fünften vertrocknet sie, und dann steht das Feld offen. Wer das nicht mitdenkt, hält mich für unwillig.

Was tatsächlich hilft, sind mehrjährige Verträge. Ich kann eine Umstellung nicht machen, wenn die Förderung nach zwei Jahren ausläuft und mein Kredit über zwölf läuft.`,
              gloss: [
                { de: "bewirtschaften", tr: "işlemek (toprağı)", en: "to farm" },
                { de: "der Ertrag", tr: "verim, hasat", en: "yield" },
                { de: "die Zwischenfrucht", tr: "ara ürün", en: "cover crop" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht B",
              genreTr: "Deneyim yazısı B",
              title: "Frau Grohmann, Klimaschutzmanagerin",
              body: `Seit fünf Jahren bin ich in einer Stadt mit 40 000 Einwohnern für Klimaschutz zuständig. Meine Stelle wird zu achtzig Prozent vom Bund bezahlt, und genau das ist mein größtes Problem: Sie läuft aus.

Am Anfang habe ich Konzepte geschrieben. Heute weiß ich, dass Konzepte in dieser Stadt niemandem fehlen — wir haben drei. Was fehlt, ist jemand, der Anträge stellt. Die Fördertöpfe sind da; sie werden nicht abgerufen, weil niemand Zeit hat, sechzig Seiten auszufüllen.

Am meisten bewirkt habe ich mit einer unspektakulären Sache: Ich habe die Heizungen in vier Schulen nachts heruntergeregelt. Das kostet nichts, spart jährlich neunzehn Prozent und hat vier Monate Überzeugungsarbeit gebraucht.

Was mich ärgert, ist die Erwartung an Symbolik. Man fragt mich nach Bäumen für den Marktplatz, nicht nach Heizkurven. Bäume sieht man, Heizkurven nicht.`,
              gloss: [
                { de: "der Fördertopf", tr: "destek fonu", en: "funding pot" },
                { de: "abrufen", tr: "talep edip almak", en: "to draw down" },
                { de: "herunterregeln", tr: "kısmak, azaltmak", en: "to turn down" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht C",
              genreTr: "Deneyim yazısı C",
              title: "Jarek, 19, engagiert sich in einer Gruppe",
              body: `Ich bin mit fünfzehn dazugekommen, damals aus Wut. Inzwischen bin ich vorsichtiger geworden, und das hat nichts mit Resignation zu tun.

Wir haben zwei Jahre lang Aktionen gemacht, die in der Zeitung standen. Verändert hat sich dadurch: nichts, das ich benennen könnte. Verändert hat sich etwas, als wir angefangen haben, in den Bauausschuss zu gehen und dort Fragen zu stellen. Das ist langweilig, findet niemand mutig, und es wirkt.

Trotzdem verteidige ich die lauten Aktionen. Ohne sie hätte niemand von uns gewusst, dass es diesen Ausschuss überhaupt gibt. Die Kritik, wir würden nur stören, kommt oft von Leuten, die selbst nie zu einer Sitzung gegangen sind.

Was ich unterschätzt habe, ist die Zeit. Wer regelmäßig zu Sitzungen geht, muss Abende haben. Bei uns bleiben vor allem die, deren Eltern nicht auf ihr Einkommen angewiesen sind.`,
              gloss: [
                { de: "die Resignation", tr: "pes etme, boyun eğme", en: "resignation" },
                { de: "der Bauausschuss", tr: "imar komisyonu", en: "planning committee" },
                { de: "angewiesen sein auf", tr: "bir şeye muhtaç olmak", en: "to depend on" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht D",
              genreTr: "Deneyim yazısı D",
              title: "Frau Ostrowski, Rentnerin",
              body: `Mein Haus ist von 1962, und ich habe es vor drei Jahren dämmen lassen. Die Beratung war kostenlos, die Rechnung nicht: einundfünfzigtausend Euro, davon achtzehn aus Förderung.

Gerechnet hat sich das bisher nicht, und wer etwas anderes behauptet, hat nicht nachgerechnet. Ich spare im Jahr etwa neunhundert Euro. Bis das Geld zurück ist, bin ich sehr alt. Gemacht habe ich es trotzdem, weil das Haus an meine Tochter geht und weil es im Winter jetzt warm ist, ohne dass ich rechnen muss.

Was mich beschäftigt, ist etwas anderes. In meiner Straße wohnen elf Haushalte, und neun davon könnten sich das nicht leisten. Wenn Klimaschutz so aussieht, macht ihn am Ende, wer ihn ohnehin bezahlen kann.

Über Verzicht rede ich deshalb nicht gern. Ich habe nichts verzichtet, ich habe investiert. Das ist etwas völlig anderes, und die Debatte verwechselt es dauernd.`,
              gloss: [
                { de: "dämmen", tr: "yalıtım yapmak", en: "to insulate" },
                { de: "sich rechnen", tr: "kendini amorti etmek", en: "to pay off" },
                { de: "der Verzicht", tr: "vazgeçme, feragat", en: "abstention, doing without" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-06-l1-1",
              no: 1,
              text: "Wer beschreibt, dass die eigene Wirkung nicht sichtbar ist?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 1,
              explain:
                "Frau Grohmann en çok etkiyi ısıtma ayarlarını kısarak yaratmış ve ekliyor: \"Bäume sieht man, Heizkurven nicht\". Beklenen şey sembolik olan.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-2",
              no: 2,
              text: "Wer betont, dass eine Investition nicht dasselbe ist wie Verzicht?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 3,
              explain:
                "Frau Ostrowski ayrımı açıkça kuruyor: \"Ich habe nichts verzichtet, ich habe investiert\" ve tartışmanın bunu sürekli karıştırdığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-3",
              no: 3,
              text: "Wer sagt, dass die eigene Entscheidung ständig neu getroffen wird?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 0,
              explain:
                "Herr Baltes kararın yılda bir değil \"bei jedem Feld neu\" alındığını ve çoğunlukla son üç haftanın havasına bağlı olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-4",
              no: 4,
              text: "Wer hält eine unauffällige Vorgehensweise für wirksamer als eine auffällige?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 2,
              explain:
                "Jarek komisyona gidip soru sormayı anlatıyor: \"Das ist langweilig, findet niemand mutig, und es wirkt\". Gazeteye çıkan eylemler ise ölçülebilir bir şey değiştirmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-5",
              no: 5,
              text: "Wer weist darauf hin, dass eine Maßnahme nur für wenige bezahlbar ist?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 3,
              explain:
                "Frau Ostrowski sokağındaki on bir haneden dokuzunun bunu karşılayamayacağını söylüyor: \"macht ihn am Ende, wer ihn ohnehin bezahlen kann\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-6",
              no: 6,
              text: "Wer nennt die Laufzeit der Förderung als eigentliches Hindernis?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 0,
              explain:
                "Herr Baltes iki yıllık desteğin on iki yıllık krediyle uyuşmadığını anlatıyor: \"Was tatsächlich hilft, sind mehrjährige Verträge\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-7",
              no: 7,
              text: "Wer beschreibt ein Engagement, das vor allem Zeit voraussetzt?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 2,
              explain:
                "Jarek \"Wer regelmäßig zu Sitzungen geht, muss Abende haben\" diyor; grupta kalanlar ailesi gelirine muhtaç olmayanlar.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-8",
              no: 8,
              text: "Wer sagt, dass Geld bereitsteht, aber nicht abgerufen wird?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 1,
              explain:
                "Frau Grohmann fonların var olduğunu ama \"sie werden nicht abgerufen, weil niemand Zeit hat, sechzig Seiten auszufüllen\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l1-9",
              no: 9,
              text: "Wer verteidigt etwas, das er selbst für begrenzt wirksam hält?",
              options: ["Herr Baltes", "Frau Grohmann", "Jarek", "Frau Ostrowski"],
              answer: 2,
              explain:
                "Jarek gürültülü eylemlerin ölçülebilir bir şey değiştirmediğini kabul ediyor, ama \"Trotzdem verteidige ich die lauten Aktionen\" diyor: komisyonun varlığını onlar sayesinde öğrenmişler.",
            },
          ],
        },
        {
          id: "de-b2-06-l2",
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
              title: "Warum die Wirkung einzelner Entscheidungen überschätzt wird",
              body: `Kaum eine Frage wird so oft gestellt wie die, was der Einzelne tun kann. Die Antwort fällt regelmäßig zu groß aus, und zwar aus einem nachvollziehbaren Grund. {{10}}

Der erste Punkt betrifft die Größenordnung. Der Anteil, den private Haushalte unmittelbar steuern, liegt je nach Berechnung zwischen einem Viertel und einem Drittel. {{11}}

Hinzu kommt ein Effekt, der in der Beratung gut belegt ist. Wer eine sichtbare Maßnahme ergreift, erlaubt sich anschließend häufiger eine andere Ausgabe. {{12}}

Deutlich wird das an der Verkehrsmittelwahl. Menschen, die im Alltag konsequent das Rad nehmen, fliegen im Durchschnitt nicht seltener als andere. {{13}}

Daraus folgt jedoch nicht, dass individuelles Handeln gleichgültig wäre. Entscheidungen wirken vor allem dort, wo sie andere nach sich ziehen. {{14}}

Für die Praxis heißt das eine Verschiebung des Blicks. Statt zu fragen, was jemand privat verändert, wäre zu fragen, worüber er mitentscheidet. {{15}}`,
              gloss: [
                { de: "die Größenordnung", tr: "büyüklük mertebesi", en: "order of magnitude" },
                { de: "ergreifen (Maßnahme)", tr: "(önlem) almak", en: "to take (a measure)" },
                { de: "gleichgültig", tr: "önemsiz, fark etmez", en: "irrelevant" },
                { de: "nach sich ziehen", tr: "beraberinde getirmek", en: "to entail" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Wer im Betriebsrat, im Verein oder im Gemeinderat sitzt, verändert mit einer Stimme mehr als mit zehn Jahren Mülltrennung.",
            },
            {
              key: "b",
              label: "b",
              body: "Der Rest entsteht in Bereichen, über die Haushalte allenfalls mittelbar bestimmen: Industrie, Netze, öffentliche Beschaffung.",
            },
            {
              key: "c",
              label: "c",
              body: "Diese Verschiebung klingt bescheiden und verlangt in Wahrheit deutlich mehr als der Verzicht auf einzelne Produkte.",
            },
            {
              key: "d",
              label: "d",
              body: "Wer handelt, möchte wissen, dass sein Handeln zählt — und diese Erwartung beeinflusst, welche Zahlen weitergegeben werden.",
            },
            {
              key: "e",
              label: "e",
              body: "Der Anteil erneuerbarer Energien an der Stromerzeugung ist in den letzten zehn Jahren deutlich gestiegen.",
            },
            {
              key: "f",
              label: "f",
              body: "Der ersparte Ausstoß wird durch eine einzige Fernreise in aller Regel mehrfach übertroffen.",
            },
            {
              key: "g",
              label: "g",
              body: "Fachleute sprechen von einem moralischen Guthaben, das anschließend wieder ausgegeben wird.",
            },
            {
              key: "h",
              label: "h",
              body: "Die Zahl der Haushalte in Deutschland liegt seit einigen Jahren bei rund einundvierzig Millionen.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-06-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "d",
              explain:
                "Önceki cümle cevabın \"aus einem nachvollziehbaren Grund\" büyük çıktığını söylüyor; (d) bu gerekçeyi veriyor: eyleyen kişi eyleminin sayıldığını bilmek ister.",
            },
            {
              kind: "match",
              id: "de-b2-06-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "b",
              explain:
                "Paragraf payı veriyor — \"zwischen einem Viertel und einem Drittel\"; (b) geri kalanın nerede oluştuğunu söyleyerek oranı tamamlıyor: sanayi, şebekeler, kamu alımları.",
            },
            {
              kind: "match",
              id: "de-b2-06-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "g",
              explain:
                "Görünür bir önlemden sonra başka bir harcamaya izin verme anlatılıyor; (g) bu olguyu adlandırıyor: \"einem moralischen Guthaben\".",
            },
            {
              kind: "match",
              id: "de-b2-06-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "f",
              explain:
                "Örnek bisikletle uçuşu karşılaştırıyor — \"fliegen im Durchschnitt nicht seltener als andere\"; (f) hesabı kapatıyor: biriken tasarruf tek bir uzak yolculukla kat kat aşılıyor.",
            },
            {
              kind: "match",
              id: "de-b2-06-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "a",
              explain:
                "Paragraf \"Entscheidungen wirken vor allem dort, wo sie andere nach sich ziehen\" diyor; (a) bunu somutlaştırıyor: kurul üyeliği tek başına ayrıştırmadan fazlasını değiştirir.",
            },
            {
              kind: "match",
              id: "de-b2-06-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "c",
              explain:
                "Son paragraf soruyu değiştirmeyi öneriyor: \"worüber er mitentscheidet\"; (c) bu kaymayı değerlendiriyor: alçakgönüllü görünüyor ama tek tek ürünlerden vazgeçmekten daha fazlasını istiyor.",
            },
          ],
        },
        {
          id: "de-b2-06-l3",
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
              title: "Der Ausgleich ist keine Nettigkeit",
              body: `Wenn über eine Abgabe auf Brennstoffe gesprochen wird, folgt die Debatte einem festen Ablauf. Die einen nennen sie notwendig, die anderen unsozial. Beide haben recht, und genau deshalb kommt man nicht weiter.

Eine Abgabe wirkt, weil sie Preise verändert. Das ist ihr Zweck und nicht ihr Nebeneffekt. Wer sie verteidigt und gleichzeitig behauptet, sie tue niemandem weh, verteidigt sie schlecht.

Nun trifft ein höherer Preis nicht alle gleich. Ein Haushalt mit geringem Einkommen gibt einen größeren Anteil für Wärme und Wege aus und kann kurzfristig fast nichts daran ändern. Wer im Neubau wohnt und ein sparsames Auto fährt, spürt dieselbe Abgabe kaum. Das ist keine Behauptung, sondern Arithmetik.

Der übliche Einwand lautet, ein Ausgleich hebe die Lenkungswirkung wieder auf. Er trifft nur dann zu, wenn der Ausgleich an den Verbrauch gebunden wird. Zahlt man dagegen jedem denselben Betrag, bleibt der Anreiz vollständig erhalten: Wer wenig verbraucht, behält mehr.

Politisch ist die Sache dennoch schwierig, und zwar aus einem Grund, der selten ausgesprochen wird. Ein sichtbarer Betrag auf dem Konto wirkt wie ein Geschenk, das man später wieder streichen kann. Genau deshalb müsste er automatisch und ohne jährliche Entscheidung fließen.

Bleibt die unbequeme Wahrheit: Ohne Ausgleich wird die Abgabe irgendwann politisch gekippt, und dann ist beides weg — die Wirkung und das Geld. Der Ausgleich ist keine Nettigkeit gegenüber den Ärmeren. Er ist die Bedingung dafür, dass das Instrument überhaupt bestehen bleibt.`,
              gloss: [
                { de: "die Abgabe", tr: "vergi, harç", en: "levy" },
                { de: "die Lenkungswirkung", tr: "yönlendirici etki", en: "steering effect" },
                { de: "der Anreiz", tr: "teşvik", en: "incentive" },
                { de: "kippen", tr: "devirmek, iptal ettirmek", en: "to overturn" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-06-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie bewertet der Autor die übliche Debatte?",
              options: [
                "Beide Seiten haben in ihrem Punkt recht.",
                "Die Kritiker der Abgabe irren sich.",
                "Die Befürworter haben die besseren Zahlen.",
              ],
              answer: 0,
              explain:
                "İlk paragraf iki tarafı da haklı buluyor: \"Beide haben recht, und genau deshalb kommt man nicht weiter\". Tıkanmanın sebebi bu.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l3-17",
              no: 17,
              ref: "k1",
              text: "Was hält er von der Aussage, die Abgabe tue niemandem weh?",
              options: [
                "Sie stimmt für die meisten Haushalte.",
                "Sie beschreibt den gewünschten Nebeneffekt.",
                "Sie ist eine schlechte Verteidigung.",
              ],
              answer: 2,
              explain:
                "Fiyatı değiştirmek verginin amacı: \"Wer sie verteidigt und gleichzeitig behauptet, sie tue niemandem weh, verteidigt sie schlecht\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l3-18",
              no: 18,
              ref: "k1",
              text: "Womit begründet er die ungleiche Wirkung?",
              options: [
                "Mit den unterschiedlichen Einstellungen der Haushalte.",
                "Mit dem Anteil am Einkommen und fehlenden Alternativen.",
                "Mit der Höhe der Abgabe in verschiedenen Regionen.",
              ],
              answer: 1,
              explain:
                "Düşük gelirli hane ısı ve yol için gelirinin daha büyük bir payını harcıyor ve kısa vadede bunu değiştiremiyor: \"keine Behauptung, sondern Arithmetik\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l3-19",
              no: 19,
              ref: "k1",
              text: "Wann trifft der Einwand gegen einen Ausgleich zu?",
              options: [
                "Immer, weil jeder Ausgleich den Anreiz senkt.",
                "Nur bei einem verbrauchsabhängigen Ausgleich.",
                "Nur bei sehr hohen Ausgleichszahlungen.",
              ],
              answer: 1,
              explain:
                "İtiraz yalnız denkleştirme tüketime bağlandığında geçerli; herkese aynı tutar ödenirse \"bleibt der Anreiz vollständig erhalten\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l3-20",
              no: 20,
              ref: "k1",
              text: "Warum soll die Zahlung automatisch erfolgen?",
              options: [
                "Weil sie sonst wie ein Geschenk wirkt.",
                "Weil sie sonst mit dem Verbrauch verrechnet wird.",
                "Weil sie sonst zu spät bei den Haushalten ankommt.",
              ],
              answer: 0,
              explain:
                "Hesapta görünen bir tutar hediye gibi algılanıyor ve sonradan kaldırılabiliyor; bu yüzden \"ohne jährliche Entscheidung\" akmalı.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l3-21",
              no: 21,
              ref: "k1",
              text: "Was ist die Kernaussage des Schlusses?",
              options: [
                "Der Ausgleich sichert den Bestand des Instruments.",
                "Der Ausgleich ist vor allem eine soziale Geste.",
                "Die Abgabe sollte ohne Ausgleich eingeführt werden.",
              ],
              answer: 0,
              explain:
                "Son cümleler tam bunu söylüyor: denkleştirme bir nezaket değil, \"die Bedingung dafür, dass das Instrument überhaupt bestehen bleibt\".",
            },
          ],
        },
        {
          id: "de-b2-06-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob auf Autobahnen ein allgemeines Tempolimit gelten soll. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, otoyollarda genel bir hız sınırı olup olmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Reinders, Verkehrsplanerin",
              body: "Der Effekt auf den Ausstoß ist real, aber kleiner, als beide Lager behaupten. Deutlich größer und kaum bestritten ist der Effekt auf die Zahl der Schwerverletzten. Wenn wir schon streiten, sollten wir wenigstens über die richtige Zahl streiten.",
            },
            {
              key: "b",
              label: "b — Herr Yücel, Fernfahrer",
              body: "Für mich ändert sich fast nichts, ich fahre ohnehin achtzig. Was sich für mich ändert, ist der Abstand: Wenn hinter mir jemand mit zweihundert auftaucht, habe ich beim Überholen keine Wahl mehr. Das ist kein Umweltargument, das ist mein Arbeitsplatz.",
            },
            {
              key: "c",
              label: "c — Frau Thal, Ärztin in der Notaufnahme",
              body: "Ich sehe zwei- bis dreimal im Monat, was bei hohem Tempo mit einem Körper passiert. Ich weiß, dass Einzelfälle keine Politik begründen. Trotzdem halte ich es für merkwürdig, dass wir über Minuten diskutieren und die Folgekosten nie mitrechnen.",
            },
            {
              key: "d",
              label: "d — Herr Stauffer, Ingenieur",
              body: "Technisch ist ein Limit trivial umzusetzen, und genau das macht mich misstrauisch. Es ist die billigste Maßnahme, die man ergreifen kann, und wird deshalb gern statt teurerer Schritte diskutiert. Ich bin dafür — aber nicht als Ersatz für den Bahnausbau.",
            },
            {
              key: "e",
              label: "e — Frau Ambros, Pendlerin",
              body: "Ich fahre täglich hundertzehn Kilometer, weil ich mir in der Stadt keine Wohnung leisten kann. Man sagt mir, ich solle umziehen oder umsteigen. Beides geht nicht. Bevor man mir etwas verbietet, sollte man mir eine Alternative bauen.",
            },
            {
              key: "f",
              label: "f — Herr Krüger, Fahrlehrer",
              body: "Meine Fahrschüler fahren nicht schnell, weil sie es eilig haben, sondern weil sie es dürfen. Eine klare Regel nimmt Druck aus der Situation. Wer unsicher ist, orientiert sich an den anderen — und die anderen fahren so schnell, wie erlaubt ist.",
            },
            {
              key: "g",
              label: "g — Frau Meiners, Wirtschaftsverband",
              body: "Uns geht es nicht um Sekunden. Uns geht es darum, dass jede Regel begründet sein muss. Solange die Einsparung im niedrigen einstelligen Bereich liegt, halte ich den Eingriff für unverhältnismäßig. Bei besseren Zahlen würde ich meine Position ändern.",
            },
            {
              key: "h",
              label: "h — Herr Fabri, Polizist",
              body: "Kontrolle wäre einfacher, das stimmt. Aber wir kontrollieren heute schon zu wenig, und das liegt nicht am Gesetz, sondern am Personal. Eine neue Regel ohne zusätzliche Streifen verändert vor allem die Statistik, nicht das Verhalten.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-06-l4-22",
              no: 22,
              text: "Wir streiten über die falsche Kennzahl.",
              answer: "a",
              explain:
                "Frau Reinders emisyon etkisini gerçek ama küçük buluyor; ağır yaralı sayısındaki etkiyi çok daha büyük görüyor: \"wenigstens über die richtige Zahl streiten\".",
            },
            {
              kind: "match",
              id: "de-b2-06-l4-23",
              no: 23,
              text: "Das Argument betrifft meinen Arbeitsplatz, nicht die Umwelt.",
              answer: "b",
              explain:
                "Herr Yücel kendi hızının değişmediğini, değişenin sollarken kalan boşluk olduğunu söylüyor: \"Das ist kein Umweltargument, das ist mein Arbeitsplatz\".",
            },
            {
              kind: "match",
              id: "de-b2-06-l4-24",
              no: 24,
              text: "Eine Maßnahme darf nicht andere, teurere ersetzen.",
              answer: "d",
              explain:
                "Herr Stauffer sınırı destekliyor ama şartını koyuyor: \"aber nicht als Ersatz für den Bahnausbau\". Ucuz olması onu şüphelendiriyor.",
            },
            {
              kind: "match",
              id: "de-b2-06-l4-25",
              no: 25,
              text: "Ohne Alternative ist ein Verbot nicht zumutbar.",
              answer: "e",
              explain:
                "Frau Ambros şehirde ev tutamadığı için günde 110 kilometre gidiyor: \"Bevor man mir etwas verbietet, sollte man mir eine Alternative bauen\".",
            },
            {
              kind: "match",
              id: "de-b2-06-l4-26",
              no: 26,
              text: "Menschen orientieren sich an dem, was erlaubt ist.",
              answer: "f",
              explain:
                "Herr Krüger öğrencilerinin acelesi olduğu için değil \"weil sie es dürfen\" hızlı sürdüğünü söylüyor; belirsiz olan başkalarına bakıyor.",
            },
            {
              kind: "match",
              id: "de-b2-06-l4-27",
              no: 27,
              text: "Eine Regel ohne Durchsetzung ändert vor allem die Statistik.",
              answer: "h",
              explain:
                "Herr Fabri sorunu yasada değil personelde görüyor: ek devriye olmadan yeni kural \"verändert vor allem die Statistik, nicht das Verhalten\".",
            },
          ],
        },
        {
          id: "de-b2-06-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Abfallsatzung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Atık yönetmeliğini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Abfallsatzung",
              genreTr: "Atık yönetmeliği",
              title: "Auszug aus der Abfallsatzung der Stadt Marlen",
              body: `§ 2 Anschluss
Jedes Grundstück ist an die Abfallentsorgung anzuschließen. Die Mindestausstattung beträgt eine Restmülltonne mit 60 Litern je Haushalt; bei mehr als vier Personen erhöht sich das Mindestvolumen auf 120 Liter.

§ 4 Bioabfall
Die Biotonne ist verpflichtend. Von der Pflicht befreit wird, wer eine geeignete Eigenkompostierung nachweist. Der Nachweis ist alle drei Jahre zu erneuern; er entfällt nicht dadurch, dass er einmal erbracht wurde.

§ 6 Abfuhr
Die Tonnen sind bis 6 Uhr am Abfuhrtag bereitzustellen. Wird eine Tonne wegen falscher Befüllung nicht geleert, erfolgt keine Nachleerung; die nächste reguläre Abfuhr ist abzuwarten. Eine Sonderabfuhr kostet 45 Euro.

§ 9 Sperrmüll
Zweimal jährlich kann Sperrmüll kostenlos abgeholt werden, jeweils bis vier Kubikmeter. Elektrogeräte sind ausgenommen und über den Wertstoffhof zu entsorgen. Bauabfälle gelten nicht als Sperrmüll.

§ 12 Gebühren
Die Gebühr richtet sich nach dem Volumen der Restmülltonne, nicht nach der Zahl der Leerungen. Eine Reduzierung ist nur zum Jahreswechsel und nur schriftlich möglich.`,
              gloss: [
                { de: "die Mindestausstattung", tr: "asgari donanım", en: "minimum provision" },
                { de: "die Eigenkompostierung", tr: "kendi kompostunu yapma", en: "home composting" },
                { de: "die Nachleerung", tr: "sonradan boşaltma", en: "subsequent emptying" },
                { de: "der Sperrmüll", tr: "iri hacimli atık", en: "bulky waste" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-06-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie kompostieren selbst und haben das vor vier Jahren nachgewiesen. Was gilt jetzt?",
              options: [
                "Die Befreiung gilt unbefristet weiter.",
                "Sie brauchen einen neuen Nachweis.",
                "Die Biotonne war nie verpflichtend.",
              ],
              answer: 1,
              explain:
                "§ 4 belgenin üç yılda bir yenilenmesini istiyor ve ekliyor: \"er entfällt nicht dadurch, dass er einmal erbracht wurde\". Dört yıl bu süreyi aşıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l5-29",
              no: 29,
              ref: "o1",
              text: "Ihre Tonne wurde wegen falscher Befüllung nicht geleert. Was können Sie tun?",
              options: [
                "Bis zur nächsten regulären Abfuhr warten.",
                "Eine kostenlose Nachleerung verlangen.",
                "Die Tonne am Folgetag erneut bereitstellen.",
              ],
              answer: 0,
              explain:
                "§ 6 sonradan boşaltmayı kapatıyor: \"erfolgt keine Nachleerung; die nächste reguläre Abfuhr ist abzuwarten\". Özel sefer ise 45 euro.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-l5-30",
              no: 30,
              ref: "o1",
              text: "Sie möchten Ihre Gebühr senken, weil Ihre Tonne selten voll ist. Geht das?",
              options: [
                "Ja, die Gebühr richtet sich nach den Leerungen.",
                "Nein, eine Änderung ist ausgeschlossen.",
                "Nur durch ein kleineres Volumen zum Jahreswechsel.",
              ],
              answer: 2,
              explain:
                "§ 12 ücreti hacme bağlıyor, boşaltma sayısına değil; küçültme ise \"nur zum Jahreswechsel und nur schriftlich\" mümkün.",
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
          id: "de-b2-06-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage am Wertstoffhof",
              genreTr: "Atık toplama merkezinde anons",
              situation: "Kabul kuralları duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für alle Anlieferer: Bauabfälle nehmen wir heute nicht an, die Container sind voll. Elektrogeräte und Grünschnitt können Sie wie gewohnt abgeben. Wer mit einem Anhänger kommt, fährt bitte über die zweite Einfahrt; vor dem Haupttor staut es sich bis auf die Straße.",
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
                  text: "Eine Auswertung aus Freiburg hat 900 Haushalte über zwei Jahre begleitet. Wer eine Rückmeldung über den eigenen Stromverbrauch im Vergleich zur Nachbarschaft bekam, sparte im Schnitt zwei Prozent. Deutlich stärker wirkte etwas anderes: der Austausch alter Geräte, den nur ein Drittel überhaupt in Betracht zog.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Enerji danışmanlığı geri dönüş yapıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Petersen, hier ist die Energieberatung. Ihr Termin bleibt wie vereinbart, allerdings kommt eine Kollegin statt meiner. Wichtig: Legen Sie bitte die letzten drei Abrechnungen bereit, nicht nur die aktuelle. Ohne die Vorjahre können wir den Verbrauch nicht einordnen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Bürgerversammlung",
              genreTr: "Halk toplantısında duyuru",
              situation: "Toplantının düzeni açıklanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Zum Ablauf: Zuerst stellt das Planungsbüro den Entwurf vor, danach haben Sie sechzig Minuten für Fragen. Schriftliche Einwendungen sind bis zum dreißigsten Juni möglich und wirken rechtlich stärker als Wortmeldungen heute Abend. Formulare liegen am Eingang.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage im Bus",
              genreTr: "Otobüste anons",
              situation: "Bilet düzeninde bir değişiklik duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Fahrgäste, ab dem ersten Mai entfällt der Verkauf von Einzelfahrscheinen beim Fahrer. Tickets erhalten Sie am Automaten an der Haltestelle oder in der App. Zeitkarten sind nicht betroffen. Wer ohne gültigen Fahrschein angetroffen wird, zahlt weiterhin sechzig Euro.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-06-h1-1",
              no: 1,
              ref: "h1",
              text: "Elektrogeräte können heute abgegeben werden.",
              answer: true,
              explain:
                "Anons ayrımı yapıyor: inşaat atığı bugün alınmıyor, buna karşılık \"Elektrogeräte und Grünschnitt können Sie wie gewohnt abgeben\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h1-2",
              no: 2,
              ref: "h1",
              text: "Was sollen Anlieferer mit Anhänger tun?",
              options: [
                "Am Haupttor warten, bis es frei wird.",
                "Ihre Anlieferung auf morgen verschieben.",
                "Die zweite Einfahrt benutzen.",
              ],
              answer: 2,
              explain:
                "Anons yönlendiriyor: römorkla gelenler \"über die zweite Einfahrt\" girmeli, çünkü ana kapıda kuyruk sokağa taşıyor.",
            },
            {
              kind: "bool",
              id: "de-b2-06-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Rückmeldung zum Verbrauch hatte den größten Effekt.",
              answer: false,
              explain:
                "Geri bildirim ortalama yüzde iki tasarruf sağlamış; \"deutlich stärker\" etki eden şey eski cihazların değişimi olmuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h1-4",
              no: 4,
              ref: "h2",
              text: "Was sagt die Auswertung über den Gerätetausch?",
              options: [
                "Nur ein Drittel zog ihn überhaupt in Betracht.",
                "Er wurde von fast allen Haushalten umgesetzt.",
                "Er lohnte sich finanziell für niemanden.",
              ],
              answer: 0,
              explain:
                "Etkisi büyük olan seçeneği \"nur ein Drittel überhaupt in Betracht zog\". Yani en etkili adım en az düşünülen adım.",
            },
            {
              kind: "bool",
              id: "de-b2-06-h1-5",
              no: 5,
              ref: "h3",
              text: "Der Termin wird auf einen anderen Tag verschoben.",
              answer: false,
              explain:
                "Mesaj tersini söylüyor: \"Ihr Termin bleibt wie vereinbart\". Değişen tek şey görüşmeye gelecek kişi.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h1-6",
              no: 6,
              ref: "h3",
              text: "Was soll Herr Petersen vorbereiten?",
              options: [
                "Nur die aktuelle Abrechnung.",
                "Die Abrechnungen mehrerer Jahre.",
                "Einen Grundriss seiner Wohnung.",
              ],
              answer: 1,
              explain:
                "Mesaj gerekçesini de veriyor: geçmiş yıllar olmadan tüketim \"nicht einordnen\" edilemiyor, bu yüzden son üç fatura isteniyor.",
            },
            {
              kind: "bool",
              id: "de-b2-06-h1-7",
              no: 7,
              ref: "h4",
              text: "Wortmeldungen am Abend haben rechtlich mehr Gewicht als schriftliche Einwendungen.",
              answer: false,
              explain:
                "Duyuru tersini söylüyor: yazılı itirazlar \"wirken rechtlich stärker als Wortmeldungen heute Abend\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h1-8",
              no: 8,
              ref: "h4",
              text: "Bis wann sind schriftliche Einwendungen möglich?",
              options: [
                "Bis zum Ende der Versammlung.",
                "Bis zum dreißigsten Juni.",
                "Bis zur nächsten Sitzung im Herbst.",
              ],
              answer: 1,
              explain:
                "Tarih doğrudan veriliyor: \"bis zum dreißigsten Juni\". Formlar da girişte duruyor.",
            },
            {
              kind: "bool",
              id: "de-b2-06-h1-9",
              no: 9,
              ref: "h5",
              text: "Zeitkarten sind von der Änderung ausgenommen.",
              answer: true,
              explain:
                "Değişiklik yalnız şoförden tek bilet satışını kaldırıyor; \"Zeitkarten sind nicht betroffen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h1-10",
              no: 10,
              ref: "h5",
              text: "Wo bekommt man ab Mai Einzelfahrscheine?",
              options: [
                "Weiterhin auch beim Fahrer.",
                "Nur noch in Vorverkaufsstellen.",
                "Am Automaten oder in der App.",
              ],
              answer: 2,
              explain:
                "Anons iki yol bırakıyor: \"am Automaten an der Haltestelle oder in der App\". Şoförden satış mayıstan itibaren kalkıyor.",
            },
          ],
        },
        {
          id: "de-b2-06-h2",
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
              situation: "Bir enerji danışmanı ev sahipleriyle deneyimlerini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Grohmann, Sie beraten seit acht Jahren. Was fragen die Leute zuerst?" },
                {
                  speaker: "Frau Grohmann",
                  text: "Fast immer nach der Heizung. Dabei ist sie selten der erste Schritt. In den meisten Häusern bringt die Dichtung an Fenstern und Türen mehr — für ein Zwanzigstel des Geldes.",
                },
                { speaker: "Moderator", text: "Warum steht die Heizung dann so im Vordergrund?" },
                {
                  speaker: "Frau Grohmann",
                  text: "Weil sie ein Gerät ist. Man kann sie kaufen, sehen und vorzeigen. Eine dichte Tür sieht niemand, und sie taugt nicht als Gespräch am Gartenzaun.",
                },
                { speaker: "Moderator", text: "Wie oft folgen die Leute Ihrem Rat?" },
                {
                  speaker: "Frau Grohmann",
                  text: "Bei kleinen Maßnahmen fast immer. Bei großen selten, und das liegt nicht am Wollen. Wer sechzig ist und keine Rücklage hat, bekommt für zwanzig Jahre keinen Kredit mehr.",
                },
                { speaker: "Moderator", text: "Hilft die Förderung?" },
                {
                  speaker: "Frau Grohmann",
                  text: "Sie hilft denen, die vorstrecken können. Ausgezahlt wird nach der Rechnung, nicht davor. Wer die vierzigtausend nicht hat, für den existiert die Förderung praktisch nicht.",
                },
                { speaker: "Moderator", text: "Was hat sich in acht Jahren verändert?" },
                {
                  speaker: "Frau Grohmann",
                  text: "Die Beratung ist besser geworden, die Umsetzung nicht. Ich schreibe heute genauere Berichte als früher, und ein größerer Teil davon bleibt liegen.",
                },
                { speaker: "Moderator", text: "Was würden Sie ändern?" },
                {
                  speaker: "Frau Grohmann",
                  text: "Ich würde die Förderung an das Haus binden, nicht an die Person. Dann könnte sie mit dem Gebäude weitergehen, und das Alter der Eigentümer wäre kein Hindernis mehr.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-06-h2-11",
              no: 11,
              ref: "i1",
              text: "Wonach fragen die Leute zuerst?",
              options: [
                "Nach der Heizung.",
                "Nach der Förderung.",
                "Nach den Fenstern.",
              ],
              answer: 0,
              explain:
                "\"Fast immer nach der Heizung\" diyor, oysa ilk adım genelde pencere ve kapı contası — hem de yirmide bir maliyetle.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h2-12",
              no: 12,
              ref: "i1",
              text: "Warum steht dieses Thema so im Vordergrund?",
              options: [
                "Weil es die größte Ersparnis bringt.",
                "Weil Handwerker es empfehlen.",
                "Weil man das Ergebnis vorzeigen kann.",
              ],
              answer: 2,
              explain:
                "Gerekçesi görünürlük: kombi bir cihaz, satın alınıp gösterilebiliyor; sızdırmaz bir kapı ise \"taugt nicht als Gespräch am Gartenzaun\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h2-13",
              no: 13,
              ref: "i1",
              text: "Woran scheitern große Maßnahmen meistens?",
              options: [
                "Am fehlenden Willen der Eigentümer.",
                "An fehlenden Handwerksbetrieben.",
                "An der Finanzierung im Alter.",
              ],
              answer: 2,
              explain:
                "\"das liegt nicht am Wollen\" diyor: altmış yaşında ve birikimi olmayan biri yirmi yıllık kredi alamıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h2-14",
              no: 14,
              ref: "i1",
              text: "Wem hilft die Förderung nach ihrer Beobachtung?",
              options: [
                "Denen, die das Geld vorstrecken können.",
                "Vor allem jungen Familien.",
                "Allen, die einen Antrag stellen.",
              ],
              answer: 0,
              explain:
                "Ödeme faturadan sonra yapılıyor: parası olmayan için destek \"praktisch nicht\" var. Yani yardım ön ödeme yapabilene gidiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h2-15",
              no: 15,
              ref: "i1",
              text: "Was hat sich in acht Jahren verändert?",
              options: [
                "Beratung und Umsetzung sind besser geworden.",
                "Die Beratung ist besser, die Umsetzung nicht.",
                "Beides ist ungefähr gleich geblieben.",
              ],
              answer: 1,
              explain:
                "Raporları eskisinden ayrıntılı, ama \"ein größerer Teil davon bleibt liegen\". Danışmanlık ilerlemiş, uygulama ilerlememiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h2-16",
              no: 16,
              ref: "i1",
              text: "Was schlägt sie vor?",
              options: [
                "Höhere Fördersätze für ältere Eigentümer.",
                "Eine Pflicht zur Sanierung beim Verkauf.",
                "Die Förderung an das Gebäude zu binden.",
              ],
              answer: 2,
              explain:
                "Önerisi açık: \"die Förderung an das Haus binden, nicht an die Person\". Böylece destek binayla devrediyor ve yaş engel olmaktan çıkıyor.",
            },
          ],
        },
        {
          id: "de-b2-06-h3",
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
              situation: "İki konuk hız sınırını tartışıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Ein allgemeines Tempolimit — Frau Reinders, Sie forschen zum Verkehr." },
                {
                  speaker: "Frau Reinders",
                  text: "Ich beginne mit dem, was gegen mich spricht: Die Einsparung beim Ausstoß ist kleiner, als oft behauptet wird. Etwa zwei Prozent des Verkehrssektors. Wer damit wirbt, macht sich angreifbar.",
                },
                { speaker: "Moderatorin", text: "Herr Stauffer, Sie sind Ingenieur." },
                {
                  speaker: "Herr Stauffer",
                  text: "In diesem Punkt sind wir uns einig, und deshalb argumentiere ich anders. Mich überzeugt die Sicherheit. Auf Abschnitten mit Limit sinkt die Zahl der Schwerverletzten deutlich, das ist gut belegt.",
                },
                {
                  speaker: "Frau Reinders",
                  text: "Dem stimme ich zu. Nur folgt daraus für mich eine andere Priorität: Auf Landstraßen passiert deutlich mehr als auf Autobahnen. Wenn Sicherheit das Argument ist, diskutieren wir über die falsche Straße.",
                },
                {
                  speaker: "Herr Stauffer",
                  text: "Das ist ein fairer Einwand. Nur schließt das eine das andere nicht aus. Ein Limit auf der Autobahn kostet nichts, während ein Umbau von Landstraßen Jahrzehnte dauert.",
                },
                {
                  speaker: "Frau Reinders",
                  text: "Und genau deshalb bin ich vorsichtig. Was nichts kostet, wird gern als Erfolg verbucht — und danach passiert lange nichts anderes mehr.",
                },
                { speaker: "Moderatorin", text: "Gibt es eine gemeinsame Linie?" },
                {
                  speaker: "Herr Stauffer",
                  text: "Ich denke schon. Ein Limit ja, aber verbunden mit einem verbindlichen Programm für Landstraßen im selben Beschluss. Sonst wird das eine zum Ersatz für das andere.",
                },
                {
                  speaker: "Frau Reinders",
                  text: "Damit könnte ich leben, allerdings nur mit einem Zeitplan. Ohne Termine sind solche Programme Absichtserklärungen, und die kenne ich zur Genüge.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-06-h3-17",
              no: 17,
              ref: "d1",
              text: "Womit beginnt Frau Reinders?",
              options: [
                "Mit einer Kritik an der Autoindustrie.",
                "Mit einer Zahl aus ihrer eigenen Forschung.",
                "Mit einem Punkt gegen ihre eigene Seite.",
              ],
              answer: 2,
              explain:
                "\"Ich beginne mit dem, was gegen mich spricht\" diyor: emisyon tasarrufu sanılandan küçük, yaklaşık yüzde iki.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h3-18",
              no: 18,
              ref: "d1",
              text: "Womit argumentiert Herr Stauffer stattdessen?",
              options: [
                "Mit der Sicherheit.",
                "Mit den Kosten für den Staat.",
                "Mit dem Lärm an Autobahnen.",
              ],
              answer: 0,
              explain:
                "Emisyon noktasında hemfikir oldukları için başka bir gerekçeye geçiyor: \"Mich überzeugt die Sicherheit\" — sınırlı kesimlerde ağır yaralı sayısı düşüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h3-19",
              no: 19,
              ref: "d1",
              text: "Welche Priorität leitet Frau Reinders daraus ab?",
              options: [
                "Ein höheres Limit auf Autobahnen.",
                "Mehr Kontrollen im Stadtverkehr.",
                "Den Blick auf die Landstraßen.",
              ],
              answer: 2,
              explain:
                "Güvenlik argümanını kabul ediyor ama sonucunu kaydırıyor: kazaların çoğu kara yollarında, \"diskutieren wir über die falsche Straße\".",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h3-20",
              no: 20,
              ref: "d1",
              text: "Wie antwortet Herr Stauffer auf diesen Einwand?",
              options: [
                "Er nennt ihn fair, sieht aber keinen Widerspruch.",
                "Er hält die Zahlen für unzuverlässig.",
                "Er verweist auf die Zuständigkeit der Länder.",
              ],
              answer: 0,
              explain:
                "\"Das ist ein fairer Einwand\" diyor ve ekliyor: biri ötekini dışlamıyor, üstelik otoyol sınırı hiçbir şeye mal olmuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h3-21",
              no: 21,
              ref: "d1",
              text: "Worin liegt für Frau Reinders die Gefahr billiger Maßnahmen?",
              options: [
                "Sie werden von der Bevölkerung abgelehnt.",
                "Sie werden als Erfolg verbucht und ersetzen anderes.",
                "Sie sind rechtlich schwer durchzusetzen.",
              ],
              answer: 1,
              explain:
                "\"Was nichts kostet, wird gern als Erfolg verbucht — und danach passiert lange nichts anderes mehr.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h3-22",
              no: 22,
              ref: "d1",
              text: "Welche Bedingung stellt Frau Reinders an die gemeinsame Linie?",
              options: [
                "Eine Befristung des Limits auf fünf Jahre.",
                "Eine Zustimmung der Bundesländer.",
                "Einen verbindlichen Zeitplan.",
              ],
              answer: 2,
              explain:
                "Karma çözümü kabul ediyor ama \"nur mit einem Zeitplan\" diyor; tarihsiz programları \"Absichtserklärungen\" sayıyor.",
            },
          ],
        },
        {
          id: "de-b2-06-h4",
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
              situation: "Bir davranış araştırmacısı alışkanlık değişimini anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Ich beginne mit einer Enttäuschung: Wissen verändert Verhalten kaum. Das ist seit vierzig Jahren bekannt und wird in jeder Kampagne aufs Neue ignoriert.",
                },
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Was tatsächlich wirkt, sind Wechsel. Menschen ändern Gewohnheiten fast ausschließlich in Umbruchsituationen: Umzug, neuer Job, Geburt eines Kindes. In diesen Wochen ist die Wahrscheinlichkeit einer dauerhaften Änderung etwa dreimal so hoch wie sonst.",
                },
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Zweitens die Voreinstellung. In einem Versuch mit 14 000 Verträgen blieb der Ökostromtarif bei 68 Prozent bestehen, wenn er voreingestellt war, und wurde von 9 Prozent gewählt, wenn man ihn ankreuzen musste. Die Information war in beiden Gruppen identisch.",
                },
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Drittens, und das wird oft missverstanden: Der Vergleich mit anderen wirkt, aber nur nach oben. Wer erfährt, dass er weniger verbraucht als die Nachbarschaft, erhöht seinen Verbrauch anschließend leicht. Diesen Rückschlag muss man einplanen.",
                },
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Viertens zur Dauer. Fast alle Effekte lassen nach etwa neun Monaten nach, wenn nichts nachkommt. Kampagnen werden trotzdem meistens auf zwölf Wochen angelegt und dann nicht wiederholt.",
                },
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Daraus folgt eine unbequeme Empfehlung: Man sollte Geld weniger in Aufklärung stecken und mehr in die Umstellung von Voreinstellungen. Das klingt technokratisch und ist demokratisch heikel, weil es Entscheidungen vorwegnimmt.",
                },
                {
                  speaker: "Frau Prof. Ambrosius",
                  text: "Ich schließe mit einer Einschränkung: Unsere Befunde stammen aus Haushalten. Für betriebliche Entscheidungen gelten andere Mechanismen, vor allem weil dort mehrere Personen zustimmen müssen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-06-h4-23",
              no: 23,
              ref: "v1",
              text: "Womit beginnt der Vortrag?",
              options: [
                "Mit einer Zahl aus einem Versuch.",
                "Mit der geringen Wirkung von Wissen.",
                "Mit einer Kritik an der Politik.",
              ],
              answer: 1,
              explain:
                "\"Wissen verändert Verhalten kaum\" diyor ve bunun kırk yıldır bilindiğini, buna rağmen her kampanyada yok sayıldığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-24",
              no: 24,
              ref: "v1",
              text: "Wann ändern Menschen Gewohnheiten?",
              options: [
                "Nach einer guten Beratung.",
                "Wenn der Preis deutlich steigt.",
                "In Umbruchsituationen.",
              ],
              answer: 2,
              explain:
                "\"Menschen ändern Gewohnheiten fast ausschließlich in Umbruchsituationen\" — taşınma, yeni iş, çocuk doğumu. Olasılık normalin yaklaşık üç katına çıkıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-25",
              no: 25,
              ref: "v1",
              text: "Was zeigt der Versuch mit den 14 000 Verträgen?",
              options: [
                "Die Wirkung besserer Information.",
                "Die Wirkung der Voreinstellung.",
                "Die Wirkung des Preises.",
              ],
              answer: 1,
              explain:
                "Bilgi iki grupta aynıydı; değişen tek şey seçeneğin önceden işaretli olması — sonuç yüzde 68'e karşı yüzde 9.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-26",
              no: 26,
              ref: "v1",
              text: "Wie wirkt der Vergleich mit der Nachbarschaft?",
              options: [
                "Er wirkt in beide Richtungen gleich stark.",
                "Er wirkt nur bei jüngeren Haushalten.",
                "Er wirkt vor allem bei hohem eigenem Verbrauch.",
              ],
              answer: 2,
              explain:
                "Karşılaştırma \"nur nach oben\" işliyor: komşusundan az tüketen kişi tüketimini sonrasında biraz artırıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-27",
              no: 27,
              ref: "v1",
              text: "Was sagt sie über die Dauer der Effekte?",
              options: [
                "Sie halten etwa neun Monate.",
                "Sie halten mindestens drei Jahre.",
                "Sie verschwinden schon nach zwölf Wochen.",
              ],
              answer: 0,
              explain:
                "Etkiler \"nach etwa neun Monaten\" sönüyor; kampanyalar ise genelde on iki haftaya kurgulanıp tekrarlanmıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-28",
              no: 28,
              ref: "v1",
              text: "Was empfiehlt sie?",
              options: [
                "Mehr Geld für Aufklärungskampagnen.",
                "Eine Umstellung von Voreinstellungen.",
                "Eine stärkere Kontrolle der Anbieter.",
              ],
              answer: 1,
              explain:
                "\"weniger in Aufklärung stecken und mehr in die Umstellung von Voreinstellungen\" diyor — kendi deyimiyle teknokratik görünen ama etkili olan yol.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-29",
              no: 29,
              ref: "v1",
              text: "Warum nennt sie diese Empfehlung heikel?",
              options: [
                "Weil sie in der Umsetzung viel kostet.",
                "Weil sie Entscheidungen vorwegnimmt.",
                "Weil sie rechtlich unmöglich ist.",
              ],
              answer: 1,
              explain:
                "Demokratik açıdan hassas buluyor, çünkü ön ayar \"Entscheidungen vorwegnimmt\" — insanlar adına önceden karar verilmiş oluyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-06-h4-30",
              no: 30,
              ref: "v1",
              text: "Womit schließt sie?",
              options: [
                "Mit einer Forderung an Unternehmen.",
                "Mit einem Ausblick auf neue Versuche.",
                "Mit einem Hinweis auf die Grenzen ihrer Befunde.",
              ],
              answer: 2,
              explain:
                "\"Unsere Befunde stammen aus Haushalten\"; işletme kararlarında başka mekanizmalar geçerli, çünkü orada birden çok kişinin onayı gerekiyor.",
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
          id: "de-b2-06-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer wirklich etwas für die Umwelt tun will, muss bei sich selbst anfangen.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Çevre için gerçekten bir şey yapmak isteyen kendinden başlamalı.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz klingt vernünftig und verschiebt doch die Verantwortung an die Stelle, an der am wenigsten zu gewinnen ist.

Zum einen ist der Anteil, den ein Haushalt unmittelbar steuert, begrenzt. Ob mein Strom aus Wind kommt, entscheidet nicht mein Verhalten, sondern der Netzausbau, über den ich als Einzelner nicht abstimme.

Zum anderen ist der Ratschlag ungleich verteilt. Meine Nachbarin hat ihr Haus gedämmt und dafür einundfünfzigtausend Euro gezahlt. In derselben Straße können neun von elf Haushalten das nicht. Wer solchen Familien sagt, sie sollten bei sich anfangen, beschreibt nicht ihre Möglichkeiten, sondern sein eigenes Einkommen.

Natürlich gibt es Menschen, die alle Optionen haben und keine nutzen. Das ist ärgerlich, ändert an der Größenordnung aber nichts.

Mein Schluss: Persönliches Handeln bleibt richtig, es ersetzt jedoch keine Entscheidung. Wirksam wird es vor allem dort, wo jemand tatsächlich mitbestimmt — im Betrieb, im Verein oder im Gemeinderat.

Mit freundlichen Grüßen
Lea Sonnenberg`,
            criteria: [
              "İddiaya doğrudan atıf yapıldı mı ve tutum net mi?",
              "En az iki farklı gerekçe var mı ve bunlar somut mu (sayı, örnek)?",
              "Karşı görüş gerçekten ele alınıp yanıtlandı mı?",
              "Sonuç, sunulan gerekçelerden çıkıyor mu?",
              "Metin bağlaçlarla örülmüş mü? (zum einen … zum anderen, natürlich, folglich)",
              "Resmî hitap ve veda var mı, yaklaşık 150 kelime mi?",
            ],
          },
        },
        {
          id: "de-b2-06-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "In Ihrem Haus wird der Müll seit Monaten falsch getrennt; die Biotonne wurde zweimal nicht geleert. Schreiben Sie an die Hausverwaltung (circa 100 Wörter).",
          promptTr:
            "Binanızda aylardır çöp yanlış ayrılıyor; biyoçöp konteyneri iki kez boşaltılmadı. Site yönetimine yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Beschreiben Sie das Problem mit Beispiel.", tr: "Sorunu örnekle anlat." },
              { de: "Nennen Sie die Folgen.", tr: "Sonuçlarını söyle." },
              { de: "Vermeiden Sie Schuldzuweisungen an einzelne Nachbarn.", tr: "Tek tek komşuları suçlamaktan kaçın." },
              { de: "Schlagen Sie eine Lösung vor.", tr: "Bir çözüm öner." },
            ],
            sample: `Sehr geehrte Frau Meiners,

in unserem Haus wird die Biotonne seit dem Frühjahr regelmäßig falsch befüllt; zuletzt lagen Plastiktüten und Glas darin.

Die Folge ist konkret: Am 14. und am 28. Mai wurde die Tonne nicht geleert. Der Abfall stand danach zwei Wochen im Hof, und die Restmülltonne war entsprechend überfüllt.

Ich möchte ausdrücklich niemanden beschuldigen; ich vermute, dass die Regeln vielen schlicht nicht bekannt sind, zumal die Beschriftung nur auf Deutsch vorhanden ist.

Wäre es möglich, einen kurzen Aushang mit Bildern anzubringen und die Tonnen deutlicher zu kennzeichnen? Ich helfe gern beim Übersetzen und beim Anbringen.

Mit freundlichen Grüßen
Tomas Bihar`,
            criteria: [
              "Sorun somut örnekle anlatıldı mı (ne, ne zaman)?",
              "Sonuçlar açıkça yazıldı mı?",
              "Suçlayıcı olmayan bir ton korunmuş mu?",
              "Önerilen çözüm uygulanabilir ve kendi katkısı var mı?",
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
          id: "de-b2-06-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Umweltschutz: Aufgabe des Einzelnen oder des Staates?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"Çevre koruma: bireyin mi devletin mi görevi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
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
              "Ich möchte heute darüber sprechen, wer für den Umweltschutz zuständig ist. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In Rumänien wird sehr viel über persönliches Verhalten gesprochen, weil dem Staat wenig zugetraut wird. Getrennt gesammelt wird trotzdem kaum — nicht aus Unwillen, sondern weil in meiner Heimatstadt drei Jahre lang derselbe Wagen alle Tonnen zusammen abgeholt hat. Für die individuelle Seite spricht, dass Gewohnheiten sich nur dort ändern, wo Menschen selbst handeln. Meine Schwester hat ihr Auto abgeschafft, und zwei Nachbarn haben es ihr nachgemacht. Für die staatliche Seite spricht die Größenordnung: Was Haushalte direkt steuern, ist etwa ein Drittel; der Rest entsteht in der Industrie und in den Netzen. Meine Position ist deshalb keine Entweder-oder-Antwort. Der Staat muss die Bedingungen schaffen, unter denen individuelles Handeln überhaupt möglich ist — und der Einzelne muss dort entscheiden, wo er mitbestimmt. Zusammenfassend: Ohne Struktur bleibt Verhalten wirkungslos, und ohne Verhalten bleibt Struktur ungenutzt.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut ve açıklayıcı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Konum gerekçeli mi ve iki tarafı da hesaba katıyor mu?",
              "Bağlayıcılar kullanıldı mı? (zunächst, für die … Seite spricht, dagegen, zusammenfassend)",
              "Dört dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b2-06-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihr Betrieb will bis Jahresende eine Umweltmaßnahme umsetzen. Einigen Sie sich mit Ihrer Gesprächspartnerin: Jobticket für alle, Umstellung der Kantine, Solaranlage auf dem Dach oder ein Reparaturbudget für Geräte.",
          promptTr:
            "İşletmeniz yıl sonuna kadar bir çevre önlemi uygulayacak. Karşındakiyle anlaş: herkese ulaşım kartı, yemekhanenin dönüşümü, çatıya güneş paneli ya da cihazlar için onarım bütçesi.",
          prepSeconds: 90,
          exchange: [
            {
              who: "partner",
              de: "Wir sollen bis Freitag einen Vorschlag machen. Ich wäre für die Solaranlage — das ist sichtbar, und die Geschäftsführung kann damit werben. Wie sehen Sie das?",
              tr: "Cumaya kadar bir öneri sunmalıyız. Ben güneş panelinden yanayım — görünür bir şey ve yönetim bununla tanıtım yapabilir. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve görünürlük gerekçesini de ele al.",
              expect: "bir seçeneği gerekçelendirerek savunmak ve karşı gerekçeyi ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das kann ich nachvollziehen. Nur bedenken Sie: Ein Jobticket kostet jedes Jahr wieder, eine Anlage einmal. In fünf Jahren stehen wir sonst wieder am Anfang.",
              tr: "Anlıyorum. Ama şunu düşün: Ulaşım kartı her yıl yeniden masraf, panel bir kez. Beş yıl sonra yine başa döneriz.",
            },
            {
              who: "you",
              hint: "Kalıcılık itirazını ele al ve bir birleşim öner.",
              expect: "bir itiraza karşılık verip iki seçeneği birleştiren bir model önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Über eine Kombination lässt sich reden. Nur reicht das Budget nicht für beides in voller Höhe. Worauf würden Sie verzichten?",
              tr: "Karma bir çözüm konuşulabilir. Ama bütçe ikisine birden tam olarak yetmez. Neyden vazgeçersin?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden elediğini söyle.",
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
              "Sichtbarkeit ist ein Argument, nur nicht das erste: Bei uns fahren achtzig Prozent der Beschäftigten allein mit dem Auto zur Arbeit, und genau dort liegt der größte Anteil. Ihr Einwand mit den laufenden Kosten trifft allerdings zu. Deshalb schlage ich vor: das Jobticket für drei Jahre verbindlich zusagen und parallel die Anlage in kleinerer Größe planen, damit sie später erweitert werden kann. Verzichten würde ich zuerst auf das Reparaturbudget, weil wir dafür ohnehin keine Werkstatt im Haus haben. Wir hätten uns also geeinigt auf: Jobticket als Schwerpunkt mit fester Laufzeit, eine kleinere Solaranlage mit Erweiterungsoption, keine Kantinenumstellung in diesem Jahr, und das Reparaturbudget beantragen wir im nächsten Haushalt erneut.",
            criteria: [
              "Kendi konumu gerekçelendirildi mi ve somut bir veri kullanıldı mı?",
              "Karşı tarafın itirazı gerçekten ele alındı mı?",
              "Öncelik belirlenirken neyin elendiği ve nedeni söylendi mi?",
              "Özet eksiksiz mi ve konuşmada varılan şeyi yansıtıyor mu?",
              "Tartışma dili kullanıldı mı? (Ihr Einwand trifft zu, deshalb schlage ich vor, wir hätten uns geeinigt auf)",
            ],
          },
        },
      ],
    },
  ],
};
