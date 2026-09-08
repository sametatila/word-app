import type { MockPaper } from "../types";

/**
 * C1 · Deneme 5 — "Erinnerung und Geschichte".
 *
 * PLAN kâğıt 1–4 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (10 özet boşluğu · 10 dört şıklı · 5 boşluklu seçme)
 *   Hören  40 dk · 25 madde   (10 not · 15 üç şıklı)
 *   Schreiben 80 dk           200 kelimelik yazı + 10 boşluklu resmî yazı
 *   Sprechen  15 dk           sunum + karşılıklı tartışma
 *
 * KONU SEÇİMİ: hatırlama, C1'in ölçtüğü ayrımı doğal olarak gerektiriyor —
 * bir metnin neyi savunduğu ile neyi kabul ettiği. Ana metin anma
 * kültürünü savunuyor ve aynı anda kendi aracının sınırını adlandırıyor.
 */
export const C1_05: MockPaper = {
  id: "de-c1-05",
  course: "de",
  level: "C1",
  no: 5,
  theme: "Erinnerung und Geschichte",
  themeTr: "Hafıza ve tarih",
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
          id: "de-c1-05-l1",
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
              title: "Das Gedächtnis der Städte",
              body: `Wer wissen will, woran eine Gesellschaft sich erinnert, sollte nicht ihre Museen besuchen, sondern ihre Straßenschilder lesen. Museen sind Orte der Absicht; Straßennamen sind Ablagerungen. Sie entstehen beiläufig, überdauern politische Wechsel und werden erst dann bemerkt, wenn jemand sie in Frage stellt.

Diese Beiläufigkeit ist der Grund für ihre Wirkung. Ein Denkmal verlangt eine Entscheidung: Man geht hin oder nicht. Ein Straßenname verlangt nichts, er wird täglich mitgesprochen, ohne dass ein Urteil damit verbunden wäre. Gerade dadurch schreibt er sich fester ein als jede Ausstellung.

Umstritten ist deshalb weniger die Vergangenheit als die Gegenwart der Namen. Wer eine Umbenennung fordert, wird regelmäßig darauf hingewiesen, man könne Geschichte nicht auslöschen. Der Einwand geht am Gegenstand vorbei: Ein Straßenname ist keine Aufbewahrung, sondern eine fortlaufende Ehrung. Wer ihn ändert, löscht nichts, sondern beendet eine Auszeichnung.

Gleichwohl wäre es zu einfach, die Frage allein moralisch zu führen. Untersuchungen zu Umbenennungen in mehreren europäischen Städten zeigen einen Befund, der beide Lager irritiert: Nach etwa fünfzehn Jahren erinnert kaum jemand mehr, wie eine Straße vorher hieß, und zwar unabhängig davon, wie heftig der Streit zuvor war. Die Erregung ist erheblich, die Halbwertszeit gering.

Daraus folgt für manche, das Ganze sei Symbolpolitik. Diese Schlussfolgerung übersieht, dass die Debatte selbst der Vorgang ist, um den es geht. In den Anhörungen kommen Familien zu Wort, deren Geschichte in keinem Lehrbuch steht; Stadtarchive verzeichnen in solchen Jahren regelmäßig ein Vielfaches der üblichen Anfragen. Erinnerung entsteht nicht am Ende des Verfahrens, sondern in ihm.

Zu warnen ist indes vor der Vorstellung, ein Name ließe sich vollständig ersetzen. Was bleibt, ist der Bruch: die Erinnerung daran, dass hier etwas geändert wurde. Ein neuer Name trägt den alten als Abwesenheit mit sich, und diese Abwesenheit ist präziser als jede Tafel.

Für die Praxis folgt daraus eine unbequeme Empfehlung. Kommunen sollten Umbenennungen nicht als Verwaltungsakt behandeln, der möglichst geräuschlos abzuwickeln ist, sondern als das, was sie tatsächlich sind: das einzige Verfahren, in dem eine Stadt öffentlich über ihre eigene Herkunft streitet.`,
              gloss: [
                { de: "die Ablagerung", tr: "birikinti, tortu", en: "sediment, deposit" },
                { de: "die Beiläufigkeit", tr: "gelişigüzellik, kendiliğindenlik", en: "casualness" },
                { de: "die Ehrung", tr: "onurlandırma", en: "honouring" },
                { de: "die Halbwertszeit", tr: "yarılanma ömrü", en: "half-life" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              title: "Zusammenfassung mit Lücken",
              body: `Woran eine Gesellschaft sich erinnert, zeigt sich nach diesem Text weniger in Museen als in ihren {{1}}. Museen sind Orte der Absicht, Straßennamen dagegen entstehen {{2}} und fallen erst auf, wenn jemand sie bestreitet.

Genau darin liegt ihre {{3}}: Ein Denkmal verlangt eine Entscheidung, ein Name verlangt nichts und wird trotzdem täglich {{4}}.

Der Einwand, man könne Geschichte nicht auslöschen, trifft nach dem Text nicht zu, weil ein Straßenname keine Aufbewahrung ist, sondern eine fortlaufende {{5}}. Wer ihn ändert, beendet also eine {{6}}.

Untersuchungen zeigen allerdings, dass nach etwa {{7}} Jahren kaum jemand den früheren Namen erinnert. Der Text schließt daraus nicht, dass alles bloße Symbolpolitik sei, denn der eigentliche Vorgang ist die {{8}} selbst; in solchen Jahren steigt auch die Zahl der Anfragen an die {{9}}.

Vollständig ersetzen lässt sich ein Name jedoch nicht: Was bleibt, ist der {{10}}, also die Erinnerung an die Änderung.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-05-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Straßennamen", "Straßenschildern", "Straßen"],
              explain:
                "Metin ilk cümlede karşıtlığı kuruyor: müzeleri değil \"ihre Straßenschilder lesen\". Özet aynı karşıtlığı yineliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["beiläufig", "zufällig", "nebenbei", "ungeplant"],
              explain:
                "\"Sie entstehen beiläufig\" — kasıtlı bir tasarımın değil, kendiliğinden bir birikimin ürünü.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Wirkung", "Stärke", "Kraft", "Wirksamkeit"],
              explain:
                "İkinci paragraf başlıyor: \"Diese Beiläufigkeit ist der Grund für ihre Wirkung\". Özet bu nedenselliği tek sözcüğe indiriyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["mitgesprochen", "ausgesprochen", "gesprochen", "wiederholt"],
              explain:
                "Metin \"er wird täglich mitgesprochen\" diyor ve buna bir yargının eşlik etmediğini ekliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Ehrung", "Auszeichnung", "Würdigung"],
              explain:
                "Metnin karşı savı: sokak adı bir saklama değil, \"eine fortlaufende Ehrung\". Bu ayrım itirazı geçersiz kılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Auszeichnung", "Ehrung", "Würdigung"],
              explain:
                "Aynı paragrafın sonucu: değiştiren kişi hiçbir şey silmiyor, \"beendet eine Auszeichnung\".",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["fünfzehn", "15"],
              explain:
                "Sayı metinde: \"Nach etwa fünfzehn Jahren erinnert kaum jemand mehr, wie eine Straße vorher hieß\".",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Debatte", "Auseinandersetzung", "Diskussion", "Anhörung"],
              explain:
                "Metin sonucu tersine çeviriyor: \"die Debatte selbst der Vorgang ist, um den es geht\". Hafıza sürecin sonunda değil içinde oluşuyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Stadtarchive", "Archive", "Stadtarchiv", "Archiv"],
              explain:
                "\"Stadtarchive verzeichnen in solchen Jahren regelmäßig ein Vielfaches der üblichen Anfragen\" — tartışma yıllarında başvurular katlanıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Bruch", "Riss"],
              explain:
                "Son bölümün kavramı: \"Was bleibt, ist der Bruch\" — yeni ad eskisini bir yokluk olarak taşıyor.",
            },
          ],
        },
        {
          id: "de-c1-05-l2",
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
              title: "Der Name über dem Eingang",
              body: `Die Sitzung, in der über den Namen der Schule entschieden werden sollte, dauerte vier Stunden und endete ohne Beschluss. Das war, wie sich später zeigte, das Beste, was passieren konnte.

Angefangen hatte es mit einer Facharbeit. Merle Krautwig, damals in der elften Klasse, hatte über den Namensgeber ihrer Schule geschrieben, einen Mediziner aus der Region, dessen Straßenzug, Krankenhausflügel und eben Schule seinen Namen tragen. In den Akten des Landesarchivs fand sie Anträge aus den Jahren 1936 bis 1939, die sie zunächst nicht einordnen konnte. Ihre Lehrerin riet ihr, einen Historiker anzuschreiben. Zwei Monate später stand fest, worum es sich handelte.

Die Reaktion der Schule war zunächst zurückhaltend. Man dankte für die Arbeit, verwies auf den Umfang der Frage und richtete eine Arbeitsgruppe ein. Krautwig, die inzwischen studierte, hielt das für eine Beerdigung erster Klasse. Rückblickend urteilt sie milder: "Die Arbeitsgruppe hat zwei Jahre gebraucht und dabei mehr Leute erreicht als jede schnelle Entscheidung."

Was in diesen zwei Jahren geschah, ist der eigentliche Vorgang. Die Gruppe lud Zeitzeugen ein, von denen die letzten inzwischen weit über neunzig waren. Sie öffnete das Archiv für Schülerinnen und Schüler, die zuvor kaum wussten, dass es eines gab. Sie stieß dabei auf eine zweite Geschichte, mit der niemand gerechnet hatte: Zwei Lehrkräfte derselben Schule hatten 1938 Familien geholfen, und auch das stand in keinem Jahrbuch.

Widerstand kam nicht, wie erwartet, von den Älteren. Der Vorsitzende des Ehemaligenvereins, achtundsiebzig, unterstützte die Umbenennung vom ersten Tag an; er habe, sagt er, "das Gefühl gehabt, in eine Frage einbezogen zu werden, statt über sie belehrt zu werden". Skeptisch waren dagegen Eltern jüngerer Jahrgänge, die einen Nachteil für Bewerbungen fürchteten, sowie ein Teil des Kollegiums, der die Arbeitszeit anderswo besser aufgehoben sah.

Die Kosten wurden früh zum Argument. Ein neues Schild, neue Zeugnisformulare, neue Stempel: zusammen etwa elftausend Euro. Der Kämmerer der Stadt rechnete öffentlich vor, dass dieselbe Summe zwei Schulsozialarbeiterstunden pro Woche für ein Jahr finanziere. Diese Rechnung war korrekt und wurde von der Arbeitsgruppe nicht bestritten, sondern beantwortet: Man beantragte beides und bekam beides, weil der Vorgang inzwischen öffentlich war.

Beschlossen wurde schließlich nicht der Vorschlag, mit dem alles begonnen hatte. Statt eines neuen Namenspatrons trägt die Schule heute den Namen der Straße, in der sie steht. Krautwig, die an der Abstimmung nicht mehr teilnahm, nennt das "die einzige Lösung, die niemanden zum Sieger macht". Ob das ein Kompliment ist, lässt sie offen.

Ein Jahr später hat die Schule etwas eingeführt, das in keinem Antrag stand. In der neunten Klasse arbeitet jeder Jahrgang eine Woche im Stadtarchiv. Die Leiterin sagt, das sei der einzige Teil des Verfahrens, den sie unbedingt behalten wolle. Über den Namen spreche ohnehin niemand mehr — und genau daran erkenne man, dass er passe.`,
              gloss: [
                { de: "die Facharbeit", tr: "araştırma ödevi", en: "research paper" },
                { de: "der Namensgeber", tr: "adı verilen kişi", en: "namesake" },
                { de: "der Zeitzeuge", tr: "dönemin tanığı", en: "contemporary witness" },
                { de: "der Kämmerer", tr: "belediye mali işler müdürü", en: "city treasurer" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-05-l2-11",
              no: 11,
              ref: "t2",
              text: "Wie bewertet der Text den ergebnislosen Ausgang der ersten Sitzung?",
              options: [
                "Als vermeidbaren Fehler der Schulleitung.",
                "Als glücklichen Umstand.",
                "Als Zeichen mangelnden Interesses.",
                "Als Folge unklarer Zuständigkeiten.",
              ],
              answer: 1,
              explain:
                "Metin daha ikinci cümlede değerlendiriyor: \"das Beste, was passieren konnte\". Sonuçsuzluk kusur değil, sürecin başlangıcı.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-12",
              no: 12,
              ref: "t2",
              text: "Wie kam Merle Krautwig auf die Sache?",
              options: [
                "Durch einen Hinweis aus dem Ehemaligenverein.",
                "Durch eine Anfrage des Landesarchivs.",
                "Durch Unterlagen, die sie zunächst nicht deuten konnte.",
                "Durch einen Zeitungsbericht über den Namensgeber.",
              ],
              answer: 2,
              explain:
                "Arşivde 1936–1939 arası dilekçeler bulmuş ve \"die sie zunächst nicht einordnen konnte\". Anlam ancak bir tarihçiye yazdıktan sonra netleşmiş.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-13",
              no: 13,
              ref: "t2",
              text: "Wie hat sich Krautwigs Urteil über die Arbeitsgruppe verändert?",
              options: [
                "Von Zustimmung zu Enttäuschung.",
                "Es ist unverändert geblieben.",
                "Von Ablehnung zu einer milderen Einschätzung.",
                "Von Gleichgültigkeit zu Begeisterung.",
              ],
              answer: 2,
              explain:
                "Önce \"eine Beerdigung erster Klasse\" saymış; sonra \"Rückblickend urteilt sie milder\" ve grubun hızlı bir karardan çok kişiye ulaştığını kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-14",
              no: 14,
              ref: "t2",
              text: "Was war das unerwartete Ergebnis der Archivarbeit?",
              options: [
                "Eine zweite, bislang unbekannte Geschichte.",
                "Ein Fehler in der ursprünglichen Facharbeit.",
                "Eine Verbindung zu einer anderen Schule.",
                "Ein Nachlass des Namensgebers.",
              ],
              answer: 0,
              explain:
                "Grup \"eine zweite Geschichte, mit der niemand gerechnet hatte\" bulmuş: 1938'de iki öğretmenin ailelere yardım etmesi, hiçbir yıllıkta yazmıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-15",
              no: 15,
              ref: "t2",
              text: "Von wem kam der Widerstand?",
              options: [
                "Vor allem von den ältesten Ehemaligen.",
                "Vor allem aus der Arbeitsgruppe selbst.",
                "Von der Stadtverwaltung.",
                "Von jüngeren Eltern und Lehrkräften.",
              ],
              answer: 3,
              explain:
                "Beklenenin tersine yaşlılardan gelmemiş: \"Der Vorsitzende des Ehemaligenvereins, achtundsiebzig, unterstützte die Umbenennung vom ersten Tag an\"; şüpheci olanlar genç veliler ve öğretmenlerin bir bölümü.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-16",
              no: 16,
              ref: "t2",
              text: "Womit begründet der Vorsitzende seine Zustimmung?",
              options: [
                "Mit seiner eigenen Familiengeschichte.",
                "Mit der Art, wie er beteiligt wurde.",
                "Mit dem Ansehen der Schule.",
                "Mit dem Wunsch der Schülerschaft.",
              ],
              answer: 1,
              explain:
                "Kendi cümlesi biçime dair: \"in eine Frage einbezogen zu werden, statt über sie belehrt zu werden\". Belirleyici olan içerik değil, katılım biçimi.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-17",
              no: 17,
              ref: "t2",
              text: "Wie reagierte die Arbeitsgruppe auf die Kostenrechnung des Kämmerers?",
              options: [
                "Sie bestritt die Zahlen.",
                "Sie verwies auf eine Spendenaktion.",
                "Sie ließ die Rechnung unbeantwortet.",
                "Sie beantragte beide Posten gemeinsam.",
              ],
              answer: 3,
              explain:
                "Hesap doğru kabul edilmiş ve \"beantwortet\": grup ikisini birden istemiş ve süreç kamuya mal olduğu için ikisini birden almış.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-18",
              no: 18,
              ref: "t2",
              text: "Was wurde am Ende beschlossen?",
              options: [
                "Die Adresse als Namensgeber.",
                "Der ursprünglich vorgeschlagene Namenspatron.",
                "Die Beibehaltung des Namens der Schule.",
                "Ein Doppelname aus altem und neuem Patron.",
              ],
              answer: 0,
              explain:
                "Başlangıçtaki öneri kabul edilmemiş; okul bugün \"den Namen der Straße, in der sie steht\" taşıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-19",
              no: 19,
              ref: "t2",
              text: "Wie ist Krautwigs Formulierung über die Lösung zu verstehen?",
              options: [
                "Als eindeutiges Lob des Ergebnisses.",
                "Als klare Ablehnung des Kompromisses.",
                "Als bewusst offen gehaltene Wertung.",
                "Als Kritik am Verfahren der Abstimmung.",
              ],
              answer: 2,
              explain:
                "\"die einzige Lösung, die niemanden zum Sieger macht\" diyor ve metin ekliyor: \"Ob das ein Kompliment ist, lässt sie offen\".",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l2-20",
              no: 20,
              ref: "t2",
              text: "Woran erkennt die Schulleiterin, dass der neue Name passt?",
              options: [
                "An der Zahl der Anfragen im Archiv.",
                "Daran, dass er nicht mehr auffällt.",
                "An den Rückmeldungen der Ehemaligen.",
                "An der Berichterstattung in der Presse.",
              ],
              answer: 1,
              explain:
                "Son cümle ölçütü veriyor: adı artık kimse konuşmuyor — \"und genau daran erkenne man, dass er passe\".",
            },
          ],
        },
        {
          id: "de-c1-05-l3",
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
              title: "Die stille Konjunktur der Archive",
              body: `Seit einigen Jahren melden kommunale Archive steigende Besucherzahlen — {{21}} ihre Etats im selben Zeitraum vielerorts gekürzt worden sind.

Über die Gründe wird gestritten. Am häufigsten genannt wird die Digitalisierung, und tatsächlich sind Findbücher heute online einsehbar. Belege für einen unmittelbaren Zusammenhang sind {{22}} dünn; in mehreren Städten stiegen die Zahlen bereits vor der Umstellung.

Aufschlussreicher ist ein Blick darauf, wer kommt. Es sind nicht vorrangig Fachleute, {{23}} Privatpersonen, die einer Familiengeschichte nachgehen. Für sie ist das Archiv kein Forschungsort, sondern ein Ort der Selbstvergewisserung.

Fachlich ist das nicht unproblematisch. Wer nach der eigenen Familie sucht, sucht selten ergebnisoffen. {{24}} wäre es falsch, daraus einen Einwand gegen die Öffnung zu machen: Dieselben Besucher stellen nach einigen Wochen Fragen, die sie am Anfang nicht hätten stellen können.

Am Ende dürfte weniger die Frage entscheidend sein, wie viele kommen, {{25}} ob die Häuser Personal haben, das ihnen antwortet.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-05-l3-21",
              no: 21,
              text: "Lücke 21",
              options: ["obwohl", "sofern", "indem", "damit"],
              answer: 0,
              explain:
                "Cümle bir karşıtlık kuruyor: ziyaret artıyor, bütçe kısılıyor. `obwohl` bu ödünü verir; `sofern` koşul, `indem` araç, `damit` amaç bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l3-22",
              no: 22,
              text: "Lücke 22",
              options: ["ohnehin", "gleichwohl", "insofern", "immerhin"],
              answer: 1,
              explain:
                "Dijitalleşme kabul ediliyor, ama kanıtlar zayıf: ödünlü bir geçiş gerekiyor. `gleichwohl` bunu kurar; ötekiler zaten olanı, sınırlamayı ya da asgari tesellîyi bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l3-23",
              no: 23,
              text: "Lücke 23",
              options: ["zumal", "sondern", "vielmehr", "geschweige denn"],
              answer: 1,
              explain:
                "Önce olumsuzlanan bir varsayım var (\"nicht vorrangig Fachleute\"), sonra düzeltme geliyor. Bu yapı `nicht … sondern` ister.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l3-24",
              no: 24,
              text: "Lücke 24",
              options: ["Insofern", "Folglich", "Dennoch", "Mithin"],
              answer: 2,
              explain:
                "Önceki cümle bir sakınca sayıyor, boşluk buna rağmen gelen yargıyı açıyor. `Dennoch` bu ödünü kurar; ötekiler sonuç ya da sınırlama bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-l3-25",
              no: 25,
              text: "Lücke 25",
              options: ["als", "wie", "denn", "sondern"],
              answer: 0,
              explain:
                "Kalıp `weniger … als`: belirleyici olan kaç kişinin geldiği değil, personelin olup olmadığı. `wie` eşitlik, `denn` gerekçe kurar.",
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
          id: "de-c1-05-h1",
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
              title: "Das Stadtarchiv nutzen — Informationsabend",
              situation: "Bir arşiv çalışanı kurumu tanıtıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Antje Vollrath, ich leite den Lesesaal, und ich stelle Ihnen heute vor, wie Sie bei uns arbeiten können. Ich brauche etwa zwanzig Minuten; Fragen sammeln wir danach.",
                },
                {
                  text: "Zunächst zum Bestand. Wir verwahren rund zwölf Regalkilometer, davon ist etwa ein Fünftel erschlossen. Das klingt wenig und ist im Bundesvergleich überdurchschnittlich. Was nicht erschlossen ist, existiert für die Suche praktisch nicht.",
                },
                {
                  text: "Zur Benutzung: Der Lesesaal steht allen ab sechzehn Jahren offen, eine Anmeldung ist nicht nötig. Für Unterlagen, die jünger als dreißig Jahre sind, brauchen Sie allerdings einen schriftlichen Antrag mit Angabe des Zwecks.",
                },
                {
                  text: "Was Sie mitbringen dürfen: Bleistift, Laptop und Kamera ohne Blitz. Nicht erlaubt sind Kugelschreiber, Taschen und Getränke. Schließfächer stehen im Erdgeschoss.",
                },
                {
                  text: "Zur Bestellung. Sie bestellen im Voraus über das Portal, bis spätestens zwölf Uhr am Vortag. Pro Tag geben wir höchstens zehn Einheiten aus. Wer ohne Bestellung kommt, kann nur die Bibliothek nutzen.",
                },
                {
                  text: "Reproduktionen: Selbst fotografieren ist kostenlos. Bestellen Sie dagegen einen Scan bei uns, kostet er drei Euro pro Seite. Für Veröffentlichungen brauchen Sie zusätzlich eine schriftliche Genehmigung, und die ist gebührenfrei.",
                },
                {
                  text: "Ein Punkt, der oft übersehen wird: Personenbezogene Unterlagen unterliegen einer Schutzfrist von zehn Jahren nach dem Tod. Ist das Sterbedatum unbekannt, rechnen wir hundert Jahre nach der Geburt.",
                },
                {
                  text: "Und schließlich: Wir beraten Sie gern, aber wir recherchieren nicht für Sie. Eine Auftragsrecherche ist möglich und kostet fünfundvierzig Euro pro Stunde. Die meisten Anfragen erledigen sich in der Beratung von selbst, deshalb kommen Sie ruhig zuerst her.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizzettel",
              genreTr: "Not kâğıdı",
              title: "Notizen — Stadtarchiv",
              body: `Bestand: 12 Regalkilometer, erschlossen: {{1}}.

Lesesaal: offen ab {{2}}, Anmeldung {{3}}.
Unterlagen jünger als 30 Jahre: {{4}} nötig.

Erlaubt: Bleistift, Laptop, Kamera ohne Blitz.
Nicht erlaubt: {{5}}.

Bestellung über Portal bis {{6}}; höchstens {{7}} pro Tag.

Selbst fotografieren: kostenlos. Scan durch das Archiv: {{8}}.

Schutzfrist personenbezogen: 10 Jahre nach dem Tod,
sonst {{9}}.

Auftragsrecherche: {{10}} — Beratung reicht meistens.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-05-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["ein Fünftel", "Fünftel", "etwa ein Fünftel", "20 Prozent"],
              explain:
                "Konuşma oranı veriyor: \"davon ist etwa ein Fünftel erschlossen\" ve bunun ülke ortalamasının üstünde olduğunu ekliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["16 Jahren", "sechzehn Jahren", "16", "sechzehn"],
              explain:
                "Yaş sınırı açık: \"Der Lesesaal steht allen ab sechzehn Jahren offen\".",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["nicht nötig", "nicht erforderlich", "entfällt", "keine"],
              explain:
                "Aynı cümlede: \"eine Anmeldung ist nicht nötig\". Yazılı başvuru yalnız yeni belgeler için gerekiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: [
                "schriftlicher Antrag",
                "ein schriftlicher Antrag",
                "Antrag mit Zweckangabe",
                "schriftlicher Antrag mit Zweck",
              ],
              explain:
                "Otuz yıldan yeni belgeler için \"einen schriftlichen Antrag mit Angabe des Zwecks\" isteniyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: [
                "Kugelschreiber, Taschen, Getränke",
                "Kugelschreiber und Taschen",
                "Kugelschreiber, Taschen und Getränke",
              ],
              explain:
                "Yasak listesi üç kalem: \"Kugelschreiber, Taschen und Getränke\". Dolaplar zemin katta.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["12 Uhr am Vortag", "zwölf Uhr am Vortag", "Vortag 12 Uhr", "12 Uhr Vortag"],
              explain:
                "Sipariş süresi: \"bis spätestens zwölf Uhr am Vortag\". Sonrasında yalnız kütüphane kullanılabiliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["zehn Einheiten", "10 Einheiten", "zehn", "10"],
              explain:
                "Günlük üst sınır: \"Pro Tag geben wir höchstens zehn Einheiten aus\".",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["3 Euro pro Seite", "drei Euro pro Seite", "3 Euro/Seite", "drei Euro je Seite"],
              explain:
                "Kendi çekimi ücretsiz; arşivden tarama istenirse \"drei Euro pro Seite\". Yayın izni ise ücretsiz.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: [
                "100 Jahre nach Geburt",
                "hundert Jahre nach Geburt",
                "100 Jahre ab Geburt",
                "hundert Jahre",
              ],
              explain:
                "Ölüm tarihi bilinmiyorsa \"rechnen wir hundert Jahre nach der Geburt\" deniyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["45 Euro pro Stunde", "fünfundvierzig Euro pro Stunde", "45 Euro/Stunde", "45 Euro je Stunde"],
              explain:
                "Sipariş üzerine araştırma \"fünfundvierzig Euro pro Stunde\"; ama çoğu soru danışmada kendiliğinden çözülüyor.",
            },
          ],
        },
        {
          id: "de-c1-05-h2",
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
              situation: "Üç konuk anma kültürünü tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Unser Thema ist das Erinnern. Frau Bergk, Sie forschen dazu. Erleben wir zu viel oder zu wenig Erinnerungskultur?",
                },
                {
                  speaker: "Frau Bergk",
                  text: "Die Frage setzt eine Menge voraus, die es nicht gibt. Wir haben nicht zu viel Erinnerung, wir haben zu viele Anlässe und zu wenige Verfahren. Ein Gedenktag verpflichtet zu nichts; ein Verfahren zwingt Menschen, miteinander zu sprechen.",
                },
                { speaker: "Moderatorin", text: "Herr Ellinghaus, Sie sind Kommunalpolitiker." },
                {
                  speaker: "Herr Ellinghaus",
                  text: "Aus der Praxis kann ich das bestätigen, mit einer Einschränkung. Verfahren kosten Zeit, und Zeit ist in einem Rat die knappste Ressource. Wir haben für eine Umbenennung zwei Jahre gebraucht — in denselben zwei Jahren ist eine Kita nicht saniert worden.",
                },
                { speaker: "Moderatorin", text: "Herr Dr. Mahler, Sie leiten ein Museum." },
                {
                  speaker: "Herr Dr. Mahler",
                  text: "Ich halte diese Gegenrechnung für unzulässig. Nach derselben Logik dürfte man auch keine Bibliothek betreiben. Was mich an der Debatte stört, ist etwas anderes: Museen werden als Lösung behandelt, obwohl sie das Problem nur verwahren.",
                },
                {
                  speaker: "Frau Bergk",
                  text: "Diesem Punkt stimme ich zu, und er ist unangenehm für mein eigenes Fach. Ausstellungen erreichen die, die ohnehin kommen. Die Wirkung entsteht dort, wo Menschen nicht freiwillig sind — in der Schule, im Betrieb, im Stadtrat.",
                },
                { speaker: "Moderatorin", text: "Herr Ellinghaus, was folgt daraus für Ihre Arbeit?" },
                {
                  speaker: "Herr Ellinghaus",
                  text: "Dass ich Verfahren nicht mehr abkürze. Früher habe ich versucht, solche Fragen schnell zu erledigen, um Streit zu vermeiden. Das Ergebnis war jedes Mal, dass der Streit später kam und heftiger.",
                },
                {
                  speaker: "Herr Dr. Mahler",
                  text: "Wobei ich davor warnen würde, daraus eine Regel zu machen. Es gibt Fälle, in denen ein langes Verfahren die Betroffenen zermürbt. Wer neunzig ist, hat keine zwei Jahre für eine Anhörung.",
                },
                {
                  speaker: "Frau Bergk",
                  text: "Ein berechtigter Einwand. Deshalb unterscheide ich zwischen Verfahren, die etwas klären sollen, und solchen, die etwas anerkennen sollen. Anerkennung darf nicht dauern.",
                },
                { speaker: "Moderatorin", text: "Kommen wir zum Geld. Reicht es?" },
                {
                  speaker: "Herr Dr. Mahler",
                  text: "Es reicht für Gebäude und nicht für Menschen. Mein Haus hat eine neue Klimaanlage und eine halbe Stelle für Vermittlung. Das Verhältnis beschreibt die Prioritäten besser als jede Rede.",
                },
                {
                  speaker: "Herr Ellinghaus",
                  text: "Da widerspreche ich nicht, nur ist das kein Erinnerungsproblem, sondern ein allgemeines. Für Personal gibt es nirgends Geld, für Beton überall.",
                },
                {
                  speaker: "Frau Bergk",
                  text: "Und trotzdem ist es hier folgenreicher. Ein Gebäude ohne Vermittlung ist ein Lager. Erinnerung ist keine Sache, sondern eine Tätigkeit.",
                },
                { speaker: "Moderatorin", text: "Zum Schluss bitte je eine Maßnahme." },
                {
                  speaker: "Herr Ellinghaus",
                  text: "Jede Kommune sollte für solche Verfahren einen festen Ablauf haben. Dann muss man nicht jedes Mal über das Wie streiten.",
                },
                {
                  speaker: "Frau Bergk",
                  text: "Ich würde die Archive besser ausstatten. Ohne sie ist jede Debatte eine Meinungssache.",
                },
                {
                  speaker: "Herr Dr. Mahler",
                  text: "Und ich würde Schulklassen verpflichtend in die Archive schicken, nicht in die Museen. Bei uns sehen sie Ergebnisse, dort sehen sie Fragen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-05-h2-11",
              no: 11,
              ref: "d1",
              text: "Wie beantwortet Frau Bergk die Eingangsfrage?",
              options: [
                "Sie hält die Frage für falsch gestellt.",
                "Sie sagt, es gebe zu viel Erinnerungskultur.",
                "Sie sagt, es gebe eindeutig zu wenig.",
              ],
              answer: 0,
              explain:
                "\"Die Frage setzt eine Menge voraus, die es nicht gibt\" diyor ve ölçüyü değiştiriyor: sorun miktar değil, çok anma günü ve az usul.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-12",
              no: 12,
              ref: "d1",
              text: "Worin unterscheidet sie Gedenktag und Verfahren?",
              options: [
                "Der Gedenktag ist teurer.",
                "Das Verfahren zwingt zum Gespräch.",
                "Der Gedenktag erreicht mehr Menschen.",
              ],
              answer: 1,
              explain:
                "\"Ein Gedenktag verpflichtet zu nichts; ein Verfahren zwingt Menschen, miteinander zu sprechen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-13",
              no: 13,
              ref: "d1",
              text: "Welche Einschränkung macht Herr Ellinghaus?",
              options: [
                "Verfahren führen selten zu einem Ergebnis.",
                "Verfahren sind rechtlich angreifbar.",
                "Verfahren binden knappe Zeit.",
              ],
              answer: 2,
              explain:
                "Uygulamadan onaylıyor ama ekliyor: \"Zeit ist in einem Rat die knappste Ressource\"; iki yıllık süreçte bir kreş yenilenmemiş.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-14",
              no: 14,
              ref: "d1",
              text: "Wie bewertet Herr Dr. Mahler diese Gegenrechnung?",
              options: [
                "Als unzulässig.",
                "Als richtig, aber übertrieben.",
                "Als kommunalpolitisch unvermeidlich.",
              ],
              answer: 0,
              explain:
                "\"Ich halte diese Gegenrechnung für unzulässig\" diyor: aynı mantıkla kütüphane de işletilemezdi.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-15",
              no: 15,
              ref: "d1",
              text: "Was kritisiert er an der Rolle der Museen?",
              options: [
                "Sie sind zu wenig besucht.",
                "Sie gelten als Lösung, verwahren aber nur.",
                "Sie arbeiten fachlich zu ungenau.",
              ],
              answer: 1,
              explain:
                "\"Museen werden als Lösung behandelt, obwohl sie das Problem nur verwahren\" — kendi kurumuna yönelik bir eleştiri.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-16",
              no: 16,
              ref: "d1",
              text: "Warum ist dieser Punkt für Frau Bergk unangenehm?",
              options: [
                "Weil er ihr eigenes Fach trifft.",
                "Weil er ihre Daten in Frage stellt.",
                "Weil er von einem Museumsleiter kommt.",
              ],
              answer: 0,
              explain:
                "\"er ist unangenehm für mein eigenes Fach\" diyor: sergiler zaten gelenlere ulaşıyor, etki gönüllü olmayan yerlerde doğuyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-17",
              no: 17,
              ref: "d1",
              text: "Wo entsteht nach ihr die Wirkung?",
              options: [
                "In Ausstellungen mit freiem Eintritt.",
                "An Orten mit Anwesenheitspflicht.",
                "In der Berichterstattung der Medien.",
              ],
              answer: 1,
              explain:
                "\"Die Wirkung entsteht dort, wo Menschen nicht freiwillig sind\" — okul, işletme, belediye meclisi.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-18",
              no: 18,
              ref: "d1",
              text: "Was hat Herr Ellinghaus aus seiner Erfahrung gelernt?",
              options: [
                "Verfahren früher zu beenden.",
                "Verfahren nicht mehr abzukürzen.",
                "Verfahren an Externe zu vergeben.",
              ],
              answer: 1,
              explain:
                "Eskiden tartışmayı önlemek için hızlandırırmış; sonuç her seferinde \"dass der Streit später kam und heftiger\" olmuş.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-19",
              no: 19,
              ref: "d1",
              text: "Wovor warnt Herr Dr. Mahler?",
              options: [
                "Vor einer allgemeinen Regel.",
                "Vor zu kurzen Anhörungen.",
                "Vor der Beteiligung von Laien.",
              ],
              answer: 0,
              explain:
                "Bundan bir kural çıkarılmasına karşı uyarıyor: \"Es gibt Fälle, in denen ein langes Verfahren die Betroffenen zermürbt\" — doksanındaki birinin iki yılı yok.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-20",
              no: 20,
              ref: "d1",
              text: "Welche Unterscheidung führt Frau Bergk daraufhin ein?",
              options: [
                "Zwischen kommunalen und staatlichen Verfahren.",
                "Zwischen Klärung und Anerkennung.",
                "Zwischen schriftlichen und mündlichen Verfahren.",
              ],
              answer: 1,
              explain:
                "İtirazı haklı buluyor ve ayrımı kuruyor: bir şeyi açıklığa kavuşturan usuller ile tanıyan usuller. \"Anerkennung darf nicht dauern.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie beschreibt Herr Dr. Mahler die Finanzlage seines Hauses?",
              options: [
                "Es fehlt Geld für Gebäude.",
                "Es fehlt Geld für beides gleichermaßen.",
                "Es reicht für Gebäude, nicht für Personal.",
              ],
              answer: 2,
              explain:
                "Yeni bir klima ve yarım kadro örneğini veriyor: \"Das Verhältnis beschreibt die Prioritäten besser als jede Rede.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-22",
              no: 22,
              ref: "d1",
              text: "Wie ordnet Herr Ellinghaus dieses Problem ein?",
              options: [
                "Als allgemeines, nicht als Erinnerungsproblem.",
                "Als Folge falscher Prioritäten im Museum.",
                "Als vorübergehende Haushaltslage.",
              ],
              answer: 0,
              explain:
                "Karşı çıkmıyor ama genelleştiriyor: \"Für Personal gibt es nirgends Geld, für Beton überall.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-23",
              no: 23,
              ref: "d1",
              text: "Warum hält Frau Bergk es hier für folgenreicher?",
              options: [
                "Weil Gebäude schneller verfallen.",
                "Weil Erinnerung eine Tätigkeit ist.",
                "Weil die Kosten hier höher sind.",
              ],
              answer: 1,
              explain:
                "\"Ein Gebäude ohne Vermittlung ist ein Lager. Erinnerung ist keine Sache, sondern eine Tätigkeit.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-24",
              no: 24,
              ref: "d1",
              text: "Welche Maßnahme nennt Herr Ellinghaus zum Schluss?",
              options: [
                "Eine bessere Ausstattung der Archive.",
                "Verpflichtende Archivbesuche für Schulen.",
                "Einen festen Ablauf für solche Verfahren.",
              ],
              answer: 2,
              explain:
                "Her belediyenin sabit bir usulü olmasını istiyor: \"Dann muss man nicht jedes Mal über das Wie streiten.\" Öteki iki öneri Bergk ve Mahler'e ait.",
            },
            {
              kind: "mcq",
              id: "de-c1-05-h2-25",
              no: 25,
              ref: "d1",
              text: "Womit begründet Herr Dr. Mahler seinen Vorschlag?",
              options: [
                "Im Archiv begegnen Schüler Fragen statt Ergebnissen.",
                "Archive sind für Schulen leichter erreichbar.",
                "Museen sind für Jugendliche zu teuer.",
              ],
              answer: 0,
              explain:
                "Kendi kurumunu geri plana atıyor: \"Bei uns sehen sie Ergebnisse, dort sehen sie Fragen.\"",
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
          id: "de-c1-05-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Eine Fachzeitschrift veröffentlicht eine Reihe mit dem Titel \"Erinnern — wer entscheidet?\". Schreiben Sie einen Beitrag von etwa 200 Wörtern. Behandeln Sie alle fünf Leitpunkte und stellen Sie zwischen ihnen einen Zusammenhang her.",
          promptTr:
            "Bir meslek dergisi \"Hatırlamak — kim karar verir?\" başlıklı bir dizi yayımlıyor. Yaklaşık 200 kelimelik bir yazı yaz. Beş yönlendirme noktasının hepsini işle ve aralarında bağ kur.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Beschreiben Sie die Ausgangslage.", tr: "Çıkış durumunu betimle." },
              { de: "Nennen Sie zwei Gründe für den Streit um Denkmäler und Namen.", tr: "Anıtlar ve adlar üzerine tartışmanın iki nedenini söyle." },
              { de: "Stellen Sie die Lage in Ihrem Herkunftsland gegenüber.", tr: "Kendi ülkendeki durumla karşılaştır." },
              { de: "Wägen Sie Bewahren und Verändern ab.", tr: "Korumak ile değiştirmeyi tart." },
              { de: "Formulieren Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuç yaz." },
            ],
            sample: `Wer über Denkmäler streitet, streitet selten über die Vergangenheit. Verhandelt wird, wen eine Stadt heute noch ehren möchte — und diese Frage lässt sich nicht historisch entscheiden.

Zwei Gründe erklären die Schärfe der Auseinandersetzungen. Zum einen sind Namen und Standbilder beiläufig entstanden; sie werden erst sichtbar, wenn jemand sie bestreitet, und wirken deshalb wie ein Angriff auf etwas Selbstverständliches. Zum anderen fehlt in den meisten Kommunen ein festes Verfahren, sodass jedes Mal zunächst über das Wie gestritten wird, bevor man zur Sache kommt.

In meinem Herkunftsland stellt sich die Lage anders dar. Dort wurden Straßennamen nach 1990 in großer Zahl und binnen weniger Monate geändert, ohne öffentliche Anhörung. Das Ergebnis war effizient und hat wenig geklärt; viele erinnern sich an die Namen, nicht an eine Debatte.

Für die Abwägung folgt daraus: Bewahren schützt vor Beliebigkeit, verlängert aber eine Ehrung, die niemand mehr aussprechen würde. Verändern beendet diese Ehrung, kann jedoch zur Geste werden, wenn es geräuschlos geschieht.

Daraus ergibt sich für mich, dass die Entscheidung selbst weniger wiegt als das Verfahren, in dem sie zustande kommt. Eine Umbenennung, über die zwei Jahre lang öffentlich gestritten wurde, hinterlässt in einer Stadt mehr Erinnerung als ein Beschluss, der in zehn Minuten und ohne Widerspruch gefasst wird.`,
            criteria: [
              "Beş yönlendirme noktasının hepsi işlendi mi?",
              "Noktalar arasında bağ kuruldu mu, yoksa beş ayrı paragraf mı yan yana duruyor?",
              "Karşılaştırma aynı ölçütü iki duruma uyguluyor mu?",
              "Tartma iki yönlü mü ve sonuç bu tartmadan çıkıyor mu?",
              "Dil C1 düzeyinde mi: adlaştırma, `zum einen … zum anderen`, ölçülü ifade, ilgi cümleleri?",
              "Yaklaşık 200 kelime var mı?",
            ],
          },
        },
        {
          id: "de-c1-05-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an das Stadtarchiv. Der Entwurf unten ist zu umgangssprachlich. Ergänzen Sie die Lücken 1 bis 10 mit einer stilistisch angemessenen Wendung. Die Funktion jeder Lücke steht in Klammern.",
          promptTr:
            "Şehir arşivine yazıyorsun. Aşağıdaki taslak fazla günlük dilde. 1–10. boşlukları üsluba uygun bir ifadeyle tamamla. Her boşluğun işlevi parantez içinde yazılı.",
          texts: [
            {
              kind: "text",
              id: "br1",
              genre: "Formelles Schreiben",
              genreTr: "Resmî yazı",
              title: "Antrag auf Einsicht in gesperrte Unterlagen",
              body: `Sehr geehrte Damen und Herren,

für eine Arbeit über die Schulen meiner Heimatstadt bitte ich um Einsicht in den Bestand 4/17.

{{1}} handelt es sich um Personalakten aus den Jahren 1935 bis 1945, die nach Ihrer Benutzungsordnung einer Schutzfrist unterliegen.

{{2}} beantrage ich eine Verkürzung dieser Frist. Die betroffenen Personen sind sämtlich verstorben; Sterbedaten habe ich der beigefügten Aufstellung entnommen.

{{3}} übersende ich Ihnen eine Bestätigung meiner Hochschule sowie eine Erklärung zum Umgang mit personenbezogenen Angaben.

{{4}} ist mir bewusst, dass eine Verkürzung im Ermessen des Archivs liegt und nicht beansprucht werden kann. {{5}} betrifft mein Vorhaben ausschließlich dienstliche Vorgänge und keine privaten Umstände.

{{6}}, mir die Unterlagen im Lesesaal zugänglich zu machen und mir mitzuteilen, welche Auflagen Sie damit verbinden.

{{7}} dies nicht möglich sein, bitte ich {{8}} Auskunft darüber, welche Teile des Bestands bereits freigegeben sind.

Über eine Rückmeldung bis zum 20. Oktober {{9}}, da die Arbeit im Wintersemester abzugeben ist.

{{10}}
Rasmus Kienle`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-05-s2-1",
              no: 1,
              text: "Lücke 1 (Präzisierung des Bestands)",
              accept: ["Konkret", "Im Einzelnen", "Genauer gesagt", "Dabei"],
              explain:
                "Genel talepten sonra içeriğin tam olarak ne olduğu belirtiliyor. `Konkret handelt es sich um …` bu netleştirmeyi resmî kayıtta yapar.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-2",
              no: 2,
              text: "Lücke 2 (Antrag anschließen)",
              accept: ["Hiermit", "Daher", "Aus diesem Grund", "Deshalb"],
              explain:
                "Koruma süresi anıldıktan sonra talep buna bağlanıyor. `Daher beantrage ich …` gerekçe ile istem arasındaki bağı kurar.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-3",
              no: 3,
              text: "Lücke 3 (Hinweis auf Anlagen)",
              accept: ["Als Nachweis", "Zum Nachweis", "Ergänzend", "Hierzu"],
              explain:
                "Ekler işleviyle duyurulur: `Als Nachweis übersende ich Ihnen …`. Yüklem cümlede zaten var, boşluğa fiil girmez.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-4",
              no: 4,
              text: "Lücke 4 (Zugeständnis einleiten)",
              accept: ["Selbstverständlich", "Zwar", "Natürlich", "Sehr wohl"],
              explain:
                "Kurumun takdir yetkisini önce kabul etmek talebi güçlendirir. `Selbstverständlich ist mir bewusst, dass …` bu ödünü açar.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-5",
              no: 5,
              text: "Lücke 5 (einschränkender Anschluss)",
              accept: ["Gleichwohl", "Allerdings", "Jedoch", "Dennoch"],
              explain:
                "Kabulden sonra asıl argüman geliyor: çalışma yalnız kurumsal işlemleri kapsıyor. `Gleichwohl` bu dönüşü sağlar.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-6",
              no: 6,
              text: "Lücke 6 (Hauptbitte, an einen Infinitivsatz anschließend)",
              accept: ["Ich bitte Sie daher", "Ich bitte Sie", "Ich bitte darum", "Ich würde Sie bitten"],
              explain:
                "Talep `zu`-mastarına bağlanan bir fiille kurulur: `Ich bitte Sie daher, mir die Unterlagen … zugänglich zu machen`.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-7",
              no: 7,
              text: "Lücke 7 (Hilfsantrag, Konditional ohne \\\"wenn\\\")",
              accept: ["Sollte", "Sollte wider Erwarten"],
              explain:
                "İkincil talep koşula bağlanıyor ve resmî yazıda koşul `wenn` olmadan, fiil başta kuruluyor: `Sollte dies nicht möglich sein, …`.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-8",
              no: 8,
              text: "Lücke 8 (Präposition zu \\\"bitten\\\")",
              accept: ["um"],
              explain:
                "`bitten` bu anlamda `um` ister: `ich bitte um Auskunft darüber`. Edat düşerse cümle kurulmaz.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-9",
              no: 9,
              text: "Lücke 9 (höfliche Erwartung am Satzende)",
              accept: ["würde ich mich freuen", "wäre ich Ihnen dankbar", "wäre ich dankbar", "freue ich mich"],
              explain:
                "Cümle `Über eine Rückmeldung …` ile başladığı için yüklem sona geçiyor ve özne devriliyor; süre isteği böylece rica olarak okunuyor.",
            },
            {
              kind: "gap",
              id: "de-c1-05-s2-10",
              no: 10,
              text: "Lücke 10 (Grußformel)",
              accept: ["Mit freundlichen Grüßen", "Mit freundlichem Gruß", "Hochachtungsvoll"],
              explain:
                "Bir arşive yazılan dilekçe `Mit freundlichen Grüßen` ile kapanır. `Hochachtungsvoll` daha mesafeli ama hâlâ doğru; `Viele Grüße` bu kayıtta fazla gündelik kalır.",
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
          id: "de-c1-05-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wie soll eine Stadt mit belasteten Namen umgehen?\". Gliedern Sie: Einstieg — Begriffsklärung — Lage in Ihrem Herkunftsland — Abwägung — eigene Position — Ausblick.",
          promptTr:
            "\"Bir şehir yükü olan adlarla nasıl baş etmeli?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavramı netleştirme — kendi ülkendeki durum — tartma — kendi konumun — kapanış.",
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
              "Ich möchte über den Umgang mit belasteten Straßennamen sprechen. Zunächst kläre ich, was ich unter belastet verstehe, dann schildere ich die Lage in meinem Herkunftsland, danach wäge ich ab und komme zu meiner Position. Belastet nenne ich einen Namen nicht, wenn die Person Fehler gemacht hat — das trifft auf alle zu —, sondern wenn das, wofür sie steht, mit dem Selbstverständnis der Stadt unvereinbar ist. Diese Unterscheidung ist wichtig, weil sonst jede Debatte bei der Frage endet, ob man historische Personen an heutigen Maßstäben messen darf. In Serbien, wo ich aufgewachsen bin, wurden in den neunziger Jahren sehr viele Namen ersetzt, und zwar von oben und in wenigen Monaten. Geklärt hat das nichts; die Bevölkerung hat die alten Namen jahrelang weiterbenutzt. Für die Abwägung folgt daraus: Bewahren hat den Vorteil, dass es keine neue Rechtfertigung braucht, aber den Nachteil, dass eine Ehrung fortdauert, die niemand mehr aussprechen würde. Verändern beendet diese Ehrung, kann aber zur bloßen Geste werden. Meine Position ist deshalb verfahrensbezogen: Ich halte weniger die Entscheidung für wichtig als die Frage, wer beteiligt wird und wie lange. Für die Zukunft erwarte ich, dass sich die Debatte von den Namen zu den Kriterien verschiebt — und das wäre ein Fortschritt.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavram tanımı gerçekten yapıldı mı, yoksa örnekle mi geçiştirildi?",
              "Kendi ülkedeki durum somut ve dönemlendirilmiş mi?",
              "Tartma iki yönlü mü ve her yön gerekçeli mi?",
              "Konum ölçülü mü (koşullu, dereceli) yoksa basit bir taraf tutma mı?",
              "Dil C1'de mi: adlaştırma, ilgi cümleleri, ölçülü ifade araçları?",
              "Dört dakika boyunca konuşma yapısını koruyabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-05-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          minutes: 7,
          prepSeconds: 120,
          prompt:
            "Ihre Gesprächspartnerin vertritt eine Gegenposition. Verteidigen Sie Ihre Sicht, gehen Sie auf Einwände ein und suchen Sie am Ende eine gemeinsame Formulierung. Thema: Soll eine Umbenennung erst nach einem öffentlichen Verfahren möglich sein?",
          promptTr:
            "Karşındaki karşıt bir görüşü savunuyor. Kendi bakışını savun, itirazları ele al ve sonunda ortak bir formül ara. Konu: Bir ad değişikliği ancak kamuya açık bir süreçten sonra mı mümkün olmalı?",
          exchange: [
            {
              who: "partner",
              de: "Ich halte ein verpflichtendes Verfahren für falsch. Es verlängert alles um Jahre und zermürbt gerade die Betroffenen, die am wenigsten Zeit haben. Wie sehen Sie das?",
              tr: "Zorunlu bir süreci yanlış buluyorum. Her şeyi yıllarca uzatıyor ve en az vakti olan mağdurları yıpratıyor. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Konumunu ortaya koy ve itirazın haklı yanını da adlandır.",
              expect: "kendi konumunu gerekçelendirerek savunmak ve karşı gerekçenin haklı yanını kabul etmek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das gestehe ich Ihnen zu. Nur: In der Praxis wird jedes Verfahren zur Bühne. Wer am lautesten spricht, prägt das Ergebnis — und das sind selten die Betroffenen.",
              tr: "Bunu size veriyorum. Ama pratikte her süreç sahneye dönüşüyor. En yüksek sesle konuşan sonucu belirliyor ve bu ender olarak mağdurlar oluyor.",
            },
            {
              who: "you",
              hint: "Bu itirazı ciddiye al ve süreci nasıl kurmak gerektiğini söyle.",
              expect: "bir itirazı kabul edip önlemi yeniden tasarlamak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Angenommen, wir lösen das. Bleibt die Frage der Kosten: Zwei Jahre Verfahren binden Personal, das anderswo fehlt. Wer trägt das?",
              tr: "Diyelim bunu çözdük. Geriye maliyet sorunu kalıyor: İki yıllık süreç başka yerde eksilen personeli bağlıyor. Bunu kim üstlenecek?",
            },
            {
              who: "you",
              hint: "Maliyet sorusunu ele al ve kendi önerinle bağla.",
              expect: "maliyet itirazını yanıtlamak ve kendi önerisiyle tutarlı biçimde bağlamak",
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
              "Ihren Einwand teile ich insoweit, als lange Verfahren tatsächlich zermürben. Nur richtet sich meine Forderung nicht auf Dauer, sondern auf Öffentlichkeit: Entscheidend ist, dass die Gründe nachvollziehbar dokumentiert werden, nicht dass zwei Jahre vergehen. Ihr zweiter Punkt trifft allerdings einen wunden Punkt. Deshalb würde ich das Verfahren anders binden: Anhörungen mit begrenzter Redezeit, eine feste Frist von höchstens neun Monaten und ein Vorrang für die Stimmen derjenigen, die unmittelbar betroffen sind. Zu den Kosten: Sie haben recht, dass Personal gebunden wird. Das spricht aber für einen einmal festgelegten Ablauf, nicht gegen das Verfahren — der teuerste Fall ist der, in dem jedes Mal neu über das Wie gestritten wird. Als gemeinsame Formulierung schlage ich vor: Eine Umbenennung setzt ein öffentliches Verfahren voraus, das binnen neun Monaten abzuschließen ist, die Gründe schriftlich festhält und den unmittelbar Betroffenen Vorrang einräumt. Eine Verlängerung ist ausdrücklich nicht vorgesehen.",
            criteria: [
              "Konum gerekçelendirildi mi ve konuşma boyunca tutarlı kaldı mı?",
              "İtirazlar gerçekten devralındı mı (kabul edilen kısım adlandırıldı mı)?",
              "Konum, itiraz karşısında körü körüne savunulmak yerine uyarlandı mı?",
              "Maliyet sorusu kendi önerisine bağlanabildi mi?",
              "Ortak formül iki tarafın kabullerini de içeriyor ve kesin mi?",
              "Dil C1'de mi: `insoweit als`, `ausdrücklich nicht vorgesehen` gibi kesinlik araçları?",
            ],
          },
        },
      ],
    },
  ],
};
