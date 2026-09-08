import type { MockPaper } from "../types";

/**
 * B2 · Deneme 5 — "Bildung und Chancen".
 *
 * PLAN kâğıt 1–4 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme ·
 *                              6 köşe yazısı · 6 görüş eşleştirme · 3 kural)
 *   Hören  40 dk · 30 madde   (10 karışık · 6 söyleşi · 6 tartışma · 8 sunum)
 *   Schreiben 75 dk           okur mektubu (150) + yarı resmî ileti (100)
 *   Sprechen  15 dk           sunum (4 dk) + uzlaşma
 *
 * KONU SEÇİMİ: eğitim, herkesin kendi deneyimini ölçüt saydığı bir alan.
 * Maddeler bu yüzden deneyimi değil, deneyimden çıkarılan sonucu soruyor:
 * aynı okul hikâyesinden iki kişi iki farklı ders çıkarıyor.
 */
export const B2_05: MockPaper = {
  id: "de-b2-05",
  course: "de",
  level: "B2",
  no: 5,
  theme: "Bildung und Chancen",
  themeTr: "Eğitim ve fırsatlar",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Berichte, einen Sachtext, einen Kommentar, Meinungsäußerungen und eine Prüfungsordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel anlatılar, bir bilgi metni, bir köşe yazısı, görüş bildirimleri ve bir sınav yönetmeliği okuyacaksın.",
      tasks: [
        {
          id: "de-b2-05-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über ihren Bildungsweg. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi kendi eğitim yolunu yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht A",
              genreTr: "Deneyim yazısı A",
              title: "Ruth, Tischlermeisterin",
              body: `Meine Grundschullehrerin hat meinen Eltern vom Gymnasium abgeraten. Begründet wurde das mit meinem Deutsch, obwohl ich in Mathematik die Beste der Klasse war. Meine Eltern haben nicht widersprochen; sie hatten selbst wenig Erfahrung mit Schule.

Heute leite ich eine Werkstatt mit neun Beschäftigten und bilde jedes Jahr aus. Der Umweg hat mich nichts gekostet, was ich vermisse. Was mich stört, ist etwas anderes: dass die Empfehlung als fachliches Urteil auftrat und in Wahrheit eine Vermutung über meine Familie war.

Bei meinen Auszubildenden sehe ich dasselbe Muster. Die Stärkeren haben nicht bessere Hände, sie haben zu Hause jemanden, der Formulare liest. Genau da setze ich an: In den ersten Wochen füllen wir Anträge gemeinsam aus. Das steht in keinem Ausbildungsplan und ist der Teil, der über das erste Jahr entscheidet.

Wer behauptet, das System sei durchlässig, hat recht — es ist durchlässig für Leute mit viel Geduld.`,
              gloss: [
                { de: "abraten", tr: "vazgeçirmeye çalışmak", en: "to advise against" },
                { de: "der Umweg", tr: "dolambaçlı yol", en: "detour" },
                { de: "durchlässig", tr: "geçirgen", en: "permeable" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht B",
              genreTr: "Deneyim yazısı B",
              title: "Herr Wittkamp, Vater von zwei Kindern",
              body: `Ich habe zwei Kinder auf demselben Gymnasium, und sie erleben zwei verschiedene Schulen. Meine Tochter bekommt seit der siebten Klasse Nachhilfe, mein Sohn nicht. Beide haben ähnliche Noten.

Diese Nachhilfe kostet uns 180 Euro im Monat. Wir können das tragen, und trotzdem ärgert es mich. Eine Schule, die für ein befriedigendes Zeugnis privaten Zusatzunterricht voraussetzt, hat ihre Aufgabe an die Eltern zurückgegeben.

Man antwortet mir gern, es gebe doch Förderangebote. Es gibt sie: dienstags in der siebten Stunde, freiwillig, geleitet von Lehrkräften, die schon sieben Stunden unterrichtet haben. Meine Tochter war dreimal dort und ist nicht wiedergegangen.

Ich fordere nichts Großes. Ich fordere, dass die Schule ehrlich sagt, was sie leisten kann. Dann können wir als Eltern entscheiden, statt monatelang zu glauben, es liege an unserem Kind.`,
              gloss: [
                { de: "die Nachhilfe", tr: "özel ders", en: "private tutoring" },
                { de: "befriedigend", tr: "orta düzeyde (not)", en: "satisfactory (grade)" },
                { de: "voraussetzen", tr: "önkoşul saymak", en: "to presuppose" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht C",
              genreTr: "Deneyim yazısı C",
              title: "Frau Delgado, Lehrerin an einer Gesamtschule",
              body: `Seit vierzehn Jahren unterrichte ich Deutsch, und ich habe aufgehört, über Begabung zu sprechen. Nicht weil es sie nicht gäbe, sondern weil der Begriff im Schulalltag fast immer die Herkunft beschreibt.

Ein Beispiel aus dem letzten Jahr: Zwei Schüler haben denselben Aufsatz geschrieben, im Sinne von gleich gut. Der eine hat für die Reinschrift vierzig Minuten gebraucht, der andere zwei Stunden, weil er zu Hause an einem Küchentisch mit drei Geschwistern sitzt. Bewertet habe ich das Ergebnis, wie es die Ordnung verlangt.

Was mir fehlt, ist nicht Idealismus, sondern Zeit. Ich habe in einer Klasse achtundzwanzig Kinder und siebenundvierzig Minuten. Unter diesen Bedingungen ist individuelle Förderung ein Wort, kein Vorgang.

Trotzdem halte ich nichts von der Rede vom kaputten System. Es funktioniert für zwei Drittel gut. Das Problem ist, dass wir das letzte Drittel mit denselben Mitteln behandeln.`,
              gloss: [
                { de: "die Begabung", tr: "yetenek", en: "talent" },
                { de: "die Herkunft", tr: "köken, aile durumu", en: "background, origin" },
                { de: "die Reinschrift", tr: "temize çekme", en: "fair copy" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht D",
              genreTr: "Deneyim yazısı D",
              title: "Sinem, mit 34 zum Studium",
              body: `Ich habe mit sechzehn eine Lehre begonnen, weil Geld gebraucht wurde. Achtzehn Jahre später sitze ich im dritten Semester Sozialer Arbeit, und die meisten in meinem Kurs könnten meine Kinder sein.

Der Zugang war einfacher, als alle behauptet haben. Mit drei Jahren Berufserfahrung und einer bestandenen Prüfung darf man hier ohne Abitur studieren. Diese Regel gibt es seit Jahren; gewusst hat sie in meinem Umfeld niemand, auch nicht die Beratungsstelle, bei der ich zuerst war.

Schwierig ist nicht der Stoff, schwierig ist die Sprache der Universität. In der Werkstatt sagt man, was gemeint ist. Hier sagt man es so, dass man es später zurücknehmen kann. Das habe ich zwei Semester lang für Dummheit gehalten und halte es inzwischen für ein Handwerk, das man auch lernen kann.

Was mir niemand gesagt hat: Der teuerste Teil ist nicht die Gebühr, sondern das fehlende Gehalt.`,
              gloss: [
                { de: "die Lehre", tr: "çıraklık eğitimi", en: "apprenticeship" },
                { de: "der Zugang", tr: "erişim", en: "access" },
                { de: "der Stoff", tr: "ders içeriği", en: "subject matter" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-05-l1-1",
              no: 1,
              text: "Wer beschreibt eine Regel, die kaum jemand kennt?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 3,
              explain:
                "Sinem abitursuz okuma hakkını anlatıyor: \"Diese Regel gibt es seit Jahren; gewusst hat sie in meinem Umfeld niemand\" — danışma merkezi bile bilmiyormuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-2",
              no: 2,
              text: "Wer hält eine Empfehlung für ein verkleidetes Urteil über die Familie?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 0,
              explain:
                "Ruth tavsiyeyi \"als fachliches Urteil auftrat und in Wahrheit eine Vermutung über meine Familie war\" diye niteliyor. Rahatsız eden şey yolun kendisi değil, gerekçenin kılığı.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-3",
              no: 3,
              text: "Wer nennt einen Kostenpunkt, den andere übersehen?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 3,
              explain:
                "Sinem son cümlede söylüyor: \"Der teuerste Teil ist nicht die Gebühr, sondern das fehlende Gehalt.\" Yani asıl maliyet kazanılmayan para.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-4",
              no: 4,
              text: "Wer beschreibt ein bestehendes Förderangebot als praktisch wirkungslos?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 1,
              explain:
                "Herr Wittkamp desteğin var olduğunu kabul ediyor ama koşullarını sayıyor: \"dienstags in der siebten Stunde, freiwillig\" ve yedi saat ders vermiş öğretmenlerle. Kızı üç kez gitmiş ve bir daha gitmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-5",
              no: 5,
              text: "Wer vermeidet einen verbreiteten Begriff, weil er etwas anderes verdeckt?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 2,
              explain:
                "Frau Delgado yetenek sözcüğünü kullanmayı bırakmış, çünkü okul günlüğünde \"fast immer die Herkunft beschreibt\". Varlığını değil, işlevini reddediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-6",
              no: 6,
              text: "Wer leistet selbst eine Hilfe, die im offiziellen Plan nicht vorgesehen ist?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 0,
              explain:
                "Ruth çıraklarıyla ilk haftalarda birlikte form dolduruyor ve ekliyor: \"Das steht in keinem Ausbildungsplan\". İlk yılı belirleyen kısmın bu olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-7",
              no: 7,
              text: "Wer verlangt vor allem Ehrlichkeit über die eigenen Grenzen?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 1,
              explain:
                "Herr Wittkamp talebini küçültüyor: \"Ich fordere, dass die Schule ehrlich sagt, was sie leisten kann\". Böylece veliler çocuklarını suçlamayı bırakabilir.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-8",
              no: 8,
              text: "Wer hat eine fremde Sprachform zuerst falsch gedeutet?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 3,
              explain:
                "Sinem üniversitenin dilini iki dönem boyunca \"für Dummheit gehalten\", sonra öğrenilebilir bir zanaat saymaya başlamış.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l1-9",
              no: 9,
              text: "Wer widerspricht der Rede vom grundsätzlich kaputten System?",
              options: ["Ruth", "Herr Wittkamp", "Frau Delgado", "Sinem"],
              answer: 2,
              explain:
                "Frau Delgado \"halte ich nichts von der Rede vom kaputten System\" diyor: sistem üçte iki için işliyor, sorun son üçte birin aynı araçlarla ele alınması.",
            },
          ],
        },
        {
          id: "de-b2-05-l2",
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
              title: "Warum sich Schulempfehlungen so schwer korrigieren lassen",
              body: `Am Ende der vierten Klasse entscheidet in vielen Bundesländern eine Empfehlung darüber, welche Schule ein Kind besucht. Formal ist diese Entscheidung später revidierbar. {{10}}

Der erste Grund ist statistischer Natur. Wechsel nach oben sind selten und werden in den Zahlen von Wechseln nach unten deutlich übertroffen. {{11}}

Hinzu kommt ein sozialer Mechanismus. Wer die Schulform wechselt, verliert nicht nur einen Lehrplan, sondern eine Gruppe. {{12}}

Am schwersten wiegt jedoch die Wirkung auf die Erwartung. Untersuchungen aus mehreren Ländern zeigen, dass Lehrkräfte Leistungen unterschiedlich einordnen, je nachdem, welche Schulform ein Kind besucht. {{13}}

Daraus folgt keine Anklage gegen einzelne Personen. Die Empfehlung wirkt gerade deshalb so stark, weil niemand sie täglich bestätigen muss. {{14}}

Für die Praxis heißt das zweierlei. Erstens sollte der Übergang später erfolgen, wie es in einigen Ländern längst geschieht. {{15}}`,
              gloss: [
                { de: "revidierbar", tr: "geri alınabilir", en: "revisable" },
                { de: "übertreffen", tr: "geçmek, aşmak", en: "to exceed" },
                { de: "einordnen", tr: "değerlendirmek, yerleştirmek", en: "to classify" },
                { de: "die Anklage", tr: "suçlama", en: "accusation" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Sie wirkt vielmehr wie eine Voreinstellung, die im Alltag nur dann auffällt, wenn jemand sie ausdrücklich in Frage stellt.",
            },
            {
              key: "b",
              label: "b",
              body: "Dieselbe Arbeit erhält je nach Umgebung eine andere Note, und diese Note bestätigt anschließend die ursprüngliche Zuordnung.",
            },
            {
              key: "c",
              label: "c",
              body: "Praktisch bleibt sie es in den seltensten Fällen, und das hat drei Gründe, die selten zusammen betrachtet werden.",
            },
            {
              key: "d",
              label: "d",
              body: "Zweitens müsste ein Wechsel nach oben organisatorisch so einfach sein wie einer nach unten.",
            },
            {
              key: "e",
              label: "e",
              body: "Die Zahl der Lehrkräfte ist in diesem Zeitraum insgesamt leicht gestiegen.",
            },
            {
              key: "f",
              label: "f",
              body: "Wer im dritten Anlauf ankommt, sitzt in einer Klasse, in der alle anderen seit Jahren zusammen sind.",
            },
            {
              key: "g",
              label: "g",
              body: "Ein Kind, das aufsteigen möchte, bewegt sich also gegen eine Strömung und nicht mit ihr.",
            },
            {
              key: "h",
              label: "h",
              body: "Die Grundschulzeit dauert in Deutschland je nach Bundesland vier oder sechs Jahre.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-05-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "c",
              explain:
                "Önceki cümle \"Formal ist diese Entscheidung später revidierbar\" diyor; (c) bu \"formal\" ile karşıtlık kurup üç gerekçeyi duyuruyor ve metnin yapısını açıyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "g",
              explain:
                "Paragraf yukarı geçişlerin \"von Wechseln nach unten deutlich übertroffen\" olduğunu söylüyor; (g) bunu bir görüntüye çeviriyor: yükselmek isteyen çocuk akıntıya karşı gidiyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "f",
              explain:
                "Kaybedilen şey \"nicht nur einen Lehrplan, sondern eine Gruppe\"; (f) bunu somutlaştırıyor: yıllardır birlikte olan bir sınıfa sonradan girmek.",
            },
            {
              kind: "match",
              id: "de-b2-05-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "b",
              explain:
                "Metin \"Lehrkräfte Leistungen unterschiedlich einordnen\" diyor; (b) döngüyü kapatıyor: aynı ödev başka not alıyor ve bu not ilk yerleştirmeyi doğruluyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "a",
              explain:
                "Metin kimseyi suçlamıyor ve tavsiyenin günlük olarak onaylanması gerekmediğini söylüyor; (a) bunu adlandırıyor: bir \"Voreinstellung\" gibi işliyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "d",
              explain:
                "\"Erstens\" ile başlayan öneriden sonra ikincisi gerekiyor; (d) \"Zweitens\" ile devam ediyor ve yukarı geçişin kolaylaştırılmasını istiyor.",
            },
          ],
        },
        {
          id: "de-b2-05-l3",
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
              title: "Nachhilfe ist kein Markt, sondern ein Befund",
              body: `In Deutschland geben Eltern jährlich rund zwei Milliarden Euro für Nachhilfe aus. Diese Zahl wird gern als Beleg für Ehrgeiz gelesen. Sie ist eher ein Befund über den Unterricht, den wir öffentlich anbieten.

Man sollte den Markt nicht verteufeln. Wer sein Kind fördern will, tut nichts Verwerfliches, und viele Anbieter arbeiten sorgfältig. Der Punkt ist ein anderer: Wenn eine befriedigende Note regelmäßig privaten Zusatzunterricht voraussetzt, ist die Note keine Aussage über das Kind mehr, sondern über das Haushaltseinkommen.

Die übliche Antwort lautet, es gebe ja schulische Förderangebote. Es gibt sie tatsächlich, und genau hier beginnt das Problem. Diese Angebote liegen fast immer am Rand des Stundenplans, sind freiwillig und werden von Lehrkräften erteilt, die an diesem Tag bereits unterrichtet haben. Ein Angebot, das Ermüdung voraussetzt, erreicht die Kinder nicht, die es am nötigsten hätten.

Man wendet ein, mehr Personal sei nicht verfügbar. Das stimmt kurzfristig und erklärt nicht, warum die vorhandene Zeit so verteilt ist, wie sie verteilt ist. In vielen Schulen wird Förderung als Rest organisiert: was übrig bleibt, wenn der Pflichtunterricht steht. Umgekehrt zu planen wäre nicht teurer, sondern nur unbequemer.

Ein zweiter Einwand ist ernster: Wer Nachhilfe verbieten oder besteuern will, trifft Familien, die sich zu helfen versuchen. Deshalb ist die Forderung falsch adressiert. Nicht der Markt gehört reguliert, sondern die Schule verpflichtet — und zwar auf ein Ergebnis, nicht auf ein Angebot.

Zuletzt ein Wort zur Ehrlichkeit. Solange Schulen behaupten, sie könnten alle Kinder ohne Zusatzunterricht zum Abschluss führen, bleibt jede Familie mit dem Gegenteil allein. Man kann eine Lücke nicht schließen, die man nicht benennt.`,
              gloss: [
                { de: "der Befund", tr: "bulgu, teşhis", en: "finding" },
                { de: "verwerflich", tr: "kınanacak", en: "reprehensible" },
                { de: "die Ermüdung", tr: "yorgunluk", en: "fatigue" },
                { de: "adressieren", tr: "yöneltmek", en: "to address" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-05-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie liest der Autor die Ausgaben für Nachhilfe?",
              options: [
                "Als Zeichen für den Ehrgeiz der Eltern.",
                "Als Aussage über den öffentlichen Unterricht.",
                "Als Folge zu strenger Notengebung.",
              ],
              answer: 1,
              explain:
                "İlk paragraf iki okumayı karşılaştırıyor ve ikincisini seçiyor: rakam \"eher ein Befund über den Unterricht, den wir öffentlich anbieten\".",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l3-17",
              no: 17,
              ref: "k1",
              text: "Wie steht er zu den Anbietern von Nachhilfe?",
              options: [
                "Er hält ihre Arbeit für schädlich.",
                "Er fordert eine strenge Aufsicht über sie.",
                "Er sieht in ihnen nicht das eigentliche Problem.",
              ],
              answer: 2,
              explain:
                "\"Man sollte den Markt nicht verteufeln\" diyor ve birçok sağlayıcının özenli çalıştığını ekliyor; sorunu notun anlamının değişmesinde görüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l3-18",
              no: 18,
              ref: "k1",
              text: "Was kritisiert er an den schulischen Förderangeboten?",
              options: [
                "Sie sind unter ungünstigen Bedingungen organisiert.",
                "Sie werden von den Eltern nicht wahrgenommen.",
                "Sie kosten die Schulen zu viel Geld.",
              ],
              answer: 0,
              explain:
                "Ders programının kenarında, gönüllü ve zaten ders vermiş öğretmenlerle yürüyor: \"Ein Angebot, das Ermüdung voraussetzt, erreicht die Kinder nicht\".",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l3-19",
              no: 19,
              ref: "k1",
              text: "Wie geht er mit dem Personalargument um?",
              options: [
                "Er weist es als Ausrede zurück.",
                "Er erkennt es kurzfristig an, nicht aber als Erklärung.",
                "Er hält es für den wichtigsten Punkt.",
              ],
              answer: 1,
              explain:
                "\"Das stimmt kurzfristig und erklärt nicht, warum die vorhandene Zeit so verteilt ist\" — kabul ile itiraz aynı cümlede.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l3-20",
              no: 20,
              ref: "k1",
              text: "Warum lehnt er ein Verbot oder eine Steuer ab?",
              options: [
                "Weil sie rechtlich nicht durchsetzbar wären.",
                "Weil der Markt sich selbst reguliert.",
                "Weil sie die falschen Adressaten treffen.",
              ],
              answer: 2,
              explain:
                "Böyle bir talep kendine yardım etmeye çalışan aileleri vurur; bu yüzden \"die Forderung falsch adressiert\" ve okul sonuca bağlanmalı.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l3-21",
              no: 21,
              ref: "k1",
              text: "Worauf zielt der letzte Absatz?",
              options: [
                "Auf ein offenes Eingeständnis der Schulen.",
                "Auf mehr Informationen für Eltern über Anbieter.",
                "Auf eine bundesweite Statistik zur Nachhilfe.",
              ],
              answer: 0,
              explain:
                "Son cümleler adlandırmayı istiyor: \"Man kann eine Lücke nicht schließen, die man nicht benennt.\" Aksi hâlde aileler yalnız kalıyor.",
            },
          ],
        },
        {
          id: "de-b2-05-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob das Sitzenbleiben abgeschafft werden soll. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, sınıfta kalmanın kaldırılıp kaldırılmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Rombach, Schulleiterin",
              body: "Wir haben es vor sechs Jahren abgeschafft und dafür verbindliche Förderpläne eingeführt. Ohne diesen zweiten Teil wäre es eine reine Ersparnis gewesen, und genau das passiert in den meisten Schulen, die es nachmachen.",
            },
            {
              key: "b",
              label: "b — Herr Prantl, Mathematiklehrer",
              body: "Ich habe in zwanzig Jahren keinen Schüler gesehen, dem das Wiederholen fachlich geholfen hätte. Was hilft, ist dasselbe Jahr mit anderer Unterstützung, nicht dasselbe Jahr noch einmal.",
            },
            {
              key: "c",
              label: "c — Frau Dr. Iversen, Bildungsforscherin",
              body: "Die Datenlage ist eindeutiger, als beide Seiten behaupten: Der Effekt auf die Leistung ist im Schnitt null bis leicht negativ. Deutlich messbar ist dagegen der Effekt auf den Abschluss — Wiederholer verlassen die Schule häufiger ohne.",
            },
            {
              key: "d",
              label: "d — Herr Özkan, Vater",
              body: "Mein Sohn hat die neunte Klasse wiederholt und ist danach zum ersten Mal gern zur Schule gegangen. Ich weiß, dass das kein Beweis ist. Ich weiß aber auch, dass Statistiken keine einzelnen Kinder retten.",
            },
            {
              key: "e",
              label: "e — Frau Lieb, Schülervertreterin",
              body: "Uns fragt niemand. Für uns ist das Wiederholen vor allem eine soziale Sache: Man verliert alle Leute, mit denen man seit Jahren zusammen ist. Über den Stoff redet in unserer Klasse niemand.",
            },
            {
              key: "f",
              label: "f — Herr Kubitschek, Ausbilder",
              body: "Ich stelle jedes Jahr Auszubildende ein und schaue mir Zeugnisse an. Ein wiederholtes Jahr sagt mir nichts über die Person. Was mir etwas sagt, ist, ob jemand nach einem Rückschlag weitergemacht hat.",
            },
            {
              key: "g",
              label: "g — Frau Nabert, Schulpsychologin",
              body: "In meiner Praxis kommen die Kinder nicht wegen des Stoffs. Sie kommen, weil sie glauben, dass mit ihnen etwas nicht stimmt. Diese Deutung entsteht nicht durch das Wiederholen selbst, sondern durch die Art, wie darüber gesprochen wird.",
            },
            {
              key: "h",
              label: "h — Herr Vollmer, Kämmerer",
              body: "Ein wiederholtes Schuljahr kostet die Gemeinschaft rund 9000 Euro. Das ist kein Argument gegen das Wiederholen, sondern eines dafür, das Geld vorher auszugeben, wo es noch etwas ändert.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-05-l4-22",
              no: 22,
              text: "Eine Abschaffung ohne Ersatz wäre nur eine Einsparung.",
              answer: "a",
              explain:
                "Frau Rombach kaldırmayı zorunlu destek planlarıyla birlikte yapmış ve ikincisi olmadan \"eine reine Ersparnis\" olacağını söylüyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l4-23",
              no: 23,
              text: "Nicht die Zeit fehlt, sondern die andere Unterstützung.",
              answer: "b",
              explain:
                "Herr Prantl ayrımı net kuruyor: \"dasselbe Jahr mit anderer Unterstützung, nicht dasselbe Jahr noch einmal\".",
            },
            {
              kind: "match",
              id: "de-b2-05-l4-24",
              no: 24,
              text: "Der stärkste messbare Effekt betrifft nicht die Noten.",
              answer: "c",
              explain:
                "Frau Dr. Iversen performans etkisini sıfıra yakın buluyor; ölçülebilir asıl etki mezuniyette: tekrar edenler okulu daha sık diplomasız bırakıyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l4-25",
              no: 25,
              text: "Ein Einzelfall widerlegt keine Statistik — und umgekehrt.",
              answer: "d",
              explain:
                "Herr Özkan oğlunun deneyimini anlatıyor ve kendisi sınırlıyor: \"Ich weiß, dass das kein Beweis ist\", ama istatistiklerin tek tek çocukları kurtarmadığını ekliyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l4-26",
              no: 26,
              text: "Entscheidend ist, wie über das Wiederholen gesprochen wird.",
              answer: "g",
              explain:
                "Frau Nabert çocukların ders yüzünden değil kendileriyle ilgili bir yorum yüzünden geldiğini söylüyor: bu yorum \"durch die Art, wie darüber gesprochen wird\" doğuyor.",
            },
            {
              kind: "match",
              id: "de-b2-05-l4-27",
              no: 27,
              text: "Das Geld sollte früher eingesetzt werden.",
              answer: "h",
              explain:
                "Herr Vollmer 9000 euroluk maliyeti tekrara karşı bir argüman saymıyor, \"eines dafür, das Geld vorher auszugeben, wo es noch etwas ändert\" diyor.",
            },
          ],
        },
        {
          id: "de-b2-05-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Prüfungsordnung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Sınav yönetmeliğini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Prüfungsordnung",
              genreTr: "Sınav yönetmeliği",
              title: "Auszug aus der Prüfungsordnung der Abendschule",
              body: `§ 3 Zulassung
Zur Prüfung wird zugelassen, wer mindestens 70 Prozent der Unterrichtsstunden besucht hat. Fehlzeiten mit ärztlichem Attest werden nicht angerechnet, jedoch höchstens bis zu 20 Prozent der Gesamtstunden.

§ 5 Anmeldung und Rücktritt
Die Anmeldung erfolgt spätestens sechs Wochen vor dem Termin. Ein Rücktritt ist bis zwei Wochen vorher ohne Angabe von Gründen möglich. Danach gilt die Prüfung als nicht bestanden, es sei denn, ein Attest wird innerhalb von drei Tagen vorgelegt.

§ 8 Wiederholung
Jede Prüfung kann zweimal wiederholt werden. Ein nicht angetretener Versuch nach § 5 zählt als Versuch. Eine dritte Wiederholung ist nur auf schriftlichen Antrag und nur bei einer Fehlzeit von unter 10 Prozent möglich.

§ 11 Hilfsmittel
Zugelassen ist ein einsprachiges Wörterbuch. Elektronische Geräte sind ausgeschlossen; dies gilt auch für Uhren mit Anzeige. Eigenes Papier darf nicht verwendet werden.

§ 14 Einsicht
Die Einsicht in die korrigierte Arbeit ist innerhalb von vier Wochen nach Bekanntgabe möglich. Kopien werden nicht ausgegeben; eigene Notizen sind erlaubt.`,
              gloss: [
                { de: "die Zulassung", tr: "sınava kabul", en: "admission" },
                { de: "anrechnen", tr: "hesaba katmak, saymak", en: "to count towards" },
                { de: "der Rücktritt", tr: "vazgeçme, çekilme", en: "withdrawal" },
                { de: "die Einsicht", tr: "sınav kâğıdını görme", en: "inspection" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-05-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie haben 35 Prozent der Stunden gefehlt, davon 25 Prozent mit Attest. Werden Sie zugelassen?",
              options: [
                "Ja, weil Atteste immer herausgerechnet werden.",
                "Nein.",
                "Ja, aber nur mit schriftlichem Antrag.",
              ],
              answer: 1,
              explain:
                "§ 3 raporlu devamsızlığı en fazla yüzde 20'ye kadar saymıyor. 35 eksi 20 eşittir 15 sayılan devamsızlık; katılım yüzde 85 gibi görünse de kalan 5 puanlık raporlu kısım sayıldığı için eşik tutmuyor — kabul için gereken yüzde 70'e ulaşılamıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l5-29",
              no: 29,
              ref: "o1",
              text: "Sie treten zehn Tage vor der Prüfung ohne Attest zurück. Was folgt daraus?",
              options: [
                "Der Termin verfällt ohne weitere Folgen.",
                "Sie können sich sofort neu anmelden.",
                "Der Termin zählt als Fehlversuch.",
              ],
              answer: 2,
              explain:
                "§ 5 iki haftalık sınırı geçtikten sonra \"gilt die Prüfung als nicht bestanden\" diyor; ayrıca § 8'e göre bu deneme sayılan üç haktan biri oluyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-l5-30",
              no: 30,
              ref: "o1",
              text: "Sie möchten die korrigierte Arbeit sehen und mitnehmen. Was ist möglich?",
              options: [
                "Nur ansehen und selbst Notizen machen.",
                "Ansehen und anschließend eine Kopie erhalten.",
                "Nur mit schriftlichem Antrag ansehen.",
              ],
              answer: 0,
              explain:
                "§ 14 dört hafta içinde görmeye izin veriyor ama \"Kopien werden nicht ausgegeben\"; buna karşılık kendi notlarını almak serbest.",
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
          id: "de-b2-05-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage in der Schule",
              genreTr: "Okulda anons",
              situation: "Bir sınav düzenlemesi duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für die Abschlussklassen: Die schriftliche Prüfung findet nicht in der Aula statt, sondern in den Räumen 201 bis 204. Die Verteilung hängt seit heute am schwarzen Brett. Taschen bleiben vor dem Raum; ein Wörterbuch dürfen Sie mitnehmen, elektronische Geräte nicht.",
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
                  text: "Eine Untersuchung aus Hamburg hat 4000 Schülerinnen und Schüler über drei Jahre begleitet. Wer eine verbindliche Lernzeit in der Schule hatte, zeigte am Ende keine besseren Noten, aber deutlich geringere Unterschiede zwischen den Familien. Die Autorinnen halten das für den eigentlichen Ertrag.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Öğrenci danışmanlığı geri dönüş yapıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Sander, hier ist die Studienberatung. Ihre Frage nach dem Studium ohne Abitur kann ich bejahen: Mit abgeschlossener Ausbildung und drei Jahren Berufstätigkeit ist der Zugang möglich. Was Sie zusätzlich brauchen, ist ein Beratungsgespräch, nicht eine Prüfung — das wird oft verwechselt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Elternversammlung",
              genreTr: "Veli toplantısında duyuru",
              situation: "Toplantının düzeni açıklanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir beginnen, zum Ablauf: Wir sprechen zuerst über die Klassenfahrt, danach über die Förderstunden. Fragen zu einzelnen Kindern besprechen wir nicht hier, sondern in den Sprechstunden. Beschlüsse fasst diese Versammlung nur zur Klassenfahrt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage in der Bibliothek",
              genreTr: "Kütüphanede anons",
              situation: "Sınav dönemi düzenlemesi duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Nutzerinnen und Nutzer, in der Prüfungszeit sind die Gruppenräume nur nach Buchung nutzbar. Der Lesesaal bleibt frei zugänglich, allerdings ohne Reservierung von Plätzen. Wer länger als eine Stunde weg ist, verliert seinen Platz.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-05-h1-1",
              no: 1,
              ref: "h1",
              text: "Ein Wörterbuch darf mit in den Prüfungsraum.",
              answer: true,
              explain:
                "Anons ayrımı yapıyor: \"ein Wörterbuch dürfen Sie mitnehmen, elektronische Geräte nicht\". Çantalar ise dışarıda kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h1-2",
              no: 2,
              ref: "h1",
              text: "Wo findet die Prüfung statt?",
              options: [
                "In vier einzelnen Klassenräumen.",
                "In der Aula wie ursprünglich geplant.",
                "In einem anderen Schulgebäude.",
              ],
              answer: 0,
              explain:
                "Yer değişikliği açık: salon yerine \"in den Räumen 201 bis 204\", dağılım ise panoda asılı. Başka bina hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-05-h1-3",
              no: 3,
              ref: "h2",
              text: "Die verbindliche Lernzeit hat die Noten verbessert.",
              answer: false,
              explain:
                "Haber tersini söylüyor: \"keine besseren Noten\". Değişen şey aileler arasındaki farkın belirgin biçimde azalması.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h1-4",
              no: 4,
              ref: "h2",
              text: "Was halten die Autorinnen für den eigentlichen Ertrag?",
              options: [
                "Die höhere Zahl der Abschlüsse.",
                "Die geringeren Unterschiede zwischen den Familien.",
                "Die bessere Stimmung in den Klassen.",
              ],
              answer: 1,
              explain:
                "Sonuç doğrudan aktarılıyor: \"deutlich geringere Unterschiede zwischen den Familien\" ve yazarlar bunu asıl kazanç sayıyor.",
            },
            {
              kind: "bool",
              id: "de-b2-05-h1-5",
              no: 5,
              ref: "h3",
              text: "Für den Zugang ist eine zusätzliche Prüfung nötig.",
              answer: false,
              explain:
                "Mesaj sık karıştırılan noktayı düzeltiyor: gereken şey \"ein Beratungsgespräch, nicht eine Prüfung\".",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h1-6",
              no: 6,
              ref: "h3",
              text: "Welche Voraussetzungen nennt die Beratung?",
              options: [
                "Ein Abitur oder eine gleichwertige Prüfung.",
                "Eine abgeschlossene Ausbildung und Berufserfahrung.",
                "Eine Empfehlung des früheren Arbeitgebers.",
              ],
              answer: 1,
              explain:
                "İki koşul sayılıyor: tamamlanmış meslek eğitimi ve üç yıllık çalışma. Abitur zaten sorunun kendisi; işveren tavsiyesi hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-05-h1-7",
              no: 7,
              ref: "h4",
              text: "Fragen zu einzelnen Kindern gehören in diese Versammlung.",
              answer: false,
              explain:
                "Duyuru bunu ayırıyor: tek tek çocuklarla ilgili sorular \"nicht hier, sondern in den Sprechstunden\" konuşuluyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h1-8",
              no: 8,
              ref: "h4",
              text: "Worüber kann die Versammlung entscheiden?",
              options: [
                "Über die Förderstunden.",
                "Über beide Themen des Abends.",
                "Nur über die Klassenfahrt.",
              ],
              answer: 2,
              explain:
                "Yetki sınırlı: \"Beschlüsse fasst diese Versammlung nur zur Klassenfahrt\". Destek dersleri yalnız görüşülüyor.",
            },
            {
              kind: "bool",
              id: "de-b2-05-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Lesesaal bleibt ohne Buchung zugänglich.",
              answer: true,
              explain:
                "Rezervasyon yalnız grup odaları için; okuma salonu \"bleibt frei zugänglich\", ama yer ayırtmak yok.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h1-10",
              no: 10,
              ref: "h5",
              text: "Was passiert bei längerer Abwesenheit vom Platz?",
              options: [
                "Der Platz wird frei.",
                "Die Sachen werden zur Information gebracht.",
                "Der Ausweis wird gesperrt.",
              ],
              answer: 0,
              explain:
                "Anons süreyi veriyor: bir saatten uzun uzaklaşan \"verliert seinen Platz\". Eşyalar ve kart hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-b2-05-h2",
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
              situation: "Bir okul müdürü destek sisteminin değişimini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Rombach, Sie haben das Sitzenbleiben abgeschafft. Was hat sich verändert?" },
                {
                  speaker: "Frau Rombach",
                  text: "Zuerst gar nichts, und das war die wichtigste Erfahrung. Im ersten Jahr haben wir nur weggelassen und nichts eingeführt. Die Ergebnisse wurden schlechter, nicht besser.",
                },
                { speaker: "Moderatorin", text: "Was haben Sie dann geändert?" },
                {
                  speaker: "Frau Rombach",
                  text: "Wir haben verbindliche Förderpläne eingeführt. Verbindlich heißt: Die Schule verpflichtet sich, nicht das Kind. Wenn ein Plan nicht umgesetzt wird, ist das ein Fehler der Schule und wird auch so protokolliert.",
                },
                { speaker: "Moderatorin", text: "Woher kam die Zeit dafür?" },
                {
                  speaker: "Frau Rombach",
                  text: "Aus dem Nachmittag. Wir haben zwei Arbeitsgemeinschaften gestrichen, und das war unpopulär. Ich habe damals viele Briefe bekommen — allerdings kaum von den Familien, um die es ging.",
                },
                { speaker: "Moderatorin", text: "Was sagen die Zahlen heute?" },
                {
                  speaker: "Frau Rombach",
                  text: "Die Abschlussquote ist um neun Prozentpunkte gestiegen. Die Noten im Mittelfeld sind fast unverändert. Was sich verändert hat, ist der Rand, und darum ging es.",
                },
                { speaker: "Moderatorin", text: "Was würden Sie anderen Schulen raten?" },
                {
                  speaker: "Frau Rombach",
                  text: "Nicht mit der Abschaffung anzufangen. Erst den Ersatz aufbauen, dann das Alte streichen. Wer es umgekehrt macht, spart Geld und verliert Kinder.",
                },
                { speaker: "Moderatorin", text: "Gibt es etwas, das Sie unterschätzt haben?" },
                {
                  speaker: "Frau Rombach",
                  text: "Die Sprache. Solange im Lehrerzimmer von schwachen Kindern gesprochen wird, ändert kein Plan etwas. Das war der Teil, der am längsten gedauert hat, und er stand in keinem Konzept.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-05-h2-11",
              no: 11,
              ref: "i1",
              text: "Was war im ersten Jahr die wichtigste Erfahrung?",
              options: [
                "Dass die Eltern die Reform ablehnten.",
                "Dass das Weglassen allein nichts brachte.",
                "Dass die Lehrkräfte zusätzliche Stunden brauchten.",
              ],
              answer: 1,
              explain:
                "\"Im ersten Jahr haben wir nur weggelassen und nichts eingeführt. Die Ergebnisse wurden schlechter, nicht besser.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h2-12",
              no: 12,
              ref: "i1",
              text: "Was bedeutet bei ihr \"verbindlich\"?",
              options: [
                "Das Kind muss den Plan unterschreiben.",
                "Der Plan gilt für ein ganzes Schuljahr.",
                "Die Pflicht liegt bei der Einrichtung.",
              ],
              answer: 2,
              explain:
                "Tanımı kendisi veriyor ve sonucunu ekliyor: plan uygulanmazsa bu okulun hatası sayılıyor ve tutanağa geçiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h2-13",
              no: 13,
              ref: "i1",
              text: "Woher kam die zusätzliche Zeit?",
              options: [
                "Aus dem Nachmittagsprogramm.",
                "Aus neuen Stellen des Landes.",
                "Aus einer Verlängerung des Schultags.",
              ],
              answer: 0,
              explain:
                "İki kulüp kaldırılmış: \"Wir haben zwei Arbeitsgemeinschaften gestrichen\". Yeni kadro ya da uzatılmış gün geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h2-14",
              no: 14,
              ref: "i1",
              text: "Was fällt ihr an den Protestbriefen auf?",
              options: [
                "Sie kamen vor allem von Lehrkräften.",
                "Kaum von den Betroffenen.",
                "Sie kamen erst nach zwei Jahren.",
              ],
              answer: 1,
              explain:
                "\"allerdings kaum von den Familien, um die es ging\" — itiraz, önlemin hedeflediği grubun dışından geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h2-15",
              no: 15,
              ref: "i1",
              text: "Was zeigen die Zahlen?",
              options: [
                "Die Noten im Mittelfeld sind deutlich gestiegen.",
                "Die Zahl der Wiederholer ist leicht gestiegen.",
                "Die Abschlussquote ist gestiegen.",
              ],
              answer: 2,
              explain:
                "Mezuniyet oranı dokuz puan artmış; ortalama notlar neredeyse değişmemiş. \"Was sich verändert hat, ist der Rand\".",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h2-16",
              no: 16,
              ref: "i1",
              text: "Was hat sie unterschätzt?",
              options: [
                "Den Aufwand für die Dokumentation.",
                "Den Widerstand der Schulaufsicht.",
                "Die Sprache im Kollegium.",
              ],
              answer: 2,
              explain:
                "\"Solange im Lehrerzimmer von schwachen Kindern gesprochen wird, ändert kein Plan etwas\" — en uzun süren ve hiçbir konsepte girmeyen kısım bu.",
            },
          ],
        },
        {
          id: "de-b2-05-h3",
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
              situation: "İki konuk sınıf tekrarını tartışıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Sitzenbleiben abschaffen — Herr Prantl, Sie unterrichten Mathematik." },
                {
                  speaker: "Herr Prantl",
                  text: "Ich beginne mit einem Zugeständnis: Es gibt einzelne Kinder, denen ein Jahr Abstand gutgetan hat. Das bestreite ich nicht. Nur kenne ich nach zwanzig Jahren kein einziges, dem der wiederholte Stoff geholfen hätte.",
                },
                { speaker: "Moderator", text: "Frau Nabert, Sie sind Schulpsychologin." },
                {
                  speaker: "Frau Nabert",
                  text: "Ich teile die Einschätzung fachlich, sehe aber ein anderes Problem. In den Schulen, die abgeschafft haben, wird oft dasselbe Kind einfach mitgeschleppt. Das ist nicht besser, es ist nur unsichtbarer.",
                },
                {
                  speaker: "Herr Prantl",
                  text: "Da haben Sie recht, und genau das habe ich erlebt. Bei uns hieß es zwei Jahre lang, wir förderten individuell. Tatsächlich hat niemand die Zeit dafür bekommen.",
                },
                { speaker: "Moderator", text: "Also doch beibehalten?" },
                {
                  speaker: "Herr Prantl",
                  text: "Nein. Aber die Abschaffung darf nicht der erste Schritt sein, sondern der letzte. Zuerst die Förderung, dann die Regel.",
                },
                {
                  speaker: "Frau Nabert",
                  text: "Damit kann ich leben. Ich würde ergänzen: Wir sollten aufhören, das Wiederholen als Strafe zu behandeln. Solange es so klingt, wählen Familien es ab, auch wenn es im Einzelfall sinnvoll wäre.",
                },
                { speaker: "Moderator", text: "Wie sähe ein Kompromiss aus?" },
                {
                  speaker: "Frau Nabert",
                  text: "Ein freiwilliges Wiederholen mit Förderplan, gemeinsam entschieden. Keine Note als Auslöser, sondern ein Gespräch.",
                },
                {
                  speaker: "Herr Prantl",
                  text: "Dem stimme ich zu, mit einer Bedingung: Freiwillig heißt nur dann freiwillig, wenn die Alternative real existiert. Sonst ist es Zwang mit anderem Namen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-05-h3-17",
              no: 17,
              ref: "d1",
              text: "Womit beginnt Herr Prantl?",
              options: [
                "Mit einer Zahl aus seinem Unterricht.",
                "Mit einem Zugeständnis.",
                "Mit einer Kritik an der Schulleitung.",
              ],
              answer: 1,
              explain:
                "\"Ich beginne mit einem Zugeständnis\" diyor: bazı çocuklara bir yıl aranın iyi geldiğini kabul ediyor. İtirazı ancak sonra geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h3-18",
              no: 18,
              ref: "d1",
              text: "Welches Problem sieht Frau Nabert bei der Abschaffung?",
              options: [
                "Kinder werden mitgeschleppt.",
                "Die Eltern werden darüber nicht informiert.",
                "Die Klassen werden zu groß.",
              ],
              answer: 0,
              explain:
                "Değerlendirmeyi paylaşıyor ama başka bir sorun görüyor: aynı çocuk sürükleniyor — \"nicht besser, es ist nur unsichtbarer\".",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h3-19",
              no: 19,
              ref: "d1",
              text: "Wie reagiert Herr Prantl auf diesen Einwand?",
              options: [
                "Er bestreitet die Beobachtung.",
                "Er bestätigt sie.",
                "Er hält sie für einen Sonderfall.",
              ],
              answer: 1,
              explain:
                "\"Da haben Sie recht, und genau das habe ich erlebt\" diyor: okulunda iki yıl bireysel destekten söz edilmiş ama kimseye zaman verilmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h3-20",
              no: 20,
              ref: "d1",
              text: "Welche Reihenfolge fordert er?",
              options: [
                "Erst die Regel ändern und dann fördern.",
                "Beides gleichzeitig beginnen.",
                "Erst fördern, dann die Regel ändern.",
              ],
              answer: 2,
              explain:
                "\"Zuerst die Förderung, dann die Regel\" diyor; kaldırma ilk adım değil son adım olmalı.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h3-21",
              no: 21,
              ref: "d1",
              text: "Was ergänzt Frau Nabert?",
              options: [
                "Es sollte keine Strafe sein.",
                "Die Noten sollten abgeschafft werden.",
                "Die Klassen sollten neu gemischt werden.",
              ],
              answer: 0,
              explain:
                "Ceza gibi göründüğü sürece ailelerin \"es abwählen\" ettiğini söylüyor, tek tek durumlarda anlamlı olsa bile.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h3-22",
              no: 22,
              ref: "d1",
              text: "Welche Bedingung stellt Herr Prantl an die Freiwilligkeit?",
              options: [
                "Die Eltern müssen schriftlich zustimmen.",
                "Die Alternative muss wirklich vorhanden sein.",
                "Die Entscheidung muss jährlich überprüft werden.",
              ],
              answer: 1,
              explain:
                "\"Freiwillig heißt nur dann freiwillig, wenn die Alternative real existiert. Sonst ist es Zwang mit anderem Namen.\"",
            },
          ],
        },
        {
          id: "de-b2-05-h4",
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
              situation: "Bir eğitim araştırmacısı fırsat eşitsizliğini anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Prof. Weinhold",
                  text: "Ich werde heute keine Antwort auf die Frage geben, ob Bildung gerecht ist. Diese Frage lässt sich nicht messen. Messen lässt sich, an welchen Stellen sich Unterschiede vergrößern — und das ist erstaunlich präzise bestimmbar.",
                },
                {
                  speaker: "Prof. Weinhold",
                  text: "Der erste Befund überrascht viele: Bei der Einschulung sind die Unterschiede bereits vorhanden, aber kleiner als später. Die Schule verringert sie nicht, sie vergrößert sie auch nicht gleichmäßig. Sie vergrößert sie sprunghaft, und zwar an Übergängen.",
                },
                {
                  speaker: "Prof. Weinhold",
                  text: "Zweitens die Ferien. In den langen Ferien verlieren Kinder ohne häusliche Unterstützung messbar an Lesekompetenz, während andere zulegen. Über sechs Sommer summiert sich das auf etwa ein Schuljahr.",
                },
                {
                  speaker: "Prof. Weinhold",
                  text: "Drittens, und das wird selten benannt: Die stärkste Einzelvariable ist nicht das Einkommen, sondern die Zahl der Bücher im Haushalt. Nicht weil Bücher zaubern, sondern weil sie anzeigen, wie über Schule gesprochen wird.",
                },
                {
                  speaker: "Prof. Weinhold",
                  text: "Viertens die Wirkung von Geld. Zusätzliche Mittel wirken, aber nur, wenn sie an Personen gebunden sind statt an Gebäude. Programme für Ausstattung zeigen in unseren Auswertungen fast keinen Effekt.",
                },
                {
                  speaker: "Prof. Weinhold",
                  text: "Daraus folgt eine unbequeme Empfehlung: Die wirksamste Maßnahme wäre eine verpflichtende Lernzeit in den Ferien. Sie ist unpopulär bei Eltern, bei Lehrkräften und bei Kindern — und in den Daten die klarste.",
                },
                {
                  speaker: "Prof. Weinhold",
                  text: "Ich schließe mit einer Einschränkung: Unsere Zahlen stammen aus Grundschulen. Für die Sekundarstufe fehlen vergleichbare Längsschnitte, und ich würde die Ergebnisse nicht ungeprüft übertragen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-05-h4-23",
              no: 23,
              ref: "v1",
              text: "Welche Frage will Prof. Weinhold nicht beantworten?",
              options: [
                "Ob Bildung gerecht ist.",
                "Wie viel Geld Schulen brauchen.",
                "Welche Schulform die beste ist.",
              ],
              answer: 0,
              explain:
                "Sunum bunu baştan dışlıyor: \"Diese Frage lässt sich nicht messen\"; ölçülebilen şey farkların nerede büyüdüğü.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-24",
              no: 24,
              ref: "v1",
              text: "Wo vergrößern sich die Unterschiede besonders?",
              options: [
                "Gleichmäßig über alle Schuljahre.",
                "An den Übergängen.",
                "Erst in der Oberstufe.",
              ],
              answer: 1,
              explain:
                "Okul farkları düzenli değil \"sprunghaft\" büyütüyor, ve bu sıçramalar geçişlerde oluyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-25",
              no: 25,
              ref: "v1",
              text: "Was passiert in den langen Ferien?",
              options: [
                "Alle Kinder verlieren gleichermaßen Kompetenz.",
                "Die Unterschiede bleiben unverändert.",
                "Ein Teil verliert, ein anderer legt zu.",
              ],
              answer: 2,
              explain:
                "Evde desteği olmayan çocuklar okuma becerisi kaybediyor, ötekiler ilerliyor; altı yazda bu \"etwa ein Schuljahr\" ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-26",
              no: 26,
              ref: "v1",
              text: "Welche Variable nennt er als stärkste?",
              options: [
                "Das Einkommen der Eltern im Monat.",
                "Der Buchbestand zu Hause.",
                "Die Größe der Klasse.",
              ],
              answer: 1,
              explain:
                "En güçlü tek değişken gelir değil: \"die Zahl der Bücher im Haushalt\", çünkü okul hakkında nasıl konuşulduğunu gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-27",
              no: 27,
              ref: "v1",
              text: "Wie erklärt er die Wirkung dieser Variable?",
              options: [
                "Sie verrät die Haltung der Familie zur Schule.",
                "Bücher wirken unmittelbar auf die Leistung.",
                "Sie hängt eng mit dem Beruf der Eltern zusammen.",
              ],
              answer: 0,
              explain:
                "\"Nicht weil Bücher zaubern, sondern weil sie anzeigen, wie über Schule gesprochen wird\" — gösterge olduğunu vurguluyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-28",
              no: 28,
              ref: "v1",
              text: "Unter welcher Bedingung wirkt zusätzliches Geld?",
              options: [
                "Wenn es an Personen gebunden ist.",
                "Wenn es in Ausstattung fließt.",
                "Wenn es dauerhaft zugesagt wird.",
              ],
              answer: 0,
              explain:
                "Ek kaynak binaya değil kişiye bağlıysa etki ediyor; donanım programları \"fast keinen Effekt\" gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-29",
              no: 29,
              ref: "v1",
              text: "Warum nennt er seine Empfehlung unbequem?",
              options: [
                "Weil sie sehr teuer wäre.",
                "Weil sie bei allen Beteiligten unbeliebt ist.",
                "Weil sie erst in zehn Jahren wirkt.",
              ],
              answer: 1,
              explain:
                "Tatilde zorunlu öğrenme zamanı \"unpopulär bei Eltern, bei Lehrkräften und bei Kindern\" — ama verilerde en net olan önlem.",
            },
            {
              kind: "mcq",
              id: "de-b2-05-h4-30",
              no: 30,
              ref: "v1",
              text: "Womit schließt der Vortrag?",
              options: [
                "Mit einer Forderung an die Politik.",
                "Mit einem Ausblick auf neue Programme.",
                "Mit einem Hinweis auf die Grenzen der Daten.",
              ],
              answer: 2,
              explain:
                "Son cümleler sınırı çiziyor: veriler ilkokullardan geliyor ve \"Für die Sekundarstufe fehlen vergleichbare Längsschnitte\".",
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
          id: "de-b2-05-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer sich anstrengt, kommt in unserem Bildungssystem überall hin.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Çabalayan, bizim eğitim sistemimizde her yere gelir.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz stimmt für einen Teil der Kinder und wird gerade deshalb so gern zitiert. Er beschreibt die Ausnahme und klingt wie die Regel.

Meine Nichte hat in der vierten Klasse trotz guter Noten keine Gymnasialempfehlung bekommen; begründet wurde das mit ihrem mündlichen Ausdruck. Sie hat den Weg über die Realschule genommen und studiert heute. Dass sie es geschafft hat, spricht nicht für das System, sondern für ihre Hartnäckigkeit und für eine Tante, die Formulare lesen kann.

Hinzu kommt ein zweiter Punkt: Anstrengung ist selbst ungleich verteilt. Wer nach der Schule arbeitet oder Geschwister betreut, hat dieselben vierundzwanzig Stunden, aber nicht dieselbe Zeit.

Natürlich gibt es Kinder, die alle Möglichkeiten haben und sie nicht nutzen. Das ist ärgerlich und ändert an der Verteilung nichts.

Mein Schluss: Solange wir Ausnahmen als Beweis nehmen, müssen wir nichts ändern. Genau das ist die Funktion solcher Sätze.

Mit freundlichen Grüßen
Meral Doğan`,
            criteria: [
              "İddiaya doğrudan atıf yapıldı mı ve tutum net mi?",
              "En az iki farklı gerekçe var mı ve bunlar somut mu?",
              "Karşı görüş gerçekten ele alınıp yanıtlandı mı?",
              "Sonuç, sunulan gerekçelerden çıkıyor mu?",
              "Metin bağlaçlarla örülmüş mü? (gerade deshalb, hinzu kommt, natürlich, folglich)",
              "Resmî hitap ve veda var mı, yaklaşık 150 kelime mi?",
            ],
          },
        },
        {
          id: "de-b2-05-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Kind besucht die achte Klasse. Die Schule bietet Förderunterricht nur in der siebten Stunde an; Ihr Kind hat dann Sport. Schreiben Sie an die Klassenleitung (circa 100 Wörter).",
          promptTr:
            "Çocuğun sekizinci sınıfta. Okul destek dersini yalnız yedinci saatte veriyor; çocuğunun o saatte beden dersi var. Sınıf öğretmenine yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nehmen Sie Bezug auf das Angebot.", tr: "Mevcut desteğe atıf yap." },
              { de: "Beschreiben Sie den Konflikt.", tr: "Çakışmayı anlat." },
              { de: "Zeigen Sie, dass Sie das Angebot schätzen.", tr: "Desteği önemsediğini göster." },
              { de: "Schlagen Sie eine Lösung vor.", tr: "Bir çözüm öner." },
            ],
            sample: `Sehr geehrte Frau Delgado,

vielen Dank für Ihren Hinweis auf den Förderunterricht in Mathematik, der dienstags in der siebten Stunde stattfindet.

Leider liegt dieser Termin genau auf dem Sportunterricht meiner Tochter. Sie möchte an beidem teilnehmen und muss sich nun entscheiden, was ihr sichtlich schwerfällt.

Dass die Schule das Angebot überhaupt macht, weiß ich zu schätzen; mir ist bewusst, dass die Stunden knapp sind.

Wäre es möglich, den Förderunterricht in einer Woche auf einen anderen Tag zu legen oder meiner Tochter für diese Zeit eine Aufgabe zum selbstständigen Arbeiten mitzugeben? Ich würde zu Hause gern darauf achten.

Mit freundlichen Grüßen
Jens Brodersen`,
            criteria: [
              "Mevcut desteğe somut atıf var mı (ders, gün, saat)?",
              "Çakışma açıkça anlatıldı mı ve çocuğun durumu görünür mü?",
              "Okulun sınırları kabul edildi mi, yoksa yalnız talep mi var?",
              "Önerilen çözüm uygulanabilir ve birden çok seçenek sunuyor mu?",
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
          id: "de-b2-05-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Sollen alle Kinder gemeinsam bis Klasse zehn lernen?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Vorteile — Nachteile — eigene Position — Abschluss.",
          promptTr:
            "\"Bütün çocuklar onuncu sınıfa kadar birlikte mi okumalı?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — artılar — eksiler — kendi konumun — kapanış.",
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Lage im Herkunftsland", tr: "Kendi ülkendeki durum" },
              { de: "Vorteile mit Beispiel", tr: "Örnekle desteklenmiş artılar" },
              { de: "Nachteile mit Beispiel", tr: "Örnekle desteklenmiş eksiler" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute darüber sprechen, ob Kinder länger gemeinsam lernen sollten. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Vor- und Nachteile, danach meine Position. In Polen gehen alle Kinder acht Jahre gemeinsam zur Schule; die Trennung kommt erst mit fünfzehn. Meine Cousine war lange schwach in Mathematik und hat sich in der siebten Klasse gefangen — in einem getrennten System wäre diese Entscheidung längst gefallen. Ein Vorteil des gemeinsamen Lernens liegt also darin, dass späte Entwicklungen noch etwas ändern können. Ein Nachteil ist die Spannweite: Meine Cousine saß in einer Klasse, in der einige kaum lesen konnten und andere Bücher verschlangen. Ohne Teilung in einzelnen Fächern überfordert das jede Lehrkraft. Meine Position ist deshalb differenziert: gemeinsame Klassen bis sechzehn, aber mit Kursen auf zwei Niveaus in Mathematik und in der Fremdsprache. Zusammenfassend: Die Frage ist weniger, ob man trennt, sondern wann und wie lange die Entscheidung offen bleibt.",
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
          id: "de-b2-05-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihre Schule bekommt 12 000 Euro zusätzlich. Einigen Sie sich mit Ihrer Gesprächspartnerin, wofür das Geld ausgegeben wird: zusätzliche Förderstunden, digitale Ausstattung, eine Schulsozialarbeiterin oder eine Ferienlernwoche.",
          promptTr:
            "Okulunuza 12 000 euro ek bütçe geliyor. Bu paranın nereye harcanacağı konusunda karşındakiyle anlaş: ek destek dersleri, dijital donanım, bir okul sosyal hizmet uzmanı ya da tatilde bir öğrenme haftası.",
          prepSeconds: 90,
          exchange: [
            {
              who: "partner",
              de: "Wir müssen uns bis Freitag entscheiden. Ich wäre für die digitale Ausstattung — die Geräte sind acht Jahre alt und alle sehen den Nutzen sofort. Was halten Sie davon?",
              tr: "Cumaya kadar karar vermeliyiz. Ben dijital donanımdan yanayım — cihazlar sekiz yaşında ve faydası hemen görülür. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve karşı tarafın gerekçesini de ele al.",
              expect: "bir seçeneği gerekçelendirerek savunmak ve karşı gerekçeyi ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das leuchtet mir teilweise ein. Nur bedenken Sie: Förderstunden sind nach einem Jahr weg, ein Gerät bleibt fünf Jahre. Wir würden das Geld einmal ausgeben und dann wieder dastehen wie jetzt.",
              tr: "Kısmen mantıklı. Ama şunu düşün: Destek dersleri bir yıl sonra biter, cihaz beş yıl kalır. Parayı bir kez harcayıp yine bugünkü noktaya döneriz.",
            },
            {
              who: "you",
              hint: "Kalıcılık itirazını ele al ve bir birleşim öner.",
              expect: "bir itiraza karşılık verip iki seçeneği birleştiren bir model önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Über eine Mischung könnte ich reden. Nur reicht das Geld dann nicht für alles. Worauf würden Sie zuerst verzichten?",
              tr: "Karma bir çözümü konuşabilirim. Ama o zaman para her şeye yetmez. İlk neyden vazgeçersin?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden elediğini söyle.",
              expect: "kaynakları önceliklendirmek ve bir seçeneği gerekçeyle elemek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen wir zusammen, damit ich es in der Konferenz vortragen kann: Worauf haben wir uns geeinigt?",
              tr: "Peki. Toplantıda aktarabilmem için toparlayalım: Neyde anlaştık?",
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
              "Den Zustand der Geräte bestreite ich nicht, ich halte die Reihenfolge nur für falsch: Ein neues Tablet hilft dem Kind nicht, das den Text nicht versteht. Ihr Einwand mit der Nachhaltigkeit trifft allerdings zu. Deshalb schlage ich vor: 8000 Euro für Förderstunden, die an feste Personen gebunden sind, und 4000 für Geräte, aber nur für die Klassen, die sie im Förderunterricht wirklich nutzen. Verzichten würde ich zuerst auf die Ferienwoche, weil wir ohne Personal dafür ohnehin niemanden hätten. Wir hätten uns also geeinigt auf: Förderstunden als Schwerpunkt, ein kleinerer Teil für Geräte, keine Ferienwoche in diesem Jahr, und wir beantragen die Sozialarbeit im nächsten Haushalt erneut.",
            criteria: [
              "Kendi konumu gerekçelendirildi mi?",
              "Karşı tarafın itirazı gerçekten ele alındı mı?",
              "Öncelik belirlenirken neyin elendiği ve nedeni söylendi mi?",
              "Özet eksiksiz mi ve konuşmada varılan şeyi yansıtıyor mu?",
              "Tartışma dili kullanıldı mı? (Ihr Einwand trifft zu, ich halte die Reihenfolge für, wir hätten uns geeinigt auf)",
            ],
          },
        },
      ],
    },
  ],
};
