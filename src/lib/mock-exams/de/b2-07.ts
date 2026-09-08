import type { MockPaper } from "../types";

/**
 * B2 · Deneme 7 — "Gesundheit und Versorgung".
 *
 * PLAN kâğıt 1–6 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme · 6 köşe yazısı
 *                              · 6 görüş eşleştirme · 3 yönetmelik)
 *   Hören  40 dk · 30 madde   (10 karma · 6 söyleşi · 6 tartışma · 8 ana fikir)
 *   Schreiben 75 dk           okur mektubu (~150) + yarı resmî ileti (~100)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: sağlık ve bakım. B2'nin ölçtüğü şey artık tutum değil AKIL
 * YÜRÜTME: bir sayının neyi gizlediğini görmek, bir açıklamanın kısmen doğru
 * olduğunu söyleyebilmek, kendi tarafının zayıf noktasını kabul etmek. Sağlık
 * tartışması bu üçünü aynı anda gerektiren ender alanlardan biri.
 *
 * SAYILAR bilerek "yanlış okunabilir" biçimde verildi: ortalama bekleme süresi
 * beş hafta, ama randevuların üçte biri bir hafta içinde dağıtılıyor. Maddeler
 * ortalamayı değil dağılımı soruyor — B2'de ölçülmesi gereken tam bu.
 *
 * KİŞİLER görevler arasında paylaşılmıyor; her görevin kendi kadrosu var.
 */
