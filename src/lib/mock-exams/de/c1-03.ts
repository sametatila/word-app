import type { MockPaper } from "../types";

/**
 * C1 · Deneme 3 — "Vertrauen und Institutionen".
 *
 * PLAN kâğıt 1 ve 2 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde
 *     Teil 1 10  özet boşlukları — anlamı yeniden kurmak (gist)
 *     Teil 2 10  dört şıklı seçme — tutum ve çıkarım (opinion)
 *     Teil 3  5  boşluklu seçme — bağlayıcı ve yapı (structure)
 *   Hören  40 dk · 25 madde
 *     Teil 1 10  not tutma, bir kez (detail)
 *     Teil 2 15  üç şıklı seçme, tartışma (gist)
 *   Schreiben 80 dk  200 kelimelik yazı + 10 boşluklu resmî yazı
 *   Sprechen  15 dk  sunum + karşılıklı tartışma
 *
 * KONU SEÇİMİ: güven, C1'in ölçtüğü şeyi doğal olarak zorluyor — bir metnin
 * kabul ettiği ile savunduğu arasındaki farkı görmek. Metin kontrolü
 * savunuyor ve aynı anda kontrolün kendi ürettiği zararı kabul ediyor;
 * maddelerin çoğu bu iki katmanı ayırt etmeyi gerektiriyor.
 */
