import type { MockPaper } from "../types";

/**
 * C1 · Deneme 4 — "Alter und Generationen".
 *
 * PLAN kâğıt 1–3 ile birebir aynı.
 *
 *   Lesen  70 dk · 25 madde   (10 özet boşluğu · 10 dört şıklı · 5 boşluklu seçme)
 *   Hören  40 dk · 25 madde   (10 not · 15 üç şıklı)
 *   Schreiben 80 dk           (200 kelime + 10 boşluklu resmî yazı)
 *   Sprechen  15 dk           (sunum + konum savunma)
 *
 * KONU SEÇİMİ: yaşlanma, sayıların herkesçe bilindiği ama yorumun ayrıştığı
 * bir alan. Maddeler bu yüzden veriyi değil, veriden çıkarılan sonucu
 * soruyor: aynı rakamdan iki farklı sonuç çıkaran metinleri ayırt etmek.
 */
export const C1_04: MockPaper = {
  id: "de-c1-04",
  course: "de",
  level: "C1",
  no: 4,
  theme: "Alter und Generationen",
  themeTr: "Yaşlılık ve kuşaklar",
  minutes: 205,
  parts: [
    /* ── LESEN ─────────────────────────────────────────────────────────── */
    {
      skill: "reading",
      minutes: 70,
      instruction:
        "Dieser Teil hat drei Aufgaben: eine Zusammenfassung ergänzen, einen längeren Text auswerten und Lücken in einem Zeitschriftentext füllen.",
      instructionTr:
        "Bu bölümde üç görev var: bir özeti tamamlamak, uzun bir metni değerlendirmek ve bir dergi metnindeki boşlukları doldurmak.",
      tasks: [
        {
          id: "de-c1-04-l1",
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
              title: "Das Alter, das es nicht gibt",
              body: `Kaum eine Zahl wird so oft genannt und so selten aufgeschlüsselt wie die Zahl der über Sechzigjährigen. Sie steigt, das ist unstrittig. Was daraus folgt, hängt jedoch davon ab, ob man sie als eine Gruppe behandelt oder als das, was sie tatsächlich ist: die größte Sammelbezeichnung, die unsere Statistik kennt.

Zwischen einer Fünfundsechzigjährigen und einem Neunzigjährigen liegen fünfundzwanzig Jahre. Niemand käme auf den Gedanken, Zwanzig- und Fünfundvierzigjährige in einer Kategorie zu führen und für beide dieselben Angebote zu planen. Genau das geschieht am oberen Ende der Skala regelmäßig.

Die Unterschiede innerhalb der Gruppe sind größer als die Unterschiede zwischen ihr und anderen Altersgruppen. Beim Einkommen etwa liegt die Spanne im Alter weiter auseinander als in jeder anderen Lebensphase, weil sich Erwerbsbiografien über Jahrzehnte fortschreiben: Wer unterbrochen gearbeitet hat, erkennt das an der Rente. Ähnliches gilt für Gesundheit. Die vielzitierte durchschnittliche Lebenserwartung verdeckt, dass die Zahl der gesunden Jahre zwischen Berufsgruppen um mehr als ein Jahrzehnt auseinanderfällt.

Der Fehler ist nicht bloß begrifflich. Wo Politik mit dem Durchschnitt plant, entstehen Angebote, die weder den einen noch den anderen erreichen. Ein Bewegungskurs für "Seniorinnen und Senioren" richtet sich faktisch an die rüstige Minderheit; die Hochaltrigen kommen nicht hin, und die Sechzigjährigen fühlen sich nicht gemeint.

Hinzu tritt eine Verschiebung, die in der öffentlichen Wahrnehmung noch nicht angekommen ist. Der Zuwachs findet gegenwärtig kaum bei den jungen Alten statt, sondern bei den über Fünfundachtzigjährigen — jener Gruppe also, deren Bedarf am wenigsten mit Freizeitangeboten und am meisten mit Alltagshilfe zu tun hat. Wer den demografischen Wandel als Freizeitfrage behandelt, plant an der wachsenden Gruppe vorbei.

Gegen die Aufschlüsselung wird eingewandt, sie erschwere die Verständigung. Das trifft zu, wiegt aber leichter als der Schaden gröberer Begriffe. Wo differenziert wird, lassen sich Maßnahmen prüfen; wo alles Alter heißt, lässt sich jede Maßnahme rechtfertigen.

Ein letzter Punkt betrifft die Sprache selbst. Die Rede von den Alten als Last einerseits und als ungenutzter Ressource andererseits klingt entgegengesetzt und teilt dieselbe Voraussetzung: Beide Formeln bewerten Menschen nach ihrem Beitrag. Dass jemand weder Last noch Ressource sein muss, kommt in keiner der beiden Formeln vor.`,
              gloss: [
                { de: "aufschlüsseln", tr: "ayrıntısına ayırmak", en: "to break down" },
                { de: "die Erwerbsbiografie", tr: "çalışma geçmişi", en: "employment history" },
                { de: "rüstig", tr: "dinç", en: "sprightly" },
                { de: "hochaltrig", tr: "ileri yaşlı", en: "very old" },
              ],
            },
            {
              kind: "text",
              id: "z1",
              genre: "Zusammenfassung",
              genreTr: "Özet",
              title: "Zusammenfassung mit Lücken",
              body: `Die Zahl der über Sechzigjährigen steigt unstrittig; umstritten ist, was daraus folgt. Der Text hält sie für die größte {{1}} der Statistik, weil zwischen ihren Mitgliedern bis zu {{2}} Jahre liegen.

Die Unterschiede innerhalb der Gruppe sind {{3}} als die Unterschiede zu anderen Altersgruppen. Beim Einkommen ist die Spanne besonders weit, weil sich {{4}} über Jahrzehnte fortschreiben. Bei der Gesundheit verdeckt der Durchschnitt, dass die Zahl der gesunden Jahre zwischen Berufsgruppen um über ein {{5}} auseinandergeht.

Wer mit dem Durchschnitt plant, schafft Angebote, die {{6}} erreichen. Erschwerend kommt hinzu, dass der Zuwachs derzeit vor allem bei den {{7}} stattfindet, deren Bedarf weniger Freizeit als {{8}} betrifft.

Gegen eine feinere Einteilung spricht, dass sie die Verständigung {{9}}. Der Text hält diesen Einwand für berechtigt, aber für weniger schwerwiegend. Zuletzt kritisiert er beide gängigen Formeln — Last und Ressource —, weil sie Menschen nach ihrem {{10}} bewerten.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-04-l1-1",
              no: 1,
              text: "Lücke 1",
              accept: ["Sammelbezeichnung", "Sammelkategorie", "Kategorie", "Gruppe"],
              explain:
                "Metin adlandırmayı kendisi yapıyor: \"die größte Sammelbezeichnung, die unsere Statistik kennt\". Özet aynı üstünlük derecesini koruyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-2",
              no: 2,
              text: "Lücke 2",
              accept: ["25", "fünfundzwanzig"],
              explain:
                "Örnek metinde: 65 yaşındaki bir kadın ile 90 yaşındaki bir adam arasında \"fünfundzwanzig Jahre\" var. Özet bu aralığı sayıyla istiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-3",
              no: 3,
              text: "Lücke 3",
              accept: ["größer", "stärker", "ausgeprägter"],
              explain:
                "Metnin savı: \"Die Unterschiede innerhalb der Gruppe sind größer als die Unterschiede zwischen ihr und anderen Altersgruppen\".",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-4",
              no: 4,
              text: "Lücke 4",
              accept: ["Erwerbsbiografien", "Erwerbsbiographien", "Berufsbiografien", "Lebensläufe"],
              explain:
                "Gelir aralığının nedeni metinde: \"weil sich Erwerbsbiografien über Jahrzehnte fortschreiben\" — kesintili çalışma emeklilikte görünüyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-5",
              no: 5,
              text: "Lücke 5",
              accept: ["Jahrzehnt"],
              explain:
                "Sağlıklı yıl sayısı meslek grupları arasında \"um mehr als ein Jahrzehnt\" ayrışıyor; ortalama yaşam beklentisi bunu örtüyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-6",
              no: 6,
              text: "Lücke 6",
              accept: ["niemanden", "keinen", "kaum jemanden"],
              explain:
                "Metin sonucu ikili olumsuzlukla veriyor: ortalamayla planlanan hizmetler \"weder den einen noch den anderen\" ulaşıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-7",
              no: 7,
              text: "Lücke 7",
              accept: [
                "Hochaltrigen",
                "über Fünfundachtzigjährigen",
                "Ältesten",
                "Hochbetagten",
                "über 85-Jährigen",
              ],
              explain:
                "Artışın yeri metinde: \"nicht bei den jungen Alten, sondern bei den über Fünfundachtzigjährigen\". Özet bu grubu adlandırmayı istiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-8",
              no: 8,
              text: "Lücke 8",
              accept: ["Alltagshilfe", "Hilfe", "Pflege", "Unterstützung"],
              explain:
                "Aynı cümlenin devamı: bu grubun ihtiyacı \"am wenigsten mit Freizeitangeboten und am meisten mit Alltagshilfe\" ilgili.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-9",
              no: 9,
              text: "Lücke 9",
              accept: ["erschwert", "erschwere", "behindert"],
              explain:
                "İtiraz metinde aktarılıyor: ayrıntılandırma \"erschwere die Verständigung\". Metin bunu doğru buluyor ama daha hafif sayıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-l1-10",
              no: 10,
              text: "Lücke 10",
              accept: ["Beitrag", "Nutzen", "Wert"],
              explain:
                "Son paragrafın eleştirisi: \"Beide Formeln bewerten Menschen nach ihrem Beitrag\" — yük ve kaynak sözcükleri zıt görünse de aynı varsayımı paylaşıyor.",
            },
          ],
        },
        {
          id: "de-c1-04-l2",
          no: 2,
          format: "mcq",
          goal: "opinion",
          prompt: "Lesen Sie den Text und die Aufgaben 11 bis 20. Wählen Sie: a, b, c oder d.",
          promptTr: "Metni ve 11–20. maddeleri oku. a, b, c ya da d'yi seç.",
          texts: [
            {
              kind: "text",
              id: "t2",
              genre: "Reportage",
              genreTr: "Röportaj-inceleme",
              title: "Der Kurs, den niemand belegen wollte",
              body: `Als die Volkshochschule Rendsburg im Herbst 2019 einen Kurs für pflegende Angehörige anbot, meldeten sich zwei Personen an. Der Kurs fiel aus. Vier Jahre später führt Marlies Ahrend, damals Programmleiterin, dieselbe Veranstaltung mit Warteliste — und zwar, wie sie betont, ohne dass sich am Inhalt viel geändert hätte.

Verändert hat sich der Titel. Aus "Pflegekurs für Angehörige" wurde "Wenn Eltern älter werden — was auf Sie zukommt". Die Beschreibung nennt weder Pflege noch Angehörige. Dass darin die Erklärung liegen soll, klingt zunächst nach Marketing, doch Ahrend führt einen Befund an, der dagegen spricht, es dabei zu belassen: In den Anmeldungen gaben zwei Drittel an, aktuell niemanden zu pflegen. Der alte Titel hatte also nicht die Zielgruppe abgeschreckt, sondern falsch geschnitten.

Wer den Kurs besucht, erlebt keine Schulung in Handgriffen. Es geht um Anträge, um Fristen, um die Frage, wer im Ernstfall entscheiden darf. Der praktische Teil, das Heben und Lagern, nimmt einen einzigen Abend von acht ein. "Das ist die Umkehrung dessen, was die Leute erwarten", sagt Ahrend. "Sie kommen wegen des Rückens und bleiben wegen der Vollmacht."

Die Zahlen, die sie dabei nennt, sind bekannt und werden trotzdem selten zusammengedacht. Rund vier Fünftel der Pflege in Deutschland findet zu Hause statt, überwiegend durch Angehörige, überwiegend durch Frauen. Der durchschnittliche Vorlauf zwischen dem ersten ernsten Vorfall und der Übernahme von Pflegeaufgaben beträgt nach einer Erhebung der Kasse, mit der die Volkshochschule kooperiert, elf Tage. Elf Tage, um Arbeitszeit, Wohnung und Familienabsprachen zu ordnen.

Genau daraus zieht Ahrend ihren Schluss, und er ist unbequem für ihr eigenes Haus: Ein Kurs, der erst besucht wird, wenn der Fall eintritt, kommt strukturell zu spät. Erwachsenenbildung müsse hier gegen ihr eigenes Prinzip arbeiten, das Nachfrage voraussetzt. Nachfrage entsteht nämlich in dem Moment, in dem für Bildung keine Zeit mehr ist.

Kritik daran gibt es. Ein Wohlfahrtsverband hält solche Kurse für eine Verlagerung staatlicher Aufgaben in die Familien: Wer Angehörige besser schult, mache es leichter, die Versorgungslücke zu ignorieren. Ahrend hält den Einwand für ernst und die Schlussfolgerung für falsch. Die Angehörigen pflegten ohnehin, mit oder ohne Kurs; ihnen die Vorbereitung zu verweigern, um ein politisches Signal zu setzen, verlagere die Kosten lediglich auf jene, die bereits am meisten trügen.

Zwei Dinge würde sie heute anders machen. Erstens hat der Kurs zunächst abends stattgefunden, was gerade diejenigen ausschloss, die abends versorgen; er läuft inzwischen am Vormittag und wird zusätzlich aufgezeichnet. Zweitens saßen im ersten Durchgang ausschließlich Töchter und Ehefrauen im Raum. Nach einer gezielten Ansprache über Betriebsräte liegt der Männeranteil bei einem Viertel. Das sei kein Erfolg, sagt Ahrend, sondern eine Korrektur.

Ob das Modell trägt, wird sich zeigen. Die Kasse hat die Förderung um zwei Jahre verlängert, allerdings mit der Auflage, Wirkungen zu messen — was Ahrend für schwierig hält. "Wir können zählen, wer kommt. Was wir nicht messen können, ist die Krise, die deshalb ausgeblieben ist."`,
              gloss: [
                { de: "die Vollmacht", tr: "vekâletname", en: "power of attorney" },
                { de: "der Vorlauf", tr: "hazırlık süresi", en: "lead time" },
                { de: "die Versorgungslücke", tr: "bakım açığı", en: "care gap" },
                { de: "die Auflage", tr: "koşul, şart", en: "condition, requirement" },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-04-l2-11",
              no: 11,
              ref: "t2",
              text: "Was hat sich zwischen 2019 und heute verändert?",
              options: [
                "Der inhaltliche Aufbau des Kurses.",
                "Die Zusammensetzung der Dozentenschaft.",
                "Vor allem die Bezeichnung des Angebots.",
                "Die Zahl der angebotenen Termine.",
              ],
              answer: 2,
              explain:
                "Ahrend içeriğin büyük ölçüde aynı kaldığını vurguluyor; değişen şey başlık ve tanıtım metni. Ders sayısı ya da eğitmen kadrosu metinde hiç geçmiyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-12",
              no: 12,
              ref: "t2",
              text: "Welchen Befund führt Ahrend gegen eine rein werbliche Deutung an?",
              options: [
                "Zwei Drittel der Angemeldeten pflegen niemanden.",
                "Die Teilnehmerzahl steigt auch ohne Werbung.",
                "Der Kurs wird inzwischen von der Kasse gefördert.",
                "Die Kosten für Werbung sind gleich geblieben.",
              ],
              answer: 0,
              explain:
                "\"In den Anmeldungen gaben zwei Drittel an, aktuell niemanden zu pflegen\" — kayıt olanların çoğu o an kimseye bakmıyor. Bu, eski başlığın hedef kitleyi ürkütmediğini, yanlış kestiğini gösteriyor — pazarlama açıklamasından farklı bir sonuç.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-13",
              no: 13,
              ref: "t2",
              text: "Wie ist der Kurs inhaltlich gewichtet?",
              options: [
                "Praktische Handgriffe stehen im Mittelpunkt.",
                "Medizinisches Grundwissen füllt den größten Teil.",
                "Der Austausch der Teilnehmenden trägt den Kurs.",
                "Rechtliche und organisatorische Fragen überwiegen.",
              ],
              answer: 3,
              explain:
                "Sekiz akşamın yalnız biri kaldırma ve pozisyon verme; geri kalanı başvurular, süreler ve karar yetkisi. Ahrend bunu \"die Umkehrung dessen, was die Leute erwarten\" diye adlandırıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-14",
              no: 14,
              ref: "t2",
              text: "Was bedeutet der Satz \"Sie kommen wegen des Rückens und bleiben wegen der Vollmacht\"?",
              options: [
                "Der praktische Teil sollte gestrichen werden.",
                "Der Anlass des Kommens ist ein anderer als der Nutzen.",
                "Die Teilnehmenden wechseln im Verlauf den Kurs.",
                "Rückenschmerzen sind das häufigste Pflegeproblem.",
              ],
              answer: 1,
              explain:
                "\"Sie kommen wegen des Rückens und bleiben wegen der Vollmacht\" — gelme nedeni bedensel zorlanma, kalma nedeni hukuki hazırlık. Yani beklenti ile fayda örtüşmüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-15",
              no: 15,
              ref: "t2",
              text: "Wozu dient die Zahl von elf Tagen?",
              options: [
                "Sie zeigt, wie kurz die Vorbereitungszeit ausfällt.",
                "Sie belegt die durchschnittliche Dauer eines Kurses.",
                "Sie beziffert die Wartezeit auf einen Pflegeplatz.",
                "Sie nennt die Frist für einen Antrag bei der Kasse.",
              ],
              answer: 0,
              explain:
                "Metne göre bu süre \"elf Tage\": ilk ciddi olay ile bakımın üstlenilmesi arasında 11 gün var. Metin bunu hemen ardından açıyor: bu sürede iş, konut ve aile düzeni ayarlanmak zorunda.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-16",
              no: 16,
              ref: "t2",
              text: "Welchen Schluss zieht Ahrend daraus für die Erwachsenenbildung?",
              options: [
                "Kurse müssen kürzer und praxisnäher werden.",
                "Kurse sollten ausschließlich online stattfinden.",
                "Kurse müssen entgegen der Nachfrage angeboten werden.",
                "Kurse gehören in die Verantwortung der Kassen.",
              ],
              answer: 2,
              explain:
                "Sonucu kendi kurumuna karşı: talep, eğitim için zamanın kalmadığı anda doğuyor. Bu yüzden yetişkin eğitimi \"gegen ihr eigenes Prinzip\" çalışmak zorunda.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-17",
              no: 17,
              ref: "t2",
              text: "Worin besteht die Kritik des Wohlfahrtsverbands?",
              options: [
                "Die Kurse seien fachlich zu anspruchsvoll.",
                "Die Kurse erleichterten das Übersehen staatlicher Lücken.",
                "Die Kurse erreichten die falsche Altersgruppe.",
                "Die Kurse würden zu selten angeboten.",
              ],
              answer: 1,
              explain:
                "İtiraz devlet görevinin aileye kaydırılması üzerine: yakınları daha iyi eğitmek \"mache es leichter, die Versorgungslücke zu ignorieren\".",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-18",
              no: 18,
              ref: "t2",
              text: "Wie geht Ahrend mit dieser Kritik um?",
              options: [
                "Sie akzeptiert die Kritik, nicht ihre Folgerung.",
                "Sie weist die Kritik als politisch motiviert zurück.",
                "Sie übernimmt ihn und schränkt das Angebot ein.",
                "Sie verweist auf die Zuständigkeit der Kasse.",
              ],
              answer: 0,
              explain:
                "İtirazı ciddiye alıyor ama sonucunu reddediyor: yakınlar zaten bakıyor, hazırlığı esirgemek maliyeti \"auf jene, die bereits am meisten trügen\" yüklüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-19",
              no: 19,
              ref: "t2",
              text: "Warum wurde die Uhrzeit des Kurses geändert?",
              options: [
                "Weil die Räume abends belegt waren.",
                "Weil die Aufzeichnung tagsüber einfacher ist.",
                "Weil die Kasse einen Vormittagstermin verlangte.",
                "Weil abends gerade die Zielgruppe ausgeschlossen war.",
              ],
              answer: 3,
              explain:
                "Akşam saati \"gerade diejenigen ausschloss, die abends versorgen\" — yani hedef kitleyi dışarıda bırakıyordu. Kurs sabaha alınmış ve ayrıca kaydediliyor; kayıt bir sonuç, gerekçe değil.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l2-20",
              no: 20,
              ref: "t2",
              text: "Worin sieht Ahrend die Schwierigkeit der geforderten Wirkungsmessung?",
              options: [
                "Die Teilnehmerzahlen sind zu klein für eine Auswertung.",
                "Ausgebliebene Krisen lassen sich nicht zählen.",
                "Die Kasse gibt die Kriterien nicht bekannt.",
                "Die Förderung läuft dafür zu kurz.",
              ],
              answer: 1,
              explain:
                "Son sözü ölçülemeyeni adlandırıyor: \"Was wir nicht messen können, ist die Krise, die deshalb ausgeblieben ist.\" Katılım sayılabiliyor, önlenen kriz sayılamıyor.",
            },
          ],
        },
        {
          id: "de-c1-04-l3",
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
              title: "Die Rückkehr der Großfamilie — auf Zeit",
              body: `Dass mehrere Generationen wieder unter einem Dach leben, gilt vielen als Rückschritt. Die Zahlen stützen diese Deutung nur teilweise, {{21}} die Haushalte, um die es geht, überwiegend befristet zusammengelegt werden.

Der häufigste Anlass ist nicht Nostalgie, sondern Rechnen. Wo eine Wohnung in der Stadt so viel kostet wie zwei auf dem Land, wird das Elternhaus für einige Jahre zur Zwischenlösung — {{22}} für die Jüngeren, die Miete sparen, als auch für die Älteren, denen ein großes Haus zur Last geworden ist.

Erfahrungsberichte fallen entsprechend nüchtern aus. Von wiedergewonnener Nähe ist selten die Rede, {{23}} von ausgehandelten Regeln: getrennte Eingänge, feste Zeiten für die Küche, eine schriftliche Absprache über Besuch.

Bemerkenswert ist, wie diese Haushalte enden. Sie zerbrechen weit seltener an Streit, {{24}} sie sich planmäßig auflösen, sobald der Anlass entfällt — der Abschluss des Studiums, der Umbau, die Wartezeit auf eine Wohnung.

Ob daraus ein dauerhaftes Modell wird, ist offen. Fest steht {{25}}, dass die Vorstellung vom Zurück zur Großfamilie an der Sache vorbeigeht: Was hier entsteht, ist keine Wiederkehr, sondern eine befristete Zweckgemeinschaft.`,
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-04-l3-21",
              no: 21,
              text: "Lücke 21",
              options: ["obwohl", "sofern", "zumal", "denn dass"],
              answer: 2,
              explain:
                "Boşluk yorumu neden yalnız kısmen desteklediğini açıklıyor, yani bir gerekçe ekliyor. `zumal` tam bu \"üstelik şu nedenle\" işlevini görür; `obwohl` karşıtlık, `sofern` koşul kurar.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l3-22",
              no: 22,
              text: "Lücke 22",
              options: ["ebenso", "sowohl", "gleichermaßen", "teils"],
              answer: 1,
              explain:
                "Cümlede ilerideki `als auch` eşleşmeyi tamamlıyor; bu ikili yapı yalnız `sowohl … als auch` ile kurulur. Ötekiler tek başına durur ve `als auch` ile bağlanmaz.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l3-23",
              no: 23,
              text: "Lücke 23",
              options: ["sondern", "vielmehr aber", "hingegen", "dafür umso mehr"],
              answer: 0,
              explain:
                "Önce olumsuzlanan bir şey var (\"selten die Rede\"), sonra yerine konan geliyor. Bu düzeltme yapısı `sondern` ister; ötekiler ayrı bir cümle gerektirir.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l3-24",
              no: 24,
              text: "Lücke 24",
              options: ["indem", "sofern", "als dass", "weil"],
              answer: 2,
              explain:
                "\"weit seltener … als dass\" karşılaştırmalı bir yapı: kavgayla dağılmaları, planlı sona ermelerinden daha ender. `indem` araç, `weil` neden bildirir ve karşılaştırmayı taşımaz.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-l3-25",
              no: 25,
              text: "Lücke 25",
              options: ["ohnehin", "insofern", "gleichwohl", "immerhin"],
              answer: 2,
              explain:
                "Belirsizlikten sonra yine de kesin olanı getiren bir bağlaç gerekiyor. `gleichwohl` bu ödünlü geçişi kurar; `insofern` sınırlama, `ohnehin` zaten olanı, `immerhin` asgari bir teselli bildirir.",
            },
          ],
        },
      ],
    },

    /* ── HÖREN ─────────────────────────────────────────────────────────── */
    {
      skill: "listening",
      minutes: 40,
      instruction: "Dieser Teil hat zwei Aufgaben: Notizen ergänzen und eine Diskussion auswerten.",
      instructionTr: "Bu bölümde iki görev var: not tamamlamak ve bir tartışmayı değerlendirmek.",
      tasks: [
        {
          id: "de-c1-04-h1",
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
              title: "Wohnen im Alter — Informationsabend",
              situation: "Bir danışma merkezi yaşlılıkta konut modellerini anlatıyor; konuşan tek kişi.",
              plays: 1,
              segments: [
                {
                  text: "Guten Abend, mein Name ist Susanne Kolbe von der Wohnberatung des Kreises. Ich stelle Ihnen heute vier Modelle vor und sage Ihnen bei jedem, was es kostet und wo der Haken liegt. Für Fragen bleiben am Ende zwanzig Minuten.",
                },
                {
                  text: "Vorab eine Zahl, die Sie einordnen sollten: Neunundachtzig Prozent der über Achtzigjährigen in unserem Kreis leben in der eigenen Wohnung. Das Heim ist also nicht der Normalfall, sondern die Ausnahme — und trotzdem denken die meisten Menschen zuerst daran.",
                },
                {
                  text: "Modell eins ist der barrierefreie Umbau der eigenen Wohnung. Die Pflegekasse zahlt dafür bis zu 4180 Euro je Maßnahme, unabhängig vom Einkommen, aber nur bei anerkanntem Pflegegrad. Der häufigste Fehler: Es wird zuerst gebaut und danach beantragt. Dann gibt es nichts.",
                },
                {
                  text: "Modell zwei ist das betreute Wohnen. Sie mieten eine eigene Wohnung und zahlen zusätzlich eine Betreuungspauschale, bei uns im Kreis zwischen achtzig und zweihundertvierzig Euro im Monat. Achten Sie darauf, welche Leistungen darin enthalten sind; der Hausnotruf ist es fast immer, die Reinigung fast nie.",
                },
                {
                  text: "Modell drei nennt sich Wohngemeinschaft für Pflegebedürftige. Acht bis zwölf Personen teilen sich eine große Wohnung und beauftragen gemeinsam einen Pflegedienst. Entscheidend ist hier die Rechtsform: Die Bewohnerinnen bleiben Auftraggeber, nicht Heimbewohner. Wer das verwechselt, verliert Mitspracherechte.",
                },
                {
                  text: "Modell vier ist das Mehrgenerationenhaus. Hier gibt es keine Pflegeleistung, sondern nachbarschaftliche Hilfe auf Gegenseitigkeit. Das trägt gut bis zu einem gewissen Punkt und trägt nicht mehr, sobald eine Person dauerhaft Hilfe braucht. Sagen Sie das bitte weiter; diese Grenze wird regelmäßig unterschätzt.",
                },
                {
                  text: "Zur Beratung selbst: Sie ist kostenlos und unabhängig, wir vermitteln keine Anbieter. Wir kommen auf Wunsch auch zu Ihnen nach Hause, die Wartezeit dafür beträgt derzeit etwa sechs Wochen.",
                },
                {
                  text: "Ein letzter Hinweis, der die meisten überrascht: Der Antrag auf einen Pflegegrad kann formlos gestellt werden, telefonisch oder mit einem Satz auf einem Zettel. Wichtig ist allein das Datum, denn die Leistungen laufen ab dem Monat der Antragstellung, nicht ab der Begutachtung.",
                },
              ],
            },
            {
              kind: "text",
              id: "n1",
              genre: "Notizzettel",
              genreTr: "Not kâğıdı",
              title: "Notizen — Wohnen im Alter",
              body: `{{1}} der über Achtzigjährigen leben in der eigenen Wohnung → Heim = Ausnahme.

1) Barrierefreier Umbau: Pflegekasse bis {{2}} je Maßnahme,
   unabhängig vom Einkommen, aber nur bei {{3}}.
   Häufigster Fehler: {{4}}.

2) Betreutes Wohnen: Pauschale {{5}} im Monat.
   Fast immer enthalten: Hausnotruf. Fast nie: {{6}}.

3) Pflege-WG: 8–12 Personen, gemeinsamer Pflegedienst.
   Wichtig ist die {{7}} — Bewohner bleiben Auftraggeber.

4) Mehrgenerationenhaus: keine Pflegeleistung; Grenze erreicht, sobald
   jemand {{8}} braucht.

Beratung kostenlos, Hausbesuch: Wartezeit {{9}}.

Antrag auf Pflegegrad: formlos möglich; Leistungen ab {{10}}.`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-04-h1-1",
              no: 1,
              ref: "a1",
              text: "Notiz 1",
              accept: ["89 Prozent", "neunundachtzig Prozent", "89 %", "89"],
              explain:
                "Konuşma açılış rakamını veriyor: \"Neunundachtzig Prozent der über Achtzigjährigen ... leben in der eigenen Wohnung\", yani yurt istisna.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-2",
              no: 2,
              ref: "a1",
              text: "Notiz 2",
              accept: ["4180 Euro", "4.180 Euro", "4180", "bis zu 4180 Euro"],
              explain:
                "Bakım sigortası tadilat için önlem başına \"bis zu 4180 Euro\" ödüyor ve bu tutar gelirden bağımsız.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-3",
              no: 3,
              ref: "a1",
              text: "Notiz 3",
              accept: ["anerkanntem Pflegegrad", "Pflegegrad", "einem Pflegegrad", "anerkannter Pflegegrad"],
              explain:
                "Ödeme tek koşula bağlı: \"nur bei anerkanntem Pflegegrad\". Gelir koşulu ise açıkça yok.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-4",
              no: 4,
              ref: "a1",
              text: "Notiz 4",
              accept: [
                "zuerst bauen",
                "erst bauen dann beantragen",
                "vor dem Antrag bauen",
                "bauen vor Antrag",
                "zuerst gebaut",
              ],
              explain:
                "En sık hata sıralamada: \"Es wird zuerst gebaut und danach beantragt. Dann gibt es nichts.\" Yani başvuru inşaattan önce yapılmalı.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-5",
              no: 5,
              ref: "a1",
              text: "Notiz 5",
              accept: ["80 bis 240 Euro", "zwischen 80 und 240 Euro", "80–240 Euro"],
              explain:
                "Bakım ücreti ilçede \"zwischen achtzig und zweihundertvierzig Euro im Monat\" aralığında değişiyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-6",
              no: 6,
              ref: "a1",
              text: "Notiz 6",
              accept: ["die Reinigung", "Reinigung", "Putzen", "Hausreinigung"],
              explain:
                "İki uç veriliyor: acil çağrı sistemi neredeyse her zaman dahil, temizlik \"fast nie\".",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-7",
              no: 7,
              ref: "a1",
              text: "Notiz 7",
              accept: ["Rechtsform", "die Rechtsform", "rechtliche Form"],
              explain:
                "Belirleyici olan şey \"die Rechtsform\": sakinler işveren olarak kalıyor, yurt sakini olmuyor; karıştıran söz hakkını kaybediyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-8",
              no: 8,
              ref: "a1",
              text: "Notiz 8",
              accept: ["dauerhaft Hilfe", "dauerhafte Hilfe", "ständig Hilfe", "dauerhafte Pflege"],
              explain:
                "Karşılıklı komşu yardımı belli bir noktaya kadar taşıyor; sınır \"sobald eine Person dauerhaft Hilfe braucht\" aşılıyor.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-9",
              no: 9,
              ref: "a1",
              text: "Notiz 9",
              accept: ["sechs Wochen", "6 Wochen", "etwa sechs Wochen", "ca. 6 Wochen"],
              explain:
                "Ev ziyareti için bekleme süresi şu an \"etwa sechs Wochen\". Danışmanlığın kendisi ücretsiz ve bağımsız.",
            },
            {
              kind: "gap",
              id: "de-c1-04-h1-10",
              no: 10,
              ref: "a1",
              text: "Notiz 10",
              accept: [
                "dem Monat der Antragstellung",
                "Monat der Antragstellung",
                "dem Antragsmonat",
                "der Antragstellung",
              ],
              explain:
                "Tarih belirleyici: ödemeler \"ab dem Monat der Antragstellung, nicht ab der Begutachtung\" başlıyor. Bu yüzden başvuru biçimsiz de olsa erken yapılmalı.",
            },
          ],
        },
        {
          id: "de-c1-04-h2",
          no: 2,
          format: "mcq",
          goal: "gist",
          prompt: "Sie hören eine Diskussion. Wählen Sie zu den Aufgaben 11 bis 25: a, b oder c. Sie hören den Text zweimal.",
          promptTr: "Bir tartışma dinleyeceksin. 11–25. maddeler için a, b ya da c'yi seç. Kaydı iki kez dinleyebilirsin.",
          texts: [
            {
              kind: "audio",
              id: "d1",
              genre: "Podiumsdiskussion",
              genreTr: "Panel tartışması",
              situation: "Üç konuk kuşaklar arası yükün dağılımını tartışıyor.",
              plays: 2,
              segments: [
                {
                  speaker: "Moderator",
                  text: "Unser Thema ist die Lastenverteilung zwischen den Generationen. Frau Vogt, Sie sind Ökonomin. Ist die junge Generation benachteiligt?",
                },
                {
                  speaker: "Frau Vogt",
                  text: "Wenn man nur die Beiträge betrachtet, ja. Rechnet man Erbschaften mit, wird das Bild unübersichtlich. In den kommenden zwei Jahrzehnten wird in Deutschland mehr Vermögen vererbt als je zuvor — allerdings sehr ungleich. Der Konflikt verläuft daher weniger zwischen den Generationen als innerhalb der jüngeren.",
                },
                { speaker: "Moderator", text: "Herr Neuhaus, Sie vertreten einen Seniorenverband. Beruhigt Sie das?" },
                {
                  speaker: "Herr Neuhaus",
                  text: "Überhaupt nicht, weil es meine Leute genauso trifft. Die Rede von den wohlhabenden Alten geht an der Hälfte meiner Mitglieder vorbei. Was mich aber wirklich stört, ist die Rahmung: Sobald wir über Alter reden, reden wir über Geld. Über Einsamkeit spricht niemand, obwohl sie in unseren Befragungen an erster Stelle steht.",
                },
                { speaker: "Moderator", text: "Frau Ilić, Sie forschen zu Pflegearbeit in Familien." },
                {
                  speaker: "Frau Ilić",
                  text: "Und ich möchte eine dritte Größe einbringen, die in beiden Rechnungen fehlt: die unbezahlte Zeit. Angehörige leisten Pflege im Umfang mehrerer Milliarden Stunden pro Jahr. Diese Stunden tauchen in keiner Generationenbilanz auf, obwohl sie das eigentliche Transfersystem sind.",
                },
                {
                  speaker: "Frau Vogt",
                  text: "Dem widerspreche ich nicht, im Gegenteil. Nur folgt daraus ein unbequemer Punkt: Diese Stunden werden überwiegend von Frauen zwischen fünfzig und siebzig erbracht, also von Menschen, die zugleich erwerbstätig sein sollen. Wer die Erwerbsquote erhöhen und gleichzeitig auf familiäre Pflege bauen will, plant mit derselben Person zweimal.",
                },
                { speaker: "Moderator", text: "Herr Neuhaus, wäre eine Bezahlung dieser Arbeit die Lösung?" },
                {
                  speaker: "Herr Neuhaus",
                  text: "Ich war lange dafür und bin heute vorsichtiger. In Ländern, die das eingeführt haben, ist die Pflege stärker in die Familien zurückgewandert, und zwar zu denen mit den geringsten Alternativen. Bezahlung ohne Ausbau der Dienste zementiert die Verteilung, die wir kritisieren.",
                },
                {
                  speaker: "Frau Ilić",
                  text: "Diesen Befund kenne ich und lese ihn anders. Er zeigt nicht, dass Bezahlung schadet, sondern dass sie allein nicht wirkt. Wo beides zusammen eingeführt wurde, sind die Ergebnisse deutlich besser. Wir verwechseln hier eine notwendige mit einer hinreichenden Bedingung.",
                },
                { speaker: "Moderator", text: "Frau Vogt, wie beurteilen Sie das Renteneintrittsalter in dieser Debatte?" },
                {
                  speaker: "Frau Vogt",
                  text: "Als überschätztes Instrument. Es wirkt langsam und trifft Berufsgruppen sehr unterschiedlich; ein Dachdecker gewinnt durch eine höhere Lebenserwartung im Schnitt weniger gesunde Jahre als eine Professorin. Rechnerisch bringt eine Anhebung viel, sozial ist sie das ungenaueste Werkzeug, das wir haben.",
                },
                {
                  speaker: "Herr Neuhaus",
                  text: "Da sind wir uns einig, und das kommt nicht oft vor. Ich würde ergänzen: Auch das Ehrenamt wird überschätzt. Man erwartet von den jungen Alten, dass sie die Lücken schließen. Viele tun das, aber es ist eine Erwartung an eine Gruppe, die selbst schrumpft.",
                },
                {
                  speaker: "Moderator",
                  text: "Zum Schluss bitte je einen Satz: Was würden Sie zuerst ändern?",
                },
                {
                  speaker: "Frau Ilić",
                  text: "Ich würde die unbezahlte Zeit in die amtliche Statistik aufnehmen. Was nicht gezählt wird, wird in keiner Reform berücksichtigt.",
                },
                {
                  speaker: "Frau Vogt",
                  text: "Ich würde die Erbschaftsbesteuerung reformieren, weil dort die Ungleichheit innerhalb der jungen Generation entsteht.",
                },
                {
                  speaker: "Herr Neuhaus",
                  text: "Und ich würde in jeder Kommune eine feste Ansprechstelle einrichten. Das klingt bescheiden neben Ihren Vorschlägen, wirkt aber sofort und kostet wenig.",
                },
              ],
            },
          ],
          items: [
            {
              kind: "mcq",
              id: "de-c1-04-h2-11",
              no: 11,
              ref: "d1",
              text: "Wie beantwortet Frau Vogt die Eingangsfrage?",
              options: [
                "Eindeutig bejahend.",
                "Eindeutig verneinend.",
                "Bejahend nur bei einer engen Betrachtung.",
              ],
              answer: 2,
              explain:
                "\"Wenn man nur die Beiträge betrachtet, ja\" diyor; miras hesaba katılınca tablo bulanıklaşıyor. Yani cevabı ölçütün seçimine bağlı.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-12",
              no: 12,
              ref: "d1",
              text: "Wo verläuft der Konflikt nach ihr vor allem?",
              options: [
                "Innerhalb der jüngeren Generation.",
                "Zwischen Stadt und Land.",
                "Zwischen Erwerbstätigen und Rentnern.",
              ],
              answer: 0,
              explain:
                "Miras çok eşitsiz dağıldığı için çatışma \"weniger zwischen den Generationen als innerhalb der jüngeren\" yürüyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-13",
              no: 13,
              ref: "d1",
              text: "Warum beruhigt dieser Befund Herrn Neuhaus nicht?",
              options: [
                "Weil er die Zahlen für falsch hält.",
                "Weil die Ungleichheit auch seine Mitglieder trifft.",
                "Weil Erbschaften bald besteuert werden.",
              ],
              answer: 1,
              explain:
                "\"Die Rede von den wohlhabenden Alten geht an der Hälfte meiner Mitglieder vorbei\" — eşitsizlik yaşlılar arasında da var.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-14",
              no: 14,
              ref: "d1",
              text: "Was kritisiert er an der Debatte insgesamt?",
              options: [
                "Ihre Beschränkung auf finanzielle Fragen.",
                "Ihre Fixierung auf die Pflege.",
                "Ihre Konzentration auf städtische Beispiele.",
              ],
              answer: 0,
              explain:
                "Çerçeveyi eleştiriyor: \"Sobald wir über Alter reden, reden wir über Geld\", oysa kendi anketlerinde ilk sırada yalnızlık var.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-15",
              no: 15,
              ref: "d1",
              text: "Welche Größe bringt Frau Ilić ein?",
              options: [
                "Die Zahl der Pflegeheimplätze.",
                "Die unbezahlte Pflegezeit in Familien.",
                "Die Ausgaben der Pflegeversicherung.",
              ],
              answer: 1,
              explain:
                "Yılda milyarlarca saatlik ücretsiz bakımdan söz ediyor ve bunu \"das eigentliche Transfersystem\" olarak adlandırıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-16",
              no: 16,
              ref: "d1",
              text: "Wie reagiert Frau Vogt auf diesen Einwand?",
              options: [
                "Sie widerspricht ihm mit eigenen Zahlen.",
                "Sie hält ihn für nebensächlich.",
                "Sie greift ihn auf und verschärft ihn.",
              ],
              answer: 2,
              explain:
                "\"Dem widerspreche ich nicht, im Gegenteil\" diyor ve rahatsız edici sonucu ekliyor: aynı kişiyle iki kez plan yapılıyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-17",
              no: 17,
              ref: "d1",
              text: "Was meint sie mit \"mit derselben Person zweimal planen\"?",
              options: [
                "Erwerbsarbeit und Pflege werden von denselben Frauen erwartet.",
                "Dieselben Personen zahlen Beiträge und erben.",
                "Dieselben Fachkräfte fehlen in zwei Branchen.",
              ],
              answer: 0,
              explain:
                "Ücretsiz saatleri ağırlıkla 50–70 yaş arası kadınlar veriyor; aynı kişilerden hem istihdam hem aile bakımı bekleniyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-18",
              no: 18,
              ref: "d1",
              text: "Wie hat sich Herrn Neuhaus' Haltung zur Bezahlung verändert?",
              options: [
                "Von Ablehnung zu Zustimmung.",
                "Von Zustimmung zu Vorsicht.",
                "Sie ist unverändert geblieben.",
              ],
              answer: 1,
              explain:
                "\"Ich war lange dafür und bin heute vorsichtiger\" diyor; gerekçesi de bunu uygulayan ülkelerdeki gözlem.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-19",
              no: 19,
              ref: "d1",
              text: "Womit begründet er diese Vorsicht?",
              options: [
                "Mit den Kosten für die Pflegekassen.",
                "Mit dem Widerstand der Verbände.",
                "Mit Erfahrungen aus anderen Ländern.",
              ],
              answer: 2,
              explain:
                "Bu düzenlemeyi getiren ülkelerde bakım aileye geri kaymış, üstelik \"zu denen mit den geringsten Alternativen\".",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-20",
              no: 20,
              ref: "d1",
              text: "Wie liest Frau Ilić denselben Befund?",
              options: [
                "Als Beleg dafür, dass Bezahlung allein nicht genügt.",
                "Als methodisch unzuverlässig.",
                "Als Sonderfall einzelner Länder.",
              ],
              answer: 0,
              explain:
                "Aynı veriyi farklı yorumluyor: bulgu ödemenin zararlı olduğunu değil, tek başına yetmediğini gösteriyor. Kendi cümlesi: \"Wir verwechseln hier eine notwendige mit einer hinreichenden Bedingung\".",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-21",
              no: 21,
              ref: "d1",
              text: "Wie bewertet Frau Vogt eine Anhebung des Renteneintrittsalters?",
              options: [
                "Als wirksamstes verfügbares Instrument.",
                "Als rechnerisch stark, sozial jedoch grob.",
                "Als politisch nicht durchsetzbar.",
              ],
              answer: 1,
              explain:
                "\"Rechnerisch bringt eine Anhebung viel, sozial ist sie das ungenaueste Werkzeug\" — çünkü meslek gruplarını çok farklı etkiliyor.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-22",
              no: 22,
              ref: "d1",
              text: "Womit belegt sie diese Ungenauigkeit?",
              options: [
                "Mit unterschiedlichen Beitragsjahren.",
                "Mit der Zahl der Frühverrentungen.",
                "Mit ungleich verteilten gesunden Jahren.",
              ],
              answer: 2,
              explain:
                "Örneği somut: \"ein Dachdecker gewinnt durch eine höhere Lebenserwartung im Schnitt weniger gesunde Jahre als eine Professorin\".",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-23",
              no: 23,
              ref: "d1",
              text: "Was ergänzt Herr Neuhaus an dieser Stelle?",
              options: [
                "Dass auch das Ehrenamt überschätzt wird.",
                "Dass die Rente steuerfrei bleiben sollte.",
                "Dass die Statistik veraltet ist.",
              ],
              answer: 0,
              explain:
                "Gönüllülüğün de fazla yüklendiğini söylüyor: boşlukları kapatması beklenen genç yaşlılar grubu \"selbst schrumpft\".",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-24",
              no: 24,
              ref: "d1",
              text: "Was schlägt Frau Ilić zum Schluss vor?",
              options: [
                "Eine Reform der Erbschaftsbesteuerung.",
                "Die Erfassung unbezahlter Zeit in der Statistik.",
                "Eine Ansprechstelle in jeder Kommune.",
              ],
              answer: 1,
              explain:
                "Gerekçesi de veriliyor: \"Was nicht gezählt wird, wird in keiner Reform berücksichtigt.\" Öteki iki öneri Vogt ve Neuhaus'a ait.",
            },
            {
              kind: "mcq",
              id: "de-c1-04-h2-25",
              no: 25,
              ref: "d1",
              text: "Wie ordnet Herr Neuhaus seinen eigenen Vorschlag ein?",
              options: [
                "Als grundlegender als die anderen.",
                "Als gleichwertig mit den anderen.",
                "Als bescheidener, aber sofort wirksam.",
              ],
              answer: 2,
              explain:
                "Kendi önerisini küçümsemeden konumlandırıyor: \"Das klingt bescheiden neben Ihren Vorschlägen, wirkt aber sofort und kostet wenig.\"",
            },
          ],
        },
      ],
    },

    /* ── SCHREIBEN ─────────────────────────────────────────────────────── */
    {
      skill: "writing",
      minutes: 80,
      instruction:
        "Dieser Teil hat zwei Aufgaben. Zuerst schreiben Sie einen zusammenhängenden Text zu fünf Leitpunkten, danach ergänzen Sie ein formelles Schreiben.",
      instructionTr:
        "Bu bölümde iki görev var: önce beş yönlendirme noktasına göre bütünlüklü bir metin yazacaksın, sonra resmî bir yazıyı tamamlayacaksın.",
      tasks: [
        {
          id: "de-c1-04-s1",
          no: 1,
          format: "writing",
          goal: "production",
          prompt:
            "Eine Fachzeitschrift veröffentlicht eine Reihe mit dem Titel \"Sorgearbeit — wer trägt sie?\". Schreiben Sie einen Beitrag von etwa 200 Wörtern. Behandeln Sie alle fünf Leitpunkte und stellen Sie zwischen ihnen einen Zusammenhang her.",
          promptTr:
            "Bir meslek dergisi \"Bakım emeği — kim taşıyor?\" başlıklı bir dizi yayımlıyor. Yaklaşık 200 kelimelik bir yazı yaz. Beş yönlendirme noktasının hepsini işle ve aralarında bağ kur.",
          items: [],
          rubric: {
            minWords: 200,
            points: [
              { de: "Beschreiben Sie die Ausgangslage.", tr: "Çıkış durumunu betimle." },
              { de: "Nennen Sie zwei Gründe für die ungleiche Verteilung.", tr: "Eşitsiz dağılımın iki nedenini söyle." },
              { de: "Stellen Sie die Lage in Ihrem Herkunftsland gegenüber.", tr: "Kendi ülkendeki durumla karşılaştır." },
              { de: "Wägen Sie Bezahlung und Ausbau von Diensten ab.", tr: "Ücretlendirme ile hizmetlerin genişletilmesini tart." },
              { de: "Formulieren Sie eine begründete Schlussfolgerung.", tr: "Gerekçeli bir sonuç yaz." },
            ],
            sample: `Über die Pflege alternder Angehöriger wird meist so gesprochen, als sei sie ein privates Ereignis. Tatsächlich ist sie das größte unbezahlte Versorgungssystem, das wir haben — und es funktioniert nur, weil seine Kosten nirgends auftauchen.

Für die ungleiche Verteilung dieser Arbeit lassen sich zwei Gründe anführen. Zum einen wird sie fast durchweg von Frauen zwischen fünfzig und siebzig geleistet, also von Personen, deren Erwerbstätigkeit gleichzeitig politisch erwünscht ist. Zum anderen entsteht sie unter Zeitdruck: Zwischen dem ersten ernsten Vorfall und der Übernahme liegen oft nur Tage, in denen sich niemand informieren kann.

In meinem Herkunftsland stellt sich die Lage anders dar, aber nicht besser. Dort gilt häusliche Pflege als selbstverständliche Pflicht der Familie; entsprechend gibt es kaum Dienste, auf die man ausweichen könnte. Was hier als Wahl erscheint, ist dort eine Erwartung, der sich kaum jemand entziehen kann, ohne den eigenen Ruf in der Familie zu verlieren.

Eine Bezahlung dieser Arbeit erkennt sie immerhin an und mindert finanzielle Not. Ohne den gleichzeitigen Ausbau ambulanter Dienste verfestigt sie jedoch genau die Verteilung, die sie ausgleichen soll, weil sie den Verzicht auf Erwerbsarbeit erträglicher macht.

Daraus folgt für mich, dass Bezahlung eine notwendige, aber keine hinreichende Maßnahme ist. Erst zusammen mit verlässlichen Diensten wird aus Anerkennung eine Entlastung.`,
            criteria: [
              "Beş yönlendirme noktasının hepsi işlendi mi?",
              "Noktalar arasında bağ kuruldu mu, yoksa beş ayrı paragraf mı yan yana duruyor?",
              "Karşılaştırma aynı ölçütü iki duruma uyguluyor mu?",
              "Tartma iki yönlü mü ve sonuç bu tartmadan çıkıyor mu?",
              "Dil C1 düzeyinde mi: adlaştırma, `zum einen … zum anderen`, ölçülü ifade, ilgi cümleleri?",
              "Yaklaşık 200 kelime var mı?",
            ],
          },
        },
        {
          id: "de-c1-04-s2",
          no: 2,
          format: "gap",
          goal: "interaction",
          prompt:
            "Sie schreiben an die Pflegekasse. Der Entwurf unten ist zu umgangssprachlich. Ergänzen Sie die Lücken 1 bis 10 mit einer stilistisch angemessenen Wendung. Die Funktion jeder Lücke steht in Klammern.",
          promptTr:
            "Bakım sigortasına yazıyorsun. Aşağıdaki taslak fazla günlük dilde. 1–10. boşlukları üsluba uygun bir ifadeyle tamamla. Her boşluğun işlevi parantez içinde yazılı.",
          texts: [
            {
              kind: "text",
              id: "br1",
              genre: "Formelles Schreiben",
              genreTr: "Resmî yazı",
              title: "Widerspruch gegen die Einstufung",
              body: `Sehr geehrte Damen und Herren,

gegen Ihren Bescheid vom 12. Februar, Versichertennummer 4471 09 823, lege ich fristgerecht Widerspruch ein.

{{1}} stützt sich die Einstufung auf ein Gutachten vom 28. Januar, das den Hilfebedarf meiner Mutter im Bereich der Selbstversorgung mit "gering" bewertet.

{{2}} entspricht diese Einschätzung nicht dem Alltag. Meine Mutter benötigt beim Ankleiden und beim Duschen täglich Unterstützung; ohne Begleitung verlässt sie die Wohnung seit August nicht mehr.

{{3}} übersende ich Ihnen ein Pflegetagebuch über sechs Wochen sowie eine Stellungnahme des behandelnden Hausarztes vom 3. März.

{{4}} ist mir bewusst, dass der Termin der Begutachtung an einem Tag lag, an dem es meiner Mutter vergleichsweise gut ging. {{5}} bildet ein einzelner Vormittag den durchschnittlichen Bedarf nicht ab.

{{6}}, den Bescheid aufzuheben und eine erneute Begutachtung zu veranlassen.

{{7}} dies nicht möglich sein, bitte ich {{8}} Übersendung des vollständigen Gutachtens einschließlich der Einzelbewertungen.

Über eine Rückmeldung bis zum 15. April {{9}}, da die Versorgung bis dahin geregelt sein muss.

{{10}}
Dorothea Simon`,
            },
          ],
          items: [
            {
              kind: "gap",
              id: "de-c1-04-s2-1",
              no: 1,
              text: "Lücke 1 (Übergang zur Begründung)",
              accept: ["Zur Begründung", "Zur Erläuterung", "Im Einzelnen", "Zur Sache"],
              explain:
                "İtirazın gerekçesi kendi geçişiyle açılır. `Zur Begründung stützt sich die Einstufung auf …` hem bölümü işaretler hem de fiili ikinci sırada tutar.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-2",
              no: 2,
              text: "Lücke 2 (Gegensatz zur Einschätzung des Gutachtens)",
              accept: ["Tatsächlich", "Demgegenüber", "In Wirklichkeit"],
              explain:
                "Bilirkişinin değerlendirmesi ile günlük gerçeklik karşı karşıya getiriliyor. `Demgegenüber entspricht diese Einschätzung nicht dem Alltag` bu karşıtlığı kurar.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-3",
              no: 3,
              text: "Lücke 3 (Hinweis auf beigefügte Nachweise)",
              accept: ["Als Nachweis", "Zum Nachweis", "Als Beleg", "Hierzu"],
              explain:
                "Bakım günlüğü ve hekim görüşü kanıt olarak duyurulur: `Als Nachweis übersende ich Ihnen …`. Yüklem cümlede zaten var, boşluğa fiil girmez.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-4",
              no: 4,
              text: "Lücke 4 (Zugeständnis einleiten)",
              accept: ["Zwar", "Selbstverständlich", "Natürlich", "Sehr wohl"],
              explain:
                "Muayenenin iyi bir güne denk geldiğini kabul etmek itirazı zayıflatmaz, inandırıcı kılar. `Zwar …` bu ödünü açar.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-5",
              no: 5,
              text: "Lücke 5 (einschränkender Anschluss)",
              accept: ["Gleichwohl", "Jedoch", "Allerdings", "Dennoch", "Nichtsdestoweniger"],
              explain:
                "Kabulden sonra asıl argüman geliyor: tek bir sabah ortalama ihtiyacı temsil etmez. `Gleichwohl` bu dönüşü resmî kayıtta sağlar.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-6",
              no: 6,
              text: "Lücke 6 (Antrag, an einen Infinitivsatz anschließend)",
              accept: ["Ich beantrage daher", "Ich beantrage", "Hiermit beantrage ich", "Ich bitte Sie daher", "Ich bitte Sie"],
              explain:
                "Talep `zu`-mastarına bağlanan açık bir fiille kurulur: `Ich beantrage daher, den Bescheid aufzuheben …`.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-7",
              no: 7,
              text: "Lücke 7 (Hilfsantrag, Konditional ohne \"wenn\")",
              accept: ["Sollte", "Sollte wider Erwarten"],
              explain:
                "İkincil talep koşullu açılır ve resmî yazıda koşul `wenn` olmadan, fiil başta kurulur: `Sollte dies nicht möglich sein, …`.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-8",
              no: 8,
              text: "Lücke 8 (Präposition zu \"bitten\")",
              accept: ["um"],
              explain:
                "`bitten` bu anlamda `um` ister: `ich bitte um Übersendung des vollständigen Gutachtens`. Edat düşerse cümle dilbilgisel olarak kurulmaz.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-9",
              no: 9,
              text: "Lücke 9 (höfliche Erwartung am Satzende)",
              accept: ["würde ich mich freuen", "wäre ich Ihnen dankbar", "freue ich mich", "wäre ich dankbar"],
              explain:
                "Cümle `Über eine Rückmeldung …` ile başladığı için yüklem sona, özne fiilden sonraya geçer. Süre böylece talep değil rica olur.",
            },
            {
              kind: "gap",
              id: "de-c1-04-s2-10",
              no: 10,
              text: "Lücke 10 (Grußformel)",
              accept: ["Mit freundlichen Grüßen", "Mit freundlichem Gruß", "Freundliche Grüße", "Hochachtungsvoll"],
              explain:
                "Kuruma yazılan resmî yazının vedası `Mit freundlichen Grüßen`; `Viele Grüße` yarı resmî, `Liebe Grüße` özel yazışmaya aittir.",
            },
          ],
        },
      ],
    },

    /* ── SPRECHEN ──────────────────────────────────────────────────────── */
    {
      skill: "speaking",
      minutes: 15,
      instruction: "Dieser Teil hat zwei Aufgaben: einen Vortrag halten und eine Position im Gespräch verteidigen.",
      instructionTr: "Bu bölümde iki görev var: bir sunum yapmak ve bir konumu konuşmada savunmak.",
      tasks: [
        {
          id: "de-c1-04-p1",
          no: 1,
          format: "speaking",
          goal: "production",
          prompt:
            "Halten Sie einen Vortrag von etwa vier Minuten zum Thema \"Wer soll für die Pflege im Alter aufkommen — Familie, Staat oder der Einzelne?\". Gliedern Sie: Einstieg — Begriffsklärung — Lage in Ihrem Herkunftsland — Abwägung — eigene Position — Ausblick.",
          promptTr:
            "\"Yaşlılıkta bakımın yükünü kim üstlenmeli — aile, devlet mi birey mi?\" konusunda yaklaşık dört dakikalık bir sunum yap. Şu sırayı izle: giriş — kavramı netleştirme — kendi ülkendeki durum — tartma — kendi konumun — kapanış.",
          minutes: 8,
          prepSeconds: 180,
          speakSeconds: 240,
          items: [],
          rubric: {
            minutes: 8,
            points: [
              { de: "Einstieg und Gliederung", tr: "Giriş ve konunun bölümlenmesi" },
              { de: "Begriffsklärung", tr: "Kavramı netleştirme" },
              { de: "Lage im Herkunftsland", tr: "Kendi ülkendeki durum" },
              { de: "Abwägung der Modelle", tr: "Modelleri tartma" },
              { de: "eigene Position mit Begründung", tr: "Gerekçeli kendi konumun" },
              { de: "Ausblick", tr: "Kapanış ve ileriye bakış" },
            ],
            sample:
              "Ich möchte über die Frage sprechen, wer für die Pflege im Alter aufkommen soll. Zunächst kläre ich, worüber wir eigentlich reden, dann schildere ich die Lage in meinem Herkunftsland, danach wäge ich die Modelle ab und komme zu meiner Position. Zu klären ist zuerst, dass Pflege zwei sehr verschiedene Dinge meint: die bezahlte Leistung eines Dienstes und die unbezahlte Zeit von Angehörigen. Über die erste wird gestritten, die zweite trägt den größeren Teil und taucht in keiner Rechnung auf. In Polen, wo ich aufgewachsen bin, ist die Erwartung eindeutig: Die Tochter übernimmt. Das ist rechtlich nicht geregelt und wirkt gerade deshalb stärker als jedes Gesetz; wer sich entzieht, verliert seinen Ruf in der Familie. Für die Abwägung heißt das: Ein rein familiäres Modell ist billig für den Staat und teuer für einzelne Biografien, meist die von Frauen. Ein rein staatliches Modell ist verlässlich, aber es unterschätzt, wie sehr Menschen Nähe wollen und nicht bloß Versorgung. Meine Position ist deshalb eine geteilte Verantwortung mit klarer Reihenfolge: Der Staat garantiert die Grundversorgung, die Familie ergänzt sie freiwillig, und diese Freiwilligkeit muss finanziell abgesichert sein. Für die Zukunft erwarte ich, dass die entscheidende Frage nicht mehr lautet, wer zahlt, sondern wessen Zeit selbstverständlich vorausgesetzt wird.",
            criteria: [
              "Altı bölümün hepsi var mı ve sunum baştan bölümlendi mi?",
              "Kavram ayrımı gerçekten yapıldı mı (ör. ücretli hizmet ile ücretsiz zaman)?",
              "Kendi ülkedeki durum somut ve yalnız betimleyici değil, açıklayıcı mı?",
              "Üç modelin en az ikisi karşılaştırmalı biçimde tartıldı mı?",
              "Konum ölçülü ve sıralı mı, yoksa basit bir taraf tutma mı?",
              "Dil C1'de mi: adlaştırma, ilgi cümleleri, `gerade deshalb / unterschätzt / vorausgesetzt` gibi kesinlik araçları?",
              "Dört dakika boyunca yapı korunabildi mi?",
            ],
          },
        },
        {
          id: "de-c1-04-p2",
          no: 2,
          format: "speaking",
          goal: "interaction",
          prompt:
            "Ihre Gesprächspartnerin vertritt eine Gegenposition. Verteidigen Sie Ihre Sicht, gehen Sie auf Einwände ein und suchen Sie am Ende eine gemeinsame Formulierung. Thema: Soll die Pflege von Angehörigen wie Erwerbsarbeit bezahlt werden?",
          promptTr:
            "Karşındaki karşıt bir görüşü savunuyor. Kendi bakışını savun, itirazları ele al ve sonunda ortak bir formül ara. Konu: Yakınların yaptığı bakım, ücretli bir iş gibi ödenmeli mi?",
          minutes: 7,
          prepSeconds: 120,
          exchange: [
            {
              who: "partner",
              de: "Ich halte eine Bezahlung für den falschen Weg. Sie macht es attraktiv, aus dem Beruf auszusteigen — und zwar für genau die Frauen, die ohnehin am wenigsten Rentenansprüche haben. Wie sehen Sie das?",
              tr: "Ödemeyi yanlış yol buluyorum. Meslekten çıkmayı cazip kılıyor, üstelik zaten en az emeklilik hakkı olan kadınlar için. Sen ne düşünüyorsun?",
            },
            {
              who: "you",
              hint: "Konumunu ortaya koy ve itirazın haklı yanını adlandır.",
              expect: "kendi konumunu gerekçelendirerek savunmak ve karşı gerekçenin haklı yanını kabul etmek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Das räume ich ein. Aber schauen Sie auf die Länder, die das eingeführt haben: Dort ist die Pflege stärker in die Familien zurückgewandert, nicht weniger. Der Effekt war das Gegenteil des Gewollten.",
              tr: "Bunu kabul ediyorum. Ama bunu uygulayan ülkelere bakın: Bakım aileye daha çok kaymış, daha az değil. Sonuç istenenin tam tersi olmuş.",
            },
            {
              who: "you",
              hint: "Bu bulguyu ele al ve kendi önerini ona göre yeniden kur.",
              expect: "karşı bulguyu yorumlayıp önerisini koşullandırmak",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gesetzt den Fall, wir koppeln beides. Dann bleibt die Frage der Kontrolle: Wer stellt fest, ob die Pflege tatsächlich geleistet wird, ohne dass die Familie unter Beobachtung gerät?",
              tr: "Diyelim ikisini birlikte kurduk. Geriye denetim sorunu kalıyor: Bakımın gerçekten yapıldığını, aileyi gözetim altına almadan kim tespit edecek?",
            },
            {
              who: "you",
              hint: "Denetim sorununu ele al ve ölçülü bir çözüm öner.",
              expect: "denetim ile mahremiyet arasında ölçülü bir çözüm önermek",
              seconds: 60,
            },
            {
              who: "partner",
              de: "Gut. Versuchen wir eine gemeinsame Formulierung, die wir beide vertreten könnten. Wie würde sie lauten?",
              tr: "Peki. İkimizin de savunabileceği ortak bir formül deneyelim. Nasıl olurdu?",
            },
            {
              who: "you",
              hint: "İki tarafın kabullerini içeren tek bir formül kur.",
              expect: "iki tarafın kabullerini birleştiren tek ve kesin bir formül önermek",
              seconds: 60,
            },
          ],
          items: [],
          rubric: {
            minutes: 7,
            points: [
              { de: "die eigene Position begründen", tr: "Kendi konumunu gerekçelendirmek" },
              { de: "Einwände aufnehmen statt zu wiederholen", tr: "İtirazları tekrar etmek yerine devralmak" },
              { de: "die eigene Position anpassen", tr: "Konumu gerektiğinde uyarlamak" },
              { de: "eine gemeinsame Formulierung finden", tr: "Ortak bir formüle varmak" },
            ],
            sample:
              "Ihren Einwand halte ich für berechtigt, soweit es um eine Bezahlung ohne Begleitung geht. Genau deshalb fordere ich keine Zahlung als Ersatz für Erwerbsarbeit, sondern als Ausgleich für reduzierte Arbeitszeit, gekoppelt an fortlaufende Rentenbeiträge. Der Befund aus den anderen Ländern spricht nicht gegen die Zahlung, sondern gegen ihre Einführung im Alleingang; dort, wo gleichzeitig ambulante Dienste ausgebaut wurden, sieht das Bild anders aus. Zur Kontrolle: Ich würde nicht die Familie prüfen, sondern die Leistung an einen ohnehin stattfindenden Vorgang binden — an die Begutachtung, die es bereits gibt. Als gemeinsame Formulierung schlage ich vor: Pflegende Angehörige erhalten einen Lohnersatz für reduzierte Arbeitszeit einschließlich Rentenbeiträgen; die Auszahlung setzt einen festgestellten Pflegegrad voraus und ist an den parallelen Ausbau ambulanter Dienste gebunden. Eine vollständige Ersetzung der Erwerbsarbeit ist ausdrücklich nicht vorgesehen.",
            criteria: [
              "Konum gerekçelendirildi mi ve konuşma boyunca tutarlı kaldı mı?",
              "İtirazlar gerçekten devralındı mı (kabul edilen kısım adlandırıldı mı)?",
              "Karşı bulgu yorumlandı mı, yoksa yalnız reddedildi mi?",
              "Denetim çözümü mahremiyet itirazını karşılıyor mu?",
              "Ortak formül iki tarafın kabullerini içeriyor ve kesin mi?",
              "Dil C1'de mi: `soweit es um … geht`, `im Alleingang`, `ausdrücklich nicht vorgesehen` gibi araçlar?",
            ],
          },
        },
      ],
    },
  ],
};
