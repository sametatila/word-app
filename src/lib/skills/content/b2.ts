import type { SkillExercise } from "../types";

/** B2 — okuma, dinleme ve yazma egzersizleri. */
export const b2: SkillExercise[] = [
  // ---------------------------------------------------------------- OKUMA
  {
    id: "b2-r1",
    level: "B2",
    skill: "reading",
    title: "Künstliche Intelligenz: Alltagshelfer oder stiller Bevormunder?",
    genre: "Köşe yazısı",
    intro:
      "Bir gazete yazarının yapay zekânın günlük hayattaki yeri üzerine görüş yazısını okuyacaksın; yazarın tutumuna dikkat et.",
    minutes: 6,
    gloss: [
      { de: "die Erhebung", tr: "anket, araştırma" },
      { de: "die Bequemlichkeit", tr: "rahatlık, konfor" },
      { de: "die Abhängigkeit", tr: "bağımlılık" },
      { de: "abwägen", tr: "tartmak, ölçüp biçmek" },
      { de: "umschlagen in", tr: "(bir şeye) dönüşmek" },
      { de: "offenlegen", tr: "açıklamak, şeffaflaştırmak" },
      { de: "die Kennzeichnungspflicht", tr: "etiketleme zorunluluğu" },
      { de: "der Verzicht", tr: "vazgeçme, feragat" },
      { de: "vermitteln", tr: "aktarmak, kazandırmak" },
      { de: "unbestritten", tr: "tartışmasız" },
      { de: "zugeschnitten auf", tr: "(bir şeye) göre uyarlanmış" },
    ],
    text:
      "Wer heute morgens aufwacht, hat oft schon mit künstlicher Intelligenz zu tun, bevor der erste Kaffee getrunken ist: Die Nachrichten-App sortiert Schlagzeilen, der Sprachassistent liest den Kalender vor, und die Navigations-App schlägt eine Route vor, die angeblich zwölf Minuten spart. Laut einer aktuellen Erhebung des Digitalverbands Bitkom nutzen bereits 68 Prozent der Deutschen mindestens einmal täglich KI-gestützte Anwendungen – häufig, ohne es zu merken.\n\nDass diese Entwicklung Vorteile bringt, ist unbestritten. Routineaufgaben werden automatisiert, Informationen schneller gefunden, und wer eine Fremdsprache lernt, bekommt Übungen, die auf das eigene Niveau zugeschnitten sind. Problematisch wird es jedoch dort, wo Bequemlichkeit in Abhängigkeit umschlägt. Wer jede Entscheidung – vom Abendessen bis zur Urlaubsplanung – einem Algorithmus überlässt, verlernt allmählich, selbst abzuwägen.\n\nHinzu kommt ein zweites Problem: die mangelnde Transparenz. Von den Anbietern wird selten offengelegt, nach welchen Kriterien ihre Systeme Empfehlungen aussprechen. Der Verbraucherzentrale Bundesverband fordert deshalb seit Langem eine Kennzeichnungspflicht für KI-generierte Inhalte – bislang vergeblich.\n\nEin Verzicht auf künstliche Intelligenz wäre trotzdem der falsche Weg; er wäre ungefähr so sinnvoll wie der Verzicht auf Elektrizität. Entscheidend ist vielmehr ein bewusster Umgang: KI sollte uns Arbeit abnehmen, nicht das Denken. Wer versteht, wie die Systeme funktionieren, kann sie nutzen, ohne sich von ihnen steuern zu lassen. Genau dieses Verständnis müsste bereits in der Schule vermittelt werden – und zwar nicht irgendwann, sondern jetzt.",
    questions: [
      {
        text: "Welche Position vertritt der Autor insgesamt?",
        options: [
          "Auf künstliche Intelligenz sollte im Alltag möglichst verzichtet werden.",
          "Künstliche Intelligenz sollte bewusst genutzt und verstanden werden.",
          "KI-Systeme sind bereits transparent genug, um ihnen zu vertrauen.",
        ],
        answer: 1,
        explain:
          "Son paragrafta yazar „Entscheidend ist vielmehr ein bewusster Umgang“ diyerek yasağı değil bilinçli kullanımı savunuyor; vazgeçmeyi elektrikten vazgeçmeye benzetip saçma buluyor.",
      },
      {
        text: "Was ergab die Erhebung des Digitalverbands Bitkom?",
        options: [
          "68 Prozent der Deutschen nutzen mindestens einmal täglich KI-Anwendungen.",
          "Die meisten Deutschen merken sofort, wenn sie künstliche Intelligenz nutzen.",
          "Zwei Drittel der Deutschen lehnen KI-Anwendungen grundsätzlich ab.",
        ],
        answer: 0,
        explain:
          "İlk paragrafta „nutzen bereits 68 Prozent der Deutschen mindestens einmal täglich KI-gestützte Anwendungen“ deniyor; üstelik çoğu bunu fark etmeden yapıyor.",
      },
      {
        text: "Die Forderung des Verbraucherzentrale Bundesverbands nach einer Kennzeichnungspflicht war bisher erfolgreich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Metin talebin „bislang vergeblich“ yani şimdiye dek sonuçsuz kaldığını söylüyor.",
      },
      {
        text: "Was will der Autor mit dem Vergleich zwischen dem Verzicht auf KI und dem Verzicht auf Elektrizität sagen?",
        options: [
          "Beides wäre unrealistisch und wenig sinnvoll.",
          "KI-Systeme verbrauchen zu viel Strom.",
          "Elektrizität ist gefährlicher als künstliche Intelligenz.",
        ],
        answer: 0,
        explain:
          "Karşılaştırma bir çıkarım sorusu: yazar KI'dan vazgeçmenin elektrikten vazgeçmek kadar anlamsız, yani gerçekçi olmayan bir yol olduğunu vurguluyor.",
      },
      {
        text: "Der Autor meint, der richtige Umgang mit KI sollte erst im Berufsleben gelernt werden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Tam tersine: „Genau dieses Verständnis müsste bereits in der Schule vermittelt werden“ — bu bilincin daha okulda kazandırılması gerektiğini söylüyor.",
      },
    ],
  },
  {
    id: "b2-r2",
    level: "B2",
    skill: "reading",
    title: "Wärmepumpen: Wie Heizen klimafreundlich wird",
    genre: "Popüler bilim makalesi",
    intro:
      "Isı pompası teknolojisini anlatan popüler bilim makalesini okuyacaksın; sayılara ve araştırma sonuçlarına dikkat et.",
    minutes: 6,
    gloss: [
      { de: "die Wärmepumpe", tr: "ısı pompası" },
      { de: "das Erdreich", tr: "toprak, zemin" },
      { de: "entziehen", tr: "çekmek, almak" },
      { de: "die Anschaffung", tr: "satın alma, edinme" },
      { de: "gedämmt", tr: "yalıtılmış" },
      { de: "sanieren", tr: "(binayı) yenilemek" },
      { de: "die Betriebskosten", tr: "işletme giderleri" },
      { de: "einwenden", tr: "itiraz etmek" },
      { de: "die Stückzahl", tr: "üretim adedi" },
      { de: "die Vorgabe", tr: "yasal şart, direktif" },
      { de: "hinauslaufen auf", tr: "sonuçta (bir şeye) varmak" },
    ],
    text:
      "In deutschen Heizungskellern vollzieht sich derzeit ein leiser Wandel: Immer mehr Haushalte ersetzen ihre Gas- oder Ölheizung durch eine Wärmepumpe. Nach Angaben des Bundesverbands Wärmepumpe wurden allein im vergangenen Jahr rund 350.000 Geräte installiert – ein Rekordwert, auch wenn die Nachfrage zuletzt wieder leicht zurückgegangen ist.\n\nDas Prinzip der Technik ist älter, als viele vermuten: Eine Wärmepumpe funktioniert im Grunde wie ein umgekehrter Kühlschrank. Sie entzieht der Umgebung – der Luft, dem Erdreich oder dem Grundwasser – Wärme und bringt diese mithilfe von Strom auf ein höheres Temperaturniveau. Aus einer Kilowattstunde Strom können so drei bis vier Kilowattstunden Heizwärme gewonnen werden. Wird der Strom aus erneuerbaren Quellen erzeugt, heizt das Haus nahezu klimaneutral.\n\nKritiker wenden ein, die Geräte seien in der Anschaffung zu teuer und für ältere, schlecht gedämmte Gebäude ungeeignet. Eine Untersuchung des Fraunhofer-Instituts für Solare Energiesysteme kommt allerdings zu einem anderen Ergebnis: Selbst in unsanierten Altbauten arbeiteten die getesteten Anlagen überwiegend effizient, wenn auch mit höheren Betriebskosten. Entscheidend sei weniger das Baujahr des Hauses als die richtige Planung der Anlage.\n\nFachleute rechnen damit, dass die Preise in den kommenden Jahren sinken werden, sobald die Produktion in größere Stückzahlen geht. Wer heute baut oder saniert, kommt an der Technologie ohnehin kaum vorbei: Ab 2028 müssen neue Heizungen in den meisten Fällen zu 65 Prozent mit erneuerbaren Energien betrieben werden – eine Vorgabe, die faktisch auf die Wärmepumpe hinausläuft.",
    questions: [
      {
        text: "Worum geht es im Text hauptsächlich?",
        options: [
          "Um die Funktionsweise und die Zukunftsaussichten der Wärmepumpe.",
          "Um ein sofortiges Verbot von Gas- und Ölheizungen.",
          "Um die Nachteile erneuerbarer Energien beim Heizen.",
        ],
        answer: 0,
        explain:
          "Metin ısı pompasının çalışma prensibini, eleştirileri ve gelecek beklentilerini anlatıyor; ani bir yasak söz konusu değil, 2028 kuralı yalnızca yeni ısıtma sistemleri için geçerli.",
      },
      {
        text: "Wie funktioniert eine Wärmepumpe laut Text?",
        options: [
          "Sie erzeugt Wärme durch die Verbrennung von Gas.",
          "Sie entzieht der Umgebung Wärme und hebt sie mit Strom auf ein höheres Niveau.",
          "Sie speichert Sonnenlicht direkt in großen Batterien.",
        ],
        answer: 1,
        explain:
          "İkinci paragraf: „Sie entzieht der Umgebung Wärme und bringt diese mithilfe von Strom auf ein höheres Temperaturniveau“ — ters çalışan bir buzdolabına benzetiliyor.",
      },
      {
        text: "Die Untersuchung des Fraunhofer-Instituts zeigt, dass Wärmepumpen in Altbauten grundsätzlich nicht funktionieren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Araştırma tam tersini bulmuş: „Selbst in unsanierten Altbauten arbeiteten die getesteten Anlagen überwiegend effizient“ — yalnızca işletme giderleri daha yüksek.",
      },
      {
        text: "Was ist laut der Untersuchung entscheidend für die Effizienz einer Wärmepumpe?",
        options: [
          "Das Baujahr des Gebäudes.",
          "Die richtige Planung der Anlage.",
          "Der Hersteller des Geräts.",
        ],
        answer: 1,
        explain:
          "„Entscheidend sei weniger das Baujahr des Hauses als die richtige Planung der Anlage“ — bina yaşı çeldirici, asıl belirleyici planlamadır.",
      },
      {
        text: "Fachleute erwarten, dass Wärmepumpen in den kommenden Jahren günstiger werden.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Son paragrafta uzmanların üretim adedi arttıkça fiyatların düşeceğini beklediği söyleniyor: „dass die Preise in den kommenden Jahren sinken werden“.",
      },
    ],
  },
  {
    id: "b2-r3",
    level: "B2",
    skill: "reading",
    title: "„Vertrauen ist die neue Stechuhr“ – Gespräch mit einer Arbeitsforscherin",
    genre: "Röportaj",
    intro:
      "Bir çalışma sosyoloğuyla ev ofis kültürü üzerine yapılmış gazete röportajını okuyacaksın; uzmanın nüanslı görüşlerini yakala.",
    minutes: 7,
    gloss: [
      { de: "das Auslaufmodell", tr: "modası geçen model" },
      { de: "die Anwesenheitspflicht", tr: "ofiste bulunma zorunluluğu" },
      { de: "die Entgrenzung", tr: "sınırların silinmesi" },
      { de: "abschalten", tr: "kafayı işten koparmak" },
      { de: "die Erreichbarkeit", tr: "ulaşılabilirlik" },
      { de: "erfassen", tr: "kayıt altına almak" },
      { de: "die Führungskraft", tr: "yönetici" },
      { de: "die Stechuhr", tr: "mesai saati kartı, puantaj saati" },
      { de: "die Befragung", tr: "anket, soruşturma" },
      { de: "Grenzen ziehen", tr: "sınır koymak" },
    ],
    text:
      "Seit der Pandemie arbeitet gut ein Viertel der Beschäftigten in Deutschland zumindest teilweise von zu Hause. Die Arbeitssoziologin Prof. Dr. Miriam Brandt von der Universität Bremen erforscht, wie sich dadurch unsere Arbeitskultur verändert.\n\nFrau Brandt, viele Unternehmen holen ihre Beschäftigten gerade zurück ins Büro. Ist das Homeoffice ein Auslaufmodell?\n\nNein, davon kann keine Rede sein. Richtig ist, dass einige große Konzerne wieder Anwesenheitspflichten eingeführt haben. Unsere Daten zeigen aber, dass hybride Modelle – etwa zwei bis drei Bürotage pro Woche – inzwischen der Normalfall sind. Eine vollständige Rückkehr zur alten Präsenzkultur halte ich für ausgeschlossen.\n\nKritiker sagen, zu Hause werde weniger gearbeitet.\n\nDas Gegenteil ist häufig der Fall. In unserer Befragung von 4.000 Beschäftigten gaben viele an, im Homeoffice konzentrierter zu arbeiten und Pausen eher ausfallen zu lassen. Das eigentliche Risiko ist nicht Faulheit, sondern Entgrenzung: Wenn der Laptop im Wohnzimmer steht, fällt es schwer, abends abzuschalten.\n\nWas empfehlen Sie Unternehmen?\n\nErstens klare Regeln: Erreichbarkeit muss definiert, Überstunden müssen erfasst werden. Zweitens sollte das Büro attraktiver werden – als Ort der Begegnung, nicht der Kontrolle. Und drittens brauchen Führungskräfte ein neues Verständnis ihrer Rolle: Wer Leistung nur daran misst, wer am längsten am Schreibtisch sitzt, hat die Entwicklung verschlafen. Vertrauen ist, wenn Sie so wollen, die neue Stechuhr.\n\nUnd die Beschäftigten selbst?\n\nSie sollten bewusst Grenzen ziehen: feste Arbeitszeiten, ein eigener Arbeitsplatz, und nach Feierabend bleibt der Laptop zu. Homeoffice ist eine Chance – aber nur für die, die sich selbst gut organisieren können.",
    questions: [
      {
        text: "Wie beurteilt Frau Brandt die Zukunft des Homeoffice?",
        options: [
          "Es wird verschwinden, weil große Konzerne Anwesenheit verlangen.",
          "Hybride Modelle mit einigen Bürotagen werden der Normalfall bleiben.",
          "Alle Beschäftigten werden künftig ausschließlich zu Hause arbeiten.",
        ],
        answer: 1,
        explain:
          "Brandt bazı şirketlerin geri çağırdığını kabul ediyor ama verilerine göre „hybride Modelle sind inzwischen der Normalfall“; eski tam mesai kültürüne dönüşü imkânsız görüyor.",
      },
      {
        text: "Was ist laut Frau Brandt das eigentliche Risiko beim Homeoffice?",
        options: [
          "Dass die Beschäftigten zu Hause weniger arbeiten.",
          "Dass Arbeit und Privatleben ineinander übergehen.",
          "Dass die Technik zu Hause häufig ausfällt.",
        ],
        answer: 1,
        explain:
          "„Das eigentliche Risiko ist nicht Faulheit, sondern Entgrenzung“ — tembellik değil, işle özel hayat arasındaki sınırın silinmesi asıl tehlike.",
      },
      {
        text: "In der Befragung gaben viele Beschäftigte an, im Homeoffice häufiger Pausen zu machen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Tam tersi söyleniyor: molaları çoğunlukla atlıyorlar — „Pausen eher ausfallen zu lassen“.",
      },
      {
        text: "Was kritisiert Frau Brandt an manchen Führungskräften?",
        options: [
          "Sie messen Leistung an der Anwesenheit statt an den Ergebnissen.",
          "Sie kontrollieren die Arbeitszeiten mit modernen Stechuhren.",
          "Sie verbringen selbst zu wenig Zeit im Büro.",
        ],
        answer: 0,
        explain:
          "„Wer Leistung nur daran misst, wer am längsten am Schreibtisch sitzt, hat die Entwicklung verschlafen“ — performansı masada oturma süresiyle ölçmeyi eleştiriyor; „Stechuhr“ burada mecaz.",
      },
      {
        text: "Frau Brandt empfiehlt den Beschäftigten, auch nach Feierabend für die Firma erreichbar zu bleiben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Önerisi tam tersi: mesai bitince laptop kapalı kalmalı — „nach Feierabend bleibt der Laptop zu“.",
      },
    ],
  },
  {
    id: "b2-r4",
    level: "B2",
    skill: "reading",
    title: "Das Recht auf Reparatur – ein überfälliger Schritt",
    genre: "Köşe yazısı",
    intro:
      "AB'nin yeni „onarım hakkı“ düzenlemesini değerlendiren bir köşe yazısını okuyacaksın; yazarın hem desteğini hem çekincelerini ayırt et.",
    minutes: 6,
    gloss: [
      { de: "der Elektroschrott", tr: "elektronik atık" },
      { de: "der Bruchteil", tr: "küçük bir kısım" },
      { de: "überfällig", tr: "çoktan gecikmiş" },
      { de: "der Hersteller", tr: "üretici" },
      { de: "das Ersatzteil", tr: "yedek parça" },
      { de: "zu kurz greifen", tr: "yetersiz kalmak (argüman)" },
      { de: "langlebig", tr: "uzun ömürlü" },
      { de: "die Nutzungsdauer", tr: "kullanım süresi" },
      { de: "sich rechnen", tr: "kârlı olmak, hesabı tutmak" },
      { de: "die Umsetzung", tr: "uygulama, hayata geçirme" },
      { de: "erproben", tr: "denemek, sınamak" },
    ],
    text:
      "Wenn der Akku schlappmacht oder das Display splittert, landet das Smartphone in Deutschland im Durchschnitt nach knapp drei Jahren in der Schublade – oder gleich im Müll. Rund 22 Kilogramm Elektroschrott produziert jeder Mensch in der Europäischen Union pro Jahr; nur ein Bruchteil davon wird recycelt. Dass die EU nun ein Recht auf Reparatur beschlossen hat, ist deshalb überfällig.\n\nKünftig müssen Hersteller bestimmte Geräte – von der Waschmaschine bis zum Handy – auch nach Ablauf der Garantie zu angemessenen Preisen reparieren und Ersatzteile über Jahre bereithalten. Verbraucherinnen und Verbraucher sollen zudem transparent darüber informiert werden, wie leicht sich ein Produkt reparieren lässt.\n\nSkeptiker befürchten steigende Preise, weil die Hersteller die zusätzlichen Kosten weitergeben würden. Dieses Argument greift jedoch zu kurz. Erstens zeigen Erfahrungen aus Frankreich, wo ein Reparaturindex bereits seit 2021 gilt, dass viele Firmen ihre Produkte daraufhin langlebiger konstruiert haben. Zweitens rechnet sich Reparieren auch volkswirtschaftlich: Nach einer Studie des Umweltbundesamts könnten durch längere Nutzungsdauern jährlich Rohstoffe im Wert von mehreren Milliarden Euro eingespart werden.\n\nEntscheidend wird allerdings die Umsetzung sein. Solange eine Reparatur fast so viel kostet wie ein Neugerät, wird sich das Verhalten der Mehrheit kaum ändern. Sinnvoll wären deshalb ergänzende Maßnahmen wie ein bundesweiter Reparaturbonus, wie ihn Thüringen bereits erprobt hat. Das Recht auf Reparatur ist ein wichtiger Anfang – mehr aber auch nicht.",
    questions: [
      {
        text: "Wie bewertet der Autor das neue Recht auf Reparatur?",
        options: [
          "Als überflüssig, weil Reparaturen ohnehin zu teuer bleiben.",
          "Als wichtigen, aber noch nicht ausreichenden Schritt.",
          "Als vollständige Lösung des Problems mit dem Elektroschrott.",
        ],
        answer: 1,
        explain:
          "Yazının kapanışı tutumu özetliyor: „Das Recht auf Reparatur ist ein wichtiger Anfang – mehr aber auch nicht“ — önemli ama tek başına yeterli değil.",
      },
      {
        text: "Wozu werden die Hersteller künftig verpflichtet?",
        options: [
          "Geräte auch nach Ablauf der Garantie zu angemessenen Preisen zu reparieren.",
          "Alle defekten Geräte kostenlos durch Neugeräte zu ersetzen.",
          "Nur noch Waschmaschinen mit zwanzig Jahren Garantie zu verkaufen.",
        ],
        answer: 0,
        explain:
          "İkinci paragraf: garanti bittikten sonra da makul fiyata onarım ve yıllarca yedek parça bulundurma zorunluluğu geliyor; ücretsiz değişim söz konusu değil.",
      },
      {
        text: "In Frankreich hat der Reparaturindex laut Text dazu geführt, dass viele Firmen langlebigere Produkte bauen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Üçüncü paragrafta Fransa örneği veriliyor: 2021'den beri geçerli endeks sayesinde „viele Firmen ihre Produkte daraufhin langlebiger konstruiert haben“.",
      },
      {
        text: "Welche Rolle spielt die Studie des Umweltbundesamts in der Argumentation?",
        options: [
          "Sie belegt, dass sich Reparieren auch wirtschaftlich lohnt.",
          "Sie zeigt, dass Recycling wichtiger ist als Reparatur.",
          "Sie warnt vor steigenden Preisen durch das neue Gesetz.",
        ],
        answer: 0,
        explain:
          "Çalışma, fiyat itirazını çürütmek için kullanılıyor: daha uzun kullanım süreleriyle yılda milyarlarca euro değerinde ham madde tasarrufu mümkün.",
      },
      {
        text: "Der Autor schlägt vor, das Gesetz wieder abzuschaffen, falls die Preise steigen sollten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Böyle bir öneri yok; yazar tersine tamamlayıcı önlemler, örneğin Thüringen'in denediği gibi ülke çapında bir onarım bonusu istiyor.",
      },
    ],
  },
  {
    id: "b2-r5",
    level: "B2",
    skill: "reading",
    title: "Mehrsprachigkeit an deutschen Schulen: Ergebnisse des Bildungsberichts",
    genre: "Rapor özeti",
    intro:
      "Ulusal eğitim raporunun okullardaki çok dillilik bölümünün resmi özetini okuyacaksın; bulgular ile öneriler arasındaki farka dikkat et.",
    minutes: 6,
    gloss: [
      { de: "die Vielfalt", tr: "çeşitlilik" },
      { de: "aufwachsen", tr: "(bir ortamda) büyümek" },
      { de: "die Annahme", tr: "varsayım" },
      { de: "die Förderung", tr: "destek, teşvik" },
      { de: "flächendeckend", tr: "ülke/bölge çapında, yaygın" },
      { de: "die Herkunftssprache", tr: "köken dili, ana dil" },
      { de: "einbeziehen", tr: "dahil etmek" },
      { de: "der Handlungsbedarf", tr: "eylem ihtiyacı" },
      { de: "die Lehrkraft", tr: "öğretmen" },
      { de: "heterogen", tr: "karma, türdeş olmayan" },
      { de: "verpflichtend", tr: "zorunlu" },
      { de: "die Fortbildung", tr: "hizmet içi eğitim" },
    ],
    text:
      "Der aktuelle nationale Bildungsbericht, der im Auftrag der Kultusministerkonferenz erstellt wurde, widmet der sprachlichen Vielfalt an deutschen Schulen erstmals ein eigenes Kapitel. Die wichtigsten Ergebnisse werden im Folgenden zusammengefasst.\n\nInzwischen wächst mehr als ein Drittel der Schülerinnen und Schüler mit mindestens einer weiteren Sprache neben dem Deutschen auf; in Großstädten liegt der Anteil teilweise über fünfzig Prozent. Am häufigsten vertreten sind Türkisch, Russisch, Arabisch und Polnisch. Entgegen einer verbreiteten Annahme wirkt sich Mehrsprachigkeit dem Bericht zufolge nicht negativ auf den Schulerfolg aus. Entscheidend seien vielmehr die soziale Lage der Familie und die Qualität der sprachlichen Förderung.\n\nKritisch bewertet der Bericht die ungleiche Verteilung der Fördermittel. Während einige Bundesländer flächendeckend Sprachförderprogramme ab dem Kindergarten anbieten, wird andernorts erst in der Grundschule mit gezielter Förderung begonnen – nach Ansicht der Autorinnen und Autoren zu spät. Empfohlen wird außerdem, die Herkunftssprachen stärker in den Unterricht einzubeziehen: Wer seine Erstsprache gut beherrsche, lerne in der Regel auch die Zweitsprache Deutsch schneller.\n\nHandlungsbedarf sieht der Bericht schließlich bei der Lehrerbildung. Nur etwa jede fünfte Lehrkraft fühlt sich nach eigener Aussage ausreichend auf den Unterricht in sprachlich heterogenen Klassen vorbereitet. Gefordert werden daher verpflichtende Fortbildungen sowie mehr Lehrkräfte, die selbst eine Einwanderungsgeschichte haben. Der vollständige Bericht kann auf der Internetseite der Kultusministerkonferenz heruntergeladen werden.",
    questions: [
      {
        text: "Welche Aussage entspricht den Ergebnissen des Berichts?",
        options: [
          "Mehrsprachigkeit wirkt sich negativ auf den Schulerfolg aus.",
          "Für den Schulerfolg sind vor allem die soziale Lage und die Sprachförderung entscheidend.",
          "In Großstädten sprechen alle Schülerinnen und Schüler mehrere Sprachen.",
        ],
        answer: 1,
        explain:
          "Rapor yaygın varsayımın aksini söylüyor: çok dillilik başarıyı olumsuz etkilemiyor; belirleyici olan „die soziale Lage der Familie und die Qualität der sprachlichen Förderung“.",
      },
      {
        text: "Was kritisiert der Bericht an der Sprachförderung?",
        options: [
          "Dass sie in manchen Bundesländern erst in der Grundschule beginnt.",
          "Dass sie überall schon im Kindergarten beginnt.",
          "Dass sie insgesamt zu teuer geworden ist.",
        ],
        answer: 0,
        explain:
          "Eleştirilen nokta eşitsiz dağılım: bazı eyaletler anaokulundan itibaren destek verirken „andernorts erst in der Grundschule begonnen“ — yazarlara göre bu çok geç.",
      },
      {
        text: "Dem Bericht zufolge hilft eine gut beherrschte Erstsprache beim Erlernen des Deutschen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Metin bunu açıkça söylüyor: ilk dilini iyi bilen, ikinci dil olan Almancayı da genellikle daha hızlı öğreniyor.",
      },
      {
        text: "Wie viele Lehrkräfte fühlen sich ausreichend auf sprachlich heterogene Klassen vorbereitet?",
        options: [
          "Nur etwa jede fünfte.",
          "Mehr als die Hälfte.",
          "Fast alle Lehrkräfte.",
        ],
        answer: 0,
        explain:
          "Son paragraf: „Nur etwa jede fünfte Lehrkraft fühlt sich ausreichend vorbereitet“ — bu yüzden zorunlu hizmet içi eğitim talep ediliyor.",
      },
      {
        text: "Der Bericht empfiehlt, die Herkunftssprachen aus dem Unterricht herauszuhalten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Öneri tam tersi yönde: köken dillerinin derse daha güçlü biçimde dahil edilmesi tavsiye ediliyor („stärker in den Unterricht einzubeziehen“).",
      },
    ],
  },
  {
    id: "b2-r6",
    level: "B2",
    skill: "reading",
    title: "Schreiben der Stadtverwaltung: Umgestaltung der Lindenstraße",
    genre: "Resmi yazışma",
    intro:
      "Belediyenin mahalle sakinlerine gönderdiği resmi bilgilendirme yazısını okuyacaksın; alınan kararları ve tarihleri not et.",
    minutes: 5,
    gloss: [
      { de: "die Umgestaltung", tr: "yeniden düzenleme" },
      { de: "der Anwohner", tr: "mahalle sakini" },
      { de: "die Verkehrsberuhigung", tr: "trafiği yavaşlatma önlemleri" },
      { de: "die Höchstgeschwindigkeit", tr: "azami hız" },
      { de: "überschreiten", tr: "aşmak" },
      { de: "die Maßnahme", tr: "önlem" },
      { de: "verengen", tr: "daraltmak" },
      { de: "entfallen", tr: "iptal olmak, kalkmak" },
      { de: "gewährleisten", tr: "güvence altına almak" },
      { de: "die Zufahrt", tr: "araç girişi" },
      { de: "vergünstigt", tr: "indirimli" },
    ],
    text:
      "Sehr geehrte Anwohnerinnen und Anwohner der Lindenstraße,\n\nmit diesem Schreiben möchten wir Sie über die geplante Umgestaltung Ihrer Straße informieren, die vom Stadtrat am 14. März beschlossen wurde.\n\nWie Ihnen bekannt sein dürfte, wird die Lindenstraße täglich von rund 8.000 Fahrzeugen befahren, obwohl sie ursprünglich als reine Wohnstraße angelegt wurde. Bei einer Verkehrszählung im vergangenen Herbst wurde zudem festgestellt, dass die zulässige Höchstgeschwindigkeit von 30 Kilometern pro Stunde von fast der Hälfte der Fahrzeuge überschritten wird. Auf Beschwerden aus der Anwohnerschaft hin wurde daher ein Konzept zur Verkehrsberuhigung erarbeitet.\n\nVorgesehen sind folgende Maßnahmen: Die Fahrbahn wird auf Höhe der Grundschule verengt, an drei Stellen werden Hochbeete mit Sitzgelegenheiten errichtet, und zwanzig zusätzliche Fahrradbügel werden installiert. Darüber hinaus entfallen zwölf Parkplätze, wofür im Parkhaus an der Bergstraße vergünstigte Dauerstellplätze für Anwohner eingerichtet werden.\n\nDie Bauarbeiten beginnen voraussichtlich am 2. September und werden etwa vier Monate dauern. Während dieser Zeit ist mit Einschränkungen zu rechnen; die Zufahrt zu den Wohnhäusern bleibt jedoch jederzeit gewährleistet.\n\nAm Donnerstag, dem 21. August, findet um 18 Uhr im Bürgerhaus eine Informationsveranstaltung statt, bei der das Planungsteam Ihre Fragen beantwortet. Um Anmeldung unter der unten angegebenen Telefonnummer wird gebeten.\n\nMit freundlichen Grüßen\nIhr Amt für Stadtentwicklung",
    questions: [
      {
        text: "Warum soll die Lindenstraße umgestaltet werden?",
        options: [
          "Weil sie stark befahren wird und viele Fahrzeuge zu schnell fahren.",
          "Weil die Anwohner mehr Parkplätze gefordert haben.",
          "Weil die Grundschule an der Straße geschlossen werden soll.",
        ],
        answer: 0,
        explain:
          "Gerekçe ikinci paragrafta: konut sokağı olmasına rağmen günde 8.000 araç geçiyor ve araçların neredeyse yarısı hız sınırını aşıyor; sakinlerin şikâyetleri üzerine plan hazırlanmış.",
      },
      {
        text: "Bei der Verkehrszählung wurde festgestellt, dass fast die Hälfte der Fahrzeuge schneller als erlaubt fährt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Metinde aynen böyle: 30 kilometrelik azami hız „von fast der Hälfte der Fahrzeuge überschritten wird“.",
      },
      {
        text: "Was ist als Ausgleich für die entfallenden Parkplätze vorgesehen?",
        options: [
          "Vergünstigte Dauerstellplätze in einem Parkhaus.",
          "Zwanzig neue Parkplätze in der Bergstraße.",
          "Ein kostenloser Shuttleservice für die Anwohner.",
        ],
        answer: 0,
        explain:
          "Kalkan on iki park yerine karşılık Bergstraße'deki katlı otoparkta sakinlere indirimli abonelik yerleri açılacak; yirmi sayısı park yeri değil, bisiklet bağlama demirleri için geçiyor.",
      },
      {
        text: "Während der Bauarbeiten können die Anwohner ihre Häuser zeitweise nicht mit dem Auto erreichen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Kısıtlamalar olacak ama „die Zufahrt zu den Wohnhäusern bleibt jedoch jederzeit gewährleistet“ — evlere araç girişi her zaman açık kalacak.",
      },
      {
        text: "Was sollen Interessierte vor der Informationsveranstaltung tun?",
        options: [
          "Sich telefonisch anmelden.",
          "Einen schriftlichen Antrag beim Stadtrat stellen.",
          "Ihre Fragen vorab per E-Mail einreichen.",
        ],
        answer: 0,
        explain:
          "Son paragrafta „Um Anmeldung unter der unten angegebenen Telefonnummer wird gebeten“ deniyor — telefonla kayıt rica ediliyor.",
      },
    ],
  },

  // -------------------------------------------------------------- DİNLEME
  {
    id: "b2-l1",
    level: "B2",
    skill: "listening",
    title: "Radiodiskussion: Wie erkennt man Falschnachrichten?",
    genre: "Radyo tartışması",
    intro:
      "Bir radyo programında medya bilimci ve gazeteci, yalan haberlerin nasıl yayıldığını tartışıyor; kimin hangi görüşü savunduğunu takip et.",
    minutes: 5,
    gloss: [
      { de: "die Falschmeldung", tr: "yalan haber" },
      { de: "hereinfallen auf", tr: "(bir şeye) kanmak" },
      { de: "auslösen", tr: "tetiklemek" },
      { de: "die Quelle", tr: "kaynak" },
      { de: "weiterleiten", tr: "iletmek, paylaşıp yaymak" },
      { de: "unabhängig", tr: "bağımsız" },
      { de: "der Zusammenhang", tr: "bağlam" },
      { de: "die Rückwärtssuche", tr: "tersine (görsel) arama" },
      { de: "bewerten", tr: "değerlendirmek" },
      { de: "der Beweis", tr: "kanıt" },
    ],
    segments: [
      {
        speaker: "Moderator",
        text: "Willkommen bei unserer Sendung „Medien im Blick“. Falschnachrichten verbreiten sich in sozialen Netzwerken schneller als je zuvor. Bei mir im Studio sind die Medienwissenschaftlerin Doktor Sabine Klein und der Journalist Emre Yilmaz. Frau Klein, warum fallen so viele Menschen auf Falschmeldungen herein?",
      },
      {
        speaker: "Frau Doktor Klein",
        text: "Das liegt vor allem an unseren Emotionen. Meldungen, die Wut oder Angst auslösen, werden nach unseren Untersuchungen etwa sechsmal häufiger geteilt als sachliche Nachrichten. Wer emotional reagiert, prüft die Quelle meistens nicht mehr. Dazu kommt der Zeitdruck: Die meisten Menschen entscheiden innerhalb weniger Sekunden, ob sie etwas weiterleiten.",
      },
      {
        speaker: "Moderator",
        text: "Herr Yilmaz, Sie leiten ein Team, das Fakten überprüft. Wie gehen Sie konkret vor?",
      },
      {
        speaker: "Herr Yilmaz",
        text: "Wir stellen immer drei Fragen: Wer hat die Meldung zuerst veröffentlicht? Gibt es eine zweite, unabhängige Quelle? Und passen Bild und Text überhaupt zusammen? Sehr oft werden nämlich echte Fotos in einen völlig falschen Zusammenhang gestellt. Mit einer einfachen Rückwärtssuche für Bilder lässt sich das in wenigen Minuten überprüfen.",
      },
      {
        speaker: "Frau Doktor Klein",
        text: "Genau deshalb fordern wir, dass Medienkompetenz ein festes Schulfach wird. Kinder lernen Rechnen und Schreiben, aber kaum jemand bringt ihnen bei, Quellen zu bewerten.",
      },
      {
        speaker: "Moderator",
        text: "Und was raten Sie unseren Hörerinnen und Hörern zum Schluss?",
      },
      {
        speaker: "Herr Yilmaz",
        text: "Erst prüfen, dann teilen. Wenn eine Meldung starke Gefühle auslöst, ist das kein Beweis, dass sie falsch ist – aber ein guter Grund, genauer hinzuschauen.",
      },
    ],
    questions: [
      {
        text: "Warum fallen laut Frau Klein viele Menschen auf Falschmeldungen herein?",
        options: [
          "Weil emotionale Reaktionen die Prüfung der Quelle verdrängen.",
          "Weil sachliche Nachrichten häufiger geteilt werden als emotionale.",
          "Weil es im Internet zu wenige verlässliche Nachrichten gibt.",
        ],
        answer: 0,
        explain:
          "Klein'a göre öfke ya da korku uyandıran haberler duygusal tepki yaratıyor ve „wer emotional reagiert, prüft die Quelle meistens nicht mehr“.",
      },
      {
        text: "Wie oft werden emotionale Meldungen laut den Untersuchungen geteilt?",
        options: [
          "Etwa sechsmal häufiger als sachliche Nachrichten.",
          "Etwa doppelt so häufig wie sachliche Nachrichten.",
          "Ungefähr genauso oft wie sachliche Nachrichten.",
        ],
        answer: 0,
        explain:
          "Klein'ın verdiği sayı: bu tür haberler „etwa sechsmal häufiger geteilt“ — yaklaşık altı kat daha sık paylaşılıyor.",
      },
      {
        text: "Was empfiehlt Herr Yilmaz bei verdächtigen Fotos?",
        options: [
          "Eine Rückwärtssuche für Bilder durchzuführen.",
          "Das Foto sofort zu melden und zu löschen.",
          "Nur Fotos aus sozialen Netzwerken zu vertrauen.",
        ],
        answer: 0,
        explain:
          "Yilmaz gerçek fotoğrafların yanlış bağlama konduğunu söylüyor ve bunun „mit einer einfachen Rückwärtssuche“ birkaç dakikada kontrol edilebileceğini anlatıyor.",
      },
      {
        text: "Frau Klein fordert, Medienkompetenz als festes Schulfach einzuführen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Klein bunu açıkça talep ediyor: „dass Medienkompetenz ein festes Schulfach wird“ — çocuklara kaynak değerlendirmeyi kimse öğretmiyor.",
      },
      {
        text: "Herr Yilmaz sagt, dass Meldungen mit starken Gefühlen immer falsch sind.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Tam tersine, güçlü duygular „kein Beweis, dass sie falsch ist“ diyor — yalnızca daha dikkatli bakmak için iyi bir neden.",
      },
    ],
  },
  {
    id: "b2-l2",
    level: "B2",
    skill: "listening",
    title: "Experteninterview: Warum Schlaf unterschätzt wird",
    genre: "Uzman röportajı",
    intro:
      "Bir sağlık programında uyku araştırmacısıyla yapılan söyleşiyi dinleyeceksin; önerileri ve gerekçelerini ayırt et.",
    minutes: 5,
    gloss: [
      { de: "der Bedarf", tr: "ihtiyaç" },
      { de: "durchschlafen", tr: "kesintisiz uyumak" },
      { de: "nachholen", tr: "telafi etmek" },
      { de: "ausgleichen", tr: "dengelemek" },
      { de: "das Defizit", tr: "açık, eksik" },
      { de: "verschieben", tr: "kaydırmak, ertelemek" },
      { de: "unterdrücken", tr: "bastırmak" },
      { de: "das Schlafmittel", tr: "uyku ilacı" },
      { de: "abraten von", tr: "(bir şeyi) yapmamayı önermek" },
      { de: "die Ursache", tr: "neden, sebep" },
    ],
    segments: [
      {
        speaker: "Moderatorin",
        text: "In unserer Reihe „Gesund durch den Alltag“ sprechen wir heute über das Schlafen. Zu Gast ist der Schlafforscher Professor Martin Weber vom Universitätsklinikum Freiburg. Herr Professor, wie viel Schlaf braucht der Mensch wirklich?",
      },
      {
        speaker: "Professor Weber",
        text: "Das ist individuell verschieden, aber für die meisten Erwachsenen liegt der Bedarf zwischen sieben und neun Stunden. Entscheidend ist allerdings nicht nur die Dauer, sondern auch die Qualität. Wer acht Stunden im Bett liegt, aber ständig aufwacht, erholt sich schlechter als jemand, der sieben Stunden durchschläft.",
      },
      {
        speaker: "Moderatorin",
        text: "Viele Menschen schlafen am Wochenende länger, um Schlaf nachzuholen. Funktioniert das?",
      },
      {
        speaker: "Professor Weber",
        text: "Nur begrenzt. Ein kurzfristiges Defizit lässt sich teilweise ausgleichen. Wer aber die ganze Woche zu wenig schläft, kann das am Wochenende nicht vollständig reparieren. Problematischer ist, dass durch das lange Ausschlafen der Schlafrhythmus verschoben wird. Fachleute sprechen vom sozialen Jetlag: Am Montag fühlt man sich dann wie nach einer Fernreise.",
      },
      {
        speaker: "Moderatorin",
        text: "Was raten Sie Menschen mit Einschlafproblemen?",
      },
      {
        speaker: "Professor Weber",
        text: "Drei Dinge. Erstens: jeden Tag ungefähr zur gleichen Zeit aufstehen, auch am Wochenende. Zweitens: abends helles Licht und Bildschirme meiden, denn das blaue Licht unterdrückt das Schlafhormon Melatonin. Und drittens: Das Bett sollte nur zum Schlafen genutzt werden, nicht zum Arbeiten oder Fernsehen. Von Schlafmitteln rate ich ohne ärztliche Begleitung dringend ab. Sie bekämpfen nur die Symptome, nicht die Ursachen.",
      },
    ],
    questions: [
      {
        text: "Was ist laut Professor Weber beim Schlaf entscheidend?",
        options: [
          "Nur die Dauer des Schlafes.",
          "Sowohl die Dauer als auch die Qualität.",
          "Vor allem die Uhrzeit des Einschlafens.",
        ],
        answer: 1,
        explain:
          "Weber „Entscheidend ist nicht nur die Dauer, sondern auch die Qualität“ diyor; sürekli uyanan biri, yedi saat kesintisiz uyuyandan daha az dinleniyor.",
      },
      {
        text: "Was versteht man unter dem sozialen Jetlag?",
        options: [
          "Die Verschiebung des Schlafrhythmus durch langes Ausschlafen.",
          "Die Müdigkeit nach einer langen Fernreise.",
          "Schlafprobleme, die durch zu viel Arbeit entstehen.",
        ],
        answer: 0,
        explain:
          "Weber kavramı hafta sonu uzun uyumanın ritmi kaydırmasıyla açıklıyor; uzak yolculuk yalnızca pazartesi hissini anlatan bir benzetme.",
      },
      {
        text: "Ein kurzfristiges Schlafdefizit lässt sich laut Professor Weber teilweise ausgleichen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Aynen böyle söylüyor: „Ein kurzfristiges Defizit lässt sich teilweise ausgleichen“ — ama bütün haftanın açığı hafta sonu tamamen kapatılamaz.",
      },
      {
        text: "Warum sollen Bildschirme am Abend gemieden werden?",
        options: [
          "Weil blaues Licht das Schlafhormon Melatonin unterdrückt.",
          "Weil Filme am Abend zu aufregend sind.",
          "Weil die Augen sonst dauerhaft geschädigt werden.",
        ],
        answer: 0,
        explain:
          "Gerekçe hormonal: „das blaue Licht unterdrückt das Schlafhormon Melatonin“ — mavi ışık melatonini bastırıyor.",
      },
      {
        text: "Professor Weber empfiehlt Schlafmittel als einfache Lösung bei Einschlafproblemen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Tersine, doktor kontrolü olmadan uyku ilacından kesinlikle kaçınılmasını öneriyor: ilaçlar nedenleri değil yalnızca belirtileri bastırıyor.",
      },
    ],
  },
  {
    id: "b2-l3",
    level: "B2",
    skill: "listening",
    title: "Vortrag: Grüne Städte gegen die Sommerhitze",
    genre: "Sunum",
    intro:
      "Şehir planlaması üzerine bir akşam etkinliğinde verilen konferansın giriş bölümünü dinleyeceksin; kavramları ve örnek şehirleri not et.",
    minutes: 4,
    gloss: [
      { de: "der Wärmeinseleffekt", tr: "ısı adası etkisi" },
      { de: "speichern", tr: "depolamak" },
      { de: "abgeben", tr: "(dışarı) vermek, salmak" },
      { de: "verdunsten", tr: "buharlaştırmak" },
      { de: "die Begrünung", tr: "yeşillendirme" },
      { de: "die Fassade", tr: "bina cephesi" },
      { de: "die Kanalisation", tr: "kanalizasyon" },
      { de: "überlasten", tr: "aşırı yüklemek" },
      { de: "gegensteuern", tr: "karşı önlem almak" },
      { de: "die Mittel", tr: "kaynaklar, ödenek" },
    ],
    segments: [
      {
        text: "Meine Damen und Herren, herzlich willkommen zu unserem Themenabend über klimaangepasste Stadtplanung. In meinem Vortrag möchte ich Ihnen zeigen, warum Stadtgrün weit mehr ist als Dekoration.",
      },
      {
        text: "Beginnen wir mit einem Vergleich. An heißen Sommertagen wurden in der Frankfurter Innenstadt bis zu acht Grad höhere Temperaturen gemessen als im grünen Umland. Fachleute nennen dieses Phänomen den Wärmeinseleffekt: Asphalt und Beton speichern tagsüber die Hitze und geben sie nachts wieder ab. Für ältere Menschen und Kleinkinder kann das zur ernsthaften Gesundheitsgefahr werden.",
      },
      {
        text: "Die gute Nachricht lautet: Städte können gegensteuern. Ein einziger ausgewachsener Straßenbaum verdunstet an einem Sommertag mehrere hundert Liter Wasser und kühlt seine Umgebung dadurch messbar ab. Er wirkt wie eine natürliche Klimaanlage. Begrünte Dächer und Fassaden senken zusätzlich die Temperatur in den Gebäuden und speichern Regenwasser, das bei Starkregen sonst die Kanalisation überlasten würde.",
      },
      {
        text: "Einige Städte machen bereits vor, wie es geht. In Wien wird bei jedem Neubauprojekt geprüft, ob eine Dachbegrünung möglich ist, und Paris hat angekündigt, bis zum Jahr zweitausenddreißig über hundertsiebzigtausend zusätzliche Bäume zu pflanzen. Auch bei uns wäre vieles machbar, vorausgesetzt, die Politik stellt die nötigen Mittel bereit. Was jede und jeder Einzelne von Ihnen beitragen kann, darauf komme ich im zweiten Teil meines Vortrags zurück.",
      },
    ],
    questions: [
      {
        text: "Was ist der Wärmeinseleffekt?",
        options: [
          "Asphalt und Beton speichern tagsüber Hitze und geben sie nachts ab.",
          "Grüne Parks erwärmen sich schneller als die Innenstadt.",
          "Klimaanlagen heizen die Innenstädte zusätzlich auf.",
        ],
        answer: 0,
        explain:
          "Konuşmacı kavramı böyle tanımlıyor: „Asphalt und Beton speichern tagsüber die Hitze und geben sie nachts wieder ab“ — bu yüzden şehir merkezi çevresinden daha sıcak.",
      },
      {
        text: "Welche Wirkung hat ein ausgewachsener Straßenbaum laut dem Vortrag?",
        options: [
          "Er kühlt seine Umgebung durch Verdunstung messbar ab.",
          "Er erhöht die Temperatur in den umliegenden Gebäuden.",
          "Er ersetzt bei Starkregen die Kanalisation vollständig.",
        ],
        answer: 0,
        explain:
          "Bir ağaç günde yüzlerce litre su buharlaştırıp çevresini serinletiyor; konuşmacı onu „natürliche Klimaanlage“ olarak adlandırıyor.",
      },
      {
        text: "In der Frankfurter Innenstadt wurden bis zu acht Grad höhere Temperaturen gemessen als im Umland.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Konuşmanın başındaki karşılaştırma tam olarak bu: şehir merkezi yeşil çevreye göre sekiz dereceye kadar daha sıcak ölçülmüş.",
      },
      {
        text: "Was wird in Wien bei Neubauprojekten geprüft?",
        options: [
          "Ob eine Dachbegrünung möglich ist.",
          "Ob genügend Parkplätze entstehen.",
          "Ob die Fassade aus Beton gebaut wird.",
        ],
        answer: 0,
        explain:
          "Viyana örneğinde her yeni yapı projesinde çatı yeşillendirmesinin mümkün olup olmadığı kontrol ediliyor.",
      },
      {
        text: "Der Redner meint, dass Einzelpersonen nichts zur Abkühlung der Städte beitragen können.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Tam tersi: konuşmacı „Was jede und jeder Einzelne von Ihnen beitragen kann“ konusuna ikinci bölümde döneceğini söylüyor — bireysel katkı mümkün.",
      },
    ],
  },
  {
    id: "b2-l4",
    level: "B2",
    skill: "listening",
    title: "Nachrichtenanalyse: Die Vier-Tage-Woche im Test",
    genre: "Haber analizi",
    intro:
      "Haber stüdyosunda ekonomi muhabiri, dört günlük çalışma haftası pilot projesinin sonuçlarını değerlendiriyor; olumlu bulgularla sınırlamaları ayır.",
    minutes: 5,
    gloss: [
      { de: "das Pilotprojekt", tr: "pilot proje" },
      { de: "die Bilanz", tr: "bilanço, genel sonuç" },
      { de: "die Einschränkung", tr: "kısıtlama, çekince" },
      { de: "die Produktivität", tr: "verimlilik" },
      { de: "der Krankheitstag", tr: "hastalık izni günü" },
      { de: "fortführen", tr: "sürdürmek" },
      { de: "die Branche", tr: "sektör" },
      { de: "der Ablauf", tr: "iş akışı, süreç" },
      { de: "streichen", tr: "kesmek, iptal etmek" },
      { de: "übertragen auf", tr: "(bir şeye) genellemek, aktarmak" },
      { de: "flächendeckend", tr: "ülke çapında, yaygın" },
    ],
    segments: [
      {
        speaker: "Nachrichtensprecher",
        text: "In Deutschland ist das bislang größte Pilotprojekt zur Vier-Tage-Woche zu Ende gegangen. Sechs Monate lang haben fünfundvierzig Unternehmen getestet, ob weniger Arbeitszeit bei vollem Gehalt funktioniert. Unsere Wirtschaftsredakteurin Julia Hoffmann hat die Ergebnisse analysiert. Frau Hoffmann, wie fällt die Bilanz aus?",
      },
      {
        speaker: "Frau Hoffmann",
        text: "Überwiegend positiv, aber mit wichtigen Einschränkungen. Zunächst die guten Nachrichten: In den meisten Betrieben blieb die Produktivität stabil oder stieg sogar leicht an. Die Beschäftigten berichteten von weniger Stress und besserem Schlaf, und die Zahl der Krankheitstage ging um etwa ein Fünftel zurück. Rund siebzig Prozent der teilnehmenden Firmen wollen das Modell deshalb fortführen.",
      },
      {
        speaker: "Nachrichtensprecher",
        text: "Und worin bestehen die Einschränkungen?",
      },
      {
        speaker: "Frau Hoffmann",
        text: "Das Modell passt nicht zu jeder Branche. Teilgenommen haben vor allem Firmen aus der Verwaltung und der Informationstechnologie, wo sich Besprechungen kürzen und Abläufe digitalisieren lassen. In der Pflege oder in der Produktion, wo rund um die Uhr Personal gebraucht wird, lässt sich Arbeitszeit nicht einfach streichen. Dort würde eine Vier-Tage-Woche zusätzliches Personal erfordern, das derzeit fehlt. Kritiker weisen außerdem darauf hin, dass sich fünfundvierzig freiwillig teilnehmende Firmen kaum auf die gesamte Wirtschaft übertragen lassen.",
      },
      {
        speaker: "Nachrichtensprecher",
        text: "Wie geht es jetzt weiter?",
      },
      {
        speaker: "Frau Hoffmann",
        text: "Die Forschungsgruppe plant eine Langzeitstudie über mehrere Jahre. Ob aus dem Experiment ein flächendeckendes Modell wird, dürfte am Ende allerdings weniger die Wissenschaft als der Arbeitsmarkt entscheiden.",
      },
    ],
    questions: [
      {
        text: "Wie fällt die Bilanz des Pilotprojekts aus?",
        options: [
          "Überwiegend positiv, aber mit wichtigen Einschränkungen.",
          "Eindeutig negativ für alle beteiligten Branchen.",
          "Ohne ein erkennbares Ergebnis.",
        ],
        answer: 0,
        explain:
          "Hoffmann sonucu ilk cümlesinde özetliyor: „Überwiegend positiv, aber mit wichtigen Einschränkungen“.",
      },
      {
        text: "Was geschah mit den Krankheitstagen während des Projekts?",
        options: [
          "Sie gingen um etwa ein Fünftel zurück.",
          "Sie stiegen um etwa ein Fünftel an.",
          "Sie blieben völlig unverändert.",
        ],
        answer: 0,
        explain:
          "Olumlu bulgular arasında sayılıyor: „die Zahl der Krankheitstage ging um etwa ein Fünftel zurück“.",
      },
      {
        text: "Rund siebzig Prozent der teilnehmenden Firmen wollen die Vier-Tage-Woche fortführen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Hoffmann bu oranı açıkça veriyor: katılımcı firmaların yaklaşık yüzde yetmişi modele devam etmek istiyor.",
      },
      {
        text: "Warum ist das Modell in der Pflege schwer umsetzbar?",
        options: [
          "Weil dort rund um die Uhr Personal gebraucht wird und Fachkräfte fehlen.",
          "Weil die Beschäftigten dort keine zusätzlichen freien Tage wünschen.",
          "Weil sich Besprechungen dort besonders leicht kürzen lassen.",
        ],
        answer: 0,
        explain:
          "Bakım ve üretimde çalışma saati basitçe kısılamıyor; dört günlük hafta „zusätzliches Personal erfordern“ ki o personel şu anda yok.",
      },
      {
        text: "Frau Hoffmann sagt, dass sich die Ergebnisse problemlos auf die gesamte Wirtschaft übertragen lassen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Eleştirmenlerin uyarısını aktarıyor: gönüllü katılan kırk beş firma „lassen sich kaum auf die gesamte Wirtschaft übertragen“ — genelleme yapılamaz.",
      },
    ],
  },
  {
    id: "b2-l5",
    level: "B2",
    skill: "listening",
    title: "Radiodiskussion: Braucht Deutschland mehr Zuwanderung?",
    genre: "Radyo tartışması",
    intro:
      "Bir akşam programında göç araştırmacısı ve esnaf odası temsilcisi, nitelikli iş gücü göçünü tartışıyor; iki konuğun vurgularını karşılaştır.",
    minutes: 5,
    gloss: [
      { de: "die Zuwanderung", tr: "göç (bir ülkeye)" },
      { de: "die Arbeitskraft", tr: "iş gücü, çalışan" },
      { de: "die Lücke", tr: "açık, boşluk" },
      { de: "das Handwerk", tr: "zanaat, esnaflık sektörü" },
      { de: "der Auszubildende", tr: "çırak, meslek öğrencisi" },
      { de: "das Verfahren", tr: "resmi işlem, prosedür" },
      { de: "die Anwerbung", tr: "yurt dışından eleman kazanma" },
      { de: "die Anerkennung", tr: "denklik, tanınma" },
      { de: "der Abschluss", tr: "diploma, mezuniyet" },
      { de: "abwandern", tr: "göç edip ayrılmak" },
      { de: "gestalten", tr: "şekillendirmek" },
    ],
    segments: [
      {
        speaker: "Moderatorin",
        text: "Guten Abend und willkommen zum „Forum am Abend“. Bis zum Jahr zweitausendfünfunddreißig werden in Deutschland nach Berechnungen des Instituts für Arbeitsmarktforschung rund sieben Millionen Arbeitskräfte fehlen. Darüber spreche ich mit dem Migrationsforscher Professor Cem Arslan und mit Petra Berger von der Handwerkskammer. Herr Professor, lässt sich diese Lücke ohne Zuwanderung schließen?",
      },
      {
        speaker: "Professor Arslan",
        text: "Nein, das zeigen alle seriösen Berechnungen. Selbst wenn mehr Frauen arbeiten würden und die Menschen länger im Beruf blieben, bliebe eine erhebliche Lücke. Deutschland braucht nach unseren Modellen eine Zuwanderung von etwa vierhunderttausend Menschen pro Jahr. Die eigentliche Frage ist also nicht, ob wir Zuwanderung brauchen, sondern wie wir sie gestalten.",
      },
      {
        speaker: "Moderatorin",
        text: "Frau Berger, wie erleben die Betriebe die Situation?",
      },
      {
        speaker: "Frau Berger",
        text: "Bei uns im Handwerk ist der Mangel längst Alltag. Viele Betriebe finden seit Jahren keine Auszubildenden mehr. Wir haben sehr gute Erfahrungen mit Fachkräften aus dem Ausland gemacht, aber die Verfahren dauern viel zu lange. Wenn ein Betrieb acht Monate auf ein Visum wartet, hat sich die Bewerberin längst für Kanada entschieden. Da wird an unserer Zukunft gespart, und zwar am falschen Ende.",
      },
      {
        speaker: "Professor Arslan",
        text: "Dem stimme ich zu. Ich möchte aber ergänzen: Mit der Anwerbung allein ist es nicht getan. Wer Fachkräfte gewinnen will, muss auch dafür sorgen, dass sie bleiben. Dazu gehören Sprachkurse, die Anerkennung ausländischer Abschlüsse und eine Kultur, in der sich Menschen willkommen fühlen. Sonst wandern viele nach wenigen Jahren wieder ab.",
      },
    ],
    questions: [
      {
        text: "Was ist für Professor Arslan die eigentliche Frage?",
        options: [
          "Wie die Zuwanderung gestaltet werden soll.",
          "Ob Deutschland überhaupt Zuwanderung braucht.",
          "Wie sich Zuwanderung verhindern lässt.",
        ],
        answer: 0,
        explain:
          "Arslan tartışmayı kaydırıyor: „Die eigentliche Frage ist nicht, ob wir Zuwanderung brauchen, sondern wie wir sie gestalten“.",
      },
      {
        text: "Welches Problem beschreibt Frau Berger?",
        options: [
          "Die Visumsverfahren dauern viel zu lange.",
          "Die ausländischen Fachkräfte sind schlecht ausgebildet.",
          "Im Handwerk gibt es zu viele Auszubildende.",
        ],
        answer: 0,
        explain:
          "Berger yurt dışından gelen uzmanlarla iyi deneyimler aktarıyor; sorun prosedürlerde: sekiz ay vize bekleyen adaylar Kanada'yı seçiyor.",
      },
      {
        text: "Laut Professor Arslan könnte die Lücke geschlossen werden, wenn nur mehr Frauen arbeiten würden.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Arslan bu senaryoyu Konjunktiv II ile reddediyor: kadın istihdamı artsa ve insanlar daha uzun çalışsa bile „bliebe eine erhebliche Lücke“.",
      },
      {
        text: "Was ist laut Professor Arslan neben der Anwerbung wichtig?",
        options: [
          "Dass Fachkräfte durch Sprachkurse und die Anerkennung ihrer Abschlüsse gehalten werden.",
          "Dass Fachkräfte nach wenigen Jahren wieder in ihre Heimat zurückkehren.",
          "Dass die Betriebe höhere Gebühren für Visa bezahlen.",
        ],
        answer: 0,
        explain:
          "„Mit der Anwerbung allein ist es nicht getan“ — kalıcılık için dil kursları, diploma denkliği ve hoş karşılanma kültürü gerekiyor; yoksa insanlar yeniden göç ediyor.",
      },
      {
        text: "Frau Berger berichtet, dass viele Handwerksbetriebe seit Jahren keine Auszubildenden finden.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Berger'in ilk tespiti bu: „Viele Betriebe finden seit Jahren keine Auszubildenden mehr“ — eleman açığı esnafın günlük gerçeği.",
      },
    ],
  },
  {
    id: "b2-l6",
    level: "B2",
    skill: "listening",
    title: "Experteninterview: Verschwindet das Bargeld?",
    genre: "Uzman röportajı",
    intro:
      "Ödeme alışkanlıkları üzerine bir uzman söyleşisini dinleyeceksin; sayısal karşılaştırmalara ve uzmanın temkinli tavrına dikkat et.",
    minutes: 4,
    gloss: [
      { de: "der Zahlungsverkehr", tr: "ödeme trafiği, ödeme sistemleri" },
      { de: "das Zahlungsmittel", tr: "ödeme aracı" },
      { de: "die Barzahlung", tr: "nakit ödeme" },
      { de: "die Datenspur", tr: "veri izi" },
      { de: "die Ausgaben", tr: "harcamalar" },
      { de: "versagen", tr: "çalışmamak, iflas etmek (teknik)" },
      { de: "der Stromausfall", tr: "elektrik kesintisi" },
      { de: "die Wahlfreiheit", tr: "seçme özgürlüğü" },
      { de: "die Bankfiliale", tr: "banka şubesi" },
      { de: "der Geldautomat", tr: "bankamatik" },
    ],
    segments: [
      {
        speaker: "Moderator",
        text: "Immer mehr Menschen bezahlen mit Karte oder Smartphone. Verschwindet das Bargeld bald ganz? Darüber spreche ich mit Frau Doktor Anna Lehmann, die bei der Deutschen Bundesbank den Zahlungsverkehr erforscht. Frau Lehmann, wie bezahlen die Deutschen heute?",
      },
      {
        speaker: "Frau Doktor Lehmann",
        text: "Der Wandel ist deutlich messbar. Vor zehn Jahren wurden noch etwa drei Viertel aller Einkäufe bar bezahlt, heute ist es nur noch die Hälfte. Bei jungen Erwachsenen ist das Smartphone inzwischen das beliebteste Zahlungsmittel. Trotzdem hängen die Deutschen im europäischen Vergleich noch immer stark am Bargeld.",
      },
      {
        speaker: "Moderator",
        text: "Woran liegt das Ihrer Meinung nach?",
      },
      {
        speaker: "Frau Doktor Lehmann",
        text: "An drei Dingen. Bargeld schützt die Privatsphäre, denn eine Barzahlung hinterlässt keine Datenspur. Es hilft vielen Menschen, den Überblick über ihre Ausgaben zu behalten, denn was ausgegeben ist, sieht man im Portemonnaie sofort. Und es funktioniert auch dann, wenn die Technik versagt. Beim großen Stromausfall in Spanien konnten zeitweise nur noch diejenigen einkaufen, die Scheine und Münzen dabeihatten.",
      },
      {
        speaker: "Moderator",
        text: "Also bleibt uns das Bargeld erhalten?",
      },
      {
        speaker: "Frau Doktor Lehmann",
        text: "Davon gehe ich aus, allerdings mit sinkender Bedeutung. Wichtig ist aus unserer Sicht die Wahlfreiheit: Niemand sollte gezwungen werden, digital zu bezahlen, aber auch niemand, Bargeld zu benutzen. Sorgen bereitet uns eher die Infrastruktur. Wenn immer mehr Bankfilialen und Geldautomaten schließen, wird es vor allem auf dem Land schwieriger, überhaupt an Bargeld zu kommen.",
      },
    ],
    questions: [
      {
        text: "Wie hat sich das Bezahlverhalten in den letzten zehn Jahren verändert?",
        options: [
          "Der Anteil der Barzahlungen ist von drei Vierteln auf die Hälfte gesunken.",
          "Der Anteil der Barzahlungen ist von der Hälfte auf drei Viertel gestiegen.",
          "Das Bezahlverhalten hat sich kaum verändert.",
        ],
        answer: 0,
        explain:
          "Lehmann'ın verdiği sayılar: on yıl önce alışverişlerin dörtte üçü nakitken bugün yalnızca yarısı — düşüş net.",
      },
      {
        text: "Warum schätzen viele Menschen das Bargeld laut Frau Lehmann?",
        options: [
          "Es schützt die Privatsphäre und hilft beim Überblick über die Ausgaben.",
          "Es ist das schnellste aller Zahlungsmittel.",
          "Die Banken empfehlen es ausdrücklich.",
        ],
        answer: 0,
        explain:
          "Üç neden sayıyor: veri izi bırakmaması, harcamaların görünür olması ve teknik arızalarda da çalışması; hız ya da banka önerisi geçmiyor.",
      },
      {
        text: "Beim Stromausfall in Spanien konnten zeitweise nur Menschen mit Bargeld einkaufen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Lehmann örneği aynen böyle veriyor: „konnten zeitweise nur noch diejenigen einkaufen, die Scheine und Münzen dabeihatten“.",
      },
      {
        text: "Welche Position vertritt Frau Lehmann?",
        options: [
          "Alle Menschen sollten frei wählen können, wie sie bezahlen.",
          "Digitales Bezahlen sollte für alle verpflichtend werden.",
          "Das Bargeld sollte möglichst bald abgeschafft werden.",
        ],
        answer: 0,
        explain:
          "Temel ilkesi Wahlfreiheit: kimse dijital ödemeye de nakit kullanmaya da zorlanmamalı.",
      },
      {
        text: "Frau Lehmann befürchtet, dass es auf dem Land schwieriger wird, an Bargeld zu kommen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Endişesi altyapıyla ilgili: banka şubeleri ve bankamatikler kapandıkça özellikle kırsalda nakde ulaşmak zorlaşacak.",
      },
    ],
  },

  // ---------------------------------------------------------------- YAZMA
  {
    id: "b2-w1",
    level: "B2",
    skill: "writing",
    title: "Forumsbeitrag: Handyverbot an Schulen?",
    genre: "Forum yorumu",
    intro:
      "Bir veli forumunda okullarda cep telefonu yasağı tartışılıyor; önce iki cümle kur, sonra tartışmaya kendi yorumunla katıl.",
    minutes: 12,
    gloss: [
      { de: "das Verbot", tr: "yasak" },
      { de: "die Nutzung", tr: "kullanım" },
      { de: "der Umgang mit", tr: "(bir şeyle) başa çıkma, kullanma biçimi" },
      { de: "die Ablenkung", tr: "dikkat dağınıklığı" },
      { de: "das Miteinander", tr: "birlikte yaşam, sosyal ilişki" },
      { de: "vermitteln", tr: "öğretmek, kazandırmak" },
      { de: "das Schließfach", tr: "kilitli dolap" },
      { de: "abgestuft", tr: "kademeli" },
      { de: "pauschal", tr: "toptan, ayrım gözetmeyen" },
      { de: "überreizt", tr: "aşırı uyarılmış, gergin" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Cep telefonlarının derste kullanılması birçok okulda yasaklandı.",
        answer: "Die Nutzung von Handys im Unterricht wurde an vielen Schulen verboten.",
        alternatives: [
          "An vielen Schulen wurde die Nutzung von Handys im Unterricht verboten.",
        ],
        hint: "Passiv Präteritum: „wurde … verboten“; fiil yerine isimleştirme: „die Nutzung von Handys“.",
      },
      {
        kind: "build",
        tr: "Bir yasak yerine öğrencilere bilinçli bir kullanım öğretilmeli.",
        answer:
          "Statt eines Verbots sollte den Schülern ein bewusster Umgang beigebracht werden.",
        alternatives: [
          "Den Schülern sollte statt eines Verbots ein bewusster Umgang beigebracht werden.",
        ],
        hint: "„statt“ edatı Genitiv ister: „statt eines Verbots“; Passiv ile „sollte … beigebracht werden“.",
      },
      {
        kind: "free",
        prompt:
          "Forumdaki tartışmaya bir yorum yaz. Görüşünü gerekçelendir, karşı görüşü de tartıp bir öneriyle bitir: Okullarda cep telefonları tamamen yasaklanmalı mı?",
        stimulus:
          "Beitrag von Markus_74 im Elternforum: Meine Tochter kommt völlig überreizt aus der Schule. In den Pausen starren alle nur auf ihre Bildschirme, niemand redet mehr miteinander. Ich finde, Handys haben an Schulen nichts verloren. Wie seht ihr das?",
        checklist: [
          "Tartışmaya bir giriş cümlesiyle bağlan (Markus'un yorumuna atıf yap).",
          "Kendi görüşünü açıkça belirt ve en az iki gerekçe ver.",
          "Karşı görüşe de değin ve onu tart (einerseits/andererseits).",
          "Somut bir öneri ya da orta yol sun.",
          "Konnektorlarla akışı kur: zwar…aber, deshalb, außerdem.",
        ],
        minWords: 100,
        phrases: [
          { de: "Einerseits …, andererseits …", tr: "Bir yandan…, öte yandan…" },
          { de: "Ich halte … für …", tr: "…'yi … olarak değerlendiriyorum" },
          { de: "Statt … zu verbieten", tr: "…'yi yasaklamak yerine" },
          { de: "Zum einen …, zum anderen …", tr: "Birincisi…, ikincisi…" },
          { de: "Es lässt sich kaum kontrollieren", tr: "Denetlenmesi neredeyse imkânsız" },
          { de: "Meiner Meinung nach", tr: "Bence, benim görüşüme göre" },
          { de: "Ein sinnvoller Kompromiss wäre …", tr: "Mantıklı bir orta yol … olurdu" },
          { de: "Das betrifft mich unmittelbar", tr: "Bu beni doğrudan ilgilendiriyor" },
        ],
        sample:
          "Das Thema betrifft mich als Vater von zwei Schulkindern unmittelbar, deshalb möchte ich meine Sicht darlegen. Einerseits kann ich Markus gut verstehen: Durch die ständige Ablenkung leidet nicht nur die Konzentration, sondern auch das soziale Miteinander in den Pausen. Andererseits halte ich ein komplettes Verbot für den falschen Weg. Zum einen lässt es sich in der Praxis kaum kontrollieren, zum anderen gehören digitale Medien nun einmal zur Lebenswelt der Jugendlichen. Statt Handys generell zu verbieten, sollte der Umgang mit ihnen gezielt vermittelt werden, etwa in einem Fach wie Medienkunde. An der Schule meiner Tochter gibt es außerdem eine überzeugende Zwischenlösung: Bis zur zehnten Klasse bleiben die Geräte vormittags in Schließfächern, während sie im Unterricht gelegentlich gezielt eingesetzt werden. Meiner Meinung nach wäre ein solches abgestuftes Modell sinnvoller als ein pauschales Verbot, das am Ende nur zu Konflikten führt.",
      },
    ],
  },
  {
    id: "b2-w2",
    level: "B2",
    skill: "writing",
    title: "Beschwerdebrief: Mangelhafte Möbellieferung",
    genre: "Şikâyet mektubu",
    intro:
      "Sipariş ettiğin dolap hasarlı geldi ve müşteri hizmetleri dönmüyor; önce iki cümle kur, sonra yarı resmi bir şikâyet mektubu yaz.",
    minutes: 12,
    gloss: [
      { de: "die Lieferung", tr: "teslimat" },
      { de: "beschädigt", tr: "hasarlı" },
      { de: "der Kratzer", tr: "çizik" },
      { de: "das Scharnier", tr: "menteşe" },
      { de: "zusichern", tr: "söz vermek, taahhüt etmek" },
      { de: "die Nachfrage", tr: "sorma, üsteleme" },
      { de: "die Frist", tr: "süre, mühlet" },
      { de: "erstatten", tr: "iade etmek (para)" },
      { de: "vom Kauf zurücktreten", tr: "satın almadan cayma" },
      { de: "einschalten", tr: "devreye sokmak (kurumu)" },
      { de: "einwandfrei", tr: "kusursuz" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Sipariş edilen dolap bana hasarlı bir durumda teslim edildi.",
        answer: "Der bestellte Schrank wurde mir in beschädigtem Zustand geliefert.",
        alternatives: [
          "Mir wurde der bestellte Schrank in beschädigtem Zustand geliefert.",
        ],
        hint: "Partizip II sıfat olarak: „der bestellte Schrank“; Passiv Präteritum: „wurde … geliefert“.",
      },
      {
        kind: "build",
        tr: "Sizden hasarın derhal giderilmesini ya da satış bedelinin iadesini rica ediyorum.",
        answer:
          "Ich bitte Sie um die umgehende Behebung des Schadens oder die Rückerstattung des Kaufpreises.",
        hint: "„bitten um“ + Akkusativ; resmi dilde isimleştirme: „die Behebung“, „die Rückerstattung“.",
      },
      {
        kind: "free",
        prompt:
          "Mobilya mağazasına yarı resmi bir şikâyet mektubu yaz: Siparişini somut bilgilerle tanıt (tarih, sipariş numarası), hasarı anlat, müşteri hizmetlerinin dönmediğini belirt, net bir talep ve süre koy.",
        checklist: [
          "Resmi hitap ve kapanış kalıplarını kullan (Sehr geehrte Damen und Herren / Mit freundlichen Grüßen).",
          "Sorunu somut ayrıntılarla anlat: sipariş numarası, tarihler, hasarın türü.",
          "Daha önce ne yaptığını ve firmadan yanıt alamadığını belirt.",
          "Net bir talep formüle et ve bir süre (Frist) koy.",
          "Kararlı ama kibar bir ton kullan; tehditleri „sehe ich mich gezwungen“ gibi kalıplarla yumuşat.",
        ],
        minWords: 100,
        phrases: [
          { de: "Ich wende mich an Sie, weil …", tr: "Size şu nedenle başvuruyorum…" },
          { de: "Leider musste ich feststellen, dass …", tr: "Maalesef şunu tespit ettim ki…" },
          { de: "Trotz mehrmaliger Nachfrage", tr: "Defalarca sormama rağmen" },
          { de: "Ich fordere Sie auf, …", tr: "Sizden … talep ediyorum" },
          { de: "Ich setze Ihnen eine Frist bis zum …", tr: "Size … tarihine kadar süre veriyorum" },
          { de: "Andernfalls sehe ich mich gezwungen, …", tr: "Aksi halde … zorunda kalacağım" },
          { de: "den Kaufpreis in voller Höhe erstatten", tr: "satış bedelini tam olarak iade etmek" },
          { de: "Ich erwarte Ihre Rückmeldung", tr: "Dönüşünüzü bekliyorum" },
          { de: "die Verbraucherzentrale einschalten", tr: "tüketici merkezini devreye sokmak" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\nam 12. Juli habe ich in Ihrem Onlineshop einen Kleiderschrank mit der Bestellnummer 58231 bestellt. Die Lieferung erfolgte am 28. Juli, allerdings musste ich beim Auspacken feststellen, dass die linke Tür einen tiefen Kratzer aufweist und ein Scharnier fehlt.\n\nBereits am Tag der Lieferung habe ich Ihren Kundenservice telefonisch informiert. Mir wurde zugesichert, dass sich ein Mitarbeiter innerhalb von drei Werktagen melden würde. Trotz mehrmaliger Nachfrage per E-Mail ist dies bis heute nicht geschehen, was ich äußerst ärgerlich finde.\n\nIch fordere Sie daher auf, mir bis zum 20. August kostenlos eine einwandfreie Ersatztür samt Scharnier zu liefern oder den Kaufpreis in voller Höhe zu erstatten. Sollte ich bis zu diesem Termin keine Rückmeldung erhalten, sehe ich mich gezwungen, vom Kauf zurückzutreten und die Verbraucherzentrale einzuschalten.\n\nMit freundlichen Grüßen\nDeniz Aydın",
      },
    ],
  },
  {
    id: "b2-w3",
    level: "B2",
    skill: "writing",
    title: "Leserbrief: Autofreie Innenstadt – ja oder nein?",
    genre: "Okur mektubu",
    intro:
      "Yerel gazete, şehir merkezinin hafta sonları trafiğe kapatılacağını yazdı; önce iki cümle kur, sonra gazeteye bir okur mektubu yaz.",
    minutes: 13,
    gloss: [
      { de: "die Sperrung", tr: "kapatma, trafiğe kapama" },
      { de: "der Einzelhandel", tr: "perakende sektörü, esnaf" },
      { de: "die Umsatzeinbuße", tr: "ciro kaybı" },
      { de: "der Beschluss", tr: "karar" },
      { de: "die Aufenthaltsqualität", tr: "mekânda vakit geçirme kalitesi" },
      { de: "übersehen", tr: "gözden kaçırmak" },
      { de: "sich ausgleichen", tr: "dengelenmek" },
      { de: "die Umsetzung", tr: "uygulama" },
      { de: "das Stückwerk", tr: "yarım yamalak iş" },
      { de: "profitieren von", tr: "(bir şeyden) yarar sağlamak" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Şehir merkezinin araç trafiğine kapatılması yıllardır hararetle tartışılıyor.",
        answer:
          "Die Sperrung der Innenstadt für den Autoverkehr wird seit Jahren heftig diskutiert.",
        alternatives: [
          "Seit Jahren wird die Sperrung der Innenstadt für den Autoverkehr heftig diskutiert.",
        ],
        hint: "Passiv Präsens: „wird … diskutiert“; isimleştirme: „die Sperrung der Innenstadt“.",
      },
      {
        kind: "build",
        tr: "Toplu taşıma genişletilmediği sürece böyle bir yasak hayata geçirilemez.",
        answer:
          "Solange der öffentliche Nahverkehr nicht ausgebaut wird, lässt sich ein solches Verbot nicht umsetzen.",
        alternatives: [
          "Ein solches Verbot lässt sich nicht umsetzen, solange der öffentliche Nahverkehr nicht ausgebaut wird.",
        ],
        hint: "„solange“ yan cümlesi fiili sona atar; „sich umsetzen lassen“ = „uygulanabilir olmak“ (edilgen olanak).",
      },
      {
        kind: "free",
        prompt:
          "Gazetedeki habere bir okur mektubu yaz: Karara ilişkin görüşünü belirt, esnafın itirazını tartıp kendi argümanlarını geliştir ve somut bir öneriyle bitir.",
        stimulus:
          "Aus dem Stadtanzeiger vom 2. August: Der Stadtrat plant, die Innenstadt ab dem kommenden Jahr an Wochenenden für den privaten Autoverkehr zu sperren. Während Umweltverbände den Beschluss begrüßen, warnt der Einzelhandel vor erheblichen Umsatzeinbußen.",
        checklist: [
          "Habere atıfla başla (hangi haber, hangi konu).",
          "Kendi konumunu net biçimde ortaya koy.",
          "Esnafın ciro endişesini ciddiye alıp karşı argümanla dengele.",
          "Uygulamaya dönük somut bir öneri getir.",
          "Okur mektubu üslubunu koru: kişisel ama saygılı, iyi yapılandırılmış.",
        ],
        minWords: 110,
        phrases: [
          { de: "Mit großem Interesse habe ich Ihren Artikel gelesen", tr: "Yazınızı büyük ilgiyle okudum" },
          { de: "Ich teile die Auffassung, dass …", tr: "…görüşüne katılıyorum" },
          { de: "Es steht außer Frage, dass …", tr: "…olduğu tartışma götürmez" },
          { de: "Dabei wird übersehen, dass …", tr: "Burada gözden kaçırılan şu ki…" },
          { de: "Zwar …, jedoch …", tr: "Gerçi…, ancak…" },
          { de: "Entscheidend ist aus meiner Sicht …", tr: "Bana göre belirleyici olan…" },
          { de: "Abschließend möchte ich vorschlagen, …", tr: "Son olarak şunu önermek isterim…" },
          { de: "Davon würden beide Seiten profitieren", tr: "Bundan iki taraf da kazançlı çıkardı" },
        ],
        sample:
          "Mit großem Interesse habe ich Ihren Artikel über die geplante autofreie Innenstadt gelesen. Als Anwohnerin der Fußgängerzone begrüße ich den Beschluss des Stadtrats ausdrücklich. Es steht außer Frage, dass weniger Autoverkehr die Luftqualität verbessert und die Aufenthaltsqualität erhöht – das zeigen Städte wie Gent oder Pontevedra seit Jahren.\n\nDie Sorgen des Einzelhandels nehme ich dennoch ernst. Dabei wird allerdings übersehen, dass Kundinnen und Kunden, die zu Fuß oder mit dem Rad kommen, nach mehreren Untersuchungen sogar häufiger einkaufen als Autofahrer. Zwar mag der Umsatz in der Anfangszeit leicht zurückgehen, jedoch dürfte sich dieser Effekt ausgleichen, sobald die Innenstadt attraktiver wird.\n\nEntscheidend ist aus meiner Sicht die Umsetzung: Ohne zusätzliche Busverbindungen und sichere Radwege bleibt der Plan Stückwerk. Abschließend möchte ich deshalb vorschlagen, die Sperrung mit einem kostenlosen Wochenendticket für Busse und Bahnen zu verbinden. Davon würden Handel und Umwelt gleichermaßen profitieren.",
      },
    ],
  },
  {
    id: "b2-w4",
    level: "B2",
    skill: "writing",
    title: "Forumsbeitrag: Homeoffice – Fluch oder Segen?",
    genre: "Forum yorumu",
    intro:
      "Bir kariyer forumunda „evden mi ofisten mi?“ tartışması dönüyor; önce iki cümle kur, sonra kendi deneyimlerinle dengeli bir yorum yaz.",
    minutes: 11,
    gloss: [
      { de: "der Wegfall", tr: "ortadan kalkma" },
      { de: "das Pendeln", tr: "işe gidiş geliş" },
      { de: "unterbrechen", tr: "bölmek, kesmek" },
      { de: "die Schattenseite", tr: "olumsuz yan" },
      { de: "der Austausch", tr: "fikir alışverişi" },
      { de: "Anschluss finden", tr: "ortama uyum sağlamak, kaynaşmak" },
      { de: "ineinander übergehen", tr: "iç içe geçmek" },
      { de: "sich bewähren", tr: "kendini kanıtlamak, işe yaradığı görülmek" },
      { de: "vereinbaren", tr: "kararlaştırmak" },
      { de: "erreichbar", tr: "ulaşılabilir" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Evden çalışma imkânı birçok çalışan tarafından büyük bir kazanım olarak görülüyor.",
        answer:
          "Die Möglichkeit des Homeoffice wird von vielen Beschäftigten als großer Gewinn angesehen.",
        alternatives: [
          "Von vielen Beschäftigten wird die Möglichkeit des Homeoffice als großer Gewinn angesehen.",
        ],
        hint: "Passiv + eylemi yapan: „wird von vielen Beschäftigten … angesehen“; „ansehen als“ kalıbı.",
      },
      {
        kind: "build",
        tr: "İş ile özel hayat arasındaki sınırın giderek bulanıklaşmasından endişe ediyorum.",
        answer:
          "Ich befürchte, dass die Grenze zwischen Arbeit und Privatleben zunehmend verschwimmt.",
        hint: "„befürchten, dass“ yan cümlesi; „verschwimmen“ = bulanıklaşmak, „zunehmend“ = giderek.",
      },
      {
        kind: "free",
        prompt:
          "Forumdaki soruya bir yorum yaz: Evden mi yoksa ofisten mi çalışmayı tercih ediyorsun? Kendi deneyiminden örnekler ver, iki tarafın artılarını ve eksilerini tart, sonunda bir öneride bulun.",
        stimulus:
          "Frage von Elif_M im Karriereforum: Mein neuer Arbeitgeber lässt mir die Wahl zwischen Homeoffice und Büro. Ich kann mich nicht entscheiden. Wie arbeitet ihr lieber, und was sind eure Erfahrungen?",
        checklist: [
          "Sorudan yola çıkarak kendi deneyimini tanıt.",
          "Evden çalışmanın en az iki artısını somut örnekle anlat.",
          "En az iki olumsuz yanına da değin (Schattenseiten).",
          "Dengeli bir sonuca ve uygulanabilir bir öneriye ulaş.",
          "B2 bağlaçlarını çeşitlendir: allerdings, hinzu kommt, aus meiner Sicht.",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich möchte meine Erfahrungen teilen", tr: "Deneyimlerimi paylaşmak istiyorum" },
          { de: "Ein großer Vorteil besteht darin, dass …", tr: "Büyük bir avantaj şudur ki…" },
          { de: "Allerdings hat die Sache auch Schattenseiten", tr: "Ancak işin olumsuz yanları da var" },
          { de: "Hinzu kommt, dass …", tr: "Buna ek olarak…" },
          { de: "Aus meiner Sicht", tr: "Benim açımdan" },
          { de: "Die Lösung liegt in …", tr: "Çözüm …'dadır" },
          { de: "Es hat sich bewährt, dass …", tr: "…'nın işe yaradığı görüldü" },
          { de: "rund um die Uhr erreichbar sein", tr: "günün her saati ulaşılabilir olmak" },
        ],
        sample:
          "Diese Frage beschäftigt unser Team seit Monaten, deshalb möchte ich meine Erfahrungen teilen. Ich arbeite seit drei Jahren überwiegend im Homeoffice und möchte die Vorteile nicht mehr missen: Der Wegfall des Pendelns spart mir täglich fast zwei Stunden, und konzentrierte Aufgaben erledige ich zu Hause deutlich schneller, weil ich seltener unterbrochen werde.\n\nAllerdings hat die Sache auch Schattenseiten. Der spontane Austausch mit den Kolleginnen und Kollegen fehlt mir, und gerade neue Teammitglieder tun sich schwer, Anschluss zu finden. Hinzu kommt die Gefahr, dass Arbeit und Freizeit ineinander übergehen – anfangs habe ich abends deutlich zu lange am Schreibtisch gesessen.\n\nAus meiner Sicht liegt die Lösung in einer klugen Mischung: zwei feste Bürotage für Besprechungen und Teamarbeit, der Rest flexibel von zu Hause. Wichtig ist dabei, klare Regeln zu vereinbaren, damit niemand rund um die Uhr erreichbar sein muss.",
      },
    ],
  },
];
