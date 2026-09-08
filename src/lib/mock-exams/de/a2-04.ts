import type { MockPaper } from "../types";

/**
 * A2 · Deneme 4 — "Arbeit und Ausbildung".
 *
 * PLAN kâğıt 1–3 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde
 *     Teil 1  5  üç şıklı seçme   blog — genel anlam (gist)
 *     Teil 2  5  üç şıklı seçme   gazete yazısı — ayrıntı (detail)
 *     Teil 3  5  üç şıklı seçme   beş kısa metin — ayrıntı (detail)
 *     Teil 4  5  eşleştirme       iş ve kurs ilanları — kime uyar (orientation)
 *   Hören  30 dk · 20 madde
 *     Teil 1  5  üç şıklı seçme   kısa konuşma (detail)
 *     Teil 2  5  eşleştirme       kim ne yapıyor (detail)
 *     Teil 3  5  üç şıklı seçme   kısa konuşma (detail)
 *     Teil 4  5  Richtig/Falsch   söyleşi — tutum (opinion)
 *   Schreiben 30 dk  özel ileti (~40 kelime) + yarı resmî ileti (~40 kelime)
 *   Sprechen  15 dk  konu sorusu · anlatı · ortak planlama
 *
 * KONU SEÇİMİ: iş yeri, A2'de sık geçen ama kâğıtta ender ölçülen bir alan —
 * izin istemek, bir randevuyu değiştirmek, bir şartı anlamak. Maddelerin
 * birçoğu bu yüzden koşula dayanıyor: izin var ama telafisi şartıyla, kurs
 * ücretsiz ama işveren onayıyla.
 */
