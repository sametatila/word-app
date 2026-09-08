import type { MockPaper } from "../types";

/**
 * B2 · Deneme 9 — "Recht und Regeln".
 *
 * PLAN kâğıt 1–8 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme · 6 köşe yazısı
 *                              · 6 görüş eşleştirme · 3 yönetmelik)
 *   Hören  40 dk · 30 madde   (10 karma · 6 söyleşi · 6 tartışma · 8 ana fikir)
 *   Schreiben 75 dk           okur mektubu (~150) + yarı resmî ileti (~100)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: kural ve yaptırım. B2'nin ölçtüğü akıl yürütme bu alanda
 * doğal olarak ortaya çıkıyor: bir kuralın haklı olması onun işlediği
 * anlamına gelmiyor, ve bir yaptırımın adil görünmesi herkese aynı ağırlıkta
 * düştüğü anlamına gelmiyor. İlk sekiz kâğıt bu alana girmedi.
 *
 * ŞIK UZUNLUKLARI ve anahtar dağılımı görev görev planlandı; forum ve
 * dinleme bölümlerinde doğru şık bilerek en uzun şık değil.
 */
export const B2_09: MockPaper = {
  id: "de-b2-09",
  course: "de",
  level: "B2",
  no: 9,
  theme: "Recht und Regeln",
  themeTr: "Hukuk ve kurallar",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Texte, einen Sachtext mit Lücken, einen Kommentar, Meinungsbeiträge und eine Ordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel metinler, boşluklu bir bilgi metni, bir köşe yazısı, görüş yazıları ve bir yönetmelik okuyacaksın.",
      tasks: [
        {
          id: "de-b2-09-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben über Regeln in ihrem Arbeitsalltag. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi iş hayatındaki kurallar üzerine yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Riedl, Mitarbeiterin im Ordnungsamt",
              body: `Ich schreibe Verwarnungen, und ich weiß, wie wenig das bewirkt.

Was mich überrascht hat: Die meisten Menschen kennen die Regel, die sie brechen. Sie halten die Kontrolle nur für unwahrscheinlich. Das ist keine Frage der Erziehung, sondern der Erwartung.

Wirksam ist bei uns nicht die Höhe des Betrags, sondern die Dichte. In einer Straße, in der wir dreimal die Woche laufen, ändert sich das Verhalten in vier Wochen. Wo wir einmal im Monat kommen, ändert sich nichts.

Belastend bleibt etwas anderes: Ich vollziehe Regeln, an deren Zustandekommen ich nicht beteiligt war und die ich manchmal selbst für falsch halte.`,
              gloss: [
                { de: "die Verwarnung", tr: "uyarı cezası", en: "warning notice" },
                { de: "die Dichte", tr: "sıklık, yoğunluk", en: "density, frequency" },
                { de: "vollziehen", tr: "uygulamak", en: "to enforce" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Osterkamp, Rechtsanwalt",
              body: `In meiner Beratung geht es selten um das Recht selbst.

Es geht darum, ob jemand die Kraft hat, es durchzusetzen. Wer im Recht ist und keine Zeit hat, verliert praktisch — auch wenn er formal gewinnen würde.

Deshalb halte ich die Frage, ob eine Regel gerecht ist, für die kleinere Hälfte. Die größere ist, wie viele Schritte nötig sind, bis sie greift.

Was ich täglich sehe: Wer einmal erlebt hat, dass eine Beschwerde nichts bewirkt, beschwert sich beim zweiten Mal nicht mehr. Das ist kein Vertrauensverlust in das Recht, sondern eine nüchterne Rechnung.`,
              gloss: [
                { de: "durchsetzen", tr: "hayata geçirmek", en: "to enforce, assert" },
                { de: "greifen", tr: "işlemeye başlamak", en: "to take effect" },
                { de: "nüchtern", tr: "soğukkanlı", en: "sober, matter-of-fact" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Frau Wenninger, Vorsitzende eines Sportvereins",
              body: `Unsere Satzung hat vierzehn Seiten, und ich glaube nicht, dass sie fünf Leute gelesen haben.

Trotzdem funktioniert der Verein, und zwar aus einem einfachen Grund: Alle wissen, wer im Zweifel entscheidet. Eine Regel, die niemand kennt, ersetzt eine Person, die alle kennen — solange diese Person berechenbar bleibt.

Schwierig wird es, wenn zwei Regeln sich widersprechen. Dann entscheidet nicht die Satzung, sondern wer zuerst fragt.

Verändert hat sich seit der letzten Wahl vor allem eines: Wir schreiben Entscheidungen auf. Nicht wegen der Kontrolle, sondern damit die nächste Vorsitzende nicht bei null anfängt.`,
              gloss: [
                { de: "die Satzung", tr: "tüzük", en: "statutes, constitution" },
                { de: "berechenbar", tr: "öngörülebilir", en: "predictable" },
                { de: "sich widersprechen", tr: "birbiriyle çelişmek", en: "to contradict each other" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Herr Belz, Schulleiter",
              body: `Ich habe in fünfzehn Jahren drei Hausordnungen erlebt und aus jeder dasselbe gelernt.

Eine Regel, die man nicht überprüfen kann, schadet mehr als keine Regel. Sie zeigt jeden Tag, dass geschriebene Sätze folgenlos bleiben, und das überträgt sich auf die Regeln, die uns wichtig sind.

Wir haben deshalb von zweiundzwanzig Punkten auf sieben gekürzt. Die Zahl der Konflikte ist danach nicht gestiegen, sondern leicht gefallen.

Der eigentliche Streit war nicht mit den Schülerinnen, sondern im Kollegium. Jede gestrichene Regel war jemandes Anliegen.`,
              gloss: [
                { de: "überprüfen", tr: "denetlemek", en: "to check, verify" },
                { de: "folgenlos", tr: "sonuçsuz", en: "without consequence" },
                { de: "das Anliegen", tr: "önemsenen konu", en: "concern, cause" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-09-l1-1",
              no: 1,
              text: "Wer sagt, dass die Häufigkeit der Kontrolle wichtiger ist als die Strafe?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 0,
              explain:
                "\"Wirksam ist bei uns nicht die Höhe des Betrags, sondern die Dichte\" — haftada üç kez geçilen sokakta davranış dört haftada değişiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-2",
              no: 2,
              text: "Wer beschreibt, dass eine nicht überprüfbare Regel schadet?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 3,
              explain:
                "\"Eine Regel, die man nicht überprüfen kann, schadet mehr als keine Regel\" — çünkü yazılı cümlelerin sonuçsuz kaldığını her gün gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-3",
              no: 3,
              text: "Wer hält den Aufwand für wichtiger als die Gerechtigkeit der Regel?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 1,
              explain:
                "Adalet sorusunu \"die kleinere Hälfte\" sayıyor; büyük olan \"wie viele Schritte nötig sind, bis sie greift\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-4",
              no: 4,
              text: "Wer sagt, dass eine bekannte Person eine unbekannte Regel ersetzen kann?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 2,
              explain:
                "\"Eine Regel, die niemand kennt, ersetzt eine Person, die alle kennen — solange diese Person berechenbar bleibt.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-5",
              no: 5,
              text: "Wer belegt eine Veränderung mit Zahlen?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 3,
              explain:
                "\"von zweiundzwanzig Punkten auf sieben gekürzt\" — ve çatışma sayısı bunun ardından hafifçe düşmüş.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-6",
              no: 6,
              text: "Wer sagt, dass Menschen die Regel kennen und trotzdem brechen?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 0,
              explain:
                "\"Die meisten Menschen kennen die Regel, die sie brechen. Sie halten die Kontrolle nur für unwahrscheinlich.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-7",
              no: 7,
              text: "Wer berichtet von Widerstand aus dem eigenen Umfeld?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 3,
              explain:
                "\"Der eigentliche Streit war nicht mit den Schülerinnen, sondern im Kollegium\" — silinen her kural birinin önem verdiği bir konuymuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-8",
              no: 8,
              text: "Wer erklärt, warum Menschen sich ein zweites Mal nicht mehr beschweren?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 1,
              explain:
                "Bunu güven kaybı değil hesap olarak açıklıyor: \"Das ist kein Vertrauensverlust in das Recht, sondern eine nüchterne Rechnung.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l1-9",
              no: 9,
              text: "Wer vollzieht Regeln, die er oder sie selbst für falsch hält?",
              options: ["Frau Riedl", "Herr Osterkamp", "Frau Wenninger", "Herr Belz"],
              answer: 0,
              explain:
                "\"Ich vollziehe Regeln, an deren Zustandekommen ich nicht beteiligt war und die ich manchmal selbst für falsch halte.\"",
            },
          ],
        },
        {
          id: "de-b2-09-l2",
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
              title: "Warum Regeln scheitern, die alle richtig finden",
              body: `Es gibt Regeln, gegen die kaum jemand etwas einwendet und die trotzdem folgenlos bleiben. Das Rätsel liegt selten in der Regel selbst. {{10}}

Der erste Grund ist die Sichtbarkeit. Wer eine Regel bricht, tut das meistens dort, wo niemand hinsieht. {{11}}

Der zweite Grund betrifft die Zuständigkeit. Häufig ist eine Behörde für die Regel verantwortlich, eine andere für die Kontrolle. {{12}}

Hinzu kommt ein Zeitproblem. Die Wirkung einer Kontrolle hält nur so lange an, wie sie erwartet wird. {{13}}

Auffällig ist, wie selten die Kosten der Durchsetzung mitgedacht werden. Eine Regel gilt als beschlossen, wenn sie im Text steht. {{14}}

Aus alldem folgt keine Empfehlung gegen Regeln. Es folgt eine unbequeme Reihenfolge: erst prüfen, ob eine Regel überprüfbar ist, dann sie beschließen. {{15}}

Was bleibt, ist eine schlichte Einsicht: Nicht die Zustimmung entscheidet über die Wirkung, sondern die Wahrscheinlichkeit, entdeckt zu werden.`,
              gloss: [
                { de: "einwenden", tr: "itiraz etmek", en: "to object" },
                { de: "die Zuständigkeit", tr: "yetki alanı", en: "responsibility" },
                { de: "die Durchsetzung", tr: "uygulanma", en: "enforcement" },
                { de: "die Wahrscheinlichkeit", tr: "olasılık", en: "probability" },
              ],
            },
          ],
          options: [
            { key: "a", label: "a", body: "Sie liegt fast immer im Weg von der Vorschrift bis zur Wirkung." },
            {
              key: "b",
              label: "b",
              body: "Wo beide Aufgaben in einer Hand liegen, sinkt die Zahl der Verstöße messbar.",
            },
            {
              key: "c",
              label: "c",
              body: "Sinkt diese Erwartung, kehrt das alte Verhalten binnen weniger Wochen zurück.",
            },
            {
              key: "d",
              label: "d",
              body: "Ob jemand hinschaut, entscheidet daher mehr als die angedrohte Strafe.",
            },
            {
              key: "e",
              label: "e",
              body: "Die Frage, wer sie anschließend kontrolliert, wird in derselben Sitzung selten gestellt.",
            },
            {
              key: "f",
              label: "f",
              body: "Diese Reihenfolge ist unbeliebt, weil sie manchen Beschluss von vornherein verhindert.",
            },
            { key: "g", label: "g", body: "Die Zahl der Vorschriften ist in zehn Jahren deutlich gesunken." },
            { key: "h", label: "h", body: "Über die Höhe der Bußgelder entscheidet in der Regel das Land." },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-09-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "a",
              explain:
                "Önceki cümle sorunun kuralda olmadığını söylüyor; (a) nerede olduğunu veriyor — \"im Weg von der Vorschrift bis zur Wirkung\" — ve sonraki paragrafların ikisi de o yolun bir adımını anlatıyor.",
            },
            {
              kind: "match",
              id: "de-b2-09-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "d",
              explain:
                "Paragraf ihlalin \"dort, wo niemand hinsieht\" olduğunu söylüyor; (d) sonucu çıkarıyor: \"Ob jemand hinschaut, entscheidet daher mehr als die angedrohte Strafe.\"",
            },
            {
              kind: "match",
              id: "de-b2-09-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "b",
              explain:
                "Sorun \"eine Behörde für die Regel … eine andere für die Kontrolle\" biçiminde veriliyor; (b) karşıt durumu ekliyor: \"Wo beide Aufgaben in einer Hand liegen, sinkt die Zahl der Verstöße messbar.\"",
            },
            {
              kind: "match",
              id: "de-b2-09-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "c",
              explain:
                "Metin etkiyi beklentiye bağlıyor: \"nur so lange an, wie sie erwartet wird\". (c) beklenti düştüğünde ne olduğunu tamamlıyor: \"kehrt das alte Verhalten binnen weniger Wochen zurück\".",
            },
            {
              kind: "match",
              id: "de-b2-09-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "e",
              explain:
                "\"Eine Regel gilt als beschlossen, wenn sie im Text steht\" deniyor; (e) sorulmayan soruyu adlandırıyor: \"wer sie anschließend kontrolliert, wird in derselben Sitzung selten gestellt\".",
            },
            {
              kind: "match",
              id: "de-b2-09-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "f",
              explain:
                "Sıra veriliyor: \"erst prüfen, ob eine Regel überprüfbar ist, dann sie beschließen\". (f) neden sevilmediğini söylüyor: \"weil sie manchen Beschluss von vornherein verhindert\".",
            },
          ],
        },
        {
          id: "de-b2-09-l3",
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
              title: "Das Bußgeld, das nicht alle gleich trifft",
              body: `Ein Bußgeld von fünfundfünfzig Euro ist für die meisten Menschen ärgerlich. Für manche ist es der halbe Wocheneinkauf, für andere der Preis eines Abendessens.

Die Zahl ist dieselbe, die Wirkung ist es nicht. Wer das bestreitet, müsste erklären, warum wir bei Steuern seit über hundert Jahren anders rechnen.

Der Vorschlag, Bußgelder am Einkommen zu bemessen, ist deshalb weder neu noch radikal. Mehrere Nachbarländer verfahren so, und die Systeme sind daran nicht zerbrochen.

Man wird einwenden, die Verwaltung sei damit überfordert. Der Einwand ist ernst zu nehmen und lässt sich prüfen: In den Ländern, die so rechnen, liegt der Aufwand pro Fall messbar höher, aber nicht dramatisch.

Schwerer wiegt ein anderer Punkt, den die Befürworter selten nennen — ich schließe mich ein. Ein einkommensabhängiges Bußgeld macht das Einkommen zu einer amtlich erfassten Größe im Straßenverkehr. Wer Datensparsamkeit fordert und zugleich diese Reform, muss das aushalten.

Bemerkenswert ist, wer den Vorschlag am lautesten ablehnt. Nicht die Betroffenen mit kleinem Einkommen, sondern jene, für die das heutige Bußgeld ohnehin folgenlos bleibt.

Mein Fazit fällt entsprechend unbequem aus: Ich halte die Reform für richtig und ihren Preis für real. Wer beides nicht zusammen nennt, verkauft eine halbe Rechnung.`,
              gloss: [
                { de: "das Bußgeld", tr: "idari para cezası", en: "administrative fine" },
                { de: "bemessen", tr: "ölçüye bağlamak", en: "to assess, calculate" },
                { de: "überfordert", tr: "gücünü aşan", en: "overwhelmed" },
                { de: "die Datensparsamkeit", tr: "veri asgariliği", en: "data minimisation" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-09-l3-16",
              no: 16,
              ref: "k1",
              text: "Womit begründet der Autor die Ungleichheit der Wirkung?",
              options: [
                "Mit der Höhe der Verwaltungskosten.",
                "Mit dem Verhältnis zum Einkommen.",
                "Mit der Zahl der Verstöße.",
              ],
              answer: 1,
              explain:
                "Aynı tutarın farklı şey demek olduğunu örnekliyor: \"Für manche ist es der halbe Wocheneinkauf, für andere der Preis eines Abendessens.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l3-17",
              no: 17,
              ref: "k1",
              text: "Wie stützt er seinen Vorschlag?",
              options: [
                "Mit dem Hinweis auf andere Länder.",
                "Mit einer eigenen Berechnung.",
                "Mit einer Umfrage unter Betroffenen.",
              ],
              answer: 0,
              explain:
                "\"Mehrere Nachbarländer verfahren so, und die Systeme sind daran nicht zerbrochen\" — ayrıca vergideki hesap biçimine de gönderme yapıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l3-18",
              no: 18,
              ref: "k1",
              text: "Wie geht er mit dem Verwaltungseinwand um?",
              options: [
                "Er weist den Einwand als vorgeschoben zurück.",
                "Er übergeht den Aufwand ganz.",
                "Er nimmt ihn ernst und relativiert ihn.",
              ],
              answer: 2,
              explain:
                "\"Der Einwand ist ernst zu nehmen und lässt sich prüfen\" — masraf ölçülebilir biçimde yüksek ama \"nicht dramatisch\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l3-19",
              no: 19,
              ref: "k1",
              text: "Welchen Preis der Reform nennt er?",
              options: [
                "Höhere Kosten für die Betroffenen.",
                "Das Einkommen wird amtlich erfasst.",
                "Mehr Verstöße im Straßenverkehr.",
              ],
              answer: 1,
              explain:
                "Kendi tarafının bedelini söylüyor: reform geliri \"zu einer amtlich erfassten Größe im Straßenverkehr\" yapıyor — ve kendini de içine katıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l3-20",
              no: 20,
              ref: "k1",
              text: "Wer lehnt den Vorschlag nach ihm am lautesten ab?",
              options: [
                "Menschen mit kleinem Einkommen.",
                "Die zuständigen Behörden.",
                "Menschen, die das Bußgeld kaum spüren.",
              ],
              answer: 2,
              explain:
                "\"Nicht die Betroffenen mit kleinem Einkommen, sondern jene, für die das heutige Bußgeld ohnehin folgenlos bleibt.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l3-21",
              no: 21,
              ref: "k1",
              text: "Wie fasst er seine Position zusammen?",
              options: [
                "Die Reform ist richtig und hat einen Preis.",
                "Die Reform ist nur theoretisch sinnvoll.",
                "Die Reform sollte verschoben werden.",
              ],
              answer: 0,
              explain:
                "\"Ich halte die Reform für richtig und ihren Preis für real. Wer beides nicht zusammen nennt, verkauft eine halbe Rechnung.\"",
            },
          ],
        },
        {
          id: "de-b2-09-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Bußgelder nach dem Einkommen berechnet werden sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, idari para cezalarının gelire göre hesaplanıp hesaplanmaması konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Tuncer, Richterin",
              body: "Im Strafrecht rechnen wir längst nach Tagessätzen, und niemand hält das für Willkür. Dass wir es im Ordnungsrecht nicht tun, ist keine Entscheidung, sondern ein historischer Zufall.",
            },
            {
              key: "b",
              label: "b — Herr Grohe, Fahrlehrer",
              body: "Meine Schüler fragen nicht, was es kostet, sondern ob jemand kontrolliert. Solange die Antwort selten lautet, ändert auch ein höherer Betrag nichts. Wir diskutieren über die falsche Stellschraube.",
            },
            {
              key: "c",
              label: "c — Frau Lammers, Verwaltungsangestellte",
              body: "Ich müsste künftig Einkommen prüfen, ohne dafür ausgebildet zu sein. Wir bekommen Angaben, die wir nicht kontrollieren können, und tragen am Ende die Verantwortung für die Zahl.",
            },
            {
              key: "d",
              label: "d — Herr Pichler, Unternehmer",
              body: "Ich zahle Bußgelder aus der Portokasse und gebe zu: Sie erreichen mich nicht. Trotzdem bin ich dagegen, weil der Staat damit anfängt, mein Einkommen in immer mehr Zusammenhängen zu kennen.",
            },
            {
              key: "e",
              label: "e — Frau Nissen, Sozialberaterin",
              body: "Bei mir sitzen Menschen, für die fünfundfünfzig Euro eine Woche ohne Einkauf bedeuten. Für sie ist die heutige Regel keine Gleichbehandlung, sondern eine besonders harte Strafe.",
            },
            {
              key: "f",
              label: "f — Herr Ahrend, Ökonom",
              body: "Der Effekt auf das Verhalten ist in den Studien kleiner, als beide Seiten behaupten. Was sich zeigt, ist etwas anderes: Die Akzeptanz des Systems steigt, wenn die Last als verteilt gilt.",
            },
            {
              key: "g",
              label: "g — Frau Kilar, Polizistin",
              body: "Für mich ändert sich an der Kontrolle nichts. Was sich ändert, ist das Gespräch am Straßenrand: Ich müsste erklären, warum der eine mehr zahlt als der andere, und dafür bin ich nicht zuständig.",
            },
            {
              key: "h",
              label: "h — Herr Stadler, Rentner",
              body: "Ich verstehe beide Seiten und habe deshalb keine feste Meinung. Sicher scheint mir nur, dass die Debatte lauter geführt wird als sie es verdient.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-09-l4-22",
              no: 22,
              text: "In einem anderen Rechtsgebiet ist diese Rechenweise längst üblich.",
              answer: "a",
              explain:
                "(a) ceza hukukundaki gün karşılığı sistemini örnek veriyor ve bugünkü farkı \"ein historischer Zufall\" sayıyor.",
            },
            {
              kind: "match",
              id: "de-b2-09-l4-23",
              no: 23,
              text: "Entscheidend ist nicht der Betrag, sondern die Kontrolle.",
              answer: "b",
              explain:
                "(b) öğrencilerinin sorusunu aktarıyor: fiyat değil denetim soruluyor — \"Wir diskutieren über die falsche Stellschraube.\"",
            },
            {
              kind: "match",
              id: "de-b2-09-l4-24",
              no: 24,
              text: "Die Verantwortung für eine Zahl liegt bei Menschen, die sie nicht prüfen können.",
              answer: "c",
              explain:
                "(c) kendi işini anlatıyor: kontrol edilemeyen beyanlar geliyor \"und tragen am Ende die Verantwortung für die Zahl\".",
            },
            {
              kind: "match",
              id: "de-b2-09-l4-25",
              no: 25,
              text: "Die heutige Regel trifft die Ärmsten am härtesten.",
              answer: "e",
              explain:
                "(e) somut karşılığını veriyor: elli beş euro \"eine Woche ohne Einkauf\" demek, bu yüzden eşit muamele sayılmıyor.",
            },
            {
              kind: "match",
              id: "de-b2-09-l4-26",
              no: 26,
              text: "Der messbare Gewinn liegt eher in der Akzeptanz als im Verhalten.",
              answer: "f",
              explain:
                "(f) davranış etkisini küçültüp başka bir sonucu öne çıkarıyor: \"Die Akzeptanz des Systems steigt, wenn die Last als verteilt gilt.\"",
            },
            {
              kind: "match",
              id: "de-b2-09-l4-27",
              no: 27,
              text: "Die Begründung müsste jemand leisten, der dafür nicht vorgesehen ist.",
              answer: "g",
              explain:
                "(g) denetimin değişmeyeceğini ama yol kenarındaki konuşmanın değişeceğini söylüyor: \"dafür bin ich nicht zuständig\".",
            },
          ],
        },
        {
          id: "de-b2-09-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Ordnung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Yönetmeliği ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Verfahrensordnung",
              genreTr: "Usul yönetmeliği",
              title: "Verwarnungs- und Bußgeldverfahren — Auszug",
              body: `§1 Verwarnung
Bei geringfügigen Verstößen kann eine Verwarnung mit Verwarnungsgeld erteilt werden. Sie wird nur wirksam, wenn die betroffene Person einverstanden ist und innerhalb einer Woche zahlt. Andernfalls wird ein Bußgeldverfahren eingeleitet.

§2 Anhörung
Vor Erlass eines Bußgeldbescheids ist Gelegenheit zur Äußerung zu geben. Die Frist beträgt zwei Wochen ab Zustellung des Anhörungsbogens. Eine Äußerung ist nicht verpflichtend; ihr Ausbleiben darf nicht zum Nachteil gewertet werden.

§3 Einspruch
Gegen den Bußgeldbescheid kann binnen zwei Wochen Einspruch eingelegt werden. Der Einspruch bedarf der Schriftform; eine telefonische Erklärung genügt nicht.

§4 Kosten
Wird der Einspruch zurückgenommen, trägt die einlegende Person die bis dahin entstandenen Kosten. Bei erfolgreichem Einspruch entfallen Gebühren und Auslagen vollständig.`,
              gloss: [
                { de: "geringfügig", tr: "önemsiz, hafif", en: "minor" },
                { de: "die Anhörung", tr: "savunma alma", en: "hearing" },
                { de: "der Einspruch", tr: "itiraz", en: "objection, appeal" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-09-l5-28",
              no: 28,
              ref: "o1",
              text: "Wann wird eine Verwarnung wirksam?",
              options: [
                "Sobald sie ausgesprochen worden ist.",
                "Nach Ablauf der zweiwöchigen Frist.",
                "Bei Einverständnis und fristgerechter Zahlung.",
              ],
              answer: 2,
              explain:
                "§1 iki koşulu birlikte istiyor: kişinin rızası ve bir hafta içinde ödeme; yoksa idari para cezası süreci başlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l5-29",
              no: 29,
              ref: "o1",
              text: "Was gilt, wenn sich jemand nicht äußert?",
              options: [
                "Das darf nicht negativ gewertet werden.",
                "Der Bescheid wird sofort rechtskräftig.",
                "Die Frist verlängert sich um zwei Wochen.",
              ],
              answer: 0,
              explain:
                "§2 açıkça yazıyor: beyan zorunlu değil ve \"ihr Ausbleiben darf nicht zum Nachteil gewertet werden\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-l5-30",
              no: 30,
              ref: "o1",
              text: "Wer trägt die Kosten bei einer Rücknahme des Einspruchs?",
              options: [
                "Die Behörde, die den Bescheid erlassen hat.",
                "Die Person, die ihn eingelegt hat.",
                "Beide Seiten teilen sich die Auslagen.",
              ],
              answer: 1,
              explain:
                "§4 iki durumu ayırıyor: geri çekmede masrafı itiraz eden taşıyor, başarılı itirazda ise ücretler tümüyle düşüyor.",
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
          id: "de-b2-09-h1",
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
              situation: "Bir birim taşınıyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für Besucherinnen und Besucher: Die Bußgeldstelle befindet sich ab Montag im Anbau, Zimmer zweihundertdrei. Anhörungsbögen können Sie weiterhin am Empfang abgeben; eine persönliche Vorsprache ist dafür nicht nötig.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Denetim sıklığı üzerine bir değerlendirme.",
              plays: 1,
              segments: [
                {
                  text: "Eine Auswertung aus drei Städten zeigt: Die Höhe des Bußgelds erklärt die Zahl der Verstöße kaum. Deutlich stärker wirkt, wie oft kontrolliert wird. In der Stadt mit der niedrigsten Strafe, aber der dichtesten Kontrolle lagen die Verstöße am niedrigsten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir hukuk bürosu süre hatırlatıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Wenninger, hier ist die Kanzlei Osterkamp. Ihr Bescheid ist am Elften zugestellt worden, die Einspruchsfrist läuft also am Fünfundzwanzigsten ab. Ein Anruf reicht nicht, wir brauchen es schriftlich.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Mitgliederversammlung",
              genreTr: "Genel kurulda duyuru",
              situation: "Tüzük değişikliği oylanacak.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir abstimmen: Für die Satzungsänderung brauchen wir zwei Drittel der anwesenden Stimmen, nicht die einfache Mehrheit. Enthaltungen zählen dabei nicht mit. Wer das anders in Erinnerung hat, verwechselt es mit der Wahl des Vorstands.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Belediye bir başvuruyu reddediyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Belz, hier ist das Ordnungsamt. Ihr Antrag auf eine Ausnahme für den Schulhof ist abgelehnt worden. Die Begründung geht Ihnen schriftlich zu. Gegen die Ablehnung können Sie Widerspruch einlegen, dafür haben Sie einen Monat.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-09-h1-1",
              no: 1,
              ref: "h1",
              text: "Anhörungsbögen muss man persönlich in der Bußgeldstelle abgeben.",
              answer: false,
              explain:
                "Anons tersini söylüyor: formlar danışmaya bırakılabiliyor ve \"eine persönliche Vorsprache ist dafür nicht nötig\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h1-2",
              no: 2,
              ref: "h1",
              text: "Was ändert sich ab Montag?",
              options: ["Der Ort der Stelle.", "Die Öffnungszeit.", "Das Verfahren selbst."],
              answer: 0,
              explain:
                "Değişen tek şey yer: \"befindet sich ab Montag im Anbau, Zimmer zweihundertdrei\". Usul aynı kalıyor.",
            },
            {
              kind: "bool",
              id: "de-b2-09-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Höhe der Strafe erklärt die Zahl der Verstöße am besten.",
              answer: false,
              explain:
                "Değerlendirme bunu eliyor: yükseklik \"erklärt die Zahl der Verstöße kaum\", belirleyici olan denetim sıklığı.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h1-4",
              no: 4,
              ref: "h2",
              text: "Welche Stadt hatte die wenigsten Verstöße?",
              options: [
                "Die mit der höchsten Strafe.",
                "Die mit der geringsten Kontrolle.",
                "Die mit der dichtesten Kontrolle.",
              ],
              answer: 2,
              explain:
                "İki özellik bir arada veriliyor: en düşük ceza ama \"der dichtesten Kontrolle\" — ihlaller orada en az.",
            },
            {
              kind: "bool",
              id: "de-b2-09-h1-5",
              no: 5,
              ref: "h3",
              text: "Ein Anruf genügt für den Einspruch.",
              answer: false,
              explain:
                "Mesaj bunu kapatıyor: \"Ein Anruf reicht nicht, wir brauchen es schriftlich.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h1-6",
              no: 6,
              ref: "h3",
              text: "Wann läuft die Frist ab?",
              options: ["Am Elften.", "Am Fünfundzwanzigsten.", "Am Monatsende."],
              answer: 1,
              explain:
                "İki tarih geçiyor: tebligat on birinde, \"die Einspruchsfrist läuft also am Fünfundzwanzigsten ab\".",
            },
            {
              kind: "bool",
              id: "de-b2-09-h1-7",
              no: 7,
              ref: "h4",
              text: "Für die Satzungsänderung genügt die einfache Mehrheit.",
              answer: false,
              explain:
                "Duyuru ayrımı kuruyor: \"zwei Drittel der anwesenden Stimmen, nicht die einfache Mehrheit\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h1-8",
              no: 8,
              ref: "h4",
              text: "Wie werden Enthaltungen gewertet?",
              options: ["Als Ablehnung.", "Als Zustimmung.", "Gar nicht."],
              answer: 2,
              explain:
                "\"Enthaltungen zählen dabei nicht mit\" — yani hiçbir yöne sayılmıyorlar.",
            },
            {
              kind: "bool",
              id: "de-b2-09-h1-9",
              no: 9,
              ref: "h5",
              text: "Gegen die Ablehnung ist ein Widerspruch möglich.",
              answer: true,
              explain:
                "Mesaj yolu ve süreyi veriyor: \"können Sie Widerspruch einlegen, dafür haben Sie einen Monat\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h1-10",
              no: 10,
              ref: "h5",
              text: "Wie erfährt Herr Belz die Begründung?",
              options: ["Am Telefon.", "Schriftlich.", "Bei einem Termin."],
              answer: 1,
              explain:
                "\"Die Begründung geht Ihnen schriftlich zu\" — telefon yalnız bildirim için kullanılmış.",
            },
          ],
        },
        {
          id: "de-b2-09-h2",
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
              situation: "Bir zabıta müdürü anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Riedl, wie viele Verwarnungen schreibt Ihr Amt im Monat?" },
                {
                  speaker: "Frau Riedl",
                  text: "Etwa elftausend. Davon werden knapp neun Zehntel sofort bezahlt, der Rest geht ins Bußgeldverfahren.",
                },
                { speaker: "Moderator", text: "Das klingt nach einem funktionierenden System." },
                {
                  speaker: "Frau Riedl",
                  text: "Es funktioniert als Verwaltung, nicht als Steuerung. Wir bearbeiten Fälle zuverlässig, aber wir verändern das Verhalten kaum. Diese beiden Dinge werden ständig verwechselt.",
                },
                { speaker: "Moderator", text: "Was würde das Verhalten verändern?" },
                {
                  speaker: "Frau Riedl",
                  text: "Die Dichte, nicht die Höhe. Wir haben das in einem Viertel getestet: dreimal wöchentlich statt einmal monatlich, gleiche Beträge. Die Verstöße sind um vierzig Prozent gefallen und nach dem Ende des Versuchs innerhalb von zwei Monaten zurückgekommen.",
                },
                { speaker: "Moderator", text: "Und mehr Personal?" },
                {
                  speaker: "Frau Riedl",
                  text: "Hilft, kostet aber genau dort, wo wir es nicht bekommen. Ehrlicher wäre, weniger Regeln zu haben und die verbliebenen wirklich zu kontrollieren.",
                },
                { speaker: "Moderator", text: "Was ärgert Sie am meisten?" },
                {
                  speaker: "Frau Riedl",
                  text: "Wenn eine neue Vorschrift beschlossen wird, ohne dass jemand fragt, wer sie kontrolliert. Das passiert häufiger, als man denkt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-09-h2-11",
              no: 11,
              ref: "i1",
              text: "Wie viele Verwarnungen werden sofort bezahlt?",
              options: ["Knapp die Hälfte aller Fälle.", "Fast neunzig Prozent.", "Etwa ein Drittel."],
              answer: 1,
              explain:
                "\"knapp neun Zehntel\" — yani yaklaşık yüzde doksan; kalanı idari para cezası sürecine gidiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h2-12",
              no: 12,
              ref: "i1",
              text: "Welchen Unterschied macht Frau Riedl?",
              options: [
                "Zwischen Verwaltung und Steuerung.",
                "Zwischen Stadt und dem Landkreis.",
                "Zwischen Verwarnung und Bußgeldbescheid.",
              ],
              answer: 0,
              explain:
                "\"Es funktioniert als Verwaltung, nicht als Steuerung\" — ve bu ikisinin sürekli karıştırıldığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h2-13",
              no: 13,
              ref: "i1",
              text: "Was hat der Versuch im Viertel gezeigt?",
              options: [
                "Höhere Beträge wirken deutlich stärker.",
                "Die Wirkung blieb dauerhaft.",
                "Dichtere Kontrolle senkt Verstöße.",
              ],
              answer: 2,
              explain:
                "\"dreimal wöchentlich statt einmal monatlich, gleiche Beträge\" — ihlaller yüzde kırk düşmüş, ama etki kalıcı olmamış.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h2-14",
              no: 14,
              ref: "i1",
              text: "Was geschah nach dem Ende des Versuchs?",
              options: [
                "Die Verstöße kamen zurück.",
                "Die Zahlen blieben stabil.",
                "Die Verstöße sanken weiter.",
              ],
              answer: 0,
              explain:
                "\"nach dem Ende des Versuchs innerhalb von zwei Monaten zurückgekommen\" — etki beklentiye bağlı.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h2-15",
              no: 15,
              ref: "i1",
              text: "Was hält sie für ehrlicher als mehr Personal?",
              options: [
                "Deutlich höhere Bußgelder festzulegen.",
                "Weniger Regeln zu kontrollieren.",
                "Die Kontrolle privat zu vergeben.",
              ],
              answer: 1,
              explain:
                "Personelin yardımcı olduğunu kabul edip alternatifi söylüyor: \"weniger Regeln zu haben und die verbliebenen wirklich zu kontrollieren\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h2-16",
              no: 16,
              ref: "i1",
              text: "Was ärgert sie am meisten?",
              options: [
                "Beschlüsse ohne Frage nach Kontrolle.",
                "Die Höhe der derzeit geltenden Bußgelder.",
                "Die Kritik in den Medien.",
              ],
              answer: 0,
              explain:
                "\"Wenn eine neue Vorschrift beschlossen wird, ohne dass jemand fragt, wer sie kontrolliert.\"",
            },
          ],
        },
        {
          id: "de-b2-09-h3",
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
              situation: "Gelire göre ceza tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Tuncer, ist ein einkommensabhängiges Bußgeld gerecht?" },
                {
                  speaker: "Frau Tuncer",
                  text: "Es ist jedenfalls nicht ungewöhnlich. Im Strafrecht rechnen wir seit Jahrzehnten mit Tagessätzen. Die Frage ist eher, warum wir es im Ordnungsrecht nicht tun.",
                },
                { speaker: "Moderatorin", text: "Herr Pichler, Sie sind dagegen, obwohl Sie zu den Gutverdienenden gehören." },
                {
                  speaker: "Herr Pichler",
                  text: "Gerade deshalb. Ich gebe offen zu, dass mich fünfundfünfzig Euro nicht erreichen. Mein Einwand ist ein anderer: Der Staat kennt dann mein Einkommen auch im Straßenverkehr. Das ist mir zu viel.",
                },
                {
                  speaker: "Frau Tuncer",
                  text: "Der Einwand ist berechtigt, nur trifft er nicht nur diese Reform. Er trifft jede Regelung, die nach Leistungsfähigkeit fragt — auch die, von denen Sie profitieren.",
                },
                { speaker: "Herr Pichler", text: "Das stimmt. Ich halte den Einwand trotzdem." },
                { speaker: "Moderatorin", text: "Frau Lammers, Sie müssten es umsetzen." },
                {
                  speaker: "Frau Lammers",
                  text: "Und genau da liegt mein Problem. Wir bekommen Selbstauskünfte, die wir nicht prüfen können. Am Ende steht meine Unterschrift unter einer Zahl, die ich nicht verantworte.",
                },
                { speaker: "Moderatorin", text: "Wäre das ein Argument gegen die Reform?" },
                {
                  speaker: "Frau Lammers",
                  text: "Gegen die Reform in dieser Form, ja. Wenn die Zahl automatisch aus einer bestehenden Datenbank käme, sähe es anders aus.",
                },
                { speaker: "Frau Tuncer", text: "Dem würde ich zustimmen. Nur wäre genau das der Punkt, den Herr Pichler ablehnt." },
                { speaker: "Herr Pichler", text: "Richtig. Und ich habe darauf keine gute Antwort." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-09-h3-17",
              no: 17,
              ref: "d1",
              text: "Wie beantwortet Frau Tuncer die Eingangsfrage?",
              options: [
                "Sie hält die Rechenweise für neu.",
                "Sie verweist auf das Strafrecht.",
                "Sie lehnt den Vergleich ab.",
              ],
              answer: 1,
              explain:
                "\"Im Strafrecht rechnen wir seit Jahrzehnten mit Tagessätzen\" — asıl soruyu tersine çeviriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h3-18",
              no: 18,
              ref: "d1",
              text: "Was gibt Herr Pichler zu?",
              options: [
                "Dass ihn das Bußgeld nicht erreicht.",
                "Dass er die Reform insgeheim befürwortet.",
                "Dass er die Zahlen nicht kennt.",
              ],
              answer: 0,
              explain:
                "Kendi lehine olan durumu açıkça söylüyor: \"Ich gebe offen zu, dass mich fünfundfünfzig Euro nicht erreichen.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h3-19",
              no: 19,
              ref: "d1",
              text: "Wie entkräftet Frau Tuncer seinen Einwand teilweise?",
              options: [
                "Sie hält ihn für unbegründet.",
                "Sie verweist auf die Kosten.",
                "Sie zeigt, dass er weiter reicht.",
              ],
              answer: 2,
              explain:
                "İtirazı haklı buluyor ama kapsamını genişletiyor: \"Er trifft jede Regelung, die nach Leistungsfähigkeit fragt — auch die, von denen Sie profitieren.\"",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h3-20",
              no: 20,
              ref: "d1",
              text: "Worin besteht das Problem von Frau Lammers?",
              options: [
                "In der Höhe der Beträge.",
                "In der Zahl der Fälle.",
                "In ungeprüften Angaben.",
              ],
              answer: 2,
              explain:
                "\"Wir bekommen Selbstauskünfte, die wir nicht prüfen können\" — sonunda imzası sorumluluk almadığı bir sayının altına giriyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h3-21",
              no: 21,
              ref: "d1",
              text: "Wogegen richtet sich ihr Einwand genau?",
              options: [
                "Nur gegen diese Fassung.",
                "Gegen jede Form der Reform.",
                "Gegen das geltende Recht.",
              ],
              answer: 0,
              explain:
                "Sınırı kendisi çiziyor: \"Gegen die Reform in dieser Form, ja\" — otomatik veri gelse görüşü değişirmiş.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h3-22",
              no: 22,
              ref: "d1",
              text: "Wie endet die Diskussion?",
              options: [
                "Mit einer Einigung aller Beteiligten.",
                "Mit einem offenen Widerspruch.",
                "Mit dem Abbruch des Gesprächs.",
              ],
              answer: 1,
              explain:
                "Lammers'ın çözümü Pichler'in reddettiği şey; Pichler bunu kabul ediyor: \"Und ich habe darauf keine gute Antwort.\"",
            },
          ],
        },
        {
          id: "de-b2-09-h4",
          no: 4,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören acht kurze Beiträge. Worum geht es jeweils? Sie hören jeden Text einmal.",
          promptTr: "Sekiz kısa parça dinleyeceksin. Her birinde konu ne? Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Durchsage im Bürgerbüro",
              genreTr: "Vatandaş bürosunda anons",
              situation: "Sıra sistemi arızalı.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Besucherinnen und Besucher, unser Aufrufsystem ist ausgefallen. Wir rufen bis auf Weiteres nach der Reihenfolge der gezogenen Nummern auf, aber mündlich. Bitte bleiben Sie in Hörweite.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Bir kural değişikliği.",
              plays: 1,
              segments: [
                {
                  text: "Ab Januar gilt in der Innenstadt eine neue Regelung für das Halten in zweiter Reihe. Der Bußgeldrahmen bleibt unverändert; geändert hat sich, dass künftig auch ohne Behinderung anderer verwarnt werden kann.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir dava ertelendi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, hier ist die Kanzlei. Der Termin am Donnerstag ist aufgehoben worden, das Gericht hat kurzfristig verlegt. Ein neuer Termin steht noch nicht fest; wir melden uns, sobald wir etwas hören.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Ansage im Verein",
              genreTr: "Dernekte duyuru",
              situation: "Tüzük oylaması ertelendi.",
              plays: 1,
              segments: [
                {
                  text: "Zur Satzungsänderung: Wir sind heute nicht beschlussfähig, es fehlen vier Mitglieder. Die Abstimmung verschieben wir auf die nächste Versammlung. Dann genügt die einfache Mehrheit der Erschienenen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Podcast-Ausschnitt",
              genreTr: "Podcast parçası",
              situation: "Kural sayısı üzerine.",
              plays: 1,
              segments: [
                {
                  text: "Die verbreitete Forderung nach weniger Vorschriften trifft ein reales Problem, verfehlt aber die Ursache. Untersuchungen zeigen: Nicht die Zahl der Regeln belastet, sondern ihre Widersprüchlichkeit. Zwei klare Regeln sind leichter zu befolgen als eine unklare.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m6",
              genre: "Durchsage im Parkhaus",
              genreTr: "Otoparkta anons",
              situation: "Ödeme sistemi değişiyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zur Bezahlung: Ab morgen entfällt der Automat im Erdgeschoss. Bezahlt wird an der Schranke oder vorab in der App. Bargeld nehmen wir an der Schranke weiterhin an.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m7",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir itiraz sonuçlandı.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Wenninger, hier ist die Bußgeldstelle. Ihrem Einspruch wurde stattgegeben, der Bescheid ist aufgehoben. Gebühren entstehen Ihnen keine; bereits gezahlte Beträge erstatten wir innerhalb von vier Wochen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m8",
              genre: "Radiomeldung",
              genreTr: "Radyo haberi",
              situation: "Denetim sonuçları açıklandı.",
              plays: 1,
              segments: [
                {
                  text: "Bei der Schwerpunktkontrolle wurden an einem Tag zweihundertvierzig Verstöße festgestellt. Die Stadt betont, das sei kein Zeichen für mehr Verstöße als sonst, sondern für mehr Kontrolle als sonst.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-09-h4-23",
              no: 23,
              ref: "m1",
              text: "Worum geht es?",
              options: [
                "Das Amt schließt heute früher.",
                "Der Ablauf bleibt, die Technik nicht.",
                "Die Nummern werden neu vergeben.",
              ],
              answer: 1,
              explain:
                "\"Wir rufen bis auf Weiteres nach der Reihenfolge der gezogenen Nummern auf, aber mündlich\" — düzen aynı, teknik değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-24",
              no: 24,
              ref: "m2",
              text: "Worum geht es?",
              options: [
                "Die Voraussetzung für eine Verwarnung.",
                "Eine deutliche Erhöhung der Bußgelder.",
                "Ein neues Halteverbot in der Innenstadt.",
              ],
              answer: 0,
              explain:
                "Tutar aralığı aynı kalıyor; değişen koşul: \"künftig auch ohne Behinderung anderer verwarnt werden kann\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-25",
              no: 25,
              ref: "m3",
              text: "Worum geht es?",
              options: [
                "Ein Termin ist ersatzlos gestrichen.",
                "Ein Termin fällt weg, ein neuer fehlt.",
                "Ein Verfahren wurde eingestellt.",
              ],
              answer: 1,
              explain:
                "Duruşma kaldırılmış ama süreç sürüyor: \"Ein neuer Termin steht noch nicht fest\".",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-26",
              no: 26,
              ref: "m4",
              text: "Worum geht es?",
              options: [
                "Die Satzung wurde geändert.",
                "Die Versammlung wird aufgelöst.",
                "Eine Abstimmung wird verschoben.",
              ],
              answer: 2,
              explain:
                "\"Wir sind heute nicht beschlussfähig, es fehlen vier Mitglieder\" — oylama sonraki genel kurula kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-27",
              no: 27,
              ref: "m5",
              text: "Worum geht es?",
              options: [
                "Die Zahl der Regeln ist das Hauptproblem.",
                "Vorschriften sollten abgeschafft werden.",
                "Klarheit zählt mehr als Anzahl.",
              ],
              answer: 2,
              explain:
                "Yaygın talebi kısmen haklı bulup nedeni düzeltiyor: yük sayıdan değil \"ihre Widersprüchlichkeit\" ten geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-28",
              no: 28,
              ref: "m6",
              text: "Worum geht es?",
              options: [
                "Ein Zahlweg fällt weg, andere bleiben.",
                "Bargeld wird nicht mehr angenommen.",
                "Das Parken wird teurer.",
              ],
              answer: 0,
              explain:
                "Otomat kalkıyor ama bariyerde ve uygulamada ödeme sürüyor — nakit de \"weiterhin\" kabul ediliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-29",
              no: 29,
              ref: "m7",
              text: "Worum geht es?",
              options: [
                "Der Einspruch wurde abgelehnt.",
                "Der Einspruch war erfolgreich.",
                "Es fehlen weitere Unterlagen.",
              ],
              answer: 1,
              explain:
                "\"Ihrem Einspruch wurde stattgegeben, der Bescheid ist aufgehoben\" — üstelik ödenen tutar geri veriliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-09-h4-30",
              no: 30,
              ref: "m8",
              text: "Worum geht es?",
              options: [
                "Die Zahl der Verstöße ist gestiegen.",
                "Die Kontrolle wird abgeschafft.",
                "Eine Zahl wird eingeordnet.",
              ],
              answer: 2,
              explain:
                "Şehir sayının yanlış okunmasını önlüyor: \"kein Zeichen für mehr Verstöße als sonst, sondern für mehr Kontrolle als sonst\".",
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
          id: "de-b2-09-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Zeitung stand: \"Wer sich nicht an Regeln hält, gehört härter bestraft.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit dieser Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Bir gazetede şöyle yazdı: \"Kurallara uymayan daha ağır cezalandırılmalı.\" Bir okur mektubu yaz (yaklaşık 150 kelime). Bu iddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz klingt entschlossen und übersieht, woran Regeln tatsächlich scheitern.

Zunächst wirkt nicht die Höhe der Strafe, sondern die Wahrscheinlichkeit, entdeckt zu werden. In einem Versuch in unserer Stadt sanken die Verstöße um vierzig Prozent, als dreimal statt einmal kontrolliert wurde — bei unveränderten Beträgen. Nach dem Ende des Versuchs waren sie binnen zwei Monaten zurück.

Zweitens trifft derselbe Betrag Menschen sehr unterschiedlich. Fünfundfünfzig Euro sind für die einen ärgerlich, für die anderen eine Woche ohne Einkauf. Wer Gleichbehandlung will, muss das mitrechnen.

Nun ließe sich einwenden, härtere Strafen setzten wenigstens ein Signal und entlasteten die knappen Kontrollkräfte. Das stimmt für die öffentliche Debatte, nicht aber für das Verhalten auf der Straße: Wer mit einer Kontrolle ohnehin nicht rechnet, liest auch keine Bußgeldtabelle.

Deshalb halte ich die Forderung für gut gemeint und falsch adressiert. Sinnvoller wäre, weniger Regeln zu haben und die verbliebenen wirklich zu kontrollieren.

Mit freundlichen Grüßen
Deniz Tuncer`,
            criteria: [
              "İddiaya açıkça atıf yapıldı mı ve tartışma o cümle üzerinden mi yürüyor?",
              "En az iki bağımsız gerekçe var mı (aynı gerekçenin iki hâli değil)?",
              "Karşı görüş güçlü hâliyle mi alındı ve gerçekten yanıtlandı mı?",
              "Sonuç gerekçelerden çıkıyor mu?",
              "Yaklaşık 150 kelime var mı; okur mektubu biçimi korunmuş mu?",
              "Bağlaç ve edilgen yapılar B2 düzeyinde kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-b2-09-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben einen Bußgeldbescheid erhalten, obwohl Sie an dem Tag nachweislich nicht in der Stadt waren. Schreiben Sie an die Bußgeldstelle (circa 100 Wörter).",
          promptTr:
            "O gün kentte olmadığını belgeleyebildiğin hâlde bir ceza tebligatı aldın. İlgili birime yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Schildern Sie den Sachverhalt sachlich.", tr: "Durumu nesnel biçimde anlat." },
              { de: "Nennen Sie Ihren Nachweis.", tr: "Kanıtını söyle." },
              { de: "Sagen Sie, was Sie erwarten.", tr: "Ne beklediğini söyle." },
              { de: "Beachten Sie die Form und die Frist.", tr: "Biçime ve süreye dikkat et." },
            ],
            sample: `Sehr geehrte Damen und Herren,

hiermit lege ich Einspruch gegen den Bußgeldbescheid vom 12. März, Aktenzeichen 4711/25, ein.

Der Bescheid betrifft einen Verstoß am 3. März um 14.20 Uhr in der Feldstraße. An diesem Tag befand ich mich nachweislich in Hamburg; eine Kopie der Bahnfahrkarte für Hin- und Rückfahrt lege ich bei.

Ich bitte Sie daher, den Bescheid aufzuheben und mir dies schriftlich zu bestätigen.

Vorsorglich weise ich darauf hin, dass mein Fahrzeug an diesem Tag verschlossen in der Tiefgarage stand und von niemandem genutzt wurde.

Sollten Sie weitere Unterlagen oder eine Bestätigung meines Arbeitgebers benötigen, teilen Sie mir das bitte kurz mit; ich reiche beides umgehend nach.

Mit freundlichen Grüßen
Deniz Tuncer`,
            criteria: [
              "İtiraz açıkça ve doğru terimle mi kuruldu (`Einspruch einlegen`)?",
              "Tebligat tarih ve dosya numarasıyla belirtildi mi?",
              "Kanıt somut mu ve ekte olduğu söylendi mi?",
              "Beklenen sonuç açık mı?",
              "Ton resmî mi ve yaklaşık 100 kelime mi?",
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
          id: "de-b2-09-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Strenge Strafen oder häufige Kontrolle?\". Gliedern Sie: Einstieg — Lage in Ihrem Herkunftsland — Argumente für die eine Seite — Argumente für die andere — eigene Position — Abschluss.",
          promptTr:
            "\"Ağır cezalar mı sık denetim mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun — kapanış.",
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
              "Ich möchte heute darüber sprechen, ob strenge Strafen oder häufige Kontrollen mehr bewirken. Zuerst schildere ich die Lage in meinem Herkunftsland, dann nenne ich Argumente für beide Seiten und komme am Ende zu meiner Position. In der Türkei sind die Bußgelder im Verkehr vergleichsweise hoch, aber die Kontrolle ist ungleich verteilt. In meiner Heimatstadt wusste jeder, an welcher Kreuzung geblitzt wird, und fuhr genau dort langsam. Für strenge Strafen spricht, dass sie ein klares Signal setzen und schwere Fälle abschrecken. Für häufige Kontrollen spricht die Erfahrung: Wo dreimal in der Woche kontrolliert wird, ändert sich das Verhalten in wenigen Wochen — und zwar dauerhaft, solange die Kontrolle bleibt. Meine Position ist deshalb, dass die Kontrolle wichtiger ist. Wer mit Entdeckung nicht rechnet, liest keine Bußgeldtabelle. Ich räume aber ein, dass Kontrolle teuer ist und Strafen billig sind — das erklärt, warum die Politik lieber über Beträge spricht. Zusammenfassend: Höhe wirkt auf die Debatte, Dichte wirkt auf das Verhalten.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut ve açıklayıcı mı?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Konum gerekçeli mi ve karşı tarafın maliyet argümanı kabul edildi mi?",
              "Dört dakika boyunca yapı korunabildi mi?",
            ],
          },
        },
        {
          id: "de-b2-09-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Gemeinde hat 60.000 Euro für mehr Verkehrssicherheit. Zur Wahl stehen: zwei zusätzliche Kontrollkräfte, eine feste Messanlage, bauliche Änderungen an einer Kreuzung, eine Kampagne an Schulen. Einigen Sie sich auf eine Verwendung.",
          promptTr:
            "Birlikte bir karar verin. Bir belediyenin trafik güvenliği için 60.000 avrosu var. Seçenekler: iki ek denetim görevlisi, sabit bir ölçüm cihazı, bir kavşakta yapısal değişiklik, okullarda kampanya. Bir kullanım üzerinde anlaşın.",
          minutes: 8,
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Ich fange an: Ich bin für die feste Messanlage. Sie arbeitet rund um die Uhr und kostet danach fast nichts. Was meinen Sie?",
              tr: "Ben başlayayım: Sabit ölçüm cihazından yanayım. Yirmi dört saat çalışıyor ve sonrasında neredeyse hiçbir masrafı yok. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve 'sonrasında masrafsız' gerekçesini doğrudan ele al.",
              expect: "bir seçeneği gerekçelendirmek ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Einwand: Bauliche Änderungen wirken nur an genau dieser Kreuzung. Ist das nicht sehr wenig für so viel Geld?",
              tr: "Bir itiraz: Yapısal değişiklik yalnız o kavşakta işe yarıyor. Bu kadar para için az değil mi?",
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
              "Ihr Argument mit den laufenden Kosten überzeugt mich zur Hälfte. Eine feste Anlage wirkt tatsächlich dauerhaft, aber nur auf zwanzig Metern; alle wissen, wo sie steht, und fahren davor und danach gleich schnell. Bauliche Änderungen wirken auch nur an einer Stelle — das stimmt —, aber sie wirken dort ohne Personal und ohne Diskussion über Datenschutz. Zum Einwand mit dem Geld: Ich schlage eine Aufteilung vor, vierzigtausend für den Umbau der Kreuzung und zwanzigtausend für eine der beiden Kontrollkräfte, befristet auf zwei Jahre. Streichen würde ich die Kampagne an Schulen: Sie erreicht genau die Gruppe, die statistisch am wenigsten Unfälle verursacht. Zusammengefasst: Schwerpunkt auf dem Umbau, dazu eine befristete Kontrollstelle, keine Messanlage und keine Kampagne.",
            criteria: [
              "Öneri gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "İtiraz kabul edilip yanıtlandı mı, yoksa görmezden mi gelindi?",
              "Önceliklendirme yapıldı mı ve eleme gerekçelendirildi mi?",
              "Özet eksiksiz mi — anlaşılan her şey geçiyor mu?",
              "Tartışma dili B2 düzeyinde mi (einwenden, priorisieren, befristen)?",
            ],
          },
        },
      ],
    },
  ],
};
