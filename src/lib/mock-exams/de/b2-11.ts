import type { MockPaper } from "../types";

/**
 * B2 · Deneme 11 — "Weggehen und Bleiben".
 *
 * PLAN kâğıt 1–10 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme · 6 köşe yazısı
 *                              · 6 görüş eşleştirme · 3 yönetmelik)
 *   Hören  40 dk · 30 madde   (10 karma · 6 söyleşi · 6 tartışma · 8 ana fikir)
 *   Schreiben 75 dk           okur mektubu (~150) + yarı resmî ileti (~100)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: taşradan gitmek ve geri dönmek. B2'nin ölçtüğü akıl yürütme
 * burada şu ayrımda: bir kararın gerekçesi ile o kararı mümkün kılan koşul
 * aynı şey değil. Kimse "tren yok" diye gitmiyor, ama tren olsaydı bazıları
 * kalabilirdi.
 *
 * ŞIK UZUNLUKLARI ve anahtar dağılımı görev görev planlandı. Kural metni
 * görevinde sorular bilerek koşul üzerinden soruldu; b1-12'de aynı görevde
 * süre üzerinden sorulan maddeler metinden birebir kopya çekmeye izin
 * veriyordu.
 */
export const B2_11: MockPaper = {
  id: "de-b2-11",
  course: "de",
  level: "B2",
  no: 11,
  theme: "Weggehen und Bleiben",
  themeTr: "Gitmek ve kalmak",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Texte, einen Sachtext mit Lücken, einen Kommentar, Meinungsbeiträge und eine Richtlinie.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel metinler, boşluklu bir bilgi metni, bir köşe yazısı, görüş yazıları ve bir yönerge okuyacaksın.",
      tasks: [
        {
          id: "de-b2-11-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über das Weggehen und das Bleiben. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi gitmek ve kalmak üzerine yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Hövelmann, Bürgermeisterin",
              body: `Ich werde oft gefragt, wie wir junge Leute halten. Die Frage ist falsch gestellt.

Niemand bleibt, weil eine Gemeinde ihn halten will. Man bleibt, wenn das Leben, das man führen möchte, hier möglich ist. Alles andere ist Werbung.

Wir haben acht Jahre lang Broschüren gedruckt und Feste veranstaltet. Zugezogen ist danach fast niemand. Dann haben wir eine Kinderbetreuung ab sieben Uhr eingerichtet, und plötzlich kamen vier Familien.

Das ist keine schöne Erkenntnis für jemanden in meinem Amt. Sie bedeutet, dass Zuzug nicht an Begeisterung hängt, sondern an Öffnungszeiten.`,
              gloss: [
                { de: "der Zuzug", tr: "yerleşim, göç alma", en: "influx, moving in" },
                { de: "die Begeisterung", tr: "coşku", en: "enthusiasm" },
                { de: "einrichten", tr: "kurmak", en: "to set up" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Zeplin, mit 19 gegangen, mit 41 zurück",
              body: `Ich bin gegangen, weil ich weg wollte, und ich bin zurückgekommen, weil meine Mutter krank wurde. Beides klingt banaler, als es war.

Zurückgekommen bin ich nicht wegen des Dorfes. Ich hatte nach vier Wochen keinen Menschen, mit dem ich über etwas anderes als Wetter reden konnte.

Geblieben bin ich trotzdem, und der Grund ist unromantisch: Ich habe hier ein Haus geerbt und in der Stadt fünf Jahre lang keine Wohnung gefunden.

Wenn mich jemand fragt, ob ich glücklich bin, sage ich: Ich bin nicht unglücklich. Das ist etwas anderes, und es reicht mir.`,
              gloss: [
                { de: "erben", tr: "miras almak", en: "to inherit" },
                { de: "banal", tr: "sıradan", en: "banal" },
                { de: "unromantisch", tr: "romantik olmayan", en: "unromantic" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Kruschwitz, Hausärztin",
              body: `Ich bin nie weggegangen, und ich möchte einem Missverständnis widersprechen: Das war keine Treue, das war eine Rechnung.

Als Ärztin bekomme ich hier eine Praxis, für die ich in Hamburg fünfzehn Jahre gewartet hätte. Ich hatte mit dreißig, was Kolleginnen mit fünfundvierzig haben.

Der Preis steht auf der anderen Seite. Ich bin die einzige Hausärztin für zwei Dörfer, und wenn ich Urlaub mache, fährt jemand vierzig Kilometer.

Ich rate jungen Kolleginnen trotzdem zu, aber ich sage ihnen dazu, was sie aufgeben: nicht die Stadt, sondern die Möglichkeit, ersetzbar zu sein.`,
              gloss: [
                { de: "die Treue", tr: "bağlılık", en: "loyalty" },
                { de: "widersprechen", tr: "itiraz etmek", en: "to contradict" },
                { de: "ersetzbar", tr: "yeri doldurulabilir", en: "replaceable" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Aydemir, Lehrer und Pendler",
              body: `Ich wohne im Dorf und arbeite in der Stadt. Achtzig Kilometer, jeden Tag, seit neun Jahren.

Gefragt werde ich immer nach der Zeit. Die stört mich weniger als erwartet; ich lese im Zug. Was mich stört, ist etwas anderes: Ich gehöre an beiden Orten nur halb dazu.

Im Dorf bin ich der, der abends nicht da ist. In der Schule bin ich der, der um sechzehn Uhr weg muss. Beides ist berechtigt, und beides summiert sich.

Ich rechne nicht damit, dass sich das löst. Ich rechne damit, dass ich es noch zehn Jahre mache und dann sehe.`,
              gloss: [
                { de: "der Pendler", tr: "günlük gidip gelen kişi", en: "commuter" },
                { de: "dazugehören", tr: "ait olmak", en: "to belong" },
                { de: "sich summieren", tr: "birikmek", en: "to add up" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-11-l1-1",
              no: 1,
              text: "Wer widerspricht einer Deutung des eigenen Verhaltens?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 2,
              explain:
                "\"Das war keine Treue, das war eine Rechnung\" — kalmasının sadakat olarak okunmasına itiraz ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-2",
              no: 2,
              text: "Wer nennt eine Erkenntnis, die dem eigenen Amt nicht schmeichelt?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 0,
              explain:
                "\"Das ist keine schöne Erkenntnis für jemanden in meinem Amt\" — yerleşim coşkuya değil açılış saatlerine bağlıymış.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-3",
              no: 3,
              text: "Wer beschreibt eine doppelte Halbzugehörigkeit?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 3,
              explain:
                "\"Ich gehöre an beiden Orten nur halb dazu\" — köyde akşam olmayan, okulda on altıda çıkan kişi.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-4",
              no: 4,
              text: "Wer nennt einen Grund fürs Bleiben, der mit dem Ort nichts zu tun hat?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 1,
              explain:
                "Gerekçe konut piyasası: miras kalan bir ev ve şehirde \"fünf Jahre lang keine Wohnung gefunden\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-5",
              no: 5,
              text: "Wer beziffert den Vorteil des Bleibens mit Jahren?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 2,
              explain:
                "\"Ich hatte mit dreißig, was Kolleginnen mit fünfundvierzig haben\" — Hamburg'da on beş yıl beklerdi.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-6",
              no: 6,
              text: "Wer sagt, dass ihn das Erwartete weniger stört als das Unerwartete?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 3,
              explain:
                "Süre beklendiği kadar rahatsız etmiyor — \"Die stört mich weniger als erwartet\" — asıl sorun aidiyet.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-7",
              no: 7,
              text: "Wer nennt eine Maßnahme, die nach jahrelanger Erfolglosigkeit gewirkt hat?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 0,
              explain:
                "Sekiz yıl broşür ve şenlik işe yaramamış; \"eine Kinderbetreuung ab sieben Uhr\" dört aile getirmiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-8",
              no: 8,
              text: "Wer unterscheidet zwischen zwei Zuständen, die oft verwechselt werden?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 1,
              explain:
                "\"Ich bin nicht unglücklich. Das ist etwas anderes, und es reicht mir.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l1-9",
              no: 9,
              text: "Wer nennt einen Verlust, den man beim Bleiben in Kauf nimmt?",
              options: ["Frau Hövelmann", "Herr Zeplin", "Frau Kruschwitz", "Herr Aydemir"],
              answer: 2,
              explain:
                "Vazgeçilen şey şehir değil: \"die Möglichkeit, ersetzbar zu sein\" — tatile çıkınca hasta kırk kilometre gidiyor.",
            },
          ],
        },
        {
          id: "de-b2-11-l2",
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
              title: "Warum Rückkehr selten geplant ist",
              body: `In der Debatte über schrumpfende Regionen taucht ein Wort auffällig oft auf: Rückkehr. Gemeint ist, dass Weggezogene irgendwann zurückkommen. {{10}}

Untersucht man die Fälle, zeigt sich ein anderes Muster. Zurückkommen ist fast nie das Ergebnis einer Abwägung, sondern die Folge eines Ereignisses. {{11}}

Daraus folgt etwas Unbequemes für die Werbung. Wer zurückkommt, hat die Entscheidung meistens schon getroffen, bevor er die Broschüre sieht. {{12}}

Bemerkenswert ist der zweite Schritt. Fast alle Befragten haben in den ersten Monaten überlegt, wieder zu gehen. {{13}}

Was diesen zweiten Schritt trägt, ist ebenfalls selten emotional. Es sind Arbeit, Wohnung und Betreuung — in dieser Reihenfolge. {{14}}

Für die Kommunen folgt daraus keine Resignation, aber eine Verschiebung. Statt Menschen zur Rückkehr zu bewegen, ließe sich der zweite Schritt absichern. {{15}}

Was bleibt, ist eine unscheinbare Einsicht: Über das Bleiben entscheidet nicht, warum jemand gekommen ist, sondern was ihn im dritten Jahr noch hält.`,
              gloss: [
                { de: "schrumpfen", tr: "küçülmek", en: "to shrink" },
                { de: "die Abwägung", tr: "tartma, değerlendirme", en: "deliberation" },
                { de: "die Resignation", tr: "boyun eğme", en: "resignation" },
                { de: "unscheinbar", tr: "gösterişsiz", en: "unremarkable" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Das klingt nach einem Plan, den jemand fasst und dann umsetzt.",
            },
            {
              key: "b",
              label: "b",
              body: "Eine Krankheit in der Familie, eine Trennung, ein Erbe — selten ein Entschluss.",
            },
            {
              key: "c",
              label: "c",
              body: "Geblieben sind die, bei denen sich in dieser Zeit etwas Konkretes ergeben hat.",
            },
            {
              key: "d",
              label: "d",
              body: "Wer das umdreht, wirbt um Menschen, die ohnehin schon unterwegs sind.",
            },
            {
              key: "e",
              label: "e",
              body: "Gefühle für den Ort stehen bei den Befragten erst an vierter Stelle.",
            },
            {
              key: "f",
              label: "f",
              body: "Das ist billiger als jede Kampagne und wirkt nachweislich länger.",
            },
            { key: "g", label: "g", body: "Die Zahl der Fortzüge ist im letzten Jahrzehnt bundesweit gesunken." },
            { key: "h", label: "h", body: "Über die Vergabe entscheidet in der Regel der Kreistag." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-11-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "a",
              explain:
                "Paragraf \"Rückkehr\" sözcüğünü tanıtıyor; (a) bu sözcüğün çağrıştırdığı şeyi adlandırıyor: \"nach einem Plan, den jemand fasst und dann umsetzt\" — ve sonraki paragraf tam bunu çürütüyor.",
            },
            {
              kind: "match",
              id: "de-b2-11-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "b",
              explain:
                "İddia veriliyor: dönüş \"die Folge eines Ereignisses\". (b) bu olayları sayıyor: \"Eine Krankheit in der Familie, eine Trennung, ein Erbe — selten ein Entschluss.\"",
            },
            {
              kind: "match",
              id: "de-b2-11-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "d",
              explain:
                "Karar broşürden önce verilmiş oluyor; (d) tanıtımın buradaki hatasını söylüyor: \"wirbt um Menschen, die ohnehin schon unterwegs sind\".",
            },
            {
              kind: "match",
              id: "de-b2-11-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "c",
              explain:
                "Neredeyse herkes yeniden gitmeyi düşünmüş; (c) kimlerin kaldığını söylüyor: \"bei denen sich in dieser Zeit etwas Konkretes ergeben hat\".",
            },
            {
              kind: "match",
              id: "de-b2-11-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "e",
              explain:
                "Sıra veriliyor — \"Arbeit, Wohnung und Betreuung\" — ve (e) bu sıranın dışında kalanı ekliyor: duygular ancak dördüncü sırada.",
            },
            {
              kind: "match",
              id: "de-b2-11-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "f",
              explain:
                "Öneri ikinci adımı güvenceye almak; (f) bunun maliyetini ve etkisini veriyor: \"billiger als jede Kampagne und wirkt nachweislich länger\".",
            },
          ],
        },
        {
          id: "de-b2-11-l3",
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
              title: "Der Bahnhof, der nichts löst",
              body: `Seit einem halben Jahr wird bei uns über die Reaktivierung der Bahnstrecke gestritten. Elf Kilometer Gleis, zwei Haltepunkte, geschätzte achtzehn Millionen Euro.

Ich bin dafür. Ich halte es aber für nötig zu sagen, was die Strecke nicht leistet, weil sie sonst an einer Erwartung scheitert, die sie nie erfüllen konnte.

Sie wird die Abwanderung nicht stoppen. Wer mit neunzehn weggeht, geht nicht wegen der Verbindung, sondern weil er weg will. Das war vor der Streckenstilllegung nicht anders.

Man wird einwenden, das sei eine Behauptung. Der Einwand trifft nur zur Hälfte: Wir haben die Vergleichsfälle. In zwei Nachbarkreisen wurden Strecken reaktiviert, und die Zahl der Fortzüge in der Altersgruppe unter fünfundzwanzig hat sich nicht bewegt.

Bewegt hat sich etwas anderes, und deshalb bin ich dafür. Die Zahl der Pendler ist gestiegen — also der Menschen, die bleiben konnten, weil die Arbeit erreichbar wurde. Das ist eine kleinere Wirkung, aber es ist die echte.

Mich stört an der Debatte deshalb weniger die Kritik als das Versprechen. Wer achtzehn Millionen mit der Rettung des Ortes begründet, liefert seinen Gegnern in fünf Jahren die Zahlen für das Gegenteil.

Mein Vorschlag ist unbescheiden nur in einem Punkt: Wir sollten vorher aufschreiben, was wir erwarten. Nicht als Broschüre, sondern als Zahl mit Datum.`,
              gloss: [
                { de: "die Reaktivierung", tr: "yeniden işletmeye alma", en: "reactivation" },
                { de: "die Abwanderung", tr: "göç, ayrılma", en: "outmigration" },
                { de: "die Stilllegung", tr: "işletmeyi durdurma", en: "closure, shutdown" },
                { de: "unbescheiden", tr: "iddialı", en: "immodest" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-11-l3-16",
              no: 16,
              ref: "k1",
              text: "Welche Position vertritt der Autor?",
              options: [
                "Er lehnt das Vorhaben ab.",
                "Er befürwortet es mit Einschränkung.",
                "Er hält eine Entscheidung für verfrüht.",
              ],
              answer: 1,
              explain:
                "İki cümle yan yana duruyor: \"Ich bin dafür. Ich halte es aber für nötig zu sagen, was die Strecke nicht leistet.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l3-17",
              no: 17,
              ref: "k1",
              text: "Warum geht nach ihm ein Neunzehnjähriger weg?",
              options: [
                "Weil die Verbindung fehlt.",
                "Weil die Mieten steigen.",
                "Weil er weggehen will.",
              ],
              answer: 2,
              explain:
                "\"Wer mit neunzehn weggeht, geht nicht wegen der Verbindung, sondern weil er weg will.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l3-18",
              no: 18,
              ref: "k1",
              text: "Wie belegt er diese Behauptung?",
              options: [
                "Mit Vergleichsfällen aus Nachbarkreisen.",
                "Mit einer Umfrage unter Schülern.",
                "Mit den Zahlen vor der Stilllegung.",
              ],
              answer: 0,
              explain:
                "İki komşu ilçede hat yeniden açılmış ve yirmi beş yaş altındaki taşınmalar \"hat sich nicht bewegt\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l3-19",
              no: 19,
              ref: "k1",
              text: "Welche Wirkung hält er für belegt?",
              options: [
                "Mehr Zuzug von Familien.",
                "Weniger Fortzüge bei Jugendlichen.",
                "Mehr Menschen, die pendeln können.",
              ],
              answer: 2,
              explain:
                "\"Die Zahl der Pendler ist gestiegen — also der Menschen, die bleiben konnten, weil die Arbeit erreichbar wurde.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l3-20",
              no: 20,
              ref: "k1",
              text: "Was stört ihn an der Debatte am meisten?",
              options: [
                "Die Kritik der Gegner.",
                "Die Höhe der Kosten.",
                "Das zu große Versprechen.",
              ],
              answer: 2,
              explain:
                "\"Mich stört an der Debatte deshalb weniger die Kritik als das Versprechen\" — abartılı gerekçe beş yıl sonra karşı tarafa veri sağlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l3-21",
              no: 21,
              ref: "k1",
              text: "Was schlägt er vor?",
              options: [
                "Die Erwartung vorher festzuhalten.",
                "Die Strecke deutlich zu verkleinern.",
                "Die achtzehn Millionen neu zu prüfen.",
              ],
              answer: 0,
              explain:
                "Biçimini de söylüyor: \"Nicht als Broschüre, sondern als Zahl mit Datum.\"",
            },
          ],
        },
        {
          id: "de-b2-11-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Gemeinden Geld für Zuzug ausgeben sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, belediyelerin yeni sakin çekmek için para harcayıp harcamaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Steinkamp, Kämmerin",
              body: "Ich rechne die Programme seit zwölf Jahren nach. Prämien für Zugezogene wirken im ersten Jahr und danach nicht mehr. Wer für dasselbe Geld eine Stelle in der Betreuung schafft, hält die Leute länger.",
            },
            {
              key: "b",
              label: "b — Herr Lubowski, Unternehmer",
              body: "Ich bin dafür, aber nicht für Prämien an Personen. Fördert die Betriebe, dann entstehen Stellen, und die Menschen kommen von selbst. Alles andere kauft Einwohner, die beim nächsten Angebot weiterziehen.",
            },
            {
              key: "c",
              label: "c — Frau Neuhoff, Zugezogene",
              body: "Ich habe die Prämie bekommen und sage offen: Sie war nicht der Grund. Wir sind gekommen, weil meine Schwiegermutter hier wohnt. Das Geld war ein netter Zufall, kein Argument.",
            },
            {
              key: "d",
              label: "d — Herr Pilarczyk, Bürgermeister a. D.",
              body: "Ich habe so ein Programm selbst aufgelegt und würde es nicht wiederholen. Nicht weil es nichts gebracht hat, sondern weil die Alteingesessenen es als Ungerechtigkeit empfunden haben. Der Streit hat länger gedauert als der Effekt.",
            },
            {
              key: "e",
              label: "e — Frau Ostrowski, Soziologin",
              body: "Die Wirkung von Zuzugsprämien ist in der Forschung schwach belegt, aber das ist nicht der eigentliche Punkt. Wir messen den Zuzug und nicht das Bleiben. Solange das so ist, sehen alle Programme besser aus, als sie sind.",
            },
            {
              key: "f",
              label: "f — Herr Vandenberg, Makler",
              body: "Das Problem ist kein Geldproblem. Ich habe zwölf Anfragen pro Woche und vier Häuser im Angebot. Man kann niemanden herholen, für den es keine Wohnung gibt.",
            },
            {
              key: "g",
              label: "g — Frau Reuscher, Erzieherin",
              body: "Bei uns hat die Öffnung ab sieben Uhr mehr bewirkt als jede Prämie. Vier Familien sind deswegen gekommen, und keine wegen der Broschüre. Ich sage das ungern so schlicht.",
            },
            {
              key: "h",
              label: "h — Herr Brendel, Rentner",
              body: "Ich verstehe beide Seiten und habe keine feste Meinung. Auffällig finde ich nur, dass über uns geredet wird und selten mit uns.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-11-l4-22",
              no: 22,
              text: "Der Effekt einer Prämie hält nur kurz an; dasselbe Geld wirkt anderswo länger.",
              answer: "a",
              explain:
                "(a) süreyi ve alternatifi birlikte veriyor: prim \"im ersten Jahr und danach nicht mehr\", bakımda bir kadro ise insanları daha uzun tutuyor.",
            },
            {
              kind: "match",
              id: "de-b2-11-l4-23",
              no: 23,
              text: "Man soll die Betriebe fördern statt einzelne Personen.",
              answer: "b",
              explain:
                "(b) ayrımı açıkça kuruyor: \"Fördert die Betriebe, dann entstehen Stellen\" — kişilere ödenen para \"kauft Einwohner\".",
            },
            {
              kind: "match",
              id: "de-b2-11-l4-24",
              no: 24,
              text: "Die eigene Entscheidung hatte mit dem Geld nichts zu tun.",
              answer: "c",
              explain:
                "(c) primi almış olmasına rağmen: \"Das Geld war ein netter Zufall, kein Argument.\"",
            },
            {
              kind: "match",
              id: "de-b2-11-l4-25",
              no: 25,
              text: "Der Streit über die Gerechtigkeit hat mehr gekostet als das Programm gebracht hat.",
              answer: "d",
              explain:
                "(d) programı kendisi başlatmış ve tekrarlamayacağını söylüyor: \"Der Streit hat länger gedauert als der Effekt.\"",
            },
            {
              kind: "match",
              id: "de-b2-11-l4-26",
              no: 26,
              text: "Es wird die falsche Größe gemessen.",
              answer: "e",
              explain:
                "(e) asıl noktayı ayırıyor: \"Wir messen den Zuzug und nicht das Bleiben.\"",
            },
            {
              kind: "match",
              id: "de-b2-11-l4-27",
              no: 27,
              text: "Ohne verfügbaren Wohnraum nützt jede Werbung nichts.",
              answer: "f",
              explain:
                "(f) sayıyla veriyor: haftada on iki talep, dört ev — \"Man kann niemanden herholen, für den es keine Wohnung gibt.\"",
            },
          ],
        },
        {
          id: "de-b2-11-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Förderrichtlinie und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Destek yönergesini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Förderrichtlinie",
              genreTr: "Destek yönergesi",
              title: "Richtlinie zur Wohnraumförderung im ländlichen Raum — Auszug",
              body: `§1 Zweck
Gefördert wird die Sanierung leer stehender Wohngebäude. Neubauten sind ausgeschlossen; maßgeblich ist die Wiedernutzung vorhandener Bausubstanz.

§2 Antragsberechtigung
Antragsberechtigt ist, wer das Gebäude selbst bewohnen wird. Eine Vermietung an Dritte ist unschädlich, sofern mindestens die Hälfte der Wohnfläche selbst genutzt wird.

§3 Höhe und Bindung
Die Förderung beträgt bis zu 30 Prozent der Kosten, höchstens 45.000 Euro. Sie ist an eine Selbstnutzung von zehn Jahren gebunden. Bei früherem Verkauf ist der Betrag anteilig zurückzuzahlen.

§4 Verfahren
Der Antrag ist vor Beginn der Arbeiten zu stellen. Bereits begonnene Maßnahmen sind nicht förderfähig, auch wenn die übrigen Voraussetzungen vorliegen.`,
              gloss: [
                { de: "die Bausubstanz", tr: "mevcut yapı", en: "building fabric" },
                { de: "unschädlich", tr: "engel oluşturmayan", en: "not detrimental" },
                { de: "anteilig", tr: "oransal olarak", en: "proportionally" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-11-l5-28",
              no: 28,
              ref: "o1",
              text: "Unter welcher Bedingung ist eine Vermietung zulässig?",
              options: [
                "Bei Vermietung an höchstens drei Dritte.",
                "Bei einer Wohnfläche unter 120 Quadratmetern.",
                "Bei überwiegender Eigennutzung.",
              ],
              answer: 2,
              explain:
                "§2 kiralamayı yasaklamıyor, koşula bağlıyor: \"sofern mindestens die Hälfte der Wohnfläche selbst genutzt wird\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l5-29",
              no: 29,
              ref: "o1",
              text: "Was gilt bei einem Verkauf vor Ablauf der Bindung?",
              options: [
                "Ein Teil der Summe muss zurück.",
                "Die Förderung bleibt in voller Höhe bestehen.",
                "Der Käufer übernimmt die Verpflichtung.",
              ],
              answer: 0,
              explain:
                "§3 on yıllık bir bağ kuruyor ve erken satışta \"ist der Betrag anteilig zurückzuzahlen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-l5-30",
              no: 30,
              ref: "o1",
              text: "Was schließt eine Förderung trotz erfüllter Voraussetzungen aus?",
              options: [
                "Ein zu niedriger Eigenanteil.",
                "Ein bereits begonnener Umbau.",
                "Eine Wohnfläche über 200 Quadratmeter.",
              ],
              answer: 1,
              explain:
                "§4 bunu ayrıca vurguluyor: başlanmış işler \"nicht förderfähig, auch wenn die übrigen Voraussetzungen vorliegen\".",
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
          id: "de-b2-11-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Durchsage im Rathaus",
              genreTr: "Belediyede anons",
              situation: "Bir başvuru dönemi bildiriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zur Wohnraumförderung: Anträge nehmen wir ab dem ersten März entgegen. Wer vorher mit den Arbeiten beginnt, verliert den Anspruch — auch bei sonst vollständigen Unterlagen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Bir sayı yorumlanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Im Kreis sind im vergangenen Jahr erstmals seit elf Jahren mehr Menschen zugezogen als weggezogen. Der Überschuss beträgt allerdings nur achtundvierzig Personen und geht fast vollständig auf eine Altersgruppe über fünfzig zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir başvuru eksik.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Neuhoff, hier ist das Bauamt. Ihr Antrag liegt vor, es fehlt aber der Nachweis über die Eigennutzung. Ohne ihn können wir nicht entscheiden. Zwei Wochen haben Sie noch.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Sitzung",
              genreTr: "Oturumda duyuru",
              situation: "Bir karar erteleniyor.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir zur Bahnstrecke kommen: Die Kostenschätzung von achtzehn Millionen stammt aus dem Jahr 2023. Ich schlage vor, dass wir eine aktuelle Zahl anfordern und heute nur den Grundsatz beschließen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir kreş yeri açıldı.",
              plays: 1,
              segments: [
                {
                  text: "Hallo Herr Aydemir, hier ist die Kita Sonnenweg. Ab September haben wir einen Platz ab sieben Uhr frei, wie Sie ihn gesucht haben. Sagen Sie uns bis Freitag Bescheid; danach geht er an die nächste Familie.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-11-h1-1",
              no: 1,
              ref: "h1",
              text: "Ein früher Beginn kostet den Anspruch auf Förderung.",
              answer: true,
              explain:
                "Anons bunu koşulsuz söylüyor: \"Wer vorher mit den Arbeiten beginnt, verliert den Anspruch — auch bei sonst vollständigen Unterlagen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h1-2",
              no: 2,
              ref: "h1",
              text: "Ab wann werden Anträge angenommen?",
              options: ["Ab dem 1. März.", "Erst ab dem 1. Mai des Jahres.", "Sofort."],
              answer: 0,
              explain:
                "Tarih anonsta bir kez geçiyor: \"Anträge nehmen wir ab dem ersten März entgegen.\" Mayıs ve hemen başlama seçenekleri hiç söylenmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-11-h1-3",
              no: 3,
              ref: "h2",
              text: "Der Zuwachs verteilt sich gleichmäßig auf alle Altersgruppen.",
              answer: false,
              explain:
                "Haber tersini söylüyor: fazlalık \"fast vollständig auf eine Altersgruppe über fünfzig\" dayanıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h1-4",
              no: 4,
              ref: "h2",
              text: "Wie groß ist der Überschuss?",
              options: ["Elf Personen.", "Etwas mehr als fünfzig Personen.", "Achtundvierzig Personen."],
              answer: 2,
              explain:
                "Kayıtta iki sayı var: \"erstmals seit elf Jahren\" süreyi, \"Der Überschuss beträgt allerdings nur achtundvierzig Personen\" ise farkı gösteriyor.",
            },
            {
              kind: "bool",
              id: "de-b2-11-h1-5",
              no: 5,
              ref: "h3",
              text: "Der Antrag ist noch nicht eingegangen.",
              answer: false,
              explain:
                "Mesaj bunu ayırıyor: \"Ihr Antrag liegt vor, es fehlt aber der Nachweis über die Eigennutzung.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h1-6",
              no: 6,
              ref: "h3",
              text: "Was fehlt noch?",
              options: [
                "Die Unterschrift der Gemeindeverwaltung.",
                "Der Nachweis der Eigennutzung.",
                "Die Kostenaufstellung.",
              ],
              answer: 1,
              explain:
                "Eksik olan tek belge adlandırılıyor ve karar buna bağlı: \"Ohne ihn können wir nicht entscheiden.\"",
            },
            {
              kind: "bool",
              id: "de-b2-11-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Kostenschätzung stammt aus einem früheren Jahr.",
              answer: true,
              explain:
                "Rakamın yaşı veriliyor: \"Die Kostenschätzung von achtzehn Millionen stammt aus dem Jahr 2023\" — bu yüzden güncel bir sayı isteniyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h1-8",
              no: 8,
              ref: "h4",
              text: "Was soll heute beschlossen werden?",
              options: [
                "Die vollständige Finanzierung.",
                "Eine Verschiebung um ein Jahr.",
                "Nur der Grundsatz.",
              ],
              answer: 2,
              explain:
                "Öneri iki adımlı: güncel rakam istenecek ve bugün \"nur den Grundsatz beschließen\".",
            },
            {
              kind: "bool",
              id: "de-b2-11-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Platz bleibt unbegrenzt reserviert.",
              answer: false,
              explain:
                "Süre ve sonucu birlikte veriliyor: cumaya kadar haber verilmezse \"geht er an die nächste Familie\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h1-10",
              no: 10,
              ref: "h5",
              text: "Was ist an dem Platz besonders?",
              options: [
                "Er ist beitragsfrei.",
                "Er liegt im Nachbarort Weidenbach.",
                "Er beginnt schon um sieben.",
              ],
              answer: 2,
              explain:
                "Kayıt bunu aranan özellik olarak veriyor: \"einen Platz ab sieben Uhr frei, wie Sie ihn gesucht haben\".",
            },
          ],
        },
        {
          id: "de-b2-11-h2",
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
              situation: "Bir belediye başkanı anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Hövelmann, was hat bei Ihnen tatsächlich gewirkt?" },
                {
                  speaker: "Frau Hövelmann",
                  text: "Eine Kinderbetreuung ab sieben Uhr. Danach sind vier Familien gekommen. In den acht Jahren davor hatten wir Broschüren und Feste, und es kam fast niemand.",
                },
                { speaker: "Moderator", text: "Das klingt nach einer teuren Lehre." },
                {
                  speaker: "Frau Hövelmann",
                  text: "Sie war vor allem eine unangenehme. Ich habe lange geglaubt, es gehe um das Bild, das wir von uns zeichnen. Es ging um Öffnungszeiten.",
                },
                { speaker: "Moderator", text: "Würden Sie Prämien für Zuzug abschaffen?" },
                {
                  speaker: "Frau Hövelmann",
                  text: "Ich habe sie nie eingeführt, aber ich verurteile sie nicht. Sie wirken kurz, und kurz ist manchmal genug, wenn eine Familie sonst gar nicht erst hinschaut.",
                },
                { speaker: "Moderator", text: "Was ist der häufigste Fehler von Gemeinden?" },
                {
                  speaker: "Frau Hövelmann",
                  text: "Wir messen den Zuzug. Über Erfolg entscheidet aber, wer im dritten Jahr noch da ist. Diese Zahl erhebt bei uns niemand, und ich schließe mich ein.",
                },
                { speaker: "Moderator", text: "Was würden Sie ändern, wenn Sie könnten?" },
                {
                  speaker: "Frau Hövelmann",
                  text: "Ich würde die Förderung an das dritte Jahr binden statt an den Einzug. Das wäre unbequem für uns, weil der Erfolg dann später sichtbar wird — und Wahlen kommen früher.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-11-h2-11",
              no: 11,
              ref: "i1",
              text: "Was hat in ihrer Gemeinde gewirkt?",
              options: [
                "Eine Werbekampagne.",
                "Die frühe Kinderbetreuung.",
                "Eine Prämie für Zugezogene.",
              ],
              answer: 1,
              explain:
                "Sekiz yıllık broşür ve şenlik dönemiyle karşılaştırıyor: \"Eine Kinderbetreuung ab sieben Uhr. Danach sind vier Familien gekommen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h2-12",
              no: 12,
              ref: "i1",
              text: "Wie beschreibt sie diese Erfahrung?",
              options: [
                "Vor allem als unangenehm.",
                "Vor allem als teuer.",
                "Vor allem als überraschend erfreulich.",
              ],
              answer: 0,
              explain:
                "Sunucunun \"teuer\" nitelemesini düzeltiyor: \"Sie war vor allem eine unangenehme.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h2-13",
              no: 13,
              ref: "i1",
              text: "Wie steht sie zu Zuzugsprämien?",
              options: [
                "Sie hält sie für schädlich.",
                "Sie hat sie selbst eingeführt.",
                "Sie lehnt sie nicht grundsätzlich ab.",
              ],
              answer: 2,
              explain:
                "\"Ich habe sie nie eingeführt, aber ich verurteile sie nicht\" — kısa etkinin bazen yettiğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h2-14",
              no: 14,
              ref: "i1",
              text: "Welchen Fehler nennt sie bei Gemeinden?",
              options: [
                "Sie messen den Zuzug statt das Bleiben.",
                "Sie geben zu wenig für Werbung aus.",
                "Sie fragen die Zugezogenen nicht.",
              ],
              answer: 0,
              explain:
                "Ölçüt farkını adlandırıyor: başarıyı \"wer im dritten Jahr noch da ist\" belirliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h2-15",
              no: 15,
              ref: "i1",
              text: "Wie verhält sie sich zu diesem Vorwurf?",
              options: [
                "Sie richtet ihn an andere.",
                "Sie bezieht sich selbst ein.",
                "Sie hält ihn für übertrieben.",
              ],
              answer: 1,
              explain:
                "\"Diese Zahl erhebt bei uns niemand, und ich schließe mich ein.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h2-16",
              no: 16,
              ref: "i1",
              text: "Warum wäre ihre eigene Idee unbequem?",
              options: [
                "Sie wäre deutlich teurer.",
                "Sie ließe sich rechtlich schwer umsetzen.",
                "Der Erfolg käme nach der Wahl.",
              ],
              answer: 2,
              explain:
                "Desteği üçüncü yıla bağlamak başarıyı geciktiriyor: \"und Wahlen kommen früher\".",
            },
          ],
        },
        {
          id: "de-b2-11-h3",
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
              situation: "Bahsedilen demiryolu hattı tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Steinkamp, achtzehn Millionen für elf Kilometer — lohnt sich das?" },
                {
                  speaker: "Frau Steinkamp",
                  text: "Das hängt davon ab, was man verspricht. Als Rettung des Ortes lohnt es sich nicht. Als Erreichbarkeit von Arbeitsplätzen rechnet es sich nach unserer Schätzung in etwa achtzehn Jahren.",
                },
                { speaker: "Moderatorin", text: "Herr Lubowski, Sie sind Unternehmer." },
                {
                  speaker: "Herr Lubowski",
                  text: "Und ich bin dafür, aus einem Grund, der selten genannt wird: Ich verliere Bewerber an die Erreichbarkeit, nicht an das Gehalt. Zwei Leute haben letztes Jahr abgesagt, weil sie kein Auto haben.",
                },
                { speaker: "Moderatorin", text: "Frau Ostrowski, Sie haben Bedenken." },
                {
                  speaker: "Frau Ostrowski",
                  text: "Nicht gegen die Strecke, gegen die Begründung. In zwei Nachbarkreisen hat sich die Abwanderung Jugendlicher nach der Reaktivierung nicht bewegt. Wenn wir das jetzt versprechen, liefern wir in fünf Jahren die Munition gegen uns selbst.",
                },
                {
                  speaker: "Frau Steinkamp",
                  text: "Dem stimme ich zu, und es ist auch haushaltspolitisch klug. Ein Projekt, das an einer falschen Erwartung scheitert, macht das nächste schwerer.",
                },
                { speaker: "Moderatorin", text: "Herr Lubowski, überzeugt Sie das?" },
                {
                  speaker: "Herr Lubowski",
                  text: "Halb. Ich fürchte nur, dass eine ehrliche Begründung politisch nicht trägt. Für Pendlerzahlen bekommt niemand eine Mehrheit im Kreistag.",
                },
                {
                  speaker: "Frau Ostrowski",
                  text: "Das ist wahrscheinlich richtig, und es ist trotzdem kein Argument. Eine Mehrheit, die auf einer falschen Zahl steht, hält bis zur ersten Auswertung.",
                },
                { speaker: "Moderatorin", text: "Ein gemeinsamer Vorschlag?" },
                {
                  speaker: "Frau Steinkamp",
                  text: "Wir schreiben vorher auf, was wir erwarten, und veröffentlichen es. Dann ist die Auswertung kein Angriff, sondern ein Termin.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-11-h3-17",
              no: 17,
              ref: "d1",
              text: "Wovon hängt für Frau Steinkamp die Antwort ab?",
              options: [
                "Vom Zeitpunkt des Baubeginns.",
                "Von der Zahl der Haltepunkte.",
                "Vom gegebenen Versprechen.",
              ],
              answer: 2,
              explain:
                "\"Das hängt davon ab, was man verspricht\" — kurtarma olarak değmez, ulaşılabilirlik olarak yaklaşık on sekiz yılda karşılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h3-18",
              no: 18,
              ref: "d1",
              text: "Womit begründet Herr Lubowski seine Zustimmung?",
              options: [
                "Mit den Kosten für den Fuhrpark.",
                "Mit abgesagten Bewerbungen.",
                "Mit dem Wunsch der Mitarbeitenden.",
              ],
              answer: 1,
              explain:
                "İki kişi araba olmadığı için işi reddetmiş: \"Ich verliere Bewerber an die Erreichbarkeit, nicht an das Gehalt.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h3-19",
              no: 19,
              ref: "d1",
              text: "Wogegen richtet sich Frau Ostrowskis Kritik?",
              options: [
                "Gegen die Begründung.",
                "Gegen die Strecke selbst.",
                "Gegen die Höhe der Kosten.",
              ],
              answer: 0,
              explain:
                "Kendisi sınırlıyor: \"Nicht gegen die Strecke, gegen die Begründung\" — komşu ilçelerde gençlerin göçü değişmemiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h3-20",
              no: 20,
              ref: "d1",
              text: "Welchen zusätzlichen Grund nennt Frau Steinkamp dafür?",
              options: [
                "Die Kreditkosten steigen sonst.",
                "Die Bauzeit verlängert sich.",
                "Ein Fehlschlag erschwert das nächste Projekt.",
              ],
              answer: 2,
              explain:
                "Bütçe açısından da akıllıca buluyor: \"Ein Projekt, das an einer falschen Erwartung scheitert, macht das nächste schwerer.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h3-21",
              no: 21,
              ref: "d1",
              text: "Welchen Vorbehalt hat Herr Lubowski dagegen?",
              options: [
                "Die Zahlen seien unsicher.",
                "Eine ehrliche Begründung finde keine Mehrheit.",
                "Die Auswertung komme zu spät.",
              ],
              answer: 1,
              explain:
                "\"Für Pendlerzahlen bekommt niemand eine Mehrheit im Kreistag.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h3-22",
              no: 22,
              ref: "d1",
              text: "Wie antwortet Frau Ostrowski darauf?",
              options: [
                "Sie widerspricht der Einschätzung.",
                "Sie hält den Punkt für zweitrangig.",
                "Sie gibt ihm recht und lässt es nicht gelten.",
              ],
              answer: 2,
              explain:
                "\"Das ist wahrscheinlich richtig, und es ist trotzdem kein Argument\" — yanlış sayıya dayanan çoğunluk ilk değerlendirmeye kadar dayanıyor.",
            },
          ],
        },
        {
          id: "de-b2-11-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören acht kurze Beiträge. Worum geht es jeweils? Sie hören jeden Text einmal.",
          promptTr: "Sekiz kısa parça dinleyeceksin. Her birinde konu ne? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage im Rathaus",
              genreTr: "Belediyede anons",
              situation: "Bir danışma günü.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis: Die Beratung zur Wohnraumförderung findet am Donnerstag statt, nicht am Mittwoch. Ort und Uhrzeit bleiben. Wer schon einen Termin hat, muss nichts tun; wir haben ihn umgetragen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir okul haberi.",
              plays: 1,
              segments: [
                {
                  text: "Die Grundschule in Weidenbach bleibt entgegen den Planungen geöffnet. Ausschlaggebend waren nicht die Proteste, sondern sieben Anmeldungen aus dem Nachbarort, die im Frühjahr noch nicht vorlagen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir ev ilanı.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist Vandenberg Immobilien. Das Haus in der Lindenstraße ist noch frei, allerdings gibt es zwei weitere Interessenten. Eine Besichtigung wäre am Samstag möglich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Ansage im Verein",
              genreTr: "Dernekte duyuru",
              situation: "Üye sayısı.",
              plays: 1,
              segments: [
                {
                  text: "Zur Mitgliederentwicklung: Wir haben elf Eintritte und neun Austritte. Auffällig ist, dass acht der elf neuen Mitglieder erst seit weniger als zwei Jahren im Ort wohnen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Podcast-Ausschnitt",
              genreTr: "Podcast parçası",
              situation: "Bir araştırma bulgusu.",
              plays: 1,
              segments: [
                {
                  text: "Interessant ist weniger, warum Menschen zurückkommen, als warum sie bleiben. In unseren Interviews nannte fast niemand die Heimat. Genannt wurden Arbeit, Wohnung und Betreuung — und zwar in dieser Reihenfolge.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m6",
              genre: "Durchsage am Bahnhof",
              genreTr: "İstasyonda anons",
              situation: "Otobüs hattı.",
              plays: 1,
              segments: [
                {
                  text: "Zur Information: Die Buslinie 412 fährt ab Montag auch um sechs Uhr zwanzig. Der Grund ist die Nachfrage aus dem Gewerbegebiet. Die übrigen Abfahrten bleiben unverändert.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m7",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir başvuru reddi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Zeplin, hier ist das Bauamt. Ihren Antrag müssen wir leider ablehnen. Der Grund ist nicht die Unterlage, sondern der Zeitpunkt: Die Arbeiten hatten bereits begonnen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m8",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir karşılaştırma uyarısı.",
              plays: 1,
              segments: [
                {
                  text: "Die Gemeinde weist darauf hin, dass ihre Zuzugszahlen mit denen der Nachbargemeinden nur eingeschränkt vergleichbar sind. Dort werden Nebenwohnsitze mitgezählt, hier nicht.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-11-h4-23",
              no: 23,
              ref: "m1",
              text: "Worum geht es?",
              options: [
                "Ein Termin verschiebt sich, ohne Aufwand für die Betroffenen.",
                "Die Beratung fällt in dieser Woche aus.",
                "Der Ort der Beratung ändert sich.",
              ],
              answer: 0,
              explain:
                "Gün değişiyor ama yer ve saat aynı, ve randevusu olanlar için \"wir haben ihn umgetragen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-24",
              no: 24,
              ref: "m2",
              text: "Worum geht es?",
              options: [
                "Proteste haben eine Schließung verhindert.",
                "Neue Anmeldungen haben die Lage verändert.",
                "Die Schule zieht in den Nachbarort um.",
              ],
              answer: 1,
              explain:
                "Haber gerekçeleri ayırıyor: belirleyici olan protestolar değil, \"sieben Anmeldungen aus dem Nachbarort\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-25",
              no: 25,
              ref: "m3",
              text: "Worum geht es?",
              options: [
                "Das Haus ist bereits verkauft.",
                "Eine Besichtigung wurde abgesagt.",
                "Das Angebot steht unter Zeitdruck.",
              ],
              answer: 2,
              explain:
                "Ev hâlâ boş ama \"zwei weitere Interessenten\" var ve gezme cumartesi olabiliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-26",
              no: 26,
              ref: "m4",
              text: "Worum geht es?",
              options: [
                "Der Verein verliert Mitglieder.",
                "Die neuen Mitglieder sind überwiegend Zugezogene.",
                "Die Beiträge werden angepasst.",
              ],
              answer: 1,
              explain:
                "Dikkat çeken şey oran: on bir yeni üyeden sekizi \"seit weniger als zwei Jahren im Ort\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-27",
              no: 27,
              ref: "m5",
              text: "Worum geht es?",
              options: [
                "Heimatgefühl ist der wichtigste Grund.",
                "Die Befragten planen ihre Rückkehr genau.",
                "Praktische Gründe stehen vor Gefühlen.",
              ],
              answer: 2,
              explain:
                "Neredeyse kimse memleketi anmamış; sayılanlar \"Arbeit, Wohnung und Betreuung — und zwar in dieser Reihenfolge\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-28",
              no: 28,
              ref: "m6",
              text: "Worum geht es?",
              options: [
                "Eine Linie wird eingestellt.",
                "Eine frühe Fahrt kommt dazu.",
                "Der Fahrplan wird ganz neu gemacht.",
              ],
              answer: 1,
              explain:
                "Tek bir sefer ekleniyor: \"auch um sechs Uhr zwanzig\", geri kalan kalkışlar değişmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-29",
              no: 29,
              ref: "m7",
              text: "Worum geht es?",
              options: [
                "Eine Ablehnung wegen des Zeitpunkts.",
                "Eine Ablehnung wegen fehlender Papiere.",
                "Eine Bitte um weitere Unterlagen.",
              ],
              answer: 0,
              explain:
                "Gerekçe belge değil: \"sondern der Zeitpunkt: Die Arbeiten hatten bereits begonnen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-11-h4-30",
              no: 30,
              ref: "m8",
              text: "Worum geht es?",
              options: [
                "Die Nachbargemeinden zählen falsch.",
                "Die Zählweise wird angeglichen.",
                "Ein Vergleich führt in die Irre.",
              ],
              answer: 2,
              explain:
                "Belediye hata değil uyumsuzluk bildiriyor: \"Dort werden Nebenwohnsitze mitgezählt, hier nicht.\"",
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
          id: "de-b2-11-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer sein Dorf verlässt, hat kein Recht, sich später über seinen Zustand zu beschweren.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Köyünü terk edenin, sonradan onun durumundan şikâyet etmeye hakkı yoktur.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz verwechselt zwei Dinge: eine biografische Entscheidung und ein Recht auf Kritik.

Wer mit neunzehn geht, entscheidet über sein Leben, nicht über die Buslinie. Meine Nichte ist gegangen, weil sie Physik studieren wollte — ein Fach, das es in einem Umkreis von hundert Kilometern nicht gibt. Ihr Weggang war keine Abstimmung über den Ort.

Hinzu kommt, dass viele Weggezogene die Verbindung nie abgebrochen haben. Sie pflegen hier Eltern, zahlen hier Grundsteuer und kommen an jedem zweiten Wochenende. Nach Ihrer Logik hätten ausgerechnet sie am wenigsten mitzureden.

Nun ließe sich einwenden, wer bleibe, trage die Last und solle deshalb entscheiden. Das trifft für die tägliche Arbeit im Verein zu, nicht aber für die Frage, wie es hier in zwanzig Jahren aussieht.

Ich halte Ihren Satz deshalb für bequem: Er erklärt Kritik zur Illoyalität und erspart damit jede inhaltliche Antwort. Wer nur den Weggang zählt und nicht die Gründe, muss sich über die Zahlen nicht wundern.

Mit freundlichen Grüßen
Ellen Kruschwitz`,
            criteria: [
              "İddiaya açıkça atıf yapıldı mı ve tartışma o cümle üzerinden mi yürüyor?",
              "En az iki bağımsız gerekçe var mı?",
              "Karşı görüş güçlü hâliyle mi alındı ve gerçekten yanıtlandı mı?",
              "Sonuç gerekçelerden çıkıyor mu?",
              "Yaklaşık 150 kelime var mı; okur mektubu biçimi korunmuş mu?",
              "Bağlaç ve edilgen yapılar B2 düzeyinde kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-b2-11-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Förderantrag wurde abgelehnt, weil die Arbeiten angeblich schon begonnen hatten. Sie halten das für falsch. Schreiben Sie an das Bauamt (circa 100 Wörter).",
          promptTr:
            "Destek başvurun, işlere başlanmış olduğu gerekçesiyle reddedildi. Bunun yanlış olduğunu düşünüyorsun. İmar müdürlüğüne yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nennen Sie den Bescheid genau.", tr: "Kararı tam olarak belirt." },
              { de: "Erklären Sie, warum die Einordnung nicht zutrifft.", tr: "Değerlendirmenin neden yanlış olduğunu açıkla." },
              { de: "Sagen Sie, was Sie erwarten.", tr: "Ne beklediğini söyle." },
              { de: "Bleiben Sie sachlich und nennen Sie eine Frist.", tr: "Nesnel kal ve bir süre belirt." },
            ],
            sample: `Sehr geehrte Damen und Herren,

gegen Ihren Bescheid vom 12. Februar, Aktenzeichen 4-118/26, lege ich Widerspruch ein.

Sie begründen die Ablehnung damit, dass die Arbeiten bereits begonnen hätten. Am 3. Februar wurde auf dem Grundstück lediglich das alte Gartenhaus abgerissen. Dieses Gebäude ist nicht Gegenstand des Antrags; die Sanierung des Wohnhauses hat bis heute nicht begonnen.

Als Nachweis füge ich die Rechnung des Abbruchunternehmens sowie zwei datierte Fotos bei.

Ich bitte Sie daher, den Bescheid aufzuheben und den Antrag auf Grundlage der beigefügten Unterlagen erneut zu prüfen.

Über eine Antwort bis zum 15. März würde ich mich freuen.

Mit freundlichen Grüßen
Rolf Zeplin`,
            criteria: [
              "Karar tarih ve dosya numarasıyla belirtildi mi?",
              "Yanlış değerlendirmenin nedeni somut olarak açıklandı mı?",
              "Kanıt sunuldu mu?",
              "Ton nesnel kaldı mı, suçlayıcı olmadı mı?",
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
          id: "de-b2-11-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wovon hängt es ab, ob Menschen bleiben?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"İnsanların kalması neye bağlı?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
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
              "Ich möchte heute darüber sprechen, wovon es abhängt, ob Menschen an einem Ort bleiben. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In Rumänien ist mein Heimatdorf in zwanzig Jahren von tausendzweihundert auf vierhundert Einwohner geschrumpft. Geblieben sind fast nur Menschen über sechzig. Die eine Seite sagt, das sei eine Frage der Bindung: Wer sich zugehörig fühlt, bleibt. Dafür spricht, dass viele nach dem Tod der Eltern zurückkommen, obwohl sich sonst nichts geändert hat. Die andere Seite sagt, es gehe um Infrastruktur. Dafür spricht, dass in meinem Dorf nach der Schließung der Schule vier Familien innerhalb eines Jahres weggezogen sind. Meine Position ist, dass die zweite Seite den ersten Schritt erklärt und die erste den zweiten. Menschen kommen wegen eines Ereignisses und bleiben wegen der Bedingungen. Zusammenfassend: Wer Bindung fördern will, sollte nicht über Heimat reden, sondern über Öffnungszeiten.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut ve açıklayıcı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Konum gerekçeli mi ve karşı tarafın noktasını kabul ediyor mu?",
              "Dört dakika boyunca yapı korunabildi mi?",
            ],
          },
        },
        {
          id: "de-b2-11-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Gemeinde hat 200.000 Euro, um Menschen zum Bleiben zu bewegen. Zur Wahl stehen: eine Prämie für Zugezogene, längere Öffnungszeiten der Kinderbetreuung, ein Zuschuss für die Sanierung leer stehender Häuser, eine zusätzliche Busverbindung. Einigen Sie sich auf eine Verwendung.",
          promptTr:
            "Birlikte bir karar verin. Bir belediyenin insanları kalmaya ikna etmek için 200.000 avrosu var. Seçenekler: yeni gelenlere prim, çocuk bakımında daha uzun açılış saatleri, boş evlerin onarımına destek, ek bir otobüs seferi. Bir kullanım üzerinde anlaşın.",
          minutes: 8,
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Ich fange an: Ich bin für die Prämie. Sie wirkt sofort und man sieht das Ergebnis in der Statistik. Was meinen Sie?",
              tr: "Ben başlayayım: Primden yanayım. Hemen etki ediyor ve sonucu istatistikte görüyorsun. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve 'istatistikte görünür' gerekçesini doğrudan ele al.",
              expect: "bir seçeneği gerekçelendirmek ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Einwand: Die Betreuung hilft nur Familien mit kleinen Kindern. Das ist eine schmale Gruppe. Ist das gerecht?",
              tr: "Bir itiraz: Bakım yalnız küçük çocuklu ailelere yarıyor. Bu dar bir grup. Adil mi?",
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
              "Ihr Argument mit der Statistik stimmt und ist genau das Problem. Die Prämie zeigt sich im Zuzug, aber der Zuzug ist nicht das Ziel; wir wollen wissen, wer im dritten Jahr noch da ist. Ich schlage deshalb vor: hunderttausend für die Betreuung ab sieben Uhr, achtzigtausend für die Sanierung leer stehender Häuser, zwanzigtausend für eine frühe Busfahrt. Zum Einwand mit der schmalen Gruppe: Er trifft, nur ist die Gruppe genau die, die sonst geht. Wer mit sechzig hier wohnt, zieht in der Regel nicht wegen der Öffnungszeiten weg. Streichen würde ich die Prämie. Nicht weil sie wirkungslos wäre, sondern weil sie zweimal wirkt: einmal beim Einzug und danach nicht mehr. Zusammengefasst: Schwerpunkt auf Betreuung und Wohnraum, eine Busfahrt dazu, keine Prämie — und wir messen nach drei Jahren, nicht nach einem.",
            criteria: [
              "Öneri gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "İtiraz kabul edilip yanıtlandı mı, yoksa görmezden mi gelindi?",
              "Önceliklendirme yapıldı mı ve eleme gerekçelendirildi mi?",
              "Özet eksiksiz mi — anlaşılan her şey geçiyor mu?",
              "Tartışma dili B2 düzeyinde mi (einwenden, priorisieren, abwägen)?",
            ],
          },
        },
      ],
    },
  ],
};
