import type { MockPaper } from "../types";

/**
 * C1 · Deneme 6 — "Risiko und Vorsorge".
 *
 * PLAN kâğıt 1–5 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (10 özet boşluğu · 10 dört şıklı · 5 boşluklu seçme)
 *   Hören  40 dk · 25 madde   (10 not · 15 üç şıklı)
 *   Schreiben 80 dk           200 kelimelik yazı + 10 boşluklu resmî yazı
 *   Sprechen  15 dk           sunum + karşılıklı tartışma
 *
 * KONU SEÇİMİ: risk, sayıların herkesçe kabul edildiği ama yorumun taban
 * tabana ayrıldığı bir alan. Maddeler bu yüzden veriyi değil, veriden
 * çıkarılan sonucu ve o sonucun dayandığı ölçütü soruyor.
 */
export const C1_06: MockPaper = {
  id: "de-c1-06",
  course: "de",
  level: "C1",
  no: 6,
  theme: "Risiko und Vorsorge",
  themeTr: "Risk ve önlem",
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
          id: "de-c1-06-l1",
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
              title: "Die Schieflage der Vorsicht",
              body: `Menschen fürchten nicht die wahrscheinlichsten Gefahren, sondern die vorstellbarsten. Diese Beobachtung ist alt, gut belegt und wird in der öffentlichen Debatte regelmäßig als Denkfehler behandelt. Sie ist jedoch keiner, jedenfalls nicht ausschließlich.

Zunächst zum Befund. Befragt man Menschen nach den größten Bedrohungen ihres Lebens, nennen sie mit auffälliger Zuverlässigkeit seltene Ereignisse: Anschläge, Flugzeugabstürze, Entführungen. Was sie tatsächlich häufiger trifft — Stürze im Haushalt, Bluthochdruck, Vereinsamung —, erscheint in den Antworten kaum. Der Grund liegt weniger in mangelnder Bildung als in der Verfügbarkeit von Bildern: Wovon berichtet wird, wirkt häufig.

Daraus wird gern gefolgert, man müsse besser aufklären. Diese Folgerung greift zu kurz. Untersuchungen zur Risikokommunikation zeigen, dass reine Zahlenangaben die Einschätzung kaum verschieben; wo sie es tun, hält der Effekt nur wenige Wochen. Wirksam sind stattdessen Erfahrungen, die den eigenen Alltag betreffen — und die lassen sich schlecht verordnen.

Hinzu kommt ein zweiter Punkt, der in der Kritik an der Öffentlichkeit oft übersehen wird. Die Angst vor dem Seltenen erfüllt eine Funktion: Sie richtet sich auf Ereignisse, gegen die der Einzelne nichts unternehmen kann, und entlastet damit von der Frage nach dem eigenen Verhalten. Wer den Absturz fürchtet, muss nicht über seine Bewegung nachdenken.

Für die Vorsorge folgt daraus eine unbequeme Einsicht. Maßnahmen, die auf Einsicht setzen, wirken vor allem bei denen, die ohnehin vorsorgen. Wirksam sind dagegen Voreinstellungen: ein Rauchmelder, der beim Einzug bereits hängt, eine Vorsorgeuntersuchung, zu der eingeladen wird, ein Notvorrat, der als Paket verkauft wird.

Zu warnen ist gleichwohl vor der Umkehrung. Wer alles voreinstellt, nimmt Entscheidungen vorweg und schafft eine Sicherheit, die niemand mehr versteht. Eine Gesellschaft, die nicht mehr weiß, wogegen sie sich schützt, ist gegen neue Gefahren besonders schlecht gerüstet.

Die tragfähige Ordnung liegt zwischen beidem: Voreinstellungen für das Bekannte, öffentliche Auseinandersetzung für das Unbekannte. Beides zu verwechseln, ist der eigentliche Denkfehler — und er wird meist nicht von den Bürgern begangen, sondern von denen, die sie aufklären wollen.`,
              gloss: [
                { de: "die Schieflage", tr: "çarpıklık, dengesizlik", en: "imbalance" },
                { de: "die Verfügbarkeit", tr: "elde bulunma, akla gelme kolaylığı", en: "availability" },
                { de: "verordnen", tr: "dayatmak, reçete etmek", en: "to prescribe" },
                { de: "gerüstet sein", tr: "hazırlıklı olmak", en: "to be equipped" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              title: "Zusammenfassung mit Lücken",
              body: `Nach diesem Text fürchten Menschen nicht die wahrscheinlichsten, sondern die {{1}} Gefahren. Der Text hält das ausdrücklich nicht für einen bloßen {{2}}.

Befragungen zeigen, dass vor allem {{3}} Ereignisse genannt werden, während häufige Ursachen wie Stürze oder Bluthochdruck kaum auftauchen. Der Grund liegt weniger in fehlender Bildung als in der {{4}} von Bildern.

Die übliche Folgerung, man müsse besser {{5}}, greift dem Text zufolge zu kurz: Reine Zahlen verschieben die Einschätzung kaum, und ihr Effekt hält nur wenige {{6}}.

Hinzu kommt, dass die Angst vor dem Seltenen eine Funktion erfüllt: Sie {{7}} von der Frage nach dem eigenen Verhalten.

Für die Vorsorge folgt daraus, dass {{8}} wirksamer sind als Aufklärung — etwa ein Rauchmelder, der schon hängt. Zu warnen ist allerdings vor der {{9}}: Wer alles vorwegnimmt, schafft eine Sicherheit, die niemand mehr versteht.

Der Text empfiehlt deshalb eine Aufteilung: Voreinstellungen für das Bekannte und öffentliche Auseinandersetzung für das {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-06-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["vorstellbarsten", "vorstellbaren", "anschaulichsten"],
              explain:
                "İlk cümle karşıtlığı kuruyor: \"nicht die wahrscheinlichsten Gefahren, sondern die vorstellbarsten\". Özet aynı karşıtlığı yineliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["Denkfehler", "Fehler", "Irrtum"],
              explain:
                "Metin bunu düzeltiyor: gözlem kamusal tartışmada \"als Denkfehler behandelt\" ediliyor, \"Sie ist jedoch keiner\".",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["seltene", "spektakuläre", "außergewöhnliche"],
              explain:
                "Ankette \"seltene Ereignisse\" sayılıyor: saldırı, uçak kazası, kaçırılma. Sık görülenler ise cevaplarda neredeyse yok.",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["Verfügbarkeit", "Präsenz", "Sichtbarkeit"],
              explain:
                "Gerekçe metinde: \"in der Verfügbarkeit von Bildern: Wovon berichtet wird, wirkt häufig\".",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["aufklären", "informieren", "aufklärt"],
              explain:
                "Alışılmış sonuç: \"man müsse besser aufklären\". Metin bu çıkarımı yetersiz buluyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Wochen"],
              explain:
                "Etkinin süresi metinde: \"hält der Effekt nur wenige Wochen\". Kalıcı olan şey gündelik hayata dokunan deneyimler.",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["entlastet", "befreit", "ablenkt"],
              explain:
                "Metin işlevi adlandırıyor: korku \"entlastet damit von der Frage nach dem eigenen Verhalten\".",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Voreinstellungen", "Standardeinstellungen", "Voreinstellung"],
              explain:
                "\"Wirksam sind dagegen Voreinstellungen\" — hazır asılı bir duman dedektörü, davetle gelen bir tarama.",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Umkehrung", "Übertreibung", "Verallgemeinerung"],
              explain:
                "Metin ters uca da karşı çıkıyor: \"Zu warnen ist gleichwohl vor der Umkehrung\" — her şeyi önceden ayarlamak.",
            },
            {
              kind: "gap",
              id: "de-c1-06-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Unbekannte", "Neue", "Ungewisse"],
              explain:
                "Son paragrafın formülü: \"Voreinstellungen für das Bekannte, öffentliche Auseinandersetzung für das Unbekannte\".",
            },
          ],
        },
        {
          id: "de-c1-06-l2",
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
              title: "Die Übung",
              body: `Um 6.14 Uhr an einem Dienstag im März fiel im Kreiskrankenhaus醫 — genauer: im Kreiskrankenhaus Rethem — der Strom aus. Geplant war das seit acht Monaten, gewusst hatten es vier Personen.

Der Übungsleiter, ein Feuerwehrmann im Ruhestand namens Ortwin Zeller, hatte darauf bestanden, den Termin nicht bekanntzugeben. Die Klinikleitung war dagegen; man einigte sich auf einen Kompromiss, den Zeller heute für den entscheidenden Fehler hält: Die Übung wurde nicht angekündigt, aber auf einen Zeitraum von zwei Wochen eingegrenzt. "Damit haben wir genau das getestet, was wir nicht testen wollten — nämlich eine vorbereitete Station."

Was in den ersten zwanzig Minuten geschah, ist gut dokumentiert. Die Notstromversorgung sprang nach elf Sekunden an, sechs Sekunden später als vorgeschrieben. Zwei Beatmungsgeräte auf der Intensivstation liefen weiter, weil sie eigene Akkus haben; ein drittes, älteres Gerät nicht. Es war zu diesem Zeitpunkt nicht belegt, was Zeller ausdrücklich als Glück und nicht als Ergebnis bezeichnet.

Die eigentliche Erkenntnis lag anderswo. Der Notstrom versorgte alle Steckdosen mit roter Markierung — so war es geplant. Nur hatte in den Jahren zuvor niemand nachgehalten, was an diesen Steckdosen hängt. Im OP-Bereich fand sich ein Kühlschrank mit Blutkonserven an einer weißen Dose, während an einer roten seit dem Umbau von 2019 ein Getränkeautomat betrieben wurde.

"Das ist kein Skandal", sagt Zeller, "das ist der Normalfall." In neun von zehn Kliniken, die er begleitet habe, sei die Zuordnung der Steckdosen nach fünf Jahren nicht mehr korrekt. Der Grund sei nicht Nachlässigkeit, sondern die Abwesenheit eines Verfahrens: Umbauten würden dokumentiert, Umstöpselungen nicht.

Kritik an der Übung kam vor allem aus der Pflege. Eine Stationsleiterin, die anonym bleiben möchte, hält den frühen Zeitpunkt für unverantwortlich: Um kurz nach sechs sei die Nachtschicht am Ende ihrer Kräfte, die Frühschicht noch nicht vollständig da. Zeller widerspricht nicht. Genau deshalb, sagt er, habe er diese Uhrzeit gewählt.

Auffällig ist, was nach der Übung passierte. Die Steckdosen wurden binnen drei Wochen neu kartiert — eine Maßnahme, die seit 2021 in zwei Protokollen als "zu prüfen" verzeichnet war. Der Verwaltungsleiter erklärt das ohne Umschweife: Vor der Übung sei es eine Aufgabe unter vielen gewesen, danach eine Aufgabe mit einem Datum.

Ob die Klinik heute besser vorbereitet ist, lässt sich schwer sagen. Zeller formuliert es vorsichtig: "Sie ist besser vorbereitet auf einen Stromausfall an einem Dienstagmorgen im März." Was ihn stärker beschäftigt, ist eine andere Zahl: Von den vierzehn Kliniken im Landkreis hat seit dieser Übung eine einzige eine eigene angesetzt.`,
              gloss: [
                { de: "die Notstromversorgung", tr: "acil durum jeneratörü", en: "emergency power supply" },
                { de: "nachhalten", tr: "izlemek, takip etmek", en: "to keep track of" },
                { de: "die Nachlässigkeit", tr: "savsaklama", en: "negligence" },
                { de: "ohne Umschweife", tr: "dolandırmadan, açıkça", en: "without beating about the bush" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-06-l2-11",
              no: 11,
              ref: "t2",
              text: "Was hält Zeller rückblickend für den entscheidenden Fehler?",
              options: [
                "Dass die Übung überhaupt angekündigt wurde.",
                "Dass die Klinikleitung eingebunden war.",
                "Dass der Termin auf ein Fenster begrenzt war.",
                "Die Wahl eines Werktags statt eines Wochenendes.",
              ],
              answer: 2,
              explain:
                "Uzlaşma tam buydu ve Zeller bunu \"den entscheidenden Fehler\" sayıyor: iki haftalık pencere hazırlanmış bir servisi test etmiş oluyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-12",
              no: 12,
              ref: "t2",
              text: "Wie bewertet der Text den Zustand des dritten Beatmungsgeräts?",
              options: [
                "Als glücklichen Zufall, nicht als Erfolg.",
                "Als Beleg für gute Vorbereitung.",
                "Als schwersten Zwischenfall der Übung.",
                "Als Folge eines Bedienungsfehlers.",
              ],
              answer: 0,
              explain:
                "Cihaz o an boştu ve Zeller bunu \"ausdrücklich als Glück und nicht als Ergebnis\" niteliyor. Yani hazırlığın değil rastlantının eseri.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-13",
              no: 13,
              ref: "t2",
              text: "Worin bestand die eigentliche Erkenntnis?",
              options: [
                "Der Notstrom sprang zu spät an.",
                "Die Belegung der markierten Steckdosen stimmte nicht mehr.",
                "Die Pflege war unzureichend geschult.",
                "Die Dokumentation der Übung war lückenhaft.",
              ],
              answer: 1,
              explain:
                "Plan işlemiş ama içerik kaymış: kan dolabı beyaz prizde, kırmızı prizde ise 2019'dan beri bir içecek otomatı.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-14",
              no: 14,
              ref: "t2",
              text: "Wie ordnet Zeller diesen Befund ein?",
              options: [
                "Als Ausnahme in einem sonst guten System.",
                "Als Folge von Nachlässigkeit einzelner Personen.",
                "Als Hinweis auf zu alte technische Anlagen.",
                "Als Normalfall in vergleichbaren Häusern.",
              ],
              answer: 3,
              explain:
                "\"Das ist kein Skandal, das ist der Normalfall\" diyor: eşlik ettiği on klinikten dokuzunda beş yıl sonra eşleşme bozuluyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-15",
              no: 15,
              ref: "t2",
              text: "Worauf führt er die Ursache zurück?",
              options: [
                "Auf fehlende Zuständigkeit der Technik.",
                "Auf ein fehlendes Verfahren für Umstöpselungen.",
                "Auf zu seltene Kontrollen durch die Aufsicht.",
                "Auf den Kostendruck in den Kliniken.",
              ],
              answer: 1,
              explain:
                "Sebep dikkatsizlik değil: \"Umbauten würden dokumentiert, Umstöpselungen nicht\" — yani süreç eksik.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-16",
              no: 16,
              ref: "t2",
              text: "Was kritisiert die Stationsleiterin?",
              options: [
                "Den Zeitpunkt der Übung.",
                "Die Auswahl der beteiligten Stationen.",
                "Die fehlende Einbindung der Pflege in die Planung.",
                "Die Dauer der Übung von zwanzig Minuten.",
              ],
              answer: 0,
              explain:
                "Sabahın erken saatini sorumsuz buluyor: \"die Nachtschicht am Ende ihrer Kräfte, die Frühschicht noch nicht vollständig da\".",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-17",
              no: 17,
              ref: "t2",
              text: "Wie reagiert Zeller auf diese Kritik?",
              options: [
                "Er weist sie als unsachlich zurück.",
                "Er räumt einen Planungsfehler ein.",
                "Er bestätigt die Beschreibung und begründet damit seine Wahl.",
                "Er verweist auf die Zuständigkeit der Klinikleitung.",
              ],
              answer: 2,
              explain:
                "\"Zeller widerspricht nicht\" — tam bu yüzden o saati seçtiğini söylüyor. Eleştirinin betimlemesini kabul edip sonucunu tersine çeviriyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-18",
              no: 18,
              ref: "t2",
              text: "Was geschah nach der Übung mit einer alten Aufgabe?",
              options: [
                "Sie wurde kurz darauf abgearbeitet.",
                "Sie wurde erneut auf später verschoben.",
                "Sie wurde an eine Fremdfirma vergeben.",
                "Sie wurde aus dem Protokoll gestrichen.",
              ],
              answer: 0,
              explain:
                "2021'den beri iki tutanakta \"zu prüfen\" olarak duran kartlama üç hafta içinde yapılmış.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-19",
              no: 19,
              ref: "t2",
              text: "Wie erklärt der Verwaltungsleiter diesen Unterschied?",
              options: [
                "Mit zusätzlichem Personal nach der Übung.",
                "Mit einer neuen gesetzlichen Vorgabe.",
                "Mit dem öffentlichen Druck der Berichterstattung.",
                "Damit, dass die Aufgabe nun ein Datum hatte.",
              ],
              answer: 3,
              explain:
                "Açıklaması kısa: önce \"eine Aufgabe unter vielen\", sonra \"eine Aufgabe mit einem Datum\". Değişen şey kaynak değil, aciliyetin biçimi.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l2-20",
              no: 20,
              ref: "t2",
              text: "Was beschäftigt Zeller am Ende am meisten?",
              options: [
                "Die Zahl der Kliniken, die nachgezogen haben.",
                "Die Kosten der Übung für das Krankenhaus.",
                "Die Reaktion der Öffentlichkeit auf den Bericht.",
                "Die Frage nach der Haftung im Ernstfall.",
              ],
              answer: 0,
              explain:
                "Son cümle bunu veriyor: \"Von den vierzehn Kliniken im Landkreis hat seit dieser Übung eine einzige eine eigene angesetzt\".",
            },
          ],
        },
        {
          id: "de-c1-06-l3",
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
              title: "Der Vorrat kehrt zurück",
              body: `Der private Notvorrat galt jahrzehntelang als Sache übervorsichtiger Menschen — {{21}} er in offiziellen Empfehlungen nie verschwunden war.

Seit einigen Jahren hat sich das gedreht. Die Verkaufszahlen für haltbare Lebensmittel steigen, und zwar nicht nur nach Ereignissen. Belastbare Erklärungen dafür sind {{22}} rar; die naheliegende Vermutung, es handle sich um eine Reaktion auf Krisen, erklärt den gleichmäßigen Verlauf gerade nicht.

Aufschlussreich ist, wer kauft. Es sind nicht vorrangig ältere Menschen, {{23}} Haushalte mit kleinen Kindern. Für sie ist der Vorrat weniger Schutz gegen einen Ausfall als eine Form, Kontrolle über einen unübersichtlichen Alltag herzustellen.

Fachlich ist das nicht unproblematisch. Wer aus Unruhe kauft, kauft selten das Richtige. {{24}} wäre es falsch, daraus einen Einwand gegen die Empfehlung zu machen: Dieselben Haushalte informieren sich nach dem Kauf häufiger als vorher.

Am Ende dürfte weniger entscheidend sein, wie viele Dosen im Keller stehen, {{25}} ob jemand weiß, wo das Wasser abgestellt wird.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-06-l3-21",
              no: 21,
              text: "Lücke 21",
              options: ["sofern", "obgleich", "indem", "damit"],
              answer: 1,
              explain:
                "Cümle bir karşıtlık kuruyor: aşırı tedbirlilik sayılıyordu, oysa resmî önerilerden hiç çıkmamıştı. `obgleich` bu ödünü verir.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l3-22",
              no: 22,
              text: "Lücke 22",
              options: ["ohnehin", "immerhin", "gleichwohl", "insofern"],
              answer: 2,
              explain:
                "Satışların arttığı kabul ediliyor, ama açıklamalar zayıf: ödünlü bir geçiş gerekiyor. `gleichwohl` bunu kurar.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l3-23",
              no: 23,
              text: "Lücke 23",
              options: ["zumal", "vielmehr", "sondern", "geschweige denn"],
              answer: 2,
              explain:
                "Önce olumsuzlanan bir varsayım var (\"nicht vorrangig ältere Menschen\"), sonra düzeltme geliyor: `nicht … sondern`.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l3-24",
              no: 24,
              text: "Lücke 24",
              options: ["Folglich", "Insofern", "Dennoch", "Mithin"],
              answer: 2,
              explain:
                "Önceki cümle bir sakınca sayıyor; boşluk buna rağmen gelen yargıyı açıyor. `Dennoch` bu geçişi kurar, ötekiler sonuç bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-l3-25",
              no: 25,
              text: "Lücke 25",
              options: ["als", "wie", "denn", "sondern"],
              answer: 0,
              explain:
                "Kalıp `weniger … als`: belirleyici olan kaç konserve olduğu değil, suyun nereden kapatıldığının bilinmesi.",
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
          id: "de-c1-06-h1",
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
              title: "Vorsorge im Haushalt — Informationsabend",
              situation: "İlçe afet yönetiminden biri hazırlık önerilerini anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Ilka Bornhöft, ich arbeite beim Katastrophenschutz des Landkreises. Ich sage Ihnen heute, was sinnvoll ist und was nicht — und ich fange mit dem an, was Sie nicht brauchen.",
                },
                {
                  text: "Sie brauchen keinen Bunker und keine Spezialausrüstung. Die offizielle Empfehlung lautet Vorrat für zehn Tage, und die meisten Haushalte kommen dem näher, als sie denken. In unseren Beratungen fehlt fast nie das Essen, sondern das Wasser.",
                },
                {
                  text: "Zur Menge: Gerechnet wird mit zwei Litern pro Person und Tag zum Trinken, plus einem halben Liter zum Kochen. Für zehn Tage sind das bei zwei Personen fünfzig Liter. Das ist der Punkt, an dem die meisten aussteigen, und deshalb sage ich es deutlich: Fünf Tage sind besser als nichts.",
                },
                {
                  text: "Was oft vergessen wird, ist der Dosenöffner. Ein mechanischer, nicht elektrisch. Ebenso ein Radio mit Batterien; das Handynetz fällt bei einem längeren Stromausfall nach etwa vier Stunden aus, weil die Sendemasten eigene Akkus haben, aber nur für diese Zeit.",
                },
                {
                  text: "Zum Bargeld: Halten Sie einen kleinen Betrag in kleinen Scheinen bereit. Bei Kartenausfall kann niemand wechseln. Wir empfehlen zweihundert Euro pro Haushalt, in Zehnern und Zwanzigern.",
                },
                {
                  text: "Ein Punkt, den ich besonders betone: Wissen Sie, wo in Ihrer Wohnung der Hauptwasserhahn ist? In unseren Kursen kann das etwa ein Drittel der Teilnehmenden nicht zeigen. Dieses Wissen kostet nichts und verhindert mehr Schäden als jeder Vorrat.",
                },
                {
                  text: "Zur Beratung: Wir kommen kostenlos zu Ihnen nach Hause, die Wartezeit beträgt derzeit etwa acht Wochen. Für Hausgemeinschaften machen wir Termine vor Ort, da geht es schneller.",
                },
                {
                  text: "Und ein letzter Hinweis, der viele überrascht: Prüfen Sie Ihren Vorrat nicht jährlich, sondern verbrauchen Sie ihn laufend und kaufen Sie nach. Was einmal im Keller steht und nie angerührt wird, ist nach drei Jahren Abfall und keine Vorsorge.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizzettel",
              genreTr: "Not kâğıdı",
              title: "Notizen — Vorsorge im Haushalt",
              body: `Nicht nötig: Bunker, Spezialausrüstung.
Offizielle Empfehlung: Vorrat für {{1}}.
In Beratungen fehlt fast nie Essen, sondern {{2}}.

Wasser: 2 Liter trinken + {{3}} zum Kochen, pro Person und Tag.
Zwei Personen, zehn Tage = {{4}}.
Realistische Untergrenze laut Vortrag: {{5}}.

Oft vergessen: {{6}} (mechanisch), Radio mit Batterien.
Handynetz fällt nach etwa {{7}} aus.

Bargeld: {{8}} pro Haushalt, in kleinen Scheinen.

Wichtigstes kostenloses Wissen: Lage des {{9}}.

Beratung zu Hause kostenlos, Wartezeit {{10}}.
Vorrat laufend verbrauchen und nachkaufen.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-06-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["zehn Tage", "10 Tage", "zehn", "10"],
              explain:
                "Resmî öneri açıkça veriliyor: \"Vorrat für zehn Tage\". Konuşmacı çoğu hanenin buna sandığından yakın olduğunu ekliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["das Wasser", "Wasser"],
              explain:
                "Danışmalarda eksik olan şey yemek değil: \"sondern das Wasser\". Konuşmanın ana vurgusu buradan başlıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["ein halber Liter", "einen halben Liter", "0,5 Liter", "ein halber"],
              explain:
                "Hesap iki kalemden oluşuyor: içmek için 2 litre, \"plus einem halben Liter zum Kochen\".",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["50 Liter", "fünfzig Liter", "50"],
              explain:
                "Konuşmacı toplamı veriyor: iki kişi ve on gün için \"fünfzig Liter\". Çoğu kişinin vazgeçtiği nokta da bu.",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["fünf Tage", "5 Tage", "fünf", "5"],
              explain:
                "Vazgeçmemek için gerçekçi bir alt sınır veriyor: \"Fünf Tage sind besser als nichts\".",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["Dosenöffner", "der Dosenöffner", "ein Dosenöffner"],
              explain:
                "En sık unutulan şey: \"der Dosenöffner. Ein mechanischer, nicht elektrisch.\"",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["vier Stunden", "4 Stunden", "vier", "4"],
              explain:
                "Uzun bir kesintide şebeke \"nach etwa vier Stunden\" düşüyor, çünkü baz istasyonlarının aküsü ancak o kadar dayanıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["200 Euro", "zweihundert Euro", "200"],
              explain:
                "Öneri hane başına \"zweihundert Euro pro Haushalt, in Zehnern und Zwanzigern\" — kart çalışmazsa kimse para bozamıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["Hauptwasserhahns", "Hauptwasserhahn", "Haupthahns", "Wasserhahns"],
              explain:
                "Konuşmacının özellikle vurguladığı bilgi: \"Wissen Sie, wo in Ihrer Wohnung der Hauptwasserhahn ist?\" Kurslarda katılımcıların yaklaşık üçte biri gösteremiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["acht Wochen", "8 Wochen", "etwa acht Wochen", "ca. 8 Wochen"],
              explain:
                "Ev ziyareti ücretsiz ve bekleme süresi \"etwa acht Wochen\"; apartman toplulukları için yerinde randevu daha hızlı.",
            },
          ],
        },
        {
          id: "de-c1-06-h2",
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
              situation: "Üç konuk ne kadar önlem alınması gerektiğini tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Unser Thema ist die Vorsorge. Frau Dr. Ehlert, Sie forschen zur Risikowahrnehmung. Sorgen wir zu wenig vor?",
                },
                {
                  speaker: "Frau Dr. Ehlert",
                  text: "Wir sorgen falsch vor, nicht zu wenig. Die Haushalte investieren dort, wo sie sich etwas vorstellen können, und dort ist die Gefahr meist klein. Gegen den Stromausfall hilft eine Taschenlampe; gegen den Sturz im Bad hilft ein Griff, den fast niemand montiert.",
                },
                { speaker: "Moderator", text: "Herr Vandenberg, Sie leiten ein Ordnungsamt." },
                {
                  speaker: "Herr Vandenberg",
                  text: "Aus meiner Sicht stimmt das, führt aber in die falsche Richtung. Wenn ich Menschen sage, ihre Sorge sei unbegründet, höre ich auf, Ansprechpartner zu sein. Ich nehme die Taschenlampe und rede beim zweiten Termin über das Bad.",
                },
                { speaker: "Moderator", text: "Frau Kirsch, Sie vertreten einen Verbraucherverband." },
                {
                  speaker: "Frau Kirsch",
                  text: "Mich stört an beiden Zugängen, dass sie beim Einzelnen bleiben. Der größte Teil der Vorsorge ist nicht privat: Netze, Wasserwerke, Krankenhäuser. Wenn dort nicht geübt wird, nützt mir mein Vorrat wenig.",
                },
                {
                  speaker: "Frau Dr. Ehlert",
                  text: "Dem widerspreche ich nicht, im Gegenteil. Nur folgt daraus ein unbequemer Punkt: Öffentliche Vorsorge ist unsichtbar, solange sie funktioniert. Sie wird deshalb systematisch unterfinanziert, und zwar von denselben Leuten, die privat Konserven kaufen.",
                },
                { speaker: "Moderator", text: "Herr Vandenberg, sehen Sie das in Ihren Haushalten?" },
                {
                  speaker: "Herr Vandenberg",
                  text: "Jeden Herbst. Für ein Notstromaggregat bekomme ich schwer Geld, für eine Informationskampagne leicht. Das eine sieht man, das andere nicht — bis es fehlt.",
                },
                {
                  speaker: "Frau Kirsch",
                  text: "Das ist genau der Punkt, an dem ich Ihnen widerspreche. Kampagnen sind nicht das Problem, sondern ihre Funktion: Sie erlauben es, etwas getan zu haben, ohne etwas geändert zu haben.",
                },
                {
                  speaker: "Herr Vandenberg",
                  text: "Das ist hart und in Teilen richtig. Ich würde nur ergänzen: Manche Kampagne hat bei uns tatsächlich etwas bewegt — allerdings nur die, die auf eine konkrete Handlung zielte, nicht auf ein Gefühl.",
                },
                { speaker: "Moderator", text: "Frau Dr. Ehlert, hilft Erfahrung?" },
                {
                  speaker: "Frau Dr. Ehlert",
                  text: "Sehr, aber nicht lange. Nach einem Hochwasser steigt die Vorsorge in der betroffenen Region messbar und fällt nach etwa drei Jahren auf das Ausgangsniveau zurück. Wer das weiß, plant Wiederholungen ein, statt sich über Vergesslichkeit zu wundern.",
                },
                { speaker: "Moderator", text: "Zum Schluss bitte je eine Maßnahme." },
                {
                  speaker: "Frau Kirsch",
                  text: "Verpflichtende Übungen für kritische Einrichtungen, mit veröffentlichtem Ergebnis. Ohne Veröffentlichung wird geübt, bis es passt.",
                },
                {
                  speaker: "Herr Vandenberg",
                  text: "Ich würde in jedem Ort eine feste Anlaufstelle einrichten. Das klingt klein und ist der Unterschied zwischen einer Broschüre und einem Gespräch.",
                },
                {
                  speaker: "Frau Dr. Ehlert",
                  text: "Und ich würde die Empfehlungen halbieren. Zehn Tage schrecken ab; drei Tage macht fast jeder — und drei Tage decken die meisten realen Lagen ab.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-06-h2-11",
              no: 11,
              ref: "d1",
              text: "Wie beantwortet Frau Dr. Ehlert die Eingangsfrage?",
              options: [
                "Es werde eindeutig zu wenig vorgesorgt.",
                "Es werde falsch vorgesorgt.",
                "Die Frage sei empirisch nicht zu klären.",
              ],
              answer: 1,
              explain:
                "\"Wir sorgen falsch vor, nicht zu wenig\" diyor: yatırım hayal edilebilir olana gidiyor, oysa gerçek tehlike orada küçük.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-12",
              no: 12,
              ref: "d1",
              text: "Womit belegt sie das?",
              options: [
                "Mit Taschenlampe und Haltegriff.",
                "Mit den Verkaufszahlen für Konserven.",
                "Mit einer Umfrage unter Versicherten.",
              ],
              answer: 0,
              explain:
                "Örneği somut: elektrik kesintisine el feneri alınıyor, banyodaki düşmeye karşı tutamağı \"fast niemand montiert\".",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-13",
              no: 13,
              ref: "d1",
              text: "Warum hält Herr Vandenberg diesen Zugang für heikel?",
              options: [
                "Weil die Daten dazu unsicher sind.",
                "Weil er die Zuständigkeit der Kommunen überschreitet.",
                "Weil er den Kontakt zu den Menschen gefährdet.",
              ],
              answer: 2,
              explain:
                "\"höre ich auf, Ansprechpartner zu sein\" diyor: önce el fenerini alıyor, banyoyu ikinci görüşmeye bırakıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-14",
              no: 14,
              ref: "d1",
              text: "Was kritisiert Frau Kirsch an beiden Positionen?",
              options: [
                "Sie unterschätzen die Kosten für Haushalte.",
                "Sie bleiben beim Einzelnen stehen.",
                "Sie stützen sich auf veraltete Empfehlungen.",
              ],
              answer: 1,
              explain:
                "\"Der größte Teil der Vorsorge ist nicht privat: Netze, Wasserwerke, Krankenhäuser\" diyor. Orada tatbikat yoksa kendi stoku az işe yarıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-15",
              no: 15,
              ref: "d1",
              text: "Wie reagiert Frau Dr. Ehlert darauf?",
              options: [
                "Sie stimmt zu und verschärft ihn.",
                "Sie hält den Einwand für nebensächlich.",
                "Sie widerspricht mit eigenen Zahlen.",
              ],
              answer: 0,
              explain:
                "\"Dem widerspreche ich nicht, im Gegenteil\" diyor ve rahatsız edici sonucu ekliyor: kamusal önlem işlerken görünmez olduğu için sistematik biçimde az finanse ediliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-16",
              no: 16,
              ref: "d1",
              text: "Wer finanziert diese Vorsorge nach ihr zu knapp?",
              options: [
                "Vor allem die Regierungen der Länder.",
                "Vor allem private Versicherer.",
                "Dieselben, die privat vorsorgen.",
              ],
              answer: 2,
              explain:
                "\"von denselben Leuten, die privat Konserven kaufen\" — özel hazırlık yapanlar kamusal olanı kısıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-17",
              no: 17,
              ref: "d1",
              text: "Was beobachtet Herr Vandenberg in seinen Haushaltsberatungen?",
              options: [
                "Sichtbares wird leichter finanziert.",
                "Kampagnen werden regelmäßig abgelehnt.",
                "Technische Anschaffungen werden bevorzugt.",
              ],
              answer: 0,
              explain:
                "Jeneratör için para bulmak zor, kampanya için kolay: \"Das eine sieht man, das andere nicht — bis es fehlt.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-18",
              no: 18,
              ref: "d1",
              text: "Was wirft Frau Kirsch den Kampagnen vor?",
              options: [
                "Sie kosten zu viel Geld.",
                "Sie erreichen nur ältere Menschen.",
                "Sie ersetzen Veränderung.",
              ],
              answer: 2,
              explain:
                "\"Sie erlauben es, etwas getan zu haben, ohne etwas geändert zu haben\" — sorun kampanyanın kendisi değil, üstlendiği işlev.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-19",
              no: 19,
              ref: "d1",
              text: "Wie antwortet Herr Vandenberg auf diesen Vorwurf?",
              options: [
                "Er räumt einen Teil davon ein.",
                "Er weist den Vorwurf zur Gänze zurück.",
                "Er verweist auf fehlende Alternativen.",
              ],
              answer: 0,
              explain:
                "\"Das ist hart und in Teilen richtig\" diyor ve sınırı çiziyor: yalnız somut bir eyleme yönelen kampanyalar işe yaramış.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-20",
              no: 20,
              ref: "d1",
              text: "Welche Kampagnen wirken nach ihm?",
              options: [
                "Solche, die auf ein Gefühl zielen.",
                "Solche mit einer konkreten Handlung.",
                "Solche, die über mehrere Jahre laufen.",
              ],
              answer: 1,
              explain:
                "Ayrımı kendisi kuruyor: \"nur die, die auf eine konkrete Handlung zielte, nicht auf ein Gefühl\".",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-21",
              no: 21,
              ref: "d1",
              text: "Was sagt Frau Dr. Ehlert über die Wirkung von Erfahrung?",
              options: [
                "Sie wirkt stark, aber kurz.",
                "Sie wirkt nur bei jüngeren Haushalten.",
                "Sie wirkt schwächer als Information.",
              ],
              answer: 0,
              explain:
                "Sel sonrası hazırlık ölçülebilir biçimde artıyor ve \"nach etwa drei Jahren auf das Ausgangsniveau\" düşüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-22",
              no: 22,
              ref: "d1",
              text: "Was folgt daraus für die Planung?",
              options: [
                "Man sollte auf Erfahrung nicht setzen.",
                "Man sollte Wiederholungen einplanen.",
                "Man sollte betroffene Regionen bevorzugen.",
              ],
              answer: 1,
              explain:
                "\"Wer das weiß, plant Wiederholungen ein, statt sich über Vergesslichkeit zu wundern.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-23",
              no: 23,
              ref: "d1",
              text: "Welche Maßnahme nennt Frau Kirsch?",
              options: [
                "Eine feste Anlaufstelle in jedem Ort.",
                "Eine Halbierung der Empfehlungen.",
                "Pflichtübungen mit Veröffentlichung.",
              ],
              answer: 2,
              explain:
                "Yayımlama şartını da koyuyor: \"Ohne Veröffentlichung wird geübt, bis es passt.\" Öteki iki öneri Vandenberg ve Ehlert'e ait.",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-24",
              no: 24,
              ref: "d1",
              text: "Womit begründet Herr Vandenberg seinen Vorschlag?",
              options: [
                "Mit dem Unterschied zum Gespräch.",
                "Mit den Kosten einer zentralen Stelle.",
                "Mit der Erfahrung aus dem letzten Hochwasser.",
              ],
              answer: 0,
              explain:
                "Önerisini küçümsemeden konumlandırıyor: \"Das klingt klein und ist der Unterschied zwischen einer Broschüre und einem Gespräch.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-06-h2-25",
              no: 25,
              ref: "d1",
              text: "Wie begründet Frau Dr. Ehlert ihre Maßnahme?",
              options: [
                "Zehn Tage seien fachlich nicht haltbar.",
                "Drei Tage seien machbar und deckten das Meiste ab.",
                "Empfehlungen sollten regional unterschiedlich sein.",
              ],
              answer: 1,
              explain:
                "\"Zehn Tage schrecken ab; drei Tage macht fast jeder — und drei Tage decken die meisten realen Lagen ab.\" Yani gerekçe uygulanabilirlik.",
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
          id: "de-c1-06-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Eine Fachzeitschrift veröffentlicht eine Reihe mit dem Titel \"Vorsorge — wie viel ist genug?\". Schreiben Sie einen Beitrag von etwa 200 Wörtern. Behandeln Sie alle fünf Leitpunkte und stellen Sie zwischen ihnen einen Zusammenhang her.",
          promptTr:
            "Bir meslek dergisi \"Önlem — ne kadarı yeterli?\" başlıklı bir dizi yayımlıyor. Yaklaşık 200 kelimelik bir yazı yaz. Beş yönlendirme noktasının hepsini işle ve aralarında bağ kur.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Beschreiben Sie die Ausgangslage.", tr: "Çıkış durumunu betimle." },
              { de: "Nennen Sie zwei Gründe für die schiefe Wahrnehmung von Risiken.", tr: "Risk algısının çarpıklığının iki nedenini söyle." },
              { de: "Stellen Sie die Lage in Ihrem Herkunftsland gegenüber.", tr: "Kendi ülkendeki durumla karşılaştır." },
              { de: "Wägen Sie private und öffentliche Vorsorge ab.", tr: "Özel ve kamusal önlemi tart." },
              { de: "Formulieren Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuç yaz." },
            ],
            sample: `Wer über Vorsorge spricht, spricht meist über Konserven. Das ist kein Zufall, sondern die Folge einer Wahrnehmung, die sich an Bildern orientiert und nicht an Häufigkeiten.

Zwei Gründe lassen sich anführen. Zum einen wirkt vertraut, wovon berichtet wird; seltene Ereignisse sind medial präsent und deshalb im Kopf verfügbar. Zum anderen erfüllt die Angst vor dem Seltenen eine entlastende Funktion: Wer sich vor dem Unabwendbaren fürchtet, muss sein eigenes Verhalten nicht prüfen.

In meinem Herkunftsland stellt sich die Lage anders dar. Dort ist Vorsorge weitgehend privat organisiert, weil dem Staat wenig zugetraut wird; nahezu jeder Haushalt hat Wasser im Keller. Verlässlich ist deshalb nicht die Versorgung, sondern die Familie — und wer keine hat, ist auf sich gestellt.

In der Abwägung zeigt sich das eigentliche Problem. Private Vorsorge ist sichtbar, motivierend und im Ernstfall begrenzt; öffentliche Vorsorge ist wirksam, aber unsichtbar, solange sie funktioniert. Genau deshalb wird sie regelmäßig zuerst gekürzt.

Daraus folgt für mich, dass die Frage nach dem Wie viel bereits falsch gestellt ist. Entscheidend ist nicht die Menge des privaten Vorrats, sondern ob in den Einrichtungen tatsächlich geübt wird — und ob die daraus abgeleiteten Maßnahmen öffentlich nachvollziehbar sind. Alles andere verschiebt eine gemeinsame Aufgabe in den Keller einzelner Haushalte.`,
            criteria: [
              "Beş yönlendirme noktasının hepsi işlendi mi?",
              "Noktalar arasında bağ kuruldu mu, yoksa beş ayrı paragraf mı yan yana duruyor?",
              "Karşılaştırma aynı ölçütü iki duruma uyguluyor mu?",
              "Tartma iki yönlü mü ve sonuç bu tartmadan çıkıyor mu?",
              "Dil C1 düzeyinde mi: adlaştırma, `zum einen … zum anderen`, ölçülü ifade?",
              "Yaklaşık 200 kelime var mı?",
            ],
          },
        },
        {
          id: "de-c1-06-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an Ihre Versicherung. Der Entwurf unten ist zu umgangssprachlich. Ergänzen Sie die Lücken 1 bis 10 mit einer stilistisch angemessenen Wendung. Die Funktion jeder Lücke steht in Klammern.",
          promptTr:
            "Sigorta şirketine yazıyorsun. Aşağıdaki taslak fazla günlük dilde. 1–10. boşlukları üsluba uygun bir ifadeyle tamamla. Her boşluğun işlevi parantez içinde yazılı.",
          texts: [
            {
              kind: "text",
              id: "br1",
              genre: "Formelles Schreiben",
              genreTr: "Resmî yazı",
              title: "Widerspruch gegen eine Leistungskürzung",
              body: `Sehr geehrte Damen und Herren,

gegen Ihr Schreiben vom 9. Januar, Schadennummer 55-2041/26, lege ich fristgerecht Widerspruch ein.

{{1}} kürzen Sie die Leistung um dreißig Prozent mit der Begründung, der Wasserschaden sei durch unzureichende Wartung mitverursacht worden.

{{2}} ist die Leitung im Juni des Vorjahres von einem Fachbetrieb geprüft worden. Der Prüfbericht weist keine Beanstandung aus.

{{3}} übersende ich Ihnen diesen Bericht sowie die Rechnung des Betriebs vom 28. Juni.

{{4}} ist mir bewusst, dass die Beweislast bei mir liegt und dass eine Prüfung keine Garantie darstellt. {{5}} setzt eine Kürzung wegen mangelnder Wartung voraus, dass eine Pflicht verletzt wurde — und genau das ist hier nicht der Fall.

{{6}}, die Kürzung zurückzunehmen und den vollen Betrag anzuweisen.

{{7}} Sie an Ihrer Entscheidung festhalten, bitte ich {{8}} eine schriftliche Begründung unter Angabe der herangezogenen Vertragsklausel.

Über eine Rückmeldung bis zum 15. Februar {{9}}, da die Trocknungsarbeiten sonst nicht beauftragt werden können.

{{10}}
Ruth Sundermann`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-06-s2-1",
              no: 1,
              text: "Lücke 1 (Wiedergabe der Entscheidung)",
              accept: ["Mit diesem Schreiben", "Darin", "In diesem Bescheid", "Konkret"],
              explain:
                "İtirazdan sonra kararın içeriği aktarılıyor. `Darin kürzen Sie die Leistung …` okuru neye itiraz edildiğine bağlar.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-2",
              no: 2,
              text: "Lücke 2 (Gegensatz zur Begründung)",
              accept: ["Tatsächlich", "Demgegenüber", "In Wirklichkeit", "Richtig ist"],
              explain:
                "Şirketin gerekçesiyle olgu karşı karşıya getiriliyor. `Tatsächlich ist die Leitung … geprüft worden` bu karşıtlığı kurar.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-3",
              no: 3,
              text: "Lücke 3 (Hinweis auf Anlagen)",
              accept: ["Als Nachweis", "Zum Nachweis", "Als Beleg", "Hierzu"],
              explain:
                "Ekler işleviyle duyurulur: `Als Nachweis übersende ich Ihnen …`. Yüklem cümlede zaten var.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-4",
              no: 4,
              text: "Lücke 4 (Zugeständnis einleiten)",
              accept: ["Selbstverständlich", "Zwar", "Natürlich", "Sehr wohl"],
              explain:
                "İspat yükünü ve muayenenin garanti olmadığını önce kabul etmek itirazı güçlendirir: `Selbstverständlich ist mir bewusst, dass …`.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-5",
              no: 5,
              text: "Lücke 5 (einschränkender Anschluss)",
              accept: ["Gleichwohl", "Allerdings", "Jedoch", "Dennoch"],
              explain:
                "Kabulden sonra asıl argüman geliyor: kesinti bir yükümlülük ihlali gerektirir. `Gleichwohl` bu dönüşü sağlar.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-6",
              no: 6,
              text: "Lücke 6 (Hauptantrag, an einen Infinitivsatz anschließend)",
              accept: ["Ich beantrage daher", "Ich beantrage", "Hiermit beantrage ich", "Ich bitte Sie daher"],
              explain:
                "Talep `zu`-mastarına bağlanan açık bir fiille kurulur: `Ich beantrage daher, die Kürzung zurückzunehmen …`.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-7",
              no: 7,
              text: "Lücke 7 (Hilfsantrag, Konditional ohne \\\"wenn\\\")",
              accept: ["Sollten", "Sollten Sie wider Erwarten"],
              explain:
                "İkincil talep koşula bağlanıyor ve resmî yazıda koşul `wenn` olmadan, fiil başta kuruluyor: `Sollten Sie an Ihrer Entscheidung festhalten, …`.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-8",
              no: 8,
              text: "Lücke 8 (Präposition zu \\\"bitten\\\")",
              accept: ["um"],
              explain:
                "`bitten` bu anlamda `um` ister: `ich bitte um eine schriftliche Begründung`. Edat düşerse cümle kurulmaz.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-9",
              no: 9,
              text: "Lücke 9 (höfliche Erwartung am Satzende)",
              accept: ["würde ich mich freuen", "wäre ich Ihnen dankbar", "wäre ich dankbar", "freue ich mich"],
              explain:
                "Cümle `Über eine Rückmeldung …` ile başladığı için yüklem sona geçiyor; süre isteği böylece baskı değil rica olarak okunuyor.",
            },
            {
              kind: "gap",
              id: "de-c1-06-s2-10",
              no: 10,
              text: "Lücke 10 (Grußformel)",
              accept: ["Mit freundlichen Grüßen", "Mit freundlichem Gruß", "Hochachtungsvoll"],
              explain:
                "Sigortaya yazılan itiraz `Mit freundlichen Grüßen` ile biter. Veda formülü metnin kaydını belirler: gündelik bir kapanış, dikkatle kurulmuş bir itirazın etkisini düşürür.",
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
          id: "de-c1-06-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wer trägt die Verantwortung für Vorsorge — der Staat oder der Einzelne?\". Gliedern Sie: Einstieg — Begriffsklärung — Lage in Ihrem Herkunftsland — Abwägung — eigene Position — Ausblick.",
          promptTr:
            "\"Önlem almanın sorumluluğu kimde — devlette mi bireyde mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavramı netleştirme — kendi ülkendeki durum — tartma — kendi konumun — kapanış.",
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
              "Ich möchte über die Verteilung der Verantwortung bei der Vorsorge sprechen. Zunächst kläre ich, was ich unter Vorsorge verstehe, dann schildere ich die Lage in meinem Herkunftsland, danach wäge ich ab und komme zu meiner Position. Unter Vorsorge verstehe ich nicht den Vorrat im Keller, sondern die Fähigkeit, eine Störung eine bestimmte Zeit lang auszuhalten. Diese Unterscheidung ist wichtig, weil sie zeigt, dass ein Teil davon prinzipiell nicht privat organisierbar ist: Kein Haushalt kann ein Wasserwerk vorhalten. In Georgien, wo ich aufgewachsen bin, war das lange umgekehrt geregelt. Nach den Ausfällen der neunziger Jahre hat fast jede Familie eigene Reserven angelegt, und die öffentliche Versorgung galt als unzuverlässig. Das hat funktioniert, allerdings mit einem Preis: Wer keine Familie im Ort hatte, war nicht abgesichert. Für die Abwägung heißt das: Private Vorsorge ist sichtbar, sie motiviert und sie erreicht die Menschen dort, wo sie leben. Öffentliche Vorsorge ist wirksamer, aber sie ist unsichtbar, solange sie funktioniert, und wird deshalb zuerst gekürzt. Meine Position ist abgestuft: Der Staat schuldet die Struktur und die Übung, der Einzelne die Kenntnis der eigenen Wohnung. Für die Zukunft erwarte ich, dass die entscheidende Frage nicht mehr lautet, wie viel jemand lagert, sondern wie oft geübt wird — und wer die Ergebnisse zu sehen bekommt.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavram tanımı gerçekten yapıldı mı?",
              "Kendi ülkedeki durum somut ve dönemlendirilmiş mi?",
              "Tartma iki yönlü mü ve her yön gerekçeli mi?",
              "Konum ölçülü mü (dereceli, koşullu) yoksa basit bir taraf tutma mı?",
              "Dil C1'de mi: adlaştırma, ilgi cümleleri, ölçülü ifade araçları?",
              "Dört dakika boyunca konuşma yapısını koruyabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-06-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          minutes: 7,
          prepSeconds: 120,
          prompt:
            "Ihre Gesprächspartnerin vertritt eine Gegenposition. Verteidigen Sie Ihre Sicht, gehen Sie auf Einwände ein und suchen Sie am Ende eine gemeinsame Formulierung. Thema: Sollen kritische Einrichtungen zu regelmäßigen Übungen mit veröffentlichtem Ergebnis verpflichtet werden?",
          promptTr:
            "Karşındaki karşıt bir görüşü savunuyor. Kendi bakışını savun, itirazları ele al ve sonunda ortak bir formül ara. Konu: Kritik kurumlar, sonucu yayımlanan düzenli tatbikatlara zorunlu tutulmalı mı?",
          exchange: [
            {
              who: "partner",
              de: "Eine Veröffentlichungspflicht halte ich für falsch. Wer weiß, dass sein Scheitern öffentlich wird, übt so, dass er besteht. Wie sehen Sie das?",
              tr: "Yayımlama zorunluluğunu yanlış buluyorum. Başarısızlığının kamuya açılacağını bilen, geçecek şekilde tatbikat yapar. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Konumunu ortaya koy ve itirazın haklı yanını da adlandır.",
              expect: "kendi konumunu gerekçelendirerek savunmak ve karşı gerekçenin haklı yanını kabul etmek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das gestehe ich Ihnen zu. Nur: Ohne Veröffentlichung wird gar nicht geübt, sagen Sie. Meine Erfahrung ist eine andere — es wird geübt, aber die Ergebnisse verschwinden in Ordnern.",
              tr: "Bunu size veriyorum. Ama yayımlama olmazsa hiç tatbikat yapılmaz diyorsunuz. Benim deneyimim başka — tatbikat yapılıyor, ama sonuçlar klasörlerde kayboluyor.",
            },
            {
              who: "you",
              hint: "Bu ayrımı ele al ve önlemini buna göre yeniden kur.",
              expect: "bir itirazı kabul edip önlemi yeniden tasarlamak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Angenommen, wir lösen das. Bleibt die Frage der Sicherheit: Wer ein Ergebnis veröffentlicht, verrät auch, wo eine Einrichtung verwundbar ist.",
              tr: "Diyelim bunu çözdük. Geriye güvenlik sorunu kalıyor: Sonucu yayımlayan, kurumun nerede zayıf olduğunu da açık etmiş oluyor.",
            },
            {
              who: "you",
              hint: "Güvenlik itirazını ele al ve ölçülü bir çözüm öner.",
              expect: "şeffaflık ile güvenlik arasında ölçülü bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Versuchen wir eine gemeinsame Formulierung, die wir beide vertreten könnten. Wie würde sie lauten?",
              tr: "Peki. İkimizin de savunabileceği ortak bir formül deneyelim. Nasıl olurdu?",
            },
            {
              who: "you",
              hint: "İki tarafın kabullerini içeren tek bir formül kur.",
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
              "Ihren Einwand teile ich insoweit, als eine Veröffentlichungspflicht die Übung verändern kann. Nur richtet sich meine Forderung nicht auf Bloßstellung, sondern auf Verbindlichkeit: Was ich veröffentlicht sehen möchte, ist nicht das Ergebnis, sondern die Tatsache, dass geübt wurde, und die Liste der daraus abgeleiteten Maßnahmen mit Fristen. Ihr zweiter Punkt trifft dabei genau meinen: Wenn Ergebnisse in Ordnern verschwinden, hilft die Übung niemandem. Deshalb würde ich die Pflicht an die Umsetzung binden, nicht an den Bericht. Zur Sicherheit: Sie haben recht, dass Schwachstellen nicht öffentlich gehören. Das spricht aber nicht gegen die Pflicht, sondern für eine Zweiteilung — der Befund geht an die Aufsicht, die Maßnahmenliste an die Öffentlichkeit. Als gemeinsame Formulierung schlage ich vor: Kritische Einrichtungen üben mindestens alle zwei Jahre; veröffentlicht werden das Datum der Übung und die daraus folgenden Maßnahmen samt Umsetzungsfrist, nicht jedoch die einzelnen Befunde. Eine Pflicht zur Offenlegung von Schwachstellen ist ausdrücklich nicht vorgesehen.",
            criteria: [
              "Konum gerekçelendirildi mi ve konuşma boyunca tutarlı kaldı mı?",
              "İtirazlar gerçekten devralındı mı (kabul edilen kısım adlandırıldı mı)?",
              "Konum, itiraz karşısında uyarlandı mı?",
              "Güvenlik çözümü şeffaflık talebiyle çelişmeden kuruldu mu?",
              "Ortak formül iki tarafın kabullerini de içeriyor ve kesin mi?",
              "Dil C1'de mi: `insoweit als`, `ausdrücklich nicht vorgesehen` gibi kesinlik araçları?",
            ],
          },
        },
      ],
    },
  ],
};
