import type { MockPaper } from "../types";

/**
 * B1 · Deneme 4 — "Medien und Freizeit".
 *
 * PLAN kâğıt 1–3 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 mcq · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karışık · 5 mcq · 7 R/F · 8 mcq)
 *   Schreiben 60 dk           (80 + 80 + 40 kelime)
 *   Sprechen  15 dk           (planlama · sunum · soruna tepki)
 *
 * KONU SEÇİMİ: medya ve boş zaman, "herkesin bir görüşü olduğu" bir alan —
 * tam bu yüzden maddeler dünya bilgisiyle değil yalnız metinle çözülebilecek
 * biçimde kuruldu. Forum yorumlarının hiçbiri kendi tutumunu ilk cümlede
 * söylemiyor.
 */
export const B1_04: MockPaper = {
  id: "de-b1-04",
  course: "de",
  level: "B1",
  no: 4,
  theme: "Medien und Freizeit",
  themeTr: "Medya ve boş zaman",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Erfahrungsbericht, zwei Meinungstexte, Anzeigen, Forumsbeiträge und eine Benutzungsordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Bir deneyim yazısı, iki görüş metni, ilanlar, forum yorumları ve bir kullanım yönergesi okuyacaksın.",
      tasks: [
        {
          id: "de-b1-04-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Text und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Metni ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Erfahrungsbericht",
              genreTr: "Deneyim yazısı",
              title: "Drei Monate mit einem alten Handy",
              body: `Im Januar habe ich mein Smartphone in eine Schublade gelegt und ein altes Tastenhandy benutzt. Nicht für immer, sondern für drei Monate. Ich wollte wissen, was ich wirklich vermisse.

Die erste Woche war peinlich. Ich habe an der Haltestelle gestanden und nicht gewusst, wohin ich schauen soll. Zweimal bin ich falsch gefahren, weil ich mich auf die App verlassen hatte und den Plan an der Wand nicht lesen konnte.

Was sofort besser wurde: mein Schlaf. Ich bin abends früher müde geworden, und morgens habe ich nicht mehr zwanzig Minuten im Bett gelegen und Nachrichten gelesen.

Was schlechter wurde: die Verabredungen. Meine Freunde planen fast alles in einer Gruppe, und diese Gruppe war für mich zu. Zweimal habe ich ein Treffen verpasst, obwohl alle dachten, ich hätte Bescheid gewusst. Am Ende hat mich eine Freundin einfach angerufen. Das war unbequem für sie, nicht für mich.

Überrascht hat mich, dass ich nicht mehr gelesen habe. Ich dachte, ich würde die freie Zeit mit Büchern füllen. Stattdessen habe ich mehr Radio gehört und ziemlich viel aufgeräumt.

Nach drei Monaten habe ich das Smartphone zurückgeholt. Die Apps für Nachrichten sind geblieben, die für Videos nicht. Der Wecker steht jetzt wieder auf dem Nachttisch, und das Telefon liegt in der Küche.

Ein Rat, wenn Sie es probieren wollen: Sagen Sie es vorher allen. Der Versuch scheitert nicht am Handy, er scheitert an den anderen.`,
              gloss: [
                { de: "das Tastenhandy", tr: "tuşlu telefon", en: "feature phone" },
                { de: "sich verlassen auf", tr: "bir şeye güvenmek", en: "to rely on" },
                { de: "die Verabredung", tr: "buluşma sözü", en: "arrangement to meet" },
                { de: "scheitern", tr: "başarısız olmak", en: "to fail" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-04-l1-1",
              no: 1,
              ref: "t1",
              text: "Der Autor hat den Versuch von Anfang an zeitlich begrenzt.",
              answer: true,
              explain:
                "İlk paragrafta \"Nicht für immer, sondern für drei Monate\" deniyor. Yani süre baştan belli, deneme açık uçlu değil.",
            },
            {
              kind: "bool",
              id: "de-b1-04-l1-2",
              no: 2,
              ref: "t1",
              text: "Ohne App hat er sich im Nahverkehr problemlos zurechtgefunden.",
              answer: false,
              explain:
                "Metin tersini söylüyor: \"Zweimal bin ich falsch gefahren\", çünkü duvardaki tarifeyi okuyamamış. Yani yön bulma ilk haftanın sorunlarından biri.",
            },
            {
              kind: "bool",
              id: "de-b1-04-l1-3",
              no: 3,
              ref: "t1",
              text: "Sein Schlaf hat sich schon früh verbessert.",
              answer: true,
              explain:
                "\"Was sofort besser wurde: mein Schlaf\" — akşam daha erken uykusu geliyor, sabah 20 dakikayı yatakta haber okuyarak geçirmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-l1-4",
              no: 4,
              ref: "t1",
              text: "Seine Freunde haben den Versuch als unproblematisch erlebt.",
              answer: false,
              explain:
                "Bir arkadaşı onu aramak zorunda kalıyor ve yazar bunu \"Das war unbequem für sie, nicht für mich\" diye not düşüyor. Yük başkalarına biniyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-l1-5",
              no: 5,
              ref: "t1",
              text: "Der Autor hat in den drei Monaten weniger gelesen als erwartet.",
              answer: true,
              explain:
                "Beklentisi kitaplarla dolu bir zamandı, ama \"Überrascht hat mich, dass ich nicht mehr gelesen habe\". Onun yerine radyo ve toparlanma geliyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-l1-6",
              no: 6,
              ref: "t1",
              text: "Nach dem Versuch hat er alle Apps wieder installiert.",
              answer: false,
              explain:
                "Ayrım yapıyor: haber uygulamaları kalıyor, video uygulamaları kalmıyor. Telefon da artık yatak odasında değil mutfakta duruyor.",
            },
          ],
        },
        {
          id: "de-b1-04-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die beiden Texte und die Aufgaben 7 bis 12. Wählen Sie: a, b oder c.",
          promptTr: "İki metni ve 7–12. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Blogbeitrag",
              genreTr: "Blog yazısı",
              title: "Warum ich wieder Radio höre",
              body: `Fünfzehn Jahre lang habe ich kein Radio eingeschaltet. Ich hatte meine Listen, meine Podcasts, meine Reihenfolge. Warum sollte ich mir vorschreiben lassen, was um Viertel nach acht läuft?

Angefangen hat es in der Werkstatt eines Freundes. Dort lief ein Sender, den ich nie ausgesucht hätte, und nach zwei Stunden hatte ich drei Lieder im Kopf, die ich vorher nicht kannte.

Das ist der Punkt. Meine Listen kennen mich zu gut. Sie geben mir genau das, was ich gestern schon mochte. Ein Sender, der nicht auf mich hört, bringt mich weiter als einer, der mir immer recht gibt.

Ich will nichts romantisieren. Vieles im Radio ist Wiederholung, und die Werbung nervt. Wenn ich konzentriert arbeite, schalte ich weiterhin ab.

Aber morgens beim Frühstück läuft jetzt wieder ein Programm, das jemand für alle gemacht hat und nicht ein Rechner für mich allein. Ich merke, dass ich dabei mehr über meine Stadt erfahre als in einem Jahr Podcast.`,
              gloss: [
                { de: "vorschreiben", tr: "dayatmak, belirlemek", en: "to dictate" },
                { de: "der Sender", tr: "radyo kanalı", en: "station" },
                { de: "romantisieren", tr: "gereğinden fazla güzelleştirmek", en: "to romanticise" },
              ],
            },
            {
              kind: "text",
              id: "t3",
              genre: "Leserbrief",
              genreTr: "Okur mektubu",
              title: "Unser Verein stirbt nicht am Internet",
              body: `Seit Jahren lese ich, das Internet mache die Vereine kaputt. In unserem Sportverein ist es anders gekommen, und ich möchte erklären, warum.

Wir hatten 2015 rund 180 Mitglieder, heute sind es 240. Gewachsen sind wir nicht trotz, sondern wegen des Netzes: Ein Vater hat vor sechs Jahren eine Gruppe gegründet, in der die Trainingszeiten stehen. Vorher hat man angerufen und niemanden erreicht.

Verloren haben wir etwas anderes, und das schmerzt: das Vereinsheim. Früher blieb man nach dem Training noch eine Stunde sitzen. Heute schreiben die Leute im Bus weiter, was sie sich sonst am Tisch erzählt hätten.

Wer also sagt, das Internet nehme uns die Mitglieder, hat es nicht geprüft. Es nimmt uns die Zeit dazwischen. Das ist ein anderes Problem und es braucht eine andere Antwort.

Unsere Antwort ist einfach: Einmal im Monat gibt es nach dem Training Essen, und das Handy bleibt in der Tasche. Es kommen jedes Mal mehr Leute.`,
              gloss: [
                { de: "das Vereinsheim", tr: "kulüp lokali", en: "clubhouse" },
                { de: "schmerzen", tr: "acıtmak, üzmek", en: "to hurt" },
                { de: "prüfen", tr: "denetlemek, doğrulamak", en: "to check" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-04-l2-7",
              no: 7,
              ref: "t2",
              text: "Was hat den Autor zum Radio zurückgebracht?",
              options: [
                "Eine Empfehlung aus seiner Podcast-Liste.",
                "Ein Bericht über einen lokalen Sender.",
                "Ein Zufall beim Besuch eines Freundes.",
              ],
              answer: 2,
              explain:
                "Başlangıç noktası anlatılıyor: \"in der Werkstatt eines Freundes\" kendi seçmeyeceği bir kanal çalıyor ve 2 saat sonra 3 yeni şarkı aklında kalıyor. Bir öneri ya da haber söz konusu değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l2-8",
              no: 8,
              ref: "t2",
              text: "Was kritisiert der Autor an seinen eigenen Listen?",
              options: [
                "Sie bieten ihm zu wenig Abwechslung.",
                "Sie sind technisch zu kompliziert geworden.",
                "Sie enthalten zu viel Werbung.",
              ],
              answer: 0,
              explain:
                "\"Meine Listen kennen mich zu gut\" — dün beğendiğini bugün de veriyorlar. Reklam eleştirisi radyoya yönelik, listelere değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l2-9",
              no: 9,
              ref: "t2",
              text: "Wie steht der Autor heute zum Radio?",
              options: [
                "Er hört es rund um die Uhr und findet alles daran gut.",
                "Er hört es zu bestimmten Zeiten und sieht auch Nachteile.",
                "Er hört es nur noch selten und eher aus Gewohnheit.",
              ],
              answer: 1,
              explain:
                "Sabah kahvaltıda dinliyor, konsantre çalışırken kapatıyor; tekrarların ve reklamın rahatsız ettiğini de söylüyor. \"Ich will nichts romantisieren\" cümlesi bu dengeyi kuruyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l2-10",
              no: 10,
              ref: "t3",
              text: "Wie hat sich die Mitgliederzahl des Vereins entwickelt?",
              options: [
                "Sie ist gefallen, weil viele Mitglieder online geblieben sind.",
                "Sie ist etwa gleich geblieben wie vor zehn Jahren.",
                "Sie ist gestiegen.",
              ],
              answer: 2,
              explain:
                "Sayılar veriliyor: 2015'te 180, bugün 240 üye. Yazar artışın internete rağmen değil, internet sayesinde olduğunu söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l2-11",
              no: 11,
              ref: "t3",
              text: "Was hat der Verein nach Ansicht der Autorin verloren?",
              options: [
                "Die Stunde im Vereinsheim nach dem Sport.",
                "Einen großen Teil der jüngeren Mitglieder.",
                "Die Möglichkeit, Trainingszeiten bekannt zu geben.",
              ],
              answer: 0,
              explain:
                "Kayıp lokalde geçen o bir saat: \"Es nimmt uns die Zeit dazwischen\". Antrenman saatlerini duyurmak ise tam tersine kolaylaşmış.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l2-12",
              no: 12,
              ref: "t3",
              text: "Wie reagiert der Verein auf dieses Problem?",
              options: [
                "Er verbietet Handys während des gesamten Trainings.",
                "Er lädt monatlich zum Essen ohne Handy ein.",
                "Er hat das Vereinsheim komplett neu einrichten lassen.",
              ],
              answer: 1,
              explain:
                "Çözüm somut ve sınırlı: \"Einmal im Monat gibt es nach dem Training Essen, und das Handy bleibt in der Tasche\". Yasak antrenmanın tamamını kapsamıyor, lokal de yenilenmiyor.",
            },
          ],
        },
        {
          id: "de-b1-04-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Freizeitangebot. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler bir boş zaman etkinliği arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Offene Fotowerkstatt",
              body: "Jeden zweiten Mittwoch, 18 bis 21 Uhr. Kamera mitbringen, Handykameras ausdrücklich willkommen. Kostenlos, keine Anmeldung, keine Vorkenntnisse.",
            },
            {
              key: "b",
              label: "Chor für Berufstätige",
              body: "Proben montags 20 Uhr, Einstieg jederzeit möglich. Notenkenntnisse nicht nötig. 15 Euro im Monat, erste drei Proben frei.",
            },
            {
              key: "c",
              label: "Lesekreis am Vormittag",
              body: "Jeden ersten Dienstag, 10 bis 12 Uhr im Café Lind. Ein Buch pro Monat, Auswahl gemeinsam. Kaffee inklusive, 5 Euro pro Treffen.",
            },
            {
              key: "d",
              label: "Reparaturtreff im Stadtteilzentrum",
              body: "Samstags 14 bis 17 Uhr. Wir reparieren gemeinsam Radios, Lampen und Fahrräder. Ersatzteile gegen Erstattung, Arbeit kostenlos.",
            },
            {
              key: "e",
              label: "Kindertheater am Wochenende",
              body: "Samstag und Sonntag 15 Uhr, für Kinder ab 4 Jahren. Dauer 50 Minuten, Eintritt 6 Euro, Erwachsene in Begleitung frei.",
            },
            {
              key: "f",
              label: "Podcast selbst machen",
              body: "Wochenendkurs, Samstag und Sonntag je 6 Stunden. Technik wird gestellt. 120 Euro, Ermäßigung für Studierende auf 70 Euro.",
            },
            {
              key: "g",
              label: "Schachclub",
              body: "Dienstags ab 19 Uhr im Bürgerhaus. Turniere einmal im Quartal. Mitgliedsbeitrag 60 Euro im Jahr, Jugendliche zahlen die Hälfte.",
            },
            {
              key: "h",
              label: "Filmabend im Hof",
              body: "Freitags im Sommer, Beginn bei Dunkelheit. Eintritt frei, Spenden erwünscht. Bei Regen fällt der Abend ersatzlos aus.",
            },
            {
              key: "i",
              label: "Malkurs für Anfänger",
              body: "Zehn Termine donnerstags 17 bis 19 Uhr. Material inklusive. 180 Euro, Anmeldung bis zum Vormonatsende erforderlich.",
            },
            {
              key: "j",
              label: "Laufgruppe für Wiedereinsteiger",
              body: "Sonntags 9 Uhr am Waldparkplatz. Tempo langsam, Strecken bis 6 Kilometer. Kostenlos, einfach dazukommen.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-04-l3-13",
              no: 13,
              text: "Frau Alt möchte fotografieren lernen, hat aber nur ihr Handy und kein Geld dafür übrig.",
              answer: "a",
              explain:
                "(a) hem ücretsiz hem de telefon kameralarını açıkça kabul ediyor. (f) de medya kursu ama 120 euro ve indirimli hâli bile 70 euro; para ölçütünde düşüyor.",
            },
            {
              kind: "match",
              id: "de-b1-04-l3-14",
              no: 14,
              text: "Herr Pirlo singt gern, kann aber keine Noten lesen und arbeitet bis 18 Uhr.",
              answer: "b",
              explain:
                "(b) provalar saat 20'de, yani mesai sonrası, ve \"Notenkenntnisse nicht nötig\" diyor. İki ölçütü birlikte karşılayan tek ilan bu.",
            },
            {
              kind: "match",
              id: "de-b1-04-l3-15",
              no: 15,
              text: "Frau Demir ist in Rente und sucht am Vormittag Gesellschaft und Gespräche über Bücher.",
              answer: "c",
              explain:
                "(c) ayın ilk salısı 10–12 arası, yani sabah, ve konusu kitap. Öteki ilanların hepsi öğleden sonra ya da akşam başlıyor.",
            },
            {
              kind: "match",
              id: "de-b1-04-l3-16",
              no: 16,
              text: "Herr Wieland hat ein defektes Radio und möchte es nicht wegwerfen.",
              answer: "d",
              explain:
                "(d) ortak onarım buluşması ve radyoları açıkça sayıyor; işçilik ücretsiz, yalnız yedek parça ödeniyor.",
            },
            {
              kind: "match",
              id: "de-b1-04-l3-17",
              no: 17,
              text: "Familie Söz sucht am Sonntagnachmittag etwas für ihre fünfjährige Tochter.",
              answer: "e",
              explain:
                "(e) cumartesi ve pazar 15.00'te, 4 yaş üstü için. Refakatçi yetişkin ücret ödemiyor, bu da aileye uyuyor.",
            },
            {
              kind: "match",
              id: "de-b1-04-l3-18",
              no: 18,
              text: "Jonas studiert und will an einem Wochenende lernen, wie man Audio produziert.",
              answer: "f",
              explain:
                "(f) hafta sonu kursu, teknik veriliyor ve öğrenciler için ücret 70 euroya iniyor. (a) da medyayla ilgili ama fotoğraf, ses değil.",
            },
            {
              kind: "match",
              id: "de-b1-04-l3-19",
              no: 19,
              text: "Frau Weber hat lange keinen Sport gemacht und möchte ohne Druck wieder anfangen.",
              answer: "j",
              explain:
                "(j) doğrudan yeniden başlayanlar için: tempo yavaş, mesafe 6 kilometreye kadar, ücretsiz ve kayıt gerektirmiyor.",
            },
          ],
        },
        {
          id: "de-b1-04-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Schulen Handys ganz verbieten?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Okullar telefonu tamamen yasaklamalı mı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Handyverbot an Schulen — ja oder nein?",
              body: `Rasim T.: Ich unterrichte seit zwanzig Jahren und war lange der Meinung, man müsse den Kindern beibringen, damit umzugehen. Nach zwei Jahren mit Schließfächern muss ich zugeben: In den Pausen wird wieder gespielt und gestritten, nicht gescrollt. Ich habe mich geirrt.

Frau Ackermann: Meine Tochter hat Diabetes und liest ihre Werte am Handy ab. Jedes Mal, wenn ein Verbot kommt, muss ich das erklären, und jedes Mal fällt jemandem eine Ausnahme ein, die nicht funktioniert. Regelt erst die Ausnahmen, dann sprecht über Verbote.

Kenan Y.: Ich bin selbst noch Schüler. Klar nervt es, wenn im Unterricht jemand am Handy hängt. Aber ein Verbot bringt nur Kontrolle und Streit. In meiner Klasse haben wir eine Regel gemacht: Handys in die Box, freiwillig. Das läuft seit einem Jahr besser als jedes Verbot.

Herr Löffler: Man hört immer, dass Verbote nichts bringen. Die Zahlen sagen etwas anderes: An unserer Schule sind die Konflikte in den Pausen seit dem Verbot deutlich zurückgegangen. Ich verstehe die Einwände, aber ich lasse mir das Ergebnis nicht wegreden.

Sina B.: Ich habe zuerst applaudiert, als es hieß, die Geräte kommen weg. Dann ist meinem Sohn auf dem Heimweg etwas passiert und er konnte niemanden erreichen, weil das Handy noch im Schrank lag. Seitdem finde ich: nicht so.

Frau Dr. Ünal: Als Kinderärztin sehe ich täglich Kinder, die nachts nicht schlafen, weil sie um zwei Uhr noch Nachrichten lesen. Das Problem beginnt zu Hause, nicht in der Schule. Wer glaubt, ein Schulverbot löse das, verschiebt die Verantwortung nur.

Bernd K.: Ich bin Hausmeister und sammle die Geräte am Morgen ein. Ehrlich: Es ist Arbeit, und am Anfang habe ich geflucht. Aber der Lärm im Haus ist ein anderer geworden, und die Kinder grüßen wieder. Für die zwanzig Minuten am Tag mache ich das gern weiter.`,
              gloss: [
                { de: "das Schließfach", tr: "kilitli dolap", en: "locker" },
                { de: "sich irren", tr: "yanılmak", en: "to be mistaken" },
                { de: "der Einwand", tr: "itiraz", en: "objection" },
                { de: "die Verantwortung verschieben", tr: "sorumluluğu başkasına atmak", en: "to shift responsibility" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-04-l4-20",
              no: 20,
              ref: "f1",
              text: "Rasim T.",
              options: ["Dagegen.", "Dafür."],
              answer: 1,
              explain:
                "Uzun süre karşı olduğunu yazıyor, ama iki yıllık deneyimden sonra \"Ich habe mich geirrt\" diyor. Yorumun tutumu geçmiş görüşünde değil, bu itirafta.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l4-21",
              no: 21,
              ref: "f1",
              text: "Frau Ackermann",
              options: ["Dagegen.", "Dafür."],
              answer: 0,
              explain:
                "Kızının sağlık verisi telefonda ve istisnaların işlemediğini söylüyor: \"Regelt erst die Ausnahmen, dann sprecht über Verbote\". Sıralamayı tersine çeviren bir ret.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l4-22",
              no: 22,
              ref: "f1",
              text: "Kenan Y.",
              options: ["Dagegen.", "Dafür."],
              answer: 0,
              explain:
                "Derste telefonun rahatsız ettiğini kabul ediyor, ama çözümü gönüllü kutuda görüyor: \"Das läuft seit einem Jahr besser als jedes Verbot\". Sorunu kabul etmek yasağı kabul etmek değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l4-23",
              no: 23,
              ref: "f1",
              text: "Herr Löffler",
              options: ["Dagegen.", "Dafür."],
              answer: 1,
              explain:
                "Yasak sonrası teneffüs kavgalarının belirgin biçimde azaldığını söylüyor ve \"ich lasse mir das Ergebnis nicht wegreden\" diyor. İtirazları anlaması tutumunu değiştirmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l4-24",
              no: 24,
              ref: "f1",
              text: "Sina B.",
              options: ["Dagegen.", "Dafür."],
              answer: 0,
              explain:
                "Başta alkışladığını yazıyor, sonra oğluna dönüş yolunda bir şey oluyor ve kimseye ulaşamıyor. \"Seitdem finde ich: nicht so\" tutumu tersine çeviriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l4-25",
              no: 25,
              ref: "f1",
              text: "Frau Dr. Ünal",
              options: ["Dagegen.", "Dafür."],
              answer: 0,
              explain:
                "Sorunun evde başladığını söylüyor ve okul yasağının \"verschiebt die Verantwortung nur\" olduğunu ekliyor. Yani telefonun zararını görmesi yasağı desteklediği anlamına gelmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l4-26",
              no: 26,
              ref: "f1",
              text: "Bernd K.",
              options: ["Dagegen.", "Dafür."],
              answer: 1,
              explain:
                "Toplama işinin zahmetli olduğunu ve başta söylendiğini yazıyor, ama sonucu olumlu buluyor: \"mache ich das gern weiter\". Şikâyet, ret demek değil.",
            },
          ],
        },
        {
          id: "de-b1-04-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Benutzungsordnung und die Aufgaben 27 bis 30. Wählen Sie: a, b oder c.",
          promptTr: "Kullanım yönergesini ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Benutzungsordnung",
              genreTr: "Kullanım yönergesi",
              title: "Benutzungsordnung der Stadtbibliothek",
              body: `1. Ausweis
Der Bibliotheksausweis ist persönlich und nicht übertragbar. Für Kinder unter zwölf Jahren unterschreibt eine erziehungsberechtigte Person. Der Verlust ist sofort zu melden; für Entleihungen bis zur Meldung haftet die Inhaberin oder der Inhaber.

2. Leihfrist
Bücher vier Wochen, Zeitschriften eine Woche, Filme und Spiele zwei Wochen. Eine Verlängerung um dieselbe Frist ist zweimal möglich, jedoch nicht, wenn das Medium vorgemerkt ist.

3. Säumnisgebühr
Nach Ablauf der Frist werden 0,20 Euro pro Medium und Tag berechnet, höchstens 10 Euro pro Medium. Die Gebühr entsteht auch dann, wenn die Bibliothek geschlossen war.

4. Arbeitsplätze
Die Computer im Lesesaal stehen ohne Anmeldung zur Verfügung, bei starkem Andrang jedoch nur 60 Minuten. Gruppenräume sind vorher zu buchen und werden nach fünfzehn Minuten wieder freigegeben, wenn niemand erschienen ist.

5. Veranstaltungen
Lesungen sind kostenlos, eine Karte ist trotzdem nötig. Nicht abgeholte Karten verfallen zehn Minuten vor Beginn und gehen an Wartende.`,
              gloss: [
                { de: "übertragbar", tr: "devredilebilir", en: "transferable" },
                { de: "vormerken", tr: "rezerve etmek", en: "to reserve" },
                { de: "die Säumnisgebühr", tr: "gecikme ücreti", en: "late fee" },
                { de: "der Andrang", tr: "yoğunluk, izdiham", en: "rush, high demand" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-04-l5-27",
              no: 27,
              ref: "o1",
              text: "Sie haben Ihren Ausweis verloren und ihn erst nach drei Tagen gemeldet. Wer haftet für Entleihungen in diesen Tagen?",
              options: [
                "Sie selbst.",
                "Niemand, weil der Ausweis gestohlen wurde.",
                "Die Bibliothek trägt in diesem Fall das Risiko.",
              ],
              answer: 0,
              explain:
                "Madde 1 tam bu aralığı düzenliyor: \"für Entleihungen bis zur Meldung haftet die Inhaberin oder der Inhaber\". Yani bildirime kadar sorumluluk kart sahibinde.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l5-28",
              no: 28,
              ref: "o1",
              text: "Sie haben einen Film ausgeliehen, den jemand anderes vorgemerkt hat. Können Sie verlängern?",
              options: [
                "Ja, aber nur einmal statt zweimal.",
                "Ja, wenn Sie vor Ablauf der Frist verlängern.",
                "Nein.",
              ],
              answer: 2,
              explain:
                "Uzatma hakkı iki kez var, ama madde 2 bir istisna koyuyor: \"jedoch nicht, wenn das Medium vorgemerkt ist\". Rezervasyon uzatmayı tamamen kapatıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l5-29",
              no: 29,
              ref: "o1",
              text: "Ein Buch ist zwölf Tage überfällig. Wie viel zahlen Sie?",
              options: ["10,00 Euro, weil das die Obergrenze ist.", "2,40 Euro.", "Nichts, wenn die Bibliothek geschlossen war."],
              answer: 1,
              explain:
                "Günlük 0,20 euro × 12 gün = 2,40 euro; üst sınır olan 10 euroya daha çok var. Kapalı günler de sayılıyor, o yüzden üçüncü şık da yanlış.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-l5-30",
              no: 30,
              ref: "o1",
              text: "Sie haben einen Gruppenraum gebucht, kommen aber 20 Minuten zu spät. Was gilt?",
              options: [
                "Der Raum kann bereits vergeben sein.",
                "Sie müssen eine Gebühr von 10 Euro zahlen.",
                "Der Raum wird für Sie bis zum Ende der Buchung freigehalten.",
              ],
              answer: 0,
              explain:
                "Madde 4'e göre oda kimse gelmezse 15 dakika sonra serbest bırakılıyor. 20 dakikalık gecikme bu sınırın dışında; 10 euro ise gecikme ücretinin üst sınırı, oda kuralıyla ilgisi yok.",
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
        "Dieser Teil hat vier Aufgaben. Sie hören Durchsagen, ein Beratungsgespräch, einen Vortrag und eine Diskussion.",
      instructionTr:
        "Bu bölümde dört görev var. Anonslar, bir danışma görüşmesi, bir sunum ve bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-b1-04-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Ansage im Kino",
              genreTr: "Sinemada anons",
              situation: "Seans değişikliği duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, der Film in Saal drei beginnt heute zwanzig Minuten später, also erst um zwanzig Uhr fünfzig. Grund ist eine technische Störung am Projektor. Ihre Karten bleiben gültig. Wer nicht warten möchte, tauscht sie an der Kasse gegen eine Karte für eine andere Vorstellung in dieser Woche.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Hinweis im Radio",
              genreTr: "Radyoda duyuru",
              situation: "Bir kültür programının değişikliği anlatılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis für unsere Hörerinnen und Hörer: Die Sendung Stadtgespräch läuft ab Oktober nicht mehr sonntags, sondern donnerstags um neunzehn Uhr. Die Länge bleibt gleich. Wer die Sendung verpasst, findet sie wie bisher eine Woche lang in unserer Mediathek, neu aber auch als Text zum Nachlesen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Bir dernek üyesine bilgi bırakıyor.",
              plays: 1,
              segments: [
                {
                  text: "Hallo Herr Malik, hier ist Sabine vom Fotoclub. Der Kurs am Samstag findet statt, aber nicht im Vereinsheim, sondern im Jugendzentrum am Park. Bringen Sie bitte eigene Speicherkarten mit, wir haben nur zwei. Wenn Sie kein Stativ haben, ist das kein Problem, wir leihen Ihnen eins.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Durchsage im Museum",
              genreTr: "Müzede anons",
              situation: "Kapanış ve sergi bilgisi veriliyor.",
              plays: 1,
              segments: [
                {
                  text: "Sehr geehrte Besucherinnen und Besucher, das Museum schließt in dreißig Minuten. Die Sonderausstellung im Untergeschoss ist bereits geschlossen. Wir bitten Sie, große Taschen weiterhin in den Schließfächern zu lassen; die Fächer öffnen sich automatisch, wenn Sie das Haus verlassen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Durchsage im Schwimmbad",
              genreTr: "Yüzme havuzunda anons",
              situation: "Bir kulvarın kapatılması duyuruluyor.",
              plays: 1,
              segments: [
                {
                  text: "Liebe Gäste, die Bahnen eins und zwei sind ab jetzt für den Schwimmkurs reserviert, voraussichtlich bis achtzehn Uhr. Die übrigen Bahnen bleiben frei. Das Sprungbecken ist heute wegen einer Reparatur gesperrt; wir hoffen, dass es morgen wieder benutzbar ist.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-04-h1-1",
              no: 1,
              ref: "h1",
              text: "Wer nicht warten will, kann die Karte umtauschen.",
              answer: true,
              explain:
                "Anons seçeneği veriyor: \"tauscht sie an der Kasse gegen eine Karte für eine andere Vorstellung in dieser Woche\". Para iadesinden ise hiç söz edilmiyor; değişim ile iade aynı şey değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h1-2",
              no: 2,
              ref: "h1",
              text: "Warum beginnt der Film später?",
              options: [
                "Weil noch Karten an der Kasse verkauft werden.",
                "Weil der vorherige Film länger dauert.",
                "Wegen einer technischen Störung.",
              ],
              answer: 2,
              explain:
                "Gerekçe anonsta: \"eine technische Störung am Projektor\". Kasa ve önceki film bu kayıtta hiç geçmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Sendung wird ab Oktober an einem anderen Wochentag ausgestrahlt.",
              answer: true,
              explain:
                "Program pazardan perşembeye alınıyor, saat 19.00. Süresi değişmiyor, değişen yalnız gün.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h1-4",
              no: 4,
              ref: "h2",
              text: "Was ist neu am Angebot der Mediathek?",
              options: [
                "Die Sendung steht dort jetzt auch als Text.",
                "Die Sendung bleibt dort jetzt einen Monat.",
                "Die Sendung ist dort jetzt kostenpflichtig.",
              ],
              answer: 0,
              explain:
                "Yenilik açıkça işaretleniyor: \"neu aber auch als Text zum Nachlesen\". Süre bir hafta olarak kalıyor, ücretten hiç söz edilmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h1-5",
              no: 5,
              ref: "h3",
              text: "Herr Malik muss ein eigenes Stativ mitbringen.",
              answer: false,
              explain:
                "Mesaj tersini söylüyor: tripodu yoksa sorun değil, kulüp ödünç veriyor. Getirmesi istenen şey başka: \"Bringen Sie bitte eigene Speicherkarten mit\".",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h1-6",
              no: 6,
              ref: "h3",
              text: "Was hat sich beim Kurs geändert?",
              options: ["Der Termin.", "Der Ort.", "Die Kursleitung."],
              answer: 1,
              explain:
                "Kurs cumartesi yapılıyor, yani tarih aynı. Değişen yer: \"nicht im Vereinsheim, sondern im Jugendzentrum am Park\".",
            },
            {
              kind: "bool",
              id: "de-b1-04-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Sonderausstellung kann noch dreißig Minuten besucht werden.",
              answer: false,
              explain:
                "Otuz dakika müzenin tamamı için geçerli. Alt kattaki özel sergi için \"ist bereits geschlossen\" deniyor, yani çoktan kapanmış.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h1-8",
              no: 8,
              ref: "h4",
              text: "Was passiert mit den Schließfächern?",
              options: [
                "Sie müssen vor dem Verlassen geleert werden.",
                "Sie werden vom Personal einzeln geöffnet.",
                "Sie gehen beim Verlassen von selbst auf.",
              ],
              answer: 2,
              explain:
                "Anons \"die Fächer öffnen sich automatisch, wenn Sie das Haus verlassen\" diyor. Yani ne personel açıyor ne de önceden boşaltma isteniyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h1-9",
              no: 9,
              ref: "h5",
              text: "Bis 18 Uhr sind alle Bahnen für den Kurs reserviert.",
              answer: false,
              explain:
                "Yalnız 1 ve 2 numaralı kulvarlar ayrılıyor; anons \"Die übrigen Bahnen bleiben frei\" diye ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h1-10",
              no: 10,
              ref: "h5",
              text: "Was gilt für das Sprungbecken?",
              options: [
                "Es ist heute gesperrt, morgen wohl wieder offen.",
                "Es ist ab achtzehn Uhr wieder benutzbar.",
                "Es bleibt bis auf Weiteres geschlossen.",
              ],
              answer: 0,
              explain:
                "Onarım nedeniyle bugün kapalı ve anons yarın için umut belirtiyor. Saat 18 kurs kulvarlarına ait, atlama havuzuna değil.",
            },
          ],
        },
        {
          id: "de-b1-04-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Beratungsgespräch. Wählen Sie zu den Aufgaben 11 bis 15: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir danışma görüşmesi dinleyeceksin. 11–15. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "b1",
              genre: "Beratungsgespräch im Kulturzentrum",
              genreTr: "Kültür merkezinde danışma",
              situation: "Bir baba çocuğu için etkinlik arıyor.",
              plays: 2,
              segments: [
                { speaker: "Beraterin", text: "Sie suchen etwas für Ihren Sohn. Wie alt ist er denn?" },
                { speaker: "Herr Rana", text: "Elf. Er zeichnet den ganzen Tag, aber in einen Kurs will er nicht." },
                { speaker: "Beraterin", text: "Warum nicht, wissen Sie das?" },
                {
                  speaker: "Herr Rana",
                  text: "Er sagt, dann muss er malen, was jemand anders sich ausgedacht hat. Zu Hause macht er lieber seine eigenen Sachen.",
                },
                {
                  speaker: "Beraterin",
                  text: "Dann wäre unser offenes Atelier besser als ein Kurs. Freitags von sechzehn bis neunzehn Uhr, man kommt und geht, wie man will. Eine Betreuerin ist da, aber sie gibt keine Aufgaben.",
                },
                { speaker: "Herr Rana", text: "Das klingt gut. Kostet das etwas?" },
                {
                  speaker: "Beraterin",
                  text: "Fünf Euro pro Nachmittag, Material inklusive. Wer regelmäßig kommt, nimmt besser die Karte für zehn Termine: vierzig Euro.",
                },
                { speaker: "Herr Rana", text: "Und muss ich ihn anmelden?" },
                {
                  speaker: "Beraterin",
                  text: "Für das Atelier nicht. Nur bei der Ausstellung im Juni, da brauchen wir die Namen vorher. Die Teilnahme ist aber freiwillig.",
                },
                { speaker: "Herr Rana", text: "Er wird fragen, ob er seine eigenen Stifte mitbringen darf." },
                {
                  speaker: "Beraterin",
                  text: "Natürlich. Nur Spraydosen nicht, das haben wir nach einem Vorfall im letzten Jahr geändert.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-04-h2-11",
              no: 11,
              ref: "b1",
              text: "Warum will der Sohn nicht in einen Kurs?",
              options: [
                "Weil er dort nach fremden Vorgaben arbeiten müsste.",
                "Weil er lieber allein zu Hause bleibt.",
                "Weil ihm die Kurse zu teuer sind.",
              ],
              answer: 0,
              explain:
                "Babası çocuğun sözünü aktarıyor: kursta \"was jemand anders sich ausgedacht hat\" çizmek zorunda kalıyor. Fiyat ve yalnızlık gerekçe olarak geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h2-12",
              no: 12,
              ref: "b1",
              text: "Was ist das Besondere am offenen Atelier?",
              options: [
                "Es findet an mehreren Tagen in der Woche statt.",
                "Es ist für Kinder unter zwölf Jahren kostenlos.",
                "Es gibt eine Betreuung, aber keine Aufgaben.",
              ],
              answer: 2,
              explain:
                "Danışman ayrımı açıkça yapıyor: bir sorumlu var ama \"sie gibt keine Aufgaben\". Atölye yalnız cuma günleri ve ücretsiz değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h2-13",
              no: 13,
              ref: "b1",
              text: "Was kostet die Karte für zehn Termine?",
              options: ["Fünf Euro.", "Vierzig Euro.", "Fünfzig Euro."],
              answer: 1,
              explain:
                "On seanslık kart 40 euro. 5 euro tek seansın ücreti, 50 ise on seansın tek tek ödenmiş hâli — yani kart 10 euro tasarruf ettiriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h2-14",
              no: 14,
              ref: "b1",
              text: "Wofür ist eine Anmeldung nötig?",
              options: ["Für jeden einzelnen Atelierbesuch am Freitag.", "Für gar nichts.", "Für die Ausstellung im Juni."],
              answer: 2,
              explain:
                "Atölye için kayıt gerekmiyor: \"Für das Atelier nicht. Nur bei der Ausstellung im Juni\". Sergiye katılım da zorunlu değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h2-15",
              no: 15,
              ref: "b1",
              text: "Was darf nicht mitgebracht werden?",
              options: ["Eigene Stifte.", "Eigenes Papier.", "Spraydosen."],
              answer: 2,
              explain:
                "Kendi kalemleri serbest; yasak tek bir şeyde: \"Nur Spraydosen nicht\", gerekçesi de geçen yılki bir olay. Kâğıt hiç konuşulmuyor.",
            },
          ],
        },
        {
          id: "de-b1-04-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Sind die Aussagen 16 bis 22 richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir sunum dinleyeceksin. 16–22. ifadeler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              situation: "Bir medya eğitmeni velilere ekran süresini anlatıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Herr Doğan",
                  text: "Guten Abend. Ich werde heute nicht sagen, wie viele Minuten Bildschirmzeit richtig sind. Diese Zahl gibt es nicht, und wer sie Ihnen nennt, verkauft Ihnen etwas.",
                },
                {
                  speaker: "Herr Doğan",
                  text: "Wichtiger als die Dauer ist die Frage, was das Gerät ersetzt. Eine Stunde Video statt einer Stunde Langeweile ist etwas anderes als eine Stunde Video statt einer Stunde Schlaf.",
                },
                {
                  speaker: "Herr Doğan",
                  text: "Wir haben in unserer Beratung 600 Familien gefragt. Bei zwei Dritteln gab es Streit um die Geräte. In fast allen diesen Familien gab es keine feste Regel, sondern eine Verhandlung jeden Tag neu.",
                },
                {
                  speaker: "Herr Doğan",
                  text: "Feste Regeln wirken, aber nur wenn sie für alle gelten. Wenn der Vater beim Essen Nachrichten liest, hilft keine Regel für das Kind.",
                },
                {
                  speaker: "Herr Doğan",
                  text: "Zum Alter: Vor drei Jahren empfahlen wir, Kindern erst ab vierzehn ein eigenes Smartphone zu geben. Heute sagen wir das nicht mehr so, weil die Kinder ohne Gerät aus den Klassengruppen fallen. Wir raten stattdessen zu einem Gerät mit klaren Grenzen.",
                },
                {
                  speaker: "Herr Doğan",
                  text: "Ein letzter Punkt: Kontrolle per App funktioniert kurzfristig. Nach unserer Erfahrung finden Jugendliche den Weg daran vorbei im Schnitt in weniger als vier Wochen. Gespräche halten länger als Sperren.",
                },
                {
                  speaker: "Herr Doğan",
                  text: "Ich lasse Ihnen einen Zettel da mit drei Fragen, die Sie zu Hause stellen können. Antworten stehen nicht darauf, das wäre auch falsch.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-04-h3-16",
              no: 16,
              ref: "v1",
              text: "Herr Doğan nennt eine feste Zahl für die tägliche Bildschirmzeit.",
              answer: false,
              explain:
                "Sunumun ilk cümlesi bunu reddediyor: \"Diese Zahl gibt es nicht, und wer sie Ihnen nennt, verkauft Ihnen etwas\".",
            },
            {
              kind: "bool",
              id: "de-b1-04-h3-17",
              no: 17,
              ref: "v1",
              text: "Für ihn ist wichtiger, was die Bildschirmzeit verdrängt.",
              answer: true,
              explain:
                "Karşılaştırmayı kendisi kuruyor: bir saat video can sıkıntısının yerine geçerse başka, uykunun yerine geçerse başka bir şey.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h3-18",
              no: 18,
              ref: "v1",
              text: "In etwa der Hälfte der befragten Familien gab es Streit um die Geräte.",
              answer: false,
              explain:
                "Oran yarı değil: 600 ailenin üçte ikisinde tartışma var. Bu, yaklaşık 400 aile demek.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h3-19",
              no: 19,
              ref: "v1",
              text: "Regeln wirken nur, wenn sich auch die Eltern daran halten.",
              answer: true,
              explain:
                "Koşulu açıkça koyuyor: kurallar herkes için geçerli olmalı, yoksa \"hilft keine Regel für das Kind\". Örneği de sofrada haber okuyan baba.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h3-20",
              no: 20,
              ref: "v1",
              text: "Er empfiehlt weiterhin, das erste Smartphone erst mit vierzehn zu geben.",
              answer: false,
              explain:
                "Bu tavsiye 3 yıl öncesine ait; bugün sınıf gruplarının dışında kalma riski yüzünden \"sagen wir das nicht mehr so\" diyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h3-21",
              no: 21,
              ref: "v1",
              text: "Kontroll-Apps wirken nach seiner Erfahrung nur eine begrenzte Zeit.",
              answer: true,
              explain:
                "Deneyimini sayıyla veriyor: gençler ortalama 4 haftadan kısa sürede engeli aşıyor. Bu yüzden \"Gespräche halten länger als Sperren\" diyor.",
            },
            {
              kind: "bool",
              id: "de-b1-04-h3-22",
              no: 22,
              ref: "v1",
              text: "Auf seinem Zettel stehen Fragen und passende Antworten.",
              answer: false,
              explain:
                "Kâğıtta yalnız üç soru var; cevap yok ve bunu bilerek yapıyor: \"das wäre auch falsch\".",
            },
          ],
        },
        {
          id: "de-b1-04-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 23 bis 30: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. 23–30. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "İki konuk küçük sinemaların geleceğini tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Braucht eine Stadt wie unsere noch ein kleines Kino, wenn alles zu Hause läuft? Frau Reuter, Sie führen das Kino am Wall.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Ich werde nicht behaupten, dass wir gegen Streaming gewinnen. Wir gewinnen nur, wenn wir etwas anbieten, das zu Hause nicht geht: ein Publikum. Bei uns kommen zu Diskussionsabenden dreimal so viele Leute wie zum gleichen Film ohne Gespräch.",
                },
                { speaker: "Moderator", text: "Herr Bartel, Sie haben Ihr Kino vor zwei Jahren geschlossen." },
                {
                  speaker: "Herr Bartel",
                  text: "Ja, und ich habe genau das versucht, was Frau Reuter beschreibt. Es hat funktioniert — nur nicht oft genug. Zwölf gute Abende im Jahr tragen kein Haus mit dreihundert Plätzen und einer alten Heizung.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Das ist der Punkt, in dem ich Ihnen zustimme. Die Größe entscheidet. Wir haben achtzig Plätze, und deshalb reicht uns, was Ihnen nicht gereicht hat.",
                },
                {
                  speaker: "Moderator",
                  text: "Wäre eine Förderung durch die Stadt die Lösung?",
                },
                {
                  speaker: "Herr Bartel",
                  text: "Wir hatten eine. Sie kam jedes Jahr im Herbst und wurde jedes Jahr neu diskutiert. Man kann kein Programm für zwei Jahre planen, wenn man im Oktober nicht weiß, ob man im Januar noch da ist.",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Deshalb halte ich die Höhe der Förderung für zweitrangig. Entscheidend ist, dass sie über mehrere Jahre zugesagt wird.",
                },
                {
                  speaker: "Herr Bartel",
                  text: "Da sind wir uns einig. Was ich zusätzlich fordere: Die Stadt soll den Saal nicht nur bezahlen, sondern selbst nutzen — für Schulen, Vereine, Sitzungen. Ein Haus, das leer steht, stirbt auch mit Geld.",
                },
                {
                  speaker: "Moderator",
                  text: "Frau Reuter, wäre das für Sie akzeptabel?",
                },
                {
                  speaker: "Frau Reuter",
                  text: "Mehr als das, ich mache es längst. Vormittags sind bei uns Schulklassen, das zahlt einen Teil der Miete. Ehrlich gesagt hätte ich ohne diese Vormittage vor drei Jahren aufgehört.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-04-h4-23",
              no: 23,
              ref: "d1",
              text: "Worin sieht Frau Reuter den Vorteil des Kinos gegenüber dem Streaming?",
              options: [
                "In der besseren Bild- und Tonqualität der Vorführung.",
                "Im niedrigeren Preis pro Film für die Zuschauer.",
                "Im gemeinsamen Publikum.",
              ],
              answer: 2,
              explain:
                "Evde olmayan şeyi adlandırıyor: \"ein Publikum\". Kanıtı da veriyor — tartışmalı akşamlara aynı filmin sıradan gösterimine göre üç kat fazla kişi geliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-24",
              no: 24,
              ref: "d1",
              text: "Warum hat Herr Bartel sein Kino geschlossen?",
              options: [
                "Weil die guten Abende zu selten waren.",
                "Weil er das Konzept von Frau Reuter nie versucht hat.",
                "Weil das Publikum die Diskussionsabende abgelehnt hat.",
              ],
              answer: 0,
              explain:
                "Denemiş ve işe yaramış, ama \"nur nicht oft genug\": yılda 12 iyi akşam 300 koltuklu bir binayı taşımıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-25",
              no: 25,
              ref: "d1",
              text: "Worin stimmen die beiden überein?",
              options: [
                "Dass Streaming das Kino insgesamt verdrängen wird.",
                "Dass die Größe des Hauses entscheidend ist.",
                "Dass Diskussionsabende sich finanziell nie lohnen.",
              ],
              answer: 1,
              explain:
                "Frau Reuter bunu doğrudan söylüyor: \"Die Größe entscheidet\" — 80 koltuk için yeten şey 300 koltuk için yetmiyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-26",
              no: 26,
              ref: "d1",
              text: "Was war das Problem mit der Förderung in Herrn Bartels Fall?",
              options: [
                "Sie war zu niedrig, um die Kosten zu decken.",
                "Sie wurde erst nach der Schließung bewilligt.",
                "Sie war jedes Jahr neu unsicher.",
              ],
              answer: 2,
              explain:
                "Sorun tutar değil öngörülebilirlik: destek \"kam jedes Jahr im Herbst und wurde jedes Jahr neu diskutiert\", ekimde ocak belli olmuyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-27",
              no: 27,
              ref: "d1",
              text: "Was hält Frau Reuter bei der Förderung für zweitrangig?",
              options: [
                "Die Höhe des Betrags.",
                "Den Zeitpunkt der Auszahlung im Jahr.",
                "Die Frage, wer den Antrag stellt.",
              ],
              answer: 0,
              explain:
                "\"halte ich die Höhe der Förderung für zweitrangig\" diyor; belirleyici bulduğu şey desteğin birkaç yıl için taahhüt edilmesi.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-28",
              no: 28,
              ref: "d1",
              text: "Was fordert Herr Bartel zusätzlich von der Stadt?",
              options: [
                "Dass sie die Eintrittspreise für Schüler übernimmt.",
                "Dass sie den Saal selbst nutzt.",
                "Dass sie ein neues Kino baut.",
              ],
              answer: 1,
              explain:
                "Talebi para değil kullanım: salon okullar, dernekler ve toplantılar için kullanılsın. Gerekçesi de \"Ein Haus, das leer steht, stirbt auch mit Geld\".",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-29",
              no: 29,
              ref: "d1",
              text: "Wie reagiert Frau Reuter auf diesen Vorschlag?",
              options: [
                "Sie lehnt ihn ab, weil ihr Saal dafür zu klein ist.",
                "Sie hält ihn für theoretisch richtig, aber nicht umsetzbar.",
                "Sie setzt ihn schon um.",
              ],
              answer: 2,
              explain:
                "\"Mehr als das, ich mache es längst\" diyor: sabahları okul sınıfları geliyor ve bu kiranın bir bölümünü karşılıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-04-h4-30",
              no: 30,
              ref: "d1",
              text: "Was sagt Frau Reuter über die Vormittage mit Schulklassen?",
              options: [
                "Ohne sie hätte sie das Kino früher aufgegeben.",
                "Sie kosten mehr, als sie einbringen.",
                "Sie sind erst seit diesem Jahr möglich.",
              ],
              answer: 0,
              explain:
                "Son cümlesi açık: bu sabahlar olmasaydı 3 yıl önce bırakacaktı. Yani kazandırmayan değil, ayakta tutan bir gelir.",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine private Nachricht, einen Forumsbeitrag und eine halb offizielle Nachricht.",
      instructionTr: "Bu bölümde üç görev var: özel bir ileti, bir forum yazısı ve yarı resmî bir ileti.",
      tasks: [
        {
          id: "de-b1-04-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie hatten mit Ihrem Freund Nils Karten für ein Konzert. Sie müssen kurzfristig absagen, weil Sie am selben Abend arbeiten müssen. Schreiben Sie ihm (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Nils ile konser biletlerin vardı. Aynı akşam çalışmak zorunda kaldığın için son anda iptal etmen gerekiyor. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Sagen Sie ab und entschuldigen Sie sich.", tr: "İptal ettiğini söyle ve özür dile." },
              { de: "Erklären Sie den Grund.", tr: "Nedenini açıkla." },
              { de: "Schlagen Sie vor, was mit Ihrer Karte passieren soll.", tr: "Biletinle ne yapılacağına dair öneride bulun." },
              { de: "Machen Sie einen neuen Vorschlag für ein Treffen.", tr: "Yeni bir buluşma öner." },
            ],
            sample: `Lieber Nils,

es tut mir wirklich leid, aber ich kann am Freitag nicht zum Konzert kommen.

Meine Kollegin ist krank geworden und ich muss ihre Schicht übernehmen. Ich habe versucht zu tauschen, aber im Moment ist niemand da.

Meine Karte kannst du gern weitergeben. Wenn du willst, frag Elif — sie mag die Band auch. Das Geld brauchst du mir nicht zurückzugeben.

Wollen wir stattdessen am Sonntag zusammen essen gehen? Dann erzählst du mir, wie es war.

Liebe Grüße
Sara`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "İptal açıkça ve baştan söylendi mi, yoksa metnin içinde mi kaldı?",
              "Gerekçe inandırıcı ve somut mu?",
              "Bilet için gerçek bir çözüm önerildi mi?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı, yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-04-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "In einem Online-Forum wird diskutiert: \"Sollen Museen für junge Leute kostenlos sein?\" Schreiben Sie einen Beitrag (circa 80 Wörter). Nennen Sie Ihre Meinung, ein Argument dafür und ein Argument dagegen.",
          promptTr:
            "Bir çevrimiçi forumda tartışılıyor: \"Müzeler gençler için ücretsiz mi olmalı?\" Bir yorum yaz (yaklaşık 80 kelime). Görüşünü, bir destekleyici ve bir karşı argüman söyle.",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie Ihre Meinung klar.", tr: "Görüşünü açıkça söyle." },
              { de: "Geben Sie ein Argument dafür.", tr: "Lehte bir gerekçe ver." },
              { de: "Geben Sie ein Argument dagegen.", tr: "Aleyhte bir gerekçe ver." },
              { de: "Ziehen Sie ein Fazit.", tr: "Bir sonuca bağla." },
            ],
            sample: `Ich bin dafür, aber nicht ohne Bedingung.

Für den freien Eintritt spricht, dass viele junge Leute ein Museum zum ersten Mal betreten müssen, bevor sie wissen, ob es ihnen gefällt. Zehn Euro sind für Schüler eine hohe Hürde für ein Experiment.

Dagegen spricht, dass die Häuser das Geld brauchen. Bei uns wurde eine Stelle gestrichen, und seitdem gibt es kaum noch Führungen.

Mein Fazit: Der Eintritt sollte frei sein, aber die Stadt muss den Ausfall ersetzen. Sonst spart man an genau dem, was das Museum interessant macht.`,
            criteria: [
              "Görüş ilk cümlelerde net söylenmiş mi?",
              "Lehte ve aleyhte birer gerekçe gerçekten ayrı ayrı verilmiş mi?",
              "Gerekçeler somut mu (sayı, örnek, kendi deneyimi)?",
              "Sonuç iki gerekçeyle tutarlı mı, yoksa birini görmezden mi geliyor?",
              "Forum yazısına uygun bir ton ve yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-04-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben einen Fotokurs der Volkshochschule bezahlt. Nach dem zweiten von zehn Terminen wurde der Kurs abgesagt. Schreiben Sie an die Volkshochschule (circa 40 Wörter).",
          promptTr:
            "Halk eğitim merkezinin fotoğraf kursunu ödedin. On dersin ikincisinden sonra kurs iptal edildi. Halk eğitim merkezine yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Nennen Sie Kurs, Kursnummer und Zeitraum.", tr: "Kursu, numarasını ve dönemi belirt." },
              { de: "Beschreiben Sie, was passiert ist.", tr: "Ne olduğunu anlat." },
              { de: "Fordern Sie eine Rückerstattung oder einen Ersatztermin.", tr: "İade ya da telafi talebinde bulun." },
            ],
            sample: `Sehr geehrte Damen und Herren,

ich bin für den Fotokurs F-214 im Frühjahrssemester angemeldet und habe 180 Euro bezahlt. Nach dem zweiten von zehn Terminen wurde der Kurs ohne Angabe von Gründen abgesagt.

Ich bitte Sie, mir acht Termine zu erstatten oder einen Ersatzkurs anzubieten.

Mit freundlichen Grüßen
Kaan Aslan`,
            criteria: [
              "Kurs somut tanımlanmış mı? (ad, numara, dönem, ödenen tutar)",
              "Kaç dersin yapıldığı ve kaçının yapılmadığı açık mı?",
              "Talep net mi ve iki seçenekten en az biri adlandırılmış mı?",
              "Resmî hitap ve veda doğru mu, yaklaşık 40 kelime mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, ein Thema präsentieren und auf ein Problem reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte planlama, bir konuyu sunma ve bir soruna tepki verme.",
      tasks: [
        {
          id: "de-b1-04-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam einen Filmabend für Ihre Nachbarschaft. Sprechen Sie über: Ort — Termin — Film — Technik — Werbung.",
          promptTr:
            "Mahalleniz için birlikte bir film akşamı planlayın. Şunları konuşun: yer — tarih — film — teknik — duyuru.",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen den Filmabend. Wo sollen wir das machen? Im Hof ist es schön, aber bei Regen fällt alles aus.",
              tr: "Film akşamını birlikte planlıyoruz. Nerede yapalım? Avlu güzel ama yağmurda her şey iptal olur.",
            },
            { who: "you", hint: "Bir yer öner ve yağmur sorununa da değin.", expect: "bir yer önermek ve olası bir engele çözüm sunmak", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Beim Film habe ich zwei Ideen: eine Komödie für alle oder einen Dokumentarfilm über unser Viertel.",
              tr: "Anlaştık. Film için iki fikrim var: herkese uygun bir komedi ya da mahallemizle ilgili bir belgesel.",
            },
            {
              who: "you",
              hint: "İki seçenekten birini seç ve tercihini gerekçelendir.",
              expect: "iki seçenek arasında karşılaştırmalı bir tercih yapmak",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Gut. Bleibt die Technik. Ich habe einen Beamer, aber keine Lautsprecher, und ohne Ton wird es schwierig.",
              tr: "Peki. Geriye teknik kaldı. Bende projeksiyon var ama hoparlör yok, sessiz de olmaz.",
            },
            { who: "you", hint: "Ses sorununa somut bir çözüm öner.", expect: "somut bir teknik çözüm önermek", seconds: 40 },
            {
              who: "partner",
              de: "Und wie erfahren die Leute davon? Ein Aushang im Treppenhaus reicht wahrscheinlich nicht.",
              tr: "Peki insanlar bunu nasıl duyacak? Merdivendeki bir ilan herhalde yetmez.",
            },
            {
              who: "you",
              hint: "En az iki duyuru yolu öner ve işleri paylaş.",
              expect: "birden çok duyuru yolu önermek ve görev paylaşımı yapmak",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneri sunmak ve gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara karşılık vermek" },
              { de: "Aufgaben verteilen", tr: "İşleri paylaşmak" },
            ],
            sample:
              "Ich schlage den Hof vor, aber wir fragen vorher den Hausmeister, ob wir bei Regen in den Gemeinschaftsraum können. Ich wäre für den Dokumentarfilm, weil dann auch die älteren Nachbarn kommen und danach etwas zu erzählen haben. Für den Ton können wir meine Musikbox nehmen, die ist laut genug für dreißig Leute. Und bei der Werbung machen wir beides: Zettel in allen Briefkästen und eine Nachricht in der Hausgruppe. Ich übernehme die Zettel, wenn du die Nachricht schreibst.",
            criteria: [
              "Beş noktanın hepsi konuşuldu mu?",
              "Öneriler gerekçelendirildi mi? (weil, damit, deshalb)",
              "Karşı tarafın engellerine (yağmur, hoparlör) gerçekten çözüm üretildi mi?",
              "En az bir karşılaştırma yapıldı mı? (lieber … als, besser für …)",
              "İşler sonunda paylaşıldı mı?",
            ],
          },
        },
        {
          id: "de-b1-04-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag zum Thema \"Freizeit früher und heute\". Gliedern Sie: Einleitung — Situation in Ihrem Heimatland — eigene Erfahrung — Vorteile und Nachteile — Ihre Meinung.",
          promptTr:
            "\"Eskiden ve bugün boş zaman\" konusunda kısa bir sunum yap. Şu sırayı izle: giriş — kendi ülkendeki durum — kendi deneyimin — artılar ve eksiler — kendi görüşün.",
          prepSeconds: 60,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "Einleitung und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Situation im Heimatland", tr: "Kendi ülkendeki durum" },
              { de: "eigene Erfahrung", tr: "Kendi deneyimin" },
              { de: "Vorteile und Nachteile", tr: "Artılar ve eksiler" },
              { de: "eigene Meinung mit Begründung", tr: "Gerekçeli kendi görüşün" },
            ],
            sample:
              "Ich möchte heute über Freizeit sprechen: zuerst wie es bei uns früher war, dann meine eigene Erfahrung, danach Vor- und Nachteile und am Ende meine Meinung. In meiner Heimat haben sich die Leute früher abends auf der Straße getroffen, ohne Verabredung. Man ist einfach hinausgegangen und jemand war da. Heute schreibt man vorher, und wer nicht antwortet, kommt nicht. Ich selbst habe als Kind jeden Sommer draußen Fußball gespielt; meine Nichte spielt heute online mit Freunden in drei Ländern. Ein Vorteil ist, dass Entfernung keine Rolle mehr spielt. Ein Nachteil ist, dass Zufall fast unmöglich geworden ist. Meiner Meinung nach haben wir mehr Auswahl, aber weniger Überraschung.",
            criteria: [
              "Beş bölümün hepsi var mı ve sırayla mı?",
              "Giriş sunumun yapısını duyuruyor mu?",
              "Kendi deneyimi somut mu (yaş, yer, ne yapıldığı)?",
              "En az bir artı ve bir eksi karşılaştırmalı biçimde verildi mi?",
              "Görüş gerekçeli mi ve önceki bölümlerle tutarlı mı?",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-04-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf ein Problem. Ihre Nachbarin beschwert sich, dass Ihre Musik am Abend zu laut ist. Sie üben aber für eine Prüfung an der Musikschule.",
          promptTr:
            "Bir soruna tepki ver. Komşun akşamları müziğinin çok yüksek olduğundan yakınıyor. Ama sen müzik okulundaki bir sınav için çalışıyorsun.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Entschuldigen Sie, aber ich muss etwas ansprechen: Ihre Musik am Abend ist wirklich laut. Ich höre jeden Ton bis in mein Schlafzimmer.",
              tr: "Kusura bakmayın ama bir şey söylemem gerek: akşamları müziğiniz gerçekten yüksek. Her sesi yatak odama kadar duyuyorum.",
            },
            {
              who: "you",
              hint: "Şikâyeti ciddiye al ve durumu açıkla.",
              expect: "bir şikâyeti kabul etmek ve kendi durumunu açıklamak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Das verstehe ich, eine Prüfung ist wichtig. Aber ich stehe um fünf Uhr auf. Bis elf Uhr abends geht das so nicht weiter.",
              tr: "Anlıyorum, sınav önemli. Ama ben beşte kalkıyorum. Akşam on bire kadar bu böyle sürmez.",
            },
            {
              who: "you",
              hint: "Somut bir uzlaşma öner: saat, süre ya da yer.",
              expect: "somut bir uzlaşma önerisi yapmak (saat, süre ya da yer)",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Das wäre ein Anfang. Und was ist am Wochenende? Da hätte ich gern wenigstens einen ruhigen Vormittag.",
              tr: "Bu bir başlangıç olur. Peki hafta sonu? En azından bir sabah sessizlik isterim.",
            },
            {
              who: "you",
              hint: "Hafta sonu için de bir düzen öner ve anlaşmayı özetle.",
              expect: "anlaşmayı hafta sonuna genişletmek ve sonucu özetlemek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 3,
            points: [
              { de: "die Beschwerde ernst nehmen", tr: "Şikâyeti ciddiye almak" },
              { de: "die eigene Lage erklären", tr: "Kendi durumunu açıklamak" },
              { de: "einen Kompromiss finden", tr: "Bir uzlaşmaya varmak" },
            ],
            sample:
              "Es tut mir leid, das wusste ich nicht. Ich habe im Juni Prüfung und übe deshalb jeden Abend. Mein Vorschlag: Ich höre ab neun Uhr auf und übe dafür schon ab sechs. Wenn es trotzdem zu laut ist, kann ich zwei Abende in der Woche in der Musikschule üben. Am Wochenende fange ich sonntags erst nach elf an, dann haben Sie Ihren ruhigen Vormittag. Wäre das so in Ordnung für Sie?",
            criteria: [
              "Şikâyet savunmaya geçmeden kabul edildi mi?",
              "Kendi durumu açıklandı ama bahane olarak kullanılmadı mı?",
              "Uzlaşma somut mu (saat, gün, yer)?",
              "Anlaşma sonunda özetlendi ve karşı tarafa onaylatıldı mı?",
            ],
          },
        },
      ],
    },
  ],
};
