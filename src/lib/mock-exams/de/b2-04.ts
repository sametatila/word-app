import type { MockPaper } from "../types";

/**
 * B2 · Deneme 4 — "Stadt, Wohnen und Zusammenleben".
 *
 * PLAN kâğıt 1–3 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (9 kim söylüyor · 6 cümle yerleştirme ·
 *                              6 köşe yazısı · 6 görüş eşleştirme · 3 kural)
 *   Hören  40 dk · 30 madde   (10 karışık · 6 söyleşi · 6 tartışma · 8 sunum)
 *   Schreiben 75 dk           (okur mektubu 150 + yarı resmî 100)
 *   Sprechen  15 dk           (sunum 4 dk + uzlaşma)
 *
 * KONU SEÇİMİ: konut politikası, herkesin bir tarafı olduğu ama gerekçelerin
 * birbirine benzediği bir alan. Bu yüzden maddeler tutumu değil, tutumun
 * dayandığı ölçütü soruyor: kim neyi ölçüyor ve neyi ölçmüyor.
 */
export const B2_04: MockPaper = {
  id: "de-b2-04",
  course: "de",
  level: "B2",
  no: 4,
  theme: "Stadt, Wohnen und Zusammenleben",
  themeTr: "Şehir, konut ve birlikte yaşam",
  minutes: 195,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen persönliche Berichte, einen Sachtext, einen Kommentar, Meinungsäußerungen und eine Satzung.",
      instructionTr:
        "Bu bölümde beş görev var. Kişisel anlatılar, bir bilgi metni, bir köşe yazısı, görüş bildirimleri ve bir tüzük okuyacaksın.",
      tasks: [
        {
          id: "de-b2-04-l1",
          no: 1,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Vier Personen schreiben darüber, wie sie wohnen. Lesen Sie die Texte und die Aufgaben 1 bis 9. Welche Person sagt das? Jede Person kann mehrmals vorkommen.",
          promptTr:
            "Dört kişi nasıl bir evde oturduğunu yazıyor. Metinleri ve 1–9. maddeleri oku. Bunu hangi kişi söylüyor? Aynı kişi birden çok kez çıkabilir.",
          texts: [
            {
              kind: "text",
              id: "pA",
              genre: "Erfahrungsbericht A",
              genreTr: "Deneyim yazısı A",
              title: "Miriam, Genossenschaftsmitglied",
              body: `Wir haben vor sieben Jahren eine Genossenschaft gegründet, weil niemand von uns kaufen konnte und alle das Mietniveau fürchteten. Heute wohnen 34 Haushalte im Haus, und die Miete ist seit dem Einzug zweimal gestiegen, jedes Mal um weniger als die Inflation.

Das klingt besser, als es sich anfühlt. Jede Entscheidung wird in der Vollversammlung getroffen, und über die Farbe der Fassade haben wir vier Abende diskutiert. Wer Konflikte scheut, ist hier falsch.

Was ich unterschätzt habe, ist der Aufwand vor dem Einzug. Drei Jahre Planung, unbezahlt, neben der Arbeit. Genau deshalb sind es am Ende überwiegend Leute mit Zeit und Bürojobs geworden — also nicht die, für die wir das eigentlich gedacht hatten. Diese Auswahl passiert von selbst, und sie ist das eigentliche Problem solcher Projekte.`,
              gloss: [
                { de: "die Genossenschaft", tr: "kooperatif", en: "cooperative" },
                { de: "die Vollversammlung", tr: "genel kurul", en: "general assembly" },
                { de: "der Aufwand", tr: "harcanan emek", en: "effort" },
              ],
            },
            {
              kind: "text",
              id: "pB",
              genre: "Erfahrungsbericht B",
              genreTr: "Deneyim yazısı B",
              title: "Herr Voigt, vermietet zwei Wohnungen",
              body: `Ich besitze zwei Wohnungen im Haus meiner Eltern und vermiete beide seit über zwanzig Jahren. In der Debatte komme ich nur als Feindbild vor, und das ärgert mich, weil meine Zahlen niemanden interessieren.

Die eine Wohnung liegt sechs Euro unter dem Mietspiegel, weil dieselbe Familie seit 2009 darin wohnt und ich nie erhöht habe. Bei der anderen habe ich nach dem Auszug saniert und liege jetzt leicht darüber. Beides gilt in der Öffentlichkeit als dasselbe Verhalten.

Was mich wirklich stört, ist etwas anderes: Ich soll die Wohnung dämmen, den Heizkessel tauschen und Leitungen erneuern. Für die Kosten gibt es Förderprogramme, aber jedes hat andere Fristen und andere Formulare. Ich habe zwei Anträge abgebrochen. Nicht weil ich das Geld nicht wollte, sondern weil ich den Papierkram nicht bewältigt habe.`,
              gloss: [
                { de: "der Mietspiegel", tr: "resmî kira endeksi", en: "official rent index" },
                { de: "sanieren", tr: "esaslı onarım yapmak", en: "to renovate" },
                { de: "dämmen", tr: "yalıtım yapmak", en: "to insulate" },
              ],
            },
            {
              kind: "text",
              id: "pC",
              genre: "Erfahrungsbericht C",
              genreTr: "Deneyim yazısı C",
              title: "Jasper, Student in einer WG",
              body: `Ich zahle 480 Euro für zwölf Quadratmeter und ein Bad, das drei Leute teilen. Das ist absurd, aber es ist auch der Grund, warum ich überhaupt in dieser Stadt studieren kann: Ohne WG gäbe es für mich hier gar nichts.

Zur Wahrheit gehört, dass ich Glück hatte. Ich habe das Zimmer über eine ehemalige Mitschülerin bekommen, ohne Besichtigung, ohne Konkurrenz. Wer neu in die Stadt kommt und niemanden kennt, schreibt hundert Nachrichten und bekommt fünf Antworten. Das ist keine Wohnungssuche mehr, das ist eine Lotterie mit Beziehungen als Losen.

Politisch höre ich immer, es müsse mehr gebaut werden. Mag sein. Nur nützt mir ein Haus, das 2032 fertig wird, im laufenden Semester nichts. Kurzfristig hilft nur, was den Bestand betrifft: leerstehende Etagen über Läden zum Beispiel, davon gibt es in meiner Straße drei.`,
              gloss: [
                { de: "die Besichtigung", tr: "yer görme, gezme", en: "viewing" },
                { de: "der Bestand", tr: "mevcut yapı stoku", en: "existing stock" },
                { de: "leerstehend", tr: "boş duran", en: "vacant" },
              ],
            },
            {
              kind: "text",
              id: "pD",
              genre: "Erfahrungsbericht D",
              genreTr: "Deneyim yazısı D",
              title: "Frau Aydin, aufs Land gezogen",
              body: `Wir sind vor vier Jahren aus der Stadt in ein Dorf mit 900 Einwohnern gezogen. Das Haus hat weniger gekostet als die Dreizimmerwohnung, die wir vorher gemietet haben, und es hat einen Garten.

Gerechnet hatte ich mit Ruhe. Bekommen habe ich Fahrzeit: Meine Tochter braucht zur weiterführenden Schule 55 Minuten pro Weg, und der Bus fährt dreimal am Tag. Wir haben deshalb ein zweites Auto gekauft. Rechnet man das ein, ist der finanzielle Vorteil kleiner, als er auf dem Papier aussieht.

Trotzdem würde ich es wieder tun, aber aus einem anderen Grund als damals. Ich kenne hier jeden Nachbarn mit Namen, und als mein Mann im Krankenhaus lag, stand innerhalb eines Tages ein Plan, wer die Kinder abholt. So etwas hatte ich in der Stadt in elf Jahren nicht.`,
              gloss: [
                { de: "die weiterführende Schule", tr: "ortaöğretim okulu", en: "secondary school" },
                { de: "einrechnen", tr: "hesaba katmak", en: "to factor in" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-04-l1-1",
              no: 1,
              text: "Wer beschreibt, dass ein finanzieller Vorteil durch Folgekosten schrumpft?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 3,
              explain:
                "Frau Aydin ikinci arabayı hesaba katıyor: \"Rechnet man das ein, ist der finanzielle Vorteil kleiner, als er auf dem Papier aussieht\". Öteki üçünde ek maliyet hesabı yok.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-2",
              no: 2,
              text: "Wer sieht sich in der öffentlichen Debatte falsch dargestellt?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 1,
              explain:
                "Herr Voigt: \"In der Debatte komme ich nur als Feindbild vor\" ve sayılarının kimseyi ilgilendirmediğini söylüyor. Jasper de siyaseti eleştiriyor ama kendi temsili üzerinden değil.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-3",
              no: 3,
              text: "Wer räumt ein, dass das eigene Projekt die Zielgruppe verfehlt hat?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 0,
              explain:
                "Miriam kooperatife \"überwiegend Leute mit Zeit und Bürojobs\" geldiğini yazıyor ve bunu \"nicht die, für die wir das eigentlich gedacht hatten\" diye tamamlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-4",
              no: 4,
              text: "Wer hält den Zugang zur Wohnung für eine Frage von Kontakten?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 2,
              explain:
                "Jasper odayı eski bir okul arkadaşı üzerinden bulmuş ve durumu \"eine Lotterie mit Beziehungen als Losen\" diye adlandırıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-5",
              no: 5,
              text: "Wer nennt gemeinsame Entscheidungen als Preis für günstiges Wohnen?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 0,
              explain:
                "Miriam kararların genel kurulda alındığını, cephe rengi için dört akşam tartışıldığını yazıyor: \"Wer Konflikte scheut, ist hier falsch\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-6",
              no: 6,
              text: "Wer schätzt den sozialen Zusammenhalt heute höher ein als das ursprüngliche Motiv?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 3,
              explain:
                "Frau Aydin taşınmayı yineleyeceğini ama \"aus einem anderen Grund als damals\" diyor; gerekçesi artık komşuluk, kocası hastanedeyken bir günde kurulan plan.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-7",
              no: 7,
              text: "Wer hält kurzfristige Lösungen im vorhandenen Gebäudebestand für wirksamer als Neubau?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 2,
              explain:
                "Jasper 2032'de biten bir binanın ona bu dönem yaramadığını söylüyor: \"Kurzfristig hilft nur, was den Bestand betrifft\" — örneği dükkân üstündeki üç boş kat.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-8",
              no: 8,
              text: "Wer scheitert nicht am Geld, sondern an der Verwaltung?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 1,
              explain:
                "Herr Voigt iki başvuruyu yarıda bırakmış: \"Nicht weil ich das Geld nicht wollte, sondern weil ich den Papierkram nicht bewältigt habe\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l1-9",
              no: 9,
              text: "Wer beschreibt einen unbezahlten Vorlauf von mehreren Jahren?",
              options: ["Miriam", "Herr Voigt", "Jasper", "Frau Aydin"],
              answer: 0,
              explain:
                "Miriam taşınmadan önceki emeği anlatıyor: \"Drei Jahre Planung, unbezahlt, neben der Arbeit\". Bu süre projeye kimlerin kalabildiğini de belirliyor.",
            },
          ],
        },
        {
          id: "de-b2-04-l2",
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
              title: "Warum Neubau allein die Mieten nicht senkt",
              body: `In kaum einer Debatte wirkt die Antwort so eindeutig wie beim Wohnen: Wenn zu wenig Wohnungen da sind, muss gebaut werden. Die Erfahrung der letzten fünfzehn Jahre zeigt allerdings, dass diese Rechnung nur unter Bedingungen aufgeht. {{10}}

Der erste Grund ist zeitlicher Natur. Zwischen der ersten Planung und dem Einzug liegen in großen Städten regelmäßig sieben bis zehn Jahre. {{11}}

Hinzu kommt die Frage, für wen gebaut wird. Neue Wohnungen entstehen fast immer im oberen Preissegment, weil Grundstück und Bau anders nicht finanzierbar sind. {{12}}

Diese Entlastung tritt tatsächlich ein, sie ist nur schwächer als erhofft. Untersuchungen aus mehreren Städten kommen auf eine Dämpfung von wenigen Prozentpunkten. {{13}}

Ein dritter Punkt wird selten genannt: Der vorhandene Bestand verändert sich, während gebaut wird. Wohnungen werden zusammengelegt, in Ferienwohnungen umgewandelt oder stehen nach einer Erbschaft jahrelang leer. {{14}}

Daraus folgt keine Absage an den Neubau. Es folgt daraus, dass Neubau als einziges Instrument überfordert ist. {{15}}`,
              gloss: [
                { de: "die Dämpfung", tr: "yavaşlatma, frenleme", en: "dampening" },
                { de: "zusammenlegen", tr: "birleştirmek", en: "to merge" },
                { de: "die Erbschaft", tr: "miras", en: "inheritance" },
                { de: "überfordert sein", tr: "gücünü aşmak", en: "to be overwhelmed" },
              ],
            },
          ],
          options: [
            {
              key: "a",
              label: "a",
              body: "Wer heute eine Wohnung sucht, hat von einem Bauantrag aus diesem Jahr also frühestens nach der nächsten Wahlperiode etwas.",
            },
            {
              key: "b",
              label: "b",
              body: "Das ist messbar, aber es ist keine Größenordnung, mit der sich ein angespannter Markt beruhigen lässt.",
            },
            {
              key: "c",
              label: "c",
              body: "Der Nutzen für andere entsteht daher nur indirekt: Wer umzieht, gibt eine günstigere Wohnung frei.",
            },
            {
              key: "d",
              label: "d",
              body: "Diese Bedingungen werden in der öffentlichen Diskussion meist stillschweigend vorausgesetzt.",
            },
            {
              key: "e",
              label: "e",
              body: "Was auf diesem Weg verschwindet, kann den Zuwachs durch Neubau in Teilen wieder aufheben.",
            },
            {
              key: "f",
              label: "f",
              body: "Neben ihm braucht es Regeln für den Bestand, und die sind politisch deutlich unbequemer.",
            },
            {
              key: "g",
              label: "g",
              body: "Die Zahl der Baugenehmigungen wird jährlich vom Statistischen Bundesamt veröffentlicht.",
            },
            {
              key: "h",
              label: "h",
              body: "Die Baukosten pro Quadratmeter sind in diesem Zeitraum stärker gestiegen als die Verbraucherpreise insgesamt.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-04-l2-10",
              no: 10,
              ref: "t1",
              text: "Lücke 10",
              answer: "d",
              explain:
                "Cümleden önce \"nur unter Bedingungen aufgeht\" deniyor; (d) bu koşulları alıp tartışmada sessizce varsayıldıklarını söylüyor ve metnin bundan sonraki üç gerekçesini açıyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l2-11",
              no: 11,
              ref: "t1",
              text: "Lücke 11",
              answer: "a",
              explain:
                "Paragraf \"sieben bis zehn Jahre\" süresini veriyor; (a) bunun bugün ev arayan için ne anlama geldiğini çıkarıyor. (g) de rakamla ilgili ama argümanı ilerletmiyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l2-12",
              no: 12,
              ref: "t1",
              text: "Lücke 12",
              answer: "c",
              explain:
                "Paragraf \"Neue Wohnungen entstehen fast immer im oberen Preissegment\" diyor; (c) başkalarına faydanın nasıl doğduğunu açıklıyor: taşınan kişi daha ucuz bir daireyi boşaltıyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l2-13",
              no: 13,
              ref: "t1",
              text: "Lücke 13",
              answer: "b",
              explain:
                "Paragraf \"eine Dämpfung von wenigen Prozentpunkten\" diyor; (b) bu büyüklüğü değerlendiriyor: ölçülebilir ama gergin bir piyasayı yatıştıracak ölçek değil.",
            },
            {
              kind: "match",
              id: "de-b2-04-l2-14",
              no: 14,
              ref: "t1",
              text: "Lücke 14",
              answer: "e",
              explain:
                "Paragraf üç yolu sayıyor — \"zusammengelegt, in Ferienwohnungen umgewandelt oder stehen nach einer Erbschaft jahrelang leer\"; (e) bunun sonucunu bağlıyor: bu yolla kaybolan, yeni yapının getirdiği artışı kısmen götürüyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l2-15",
              no: 15,
              ref: "t1",
              text: "Lücke 15",
              answer: "f",
              explain:
                "Son paragraf \"dass Neubau als einziges Instrument überfordert ist\" diyor; (f) eksik olanı adlandırıyor: mevcut stok için kurallar, ve bunların siyaseten daha zor olduğu.",
            },
          ],
        },
        {
          id: "de-b2-04-l3",
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
              title: "Der Streit um die Innenstadt ist ein Streit um Zeit",
              body: `Seit zwei Jahren streitet unsere Stadt über Parkplätze, und seit zwei Jahren reden beide Seiten aneinander vorbei. Das liegt nicht an mangelndem Willen, sondern daran, dass sie über verschiedene Größen sprechen. Die eine Seite misst Entfernung, die andere misst Zeit.

Wer aus einem Dorf ohne Busverbindung kommt, rechnet in Minuten bis zur Ladentür. Für ihn ist ein Parkhaus am Rand keine Alternative, sondern eine Verlängerung. Wer in der Innenstadt wohnt, rechnet dagegen in Minuten, die er täglich am geöffneten Fenster verliert. Beide Rechnungen sind korrekt und sie führen zu entgegengesetzten Forderungen.

Die Verwaltung hat diesen Unterschied lange ignoriert und stattdessen Zahlen zur Luftqualität vorgelegt. Das war fachlich richtig und politisch nutzlos. Menschen ändern ihre Meinung selten wegen eines Messwerts, den sie nicht spüren.

Man kann dem Streit aber die Schärfe nehmen, und zwar mit einem einfachen Grundsatz: Wer eine Entfernung vergrößert, muss dafür Zeit zurückgeben. Ein Parkhaus am Rand ist zumutbar, wenn ein Kleinbus alle fünf Minuten fährt. Ohne diesen Bus ist es eine Zumutung. Die Reihenfolge entscheidet, nicht die Maßnahme.

Genau daran ist unsere Stadt gescheitert. Die Sperrung kam im März, der Bus kam im Oktober des Folgejahres. In diesen neunzehn Monaten haben Menschen ihre Gewohnheiten geändert — nur nicht in die gewünschte Richtung. Sie fahren jetzt ins Einkaufszentrum vor der Stadt, und von dort kommen sie nicht zurück.

Die Lehre ist unbequem für alle Beteiligten: Verkehrspolitik ist weniger eine Frage der richtigen Ziele als der richtigen Abfolge. Wer zuerst wegnimmt und später ersetzt, verliert die Leute dazwischen.`,
              gloss: [
                { de: "aneinander vorbeireden", tr: "birbirini duymadan konuşmak", en: "to talk past each other" },
                { de: "zumutbar", tr: "makul, katlanılabilir", en: "reasonable" },
                { de: "die Zumutung", tr: "haksız beklenti", en: "an unreasonable demand" },
                { de: "die Abfolge", tr: "sıra, ardışıklık", en: "sequence" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-04-l3-16",
              no: 16,
              ref: "k1",
              text: "Worin sieht der Autor den Kern des Missverständnisses?",
              options: [
                "Beide Seiten messen unterschiedliche Größen.",
                "Beide Seiten verfügen über falsche Zahlen zur Luft.",
                "Beide Seiten wollen die Innenstadt eigentlich nicht verändern.",
              ],
              answer: 0,
              explain:
                "Metin ayrımı açıkça koyuyor: \"Die eine Seite misst Entfernung, die andere misst Zeit\". Sorun iyi niyet ya da veri eksikliği değil, ölçünün kendisi.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l3-17",
              no: 17,
              ref: "k1",
              text: "Wie bewertet der Autor die Luftqualitätszahlen der Verwaltung?",
              options: [
                "Als fachlich falsch und darum schädlich für die Debatte.",
                "Als richtig, aber politisch wirkungslos.",
                "Als bewusst zurückgehalten, um Kritik zu vermeiden.",
              ],
              answer: 1,
              explain:
                "\"Das war fachlich richtig und politisch nutzlos\" — doğruluğu tartışılmıyor, etkisizliği eleştiriliyor: insanlar hissetmedikleri bir ölçüm değeriyle fikir değiştirmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l3-18",
              no: 18,
              ref: "k1",
              text: "Welchen Grundsatz schlägt der Autor vor?",
              options: [
                "Entfernungen dürfen im Zentrum grundsätzlich nicht vergrößert werden.",
                "Parkhäuser gehören immer an den Stadtrand.",
                "Mehr Weg muss durch schnellere Verbindungen ausgeglichen werden.",
              ],
              answer: 2,
              explain:
                "İlkeyi kendisi formüle ediyor: \"Wer eine Entfernung vergrößert, muss dafür Zeit zurückgeben\". Kenar otoparkı da ancak beş dakikada bir minibüsle makul sayılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l3-19",
              no: 19,
              ref: "k1",
              text: "Was war nach dem Autor der Fehler seiner Stadt?",
              options: [
                "Die falsche Reihenfolge von Sperrung und Ersatz.",
                "Der Verzicht auf ein Parkhaus am Stadtrand.",
                "Die zu kurze Dauer der Sperrung.",
              ],
              answer: 0,
              explain:
                "Kapatma mart ayında, otobüs ise ertesi yılın ekiminde gelmiş. Metin sonucu bağlıyor: \"Die Reihenfolge entscheidet, nicht die Maßnahme\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l3-20",
              no: 20,
              ref: "k1",
              text: "Was ist in den neunzehn Monaten passiert?",
              options: [
                "Die Menschen haben sich an die Sperrung gewöhnt.",
                "Die Menschen haben neue Gewohnheiten außerhalb entwickelt.",
                "Die Menschen haben die Sperrung mehrheitlich abgelehnt.",
              ],
              answer: 1,
              explain:
                "Alışkanlıklar değişmiş ama istenen yönde değil: insanlar şehir dışındaki alışveriş merkezine gitmeye başlamış ve metne göre \"von dort kommen sie nicht zurück\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l3-21",
              no: 21,
              ref: "k1",
              text: "Wie fasst der Autor seine Lehre zusammen?",
              options: [
                "Verkehrspolitik braucht vor allem klarere Ziele.",
                "Verkehrspolitik sollte auf Sperrungen ganz verzichten.",
                "Entscheidend ist die Reihenfolge der Schritte.",
              ],
              answer: 2,
              explain:
                "Son cümleler hedefleri değil sırayı öne çıkarıyor: \"weniger eine Frage der richtigen Ziele als der richtigen Abfolge\". Kapatmalara tümden karşı çıkmıyor.",
            },
          ],
        },
        {
          id: "de-b2-04-l4",
          no: 4,
          format: "match",
          goal: "opinion",
          prompt:
            "Acht Personen äußern sich zu der Frage, ob Städte die kurzzeitige Vermietung von Wohnungen an Gäste begrenzen sollen. Welche Person vertritt die Aussagen 22 bis 27? Zwei Personen bleiben übrig.",
          promptTr:
            "Sekiz kişi, şehirlerin konutların misafirlere kısa süreli kiralanmasını sınırlaması gerekip gerekmediği konusunda görüş bildiriyor. 22–27. ifadeleri hangi kişi savunuyor? İki kişi artıyor.",
          options: [
            {
              key: "a",
              label: "a — Frau Rickert, Stadträtin",
              body: "Wir haben die Regel eingeführt und danach 900 Wohnungen zurückgewonnen. Was uns niemand geglaubt hat: Der größte Teil kam nicht durch Kontrollen zurück, sondern durch die Ankündigung allein.",
            },
            {
              key: "b",
              label: "b — Herr Lorenz, vermietet ein Zimmer",
              body: "Ich vermiete ein Zimmer in meiner eigenen Wohnung, wenn ich verreise. Die neue Regel behandelt mich wie einen Betrieb mit zwölf Apartments. Es fehlt jede Unterscheidung zwischen gelegentlich und gewerblich.",
            },
            {
              key: "c",
              label: "c — Frau Dr. Sperber, Wirtschaftsforscherin",
              body: "Die Wirkung auf das Mietniveau ist in den Daten kleiner, als beide Seiten behaupten: unter einem Prozentpunkt. Deutlich messbar ist dagegen die Wirkung auf einzelne Straßenzüge, und da geht es um mehr als Zahlen.",
            },
            {
              key: "d",
              label: "d — Herr Amaral, Hotelier",
              body: "Mich stört nicht der Wettbewerb, ich habe genug Gäste. Mich stört, dass für mich Brandschutz, Meldepflicht und Steuerprüfung gelten und für die Wohnung nebenan nichts davon. Regeln müssen für alle gelten oder für keinen.",
            },
            {
              key: "e",
              label: "e — Frau Kowal, Nachbarin",
              body: "In unserem Haus wechseln in einer Wohnung jede Woche die Gäste. Es ist nicht der Lärm, das halte ich aus. Es ist, dass ich nach drei Jahren niemanden mehr kenne, dem ich meinen Schlüssel geben könnte.",
            },
            {
              key: "f",
              label: "f — Herr Bittner, Verwaltungsjurist",
              body: "Solche Regeln sind einfach zu beschließen und schwer durchzusetzen. Wir haben 1,5 Stellen für die Prüfung von 4000 Meldungen. Ohne Personal ist eine Vorschrift eine Absichtserklärung, kein Instrument.",
            },
            {
              key: "g",
              label: "g — Frau Sahin, Reinigungskraft",
              body: "Ich putze diese Wohnungen und verdiene damit mehr als in meinem alten Job im Hotel, weil ich mir die Zeiten einteilen kann. Wenn die Stadt das begrenzt, redet über mich niemand.",
            },
            {
              key: "h",
              label: "h — Herr Teichmann, Tourismusverband",
              body: "Ohne diese Wohnungen kommen Familien nicht mehr her, sie zahlen keine vier Hotelzimmer. Ich bin trotzdem für eine Obergrenze pro Haus — was wir brauchen, ist Streuung, keine ganzen Häuser voller Gäste.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b2-04-l4-22",
              no: 22,
              text: "Schon die Ankündigung einer Regel hat mehr bewirkt als ihre Durchsetzung.",
              answer: "a",
              explain:
                "Frau Rickert 900 konutun geri geldiğini, büyük bölümünün ise denetimle değil \"durch die Ankündigung allein\" döndüğünü söylüyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l4-23",
              no: 23,
              text: "Die Regel unterscheidet nicht zwischen gelegentlicher und gewerblicher Vermietung.",
              answer: "b",
              explain:
                "Herr Lorenz kendi odasını yalnız seyahatteyken kiralıyor ve \"Es fehlt jede Unterscheidung zwischen gelegentlich und gewerblich\" diyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l4-24",
              no: 24,
              text: "Der Effekt auf das allgemeine Mietniveau ist kleiner als behauptet.",
              answer: "c",
              explain:
                "Frau Dr. Sperber rakamı veriyor: kira düzeyine etki \"unter einem Prozentpunkt\". Ölçülebilir asıl etkiyi tek tek sokaklarda görüyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l4-25",
              no: 25,
              text: "Für gleiche Tätigkeiten müssen dieselben Auflagen gelten.",
              answer: "d",
              explain:
                "Herr Amaral rekabetten değil eşitsizlikten şikâyetçi: yangın güvenliği, bildirim ve vergi denetimi ona uygulanıyor, yan daireye uygulanmıyor.",
            },
            {
              kind: "match",
              id: "de-b2-04-l4-26",
              no: 26,
              text: "Ohne ausreichendes Personal bleibt eine Vorschrift wirkungslos.",
              answer: "f",
              explain:
                "Herr Bittner 4000 bildirim için 1,5 kadro olduğunu söylüyor: \"Ohne Personal ist eine Vorschrift eine Absichtserklärung, kein Instrument\".",
            },
            {
              kind: "match",
              id: "de-b2-04-l4-27",
              no: 27,
              text: "Eine Begrenzung pro Gebäude ist sinnvoll, ein Verbot nicht.",
              answer: "h",
              explain:
                "Herr Teichmann bu konutları savunuyor ama \"Ich bin trotzdem für eine Obergrenze pro Haus\" diyor; istediği şey dağılım, tümden yasak değil.",
            },
          ],
        },
        {
          id: "de-b2-04-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Satzung und die Aufgaben 28 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Tüzüğü ve 28–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Satzung",
              genreTr: "Tüzük",
              title: "Auszug aus der Satzung der Wohnungsgenossenschaft Ostpark",
              body: `§ 4 Mitgliedschaft
Die Mitgliedschaft entsteht mit der Zulassung durch den Vorstand und der Zeichnung von mindestens fünf Anteilen zu je 300 Euro. Eine Wohnung kann nur an Mitglieder vergeben werden; die Zeichnung weiterer Anteile begründet jedoch keinen Anspruch auf eine Wohnung.

§ 7 Kündigung der Mitgliedschaft
Die Kündigung ist zum Ende eines Geschäftsjahres möglich und muss spätestens drei Monate vorher schriftlich eingehen. Die Auszahlung der Anteile erfolgt frühestens sechs Monate nach dem Ausscheiden, bei mehr als zehn gleichzeitigen Kündigungen kann der Vorstand die Auszahlung um bis zu zwölf Monate strecken.

§ 11 Nutzung der Wohnung
Die Wohnung ist selbst zu bewohnen. Eine vollständige Untervermietung ist ausgeschlossen; die Vermietung einzelner Räume ist mit vorheriger schriftlicher Zustimmung zulässig, längstens für zwölf Monate am Stück.

§ 14 Gemeinschaftsarbeit
Jedes Mitglied leistet jährlich acht Stunden Gemeinschaftsarbeit. Wer die Stunden nicht erbringt, zahlt einen Ausgleich von 20 Euro je Stunde. Mitglieder über 70 Jahre sowie Mitglieder mit einem Nachweis über eine Erwerbsminderung sind befreit.

§ 18 Beschlüsse
Die Vertreterversammlung beschließt mit einfacher Mehrheit; Änderungen der Satzung und der Nutzungsentgelte bedürfen einer Mehrheit von drei Vierteln der abgegebenen Stimmen. Enthaltungen gelten nicht als abgegebene Stimmen.`,
              gloss: [
                { de: "der Anteil", tr: "pay, hisse", en: "share" },
                { de: "das Ausscheiden", tr: "üyelikten ayrılma", en: "leaving, withdrawal" },
                { de: "die Erwerbsminderung", tr: "çalışma gücü kaybı", en: "reduced earning capacity" },
                { de: "die Enthaltung", tr: "çekimser oy", en: "abstention" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-04-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie zeichnen zwanzig Anteile statt der geforderten fünf. Was folgt daraus?",
              options: [
                "Sie werden bei der Vergabe einer Wohnung bevorzugt behandelt.",
                "Zusätzliche Anteile verschaffen Ihnen kein Wohnrecht.",
                "Sie sind von der Gemeinschaftsarbeit befreit.",
              ],
              answer: 1,
              explain:
                "§ 4 bu beklentiyi açıkça kesiyor: \"die Zeichnung weiterer Anteile begründet jedoch keinen Anspruch auf eine Wohnung\". Muafiyet ise § 14'te yaşa ve rapora bağlı.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l5-29",
              no: 29,
              ref: "o1",
              text: "Sie kündigen und im selben Jahr kündigen fünfzehn weitere Mitglieder. Wann kann Ihre Auszahlung spätestens erfolgen?",
              options: [
                "Achtzehn Monate nach dem Ausscheiden.",
                "Sechs Monate nach dem Ausscheiden.",
                "Sofort nach dem Ende des Geschäftsjahres.",
              ],
              answer: 0,
              explain:
                "§ 7 iki süreyi üst üste koyuyor: en erken 6 ay, ve 10'dan fazla eşzamanlı ayrılışta yönetim ödemeyi 12 aya kadar uzatabiliyor. Toplam en geç 18 ay.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-l5-30",
              no: 30,
              ref: "o1",
              text: "Bei einer Abstimmung über die Nutzungsentgelte gibt es 40 Ja-Stimmen, 12 Nein-Stimmen und 30 Enthaltungen. Ist der Beschluss gefasst?",
              options: [
                "Nein, weil die Enthaltungen mitzählen.",
                "Nein, weil eine einfache Mehrheit nicht genügt.",
                "Ja.",
              ],
              answer: 2,
              explain:
                "§ 18'e göre çekimserler \"gelten nicht als abgegebene Stimmen\", yani sayım 52 oy üzerinden. 40/52, dörtte üç eşiği olan 39'un üstünde; karar alınmıştır.",
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
          id: "de-b2-04-h1",
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
              genreTr: "Belediye binasında anons",
              situation: "Bir dairenin taşınması duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für Besucherinnen und Besucher: Die Wohngeldstelle ist ab dem ersten Oktober nicht mehr im Rathaus, sondern in der Bahnhofstraße 4. Termine, die vor dem Umzug vereinbart wurden, gelten unverändert und finden bereits am neuen Ort statt. Wer ohne Termin kommt, wird weiterhin nur bis elf Uhr angenommen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Yeni kira endeksi tanıtılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Der neue Mietspiegel liegt vor. Die durchschnittliche Nettokaltmiete ist gegenüber der letzten Erhebung um 5,8 Prozent gestiegen, in den Außenbezirken allerdings um mehr als neun Prozent. Die Stadt führt das darauf zurück, dass günstige Wohnungen inzwischen vor allem dort gesucht werden. Der Mietspiegel ist ab sofort online abrufbar.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Site yönetimi bir onarımı bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Deniz, hier ist die Hausverwaltung Kroll. Die Reparatur Ihrer Heizung ist für Donnerstag zwischen acht und zwölf geplant. Wenn Sie nicht da sein können, geben Sie bitte einem Nachbarn den Schlüssel; wir dürfen die Wohnung ohne anwesende Person nicht betreten. Sollte der Termin platzen, verschiebt sich alles auf die übernächste Woche.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einer Bürgerversammlung",
              genreTr: "Halk toplantısında duyuru",
              situation: "Toplantının düzeni açıklanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Bevor wir beginnen, zum Ablauf: Nach dem Vortrag haben Sie neunzig Minuten für Fragen. Wortmeldungen werden in der Reihenfolge der Karten aufgerufen, nicht in der Reihenfolge des Handzeichens. Die Karten liegen am Eingang. Beschlüsse fasst diese Versammlung nicht; sie berät den Ausschuss, der im November entscheidet.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage im Bürgeramt",
              genreTr: "Nüfus dairesinde anons",
              situation: "Bir sistem arızası duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Achtung, eine Information: Wegen einer Störung können wir heute keine Ausweise ausgeben. Anmeldungen und Ummeldungen sind davon nicht betroffen und laufen normal weiter. Wer wegen eines Ausweises gekommen ist, erhält an Schalter eins einen bevorzugten Termin für nächste Woche, ohne erneut zu warten.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b2-04-h1-1",
              no: 1,
              ref: "h1",
              text: "Bereits vereinbarte Termine finden am neuen Ort statt.",
              answer: true,
              explain:
                "Anons bunu ayrıca söylüyor: eski randevular \"gelten unverändert und finden bereits am neuen Ort statt\". Yani tarih değişmiyor, adres değişiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h1-2",
              no: 2,
              ref: "h1",
              text: "Was gilt für Besuche ohne Termin?",
              options: [
                "Sie sind am neuen Standort gar nicht mehr möglich.",
                "Sie sind wie bisher nur vormittags möglich.",
                "Sie sind nur noch nach telefonischer Absprache möglich.",
              ],
              answer: 1,
              explain:
                "Anons düzenin değişmediğini vurguluyor: \"wird weiterhin nur bis elf Uhr angenommen\", yani öğleden önce. Telefonla ön görüşme şartı hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-04-h1-3",
              no: 3,
              ref: "h2",
              text: "In den Außenbezirken sind die Mieten stärker gestiegen als im Durchschnitt.",
              answer: true,
              explain:
                "Ortalama artış yüzde 5,8; dış semtlerde \"um mehr als neun Prozent\". Yani dış semtler ortalamanın belirgin biçimde üstünde.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h1-4",
              no: 4,
              ref: "h2",
              text: "Womit erklärt die Stadt diese Entwicklung?",
              options: [
                "Mit der Verlagerung der Nachfrage nach außen.",
                "Mit dem Bau neuer Wohnungen am Stadtrand.",
                "Mit einer Änderung der Berechnungsmethode.",
              ],
              answer: 0,
              explain:
                "Haber gerekçeyi aktarıyor: ucuz konutlar \"inzwischen vor allem dort gesucht\" ediliyor. Yeni yapı ve yöntem değişikliği bu kayıtta hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b2-04-h1-5",
              no: 5,
              ref: "h3",
              text: "Die Handwerker dürfen die Wohnung auch ohne anwesende Person betreten.",
              answer: false,
              explain:
                "Mesaj bunu açıkça yasaklıyor: \"wir dürfen die Wohnung ohne anwesende Person nicht betreten\". Çözüm olarak komşuya anahtar bırakmak öneriliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h1-6",
              no: 6,
              ref: "h3",
              text: "Was passiert, wenn der Termin nicht zustande kommt?",
              options: [
                "Ein neuer Termin folgt in derselben Woche.",
                "Die Reparatur wird an eine andere Firma vergeben.",
                "Alles verschiebt sich um zwei Wochen.",
              ],
              answer: 2,
              explain:
                "Mesaj tek bir sonuç veriyor: \"verschiebt sich alles auf die übernächste Woche\", yani iki hafta sonrası. Başka bir firma seçeneği yok.",
            },
            {
              kind: "bool",
              id: "de-b2-04-h1-7",
              no: 7,
              ref: "h4",
              text: "Wer sich zuerst meldet, kommt zuerst zu Wort.",
              answer: false,
              explain:
                "Sıra el kaldırmaya göre değil: \"Wortmeldungen werden in der Reihenfolge der Karten aufgerufen, nicht in der Reihenfolge des Handzeichens\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h1-8",
              no: 8,
              ref: "h4",
              text: "Welche Rolle hat diese Versammlung?",
              options: [
                "Sie entscheidet am Ende des Abends selbst.",
                "Sie berät ein Gremium, das später entscheidet.",
                "Sie wählt die Mitglieder des Ausschusses.",
              ],
              answer: 1,
              explain:
                "Duyuru yetkiyi ayırıyor: \"Beschlüsse fasst diese Versammlung nicht; sie berät den Ausschuss, der im November entscheidet\".",
            },
            {
              kind: "bool",
              id: "de-b2-04-h1-9",
              no: 9,
              ref: "h5",
              text: "Anmeldungen sind heute trotz der Störung möglich.",
              answer: true,
              explain:
                "Arıza yalnız kimlik teslimini durduruyor; kayıt ve adres değişikliği için \"sind davon nicht betroffen und laufen normal weiter\" deniyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h1-10",
              no: 10,
              ref: "h5",
              text: "Was bekommen Betroffene an Schalter eins?",
              options: [
                "Eine schriftliche Bestätigung der Störung.",
                "Die Erstattung der bereits gezahlten Gebühr.",
                "Einen bevorzugten Termin ohne erneutes Warten.",
              ],
              answer: 2,
              explain:
                "Anons tek bir telafi sunuyor: gelecek hafta için \"einen bevorzugten Termin für nächste Woche, ohne erneut zu warten\". Para iadesi geçmiyor.",
            },
          ],
        },
        {
          id: "de-b2-04-h2",
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
              situation: "Bir şehir plancısı yeni bir mahalle projesini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Perez, Sie haben das Quartier am Güterbahnhof geplant. Was war die schwierigste Entscheidung?" },
                {
                  speaker: "Frau Perez",
                  text: "Die Erdgeschosse. Wir haben festgelegt, dass dort keine Wohnungen entstehen dürfen, sondern nur Läden, Werkstätten oder Praxen. Das kostet Wohnfläche und war entsprechend umstritten.",
                },
                { speaker: "Moderatorin", text: "Warum war Ihnen das so wichtig?" },
                {
                  speaker: "Frau Perez",
                  text: "Weil ein Viertel ohne Erdgeschossnutzung abends tot ist. Wir haben das in den Neunzigern in drei Quartieren erlebt und dann zwanzig Jahre lang repariert. Diesen Fehler wollte ich nicht wiederholen.",
                },
                { speaker: "Moderatorin", text: "Gab es Widerstand aus der Nachbarschaft?" },
                {
                  speaker: "Frau Perez",
                  text: "Erstaunlich wenig, und zwar aus einem Grund, den ich vorher unterschätzt hatte: Wir haben nicht mit Plänen angefangen, sondern mit einer Liste dessen, was im Viertel fehlt. Über eine Liste kann man streiten, ohne sich zu verhärten.",
                },
                { speaker: "Moderatorin", text: "Wie hoch ist der Anteil geförderter Wohnungen?" },
                {
                  speaker: "Frau Perez",
                  text: "Vierzig Prozent, und darauf bin ich nicht besonders stolz. Ursprünglich waren fünfzig geplant. Die Differenz ist beim Verkauf des letzten Baufelds verloren gegangen, weil die Stadt Geld für die Schule brauchte.",
                },
                { speaker: "Moderatorin", text: "Was würden Sie heute anders machen?" },
                {
                  speaker: "Frau Perez",
                  text: "Ich würde die Parkplätze früher reduzieren. Wir haben sie in der Planung gelassen und wollten später kürzen. Später kommt nie. Wer eine Zahl einmal in einen Plan schreibt, wird sie nicht mehr los.",
                },
                { speaker: "Moderatorin", text: "Und was hat besser funktioniert als erwartet?" },
                {
                  speaker: "Frau Perez",
                  text: "Die Höfe. Wir haben sie bewusst nicht möbliert, keine Bänke, keine Spielgeräte, nur Rasen und Wasseranschluss. Die Bewohner haben innerhalb von zwei Jahren alles selbst gebaut, und sie pflegen es auch. Was man selbst hinstellt, tritt man seltener kaputt.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-04-h2-11",
              no: 11,
              ref: "i1",
              text: "Was war die schwierigste Entscheidung im Projekt?",
              options: [
                "Die Höhe der Gebäude zu begrenzen.",
                "Erdgeschosse nicht als Wohnraum zuzulassen.",
                "Die Zahl der Parkplätze festzulegen.",
              ],
              answer: 1,
              explain:
                "Frau Perez zemin katları öne çıkarıyor: orada yalnız dükkân, atölye ya da muayenehane olabiliyor. Bunun konut alanına mal olduğunu ve tartışıldığını da söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h2-12",
              no: 12,
              ref: "i1",
              text: "Womit begründet sie diese Regel?",
              options: [
                "Mit Erfahrungen aus früheren Quartieren.",
                "Mit gesetzlichen Vorgaben des Landes.",
                "Mit dem Wunsch der Investoren.",
              ],
              answer: 0,
              explain:
                "Doksanlarda üç mahallede yaşananları ve ardından gelen yirmi yıllık onarımı anlatıyor: \"Diesen Fehler wollte ich nicht wiederholen\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h2-13",
              no: 13,
              ref: "i1",
              text: "Warum gab es wenig Widerstand?",
              options: [
                "Weil das Verfahren mit einer Mängelliste begann.",
                "Weil die Anwohner finanziell beteiligt wurden.",
                "Weil die Pläne erst nach Baubeginn gezeigt wurden.",
              ],
              answer: 0,
              explain:
                "Süreç planla değil eksiklerin listesiyle başlamış: \"Über eine Liste kann man streiten, ohne sich zu verhärten\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h2-14",
              no: 14,
              ref: "i1",
              text: "Wie bewertet sie den Anteil geförderter Wohnungen?",
              options: [
                "Als Erfolg, weil er über dem Ziel liegt.",
                "Als hinter dem eigenen Ziel zurückgeblieben.",
                "Als politisch nicht durchsetzbar von Anfang an.",
              ],
              answer: 1,
              explain:
                "Oran yüzde 40, oysa hedef 50'ydi; \"darauf bin ich nicht besonders stolz\" diyor. Fark, son parselin satışında kaybolmuş.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h2-15",
              no: 15,
              ref: "i1",
              text: "Was würde sie heute anders machen?",
              options: [
                "Die Höfe von Anfang an ausstatten.",
                "Mehr Baufelder gleichzeitig verkaufen.",
                "Die Parkplatzzahl früher senken.",
              ],
              answer: 2,
              explain:
                "Otoparkları planda bırakıp sonra kısmayı denemişler: \"Später kommt nie. Wer eine Zahl einmal in einen Plan schreibt, wird sie nicht mehr los\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h2-16",
              no: 16,
              ref: "i1",
              text: "Warum haben die Höfe gut funktioniert?",
              options: [
                "Weil sie besonders sorgfältig gestaltet wurden.",
                "Weil die Bewohner sie selbst eingerichtet haben.",
                "Weil sie von einer Firma gepflegt werden.",
              ],
              answer: 1,
              explain:
                "Avlular bilerek boş bırakılmış ve sakinler iki yılda kendileri kurmuş: \"Was man selbst hinstellt, tritt man seltener kaputt\".",
            },
          ],
        },
        {
          id: "de-b2-04-h3",
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
              situation: "İki konuk kısa süreli kiralamanın sınırlanmasını tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Kurzzeitvermietung begrenzen — Frau Halm, Sie sind für eine strenge Regel.",
                },
                {
                  speaker: "Frau Halm",
                  text: "Ich fange mit dem an, was gegen mich spricht: Der Effekt auf das Mietniveau der ganzen Stadt ist klein. Das bestreite ich nicht. Nur wohnt niemand in der ganzen Stadt, sondern in einer Straße, und dort sind die Effekte groß.",
                },
                { speaker: "Moderator", text: "Herr Ebert, Sie halten dagegen." },
                {
                  speaker: "Herr Ebert",
                  text: "Ich halte nicht dagegen, ich halte es für die falsche Reihenfolge. Wir haben in dieser Stadt 6000 leerstehende Wohnungen, die niemand vermietet. Bevor ich Vermietern etwas verbiete, würde ich mich um die kümmern, die gar nichts tun.",
                },
                {
                  speaker: "Frau Halm",
                  text: "Diese Zahl kenne ich, und sie stimmt. Aber sie ist kein Gegenargument, sondern ein zweites Problem. Man kann beides tun, und wer das eine gegen das andere ausspielt, will meistens keines von beiden.",
                },
                {
                  speaker: "Herr Ebert",
                  text: "Der Vorwurf ist unfair. Mein Punkt ist praktisch: Für Leerstand haben wir bereits ein Instrument, das nicht angewendet wird. Ein neues Verbot bindet Personal, das dann dort fehlt.",
                },
                {
                  speaker: "Frau Halm",
                  text: "Das ist ein Argument, das ich gelten lasse. Deshalb bin ich für eine Regel, die sich selbst durchsetzt: eine Registrierungspflicht mit einer Nummer, die in jedem Inserat stehen muss. Ohne Nummer kein Inserat, und die Plattformen prüfen das automatisch.",
                },
                {
                  speaker: "Herr Ebert",
                  text: "Das wäre etwas anderes als das, was der Stadtrat beschlossen hat. Über eine Registrierung ohne Obergrenze könnte ich reden. Ich fürchte nur, sie kommt nie allein — nach der Nummer kommt die Quote.",
                },
                {
                  speaker: "Frau Halm",
                  text: "Dann schreiben wir hinein, dass eine Quote eine neue Entscheidung braucht. Ich bin bereit, das zuzusagen.",
                },
                {
                  speaker: "Moderator",
                  text: "Herr Ebert, reicht Ihnen das?",
                },
                {
                  speaker: "Herr Ebert",
                  text: "Es reicht mir für ein Ja unter Vorbehalt. Ich will die Zusage schriftlich, nicht in einer Sendung.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-04-h3-17",
              no: 17,
              ref: "d1",
              text: "Wie beginnt Frau Halm ihren Beitrag?",
              options: [
                "Mit einem Punkt gegen sich selbst.",
                "Mit einer Kritik an der Stadtverwaltung.",
                "Mit einer Zahl, die ihre Position stützt.",
              ],
              answer: 0,
              explain:
                "\"Ich fange mit dem an, was gegen mich spricht\" diyor ve şehir geneli etkisinin küçük olduğunu kabul ediyor. Kendi argümanını ancak sonra kuruyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h3-18",
              no: 18,
              ref: "d1",
              text: "Wie verschiebt sie danach das Argument?",
              options: [
                "Von der Stadt auf die einzelne Straße.",
                "Von den Mieten auf die Qualität der Bauten.",
                "Von den Gästen auf die Eigentümer.",
              ],
              answer: 0,
              explain:
                "Ölçeği değiştiriyor: \"niemand wohnt in der ganzen Stadt, sondern in einer Straße\" — küçük ortalama, tek tek sokaklarda büyük etki demek.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h3-19",
              no: 19,
              ref: "d1",
              text: "Was ist Herrn Eberts Haupteinwand?",
              options: [
                "Die Regel wäre rechtlich nicht zulässig.",
                "Ein Instrument bleibt ungenutzt.",
                "Die Zahl der Gäste ist ohnehin rückläufig.",
              ],
              answer: 1,
              explain:
                "6000 boş konutu ve mevcut ama uygulanmayan aracı öne çıkarıyor: yeni bir yasak, orada eksilecek personeli bağlar.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h3-20",
              no: 20,
              ref: "d1",
              text: "Wie reagiert Frau Halm auf die Zahl der leerstehenden Wohnungen?",
              options: [
                "Sie bezweifelt die Erhebung.",
                "Sie hält die Erhebung für deutlich übertrieben.",
                "Sie bestätigt sie, wertet sie aber anders.",
              ],
              answer: 2,
              explain:
                "\"Diese Zahl kenne ich, und sie stimmt\" diyor, ama bunu karşı argüman değil ikinci bir sorun sayıyor: ikisi birlikte yapılabilir.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h3-21",
              no: 21,
              ref: "d1",
              text: "Welchen Vorschlag macht Frau Halm daraufhin?",
              options: [
                "Eine Registrierungspflicht.",
                "Eine Obergrenze von 90 Tagen pro Jahr.",
                "Eine zusätzliche Steuer auf Gästewohnungen.",
              ],
              answer: 0,
              explain:
                "Kendini uygulayan bir kural öneriyor: \"eine Registrierungspflicht mit einer Nummer, die in jedem Inserat stehen muss\", ve platformlar bunu otomatik denetliyor. Böylece personel yükü doğmuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h3-22",
              no: 22,
              ref: "d1",
              text: "Wie endet die Diskussion?",
              options: [
                "Mit einer vollständigen Einigung beider Seiten.",
                "Mit einer Zustimmung unter Vorbehalt.",
                "Ohne jede Annäherung.",
              ],
              answer: 1,
              explain:
                "Herr Ebert \"Es reicht mir für ein Ja unter Vorbehalt\" diyor ve sözün yayında değil yazılı verilmesini istiyor. Yani yakınlaşma var ama kayıtsız değil.",
            },
          ],
        },
        {
          id: "de-b2-04-h4",
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
              situation: "Bir sosyolog komşuluk ilişkilerini anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Ich beginne mit einer Warnung vor meinem eigenen Fach. Wenn Soziologen über Nachbarschaft sprechen, klingt es schnell nach einem verlorenen Paradies. Dieses Paradies hat es nicht gegeben.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Die enge Nachbarschaft der Fünfzigerjahre war kein Ideal, sondern eine Notwendigkeit. Man teilte Waschküche, Telefon und Werkzeug, weil niemand beides zweimal besaß. Wer damals umzog, verlor nicht Freunde, sondern Infrastruktur.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Was wir heute beobachten, ist deshalb kein Verfall, sondern eine Verlagerung. Die Zahl enger Kontakte pro Person ist über fünfzig Jahre erstaunlich stabil geblieben. Verändert hat sich, wo diese Kontakte wohnen: früher im Haus, heute im Umkreis von dreißig Kilometern.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Das hat eine Folge, die selten benannt wird. Enge Kontakte sind ersetzbar, schwache nicht. Wer im Haus niemanden kennt, dem fehlt nicht der beste Freund, sondern die Person, die ein Paket annimmt oder bemerkt, dass die Rollläden seit vier Tagen unten sind.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "In unseren Erhebungen entstehen solche schwachen Kontakte fast nie durch Feste, obwohl Kommunen genau darauf setzen. Sie entstehen an Orten, die man regelmäßig und unfreiwillig teilt: Waschküche, Müllplatz, Aufzug, Elternhaltestelle.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Daraus folgt für die Planung etwas Unerwartetes: Der Waschmaschinenanschluss in jeder Wohnung, damals ein Fortschritt, war für die Nachbarschaft ein Rückschritt. Ich fordere ihn nicht ab, aber ich weise darauf hin, dass Bequemlichkeit hier einen Preis hatte.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Wirksam sind Maßnahmen, die keine Geselligkeit verlangen. Eine gemeinsame Werkstatt wird stärker genutzt als ein Gemeinschaftsraum, ein Paketfach mehr als ein Café. Menschen kommen leichter zusammen, wenn Zusammenkommen nicht der Zweck ist.",
                },
                {
                  speaker: "Frau Prof. Nolte",
                  text: "Zum Schluss die Einschränkung: Unsere Daten stammen aus Städten über 100 000 Einwohnern. Für Dörfer gilt das vermutlich nicht, und wir haben es nicht geprüft.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b2-04-h4-23",
              no: 23,
              ref: "v1",
              text: "Wovor warnt die Rednerin zu Beginn?",
              options: [
                "Vor voreiligen politischen Forderungen.",
                "Vor einer Verklärung der Vergangenheit.",
                "Vor der Übertragung ausländischer Studien.",
              ],
              answer: 1,
              explain:
                "Kendi alanına karşı uyarıyor: komşuluk konuşulduğunda \"klingt es schnell nach einem verlorenen Paradies\" ve bu cennetin hiç var olmadığını ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-24",
              no: 24,
              ref: "v1",
              text: "Wie erklärt sie die enge Nachbarschaft der Fünfzigerjahre?",
              options: [
                "Als Ergebnis geteilter Infrastruktur.",
                "Als Folge eines stärkeren Gemeinschaftssinns.",
                "Als Wirkung damaliger Wohnungspolitik.",
              ],
              answer: 0,
              explain:
                "Çamaşırlık, telefon ve alet paylaşılıyordu çünkü kimse ikisine birden sahip değildi: \"Wer damals umzog, verlor nicht Freunde, sondern Infrastruktur\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-25",
              no: 25,
              ref: "v1",
              text: "Was hat sich laut ihren Daten verändert?",
              options: [
                "Die Zahl enger Kontakte pro Person.",
                "Die Häufigkeit von Umzügen.",
                "Der Wohnort dieser Kontakte.",
              ],
              answer: 2,
              explain:
                "\"Die Zahl enger Kontakte pro Person ist über fünfzig Jahre erstaunlich stabil geblieben\"; değişen şey nerede oturdukları: eskiden aynı binada, bugün otuz kilometrelik çevrede.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-26",
              no: 26,
              ref: "v1",
              text: "Warum sind schwache Kontakte nach ihr besonders wichtig?",
              options: [
                "Weil sie sich leichter in Freundschaften verwandeln.",
                "Weil sie nicht durch entfernte Kontakte ersetzbar sind.",
                "Weil sie in Erhebungen leichter zu messen sind.",
              ],
              answer: 1,
              explain:
                "Ayrımı kendisi kuruyor: \"Enge Kontakte sind ersetzbar, schwache nicht\" — kargoyu alan ya da dört gündür kapalı panjuru fark eden kişi başka yerden gelmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-27",
              no: 27,
              ref: "v1",
              text: "Wo entstehen solche Kontakte nach ihren Erhebungen?",
              options: [
                "Bei organisierten Festen im Viertel.",
                "In Vereinen und Elterninitiativen.",
                "An regelmäßig geteilten Alltagsorten.",
              ],
              answer: 2,
              explain:
                "Şenliklerden neredeyse hiç doğmuyor; çamaşırlık, çöp yeri, asansör ve okul durağı gibi \"regelmäßig und unfreiwillig\" paylaşılan yerlerde doğuyor.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-28",
              no: 28,
              ref: "v1",
              text: "Wie bewertet sie den Waschmaschinenanschluss in jeder Wohnung?",
              options: [
                "Als Fortschritt mit sozialem Preis.",
                "Als Fehler, den man rückgängig machen sollte.",
                "Als für die Nachbarschaft folgenlos.",
              ],
              answer: 0,
              explain:
                "Bunu geri istemediğini açıkça söylüyor, ama \"dass Bequemlichkeit hier einen Preis hatte\" diye ekliyor. Yani ilerleme ve kayıp aynı anda.",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-29",
              no: 29,
              ref: "v1",
              text: "Welche Maßnahmen hält sie für wirksam?",
              options: [
                "Solche, die ausdrücklich zur Begegnung einladen.",
                "Solche, bei denen Begegnung nicht der Zweck ist.",
                "Solche, die von den Bewohnern finanziert werden.",
              ],
              answer: 1,
              explain:
                "Ortak atölye ortak salondan, kargo dolabı kafeden daha çok kullanılıyor: \"Menschen kommen leichter zusammen, wenn Zusammenkommen nicht der Zweck ist\".",
            },
            {
              kind: "mcq",
              id: "de-b2-04-h4-30",
              no: 30,
              ref: "v1",
              text: "Womit schließt der Vortrag?",
              options: [
                "Mit einer Forderung an die Kommunen.",
                "Mit einem Ausblick auf weitere Studien.",
                "Mit einem Hinweis auf die Reichweite der Daten.",
              ],
              answer: 2,
              explain:
                "Son cümleler verilerin 100 000 üstü şehirlerden geldiğini ve köyler için geçerli olmayabileceğini söylüyor: \"wir haben es nicht geprüft\".",
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
          id: "de-b2-04-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In Ihrer Stadtzeitung stand: \"Wer mehr Wohnungen will, muss aufhören, jedes Bauprojekt zu bekämpfen.\" Schreiben Sie einen Leserbrief (circa 150 Wörter). Setzen Sie sich mit der Aussage auseinander, nennen Sie Argumente und ziehen Sie eine begründete Schlussfolgerung.",
          promptTr:
            "Şehir gazetenizde şöyle yazdı: \"Daha çok konut isteyen, her yapı projesine karşı çıkmayı bırakmalı.\" Bir okur mektubu yaz (yaklaşık 150 kelime). İddiayı tartış, gerekçeler sun ve gerekçeli bir sonuca bağla.",
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

Ihr Satz trifft einen wunden Punkt, verkürzt die Sache aber an der entscheidenden Stelle. Widerstand richtet sich hier selten gegen Wohnungen, sondern gegen ihre Bedingungen.

In unserem Viertel wurden im letzten Jahr 140 Wohnungen gebaut. Der Einwand der Anwohnerinnen betraf nicht die Zahl, sondern den Umstand, dass keine einzige davon gefördert war und gleichzeitig der einzige Spielplatz weichen sollte. Wer das kritisiert, ist nicht gegen den Neubau.

Hinzu kommt, dass Neubau langsam wirkt. Zwischen Planung und Einzug liegen bei uns regelmäßig acht Jahre. Wer heute eine Wohnung sucht, hat davon nichts, und deshalb wird über Leerstand und Umwandlung gestritten.

Natürlich gibt es auch Widerstand aus reiner Gewohnheit, und dieser schadet der Sache tatsächlich. Er kommt vor, und man sollte ihn benennen. Das entwertet die anderen Einwände jedoch nicht.

Mein Schluss: Wer schneller bauen will, sollte weniger über die Gegner klagen und mehr darüber, was gebaut wird.

Mit freundlichen Grüßen
Petra Lindqvist`,
            criteria: [
              "İddiaya doğrudan atıf yapıldı mı ve tutum net mi?",
              "En az iki farklı gerekçe var mı ve bunlar somut mu (sayı, örnek, deneyim)?",
              "Karşı görüş gerçekten ele alınıp yanıtlandı mı?",
              "Sonuç sunulan gerekçelerden çıkıyor mu?",
              "Metin bağlaçlarla örülmüş mü? (allerdings, hinzu kommt, jedoch, folglich)",
              "Resmî hitap ve veda var mı, yaklaşık 150 kelime mi?",
            ],
          },
        },
        {
          id: "de-b2-04-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "In Ihrem Haus soll der Waschkeller abgeschafft und in einen Fahrradraum umgewandelt werden. Sie brauchen den Waschkeller. Schreiben Sie an die Hausverwaltung (circa 100 Wörter).",
          promptTr:
            "Binanızda çamaşırlık kaldırılıp bisiklet odasına çevrilecek. Sen çamaşırlığa ihtiyaç duyuyorsun. Site yönetimine yaz (yaklaşık 100 kelime).",
          items: [],
          rubric: {
            minWords: 100,
            points: [
              { de: "Nehmen Sie Bezug auf die Ankündigung.", tr: "Duyuruya atıf yap." },
              { de: "Begründen Sie, warum Sie den Raum brauchen.", tr: "Neden o alana ihtiyacın olduğunu gerekçelendir." },
              { de: "Erkennen Sie das Anliegen der anderen Seite an.", tr: "Karşı tarafın gerekçesini kabul et." },
              { de: "Schlagen Sie eine Lösung vor.", tr: "Bir çözüm öner." },
            ],
            sample: `Sehr geehrte Frau Kroll,

vielen Dank für Ihr Schreiben vom 8. April zur geplanten Umwandlung des Waschkellers.

Ich bitte Sie, die Entscheidung noch einmal zu prüfen. In meiner Wohnung gibt es keinen Anschluss für eine Waschmaschine, und das gilt nach meiner Kenntnis für vier weitere Wohnungen im Vorderhaus. Für uns ist der Waschkeller keine Bequemlichkeit, sondern die einzige Möglichkeit.

Dass Fahrräder derzeit den Hausflur blockieren, sehe ich ebenso; der Bedarf ist berechtigt.

Wäre eine Teilung des Raums möglich? Die Waschmaschinen stehen an der Wand links, die rechte Hälfte böte Platz für etwa zwölf Räder. Ich helfe gern bei der Organisation.

Mit freundlichen Grüßen
Aylin Tekin`,
            criteria: [
              "Duyuruya somut atıf var mı (tarih, konu)?",
              "İhtiyaç somut gerekçelendirildi mi ve yalnız kendi durumu değil, başkalarınınki de anıldı mı?",
              "Karşı tarafın gerekçesi gerçekten kabul edildi mi?",
              "Önerilen çözüm uygulanabilir ve somut mu?",
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
          id: "de-b2-04-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wohnen in der Stadt oder auf dem Land?\". Gliedern Sie: Einstieg — Lage in Ihrem Heimatland — Vorteile — Nachteile — eigene Position — Abschluss.",
          promptTr:
            "\"Şehirde mi kırsalda mı oturmalı?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — artılar — eksiler — kendi konumun — kapanış.",
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Lage im Heimatland", tr: "Kendi ülkendeki durum" },
              { de: "Vorteile mit Beispiel", tr: "Örnekle desteklenmiş artılar" },
              { de: "Nachteile mit Beispiel", tr: "Örnekle desteklenmiş eksiler" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte heute über die Frage sprechen, ob man besser in der Stadt oder auf dem Land wohnt. Zuerst schildere ich die Lage in meinem Heimatland, dann nenne ich Vor- und Nachteile, danach meine eigene Position. In der Ukraine ist die Bewegung seit zwanzig Jahren eindeutig in Richtung Stadt gegangen, vor allem wegen der Arbeit. Ein Vorteil der Stadt liegt im Zugang: Meine Schwester hat in Kiew drei Fachärzte in Fußnähe, meine Tante im Dorf fährt für denselben Termin zwei Stunden. Ein Nachteil ist der Preis. Für die Miete einer Zweizimmerwohnung zahlt man in der Stadt etwa das Doppelte. Meine Position ist deshalb differenziert: Für Familien mit kleinen Kindern und für ältere Menschen halte ich die Stadt für die vernünftigere Wahl, weil beide Gruppen auf Erreichbarkeit angewiesen sind. Wer arbeitet und ein Auto hat, kann auf dem Land deutlich besser leben. Zusammenfassend: Die Frage lässt sich nicht allgemein beantworten, sondern nur nach Lebensphase.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kendi ülkedeki durum somut anlatıldı mı?",
              "Artı ve eksi birer örnekle desteklendi mi?",
              "Konum gerekçeli mi ve tek yanlı olmaktan kaçınıyor mu?",
              "Bağlayıcılar kullanıldı mı? (zunächst, ein Vorteil liegt darin, dagegen, zusammenfassend)",
              "Dört dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b2-04-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihr Haus bekommt 8000 Euro aus einem Förderprogramm für den Innenhof. Einigen Sie sich mit Ihrer Gesprächspartnerin: Spielgeräte für Kinder, ein überdachter Fahrradraum, Bäume und Sitzplätze oder eine gemeinsame Werkstatt.",
          promptTr:
            "Binanız iç avlu için bir destek programından 8000 euro alıyor. Karşındakiyle anlaş: çocuk oyun grubu, üstü kapalı bisiklet alanı, ağaç ve oturma yerleri ya da ortak atölye.",
          prepSeconds: 90,
          exchange: [
            {
              who: "partner",
              de: "Wir müssen dem Verwalter bis Montag eine Antwort geben. Ich wäre für Spielgeräte — im Haus wohnen elf Kinder, das ist der klarste Bedarf. Wie sehen Sie das?",
              tr: "Yöneticiye pazartesiye kadar cevap vermeliyiz. Ben oyun grubundan yanayım — binada on bir çocuk var, en açık ihtiyaç bu. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Bir seçeneği savun ve gerekçelendir; karşı tarafın gerekçesini de ele al.",
              expect: "bir seçeneği gerekçelendirerek savunmak ve karşı gerekçeyi ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das kann ich nachvollziehen. Nur bedenken Sie: Die Kinder sind in fünf Jahren groß, und dann steht etwas im Hof, das niemand mehr braucht.",
              tr: "Anlıyorum. Ama şunu düşün: Çocuklar beş yıl sonra büyümüş olacak ve avluda kimsenin işine yaramayan bir şey kalacak.",
            },
            {
              who: "you",
              hint: "Bu itirazı ele al ve kalıcılık ölçütünü tartış.",
              expect: "uzun vadeli kullanım ölçütünü tartışmak ve buna göre bir öneri kurmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Wenn wir zwei Dinge machen wollen, reicht das Geld nicht für beide vollständig. Worauf würden Sie verzichten?",
              tr: "Peki. İki şey yapmak istersek para ikisine birden yetmez. Neyden vazgeçersin?",
            },
            {
              who: "you",
              hint: "Bir önceliklendirme yap ve neyi neden feda ettiğini söyle.",
              expect: "kaynakları önceliklendirmek ve bir seçeneği gerekçeyle elemek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Einverstanden. Fassen wir zusammen, damit ich es dem Verwalter schreiben kann: Worauf haben wir uns geeinigt?",
              tr: "Anlaştık. Yöneticiye yazabilmem için toparlayalım: Neyde anlaştık?",
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
              "Der Bedarf der Kinder ist unbestritten, ich würde ihn aber anders decken: Rasen und zwei Bäume kosten wenig und nutzen jedem Alter. Ihren Einwand teile ich sogar — deshalb bin ich für Lösungen, die sich mitverändern lassen. Verzichten würde ich auf die Werkstatt, weil wir dafür einen abschließbaren Raum bräuchten und den haben wir nicht. Wir hätten uns also geeinigt auf: Bäume und Sitzplätze für etwa 5000 Euro, ein einfaches Klettergerüst für 3000, kein Fahrradraum in diesem Jahr, und wir beantragen ihn im nächsten Programm erneut.",
            criteria: [
              "Kendi konumu gerekçelendirildi mi?",
              "Karşı tarafın itirazı gerçekten ele alındı mı?",
              "Öncelik belirlenirken neyin feda edildiği ve nedeni söylendi mi?",
              "Özet eksiksiz mi ve konuşmada varılan şeyi yansıtıyor mu?",
              "Tartışma dili kullanıldı mı? (Ihren Einwand teile ich, verzichten würde ich auf, wir hätten uns geeinigt auf)",
            ],
          },
        },
      ],
    },
  ],
};
