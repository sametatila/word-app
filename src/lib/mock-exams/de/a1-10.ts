import type { MockPaper } from "../types";

/**
 * A1 · Deneme 10 — "Kleidung und Größen".
 *
 * PLAN kâğıt 1–9 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: giysi, beden, renk. A1'in en somut alanlarından biri ve ilk
 * dokuz kâğıdın hiç girmediği yer. Beden numarası, renk, değiştirme, tamir —
 * hepsi tek sözcükle sorulup tek sözcükle cevaplanabilen ama yanlış anlaşılınca
 * gerçek sonuç doğuran şeyler.
 *
 * DİKKAT EDİLEN: sayı ayrımı bu kâğıdın omurgası. Beden 38 ile 48, 12,90 ile
 * 19,20 gibi çiftler bilerek yakın seçildi; A1'de sayıyı duymak kelime
 * bilgisinden önce gelen bir beceri.
 */
export const A1_10: MockPaper = {
  id: "de-a1-10",
  course: "de",
  level: "A1",
  no: 10,
  theme: "Kleidung und Größen",
  themeTr: "Giysi ve bedenler",
  minutes: 80,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 25,
      instruction:
        "Dieser Teil hat drei Aufgaben. Sie lesen eine E-Mail, Anzeigen und Schilder. Zu jedem Text gibt es Fragen. Wählen Sie die richtige Lösung.",
      instructionTr:
        "Bu bölümde üç görev var. Bir e-posta, ilanlar ve levhalar okuyacaksın. Her metnin soruları var; doğru cevabı işaretle.",
      tasks: [
        {
          id: "de-a1-10-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 1 bis 5. Sind die Sätze richtig oder falsch?",
          promptTr: "İki metni ve 1–5. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "E-Mail",
              genreTr: "E-posta",
              title: "Von: mia.gruber@mail.de",
              body: `Hallo Selin,

am Samstag ist die Feier. Ich habe noch kein Kleid.

Du hast doch das blaue Kleid in Größe 38. Kann ich es leihen?

Ich bringe es am Montag zurück. Gewaschen natürlich.

Wenn es nicht geht, ist das auch in Ordnung.

Liebe Grüße
Mia`,
              gloss: [
                { de: "die Feier", tr: "kutlama", en: "celebration" },
                { de: "leihen", tr: "ödünç almak", en: "to borrow" },
                { de: "die Größe", tr: "beden", en: "size" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Second-Hand-Laden",
              genreTr: "İkinci el mağazasındaki duyuru",
              body: `Liebe Kundinnen und Kunden,

wir nehmen ab Montag nur noch Winterkleidung an.

Sommersachen bringen Sie bitte erst im April.

Alles muss sauber sein. Kaputte Sachen können wir nicht nehmen.

Ihr Team vom Laden am Park`,
              gloss: [
                { de: "annehmen", tr: "kabul etmek", en: "to accept" },
                { de: "sauber", tr: "temiz", en: "clean" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-10-l1-1",
              no: 1,
              ref: "t1",
              text: "Mia möchte ein Kleid von Selin leihen.",
              answer: true,
              explain:
                "E-postanın ricası bu: \"Du hast doch das blaue Kleid in Größe 38. Kann ich es leihen?\"",
            },
            {
              kind: "bool",
              id: "de-a1-10-l1-2",
              no: 2,
              ref: "t1",
              text: "Mia gibt das Kleid am Sonntag zurück.",
              answer: false,
              explain:
                "Metinde başka bir gün yazıyor: \"Ich bringe es am Montag zurück\". Cumartesi kutlama günü.",
            },
            {
              kind: "bool",
              id: "de-a1-10-l1-3",
              no: 3,
              ref: "t1",
              text: "Mia wäscht das Kleid vor der Rückgabe.",
              answer: true,
              explain:
                "\"Gewaschen natürlich\" — geri getirmeden önce yıkayacağını söylüyor.",
            },
            {
              kind: "bool",
              id: "de-a1-10-l1-4",
              no: 4,
              ref: "t2",
              text: "Der Laden nimmt ab Montag Sommersachen an.",
              answer: false,
              explain:
                "Duyuru tersini söylüyor: pazartesiden itibaren \"nur noch Winterkleidung\". Yazlıklar nisanda.",
            },
            {
              kind: "bool",
              id: "de-a1-10-l1-5",
              no: 5,
              ref: "t2",
              text: "Kaputte Kleidung nimmt der Laden nicht.",
              answer: true,
              explain:
                "Son satır bunu söylüyor: \"Kaputte Sachen können wir nicht nehmen\".",
            },
          ],
        },
        {
          id: "de-a1-10-l2",
          no: 2,
          format: "mcq",
          goal: "orientation",
          prompt:
            "Lesen Sie die Situationen 6 bis 10 und die Anzeigen a und b. Welche Anzeige passt? Es gibt immer nur eine Lösung.",
          promptTr:
            "6–10. durumları ve a ile b ilanlarını oku. Hangi ilan uyuyor? Her zaman tek bir doğru var.",
          items: [
            {
              kind: "mcq",
              id: "de-a1-10-l2-6",
              no: 6,
              text: "Ihre Hose ist zu lang. Sie möchten sie kürzer machen lassen.",
              options: [
                "Änderungen Nadel\nHosen kürzen ab 12 Euro\nin drei Tagen fertig\nMo–Fr 10 bis 18 Uhr",
                "Waschsalon am Park\nWaschen und Trocknen\ntäglich 7 bis 23 Uhr\n4 Euro pro Maschine",
              ],
              answer: 0,
              explain:
                "(a) `Hosen kürzen` işini yapıyor ve fiyat veriyor. (b) yıkıyor, boy değiştirmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-l2-7",
              no: 7,
              text: "Sie brauchen am Sonntag saubere Wäsche und haben keine Waschmaschine.",
              options: [
                "Änderungen Nadel\nauch Reißverschlüsse und Knöpfe\nMo–Fr 10 bis 18 Uhr\nkeine Annahme am Wochenende",
                "Waschsalon am Park\nWaschen und Trocknen\ntäglich 7 bis 23 Uhr\n4 Euro pro Maschine",
              ],
              answer: 1,
              explain:
                "Pazar günü açık olan (b): `täglich 7 bis 23 Uhr`. (a) hafta sonu iş almıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-l2-8",
              no: 8,
              text: "Ihr Kind (8) wächst schnell. Sie suchen günstige Jacken.",
              options: [
                "Second-Hand am Park\nKinderjacken ab 5 Euro\nGrößen 92 bis 164\nMi und Sa 10 bis 16 Uhr",
                "Sportgeschäft Nord\nJacken für Erwachsene\nGrößen S bis XXL\nBeratung nach Termin",
              ],
              answer: 0,
              explain:
                "(a) çocuk bedenlerini veriyor — `Größen 92 bis 164` — ve ucuz. (b) yalnız yetişkin bedenleri satıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-l2-9",
              no: 9,
              text: "Ihre Schuhe sind hinten kaputt. Sie möchten sie reparieren lassen.",
              options: [
                "Schuhe Kral\nAbsätze und Sohlen\nReparatur in zwei Tagen\nMo–Sa 9 bis 18 Uhr",
                "Schuhmarkt Süd\nneue Schuhe ab 19 Euro\ngroße Auswahl in allen Größen\ntäglich bis 20 Uhr",
              ],
              answer: 0,
              explain:
                "(a) tamir yapıyor: `Absätze und Sohlen`. (b) yeni ayakkabı satıyor, tamir etmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-l2-10",
              no: 10,
              text: "Sie möchten alte Kleidung abgeben, aber kein Geld dafür.",
              options: [
                "Second-Hand am Park\nwir kaufen gut erhaltene Sachen\nAnnahme nur mittwochs\nBezahlung sofort in bar",
                "Kleiderkammer im Bürgerhaus\nAbgabe von sauberer Kleidung\njeden Dienstag 14 bis 17 Uhr\nfür Menschen ohne Geld",
              ],
              answer: 1,
              explain:
                "Para istenmiyor. (b) bağış alıyor. (a) da giysi kabul ediyor ama satın alıyor: `Bezahlung sofort in bar`.",
            },
          ],
        },
        {
          id: "de-a1-10-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild an der Umkleide",
              genreTr: "Deneme kabinindeki levha",
              body: `Bitte höchstens vier Teile mitnehmen.

Taschen bleiben draußen.

Der Schlüssel für den Schrank ist an der Kasse.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild an der Kasse",
              genreTr: "Kasadaki levha",
              body: `Umtausch nur mit Kassenzettel.

Innerhalb von 14 Tagen.

Reduzierte Ware können wir nicht zurücknehmen.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-10-l3-11",
              no: 11,
              ref: "s1",
              text: "Man darf fünf Teile in die Umkleide nehmen.",
              answer: false,
              explain:
                "Levha bir üst sınır koyuyor: \"höchstens vier Teile\". Beş bu sınırın üstünde.",
            },
            {
              kind: "bool",
              id: "de-a1-10-l3-12",
              no: 12,
              ref: "s1",
              text: "Den Schlüssel bekommt man an der Kasse.",
              answer: true,
              explain:
                "Son satır yeri veriyor: \"Der Schlüssel für den Schrank ist an der Kasse\".",
            },
            {
              kind: "bool",
              id: "de-a1-10-l3-13",
              no: 13,
              ref: "s2",
              text: "Ohne Kassenzettel gibt es keinen Umtausch.",
              answer: true,
              explain:
                "\"Umtausch nur mit Kassenzettel\" — `nur` sözcüğü fişi zorunlu kılıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-10-l3-14",
              no: 14,
              ref: "s2",
              text: "Reduzierte Ware kann man zurückbringen.",
              answer: false,
              explain:
                "Levha bunu ayrıca dışlıyor: \"Reduzierte Ware können wir nicht zurücknehmen\".",
            },
            {
              kind: "bool",
              id: "de-a1-10-l3-15",
              no: 15,
              ref: "s1",
              text: "Taschen darf man in die Umkleide mitnehmen.",
              answer: false,
              explain:
                "İkinci satır bunu yasaklıyor: \"Taschen bleiben draußen\". Onlar için dolap var.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 20,
      instruction:
        "Dieser Teil hat drei Aufgaben. Sie hören kurze Gespräche und Durchsagen. Lesen Sie zuerst die Aufgaben.",
      instructionTr:
        "Bu bölümde üç görev var. Kısa konuşmalar ve anonslar dinleyeceksin. Önce maddeleri oku.",
      tasks: [
        {
          id: "de-a1-10-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch im Laden",
              genreTr: "Mağazada konuşma",
              situation: "Bir müşteri beden soruyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Haben Sie diese Hose in achtunddreißig?" },
                { speaker: "Verkäufer", text: "In achtunddreißig leider nicht. In vierzig und in zweiundvierzig schon." },
                { speaker: "Kundin", text: "Dann probiere ich die vierzig." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch an der Kasse",
              genreTr: "Kasada konuşma",
              situation: "Bir müşteri ödemesini yapıyor.",
              plays: 2,
              segments: [
                { speaker: "Verkäuferin", text: "Der Pullover kostet neunzehn zwanzig." },
                { speaker: "Kunde", text: "Auf dem Schild stand zwölf neunzig." },
                { speaker: "Verkäuferin", text: "Das Schild gehört zum Regal daneben. Tut mir leid." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch in der Umkleide",
              genreTr: "Deneme kabininde konuşma",
              situation: "Bir müşteri başka renk istiyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Das Hemd passt gut, aber die Farbe gefällt mir nicht." },
                { speaker: "Verkäufer", text: "Wir haben es auch in Weiß und in Grün." },
                { speaker: "Kundin", text: "Weiß nehme ich." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch beim Umtausch",
              genreTr: "Değişimde konuşma",
              situation: "Bir müşteri ceketi değiştirmek istiyor.",
              plays: 2,
              segments: [
                { speaker: "Kunde", text: "Ich möchte diese Jacke umtauschen." },
                { speaker: "Verkäuferin", text: "Haben Sie den Kassenzettel dabei?" },
                { speaker: "Kunde", text: "Nein, den habe ich zu Hause." },
                { speaker: "Verkäuferin", text: "Dann bringen Sie ihn bitte mit. Ohne Zettel geht es nicht." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın tamirin ne zaman biteceğini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ilhan", text: "Wann sind meine Schuhe fertig?" },
                { speaker: "Schuhmacher", text: "Am Donnerstag. Ich schaffe es leider nicht bis Mittwoch." },
                { speaker: "Frau Ilhan", text: "Gut, dann komme ich am Donnerstag." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch im Waschsalon",
              genreTr: "Çamaşırhanede konuşma",
              situation: "Bir müşteri makineyi soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Kaminski", text: "Wie lange läuft eine Maschine?" },
                { speaker: "Mitarbeiterin", text: "Fünfzig Minuten. Trocknen dauert noch einmal dreißig." },
                { speaker: "Herr Kaminski", text: "Dann brauche ich über eine Stunde." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-10-h1-1",
              no: 1,
              ref: "a1",
              text: "Welche Größe probiert die Kundin?",
              options: ["38", "42", "40"],
              answer: 2,
              explain:
                "Üç beden geçiyor: istediği otuz sekiz yok, mevcut olanlar kırk ve kırk iki. Kadın \"die vierzig\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h1-2",
              no: 2,
              ref: "a2",
              text: "Was kostet der Pullover?",
              options: ["12,90 Euro", "19,20 Euro", "9,20 Euro"],
              answer: 1,
              explain:
                "Kasadaki fiyat geçerli: \"neunzehn zwanzig\". Raftaki etiket yan rafa aitmiş.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h1-3",
              no: 3,
              ref: "a3",
              text: "Welche Farbe nimmt die Kundin?",
              options: ["Grün.", "Weiß.", "Die Farbe von vorher."],
              answer: 1,
              explain:
                "İki renk öneriliyor ve kadın birini seçiyor: \"Weiß nehme ich\". İlk renk zaten beğenilmemişti.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h1-4",
              no: 4,
              ref: "a4",
              text: "Was fehlt dem Kunden?",
              options: ["Der Kassenzettel.", "Die richtige Größe.", "Das Geld."],
              answer: 0,
              explain:
                "Satıcı fişi soruyor, müşteride yok: \"Ohne Zettel geht es nicht\".",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h1-5",
              no: 5,
              ref: "a5",
              text: "Wann sind die Schuhe fertig?",
              options: ["Am Mittwoch.", "Am Freitag.", "Am Donnerstag."],
              answer: 2,
              explain:
                "İki gün geçiyor: çarşambaya yetişmiyor, \"Am Donnerstag\" hazır oluyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h1-6",
              no: 6,
              ref: "a6",
              text: "Wie lange dauert nur das Waschen?",
              options: ["Dreißig Minuten.", "Fünfzig Minuten.", "Achtzig Minuten."],
              answer: 1,
              explain:
                "İki süre ayrı veriliyor: yıkama \"fünfzig Minuten\", kurutma ayrıca otuz.",
            },
          ],
        },
        {
          id: "de-a1-10-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Kaufhaus",
              genreTr: "Mağazada anons",
              situation: "İndirim duyurusu.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, im zweiten Stock sind heute alle Winterjacken zwanzig Prozent günstiger. Das Angebot gilt nur bis achtzehn Uhr.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Kaufhaus",
              genreTr: "Mağazada anons",
              situation: "Deneme kabinleri hakkında.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zu den Umkleiden: Im ersten Stock sind heute nur zwei Kabinen offen. Im dritten Stock können Sie ohne Wartezeit anprobieren.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage im Waschsalon",
              genreTr: "Çamaşırhanede anons",
              situation: "Bir makine bozuk.",
              plays: 1,
              segments: [
                {
                  text: "Die Maschine Nummer drei ist kaputt. Bitte benutzen Sie die anderen Maschinen. Ihr Geld bekommen Sie an der Kasse zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Second-Hand-Laden",
              genreTr: "İkinci el mağazasında anons",
              situation: "Kabul kuralı.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für alle, die Kleidung abgeben möchten: Wir nehmen heute nur Jacken und Mäntel an. Hosen und Hemden bitte erst nächste Woche.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-10-h2-7",
              no: 7,
              ref: "d1",
              text: "Das Angebot gilt den ganzen Tag.",
              answer: false,
              explain:
                "Anons bir sınır koyuyor: \"Das Angebot gilt nur bis achtzehn Uhr\".",
            },
            {
              kind: "bool",
              id: "de-a1-10-h2-8",
              no: 8,
              ref: "d2",
              text: "Im dritten Stock muss man nicht warten.",
              answer: true,
              explain:
                "\"Im dritten Stock können Sie ohne Wartezeit anprobieren\" — birinci katta yalnız iki kabin açık.",
            },
            {
              kind: "bool",
              id: "de-a1-10-h2-9",
              no: 9,
              ref: "d3",
              text: "Man bekommt sein Geld zurück.",
              answer: true,
              explain:
                "Anons bunu söylüyor: \"Ihr Geld bekommen Sie an der Kasse zurück\".",
            },
            {
              kind: "bool",
              id: "de-a1-10-h2-10",
              no: 10,
              ref: "d4",
              text: "Heute kann man Hosen abgeben.",
              answer: false,
              explain:
                "Bugün kabul edilenler sayılıyor: \"nur Jacken und Mäntel\". Pantolonlar haftaya.",
            },
          ],
        },
        {
          id: "de-a1-10-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "m1",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Terzi işi bitirdi.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Beck, hier ist die Änderungsschneiderei. Ihre Hose ist fertig. Sie kostet vierzehn Euro. Wir haben bis Freitag um achtzehn Uhr offen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Sipariş edilen ceket geldi.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Herr Osei, hier ist der Laden am Markt. Ihre Jacke in Größe zweiundfünfzig ist gekommen. Wir legen sie eine Woche für Sie zurück.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Bir arkadaş kıyafet soruyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo, hier ist Mia. Was ziehst du am Samstag an? Ich weiß es noch nicht. Ruf mich bitte heute Abend an, dann sprechen wir darüber.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Ayakkabı tamiri olmuyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist Schuhe Kral. Ihre Stiefel können wir leider nicht reparieren. Die Sohle ist zu dünn. Sie können sie ab morgen abholen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kurs için kıyafet listesi.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Frau Ilhan, hier ist der Sportverein. Bringen Sie zum ersten Training bitte feste Schuhe mit. Ein T-Shirt und eine kurze Hose reichen sonst.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-10-h3-11",
              no: 11,
              ref: "m1",
              text: "Was kostet die Änderung?",
              options: ["Achtzehn Euro.", "Vierzehn Euro.", "Vierzig Euro."],
              answer: 1,
              explain:
                "Mesajda iki sayı var: fiyat \"vierzehn Euro\", on sekiz ise kapanış saati.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h3-12",
              no: 12,
              ref: "m2",
              text: "Wie lange wird die Jacke zurückgelegt?",
              options: ["Eine Woche.", "Zwei Tage.", "Bis zum Monatsende."],
              answer: 0,
              explain:
                "\"Wir legen sie eine Woche für Sie zurück\" — elli iki beden numarası, süre değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h3-13",
              no: 13,
              ref: "m3",
              text: "Was soll die Person tun?",
              options: ["Ein Kleid kaufen.", "Am Abend anrufen.", "Am Samstag kommen."],
              answer: 1,
              explain:
                "Mesajın ricası tek: \"Ruf mich bitte heute Abend an\". Cumartesi konuşulan gün, buluşma günü değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h3-14",
              no: 14,
              ref: "m4",
              text: "Warum geht die Reparatur nicht?",
              options: ["Die Sohle trägt nicht mehr.", "Die Stiefel sind viel zu alt.", "Es fehlt das richtige Material."],
              answer: 0,
              explain:
                "Gerekçe kaydın sonunda: \"Die Sohle ist zu dünn\" — yani taban tamir tutmayacak kadar incelmiş. Botların yaşı ya da malzeme eksikliği hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-10-h3-15",
              no: 15,
              ref: "m5",
              text: "Was ist besonders wichtig?",
              options: ["Ein T-Shirt.", "Eine kurze Hose.", "Feste Schuhe."],
              answer: 2,
              explain:
                "Üç şey sayılıyor ama biri özellikle isteniyor: \"Bringen Sie zum ersten Training bitte feste Schuhe mit\". Öteki ikisi zaten yeterli.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "Dieser Teil hat zwei Aufgaben: ein Formular ausfüllen und eine kurze Nachricht schreiben.",
      instructionTr: "Bu bölümde iki görev var: bir form doldurmak ve kısa bir ileti yazmak.",
      tasks: [
        {
          id: "de-a1-10-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihr Freund Tomasz Zielinski gibt eine Jacke zur Reparatur. Sie helfen ihm beim Zettel. Tomasz ist am 25. Juni 1987 geboren. Er wohnt in der Lerchenstraße 3 in 90408 Nürnberg. Seine Telefonnummer ist 0911 336142. Die Jacke ist blau. Füllen Sie den Zettel aus.",
          promptTr:
            "Arkadaşın Tomasz Zielinski bir ceketi tamire veriyor. Fişi doldurmasına yardım ediyorsun. Tomasz 25 Haziran 1987 doğumlu. Lerchenstraße 3, 90408 Nürnberg adresinde oturuyor. Telefon numarası 0911 336142. Ceket mavi. Fişi doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Annahme — Änderungsschneiderei Nadel",
              body: `Familienname, Vorname:    Zielinski, Tomasz
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Nürnberg
Telefon:                  {{4}}
Farbe der Jacke:          {{5}}
Unterschrift:             T. Zielinski`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-10-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["25.06.1987", "25.6.1987", "25. Juni 1987", "25.06.87", "25.6.87"],
              explain:
                "Yönergede \"am 25. Juni 1987 geboren\" yazıyor. Haziran yılın altıncı ayı, o yüzden rakamla 25.06.1987 olur.",
            },
            {
              kind: "gap",
              id: "de-a1-10-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Lerchenstraße 3", "Lerchenstr. 3"],
              explain:
                "Adres yönergede tam veriliyor: Lerchenstraße 3. Almanca formda `Lerchenstr. 3` kısaltması da kabul edilir.",
            },
            {
              kind: "gap",
              id: "de-a1-10-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["90408"],
              explain:
                "\"in 90408 Nürnberg\" — posta kodu beş haneli ve şehirden önce gelir. Şehir formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-10-s1-4",
              no: 4,
              text: "Telefon",
              accept: ["0911 336142", "0911336142"],
              explain:
                "Telefon numarası yönergede aynen veriliyor: 0911 336142. Alan kodu başta kalır, boşlukla ya da bitişik yazılabilir.",
            },
            {
              kind: "gap",
              id: "de-a1-10-s1-5",
              no: 5,
              text: "Farbe der Jacke",
              accept: ["blau"],
              explain:
                "Yönergenin son bilgisi: \"Die Jacke ist blau\". Bu satır rengi soruyor, bedeni değil.",
            },
          ],
        },
        {
          id: "de-a1-10-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben im Internet eine Hose bestellt. Sie ist zu klein. Schreiben Sie an den Laden. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "İnternetten bir pantolon sipariş ettin. Küçük geldi. Mağazaya yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Beschreiben Sie die Hose.", tr: "Pantolonu tarif et." },
              { de: "Fragen Sie, wie Sie sie zurückschicken können.", tr: "Nasıl geri gönderebileceğini sor." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am Montag habe ich bei Ihnen eine Hose bestellt. Sie ist leider zu klein.

Die Hose ist schwarz, Größe 38. Ich habe sie nur einmal anprobiert.

Wie kann ich sie zurückschicken?

Mit freundlichen Grüßen
Tomasz Zielinski`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Kuruma yazıldığı için `Sehr geehrte Damen und Herren` uygun.",
              "Pantolon en az iki özellikle tarif edildi mi? (renk, beden)",
              "Soru gerçekten soru biçiminde mi kuruldu?",
              "Yaklaşık 30 kelime yazıldı mı ve kuruma yazıldığı için `Sie` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: von Kleidung erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: giysileri anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-10-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie, was Sie gern anziehen. Sprechen Sie zu den Stichwörtern: Farben — Arbeit — Wochenende — Winter — einkaufen — Lieblingsstück.",
          promptTr:
            "Ne giymeyi sevdiğini anlat. Şu anahtar sözcüklere göre konuş: renkler — iş — hafta sonu — kış — alışveriş — en sevdiğin parça.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Farben und Kleidung nennen", tr: "Renkleri ve giysileri saymak" },
              { de: "Arbeit und Wochenende vergleichen", tr: "İş ile hafta sonunu karşılaştırmak" },
              { de: "sagen, wo Sie einkaufen", tr: "Nerede alışveriş yaptığını söylemek" },
            ],
            sample:
              "Ich trage gern Blau und Grau. Bei der Arbeit ziehe ich ein Hemd und eine dunkle Hose an. Am Wochenende trage ich Jeans und ein T-Shirt. Im Winter brauche ich eine dicke Jacke und einen Schal. Ich kaufe meistens im Second-Hand-Laden. Mein Lieblingsstück ist ein blauer Pullover von meiner Schwester.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "En az iki renk adlandırıldı mı?",
              "İş ile hafta sonu arasındaki fark söylendi mi?",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-10-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Kleidung. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Größe — Farbe — Preis — Umtausch — Waschen.",
          promptTr:
            "Konu: Giysi. Her anahtar sözcük için bir soru kur ve cevapla: beden — renk — fiyat — değişim — yıkama.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Kleidung. Ihr erstes Stichwort ist: Größe. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi giysi konusunu konuşuyoruz. İlk sözcüğün: beden. Bana bir soru sor.",
            },
            { who: "you", hint: "«Größe» sözcüğüyle bir soru kur.", expect: "Größe sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Bei Hosen habe ich Größe vierzig. Ihr nächstes Stichwort ist: Farbe.",
              tr: "Pantolonda kırk beden giyiyorum. Sıradaki sözcüğün: renk.",
            },
            { who: "you", hint: "«Farbe» için bir soru kur.", expect: "Farbe sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich trage am liebsten Schwarz. Und jetzt eine Frage an Sie: Kaufen Sie Kleidung im Internet?",
              tr: "En çok siyah giyerim. Şimdi sana bir soru: Giysiyi internetten alır mısın?",
            },
            { who: "you", hint: "Soruyu cevapla — internetten alıyor musun?", expect: "evet/hayır sorusuna tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wie oft waschen Sie Ihre Jacke?",
              tr: "Teşekkürler. Son soru: Ceketini ne sıklıkla yıkarsın?",
            },
            { who: "you", hint: "Bir sıklık söyle.", expect: "bir sıklık ifadesiyle cevap vermek (einmal im Monat …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Welche Größe hast du? — Achtunddreißig. Welche Farbe magst du? — Grün. Was kostet die Jacke? — Vierzig Euro. Kann man das umtauschen? — Ja, mit Kassenzettel. Wie oft wäschst du das? — Einmal in der Woche.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Beden, fiyat ve sıklık söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-10-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie brauchen eine andere Größe. — Sie möchten die Umkleide benutzen. — Jemand fragt Sie nach Ihrer Meinung.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Başka bir bedene ihtiyacın var. — Deneme kabinini kullanmak istiyorsun. — Biri fikrini soruyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Das Hemd ist zu klein. Fragen Sie mich nach einer anderen Größe.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Gömlek küçük geldi. Benden başka bir beden iste.",
            },
            {
              who: "you",
              hint: "Bir beden büyüğünü iste.",
              expect: "bir beden istemek (Haben Sie das eine Nummer größer)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Ja, in vierzig habe ich es noch. Zweite Situation: Sie möchten es anprobieren. Fragen Sie mich.",
              tr: "Evet, kırk bedeni var. İkinci durum: Denemek istiyorsun. Bana sor.",
            },
            { who: "you", hint: "Deneme kabinini sor, kibarca.", expect: "kibar bir soru kurmak (Kann ich das bitte anprobieren)", seconds: 20 },
            {
              who: "partner",
              de: "Natürlich, die Umkleide ist hinten links. Jetzt eine Frage an Sie: Wie finden Sie die Farbe? Meine Kollegin sagt, sie ist zu hell.",
              tr: "Tabii, kabin arkada solda. Şimdi sana bir soru: Rengi nasıl buldun? Meslektaşım fazla açık diyor.",
            },
            {
              who: "you",
              hint: "Fikrini söyle ve kısa bir gerekçe ekle.",
              expect: "bir beğeni ya da beğenmeme bildirip kısaca gerekçelendirmek",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "nach einer Größe fragen", tr: "Beden sormak" },
              { de: "höflich um etwas bitten", tr: "Kibarca rica etmek" },
              { de: "eine Meinung sagen", tr: "Fikir söylemek" },
            ],
            sample:
              "Entschuldigung, haben Sie das eine Nummer größer? — Kann ich das bitte anprobieren? — Mir gefällt die Farbe gut. Sie ist hell, aber im Sommer finde ich das schön.",
            criteria: [
              "Beden sorusu doğru kuruldu mu? (eine Nummer größer / kleiner)",
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu?",
              "Fikir açıkça söylendi mi? (gefällt mir / finde ich)",
              "Fikir kısa bir gerekçeyle desteklendi mi?",
            ],
          },
        },
      ],
    },
  ],
};
