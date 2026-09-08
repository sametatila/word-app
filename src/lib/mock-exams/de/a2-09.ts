import type { MockPaper } from "../types";

/**
 * A2 · Deneme 9 — "Kinder und Schule".
 *
 * PLAN kâğıt 1–8 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 ana fikir · 5 ayrıntı · 5 ayrıntı · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 üç şıklı · 5 eşleştirme · 5 üç şıklı · 5 R/F söyleşi)
 *   Schreiben 30 dk           özel ileti (~40) + yarı resmî ileti (~40)
 *   Sprechen  15 dk           soru sorma · anlatma · birlikte planlama
 *
 * KONU SEÇİMİ: çocuklar ve okul. A2 öğrencisinin en çok yazılı iş çevirdiği
 * ama ilk sekiz kâğıdın hiç girmediği alan: veli mektubu, hastalık bildirimi,
 * gezi izni, öğretmenle randevu. Hepsi kısa metin, hepsi somut sonuç doğuruyor.
 *
 * DİKKAT EDİLEN: metinlerin hiçbiri eğitim sistemi hakkında görüş bildirmiyor.
 * A2'de ölçülen şey tutum değil, bir duyurudan doğru bilgiyi çekmek — hangi
 * gün, kim imzalayacak, ne kadar para, kime söylenecek.
 */
