import type { MockPaper } from "../types";

/**
 * B1 · Deneme 1 — "Lernen und Arbeiten".
 *
 * ÖLÇÜM PLANI (B1: tanıdık konularda açık ve standart dili anlamak, bir metnin
 * ana savını ve yazarın tutumunu ayırt etmek):
 *
 *   Lesen  65 dk · 30 madde
 *     Teil 1  6  R/F          blog — kişisel anlatı, ayrıntı (detail)
 *     Teil 2  6  üç şıklı     iki gazete metni — sav ve bilgi (gist)
 *     Teil 3  7  eşleştirme   on ilan — kime hangisi (orientation)
 *     Teil 4  7  iki şıklı    okur yorumları — taraf tutma (opinion)
 *     Teil 5  4  üç şıklı     kullanım yönergesi — kural (instruction)
 *   Hören  40 dk · 30 madde
 *     Teil 1 10  karışık      beş kısa duyuru, her birine R/F + üç şıklı
 *     Teil 2  5  üç şıklı     tek konuşmacılı sunum (detail)
 *     Teil 3  7  R/F          iki kişinin gündelik konuşması (detail)
 *     Teil 4  8  üç şıklı     radyo tartışması — bunu kim söyledi (opinion)
 *   Schreiben 60 dk  arkadaşa e-posta · forum yorumu · resmî ileti
 *   Sprechen  15 dk  birlikte planlama · sunum · geri bildirim
 *
 * B1 SINIRI: Konjunktiv II (`würde/könnte/wäre/hätte`), edilgen, ilgi cümlesi,
 * `obwohl/damit/seitdem/während` yan cümleleri serbest. Konjunktiv I ile
 * dolaylı aktarım (`er sei`) B2 sayıldığı için kullanılmadı.
 *
 * TEIL 4'ÜN MANTIĞI: yedi okur yorumunun her biri konuya AÇIKÇA taraf tutuyor
 * ama bunu farklı yollarla yapıyor — biri koşul öne sürerek, biri karşı tarafın
 * savını kabul edip yine de reddederek. Ölçülen şey sözcük eşleştirmek değil,
 * yazarın vardığı sonucu görmek.
 */