export const A2_04: MockPaper = {
  id: "de-a2-04",
  course: "de",
  level: "A2",
  no: 4,
  theme: "Arbeit und Ausbildung",
  themeTr: "İş ve meslek eğitimi",
  minutes: 105,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 30,
      instruction:
        "Dieser Teil hat vier Aufgaben. Sie lesen einen Blogbeitrag, einen Zeitungstext, kurze Mitteilungen und Anzeigen.",
      instructionTr:
        "Bu bölümde dört görev var. Bir blog yazısı, bir gazete metni, kısa iletiler ve ilanlar okuyacaksın.",
      tasks: [
        {
          id: "de-a2-04-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 5. Wählen Sie: a, b oder c.",
          promptTr: "Metni ve 1–5. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Mein erstes Jahr in der Werkstatt",
              body: `Vor einem Jahr habe ich meine Ausbildung als Mechatronikerin angefangen. Vorher habe ich zwei Jahre in einem Café gearbeitet.

Am ersten Tag war ich sehr nervös. In der Werkstatt waren nur Männer. Mein Chef hat mich vorgestellt und mir einen Schrank gezeigt: "Das ist dein Werkzeug. Pass gut darauf auf."

In den ersten Wochen durfte ich nur zuschauen. Das war langweilig. Aber ich habe gelernt, wie die Kollegen miteinander sprechen.

Nach zwei Monaten habe ich meine erste Reparatur allein gemacht. Sie hat vier Stunden gedauert. Ein Kollege macht das in zwanzig Minuten. Aber ich war stolz.

Die Berufsschule ist für mich schwerer als die Werkstatt. Mathematik war nie mein Fach. Zweimal in der Woche sitze ich abends noch am Schreibtisch.

Mein Chef hat im Sommer gesagt, dass ich bleiben kann, wenn ich die Prüfung schaffe. Das hat mir sehr geholfen.

Nächstes Jahr mache ich den zweiten Teil der Prüfung. Ich weiß jetzt: Ich habe den richtigen Beruf.`,
              gloss: [
                { de: "die Ausbildung", tr: "meslek eğitimi", en: "vocational training" },
                { de: "das Werkzeug", tr: "alet, takım", en: "tools" },
                { de: "die Berufsschule", tr: "meslek okulu", en: "vocational school" },
                { de: "stolz", tr: "gururlu", en: "proud" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-04-l1-1",
              no: 1,
              text: "Wie war der erste Tag für die Autorin?",
              options: ["Sie war enttäuscht.", "Sie war aufgeregt.", "Sie hat sich gelangweilt."],
              answer: 1,
              explain:
                "\"Am ersten Tag war ich sehr nervös\" — yani gergin ve heyecanlı. Sıkılma daha sonra geliyor: ilk haftalarda yalnız izlemek zorunda kaldığında.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l1-2",
              no: 2,
              text: "Warum war der Anfang in der Werkstatt langweilig?",
              options: ["Sie durfte nur zusehen.", "Sie hatte kein Werkzeug.", "Der Chef hat nicht mit ihr gesprochen."],
              answer: 0,
              explain:
                "İlk haftalarda yalnız izlemesine izin veriliyor ve yazar bunu \"langweilig\" buluyor. Alet dolabı ilk gün gösteriliyor, patron da onu ekibe tanıtıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l1-3",
              no: 3,
              text: "Was findet die Autorin schwieriger als die Arbeit?",
              options: ["Die Kollegen.", "Die erste Reparatur.", "Die Berufsschule."],
              answer: 2,
              explain:
                "\"Die Berufsschule ist für mich schwerer als die Werkstatt\" — okul atölyeden ağır geliyor. İlk tamir dört saat sürüyor ama yazar bununla gurur duyuyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l1-4",
              no: 4,
              text: "Was hat der Chef im Sommer gesagt?",
              options: ["Sie bekommt mehr Geld.", "Sie kann nach der Prüfung bleiben.", "Sie muss im Herbst die Werkstatt wechseln."],
              answer: 1,
              explain:
                "Patron kalıcılığı bir şarta bağlıyor: \"dass ich bleiben kann, wenn ich die Prüfung schaffe\". Ücret artışı ya da atölye değişikliği metinde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l1-5",
              no: 5,
              text: "Wie sieht die Autorin ihre Zukunft?",
              options: ["Sie ist im richtigen Beruf.", "Sie will nach der Prüfung noch einmal wechseln.", "Sie weiß es noch nicht."],
              answer: 0,
              explain:
                "Son cümle kesin: \"Ich habe den richtigen Beruf\". Belirsizlik ya da yeniden meslek değiştirme fikri metinde hiç yok.",
            },
          ],
        },
        {
          id: "de-a2-04-l2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 6 bis 10. Wählen Sie: a, b oder c.",
          promptTr: "Metni ve 6–10. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Zeitungsartikel",
              genreTr: "Gazete yazısı",
              title: "Ein Jahr mit vier Arbeitstagen",
              body: `Die Firma Hansen aus Kiel hat ein Jahr lang etwas Neues probiert. Alle 60 Mitarbeiter haben nur vier Tage in der Woche gearbeitet. Das Geld ist gleich geblieben.

Der Chef Jan Hansen sagt, dass er zuerst Angst hatte. "Wir bauen Fenster. Wenn niemand da ist, steht die Maschine still."

Deshalb hat die Firma zwei Gruppen gemacht. Die eine Gruppe hat frei am Montag, die andere am Freitag. So ist die Werkstatt immer offen.

Nach einem Jahr sind die Zahlen da. Die Firma hat fast genauso viel produziert wie vorher. Die Mitarbeiter waren seltener krank: 2,9 Tage statt 4,1 Tage im Monat.

Nicht alles war gut. Die Pausen sind kürzer geworden, und drei Mitarbeiter haben gesagt, dass die Tage zu voll sind.

Die Firma macht aber weiter. Ab Januar gilt die Vier-Tage-Woche für alle Betriebe der Familie Hansen.`,
              gloss: [
                { de: "der Mitarbeiter", tr: "çalışan", en: "employee" },
                { de: "still stehen", tr: "durmak, çalışmamak", en: "to stand idle" },
                { de: "produzieren", tr: "üretmek", en: "to produce" },
                { de: "der Betrieb", tr: "işletme", en: "business, plant" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-04-l2-6",
              no: 6,
              text: "Was ist mit dem Lohn passiert?",
              options: [
                "Die Mitarbeiter haben mehr Geld bekommen.",
                "Die Mitarbeiter haben weniger Geld bekommen.",
                "Alle haben so viel verdient wie vorher.",
              ],
              answer: 2,
              explain:
                "Metin ücret için \"Das Geld ist gleich geblieben\" diyor: dört gün çalışılıyor ama kazanç aynı kalıyor. Artış ya da azalış hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l2-7",
              no: 7,
              text: "Warum hatte der Chef zuerst Angst?",
              options: [
                "Weil die Kunden dann zu einer anderen Firma gehen.",
                "Weil die Maschine dann stillsteht.",
                "Weil die Firma zu klein ist.",
              ],
              answer: 1,
              explain:
                "Patron kaygısını kendi cümlesiyle söylüyor: \"Wenn niemand da ist, steht die Maschine still\". Müşteri kaybı ya da firmanın büyüklüğü hiç konu edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l2-8",
              no: 8,
              text: "Wie hat die Firma das Problem gelöst?",
              options: ["Mit zwei Gruppen.", "Mit neuen Maschinen in der Werkstatt.", "Mit mehr Personal."],
              answer: 0,
              explain:
                "Firma iki grup kuruyor: biri pazartesi, öteki cuma izinli. Böylece \"ist die Werkstatt immer offen\". Yeni makine ya da yeni işe alım metinde yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l2-9",
              no: 9,
              text: "Was sagen die Zahlen nach einem Jahr?",
              options: ["Die Firma hat viel weniger produziert.", "Die Mitarbeiter waren öfter krank.", "Es gab weniger Krankheitstage."],
              answer: 2,
              explain:
                "Hastalık günleri ayda 4,1'den 2,9'a iniyor, yani azalıyor. Üretim ise \"fast genauso viel\" kalıyor; büyük bir düşüş yok.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l2-10",
              no: 10,
              text: "Was war ein Nachteil?",
              options: ["Die Firma hat Geld verloren.", "Für Pausen blieb weniger Zeit.", "Drei Mitarbeiter haben gekündigt."],
              answer: 1,
              explain:
                "Metin iki olumsuzluk sayıyor: molalar kısalıyor ve üç çalışan günlerin çok dolu olduğunu söylüyor. Kimse işten ayrılmıyor, firma da zarar etmiyor.",
            },
          ],
        },
        {
          id: "de-a2-04-l3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Lesen Sie die fünf kurzen Texte und die Aufgaben 11 bis 15. Wählen Sie: a, b oder c.",
          promptTr: "Beş kısa metni ve 11–15. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "n1",
              genre: "Stellenanzeige",
              genreTr: "İş ilanı",
              title: "Bäckerei Sommer sucht Verkäuferin oder Verkäufer",
              body: `20 Stunden pro Woche, Montag bis Freitag ab 6 Uhr.

Deutschkenntnisse ab B1. Erfahrung ist nicht nötig.

Bewerbung per E-Mail an job@baeckerei-sommer.de`,
            },
            {
              kind: "text",
              id: "n2",
              genre: "E-Mail vom Chef",
              genreTr: "Patrondan e-posta",
              title: "Besprechung verschoben",
              body: `Liebe Kolleginnen und Kollegen,

die Besprechung am Mittwoch fällt aus. Ich bin auf einer Messe in Köln.

Wir treffen uns stattdessen am Freitag um 9 Uhr im großen Raum.

Bitte bringen Sie die Zahlen vom letzten Monat mit.

Viele Grüße
M. Sander`,
            },
            {
              kind: "text",
              id: "n3",
              genre: "Aushang in der Kantine",
              genreTr: "Yemekhanedeki duyuru",
              body: `Neue Öffnungszeiten ab 1. Oktober

Mittagessen: 11.30 bis 14 Uhr

Wer später kommt, findet belegte Brote im Automaten.

Bezahlen bitte nur mit Karte.`,
            },
            {
              kind: "text",
              id: "n4",
              genre: "Nachricht an eine Kollegin",
              genreTr: "İş arkadaşına mesaj",
              body: `Hallo Zeynep,

ich bin heute im Homeoffice. Mein Sohn ist krank.

Die Kundin aus Bremen ruft um 14 Uhr an. Kannst du das Gespräch übernehmen?

Die Unterlagen liegen auf meinem Schreibtisch.

Danke! Ines`,
            },
            {
              kind: "text",
              id: "n5",
              genre: "Aushang der Volkshochschule",
              genreTr: "Halk eğitim merkezi duyurusu",
              title: "Deutsch am Arbeitsplatz — Kurs B2",
              body: `Dienstag und Donnerstag, 18 bis 20 Uhr

Zehn Wochen, 120 Euro. Für Beschäftigte kostenlos,
wenn der Betrieb den Kurs bestätigt.

Anmeldung bis 15. September.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-04-l3-11",
              no: 11,
              ref: "n1",
              text: "Was braucht man für diese Stelle nicht?",
              options: ["Erfahrung.", "Deutschkenntnisse.", "Zeit am Morgen."],
              answer: 0,
              explain:
                "İlan \"Erfahrung ist nicht nötig\" diyor. Buna karşılık B1 düzeyinde Almanca ve sabah 6'dan itibaren çalışabilmek şart.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l3-12",
              no: 12,
              ref: "n2",
              text: "Was sollen die Kollegen mitbringen?",
              options: ["Nichts.", "Ein Formular für die Messe.", "Die Zahlen des Vormonats."],
              answer: 2,
              explain:
                "E-posta tek bir şey istiyor: \"die Zahlen vom letzten Monat\". Fuar, patronun çarşamba günü orada olma sebebi; getirilecek bir belge değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l3-13",
              no: 13,
              ref: "n3",
              text: "Was gilt ab Oktober?",
              options: ["Die Kantine schließt ab Oktober ganz.", "Barzahlung ist nicht möglich.", "Das Mittagessen ist teurer."],
              answer: 1,
              explain:
                "Duyuru \"Bezahlen bitte nur mit Karte\" diyor, yani nakit kabul edilmiyor. Kantin kapanmıyor; geç kalanlar için otomatta sandviç var, fiyat değişikliğinden ise söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l3-14",
              no: 14,
              ref: "n4",
              text: "Was soll Zeynep machen?",
              options: ["Ein Telefonat übernehmen.", "Zum Kunden nach Bremen fahren.", "Die Unterlagen kopieren."],
              answer: 0,
              explain:
                "İstenen tek şey saat 14'teki görüşmeyi devralmak. Evrakların yeri bilgi olarak veriliyor, çoğaltılması istenmiyor; Bremen'e gitmek de söz konusu değil.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-l3-15",
              no: 15,
              ref: "n5",
              text: "Wer zahlt nichts für den Kurs?",
              options: ["Alle Teilnehmer.", "Wer sich vor dem 15. September anmeldet.", "Wer eine Bestätigung mitbringt."],
              answer: 2,
              explain:
                "Ücretsizlik bir şarta bağlı: \"wenn der Betrieb den Kurs bestätigt\". 15 Eylül son başvuru tarihi, erken kayıt indirimi değil.",
            },
          ],
        },
        {
          id: "de-a2-04-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 suchen Arbeit oder einen Kurs. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişiler iş ya da kurs arıyor. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Aushilfe im Lager",
              body: "Montag bis Freitag, 6 bis 10 Uhr. 14 Euro pro Stunde. Keine Vorkenntnisse nötig, Deutsch ab A2. Ab sofort frei.",
            },
            {
              key: "b",
              label: "Praktikum im Kindergarten",
              body: "Drei Monate, unbezahlt. Für Personen, die später mit Kindern arbeiten wollen. Beginn im Februar.",
            },
            {
              key: "c",
              label: "Kurs: Rechnen für den Beruf",
              body: "Acht Abende, dienstags 18 bis 20 Uhr, 60 Euro. Für alle, die in der Berufsschule Probleme mit Mathematik haben.",
            },
            {
              key: "d",
              label: "Fahrer für Lieferwagen",
              body: "Vollzeit, Führerschein Klasse B nötig. 2400 Euro im Monat. Auch am Samstag, dafür ein freier Tag unter der Woche.",
            },
            {
              key: "e",
              label: "Kurs: Bewerbung schreiben",
              body: "Ein Samstag, 10 bis 16 Uhr, kostenlos. Wir üben Lebenslauf und Anschreiben. Anmeldung nötig.",
            },
            {
              key: "f",
              label: "Stelle im Büro, 20 Stunden",
              body: "Montag bis Donnerstag nachmittags. Deutsch ab B2 und gute Computerkenntnisse. 1300 Euro im Monat.",
            },
            {
              key: "g",
              label: "Ausbildung zur Pflegefachkraft",
              body: "Drei Jahre, mit Gehalt ab dem ersten Monat. Schulabschluss nötig. Start im September.",
            },
            {
              key: "h",
              label: "Ferienjob für Schüler",
              body: "Zwei Wochen im August, 12 Euro pro Stunde. Ab 16 Jahren. Arbeit im Garten und im Park.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-04-l4-16",
              no: 16,
              text: "Mira (17) sucht in den Sommerferien für kurze Zeit Arbeit.",
              answer: "h",
              explain:
                "(h) iki hafta, ağustos ve 16 yaş üstü — üç ölçüt de tutuyor. (a) da vasıfsız iş ama süresiz ve sabah altıda başlıyor; tatil işi değil.",
            },
            {
              kind: "match",
              id: "de-a2-04-l4-17",
              no: 17,
              text: "Herr Adeyemi hat einen Führerschein und möchte Vollzeit arbeiten.",
              answer: "d",
              explain:
                "(d) tam zamanlı ve B sınıfı ehliyet istiyor. (a) günde yalnız dört saat; (g) üç yıllık bir eğitim, iş değil.",
            },
            {
              kind: "match",
              id: "de-a2-04-l4-18",
              no: 18,
              text: "Frau Lin schreibt ihre erste Bewerbung auf Deutsch und braucht Hilfe.",
              answer: "e",
              explain:
                "(e) tam bu iş için: bir cumartesi, ücretsiz, özgeçmiş ve ön yazı çalışılıyor. (c) de kurs ama konusu matematik.",
            },
            {
              kind: "match",
              id: "de-a2-04-l4-19",
              no: 19,
              text: "Tobias ist in der Berufsschule und versteht Mathematik nicht.",
              answer: "c",
              explain:
                "(c) doğrudan meslek okulundaki matematik sorunu için kurulmuş ve sekiz akşam sürüyor. (e) de kurs ama başvuru yazmayı öğretiyor.",
            },
            {
              kind: "match",
              id: "de-a2-04-l4-20",
              no: 20,
              text: "Frau Berger will vormittags arbeiten und lernt erst seit einem Jahr Deutsch.",
              answer: "a",
              explain:
                "(a) sabah 6–10 arası ve Almanca için yalnız A2 istiyor. (f) de yarım zamanlı ama öğleden sonra ve B2 şart koşuyor.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 30,
      instruction: "Dieser Teil hat vier Aufgaben. Sie hören Gespräche und ein Interview. Lesen Sie zuerst die Aufgaben.",
      instructionTr: "Bu bölümde dört görev var. Konuşmalar ve bir söyleşi dinleyeceksin. Önce maddeleri oku.",
      tasks: [
        {
          id: "de-a2-04-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "k1",
              genre: "Gespräch im Büro",
              genreTr: "Büroda konuşma",
              situation: "İki çalışan toplantının gününü konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Kollege", text: "Wann ist die Besprechung?" },
                { speaker: "Kollegin", text: "Eigentlich am Mittwoch. Aber der Chef ist auf einer Messe." },
                { speaker: "Kollege", text: "Und jetzt?" },
                { speaker: "Kollegin", text: "Jetzt am Freitag um neun." },
              ],
            },
            {
              kind: "audio",
              id: "k2",
              genre: "Gespräch mit der Chefin",
              genreTr: "Şefle konuşma",
              situation: "Bir çalışan erken çıkmak için izin istiyor.",
              plays: 2,
              segments: [
                { speaker: "Mitarbeiter", text: "Kann ich am Freitag früher gehen? Ich habe einen Termin." },
                { speaker: "Chefin", text: "Um wie viel Uhr?" },
                { speaker: "Mitarbeiter", text: "Um drei." },
                { speaker: "Chefin", text: "Gut, aber bitte machen Sie die Stunden am Montag." },
              ],
            },
            {
              kind: "audio",
              id: "k3",
              genre: "Gespräch in der Werkstatt",
              genreTr: "Atölyede konuşma",
              situation: "Eğitmen çırakla aletleri konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ausbilder", text: "Hast du das Werkzeug zurückgelegt?" },
                { speaker: "Azubi", text: "Noch nicht. Ich reinige es gerade." },
                { speaker: "Ausbilder", text: "Gut. Ohne Reinigung geht es nicht in den Schrank." },
              ],
            },
            {
              kind: "audio",
              id: "k4",
              genre: "Telefongespräch mit der Personalabteilung",
              genreTr: "İnsan kaynaklarıyla telefon konuşması",
              situation: "Bir aday başvurusunun durumunu soruyor.",
              plays: 2,
              segments: [
                { speaker: "Bewerberin", text: "Ich habe mich im Mai beworben. Gibt es schon eine Antwort?" },
                { speaker: "Mitarbeiterin", text: "Die Gespräche sind erst nächste Woche. Wir melden uns danach." },
                { speaker: "Bewerberin", text: "Also noch keine Absage?" },
                { speaker: "Mitarbeiterin", text: "Nein, überhaupt nicht." },
              ],
            },
            {
              kind: "audio",
              id: "k5",
              genre: "Gespräch in der Kantine",
              genreTr: "Yemekhanede konuşma",
              situation: "İki çalışan bir kursu konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Nora", text: "Machst du den Computerkurs mit?" },
                { speaker: "Deniz", text: "Ich wollte. Aber er ist dienstags und da habe ich Berufsschule." },
                { speaker: "Nora", text: "Es gibt ihn auch am Donnerstag." },
                { speaker: "Deniz", text: "Wirklich? Dann melde ich mich an." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-04-h1-1",
              no: 1,
              ref: "k1",
              text: "Wann ist die Besprechung?",
              options: ["Am Mittwoch.", "Am Donnerstag.", "Am Freitag."],
              answer: 2,
              explain:
                "Toplantı çarşambadan cumaya alınıyor, çünkü patron fuarda. Perşembe hiç geçmiyor; \"Jetzt am Freitag um neun\" son karar.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h1-2",
              no: 2,
              ref: "k2",
              text: "Was sagt die Chefin?",
              options: ["Er darf gehen und holt die Zeit nach.", "Er darf am Freitag auf keinen Fall gehen.", "Er bekommt einen freien Tag."],
              answer: 0,
              explain:
                "Erken çıkmak serbest ama bir şartla: \"machen Sie die Stunden am Montag\". Yani izin değil, saatlerin telafisi.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h1-3",
              no: 3,
              ref: "k3",
              text: "Was macht der Azubi gerade?",
              options: ["Er sucht das Werkzeug.", "Er putzt das Werkzeug.", "Er arbeitet an einer Maschine."],
              answer: 1,
              explain:
                "\"Ich reinige es gerade\" — aleti temizliyor. Eğitmen de temizlenmeden dolaba konmayacağını söylüyor; arama ya da makine işi geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h1-4",
              no: 4,
              ref: "k4",
              text: "Was erfährt die Bewerberin?",
              options: ["Sie hat die Stelle bekommen.", "Sie hat eine Absage bekommen.", "Sie muss noch warten."],
              answer: 2,
              explain:
                "Görüşmeler henüz yapılmamış; kurum \"Wir melden uns danach\" diyor. Ret de yok, bu açıkça reddediliyor: \"überhaupt nicht\".",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h1-5",
              no: 5,
              ref: "k5",
              text: "Was macht Deniz?",
              options: ["Er macht den Kurs am Donnerstag.", "Er macht keinen Kurs.", "Er wechselt den Tag in der Berufsschule."],
              answer: 0,
              explain:
                "Salı günü meslek okulu olduğu için kurs olmuyordu; perşembe seçeneği çıkınca \"Dann melde ich mich an\" diyor. Okul günü değişmiyor.",
            },
          ],
        },
        {
          id: "de-a2-04-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen übernehmen eine Aufgabe für die Messe. Was macht wer? Ordnen Sie zu. Drei Aufgaben bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi fuar için bir iş üstleniyor. Kim ne yapıyor? Eşleştir. Üç iş artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Teambesprechung",
              genreTr: "Ekip toplantısı",
              situation: "Bir ekip fuar hazırlığını paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ott", text: "Also, die Messe ist in drei Wochen. Deniz, was machst du?" },
                { speaker: "Deniz", text: "Ich baue den Stand auf. Das habe ich letztes Jahr auch gemacht." },
                { speaker: "Frau Ott", text: "Gut. Lukas, schreibst du den Text für die Broschüre?" },
                { speaker: "Lukas", text: "Texte habe ich letztes Mal geschrieben. Diesmal fotografiere ich lieber die Produkte." },
                { speaker: "Frau Ott", text: "In Ordnung. Frau Bach, Sie kennen unsere Kunden am besten. Übernehmen Sie den Text?" },
                { speaker: "Frau Bach", text: "Ja, gern. Soll ich auch die Hotels buchen?" },
                { speaker: "Frau Ott", text: "Nein danke, die Hotels bucht Rita schon." },
                { speaker: "Rita", text: "Genau. Ich fahre dann auch den Transporter." },
                { speaker: "Frau Ott", text: "Den Transporter fahre ich, du hast keinen Führerschein dafür." },
                { speaker: "Rita", text: "Stimmt, das habe ich vergessen." },
              ],
            },
          ],
          options: [
            { key: "a", label: "den Stand aufbauen" },
            { key: "b", label: "Produkte fotografieren" },
            { key: "c", label: "den Text schreiben" },
            { key: "d", label: "Hotels buchen" },
            { key: "e", label: "den Transporter fahren" },
            { key: "f", label: "Kunden einladen" },
            { key: "g", label: "die Kasse machen" },
            { key: "h", label: "am Abend aufräumen" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-04-h2-6",
              no: 6,
              ref: "g1",
              text: "Deniz",
              answer: "a",
              explain: "\"Ich baue den Stand auf\" — geçen yıl da yaptığı iş, ve konuşma boyunca değişmiyor.",
            },
            {
              kind: "match",
              id: "de-a2-04-h2-7",
              no: 7,
              ref: "g1",
              text: "Lukas",
              answer: "b",
              explain:
                "Metin yazma işi ona teklif ediliyor ama geçen sefer yaptığını söyleyip reddediyor: \"Diesmal fotografiere ich lieber die Produkte\".",
            },
            {
              kind: "match",
              id: "de-a2-04-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Bach",
              answer: "c",
              explain:
                "Lukas reddedince metni Frau Bach üstleniyor. Otel işini de teklif ediyor ama Frau Ott \"Nein danke\" diyor.",
            },
            {
              kind: "match",
              id: "de-a2-04-h2-9",
              no: 9,
              ref: "g1",
              text: "Rita",
              answer: "d",
              explain:
                "Oteller Rita'da: \"die Hotels bucht Rita schon\". Aracı sürmeyi de teklif ediyor ama uygun ehliyeti olmadığı için o iş ona kalmıyor.",
            },
            {
              kind: "match",
              id: "de-a2-04-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Ott",
              answer: "e",
              explain:
                "Rita'nın ehliyeti olmadığı için aracı Frau Ott sürüyor: \"Den Transporter fahre ich\". Frau Ott ayrıca işleri dağıtan kişi.",
            },
          ],
        },
        {
          id: "de-a2-04-h3",
          no: 3,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören fünf kurze Gespräche. Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Beş kısa konuşma dinleyeceksin. Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "s1",
              genre: "Gespräch über Urlaub",
              genreTr: "İzin üzerine konuşma",
              situation: "Bir çalışan izin tarihi istiyor.",
              plays: 2,
              segments: [
                { speaker: "Kollege", text: "Ich möchte im August zwei Wochen frei." },
                { speaker: "Chefin", text: "August ist schwierig. Zwei Kollegen sind schon weg." },
                { speaker: "Kollege", text: "Und Ende Juli?" },
                { speaker: "Chefin", text: "Ende Juli geht." },
              ],
            },
            {
              kind: "audio",
              id: "s2",
              genre: "Bewerbungsgespräch",
              genreTr: "İş görüşmesi",
              situation: "Bir aday neden iş değiştirmek istediğini anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Held", text: "Sie haben drei Jahre im Verkauf gearbeitet. Warum wollen Sie wechseln?" },
                { speaker: "Bewerber", text: "Ich möchte etwas lernen. Bei uns gibt es keine Weiterbildung." },
                { speaker: "Frau Held", text: "Verstehe. Bei uns gibt es zwei Kurse im Jahr." },
              ],
            },
            {
              kind: "audio",
              id: "s3",
              genre: "Gespräch am ersten Arbeitstag",
              genreTr: "İlk iş gününde konuşma",
              situation: "Yeni çalışana kurallar anlatılıyor.",
              plays: 2,
              segments: [
                { speaker: "Kollegin", text: "Der Schlüssel für den Spind ist hier. Und das ist die Kaffeekasse." },
                { speaker: "Neuer", text: "Muss ich da jeden Monat etwas zahlen?" },
                { speaker: "Kollegin", text: "Nur wenn du Kaffee trinkst. Fünf Euro im Monat." },
              ],
            },
            {
              kind: "audio",
              id: "s4",
              genre: "Gespräch über die Prüfung",
              genreTr: "Sınav üzerine konuşma",
              situation: "Bir çırak sınav sonucunu paylaşıyor.",
              plays: 2,
              segments: [
                { speaker: "Azubi", text: "Ich habe die schriftliche Prüfung bestanden." },
                { speaker: "Ausbilder", text: "Sehr gut! Und die praktische?" },
                { speaker: "Azubi", text: "Die ist erst im Juni." },
              ],
            },
            {
              kind: "audio",
              id: "s5",
              genre: "Gespräch über Überstunden",
              genreTr: "Fazla mesai üzerine konuşma",
              situation: "Bir çalışan fazla saatlerin ne olduğunu soruyor.",
              plays: 2,
              segments: [
                { speaker: "Mitarbeiterin", text: "Ich arbeite oft zwei Stunden länger. Bekomme ich das bezahlt?" },
                { speaker: "Betriebsrat", text: "Nicht bezahlt, aber Sie sammeln die Stunden. Später nehmen Sie freie Tage." },
                { speaker: "Mitarbeiterin", text: "Das wusste ich nicht." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-04-h3-11",
              no: 11,
              ref: "s1",
              text: "Wann bekommt der Kollege frei?",
              options: ["Im ganzen August.", "Ende Juli.", "Gar nicht."],
              answer: 1,
              explain:
                "Ağustos dolu, çünkü iki kişi zaten izinde; temmuz sonu için \"Ende Juli geht\" deniyor. Yani izin veriliyor, yalnız tarihi değişiyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h3-12",
              no: 12,
              ref: "s2",
              text: "Warum will der Bewerber wechseln?",
              options: ["Er verdient zu wenig.", "Die Arbeitszeiten sind schlecht.", "Er möchte sich weiterbilden."],
              answer: 2,
              explain:
                "Gerekçe açık: \"Ich möchte etwas lernen\" ve mevcut yerde eğitim imkânı yok. Ücret ve çalışma saatleri hiç konuşulmuyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h3-13",
              no: 13,
              ref: "s3",
              text: "Was gilt für die Kaffeekasse?",
              options: ["Nur Kaffeetrinker zahlen.", "Alle im Büro zahlen fünf Euro.", "Sie ist kostenlos."],
              answer: 0,
              explain:
                "Kural şarta bağlı: \"Nur wenn du Kaffee trinkst\". Aidat ayda 5 euro ama herkes için değil, yalnız kahve içenler için.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h3-14",
              no: 14,
              ref: "s4",
              text: "Welche Prüfung kommt noch?",
              options: ["Die schriftliche.", "Die praktische.", "Beide."],
              answer: 1,
              explain:
                "Yazılıyı geçmiş; \"Die ist erst im Juni\" dediği sınav uygulamalı olan. Yani geriye tek sınav kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-04-h3-15",
              no: 15,
              ref: "s5",
              text: "Was passiert mit den Überstunden?",
              options: ["Sie werden am Monatsende bezahlt.", "Sie verfallen.", "Man bekommt später frei."],
              answer: 2,
              explain:
                "Fazla saatler ödenmiyor ama biriktiriliyor: \"Später nehmen Sie freie Tage\". Yani karşılığı para değil, izin.",
            },
          ],
        },
        {
          id: "de-a2-04-h4",
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
              situation: "Bir meslek danışmanı gençlere verdiği tavsiyeleri anlatıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Cetin, Sie beraten junge Leute bei der Berufswahl. Was fragen die meisten?" },
                { speaker: "Frau Cetin", text: "Fast alle fragen zuerst nach dem Gehalt. Das verstehe ich, aber es ist die falsche erste Frage." },
                { speaker: "Moderator", text: "Und was ist besser?" },
                { speaker: "Frau Cetin", text: "Besser ist die Frage: Was mache ich acht Stunden am Tag gern? Geld ist wichtig, aber nicht zuerst." },
                { speaker: "Moderator", text: "Viele wissen mit siebzehn noch nicht, was sie wollen." },
                { speaker: "Frau Cetin", text: "Das ist normal. Deshalb sage ich immer: Macht ein Praktikum. Zwei Wochen zeigen mehr als zehn Prospekte." },
                { speaker: "Moderator", text: "Wie viele Jugendliche wechseln die Ausbildung?" },
                { speaker: "Frau Cetin", text: "Etwa jeder Vierte hört im ersten Jahr auf. Das ist kein Drama, aber es kostet Zeit." },
                { speaker: "Moderator", text: "Und die Eltern?" },
                { speaker: "Frau Cetin", text: "Eltern helfen oft sehr. Manchmal wollen sie aber einen Beruf für ihr Kind, den sie selbst nie hatten." },
                { speaker: "Moderator", text: "Ihr wichtigster Rat?" },
                { speaker: "Frau Cetin", text: "Fragt Leute, die den Beruf wirklich machen. Nicht nur im Internet lesen." },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-04-h4-16",
              no: 16,
              ref: "i1",
              text: "Die meisten jungen Leute fragen zuerst nach dem Geld.",
              answer: true,
              explain:
                "\"Fast alle fragen zuerst nach dem Gehalt\" — Frau Cetin bunu anlıyor, ama ilk soru olarak yanlış buluyor.",
            },
            {
              kind: "bool",
              id: "de-a2-04-h4-17",
              no: 17,
              ref: "i1",
              text: "Frau Cetin findet Geld unwichtig.",
              answer: false,
              explain:
                "\"Geld ist wichtig, aber nicht zuerst\" diyor. Yani parayı önemsiz saymıyor, yalnız soruların sırasını eleştiriyor.",
            },
            {
              kind: "bool",
              id: "de-a2-04-h4-18",
              no: 18,
              ref: "i1",
              text: "Sie empfiehlt ein Praktikum.",
              answer: true,
              explain:
                "\"Macht ein Praktikum\" diyor ve gerekçelendiriyor: iki hafta, on broşürden fazlasını gösterir.",
            },
            {
              kind: "bool",
              id: "de-a2-04-h4-19",
              no: 19,
              ref: "i1",
              text: "Jeder Vierte hört im ersten Jahr auf.",
              answer: true,
              explain:
                "Sayı doğrudan veriliyor: \"Etwa jeder Vierte hört im ersten Jahr auf\", yani dörtte biri. Frau Cetin bunu felaket saymıyor ama zaman kaybı olduğunu söylüyor.",
            },
            {
              kind: "bool",
              id: "de-a2-04-h4-20",
              no: 20,
              ref: "i1",
              text: "Frau Cetin rät, sich nur im Internet zu informieren.",
              answer: false,
              explain:
                "Son tavsiye tam tersi: mesleği yapan insanlarla konuşmak. \"Nicht nur im Internet lesen\" diyor.",
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
          id: "de-a2-04-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Freundin Selma hat eine neue Stelle bekommen und hatte gestern ihren ersten Arbeitstag. Schreiben Sie ihr eine Nachricht (circa 40 Wörter). Schreiben Sie zu jedem Punkt ein bis zwei Sätze.",
          promptTr:
            "Arkadaşın Selma yeni bir iş buldu ve dün ilk iş günüydü. Ona bir ileti yaz (yaklaşık 40 kelime). Her maddeye bir-iki cümle yaz.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Gratulieren Sie.", tr: "Tebrik et." },
              { de: "Fragen Sie, wie der erste Tag war.", tr: "İlk günün nasıl geçtiğini sor." },
              { de: "Schlagen Sie ein Treffen vor.", tr: "Buluşmayı öner." },
            ],
            sample: `Liebe Selma,

herzlichen Glückwunsch zu deiner neuen Stelle! Ich freue mich sehr für dich.

Wie war denn dein erster Tag? Sind die Kollegen nett und hast du viel Neues gelernt?

Sollen wir uns am Samstag treffen? Dann kannst du mir alles in Ruhe erzählen.

Liebe Grüße
Pavel`,
            criteria: [
              "Üç içerik noktasının üçü de işlendi mi?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı?",
              "Hitap ve veda var mı? (Liebe … / Liebe Grüße)",
              "Tebrik kalıbı doğru mu? (Herzlichen Glückwunsch zu …)",
              "Yaklaşık 40 kelime var mı ve öneri soru biçiminde mi?",
            ],
          },
        },
        {
          id: "de-a2-04-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Sie möchten den Abendkurs \"Deutsch am Arbeitsplatz\" besuchen. Der Kurs ist für Beschäftigte kostenlos, wenn der Betrieb ihn bestätigt. Schreiben Sie an Ihre Chefin, Frau Sander (circa 40 Wörter).",
          promptTr:
            "\"Deutsch am Arbeitsplatz\" akşam kursuna gitmek istiyorsun. Kurs, işveren onaylarsa çalışanlar için ücretsiz. Şefin Frau Sander'a yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie den Kurs und die Zeiten.", tr: "Kursu ve saatlerini söyle." },
              { de: "Sagen Sie, warum der Kurs Ihnen bei der Arbeit hilft.", tr: "Kursun işine nasıl yarayacağını söyle." },
              { de: "Bitten Sie um die Bestätigung.", tr: "Onay belgesini rica et." },
            ],
            sample: `Sehr geehrte Frau Sander,

ich möchte gern den Kurs "Deutsch am Arbeitsplatz" besuchen. Er ist dienstags und donnerstags von 18 bis 20 Uhr, also nach der Arbeit.

Der Kurs hilft mir beim Telefonieren mit Kunden und beim Schreiben von E-Mails.

Können Sie den Kurs bitte für mich bestätigen?

Mit freundlichen Grüßen
Amina Sow`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Yarı resmî ileti olduğu için `Sie` ve resmî hitap kullanıldı mı? (Sehr geehrte Frau … / Mit freundlichen Grüßen)",
              "Kursun saatleri somut verildi mi ve mesaiyle çakışmadığı gösterildi mi?",
              "Fayda işe bağlandı mı? (müşteriyle telefon, e-posta yazmak gibi)",
              "Rica kibar bir kalıpla kuruldu mu? (Können Sie … bitte …)",
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
          id: "de-a2-04-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Arbeit. Stellen Sie zu jedem Stichwort eine Frage und antworten Sie selbst darauf: Beruf — Arbeitszeit — Kollegen — Pause — Weiterbildung.",
          promptTr:
            "Konu: İş. Her anahtar sözcük için bir soru sor ve kendin de cevapla: meslek — çalışma saati — iş arkadaşları — mola — kurs.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Arbeit. Ihr erstes Stichwort ist: Beruf. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi iş konusunu konuşuyoruz. İlk sözcüğün: meslek. Bana bir soru sor.",
            },
            { who: "you", hint: "«Beruf» sözcüğüyle bir soru kur.", expect: "Beruf sözcüğüyle doğru kurulmuş bir soru sormak", seconds: 30 },
            {
              who: "partner",
              de: "Ich arbeite als Krankenpfleger im Stadtkrankenhaus. Ihr nächstes Stichwort ist: Arbeitszeit.",
              tr: "Şehir hastanesinde hemşire olarak çalışıyorum. Sıradaki sözcüğün: çalışma saati.",
            },
            { who: "you", hint: "«Arbeitszeit» için bir soru kur.", expect: "Arbeitszeit sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Ich arbeite in Schichten, manchmal auch nachts. Und jetzt eine Frage an Sie: Verstehen Sie sich gut mit Ihren Kollegen?",
              tr: "Vardiyalı çalışıyorum, bazen geceleri de. Şimdi sana bir soru: İş arkadaşlarınla aran iyi mi?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısaca gerekçelendir.", expect: "`weil` ile gerekçelendirilmiş tam bir cevap vermek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Möchten Sie eine Weiterbildung machen?",
              tr: "Teşekkürler. Son soru: Bir kurs ya da eğitim almak ister misin?",
            },
            { who: "you", hint: "İsteğini söyle ve nedenini ekle.", expect: "bir isteği `möchte` ile ifade etmek ve gerekçelendirmek", seconds: 40 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "eigene Antworten geben", tr: "Kendi cevabını vermek" },
            ],
            sample:
              "Was sind Sie von Beruf? — Ich bin Verkäuferin. Wie lange arbeiten Sie am Tag? — Acht Stunden. Sind Ihre Kollegen nett? — Ja, weil wir uns gegenseitig helfen. Wann machen Sie Pause? — Um halb eins, dreißig Minuten. Machen Sie eine Weiterbildung? — Ja, ich möchte einen Computerkurs machen.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu ve cevaplar soruya uyuyor mu?",
              "`weil` ile en az bir gerekçe verildi mi?",
              "Saat ve süre ifadeleri doğru söylendi mi?",
            ],
          },
        },
        {
          id: "de-a2-04-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt: "Erzählen Sie: Was arbeiten oder lernen Sie und was gefällt Ihnen daran? Sprechen Sie etwa zwei Minuten.",
          promptTr: "Anlat: Ne iş yapıyorsun ya da ne öğreniyorsun, bunun nesini seviyorsun? Yaklaşık iki dakika konuş.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "die Tätigkeit beschreiben", tr: "Yaptığın işi tarif etmek" },
              { de: "einen Tagesablauf nennen", tr: "Bir günün akışını anlatmak" },
              { de: "sagen, was gefällt und was nicht", tr: "Neyi sevdiğini, neyi sevmediğini söylemek" },
            ],
            sample:
              "Ich arbeite seit zwei Jahren in einem Supermarkt. Ich fange um sieben an und räume zuerst die Regale ein. Ab neun stehe ich an der Kasse. Mir gefällt der Kontakt mit den Kunden, weil ich gern mit Menschen spreche. Nicht so gut finde ich die Arbeit am Samstag, weil meine Familie dann frei hat. Später möchte ich eine Ausbildung machen.",
            criteria: [
              "İş ya da eğitim somut anlatıldı mı? (nerede, ne zamandan beri, ne yapıyor)",
              "Günün akışı sırayla verildi mi? (zuerst, dann, ab neun)",
              "Hem olumlu hem olumsuz bir yön söylendi mi ve gerekçelendirildi mi?",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-04-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam etwas. Eine Kollegin verlässt die Firma. Sprechen Sie über: Wann verabschieden? — Wo? — Welches Geschenk? — Wer organisiert was?",
          promptTr:
            "Birlikte plan yap. Bir iş arkadaşınız firmadan ayrılıyor. Şunları konuş: Ne zaman uğurlanacak? — Nerede? — Hangi hediye? — Kim neyi organize edecek?",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen die Verabschiedung. Fangen wir mit dem Termin an: Wann sollen wir das machen?",
              tr: "Uğurlamayı birlikte planlıyoruz. Tarihle başlayalım: Ne zaman yapalım?",
            },
            { who: "you", hint: "Bir gün ve saat öner.", expect: "somut bir gün ve saat önermek", seconds: 30 },
            {
              who: "partner",
              de: "Das geht bei mir. Und wo? In der Kantine ist es sehr laut.",
              tr: "Bana uyar. Peki nerede? Yemekhane çok gürültülü.",
            },
            { who: "you", hint: "Bir yer öner ve kısaca gerekçelendir.", expect: "bir yer önermek ve gerekçe vermek", seconds: 35 },
            {
              who: "partner",
              de: "Gute Idee. Und das Geschenk? Ich habe keine Ahnung, was sie mag.",
              tr: "İyi fikir. Peki hediye? Neyi sevdiğini hiç bilmiyorum.",
            },
            { who: "you", hint: "Bir hediye öner ve nedenini söyle.", expect: "bir hediye önermek ve gerekçelendirmek", seconds: 35 },
            {
              who: "partner",
              de: "Einverstanden. Wer sammelt das Geld und wer sagt den Kollegen Bescheid?",
              tr: "Anlaştık. Parayı kim toplayacak, komşulara kim haber verecek?",
            },
            { who: "you", hint: "İşleri paylaş: birini üstlen, ötekini öner.", expect: "bir görevi üstlenmek ve ötekini karşı tarafa önermek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen", tr: "Öneri sunmak" },
              { de: "auf Vorschläge reagieren", tr: "Önerilere karşılık vermek" },
              { de: "Aufgaben verteilen", tr: "İşleri paylaşmak" },
            ],
            sample:
              "Sollen wir es am Donnerstag nach der Arbeit machen? — Gut. Wie wäre es im Besprechungsraum? Dort ist es ruhiger. Als Geschenk können wir einen Gutschein für das Kino kaufen, weil sie gern ins Kino geht. Ich sammle das Geld, und du schreibst eine E-Mail an alle.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneri kalıpları kullanıldı mı? (Sollen wir … / Wie wäre es …)",
              "Karşı tarafın itirazına gerçekten karşılık verildi mi? (yemekhane gürültülü)",
              "İşler açıkça paylaşıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
