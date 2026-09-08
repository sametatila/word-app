import type { MockPaper } from "../types";

/**
 * B2 · Deneme 8 — "Sprache und Zugehörigkeit".
 *
 * PLAN kâğıt 1–7 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme · 6 köşe yazısı
 *                              · 6 görüş eşleştirme · 3 yönetmelik)
 *   Hören  40 dk · 30 madde   (10 karma · 6 söyleşi · 6 tartışma · 8 ana fikir)
 *   Schreiben 75 dk           okur mektubu (~150) + yarı resmî ileti (~100)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: dil ve aidiyet. Bunu sınavın kendi öğrencisine sormak riskli
 * ama kaçınılmaz — B2 adayının hayatındaki en yoğun tartışma bu. Metinler bu
 * yüzden hiçbir yerde adaya "senin sorunun" demiyor; konuşanlar öğretmen,
 * mühendis, tercüman, işveren, hukukçu — yani sorunu dışarıdan görenler.
 *
 * DENGE bilerek kuruldu: forumda ve tartışmada her iki taraf da en güçlü
 * hâliyle veriliyor. Güvenlik gerekçesiyle ortak dil isteyen vardiya amiri
 * de, kuralı koyup sekiz ay sonra geri alan işveren de kendi deneyimini
 * anlatıyor. Kâğıt bir görüşü ödüllendirmiyor; ayırt etmeyi ödüllendiriyor.
 *
 * SÜRE: konuşma bölümündeki iki görevin de `minutes` alanı yazılı. `taskSeconds`
 * açık süreyi ancak bölümün TÜM görevlerinde varsa kullanıyor — biri eksik
 * kalırsa iş yükü paylaşımı devreye giriyor ve sunum görevi kısa kalıyor.
 */
