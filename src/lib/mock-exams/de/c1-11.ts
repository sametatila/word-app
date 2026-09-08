import type { MockPaper } from "../types";

/**
 * C1 · Deneme 11 — "Eigentum und Gemeingut".
 *
 * PLAN kâğıt 1–10 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (özet tamamlama 10 · deneme metni 10 · yapısal boşluk 5)
 *   Hören  40 dk · 25 madde   (not tamamlama 10 · panel 15)
 *   Schreiben 80 dk · 10 madde (görüş yazısı ~200 kelime + boşluklu resmî mektup 10)
 *   Sprechen  15 dk           sunum (4 dk) · birlikte karar verme
 *
 * KONU SEÇİMİ: mülkiyet ve ortak kullanım. C1'e uygun yanı, "benim" ile
 * "herkesin" arasındaki alanın hukuken zaten var olması ama gündelik dilde
 * adının olmaması. Metinler mülkiyeti savunmuyor da eleştirmiyor da; ikisi
 * arasındaki üçüncü durumu adlandırıyor.
 *
 * Boşluklu mektubun açıklamaları bu kâğıdın kendi cümlelerine bağlandı —
 * c1-09'da iki açıklama c1-08'inkiyle birebir aynı çıkmıştı.
 */
export const C1_11: MockPaper = {
  id: "de-c1-11",
  course: "de",
  level: "C1",
  no: 11,
  theme: "Eigentum und Gemeingut",
  themeTr: "Mülkiyet ve ortak varlık",
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
          id: "de-c1-11-l1",
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
              title: "Der Weg, der niemandem gehört",
              body: `Zwischen dem, was einer Person gehört, und dem, was allen gehört, liegt ein drittes Feld. Es ist rechtlich seit Jahrhunderten geregelt und im alltäglichen Sprachgebrauch weitgehend namenlos.

Gemeint sind Güter, die zwar einen Eigentümer haben, an denen aber Dritte einklagbare Rechte besitzen: ein Feldweg mit Wegerecht, ein Brunnen mit Nutzungsrecht, ein Wald mit Betretungsrecht. Der Eigentümer darf hier nicht alles, was Eigentum sonst erlaubt.

Diese Konstruktion gilt vielen als Relikt. Der Einwand lautet, moderne Verhältnisse verlangten klare Verhältnisse: entweder privat oder öffentlich. Er lässt sich indes umkehren, denn gerade die unklaren Formen haben sich als erstaunlich haltbar erwiesen.

Der Grund dafür ist ökonomischer Natur. Ein Weg, der zwanzig Höfe verbindet, wäre in öffentlicher Hand teuer zu unterhalten und in reinem Privateigentum jederzeit sperrbar. Die Zwischenform verteilt Last und Zugriff so, dass beide Seiten etwas verlieren und niemand alles.

Praktisch entstehen die Konflikte selten am Recht selbst. Sie entstehen an der Pflege. Wer den Weg unterhält, ist häufig nicht der, der ihn am meisten nutzt, und diese Lücke wird zwangsläufig zum Streitpunkt.

Ein Vorschlag, der in mehreren Landkreisen erprobt wird, setzt genau dort an: nicht am Eigentum, sondern an einem Unterhaltungsfonds, in den alle Nutzungsberechtigten einzahlen. Vermeintlich technisch, verändert er die Lage erheblich.

Was sich festhalten lässt: Das dritte Feld verschwindet nicht, wenn man es nicht benennt. Es verwahrlost nur.`,
              gloss: [
                { de: "das Wegerecht", tr: "geçiş hakkı", en: "right of way" },
                { de: "einklagbar", tr: "dava edilebilir", en: "enforceable" },
                { de: "das Relikt", tr: "kalıntı", en: "relic" },
                { de: "der Zugriff", tr: "erişim, tasarruf", en: "access, control" },
                { de: "verwahrlosen", tr: "bakımsız kalmak", en: "to fall into neglect" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              body: `Zwischen privatem Eigentum und öffentlichem Gut liegt ein {{1}} Feld, das rechtlich geregelt, im Alltag aber weitgehend namenlos ist.

Es geht um Güter mit einem Eigentümer, an denen Dritte {{2}} Rechte besitzen — etwa ein Feldweg mit Wegerecht oder ein Wald mit {{3}}.

Viele halten diese Konstruktion für ein {{4}} und fordern klare Verhältnisse. Der Autor kehrt den Einwand um: Gerade die unklaren Formen hätten sich als besonders {{5}} erwiesen.

Seine Begründung ist {{6}}: In öffentlicher Hand wäre ein Weg teuer zu unterhalten, in reinem Privateigentum jederzeit {{7}}. Die Zwischenform sorgt dafür, dass beide Seiten etwas verlieren und niemand alles.

Konflikte entstehen nach dem Text selten am Recht, sondern an der {{8}}, weil der Unterhaltende oft nicht der Hauptnutzer ist.

Ein in mehreren Landkreisen erprobter Vorschlag setzt deshalb bei einem {{9}} an, in den alle Nutzungsberechtigten einzahlen.

Der Schluss lautet, dass das dritte Feld nicht verschwindet, wenn es niemand benennt — es {{10}} nur.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-11-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["drittes", "dritte"],
              explain:
                "Metnin ilk cümlesi bu alanı sayıyla adlandırıyor: \"liegt ein drittes Feld\".",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["einklagbare", "durchsetzbare", "verbriefte"],
              explain:
                "\"an denen aber Dritte einklagbare Rechte besitzen\" — hak sadece fiilî değil, hukuken talep edilebilir.",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["Betretungsrecht", "Betretungsrechten"],
              explain:
                "Üç örnek sıralanıyor ve ormana ait olanı: \"ein Wald mit Betretungsrecht\".",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["Relikt", "Überbleibsel", "Auslaufmodell"],
              explain:
                "\"Diese Konstruktion gilt vielen als Relikt\" — yani geçmişten kalmış, çağa uymayan bir yapı sayılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["haltbar", "beständig", "dauerhaft"],
              explain:
                "Çevirme cümlesinde: \"gerade die unklaren Formen haben sich als erstaunlich haltbar erwiesen\".",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["ökonomisch", "ökonomischer", "wirtschaftlich"],
              explain:
                "\"Der Grund dafür ist ökonomischer Natur\" — ardından maliyet ve erişim üzerinden yürüyen bir gerekçe geliyor.",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: ["sperrbar", "gesperrt", "verschließbar"],
              explain:
                "İki uç karşılaştırılıyor: kamu elinde pahalı, saf özel mülkiyette \"jederzeit sperrbar\".",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Pflege", "Unterhaltung", "Instandhaltung"],
              explain:
                "Metin çatışmanın yerini ayırıyor: \"Sie entstehen an der Pflege\" — bakımı yapanla en çok kullanan aynı kişi değil.",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["Unterhaltungsfonds", "Fonds"],
              explain:
                "Öneri mülkiyete değil ortak bir kasaya dayanıyor: \"an einem Unterhaltungsfonds, in den alle Nutzungsberechtigten einzahlen\".",
            },
            {
              kind: "gap",
              id: "de-c1-11-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["verwahrlost", "verfällt"],
              explain:
                "Son cümle: \"Das dritte Feld verschwindet nicht, wenn man es nicht benennt. Es verwahrlost nur.\"",
            },
          ],
        },
        {
          id: "de-c1-11-l2",
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
              title: "Was mir an meinem Wald nicht gehört",
              body: `Im Grundbuch stehen einundzwanzig Hektar auf meinen Namen. Was das bedeutet, habe ich erst verstanden, als ich versucht habe, einen Weg zu sperren.

Der Weg führt an meinem Hang entlang und war nach dem Sturm gefährlich. Ich habe zwei Schilder aufgestellt und bin nach elf Tagen von der Unteren Forstbehörde angerufen worden. Betretungsrecht, sagte man mir, gelte auch für meinen Hang.

Ich war zunächst empört, und ich verstehe rückblickend, warum. Ich hatte Eigentum als Vollmacht verstanden. Tatsächlich ist es ein Bündel einzelner Befugnisse, und einige davon habe ich nie besessen.

Was mich seither beschäftigt, ist nicht die Rechtslage. Es ist die Frage, warum mich das so getroffen hat. Ich glaube, weil das Wort Eigentum in unserer Sprache absolut klingt und im Gesetz relativ ist.

Man könnte einwenden, das sei juristische Spitzfindigkeit. Der Einwand ließe sich halten, wenn es folgenlos bliebe. Es bleibt aber nicht folgenlos: Wer glaubt, ihm gehöre alles, pflegt nichts, was er mit anderen teilt. Ich habe den Weg zwölf Jahre lang nicht ausgebessert, weil ich ihn nicht als meinen ansah.

Heute mache ich es anders, und zwar nicht aus Einsicht, sondern aus Rechnung. Ein Weg, den ich pflege, ist ein Weg, über den ich mitrede. Ein Weg, den die Gemeinde pflegt, ist einer, bei dem ich später erfahre, was beschlossen wurde.

Meine Nachbarin hat das lange vor mir begriffen. Sie sagt, Eigentum sei kein Zustand, sondern eine Verhandlung, die man führt oder verliert. Ich habe zwölf Jahre gebraucht, um ihr zuzustimmen.`,
              gloss: [
                { de: "das Grundbuch", tr: "tapu sicili", en: "land register" },
                { de: "die Befugnis", tr: "yetki", en: "authority, power" },
                { de: "die Spitzfindigkeit", tr: "kılı kırk yarma", en: "hairsplitting" },
                { de: "ausbessern", tr: "onarmak", en: "to repair" },
                { de: "die Verhandlung", tr: "müzakere", en: "negotiation" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-11-l2-11",
              no: 11,
              ref: "t2",
              text: "Wodurch wurde der Autorin die Rechtslage bewusst?",
              options: [
                "Durch einen Streit mit der Nachbarin über den Hang.",
                "Durch ihre eigene Sperrung des Hangwegs.",
                "Durch einen Eintrag im Grundbuch, den sie übersehen hatte.",
                "Durch einen Sturmschaden, den sie melden musste.",
              ],
              answer: 1,
              explain:
                "Metin anlamanın tetikleyicisini veriyor: \"als ich versucht habe, einen Weg zu sperren\" — fırtına yalnız gerekçeydi.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-12",
              no: 12,
              ref: "t2",
              text: "Wie hatte sie Eigentum zuvor verstanden?",
              options: [
                "Als eine Pflicht gegenüber der Gemeinde.",
                "Als eine Form gemeinsamer Nutzung.",
                "Als einen Anspruch auf Entschädigung.",
                "Als eine umfassende Vollmacht.",
              ],
              answer: 3,
              explain:
                "\"Ich hatte Eigentum als Vollmacht verstanden\" — oysa mülkiyet tek tek yetkilerden oluşan bir demet.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-13",
              no: 13,
              ref: "t2",
              text: "Wie beschreibt sie Eigentum nach dieser Erfahrung?",
              options: [
                "Als Summe getrennter Rechte.",
                "Als rein formalen Eintrag im Grundbuch.",
                "Als etwas, das die Forstbehörde verleiht.",
                "Als Last, die kaum Befugnisse bringt.",
              ],
              answer: 0,
              explain:
                "\"Tatsächlich ist es ein Bündel einzelner Befugnisse, und einige davon habe ich nie besessen.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-14",
              no: 14,
              ref: "t2",
              text: "Was beschäftigt sie seither am meisten?",
              options: [
                "Die Frage nach einer Entschädigung.",
                "Der Umgang der Behörde mit ihr.",
                "Die Wirkung des Wortes auf sie selbst.",
                "Die Sicherheit des Weges nach dem Sturm.",
              ],
              answer: 2,
              explain:
                "Hukuki durum değil, tepkisinin nedeni: sözcük \"in unserer Sprache absolut klingt und im Gesetz relativ ist\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-15",
              no: 15,
              ref: "t2",
              text: "Wie geht sie mit dem Vorwurf der Spitzfindigkeit um?",
              options: [
                "Sie weist ihn als unsachlich zurück.",
                "Sie hält ihn für den Kern der Sache.",
                "Sie übergeht ihn zugunsten des Beispiels.",
                "Sie lässt ihn nur unter einer Bedingung gelten.",
              ],
              answer: 3,
              explain:
                "\"Der Einwand ließe sich halten, wenn es folgenlos bliebe\" — ve sonrasında sonuçları gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-16",
              no: 16,
              ref: "t2",
              text: "Welche Folge nennt sie für ihr eigenes Verhalten?",
              options: [
                "Sie vernachlässigte den Weg jahrelang.",
                "Sie hat den Hang aufforsten lassen.",
                "Sie hat zusätzliche Schilder aufgestellt.",
                "Sie hat den Wald teilweise verkauft.",
              ],
              answer: 0,
              explain:
                "Gerekçesini de veriyor: \"weil ich ihn nicht als meinen ansah\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-17",
              no: 17,
              ref: "t2",
              text: "Womit begründet sie ihr heutiges Verhalten?",
              options: [
                "Mit einer moralischen Einsicht.",
                "Mit dem Druck der Forstbehörde.",
                "Mit einer nüchternen Rechnung.",
                "Mit dem Rat ihrer Nachbarin.",
              ],
              answer: 2,
              explain:
                "Kendisi ayırıyor: \"nicht aus Einsicht, sondern aus Rechnung\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-18",
              no: 18,
              ref: "t2",
              text: "Worin besteht der Vorteil dieser Rechnung?",
              options: [
                "In geringeren Kosten für die Pflege.",
                "In einer Steuerersparnis beim Wald.",
                "In der Sicherheit des Weges.",
                "In einem Mitspracherecht bei Entscheidungen.",
              ],
              answer: 3,
              explain:
                "İki durumu karşılaştırıyor: kendi baktığı yol üzerinde söz sahibi, belediyenin baktığı yolda ise \"später erfahre, was beschlossen wurde\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-19",
              no: 19,
              ref: "t2",
              text: "Wie fasst die Nachbarin Eigentum auf?",
              options: [
                "Als Besitz, der im Grundbuch steht.",
                "Als Verantwortung für die Pflege.",
                "Als Vorrecht gegenüber der Forstbehörde.",
                "Als Verhandlung statt als Zustand.",
              ],
              answer: 3,
              explain:
                "\"Eigentum sei kein Zustand, sondern eine Verhandlung, die man führt oder verliert.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l2-20",
              no: 20,
              ref: "t2",
              text: "Welche Funktion hat der Schlusssatz?",
              options: [
                "Er datiert die eigene Einsicht spät.",
                "Er kündigt einen Rechtsstreit an.",
                "Er widerlegt die Position der Nachbarin.",
                "Er verallgemeinert die eigene Erfahrung.",
              ],
              answer: 0,
              explain:
                "\"Ich habe zwölf Jahre gebraucht, um ihr zuzustimmen\" — komşusu bunu çok önce kavramış.",
            },
          ],
        },
        {
          id: "de-c1-11-l3",
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
              title: "Der Fonds, über den niemand spricht",
              body: `Seit der Novelle können Landkreise einen Unterhaltungsfonds für Feldwege einrichten. Genutzt wird die Möglichkeit {{21}} selten.

Am Geld liegt es nicht. Ein Fonds, {{22}} Einrichtung die Kreisverwaltung ohnehin vorbereitet hat, kostet in der Aufstellung wenig. Was fehlt, ist die Liste der Berechtigten.

Hinzu kommt ein politisches Problem. Wer einzahlt, will mitentscheiden, {{23}} sich die Zahl der Beteiligten an jedem Beschluss vervielfacht.

Fachleute halten das weniger für einen Konstruktionsfehler {{24}} für den eigentlichen Zweck: Mitsprache entsteht dort, wo Kosten getragen werden.

Was sich sagen lässt: Ein Fonds wirkt erst dann, {{25}} die Liste der Nutzungsberechtigten vollständig ist.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-11-l3-21",
              no: 21,
              ref: "t3",
              text: "Lücke 21",
              options: ["keinesfalls", "nirgends", "bislang", "zu keiner Zeit"],
              answer: 2,
              explain:
                "Cümle bir imkânın az kullanıldığını söylüyor; `bislang` bunu zaman içine yerleştirir. Üç olumsuz seçenek `selten` ile birlikte anlamsız bir yığılma yaratırdı.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l3-22",
              no: 22,
              ref: "t3",
              text: "Lücke 22",
              options: ["dessen", "deren", "das", "dem"],
              answer: 0,
              explain:
                "İlgi cümlesi `Fonds` adına ait bir tamlayan istiyor: \"ein Fonds, dessen Einrichtung die Kreisverwaltung … vorbereitet hat\". `Fonds` eril olduğu için `dessen` gerekir.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l3-23",
              no: 23,
              ref: "t3",
              text: "Lücke 23",
              options: ["sofern", "damit", "sodass", "als ob"],
              answer: 2,
              explain:
                "Ödeme ile katılımcı sayısının artması arasında sonuç ilişkisi var; `sodass` bu sonucu kurar. `damit` amaç, `sofern` koşul bildirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l3-24",
              no: 24,
              ref: "t3",
              text: "Lücke 24",
              options: ["wie", "als", "denn", "sondern"],
              answer: 1,
              explain:
                "`weniger …` karşılaştırması `als` ister: \"weniger für einen Konstruktionsfehler als für den eigentlichen Zweck\". `sondern` önünde olumsuzlama gerektirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-l3-25",
              no: 25,
              ref: "t3",
              text: "Lücke 25",
              options: ["wobei", "wenn", "womit", "worin"],
              answer: 1,
              explain:
                "`erst dann` bir zaman belirteci; onu karşılayan bağlaç `wenn`: \"erst dann, wenn die Liste … vollständig ist\".",
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
          id: "de-c1-11-h1",
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
              title: "Wegefonds Oberried — Bürgerinformation",
              situation: "Kaymakamlıktan biri bir yol bakım fonunu anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend. Mein Name ist Doris Ehrenberg, ich leite das Amt für Liegenschaften. Ich stelle Ihnen den Wegefonds vor und beginne mit dem, was er nicht ist: Er ist keine Enteignung. Am Eigentum ändert sich nichts.",
                },
                {
                  text: "Es geht um zweiundsechzig Kilometer Feldwege im Gemeindegebiet. Davon sind achtunddreißig in privater Hand, der Rest gehört der Gemeinde.",
                },
                {
                  text: "Das Ziel ist die Unterhaltung, nicht der Zugang. Betretungs- und Wegerechte bestehen ohnehin und werden durch den Fonds weder erweitert noch eingeschränkt.",
                },
                {
                  text: "Zur Finanzierung: Wir rechnen mit vierzig Cent je Meter und Jahr. Einzahlen sollen alle Nutzungsberechtigten, also auch Betriebe, die einen Weg regelmäßig befahren.",
                },
                {
                  text: "Ein Punkt, den ich nicht beschönigen will: Die Liste dieser Berechtigten liegt bisher nicht vollständig vor. Ohne sie funktioniert der Fonds nicht, und ihre Erstellung wird nach unserer Schätzung zwei Jahre dauern.",
                },
                {
                  text: "Zur Mitsprache: Wer einzahlt, bekommt eine Stimme in der Wegekommission. Das ist keine Nebensache, sondern der Hauptgrund, warum manche Eigentümer dagegen sind.",
                },
                {
                  text: "Was wir aus anderen Kreisen wissen: Dort ist der Aufwand für Reparaturen nach Sturmschäden im Schnitt um dreiundzwanzig Prozent gesunken. Das ist kein Versprechen, das ist eine Erfahrung.",
                },
                {
                  text: "Der Fonds ist zunächst auf fünf Jahre befristet. Danach entscheidet der Gemeinderat neu, und zwar auf Grundlage einer Auswertung, die wir veröffentlichen.",
                },
                {
                  text: "Was wir messen werden: die Zahl der gesperrten Wegabschnitte, die Ausgaben je Kilometer und die Zahl der Beschwerden. Berichtet wird jährlich im Amtsblatt.",
                },
                {
                  text: "Und was wir von Ihnen brauchen: Wer ein Wegerecht hat und nicht angeschrieben wurde, meldet sich bitte bis zum einunddreißigsten Oktober. Später eingehende Meldungen berücksichtigen wir erst im zweiten Jahr.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizen",
              genreTr: "Notlar",
              body: `Ausdrücklich keine {{1}} — am Eigentum ändert sich nichts.

Feldwege insgesamt: {{2}} Kilometer.

Davon in privater Hand: {{3}} Kilometer.

Ziel ist die Unterhaltung, nicht der {{4}}.

Beitrag: {{5}} Cent je Meter und Jahr.

Fehlt bisher: die vollständige {{6}} der Nutzungsberechtigten.

Ihre Erstellung dauert voraussichtlich {{7}}.

Wer einzahlt, bekommt eine Stimme in der {{8}}.

Andere Kreise: Reparaturaufwand um {{9}} Prozent gesunken.

Meldung eines Wegerechts bis {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-11-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["Enteignung"],
              explain:
                "Konuşma bu ayrımla açılıyor: \"Er ist keine Enteignung. Am Eigentum ändert sich nichts.\"",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["62", "zweiundsechzig"],
              explain:
                "\"Es geht um zweiundsechzig Kilometer Feldwege im Gemeindegebiet.\"",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["38", "achtunddreißig"],
              explain:
                "Toplamın bir bölümü: \"Davon sind achtunddreißig in privater Hand, der Rest gehört der Gemeinde.\"",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: ["Zugang"],
              explain:
                "Hedef ayrımı açık: \"Das Ziel ist die Unterhaltung, nicht der Zugang\" — geçiş hakları zaten var.",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["40", "vierzig"],
              explain:
                "\"Wir rechnen mit vierzig Cent je Meter und Jahr.\" Ödeyecek olanlar arasında bir yolu düzenli kullanan işletmeler de var.",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["Liste"],
              explain:
                "Eksik olan şey adlandırılıyor: \"Die Liste dieser Berechtigten liegt bisher nicht vollständig vor.\"",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["zwei Jahre", "2 Jahre", "zwei Jahren"],
              explain:
                "\"ihre Erstellung wird nach unserer Schätzung zwei Jahre dauern\".",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["Wegekommission", "Kommission"],
              explain:
                "\"Wer einzahlt, bekommt eine Stimme in der Wegekommission\" — ve bu, karşı çıkanların asıl gerekçesi.",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["23", "dreiundzwanzig"],
              explain:
                "\"Dort ist der Aufwand für Reparaturen nach Sturmschäden im Schnitt um dreiundzwanzig Prozent gesunken.\"",
            },
            {
              kind: "gap",
              id: "de-c1-11-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: ["31. Oktober", "einunddreißigsten Oktober", "31.10."],
              explain:
                "\"meldet sich bitte bis zum einunddreißigsten Oktober. Später eingehende Meldungen berücksichtigen wir erst im zweiten Jahr.\"",
            },
          ],
        },
        {
          id: "de-c1-11-h2",
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
              title: "Wem gehört der Weg?",
              situation: "Bir orman sahibi, bir hukukçu ve bir belediye görevlisi tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderatorin",
                  text: "Frau Gollnick, Sie besitzen einundzwanzig Hektar Wald. Was halten Sie vom Wegefonds?",
                },
                {
                  speaker: "Frau Gollnick",
                  text: "Ich bin dafür, und das hätte ich vor zwölf Jahren nicht gesagt. Damals habe ich versucht, einen Weg zu sperren, und bin belehrt worden. Heute weiß ich: Ein Weg, den ich pflege, ist ein Weg, über den ich mitrede.",
                },
                { speaker: "Moderatorin", text: "Herr Weitzel, Sie sind Jurist. Ist das rechtlich sauber?" },
                {
                  speaker: "Herr Weitzel",
                  text: "Vollkommen. Der Fonds berührt das Eigentum nicht, er organisiert die Unterhaltung. Was mich stört, ist etwas anderes: Wir verkaufen ihn als technische Maßnahme, obwohl er eine politische ist.",
                },
                { speaker: "Moderatorin", text: "Inwiefern politisch?" },
                {
                  speaker: "Herr Weitzel",
                  text: "Weil Mitsprache an Einzahlung geknüpft wird. Das ist vertretbar und keineswegs harmlos. Wer nicht zahlen kann, verliert die Stimme, die er vorher als Anlieger hatte.",
                },
                {
                  speaker: "Frau Repnik",
                  text: "Diesen Punkt nehme ich ernst, und wir haben ihn im Amt lange diskutiert. Unsere Antwort ist eine Härtefallregelung. Ich gebe zu, dass sie im Entwurf schwach formuliert ist.",
                },
                { speaker: "Moderatorin", text: "Frau Gollnick, überzeugt Sie das?" },
                {
                  speaker: "Frau Gollnick",
                  text: "Nur halb. Ich sehe das Problem bei den kleinen Anliegern, nicht bei mir. Für mich sind vierzig Cent je Meter Kleingeld, für jemanden mit dreihundert Metern und schmaler Rente nicht.",
                },
                { speaker: "Moderatorin", text: "Frau Repnik, was antworten Sie?" },
                {
                  speaker: "Frau Repnik",
                  text: "Dass wir die Regelung nachschärfen müssen, bevor der Rat entscheidet. Wenn wir das nicht tun, bekommen wir in zwei Jahren genau die Debatte, die wir jetzt vermeiden wollen.",
                },
                {
                  speaker: "Herr Weitzel",
                  text: "Ein zweiter Punkt, den wir zu selten nennen: Die Liste der Berechtigten ist nicht bloß Verwaltungsarbeit. Sie legt fest, wer künftig dazugehört. Wer darauf fehlt, fehlt dauerhaft.",
                },
                {
                  speaker: "Frau Repnik",
                  text: "Der Einwand trifft. Deshalb ist die Meldefrist keine Formalie. Wir haben sie bewusst lang angesetzt und werben trotzdem zu leise dafür.",
                },
                { speaker: "Moderatorin", text: "Frau Gollnick, was würden Sie anderen Eigentümern sagen?" },
                {
                  speaker: "Frau Gollnick",
                  text: "Dass Eigentum keine Vollmacht ist, sondern ein Bündel von Befugnissen. Wer das begreift, hört auf, sich über Betretungsrechte zu ärgern, und fängt an, über Pflege zu verhandeln.",
                },
                { speaker: "Moderatorin", text: "Ein gemeinsamer Vorschlag zum Schluss?" },
                {
                  speaker: "Herr Weitzel",
                  text: "Härtefallregelung nachschärfen, Meldefrist offensiv bewerben, und die Auswertung nach fünf Jahren vorher festschreiben. Fehlt eines davon, wird der Fonds das, was er nicht sein soll: eine Sache derer, die zahlen können.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-11-h2-11",
              no: 11,
              ref: "d1",
              text: "Wie hat sich Frau Gollnicks Haltung verändert?",
              options: [
                "Aus Widerstand wurde Unterstützung.",
                "Aus Unterstützung wurde Zweifel.",
                "Ihre Haltung ist dieselbe geblieben.",
              ],
              answer: 0,
              explain:
                "\"Ich bin dafür, und das hätte ich vor zwölf Jahren nicht gesagt\" — o zaman bir yolu kapatmaya çalışmış.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-12",
              no: 12,
              ref: "d1",
              text: "Womit begründet sie ihre heutige Position?",
              options: [
                "Mit den gesunkenen Kosten.",
                "Mit dem Druck der Behörde.",
                "Mit dem Mitspracherecht.",
              ],
              answer: 2,
              explain:
                "\"Ein Weg, den ich pflege, ist ein Weg, über den ich mitrede.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-13",
              no: 13,
              ref: "d1",
              text: "Wie bewertet Herr Weitzel den Fonds rechtlich?",
              options: [
                "Als problematisch bei Privatwegen.",
                "Als einwandfrei.",
                "Als nur befristet zulässig.",
              ],
              answer: 1,
              explain:
                "\"Vollkommen. Der Fonds berührt das Eigentum nicht, er organisiert die Unterhaltung.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-14",
              no: 14,
              ref: "d1",
              text: "Was stört ihn dennoch?",
              options: [
                "Die Darstellung als bloße Technik.",
                "Die Höhe des Beitrags.",
                "Die Dauer der Befristung.",
              ],
              answer: 0,
              explain:
                "\"Wir verkaufen ihn als technische Maßnahme, obwohl er eine politische ist.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-15",
              no: 15,
              ref: "d1",
              text: "Warum nennt er den Fonds politisch?",
              options: [
                "Weil der Gemeinderat entscheidet.",
                "Weil Eigentum umverteilt wird.",
                "Weil Mitsprache an Zahlung hängt.",
              ],
              answer: 2,
              explain:
                "Sonucunu da söylüyor: \"Wer nicht zahlen kann, verliert die Stimme, die er vorher als Anlieger hatte.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-16",
              no: 16,
              ref: "d1",
              text: "Wie reagiert Frau Repnik auf diesen Punkt?",
              options: [
                "Sie weist ihn zurück.",
                "Sie nimmt ihn an und räumt eine Schwäche ein.",
                "Sie verweist auf die Rechtslage.",
              ],
              answer: 1,
              explain:
                "\"Ich gebe zu, dass sie im Entwurf schwach formuliert ist\" — zorluk hâli düzenlemesini kastediyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-17",
              no: 17,
              ref: "d1",
              text: "Wo sieht Frau Gollnick das eigentliche Problem?",
              options: [
                "Bei den großen Waldbesitzern.",
                "Bei der Gemeinde selbst.",
                "Bei den kleinen Anliegern.",
              ],
              answer: 2,
              explain:
                "Kendisi için sorun olmadığını söylüyor: dört yüz Euro ona az geliyor ama \"jemanden mit dreihundert Metern und schmaler Rente\" için değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-18",
              no: 18,
              ref: "d1",
              text: "Was schlägt Frau Repnik daraufhin vor?",
              options: [
                "Die Regelung vor der Entscheidung zu schärfen.",
                "Den Beitrag allgemein zu senken.",
                "Die Einführung um ein Jahr zu verschieben.",
              ],
              answer: 0,
              explain:
                "Gerekçesiyle: aksi hâlde iki yıl sonra \"genau die Debatte, die wir jetzt vermeiden wollen\" geri gelecek.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-19",
              no: 19,
              ref: "d1",
              text: "Welchen zweiten Punkt nennt Herr Weitzel?",
              options: [
                "Die Kosten der Verwaltung.",
                "Die Tragweite der Liste.",
                "Die Zahl der Sturmschäden.",
              ],
              answer: 1,
              explain:
                "Liste yalnız bir idari iş değil: \"Sie legt fest, wer künftig dazugehört. Wer darauf fehlt, fehlt dauerhaft.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-20",
              no: 20,
              ref: "d1",
              text: "Was räumt Frau Repnik dazu ein?",
              options: [
                "Die Frist ist zu kurz bemessen.",
                "Die Liste ist bereits geschlossen.",
                "Die Frist wird zu leise beworben.",
              ],
              answer: 2,
              explain:
                "Süreyi bilerek uzun tutmuşlar, ama \"werben trotzdem zu leise dafür\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-21",
              no: 21,
              ref: "d1",
              text: "Was rät Frau Gollnick anderen Eigentümern?",
              options: [
                "Ihre Rechte konsequent durchzusetzen.",
                "Eigentum als Bündel von Befugnissen zu sehen.",
                "Sich aus der Kommission herauszuhalten.",
              ],
              answer: 1,
              explain:
                "Sonucunu da veriyor: bunu kavrayan \"hört auf, sich über Betretungsrechte zu ärgern, und fängt an, über Pflege zu verhandeln\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-22",
              no: 22,
              ref: "d1",
              text: "Welche drei Punkte nennt Herr Weitzel am Schluss?",
              options: [
                "Regelung, Werbung, Auswertung.",
                "Beitrag, Frist, Kommission.",
                "Liste, Eigentum, Befristung.",
              ],
              answer: 0,
              explain:
                "\"Härtefallregelung nachschärfen, Meldefrist offensiv bewerben, und die Auswertung nach fünf Jahren vorher festschreiben.\"",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-23",
              no: 23,
              ref: "d1",
              text: "Was geschieht nach ihm, wenn ein Punkt fehlt?",
              options: [
                "Der Fonds scheitert an der Finanzierung.",
                "Der Rat entscheidet ohne Grundlage.",
                "Der Fonds wird eine Sache der Zahlenden.",
              ],
              answer: 2,
              explain:
                "Uyarı son cümlede: \"wird der Fonds das, was er nicht sein soll: eine Sache derer, die zahlen können\".",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-24",
              no: 24,
              ref: "d1",
              text: "Wie beurteilt Frau Gollnick die Härtefallregelung?",
              options: [
                "Als ausreichend.",
                "Als überflüssig.",
                "Als nur teilweise überzeugend.",
              ],
              answer: 2,
              explain:
                "\"Nur halb\" diyor ve nedenini küçük komşulardaki yükle açıklıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-11-h2-25",
              no: 25,
              ref: "d1",
              text: "Worin sind sich alle drei einig?",
              options: [
                "Dass der Entwurf noch nachgebessert werden muss.",
                "Dass der Beitrag zu hoch angesetzt ist.",
                "Dass die Kommission überflüssig ist.",
              ],
              answer: 0,
              explain:
                "Üçü de taslağın eksik olduğunu söylüyor: Frau Repnik \"schwach formuliert\" diyor, Frau Gollnick \"Nur halb\", Herr Weitzel ise \"nachschärfen\" istiyor.",
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
          id: "de-c1-11-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "In einer Regionalzeitung stand: \"Wem etwas gehört, der soll allein darüber bestimmen — alles andere ist kalte Enteignung.\" Schreiben Sie eine Stellungnahme (circa 200 Wörter). Ordnen Sie die These ein, prüfen Sie sie an einem Beispiel, nennen Sie einen Einwand gegen Ihre eigene Position und ziehen Sie eine Schlussfolgerung.",
          promptTr:
            "Bir yerel gazetede şöyle yazdı: \"Bir şey kimin ise onun hakkında yalnız o karar versin — gerisi soğuk kamulaştırmadır.\" Bir görüş yazısı yaz (yaklaşık 200 kelime). Savı yerine oturt, bir örnekle sına, kendi konumuna yönelik bir itirazı da söyle ve bir sonuca bağla.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Die These präzise einordnen.", tr: "Savı tam olarak yerine oturt." },
              { de: "An einem Beispiel prüfen.", tr: "Bir örnekle sına." },
              { de: "Einen Einwand gegen die eigene Position nennen.", tr: "Kendi konumuna itiraz getir." },
              { de: "Eine begründete Schlussfolgerung ziehen.", tr: "Gerekçeli bir sonuca bağla." },
            ],
            sample: `Die These setzt voraus, was sie beweisen müsste: dass Eigentum eine ungeteilte Vollmacht sei. Rechtlich ist es das seit Jahrhunderten nicht. Ein Grundstück mit Wegerecht, ein Wald mit Betretungsrecht, ein Brunnen mit Nutzungsrecht — in allen drei Fällen gibt es einen Eigentümer, und in allen drei Fällen darf er weniger, als der zitierte Satz unterstellt. Wer diese Beschränkungen Enteignung nennt, benennt keinen Eingriff, sondern die Rechtslage.

Prüfen lässt sich das an den Feldwegen. Ein Weg, der zwanzig Höfe verbindet, wäre in öffentlicher Hand teuer zu unterhalten und in reinem Privateigentum jederzeit sperrbar. Die geltende Zwischenform verteilt Last und Zugriff so, dass beide Seiten etwas verlieren. Sie ist unelegant und hat gerade deshalb Jahrhunderte überdauert.

Gegen meine Position spricht allerdings ein ernstes Argument: Wer nur Pflichten trägt und keine Erträge sieht, pflegt irgendwann nichts mehr. Die verwahrlosten Privatwege in manchen Gemeinden sind kein Zufall, sondern eine Antwort auf genau dieses Ungleichgewicht.

Der Einwand lässt sich indes einordnen: Er richtet sich nicht gegen die Beschränkung als solche, sondern gegen ihre einseitige Verteilung. Meine Schlussfolgerung lautet deshalb nicht, dass die Beschränkungen selbstverständlich seien. Sie lautet, dass sie eine Gegenleistung brauchen — Mitsprache oder Geld. Wer Beschränkung ohne Ausgleich verlangt, erzeugt am Ende genau die Vernachlässigung, gegen die er sich wendet.`,
            criteria: [
              "Sav gerçekten yerine oturtuldu mu — hangi varsayım açığa çıkarıldı?",
              "Örnek savı sınıyor mu, yoksa yalnız yazarın konumunu resimliyor mu?",
              "İtiraz kendi konumuna mı yönelik ve gerçekten güçlü mü?",
              "Sonuç itirazdan sonra hâlâ ayakta mı?",
              "Yaklaşık 200 kelime var mı; metin bölümlenmiş ve bağlaçlarla yürütülmüş mü?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabiliyor mu?",
            ],
          },
        },
        {
          id: "de-c1-11-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie melden als Anliegerin ein Wegerecht an, das in der Liste der Gemeinde fehlt. Ergänzen Sie die Lücken 1 bis 10 im Schreiben. Schreiben Sie in jede Lücke ein Wort.",
          promptTr:
            "Komşu arazi sahibi olarak, belediyenin listesinde eksik olan bir geçiş hakkını bildiriyorsun. Yazıdaki 1–10. boşlukları tamamla. Her boşluğa bir sözcük yaz.",
          texts: [
            {
              kind: "text",
              id: "b1",
              genre: "Meldung",
              genreTr: "Bildirim yazısı",
              title: "An das Amt für Liegenschaften",
              body: `Sehr geehrte Damen und Herren,

{{1}} auf Ihre Bürgerinformation vom 9. September melde ich fristgerecht ein Wegerecht an, das in Ihrer Liste bislang {{2}} aufgeführt ist.

Vorab: Den Wegefonds halte ich für richtig. Meine Meldung richtet sich {{3}} gegen das Vorhaben, sondern dient seiner Vollständigkeit.

Es handelt sich um den Verbindungsweg zwischen Flurstück 214 und dem Mühlbach. Das Wegerecht besteht {{4}} 1961 und ist im Grundbuch unter Abteilung II eingetragen.

Zwei Punkte möchte ich offen ansprechen. Erstens ist die Härtefallregelung im Entwurf {{5}} schwach formuliert, um Anliegern mit kurzen Abschnitten Sicherheit zu geben. Zweitens halte ich eine erneute Anschreibung aller Betroffenen für {{6}}, weil die erste Runde offenbar unvollständig war.

Ich beantrage {{7}}, mein Wegerecht in die Liste aufzunehmen und mir die Aufnahme schriftlich zu bestätigen.

Für Rückfragen stehe ich Ihnen gern zur {{8}}. Über eine Eingangsbestätigung {{9}} zum 31. Oktober wäre ich Ihnen verbunden.

Mit freundlichen Grüßen
Marlene {{10}}`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-11-s2-1",
              no: 1,
              text: "Lücke 1 (Bezugnahme auf eine Veranstaltung)",
              accept: ["Bezugnehmend", "Bezug"],
              explain:
                "Yazı bir bilgilendirme toplantısına gönderme yaparak açılıyor ve cümle `auf` ile sürüyor; buraya `Bezugnehmend` ya da ayrık yazımıyla `Bezug nehmend` girer.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-2",
              no: 2,
              text: "Lücke 2 (Verneinung eines bisherigen Zustands)",
              accept: ["nicht", "nirgends"],
              explain:
                "`bislang` ile birlikte bir olumsuzlama gerekiyor: hak listede şimdiye kadar yer almıyor, yani eksiklik zaman içinde konumlandırılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-3",
              no: 3,
              text: "Lücke 3 (Verneinung vor „sondern“)",
              accept: ["nicht"],
              explain:
                "Cümle `sondern` ile devam ediyor; bu bağlaç kendinden önce bir olumsuzlama ister — bildirim projeye karşı değil, onu tamamlamak için.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-4",
              no: 4,
              text: "Lücke 4 (Beginn eines andauernden Zustands)",
              accept: ["seit"],
              explain:
                "Hak bugün hâlâ geçerli olduğu için başlangıcı `seit` ile verilir: \"besteht seit 1961\". `ab` geleceğe, `vor` bitmiş bir noktaya bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-5",
              no: 5,
              text: "Lücke 5 (Vergleich mit „um … zu“)",
              accept: ["zu"],
              explain:
                "`zu schwach …, um … zu geben` yapısı gerekiyor: düzenleme, kısa güzergâhlı komşulara güvence verecek kadar güçlü değil.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-6",
              no: 6,
              text: "Lücke 6 (Notwendigkeit)",
              accept: ["erforderlich", "geboten", "notwendig"],
              explain:
                "İlk turun eksik kaldığı gerekçesiyle yeni bir yazışma isteniyor; `halte ich für` yapısı bu yargıyı bir sıfatla tamamlar.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-7",
              no: 7,
              text: "Lücke 7 (Folgerung im Mittelfeld)",
              accept: ["daher", "deshalb", "folglich"],
              explain:
                "Açıkça sıralanan iki noktadan (\"Erstens … Zweitens …\") sonra talep geliyor; bu belirteç çıkarımı taşır ve çekimli fiilin ardında durur.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-8",
              no: 8,
              text: "Lücke 8 (feste Wendung: zur … stehen)",
              accept: ["Verfügung"],
              explain:
                "Sorulara açık olduğunu bildiren kalıp: `Für Rückfragen stehe ich Ihnen gern zur Verfügung.` Bu kalıptaki ad değişmez ve tekil kalır.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-9",
              no: 9,
              text: "Lücke 9 (Frist)",
              accept: ["bis"],
              explain:
                "İdarenin kendi verdiği son tarih yineleniyor: `bis zum 31. Oktober`. `ab` süreyi başlatır, `seit` geçmişe bakar.",
            },
            {
              kind: "gap",
              id: "de-c1-11-s2-10",
              no: 10,
              text: "Lücke 10 (Nachname der Absenderin)",
              accept: ["Gollnick"],
              explain:
                "Yazan kişi panelde konuşan orman sahibiyle aynı: yirmi bir hektarlık ormanı olan Marlene Gollnick.",
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
          id: "de-c1-11-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Eigentum: Vollmacht oder Verhandlung?\". Gliedern Sie: Einstieg — Begriffsklärung — Argumente für die eine Seite — Argumente für die andere — eigene Position mit Einwand — Abschluss.",
          promptTr:
            "\"Mülkiyet: yetki mi, müzakere mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavram açıklaması — bir tarafın gerekçeleri — öteki tarafın gerekçeleri — kendi konumun ve ona itiraz — kapanış.",
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
              "Ich möchte darüber sprechen, ob Eigentum eine Vollmacht oder eine Verhandlung ist. Ich kläre zuerst die Begriffe, stelle dann beide Seiten dar und komme am Ende zu meiner Position, gegen die ich selbst einen Einwand vorbringen werde. Mit Vollmacht meine ich die Vorstellung, der Eigentümer entscheide allein und abschließend. Mit Verhandlung meine ich einen Bestand von Befugnissen, der immer wieder neu bestimmt wird. Für die erste Lesart spricht die Verlässlichkeit. Wer investiert, muss wissen, was ihm bleibt; eine Fläche, deren Nutzung jährlich neu ausgehandelt wird, wird nicht bewirtschaftet. Für die zweite Lesart spricht die Rechtswirklichkeit. Ein Wald mit Betretungsrecht gehört jemandem, und trotzdem darf dieser jemand ihn nicht sperren. Die Vollmacht hat es in dieser Form nie gegeben. Meine Position ist, dass die zweite Lesart zutrifft und die erste als Erwartung wirksam bleibt — und genau diese Differenz erzeugt die Konflikte. Der Einwand dagegen wiegt allerdings schwer: Wer Eigentum nur als Verhandlung beschreibt, macht Planung unmöglich und lädt zu Vernachlässigung ein. Ich halte die Position gleichwohl, weil sich Verlässlichkeit auch anders herstellen lässt, etwa durch feste Fristen. Zusammenfassend: Nicht ob etwas jemandem gehört, entscheidet über seinen Zustand, sondern wie geregelt ist, wer ihn pflegt.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavramlar gerçekten açıldı mı — yetki ile müzakere ayrımı somut mu?",
              "Her iki taraf için de örnekle desteklenmiş gerekçe var mı?",
              "Kendi konumuna yönelik itiraz gerçek bir itiraz mı ve yanıtlandı mı?",
              "Dört dakika boyunca yapı korunabildi mi?",
              "C1 yapıları (adlaştırma, edilgen, `lässt sich`, ölçü belirteçleri) kullanılabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-11-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Treffen Sie gemeinsam eine Entscheidung. Eine Gemeinde führt einen Wegefonds ein und muss vier Fragen klären: Beitrag nach Länge oder nach Nutzung? Stimmrecht für alle Anlieger oder nur für Einzahlende? Härtefallregelung ja oder nein? Was geschieht nach fünf Jahren? Einigen Sie sich.",
          promptTr:
            "Birlikte bir karar verin. Bir belediye yol bakım fonu kuruyor ve dört soruyu çözmesi gerekiyor: Katkı uzunluğa göre mi, kullanıma göre mi? Oy hakkı bütün komşulara mı, yalnız ödeyenlere mi? Zorluk hâli düzenlemesi olsun mu? Beş yıl sonra ne olacak? Anlaşın.",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich beginne: Der Beitrag sollte nach Länge berechnet werden. Das ist einfach und niemand kann es bestreiten. Was meinen Sie?",
              tr: "Ben başlayayım: Katkı uzunluğa göre hesaplanmalı. Basit ve kimse itiraz edemez. Sen ne diyorsun?",
            },
            {
              who: "you",
              hint: "Bir konum al ve 'kimse itiraz edemez' gerekçesini doğrudan ele al.",
              expect: "bir konum almak ve karşı tarafın gerekçesini doğrudan ele almak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Zum Stimmrecht: Wer nicht zahlt, soll auch nicht mitentscheiden. Das klingt hart, aber alles andere lädt zum Trittbrettfahren ein. Wie sehen Sie das?",
              tr: "Oy hakkı meselesi: Ödemeyen karar da vermesin. Sert geliyor ama başka türlüsü bedavacılığa davetiye çıkarıyor. Sen nasıl görüyorsun?",
            },
            {
              who: "you",
              hint: "İtirazı ele al ve gerekirse bir ayrım ya da kademe öner.",
              expect: "itirazı ele almak ve gerekirse ayrımlı bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Eine Härtefallregelung kostet Verwaltung und schafft Streit über Grenzfälle. Lohnt sich das?",
              tr: "Zorluk hâli düzenlemesi idari yük getiriyor ve sınır durumlarda tartışma yaratıyor. Buna değer mi?",
            },
            {
              who: "you",
              hint: "Bir seçim yap ve idari maliyeti de tart.",
              expect: "gerekçeli bir seçim yapmak ve maliyet argümanını tartmak",
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
              "Dass die Länge unbestreitbar ist, stimmt und ist zugleich ihr Nachteil: Sie misst, was leicht zu messen ist, nicht das, was den Weg abnutzt. Ein Betrieb mit schweren Maschinen und zweihundert Metern belastet die Fahrbahn stärker als ein Anlieger mit zwei Kilometern Fußweg. Ich schlage deshalb eine Mischung vor: siebzig Prozent nach Länge, dreißig nach Fahrzeugklasse. Zum Stimmrecht räume ich Ihnen den Kern ein — ohne Kopplung entsteht Trittbrettfahren. Ich würde trotzdem staffeln: volles Stimmrecht für Einzahlende, ein Anhörungsrecht für alle Anlieger. Damit verliert niemand die Stimme, die er vorher als Anlieger hatte. Bei der Härtefallregelung entscheide ich mich trotz des Aufwands dafür. Ohne sie trifft der Beitrag genau die Kleinsten am härtesten, und in zwei Jahren führen wir die Debatte erneut, nur lauter. Zusammengefasst: gemischter Beitrag, gestaffeltes Stimmrecht, Härtefallregelung mit fester Obergrenze. Offen bleibt ausdrücklich die Frage nach fünf Jahren — die Auswertung muss vorher festgeschrieben werden, sonst entscheidet sie niemand, und ich möchte das nicht durch eine optimistische Annahme verdecken.",
            criteria: [
              "Konum gerekçelendirildi mi ve karşı tarafın gerekçesi doğrudan ele alındı mı?",
              "Bedavacılık itirazına somut bir çözüm getirildi mi?",
              "İdari maliyet argümanı tartıldı mı, yoksa yok mu sayıldı?",
              "Özet açık kalan noktayı da içeriyor mu, yoksa anlaşma varmış gibi mi kapatıyor?",
              "Tartışma dili C1 düzeyinde mi (einräumen, abwägen, staffeln, offenlegen)?",
            ],
          },
        },
      ],
    },
  ],
};
