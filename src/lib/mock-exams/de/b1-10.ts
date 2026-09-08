import type { MockPaper } from "../types";

/**
 * B1 · Deneme 10 — "Technik im Alltag".
 *
 * PLAN kâğıt 1–9 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 ana fikir · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karma · 5 üç şıklı · 7 R/F · 8 görüş)
 *   Schreiben 60 dk           80 + 80 + 40 kelime
 *   Sprechen  15 dk           birlikte planlama · kısa sunum · sorun çözme
 *
 * KONU SEÇİMİ: gündelik teknoloji. B1-02 medyayı tüketim olarak ele alıyordu;
 * burada konu araç: online form, uygulama, sözleşme, kapanan şube. B1'in
 * ölçtüğü tutum bu alanda somut bir soruya bağlanıyor — bir hizmetin yalnız
 * çevrimiçi sunulması kimi dışarıda bırakır?
 *
 * FORUM DENGESİ baştan planlandı. Bu görevde şıklar `Dafür.` ve `Dagegen.`
 * olduğu için `Dagegen` her zaman uzun şıktır: anahtar bir tarafa kayınca
 * denetim hem konum hem uzunluk uyarısı veriyor. B1-09'da bu iki uyarı birden
 * çıkmıştı; burada dağılım 4/3 ve sıralama dönüşümlü.
 */