export const A2_09: MockPaper = {
  id: "de-a2-09",
  course: "de",
  level: "A2",
  no: 9,
  theme: "Kinder und Schule",
  themeTr: "Çocuklar ve okul",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen kurze Nachrichten, zwei längere Texte und Anzeigen. Wählen Sie jeweils die richtige Lösung.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa iletiler, iki uzun metin ve ilanlar okuyacaksın. Her seferinde doğru cevabı işaretle.",
      tasks: [
        {
          id: "de-a2-09-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die fünf Texte. Worum geht es? Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Beş metni oku. Konu ne? a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Elternbrief",
              genreTr: "Veli mektubu",
              body: `Liebe Eltern,

am Donnerstag fährt die Klasse 3b ins Museum. Wir fahren mit dem Bus und sind um 15 Uhr zurück.

Die Kinder brauchen ein Getränk und ein Brot. Geld ist nicht nötig, der Eintritt ist frei.

Bitte unterschreiben Sie den Zettel bis Dienstag.`,
              gloss: [
                { de: "der Eintritt", tr: "giriş ücreti", en: "admission" },
                { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Nachricht an die Lehrerin",
              genreTr: "Öğretmene ileti",
              body: `Sehr geehrte Frau Wendland,

mein Sohn Emre war gestern krank und konnte nicht kommen.

Er hat Fieber gehabt und musste beim Arzt sein. Heute geht es ihm besser.

Können Sie mir bitte sagen, was die Klasse gemacht hat?`,
              gloss: [{ de: "das Fieber", tr: "ateş", en: "fever" }],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Aushang in der Schule",
              genreTr: "Okuldaki duyuru",
              body: `Die Betreuung am Nachmittag beginnt ab Januar erst um 13.30 Uhr.

Der Grund ist, dass eine Kollegin in Rente geht und wir noch niemanden gefunden haben.

Kinder, die früher abgeholt werden müssen, melden sich bitte im Sekretariat.`,
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `An den Grundschulen der Stadt fehlen dieses Jahr vierzig Lehrkräfte.

Weil die Klassen trotzdem unterrichtet werden müssen, arbeiten viele Lehrerinnen mehr Stunden als geplant.

Die Stadt sucht deshalb auch Menschen, die keinen Abschluss als Lehrerin haben.`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "Nachricht in der Elterngruppe",
              genreTr: "Veli grubundaki mesaj",
              body: `Kurze Info: Für das Sommerfest brauchen wir noch Kuchen.

Wer backen kann, schreibt bitte, was er mitbringt, damit wir nicht zehnmal denselben Kuchen haben.

Wer nicht backen möchte, kann auch beim Aufbau helfen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-09-l1-1",
              no: 1,
              ref: "t1",
              text: "Was sollen die Eltern tun?",
              options: [
                "Geld für den Eintritt mitgeben.",
                "Die Kinder selbst zum Museum bringen.",
                "Den Zettel unterschreiben.",
              ],
              answer: 2,
              explain:
                "Mektubun tek isteği son cümlede: \"Bitte unterschreiben Sie den Zettel bis Dienstag\". Para gerekmiyor, çünkü \"der Eintritt ist frei\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l1-2",
              no: 2,
              ref: "t2",
              text: "Warum schreibt die Mutter?",
              options: [
                "Sie möchte wissen, was im Unterricht war.",
                "Sie meldet ihren Sohn für morgen ab.",
                "Sie beschwert sich über die Lehrerin.",
              ],
              answer: 0,
              explain:
                "Hastalık bir açıklama, asıl soru sonda: \"Können Sie mir bitte sagen, was die Klasse gemacht hat?\" Çocuk bugün iyileşmiş.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l1-3",
              no: 3,
              ref: "t3",
              text: "Was ändert sich ab Januar?",
              options: [
                "Die Betreuung fällt ganz weg.",
                "Die Betreuung fängt später an.",
                "Die Betreuung kostet mehr.",
              ],
              answer: 1,
              explain:
                "Duyuru saati değiştiriyor: \"beginnt ab Januar erst um 13.30 Uhr\". Bakım kalkmıyor, geç başlıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l1-4",
              no: 4,
              ref: "t4",
              text: "Was ist die Hauptaussage?",
              options: [
                "Es gibt zu viele Lehrkräfte in der Stadt.",
                "Die Klassen werden dieses Jahr kleiner.",
                "Wegen fehlender Lehrkräfte arbeiten viele mehr.",
              ],
              answer: 2,
              explain:
                "Metin sebep ve sonucu birleştiriyor: kırk öğretmen eksik ve \"weil die Klassen trotzdem unterrichtet werden müssen, arbeiten viele Lehrerinnen mehr Stunden\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l1-5",
              no: 5,
              ref: "t5",
              text: "Was soll man schreiben?",
              options: [
                "Wie viele Gäste man mitbringt.",
                "Wann man zum Fest kommt.",
                "Was man backen wird.",
              ],
              answer: 2,
              explain:
                "Gerekçesiyle isteniyor: \"schreibt bitte, was er mitbringt, damit wir nicht zehnmal denselben Kuchen haben\".",
            },
          ],
        },
        {
          id: "de-a2-09-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 6 bis 10. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Metni ve 6–10. maddeleri oku. a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Die Klasse, die den Bus selbst plant",
              body: `An der Grundschule in Bergrode gibt es seit zwei Jahren einen Laufbus.

Das ist kein Bus mit Motor. Eine erwachsene Person geht zu Fuß und sammelt auf dem Weg Kinder ein, wie eine Buslinie mit festen Haltestellen.

"Am Anfang haben nur vier Familien mitgemacht", sagt Meral Pazarci, die den Plan schreibt. Heute laufen jeden Morgen achtzehn Kinder mit.

Der Weg dauert zwanzig Minuten. Das ist länger als mit dem Auto, aber die Eltern sparen sich das Fahren.

Wichtig ist der Plan: Jede Woche geht eine andere Familie mit. Wer nicht kann, sagt bis Sonntag Bescheid.

Einfach war es nicht. Im ersten Winter sind viele Familien wieder ausgestiegen, weil es morgens dunkel war.

Deshalb bekommen alle Kinder jetzt eine gelbe Weste. Seitdem bleiben auch im Winter fast alle dabei.

Die Schule freut sich, denn vor dem Tor stehen morgens weniger Autos. Das war früher gefährlich.`,
              gloss: [
                { de: "die Haltestelle", tr: "durak", en: "stop" },
                { de: "aussteigen", tr: "(gruptan) ayrılmak", en: "to drop out" },
                { de: "die Weste", tr: "yelek", en: "vest" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-09-l2-6",
              no: 6,
              ref: "r1",
              text: "Was ist ein Laufbus?",
              options: [
                "Ein kleiner Bus für die Schule.",
                "Eine Gruppe, die zu Fuß geht.",
                "Ein Taxi für mehrere Kinder.",
              ],
              answer: 1,
              explain:
                "Metin bunu açıkça söylüyor: \"Das ist kein Bus mit Motor. Eine erwachsene Person geht zu Fuß und sammelt auf dem Weg Kinder ein.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l2-7",
              no: 7,
              ref: "r1",
              text: "Wie viele Kinder machen heute mit?",
              options: ["Vier wie am Anfang.", "Zwanzig, wie die Minuten.", "Achtzehn."],
              answer: 2,
              explain:
                "Üç sayı geçiyor: başlangıçta dört aile, bugün \"achtzehn Kinder\", yirmi ise yürüyüş süresi.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l2-8",
              no: 8,
              ref: "r1",
              text: "Was müssen die Familien tun?",
              options: [
                "Jede Woche begleitet eine Familie.",
                "Jeden Tag müssen zwei Erwachsene mitgehen.",
                "Einmal im Monat den Plan neu schreiben.",
              ],
              answer: 0,
              explain:
                "Düzen metinde: \"Jede Woche geht eine andere Familie mit. Wer nicht kann, sagt bis Sonntag Bescheid.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l2-9",
              no: 9,
              ref: "r1",
              text: "Warum sind im ersten Winter Familien ausgestiegen?",
              options: [
                "Weil der Weg zwanzig Minuten dauert.",
                "Wegen der Dunkelheit am Morgen.",
                "Weil die Westen gefehlt haben.",
              ],
              answer: 1,
              explain:
                "Gerekçe `weil` ile veriliyor: \"weil es morgens dunkel war\". Çözüm de sarı yelek olmuş.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l2-10",
              no: 10,
              ref: "r1",
              text: "Warum freut sich die Schule?",
              options: [
                "Weil die Kinder deutlich schneller ankommen.",
                "Weil die Eltern mehr Zeit haben.",
                "Weil der Verkehr abnimmt.",
              ],
              answer: 2,
              explain:
                "Son cümle sebebi ve tehlikeyi birlikte veriyor: \"vor dem Tor stehen morgens weniger Autos. Das war früher gefährlich.\"",
            },
          ],
        },
        {
          id: "de-a2-09-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Blogtext und die Aufgaben 11 bis 15. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Blog metnini ve 11–15. maddeleri oku. a, b ya da c şıklarından doğru olanı seç.",
          texts: [
            {
              kind: "text",
              id: "r2",
              genre: "Blogtext",
              genreTr: "Blog yazısı",
              title: "Ein Jahr Elternvertreterin",
              body: `Im September habe ich Ja gesagt, ohne genau zu wissen, was auf mich zukommt.

Ich dachte, ich muss zweimal im Jahr auf einem Elternabend sitzen. Das war falsch.

In Wirklichkeit kamen die meisten Fragen per Nachricht, oft abends. Eine Mutter hat mich einmal um halb elf angerufen.

Am schwersten waren nicht die großen Themen, sondern die kleinen. Wer bringt den Kuchen? Wer holt die Getränke?

Geholfen hat mir eine einfache Regel: Ich antworte nur zwischen acht und zwanzig Uhr. Am Anfang war mir das unangenehm, aber niemand hat sich beschwert.

Gelernt habe ich noch etwas: Wenn ich eine Aufgabe genau beschreibe, meldet sich jemand. Wenn ich nur "Wer hilft?" schreibe, meldet sich niemand.

Im Juni habe ich noch einmal Ja gesagt. Diesmal weiß ich, worauf ich mich einlasse.`,
              gloss: [
                { de: "der Elternabend", tr: "veli toplantısı", en: "parents' evening" },
                { de: "sich beschweren", tr: "şikâyet etmek", en: "to complain" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-09-l3-11",
              no: 11,
              ref: "r2",
              text: "Was hat die Autorin am Anfang gedacht?",
              options: [
                "Dass die Aufgabe wenig Zeit kostet.",
                "Dass sie viel telefonieren muss.",
                "Dass niemand sie fragen wird.",
              ],
              answer: 0,
              explain:
                "Beklentisi küçüktü: \"Ich dachte, ich muss zweimal im Jahr auf einem Elternabend sitzen. Das war falsch.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l3-12",
              no: 12,
              ref: "r2",
              text: "Wie kamen die meisten Fragen?",
              options: ["Per Nachricht.", "Auf dem Elternabend.", "In der Schule."],
              answer: 0,
              explain:
                "\"In Wirklichkeit kamen die meisten Fragen per Nachricht, oft abends\" — hatta bir kez gece yarısına yakın telefon gelmiş.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l3-13",
              no: 13,
              ref: "r2",
              text: "Was war für sie am schwersten?",
              options: [
                "Die großen Themen der Schule.",
                "Die vielen kleinen Fragen.",
                "Die Arbeit mit der Lehrerin.",
              ],
              answer: 1,
              explain:
                "Metin ikisini karşılaştırıyor: \"Am schwersten waren nicht die großen Themen, sondern die kleinen\" — pasta, içecek gibi.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l3-14",
              no: 14,
              ref: "r2",
              text: "Welche Regel hat ihr geholfen?",
              options: [
                "Sie antwortet nur zu bestimmten Zeiten.",
                "Sie antwortet nur schriftlich.",
                "Sie antwortet nur einmal in der Woche.",
              ],
              answer: 0,
              explain:
                "Kural saatle sınırlı: \"Ich antworte nur zwischen acht und zwanzig Uhr\". Kimse şikâyet etmemiş.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-l3-15",
              no: 15,
              ref: "r2",
              text: "Was hat sie über Aufgaben gelernt?",
              options: [
                "Man soll möglichst wenig fragen.",
                "Eltern helfen nur im Sommer.",
                "Genaue Aufgaben finden Helfer.",
              ],
              answer: 2,
              explain:
                "İki durum karşılaştırılıyor: görev tam tarif edilince biri çıkıyor, yalnız \"Wer hilft?\" yazılınca kimse çıkmıyor.",
            },
          ],
        },
        {
          id: "de-a2-09-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen ein Angebot für ihr Kind. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler çocukları için bir hizmet arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Hausaufgabenhilfe",
              body: "Montag bis Donnerstag 14 bis 16 Uhr in der Bücherei. Für Klasse 1 bis 4, ohne Anmeldung, kostenlos.",
            },
            {
              key: "b",
              label: "Ferienbetreuung im August",
              body: "Zwei Wochen, täglich 8 bis 16 Uhr. Für Kinder von 6 bis 12 Jahren, mit Mittagessen. 90 Euro pro Woche.",
            },
            {
              key: "c",
              label: "Schwimmen lernen",
              body: "Samstagvormittag im Hallenbad, zehn Termine. Für Kinder ab fünf Jahren, die noch nicht schwimmen können.",
            },
            {
              key: "d",
              label: "Musikschule — Schnupperstunde",
              body: "Einmal ausprobieren, ohne Vertrag. Gitarre, Klavier oder Flöte, ab acht Jahren. Termine nach Absprache.",
            },
            {
              key: "e",
              label: "Kinderflohmarkt",
              body: "Sonntag von 10 bis 15 Uhr im Bürgerhaus. Verkaufen dürfen nur Kinder, ein Tisch kostet 3 Euro.",
            },
            {
              key: "f",
              label: "Lesepatin gesucht",
              body: "Wir suchen Erwachsene, die einmal pro Woche mit einem Kind lesen. Vormittags in der Grundschule.",
            },
            {
              key: "g",
              label: "Fußball für Anfänger",
              body: "Dienstag und Freitag 17 Uhr auf dem Platz am Wald. Für Kinder von 7 bis 10, erste vier Wochen frei.",
            },
            {
              key: "h",
              label: "Elternberatung",
              body: "Gespräche zu Schule, Übergang und Zeugnissen. Mittwoch 15 bis 18 Uhr, mit Anmeldung, kostenlos.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-09-l4-16",
              no: 16,
              text: "Frau Brink arbeitet im August und braucht für ihre Tochter (9) eine Betreuung mit Essen.",
              answer: "b",
              explain:
                "(b) hem ayı hem yaşı hem yemeği veriyor: \"Zwei Wochen … Für Kinder von 6 bis 12 Jahren, mit Mittagessen\".",
            },
            {
              kind: "match",
              id: "de-a2-09-l4-17",
              no: 17,
              text: "Herr Baier möchte, dass sein Sohn (6) endlich schwimmen lernt.",
              answer: "c",
              explain:
                "(c) tam bu grup için: \"Für Kinder ab fünf Jahren, die noch nicht schwimmen können\".",
            },
            {
              kind: "match",
              id: "de-a2-09-l4-18",
              no: 18,
              text: "Frau Aydemir hat Fragen zum Zeugnis ihrer Tochter und möchte mit jemandem sprechen.",
              answer: "h",
              explain:
                "(h) konuyu adıyla sayıyor: \"Gespräche zu Schule, Übergang und Zeugnissen\", randevuyla ve ücretsiz.",
            },
            {
              kind: "match",
              id: "de-a2-09-l4-19",
              no: 19,
              text: "Herr Stein sucht für seinen Sohn (8) Hilfe bei den Aufgaben, kann aber nichts bezahlen.",
              answer: "a",
              explain:
                "(a) hem sınıf aralığını hem ücreti karşılıyor: \"Für Klasse 1 bis 4, ohne Anmeldung, kostenlos\".",
            },
            {
              kind: "match",
              id: "de-a2-09-l4-20",
              no: 20,
              text: "Frau Kuhn möchte, dass ihre Tochter (9) ein Instrument ausprobiert, ohne sich gleich zu binden.",
              answer: "d",
              explain:
                "(d) tam bunu sunuyor: \"Einmal ausprobieren, ohne Vertrag\" — üç enstrüman arasından seçilebiliyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Gespräche, ein längeres Gespräch, Ansagen und ein Interview.",
      instructionTr:
        "Bu bölümde dört görev var. Konuşmalar, uzun bir konuşma, anonslar ve bir söyleşi dinleyeceksin.",
      tasks: [
        {
          id: "de-a2-09-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Telefongespräch mit dem Sekretariat",
              genreTr: "Okul sekreterliğiyle telefon",
              situation: "Bir anne çocuğunu hasta bildiriyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Brink", text: "Meine Tochter kann heute nicht kommen, sie hat Fieber." },
                { speaker: "Sekretärin", text: "Danke für den Anruf. Schicken Sie bitte am ersten Tag danach eine schriftliche Entschuldigung mit." },
                { speaker: "Frau Brink", text: "Brauche ich ein Attest vom Arzt?" },
                { speaker: "Sekretärin", text: "Erst ab dem vierten Tag." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch am Schultor",
              genreTr: "Okul kapısında konuşma",
              situation: "İki veli geziyi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Stein", text: "Kostet der Ausflug etwas?" },
                { speaker: "Frau Kuhn", text: "Der Eintritt ist frei, aber der Bus kostet vier Euro pro Kind." },
                { speaker: "Herr Stein", text: "Und wann sind sie zurück?" },
                { speaker: "Frau Kuhn", text: "Um drei." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch mit der Lehrerin",
              genreTr: "Öğretmenle konuşma",
              situation: "Bir baba randevu istiyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Baier", text: "Hätten Sie diese Woche kurz Zeit für ein Gespräch?" },
                { speaker: "Frau Wendland", text: "Am Mittwoch nach der fünften Stunde, also ab halb eins." },
                { speaker: "Herr Baier", text: "Da arbeite ich noch. Geht es auch später?" },
                { speaker: "Frau Wendland", text: "Dann bleibt nur Freitag um sechzehn Uhr." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch in der Betreuung",
              genreTr: "Bakım biriminde konuşma",
              situation: "Bir anne çocuğunu erken alacağını söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Aydemir", text: "Ich hole meinen Sohn heute schon um zwei ab." },
                { speaker: "Betreuerin", text: "Gut. Dann sagen Sie ihm bitte selbst Bescheid, damit er nicht zum Essen geht." },
                { speaker: "Frau Aydemir", text: "Mache ich." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir veli yüzme kursunu soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Pazarci", text: "Sind im Schwimmkurs noch Plätze frei?" },
                { speaker: "Mitarbeiterin", text: "Im Samstagskurs nicht mehr. Wir machen aber einen zweiten Kurs am Sonntag auf." },
                { speaker: "Herr Pazarci", text: "Dann nehmen wir den." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-09-h1-1",
              no: 1,
              ref: "a1",
              text: "Ab wann braucht das Kind ein Attest?",
              options: ["Schon ab dem ersten Tag.", "Ab dem vierten Tag.", "Gar nicht."],
              answer: 1,
              explain:
                "İki gün geçiyor ve karışması kolay: yazılı mazeret ilk günde, doktor raporu \"erst ab dem vierten Tag\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h1-2",
              no: 2,
              ref: "a2",
              text: "Was kostet der Ausflug?",
              options: ["Überhaupt nichts.", "Drei Euro Eintritt für jedes Kind.", "Vier Euro für den Bus."],
              answer: 2,
              explain:
                "Giriş ücretsiz ama otobüs değil: \"der Bus kostet vier Euro pro Kind\". Üç, dönüş saati.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h1-3",
              no: 3,
              ref: "a3",
              text: "Wann treffen sich die beiden?",
              options: ["Am Mittwoch gleich nach der Stunde.", "Am Freitag um sechzehn Uhr.", "Erst nächste Woche."],
              answer: 1,
              explain:
                "İlk öneri çalışma saatine denk geliyor, o yüzden ikinci geçerli: \"Dann bleibt nur Freitag um sechzehn Uhr\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h1-4",
              no: 4,
              ref: "a4",
              text: "Was soll die Mutter tun?",
              options: [
                "Dem Sohn selbst Bescheid sagen.",
                "Eine Nachricht an die Schule schreiben.",
                "Das Essen vorher bezahlen.",
              ],
              answer: 0,
              explain:
                "Görevli gerekçesiyle rica ediyor: \"sagen Sie ihm bitte selbst Bescheid, damit er nicht zum Essen geht\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h1-5",
              no: 5,
              ref: "a5",
              text: "Welchen Kurs nimmt Herr Pazarci?",
              options: ["Den vollen Samstagskurs.", "Gar keinen Kurs.", "Den Sonntagskurs."],
              answer: 2,
              explain:
                "Cumartesi dolu, yeni kurs pazar açılıyor ve baba \"Dann nehmen wir den\" diyor.",
            },
          ],
        },
        {
          id: "de-a2-09-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Eltern sagen, was sie beim Sommerfest übernehmen. Wer macht was? Ordnen Sie zu. Drei Aufgaben bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş veli yaz şenliğinde neyi üstlendiğini söylüyor. Kim ne yapıyor? Eşleştir. Üç görev artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch im Elternbeirat",
              genreTr: "Veli kurulunda konuşma",
              situation: "Şenlik için görevler paylaşılıyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Kuhn", text: "Wir müssen die Aufgaben verteilen. Frau Brink, was können Sie übernehmen?" },
                { speaker: "Frau Brink", text: "Backen kann ich nicht, ich arbeite bis Samstagmittag. Aber ich kann beim Aufbau helfen." },
                { speaker: "Frau Kuhn", text: "Gut. Herr Stein?" },
                { speaker: "Herr Stein", text: "Ich bringe die Getränke mit, ich habe einen Anhänger am Auto." },
                { speaker: "Frau Kuhn", text: "Und Sie, Frau Aydemir?" },
                { speaker: "Frau Aydemir", text: "Ich backe zwei Kuchen. Für die Getränke habe ich kein Auto." },
                { speaker: "Frau Kuhn", text: "Herr Baier, wären Sie an der Kasse?" },
                { speaker: "Herr Baier", text: "Lieber nicht mit Geld. Ich mache die Spiele für die Kinder." },
                { speaker: "Frau Kuhn", text: "Dann nehme ich die Kasse selbst." },
              ],
            },
          ],
          options: [
            { key: "a", label: "beim Aufbau helfen" },
            { key: "b", label: "Getränke mitbringen" },
            { key: "c", label: "Kuchen backen" },
            { key: "d", label: "Spiele für Kinder machen" },
            { key: "e", label: "an der Kasse sitzen" },
            { key: "f", label: "Musik organisieren" },
            { key: "g", label: "Tische ausleihen" },
            { key: "h", label: "Fotos machen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-09-h2-6",
              no: 6,
              ref: "g1",
              text: "Frau Brink",
              answer: "a",
              explain:
                "Pasta yapamayacağını söyleyip başka bir iş üstleniyor: \"Aber ich kann beim Aufbau helfen\".",
            },
            {
              kind: "match",
              id: "de-a2-09-h2-7",
              no: 7,
              ref: "g1",
              text: "Herr Stein",
              answer: "b",
              explain:
                "Gerekçesiyle üstleniyor: \"Ich bringe die Getränke mit, ich habe einen Anhänger am Auto\".",
            },
            {
              kind: "match",
              id: "de-a2-09-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Aydemir",
              answer: "c",
              explain:
                "\"Ich backe zwei Kuchen\" — arabası olmadığı için içecekleri alamıyor.",
            },
            {
              kind: "match",
              id: "de-a2-09-h2-9",
              no: 9,
              ref: "g1",
              text: "Herr Baier",
              answer: "d",
              explain:
                "Kasayı reddedip başka bir iş seçiyor: \"Lieber nicht mit Geld. Ich mache die Spiele für die Kinder.\"",
            },
            {
              kind: "match",
              id: "de-a2-09-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Kuhn",
              answer: "e",
              explain:
                "Kimse istemeyince kendisi alıyor: \"Dann nehme ich die Kasse selbst\".",
            },
          ],
        },
        {
          id: "de-a2-09-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage in der Schule",
              genreTr: "Okulda anons",
              situation: "Ders programı değişikliği.",
              plays: 2,
              segments: [
                {
                  text: "Eine Information für die Klassen 3 und 4: Der Sportunterricht am Donnerstag fällt aus, weil die Halle repariert wird. Ihr habt stattdessen Deutsch.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kurs yeri değişti.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist die Musikschule. Der Unterricht Ihrer Tochter ist ab nächster Woche in Raum vier, nicht mehr in Raum sieben. Die Zeit bleibt gleich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Ansage beim Elternabend",
              genreTr: "Veli toplantısında duyuru",
              situation: "Toplantı başlıyor.",
              plays: 2,
              segments: [
                {
                  text: "Bevor wir anfangen: Wir brauchen heute noch zwei Elternvertreter. Wenn sich niemand meldet, müssen wir in vier Wochen noch einmal zusammenkommen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Gezi için eksik belge.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Frau Brink, hier ist die Schule. Für den Ausflug am Donnerstag fehlt uns noch Ihre Unterschrift. Ohne den Zettel darf Ihre Tochter leider nicht mitfahren.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Durchsage in der Betreuung",
              genreTr: "Bakım biriminde anons",
              situation: "Yağmur yüzünden plan değişti.",
              plays: 2,
              segments: [
                {
                  text: "Weil es heute stark regnet, bleiben wir drinnen. Der Ausflug auf den Spielplatz wird auf Freitag verschoben. Bitte gebt euren Eltern Bescheid.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-09-h3-11",
              no: 11,
              ref: "m1",
              text: "Was haben die Klassen am Donnerstag?",
              options: ["Sport.", "Frei.", "Deutsch."],
              answer: 2,
              explain:
                "Spor iptal ve yerine ders konuyor: \"Ihr habt stattdessen Deutsch\". Boş saat yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h3-12",
              no: 12,
              ref: "m2",
              text: "Was ändert sich?",
              options: ["Der Raum.", "Die Uhrzeit.", "Der Tag."],
              answer: 0,
              explain:
                "Mesaj ikisini ayırıyor: oda dörde geçiyor ama \"Die Zeit bleibt gleich\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h3-13",
              no: 13,
              ref: "m3",
              text: "Was passiert, wenn sich niemand meldet?",
              options: [
                "Der Elternabend fällt aus.",
                "Es gibt einen zweiten Termin.",
                "Die Schule sucht selbst jemanden.",
              ],
              answer: 1,
              explain:
                "Sonuç koşula bağlanıyor: \"Wenn sich niemand meldet, müssen wir in vier Wochen noch einmal zusammenkommen\".",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h3-14",
              no: 14,
              ref: "m4",
              text: "Was fehlt der Schule?",
              options: ["Das Geld für den Bus.", "Eine Entschuldigung.", "Die Unterschrift."],
              answer: 2,
              explain:
                "Eksik tek şey adıyla söyleniyor: \"fehlt uns noch Ihre Unterschrift\", yoksa çocuk geziye katılamıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-09-h3-15",
              no: 15,
              ref: "m5",
              text: "Wann gehen die Kinder auf den Spielplatz?",
              options: ["Am Freitag.", "Heute.", "Gar nicht mehr."],
              answer: 0,
              explain:
                "Gezi iptal değil erteleniyor: \"Der Ausflug auf den Spielplatz wird auf Freitag verschoben\".",
            },
          ],
        },
        {
          id: "de-a2-09-h4",
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
              situation: "Bir ilkokul müdürü okul yolunu anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Wendland, immer mehr Kinder werden mit dem Auto gebracht. Ist das ein Problem?" },
                {
                  speaker: "Frau Wendland",
                  text: "Ja, aber nicht so, wie viele denken. Das Problem ist nicht das einzelne Auto. Das Problem sind vierzig Autos in zehn Minuten vor demselben Tor.",
                },
                { speaker: "Moderatorin", text: "Warum bringen die Eltern ihre Kinder denn?" },
                {
                  speaker: "Frau Wendland",
                  text: "Meistens nicht aus Bequemlichkeit. Sie haben Angst vor dem Verkehr. Und weil viele fahren, wird es gefährlicher — also fahren noch mehr.",
                },
                { speaker: "Moderatorin", text: "Hilft es, wenn die Schule das verbietet?" },
                {
                  speaker: "Frau Wendland",
                  text: "Verbote helfen wenig. Was bei uns geholfen hat, ist ein Platz zum Aussteigen, zweihundert Meter vor der Schule.",
                },
                { speaker: "Moderatorin", text: "Und der Laufbus?" },
                {
                  speaker: "Frau Wendland",
                  text: "Der ist gut, aber er braucht Erwachsene mit Zeit. Wir haben zwei Jahre gebraucht, bis genug Familien mitgemacht haben.",
                },
                { speaker: "Moderatorin", text: "Was raten Sie anderen Schulen?" },
                {
                  speaker: "Frau Wendland",
                  text: "Klein anfangen. Eine Straße, eine Klasse. Wer alles auf einmal ändern will, hat nach einem Monat nichts.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-09-h4-16",
              no: 16,
              ref: "i1",
              text: "Frau Wendland findet das einzelne Auto das größte Problem.",
              answer: false,
              explain:
                "Tam bunu düzeltiyor: \"Das Problem ist nicht das einzelne Auto. Das Problem sind vierzig Autos in zehn Minuten.\"",
            },
            {
              kind: "bool",
              id: "de-a2-09-h4-17",
              no: 17,
              ref: "i1",
              text: "Nach ihr fahren die Eltern meistens aus Angst.",
              answer: true,
              explain:
                "Rahatlık açıklamasını eliyor: \"Meistens nicht aus Bequemlichkeit. Sie haben Angst vor dem Verkehr.\"",
            },
            {
              kind: "bool",
              id: "de-a2-09-h4-18",
              no: 18,
              ref: "i1",
              text: "Sie hält Verbote für die beste Lösung.",
              answer: false,
              explain:
                "\"Verbote helfen wenig\" diyor; işe yarayan şey okuldan iki yüz metre önceki iniş yeri olmuş.",
            },
            {
              kind: "bool",
              id: "de-a2-09-h4-19",
              no: 19,
              ref: "i1",
              text: "Der Laufbus hat sofort funktioniert.",
              answer: false,
              explain:
                "Süreyi kendisi veriyor: \"Wir haben zwei Jahre gebraucht, bis genug Familien mitgemacht haben\".",
            },
            {
              kind: "bool",
              id: "de-a2-09-h4-20",
              no: 20,
              ref: "i1",
              text: "Sie rät anderen Schulen, mit einem kleinen Schritt anzufangen.",
              answer: true,
              explain:
                "Öğüdü açık: \"Klein anfangen. Eine Straße, eine Klasse.\" — her şeyi birden değiştirmek isteyen bir ay sonra elinde bir şey bulamıyor.",
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
          id: "de-a2-09-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Eine andere Mutter, Frau Kuhn, hat Ihr Kind gestern von der Schule abgeholt. Schreiben Sie ihr eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Başka bir veli, Frau Kuhn, dün çocuğunu okuldan almış. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Bedanken Sie sich.", tr: "Teşekkür et." },
              { de: "Sagen Sie, warum Sie nicht kommen konnten.", tr: "Neden gelemediğini söyle." },
              { de: "Bieten Sie etwas an.", tr: "Karşılığında bir şey öner." },
            ],
            sample: `Liebe Frau Kuhn,

vielen Dank, dass Sie Lina gestern mitgenommen haben. Das hat mir sehr geholfen.

Mein Bus hatte Verspätung, und ich habe es nicht rechtzeitig zur Schule geschafft.

Wenn Sie einmal später kommen, hole ich Ihren Sohn gern mit ab. Sagen Sie einfach Bescheid.

Herzliche Grüße
Sara Brink`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Başka bir veliye yazıldığı için `Sie` kullanıldı mı? Ton nazik ama sıcak mı?",
              "Gelememe sebebi somut mu (gecikme, iş), yoksa genel bir cümle mi?",
              "Sunulan karşılık gerçek ve uygulanabilir mi?",
              "Yaklaşık 40 kelime var mı ve hitap ile veda var mı?",
            ],
          },
        },
        {
          id: "de-a2-09-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Ihr Kind kann am Ausflug am Donnerstag nicht teilnehmen. Schreiben Sie an die Klassenlehrerin (circa 40 Wörter).",
          promptTr:
            "Çocuğun perşembe günkü geziye katılamıyor. Sınıf öğretmenine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Sagen Sie, um welchen Ausflug es geht.", tr: "Hangi geziden söz ettiğini söyle." },
              { de: "Nennen Sie den Grund.", tr: "Sebebini söyle." },
              { de: "Fragen Sie, was Ihr Kind stattdessen macht.", tr: "Çocuğunun onun yerine ne yapacağını sor." },
            ],
            sample: `Sehr geehrte Frau Wendland,

meine Tochter Lina kann am Donnerstag leider nicht mit ins Museum fahren.

Sie hat an diesem Tag einen Termin beim Zahnarzt, den wir seit drei Monaten haben.

Können Sie mir bitte sagen, ob sie an dem Tag in die Schule kommen soll?

Mit freundlichen Grüßen
Sara Brink`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı?",
              "Gezi tarih ya da yerle belirtildi mi, yoksa yalnız `der Ausflug` mu denildi?",
              "Sebep somut mu ve tarihi neden değiştirilemediği anlaşılıyor mu?",
              "Soru gerçekten soru biçiminde mi ve yaklaşık 40 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: Fragen stellen, erzählen und gemeinsam planen.",
      instructionTr: "Bu bölümde üç görev var: soru sorma, anlatma ve birlikte planlama.",
      tasks: [
        {
          id: "de-a2-09-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Schule. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Schulweg — Hausaufgaben — Lehrerin — Ausflug — Ferien.",
          promptTr:
            "Konu: Okul. Her anahtar sözcük için bir soru sor ve kendin de cevapla: okul yolu — ödev — öğretmen — gezi — tatil.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Schule. Ihr erstes Stichwort ist: Schulweg. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi okul konusunu konuşuyoruz. İlk sözcüğün: okul yolu. Bana bir soru sor.",
            },
            { who: "you", hint: "«Schulweg» sözcüğüyle bir soru kur.", expect: "Schulweg sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Mein Sohn geht zu Fuß, das dauert zehn Minuten. Ihr nächstes Stichwort ist: Hausaufgaben.",
              tr: "Oğlum yürüyerek gidiyor, on dakika sürüyor. Sıradaki sözcüğün: ödev.",
            },
            { who: "you", hint: "«Hausaufgaben» için bir soru kur.", expect: "Hausaufgaben sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Bei uns dauern die Hausaufgaben etwa eine halbe Stunde. Und jetzt eine Frage an Sie: Helfen Sie Ihrem Kind dabei?",
              tr: "Bizde ödev yarım saat sürüyor. Şimdi sana bir soru: Çocuğuna yardım eder misin?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısaca gerekçelendir.", expect: "`weil` ile gerekçelendirilmiş tam bir cevap vermek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was machen Ihre Kinder in den Ferien?",
              tr: "Teşekkürler. Son soru: Çocukların tatilde ne yapıyor?",
            },
            { who: "you", hint: "Bir etkinlik söyle ve nedenini ekle.", expect: "somut bir etkinlik söylemek ve kısaca gerekçelendirmek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Wie lang ist euer Schulweg? — Fünfzehn Minuten. Wie lange dauern die Hausaufgaben? — Eine Stunde. Hilfst du dabei? — Ja, weil mein Sohn erst in der zweiten Klasse ist. Wann ist der nächste Ausflug? — Im Mai. Was macht ihr in den Ferien? — Wir fahren zu meiner Mutter.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Süre ve zaman ifadeleri kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-a2-09-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie: Wie war die Schule in Ihrem Herkunftsland, und was ist hier anders? Sprechen Sie etwa zwei Minuten.",
          promptTr:
            "Anlat: Kendi ülkende okul nasıldı ve burada ne farklı? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "die eigene Schulzeit beschreiben", tr: "Kendi okul zamanını anlatmak" },
              { de: "einen Unterschied nennen", tr: "Bir farkı söylemek" },
              { de: "sagen, was einem besser gefällt", tr: "Neyi daha çok sevdiğini söylemek" },
            ],
            sample:
              "Bei uns hat die Schule um acht angefangen und um zwei aufgehört. Wir waren vierzig Kinder in einer Klasse. Die Lehrerin hat vorne gesprochen, und wir haben zugehört. Hier ist das anders: Die Klassen sind kleiner, und die Kinder arbeiten oft in Gruppen. Am Anfang habe ich gedacht, das ist zu laut. Heute finde ich es besser, weil mein Sohn mehr fragt. Was ich vermisse, ist das gemeinsame Mittagessen.",
            criteria: [
              "Kendi okul zamanı somut anlatıldı mı (saat, sınıf mevcudu, ders biçimi)?",
              "Fark gerçekten karşılaştırma biçiminde mi verildi?",
              "Kendi tercihi söylendi ve gerekçelendirildi mi?",
              "Geçmiş zaman kullanılabildi mi? (hat angefangen, waren, habe gedacht)",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-09-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Die Klasse Ihres Kindes macht einen Ausflug. Sprechen Sie über: Wohin? — Wie hinkommen? — Wer begleitet? — Was kostet es?",
          promptTr:
            "Birlikte plan yap. Çocuğunun sınıfı bir gezi yapacak. Şunları konuş: Nereye? — Nasıl gidilecek? — Kim eşlik edecek? — Ne kadar tutacak?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Ausflug. Zuerst das Ziel: Der Zoo ist teuer, das Museum ist frei. Was schlagen Sie vor?",
              tr: "Geziyi birlikte planlıyoruz. Önce yer: Hayvanat bahçesi pahalı, müze ücretsiz. Ne önerirsin?",
            },
            { who: "you", hint: "Bir yer öner ve fiyat itirazını hesaba kat.", expect: "somut bir yer önermek ve maliyet itirazını dikkate almak", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und wie kommen wir hin? Mit dem Bus wird es teuer, zu Fuß ist es weit.",
              tr: "Peki. Oraya nasıl gideceğiz? Otobüsle pahalı, yürüyerek uzak.",
            },
            { who: "you", hint: "Bir ulaşım çözümü öner ve nedenini söyle.", expect: "bir ulaşım çözümü önermek ve gerekçelendirmek", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Wir brauchen zwei Erwachsene. Ich kann leider nicht, ich arbeite an dem Tag.",
              tr: "Anlaştık. İki yetişkin gerekiyor. Ben olamam, o gün çalışıyorum.",
            },
            { who: "you", hint: "Bir çözüm öner ve gerekirse kendin üstlen.", expect: "eşlik sorununu çözmek ve gerekirse bir işi üstlenmek", seconds: 35 },
            {
              who: "partner",
              de: "Und das Geld? Manche Familien können nicht viel bezahlen.",
              tr: "Peki para? Bazı aileler fazla ödeyemiyor.",
            },
            { who: "you", hint: "Kimsenin dışarıda kalmayacağı bir düzen öner.", expect: "kimseyi dışarıda bırakmayan bir ödeme düzeni önermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneri sunmak" },
              { de: "auf Einwände reagieren", tr: "İtirazlara karşılık vermek" },
              { de: "eine Aufgabe übernehmen", tr: "Bir işi üstlenmek" },
            ],
            sample:
              "Ich schlage das Museum vor, weil der Eintritt frei ist. Dann bleibt Geld für den Bus. Zu Fuß ist es mit kleinen Kindern zu weit, aber wir können die Straßenbahn nehmen, das kostet nur die Hälfte. Ich kann als zweite Begleitung mitkommen, ich habe an dem Tag frei. Beim Geld machen wir es so: Wer mehr geben kann, gibt einen Euro extra in eine Kasse. Dann muss niemand sagen, dass er nicht zahlen kann.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu (yer, araç, tutar)?",
              "Her itiraz (fiyat, mesafe, çalışan veli, ödeyemeyen aile) gerçekten karşılandı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Öneri kalıpları kullanıldı mı? (Ich schlage vor …, Wir können …)",
            ],
          },
        },
      ],
    },
  ],
};
