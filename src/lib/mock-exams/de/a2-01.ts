import type { MockPaper } from "../types";

/**
 * A2 · Deneme 1 — "Freizeit und Gesundheit".
 *
 * ÖLÇÜM PLANI (A2: alışılmış konularda basit ve doğrudan bilgi alışverişi;
 * kısa metinlerin ana noktasını ve tek tek bilgileri anlamak):
 *
 *   Lesen  30 dk · 20 madde
 *     Teil 1  5  üç şıklı   blog/medya metni — ana nokta ve ayrıntı (gist)
 *     Teil 2  5  üç şıklı   program tablosu — seçici okuma (detail)
 *     Teil 3  5  üç şıklı   özel yazışma (detail)
 *     Teil 4  5  eşleştirme ilanlar — kim hangisine uyar (orientation)
 *   Hören  30 dk · 20 madde
 *     Teil 1  5  üç şıklı   radyo/telesekreter/anons (detail)
 *     Teil 2  5  eşleştirme tek bir uzun konuşma — kim ne yapıyor (detail)
 *     Teil 3  5  üç şıklı   ayrı ayrı kısa konuşmalar (detail)
 *     Teil 4  5  R/F        radyo söyleşisi — görüş anlama (opinion)
 *   Schreiben 30 dk  özel ileti + yarı resmî ileti
 *   Sprechen  15 dk  bilgi alışverişi · kendinden söz etme · birlikte planlama
 *
 * A2 SINIRI: Perfekt, Präteritum yalnız `sein/haben/Modalverben`, `weil/dass/
 * wenn` yan cümleleri, karşılaştırma, `möchte/könnte`. Edilgen, Konjunktiv II
 * ve ilgi zamiri (`dessen/deren`) yok.
 *
 * ÇELDİRİCİ MANTIĞI: eşleştirme görevinde üç ilan hiçbir kişiye uymuyor ve
 * bunların üçü de TEK bir ölçütte düşüyor (saat, yaş, grup büyüklüğü). Amaç
 * öğrencinin ilanı baştan sona okumasını zorunlu kılmak.
 */