export const B2_07: MockPaper = {
  id: "de-b2-07",
  course: "de",
  level: "B2",
  no: 7,
  theme: "Gesundheit und Versorgung",
  themeTr: "Sağlık ve bakım",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Texte, einen Sachtext mit Lücken, einen Kommentar, Meinungsbeiträge und eine Erstattungsordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel metinler, boşluklu bir bilgi metni, bir köşe yazısı, görüş yazıları ve bir ödeme yönetmeliği okuyacaksın.",
      tasks: [
        {
          id: "de-b2-07-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über ihre Erfahrungen im Gesundheitswesen. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi sağlık alanındaki deneyimlerini yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Wehrle, Hausärztin auf dem Land",
              body: `Ich habe meine Praxis vor elf Jahren übernommen und suche seit vier Jahren eine Nachfolge.

Was mich dabei überrascht hat: Die Bewerberinnen fragen nicht zuerst nach dem Honorar, sondern nach den Wochenenden. Über Jahre wurde behauptet, junge Ärztinnen wollten nicht aufs Land. Tatsächlich wollen sie nicht allein sein.

Seit ich eine halbe Stelle anbiete und den Notdienst mit zwei Kolleginnen teile, kommen Anfragen. Das Problem war also nie der Ort, sondern der Zuschnitt der Arbeit.

Belastend bleibt etwas anderes: Ich verbringe täglich anderthalb Stunden mit Formularen, von denen ein großer Teil nie gelesen wird.`,
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Kappler, Patient mit chronischer Erkrankung",
              body: `Mit der Behandlung selbst bin ich zufrieden. Was mich zermürbt, ist die Organisation dazwischen.

Für eine Überweisung, deren Ausstellung zwei Minuten dauert, nehme ich mir einen halben Tag frei. Vier Praxen, vier Systeme, viermal dieselben Angaben.

Man sagt mir, die elektronische Akte werde das lösen. Ich höre diesen Satz seit acht Jahren, und in meinem Alltag hat sich nichts geändert.

Ehrlich gesagt setze ich inzwischen weniger auf Technik als auf eine einfache Regel: Wer schon einmal da war, sollte nicht wieder alles ausfüllen müssen.`,
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Bogdan, Pflegefachkraft",
              body: `Über den Personalmangel wird viel geschrieben, und meistens wird er falsch beschrieben.

Es fehlen nicht die Ausgebildeten. Es fehlen diejenigen, die bleiben. In meinem Kurs waren wir vierundzwanzig; sechs Jahre später arbeiten noch neun im Beruf.

Gegangen sind die anderen nicht wegen der Schwere der Arbeit. Gegangen sind sie, weil sich der Dienstplan dreimal im Monat ändert und weil man nie weiß, ob der freie Sonntag hält.

Ein höheres Gehalt hätte bei mir nichts geändert. Ein verlässlicher Plan hätte es.`,
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Trost, Apotheker",
              body: `Ich stehe an der Stelle, an der die Widersprüche des Systems zusammenlaufen.

Menschen kommen zu mir, weil in der Praxis kein Termin frei ist, und erwarten eine Einschätzung, die ich nicht abgeben darf. Gleichzeitig sehe ich, wie viele Packungen ungeöffnet zurückgebracht werden.

Was mir fehlt, ist nicht mehr Geld, sondern die Befugnis, bei einfachen Fragen selbst zu entscheiden.

In mehreren Nachbarländern ist das seit Jahren üblich, und die dortigen Systeme sind daran nicht zerbrochen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-07-l1-1",
              no: 1,
              text: "Wer nennt die Verlässlichkeit der Arbeitszeit als entscheidend?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 2,
              explain:
                "Frau Bogdan iki şeyi karşı karşıya koyuyor: \"Ein höheres Gehalt hätte bei mir nichts geändert. Ein verlässlicher Plan hätte es.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-2",
              no: 2,
              text: "Wer widerlegt die Annahme, junge Ärztinnen wollten nicht aufs Land?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 0,
              explain:
                "\"Über Jahre wurde behauptet, junge Ärztinnen wollten nicht aufs Land. Tatsächlich wollen sie nicht allein sein.\" — sorunu yere değil işin biçimine bağlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-3",
              no: 3,
              text: "Wer beklagt, dieselben Angaben mehrfach machen zu müssen?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 1,
              explain:
                "\"Vier Praxen, vier Systeme, viermal dieselben Angaben\" — ve istediği kural bunu ortadan kaldıracak olan.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-4",
              no: 4,
              text: "Wer wünscht sich mehr eigene Entscheidungsbefugnis?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 3,
              explain:
                "\"Was mir fehlt, ist nicht mehr Geld, sondern die Befugnis, bei einfachen Fragen selbst zu entscheiden.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-5",
              no: 5,
              text: "Wer belegt mit einer Zahl, wie viele im Beruf geblieben sind?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 2,
              explain:
                "İki sayı veriyor: \"In meinem Kurs waren wir vierundzwanzig; sechs Jahre später arbeiten noch neun im Beruf.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-6",
              no: 6,
              text: "Wer verliert täglich Zeit an Dokumentation?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 0,
              explain:
                "\"Ich verbringe täglich anderthalb Stunden mit Formularen\" — üstelik bunların büyük bölümünün okunmadığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-7",
              no: 7,
              text: "Wer verweist auf die Erfahrung anderer Länder?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 3,
              explain:
                "\"In mehreren Nachbarländern ist das seit Jahren üblich, und die dortigen Systeme sind daran nicht zerbrochen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-8",
              no: 8,
              text: "Wer misstraut einer seit Langem angekündigten technischen Lösung?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 1,
              explain:
                "\"Ich höre diesen Satz seit acht Jahren, und in meinem Alltag hat sich nichts geändert\" — elektronik dosyaya değil basit bir kurala güveniyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l1-9",
              no: 9,
              text: "Wer sagt, dass ein höheres Gehalt die eigene Entscheidung nicht verändert hätte?",
              options: ["Frau Wehrle", "Herr Kappler", "Frau Bogdan", "Herr Trost"],
              answer: 2,
              explain:
                "Kendi durumu üzerinden konuşuyor: \"Ein höheres Gehalt hätte bei mir nichts geändert.\"",
            },
          ],
        },
        {
          id: "de-b2-07-l2",
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
              title: "Warum Vorbeugung so selten gewinnt",
              body: `Kaum ein Satz findet so viel Zustimmung wie der, dass Vorbeugen besser sei als Heilen. In der Verteilung der Mittel schlägt sich diese Zustimmung allerdings kaum nieder. {{10}}

Der Grund liegt weniger im Unwillen als in der Struktur der Nachweise. Eine geheilte Krankheit hat einen Namen und ein Datum. {{11}}

Hinzu kommt ein zeitliches Problem. Die Kosten der Vorbeugung fallen sofort an, der Nutzen zeigt sich nach Jahren, häufig erst nach der nächsten Wahl. {{12}}

Ungünstig verteilt sind auch die Zuständigkeiten. Wer für Bewegung an Schulen sorgt, entlastet Kassen, die dafür nichts bezahlen. {{13}}

Dass es anders gehen kann, zeigen einzelne Programme. In Finnland wurde in den siebziger Jahren in einer Region gezielt an Ernährung und Rauchen gearbeitet. {{14}}

Übertragbar ist das nur begrenzt. Die damalige Ausgangslage war extrem, und die Bevölkerung war klein und wenig beweglich. {{15}}

Was bleibt, ist eine nüchterne Einsicht: Vorbeugung verliert nicht in der Sache, sondern in der Buchführung.`,
            },
          ],
          options: [
            { key: "a", label: "a", body: "Eine verhinderte Krankheit hat beides nicht." },
            {
              key: "b",
              label: "b",
              body: "Die Sterblichkeit an Herzkrankheiten ging dort binnen zwanzig Jahren um mehr als die Hälfte zurück.",
            },
            { key: "c", label: "c", body: "Wer heute vorsorgt, wird morgen dafür kaum gelobt." },
            {
              key: "d",
              label: "d",
              body: "Der Anteil liegt in vielen Ländern seit Jahrzehnten bei etwa drei Prozent der Gesundheitsausgaben.",
            },
            { key: "e", label: "e", body: "Wer den Nutzen hat, trägt also nicht die Kosten." },
            { key: "f", label: "f", body: "Trotzdem lassen sich einzelne Elemente durchaus übernehmen." },
            { key: "g", label: "g", body: "Die Behandlung akuter Fälle ist dadurch deutlich billiger geworden." },
            { key: "h", label: "h", body: "Über die Reihenfolge der Untersuchungen entscheiden die Praxen selbst." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-07-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "d",
              explain:
                "Boşluktan önce onayın bütçeye yansımadığı söyleniyor; (d) bunu sayıyla somutluyor: \"etwa drei Prozent der Gesundheitsausgaben\".",
            },
            {
              kind: "match",
              id: "de-b2-07-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "a",
              explain:
                "Önceki cümle iyileşen hastalığın \"einen Namen und ein Datum\" taşıdığını söylüyor; (a) tam bu ikisini olumsuzlayarak karşıtlığı kapatıyor.",
            },
            {
              kind: "match",
              id: "de-b2-07-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "c",
              explain:
                "Paragraf zamansal sorunu anlatıyor: \"Die Kosten der Vorbeugung fallen sofort an, der Nutzen zeigt sich nach Jahren\". (c) bunun siyasi sonucunu söylüyor — bugün önlem alan yarın övülmüyor.",
            },
            {
              kind: "match",
              id: "de-b2-07-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "e",
              explain:
                "Önceki cümle örneği veriyor: \"Wer für Bewegung an Schulen sorgt, entlastet Kassen, die dafür nichts bezahlen\". (e) bunu kurala çeviriyor — fayda ile masraf ayrı ellerde.",
            },
            {
              kind: "match",
              id: "de-b2-07-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "b",
              explain:
                "Örnek tanıtılıyor ama sonucu eksik: \"In Finnland wurde in den siebziger Jahren in einer Region gezielt an Ernährung und Rauchen gearbeitet\". (b) sonucu sayıyla getiriyor: yirmi yılda yarıdan fazla düşüş.",
            },
            {
              kind: "match",
              id: "de-b2-07-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "f",
              explain:
                "Paragraf aktarılabilirliği sınırlıyor; (f) `trotzdem` ile sınırı kabul edip yine de bir pay bırakıyor. Bu, sonraki paragrafın ölçülü sonucuna hazırlık.",
            },
          ],
        },
        {
          id: "de-b2-07-l3",
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
              title: "Der Termin, den es nicht gibt",
              body: `Wer in diesem Land einen Facharzttermin sucht, lernt schnell, dass es zwei Systeme gibt: eines für die, die warten können, und eines für die, die wissen, wen sie anrufen müssen.

Die Zahlen sind bekannt und werden gern falsch gelesen. Im Schnitt wartet man beim Kardiologen fünf Wochen. Der Durchschnitt verdeckt jedoch, dass ein Drittel der Termine innerhalb einer Woche vergeben wird — an Menschen, die entweder privat versichert sind oder über die richtigen Kontakte verfügen.

Die übliche Erklärung lautet: zu wenige Ärzte. Sie trifft regional zu, insgesamt nicht. Die Zahl der Fachärztinnen und Fachärzte ist in zwanzig Jahren um ein Drittel gestiegen, die Wartezeit ebenfalls. Gestiegen ist nämlich auch die Zahl der Termine je Patient.

Man kann das begrüßen: mehr Kontrolle, mehr Sicherheit. Man kann aber ebenso fragen, wie vielen dieser Termine tatsächlich jemand geholfen hat. Für die Antwort fehlen die Daten, und das ist kein Zufall — wer misst, riskiert, selbst gemessen zu werden.

Der Vorschlag, Termine zentral zu vergeben, wird seit Jahren diskutiert und ebenso lange abgeräumt. Die Begründung, das sei Bevormundung, überzeugt mich nicht. Bevormundet wird bereits heute, nur eben nicht nach Dringlichkeit, sondern nach Auskunftsfähigkeit.

Mir wäre deshalb eine kleine Lösung lieber als gar keine: Jede Praxis veröffentlicht, wie viele Termine sie kurzfristig vergibt und an wen. Wer das ablehnt, sollte begründen, warum.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-07-l3-16",
              no: 16,
              ref: "k1",
              text: "Was kritisiert der Autor am Umgang mit den Zahlen?",
              options: [
                "Sie werden überhaupt nicht erhoben.",
                "Der Mittelwert sagt zu wenig.",
                "Sie stammen aus einem anderen Land.",
              ],
              answer: 1,
              explain:
                "Rakam biliniyor ama yanlış okunuyor: ortalama beş hafta, oysa \"ein Drittel der Termine innerhalb einer Woche vergeben wird\". Eleştirilen şey verinin yokluğu değil, ortalamanın dağılımı gizlemesi.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l3-17",
              no: 17,
              ref: "k1",
              text: "Wie bewertet der Autor die Erklärung, es gebe zu wenige Ärzte?",
              options: [
                "Als teilweise zutreffend.",
                "Als vollständig falsch und unbelegt.",
                "Als die einzige echte Ursache.",
              ],
              answer: 0,
              explain:
                "Açık bir sınırlama var: \"Sie trifft regional zu, insgesamt nicht\". Yani ne tümden yanlış ne de tek sebep.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l3-18",
              no: 18,
              ref: "k1",
              text: "Was ist parallel zur Zahl der Fachärzte gestiegen?",
              options: [
                "Die Terminzahl je Patient.",
                "Die Zahl der Privatversicherten.",
                "Die Zahl der Krankenhäuser.",
              ],
              answer: 0,
              explain:
                "Yazının çelişkiyi çözdüğü yer: hekim sayısı üçte bir artmış, bekleme de artmış, çünkü \"Gestiegen ist nämlich auch die Zahl der Termine je Patient\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l3-19",
              no: 19,
              ref: "k1",
              text: "Warum fehlen nach dem Autor die Daten zum Nutzen?",
              options: [
                "Weil sie technisch nicht erhebbar sind.",
                "Weil niemand ein Interesse daran hat.",
                "Weil die Kassen sie zurückhalten.",
              ],
              answer: 1,
              explain:
                "Eksikliği kasıtlı sayıyor: \"das ist kein Zufall — wer misst, riskiert, selbst gemessen zu werden\". Teknik bir engelden söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l3-20",
              no: 20,
              ref: "k1",
              text: "Wie geht der Autor mit dem Vorwurf der Bevormundung um?",
              options: [
                "Er hält ihn für berechtigt.",
                "Er hält ihn für zweitrangig.",
                "Er dreht ihn um.",
              ],
              answer: 2,
              explain:
                "İtirazı reddetmiyor, bugüne çeviriyor: \"Bevormundet wird bereits heute … nicht nach Dringlichkeit, sondern nach Auskunftsfähigkeit\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l3-21",
              no: 21,
              ref: "k1",
              text: "Was schlägt der Autor am Ende vor?",
              options: [
                "Eine zentrale Vergabe aller Termine.",
                "Mehr Ausbildungsplätze für Fachärzte.",
                "Veröffentlichung der Vergabepraxis.",
              ],
              answer: 2,
              explain:
                "Merkezî dağıtımı tartışıp bırakıyor ve daha küçük bir şey istiyor: her muayenehane kısa vadeli randevuları \"wie viele … und an wen\" olarak açıklasın.",
            },
          ],
        },
        {
          id: "de-b2-07-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Krankenkassen Vorsorgeuntersuchungen mit einem Bonus belohnen sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, sağlık sigortalarının koruyucu muayeneleri primle ödüllendirip ödüllendirmemesi konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Ligeti, Hausärztin",
              body: "Boni holen sich die Menschen, die ohnehin kommen. Diejenigen, die ich erreichen müsste, erreiche ich damit gerade nicht; sie haben andere Sorgen als einen Stempel im Heft. Wirksam wäre eine Sprechstunde nach zwanzig Uhr, nicht ein Gutschein.",
            },
            {
              key: "b",
              label: "b — Herr Marwede, Kassenvorstand",
              body: "Wir zahlen jährlich für Vorsorge, die ohne diesen Anreiz schlicht nicht stattfände. Dass wir dabei auch Menschen belohnen, die ohnehin gekommen wären, ist der Preis dafür. Die Alternative hieße, gar nichts zu tun.",
            },
            {
              key: "c",
              label: "c — Frau Pusch, Gesundheitsökonomin",
              body: "Die Studienlage ist unangenehm eindeutig: Boni verändern das Verhalten kaum, sie verschieben aber Geld von Kranken zu Gesunden. Wer das für richtig hält, soll es sagen. Wer nicht, soll die Programme beenden.",
            },
            {
              key: "d",
              label: "d — Herr Sedlak, Schichtarbeiter",
              body: "Ich bekomme den Bonus nicht, weil ich die Termine zeitlich nicht schaffe. Meine Frau bekommt ihn, weil sie im Büro arbeitet. Belohnt wird also nicht die Vorsorge, sondern eine bestimmte Arbeitszeit.",
            },
            {
              key: "e",
              label: "e — Frau Ivan, Selbsthilfegruppe",
              body: "Für chronisch Kranke wirkt das Ganze zynisch. Wir gehen häufiger zur Ärztin als alle anderen und bekommen weniger zurück, weil unsere Termine nicht als Vorsorge zählen. Über diese Gruppe wird in der Debatte nie gesprochen.",
            },
            {
              key: "f",
              label: "f — Herr Norrenbrock, Betriebsarzt",
              body: "In den Betrieben, die ich betreue, ist der Bonus das einzige Argument, das bei der Geschäftsführung zieht. Ohne ihn gäbe es die Untersuchungen im Werk überhaupt nicht. Das ist kein schönes Argument, aber ein wirksames.",
            },
            {
              key: "g",
              label: "g — Frau Zehner, Datenschützerin",
              body: "Mich stört weniger der Bonus als das, was für ihn erfasst wird. Wer den Nachweis erbringt, meldet nebenbei, wo er wann gewesen ist. Ausgewertet wird das heute nicht — vorhanden sind die Daten trotzdem.",
            },
            {
              key: "h",
              label: "h — Herr Gorski, Rentner",
              body: "Ich sammle diese Stempel seit dreißig Jahren und habe insgesamt so viel bekommen, dass es ungefähr für ein Paar Schuhe reicht. Als Motivation taugt das nicht, als Erinnerung durchaus.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-07-l4-22",
              no: 22,
              text: "Statt einer Belohnung wären andere Öffnungszeiten wirksamer.",
              answer: "a",
              explain:
                "(a) alternatifi adıyla veriyor: \"Wirksam wäre eine Sprechstunde nach zwanzig Uhr, nicht ein Gutschein\".",
            },
            {
              kind: "match",
              id: "de-b2-07-l4-23",
              no: 23,
              text: "Der Bonus verteilt Geld von Kranken zu Gesunden um.",
              answer: "c",
              explain:
                "(c) bunu araştırma sonucu olarak söylüyor: \"sie verschieben aber Geld von Kranken zu Gesunden\".",
            },
            {
              kind: "match",
              id: "de-b2-07-l4-24",
              no: 24,
              text: "Faktisch wird nicht die Vorsorge belohnt, sondern eine bestimmte Arbeitszeit.",
              answer: "d",
              explain:
                "(d) kendi ve eşinin durumunu karşılaştırıp sonucu çıkarıyor: \"Belohnt wird also nicht die Vorsorge, sondern eine bestimmte Arbeitszeit\".",
            },
            {
              kind: "match",
              id: "de-b2-07-l4-25",
              no: 25,
              text: "Ohne den Bonus fänden bestimmte Untersuchungen gar nicht statt.",
              answer: "f",
              explain:
                "(f) bunu kendi alanı için söylüyor: \"Ohne ihn gäbe es die Untersuchungen im Werk überhaupt nicht\" — ve gerekçeyi güzel bulmadığını da ekliyor.",
            },
            {
              kind: "match",
              id: "de-b2-07-l4-26",
              no: 26,
              text: "Für den Nachweis entstehen Daten, die später ausgewertet werden könnten.",
              answer: "g",
              explain:
                "(g) bugünü ve olasılığı ayırıyor: \"Ausgewertet wird das heute nicht — vorhanden sind die Daten trotzdem\".",
            },
            {
              kind: "match",
              id: "de-b2-07-l4-27",
              no: 27,
              text: "Eine ganze Gruppe kommt in der Debatte überhaupt nicht vor.",
              answer: "e",
              explain:
                "(e) kronik hastaları kastediyor: \"Über diese Gruppe wird in der Debatte nie gesprochen\".",
            },
          ],
        },
        {
          id: "de-b2-07-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Erstattungsordnung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Ödeme yönetmeliğini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Erstattungsordnung",
              genreTr: "Ödeme yönetmeliği",
              title: "Erstattungsordnung für Zusatzleistungen",
              body: `§1 Anspruch
Erstattet werden Leistungen, die vor Beginn beantragt und schriftlich bewilligt wurden. Eine nachträgliche Bewilligung ist ausgeschlossen. Davon unberührt bleiben Notfälle; diese sind innerhalb von zehn Tagen anzuzeigen.

§2 Höhe
Die Erstattung beträgt achtzig Prozent des Rechnungsbetrags, höchstens jedoch 300 Euro je Kalenderjahr. Nicht ausgeschöpfte Beträge verfallen zum Jahresende und werden nicht in das Folgejahr übertragen.

§3 Nachweise
Vorzulegen sind die Originalrechnung sowie ein Nachweis der Zahlung. Kopien werden anerkannt, sofern das Original bei einer anderen Stelle eingereicht wurde und dies bestätigt wird.

§4 Fristen
Anträge sind bis zum 31. März des Folgejahres einzureichen. Verspätet eingegangene Anträge werden ohne inhaltliche Prüfung zurückgewiesen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-07-l5-28",
              no: 28,
              ref: "o1",
              text: "Was gilt für Notfälle?",
              options: [
                "Auch sie müssen vorher bewilligt werden.",
                "Sie werden gar nicht erstattet.",
                "Sie sind binnen zehn Tagen zu melden.",
              ],
              answer: 2,
              explain:
                "§1 önce ön onay kuralını koyuyor, sonra istisnayı: \"Davon unberührt bleiben Notfälle; diese sind innerhalb von zehn Tagen anzuzeigen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l5-29",
              no: 29,
              ref: "o1",
              text: "Was passiert mit nicht genutzten Beträgen?",
              options: [
                "Sie verfallen am Jahresende.",
                "Sie werden ins nächste Jahr übertragen.",
                "Sie werden ausgezahlt.",
              ],
              answer: 0,
              explain:
                "§2 iki şeyi birden söylüyor: \"verfallen zum Jahresende und werden nicht in das Folgejahr übertragen\". Yani devir açıkça dışlanmış.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-l5-30",
              no: 30,
              ref: "o1",
              text: "Wann wird ein Antrag ohne inhaltliche Prüfung zurückgewiesen?",
              options: [
                "Wenn eine Kopie eingereicht wird.",
                "Wenn er nach dem 31. März eingeht.",
                "Wenn der Betrag unter 300 Euro liegt.",
              ],
              answer: 1,
              explain:
                "§4 tarihi ve sonucu birlikte veriyor: \"bis zum 31. März des Folgejahres\", sonrasında \"ohne inhaltliche Prüfung zurückgewiesen\". Kopya ise §3'te koşullu olarak kabul ediliyor.",
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
          id: "de-b2-07-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage in einer Klinik",
              genreTr: "Klinikte anons",
              situation: "Ziyaret saatiyle ilgili bir değişiklik.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für Besucherinnen und Besucher: Die Besuchszeit auf Station drei endet heute bereits um achtzehn Uhr, da eine Fortbildung stattfindet. Für Angehörige von Intensivpatienten gilt diese Einschränkung nicht.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Reçete verilerine dair bir değerlendirme.",
              plays: 1,
              segments: [
                {
                  text: "Eine Auswertung von acht Millionen Rezepten zeigt: Bei Antibiotika ist die Zahl der Verordnungen binnen zehn Jahren um etwa ein Viertel gesunken. Bei Schlafmitteln dagegen ist sie stabil geblieben, sie verschiebt sich allerdings deutlich in höhere Altersgruppen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Muayenehane tahlil sonucunu bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Kolbe, hier ist die Praxis am Stadtpark. Ihr Befund ist da und unauffällig, Sie brauchen deshalb keinen Termin. Falls die Beschwerden anhalten, melden Sie sich bitte trotzdem in etwa zwei Wochen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage in der Apotheke",
              genreTr: "Eczanede duyuru",
              situation: "Gece nöbeti düzeni anlatılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zum Notdienst: Ab zwanzig Uhr ist der Zugang ausschließlich über das Nachtfenster möglich. Für jede Abgabe außerhalb der Öffnungszeit wird eine Gebühr von zweiundzwanzig Cent erhoben, unabhängig vom Wert der Ware.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Sprachnachricht",
              genreTr: "Sesli mesaj",
              situation: "Bir randevu değişikliği ve bir hatırlatma.",
              plays: 1,
              segments: [
                {
                  text: "Hallo, hier ist Kai. Der Termin bei der Physiotherapie ist auf Dienstag gelegt worden, nicht auf Mittwoch. Und bring bitte die Verordnung mit — ohne dieses Papier behandeln sie dich nicht, das habe ich beim letzten Mal gelernt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-07-h1-1",
              no: 1,
              ref: "h1",
              text: "Für Angehörige von Intensivpatienten gilt die Einschränkung nicht.",
              answer: true,
              explain:
                "Anonsun son cümlesi istisnayı açıkça koyuyor: \"Für Angehörige von Intensivpatienten gilt diese Einschränkung nicht\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h1-2",
              no: 2,
              ref: "h1",
              text: "Warum endet die Besuchszeit früher?",
              options: [
                "Wegen einer Fortbildung.",
                "Wegen einer großen Operation.",
                "Wegen akuten Personalmangels.",
              ],
              answer: 0,
              explain:
                "Gerekçe `da` ile veriliyor: \"da eine Fortbildung stattfindet\". Personel ya da ameliyat hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-07-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Zahl der Schlafmittel-Verordnungen ist deutlich gesunken.",
              answer: false,
              explain:
                "Düşen şey antibiyotik: yaklaşık dörtte bir. Uyku ilaçları için tersi söyleniyor: \"ist sie stabil geblieben\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h1-4",
              no: 4,
              ref: "h2",
              text: "Was hat sich bei Schlafmitteln verändert?",
              options: [
                "Die Gesamtzahl der Verordnungen.",
                "Die Altersverteilung.",
                "Der durchschnittliche Preis.",
              ],
              answer: 1,
              explain:
                "Toplam sabit kalmış, değişen dağılım: \"sie verschiebt sich allerdings deutlich in höhere Altersgruppen\".",
            },
            {
              kind: "bool",
              id: "de-b2-07-h1-5",
              no: 5,
              ref: "h3",
              text: "Der Befund von Frau Kolbe ist unauffällig.",
              answer: true,
              explain:
                "Mesaj sonucu ve sonucunu birlikte veriyor: \"Ihr Befund ist da und unauffällig, Sie brauchen deshalb keinen Termin\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h1-6",
              no: 6,
              ref: "h3",
              text: "In welchem Fall soll sie sich melden?",
              options: [
                "Auf jeden Fall sofort am kommenden Montag.",
                "Nur bei anhaltenden Beschwerden.",
                "Gar nicht mehr.",
              ],
              answer: 1,
              explain:
                "Randevu gerekmiyor ama koşullu bir kapı bırakılıyor: \"Falls die Beschwerden anhalten, melden Sie sich bitte trotzdem\".",
            },
            {
              kind: "bool",
              id: "de-b2-07-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Gebühr richtet sich nach dem Wert der Ware.",
              answer: false,
              explain:
                "Duyuru bunu açıkça dışlıyor: yirmi iki sent \"unabhängig vom Wert der Ware\" alınıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h1-8",
              no: 8,
              ref: "h4",
              text: "Was gilt ab zwanzig Uhr?",
              options: [
                "Die Apotheke schließt vollständig zu.",
                "Der Notdienst entfällt an dem Tag.",
                "Der Zugang läuft über ein Fenster.",
              ],
              answer: 2,
              explain:
                "Eczane kapanmıyor, giriş değişiyor: \"ist der Zugang ausschließlich über das Nachtfenster möglich\".",
            },
            {
              kind: "bool",
              id: "de-b2-07-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Termin ist am Mittwoch.",
              answer: false,
              explain:
                "Mesaj günü düzeltiyor: \"auf Dienstag gelegt worden, nicht auf Mittwoch\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h1-10",
              no: 10,
              ref: "h5",
              text: "Was ist ohne die Verordnung nicht möglich?",
              options: ["Der Termin selbst.", "Die Bezahlung.", "Die Behandlung."],
              answer: 2,
              explain:
                "\"ohne dieses Papier behandeln sie dich nicht\" — engellenen şey randevu değil, tedavinin kendisi.",
            },
          ],
        },
        {
          id: "de-b2-07-h2",
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
              situation: "Bir acil servis sorumlusu anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Dr. Reber, wie viele Menschen kommen an einem normalen Tag zu Ihnen?" },
                {
                  speaker: "Frau Dr. Reber",
                  text: "Im Schnitt zweihundertzwanzig. An Montagen sind es dreihundert, weil das Wochenende nachwirkt.",
                },
                { speaker: "Moderatorin", text: "Wie viele davon sind echte Notfälle?" },
                {
                  speaker: "Frau Dr. Reber",
                  text: "Nach unserer Einstufung etwa ein Drittel. Das heißt aber nicht, dass die übrigen zu Unrecht kommen. Sie kommen, weil sie sonst nirgendwohin können.",
                },
                { speaker: "Moderatorin", text: "Was würde helfen?" },
                {
                  speaker: "Frau Dr. Reber",
                  text: "Eine Praxis im selben Gebäude, geöffnet bis zweiundzwanzig Uhr. Wir hatten das zwei Jahre lang, und unsere Zahlen sind um ein Fünftel gefallen. Dann lief die Finanzierung aus.",
                },
                { speaker: "Moderatorin", text: "Und mehr Personal?" },
                {
                  speaker: "Frau Dr. Reber",
                  text: "Das hilft, trifft aber nicht den Kern. Wer mehr Personal einstellt, ohne den Zulauf zu verändern, behandelt schneller und bekommt bald mehr Patienten.",
                },
                { speaker: "Moderatorin", text: "Was ärgert Sie am meisten?" },
                {
                  speaker: "Frau Dr. Reber",
                  text: "Die Rede von der Erziehung der Patienten. Wer um drei Uhr nachts mit einem fiebernden Kind kommt, hat keinen Aufklärungsbedarf, sondern keine Alternative.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-07-h2-11",
              no: 11,
              ref: "i1",
              text: "Wie viele Menschen kommen an einem Montag?",
              options: ["Etwa zweihundertzwanzig.", "Etwa dreihundert.", "Etwa hundert."],
              answer: 1,
              explain:
                "İki sayı ayrı ayrı veriliyor: ortalama iki yüz yirmi, ama \"An Montagen sind es dreihundert\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h2-12",
              no: 12,
              ref: "i1",
              text: "Wie viele der Fälle sind echte Notfälle?",
              options: [
                "Etwa ein Drittel.",
                "Ungefähr die Hälfte aller Fälle.",
                "Praktisch alle Patienten.",
              ],
              answer: 0,
              explain:
                "\"Nach unserer Einstufung etwa ein Drittel\" — ve hemen ardından kalanların haksız gelmediğini ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h2-13",
              no: 13,
              ref: "i1",
              text: "Wie erklärt Frau Dr. Reber die übrigen Fälle?",
              options: [
                "Mit mangelnder Aufklärung der Leute.",
                "Mit völlig falschen Erwartungen.",
                "Mit fehlenden Alternativen.",
              ],
              answer: 2,
              explain:
                "Sebep bilgisizlik değil seçeneksizlik: \"Sie kommen, weil sie sonst nirgendwohin können\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h2-14",
              no: 14,
              ref: "i1",
              text: "Welche Wirkung hatte die Praxis im selben Gebäude?",
              options: [
                "Ein Rückgang um fast die Hälfte.",
                "Ein Rückgang um ein Fünftel.",
                "Überhaupt keine messbare Wirkung.",
              ],
              answer: 1,
              explain:
                "\"unsere Zahlen sind um ein Fünftel gefallen\" — üstelik etki ölçülmüş, ama finansman bitince uygulama durmuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h2-15",
              no: 15,
              ref: "i1",
              text: "Was sagt sie über mehr Personal?",
              options: [
                "Es löst den Kern nicht.",
                "Es verschlimmert die Lage sogar.",
                "Es ist völlig überflüssig.",
              ],
              answer: 0,
              explain:
                "Faydasını kabul edip sınırlıyor: \"Das hilft, trifft aber nicht den Kern\" — çünkü hızlanan servis daha çok hasta çekiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h2-16",
              no: 16,
              ref: "i1",
              text: "Was kritisiert sie am Ende?",
              options: [
                "Die Finanzierung der Kliniken.",
                "Die Ausbildung des Personals.",
                "Die Rede von Erziehung.",
              ],
              answer: 2,
              explain:
                "\"Die Rede von der Erziehung der Patienten\" — gerekçesi de veriliyor: gece üçte gelen kişinin eksiği bilgi değil seçenek.",
            },
          ],
        },
        {
          id: "de-b2-07-h3",
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
              situation: "Görüntülü muayene tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Dr. Ohlert, Videosprechstunde — Fortschritt oder Notlösung?" },
                {
                  speaker: "Frau Dr. Ohlert",
                  text: "Beides, je nach Fall. Für eine Kontrolle nach einer Operation ist sie besser als eine lange Fahrt über Land. Für eine Erstvorstellung halte ich sie für riskant, weil ich am Bildschirm nicht tasten kann.",
                },
                { speaker: "Moderator", text: "Herr Baldauf, Sie fordern mehr davon." },
                {
                  speaker: "Herr Baldauf",
                  text: "Ich fordere die Wahl. Für Menschen ohne Auto, mit Schichtdienst oder mit Pflegeaufgaben ist die Videosprechstunde oft der einzige Weg. Dass sie nicht alles ersetzt, bestreitet niemand.",
                },
                {
                  speaker: "Frau Dr. Ohlert",
                  text: "Da sind wir näher beieinander, als es klingt. Mein Einwand richtet sich nicht gegen die Technik, sondern gegen die Vorstellung, sie sei billiger. Sie verlagert nur, wer die Zeit aufbringt.",
                },
                {
                  speaker: "Herr Baldauf",
                  text: "Das sehe ich anders. Meine Zeit ist auch etwas wert, und in Ihrer Rechnung taucht sie gar nicht auf.",
                },
                { speaker: "Moderator", text: "Gibt es einen Punkt, bei dem Sie sich einig sind?" },
                {
                  speaker: "Frau Dr. Ohlert",
                  text: "Dass die Vergütung falsch gesetzt ist. Ein Videokontakt wird schlechter bezahlt als ein Besuch, obwohl er oft länger dauert.",
                },
                { speaker: "Herr Baldauf", text: "Genau. Solange das so bleibt, bleibt es eine Randerscheinung." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-07-h3-17",
              no: 17,
              ref: "d1",
              text: "Wie bewertet Frau Dr. Ohlert die Videosprechstunde insgesamt?",
              options: [
                "Als grundsätzlich ungeeignet.",
                "Als je nach Fall geeignet.",
                "Als besser als jeder Besuch.",
              ],
              answer: 1,
              explain:
                "İlk sözü ayrımı kuruyor: \"Beides, je nach Fall\" — ardından bir uygun ve bir riskli örnek veriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h3-18",
              no: 18,
              ref: "d1",
              text: "Wofür hält sie die Videosprechstunde für riskant?",
              options: [
                "Für Kontrollen nach Operationen.",
                "Für chronisch Kranke.",
                "Für Erstvorstellungen.",
              ],
              answer: 2,
              explain:
                "Gerekçesiyle söylüyor: \"Für eine Erstvorstellung halte ich sie für riskant, weil ich am Bildschirm nicht tasten kann\". Ameliyat sonrası kontrol ise uygun bulduğu örnek.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h3-19",
              no: 19,
              ref: "d1",
              text: "Was fordert Herr Baldauf?",
              options: [
                "Den Ersatz der Praxis.",
                "Die Wahlmöglichkeit.",
                "Die Abschaffung der Fahrten.",
              ],
              answer: 1,
              explain:
                "Talebini ilk cümlede sınırlıyor: \"Ich fordere die Wahl\" — ve her şeyin yerini almadığını kendisi kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h3-20",
              no: 20,
              ref: "d1",
              text: "Was ist Frau Dr. Ohlerts eigentlicher Einwand?",
              options: [
                "Die Kosten werden verlagert.",
                "Die Technik funktioniert oft nicht.",
                "Die Patienten wollen es nicht.",
              ],
              answer: 0,
              explain:
                "İtirazını kendisi tanımlıyor: tekniğe değil ucuz sayılmasına — \"Sie verlagert nur, wer die Zeit aufbringt\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h3-21",
              no: 21,
              ref: "d1",
              text: "Womit widerspricht Herr Baldauf ihr?",
              options: [
                "Er bestreitet sämtliche Zahlen.",
                "Er lenkt auf ein anderes Thema.",
                "Er verweist auf seine Zeit.",
              ],
              answer: 2,
              explain:
                "Hesabın eksik kaldığını söylüyor: \"Meine Zeit ist auch etwas wert, und in Ihrer Rechnung taucht sie gar nicht auf\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h3-22",
              no: 22,
              ref: "d1",
              text: "Worin sind sich beide einig?",
              options: [
                "Dass die Vergütung falsch ist.",
                "Dass die Technik ausreicht.",
                "Dass Hausbesuche wichtiger sind.",
              ],
              answer: 0,
              explain:
                "Ohlert söylüyor, Baldauf \"Genau\" diyerek onaylıyor: görüntülü görüşme daha uzun sürdüğü hâlde daha az ödeniyor.",
            },
          ],
        },
        {
          id: "de-b2-07-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören acht kurze Beiträge. Worum geht es jeweils? Sie hören jeden Text einmal.",
          promptTr: "Sekiz kısa parça dinleyeceksin. Her birinde konu ne? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage im Wartezimmer",
              genreTr: "Bekleme salonunda anons",
              situation: "Bilgisayar sistemi çöktü.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Patientinnen und Patienten, unser Praxissystem ist seit einer Stunde ausgefallen. Wir behandeln weiter, brauchen die Karten aber vorübergehend auf Papier. Rechnen Sie bitte mit längeren Wartezeiten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Aşı oranı verisi.",
              plays: 1,
              segments: [
                {
                  text: "Die Impfquote bei Masern liegt in diesem Bundesland bei sechsundneunzig Prozent und damit erstmals über der empfohlenen Schwelle. Regional bleiben die Unterschiede allerdings groß: In zwei Landkreisen wird der Wert deutlich verfehlt.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Eczane hazır ilacı bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist die Apotheke am Markt. Ihr Medikament ist eingetroffen. Wir legen es bis Freitag zurück; danach geben wir es an andere Kundinnen ab, weil die Nachfrage derzeit hoch ist.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Ansage im Betrieb",
              genreTr: "İşyerinde duyuru",
              situation: "Kan bağışı günü.",
              plays: 1,
              segments: [
                {
                  text: "Am Donnerstag steht der Blutspendebus wieder auf dem Werksgelände. Die Teilnahme erfolgt während der Arbeitszeit und wird nicht angerechnet. Bitte tragen Sie sich in die Liste ein, damit die Pausen geplant werden können.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Podcast-Ausschnitt",
              genreTr: "Podcast parçası",
              situation: "Uyku araştırması.",
              plays: 1,
              segments: [
                {
                  text: "Die verbreitete Regel von acht Stunden hält der Prüfung nicht stand. Entscheidend ist nach heutigem Stand weniger die Dauer als die Regelmäßigkeit: Wer täglich zur selben Zeit schläft, erholt sich messbar besser als jemand mit gleicher Gesamtdauer und wechselnden Zeiten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m6",
              genre: "Durchsage in der Klinik",
              genreTr: "Klinikte anons",
              situation: "Asansör arızası.",
              plays: 1,
              segments: [
                {
                  text: "Der mittlere Aufzug ist bis voraussichtlich Freitag außer Betrieb. Für Betten und Rollstühle nutzen Sie bitte den Aufzug im Westflügel. Der Weg dorthin ist ab der Anmeldung ausgeschildert.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m7",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Rehabilitasyon başvurusu sonuçlandı.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Wieczorek, hier ist die Sachbearbeitung. Ihr Antrag auf Rehabilitation ist bewilligt, allerdings für eine ambulante und nicht für eine stationäre Maßnahme. Den Bescheid mit der Begründung erhalten Sie in den nächsten Tagen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m8",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Sıcak hava uyarısı.",
              plays: 1,
              segments: [
                {
                  text: "Für die kommenden Tage warnt der Wetterdienst vor hohen Temperaturen. Besonders gefährdet sind ältere Menschen, die allein leben. Angehörige und Nachbarn werden gebeten, einmal täglich nachzufragen — die meisten Notfälle entstehen nicht durch die Hitze selbst, sondern durch zu wenig Trinken.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-07-h4-23",
              no: 23,
              ref: "m1",
              text: "Worum geht es?",
              options: [
                "Die Praxis schließt für heute.",
                "Es dauert länger als sonst.",
                "Die Termine werden abgesagt.",
              ],
              answer: 1,
              explain:
                "Muayenehane çalışmayı sürdürüyor — \"Wir behandeln weiter\" — ama kayıtlar kâğıda geçtiği için beklemenin uzayacağı söyleniyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-24",
              no: 24,
              ref: "m2",
              text: "Worum geht es?",
              options: [
                "Ein Ziel ist erreicht, aber nicht überall.",
                "Die Impfquote ist erneut gefallen.",
                "Eine neue Empfehlung wurde beschlossen.",
              ],
              answer: 0,
              explain:
                "İki bilgi birlikte: oran ilk kez eşiğin üstünde, ama \"In zwei Landkreisen wird der Wert deutlich verfehlt\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-25",
              no: 25,
              ref: "m3",
              text: "Worum geht es?",
              options: [
                "Das Medikament ist nicht lieferbar.",
                "Die Abholung ist befristet.",
                "Der Preis hat sich geändert.",
              ],
              answer: 1,
              explain:
                "İlaç gelmiş, ama bekletme süresi sınırlı: \"Wir legen es bis Freitag zurück; danach geben wir es an andere Kundinnen ab\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-26",
              no: 26,
              ref: "m4",
              text: "Worum geht es?",
              options: [
                "Eine Pflicht für alle Beschäftigten.",
                "Eine Aktion in der Arbeitszeit.",
                "Eine Änderung der Pausenregelung.",
              ],
              answer: 1,
              explain:
                "Katılım gönüllü ama zamanı belirli: \"Die Teilnahme erfolgt während der Arbeitszeit und wird nicht angerechnet\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-27",
              no: 27,
              ref: "m5",
              text: "Worum geht es?",
              options: [
                "Acht Stunden bleiben der Maßstab.",
                "Kurzer Schlaf ist unbedenklich.",
                "Regelmäßigkeit zählt mehr als Dauer.",
              ],
              answer: 2,
              explain:
                "Kural sorgulanıyor ve yerine ölçüt konuyor: \"Entscheidend ist … weniger die Dauer als die Regelmäßigkeit\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-28",
              no: 28,
              ref: "m6",
              text: "Worum geht es?",
              options: [
                "Ein Weg fällt vorübergehend weg.",
                "Der Westflügel wird gesperrt.",
                "Die Anmeldung zieht um.",
              ],
              answer: 0,
              explain:
                "\"Der mittlere Aufzug ist bis voraussichtlich Freitag außer Betrieb\" — batı kanadındaki asansör alternatif olarak gösteriliyor, kapatılan değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-29",
              no: 29,
              ref: "m7",
              text: "Worum geht es?",
              options: [
                "Der Antrag wurde abgelehnt.",
                "Bewilligt wurde etwas anderes als beantragt.",
                "Es fehlen noch Unterlagen.",
              ],
              answer: 1,
              explain:
                "Başvuru kabul edilmiş ama biçim değişmiş: \"bewilligt, allerdings für eine ambulante und nicht für eine stationäre Maßnahme\".",
            },
            {
              kind: "mcq",
              id: "de-b2-07-h4-30",
              no: 30,
              ref: "m8",
              text: "Worum geht es?",
              options: [
                "Eine Warnung mit einer konkreten Bitte.",
                "Eine Ankündigung neuer Messstellen.",
                "Ein Aufruf, zu Hause zu bleiben.",
              ],
              answer: 0,
              explain:
                "Uyarının yanına somut bir rica konuyor: \"einmal täglich nachzufragen\" — çünkü tehlike sıcağın kendisinden çok az su içmekten geliyor.",
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
          id: "de-b2-07-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer gesund lebt, sollte weniger in die Krankenkasse einzahlen.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Sağlıklı yaşayan sağlık sigortasına daha az ödemeli.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz klingt gerecht und setzt doch voraus, was erst zu beweisen wäre: dass Gesundheit im Wesentlichen eine Entscheidung ist.

Zunächst ist der Anteil des eigenen Verhaltens kleiner, als die Formulierung nahelegt. Wer im Schichtdienst arbeitet, schläft unregelmäßig; wer an einer lauten Straße wohnt, hat messbar häufiger Bluthochdruck. Das ist keine Frage der Disziplin, sondern der Lebenslage.

Zweitens wäre der Nachweis selbst das Problem. Wer weniger zahlen will, muss belegen, wie er lebt — und damit entsteht eine Erfassung, die weit über die Beiträge hinausreicht.

Nun ließe sich einwenden, dass Anreize durchaus wirken und dass niemand gezwungen wird mitzumachen. Das stimmt in beiden Punkten. Nur trifft ein freiwilliges Programm regelmäßig genau diejenigen, die ohnehin vorsorgen, während der Beitrag aller anderen still weiter steigt.

Deshalb halte ich den Vorschlag für falsch adressiert. Sinnvoller wäre, die Bedingungen zu verbessern, unter denen gesundes Verhalten überhaupt möglich ist.

Mit freundlichen Grüßen
Lena Kolbe`,
            criteria: [
              "İddiaya açıkça atıf yapıldı mı ve tartışma o cümle üzerinden mi yürüyor?",
              "En az iki bağımsız gerekçe var mı (aynı gerekçenin iki hâli değil)?",
              "Karşı görüş gerçekten güçlü hâliyle mi alındı, yoksa kolay bir hâliyle mi?",
              "Sonuç gerekçelerden çıkıyor mu, yoksa yalnız tekrar mı?",
              "Yaklaşık 150 kelime var mı; okur mektubu biçimi (hitap, veda) korunmuş mu?",
              "Bağlaç ve edilgen yapılar B2 düzeyinde kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-b2-07-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Krankenkasse hat einen Zuschuss abgelehnt, den eine Mitarbeiterin Ihnen am Telefon zugesagt hatte. Schreiben Sie an die Kasse (circa 100 Wörter).",
          promptTr:
            "Sağlık sigortan, telefonda bir çalışanın söz verdiği katkıyı reddetti. Sigortaya yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Schildern Sie den Sachverhalt sachlich.", tr: "Durumu nesnel biçimde anlat." },
              { de: "Beziehen Sie sich auf die telefonische Zusage.", tr: "Telefondaki söze atıf yap." },
              { de: "Nennen Sie, was Sie erwarten.", tr: "Ne beklediğini söyle." },
              { de: "Setzen Sie eine Frist und bleiben Sie höflich.", tr: "Bir süre belirt ve nazik kal." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 4. Februar habe ich mit Ihrer Beratung telefoniert und die Auskunft erhalten, der Zuschuss zum Kurs sei bewilligt; die Rechnung solle ich nachreichen. Auf dieser Grundlage habe ich den Kurs gebucht und bezahlt.

Mit Ihrem Schreiben vom 12. März wird die Erstattung nun abgelehnt, weil kein schriftlicher Antrag vorliege. Auf diese Voraussetzung bin ich am Telefon nicht hingewiesen worden.

Ich bitte Sie daher, den Vorgang erneut zu prüfen und mir mitzuteilen, welche Unterlagen Sie für eine nachträgliche Bearbeitung benötigen. Den Zahlungsbeleg lege ich diesem Schreiben bereits bei.

Über eine Antwort bis zum 5. April würde ich mich freuen.

Mit freundlichen Grüßen
Lena Kolbe`,
            criteria: [
              "Olay tarih ve sırayla anlatıldı mı?",
              "Telefondaki söze somut atıf var mı (ne zaman, ne söylendi)?",
              "Beklenen şey açık ve uygulanabilir mi?",
              "Ton şikâyet ederken bile nazik kaldı mı?",
              "Süre verildi mi ve yaklaşık 100 kelime mi?",
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
          id: "de-b2-07-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Vorsorge: Aufgabe des Einzelnen oder der Gesellschaft?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"Koruyucu sağlık: bireyin mi toplumun mu görevi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
          // 180 sn hazırlık + 240 sn konuşma = 420 sn. Süre açıkça yazılmazsa
          // bölümün iş yükü paylaşımı bu göreve 386 sn veriyor ve aday kesiliyor.
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
              "Ich möchte heute darüber sprechen, wer für Vorsorge zuständig ist. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In der Türkei sind Vorsorgeuntersuchungen formal für alle zugänglich, aber die Wege sind lang. Meine Mutter hat für eine Untersuchung, die zwanzig Minuten dauert, einen ganzen Tag gebraucht. Verzichtet haben viele Nachbarinnen nicht aus Gleichgültigkeit, sondern wegen dieses Tages. Für die individuelle Seite spricht, dass niemand einem anderen das Rauchen abgewöhnen kann. Verhalten ändert sich dort, wo Menschen selbst entscheiden. Für die gesellschaftliche Seite spricht die Größenordnung: Wenn eine Untersuchung einen Arbeitstag kostet, entscheidet nicht der Wille, sondern der Arbeitsvertrag. Meine Position ist deshalb keine Entweder-oder-Antwort. Der Einzelne entscheidet, aber die Gesellschaft bestimmt, wie teuer diese Entscheidung ist. Wer Vorsorge will, muss sie zuerst billig machen — in Zeit, nicht nur in Geld. Zusammenfassend: Verantwortung ohne Bedingungen ist eine leere Forderung.",
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
          id: "de-b2-07-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Ein Betrieb hat 20.000 Euro für die Gesundheit der Belegschaft. Zur Wahl stehen: ein Fitnesszuschuss, eine Beratung für Schichtarbeitende, höhenverstellbare Tische, ein jährlicher Gesundheitstag. Einigen Sie sich auf eine Verwendung.",
          promptTr:
            "Birlikte bir karar verin. Bir işletmenin çalışan sağlığı için 20.000 avrosu var. Seçenekler: spor salonu katkısı, vardiyalı çalışanlara danışmanlık, yüksekliği ayarlanabilir masalar, yıllık sağlık günü. Bir kullanım üzerinde anlaşın.",
          // `taskSeconds` açık süreyi ancak bölümün TÜM görevlerinde varsa
          // kullanıyor; bu yüzden p1 ile birlikte burada da yazılı. 7 + 8 = 15.
          minutes: 8,
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Ich fange an: Ich bin für den Fitnesszuschuss. Er kommt allen zugute und ist einfach zu verwalten. Was meinen Sie?",
              tr: "Ben başlayayım: Spor katkısından yanayım. Herkese açık ve yönetmesi kolay. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve 'herkese açık' gerekçesini de ele al.",
              expect: "bir seçeneği gerekçelendirmek ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Einwand: Die Beratung für Schichtarbeitende betrifft nur ein Viertel der Belegschaft. Ist das nicht zu wenig für die Hälfte des Geldes?",
              tr: "Bir itiraz: Vardiyalılara danışmanlık ancak çalışanların dörtte birini ilgilendiriyor. Paranın yarısı için bu az değil mi?",
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
              "Ich würde die Beratung für Schichtarbeitende vorziehen. Der Fitnesszuschuss kommt formal allen zugute, tatsächlich aber vor allem denen, die ohnehin Sport treiben — genau darin liegt seine Schwäche. Zum Einwand mit dem Viertel: Das ist richtig, aber diese Gruppe hat die meisten Ausfalltage, und dort ist pro eingesetztem Euro am meisten zu erreichen. Ich schlage deshalb eine Aufteilung vor: zwölftausend für die Beratung, achttausend für den Gesundheitstag, weil dieser Tag die Beratung überhaupt erst bekannt macht. Streichen würde ich die Tische — sie sind teuer pro Person und helfen nur einer Abteilung. Den Fitnesszuschuss lasse ich weg, weil er den kleinsten zusätzlichen Effekt hat. Zusammengefasst: Zwei Maßnahmen statt vier, Schwerpunkt auf der Schichtberatung, ergänzt um einen Gesundheitstag, der sie sichtbar macht.",
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
