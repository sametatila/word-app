import type { MockPaper } from "../types";

/**
 * A2 · Deneme 12 — "Tiere und Verantwortung".
 *
 * PLAN kâğıt 1–11 ile birebir aynı.
 *
 *   Lesen  30 dk · 20 madde   (5 ana fikir · 5 gazete · 5 blog · 5 eşleştirme)
 *   Hören  30 dk · 20 madde   (5 kısa · 5 eşleştirme · 5 mesaj · 5 R/F söyleşi)
 *   Schreiben 30 dk           iki kısa metin (~40 kelime)
 *   Sprechen  15 dk           bilgi sorma · anlatı · birlikte planlama
 *
 * KONU SEÇİMİ: hayvan sahiplenmek. İlk on bir kâğıt bu alana hiç girmedi ve
 * A2 için uygun: barınak formu, veteriner randevusu, tatilde bakım, komşuyla
 * köpek anlaşmazlığı — hepsi somut, hepsi günlük.
 *
 * DİKKAT EDİLEN: konu duygusal olduğu için metinler duygu üzerinden değil
 * karar üzerinden yürüyor. Blog metni hayvan almayı öven değil, almamayı
 * seçen birinin metni; barınak söyleşisi de geri getirilen hayvanları
 * konuşuyor.
 *
 * A2 dilbilgisi: Perfekt, kiplik fiilleri ve weil/dass/wenn yan cümleleri
 * her bölümde geçiyor. `dessen`, `deren` ve edilgen `worden` kullanılmadı.
 */
