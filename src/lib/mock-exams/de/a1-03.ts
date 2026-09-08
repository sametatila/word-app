import type { MockPaper } from "../types";

/**
 * A1 · Deneme 3 — "Gesundheit und Termine".
 *
 * PLAN kâğıt 1 ve 2 ile birebir aynı; değişen yalnız konu alanı. Aynı
 * seviyedeki kâğıtların puanı ancak aynı planda karşılaştırılabilir.
 *
 *   Lesen  25 dk · 15 madde
 *     Teil 1  5  Richtig/Falsch   e-posta + muayenehane ilanı (detail)
 *     Teil 2  5  iki şıklı seçme  ilan — hangisi bana uyar (orientation)
 *     Teil 3  5  Richtig/Falsch   levha/duyuru — kural okuma (instruction)
 *   Hören  20 dk · 15 madde
 *     Teil 1  6  üç şıklı seçme   kısa konuşma, iki kez (detail)
 *     Teil 2  4  Richtig/Falsch   anons, bir kez (instruction)
 *     Teil 3  5  üç şıklı seçme   telefon/kısa konuşma, iki kez (detail)
 *   Schreiben 20 dk  form doldurma (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk  gün anlatma · konu sorusu kurma · rica etme
 *
 * KONU SEÇİMİ: sağlık ve randevu, A1 öğrencisinin ülkeye yeni geldiğinde ilk
 * karşılaştığı işlerden biri. Saat, tarih, fiyat ve adres okumak bu alanda
 * kendiliğinden gerekiyor; A1'in sayı becerisi bu yüzden burada ölçülüyor.
 */
