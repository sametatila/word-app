import type { MockPaper } from "../types";

/**
 * B1 · Deneme 9 — "Familie und Generationen".
 *
 * PLAN kâğıt 1–8 ile birebir aynı.
 *
 *   Lesen  65 dk · 30 madde   (6 R/F · 6 ana fikir · 7 eşleştirme · 7 forum · 4 kural)
 *   Hören  40 dk · 30 madde   (10 karma · 5 üç şıklı · 7 R/F · 8 görüş)
 *   Schreiben 60 dk           80 + 80 + 40 kelime
 *   Sprechen  15 dk           birlikte planlama · kısa sunum · sorun çözme
 *
 * KONU SEÇİMİ: aile ve kuşaklar. B1'in ölçtüğü tutum bu alanda kaçınılmaz
 * olarak ortaya çıkıyor: bakım kimin işi, para kimden, hangi mesafe uygun.
 * Bunlar B1 öğrencisinin gerçekten konuştuğu ama ilk sekiz kâğıdın hiç
 * girmediği sorular.
 *
 * FORUM GÖREVİ bilerek tahminle çözülemez kuruldu: kendi annesine bakan biri
 * zorunluluğa karşı, hiç bakmamış biri lehinde konuşuyor. Konum kişiden değil
 * gerekçeden çıkarılmalı.
 *
 * ŞIK UZUNLUKLARI ve anahtar dağılımı görev görev planlandı — A2 turunda
 * denetimin yakaladığı "doğru şık hep en uzun" alışkanlığı tekrarlanmasın diye.
 */
