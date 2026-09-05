import type { SkillExercise } from "../types";
import { b2U01 } from "./b2-u01";
import { b2U02 } from "./b2-u02";
import { b2U03 } from "./b2-u03";
import { b2U04 } from "./b2-u04";
import { b2U05 } from "./b2-u05";
import { b2U06 } from "./b2-u06";
import { b2U07 } from "./b2-u07";
import { b2U08 } from "./b2-u08";
import { b2U09 } from "./b2-u09";
import { b2U10 } from "./b2-u10";
import { b2U11 } from "./b2-u11";
import { b2U12 } from "./b2-u12";
import { b2U13 } from "./b2-u13";
import { b2U14 } from "./b2-u14";

/**
 * B2 — okuma, dinleme ve yazma egzersizleri.
 *
 * Ünite dosyaları listenin BAŞINDA durur. buildTrack havuzları liste sırasıyla
 * imleçle tüketiyor (unit etiketine bakmıyor), yani ilk 50 yuvayı ünite hizalı
 * içerik kapar; aşağıdaki eski 32 egzersiz 50. yuvanın ötesine düşer. Silinmez
 * ve kimlikleri değişmez — user_skills birincil anahtarı (user_id, exercise_id)
 * ve canlı ilerleme onlara bağlı.
 */
export const b2: SkillExercise[] = [
  ...b2U01,
  ...b2U02,
  ...b2U03,
  ...b2U04,
  ...b2U05,
  ...b2U06,
  ...b2U07,
  ...b2U08,
  ...b2U09,
  ...b2U10,
  ...b2U11,
  ...b2U12,
  ...b2U13,
  ...b2U14,
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
      { de: "die Erhebung", tr: "araştırma", en: "survey" },
      { de: "die Bequemlichkeit", tr: "rahatlık", en: "convenience" },
      { de: "die Abhängigkeit", tr: "bağımlılık", en: "dependence" },
      { de: "abwägen", tr: "ölçüp biçmek", en: "to weigh up" },
      { de: "umschlagen in", tr: "dönüşmek", en: "to turn into" },
      { de: "offenlegen", tr: "açıklamak", en: "to disclose" },
      { de: "die Kennzeichnungspflicht", tr: "etiketleme zorunluluğu", en: "labelling requirement" },
      { de: "der Verzicht", tr: "vazgeçme", en: "giving up" },
      { de: "vermitteln", tr: "aktarmak", en: "to convey" },
      { de: "unbestritten", tr: "tartışmasız", en: "undisputed" },
      { de: "zugeschnitten auf", tr: "uyarlanmış", en: "tailored to" },
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
      { de: "die Wärmepumpe", tr: "ısı pompası", en: "heat pump" },
      { de: "das Erdreich", tr: "toprak", en: "ground" },
      { de: "entziehen", tr: "çekmek", en: "to extract" },
      { de: "die Anschaffung", tr: "satın alma", en: "purchase" },
      { de: "gedämmt", tr: "yalıtılmış", en: "insulated" },
      { de: "sanieren", tr: "elden geçirmek", en: "to renovate" },
      { de: "die Betriebskosten", tr: "işletme giderleri", en: "operating costs" },
      { de: "einwenden", tr: "itiraz etmek", en: "to object" },
      { de: "die Stückzahl", tr: "adet", en: "quantity" },
      { de: "die Vorgabe", tr: "şart", en: "requirement" },
      { de: "hinauslaufen auf", tr: "sonuçta bir şeye varmak", en: "to amount to" },
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
      { de: "das Auslaufmodell", tr: "modası geçen model", en: "obsolete model" },
      { de: "die Anwesenheitspflicht", tr: "ofiste bulunma zorunluluğu", en: "attendance requirement" },
      { de: "die Entgrenzung", tr: "sınırların silinmesi", en: "blurring of boundaries" },
      { de: "abschalten", tr: "kafa dağıtmak", en: "to unwind" },
      { de: "die Erreichbarkeit", tr: "ulaşılabilirlik", en: "availability" },
      { de: "erfassen", tr: "kaydetmek", en: "to record" },
      { de: "die Führungskraft", tr: "yönetici", en: "manager" },
      { de: "die Stechuhr", tr: "puantaj saati", en: "time clock" },
      { de: "die Befragung", tr: "anket", en: "survey" },
      { de: "Grenzen ziehen", tr: "sınır koymak", en: "to set boundaries" },
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
      { de: "der Elektroschrott", tr: "elektronik atık", en: "electronic waste" },
      { de: "der Bruchteil", tr: "küçük bir kısım", en: "fraction" },
      { de: "überfällig", tr: "çoktan gecikmiş", en: "overdue" },
      { de: "der Hersteller", tr: "üretici", en: "manufacturer" },
      { de: "das Ersatzteil", tr: "yedek parça", en: "spare part" },
      { de: "zu kurz greifen", tr: "yetersiz kalmak", en: "to fall short" },
      { de: "langlebig", tr: "uzun ömürlü", en: "durable" },
      { de: "die Nutzungsdauer", tr: "kullanım süresi", en: "service life" },
      { de: "sich rechnen", tr: "kârlı olmak", en: "to pay off" },
      { de: "die Umsetzung", tr: "uygulama", en: "implementation" },
      { de: "erproben", tr: "sınamak", en: "to test out" },
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
      { de: "die Vielfalt", tr: "çeşitlilik", en: "diversity" },
      { de: "aufwachsen", tr: "büyümek", en: "to grow up" },
      { de: "die Annahme", tr: "varsayım", en: "assumption" },
      { de: "die Förderung", tr: "destek", en: "support" },
      { de: "flächendeckend", tr: "her yeri kapsayan", en: "across the board" },
      { de: "die Herkunftssprache", tr: "köken dili", en: "heritage language" },
      { de: "einbeziehen", tr: "dahil etmek", en: "to include" },
      { de: "der Handlungsbedarf", tr: "harekete geçme gereği", en: "need for action" },
      { de: "die Lehrkraft", tr: "öğretmen", en: "teacher" },
      { de: "heterogen", tr: "heterojen", en: "heterogeneous" },
      { de: "verpflichtend", tr: "zorunlu", en: "mandatory" },
      { de: "die Fortbildung", tr: "mesleki eğitim", en: "further training" },
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
      { de: "die Umgestaltung", tr: "yeniden düzenleme", en: "redesign" },
      { de: "der Anwohner", tr: "mahalle sakini", en: "local resident" },
      { de: "die Verkehrsberuhigung", tr: "trafiği yavaşlatma", en: "traffic calming" },
      { de: "die Höchstgeschwindigkeit", tr: "azami hız", en: "maximum speed" },
      { de: "überschreiten", tr: "aşmak", en: "to exceed" },
      { de: "die Maßnahme", tr: "önlem", en: "measure" },
      { de: "verengen", tr: "daraltmak", en: "to narrow" },
      { de: "entfallen", tr: "kalkmak", en: "to be dropped" },
      { de: "gewährleisten", tr: "güvence altına almak", en: "to ensure" },
      { de: "die Zufahrt", tr: "araç girişi", en: "access" },
      { de: "vergünstigt", tr: "indirimli", en: "discounted" },
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
  // ── Hikâye dizisi: Gazeteci Nora bir ihbarı araştırıyor. B2'nin yeni
  //    alıştırmalarında ihbar → görüşme → şirketin cevabı → yazı sırası izlenir.
  {
    id: "b2-r7",
    level: "B2",
    skill: "reading",
    title: "Ein anonymer Hinweis",
    genre: "E-posta",
    intro:
      "Bir yerel gazetenin haber merkezine gelen isimsiz ihbar. Gazeteci Nora'nın araştırması buradan başlıyor.",
    gloss: [
      { de: "der Hinweis", tr: "ihbar", en: "tip-off" },
      { de: "anonym", tr: "anonim", en: "anonymous" },
      { de: "die Leiharbeit", tr: "kiralık işçilik", en: "agency work" },
      { de: "die Schicht", tr: "vardiya", en: "shift" },
      { de: "die Pause", tr: "mola", en: "break" },
      { de: "der Vorwurf", tr: "suçlama", en: "accusation" },
      { de: "belegen", tr: "kanıtlamak", en: "to substantiate" },
      { de: "die Kündigung", tr: "işten çıkarma", en: "termination" },
      { de: "sich melden", tr: "iletişime geçmek", en: "to get in touch" },
    ],
    minutes: 6,
    text:
      "Betreff: Bitte lesen Sie das\n\nSehr geehrte Frau Weiß,\n\nich schreibe Ihnen anonym und ich weiß, dass das den Wert meiner Aussage senkt. Bitte lesen Sie trotzdem weiter.\n\nIch arbeite seit vier Jahren im Logistikzentrum Nordkamp, über eine Leihfirma. Offiziell haben wir dieselben Rechte wie die Festangestellten. In der Praxis läuft es anders.\n\nUnsere Schichten werden mit 7,5 Stunden geplant, aber die Zeit zum Umziehen und zum Weg zur Halle zählt nicht — das sind täglich rund 25 Minuten, die niemand bezahlt. Wer sich beschwert, bekommt im nächsten Monat weniger Schichten. Nicht null, nur weniger. Das lässt sich nie beweisen, aber jeder kennt zwei, drei Namen, bei denen es passiert ist.\n\nIch kann Ihnen Schichtpläne von sechs Monaten schicken. Namen sind darauf, deshalb müsste ich sie vorher schwärzen. Was ich nicht kann: mit Ihnen unter meinem Namen sprechen. Ich habe zwei Kinder, und meine Verlängerung wird im März entschieden.\n\nWenn Sie das für zu dünn halten, verstehe ich es. Aber vielleicht fragen Sie einmal nach, wie viele Leiharbeiter dort im letzten Jahr keine Verlängerung bekommen haben — und wann sie sich vorher beschwert haben.\n\nMit freundlichen Grüßen\nEine Mitarbeiterin",
    questions: [
      {
        text: "Was ist der zentrale Vorwurf?",
        options: [
          "Umkleide- und Wegzeiten werden nicht bezahlt",
          "Die Löhne sind zu niedrig",
          "Die Hallen sind zu kalt",
        ],
        answer: 0,
        explain: "Günde yaklaşık 25 dakika üstünü değiştirme ve yürüme süresi ödenmiyor.",
      },
      {
        text: "Was passiert laut Schreiben mit Menschen, die sich beschweren?",
        options: [
          "Sie bekommen weniger Schichten, nicht null",
          "Sie werden sofort gekündigt",
          "Sie werden versetzt",
        ],
        answer: 0,
        explain:
          "„Nicht null, nur weniger. Das lässt sich nie beweisen“ — kanıtlanamaz olması iddianın parçası.",
      },
      {
        text: "Warum schreibt die Person anonym?",
        options: [
          "Ihre Verlängerung wird im März entschieden",
          "Sie kennt die Journalistin nicht",
          "Sie hat keine Beweise",
        ],
        answer: 0,
        explain: "İki çocuğu var ve sözleşme uzatması mart ayında karara bağlanacak.",
      },
      {
        text: "Was bietet sie an?",
        options: [
          "Schichtpläne von sechs Monaten, mit geschwärzten Namen",
          "Ein Interview mit Namen",
          "Fotos aus der Halle",
        ],
        answer: 0,
        explain: "İsimleri karartarak altı aylık vardiya planlarını gönderebiliyor.",
      },
      {
        text: "Welche Recherche schlägt sie vor?",
        options: [
          "Wie viele Leiharbeiter keine Verlängerung bekamen — und wann sie sich beschwert hatten",
          "Die Löhne mit anderen Firmen zu vergleichen",
          "Die Halle zu besichtigen",
        ],
        answer: 0,
        explain: "İki veriyi yan yana koymayı öneriyor: uzatılmayanlar ve şikâyet tarihleri.",
      },
    ],
  },
  {
    id: "b2-r8",
    level: "B2",
    skill: "reading",
    title: "Kündigung: Was wirklich gilt",
    genre: "Rehber",
    intro:
      "Almanya'da iş güvencesinin nasıl işlediğini anlatan bir rehber yazı — çoğu kişinin yanlış bildiği konu.",
    gloss: [
      { de: "der Kündigungsschutz", tr: "iş güvencesi", en: "protection against dismissal" },
      { de: "die Abmahnung", tr: "yazılı uyarı", en: "formal warning" },
      { de: "betriebsbedingt", tr: "işletme gereği", en: "for operational reasons" },
      { de: "verhaltensbedingt", tr: "davranış nedeniyle", en: "for conduct reasons" },
      { de: "die Sozialauswahl", tr: "sosyal seçim", en: "social selection", note: "Kimin çıkarılacağı yaşa, kıdeme ve bakmakla yükümlü olunanlara göre belirlenir." },
      { de: "die Klage", tr: "dava", en: "lawsuit" },
      { de: "die Abfindung", tr: "kıdem tazminatı", en: "severance pay" },
      { de: "die Frist", tr: "son tarih", en: "deadline" },
    ],
    minutes: 7,
    text:
      "Der wichtigste Satz zuerst: In Betrieben mit mehr als zehn Beschäftigten und nach sechs Monaten im Job gilt der Kündigungsschutz. Ein Arbeitgeber kann dann nicht einfach kündigen, weil ihm jemand nicht passt — er braucht einen Grund, den ein Gericht akzeptiert.\n\nEs gibt drei zulässige Gründe. Personenbedingt heißt meist längere Krankheit. Verhaltensbedingt bedeutet, dass jemand Regeln verletzt — hier ist fast immer eine Abmahnung nötig, und zwar für genau dasselbe Verhalten. Betriebsbedingt heißt, dass der Arbeitsplatz wegfällt. In diesem Fall muss der Arbeitgeber eine Sozialauswahl treffen: Alter, Betriebszugehörigkeit, Unterhaltspflichten und Schwerbehinderung entscheiden, wer bleibt — nicht die Leistung.\n\nDer zweite wichtige Punkt ist die Frist. Wer gegen eine Kündigung vorgehen will, hat dafür drei Wochen ab Zugang des Schreibens. Diese Frist ist hart: Danach gilt die Kündigung als wirksam, auch wenn sie rechtswidrig war.\n\nEin verbreiteter Irrtum betrifft die Abfindung. Es gibt keinen allgemeinen Anspruch darauf. In der Praxis wird sie trotzdem oft gezahlt — nicht aus Freundlichkeit, sondern weil ein Prozess für den Arbeitgeber teuer und unsicher ist. Deshalb ist die Klage in vielen Fällen weniger ein Kampf um den Arbeitsplatz als eine Verhandlung über Geld.\n\nWer eine Kündigung erhält, sollte zwei Dinge sofort tun: sich innerhalb von drei Tagen bei der Agentur für Arbeit melden und die Frist im Kalender markieren. Alles andere kann warten.",
    questions: [
      {
        text: "Wann gilt der Kündigungsschutz?",
        options: [
          "Ab elf Beschäftigten und nach sechs Monaten",
          "Immer, ab dem ersten Tag",
          "Nur bei unbefristeten Verträgen",
        ],
        answer: 0,
        explain: "„mehr als zehn Beschäftigten und nach sechs Monaten im Job“.",
      },
      {
        text: "Was ist bei einer verhaltensbedingten Kündigung fast immer nötig?",
        options: [
          "Eine Abmahnung für dasselbe Verhalten",
          "Eine Sozialauswahl",
          "Eine Abfindung",
        ],
        answer: 0,
        explain: "Uyarı, aynı davranış için verilmiş olmalı.",
      },
      {
        text: "Was entscheidet bei einer betriebsbedingten Kündigung, wer geht?",
        options: [
          "Alter, Betriebszugehörigkeit, Unterhaltspflichten, Schwerbehinderung",
          "Die Leistung",
          "Das Gehalt",
        ],
        answer: 0,
        explain: "Sosyal kriterler belirleyici — performans değil.",
      },
      {
        text: "Was passiert nach Ablauf der Drei-Wochen-Frist?",
        options: [
          "Die Kündigung gilt, auch wenn sie rechtswidrig war",
          "Die Frist verlängert sich automatisch",
          "Man bekommt eine Abfindung",
        ],
        answer: 0,
        explain: "Metin bu süreyi „hart“ diye niteliyor.",
      },
      {
        text: "Warum wird trotzdem oft eine Abfindung gezahlt?",
        options: [
          "Weil ein Prozess für den Arbeitgeber teuer und unsicher ist",
          "Weil das Gesetz es verlangt",
          "Weil die Gewerkschaft es fordert",
        ],
        answer: 0,
        explain: "Genel bir tazminat hakkı yok; ödeme pratik bir hesaptan doğuyor.",
      },
    ],
  },
  {
    id: "b2-r9",
    level: "B2",
    skill: "reading",
    title: "Stolpersteine",
    genre: "Kültür",
    intro:
      "Alman şehirlerinde kaldırımlara gömülü küçük pirinç taşlar. Bu yazı, dünyanın en büyük anıtının neden merkezde değil ayaklarınızın altında olduğunu anlatıyor.",
    gloss: [
      { de: "der Stolperstein", tr: "tökezleme taşı", en: "stumbling stone", note: "Nazi kurbanlarının son evinin önüne kaldırıma gömülen anıt taşı." },
      { de: "das Denkmal", tr: "anıt", en: "monument" },
      { de: "die Erinnerung", tr: "anı", en: "memory" },
      { de: "verschleppen", tr: "zorla götürmek", en: "to abduct" },
      { de: "die Messingplatte", tr: "pirinç levha", en: "brass plate" },
      { de: "sich bücken", tr: "eğilmek", en: "to bend down" },
      { de: "der Widerstand", tr: "direniş", en: "resistance" },
      { de: "die Verlegung", tr: "döşeme", en: "laying" },
    ],
    minutes: 7,
    text:
      "Wer in einer deutschen Stadt auf den Boden schaut, findet sie irgendwann: kleine Messingplatten im Gehweg, zehn mal zehn Zentimeter. Darauf steht „Hier wohnte“, ein Name, ein Geburtsjahr — und was mit diesem Menschen geschah.\n\nDie Stolpersteine sind das größte dezentrale Denkmal der Welt. Über 100.000 liegen inzwischen in mehr als 30 Ländern. Der Künstler Gunter Demnig verlegt sie seit 1992, meist selbst, meist vor dem letzten frei gewählten Wohnort der Opfer des Nationalsozialismus.\n\nDie Idee dahinter ist genau durchdacht. Ein zentrales Denkmal besucht man — man fährt hin, steht davor, geht wieder. Ein Stolperstein dagegen liegt auf dem Weg zur Arbeit. Man begegnet ihm ohne Absicht. Und wer den Namen lesen will, muss sich bücken. Diese Geste ist Teil des Werks.\n\nEs gibt auch Widerstand. München erlaubt bis heute keine Verlegung auf öffentlichem Grund; die Israelitische Kultusgemeinde dort argumentiert, dass Namen von Ermordeten nicht mit Füßen getreten werden sollten. Andere kritisieren, dass Hausbesitzer die Verlegung verhindern können, weil sie Wertverlust fürchten.\n\nGerade dieser Streit gehört zum Denkmal. Es fragt nicht nur, wer damals verschwunden ist, sondern auch, wie eine Gesellschaft heute mit dieser Abwesenheit umgehen will — an ihrer eigenen Haustür.",
    questions: [
      {
        text: "Was steht auf einem Stolperstein?",
        options: [
          "„Hier wohnte“, Name, Geburtsjahr und das Schicksal der Person",
          "Nur ein Datum",
          "Ein Zitat des Künstlers",
        ],
        answer: 0,
        explain: "Metin bunu doğrudan sayıyor.",
      },
      {
        text: "Was ist der wichtigste Unterschied zu einem zentralen Denkmal?",
        options: [
          "Man begegnet ihm ohne Absicht, im Alltag",
          "Es ist größer",
          "Es ist teurer",
        ],
        answer: 0,
        explain: "Merkezî anıt ziyaret edilir; taş yolun üstündedir.",
      },
      {
        text: "Warum ist das Bücken Teil des Werks?",
        options: [
          "Wer den Namen lesen will, muss sich beugen",
          "Die Platte ist zu klein",
          "Es ist eine religiöse Regel",
        ],
        answer: 0,
        explain: "„Diese Geste ist Teil des Werks.“",
      },
      {
        text: "Wie argumentiert die Kritik aus München?",
        options: [
          "Namen von Ermordeten sollten nicht mit Füßen getreten werden",
          "Die Steine sind zu teuer",
          "Sie stören den Verkehr",
        ],
        answer: 0,
        explain: "Bu yüzden Münih kamusal alanda döşemeye izin vermiyor.",
      },
      {
        text: "Wie bewertet der Text den Streit?",
        options: [
          "Er gehört zum Denkmal selbst",
          "Er schadet dem Projekt",
          "Er ist unwichtig",
        ],
        answer: 0,
        explain:
          "Anıt yalnızca kimin kaybolduğunu değil, bugün bu yoklukla nasıl yaşandığını da soruyor.",
      },
    ],
  },
  {
    id: "b2-r10",
    level: "B2",
    skill: "reading",
    title: "Vier Meinungen zuordnen",
    genre: "Sınav formatı",
    intro:
      "B2 sınavının tipik görevi: aynı konuda dört görüş, sonra „kim ne diyor?“ soruları. Görüşler kısmen örtüşür — fark ayrıntıda.",
    gloss: [
      { de: "die Vier-Tage-Woche", tr: "dört günlük çalışma haftası", en: "four-day week" },
      { de: "die Produktivität", tr: "üretkenlik", en: "productivity" },
      { de: "die Belastung", tr: "yük", en: "burden" },
      { de: "der Ausgleich", tr: "denge", en: "counterbalance" },
      { de: "skeptisch", tr: "şüpheci", en: "skeptical" },
      { de: "die Branche", tr: "sektör", en: "sector" },
      { de: "verdichten", tr: "yoğunlaştırmak", en: "to compress" },
    ],
    minutes: 6,
    text:
      "Thema: Sollte die Vier-Tage-Woche zum Standard werden?\n\nANNIKA (Softwareentwicklerin): Wir haben es zwei Jahre gemacht, bei vollem Lohn. Die Produktivität ist nicht gefallen — sie ist leicht gestiegen. Der Grund ist banal: Wir haben aufgehört, sinnlose Meetings zu machen. Aber ich sage bewusst „wir“. Ich sitze am Rechner. In der Pflege ist meine Erfahrung wertlos.\n\nBERND (Pflegedienstleiter): Genau das ist mein Punkt. Bei uns kann man Arbeit nicht verdichten — ein Mensch braucht die Zeit, die er braucht. Vier Tage würden bedeuten: mehr Personal. Das gibt der Markt nicht her. Ich bin nicht dagegen, ich halte es bei uns schlicht für unmöglich.\n\nCLAUDIA (Unternehmerin, Handwerk): Ich bin skeptisch, aber aus einem anderen Grund. Meine Leute wollen das Geld, nicht den Tag. Als ich vier Tage angeboten habe, wollten drei von elf. Wir reden hier oft über die Wünsche von Akademikern und nennen das dann „die Beschäftigten“.\n\nDANIEL (Arbeitsforscher): Die Datenlage ist besser, als viele denken, aber sie ist eng. Fast alle Studien kommen aus Bürojobs und aus Betrieben, die freiwillig teilgenommen haben. Was wir sehen: weniger Krankmeldungen, gleiche Leistung. Was wir nicht wissen: ob das auch gilt, wenn ein Betrieb es nicht will.",
    questions: [
      {
        text: "Wer nennt einen konkreten Grund, warum die Produktivität nicht fiel?",
        options: ["Annika", "Bernd", "Daniel"],
        answer: 0,
        explain: "„Wir haben aufgehört, sinnlose Meetings zu machen.“",
      },
      {
        text: "Wer sagt, dass das Modell in seiner Branche nicht funktionieren kann?",
        options: ["Bernd", "Claudia", "Annika"],
        answer: 0,
        explain: "Bakım sektöründe iş sıkıştırılamaz — daha fazla personel gerekir.",
      },
      {
        text: "Wer kritisiert, über wen in dieser Debatte gesprochen wird?",
        options: ["Claudia", "Daniel", "Bernd"],
        answer: 0,
        explain:
          "„Wir reden hier oft über die Wünsche von Akademikern und nennen das dann ‚die Beschäftigten‘.“",
      },
      {
        text: "Wer weist auf eine methodische Grenze der Studien hin?",
        options: ["Daniel", "Annika", "Claudia"],
        answer: 0,
        explain: "Araştırmalar büro işlerinden ve gönüllü katılan işletmelerden geliyor.",
      },
      {
        text: "Wer ist ausdrücklich nicht grundsätzlich dagegen?",
        options: ["Bernd", "Claudia", "Niemand"],
        answer: 0,
        explain: "„Ich bin nicht dagegen, ich halte es bei uns schlicht für unmöglich.“",
      },
    ],
  },
  {
    id: "b2-r11",
    level: "B2",
    skill: "reading",
    title: "Die Stellungnahme der Firma",
    genre: "Basın açıklaması",
    intro:
      "Hikâyenin devamı: Nora sorularını gönderdi, şirket yazılı cevap verdi. Kurumsal dilin ne söylediğine ve neyi söylemediğine dikkat et.",
    gloss: [
      { de: "die Stellungnahme", tr: "açıklama", en: "statement" },
      { de: "die Unterstellung", tr: "asılsız suçlama", en: "insinuation" },
      { de: "entschieden zurückweisen", tr: "kesinlikle reddetmek", en: "to firmly reject" },
      { de: "die Rahmenbedingungen", tr: "genel koşullar", en: "general conditions" },
      { de: "der Dienstleister", tr: "hizmet sağlayıcı", en: "service provider" },
      { de: "gesetzeskonform", tr: "yasaya uygun", en: "legally compliant" },
      { de: "unabhängig", tr: "bağımsız", en: "independent" },
      { de: "die Fluktuation", tr: "personel devri", en: "staff turnover" },
    ],
    minutes: 6,
    text:
      "Stellungnahme der Nordkamp Logistik GmbH\n\nSehr geehrte Frau Weiß,\n\nzu Ihren Fragen nehmen wir wie folgt Stellung.\n\nDie Nordkamp Logistik GmbH hält sich an geltendes Recht. Sämtliche Arbeitszeiten werden gesetzeskonform erfasst und vergütet. Den Vorwurf, Mitarbeitende würden wegen einer Beschwerde benachteiligt, weisen wir entschieden zurück. Für derartige Unterstellungen liegen uns keine Belege vor.\n\nZur Frage nach den Umkleidezeiten: Die Rahmenbedingungen für Beschäftigte externer Dienstleister werden zwischen dem jeweiligen Dienstleister und seinen Mitarbeitenden geregelt. Diese Unternehmen sind eigenständige Arbeitgeber. Für deren Vertragsgestaltung sind wir nicht verantwortlich.\n\nZur Frage nach Vertragsverlängerungen: Über den Einsatz von Beschäftigten der Dienstleister entscheiden diese eigenständig, unter Berücksichtigung des jeweiligen Bedarfs. Zahlen zur Fluktuation externer Kräfte liegen uns nicht vor.\n\nWir bitten um Verständnis, dass wir zu einzelnen Personen grundsätzlich keine Auskunft geben.\n\nFür Rückfragen stehen wir gern zur Verfügung.\n\nMit freundlichen Grüßen\nUnternehmenskommunikation",
    questions: [
      {
        text: "Wie reagiert die Firma auf den Vorwurf der Benachteiligung?",
        options: [
          "Sie weist ihn zurück und verweist auf fehlende Belege",
          "Sie gibt ihn teilweise zu",
          "Sie kündigt eine Untersuchung an",
        ],
        answer: 0,
        explain: "„weisen wir entschieden zurück … liegen uns keine Belege vor.“",
      },
      {
        text: "Wie beantwortet sie die Frage nach den Umkleidezeiten?",
        options: [
          "Sie erklärt sich für nicht zuständig — das regeln die Dienstleister",
          "Sie bestätigt, dass die Zeit nicht bezahlt wird",
          "Sie sagt, die Zeit werde bezahlt",
        ],
        answer: 0,
        explain:
          "Sorunun kendisine değil, sorumluluğun kimde olduğuna cevap veriyor.",
      },
      {
        text: "Was sagt die Firma über Zahlen zur Fluktuation?",
        options: [
          "Sie lägen ihr nicht vor",
          "Sie seien normal",
          "Sie seien gesunken",
        ],
        answer: 0,
        explain: "„Zahlen zur Fluktuation externer Kräfte liegen uns nicht vor.“",
      },
      {
        text: "Welche Frage bleibt sachlich unbeantwortet?",
        options: [
          "Ob die Umkleidezeit tatsächlich bezahlt wird",
          "Wer die Stellungnahme geschrieben hat",
          "Ob es Leiharbeit gibt",
        ],
        answer: 0,
        explain:
          "Şirket „gesetzeskonform“ diyor ama söz konusu sürenin ödenip ödenmediğini söylemiyor.",
      },
      {
        text: "Was ist die Funktion des Satzes über einzelne Personen?",
        options: [
          "Er schließt Nachfragen zu konkreten Fällen aus",
          "Er schützt die Hinweisgeberin",
          "Er kündigt Transparenz an",
        ],
        answer: 0,
        explain: "Somut vakalara dair her soruyu peşinen kapatıyor.",
      },
    ],
  },
  {
    id: "b2-r12",
    level: "B2",
    skill: "reading",
    title: "Datenschutz am Arbeitsplatz",
    genre: "Rehber",
    intro:
      "İşveren neyi izleyebilir, neyi izleyemez? Çalışan haklarının en çok merak edilen alanı.",
    gloss: [
      { de: "der Datenschutz", tr: "veri koruma", en: "data protection" },
      { de: "die Überwachung", tr: "gözetim", en: "surveillance" },
      { de: "die Einwilligung", tr: "rıza", en: "consent" },
      { de: "verhältnismäßig", tr: "ölçülü", en: "proportionate" },
      { de: "der Betriebsrat", tr: "işçi konseyi", en: "works council" },
      { de: "protokollieren", tr: "kayda geçirmek", en: "to log" },
      { de: "der Verdacht", tr: "şüphe", en: "suspicion" },
      { de: "unzulässig", tr: "hukuka aykırı", en: "impermissible" },
    ],
    minutes: 6,
    text:
      "Darf der Arbeitgeber die E-Mails lesen? Die Antwort lautet fast immer: es kommt darauf an — und zwar auf drei Dinge.\n\nErstens auf den Zweck. Eine Maßnahme muss einem legitimen Ziel dienen, etwa der Sicherheit der IT-Systeme. „Wir wollen wissen, wie fleißig jemand ist“ ist kein solches Ziel.\n\nZweitens auf die Verhältnismäßigkeit. Selbst bei einem legitimen Zweck muss die Maßnahme das mildeste geeignete Mittel sein. Eine dauerhafte Videoüberwachung des Arbeitsplatzes ist deshalb praktisch immer unzulässig, eine Kamera am Wareneingang dagegen oft erlaubt. Bei einem konkreten Verdacht auf eine Straftat gelten andere Regeln — aber eben nur dann.\n\nDrittens auf die Beteiligung. Wo ein Betriebsrat existiert, muss er technischen Einrichtungen zustimmen, die Verhalten oder Leistung überwachen können. Das gilt auch für Software, die das nur nebenbei tut: Ein Projektmanagement-Tool, das jede Bearbeitungszeit protokolliert, fällt darunter.\n\nEin verbreiteter Irrtum betrifft die Einwilligung. Viele Arbeitgeber lassen sich eine Unterschrift geben und halten das Thema damit für erledigt. Im Arbeitsverhältnis ist eine Einwilligung aber nur wirksam, wenn sie wirklich freiwillig ist — und Freiwilligkeit setzt voraus, dass ein Nein keine Nachteile hat. Genau das lässt sich selten belegen.\n\nWer unsicher ist, kann sich an den Betriebsrat oder an die Datenschutzaufsicht des Bundeslandes wenden. Diese Beratung ist kostenlos und anonym möglich.",
    questions: [
      {
        text: "Welche drei Kriterien nennt der Text?",
        options: [
          "Zweck, Verhältnismäßigkeit, Beteiligung",
          "Kosten, Technik, Zeit",
          "Vertrag, Gesetz, Gericht",
        ],
        answer: 0,
        explain: "Metin bu üç başlığı sırayla açıyor.",
      },
      {
        text: "Warum ist dauerhafte Videoüberwachung fast immer unzulässig?",
        options: [
          "Sie ist nicht das mildeste geeignete Mittel",
          "Kameras sind zu teuer",
          "Sie ist technisch unmöglich",
        ],
        answer: 0,
        explain: "Ölçülülük ilkesi: en hafif uygun araç seçilmeli.",
      },
      {
        text: "Welche Software fällt unter die Mitbestimmung?",
        options: [
          "Auch Software, die Verhalten nur nebenbei protokolliert",
          "Nur reine Überwachungssoftware",
          "Keine Software",
        ],
        answer: 0,
        explain: "Her işlem süresini kaydeden proje aracı da buna dahil.",
      },
      {
        text: "Warum ist eine Unterschrift oft nicht genug?",
        options: [
          "Eine Einwilligung muss freiwillig sein — ein Nein darf keine Nachteile haben",
          "Sie muss notariell sein",
          "Sie gilt nur ein Jahr",
        ],
        answer: 0,
        explain: "İş ilişkisinde gönüllülük nadiren kanıtlanabiliyor.",
      },
      {
        text: "An wen kann man sich wenden?",
        options: [
          "Betriebsrat oder Datenschutzaufsicht des Bundeslandes",
          "Nur an einen Anwalt",
          "An das Arbeitsgericht",
        ],
        answer: 0,
        explain: "Danışma ücretsiz ve anonim olarak mümkün.",
      },
    ],
  },

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
      { de: "die Falschmeldung", tr: "yalan haber", en: "false report" },
      { de: "hereinfallen auf", tr: "kanmak", en: "to fall for" },
      { de: "auslösen", tr: "tetiklemek", en: "to trigger" },
      { de: "die Quelle", tr: "kaynak", en: "source" },
      { de: "weiterleiten", tr: "iletmek", en: "to forward" },
      { de: "unabhängig", tr: "bağımsız", en: "independent" },
      { de: "der Zusammenhang", tr: "bağlam", en: "context" },
      { de: "die Rückwärtssuche", tr: "tersine arama", en: "reverse search" },
      { de: "bewerten", tr: "değerlendirmek", en: "to assess" },
      { de: "der Beweis", tr: "kanıt", en: "proof" },
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
      { de: "der Bedarf", tr: "ihtiyaç", en: "need" },
      { de: "durchschlafen", tr: "kesintisiz uyumak", en: "to sleep through" },
      { de: "nachholen", tr: "telafi etmek", en: "to catch up on" },
      { de: "ausgleichen", tr: "dengelemek", en: "to balance out" },
      { de: "das Defizit", tr: "açık", en: "deficit" },
      { de: "verschieben", tr: "kaydırmak", en: "to shift" },
      { de: "unterdrücken", tr: "bastırmak", en: "to suppress" },
      { de: "das Schlafmittel", tr: "uyku ilacı", en: "sleeping pill" },
      { de: "abraten von", tr: "önermemek", en: "to advise against" },
      { de: "die Ursache", tr: "sebep", en: "cause" },
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
      { de: "der Wärmeinseleffekt", tr: "ısı adası etkisi", en: "heat island effect" },
      { de: "speichern", tr: "depolamak", en: "to store" },
      { de: "abgeben", tr: "salmak", en: "to release" },
      { de: "verdunsten", tr: "buharlaştırmak", en: "to evaporate" },
      { de: "die Begrünung", tr: "yeşillendirme", en: "greening" },
      { de: "die Fassade", tr: "cephe", en: "facade" },
      { de: "die Kanalisation", tr: "kanalizasyon", en: "sewer system" },
      { de: "überlasten", tr: "aşırı yüklemek", en: "to overload" },
      { de: "gegensteuern", tr: "karşı önlem almak", en: "to counteract" },
      { de: "die Mittel", tr: "ödenek", en: "funds" },
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
      { de: "das Pilotprojekt", tr: "pilot proje", en: "pilot project" },
      { de: "die Bilanz", tr: "bilanço", en: "overall result" },
      { de: "die Einschränkung", tr: "sınırlama", en: "limitation" },
      { de: "die Produktivität", tr: "üretkenlik", en: "productivity" },
      { de: "der Krankheitstag", tr: "hastalık izni günü", en: "sick day" },
      { de: "fortführen", tr: "sürdürmek", en: "to continue" },
      { de: "die Branche", tr: "sektör", en: "sector" },
      { de: "der Ablauf", tr: "işleyiş", en: "process" },
      { de: "streichen", tr: "kesmek", en: "to cut" },
      { de: "übertragen auf", tr: "genellemek", en: "to generalize" },
      { de: "flächendeckend", tr: "her yeri kapsayan", en: "across the board" },
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
      { de: "die Zuwanderung", tr: "göç", en: "immigration" },
      { de: "die Arbeitskraft", tr: "çalışan", en: "worker" },
      { de: "die Lücke", tr: "açık", en: "gap" },
      { de: "das Handwerk", tr: "zanaat sektörü", en: "craft sector" },
      { de: "der Auszubildende", tr: "çırak", en: "trainee" },
      { de: "das Verfahren", tr: "prosedür", en: "procedure" },
      { de: "die Anwerbung", tr: "işe alım", en: "recruitment" },
      { de: "die Anerkennung", tr: "tanınma", en: "recognition" },
      { de: "der Abschluss", tr: "diploma", en: "qualification" },
      { de: "abwandern", tr: "göç edip gitmek", en: "to emigrate" },
      { de: "gestalten", tr: "şekillendirmek", en: "to shape" },
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
      { de: "der Zahlungsverkehr", tr: "ödeme sistemi", en: "payment system" },
      { de: "das Zahlungsmittel", tr: "ödeme aracı", en: "means of payment" },
      { de: "die Barzahlung", tr: "nakit ödeme", en: "cash payment" },
      { de: "die Datenspur", tr: "veri izi", en: "data trail" },
      { de: "die Ausgaben", tr: "harcamalar", en: "expenses" },
      { de: "versagen", tr: "arıza yapmak", en: "to fail" },
      { de: "der Stromausfall", tr: "elektrik kesintisi", en: "power outage" },
      { de: "die Wahlfreiheit", tr: "seçme özgürlüğü", en: "freedom of choice" },
      { de: "die Bankfiliale", tr: "banka şubesi", en: "bank branch" },
      { de: "der Geldautomat", tr: "bankamatik", en: "ATM" },
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
    id: "b2-l7",
    level: "B2",
    skill: "listening",
    title: "Das Interview",
    genre: "Röportaj",
    intro:
      "Hikâyenin devamı: Nora, ihbarı yazan kişiyle konuşuyor. Gazetecinin nasıl soru sorduğuna ve neyi söz verdiğine dikkat et.",
    gloss: [
      { de: "der Quellenschutz", tr: "kaynak gizliliği", en: "source protection" },
      { de: "die Zusage", tr: "olumlu cevap", en: "acceptance" },
      { de: "nachvollziehbar", tr: "makul", en: "understandable" },
      { de: "die Aussage", tr: "ifade", en: "statement" },
      { de: "belastbar", tr: "sağlam", en: "solid" },
      { de: "abwägen", tr: "ölçüp biçmek", en: "to weigh up" },
      { de: "das Risiko", tr: "risk", en: "risk" },
      { de: "veröffentlichen", tr: "yayımlamak", en: "to publish" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Nora",
        text: "Danke, dass Sie gekommen sind. Bevor wir anfangen: Was Sie mir sagen, schützt der Quellenschutz. Ich nenne Ihren Namen nicht — auch nicht meiner Redaktion gegenüber, wenn Sie das wollen.",
      },
      { speaker: "Quelle", text: "Das will ich. Meine Chefin liest jede Zeile über die Firma." },
      {
        speaker: "Nora",
        text: "Verstanden. Dann zu den Schichtplänen. Ich sehe hier bei vier Personen einen deutlichen Rückgang ab November. Können Sie mir sagen, was diese vier gemeinsam haben?",
      },
      {
        speaker: "Quelle",
        text: "Alle vier waren im Oktober bei der Betriebsversammlung und haben etwas gesagt. Zwei zur Pausenregelung, zwei zu den Umkleidezeiten.",
      },
      { speaker: "Nora", text: "Waren Sie selbst dabei?" },
      { speaker: "Quelle", text: "Ja. Ich habe nichts gesagt. Deshalb habe ich noch meine Schichten." },
      {
        speaker: "Nora",
        text: "Das ist ein starker Satz. Ich muss trotzdem ehrlich sein: Vier Fälle sind ein Muster, aber kein Beweis. Es könnte auch am Bedarf liegen.",
      },
      {
        speaker: "Quelle",
        text: "Das sagt die Firma sicher auch. Aber im November wurden gleichzeitig sechs neue Leute eingestellt. Wenn der Bedarf fällt, stellt man nicht ein.",
      },
      {
        speaker: "Nora",
        text: "Das ist der Punkt, an dem die Geschichte belastbar wird. Können Sie das belegen?",
      },
      { speaker: "Quelle", text: "Die Einstellungen standen im internen Newsletter. Den habe ich." },
      {
        speaker: "Nora",
        text: "Gut. Dann sage ich Ihnen, wie es weitergeht: Ich frage die Firma schriftlich, und ich gebe ihr Zeit zu antworten. Erst danach entscheide ich, ob ich veröffentliche. Das kann drei Wochen dauern.",
      },
      { speaker: "Quelle", text: "Und wenn die Firma merkt, wer geredet hat?" },
      {
        speaker: "Nora",
        text: "Deshalb frage ich nach Dingen, die viele wissen — nicht nach Details, die nur Sie kennen können. Das Risiko wird dadurch kleiner. Null wird es nicht.",
      },
    ],
    questions: [
      {
        text: "Was sagt Nora am Anfang zu?",
        options: [
          "Quellenschutz — auch gegenüber der eigenen Redaktion",
          "Eine Bezahlung",
          "Eine schnelle Veröffentlichung",
        ],
        answer: 0,
        explain: "„Ich nenne Ihren Namen nicht — auch nicht meiner Redaktion gegenüber.“",
      },
      {
        text: "Was haben die vier Personen gemeinsam?",
        options: [
          "Sie haben bei der Betriebsversammlung etwas gesagt",
          "Sie sind neu in der Firma",
          "Sie arbeiten in derselben Halle",
        ],
        answer: 0,
        explain: "İkisi mola düzeni, ikisi üstünü değiştirme süresi hakkında konuşmuş.",
      },
      {
        text: "Warum reichen die vier Fälle Nora nicht?",
        options: [
          "Ein Muster ist noch kein Beweis — es könnte am Bedarf liegen",
          "Sie glaubt der Quelle nicht",
          "Vier ist eine zu kleine Zahl für die Redaktion",
        ],
        answer: 0,
        explain: "Gazeteci alternatif açıklamayı kendisi dile getiriyor.",
      },
      {
        text: "Welches Argument macht die Geschichte belastbar?",
        options: [
          "Gleichzeitig wurden sechs neue Leute eingestellt",
          "Die Quelle war selbst dabei",
          "Die Schichtpläne sind vollständig",
        ],
        answer: 0,
        explain: "İhtiyaç düşüyorsa yeni işe alım yapılmaz — bu, „Bedarf“ savunmasını zayıflatıyor.",
      },
      {
        text: "Wie will Nora das Risiko für die Quelle senken?",
        options: [
          "Sie fragt nach Dingen, die viele wissen",
          "Sie veröffentlicht sofort",
          "Sie nennt keine Zahlen",
        ],
        answer: 0,
        explain: "Yalnızca kaynağın bilebileceği ayrıntıları sormayarak — ama riski sıfırlamadan.",
      },
    ],
  },
  {
    id: "b2-l8",
    level: "B2",
    skill: "listening",
    title: "Gehaltsverhandlung",
    genre: "Görüşme",
    intro:
      "Maaş görüşmesi Almanca'nın en zor konuşmalarından biri: doğrudan olacaksın ama sertleşmeyeceksin.",
    gloss: [
      { de: "die Gehaltsverhandlung", tr: "maaş görüşmesi", en: "salary negotiation" },
      { de: "das Argument", tr: "argüman", en: "argument" },
      { de: "der Verantwortungsbereich", tr: "sorumluluk alanı", en: "area of responsibility" },
      { de: "die Marktüblichkeit", tr: "piyasa ortalaması", en: "market rate" },
      { de: "das Budget", tr: "bütçe", en: "budget" },
      { de: "die Perspektive", tr: "bakış açısı", en: "perspective" },
      { de: "einen Schritt zugehen", tr: "bir adım atmak", en: "to take a step toward someone" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Reuter", text: "Sie wollten über Ihr Gehalt sprechen. Schießen Sie los." },
      {
        speaker: "Yusuf",
        text: "Gern. Ich bin seit zwei Jahren hier. In der Zeit ist mein Bereich von zwei auf fünf Projekte gewachsen, und seit Januar bilde ich die neuen Kolleginnen ein. Mein Gehalt ist seit dem Eintritt unverändert.",
      },
      { speaker: "Frau Reuter", text: "Das stimmt. An welche Zahl denken Sie?" },
      {
        speaker: "Yusuf",
        text: "58.000. Marktüblich sind für diese Rolle 55 bis 62, und ich mache die Einarbeitung zusätzlich.",
      },
      {
        speaker: "Frau Reuter",
        text: "Ich sage Ihnen offen: 58 kann ich in diesem Jahr nicht zusagen. Das Budget ist bis März verteilt.",
      },
      { speaker: "Yusuf", text: "Was können Sie zusagen?" },
      {
        speaker: "Frau Reuter",
        text: "54.500 ab Juli. Und ich kann Ihnen etwas anderes anbieten: die Zertifizierung, über die wir im Herbst gesprochen haben. Die kostet 4.000 und zwei Wochen Arbeitszeit.",
      },
      {
        speaker: "Yusuf",
        text: "Die Zertifizierung interessiert mich, aber sie ersetzt kein Gehalt. Kann ich beides bekommen — 54.500 jetzt und eine feste Zusage für die 58 im nächsten Zyklus?",
      },
      {
        speaker: "Frau Reuter",
        text: "Eine feste Zusage über ein Jahr hinaus darf ich nicht geben. Was ich kann: Wir setzen im Januar einen Termin an, und ich halte im Protokoll fest, dass 58.000 das Ziel ist, wenn die Einarbeitung bei Ihnen bleibt.",
      },
      { speaker: "Yusuf", text: "Schriftlich?" },
      { speaker: "Frau Reuter", text: "Schriftlich. Das ist keine Garantie, aber es verschwindet nicht." },
      { speaker: "Yusuf", text: "Dann machen wir das so." },
    ],
    questions: [
      {
        text: "Womit begründet Yusuf seine Forderung?",
        options: [
          "Gewachsener Bereich und zusätzliche Einarbeitung",
          "Die Inflation",
          "Ein Angebot einer anderen Firma",
        ],
        answer: 0,
        explain: "İki projeden beşe çıkan alan ve ocaktan beri yeni çalışanları yetiştirmesi.",
      },
      {
        text: "Warum lehnt Frau Reuter die 58.000 ab?",
        options: [
          "Das Budget ist bis März verteilt",
          "Sie findet die Leistung zu schwach",
          "Die Rolle ist anders bewertet",
        ],
        answer: 0,
        explain: "Gerekçesi bütçe takvimi, performans değil.",
      },
      {
        text: "Was bietet sie zusätzlich an?",
        options: [
          "Eine Zertifizierung im Wert von 4.000 Euro",
          "Zwei Wochen Urlaub",
          "Einen Firmenwagen",
        ],
        answer: 0,
        explain: "„Die kostet 4.000 und zwei Wochen Arbeitszeit.“",
      },
      {
        text: "Wie reagiert Yusuf auf das Angebot?",
        options: [
          "Er nimmt es an, besteht aber auf einer Perspektive für das Gehalt",
          "Er lehnt es ab",
          "Er akzeptiert es statt der Erhöhung",
        ],
        answer: 0,
        explain: "„sie ersetzt kein Gehalt“ — ikisini birden istiyor.",
      },
      {
        text: "Worauf einigen sie sich am Ende?",
        options: [
          "54.500 ab Juli und ein schriftlich protokolliertes Ziel von 58.000",
          "58.000 ab Juli",
          "Nur die Zertifizierung",
        ],
        answer: 0,
        explain: "„Das ist keine Garantie, aber es verschwindet nicht.“",
      },
    ],
  },
  {
    id: "b2-l9",
    level: "B2",
    skill: "listening",
    title: "Vortrag: Warum wir Nachrichten meiden",
    genre: "Sınav formatı",
    intro:
      "B2 dinleme bölümünün uzun formatı: bir konferans konuşması ve içerik soruları. Not alarak dinlemeyi dene.",
    gloss: [
      { de: "die Nachrichtenvermeidung", tr: "haberden kaçınma", en: "news avoidance" },
      { de: "der Anteil", tr: "pay", en: "share" },
      { de: "die Ohnmacht", tr: "çaresizlik", en: "powerlessness" },
      { de: "die Wiederholung", tr: "tekrar", en: "repetition" },
      { de: "das Gegenmittel", tr: "panzehir", en: "antidote" },
      { de: "die Einordnung", tr: "bağlama oturtma", en: "contextualization" },
      { de: "der Ausweg", tr: "çıkış yolu", en: "way out" },
      { de: "die Zielgruppe", tr: "hedef kitle", en: "target audience" },
    ],
    minutes: 7,
    segments: [
      {
        speaker: "Referentin",
        text: "Ich fange mit einer Zahl an: In Deutschland sagt inzwischen etwa ein Drittel der Befragten, dass es Nachrichten aktiv aus dem Weg geht. Vor zehn Jahren war es halb so viel.",
      },
      {
        speaker: "Referentin",
        text: "Die naheliegende Erklärung wäre Desinteresse. Sie ist falsch. Die Gruppe, die am stärksten meidet, ist nicht die uninteressierte, sondern die belastete: Menschen mit wenig Zeit, wenig Geld und wenig Kontrolle über die eigene Lage.",
      },
      {
        speaker: "Referentin",
        text: "In den Interviews taucht immer wieder dasselbe Wort auf: Ohnmacht. Nicht „Ich verstehe es nicht“, sondern „Ich kann sowieso nichts tun“.",
      },
      {
        speaker: "Referentin",
        text: "Der zweite Grund ist die Wiederholung. Wer denselben Konflikt jeden Tag in derselben Form sieht, ohne dass sich die Information verändert, lernt nichts dazu — er spürt nur wieder dasselbe. Das Gehirn nennt das Belastung, nicht Wissen.",
      },
      {
        speaker: "Referentin",
        text: "Was hilft, ist gut untersucht und wird selten gemacht. Erstens Einordnung: nicht nur, was passiert ist, sondern warum es passiert und was daraus folgt. Zweitens Handlungswissen: Was können Betroffene konkret tun? Drittens, und das ist unbequem: weniger, aber vollständiger berichten.",
      },
      {
        speaker: "Referentin",
        text: "Ich sage ausdrücklich nicht: nur gute Nachrichten. Das ist die schlechteste Antwort auf ein echtes Problem. Menschen meiden Nachrichten nicht, weil sie schlecht sind, sondern weil sie folgenlos wirken.",
      },
      {
        speaker: "Referentin",
        text: "Und eine Einschränkung: Unsere Daten stammen aus Befragungen. Was Menschen über ihr Verhalten sagen, ist nicht immer das, was sie tun. Die Richtung ist stabil, die genaue Höhe wäre ich vorsichtig zu zitieren.",
      },
    ],
    questions: [
      {
        text: "Wie hat sich die Nachrichtenvermeidung entwickelt?",
        options: [
          "Sie hat sich in zehn Jahren etwa verdoppelt",
          "Sie ist gleich geblieben",
          "Sie ist gesunken",
        ],
        answer: 0,
        explain: "Bugün üçte bir; on yıl önce yarısı kadardı.",
      },
      {
        text: "Welche Erklärung weist die Referentin zurück?",
        options: ["Desinteresse", "Zeitmangel", "Ohnmacht"],
        answer: 0,
        explain: "„Sie ist falsch“ — en çok kaçınan grup ilgisizler değil, yükü ağır olanlar.",
      },
      {
        text: "Welches Wort taucht in den Interviews immer wieder auf?",
        options: ["Ohnmacht", "Angst", "Wut"],
        answer: 0,
        explain: "„Ich kann sowieso nichts tun.“",
      },
      {
        text: "Was ist am Problem der Wiederholung entscheidend?",
        options: [
          "Ohne neue Information entsteht Belastung statt Wissen",
          "Die Berichte sind zu lang",
          "Die Themen sind zu schwierig",
        ],
        answer: 0,
        explain: "„Das Gehirn nennt das Belastung, nicht Wissen.“",
      },
      {
        text: "Was lehnt sie ausdrücklich ab?",
        options: [
          "Nur gute Nachrichten zu berichten",
          "Weniger zu berichten",
          "Handlungswissen zu geben",
        ],
        answer: 0,
        explain: "„Das ist die schlechteste Antwort auf ein echtes Problem.“",
      },
      {
        text: "Welche Einschränkung nennt sie selbst?",
        options: [
          "Befragungsdaten bilden Verhalten nicht exakt ab",
          "Die Stichprobe war zu klein",
          "Die Studie ist zehn Jahre alt",
        ],
        answer: 0,
        explain: "Yön istikrarlı ama kesin oranı alıntılamakta temkinli.",
      },
    ],
  },
  {
    id: "b2-l10",
    level: "B2",
    skill: "listening",
    title: "Streitgespräch: Gendern",
    genre: "Tartışma",
    intro:
      "Almanya'da yıllardır süren dil tartışması. İki taraf da klişe değil — kimin nerede taviz verdiğine dikkat et.",
    gloss: [
      { de: "gendern", tr: "cinsiyete duyarlı dil kullanmak", en: "to use gender-inclusive language" },
      { de: "die Sprachpflege", tr: "dili koruma", en: "language cultivation" },
      { de: "der Sprachwandel", tr: "dil değişimi", en: "language change" },
      { de: "die Vorschrift", tr: "kural", en: "rule" },
      { de: "die Sichtbarkeit", tr: "görünürlük", en: "visibility" },
      { de: "die Ablehnung", tr: "reddetme", en: "rejection" },
      { de: "das Amtsdeutsch", tr: "resmî kurum dili", en: "bureaucratic German" },
      { de: "sich durchsetzen", tr: "yerleşmek", en: "to become established" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Moderatorin",
        text: "Frau Adam, Sie sind für das Gendern in Behörden. Warum sollte der Staat das vorschreiben?",
      },
      {
        speaker: "Adam",
        text: "Ich bin nicht für Vorschriften, ich bin für Klarheit. Wenn in einem Formular „der Antragsteller“ steht, denken Menschen an einen Mann — das ist gemessen, nicht gefühlt. In der Verwaltung geht es um Rechte. Da darf Sprache nicht mehrdeutig sein.",
      },
      {
        speaker: "Moderatorin",
        text: "Herr Volkmann, Sie halten dagegen.",
      },
      {
        speaker: "Volkmann",
        text: "Ich halte gegen die Methode, nicht gegen das Ziel. Sprachwandel funktioniert von unten. „Studierende“ hat sich durchgesetzt, weil es praktisch war — niemand musste es anordnen. Sternchen und Doppelpunkte dagegen sind Schrift, keine Sprache. Man kann sie nicht sprechen.",
      },
      { speaker: "Adam", text: "Man kann. Mit einer kurzen Pause. Das machen Nachrichtensprecher längst." },
      {
        speaker: "Volkmann",
        text: "Und ein großer Teil der Bevölkerung lehnt es ab. Wenn eine Maßnahme für Gleichheit dazu führt, dass Gleichheit unbeliebt wird, hat sie ihr Ziel verfehlt.",
      },
      {
        speaker: "Adam",
        text: "Das Argument nehme ich ernst, ehrlich. Aber die Ablehnung war bei jeder sprachlichen Änderung groß. „Frau Doktor“ war einmal lächerlich.",
      },
      {
        speaker: "Volkmann",
        text: "Richtig. Und ich sage nicht, dass es so bleiben muss. Ich sage: Lasst es wachsen, statt es zu verordnen. In Formularen bin ich sogar bei Ihnen — dort geht es um Recht, nicht um Stil.",
      },
      { speaker: "Moderatorin", text: "Also Einigkeit bei Formularen?" },
      { speaker: "Volkmann", text: "Bei Formularen ja." },
      { speaker: "Adam", text: "Dann haben wir mehr gemeinsam, als das Publikum erwartet hat." },
    ],
    questions: [
      {
        text: "Wie begründet Frau Adam ihre Position?",
        options: [
          "In der Verwaltung geht es um Rechte, Sprache darf nicht mehrdeutig sein",
          "Sprache muss schön sein",
          "Andere Länder machen es auch",
        ],
        answer: 0,
        explain: "„der Antragsteller“ okunduğunda insanlar erkek düşünüyor — bu ölçülmüş.",
      },
      {
        text: "Wogegen wendet sich Herr Volkmann genau?",
        options: [
          "Gegen die Methode, nicht gegen das Ziel",
          "Gegen die Gleichberechtigung",
          "Gegen die Verwaltung",
        ],
        answer: 0,
        explain: "„Ich halte gegen die Methode, nicht gegen das Ziel.“",
      },
      {
        text: "Welches Beispiel nennt er für gelungenen Sprachwandel?",
        options: ["„Studierende“", "„Frau Doktor“", "Das Sternchen"],
        answer: 0,
        explain: "Pratik olduğu için kendiliğinden yerleşmiş.",
      },
      {
        text: "Wie kontert Frau Adam sein Ablehnungs-Argument?",
        options: [
          "Jede sprachliche Änderung war anfangs unbeliebt",
          "Die Umfragen seien falsch",
          "Ablehnung sei unwichtig",
        ],
        answer: 0,
        explain: "„„Frau Doktor“ war einmal lächerlich.“ Ayrıca argümanı ciddiye aldığını söylüyor.",
      },
      {
        text: "Worin sind sich beide am Ende einig?",
        options: [
          "Bei Formularen",
          "Bei Nachrichtensendungen",
          "In gar nichts",
        ],
        answer: 0,
        explain: "„dort geht es um Recht, nicht um Stil.“",
      },
    ],
  },
  {
    id: "b2-l11",
    level: "B2",
    skill: "listening",
    title: "Beim Betriebsrat",
    genre: "Danışma",
    intro:
      "Almanya'da çalışanın en güçlü aracı: işyeri temsilciliği. Bir danışma görüşmesini dinleyeceksin.",
    gloss: [
      { de: "der Betriebsrat", tr: "işçi konseyi", en: "works council", note: "Almanya'da çalışanların seçtiği yasal işyeri temsil organı." },
      { de: "die Mitbestimmung", tr: "söz hakkı", en: "codetermination", note: "Almanya'da işçilerin işletme kararlarına yasal katılım hakkı." },
      { de: "die Versetzung", tr: "görev değişikliği", en: "transfer" },
      { de: "anhören", tr: "görüşünü almak", en: "to consult" },
      { de: "die Zustimmung", tr: "onay", en: "consent" },
      { de: "die Schweigepflicht", tr: "sır saklama yükümlülüğü", en: "confidentiality" },
      { de: "das Protokoll", tr: "tutanak", en: "minutes" },
      { de: "eskalieren", tr: "çığırından çıkmak", en: "to escalate" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Betriebsrat", text: "Setzen Sie sich. Und vorweg: Alles hier unterliegt der Schweigepflicht." },
      {
        speaker: "Mitarbeiterin",
        text: "Danke. Mir wurde gestern gesagt, dass ich ab Mai in die Nachtschicht wechsle. Ohne Gespräch, per Mail.",
      },
      { speaker: "Betriebsrat", text: "Dauerhaft oder befristet?" },
      { speaker: "Mitarbeiterin", text: "Dauerhaft. Ich habe zwei Kinder, sieben und zehn." },
      {
        speaker: "Betriebsrat",
        text: "Dann sind wir mitten in der Mitbestimmung. Eine dauerhafte Versetzung in die Nachtschicht ist keine Kleinigkeit — der Arbeitgeber muss uns vorher anhören, und wir müssen zustimmen.",
      },
      { speaker: "Mitarbeiterin", text: "Haben Sie zugestimmt?" },
      {
        speaker: "Betriebsrat",
        text: "Wir wurden gar nicht gefragt. Das heißt: Die Anordnung ist so nicht wirksam. Sie müssen im Mai nicht in die Nachtschicht.",
      },
      { speaker: "Mitarbeiterin", text: "Und wenn ich einfach nicht komme?" },
      {
        speaker: "Betriebsrat",
        text: "Das rate ich Ihnen nicht. Wir schreiben stattdessen heute ein Schreiben: Wir weisen darauf hin, dass die Beteiligung fehlt, und bitten um ein Gespräch zu dritt. In neun von zehn Fällen ist die Sache damit erledigt.",
      },
      { speaker: "Mitarbeiterin", text: "Und im zehnten?" },
      {
        speaker: "Betriebsrat",
        text: "Dann geht es zur Einigungsstelle. Das dauert, ist aber keine Katastrophe. Wichtig ist jetzt nur eins: Antworten Sie auf die Mail sachlich und schriftlich — kein Streit per Telefon, nichts, was später niemand belegen kann.",
      },
    ],
    questions: [
      {
        text: "Was ist das Problem der Mitarbeiterin?",
        options: [
          "Dauerhafte Versetzung in die Nachtschicht, angeordnet per Mail",
          "Eine Kündigung",
          "Eine Gehaltskürzung",
        ],
        answer: 0,
        explain: "Görüşme yapılmadan, e-postayla bildirilmiş.",
      },
      {
        text: "Warum ist die Anordnung nicht wirksam?",
        options: [
          "Der Betriebsrat wurde nicht beteiligt",
          "Sie kam per Mail",
          "Sie hat Kinder",
        ],
        answer: 0,
        explain: "Kalıcı vardiya değişikliğinde temsilciliğin görüşü ve onayı gerekiyor.",
      },
      {
        text: "Was rät der Betriebsrat ihr nicht zu tun?",
        options: [
          "Einfach nicht zu erscheinen",
          "Ein Schreiben zu senden",
          "Ein Gespräch zu führen",
        ],
        answer: 0,
        explain: "„Das rate ich Ihnen nicht.“",
      },
      {
        text: "Was passiert in den meisten Fällen?",
        options: [
          "Die Sache klärt sich nach dem Schreiben und einem Gespräch",
          "Es geht vor Gericht",
          "Der Arbeitgeber kündigt",
        ],
        answer: 0,
        explain: "„In neun von zehn Fällen ist die Sache damit erledigt.“",
      },
      {
        text: "Welchen praktischen Rat gibt er zum Schluss?",
        options: [
          "Sachlich und schriftlich antworten",
          "Sofort einen Anwalt nehmen",
          "Mit Kollegen sprechen",
        ],
        answer: 0,
        explain: "„nichts, was später niemand belegen kann.“",
      },
    ],
  },
  {
    id: "b2-l12",
    level: "B2",
    skill: "listening",
    title: "Die Pressekonferenz",
    genre: "Basın toplantısı",
    intro:
      "Hikâyenin sonu: yazı çıktı. Şirket basın toplantısı düzenliyor ve Nora salonda.",
    gloss: [
      { de: "die Pressekonferenz", tr: "basın toplantısı", en: "press conference" },
      { de: "die Berichterstattung", tr: "habercilik", en: "reporting" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "die Konsequenz", tr: "sonuç", en: "consequence" },
      { de: "die Prüfung", tr: "inceleme", en: "review" },
      { de: "extern", tr: "dışarıdan", en: "external" },
      { de: "rückwirkend", tr: "geriye dönük", en: "retroactive" },
      { de: "der Einzelfall", tr: "münferit olay", en: "individual case" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Sprecher",
        text: "Guten Tag. Die Berichterstattung der letzten Woche hat uns Anlass gegeben, unsere Prozesse zu überprüfen. Ich sage vorweg: Nicht alles, was berichtet wurde, teilen wir.",
      },
      {
        speaker: "Sprecher",
        text: "Wir räumen allerdings ein, dass die Regelung zu den Umkleidezeiten bei unseren Dienstleistern uneinheitlich war. Diese Zeiten werden ab dem 1. des kommenden Monats einheitlich vergütet, und zwar rückwirkend für zwölf Monate.",
      },
      {
        speaker: "Sprecher",
        text: "Den Vorwurf, dass Beschäftigte wegen einer Beschwerde weniger Schichten erhalten haben, halten wir weiterhin für nicht belegt. Eine externe Kanzlei prüft die Vorgänge; das Ergebnis werden wir veröffentlichen.",
      },
      { speaker: "Journalist 1", text: "Warum die Rückzahlung, wenn nichts falsch war?" },
      {
        speaker: "Sprecher",
        text: "Weil uneinheitlich nicht gleich rechtswidrig ist. Wir wollen die Frage nicht über Jahre vor Gericht klären, sondern sie beenden.",
      },
      { speaker: "Nora", text: "Wie viele Beschäftigte betrifft die Rückzahlung, und wie hoch ist sie?" },
      { speaker: "Sprecher", text: "Etwa 380 Personen. Zur Summe sage ich heute nichts." },
      { speaker: "Nora", text: "Und die sechs Einstellungen im November — waren die dem Vorstand bekannt?" },
      {
        speaker: "Sprecher",
        text: "Das ist Gegenstand der Prüfung. Ich bitte um Verständnis, dass ich dem nicht vorgreife.",
      },
      {
        speaker: "Journalist 2",
        text: "Gibt es personelle Konsequenzen?",
      },
      { speaker: "Sprecher", text: "Heute nicht. Wir warten das Ergebnis ab." },
    ],
    questions: [
      {
        text: "Was räumt die Firma ein?",
        options: [
          "Die Regelung zu den Umkleidezeiten war uneinheitlich",
          "Beschäftigte wurden benachteiligt",
          "Der Vorstand war informiert",
        ],
        answer: 0,
        explain: "Tam olarak bu nokta kabul ediliyor — daha fazlası değil.",
      },
      {
        text: "Was passiert mit den Umkleidezeiten?",
        options: [
          "Sie werden vergütet, rückwirkend für zwölf Monate",
          "Sie werden abgeschafft",
          "Sie bleiben Sache der Dienstleister",
        ],
        answer: 0,
        explain: "Gelecek ayın 1'inden itibaren, on iki ay geriye dönük.",
      },
      {
        text: "Wie begründet der Sprecher die Rückzahlung trotz Zurückweisung?",
        options: [
          "„Uneinheitlich ist nicht gleich rechtswidrig“ — man will die Frage beenden",
          "Man habe einen Fehler gemacht",
          "Ein Gericht habe es angeordnet",
        ],
        answer: 0,
        explain: "Hukuki kabul olmadan konuyu kapatma stratejisi.",
      },
      {
        text: "Welche Frage von Nora bleibt offen?",
        options: [
          "Ob der Vorstand von den sechs Einstellungen wusste",
          "Wie viele Personen betroffen sind",
          "Wann gezahlt wird",
        ],
        answer: 0,
        explain: "„Das ist Gegenstand der Prüfung“ — cevap verilmiyor.",
      },
      {
        text: "Was sagt der Sprecher zu personellen Konsequenzen?",
        options: [
          "Heute keine — man wartet das Prüfergebnis ab",
          "Zwei Führungskräfte gehen",
          "Es wird keine geben",
        ],
        answer: 0,
        explain: "„Heute nicht. Wir warten das Ergebnis ab.“",
      },
    ],
  },

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
      { de: "das Verbot", tr: "yasak", en: "ban" },
      { de: "die Nutzung", tr: "kullanım", en: "use" },
      { de: "der Umgang mit", tr: "kullanma biçimi", en: "handling of" },
      { de: "die Ablenkung", tr: "dikkat dağınıklığı", en: "distraction" },
      { de: "das Miteinander", tr: "birliktelik", en: "togetherness" },
      { de: "vermitteln", tr: "aktarmak", en: "to convey" },
      { de: "das Schließfach", tr: "kilitli dolap", en: "locker" },
      { de: "abgestuft", tr: "kademeli", en: "graduated" },
      { de: "pauschal", tr: "toptan", en: "blanket" },
      { de: "überreizt", tr: "aşırı uyarılmış", en: "overstimulated" },
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
          { de: "Einerseits …, andererseits …", tr: "Bir yandan …, öte yandan …", en: "On the one hand …, on the other hand …" },
          { de: "Ich halte … für …", tr: "…'yi … olarak görüyorum", en: "I consider … to be …" },
          { de: "Statt … zu verbieten", tr: "… yasaklamak yerine", en: "Instead of banning …" },
          { de: "Zum einen …, zum anderen …", tr: "Birincisi …, ikincisi …", en: "For one thing …, for another …" },
          { de: "Es lässt sich kaum kontrollieren", tr: "Bunu denetlemek neredeyse imkânsız", en: "It can hardly be monitored" },
          { de: "Meiner Meinung nach", tr: "Bence", en: "In my opinion" },
          { de: "Ein sinnvoller Kompromiss wäre …", tr: "Mantıklı bir orta yol … olurdu", en: "A sensible compromise would be …" },
          { de: "Das betrifft mich unmittelbar", tr: "Bu beni doğrudan ilgilendiriyor", en: "This affects me directly" },
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
      { de: "die Lieferung", tr: "teslimat", en: "delivery" },
      { de: "beschädigt", tr: "hasarlı", en: "damaged" },
      { de: "der Kratzer", tr: "çizik", en: "scratch" },
      { de: "das Scharnier", tr: "menteşe", en: "hinge" },
      { de: "zusichern", tr: "taahhüt etmek", en: "to assure" },
      { de: "die Nachfrage", tr: "sorma", en: "inquiry" },
      { de: "die Frist", tr: "son tarih", en: "deadline" },
      { de: "erstatten", tr: "geri ödemek", en: "to reimburse" },
      { de: "vom Kauf zurücktreten", tr: "satın almadan caymak", en: "to withdraw from the purchase" },
      { de: "einschalten", tr: "devreye sokmak", en: "to involve" },
      { de: "einwandfrei", tr: "kusursuz", en: "flawless" },
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
          { de: "Ich wende mich an Sie, weil …", tr: "Şu nedenle size başvuruyorum: …", en: "I am writing to you because …" },
          { de: "Leider musste ich feststellen, dass …", tr: "Maalesef şunu fark ettim: …", en: "Unfortunately I had to discover that …" },
          { de: "Trotz mehrmaliger Nachfrage", tr: "Defalarca sormama rağmen", en: "Despite repeated inquiries" },
          { de: "Ich fordere Sie auf, …", tr: "Sizden … talep ediyorum", en: "I call on you to …" },
          { de: "Ich setze Ihnen eine Frist bis zum …", tr: "Size … tarihine kadar süre veriyorum", en: "I am setting you a deadline of …" },
          { de: "Andernfalls sehe ich mich gezwungen, …", tr: "Aksi hâlde … zorunda kalacağım", en: "Otherwise I will be forced to …" },
          { de: "den Kaufpreis in voller Höhe erstatten", tr: "satış bedelini tam olarak geri ödemek", en: "to refund the purchase price in full" },
          { de: "Ich erwarte Ihre Rückmeldung", tr: "Dönüşünüzü bekliyorum", en: "I await your reply" },
          { de: "die Verbraucherzentrale einschalten", tr: "tüketici merkezini devreye sokmak", en: "to involve the consumer advice center" },
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
      { de: "die Sperrung", tr: "kapatma", en: "closure" },
      { de: "der Einzelhandel", tr: "perakende", en: "retail" },
      { de: "die Umsatzeinbuße", tr: "ciro kaybı", en: "revenue loss" },
      { de: "der Beschluss", tr: "karar", en: "decision" },
      { de: "die Aufenthaltsqualität", tr: "mekân kalitesi", en: "quality of stay" },
      { de: "übersehen", tr: "gözden kaçırmak", en: "to overlook" },
      { de: "sich ausgleichen", tr: "dengelenmek", en: "to balance out" },
      { de: "die Umsetzung", tr: "uygulama", en: "implementation" },
      { de: "das Stückwerk", tr: "yarım yamalak iş", en: "patchwork" },
      { de: "profitieren von", tr: "yararlanmak", en: "to benefit from" },
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
          { de: "Mit großem Interesse habe ich Ihren Artikel gelesen", tr: "Yazınızı büyük bir ilgiyle okudum", en: "I read your article with great interest" },
          { de: "Ich teile die Auffassung, dass …", tr: "… görüşünü paylaşıyorum", en: "I share the view that …" },
          { de: "Es steht außer Frage, dass …", tr: "… olduğu tartışmasız", en: "There is no question that …" },
          { de: "Dabei wird übersehen, dass …", tr: "Burada gözden kaçırılan şu: …", en: "What is overlooked here is that …" },
          { de: "Zwar …, jedoch …", tr: "Gerçi …, ancak …", en: "Admittedly …, however …" },
          { de: "Entscheidend ist aus meiner Sicht …", tr: "Bana göre belirleyici olan …", en: "In my view the decisive point is …" },
          { de: "Abschließend möchte ich vorschlagen, …", tr: "Son olarak şunu önermek isterim: …", en: "In conclusion I would like to propose …" },
          { de: "Davon würden beide Seiten profitieren", tr: "Bundan iki taraf da kazançlı çıkar", en: "Both sides would benefit from it" },
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
      { de: "der Wegfall", tr: "ortadan kalkma", en: "elimination" },
      { de: "das Pendeln", tr: "işe gidip gelmek", en: "to commute" },
      { de: "unterbrechen", tr: "bölmek", en: "to interrupt" },
      { de: "die Schattenseite", tr: "olumsuz yan", en: "downside" },
      { de: "der Austausch", tr: "fikir alışverişi", en: "exchange" },
      { de: "Anschluss finden", tr: "kaynaşmak", en: "to fit in" },
      { de: "ineinander übergehen", tr: "iç içe geçmek", en: "to merge into one another" },
      { de: "sich bewähren", tr: "kendini kanıtlamak", en: "to prove itself" },
      { de: "vereinbaren", tr: "kararlaştırmak", en: "to arrange" },
      { de: "erreichbar", tr: "ulaşılabilir", en: "reachable" },
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
          { de: "Ich möchte meine Erfahrungen teilen", tr: "Deneyimlerimi paylaşmak istiyorum", en: "I would like to share my experiences" },
          { de: "Ein großer Vorteil besteht darin, dass …", tr: "Büyük bir avantajı şu: …", en: "One big advantage is that …" },
          { de: "Allerdings hat die Sache auch Schattenseiten", tr: "Ancak işin olumsuz yanları da var", en: "However the matter also has its downsides" },
          { de: "Hinzu kommt, dass …", tr: "Buna ek olarak …", en: "On top of that …" },
          { de: "Aus meiner Sicht", tr: "Bana göre", en: "From my point of view" },
          { de: "Die Lösung liegt in …", tr: "Çözüm …'da yatıyor", en: "The solution lies in …" },
          { de: "Es hat sich bewährt, dass …", tr: "Şunun işe yaradığı görüldü: …", en: "It has proved effective that …" },
          { de: "rund um die Uhr erreichbar sein", tr: "günün her saati ulaşılabilir olmak", en: "to be reachable around the clock" },
        ],
        sample:
          "Diese Frage beschäftigt unser Team seit Monaten, deshalb möchte ich meine Erfahrungen teilen. Ich arbeite seit drei Jahren überwiegend im Homeoffice und möchte die Vorteile nicht mehr missen: Der Wegfall des Pendelns spart mir täglich fast zwei Stunden, und konzentrierte Aufgaben erledige ich zu Hause deutlich schneller, weil ich seltener unterbrochen werde.\n\nAllerdings hat die Sache auch Schattenseiten. Der spontane Austausch mit den Kolleginnen und Kollegen fehlt mir, und gerade neue Teammitglieder tun sich schwer, Anschluss zu finden. Hinzu kommt die Gefahr, dass Arbeit und Freizeit ineinander übergehen – anfangs habe ich abends deutlich zu lange am Schreibtisch gesessen.\n\nAus meiner Sicht liegt die Lösung in einer klugen Mischung: zwei feste Bürotage für Besprechungen und Teamarbeit, der Rest flexibel von zu Hause. Wichtig ist dabei, klare Regeln zu vereinbaren, damit niemand rund um die Uhr erreichbar sein muss.",
      },
    ],
  },
  {
    id: "b2-w5",
    level: "B2",
    skill: "writing",
    title: "Widerspruch gegen einen Bescheid",
    genre: "Resmî yazı",
    intro:
      "Almanya'da resmî karara itiraz etmenin biçimi bellidir: süre, gerekçe, talep. Bunu yazacaksın.",
    gloss: [
      { de: "der Bescheid", tr: "resmî karar", en: "official decision" },
      { de: "der Widerspruch", tr: "itiraz", en: "objection" },
      { de: "das Aktenzeichen", tr: "dosya numarası", en: "file number" },
      { de: "die Begründung", tr: "gerekçe", en: "justification" },
      { de: "beifügen", tr: "eklemek", en: "to enclose" },
      { de: "die Berechnung", tr: "hesaplama", en: "calculation" },
      { de: "berücksichtigen", tr: "dikkate almak", en: "to take into account" },
      { de: "die Aufhebung", tr: "iptal", en: "annulment" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "8 Mart tarihli karara itiraz ediyorum.",
        answer: "Hiermit lege ich Widerspruch gegen den Bescheid vom 8. März ein.",
        hint: "„Widerspruch einlegen gegen“ — ayrılabilir fiil, „ein“ sona gider.",
      },
      {
        kind: "build",
        tr: "Hesaplamada Ocak ayındaki gelirim dikkate alınmamış.",
        answer: "In der Berechnung wurde mein Einkommen aus dem Januar nicht berücksichtigt.",
        hint: "Edilgen geçmiş: wurde … berücksichtigt.",
      },
      {
        kind: "build",
        tr: "Bu nedenle kararın iptalini talep ediyorum.",
        answer: "Ich beantrage daher die Aufhebung des Bescheids.",
        hint: "„beantragen“ + Akkusativ; burada Genitiv tamlaması doğaldır.",
      },
      {
        kind: "free",
        prompt:
          "Bir resmî karara itiraz mektubu yaz (kira yardımı, ehliyet, sigorta ödemesi — kendin seç). Beş noktaya değin: hangi karara ve hangi tarihliye itiraz ettiğin (dosya numarasıyla), neyin yanlış olduğu, bunu neyle kanıtladığın, net talebin, kapanış. Duygusal cümle kurma; her iddianın yanında bir belge olsun.",
        checklist: [
          "İtiraz cümlesi ilk satırda mı, dosya numarası var mı?",
          "Yanlışı somut ve tek tek anlattın mı?",
          "Ekleri saydın mı?",
          "Net bir talep yazdın mı?",
          "Ton nesnel mi (öfke yok)?",
        ],
        minWords: 120,
        phrases: [
          { de: "Hiermit lege ich Widerspruch gegen … ein.", tr: "İşbu yazıyla …'e itiraz ediyorum.", en: "I hereby lodge an objection against …" },
          { de: "Aktenzeichen: …", tr: "Dosya numarası: …", en: "File number: …" },
          { de: "Zur Begründung führe ich aus:", tr: "Gerekçe olarak şunları belirtiyorum:", en: "As justification I submit the following:" },
          { de: "Als Nachweis füge ich … bei.", tr: "Kanıt olarak … ekliyorum.", en: "As proof I enclose …" },
          { de: "Ich beantrage daher …", tr: "Bu nedenle … talep ediyorum.", en: "I therefore request …" },
          { de: "Für Rückfragen stehe ich zur Verfügung.", tr: "Sorularınız için müsaitim.", en: "I am available for any questions." },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\nhiermit lege ich Widerspruch gegen den Bescheid vom 8. März ein.\nAktenzeichen: WG-2026-114-7739\n\nZur Begründung führe ich aus:\n\nIn der Berechnung wurde mein Einkommen aus dem Januar nicht berücksichtigt, sondern das aus dem Dezember. Im Dezember habe ich eine einmalige Nachzahlung meines früheren Arbeitgebers erhalten, die im Bescheid als laufendes Einkommen behandelt wird. Dadurch liegt das angenommene Monatseinkommen um 640 Euro über dem tatsächlichen.\n\nAußerdem sind die Heizkosten mit 78 Euro angesetzt. Laut Nebenkostenabrechnung meines Vermieters betragen sie 121 Euro monatlich.\n\nAls Nachweis füge ich bei: die Lohnabrechnungen für Dezember und Januar, das Schreiben des früheren Arbeitgebers zur Nachzahlung sowie die Nebenkostenabrechnung 2025.\n\nIch beantrage daher die Aufhebung des Bescheids und eine neue Berechnung auf Grundlage der beigefügten Unterlagen.\n\nFür Rückfragen stehe ich Ihnen gern zur Verfügung.\n\nMit freundlichen Grüßen\nNora Weiß",
      },
    ],
  },
  {
    id: "b2-w6",
    level: "B2",
    skill: "writing",
    title: "Erörterung: Pro und Kontra",
    genre: "Sınav formatı",
    intro:
      "B2 yazma bölümünün ana görevi: bir konuyu iki yönüyle tartışıp kendi sonucuna varmak. Yapı burada içerik kadar önemlidir.",
    gloss: [
      { de: "die Erörterung", tr: "irdeleme", en: "discussion" },
      { de: "die These", tr: "tez", en: "thesis" },
      { de: "abwägen", tr: "ölçüp biçmek", en: "to weigh up" },
      { de: "das Argument entkräften", tr: "argümanı çürütmek", en: "to refute the argument" },
      { de: "zum einen … zum anderen", tr: "bir yandan … diğer yandan", en: "for one thing … for another" },
      { de: "letztlich", tr: "sonuçta", en: "ultimately" },
      { de: "die Schlussfolgerung", tr: "çıkarım", en: "conclusion" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bu konu yıllardır tartışılıyor.",
        answer: "Über dieses Thema wird seit Jahren diskutiert.",
        hint: "Öznesiz edilgen: „Über … wird diskutiert.“",
      },
      {
        kind: "build",
        tr: "Bu argümanın haklı bir çekirdeği var, ama tamamı değil.",
        answer: "Dieses Argument hat einen berechtigten Kern, aber nicht mehr.",
        hint: "Karşı görüşü kabul edip sınırlandırmak, B2'de puan getiren harekettir.",
      },
      {
        kind: "build",
        tr: "Her şeyi tarttıktan sonra ikinci görüşe katılıyorum.",
        answer: "Nach Abwägung aller Punkte schließe ich mich der zweiten Position an.",
        hint: "„sich anschließen“ Dativ ister: der Position.",
      },
      {
        kind: "free",
        prompt:
          "Şu konuda bir tartışma yazısı yaz: „Üniversite eğitimi herkes için ücretsiz mi olmalı, yoksa katkı payı alınmalı mı?“ Yapı: kısa giriş (konu neden gündemde), lehte iki argüman, aleyhte iki argüman, en güçlü karşı argümanı ele alışın, kendi sonucun. Sonucun girişte belli olmasın.",
        checklist: [
          "Giriş konuyu bağlama oturtuyor mu?",
          "İki lehte, iki aleyhte argüman var mı?",
          "Her argümanı bir örnek ya da veriyle destekledin mi?",
          "En güçlü karşı argümanı ciddiye alıp yanıtladın mı?",
          "Sonuç argümanlardan çıkıyor mu, başta ilan edilmiş mi?",
          "Bağlaçlarla akış kurdun mu?",
        ],
        minWords: 180,
        phrases: [
          { de: "Über dieses Thema wird seit Jahren diskutiert.", tr: "Bu konu yıllardır tartışılıyor.", en: "This topic has been debated for years." },
          { de: "Für … spricht zunächst, dass …", tr: "…'in lehine ilk olarak şu var: …", en: "The first point in favor of … is that …" },
          { de: "Ein weiteres Argument ist …", tr: "Bir diğer argüman …", en: "A further argument is …" },
          { de: "Dagegen wird eingewendet, dass …", tr: "Buna karşı şu itiraz yapılıyor: …", en: "Against this it is objected that …" },
          { de: "Dieses Argument hat einen berechtigten Kern, aber …", tr: "Bu argümanın haklı bir yanı var ama …", en: "This argument has a legitimate core, but …" },
          { de: "Nach Abwägung aller Punkte …", tr: "Bütün noktaları tarttıktan sonra …", en: "After weighing up all the points …" },
        ],
        sample:
          "Über die Frage, ob ein Studium kostenlos sein soll, wird in Deutschland seit Jahren diskutiert — meist dann, wenn die Haushalte der Länder knapp werden.\n\nFür ein gebührenfreies Studium spricht zunächst der Zugang. Wer aus einer Familie ohne akademischen Hintergrund kommt, entscheidet sich schon bei geringen Kosten häufiger gegen ein Studium; das ist gut belegt. Ein weiteres Argument ist volkswirtschaftlich: Ein Staat, der Ausbildung finanziert, holt das Geld später über Steuern zurück.\n\nDagegen wird eingewendet, dass gerade das gebührenfreie System sozial ungerecht sei. Es wird von allen bezahlt, genutzt aber überdurchschnittlich von Kindern gut verdienender Eltern. Hinzu kommt die Finanzierungslage: Hörsäle, Bibliotheken und Personal sind vielerorts überlastet.\n\nDieses zweite Argument hat einen berechtigten Kern, aber es trifft nicht die Gebührenfrage, sondern die Schulpolitik. Wer die soziale Auswahl vor dem Studium nicht ändert, verschiebt mit Gebühren nur die Hürde und macht sie zusätzlich sichtbar.\n\nNach Abwägung aller Punkte halte ich Gebühren für den falschen Hebel. Sinnvoller wäre, die Hochschulen besser zu finanzieren und gleichzeitig das BAföG so zu erhöhen, dass es die tatsächlichen Lebenshaltungskosten deckt. Das Problem liegt selten in den Studiengebühren — es liegt in der Miete.",
      },
    ],
  },
  {
    id: "b2-w7",
    level: "B2",
    skill: "writing",
    title: "Kommentar zur Erinnerungskultur",
    genre: "Köşe yazısı",
    intro:
      "b2-r9'daki konuyu bir köşe yazısına dönüştüreceksin: kendi bakışın, bir itiraz ve bir sonuç. Bu konuda ton önemlidir — büyük laf değil, düşünülmüş cümle.",
    gloss: [
      { de: "die Erinnerungskultur", tr: "hatırlama kültürü", en: "memory culture" },
      { de: "die Haltung", tr: "tutum", en: "attitude" },
      { de: "die Geste", tr: "jest", en: "gesture" },
      { de: "beiläufig", tr: "laf arasında", en: "casually" },
      { de: "das Ritual", tr: "ritüel", en: "ritual" },
      { de: "hohl", tr: "içi boş", en: "hollow" },
      { de: "angemessen", tr: "makul", en: "reasonable" },
      { de: "die Gegenwart", tr: "bugün", en: "present" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Anma, bir ritüele dönüştüğü anda içini kaybeder.",
        answer: "Erinnerung verliert ihren Inhalt in dem Moment, in dem sie zum Ritual wird.",
        hint: "„in dem Moment, in dem …“ — zaman bildiren ilgi cümlesi.",
      },
      {
        kind: "build",
        tr: "Bu itirazı ciddiye almak gerekir.",
        answer: "Diesen Einwand muss man ernst nehmen.",
        hint: "Nesne başa alınınca fiil yine ikinci sırada kalır.",
      },
      {
        kind: "build",
        tr: "Soru geçmişe değil, bugüne yöneliktir.",
        answer: "Die Frage richtet sich nicht an die Vergangenheit, sondern an die Gegenwart.",
        hint: "„sich richten an“ + Akkusativ.",
      },
      {
        kind: "free",
        prompt:
          "Anma kültürü üzerine kısa bir köşe yazısı yaz. Dört noktaya değin: somut bir gözlem ya da sahneyle başla, buradan bir düşünceye geç, en güçlü karşı görüşü ciddiye al, kendi sonucunu yaz. Büyük genellemelerden kaçın; tek bir somut ayrıntı, on soyut cümleden güçlüdür.",
        checklist: [
          "Somut bir gözlemle başladın mı?",
          "Gözlemden düşünceye geçiş net mi?",
          "Karşı görüşü zayıflatmadan aktardın mı?",
          "Kendi sonucun karşı görüşten ayırt edilebiliyor mu?",
          "Ton ölçülü mü (patetik değil)?",
        ],
        minWords: 160,
        phrases: [
          { de: "Vor meiner Haustür liegt …", tr: "Kapımın önünde … var.", en: "In front of my front door lies …" },
          { de: "Man könnte einwenden, dass …", tr: "Şöyle bir itiraz gelebilir: …", en: "One could object that …" },
          { de: "Genau darin liegt der Punkt.", tr: "İşin özü tam burada.", en: "That is exactly the point." },
          { de: "Es geht nicht um …, sondern um …", tr: "Mesele … değil, …", en: "It is not about …, but about …" },
          { de: "Am Ende bleibt die Frage: …", tr: "Sonunda geriye şu soru kalıyor: …", en: "In the end the question remains: …" },
        ],
        sample:
          "Vor meiner Haustür liegt ein Stolperstein. Ich gehe seit vier Jahren täglich darüber, und ich habe den Namen erst im dritten Jahr gelesen — an einem Morgen, an dem mein Bus nicht kam und ich zehn Minuten stehen musste.\n\nDas klingt nach einem Versäumnis, und das ist es auch. Aber es sagt zugleich etwas über die Idee dieses Denkmals. Es verlangt nichts. Es steht nicht auf einem Platz, zu dem man fährt, sondern liegt im Weg — und man begegnet ihm irgendwann, ohne es geplant zu haben.\n\nMan könnte einwenden, dass genau das zu wenig ist. Ein Stein, über den alle laufen, wird zur Möblierung; Erinnerung verliert ihren Inhalt in dem Moment, in dem sie zum Ritual wird. Diesen Einwand muss man ernst nehmen, denn er beschreibt etwas Richtiges: In vielen deutschen Städten gibt es inzwischen mehr Gedenkformate als Menschen, die sie besuchen.\n\nGenau darin liegt aber auch der Unterschied. Ein Ritual hat einen Termin. Ein Stein im Gehweg hat keinen. Er wirkt nicht, weil man ihn ehrt, sondern weil er einen an einem beliebigen Dienstag erwischt.\n\nEs geht nicht um die Frage, ob wir genug erinnern, sondern wann. Am Ende bleibt die Frage, ob ein Name, den man beim Warten auf den Bus liest, mehr auslöst als eine Rede, die man erwartet hat. Ich glaube inzwischen: ja.",
      },
    ],
  },
  {
    id: "b2-w8",
    level: "B2",
    skill: "writing",
    title: "Der Artikel",
    genre: "Haber yazısı",
    intro:
      "Hikâyenin son parçası: Nora'nın yerine geçip haberi yazacaksın. Gazetecilikte kural nettir — iddia ile kanıt ayrılır, karşı taraf konuşturulur.",
    gloss: [
      { de: "der Vorwurf", tr: "suçlama", en: "accusation" },
      { de: "recherchieren", tr: "araştırmak", en: "to research" },
      { de: "vorliegen", tr: "elde bulunmak", en: "to be available" },
      { de: "bestätigen", tr: "onaylamak", en: "to confirm" },
      { de: "dementieren", tr: "yalanlamak", en: "to deny" },
      { de: "die Quelle", tr: "kaynak", en: "source" },
      { de: "der Zusammenhang", tr: "bağlantı", en: "connection" },
      { de: "nachweisen", tr: "belgelemek", en: "to prove" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Gazetemize altı aylık vardiya planları ulaştı.",
        answer: "Unserer Redaktion liegen Schichtpläne aus sechs Monaten vor.",
        hint: "„vorliegen“ Dativ ile: Unserer Redaktion liegen … vor.",
      },
      {
        kind: "build",
        tr: "Şirket bu iddiayı reddediyor.",
        answer: "Das Unternehmen weist diesen Vorwurf zurück.",
        hint: "„zurückweisen“ ayrılabilir.",
      },
      {
        kind: "build",
        tr: "Bir bağlantı kanıtlanamıyor.",
        answer: "Ein Zusammenhang lässt sich nicht nachweisen.",
        hint: "„sich lassen“ + mastar = edilgen imkân ifadesi.",
      },
      {
        kind: "free",
        prompt:
          "Haberi yaz. Beş noktaya değin: ne olduğunu özetleyen bir giriş cümlesi, elindeki kanıt ve kaynağın kim olduğu (isimsiz kaynak nasıl tanımlanır), şirketin cevabı, kanıtlanamayanın açıkça kanıtlanamadığını söylemen, sonuç. Kanıtlayamadığın hiçbir şeyi iddia etme.",
        checklist: [
          "İlk cümle olayı özetliyor mu?",
          "Kanıtın ne olduğunu ve nereden geldiğini yazdın mı?",
          "Şirketin görüşünü aktardın mı?",
          "Kanıtlanamayan noktayı açıkça belirttin mi?",
          "Kaynağı koruyacak biçimde yazdın mı?",
        ],
        minWords: 160,
        phrases: [
          { de: "Nach Informationen unserer Redaktion …", tr: "Gazetemizin edindiği bilgilere göre …", en: "According to information obtained by our editorial team …" },
          { de: "Das geht aus … hervor, die uns vorliegen.", tr: "Bu, elimizdeki …'den anlaşılıyor.", en: "This emerges from …, which are available to us." },
          { de: "Eine Mitarbeiterin, deren Name der Redaktion bekannt ist, sagt: …", tr: "Adı gazetemizce bilinen bir çalışan şöyle diyor: …", en: "An employee whose name is known to the editorial team says: …" },
          { de: "Das Unternehmen weist die Vorwürfe zurück.", tr: "Şirket suçlamaları reddediyor.", en: "The company rejects the accusations." },
          { de: "Ein kausaler Zusammenhang lässt sich nicht nachweisen.", tr: "Nedensel bir bağlantı kanıtlanamıyor.", en: "A causal connection cannot be proven." },
        ],
        sample:
          "Vier Beschäftigte eines Logistikzentrums in Nordkamp haben nach kritischen Wortmeldungen deutlich weniger Schichten erhalten. Das geht aus Schichtplänen von sechs Monaten hervor, die unserer Redaktion vorliegen.\n\nDie vier hatten im Oktober auf einer Betriebsversammlung Kritik geäußert — zwei an der Pausenregelung, zwei an unbezahlten Umkleidezeiten. Ab November sank ihre Zahl der Schichten um durchschnittlich 38 Prozent. Im selben Monat stellte der Betrieb laut internem Newsletter sechs neue Kräfte ein.\n\nEine Mitarbeiterin, deren Name der Redaktion bekannt ist, sagt: „Jeder kennt zwei, drei Namen, bei denen es passiert ist.“ Sie wollte nicht namentlich auftreten; über ihre Vertragsverlängerung wird im März entschieden.\n\nDas Unternehmen weist die Vorwürfe zurück. Arbeitszeiten würden „gesetzeskonform erfasst und vergütet“; für eine Benachteiligung lägen keine Belege vor. Für die Verträge der Leihkräfte seien die Dienstleister zuständig, Zahlen zur Fluktuation lägen nicht vor.\n\nEin kausaler Zusammenhang zwischen den Wortmeldungen und den Schichtplänen lässt sich mit den vorliegenden Unterlagen nicht nachweisen. Auffällig bleibt die zeitliche Nähe — und die gleichzeitige Einstellung neuer Beschäftigter.",
      },
    ],
  },
];