export const B1_01: MockPaper = {
  id: "de-b1-01",
  course: "de",
  level: "B1",
  no: 1,
  theme: "Lernen und Arbeiten",
  themeTr: "Öğrenme ve çalışma",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Blogtext, Zeitungstexte, Anzeigen, Leserbriefe und eine Benutzungsordnung. Sie können mit jeder Aufgabe beginnen.",
      instructionTr:
        "Bu bölümde beş görev var: bir blog yazısı, gazete metinleri, ilanlar, okur yorumları ve bir kullanım yönergesi okuyacaksın. İstediğin görevle başlayabilirsin.",
      tasks: [
        {
          id: "de-b1-01-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Metni ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Nach acht Jahren zurück im Beruf",
              body: `Als mein jüngster Sohn in die Schule kam, war ich acht Jahre lang nicht mehr berufstätig gewesen. Vorher hatte ich als Bürokauffrau gearbeitet, und ich dachte: Das mache ich jetzt einfach wieder.

Die erste Bewerbung habe ich im März geschrieben. Es folgten dreiundzwanzig weitere. Zwei Firmen haben mich eingeladen, beide haben danach abgesagt. Einmal hat man mir gesagt, dass ich zu lange weg war. Das hat wehgetan, aber ehrlich war es auch.

Im Herbst habe ich einen Kurs bei der Arbeitsagentur gemacht: vier Wochen Buchhaltung am Computer. Ich war die Älteste im Raum und am ersten Tag die Langsamste. Nach zwei Wochen konnte ich mehr als die Hälfte der Gruppe.

Wirklich geholfen hat mir aber etwas anderes: ein Praktikum. Drei Monate, unbezahlt, in einem kleinen Betrieb für Fahrradteile. Ich habe dort gemacht, was gerade anfiel — Rechnungen, Telefon, einmal sogar das Lager. Nach dem Praktikum hat der Chef gefragt, ob ich bleiben möchte.

Heute arbeite ich dreißig Stunden in der Woche. Ich verdiene weniger als vor der Pause, und das ärgert mich manchmal. Trotzdem gehe ich gern hin.

Wenn mich jemand fragt, was ich raten würde, sage ich immer dasselbe: Bewirb dich nicht nur, sondern geh irgendwo hin. Auf dem Papier sieht eine Lücke schlecht aus. Im Betrieb sieht man einen Menschen.`,
              gloss: [
                { de: "die Bewerbung", tr: "iş başvurusu", en: "job application" },
                { de: "die Buchhaltung", tr: "muhasebe", en: "accounting" },
                { de: "anfallen", tr: "ortaya çıkmak, sırada olmak", en: "to come up (work)" },
                { de: "die Lücke", tr: "boşluk (özgeçmişte)", en: "gap" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-01-l1-1",
              no: 1,
              text: "Die Autorin hat vor ihrer Pause im Büro gearbeitet.",
              answer: true,
              explain:
                "\"Vorher hatte ich als Bürokauffrau gearbeitet\" — ara vermeden önceki mesleği büro işi. Plusquamperfekt bu bilginin daha da öncesine ait olduğunu gösteriyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-l1-2",
              no: 2,
              text: "Sie hat sich insgesamt zweimal beworben.",
              answer: false,
              explain:
                "İlk başvuru mart ayında, ardından \"dreiundzwanzig weitere\", yani toplam 24. İki sayısı DAVET eden firmaların sayısı — metindeki iki sayıyı karıştırmamak gerekiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-l1-3",
              no: 3,
              text: "Nach zwei Wochen war sie besser als die Hälfte der Gruppe.",
              answer: true,
              explain:
                "\"Nach zwei Wochen konnte ich mehr als die Hälfte der Gruppe\" — başlangıçta en yavaştı, iki hafta sonra grubun yarısını geçti.",
            },
            {
              kind: "bool",
              id: "de-b1-01-l1-4",
              no: 4,
              text: "Für das Praktikum hat sie Geld bekommen.",
              answer: false,
              explain: "Staj açıkça \"unbezahlt\" olarak tanımlanıyor. Ücret ancak staj sonrası işe alınınca söz konusu oluyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-l1-5",
              no: 5,
              text: "Sie verdient heute mehr als vor ihrer Pause.",
              answer: false,
              explain:
                "\"Ich verdiene weniger als vor der Pause\" — daha az kazanıyor ve bunu kendisi de rahatsız edici buluyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-l1-6",
              no: 6,
              text: "Sie rät anderen, sich persönlich in einem Betrieb zu zeigen.",
              answer: true,
              explain:
                "Son paragrafın tavsiyesi tam bu: \"Bewirb dich nicht nur, sondern geh irgendwo hin\". Kâğıt üzerindeki boşluğa karşı, insanın kendisini göstermesini öneriyor.",
            },
          ],
        },
        {
          id: "de-b1-01-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 7 bis 12. Wählen Sie: a, b oder c.",
          promptTr: "İki metni ve 7–12. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Handwerk sucht Nachwuchs",
              body: `In vielen Regionen bleiben Ausbildungsplätze im Handwerk unbesetzt. Allein im Bezirk Freiburg waren im vergangenen Jahr fast neunhundert Stellen frei — die meisten davon in Betrieben mit weniger als zwanzig Beschäftigten.

Die Gründe sind bekannt. Über Jahrzehnte wurde jungen Leuten gesagt, dass nur ein Studium eine sichere Zukunft bringt. Das Ergebnis sieht man heute: Es gibt mehr Studienplätze als Bewerber im Handwerk.

Inzwischen ändert sich das Bild langsam. Wer eine Ausbildung als Elektronikerin oder Anlagenmechaniker abschließt, findet fast immer eine Stelle, oft im eigenen Ort. Die Gehälter sind in einigen Berufen deutlich gestiegen, weil die Betriebe um jeden Bewerber kämpfen.

Trotzdem entscheiden sich viele Jugendliche weiterhin für die Universität. Fachleute nennen dafür einen einfachen Grund: In Familien wird über Studium gesprochen, über Handwerk nicht. Wer niemanden kennt, der einen solchen Beruf ausübt, kommt gar nicht erst auf die Idee.

Einige Kammern versuchen es deshalb mit Praktikumswochen für ganze Schulklassen. Die Erfahrung zeigt: Nach einer Woche in der Werkstatt bewerben sich messbar mehr Schülerinnen und Schüler.`,
              gloss: [
                { de: "unbesetzt bleiben", tr: "boş kalmak (kadro)", en: "to remain unfilled" },
                { de: "der Nachwuchs", tr: "genç kuşak, yeni eleman", en: "next generation, young talent" },
                { de: "die Kammer", tr: "meslek odası", en: "chamber (of trades)" },
                { de: "messbar", tr: "ölçülebilir biçimde", en: "measurably" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Lernen mit Videos — hilft das wirklich?",
              body: `Wer heute etwas nicht versteht, sucht ein Video. Das gilt für Mathematik ebenso wie für Steuererklärungen. Doch Fachleute warnen vor einem Missverständnis.

Eine Untersuchung an zwei Gesamtschulen hat zweihundertvierzig Jugendliche begleitet. Eine Gruppe sah Erklärvideos, die andere löste dieselben Aufgaben mit einem Arbeitsblatt. Direkt nach dem Unterricht schnitt die Videogruppe besser ab. Zwei Wochen später war es umgekehrt.

Die Erklärung der Forscherinnen: Ein gutes Video wirkt leicht. Man folgt einer ruhigen Stimme und hat das Gefühl, alles verstanden zu haben. Genau dieses Gefühl ist das Problem, denn wer sich sicher fühlt, übt nicht mehr.

Videos sind deshalb nicht wertlos. Sie helfen besonders am Anfang, wenn ein Thema völlig neu ist, und sie helfen Menschen, die im Unterricht nicht nachfragen möchten. Entscheidend ist, was danach passiert.

Die Empfehlung der Studie klingt unspektakulär: Video anhalten, selbst rechnen, erst dann weitersehen. Wer das macht, behält den Stoff auch nach Wochen.`,
              gloss: [
                { de: "das Missverständnis", tr: "yanlış anlama", en: "misunderstanding" },
                { de: "abschneiden", tr: "sonuç almak, başarı göstermek", en: "to perform (in a test)" },
                { de: "der Stoff", tr: "konu, işlenen malzeme", en: "subject matter" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-01-l2-7",
              no: 7,
              ref: "t2",
              text: "Wo sind besonders viele Ausbildungsplätze frei?",
              options: ["In großen Industriefirmen.", "In kleinen Handwerksbetrieben.", "In öffentlichen Verwaltungen."],
              answer: 1,
              explain:
                "\"die meisten davon in Betrieben mit weniger als zwanzig Beschäftigten\" — yani küçük işletmeler. Sanayi ve kamu metinde geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l2-8",
              no: 8,
              ref: "t2",
              text: "Warum sind die Gehälter in einigen Handwerksberufen gestiegen?",
              options: [
                "Weil die Betriebe um Bewerber konkurrieren.",
                "Weil der Staat die Löhne im Handwerk gesetzlich erhöht hat.",
                "Weil die Ausbildung länger dauert.",
              ],
              answer: 0,
              explain:
                "\"weil die Betriebe um jeden Bewerber kämpfen\" — rekabet ücreti yukarı çekiyor. Devlet ve eğitim süresi metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l2-9",
              no: 9,
              ref: "t2",
              text: "Welchen Grund nennen Fachleute für die Studienwahl?",
              options: [
                "Ein Studium ist heute billiger.",
                "Im Handwerk verdient man grundsätzlich weniger.",
                "Im Familienkreis ist das Handwerk kein Thema.",
              ],
              answer: 2,
              explain:
                "\"In Familien wird über Studium gesprochen, über Handwerk nicht\" — tanımadığın mesleği aklına getirmiyorsun. (b) metnin söylediğinin tersi: bazı mesleklerde ücretler yükselmiş.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l2-10",
              no: 10,
              ref: "t3",
              text: "Was war das Ergebnis der Untersuchung nach zwei Wochen?",
              options: [
                "Die Videogruppe war besser.",
                "Die Arbeitsblattgruppe war besser.",
                "Beide Gruppen waren ungefähr gleich gut.",
              ],
              answer: 1,
              explain:
                "Ders hemen sonrasında video grubu öndeydi, \"Zwei Wochen später war es umgekehrt\" — yani çalışma kâğıdı grubu öne geçti.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l2-11",
              no: 11,
              ref: "t3",
              text: "Worin sehen die Forscherinnen das Problem?",
              options: [
                "Die Videos enthalten fachliche Fehler und Vereinfachungen.",
                "Die Videos sind zu lang.",
                "Man fühlt sich sicher und übt deshalb nicht.",
              ],
              answer: 2,
              explain:
                "\"wer sich sicher fühlt, übt nicht mehr\" — sorun videonun içeriği değil, yarattığı güven duygusu.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l2-12",
              no: 12,
              ref: "t3",
              text: "Was empfiehlt die Studie?",
              options: [
                "Videos ganz zu vermeiden.",
                "Das Video zu stoppen und selbst zu rechnen.",
                "Ein Video so oft anzusehen, bis wirklich alles klar ist.",
              ],
              answer: 1,
              explain:
                "Öneri aynen şu: \"Video anhalten, selbst rechnen, erst dann weitersehen\". Metin videoları değersiz saymıyor, kullanım biçimini değiştiriyor.",
            },
          ],
        },
        {
          id: "de-b1-01-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot zur Weiterbildung. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal.",
          promptTr:
            "13–19. kişiler bir eğitim olanağı arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır.",
          options: [
            {
              key: "a",
              label: "Abendkurs Buchhaltung",
              body: "Zwölf Abende, dienstags von 18.30 bis 21 Uhr. Für Wiedereinsteigerinnen und Wiedereinsteiger ohne Vorkenntnisse. Kursgebühr 180 Euro, Ratenzahlung möglich.",
            },
            {
              key: "b",
              label: "Deutsch für den Pflegeberuf",
              body: "Berufsbezogener Sprachkurs ab Niveau B1, montags und mittwochs abends. Mit Prüfung am Ende. Für Beschäftigte in Krankenhäusern und Pflegeheimen.",
            },
            {
              key: "c",
              label: "Meistervorbereitung Elektrotechnik",
              body: "Berufsbegleitend, achtzehn Monate, Unterricht freitags und samstags. Voraussetzung ist eine abgeschlossene Ausbildung und drei Jahre Berufserfahrung.",
            },
            {
              key: "d",
              label: "Ferienwoche Programmieren",
              body: "Fünf Tage in den Herbstferien, täglich 9 bis 15 Uhr. Für Schülerinnen und Schüler ab der achten Klasse. Kostenlos, Anmeldung über die Schule.",
            },
            {
              key: "e",
              label: "Online-Seminar Präsentieren",
              body: "Vier Termine am Vormittag, jeweils zwei Stunden am Bildschirm. Sie üben mit der Kamera und bekommen eine Rückmeldung. Ohne Anreise, von zu Hause aus.",
            },
            {
              key: "f",
              label: "Werkstattwoche für Schulklassen",
              body: "Eine Woche in Betrieben aus fünf Gewerken. Nur für ganze Klassen, Anmeldung durch die Lehrkraft. Nicht für einzelne Jugendliche.",
            },
            {
              key: "g",
              label: "Bewerbungstraining am Samstag",
              body: "Ein Tag, 10 bis 16 Uhr. Wir prüfen Ihre Unterlagen und üben das Vorstellungsgespräch. Kinderbetreuung im Haus, Anmeldung bis Donnerstag.",
            },
            {
              key: "h",
              label: "Lkw-Führerschein in Vollzeit",
              body: "Acht Wochen von Montag bis Freitag, ganztägig. Förderung durch die Arbeitsagentur möglich. Mindestalter 21 Jahre.",
            },
            {
              key: "i",
              label: "Nähkurs für Anfänger",
              body: "Sechs Abende im Nachbarschaftszentrum. Nähmaschinen sind vorhanden, Stoff bringen Sie selbst mit. Reine Freizeitveranstaltung, kein Zertifikat.",
            },
            {
              key: "j",
              label: "Auffrischung Englisch am Arbeitsplatz",
              body: "Ihr Betrieb bucht, wir kommen zu Ihnen. Mindestens sechs Teilnehmende aus einer Firma. Termine nach Absprache, auch in der Mittagspause.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-01-l3-13",
              no: 13,
              text: "Frau Toprak war neun Jahre zu Hause und möchte wieder im Büro arbeiten. Sie hat abends Zeit und wenig Geld.",
              answer: "a",
              explain:
                "(a) doğrudan işe dönenler için, akşamları ve taksitli. (g) de iş arayanlara yönelik ama tek günlük bir görüşme eğitimi, meslek bilgisi vermiyor.",
            },
            {
              kind: "match",
              id: "de-b1-01-l3-14",
              no: 14,
              text: "Herr Nowak arbeitet als Pfleger im Krankenhaus. Er versteht die Fachsprache oft nicht und braucht am Ende einen Nachweis.",
              answer: "b",
              explain:
                "(b) hem mesleğe özgü dil hem de sonunda sınav sunuyor. (j) da dil kursu ama İngilizce ve işveren üzerinden.",
            },
            {
              kind: "match",
              id: "de-b1-01-l3-15",
              no: 15,
              text: "Frau Ivanova ist gelernte Elektronikerin, arbeitet seit fünf Jahren im Beruf und möchte einen eigenen Betrieb gründen.",
              answer: "c",
              explain:
                "Kendi işini kurmak için ustalık gerekiyor; (c) tam bu sınava hazırlıyor ve ön koşulları (bitmiş çıraklık, üç yıl deneyim) karşılanıyor.",
            },
            {
              kind: "match",
              id: "de-b1-01-l3-16",
              no: 16,
              text: "Emil (15) will in den Ferien ausprobieren, ob Informatik etwas für ihn ist. Seine Klasse macht nicht mit.",
              answer: "d",
              explain:
                "(d) tatil haftası, sekizinci sınıftan itibaren ve tek tek katılıma açık. (f) benzer bir tanıtım ama \"Nicht für einzelne Jugendliche\" — sınıfı katılmadığı için düşüyor.",
            },
            {
              kind: "match",
              id: "de-b1-01-l3-17",
              no: 17,
              text: "Herr Sané muss bald vor Kunden sprechen. Er wohnt auf dem Land und möchte nicht anreisen.",
              answer: "e",
              explain:
                "(e) çevrimiçi, \"Ohne Anreise, von zu Hause aus\" ve tam olarak sunum yapmayı çalıştırıyor.",
            },
            {
              kind: "match",
              id: "de-b1-01-l3-18",
              no: 18,
              text: "Frau Blum sucht Arbeit. Sie braucht Hilfe bei ihren Unterlagen und hat ein kleines Kind.",
              answer: "g",
              explain:
                "(g) evrakları gözden geçiriyor, görüşme provası yapıyor ve binada çocuk bakımı var — iki koşul birden.",
            },
            {
              kind: "match",
              id: "de-b1-01-l3-19",
              no: 19,
              text: "Herr Dogan (24) ist arbeitslos und möchte eine Ausbildung in Vollzeit machen, die die Arbeitsagentur bezahlt.",
              answer: "h",
              explain:
                "(h) tam zamanlı, sekiz hafta ve \"Förderung durch die Arbeitsagentur möglich\"; yaş sınırı 21 olduğu için 24 yaşındaki için uygun.",
            },
          ],
        },
        {
          id: "de-b1-01-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Betriebe eine Vier-Tage-Woche einführen?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"İşletmeler dört günlük haftaya geçmeli mi?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Vier-Tage-Woche — was meinen Sie?",
              body: `[20] Melanie K.: Wir haben es in unserer Agentur zwei Jahre lang getestet. Am Anfang war ich skeptisch, weil ich dachte, die Arbeit bleibt einfach liegen. Das ist nicht passiert. Wir haben Sitzungen gekürzt und plötzlich reichte die Zeit. Ich möchte nicht zurück.

[21] Tobias R.: Schön für alle, die im Büro sitzen. In der Pflege sieht das anders aus. Wenn ich einen Tag weniger arbeite, muss jemand anderes diesen Tag übernehmen — und diesen Jemand gibt es nicht. Solange wir zu wenige sind, ist das eine Idee für andere Branchen.

[22] Frau Özdemir: Natürlich kostet die Umstellung erst einmal etwas. Aber wir haben seit der Einführung keine einzige Kündigung mehr gehabt, und Bewerbungen bekommen wir jetzt ohne Anzeige. Rechnet man das gegen, war es die günstigste Entscheidung meiner Firmengeschichte.

[23] H. Wolter: Ich bin selbstständig und arbeite gern viel. Was mich stört, ist nicht die kürzere Woche, sondern dass daraus eine Vorschrift werden soll. Wer vier Tage will, soll sie mit seinem Betrieb aushandeln. Ein Gesetz für alle passt hier nicht.

[24] Nesrin A.: Meine Kollegen und ich machen die gleiche Arbeit jetzt in vier Tagen. Das heißt: keine Pause mehr, mittags ein Brot am Schreibtisch, abends erschöpft. Auf dem Papier ein freier Tag, in Wirklichkeit vier harte. So nicht.

[25] Dr. Weber: Die Zahlen aus den Versuchen sind eindeutiger, als viele glauben. Krankheitstage gehen zurück, die Leistung bleibt gleich. Wer heute noch behauptet, das funktioniere nirgends, hat die Untersuchungen der letzten Jahre nicht gelesen.

[26] Marco S.: Vier Tage klingen gut, bis die Rechnung kommt. Kleine Betriebe wie meiner müssten eine fünfte Kraft einstellen, und die bezahlt niemand. Für Konzerne mag das gehen, für uns nicht.`,
              gloss: [
                { de: "die Umstellung", tr: "geçiş, düzen değişikliği", en: "changeover" },
                { de: "aushandeln", tr: "pazarlıkla anlaşmak", en: "to negotiate" },
                { de: "erschöpft", tr: "bitkin", en: "exhausted" },
                { de: "die Vorschrift", tr: "kural, mevzuat", en: "regulation" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-01-l4-20",
              no: 20,
              ref: "f1",
              text: "Melanie K.",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Baştaki kuşkusunu anlatıyor ama sonucu net: toplantılar kısalınca zaman yetmiş ve \"Ich möchte nicht zurück\" diyor. Karşı çıkışla başlayan bir yorum karşı çıkışla bitmek zorunda değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l4-21",
              no: 21,
              ref: "f1",
              text: "Tobias R.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Ofis için iyi olabileceğini kabul ediyor, ama kendi alanı için reddediyor: \"eine Idee für andere Branchen\". Kısmi kabul, taraf değiştirmez.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l4-22",
              no: 22,
              ref: "f1",
              text: "Frau Özdemir",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Maliyeti kabul edip hemen karşısına kazançları koyuyor: istifa yok, ilansız başvuru. Sonuç cümlesi \"die günstigste Entscheidung\".",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l4-23",
              no: 23,
              ref: "f1",
              text: "H. Wolter",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kısa haftaya değil, ZORUNLU olmasına karşı: \"Ein Gesetz für alle passt hier nicht\". Sorulan şey işletmelerin geçmesi gerekip gerekmediği, o da buna hayır diyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l4-24",
              no: 24,
              ref: "f1",
              text: "Nesrin A.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Aynı işi dört güne sıkıştırmanın sonucunu anlatıyor: molasız, bitkin. Kapanış \"So nicht\" açık bir ret.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l4-25",
              no: 25,
              ref: "f1",
              text: "Dr. Weber",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Denemelerin sayılarına dayanıyor: hastalık günleri azalıyor, verim aynı kalıyor. Karşı çıkanları \"Untersuchungen ... nicht gelesen\" diye eleştiriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l4-26",
              no: 26,
              ref: "f1",
              text: "Marco S.",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "\"Vier Tage klingen gut, bis die Rechnung kommt\" — küçük işletmesi için beşinci bir eleman gerektiğini ve bunu kimsenin ödemediğini söylüyor.",
            },
          ],
        },
        {
          id: "de-b1-01-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Benutzungsordnung und die Aufgaben 27 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Kullanım yönergesini ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Benutzungsordnung",
              genreTr: "Kullanım yönergesi",
              title: "Benutzungsordnung der Lernwerkstatt",
              body: `1. Zugang
Die Lernwerkstatt steht allen eingeschriebenen Teilnehmenden offen. Der Zugang erfolgt mit der persönlichen Karte. Eine Weitergabe der Karte an Dritte führt zum Ausschluss für den Rest des Semesters.

2. Öffnung
Montag bis Freitag von 8 bis 20 Uhr. In der letzten Woche vor den Prüfungen ist bis 22 Uhr geöffnet, dann jedoch ohne Betreuung.

3. Geräte
Maschinen mit rotem Punkt dürfen nur nach einer Einweisung benutzt werden. Die Einweisung findet jeden ersten Montag im Monat statt und muss nicht wiederholt werden.

4. Material
Kleinmaterial bis zu einem Wert von fünf Euro ist frei. Alles Weitere wird über die Materialliste abgerechnet, die am Ende des Monats an die Teilnehmenden geht.

5. Ordnung
Jeder räumt seinen Platz selbst auf. Werkzeug gehört zurück an die Tafel, nicht in die Schublade. Wer den Raum verlässt, ohne aufzuräumen, zahlt eine Pauschale von zehn Euro.

6. Schäden
Ein Schaden ist sofort zu melden, auch wenn er klein ist. Wer einen Schaden meldet, zahlt nichts; wer ihn verschweigt, haftet für die Reparatur.`,
              gloss: [
                { de: "die Einweisung", tr: "kullanım eğitimi", en: "safety briefing" },
                { de: "abrechnen", tr: "hesaplaşmak, faturaya yazmak", en: "to bill" },
                { de: "die Pauschale", tr: "maktu ücret", en: "flat fee" },
                { de: "haften", tr: "sorumlu olmak (mali)", en: "to be liable" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-01-l5-27",
              no: 27,
              ref: "o1",
              text: "Was passiert, wenn Sie Ihre Karte weitergeben?",
              options: [
                "Sie zahlen eine Gebühr von zehn Euro.",
                "Sie dürfen bis zum Semesterende nicht mehr kommen.",
                "Sie brauchen eine neue Einweisung.",
              ],
              answer: 1,
              explain:
                "\"führt zum Ausschluss für den Rest des Semesters\" — dönem sonuna kadar giriş yasak. On euro başka bir maddenin (temizlik) cezası.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l5-28",
              no: 28,
              ref: "o1",
              text: "Was gilt in der Woche vor den Prüfungen?",
              options: [
                "Es ist länger offen, aber ohne Betreuung.",
                "Es ist wie immer bis 20 Uhr offen.",
                "Es ist nur mit Anmeldung offen.",
              ],
              answer: 0,
              explain:
                "22'ye kadar açık, ama \"dann jedoch ohne Betreuung\". Uzun saat ve gözetim iki ayrı bilgi; `jedoch` ikincisini sınırlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l5-29",
              no: 29,
              ref: "o1",
              text: "Sie haben im Oktober eine Einweisung gemacht. Was gilt im Februar?",
              options: [
                "Sie brauchen jeden Monat eine neue Einweisung.",
                "Die Einweisung gilt weiter.",
                "Sie dürfen die Maschinen nur mit Betreuung benutzen.",
              ],
              answer: 1,
              explain:
                "\"muss nicht wiederholt werden\" — bir kez alınan eğitim geçerliliğini koruyor. Her ayın ilk pazartesi eğitimin VERİLDİĞİ gün, tekrar zorunluluğu değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-l5-30",
              no: 30,
              ref: "o1",
              text: "Sie haben aus Versehen ein Werkzeug beschädigt. Was ist richtig?",
              options: [
                "Wenn Sie es melden, zahlen Sie nichts.",
                "Sie müssen die Reparatur immer bezahlen.",
                "Kleine Schäden muss man nicht melden.",
              ],
              answer: 0,
              explain:
                "Altıncı madde iki durumu karşı karşıya koyuyor: bildiren ödemez, gizleyen tamirden sorumlu olur. Küçük hasarın da bildirilmesi açıkça isteniyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Ansagen, einen Vortrag, ein Gespräch und eine Diskussion. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde dört görev var: duyurular, bir sunum, bir konuşma ve bir tartışma dinleyeceksin. Önce soruları oku.",
      tasks: [
        {
          id: "de-b1-01-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Ansage im Radio",
              genreTr: "Radyoda duyuru",
              situation: "Bir halk eğitim merkezinin güz dönemi duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Die Volkshochschule Rheinbach startet am zwölften September in das Herbstsemester. Neu im Programm sind zwei berufsbezogene Kurse für Pflegekräfte aus dem Ausland, jeweils dienstags und donnerstags am Abend. Die Kurse setzen Niveau B eins voraus. Eine Anmeldung ist bis zum fünften September online möglich, danach nur noch persönlich im Büro.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Durchsage im Betrieb",
              genreTr: "İş yerinde anons",
              situation: "Çalışanlara toplantı duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für alle Beschäftigten: Die Betriebsversammlung findet nicht wie geplant am Mittwoch statt, sondern erst am Donnerstag um vierzehn Uhr in der Kantine. Der Grund ist eine Lieferung, die am Mittwoch angenommen werden muss. Wer im Schichtdienst arbeitet, bekommt die Zeit gutgeschrieben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir marangozhane staj başvurusunu yanıtlıyor.",
              plays: 1,
              segments: [
                {
                  text: "Hallo Frau Kilic, hier ist Reinhardt von der Tischlerei Mohr. Danke für Ihre Bewerbung um den Praktikumsplatz. Wir hätten Sie gern kennengelernt, aber der Platz ist inzwischen vergeben. Falls Sie im Frühjahr noch Interesse haben, melden Sie sich gern wieder. Dann suchen wir voraussichtlich zwei Praktikanten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Reiseinformation",
              genreTr: "Yolculuk duyurusu",
              situation: "Hafta sonu için ulaşım değişikliği.",
              plays: 1,
              segments: [
                {
                  text: "Eine Reiseinformation: Zwischen Weinheim und Bensheim fahren an diesem Wochenende keine Züge. Wegen Bauarbeiten an der Strecke setzen wir Busse ein. Die Busse fahren vor dem Hauptausgang ab und brauchen etwa zwanzig Minuten länger. Fahrräder können in den Bussen leider nicht mitgenommen werden.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Tipp im Radio",
              genreTr: "Radyoda öneri",
              situation: "İş arayanlara yönelik bir öneri.",
              plays: 1,
              segments: [
                {
                  text: "Und noch ein Tipp für alle, die gerade eine Stelle suchen: Am Samstag findet in der Messehalle drei die Ausbildungsmesse statt, von zehn bis siebzehn Uhr. Über achtzig Betriebe stellen sich vor. Der Eintritt ist frei, aber Sie sollten Ihre Bewerbungsunterlagen mitbringen. Viele Firmen führen direkt vor Ort kurze Gespräche.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-01-h1-1",
              no: 1,
              ref: "h1",
              text: "Die neuen Kurse sind für Anfänger gedacht.",
              answer: false,
              explain: "Kurslar B1 düzeyini ön koşul kılıyor (\"setzen Niveau B eins voraus\"), yani başlangıç düzeyi için değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h1-2",
              no: 2,
              ref: "h1",
              text: "Wie kann man sich nach dem fünften September anmelden?",
              options: ["Gar nicht mehr.", "Weiterhin online.", "Persönlich im Büro."],
              answer: 2,
              explain:
                "5 Eylül çevrimiçi kaydın son günü; sonrasında \"nur noch persönlich im Büro\". Kayıt kapanmıyor, yolu değişiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Betriebsversammlung wurde verschoben.",
              answer: true,
              explain: "\"findet nicht wie geplant am Mittwoch statt, sondern erst am Donnerstag\" — bir gün ertelenmiş.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h1-4",
              no: 4,
              ref: "h2",
              text: "Was bekommen Beschäftigte im Schichtdienst?",
              options: ["Einen freien Tag.", "Die Zeit gutgeschrieben.", "Eine schriftliche Zusammenfassung."],
              answer: 1,
              explain: "\"bekommt die Zeit gutgeschrieben\" — toplantı süresi çalışma saatine yazılıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h1-5",
              no: 5,
              ref: "h3",
              text: "Frau Kilic bekommt den Praktikumsplatz.",
              answer: false,
              explain: "\"der Platz ist inzwischen vergeben\" — yer başkasına verilmiş. Nazik giriş cümlesi olumlu bir sonuç anlamına gelmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h1-6",
              no: 6,
              ref: "h3",
              text: "Was schlägt Herr Reinhardt vor?",
              options: ["Sich im Frühjahr wieder zu melden.", "Eine neue Bewerbung zu schreiben.", "Bei einer anderen Firma anzurufen."],
              answer: 0,
              explain: "İlkbaharda iki stajyer arayacaklarını söyleyip \"melden Sie sich gern wieder\" diyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h1-7",
              no: 7,
              ref: "h4",
              text: "Zwischen den beiden Orten fahren am Wochenende Busse statt Züge.",
              answer: true,
              explain: "\"fahren keine Züge ... setzen wir Busse ein\" — tren yerine otobüs konuyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h1-8",
              no: 8,
              ref: "h4",
              text: "Warum fahren keine Züge?",
              options: ["Wegen eines Unfalls.", "Wegen eines Streiks.", "Wegen Bauarbeiten."],
              answer: 2,
              explain: "Neden açıkça söyleniyor: \"Wegen Bauarbeiten an der Strecke\". Grev ve kaza hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h1-9",
              no: 9,
              ref: "h5",
              text: "Für den Besuch der Messe muss man Eintritt bezahlen.",
              answer: false,
              explain: "\"Der Eintritt ist frei\" — giriş ücretsiz. Getirilmesi istenen tek şey başvuru evrakları.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h1-10",
              no: 10,
              ref: "h5",
              text: "Was empfiehlt der Sprecher?",
              options: ["Sich vorher anzumelden.", "Bewerbungsunterlagen mitzubringen.", "Möglichst früh zu kommen."],
              answer: 1,
              explain:
                "\"Sie sollten Ihre Bewerbungsunterlagen mitbringen\" — çünkü firmalar yerinde kısa görüşmeler yapıyor. Kayıt istenmiyor.",
            },
          ],
        },
        {
          id: "de-b1-01-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Wählen Sie zu den Aufgaben 11 bis 15: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir sunum dinleyeceksin. 11–15. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              title: "Führung durch das Ausbildungszentrum",
              situation: "Bir eğitim merkezinin tanıtım turu; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Herzlich willkommen im Ausbildungszentrum Nordbahn. Mein Name ist Carla Reuter, ich leite hier die Werkstätten. Bevor wir losgehen, ein paar Sätze zum Ablauf.",
                },
                {
                  text: "Wir sind kein Betrieb, sondern eine Einrichtung von neun Firmen aus der Region. Diese Firmen schicken ihre Auszubildenden im ersten Jahr zu uns. Das heißt: Wer hier lernt, hat schon einen Vertrag in der Tasche.",
                },
                {
                  text: "Der Tag beginnt um sieben Uhr dreißig und endet um sechzehn Uhr. Freitags hören wir schon um dreizehn Uhr auf, weil die meisten dann noch in ihren Betrieb fahren.",
                },
                {
                  text: "Was uns von einer Berufsschule unterscheidet, ist die Größe der Gruppen. Bei uns sind es höchstens acht Personen an einer Maschine. In der Berufsschule sitzen dreißig in einem Raum. Deshalb kommen viele Betriebe zu uns, obwohl es sie Geld kostet.",
                },
                {
                  text: "Noch ein Wort zur Sicherheit: Auf dem gesamten Gelände sind feste Schuhe Pflicht, auch für Besucherinnen und Besucher. Schutzbrillen bekommen Sie gleich am Eingang der Halle. Fotografieren ist erlaubt, aber bitte ohne Blitz.",
                },
                {
                  text: "Ganz zum Schluss gehen wir in die Kantine. Dort können Sie mit drei Auszubildenden sprechen, die im zweiten Jahr sind. Fragen Sie sie ruhig auch nach den Dingen, die hier nicht so gut laufen. Ich bin dann nicht dabei.",
                },
              ],
              gloss: [
                { de: "die Einrichtung", tr: "kurum, tesis", en: "institution" },
                { de: "der Auszubildende", tr: "çırak, meslek öğrencisi", en: "apprentice, trainee" },
                { de: "das Gelände", tr: "alan, kampüs", en: "premises" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-01-h2-11",
              no: 11,
              ref: "v1",
              text: "Was ist das Ausbildungszentrum?",
              options: [
                "Ein einzelner großer Betrieb.",
                "Eine gemeinsame Einrichtung mehrerer Firmen.",
                "Eine staatliche Berufsschule mit eigenen Werkstätten.",
              ],
              answer: 1,
              explain:
                "\"Wir sind kein Betrieb, sondern eine Einrichtung von neun Firmen\" — ortak bir kurum. Meslek okulundan farkı ayrıca anlatılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h2-12",
              no: 12,
              ref: "v1",
              text: "Was gilt für die Auszubildenden hier?",
              options: [
                "Sie haben bereits einen Vertrag mit einer Firma.",
                "Sie bewerben sich erst am Ende des ersten Jahres.",
                "Sie zahlen selbst für die Ausbildung.",
              ],
              answer: 0,
              explain: "\"Wer hier lernt, hat schon einen Vertrag in der Tasche\" — sözleşme daha gelmeden imzalanmış oluyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h2-13",
              no: 13,
              ref: "v1",
              text: "Warum endet der Freitag früher?",
              options: [
                "Weil die Werkstätten gereinigt werden.",
                "Weil viele danach in ihren Betrieb fahren.",
                "Weil freitags kein Unterricht stattfindet.",
              ],
              answer: 1,
              explain: "Gerekçe doğrudan veriliyor: \"weil die meisten dann noch in ihren Betrieb fahren\".",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h2-14",
              no: 14,
              ref: "v1",
              text: "Was ist der wichtigste Unterschied zur Berufsschule?",
              options: ["Die technische Ausstattung der Werkstätten.", "Die Kosten.", "Die Gruppengröße."],
              answer: 2,
              explain:
                "\"Was uns von einer Berufsschule unterscheidet, ist die Größe der Gruppen\" — makine başına en fazla sekiz kişi. Maliyet bunun sonucu, farkın kendisi değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h2-15",
              no: 15,
              ref: "v1",
              text: "Was passiert am Ende der Führung?",
              options: [
                "Die Gäste sprechen ohne die Leiterin mit Auszubildenden.",
                "Die Gäste bekommen eine Broschüre.",
                "Die Gäste dürfen selbst an einer Maschine etwas ausprobieren.",
              ],
              answer: 0,
              explain:
                "Kantinde ikinci yıl çıraklarıyla konuşulacak ve konuşmacı \"Ich bin dann nicht dabei\" diyor — bilerek yanlarında olmuyor.",
            },
          ],
        },
        {
          id: "de-b1-01-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören ein Gespräch. Sind die Aussagen 16 bis 22 richtig oder falsch? Sie hören den Text einmal.",
          promptTr: "Bir konuşma dinleyeceksin. 16–22. ifadeler doğru mu yanlış mı? Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch am Arbeitsplatz",
              genreTr: "İş yerinde konuşma",
              situation: "İki meslektaş yeni çalışma düzenini konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Yusuf", text: "Hast du die Mail zur neuen Regelung gelesen? Ab Oktober nur noch zwei Tage Homeoffice." },
                { speaker: "Britta", text: "Gelesen ja, verstanden nein. Wir hatten doch drei." },
                { speaker: "Yusuf", text: "Drei waren es im Versuch. Jetzt sind es zwei, und einer davon muss auf einen festen Wochentag fallen." },
                { speaker: "Britta", text: "Also kann ich mir nicht mehr aussuchen, wann ich zu Hause bleibe?" },
                { speaker: "Yusuf", text: "Einen Tag suchst du dir aus, den zweiten legt das Team gemeinsam fest. Bei uns wäre das wahrscheinlich der Freitag." },
                { speaker: "Britta", text: "Freitag ist schlecht. Da habe ich die Termine mit den Kunden." },
                { speaker: "Yusuf", text: "Dann sag das in der Teamsitzung am Dienstag. Der Tag steht noch nicht fest, wir sollen ihn selbst wählen." },
                { speaker: "Britta", text: "Gut. Und was ist mit den Leuten, die weiter weg wohnen? Marek braucht neunzig Minuten pro Strecke." },
                { speaker: "Yusuf", text: "Für Wege über eine Stunde gibt es eine Ausnahme, aber nur auf Antrag. Das steht ganz unten in der Mail." },
                { speaker: "Britta", text: "Das habe ich überlesen. Weißt du, warum sie das überhaupt ändern?" },
                { speaker: "Yusuf", text: "Offiziell wegen der neuen Kolleginnen. Die Einarbeitung funktioniert im Büro besser, sagen sie." },
                { speaker: "Britta", text: "Das kann ich sogar nachvollziehen. Nur hätte man uns vorher fragen können." },
              ],
              gloss: [
                { de: "die Regelung", tr: "düzenleme", en: "rule, arrangement" },
                { de: "die Einarbeitung", tr: "işe alıştırma", en: "onboarding" },
                { de: "nachvollziehen", tr: "anlayışla karşılamak", en: "to understand, to follow" },
                { de: "auf Antrag", tr: "başvuru üzerine", en: "upon application" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-01-h3-16",
              no: 16,
              ref: "g1",
              text: "Ab Oktober gibt es weniger Homeoffice-Tage als im Versuch.",
              answer: true,
              explain: "Denemede üç gündü, ekimden itibaren iki. Britta'nın \"Wir hatten doch drei\" itirazı da bunu doğruluyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h3-17",
              no: 17,
              ref: "g1",
              text: "Britta kann beide Tage frei wählen.",
              answer: false,
              explain:
                "Bir günü kendisi seçiyor, ikinciyi ekip ortak belirliyor: \"den zweiten legt das Team gemeinsam fest\".",
            },
            {
              kind: "bool",
              id: "de-b1-01-h3-18",
              no: 18,
              ref: "g1",
              text: "Der gemeinsame Tag ist schon endgültig festgelegt.",
              answer: false,
              explain:
                "Yusuf cuma olabileceğini tahmin ediyor (\"wahrscheinlich\") ama sonra düzeltiyor: \"Der Tag steht noch nicht fest\".",
            },
            {
              kind: "bool",
              id: "de-b1-01-h3-19",
              no: 19,
              ref: "g1",
              text: "Britta hat freitags Kundentermine.",
              answer: true,
              explain: "\"Freitag ist schlecht. Da habe ich die Termine mit den Kunden\" — bu yüzden başka gün istiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h3-20",
              no: 20,
              ref: "g1",
              text: "Wer weit weg wohnt, bekommt die Ausnahme automatisch.",
              answer: false,
              explain:
                "İstisna var ama \"nur auf Antrag\" — başvurmak gerekiyor. Britta bu satırı gözden kaçırdığını söylüyor.",
            },
            {
              kind: "bool",
              id: "de-b1-01-h3-21",
              no: 21,
              ref: "g1",
              text: "Als Grund für die Änderung wird die Einarbeitung neuer Kolleginnen genannt.",
              answer: true,
              explain: "\"Offiziell wegen der neuen Kolleginnen. Die Einarbeitung funktioniert im Büro besser\".",
            },
            {
              kind: "bool",
              id: "de-b1-01-h3-22",
              no: 22,
              ref: "g1",
              text: "Britta hält den Grund für völlig unsinnig.",
              answer: false,
              explain:
                "Tam tersine \"Das kann ich sogar nachvollziehen\" diyor. Eleştirdiği şey gerekçe değil, önceden sorulmamış olması.",
            },
          ],
        },
        {
          id: "de-b1-01-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Sie hören eine Diskussion. Wer sagt das? Wählen Sie zu den Aufgaben 23 bis 30. Sie hören den Text zweimal.",
          promptTr:
            "Bir tartışma dinleyeceksin. Bunu kim söylüyor? 23–30. maddeler için seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Bir programda başvuru evrakları tartışılıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Guten Abend. Viele Menschen wissen heute gar nicht mehr, was eigentlich in eine Bewerbung gehört. Darüber spreche ich mit Frau Bergmann, Personalleiterin, und Herrn Adeyemi, Berufsberater.",
                },
                { speaker: "Frau Bergmann", text: "Ich fange gleich mit dem Wichtigsten an: Die meisten Bewerbungen, die bei uns ankommen, sind schlicht zu lang." },
                { speaker: "Herr Adeyemi", text: "Da bin ich nur halb einverstanden. Länge ist kein Wert an sich, aber gegen eine klare Struktur sagt niemand etwas." },
                { speaker: "Moderatorin", text: "Und was ist mit dem Bewerbungsfoto? In Deutschland ist ein Foto längst nicht mehr Pflicht." },
                { speaker: "Frau Bergmann", text: "Richtig. Und noch etwas, das viele überraschen wird: Das Anschreiben lese ich meistens gar nicht. Ich schaue zuerst auf den Lebenslauf." },
                { speaker: "Herr Adeyemi", text: "Das höre ich oft, und trotzdem rate ich niemandem, es wegzulassen. Wichtiger ist etwas anderes: Eine Lücke im Lebenslauf soll man erklären, nicht verstecken." },
                { speaker: "Frau Bergmann", text: "Erklären ja, sich rechtfertigen nein. Ein Satz reicht." },
                {
                  speaker: "Herr Adeyemi",
                  text: "Und noch ein Punkt, der vielen schwerfällt: Man soll sich auch dann bewerben, wenn man nicht alles kann, was in der Anzeige steht.",
                },
                { speaker: "Moderatorin", text: "Frau Bergmann, sehen Sie das auch so?" },
                {
                  speaker: "Frau Bergmann",
                  text: "In der Praxis suchen wir selten jemanden, der alles mitbringt. Am Ende entscheidet ohnehin, ob jemand ins Team passt.",
                },
                { speaker: "Herr Adeyemi", text: "Ein letzter Tipp von mir: Nach dem Gespräch lohnt sich eine kurze Nachricht. Das kostet zwei Minuten und bleibt hängen." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-01-h4-23",
              no: 23,
              ref: "d1",
              text: "Die meisten Bewerbungen sind zu lang.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 1,
              explain:
                "Frau Bergmann konuşmasına bununla başlıyor. Herr Adeyemi hemen ardından \"nur halb einverstanden\" diyerek buna karşı çıkıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-24",
              no: 24,
              ref: "d1",
              text: "Viele wissen nicht, was in eine Bewerbung gehört.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 0,
              explain: "Bu, sunucunun açılış cümlesi; tartışmanın konusunu o çerçeveliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-25",
              no: 25,
              ref: "d1",
              text: "Eine Lücke im Lebenslauf soll man erklären, nicht verstecken.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 2,
              explain:
                "Herr Adeyemi söylüyor. Frau Bergmann sonra bunu sınırlıyor (\"sich rechtfertigen nein\") — yani cümlenin sahibi o değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-26",
              no: 26,
              ref: "d1",
              text: "Das Anschreiben wird oft gar nicht gelesen.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 1,
              explain:
                "\"Das Anschreiben lese ich meistens gar nicht\" — Frau Bergmann. Herr Adeyemi bunu duyduğunu söylüyor ama aynı görüşte değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-27",
              no: 27,
              ref: "d1",
              text: "Man soll sich auch bewerben, wenn man nicht alle Anforderungen erfüllt.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 2,
              explain: "Herr Adeyemi'nin \"noch ein Punkt, der vielen schwerfällt\" diye açtığı madde.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-28",
              no: 28,
              ref: "d1",
              text: "Ein Bewerbungsfoto ist in Deutschland keine Pflicht.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 0,
              explain:
                "Fotoğraf konusunu sunucu açıyor ve bilgiyi o veriyor. Frau Bergmann yalnız \"Richtig\" diyerek onaylıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-29",
              no: 29,
              ref: "d1",
              text: "Nach dem Gespräch lohnt sich eine kurze Nachricht.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 2,
              explain: "Programın son sözü Herr Adeyemi'ye ait: \"Ein letzter Tipp von mir\".",
            },
            {
              kind: "mcq",
              id: "de-b1-01-h4-30",
              no: 30,
              ref: "d1",
              text: "Am Ende entscheidet, ob jemand ins Team passt.",
              options: ["Die Moderatorin.", "Frau Bergmann.", "Herr Adeyemi."],
              answer: 1,
              explain:
                "Frau Bergmann, kimsenin her şeyi getirmediğini söyledikten sonra bu sonuca varıyor: \"Am Ende entscheidet ohnehin, ob jemand ins Team passt\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine persönliche E-Mail, einen Forumsbeitrag und eine formelle Nachricht.",
      instructionTr: "Bu bölümde üç görev var: kişisel bir e-posta, bir forum yorumu ve resmî bir ileti.",
      tasks: [
        {
          id: "de-b1-01-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Ela hat Ihnen geschrieben, dass sie ihre Stelle gekündigt hat und noch nicht weiß, wie es weitergeht. Antworten Sie ihr (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Ela sana işinden ayrıldığını ve bundan sonrasını henüz bilmediğini yazdı. Ona cevap yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Reagieren Sie auf ihre Nachricht.", tr: "İletisine karşılık ver." },
              { de: "Berichten Sie von einer eigenen Erfahrung.", tr: "Kendi yaşadığın bir şeyi anlat." },
              { de: "Machen Sie einen konkreten Vorschlag.", tr: "Somut bir öneride bulun." },
              { de: "Fragen Sie nach, wie Sie helfen können.", tr: "Nasıl yardımcı olabileceğini sor." },
            ],
            sample: `Liebe Ela,

danke für deine Nachricht. Ich habe sie zweimal gelesen — und ich finde deine Entscheidung mutig, auch wenn sie sich gerade bestimmt unsicher anfühlt.

Mir ging es vor drei Jahren ähnlich. Ich hatte vier Monate lang nichts, und rückblickend war genau diese Zeit nötig, um zu merken, was ich wirklich machen will.

Wie wäre es, wenn du dich bei der Berufsberatung meldest? Dort gibt es kostenlose Gespräche, und du musst dich zu nichts entscheiden.

Sag mir bitte, wie ich helfen kann. Soll ich mir deine Unterlagen ansehen?

Liebe Grüße
Marie`,
            criteria: [
              "Dört içerik noktası da işlendi mi? B1'de bir noktanın atlanması puanı doğrudan düşürür.",
              "Metin bir e-postanın biçimini taşıyor mu (hitap, paragraflar, veda)?",
              "Arkadaşa yazıldığı için baştan sona `du` kullanıldı mı?",
              "Cümleler `weil`, `obwohl`, `wenn`, `auch wenn` gibi bağlaçlarla bağlanmış mı?",
              "Öneri gerçekten somut mu, yoksa \"viel Glück\" gibi genel bir dilek mi?",
              "Yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-01-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Online-Forum lesen Sie: \"Sollen Schülerinnen und Schüler ein Pflichtpraktikum im Handwerk machen?\" Schreiben Sie Ihre Meinung (circa 80 Wörter).",
          promptTr:
            "Bir forumda şunu okuyorsun: \"Öğrenciler zorunlu olarak bir zanaat stajı yapmalı mı?\" Görüşünü yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Sagen Sie, was Sie von der Idee halten.", tr: "Fikir hakkında ne düşündüğünü söyle." },
              { de: "Begründen Sie Ihre Meinung mit einem Beispiel.", tr: "Görüşünü bir örnekle gerekçelendir." },
              { de: "Nennen Sie einen möglichen Nachteil.", tr: "Olası bir sakıncayı söyle." },
              { de: "Schließen Sie mit einem Vorschlag.", tr: "Bir öneriyle bitir." },
            ],
            sample: `Ich halte ein Pflichtpraktikum im Handwerk für sinnvoll. Viele Jugendliche kennen diese Berufe nur aus Erzählungen und entscheiden sich deshalb gegen etwas, das sie nie gesehen haben.

Meine Nichte wollte unbedingt studieren. Nach einer Woche in einer Schreinerei hat sie sich für eine Ausbildung entschieden und ist heute sehr zufrieden.

Ein Nachteil ist allerdings, dass nicht jeder Betrieb Zeit für Jugendliche hat. Wer eine Woche lang nur zuschaut, lernt wenig.

Deshalb schlage ich vor, dass die Schulen nur mit Betrieben zusammenarbeiten, die wirklich etwas zeigen wollen.`,
            criteria: [
              "Görüş açıkça belirtildi mi, yoksa iki taraf da anlatılıp karar verilmedi mi?",
              "Gerekçe somut bir örnekle desteklendi mi?",
              "Bir sakınca gerçekten adlandırıldı mı? (Yalnız \"aber es ist schwer\" yetmez.)",
              "Sonuç bir öneri mi, yoksa yalnız özet mi?",
              "Metin paragraflara ayrılmış ve bağlaçlarla örülmüş mü? (deshalb, allerdings, weil)",
              "Yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-01-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben sich für einen Abendkurs angemeldet, können aber am ersten Termin nicht kommen. Schreiben Sie an die Kursleitung, Frau Dr. Hensel (circa 40 Wörter).",
          promptTr:
            "Bir akşam kursuna kaydoldun ama ilk derse gelemeyeceksin. Kurs sorumlusu Frau Dr. Hensel'e yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Entschuldigen Sie sich.", tr: "Özür dile." },
              { de: "Nennen Sie den Grund.", tr: "Nedenini söyle." },
              { de: "Bitten Sie um die Unterlagen des ersten Termins.", tr: "İlk dersin belgelerini iste." },
            ],
            sample: `Sehr geehrte Frau Dr. Hensel,

ich habe mich für den Abendkurs Buchhaltung angemeldet, kann aber am ersten Termin leider nicht teilnehmen. An diesem Abend habe ich einen Termin im Krankenhaus, den ich nicht verschieben kann.

Könnten Sie mir bitte die Unterlagen der ersten Stunde zuschicken?

Mit freundlichen Grüßen
Tarik Öz`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Resmî ileti biçimi korunmuş mu? (Sehr geehrte Frau … / Mit freundlichen Grüßen, baştan sona `Sie`)",
              "Rica kibar bir kalıpla kurulmuş mu? (Könnten Sie … / Wäre es möglich …)",
              "Neden kısa ama anlaşılır biçimde verilmiş mi?",
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
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, ein Thema präsentieren, auf eine Präsentation reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte plan yapma, bir konuyu sunma, sunuma karşılık verme.",
      tasks: [
        {
          id: "de-b1-01-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam. Ihre Abteilung verabschiedet eine Kollegin, die in Rente geht. Sprechen Sie über: Wo feiern? — Wann? — Was schenken? — Wer spricht?",
          promptTr:
            "Birlikte plan yapın. Bölümünüz emekli olan bir çalışanı uğurluyor. Şunları konuşun: Nerede kutlanacak? — Ne zaman? — Ne hediye edilecek? — Kim konuşacak?",
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneride bulunmak ve gerekçelendirmek" },
              { de: "auf Vorschläge des Partners eingehen", tr: "Karşı tarafın önerisine gerçekten karşılık vermek" },
              { de: "gemeinsam entscheiden", tr: "Ortak karara varmak" },
            ],
            sample:
              "Ich schlage vor, dass wir im Innenhof feiern. Da passen alle rein, und wir müssen nichts mieten. — Im Hof ist es Ende Oktober vielleicht zu kalt. Wie wäre die Kantine nach Feierabend? — Stimmt, daran habe ich nicht gedacht. Dann Kantine, sagen wir Donnerstag ab siebzehn Uhr. Beim Geschenk bin ich für einen Gutschein für den Botanischen Garten, sie geht da jedes Wochenende hin. — Gute Idee. Und die Rede? — Das sollte Herr Klein machen, er arbeitet am längsten mit ihr zusammen.",
            criteria: [
              "Dört nokta da konuşuldu mu?",
              "Öneriler gerekçelendirildi mi, yoksa yalnız sıralandı mı?",
              "En az bir öneri reddedilip yerine yenisi getirildi mi? (B1'de sırf onaylamak yeterli değil)",
              "Karşı tarafın söylediğine gerçekten atıf yapıldı mı? (Stimmt, daran habe ich nicht gedacht …)",
              "Sonunda ortak karar açıkça özetlendi mi?",
            ],
          },
        },
        {
          id: "de-b1-01-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie eine kurze Präsentation zum Thema \"Weiterbildung neben dem Beruf\". Sprechen Sie zu diesen fünf Punkten: Einstieg ins Thema — die Lage in Ihrem Heimatland — die Lage in Deutschland — Vor- und Nachteile — Ihre eigene Meinung.",
          promptTr:
            "\"Çalışırken eğitim\" konusunda kısa bir sunum yap. Şu beş noktaya değin: konuya giriş — kendi ülkendeki durum — Almanya'daki durum — artı ve eksiler — kendi görüşün.",
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "das Thema vorstellen", tr: "Konuyu tanıtmak" },
              { de: "zwei Situationen vergleichen", tr: "İki durumu karşılaştırmak" },
              { de: "Vor- und Nachteile nennen", tr: "Artı ve eksileri sıralamak" },
              { de: "die eigene Meinung begründen", tr: "Kendi görüşünü gerekçelendirmek" },
            ],
            sample:
              "Ich möchte heute über Weiterbildung neben dem Beruf sprechen. Das Thema betrifft fast jeden, weil sich Berufe schneller ändern als früher. In meinem Heimatland machen die meisten Kurse am Wochenende, und der Betrieb hat damit wenig zu tun. In Deutschland habe ich es anders erlebt: Viele Firmen zahlen die Kurse und stellen sogar Arbeitszeit dafür zur Verfügung. Der Vorteil liegt auf der Hand — man verliert kein Einkommen. Ein Nachteil ist, dass man dann oft nur lernt, was der Firma nützt. Meiner Meinung nach sollte man beides verbinden: einen Teil vom Betrieb bezahlen lassen und einen Teil selbst wählen. Nur so bleibt man auch dann noch flexibel, wenn man die Stelle wechselt.",
            criteria: [
              "Beş noktanın hepsine değinildi mi ve sıra takip edilebiliyor mu?",
              "Karşılaştırma gerçekten yapıldı mı? (In meinem Heimatland … in Deutschland dagegen …)",
              "Hem artı hem eksi söylendi mi?",
              "Görüş bir gerekçeyle bağlandı mı? (Meiner Meinung nach … weil …)",
              "Sunum bir bütün olarak akıyor mu, yoksa beş ayrı cümle mi?",
              "Süre yaklaşık üç dakika mı?",
            ],
          },
        },
        {
          id: "de-b1-01-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf die Präsentation Ihres Partners: Geben Sie eine kurze Rückmeldung und stellen Sie eine Frage zum Inhalt. Antworten Sie danach auf die Frage Ihres Partners.",
          promptTr:
            "Karşındakinin sunumuna karşılık ver: kısa bir geri bildirim yap ve içerikle ilgili bir soru sor. Ardından sana sorulan soruyu cevapla.",
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "eine Rückmeldung geben", tr: "Geri bildirim vermek" },
              { de: "eine inhaltliche Frage stellen", tr: "İçeriğe ilişkin bir soru sormak" },
              { de: "auf eine Frage antworten", tr: "Sorulan soruyu cevaplamak" },
            ],
            sample:
              "Vielen Dank, das war sehr anschaulich, besonders der Vergleich zwischen den beiden Ländern. Eine Frage hätte ich: Du hast gesagt, dass Firmen die Kurse bezahlen. Gilt das auch für kleine Betriebe, oder nur für große? — Zu deiner Frage: Nein, das gilt nicht überall. Kleine Betriebe können sich das oft nicht leisten, dafür gibt es Zuschüsse vom Staat. Genau das habe ich selbst genutzt, als ich meinen Kurs gemacht habe.",
            criteria: [
              "Geri bildirim somut mu? (Sunumun neresi iyiydi, neden?)",
              "Soru içerikle ilgili mi, yoksa \"Wie geht es dir?\" gibi genel mi?",
              "Cevap soruyu gerçekten karşılıyor mu?",
              "Karşılıklı konuşma doğal akıyor mu, yoksa iki ayrı monolog mu?",
            ],
          },
        },
      ],
    },
  ],
};
