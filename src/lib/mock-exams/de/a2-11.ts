import type { MockPaper } from "../types";

/**
 * A2 · Deneme 11 — "Sport und Verein".
 *
 * PLAN kâğıt 1–10 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 ana fikir · 5 gazete · 5 blog · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 kısa · 5 eşleştirme · 5 mesaj · 5 R/F söyleşi)
 *   Schreiben 30 dk           iki kısa metin (~40 kelime)
 *   Sprechen  15 dk           bilgi sorma · anlatı · birlikte planlama
 *
 * KONU SEÇİMİ: dernek üyeliği. "Freizeit und Gesundheit" kâğıdı spor
 * yapmayı almıştı; buradaki konu spor değil, derneğin kendisi — aidat,
 * çıkış bildirimi, antrenman saatleri, sakatlık, gönüllü görev. A2'de
 * Almanya'da yaşayan biri bu metinlerle gerçekten karşılaşıyor.
 *
 * A2 dilbilgisi: Perfekt, kiplik fiilleri ve weil/dass/wenn yan cümleleri
 * her bölümde geçiyor. `dessen`, `deren` ve edilgen `worden` kullanılmadı.
 */
export const A2_11: MockPaper = {
  id: "de-a2-11",
  course: "de",
  level: "A2",
  no: 11,
  theme: "Sport und Verein",
  themeTr: "Spor ve dernek",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen kurze Texte, einen Zeitungsartikel, einen Blogtext und Anzeigen.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa metinler, bir gazete yazısı, bir blog metni ve ilanlar okuyacaksın.",
      tasks: [
        {
          id: "de-a2-11-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die fünf Texte. Worum geht es? Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Beş metni oku. Konu ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Nachricht an den Verein",
              genreTr: "Derneğe ileti",
              body: `Sehr geehrte Damen und Herren,

ich möchte meine Mitgliedschaft zum 31. Dezember kündigen. Ich bin im Sommer umgezogen und schaffe den Weg zum Training nicht mehr.

Bitte schicken Sie mir eine kurze Bestätigung.

Mit freundlichen Grüßen
Vedat Kaya`,
              gloss: [
                { de: "die Mitgliedschaft", tr: "üyelik", en: "membership" },
                { de: "kündigen", tr: "(üyeliği) sonlandırmak", en: "to cancel, terminate" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang in der Halle",
              genreTr: "Salondaki duyuru",
              body: `Liebe Mitglieder,

in den Winterferien fällt das Training aus. Die Halle wird in dieser Zeit gestrichen.

Ab dem 8. Januar trainieren wir wieder wie immer.

Wer trotzdem üben möchte, kann in die Halle Nord gehen. Dort haben wir zwei Termine bekommen.`,
              gloss: [
                { de: "ausfallen", tr: "iptal olmak", en: "to be cancelled" },
                { de: "streichen", tr: "boyamak", en: "to paint" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "E-Mail vom Trainer",
              genreTr: "Antrenörden e-posta",
              body: `Hallo zusammen,

am Samstag spielen wir auswärts. Wir fahren um 8 Uhr mit dem Bus vom Parkplatz.

Bringt bitte etwas zu essen mit, weil wir erst am Nachmittag zurück sind.

Wer nicht mitfahren kann, schreibt mir bis Donnerstag.

Viele Grüße
Jörg Buchholz`,
              gloss: [
                { de: "auswärts", tr: "deplasmanda", en: "away (game)" },
                { de: "mitfahren", tr: "birlikte gitmek", en: "to travel along" },
              ],
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Der Sportverein Rehfeld sucht Menschen für den Kiosk. Bei den Heimspielen verkauft der Verein Getränke und Kuchen.

Die Arbeit dauert etwa drei Stunden und wird nicht bezahlt. Das Geld bleibt im Verein und hilft der Jugend.

Wer Zeit hat, meldet sich im Büro.`,
              gloss: [
                { de: "das Heimspiel", tr: "iç saha maçı", en: "home game" },
                { de: "sich melden", tr: "başvurmak, haber vermek", en: "to get in touch" },
              ],
            },
            {
              kind: "text",
              id: "t5",
              genre: "Nachricht in der Mannschaftsgruppe",
              genreTr: "Takım grubunda ileti",
              body: `Hallo alle,

ich habe mir gestern beim Training das Knie verletzt. Der Arzt sagt, ich muss sechs Wochen pausieren.

Ich komme aber zu den Spielen und schaue zu. Das Trikot gebe ich nicht ab.

Bis Samstag!
Maren`,
              gloss: [
                { de: "sich verletzen", tr: "sakatlanmak", en: "to get injured" },
                { de: "pausieren", tr: "ara vermek", en: "to take a break" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-11-l1-1",
              no: 1,
              ref: "t1",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand bittet um eine Bestätigung vom Verein.",
                "Jemand beendet die Mitgliedschaft.",
                "Jemand fragt nach dem Training im Dezember.",
              ],
              answer: 1,
              explain:
                "İletinin amacı ilk cümlede: \"ich möchte meine Mitgliedschaft zum 31. Dezember kündigen\". Taşınma bunun gerekçesi.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l1-2",
              no: 2,
              ref: "t2",
              text: "Worum geht es in dem Text?",
              options: [
                "Der Verein bekommt eine neue Halle.",
                "Die Mitglieder sollen beim Streichen helfen.",
                "Das Training pausiert in den Ferien.",
              ],
              answer: 2,
              explain:
                "Duyuru bir ara bildiriyor: \"in den Winterferien fällt das Training aus\", ve 8 Ocak'ta yeniden başlıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l1-3",
              no: 3,
              ref: "t3",
              text: "Worum geht es in dem Text?",
              options: [
                "Der Trainer organisiert die Fahrt zum Spiel.",
                "Der Trainer sucht neue Spieler für die Mannschaft.",
                "Der Trainer verschiebt das Spiel auf Sonntag.",
              ],
              answer: 0,
              explain:
                "E-posta yolculuğu düzenliyor: \"Wir fahren um 8 Uhr mit dem Bus vom Parkplatz\" — ardından yiyecek ve haber verme tarihi geliyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l1-4",
              no: 4,
              ref: "t4",
              text: "Worum geht es in dem Text?",
              options: [
                "Der Verein verkauft seinen Kiosk.",
                "Der Verein erhöht die Preise im Kiosk.",
                "Der Verein sucht freiwillige Helfer.",
              ],
              answer: 2,
              explain:
                "\"Der Sportverein Rehfeld sucht Menschen für den Kiosk\" — ve iş ücretsiz, yani gönüllü aranıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l1-5",
              no: 5,
              ref: "t5",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand tritt aus der Mannschaft aus.",
                "Jemand kann sechs Wochen nicht spielen.",
                "Jemand sucht ein neues Trikot.",
              ],
              answer: 1,
              explain:
                "Sakatlık ve süre veriliyor: \"ich muss sechs Wochen pausieren\". Takımdan ayrılmıyor, maçlara geliyor.",
            },
          ],
        },
        {
          id: "de-a2-11-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 6 bis 10. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Metni ve 6–10. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Der Verein, der ohne Trainer fast zugemacht hat",
              body: `Der Turnverein Wittenau hat im Frühjahr fast geschlossen. Der Grund war kein Geld und kein Platz, sondern eine einzige Person: Nach zwanzig Jahren hat der Trainer aufgehört.

"Wir haben drei Monate lang niemanden gefunden", sagt die Vorsitzende Silke Gebhardt. "Wir haben in der Zeitung gesucht und in allen Gruppen geschrieben. Es hat nichts gebracht."

Dann hat sich eine Lösung gezeigt, die niemand geplant hat. Vier Mitglieder haben sich die Aufgabe geteilt. Jeder macht jetzt ein Training pro Woche.

"Das ist mehr Arbeit für alle", sagt Gebhardt. "Aber es ist sicherer. Wenn einer krank wird, geht es trotzdem weiter."

Die Zahl der Mitglieder ist danach sogar gestiegen. Der Verein hat heute 180 Mitglieder, vor einem Jahr waren es 154.

Gebhardt möchte trotzdem keine Werbung für ihr Modell machen. "Es funktioniert, weil wir vier Leute hatten. In kleinen Vereinen gibt es die nicht."`,
              gloss: [
                { de: "die Vorsitzende", tr: "dernek başkanı", en: "chairwoman" },
                { de: "aufhören", tr: "bırakmak", en: "to quit" },
                { de: "sich teilen", tr: "paylaşmak", en: "to share" },
                { de: "die Werbung", tr: "reklam", en: "advertising" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-11-l2-6",
              no: 6,
              ref: "r1",
              text: "Warum hat der Verein fast geschlossen?",
              options: [
                "Der Trainer hat aufgehört.",
                "Es hat Geld für die Halle gefehlt.",
                "Die Mitglieder sind weggegangen.",
              ],
              answer: 0,
              explain:
                "Yazı gerekçeleri ayırıyor: \"kein Geld und kein Platz, sondern eine einzige Person\" — yirmi yıllık antrenör bırakmış.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l2-7",
              no: 7,
              ref: "r1",
              text: "Wie lange hat die Suche gedauert?",
              options: [
                "Zwanzig Jahre.",
                "Ein ganzes Jahr.",
                "Drei Monate.",
              ],
              answer: 2,
              explain:
                "\"Wir haben drei Monate lang niemanden gefunden\" — yirmi yıl antrenörün görev süresi.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l2-8",
              no: 8,
              ref: "r1",
              text: "Wie haben sie das Problem gelöst?",
              options: [
                "Sie haben einen Trainer bezahlt.",
                "Vier Mitglieder teilen die Aufgabe.",
                "Sie haben die Gruppen zusammengelegt.",
              ],
              answer: 1,
              explain:
                "\"Vier Mitglieder haben sich die Aufgabe geteilt. Jeder macht jetzt ein Training pro Woche.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l2-9",
              no: 9,
              ref: "r1",
              text: "Was ist nach der Umstellung passiert?",
              options: [
                "Es sind mehr Leute gekommen.",
                "Der Beitrag ist teurer geworden.",
                "Zwei Gruppen sind weggefallen.",
              ],
              answer: 0,
              explain:
                "Yazı iki sayıyı karşılaştırıyor: \"Der Verein hat heute 180 Mitglieder, vor einem Jahr waren es 154.\" Aidat ve gruplar hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l2-10",
              no: 10,
              ref: "r1",
              text: "Was sagt Frau Gebhardt über ihr Modell?",
              options: [
                "Alle Vereine sollen es machen.",
                "Es hat sich nicht gelohnt.",
                "Es passt nicht überall.",
              ],
              answer: 2,
              explain:
                "Sınırı kendisi koyuyor: \"Es funktioniert, weil wir vier Leute hatten. In kleinen Vereinen gibt es die nicht.\"",
            },
          ],
        },
        {
          id: "de-a2-11-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Blogtext und die Aufgaben 11 bis 15. Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Blog metnini ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "r2",
              genre: "Blogtext",
              genreTr: "Blog metni",
              title: "Mit 41 zum ersten Mal in einem Verein",
              body: `Ich habe nie Sport gemacht. In der Schule war ich immer die Letzte, und danach habe ich gar nicht mehr daran gedacht.

Im letzten Herbst hat meine Nachbarin mich zum Volleyball mitgenommen. Ich bin nur mitgegangen, weil ich nicht Nein sagen konnte.

Der erste Abend war schlimm. Ich habe fast jeden Ball verloren. Aber niemand hat gelacht, und das hat mich überrascht.

Nach vier Wochen habe ich gemerkt, dass ich mich auf den Dienstag freue. Nicht wegen des Sports, sondern wegen der Leute.

Der Beitrag ist niedrig: 12 Euro im Monat. Die Halle und die Bälle sind dabei. Ich habe nur Schuhe gekauft.

Was ich vorher nicht wusste: In einem Verein muss man auch etwas tun. Ich mache jetzt zweimal im Jahr den Kiosk. Das gehört dazu, und ich finde das richtig.

Wenn Sie unsicher sind, gehen Sie einfach einmal hin. Fast jeder Verein lässt Sie dreimal kostenlos mittrainieren.`,
              gloss: [
                { de: "mitnehmen", tr: "birlikte götürmek", en: "to take along" },
                { de: "überraschen", tr: "şaşırtmak", en: "to surprise" },
                { de: "der Beitrag", tr: "aidat", en: "membership fee" },
                { de: "unsicher", tr: "kararsız", en: "unsure" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-11-l3-11",
              no: 11,
              ref: "r2",
              text: "Warum ist die Autorin mitgegangen?",
              options: [
                "Sie wollte wieder Sport machen.",
                "Sie hat lange nach einem Verein gesucht.",
                "Sie konnte der Nachbarin nicht absagen.",
              ],
              answer: 2,
              explain:
                "Gerekçeyi kendisi söylüyor: \"Ich bin nur mitgegangen, weil ich nicht Nein sagen konnte.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l3-12",
              no: 12,
              ref: "r2",
              text: "Was hat sie am ersten Abend überrascht?",
              options: [
                "Sie hat viele Bälle bekommen.",
                "Niemand hat über sie gelacht.",
                "Der Trainer hat sie gelobt.",
              ],
              answer: 1,
              explain:
                "İlk akşam kötü geçmiş ama: \"niemand hat gelacht, und das hat mich überrascht\".",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l3-13",
              no: 13,
              ref: "r2",
              text: "Warum freut sie sich auf den Dienstag?",
              options: [
                "Wegen der Leute.",
                "Wegen des Sports.",
                "Wegen der neuen Halle.",
              ],
              answer: 0,
              explain:
                "Metin iki gerekçeyi karşı karşıya koyuyor: \"Nicht wegen des Sports, sondern wegen der Leute.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l3-14",
              no: 14,
              ref: "r2",
              text: "Was war für sie neu am Verein?",
              options: [
                "Der Beitrag ist sehr niedrig.",
                "Man muss selbst etwas tun.",
                "Die Bälle muss man kaufen.",
              ],
              answer: 1,
              explain:
                "\"Was ich vorher nicht wusste: In einem Verein muss man auch etwas tun\" — yılda iki kez büfe nöbeti.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-l3-15",
              no: 15,
              ref: "r2",
              text: "Was rät sie unsicheren Leuten?",
              options: [
                "Erst einmal zuschauen zu gehen.",
                "Vorher mit dem Trainer zu sprechen.",
                "Einfach zum Training zu kommen.",
              ],
              answer: 2,
              explain:
                "Tavsiye ve gerekçesi son satırda: \"gehen Sie einfach einmal hin. Fast jeder Verein lässt Sie dreimal kostenlos mittrainieren.\"",
            },
          ],
        },
        {
          id: "de-a2-11-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen ein Sportangebot. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler bir spor imkânı arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Schwimmen für Anfänger",
              body: "Kurs für Erwachsene ohne Vorkenntnisse. Zehn Termine, dienstags 19 Uhr. 60 Euro, Anmeldung im Bad.",
            },
            {
              key: "b",
              label: "Eltern-Kind-Turnen",
              body: "Für Kinder von 2 bis 4 Jahren mit einem Elternteil. Samstags 10 Uhr in der kleinen Halle. Ohne Anmeldung.",
            },
            {
              key: "c",
              label: "Laufgruppe Rehfeld",
              body: "Wir laufen montags und donnerstags um 18 Uhr am Park. Kein Beitrag, keine Anmeldung. Auch bei Regen.",
            },
            {
              key: "d",
              label: "Rückenkurs mit Rezept",
              body: "Zwölf Termine, mittwochs 17 Uhr. Die Krankenkasse zahlt einen Teil. Ärztliches Rezept nötig.",
            },
            {
              key: "e",
              label: "Volleyball Freizeitgruppe",
              body: "Dienstags 20 Uhr, ohne Wettkampf. Neue Leute jederzeit willkommen, dreimal kostenlos mitspielen.",
            },
            {
              key: "f",
              label: "Fitnessstudio Nord",
              body: "Geräte und Kurse, täglich 6 bis 23 Uhr. Vertrag über 12 Monate, 39 Euro im Monat.",
            },
            {
              key: "g",
              label: "Tischtennis am Vormittag",
              body: "Für alle ab 60 Jahren. Montags und freitags 10 bis 12 Uhr. Schläger sind da, Beitrag 8 Euro im Monat.",
            },
            {
              key: "h",
              label: "Fußball Jugend U14",
              body: "Training dienstags und freitags 17 Uhr. Spiele am Wochenende. Anmeldung nur zum Saisonbeginn.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-11-l4-16",
              no: 16,
              text: "Frau Sielaff ist 68 und möchte vormittags etwas machen. Sie hat keinen Schläger.",
              answer: "g",
              explain:
                "(g) hem yaş grubunu hem saati veriyor: \"ab 60 Jahren\", \"10 bis 12 Uhr\" — ve raketler kulüpte.",
            },
            {
              kind: "match",
              id: "de-a2-11-l4-17",
              no: 17,
              text: "Herr Nowotny hat Rückenschmerzen. Sein Arzt hat ihm etwas aufgeschrieben.",
              answer: "d",
              explain:
                "(d) reçete istiyor ve sırt için: \"Ärztliches Rezept nötig\". Sağlık sigortası bir kısmını ödüyor.",
            },
            {
              kind: "match",
              id: "de-a2-11-l4-18",
              no: 18,
              text: "Frau Wienholt möchte kein Geld ausgeben und läuft gern draußen.",
              answer: "c",
              explain:
                "(c) hem bedava hem açık havada: \"Kein Beitrag, keine Anmeldung. Auch bei Regen.\"",
            },
            {
              kind: "match",
              id: "de-a2-11-l4-19",
              no: 19,
              text: "Herr Kaya hat eine dreijährige Tochter und möchte mit ihr zusammen etwas machen.",
              answer: "b",
              explain:
                "(b) yaşı ve birlikteliği veriyor: \"von 2 bis 4 Jahren mit einem Elternteil\".",
            },
            {
              kind: "match",
              id: "de-a2-11-l4-20",
              no: 20,
              text: "Frau Ruppert kann nicht schwimmen und möchte es lernen.",
              answer: "a",
              explain:
                "(a) yetişkinler için ve ön bilgi istemiyor: \"Kurs für Erwachsene ohne Vorkenntnisse\".",
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
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Gespräch, Nachrichten und ein Interview.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir konuşma, mesajlar ve bir söyleşi dinleyeceksin.",
      tasks: [
        {
          id: "de-a2-11-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Durchsage in der Halle",
              genreTr: "Salonda anons",
              situation: "Antrenman yeri değişti.",
              plays: 2,
              segments: [
                {
                  text: "Eine Information für die Volleyballgruppe: Heute trainieren wir nicht in Halle eins, sondern in Halle zwei. In Halle eins wird der Boden repariert.",
                },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch im Vereinsbüro",
              genreTr: "Dernek bürosunda konuşma",
              situation: "Biri aidatı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ruppert", text: "Was kostet die Mitgliedschaft im Jahr?" },
                { speaker: "Mitarbeiter", text: "Für Erwachsene hundertvierzig Euro. Kinder zahlen siebzig." },
                { speaker: "Frau Ruppert", text: "Und wenn ich im Juli anfange?" },
                { speaker: "Mitarbeiter", text: "Dann zahlen Sie nur die Hälfte." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch nach dem Training",
              genreTr: "Antrenman sonrası konuşma",
              situation: "Bir sakatlık konuşuluyor.",
              plays: 2,
              segments: [
                { speaker: "Trainer", text: "Wie geht es deinem Knie?" },
                { speaker: "Maren", text: "Besser. Aber der Arzt hat gesagt, ich soll noch drei Wochen warten." },
                { speaker: "Trainer", text: "Dann komm zum Zuschauen. Das ist auch wichtig." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Deneme antrenmanı soruluyor.",
              plays: 2,
              segments: [
                { speaker: "Interessent", text: "Kann ich einmal zum Probetraining kommen?" },
                { speaker: "Trainerin", text: "Ja, dreimal sogar. Bringen Sie Hallenschuhe mit." },
                { speaker: "Interessent", text: "Muss ich mich vorher anmelden?" },
                { speaker: "Trainerin", text: "Nein, kommen Sie einfach am Dienstag." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Durchsage beim Spiel",
              genreTr: "Maçta anons",
              situation: "Büfe hakkında duyuru.",
              plays: 2,
              segments: [
                {
                  text: "Liebe Zuschauer, der Kiosk ist heute erst ab der zweiten Halbzeit offen. Wir haben leider zu wenige Helfer. Getränke gibt es dann aber wie immer.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-11-h1-1",
              no: 1,
              ref: "a1",
              text: "Wo trainiert die Gruppe heute?",
              options: ["In Halle eins.", "Draußen auf dem Platz.", "In Halle zwei."],
              answer: 2,
              explain:
                "Anons iki salonu karşılaştırıyor: birinci salonda zemin onarılıyor, antrenman \"in Halle zwei\".",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h1-2",
              no: 2,
              ref: "a2",
              text: "Was zahlt Frau Ruppert, wenn sie im Juli anfängt?",
              options: ["70 Euro.", "140 Euro.", "35 Euro."],
              answer: 0,
              explain:
                "\"Für Erwachsene hundertvierzig Euro\", temmuzda başlayan ise \"nur die Hälfte\" ödüyor — 140'ın yarısı 70. Yetmiş aynı zamanda çocuk aidatı.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h1-3",
              no: 3,
              ref: "a3",
              text: "Was soll Maren machen?",
              options: [
                "Wieder mittrainieren.",
                "Noch drei Wochen warten.",
                "Zum Arzt zurückgehen.",
              ],
              answer: 1,
              explain:
                "Doktorun sözü aktarılıyor: \"ich soll noch drei Wochen warten\". Antrenör de izlemeye gelmesini istiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h1-4",
              no: 4,
              ref: "a4",
              text: "Was muss der Interessent mitbringen?",
              options: ["Eine Anmeldung.", "Einen Ausweis.", "Hallenschuhe."],
              answer: 2,
              explain:
                "\"Bringen Sie Hallenschuhe mit\" — kayıt gerekmiyor, salı günü gelmesi yetiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h1-5",
              no: 5,
              ref: "a5",
              text: "Warum öffnet der Kiosk später?",
              options: [
                "Es fehlen Helfer.",
                "Die Getränke sind nicht da.",
                "Das Spiel hat später angefangen.",
              ],
              answer: 0,
              explain:
                "Gerekçe anonsta: \"Wir haben leider zu wenige Helfer.\" İçecekler ise var.",
            },
          ],
        },
        {
          id: "de-a2-11-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen sagen, was sie im Verein machen möchten. Wer möchte was? Ordnen Sie zu. Drei Angebote bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi dernekte ne yapmak istediğini söylüyor. Kim ne istiyor? Eşleştir. Üç imkân artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch beim Vereinsabend",
              genreTr: "Dernek akşamında konuşma",
              situation: "Yeni gelenler sırayla ne istediklerini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Vorsitzende", text: "Damit wir Sie richtig einteilen: Was suchen Sie bei uns? Frau Sielaff?" },
                { speaker: "Frau Sielaff", text: "Etwas am Vormittag. Am Abend bin ich zu müde." },
                { speaker: "Vorsitzende", text: "Gut. Herr Nowotny?" },
                { speaker: "Herr Nowotny", text: "Ich brauche etwas für den Rücken. Mein Arzt hat mir das aufgeschrieben." },
                { speaker: "Vorsitzende", text: "Und Sie, Frau Wienholt?" },
                { speaker: "Frau Wienholt", text: "Ich möchte draußen laufen, aber nicht allein." },
                { speaker: "Vorsitzende", text: "Herr Kaya?" },
                { speaker: "Herr Kaya", text: "Etwas mit meiner Tochter zusammen. Sie ist drei." },
                { speaker: "Vorsitzende", text: "Und zum Schluss Frau Ruppert." },
                { speaker: "Frau Ruppert", text: "Ich kann nicht schwimmen. Das möchte ich endlich lernen." },
              ],
            },
          ],
          options: [
            { key: "a", label: "Tischtennis am Vormittag" },
            { key: "b", label: "Rückenkurs mit Rezept" },
            { key: "c", label: "Laufgruppe im Park" },
            { key: "d", label: "Eltern-Kind-Turnen" },
            { key: "e", label: "Schwimmkurs für Anfänger" },
            { key: "f", label: "Fußball für Jugendliche" },
            { key: "g", label: "Kiosk beim Heimspiel" },
            { key: "h", label: "Volleyball am Abend" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-11-h2-6",
              no: 6,
              ref: "g1",
              text: "Frau Sielaff",
              answer: "a",
              explain:
                "\"Etwas am Vormittag. Am Abend bin ich zu müde\" — sabahki tek imkân masa tenisi.",
            },
            {
              kind: "match",
              id: "de-a2-11-h2-7",
              no: 7,
              ref: "g1",
              text: "Herr Nowotny",
              answer: "b",
              explain:
                "\"Ich brauche etwas für den Rücken. Mein Arzt hat mir das aufgeschrieben\" — reçeteli sırt kursu.",
            },
            {
              kind: "match",
              id: "de-a2-11-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Wienholt",
              answer: "c",
              explain:
                "İki koşul birlikte: \"draußen laufen, aber nicht allein\" — yani koşu grubu.",
            },
            {
              kind: "match",
              id: "de-a2-11-h2-9",
              no: 9,
              ref: "g1",
              text: "Herr Kaya",
              answer: "d",
              explain:
                "\"Etwas mit meiner Tochter zusammen. Sie ist drei\" — üç yaş, ebeveyn-çocuk jimnastiğine uyuyor.",
            },
            {
              kind: "match",
              id: "de-a2-11-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Ruppert",
              answer: "e",
              explain:
                "\"Ich kann nicht schwimmen. Das möchte ich endlich lernen\" — başlangıç kursu.",
            },
          ],
        },
        {
          id: "de-a2-11-h3",
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
              situation: "Üyelik onayı.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Herr Kaya, hier ist der Turnverein. Ihre Anmeldung ist angekommen. Der erste Beitrag geht Anfang März vom Konto ab. Den Ausweis bekommen Sie beim nächsten Training.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Antrenör maçı erteliyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo zusammen, hier ist Jörg. Das Spiel am Samstag fällt aus, weil die andere Mannschaft zu wenige Spieler hat. Wir trainieren stattdessen normal um zehn.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Büfe için yardım aranıyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist Silke Gebhardt vom Verein. Wir brauchen am Sonntag noch zwei Helfer für den Kiosk. Es geht von zwölf bis fünfzehn Uhr. Bitte melden Sie sich bis Freitag.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kurs dolu.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Ruppert, hier ist das Schwimmbad. Der Kurs im Januar ist leider voll. Im März haben wir wieder Plätze. Sie stehen bei uns schon auf der Liste.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Üyelik sonlandırma onayı.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist der Verein. Wir haben Ihre Kündigung bekommen. Sie gilt zum einunddreißigsten Dezember. Bis dahin können Sie normal trainieren.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-11-h3-11",
              no: 11,
              ref: "m1",
              text: "Wann geht der erste Beitrag ab?",
              options: ["Im Februar.", "Im März.", "Im April."],
              answer: 1,
              explain:
                "Mesajda tek bir ay geçiyor: \"Der erste Beitrag geht Anfang März vom Konto ab.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h3-12",
              no: 12,
              ref: "m2",
              text: "Warum fällt das Spiel aus?",
              options: [
                "Der Platz ist gesperrt.",
                "Der Trainer ist krank.",
                "Die andere Mannschaft ist zu klein.",
              ],
              answer: 2,
              explain:
                "Gerekçe mesajda: \"weil die andere Mannschaft zu wenige Spieler hat\". Antrenman normal saatinde yapılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h3-13",
              no: 13,
              ref: "m3",
              text: "Wie lange dauert die Arbeit im Kiosk?",
              options: ["Drei Stunden.", "Zwei Stunden.", "Fünf Stunden."],
              answer: 0,
              explain:
                "\"von zwölf bis fünfzehn Uhr\" üç saat eder. İki, aranan yardımcı sayısı.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h3-14",
              no: 14,
              ref: "m4",
              text: "Was soll Frau Ruppert jetzt tun?",
              options: [
                "Sich neu anmelden.",
                "Nichts, sie steht auf der Liste.",
                "Einen anderen Kurs suchen.",
              ],
              answer: 1,
              explain:
                "Ocak kursu dolu ama: \"Sie stehen bei uns schon auf der Liste.\" Mart'ta yer açılıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-11-h3-15",
              no: 15,
              ref: "m5",
              text: "Was kann die Person bis Ende Dezember machen?",
              options: [
                "Den Ausweis abgeben.",
                "Den Beitrag zurückbekommen.",
                "Normal trainieren.",
              ],
              answer: 2,
              explain:
                "Mesajın son cümlesi: \"Bis dahin können Sie normal trainieren.\"",
            },
          ],
        },
        {
          id: "de-a2-11-h4",
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
              situation: "Dernek başkanı gönüllülük üzerine konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Gebhardt, warum finden Vereine so schwer Helfer?" },
                {
                  speaker: "Frau Gebhardt",
                  text: "Ich glaube nicht, dass die Leute weniger helfen wollen. Sie wissen nur oft nicht, was man tun kann. Wenn ich frage, ob jemand drei Stunden Kuchen verkauft, sagen viele Ja.",
                },
                { speaker: "Moderatorin", text: "Sie fragen also ganz konkret?" },
                {
                  speaker: "Frau Gebhardt",
                  text: "Genau. Früher haben wir geschrieben: Wir brauchen Hilfe. Da hat sich niemand gemeldet. Heute schreiben wir: Sonntag, zwölf bis fünfzehn Uhr, zwei Personen. Das funktioniert.",
                },
                { speaker: "Moderatorin", text: "Und die Mitglieder machen das gern?" },
                {
                  speaker: "Frau Gebhardt",
                  text: "Nicht alle. Manche zahlen lieber mehr Beitrag. Das verstehe ich auch, und wir haben das lange diskutiert.",
                },
                { speaker: "Moderatorin", text: "Wäre das keine Lösung?" },
                {
                  speaker: "Frau Gebhardt",
                  text: "Für das Geld schon. Aber der Verein lebt davon, dass sich Leute kennen. Am Kiosk lernt man in drei Stunden mehr Menschen kennen als in einem Jahr Training.",
                },
                { speaker: "Moderatorin", text: "Was raten Sie anderen Vereinen?" },
                {
                  speaker: "Frau Gebhardt",
                  text: "Fragt einzeln und nennt die Uhrzeit. Und sagt danach Danke. Das klingt einfach, aber wir haben zehn Jahre gebraucht, bis wir das gemacht haben.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-11-h4-16",
              no: 16,
              ref: "i1",
              text: "Frau Gebhardt glaubt, dass die Leute helfen wollen.",
              answer: true,
              explain:
                "\"Ich glaube nicht, dass die Leute weniger helfen wollen. Sie wissen nur oft nicht, was man tun kann.\"",
            },
            {
              kind: "bool",
              id: "de-a2-11-h4-17",
              no: 17,
              ref: "i1",
              text: "Früher hat der Verein mehr Helfer gefunden.",
              answer: false,
              explain:
                "Tersi söyleniyor: eskiden \"Wir brauchen Hilfe\" yazılırmış ve \"Da hat sich niemand gemeldet\".",
            },
            {
              kind: "bool",
              id: "de-a2-11-h4-18",
              no: 18,
              ref: "i1",
              text: "Manche Mitglieder zahlen lieber mehr Beitrag.",
              answer: true,
              explain:
                "\"Nicht alle. Manche zahlen lieber mehr Beitrag\" — ve bunu anladığını söylüyor.",
            },
            {
              kind: "bool",
              id: "de-a2-11-h4-19",
              no: 19,
              ref: "i1",
              text: "Für Frau Gebhardt ist mehr Geld die beste Lösung.",
              answer: false,
              explain:
                "Para için işe yaradığını kabul ediyor ama: \"der Verein lebt davon, dass sich Leute kennen\".",
            },
            {
              kind: "bool",
              id: "de-a2-11-h4-20",
              no: 20,
              ref: "i1",
              text: "Der Verein hat lange gebraucht, bis er einzeln gefragt hat.",
              answer: true,
              explain:
                "Süreyi kendisi veriyor: \"wir haben zehn Jahre gebraucht, bis wir das gemacht haben\".",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 30,
      instruction: "Dieser Teil hat zwei Aufgaben. Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
      instructionTr: "Bu bölümde iki görev var. Her maddeye bir-iki cümle yaz.",
      tasks: [
        {
          id: "de-a2-11-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie können am Samstag nicht zum Spiel mitfahren. Schreiben Sie an Ihren Trainer Jörg Buchholz (circa 40 Wörter). Sagen Sie, warum Sie nicht können, entschuldigen Sie sich und fragen Sie nach dem nächsten Termin.",
          promptTr:
            "Cumartesi maça gidemiyorsun. Antrenörün Jörg Buchholz'a yaz (yaklaşık 40 kelime). Neden gelemediğini söyle, özür dile ve sonraki tarihi sor.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Grund nennen", tr: "Gerekçeyi söylemek" },
              { de: "sich entschuldigen", tr: "Özür dilemek" },
              { de: "nach dem nächsten Termin fragen", tr: "Sonraki tarihi sormak" },
            ],
            sample: `Hallo Jörg,

leider kann ich am Samstag nicht mitfahren. Meine Schwester heiratet an diesem Tag, und ich muss um zehn schon in Leipzig sein.

Es tut mir wirklich leid, weil ich das Spiel gern gespielt hätte.

Wann ist das nächste Spiel? Dann bin ich sicher dabei.

Viele Grüße
Vedat`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Gerekçe somut mu, yoksa yalnız `ich kann nicht` mi deniyor?",
              "Özür açıkça söylendi mi?",
              "Soru gerçekten soru biçiminde mi kuruldu?",
              "Yaklaşık 40 kelime var mı ve antrenöre yazıldığı için `du` kullanıldı mı?",
              "En az bir yan cümle (weil / dass / wenn) kuruldu mu?",
            ],
          },
        },
        {
          id: "de-a2-11-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Ein Freund fragt Sie, ob er in einen Verein gehen soll. Schreiben Sie ihm (circa 40 Wörter). Erzählen Sie von Ihrer Erfahrung, nennen Sie einen Vorteil und einen Nachteil.",
          promptTr:
            "Bir arkadaşın derneğe girip girmemesi gerektiğini soruyor. Ona yaz (yaklaşık 40 kelime). Kendi deneyimini anlat, bir iyi bir de zor yanını söyle.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "von der eigenen Erfahrung erzählen", tr: "Kendi deneyimini anlatmak" },
              { de: "einen Vorteil nennen", tr: "Bir iyi yanını söylemek" },
              { de: "einen Nachteil nennen", tr: "Bir zor yanını söylemek" },
            ],
            sample: `Hallo Tarek,

ich bin seit einem Jahr im Volleyballverein. Am Anfang war ich unsicher, aber nach vier Wochen habe ich mich auf den Dienstag gefreut.

Gut ist, dass man schnell Leute kennenlernt. Schwierig ist, dass man auch helfen muss. Ich mache zweimal im Jahr den Kiosk.

Geh einfach einmal hin!

Viele Grüße
Maren`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Deneyim somut mu (süre, ne zaman başladığı gibi)?",
              "İyi ve zor yan gerçekten ayrı iki şey mi?",
              "Yaklaşık 40 kelime var mı ve arkadaşa yazıldığı için `du` kullanıldı mı?",
              "Perfekt ve en az bir yan cümle (weil / dass) kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: Fragen stellen, von sich erzählen und zusammen planen.",
      instructionTr: "Bu bölümde üç görev var: soru sormak, kendinden söz etmek ve birlikte plan yapmak.",
      tasks: [
        {
          id: "de-a2-11-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Stellen Sie Fragen zum Thema Verein und antworten Sie. Stichwörter: Beitrag — Training — Probetraining — Kündigung.",
          promptTr:
            "Dernek konusunda soru sor ve cevapla. Anahtar sözcükler: aidat — antrenman — deneme antrenmanı — üyelikten çıkış.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen über das Thema Verein. Ihr erstes Stichwort ist: Beitrag. Stellen Sie mir bitte eine Frage.",
              tr: "Dernek konusunu konuşuyoruz. İlk sözcüğün: aidat. Bana bir soru sor.",
            },
            { who: "you", hint: "«Beitrag» sözcüğüyle bir soru kur.", expect: "Beitrag sözcüğüyle doğru bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Bei uns kostet es hundertvierzig Euro im Jahr. Ihr nächstes Stichwort ist: Training.",
              tr: "Bizde yılda yüz kırk avro. Sıradaki sözcüğün: antrenman.",
            },
            { who: "you", hint: "«Training» için bir soru kur.", expect: "Training sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Dienstags und donnerstags um zwanzig Uhr. Jetzt eine Frage an Sie: Waren Sie schon einmal in einem Verein?",
              tr: "Salı ve perşembe saat sekizde. Şimdi sana bir soru: Hiç bir dernekte bulundun mu?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısa bir ayrıntı ekle.", expect: "soruya tam bir cümleyle cevap verip bir ayrıntı eklemek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wie kündigt man bei Ihnen eine Mitgliedschaft?",
              tr: "Teşekkürler. Son soru: Sizde üyelik nasıl sonlandırılıyor?",
            },
            { who: "you", hint: "Nasıl yapıldığını kısaca anlat.", expect: "bir işlemi kısaca anlatmak", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wie hoch ist der Beitrag im Jahr? — Wann ist das Training? — Ja, ich war zwei Jahre im Schwimmverein, aber dann bin ich umgezogen. — Man muss schriftlich kündigen, und zwar bis Ende September.",
            criteria: [
              "Dört anahtar sözcüğün her biri işlendi mi?",
              "Sorular doğru kuruldu mu?",
              "Cevaplar tam cümle mi ve bir ayrıntı içeriyor mu?",
              "Perfekt ya da kiplik fiili en az bir kez kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-a2-11-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von Sport in Ihrem Leben. Sprechen Sie zu den Stichwörtern: früher — heute — wie oft — mit wem — Kosten — Wunsch.",
          promptTr:
            "Hayatındaki spordan söz et. Şu anahtar sözcüklere göre konuş: eskiden — bugün — ne sıklıkla — kiminle — masraf — istek.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "früher und heute vergleichen", tr: "Eskiyi ve bugünü karşılaştırmak" },
              { de: "Häufigkeit und Begleitung nennen", tr: "Sıklığı ve kiminle olduğunu söylemek" },
              { de: "einen Wunsch nennen", tr: "Bir istek söylemek" },
            ],
            sample:
              "Früher habe ich gar keinen Sport gemacht. In der Schule habe ich es nicht gemocht. Heute spiele ich Volleyball, weil meine Nachbarin mich mitgenommen hat. Ich gehe einmal in der Woche, immer dienstags. Wir sind ungefähr zwölf Leute in der Gruppe. Der Beitrag ist niedrig, zwölf Euro im Monat. Ich möchte bald zweimal in der Woche gehen, aber im Moment habe ich keine Zeit.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Eski ile bugün arasındaki fark açıkça söylendi mi?",
              "Perfekt geçmiş için doğru kullanıldı mı?",
              "En az bir yan cümle (weil / dass / wenn) kuruldu mu?",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-11-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie zusammen. Ihr Verein möchte ein Sommerfest machen. Sprechen Sie über: Termin — Ort — Essen — Helfer.",
          promptTr:
            "Birlikte plan yapın. Derneğiniz bir yaz şenliği yapmak istiyor. Şunları konuşun: tarih — yer — yiyecek — yardımcılar.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen das Sommerfest. Wann soll es sein? Ich schlage den letzten Samstag im Juni vor.",
              tr: "Yaz şenliğini planlıyoruz. Ne zaman olsun? Ben haziranın son cumartesisini öneriyorum.",
            },
            { who: "you", hint: "Öneriye karşılık ver ve kendi tarihini söyle.", expect: "bir öneriye karşılık verip kendi önerisini söylemek", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und wo? Auf dem Sportplatz oder im Hof vom Bürgerhaus?",
              tr: "Peki. Nerede? Spor sahasında mı, halk evinin avlusunda mı?",
            },
            { who: "you", hint: "Bir yer seç ve kısa bir gerekçe söyle.", expect: "bir seçim yapıp gerekçelendirmek", seconds: 30 },
            {
              who: "partner",
              de: "Beim Essen bin ich unsicher. Grillen oder Kuchen? Was meinen Sie?",
              tr: "Yiyecekte kararsızım. Mangal mı, pasta mı? Sen ne dersin?",
            },
            { who: "you", hint: "Bir öneri yap ve neden olduğunu söyle.", expect: "gerekçeli bir öneri yapmak", seconds: 30 },
            {
              who: "partner",
              de: "Wir brauchen noch Helfer. Wie finden wir sie?",
              tr: "Yardımcılara da ihtiyacımız var. Onları nasıl buluruz?",
            },
            { who: "you", hint: "Somut bir yol öner.", expect: "somut bir çözüm önermek", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneri yapmak" },
              { de: "zustimmen oder ablehnen", tr: "Katılmak ya da katılmamak" },
              { de: "eine Entscheidung treffen", tr: "Bir karara varmak" },
            ],
            sample:
              "Der letzte Samstag im Juni passt gut, aber da sind viele im Urlaub. Ich schlage den ersten Samstag im Juli vor. Der Hof vom Bürgerhaus ist besser, weil wir dort ein Dach haben, wenn es regnet. Beim Essen bin ich für Grillen, weil dann alle länger bleiben. Für die Helfer schreiben wir nicht einfach `Wir brauchen Hilfe`, sondern fragen einzeln und nennen die Uhrzeit.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi?",
              "Karşı tarafın önerisine gerçekten karşılık verildi mi?",
              "Sonunda bir karara varıldı mı?",
              "Öneri kalıpları (ich schlage vor, ich bin für) kullanıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
