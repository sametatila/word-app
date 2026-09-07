import type { MockPaper } from "../types";

/**
 * B2 · Deneme 2 — "Wissenschaft und Alltag".
 *
 * Yapı B2 · Deneme 1 ile birebir aynı (bkz. `b2-01.ts`). Değişen içerik alanı:
 * birinci kâğıt medya ve kamuoyu, bu kâğıt bilimsel bilginin gündelik hayatta
 * nasıl kullanıldığı.
 *
 * Bu kâğıdın belirleyici zorluğu ÖLÇÜLÜ İFADE: metinlerin birçoğu bir savı
 * kabul edip hemen sınırlıyor ("stimmt, allerdings nur dort, wo …"). Maddeler
 * bilerek bu sınırın üstünde duruyor, çünkü B2 düzeyinde en sık yapılan hata,
 * koşullu bir ifadeyi mutlak bir iddia sanmaktır. Şıklarda `grundsätzlich`,
 * `ausschließlich`, `immer` taşıyan seçenekler çoğu zaman metnin abartılmış
 * hâlidir — ama her zaman değil, yoksa bu da bir kalıba dönüşürdü.
 */
export const B2_02: MockPaper = {
  id: "de-b2-02",
  course: "de",
  level: "B2",
  no: 2,
  theme: "Wissenschaft und Alltag",
  themeTr: "Bilim ve gündelik hayat",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen Erfahrungsberichte, einen Sachtext, einen Kommentar, Leserstimmen und eine Teilnahmeinformation. Sie können mit jeder Aufgabe beginnen.",
      instructionTr:
        "Bu bölümde beş görev var: kişisel anlatılar, bir bilgi metni, bir yorum yazısı, okur görüşleri ve bir katılım bilgilendirmesi okuyacaksın. İstediğin görevle başlayabilirsin.",
      tasks: [
        {
          id: "de-b2-02-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben darüber, wie sie mit wissenschaftlichen Empfehlungen umgehen. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi bilimsel önerilerle nasıl baş ettiğini yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "p1",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Mira, 41, Physiotherapeutin",
              body: `In meinem Beruf begegnet mir jede Woche eine neue Empfehlung, und meistens widerspricht sie der von vorletztem Jahr. Ich habe deshalb aufgehört, einzelnen Studien zu folgen.

Was ich stattdessen tue: Ich warte auf Übersichtsarbeiten, in denen jemand die vorhandenen Untersuchungen zusammenrechnet. Das dauert lange, und in dieser Zeit sagen mir Patienten Dinge, die ich noch nicht kenne.

Damit kann ich leben. Unangenehmer finde ich, dass ich manchmal etwas absetzen muss, das ich jahrelang selbst empfohlen habe. Ich sage das inzwischen offen. Wer nie etwas zurücknimmt, hat entweder Glück gehabt oder nicht hingesehen.`,
              gloss: [
                { de: "die Übersichtsarbeit", tr: "derleme çalışması", en: "review study" },
                { de: "absetzen", tr: "bırakmak, uygulamadan kaldırmak", en: "to discontinue" },
              ],
            },
            {
              kind: "text",
              id: "p2",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Robert, 63, pensionierter Ingenieur",
              body: `Ich lese seit meiner Pensionierung viel, auch Originalarbeiten. Was mich dabei am meisten überrascht hat, ist nicht das Ergebnis, sondern die Vorsicht: In der Arbeit selbst steht fast immer, für wen ein Befund gilt und für wen nicht. In der Meldung darüber steht das nie.

Ich habe angefangen, bei jeder Schlagzeile die Zusammenfassung der Studie zu suchen. In drei von vier Fällen finde ich sie in zehn Minuten.

Meine Frau hält das für eine Marotte. Sie hat nicht ganz unrecht: Für mein eigenes Leben ändert sich dadurch selten etwas. Aber ich streite seitdem besser.`,
              gloss: [
                { de: "der Befund", tr: "bulgu", en: "finding" },
                { de: "die Marotte", tr: "tuhaf alışkanlık, takıntı", en: "quirk" },
              ],
            },
            {
              kind: "text",
              id: "p3",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Sandra, 29, Erzieherin",
              body: `Ich arbeite mit Vierjährigen, und ich brauche Antworten, die morgen um acht funktionieren. Wenn mir jemand sagt, die Datenlage sei uneindeutig, hilft mir das im Gruppenraum nicht weiter.

Deshalb halte ich mich an eine einfache Regel: Ich probiere eine Sache vier Wochen lang aus und schaue, ob sich etwas ändert. Das ist keine Forschung, das weiß ich. Aber es ist mehr als das Bauchgefühl, mit dem hier vieles entschieden wird.

Was mich ärgert, ist der Ton mancher Fachleute. Wer nie in einer Gruppe mit zwanzig Kindern gestanden hat, sollte vorsichtiger sein mit dem Wort "einfach".`,
              gloss: [
                { de: "die Datenlage", tr: "veri durumu", en: "state of the evidence" },
                { de: "das Bauchgefühl", tr: "içe doğan his", en: "gut feeling" },
              ],
            },
            {
              kind: "text",
              id: "p4",
              genre: "Erfahrungsbericht",
              genreTr: "Kişisel anlatı",
              title: "Tomas, 35, Apotheker",
              body: `Am Tresen erlebe ich beide Seiten. Die einen wollen für jede Beschwerde ein Präparat, die anderen misstrauen grundsätzlich allem, was in einer Schachtel steckt.

Mir hilft in beiden Fällen dieselbe Frage: Was würde passieren, wenn Sie nichts tun? Bei vielen Beschwerden lautet die ehrliche Antwort: dasselbe, nur eine Woche später. Das sage ich, obwohl ich damit nichts verkaufe.

Was ich nicht mehr mache, ist gegen Überzeugungen anzureden. Ich lege die Zahlen hin und lasse die Leute entscheiden. Seitdem kommen sie wieder — und einige kommen, bevor sie etwas Falsches gekauft haben.`,
              gloss: [
                { de: "der Tresen", tr: "tezgâh", en: "counter" },
                { de: "das Präparat", tr: "ilaç, müstahzar", en: "preparation, medicine" },
                { de: "anreden gegen", tr: "karşı çıkarak ikna etmeye çalışmak", en: "to argue against" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-02-l1-1",
              no: 1,
              text: "Wer verzichtet bewusst darauf, andere von ihrer Meinung abzubringen?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 3,
              explain:
                "Tomas: \"Was ich nicht mehr mache, ist gegen Überzeugungen anzureden. Ich lege die Zahlen hin und lasse die Leute entscheiden.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-2",
              no: 2,
              text: "Wer stützt sich nicht auf einzelne Untersuchungen, sondern auf ihre Zusammenfassung?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 0,
              explain:
                "Mira tek tek çalışmaları izlemeyi bırakıp derleme çalışmalarını bekliyor; bunun uzun sürdüğünü de kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-3",
              no: 3,
              text: "Wer beschreibt, dass Einschränkungen in der Berichterstattung verloren gehen?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 1,
              explain:
                "Robert: çalışmanın kendisinde bulgunun kim için geçerli olduğu yazıyor, \"In der Meldung darüber steht das nie\".",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-4",
              no: 4,
              text: "Wer räumt ein, dass das eigene Vorgehen keine Forschung ist?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 2,
              explain:
                "Sandra dört haftalık denemesini anlatıp \"Das ist keine Forschung, das weiß ich\" diyor — ama içe doğan histen fazlası saydığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-5",
              no: 5,
              text: "Wer spricht offen darüber, eine frühere eigene Empfehlung zurückgenommen zu haben?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 0,
              explain:
                "Mira yıllarca önerdiği bir şeyi bırakmak zorunda kaldığını ve bunu artık açıkça söylediğini yazıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-6",
              no: 6,
              text: "Wer kritisiert den Ton von Fachleuten gegenüber Praktikern?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 2,
              explain:
                "Sandra: yirmi çocuklu bir grupta hiç durmamış olanın \"einfach\" sözcüğünü daha dikkatli kullanması gerektiğini söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-7",
              no: 7,
              text: "Wer gibt zu, dass sich am eigenen Leben durch die Mühe wenig ändert?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 1,
              explain:
                "Robert eşinin bunu bir takıntı saymasına \"Sie hat nicht ganz unrecht\" diye karşılık veriyor: kendi hayatında nadiren bir şey değişiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-8",
              no: 8,
              text: "Wer stellt eine Frage, die beiden gegensätzlichen Haltungen gilt?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 3,
              explain:
                "Tomas her şeyi isteyen ve hiçbir şeye güvenmeyen müşteriye aynı soruyu soruyor: \"Was würde passieren, wenn Sie nichts tun?\"",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l1-9",
              no: 9,
              text: "Wer braucht Antworten, die sich sofort im Arbeitsalltag anwenden lassen?",
              options: ["Mira", "Robert", "Sandra", "Tomas"],
              answer: 2,
              explain:
                "Sandra: \"ich brauche Antworten, die morgen um acht funktionieren\" — belirsiz veri durumu ona grup odasında yardımcı olmuyor.",
            },
          ],
        },
        {
          id: "de-b2-02-l2",
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
              title: "Warum Studien im Alltag so oft missverstanden werden",
              body: `Kaum eine Woche vergeht ohne eine Meldung, die einen Zusammenhang zwischen einem Verhalten und einer Krankheit behauptet. Wenige Monate später steht das Gegenteil in der Zeitung. {{10}}

Der erste Punkt betrifft die Art der Untersuchung. Beobachtungsstudien können zeigen, dass zwei Dinge gemeinsam auftreten, nicht aber, dass eines das andere verursacht. Wer viel Gemüse isst, bewegt sich im Schnitt auch mehr und raucht seltener. {{11}}

Der zweite Punkt ist der Unterschied zwischen relativem und absolutem Risiko. Eine Verdopplung klingt dramatisch. {{12}}

Ein dritter Punkt wird selten genannt, obwohl er entscheidend ist: die Frage, an wem geprüft wurde. Viele Untersuchungen laufen an Studierenden oder an ausgewählten, besonders gesunden Freiwilligen. {{13}}

Hinzu kommt, dass die Meldung nicht von den Forschenden geschrieben wird. Zwischen Arbeit und Schlagzeile liegen mehrere Stationen, und an jeder verschwindet ein Nebensatz. {{14}}

Was also tun? Fachleute empfehlen drei Fragen, die sich ohne Vorkenntnisse stellen lassen: Wie viele Menschen wurden untersucht, wie lange, und im Vergleich wozu? {{15}}`,
              gloss: [
                { de: "verursachen", tr: "yol açmak", en: "to cause" },
                { de: "die Verdopplung", tr: "iki katına çıkma", en: "doubling" },
                { de: "die Freiwilligen", tr: "gönüllüler", en: "volunteers" },
                { de: "die Vorkenntnisse", tr: "ön bilgi", en: "prior knowledge" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Sie beantworten längst nicht alles, sortieren aber den größten Teil dessen aus, was ohnehin nichts aussagt." },
            { key: "b", label: "b", body: "Am Ende steht ein Satz ohne jede Einschränkung, den so niemand in der Arbeit selbst geschrieben hätte." },
            { key: "c", label: "c", body: "Ob das Ergebnis auch für einen siebzigjährigen Menschen mit drei Vorerkrankungen gilt, weiß man damit noch nicht." },
            { key: "d", label: "d", body: "Steigt ein Risiko von zwei auf vier von zehntausend, ist die Verdopplung korrekt und die Zahl trotzdem klein." },
            { key: "e", label: "e", body: "Für diesen Widerspruch gibt es weniger geheimnisvolle Gründe, als viele annehmen — im Kern sind es vier." },
            { key: "f", label: "f", body: "Welche der drei Gewohnheiten wirkt, lässt sich aus einer solchen Studie deshalb nicht ablesen." },
            { key: "g", label: "g", body: "Die Zahl der jährlich erscheinenden Fachartikel hat sich seit den neunziger Jahren mehr als verdoppelt." },
            { key: "h", label: "h", body: "Ohne diese Angaben lässt sich kein Ergebnis in einer Fachzeitschrift veröffentlichen." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-02-l2-10",
              no: 10,
              text: "Lücke 10",
              answer: "e",
              explain:
                "Boşluktan önce çelişki betimleniyor; (e) buna \"Für diesen Widerspruch\" diye gönderme yapıyor ve \"im Kern sind es vier\" diyerek metnin dört noktalı yapısını duyuruyor.",
            },
            {
              kind: "match",
              id: "de-b2-02-l2-11",
              no: 11,
              text: "Lücke 11",
              answer: "f",
              explain:
                "Önceki cümle üç alışkanlığın birlikte gittiğini söylüyor; (f) \"Welche der drei Gewohnheiten wirkt\" diye tam buna bağlanıyor.",
            },
            {
              kind: "match",
              id: "de-b2-02-l2-12",
              no: 12,
              text: "Lücke 12",
              answer: "d",
              explain:
                "\"Eine Verdopplung klingt dramatisch\" cümlesinin ardından somut sayı geliyor: iki binde dörde çıkmak. (d) mutlak ve göreli riski karşı karşıya koyan tek cümle.",
            },
            {
              kind: "match",
              id: "de-b2-02-l2-13",
              no: 13,
              text: "Lücke 13",
              answer: "c",
              explain:
                "Denekler öğrenciler ya da sağlıklı gönüllüler; (c) bunun sınırını çiziyor: yetmiş yaşında ve üç hastalığı olan biri için geçerli mi, bilinmiyor.",
            },
            {
              kind: "match",
              id: "de-b2-02-l2-14",
              no: 14,
              text: "Lücke 14",
              answer: "b",
              explain:
                "Her istasyonda bir yan cümlenin kaybolduğu söyleniyor; (b) bu zincirin sonunu anlatıyor: kayıtsız, kimsenin yazmadığı bir cümle.",
            },
            {
              kind: "match",
              id: "de-b2-02-l2-15",
              no: 15,
              text: "Lücke 15",
              answer: "a",
              explain:
                "Üç soru verildikten sonra (a) onların gücünü ölçüyor: her şeyi çözmüyor ama işe yaramayanı eliyor. (g) ve (h) konuyla ilgili ama önlerindeki cümleye bağlanmıyor.",
            },
          ],
        },
        {
          id: "de-b2-02-l3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Kommentar und die Aufgaben 16 bis 21. Wählen Sie: a, b oder c.",
          promptTr: "Yorum yazısını ve 16–21. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "k1",
              genre: "Kommentar",
              genreTr: "Yorum yazısı",
              title: "Die Sehnsucht nach der einen Zahl",
              body: `Achttausend Schritte, zwei Liter Wasser, sieben Stunden Schlaf: Selten war das gute Leben so übersichtlich beziffert. Dass die meisten dieser Zahlen einen weit weniger festen Boden haben, als ihr Auftreten vermuten lässt, ist inzwischen bekannt. Interessanter ist die Frage, warum sie sich trotzdem halten.

Der bequemste Verdacht lautet: Werbung. Er greift zu kurz. Natürlich verkaufen sich Geräte besser mit einem Ziel als mit einem Bereich, doch die Zahlen waren schon populär, bevor es die Geräte gab. Sie erfüllen etwas, das Empfehlungen mit Spannbreiten nicht leisten: Sie lassen sich abhaken.

Man kann das belächeln, sollte es aber nicht. In der Praxis ist eine falsche, aber befolgte Regel oft nützlicher als eine richtige, die niemand umsetzt. Wer täglich achttausend Schritte geht, tut mehr für sich als jemand, der die Studienlage korrekt referiert und sitzen bleibt.

Der Schaden entsteht an einer anderen Stelle, und er wird selten benannt. Eine Zahl, die man verfehlt, wirkt wie ein Zeugnis. Ich habe genug Menschen erlebt, die nach zwei Wochen aufgeben, nicht weil ihnen die Bewegung nicht gutgetan hätte, sondern weil sie die Vorgabe nicht erreicht haben. Aus einer Hilfe ist dann ein Urteil geworden.

Sinnvoll wäre eine Sprache, die beides kann: eine Richtung angeben, ohne eine Grenze zu ziehen. "Mehr als gestern" ist keine schöne Kampagne, aber es ist ehrlicher — und es lässt sich nicht verfehlen.

Bleibt ein Einwand, den ich ernst nehme: Ohne konkrete Zahl erreicht man womöglich genau jene nicht, die am wenigsten Bewegung haben. Das mag sein. Dann sollte man die Zahl wenigstens als das kennzeichnen, was sie ist: ein Anhaltspunkt, kein Grenzwert.`,
              gloss: [
                { de: "beziffert", tr: "sayıya dökülmüş", en: "quantified" },
                { de: "die Spannbreite", tr: "aralık", en: "range" },
                { de: "abhaken", tr: "listeden düşmek, tamamlandı diye işaretlemek", en: "to tick off" },
                { de: "der Anhaltspunkt", tr: "yol gösterici işaret", en: "point of reference" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-02-l3-16",
              no: 16,
              ref: "k1",
              text: "Wie bewertet der Autor die Erklärung, die Zahlen seien reine Werbung?",
              options: [
                "Als grundsätzlich falsch und irreführend.",
                "Als naheliegend, aber unvollständig.",
                "Als die überzeugendste der vorliegenden Erklärungen.",
              ],
              answer: 1,
              explain:
                "\"Der bequemste Verdacht … Er greift zu kurz\" — reklamı yadsımıyor, yetersiz buluyor: sayılar cihazlardan önce de yaygındı.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l3-17",
              no: 17,
              ref: "k1",
              text: "Worin sieht er die eigentliche Stärke solcher Zahlen?",
              options: [
                "In ihrer wissenschaftlichen Genauigkeit.",
                "In ihrer Verbreitung durch Hersteller.",
                "Darin, dass man sie abhaken kann.",
              ],
              answer: 2,
              explain:
                "\"Sie erfüllen etwas, das Empfehlungen mit Spannbreiten nicht leisten: Sie lassen sich abhaken.\" Güç, doğruluktan değil kapanabilirlikten geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l3-18",
              no: 18,
              ref: "k1",
              text: "Welche Haltung nimmt er gegenüber ungenauen, aber befolgten Regeln ein?",
              options: [
                "Er hält sie in der Praxis für nützlicher als unbefolgte richtige.",
                "Er lehnt sie ab, weil sie falsche Erwartungen erzeugen.",
                "Er hält sie für gleichwertig mit exakten Empfehlungen.",
              ],
              answer: 0,
              explain:
                "\"eine falsche, aber befolgte Regel ist oft nützlicher als eine richtige, die niemand umsetzt\" — pratik yararı öne koyuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l3-19",
              no: 19,
              ref: "k1",
              text: "Worin liegt für ihn der eigentliche Schaden?",
              options: [
                "In den Kosten der Geräte.",
                "In der Wirkung verfehlter Vorgaben auf die Motivation.",
                "In der falschen Darstellung der Studienlage.",
              ],
              answer: 1,
              explain:
                "Ulaşılamayan sayı bir karneye dönüşüyor ve insanlar hareket işe yaramadığı için değil, hedefi tutturamadıkları için bırakıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l3-20",
              no: 20,
              ref: "k1",
              text: "Was schlägt der Autor vor?",
              options: [
                "Auf jede Zahl vollständig zu verzichten.",
                "Die Zahlen wissenschaftlich neu zu berechnen.",
                "Eine Sprache, die eine Richtung angibt statt einer Grenze.",
              ],
              answer: 2,
              explain:
                "\"eine Richtung angeben, ohne eine Grenze zu ziehen\" — örneği \"Mehr als gestern\". Sayıyı hepten atmıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l3-21",
              no: 21,
              ref: "k1",
              text: "Wie geht er mit dem abschließenden Einwand um?",
              options: [
                "Er lässt ihn gelten und schränkt seinen Vorschlag ein.",
                "Er entkräftet ihn mit einem Gegenbeispiel.",
                "Er lässt ihn unbeantwortet stehen.",
              ],
              answer: 0,
              explain:
                "\"Das mag sein\" diyerek itirazı kabul ediyor ve önerisini yumuşatıyor: sayı kalabilir, ama sınır değil işaret olarak.",
            },
          ],
        },
        {
          id: "de-b2-02-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Forschungsdaten grundsätzlich offengelegt werden sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, araştırma verilerinin ilke olarak açılıp açılmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Prof. Halvorsen",
              body: "Ich habe meine Daten zweimal offengelegt und beide Male Fehler zurückgemeldet bekommen, die mir peinlich waren. Genau deshalb bin ich dafür: Ein Fehler, den jemand findet, ist billiger als einer, auf dem zehn Jahre aufgebaut wird.",
            },
            {
              key: "b",
              label: "b — Dr. Weiland, Medizinerin",
              body: "In der Theorie stimme ich zu. In meinem Feld arbeiten wir mit Patientendaten, und selbst nach Anonymisierung bleibt bei seltenen Erkrankungen ein Rest. Offenheit darf nicht bedeuten, dass ein Mensch identifizierbar wird.",
            },
            {
              key: "c",
              label: "c — Marek Sowa, Doktorand",
              body: "Man verlangt von uns Offenlegung, rechnet die Arbeit dafür aber nirgends an. Ich habe drei Wochen gebraucht, meine Daten so aufzubereiten, dass ein Fremder sie versteht. In keiner Bewerbung hat das je gezählt.",
            },
            {
              key: "d",
              label: "d — Frau Bierhoff, Verlagsleiterin",
              body: "Wir verlangen die Daten inzwischen bei jeder Einreichung, und die Zahl der zurückgezogenen Artikel ist gesunken. Das war keine populäre Entscheidung, aber sie hat gewirkt.",
            },
            {
              key: "e",
              label: "e — Herr Dostál, Unternehmensforscher",
              body: "Wer in einer Firma forscht, kann nicht alles offenlegen; sonst forscht die Firma nicht mehr. Ich schlage vor, wenigstens die Auswertungswege zu veröffentlichen, auch wenn die Rohdaten bleiben, wo sie sind.",
            },
            {
              key: "f",
              label: "f — Frau Kraus, Bibliothekarin",
              body: "Das eigentliche Problem sehe ich woanders: Offene Daten liegen auf Servern, die in fünf Jahren niemand mehr bezahlt. Ohne dauerhafte Speicherung ist Offenlegung ein Versprechen auf Zeit.",
            },
            {
              key: "g",
              label: "g — Jonas Reimer, Student",
              body: "Für meine Abschlussarbeit habe ich Daten aus vier offenen Archiven benutzt. Ohne sie hätte ich das Thema gar nicht bearbeiten können — mein Institut hätte die Erhebung nie bezahlt.",
            },
            {
              key: "h",
              label: "h — Frau Adomeit, Statistikerin",
              body: "Man sollte nicht so tun, als würden offene Daten automatisch geprüft. Die meisten Datensätze lädt nie jemand herunter. Es genügt allerdings, dass es möglich wäre — das allein verändert, wie sorgfältig gearbeitet wird.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-02-l4-22",
              no: 22,
              text: "Der Aufwand für die Aufbereitung wird beruflich nicht anerkannt.",
              answer: "c",
              explain:
                "Marek Sowa üç haftalık emeğin hiçbir başvuruda sayılmadığını söylüyor — itirazı ilkeye değil, ödüllendirme düzenine.",
            },
            {
              kind: "match",
              id: "de-b2-02-l4-23",
              no: 23,
              text: "Der Nutzen entsteht schon dadurch, dass eine Prüfung möglich wäre.",
              answer: "h",
              explain:
                "Frau Adomeit çoğu verinin hiç indirilmediğini kabul ediyor, ama \"Es genügt allerdings, dass es möglich wäre\" diyerek yararı orada buluyor.",
            },
            {
              kind: "match",
              id: "de-b2-02-l4-24",
              no: 24,
              text: "Ohne gesicherte Langzeitspeicherung bleibt Offenlegung folgenlos.",
              answer: "f",
              explain:
                "Frau Kraus sorunu sunucuların beş yıl sonra ödenmemesinde görüyor: \"ein Versprechen auf Zeit\".",
            },
            {
              kind: "match",
              id: "de-b2-02-l4-25",
              no: 25,
              text: "Auch nach Anonymisierung kann ein Rückschluss auf Einzelne möglich bleiben.",
              answer: "b",
              explain:
                "Dr. Weiland ilkeyi kabul edip nadir hastalıklarda kalan riski gerekçe gösteriyor: \"bleibt bei seltenen Erkrankungen ein Rest\".",
            },
            {
              kind: "match",
              id: "de-b2-02-l4-26",
              no: 26,
              text: "Ein früh gefundener Fehler ist günstiger als ein spät entdeckter.",
              answer: "a",
              explain:
                "Prof. Halvorsen kendi utandığı geri bildirimleri anlatıp \"billiger als einer, auf dem zehn Jahre aufgebaut wird\" diyor.",
            },
            {
              kind: "match",
              id: "de-b2-02-l4-27",
              no: 27,
              text: "Zumindest der Rechenweg sollte veröffentlicht werden, auch wenn die Rohdaten es nicht können.",
              answer: "e",
              explain:
                "Herr Dostál şirket araştırmasının sınırını kabul ediyor ve ara bir çözüm öneriyor: ham veri değil, değerlendirme yolu.",
            },
          ],
        },
        {
          id: "de-b2-02-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Teilnahmeinformation und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Katılım bilgilendirmesini ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Teilnahmeinformation",
              genreTr: "Katılım bilgilendirmesi",
              title: "Information für Teilnehmende — Studie zu Schlaf und Konzentration",
              body: `1. Ablauf
Die Studie umfasst vier Termine im Abstand von jeweils zwei Wochen. Jeder Termin dauert etwa neunzig Minuten. Zwischen den Terminen tragen Sie ein Messgerät am Handgelenk und führen ein kurzes Protokoll.

2. Freiwilligkeit
Die Teilnahme ist freiwillig. Sie können Ihre Einwilligung jederzeit ohne Angabe von Gründen zurückziehen; Nachteile entstehen Ihnen daraus nicht. Bereits erhobene Daten werden auf Ihren Wunsch gelöscht, sofern die Auswertung noch nicht abgeschlossen ist.

3. Aufwandsentschädigung
Für jeden vollständig wahrgenommenen Termin erhalten Sie 25 Euro. Die Auszahlung erfolgt gesammelt nach dem letzten Termin. Bei Abbruch werden die bis dahin wahrgenommenen Termine anteilig vergütet.

4. Daten
Ihre Daten werden pseudonymisiert gespeichert; die Zuordnungsliste liegt getrennt und ist nur der Studienleitung zugänglich. Eine Weitergabe an Dritte erfolgt ausschließlich in anonymisierter Form.

5. Ausschluss
Nicht teilnehmen können Personen, die regelmäßig Schlafmittel einnehmen oder in den letzten sechs Monaten in Schichtarbeit tätig waren. Gelegentliche Nachtarbeit steht einer Teilnahme nicht entgegen.

6. Rückmeldung
Auf Wunsch erhalten Sie nach Abschluss der Studie eine allgemein verständliche Zusammenfassung der Ergebnisse. Eine individuelle medizinische Auswertung Ihrer Messwerte ist nicht Teil der Studie.`,
              gloss: [
                { de: "die Einwilligung", tr: "onam, rıza", en: "consent" },
                { de: "die Aufwandsentschädigung", tr: "emek karşılığı ödeme", en: "expense allowance" },
                { de: "pseudonymisiert", tr: "takma adlandırılmış", en: "pseudonymised" },
                { de: "entgegenstehen", tr: "engel oluşturmak", en: "to preclude" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-02-l5-28",
              no: 28,
              ref: "b1",
              text: "Was gilt, wenn jemand die Studie vorzeitig beendet?",
              options: [
                "Die Aufwandsentschädigung entfällt vollständig.",
                "Die bereits wahrgenommenen Termine werden anteilig bezahlt.",
                "Die Auszahlung erfolgt erst nach Abschluss aller anderen Termine.",
              ],
              answer: 1,
              explain:
                "\"Bei Abbruch werden die bis dahin wahrgenommenen Termine anteilig vergütet\" — ödeme tamamen düşmüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l5-29",
              no: 29,
              ref: "b1",
              text: "Wer ist von der Teilnahme ausgeschlossen?",
              options: [
                "Wer in den letzten sechs Monaten Schichtarbeit geleistet hat.",
                "Wer gelegentlich nachts arbeitet.",
                "Wer bereits an einer anderen Studie teilgenommen hat.",
              ],
              answer: 0,
              explain:
                "Metin iki durumu bilerek ayırıyor: düzenli vardiya dışlıyor, ara sıra gece çalışması \"steht einer Teilnahme nicht entgegen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-02-l5-30",
              no: 30,
              ref: "b1",
              text: "Was können Teilnehmende am Ende erwarten?",
              options: [
                "Eine ärztliche Beurteilung ihrer eigenen Messwerte.",
                "Eine Kopie aller erhobenen Rohdaten.",
                "Eine verständliche Zusammenfassung der Ergebnisse.",
              ],
              answer: 2,
              explain:
                "Talep hâlinde genel bir özet veriliyor; bireysel tıbbi değerlendirme açıkça kapsam dışında bırakılıyor.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Alltagsgespräche, ein Interview, eine Besprechung und einen Vortrag. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde dört görev var: gündelik konuşmalar, bir söyleşi, bir toplantı ve bir sunum dinleyeceksin. Önce soruları oku.",
      tasks: [
        {
          id: "de-b2-02-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Zu jedem Gespräch gibt es zwei Aufgaben. Sie hören jedes Gespräch einmal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Her konuşma için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch in der Praxis",
              genreTr: "Muayenehanede konuşma",
              situation: "Bir hasta test sonucunu konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Patient", text: "Der Wert ist erhöht. Muss ich mir Sorgen machen?" },
                { speaker: "Ärztin", text: "Ein einzelner Wert sagt wenig. Er schwankt bei Ihnen über den Tag stärker als bei den meisten." },
                { speaker: "Patient", text: "Also messen wir noch mal?" },
                { speaker: "Ärztin", text: "In vier Wochen, morgens und nüchtern. Vorher würde ich nichts ändern, auch nicht die Ernährung." },
              ],
            },
            {
              kind: "audio",
              id: "g2",
              genre: "Gespräch in der Apotheke",
              genreTr: "Eczanede konuşma",
              situation: "Bir müşteri takviye ürün soruyor.",
              plays: 1,
              segments: [
                { speaker: "Kundin", text: "Ich hätte gern das Präparat aus der Werbung, gegen Müdigkeit." },
                { speaker: "Apotheker", text: "Verkaufen kann ich es Ihnen. Ob es hilft, hängt davon ab, ob Ihnen tatsächlich etwas fehlt." },
                { speaker: "Kundin", text: "Und wie finde ich das heraus?" },
                { speaker: "Apotheker", text: "Mit einer Blutuntersuchung beim Hausarzt. Das kostet Sie weniger als drei Packungen davon." },
              ],
            },
            {
              kind: "audio",
              id: "g3",
              genre: "Gespräch im Labor",
              genreTr: "Laboratuvarda konuşma",
              situation: "İki araştırmacı bir ölçümü konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Nadia", text: "Die zweite Messreihe weicht deutlich von der ersten ab." },
                { speaker: "Ole", text: "Hat sich am Aufbau etwas geändert?" },
                { speaker: "Nadia", text: "Nur das Gerät. Wir haben seit Montag das neue." },
                { speaker: "Ole", text: "Dann ist das keine Entdeckung, sondern eine Kalibrierung. Wir müssen beide Geräte parallel laufen lassen." },
              ],
            },
            {
              kind: "audio",
              id: "g4",
              genre: "Gespräch an der Universität",
              genreTr: "Üniversitede konuşma",
              situation: "Bir öğrenci danışmanıyla konuşuyor.",
              plays: 1,
              segments: [
                { speaker: "Studentin", text: "Ich würde gern mehr Teilnehmende befragen, aber die Zeit reicht nicht." },
                { speaker: "Betreuer", text: "Dann befragen Sie weniger, aber gründlicher. Sechzig oberflächliche Antworten sind schlechter als zwanzig gute." },
                { speaker: "Studentin", text: "Wird die kleine Zahl nicht kritisiert?" },
                { speaker: "Betreuer", text: "Nur, wenn Sie daraus allgemeine Schlüsse ziehen. Schreiben Sie hin, was Ihre Arbeit nicht zeigen kann." },
              ],
            },
            {
              kind: "audio",
              id: "g5",
              genre: "Gespräch nach einem Vortrag",
              genreTr: "Sunum sonrası konuşma",
              situation: "İki dinleyici sunumu değerlendiriyor.",
              plays: 1,
              segments: [
                { speaker: "Bea", text: "Mich hat gestört, dass er nur die Studien gezeigt hat, die zu seiner These passen." },
                { speaker: "Kian", text: "Er hat die Gegenstudie erwähnt, gleich am Anfang." },
                { speaker: "Bea", text: "Erwähnt schon, aber in einem Nebensatz und ohne Zahlen." },
                { speaker: "Kian", text: "Das stimmt allerdings. Bei den eigenen Ergebnissen war er wesentlich ausführlicher." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-02-h1-1",
              no: 1,
              ref: "g1",
              text: "Die Ärztin empfiehlt, die Ernährung sofort umzustellen.",
              answer: false,
              explain: "Tam tersi: \"Vorher würde ich nichts ändern, auch nicht die Ernährung\" — önce dört hafta sonra ikinci ölçüm.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h1-2",
              no: 2,
              ref: "g1",
              text: "Warum misst die Ärztin noch einmal?",
              options: [
                "Weil das Labor einen Fehler gemeldet hat.",
                "Weil der Patient darauf besteht und beunruhigt ist.",
                "Weil ein einzelner Wert bei ihm stark schwankt.",
              ],
              answer: 2,
              explain:
                "\"Ein einzelner Wert sagt wenig. Er schwankt bei Ihnen über den Tag stärker als bei den meisten\" — gerekçe dalgalanma.",
            },
            {
              kind: "bool",
              id: "de-b2-02-h1-3",
              no: 3,
              ref: "g2",
              text: "Der Apotheker verweigert den Verkauf des Präparats.",
              answer: false,
              explain:
                "\"Verkaufen kann ich es Ihnen\" — satmayı reddetmiyor, yalnız etkisinin bir eksikliğe bağlı olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h1-4",
              no: 4,
              ref: "g2",
              text: "Was empfiehlt er der Kundin?",
              options: [
                "Ein anderes, günstigeres Präparat auszuprobieren.",
                "Zuerst den Blutwert bestimmen zu lassen.",
                "Die Packung zunächst nur einmal zu kaufen.",
              ],
              answer: 1,
              explain: "Aile hekiminde kan tahlili öneriyor ve bunun üç kutudan ucuz olduğunu ekliyor.",
            },
            {
              kind: "bool",
              id: "de-b2-02-h1-5",
              no: 5,
              ref: "g3",
              text: "Ole hält die Abweichung für ein neues Ergebnis.",
              answer: false,
              explain:
                "\"Dann ist das keine Entdeckung, sondern eine Kalibrierung\" — farkı yeni cihaza bağlıyor, bulguya değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h1-6",
              no: 6,
              ref: "g3",
              text: "Was schlägt Ole vor?",
              options: [
                "Beide Geräte gleichzeitig zu verwenden.",
                "Die erste Messreihe zu verwerfen.",
                "Die Messung von einem anderen Labor prüfen zu lassen.",
              ],
              answer: 0,
              explain: "\"Wir müssen beide Geräte parallel laufen lassen\" — karşılaştırma yapılmadan hiçbir seri atılmıyor.",
            },
            {
              kind: "bool",
              id: "de-b2-02-h1-7",
              no: 7,
              ref: "g4",
              text: "Der Betreuer rät zu weniger, aber gründlicheren Befragungen.",
              answer: true,
              explain: "\"Sechzig oberflächliche Antworten sind schlechter als zwanzig gute\" — nitelik sayının önünde.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h1-8",
              no: 8,
              ref: "g4",
              text: "Unter welcher Bedingung wird die kleine Stichprobe zum Problem?",
              options: [
                "Wenn die Arbeit später veröffentlicht werden soll.",
                "Wenn daraus allgemeine Schlüsse gezogen werden.",
                "Wenn die Befragung online durchgeführt wird.",
              ],
              answer: 1,
              explain:
                "\"Nur, wenn Sie daraus allgemeine Schlüsse ziehen\" — çözüm olarak sınırların yazılması öneriliyor.",
            },
            {
              kind: "bool",
              id: "de-b2-02-h1-9",
              no: 9,
              ref: "g5",
              text: "Kian gibt Bea am Ende in einem Punkt recht.",
              answer: true,
              explain:
                "Önce karşı çıkıyor, sonra \"Das stimmt allerdings\" diyerek karşıt çalışmanın ayrıntısız kaldığını kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h1-10",
              no: 10,
              ref: "g5",
              text: "Was wirft Bea dem Vortragenden vor?",
              options: [
                "Er hat die Gegenstudie vollständig verschwiegen.",
                "Er hat zu viele Zahlen ohne Erklärung gezeigt.",
                "Er hat gegenteilige Befunde nur beiläufig erwähnt.",
              ],
              answer: 2,
              explain:
                "Kian karşıt çalışmanın anıldığını hatırlatıyor; Bea da bunu kabul edip eleştirisini düzeltiyor: \"in einem Nebensatz und ohne Zahlen\".",
            },
          ],
        },
        {
          id: "de-b2-02-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Interview. Wählen Sie zu den Aufgaben 11 bis 16: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir söyleşi dinleyeceksin. 11–16. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "i1",
              genre: "Radiointerview",
              genreTr: "Radyo söyleşisi",
              situation: "Bir uyku araştırmacısıyla söyleşi.",
              plays: 1,
              segments: [
                { speaker: "Moderator", text: "Frau Prohaska, acht Stunden Schlaf — gilt diese Regel noch?" },
                {
                  speaker: "Frau Prohaska",
                  text: "Sie hat nie so gegolten, wie sie zitiert wird. Der Mittelwert liegt bei etwa sieben Stunden, aber die Streuung ist groß. Ein Teil der Menschen kommt dauerhaft mit sechs aus, ein anderer braucht neun.",
                },
                { speaker: "Moderator", text: "Woran erkennt man, was man selbst braucht?" },
                {
                  speaker: "Frau Prohaska",
                  text: "An zwei Wochen Urlaub ohne Wecker. Was sich in der zweiten Woche einpendelt, ist Ihr Bedarf. Die erste Woche zählt nicht, da holen die meisten nur nach.",
                },
                { speaker: "Moderator", text: "Viele nutzen inzwischen Geräte, die den Schlaf aufzeichnen." },
                {
                  speaker: "Frau Prohaska",
                  text: "Die Geräte unterscheiden Wachliegen und leichten Schlaf nicht zuverlässig. Für die Dauer taugen sie, für die Qualität nicht. Und bei manchen Menschen erzeugen sie ein Problem, das vorher nicht da war.",
                },
                { speaker: "Moderator", text: "Sie meinen, die Beschäftigung selbst stört?" },
                {
                  speaker: "Frau Prohaska",
                  text: "Genau. Wir sehen Leute, die gut schlafen, sich aber schlecht bewertet fühlen, weil eine Zahl das sagt. Das hat einen Namen bekommen, und es ist keine Erfindung der Kritiker.",
                },
                { speaker: "Moderator", text: "Was hilft denn tatsächlich?" },
                {
                  speaker: "Frau Prohaska",
                  text: "Für die meisten überraschend: Die wirksamste einzelne Maßnahme ist die konstante Aufstehzeit, nicht die Zubettgehzeit. Der Körper richtet sich nach dem Licht am Morgen.",
                },
                { speaker: "Moderator", text: "Und Schlaf am Wochenende nachholen?" },
                {
                  speaker: "Frau Prohaska",
                  text: "Ein bisschen geht. Zwei Stunden länger schaden nicht. Wer aber sonntags bis zwölf schläft, verschiebt seine innere Uhr und fängt am Montag wieder von vorn an.",
                },
              ],
              gloss: [
                { de: "die Streuung", tr: "dağılım, saçılım", en: "spread, variance" },
                { de: "sich einpendeln", tr: "bir düzeye oturmak", en: "to settle at" },
                { de: "die innere Uhr", tr: "iç saat", en: "body clock" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-02-h2-11",
              no: 11,
              ref: "i1",
              text: "Was sagt Frau Prohaska über die Acht-Stunden-Regel?",
              options: [
                "Sie ist durch neuere Untersuchungen widerlegt worden.",
                "Sie war in dieser Form nie richtig.",
                "Sie gilt nur für jüngere Erwachsene.",
              ],
              answer: 1,
              explain:
                "\"Sie hat nie so gegolten, wie sie zitiert wird\" — kural çürütülmedi, hiç o biçimde var olmadı. Ortalama yedi, dağılım geniş.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h2-12",
              no: 12,
              ref: "i1",
              text: "Wie findet man den eigenen Bedarf heraus?",
              options: [
                "Über zwei Wochen ohne Wecker, wobei die zweite Woche zählt.",
                "Über eine Woche mit festem Wecker und Protokoll.",
                "Über den Vergleich mit dem Mittelwert der Bevölkerung.",
              ],
              answer: 0,
              explain:
                "İlk hafta yalnız telafi; ölçüt ikinci haftada oturan süre. Ortalamayla karşılaştırma açıkça yetersiz sayılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h2-13",
              no: 13,
              ref: "i1",
              text: "Wie bewertet sie Geräte zur Schlafaufzeichnung?",
              options: [
                "Sie sind für Dauer und Qualität gleichermaßen brauchbar.",
                "Sie sind grundsätzlich unbrauchbar.",
                "Sie messen die Dauer, nicht aber die Qualität zuverlässig.",
              ],
              answer: 2,
              explain:
                "\"Für die Dauer taugen sie, für die Qualität nicht\" — ölçülü bir yargı; ne tam kabul ne tam ret.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h2-14",
              no: 14,
              ref: "i1",
              text: "Welches zusätzliche Problem beschreibt sie?",
              options: [
                "Die Geräte wecken die Nutzer in ungünstigen Phasen.",
                "Manche Menschen fühlen sich durch die Zahlen schlecht bewertet.",
                "Die Daten der Geräte werden an Dritte weitergegeben.",
              ],
              answer: 1,
              explain:
                "İyi uyuyan insanlar bir sayı yüzünden kötü değerlendirilmiş hissediyor — ölçmenin kendisi bir sorun üretiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h2-15",
              no: 15,
              ref: "i1",
              text: "Welche Maßnahme hält sie für die wirksamste?",
              options: [
                "Eine konstante Aufstehzeit.",
                "Eine frühere Zubettgehzeit.",
                "Einen dunklen und kühlen Schlafraum.",
              ],
              answer: 0,
              explain:
                "\"die wirksamste einzelne Maßnahme ist die konstante Aufstehzeit, nicht die Zubettgehzeit\" — gerekçe sabah ışığı.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h2-16",
              no: 16,
              ref: "i1",
              text: "Was sagt sie zum Nachholen am Wochenende?",
              options: [
                "Es ist wirkungslos und sollte unterbleiben.",
                "Es gleicht das Defizit der Woche vollständig aus.",
                "In begrenztem Umfang ist es unproblematisch.",
              ],
              answer: 2,
              explain:
                "\"Ein bisschen geht. Zwei Stunden länger schaden nicht\" — ama pazar öğlene kadar uyumak iç saati kaydırıyor.",
            },
          ],
        },
        {
          id: "de-b2-02-h3",
          no: 3,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Sie hören eine Besprechung mit drei Personen. Wer sagt das? Wählen Sie zu den Aufgaben 17 bis 22. Sie hören den Text zweimal.",
          promptTr:
            "Üç kişilik bir toplantı dinleyeceksin. Bunu kim söylüyor? 17–22. maddeler için seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Besprechung",
              genreTr: "Toplantı",
              situation: "Bir araştırma ekibi anket projesini planlıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Ahrend",
                  text: "Bevor wir über die Fragen reden: Wir haben immer noch keine Definition dafür, was wir hier eigentlich messen wollen. Ohne die ist jeder Fragebogen beliebig.",
                },
                {
                  speaker: "Herr Nowak",
                  text: "Praktisch gesehen brauchen wir vor allem Leute, die antworten. Die letzte Befragung hatte elf Prozent Rücklauf. Eine perfekte Definition nützt uns bei elf Prozent gar nichts.",
                },
                {
                  speaker: "Frau Ceylan",
                  text: "Beides hängt zusammen. Der Rücklauf war niedrig, weil der Bogen dreißig Minuten gedauert hat. Kürzer wird er nur, wenn wir vorher wissen, was wir weglassen dürfen.",
                },
                {
                  speaker: "Herr Nowak",
                  text: "Dann kürzen wir eben. Ich würde die offenen Fragen streichen, die wertet ohnehin niemand richtig aus.",
                },
                {
                  speaker: "Frau Ceylan",
                  text: "Da widerspreche ich. Die offenen Antworten waren letztes Mal das Einzige, was uns überrascht hat. Streichen wir sie, hören wir nur noch, was wir schon vermutet haben.",
                },
                {
                  speaker: "Frau Ahrend",
                  text: "Ich schlage vor, wir behalten zwei offene Fragen und legen fest, wer sie auswertet. Sonst wiederholt sich das Problem.",
                },
                {
                  speaker: "Herr Nowak",
                  text: "Einverstanden, wenn wir zusätzlich eine Erinnerung nach zehn Tagen verschicken. Das hat beim letzten Mal mehr gebracht als alles andere.",
                },
                {
                  speaker: "Frau Ahrend",
                  text: "Notiert. Und wir testen den Bogen vorher an fünf Personen aus der Zielgruppe, nicht an Kolleginnen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-02-h3-17",
              no: 17,
              ref: "b1",
              text: "Ohne klare Definition ist der Fragebogen beliebig.",
              options: ["Frau Ahrend.", "Herr Nowak.", "Frau Ceylan."],
              answer: 0,
              explain: "Frau Ahrend toplantıyı bu itirazla açıyor: ölçülecek şey tanımlanmadan anket keyfî.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h3-18",
              no: 18,
              ref: "b1",
              text: "Das dringendste Problem ist der geringe Rücklauf.",
              options: ["Frau Ahrend.", "Herr Nowak.", "Frau Ceylan."],
              answer: 1,
              explain: "Herr Nowak yüzde on birlik dönüş oranını öne çıkarıyor: \"Eine perfekte Definition nützt uns bei elf Prozent gar nichts\".",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h3-19",
              no: 19,
              ref: "b1",
              text: "Die Länge des Bogens und die Definition hängen zusammen.",
              options: ["Frau Ahrend.", "Herr Nowak.", "Frau Ceylan."],
              answer: 2,
              explain:
                "Frau Ceylan iki tarafı birleştiriyor: kısaltma ancak neyin çıkarılabileceği bilindiğinde mümkün.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h3-20",
              no: 20,
              ref: "b1",
              text: "Ohne offene Fragen erfährt man nur das Erwartete.",
              options: ["Frau Ahrend.", "Herr Nowak.", "Frau Ceylan."],
              answer: 2,
              explain:
                "Frau Ceylan açık uçlu soruların savunusunu yapıyor: \"hören wir nur noch, was wir schon vermutet haben\".",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h3-21",
              no: 21,
              ref: "b1",
              text: "Eine Erinnerung nach zehn Tagen hat sich bewährt.",
              options: ["Frau Ahrend.", "Herr Nowak.", "Frau Ceylan."],
              answer: 1,
              explain:
                "Herr Nowak uzlaşmaya bu koşulu ekliyor ve geçen sefer en çok işe yarayan şeyin bu olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h3-22",
              no: 22,
              ref: "b1",
              text: "Der Bogen soll vorab an der Zielgruppe getestet werden.",
              options: ["Frau Ahrend.", "Herr Nowak.", "Frau Ceylan."],
              answer: 0,
              explain:
                "Frau Ahrend'in kapanış maddesi: beş kişilik ön test, meslektaşlarla değil, hedef gruptan kişilerle.",
            },
          ],
        },
        {
          id: "de-b2-02-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören einen Vortrag. Wählen Sie zu den Aufgaben 23 bis 30: a, b oder c. Sie hören den Text einmal.",
          promptTr: "Bir sunum dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              title: "Was der Placeboeffekt wirklich zeigt",
              situation: "Bir halka açık konferansta plasebo üzerine sunum.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Über den Placeboeffekt kursieren zwei Erzählungen, und beide sind falsch. Die eine sagt: Placebo heißt, es wirkt nichts. Die andere sagt: Placebo heißt, der Glaube heilt alles. Zwischen diesen beiden Sätzen liegt das Thema des Abends.",
                },
                {
                  text: "Beginnen wir mit einer Unterscheidung, die selten gemacht wird. In fast jeder Studie sehen wir eine Besserung auch in der Kontrollgruppe. Ein erheblicher Teil davon ist überhaupt kein Placeboeffekt, sondern schlicht der natürliche Verlauf: Die meisten Beschwerden gehen von allein zurück. Wer das nicht abzieht, überschätzt die Wirkung enorm.",
                },
                {
                  text: "Bleibt ein Rest, und der ist real. Am besten belegt ist er dort, wo das Erleben selbst das Ergebnis ist: bei Schmerz, bei Übelkeit, bei Erschöpfung. Bei einem Knochenbruch dagegen bewirkt keine Erwartung eine Heilung. Das ist die entscheidende Grenze.",
                },
                {
                  text: "Nun das Ergebnis, das die meisten überrascht. In mehreren Untersuchungen wussten die Teilnehmenden, dass sie ein Scheinmedikament erhielten — es stand auf der Packung. Der Effekt war trotzdem messbar. Die Vorstellung, es funktioniere nur durch Täuschung, ist damit nicht haltbar.",
                },
                {
                  text: "Woran liegt es dann? Die derzeit beste Erklärung ist die Erwartung, die das Gehirn selbst erzeugt. Das lässt sich sogar chemisch stören: Blockiert man bestimmte körpereigene Stoffe, verschwindet ein Teil der Wirkung. Es handelt sich also nicht um Einbildung im Alltagssinn.",
                },
                {
                  text: "Wichtig ist die Umkehrung, und sie wird fast nie erwähnt. Wer mit der Erwartung von Nebenwirkungen ein Mittel nimmt, bekommt sie häufiger. In der Kontrollgruppe brechen regelmäßig Menschen die Teilnahme wegen Nebenwirkungen ab, obwohl sie nur Zucker eingenommen haben.",
                },
                {
                  text: "Was folgt daraus für die Praxis? Sicher nicht, dass man Patientinnen täuschen soll. Sondern dass die Art, wie über eine Behandlung gesprochen wird, Teil der Behandlung ist. Ein Satz wie: Bei den meisten wirkt das gut, ist keine Höflichkeitsfloskel.",
                },
                {
                  text: "Und noch eine Konsequenz, die für die Forschung unbequem ist. Weil der Effekt in den letzten Jahrzehnten in einigen Bereichen gestiegen ist, fallen echte Wirkstoffe häufiger durch. Nicht, weil sie schlechter geworden wären, sondern weil die Vergleichsgruppe besser abschneidet.",
                },
              ],
              gloss: [
                { de: "der Verlauf", tr: "seyir", en: "course (of illness)" },
                { de: "das Scheinmedikament", tr: "sahte ilaç", en: "dummy medication" },
                { de: "die Einbildung", tr: "kuruntu", en: "imagination" },
                { de: "die Floskel", tr: "kalıp söz", en: "empty phrase" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-02-h4-23",
              no: 23,
              ref: "v1",
              text: "Wie beginnt der Vortragende sein Thema?",
              options: [
                "Er weist zwei verbreitete Auffassungen zurück.",
                "Er stellt die Geschichte der Forschung dar.",
                "Er nennt die Zahl der bisherigen Studien.",
              ],
              answer: 0,
              explain:
                "İki anlatının da yanlış olduğunu söyleyip konuyu ikisinin arasına yerleştiriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-24",
              no: 24,
              ref: "v1",
              text: "Warum wird der Effekt oft überschätzt?",
              options: [
                "Weil die Kontrollgruppen zu klein sind.",
                "Weil die Teilnehmenden ihre Beschwerden übertreiben.",
                "Weil der natürliche Verlauf nicht abgezogen wird.",
              ],
              answer: 2,
              explain:
                "Kontrol grubundaki iyileşmenin önemli bölümü kendiliğinden geçiş; bu ayrılmazsa etki abartılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-25",
              no: 25,
              ref: "v1",
              text: "Wo ist der Effekt am besten belegt?",
              options: [
                "Bei Erkrankungen mit klarem körperlichem Befund.",
                "Bei Beschwerden, die über das Erleben bestimmt werden.",
                "Bei chronischen Krankheiten im Frühstadium.",
              ],
              answer: 1,
              explain:
                "Ağrı, bulantı, yorgunluk — sonucun kendisi bir deneyim olduğu yerlerde. Kırık kemikte beklenti iyileştirmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-26",
              no: 26,
              ref: "v1",
              text: "Was zeigen die Studien mit offen gegebenem Scheinmedikament?",
              options: [
                "Der Effekt tritt auch ohne Täuschung auf.",
                "Der Effekt verschwindet, sobald die Teilnehmenden Bescheid wissen.",
                "Der Effekt lässt sich nur bei Kindern nachweisen.",
              ],
              answer: 0,
              explain:
                "Katılımcılar sahte ilaç aldıklarını biliyordu ve etki yine ölçülebildi: aldatma şart değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-27",
              no: 27,
              ref: "v1",
              text: "Womit begründet er, dass es sich nicht um bloße Einbildung handelt?",
              options: [
                "Mit der Dauer der beobachteten Wirkung.",
                "Mit Befragungen der Teilnehmenden nach der Studie.",
                "Damit, dass sich die Wirkung chemisch blockieren lässt.",
              ],
              answer: 2,
              explain:
                "Belirli vücut maddeleri bloke edildiğinde etkinin bir bölümü kayboluyor — bu, ölçülebilir bir mekanizmaya işaret ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-28",
              no: 28,
              ref: "v1",
              text: "Was beschreibt er als die Umkehrung des Effekts?",
              options: [
                "Erwartete Nebenwirkungen treten häufiger auf.",
                "Die Wirkung lässt bei wiederholter Gabe nach.",
                "Der Effekt kehrt sich bei jüngeren Menschen um.",
              ],
              answer: 0,
              explain:
                "Kontrol grubunda yalnız şeker alanların yan etki nedeniyle çalışmayı bıraktığı düzenli olarak görülüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-29",
              no: 29,
              ref: "v1",
              text: "Welche Folgerung zieht er für die Praxis?",
              options: [
                "Patientinnen sollten in Einzelfällen getäuscht werden dürfen.",
                "Die Art des Gesprächs ist Teil der Behandlung.",
                "Placebos sollten häufiger verschrieben werden.",
              ],
              answer: 1,
              explain:
                "Aldatmayı açıkça reddediyor; sonuç, tedaviden nasıl söz edildiğinin tedavinin parçası olduğu.",
            },
            {
              kind: "mcq",
              id: "de-b2-02-h4-30",
              no: 30,
              ref: "v1",
              text: "Welche Folge nennt er für die Forschung?",
              options: [
                "Studien werden häufiger vorzeitig abgebrochen.",
                "Kontrollgruppen sind schwerer zu rekrutieren.",
                "Wirksame Mittel scheitern häufiger im Vergleich.",
              ],
              answer: 2,
              explain:
                "Karşılaştırma grubu daha iyi sonuç verdiği için gerçek etkili maddeler daha sık eleniyor — maddeler kötüleştiği için değil.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 75,
      instruction: "Dieser Teil hat zwei Aufgaben: eine Meinungsäußerung und eine halb formelle Mitteilung.",
      instructionTr: "Bu bölümde iki görev var: bir görüş yazısı ve yarı resmî bir ileti.",
      tasks: [
        {
          id: "de-b2-02-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Unter einem Artikel mit dem Titel \"Braucht jede Empfehlung eine Zahl?\" können Leserinnen und Leser kommentieren. Schreiben Sie einen Beitrag (circa 150 Wörter).",
          promptTr:
            "\"Her öneriye bir sayı gerekli mi?\" başlıklı bir yazının altına okurlar yorum yazabiliyor. Bir yorum yaz (yaklaşık 150 kelime).",
          items: [],
          rubric: {
            minWords: 150,
            points: [
              { de: "Nehmen Sie Stellung zur Frage des Artikels.", tr: "Yazının sorusuna karşı tutumunu belirt." },
              { de: "Begründen Sie Ihre Position mit mindestens zwei Argumenten.", tr: "Tutumunu en az iki savla gerekçelendir." },
              { de: "Gehen Sie auf eine Gegenposition ein.", tr: "Karşı bir görüşü ele al." },
              { de: "Machen Sie einen Vorschlag oder ziehen Sie ein Fazit.", tr: "Bir öneride bulun ya da sonuca bağla." },
            ],
            sample: `Meine Antwort lautet: nicht jede, aber die meisten — und zwar aus zwei ganz unterschiedlichen Gründen.

Erstens ist eine Zahl überprüfbar. Wer sagt, man solle sich "ausreichend" bewegen, kann nie widerlegt werden; wer eine Zahl nennt, schon. Eine Empfehlung, die sich nicht prüfen lässt, ist keine Empfehlung, sondern eine Stimmung.

Zweitens ist sie teilbar. Fünftausend Schritte lassen sich auf drei Wege verteilen, "mehr Bewegung" nicht. Gerade Menschen mit wenig Zeit brauchen etwas, das sie planen können. Eine vage Empfehlung landet dagegen zuverlässig auf der Liste der Dinge, die man irgendwann einmal angehen will.

Nun wird eingewendet, Zahlen erzeugten Druck und ließen Menschen aufgeben, sobald sie das Ziel verfehlen. Diesen Einwand halte ich für berechtigt; ich habe ihn im eigenen Umfeld mehrfach beobachtet.

Er spricht aber nicht gegen Zahlen, sondern gegen ihre Darstellung. Sinnvoll wäre, jede Empfehlung mit einer Spannbreite zu veröffentlichen und die Untergrenze zu betonen. Wer weiß, dass schon dreitausend Schritte etwas bringen, hört nach zwei Wochen nicht auf.`,
            criteria: [
              "Dört içerik noktası da var mı?",
              "İki sav gerçekten farklı mı (burada: denetlenebilirlik ve bölünebilirlik)?",
              "Karşı görüş kabul edilip yanıtlanmış mı, yoksa yalnız reddedilmiş mi?",
              "Metin B2 bağlayıcılarıyla kurulmuş mu? (erstens … zweitens … nun wird eingewendet … er spricht aber …)",
              "Sonuç, ele alınan karşı görüşü dikkate alıyor mu?",
              "Yaklaşık 150 kelime var mı ve paragraflara ayrılmış mı?",
            ],
          },
        },
        {
          id: "de-b2-02-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben sich für eine Studie angemeldet, können den vereinbarten Termin aber nicht wahrnehmen. Schreiben Sie an die Studienleitung, Herrn Dr. Meinhardt (circa 100 Wörter).",
          promptTr:
            "Bir araştırmaya katılmak için kaydoldun ama kararlaştırılan randevuya gelemeyeceksin. Araştırma sorumlusu Dr. Meinhardt'a yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nennen Sie Ihren Termin und den Grund der Absage.", tr: "Randevunu ve iptal nedenini söyle." },
              { de: "Fragen Sie nach einem Ersatztermin.", tr: "Yeni bir tarih sor." },
              { de: "Klären Sie, was mit den bisherigen Daten geschieht.", tr: "Şimdiye kadarki verilerin ne olacağını sor." },
              { de: "Bestätigen Sie Ihr weiteres Interesse.", tr: "Katılmayı sürdürmek istediğini belirt." },
            ],
            sample: `Sehr geehrter Herr Dr. Meinhardt,

ich bin für den zweiten Termin am 14. Mai um 10 Uhr eingetragen. Leider muss ich diesen Termin absagen: Mein Arbeitgeber hat mich kurzfristig für diese Woche in eine andere Filiale versetzt.

Wäre es möglich, den Termin auf die folgende Woche zu verschieben? Mittwoch- oder Donnerstagvormittag würde mir gut passen.

Außerdem würde ich gern wissen, ob die Aufzeichnungen der vergangenen zwei Wochen weiter verwendet werden können oder ob die Messung neu beginnen muss. Das Messgerät habe ich seit dem ersten Termin durchgehend getragen und das Protokoll täglich geführt.

An der Teilnahme bin ich weiterhin sehr interessiert und bedaure die kurzfristige Absage.

Mit freundlichen Grüßen
Lea Brunner`,
            criteria: [
              "Dört içerik noktası da var mı?",
              "Randevu tanımlanabilir biçimde verilmiş mi (tarih, saat, kaçıncı seans)?",
              "İptal nedeni kısa ve inandırıcı mı, gereksiz ayrıntıya girilmiş mi?",
              "İstekler Konjunktiv II ile yumuşatılmış mı? (Wäre es möglich … / würde ich gern wissen)",
              "Resmî üslup ve doğru hitap kullanılmış mı?",
              "Yaklaşık 100 kelime var mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag mit Nachfragen und eine Diskussion.",
      instructionTr: "Bu bölümde iki görev var: sorularla birlikte bir sunum ve bir tartışma.",
      tasks: [
        {
          id: "de-b2-02-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wem glauben wir bei Gesundheitsfragen?\". Gliedern Sie ihn: Einleitung — Lage heute — zwei Ursachen — Bewertung — Schluss. Beantworten Sie anschließend zwei Nachfragen.",
          promptTr:
            "\"Sağlık konularında kime inanıyoruz?\" başlığında yaklaşık dört dakikalık bir sunum yap. Şöyle böl: giriş — bugünkü durum — iki neden — değerlendirme — sonuç. Ardından iki soruyu cevapla.",
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "den Vortrag klar gliedern", tr: "Sunumu açıkça bölümlemek" },
              { de: "zwei Ursachen unterscheiden und belegen", tr: "İki nedeni ayırmak ve dayanak vermek" },
              { de: "eine begründete Bewertung abgeben", tr: "Gerekçeli bir değerlendirme yapmak" },
              { de: "auf Nachfragen sachlich antworten", tr: "Sorulara konu üzerinden cevap vermek" },
            ],
            sample:
              "Ich möchte der Frage nachgehen, wem wir bei Gesundheitsfragen eigentlich glauben. Dazu beschreibe ich zunächst die heutige Lage, nenne dann zwei Ursachen und komme abschließend zu einer Einschätzung. Auffällig ist zunächst, dass Vertrauen heute weniger an Institutionen hängt als an einzelnen Personen: Eine Ärztin mit Reichweite erreicht mehr Menschen als jede Behörde. Eine erste Ursache sehe ich darin, dass Empfehlungen sich sichtbar geändert haben; wer mehrfach etwas anderes gehört hat, sucht nach jemandem, der wenigstens gleich bleibt. Eine zweite Ursache ist die Sprache: Fachliche Vorsicht klingt wie Unsicherheit, während eine klare Aussage Kompetenz suggeriert, auch wenn sie schlechter belegt ist. Ich bewerte diese Entwicklung zurückhaltend. Persönliches Vertrauen ist nicht grundsätzlich falsch, aber es ist nicht überprüfbar. Mein Fazit lautet deshalb, dass Institutionen nicht lauter, sondern verständlicher werden müssen — und dass sie erklären sollten, warum sich eine Empfehlung geändert hat.",
            criteria: [
              "Sunumun bölümleri işitiliyor mu?",
              "İki neden birbirinden gerçekten ayrılıyor mu?",
              "Değerlendirme ölçülü mü ve gerekçelendirilmiş mi?",
              "Sorular konu üzerinden cevaplanıyor mu?",
              "Söz dağarcığı B2 düzeyinde mi? (Einschätzung, suggerieren, zurückhaltend)",
              "Süre dört dakikaya yakın mı?",
            ],
          },
        },
        {
          id: "de-b2-02-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Diskutieren Sie: \"Sollen Krankenkassen Fitnessdaten belohnen?\" Vertreten Sie eine Position, gehen Sie auf Ihr Gegenüber ein und suchen Sie am Ende einen gemeinsamen Nenner.",
          promptTr:
            "Tartış: \"Sağlık sigortaları hareket verilerini ödüllendirmeli mi?\" Bir tutum al, karşındakine karşılık ver ve sonunda ortak bir zemin ara.",
          prepSeconds: 90,
          exchange: [
            { who: "partner", de: "Unsere Frage lautet: Sollen Krankenkassen Fitnessdaten belohnen? Ich fange an: Ich bin dafür, weil ein kleiner Anreiz gerade die Menschen erreicht, die von allein nicht anfangen. Wie sehen Sie das?", tr: "Sorumuz şu: Sağlık sigortaları hareket verilerini ödüllendirmeli mi? Ben başlıyorum: Yanayım, çünkü küçük bir teşvik tam da kendiliğinden başlamayanlara ulaşıyor. Sen ne düşünüyorsun?" },
            { who: "you", hint: "Tutumunu açıkça belirt ve bir savla gerekçelendir.", expect: "bir tutum almak ve onu bir savla gerekçelendirmek", seconds: 50 },
            { who: "partner", de: "Den Einwand nehme ich ernst. Aber sehen Sie nicht die Gefahr, dass am Ende belohnt wird, wer ohnehin Zeit und Gesundheit hat?", tr: "İtirazını ciddiye alıyorum. Ama sonunda zaten vakti ve sağlığı olanın ödüllendirilmesi tehlikesini görmüyor musun?" },
            { who: "you", hint: "İtirazı ele al ve konumunu netleştir.", expect: "karşı savı ele almak ve kendi konumunu ayrıntılandırmak", seconds: 50 },
            { who: "partner", de: "Verstanden. Wie ließe sich das Ihrer Meinung nach entschärfen, ohne den Anreiz ganz aufzugeben?", tr: "Anlaşıldı. Sence teşviki tümüyle bırakmadan bu nasıl yumuşatılabilir?" },
            { who: "you", hint: "Somut bir çözüm öner.", expect: "somut ve uygulanabilir bir çözüm önermek", seconds: 50 },
            { who: "partner", de: "Das klingt tragfähig. Halten wir am Ende fest, worauf wir uns geeinigt haben?", tr: "Bu sağlam görünüyor. Sonunda neyde anlaştığımızı belirleyelim mi?" },
            { who: "you", hint: "Ortak zemini özetle.", expect: "varılan ortak sonucu açıkça özetlemek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "die eigene Position klar vertreten", tr: "Kendi tutumunu açıkça savunmak" },
              { de: "das Gegenargument aufnehmen, nicht übergehen", tr: "Karşı savı geçiştirmeden ele almak" },
              { de: "höflich widersprechen", tr: "Kibarca karşı çıkmak" },
              { de: "zu einem gemeinsamen Ergebnis kommen", tr: "Ortak bir sonuca varmak" },
            ],
            sample:
              "Ich bin dagegen, und zwar weniger aus Datenschutzgründen als aus Gerechtigkeitsgründen. Belohnt wird am Ende, wer ohnehin Zeit und Gesundheit hat. — Das sehe ich anders. Ein kleiner Anreiz bringt gerade Menschen in Bewegung, die von allein nicht anfangen. — Diesen Punkt nehme ich ernst, er stimmt für die erste Zeit. Nur wird der Bonus dauerhaft gezahlt, und dann verstärkt er bestehende Unterschiede. Wer im Schichtdienst arbeitet, erreicht die Vorgabe nie. — Wenn man die Vorgaben nach Lebenslage staffelt, wäre das entschärft. — Damit könnte ich mitgehen: kein Bonus für Werte, sondern für Teilnahme an Angeboten. Halten wir das so fest?",
            criteria: [
              "Tutum açıkça alındı ve tutarlı biçimde savunuldu mu?",
              "Karşı sav gerçekten ele alındı mı? (\"Diesen Punkt nehme ich ernst …\")",
              "Karşı çıkışlar kibar kalıplarla mı yapıldı?",
              "Sonunda ortak bir zemin adlandırıldı mı?",
              "Konuşma sırası dengeli paylaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
