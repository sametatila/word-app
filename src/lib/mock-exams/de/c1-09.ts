import type { MockPaper } from "../types";

/**
 * C1 · Deneme 9 — "Reparatur und Ersatz".
 *
 * PLAN kâğıt 1–8 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (özet tamamlama 10 · deneme metni 10 · yapısal boşluk 5)
 *   Hören  40 dk · 25 madde   (not tamamlama 10 · panel 15)
 *   Schreiben 80 dk · 10 madde (görüş yazısı ~200 kelime + boşluklu resmî mektup 10)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: onarım ve değiştirme. Konunun C1'e uygun yanı, herkesin
 * paylaştığı bir kanının (onarmak daha iyidir) altındaki hesabın hiç
 * yapılmamış olması. Metin kanıyı çürütmüyor; ekolojik üstünlükle ekonomik
 * üstünlüğü ayırıyor ve tartışmanın yanlış uçtan yürütüldüğünü gösteriyor.
 *
 * ŞIK UZUNLUKLARI görev görev planlandı: hiçbir maddede doğru şık en uzun
 * şık değil. Anahtar dağılımı okuma dört şıklı havuzunda 4/4/3/4, dinleme
 * üç şıklı havuzunda 5/5/5.
 */
export const C1_09: MockPaper = {
  id: "de-c1-09",
  course: "de",
  level: "C1",
  no: 9,
  theme: "Reparatur und Ersatz",
  themeTr: "Onarım ve değiştirme",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben: eine Zusammenfassung ergänzen, einen Essay auswerten und einen Text strukturell schließen.",
      instructionTr:
        "Bu bölümde üç görev var: bir özeti tamamlamak, bir deneme metnini çözümlemek ve bir metni yapısal olarak kapatmak.",
      tasks: [
        {
          id: "de-c1-09-l1",
          no: 1,
          format: "gap",
          goal: "gist",
          prompt:
            "Lesen Sie den Text und die Zusammenfassung darunter. Ergänzen Sie die Lücken 1 bis 10 sinngemäß. Schreiben Sie in jede Lücke ein Wort. Die Wörter stehen nicht immer wörtlich im Text.",
          promptTr:
            "Metni ve altındaki özeti oku. 1–10. boşlukları anlama uygun biçimde tamamla. Her boşluğa bir sözcük yaz. Sözcükler metinde her zaman birebir geçmiyor.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Sachtext",
              genreTr: "Bilgi metni",
              title: "Der Preis der Haltbarkeit",
              body: `Dass Reparieren dem Ersetzen vorzuziehen sei, gilt inzwischen als ausgemacht. Die Rechnung dahinter wird indes selten aufgemacht.

Ein Gerät zu reparieren kostet vor allem Arbeitszeit, und Arbeitszeit ist dort teuer, wo repariert wird. Ein neues Gerät ist dagegen dort billig, wo es gefertigt wird. Die Reparatur konkurriert mithin nicht mit den Herstellungskosten, sondern mit dem Endpreis eines weltweit organisierten Marktes.

Daraus folgt eine unbequeme Unterscheidung: Der ökologische Vorteil des Reparierens ist unstrittig, der ökonomische ist es nicht. Wer beides ineinanderschiebt, argumentiert an der Kasse vorbei.

Die verbreitete Antwort lautet Konstruktion. Geräte müssten so gebaut sein, dass sich einzelne Teile tauschen lassen. Das ist richtig und greift gleichwohl zu kurz, denn ein zerlegbares Gerät ist noch kein repariertes. Es fehlen weniger die Schrauben als die Werkstätten.

Deren Zahl ist über dreißig Jahre weitgehend gesunken, und zwar nicht mangels Nachfrage, sondern weil der Beruf keine Lehrlinge mehr fand. Eine Werkstatt, die einmal geschlossen hat, kehrt nicht zurück, sobald sich die Rechtslage ändert.

Ein Einwand liegt nahe: Der Markt werde das regeln, sobald der Ersatz teurer wird. Er ließe sich indes entkräften, denn die Zeit, die eine Werkstatt zum Entstehen braucht, bemisst sich in Jahren; die Zeit, in der ein Preis steigt, in Wochen.

Was daraus folgt, ist unangenehm für beide Lager. Verhandelt wird über Ersatzteilpflicht und Garantiefristen; entschieden wird über Ausbildungsplätze.`,
              gloss: [
                { de: "ausgemacht", tr: "üzerinde uzlaşılmış", en: "settled, agreed" },
                { de: "zerlegbar", tr: "sökülebilir", en: "dismantlable" },
                { de: "mangels", tr: "yokluğundan", en: "for lack of" },
                { de: "entkräften", tr: "çürütmek", en: "to refute" },
                { de: "die Ersatzteilpflicht", tr: "yedek parça bulundurma zorunluluğu", en: "spare-parts obligation" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              body: `Dass Reparieren dem Ersetzen vorzuziehen sei, gilt heute als {{1}}. Die dazugehörige Rechnung wird nach Ansicht des Autors jedoch selten aufgemacht.

Eine Reparatur kostet vor allem {{2}}, und diese ist dort teuer, wo repariert wird. Die Reparatur konkurriert deshalb nicht mit den Herstellungskosten, sondern mit dem {{3}} eines weltweit organisierten Marktes.

Der Autor trennt zwei Vorteile voneinander: Der {{4}} Vorteil sei unstrittig, der ökonomische nicht.

Die übliche Antwort setzt bei der {{5}} an: Geräte sollen so gebaut sein, dass Teile getauscht werden können. Das greife zu kurz, weil weniger die Schrauben fehlten als die {{6}}.

Deren Zahl ist über dreißig Jahre gesunken, nicht mangels Nachfrage, sondern weil der Beruf keine {{7}} mehr fand.

Den Einwand, der {{8}} werde das schon regeln, entkräftet der Autor mit einem Hinweis auf die {{9}}: Eine Werkstatt entsteht in Jahren, ein Preis steigt in Wochen.

Sein Schluss lautet, dass über Ersatzteilpflicht verhandelt, in Wahrheit aber über {{10}} entschieden werde.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-09-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["ausgemacht", "selbstverständlich", "unbestritten"],
              explain:
                "İlk cümlenin yüklemi: \"gilt inzwischen als ausgemacht\" — yani üzerinde artık tartışılmıyor sayılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["Arbeitszeit", "Arbeit", "Lohnkosten"],
              explain:
                "\"Ein Gerät zu reparieren kostet vor allem Arbeitszeit, und Arbeitszeit ist dort teuer, wo repariert wird.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Endpreis", "Verkaufspreis", "Ladenpreis"],
              explain:
                "Karşılaştırma metinde açık: onarım üretim maliyetiyle değil, \"mit dem Endpreis eines weltweit organisierten Marktes\" yarışıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["ökologische", "ökologisch"],
              explain:
                "Ayrım üçüncü paragrafta: \"Der ökologische Vorteil des Reparierens ist unstrittig, der ökonomische ist es nicht.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Konstruktion", "Bauweise", "Bauart"],
              explain:
                "\"Die verbreitete Antwort lautet Konstruktion. Geräte müssten so gebaut sein, dass sich einzelne Teile tauschen lassen.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["Werkstätten", "Werkstatt", "Betriebe"],
              explain:
                "İtirazın özeti tek cümlede: \"Es fehlen weniger die Schrauben als die Werkstätten.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["Lehrlinge", "Auszubildende", "Nachwuchs"],
              explain:
                "Neden talep eksikliği değil: \"weil der Beruf keine Lehrlinge mehr fand\".",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Markt"],
              explain:
                "İtiraz metinde birebir aktarılıyor: \"Der Markt werde das regeln, sobald der Ersatz teurer wird.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Zeit", "Dauer", "Geschwindigkeit"],
              explain:
                "Çürütme iki süreyi karşılaştırıyor: \"die Zeit, die eine Werkstatt zum Entstehen braucht, bemisst sich in Jahren; die Zeit, in der ein Preis steigt, in Wochen\".",
            },
            {
              kind: "gap",
              id: "de-c1-09-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Ausbildungsplätze", "Ausbildung", "Ausbildungsplätzen"],
              explain:
                "Son cümledeki karşıtlık: \"Verhandelt wird über Ersatzteilpflicht und Garantiefristen; entschieden wird über Ausbildungsplätze.\"",
            },
          ],
        },
        {
          id: "de-c1-09-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Essay und die Aufgaben 11 bis 20. Wählen Sie: a, b, c oder d?",
          promptTr: "Deneme metnini ve 11–20. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Essay",
              genreTr: "Deneme",
              title: "Die Werkstatt meines Großvaters",
              body: `Die Werkstatt meines Großvaters roch nach Öl und heißem Lack. Ich habe sie als Kind für einen Ort der Rettung gehalten. Später verstand ich, dass sie vor allem ein Ort des Rechnens war.

Er hat nie repariert, was sich nicht lohnte. Er hat es nur anders gerechnet als wir. In seine Rechnung ging die Zeit ein, die ein Kunde auf ein Ersatzgerät hätte warten müssen, und der Umstand, dass dieser Kunde im Winter darauf angewiesen war. Ein Wirtschaftlichkeitsbegriff, der solche Größen nicht enthält, ist nicht objektiver, sondern ärmer.

Als er 1994 schloss, hat niemand von Nachhaltigkeit gesprochen. Man sprach von einem Betrieb, der keinen Nachfolger fand. Genau das ist die Geschichte, die heute fehlt, wenn über Reparatur geredet wird. Wir behandeln sie als Frage der Gesinnung, obwohl sie eine Frage der Ausbildung ist.

Ich beobachte in der eigenen Umgebung eine Bewegung, die mir sympathisch ist und die ich gleichwohl für überschätzt halte: die Reparaturcafés. Was dort geschieht, ist wertvoll und ehrenamtlich. Ehrenamt ist indes keine Infrastruktur. Es hängt an einzelnen Menschen, meistens an denselben, und es endet, wenn diese Menschen aufhören.

Der Einwand gegen meine Skepsis liegt auf der Hand: Auch eine kleine Bewegung verändert, was für normal gehalten wird. Das stimmt, und ich unterschätze es nicht. Nur werden Normen billiger verschoben als Werkstätten aufgebaut, und wer die eine Leistung für die andere nimmt, spart am falschen Ende.

Was ich mir wünschte, ist unspektakulär. Nicht mehr Appelle, sondern mehr Meisterprüfungen. Nicht die Wiederentdeckung eines Werts, sondern die Wiederherstellung eines Berufs.

Mein Großvater hätte diesen Text vermutlich für umständlich gehalten. Er hätte gesagt, man müsse nicht darüber schreiben, sondern jemanden anlernen. Er hatte, wie so oft, weitgehend recht.`,
              gloss: [
                { de: "die Gesinnung", tr: "zihniyet, tutum", en: "mindset, conviction" },
                { de: "das Ehrenamt", tr: "gönüllü hizmet", en: "voluntary work" },
                { de: "die Meisterprüfung", tr: "ustalık sınavı", en: "master craftsman exam" },
                { de: "anlernen", tr: "işi öğretmek", en: "to train on the job" },
                { de: "umständlich", tr: "dolambaçlı", en: "long-winded" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-09-l2-11",
              no: 11,
              ref: "t2",
              text: "Wie korrigiert der Autor seine Kindheitswahrnehmung?",
              options: [
                "Die Werkstatt war kein Ort der Rettung, sondern ein trostloser Betrieb.",
                "Die Werkstatt war vor allem ein Ort der Kalkulation.",
                "Die Werkstatt war weniger geordnet, als er in Erinnerung hat.",
                "Die Werkstatt war für den Großvater eine Last und keine Berufung.",
              ],
              answer: 1,
              explain:
                "\"Später verstand ich, dass sie vor allem ein Ort des Rechnens war\" — kurtarma yeri değil, hesap yeri.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-12",
              no: 12,
              ref: "t2",
              text: "Was sagt der Autor über die Rechnung des Großvaters?",
              options: [
                "Sie war ungenau, weil sie Gefühle einbezog.",
                "Sie war die einzige damals verfügbare Methode.",
                "Sie ignorierte die Wirtschaftlichkeit zugunsten der Kundschaft.",
                "Sie war umfassender als der heutige Begriff.",
              ],
              answer: 3,
              explain:
                "Yargı açık: bu büyüklükleri içermeyen bir iktisadilik kavramı \"nicht objektiver, sondern ärmer\" — yani dedenin hesabı daha geniş.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-13",
              no: 13,
              ref: "t2",
              text: "Welche Größen gingen in diese Rechnung ein?",
              options: [
                "Wartezeit und Angewiesenheit des Kunden.",
                "Der Materialwert und die Garantiedauer.",
                "Der Ruf des Betriebs im Ort.",
                "Die Nachfrage nach neuen Geräten im Winter.",
              ],
              answer: 0,
              explain:
                "İki büyüklük sayılıyor: \"die Zeit, die ein Kunde auf ein Ersatzgerät hätte warten müssen\" ve \"dass dieser Kunde im Winter darauf angewiesen war\".",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-14",
              no: 14,
              ref: "t2",
              text: "Wie beschreibt der Autor die Schließung von 1994?",
              options: [
                "Als frühen Fall eines ökologischen Bewusstseins.",
                "Als Folge einer verfehlten Wirtschaftspolitik.",
                "Als Nachfolgeproblem, nicht als Wertefrage.",
                "Als Entscheidung, die der Großvater bereut hat.",
              ],
              answer: 2,
              explain:
                "\"Man sprach von einem Betrieb, der keinen Nachfolger fand\" — o zaman kimse sürdürülebilirlikten söz etmiyormuş.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-15",
              no: 15,
              ref: "t2",
              text: "Worin sieht er den heutigen Denkfehler?",
              options: [
                "In der Vorstellung, Reparatur sei technisch schwierig.",
                "In der Annahme, alte Geräte seien grundsätzlich besser.",
                "In der Hoffnung auf staatliche Förderprogramme.",
                "In der Behandlung als Gesinnungs- statt Ausbildungsfrage.",
              ],
              answer: 3,
              explain:
                "\"Wir behandeln sie als Frage der Gesinnung, obwohl sie eine Frage der Ausbildung ist.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-16",
              no: 16,
              ref: "t2",
              text: "Wie steht der Autor zu den Reparaturcafés?",
              options: [
                "Er hält sie für wertvoll und überschätzt.",
                "Er lehnt die Bewegung als bloßes Ehrenamt ab.",
                "Er sieht in ihnen die einzige Infrastruktur.",
                "Er hält sie für eine Konkurrenz der Werkstätten.",
              ],
              answer: 0,
              explain:
                "İki yargıyı yan yana veriyor: \"eine Bewegung, die mir sympathisch ist und die ich gleichwohl für überschätzt halte\".",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-17",
              no: 17,
              ref: "t2",
              text: "Womit begründet er diese Einschätzung?",
              options: [
                "Ehrenamt sei keine Infrastruktur.",
                "Die Werkstätten arbeiteten fachlich genauer.",
                "Die Bewegung erreiche zu wenige Menschen.",
                "Die Reparaturcafés verdrängten die Betriebe.",
              ],
              answer: 0,
              explain:
                "Gerekçe kişilere bağımlılık: \"Es hängt an einzelnen Menschen, meistens an denselben, und es endet, wenn diese Menschen aufhören.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-18",
              no: 18,
              ref: "t2",
              text: "Wie geht er mit dem Einwand gegen seine Skepsis um?",
              options: [
                "Er weist ihn als naiv zurück.",
                "Er übergeht ihn im weiteren Verlauf.",
                "Er erkennt ihn an und begrenzt seine Reichweite.",
                "Er hält ihn für wichtiger als sein eigenes Argument.",
              ],
              answer: 2,
              explain:
                "Önce kabul: \"Das stimmt, und ich unterschätze es nicht.\" Sonra sınır: normlar atölyelerden ucuza kayar.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-19",
              no: 19,
              ref: "t2",
              text: "Was wünscht er sich stattdessen?",
              options: [
                "Eine gesetzliche Pflicht zur Reparatur.",
                "Mehr Meisterprüfungen statt Appelle.",
                "Steuerliche Vorteile für alte Geräte.",
                "Eine öffentliche Kampagne für Handwerksberufe.",
              ],
              answer: 1,
              explain:
                "\"Nicht mehr Appelle, sondern mehr Meisterprüfungen. Nicht die Wiederentdeckung eines Werts, sondern die Wiederherstellung eines Berufs.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l2-20",
              no: 20,
              ref: "t2",
              text: "Welche Funktion hat der Schlussabsatz?",
              options: [
                "Er nimmt die eigene Form ironisch zurück.",
                "Er kündigt an, künftig jemanden anzulernen.",
                "Er widerlegt den Einwand gegen seine Skepsis.",
                "Er stellt die Meisterprüfung als Lösung dar.",
              ],
              answer: 0,
              explain:
                "Dede metni \"umständlich\" bulurdu, yazmak yerine birini yetiştirmeyi isterdi — ve yazar \"Er hatte, wie so oft, weitgehend recht\" diyerek kendi biçimini geri alıyor.",
            },
          ],
        },
        {
          id: "de-c1-09-l3",
          no: 3,
          format: "gapMcq",
          goal: "structure",
          prompt: "Lesen Sie den Text und ergänzen Sie die Lücken 21 bis 25. Welche Lösung passt: a, b, c oder d?",
          promptTr: "Metni oku ve 21–25. boşlukları tamamla. Hangi seçenek uyar: a, b, c ya da d?",
          texts: [
            {
              kind: "text",
              id: "t3",
              genre: "Zeitschriftentext",
              genreTr: "Dergi metni",
              title: "Das Ersatzteil, das es gibt",
              body: `Seit der Novelle müssen Hersteller Ersatzteile sieben Jahre vorhalten. Verfügbar sind sie seither {{21}} auch tatsächlich — jedenfalls auf dem Papier.

In der Werkstatt sieht es anders aus. Ein Teil, {{22}} Bestellung vier Wochen dauert, hilft niemandem, der ohne Waschmaschine dasteht. Die Frist ist eingehalten, der Kunde kauft trotzdem neu.

Hinzu kommt der Preis. Verlangt ein Hersteller für die Steuerplatine mehr als die Hälfte des Gerätepreises, ist die Pflicht formal erfüllt, {{23}} sie wirtschaftlich ins Leere läuft.

Fachleute fordern deshalb weniger eine längere Frist {{24}} eine gedeckelte Preisbildung. Gesagt wird das ungern, weil es nach Eingriff klingt.

Was sich festhalten lässt: Eine Vorschrift wirkt erst dort, {{25}} sie das Verhalten an der Ladentheke verändert.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-09-l3-21",
              no: 21,
              ref: "t3",
              text: "Lücke 21",
              options: ["keinesfalls", "nirgendwo", "grundsätzlich", "zu keiner Zeit"],
              answer: 2,
              explain:
                "Sonraki kısıtlama (\"jedenfalls auf dem Papier\") ancak olumlu bir ilke cümlesinden sonra anlam taşır; üç olumsuz seçenek o kısıtlamayı gereksiz kılardı.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l3-22",
              no: 22,
              ref: "t3",
              text: "Lücke 22",
              options: ["dessen", "deren", "das", "dem"],
              answer: 0,
              explain:
                "İlgi cümlesi `Teil` adına ait bir tamlayan istiyor: \"ein Teil, dessen Bestellung vier Wochen dauert\". `Teil` eril/nötr olduğu için `dessen` gerekir.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l3-23",
              no: 23,
              ref: "t3",
              text: "Lücke 23",
              options: ["sofern", "damit", "während", "als ob"],
              answer: 2,
              explain:
                "Biçimsel yerine getirme ile ekonomik boşa çıkma arasında karşıtlık var; `während` bu karşıtlığı kurar. `sofern` koşul, `damit` amaç bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l3-24",
              no: 24,
              ref: "t3",
              text: "Lücke 24",
              options: ["wie", "als", "denn", "sondern"],
              answer: 1,
              explain:
                "`weniger …` karşılaştırması `als` ister: \"weniger eine längere Frist als eine gedeckelte Preisbildung\". `sondern` önünde olumsuzlama gerektirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-l3-25",
              no: 25,
              ref: "t3",
              text: "Lücke 25",
              options: ["wobei", "womit", "wo", "worin"],
              answer: 2,
              explain:
                "`erst dort` bir yer belirteci; onu karşılayan ilgi sözcüğü `wo`: \"erst dort, wo sie das Verhalten … verändert\".",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat zwei Aufgaben: Notizen ergänzen und eine Podiumsdiskussion auswerten.",
      instructionTr: "Bu bölümde iki görev var: notları tamamlamak ve bir panel tartışmasını çözümlemek.",
      tasks: [
        {
          id: "de-c1-09-h1",
          no: 1,
          format: "notes",
          goal: "detail",
          prompt:
            "Sie hören eine Informationsveranstaltung. Ergänzen Sie die Notizen 1 bis 10. Schreiben Sie höchstens drei Wörter in jede Lücke. Sie hören den Text einmal.",
          promptTr:
            "Bir bilgilendirme konuşması dinleyeceksin. 1–10. notları tamamla. Her boşluğa en çok üç sözcük yaz. Kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Informationsveranstaltung",
              genreTr: "Bilgilendirme konuşması",
              title: "Das Reparaturzentrum Nordfeld — Vorstellung",
              situation: "Belediyenin ekonomik kalkınma biriminden biri yeni bir merkezi anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend, mein Name ist Henrike Lohmeyer, ich leite die Wirtschaftsförderung. Ich stelle Ihnen das Reparaturzentrum Nordfeld vor und beginne mit dem, was es nicht ist: Es ist kein Reparaturcafé. Die Arbeit dort wird bezahlt.",
                },
                {
                  text: "Der Standort ist die frühere Buswerkstatt an der Feldstraße. Wir haben dort achthundert Quadratmeter, davon sind vierhundertfünfzig als Werkstattfläche vorgesehen.",
                },
                {
                  text: "Getragen wird das Zentrum von drei Handwerksbetrieben gemeinsam. Die Gemeinde stellt die Halle und übernimmt in den ersten drei Jahren die Miete; danach zahlen die Betriebe marktüblich.",
                },
                {
                  text: "Zum Kern des Vorhabens: Es geht uns nicht in erster Linie um die Geräte, sondern um die Ausbildung. Vorgesehen sind sechs Ausbildungsplätze pro Jahr, verteilt auf die drei Betriebe.",
                },
                {
                  text: "Zur Finanzierung: Das Land trägt sechzig Prozent der Umbaukosten, die auf eine Million zweihunderttausend Euro geschätzt werden. Den Rest teilen sich Gemeinde und Betriebe.",
                },
                {
                  text: "Ein Punkt, den ich nicht beschönigen will: Vergleichbare Zentren in anderen Städten haben im Schnitt fünf Jahre gebraucht, bis sie ohne Zuschuss ausgekommen sind. Zwei von sieben haben es nie geschafft.",
                },
                {
                  text: "Was wir dagegen genau wissen, ist die Nachfrage. Eine Erhebung im Frühjahr ergab, dass achtundsechzig Prozent der Befragten ein defektes Gerät im Haushalt haben, das sie reparieren lassen würden.",
                },
                {
                  text: "Die Öffnungszeiten stehen noch nicht endgültig fest. Sicher ist nur der Samstagvormittag, weil die Erhebung ihn als wichtigsten Wunsch ergeben hat.",
                },
                {
                  text: "Was wir messen werden: die Zahl der abgeschlossenen Aufträge, die durchschnittliche Wartezeit und die Zahl der bestandenen Gesellenprüfungen. Berichtet wird jährlich im Wirtschaftsausschuss.",
                },
                {
                  text: "Und was wir von Ihnen brauchen: Wer eine Werkstattfläche mieten möchte, meldet sich bitte bis zum fünfzehnten November. Später eingehende Bewerbungen kommen erst in der zweiten Runde zum Zuge.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizen",
              genreTr: "Notlar",
              body: `Ausdrücklich kein {{1}} — die Arbeit wird bezahlt.

Standort: frühere {{2}} an der Feldstraße.

Als Werkstattfläche vorgesehen: {{3}} Quadratmeter.

Träger: {{4}} Handwerksbetriebe gemeinsam.

Miete übernimmt die Gemeinde für die ersten {{5}}.

Kern des Vorhabens ist nicht das Gerät, sondern die {{6}}.

Geschätzte Umbaukosten: {{7}} Euro.

Vergleichbare Zentren brauchten im Schnitt {{8}} ohne Zuschuss.

Anteil der Befragten mit defektem Gerät: {{9}} Prozent.

Bewerbung für eine Werkstattfläche bis {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-09-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Reparaturcafé", "Reparaturcafe", "Ehrenamt"],
              explain:
                "Konuşma bu ayrımla açılıyor: \"Es ist kein Reparaturcafé. Die Arbeit dort wird bezahlt.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["Buswerkstatt", "Werkstatt"],
              explain:
                "\"Der Standort ist die frühere Buswerkstatt an der Feldstraße.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["450", "vierhundertfünfzig"],
              explain:
                "Sekiz yüz metrekarenin bir bölümü: \"davon sind vierhundertfünfzig als Werkstattfläche vorgesehen\".",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["drei", "3"],
              explain:
                "\"Getragen wird das Zentrum von drei Handwerksbetrieben gemeinsam.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["drei Jahre", "3 Jahre", "drei Jahren"],
              explain:
                "\"übernimmt in den ersten drei Jahren die Miete; danach zahlen die Betriebe marktüblich\".",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["Ausbildung", "Ausbildungsplätze"],
              explain:
                "Projenin çekirdeği: \"Es geht uns nicht in erster Linie um die Geräte, sondern um die Ausbildung.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["1.200.000", "1200000", "eine Million zweihunderttausend"],
              explain:
                "\"die auf eine Million zweihunderttausend Euro geschätzt werden\" — eyalet bunun yüzde altmışını üstleniyor.",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["fünf Jahre", "5 Jahre", "fünf Jahren"],
              explain:
                "\"haben im Schnitt fünf Jahre gebraucht, bis sie ohne Zuschuss ausgekommen sind\" — yediden ikisi hiç başaramamış.",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["68", "achtundsechzig"],
              explain:
                "\"Eine Erhebung im Frühjahr ergab, dass achtundsechzig Prozent der Befragten ein defektes Gerät im Haushalt haben.\"",
            },
            {
              kind: "gap",
              id: "de-c1-09-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["15. November", "fünfzehnten November", "15. 11."],
              explain:
                "\"meldet sich bitte bis zum fünfzehnten November. Später eingehende Bewerbungen kommen erst in der zweiten Runde zum Zuge.\"",
            },
          ],
        },
        {
          id: "de-c1-09-h2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt:
            "Sie hören eine Podiumsdiskussion. Wählen Sie zu den Aufgaben 11 bis 25: a, b oder c. Sie hören den Text zweimal.",
          promptTr:
            "Bir panel tartışması dinleyeceksin. 11–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              title: "Reparieren — Pflicht, Prämie oder Beruf?",
              situation: "Bir usta, bir iktisatçı ve bir tüketici derneği temsilcisi tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Herr Achterberg, Sie führen eine Elektrowerkstatt in dritter Generation. Was hat sich für Sie durch den Reparaturbonus geändert?",
                },
                {
                  speaker: "Herr Achterberg",
                  text: "Die Zahl der Anfragen ist gestiegen, das schon. Nur habe ich niemanden, der sie annimmt. Ich hatte im letzten Jahr sechs Bewerbungen auf drei Ausbildungsplätze, und vier davon haben nach dem ersten Monat aufgehört. Der Bonus verschiebt die Nachfrage, er baut keine Werkstatt.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Sondermann, Sie haben die Wirkung solcher Prämien untersucht. Deckt sich das mit Ihren Zahlen?",
                },
                {
                  speaker: "Frau Sondermann",
                  text: "Weitgehend. Wir sehen im ersten Jahr einen Anstieg um etwa dreißig Prozent, der im zweiten Jahr auf zwölf zurückgeht. Bemerkenswert ist die Zusammensetzung: Ein erheblicher Teil sind Reparaturen, die auch ohne Bonus stattgefunden hätten. Der Bonus bezahlt sie mit.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Vietzke, Sie vertreten den Verbraucherverband. Ist die Prämie damit ein Fehlschlag?",
                },
                {
                  speaker: "Frau Vietzke",
                  text: "Das wäre mir zu schnell. Sie ist teuer und wirkt unsauber, ja. Aber sie ist das einzige Instrument, das beim Kunden ankommt und nicht erst über zehn Jahre. Ich verteidige sie ungern, und ich verteidige sie trotzdem.",
                },
                {
                  speaker: "Herr Achterberg",
                  text: "Ich will das nicht kleinreden. Für meine Kundschaft ist der Bonus spürbar. Nur bekomme ich davon keinen Gesellen, und in sechs Jahren gehe ich in Rente.",
                },
                {
                  speaker: "Frau Sondermann",
                  text: "Das ist der Punkt, an dem meine Zunft üblicherweise schweigt. Wir messen, was sich messen lässt: Aufträge, Umsätze, Vermeidungsmengen. Die Zahl der Werkstätten in zehn Jahren steht in keinem unserer Modelle.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Frau Vietzke, wäre eine Ausbildungsförderung nicht das bessere Instrument?",
                },
                {
                  speaker: "Frau Vietzke",
                  text: "Sachlich ja. Politisch ist sie fast unmöglich, weil die Wirkung in einer anderen Wahlperiode eintritt. Das ist keine Ausrede, es ist eine Beschreibung.",
                },
                {
                  speaker: "Herr Achterberg",
                  text: "Und es ist genau der Grund, warum ich Ihnen misstraue, bei allem Respekt. Alle sagen mir, Ausbildung sei wichtig, und alle finanzieren die Prämie.",
                },
                {
                  speaker: "Frau Sondermann",
                  text: "Der Vorwurf trifft. Ich würde ihn nur nicht an die Politik allein richten. Auch die Betriebe haben zwanzig Jahre lang nicht ausgebildet, weil sich das kurzfristig nicht gerechnet hat.",
                },
                {
                  speaker: "Herr Achterberg",
                  text: "Da haben Sie recht, und das sage ich nicht gern. Mein Vater hat 2003 den letzten Lehrling entlassen, weil zwei Monteure billiger waren. Wir haben unser Problem mitgebaut.",
                },
                {
                  speaker: "Moderatorin",
                  text: "Wenn Sie sich auf ein Instrument einigen müssten — welches?",
                },
                {
                  speaker: "Frau Sondermann",
                  text: "Eine an die Ausbildung gekoppelte Förderung. Wer ausbildet, bekommt den Zuschuss; wer nicht, bekommt ihn nicht. Damit fällt der Mitnahmeeffekt weitgehend weg.",
                },
                {
                  speaker: "Frau Vietzke",
                  text: "Dem stimme ich zu, unter einer Bedingung: Der Kunde darf das nicht merken. Wenn die Reparatur für ihn teurer wird, kauft er neu, und dann ist der beste Ausbildungsplatz nutzlos.",
                },
                {
                  speaker: "Herr Achterberg",
                  text: "Damit könnte ich leben. Ich sage nur dazu: Wenn das kommt, kommt es zu spät für meinen Betrieb. Das ist kein Vorwurf mehr, das ist eine Zeitangabe.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-09-h2-11",
              no: 11,
              ref: "d1",
              text: "Was hat sich für Herrn Achterberg durch den Bonus geändert?",
              options: [
                "Die Nachfrage, nicht die Kapazität.",
                "Sowohl die Nachfrage als auch der Umsatz.",
                "Zunächst nichts, später die Bewerberlage.",
              ],
              answer: 0,
              explain:
                "Talep artmış ama karşılayacak kimse yok: \"Der Bonus verschiebt die Nachfrage, er baut keine Werkstatt.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-12",
              no: 12,
              ref: "d1",
              text: "Womit belegt er das?",
              options: [
                "Mit dem Umsatz des letzten Quartals.",
                "Mit Bewerbungen und Abbrüchen.",
                "Mit der Zahl abgelehnter Aufträge.",
              ],
              answer: 1,
              explain:
                "Üç yere altı başvuru gelmiş, \"vier davon haben nach dem ersten Monat aufgehört\".",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-13",
              no: 13,
              ref: "d1",
              text: "Wie entwickelt sich der Anstieg laut Frau Sondermann?",
              options: [
                "Er bleibt über beide Jahre stabil.",
                "Er wächst im zweiten Jahr weiter an.",
                "Er geht im zweiten Jahr deutlich zurück.",
              ],
              answer: 2,
              explain:
                "\"einen Anstieg um etwa dreißig Prozent, der im zweiten Jahr auf zwölf zurückgeht\" — 30'dan 12'ye.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-14",
              no: 14,
              ref: "d1",
              text: "Was hält sie an der Zusammensetzung für bemerkenswert?",
              options: [
                "Viele Fälle wären ohnehin repariert worden.",
                "Es handelt sich meist um sehr alte Geräte.",
                "Die meisten Anträge kommen aus einer Region.",
              ],
              answer: 0,
              explain:
                "\"Ein erheblicher Teil sind Reparaturen, die auch ohne Bonus stattgefunden hätten. Der Bonus bezahlt sie mit.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-15",
              no: 15,
              ref: "d1",
              text: "Wie bewertet Frau Vietzke die Prämie?",
              options: [
                "Als eindeutigen Fehlschlag.",
                "Als teuer, aber unmittelbar wirksam.",
                "Als das beste verfügbare Instrument.",
              ],
              answer: 1,
              explain:
                "Kusurları kabul edip savunuyor: \"Ich verteidige sie ungern, und ich verteidige sie trotzdem.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-16",
              no: 16,
              ref: "d1",
              text: "Womit begründet sie diese Haltung?",
              options: [
                "Mit dem Druck aus der Mitgliedschaft.",
                "Mit der Höhe der eingesparten Emissionen.",
                "Mit der Geschwindigkeit der Wirkung.",
              ],
              answer: 2,
              explain:
                "\"das einzige Instrument, das beim Kunden ankommt und nicht erst über zehn Jahre\".",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-17",
              no: 17,
              ref: "d1",
              text: "Wie stellt Herr Achterberg seine eigene Lage dar?",
              options: [
                "Als vorübergehende Schwierigkeit.",
                "Als Folge falscher Förderbedingungen.",
                "Als zeitlich begrenzt durch die Rente.",
              ],
              answer: 2,
              explain:
                "Prim müşterisine yarıyor ama ona kalfa getirmiyor: \"in sechs Jahren gehe ich in Rente\".",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-18",
              no: 18,
              ref: "d1",
              text: "Welche Schwäche räumt Frau Sondermann für ihr Fach ein?",
              options: [
                "Die Werkstattzahl fehlt in den Modellen.",
                "Die Erhebungen sind zu klein angelegt.",
                "Die Ergebnisse werden zu spät veröffentlicht.",
              ],
              answer: 0,
              explain:
                "\"Wir messen, was sich messen lässt … Die Zahl der Werkstätten in zehn Jahren steht in keinem unserer Modelle.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-19",
              no: 19,
              ref: "d1",
              text: "Warum hält Frau Vietzke eine Ausbildungsförderung für schwierig?",
              options: [
                "Weil die Betriebe sie ablehnen.",
                "Weil die Wirkung zu spät sichtbar wird.",
                "Weil das Geld dafür nicht ausreicht.",
              ],
              answer: 1,
              explain:
                "Konusal olarak katılıyor ama: \"Politisch ist sie fast unmöglich, weil die Wirkung in einer anderen Wahlperiode eintritt.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-20",
              no: 20,
              ref: "d1",
              text: "Wie bezeichnet sie diese Feststellung selbst?",
              options: [
                "Als Ausrede, die sie bedauert.",
                "Als Vorwurf an die Betriebe.",
                "Als Beschreibung, nicht als Rechtfertigung.",
              ],
              answer: 2,
              explain:
                "Ayrımı kendisi yapıyor: \"Das ist keine Ausrede, es ist eine Beschreibung.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-21",
              no: 21,
              ref: "d1",
              text: "Worin besteht Herrn Achterbergs Vorwurf?",
              options: [
                "Alle loben Ausbildung, finanzieren aber Prämien.",
                "Die Forschung arbeite an der Praxis vorbei.",
                "Der Verband vertrete nur große Anbieter.",
              ],
              answer: 0,
              explain:
                "\"Alle sagen mir, Ausbildung sei wichtig, und alle finanzieren die Prämie.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-22",
              no: 22,
              ref: "d1",
              text: "Wie reagiert Frau Sondermann darauf?",
              options: [
                "Sie weist den Vorwurf zurück.",
                "Sie nimmt ihn an und erweitert ihn.",
                "Sie verschiebt ihn auf die Politik.",
              ],
              answer: 1,
              explain:
                "\"Der Vorwurf trifft. Ich würde ihn nur nicht an die Politik allein richten\" — işletmeler de yirmi yıl çırak almamış.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-23",
              no: 23,
              ref: "d1",
              text: "Was gibt Herr Achterberg daraufhin zu?",
              options: [
                "Er hat den Bonus zu früh verurteilt.",
                "Seine Zahlen waren nicht belastbar.",
                "Der eigene Betrieb hat mitgebaut.",
              ],
              answer: 2,
              explain:
                "Yılı ve gerekçesiyle veriyor: babası 2003'te son çırağı çıkarmış, \"weil zwei Monteure billiger waren\".",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-24",
              no: 24,
              ref: "d1",
              text: "Welches Instrument schlägt Frau Sondermann vor?",
              options: [
                "Zuschuss nur für ausbildende Betriebe.",
                "Eine deutlich höhere Prämie für ältere Geräte.",
                "Eine gesetzliche Pflicht zur Ausbildung.",
              ],
              answer: 0,
              explain:
                "Koşul açık: \"Wer ausbildet, bekommt den Zuschuss; wer nicht, bekommt ihn nicht\" — böylece kayıp etkisi büyük ölçüde düşüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-09-h2-25",
              no: 25,
              ref: "d1",
              text: "Welche Bedingung knüpft Frau Vietzke daran?",
              options: [
                "Eine jährliche Überprüfung der Wirkung.",
                "Der Kunde darf nichts davon spüren.",
                "Kleine Betriebe müssen ausgenommen bleiben.",
              ],
              answer: 1,
              explain:
                "Gerekçesiyle: onarım müşteri için pahalılaşırsa yeni alır, \"und dann ist der beste Ausbildungsplatz nutzlos\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction: "Dieser Teil hat zwei Aufgaben: eine Stellungnahme und einen förmlichen Brief mit Lücken.",
      instructionTr: "Bu bölümde iki görev var: bir görüş yazısı ve boşluklu resmî bir mektup.",
      tasks: [
        {
          id: "de-c1-09-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Wochenzeitung stand: \"Wer will, dass Geräte länger halten, muss Neugeräte teurer machen — alles andere ist Symbolpolitik.\" Schreiben Sie eine Stellungnahme (circa 200 Wörter). Ordnen Sie die These ein, prüfen Sie sie an einem Beispiel, nennen Sie einen Einwand gegen Ihre eigene Position und ziehen Sie eine Schlussfolgerung.",
          promptTr:
            "Bir haftalık gazetede şöyle yazdı: \"Cihazların uzun ömürlü olmasını isteyen, yenilerini pahalılaştırmak zorundadır — geri kalanı sembolik siyasettir.\" Bir görüş yazısı yaz (yaklaşık 200 kelime). Savı yerine oturt, bir örnekle sına, kendi konumuna yönelik bir itirazı da söyle ve bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Die These präzise einordnen.", tr: "Savı tam olarak yerine oturt." },
              { de: "An einem Beispiel prüfen.", tr: "Bir örnekle sına." },
              { de: "Einen Einwand gegen die eigene Position nennen.", tr: "Kendi konumuna itiraz getir." },
              { de: "Eine begründete Schlussfolgerung ziehen.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Die These hat einen richtigen Kern und zieht daraus die falsche Folgerung. Richtig ist, dass die Reparatur nicht mit den Herstellungskosten konkurriert, sondern mit dem Ladenpreis eines Neugeräts. Solange dieser Preis niedrig bleibt, rechnet sich keine Arbeitsstunde. Falsch ist der Schluss, ein höherer Preis genüge. Er setzt voraus, dass die Werkstatt, in die der verteuerte Kunde ausweichen soll, überhaupt existiert.

Prüfen lässt sich das an der Ersatzteilpflicht. Sieben Jahre Vorhaltung sind vorgeschrieben und werden eingehalten; die Bestellung dauert gleichwohl vier Wochen, und die Steuerplatine kostet mehr als die Hälfte des Geräts. Die Pflicht ist erfüllt, die Wirkung bleibt aus. Eine Verteuerung des Neugeräts hätte hier nichts geändert — sie hätte den Kunden lediglich vier Wochen länger warten lassen.

Gegen meine Position spricht allerdings ein starkes Argument: Ohne Preissignal entsteht auch dann keine Nachfrage, wenn Werkstätten vorhanden sind. Wer Ausbildung fordert, ohne den Preis anzufassen, bildet für einen Markt aus, den es nicht gibt. Dieser Einwand wiegt schwer, und ich kann ihn nicht auflösen, sondern nur einordnen.

Meine Schlussfolgerung lautet deshalb: Der Preis ist notwendig und nicht hinreichend. Er wirkt in Wochen, eine Werkstatt entsteht in Jahren — wer nur das Schnelle tut, hat in fünf Jahren teure Geräte und niemanden, der sie repariert.`,
            criteria: [
              "Sav gerçekten yerine oturtuldu mu — hangi ayrım yapılmadan sav ayakta duruyor?",
              "Örnek savı sınıyor mu, yoksa yalnız yazarın konumunu resimliyor mu?",
              "İtiraz kendi konumuna mı yönelik ve gerçekten güçlü mü?",
              "Sonuç itirazdan sonra hâlâ ayakta mı, yoksa itirazı yok mu sayıyor?",
              "Yaklaşık 200 kelime var mı; metin bölümlenmiş ve bağlaçlarla yürütülmüş mü?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-c1-09-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie bewerben sich als Betrieb um eine Werkstattfläche im Reparaturzentrum Nordfeld. Ergänzen Sie die Lücken 1 bis 10 im Schreiben. Schreiben Sie in jede Lücke ein Wort.",
          promptTr:
            "Bir işletme olarak Nordfeld Onarım Merkezi'nde bir atölye alanı için başvuruyorsun. Yazıdaki 1–10. boşlukları tamamla. Her boşluğa bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Bewerbungsschreiben",
              genreTr: "Başvuru yazısı",
              title: "An die Wirtschaftsförderung der Gemeinde",
              body: `Sehr geehrte Damen und Herren,

{{1}} auf Ihre Informationsveranstaltung vom 3. Oktober bewerbe ich mich fristgerecht um eine Werkstattfläche im Reparaturzentrum Nordfeld.

Vorab: Das Ziel der Ausbildung halte ich für richtig. Meine Bewerbung stützt sich {{2}} nur auf den Bedarf an Fläche, sondern vor allem auf diesen Punkt.

Mein Betrieb besteht seit 1968 und bildet {{3}} zwölf Jahren ununterbrochen aus. Derzeit beschäftige ich vier Gesellen und zwei Auszubildende; einen dritten Platz könnte ich sofort besetzen, wenn die Fläche zur {{4}} steht.

Zwei Punkte möchte ich offen ansprechen. Erstens ist mir die Miete nach dem dritten Jahr {{5}} nicht kalkulierbar, solange kein Rahmen genannt wird. Zweitens halte ich den Samstagvormittag {{6}} für sinnvoll, wenn die Werkstätten dabei abgestimmt öffnen.

Ich beantrage {{7}}, mir eine Fläche von etwa hundert Quadratmetern zuzuweisen und mir den Mietrahmen ab dem vierten Jahr vorab mitzuteilen.

Für Rückfragen stehe ich Ihnen gern zur {{8}}. Über eine Eingangsbestätigung {{9}} zum 15. November wäre ich Ihnen verbunden.

Mit freundlichen Grüßen
Jens {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-09-s2-1",
              no: 1,
              text: "Lücke 1 (Bezugnahme auf eine Veranstaltung)",
              accept: ["Bezugnehmend", "Bezug"],
              explain:
                "Resmî yazının açılış kalıbı: `Bezugnehmend auf Ihre Informationsveranstaltung …` ya da `Bezug nehmend`. Cümle `auf` ile sürdüğü için bu iki biçim oturur.",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-2",
              no: 2,
              text: "Lücke 2 (Verneinung vor „sondern“)",
              accept: ["nicht"],
              explain:
                "`nicht nur … sondern vor allem` ikilisi gerekiyor: başvuru yalnız alan ihtiyacına değil, öncelikle eğitime dayanıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-3",
              no: 3,
              text: "Lücke 3 (Beginn eines andauernden Zeitraums)",
              accept: ["seit"],
              explain:
                "Süren bir durumun başlangıcı `seit` ile verilir: \"bildet seit zwölf Jahren ununterbrochen aus\". `vor` bitmiş bir noktayı, `ab` geleceği işaretler.",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-4",
              no: 4,
              text: "Lücke 4 (feste Wendung: zur … stehen)",
              accept: ["Verfügung"],
              explain:
                "Alan için `zur Verfügung stehen` kalıbı gerekiyor — \"wenn die Fläche zur Verfügung steht\". Kalıptaki ad değiştirilemez.",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-5",
              no: 5,
              text: "Lücke 5 (Einschränkung: bis jetzt)",
              accept: ["bislang", "bisher", "derzeit"],
              explain:
                "Eksiklik zaman içinde yerleştiriliyor: çerçeve verilmediği sürece kira \"bislang nicht kalkulierbar\".",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-6",
              no: 6,
              text: "Lücke 6 (Einschränkung: nur unter einer Bedingung)",
              accept: ["nur", "allein", "ausschließlich"],
              explain:
                "Sonraki `wenn` cümlesi koşulu veriyor; ondan önce kısıtlayıcı bir belirteç gerekiyor: \"nur dann, wenn die Werkstätten abgestimmt öffnen\".",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-7",
              no: 7,
              text: "Lücke 7 (Folgerung im Mittelfeld)",
              accept: ["daher", "deshalb", "folglich"],
              explain:
                "Açıkça sıralanan iki noktadan (\"Erstens … Zweitens …\") sonra talep geliyor; `daher` bu çıkarımı taşır ve çekimli fiilin ardında durur.",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-8",
              no: 8,
              text: "Lücke 8 (feste Wendung: zur … stehen)",
              accept: ["Verfügung"],
              explain:
                "Kapanış kalıbı aynı yapıyı yineliyor: `Für Rückfragen stehe ich Ihnen gern zur Verfügung.`",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-9",
              no: 9,
              text: "Lücke 9 (Frist)",
              accept: ["bis"],
              explain:
                "Son tarih için `bis zum 15. November`. `ab` süreyi başlatır, `seit` geçmişe bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-09-s2-10",
              no: 10,
              text: "Lücke 10 (Nachname des Absenders)",
              accept: ["Achterberg"],
              explain:
                "Yazan kişi dinleme bölümündeki ustayla aynı: Jens Achterberg, elektrik atölyesini üçüncü kuşak işleten kişi.",
            },
          ],
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
          id: "de-c1-09-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Haltbarkeit: Frage der Technik oder der Arbeit?\". Gliedern Sie: Einstieg — Begriffsklärung — Argumente für die eine Seite — Argumente für die andere — eigene Position mit Einwand — Abschluss.",
          promptTr:
            "\"Dayanıklılık: teknik meselesi mi, emek meselesi mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavram açıklaması — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun ve ona itiraz — kapanış.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 6,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve bölümleme" },
              { de: "Begriffe klären", tr: "Kavramları açmak" },
              { de: "Argumente für beide Seiten", tr: "İki tarafın da gerekçeleri" },
              { de: "eigene Position mit Einwand", tr: "Kendi konumun ve ona itiraz" },
              { de: "Beispiele", tr: "Örnekler" },
              { de: "Abschluss", tr: "Kapanış" },
            ],
            sample:
              "Ich möchte darüber sprechen, ob Haltbarkeit eine Frage der Technik oder der Arbeit ist. Ich kläre zuerst die Begriffe, stelle dann beide Seiten dar und komme am Ende zu meiner Position, gegen die ich selbst einen Einwand vorbringen werde. Mit Technik meine ich die Bauweise eines Geräts — ob sich Teile lösen und tauschen lassen. Mit Arbeit meine ich die Menschen, die diesen Tausch ausführen, und die Ausbildung, die dahintersteht. Für die technische Lesart spricht viel. Ein verklebtes Gehäuse macht jede Reparatur unmöglich, unabhängig davon, wie viele Fachkräfte es gibt. Regelungen zur Konstruktion wirken zudem sofort und gelten für alle Hersteller gleichermaßen. Für die andere Lesart spricht die Erfahrung. Ein zerlegbares Gerät ist noch kein repariertes; ohne Werkstatt liegt es zerlegbar im Keller. In meiner Heimatstadt haben von neun Elektrowerkstätten sieben geschlossen, und keine davon wegen der Bauweise. Meine Position ist deshalb, dass die technische Debatte die bequemere ist, weil sie die Verantwortung bei den Herstellern belässt. Der Einwand dagegen wiegt allerdings schwer: Ausbildung wirkt erst nach Jahren, und Konstruktionsregeln wirken sofort. Wer nur ausbildet, verliert die Zwischenzeit. Ich halte meine Position gleichwohl, weil die Zwischenzeit endet und der Fachkräftemangel nicht. Zusammenfassend: Die Technik entscheidet, ob repariert werden kann; die Arbeit entscheidet, ob repariert wird.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavramlar gerçekten açıldı mı — teknik ile emek ayrımı somut mu?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Kendi konumuna yönelik itiraz gerçek bir itiraz mı ve yanıtlandı mı?",
              "Dört dakika boyunca yapı korunabildi mi?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-09-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Gemeinde hat 300.000 Euro für die Reparaturwirtschaft und muss vier Fragen klären: Prämie für Kunden oder Zuschuss für Betriebe? An Ausbildung gekoppelt oder nicht? Ein Zentrum oder verteilte Förderung? Was passiert nach fünf Jahren? Einigen Sie sich.",
          promptTr:
            "Birlikte bir karar verin. Bir belediyenin onarım ekonomisi için 300.000 avrosu var ve dört soruyu çözmesi gerekiyor: Müşteriye prim mi, işletmeye destek mi? Eğitime bağlı mı, değil mi? Tek merkez mi, dağıtılmış destek mi? Beş yıl sonra ne olacak? Anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich beginne: Ich wäre für die Prämie an die Kunden. Sie wirkt sofort, und die Leute merken, dass sich etwas bewegt. Was meinen Sie?",
              tr: "Ben başlayayım: Müşteriye verilen primden yanayım. Hemen etki ediyor ve insanlar bir şeylerin kımıldadığını görüyor. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir konum al ve 'hemen etki ediyor' gerekçesini doğrudan ele al.",
              expect: "bir konum almak ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Zur Kopplung an die Ausbildung: Sie schließt kleine Betriebe aus, die gar nicht ausbilden können. Ist das gerecht?",
              tr: "Eğitime bağlama meselesi: Bu, hiç çırak alamayacak küçük işletmeleri dışarıda bırakır. Adil mi?",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve gerekirse bir ayrım ya da kademe öner.",
              expect: "itirazı ele almak ve gerekirse kademeli bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Ein Zentrum ist sichtbar, aber es steht an einem Ort. Verteilte Förderung erreicht mehr Betriebe, sieht aber nach nichts aus. Wie entscheiden Sie?",
              tr: "Tek merkez görünür ama tek bir yerde duruyor. Dağıtılmış destek daha çok işletmeye ulaşır ama hiçbir şey yapılmamış gibi görünür. Nasıl karar verirsin?",
            },
            {
              who: "you",
              hint: "Bir seçim yap ve görünürlük gerekçesini de tart.",
              expect: "gerekçeli bir seçim yapmak ve görünürlük argümanını tartmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Fassen Sie bitte zusammen, worauf wir uns geeinigt haben, einschließlich der Punkte, die offen bleiben.",
              tr: "Peki. Neyde anlaştığımızı özetler misin — açık kalan noktalar da dâhil?",
            },
            {
              who: "you",
              hint: "Anlaşmayı ve açık kalanları eksiksiz özetle.",
              expect: "anlaşmayı ve açık kalan noktaları eksiksiz özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 7,
            points: [
              { de: "eine Position begründen", tr: "Bir konumu gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "einen Kompromiss formulieren", tr: "Bir uzlaşı biçimlendirmek" },
              { de: "Ergebnis und offene Punkte zusammenfassen", tr: "Sonucu ve açık noktaları özetlemek" },
            ],
            sample:
              "Das Argument mit der sofortigen Wirkung überzeugt mich zur Hälfte. Die Prämie kommt an, nur bezahlt sie zu einem erheblichen Teil Reparaturen mit, die ohnehin stattgefunden hätten. Ich schlage deshalb eine Aufteilung vor: hunderttausend als Prämie, damit die Nachfrage sichtbar bleibt, zweihunderttausend als Zuschuss an Betriebe. Zur Kopplung: Ihr Einwand trifft die kleinen Betriebe zu Recht, und ich würde deshalb staffeln. Wer ausbildet, bekommt den vollen Satz; wer sich an einer Verbundausbildung beteiligt, bekommt zwei Drittel; wer beides nicht kann, bekommt die Fläche zum halben Mietsatz. Damit ist niemand ausgeschlossen und der Anreiz bleibt erhalten. Bei der Struktur entscheide ich mich für das Zentrum. Sichtbarkeit ist ein reales Argument, nur lässt sie sich nachträglich herstellen; eine gemeinsame Halle mit gemeinsamen Maschinen lässt sich nicht nachträglich verteilen. Zusammengefasst: ein Zentrum, Zuschuss gestaffelt nach Ausbildung, ein Drittel als Prämie. Offen bleibt ausdrücklich die Frage nach fünf Jahren — vergleichbare Zentren haben im Schnitt genau so lange gebraucht, und zwei von sieben haben es nie geschafft. Ich möchte das nicht durch eine optimistische Annahme verdecken.",
            criteria: [
              "Konum gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "Küçük işletmelerin dışarıda kalma itirazına somut bir çözüm getirildi mi?",
              "Görünürlük argümanı tartıldı mı, yoksa yok mu sayıldı?",
              "Özet açık kalan noktayı da içeriyor mu, yoksa anlaşma varmış gibi mi kapatıyor?",
              "Tartışma dili C1 düzeyinde mi (einräumen, abwägen, staffeln, offenlegen)?",
            ],
          },
        },
      ],
    },
  ],
};
