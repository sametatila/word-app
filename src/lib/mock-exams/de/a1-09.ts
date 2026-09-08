import type { MockPaper } from "../types";

/**
 * A1 · Deneme 9 — "Amt und Papiere".
 *
 * PLAN kâğıt 1–8 ile birebir aynı.
 *
 *   Lesen  25 dk · 15 madde   (5 R/F · 5 iki şıklı ilan · 5 R/F levha)
 *   Hören  20 dk · 15 madde   (6 üç şıklı · 4 R/F anons · 5 üç şıklı)
 *   Schreiben 20 dk           form (5 bilgi) + kısa ileti (~30 kelime)
 *   Sprechen  15 dk           anlatı · konu sorusu · rica
 *
 * KONU SEÇİMİ: kurumlar ve belgeler. A1 öğrencisinin Almanya'da ilk haftada
 * karşılaştığı ama ilk sekiz kâğıdın hiç girmediği alan. Randevu, numara,
 * belge, imza — hepsi somut ve hepsi yanlış anlaşılınca gerçek sonuç doğuran
 * şeyler.
 *
 * DİKKAT EDİLEN: metinlerin hiçbiri bürokrasiyi kötülemiyor ya da öğrenciyi
 * uyarmıyor. Anlatılanlar yalnız olan şeyler — kapanış saati, eksik imza,
 * iptal edilen randevu. A1'de ölçülen şey tutum değil, bilgiyi bulmak.
 */