export const B1_10: MockPaper = {
  id: "de-b1-10",
  course: "de",
  level: "B1",
  no: 10,
  theme: "Technik im Alltag",
  themeTr: "Gündelik teknoloji",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Bericht, kurze Texte, Anzeigen, Forumsbeiträge und Nutzungsregeln.",
      instructionTr:
        "Bu bölümde beş görev var. Bir haber metni, kısa metinler, ilanlar, forum yorumları ve kullanım kuralları okuyacaksın.",
      tasks: [
        {
          id: "de-b1-10-l1",
          no: 1,
          format: "truefalse",
          goal: "detail",
          prompt: "Lesen Sie den Bericht und die Aufgaben 1 bis 6. Sind die Aussagen richtig oder falsch?",
          promptTr: "Haber metnini ve 1–6. maddeleri oku. İfadeler doğru mu yanlış mı?",
          texts: [
            {
              kind: "text",
              id: "r1",
              genre: "Zeitungsbericht",
              genreTr: "Gazete haberi",
              title: "Als die Bank ging, kam der Tisch",
              body: `Als die letzte Bankfiliale in Ostheim schloss, war die häufigste Frage nicht, wo man Geld abhebt.

Die häufigste Frage war, wer beim Überweisen hilft. Viele Ältere hatten Formulare am Schalter ausgefüllt, nicht am Bildschirm.

Ein halbes Jahr später steht dienstags ein Tisch in der Bücherei. Daran sitzen zwei Ehrenamtliche und beantworten Fragen zu Konten, Apps und Passwörtern.

"Wir machen nichts für die Leute", sagt Rita Kaufmann, die den Tisch organisiert. "Wir setzen uns daneben und lassen sie tippen."

Das Angebot war zuerst für zehn Wochen gedacht. Inzwischen läuft es seit drei Jahren.

Einfach ist es nicht. Am Tisch geht es oft um Geld, und die Ehrenamtlichen dürfen keine Zugangsdaten sehen. Wer das nicht einhält, verliert die Erlaubnis der Gemeinde.

Auch die Erwartungen sind unterschiedlich. Manche kommen mit einer konkreten Frage, andere möchten vor allem, dass jemand zuhört.

"Wir lösen nicht das Problem der Bank", sagt Frau Kaufmann. "Wir machen nur sichtbar, wie viele es haben."`,
              gloss: [
                { de: "die Filiale", tr: "şube", en: "branch" },
                { de: "überweisen", tr: "havale yapmak", en: "to transfer money" },
                { de: "die Zugangsdaten", tr: "giriş bilgileri", en: "login details" },
                { de: "einhalten", tr: "uymak", en: "to comply with" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-10-l1-1",
              no: 1,
              ref: "r1",
              text: "Die häufigste Frage betraf das Überweisen.",
              answer: true,
              explain:
                "Metin iki soruyu karşılaştırıyor: para çekmek değil, \"Die häufigste Frage war, wer beim Überweisen hilft\".",
            },
            {
              kind: "bool",
              id: "de-b1-10-l1-2",
              no: 2,
              ref: "r1",
              text: "Die Ehrenamtlichen erledigen die Bankgeschäfte für die Gäste.",
              answer: false,
              explain:
                "Frau Kaufmann tam tersini söylüyor: \"Wir machen nichts für die Leute … Wir setzen uns daneben und lassen sie tippen.\"",
            },
            {
              kind: "bool",
              id: "de-b1-10-l1-3",
              no: 3,
              ref: "r1",
              text: "Das Angebot läuft länger als ursprünglich geplant.",
              answer: true,
              explain:
                "İki süre karşılaştırılıyor: başlangıçta on hafta düşünülmüş, \"Inzwischen läuft es seit drei Jahren\".",
            },
            {
              kind: "bool",
              id: "de-b1-10-l1-4",
              no: 4,
              ref: "r1",
              text: "Die Ehrenamtlichen dürfen die Passwörter der Gäste sehen.",
              answer: false,
              explain:
                "Kural açıkça yasaklıyor: \"die Ehrenamtlichen dürfen keine Zugangsdaten sehen\", uymayan izni kaybediyor.",
            },
            {
              kind: "bool",
              id: "de-b1-10-l1-5",
              no: 5,
              ref: "r1",
              text: "Nicht alle Gäste kommen mit einer konkreten Frage.",
              answer: true,
              explain:
                "İki beklenti ayrılıyor: bazıları belirli bir soruyla geliyor, \"andere möchten vor allem, dass jemand zuhört\".",
            },
            {
              kind: "bool",
              id: "de-b1-10-l1-6",
              no: 6,
              ref: "r1",
              text: "Frau Kaufmann meint, der Tisch löse das Problem der Bankschließung.",
              answer: false,
              explain:
                "Kapanış cümlesi bunu sınırlıyor: \"Wir lösen nicht das Problem der Bank. Wir machen nur sichtbar, wie viele es haben.\"",
            },
          ],
        },
        {
          id: "de-b1-10-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die sechs Texte. Was ist die Kernaussage? Wählen Sie a, b oder c.",
          promptTr: "Altı metni oku. Ana ileti ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "E-Mail eines Anbieters",
              genreTr: "Sağlayıcıdan e-posta",
              body: `Sehr geehrte Frau Nolde,

Ihr Vertrag verlängert sich am 1. März automatisch um zwölf Monate.

Wenn Sie das nicht möchten, kündigen Sie bitte bis zum 31. Januar. Eine Kündigung per Telefon nehmen wir nicht an.

Der monatliche Preis steigt ab März um zwei Euro.`,
              gloss: [
                { de: "sich verlängern", tr: "kendiliğinden uzamak", en: "to renew automatically" },
                { de: "kündigen", tr: "fesihi bildirmek", en: "to give notice" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "Aushang in der Bücherei",
              genreTr: "Kütüphanedeki duyuru",
              body: `Die Handy-Sprechstunde findet ab Februar nicht mehr montags, sondern dienstags statt.

Wir helfen bei Fotos, Kontakten und Videoanrufen. Fragen zu Geld und Konten beantworten wir nicht.

Bringen Sie bitte Ihr eigenes Gerät und Ihr Passwort mit — wir tippen nichts für Sie ein.`,
            },
            {
              kind: "text",
              id: "t3",
              genre: "Nachricht in der Nachbarschaftsgruppe",
              genreTr: "Mahalle grubundaki mesaj",
              body: `Falls jemand einen alten Drucker braucht: Ich gebe meinen ab, er funktioniert einwandfrei.

Papier und Kabel sind dabei, Patronen leider nicht. Die neuen kosten fast so viel wie ein Gerät.

Abholung bis Sonntag, danach bringe ich ihn zum Wertstoffhof.`,
              gloss: [
                { de: "einwandfrei", tr: "kusursuz", en: "flawless" },
                { de: "die Patrone", tr: "kartuş", en: "cartridge" },
              ],
            },
            {
              kind: "text",
              id: "t4",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Die Zahl der Anträge, die im Landkreis online gestellt werden, ist auf sechzig Prozent gestiegen.

Bei Anträgen, die eine Unterschrift verlangen, liegt der Anteil dagegen bei unter zehn Prozent.

Die Verwaltung führt das darauf zurück, dass die digitale Unterschrift kaum jemand eingerichtet hat.`,
              gloss: [
                { de: "der Antrag", tr: "başvuru", en: "application" },
                { de: "die Unterschrift", tr: "imza", en: "signature" },
              ],
            },
            {
              kind: "text",
              id: "t5",
              genre: "Aushang im Hausflur",
              genreTr: "Apartman girişindeki duyuru",
              body: `Ab Mai öffnet die Haustür auch mit dem Handy.

Wer möchte, bekommt weiterhin einen Schlüssel — niemand muss die App benutzen.

Der Schlüssel für den Keller bleibt in jedem Fall aus Metall.`,
            },
            {
              kind: "text",
              id: "t6",
              genre: "Nachricht an den Kundendienst",
              genreTr: "Müşteri hizmetlerine ileti",
              body: `Ich habe am Montag online einen Termin gebucht und eine Bestätigung per Mail bekommen.

Heute stand in Ihrem Portal, der Termin existiere nicht. Ich war trotzdem da und wurde weggeschickt.

Ich hätte gern eine Erklärung und einen neuen Termin, möglichst diese Woche.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-10-l2-7",
              no: 7,
              ref: "t1",
              text: "Was ist die Kernaussage?",
              options: [
                "Der Vertrag endet automatisch im März.",
                "Wer aussteigen will, muss schriftlich kündigen.",
                "Der Preis bleibt zwölf Monate gleich.",
              ],
              answer: 1,
              explain:
                "Sözleşme kendiliğinden uzuyor; çıkmak isteyen ocak sonuna kadar bildirmeli ve \"Eine Kündigung per Telefon nehmen wir nicht an\".",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l2-8",
              no: 8,
              ref: "t2",
              text: "Was sagt der Aushang über die Sprechstunde?",
              options: [
                "Sie behandelt auch Fragen zum Konto.",
                "Sie findet ab Februar gar nicht mehr statt.",
                "Sie hat Grenzen beim Thema.",
              ],
              answer: 2,
              explain:
                "Duyuru neyi yaptığını ve neyi yapmadığını ayırıyor: fotoğraf ve görüntülü arama evet, \"Fragen zu Geld und Konten beantworten wir nicht\".",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l2-9",
              no: 9,
              ref: "t3",
              text: "Worum geht es in der Nachricht?",
              options: [
                "Ein Gerät wird verschenkt.",
                "Jemand sucht einen gebrauchten Drucker.",
                "Ein Gerät ist kaputt und wird entsorgt.",
              ],
              answer: 0,
              explain:
                "Yazar veriyor, aramıyor: \"Ich gebe meinen ab, er funktioniert einwandfrei\". Atık merkezi yalnız kimse almazsa devreye giriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l2-10",
              no: 10,
              ref: "t4",
              text: "Was ist die Hauptaussage?",
              options: [
                "Fast alle Anträge werden inzwischen online gestellt.",
                "Bei Unterschriften wird kaum online gearbeitet.",
                "Die Verwaltung lehnt digitale Anträge ab.",
              ],
              answer: 1,
              explain:
                "İki oran karşılaştırılıyor: genel olarak %60, imza gerektirenlerde \"unter zehn Prozent\" — sebep de dijital imzanın kurulmamış olması.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l2-11",
              no: 11,
              ref: "t5",
              text: "Was gilt ab Mai?",
              options: [
                "Alle Bewohner brauchen die App.",
                "Der Kellerschlüssel wird digital.",
                "Die App ist freiwillig.",
              ],
              answer: 2,
              explain:
                "Duyuru zorunluluğu açıkça dışlıyor: \"niemand muss die App benutzen\" ve isteyen anahtarını almaya devam ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l2-12",
              no: 12,
              ref: "t6",
              text: "Was möchte die Person?",
              options: [
                "Aufklärung und ein Ersatztermin.",
                "Das Geld für die Buchung zurück.",
                "Eine schriftliche Entschuldigung im Portal.",
              ],
              answer: 0,
              explain:
                "Son cümle iki şey istiyor: \"Ich hätte gern eine Erklärung und einen neuen Termin\". Paradan hiç söz edilmiyor.",
            },
          ],
        },
        {
          id: "de-b1-10-l3",
          no: 3,
          format: "match",
          goal: "orientation",
          prompt:
            "Die Personen 13 bis 19 suchen ein Angebot. Lesen Sie die Anzeigen a bis j. Welche Anzeige passt zu welcher Person? Jede Anzeige passt nur einmal. Drei Anzeigen passen zu niemandem.",
          promptTr:
            "13–19. kişiler bir hizmet arıyor. a–j ilanlarını oku. Hangi ilan hangi kişiye uyar? Her ilan yalnız bir kez kullanılır; üç ilan hiç kimseye uymaz.",
          options: [
            {
              key: "a",
              label: "Handy-Sprechstunde",
              body: "Dienstags 15 bis 17 Uhr in der Bücherei. Fotos, Kontakte, Videoanrufe. Keine Fragen zu Konten, eigenes Gerät mitbringen.",
            },
            {
              key: "b",
              label: "Vertragsberatung",
              body: "Wir prüfen Handy-, Strom- und Internetverträge und schreiben bei Bedarf die Kündigung. Mittwochs, Anmeldung nötig, 5 Euro.",
            },
            {
              key: "c",
              label: "Laptop-Werkstatt",
              body: "Wir reinigen, tauschen Festplatten und installieren neu. Ab 30 Euro, Dauer meist zwei Tage. Keine Datenrettung.",
            },
            {
              key: "d",
              label: "Datenrettung",
              body: "Fotos und Dateien von defekten Speichern. Preis erst nach Prüfung, Prüfung selbst kostenlos. Termine nach Absprache.",
            },
            {
              key: "e",
              label: "Gerätebibliothek",
              body: "Beamer, Bohrmaschine, Nähmaschine für bis zu eine Woche ausleihen. Jahresbeitrag 20 Euro, Ausweis nötig.",
            },
            {
              key: "f",
              label: "Online-Anträge — Hilfe am Amt",
              body: "Wir sitzen mit Ihnen am Rechner und füllen gemeinsam aus. Donnerstagvormittag im Bürgerbüro, ohne Anmeldung.",
            },
            {
              key: "g",
              label: "Alte Geräte abgeben",
              body: "Annahme von Fernsehern, Rechnern und Kabeln, samstags 9 bis 13 Uhr. Nur Privathaushalte, kostenlos.",
            },
            {
              key: "h",
              label: "Fotokurs für Anfänger",
              body: "Sechs Abende, eigenes Handy genügt. 45 Euro, Beginn im Oktober, höchstens zehn Teilnehmende.",
            },
            {
              key: "i",
              label: "Passwort-Sprechstunde",
              body: "Wir zeigen, wie man Passwörter sicher aufbewahrt. Wir sehen Ihre Daten nicht. Erster Montag im Monat, kostenlos.",
            },
            {
              key: "j",
              label: "Drucken und Scannen",
              body: "Kopieren, Drucken, Scannen und PDF erstellen. Mo bis Sa 9 bis 19 Uhr, 20 Cent pro Seite.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-10-l3-13",
              no: 13,
              text: "Frau Yalçın soll einen Antrag online stellen und traut sich nicht allein an den Rechner.",
              answer: "f",
              explain:
                "(f) tam bu durum için: \"Wir sitzen mit Ihnen am Rechner und füllen gemeinsam aus\" — üstelik randevu istemiyor.",
            },
            {
              kind: "match",
              id: "de-b1-10-l3-14",
              no: 14,
              text: "Herr Priebe zahlt seit Jahren für ein Internetpaket und weiß nicht, ob er noch aus dem Vertrag kommt.",
              answer: "b",
              explain:
                "(b) sözleşmeleri inceliyor ve gerekirse feshi kendisi yazıyor: \"schreiben bei Bedarf die Kündigung\".",
            },
            {
              kind: "match",
              id: "de-b1-10-l3-15",
              no: 15,
              text: "Frau Bräutigam hat die einzigen Fotos ihrer Hochzeit auf einer Karte, die nicht mehr gelesen wird.",
              answer: "d",
              explain:
                "(d) bozuk bellekten dosya kurtarıyor ve inceleme ücretsiz. (c) açıkça \"Keine Datenrettung\" diyor.",
            },
            {
              kind: "match",
              id: "de-b1-10-l3-16",
              no: 16,
              text: "Herr Krawczyk braucht für einen einzigen Abend einen Beamer und möchte keinen kaufen.",
              answer: "e",
              explain:
                "(e) cihazı bir haftaya kadar ödünç veriyor ve listede projeksiyon aleti adıyla geçiyor.",
            },
            {
              kind: "match",
              id: "de-b1-10-l3-17",
              no: 17,
              text: "Frau Nolde vergisst ständig ihre Passwörter und schreibt sie auf Zettel neben den Rechner.",
              answer: "i",
              explain:
                "(i) tam bu konuyu ele alıyor ve bir güvence veriyor: \"Wir sehen Ihre Daten nicht\".",
            },
            {
              kind: "match",
              id: "de-b1-10-l3-18",
              no: 18,
              text: "Herr Sommerfeld möchte seiner Enkelin am Wochenende Videoanrufe zeigen, kennt sich aber nicht aus.",
              answer: "a",
              explain:
                "(a) görüntülü aramayı adıyla sayıyor. Hesap soruları dışında kalıyor ama bu konu ona uyuyor.",
            },
            {
              kind: "match",
              id: "de-b1-10-l3-19",
              no: 19,
              text: "Frau Ostermann hat einen alten Fernseher im Keller und weiß nicht, wohin damit.",
              answer: "g",
              explain:
                "(g) televizyonu adıyla alıyor: \"Annahme von Fernsehern, Rechnern und Kabeln\" — özel haneler için ve ücretsiz.",
            },
          ],
        },
        {
          id: "de-b1-10-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen Ämter ihre Anträge nur noch online anbieten?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Kurumlar başvurularını yalnız çevrimiçi mi sunmalı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Nur noch online — ja oder nein?",
              body: `Ilja Krawczyk: Ich arbeite selbst im Bürgerbüro und bin dafür, obwohl es mich Arbeit kostet. Solange beide Wege offen sind, bleibt der langsame der Standard. Wer wirklich will, dass Papier verschwindet, muss einen Termin dafür setzen — und danach Hilfe anbieten, nicht vorher.

Rita Ostermann: Ich habe achtundzwanzig Jahre lang Formulare am Schalter ausgefüllt und komme mit dem Rechner gut zurecht. Trotzdem bin ich dagegen. Nicht wegen mir, sondern wegen der Leute, die ich am Dienstagstisch sehe. Für die ist «nur noch online» dasselbe wie «gar nicht mehr».

Marek Priebe: Die Debatte tut so, als ginge es um Technik. Es geht um Öffnungszeiten. Ich arbeite im Schichtdienst und war seit vier Jahren nicht im Amt, weil es zu meinen Zeiten zu hat. Ein Online-Antrag um halb elf abends ist für mich der Unterschied zwischen erledigt und nicht erledigt. Ich bin dafür.

Frau Bräutigam: Als Betreuerin schreibe ich Anträge für sieben Personen. Online geht das schneller, aber ich brauche für jede einzelne eine Vollmacht im System, und das dauert Wochen. Solange das so ist, bin ich dagegen — nicht grundsätzlich, sondern für den jetzigen Zustand.

Timo Sommerfeld: Mein Vater ist einundachtzig und hat nie einen Rechner benutzt. Trotzdem finde ich, dass Ämter online gehen sollten. Genau die Zeit, die am Schalter frei wird, könnte jemand für ihn aufwenden. Heute wartet er zwischen dreißig anderen, weil alle in derselben Schlange stehen.

Anna Nolde: Ich habe zweimal versucht, online einen Termin zu bekommen, und zweimal ist das Portal abgestürzt. Beim dritten Mal bin ich hingefahren. Bevor man den einen Weg schließt, muss der andere funktionieren. Deshalb bin ich dagegen.

Herr Yalçın: Ich bin dafür, mit einer Bedingung: Jedes Amt behält eine Stelle für Menschen ohne Zugang. Nicht als Ausnahme, sondern als feste Aufgabe mit einer Person, die dafür bezahlt wird. Ohne diese Stelle wäre ich dagegen.`,
              gloss: [
                { de: "der Standard", tr: "varsayılan, alışılmış yol", en: "default" },
                { de: "die Vollmacht", tr: "vekâletname", en: "power of attorney" },
                { de: "abstürzen", tr: "(sistem) çökmek", en: "to crash" },
                { de: "der Zugang", tr: "erişim", en: "access" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-10-l4-20",
              no: 20,
              ref: "f1",
              text: "Ilja Krawczyk",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Kendi işini zorlaştıracağını bildiği hâlde destekliyor: \"bin dafür, obwohl es mich Arbeit kostet\" — iki yol açıkken yavaş olanın varsayılan kaldığını söylüyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l4-21",
              no: 21,
              ref: "f1",
              text: "Rita Ostermann",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Bilgisayarla sorunu olmadığını söyleyip başkaları adına karşı çıkıyor: \"Nicht wegen mir, sondern wegen der Leute, die ich am Dienstagstisch sehe.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l4-22",
              no: 22,
              ref: "f1",
              text: "Marek Priebe",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Tartışmayı tekniğe değil çalışma saatine bağlıyor ve konumunu açıkça söylüyor: \"Ich bin dafür.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l4-23",
              no: 23,
              ref: "f1",
              text: "Frau Bräutigam",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Karşıtlığını bugüne bağlıyor: \"bin ich dagegen — nicht grundsätzlich, sondern für den jetzigen Zustand\", çünkü vekâletler haftalar alıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l4-24",
              no: 24,
              ref: "f1",
              text: "Timo Sommerfeld",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Bilgisayar kullanmayan babası olduğu hâlde lehinde: \"Genau die Zeit, die am Schalter frei wird, könnte jemand für ihn aufwenden\" — bugün babası otuz kişiyle aynı sırada bekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l4-25",
              no: 25,
              ref: "f1",
              text: "Anna Nolde",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendi denemesinden çıkarıyor: portal iki kez çökmüş, \"Bevor man den einen Weg schließt, muss der andere funktionieren.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l4-26",
              no: 26,
              ref: "f1",
              text: "Herr Yalçın",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Koşullu ama açık: \"Ich bin dafür, mit einer Bedingung\" — o kadro olmasa karşı olacağını da söylüyor.",
            },
          ],
        },
        {
          id: "de-b1-10-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Nutzungsregeln und die Aufgaben 27 bis 30. Wählen Sie a, b oder c.",
          promptTr: "Kullanım kurallarını ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Nutzungsregeln",
              genreTr: "Kullanım kuralları",
              title: "Gerätebibliothek Ostheim — Nutzungsregeln",
              body: `1. Anmeldung
Für die Ausleihe ist ein Jahresbeitrag von 20 Euro zu zahlen. Die Anmeldung erfolgt persönlich mit Ausweis; eine Anmeldung über das Internet ist nicht möglich.

2. Ausleihe
Geräte werden für höchstens sieben Tage ausgegeben. Eine Verlängerung ist einmal möglich, sofern niemand wartet. Wer verlängern will, meldet sich spätestens am letzten Tag.

3. Rückgabe
Geräte sind gereinigt zurückzugeben. Bei verspäteter Rückgabe berechnen wir zwei Euro je Tag, höchstens jedoch den Neupreis des Geräts.

4. Schäden
Schäden sind bei der Rückgabe zu melden. Wer einen Schaden meldet, zahlt einen Anteil von höchstens dreißig Euro. Wer ihn verschweigt, trägt die vollen Kosten der Reparatur.`,
              gloss: [
                { de: "die Ausleihe", tr: "ödünç verme", en: "lending" },
                { de: "die Verlängerung", tr: "süre uzatımı", en: "extension" },
                { de: "der Anteil", tr: "pay", en: "share" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-10-l5-27",
              no: 27,
              ref: "o1",
              text: "Wie meldet man sich an?",
              options: [
                "Über das Internet mit Ausweisnummer.",
                "Telefonisch nach Zahlung des Beitrags.",
                "Persönlich mit Ausweis.",
              ],
              answer: 2,
              explain:
                "Kural bir yolu açıp ötekini kapatıyor: kayıt bizzat yapılıyor, \"eine Anmeldung über das Internet ist nicht möglich\".",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l5-28",
              no: 28,
              ref: "o1",
              text: "Unter welcher Bedingung ist eine Verlängerung möglich?",
              options: [
                "Wenn niemand auf das Gerät wartet.",
                "Wenn man den Beitrag erhöht.",
                "Wenn das Gerät gereinigt ist.",
              ],
              answer: 0,
              explain:
                "Koşul ikinci maddede: uzatma bir kez ve \"sofern niemand wartet\" — üstelik son gün bildirilmeli.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l5-29",
              no: 29,
              ref: "o1",
              text: "Was gilt bei verspäteter Rückgabe?",
              options: [
                "Der Beitrag für das Jahr verfällt.",
                "Ein Tagessatz mit Obergrenze.",
                "Man wird für ein Jahr gesperrt.",
              ],
              answer: 1,
              explain:
                "Ücret ve üst sınır birlikte veriliyor: \"zwei Euro je Tag, höchstens jedoch den Neupreis des Geräts\".",
            },
            {
              kind: "mcq",
              id: "de-b1-10-l5-30",
              no: 30,
              ref: "o1",
              text: "Was passiert, wenn man einen Schaden verschweigt?",
              options: [
                "Man zahlt höchstens dreißig Euro.",
                "Man bekommt eine schriftliche Warnung.",
                "Man trägt die vollen Kosten.",
              ],
              answer: 2,
              explain:
                "Kural iki davranışı ayırıyor: bildiren en fazla otuz euro öder, \"Wer ihn verschweigt, trägt die vollen Kosten der Reparatur.\"",
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
        "Dieser Teil hat vier Aufgaben. Sie hören kurze Texte, ein Gespräch, einen Vortrag und eine Diskussion.",
      instructionTr:
        "Bu bölümde dört görev var. Kısa kayıtlar, bir konuşma, bir sunum ve bir tartışma dinleyeceksin.",
      tasks: [
        {
          id: "de-b1-10-h1",
          no: 1,
          format: "mixed",
          goal: "detail",
          prompt: "Sie hören fünf kurze Texte. Zu jedem Text gibt es zwei Aufgaben. Sie hören jeden Text einmal.",
          promptTr: "Beş kısa kayıt dinleyeceksin. Her kayıt için iki madde var. Her kaydı bir kez dinleyeceksin.",
          texts: [
            {
              kind: "audio",
              id: "h1",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Atölye veri kurtarma sonucunu bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Bräutigam, hier ist die Werkstatt. Wir konnten die Karte auslesen, aber nicht vollständig. Etwa zwei Drittel der Bilder sind da, der Rest ist verloren. Die Prüfung war kostenlos, die Rettung kostet neunzig Euro. Sagen Sie bitte Bescheid, ob wir weitermachen sollen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Çevrimiçi başvurular üzerine bir değerlendirme.",
              plays: 1,
              segments: [
                {
                  text: "Eine Auswertung aus dem Landkreis zeigt: Seit die Anträge auch online möglich sind, ist die Zahl der Anträge insgesamt gestiegen, nicht nur die der digitalen. Fachleute erklären das damit, dass viele Menschen einen Antrag vorher aus Zeitgründen gar nicht gestellt haben.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Sprachnachricht in der Hausgruppe",
              genreTr: "Bina grubunda sesli mesaj",
              situation: "Kapı sistemi değişiyor.",
              plays: 1,
              segments: [
                {
                  text: "Kurze Info zur Haustür: Ab Mai geht sie auch mit dem Handy auf. Wer keine App will, behält den Schlüssel, das ändert sich nicht. Wichtig ist nur: Wer die App nutzt, muss vorher einmal ins Büro, weil das Gerät dort freigeschaltet wird.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage in der Bücherei",
              genreTr: "Kütüphanede duyuru",
              situation: "Danışma saati taşınıyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis zur Handy-Sprechstunde: Sie findet ab Februar dienstags statt, nicht mehr montags. Der Raum bleibt derselbe. Bringen Sie bitte weiterhin Ihr eigenes Gerät mit — ohne Gerät können wir nichts zeigen.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Sözleşme feshi onaylanıyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Priebe, hier ist die Verbraucherberatung. Ihre Kündigung ist rechtzeitig eingegangen, das haben wir geprüft. Der Anbieter hat allerdings noch nicht bestätigt. Wenn bis Freitag nichts kommt, schreiben wir ihn noch einmal an.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-10-h1-1",
              no: 1,
              ref: "h1",
              text: "Alle Bilder konnten gerettet werden.",
              answer: false,
              explain:
                "Mesaj sınırı veriyor: \"Etwa zwei Drittel der Bilder sind da, der Rest ist verloren.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h1-2",
              no: 2,
              ref: "h1",
              text: "Was war kostenlos?",
              options: ["Die Rettung.", "Der ganze Auftrag.", "Die Prüfung."],
              answer: 2,
              explain:
                "İkisi ayrılıyor: \"Die Prüfung war kostenlos, die Rettung kostet neunzig Euro.\"",
            },
            {
              kind: "bool",
              id: "de-b1-10-h1-3",
              no: 3,
              ref: "h2",
              text: "Nur die Zahl der digitalen Anträge ist gestiegen.",
              answer: false,
              explain:
                "Haber bu daraltmayı açıkça reddediyor: \"die Zahl der Anträge insgesamt gestiegen, nicht nur die der digitalen\" — artış kâğıt başvurularda da var.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h1-4",
              no: 4,
              ref: "h2",
              text: "Wie erklären Fachleute den Anstieg?",
              options: [
                "Mit früher fehlender Zeit.",
                "Mit einer neuen Werbekampagne.",
                "Mit einfacheren Formularen.",
              ],
              answer: 0,
              explain:
                "Açıklama tek cümlede: birçok kişi başvuruyu daha önce \"aus Zeitgründen gar nicht gestellt\" etmemiş.",
            },
            {
              kind: "bool",
              id: "de-b1-10-h1-5",
              no: 5,
              ref: "h3",
              text: "Wer die App nutzen will, muss einmal ins Büro kommen.",
              answer: true,
              explain:
                "Tek koşul bu: \"Wer die App nutzt, muss vorher einmal ins Büro, weil das Gerät dort freigeschaltet wird.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h1-6",
              no: 6,
              ref: "h3",
              text: "Was passiert mit den Schlüsseln?",
              options: [
                "Sie werden im Mai eingesammelt.",
                "Sie gelten nur noch für den Keller.",
                "Sie bleiben für alle möglich.",
              ],
              answer: 2,
              explain:
                "Mesaj güvence veriyor: \"Wer keine App will, behält den Schlüssel, das ändert sich nicht.\"",
            },
            {
              kind: "bool",
              id: "de-b1-10-h1-7",
              no: 7,
              ref: "h4",
              text: "Die Sprechstunde findet ab Februar an einem anderen Tag statt.",
              answer: true,
              explain:
                "Değişen yalnız gün: \"ab Februar dienstags statt, nicht mehr montags\" — oda aynı kalıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h1-8",
              no: 8,
              ref: "h4",
              text: "Was ist weiterhin nötig?",
              options: [
                "Eine Anmeldung im Voraus.",
                "Das eigene Gerät.",
                "Ein Ausweis der Bücherei.",
              ],
              answer: 1,
              explain:
                "Duyuru gerekçesiyle hatırlatıyor: \"Bringen Sie bitte weiterhin Ihr eigenes Gerät mit — ohne Gerät können wir nichts zeigen.\"",
            },
            {
              kind: "bool",
              id: "de-b1-10-h1-9",
              no: 9,
              ref: "h5",
              text: "Der Anbieter hat die Kündigung schon bestätigt.",
              answer: false,
              explain:
                "Mesaj ikisini ayırıyor: fesih zamanında ulaşmış ama \"Der Anbieter hat allerdings noch nicht bestätigt.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h1-10",
              no: 10,
              ref: "h5",
              text: "Was geschieht, wenn bis Freitag nichts kommt?",
              options: [
                "Die Beratung schreibt erneut.",
                "Der Vertrag läuft weiter.",
                "Herr Priebe muss selbst anrufen.",
              ],
              answer: 0,
              explain:
                "Sonraki adım söyleniyor: \"Wenn bis Freitag nichts kommt, schreiben wir ihn noch einmal an.\"",
            },
          ],
        },
        {
          id: "de-b1-10-h2",
          no: 2,
          format: "mcq",
          goal: "detail",
          prompt: "Sie hören ein Beratungsgespräch. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir danışma görüşmesi dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "g1",
              genre: "Beratungsgespräch",
              genreTr: "Danışma görüşmesi",
              situation: "Bir müşteri sözleşmesi için tüketici danışmanlığına geliyor.",
              plays: 2,
              segments: [
                { speaker: "Beraterin", text: "Herr Priebe, Sie haben den Vertrag dabei. Er läuft seit vier Jahren, richtig?" },
                { speaker: "Herr Priebe", text: "Ja. Ich zahle achtunddreißig Euro im Monat und weiß gar nicht mehr, wofür." },
                {
                  speaker: "Beraterin",
                  text: "Das Grundpaket kostet vierundzwanzig. Der Rest sind Zusatzleistungen, die Sie damals dazugebucht haben. Die können Sie einzeln kündigen, ohne den ganzen Vertrag zu beenden.",
                },
                { speaker: "Herr Priebe", text: "Und wenn ich alles kündigen will?" },
                {
                  speaker: "Beraterin",
                  text: "Dann brauchen Sie die Frist. Nach dem ersten Jahr sind es bei Ihnen nur noch vier Wochen zum Monatsende. Das ist seit der Gesetzesänderung so.",
                },
                { speaker: "Herr Priebe", text: "Ich dachte, es sind drei Monate." },
                {
                  speaker: "Beraterin",
                  text: "Das galt für Verträge vor 2022. Ihrer ist neuer, das ist ein Vorteil für Sie.",
                },
                { speaker: "Herr Priebe", text: "Und die Erhöhung im März?" },
                {
                  speaker: "Beraterin",
                  text: "Bei einer Preiserhöhung haben Sie ein Sonderkündigungsrecht. Das gilt aber nur einen Monat nach der Ankündigung. Danach ist es weg.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-10-h2-11",
              no: 11,
              ref: "g1",
              text: "Wofür zahlt Herr Priebe die Differenz?",
              options: ["Für das Grundpaket.", "Für Zusatzleistungen.", "Für einen zweiten Vertrag."],
              answer: 1,
              explain:
                "İki tutar ayrılıyor: temel paket yirmi dört, kalanı \"Zusatzleistungen, die Sie damals dazugebucht haben\".",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h2-12",
              no: 12,
              ref: "g1",
              text: "Was kann er tun, ohne den Vertrag zu beenden?",
              options: [
                "Einzelne Leistungen kündigen.",
                "Den Preis neu verhandeln.",
                "Den Anbieter wechseln.",
              ],
              answer: 0,
              explain:
                "Danışman bu yolu gösteriyor: \"Die können Sie einzeln kündigen, ohne den ganzen Vertrag zu beenden.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h2-13",
              no: 13,
              ref: "g1",
              text: "Wie lang ist seine Kündigungsfrist?",
              options: ["Drei Monate.", "Ein Jahr.", "Vier Wochen."],
              answer: 2,
              explain:
                "İki süre karışıyor: üç ay 2022 öncesi sözleşmeler için, onunki \"nur noch vier Wochen zum Monatsende\".",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h2-14",
              no: 14,
              ref: "g1",
              text: "Wie bewertet die Beraterin das für ihn?",
              options: [
                "Als Nachteil gegenüber alten Verträgen.",
                "Als Vorteil.",
                "Als rechtlich unklar.",
              ],
              answer: 1,
              explain:
                "Kısa sürenin onun lehine olduğunu söylüyor: \"Ihrer ist neuer, das ist ein Vorteil für Sie.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h2-15",
              no: 15,
              ref: "g1",
              text: "Was gilt für das Sonderkündigungsrecht?",
              options: [
                "Es besteht bis zum Vertragsende.",
                "Es gilt nur einen Monat.",
                "Es gilt bei jeder Änderung.",
              ],
              answer: 1,
              explain:
                "Süre sınırlı ve sonrası kapanıyor: \"Das gilt aber nur einen Monat nach der Ankündigung. Danach ist es weg.\"",
            },
          ],
        },
        {
          id: "de-b1-10-h3",
          no: 3,
          format: "truefalse",
          goal: "detail",
          prompt: "Sie hören einen Vortrag. Sind die Aussagen richtig oder falsch? Sie hören den Text zweimal.",
          promptTr: "Bir sunum dinleyeceksin. İfadeler doğru mu yanlış mı? Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "v1",
              genre: "Vortrag",
              genreTr: "Sunum",
              situation: "Dijital erişim üzerine çalışan biri konuşuyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Ostermann",
                  text: "Ich begleite seit neun Jahren Menschen, die zum ersten Mal einen Online-Antrag stellen. Drei Beobachtungen überraschen fast jedes Publikum.",
                },
                {
                  speaker: "Frau Ostermann",
                  text: "Erstens: Das Alter erklärt weniger, als man denkt. Entscheidender ist, ob jemand im Beruf einen Rechner benutzt hat. Eine Siebzigjährige aus dem Büro kommt oft besser zurecht als ein Fünfzigjähriger vom Bau.",
                },
                {
                  speaker: "Frau Ostermann",
                  text: "Zweitens: Der häufigste Abbruch passiert nicht beim Ausfüllen, sondern beim Hochladen. Ein Foto vom Ausweis ist für viele die eigentliche Hürde.",
                },
                {
                  speaker: "Frau Ostermann",
                  text: "Drittens: Wer einmal Hilfe hatte, schafft den zweiten Antrag meistens allein. Bei uns sind es etwa drei von vier.",
                },
                {
                  speaker: "Frau Ostermann",
                  text: "Was Verwaltungen daraus lernen können: Eine gute Anleitung ersetzt keine Person. Aber eine Person am Anfang ersetzt viele Anleitungen später.",
                },
                {
                  speaker: "Frau Ostermann",
                  text: "Ein Hinweis zu den Kosten: Unsere Begleitung kostet pro Fall etwa zwölf Euro. Ein Antrag, der am Schalter bearbeitet wird, kostet die Verwaltung ein Vielfaches davon.",
                },
                {
                  speaker: "Frau Ostermann",
                  text: "Zum Schluss: Fangen Sie nicht mit dem schwierigsten Antrag an. Wer als Erstes das Wohngeld versucht, hört danach auf.",
                },
              ],
              gloss: [
                { de: "der Abbruch", tr: "yarıda bırakma", en: "drop-out" },
                { de: "hochladen", tr: "yüklemek", en: "to upload" },
                { de: "die Anleitung", tr: "kılavuz", en: "instructions" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-10-h3-16",
              no: 16,
              ref: "v1",
              text: "Nach Frau Ostermann erklärt das Alter den Erfolg am besten.",
              answer: false,
              explain:
                "İlk bulgu bunu reddediyor: \"Das Alter erklärt weniger, als man denkt\" — belirleyici olan meslekte bilgisayar kullanmış olmak.",
            },
            {
              kind: "bool",
              id: "de-b1-10-h3-17",
              no: 17,
              ref: "v1",
              text: "Der häufigste Abbruch passiert beim Hochladen.",
              answer: true,
              explain:
                "\"Der häufigste Abbruch passiert nicht beim Ausfüllen, sondern beim Hochladen\" — kimlik fotoğrafı asıl engel.",
            },
            {
              kind: "bool",
              id: "de-b1-10-h3-18",
              no: 18,
              ref: "v1",
              text: "Fast niemand schafft den zweiten Antrag allein.",
              answer: false,
              explain:
                "Sayı tersini söylüyor: bir kez yardım alanların \"etwa drei von vier\" ikinci başvuruyu tek başına yapıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-10-h3-19",
              no: 19,
              ref: "v1",
              text: "Sie hält eine Person am Anfang für wirksamer als viele Anleitungen.",
              answer: true,
              explain:
                "İki cümlelik sonucu: \"Eine gute Anleitung ersetzt keine Person. Aber eine Person am Anfang ersetzt viele Anleitungen später.\"",
            },
            {
              kind: "bool",
              id: "de-b1-10-h3-20",
              no: 20,
              ref: "v1",
              text: "Die Begleitung ist teurer als die Bearbeitung am Schalter.",
              answer: false,
              explain:
                "Karşılaştırma tersini veriyor: eşlik başına on iki euro, gişede işlenen başvuru idareye \"ein Vielfaches davon\" tutuyor.",
            },
            {
              kind: "bool",
              id: "de-b1-10-h3-21",
              no: 21,
              ref: "v1",
              text: "Sie rät, mit einem einfachen Antrag zu beginnen.",
              answer: true,
              explain:
                "Kapanış öğüdü: \"Fangen Sie nicht mit dem schwierigsten Antrag an\" — en zoruyla başlayan bırakıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-10-h3-22",
              no: 22,
              ref: "v1",
              text: "Frau Ostermann arbeitet seit weniger als fünf Jahren in diesem Bereich.",
              answer: false,
              explain:
                "İlk cümle süreyi veriyor: \"seit neun Jahren\" — beşten fazla.",
            },
          ],
        },
        {
          id: "de-b1-10-h4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt: "Sie hören eine Diskussion. Wählen Sie a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Radiodiskussion",
              genreTr: "Radyo tartışması",
              situation: "Şubelerin kapanması tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Kaufmann, Sie organisieren den Hilfstisch in der Bücherei. Ist die Bank schuld?" },
                {
                  speaker: "Frau Kaufmann",
                  text: "Schuld ist mir zu einfach. Die Filiale war die letzte im Ort, aber sie war auch fast leer. Das Problem ist nicht die Schließung, sondern dass niemand vorher gefragt hat, wer sie noch braucht.",
                },
                { speaker: "Moderatorin", text: "Herr Krawczyk, Sie arbeiten im Bürgerbüro. Kennen Sie das?" },
                {
                  speaker: "Herr Krawczyk",
                  text: "Sehr gut. Wir haben denselben Fehler gemacht, nur später. Wir haben die Öffnungszeiten gekürzt und gedacht, das Portal fängt es auf. Aufgefangen hat es der Tisch von Frau Kaufmann.",
                },
                { speaker: "Frau Kaufmann", text: "Das können wir nicht dauerhaft leisten. Wir sind zwei Leute und beide über siebzig." },
                {
                  speaker: "Herr Krawczyk",
                  text: "Das sehe ich auch so. Nur wäre eine bezahlte Stelle politisch schwer zu begründen, solange es ehrenamtlich läuft.",
                },
                { speaker: "Moderatorin", text: "Das klingt nach einem Widerspruch." },
                {
                  speaker: "Frau Kaufmann",
                  text: "Ist es auch. Wir halten das System am Laufen und machen dadurch unsichtbar, dass es nicht funktioniert.",
                },
                { speaker: "Moderatorin", text: "Was wäre die Lösung?" },
                {
                  speaker: "Herr Krawczyk",
                  text: "Eine feste Stunde pro Woche im Bürgerbüro, mit Personal. Das kostet weniger als ein zusätzlicher Schaltertag und hilft mehr.",
                },
                { speaker: "Frau Kaufmann", text: "Damit wäre mir geholfen. Ich höre nämlich im Sommer auf, und einen Nachfolger habe ich nicht." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-10-h4-23",
              no: 23,
              ref: "d1",
              text: "Wie antwortet Frau Kaufmann auf die Schuldfrage?",
              options: [
                "Sie gibt der Bank die Schuld.",
                "Sie gibt den Kunden die Schuld.",
                "Sie lehnt die Frage ab.",
              ],
              answer: 2,
              explain:
                "Soruyu reddediyor: \"Schuld ist mir zu einfach\" — sorunu kapanışa değil, önceden sorulmamış soruya bağlıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-24",
              no: 24,
              ref: "d1",
              text: "Worin sieht sie das eigentliche Problem?",
              options: [
                "Die fehlende Frage im Voraus.",
                "Dass die Filiale zu klein war.",
                "Dass die Miete zu hoch war.",
              ],
              answer: 0,
              explain:
                "\"dass niemand vorher gefragt hat, wer sie noch braucht\" — şube zaten neredeyse boşmuş.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-25",
              no: 25,
              ref: "d1",
              text: "Was räumt Herr Krawczyk ein?",
              options: [
                "Dass das Portal einwandfrei funktioniert.",
                "Dass sein Amt denselben Fehler machte.",
                "Dass die Bank deutlich besser geplant hat.",
              ],
              answer: 1,
              explain:
                "Kendi kurumunu da içine katıyor: \"Wir haben denselben Fehler gemacht, nur später.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-26",
              no: 26,
              ref: "d1",
              text: "Was hat die gekürzten Öffnungszeiten aufgefangen?",
              options: [
                "Das neue Online-Portal.",
                "Zusätzlich eingestelltes Personal.",
                "Der ehrenamtliche Tisch.",
              ],
              answer: 2,
              explain:
                "Beklenti ile gerçek ayrılıyor: portalın karşılayacağı sanılmış, \"Aufgefangen hat es der Tisch von Frau Kaufmann.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-27",
              no: 27,
              ref: "d1",
              text: "Warum ist eine bezahlte Stelle nach Herrn Krawczyk schwierig?",
              options: [
                "Weil das Geld dafür schlicht fehlt.",
                "Weil niemand sich bewerben würde.",
                "Weil der Bedarf unsichtbar bleibt.",
              ],
              answer: 2,
              explain:
                "Gerekçesi siyasi: gönüllüler işi yürüttüğü sürece kadro \"politisch schwer zu begründen\" oluyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-28",
              no: 28,
              ref: "d1",
              text: "Wie beschreibt Frau Kaufmann diesen Widerspruch?",
              options: [
                "Als Missverständnis der örtlichen Politik.",
                "Als Folge fehlender Werbung.",
                "Als selbst erzeugte Unsichtbarkeit.",
              ],
              answer: 2,
              explain:
                "Kendi rolünü de içeriyor: \"Wir halten das System am Laufen und machen dadurch unsichtbar, dass es nicht funktioniert.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-29",
              no: 29,
              ref: "d1",
              text: "Was schlägt Herr Krawczyk vor?",
              options: [
                "Einen zusätzlichen Schaltertag pro Woche.",
                "Eine feste Stunde mit Personal.",
                "Eine neue Bankfiliale im Ort.",
              ],
              answer: 1,
              explain:
                "Öneri ve karşılaştırma birlikte: \"Eine feste Stunde pro Woche im Bürgerbüro, mit Personal. Das kostet weniger als ein zusätzlicher Schaltertag.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-10-h4-30",
              no: 30,
              ref: "d1",
              text: "Warum ist die Frage für Frau Kaufmann dringend?",
              options: [
                "Weil sie im Sommer aufhört.",
                "Weil die Bücherei bald schließt.",
                "Weil die Kosten weiter steigen.",
              ],
              answer: 0,
              explain:
                "Son cümle aciliyeti veriyor: \"Ich höre nämlich im Sommer auf, und einen Nachfolger habe ich nicht.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 60,
      instruction: "Dieser Teil hat drei Aufgaben: eine Antwort, einen Beitrag und eine kurze halb offizielle Mail.",
      instructionTr: "Bu bölümde üç görev var: bir yanıt, bir yazı ve kısa bir yarı resmî e-posta.",
      tasks: [
        {
          id: "de-b1-10-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihr Freund Timo schlägt vor, dass Sie beide zusammen ein teures Werkzeug kaufen und es teilen. Sie sind unsicher. Schreiben Sie ihm (circa 80 Wörter).",
          promptTr:
            "Arkadaşın Timo pahalı bir aleti birlikte alıp paylaşmayı öneriyor. Kararsızsın. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Reagieren Sie auf den Vorschlag.", tr: "Öneriye karşılık ver." },
              { de: "Nennen Sie Ihre Bedenken.", tr: "Çekincelerini söyle." },
              { de: "Machen Sie einen anderen Vorschlag.", tr: "Başka bir öneri sun." },
              { de: "Fragen Sie nach seiner Meinung.", tr: "Onun görüşünü sor." },
            ],
            sample: `Hallo Timo,

die Idee gefällt mir grundsätzlich, teilen ist mir lieber als zweimal kaufen.

Zwei Dinge machen mir aber Sorgen. Erstens brauche ich so ein Gerät höchstens zweimal im Jahr, und dann meistens am Wochenende — also genau dann, wenn du es auch brauchst. Zweitens ist mir unklar, wer zahlt, wenn es kaputtgeht.

Wie wäre es, wenn wir es erst über die Gerätebibliothek probieren? Zwanzig Euro im Jahr, und wir sehen, wie oft wir wirklich hingehen.

Was meinst du dazu?

Viele Grüße
Sina`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Çekinceler somut mu (sıklık, çakışma, hasar), yoksa genel bir tereddüt mü?",
              "Karşı öneri gerçekçi ve denenebilir mi?",
              "Arkadaşa yazıldığı için `du` kullanıldı mı ve ton uygun mu?",
              "Yaklaşık 80 kelime var mı ve soru gerçekten sorulmuş mu?",
            ],
          },
        },
        {
          id: "de-b1-10-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Schreiben Sie einen Beitrag für das Gemeindeblatt: Was braucht es, damit auch Ältere Online-Angebote nutzen können? (circa 80 Wörter)",
          promptTr:
            "Belediye bülteni için bir yazı yaz: Yaşlıların da çevrimiçi hizmetleri kullanabilmesi için ne gerekiyor? (yaklaşık 80 kelime)",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie ein Beispiel aus Ihrer Erfahrung.", tr: "Kendi deneyiminden bir örnek ver." },
              { de: "Sagen Sie, was Ihrer Meinung nach am wichtigsten ist.", tr: "Sence en önemlisinin ne olduğunu söyle." },
              { de: "Nennen Sie etwas, das oft schiefgeht.", tr: "Sık sık ters giden bir şeyi söyle." },
              { de: "Geben Sie einen konkreten Rat.", tr: "Somut bir öneride bulun." },
            ],
            sample: `Meine Nachbarin hat drei Wochen gebraucht, um einen Antrag online zu stellen. Nicht wegen der Fragen — sie ist am Foto ihres Ausweises gescheitert.

Am wichtigsten finde ich deshalb, dass jemand beim ersten Mal danebensitzt. Eine gedruckte Anleitung hilft dort nicht, wo man nicht weiß, was man falsch macht.

Schief geht es fast immer beim Hochladen, nicht beim Ausfüllen.

Mein Rat an die Gemeinde: eine feste Stunde pro Woche mit einer Person, die nicht für die Leute tippt, sondern daneben sitzt.`,
            criteria: [
              "Dört içerik noktası da işlendi mi?",
              "Örnek gerçekten kişisel bir sahne mi?",
              "Ters giden şey somut bir adımda mı geçiyor?",
              "Öğüt uygulanabilir mi ve yazının kalanıyla tutarlı mı?",
              "Yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-10-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie haben online einen Termin gebucht und eine Bestätigung erhalten, aber im Amt wurde Ihnen gesagt, der Termin existiere nicht. Schreiben Sie an das Amt (circa 40 Wörter).",
          promptTr:
            "Çevrimiçi randevu aldın ve onay geldi, ama kurumda randevunun olmadığı söylendi. Kuruma yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Schildern Sie, was passiert ist.", tr: "Ne olduğunu anlat." },
              { de: "Beziehen Sie sich auf die Bestätigung.", tr: "Onay mesajına atıf yap." },
              { de: "Bitten Sie um einen neuen Termin.", tr: "Yeni bir randevu iste." },
            ],
            sample: `Sehr geehrte Damen und Herren,

am 4. April habe ich über Ihr Portal einen Termin für den 18. April gebucht und noch am selben Tag eine Bestätigung per Mail erhalten.

Am 18. April wurde mir am Schalter gesagt, der Termin sei nicht im System.

Ich bitte Sie um einen neuen Termin, möglichst in dieser Woche.

Mit freundlichen Grüßen
Sina Yalçın`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Olay tarihlerle ve sırayla anlatıldı mı?",
              "Onay mesajına somut atıf var mı?",
              "Talep açık ve zamanlı mı?",
              "Yaklaşık 40 kelime var mı ve ton yarı resmî mi?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, einen kurzen Vortrag halten, auf eine Beschwerde reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte planlama, kısa sunum, bir şikâyete karşılık verme.",
      tasks: [
        {
          id: "de-b1-10-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam eine Hilfe-Sprechstunde für Ihre Nachbarschaft. Sprechen Sie über: Termin — Ort — welche Themen — wer macht mit?",
          promptTr:
            "Mahalleniz için birlikte bir yardım saati planla. Şunları konuş: zaman — yer — hangi konular — kim katılacak?",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen die Sprechstunde. Zuerst der Termin: Vormittags kommen nur Rentner, abends nur Berufstätige. Was schlagen Sie vor?",
              tr: "Yardım saatini birlikte planlıyoruz. Önce zaman: Sabah yalnız emekliler geliyor, akşam yalnız çalışanlar. Ne önerirsin?",
            },
            { who: "you", hint: "Somut bir zaman öner ve bu ikilemi ele al.", expect: "somut bir zaman önermek ve iki grubu birden düşünmek", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Und der Ort? Die Bücherei ist ruhig, aber klein. Das Bürgerhaus ist groß und laut.",
              tr: "Peki. Yer neresi olsun? Kütüphane sessiz ama küçük. Halk evi büyük ama gürültülü.",
            },
            { who: "you", hint: "Bir yer seç ve iki itirazı da tart.", expect: "bir yer seçmek ve her iki itirazı da tartmak", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Welche Themen nehmen wir? Bei Konten und Passwörtern habe ich Bedenken.",
              tr: "Anlaştık. Hangi konuları alalım? Hesap ve şifre konusunda çekincelerim var.",
            },
            { who: "you", hint: "Konuları sınırla ve bu çekinceyi ciddiye al.", expect: "konuları sınırlamak ve güvenlik çekincesini ele almak", seconds: 45 },
            {
              who: "partner",
              de: "Bleiben die Leute. Ich kann höchstens einmal im Monat, mehr schaffe ich nicht.",
              tr: "Geriye insanlar kaldı. Ben en fazla ayda bir gelebilirim, fazlası olmaz.",
            },
            { who: "you", hint: "Görevleri paylaştır ve en az birini üstlen.", expect: "yükü paylaştırmak ve açıkça bir iş üstlenmek", seconds: 35 },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "Vorschläge machen und begründen", tr: "Öneri sunmak ve gerekçelendirmek" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "eine Aufgabe übernehmen", tr: "Bir işi üstlenmek" },
            ],
            sample:
              "Ich schlage den späten Nachmittag vor, so ab siebzehn Uhr: Dann sind die Rentner noch wach und die Berufstätigen schon frei. Als Ort würde ich die Bücherei nehmen — klein ist besser als laut, weil man beim Erklären nicht schreien will. Bei den Themen bleiben wir bei Fotos, Terminen und Formularen; Konten lassen wir bewusst weg und sagen das auch offen, dann kommt niemand mit falschen Erwartungen. Und weil du nur einmal im Monat kannst, mache ich die anderen drei Termine und frage im Sprachcafé, ob jemand mitmacht.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu (saat, yer, konu listesi)?",
              "Her itiraz (iki grup, küçük/gürültülü mekân, güvenlik, sınırlı zaman) gerçekten karşılandı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Gerekçe bağlaçları kullanıldı mı? (weil, damit, deshalb)",
            ],
          },
        },
        {
          id: "de-b1-10-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag: Macht Technik den Alltag leichter oder komplizierter? Sprechen Sie über Vorteile, Nachteile und Ihre eigene Erfahrung. Sprechen Sie etwa drei Minuten.",
          promptTr:
            "Kısa bir sunum yap: Teknoloji gündelik hayatı kolaylaştırıyor mu zorlaştırıyor mu? Avantajları, dezavantajları ve kendi deneyimini anlat. Yaklaşık üç dakika konuş.",
          prepSeconds: 60,
          speakSeconds: 180,
          items: [],
          rubric: {
            minutes: 5,
            points: [
              { de: "beide Seiten darstellen", tr: "İki tarafı da ortaya koymak" },
              { de: "eigene Erfahrung einbringen", tr: "Kendi deneyimini katmak" },
              { de: "eine eigene Position begründen", tr: "Kendi konumunu gerekçelendirmek" },
            ],
            sample:
              "Für die leichtere Seite spricht die Zeit. Ich habe letztes Jahr einen Antrag um elf Uhr abends gestellt, an einem Sonntag. Früher hätte ich dafür einen halben Tag Urlaub gebraucht. Dagegen spricht, dass jeder Dienst eine eigene Anmeldung will. Ich habe inzwischen über zwanzig Konten, und wenn eines nicht geht, hilft mir niemand am Telefon. Meine Mutter hat drei Wochen gebraucht, bis sie ein Foto ihres Ausweises hochladen konnte. Für mich ist Technik deshalb nicht leichter oder schwerer, sondern anders verteilt: Sie nimmt Zeit weg von denen, die sie hatten, und gibt sie denen, die keine hatten. Wer schon vorher Hilfe brauchte, braucht heute mehr davon.",
            criteria: [
              "Her iki taraf da gerçekten anlatıldı mı?",
              "Kendi deneyimi somut mu (ne, ne zaman, ne kadar sürdü)?",
              "Konum gerekçelendirildi mi ve anlatılanlarla tutarlı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (dafür spricht, dagegen spricht, deshalb)",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-10-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf eine Beschwerde. Ihre Nachbarin sagt, sie komme seit der Umstellung auf die App nicht mehr ins Haus. Hören Sie zu, antworten Sie und suchen Sie eine Lösung.",
          promptTr:
            "Bir şikâyete karşılık ver. Komşun, uygulamaya geçildiğinden beri binaya giremediğini söylüyor. Dinle, cevap ver ve bir çözüm ara.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Ich muss das mal loswerden. Seit der Umstellung stehe ich zweimal die Woche vor der Tür. Die App will ein Update, und ich weiß nicht, was das heißt.",
              tr: "Bunu söylemem gerek. Değişiklikten beri haftada iki kez kapının önünde kalıyorum. Uygulama güncelleme istiyor ve bunun ne demek olduğunu bilmiyorum.",
            },
            {
              who: "you",
              hint: "Şikâyeti ciddiye al ve hemen ders vermeye kalkma.",
              expect: "şikâyeti ciddiye almak ve öğretici bir tona kaymamak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Man hat mir gesagt, ich soll einfach den Schlüssel behalten. Aber den habe ich abgegeben, weil es hieß, die App sei jetzt Standard.",
              tr: "Bana anahtarı saklamamı söylediler. Ama teslim ettim, çünkü artık uygulamanın standart olduğu söylenmişti.",
            },
            {
              who: "you",
              hint: "Bu bilgi karışıklığını ele al ve somut bir çözüm öner.",
              expect: "yanlış bilgilendirmeyi ele almak ve somut bir çözüm önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Und wenn das wieder passiert? Ich möchte nicht jedes Mal bei Ihnen klingeln müssen.",
              tr: "Ya yine olursa? Her seferinde senin zilini çalmak istemiyorum.",
            },
            {
              who: "you",
              hint: "Tekrarını önleyecek bir düzen öner.",
              expect: "tekrarını önleyecek somut bir düzen önermek",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zuhören und ernst nehmen", tr: "Dinlemek ve ciddiye almak" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "eine dauerhafte Lösung anbieten", tr: "Kalıcı bir çözüm önermek" },
            ],
            sample:
              "Zweimal die Woche vor der eigenen Tür zu stehen, wäre für mich auch nicht auszuhalten. Und Sie haben den Schlüssel ja nicht aus Nachlässigkeit abgegeben, sondern weil man Ihnen gesagt hat, das sei jetzt so. Das war schlicht falsch: Laut Aushang behält jeder den Schlüssel, der will. Ich schreibe der Verwaltung heute und bitte um einen neuen für Sie — schriftlich, damit es nicht wieder untergeht. Bis der da ist, klingeln Sie bitte wirklich bei mir, das stört mich nicht. Und wenn die App noch einmal ein Update will, machen wir das zusammen; dafür brauchen wir zehn Minuten.",
            criteria: [
              "Şikâyet ciddiye alındı mı, yoksa hemen çözüme mi atlandı?",
              "Yanlış bilgilendirme açıkça adlandırıldı mı?",
              "Sunulan çözüm kalıcı mı (yazılı talep, yeni anahtar), yoksa geçici mi?",
              "Tekrarı önleyecek bir düzen önerildi mi?",
              "Ton koruyucu değil, eşit düzeyde mi?",
            ],
          },
        },
      ],
    },
  ],
};