export const B2_08: MockPaper = {
  id: "de-b2-08",
  course: "de",
  level: "B2",
  no: 8,
  theme: "Sprache und Zugehörigkeit",
  themeTr: "Dil ve aidiyet",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Texte, einen Sachtext mit Lücken, einen Kommentar, Meinungsbeiträge und eine Prüfungsordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel metinler, boşluklu bir bilgi metni, bir köşe yazısı, görüş yazıları ve bir sınav yönetmeliği okuyacaksın.",
      tasks: [
        {
          id: "de-b2-08-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über Sprache im Alltag. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi gündelik hayatta dil üzerine yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Sattelberger, Grundschullehrerin",
              body: `In meiner Klasse werden neun Sprachen gesprochen. Überrascht hat mich nicht die Zahl, sondern die Scham.

Kinder, die zu Hause Kurdisch sprechen, haben mir gesagt, sie sprächen "nichts". Seit wir einmal in der Woche eine Viertelstunde in allen Sprachen zählen und singen, ist das anders.

Die Leistungen im Deutschen haben darunter nicht gelitten. Im Gegenteil: Das Sprechen über Sprache scheint zu helfen, weil die Kinder Regeln vergleichen.

Was mir fehlt, ist nicht Material. Es fehlt Zeit im Stundenplan, und die bekomme ich nur, wenn ich etwas anderes streiche.`,
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Kwiatkowski, Ingenieur",
              body: `Mein Deutsch reicht für alles außer für Humor.

Fachlich diskutiere ich ohne Mühe; in der Kaffeepause bin ich still. Das hat Folgen, die niemand aufschreibt: Wer in den Pausen nicht mitredet, wird bei informellen Absprachen schlicht vergessen.

Man hat mir oft geraten, ich solle einfach mehr sprechen. Das ist gut gemeint und geht am Kern vorbei.

Es fehlt mir nicht an Wörtern, sondern an Geschwindigkeit. Bis mein Satz fertig ist, sind zwei Themen weiter.`,
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Ndiaye, Dolmetscherin",
              body: `Ich übersetze seit fünfzehn Jahren bei Behörden.

Der häufigste Fehler ist nicht ein falsches Wort, sondern eine falsche Annahme: dass Verstehen und Zustimmen dasselbe seien. Menschen nicken, weil sie höflich sind, und unterschreiben, was sie nicht wollen.

Wirksam ist eine einfache Technik: Ich bitte darum, dass die Person mit eigenen Worten wiederholt, worum es geht.

Das dauert drei Minuten und spart später Monate.`,
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Bruck, Sprachcafé",
              body: `Wir haben klein angefangen, mit vier Leuten an einem Küchentisch. Heute kommen sechzig.

Was funktioniert, ist banal: kein Kurs, keine Anmeldung, kein Niveau.

Was nicht funktioniert, ist die Erwartung, dass daraus messbare Fortschritte werden. Wer ein Zertifikat braucht, ist bei uns falsch, und das sage ich inzwischen gleich am Anfang.

Uns geht es um den Moment, in dem jemand zum ersten Mal einen Witz auf Deutsch versteht. Der lässt sich nicht in Stufen einteilen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-08-l1-1",
              no: 1,
              text: "Wer beschreibt, dass fachliche und soziale Sprache auseinanderfallen?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 1,
              explain:
                "\"Fachlich diskutiere ich ohne Mühe; in der Kaffeepause bin ich still\" — ayrımı kendisi kuruyor ve sonucunu da söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-2",
              no: 2,
              text: "Wer nennt eine Technik, die Missverständnisse verhindert?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 2,
              explain:
                "\"Ich bitte darum, dass die Person mit eigenen Worten wiederholt, worum es geht\" — anlamak ile onaylamak arasındaki farkı bu yolla ayırıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-3",
              no: 3,
              text: "Wer sagt, dass ein gut gemeinter Rat am Problem vorbeigeht?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 1,
              explain:
                "\"Das ist gut gemeint und geht am Kern vorbei\" — çünkü eksik olan sözcük değil hız.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-4",
              no: 4,
              text: "Wer berichtet von Scham über die eigene Herkunftssprache?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 0,
              explain:
                "\"Überrascht hat mich nicht die Zahl, sondern die Scham\" — çocuklar kendi dillerini \"nichts\" diye adlandırıyormuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-5",
              no: 5,
              text: "Wer grenzt sein Angebot ausdrücklich von Prüfungen ab?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 3,
              explain:
                "\"Wer ein Zertifikat braucht, ist bei uns falsch\" — üstelik bunu baştan söylediğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-6",
              no: 6,
              text: "Wer nennt einen kleinen Zeitaufwand, der sich später auszahlt?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 2,
              explain:
                "\"Das dauert drei Minuten und spart später Monate\" — üç dakika ile aylar karşı karşıya konuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-7",
              no: 7,
              text: "Wer sagt, dass Mehrsprachigkeit dem Deutschunterricht nicht geschadet hat?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 0,
              explain:
                "\"Die Leistungen im Deutschen haben darunter nicht gelitten\" — hatta karşılaştırmanın yardımcı olduğunu düşünüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-8",
              no: 8,
              text: "Wer beschreibt ein Wachstum in Zahlen?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 3,
              explain:
                "\"mit vier Leuten an einem Küchentisch. Heute kommen sechzig\" — dörtten altmışa.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l1-9",
              no: 9,
              text: "Wer wünscht sich mehr Platz im Ablauf statt mehr Material?",
              options: ["Frau Sattelberger", "Herr Kwiatkowski", "Frau Ndiaye", "Herr Bruck"],
              answer: 0,
              explain:
                "\"Was mir fehlt, ist nicht Material. Es fehlt Zeit im Stundenplan\" — ve bunun bir başkasını silmek anlamına geldiğini de ekliyor.",
            },
          ],
        },
        {
          id: "de-b2-08-l2",
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
              title: "Warum Sprachenlernen im Erwachsenenalter unterschätzt wird",
              body: `Kaum eine Annahme hält sich so hartnäckig wie die, dass Sprachen nur Kinder wirklich gut lernen. Die Forschung stützt sie in dieser Form nicht. {{10}}

Der Unterschied liegt vor allem in der Aussprache. Wer nach der Pubertät beginnt, behält in der Regel einen hörbaren Akzent. {{11}}

Bei Wortschatz und Struktur sieht die Sache anders aus. Erwachsene lernen hier schneller, weil sie Regeln bewusst anwenden können. {{12}}

Warum aber scheitern trotzdem so viele? Der Grund liegt seltener im Kopf als im Kalender. {{13}}

Hinzu kommt ein sozialer Faktor, der selten benannt wird. Ein Kind darf Fehler machen, ohne dass jemand daraus Schlüsse zieht. {{14}}

Praktische Folgerungen liegen nahe. Wer Erwachsene unterrichtet, sollte weniger auf Perfektion und mehr auf Gelegenheiten setzen. {{15}}

Was bleibt, ist eine Korrektur des Bildes: Nicht das Alter begrenzt den Erfolg, sondern die Umstände, unter denen gelernt wird.`,
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Bei einem Erwachsenen wird derselbe Fehler als Aussage über die Person gelesen.",
            },
            {
              key: "b",
              label: "b",
              body: "Ein Kind hat täglich mehrere Stunden, eine berufstätige Person hat drei Abende in der Woche.",
            },
            {
              key: "c",
              label: "c",
              body: "In mehreren Untersuchungen holten sie Kinder in diesen Bereichen binnen eines Jahres ein.",
            },
            { key: "d", label: "d", body: "Sie trifft nur für einen Teilbereich zu, und der wird meist überschätzt." },
            { key: "e", label: "e", body: "Dieser Nachteil betrifft das Verstehen jedoch kaum." },
            { key: "f", label: "f", body: "Zehn kurze Gespräche wirken stärker als eine perfekte Übung." },
            { key: "g", label: "g", body: "Die Zahl der Kursangebote ist in zehn Jahren deutlich gestiegen." },
            { key: "h", label: "h", body: "Kinder werden dabei häufiger korrigiert als Erwachsene." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-08-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "d",
              explain:
                "Önceki cümle savı reddediyor: \"Die Forschung stützt sie in dieser Form nicht\". (d) reddi tamamlıyor — yalnız bir alanda geçerli ve o alan da abartılıyor. Sonraki paragraf tam o alanı açıyor.",
            },
            {
              kind: "match",
              id: "de-b2-08-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "e",
              explain:
                "Aksan bir dezavantaj olarak kuruluyor: \"behält in der Regel einen hörbaren Akzent\". (e) bu dezavantajı sınırlıyor, böylece sonraki paragrafın karşıtlığı hazırlanmış oluyor.",
            },
            {
              kind: "match",
              id: "de-b2-08-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "c",
              explain:
                "İddia veriliyor — \"Erwachsene lernen hier schneller\" — ama kanıt eksik. (c) kanıtı getiriyor: bir yıl içinde çocukları yakalıyorlar.",
            },
            {
              kind: "match",
              id: "de-b2-08-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "b",
              explain:
                "\"Der Grund liegt seltener im Kopf als im Kalender\" mecazı açıklama bekliyor; (b) takvimi somutluyor: günde saatler ile haftada üç akşam.",
            },
            {
              kind: "match",
              id: "de-b2-08-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "a",
              explain:
                "Çocuk için söylenen \"ohne dass jemand daraus Schlüsse zieht\" cümlesinin karşılığı gerekiyor; (a) yetişkinde aynı hatanın kişi hakkında bir yargıya dönüştüğünü söylüyor.",
            },
            {
              kind: "match",
              id: "de-b2-08-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "f",
              explain:
                "Öğüt soyut kalıyor: \"weniger auf Perfektion und mehr auf Gelegenheiten\". (f) bunu sayıyla somutluyor — on kısa konuşma, bir kusursuz alıştırmadan güçlü.",
            },
          ],
        },
        {
          id: "de-b2-08-l3",
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
              title: "Die Prüfung am falschen Ort",
              body: `Wer dauerhaft hierbleiben will, muss Deutsch nachweisen. Das ist kaum umstritten und wird von den meisten Betroffenen selbst so gesehen. Umstritten ist etwas anderes: welches Deutsch, zu welchem Zeitpunkt und wofür.

Ein Beispiel. Für den Ehegattennachzug wird ein Nachweis auf Anfängerniveau verlangt, und zwar bereits vor der Einreise. Abgenommen wird er im Herkunftsland, teils nur in der Hauptstadt, teils überhaupt nicht im Land. Wer in einer ländlichen Region lebt, reist zweitausend Kilometer für einen Test, den er nach der Einreise binnen sechs Wochen bestehen würde.

Die amtliche Begründung lautet, frühe Kenntnisse erleichterten das Ankommen. Das klingt plausibel und ist empirisch dünn. Vergleichbare Länder ohne diese Hürde weisen nach zwei Jahren keine schlechteren Sprachstände auf.

Man wird einwenden, eine Anforderung ohne Vorbedingung sei wertlos. Der Einwand hat Gewicht, richtet sich aber gegen ein Gespenst: Niemand fordert, den Nachweis zu streichen. Gefordert wird, ihn dorthin zu legen, wo Unterricht überhaupt verfügbar ist.

Bemerkenswert ist, wer von der jetzigen Regelung profitiert. Die Behörden nicht, deren Aufwand bleibt gleich. Profitiert haben private Anbieter, die in einigen Ländern die einzigen Prüfungsstellen betreiben.

Mein Vorschlag ist deshalb unspektakulär: Nachweis ja, aber binnen zwölf Monaten nach der Einreise, verbunden mit einem Kursanspruch von Anfang an.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-08-l3-16",
              no: 16,
              ref: "k1",
              text: "Was ist nach dem Autor kaum umstritten?",
              options: [
                "Der genaue Zeitpunkt der Prüfung.",
                "Dass ein Nachweis nötig ist.",
                "Das jeweils geforderte Niveau.",
              ],
              answer: 1,
              explain:
                "İlk paragraf ayrımı kuruyor: gereklilik tartışmalı değil, tartışmalı olan \"welches Deutsch, zu welchem Zeitpunkt und wofür\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l3-17",
              no: 17,
              ref: "k1",
              text: "Was kritisiert der Autor am Beispiel des Ehegattennachzugs?",
              options: [
                "Das verlangte Niveau ist viel zu hoch.",
                "Die Gebühren sind viel zu hoch.",
                "Der Prüfungsort ist zu weit weg.",
              ],
              answer: 2,
              explain:
                "Eleştiri seviyeye değil coğrafyaya: \"reist zweitausend Kilometer für einen Test, den er nach der Einreise binnen sechs Wochen bestehen würde\". Seviye zaten başlangıç düzeyi.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l3-18",
              no: 18,
              ref: "k1",
              text: "Wie bewertet er die amtliche Begründung?",
              options: [
                "Als schwach belegt.",
                "Als vollständig und klar widerlegt.",
                "Als durchaus überzeugend.",
              ],
              answer: 0,
              explain:
                "\"Das klingt plausibel und ist empirisch dünn\" — makul buluyor ama dayanağını zayıf sayıyor; tümden çürütülmüş demiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l3-19",
              no: 19,
              ref: "k1",
              text: "Wie geht der Autor mit dem Gegenargument um?",
              options: [
                "Er weist es rundweg als völlig unbegründet zurück.",
                "Er hält es für fehlgeleitet.",
                "Er übergeht es stillschweigend.",
              ],
              answer: 1,
              explain:
                "Ağırlığını kabul ediyor ama hedefini şaşırdığını söylüyor: \"Der Einwand hat Gewicht, richtet sich aber gegen ein Gespenst\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l3-20",
              no: 20,
              ref: "k1",
              text: "Wer profitiert nach dem Autor von der jetzigen Regelung?",
              options: ["Vor allem die Behörden selbst.", "Die Herkunftsländer.", "Private Anbieter."],
              answer: 2,
              explain:
                "Kurumları açıkça eliyor — \"Die Behörden nicht, deren Aufwand bleibt gleich\" — ve kazananı adlandırıyor: bazı ülkelerdeki tek sınav merkezlerini işleten özel kuruluşlar.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l3-21",
              no: 21,
              ref: "k1",
              text: "Was schlägt der Autor vor?",
              options: [
                "Den Nachweis zu verschieben.",
                "Die Prüfung deutlich zu verschärfen.",
                "Den Nachweis ganz abzuschaffen.",
              ],
              answer: 0,
              explain:
                "Kaldırmayı açıkça reddediyor — \"Niemand fordert, den Nachweis zu streichen\" — ve zamanı değiştiriyor: giriş sonrası on iki ay, baştan kurs hakkıyla.",
            },
          ],
        },
        {
          id: "de-b2-08-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob in Betrieben ausschließlich Deutsch gesprochen werden soll. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, işyerlerinde yalnız Almanca konuşulup konuşulmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Aslan, Betriebsrätin",
              body: "Eine Regel, die alle betrifft, wird am Ende nur bei einigen kontrolliert. Bei uns hat niemand beanstandet, dass die Geschäftsführung Englisch spricht. Beanstandet wurde Türkisch in der Umkleide. Deshalb bin ich gegen jede Sprachregel, die nicht für alle gleich gilt.",
            },
            {
              key: "b",
              label: "b — Herr Reimann, Schichtleiter",
              body: "In der Halle geht es um Sicherheit. Wenn zwei Leute an einer Maschine stehen und ich nicht verstehe, was gerufen wird, ist das kein Kulturthema. Außerhalb der Anlagen ist mir jede Sprache recht, dort mische ich mich nicht ein.",
            },
            {
              key: "c",
              label: "c — Frau Vogt, Sprachwissenschaftlerin",
              body: "Verbote erzeugen keine Sprachkompetenz, sie erzeugen Schweigen. Wer den ganzen Tag in einer Fremdsprache arbeitet, braucht Pausen in der eigenen, sonst sinkt die Leistung messbar. Das ist gut untersucht und wird trotzdem regelmäßig übergangen.",
            },
            {
              key: "d",
              label: "d — Herr Pistorius, Geschäftsführer",
              body: "Ich habe die Regel eingeführt und nach acht Monaten zurückgenommen. Nicht aus Einsicht, sondern weil drei gute Leute gekündigt haben. Lösen wollte ich die Kantine, in der sich feste Gruppen bildeten. Gelöst hat die Regel das nicht.",
            },
            {
              key: "e",
              label: "e — Frau Lubin, Auszubildende",
              body: "Mir hilft es, wenn Kolleginnen mit mir Deutsch sprechen — aber nur, solange sie es freiwillig tun. Als es Vorschrift wurde, hat mich niemand mehr angesprochen, weil alle Angst hatten, etwas falsch zu machen.",
            },
            {
              key: "f",
              label: "f — Herr Erdal, Arbeitsrechtler",
              body: "Rechtlich ist die Lage klarer, als viele denken: Eine pauschale Anordnung ist unzulässig, eine auf die Tätigkeit bezogene zulässig. Wer eine Regel formuliert, muss also sagen, wofür sie gilt — nicht wogegen sie sich richtet.",
            },
            {
              key: "g",
              label: "g — Frau Karg, Pflegedienstleitung",
              body: "Bei uns entscheidet nicht der Betrieb, sondern die zu pflegende Person. Manche wünschen ausdrücklich, dass in ihrer Sprache gesprochen wird. Eine allgemeine Regel würde ihnen etwas wegnehmen, das ihnen zusteht.",
            },
            {
              key: "h",
              label: "h — Herr Tamm, Qualitätsmanager",
              body: "Ich verstehe beide Seiten und habe deshalb aufgehört, öffentlich Position zu beziehen. Sicher sagen kann ich nur eines: Jede Regel, die wir in den letzten Jahren eingeführt haben, hat mehr Papier erzeugt als Wirkung.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-08-l4-22",
              no: 22,
              text: "Eine Regel wird in der Praxis nur bei einem Teil der Belegschaft durchgesetzt.",
              answer: "a",
              explain:
                "(a) iki örneği karşı karşıya koyuyor: yönetimin İngilizcesi kimseyi rahatsız etmemiş, soyunma odasındaki Türkçe etmiş.",
            },
            {
              kind: "match",
              id: "de-b2-08-l4-23",
              no: 23,
              text: "Für bestimmte Tätigkeiten ist eine gemeinsame Sprache eine Sicherheitsfrage.",
              answer: "b",
              explain:
                "(b) alanı sınırlıyor: \"In der Halle geht es um Sicherheit\", tesisin dışında karışmadığını da söylüyor.",
            },
            {
              kind: "match",
              id: "de-b2-08-l4-24",
              no: 24,
              text: "Ein Verbot senkt die Leistung, weil die Erholung in der eigenen Sprache fehlt.",
              answer: "c",
              explain:
                "(c) mekanizmayı veriyor: kendi dilinde mola olmadan \"sinkt die Leistung messbar\" — ve bunun araştırıldığını ekliyor.",
            },
            {
              kind: "match",
              id: "de-b2-08-l4-25",
              no: 25,
              text: "Die Regel wurde eingeführt und nach kurzer Zeit wieder zurückgenommen.",
              answer: "d",
              explain:
                "(d) süreyi ve sebebi veriyor: \"nach acht Monaten zurückgenommen … weil drei gute Leute gekündigt haben\".",
            },
            {
              kind: "match",
              id: "de-b2-08-l4-26",
              no: 26,
              text: "Eine Vorschrift bewirkt, dass gar nicht mehr gesprochen wird.",
              answer: "e",
              explain:
                "(e) kendi deneyimini anlatıyor: \"Als es Vorschrift wurde, hat mich niemand mehr angesprochen\".",
            },
            {
              kind: "match",
              id: "de-b2-08-l4-27",
              no: 27,
              text: "Entscheidend ist rechtlich, ob die Regel an die Tätigkeit gebunden ist.",
              answer: "f",
              explain:
                "(f) ayrımı kuralın kendisine bağlıyor: \"Eine pauschale Anordnung ist unzulässig, eine auf die Tätigkeit bezogene zulässig\".",
            },
          ],
        },
        {
          id: "de-b2-08-l5",
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
              title: "Prüfungsordnung Sprachzertifikat — Auszug",
              body: `§1 Anmeldung
Die Anmeldung erfolgt spätestens vier Wochen vor dem Termin. Eine Umbuchung auf einen späteren Termin ist einmalig und bis zehn Tage vorher möglich; danach verfällt die Gebühr.

§2 Teilprüfungen
Die Prüfung besteht aus vier Teilen. Wer in höchstens einem Teil unter sechzig Prozent bleibt, kann diesen Teil einmal wiederholen. Wer in zwei oder mehr Teilen darunter bleibt, wiederholt die gesamte Prüfung.

§3 Nachteilsausgleich
Ein Ausgleich wird auf Antrag gewährt und ist bei der Anmeldung nachzuweisen. Nachträgliche Anträge werden nur berücksichtigt, wenn der Grund kurzfristig eingetreten ist.

§4 Ergebnisse
Ergebnisse werden nach etwa vier Wochen zugestellt. Eine Einsicht in die Bewertung ist innerhalb eines Monats nach Zustellung möglich; eine Aushändigung von Kopien erfolgt nicht.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-08-l5-28",
              no: 28,
              ref: "o1",
              text: "Was gilt für eine Umbuchung?",
              options: [
                "Jederzeit bis zum Tag der Prüfung selbst.",
                "Nur ein Mal und nicht kurzfristig.",
                "Ausschließlich bei Krankheit.",
              ],
              answer: 1,
              explain:
                "§1 iki sınır koyuyor: \"einmalig und bis zehn Tage vorher möglich\", sonrasında ücret yanıyor. Hastalık koşulu hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l5-29",
              no: 29,
              ref: "o1",
              text: "Wann muss die gesamte Prüfung wiederholt werden?",
              options: [
                "Bei einem schwachen Teil.",
                "Immer nach einem Misserfolg.",
                "Bei zwei schwachen Teilen.",
              ],
              answer: 2,
              explain:
                "§2 eşiği sayıya bağlıyor: bir bölümde altmışın altı tek bölüm tekrarı, \"in zwei oder mehr Teilen\" ise tüm sınav.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-l5-30",
              no: 30,
              ref: "o1",
              text: "Was ist im Zusammenhang mit der Einsicht ausgeschlossen?",
              options: [
                "Das Mitnehmen von Kopien.",
                "Die Einsicht selbst.",
                "Die Zustellung des Ergebnisses.",
              ],
              answer: 0,
              explain:
                "§4 görmeyi bir ay süreyle açıyor ama \"eine Aushändigung von Kopien erfolgt nicht\" diyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Interview, eine Diskussion und acht kurze Beiträge.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir söyleşi, bir tartışma ve sekiz kısa parça dinleyeceksin.",
      tasks: [
        {
          id: "de-b2-08-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage in der Volkshochschule",
              genreTr: "Halk eğitim merkezinde anons",
              situation: "Seviye tespit sınavı düzenlemesi.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zu den Einstufungstests: Der Test am Montag ist ausgebucht. Für den Mittwochstermin sind noch Plätze frei, allerdings nur bei Anmeldung bis morgen zwölf Uhr. Wer den Test bereits im Vorjahr abgelegt hat, muss ihn nicht wiederholen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Okuma becerisi üzerine bir araştırma.",
              plays: 1,
              segments: [
                {
                  text: "Eine Untersuchung an vierzig Schulen zeigt: Kinder, die zu Hause eine andere Sprache sprechen, holen im Lesen bis zur sechsten Klasse im Schnitt auf. Entscheidend ist dabei weniger die Zahl der Förderstunden als die Frage, ob in der Familie überhaupt vorgelesen wird — in welcher Sprache, spielt kaum eine Rolle.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Denklik biriminden bilgi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Erol, hier ist die Anerkennungsstelle. Ihre eingereichten Unterlagen sind vollständig. Für die Anerkennung Ihres Abschlusses fehlt allerdings noch ein Nachweis über Deutsch auf dem geforderten Niveau. Das medizinische Fachdeutsch prüfen wir gesondert und erst im Anschluss.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Elternversammlung",
              genreTr: "Veli toplantısında duyuru",
              situation: "Destek dersinin saati değişiyor.",
              plays: 1,
              segments: [
                {
                  text: "Zum Sprachförderunterricht: Er findet ab Februar in der fünften Stunde statt, nicht mehr am Nachmittag. Das bedeutet, dass Ihr Kind in dieser Zeit nicht am Regelunterricht teilnimmt. Wer das nicht möchte, kann sein Kind abmelden; der Anspruch bleibt davon unberührt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Sprachnachricht",
              genreTr: "Sesli mesaj",
              situation: "Sınavdan sonra bir arkadaş anlatıyor.",
              plays: 1,
              segments: [
                {
                  text: "Hallo, ich bin's. Die Prüfung war anders als gedacht: Der schriftliche Teil lief richtig gut, aber beim Sprechen habe ich das Thema nicht verstanden und dreißig Sekunden gar nichts gesagt. Bestanden habe ich trotzdem, wenn auch knapp. Ich melde mich morgen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-08-h1-1",
              no: 1,
              ref: "h1",
              text: "Wer den Test im Vorjahr abgelegt hat, muss ihn nicht wiederholen.",
              answer: true,
              explain:
                "Anonsun son cümlesi bu istisnayı koyuyor: \"Wer den Test bereits im Vorjahr abgelegt hat, muss ihn nicht wiederholen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h1-2",
              no: 2,
              ref: "h1",
              text: "Was gilt für den Mittwochstermin?",
              options: [
                "Er ist ebenfalls ausgebucht.",
                "Er findet gar nicht statt.",
                "Anmeldung nur bis morgen.",
              ],
              answer: 2,
              explain:
                "Yer var ama süre kısa: \"nur bei Anmeldung bis morgen zwölf Uhr\". Dolu olan pazartesi.",
            },
            {
              kind: "bool",
              id: "de-b2-08-h1-3",
              no: 3,
              ref: "h2",
              text: "Nach der Untersuchung ist die Sprache des Vorlesens entscheidend.",
              answer: false,
              explain:
                "Araştırma tam bunu dışlıyor: \"in welcher Sprache, spielt kaum eine Rolle\". Belirleyici olan okunup okunmadığı.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h1-4",
              no: 4,
              ref: "h2",
              text: "Was ist nach der Untersuchung wichtig?",
              options: [
                "Die Zahl der zusätzlichen Förderstunden.",
                "Ob überhaupt vorgelesen wird.",
                "Die Größe der Klasse.",
              ],
              answer: 1,
              explain:
                "İki etken karşılaştırılıyor ve destek saati eleniyor: \"weniger die Zahl der Förderstunden als die Frage, ob in der Familie überhaupt vorgelesen wird\".",
            },
            {
              kind: "bool",
              id: "de-b2-08-h1-5",
              no: 5,
              ref: "h3",
              text: "Die eingereichten Unterlagen sind vollständig.",
              answer: true,
              explain:
                "Mesaj bunu doğrudan söylüyor: \"Ihre eingereichten Unterlagen sind vollständig\" — eksik olan ayrı bir belge.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h1-6",
              no: 6,
              ref: "h3",
              text: "Was fehlt noch?",
              options: [
                "Ein Nachweis über Deutsch.",
                "Die Fachprüfung Medizin.",
                "Eine beglaubigte Übersetzung.",
              ],
              answer: 0,
              explain:
                "Eksik olan dil belgesi; tıp Almancası ayrı ve sonraya bırakılıyor: \"prüfen wir gesondert und erst im Anschluss\".",
            },
            {
              kind: "bool",
              id: "de-b2-08-h1-7",
              no: 7,
              ref: "h4",
              text: "Der Förderunterricht findet weiterhin am Nachmittag statt.",
              answer: false,
              explain:
                "Duyuru değişikliği açıkça söylüyor: \"in der fünften Stunde statt, nicht mehr am Nachmittag\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h1-8",
              no: 8,
              ref: "h4",
              text: "Was ist die Folge der Verlegung?",
              options: [
                "Der Anspruch auf Förderung entfällt ganz.",
                "Regelunterricht fällt für das Kind weg.",
                "Der Unterricht dauert insgesamt länger.",
              ],
              answer: 1,
              explain:
                "Yeni saat normal derse denk geliyor: \"dass Ihr Kind in dieser Zeit nicht am Regelunterricht teilnimmt\". Hak ise duyuruya göre etkilenmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-08-h1-9",
              no: 9,
              ref: "h5",
              text: "Der schriftliche Teil ist schlecht gelaufen.",
              answer: false,
              explain:
                "Tersi söyleniyor: \"Der schriftliche Teil lief richtig gut\". Sorun konuşma bölümünde çıkmış.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h1-10",
              no: 10,
              ref: "h5",
              text: "Wie ist die Prüfung ausgegangen?",
              options: ["Knapp bestanden.", "Deutlich bestanden.", "Nicht bestanden."],
              answer: 0,
              explain:
                "\"Bestanden habe ich trotzdem, wenn auch knapp\" — otuz saniyelik sessizliğe rağmen geçmiş, ama sınırda.",
            },
          ],
        },
        {
          id: "de-b2-08-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Interview. Wählen Sie: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir söyleşi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir kurs kuruluşunun yöneticisi anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Herr Pallas, wie viele Ihrer Teilnehmenden schließen den Kurs mit dem Zielniveau ab?" },
                {
                  speaker: "Herr Pallas",
                  text: "Etwa die Hälfte im ersten Anlauf, nach der Wiederholung knapp zwei Drittel.",
                },
                { speaker: "Moderatorin", text: "Das klingt niedrig." },
                {
                  speaker: "Herr Pallas",
                  text: "Es klingt niedrig, wenn man die Ausgangslage weglässt. Ein Drittel unserer Teilnehmenden war vorher nie in einer Schule. Für diese Gruppe ist das Zielniveau in sechshundert Stunden nicht realistisch, und das war es nie.",
                },
                { speaker: "Moderatorin", text: "Was würden Sie ändern?" },
                {
                  speaker: "Herr Pallas",
                  text: "Die Stundenzahl ist das kleinere Problem. Größer ist, dass der Kurs vormittags läuft. Wer arbeitet, kommt nicht — und wer nicht arbeitet, wird gedrängt, es zu tun.",
                },
                { speaker: "Moderatorin", text: "Und die Kinderbetreuung?" },
                {
                  speaker: "Herr Pallas",
                  text: "Wir haben sie, aber nur zwölf Plätze bei achtzig Teilnehmenden. Die Warteliste ist länger, als der Kurs dauert.",
                },
                { speaker: "Moderatorin", text: "Was ärgert Sie am meisten?" },
                {
                  speaker: "Herr Pallas",
                  text: "Dass über Abbruchquoten geredet wird, als wären es Entscheidungen. In den meisten Fällen ist es eine Schicht, ein krankes Kind oder ein Umzug.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-08-h2-11",
              no: 11,
              ref: "i1",
              text: "Wie viele bestehen im ersten Anlauf?",
              options: ["Etwa die Hälfte.", "Knapp zwei Drittel.", "Etwa ein Drittel."],
              answer: 0,
              explain:
                "Üç oran geçiyor ve karışması kolay: ilk denemede \"etwa die Hälfte\", tekrardan sonra üçte iki, üçte bir ise hiç okula gitmemiş olanların payı.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h2-12",
              no: 12,
              ref: "i1",
              text: "Womit erklärt Herr Pallas diese Zahl?",
              options: [
                "Wegen der neuen Prüfungsform.",
                "Wegen fehlender Lehrkräfte.",
                "Wegen der Ausgangslage.",
              ],
              answer: 2,
              explain:
                "\"Es klingt niedrig, wenn man die Ausgangslage weglässt\" — üçte biri daha önce hiç okula gitmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h2-13",
              no: 13,
              ref: "i1",
              text: "Was ist nach ihm das größere Problem?",
              options: [
                "Die Zahl der angebotenen Stunden.",
                "Die Uhrzeit des Kurses.",
                "Das verlangte Prüfungsniveau.",
              ],
              answer: 1,
              explain:
                "İkisini açıkça karşılaştırıyor: \"Die Stundenzahl ist das kleinere Problem. Größer ist, dass der Kurs vormittags läuft.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h2-14",
              no: 14,
              ref: "i1",
              text: "Wie ist die Lage bei der Kinderbetreuung?",
              options: ["Es gibt keine.", "Sie reicht nicht aus.", "Sie wird kaum genutzt."],
              answer: 1,
              explain:
                "Var ama yetmiyor: \"nur zwölf Plätze bei achtzig Teilnehmenden\", üstelik bekleme listesi kurstan uzun.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h2-15",
              no: 15,
              ref: "i1",
              text: "Wie beschreibt er die Abbrüche?",
              options: [
                "Als bewusste Entscheidungen.",
                "Als Zeichen von Desinteresse.",
                "Als Folge äußerer Umstände.",
              ],
              answer: 2,
              explain:
                "Karar olmadıklarını söyleyip üç sebep sayıyor: \"eine Schicht, ein krankes Kind oder ein Umzug\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h2-16",
              no: 16,
              ref: "i1",
              text: "Was hält er für unrealistisch?",
              options: [
                "Das Zielniveau in 600 Stunden für alle.",
                "Jede Form von Abschlussprüfung.",
                "Kurse am frühen Vormittag.",
              ],
              answer: 0,
              explain:
                "Sınırı belirli bir gruba bağlıyor: \"Für diese Gruppe ist das Zielniveau in sechshundert Stunden nicht realistisch\" — sınavın kendisine değil.",
            },
          ],
        },
        {
          id: "de-b2-08-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Okulda ana dili dersi tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Dr. Kienzle, herkunftssprachlicher Unterricht — sinnvoll oder nicht?" },
                {
                  speaker: "Frau Dr. Kienzle",
                  text: "Wenn er gut gemacht ist, ja. Die Befunde sind allerdings uneinheitlich, und das liegt an der Qualität, nicht am Prinzip. Schlechter Unterricht in einer Sprache hilft in keiner.",
                },
                { speaker: "Moderator", text: "Herr Wolters, Sie haben ihn an Ihrer Schule abgeschafft." },
                {
                  speaker: "Herr Wolters",
                  text: "Ich habe ihn nicht abgeschafft. Ich habe die Stunden nicht neu besetzt, als die Lehrkraft gegangen ist. Das ist ein Unterschied. Für zwei Wochenstunden finde ich niemanden mit passender Ausbildung.",
                },
                {
                  speaker: "Frau Dr. Kienzle",
                  text: "Genau da liegt der Punkt. Wir diskutieren über das Ob, während das eigentliche Problem ein Personalproblem ist.",
                },
                {
                  speaker: "Herr Wolters",
                  text: "Einverstanden. Ich würde trotzdem sagen: Wenn ich zwei Stunden übrig habe, gebe ich sie dem Deutschen. Damit stehe ich in meinem Kollegium ziemlich allein, aber ich muss die Abschlüsse verantworten.",
                },
                {
                  speaker: "Frau Dr. Kienzle",
                  text: "Das verstehe ich und halte es doch für kurzsichtig. Kinder, die ihre Erstsprache verlieren, verlieren auch das Gerüst, an dem die zweite hängt.",
                },
                { speaker: "Moderator", text: "Gibt es einen gemeinsamen Punkt?" },
                {
                  speaker: "Herr Wolters",
                  text: "Dass Elternabende auf Deutsch allein nicht funktionieren. Dafür haben wir alle viel zu lange gebraucht.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-08-h3-17",
              no: 17,
              ref: "d1",
              text: "Wie bewertet Frau Dr. Kienzle den herkunftssprachlichen Unterricht?",
              options: [
                "Als grundsätzlich wirkungslos.",
                "Als abhängig von der Qualität.",
                "Als deutlich wichtiger als Deutsch.",
              ],
              answer: 1,
              explain:
                "Koşullu onay veriyor: \"Wenn er gut gemacht ist, ja\" ve karışık bulguları ilkeye değil kaliteye bağlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h3-18",
              no: 18,
              ref: "d1",
              text: "Wie korrigiert Herr Wolters die Darstellung?",
              options: [
                "Er hat den Unterricht deutlich ausgeweitet.",
                "Er hat ihn überhaupt nie angeboten.",
                "Die Stelle blieb unbesetzt.",
              ],
              answer: 2,
              explain:
                "Farkı kendisi vurguluyor: \"Ich habe ihn nicht abgeschafft. Ich habe die Stunden nicht neu besetzt … Das ist ein Unterschied.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h3-19",
              no: 19,
              ref: "d1",
              text: "Worin sehen beide die eigentliche Ursache?",
              options: [
                "In der Haltung der Eltern.",
                "Im fehlenden Personal.",
                "In der Finanzierung.",
              ],
              answer: 1,
              explain:
                "Kienzle bunu adlandırıyor — \"das eigentliche Problem ein Personalproblem ist\" — Wolters de \"Einverstanden\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h3-20",
              no: 20,
              ref: "d1",
              text: "Womit begründet Herr Wolters seine Priorität?",
              options: [
                "Mit den Abschlüssen.",
                "Mit dem Elternwillen.",
                "Mit den Vorgaben des Landes.",
              ],
              answer: 0,
              explain:
                "\"ich muss die Abschlüsse verantworten\" — üstelik kendi kurulunda azınlıkta kaldığını da kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h3-21",
              no: 21,
              ref: "d1",
              text: "Welchen Einwand erhebt Frau Dr. Kienzle dagegen?",
              options: [
                "Die Abschlüsse zählen ohnehin wenig.",
                "Deutschunterricht werde überschätzt.",
                "Die Zweitsprache braucht ein Gerüst.",
              ],
              answer: 2,
              explain:
                "Konumunu anlayıp itiraz ediyor: ilk dilini kaybeden çocuklar \"auch das Gerüst, an dem die zweite hängt\" kaybediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h3-22",
              no: 22,
              ref: "d1",
              text: "Worin sind sich beide einig?",
              options: [
                "Dass Elternabende so nicht reichen.",
                "Dass zwei Wochenstunden völlig genügen.",
                "Dass die Forschung ganz eindeutig ist.",
              ],
              answer: 0,
              explain:
                "Wolters ortak noktayı söylüyor: \"Dass Elternabende auf Deutsch allein nicht funktionieren\" — ve bunu geç fark ettiklerini ekliyor.",
            },
          ],
        },
        {
          id: "de-b2-08-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören acht kurze Beiträge. Worum geht es jeweils? Sie hören jeden Text einmal.",
          promptTr: "Sekiz kısa parça dinleyeceksin. Her birinde konu ne? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage in einer Behörde",
              genreTr: "Kurumda anons",
              situation: "Tercüman hizmeti hakkında.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zur Sprachmittlung: Für Termine ab Mai können Sie eine Dolmetscherin kostenfrei anfordern, allerdings nur bei der Anmeldung. Wer erst am Terminstag danach fragt, muss einen neuen Termin nehmen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Kurs sayıları açıklanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Die Zahl der angebotenen Sprachkurse im Landkreis ist in diesem Jahr um zwölf Prozent gestiegen. Gleichzeitig blieb jeder fünfte Kurs unbesetzt, weil er zu Zeiten stattfindet, die für Berufstätige nicht passen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Sınav sonucu bildiriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Osei, hier ist das Prüfungsbüro. Ihr Ergebnis liegt vor: Drei Teile sind bestanden, im Hörverstehen fehlen Ihnen vier Punkte. Diesen Teil können Sie einmal wiederholen, ohne die ganze Prüfung neu abzulegen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Ansage in der Bibliothek",
              genreTr: "Kütüphanede duyuru",
              situation: "Yabancı dildeki kitaplar.",
              plays: 1,
              segments: [
                {
                  text: "Unsere fremdsprachigen Bestände stehen ab sofort nicht mehr im Untergeschoss, sondern verteilt bei den jeweiligen Sachgebieten. Wir haben lange diskutiert und uns dagegen entschieden, Sprachen zu trennen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Podcast-Ausschnitt",
              genreTr: "Podcast parçası",
              situation: "Aksan ve başvurular üzerine.",
              plays: 1,
              segments: [
                {
                  text: "In einem Versuch wurden identische Lebensläufe mit unterschiedlich ausgesprochenen Sprachnachrichten kombiniert. Die Rückrufquote unterschied sich um neun Prozentpunkte. Die Bewertenden gaben an, die Aussprache habe für sie keine Rolle gespielt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m6",
              genre: "Durchsage im Kurszentrum",
              genreTr: "Kurs merkezinde anons",
              situation: "Bir ders iptal.",
              plays: 1,
              segments: [
                {
                  text: "Der Abendkurs B2 fällt heute aus, die Lehrkraft ist erkrankt. Ersatz konnten wir so kurzfristig nicht organisieren. Die Stunde wird am Ende des Kurses nachgeholt, der Termin steht ab Montag im Aushang.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m7",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Denklik kararı bildiriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Malinowski, hier ist die Anerkennungsstelle. Ihre Qualifikation wurde als teilweise gleichwertig eingestuft. Für die volle Anerkennung fehlen zwei Module, die Sie berufsbegleitend nachholen können.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m8",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Yerel ağızlar üzerine.",
              plays: 1,
              segments: [
                {
                  text: "Eine Erhebung zeigt, dass Jugendliche Dialekt seltener sprechen, ihn aber häufiger verstehen als vor zwanzig Jahren. Die Forschenden führen das auf Videoplattformen zurück, auf denen regionale Sprache gehört, aber nicht geübt wird.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-08-h4-23",
              no: 23,
              ref: "m1",
              text: "Worum geht es?",
              options: [
                "Die Sprachmittlung wird ab Mai kostenpflichtig.",
                "Alle Termine werden generell verschoben.",
                "Die Leistung ist an den Zeitpunkt gebunden.",
              ],
              answer: 2,
              explain:
                "Hizmet ücretsiz kalıyor ama zamanlaması bağlayıcı: \"allerdings nur bei der Anmeldung\", sonradan isteyen yeni randevu alıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-24",
              no: 24,
              ref: "m2",
              text: "Worum geht es?",
              options: [
                "Mehr Angebot allein reicht nicht.",
                "Das Kursangebot wurde deutlich gekürzt.",
                "Die Nachfrage ist völlig eingebrochen.",
              ],
              answer: 0,
              explain:
                "İki bilgi yan yana: arz yüzde on iki artmış, ama \"jeder fünfte Kurs unbesetzt\" kaldı — saatler çalışanlara uymadığı için.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-25",
              no: 25,
              ref: "m3",
              text: "Worum geht es?",
              options: [
                "Die ganze Prüfung muss neu abgelegt werden.",
                "Nur ein Teil wird wiederholt.",
                "Das Ergebnis liegt noch gar nicht vor.",
              ],
              answer: 1,
              explain:
                "Üç bölüm geçilmiş, birinde dört puan eksik: \"Diesen Teil können Sie einmal wiederholen, ohne die ganze Prüfung neu abzulegen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-26",
              no: 26,
              ref: "m4",
              text: "Worum geht es?",
              options: [
                "Fremdsprachige Bücher werden abgeschafft.",
                "Das Untergeschoss wird dauerhaft geschlossen.",
                "Sprachen werden bewusst nicht getrennt.",
              ],
              answer: 2,
              explain:
                "Duyuru kararın gerekçesini de veriyor: \"Wir haben lange diskutiert und uns dagegen entschieden, Sprachen zu trennen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-27",
              no: 27,
              ref: "m5",
              text: "Worum geht es?",
              options: [
                "Aussprache wirkt unbemerkt.",
                "Allein die Lebensläufe entscheiden.",
                "Der Versuch konnte gar nichts zeigen.",
              ],
              answer: 0,
              explain:
                "Fark ölçülmüş — dokuz puanlık geri dönüş farkı — ama değerlendirenler \"die Aussprache habe für sie keine Rolle gespielt\" demiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-28",
              no: 28,
              ref: "m6",
              text: "Worum geht es?",
              options: [
                "Der Kurs endet vorzeitig und ganz.",
                "Die Stunde wird nachgeholt.",
                "Eine neue Lehrkraft übernimmt den Kurs.",
              ],
              answer: 1,
              explain:
                "Ders bugün yapılmıyor ama düşmüyor: \"Die Stunde wird am Ende des Kurses nachgeholt\".",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-29",
              no: 29,
              ref: "m7",
              text: "Worum geht es?",
              options: [
                "Die Qualifikation wurde vollständig abgelehnt.",
                "Es fehlen noch einzureichende Unterlagen.",
                "Die Anerkennung ist unvollständig.",
              ],
              answer: 2,
              explain:
                "Karar kısmi: \"als teilweise gleichwertig eingestuft\", tam denklik için iki modül eksik.",
            },
            {
              kind: "mcq",
              id: "de-b2-08-h4-30",
              no: 30,
              ref: "m8",
              text: "Worum geht es?",
              options: [
                "Verstehen und Sprechen gehen auseinander.",
                "Der Dialekt verschwindet nach und nach ganz.",
                "Jugendliche sprechen wieder deutlich mehr Dialekt.",
              ],
              answer: 0,
              explain:
                "İki eğilim ters yönde: \"seltener sprechen, ihn aber häufiger verstehen\" — sebep olarak dinlenen ama denenmeyen bölgesel dil gösteriliyor.",
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
          id: "de-b2-08-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer hier lebt, sollte auch zu Hause Deutsch sprechen.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Burada yaşayan evinde de Almanca konuşmalı.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz beschreibt eine Sorge, die ich verstehe, und empfiehlt dagegen ein Mittel, das nicht wirkt.

Zunächst verwechselt er Wohnzimmer und Öffentlichkeit. Sprache wird dort gelernt, wo sie gebraucht wird: im Betrieb, im Verein, am Schalter. Wer acht Stunden täglich auf Deutsch arbeitet, lernt nicht mehr dazu, wenn er auch abends darauf verzichtet, sich genau ausdrücken zu können.

Zweitens hat der Vorschlag einen Preis, der selten mitgerechnet wird. Kinder, die ihre Erstsprache verlieren, verlieren auch das Gerüst, an dem die zweite hängt — und häufig obendrein den Zugang zu ihren Großeltern.

Nun ließe sich einwenden, dass gemeinsame Sprache Zusammenhalt schafft. Das stimmt für den öffentlichen Raum. Nur entsteht Zusammenhalt nicht dadurch, dass man Menschen vorschreibt, wie sie mit ihren eigenen Kindern reden.

Deshalb halte ich die Forderung für gut gemeint und falsch adressiert. Wer Deutsch fördern will, sollte Kurse abends anbieten, nicht Ratschläge für die Küche.

Mit freundlichen Grüßen
Nadia Osei`,
            criteria: [
              "İddiaya açıkça atıf yapıldı mı ve tartışma o cümle üzerinden mi yürüyor?",
              "En az iki bağımsız gerekçe var mı (aynı gerekçenin iki hâli değil)?",
              "Karşı görüş güçlü hâliyle mi alındı ve gerçekten yanıtlandı mı?",
              "Sonuç gerekçelerden çıkıyor mu, yoksa yalnız tekrar mı?",
              "Yaklaşık 150 kelime var mı; okur mektubu biçimi korunmuş mu?",
              "Bağlaç ve edilgen yapılar B2 düzeyinde kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-b2-08-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Sprachkurs wurde zwei Wochen vor Beginn auf einen Vormittagstermin verlegt, obwohl er als Abendkurs ausgeschrieben war. Schreiben Sie an die Kursleitung (circa 100 Wörter).",
          promptTr:
            "Kayıt olduğun kurs, akşam kursu olarak ilan edildiği hâlde başlamadan iki hafta önce sabaha alındı. Kurs yönetimine yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Schildern Sie den Sachverhalt sachlich.", tr: "Durumu nesnel biçimde anlat." },
              { de: "Erklären Sie, warum der neue Termin nicht geht.", tr: "Yeni saatin neden olmadığını açıkla." },
              { de: "Nennen Sie, was Sie erwarten.", tr: "Ne beklediğini söyle." },
              { de: "Setzen Sie eine Frist und bleiben Sie höflich.", tr: "Bir süre belirt ve nazik kal." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 3. Februar habe ich mich für den Kurs B2 angemeldet, der in Ihrem Programm ausdrücklich als Abendkurs ausgeschrieben war. Mit Ihrer Mail vom 20. Februar wurde er auf neun Uhr vormittags verlegt.

Zu dieser Zeit bin ich im Betrieb; eine Freistellung ist mir für ein halbes Jahr nicht möglich. Der Kurs wäre für mich damit hinfällig, obwohl ich die Gebühr bereits überwiesen habe.

Ich bitte Sie deshalb, mir entweder einen Platz in einem Abendkurs anzubieten oder die Gebühr zu erstatten.

Über eine Rückmeldung bis zum 5. März wäre ich Ihnen dankbar.

Mit freundlichen Grüßen
Nadia Osei`,
            criteria: [
              "Olay tarih ve sırayla anlatıldı mı?",
              "Yeni saatin neden olmadığı somut mu (iş, izin), yoksa genel bir cümle mi?",
              "İki uygulanabilir seçenek sunuldu mu?",
              "Ödenmiş ücret gibi somut dayanak kullanıldı mı?",
              "Süre verildi mi, ton nazik kaldı mı ve yaklaşık 100 kelime mi?",
            ],
          },
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
          id: "de-b2-08-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Mehrsprachigkeit: Vorteil oder Hindernis?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"Çok dillilik: avantaj mı engel mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
          // 180 sn hazırlık + 240 sn konuşma = 420 sn. `taskSeconds` açık süreyi
          // ancak bölümün TÜM görevlerinde varsa kullanıyor, bu yüzden p2'de de yazılı.
          minutes: 7,
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
              "Ich möchte heute darüber sprechen, ob Mehrsprachigkeit ein Vorteil oder ein Hindernis ist. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In Ghana wächst fast jedes Kind mit zwei oder drei Sprachen auf, und niemand hält das für bemerkenswert. In der Schule wird Englisch unterrichtet, zu Hause spricht man Twi oder Ewe. Für die Seite des Vorteils spricht, dass diese Kinder früh lernen, zwischen Systemen zu wechseln. Meine Nichte hat mit sieben Jahren erklärt, warum ein Wort in einer Sprache existiert und in der anderen nicht — das ist Sprachbewusstsein. Für die Gegenseite spricht, dass keine der Sprachen automatisch tief wird. Wer in drei Sprachen einkaufen kann, kann noch in keiner argumentieren. Das habe ich bei mir selbst gemerkt, als ich hier meine erste Prüfung schrieb. Meine Position ist deshalb: Mehrsprachigkeit ist ein Vorteil, aber kein Selbstläufer. Sie wird erst dann zum Nachteil, wenn eine Sprache nur geduldet und keine gefördert wird. Zusammenfassend: Nicht die Zahl der Sprachen entscheidet, sondern ob wenigstens eine bis zum Ende gelernt werden darf.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut ve açıklayıcı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Konum gerekçeli mi ve iki tarafı da hesaba katıyor mu?",
              "Dört dakika boyunca yapı korunabildi mi?",
            ],
          },
        },
        {
          id: "de-b2-08-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Stadtbibliothek hat 15.000 Euro für Sprachangebote. Zur Wahl stehen: ein offenes Sprachcafé, mehrsprachige Kinderbücher, ein Kurs zum Ausfüllen von Formularen, eine Dolmetscherstunde pro Woche. Einigen Sie sich auf eine Verwendung.",
          promptTr:
            "Birlikte bir karar verin. Bir şehir kütüphanesinin dil hizmetleri için 15.000 avrosu var. Seçenekler: açık dil kafesi, çok dilli çocuk kitapları, form doldurma kursu, haftada bir saat tercüman. Bir kullanım üzerinde anlaşın.",
          // p1 ile birlikte yazılı olması gerekiyor, yoksa açık süre yok sayılır.
          minutes: 8,
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Ich fange an: Ich bin für die mehrsprachigen Kinderbücher. Sie bleiben, während alles andere endet, sobald das Geld weg ist. Was meinen Sie?",
              tr: "Ben başlayayım: Çok dilli çocuk kitaplarından yanayım. Para bitince öteki her şey biter, kitaplar kalır. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve 'kalıcılık' gerekçesini doğrudan ele al.",
              expect: "bir seçeneği gerekçelendirmek ve kalıcılık gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Einwand: Die Dolmetscherstunde erreicht vielleicht zehn Menschen pro Woche. Ist das nicht sehr wenig für so viel Geld?",
              tr: "Bir itiraz: Haftada bir saat tercüman belki on kişiye ulaşır. Bu kadar para için çok az değil mi?",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve gerekirse bir birleşim öner.",
              expect: "itirazı ele almak ve gerekirse birleşik bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Für alle vier reicht das Geld nicht. Was streichen wir, und mit welcher Begründung?",
              tr: "Para dördü birden için yetmiyor. Neyi eliyoruz ve hangi gerekçeyle?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden elediğini söyle.",
              expect: "gerekçeli bir önceliklendirme yapmak ve elemeyi savunmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin?",
            },
            {
              who: "you",
              hint: "Varılan anlaşmayı kısa ve eksiksiz özetle.",
              expect: "anlaşmayı eksiksiz ve kısa biçimde özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 8,
            points: [
              { de: "einen Vorschlag begründen", tr: "Bir öneriyi gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "priorisieren und begründen", tr: "Önceliklendirmek ve gerekçelendirmek" },
              { de: "das Ergebnis zusammenfassen", tr: "Sonucu özetlemek" },
            ],
            sample:
              "Ich würde den Formularkurs vorziehen. Zur Frage der Dauerhaftigkeit: Bücher bleiben im Regal, aber sie werden nur gelesen, wenn jemand die Familien überhaupt in die Bibliothek bringt — und genau das leistet ein Kurs. Zum Einwand mit den zehn Menschen: Das stimmt, allerdings sind es zehn Menschen in einer Lage, in der ein Fehler Monate kostet. Ich schlage deshalb eine Kombination vor: neuntausend für den Formularkurs, viertausend für die Dolmetscherstunde und zweitausend für Bücher, die im Kursraum stehen. Streichen würde ich das Sprachcafé, weil es ehrenamtlich ohnehin läuft und kein Geld braucht. Zusammengefasst: Schwerpunkt auf dem Formularkurs, ergänzt um eine Dolmetscherstunde und einen kleinen Buchbestand am selben Ort; das Sprachcafé bleibt, wie es ist.",
            criteria: [
              "Öneri gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "İtiraz kabul edilip yanıtlandı mı, yoksa görmezden mi gelindi?",
              "Önceliklendirme yapıldı mı ve eleme gerekçelendirildi mi?",
              "Özet eksiksiz mi — anlaşılan her şey geçiyor mu?",
              "Tartışma dili B2 düzeyinde mi (einwenden, priorisieren, zusammenfassen)?",
            ],
          },
        },
      ],
    },
  ],
};