export const A1_03: MockPaper = {
  id: "de-a1-03",
  course: "de",
  level: "A1",
  no: 3,
  theme: "Gesundheit und Termine",
  themeTr: "Sağlık ve randevular",
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
          id: "de-a1-03-l1",
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
              title: "Von: nina.b@mail.de",
              body: `Hallo Tom,

morgen habe ich einen Termin beim Arzt. Er beginnt um 9.30 Uhr.

Danach fahre ich direkt ins Büro. Ich bin also erst um elf da.

Kannst du bitte die Post holen? Sie liegt unten im Kasten.

Am Freitag habe ich frei. Dann gehen wir zusammen schwimmen, okay?

Liebe Grüße
Nina`,
              gloss: [
                { de: "der Termin", tr: "randevu", en: "appointment" },
                { de: "der Kasten", tr: "posta kutusu", en: "letterbox" },
                { de: "frei haben", tr: "izinli olmak", en: "to be off work" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang in der Praxis",
              genreTr: "Muayenehanedeki duyuru",
              title: "PRAXIS DR. HOFFMANN",
              body: `Vom 3. bis 7. August ist unsere Praxis geschlossen.

In dieser Zeit hilft Ihnen Frau Dr. Weber in der
Marktstraße 12.

Rezepte gibt es bei uns wieder ab dem 8. August.`,
              gloss: [
                { de: "das Rezept", tr: "reçete", en: "prescription" },
                { de: "geschlossen", tr: "kapalı", en: "closed" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-03-l1-1",
              no: 1,
              ref: "t1",
              text: "Nina geht morgen zum Arzt.",
              answer: true,
              explain:
                "E-postada \"morgen habe ich einen Termin beim Arzt\" yazıyor ve saat 9.30 olarak veriliyor. Yani doktora gitmek yarın.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l1-2",
              no: 2,
              ref: "t1",
              text: "Nina ist um halb zehn im Büro.",
              answer: false,
              explain:
                "9.30 doktor randevusunun saati. Büroya gelişi için \"erst um elf\" deniyor, yani saat on bir. İki saati birbirine karıştırmamak gerekiyor.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l1-3",
              no: 3,
              ref: "t1",
              text: "Tom soll die Post holen.",
              answer: true,
              explain:
                "\"Kannst du bitte die Post holen?\" bir rica ve doğrudan Tom'a yazılmış. Postanın yeri de veriliyor: aşağıda, kutuda.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l1-4",
              no: 4,
              ref: "t2",
              text: "Am 5. August bekommen Sie hier ein Rezept.",
              answer: false,
              explain:
                "Muayenehane 3–7 Ağustos arası kapalı; reçeteler \"wieder ab dem 8. August\" veriliyor. 5 Ağustos tam bu kapalı aralığın içinde.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l1-5",
              no: 5,
              ref: "t2",
              text: "Frau Dr. Weber arbeitet in der Bahnhofstraße.",
              answer: false,
              explain:
                "Duyuruda adres \"in der Marktstraße 12\" olarak veriliyor. Bahnhofstraße adı metinde hiç geçmiyor.",
            },
          ],
        },
        {
          id: "de-a1-03-l2",
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
              id: "de-a1-03-l2-6",
              no: 6,
              text: "Sie haben Fieber und brauchen am Sonntag ein Medikament.",
              options: [
                "Apotheke am Ring\nNotdienst: Sonntag und Feiertag\nTag und Nacht geöffnet\nTelefon 0361 22 19 08",
                "Drogerie Sonne\nSeife, Creme und Zahnpasta günstig\nMontag bis Samstag von 9 bis 19 Uhr\nMedikamente bekommen Sie bei uns nicht",
              ],
              answer: 0,
              explain:
                "Pazar günü ilaç lazım. (a) `Notdienst: Sonntag und Feiertag` diyor ve gece gündüz açık. (b) kendi ilanında ilaç satmadığını yazıyor, üstelik pazar kapalı.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-l2-7",
              no: 7,
              text: "Sie möchten mit Ihrem Kind zum Arzt gehen. Das Kind ist zwei Jahre alt.",
              options: [
                "Praxis Dr. Lang\nZahnmedizin für die ganze Familie\nTermine online buchen\nMo–Do 8–18 Uhr",
                "Kinderarztpraxis Sonnenblume\nfür Kinder von 0 bis 14 Jahren\nSprechstunde Mo–Fr 8–12 Uhr\nTermin bitte telefonisch",
              ],
              answer: 1,
              explain:
                "İki yaşındaki bir çocuk için çocuk hekimi gerekiyor. (b) `für Kinder von 0 bis 14 Jahren` diyor. (a) diş hekimliği yapıyor; aile hekimliği değil, branşı uymuyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-l2-8",
              no: 8,
              text: "Sie arbeiten bis 16 Uhr und suchen einen Arzt mit Sprechstunde am Abend.",
              options: [
                "Hausarztpraxis Winter\nSprechstunde Mo, Mi, Fr 17–20 Uhr\nauch ohne Termin\nBahnhofplatz 4",
                "Hausarztpraxis Bergmann\nSprechstunde täglich 7.30–12 Uhr\nTermine nur nach Vereinbarung\nam Stadtpark 9",
              ],
              answer: 0,
              explain:
                "Mesai 16'da bitiyor, o yüzden akşam saati aranıyor. (a) `17–20 Uhr` diyor. (b) yalnız sabah açık (7.30–12), yani iş çıkışı ulaşılamıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-l2-9",
              no: 9,
              text: "Sie brauchen eine neue Brille und möchten vorher die Augen testen lassen.",
              options: [
                "Optik Meier\nBrillen ab 39 Euro\nSehtest kostenlos\nMo–Sa 10–18 Uhr",
                "Foto Meier\nPassbilder in fünf Minuten\nauch für Ausweis und Visum\nMo–Fr 9–17 Uhr",
              ],
              answer: 0,
              explain:
                "Hem gözlük hem göz testi isteniyor. (a) `Sehtest kostenlos` diyor ve gözlük satıyor. (b) fotoğrafçı; vesikalık çekiyor, göz ölçmüyor. İki ilanın soyadı aynı, bu yüzden yalnız isme bakmak yetmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-l2-10",
              no: 10,
              text: "Sie möchten am Wochenende schwimmen gehen.",
              options: [
                "Stadtbad Nord\nRenovierung bis Ende Mai\nWir öffnen wieder im Juni\nDanke für Ihr Verständnis",
                "Hallenbad Süd\nSa und So 8–20 Uhr geöffnet\nSchwimmkurse für Erwachsene\nEintritt 4,50 Euro",
              ],
              answer: 1,
              explain:
                "Hafta sonu yüzme aranıyor. (b) `Sa und So 8–20 Uhr geöffnet` diyor. (a) mayıs sonuna kadar tadilatta, yani hiçbir gün açık değil.",
            },
          ],
        },
        {
          id: "de-a1-03-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild in der Praxis",
              genreTr: "Muayenehanedeki levha",
              body: `ANMELDUNG

Bitte melden Sie sich zuerst hier an.

Ihre Karte brauchen wir bei jedem Besuch.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Aushang an der Apotheke",
              genreTr: "Eczane kapısındaki duyuru",
              body: `NOTDIENST

Heute Nacht hat die Löwen-Apotheke Dienst.

Adresse: Kirchweg 3

Bitte klingeln Sie am Nachtfenster.`,
            },
            {
              kind: "text",
              id: "s3",
              genre: "Schild im Krankenhaus",
              genreTr: "Hastanedeki levha",
              body: `BESUCHSZEIT

täglich 14 bis 18 Uhr

Bitte höchstens zwei Personen pro Zimmer.

Blumen sind auf Station 3 nicht erlaubt.`,
            },
            {
              kind: "text",
              id: "s4",
              genre: "Zettel im Wartezimmer",
              genreTr: "Bekleme odasındaki not",
              body: `Liebe Patienten,

heute dauert es leider länger.

Wer nur ein Rezept braucht, geht bitte
direkt zur Anmeldung.`,
            },
            {
              kind: "text",
              id: "s5",
              genre: "Schild am Eingang",
              genreTr: "Girişteki levha",
              body: `Bitte hier warten.

Sie kommen dran, wenn Ihr Name auf dem
Bildschirm steht.

Handys bitte leise stellen.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-03-l3-11",
              no: 11,
              ref: "s1",
              text: "Sie gehen zuerst ins Wartezimmer.",
              answer: false,
              explain:
                "Levha \"Bitte melden Sie sich zuerst hier an\" diyor: önce kayıt masası. Bekleme odasına geçmek kayıttan sonra gelir.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l3-12",
              no: 12,
              ref: "s2",
              text: "Sie bekommen heute Nacht im Kirchweg ein Medikament.",
              answer: true,
              explain:
                "Bu gece nöbetçi olan eczanenin adresi \"Kirchweg 3\" olarak veriliyor. Gece penceresinden zil çalınması isteniyor, yani kapalı değil.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l3-13",
              no: 13,
              ref: "s3",
              text: "Sie dürfen um 19 Uhr zu Besuch kommen.",
              answer: false,
              explain:
                "Ziyaret saati \"täglich 14 bis 18 Uhr\". Saat 19, bu aralığın bir saat dışında kalıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l3-14",
              no: 14,
              ref: "s4",
              text: "Wer nur ein Rezept holt, wartet nicht im Zimmer.",
              answer: true,
              explain:
                "Not, yalnız reçete alacaklara \"geht bitte direkt zur Anmeldung\" diyor. Yani sıraya girmeden kayda gidiyorlar.",
            },
            {
              kind: "bool",
              id: "de-a1-03-l3-15",
              no: 15,
              ref: "s5",
              text: "Man ruft Ihren Namen laut.",
              answer: false,
              explain:
                "Levhaya göre sıra ekranda görünüyor: \"wenn Ihr Name auf dem Bildschirm steht\". Telefonların sessize alınması isteniyor, çünkü isim seslenerek çağrılmıyor.",
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
          id: "de-a1-03-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir adam randevu almak için arıyor.",
              plays: 2,
              segments: [
                { speaker: "Praxis", text: "Praxis Dr. Sommer, guten Tag." },
                { speaker: "Herr Ott", text: "Guten Tag, ich brauche einen Termin. Geht es heute noch?" },
                { speaker: "Praxis", text: "Heute ist alles voll. Morgen um acht Uhr dreißig habe ich etwas frei." },
                { speaker: "Herr Ott", text: "Morgen früh ist gut, danke." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Gespräch in der Apotheke",
              genreTr: "Eczanede konuşma",
              situation: "Bir müşteri ilacı nasıl alacağını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Apothekerin", text: "Nehmen Sie die Tabletten dreimal am Tag." },
                { speaker: "Kunde", text: "Vor dem Essen oder danach?" },
                { speaker: "Apothekerin", text: "Immer nach dem Essen, mit viel Wasser." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch am Empfang",
              genreTr: "Hastane danışmasında konuşma",
              situation: "Bir ziyaretçi hasta odasını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Besucher", text: "Ich suche Frau Kaya. Sie liegt seit gestern hier." },
                { speaker: "Pflegerin", text: "Frau Kaya ist auf Station 2, im dritten Stock." },
                { speaker: "Besucher", text: "Danke. Nehme ich den Aufzug?" },
                { speaker: "Pflegerin", text: "Ja, der ist gleich links." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın randevusunu iptal ediyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Bilir", text: "Guten Tag, ich kann heute leider nicht kommen. Mein Sohn ist krank." },
                { speaker: "Praxis", text: "Kein Problem. Wollen Sie einen neuen Termin?" },
                { speaker: "Frau Bilir", text: "Ja, bitte nächste Woche, aber nicht am Montag." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Gespräch beim Zahnarzt",
              genreTr: "Diş hekiminde konuşma",
              situation: "Diş hekimi bugün ne yapacağını söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Zahnarzt", text: "Tut das hier weh?" },
                { speaker: "Patientin", text: "Nein. Aber hier oben rechts tut es sehr weh." },
                { speaker: "Zahnarzt", text: "Gut. Dann machen wir heute nur ein Foto." },
                { speaker: "Zahnarzt", text: "Behandeln können wir nächste Woche." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Telefongespräch mit dem Büro",
              genreTr: "Büroyla telefon konuşması",
              situation: "Bir çalışan hastalığını haber veriyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Wu", text: "Guten Morgen, Frau Peters. Ich habe Fieber und bleibe heute zu Hause." },
                { speaker: "Frau Peters", text: "Gute Besserung! Schicken Sie uns bitte bis Mittwoch das Attest." },
                { speaker: "Herr Wu", text: "Mache ich. Ich gehe morgen zum Arzt." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-03-h1-1",
              no: 1,
              ref: "a1",
              text: "Wann bekommt Herr Ott einen Termin?",
              options: ["Heute Nachmittag.", "Morgen früh.", "Übermorgen."],
              answer: 1,
              explain:
                "Bugüne yer yok; sekiz buçuk için verilen gün yarın. \"Übermorgen\" kayıtta hiç geçmiyor, yalnız benzer bir zaman sözcüğü olduğu için çeldirici.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h1-2",
              no: 2,
              ref: "a2",
              text: "Wann nimmt der Kunde die Tabletten?",
              options: ["Nach dem Essen.", "Vor dem Essen.", "Vor dem Schlafen."],
              answer: 0,
              explain:
                "Müşteri \"vor dem Essen oder danach\" diye soruyor; eczacı yemekten sonrasını söylüyor. Günde üç kez bilgisi ayrı bir ayrıntı ve soruya cevap değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h1-3",
              no: 3,
              ref: "a3",
              text: "Wo liegt Frau Kaya?",
              options: ["Im Erdgeschoss.", "Im zweiten Stock.", "Im dritten Stock."],
              answer: 2,
              explain:
                "Kayıtta iki sayı geçiyor: 2 servis numarası, 3 ise kat. Soru katı sorduğu için doğru cevap üçüncü kat.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h1-4",
              no: 4,
              ref: "a4",
              text: "Warum sagt Frau Bilir den Termin ab?",
              options: ["Sie ist krank.", "Ihr Sohn ist krank.", "Sie hat keine Zeit."],
              answer: 1,
              explain:
                "Hasta olan kendisi değil, oğlu: \"Mein Sohn ist krank\". Zaman sorunu hiç söylenmiyor; yeni randevu istemesi de bunu gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h1-5",
              no: 5,
              ref: "a5",
              text: "Was macht der Zahnarzt heute?",
              options: ["Er macht ein Foto.", "Er behandelt den Zahn.", "Er gibt Tabletten."],
              answer: 0,
              explain:
                "Bugün yapılan tek şey bir röntgen: \"heute nur ein Foto\". Tedavi gelecek haftaya bırakılıyor, ilaçtan ise hiç söz edilmiyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h1-6",
              no: 6,
              ref: "a6",
              text: "Was soll Herr Wu bis Mittwoch schicken?",
              options: ["Eine E-Mail.", "Ein Rezept.", "Ein Attest."],
              answer: 2,
              explain:
                "Frau Peters çarşambaya kadar rapor istiyor: \"bis Mittwoch das Attest\". Reçete ilaç için verilir ve bu kayıtta geçmiyor.",
            },
          ],
        },
        {
          id: "de-a1-03-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Krankenhaus",
              genreTr: "Hastane anonsu",
              situation: "Ziyaret saatinin bitişi duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Besucherinnen und Besucher, die Besuchszeit endet in zehn Minuten. Bitte verlassen Sie jetzt die Zimmer. Morgen sind wir ab vierzehn Uhr wieder für Sie da.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Wartezimmer",
              genreTr: "Bekleme odasında anons",
              situation: "Randevuların geciktiği duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Eine Information für alle Patienten: Dr. Frank hat gerade einen Notfall. Alle Termine beginnen heute etwa dreißig Minuten später. Wir danken für Ihre Geduld.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage in der Apotheke",
              genreTr: "Eczanede anons",
              situation: "Kapanış saati duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Kundinnen und Kunden, wir schließen heute schon um achtzehn Uhr. Danach hat die Löwen-Apotheke im Kirchweg Notdienst.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Schwimmbad",
              genreTr: "Yüzme havuzunda anons",
              situation: "Havuz ve saunanın kapanış saatleri duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, das Becken schließt um neunzehn Uhr dreißig. Die Sauna bleibt bis zwanzig Uhr offen. Bitte duschen Sie vor dem Schwimmen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-03-h2-7",
              no: 7,
              ref: "d1",
              text: "Die Besuchszeit ist gleich zu Ende.",
              answer: true,
              explain:
                "Anons ziyaretin on dakika sonra biteceğini söylüyor ve odaların hemen boşaltılmasını istiyor. On dakika \"gleich\" sayılır.",
            },
            {
              kind: "bool",
              id: "de-a1-03-h2-8",
              no: 8,
              ref: "d2",
              text: "Die Termine beginnen früher als geplant.",
              answer: false,
              explain:
                "Anonsta \"Alle Termine beginnen heute etwa dreißig Minuten später\" deniyor: randevular geriye kayıyor, öne değil. Sebebi de söyleniyor, doktorun acil bir hastası var.",
            },
            {
              kind: "bool",
              id: "de-a1-03-h2-9",
              no: 9,
              ref: "d3",
              text: "Die Apotheke schließt heute später als sonst.",
              answer: false,
              explain:
                "Anonsta \"schon um achtzehn Uhr\" deniyor; `schon` erken kapanışı gösterir. Sonrası için nöbetçi eczane adresi veriliyor.",
            },
            {
              kind: "bool",
              id: "de-a1-03-h2-10",
              no: 10,
              ref: "d4",
              text: "Die Sauna ist länger offen als das Becken.",
              answer: true,
              explain:
                "Havuz 19.30'da, sauna 20.00'de kapanıyor. İki saati karşılaştırmak gerekiyor: sauna yarım saat daha uzun açık.",
            },
          ],
        },
        {
          id: "de-a1-03-h3",
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
              situation: "Muayenehane bir mesaj bırakıyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist die Praxis Dr. Sommer. Ihr Termin am Dienstag fällt leider aus. Bitte rufen Sie uns an: null drei drei eins, vier zwei, sieben sieben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Gespräch am Telefon",
              genreTr: "Telefon konuşması",
              situation: "İki arkadaş yüzmeye gitmeyi konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Ayla", text: "Kommst du mit ins Schwimmbad?" },
                { speaker: "Jonas", text: "Heute nicht, ich habe Halsschmerzen." },
                { speaker: "Ayla", text: "Schade. Und am Samstag?" },
                { speaker: "Jonas", text: "Samstag gern, da geht es mir sicher besser." },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Gespräch beim Arzt",
              genreTr: "Doktorda konuşma",
              situation: "Doktor hastaya ne yapması gerektiğini söylüyor.",
              plays: 2,
              segments: [
                { speaker: "Ärztin", text: "Sie brauchen Ruhe. Bleiben Sie drei Tage zu Hause." },
                { speaker: "Patient", text: "Und Sport? Am Donnerstag ist mein Kurs." },
                { speaker: "Ärztin", text: "Kein Sport diese Woche. Nächste Woche geht es wieder." },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Gespräch in der Apotheke",
              genreTr: "Eczanede konuşma",
              situation: "Bir müşteri kremin fiyatını soruyor.",
              plays: 2,
              segments: [
                { speaker: "Kundin", text: "Was kostet die Creme?" },
                { speaker: "Apotheker", text: "Acht Euro neunzig. Mit Rezept zahlen Sie nur fünf Euro." },
                { speaker: "Kundin", text: "Ich habe kein Rezept dabei." },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Gespräch zu Hause",
              genreTr: "Evde konuşma",
              situation: "Bir anne çocuğunun durumunu soruyor.",
              plays: 2,
              segments: [
                { speaker: "Mutter", text: "Wie geht es dir heute?" },
                { speaker: "Kind", text: "Besser. Der Kopf tut nicht mehr weh." },
                { speaker: "Mutter", text: "Gut. Dann gehst du morgen wieder in die Schule." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-03-h3-11",
              no: 11,
              ref: "m1",
              text: "Was sagt die Nachricht?",
              options: ["Der Termin fällt aus.", "Der Termin ist eine Stunde später.", "Die Praxis hat eine neue Nummer."],
              answer: 0,
              explain:
                "Mesajda \"Ihr Termin am Dienstag fällt leider aus\" deniyor: randevu iptal. Yeni bir saat verilmiyor, yalnız geri aranması isteniyor; okunan numara muayenehanenin mevcut numarası.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h3-12",
              no: 12,
              ref: "m2",
              text: "Wann gehen die beiden schwimmen?",
              options: ["Heute Nachmittag.", "Am Samstag.", "Gar nicht."],
              answer: 1,
              explain:
                "Bugün olmuyor, çünkü Jonas'ın boğazı ağrıyor. Cumartesi için \"Samstag gern\" diyor, yani plan iptal değil, erteleniyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h3-13",
              no: 13,
              ref: "m3",
              text: "Wann darf der Patient wieder Sport machen?",
              options: ["Schon diese Woche.", "Am Donnerstag.", "Nächste Woche."],
              answer: 2,
              explain:
                "Doktor bu hafta spora izin vermiyor, gelecek hafta için \"geht es wieder\" diyor. Perşembedeki kurs bu haftaya düştüğü için o da olmuyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h3-14",
              no: 14,
              ref: "m4",
              text: "Wie viel zahlt die Kundin?",
              options: ["5,00 Euro.", "13,90 Euro.", "8,90 Euro."],
              answer: 2,
              explain:
                "Reçeteli fiyat 5 euro, reçetesiz 8,90 euro. Müşteri reçetesini yanında getirmediği için yüksek fiyatı ödüyor. 13,90 iki fiyatın toplamı ve yalnız tuzak.",
            },
            {
              kind: "mcq",
              id: "de-a1-03-h3-15",
              no: 15,
              ref: "m5",
              text: "Wie geht es dem Kind?",
              options: ["Es ist noch krank.", "Es geht ihm besser.", "Es hat hohes Fieber."],
              answer: 1,
              explain:
                "Çocuk \"Besser\" diyor ve baş ağrısının geçtiğini söylüyor. Annenin yarın okul demesi de iyileşmeyi doğruluyor; ateşten hiç söz edilmiyor.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 20,
      instruction: "Dieser Teil hat zwei Aufgaben: ein Formular ausfüllen und eine kurze E-Mail schreiben.",
      instructionTr: "Bu bölümde iki görev var: bir form doldurmak ve kısa bir e-posta yazmak.",
      tasks: [
        {
          id: "de-a1-03-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Nachbarin, Frau Sofia Marek, hat sich am Arm verletzt. Sie helfen ihr bei der Anmeldung. Frau Marek ist am 4. März 1979 geboren. Sie wohnt in der Gartenstraße 21 in 39104 Magdeburg. Sie ist bei der Nordkasse versichert und kommt heute ohne Termin. Füllen Sie das Formular aus.",
          promptTr:
            "Komşun Sofia Marek kolunu incitti. Kayıt işleminde ona yardım ediyorsun. Frau Marek 4 Mart 1979 doğumlu. Gartenstraße 21, 39104 Magdeburg adresinde oturuyor. Nordkasse'de sigortalı ve bugün randevusuz geldi. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung — Praxis für Chirurgie",
              body: `Familienname, Vorname:    Marek, Sofia
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Magdeburg
Krankenkasse:             {{4}}
Termin:                   {{5}}
Unterschrift:             S. Marek`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-03-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["04.03.1979", "4.3.1979", "4. März 1979", "04.03.79", "4.3.79"],
              explain:
                "Yönergede \"am 4. März 1979 geboren\" yazıyor. Almanca formlarda tarih gün.ay.yıl sırasıyla girilir: 04.03.1979.",
            },
            {
              kind: "gap",
              id: "de-a1-03-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Gartenstraße 21", "Gartenstrasse 21", "Gartenstr. 21"],
              explain:
                "Adres yönergede tam veriliyor: Gartenstraße 21. Sokak adı ve kapı numarası aynı satıra yazılır; `-str.` kısaltması da doğrudur.",
            },
            {
              kind: "gap",
              id: "de-a1-03-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["39104"],
              explain:
                "Yönergedeki adres \"in 39104 Magdeburg\" biçiminde. Posta kodu beş hanelidir ve şehirden önce gelir; şehir adı formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-03-s1-4",
              no: 4,
              text: "Krankenkasse",
              accept: ["Nordkasse", "bei der Nordkasse", "Nordkasse."],
              explain:
                "\"bei der Nordkasse versichert\" cümlesi sigorta kurumunu veriyor. Bu satıra kurumun adı yazılır, sigorta numarası değil.",
            },
            {
              kind: "gap",
              id: "de-a1-03-s1-5",
              no: 5,
              text: "Termin",
              accept: ["ohne Termin", "nein", "kein Termin", "nein, ohne Termin"],
              explain:
                "\"kommt heute ohne Termin\" deniyor. Bu satıra bir saat değil, randevusuz gelindiği bilgisi girilir.",
            },
          ],
        },
        {
          id: "de-a1-03-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie sind krank und können morgen nicht zum Deutschkurs kommen. Schreiben Sie eine E-Mail an Ihre Lehrerin, Frau Adam. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "Hastasın ve yarın Almanca kursuna gelemiyorsun. Öğretmenin Frau Adam'a bir e-posta yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Sagen Sie, wie lange Sie fehlen.", tr: "Kaç gün gelemeyeceğini söyle." },
              { de: "Fragen Sie nach den Hausaufgaben.", tr: "Ödevleri sor." },
            ],
            sample: `Sehr geehrte Frau Adam,

ich bin krank und kann morgen nicht in den Kurs kommen. Der Arzt sagt, ich bleibe drei Tage zu Hause. Können Sie mir bitte die Hausaufgaben schicken?

Vielen Dank und freundliche Grüße
Amir Rahimi`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? (Sehr geehrte Frau … / Freundliche Grüße …)",
              "Yaklaşık 30 kelime yazıldı mı? Çok kısa metin ölçülemez.",
              "Cümleler anlaşılıyor mu? A1'de birkaç hata anlamı bozmuyorsa sorun değil.",
              "Öğretmene yazıldığı için `Sie` kullanıldı mı?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: von einem Tag erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: bir gününü anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-03-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von einem normalen Tag. Sprechen Sie zu den Stichwörtern: aufstehen — Frühstück — Arbeit oder Schule — Mittagessen — Abend — Wochenende.",
          promptTr:
            "Sıradan bir gününü anlat. Şu anahtar sözcüklere göre konuş: kalkmak — kahvaltı — iş ya da okul — öğle yemeği — akşam — hafta sonu.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "Uhrzeiten nennen", tr: "Saat söylemek" },
              { de: "den Tagesablauf ordnen", tr: "Günü sırayla anlatmak" },
              { de: "über das Wochenende sprechen", tr: "Hafta sonundan söz etmek" },
            ],
            sample:
              "Ich stehe um halb sieben auf. Zum Frühstück esse ich Brot mit Käse und trinke Tee. Um acht fahre ich mit dem Bus zur Arbeit. Mittags esse ich in der Kantine. Am Abend koche ich und sehe fern. Am Wochenende besuche ich meine Freunde.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Saatler söylenebiliyor mu? (halb sieben, um acht …)",
              "Gün sırayla anlatıldı mı? (zuerst, dann, am Abend)",
              "Ayrılabilen fiiller doğru kullanıldı mı? (ich stehe … auf)",
            ],
          },
        },
        {
          id: "de-a1-03-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Gesundheit. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Arzt — Apotheke — Sport — Schlafen — Obst.",
          promptTr:
            "Konu: Sağlık. Her anahtar sözcük için bir soru kur ve cevapla: doktor — eczane — spor — uyku — meyve.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Gesundheit. Ihr erstes Stichwort ist: Arzt. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi sağlık konusunu konuşuyoruz. İlk sözcüğün: doktor. Bana bir soru sor.",
            },
            { who: "you", hint: "«Arzt» sözcüğüyle bir soru kur.", expect: "Arzt sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich gehe einmal im Jahr zum Arzt. Ihr nächstes Stichwort ist: Apotheke.",
              tr: "Yılda bir kez doktora gidiyorum. Sıradaki sözcüğün: eczane.",
            },
            { who: "you", hint: "«Apotheke» için bir soru kur.", expect: "Apotheke sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Die Apotheke bei mir ist bis zwanzig Uhr offen. Und jetzt eine Frage an Sie: Machen Sie oft Sport?",
              tr: "Bizim oradaki eczane akşam sekize kadar açık. Şimdi sana bir soru: Sık sık spor yapar mısın?",
            },
            { who: "you", hint: "Soruyu cevapla — spor yapıyor musun?", expect: "sıklık bildiren tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Wie lange schlafen Sie in der Nacht?",
              tr: "Teşekkürler. Son soru: Gece kaç saat uyuyorsun?",
            },
            { who: "you", hint: "Bir saat sayısı söyle.", expect: "bir süreyi saat olarak Almanca söylemek", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wann gehst du zum Arzt? — Nur wenn ich krank bin. Wo ist die Apotheke? — Sie ist neben dem Supermarkt. Machst du Sport? — Ja, ich laufe zweimal in der Woche. Wie lange schläfst du? — Ungefähr sieben Stunden. Isst du Obst? — Ja, jeden Tag einen Apfel.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Saat ve sıklık ifadeleri söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-03-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie brauchen einen Termin. — Sie möchten später noch einmal anrufen. — Jemand bittet Sie im Wartezimmer um Hilfe.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Randevuya ihtiyacın var. — Daha sonra tekrar aramak istiyorsun. — Bekleme odasında biri senden yardım istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie brauchen einen Termin. Bitten Sie mich darum.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Randevuya ihtiyacın var. Benden iste.",
            },
            { who: "you", hint: "Randevu iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Kann ich … / Könnten Sie … bitte)", seconds: 20 },
            {
              who: "partner",
              de: "Ja, gern. Am Freitag um zehn ist etwas frei. Zweite Situation: Sie möchten später noch einmal anrufen. Fragen Sie mich.",
              tr: "Tabii. Cuma saat onda yer var. İkinci durum: Sonra tekrar aramak istiyorsun. Bana sor.",
            },
            { who: "you", hint: "Sonra arayıp arayamayacağını sor.", expect: "izin sormak (Darf ich … / Kann ich später …)", seconds: 20 },
            {
              who: "partner",
              de: "Natürlich, rufen Sie ruhig an. Jetzt bitte ich Sie um etwas: Können Sie mir bitte das Formular geben?",
              tr: "Elbette, rahatça arayın. Şimdi ben senden bir şey rica ediyorum: Formu bana verebilir misin?",
            },
            {
              who: "you",
              hint: "Ricaya karşılık ver: kabul et ya da kısa bir gerekçeyle reddet.",
              expect: "bir ricaya kabul ya da gerekçeli ret ile karşılık vermek",
              seconds: 25,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Kann ich bitte einen Termin haben? — Ja, am Freitag um zehn. Darf ich später noch einmal anrufen? — Ja, natürlich. Geben Sie mir bitte das Formular? — Einen Moment, ich schreibe noch. Gleich gebe ich es Ihnen.",
            criteria: [
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu? (Kann ich … / Darf ich … / Könnten Sie …)",
              "Gelen ricaya hem olumlu hem olumsuz karşılık verilebiliyor mu?",
              "Olumsuz cevap kısa bir gerekçeyle yumuşatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