export const A2_12: MockPaper = {
  id: "de-a2-12",
  course: "de",
  level: "A2",
  no: 12,
  theme: "Tiere und Verantwortung",
  themeTr: "Hayvanlar ve sorumluluk",
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
          id: "de-a2-12-l1",
          no: 1,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die fünf Texte. Worum geht es? Wählen Sie die richtige Lösung a, b oder c.",
          promptTr: "Beş metni oku. Konu ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang im Hausflur",
              genreTr: "Apartman girişindeki duyuru",
              body: `Liebe Nachbarn,

seit zwei Wochen sitzt eine graue Katze im Hof. Sie hat kein Halsband.

Wir haben sie zum Tierarzt gebracht. Sie ist gesund, aber niemand vermisst sie.

Wenn Sie sie kennen oder nehmen möchten, klingeln Sie bitte bei uns in Wohnung 7.`,
              gloss: [
                { de: "das Halsband", tr: "tasma", en: "collar" },
                { de: "vermissen", tr: "kayıp olduğunu fark etmek", en: "to miss" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "E-Mail von der Tierarztpraxis",
              genreTr: "Veteriner kliniğinden e-posta",
              body: `Sehr geehrte Frau Ehlert,

Ihr Termin am Mittwoch um 15 Uhr ist bestätigt. Bitte bringen Sie den Impfpass mit.

Ihr Hund darf vorher normal fressen. Wir machen nur die Impfung, keine Operation.

Wenn Sie nicht kommen können, sagen Sie bitte einen Tag vorher ab.`,
              gloss: [
                { de: "der Impfpass", tr: "aşı karnesi", en: "vaccination record" },
                { de: "absagen", tr: "iptal etmek", en: "to cancel" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Nachricht an eine Freundin",
              genreTr: "Bir arkadaşa ileti",
              body: `Hallo Ines,

wir fahren vom 12. bis 19. August weg. Kannst du in der Zeit auf Mo aufpassen?

Du müsstest zweimal am Tag füttern und einmal sauber machen. Das Futter kaufe ich vorher.

Sag bitte ehrlich, wenn es zu viel ist. Dann frage ich im Tierheim nach einer Pension.`,
              gloss: [
                { de: "aufpassen auf", tr: "-e bakmak", en: "to look after" },
                { de: "füttern", tr: "beslemek", en: "to feed" },
              ],
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Das Tierheim Rehfeld sucht Menschen, die einmal am Tag mit einem Hund spazieren gehen.

Man braucht keine Erfahrung. Vor dem ersten Mal gibt es einen kurzen Kurs von zwei Stunden.

Die Arbeit ist unbezahlt. Wer Zeit hat, meldet sich im Büro.`,
              gloss: [
                { de: "das Tierheim", tr: "hayvan barınağı", en: "animal shelter" },
                { de: "die Erfahrung", tr: "deneyim", en: "experience" },
              ],
            },
            {
              kind: "text",
              id: "t5",
              genre: "Nachricht in der Hausgruppe",
              genreTr: "Apartman grubunda ileti",
              body: `Hallo zusammen,

mein Hund bellt am Vormittag, wenn ich arbeiten bin. Das tut mir leid.

Ich habe jetzt eine Betreuung gefunden. Ab Montag holt jemand ihn um neun ab.

Wenn es trotzdem laut ist, schreibt mir bitte direkt und nicht der Hausverwaltung.`,
              gloss: [
                { de: "bellen", tr: "havlamak", en: "to bark" },
                { de: "die Betreuung", tr: "bakım hizmeti", en: "care, minding" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-12-l1-1",
              no: 1,
              ref: "t1",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand hat seine Katze im Hof verloren.",
                "Jemand sucht einen Platz für eine Katze.",
                "Jemand warnt vor einer kranken Katze.",
              ],
              answer: 1,
              explain:
                "Kedi sağlıklı ve sahipsiz; duyurunun amacı son cümlede: \"Wenn Sie sie kennen oder nehmen möchten, klingeln Sie bitte bei uns\".",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l1-2",
              no: 2,
              ref: "t2",
              text: "Worum geht es in dem Text?",
              options: [
                "Die Praxis erklärt eine Operation.",
                "Die Praxis verschiebt einen Termin.",
                "Die Praxis bestätigt einen Termin.",
              ],
              answer: 2,
              explain:
                "İlk cümle onay veriyor: \"Ihr Termin am Mittwoch um 15 Uhr ist bestätigt\". Ameliyat açıkça dışlanıyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l1-3",
              no: 3,
              ref: "t3",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand bittet um Hilfe im Urlaub.",
                "Jemand sucht ein neues Zuhause für ein Tier.",
                "Jemand fragt nach dem richtigen Futter.",
              ],
              answer: 0,
              explain:
                "Tarihler ve rica birlikte geliyor: \"Kannst du in der Zeit auf Mo aufpassen?\" — yani tatil süresince bakım.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l1-4",
              no: 4,
              ref: "t4",
              text: "Worum geht es in dem Text?",
              options: [
                "Das Tierheim sucht neue Mitarbeiter mit Erfahrung.",
                "Das Tierheim gibt einen Kurs für Hundebesitzer.",
                "Das Tierheim sucht freiwillige Helfer.",
              ],
              answer: 2,
              explain:
                "Deneyim gerekmiyor ve iş ücretsiz: \"Die Arbeit ist unbezahlt.\" Kurs yalnız başlangıç için.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l1-5",
              no: 5,
              ref: "t5",
              text: "Worum geht es in dem Text?",
              options: [
                "Jemand beschwert sich über einen lauten Hund.",
                "Jemand hat eine Lösung für ein Problem gefunden.",
                "Jemand sucht eine neue Wohnung für sich und den Hund.",
              ],
              answer: 1,
              explain:
                "Sorun kabul ediliyor ve çözüm bildiriliyor: \"Ich habe jetzt eine Betreuung gefunden. Ab Montag holt jemand ihn um neun ab.\"",
            },
          ],
        },
        {
          id: "de-a2-12-l2",
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
              title: "Im Januar kommen die Tiere zurück",
              body: `Im Tierheim Rehfeld ist der Januar der schwerste Monat. Nicht weil im Winter mehr Tiere ausgesetzt werden, sondern weil viele Weihnachtsgeschenke zurückkommen.

"Im letzten Januar waren es elf Tiere", sagt die Leiterin Katrin Ehlert. "Neun davon haben die Menschen im Dezember bei uns geholt."

Das Tierheim hat deshalb die Regeln geändert. Zwischen dem 1. und dem 27. Dezember gibt es keine Tiere mehr.

"Am Anfang haben viele geschimpft", sagt Ehlert. "Manche haben gesagt, wir sind zu streng. Aber wir haben es trotzdem gemacht."

Nach der neuen Regel sind im Januar nur noch zwei Tiere zurückgekommen. Die Zahl der Vermittlungen im ganzen Jahr ist gleich geblieben.

Ehlert sagt aber auch, dass die Regel nicht alles löst. "Die meisten Tiere kommen nicht wegen Weihnachten zurück, sondern weil sich das Leben ändert. Ein Umzug, eine Krankheit, ein neuer Job."`,
              gloss: [
                { de: "aussetzen", tr: "(hayvanı) terk etmek", en: "to abandon" },
                { de: "die Leiterin", tr: "müdür", en: "director" },
                { de: "schimpfen", tr: "söylenmek, kızmak", en: "to complain angrily" },
                { de: "die Vermittlung", tr: "sahiplendirme", en: "placement, rehoming" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-12-l2-6",
              no: 6,
              ref: "r1",
              text: "Warum ist der Januar schwer?",
              options: [
                "Viele Geschenke kommen zurück.",
                "Im Winter werden mehr Tiere ausgesetzt.",
                "Es gibt weniger Platz im Tierheim.",
              ],
              answer: 0,
              explain:
                "Yazı iki gerekçeyi karşı karşıya koyuyor: \"Nicht weil im Winter mehr Tiere ausgesetzt werden, sondern weil viele Weihnachtsgeschenke zurückkommen.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l2-7",
              no: 7,
              ref: "r1",
              text: "Wie viele Tiere kamen im letzten Januar zurück?",
              options: ["Elf.", "Neun.", "Zwei."],
              answer: 0,
              explain:
                "\"Im letzten Januar waren es elf Tiere\" — dokuz, bunlardan aralıkta barınaktan alınanların sayısı.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l2-8",
              no: 8,
              ref: "r1",
              text: "Was hat das Tierheim geändert?",
              options: [
                "Es nimmt im Winter keine Tiere mehr an.",
                "Es gibt im Dezember keine Tiere ab.",
                "Es verlangt jetzt mehr Geld.",
              ],
              answer: 1,
              explain:
                "Kural ve tarihleri açık: \"Zwischen dem 1. und dem 27. Dezember gibt es keine Tiere mehr.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l2-9",
              no: 9,
              ref: "r1",
              text: "Was ist nach der neuen Regel passiert?",
              options: [
                "Im Januar kamen nur zwei Tiere zurück.",
                "Es gab im ganzen Jahr weniger Vermittlungen.",
                "Die Kritik hat weiter zugenommen.",
              ],
              answer: 0,
              explain:
                "Sayı on birden ikiye inmiş, ve yıl boyu sahiplendirme sayısı \"gleich geblieben\" — yani azalmamış.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l2-10",
              no: 10,
              ref: "r1",
              text: "Was sagt Frau Ehlert über die Regel?",
              options: [
                "Sie hilft gegen alle Rückgaben im Januar.",
                "Sie war zu streng für die Menschen.",
                "Sie löst nur einen Teil des Problems.",
              ],
              answer: 2,
              explain:
                "Asıl gerekçe başka: hayvanlar çoğunlukla \"weil sich das Leben ändert\" geri geliyor — taşınma, hastalık, yeni iş.",
            },
          ],
        },
        {
          id: "de-a2-12-l3",
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
              title: "Warum ich doch keinen Hund geholt habe",
              body: `Ich habe zwei Jahre lang über einen Hund nachgedacht. Ich habe Bücher gelesen und war dreimal im Tierheim.

Im Mai hatte ich einen Termin für die Vermittlung. Eine Woche vorher habe ich abgesagt.

Der Grund war keine Angst. Ich habe mir einfach eine Woche lang aufgeschrieben, wann ich zu Hause bin. Am Ende waren es an vier Tagen weniger als drei Stunden am Nachmittag.

Meine Freunde haben gesagt, ich soll es trotzdem machen. Ein Hund kann auch allein bleiben. Das stimmt, aber nicht neun Stunden am Tag.

Was mir geholfen hat, war ein Satz aus dem Tierheim: Ein Tier ist kein Projekt, sondern ein Alltag.

Ich gehe jetzt zweimal in der Woche mit Hunden aus dem Tierheim spazieren. Das ist nicht dasselbe, und ich sage nicht, dass es genug ist.

Aber ich habe kein Tier, das den ganzen Tag auf mich wartet. Damit kann ich gut leben.`,
              gloss: [
                { de: "nachdenken über", tr: "üzerine düşünmek", en: "to think about" },
                { de: "aufschreiben", tr: "not almak", en: "to write down" },
                { de: "der Alltag", tr: "gündelik hayat", en: "everyday life" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-12-l3-11",
              no: 11,
              ref: "r2",
              text: "Wie lange hat die Autorin überlegt?",
              options: ["Eine Woche.", "Zwei Jahre.", "Drei Monate."],
              answer: 1,
              explain:
                "İlk cümle süreyi veriyor: \"Ich habe zwei Jahre lang über einen Hund nachgedacht.\" Bir hafta, iptalin ne kadar önce olduğu.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l3-12",
              no: 12,
              ref: "r2",
              text: "Warum hat sie abgesagt?",
              options: [
                "Sie hatte Angst vor der Verantwortung.",
                "Das Tierheim hat ihr abgesagt.",
                "Sie war zu wenig zu Hause.",
              ],
              answer: 2,
              explain:
                "Korku açıkça eleniyor. Gerekçe kayıtta: dört gün \"weniger als drei Stunden am Nachmittag\" evdeymiş.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l3-13",
              no: 13,
              ref: "r2",
              text: "Was haben ihre Freunde gesagt?",
              options: [
                "Sie soll den Hund nehmen.",
                "Sie soll noch ein Jahr auf den Termin warten.",
                "Sie soll mehr Bücher über Hunde lesen.",
              ],
              answer: 0,
              explain:
                "Arkadaşların görüşü ve gerekçesi: \"Ein Hund kann auch allein bleiben.\" Yazar bunu kısmen kabul ediyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l3-14",
              no: 14,
              ref: "r2",
              text: "Welcher Satz hat ihr geholfen?",
              options: [
                "Ein Tier braucht vor allem Bewegung.",
                "Ein Tier gehört zum Alltag, nicht zum Plan.",
                "Ein Tier kostet mehr Geld als Zeit.",
              ],
              answer: 1,
              explain:
                "Barınaktan duyduğu cümle: \"Ein Tier ist kein Projekt, sondern ein Alltag.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-l3-15",
              no: 15,
              ref: "r2",
              text: "Wie bewertet sie ihre jetzige Lösung?",
              options: [
                "Als eindeutig bessere Lösung für alle.",
                "Als nicht ganz genug, aber passend.",
                "Als Ersatz für ein eigenes Tier.",
              ],
              answer: 1,
              explain:
                "İki yargıyı yan yana koyuyor: \"ich sage nicht, dass es genug ist\", ama \"Damit kann ich gut leben\".",
            },
          ],
        },
        {
          id: "de-a2-12-l4",
          no: 4,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 16 bis 20 brauchen etwas für ihr Tier. Lesen Sie die Anzeigen a bis h. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "16–20. kişilerin hayvanları için bir şeye ihtiyacı var. a–h ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Tierpension Waldrand",
              body: "Wir nehmen Hunde und Katzen in den Ferien. 18 Euro am Tag, Impfpass nötig. Anmeldung vier Wochen vorher.",
            },
            {
              key: "b",
              label: "Hundeschule Nord",
              body: "Kurs für junge Hunde, samstags 10 Uhr, acht Termine. 90 Euro. Auch für Menschen ohne Erfahrung.",
            },
            {
              key: "c",
              label: "Tierarzt Notdienst",
              body: "Abends, nachts und am Wochenende erreichbar. Bitte vorher anrufen. Anfahrt 70 Euro, danach nach Aufwand.",
            },
            {
              key: "d",
              label: "Katzen suchen ein Zuhause",
              body: "Im Tierheim warten zwölf Katzen. Besuch Mi und Sa 14 bis 17 Uhr. Schutzgebühr 60 Euro.",
            },
            {
              key: "e",
              label: "Gassi-Dienst Rehfeld",
              body: "Wir gehen mit Ihrem Hund, wenn Sie arbeiten. Einmal am Tag 12 Euro, feste Zeiten nach Absprache.",
            },
            {
              key: "f",
              label: "Futter im Abo",
              body: "Trockenfutter für Hunde und Katzen, alle vier Wochen an die Tür. 10 Prozent günstiger als im Laden.",
            },
            {
              key: "g",
              label: "Tierarztpraxis Ehlert",
              body: "Impfungen und Vorsorge, Termine Mo bis Fr. Neue Tiere nehmen wir gern auf, bitte Impfpass mitbringen.",
            },
            {
              key: "h",
              label: "Aquarium abzugeben",
              body: "200 Liter mit Pumpe und Licht, gut erhalten. 80 Euro. Abholung nur mit Auto möglich.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-12-l4-16",
              no: 16,
              text: "Frau Ehlert fährt im August eine Woche weg und findet niemanden für ihren Hund.",
              answer: "a",
              explain:
                "(a) tatil bakımı yapıyor: \"Wir nehmen Hunde und Katzen in den Ferien\" — dört hafta önceden kayıt gerekiyor.",
            },
            {
              kind: "match",
              id: "de-a2-12-l4-17",
              no: 17,
              text: "Herr Postel arbeitet ganztags. Sein Hund ist am Vormittag allein.",
              answer: "e",
              explain:
                "(e) tam bu durum için: \"Wir gehen mit Ihrem Hund, wenn Sie arbeiten.\" Saatler de anlaşmaya göre.",
            },
            {
              kind: "match",
              id: "de-a2-12-l4-18",
              no: 18,
              text: "Frau Weiher hat einen jungen Hund und weiß nicht, wie sie ihn erziehen soll.",
              answer: "b",
              explain:
                "(b) genç köpekler için ve deneyim istemiyor: \"Auch für Menschen ohne Erfahrung.\"",
            },
            {
              kind: "match",
              id: "de-a2-12-l4-19",
              no: 19,
              text: "Herr Dilger möchte ein Tier holen und mag am liebsten Katzen.",
              answer: "d",
              explain:
                "(d) sahiplendirme yapıyor: \"Im Tierheim warten zwölf Katzen\" — ziyaret günleri de veriliyor.",
            },
            {
              kind: "match",
              id: "de-a2-12-l4-20",
              no: 20,
              text: "Frau Ines Hillenbrand braucht am Sonntagabend schnell einen Arzt für ihre Katze.",
              answer: "c",
              explain:
                "(c) hafta sonu ve akşam çalışıyor: \"Abends, nachts und am Wochenende erreichbar.\"",
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
          id: "de-a2-12-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Durchsage im Tierheim",
              genreTr: "Barınakta anons",
              situation: "Ziyaret saati değişti.",
              plays: 2,
              segments: [
                {
                  text: "Ein Hinweis für unsere Besucher: Heute schließen wir schon um sechzehn Uhr. Normalerweise haben wir bis siebzehn Uhr offen. Am Samstag gelten wieder die normalen Zeiten.",
                },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch beim Tierarzt",
              genreTr: "Veterinerde konuşma",
              situation: "Bir sahip fiyatı soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Dilger", text: "Was kostet die Impfung?" },
                { speaker: "Tierärztin", text: "Fünfundvierzig Euro. Die Untersuchung ist dabei." },
                { speaker: "Herr Dilger", text: "Und wenn ich beide Katzen bringe?" },
                { speaker: "Tierärztin", text: "Dann sind es achtzig statt neunzig." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch im Hof",
              genreTr: "Avluda konuşma",
              situation: "İki komşu köpeği konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Hillenbrand", text: "Ihr Hund bellt am Vormittag ziemlich viel." },
                { speaker: "Herr Postel", text: "Ich weiß. Ab Montag holt ihn jemand um neun ab." },
                { speaker: "Frau Hillenbrand", text: "Gut, dann warte ich das ab." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Pansiyon soruluyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Ehlert", text: "Haben Sie im August noch einen Platz für einen Hund?" },
                { speaker: "Pension", text: "In der zweiten Augustwoche ja. Die erste ist voll." },
                { speaker: "Frau Ehlert", text: "Das passt. Ich fahre vom zwölften bis zum neunzehnten weg." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Durchsage im Tierheim",
              genreTr: "Barınakta anons",
              situation: "Gönüllü kursu duyurusu.",
              plays: 2,
              segments: [
                {
                  text: "Liebe Besucher, am Donnerstag um achtzehn Uhr machen wir den Kurs für neue Gassi-Gänger. Der Kurs dauert zwei Stunden. Ohne diesen Kurs können Sie leider nicht mitgehen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-12-h1-1",
              no: 1,
              ref: "a1",
              text: "Wann schließt das Tierheim heute?",
              options: ["Um 16 Uhr.", "Um 17 Uhr.", "Um 18 Uhr."],
              answer: 0,
              explain:
                "Anons iki saati karşılaştırıyor: bugün \"schon um sechzehn Uhr\", normalde on yediye kadar açık.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h1-2",
              no: 2,
              ref: "a2",
              text: "Was zahlt Herr Dilger für zwei Katzen?",
              options: ["45 Euro.", "90 Euro.", "80 Euro."],
              answer: 2,
              explain:
                "Tek aşı kırk beş, ikisi ayrı ayrı doksan eder — ama veteriner \"achtzig statt neunzig\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h1-3",
              no: 3,
              ref: "a3",
              text: "Was macht Herr Postel gegen das Problem?",
              options: [
                "Er bringt den Hund ins Tierheim.",
                "Er lässt den Hund abholen.",
                "Er arbeitet jetzt zu Hause.",
              ],
              answer: 1,
              explain:
                "Çözümü kendisi söylüyor: \"Ab Montag holt ihn jemand um neun ab.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h1-4",
              no: 4,
              ref: "a4",
              text: "Wann ist noch ein Platz frei?",
              options: [
                "In der ersten Augustwoche.",
                "Im ganzen August.",
                "In der zweiten Augustwoche.",
              ],
              answer: 2,
              explain:
                "Pansiyon ayrımı yapıyor: \"In der zweiten Augustwoche ja. Die erste ist voll.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h1-5",
              no: 5,
              ref: "a5",
              text: "Was gilt für neue Gassi-Gänger?",
              options: [
                "Der Kurs ist Pflicht.",
                "Der Kurs kostet Geld.",
                "Der Kurs dauert einen Tag.",
              ],
              answer: 0,
              explain:
                "Anons koşul koyuyor: \"Ohne diesen Kurs können Sie leider nicht mitgehen.\" Süre iki saat.",
            },
          ],
        },
        {
          id: "de-a2-12-h2",
          no: 2,
          format: "match",
          goal: "detail",
          prompt:
            "Sie hören ein Gespräch. Fünf Personen sagen, warum sie ins Tierheim gekommen sind. Wer möchte was? Ordnen Sie zu. Drei Angebote bleiben übrig. Sie hören den Text zweimal.",
          promptTr:
            "Bir konuşma dinleyeceksin. Beş kişi barınağa neden geldiğini söylüyor. Kim ne istiyor? Eşleştir. Üç imkân artıyor. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Gespräch am Empfang",
              genreTr: "Danışmada konuşma",
              situation: "Gelenler sırayla ne istediklerini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Mitarbeiterin", text: "Damit ich Sie richtig schicke: Weshalb sind Sie da? Frau Weiher?" },
                { speaker: "Frau Weiher", text: "Mein Hund ist noch jung und hört gar nicht. Ich brauche einen Kurs." },
                { speaker: "Mitarbeiterin", text: "Gut. Herr Dilger?" },
                { speaker: "Herr Dilger", text: "Ich möchte eine Katze holen. Zwei wären mir sogar lieber." },
                { speaker: "Mitarbeiterin", text: "Und Sie, Frau Ehlert?" },
                { speaker: "Frau Ehlert", text: "Ich fahre im August weg und suche einen Platz für meinen Hund." },
                { speaker: "Mitarbeiterin", text: "Herr Postel?" },
                { speaker: "Herr Postel", text: "Ich arbeite ganztags. Jemand müsste mittags mit meinem Hund raus." },
                { speaker: "Mitarbeiterin", text: "Und zum Schluss Frau Hillenbrand." },
                { speaker: "Frau Hillenbrand", text: "Ich habe Zeit und möchte helfen. Bezahlung brauche ich nicht." },
              ],
            },
          ],
          options: [
            { key: "a", label: "Hundeschule für junge Hunde" },
            { key: "b", label: "Katze aus dem Tierheim holen" },
            { key: "c", label: "Tierpension für die Ferien" },
            { key: "d", label: "Gassi-Dienst am Mittag" },
            { key: "e", label: "Ehrenamt im Tierheim" },
            { key: "f", label: "Termin beim Tierarzt" },
            { key: "g", label: "Futter im Abo bestellen" },
            { key: "h", label: "Aquarium abgeben" },
          ],
          items: [
            {
              kind: "match",
              id: "de-a2-12-h2-6",
              no: 6,
              ref: "g1",
              text: "Frau Weiher",
              answer: "a",
              explain:
                "\"Mein Hund ist noch jung und hört gar nicht. Ich brauche einen Kurs.\"",
            },
            {
              kind: "match",
              id: "de-a2-12-h2-7",
              no: 7,
              ref: "g1",
              text: "Herr Dilger",
              answer: "b",
              explain:
                "\"Ich möchte eine Katze holen. Zwei wären mir sogar lieber.\" — yani barınaktan sahiplenme istiyor, bakım ya da kurs değil.",
            },
            {
              kind: "match",
              id: "de-a2-12-h2-8",
              no: 8,
              ref: "g1",
              text: "Frau Ehlert",
              answer: "c",
              explain:
                "Tatil ve bakım birlikte: \"Ich fahre im August weg und suche einen Platz für meinen Hund.\"",
            },
            {
              kind: "match",
              id: "de-a2-12-h2-9",
              no: 9,
              ref: "g1",
              text: "Herr Postel",
              answer: "d",
              explain:
                "\"Ich arbeite ganztags. Jemand müsste mittags mit meinem Hund raus.\"",
            },
            {
              kind: "match",
              id: "de-a2-12-h2-10",
              no: 10,
              ref: "g1",
              text: "Frau Hillenbrand",
              answer: "e",
              explain:
                "Ücret istemiyor, yani gönüllü: \"Ich habe Zeit und möchte helfen. Bezahlung brauche ich nicht.\"",
            },
          ],
        },
        {
          id: "de-a2-12-h3",
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
              situation: "Veteriner randevusu değişiyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Ehlert, hier ist die Tierarztpraxis. Ihr Termin am Mittwoch muss leider auf Freitag. Die Uhrzeit bleibt gleich. Bitte sagen Sie kurz Bescheid, ob das geht.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Barınaktan haber.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Herr Dilger, hier ist das Tierheim. Die graue Katze ist schon weg. Wir haben aber zwei junge Katzen bekommen. Kommen Sie am Samstag noch einmal vorbei.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Bir arkadaş bakımı üstleniyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo, hier ist Ines. Ich kann im August auf Mo aufpassen. Nur am Wochenende nicht, da bin ich bei meiner Mutter. Vielleicht findest du dafür jemanden.",
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
                  text: "Guten Tag, Frau Weiher, hier ist die Hundeschule. Der Kurs im März ist voll. Im April haben wir wieder Plätze frei. Soll ich Sie dafür eintragen?",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Gönüllü kursu hatırlatması.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Frau Hillenbrand, hier ist das Tierheim. Der Kurs am Donnerstag findet statt. Bringen Sie bitte feste Schuhe mit. Regenjacke haben wir hier für alle.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a2-12-h3-11",
              no: 11,
              ref: "m1",
              text: "Was ändert sich am Termin?",
              options: ["Die Uhrzeit.", "Der Tag.", "Der Ort."],
              answer: 1,
              explain:
                "Mesaj ikisini ayırıyor: \"Ihr Termin am Mittwoch muss leider auf Freitag. Die Uhrzeit bleibt gleich.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h3-12",
              no: 12,
              ref: "m2",
              text: "Was soll Herr Dilger machen?",
              options: [
                "Auf die graue Katze warten.",
                "Eine andere Stelle anrufen.",
                "Am Samstag noch einmal kommen.",
              ],
              answer: 2,
              explain:
                "Gri kedi gitmiş ama iki genç kedi gelmiş: \"Kommen Sie am Samstag noch einmal vorbei.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h3-13",
              no: 13,
              ref: "m3",
              text: "Wann kann Ines nicht aufpassen?",
              options: ["Am Wochenende.", "Am Vormittag.", "In der ersten Woche."],
              answer: 0,
              explain:
                "Tek sınırlama bu: \"Nur am Wochenende nicht, da bin ich bei meiner Mutter.\"",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h3-14",
              no: 14,
              ref: "m4",
              text: "Was fragt die Hundeschule?",
              options: [
                "Ob Frau Weiher den Kurs bezahlt hat.",
                "Ob Frau Weiher im April kommen will.",
                "Ob Frau Weiher einen anderen Hund hat.",
              ],
              answer: 1,
              explain:
                "Mart dolu, nisanda yer var, ve okul bir onay istiyor: \"Soll ich Sie dafür eintragen?\" Yani sorulan şey nisan kaydı.",
            },
            {
              kind: "mcq",
              id: "de-a2-12-h3-15",
              no: 15,
              ref: "m5",
              text: "Was soll Frau Hillenbrand mitbringen?",
              options: ["Eine Regenjacke.", "Ein Halsband.", "Feste Schuhe."],
              answer: 2,
              explain:
                "\"Bringen Sie bitte feste Schuhe mit\" — yağmurluk barınakta var.",
            },
          ],
        },
        {
          id: "de-a2-12-h4",
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
              situation: "Barınak müdürü geri getirilen hayvanlar üzerine konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Moderator", text: "Frau Ehlert, warum kommen Tiere zurück?" },
                {
                  speaker: "Frau Ehlert",
                  text: "Die meisten Menschen denken an Weihnachten. Das gibt es, aber es ist nicht der Hauptgrund. Bei uns ist es fast immer eine Änderung im Leben: ein Umzug, eine Krankheit, ein neuer Job.",
                },
                { speaker: "Moderator", text: "Sie haben im Dezember trotzdem die Vermittlung gestoppt." },
                {
                  speaker: "Frau Ehlert",
                  text: "Ja, und das hat auch geholfen. Im Januar waren es danach nur noch zwei Tiere statt elf. Ich möchte das aber nicht größer machen, als es ist.",
                },
                { speaker: "Moderator", text: "Wie haben die Leute reagiert?" },
                {
                  speaker: "Frau Ehlert",
                  text: "Viele haben geschimpft. Manche haben gesagt, wir nehmen den Kindern die Freude. Wir haben es trotzdem gemacht, weil wir die Tiere danach wiedersehen.",
                },
                { speaker: "Moderator", text: "Was raten Sie Menschen, die ein Tier möchten?" },
                {
                  speaker: "Frau Ehlert",
                  text: "Schreiben Sie eine Woche lang auf, wann Sie zu Hause sind. Nicht wie viel Zeit Sie haben möchten, sondern wie viel Sie wirklich haben. Das ist unangenehm und hilft mehr als jedes Buch.",
                },
                { speaker: "Moderator", text: "Und wenn das Ergebnis Nein ist?" },
                {
                  speaker: "Frau Ehlert",
                  text: "Dann ist das auch eine gute Entscheidung. Wir haben Leute, die zweimal in der Woche mit unseren Hunden spazieren gehen. Die sind uns genauso wichtig.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a2-12-h4-16",
              no: 16,
              ref: "i1",
              text: "Weihnachten ist der wichtigste Grund für Rückgaben.",
              answer: false,
              explain:
                "Frau Ehlert tersini söylüyor: \"Das gibt es, aber es ist nicht der Hauptgrund.\" Asıl neden hayattaki değişiklikler.",
            },
            {
              kind: "bool",
              id: "de-a2-12-h4-17",
              no: 17,
              ref: "i1",
              text: "Die Regel im Dezember hat gewirkt.",
              answer: true,
              explain:
                "Etkiyi kendisi sayıyla veriyor: \"Im Januar waren es danach nur noch zwei Tiere statt elf.\" 11'den 2'ye.",
            },
            {
              kind: "bool",
              id: "de-a2-12-h4-18",
              no: 18,
              ref: "i1",
              text: "Alle Menschen haben die Regel gut gefunden.",
              answer: false,
              explain:
                "\"Viele haben geschimpft. Manche haben gesagt, wir nehmen den Kindern die Freude.\"",
            },
            {
              kind: "bool",
              id: "de-a2-12-h4-19",
              no: 19,
              ref: "i1",
              text: "Sie rät, die eigene Zeit eine Woche lang aufzuschreiben.",
              answer: true,
              explain:
                "Tavsiyesi tam bu ve gerekçesi de var: \"Das ist unangenehm und hilft mehr als jedes Buch.\"",
            },
            {
              kind: "bool",
              id: "de-a2-12-h4-20",
              no: 20,
              ref: "i1",
              text: "Ein Nein am Ende findet sie schlecht.",
              answer: false,
              explain:
                "Tersini söylüyor: \"Dann ist das auch eine gute Entscheidung\" — köpek gezdiren gönüllüler de aynı derecede önemliymiş.",
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
          id: "de-a2-12-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie fahren in den Urlaub und suchen jemanden für Ihre Katze. Schreiben Sie an Ihre Nachbarin Ines Hillenbrand (circa 40 Wörter). Sagen Sie, wann Sie weg sind, was zu tun ist, und fragen Sie, ob es geht.",
          promptTr:
            "Tatile gidiyorsun ve kedin için birini arıyorsun. Komşun Ines Hillenbrand'e yaz (yaklaşık 40 kelime). Ne zaman gideceğini, ne yapılması gerektiğini söyle ve olup olmayacağını sor.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Zeitraum nennen", tr: "Tarihleri söylemek" },
              { de: "sagen, was zu tun ist", tr: "Ne yapılacağını söylemek" },
              { de: "fragen, ob es geht", tr: "Olup olmayacağını sormak" },
            ],
            sample: `Hallo Ines,

wir fahren vom 12. bis 19. August weg. Kannst du in dieser Zeit auf unsere Katze aufpassen?

Du müsstest zweimal am Tag füttern und einmal das Klo sauber machen. Das Futter kaufe ich vorher.

Geht das bei dir? Sag bitte ehrlich Bescheid.

Viele Grüße
Katrin`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Tarihler açıkça verildi mi?",
              "Yapılacak işler somut mu (kaç kez, ne)?",
              "Soru gerçekten soru biçiminde mi kuruldu?",
              "Yaklaşık 40 kelime var mı ve komşuya yazıldığı için `du` kullanıldı mı?",
              "En az bir yan cümle (weil / dass / wenn) kuruldu mu?",
            ],
          },
        },
        {
          id: "de-a2-12-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Ein Freund möchte einen Hund holen. Schreiben Sie ihm (circa 40 Wörter). Sagen Sie, was er vorher überlegen soll, nennen Sie einen Vorteil und einen Nachteil.",
          promptTr:
            "Bir arkadaşın köpek almak istiyor. Ona yaz (yaklaşık 40 kelime). Önceden neyi düşünmesi gerektiğini söyle, bir iyi bir de zor yanını belirt.",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "einen Rat geben", tr: "Bir tavsiye vermek" },
              { de: "einen Vorteil nennen", tr: "Bir iyi yanını söylemek" },
              { de: "einen Nachteil nennen", tr: "Bir zor yanını söylemek" },
            ],
            sample: `Hallo Tarek,

schreib bitte eine Woche lang auf, wann du wirklich zu Hause bist. Das hat mir sehr geholfen.

Gut ist, dass du jeden Tag rauskommst und schnell Leute kennenlernst. Schwierig ist der Urlaub, weil du immer jemanden brauchst.

Überleg es dir in Ruhe.

Viele Grüße
Ines`,
            criteria: [
              "Üç içerik noktasının üçü de var mı?",
              "Tavsiye somut ve uygulanabilir mi?",
              "İyi ve zor yan gerçekten ayrı iki şey mi?",
              "Yaklaşık 40 kelime var mı ve arkadaşa yazıldığı için `du` kullanıldı mı?",
              "En az bir yan cümle (weil / dass / wenn) kuruldu mu?",
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
          id: "de-a2-12-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Stellen Sie Fragen zum Thema Haustier und antworten Sie. Stichwörter: Kosten — Zeit — Urlaub — Tierarzt.",
          promptTr:
            "Ev hayvanı konusunda soru sor ve cevapla. Anahtar sözcükler: masraf — zaman — tatil — veteriner.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen über das Thema Haustier. Ihr erstes Stichwort ist: Kosten. Stellen Sie mir bitte eine Frage.",
              tr: "Ev hayvanı konusunu konuşuyoruz. İlk sözcüğün: masraf. Bana bir soru sor.",
            },
            { who: "you", hint: "«Kosten» sözcüğüyle bir soru kur.", expect: "Kosten sözcüğüyle doğru bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Bei uns sind es ungefähr fünfzig Euro im Monat. Ihr nächstes Stichwort ist: Zeit.",
              tr: "Bizde ayda yaklaşık elli avro. Sıradaki sözcüğün: zaman.",
            },
            { who: "you", hint: "«Zeit» için bir soru kur.", expect: "Zeit sözcüğüyle bir soru kurmak", seconds: 30 },
            {
              who: "partner",
              de: "Etwa zwei Stunden am Tag. Jetzt eine Frage an Sie: Hatten Sie schon einmal ein Tier?",
              tr: "Günde iki saat kadar. Şimdi sana bir soru: Hiç hayvanın oldu mu?",
            },
            { who: "you", hint: "Soruyu cevapla ve kısa bir ayrıntı ekle.", expect: "soruya tam bir cümleyle cevap verip bir ayrıntı eklemek", seconds: 30 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was machen Sie mit dem Tier im Urlaub?",
              tr: "Teşekkürler. Son soru: Tatilde hayvanı ne yapıyorsun?",
            },
            { who: "you", hint: "Bir çözüm anlat.", expect: "bir çözümü kısaca anlatmak", seconds: 30 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Was kostet ein Hund im Monat? — Wie viel Zeit braucht ein Hund am Tag? — Ja, wir hatten eine Katze, aber sie ist letztes Jahr gestorben. — Im Urlaub bringen wir sie zu meiner Schwester, weil sie Tiere mag.",
            criteria: [
              "Dört anahtar sözcüğün her biri işlendi mi?",
              "Sorular doğru kuruldu mu?",
              "Cevaplar tam cümle mi ve bir ayrıntı içeriyor mu?",
              "Perfekt ya da kiplik fiili en az bir kez kullanıldı mı?",
            ],
          },
        },
        {
          id: "de-a2-12-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von Tieren in Ihrem Leben. Sprechen Sie zu den Stichwörtern: als Kind — heute — welches Tier — Arbeit damit — Kosten — Wunsch.",
          promptTr:
            "Hayatındaki hayvanlardan söz et. Şu anahtar sözcüklere göre konuş: çocukken — bugün — hangi hayvan — getirdiği iş — masraf — istek.",
          prepSeconds: 45,
          speakSeconds: 120,
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "früher und heute vergleichen", tr: "Eskiyi ve bugünü karşılaştırmak" },
              { de: "die Arbeit mit dem Tier beschreiben", tr: "Hayvanın getirdiği işi anlatmak" },
              { de: "einen Wunsch nennen", tr: "Bir istek söylemek" },
            ],
            sample:
              "Als Kind hatten wir einen Hund. Er hieß Bruno und war schon alt, als ich klein war. Heute habe ich kein Tier, weil ich den ganzen Tag arbeite. Meine Nachbarin hat eine Katze, und ich passe manchmal auf sie auf. Das ist wenig Arbeit: füttern und sauber machen. Eine Katze kostet ungefähr vierzig Euro im Monat. Später möchte ich gern wieder einen Hund haben, aber erst wenn ich weniger arbeite.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Çocukluk ile bugün arasındaki fark açıkça söylendi mi?",
              "Perfekt ya da Präteritum geçmiş için doğru kullanıldı mı?",
              "En az bir yan cümle (weil / dass / wenn) kuruldu mu?",
              "İki dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-a2-12-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie zusammen. Sie möchten mit Ihrer Nachbarin einen Tag im Tierheim helfen. Sprechen Sie über: Termin — Aufgaben — Kleidung — Anfahrt.",
          promptTr:
            "Birlikte plan yapın. Komşunla bir gün barınakta yardım etmek istiyorsun. Şunları konuşun: tarih — görevler — kıyafet — ulaşım.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Wir wollen im Tierheim helfen. Wann passt es Ihnen? Ich kann am Samstag.",
              tr: "Barınakta yardım edeceğiz. Sana ne zaman uyar? Ben cumartesi olabilirim.",
            },
            { who: "you", hint: "Öneriye karşılık ver ve kendi gününü söyle.", expect: "bir öneriye karşılık verip kendi önerisini söylemek", seconds: 30 },
            {
              who: "partner",
              de: "Gut. Und was machen wir dort? Mit den Hunden rausgehen oder im Haus helfen?",
              tr: "Peki. Orada ne yapacağız? Köpekleri gezdirmek mi, içeride yardım etmek mi?",
            },
            { who: "you", hint: "Bir görev seç ve kısa bir gerekçe söyle.", expect: "bir seçim yapıp gerekçelendirmek", seconds: 30 },
            {
              who: "partner",
              de: "Was ziehen wir an? Es soll an dem Tag regnen.",
              tr: "Ne giyeceğiz? O gün yağmur yağacakmış.",
            },
            { who: "you", hint: "Bir öneri yap ve neden olduğunu söyle.", expect: "gerekçeli bir öneri yapmak", seconds: 30 },
            {
              who: "partner",
              de: "Das Tierheim ist außerhalb. Wie kommen wir hin?",
              tr: "Barınak şehir dışında. Oraya nasıl gideriz?",
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
              "Samstag passt mir gut, aber erst ab elf, weil ich vorher einkaufen muss. Ich bin dafür, dass wir mit den Hunden rausgehen. Dafür gibt es einen Kurs, und den haben wir beide gemacht. Wenn es regnet, brauchen wir feste Schuhe. Eine Regenjacke haben sie im Tierheim für alle. Ich schlage vor, dass wir mit dem Bus fahren. Die Linie 14 hält direkt vor dem Tor, und wir müssen dann nicht parken.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi?",
              "Karşı tarafın önerisine gerçekten karşılık verildi mi?",
              "Sonunda bir karara varıldı mı?",
              "Öneri kalıpları (ich schlage vor, ich bin dafür) kullanıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