export const C1_03: MockPaper = {
  id: "de-c1-03",
  course: "de",
  level: "C1",
  no: 3,
  theme: "Vertrauen und Institutionen",
  themeTr: "Güven ve kurumlar",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben: eine Zusammenfassung ergänzen, einen längeren Text auswerten und Lücken in einem Zeitschriftentext füllen.",
      instructionTr:
        "Bu bölümde üç görev var: bir özeti tamamlamak, uzun bir metni değerlendirmek ve bir dergi metnindeki boşlukları doldurmak.",
      tasks: [
        {
          id: "de-c1-03-l1",
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
              title: "Vertrauen — die unterschätzte Infrastruktur",
              body: `Wer über die Funktionsfähigkeit moderner Gesellschaften spricht, nennt gewöhnlich Straßen, Netze und Behörden. Seltener fällt der Begriff, ohne den all das nicht arbeitet: Vertrauen. Gemeint ist damit nicht ein Gefühl, sondern eine Erwartung — die Annahme nämlich, dass sich andere auch dann an Regeln halten, wenn niemand hinsieht.

Der ökonomische Wert dieser Erwartung lässt sich beziffern. Wo sie fehlt, muss jede Zusage abgesichert werden: durch Verträge, Bürgschaften, Kontrollen. Untersuchungen zu Bauvorhaben in mehreren Ländern kommen auf einen Aufschlag von bis zu einem Fünftel, der allein auf Absicherung entfällt und keinerlei Bauleistung entspricht.

Anders als es die verbreitete Rede vom Vertrauensverlust nahelegt, ist Vertrauen keine Größe, die gleichmäßig steigt oder fällt. Die Erhebungen der letzten drei Jahrzehnte zeigen ein feineres Bild: Das Vertrauen in Institutionen, mit denen Menschen unmittelbar zu tun haben — Feuerwehr, Hausarzt, örtliche Verwaltung —, ist bemerkenswert stabil geblieben. Deutlich gefallen ist es dort, wo eigene Erfahrung fehlt und die Berichterstattung an ihre Stelle tritt.

Daraus folgt eine Schwierigkeit, die in der Debatte selten benannt wird. Wer Vertrauen zurückgewinnen will, kann nicht auf der Ebene ansetzen, auf der es verloren geht. Kampagnen erreichen jene, die ohnehin zuhören; die Erfahrung dagegen, die Vertrauen tatsächlich herstellt, entsteht im Kleinen und ist nicht beliebig zu vervielfältigen.

Ein zweiter Befund irritiert die gängige Erwartung. Vertrauen wächst nicht in erster Linie durch Erfolg, sondern durch den nachvollziehbaren Umgang mit Misserfolg. Eine Behörde, die einen Fehler früh einräumt und die Korrektur belegt, steht in den folgenden Erhebungen besser da als eine, der kein Fehler nachgewiesen wurde. Der Grund liegt auf der Hand: Fehlerfreiheit ist nicht überprüfbar, der Umgang mit Fehlern schon.

Kritisch wird es, wenn Vertrauen durch Kontrolle ersetzt werden soll. Kontrollen sind unverzichtbar, doch sie haben eine Eigenschaft, die ihre Befürworter selten mitdenken: Sie signalisieren Misstrauen und erzeugen es damit teilweise selbst. In der Pflegeforschung ist dieser Zusammenhang gut belegt; Einrichtungen mit besonders dichter Dokumentationspflicht weisen nicht die geringste, sondern eine mittlere Fehlerquote auf, weil die Zeit für Dokumentation der Zeit am Menschen abgeht.

Zu warnen ist gleichwohl vor der umgekehrten Vereinfachung. Vertrauen ist kein Ersatz für Rechenschaft, und wo es ohne Nachweis eingefordert wird, verwandelt es sich in Gutgläubigkeit. Die tragfähige Ordnung liegt zwischen beidem: überprüfbare Verfahren, die nicht jeden Schritt überwachen, sondern die Möglichkeit der Überprüfung offenhalten.

Für die Praxis heißt das dreierlei. Erstens: Wer Vertrauen will, muss Fehler sichtbar machen dürfen, ohne dafür bestraft zu werden. Zweitens: Nähe schlägt Kommunikation; eine erreichbare Ansprechperson wirkt stärker als jede Broschüre. Drittens: Vertrauen ist teuer im Aufbau und billig im Erhalt — genau umgekehrt, als es in den meisten Haushaltsplänen abgebildet wird.`,
              gloss: [
                { de: "die Bürgschaft", tr: "kefalet", en: "guarantee, surety" },
                { de: "der Aufschlag", tr: "ek maliyet, zam", en: "surcharge" },
                { de: "die Rechenschaft", tr: "hesap verme", en: "accountability" },
                { de: "die Gutgläubigkeit", tr: "saflık, körü körüne güven", en: "credulity" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              title: "Zusammenfassung mit Lücken",
              body: `Vertrauen bezeichnet kein Gefühl, sondern eine {{1}}: die Annahme, dass sich andere auch ohne Aufsicht an Regeln halten. Sein wirtschaftlicher Wert zeigt sich dort, wo er fehlt, denn jede Zusage muss dann {{2}} werden. Bei Bauvorhaben entfällt dadurch bis zu ein {{3}} der Kosten auf Absicherung.

Entgegen der verbreiteten Rede fällt Vertrauen nicht {{4}}. Stabil geblieben ist es gegenüber Institutionen, mit denen Menschen eigene {{5}} haben; gefallen ist es dort, wo an deren Stelle die {{6}} tritt.

Vertrauen entsteht weniger durch Erfolg als durch den nachvollziehbaren Umgang mit {{7}}. Der Grund liegt darin, dass sich Fehlerfreiheit nicht {{8}} lässt.

Kontrollen sind nötig, erzeugen aber teilweise selbst {{9}}. Umgekehrt wird Vertrauen, das ohne Nachweis eingefordert wird, zur {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-03-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Erwartung", "Annahme"],
              explain:
                "Metin tanımı iki kez veriyor: \"nicht ein Gefühl, sondern eine Erwartung\". Özet aynı karşıtlığı kurduğu için boşluğa bu sözcük giriyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["abgesichert", "gesichert", "kontrolliert"],
              explain:
                "\"Wo sie fehlt, muss jede Zusage abgesichert werden: durch Verträge, Bürgschaften, Kontrollen\" — boşluk bu edilgen yapının ortacını istiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Fünftel"],
              explain:
                "Metindeki oran \"ein Aufschlag von bis zu einem Fünftel\". Özet aynı payı adlandırıyor; yüzde 20 yazmak da aynı şeyi söyler ama istenen tek sözcük.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["gleichmäßig", "einheitlich", "überall", "durchgehend"],
              explain:
                "Metin \"keine Größe, die gleichmäßig steigt oder fällt\" diyor. Özetteki olumsuz cümle bu niteliği yineliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Erfahrung", "Erfahrungen", "Kontakte"],
              explain:
                "Sabit kalan güven, insanların \"unmittelbar zu tun haben\" olduğu kurumlara ait; metin bunu karşıt paragrafta \"eigene Erfahrung\" diye adlandırıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Berichterstattung", "Presse"],
              explain:
                "Metinde deneyimin yerini alan şey açıkça veriliyor: \"wo eigene Erfahrung fehlt und die Berichterstattung an ihre Stelle tritt\".",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["Misserfolg", "Fehlern", "Misserfolgen"],
              explain:
                "İkinci bulgu: güven başarıdan değil, \"dem nachvollziehbaren Umgang mit Misserfolg\" ile büyüyor. Özet aynı yapıyı kullanıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["überprüfen", "prüfen", "nachweisen", "belegen", "kontrollieren"],
              explain:
                "Gerekçe metinde: \"Fehlerfreiheit ist nicht überprüfbar, der Umgang mit Fehlern schon\". Özet bunu `lassen` yapısına çeviriyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Misstrauen", "Zweifel"],
              explain:
                "Kontrollerin yan etkisi metinde adlandırılıyor: \"Sie signalisieren Misstrauen und erzeugen es damit teilweise selbst\".",
            },
            {
              kind: "gap",
              id: "de-c1-03-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Gutgläubigkeit", "Naivität", "Leichtgläubigkeit"],
              explain:
                "Ters yöndeki basitleştirme için metin bir ad veriyor: nakit karşılığı olmadan istenen güven \"verwandelt es sich in Gutgläubigkeit\".",
            },
          ],
        },
        {
          id: "de-c1-03-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Text und die Aufgaben 11 bis 20. Wählen Sie: a, b, c oder d.",
          promptTr: "Metni ve 11–20. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Reportage",
              genreTr: "Röportaj-inceleme",
              title: "Wenn Fachleute beraten",
              body: `Im Frühjahr 2021 saß Katrin Roeder zum ersten Mal in einem Raum, in dem über Dinge entschieden wurde, von denen sie mehr verstand als alle Anwesenden zusammen. Die Hydrologin war als Sachverständige geladen, um ein Bebauungsgebiet zu bewerten, das an einem Nebenfluss liegt. Ihre Stellungnahme umfasste vierzehn Seiten und endete mit einer Empfehlung, von der Bebauung abzusehen.

Gebaut wurde trotzdem. Das ist, anders als die Erzählung von der ignorierten Wissenschaft nahelegt, weder überraschend noch für sich genommen ein Skandal. Beratung ersetzt keine Abwägung; sie liefert eine von mehreren Größen, die in eine politische Entscheidung eingehen. Aufschlussreich ist deshalb nicht, dass Roeders Empfehlung überstimmt wurde, sondern wie.

In der Sitzungsniederschrift erscheint ihr Gutachten in einem einzigen Satz. Er lautet, es lägen "unterschiedliche fachliche Einschätzungen" vor. Eine zweite Einschätzung gab es tatsächlich; sie stammte von einem Ingenieurbüro, das im Auftrag des Investors gearbeitet hatte und dessen Bericht acht Seiten umfasste. Beide Papiere erscheinen im Protokoll als gleichwertig. Wer die Niederschrift Jahre später liest, kann nicht mehr erkennen, dass die eine Seite unabhängig war und die andere nicht.

Genau hier liegt nach Ansicht von Beobachtern der wunde Punkt. Fachliche Beratung wird selten offen abgelehnt; sie wird eingeebnet. Die Formel von den unterschiedlichen Einschätzungen erlaubt es, eine Empfehlung folgenlos zu lassen, ohne ihr zu widersprechen — und sie hat den zusätzlichen Vorzug, niemanden angreifbar zu machen.

Roeder selbst formuliert es zurückhaltender. Sie habe nicht erwartet, recht zu bekommen, sagt sie, sondern gehört zu werden. Der Unterschied klinge klein, sei aber entscheidend: "Ich brauche keine Zustimmung. Ich brauche eine Begründung, warum man anders entschieden hat. Die habe ich nie bekommen."

Wie häufig solche Fälle sind, ist schwer zu sagen. Eine Auswertung von 340 Verfahren in vier Bundesländern kommt zu dem Ergebnis, dass in knapp einem Drittel der Fälle mindestens ein Gutachten vorlag, dessen Empfehlung von der Entscheidung abwich. In der Hälfte dieser Fälle findet sich in den Unterlagen keine Begründung für die Abweichung. Rechtlich ist das in den meisten Verfahren nicht zu beanstanden; eine Begründungspflicht besteht nur dort, wo das Gutachten gesetzlich vorgeschrieben war.

Bemerkenswert ist, wie unterschiedlich die Betroffenen darauf reagieren. Ein Teil zieht sich zurück; in einer Befragung unter 900 Sachverständigen gab jeder Fünfte an, Anfragen inzwischen abzulehnen, weil die Arbeit folgenlos bleibe. Ein anderer Teil ändert die Form: kürzere Gutachten, klarere Empfehlungen, weniger Vorbehalte. Fachlich ist das nicht unbedenklich, denn Vorbehalte gehören zur Sache. Wer sie streicht, um gehört zu werden, verschiebt die Ungenauigkeit von der Politik in die Wissenschaft.

Vorschläge zur Abhilfe gibt es reichlich, und sie ähneln einander. Die meisten laufen auf eine Begründungspflicht hinaus: Wer von einer fachlichen Empfehlung abweicht, soll dies schriftlich und nachvollziehbar tun. Der Einwand dagegen ist ernst zu nehmen — eine solche Pflicht verlagert Macht zu denen, die Gutachten schreiben, und diese sind niemandem gewählt. Roeder teilt diesen Einwand ausdrücklich. Ihr Gegenvorschlag ist bescheidener und vermutlich wirksamer: Man solle im Protokoll vermerken, wer ein Gutachten bezahlt hat. Mehr nicht.

Ob das genügt, ist offen. Sicher ist nur, dass die Bebauung inzwischen steht. Beim Hochwasser im vergangenen Sommer blieb sie trocken; der Pegel erreichte die Marke nicht, die Roeder in ihrer Stellungnahme als kritisch bezeichnet hatte. Sie selbst hält das für keinen Beleg. "Ein Gutachten ist keine Wette", sagt sie. "Dass etwas gut ausgeht, heißt nicht, dass die Entscheidung gut war."`,
              gloss: [
                { de: "die Sitzungsniederschrift", tr: "toplantı tutanağı", en: "minutes of a meeting" },
                { de: "einebnen", tr: "düzleştirmek, aradaki farkı silmek", en: "to level out" },
                { de: "der Vorbehalt", tr: "çekince", en: "reservation, caveat" },
                { de: "beanstanden", tr: "itiraz etmek, kusur bulmak", en: "to object to" },
                { de: "der Pegel", tr: "su seviyesi", en: "water level" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-03-l2-11",
              no: 11,
              ref: "t2",
              text: "Wie bewertet der Text die Tatsache, dass trotz Roeders Empfehlung gebaut wurde?",
              options: [
                "Als klaren Verstoß gegen geltendes Recht.",
                "Als für sich genommen unproblematisch.",
                "Als Beleg für die Schwäche der Hydrologie.",
                "Als Folge mangelnder Fachkenntnis im Gremium.",
              ],
              answer: 1,
              explain:
                "Metin bunu \"weder überraschend noch für sich genommen ein Skandal\" diye niteliyor: danışmanlık tartıp karar vermenin yerine geçmez. Eleştirisi kararın kendisine değil, biçimine.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-12",
              no: 12,
              ref: "t2",
              text: "Worin liegt nach dem Text das eigentliche Problem des Protokollsatzes?",
              options: [
                "Er nennt die Zahl der Gutachten nicht.",
                "Er gibt Roeders Empfehlung inhaltlich falsch wieder.",
                "Er lässt den Unterschied in der Unabhängigkeit verschwinden.",
                "Er wurde erst nachträglich in die Unterlagen aufgenommen.",
              ],
              answer: 2,
              explain:
                "Tutanak iki raporu eşdeğer gösteriyor; metnin vurgusu şu: yıllar sonra okuyan \"kann nicht mehr erkennen, dass die eine Seite unabhängig war und die andere nicht\".",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-13",
              no: 13,
              ref: "t2",
              text: "Was meint der Text mit dem Ausdruck \"eingeebnet\"?",
              options: [
                "Beratung wird zu einer Meinung unter mehreren gemacht.",
                "Beratung wird aus den Unterlagen vollständig entfernt.",
                "Beratung wird auf wenige Seiten gekürzt.",
                "Beratung wird an ein anderes Gremium weitergereicht.",
              ],
              answer: 0,
              explain:
                "Açık ret yerine eşitleme: \"unterschiedliche fachliche Einschätzungen\" formülü, bir öneriyi çürütmeden etkisiz bırakıyor. Sayfa sayısı ayrı bir ayrıntı, tanım değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-14",
              no: 14,
              ref: "t2",
              text: "Welchen zusätzlichen Vorteil hat diese Formel laut Text?",
              options: [
                "Sie verkürzt die Dauer der Sitzungen erheblich.",
                "Sie erfüllt eine gesetzliche Formvorschrift.",
                "Sie erleichtert die spätere gerichtliche Prüfung.",
                "Sie schützt die Beteiligten vor Angreifbarkeit.",
              ],
              answer: 3,
              explain:
                "Metin ek üstünlüğü açıkça sayıyor: formül \"hat den zusätzlichen Vorzug, niemanden angreifbar zu machen\". Hukuki denetimi ise tam tersine zorlaştırıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-15",
              no: 15,
              ref: "t2",
              text: "Was unterscheidet Roeders Anspruch von dem, was ihr unterstellt werden könnte?",
              options: [
                "Sie will beteiligt, nicht nur informiert werden.",
                "Sie will entschädigt, nicht nur beauftragt werden.",
                "Sie will eine Begründung, nicht Zustimmung.",
                "Sie will ihre Stellungnahme veröffentlicht sehen.",
              ],
              answer: 2,
              explain:
                "Kendi cümlesi ayrımı kuruyor: \"Ich brauche keine Zustimmung. Ich brauche eine Begründung, warum man anders entschieden hat.\" Haklı çıkmak değil, gerekçe görmek istiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-16",
              no: 16,
              ref: "t2",
              text: "Was besagt die Auswertung der 340 Verfahren?",
              options: [
                "In den meisten Verfahren fehlte ein Gutachten vollständig.",
                "In rund einem Drittel wich die Entscheidung von einem Gutachten ab.",
                "In der Hälfte der Verfahren war die Abweichung rechtswidrig.",
                "In vier Bundesländern besteht inzwischen eine Begründungspflicht.",
              ],
              answer: 1,
              explain:
                "Sayı metinde: \"in knapp einem Drittel der Fälle\" karar bir bilirkişi görüşünden ayrılıyor. Gerekçesizlik bu vakaların yarısında; hukuka aykırılık ise metne göre çoğunlukla söz konusu değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-17",
              no: 17,
              ref: "t2",
              text: "Wie beurteilt der Text die zweite Reaktionsform der Sachverständigen?",
              options: [
                "Als fachlich bedenklich, weil Vorbehalte wegfallen.",
                "Als sinnvolle Anpassung an die Praxis.",
                "Als wirkungslos, weil kürzere Gutachten seltener gelesen werden.",
                "Als vorübergehende Erscheinung ohne Bedeutung.",
              ],
              answer: 0,
              explain:
                "Metin kısaltmayı \"nicht unbedenklich\" buluyor, çünkü çekinceler işin parçası: bunları silen kişi \"verschiebt die Ungenauigkeit von der Politik in die Wissenschaft\".",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-18",
              no: 18,
              ref: "t2",
              text: "Welcher Einwand wird gegen eine Begründungspflicht erhoben?",
              options: [
                "Sie würde Verfahren unbezahlbar machen.",
                "Sie ließe sich in der Praxis nicht überprüfen.",
                "Sie stärkte Personen, die nicht gewählt sind.",
                "Sie widerspräche der Unabhängigkeit der Gutachten.",
              ],
              answer: 2,
              explain:
                "İtiraz yetki devri üzerine: böyle bir yükümlülük \"verlagert Macht zu denen, die Gutachten schreiben, und diese sind niemandem gewählt\". Maliyet ve denetlenebilirlik gerekçe olarak geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-19",
              no: 19,
              ref: "t2",
              text: "Wie verhält sich Roeder zu diesem Einwand?",
              options: [
                "Sie weist ihn als interessengeleitet zurück.",
                "Sie geht auf ihn nicht ein.",
                "Sie hält ihn für zweitrangig gegenüber dem Nutzen.",
                "Sie teilt ihn und schlägt etwas Geringeres vor.",
              ],
              answer: 3,
              explain:
                "Metin \"Roeder teilt diesen Einwand ausdrücklich\" diyor ve karşı önerisini veriyor: tutanağa yalnız bilirkişiyi kimin ödediğinin yazılması — \"Mehr nicht\".",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l2-20",
              no: 20,
              ref: "t2",
              text: "Warum sieht Roeder im trockenen Verlauf des Hochwassers keinen Beleg?",
              options: [
                "Weil der Pegel nur knapp unter der kritischen Marke blieb.",
                "Weil ein guter Ausgang die Entscheidung nicht rechtfertigt.",
                "Weil die Messwerte des Sommers unzuverlässig waren.",
                "Weil das nächste Hochwasser höher ausfallen wird.",
              ],
              answer: 1,
              explain:
                "Son sözü ayrımı kuruyor: \"Ein Gutachten ist keine Wette. Dass etwas gut ausgeht, heißt nicht, dass die Entscheidung gut war.\" Yani sonuç, karar kalitesinin ölçüsü değil.",
            },
          ],
        },
        {
          id: "de-c1-03-l3",
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
              title: "Die Wiederentdeckung des Schalters",
              body: `Nach zwei Jahrzehnten, in denen der Weg zur Behörde konsequent ins Netz verlegt wurde, öffnen mehrere Kommunen ihre Schalter wieder — {{21}} sie die digitalen Verfahren keineswegs zurücknehmen.

Die Begründung fällt bemerkenswert nüchtern aus. Man habe festgestellt, dass ein erheblicher Teil der Anträge online begonnen und {{22}} abgebrochen werde, in der Regel an derselben Stelle: dort, wo ein Nachweis hochzuladen ist, den die Antragstellenden nicht besitzen oder nicht als Datei vorliegen haben.

Aufschlussreich ist, wen dieser Abbruch trifft. Es sind nicht vorrangig ältere Menschen, wie lange vermutet wurde, {{23}} Personen mit unklarer Aktenlage — nach Umzügen, Trennungen, Wechseln zwischen Ländern. Für sie ersetzt kein Formular das Gespräch, weil ihre Situation nicht in die vorgesehenen Felder passt.

Die Kommunen ziehen daraus eine Konsequenz, die dem Zeitgeist widerspricht und ihn zugleich ernst nimmt: Der Schalter wird nicht als Rückfallebene für Unwillige geführt, {{24}} als eigenständiger Weg für komplizierte Fälle. Entsprechend hat sich das Personal verändert; gesucht werden Leute, die entscheiden dürfen, nicht solche, die weiterleiten.

Ob sich das rechnet, hängt davon ab, was gerechnet wird. Pro Vorgang ist der Schalter teurer, {{25}} über den gesamten Verlauf gerechnet oft günstiger, weil abgebrochene Anträge mehrfach neu bearbeitet werden müssen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-03-l3-21",
              no: 21,
              text: "Lücke 21",
              options: ["obgleich", "sofern", "indem", "damit"],
              answer: 0,
              explain:
                "Cümle bir karşıtlık kuruyor: gişeler yeniden açılıyor, ama dijital yollar geri alınmıyor. `obgleich` bu ödünü verir; `sofern` koşul, `indem` araç, `damit` amaç bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l3-22",
              no: 22,
              text: "Lücke 22",
              options: ["ohnehin", "beiläufig", "später", "vorsorglich"],
              answer: 2,
              explain:
                "Boşluk bir zaman sırası istiyor: başvuru çevrimiçi başlıyor ve sonra yarıda kesiliyor. Ötekiler derece ya da niyet belirtir ve \"begonnen\" ile kurulan sıraya oturmaz.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l3-23",
              no: 23,
              text: "Lücke 23",
              options: ["zumal", "sondern", "vielmehr", "geschweige denn"],
              answer: 1,
              explain:
                "Önce olumsuzlanan bir varsayım var (\"nicht vorrangig ältere Menschen\"), sonra düzeltme geliyor. Bu yapı `nicht … sondern` ister; `vielmehr` tek başına bağlaç işlevi görmez.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l3-24",
              no: 24,
              text: "Lücke 24",
              options: ["hingegen", "insofern", "gleichwohl", "sondern"],
              answer: 3,
              explain:
                "Yine `nicht … sondern` kalıbı: gişe geri çekilme düzlemi olarak değil, kendi başına bir yol olarak yürütülüyor. Ötekiler karşıtlığı bir sonraki cümleye taşır, aynı cümle içinde bağlamaz.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-l3-25",
              no: 25,
              text: "Lücke 25",
              options: ["mithin", "folglich", "insgesamt jedoch", "zumindest"],
              answer: 2,
              explain:
                "İşlem başına pahalı, ama bütünde ucuz: karşıtlık ve kapsam değişimi birlikte gerekiyor. `mithin` ve `folglich` sonuç bildirir, `zumindest` sınırlama koyar.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat zwei Aufgaben: Notizen ergänzen und eine Diskussion auswerten.",
      instructionTr: "Bu bölümde iki görev var: not tamamlamak ve bir tartışmayı değerlendirmek.",
      tasks: [
        {
          id: "de-c1-03-h1",
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
              title: "Das Bürgerbudget — Informationsabend",
              situation: "Bir belediye çalışanı katılımcı bütçeyi anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Robert Halbach, ich leite die Stabsstelle Beteiligung, und ich stelle Ihnen heute das Bürgerbudget vor. Ich brauche etwa zwanzig Minuten; Fragen sammeln wir danach.",
                },
                {
                  text: "Zunächst zur Größenordnung. Der Rat hat für das kommende Jahr 400 000 Euro bereitgestellt. Das klingt nach viel und ist es nicht: Es entspricht knapp einem Promille des Haushalts. Wir sagen das offen, weil überzogene Erwartungen die häufigste Ursache für Enttäuschung sind.",
                },
                {
                  text: "Vorschlagsberechtigt sind alle Personen ab vierzehn Jahren, die hier wohnen. Die Staatsangehörigkeit spielt ausdrücklich keine Rolle; das war im Rat umstritten und ist jetzt so beschlossen. Beschäftigte der Stadtverwaltung dürfen ebenfalls Vorschläge einreichen, allerdings nicht für den eigenen Fachbereich.",
                },
                {
                  text: "Was kann vorgeschlagen werden? Investitionen in öffentlichen Raum, also Bänke, Wege, Spielgeräte, Beleuchtung. Was nicht geht, sind laufende Kosten. Ein Vorschlag, der eine dauerhafte Stelle schafft, ist damit ausgeschlossen — das war im ersten Durchgang die häufigste Ablehnung.",
                },
                {
                  text: "Zur Obergrenze: Ein einzelner Vorschlag darf höchstens 40 000 Euro kosten. Wir haben diese Grenze bewusst niedrig angesetzt, damit nicht ein einziges Projekt das gesamte Budget bindet.",
                },
                {
                  text: "Der Ablauf hat vier Stufen. Erstens die Einreichung bis zum fünfzehnten März. Zweitens die Prüfung durch die Verwaltung, ausschließlich auf Zulässigkeit und Kosten, nicht auf Sinnhaftigkeit. Drittens die Abstimmung im Mai, online und an drei Stellen im Stadtgebiet auf Papier. Viertens die Umsetzung im Folgejahr.",
                },
                {
                  text: "Ein Punkt, der oft übersehen wird: Jede Person hat fünf Stimmen, darf aber höchstens zwei davon auf denselben Vorschlag legen. Das verhindert, dass gut organisierte Gruppen alles auf ein Projekt bündeln.",
                },
                {
                  text: "Zur Verbindlichkeit. Die Ergebnisse sind für die Verwaltung bindend, für den Rat rechtlich nicht — der Rat hat sich jedoch selbst verpflichtet, eine Ablehnung öffentlich zu begründen. Im ersten Durchgang ist das einmal vorgekommen, bei einer Fußgängerbrücke, deren Kosten nach der Abstimmung um das Dreifache gestiegen waren.",
                },
                {
                  text: "Und schließlich zur Transparenz: Alle eingereichten Vorschläge bleiben dauerhaft einsehbar, auch die abgelehnten, samt Begründung. Das war die wichtigste Lehre aus dem ersten Jahr, denn die Kritik richtete sich damals fast nie gegen die Auswahl, sondern gegen deren Unsichtbarkeit.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizzettel",
              genreTr: "Not kâğıdı",
              title: "Notizen — Bürgerbudget",
              body: `Summe: 400 000 Euro = knapp {{1}} des Haushalts.

Vorschlagsberechtigt: ab {{2}}, Wohnsitz in der Stadt.
Staatsangehörigkeit: {{3}}.
Stadtbeschäftigte: erlaubt, aber nicht für {{4}}.

Möglich: Investitionen. NICHT möglich: {{5}}.
Obergrenze je Vorschlag: {{6}}.

Ablauf: Einreichung bis {{7}} → Prüfung nur auf Zulässigkeit und Kosten →
Abstimmung im Mai → Umsetzung {{8}}.

Stimmen: fünf pro Person, höchstens {{9}} auf denselben Vorschlag.

Abgelehnte Vorschläge bleiben {{10}} — wichtigste Lehre aus dem ersten Jahr.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-03-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["ein Promille", "Promille", "1 Promille", "einem Promille"],
              explain:
                "Konuşmacı büyüklüğü ölçekliyor: \"Es entspricht knapp einem Promille des Haushalts\". 400 000 rakamı not kâğıdında zaten yazılı.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["14 Jahren", "vierzehn Jahren", "14", "vierzehn"],
              explain:
                "Yaş sınırı açıkça veriliyor: \"alle Personen ab vierzehn Jahren, die hier wohnen\". İkinci koşul olan ikametgâh notta zaten yazılı.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["spielt keine Rolle", "keine Rolle", "egal", "unerheblich", "irrelevant"],
              explain:
                "\"Die Staatsangehörigkeit spielt ausdrücklich keine Rolle\" — üstelik bunun mecliste tartışıldığı da ekleniyor, yani bilinçli bir karar.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["den eigenen Fachbereich", "eigenen Fachbereich", "ihren Fachbereich", "den eigenen Bereich"],
              explain:
                "Belediye çalışanları öneri verebiliyor, tek sınır: \"allerdings nicht für den eigenen Fachbereich\".",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["laufende Kosten", "Personalkosten", "dauerhafte Stellen", "laufende Ausgaben"],
              explain:
                "Yatırım kabul ediliyor, \"Was nicht geht, sind laufende Kosten\". Kalıcı kadro yaratan öneri bu yüzden ilk turda en sık reddedilen tür olmuş.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["40 000 Euro", "40000 Euro", "vierzigtausend Euro"],
              explain:
                "Öneri başına üst sınır 40 000 euro; gerekçesi de veriliyor: tek bir proje bütün bütçeyi bağlamasın.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["15. März", "15.3.", "fünfzehnten März", "dem 15. März"],
              explain:
                "Dört aşamanın ilki: \"die Einreichung bis zum fünfzehnten März\". Mayıs oylamanın ayı, teslimin değil.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["im Folgejahr", "Folgejahr", "im nächsten Jahr", "nächstes Jahr"],
              explain:
                "Dördüncü aşama uygulama ve \"im Folgejahr\" gerçekleşiyor — yani oylamayla aynı yıl değil.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["zwei", "2", "zwei Stimmen", "2 Stimmen"],
              explain:
                "Kural kayıtta: \"höchstens zwei davon auf denselben Vorschlag legen\". Gerekçesi de veriliyor — örgütlü grupların oyları tek projede toplaması engelleniyor.",
            },
            {
              kind: "gap",
              id: "de-c1-03-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["einsehbar", "dauerhaft einsehbar", "öffentlich einsehbar", "sichtbar"],
              explain:
                "Reddedilenler dahil bütün öneriler gerekçesiyle birlikte \"dauerhaft einsehbar\" kalıyor; ilk yılın eleştirisi seçime değil görünmezliğine yönelikmiş.",
            },
          ],
        },
        {
          id: "de-c1-03-h2",
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
              situation: "Üç konuk kurumlara duyulan güveni tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Wir sprechen heute über Vertrauen in Institutionen. Frau Brandes, Sie forschen dazu. Beginnen wir mit der Diagnose: Erleben wir einen allgemeinen Vertrauensverlust?",
                },
                {
                  speaker: "Frau Brandes",
                  text: "Nein, und ich sage das mit einiger Sicherheit. Was wir sehen, ist eine Spreizung. Das Vertrauen in nahe Institutionen ist über zwanzig Jahre nahezu unverändert. Gefallen ist es dort, wo die Menschen keine eigene Erfahrung machen. Wer von einem allgemeinen Verlust spricht, mittelt zwei gegenläufige Bewegungen zu einer Zahl.",
                },
                { speaker: "Moderatorin", text: "Herr Kessler, Sie leiten ein Bürgeramt. Deckt sich das mit Ihrem Alltag?" },
                {
                  speaker: "Herr Kessler",
                  text: "Weitgehend ja, mit einer Einschränkung. Die Menschen kommen zu uns mit Erwartungen, die aus einer anderen Sphäre stammen. Wenn im Fernsehen über eine Behörde berichtet wird, die versagt hat, spüre ich das drei Tage später am Schalter — obwohl es nicht meine Behörde war und nicht mein Vorgang.",
                },
                { speaker: "Moderatorin", text: "Herr Dr. Ohm, Sie waren lange Journalist. Ist die Berichterstattung schuld?" },
                {
                  speaker: "Herr Dr. Ohm",
                  text: "Diese Frage ist mir zu bequem. Natürlich berichten wir über Ausnahmen, das ist unser Handwerk; niemand meldet die vier Millionen Vorgänge, die funktioniert haben. Aber die Vorstellung, das Publikum übernehme ungeprüft, was wir schreiben, unterschätzt es gewaltig. Vertrauen bricht dort weg, wo Menschen etwas erleben, das dem Bericht ähnelt.",
                },
                {
                  speaker: "Frau Brandes",
                  text: "Diesem Punkt stimme ich zu, und er ist empirisch gestützt. Ein einzelner negativer Bericht bewegt wenig. Ein Bericht, der eine eigene Erfahrung bestätigt, verschiebt Einstellungen stark und dauerhaft.",
                },
                { speaker: "Moderatorin", text: "Herr Kessler, was folgt daraus für Ihre Arbeit?" },
                {
                  speaker: "Herr Kessler",
                  text: "Dass die entscheidende Größe die Erreichbarkeit ist, nicht die Freundlichkeit. Wir haben vor drei Jahren die Rückrufzeit von fünf Tagen auf einen gesenkt und sonst nichts geändert. Die Zufriedenheitswerte sind um elf Punkte gestiegen. Das war keine Kommunikationsmaßnahme, das war Personalplanung.",
                },
                {
                  speaker: "Herr Dr. Ohm",
                  text: "Wobei ich davor warnen würde, daraus ein Rezept zu machen. Erreichbarkeit hilft dort, wo die Menschen im Grunde zufrieden sind. Wo eine Entscheidung als ungerecht gilt, verschärft schnelle Erreichbarkeit den Konflikt sogar, weil sie die Enttäuschung beschleunigt.",
                },
                {
                  speaker: "Frau Brandes",
                  text: "Das ist ein wichtiger Einwand, und er trifft einen blinden Fleck meiner eigenen Zunft. Wir messen Zufriedenheit und nennen es Vertrauen. Das ist nicht dasselbe. Vertrauen zeigt sich erst, wenn eine Entscheidung gegen einen ausfällt.",
                },
                { speaker: "Moderatorin", text: "Kommen wir zur Transparenz. Löst sie das Problem?" },
                {
                  speaker: "Herr Dr. Ohm",
                  text: "Sie ist notwendig und wird überschätzt. Wir haben in den letzten fünfzehn Jahren enorm viel offengelegt. Das Ergebnis ist nicht mehr Vertrauen, sondern mehr Material für beide Seiten. Wer misstraut, findet in offengelegten Daten stets etwas, das seinen Verdacht stützt.",
                },
                {
                  speaker: "Herr Kessler",
                  text: "Ich sehe das aus der Praxis anders — nicht grundsätzlich, aber in der Reihenfolge. Transparenz nützt wenig, solange sie unverständlich bleibt. Wir haben unsere Bescheide umgeschrieben, in kürzeren Sätzen, mit einem Absatz, der die Ablehnung begründet. Die Zahl der Widersprüche ist um ein Fünftel gesunken, obwohl wir keine einzige Entscheidung anders getroffen haben.",
                },
                {
                  speaker: "Frau Brandes",
                  text: "Das passt zu den Daten. Nachvollziehbarkeit wirkt stärker als Offenlegung. Ein Mensch, der versteht, warum er ein Nein bekommt, trägt es mit — auch wenn er es für falsch hält.",
                },
                { speaker: "Moderatorin", text: "Zum Schluss: eine Maßnahme, die Sie sofort umsetzen würden." },
                {
                  speaker: "Herr Kessler",
                  text: "Jeder Bescheid bekommt einen Namen und eine Durchwahl. Kostet nichts und ändert alles.",
                },
                {
                  speaker: "Frau Brandes",
                  text: "Ich würde die Erhebungen ändern. Solange wir das Falsche messen, beraten wir falsch. Das ist unspektakulär und wirkt erst in Jahren.",
                },
                {
                  speaker: "Herr Dr. Ohm",
                  text: "Und ich würde in Redaktionen verpflichtend nachverfolgen lassen, wie eine Geschichte ausgegangen ist. Wir berichten über den Vorwurf und fast nie über den Freispruch. Das ist unsere Baustelle, nicht die der Behörden.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-03-h2-11",
              no: 11,
              ref: "d1",
              text: "Wie beantwortet Frau Brandes die Eingangsfrage?",
              options: [
                "Sie bejaht sie mit Einschränkungen.",
                "Sie verneint sie und beschreibt eine Spreizung.",
                "Sie hält die Frage für nicht beantwortbar.",
              ],
              answer: 1,
              explain:
                "\"Nein, und ich sage das mit einiger Sicherheit\" — ardından iki zıt hareketi anlatıyor: yakın kurumlarda değişmeyen, uzak olanlarda düşen güven.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-12",
              no: 12,
              ref: "d1",
              text: "Was wirft sie der Rede vom allgemeinen Verlust vor?",
              options: [
                "Sie fasst Gegenläufiges in einem Wert zusammen.",
                "Sie stützt sich auf zu kleine und veraltete Stichproben.",
                "Sie verwechselt Ursache und Wirkung.",
              ],
              answer: 0,
              explain:
                "Eleştirisi yöntemsel: \"mittelt zwei gegenläufige Bewegungen zu einer Zahl\". Örneklem büyüklüğü ya da nedensellik bu bölümde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-13",
              no: 13,
              ref: "d1",
              text: "Welche Einschränkung macht Herr Kessler?",
              options: [
                "Die Erhebungen erfassen sein Amt nicht.",
                "Der Effekt zeigt sich bei ihm zeitversetzt.",
                "Erwartungen entstehen außerhalb seiner Behörde.",
              ],
              answer: 2,
              explain:
                "Bir başka kurum hakkındaki haberi \"drei Tage später am Schalter\" hissettiğini söylüyor — \"obwohl es nicht meine Behörde war\". Yani beklenti dışarıda oluşuyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-14",
              no: 14,
              ref: "d1",
              text: "Wie reagiert Herr Dr. Ohm auf die Schuldfrage an die Medien?",
              options: [
                "Er hält sie für zu einfach gestellt.",
                "Er weist jede Verantwortung zurück.",
                "Er stimmt ihr uneingeschränkt zu.",
              ],
              answer: 0,
              explain:
                "\"Diese Frage ist mir zu bequem\" diyor: istisnalar üzerine yazdıklarını kabul ediyor ama okurun sorgusuz devraldığı varsayımını reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-15",
              no: 15,
              ref: "d1",
              text: "Wann bricht Vertrauen nach ihm weg?",
              options: [
                "Wenn mehrere Berichte zusammenkommen.",
                "Wenn ein Bericht die eigene Erfahrung trifft.",
                "Wenn eine Behörde nicht reagiert.",
              ],
              answer: 1,
              explain:
                "Kendi formülü: \"Vertrauen bricht dort weg, wo Menschen etwas erleben, das dem Bericht ähnelt\". Frau Brandes bunu verilerle doğruluyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-16",
              no: 16,
              ref: "d1",
              text: "Was sagt Frau Brandes über einzelne negative Berichte?",
              options: [
                "Sie verändern Einstellungen kaum.",
                "Sie wirken vor allem bei jungen Menschen.",
                "Sie wirken stärker als wiederholte Berichte.",
              ],
              answer: 0,
              explain:
                "\"Ein einzelner negativer Bericht bewegt wenig\" diyor; asıl kalıcı kaymayı deneyimi doğrulayan haber yapıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-17",
              no: 17,
              ref: "d1",
              text: "Was hat Herr Kessler in seinem Amt geändert?",
              options: [
                "Die Öffnungszeiten am Wochenende.",
                "Die Zahl der Schalter im Erdgeschoss.",
                "Die Zeit bis zum Rückruf.",
              ],
              answer: 2,
              explain:
                "Tek değişiklik geri arama süresinin beş günden bire inmesi; memnuniyet 11 puan artmış ve bunu \"das war Personalplanung\" diye niteliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-18",
              no: 18,
              ref: "d1",
              text: "Wie ordnet er diese Maßnahme selbst ein?",
              options: [
                "Als Frage der Personalplanung.",
                "Als Erfolg besserer Kommunikation.",
                "Als Ergebnis neuer Technik.",
              ],
              answer: 0,
              explain:
                "Ayrımı bilerek yapıyor: \"Das war keine Kommunikationsmaßnahme, das war Personalplanung\". Yani mesele üslup değil, kaynak.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-19",
              no: 19,
              ref: "d1",
              text: "Welchen Vorbehalt meldet Herr Dr. Ohm dazu an?",
              options: [
                "Erreichbarkeit ist zu teuer für kleine Ämter.",
                "Erreichbarkeit kann Konflikte verschärfen.",
                "Erreichbarkeit wird von Bürgern kaum genutzt.",
              ],
              answer: 1,
              explain:
                "Adaletsiz görülen kararlarda hızlı ulaşılabilirlik \"weil sie die Enttäuschung beschleunigt\" ve çatışmayı büyütüyor. Maliyet ya da kullanım oranı gerekçe değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-20",
              no: 20,
              ref: "d1",
              text: "Welchen blinden Fleck räumt Frau Brandes ein?",
              options: [
                "Die Forschung misst Zufriedenheit statt Vertrauen.",
                "Die Forschung befragt zu wenige Behörden.",
                "Die Forschung ignoriert regionale Unterschiede.",
              ],
              answer: 0,
              explain:
                "\"Wir messen Zufriedenheit und nennen es Vertrauen. Das ist nicht dasselbe\" — güvenin ancak aleyhe bir kararda görüldüğünü ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie bewertet Herr Dr. Ohm Transparenz?",
              options: [
                "Als überflüssig, solange Vertrauen fehlt.",
                "Als notwendig, aber in ihrer Wirkung überschätzt.",
                "Als wirksamstes Mittel gegen Misstrauen.",
              ],
              answer: 1,
              explain:
                "\"Sie ist notwendig und wird überschätzt\" diyor: on beş yılda çok şey açıklanmış, sonuç daha çok güven değil her iki tarafa daha çok malzeme.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-22",
              no: 22,
              ref: "d1",
              text: "Worin besteht Herrn Kesslers Widerspruch?",
              options: [
                "Er hält Transparenz für schädlich.",
                "Er stellt die Verständlichkeit voran.",
                "Er hält Offenlegung für rechtlich unmöglich.",
              ],
              answer: 1,
              explain:
                "İtirazı ilkesel değil sıralamaya dair: \"Transparenz nützt wenig, solange sie unverständlich bleibt\". Bu yüzden kararları yeniden yazmışlar.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-23",
              no: 23,
              ref: "d1",
              text: "Was war das Ergebnis der umgeschriebenen Bescheide?",
              options: [
                "Ein Fünftel weniger Widersprüche.",
                "Ein Drittel mehr Anträge.",
                "Deutlich kürzere Bearbeitungszeiten.",
              ],
              answer: 0,
              explain:
                "İtirazlar beşte bir azalmış, üstelik \"obwohl wir keine einzige Entscheidung anders getroffen haben\". Değişen tek şey kararların anlatımı.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-24",
              no: 24,
              ref: "d1",
              text: "Was hält Frau Brandes für wirksamer als Offenlegung?",
              options: [
                "Beteiligung an der Entscheidung.",
                "Nachvollziehbarkeit der Entscheidung.",
                "Schnelligkeit der Entscheidung.",
              ],
              answer: 1,
              explain:
                "\"Nachvollziehbarkeit wirkt stärker als Offenlegung\" — hayır cevabının nedenini anlayan kişi, yanlış bulsa bile katlanıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-03-h2-25",
              no: 25,
              ref: "d1",
              text: "Welche Maßnahme nennt Herr Dr. Ohm zum Schluss?",
              options: [
                "Eine Durchwahl auf jedem Bescheid.",
                "Eine Änderung der Erhebungen.",
                "Die Nachverfolgung von Geschichten in Redaktionen.",
              ],
              answer: 2,
              explain:
                "Kendi alanına yöneliyor: haberlerin nasıl sonuçlandığının izlenmesi. \"Wir berichten über den Vorwurf und fast nie über den Freispruch\" diyor; öteki iki öneri Kessler ve Brandes'e ait.",
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
          id: "de-c1-03-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Eine Fachzeitschrift veröffentlicht eine Reihe mit dem Titel \"Vertrauen — worauf beruht es?\". Schreiben Sie einen Beitrag von etwa 200 Wörtern. Behandeln Sie alle fünf Leitpunkte und stellen Sie zwischen ihnen einen Zusammenhang her.",
          promptTr:
            "Bir meslek dergisi \"Güven — neye dayanır?\" başlıklı bir dizi yayımlıyor. Yaklaşık 200 kelimelik bir yazı yaz. Beş yönlendirme noktasının hepsini işle ve aralarında bağ kur.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Beschreiben Sie die Ausgangslage.", tr: "Çıkış durumunu betimle." },
              { de: "Nennen Sie zwei Ursachen für schwindendes Vertrauen.", tr: "Güvenin azalmasının iki nedenini söyle." },
              { de: "Stellen Sie die Lage in Ihrem Herkunftsland gegenüber.", tr: "Kendi ülkendeki durumla karşılaştır." },
              { de: "Wägen Sie Nutzen und Grenzen von Kontrolle ab.", tr: "Denetimin faydasını ve sınırlarını tart." },
              { de: "Formulieren Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuç yaz." },
            ],
            sample: `Wer heute vom Vertrauensverlust spricht, meint meist ein Gefühl und beschreibt damit eine Struktur. Denn Vertrauen ist keine Stimmung, sondern die Erwartung, dass Zusagen auch ohne Aufsicht eingehalten werden — und genau diese Erwartung wird gegenwärtig ungleich verteilt.

Zwei Ursachen lassen sich anführen. Zum einen ist die Zahl der Institutionen gewachsen, mit denen Menschen zu tun haben, ohne ihnen je persönlich zu begegnen; an die Stelle eigener Erfahrung tritt Berichterstattung, die notwendigerweise vom Ausnahmefall lebt. Zum anderen wird Verantwortung in arbeitsteiligen Verfahren so verteilt, dass am Ende niemand mehr erkennbar zuständig ist.

In meinem Herkunftsland liegt der Fall anders. Dort ist das Misstrauen gegenüber Behörden älter als jede Digitalisierung; verlässlich war traditionell die Familie, nicht das Amt. Wer von dort kommt, erlebt eine funktionierende Verwaltung nicht als Selbstverständlichkeit, sondern als eine Leistung, die man erklären und verteidigen muss.

Kontrolle ist gegen dieses Problem unentbehrlich und zugleich begrenzt. Sie deckt Verstöße auf, signalisiert aber Misstrauen und bindet Zeit, die andernorts fehlt. Wo sie das Gespräch ersetzt, erzeugt sie das Übel mit, das sie bekämpfen soll.

Daraus folgt für mich, dass nicht mehr Kontrolle nötig ist, sondern nachvollziehbare Begründung. Wer versteht, warum eine Entscheidung gegen ihn ausfällt, verliert nicht zwangsläufig das Vertrauen in das Verfahren.`,
            criteria: [
              "Beş yönlendirme noktasının hepsi işlendi mi? C1'de eksik nokta metni doğrudan alt basamağa düşürür.",
              "Noktalar arasında bağ kuruldu mu, yoksa beş ayrı paragraf mı yan yana duruyor?",
              "Karşılaştırma gerçek bir karşılaştırma mı (aynı ölçüt iki durumda)?",
              "Tartma iki yönlü mü ve her iki yön de gerekçelendirilmiş mi?",
              "Dil C1 düzeyinde mi: adlaştırma, `zum einen … zum anderen`, `andernfalls`, ölçülü ifade?",
              "Yaklaşık 200 kelime var mı?",
            ],
          },
        },
        {
          id: "de-c1-03-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an das Ordnungsamt. Der Entwurf unten ist zu umgangssprachlich. Ergänzen Sie die Lücken 1 bis 10 mit einer stilistisch angemessenen Wendung. Die Funktion jeder Lücke steht in Klammern.",
          promptTr:
            "Zabıta müdürlüğüne yazıyorsun. Aşağıdaki taslak fazla günlük dilde. 1–10. boşlukları üsluba uygun bir ifadeyle tamamla. Her boşluğun işlevi parantez içinde yazılı.",
          texts: [
            {
              kind: "text",
              id: "br1",
              genre: "Formelles Schreiben",
              genreTr: "Resmî yazı",
              title: "Widerspruch gegen einen Gebührenbescheid",
              body: `Sehr geehrte Damen und Herren,

gegen Ihren Gebührenbescheid vom 3. Mai, Aktenzeichen OA-2291/24, lege ich fristgerecht Widerspruch ein.

{{1}} hat der Bescheid eine Sondernutzung des Gehwegs für den Zeitraum vom 1. bis 14. April zugrunde gelegt. {{2}} fand die Nutzung ausschließlich am 12. und 13. April statt; die Baustelle war zuvor nicht eingerichtet.

{{3}} übersende ich Ihnen die Lieferscheine des Gerüstbauers sowie zwei datierte Fotografien.

{{4}} ist mir bewusst, dass die Anmeldung des Zeitraums in meiner Verantwortung lag und ich den Zeitraum zu großzügig angegeben habe. {{5}} betrifft die Gebühr nach Ziffer 4 der Satzung ausdrücklich die tatsächliche Nutzung.

{{6}}, die Gebühr auf zwei Tage neu zu berechnen und den überzahlten Betrag zu erstatten.

{{7}} diesem Antrag nicht entsprochen werden, bitte ich {{8}} eine schriftliche Begründung unter Angabe der herangezogenen Ziffer.

Über eine Antwort bis zum 30. Juni {{9}}, da die Frist für die weitere Prüfung sonst verstreicht.

{{10}}
Bianca Hoffmann`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-03-s2-1",
              no: 1,
              text: "Lücke 1 (Übergang zur Begründung)",
              accept: ["Zur Begründung", "Zur Erläuterung", "Im Einzelnen", "Zur Sache"],
              explain:
                "Gerekçe bölümü resmî yazıda kendi geçişiyle açılır. `Zur Begründung` ya da `Im Einzelnen` okura yapının neresinde olduğunu söyler; `Weil` ile başlamak kaydı düşürür.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-2",
              no: 2,
              text: "Lücke 2 (Gegensatz zur Annahme des Bescheids)",
              accept: ["Tatsächlich", "Demgegenüber", "In Wirklichkeit"],
              explain:
                "Kararın varsaydığı süre ile gerçek süre arasındaki farkı açan bir zarf gerekiyor. `Tatsächlich` bu karşıtlığı kurar ve ardından gelen fiil ikinci sırada kalır.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-3",
              no: 3,
              text: "Lücke 3 (Hinweis auf beigefügte Nachweise)",
              accept: ["Als Nachweis", "Zum Nachweis", "Als Beleg", "Hierzu"],
              explain:
                "Ek belgeler önce işlevleriyle duyurulur: `Als Nachweis übersende ich Ihnen …`. Boşluğa fiil yazmak cümleyi bozar, çünkü yüklem zaten yerinde.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-4",
              no: 4,
              text: "Lücke 4 (Zugeständnis einleiten)",
              accept: ["Zwar", "Selbstverständlich", "Natürlich", "Sehr wohl"],
              explain:
                "Kendi payına düşen hatayı kabul etmek itirazı güçlendirir. `Zwar …` bu ödünü açar ve bir sonraki boşluktaki sınırlamayı hazırlar.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-5",
              no: 5,
              text: "Lücke 5 (einschränkender Anschluss)",
              accept: ["Gleichwohl", "Jedoch", "Allerdings", "Dennoch", "Nichtsdestoweniger"],
              explain:
                "Kabulden sonra asıl argümanı getiren zıtlık bağlacı: ücret fiilen kullanılan süreye göre hesaplanır. `Gleichwohl` bu işlevi resmî kayıtta görür.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-6",
              no: 6,
              text: "Lücke 6 (Antrag, an einen Infinitivsatz anschließend)",
              accept: ["Ich beantrage daher", "Ich beantrage", "Hiermit beantrage ich", "Ich bitte Sie daher", "Ich bitte Sie"],
              explain:
                "Talep açık bir fiille adlandırılır ve `zu`-mastarına bağlanır: `Ich beantrage daher, die Gebühr … neu zu berechnen`.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-7",
              no: 7,
              text: "Lücke 7 (Hilfsantrag, Konditional ohne \"wenn\")",
              accept: ["Sollte", "Sollte wider Erwarten"],
              explain:
                "İkincil talep koşula bağlanır ve resmî yazıda bu koşul `wenn` olmadan, fiil başta kurulur: `Sollte diesem Antrag nicht entsprochen werden, …`.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-8",
              no: 8,
              text: "Lücke 8 (Präposition zu \"bitten\")",
              accept: ["um"],
              explain:
                "`bitten` bu anlamda `um` ile kurulur: `ich bitte um eine schriftliche Begründung`. Başka bir edat cümleyi dilbilgisel olarak bozar.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-9",
              no: 9,
              text: "Lücke 9 (höfliche Erwartung am Satzende)",
              accept: ["würde ich mich freuen", "wäre ich Ihnen dankbar", "freue ich mich", "wäre ich dankbar"],
              explain:
                "Cümle `Über eine Antwort …` ile başladığı için yüklem sona gelir ve özne devrilir. Süre isteği böylece baskı değil rica olarak okunur.",
            },
            {
              kind: "gap",
              id: "de-c1-03-s2-10",
              no: 10,
              text: "Lücke 10 (Grußformel)",
              accept: ["Mit freundlichen Grüßen", "Mit freundlichem Gruß", "Freundliche Grüße", "Hochachtungsvoll"],
              explain:
                "Kuruma yazılan resmî yazının vedası `Mit freundlichen Grüßen`. `Liebe Grüße` özel yazışmaya aittir ve burada üslup hatasıdır.",
            },
          ],
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und eine Position im Gespräch verteidigen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve bir konumu konuşmada savunmak.",
      tasks: [
        {
          id: "de-c1-03-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Kontrolle oder Vertrauen — wie sollte eine Verwaltung arbeiten?\". Gliedern Sie: Einstieg — Begriffsklärung — Lage in Ihrem Herkunftsland — Abwägung — eigene Position — Ausblick.",
          promptTr:
            "\"Denetim mi güven mi — bir idare nasıl çalışmalı?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavramı netleştirme — kendi ülkendeki durum — tartma — kendi konumun — kapanış.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 8,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Begriffsklärung", tr: "Kavramı netleştirme" },
              { de: "Lage im Herkunftsland", tr: "Kendi ülkendeki durum" },
              { de: "Abwägung beider Seiten", tr: "İki yönü de tartma" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Ausblick", tr: "Kapanış ve ileriye bakış" },
            ],
            sample:
              "Ich möchte über das Verhältnis von Kontrolle und Vertrauen in der Verwaltung sprechen. Zunächst kläre ich, was ich unter beidem verstehe, dann schildere ich die Lage in meinem Herkunftsland, danach wäge ich ab und komme zu meiner Position. Unter Kontrolle verstehe ich die systematische Überprüfung einzelner Schritte, unter Vertrauen die Erwartung regelkonformen Handelns ohne solche Überprüfung. Wichtig ist mir, dass beides keine Gegensätze sind: Vertrauen setzt die Möglichkeit der Überprüfung voraus, nicht ihren Vollzug. In Georgien, wo ich aufgewachsen bin, wurde vor etwa fünfzehn Jahren fast die gesamte Verwaltung umgebaut, und zwar erklärtermaßen über Kontrolle: Kameras, Protokolle, kurze Fristen. Das hat die alltägliche Korruption tatsächlich zurückgedrängt, allerdings um den Preis, dass Beschäftigte kaum noch entscheiden dürfen. Für die Abwägung heißt das: Kontrolle wirkt schnell und sichtbar, sie schützt vor Willkür und ist dort unverzichtbar, wo Vertrauen erst hergestellt werden muss. Ihre Grenze liegt darin, dass sie Zeit bindet und Misstrauen signalisiert, das sich seinerseits verstärkt. Meine Position ist deshalb abgestuft: Kontrolle sollte am Verfahren ansetzen, nicht an der Person, und sie sollte überprüfbar bleiben, statt lückenlos zu sein. Für die Zukunft würde ich erwarten, dass sich die Frage verschiebt — weg von der Menge der Kontrolle hin zu der Frage, wer die Kriterien festlegt.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavram tanımı gerçekten yapıldı mı, yoksa örnekle mi geçiştirildi?",
              "Kendi ülkedeki durum somut ve dönemlendirilmiş mi?",
              "Tartma iki yönlü mü ve her yön gerekçeli mi?",
              "Konum ölçülü mü (koşullu, dereceli) yoksa basit bir taraf tutma mı?",
              "Dil C1'de mi: adlaştırma, ilgi cümleleri, `erklärtermaßen/allerdings/seinerseits` gibi bağlayıcılar?",
              "Dört dakika boyunca konuşma yapısını koruyabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-03-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihre Gesprächspartnerin vertritt eine Gegenposition. Verteidigen Sie Ihre Sicht, gehen Sie auf Einwände ein und suchen Sie am Ende eine gemeinsame Formulierung. Thema: Soll eine Behörde verpflichtet werden, jede Abweichung von einem Fachgutachten schriftlich zu begründen?",
          promptTr:
            "Karşındaki karşıt bir görüşü savunuyor. Kendi bakışını savun, itirazları ele al ve sonunda ortak bir formül ara. Konu: Bir idare, bilirkişi görüşünden her sapmayı yazılı gerekçelendirmeye zorunlu tutulmalı mı?",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich halte eine solche Begründungspflicht für falsch. Sie verlagert Macht zu Sachverständigen, die von niemandem gewählt sind. Wie sehen Sie das?",
              tr: "Böyle bir gerekçelendirme yükümlülüğünü yanlış buluyorum. Yetkiyi, kimsenin seçmediği bilirkişilere kaydırıyor. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Konumunu ortaya koy ve itirazın haklı yanını da adlandır.",
              expect: "kendi konumunu gerekçelendirerek savunmak ve karşı gerekçenin haklı yanını kabul etmek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das gestehe ich Ihnen zu. Nur: In der Praxis würde jede Behörde einen Textbaustein verwenden. Eine Pflicht, die formal erfüllt wird, ist schlimmer als keine, weil sie Kritik entwaffnet.",
              tr: "Bunu size veriyorum. Ama pratikte her idare hazır bir metin parçası kullanır. Biçimsel olarak yerine getirilen bir yükümlülük hiç olmamasından kötüdür, çünkü eleştiriyi silahsızlandırır.",
            },
            {
              who: "you",
              hint: "Bu itirazı ciddiye al ve yükümlülüğün nasıl kurulması gerektiğini söyle.",
              expect: "bir itirazı kabul edip önlemi yeniden tasarlamak (biçimsel yerine getirmeye karşı ölçüt önermek)",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Angenommen, wir lösen das. Bleibt die Frage der Auswahl: Wer bestimmt, welches Gutachten überhaupt eingeholt wird? Dort entscheidet sich mehr als in der Begründung.",
              tr: "Diyelim bunu çözdük. Geriye seçim sorunu kalıyor: Hangi bilirkişiye başvurulacağını kim belirliyor? Asıl karar gerekçeden çok orada veriliyor.",
            },
            {
              who: "you",
              hint: "Bu noktayı ele al ve kendi önerinle nasıl bağlandığını göster.",
              expect: "yeni bir boyutu kendi önerisine bağlamak ve tutarlılığını göstermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Versuchen wir eine gemeinsame Formulierung, die wir beide unterschreiben könnten. Wie würde sie lauten?",
              tr: "Peki. İkimizin de altına imza atabileceği ortak bir formül deneyelim. Nasıl olurdu?",
            },
            {
              who: "you",
              hint: "İki tarafın kabul ettiklerini içeren tek bir formül kur.",
              expect: "iki tarafın kabullerini birleştiren tek ve kesin bir formül önermek",
              seconds: 60,
            },
          ],
          items: [],
          rubric: {
            minutes: 7,
            points: [
              { de: "die eigene Position begründen", tr: "Kendi konumunu gerekçelendirmek" },
              { de: "Einwände aufnehmen statt zu wiederholen", tr: "İtirazları tekrar etmek yerine devralmak" },
              { de: "die eigene Position anpassen", tr: "Konumu gerektiğinde uyarlamak" },
              { de: "eine gemeinsame Formulierung finden", tr: "Ortak bir formüle varmak" },
            ],
            sample:
              "Ich teile Ihren Einwand insoweit, als eine Begründungspflicht Sachverständige tatsächlich aufwertet. Nur richtet sich meine Forderung nicht auf Zustimmung, sondern auf Nachvollziehbarkeit — die Behörde soll nicht recht geben, sondern sagen, woran sie sich orientiert hat. Ihr Einwand mit dem Textbaustein trifft allerdings einen wunden Punkt. Ich würde die Pflicht deshalb inhaltlich binden: Die Begründung muss auf die konkrete Empfehlung eingehen und darf nicht auf allgemeine Abwägung verweisen. Zur Auswahl: Sie haben recht, dort fällt die Vorentscheidung. Das spricht aber nicht gegen die Begründungspflicht, sondern für eine Ergänzung — die Offenlegung, wer ein Gutachten in Auftrag gegeben und bezahlt hat. Als gemeinsame Formulierung schlage ich vor: Wer von einer fachlichen Empfehlung abweicht, benennt die Empfehlung, die Abweichung und den tragenden Grund; zugleich wird offengelegt, wer das Gutachten veranlasst hat. Eine Bindung an die Empfehlung entsteht dadurch ausdrücklich nicht.",
            criteria: [
              "Konum gerekçelendirildi mi ve konuşma boyunca tutarlı kaldı mı?",
              "İtirazlar gerçekten devralındı mı (kabul edilen kısım adlandırıldı mı)?",
              "Konum, itiraz karşısında körü körüne savunulmak yerine uyarlandı mı?",
              "Yeni boyut (seçim sorunu) kendi önerisine bağlanabildi mi?",
              "Ortak formül iki tarafın kabullerini de içeriyor ve kesin mi?",
              "Dil C1'de mi: `insoweit als`, `zugleich`, `ausdrücklich nicht` gibi kesinlik araçları?",
            ],
          },
        },
      ],
    },
  ],
};