export const A1_09: MockPaper = {
  id: "de-a1-09",
  course: "de",
  level: "A1",
  no: 9,
  theme: "Amt und Papiere",
  themeTr: "Kurumlar ve belgeler",
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
          id: "de-a1-09-l1",
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
              title: "Von: buergeramt-nord@stadt.de",
              body: `Sehr geehrte Frau Nowicka,

Ihr Termin ist am 14. März um 9.30 Uhr, Zimmer 118.

Bitte bringen Sie Ihren Pass und den Mietvertrag mit.

Ohne diese Papiere können wir die Anmeldung nicht machen.

Kommen Sie bitte zehn Minuten früher.

Mit freundlichen Grüßen
Bürgeramt Nord`,
              gloss: [
                { de: "der Termin", tr: "randevu", en: "appointment" },
                { de: "der Mietvertrag", tr: "kira sözleşmesi", en: "rental contract" },
                { de: "die Anmeldung", tr: "adres kaydı", en: "registration" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang im Bürgeramt",
              genreTr: "Belediyedeki duyuru",
              body: `Liebe Besucherinnen und Besucher,

am Freitag ist das Amt nur bis 12 Uhr offen.

Termine am Nachmittag verschieben wir auf nächste Woche.

Ohne Termin ist kein Besuch möglich.

Ihr Bürgeramt Nord`,
              gloss: [
                { de: "das Amt", tr: "resmî daire", en: "public office" },
                { de: "verschieben", tr: "ertelemek", en: "to postpone" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-09-l1-1",
              no: 1,
              ref: "t1",
              text: "Frau Nowicka soll zwei Papiere mitbringen.",
              answer: true,
              explain:
                "E-posta iki belge sayıyor: \"Bitte bringen Sie Ihren Pass und den Mietvertrag mit\".",
            },
            {
              kind: "bool",
              id: "de-a1-09-l1-2",
              no: 2,
              ref: "t1",
              text: "Der Termin ist am Nachmittag.",
              answer: false,
              explain:
                "Saat \"9.30 Uhr\" yazıyor, yani sabah dokuz buçuk. Öğleden sonra değil.",
            },
            {
              kind: "bool",
              id: "de-a1-09-l1-3",
              no: 3,
              ref: "t1",
              text: "Frau Nowicka soll früher als 9.30 Uhr kommen.",
              answer: true,
              explain:
                "Son satır bunu istiyor: \"Kommen Sie bitte zehn Minuten früher\" — yani 9.20'de.",
            },
            {
              kind: "bool",
              id: "de-a1-09-l1-4",
              no: 4,
              ref: "t2",
              text: "Am Freitag schließt das Amt um zwölf Uhr.",
              answer: true,
              explain:
                "\"am Freitag ist das Amt nur bis 12 Uhr offen\" — öğlen kapanıyor, öğleden sonraki randevular erteleniyor.",
            },
            {
              kind: "bool",
              id: "de-a1-09-l1-5",
              no: 5,
              ref: "t2",
              text: "Man kann ohne Termin ins Amt kommen.",
              answer: false,
              explain:
                "Duyuru bunu kapatıyor: \"Ohne Termin ist kein Besuch möglich\".",
            },
          ],
        },
        {
          id: "de-a1-09-l2",
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
              id: "de-a1-09-l2-6",
              no: 6,
              text: "Sie brauchen ein Passfoto für den Ausweis. Es ist Sonntag.",
              options: [
                "Fotostudio Licht\nMo–Fr 10 bis 18 Uhr, Sa bis 14 Uhr\nPassfotos in fünf Minuten\nauch Fotos für Bewerbungen",
                "Fotoautomat im Bahnhof\ntäglich rund um die Uhr\nPassfotos für 8 Euro\nGeld passend einwerfen",
              ],
              answer: 1,
              explain:
                "Pazar günü tek açık olan (b): `täglich rund um die Uhr`. (a) da vesikalık çekiyor ama cumartesiden sonra kapalı.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-l2-7",
              no: 7,
              text: "Sie verstehen einen Brief vom Amt nicht und brauchen Hilfe auf Türkisch.",
              options: [
                "Sprachcafé jeden Mittwoch\n18 Uhr im großen Saal des Bürgerhauses\nDeutsch üben ohne Kurs und ohne Prüfung\nkostenlos, ohne Anmeldung",
                "Beratung mit Übersetzung\nDi und Do 14 bis 17 Uhr\nTürkisch, Arabisch, Polnisch\nBriefe vom Amt, kostenlos",
              ],
              answer: 1,
              explain:
                "Aranan şey çeviri: (b) `Türkisch` diyor ve doğrudan `Briefe vom Amt` ile ilgileniyor. (a) Almanca pratiği için, mektup açıklamıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-l2-8",
              no: 8,
              text: "Sie müssen ein Formular ausdrucken und haben keinen Drucker.",
              options: [
                "Kopierladen Mitte\nDrucken, Kopieren, Scannen\nMo–Sa 9 bis 19 Uhr\n20 Cent pro Seite",
                "Computerkurs für Anfänger\nsechs Abende, immer dienstags\nEinführung ins Internet und in E-Mails\n40 Euro für den ganzen Kurs",
              ],
              answer: 0,
              explain:
                "(a) `Drucken` işini yapıyor ve sayfa başına fiyat veriyor. (b) bilgisayar öğretiyor, çıktı almıyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-l2-9",
              no: 9,
              text: "Sie möchten wissen, welche Papiere Sie für die Anmeldung brauchen.",
              options: [
                "Bürgertelefon der Stadt\nMo–Fr 8 bis 18 Uhr\nAuskunft zu Papieren\nkeine Termine",
                "Terminvergabe im Internet\nTermine für alle Ämter der Stadt\nnur mit E-Mail-Adresse möglich\nkeine telefonische Auskunft",
              ],
              answer: 0,
              explain:
                "Soru sorulacak, randevu alınmayacak. (a) `Auskunft zu Papieren` veriyor. (b) tam tersini yazıyor: `keine telefonische Auskunft`.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-l2-10",
              no: 10,
              text: "Ihr Ausweis ist weg. Sie haben ihn vielleicht im Bus verloren.",
              options: [
                "Fundbüro der Stadt\nMo, Mi, Fr 9 bis 12 Uhr\nverlorene Papiere und Schlüssel\nAbholung nur persönlich",
                "Passstelle im Bürgeramt\nneuer Ausweis in drei Wochen\nFoto und alter Ausweis nötig\nGebühr 37 Euro",
              ],
              answer: 0,
              explain:
                "Önce kayıp aranır: (a) `verlorene Papiere` topluyor. (b) yeni kimlik veriyor ama `alter Ausweis nötig` — kayıp kimlikle olmuyor.",
            },
          ],
        },
        {
          id: "de-a1-09-l3",
          no: 3,
          format: "truefalse",
          goal: "instruction",
          prompt: "Lesen Sie die Schilder und die Aufgaben 11 bis 15. Sind die Sätze richtig oder falsch?",
          promptTr: "Levhaları ve 11–15. maddeleri oku. Cümleler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "s1",
              genre: "Schild im Wartebereich",
              genreTr: "Bekleme alanındaki levha",
              body: `Bitte ziehen Sie eine Nummer.

Ohne Nummer werden Sie nicht aufgerufen.

Handys bitte leise stellen.`,
            },
            {
              kind: "text",
              id: "s2",
              genre: "Schild an der Tür",
              genreTr: "Kapıdaki levha",
              body: `Zimmer 118 — Anmeldung

Bitte einzeln eintreten.

Wenn die Lampe rot ist, bitte warten.`,
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-09-l3-11",
              no: 11,
              ref: "s1",
              text: "Man braucht eine Nummer.",
              answer: true,
              explain:
                "İlk satır bunu istiyor: \"Bitte ziehen Sie eine Nummer\". İkinci satır da sonucunu söylüyor — numarası olmayan çağrılmıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-09-l3-12",
              no: 12,
              ref: "s1",
              text: "Man muss das Handy ausschalten.",
              answer: false,
              explain:
                "Levha kapatmayı değil sessize almayı istiyor: \"Handys bitte leise stellen\".",
            },
            {
              kind: "bool",
              id: "de-a1-09-l3-13",
              no: 13,
              ref: "s2",
              text: "Man soll allein hineingehen.",
              answer: true,
              explain:
                "\"Bitte einzeln eintreten\" — `einzeln` teker teker demek, yani odaya aynı anda bir kişi giriyor.",
            },
            {
              kind: "bool",
              id: "de-a1-09-l3-14",
              no: 14,
              ref: "s2",
              text: "Bei rotem Licht darf man eintreten.",
              answer: false,
              explain:
                "Kural tersi: \"Wenn die Lampe rot ist, bitte warten\". Kırmızı ışık girmeyi değil beklemeyi işaret ediyor.",
            },
            {
              kind: "bool",
              id: "de-a1-09-l3-15",
              no: 15,
              ref: "s1",
              text: "Ohne Nummer wird man aufgerufen.",
              answer: false,
              explain:
                "İkinci satır bunu açıkça yalanlıyor: \"Ohne Nummer werden Sie nicht aufgerufen\".",
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
          id: "de-a1-09-h1",
          no: 1,
          format: "mcq",
          goal: "detail",
          prompt: "Was ist richtig? Sie hören jeden Text zweimal.",
          promptTr: "Doğru olan hangisi? Her kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "a1",
              genre: "Gespräch am Schalter",
              genreTr: "Gişede konuşma",
              situation: "Bir kadın randevusuyla geliyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Hartl", text: "Guten Tag, ich habe einen Termin um zehn." },
                { speaker: "Mitarbeiter", text: "Zimmer 118. Aber ziehen Sie bitte zuerst eine Nummer." },
                { speaker: "Frau Hartl", text: "Auch mit Termin?" },
                { speaker: "Mitarbeiter", text: "Ja, auch dann." },
              ],
            },
            {
              kind: "audio",
              id: "a2",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir adam kimlik ücretini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Baran", text: "Was kostet ein neuer Ausweis?" },
                { speaker: "Mitarbeiterin", text: "Siebenunddreißig Euro. Unter vierundzwanzig Jahren zweiundzwanzig fünfzig." },
                { speaker: "Herr Baran", text: "Ich bin dreißig." },
              ],
            },
            {
              kind: "audio",
              id: "a3",
              genre: "Gespräch am Schalter",
              genreTr: "Gişede konuşma",
              situation: "Bir kadın fotokopi istiyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Lemke", text: "Können Sie mir das hier kopieren?" },
                { speaker: "Mitarbeiter", text: "Kopien machen wir am Schalter nicht. Im Erdgeschoss steht ein Gerät." },
                { speaker: "Frau Lemke", text: "Kostet das etwas?" },
                { speaker: "Mitarbeiter", text: "Zwanzig Cent die Seite." },
              ],
            },
            {
              kind: "audio",
              id: "a4",
              genre: "Gespräch im Wartebereich",
              genreTr: "Bekleme alanında konuşma",
              situation: "İki kişi bekleme sırasını konuşuyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Dietrich", text: "Wie lange warten Sie schon?" },
                { speaker: "Frau Ceyhan", text: "Seit halb neun. Jetzt ist Nummer zweiundvierzig dran, ich habe einundfünfzig." },
                { speaker: "Herr Dietrich", text: "Dann dauert es noch." },
              ],
            },
            {
              kind: "audio",
              id: "a5",
              genre: "Telefongespräch",
              genreTr: "Telefon konuşması",
              situation: "Bir kadın hangi belgenin aslının gerektiğini soruyor.",
              plays: 2,
              segments: [
                { speaker: "Frau Nowicka", text: "Reicht eine Kopie vom Mietvertrag?" },
                { speaker: "Mitarbeiterin", text: "Nein, den brauchen wir im Original. Vom Pass reicht die Kopie." },
                { speaker: "Frau Nowicka", text: "Gut, dann bringe ich beides mit." },
              ],
            },
            {
              kind: "audio",
              id: "a6",
              genre: "Gespräch am Schalter",
              genreTr: "Gişede konuşma",
              situation: "Bir adam taşındığını bildirmek istiyor.",
              plays: 2,
              segments: [
                { speaker: "Herr Tadic", text: "Ich bin umgezogen. Wo melde ich das?" },
                { speaker: "Mitarbeiterin", text: "Hier, aber Sie brauchen einen Termin. Der nächste ist am Zwölften." },
                { speaker: "Herr Tadic", text: "So spät erst?" },
                { speaker: "Mitarbeiterin", text: "Am Vormittag wird manchmal etwas frei, wenn jemand absagt." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-09-h1-1",
              no: 1,
              ref: "a1",
              text: "Was muss Frau Hartl zuerst tun?",
              options: ["Eine Nummer ziehen.", "Direkt ins Zimmer gehen.", "Einen neuen Termin machen."],
              answer: 0,
              explain:
                "Görevli oda numarasını söylüyor ama önce başka bir şey istiyor: \"ziehen Sie bitte zuerst eine Nummer\" — randevusu olanlar için de geçerli.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h1-2",
              no: 2,
              ref: "a2",
              text: "Was zahlt Herr Baran?",
              options: ["22,50 Euro", "37,00 Euro", "24,00 Euro"],
              answer: 1,
              explain:
                "İki fiyat var ve yaşa bağlı: indirimli tutar \"unter vierundzwanzig Jahren\". Adam otuz yaşında, yani tam ücret.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h1-3",
              no: 3,
              ref: "a3",
              text: "Wo kann Frau Lemke kopieren?",
              options: ["Am Schalter im Zimmer.", "Im Erdgeschoss.", "In diesem Haus gar nicht."],
              answer: 1,
              explain:
                "Görevli gişeyi eliyor ve yer gösteriyor: \"Im Erdgeschoss steht ein Gerät\".",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h1-4",
              no: 4,
              ref: "a4",
              text: "Welche Nummer hat Frau Ceyhan?",
              options: ["42", "58", "51"],
              answer: 2,
              explain:
                "İki sayı geçiyor ve karışması kolay: sırada olan kırk iki, kadının elindeki \"einundfünfzig\".",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h1-5",
              no: 5,
              ref: "a5",
              text: "Was braucht das Amt im Original?",
              options: ["Den Mietvertrag.", "Den Reisepass.", "Beide Papiere zusammen."],
              answer: 0,
              explain:
                "Görevli ikisini ayırıyor: kira sözleşmesi asıl olarak, \"Vom Pass reicht die Kopie\".",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h1-6",
              no: 6,
              ref: "a6",
              text: "Wann wird vielleicht früher etwas frei?",
              options: ["Am Abend.", "Am Wochenende.", "Am Vormittag."],
              answer: 2,
              explain:
                "Görevli tek bir zaman söylüyor: \"Am Vormittag wird manchmal etwas frei, wenn jemand absagt\".",
            },
          ],
        },
        {
          id: "de-a1-09-h2",
          no: 2,
          format: "truefalse",
          goal: "instruction",
          prompt: "Sind die Sätze richtig oder falsch? Sie hören jeden Text einmal.",
          promptTr: "Cümleler doğru mu yanlış mı? Her anonsu bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Durchsage im Amt",
              genreTr: "Dairede anons",
              situation: "Bekleme süresi anonsu.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für alle Wartenden: Zwei Kolleginnen sind heute krank. Die Wartezeit beträgt etwa eine Stunde. Wer einen Termin hat, kommt zuerst dran.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d2",
              genre: "Durchsage im Amt",
              genreTr: "Dairede anons",
              situation: "Oda değişikliği.",
              plays: 1,
              segments: [
                {
                  text: "Die Anmeldung ist heute nicht in Zimmer 118. Bitte gehen Sie in Zimmer 210 im ersten Stock. Der Aufzug ist links neben dem Eingang.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d3",
              genre: "Durchsage an der Kasse",
              genreTr: "Vezne anonsu",
              situation: "Kart cihazı bozuk.",
              plays: 1,
              segments: [
                {
                  text: "An der Kasse können Sie heute nur bar zahlen. Das Kartengerät ist kaputt. Ein Geldautomat steht im Erdgeschoss neben dem Eingang.",
                },
              ],
            },
            {
              kind: "audio",
              id: "d4",
              genre: "Durchsage im Amt",
              genreTr: "Dairede anons",
              situation: "Kapanış saati.",
              plays: 1,
              segments: [
                {
                  text: "Das Amt schließt heute um sechzehn Uhr. Die letzte Nummer geben wir um halb vier aus. Kommen Sie bitte morgen wieder, wenn Sie keine Nummer mehr bekommen.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-a1-09-h2-7",
              no: 7,
              ref: "d1",
              text: "Wer einen Termin hat, muss länger warten.",
              answer: false,
              explain:
                "Anons tersini söylüyor: \"Wer einen Termin hat, kommt zuerst dran\". Bir saatlik bekleme randevusu olmayanlar için.",
            },
            {
              kind: "bool",
              id: "de-a1-09-h2-8",
              no: 8,
              ref: "d2",
              text: "Die Anmeldung ist heute im ersten Stock.",
              answer: true,
              explain:
                "\"Bitte gehen Sie in Zimmer 210 im ersten Stock\" — 118 numaralı oda bugün kullanılmıyor.",
            },
            {
              kind: "bool",
              id: "de-a1-09-h2-9",
              no: 9,
              ref: "d3",
              text: "Man kann heute mit Karte zahlen.",
              answer: false,
              explain:
                "Anons iki şeyi birlikte veriyor: \"nur bar zahlen\" ve \"Das Kartengerät ist kaputt\".",
            },
            {
              kind: "bool",
              id: "de-a1-09-h2-10",
              no: 10,
              ref: "d4",
              text: "Die letzte Nummer gibt es um halb vier.",
              answer: true,
              explain:
                "İki saat geçiyor: daire on altıda kapanıyor, \"Die letzte Nummer geben wir um halb vier aus\".",
            },
          ],
        },
        {
          id: "de-a1-09-h3",
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
              situation: "Kimlik hazır.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Frau Nowicka, hier ist das Bürgeramt. Ihr Ausweis ist fertig. Sie können ihn ohne Termin abholen, Montag bis Freitag bis fünfzehn Uhr.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m2",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Konut şirketi belge veriyor.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Herr Baran, hier ist die Wohnungsgesellschaft. Sie brauchen für das Amt eine Bestätigung von uns. Kommen Sie bitte vorbei, wir drucken sie sofort aus.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m3",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Kayıp eşya bürosu arıyor.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, hier ist das Fundbüro. Ein Ausweis auf Ihren Namen liegt bei uns. Bringen Sie bitte ein anderes Papier mit, sonst dürfen wir ihn nicht herausgeben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m4",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Başvuruda eksik var.",
              plays: 2,
              segments: [
                {
                  text: "Hallo Frau Lemke, hier ist das Amt für Wohnen. Ihr Antrag ist da, aber die Unterschrift fehlt. Kommen Sie bitte noch einmal vorbei oder schicken Sie das Blatt per Post.",
                },
              ],
            },
            {
              kind: "audio",
              id: "m5",
              genre: "Nachricht auf dem Anrufbeantworter",
              genreTr: "Telesekreter mesajı",
              situation: "Randevu değişti.",
              plays: 2,
              segments: [
                {
                  text: "Guten Tag, Herr Tadic, hier ist das Bürgeramt. Ihr Termin am Zwölften fällt leider aus. Wir haben Ihnen einen neuen Termin am Achtzehnten um elf Uhr gegeben.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-a1-09-h3-11",
              no: 11,
              ref: "m1",
              text: "Wie kann Frau Nowicka den Ausweis abholen?",
              options: ["Nur mit einem Termin.", "Ohne Termin.", "Erst im nächsten Monat."],
              answer: 1,
              explain:
                "Mesaj bunu açıkça söylüyor: \"Sie können ihn ohne Termin abholen\". On beş saat kapanış zamanı, koşul değil.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h3-12",
              no: 12,
              ref: "m2",
              text: "Was bekommt Herr Baran?",
              options: ["Einen neuen Vertrag.", "Einen Termin beim Amt.", "Eine Bestätigung."],
              answer: 2,
              explain:
                "\"Sie brauchen für das Amt eine Bestätigung von uns\" — hemen çıktı alınıp veriliyor.",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h3-13",
              no: 13,
              ref: "m3",
              text: "Was soll die Person mitbringen?",
              options: ["Ein Papier.", "Ein neues Passfoto.", "Zehn Euro in bar."],
              answer: 0,
              explain:
                "Kimliği teslim alabilmek için başka bir belge gerekiyor: \"Bringen Sie bitte ein anderes Papier mit\".",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h3-14",
              no: 14,
              ref: "m4",
              text: "Was fehlt an dem Antrag?",
              options: ["Das Datum oben.", "Die Unterschrift.", "Die genaue Adresse."],
              answer: 1,
              explain:
                "Eksik tek şey adıyla söyleniyor: \"aber die Unterschrift fehlt\".",
            },
            {
              kind: "mcq",
              id: "de-a1-09-h3-15",
              no: 15,
              ref: "m5",
              text: "Wann ist der neue Termin?",
              options: ["Am zwölften wie geplant.", "Am elften.", "Am achtzehnten."],
              answer: 2,
              explain:
                "İki tarih geçiyor: iptal edilen \"am Zwölften\", yenisi \"am Achtzehnten um elf Uhr\". On bir saat, gün değil.",
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
          id: "de-a1-09-s1",
          no: 1,
          format: "gap",
          goal: "detail",
          prompt:
            "Ihre Nachbarin Iwona Nowicka meldet sich in der Stadt an. Sie helfen ihr beim Formular. Iwona ist am 9. Oktober 1993 geboren. Sie wohnt seit dem 1. März in der Ahornstraße 5 in 44135 Dortmund. Sie ist ledig. Füllen Sie das Formular aus.",
          promptTr:
            "Komşun Iwona Nowicka şehre adres kaydı yaptırıyor. Formu doldurmasına yardım ediyorsun. Iwona 9 Ekim 1993 doğumlu. 1 Mart'tan beri Ahornstraße 5, 44135 Dortmund adresinde oturuyor. Bekâr. Formu doldur.",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Formular",
              genreTr: "Form",
              title: "Anmeldung — Bürgeramt Nord",
              body: `Familienname, Vorname:    Nowicka, Iwona
Geburtsdatum:             {{1}}
Straße, Hausnummer:       {{2}}
PLZ, Ort:                 {{3}} Dortmund
Eingezogen am:            {{4}}
Familienstand:            {{5}}
Unterschrift:             I. Nowicka`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-a1-09-s1-1",
              no: 1,
              text: "Geburtsdatum",
              accept: ["09.10.1993", "9.10.1993", "9. Oktober 1993", "09.10.93", "9.10.93"],
              explain:
                "Yönergede \"am 9. Oktober 1993 geboren\" yazıyor. Ekim yılın onuncu ayı, o yüzden rakamla 09.10.1993 olur.",
            },
            {
              kind: "gap",
              id: "de-a1-09-s1-2",
              no: 2,
              text: "Straße, Hausnummer",
              accept: ["Ahornstraße 5", "Ahornstr. 5"],
              explain:
                "Adres yönergede tam veriliyor: Ahornstraße 5. Almanca formda `Ahornstr. 5` kısaltması da kabul edilir.",
            },
            {
              kind: "gap",
              id: "de-a1-09-s1-3",
              no: 3,
              text: "PLZ",
              accept: ["44135"],
              explain:
                "\"in 44135 Dortmund\" — posta kodu beş haneli ve şehirden önce gelir. Şehir formda zaten basılı.",
            },
            {
              kind: "gap",
              id: "de-a1-09-s1-4",
              no: 4,
              text: "Eingezogen am",
              accept: ["01.03.", "1.3.", "1. März"],
              explain:
                "\"Sie wohnt seit dem 1. März\" — taşınma tarihi bu satıra girer, doğum tarihiyle karıştırılmamalı.",
            },
            {
              kind: "gap",
              id: "de-a1-09-s1-5",
              no: 5,
              text: "Familienstand",
              accept: ["ledig"],
              explain:
                "Yönergenin son bilgisi: \"Sie ist ledig\". Bu satır medeni hâli soruyor.",
            },
          ],
        },
        {
          id: "de-a1-09-s2",
          no: 2,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie können zu Ihrem Termin am 14. März nicht kommen. Schreiben Sie an das Bürgeramt. Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie Anrede und Gruß nicht.",
          promptTr:
            "14 Mart'taki randevuna gelemiyorsun. Belediyeye yaz. Her maddeye bir-iki cümle yaz (yaklaşık 30 kelime). Hitap ve veda cümlesini unutma.",
          items: [],
          rubric: {
            minWords: 30,
            points: [
              { de: "Warum schreiben Sie?", tr: "Neden yazıyorsun?" },
              { de: "Sagen Sie, warum Sie nicht kommen können.", tr: "Neden gelemediğini söyle." },
              { de: "Bitten Sie um einen neuen Termin.", tr: "Yeni bir randevu iste." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich habe am 14. März um 9.30 Uhr einen Termin bei Ihnen.

Leider kann ich nicht kommen. An diesem Tag muss ich arbeiten.

Können Sie mir bitte einen neuen Termin geben?

Mit freundlichen Grüßen
Iwona Nowicka`,
            criteria: [
              "Üç içerik noktasının üçü de var mı? Biri eksikse metin tam sayılmaz.",
              "Hitap ve veda var mı? Kuruma yazıldığı için `Sehr geehrte Damen und Herren` uygun.",
              "Randevu tarih ya da saatle belirtildi mi, yoksa yalnız `mein Termin` mi denildi?",
              "Gelememe sebebi kısa ve somut mu?",
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
      instruction: "Dieser Teil hat drei Aufgaben: von einem Amt erzählen, Fragen stellen, um etwas bitten und reagieren.",
      instructionTr: "Bu bölümde üç görev var: bir daireyi anlatma, soru sorma, rica etme ve yanıt verme.",
      tasks: [
        {
          id: "de-a1-09-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Erzählen Sie von einem Termin bei einem Amt. Sprechen Sie zu den Stichwörtern: welches Amt — warum — Papiere — warten — Sprache — wie es war.",
          promptTr:
            "Bir dairedeki randevunu anlat. Şu anahtar sözcüklere göre konuş: hangi daire — neden — belgeler — bekleme — dil — nasıl geçti.",
          prepSeconds: 30,
          speakSeconds: 90,
          items: [],
          rubric: {
            minutes: 2,
            points: [
              { de: "sagen, bei welchem Amt und warum", tr: "Hangi daire ve neden" },
              { de: "die Papiere nennen", tr: "Belgeleri saymak" },
              { de: "sagen, wie es war", tr: "Nasıl geçtiğini söylemek" },
            ],
            sample:
              "Ich war im Bürgeramt. Ich musste meine neue Adresse anmelden. Ich hatte meinen Pass und den Mietvertrag dabei. Ich habe eine Nummer gezogen und vierzig Minuten gewartet. Die Frau am Schalter hat langsam gesprochen. Am Ende war alles in zehn Minuten fertig.",
            criteria: [
              "Altı anahtar sözcüğün her birine değinildi mi?",
              "Belgeler adıyla sayıldı mı? (Pass, Mietvertrag)",
              "Bekleme süresi bir sayıyla verildi mi?",
              "Cümleler kısa ve tam mı? A1'de basit ana cümleler yeterli.",
            ],
          },
        },
        {
          id: "de-a1-09-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Thema: Papiere. Bilden Sie zu jedem Stichwort eine Frage und beantworten Sie sie: Ausweis — Termin — Formular — Foto — Gebühr.",
          promptTr:
            "Konu: Belgeler. Her anahtar sözcük için bir soru kur ve cevapla: kimlik — randevu — form — fotoğraf — ücret.",
          prepSeconds: 30,
          exchange: [
            {
              who: "partner",
              de: "Wir sprechen jetzt über das Thema Papiere. Ihr erstes Stichwort ist: Ausweis. Stellen Sie mir bitte eine Frage.",
              tr: "Şimdi belgeler konusunu konuşuyoruz. İlk sözcüğün: kimlik. Bana bir soru sor.",
            },
            { who: "you", hint: "«Ausweis» sözcüğüyle bir soru kur.", expect: "Ausweis sözcüğüyle dilbilgisel olarak doğru bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Mein Ausweis ist noch zwei Jahre gültig. Ihr nächstes Stichwort ist: Termin.",
              tr: "Kimliğim iki yıl daha geçerli. Sıradaki sözcüğün: randevu.",
            },
            { who: "you", hint: "«Termin» için bir soru kur.", expect: "Termin sözcüğüyle bir soru kurmak", seconds: 25 },
            {
              who: "partner",
              de: "Ich habe den Termin im Internet gemacht. Und jetzt eine Frage an Sie: Füllen Sie Formulare allein aus?",
              tr: "Randevuyu internetten aldım. Şimdi sana bir soru: Formları tek başına mı dolduruyorsun?",
            },
            { who: "you", hint: "Soruyu cevapla — formları tek başına mı dolduruyorsun?", expect: "evet/hayır sorusuna tam bir cümleyle cevap vermek", seconds: 25 },
            {
              who: "partner",
              de: "Danke. Letzte Frage: Was kostet bei Ihnen ein Passfoto?",
              tr: "Teşekkürler. Son soru: Sizde vesikalık kaça?",
            },
            { who: "you", hint: "Bir tutar söyle.", expect: "bir tutarla cevap vermek (acht Euro, zehn Euro …)", seconds: 25 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zu jedem Stichwort eine Frage", tr: "Her sözcük için bir soru" },
              { de: "auf die Fragen antworten", tr: "Sorulara cevap vermek" },
            ],
            sample:
              "Wie lange ist dein Ausweis gültig? — Noch zwei Jahre. Wann hast du deinen Termin? — Am Montag. Ist das Formular schwer? — Ja, ein bisschen. Wo machst du ein Foto? — Am Bahnhof. Was kostet das? — Acht Euro.",
            criteria: [
              "Beş sözcüğün her biri için bir soru kuruldu mu?",
              "Sorular doğru kuruldu mu? (W-sorusunda fiil ikinci, evet/hayır sorusunda fiil başta)",
              "Cevaplar soruya uygun mu?",
              "Tutar ve süre söylenebiliyor mu?",
            ],
          },
        },
        {
          id: "de-a1-09-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Bitten Sie um etwas und reagieren Sie auf eine Bitte. Situationen: Sie verstehen ein Wort im Formular nicht. — Sie brauchen einen Stift. — Jemand möchte den Platz neben Ihnen.",
          promptTr:
            "Bir şey rica et ve gelen ricaya karşılık ver. Durumlar: Formdaki bir sözcüğü anlamıyorsun. — Bir kaleme ihtiyacın var. — Biri yanındaki yeri istiyor.",
          prepSeconds: 20,
          exchange: [
            {
              who: "partner",
              de: "Wir üben jetzt Bitten. Erste Situation: Sie verstehen ein Wort im Formular nicht. Fragen Sie mich.",
              tr: "Şimdi rica etmeyi çalışıyoruz. İlk durum: Formdaki bir sözcüğü anlamıyorsun. Bana sor.",
            },
            {
              who: "you",
              hint: "Sözcüğün ne demek olduğunu sor.",
              expect: "bir sözcüğün anlamını sormak (Was bedeutet …)",
              seconds: 20,
            },
            {
              who: "partner",
              de: "Das heißt: Sie leben allein, ohne Ehepartner. Zweite Situation: Sie brauchen einen Stift. Bitten Sie mich darum.",
              tr: "Şu demek: Eşiniz yok, yalnız yaşıyorsunuz. İkinci durum: Bir kaleme ihtiyacın var. Benden iste.",
            },
            { who: "you", hint: "Kalem iste, kibarca.", expect: "kibar bir rica kalıbı kurmak (Können Sie mir bitte … geben)", seconds: 20 },
            {
              who: "partner",
              de: "Hier bitte. Jetzt bitte ich Sie um etwas: Ist der Platz neben Ihnen frei? Meine Frau kommt gleich.",
              tr: "Buyur. Şimdi ben senden bir şey rica ediyorum: Yanındaki yer boş mu? Eşim birazdan geliyor.",
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
              { de: "nach einer Bedeutung fragen", tr: "Bir anlamı sormak" },
              { de: "höflich bitten", tr: "Kibarca rica etmek" },
              { de: "auf eine Bitte reagieren", tr: "Gelen ricaya karşılık vermek" },
            ],
            sample:
              "Entschuldigung, was bedeutet dieses Wort? — Können Sie mir bitte einen Stift geben? — Ja, der Platz ist frei. Bitte setzen Sie sich. — Tut mir leid, da sitzt schon meine Tochter.",
            criteria: [
              "Anlam sorusu doğru kuruldu mu? (Was bedeutet … / Was heißt …)",
              "Rica `bitte` ile ve kibar bir kalıpla kuruldu mu?",
              "Gelen ricaya hem olumlu hem olumsuz karşılık verilebiliyor mu?",
              "Ret bir gerekçeyle yumuşatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