export const B1_09: MockPaper = {
  id: "de-b1-09",
  course: "de",
  level: "B1",
  no: 9,
  theme: "Familie und Generationen",
  themeTr: "Aile ve kuşaklar",
  minutes: 180,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 65,
      instruction:
        "Dieser Teil hat fünf Aufgaben. Sie lesen einen Bericht, kurze Texte, Anzeigen, Forumsbeiträge und eine Hausordnung.",
      instructionTr:
        "Bu bölümde beş görev var. Bir haber metni, kısa metinler, ilanlar, forum yorumları ve bir yönetmelik okuyacaksın.",
      tasks: [
        {
          id: "de-b1-09-l1",
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
              title: "Zwölf Wohnungen, vier Generationen",
              body: `Das Haus in der Feldstraße sieht aus wie jedes andere. Innen ist es anders organisiert.

In den zwölf Wohnungen leben Menschen zwischen zwei und neunundachtzig Jahren. Der Verein, dem das Haus gehört, achtet bei jeder Vermietung auf das Alter.

"Wir suchen keine Familie und keine Rentnerin", sagt Ilse Ehrlich, die im Vorstand sitzt. "Wir suchen die Mischung."

Gemeinsam ist allen ein Raum im Erdgeschoss. Er wird nicht verwaltet: Wer ihn braucht, trägt sich in eine Liste an der Tür ein.

Hilfe wird nicht organisiert, sondern angeboten. Eine Nachbarin holt zweimal in der Woche Brot mit, ein Student repariert Fahrräder.

Das klingt harmonischer, als es ist. Über die Nutzung des Gemeinschaftsraums wurde zwei Jahre gestritten, bis eine Regel stand.

Auch die Erwartungen gehen auseinander. Manche Ältere hätten gern mehr Kontakt, manche Jüngere kommen abends spät nach Hause und wollen ihre Ruhe.

"Ein solches Haus nimmt niemandem die Einsamkeit ab", sagt Frau Ehrlich. "Es macht sie nur weniger wahrscheinlich."`,
              gloss: [
                { de: "die Vermietung", tr: "kiraya verme", en: "letting, rental" },
                { de: "die Mischung", tr: "karışım", en: "mix" },
                { de: "verwalten", tr: "yönetmek", en: "to manage" },
                { de: "die Einsamkeit", tr: "yalnızlık", en: "loneliness" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-09-l1-1",
              no: 1,
              ref: "r1",
              text: "Der Verein achtet bei der Vermietung auf das Alter der Bewerber.",
              answer: true,
              explain:
                "Metin bunu doğrudan söylüyor: \"Der Verein … achtet bei jeder Vermietung auf das Alter\" — aranan şey karışım.",
            },
            {
              kind: "bool",
              id: "de-b1-09-l1-2",
              no: 2,
              ref: "r1",
              text: "Der Gemeinschaftsraum wird von einer Hausverwaltung eingeteilt.",
              answer: false,
              explain:
                "Tam tersi: \"Er wird nicht verwaltet\" — kullanmak isteyen kapıdaki listeye kendi adını yazıyor.",
            },
            {
              kind: "bool",
              id: "de-b1-09-l1-3",
              no: 3,
              ref: "r1",
              text: "Die Hilfe im Haus entsteht freiwillig.",
              answer: true,
              explain:
                "\"Hilfe wird nicht organisiert, sondern angeboten\" — örnekleri de veriliyor: ekmek getiren komşu, bisiklet tamir eden öğrenci.",
            },
            {
              kind: "bool",
              id: "de-b1-09-l1-4",
              no: 4,
              ref: "r1",
              text: "Im Haus gab es bisher keinen Streit.",
              answer: false,
              explain:
                "Metin bunu kendisi düzeltiyor: \"Über die Nutzung des Gemeinschaftsraums wurde zwei Jahre gestritten\".",
            },
            {
              kind: "bool",
              id: "de-b1-09-l1-5",
              no: 5,
              ref: "r1",
              text: "Nicht alle Bewohner wünschen sich gleich viel Kontakt.",
              answer: true,
              explain:
                "İki beklenti karşılaştırılıyor: bazı yaşlılar daha çok temas isterken bazı gençler \"wollen ihre Ruhe\".",
            },
            {
              kind: "bool",
              id: "de-b1-09-l1-6",
              no: 6,
              ref: "r1",
              text: "Frau Ehrlich verspricht, dass niemand im Haus einsam ist.",
              answer: false,
              explain:
                "Kapanış cümlesi bunu açıkça sınırlıyor: \"Ein solches Haus nimmt niemandem die Einsamkeit ab. Es macht sie nur weniger wahrscheinlich.\"",
            },
          ],
        },
        {
          id: "de-b1-09-l2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Lesen Sie die sechs Texte. Was ist die Kernaussage? Wählen Sie a, b oder c.",
          promptTr: "Altı metni oku. Ana ileti ne? a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t1",
              genre: "Aushang im Bürgerhaus",
              genreTr: "Halk evindeki duyuru",
              body: `Der Mittagstisch für Ältere findet ab Oktober nicht mehr dienstags, sondern donnerstags statt.

Der Grund ist die Küche: Dienstags kocht dort seit Neuestem die Kita.

Wer donnerstags nicht kann, meldet sich bitte — ab acht Anmeldungen richten wir einen zweiten Termin ein.`,
              gloss: [
                { de: "der Mittagstisch", tr: "ortak öğle yemeği", en: "communal lunch" },
                { de: "einrichten", tr: "kurmak, açmak", en: "to set up" },
              ],
            },
            {
              kind: "text",
              id: "t2",
              genre: "E-Mail an die Familie",
              genreTr: "Aileye e-posta",
              body: `Liebe alle,

Papas Geburtstag fällt dieses Jahr auf einen Mittwoch. Wir feiern trotzdem am Samstag.

Bitte sagt bis Sonntag Bescheid, wer kommt. Ich muss den Raum vorher bestellen.

Geschenke braucht er wirklich keine. Er hat sich Fotos gewünscht, alte und neue.`,
            },
            {
              kind: "text",
              id: "t3",
              genre: "Anzeige",
              genreTr: "İlan",
              body: `Wir suchen jemanden, der zweimal pro Woche mit unserem Vater spazieren geht.

Er ist zweiundachtzig, geht langsam, aber gern. Pflegerische Aufgaben fallen nicht an.

Bezahlung nach Absprache. Wichtig ist uns, dass es dieselbe Person bleibt.`,
              gloss: [
                { de: "pflegerisch", tr: "bakımla ilgili", en: "care-related" },
                { de: "die Absprache", tr: "anlaşma", en: "arrangement" },
              ],
            },
            {
              kind: "text",
              id: "t4",
              genre: "Nachricht in der Familiengruppe",
              genreTr: "Aile grubundaki mesaj",
              body: `Ich habe heute mit dem Pflegedienst telefoniert.

Sie kommen ab Montag morgens, aber nur bis halb neun. Danach müssen wir selbst da sein.

Ich kann montags und mittwochs. Wer übernimmt Dienstag und Donnerstag?`,
            },
            {
              kind: "text",
              id: "t5",
              genre: "Zeitungsnotiz",
              genreTr: "Gazete notu",
              body: `Immer mehr Großeltern betreuen regelmäßig ihre Enkel.

Die Zahl ist in zehn Jahren um ein Viertel gestiegen, obwohl die Großeltern selbst länger arbeiten als früher.

Fachleute erklären das mit den fehlenden Betreuungsplätzen am Nachmittag.`,
              gloss: [
                { de: "betreuen", tr: "bakmak, ilgilenmek", en: "to look after" },
                { de: "der Betreuungsplatz", tr: "bakım yeri", en: "childcare place" },
              ],
            },
            {
              kind: "text",
              id: "t6",
              genre: "Aushang im Treppenhaus",
              genreTr: "Merdiven boşluğundaki duyuru",
              body: `Der Gemeinschaftsraum ist ab sofort auch für Kindergeburtstage frei.

Bedingung: Ende spätestens um achtzehn Uhr und Reinigung am selben Tag.

Wer den Raum nicht sauber hinterlässt, kann ihn ein halbes Jahr nicht mehr buchen.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-09-l2-7",
              no: 7,
              ref: "t1",
              text: "Was ist die Kernaussage?",
              options: [
                "Der Mittagstisch wechselt den Tag.",
                "Der Mittagstisch fällt ab Oktober aus.",
                "Die Kita übernimmt den Mittagstisch.",
              ],
              answer: 0,
              explain:
                "Duyuru gün değişikliğini ve sebebini veriyor: \"nicht mehr dienstags, sondern donnerstags\", çünkü salı günü mutfağı kreş kullanıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l2-8",
              no: 8,
              ref: "t2",
              text: "Was sollen die Empfänger tun?",
              options: [
                "Ein Geschenk für den Vater aussuchen.",
                "Den Raum für die Feier bestellen.",
                "Bis Sonntag zu- oder absagen.",
              ],
              answer: 2,
              explain:
                "Tek istenen şey bu: \"Bitte sagt bis Sonntag Bescheid, wer kommt\" — salonu yazan kişi kendisi ayırtıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l2-9",
              no: 9,
              ref: "t3",
              text: "Wen sucht die Familie?",
              options: [
                "Eine Pflegekraft für den Vater.",
                "Eine feste Begleitung zum Spazieren.",
                "Jemanden für den Haushalt.",
              ],
              answer: 1,
              explain:
                "İlan bakım işini dışlıyor — \"Pflegerische Aufgaben fallen nicht an\" — ve süreklilik istiyor: \"dass es dieselbe Person bleibt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l2-10",
              no: 10,
              ref: "t4",
              text: "Worum bittet die Person?",
              options: [
                "Um Hilfe an zwei Wochentagen.",
                "Um ein Gespräch mit dem Pflegedienst.",
                "Um Geld für die Pflege.",
              ],
              answer: 0,
              explain:
                "Son cümle bir soru: \"Wer übernimmt Dienstag und Donnerstag?\" Pazartesi ve çarşambayı kendisi alıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l2-11",
              no: 11,
              ref: "t5",
              text: "Was ist die Hauptaussage?",
              options: [
                "Großeltern arbeiten heute weniger als früher.",
                "Die Betreuungsplätze sind ausreichend geworden.",
                "Großeltern betreuen häufiger als vor zehn Jahren.",
              ],
              answer: 2,
              explain:
                "Metin artışı sayıyla veriyor — \"um ein Viertel gestiegen\" — ve bunu öğleden sonraki yer eksikliğiyle açıklıyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l2-12",
              no: 12,
              ref: "t6",
              text: "Was gilt für den Raum?",
              options: [
                "Kindergeburtstage sind weiterhin verboten.",
                "Wer nicht putzt, verliert das Recht.",
                "Die Buchung kostet ab sofort Geld.",
              ],
              answer: 1,
              explain:
                "Yaptırım açıkça yazılı: \"Wer den Raum nicht sauber hinterlässt, kann ihn ein halbes Jahr nicht mehr buchen\".",
            },
          ],
        },
        {
          id: "de-b1-09-l3",
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
              label: "Begleitung zu Terminen",
              body: "Wir fahren mit zu Arzt und Amt, warten mit und erklären danach. Zwei Stunden 12 Euro, Fahrt inklusive.",
            },
            {
              key: "b",
              label: "Großelterndienst",
              body: "Ältere Menschen betreuen stundenweise Kinder, wenn die eigenen Großeltern weit weg wohnen. Kostenlos, feste Zuordnung.",
            },
            {
              key: "c",
              label: "Beratung zur Pflege",
              body: "Wir erklären, welche Leistungen es gibt und wie man sie beantragt. Dienstag und Freitag, mit Anmeldung, kostenlos.",
            },
            {
              key: "d",
              label: "Mittagstisch für Ältere",
              body: "Jeden Donnerstag um zwölf im Bürgerhaus. Warmes Essen für 4 Euro, Anmeldung bis Mittwoch.",
            },
            {
              key: "e",
              label: "Handy-Sprechstunde",
              body: "Wir helfen beim Telefon: Kontakte, Fotos, Videoanrufe. Jeden ersten Montag, ohne Anmeldung, kostenlos.",
            },
            {
              key: "f",
              label: "Wohnung altersgerecht umbauen",
              body: "Beratung zu Bad, Türen und Schwellen. Wir kommen zu Ihnen und schreiben einen Bericht für die Kasse.",
            },
            {
              key: "g",
              label: "Trauergruppe",
              body: "Gespräche für Menschen, die jemanden verloren haben. Zweiter Mittwoch im Monat, 18 Uhr, ohne Kosten.",
            },
            {
              key: "h",
              label: "Ferienbetreuung",
              body: "Zwei Wochen im Sommer, täglich 8 bis 16 Uhr. Für Kinder von 6 bis 12 Jahren, 80 Euro pro Woche.",
            },
            {
              key: "i",
              label: "Spaziergänge in Begleitung",
              body: "Ehrenamtliche gehen ein- bis zweimal pro Woche mit. Kein Pflegedienst, nur Bewegung und Gespräch.",
            },
            {
              key: "j",
              label: "Familienfrühstück",
              body: "Jeden zweiten Sonntag, Eltern mit kleinen Kindern. 3 Euro pro Erwachsenem, Kinder frei.",
            },
          ],
          items: [
            {
              kind: "match",
              id: "de-b1-09-l3-13",
              no: 13,
              text: "Herr Bastian versteht die Briefe der Kasse nicht und möchte wissen, was seiner Mutter zusteht.",
              answer: "c",
              explain:
                "(c) tam bunu yapıyor: \"Wir erklären, welche Leistungen es gibt und wie man sie beantragt\" — randevuyla ve ücretsiz.",
            },
            {
              kind: "match",
              id: "de-b1-09-l3-14",
              no: 14,
              text: "Frau Doganay möchte ihren Vater zweimal in der Woche an die Luft bringen, ohne Pflege.",
              answer: "i",
              explain:
                "(i) sıklığı ve sınırı veriyor: \"ein- bis zweimal pro Woche … Kein Pflegedienst, nur Bewegung und Gespräch\".",
            },
            {
              kind: "match",
              id: "de-b1-09-l3-15",
              no: 15,
              text: "Herr Wieser hat einen Termin beim Amt und traut sich nicht allein hin.",
              answer: "a",
              explain:
                "(a) hem gitmeyi hem sonrasını kapsıyor: \"Wir fahren mit zu Arzt und Amt, warten mit und erklären danach\".",
            },
            {
              kind: "match",
              id: "de-b1-09-l3-16",
              no: 16,
              text: "Frau Kemper wohnt weit von ihren Eltern entfernt und sucht für ihre Kinder eine ältere Bezugsperson.",
              answer: "b",
              explain:
                "(b) tam bu durum için kurulmuş: \"wenn die eigenen Großeltern weit weg wohnen\", üstelik sabit eşleştirme yapıyor.",
            },
            {
              kind: "match",
              id: "de-b1-09-l3-17",
              no: 17,
              text: "Herr Solms möchte seiner Frau Videoanrufe mit den Enkeln zeigen, kennt sich aber nicht aus.",
              answer: "e",
              explain:
                "(e) konuyu adıyla sayıyor: \"Kontakte, Fotos, Videoanrufe\" ve kayıt istemiyor.",
            },
            {
              kind: "match",
              id: "de-b1-09-l3-18",
              no: 18,
              text: "Frau Alberti überlegt, das Bad ihrer Mutter umzubauen, und braucht etwas Schriftliches für die Kasse.",
              answer: "f",
              explain:
                "(f) hem konuyu hem belgeyi veriyor: \"Beratung zu Bad, Türen und Schwellen … schreiben einen Bericht für die Kasse\".",
            },
            {
              kind: "match",
              id: "de-b1-09-l3-19",
              no: 19,
              text: "Herr Radek isst seit dem Tod seiner Frau meistens allein und möchte einmal in der Woche Gesellschaft beim Essen.",
              answer: "d",
              explain:
                "(d) haftalık ortak yemek sunuyor: \"Jeden Donnerstag um zwölf … Warmes Essen für 4 Euro\". (g) de kayıpla ilgili ama konuşma grubu, yemek değil.",
            },
          ],
        },
        {
          id: "de-b1-09-l4",
          no: 4,
          format: "mcq",
          goal: "opinion",
          prompt:
            "In einem Online-Forum wird gefragt: \"Sollen erwachsene Kinder gesetzlich für die Pflege ihrer Eltern zahlen müssen?\" Lesen Sie die Kommentare 20 bis 26. Ist die Person dafür oder dagegen?",
          promptTr:
            "Bir çevrimiçi forumda soruluyor: \"Yetişkin çocuklar anne babalarının bakımı için yasal olarak ödeme yapmak zorunda olmalı mı?\" 20–26. yorumları oku. Kişi bunun yanında mı karşısında mı?",
          texts: [
            {
              kind: "text",
              id: "f1",
              genre: "Forum",
              genreTr: "Forum",
              title: "Pflegekosten — sollen die Kinder zahlen?",
              body: `Mira Kemper: Ich pflege meine Mutter seit vier Jahren selbst und bin trotzdem dagegen. Wer eine Pflicht einführt, macht aus einer Beziehung ein Schuldverhältnis. Ich helfe, weil ich will. Sobald ich muss, wird jedes Gespräch mit meiner Mutter eine Abrechnung.

Rolf Bastian: Ich habe meinen Vater seit zwanzig Jahren nicht gesehen. Trotzdem finde ich es richtig, dass Kinder zahlen — aber erst ab einem hohen Einkommen und mit klarer Grenze. Wer gut verdient, sollte nicht auf Kosten aller anderen entlastet werden.

Frau Dr. Alberti: Als Ärztin sehe ich täglich, was fehlende Mittel bedeuten: zu wenig Personal, zu wenig Zeit. Wer gut verdient und sich ganz heraushält, verschiebt die Kosten auf Menschen mit weniger. Eine Beteiligung halte ich deshalb für richtig, auch wenn sie unbeliebt ist.

Sinan Doganay: Bei uns ist es selbstverständlich, dass man für die Eltern sorgt. Ein Gesetz braucht es dafür nicht — und wer es nicht tut, wird es auch mit Gesetz nicht tun. Ich bin dagegen, weil ich nicht glaube, dass es wirkt.

Katrin Solms: Ich war lange dagegen und habe meine Meinung geändert. In unserer Familie hat eine Tochter alles bezahlt, die andere nichts, und niemand konnte das ändern. Eine Regel hätte wenigstens für Gerechtigkeit unter Geschwistern gesorgt.

Herr Wieser: Ich bin Rentner und sage etwas Unbequemes. Ich habe vierzig Jahre eingezahlt, und es reicht trotzdem nicht. Wenn meine Tochter gut verdient und ich im Heim liege, finde ich einen Beitrag von ihr richtig. Lieber das als eine Pflege, die an allen Ecken spart.

Elif Radek: Wer für die Pflicht argumentiert, denkt an gute Familien. Ich denke an die anderen. Ein Gesetz zwingt Menschen, für jemanden zu zahlen, vor dem sie als Kind weggelaufen sind. Das darf ein Staat nicht verlangen.`,
              gloss: [
                { de: "das Schuldverhältnis", tr: "borç ilişkisi", en: "debt relationship" },
                { de: "die Abrechnung", tr: "hesap görme", en: "settling of accounts" },
                { de: "entlasten", tr: "yükünü hafifletmek", en: "to relieve" },
                { de: "die Gerechtigkeit", tr: "adalet", en: "fairness" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-09-l4-20",
              no: 20,
              ref: "f1",
              text: "Mira Kemper",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kendi annesine bakıyor ama zorunluluğa karşı: \"Wer eine Pflicht einführt, macht aus einer Beziehung ein Schuldverhältnis\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l4-21",
              no: 21,
              ref: "f1",
              text: "Rolf Bastian",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Babasını yirmi yıldır görmediği hâlde koşullu olarak lehinde: \"finde ich es richtig, dass Kinder zahlen — aber erst ab einem hohen Einkommen\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l4-22",
              no: 22,
              ref: "f1",
              text: "Frau Dr. Alberti",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Mesleğinden gelen bir gerekçeyle destekliyor: kaynak eksikliği personel ve zaman olarak görünüyor, bu yüzden \"Eine Beteiligung halte ich deshalb für richtig\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l4-23",
              no: 23,
              ref: "f1",
              text: "Sinan Doganay",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Sorumluluğu doğru buluyor ama yasayı gereksiz: \"Ich bin dagegen, weil ich nicht glaube, dass es wirkt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l4-24",
              no: 24,
              ref: "f1",
              text: "Katrin Solms",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Fikrini değiştirdiğini söylüyor ve gerekçesi kardeşler arası eşitlik: \"Eine Regel hätte wenigstens für Gerechtigkeit unter Geschwistern gesorgt\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l4-25",
              no: 25,
              ref: "f1",
              text: "Herr Wieser",
              options: ["Dafür.", "Dagegen."],
              answer: 0,
              explain:
                "Kendi aleyhine konuşuyor: kırk yıl ödemiş olmasına rağmen yetmediğini kabul ediyor ve \"finde ich einen Beitrag von ihr richtig\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l4-26",
              no: 26,
              ref: "f1",
              text: "Elif Radek",
              options: ["Dafür.", "Dagegen."],
              answer: 1,
              explain:
                "Kötü durumdaki aileleri düşünüyor: \"Ein Gesetz zwingt Menschen, für jemanden zu zahlen, vor dem sie als Kind weggelaufen sind\".",
            },
          ],
        },
        {
          id: "de-b1-09-l5",
          no: 5,
          format: "mcq",
          goal: "instruction",
          prompt: "Lesen Sie die Regeln und die Aufgaben 27 bis 30. Wählen Sie a, b oder c.",
          promptTr: "Kuralları ve 27–30. maddeleri oku. a, b ya da c'yi seç.",
          texts: [
            {
              kind: "text",
              id: "o1",
              genre: "Nutzungsordnung",
              genreTr: "Kullanım yönetmeliği",
              title: "Gemeinschaftsraum Feldstraße — Nutzungsordnung",
              body: `1. Buchung
Der Raum wird über die Liste an der Tür gebucht, höchstens vier Wochen im Voraus. Eine Buchung gilt erst, wenn Name und Telefonnummer eingetragen sind. Zwei Termine pro Haushalt und Monat sind möglich.

2. Zeiten
Der Raum kann von 9 bis 22 Uhr genutzt werden, an Sonntagen bis 20 Uhr. Für Kindergeburtstage endet die Nutzung um 18 Uhr.

3. Reinigung
Gereinigt wird am selben Tag, nicht am Morgen danach. Der Schlüssel wird erst zurückgegeben, wenn der Raum abgenommen ist.

4. Schäden
Schäden sind sofort zu melden. Wer einen Schaden verschweigt, trägt die vollen Kosten; wer ihn meldet, zahlt höchstens fünfzig Euro.`,
              gloss: [
                { de: "die Buchung", tr: "rezervasyon", en: "booking" },
                { de: "verschweigen", tr: "gizlemek", en: "to conceal" },
                { de: "abnehmen", tr: "(teslim) kontrol etmek", en: "to inspect and accept" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-09-l5-27",
              no: 27,
              ref: "o1",
              text: "Wann gilt eine Buchung?",
              options: [
                "Sobald der Name in der Liste steht.",
                "Erst mit beiden Angaben.",
                "Erst nach einer Bestätigung durch den Verein.",
              ],
              answer: 1,
              explain:
                "Kural iki bilgiyi birlikte istiyor: \"Eine Buchung gilt erst, wenn Name und Telefonnummer eingetragen sind.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l5-28",
              no: 28,
              ref: "o1",
              text: "Bis wann darf ein Kindergeburtstag dauern?",
              options: [
                "Bis zweiundzwanzig Uhr wie sonst auch.",
                "Bis zwanzig Uhr an allen Tagen.",
                "Bis achtzehn Uhr.",
              ],
              answer: 2,
              explain:
                "Üç saat sınırı var ve biri özel: genel kural 22, pazar 20, ama \"Für Kindergeburtstage endet die Nutzung um 18 Uhr\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l5-29",
              no: 29,
              ref: "o1",
              text: "Wann bekommt man den Schlüssel zurückgenommen?",
              options: [
                "Nach der Abnahme des Raums.",
                "Am Morgen nach der Feier.",
                "Sofort nach dem Ende der Nutzung.",
              ],
              answer: 0,
              explain:
                "Anahtar teslimi denetime bağlı: \"Der Schlüssel wird erst zurückgegeben, wenn der Raum abgenommen ist.\" Ertesi sabah temizlik ise açıkça yasak.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-l5-30",
              no: 30,
              ref: "o1",
              text: "Was passiert, wenn man einen Schaden meldet?",
              options: [
                "Man trägt die vollen Kosten des Schadens.",
                "Man zahlt höchstens fünfzig Euro.",
                "Man verliert das Recht auf Buchung.",
              ],
              answer: 1,
              explain:
                "Kural iki durumu ayırıyor: gizleyen tam öder, \"wer ihn meldet, zahlt höchstens fünfzig Euro\".",
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
          id: "de-b1-09-h1",
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
              situation: "Bakım hizmeti saatini bildiriyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Frau Doganay, hier ist der Pflegedienst. Ab Montag kommen wir morgens zwischen sieben und halb neun. Die genaue Zeit können wir leider nicht zusagen, weil sie von der Tour abhängt. Rufen Sie an, wenn das nicht geht.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h2",
              genre: "Radiobeitrag",
              genreTr: "Radyo haberi",
              situation: "Kuşaklar arası temas üzerine bir araştırma.",
              plays: 1,
              segments: [
                {
                  text: "Eine Untersuchung aus Bremen zeigt: Kinder, die regelmäßig Kontakt zu älteren Menschen außerhalb der Familie haben, schätzen deren Alter später deutlich genauer ein. Auf die Frage, ob sie im Alter selbst Hilfe annehmen würden, antworten sie allerdings genauso zurückhaltend wie andere Kinder.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h3",
              genre: "Sprachnachricht in der Familiengruppe",
              genreTr: "Aile grubunda sesli mesaj",
              situation: "Doğum günü planı değişiyor.",
              plays: 1,
              segments: [
                {
                  text: "Kurze Info zum Geburtstag: Der Saal im Bürgerhaus ist am Samstag schon vergeben. Ich habe stattdessen den kleinen Raum genommen, da passen aber nur zwanzig Leute rein. Wer also noch nicht zugesagt hat, sagt bitte schnell Bescheid.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h4",
              genre: "Ansage bei einem Elterncafé",
              genreTr: "Veli kafesinde duyuru",
              situation: "Yeni bir hizmet tanıtılıyor.",
              plays: 1,
              segments: [
                {
                  text: "Ein Hinweis, bevor wir anfangen: Ab April gibt es den Großelterndienst auch bei uns. Ältere Menschen betreuen stundenweise Kinder. Das ist kein Ersatz für die Kita, sondern für die Nachmittage, an denen sonst niemand da ist.",
                },
              ],
            },
            {
              kind: "audio",
              id: "h5",
              genre: "Nachricht auf der Mailbox",
              genreTr: "Sesli mesaj",
              situation: "Danışma randevusu için belge isteniyor.",
              plays: 1,
              segments: [
                {
                  text: "Guten Tag, Herr Bastian, hier ist die Pflegeberatung. Ihr Termin am Freitag steht. Bringen Sie bitte den letzten Bescheid der Kasse mit. Ohne das Schreiben können wir Ihnen nur allgemein antworten, und dafür brauchen Sie keinen Termin.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-09-h1-1",
              no: 1,
              ref: "h1",
              text: "Der Pflegedienst nennt eine feste Uhrzeit.",
              answer: false,
              explain:
                "Aralık veriliyor ama kesin saat verilmiyor: \"Die genaue Zeit können wir leider nicht zusagen, weil sie von der Tour abhängt.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h1-2",
              no: 2,
              ref: "h1",
              text: "Was soll Frau Doganay tun, wenn es nicht passt?",
              options: ["Einen anderen Dienst suchen.", "Anrufen.", "Schriftlich widersprechen."],
              answer: 1,
              explain:
                "Mesajın son cümlesi tek bir şey istiyor: \"Rufen Sie an, wenn das nicht geht.\"",
            },
            {
              kind: "bool",
              id: "de-b1-09-h1-3",
              no: 3,
              ref: "h2",
              text: "Die Kinder mit Kontakt schätzen das Alter genauer ein.",
              answer: true,
              explain:
                "Araştırmanın bulgusu bu: aile dışındaki yaşlılarla düzenli teması olan çocuklar yaşı \"deutlich genauer ein\" tahmin ediyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h1-4",
              no: 4,
              ref: "h2",
              text: "Worin unterscheiden sich die Kinder nicht?",
              options: [
                "In der Bereitschaft, später Hilfe anzunehmen.",
                "In der Einschätzung des Alters.",
                "In der Zahl der Kontakte.",
              ],
              answer: 0,
              explain:
                "İkinci bulgu farkı ortadan kaldırıyor: yardım kabul etme sorusunda \"genauso zurückhaltend wie andere Kinder\".",
            },
            {
              kind: "bool",
              id: "de-b1-09-h1-5",
              no: 5,
              ref: "h3",
              text: "Die Feier findet in einem kleineren Raum statt.",
              answer: true,
              explain:
                "Büyük salon dolu olduğu için: \"Ich habe stattdessen den kleinen Raum genommen, da passen aber nur zwanzig Leute rein.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h1-6",
              no: 6,
              ref: "h3",
              text: "Warum ist die Zusage jetzt eilig?",
              options: [
                "Weil der Saal noch bezahlt werden muss.",
                "Weil das Essen bestellt wird.",
                "Weil die Plätze begrenzt sind.",
              ],
              answer: 2,
              explain:
                "Aciliyet yer sayısından geliyor: yalnız yirmi kişi sığıyor, bu yüzden \"sagt bitte schnell Bescheid\".",
            },
            {
              kind: "bool",
              id: "de-b1-09-h1-7",
              no: 7,
              ref: "h4",
              text: "Der Großelterndienst ersetzt die Kita.",
              answer: false,
              explain:
                "Duyuru bunu açıkça dışlıyor: \"Das ist kein Ersatz für die Kita, sondern für die Nachmittage\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h1-8",
              no: 8,
              ref: "h4",
              text: "Für welche Zeit ist das Angebot gedacht?",
              options: [
                "Für die ganze Woche einschließlich der Vormittage.",
                "Für den Nachmittag.",
                "Nur für die Ferien.",
              ],
              answer: 1,
              explain:
                "\"sondern für die Nachmittage, an denen sonst niemand da ist\" — hizmet tam bu boşluk için.",
            },
            {
              kind: "bool",
              id: "de-b1-09-h1-9",
              no: 9,
              ref: "h5",
              text: "Ohne das Schreiben ist der Termin sinnlos geworden.",
              answer: true,
              explain:
                "Mesaj bunu gerekçesiyle söylüyor: belge olmadan yalnız genel cevap verilebiliyor \"und dafür brauchen Sie keinen Termin\".",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h1-10",
              no: 10,
              ref: "h5",
              text: "Was soll Herr Bastian mitbringen?",
              options: [
                "Eine Vollmacht seiner Mutter.",
                "Den letzten Bescheid.",
                "Eine Liste seiner Fragen.",
              ],
              answer: 1,
              explain:
                "İstenen tek belge: \"Bringen Sie bitte den letzten Bescheid der Kasse mit.\"",
            },
          ],
        },
        {
          id: "de-b1-09-h2",
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
              situation: "Bir oğul annesi için bakım danışmanlığına geliyor.",
              plays: 2,
              segments: [
                { speaker: "Beraterin", text: "Herr Bastian, Sie haben den Bescheid dabei. Ihre Mutter ist in Pflegegrad zwei." },
                { speaker: "Herr Bastian", text: "Ich hatte mit mehr gerechnet. Sie kommt allein kaum noch die Treppe hoch." },
                {
                  speaker: "Beraterin",
                  text: "Die Treppe zählt nicht viel. Bewertet wird, was in der Wohnung selbst geht. Sie können widersprechen, aber die Frist läuft vier Wochen ab Zustellung.",
                },
                { speaker: "Herr Bastian", text: "Der Brief ist vom Elften. Heute ist der Zweite." },
                { speaker: "Beraterin", text: "Dann haben Sie noch eine gute Woche. Wichtiger wäre mir aber etwas anderes." },
                { speaker: "Herr Bastian", text: "Und das wäre?" },
                {
                  speaker: "Beraterin",
                  text: "Die Verhinderungspflege. Damit können Sie sich vertreten lassen, wenn Sie selbst einmal ausfallen. Das beantragen die wenigsten, obwohl es jedem zusteht.",
                },
                { speaker: "Herr Bastian", text: "Und wenn ich das nicht nutze?" },
                { speaker: "Beraterin", text: "Dann verfällt es am Jahresende. Es wird nicht übertragen." },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-09-h2-11",
              no: 11,
              ref: "g1",
              text: "Wie reagiert Herr Bastian auf den Bescheid?",
              options: [
                "Er hatte mehr erwartet.",
                "Er ist damit zufrieden.",
                "Er versteht ihn nicht.",
              ],
              answer: 0,
              explain:
                "İlk tepkisi bu: \"Ich hatte mit mehr gerechnet\" — merdiveni gerekçe gösteriyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h2-12",
              no: 12,
              ref: "g1",
              text: "Was sagt die Beraterin über die Treppe?",
              options: [
                "Sie ist für die Bewertung entscheidend.",
                "Sie muss ärztlich bestätigt werden.",
                "Sie zählt kaum.",
              ],
              answer: 2,
              explain:
                "Değerlendirme ölçütü başka: \"Die Treppe zählt nicht viel. Bewertet wird, was in der Wohnung selbst geht.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h2-13",
              no: 13,
              ref: "g1",
              text: "Wie viel Zeit bleibt für den Widerspruch?",
              options: ["Etwa eine Woche.", "Noch vier Wochen.", "Die Frist ist abgelaufen."],
              answer: 0,
              explain:
                "Süre dört hafta ve mektup ayın on birinden; bugün ikisi olduğuna göre danışman \"noch eine gute Woche\" diyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h2-14",
              no: 14,
              ref: "g1",
              text: "Was hält die Beraterin für wichtiger?",
              options: [
                "Den Widerspruch gegen den Bescheid.",
                "Die Verhinderungspflege.",
                "Einen Umzug der Mutter.",
              ],
              answer: 1,
              explain:
                "İtirazı geçerli sayıyor ama önceliği değiştiriyor: \"Wichtiger wäre mir aber etwas anderes\" — vekâleten bakım.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h2-15",
              no: 15,
              ref: "g1",
              text: "Was passiert mit dem Anspruch, wenn er nicht genutzt wird?",
              options: [
                "Er wird ins nächste Jahr übertragen.",
                "Er wird ausgezahlt.",
                "Er verfällt.",
              ],
              answer: 2,
              explain:
                "İki şey birlikte söyleniyor: \"Dann verfällt es am Jahresende. Es wird nicht übertragen.\"",
            },
          ],
        },
        {
          id: "de-b1-09-h3",
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
              situation: "Kuşaklar üzerine çalışan bir araştırmacı konuşuyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Frau Alberti",
                  text: "Ich untersuche seit vierzehn Jahren, wie Generationen im Alltag zusammenkommen. Drei Ergebnisse überraschen fast jedes Publikum.",
                },
                {
                  speaker: "Frau Alberti",
                  text: "Erstens: Der Kontakt zwischen Alt und Jung nimmt nicht ab. Was abnimmt, ist der Kontakt außerhalb der eigenen Familie. Innerhalb der Familie telefonieren wir heute häufiger als vor zwanzig Jahren.",
                },
                {
                  speaker: "Frau Alberti",
                  text: "Zweitens: Nähe entsteht nicht durch Veranstaltungen, sondern durch Wege. Wo Menschen denselben Bäcker haben, reden sie miteinander. Ein Fest im Jahr ersetzt das nicht.",
                },
                {
                  speaker: "Frau Alberti",
                  text: "Drittens: Der häufigste Grund für den Abbruch ist kein Streit. Es ist ein Umzug — meistens der Umzug der jüngeren Seite.",
                },
                {
                  speaker: "Frau Alberti",
                  text: "Was Kommunen daraus lernen können: Bänke wirken besser als Programme. Das klingt banal und ist trotzdem selten Teil der Planung.",
                },
                {
                  speaker: "Frau Alberti",
                  text: "Ein Hinweis zur Pflege: Über achtzig Prozent der Pflege leisten Angehörige, nicht Dienste. Diese Zahl ist seit Jahren stabil, obwohl fast jeder das Gegenteil annimmt.",
                },
                {
                  speaker: "Frau Alberti",
                  text: "Zum Schluss: Wer Angehörige entlasten will, sollte nicht bei den Pflegenden anfangen, sondern bei den Wegen dorthin. Zwei Stunden Fahrt am Tag machen jede Beratung wirkungslos.",
                },
              ],
              gloss: [
                { de: "die Angehörigen", tr: "yakınlar", en: "relatives" },
                { de: "die Veranstaltung", tr: "etkinlik", en: "event" },
                { de: "der Abbruch", tr: "(ilişkinin) kopması", en: "breaking off" },
              ],
            },
          ],
          items: [
            {
              kind: "bool",
              id: "de-b1-09-h3-16",
              no: 16,
              ref: "v1",
              text: "Frau Alberti forscht seit mehr als zehn Jahren zu diesem Thema.",
              answer: true,
              explain:
                "İlk cümle süreyi veriyor: \"seit vierzehn Jahren\" — on dört, ondan fazladır.",
            },
            {
              kind: "bool",
              id: "de-b1-09-h3-17",
              no: 17,
              ref: "v1",
              text: "Der Kontakt innerhalb der Familie hat abgenommen.",
              answer: false,
              explain:
                "Tersi söyleniyor: aile içinde \"telefonieren wir heute häufiger als vor zwanzig Jahren\". Azalan şey aile dışındaki temas.",
            },
            {
              kind: "bool",
              id: "de-b1-09-h3-18",
              no: 18,
              ref: "v1",
              text: "Nach ihr entsteht Nähe vor allem durch gemeinsame Wege.",
              answer: true,
              explain:
                "\"Nähe entsteht nicht durch Veranstaltungen, sondern durch Wege\" — aynı fırına gidenler konuşuyor.",
            },
            {
              kind: "bool",
              id: "de-b1-09-h3-19",
              no: 19,
              ref: "v1",
              text: "Der häufigste Grund für den Abbruch ist ein Streit.",
              answer: false,
              explain:
                "Sunum bunu eliyor: \"Der häufigste Grund für den Abbruch ist kein Streit. Es ist ein Umzug.\"",
            },
            {
              kind: "bool",
              id: "de-b1-09-h3-20",
              no: 20,
              ref: "v1",
              text: "Sie hält einfache Sitzgelegenheiten für wirksamer als Programme.",
              answer: true,
              explain:
                "Belediyelere önerisi bu: \"Bänke wirken besser als Programme\" — kulağa sıradan geldiği için planlamaya girmiyor.",
            },
            {
              kind: "bool",
              id: "de-b1-09-h3-21",
              no: 21,
              ref: "v1",
              text: "Die meisten Pflegeleistungen erbringen professionelle Dienste.",
              answer: false,
              explain:
                "Sayı tersini söylüyor: \"Über achtzig Prozent der Pflege leisten Angehörige, nicht Dienste\".",
            },
            {
              kind: "bool",
              id: "de-b1-09-h3-22",
              no: 22,
              ref: "v1",
              text: "Sie rät, zuerst die Wege zu den Angehörigen zu verkürzen.",
              answer: true,
              explain:
                "Kapanış öğüdü: bakım verenlerden değil \"bei den Wegen dorthin\" başlanmalı, çünkü günde iki saat yol her danışmayı etkisiz kılıyor.",
            },
          ],
        },
        {
          id: "de-b1-09-h4",
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
              situation: "Yaşlılıkta konut biçimleri tartışılıyor.",
              plays: 2,
              segments: [
                { speaker: "Moderatorin", text: "Frau Kemper, Sie pflegen Ihre Mutter zu Hause. Würden Sie ein Heim empfehlen?" },
                {
                  speaker: "Frau Kemper",
                  text: "Ich würde niemandem etwas empfehlen. Was ich sagen kann: Wir haben zu spät gefragt. Als es nicht mehr ging, war keine Zeit mehr zu wählen.",
                },
                { speaker: "Moderatorin", text: "Herr Solms, Sie leiten ein Pflegeheim. Hören Sie das oft?" },
                {
                  speaker: "Herr Solms",
                  text: "Fast immer. Die Menschen kommen bei uns im Notfall an, nicht nach einer Entscheidung. Das ist der eigentliche Grund, warum Heime einen so schlechten Ruf haben.",
                },
                { speaker: "Moderatorin", text: "Frau Kemper, überzeugt Sie das?" },
                {
                  speaker: "Frau Kemper",
                  text: "Teilweise. Nur löst früheres Fragen das Grundproblem nicht: Meine Mutter will nicht weg, und ich kann sie nicht zwingen.",
                },
                {
                  speaker: "Herr Solms",
                  text: "Da haben Sie recht. Wir reden über Wohnformen, als wäre es eine Sachfrage. Es ist eine Frage über das eigene Zuhause.",
                },
                { speaker: "Moderatorin", text: "Was wäre die Alternative?" },
                {
                  speaker: "Herr Solms",
                  text: "Kleinere Einheiten im Viertel. Acht Menschen in einer Wohnung, nicht achtzig in einem Haus. Das kostet nicht mehr, es ist nur schwerer zu organisieren.",
                },
                {
                  speaker: "Frau Kemper",
                  text: "Das würde meine Mutter vielleicht annehmen. Bei uns gibt es so etwas nicht, das nächste ist vierzig Kilometer weg.",
                },
                { speaker: "Moderatorin", text: "Ein gemeinsamer Punkt?" },
                {
                  speaker: "Herr Solms",
                  text: "Dass niemand im Notfall entscheiden sollte. Wer erst dann fragt, nimmt jede Wahl.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-b1-09-h4-23",
              no: 23,
              ref: "d1",
              text: "Was sagt Frau Kemper über ihre eigene Erfahrung?",
              options: [
                "Sie empfiehlt ein Heim.",
                "Sie hat zu spät gefragt.",
                "Sie bereut ihre Entscheidung.",
              ],
              answer: 1,
              explain:
                "Tavsiye vermeyi reddedip kendi hatasını söylüyor: \"Wir haben zu spät gefragt. Als es nicht mehr ging, war keine Zeit mehr zu wählen.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-24",
              no: 24,
              ref: "d1",
              text: "Wie erklärt Herr Solms den Ruf der Heime?",
              options: [
                "Mit dem Personalmangel in den Häusern.",
                "Mit den hohen Kosten für die Familien.",
                "Damit, dass Menschen im Notfall kommen.",
              ],
              answer: 2,
              explain:
                "Sebebi girişe bağlıyor: \"Die Menschen kommen bei uns im Notfall an, nicht nach einer Entscheidung.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-25",
              no: 25,
              ref: "d1",
              text: "Wie reagiert Frau Kemper darauf?",
              options: [
                "Sie stimmt teilweise zu.",
                "Sie widerspricht vollständig.",
                "Sie wechselt das Thema.",
              ],
              answer: 0,
              explain:
                "Tek sözcükle sınırlı onay veriyor — \"Teilweise\" — sonra çözülmeyen asıl sorunu ekliyor.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-26",
              no: 26,
              ref: "d1",
              text: "Welches Grundproblem nennt sie?",
              options: [
                "Die Kosten des Heimplatzes.",
                "Der Wille ihrer Mutter.",
                "Die Entfernung zur Familie.",
              ],
              answer: 1,
              explain:
                "\"Meine Mutter will nicht weg, und ich kann sie nicht zwingen\" — sorun para ya da mesafe değil.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-27",
              no: 27,
              ref: "d1",
              text: "Wie beurteilt Herr Solms die öffentliche Debatte?",
              options: [
                "Sie behandelt eine persönliche Frage als Sachfrage.",
                "Sie überschätzt die Rolle der Familien.",
                "Sie ist zu wenig sachlich.",
              ],
              answer: 0,
              explain:
                "\"Wir reden über Wohnformen, als wäre es eine Sachfrage. Es ist eine Frage über das eigene Zuhause.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-28",
              no: 28,
              ref: "d1",
              text: "Welche Alternative schlägt er vor?",
              options: [
                "Mehr Personal in großen Häusern.",
                "Kleine Einheiten im Viertel.",
                "Pflege nur noch zu Hause.",
              ],
              answer: 1,
              explain:
                "Ölçeği değiştiriyor: \"Acht Menschen in einer Wohnung, nicht achtzig in einem Haus.\"",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-29",
              no: 29,
              ref: "d1",
              text: "Was sagt er über die Kosten dieser Alternative?",
              options: [
                "Sie ist deutlich teurer.",
                "Sie spart erheblich Geld.",
                "Sie kostet nicht mehr.",
              ],
              answer: 2,
              explain:
                "\"Das kostet nicht mehr, es ist nur schwerer zu organisieren\" — engel para değil, örgütlenme.",
            },
            {
              kind: "mcq",
              id: "de-b1-09-h4-30",
              no: 30,
              ref: "d1",
              text: "Worin sind sich beide einig?",
              options: [
                "Dass Heime meistens die beste Lösung sind.",
                "Dass man nicht erst im Notfall fragen sollte.",
                "Dass die Politik mehr zahlen muss.",
              ],
              answer: 1,
              explain:
                "Kapanış cümlesi ortak noktayı veriyor: \"Dass niemand im Notfall entscheiden sollte. Wer erst dann fragt, nimmt jede Wahl.\"",
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
          id: "de-b1-09-s1",
          no: 1,
          format: "writing",
          goal: "interaction",
          prompt:
            "Ihre Schwester schlägt vor, dass Sie beide sich bei der Pflege Ihrer Mutter wochenweise abwechseln. Sie finden die Idee gut, haben aber Bedenken. Schreiben Sie ihr (circa 80 Wörter).",
          promptTr:
            "Kız kardeşin, annenizin bakımında haftalık sırayla nöbetleşmeyi öneriyor. Fikri iyi buluyorsun ama çekincelerin var. Ona yaz (yaklaşık 80 kelime).",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Reagieren Sie auf den Vorschlag.", tr: "Öneriye karşılık ver." },
              { de: "Nennen Sie Ihre Bedenken.", tr: "Çekincelerini söyle." },
              { de: "Machen Sie einen konkreten Gegenvorschlag.", tr: "Somut bir karşı öneri sun." },
              { de: "Fragen Sie nach ihrer Meinung.", tr: "Onun görüşünü sor." },
            ],
            sample: `Liebe Nadja,

deinen Vorschlag finde ich grundsätzlich richtig. Bisher hängt alles an dir, und das kann so nicht bleiben.

Zwei Dinge machen mir Sorgen. Erstens fahre ich anderthalb Stunden zu Mama, eine ganze Woche schaffe ich neben der Arbeit nicht. Zweitens braucht sie feste Abläufe, und ein Wechsel jede Woche verwirrt sie eher.

Mein Vorschlag wäre: Du bleibst wie bisher unter der Woche, ich übernehme jedes zweite Wochenende komplett. Dazu beantragen wir die Verhinderungspflege für die Ferien.

Was hältst du davon?

Viele Grüße
Deniz`,
            criteria: [
              "Dört içerik noktasının hepsi işlendi mi?",
              "Çekinceler somut mu (mesafe, iş, annenin alışkanlıkları), yoksa genel bir tereddüt mü?",
              "Karşı öneri uygulanabilir ve ölçülebilir mi?",
              "Kardeşe yazıldığı için `du` kullanıldı mı ve ton uygun mu?",
              "Yaklaşık 80 kelime var mı ve soru gerçekten sorulmuş mu?",
            ],
          },
        },
        {
          id: "de-b1-09-s2",
          no: 2,
          format: "writing",
          goal: "production",
          prompt:
            "Schreiben Sie einen Beitrag für die Hauszeitung: Was hilft wirklich, wenn Alt und Jung im selben Haus wohnen? (circa 80 Wörter)",
          promptTr:
            "Bina gazetesi için bir yazı yaz: Yaşlı ve genç aynı binada otururken gerçekten ne işe yarar? (yaklaşık 80 kelime)",
          items: [],
          rubric: {
            minWords: 80,
            points: [
              { de: "Nennen Sie ein Beispiel aus Ihrer Erfahrung.", tr: "Kendi deneyiminden bir örnek ver." },
              { de: "Sagen Sie, was Ihrer Meinung nach am wichtigsten ist.", tr: "Sence en önemlisinin ne olduğunu söyle." },
              { de: "Nennen Sie etwas, das oft schiefgeht.", tr: "Sık sık ters giden bir şeyi söyle." },
              { de: "Geben Sie einen konkreten Rat.", tr: "Somut bir öneride bulun." },
            ],
            sample: `In unserem Haus hat eine Nachbarin einfach angefangen, samstags Kaffee vor die Tür zu stellen. Wer wollte, kam dazu. Nach einem halben Jahr kannte ich mehr Leute als in fünf Jahren davor.

Am wichtigsten finde ich, dass Kontakt beiläufig entstehen kann. Ein Termin im Kalender ist schon eine Hürde.

Schief geht es meistens bei der Lautstärke. Was für eine Studentin früher Abend ist, ist für eine Achtzigjährige Nacht.

Mein Rat: Fangen Sie mit etwas an, das man auch wieder lassen kann.`,
            criteria: [
              "Dört içerik noktası da işlendi mi?",
              "Örnek gerçekten kişisel bir sahne mi, yoksa genel bir cümle mi?",
              "Ters giden şey somut mu ve iki tarafı da anlaşılır kılıyor mu?",
              "Öğüt uygulanabilir mi ve yazının kalanıyla tutarlı mı?",
              "Yaklaşık 80 kelime var mı?",
            ],
          },
        },
        {
          id: "de-b1-09-s3",
          no: 3,
          format: "writing",
          goal: "interaction",
          prompt:
            "Sie möchten den Gemeinschaftsraum für den achtzigsten Geburtstag Ihres Vaters buchen, aber die Liste ist an dem Tag schon voll. Schreiben Sie an den Verein (circa 40 Wörter).",
          promptTr:
            "Babanın sekseninci yaş günü için ortak salonu ayırtmak istiyorsun ama o gün liste dolu. Derneğe yaz (yaklaşık 40 kelime).",
          items: [],
          rubric: {
            minWords: 40,
            points: [
              { de: "Sagen Sie, warum Sie schreiben.", tr: "Neden yazdığını söyle." },
              { de: "Erklären Sie, warum der Tag wichtig ist.", tr: "O günün neden önemli olduğunu açıkla." },
              { de: "Fragen Sie nach einer Möglichkeit.", tr: "Bir imkân olup olmadığını sor." },
            ],
            sample: `Liebe Vereinsmitglieder,

am Samstag, dem 14. Juni, wird mein Vater achtzig. Für diesen Tag ist der Gemeinschaftsraum leider schon eingetragen.

Da meine Geschwister aus dem Ausland anreisen, lässt sich das Datum nicht verschieben.

Gibt es eine Möglichkeit, den Raum am Nachmittag zu teilen, oder wisst ihr einen anderen Weg?

Viele Grüße
Deniz Kemper`,
            criteria: [
              "Üç içerik noktası da var mı?",
              "Tarih ve durum somut verildi mi?",
              "Günün neden değiştirilemediği anlaşılıyor mu?",
              "Soru gerçekten bir imkân soruyor mu, yoksa talep mi ediyor?",
              "Yaklaşık 40 kelime var mı ve ton uygun mu?",
            ],
          },
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat drei Aufgaben: gemeinsam planen, einen kurzen Vortrag halten, auf eine Sorge reagieren.",
      instructionTr: "Bu bölümde üç görev var: birlikte planlama, kısa sunum, bir kaygıya karşılık verme.",
      tasks: [
        {
          id: "de-b1-09-p1",
          no: 1,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Planen Sie gemeinsam den achtzigsten Geburtstag eines Familienmitglieds. Sprechen Sie über: Termin — Ort — wer eingeladen wird — wer was übernimmt.",
          promptTr:
            "Bir aile büyüğünün sekseninci yaş gününü birlikte planla. Şunları konuş: tarih — yer — kimler davet edilecek — kim neyi üstlenecek?",
          prepSeconds: 60,
          exchange: [
            {
              who: "partner",
              de: "Wir planen zusammen die Feier. Zuerst der Termin: Der eigentliche Geburtstag ist ein Mittwoch. Was schlagen Sie vor?",
              tr: "Kutlamayı birlikte planlıyoruz. Önce tarih: Asıl doğum günü çarşambaya denk geliyor. Ne önerirsin?",
            },
            { who: "you", hint: "Somut bir gün öner ve gerekçelendir.", expect: "somut bir gün önermek ve gerekçelendirmek", seconds: 40 },
            {
              who: "partner",
              de: "Gut. Und der Ort? Zu Hause wird es eng, ein Lokal ist teuer.",
              tr: "Peki. Yer neresi olsun? Evde dar olur, lokanta pahalı.",
            },
            { who: "you", hint: "Bir yer öner ve iki itirazı da hesaba kat.", expect: "bir yer önermek ve iki itirazı birden dikkate almak", seconds: 40 },
            {
              who: "partner",
              de: "Einverstanden. Wen laden wir ein? Zwei Verwandte reden seit Jahren nicht miteinander.",
              tr: "Anlaştık. Kimleri çağıralım? İki akraba yıllardır konuşmuyor.",
            },
            { who: "you", hint: "Davet için bir çözüm öner ve bu durumu da düşün.", expect: "davet listesi için bir çözüm önermek ve çatışmayı dikkate almak", seconds: 45 },
            {
              who: "partner",
              de: "Bleiben die Aufgaben. Ich kann das Essen nicht auch noch machen.",
              tr: "Geriye görevler kaldı. Yemeği de ben yapamam.",
            },
            { who: "you", hint: "Görevleri paylaştır ve en az birini üstlen.", expect: "görevleri paylaştırmak ve açıkça bir iş üstlenmek", seconds: 35 },
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
              "Ich schlage den Samstag danach vor, dann können auch die Leute von weiter weg kommen. Als Ort nehmen wir den Gemeinschaftsraum im Haus: Der ist groß genug und kostet fast nichts. Einladen würde ich alle, aber ich rufe die beiden vorher getrennt an und sage, wer sonst kommt — dann entscheidet jeder selbst. Bei den Aufgaben mache ich das Essen zusammen mit meinem Bruder, du kümmerst dich nur um die Einladungen und die Musik.",
            criteria: [
              "Dört noktanın hepsi konuşuldu mu?",
              "Öneriler somut mu (gün, yer, düzen)?",
              "Her itiraz (çalışma günü, dar yer, maliyet, küs akrabalar, yük) gerçekten karşılandı mı?",
              "En az bir iş açıkça üstlenildi mi?",
              "Gerekçe bağlaçları kullanıldı mı? (weil, damit, deshalb)",
            ],
          },
        },
        {
          id: "de-b1-09-p2",
          no: 2,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen kurzen Vortrag: Sollen ältere Menschen bei ihren Kindern wohnen? Sprechen Sie über Vorteile, Nachteile und Ihre eigene Erfahrung. Sprechen Sie etwa drei Minuten.",
          promptTr:
            "Kısa bir sunum yap: Yaşlılar çocuklarının yanında mı yaşamalı? Avantajları, dezavantajları ve kendi deneyimini anlat. Yaklaşık üç dakika konuş.",
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
              "Für das Zusammenwohnen spricht vor allem der Alltag: Man merkt sofort, wenn etwas nicht stimmt, und niemand muss anrufen, um zu fragen, ob alles in Ordnung ist. Meine Großmutter hat sieben Jahre bei uns gewohnt, und ich habe als Kind sehr davon profitiert. Dagegen spricht, dass die Last fast immer auf einer Person liegt, meistens auf einer Tochter oder Schwiegertochter. Bei uns war das meine Mutter, und sie hatte in diesen Jahren keinen einzigen freien Sonntag. Meine Position ist deshalb: Zusammenwohnen ist gut, aber nur, wenn es geteilt wird. Wenn nur einer trägt, ist die Nähe kein Vorteil mehr, sondern ein Grund für Streit.",
            criteria: [
              "Her iki taraf da gerçekten anlatıldı mı?",
              "Kendi deneyimi somut mu (kim, ne kadar süre, ne oldu)?",
              "Konum gerekçelendirildi mi ve anlatılanlarla tutarlı mı?",
              "Karşılaştırma yapıları kullanıldı mı? (dafür spricht, dagegen spricht)",
              "Üç dakika boyunca konuşma sürdürülebildi mi?",
            ],
          },
        },
        {
          id: "de-b1-09-p3",
          no: 3,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Reagieren Sie auf eine Sorge. Ihre Nachbarin sagt, sie schaffe die Pflege ihres Mannes nicht mehr allein. Hören Sie zu, antworten Sie und suchen Sie eine Lösung.",
          promptTr:
            "Bir kaygıya karşılık ver. Komşun, eşinin bakımını tek başına kaldıramadığını söylüyor. Dinle, cevap ver ve bir çözüm ara.",
          prepSeconds: 45,
          exchange: [
            {
              who: "partner",
              de: "Ich muss das mal jemandem sagen. Seit dem Sturz meines Mannes komme ich kaum noch aus der Wohnung. Ich schlafe nachts drei, vier Stunden.",
              tr: "Bunu birine söylemem gerek. Eşim düştüğünden beri evden neredeyse hiç çıkamıyorum. Geceleri üç dört saat uyuyorum.",
            },
            {
              who: "you",
              hint: "Önce dinlediğini göster, hemen çözüm önerme.",
              expect: "kaygıyı ciddiye almak ve hemen tavsiyeye atlamamak",
              seconds: 40,
            },
            {
              who: "partner",
              de: "Von der Beratung habe ich gehört, aber ich kann ihn nicht allein lassen, um dorthin zu fahren. Genau das ist ja das Problem.",
              tr: "Danışmayı duydum ama oraya gitmek için onu yalnız bırakamam. Sorun tam da bu zaten.",
            },
            {
              who: "you",
              hint: "Bu itirazı ciddiye al ve somut bir çözüm öner.",
              expect: "itirazı ciddiye almak ve uygulanabilir bir çözüm önermek",
              seconds: 45,
            },
            {
              who: "partner",
              de: "Und wenn ich einmal ausfalle? Ich möchte niemandem zur Last fallen, auch Ihnen nicht.",
              tr: "Ya bir gün ben de hastalanırsam? Kimseye yük olmak istemiyorum, sana da.",
            },
            {
              who: "you",
              hint: "Bu kaygıyı ele al ve gerçekçi bir şey öner.",
              expect: "yük olma kaygısını ele almak ve gerçekçi bir öneri sunmak",
              seconds: 45,
            },
          ],
          items: [],
          rubric: {
            minutes: 4,
            points: [
              { de: "zuhören und ernst nehmen", tr: "Dinlemek ve ciddiye almak" },
              { de: "auf Einwände eingehen", tr: "İtirazlara girmek" },
              { de: "eine konkrete Hilfe anbieten", tr: "Somut bir yardım önermek" },
            ],
            sample:
              "Das klingt nach sehr viel, und ich finde es gut, dass Sie es sagen. Drei Stunden Schlaf hält niemand lange durch. Zur Beratung: Die kommen auch zu Ihnen nach Hause, das wusste ich lange selbst nicht. Ich kann anrufen und fragen, wenn Sie möchten. Und wenn Sie einmal ausfallen — dafür gibt es die Verhinderungspflege, das ist kein Gefallen, sondern ein Anspruch. Zur Last fallen Sie mir nicht. Ich gehe dienstags sowieso einkaufen; ich kann für Sie mitgehen, wenn Sie mir eine Liste schreiben.",
            criteria: [
              "Kaygı ciddiye alındı mı, yoksa hemen tavsiyeye mi geçildi?",
              "Karşı tarafın itirazı (gidememe) gerçekten çözüldü mü?",
              "Yük olma kaygısı ele alındı mı ve nasıl yumuşatıldı?",
              "Sunulan yardım gerçek ve sürdürülebilir mi?",
              "Ton koruyucu değil, eşit düzeyde mi?",
            ],
          },
        },
      ],
    },
  ],
};
