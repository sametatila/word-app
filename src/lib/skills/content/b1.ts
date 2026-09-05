import type { SkillExercise } from "../types";
import { b1U01 } from "./b1-u01";
import { b1U02 } from "./b1-u02";
import { b1U03 } from "./b1-u03";
import { b1U04 } from "./b1-u04";
import { b1U05 } from "./b1-u05";
import { b1U06 } from "./b1-u06";
import { b1U07 } from "./b1-u07";
import { b1U08 } from "./b1-u08";
import { b1U09 } from "./b1-u09";

/**
 * B1 — okuma, dinleme ve yazma egzersizleri.
 *
 * Ünite hizalı dosyalar (`b1-uNN.ts`) dizinin BAŞINDA spread edilir: immersion
 * builder ünite slotlarını konuma göre dolduruyor, o yüzden ünite 1'in
 * okuma/dinleme/yazma slotlarını b1U01 doldurur. Eski genel B1 egzersizleri
 * arkada kalıp sonraki ünitelerin slotlarına akıyor.
 */
export const b1: SkillExercise[] = [
  ...b1U01,
  ...b1U02,
  ...b1U03,
  ...b1U04,
  ...b1U05,
  ...b1U06,
  ...b1U07,
  ...b1U08,
  ...b1U09,
  // ── Okuma ──────────────────────────────────────────────────────────────
  {
    id: "b1-r1",
    level: "B1",
    skill: "reading",
    title: "Zweites Leben für alte Geräte",
    genre: "Makale",
    intro: "Leipzig'deki bir tamir kafesini tanıtan bu gazete makalesini oku ve soruları yanıtla.",
    minutes: 5,
    text: "In Deutschland landen jedes Jahr Tausende Tonnen Elektrogeräte im Müll, obwohl viele davon noch repariert werden könnten. Gegen diese Verschwendung engagiert sich das Repair-Café in Leipzig-Plagwitz. Jeden ersten Samstag im Monat treffen sich dort ehrenamtliche Helferinnen und Helfer, die kaputte Toaster, Lampen oder Fahrräder gemeinsam mit den Besitzern reparieren.\n\n„Bei uns wird nichts einfach weggeworfen“, erklärt Organisatorin Karin Melzer. „Etwa siebzig Prozent der Geräte, die zu uns gebracht werden, funktionieren danach wieder.“ Die Reparatur selbst ist kostenlos, nur Ersatzteile müssen bezahlt werden. Wer möchte, kann eine kleine Spende dalassen, mit der Werkzeug und Miete finanziert werden.\n\nDas Angebot wird immer beliebter: Kamen im ersten Jahr rund zwanzig Besucher pro Termin, sind es heute oft mehr als sechzig. Melzer wünscht sich trotzdem mehr Unterstützung von der Stadt, zum Beispiel größere Räume. Außerdem sucht das Team dringend Freiwillige, die sich mit Computern auskennen, denn gerade elektronische Geräte werden immer häufiger gebracht.",
    gloss: [
      { de: "das Gerät", tr: "cihaz", en: "device" },
      { de: "die Verschwendung", tr: "israf", en: "waste" },
      { de: "ehrenamtlich", tr: "gönüllü", en: "voluntary" },
      { de: "das Ersatzteil", tr: "yedek parça", en: "spare part" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "das Werkzeug", tr: "alet", en: "tool" },
      { de: "die Miete", tr: "kira", en: "rent" },
      { de: "die Unterstützung", tr: "destek", en: "support" },
      { de: "der Freiwillige", tr: "gönüllü", en: "volunteer" },
      { de: "sich auskennen mit", tr: "bir konudan iyi anlamak", en: "to know a lot about" },
    ],
    questions: [
      {
        text: "Worum geht es in dem Text?",
        options: [
          "Um ein Geschäft, das gebrauchte Geräte verkauft",
          "Um ein Projekt, bei dem Geräte gemeinsam repariert werden",
          "Um eine Firma, die Elektromüll ins Ausland transportiert",
        ],
        answer: 1,
        explain: "Metin, Leipzig'deki Repair-Café'yi anlatıyor: gönüllüler bozuk eşyaları sahipleriyle birlikte tamir ediyor („gemeinsam mit den Besitzern reparieren“). Satış ya da nakliye söz konusu değil.",
      },
      {
        text: "Für die Reparatur selbst muss man nichts bezahlen, nur für Ersatzteile.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Metinde açıkça geçiyor: „Die Reparatur selbst ist kostenlos, nur Ersatzteile müssen bezahlt werden.“ Bağış ise tamamen isteğe bağlı.",
      },
      {
        text: "Wie viele der gebrachten Geräte funktionieren nach der Reparatur wieder?",
        options: ["Fast alle", "Etwa siebzig Prozent", "Weniger als die Hälfte"],
        answer: 1,
        explain: "Karin Melzer'in sözlerinde geçiyor: „Etwa siebzig Prozent der Geräte … funktionieren danach wieder.“",
      },
      {
        text: "Was wünscht sich Karin Melzer von der Stadt?",
        options: ["Größere Räume", "Mehr Geld für Ersatzteile", "Kostenlose Werbung"],
        answer: 0,
        explain: "Son paragrafta şehirden daha fazla destek istediği, örnek olarak da büyük mekân („zum Beispiel größere Räume“) verildiği belirtiliyor.",
      },
      {
        text: "Das Repair-Café sucht besonders Freiwillige, die sich mit Computern auskennen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Son cümlede ekibin acilen bilgisayardan anlayan gönüllüler aradığı yazıyor, çünkü elektronik cihazlar giderek daha sık getiriliyor.",
      },
    ],
  },
  {
    id: "b1-r2",
    level: "B1",
    skill: "reading",
    title: "Mein Monat ohne Instagram",
    genre: "Blog yazısı",
    intro: "Bir blog yazarının sosyal medyadan uzak geçirdiği bir ayı anlattığı bu yazıyı oku.",
    minutes: 4,
    text: "Vor sechs Wochen habe ich ein Experiment gestartet: einen Monat ohne Instagram, TikTok und Co. Der Grund war einfach — laut meiner Handy-Statistik verbrachte ich täglich fast drei Stunden in sozialen Netzwerken, oft ohne es zu merken.\n\nDie ersten Tage waren schwieriger als gedacht. Ständig griff ich automatisch zum Handy, nur um festzustellen, dass die Apps gelöscht waren. Nach etwa einer Woche wurde es besser. Ich las abends wieder Bücher, traf mich häufiger mit Freunden und schlief deutlich besser, weil ich das Handy nicht mehr mit ins Bett nahm.\n\nNatürlich gab es auch Nachteile. Von manchen Verabredungen erfuhr ich zu spät, weil sie nur in einer Gruppe gepostet wurden. Und ehrlich gesagt fehlten mir die lustigen Videos manchmal.\n\nMein Fazit: Ganz verzichten möchte ich nicht, aber ich habe mir feste Regeln gesetzt. Die Apps sind vom Startbildschirm verschwunden, und nach 21 Uhr bleibt das Handy in der Küche. Probiert es aus — es lohnt sich!",
    gloss: [
      { de: "das Experiment", tr: "deney", en: "experiment" },
      { de: "verbringen", tr: "geçirmek", en: "to spend" },
      { de: "feststellen", tr: "fark etmek", en: "to realize" },
      { de: "die Verabredung", tr: "buluşma", en: "meet-up" },
      { de: "erfahren von", tr: "bir şeyden haberdar olmak", en: "to find out about" },
      { de: "verzichten auf", tr: "bir şeyden vazgeçmek", en: "to give up" },
      { de: "das Fazit", tr: "sonuç", en: "conclusion" },
      { de: "die Regel", tr: "kural", en: "rule" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
    ],
    questions: [
      {
        text: "Warum hat die Autorin das Experiment gestartet?",
        options: [
          "Ihre Freunde haben es ihr empfohlen",
          "Ihr Handy war kaputt",
          "Sie verbrachte täglich sehr viel Zeit in sozialen Netzwerken",
        ],
        answer: 2,
        explain: "Gerekçe ilk paragrafta: telefon istatistiğine göre günde neredeyse üç saatini sosyal ağlarda geçiriyordu („fast drei Stunden in sozialen Netzwerken“).",
      },
      {
        text: "Der Verzicht fiel der Autorin von Anfang an leicht.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersi: „Die ersten Tage waren schwieriger als gedacht“ — ilk günler beklediğinden zor geçmiş, ancak bir hafta sonra rahatlamış.",
      },
      {
        text: "Was war ein Vorteil des Experiments?",
        options: [
          "Sie hat deutlich besser geschlafen",
          "Sie hat neue Apps entdeckt",
          "Sie hat mehr Zeit im Internet verbracht",
        ],
        answer: 0,
        explain: "İkinci paragrafta telefonu yatağa götürmediği için çok daha iyi uyuduğunu („schlief deutlich besser“) yazıyor.",
      },
      {
        text: "Welchen Nachteil nennt die Autorin?",
        options: [
          "Ihre Freunde waren beleidigt",
          "Sie erfuhr von manchen Verabredungen zu spät",
          "Sie konnte nicht mehr für die Arbeit recherchieren",
        ],
        answer: 1,
        explain: "Dezavantaj olarak bazı buluşmalardan geç haberdar olduğunu söylüyor, çünkü bunlar yalnızca bir grupta paylaşılıyordu.",
      },
      {
        text: "Wie benutzt die Autorin soziale Netzwerke heute?",
        options: [
          "Gar nicht mehr",
          "Genauso wie früher",
          "Mit festen Regeln, zum Beispiel ohne Handy nach 21 Uhr",
        ],
        answer: 2,
        explain: "Sonuç bölümünde tamamen bırakmak istemediğini ama kendine kesin kurallar koyduğunu belirtiyor: uygulamalar ana ekrandan kalktı, akşam 21'den sonra telefon mutfakta kalıyor.",
      },
    ],
  },
  {
    id: "b1-r3",
    level: "B1",
    skill: "reading",
    title: "Ihr Praktikum bei Medienhaus Süd",
    genre: "E-posta",
    intro: "Bir yayınevinin staj başvurusuna verdiği bu yarı resmi yanıtı oku ve ayrıntıları yakala.",
    minutes: 4,
    text: "Liebe Frau Yılmaz,\n\nvielen Dank für Ihre Bewerbung um ein Praktikum in unserer Online-Redaktion. Wir freuen uns, Ihnen mitteilen zu können, dass wir Ihnen den Platz anbieten möchten. Das Praktikum beginnt am 1. März und dauert acht Wochen. Die Arbeitszeit ist montags bis freitags von 9 bis 15 Uhr, an zwei Tagen pro Woche können Sie von zu Hause arbeiten.\n\nIn den ersten zwei Wochen werden Sie von unserer Redakteurin Frau Sommer betreut. Sie zeigt Ihnen, wie Artikel für unsere Webseite geschrieben und Fotos bearbeitet werden. Danach dürfen Sie eigene kleine Beiträge veröffentlichen.\n\nLeider können wir das Praktikum nicht bezahlen, aber Sie erhalten ein Ticket für den Nahverkehr und ein Mittagessen in unserer Kantine. Bitte teilen Sie uns bis zum 15. Februar mit, ob Sie das Angebot annehmen. Falls Sie noch Fragen haben, können Sie mich gern anrufen.\n\nMit freundlichen Grüßen\nKatrin Albrecht\nPersonalabteilung",
    gloss: [
      { de: "die Bewerbung", tr: "başvuru", en: "application" },
      { de: "das Praktikum", tr: "staj", en: "internship" },
      { de: "die Redaktion", tr: "yazı işleri", en: "editorial office" },
      { de: "betreuen", tr: "ilgilenmek", en: "to look after" },
      { de: "bearbeiten", tr: "düzenlemek", en: "to edit" },
      { de: "der Beitrag", tr: "yazı", en: "post" },
      { de: "veröffentlichen", tr: "yayımlamak", en: "to publish" },
      { de: "der Nahverkehr", tr: "toplu taşıma", en: "local public transport" },
      { de: "die Kantine", tr: "yemekhane", en: "cafeteria" },
      { de: "ein Angebot annehmen", tr: "bir teklifi kabul etmek", en: "to accept an offer" },
    ],
    questions: [
      {
        text: "Warum schreibt Frau Albrecht diese E-Mail?",
        options: [
          "Sie lädt Frau Yılmaz zu einem Vorstellungsgespräch ein",
          "Sie sagt das Praktikum leider ab",
          "Sie bietet Frau Yılmaz einen Praktikumsplatz an",
        ],
        answer: 2,
        explain: "İlk paragrafta açıkça yazıyor: „dass wir Ihnen den Platz anbieten möchten“ — staj yeri teklif ediliyor, görüşme daveti ya da ret söz konusu değil.",
      },
      {
        text: "Frau Yılmaz muss an allen fünf Arbeitstagen ins Büro kommen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: haftada iki gün evden çalışabilir („an zwei Tagen pro Woche können Sie von zu Hause arbeiten“).",
      },
      {
        text: "Welche Aufgabe hat Frau Sommer?",
        options: [
          "Sie betreut Frau Yılmaz in den ersten zwei Wochen",
          "Sie leitet die Personalabteilung",
          "Sie organisiert das Mittagessen in der Kantine",
        ],
        answer: 0,
        explain: "İkinci paragrafa göre ilk iki hafta redaktör Frau Sommer rehberlik edecek; personel bölümünü yöneten kişi ise e-postayı yazan Frau Albrecht.",
      },
      {
        text: "Was bekommt Frau Yılmaz für ihre Arbeit?",
        options: [
          "Ein monatliches Gehalt",
          "Ein Nahverkehrsticket und ein Mittagessen",
          "Einen eigenen Laptop",
        ],
        answer: 1,
        explain: "Staj ücretsiz („können wir das Praktikum nicht bezahlen“), ama toplu taşıma bileti ve yemekhanede öğle yemeği veriliyor.",
      },
      {
        text: "Bis wann soll Frau Yılmaz antworten?",
        options: ["Bis zum 1. März", "Innerhalb von acht Wochen", "Bis zum 15. Februar"],
        answer: 2,
        explain: "Son paragrafta teklifi kabul edip etmediğini 15 Şubat'a kadar bildirmesi isteniyor. 1 Mart stajın başlangıcı, sekiz hafta ise süresi — tipik çeldiriciler.",
      },
    ],
  },
  {
    id: "b1-r4",
    level: "B1",
    skill: "reading",
    title: "Gesund essen im Büroalltag",
    genre: "Kılavuz",
    intro: "Tüketici danışma merkezinin ofis çalışanlarına yönelik beslenme önerilerini oku.",
    minutes: 4,
    text: "Wer den ganzen Tag im Büro sitzt, greift in der Mittagspause oft zu Fast Food oder Fertiggerichten. Dabei lässt sich gesunde Ernährung auch mit wenig Zeit organisieren. Die Verbraucherzentrale Hessen gibt dazu einige praktische Tipps.\n\nErstens: Planen Sie Ihre Mahlzeiten am Wochenende. Wenn Suppen oder Salate schon vorbereitet sind, müssen sie am Abend nur noch eingepackt werden. Dieses sogenannte Meal-Prep spart nicht nur Zeit, sondern auch Geld, weil weniger Lebensmittel weggeworfen werden.\n\nZweitens: Trinken Sie genug. Viele Beschäftigte trinken zu wenig, was zu Kopfschmerzen und Müdigkeit führen kann. Eine Flasche Wasser auf dem Schreibtisch hilft, daran zu denken.\n\nDrittens: Essen Sie nicht am Arbeitsplatz. Wer vor dem Bildschirm isst, isst meistens schneller und mehr. Besser ist eine echte Pause, am besten mit einem kurzen Spaziergang.\n\nÜbrigens: Süßigkeiten müssen nicht komplett verboten werden. Ein Stück Schokolade am Nachmittag ist erlaubt — es sollte nur nicht die ganze Tafel sein.",
    gloss: [
      { de: "die Ernährung", tr: "beslenme", en: "nutrition" },
      { de: "das Fertiggericht", tr: "hazır yemek", en: "ready meal" },
      { de: "die Mahlzeit", tr: "öğün", en: "meal" },
      { de: "vorbereiten", tr: "hazırlamak", en: "to prepare" },
      { de: "einpacken", tr: "paketlemek", en: "to pack" },
      { de: "der Beschäftigte", tr: "çalışan", en: "employee" },
      { de: "die Müdigkeit", tr: "yorgunluk", en: "tiredness" },
      { de: "der Bildschirm", tr: "ekran", en: "screen" },
      { de: "der Spaziergang", tr: "yürüyüş", en: "walk" },
      { de: "die Tafel Schokolade", tr: "tablet çikolata", en: "bar of chocolate" },
    ],
    questions: [
      {
        text: "An wen richtet sich der Text vor allem?",
        options: [
          "An Menschen, die im Büro arbeiten",
          "An Köchinnen und Köche in Kantinen",
          "An Sportlerinnen und Sportler",
        ],
        answer: 0,
        explain: "Metin ilk cümlede hedef kitleyi belirtiyor: bütün gün ofiste oturanlar („Wer den ganzen Tag im Büro sitzt“).",
      },
      {
        text: "Welchen Vorteil hat Meal-Prep laut dem Text?",
        options: [
          "Das Essen schmeckt besser",
          "Man spart Zeit und Geld",
          "Man muss nie mehr kochen",
        ],
        answer: 1,
        explain: "İkinci paragrafa göre Meal-Prep hem zaman hem para kazandırıyor („spart nicht nur Zeit, sondern auch Geld“), çünkü daha az yiyecek çöpe gidiyor.",
      },
      {
        text: "Wer zu wenig trinkt, kann Kopfschmerzen und Müdigkeit bekommen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Üçüncü paragrafta az su içmenin baş ağrısına ve yorgunluğa yol açabileceği („was zu Kopfschmerzen und Müdigkeit führen kann“) söyleniyor.",
      },
      {
        text: "Warum soll man nicht am Schreibtisch essen?",
        options: [
          "Weil es in vielen Büros verboten ist",
          "Weil sich die Kollegen gestört fühlen",
          "Weil man dort schneller und mehr isst",
        ],
        answer: 2,
        explain: "Gerekçe metinde: ekran karşısında yemek yiyen kişi genellikle daha hızlı ve daha çok yer („isst meistens schneller und mehr“). Yasak ya da rahatsız olan meslektaşlardan söz edilmiyor.",
      },
      {
        text: "Der Text empfiehlt, komplett auf Süßigkeiten zu verzichten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: tatlılar tamamen yasak değil („müssen nicht komplett verboten werden“) — öğleden sonra bir parça çikolataya izin var, yeter ki bütün tablet olmasın.",
      },
    ],
  },
  {
    id: "b1-r5",
    level: "B1",
    skill: "reading",
    title: "Mehr Platz für Menschen statt Autos",
    genre: "Okur mektubu",
    intro: "Yaya bölgesi tartışmasına katılan bir okurun gazeteye yazdığı mektubu oku.",
    minutes: 4,
    text: "Leserbrief zum Artikel „Streit um die neue Fußgängerzone“ vom 12. Mai\n\nSehr geehrte Redaktion,\n\nmit großem Interesse habe ich Ihren Artikel über die geplante Fußgängerzone in der Bahnhofstraße gelesen. Als Anwohnerin kann ich die Kritik einiger Geschäftsleute nicht verstehen. Sie befürchten, dass weniger Kunden kommen, wenn man nicht mehr direkt vor den Läden parken kann. Studien aus anderen Städten zeigen jedoch das Gegenteil: Wo weniger Autos fahren, bleiben die Menschen länger und kaufen sogar mehr ein.\n\nIch wohne seit fünfzehn Jahren in dieser Straße und erlebe den Lärm und die schlechte Luft jeden Tag. Meine Kinder können hier nicht draußen spielen, weil ständig Autos vorbeifahren. Eine Fußgängerzone mit Bänken und Bäumen würde die Lebensqualität für alle verbessern.\n\nNatürlich müssen auch Lösungen für ältere Menschen gefunden werden, die nicht gut zu Fuß unterwegs sind. Ein kleiner Elektrobus, wie es ihn in Freiburg gibt, wäre eine Möglichkeit.\n\nMit freundlichen Grüßen\nSabine Krüger",
    gloss: [
      { de: "der Leserbrief", tr: "okur mektubu", en: "letter to the editor" },
      { de: "die Fußgängerzone", tr: "yaya bölgesi", en: "pedestrian zone" },
      { de: "die Anwohnerin", tr: "mahalle sakini", en: "local resident" },
      { de: "die Geschäftsleute", tr: "esnaf", en: "shopkeepers" },
      { de: "befürchten", tr: "endişe etmek", en: "to fear" },
      { de: "das Gegenteil", tr: "tersi", en: "opposite" },
      { de: "der Lärm", tr: "gürültü", en: "noise" },
      { de: "die Lebensqualität", tr: "yaşam kalitesi", en: "quality of life" },
      { de: "die Lösung", tr: "çözüm", en: "solution" },
      { de: "zu Fuß unterwegs sein", tr: "yaya olarak dolaşmak", en: "to get around on foot" },
    ],
    questions: [
      {
        text: "Welche Meinung vertritt Sabine Krüger?",
        options: [
          "Sie ist gegen die geplante Fußgängerzone",
          "Sie unterstützt die geplante Fußgängerzone",
          "Sie findet das Thema nicht wichtig",
        ],
        answer: 1,
        explain: "Mektubun tamamı yaya bölgesini savunuyor: esnafın eleştirisini anlamadığını söylüyor ve bölgenin yaşam kalitesini artıracağını („würde die Lebensqualität für alle verbessern“) yazıyor.",
      },
      {
        text: "Was befürchten einige Geschäftsleute?",
        options: [
          "Dass die Mieten steigen",
          "Dass die Straße zu laut wird",
          "Dass weniger Kunden kommen",
        ],
        answer: 2,
        explain: "İlk paragrafa göre esnaf, dükkânların önüne park edilemeyince müşteri sayısının düşmesinden korkuyor („dass weniger Kunden kommen“).",
      },
      {
        text: "Laut Studien kaufen Menschen in autofreien Straßen sogar mehr ein.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Frau Krüger başka şehirlerdeki araştırmalara dayanıyor: az araba geçen yerlerde insanlar daha uzun kalıyor ve daha çok alışveriş yapıyor („bleiben die Menschen länger und kaufen sogar mehr ein“).",
      },
      {
        text: "Welches Problem erlebt Frau Krüger in ihrer Straße?",
        options: [
          "Lärm und schlechte Luft",
          "Zu wenige Geschäfte",
          "Fehlende Parkplätze für Anwohner",
        ],
        answer: 0,
        explain: "İkinci paragrafta on beş yıldır bu sokakta yaşadığını, her gün gürültüye ve kötü havaya („den Lärm und die schlechte Luft“) maruz kaldığını anlatıyor.",
      },
      {
        text: "Was schlägt sie für ältere Menschen vor?",
        options: [
          "Einen kostenlosen Lieferservice",
          "Einen kleinen Elektrobus wie in Freiburg",
          "Mehr Parkplätze direkt vor den Läden",
        ],
        answer: 1,
        explain: "Son paragrafta yürümekte zorlanan yaşlılar için Freiburg'daki gibi küçük bir elektrikli otobüsü çözüm olarak öneriyor.",
      },
    ],
  },
  {
    id: "b1-r6",
    level: "B1",
    skill: "reading",
    title: "Vier Tage arbeiten, fünf Tage bezahlt werden",
    genre: "Dergi makalesi",
    intro: "Dört günlük çalışma haftasını deneyen şirketleri konu alan bu dergi makalesini oku.",
    minutes: 5,
    text: "Immer mehr deutsche Unternehmen testen die Vier-Tage-Woche. Die Idee: Die Beschäftigten arbeiten nur noch vier Tage, bekommen aber das gleiche Gehalt wie vorher. Eine der ersten Firmen war die Werbeagentur „Kolibri“ aus Köln, die das Modell seit zwei Jahren anbietet.\n\nGeschäftsführer Jan Petersen ist zufrieden: „Unsere Mitarbeiterinnen und Mitarbeiter sind seltener krank und deutlich motivierter. Außerdem bekommen wir viel mehr Bewerbungen als früher.“ Damit die Arbeit trotzdem geschafft wird, wurden die Meetings verkürzt und viele Aufgaben digitalisiert.\n\nDoch nicht überall funktioniert das Modell. In Krankenhäusern, Schulen oder im Handwerk kann die Arbeit nicht einfach auf vier Tage verteilt werden, weil die Menschen dort täglich gebraucht werden. Kritiker warnen außerdem, dass der Stress steigen könnte, wenn dieselbe Arbeit in kürzerer Zeit erledigt werden muss.\n\nEine aktuelle Umfrage zeigt trotzdem klare Zahlen: 71 Prozent der Beschäftigten in Deutschland würden gern vier Tage pro Woche arbeiten — die meisten allerdings nur, wenn das Gehalt gleich bleibt.",
    gloss: [
      { de: "das Unternehmen", tr: "şirket", en: "company" },
      { de: "der Beschäftigte", tr: "çalışan", en: "employee" },
      { de: "das Gehalt", tr: "maaş", en: "salary" },
      { de: "die Werbeagentur", tr: "reklam ajansı", en: "advertising agency" },
      { de: "der Geschäftsführer", tr: "genel müdür", en: "managing director" },
      { de: "die Bewerbung", tr: "başvuru", en: "application" },
      { de: "verkürzen", tr: "kısaltmak", en: "to shorten" },
      { de: "verteilen auf", tr: "bir şeye yaymak", en: "to spread over" },
      { de: "das Handwerk", tr: "zanaat", en: "skilled trades" },
      { de: "erledigen", tr: "halletmek", en: "to take care of" },
      { de: "die Umfrage", tr: "anket", en: "survey" },
    ],
    questions: [
      {
        text: "Was bedeutet die Vier-Tage-Woche bei der Agentur „Kolibri“?",
        options: [
          "Man arbeitet vier Tage und verdient entsprechend weniger",
          "Man arbeitet nur vier Stunden pro Tag",
          "Man arbeitet vier Tage bei gleichem Gehalt",
        ],
        answer: 2,
        explain: "Model ilk paragrafta tanımlanıyor: çalışanlar dört gün çalışıyor ama önceki maaşın aynısını alıyor („bekommen aber das gleiche Gehalt wie vorher“).",
      },
      {
        text: "Welche Erfahrung hat Geschäftsführer Petersen gemacht?",
        options: [
          "Die Mitarbeiter sind seltener krank und motivierter",
          "Die Firma bekommt weniger Bewerbungen",
          "Die Meetings dauern jetzt länger",
        ],
        answer: 0,
        explain: "Petersen'in sözlerinde geçiyor: çalışanlar daha az hastalanıyor ve daha motive („seltener krank und deutlich motivierter“); başvurular da azalmadı, arttı.",
      },
      {
        text: "In Krankenhäusern und Schulen lässt sich das Modell leicht einführen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: üçüncü paragrafa göre hastane, okul ve zanaat işlerinde iş dört güne kolayca bölünemez, çünkü oralarda insanlara her gün ihtiyaç var.",
      },
      {
        text: "Wovor warnen Kritiker?",
        options: [
          "Vor höheren Kosten für die Firmen",
          "Vor mehr Stress in kürzerer Arbeitszeit",
          "Vor weniger Urlaubstagen",
        ],
        answer: 1,
        explain: "Eleştirmenler, aynı işin daha kısa sürede bitirilmesi gerekirse stresin artabileceği („dass der Stress steigen könnte“) konusunda uyarıyor.",
      },
      {
        text: "Die meisten Beschäftigten möchten die Vier-Tage-Woche nur, wenn das Gehalt gleich bleibt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Son cümle bunu doğruluyor: yüzde 71 dört gün çalışmak istiyor, ama çoğu yalnızca maaş aynı kalırsa („nur, wenn das Gehalt gleich bleibt“).",
      },
    ],
  },

  // ── Dinleme ────────────────────────────────────────────────────────────
  // ── Hikâye dizisi: Tarek küçük bir kafe açıyor. B1'in yeni alıştırmalarında
  //    fikir → resmî işlem → banka → açılış sırası takip edilir.
  {
    id: "b1-r7",
    level: "B1",
    skill: "reading",
    title: "Tareks Plan",
    genre: "Forum",
    intro:
      "Tarek küçük bir kafe açmak istiyor ve bir girişimci forumunda akıl danışıyor. Soru ve iki cevabı okuyacaksın.",
    gloss: [
      { de: "sich selbstständig machen", tr: "kendi işini kurmak", en: "to start one's own business" },
      { de: "die Ersparnisse", tr: "birikim", en: "savings" },
      { de: "der Kredit", tr: "kredi", en: "loan" },
      { de: "die Miete", tr: "kira", en: "rent" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
      { de: "die Konkurrenz", tr: "rekabet", en: "competition" },
      { de: "abraten", tr: "tavsiye etmemek", en: "to advise against" },
      { de: "die Genehmigung", tr: "resmî izin", en: "permit" },
    ],
    minutes: 5,
    text:
      "TAREK_87: Ich arbeite seit sechs Jahren als Koch, immer für andere. Jetzt will ich mich selbstständig machen — ein kleines Café mit syrischem Frühstück, 20 Plätze. Ich habe 18.000 Euro Ersparnisse. Ein Laden im Viertel kostet 1.400 Euro Miete. Ist das verrückt?\n\nMARIE_G: Verrückt nicht, aber knapp. Rechne nicht nur mit der Miete: Kaution (meistens drei Monatsmieten), Umbau, Küche, Versicherung, Steuerberater. Bei mir war der Umbau doppelt so teuer wie geplant — das ist fast immer so. Und die ersten sechs Monate verdienst du nichts. Plane Geld zum Leben ein, sonst arbeitest du unter Druck und triffst schlechte Entscheidungen.\n\nHASSAN_K: Ich rate dir nicht ab, im Gegenteil. Aber mach zwei Dinge, bevor du unterschreibst. Erstens: Steh eine Woche lang zu verschiedenen Zeiten vor dem Laden und zähle, wie viele Menschen vorbeigehen. Zweitens: Frag beim Gewerbeamt, welche Genehmigungen du brauchst — bei Essen sind es mehr, als du denkst. Ich habe drei Monate verloren, weil ich das erst hinterher gemacht habe.\n\nTAREK_87: Danke euch. Ich glaube, ich zähle erst mal Menschen.",
    questions: [
      {
        text: "Was ist Tareks Plan?",
        options: [
          "Ein kleines Café mit syrischem Frühstück",
          "Ein Restaurant mit 100 Plätzen",
          "Ein Lieferdienst",
        ],
        answer: 0,
        explain: "„ein kleines Café mit syrischem Frühstück, 20 Plätze“.",
      },
      {
        text: "Wovor warnt Marie?",
        options: [
          "Die Nebenkosten und die ersten Monate ohne Verdienst",
          "Der Standort ist schlecht",
          "Syrisches Essen verkauft sich nicht",
        ],
        answer: 0,
        explain:
          "Depozito, tadilat, mutfak, sigorta, mali müşavir ve ilk altı ay gelirsizlik.",
      },
      {
        text: "Was sagt Marie über den Umbau?",
        options: [
          "Er war doppelt so teuer wie geplant",
          "Er war günstiger als geplant",
          "Sie hat ihn selbst gemacht",
        ],
        answer: 0,
        explain: "„Bei mir war der Umbau doppelt so teuer wie geplant — das ist fast immer so.“",
      },
      {
        text: "Was rät Hassan als Erstes?",
        options: [
          "Eine Woche lang zählen, wie viele Menschen vorbeigehen",
          "Sofort den Vertrag unterschreiben",
          "Einen Kredit aufnehmen",
        ],
        answer: 0,
        explain: "Farklı saatlerde dükkânın önünde durup geçen insanları saymasını öneriyor.",
      },
      {
        text: "Warum hat Hassan drei Monate verloren?",
        options: [
          "Er hat sich zu spät um Genehmigungen gekümmert",
          "Er hat den falschen Laden gemietet",
          "Er hatte keinen Kredit",
        ],
        answer: 0,
        explain: "„Ich habe drei Monate verloren, weil ich das erst hinterher gemacht habe.“",
      },
    ],
  },
  {
    id: "b1-r8",
    level: "B1",
    skill: "reading",
    title: "Gewerbeanmeldung: Was Sie brauchen",
    genre: "Rehber",
    intro:
      "Almanya'da iş kurmanın ilk adımı. Belediyenin bilgilendirme sayfasını okuyacaksın.",
    gloss: [
      { de: "das Gewerbe", tr: "ticari işletme", en: "business" },
      { de: "anmelden", tr: "kaydettirmek", en: "to register" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
      { de: "das Führungszeugnis", tr: "adli sicil kaydı", en: "criminal record certificate" },
      { de: "die Erlaubnis", tr: "izin", en: "permission" },
      { de: "das Finanzamt", tr: "vergi dairesi", en: "tax office" },
      { de: "die Steuernummer", tr: "vergi numarası", en: "tax number" },
      { de: "automatisch", tr: "otomatik", en: "automatic" },
    ],
    minutes: 5,
    text:
      "Wer in Deutschland ein Gewerbe betreibt, muss es anmelden — vor dem ersten Arbeitstag, nicht danach.\n\nSie brauchen: Personalausweis oder Pass, das ausgefüllte Formular und 26 Euro Gebühr. Bei Gastronomie kommen zwei Dinge dazu: ein Führungszeugnis und die Gaststättenerlaubnis. Wenn Sie Lebensmittel zubereiten, brauchen Sie außerdem eine Belehrung vom Gesundheitsamt — die dauert etwa eine Stunde und gilt lebenslang.\n\nWas viele überrascht: Sie müssen sich nicht selbst beim Finanzamt melden. Das Gewerbeamt informiert es automatisch. Danach schickt Ihnen das Finanzamt einen Fragebogen, in dem Sie Ihren erwarteten Gewinn schätzen. Nehmen Sie diese Schätzung ernst: Sie bestimmt, wie viel Steuer Sie im Voraus zahlen.\n\nDie Anmeldung selbst dauert 15 Minuten. Die Erlaubnis für Gastronomie dagegen kann sechs bis zwölf Wochen brauchen. Planen Sie diese Zeit ein, bevor Sie einen Mietvertrag unterschreiben.\n\nTipp: Die meisten Städte bieten eine kostenlose Erstberatung für Gründerinnen und Gründer an. Sie dauert eine Stunde und spart oft mehrere Wochen.",
    questions: [
      {
        text: "Wann muss man das Gewerbe anmelden?",
        options: [
          "Vor dem ersten Arbeitstag",
          "Im ersten Monat",
          "Am Ende des Jahres",
        ],
        answer: 0,
        explain: "„vor dem ersten Arbeitstag, nicht danach.“",
      },
      {
        text: "Was braucht man zusätzlich in der Gastronomie?",
        options: [
          "Führungszeugnis und Gaststättenerlaubnis",
          "Nur einen Pass",
          "Einen Kredit",
        ],
        answer: 0,
        explain: "Ayrıca gıda hazırlanıyorsa sağlık müdürlüğünden eğitim belgesi.",
      },
      {
        text: "Wie kommt man an die Steuernummer?",
        options: [
          "Das Gewerbeamt informiert das Finanzamt automatisch",
          "Man muss selbst hingehen",
          "Man bekommt keine",
        ],
        answer: 0,
        explain: "„Sie müssen sich nicht selbst beim Finanzamt melden.“",
      },
      {
        text: "Warum ist die Gewinnschätzung wichtig?",
        options: [
          "Sie bestimmt die Steuervorauszahlung",
          "Sie entscheidet über die Erlaubnis",
          "Sie ist nur eine Formalität",
        ],
        answer: 0,
        explain: "„Sie bestimmt, wie viel Steuer Sie im Voraus zahlen.“",
      },
      {
        text: "Was dauert am längsten?",
        options: [
          "Die Gaststättenerlaubnis",
          "Die Gewerbeanmeldung",
          "Die Belehrung vom Gesundheitsamt",
        ],
        answer: 0,
        explain: "Kayıt 15 dakika, sağlık eğitimi bir saat; işletme izni 6–12 hafta.",
      },
    ],
  },
  {
    id: "b1-r9",
    level: "B1",
    skill: "reading",
    title: "Duzen oder siezen?",
    genre: "Kültür",
    intro:
      "Almanca öğrenen herkesin en çok tereddüt ettiği konu: „du“ mu „Sie“ mi? Bu yazı kuralın nasıl değiştiğini anlatıyor.",
    gloss: [
      { de: "duzen", tr: "sen diye hitap etmek", en: "to address informally" },
      { de: "siezen", tr: "siz diye hitap etmek", en: "to address formally" },
      { de: "anbieten", tr: "sunmak", en: "to offer" },
      { de: "die Anrede", tr: "hitap", en: "salutation" },
      { de: "unhöflich", tr: "nezaketsiz", en: "impolite" },
      { de: "die Branche", tr: "sektör", en: "industry" },
      { de: "zurücknehmen", tr: "geri almak", en: "to take back" },
      { de: "die Faustregel", tr: "genel kural", en: "rule of thumb" },
    ],
    minutes: 5,
    text:
      "Für Deutschlernende ist es eine der schwersten Fragen — und für viele Deutsche inzwischen auch.\n\nDie alte Regel war einfach: Erwachsene, die man nicht kennt, siezt man. Geduzt wurde in der Familie, unter Freunden und unter Kindern. Wer wechseln wollte, musste warten: Das „du“ bietet die ältere Person an, im Beruf die höhere Position.\n\nDiese Regel gilt noch — aber nicht überall. In der IT-Branche, in Start-ups, in Sportgeschäften und bei IKEA werden alle geduzt, vom Praktikanten bis zur Chefin. In einer Bank, bei einer Behörde oder beim Arzt wäre das dagegen ein Fehler.\n\nDas Problem: Ein „du“ kann man nicht mehr zurücknehmen. Wer zu früh duzt, wirkt schnell zu vertraulich. Wer zu lange siezt, wirkt kalt — aber das ist der kleinere Fehler und leicht zu korrigieren.\n\nDie Faustregel lautet deshalb: Siezen Sie, bis Ihnen das „du“ angeboten wird. Und wenn Sie unsicher sind, hilft ein einfacher Satz: „Sagen wir du oder Sie?“ Fast niemand findet diese Frage unhöflich — im Gegenteil, sie zeigt, dass Sie aufmerksam sind.",
    questions: [
      {
        text: "Wer bietet nach der alten Regel das „du“ an?",
        options: [
          "Die ältere Person oder die höhere Position",
          "Die jüngere Person",
          "Beide gleichzeitig",
        ],
        answer: 0,
        explain: "„Das „du“ bietet die ältere Person an, im Beruf die höhere Position.“",
      },
      {
        text: "Wo wird heute fast immer geduzt?",
        options: [
          "In Start-ups, in der IT, bei IKEA",
          "Bei Behörden",
          "Beim Arzt",
        ],
        answer: 0,
        explain: "Metin bu sektörleri sayıyor; banka, resmî kurum ve doktorda tersi geçerli.",
      },
      {
        text: "Warum ist zu frühes Duzen ein Problem?",
        options: [
          "Man kann ein „du“ nicht zurücknehmen",
          "Es ist verboten",
          "Es ist zu formell",
        ],
        answer: 0,
        explain: "„Ein „du“ kann man nicht mehr zurücknehmen.“",
      },
      {
        text: "Welcher Fehler ist laut Text kleiner?",
        options: [
          "Zu lange siezen",
          "Zu früh duzen",
          "Beide sind gleich schlimm",
        ],
        answer: 0,
        explain: "Soğuk görünmek, fazla senli benli olmaktan daha kolay düzeltilir.",
      },
      {
        text: "Was empfiehlt der Text bei Unsicherheit?",
        options: [
          "Direkt fragen: „Sagen wir du oder Sie?“",
          "Immer duzen",
          "Die Anrede vermeiden",
        ],
        answer: 0,
        explain: "„Fast niemand findet diese Frage unhöflich.“",
      },
    ],
  },
  {
    id: "b1-r10",
    level: "B1",
    skill: "reading",
    title: "Überschriften zuordnen",
    genre: "Sınav formatı",
    intro:
      "B1 sınavının klasik görevi: kısa metinlere doğru başlığı bulmak. Beş kısa haber, altı başlık — biri fazla.",
    gloss: [
      { de: "die Überschrift", tr: "başlık", en: "headline" },
      { de: "zuordnen", tr: "eşleştirmek", en: "to match" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "die Baustelle", tr: "şantiye", en: "construction site" },
      { de: "die Umfrage", tr: "anket", en: "survey" },
      { de: "sinken", tr: "düşmek", en: "to drop" },
      { de: "der Antrag", tr: "başvuru", en: "application" },
    ],
    minutes: 5,
    text:
      "TEXT 1: Ab September fährt die Linie 4 auch am Wochenende alle zehn Minuten. Die Stadt reagiert damit auf viele Beschwerden aus den Außenbezirken.\n\nTEXT 2: Nach drei Jahren ist die Sanierung der Grundschule Nord fertig. Die Klassen ziehen in den Ferien zurück, der Unterricht beginnt wie geplant.\n\nTEXT 3: Die Zahl der Fahrraddiebstähle ist im letzten Jahr um 18 Prozent gesunken. Die Polizei erklärt das mit den neuen Abstellplätzen am Bahnhof.\n\nTEXT 4: Beim Stadtfest sind 12.400 Euro zusammengekommen. Das Geld geht an das Frauenhaus, das seit Jahren zu wenig Platz hat.\n\nTEXT 5: Wer Hilfe beim Heizen braucht, kann bis Ende Oktober einen Antrag stellen. Formulare gibt es online und im Rathaus.\n\nÜBERSCHRIFTEN:\na) Weniger Fahrräder gestohlen\nb) Mehr Busse am Wochenende\nc) Schule wieder offen\nd) Fest bringt Geld für den guten Zweck\ne) Neue Baustelle am Bahnhof\nf) Unterstützung beantragen — Frist läuft",
    questions: [
      {
        text: "Welche Überschrift passt zu Text 1?",
        options: ["b", "e", "c"],
        answer: 0,
        explain: "4 numaralı hat hafta sonu on dakikada bir — yani daha sık sefer.",
      },
      {
        text: "Welche Überschrift passt zu Text 3?",
        options: ["a", "e", "f"],
        answer: 0,
        explain: "Bisiklet hırsızlığı %18 azalmış.",
      },
      {
        text: "Welche Überschrift passt zu Text 4?",
        options: ["d", "f", "b"],
        answer: 0,
        explain: "Şenlikte toplanan 12.400 euro kadın sığınmaevine gidiyor.",
      },
      {
        text: "Welche Überschrift passt zu Text 5?",
        options: ["f", "d", "a"],
        answer: 0,
        explain: "Ekim sonuna kadar ısınma desteği başvurusu — süre vurgusu var.",
      },
      {
        text: "Welche Überschrift bleibt übrig?",
        options: ["e", "c", "b"],
        answer: 0,
        explain:
          "„Neue Baustelle am Bahnhof“ hiçbir metne uymuyor: 3. metinde gardan söz ediliyor ama şantiye yok.",
      },
    ],
  },
  {
    id: "b1-r11",
    level: "B1",
    skill: "reading",
    title: "Die Antwort von der Bank",
    genre: "Resmî yazı",
    intro:
      "Hikâyenin devamı: Tarek kredi başvurusu yaptı. Bankanın cevabını okuyacaksın — tam bir „evet“ değil.",
    gloss: [
      { de: "der Kreditantrag", tr: "kredi başvurusu", en: "loan application" },
      { de: "bewilligen", tr: "onaylamak", en: "to approve" },
      { de: "die Sicherheit", tr: "teminat", en: "collateral" },
      { de: "die Bürgschaft", tr: "kefalet", en: "guarantee" },
      { de: "die Laufzeit", tr: "vade", en: "term" },
      { de: "der Zinssatz", tr: "faiz oranı", en: "interest rate" },
      { de: "die Tilgung", tr: "anapara ödemesi", en: "principal repayment" },
      { de: "die Voraussetzung", tr: "ön koşul", en: "prerequisite" },
    ],
    minutes: 5,
    text:
      "Sehr geehrter Herr Haddad,\n\nvielen Dank für Ihren Kreditantrag vom 4. April und für das ausführliche Gespräch.\n\nIhr Konzept hat uns überzeugt: Der Standort ist gut gewählt, und Ihre Zahlen sind vorsichtig gerechnet — das sehen wir selten. Trotzdem können wir den Antrag nicht in voller Höhe bewilligen.\n\nBeantragt: 45.000 Euro. Wir bieten Ihnen 30.000 Euro an.\n\nDer Grund ist Ihre Sicherheit. Sie bringen 18.000 Euro eigenes Geld mit, das ist gut. Sie haben aber keine weiteren Sicherheiten. Für die vollen 45.000 Euro bräuchten wir entweder eine Bürgschaft oder eine Zusage der Förderbank, die Gründungen in der Gastronomie unterstützt.\n\nKonditionen für die 30.000 Euro: Laufzeit 7 Jahre, Zinssatz 5,4 Prozent, tilgungsfrei in den ersten sechs Monaten.\n\nMein Rat: Sprechen Sie mit der Förderbank, bevor Sie unterschreiben. Das Verfahren dauert etwa vier Wochen, und die Konditionen sind besser als unsere.\n\nUnser Angebot gilt bis zum 30. Juni.\n\nMit freundlichen Grüßen\nS. Lorenz, Firmenkunden",
    questions: [
      {
        text: "Was hat die Bank überzeugt?",
        options: [
          "Der Standort und die vorsichtige Kalkulation",
          "Die Höhe der Ersparnisse",
          "Die Erfahrung als Koch",
        ],
        answer: 0,
        explain: "„Der Standort ist gut gewählt, und Ihre Zahlen sind vorsichtig gerechnet.“",
      },
      {
        text: "Wie viel bekommt Tarek?",
        options: ["30.000 Euro", "45.000 Euro", "18.000 Euro"],
        answer: 0,
        explain: "45.000 istedi, banka 30.000 teklif ediyor; 18.000 kendi parası.",
      },
      {
        text: "Warum nicht mehr?",
        options: [
          "Er hat keine weiteren Sicherheiten",
          "Sein Konzept ist zu riskant",
          "Er ist zu jung",
        ],
        answer: 0,
        explain: "Tam tutar için kefalet ya da kalkınma bankası onayı gerekiyor.",
      },
      {
        text: "Was bedeutet „tilgungsfrei in den ersten sechs Monaten“?",
        options: [
          "Er zahlt am Anfang noch nicht zurück",
          "Er zahlt keine Zinsen",
          "Der Kredit ist sechs Monate gültig",
        ],
        answer: 0,
        explain: "İlk altı ay anapara ödemesi yok — açılış dönemi için nefes alanı.",
      },
      {
        text: "Was rät die Beraterin?",
        options: [
          "Zuerst mit der Förderbank sprechen",
          "Sofort unterschreiben",
          "Einen neuen Antrag stellen",
        ],
        answer: 0,
        explain:
          "„Das Verfahren dauert etwa vier Wochen, und die Konditionen sind besser als unsere.“",
      },
    ],
  },
  {
    id: "b1-r12",
    level: "B1",
    skill: "reading",
    title: "Ein Arbeitszeugnis lesen",
    genre: "Rehber",
    intro:
      "Alman iş referanslarının gizli dili: her şey olumlu görünür, ama kelimeler not anlamına gelir. Bu yazı kodu çözüyor.",
    gloss: [
      { de: "das Arbeitszeugnis", tr: "çalışma belgesi", en: "employment reference" },
      { de: "die Formulierung", tr: "ifade biçimi", en: "wording" },
      { de: "stets", tr: "daima", en: "always" },
      { de: "zur vollen Zufriedenheit", tr: "tam memnuniyetle", en: "to full satisfaction" },
      { de: "bemüht sein", tr: "gayret göstermek", en: "to make an effort" },
      { de: "der Code", tr: "şifre", en: "code" },
      { de: "wohlwollend", tr: "iyi niyetli", en: "benevolent" },
      { de: "das Recht", tr: "hak", en: "right" },
    ],
    minutes: 6,
    text:
      "In Deutschland hat jede Arbeitnehmerin das Recht auf ein Arbeitszeugnis — und dieses Zeugnis muss wohlwollend formuliert sein. Negative Sätze sind also praktisch verboten. Genau deshalb hat sich ein Code entwickelt, den man kennen muss.\n\nDie wichtigste Formel steht fast immer am Ende und beschreibt die Leistung. Sie funktioniert wie eine Note:\n\n„… stets zur vollsten Zufriedenheit“ = sehr gut\n„… stets zur vollen Zufriedenheit“ = gut\n„… zur vollen Zufriedenheit“ = befriedigend\n„… zur Zufriedenheit“ = ausreichend\n„… insgesamt zur Zufriedenheit“ = mangelhaft\n\nEin einziges Wort — „stets“ oder „vollsten“ — entscheidet also über zwei Noten.\n\nGefährlich sind Sätze, die freundlich klingen und es nicht sind. „Er war stets bemüht“ heißt: Er hat sich Mühe gegeben, aber es hat nicht gereicht. „Sie war gesellig und trug zur Verbesserung des Betriebsklimas bei“ kann bedeuten, dass jemand mehr geredet als gearbeitet hat.\n\nAuch das Fehlen zählt: Wenn am Ende der übliche Dank und die guten Wünsche für die Zukunft fehlen, lesen Personalabteilungen das als deutliches Signal.\n\nWenn Sie ein Zeugnis bekommen, lesen Sie es also zweimal — und fragen Sie im Zweifel nach einer Korrektur. Sie haben ein Recht darauf.",
    questions: [
      {
        text: "Warum gibt es diesen Code überhaupt?",
        options: [
          "Weil das Zeugnis wohlwollend sein muss",
          "Weil Arbeitgeber Zeit sparen wollen",
          "Weil es ein Gesetz von 1950 ist",
        ],
        answer: 0,
        explain: "Olumsuz cümle yasak olduğu için gizli bir dil gelişmiş.",
      },
      {
        text: "Was bedeutet „stets zur vollen Zufriedenheit“?",
        options: ["Gut", "Sehr gut", "Ausreichend"],
        answer: 0,
        explain: "„vollsten“ = sehr gut, „stets zur vollen“ = gut.",
      },
      {
        text: "Was heißt „Er war stets bemüht“?",
        options: [
          "Seine Leistung hat nicht gereicht",
          "Er hat sehr gut gearbeitet",
          "Er war oft krank",
        ],
        answer: 0,
        explain: "Kibar görünen ama olumsuz olan klasik ifade.",
      },
      {
        text: "Was ist ein schlechtes Zeichen am Ende des Zeugnisses?",
        options: [
          "Wenn Dank und gute Wünsche fehlen",
          "Wenn das Datum fehlt",
          "Wenn es zu lang ist",
        ],
        answer: 0,
        explain: "İK bunu net bir sinyal olarak okuyor.",
      },
      {
        text: "Was kann man tun, wenn das Zeugnis schlecht formuliert ist?",
        options: [
          "Eine Korrektur verlangen",
          "Nichts, es ist endgültig",
          "Ein neues bei der Agentur beantragen",
        ],
        answer: 0,
        explain: "„fragen Sie im Zweifel nach einer Korrektur. Sie haben ein Recht darauf.“",
      },
    ],
  },

  {
    id: "b1-l1",
    level: "B1",
    skill: "listening",
    title: "Die Lange Nacht der Museen",
    genre: "Radyo duyurusu",
    intro: "Radyodaki hafta sonu etkinlik duyurusunu dinle ve ayrıntıları not et.",
    minutes: 3,
    segments: [
      {
        text: "Und nun die Veranstaltungstipps für das Wochenende. Am Samstag findet in Nürnberg wieder die Lange Nacht der Museen statt. Von 18 Uhr abends bis 1 Uhr nachts öffnen mehr als vierzig Museen und Galerien ihre Türen. Das Eintrittsband kostet 17 Euro, ermäßigt 12 Euro, und gilt für alle teilnehmenden Häuser. Kinder unter zwölf Jahren haben freien Eintritt.",
      },
      {
        text: "Besonders empfehlen möchten wir das neue Zukunftsmuseum: Dort können Besucherinnen und Besucher ab 20 Uhr Roboter selbst steuern. Im Stadtmuseum wird stündlich eine Führung durch die Ausstellung über das mittelalterliche Nürnberg angeboten.",
      },
      {
        text: "Zwischen den Museen fahren kostenlose Shuttlebusse, die alle zehn Minuten an den Haltestellen abfahren. Die Veranstalter empfehlen, das Auto zu Hause zu lassen, da die Innenstadt teilweise gesperrt ist. Karten gibt es online oder an der Abendkasse. Im vergangenen Jahr waren sie allerdings schon am frühen Abend ausverkauft.",
      },
    ],
    gloss: [
      { de: "die Veranstaltung", tr: "etkinlik", en: "event" },
      { de: "der Eintritt", tr: "giriş ücreti", en: "admission" },
      { de: "ermäßigt", tr: "indirimli", en: "reduced" },
      { de: "die Führung", tr: "rehberli tur", en: "guided tour" },
      { de: "die Ausstellung", tr: "sergi", en: "exhibition" },
      { de: "mittelalterlich", tr: "ortaçağa ait", en: "medieval" },
      { de: "die Haltestelle", tr: "durak", en: "stop" },
      { de: "gesperrt", tr: "trafiğe kapalı", en: "closed to traffic" },
      { de: "die Abendkasse", tr: "gişe", en: "box office", note: "Etkinlik akşamı kapıda açılan bilet gişesidir." },
      { de: "ausverkauft", tr: "tükenmiş", en: "sold out" },
    ],
    questions: [
      {
        text: "Wann beginnt die Lange Nacht der Museen?",
        options: ["Um 17 Uhr", "Um 18 Uhr", "Um 20 Uhr"],
        answer: 1,
        explain: "Duyuruda etkinliğin akşam 18'den gece 1'e kadar sürdüğü söyleniyor. 20 Uhr yalnızca robot etkinliğinin başlangıcı — dikkat çeldiriciye.",
      },
      {
        text: "Kinder unter zwölf Jahren zahlen keinen Eintritt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İlk bölümde geçiyor: „Kinder unter zwölf Jahren haben freien Eintritt“ — on iki yaş altı çocuklara giriş ücretsiz.",
      },
      {
        text: "Was kann man ab 20 Uhr im Zukunftsmuseum machen?",
        options: [
          "Roboter selbst steuern",
          "An einer Führung über das Mittelalter teilnehmen",
          "Kostenlos zu Abend essen",
        ],
        answer: 0,
        explain: "Zukunftsmuseum'da ziyaretçiler saat 20'den itibaren robotları kendileri yönetebiliyor. Orta çağ turu ise Stadtmuseum'da yapılıyor.",
      },
      {
        text: "Wie oft fahren die Shuttlebusse?",
        options: ["Alle zehn Minuten", "Alle zwanzig Minuten", "Einmal pro Stunde"],
        answer: 0,
        explain: "Son bölümde ücretsiz servis otobüslerinin duraklardan her on dakikada bir („alle zehn Minuten“) kalktığı belirtiliyor.",
      },
      {
        text: "Warum sollte man die Karten früh kaufen?",
        options: [
          "Weil sie online billiger sind",
          "Weil sie letztes Jahr früh ausverkauft waren",
          "Weil die Abendkasse geschlossen bleibt",
        ],
        answer: 1,
        explain: "Duyurunun sonunda geçen yıl biletlerin akşamın erken saatlerinde tükendiği („schon am frühen Abend ausverkauft“) hatırlatılıyor.",
      },
    ],
  },
  {
    id: "b1-l2",
    level: "B1",
    skill: "listening",
    title: "Ehrenamt bei der Tafel",
    genre: "Radyo röportajı",
    intro: "Gıda bankasında gönüllü çalışan Herr Weber ile yapılan radyo röportajını dinle.",
    minutes: 4,
    segments: [
      {
        speaker: "Moderatorin",
        text: "Willkommen zurück bei Radio Neckarwelle. Zu Gast ist heute Thomas Weber, der sich seit fünf Jahren ehrenamtlich bei der Heidelberger Tafel engagiert. Herr Weber, was genau machen Sie dort?",
      },
      {
        speaker: "Herr Weber",
        text: "Wir sammeln Lebensmittel, die Supermärkte nicht mehr verkaufen können, die aber noch gut sind. Diese verteilen wir dann an Menschen mit wenig Geld. Ich fahre zweimal pro Woche mit dem Kühlwagen zu den Märkten und hole die Ware ab.",
      },
      {
        speaker: "Moderatorin",
        text: "Wie sind Sie zu diesem Ehrenamt gekommen?",
      },
      {
        speaker: "Herr Weber",
        text: "Ganz zufällig. Nach meiner Rente hatte ich plötzlich viel Zeit und habe einen Zeitungsartikel über die Tafel gelesen. Am nächsten Tag habe ich einfach dort angerufen.",
      },
      {
        speaker: "Moderatorin",
        text: "Was gibt Ihnen die Arbeit persönlich?",
      },
      {
        speaker: "Herr Weber",
        text: "Sehr viel. Man bekommt direkte Dankbarkeit, und ich habe tolle Menschen kennengelernt. Aber ich will ehrlich sein: Manchmal ist es auch traurig zu sehen, wie viele Familien Hilfe brauchen.",
      },
      {
        speaker: "Moderatorin",
        text: "Sucht die Tafel noch Unterstützung?",
      },
      {
        speaker: "Herr Weber",
        text: "Unbedingt! Besonders Fahrerinnen und Fahrer werden gesucht. Wer Interesse hat, findet alle Informationen auf unserer Webseite.",
      },
    ],
    gloss: [
      { de: "das Ehrenamt", tr: "gönüllü görev", en: "volunteer work" },
      { de: "die Tafel", tr: "gıda bankası", en: "food bank" },
      { de: "sich engagieren", tr: "gönüllü çalışmak", en: "to volunteer" },
      { de: "die Lebensmittel", tr: "gıda", en: "groceries" },
      { de: "verteilen", tr: "dağıtmak", en: "to distribute" },
      { de: "die Ware abholen", tr: "malı teslim almak", en: "to pick up the goods" },
      { de: "die Rente", tr: "emeklilik", en: "retirement" },
      { de: "zufällig", tr: "tesadüfen", en: "by chance" },
      { de: "die Dankbarkeit", tr: "minnettarlık", en: "gratitude" },
      { de: "die Unterstützung", tr: "destek", en: "support" },
    ],
    questions: [
      {
        text: "Was macht Herr Weber bei der Tafel?",
        options: [
          "Er verkauft günstige Lebensmittel",
          "Er holt Lebensmittel von Supermärkten ab",
          "Er kocht warme Mahlzeiten für Familien",
        ],
        answer: 1,
        explain: "Kendi anlatıyor: haftada iki kez soğutuculu araçla marketlere gidip malları teslim alıyor („hole die Ware ab“). Satış ya da yemek pişirme yok.",
      },
      {
        text: "Herr Weber arbeitet jeden Tag für die Tafel.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: haftada iki kez („zweimal pro Woche“) araçla marketleri dolaştığını söylüyor.",
      },
      {
        text: "Wie hat Herr Weber von der Tafel erfahren?",
        options: [
          "Durch einen Freund",
          "Durch eine Radiosendung",
          "Durch einen Zeitungsartikel",
        ],
        answer: 2,
        explain: "Emekli olduktan sonra Tafel hakkında bir gazete makalesi okumuş („einen Zeitungsartikel über die Tafel gelesen“) ve ertesi gün aramış.",
      },
      {
        text: "Was findet Herr Weber manchmal traurig?",
        options: [
          "Dass so viele Familien Hilfe brauchen",
          "Dass sich niemand bei ihm bedankt",
          "Dass die Arbeit körperlich anstrengend ist",
        ],
        answer: 0,
        explain: "Dürüstçe itiraf ediyor: bu kadar çok ailenin yardıma ihtiyaç duyduğunu görmek bazen üzücü. Teşekkür eksikliğinden şikâyet etmiyor, aksine doğrudan minnettarlık gördüğünü söylüyor.",
      },
      {
        text: "Wen sucht die Tafel im Moment besonders?",
        options: ["Köchinnen und Köche", "Fahrerinnen und Fahrer", "Verkäuferinnen und Verkäufer"],
        answer: 1,
        explain: "Son cevapta özellikle şoför arandığı („Besonders Fahrerinnen und Fahrer werden gesucht“) vurgulanıyor.",
      },
    ],
  },
  {
    id: "b1-l3",
    level: "B1",
    skill: "listening",
    title: "Ein Garten für alle",
    genre: "Günlük konuşma",
    intro: "İki komşunun, binalarının arkasına yapılacak ortak bahçe hakkındaki konuşmasını dinle.",
    minutes: 3,
    segments: [
      {
        speaker: "Jonas",
        text: "Hallo Elif! Hast du schon gehört? Auf der freien Fläche hinter unserem Haus soll ein Gemeinschaftsgarten entstehen.",
      },
      {
        speaker: "Elif",
        text: "Ja, ich habe den Aushang im Treppenhaus gesehen. Ich bin mir aber nicht sicher, ob das funktioniert. Wer soll sich denn darum kümmern?",
      },
      {
        speaker: "Jonas",
        text: "Die Idee ist, dass jeder Haushalt ein kleines Beet bekommt. Um die gemeinsamen Wege und die Obstbäume kümmern wir uns zusammen. Nächsten Samstag um zehn gibt es ein erstes Treffen.",
      },
      {
        speaker: "Elif",
        text: "Hm, ich habe ehrlich gesagt noch nie etwas angepflanzt. Ich hätte Angst, dass bei mir alles vertrocknet.",
      },
      {
        speaker: "Jonas",
        text: "Das macht doch nichts! Frau Behrens aus dem dritten Stock war früher Gärtnerin, sie will Anfängern helfen. Und stell dir vor: eigene Tomaten, frische Kräuter direkt vor der Tür.",
      },
      {
        speaker: "Elif",
        text: "Das klingt schon verlockend. Und die Kinder könnten draußen spielen, während wir im Garten arbeiten. Weißt du was? Ich komme am Samstag einfach mal mit.",
      },
      {
        speaker: "Jonas",
        text: "Super! Ich hole dich um kurz vor zehn ab.",
      },
    ],
    gloss: [
      { de: "der Gemeinschaftsgarten", tr: "ortak bahçe", en: "community garden" },
      { de: "die Fläche", tr: "alan", en: "area" },
      { de: "der Aushang", tr: "duyuru", en: "notice" },
      { de: "das Treppenhaus", tr: "merdiven boşluğu", en: "stairwell" },
      { de: "sich kümmern um", tr: "ilgilenmek", en: "to take care of" },
      { de: "der Haushalt", tr: "hane", en: "household" },
      { de: "das Beet", tr: "tarh", en: "garden bed" },
      { de: "anpflanzen", tr: "dikmek", en: "to plant" },
      { de: "vertrocknen", tr: "kurumak", en: "to dry out" },
      { de: "verlockend", tr: "cazip", en: "tempting" },
    ],
    questions: [
      {
        text: "Worüber sprechen Elif und Jonas?",
        options: [
          "Über einen neuen Spielplatz im Hof",
          "Über einen geplanten Gemeinschaftsgarten",
          "Über einen Flohmarkt am Wochenende",
        ],
        answer: 1,
        explain: "Jonas ilk cümlede haberi veriyor: binanın arkasındaki boş alanda ortak bir bahçe kurulacak („soll ein Gemeinschaftsgarten entstehen“).",
      },
      {
        text: "Jeder Haushalt soll ein eigenes kleines Beet bekommen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Jonas planı açıklıyor: her haneye küçük bir tarh düşecek, ortak yollar ve meyve ağaçlarıyla ise birlikte ilgilenilecek.",
      },
      {
        text: "Warum ist Elif zuerst unsicher?",
        options: [
          "Sie hat am Samstag keine Zeit",
          "Sie mag kein frisches Gemüse",
          "Sie hat noch nie etwas angepflanzt",
        ],
        answer: 2,
        explain: "Elif hiç bitki yetiştirmediğini („noch nie etwas angepflanzt“) ve her şeyin kuruyup gitmesinden korktuğunu söylüyor.",
      },
      {
        text: "Wer will den Anfängern im Garten helfen?",
        options: ["Frau Behrens aus dem dritten Stock", "Der Hausmeister", "Jonas selbst"],
        answer: 0,
        explain: "Jonas'a göre üçüncü kattaki Frau Behrens eskiden bahçıvanmış ve yeni başlayanlara yardım etmek istiyor.",
      },
      {
        text: "Was machen die beiden am Samstag?",
        options: [
          "Sie kaufen zusammen Pflanzen",
          "Sie gehen gemeinsam zum ersten Treffen",
          "Sie besuchen Frau Behrens",
        ],
        answer: 1,
        explain: "Elif „Ich komme am Samstag einfach mal mit“ diyor, Jonas da onu ondan az önce alacağını söylüyor — yani ilk toplantıya birlikte gidecekler.",
      },
    ],
  },
  {
    id: "b1-l4",
    level: "B1",
    skill: "listening",
    title: "Station fünf: die Speicherstadt",
    genre: "Sesli rehber",
    intro: "Hamburg Liman Müzesi'ndeki sesli rehberin Speicherstadt bölümünü dinle.",
    minutes: 3,
    segments: [
      {
        text: "Herzlich willkommen im Hafenmuseum Hamburg. Sie hören Station fünf: die Speicherstadt. Vor Ihnen sehen Sie ein Modell des größten historischen Lagerhauskomplexes der Welt. Die Speicherstadt wurde zwischen 1883 und 1927 gebaut. In den roten Backsteingebäuden lagerten Kaffee, Tee, Gewürze und Teppiche aus der ganzen Welt.",
      },
      {
        text: "Beachten Sie die kleinen Türen in den oberen Stockwerken: Dort wurden die Waren früher mit Seilwinden direkt aus den Schiffen nach oben gezogen. Bis heute riecht es in einigen Gebäuden nach Gewürzen.",
      },
      {
        text: "Seit 2015 gehört die Speicherstadt zum Weltkulturerbe der UNESCO. Heute befinden sich in den alten Speichern Museen, Büros und Cafés. In der Vitrine rechts neben dem Modell sehen Sie originale Werkzeuge der Hafenarbeiter, die hier bis in die achtziger Jahre gearbeitet haben.",
      },
      {
        text: "Wenn Sie mehr über den modernen Containerhafen erfahren möchten, folgen Sie dem blauen Pfeil zur Station sechs im nächsten Raum. Wir wünschen Ihnen einen angenehmen Aufenthalt.",
      },
    ],
    gloss: [
      { de: "das Lagerhaus", tr: "depo binası", en: "warehouse" },
      { de: "der Backstein", tr: "tuğla", en: "brick" },
      { de: "lagern", tr: "depolamak", en: "to store" },
      { de: "das Gewürz", tr: "baharat", en: "spice" },
      { de: "der Teppich", tr: "halı", en: "carpet" },
      { de: "das Stockwerk", tr: "kat", en: "story" },
      { de: "die Ware", tr: "mal", en: "goods" },
      { de: "das Weltkulturerbe", tr: "dünya kültür mirası", en: "world heritage" },
      { de: "die Vitrine", tr: "vitrin", en: "display case" },
      { de: "der Aufenthalt", tr: "kalış", en: "stay" },
    ],
    questions: [
      {
        text: "Was sehen die Besucher an Station fünf?",
        options: [
          "Ein originales Handelsschiff",
          "Einen Film über den Hafen",
          "Ein Modell der Speicherstadt",
        ],
        answer: 2,
        explain: "Rehber baştan söylüyor: ziyaretçilerin önünde dünyanın en büyük tarihi depo kompleksinin bir maketi („ein Modell“) duruyor.",
      },
      {
        text: "Was wurde früher in der Speicherstadt gelagert?",
        options: [
          "Kaffee, Tee, Gewürze und Teppiche",
          "Autos und Maschinen",
          "Fisch und Fleisch",
        ],
        answer: 0,
        explain: "İlk bölümde kırmızı tuğla binalarda dünyanın dört bir yanından gelen kahve, çay, baharat ve halıların depolandığı anlatılıyor.",
      },
      {
        text: "Die Speicherstadt gehört seit 2015 zum UNESCO-Weltkulturerbe.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Üçüncü bölümde aynen geçiyor: „Seit 2015 gehört die Speicherstadt zum Weltkulturerbe der UNESCO.“",
      },
      {
        text: "Wozu dienten die kleinen Türen in den oberen Stockwerken?",
        options: [
          "Die Arbeiter gingen dort zur Mittagspause hinaus",
          "Die Waren wurden dort nach oben gezogen",
          "Sie dienten zum Lüften der Räume",
        ],
        answer: 1,
        explain: "Rehbere göre mallar eskiden vinç halatlarıyla („mit Seilwinden“) gemilerden doğrudan bu kapılara çekiliyordu.",
      },
      {
        text: "Wohin sollen Besucher gehen, die sich für den Containerhafen interessieren?",
        options: ["Zur Station sechs", "Zur Kasse im Erdgeschoss", "In das Café im Speicher"],
        answer: 0,
        explain: "Son bölümde modern konteyner limanını merak edenlerin mavi oku izleyip yan salondaki altıncı istasyona geçmesi isteniyor.",
      },
    ],
  },
  {
    id: "b1-l5",
    level: "B1",
    skill: "listening",
    title: "Tag der offenen Tür an der Volkshochschule",
    genre: "Duyuru",
    intro: "Halk eğitim merkezinin açık kapı gününde yapılan anonsu dinle.",
    minutes: 3,
    segments: [
      {
        text: "Liebe Besucherinnen und Besucher, herzlich willkommen zum Tag der offenen Tür der Volkshochschule Bochum. Bevor die einzelnen Kurse vorgestellt werden, einige wichtige Informationen. Das neue Programmheft für das Herbstsemester liegt am Empfang für Sie bereit. Insgesamt werden über vierhundert Kurse angeboten, von Sprachen über Computerkurse bis zu Gesundheit und Kochen.",
      },
      {
        text: "Neu in diesem Semester ist der Bereich Digitale Sicherheit: Hier lernen Sie zum Beispiel, wie Sie sichere Passwörter erstellen und Betrug im Internet erkennen. Wer sich heute für einen Kurs anmeldet, erhält zehn Prozent Rabatt auf die Kursgebühr. Die Anmeldung ist in Raum zwölf im Erdgeschoss möglich, bitte bringen Sie dafür Ihren Ausweis mit.",
      },
      {
        text: "Um 15 Uhr stellen unsere Sprachlehrerinnen und Sprachlehrer im großen Saal die neuen Konversationskurse vor. Dort können Sie auch einen kostenlosen Einstufungstest machen, wenn Sie nicht sicher sind, welches Niveau zu Ihnen passt. Die Cafeteria im ersten Stock ist bis 17 Uhr geöffnet. Wir wünschen Ihnen einen schönen Tag!",
      },
    ],
    gloss: [
      { de: "der Tag der offenen Tür", tr: "açık kapı günü", en: "open day" },
      { de: "die Volkshochschule", tr: "halk eğitim merkezi", en: "adult education center" },
      { de: "das Programmheft", tr: "program kitapçığı", en: "program booklet" },
      { de: "der Empfang", tr: "resepsiyon", en: "reception" },
      { de: "der Betrug", tr: "dolandırıcılık", en: "fraud" },
      { de: "sich anmelden", tr: "kaydolmak", en: "to register" },
      { de: "die Kursgebühr", tr: "kurs ücreti", en: "course fee" },
      { de: "der Ausweis", tr: "kimlik", en: "ID card" },
      { de: "der Einstufungstest", tr: "seviye tespit sınavı", en: "placement test" },
      { de: "das Niveau", tr: "seviye", en: "level" },
    ],
    questions: [
      {
        text: "Wo findet diese Durchsage statt?",
        options: [
          "An einer Volkshochschule",
          "An einer Universität",
          "In einer Sprachschule für Kinder",
        ],
        answer: 0,
        explain: "Anonsun başında yer belirtiliyor: Bochum Volkshochschule'nin açık kapı günü.",
      },
      {
        text: "Welcher Bereich ist in diesem Semester neu?",
        options: ["Gesundheit und Kochen", "Digitale Sicherheit", "Konversationskurse"],
        answer: 1,
        explain: "İkinci bölümde bu dönemin yeniliği olarak Digitale Sicherheit alanı tanıtılıyor: güvenli şifre oluşturma ve internette dolandırıcılığı tanıma.",
      },
      {
        text: "Wer sich heute anmeldet, zahlt zehn Prozent weniger.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru: bugün kaydolanlar kurs ücretinde yüzde on indirim („zehn Prozent Rabatt auf die Kursgebühr“) alıyor.",
      },
      {
        text: "Was braucht man für die Anmeldung?",
        options: ["Ein Passfoto", "Ein Zeugnis", "Den Ausweis"],
        answer: 2,
        explain: "Kayıt zemin kattaki on iki numaralı odada yapılıyor ve kimlik getirilmesi („bitte bringen Sie dafür Ihren Ausweis mit“) isteniyor.",
      },
      {
        text: "Was kann man um 15 Uhr im großen Saal machen?",
        options: [
          "Einen kostenlosen Einstufungstest machen",
          "Das Programmheft kaufen",
          "In der Cafeteria Kuchen essen",
        ],
        answer: 0,
        explain: "Saat 15'te büyük salonda konuşma kursları tanıtılacak ve seviyesinden emin olmayanlar ücretsiz seviye testi yapabilecek. Kafeterya ise birinci katta.",
      },
    ],
  },
  {
    id: "b1-l6",
    level: "B1",
    skill: "listening",
    title: "Wie viel Handy ist zu viel?",
    genre: "Radyo röportajı",
    intro: "Gençlerin telefon kullanımı üzerine yapılan araştırmayı anlatan uzman röportajını dinle.",
    minutes: 4,
    segments: [
      {
        speaker: "Moderator",
        text: "Wie viel Zeit verbringen Jugendliche am Handy? Eine neue Studie der Universität Mannheim liefert Antworten. Frau Doktor Lindner, Sie haben die Studie geleitet. Was sind die wichtigsten Ergebnisse?",
      },
      {
        speaker: "Frau Lindner",
        text: "Jugendliche zwischen zwölf und siebzehn Jahren nutzen ihr Smartphone im Durchschnitt dreieinhalb Stunden täglich. Das klingt erst einmal viel, aber uns hat etwas anderes überrascht: Die meisten Jugendlichen finden selbst, dass das zu viel ist. Zwei Drittel wünschen sich, weniger Zeit am Handy zu verbringen.",
      },
      {
        speaker: "Moderator",
        text: "Und schaffen sie das auch?",
      },
      {
        speaker: "Frau Lindner",
        text: "Selten, denn die Apps sind so gebaut, dass man immer weiterschauen möchte. Verbote helfen unserer Erfahrung nach wenig. Sinnvoller sind gemeinsame Regeln in der Familie, zum Beispiel handyfreie Zeiten beim Abendessen. Diese Regeln sollten dann übrigens auch für die Eltern gelten.",
      },
      {
        speaker: "Moderator",
        text: "Gibt es auch positive Ergebnisse?",
      },
      {
        speaker: "Frau Lindner",
        text: "Ja, durchaus. Viele Jugendliche nutzen das Handy für die Schule, lernen mit Videos oder bleiben mit der Familie im Ausland in Kontakt. Das Smartphone ist also nicht nur ein Problem. Es kommt darauf an, wie man es benutzt.",
      },
    ],
    gloss: [
      { de: "der Jugendliche", tr: "genç", en: "teenager" },
      { de: "die Studie", tr: "araştırma", en: "study" },
      { de: "leiten", tr: "yönetmek", en: "to lead" },
      { de: "das Ergebnis", tr: "sonuç", en: "result" },
      { de: "im Durchschnitt", tr: "ortalama olarak", en: "on average" },
      { de: "überraschen", tr: "şaşırtmak", en: "to surprise" },
      { de: "das Verbot", tr: "yasak", en: "ban" },
      { de: "sinnvoll", tr: "mantıklı", en: "sensible" },
      { de: "gelten für", tr: "için geçerli olmak", en: "to apply to" },
      { de: "in Kontakt bleiben", tr: "iletişimde kalmak", en: "to stay in touch" },
    ],
    questions: [
      {
        text: "Wie lange nutzen Jugendliche ihr Smartphone im Durchschnitt pro Tag?",
        options: ["Zweieinhalb Stunden", "Dreieinhalb Stunden", "Viereinhalb Stunden"],
        answer: 1,
        explain: "Frau Lindner araştırmanın sonucunu veriyor: 12-17 yaş arası gençler telefonlarını günde ortalama üç buçuk saat („dreieinhalb Stunden“) kullanıyor.",
      },
      {
        text: "Was hat die Forscherinnen und Forscher überrascht?",
        options: [
          "Dass die meisten Jugendlichen selbst weniger Handyzeit möchten",
          "Dass Jugendliche kaum noch Apps benutzen",
          "Dass Eltern mehr am Handy sind als ihre Kinder",
        ],
        answer: 0,
        explain: "Şaşırtıcı bulgu: gençlerin üçte ikisi telefonla daha az vakit geçirmeyi kendisi istiyor („Zwei Drittel wünschen sich, weniger Zeit am Handy zu verbringen“).",
      },
      {
        text: "Frau Lindner empfiehlt strenge Handyverbote für Jugendliche.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: deneyimlerine göre yasaklar pek işe yaramıyor („Verbote helfen … wenig“); bunun yerine ailede ortak kurallar öneriyor.",
      },
      {
        text: "Welche Regel nennt Frau Lindner als Beispiel?",
        options: [
          "Handyfreie Zeiten beim Abendessen",
          "Handy nur am Wochenende",
          "Keine Videos nach 20 Uhr",
        ],
        answer: 0,
        explain: "Örnek olarak akşam yemeğinde telefonsuz zamanları („handyfreie Zeiten beim Abendessen“) veriyor — ve bu kural ebeveynler için de geçerli olmalı.",
      },
      {
        text: "Das Smartphone hat laut Frau Lindner auch positive Seiten.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Son cevapta gençlerin telefonu okul için, videolarla öğrenmek ve yurt dışındaki aileyle iletişim kurmak için de kullandığını söylüyor: „Es kommt darauf an, wie man es benutzt.“",
      },
    ],
  },

  // ── Yazma ──────────────────────────────────────────────────────────────
  {
    id: "b1-l7",
    level: "B1",
    skill: "listening",
    title: "Beim Steuerberater",
    genre: "Danışma",
    intro:
      "Hikâyenin devamı: Tarek mali müşavire gidiyor. Kendi işini kuran herkesin oturduğu masa.",
    gloss: [
      { de: "der Steuerberater", tr: "mali müşavir", en: "tax advisor" },
      { de: "die Umsatzsteuer", tr: "KDV", en: "sales tax" },
      { de: "der Gewinn", tr: "kâr", en: "profit" },
      { de: "die Kleinunternehmerregelung", tr: "küçük işletme muafiyeti", en: "small business exemption" },
      { de: "die Belege", tr: "fişler", en: "receipts" },
      { de: "aufbewahren", tr: "saklamak", en: "to store" },
      { de: "die Rücklage", tr: "yedek akçe", en: "reserve" },
      { de: "monatlich", tr: "aylık", en: "monthly" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Petrova", text: "Herr Haddad, Sie eröffnen im September. Was ist Ihre größte Sorge?" },
      {
        speaker: "Tarek",
        text: "Ehrlich? Die Steuern. Ich verstehe nicht, wie viel ich am Ende wirklich habe.",
      },
      {
        speaker: "Frau Petrova",
        text: "Gute Frage. Fangen wir mit der Umsatzsteuer an. Bei Essen im Café sind das 19 Prozent, zum Mitnehmen 7. Diese Steuer gehört nie Ihnen — Sie sammeln sie nur für den Staat.",
      },
      { speaker: "Tarek", text: "Das habe ich gehört. Aber es liegt doch auf meinem Konto." },
      {
        speaker: "Frau Petrova",
        text: "Genau das ist die Falle. Die meisten geben es aus und haben im Quartal ein Problem. Machen Sie ein zweites Konto und überweisen Sie das Geld sofort dorthin.",
      },
      { speaker: "Tarek", text: "Und die Kleinunternehmerregelung?" },
      {
        speaker: "Frau Petrova",
        text: "Bei Ihnen nicht sinnvoll. Die gilt bis 22.000 Euro Umsatz im Jahr. Sie planen mit 90.000.",
      },
      { speaker: "Tarek", text: "Was muss ich sonst noch tun?" },
      {
        speaker: "Frau Petrova",
        text: "Alle Belege aufbewahren — zehn Jahre. Fotografieren reicht, wenn Sie sie geordnet ablegen. Und legen Sie jeden Monat 25 Prozent vom Gewinn zurück, nicht vom Umsatz.",
      },
      { speaker: "Tarek", text: "Und wenn ich einen Fehler mache?" },
      {
        speaker: "Frau Petrova",
        text: "Dann korrigieren wir ihn. Das Finanzamt ist nicht Ihr Feind — es wird nur ungemütlich, wenn man sich nicht meldet.",
      },
    ],
    questions: [
      {
        text: "Wie viel Umsatzsteuer gilt für Essen zum Mitnehmen?",
        options: ["7 Prozent", "19 Prozent", "25 Prozent"],
        answer: 0,
        explain: "Kafede yemek %19, paket %7.",
      },
      {
        text: "Warum ist die Umsatzsteuer eine Falle?",
        options: [
          "Sie liegt auf dem Konto, gehört aber dem Staat",
          "Sie ist zu hoch",
          "Man muss sie zweimal zahlen",
        ],
        answer: 0,
        explain: "„Diese Steuer gehört nie Ihnen — Sie sammeln sie nur für den Staat.“",
      },
      {
        text: "Was empfiehlt die Beraterin dagegen?",
        options: [
          "Ein zweites Konto und das Geld sofort überweisen",
          "Weniger Umsatz machen",
          "Monatlich statt quartalsweise zahlen",
        ],
        answer: 0,
        explain: "İkinci hesap açıp KDV'yi hemen oraya aktarmak.",
      },
      {
        text: "Warum passt die Kleinunternehmerregelung nicht?",
        options: [
          "Sein geplanter Umsatz ist viel zu hoch",
          "Er hat Mitarbeiter",
          "Er ist noch nicht angemeldet",
        ],
        answer: 0,
        explain: "Muafiyet 22.000 euroya kadar; Tarek 90.000 planlıyor.",
      },
      {
        text: "Wie viel soll er monatlich zurücklegen?",
        options: [
          "25 Prozent vom Gewinn",
          "25 Prozent vom Umsatz",
          "19 Prozent vom Umsatz",
        ],
        answer: 0,
        explain: "„vom Gewinn, nicht vom Umsatz“ — bu ayrım kritik.",
      },
    ],
  },
  {
    id: "b1-l8",
    level: "B1",
    skill: "listening",
    title: "Handwerker am Telefon",
    genre: "Telefon",
    intro:
      "Almanya'da usta bulmak kendi başına bir sınavdır. Tarek kafenin elektriği için arıyor.",
    gloss: [
      { de: "der Handwerker", tr: "usta", en: "craftsman" },
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "der Kostenvoranschlag", tr: "fiyat teklifi", en: "cost estimate" },
      { de: "die Anfahrt", tr: "yol ücreti", en: "call-out charge" },
      { de: "der Notfall", tr: "acil durum", en: "emergency" },
      { de: "ausgebucht", tr: "tamamen dolu", en: "fully booked" },
      { de: "der Auftrag", tr: "iş", en: "job" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Elektro Kranz", text: "Elektro Kranz, Weber." },
      {
        speaker: "Tarek",
        text: "Guten Tag. Ich eröffne im September ein Café und brauche neue Leitungen für die Küche. Wann könnten Sie kommen?",
      },
      {
        speaker: "Weber",
        text: "September … Da muss ich Sie enttäuschen. Wir sind bis Mitte Oktober ausgebucht.",
      },
      { speaker: "Tarek", text: "Das ist zu spät. Gibt es gar keine Möglichkeit?" },
      {
        speaker: "Weber",
        text: "Moment. Wie groß ist der Auftrag? Wenn es zwei Tage sind, kann ich vielleicht etwas schieben. Bei einer Woche nicht.",
      },
      { speaker: "Tarek", text: "Ich schätze zwei bis drei Tage. Küche und ein neuer Sicherungskasten." },
      {
        speaker: "Weber",
        text: "Dann komme ich nächste Woche vorbei und schaue es mir an. Das kostet nichts. Danach bekommen Sie einen schriftlichen Kostenvoranschlag.",
      },
      { speaker: "Tarek", text: "Und ist der Preis dann fest?" },
      {
        speaker: "Weber",
        text: "Der Voranschlag ist nicht verbindlich, aber bei mir weicht er selten mehr als zehn Prozent ab. Wenn während der Arbeit etwas Größeres auftaucht, rufe ich Sie an, bevor ich weitermache.",
      },
      { speaker: "Tarek", text: "Das ist mir wichtig. Dann bis nächste Woche." },
    ],
    questions: [
      {
        text: "Was ist das erste Problem?",
        options: [
          "Die Firma ist bis Mitte Oktober ausgebucht",
          "Der Auftrag ist zu klein",
          "Der Preis ist zu hoch",
        ],
        answer: 0,
        explain: "Eylül için yer yok, ekim ortasına kadar doluymuş.",
      },
      {
        text: "Wovon hängt es ab, ob Herr Weber etwas schieben kann?",
        options: [
          "Von der Größe des Auftrags",
          "Vom Preis",
          "Vom Ort",
        ],
        answer: 0,
        explain: "„Wenn es zwei Tage sind, kann ich vielleicht etwas schieben. Bei einer Woche nicht.“",
      },
      {
        text: "Was kostet der erste Besuch?",
        options: ["Nichts", "Die Anfahrt", "Zehn Prozent"],
        answer: 0,
        explain: "„Das kostet nichts. Danach bekommen Sie einen schriftlichen Kostenvoranschlag.“",
      },
      {
        text: "Ist der Kostenvoranschlag verbindlich?",
        options: [
          "Nein, aber er weicht selten mehr als 10 % ab",
          "Ja, immer",
          "Nur schriftlich",
        ],
        answer: 0,
        explain: "Yasal olarak bağlayıcı değil ama usta kendi pratiğini anlatıyor.",
      },
      {
        text: "Was macht Herr Weber, wenn etwas Größeres auftaucht?",
        options: [
          "Er ruft an, bevor er weitermacht",
          "Er macht weiter und rechnet ab",
          "Er stoppt die Arbeit",
        ],
        answer: 0,
        explain: "„rufe ich Sie an, bevor ich weitermache.“",
      },
    ],
  },
  {
    id: "b1-l9",
    level: "B1",
    skill: "listening",
    title: "Radiobeitrag: Weniger Autos in der Stadt",
    genre: "Sınav formatı",
    intro:
      "B1 dinleme bölümünün ikinci kısmı gibi: bir radyo haberi, ardından içerik soruları. Bir kez baştan sona dinlemeyi dene.",
    gloss: [
      { de: "der Beitrag", tr: "haber", en: "report" },
      { de: "der Versuch", tr: "deneme", en: "trial" },
      { de: "die Sperrung", tr: "kapatma", en: "closure" },
      { de: "der Umsatz", tr: "ciro", en: "revenue" },
      { de: "befürchten", tr: "endişe etmek", en: "to fear" },
      { de: "die Auswertung", tr: "analiz", en: "analysis" },
      { de: "vorläufig", tr: "geçici", en: "preliminary" },
      { de: "die Verlängerung", tr: "uzatma", en: "extension" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Moderator",
        text: "Seit drei Monaten ist die Königstraße für Autos gesperrt — als Versuch. Nächste Woche entscheidet der Stadtrat, ob es dabei bleibt. Nina Färber hat sich umgehört.",
      },
      {
        speaker: "Reporterin",
        text: "Am Anfang war die Empörung groß. Vierzig Geschäfte hatten unterschrieben, sie befürchteten weniger Kundschaft. Heute klingt es anders.",
      },
      {
        speaker: "Ladenbesitzerin",
        text: "Ich war dagegen, ganz klar. Ich habe gedacht, ohne Parkplätze kommt niemand mehr. Aber mein Umsatz ist um sieben Prozent gestiegen. Die Leute bleiben einfach länger.",
      },
      {
        speaker: "Reporterin",
        text: "Nicht alle sind zufrieden. Wer schwere Waren verkauft — Möbel, Getränke —, klagt über Probleme bei der Lieferung.",
      },
      {
        speaker: "Händler",
        text: "Für mich ist es schlechter geworden. Meine Kunden kaufen Kästen, keine Blumen. Die kann man nicht tragen.",
      },
      {
        speaker: "Reporterin",
        text: "Die vorläufige Auswertung der Stadt zeigt: Der Umsatz im gesamten Bereich ist um vier Prozent gestiegen, die Zahl der Besucher um elf. Gleichzeitig gibt es 30 Prozent mehr Beschwerden über Lieferverkehr in den Nebenstraßen.",
      },
      {
        speaker: "Moderator",
        text: "Und die Entscheidung?",
      },
      {
        speaker: "Reporterin",
        text: "Wahrscheinlich eine Verlängerung um ein Jahr — mit festen Lieferzeiten am Morgen. Eine endgültige Sperrung will im Moment niemand beschließen.",
      },
    ],
    questions: [
      {
        text: "Worum geht es in dem Beitrag?",
        options: [
          "Um eine Straßensperrung als Versuch",
          "Um neue Parkhäuser",
          "Um höhere Mieten",
        ],
        answer: 0,
        explain: "Königstraße üç aydır deneme amaçlı araç trafiğine kapalı.",
      },
      {
        text: "Wie hat sich die Meinung der Ladenbesitzerin geändert?",
        options: [
          "Sie war dagegen, jetzt hat sie mehr Umsatz",
          "Sie war dafür und ist es geblieben",
          "Sie ist weiterhin dagegen",
        ],
        answer: 0,
        explain: "„Ich war dagegen, ganz klar … Aber mein Umsatz ist um sieben Prozent gestiegen.“",
      },
      {
        text: "Wer hat Probleme?",
        options: [
          "Händler mit schweren Waren",
          "Cafés und Restaurants",
          "Die Anwohner",
        ],
        answer: 0,
        explain: "Mobilya, içecek gibi ağır ürün satanlar teslimatta zorlanıyor.",
      },
      {
        text: "Was zeigt die Auswertung der Stadt?",
        options: [
          "Mehr Umsatz und mehr Besucher, aber mehr Beschwerden über Lieferverkehr",
          "Weniger Umsatz insgesamt",
          "Keine Veränderung",
        ],
        answer: 0,
        explain: "Ciro +%4, ziyaretçi +%11, teslimat şikâyetleri +%30.",
      },
      {
        text: "Was wird wahrscheinlich entschieden?",
        options: [
          "Eine Verlängerung um ein Jahr mit festen Lieferzeiten",
          "Eine endgültige Sperrung",
          "Das Ende des Versuchs",
        ],
        answer: 0,
        explain: "„Eine endgültige Sperrung will im Moment niemand beschließen.“",
      },
    ],
  },
  {
    id: "b1-l10",
    level: "B1",
    skill: "listening",
    title: "Podcast: Pünktlichkeit",
    genre: "Kültür",
    intro:
      "Almanya ile ilgili en bilinen klişe. Bu podcast bölümü klişenin ne kadar doğru olduğunu tartışıyor.",
    gloss: [
      { de: "die Pünktlichkeit", tr: "dakiklik", en: "punctuality" },
      { de: "das Klischee", tr: "klişe", en: "cliché" },
      { de: "die Verabredung", tr: "buluşma", en: "date" },
      { de: "akademisches Viertel", tr: "akademik çeyrek", en: "academic quarter", note: "Ders ilan edilen saatten çeyrek saat sonra başlar." },
      { de: "unhöflich", tr: "nezaketsiz", en: "impolite" },
      { de: "die Ausrede", tr: "bahane", en: "excuse" },
      { de: "der Unterschied", tr: "fark", en: "difference" },
      { de: "entschuldigen", tr: "affetmek", en: "to excuse" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Host",
        text: "Heute: Sind die Deutschen wirklich so pünktlich? Zu Gast ist die Soziologin Dr. Karin Sander.",
      },
      {
        speaker: "Sander",
        text: "Teils. Im Beruf und bei Terminen mit Institutionen: ja, sehr. Im Privaten ist es viel lockerer, als das Klischee sagt.",
      },
      { speaker: "Host", text: "Also darf ich zu spät zur Party kommen?" },
      {
        speaker: "Sander",
        text: "Zu einer Party sogar sehr gern — kommen Sie nicht als Erster, das gilt fast als unangenehm. Aber zum Abendessen bei jemandem zu Hause: pünktlich. Da steht das Essen auf dem Tisch.",
      },
      { speaker: "Host", text: "Wo ist die Grenze?" },
      {
        speaker: "Sander",
        text: "Die Faustregel ist: Wenn jemand etwas für Sie vorbereitet hat, kommen Sie pünktlich. Wenn nicht, sind fünfzehn Minuten kein Problem.",
      },
      { speaker: "Host", text: "Und wenn ich mich verspäte?" },
      {
        speaker: "Sander",
        text: "Dann ist eine kurze Nachricht wichtiger als die Verspätung selbst. Das ist der eigentliche Punkt: Nicht die Zeit ist heilig, sondern die Information. Wer sich meldet, verletzt keine Regel.",
      },
      {
        speaker: "Sander",
        text: "Interessant ist übrigens die Universität. Da beginnt eine Vorlesung um zehn und heißt trotzdem „zehn Uhr“ — angefangen wird um Viertel nach. Das nennt sich akademisches Viertel und ist mehrere hundert Jahre alt.",
      },
    ],
    questions: [
      {
        text: "Wo sind Deutsche laut Dr. Sander wirklich pünktlich?",
        options: [
          "Im Beruf und bei Terminen mit Institutionen",
          "Überall",
          "Nur bei Partys",
        ],
        answer: 0,
        explain: "Özel hayatta klişenin dediğinden çok daha rahat.",
      },
      {
        text: "Was gilt bei einer Party?",
        options: [
          "Nicht als Erster kommen",
          "Genau pünktlich sein",
          "Eine Stunde später kommen",
        ],
        answer: 0,
        explain: "İlk gelen olmak neredeyse rahatsız edici sayılıyor.",
      },
      {
        text: "Was ist die Faustregel?",
        options: [
          "Wenn jemand etwas vorbereitet hat, pünktlich sein",
          "Immer 15 Minuten später",
          "Immer pünktlich",
        ],
        answer: 0,
        explain: "Biri sizin için bir şey hazırladıysa dakik olun.",
      },
      {
        text: "Was ist bei einer Verspätung am wichtigsten?",
        options: [
          "Eine kurze Nachricht",
          "Eine gute Ausrede",
          "Ein Geschenk",
        ],
        answer: 0,
        explain: "„Nicht die Zeit ist heilig, sondern die Information.“",
      },
      {
        text: "Was ist das „akademische Viertel“?",
        options: [
          "Vorlesungen beginnen 15 Minuten später als angekündigt",
          "Ein Stadtteil mit Universitäten",
          "Eine Pause zwischen zwei Vorlesungen",
        ],
        answer: 0,
        explain: "Saat onda denilen ders on beş geçe başlar — yüzlerce yıllık gelenek.",
      },
    ],
  },
  {
    id: "b1-l11",
    level: "B1",
    skill: "listening",
    title: "Ein Missverständnis im Team",
    genre: "Diyalog",
    intro:
      "İş yerinde yanlış anlaşılma nasıl konuşulur? Doğrudan ama kırmadan — Almanca iletişimin zor kısmı.",
    gloss: [
      { de: "das Missverständnis", tr: "yanlış anlaşılma", en: "misunderstanding" },
      { de: "der Vorwurf", tr: "suçlama", en: "accusation" },
      { de: "sich angegriffen fühlen", tr: "kendini saldırıya uğramış hissetmek", en: "to feel attacked" },
      { de: "die Absicht", tr: "niyet", en: "intention" },
      { de: "ansprechen", tr: "konuyu açmak", en: "to bring up" },
      { de: "klären", tr: "netleştirmek", en: "to clarify" },
      { de: "zugeben", tr: "itiraf etmek", en: "to admit" },
      { de: "abmachen", tr: "anlaşmak", en: "to agree" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Lea", text: "Jonas, hast du kurz Zeit? Ich möchte etwas ansprechen." },
      { speaker: "Jonas", text: "Klar. Klingt ernst." },
      {
        speaker: "Lea",
        text: "Gestern in der Besprechung hast du gesagt, der Bericht sei „irgendwie unvollständig“. Ich habe drei Tage daran gearbeitet.",
      },
      { speaker: "Jonas", text: "Oh. Ich wollte dich nicht kritisieren." },
      {
        speaker: "Lea",
        text: "Das glaube ich dir. Aber vor sieben Leuten wirkt so ein Satz anders als unter uns.",
      },
      {
        speaker: "Jonas",
        text: "Da hast du recht. Ich habe an die Zahlen aus dem Lager gedacht — die fehlen ja wirklich. Aber die hast du gar nicht bekommen, oder?",
      },
      { speaker: "Lea", text: "Genau. Ich habe zweimal gefragt und keine Antwort bekommen." },
      {
        speaker: "Jonas",
        text: "Dann war mein Satz einfach falsch. Ich sage das morgen in der Runde — kurz, ohne Drama, aber ich sage es.",
      },
      { speaker: "Lea", text: "Danke. Und wenn dir etwas auffällt, sag es mir gern vorher." },
      { speaker: "Jonas", text: "Machen wir so. Ich schreibe dir dann einfach direkt." },
    ],
    questions: [
      {
        text: "Warum spricht Lea Jonas an?",
        options: [
          "Wegen einer Bemerkung in der Besprechung",
          "Wegen einer verpassten Frist",
          "Wegen des Urlaubsplans",
        ],
        answer: 0,
        explain: "„der Bericht sei irgendwie unvollständig“ cümlesi rahatsız etmiş.",
      },
      {
        text: "Was stört sie genau?",
        options: [
          "Dass er es vor sieben Leuten gesagt hat",
          "Dass er es überhaupt gesagt hat",
          "Dass er nicht geholfen hat",
        ],
        answer: 0,
        explain: "„vor sieben Leuten wirkt so ein Satz anders als unter uns.“",
      },
      {
        text: "Was stellt sich heraus?",
        options: [
          "Lea hat die fehlenden Zahlen nie bekommen",
          "Lea hat sie vergessen",
          "Die Zahlen waren falsch",
        ],
        answer: 0,
        explain: "İki kez sormuş, cevap gelmemiş.",
      },
      {
        text: "Wie reagiert Jonas?",
        options: [
          "Er gibt den Fehler zu und will es öffentlich korrigieren",
          "Er verteidigt sich",
          "Er entschuldigt sich nur privat",
        ],
        answer: 0,
        explain: "„Ich sage das morgen in der Runde — kurz, ohne Drama, aber ich sage es.“",
      },
      {
        text: "Was machen sie für die Zukunft ab?",
        options: [
          "Kritik zuerst direkt, nicht in der Runde",
          "Keine Kritik mehr",
          "Alles schriftlich",
        ],
        answer: 0,
        explain: "„wenn dir etwas auffällt, sag es mir gern vorher.“",
      },
    ],
  },
  {
    id: "b1-l12",
    level: "B1",
    skill: "listening",
    title: "Die Eröffnung",
    genre: "Röportaj",
    intro:
      "Hikâyenin sonu: yerel radyo, kafesinin açılış gününde Tarek ile konuşuyor.",
    gloss: [
      { de: "die Eröffnung", tr: "açılış", en: "opening" },
      { de: "der Andrang", tr: "izdiham", en: "rush" },
      { de: "die Vorbereitung", tr: "hazırlık", en: "preparation" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
      { de: "die Schlange", tr: "kuyruk", en: "queue" },
      { de: "aufgeben", tr: "pes etmek", en: "to give up" },
      { de: "der Zweifel", tr: "şüphe", en: "doubt" },
      { de: "dankbar", tr: "minnettar", en: "grateful" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Reporterin",
        text: "Herr Haddad, seit heute Morgen um sieben steht hier eine Schlange. Haben Sie damit gerechnet?",
      },
      {
        speaker: "Tarek",
        text: "Überhaupt nicht. Ich habe für vierzig Frühstücke eingekauft. Um halb elf war alles weg.",
      },
      { speaker: "Reporterin", text: "Wie lange hat der Weg bis hierher gedauert?" },
      {
        speaker: "Tarek",
        text: "Vierzehn Monate. Neun davon nur Papier: Gewerbe, Erlaubnis, Bank, Gesundheitsamt. Gekocht habe ich in dieser Zeit fast nie.",
      },
      { speaker: "Reporterin", text: "Gab es einen Moment, in dem Sie aufgeben wollten?" },
      {
        speaker: "Tarek",
        text: "Ja, im Februar. Die Bank hat mir weniger gegeben, als ich wollte, und der Elektriker hatte keine Zeit. Ich habe drei Tage nicht geschlafen und gedacht: Das war's.",
      },
      { speaker: "Reporterin", text: "Was hat geholfen?" },
      {
        speaker: "Tarek",
        text: "Ein Mann aus einem Forum, Hassan. Wir kannten uns nicht. Er hat gesagt: „Ruf die Förderbank an, bevor du unterschreibst.“ Dieser eine Satz hat mir 15.000 Euro gespart.",
      },
      { speaker: "Reporterin", text: "Und was wünschen Sie sich für das erste Jahr?" },
      {
        speaker: "Tarek",
        text: "Dass ich in einem Jahr noch hier stehe. Und ehrlich gesagt: einen freien Sonntag.",
      },
    ],
    questions: [
      {
        text: "Was hat Tarek überrascht?",
        options: [
          "Der große Andrang am ersten Tag",
          "Die hohen Kosten",
          "Das schlechte Wetter",
        ],
        answer: 0,
        explain: "Kırk kahvaltılık alışveriş yapmış, 10:30'da her şey bitmiş.",
      },
      {
        text: "Wie lange hat der ganze Weg gedauert?",
        options: ["14 Monate", "9 Monate", "3 Monate"],
        answer: 0,
        explain: "„Vierzehn Monate. Neun davon nur Papier.“",
      },
      {
        text: "Wann wollte er aufgeben?",
        options: [
          "Im Februar, nach der Bank und dem Elektriker",
          "Ganz am Anfang",
          "Am Tag vor der Eröffnung",
        ],
        answer: 0,
        explain: "Banka az verdi, elektrikçinin vakti yoktu; üç gece uyuyamamış.",
      },
      {
        text: "Wer hat ihm geholfen?",
        options: [
          "Ein Unbekannter aus einem Forum",
          "Seine Bank",
          "Ein Freund aus der Küche",
        ],
        answer: 0,
        explain: "Hassan'ın tek cümlesi ona 15.000 euro kazandırmış.",
      },
      {
        text: "Was wünscht er sich?",
        options: [
          "In einem Jahr noch da zu sein — und einen freien Sonntag",
          "Ein zweites Café",
          "Mehr Personal",
        ],
        answer: 0,
        explain: "Son cevabı tam olarak bu.",
      },
    ],
  },

  {
    id: "b1-w1",
    level: "B1",
    skill: "writing",
    title: "Ein Fest für die Nachbarschaft",
    genre: "Yarı resmi e-posta",
    intro: "Komşularınla bir mahalle şenliği planlıyorsun — önce cümle kur, sonra bina yönetimine izin e-postası yaz.",
    minutes: 10,
    gloss: [
      { de: "der Aushang", tr: "ilan", en: "notice" },
      { de: "die Nachbarn einladen", tr: "komşuları davet etmek", en: "to invite the neighbors" },
      { de: "der Innenhof", tr: "iç avlu", en: "courtyard" },
      { de: "die Hausverwaltung", tr: "bina yönetimi", en: "property management" },
      { de: "die Erlaubnis", tr: "izin", en: "permission" },
      { de: "aufbauen", tr: "kurmak", en: "to set up" },
      { de: "aufräumen", tr: "toplamak", en: "to tidy up" },
      { de: "die Lautstärke", tr: "ses seviyesi", en: "volume" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Komşuları davet etmek için bir duyuru asıyorum.",
        answer: "Ich hänge einen Aushang auf, um die Nachbarn einzuladen.",
        alternatives: ["Um die Nachbarn einzuladen, hänge ich einen Aushang auf."],
        hint: "Amaç bildirmek için „um … zu“ kalıbı: fiil mastarı sona gider (einzuladen).",
      },
      {
        kind: "build",
        tr: "Herkes yiyecek bir şeyler getirse ne güzel olurdu.",
        answer: "Es wäre schön, wenn jeder etwas zu essen mitbringen würde.",
        alternatives: ["Wenn jeder etwas zu essen mitbringen würde, wäre es schön."],
        hint: "Konjunktiv II ile kibar dilek: „Es wäre schön, wenn … würde“. Yan cümlede çekimli fiil sonda.",
      },
      {
        kind: "free",
        prompt: "Komşularınla 14 Haziran Cumartesi günü bir mahalle şenliği düzenlemek istiyorsunuz. Bina yönetiminden Frau Winter'e yarı resmi bir e-posta yaz: kendini tanıt, planınızı açıkla, iç avluyu kullanmak için izin iste ve ses düzeni gibi kurallar olup olmadığını sor.",
        checklist: [
          "Uygun hitap (Sehr geehrte …) ve kapanış (Mit freundlichen Grüßen) kullandın mı?",
          "Şenliğin tarihini, yerini ve amacını açıkladın mı?",
          "İzni kibarca, Konjunktiv II ile istedin mi (dürften wir, wäre es möglich)?",
          "Toparlama ve ses düzeyi gibi konulara değinip yanıt rica ettin mi?",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich schreibe Ihnen, weil …", tr: "Size yazıyorum çünkü …", en: "I am writing to you because …" },
          { de: "Wir möchten gern … organisieren.", tr: "… düzenlemek istiyoruz.", en: "We would like to organize …" },
          { de: "Ich möchte Sie fragen, ob …", tr: "Size … olup olmadığını sormak istiyorum.", en: "I would like to ask you whether …" },
          { de: "Dürften wir dafür … benutzen?", tr: "Bunun için … kullanabilir miyiz acaba?", en: "Would we be allowed to use … for that?" },
          { de: "Es wäre schön, wenn …", tr: "… olursa çok iyi olur.", en: "It would be nice if …" },
          { de: "Wir würden natürlich alles wieder aufräumen.", tr: "Elbette her şeyi yeniden toplarız.", en: "We would of course tidy everything up again." },
          { de: "Über eine kurze Antwort würde ich mich freuen.", tr: "Kısa bir yanıt alırsam sevinirim.", en: "I would be glad to receive a short reply." },
        ],
        sample: "Sehr geehrte Frau Winter,\n\nich wohne seit drei Jahren in der Gartenstraße 5 und schreibe Ihnen im Namen mehrerer Nachbarn. Wir möchten am Samstag, dem 14. Juni, ein kleines Nachbarschaftsfest organisieren, damit sich die Bewohner besser kennenlernen. Deshalb möchte ich Sie fragen, ob wir dafür den Innenhof benutzen dürfen.\n\nWir würden Tische und Bänke selbst aufbauen und den Hof am Abend natürlich wieder aufräumen. Es wäre schön, wenn Sie uns außerdem sagen könnten, ob es Regeln zur Lautstärke gibt.\n\nÜber eine kurze Antwort bis Ende Mai würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nDeniz Aksoy",
      },
    ],
  },
  {
    id: "b1-w2",
    level: "B1",
    skill: "writing",
    title: "Soziale Netzwerke: Fluch oder Segen?",
    genre: "Forum",
    intro: "Bir internet forumunda sosyal medya tartışmasına katılıyorsun — görüşünü gerekçeleriyle yaz.",
    minutes: 10,
    gloss: [
      { de: "das soziale Netzwerk", tr: "sosyal ağ", en: "social network" },
      { de: "das Konto löschen", tr: "hesabı silmek", en: "to delete the account" },
      { de: "meiner Meinung nach", tr: "bence", en: "in my opinion" },
      { de: "einerseits … andererseits", tr: "bir yandan … öte yandan", en: "on the one hand … on the other hand" },
      { de: "die Benachrichtigung", tr: "bildirim", en: "notification" },
      { de: "die Bildschirmzeit", tr: "ekran süresi", en: "screen time" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
      { de: "es kommt darauf an", tr: "duruma bağlı", en: "it depends" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bence birçok insan internette çok fazla zaman geçiriyor.",
        answer: "Meiner Meinung nach verbringen viele Menschen zu viel Zeit online.",
        alternatives: ["Viele Menschen verbringen meiner Meinung nach zu viel Zeit online."],
        hint: "„Meiner Meinung nach“ cümlenin başındaysa fiil hemen ardından gelir (verbringen).",
      },
      {
        kind: "build",
        tr: "Yalnızca beni gerçekten ilgilendiren sayfaları takip ediyorum.",
        answer: "Ich folge nur Seiten, die mich wirklich interessieren.",
        hint: "Relativsatz: „Seiten, die …“ — ilgi cümlesinde çekimli fiil (interessieren) sona gider.",
      },
      {
        kind: "free",
        prompt: "„Digitales Leben“ forumundaki soruya bir yorum yaz: sosyal ağlar hakkındaki görüşünü açıkla, kendi deneyiminden en az bir örnek ver ve okuyanlara somut bir öneride bulun.",
        stimulus: "Immer mehr Menschen löschen ihre Social-Media-Konten. Brauchen wir soziale Netzwerke wirklich? Was meint ihr? — Beitrag von Markus82 im Forum „Digitales Leben“",
        checklist: [
          "Görüşünü açık bir kalıpla belirttin mi (meiner Meinung nach, ich finde, dass …)?",
          "En az bir avantaj ve bir dezavantajı karşılaştırdın mı (einerseits … andererseits)?",
          "Kendi deneyiminden somut bir örnek verdin mi?",
          "Sonunda okuyanlara bir öneri sundun mu?",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich habe lange über diese Frage nachgedacht.", tr: "Bu soru üzerinde uzun uzun düşündüm.", en: "I have thought about this question for a long time." },
          { de: "Meiner Meinung nach …", tr: "Bence …", en: "In my opinion …" },
          { de: "Einerseits …, andererseits …", tr: "Bir yandan …, öte yandan …", en: "On the one hand …, on the other hand …" },
          { de: "Ich habe die Erfahrung gemacht, dass …", tr: "Benim deneyimim şu ki …", en: "I have found that …" },
          { de: "Deshalb habe ich mir feste Regeln gesetzt.", tr: "Bu yüzden kendime kesin kurallar koydum.", en: "That is why I have set myself firm rules." },
          { de: "Ich würde jedem empfehlen, …", tr: "Herkese … tavsiye ederim.", en: "I would recommend that everyone …" },
          { de: "Es kommt darauf an, wie man es benutzt.", tr: "Nasıl kullandığına bağlı.", en: "It depends on how you use it." },
        ],
        sample: "Ich habe lange über diese Frage nachgedacht, weil ich selbst viel Zeit am Handy verbringe. Meiner Meinung nach sind soziale Netzwerke weder gut noch schlecht. Es kommt darauf an, wie man sie benutzt.\n\nEinerseits bleibe ich durch Instagram mit meiner Familie in der Türkei in Kontakt, was mir sehr wichtig ist. Andererseits merke ich, dass ich oft ohne Grund durch Videos scrolle und danach müde bin.\n\nDeshalb habe ich mir feste Regeln gesetzt: keine Apps vor der Arbeit und keine Benachrichtigungen am Abend. Ich würde jedem empfehlen, die eigene Bildschirmzeit einmal pro Woche zu kontrollieren. Ganz löschen möchte ich meine Konten aber nicht.",
      },
    ],
  },
  {
    id: "b1-w3",
    level: "B1",
    skill: "writing",
    title: "Absage an die Kursleiterin",
    genre: "Yarı resmi e-posta",
    intro: "Sınav hazırlık dersine katılamayacaksın — kurs öğretmenine durumu açıklayan bir e-posta yaz.",
    minutes: 8,
    gloss: [
      { de: "die Prüfungsvorbereitung", tr: "sınav hazırlığı", en: "exam preparation" },
      { de: "teilnehmen an", tr: "katılmak", en: "to take part in" },
      { de: "absagen", tr: "iptal etmek", en: "to cancel" },
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "die Unterlagen", tr: "belgeler", en: "documents" },
      { de: "das Übungsblatt", tr: "alıştırma kâğıdı", en: "worksheet" },
      { de: "der Arbeitgeber", tr: "işveren", en: "employer" },
      { de: "das Verständnis", tr: "anlayış", en: "understanding" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Kurs, tatil nedeniyle bir hafta ertelendi.",
        answer: "Der Kurs wurde wegen der Ferien um eine Woche verschoben.",
        alternatives: ["Wegen der Ferien wurde der Kurs um eine Woche verschoben."],
        hint: "Passiv Präteritum: „wurde … verschoben“. „wegen“ edatı Genitiv ister (wegen der Ferien).",
      },
      {
        kind: "build",
        tr: "Belgeleri bana lütfen e-postayla gönderebilir misiniz?",
        answer: "Könnten Sie mir bitte die Unterlagen per E-Mail schicken?",
        alternatives: ["Könnten Sie mir die Unterlagen bitte per E-Mail schicken?"],
        hint: "Kibar rica için Konjunktiv II: „Könnten Sie …?“ Mastar (schicken) cümlenin sonunda.",
      },
      {
        kind: "free",
        prompt: "Cuma günkü sınav hazırlık dersine iş yerindeki önemli bir toplantı yüzünden katılamayacaksın. Kurs öğretmenin Frau Berger'e yarı resmi bir e-posta yaz: özür dile, nedenini açıkla, ders materyallerini rica et ve kaçırdıklarını nasıl telafi edeceğini öner.",
        checklist: [
          "Katılamayacağını ve nedenini ilk cümlelerde net söyledin mi?",
          "Uygun bir özür kalıbı kullandın mı (das tut mir sehr leid)?",
          "Materyalleri Konjunktiv II ile kibarca istedin mi (wäre es möglich, könnten Sie)?",
          "Telafi için somut bir öneri yaptın mı?",
        ],
        minWords: 50,
        phrases: [
          { de: "Leider kann ich am … nicht teilnehmen.", tr: "Maalesef … günü katılamıyorum.", en: "Unfortunately I cannot take part on …" },
          { de: "Das tut mir sehr leid.", tr: "Bunun için çok üzgünüm.", en: "I am very sorry about that." },
          { de: "Ich habe an diesem Tag einen wichtigen Termin.", tr: "O gün önemli bir randevum var.", en: "I have an important appointment that day." },
          { de: "Wäre es möglich, dass …?", tr: "… mümkün olur mu acaba?", en: "Would it be possible for you to …?" },
          { de: "Könnten Sie mir … schicken?", tr: "Bana … gönderebilir misiniz?", en: "Could you send me …?" },
          { de: "Ich würde die Aufgaben zu Hause bearbeiten.", tr: "Alıştırmaları evde yaparım.", en: "I would work on the exercises at home." },
          { de: "Vielen Dank für Ihr Verständnis.", tr: "Anlayışınız için çok teşekkür ederim.", en: "Thank you very much for your understanding." },
        ],
        sample: "Sehr geehrte Frau Berger,\n\nleider kann ich am kommenden Freitag nicht an der Prüfungsvorbereitung teilnehmen, weil ich an diesem Tag einen wichtigen Termin bei meinem Arbeitgeber habe. Das tut mir sehr leid, denn dieser Unterricht ist kurz vor der Prüfung besonders wichtig.\n\nWäre es möglich, dass Sie mir die Übungsblätter per E-Mail schicken? Ich würde die Aufgaben am Wochenende zu Hause bearbeiten. Falls etwas unklar ist, könnte ich am Montag ein paar Minuten früher kommen und Ihnen Fragen stellen.\n\nVielen Dank für Ihr Verständnis.\n\nMit freundlichen Grüßen\nMurat Şahin",
      },
    ],
  },
  {
    id: "b1-w4",
    level: "B1",
    skill: "writing",
    title: "Autofreie Innenstadt: Ja oder Nein?",
    genre: "Forum",
    intro: "Şehir portalındaki arabasız şehir merkezi tartışmasına görüşünle katıl.",
    minutes: 12,
    gloss: [
      { de: "autofrei", tr: "arabasız", en: "car-free" },
      { de: "die Innenstadt", tr: "şehir merkezi", en: "city center" },
      { de: "sperren für", tr: "kapatmak", en: "to close off to" },
      { de: "die Luftqualität", tr: "hava kalitesi", en: "air quality" },
      { de: "öffentliche Verkehrsmittel", tr: "toplu taşıma", en: "public transport" },
      { de: "der Handwerker", tr: "usta", en: "craftsman" },
      { de: "vorschlagen", tr: "önermek", en: "to suggest" },
      { de: "die Alternative", tr: "alternatif", en: "alternative" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Şehir merkezi hafta sonları arabalara kapatılmalı.",
        answer: "Die Innenstadt sollte am Wochenende für Autos gesperrt werden.",
        alternatives: ["Am Wochenende sollte die Innenstadt für Autos gesperrt werden."],
        hint: "„sollte“ + Passiv mastarı: „gesperrt werden“ cümlenin sonunda blok hâlinde durur.",
      },
      {
        kind: "build",
        tr: "Otobüsler daha ucuz olsaydı, daha çok insan onları kullanırdı.",
        answer: "Wenn die Busse billiger wären, würden mehr Menschen sie benutzen.",
        alternatives: ["Mehr Menschen würden die Busse benutzen, wenn sie billiger wären."],
        hint: "Gerçek dışı koşul: iki tarafta da Konjunktiv II (wären / würden … benutzen).",
      },
      {
        kind: "free",
        prompt: "Şehir portalındaki soruya bir yorum yaz: arabasız şehir merkezi hakkındaki görüşünü belirt, en az iki gerekçe ver, karşı görüşe de kısaca değin ve bir çözüm öner.",
        stimulus: "Unsere Stadt diskutiert: Soll die Innenstadt für private Autos gesperrt werden? Schreiben Sie uns Ihre Meinung! — Umfrage auf dem Stadtportal Ludwigsburg",
        checklist: [
          "Görüşünü net bir cümleyle ortaya koydun mu?",
          "En az iki gerekçe verdin mi (hava kalitesi, güvenlik, yaşam kalitesi …)?",
          "Karşı görüşü kısaca kabul edip yanıtladın mı (natürlich …, aber …)?",
          "Somut bir öneriyle bitirdin mi (ich schlage vor, dass …)?",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich finde diese Idee großartig.", tr: "Bu fikri harika buluyorum.", en: "I think this idea is great." },
          { de: "Der wichtigste Grund ist für mich …", tr: "Benim için en önemli neden …", en: "For me the most important reason is …" },
          { de: "Außerdem …", tr: "Ayrıca …", en: "In addition …" },
          { de: "Natürlich brauchen manche Menschen das Auto.", tr: "Elbette bazı insanların arabaya ihtiyacı var.", en: "Of course some people need a car." },
          { de: "Deshalb schlage ich vor, dass …", tr: "Bu yüzden … öneriyorum.", en: "That is why I suggest that …" },
          { de: "So hätte jeder eine gute Alternative.", tr: "Böylece herkesin iyi bir alternatifi olurdu.", en: "That way everyone would have a good alternative." },
        ],
        sample: "In meiner Heimatstadt gibt es seit einem Jahr einen autofreien Sonntag pro Monat, und ich finde diese Idee großartig. Meiner Meinung nach sollten noch mehr Städte das ausprobieren.\n\nDer wichtigste Grund ist für mich die Luftqualität. Außerdem ist es viel angenehmer, durch die Stadt zu laufen, wenn keine Autos fahren. Kinder können sicher mit dem Rad fahren, und die Cafés stellen ihre Tische auf die Straße.\n\nNatürlich brauchen manche Menschen das Auto, zum Beispiel Handwerker oder Familien mit kleinen Kindern. Deshalb schlage ich vor, dass Busse und Bahnen an diesen Tagen kostenlos fahren. So hätte jeder eine gute Alternative.",
      },
    ],
  },
  {
    id: "b1-w5",
    level: "B1",
    skill: "writing",
    title: "Beschwerde an den Vermieter",
    genre: "Resmî yazı",
    intro:
      "Almanya'da kiracı hakkını yazıyla arar. Somut, tarihli ve süre veren bir şikâyet mektubu yazacaksın.",
    gloss: [
      { de: "der Mangel", tr: "kusur", en: "defect" },
      { de: "beheben", tr: "gidermek", en: "to fix" },
      { de: "die Frist setzen", tr: "süre vermek", en: "to set a deadline" },
      { de: "die Mietminderung", tr: "kira indirimi", en: "rent reduction" },
      { de: "mehrfach", tr: "birden çok kez", en: "multiple times" },
      { de: "der Nachweis", tr: "kanıt", en: "proof" },
      { de: "auffordern", tr: "talep etmek", en: "to request" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kalorifer 3 Ocak'tan beri çalışmıyor.",
        answer: "Die Heizung funktioniert seit dem 3. Januar nicht.",
        hint: "„seit“ + Dativ ve tarih: seit dem 3. Januar.",
      },
      {
        kind: "build",
        tr: "Size bunu iki kez telefonla bildirdim.",
        answer: "Ich habe Ihnen das zweimal telefonisch mitgeteilt.",
        hint: "mitteilen Dativ ister: Ihnen. Perfekt: habe … mitgeteilt.",
      },
      {
        kind: "build",
        tr: "Size 15 Ocak'a kadar süre veriyorum.",
        answer: "Ich setze Ihnen eine Frist bis zum 15. Januar.",
        hint: "„eine Frist setzen“ kalıp; bis zum + tarih.",
      },
      {
        kind: "free",
        prompt:
          "Ev sahibine bir şikâyet mektubu yaz. Beş noktaya değin: sorun tam olarak nedir ve ne zamandır sürüyor, daha önce ne yaptın, sorunun sana etkisi, net bir talep ve süre, kibar ama kararlı kapanış. Duygusal değil, tarihli ve somut yaz.",
        checklist: [
          "Sorunu ve başlangıç tarihini yazdın mı?",
          "Önceki bildirimlerini (tarihleriyle) belirttin mi?",
          "Etkisini somut anlattın mı?",
          "Net bir talep ve süre verdin mi?",
          "Ton kararlı ama kibar mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "hiermit möchte ich Sie darauf hinweisen, dass …", tr: "bu vesileyle … olduğunu bildirmek isterim.", en: "I would hereby like to point out that …" },
          { de: "Ich habe Sie bereits am … informiert.", tr: "Sizi … tarihinde zaten bilgilendirmiştim.", en: "I already informed you on …" },
          { de: "Die Wohnung ist dadurch …", tr: "Bu nedenle daire …", en: "As a result the apartment is …" },
          { de: "Ich fordere Sie auf, … zu beheben.", tr: "…'i gidermenizi talep ediyorum.", en: "I request that you remedy …" },
          { de: "Ich setze Ihnen eine Frist bis zum …", tr: "Size …'e kadar süre veriyorum.", en: "I am setting you a deadline of …" },
          { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
        ],
        sample:
          "Sehr geehrter Herr Bach,\n\nhiermit möchte ich Sie darauf hinweisen, dass die Heizung in meiner Wohnung seit dem 3. Januar nicht funktioniert. In den Zimmern sind es morgens nur 15 Grad.\n\nIch habe Sie bereits am 4. und am 9. Januar telefonisch informiert. Beide Male wurde mir ein Termin mit dem Hausmeister zugesagt, der bisher nicht stattgefunden hat.\n\nDie Wohnung ist dadurch kaum nutzbar. Mein Sohn ist sechs Jahre alt und war letzte Woche erkältet.\n\nIch fordere Sie auf, den Mangel zu beheben, und setze Ihnen eine Frist bis zum 15. Januar. Sollte bis dahin nichts geschehen, werde ich die Miete entsprechend mindern.\n\nÜber eine kurze Rückmeldung würde ich mich freuen.\n\nMit freundlichen Grüßen\nTarek Haddad",
      },
    ],
  },
  {
    id: "b1-w6",
    level: "B1",
    skill: "writing",
    title: "Forumsbeitrag mit Meinung",
    genre: "Sınav formatı",
    intro:
      "B1 sınavının klasik yazma görevi: bir forum yazısına kendi görüşünle cevap ver — görüş, gerekçe, örnek ve öneri.",
    gloss: [
      { de: "der Beitrag", tr: "gönderi", en: "post" },
      { de: "die Meinung", tr: "görüş", en: "opinion" },
      { de: "der Vorteil", tr: "avantaj", en: "advantage" },
      { de: "der Nachteil", tr: "dezavantaj", en: "disadvantage" },
      { de: "meiner Meinung nach", tr: "bence", en: "in my opinion" },
      { de: "einerseits … andererseits", tr: "bir yandan … öte yandan", en: "on the one hand … on the other hand" },
      { de: "vorschlagen", tr: "önermek", en: "to suggest" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bence okullar cep telefonlarını yasaklamamalı.",
        answer: "Meiner Meinung nach sollten Schulen Handys nicht verbieten.",
        hint: "„Meiner Meinung nach“ ile başlayınca fiil hemen arkasından gelir.",
      },
      {
        kind: "build",
        tr: "Bir yandan bu dikkat dağıtıyor, öte yandan öğrenmeye de yardım ediyor.",
        answer: "Einerseits lenkt das ab, andererseits hilft es auch beim Lernen.",
        hint: "İki bölümün de fiili ikinci sırada olmalı.",
      },
      {
        kind: "build",
        tr: "Bu yüzden net kuralların olmasını öneriyorum.",
        answer: "Deshalb schlage ich vor, dass es klare Regeln gibt.",
        hint: "„vorschlagen“ ayrılabilir; dass yan cümlesinde fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "Bir forumda şu soru tartışılıyor: „Ev ödevi kaldırılmalı mı?“ Kendi görüşünle bir yorum yaz. Dört noktaya değin: görüşün, en az iki gerekçe, kendi hayatından bir örnek, somut bir öneri.",
        checklist: [
          "Görüşünü ilk cümlelerde net söyledin mi?",
          "En az iki gerekçe verdin mi?",
          "Kişisel bir örnek verdin mi?",
          "Karşı görüşe bir cümleyle değindin mi?",
          "Somut bir öneriyle bitirdin mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich habe den Beitrag von … gelesen.", tr: "…'in gönderisini okudum.", en: "I have read the post by …" },
          { de: "Meiner Meinung nach …", tr: "Bence …", en: "In my opinion …" },
          { de: "Der wichtigste Grund ist …", tr: "En önemli neden …", en: "The most important reason is …" },
          { de: "Bei mir war es so, dass …", tr: "Bende şöyle oldu: …", en: "In my case it was like this: …" },
          { de: "Natürlich gibt es auch …", tr: "Elbette … de var.", en: "Of course there are also …" },
          { de: "Deshalb schlage ich vor, dass …", tr: "Bu yüzden … öneriyorum.", en: "That is why I suggest that …" },
        ],
        sample:
          "Ich habe den Beitrag von Lisa93 gelesen und finde die Frage sehr interessant.\n\nMeiner Meinung nach sollten Hausaufgaben nicht abgeschafft, aber deutlich reduziert werden. Der wichtigste Grund ist die Zeit: Viele Kinder sind bis 16 Uhr in der Schule und danach noch zwei Stunden am Schreibtisch. Der zweite Grund ist die Ungerechtigkeit — wer Eltern hat, die helfen können, ist klar im Vorteil.\n\nBei mir war es so, dass ich in Mathematik nie Hilfe bekommen habe. Meine Eltern hatten die Themen selbst nie gelernt. Ich habe die Aufgaben trotzdem gemacht, aber oft falsch, und niemand hat es gemerkt.\n\nNatürlich gibt es auch gute Gründe für Hausaufgaben: Man wiederholt den Stoff und lernt, selbstständig zu arbeiten.\n\nDeshalb schlage ich vor, dass es zwei- bis dreimal pro Woche kleine Aufgaben gibt und dafür in der Schule eine feste Lernstunde. So hätten alle Kinder die gleiche Chance.",
      },
    ],
  },
  {
    id: "b1-w7",
    level: "B1",
    skill: "writing",
    title: "Duzen oder siezen — deine Erfahrung",
    genre: "Kültür",
    intro:
      "b1-r9'daki konuyu kendi deneyiminle yazacaksın: bir yanlış anlaşılma, ne öğrendiğin ve bir tavsiye.",
    gloss: [
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "peinlich", tr: "utanç verici", en: "embarrassing" },
      { de: "reagieren", tr: "tepki vermek", en: "to react" },
      { de: "der Rat", tr: "tavsiye", en: "advice" },
      { de: "sich unsicher fühlen", tr: "kendini emin hissetmemek", en: "to feel unsure" },
      { de: "auffallen", tr: "dikkat çekmek", en: "to stand out" },
      { de: "inzwischen", tr: "artık", en: "by now" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Başlangıçta herkese „du“ diyordum.",
        answer: "Am Anfang habe ich alle geduzt.",
        hint: "„duzen“ Akkusativ ister: alle geduzt.",
      },
      {
        kind: "build",
        tr: "Kimse bir şey söylemedi ama bir şeyi fark ettim.",
        answer: "Niemand hat etwas gesagt, aber mir ist etwas aufgefallen.",
        hint: "„auffallen“ Dativ ile: mir ist … aufgefallen.",
      },
      {
        kind: "build",
        tr: "Artık emin olmadığımda soruyorum.",
        answer: "Inzwischen frage ich, wenn ich unsicher bin.",
        hint: "„Inzwischen“ başta, fiil ikinci sırada; yan cümlede fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "„du“ ve „Sie“ ile ilgili kendi deneyimini anlat. Dört noktaya değin: bir durum (nerede, kiminle), ne yaptın ve ne oldu, o an ne hissettin, bugün ne yapıyorsun ve yeni gelen birine tavsiyen. Anlatıyla başla, açıklamayla değil.",
        checklist: [
          "Somut bir sahneyle başladın mı?",
          "Ne olduğunu geçmiş zamanla anlattın mı?",
          "Duyguyu adlandırdın mı?",
          "Bugünle karşılaştırdın mı?",
          "Net bir tavsiyeyle bitirdin mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Als ich neu hier war, …", tr: "Buraya yeni geldiğimde …", en: "When I was new here …" },
          { de: "Ich wusste nicht, ob …", tr: "… olup olmadığını bilmiyordum.", en: "I did not know whether …" },
          { de: "Das war mir sehr peinlich.", tr: "Çok utandım.", en: "That was very embarrassing for me." },
          { de: "Zum Glück hat … freundlich reagiert.", tr: "Neyse ki … kibar bir tepki verdi.", en: "Luckily … reacted in a friendly way." },
          { de: "Inzwischen mache ich es so: …", tr: "Artık şöyle yapıyorum: …", en: "By now I do it like this: …" },
          { de: "Mein Rat wäre: …", tr: "Tavsiyem şu olurdu: …", en: "My advice would be: …" },
        ],
        sample:
          "Als ich neu hier war, habe ich in meinem ersten Job alle geduzt — auch den Chef. Im Lager haben das alle so gemacht, und ich dachte, das ist überall gleich.\n\nDann kam ein Termin mit einer Kundin, einer älteren Frau. Ich habe gesagt: „Kannst du mir kurz die Nummer geben?“ Sie hat einen Moment nichts gesagt. Danach hat sie sehr betont „Sie“ zu mir gesagt, in jedem Satz.\n\nDas war mir sehr peinlich. Ich habe mich den ganzen Tag schlecht gefühlt, obwohl niemand mich kritisiert hat.\n\nSpäter hat mir eine Kollegin erklärt, dass es nicht am Alter liegt, sondern an der Situation: intern anders als mit Kunden. Zum Glück hat sie freundlich reagiert und nicht gelacht.\n\nInzwischen mache ich es so: Ich sieze, bis mir das „du“ angeboten wird. Wenn ich unsicher bin, frage ich einfach.\n\nMein Rat wäre: Fragen ist nie peinlich. Falsch duzen kann man nicht zurücknehmen.",
      },
    ],
  },
  {
    id: "b1-w8",
    level: "B1",
    skill: "writing",
    title: "Einladung zur Eröffnung",
    genre: "Duyuru",
    intro:
      "Hikâyenin son parçası: Tarek'in yerine geçip kafenin açılış davetini yazacaksın — mahalleye asılacak bir metin.",
    gloss: [
      { de: "die Eröffnung", tr: "açılış", en: "opening" },
      { de: "herzlich einladen", tr: "içtenlikle davet etmek", en: "to cordially invite" },
      { de: "der Anlass", tr: "vesile", en: "occasion" },
      { de: "kosten (probieren)", tr: "tatmak", en: "to taste" },
      { de: "die Nachbarschaft", tr: "komşuluk", en: "neighborhood" },
      { de: "sich freuen auf", tr: "dört gözle beklemek", en: "to look forward to" },
      { de: "vorbeikommen", tr: "uğramak", en: "to come by" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Sizi açılışıma içtenlikle davet ediyorum.",
        answer: "Ich lade Sie herzlich zu meiner Eröffnung ein.",
        hint: "„einladen zu“ + Dativ; fiil ayrılabilir: lade … ein.",
      },
      {
        kind: "build",
        tr: "Bütün gün ücretsiz çay ve tatlı ikram edilecek.",
        answer: "Den ganzen Tag gibt es kostenlos Tee und Süßigkeiten.",
        hint: "„es gibt“ + Akkusativ; zaman ifadesi başa alınabilir.",
      },
      {
        kind: "build",
        tr: "Gelemezseniz de bir başka gün uğrayın.",
        answer: "Wenn Sie nicht kommen können, kommen Sie gern an einem anderen Tag vorbei.",
        hint: "Yan cümleyle başlayınca ana cümle fiille başlar.",
      },
      {
        kind: "free",
        prompt:
          "Mahalleye asılacak bir açılış daveti yaz. Beş noktaya değin: kim olduğun ve ne açtığın, ne zaman ve nerede, o gün ne olacak (ikram, müzik, indirim), neden bu mahalleyi seçtiğin (bir cümlelik kişisel not), sıcak bir kapanış. Duyuru kısa ve davetkâr olmalı.",
        checklist: [
          "Ne, nerede, ne zaman — üçü de var mı?",
          "O gün ne olacağını yazdın mı?",
          "Kişisel bir cümle koydun mu (sadece bilgi değil)?",
          "Gelemeyenlere de bir cümle var mı?",
          "Metin bir duyuru olarak kısa mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Ab dem … gibt es …", tr: "…'den itibaren … var.", en: "As of … there is …" },
          { de: "Ich lade Sie herzlich ein.", tr: "Sizi içtenlikle davet ediyorum.", en: "I cordially invite you." },
          { de: "An diesem Tag …", tr: "O gün …", en: "On that day …" },
          { de: "Ich freue mich darauf, Sie kennenzulernen.", tr: "Sizinle tanışmayı dört gözle bekliyorum.", en: "I am looking forward to meeting you." },
          { de: "Kommen Sie gern vorbei.", tr: "Çekinmeden uğrayın.", en: "Feel free to drop by." },
        ],
        sample:
          "Liebe Nachbarinnen und Nachbarn,\n\nmein Name ist Tarek Haddad, und ab dem 12. September gibt es in der Lindenstraße 6 etwas Neues: das Café Sahar, mit syrischem Frühstück.\n\nZur Eröffnung am Samstag lade ich Sie herzlich ein. An diesem Tag gibt es den ganzen Tag kostenlos Tee und Süßigkeiten, und ab 15 Uhr spielt eine kleine Band aus dem Viertel.\n\nIch koche seit sechs Jahren in dieser Stadt, aber immer in fremden Küchen. Jetzt endlich in meiner eigenen — und zwar in dem Viertel, in dem ich selbst wohne.\n\nWenn Sie am Samstag keine Zeit haben, kommen Sie gern an einem anderen Tag vorbei. Wir haben von Dienstag bis Sonntag ab 8 Uhr geöffnet.\n\nIch freue mich darauf, Sie kennenzulernen.\n\nTarek Haddad",
      },
    ],
  },
];