export const A2_01: MockPaper = {
  id: "de-a2-01",
  course: "de",
  level: "A2",
  no: 1,
  theme: "Freizeit und Gesundheit",
  themeTr: "Boş zaman ve sağlık",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen einen Blogtext, ein Programm, eine E-Mail und Anzeigen. Wählen Sie zu jeder Aufgabe die richtige Lösung.",
      instructionTr:
        "Bu bölümde dört görev var: bir blog yazısı, bir program, bir e-posta ve ilanlar okuyacaksın. Her madde için doğru cevabı seç.",
      tasks: [
        {
          id: "de-a2-01-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 5. Wählen Sie: a, b oder c.",
          promptTr: "Metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Mein erstes Jahr im Chor",
              body: `Vor einem Jahr habe ich etwas Neues probiert: Ich bin in einen Chor gegangen.

Angefangen hat alles mit einer Erkältung. Ich war zwei Wochen krank und habe abends nur ferngesehen. Meine Nachbarin Ruth hat mich besucht. Sie hat gesagt: "Komm doch einfach mit. Wir singen jeden Donnerstag."

Ich habe geantwortet, dass ich nicht singen kann. Ruth hat nur gelacht. "Das sagen am Anfang alle."

Die erste Probe war schrecklich. Ich habe die richtigen Töne nicht gefunden. Nach zwanzig Minuten wollte ich nach Hause gehen. Aber niemand hat mich angeschaut, weil alle mit sich selbst beschäftigt waren.

Nach der Probe hat mich der Chorleiter gefragt: "Kommst du nächste Woche wieder?" Ich habe sofort Ja gesagt.

Heute singe ich seit zwölf Monaten. Meine Stimme ist wahrscheinlich nicht besser geworden. Aber ich schlafe besser und ich bin seltener krank. Donnerstags gehe ich auch nie mehr spät ins Bett.

Im Juni haben wir unser erstes Konzert. Ruth sitzt dann im Publikum: Sie hat sich das Bein gebrochen und darf nicht mitsingen.`,
              gloss: [
                { de: "die Probe", tr: "prova", en: "rehearsal" },
                { de: "der Ton (die Töne)", tr: "nota, ses perdesi", en: "note, pitch" },
                { de: "beschäftigt sein mit", tr: "bir şeyle meşgul olmak", en: "to be busy with" },
                { de: "das Publikum", tr: "seyirci, dinleyiciler", en: "audience" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-01-l1-1",
              no: 1,
              text: "Wie ist die Autorin zum Chor gekommen?",
              options: ["Der Chorleiter hat sie eingeladen.", "Ihre Nachbarin hat sie mitgenommen.", "Ihr Arzt hat es empfohlen."],
              answer: 1,
              explain:
                "Komşusu Ruth ziyarete geliyor ve \"Komm doch einfach mit\" diyor. Koro şefi metinde var ama onu ancak İLK provadan sonra tekrar çağırıyor; başlangıçtaki davet komşudan geliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l1-2",
              no: 2,
              text: "Wie war die erste Probe für die Autorin?",
              options: ["Schwierig.", "Langweilig.", "Lustig."],
              answer: 0,
              explain:
                "\"Die erste Probe war schrecklich\", doğru notaları bulamıyor ve yirmi dakika sonra gitmek istiyor. Bu zorluktur; sıkıcı ya da eğlenceli değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l1-3",
              no: 3,
              text: "Wie haben die anderen im Chor reagiert?",
              options: ["Sie haben ihr geholfen.", "Sie haben sie ausgelacht.", "Sie haben sie nicht beachtet."],
              answer: 2,
              explain:
                "\"niemand hat mich angeschaut, weil alle mit sich selbst beschäftigt waren\" — kimse ilgilenmiyor. Bu metinde olumlu bir şey: kimse alay da etmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l1-4",
              no: 4,
              text: "Was hat sich nach einem Jahr verändert?",
              options: ["Ihre Stimme ist viel besser.", "Sie ist gesünder als vorher.", "Sie hat mehr Freizeit."],
              answer: 1,
              explain:
                "Sesi için \"wahrscheinlich nicht besser geworden\" diyor. Değişen şey sağlığı: daha iyi uyuyor ve daha seyrek hastalanıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l1-5",
              no: 5,
              text: "Warum singt Ruth beim Konzert nicht mit?",
              options: ["Sie ist verletzt.", "Sie ist verreist.", "Sie hat den Chor verlassen."],
              answer: 0,
              explain:
                "\"Sie hat sich das Bein gebrochen und darf nicht mitsingen\" — bacağı kırık. Konserde seyirci olarak var, yani korodan ayrılmamış.",
            },
          ],
        },
        {
          id: "de-a2-01-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie das Programm und die Aufgaben 6 bis 10. Wählen Sie: a, b oder c.",
          promptTr: "Programı ve 6–10. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Veranstaltungsprogramm",
              genreTr: "Etkinlik programı",
              title: "Gesundheitswoche im Bürgerhaus Weststadt",
              body: `Montag bis Freitag · Eintritt frei

MONTAG
16.00  Vortrag: Schlafen Sie gut? (Saal 1)
18.00  Rückengymnastik für Anfänger (Turnhalle, bitte Handtuch mitbringen)

DIENSTAG
10.00  Kochkurs: schnell und günstig kochen (Küche, Anmeldung nötig)
17.30  Beratung: Rauchen aufhören (Raum 4, ohne Anmeldung)

MITTWOCH
Das Bürgerhaus bleibt heute geschlossen.

DONNERSTAG
15.00  Blutdruck messen (Foyer, ohne Anmeldung)
19.00  Film: Ein Jahr ohne Zucker (Saal 1, danach Gespräch)

FREITAG
09.00–13.00  Fahrradwerkstatt für alle (Hof)
14.00  Spaziergang durch den Stadtwald (Treffpunkt: Eingang)`,
              gloss: [
                { de: "der Eintritt", tr: "giriş (ücreti)", en: "admission" },
                { de: "die Anmeldung", tr: "kayıt", en: "registration" },
                { de: "der Blutdruck", tr: "tansiyon", en: "blood pressure" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-01-l2-6",
              no: 6,
              text: "Was kosten die Veranstaltungen?",
              options: ["Nichts.", "Fünf Euro pro Tag.", "Das steht nicht im Programm."],
              answer: 0,
              explain: "Başlığın altında \"Eintritt frei\" yazıyor: giriş ücretsiz. Programda başka bir fiyat geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l2-7",
              no: 7,
              text: "Für welche Veranstaltung muss man sich anmelden?",
              options: ["Für die Rückengymnastik.", "Für den Kochkurs.", "Für die Beratung."],
              answer: 1,
              explain:
                "Yalnız yemek kursunda \"Anmeldung nötig\" yazıyor. Danışmada açıkça \"ohne Anmeldung\", jimnastikte ise havlu isteniyor, kayıt değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l2-8",
              no: 8,
              text: "Sie haben nur am Mittwoch Zeit. Was können Sie machen?",
              options: ["Einen Film sehen.", "Den Blutdruck messen lassen.", "Nichts, das Haus ist zu."],
              answer: 2,
              explain:
                "Çarşamba \"Das Bürgerhaus bleibt heute geschlossen\". Film ve tansiyon ölçümü perşembe günü.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l2-9",
              no: 9,
              text: "Sie möchten Ihr Fahrrad reparieren. Wann gehen Sie hin?",
              options: ["Am Donnerstagnachmittag.", "Am Freitagvormittag.", "Am Montagabend."],
              answer: 1,
              explain: "Bisiklet atölyesi cuma 09.00–13.00 arası, yani sabah. Öteki iki saat başka etkinliklere ait.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l2-10",
              no: 10,
              text: "Was sollen Sie zur Rückengymnastik mitbringen?",
              options: ["Ein Handtuch.", "Sportschuhe.", "Eine Anmeldung."],
              answer: 0,
              explain: "Parantez içinde \"bitte Handtuch mitbringen\" yazıyor. Ayakkabıdan söz edilmiyor, kayıt da istenmiyor.",
            },
          ],
        },
        {
          id: "de-a2-01-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie die E-Mail und die Aufgaben 11 bis 15. Wählen Sie: a, b oder c.",
          promptTr: "E-postayı ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "E-Mail",
              genreTr: "E-posta",
              title: "Von: Katja · An: Miriam",
              body: `Liebe Miriam,

endlich habe ich Zeit zum Schreiben. Seit dem Umzug ist bei uns viel los.

Die neue Wohnung ist kleiner als die alte, aber sie hat einen Balkon. Jonas ist glücklich, weil sein Weg zur Arbeit jetzt nur zehn Minuten dauert. Ich brauche länger als früher, aber das ist mir egal.

Am Wochenende waren wir zum ersten Mal im neuen Sportverein. Ich wollte eigentlich schwimmen, aber der Kurs war schon voll. Deshalb habe ich mich für Volleyball angemeldet. Das habe ich seit der Schule nicht mehr gespielt.

Und du? Machst du immer noch jeden Morgen Yoga? Ich habe es zweimal probiert und bin beide Male eingeschlafen.

Kommst du uns im Mai besuchen? Ein Gästezimmer haben wir leider nicht mehr, aber das Sofa im Wohnzimmer ist bequem. Sag einfach Bescheid, dann hole ich dich vom Bahnhof ab.

Liebe Grüße
Katja`,
              gloss: [
                { de: "der Umzug", tr: "taşınma", en: "move (house)" },
                { de: "das ist mir egal", tr: "benim için fark etmez", en: "I don't mind" },
                { de: "Bescheid sagen", tr: "haber vermek", en: "to let someone know" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-01-l3-11",
              no: 11,
              text: "Was ist an der neuen Wohnung besser?",
              options: ["Sie ist größer als die alte Wohnung.", "Zur Wohnung gehört ein Balkon.", "Sie ist billiger."],
              answer: 1,
              explain:
                "\"Die neue Wohnung ist kleiner als die alte, aber sie hat einen Balkon\" — `aber` olumlu tarafı işaret ediyor. Daire küçülmüş, yani (a) metnin tersi; kira hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l3-12",
              no: 12,
              text: "Wer hat jetzt einen kürzeren Weg zur Arbeit?",
              options: ["Jonas.", "Katja.", "Beide."],
              answer: 0,
              explain:
                "Jonas'ın yolu on dakika sürüyor; Katja \"brauche länger als früher\" diyor, yani onun yolu uzadı.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l3-13",
              no: 13,
              text: "Warum spielt Katja jetzt Volleyball?",
              options: ["Sie spielt es seit der Schule.", "Jonas hat es vorgeschlagen.", "Der Schwimmkurs war schon voll."],
              answer: 2,
              explain:
                "Aslında yüzmek istiyordu ama kurs doluydu; `deshalb` sonucu bağlıyor. Okuldan beri voleybol OYNAMADIĞINI söylüyor, tam tersini değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l3-14",
              no: 14,
              text: "Was schreibt Katja über Yoga?",
              options: ["Sie macht es jeden Morgen.", "Sie ist dabei eingeschlafen.", "Sie findet es zu teuer."],
              answer: 1,
              explain:
                "Her sabah yoga yapan Miriam; Katja iki kez denemiş ve ikisinde de uyuyakalmış. Soru Katja'yı soruyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-l3-15",
              no: 15,
              text: "Wo soll Miriam im Mai schlafen?",
              options: ["Auf dem Sofa.", "Im Gästezimmer.", "In einem Hotel."],
              answer: 0,
              explain:
                "Misafir odası artık yok; kanepe teklif ediliyor ve \"bequem\" deniyor. Otel hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-a2-01-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen ein Sportangebot. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler bir spor etkinliği arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Lauftreff Stadtpark",
              body: "Jeden Samstag um 9 Uhr, das ganze Jahr — auch bei Kälte. Kostenlos und ohne Anmeldung. Alle Tempos willkommen, wir laufen in kleinen Gruppen.",
            },
            {
              key: "b",
              label: "Wassergymnastik 60+",
              body: "Sanfte Bewegung im warmen Becken, ohne Sprünge. Dienstag und Donnerstag um 10 Uhr. Kein Leistungsdruck, kein Wettkampf.",
            },
            {
              key: "c",
              label: "Familiensonntag in der Kletterhalle",
              body: "Jeden Sonntag von 11 bis 17 Uhr. Kinder ab 4 Jahren klettern mit ihren Eltern. Einfach vorbeikommen, keine Anmeldung.",
            },
            {
              key: "d",
              label: "Schwimmkurs für Jugendliche",
              body: "Ferienkurs von Montag bis Freitag, 14 bis 15.30 Uhr. Für Jugendliche ab 12 Jahren, auch für Anfänger. Anmeldung im Schwimmbad.",
            },
            {
              key: "e",
              label: "Volleyball-Turnier der Betriebe",
              body: "Samstag ab 10 Uhr in der Sporthalle Ost. Mannschaften ab sechs Personen. Anmeldung bis Freitag im Büro.",
            },
            {
              key: "f",
              label: "Frauen-Fitness am Abend",
              body: "Montag und Mittwoch um 19 Uhr, nur für Frauen. Die erste Stunde ist kostenlos. Kinderbetreuung im Haus.",
            },
            {
              key: "g",
              label: "Yoga am Morgen",
              body: "Täglich um 6.30 Uhr vor der Arbeit. Nur mit Mitgliedschaft, ab 45 Euro im Monat. Matten sind vorhanden.",
            },
            {
              key: "h",
              label: "Schwimmkurs für Erwachsene",
              body: "Samstags von 8 bis 9 Uhr. Für Anfänger ohne Vorkenntnisse. Zehn Termine, 90 Euro.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-01-l4-16",
              no: 16,
              text: "Herr Neumann (68) hat Rückenschmerzen. Er sucht Bewegung ohne Sprünge und ohne Wettkampf.",
              answer: "b",
              explain:
                "(b) üç ölçütü de karşılıyor: 60 yaş üstü, \"ohne Sprünge\", \"kein Wettkampf\". (h) da havuzda ama yüzme kursu ve sıçrama/başlangıç meselesi; (a) koşu, sırt için istenen şey değil.",
            },
            {
              kind: "match",
              id: "de-a2-01-l4-17",
              no: 17,
              text: "Lea (14) will in den Ferien schwimmen lernen. Vormittags hat sie keine Zeit.",
              answer: "d",
              explain:
                "(d) tatil kursu, 12 yaş üstü ve saat 14.00 — öğleden sonra. (h) de yüzme kursu ama yetişkinler için ve sabah 8'de: iki ölçütte birden düşüyor.",
            },
            {
              kind: "match",
              id: "de-a2-01-l4-18",
              no: 18,
              text: "Frau Osei arbeitet bis 18 Uhr. Danach möchte sie Sport mit anderen Frauen machen.",
              answer: "f",
              explain:
                "(f) saat 19.00, yani mesai sonrası, ve \"nur für Frauen\". (g) da bir kurs ama sabah 6.30 — çalışma saatinden önce.",
            },
            {
              kind: "match",
              id: "de-a2-01-l4-19",
              no: 19,
              text: "Timo (30) möchte im Winter draußen laufen, am liebsten in einer Gruppe und ohne Kosten.",
              answer: "a",
              explain:
                "(a) açık havada, \"das ganze Jahr — auch bei Kälte\", grup hâlinde ve ücretsiz. Dört ölçüt de tutuyor.",
            },
            {
              kind: "match",
              id: "de-a2-01-l4-20",
              no: 20,
              text: "Familie Wolf möchte am Sonntag mit den Kindern etwas Aktives machen, ohne sich anzumelden.",
              answer: "c",
              explain:
                "(c) pazar günü, çocuklarla birlikte ve \"keine Anmeldung\". (e) de spor ama cumartesi, altı kişilik takım ve kayıt istiyor.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie hören Ansagen, ein längeres Gespräch, kurze Gespräche und ein Interview. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde dört görev var: anonslar, uzun bir konuşma, kısa konuşmalar ve bir söyleşi dinleyeceksin. Önce soruları oku.",
      tasks: [
        {
          id: "de-a2-01-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text einmal.",
          promptTr: "Doğru olan hangisi? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Verkehrsmeldung im Radio",
              genreTr: "Radyoda trafik anonsu",
              situation: "Radyoda trafik bilgisi veriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Und jetzt der Verkehr: Auf der Autobahn zwischen Bayreuth und Hof ist die rechte Spur gesperrt. Ein Lastwagen ist liegen geblieben. Autofahrer brauchen etwa zwanzig Minuten länger. Die Sperrung dauert bis zum Nachmittag.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Bir spor salonu arıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist das Fitnessstudio Aktiv. Ihr Probetraining am Montag müssen wir leider verschieben, weil der Trainer krank ist. Wir schlagen Ihnen Mittwoch um achtzehn Uhr vor. Bitte melden Sie sich kurz zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Durchsage im Schwimmbad",
              genreTr: "Havuzda anons",
              situation: "Havuzda duyuru yapılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Achtung, eine Durchsage: Das Sportbecken ist in zehn Minuten für einen Schwimmkurs reserviert. Bitte wechseln Sie dann in das Freizeitbecken. Die Sauna bleibt wie gewohnt geöffnet.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Wetterbericht",
              genreTr: "Hava durumu",
              situation: "Yarının hava durumu okunuyor.",
              plays: 1,
              segments: [
                {
                  text: "Das Wetter für morgen: Am Vormittag bleibt es trocken und kühl. Ab Mittag kommt Regen aus dem Westen. Die Temperaturen liegen bei zwölf Grad. Am Abend wird es wieder freundlich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Ansage am Telefon",
              genreTr: "Telefondaki sesli anons",
              situation: "Nöbetçi eczane bilgisi.",
              plays: 1,
              segments: [
                {
                  text: "Der Apotheken-Notdienst heute Nacht: Die Stern-Apotheke in der Ringstraße hat bis acht Uhr morgens geöffnet. Bitte bringen Sie Ihren Ausweis mit. Für den Notdienst zahlen Sie fünf Euro zusätzlich.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-01-h1-1",
              no: 1,
              ref: "h1",
              text: "Warum ist die Spur gesperrt?",
              options: ["Wegen eines Unfalls.", "Wegen eines defekten Lastwagens.", "Wegen Bauarbeiten."],
              answer: 1,
              explain:
                "\"Ein Lastwagen ist liegen geblieben\" — kamyon arızalanmış. `liegen bleiben` kaza demek değildir; yol çalışması da anılmıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h1-2",
              no: 2,
              ref: "h2",
              text: "Warum ruft das Fitnessstudio an?",
              options: ["Das Studio ist geschlossen.", "Der Kunde hat nicht bezahlt.", "Der Termin wird verschoben."],
              answer: 2,
              explain:
                "«Ihr Probetraining am Montag müssen wir leider verschieben» — aramanın konusu erteleme. Antrenörün hasta olması bunun NEDENİ, konusu değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h1-3",
              no: 3,
              ref: "h3",
              text: "Was sollen die Gäste machen?",
              options: ["In das andere Becken gehen.", "Das Bad verlassen.", "In die Sauna gehen."],
              answer: 0,
              explain:
                "\"Bitte wechseln Sie dann in das Freizeitbecken\" — başka havuza geçmek. Sauna bilgisi yalnız değişiklik olmadığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h1-4",
              no: 4,
              ref: "h4",
              text: "Wann regnet es morgen?",
              options: ["Am Vormittag.", "Am Abend.", "Am Nachmittag."],
              answer: 2,
              explain:
                "\"Ab Mittag kommt Regen\" — öğleden sonra. Sabah kuru, akşam yeniden açıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h1-5",
              no: 5,
              ref: "h5",
              text: "Was müssen Sie mitbringen?",
              options: ["Ein Rezept.", "Ihren Ausweis.", "Genau fünf Euro in bar."],
              answer: 1,
              explain:
                "Getirilmesi istenen tek şey kimlik. Beş euro ödenecek bir ücret, ama \"bar\" (nakit) denmiyor; reçete hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-a2-01-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen übernehmen eine Aufgabe für das Fest. Was macht wer? Ordnen Sie zu. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi şenlik için bir iş üstleniyor. Kim ne yapıyor? Eşleştir. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch in der Nachbarschaft",
              genreTr: "Komşular arasında konuşma",
              situation: "Komşular mahalle şenliği için işleri paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Sara", text: "Also, das Fest ist am Samstag. Lena, was übernimmst du?" },
                { speaker: "Lena", text: "Ich backe wieder Kuchen, so wie letztes Jahr." },
                { speaker: "Sara", text: "Sehr gut. Bekir, kaufst du die Getränke?" },
                { speaker: "Bekir", text: "Die Getränke habe ich letztes Jahr gemacht. Diesmal möchte ich lieber die Spiele für die Kinder leiten." },
                { speaker: "Sara", text: "In Ordnung. Herr Voss, Sie haben ein Auto. Übernehmen Sie die Getränke?" },
                { speaker: "Herr Voss", text: "Ja, gern. Soll ich auch die Stühle aus dem Keller holen?" },
                { speaker: "Sara", text: "Nein danke, die Stühle macht Tom. Er ist am Vormittag schon da." },
                { speaker: "Tom", text: "Genau. Ich baue dann auch gleich die Tische auf." },
                { speaker: "Sara", text: "Die Tische baue ich auf, du hast sonst zu viel zu tun. Und Frau Adler?" },
                { speaker: "Frau Adler", text: "Ich bringe meine Gitarre mit und spiele ein paar Lieder." },
              ],
            },
          ],
          options: [
            { key: "a", label: "Kuchen backen" },
            { key: "b", label: "Getränke kaufen" },
            { key: "c", label: "Musik machen" },
            { key: "d", label: "Stühle holen" },
            { key: "e", label: "Tische aufbauen" },
            { key: "f", label: "Kinderspiele leiten" },
            { key: "g", label: "Fotos machen" },
            { key: "h", label: "am Abend aufräumen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-01-h2-6",
              no: 6,
              ref: "g1",
              text: "Lena",
              answer: "a",
              explain: "\"Ich backe wieder Kuchen\" — ilk ve tek görevi bu, sonradan değişmiyor.",
            },
            {
              kind: "match",
              id: "de-a2-01-h2-7",
              no: 7,
              ref: "g1",
              text: "Bekir",
              answer: "f",
              explain:
                "«Die Getränke habe ich letztes Jahr gemacht. Diesmal möchte ich lieber die Spiele für die Kinder leiten» — içecek işi teklif ediliyor ama reddediliyor.",
            },
            {
              kind: "match",
              id: "de-a2-01-h2-8",
              no: 8,
              ref: "g1",
              text: "Herr Voss",
              answer: "b",
              explain:
                "Arabası olduğu için içecekleri o alıyor. Sandalyeleri de teklif ediyor ama Sara \"Nein danke\" diyor.",
            },
            {
              kind: "match",
              id: "de-a2-01-h2-9",
              no: 9,
              ref: "g1",
              text: "Tom",
              answer: "d",
              explain:
                "Sandalyeler ona veriliyor. Masaları da yapmayı öneriyor, ama Sara üstleniyor: \"Die Tische baue ich auf\".",
            },
            {
              kind: "match",
              id: "de-a2-01-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Adler",
              answer: "c",
              explain: "\"Ich bringe meine Gitarre mit und spiele ein paar Lieder\" — müzik onun işi.",
            },
          ],
        },
        {
          id: "de-a2-01-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "k1",
              genre: "Gespräch in der Apotheke",
              genreTr: "Eczanede konuşma",
              situation: "Bir müşteri boğaz ağrısı için geliyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Ich habe seit gestern Halsschmerzen." },
                { speaker: "Apothekerin", text: "Haben Sie auch Fieber?" },
                { speaker: "Kunde", text: "Nein, nur Halsschmerzen." },
                { speaker: "Apothekerin", text: "Dann nehmen Sie diese Lutschtabletten. Wenn Fieber dazukommt, kommen Sie wieder." },
              ],
            },
            {
              kind: "audio",
              id: "k2",
              genre: "Gespräch in der Arztpraxis",
              genreTr: "Muayenehanede konuşma",
              situation: "Bir hasta randevu istiyor.",
              plays: 2,
              segments: [
                { speaker: "Arzthelferin", text: "Der nächste freie Termin ist am vierzehnten Mai." },
                { speaker: "Patientin", text: "So lange kann ich nicht warten, ich habe starke Schmerzen." },
                { speaker: "Arzthelferin", text: "Dann kommen Sie morgen in die offene Sprechstunde, acht bis zehn Uhr. Sie müssen aber mit Wartezeit rechnen." },
                { speaker: "Patientin", text: "Das mache ich." },
              ],
            },
            {
              kind: "audio",
              id: "k3",
              genre: "Gespräch im Sportgeschäft",
              genreTr: "Spor mağazasında konuşma",
              situation: "Bir müşteri koşu ayakkabısı arıyor.",
              plays: 2,
              segments: [
                { speaker: "Verkäufer", text: "Suchen Sie Laufschuhe für die Straße oder für den Wald?" },
                { speaker: "Kundin", text: "Für den Wald. Ich laufe fast nur im Gelände." },
                { speaker: "Verkäufer", text: "Dann brauchen Sie ein festeres Profil. Dieses Modell ist gut." },
                { speaker: "Kundin", text: "Haben Sie es in Größe neununddreißig?" },
              ],
            },
            {
              kind: "audio",
              id: "k4",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın kursun fiyatını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Mitarbeiter", text: "Der Kurs kostet achtzig Euro für zehn Termine." },
                { speaker: "Interessentin", text: "Gibt es einen Rabatt für Studenten?" },
                { speaker: "Mitarbeiter", text: "Ja, mit Studentenausweis zahlen Sie sechzig." },
                { speaker: "Interessentin", text: "Perfekt, dann melde ich mich an." },
              ],
            },
            {
              kind: "audio",
              id: "k5",
              genre: "Gespräch nach dem Training",
              genreTr: "Antrenman sonrası konuşma",
              situation: "İki arkadaş ilk antrenmanı konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Nina", text: "Und, wie war dein erstes Training?" },
                { speaker: "Paul", text: "Anstrengend. Aber der Trainer war nett. Nächste Woche komme ich wieder." },
                { speaker: "Nina", text: "Tut dir etwas weh?" },
                { speaker: "Paul", text: "Die Beine. Morgen kann ich bestimmt nicht laufen." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-01-h3-11",
              no: 11,
              ref: "k1",
              text: "Was bekommt der Kunde?",
              options: ["Ein Mittel gegen Fieber.", "Eine Salbe.", "Lutschtabletten."],
              answer: 2,
              explain:
                "«Haben Sie auch Fieber?» sorusuna «Nein» deniyor, bunun üzerine «Dann nehmen Sie diese Lutschtabletten». Ateş çıkarsa tekrar gelmek bir koşul, verilen ilaç değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h3-12",
              no: 12,
              ref: "k2",
              text: "Wann geht die Patientin zum Arzt?",
              options: ["Morgen früh.", "Am vierzehnten Mai.", "Heute Nachmittag."],
              answer: 0,
              explain:
                "14 Mayıs beklemek istemediği randevu. Yarın sabahki açık poliklinik saatine gidiyor: \"Das mache ich\".",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h3-13",
              no: 13,
              ref: "k3",
              text: "Welche Schuhe braucht die Kundin?",
              options: ["Schuhe für die Straße.", "Schuhe für den Wald.", "Schuhe für die Halle."],
              answer: 1,
              explain: "\"Für den Wald. Ich laufe fast nur im Gelände\" — arazi için, bu yüzden daha sert taban öneriliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h3-14",
              no: 14,
              ref: "k4",
              text: "Wie viel bezahlt die Frau?",
              options: ["80 Euro.", "10 Euro.", "60 Euro."],
              answer: 2,
              explain:
                "Normal fiyat 80; öğrenci indirimiyle 60 ödüyor ve kaydolacağını söylüyor. 10 rakamı ders sayısı.",
            },
            {
              kind: "mcq",
              id: "de-a2-01-h3-15",
              no: 15,
              ref: "k5",
              text: "Wie findet Paul das Training?",
              options: ["Anstrengend, aber er macht weiter.", "Zu schwer, er hört auf.", "Zu leicht."],
              answer: 0,
              explain:
                "\"Anstrengend\" diyor ama hemen ardından \"Nächste Woche komme ich wieder\". Bacak ağrısı bırakacağı anlamına gelmiyor.",
            },
          ],
        },
        {
          id: "de-a2-01-h4",
          no: 4,
          format: "truefalse",
          goal: "opinion",
          prompt: "Sie hören ein Interview. Sind die Sätze richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir söyleşi dinleyeceksin. Cümleler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir fizyoterapist uzun süre oturmayı anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Renner, viele Menschen sitzen acht Stunden am Tag. Ist das wirklich so schlimm?" },
                { speaker: "Frau Renner", text: "Sitzen ist nicht das Problem. Das Problem ist die gleiche Haltung über Stunden." },
                { speaker: "Moderator", text: "Hilft dann ein teurer Bürostuhl?" },
                { speaker: "Frau Renner", text: "Ein guter Stuhl hilft ein bisschen. Wichtiger ist, dass Sie jede halbe Stunde kurz aufstehen." },
                { speaker: "Moderator", text: "Manche Firmen kaufen jetzt Schreibtische zum Stehen." },
                { speaker: "Frau Renner", text: "Das ist gut, wenn man wechselt. Wer den ganzen Tag steht, bekommt andere Probleme." },
                { speaker: "Moderator", text: "Und Sport am Abend? Reicht das?" },
                { speaker: "Frau Renner", text: "Zwei Stunden Sport am Abend sind nicht genug. Bewegung muss über den Tag verteilt sein." },
                { speaker: "Moderator", text: "Was empfehlen Sie ganz konkret?" },
                { speaker: "Frau Renner", text: "Telefonieren Sie im Stehen. Nehmen Sie die Treppe. Und trinken Sie viel Wasser, dann stehen Sie öfter auf." },
              ],
              gloss: [
                { de: "die Haltung", tr: "duruş", en: "posture" },
                { de: "verteilt", tr: "dağıtılmış, yayılmış", en: "spread out" },
                { de: "empfehlen", tr: "önermek", en: "to recommend" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-01-h4-16",
              no: 16,
              ref: "i1",
              text: "Frau Renner sagt, dass Sitzen an sich ungesund ist.",
              answer: false,
              explain:
                "Tam tersini söylüyor: \"Sitzen ist nicht das Problem\". Sorun saatlerce aynı duruşta kalmak.",
            },
            {
              kind: "bool",
              id: "de-a2-01-h4-17",
              no: 17,
              ref: "i1",
              text: "Ein guter Bürostuhl löst das Problem nicht allein.",
              answer: true,
              explain:
                "\"Ein guter Stuhl hilft ein bisschen. Wichtiger ist …\" — yardımcı oluyor ama tek başına yetmiyor.",
            },
            {
              kind: "bool",
              id: "de-a2-01-h4-18",
              no: 18,
              ref: "i1",
              text: "Sie empfiehlt, den ganzen Tag zu stehen.",
              answer: false,
              explain:
                "Ayakta çalışma masasını ancak DEĞİŞTİRME koşuluyla öneriyor: \"Wer den ganzen Tag steht, bekommt andere Probleme\".",
            },
            {
              kind: "bool",
              id: "de-a2-01-h4-19",
              no: 19,
              ref: "i1",
              text: "Zwei Stunden Sport am Abend reichen aus.",
              answer: false,
              explain:
                "\"sind nicht genug\" diyor; hareketin güne yayılması gerekiyor. Akşam sporu tek başına oturmayı telafi etmiyor.",
            },
            {
              kind: "bool",
              id: "de-a2-01-h4-20",
              no: 20,
              ref: "i1",
              text: "Viel Wasser trinken hilft, weil man dann öfter aufsteht.",
              answer: true,
              explain:
                "Son cümlede tam bu gerekçe veriliyor: \"trinken Sie viel Wasser, dann stehen Sie öfter auf\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "Dieser Teil hat zwei Aufgaben. Sie schreiben eine private Nachricht und eine halb offizielle Nachricht.",
      instructionTr: "Bu bölümde iki görev var: bir özel ileti ve bir yarı resmî ileti yazacaksın.",
      tasks: [
        {
          id: "de-a2-01-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Delia war zwei Wochen krank und kommt morgen wieder zum Sport. Schreiben Sie ihr eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Arkadaşın Delia iki hafta hastaydı, yarın spora geri dönüyor. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Fragen Sie, wie es ihr geht.", tr: "Nasıl olduğunu sor." },
              { de: "Erzählen Sie, was im Kurs passiert ist.", tr: "Kursta ne olduğunu anlat." },
              { de: "Schlagen Sie vor, zusammen hinzugehen.", tr: "Birlikte gitmeyi öner." },
            ],
            sample: `Liebe Delia,

wie geht es dir jetzt? Ich hoffe, du bist wieder ganz gesund.

Im Kurs haben wir letzte Woche einen neuen Trainer bekommen. Er macht viel mehr Übungen für den Rücken, das ist wirklich gut.

Sollen wir morgen zusammen hingehen? Ich kann dich um halb sechs mit dem Auto abholen.

Liebe Grüße
Nora`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Arkadaşa yazılan bir ileti olduğu için `du` kullanıldı mı?",
              "Hitap ve veda var mı? (Liebe … / Liebe Grüße)",
              "Öneri gerçekten öneri biçiminde mi? (Sollen wir … / Wollen wir …)",
              "Yaklaşık 40 kelime var mı ve cümleler bağlaçlarla birbirine bağlanmış mı?",
            ],
          },
        },
        {
          id: "de-a2-01-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Sie sind Mitglied im Sportverein Weststadt. Sie können drei Monate nicht kommen, weil Sie beruflich in eine andere Stadt gehen. Schreiben Sie an den Verein (circa 40 Wörter).",
          promptTr:
            "Weststadt Spor Kulübü üyesisin. İş nedeniyle başka bir şehre gideceğin için üç ay gelemeyeceksin. Kulübe yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie den Grund.", tr: "Nedeni söyle." },
              { de: "Bitten Sie darum, die Mitgliedschaft zu pausieren.", tr: "Üyeliğin dondurulmasını rica et." },
              { de: "Fragen Sie, was Sie dafür tun müssen.", tr: "Bunun için ne yapman gerektiğini sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich bin seit zwei Jahren Mitglied in Ihrem Verein. Ab dem ersten Oktober arbeite ich für drei Monate in Hamburg und kann deshalb nicht zum Training kommen.

Können Sie meine Mitgliedschaft für diese Zeit pausieren? Was muss ich dafür tun?

Mit freundlichen Grüßen
Ali Karaca`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı? (Sehr geehrte Damen und Herren / Mit freundlichen Grüßen)",
              "Neden `weil` ya da `deshalb` gibi bir bağlaçla açıklanmış mı?",
              "Rica kibar bir soru biçiminde mi? (Können Sie …?)",
              "Yaklaşık 40 kelime var mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: Fragen stellen und beantworten, von sich erzählen, gemeinsam etwas planen.",
      instructionTr: "Bu bölümde üç görev var: soru sorup cevaplama, kendinden söz etme, birlikte plan yapma.",
      tasks: [
        {
          id: "de-a2-01-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Freizeit. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Sport — Wochenende — Musik — Urlaub — Fernsehen.",
          promptTr:
            "Konu: Boş zaman. Her anahtar sözcük için bir soru sor ve kendin de cevapla: spor — hafta sonu — müzik — tatil — televizyon.",
          prepSeconds: 45,
          exchange: [
            { who: "partner", de: "Unser Thema ist Freizeit. Ihr erstes Stichwort ist: Sport. Stellen Sie mir eine Frage und antworten Sie danach selbst.", tr: "Konumuz boş zaman. İlk sözcüğün: spor. Bana bir soru sor, sonra kendin de cevapla." },
            { who: "you", hint: "«Sport» için bir soru sor ve kendi cevabını da ver.", expect: "bir soru kurmak ve gerekçeli bir cevap vermek (weil ya da denn ile)", seconds: 35 },
            { who: "partner", de: "Ich gehe zweimal in der Woche schwimmen, weil das gut für meinen Rücken ist. Ihr nächstes Stichwort: Wochenende.", tr: "Haftada iki kez yüzmeye gidiyorum, sırtıma iyi geliyor. Sıradaki sözcüğün: hafta sonu." },
            { who: "you", hint: "Hafta sonu hakkında sor ve cevapla.", expect: "soru kurmak ve geçmiş zamanda (Perfekt) bir örnek vermek", seconds: 35 },
            { who: "partner", de: "Letztes Wochenende war ich im Kino. Und jetzt eine Frage an Sie: Welche Musik hören Sie gern?", tr: "Geçen hafta sonu sinemaya gittim. Şimdi sana bir soru: Hangi müziği seversin?" },
            { who: "you", hint: "Soruyu cevapla ve nedenini söyle.", expect: "tercih bildirmek ve gerekçelendirmek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antwort mit einer Begründung", tr: "Kendi cevabın ve kısa bir gerekçe" },
            ],
            sample:
              "Machst du regelmäßig Sport? — Ja, ich gehe zweimal in der Woche schwimmen, weil das gut für meinen Rücken ist. Was machst du am Wochenende? — Meistens treffe ich Freunde. Welche Musik hörst du gern? — Ich höre gern Jazz, besonders am Abend. Wohin fährst du im Urlaub? — Letztes Jahr war ich in Portugal. Siehst du viel fern? — Nein, nur am Wochenende.",
            criteria: [
              "Beş sözcüğün her biri için bir soru soruldu mu?",
              "Cevaplarda `weil`, `deshalb` ya da `denn` ile en az bir gerekçe var mı?",
              "En az bir cevap geçmiş zamanda mı? (A2'de Perfekt beklenir)",
              "Cevaplar tek kelime değil, tam cümle mi?",
            ],
          },
        },
        {
          id: "de-a2-01-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt: "Erzählen Sie: Was machen Sie für Ihre Gesundheit? Sprechen Sie etwa zwei Minuten.",
          promptTr: "Anlat: Sağlığın için ne yapıyorsun? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "Was Sie regelmäßig machen", tr: "Düzenli olarak ne yaptığın" },
              { de: "Was Sie früher gemacht haben", tr: "Eskiden ne yaptığın" },
              { de: "Was Sie ändern möchten", tr: "Neyi değiştirmek istediğin" },
            ],
            sample:
              "Für meine Gesundheit gehe ich dreimal in der Woche zu Fuß zur Arbeit. Das dauert zwanzig Minuten und ich brauche kein Ticket. Früher bin ich immer mit dem Bus gefahren, aber dann hatte ich Rückenschmerzen. Ich koche auch öfter selbst, weil das Essen in der Kantine sehr salzig ist. Nicht so gut ist mein Schlaf: Ich gehe oft erst um ein Uhr ins Bett. Das möchte ich ändern.",
            criteria: [
              "Üç içerik noktası da işlendi mi (şimdi, eskiden, değişecek olan)?",
              "Geçmiş anlatımında Perfekt ya da `war/hatte` doğru kullanıldı mı?",
              "Konuşma en az iki dakika sürdü mü?",
              "Cümleler bağlaçlarla bağlandı mı, yoksa arka arkaya kısa cümleler mi?",
            ],
          },
        },
        {
          id: "de-a2-01-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Eine Freundin kommt am Samstag zu Besuch. Sprechen Sie über: Wann treffen? — Wo treffen? — Was machen? — Wer bringt was mit?",
          promptTr:
            "Birlikte plan yap. Cumartesi bir arkadaşın ziyarete geliyor. Şunları konuş: Ne zaman buluşulacak? — Nerede? — Ne yapılacak? — Kim ne getirecek?",
          prepSeconds: 45,
          exchange: [
            { who: "partner", de: "Eine Freundin kommt am Samstag zu Besuch. Wir planen den Tag zusammen. Wann wollen wir uns treffen?", tr: "Cumartesi bir arkadaş ziyarete geliyor. Günü birlikte planlayalım. Ne zaman buluşalım?" },
            { who: "you", hint: "Bir saat öner.", expect: "saat içeren bir öneri sunmak (Wollen wir … / Sollen wir …)", seconds: 30 },
            { who: "partner", de: "Elf ist mir ehrlich gesagt zu früh. Geht auch eins? Und wo treffen wir uns am besten?", tr: "On bir bana açıkçası çok erken. Bir de olur mu? Peki nerede buluşalım?" },
            { who: "you", hint: "Saati kabul et ya da başka bir saat öner, sonra bir yer söyle.", expect: "bir öneriye karşılık vermek ve yer önermek", seconds: 35 },
            { who: "partner", de: "Gut, das passt. Sollen wir etwas zu essen mitnehmen?", tr: "Tamam, uyar. Yanımıza yiyecek bir şey alalım mı?" },
            { who: "you", hint: "Kimin ne getireceğini söyle.", expect: "iş bölümü önermek ve karara bağlamak", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneride bulunmak" },
              { de: "auf Vorschläge reagieren", tr: "Önerilere karşılık vermek" },
              { de: "eine gemeinsame Entscheidung treffen", tr: "Ortak bir karara varmak" },
            ],
            sample:
              "Wollen wir uns um elf treffen? — Elf ist mir zu früh. Geht auch eins? — Ja, eins passt. Wo treffen wir uns? — Am besten am Bahnhof, dann können wir zusammen zum Park laufen. Gute Idee. Sollen wir etwas zu essen mitnehmen? — Ich bringe Brot und Salat mit. — Dann kaufe ich Getränke und Obst.",
            criteria: [
              "Dört nokta da konuşuldu mu (saat, yer, etkinlik, kim ne getirecek)?",
              "Öneri kalıpları kullanıldı mı? (Wollen wir … / Sollen wir … / Wie wäre es mit …)",
              "En az bir öneri reddedilip yerine yenisi sunuldu mu?",
              "Sonunda ortak bir karar açıkça söylendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
