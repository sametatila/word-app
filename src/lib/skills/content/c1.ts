import type { SkillExercise } from "../types";
import { c1U01 } from "./c1-u01";
import { c1U02 } from "./c1-u02";
import { c1U03 } from "./c1-u03";
import { c1U04 } from "./c1-u04";
import { c1U05 } from "./c1-u05";
import { c1U06 } from "./c1-u06";
import { c1U07 } from "./c1-u07";
import { c1U08 } from "./c1-u08";
import { c1U09 } from "./c1-u09";
import { c1U10 } from "./c1-u10";
import { c1U11 } from "./c1-u11";
import { c1U12 } from "./c1-u12";
import { c1U13 } from "./c1-u13";
import { c1U14 } from "./c1-u14";
import { c1U15 } from "./c1-u15";
import { c1U16 } from "./c1-u16";
import { c1U17 } from "./c1-u17";
import { c1U18 } from "./c1-u18";
import { c1U19 } from "./c1-u19";
import { c1U20 } from "./c1-u20";
import { c1U21 } from "./c1-u21";

/**
 * C1 — okuma, dinleme ve yazma egzersizleri.
 *
 * Ünite hizalı içerik EN BAŞTA durur: immersion yerleşimi `unit` etiketine
 * değil LİSTE SIRASINA bakıyor (buildTrack havuzları imleçle tüketir). Eski
 * genel C1 içeriği sonraki ünitelere kayar ve köprü olur — A1 ve A2 tarafındaki
 * düzenin aynısı. Eski kimlikler silinmez: user_skills birincil anahtarı
 * (user_id, exercise_id) ve silinen kimlik canlı ilerlemeyi götürür.
 */
export const c1: SkillExercise[] = [
  ...c1U01,
  ...c1U02,
  ...c1U03,
  ...c1U04,
  ...c1U05,
  ...c1U06,
  ...c1U07,
  ...c1U08,
  ...c1U09,
  ...c1U10,
  ...c1U11,
  ...c1U12,
  ...c1U13,
  ...c1U14,
  ...c1U15,
  ...c1U16,
  ...c1U17,
  ...c1U18,
  ...c1U19,
  ...c1U20,
  ...c1U21,
  // ---------------------------------------------------------------- OKUMA
  {
    id: "c1-r1",
    level: "C1",
    skill: "reading",
    title: "Die Verantwortungslücke",
    genre: "Deneme",
    intro: "Algoritmalar karar veriyor — ama yanıldıklarında sorumluluğu kim üstleniyor? Bu fikir yazısında yazarın savını ve ince ayrımlarını yakala.",
    minutes: 7,
    gloss: [
      { de: "die Vergabe", tr: "tahsis", en: "allocation" },
      { de: "die Urteilskraft", tr: "muhakeme gücü", en: "judgment" },
      { de: "voreingenommen", tr: "önyargılı", en: "biased" },
      { de: "der Vertrauensvorschuss", tr: "peşin güven", en: "benefit of the doubt" },
      { de: "die Rechenschaft", tr: "hesap verme", en: "accountability" },
      { de: "jemandem etwas zurechnen", tr: "atfetmek", en: "to attribute" },
      { de: "die Bonität", tr: "ödeme gücü", en: "creditworthiness" },
      { de: "strukturschwach", tr: "yapısal olarak zayıf", en: "structurally weak" },
      { de: "etwas fortschreiben", tr: "sürdürmek", en: "to perpetuate" },
      { de: "wohlfeil", tr: "kolaycı", en: "facile" },
      { de: "einklagbar", tr: "dava edilebilir", en: "enforceable" },
      { de: "etwas revidieren", tr: "gözden geçirmek", en: "to revise" },
    ],
    text: "Ob bei der Vergabe von Krediten, der Vorauswahl von Bewerbungen oder der Diagnose seltener Krankheiten – algorithmische Systeme treffen längst Entscheidungen, die tief in Lebensläufe eingreifen. Ihre Befürworter verweisen auf Effizienz und vermeintliche Objektivität; wer je einem voreingenommenen Sachbearbeiter gegenübersaß, mag der Maschine sogar mehr Fairness zutrauen. Doch dieser Vertrauensvorschuss beruht auf einer folgenreichen Verwechslung: Rechenleistung ist nicht Urteilskraft.\n\nDas Kernproblem lässt sich als Verantwortungslücke beschreiben. Irrt ein menschlicher Entscheider, kann er zur Rechenschaft gezogen werden; irrt ein lernendes System, verteilt sich die Verantwortung auf Entwickler, Betreiber und Datenlieferanten, bis sie am Ende niemandem mehr zuzurechnen ist. Die Technikphilosophin Judith Aschmann hat dafür das Bild der „organisierten Unverantwortlichkeit“ geprägt: Je komplexer das System, desto leichter fällt es jedem Beteiligten, auf die anderen zu verweisen.\n\nEmpirisch ist das Problem keineswegs marginal. Eine Untersuchung des Karlsruher Instituts für Technikfolgenabschätzung wertete im vergangenen Jahr rund 1.200 automatisierte Kreditentscheidungen aus und stellte fest, dass Antragsteller aus strukturschwachen Stadtteilen bei gleicher Bonität signifikant häufiger abgelehnt wurden. Der Fehler lag nicht im Code, sondern in den historischen Daten, die vergangene Diskriminierung schlicht fortschrieben. Besonders brisant: Die Betroffenen erfuhren in der Regel gar nicht, dass eine Maschine über sie geurteilt hatte – ein Widerspruch war damit faktisch ausgeschlossen.\n\nDaraus folgt nicht, algorithmische Systeme zu verbieten; eine solche Forderung wäre so wohlfeil wie wirkungslos. Zu verlangen ist vielmehr eine einklagbare Rechenschaftspflicht: Wer automatisierte Entscheidungen einsetzt, muss sie erklären, unabhängig überprüfen lassen und im Zweifel revidieren können. Die europäische KI-Verordnung weist in diese Richtung, bleibt bei den Sanktionen jedoch halbherzig. Solange sich Verantwortung im Geflecht der Zuständigkeiten verliert, gilt: Nicht die künstliche Intelligenz ist das eigentliche Risiko, sondern die menschliche Bequemlichkeit, ihr das Urteil zu überlassen.",
    questions: [
      {
        text: "Welche These vertritt der Autor in erster Linie?",
        options: [
          "Algorithmische Entscheidungen müssen mit einer durchsetzbaren Rechenschaftspflicht verbunden werden.",
          "Algorithmische Systeme sollten aus sensiblen Lebensbereichen vollständig verbannt werden.",
          "Maschinen entscheiden nachweislich fairer als voreingenommene Sachbearbeiter.",
        ],
        answer: 0,
        explain: "Yazar yasaklamayı „so wohlfeil wie wirkungslos“ (kolaycı ve etkisiz) diye reddediyor; asıl talebi „eine einklagbare Rechenschaftspflicht“, yani dava edilebilir bir hesap verme yükümlülüğü.",
      },
      {
        text: "Was ist mit der „Verantwortungslücke“ gemeint?",
        options: [
          "Entwicklern fehlt das juristische Wissen, um Verantwortung zu übernehmen.",
          "Bei Fehlern lernender Systeme verteilt sich die Verantwortung so, dass sie niemandem mehr zugerechnet werden kann.",
          "Der Staat hat bisher keine Behörde geschaffen, die Algorithmen kontrolliert.",
        ],
        answer: 1,
        explain: "İkinci paragraf tanımlıyor: sorumluluk geliştirici, işletmeci ve veri sağlayıcılar arasında dağılıyor, „bis sie am Ende niemandem mehr zuzurechnen ist“. Diğer şıklar metinde geçmeyen çıkarımlar.",
      },
      {
        text: "Laut der Karlsruher Untersuchung lag die Ursache der Benachteiligung in einem fehlerhaften Programmcode.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Metin tam tersini söylüyor: „Der Fehler lag nicht im Code, sondern in den historischen Daten“ — ayrımcılığı sürdüren şey geçmiş veriler.",
      },
      {
        text: "Wie beurteilt der Autor die europäische KI-Verordnung?",
        options: [
          "Sie geht in die richtige Richtung, ist bei den Sanktionen aber zu zurückhaltend.",
          "Sie verhindert wirksam, dass sich Verantwortung im Geflecht der Zuständigkeiten verliert.",
          "Sie ist gescheitert, weil sie automatisierte Entscheidungen pauschal verbietet.",
        ],
        answer: 0,
        explain: "Son paragrafta ince bir değerlendirme var: yönetmelik „weist in diese Richtung“ ama yaptırımlarda „halbherzig“ (gönülsüz) kalıyor.",
      },
      {
        text: "Die von der Studie untersuchten Antragsteller wussten meist nicht, dass eine Maschine über sie entschieden hatte.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Üçüncü paragraf bunu açıkça belirtiyor: „Die Betroffenen erfuhren in der Regel gar nicht, dass eine Maschine über sie geurteilt hatte“ — bu yüzden itiraz da fiilen imkânsızdı.",
      },
    ],
  },
  {
    id: "c1-r2",
    level: "C1",
    skill: "reading",
    title: "Ganztagsschule: Mehr als Aufbewahrung?",
    genre: "Bilimsel makale",
    intro: "Almanya'daki tam gün okul reformunu inceleyen bu makalede araştırma bulgularıyla siyasi vaatler arasındaki gerilimi çözümle.",
    minutes: 7,
    gloss: [
      { de: "der Rechtsanspruch", tr: "yasal hak", en: "legal claim" },
      { de: "händeringend", tr: "çaresizce", en: "desperately" },
      { de: "ernüchternd", tr: "hayal kırıklığı yaratan", en: "sobering" },
      { de: "etwas verzahnen", tr: "bütünleştirmek", en: "to interlock" },
      { de: "aufholen", tr: "açığı kapatmak", en: "to catch up" },
      { de: "die Fachkraft", tr: "nitelikli eleman", en: "skilled worker" },
      { de: "der Etikettenschwindel", tr: "etiket aldatmacası", en: "false labeling" },
      { de: "die Aufbewahrung", tr: "çocuk bekletme", en: "childminding" },
      { de: "verbindlich", tr: "bağlayıcı", en: "binding" },
      { de: "leer ausgehen", tr: "eli boş kalmak", en: "to come away empty-handed" },
      { de: "auf etwas ausweichen", tr: "bir alternatife yönelmek", en: "to switch to an alternative" },
    ],
    text: "Ab dem Schuljahr 2026/27 haben Grundschulkinder in Deutschland einen Rechtsanspruch auf Ganztagsbetreuung – ein bildungspolitisches Großprojekt, das Eltern entlasten und Chancengleichheit fördern soll. Doch während die Kommunen händeringend Räume und Personal suchen, mehren sich die Zweifel, ob der Ausbau hält, was die Politik verspricht.\n\nNeue Befunde liefert die Langzeitstudie „LernZeit“ des Bamberger Instituts für Bildungsverläufe, die seit 2018 rund 9.400 Schülerinnen und Schüler begleitet. Das zentrale Ergebnis wirkt zunächst ernüchternd: Der bloße Besuch einer Ganztagsschule verbessert die Leistungen in Deutsch und Mathematik im Durchschnitt kaum. Entscheidend sei nicht die dort verbrachte Zeit, sondern deren Gestaltung, betont Studienleiterin Carolin Weidner. Erst wenn Unterricht, Förderung und Freizeitangebote systematisch verzahnt würden und qualifiziertes Personal die Lernbegleitung übernehme, zeigten sich messbare Effekte – dann allerdings deutliche: Kinder aus einkommensschwachen Familien holten in gut strukturierten Ganztagsschulen binnen zwei Jahren etwa ein halbes Schuljahr auf.\n\nGenau hier liegt das Dilemma. Nach Schätzungen des Deutschen Jugendinstituts fehlen bis 2030 mindestens 30.000 pädagogische Fachkräfte, um den Rechtsanspruch überhaupt zu erfüllen – von Qualität ist dabei noch gar nicht die Rede. Viele Träger behelfen sich bereits heute mit ungelerntem Personal und gekürzten Angeboten; mancherorts besteht der „Ganztag“ aus wenig mehr als beaufsichtigtem Warten.\n\nKritiker sprechen deshalb von einem drohenden Etikettenschwindel: Wo Ganztag draufstehe, dürfe nicht bloße Aufbewahrung drinstecken. Die Studienautoren plädieren dafür, den weiteren Ausbau an verbindliche Qualitätsstandards zu koppeln, statt allein die Zahl der Plätze zu zählen. Andernfalls drohe ein bitteres Paradox: Gut situierte Familien wichen auf private Angebote aus, während öffentliche Schulen in benachteiligten Vierteln mit unbesetzten Stellen kämpften – und ausgerechnet jene Kinder leer ausgingen, denen der Ganztag am meisten nützen könnte.",
    questions: [
      {
        text: "Was ist das zentrale Ergebnis der Studie „LernZeit“?",
        options: [
          "Ganztagsschulen verbessern die Leistungen aller Kinder deutlich und dauerhaft.",
          "Nicht die verbrachte Zeit, sondern die Qualität der Gestaltung entscheidet über den Lernerfolg.",
          "Der Besuch einer Ganztagsschule wirkt sich negativ auf Deutsch und Mathematik aus.",
        ],
        answer: 1,
        explain: "Çalışma yöneticisi Weidner'in vurgusu: „Entscheidend sei nicht die dort verbrachte Zeit, sondern deren Gestaltung“. İlk şık aşırı genelleme, üçüncüsü çarpıtma — metin ‚kaum verbessert‘ diyor, ‚verschlechtert‘ değil.",
      },
      {
        text: "Kinder aus einkommensschwachen Familien holten in gut strukturierten Ganztagsschulen innerhalb von zwei Jahren etwa ein halbes Schuljahr auf.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İkinci paragrafın sonunda aynen böyle geçiyor — ama dikkat: bu etki yalnızca „gut strukturierte“ okullar için geçerli, genel ortalama için değil.",
      },
      {
        text: "Welche Rolle spielt der Fachkräftemangel im Text?",
        options: [
          "Er wurde durch den Rechtsanspruch bereits weitgehend behoben.",
          "Er betrifft ausschließlich private Träger von Ganztagsangeboten.",
          "Er gefährdet schon die reine Erfüllung des Rechtsanspruchs, noch bevor über Qualität gesprochen werden kann.",
        ],
        answer: 2,
        explain: "Üçüncü paragraf: 2030'a dek en az 30.000 pedagojik uzman eksik — „von Qualität ist dabei noch gar nicht die Rede“, yani nitelik tartışması bir yana, yasal hakkın kendisi bile tehlikede.",
      },
      {
        text: "Was fordern die Studienautoren?",
        options: [
          "Den Ausbau an verbindliche Qualitätsstandards zu koppeln, statt nur Plätze zu zählen.",
          "Den Rechtsanspruch zu verschieben, bis genügend Personal ausgebildet ist.",
          "Private Ganztagsangebote stärker staatlich zu fördern.",
        ],
        answer: 0,
        explain: "Son paragraf: yazarlar genişlemeyi „an verbindliche Qualitätsstandards zu koppeln“ öneriyor. Erteleme ya da özel teşvik metinde talep olarak geçmiyor.",
      },
      {
        text: "Der Autor deutet an, dass die Reform ausgerechnet den bedürftigsten Kindern am wenigsten nützen könnte.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Kapanıştaki „bitteres Paradox“: varlıklı aileler özel kurumlara kayarken dezavantajlı semtlerdeki okullar boş kadrolarla boğuşuyor — en çok yarar görecek çocuklar „leer ausgehen“ (eli boş kalma) riskinde.",
      },
    ],
  },
  {
    id: "c1-r3",
    level: "C1",
    skill: "reading",
    title: "Arbeitsmarkt 2035: Die Lücke",
    genre: "Kurumsal rapor",
    intro: "Bir araştırma merkezinin işgücü piyasası raporundan bu bölümde sayıları, bölgesel farkları ve önerilen önlem paketini takip et.",
    minutes: 7,
    gloss: [
      { de: "die Umwälzung", tr: "köklü dönüşüm", en: "upheaval" },
      { de: "altersbedingt", tr: "yaşa bağlı", en: "age-related" },
      { de: "nachrücken", tr: "yerine geçmek", en: "to move up" },
      { de: "die Wertschöpfung", tr: "katma değer", en: "value creation" },
      { de: "der Ballungsraum", tr: "metropol bölgesi", en: "metropolitan area" },
      { de: "der Zuzug", tr: "gelip yerleşme", en: "influx" },
      { de: "die Nahversorgung", tr: "yerel temel hizmet", en: "local supply" },
      { de: "überzogen", tr: "abartılı", en: "exaggerated" },
      { de: "personennah", tr: "insana dönük", en: "people-oriented" },
      { de: "die Erwerbsbeteiligung", tr: "işgücüne katılım", en: "labor force participation" },
      { de: "die Stellschraube", tr: "kaldıraç", en: "lever" },
      { de: "das Zusammenspiel", tr: "birlikte işleyiş", en: "interplay" },
    ],
    text: "Der deutsche Arbeitsmarkt steht vor der tiefgreifendsten Umwälzung seit der Wiedervereinigung. Nach Berechnungen des Mannheimer Zentrums für Arbeitsmarktanalysen scheiden bis 2035 rund 7,2 Millionen Erwerbstätige altersbedingt aus dem Berufsleben aus, während nur etwa 5,1 Millionen junge Menschen nachrücken. Die Lücke von über zwei Millionen Arbeitskräften trifft eine Volkswirtschaft, deren Wohlstandsmodell auf industrieller Wertschöpfung und einem dichten Netz mittelständischer Betriebe beruht.\n\nDie Folgen sind bereits heute messbar. In der Pflege bleibt gegenwärtig jede sechste Stelle unbesetzt; im Handwerk warten Kunden im Schnitt neun Wochen auf einen Termin. Bemerkenswert ist dabei die regionale Asymmetrie: Während Ballungsräume wie München oder Leipzig ihre Erwerbsbevölkerung durch Zuzug weitgehend stabil halten, verlieren ländliche Kreise vor allem in Ostdeutschland bis 2035 voraussichtlich ein Viertel ihrer Arbeitskräfte – mit entsprechenden Folgen für Nahversorgung, Steuerbasis und kommunale Infrastruktur.\n\nAls Gegenmittel wird häufig die Automatisierung angeführt. Der Bericht dämpft jedoch überzogene Erwartungen: Zwar ließen sich nach den Modellrechnungen bis zu 1,5 Millionen Stellen durch Digitalisierung und Robotik kompensieren, doch konzentriere sich dieses Potenzial auf standardisierbare Tätigkeiten in Industrie und Verwaltung. In personennahen Dienstleistungen – der Pflege, der Erziehung, dem Gesundheitswesen – stoße die Technik an offenkundige Grenzen; gerade dort aber wachse der Bedarf am schnellsten.\n\nDie Autoren plädieren daher für ein Maßnahmenbündel: eine qualifizierte Zuwanderung von jährlich mindestens 400.000 Personen, eine höhere Erwerbsbeteiligung von Frauen durch den konsequenten Ausbau der Kinderbetreuung sowie flexiblere Übergänge in den Ruhestand. Keine dieser Stellschrauben reiche für sich genommen aus; erst ihr Zusammenspiel könne die Lücke annähernd schließen. Der Bericht endet mit einer unbequemen Feststellung: Der demografische Wandel sei keine ferne Prognose mehr, sondern betriebswirtschaftlicher Alltag – und wer ihn weiterhin als Zukunftsthema behandle, habe die Gegenwart nicht verstanden.",
    questions: [
      {
        text: "Wie groß ist die erwartete Arbeitskräftelücke bis 2035?",
        options: [
          "Rund 7,2 Millionen Personen.",
          "Über zwei Millionen Personen.",
          "Etwa 400.000 Personen.",
        ],
        answer: 1,
        explain: "7,2 milyon ayrılan eksi 5,1 milyon gelen: „Die Lücke von über zwei Millionen Arbeitskräften“. 7,2 milyon toplam ayrılanların sayısı, 400.000 ise önerilen yıllık göç hedefi — tipik sayı çeldiricileri.",
      },
      {
        text: "Laut Bericht sind Ballungsräume und ländliche Kreise in gleichem Maße vom Verlust ihrer Erwerbsbevölkerung betroffen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Metin „regionale Asymmetrie“ vurguluyor: metropoller göçle nüfusu koruyor, Doğu Almanya'nın kırsal ilçeleri ise işgücünün dörtte birini kaybediyor.",
      },
      {
        text: "Wie bewertet der Bericht das Potenzial der Automatisierung?",
        options: [
          "Sie kann die Lücke vollständig schließen, wenn sie konsequent umgesetzt wird.",
          "Sie hilft vor allem bei standardisierbaren Tätigkeiten, stößt aber in personennahen Dienstleistungen an Grenzen.",
          "Sie verschärft das Problem, weil sie zusätzliche Stellen vernichtet.",
        ],
        answer: 1,
        explain: "Üçüncü paragraf beklentileri frenliyor: 1,5 milyona kadar telafi mümkün, ama „in personennahen Dienstleistungen … stoße die Technik an offenkundige Grenzen“ — üstelik ihtiyaç en hızlı orada büyüyor.",
      },
      {
        text: "Was ist mit dem Bild der „Stellschrauben“ gemeint?",
        options: [
          "Jede einzelne Maßnahme könnte die Lücke auch allein schließen.",
          "Technische Lösungen sind den politischen Maßnahmen vorzuziehen.",
          "Nur das Zusammenspiel mehrerer Maßnahmen kann die Lücke annähernd schließen.",
        ],
        answer: 2,
        explain: "Metin açık: „Keine dieser Stellschrauben reiche für sich genommen aus; erst ihr Zusammenspiel könne die Lücke annähernd schließen.“ Konjunktiv I burada raporun aktarılan görüşünü işaretliyor.",
      },
      {
        text: "Der Bericht bezeichnet den demografischen Wandel als ein Problem, das erst in ferner Zukunft praktische Bedeutung erlangen wird.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kapanış cümlesi tersini söylüyor: dönüşüm „keine ferne Prognose mehr, sondern betriebswirtschaftlicher Alltag“ — onu hâlâ gelecek konusu sayan, bugünü anlamamıştır.",
      },
    ],
  },
  {
    id: "c1-r4",
    level: "C1",
    skill: "reading",
    title: "„Kein Kind denkt in nur einer Sprache“",
    genre: "Röportaj",
    intro: "Dil bilimci Prof. Ayla Demir'le çok dillilik ve kimlik üzerine bu röportajda konuşmacının tezlerini ve itirazlara verdiği yanıtları izle.",
    minutes: 8,
    gloss: [
      { de: "die Mehrsprachigkeit", tr: "çok dillilik", en: "multilingualism" },
      { de: "das Defizit", tr: "açık", en: "deficit" },
      { de: "die Herkunftssprache", tr: "köken dili", en: "heritage language" },
      { de: "etwas belegen", tr: "kanıtlamak", en: "to prove" },
      { de: "das Sprachprestige", tr: "dil prestiji", en: "language prestige" },
      { de: "geringschätzen", tr: "küçümsemek", en: "to disparage" },
      { de: "das Sprachregister", tr: "dil kesiti", en: "language register" },
      { de: "die Bildungssprache", tr: "akademik dil", en: "academic language" },
      { de: "etwas verkennen", tr: "yanlış değerlendirmek", en: "to misjudge" },
      { de: "die Ressource", tr: "kaynak", en: "resource" },
      { de: "das Selbstverständnis", tr: "kendini algılayış", en: "self-conception" },
    ],
    text: "Frau Professor Demir, Sie behaupten, Mehrsprachigkeit werde in Deutschland noch immer als Problem behandelt. Ist dieser Vorwurf nicht längst überholt?\n\nDemir: Leider nein. In Sonntagsreden gilt Mehrsprachigkeit als Reichtum, im Schulalltag dagegen oft als Störfaktor. Entscheidend ist dabei, um welche Sprachen es geht: Ein Kind, das Englisch und Französisch spricht, wird bewundert; ein Kind, das Türkisch oder Arabisch mitbringt, gilt schnell als förderbedürftig. Das ist keine Frage der Sprachen selbst, sondern ihres gesellschaftlichen Prestiges.\n\nKritiker wenden ein, dass Kinder zuerst sicher Deutsch lernen sollten, bevor die Familiensprache gefördert wird.\n\nDemir: Diese Entgegensetzung verkennt, wie Spracherwerb funktioniert. Vier Jahrzehnte Forschung belegen: Wer seine Herkunftssprache gut beherrscht, lernt die Umgebungssprache nicht langsamer, sondern in der Regel schneller, weil grammatisches Wissen und Begriffsbildung übertragbar sind. Unsere Frankfurter Längsschnittstudie mit 2.300 Grundschulkindern zeigt zudem: Wird die Familiensprache systematisch einbezogen, verbessern sich mittelfristig auch die Deutschleistungen. Was Kindern tatsächlich schadet, ist nicht die zweite Sprache, sondern das Signal, ein Teil ihrer selbst sei in der Schule unerwünscht.\n\nWas bedeutet das für die Identität der Kinder?\n\nDemir: Sprache ist nie nur Werkzeug, sie ist Selbstverständnis. Wer die Sprache der Großeltern geringschätzt, geringschätzt einen Teil der Biografie des Kindes. Viele meiner Studierenden erzählen, sie hätten sich jahrelang für ihr Türkisch geschämt und es erst an der Universität als Ressource entdeckt. Diese verlorenen Jahre sind vermeidbar.\n\nWas müsste sich konkret ändern?\n\nDemir: Dreierlei. Herkunftssprachlicher Unterricht muss reguläres, benotetes Schulfach werden statt Randstunde am Nachmittag. Lehrkräfte brauchen in der Ausbildung verpflichtende Module zur Mehrsprachigkeitsdidaktik. Und wir sollten aufhören, Bildungssprache und Familiensprache gegeneinander auszuspielen: Ziel ist nicht weniger Deutsch, sondern mehr Sprachbewusstsein insgesamt. Ein Kind, das zwischen Registern und Sprachen wechseln kann, hat genau die Kompetenz erworben, die wir sonst teuer in Fremdsprachenkursen einzukaufen versuchen.",
    questions: [
      {
        text: "Worin sieht Demir den Kern des Problems im Umgang mit Mehrsprachigkeit?",
        options: [
          "Deutsche Schulen bieten generell zu wenige Fremdsprachen an.",
          "Nicht die Sprachen selbst, sondern ihr unterschiedliches gesellschaftliches Prestige entscheidet über die Bewertung.",
          "Kinder mit Türkisch oder Arabisch lernen nachweislich langsamer Deutsch.",
        ],
        answer: 1,
        explain: "Demir'in ilk cevabındaki karşıtlık: İngilizce-Fransızca bilen çocuk „bewundert“, Türkçe-Arapça getiren „förderbedürftig“ sayılıyor — „keine Frage der Sprachen selbst, sondern ihres gesellschaftlichen Prestiges“.",
      },
      {
        text: "Wie reagiert Demir auf den Einwand, Kinder sollten zuerst Deutsch lernen?",
        options: [
          "Sie hält die Entgegensetzung für falsch, weil eine gefestigte Herkunftssprache den Deutscherwerb sogar beschleunigt.",
          "Sie räumt ein, dass die Familiensprache den Deutscherwerb anfangs verzögert.",
          "Sie fordert, den Deutschunterricht zugunsten der Herkunftssprachen zu kürzen.",
        ],
        answer: 0,
        explain: "„Diese Entgegensetzung verkennt, wie Spracherwerb funktioniert“ — kırk yıllık araştırma, köken dilini iyi bilenin çevre dilini „in der Regel schneller“ öğrendiğini gösteriyor. Üçüncü şık, son cevaptaki „nicht weniger Deutsch“ ifadesiyle açıkça çelişir.",
      },
      {
        text: "Die Frankfurter Studie zeigt, dass sich die Deutschleistungen verbessern, wenn die Familiensprache systematisch einbezogen wird.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Demir 2.300 ilkokul çocuğuyla yapılan boylamsal çalışmayı aktarıyor: aile dili sistematik biçimde dahil edilince „mittelfristig auch die Deutschleistungen“ iyileşiyor.",
      },
      {
        text: "Was schadet Kindern laut Demir tatsächlich?",
        options: [
          "Das frühe Erlernen einer zweiten Sprache.",
          "Das Signal, ein Teil ihrer selbst sei in der Schule unerwünscht.",
          "Der verpflichtende herkunftssprachliche Unterricht am Nachmittag.",
        ],
        answer: 1,
        explain: "Cümle metinde birebir var: zarar veren ikinci dil değil, „das Signal, ein Teil ihrer selbst sei in der Schule unerwünscht“. Konjunktiv I burada aktarılan mesajı gösteriyor.",
      },
      {
        text: "Demir fordert, herkunftssprachlichen Unterricht als freiwillige Nachmittagsstunde beizubehalten.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersi: köken dili dersi „reguläres, benotetes Schulfach werden statt Randstunde am Nachmittag“ — yani öğleden sonraki kenar saat olmaktan çıkmalı.",
      },
    ],
  },
  {
    id: "c1-r5",
    level: "C1",
    skill: "reading",
    title: "Das Museum als Mitmachzone",
    genre: "Kültür eleştirisi",
    intro: "Bir kültür eleştirmeni, müzelerdeki „katılım“ modasını mercek altına alıyor — eleştirinin nerede keskinleştiğine, nerede kendini sınırladığına dikkat et.",
    minutes: 7,
    gloss: [
      { de: "die Teilhabe", tr: "katılım", en: "participation" },
      { de: "die Verheißung", tr: "vaat", en: "promise" },
      { de: "die Schwellenangst", tr: "eşik korkusu", en: "threshold anxiety" },
      { de: "etwas bespielen", tr: "etkinlikle doldurmak", en: "to stage events in" },
      { de: "die Zumutung", tr: "eziyet", en: "imposition" },
      { de: "die Kontemplation", tr: "derin düşünme", en: "contemplation" },
      { de: "verwechselbar", tr: "birbirinden ayırt edilemez", en: "indistinguishable" },
      { de: "die Kennzahl", tr: "gösterge", en: "metric" },
      { de: "der Selbstzweck", tr: "kendi başına amaç", en: "end in itself" },
      { de: "etwas preisgeben", tr: "feda etmek", en: "to give up" },
      { de: "die Ermäßigung", tr: "indirim", en: "reduction" },
    ],
    text: "Kaum ein Begriff wird in deutschen Museen derzeit häufiger beschworen als „Teilhabe“. Besucher sollen nicht mehr betrachten, sondern mitmachen: Selfie-Stationen im Barocksaal, Abstimmungsterminals neben der Videokunst, Workshops, in denen jeder „seine eigene Geschichte“ erzählen darf. Die Verheißung dahinter ist sympathisch – das Museum, einst Tempel des Bildungsbürgertums, öffnet sich endlich allen. Wer wollte dagegen sein?\n\nUnd tatsächlich: Die Kritik an der alten Ehrfurchtsarchitektur war berechtigt. Museen, deren Schwellenangst höher lag als ihre Besucherzahlen, haben ihren öffentlichen Auftrag verfehlt. Dass Häuser wie das Essener Industriemuseum Zollstern heute Schichtarbeiter, Schulklassen und Nachbarschaftsinitiativen erreichen, ist ein Gewinn, den niemand ernsthaft bestreiten kann.\n\nDoch inzwischen kippt die Bewegung ins Gegenteil. Wo jede Ausstellung zur „Erlebniswelt“ bespielt wird, verschwindet ausgerechnet das, was das Museum von allen anderen Orten unterscheidet: die Erlaubnis zur langsamen, konzentrierten Wahrnehmung. Kunst ist auch eine Zumutung – sie verlangt Zeit, Irritation, mitunter Langeweile, aus der erst Aufmerksamkeit entsteht. Ein Haus, das jede Reibung durch Interaktionsangebote glättet, behandelt seine Besucher nicht als mündiges Publikum, sondern als Kundschaft, deren Verweildauer optimiert werden muss. Das Ergebnis sind Ausstellungen, die sich weltweit zum Verwechseln ähneln: dieselben Touchscreens, dieselben Mitmachwände, dieselbe freundliche Belanglosigkeit.\n\nDie Ursache liegt weniger bei den Kuratoren als bei den Kennzahlen. Wer seine Förderung über Besucherstatistiken und „Interaktionsraten“ rechtfertigen muss, programmiert eben das, was sich zählen lässt. Teilhabe aber ist kein Selbstzweck und schon gar kein Klickmaß; sie bemisst sich daran, ob Menschen das Haus anders verlassen, als sie es betreten haben. Ein Museum, das seine Eigenzeit preisgibt, um niemanden zu überfordern, unterfordert am Ende alle – und verspielt gerade jenes Vertrauen in die Urteilsfähigkeit seines Publikums, das echte Öffnung erst möglich machen würde.",
    questions: [
      {
        text: "Wie steht der Autor zur Öffnung der Museen insgesamt?",
        options: [
          "Er hält sie grundsätzlich für einen Gewinn, kritisiert aber ihre aktuelle Übertreibung.",
          "Er lehnt sie ab und wünscht sich die alte Ehrfurchtsarchitektur zurück.",
          "Er hält sie für gescheitert, weil sie keine neuen Besuchergruppen erreicht hat.",
        ],
        answer: 0,
        explain: "İkinci paragraf açılımı savunuyor („ein Gewinn, den niemand ernsthaft bestreiten kann“), üçüncüsü „Doch inzwischen kippt die Bewegung ins Gegenteil“ diyerek abartıya yöneliyor — tipik C1 nüansı: eleştiri, reddiye değil.",
      },
      {
        text: "Was geht laut Autor verloren, wenn jede Ausstellung zur „Erlebniswelt“ wird?",
        options: [
          "Die finanzielle Unabhängigkeit der Museen.",
          "Die Möglichkeit zur langsamen, konzentrierten Wahrnehmung.",
          "Der Zugang von Schulklassen und Nachbarschaftsinitiativen.",
        ],
        answer: 1,
        explain: "Üçüncü paragraf: kaybolan şey müzeyi diğer mekânlardan ayıran „die Erlaubnis zur langsamen, konzentrierten Wahrnehmung“. Okul sınıfları örneği tam tersine kazanç hanesinde anılıyor.",
      },
      {
        text: "Der Autor macht in erster Linie die Kuratoren für die Entwicklung verantwortlich.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Die Ursache liegt weniger bei den Kuratoren als bei den Kennzahlen“ — sorumluluk küratörlerden çok, teşvikleri ziyaretçi istatistiklerine bağlayan gösterge mantığında.",
      },
      {
        text: "Woran bemisst sich echte Teilhabe nach Ansicht des Autors?",
        options: [
          "An der Zahl der Interaktionen pro Ausstellung.",
          "An der durchschnittlichen Verweildauer der Besucher.",
          "Daran, ob Menschen das Haus anders verlassen, als sie es betreten haben.",
        ],
        answer: 2,
        explain: "Son paragraf: katılım „kein Klickmaß“; ölçüsü, insanların müzeden girdiklerinden farklı çıkıp çıkmadığı. İlk iki şık metnin eleştirdiği sayaç mantığının ta kendisi.",
      },
      {
        text: "Mit der Formulierung „Kunst ist auch eine Zumutung“ meint der Autor, dass Kunst dem Publikum etwas abverlangen darf.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Cümlenin devamı bunu açıklıyor: sanat „Zeit, Irritation, mitunter Langeweile“ talep eder — dikkat ancak bu zorlanmadan doğar. „Zumutung“ burada olumsuz değil, üretken bir külfet.",
      },
    ],
  },
  {
    id: "c1-r6",
    level: "C1",
    skill: "reading",
    title: "Slowbalisierung: Das Ende einer Illusion?",
    genre: "Analiz",
    intro: "Küreselleşme geri mi çekiliyor, yoksa biçim mi değiştiriyor? Bu ekonomi analizinde yazarın verilerle kurduğu ayrımları çöz.",
    minutes: 8,
    gloss: [
      { de: "die Lieferkette", tr: "tedarik zinciri", en: "supply chain" },
      { de: "die Arbeitsteilung", tr: "iş bölümü", en: "division of labor" },
      { de: "das Schlagwort", tr: "moda kavram", en: "buzzword" },
      { de: "die Rückverlagerung", tr: "üretimi geri taşıma", en: "reshoring" },
      { de: "stagnieren", tr: "yerinde saymak", en: "to stagnate" },
      { de: "die Verflechtung", tr: "iç içe geçme", en: "entanglement" },
      { de: "geopolitisch", tr: "jeopolitik", en: "geopolitical" },
      { de: "die Abhängigkeit", tr: "bağımlılık", en: "dependence" },
      { de: "etwas diversifizieren", tr: "çeşitlendirmek", en: "to diversify" },
      { de: "die Standortentscheidung", tr: "yer seçimi kararı", en: "location decision" },
      { de: "vollmundig", tr: "iddialı", en: "grandiose" },
      { de: "die Neuordnung", tr: "yeniden düzenleme", en: "reordering" },
    ],
    text: "Als im Frühjahr 2021 ein quergestelltes Containerschiff den Suezkanal blockierte, wurde das Bild binnen Stunden zur Metapher: Die Weltwirtschaft, so schien es, hatte sich in ihrer eigenen Effizienz verkeilt. Seither hat das Schlagwort von der „Deglobalisierung“ Konjunktur. Pandemie, Kriege und Handelskonflikte, heißt es, beendeten das Zeitalter der grenzenlosen Arbeitsteilung; die Zukunft gehöre der heimischen Fabrik. Doch ein nüchterner Blick auf die Daten erzählt eine kompliziertere Geschichte.\n\nRichtig ist: Der Welthandel wächst seit gut einem Jahrzehnt langsamer als die Weltwirtschaft – Ökonomen sprechen von „Slowbalisierung“. Richtig ist auch, dass Regierungen Halbleiter, Arzneimittel und Batterien inzwischen als strategische Güter behandeln und ihre Produktion mit Milliardensubventionen ins eigene Land holen. Von einer breiten Rückverlagerung kann dennoch keine Rede sein. Nach einer Auswertung des Kieler Instituts für Weltwirtschaftsforschung haben von 1.800 befragten europäischen Industrieunternehmen lediglich vier Prozent Produktion tatsächlich zurückgeholt; mehr als ein Drittel hat stattdessen seine Lieferanten diversifiziert – weg von der Konzentration auf ein einzelnes Land, hin zu einem Netz aus mehreren Standorten.\n\nWas sich verändert, ist also weniger das Ausmaß als die Landkarte der Verflechtung. An die Stelle der reinen Kostenlogik tritt eine geopolitische: Gehandelt wird zunehmend mit Partnern, die als politisch verlässlich gelten – „Friendshoring“ nennt das die Fachdebatte. Für Deutschland, dessen Wohlstand wie in kaum einem anderen Land am Export hängt, ist das eine unbequeme Neuordnung: Sicherheit kostet Effizienz, und die Rechnung zahlen zunächst die Verbraucher.\n\nDie vollmundige Rede vom Ende der Globalisierung verfehlt daher den Kern. Die weltwirtschaftliche Verflechtung verschwindet nicht, sie wird neu sortiert – langsamer, teurer, politischer. Wer diesen Unterschied ignoriert, dem entgehen die eigentlichen Fragen: Welche Abhängigkeiten sind tragbar, welche nicht? Und wer entscheidet darüber – Märkte oder Parlamente?",
    questions: [
      {
        text: "Welche Kernaussage vertritt der Text?",
        options: [
          "Die Globalisierung endet, und die Produktion kehrt in die Heimatländer zurück.",
          "Die weltwirtschaftliche Verflechtung verschwindet nicht, sondern wird neu geordnet.",
          "Der Welthandel wächst wieder schneller als die Weltwirtschaft.",
        ],
        answer: 1,
        explain: "Son paragraf tezi özetliyor: „Die weltwirtschaftliche Verflechtung verschwindet nicht, sie wird neu sortiert – langsamer, teurer, politischer.“ İlk şık, metnin eleştirdiği „vollmundige Rede“nin kendisi.",
      },
      {
        text: "Was ergab die Auswertung des Kieler Instituts?",
        options: [
          "Mehr als ein Drittel der Unternehmen hat seine Lieferanten diversifiziert, nur vier Prozent haben Produktion zurückgeholt.",
          "Vier Prozent der Unternehmen haben ihre Lieferketten diversifiziert.",
          "Mehr als ein Drittel der Unternehmen hat Produktion nach Europa zurückverlagert.",
        ],
        answer: 0,
        explain: "Sayı çeldiricisine dikkat: geri taşıyan yalnızca yüzde 4, tedarikçilerini çeşitlendiren „mehr als ein Drittel“. Diğer iki şık bu iki sayıyı yer değiştiriyor.",
      },
      {
        text: "Der Begriff „Slowbalisierung“ bezeichnet ein Schrumpfen des Welthandels auf das Niveau der 1990er Jahre.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kavram küçülmeyi değil yavaşlamayı anlatıyor: dünya ticareti on yıldır dünya ekonomisinden „langsamer wächst“ — hâlâ büyüyor, sadece daha yavaş.",
      },
      {
        text: "Was ist mit „Friendshoring“ gemeint?",
        options: [
          "Der Handel mit politisch als verlässlich geltenden Partnern statt nach reiner Kostenlogik.",
          "Die Verlagerung der Produktion in Länder mit den niedrigsten Löhnen.",
          "Ein Subventionsprogramm der Europäischen Union für Halbleiter.",
        ],
        answer: 0,
        explain: "Üçüncü paragraf tanımlıyor: maliyet mantığının yerini jeopolitik mantık alıyor, ticaret „mit Partnern, die als politisch verlässlich gelten“ yapılıyor.",
      },
      {
        text: "Der Autor weist darauf hin, dass die neue Sicherheitsorientierung ihren Preis hat, den zunächst die Verbraucher zahlen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Almanya için „unbequeme Neuordnung“: „Sicherheit kostet Effizienz, und die Rechnung zahlen zunächst die Verbraucher.“",
      },
    ],
  },

  // -------------------------------------------------------------- DİNLEME
  // ── Hikâye dizisi: Çevirmen Miriam tartışmalı bir kitabı çeviriyor.
  //    C1'in yeni alıştırmalarında iş → tartışma → açık mektup → ödül konuşması.
  {
    id: "c1-r7",
    level: "C1",
    skill: "reading",
    title: "Der Auftrag",
    genre: "Deneme",
    intro:
      "Çevirmen Miriam, zor bir kitabı üstlenip üstlenmemeyi düşünüyor. Kendi mesleği üzerine yazdığı bu deneme, C1'de takip edeceğin hikâyenin başlangıcı.",
    gloss: [
      { de: "die Übersetzung", tr: "çeviri", en: "translation" },
      { de: "der Auftrag", tr: "görev", en: "assignment" },
      { de: "die Vorlage", tr: "kaynak metin", en: "source text" },
      { de: "die Treue", tr: "sadakat", en: "fidelity" },
      { de: "der Klang", tr: "tını", en: "sound" },
      { de: "die Zumutung", tr: "eziyet", en: "imposition" },
      { de: "sich anmaßen", tr: "kendinde hak görmek", en: "to presume" },
      { de: "der Widerhall", tr: "yankı", en: "echo" },
      { de: "abwägen", tr: "ölçüp biçmek", en: "to weigh up" },
    ],
    minutes: 8,
    text:
      "Der Verlag hat angerufen. Es geht um einen Roman aus dem Libanon, 340 Seiten, drei Monate Zeit, und die Autorin ist tot.\n\nMan hält das für einen Vorteil. Niemand widerspricht, niemand ruft nachts an und fragt, warum ein Satz jetzt anders klingt. In Wahrheit ist es das Gegenteil: Wo keine Autorin mehr antwortet, entscheidet die Übersetzerin allein, und diese Freiheit ist eine Zumutung.\n\nDenn die alte Frage — Treue oder Klang — ist falsch gestellt. Es gibt keine treue Übersetzung, die nicht klingt, weil ein Satz, der im Deutschen hölzern steht, im Arabischen eben nicht hölzern gestanden hat. Wer wörtlich überträgt, überträgt gerade nicht das, was da war: Er überträgt die Wörter und verliert den Ton. Und wer nur den Ton sucht, schreibt am Ende sein eigenes Buch.\n\nDazu kommt ein zweites Problem, über das öffentlich selten gesprochen wird. Dieser Roman spielt in einem Krieg, den ich nicht erlebt habe, in einer Stadt, in der ich zwei Wochen war. Ich kann die Sprache. Ob ich den Widerhall höre, den ein bestimmter Straßenname bei einer Leserin in Beirut auslöst, weiß ich nicht — und ich werde es nicht wissen.\n\nMan könnte daraus schließen, dass ich absagen sollte. Ich glaube, das wäre die bequemste und die falscheste Antwort. Nicht zu übersetzen heißt nicht, den Text zu schützen; es heißt, ihn unlesbar zu lassen. Jede Übersetzung ist ein Eingriff. Die Frage ist nicht, ob man sich etwas anmaßt, sondern ob man weiß, dass man es tut.\n\nIch sage zu. Und ich werde im Nachwort schreiben, was ich nicht wissen konnte.",
    questions: [
      {
        text: "Warum hält Miriam den Tod der Autorin nicht für einen Vorteil?",
        options: [
          "Weil die Übersetzerin dann allein entscheidet",
          "Weil der Verlag weniger zahlt",
          "Weil die Rechte unklar sind",
        ],
        answer: 0,
        explain: "„diese Freiheit ist eine Zumutung“ — kimse itiraz etmiyorsa yük tamamen ondadır.",
      },
      {
        text: "Warum hält sie die Frage „Treue oder Klang“ für falsch gestellt?",
        options: [
          "Weil wörtliche Übertragung den Ton verliert und damit gerade untreu ist",
          "Weil Klang immer wichtiger ist",
          "Weil beide Begriffe veraltet sind",
        ],
        answer: 0,
        explain:
          "Almancada tahta gibi duran bir cümle, Arapçada öyle durmuyordu — kelimeyi taşıyan tonu kaybediyor.",
      },
      {
        text: "Welches zweite Problem nennt sie?",
        options: [
          "Sie kennt den Widerhall bestimmter Orte für dortige Leser nicht",
          "Ihr Arabisch reicht nicht",
          "Die Frist ist zu kurz",
        ],
        answer: 0,
        explain: "Dili biliyor; bilmediği, bir sokak adının Beyrut'ta ne uyandırdığı.",
      },
      {
        text: "Warum lehnt sie den Auftrag trotzdem nicht ab?",
        options: [
          "Nicht zu übersetzen schützt den Text nicht, sondern lässt ihn unlesbar",
          "Sie braucht das Geld",
          "Der Verlag hat sie überzeugt",
        ],
        answer: 0,
        explain: "„Das wäre die bequemste und die falscheste Antwort.“",
      },
      {
        text: "Worin liegt für sie die entscheidende Frage?",
        options: [
          "Nicht ob man sich etwas anmaßt, sondern ob man es weiß",
          "Ob man die Sprache perfekt beherrscht",
          "Ob die Autorin zustimmt",
        ],
        answer: 0,
        explain: "Her çeviri bir müdahaledir; mesele bunun farkında olmaktır.",
      },
      {
        text: "Was kündigt sie am Ende an?",
        options: [
          "Ein Nachwort über das, was sie nicht wissen konnte",
          "Eine Reise nach Beirut",
          "Eine zweite Übersetzerin",
        ],
        answer: 0,
        explain: "Son cümle: bilemediğini yazıya geçirecek.",
      },
    ],
  },
  {
    id: "c1-r8",
    level: "C1",
    skill: "reading",
    title: "Freiberuflich in Deutschland: die Fallen im Vertrag",
    genre: "Rehber",
    intro:
      "Serbest çalışanların sözleşmelerinde kritik olan maddeler. Almanya'da bağımsız çalışmanın hukuki gerçekliği.",
    gloss: [
      { de: "freiberuflich", tr: "serbest çalışan", en: "freelance" },
      { de: "die Scheinselbstständigkeit", tr: "sahte bağımsız çalışma", en: "bogus self-employment" },
      { de: "das Nutzungsrecht", tr: "kullanım hakkı", en: "right of use" },
      { de: "einräumen", tr: "hak tanımak", en: "to grant" },
      { de: "die Haftung", tr: "sorumluluk", en: "liability" },
      { de: "der Verzug", tr: "temerrüt", en: "default" },
      { de: "abtreten", tr: "devretmek", en: "to assign" },
      { de: "unwirksam", tr: "hükümsüz", en: "void" },
      { de: "die Vergütung", tr: "ücret", en: "compensation" },
    ],
    minutes: 8,
    text:
      "Wer in Deutschland freiberuflich arbeitet, unterschreibt oft Verträge, die von großen Auftraggebern formuliert wurden. Vier Punkte lohnen dabei besondere Aufmerksamkeit.\n\nErstens die Nutzungsrechte. Üblich ist die Formulierung, man räume „sämtliche Nutzungsrechte zeitlich, räumlich und inhaltlich unbeschränkt“ ein. Das bedeutet: Der Auftraggeber darf das Werk beliebig verwenden, verändern und weiterverkaufen, ohne erneut zu zahlen. Für eine einmalige Vergütung ist das oft unangemessen — verhandelbar ist es fast immer, wenn man es anspricht.\n\nZweitens die Haftung. Klauseln, die eine unbegrenzte Haftung vorsehen, sind in vorformulierten Verträgen häufig unwirksam, weil sie den Vertragspartner unangemessen benachteiligen. Verlassen sollte man sich darauf nicht: Ein Prozess über die Wirksamkeit kostet Zeit und Geld, die Freiberufler selten haben.\n\nDrittens der Zahlungsverzug. Ohne besondere Vereinbarung gilt gesetzlich eine Frist von 30 Tagen; danach dürfen Verzugszinsen berechnet werden. Viele Verträge verlängern diese Frist auf 60 oder 90 Tage — legal, aber ein erheblicher Nachteil bei der Liquidität.\n\nViertens, und am wichtigsten: die Scheinselbstständigkeit. Wer über längere Zeit fast nur für einen Auftraggeber arbeitet, feste Arbeitszeiten hat und in dessen Organisation eingebunden ist, gilt sozialversicherungsrechtlich möglicherweise als Angestellter — unabhängig davon, was im Vertrag steht. Die Nachzahlungen treffen zwar zuerst den Auftraggeber, aber das Ende der Zusammenarbeit trifft den Auftragnehmer.\n\nWer unsicher ist, kann bei der Deutschen Rentenversicherung ein Statusfeststellungsverfahren beantragen. Es dauert einige Monate und schafft Rechtssicherheit — auch wenn viele es meiden, weil das Ergebnis unbequem sein könnte.",
    questions: [
      {
        text: "Was bedeutet die übliche Nutzungsrechte-Klausel?",
        options: [
          "Der Auftraggeber darf das Werk beliebig nutzen und weiterverkaufen",
          "Der Auftraggeber darf es einmal nutzen",
          "Die Rechte bleiben beim Urheber",
        ],
        answer: 0,
        explain: "Zaman, mekân ve içerik bakımından sınırsız devir — tek bir ödeme karşılığında.",
      },
      {
        text: "Warum sollte man sich nicht auf die Unwirksamkeit von Haftungsklauseln verlassen?",
        options: [
          "Ein Prozess darüber kostet Zeit und Geld",
          "Sie sind immer wirksam",
          "Gerichte entscheiden nie darüber",
        ],
        answer: 0,
        explain: "Geçersiz olabilir ama bunu ispat süreci serbest çalışanın taşıyamayacağı yüktür.",
      },
      {
        text: "Welche gesetzliche Zahlungsfrist gilt ohne besondere Vereinbarung?",
        options: ["30 Tage", "60 Tage", "90 Tage"],
        answer: 0,
        explain: "60 ve 90 gün sözleşmeyle uzatılabilen sürelerdir.",
      },
      {
        text: "Wovon hängt Scheinselbstständigkeit ab?",
        options: [
          "Von der tatsächlichen Arbeitsweise, nicht vom Vertragstext",
          "Nur vom Vertrag",
          "Von der Höhe des Honorars",
        ],
        answer: 0,
        explain: "„unabhängig davon, was im Vertrag steht.“",
      },
      {
        text: "Wen trifft am Ende das größere Risiko?",
        options: [
          "Den Auftragnehmer — durch das Ende der Zusammenarbeit",
          "Den Auftraggeber",
          "Beide gleich",
        ],
        answer: 0,
        explain:
          "Geriye dönük primler önce işverene çıkar; ama iş ilişkisinin bitmesi serbest çalışanı vurur.",
      },
      {
        text: "Warum meiden viele das Statusfeststellungsverfahren?",
        options: [
          "Weil das Ergebnis unbequem sein könnte",
          "Weil es zu teuer ist",
          "Weil es nicht rechtsverbindlich ist",
        ],
        answer: 0,
        explain: "Hukuki güvenlik sağlıyor ama sonucu istenmeyen tarafta çıkabilir.",
      },
    ],
  },
  {
    id: "c1-r9",
    level: "C1",
    skill: "reading",
    title: "Der deutsche Wald",
    genre: "Kültür denemesi",
    intro:
      "Neden Almanya'da orman bir doğa parçası değil de bir duygu meselesidir? Kültürel bir deneme.",
    gloss: [
      { de: "die Sehnsucht", tr: "özlem", en: "longing" },
      { de: "die Romantik", tr: "Romantizm", en: "Romanticism" },
      { de: "das Waldsterben", tr: "orman ölümü", en: "forest dieback" },
      { de: "die Monokultur", tr: "monokültür", en: "monoculture" },
      { de: "der Nutzwald", tr: "üretim ormanı", en: "commercial forest" },
      { de: "aufforsten", tr: "ağaçlandırmak", en: "to reforest" },
      { de: "die Projektion", tr: "yansıtma", en: "projection" },
      { de: "ernüchternd", tr: "ayıltıcı", en: "sobering" },
    ],
    minutes: 8,
    text:
      "Kaum ein Wort ist im Deutschen so aufgeladen wie „Wald“. Es taucht in Volksliedern auf, in Märchen, in politischen Debatten, und es lässt sich in andere Sprachen nur schwer mit derselben Temperatur übersetzen. Der englische „forest“ ist ein Ort; der deutsche Wald ist eine Stimmung.\n\nHistorisch ist das erklärbar. Die Romantik des 19. Jahrhunderts machte den Wald zum Gegenbild der Stadt: dunkel, alt, echt — alles, was die Industrialisierung nicht war. Diese Verbindung überlebte politische Systeme, die sie sehr unterschiedlich benutzten, und sie wurde in den 1980er Jahren noch einmal aktiviert. Das Waldsterben war eine ökologische Krise, aber die Heftigkeit der Reaktion erklärt sich nicht allein aus Bodenwerten und Nadelverlust: Es starb nicht irgendein Ökosystem, es starb ein Selbstbild.\n\nErnüchternd ist der Blick auf das, was tatsächlich wächst. Rund die Hälfte des deutschen Waldes besteht aus Fichten und Kiefern, die hier über weite Strecken nie heimisch waren. Sie wurden gepflanzt, weil sie schnell wachsen und gerade sind — Nutzwald, kein Märchenwald. Ausgerechnet diese Monokulturen sind es, die Dürre und Borkenkäfer am wenigsten aushalten. Der Wald, um den getrauert wird, ist in weiten Teilen ein forstwirtschaftliches Produkt des 19. Jahrhunderts.\n\nDaraus folgt kein Grund zum Spott. Die Projektion hat etwas bewirkt: Deutschland hat eine im internationalen Vergleich strenge Forstgesetzgebung und mehr Waldfläche als vor hundert Jahren. Ein Land, das seine Wälder emotional besetzt, schützt sie besser als eines, das sie nur bilanziert.\n\nInteressant wird es dort, wo beides zusammenkommt. Der Umbau zu Mischwäldern dauert Jahrzehnte und sieht in den ersten Jahren nicht nach Sehnsucht aus, sondern nach Baustelle. Wer den Wald liebt, muss ihn eine Zeit lang hässlich ertragen.",
    questions: [
      {
        text: "Welchen Unterschied nennt der Text zwischen „forest“ und „Wald“?",
        options: [
          "Ein Ort gegenüber einer Stimmung",
          "Groß gegenüber klein",
          "Privat gegenüber öffentlich",
        ],
        answer: 0,
        explain: "Aynı sıcaklıkta çevrilemiyor: biri yer, öteki hâl.",
      },
      {
        text: "Wie erklärt der Text die Heftigkeit der Waldsterben-Debatte?",
        options: [
          "Es starb nicht nur ein Ökosystem, sondern ein Selbstbild",
          "Die Schäden waren größer als anderswo",
          "Die Medien übertrieben",
        ],
        answer: 0,
        explain: "Tepkinin şiddeti yalnızca ekolojik verilerle açıklanmıyor.",
      },
      {
        text: "Was ist an der Zusammensetzung des Waldes ernüchternd?",
        options: [
          "Etwa die Hälfte sind gepflanzte, nicht heimische Nadelbäume",
          "Der Wald schrumpft seit hundert Jahren",
          "Es gibt kaum noch alte Bäume",
        ],
        answer: 0,
        explain: "Ladin ve çam hızlı ve düz büyüdüğü için dikilmiş — üretim ormanı.",
      },
      {
        text: "Welche Ironie beschreibt der Text?",
        options: [
          "Gerade die Monokulturen halten Dürre und Käfer am schlechtesten aus",
          "Der Wald wächst schneller als geplant",
          "Die Romantik half der Forstwirtschaft",
        ],
        answer: 0,
        explain: "Yasla anılan orman, aslında 19. yüzyıl ormancılığının ürünü.",
      },
      {
        text: "Wie bewertet der Autor die emotionale Besetzung des Waldes?",
        options: [
          "Sie hat den Schutz tatsächlich verbessert",
          "Sie ist reiner Kitsch",
          "Sie hat den Umbau verhindert",
        ],
        answer: 0,
        explain: "Duygusal bağ, yalnızca bilanço tutan bir ülkeden daha iyi koruma sağlamış.",
      },
      {
        text: "Was meint der Schlusssatz?",
        options: [
          "Der ökologische Umbau sieht jahrelang unschön aus und muss ausgehalten werden",
          "Mischwälder sind hässlicher als Nadelwälder",
          "Man sollte den Wald nicht mehr betreten",
        ],
        answer: 0,
        explain: "Karışık ormana geçiş onlarca yıl sürer ve başta şantiyeye benzer.",
      },
    ],
  },
  {
    id: "c1-r10",
    level: "C1",
    skill: "reading",
    title: "Was der Text nicht sagt",
    genre: "Sınav formatı",
    intro:
      "C1 okuma sınavının asıl zorluğu: metnin söylediğiyle ima ettiğini ayırmak. Yoğun bir metin ve çıkarım soruları.",
    gloss: [
      { de: "die Aussage", tr: "ifade", en: "statement" },
      { de: "implizit", tr: "örtük", en: "implicit" },
      { de: "einschränken", tr: "kısıtlamak", en: "to restrict" },
      { de: "der Befund", tr: "bulgu", en: "finding" },
      { de: "nahelegen", tr: "işaret etmek", en: "to suggest" },
      { de: "ausschließen", tr: "dışlamak", en: "to exclude" },
      { de: "die Korrelation", tr: "korelasyon", en: "correlation" },
      { de: "vorschnell", tr: "aceleci", en: "hasty" },
    ],
    minutes: 7,
    text:
      "Eine vielzitierte Untersuchung zum Homeoffice kommt zu einem klaren Befund: Beschäftigte, die überwiegend zu Hause arbeiten, werden seltener befördert als solche, die überwiegend im Büro sind. Der Unterschied ist erheblich und bleibt bestehen, wenn man Alter, Position und Betriebszugehörigkeit berücksichtigt.\n\nDie Studie zieht daraus jedoch nicht den Schluss, den viele Schlagzeilen daraus gezogen haben. Sie stellt ausdrücklich fest, dass sie die Richtung des Zusammenhangs nicht bestimmen kann. Es ist ebenso möglich, dass Menschen, die ohnehin weniger auf Aufstieg hin arbeiten, häufiger Homeoffice wählen, wie dass Homeoffice den Aufstieg behindert.\n\nZwei Beobachtungen sprechen dennoch für einen Effekt der Sichtbarkeit. Erstens ist der Nachteil in Unternehmen ohne strukturierte Leistungsbeurteilung deutlich größer als in solchen mit klaren Kriterien. Zweitens verschwindet er fast vollständig dort, wo auch die Führungskraft überwiegend remote arbeitet.\n\nDie Autorinnen warnen ausdrücklich vor der Empfehlung, die aus ihrer Arbeit am häufigsten abgeleitet wird — Beschäftigte sollten öfter ins Büro kommen. Diese Empfehlung behandle ein organisatorisches Problem als individuelles. Wenn Beförderung von Anwesenheit abhängt, sei das ein Befund über die Beurteilungspraxis, nicht über die Beschäftigten.",
    questions: [
      {
        text: "Welche Aussage entspricht dem Text?",
        options: [
          "Der Zusammenhang bleibt auch nach Kontrolle von Alter und Position bestehen",
          "Der Unterschied verschwindet, wenn man das Alter berücksichtigt",
          "Die Studie fand keinen Unterschied",
        ],
        answer: 0,
        explain: "„bleibt bestehen, wenn man Alter, Position und Betriebszugehörigkeit berücksichtigt.“",
      },
      {
        text: "Was sagt die Studie über die Richtung des Zusammenhangs?",
        options: [
          "Sie kann sie nicht bestimmen",
          "Homeoffice verhindert Beförderung",
          "Beförderungswünsche führen zu Büroarbeit",
        ],
        answer: 0,
        explain: "Her iki yön de mümkün — çalışma bunu ayırt edemiyor.",
      },
      {
        text: "Welche Beobachtung stützt die Sichtbarkeits-These?",
        options: [
          "Der Nachteil verschwindet, wenn die Führungskraft selbst remote arbeitet",
          "Ältere Beschäftigte sind stärker betroffen",
          "Der Nachteil ist in großen Firmen größer",
        ],
        answer: 0,
        explain: "İkinci gözlem tam olarak bu.",
      },
      {
        text: "Was legt der Befund zu Unternehmen ohne Leistungsbeurteilung nahe?",
        options: [
          "Ohne klare Kriterien wirkt Anwesenheit stärker",
          "Beurteilungssysteme sind nutzlos",
          "Kleine Firmen befördern seltener",
        ],
        answer: 0,
        explain: "Kriter yoksa görünürlük boşluğu dolduruyor.",
      },
      {
        text: "Wogegen wenden sich die Autorinnen?",
        options: [
          "Gegen die Empfehlung, Beschäftigte sollten öfter ins Büro kommen",
          "Gegen das Homeoffice generell",
          "Gegen strukturierte Leistungsbeurteilung",
        ],
        answer: 0,
        explain: "Örgütsel bir sorunu bireysel bir soruna çeviriyor diye reddediyorlar.",
      },
      {
        text: "Welche Aussage wird vom Text NICHT gestützt?",
        options: [
          "Homeoffice senkt nachweislich die Aufstiegschancen",
          "Die Beurteilungspraxis ist Teil des Problems",
          "Der Effekt hängt vom Verhalten der Führungskraft ab",
        ],
        answer: 0,
        explain:
          "„nachweislich“ tam da metnin reddettiği çıkarımdır: nedensellik gösterilemiyor.",
      },
    ],
  },
  {
    id: "c1-r11",
    level: "C1",
    skill: "reading",
    title: "Der offene Brief",
    genre: "Açık mektup",
    intro:
      "Hikâyenin devamı: Miriam'ın çevirisi tartışma yarattı — „bu kitabı o çevirmemeliydi“. Yanıtı bir açık mektup.",
    gloss: [
      { de: "der offene Brief", tr: "açık mektup", en: "open letter" },
      { de: "die Legitimation", tr: "meşrulaştırma", en: "legitimization" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "die Zuständigkeit", tr: "yetki alanı", en: "responsibility" },
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "verkürzen", tr: "kısaltmak", en: "to shorten" },
      { de: "die Aneignung", tr: "sahiplenme", en: "appropriation" },
      { de: "sich entziehen", tr: "kaçınmak", en: "to evade" },
      { de: "die Redlichkeit", tr: "dürüstlük", en: "honesty" },
    ],
    minutes: 8,
    text:
      "Liebe Kolleginnen und Kollegen,\n\nseit zwei Wochen wird über meine Übersetzung diskutiert, und ich habe geschwiegen, weil ich zuerst zuhören wollte. Jetzt möchte ich antworten — nicht, um recht zu behalten, sondern um zwei Dinge zu trennen, die in der Debatte ständig zusammenfallen.\n\nDer erste Einwand lautet, ich hätte diesen Roman nicht übersetzen sollen, weil mir die Erfahrung fehle, aus der er geschrieben ist. Diesen Einwand halte ich für ernst und für falsch. Ernst, weil er auf ein reales Ungleichgewicht zeigt: Wer übersetzt wen, wer wird gefragt, wer bekommt Aufträge? Falsch, weil er Übersetzung mit Vertretung verwechselt. Eine Übersetzerin spricht nicht für die Autorin. Sie stellt her, dass die Autorin selbst gehört werden kann — in einer Sprache, die sie nicht hatte.\n\nWürde man den Einwand konsequent zu Ende denken, ergäbe sich ein absurder Zustand: Übersetzt werden dürfte nur, was man selbst erlebt hat. Literatur wäre auf Herkunft verteilt statt auf Können, und die Bücher, die uns am fremdesten sind, blieben unübersetzt — also gerade jene, für die Übersetzung überhaupt existiert.\n\nDer zweite Einwand ist konkreter und trifft mich härter: Ich hätte an mehreren Stellen geglättet. Das stimmt. In drei Kapiteln habe ich Sätze verkürzt, die im Original absichtlich lang und atemlos sind. Ich habe geglaubt, deutsche Leser würden abbrechen. Das war eine Entscheidung über den Text hinweg, und sie war falsch. Die zweite Auflage wird an diesen Stellen korrigiert; die Liste der Änderungen liegt beim Verlag und wird veröffentlicht.\n\nIch schreibe das, weil ich glaube, dass die Debatte nur dann etwas wert ist, wenn man in ihr auch verlieren kann. Wer sich jedem Einwand entzieht, führt kein Gespräch. Wer jedem nachgibt, auch nicht.\n\nMiriam Falk",
    questions: [
      {
        text: "Warum hat Miriam zunächst geschwiegen?",
        options: [
          "Sie wollte zuerst zuhören",
          "Der Verlag hatte es verlangt",
          "Sie hatte keine Antwort",
        ],
        answer: 0,
        explain: "İlk cümlelerde bunu açıkça söylüyor.",
      },
      {
        text: "Wie bewertet sie den ersten Einwand?",
        options: [
          "Als ernst, aber falsch",
          "Als unwichtig",
          "Als vollständig berechtigt",
        ],
        answer: 0,
        explain: "Gerçek bir dengesizliğe işaret ettiği için ciddi, ama kavramları karıştırdığı için yanlış.",
      },
      {
        text: "Womit verwechselt der Einwand die Übersetzung, laut Miriam?",
        options: ["Mit Vertretung", "Mit Kritik", "Mit Nacherzählung"],
        answer: 0,
        explain: "„Eine Übersetzerin spricht nicht für die Autorin.“",
      },
      {
        text: "Welche Folge hätte der Einwand zu Ende gedacht?",
        options: [
          "Nur Selbsterlebtes dürfte übersetzt werden — das Fremdeste bliebe unübersetzt",
          "Alle Bücher müssten neu übersetzt werden",
          "Verlage dürften keine Aufträge mehr vergeben",
        ],
        answer: 0,
        explain: "Edebiyat yetenek yerine köken üzerinden dağıtılırdı.",
      },
      {
        text: "Was räumt sie ein?",
        options: [
          "Sie hat in drei Kapiteln absichtlich lange Sätze verkürzt",
          "Sie hat Passagen ausgelassen",
          "Sie hat die Sprache nicht ausreichend beherrscht",
        ],
        answer: 0,
        explain: "Alman okurun bırakacağını düşünmüş — bunu yanlış bir karar olarak niteliyor.",
      },
      {
        text: "Was ist ihre Haltung zur Debatte insgesamt?",
        options: [
          "Sie ist nur etwas wert, wenn man in ihr auch verlieren kann",
          "Sie sollte beendet werden",
          "Sie schadet der Literatur",
        ],
        answer: 0,
        explain: "„Wer sich jedem Einwand entzieht, führt kein Gespräch. Wer jedem nachgibt, auch nicht.“",
      },
    ],
  },
  {
    id: "c1-r12",
    level: "C1",
    skill: "reading",
    title: "Krankenversicherung für Selbstständige",
    genre: "Rehber",
    intro:
      "Serbest çalışanlar için Almanya'nın en pahalı kararı: hangi sağlık sigortası? Geri dönüşü olmayan bir seçim.",
    gloss: [
      { de: "gesetzlich versichert", tr: "kamu sigortalı", en: "publicly insured" },
      { de: "privat versichert", tr: "özel sigortalı", en: "privately insured" },
      { de: "der Beitragssatz", tr: "prim oranı", en: "contribution rate" },
      { de: "die Bemessungsgrundlage", tr: "matrah", en: "assessment basis" },
      { de: "der Mindestbeitrag", tr: "asgari prim", en: "minimum contribution" },
      { de: "die Rückkehr", tr: "dönüş", en: "return" },
      { de: "die Altersrückstellung", tr: "yaşlılık karşılığı", en: "ageing reserve" },
      { de: "in Kauf nehmen", tr: "göze almak", en: "to accept" },
    ],
    minutes: 8,
    text:
      "Für Angestellte ist die Sache einfach: Der Beitrag hängt vom Einkommen ab und wird geteilt. Selbstständige stehen vor einer Entscheidung, die sie meist nur einmal treffen können.\n\nIn der gesetzlichen Krankenversicherung richtet sich der Beitrag nach dem Gewinn, mit einem Mindestbeitrag, der auch dann fällig wird, wenn kaum etwas verdient wurde. In schlechten Jahren ist das eine erhebliche Belastung; in guten Jahren begrenzt eine Beitragsbemessungsgrenze die Zahlung nach oben. Familienangehörige ohne eigenes Einkommen sind beitragsfrei mitversichert — bei drei Kindern ein Unterschied von mehreren hundert Euro monatlich.\n\nIn der privaten Versicherung richtet sich der Beitrag nicht nach dem Einkommen, sondern nach Alter, Gesundheitszustand und gewähltem Leistungsumfang. Wer jung, gesund und kinderlos ist, zahlt oft deutlich weniger. Der Vergleich in diesem Moment ist jedoch irreführend: Beiträge steigen mit dem Alter und mit den Kosten des Gesundheitssystems, und jedes Familienmitglied kostet extra.\n\nEntscheidend ist die Rückkehr. Sie ist nach dem 55. Lebensjahr praktisch ausgeschlossen. Wer sich mit dreißig privat versichert, trifft damit eine Entscheidung für die Zeit, in der die Beiträge am höchsten und das Einkommen möglicherweise niedriger sein wird.\n\nDaraus folgt keine allgemeine Empfehlung, wohl aber eine Faustregel: Wer Familie plant, ein schwankendes Einkommen hat oder die eigene gesundheitliche Zukunft nicht einschätzen kann, fährt mit der gesetzlichen Versicherung meist besser — auch wenn er in den ersten Jahren mehr zahlt. Der höhere Beitrag ist der Preis für die Möglichkeit, sich zu irren.",
    questions: [
      {
        text: "Wonach richtet sich der gesetzliche Beitrag?",
        options: [
          "Nach dem Gewinn, mit Mindestbeitrag und Obergrenze",
          "Nach Alter und Gesundheit",
          "Nach der Zahl der Kinder",
        ],
        answer: 0,
        explain: "Kazanca göre; alt sınır kötü yıllarda da ödenir, üst sınır iyi yıllarda korur.",
      },
      {
        text: "Welcher Vorteil der gesetzlichen Versicherung wird für Familien genannt?",
        options: [
          "Angehörige ohne Einkommen sind beitragsfrei mitversichert",
          "Der Beitrag sinkt pro Kind",
          "Kinder sind privat billiger",
        ],
        answer: 0,
        explain: "Üç çocukta aylık birkaç yüz euro fark.",
      },
      {
        text: "Warum ist der Beitragsvergleich beim Einstieg irreführend?",
        options: [
          "Private Beiträge steigen mit Alter und Gesundheitskosten",
          "Gesetzliche Beiträge sind immer niedriger",
          "Die Leistungen sind identisch",
        ],
        answer: 0,
        explain: "Genç ve sağlıklıyken ucuz görünür; her aile üyesi ayrıca maliyet doğurur.",
      },
      {
        text: "Was gilt für die Rückkehr in die gesetzliche Versicherung?",
        options: [
          "Nach dem 55. Lebensjahr praktisch ausgeschlossen",
          "Jederzeit möglich",
          "Nur mit ärztlichem Attest",
        ],
        answer: 0,
        explain: "Bu yüzden otuzundaki karar, primlerin en yüksek olacağı dönemi de bağlıyor.",
      },
      {
        text: "Für wen ist laut Text die gesetzliche Versicherung meist besser?",
        options: [
          "Für Menschen mit Familienplanung oder schwankendem Einkommen",
          "Für alle Selbstständigen",
          "Für junge, gesunde Selbstständige",
        ],
        answer: 0,
        explain: "Ayrıca sağlık geleceğini kestiremeyenler için.",
      },
      {
        text: "Wie ist der Schlusssatz zu verstehen?",
        options: [
          "Der höhere Beitrag kauft die Möglichkeit, eine Fehlentscheidung zu korrigieren",
          "Fehler sind in der Versicherung nicht möglich",
          "Wer sich irrt, zahlt später weniger",
        ],
        answer: 0,
        explain: "„Der Preis für die Möglichkeit, sich zu irren.“",
      },
    ],
  },

  {
    id: "c1-l1",
    level: "C1",
    skill: "listening",
    title: "Warum Fakten allein nicht überzeugen",
    genre: "Konferans",
    intro: "Bilim iletişimi kongresindeki bu açılış konuşmasında konuşmacının çürüttüğü modeli ve önerdiği üç sonucu not al.",
    minutes: 6,
    gloss: [
      { de: "das Defizitmodell", tr: "eksiklik modeli", en: "deficit model" },
      { de: "die Zustimmung", tr: "onay", en: "approval" },
      { de: "etwas widerlegen", tr: "çürütmek", en: "to refute" },
      { de: "die Einstellung", tr: "tutum", en: "attitude" },
      { de: "die Zugehörigkeit", tr: "aidiyet", en: "belonging" },
      { de: "die Glaubwürdigkeit", tr: "inandırıcılık", en: "credibility" },
      { de: "etwas offenlegen", tr: "açıkça ortaya koymak", en: "to disclose" },
      { de: "Gewissheit vortäuschen", tr: "kesinlik taslamak", en: "to feign certainty" },
      { de: "Fehler einräumen", tr: "hatayı kabul etmek", en: "to admit a mistake" },
      { de: "die Unfehlbarkeit", tr: "yanılmazlık", en: "infallibility" },
    ],
    segments: [
      {
        text: "Meine Damen und Herren, ich freue mich, Sie zur diesjährigen Tagung des Netzwerks Wissenschaftskommunikation begrüßen zu dürfen. Mein Thema klingt zunächst paradox: Warum überzeugen Fakten allein nicht – und was folgt daraus für unseren Umgang mit der Öffentlichkeit?",
      },
      {
        text: "Jahrzehntelang folgte die Wissenschaftskommunikation dem sogenannten Defizitmodell. Die Annahme lautete: Wenn Menschen Forschungsergebnisse ablehnen, fehlt ihnen schlicht das Wissen. Man müsse die Lücke nur mit verständlichen Informationen füllen, dann stelle sich die Zustimmung von selbst ein.",
      },
      {
        text: "Die empirische Forschung hat dieses Modell gründlich widerlegt. Eine Auswertung von mehr als achtzig Einzelstudien, die wir im vergangenen Jahr an der Universität Erfurt abgeschlossen haben, zeigt: Zusätzliches Wissen verändert Einstellungen kaum, sobald ein Thema die eigene Identität berührt. Wer sich einer Gemeinschaft zugehörig fühlt, die etwa dem Impfen skeptisch gegenübersteht, verarbeitet neue Informationen nicht neutral, sondern als Angriff auf diese Zugehörigkeit.",
      },
      {
        text: "Entscheidend ist stattdessen Vertrauen. Menschen fragen nicht zuerst: Stimmt das? Sie fragen: Wer sagt das, und meint diese Person es gut mit mir? Unsere Daten zeigen deutlich: Kommunikation, die Unsicherheiten offenlegt und eigene Interessenkonflikte benennt, wirkt glaubwürdiger als eine, die Gewissheit vortäuscht.",
      },
      {
        text: "Daraus ergeben sich drei praktische Konsequenzen. Erstens: Hören Sie zu, bevor Sie senden – wer die Sorgen seines Publikums nicht kennt, redet an ihm vorbei. Zweitens: Erzählen Sie von Menschen und Entscheidungen, nicht nur von Zahlen; Geschichten schaffen die Anschlussstellen, an denen Fakten überhaupt erst haften bleiben. Drittens: Räumen Sie Fehler öffentlich ein, auch wenn es unbequem ist.",
      },
      {
        text: "Denn das ist der Kern meiner Botschaft: Wissenschaft verliert ihre Autorität nicht durch das Eingeständnis von Grenzen, sondern durch den Anschein der Unfehlbarkeit. Vielen Dank für Ihre Aufmerksamkeit.",
      },
    ],
    questions: [
      {
        text: "Was besagt das sogenannte Defizitmodell?",
        options: [
          "Ablehnung von Forschung beruht auf fehlendem Wissen und verschwindet durch verständliche Information.",
          "Der Wissenschaft fehlen die finanziellen Mittel für gute Kommunikation.",
          "Das Publikum vertraut Forschern grundsätzlich weniger als Journalisten.",
        ],
        answer: 0,
        explain: "İkinci bölümde tanımlanıyor: insanlar bilgiyi reddediyorsa „fehlt ihnen schlicht das Wissen“ varsayımı — boşluğu bilgiyle doldurunca onayın kendiliğinden geleceği düşünülüyordu.",
      },
      {
        text: "Unter welcher Bedingung verändert zusätzliches Wissen die Einstellungen kaum?",
        options: [
          "Wenn die Informationen zu kompliziert formuliert sind.",
          "Wenn das Thema die eigene Identität berührt.",
          "Wenn die Studienlage widersprüchlich ist.",
        ],
        answer: 1,
        explain: "Erfurt araştırmasının bulgusu: „sobald ein Thema die eigene Identität berührt“ — aidiyet devreye girince yeni bilgi saldırı olarak işleniyor.",
      },
      {
        text: "Laut Vortrag wirkt Kommunikation glaubwürdiger, wenn sie Unsicherheiten verschweigt und Sicherheit ausstrahlt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Konuşmacı tersini söylüyor: belirsizlikleri açıklayan ve çıkar çatışmalarını adlandıran iletişim, „Gewissheit vortäuscht“ olandan daha inandırıcı.",
      },
      {
        text: "Welche Funktion haben Geschichten laut dem Vortrag?",
        options: [
          "Sie ersetzen Zahlen, die das Publikum ohnehin nicht versteht.",
          "Sie lenken von unbequemen Forschungsergebnissen ab.",
          "Sie schaffen Anschlussstellen, an denen Fakten haften bleiben.",
        ],
        answer: 2,
        explain: "İkinci pratik sonuç: hikâyeler „die Anschlussstellen, an denen Fakten überhaupt erst haften bleiben“ yaratıyor — sayıların yerine geçmiyor, tutunmasını sağlıyor.",
      },
      {
        text: "Der Redner warnt, Wissenschaft verliere ihre Autorität vor allem durch das öffentliche Eingeständnis von Fehlern.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kapanış cümlesi tam tersi: otorite kaybının nedeni sınırların itirafı değil, „der Anschein der Unfehlbarkeit“ — yanılmazlık görüntüsü.",
      },
    ],
  },
  {
    id: "c1-l2",
    level: "C1",
    skill: "listening",
    title: "Streitfall Nachverdichtung",
    genre: "Panel",
    intro: "Kent gelişimi panelinde iki uzman yoğunlaştırma konusunda karşı karşıya — kimin hangi gerekçeyle nerede uzlaştığını yakala.",
    minutes: 6,
    gloss: [
      { de: "die Nachverdichtung", tr: "kentsel yoğunlaştırma", en: "urban densification" },
      { de: "die Wohnungsnot", tr: "konut sıkıntısı", en: "housing shortage" },
      { de: "die Baulücke", tr: "boş parsel", en: "vacant lot" },
      { de: "etwas aufstocken", tr: "kat çıkmak", en: "to add a storey" },
      { de: "die Versiegelung", tr: "betonlaşma", en: "soil sealing" },
      { de: "die Frischluftschneise", tr: "temiz hava koridoru", en: "fresh air corridor" },
      { de: "die Hitzeinsel", tr: "ısı adası", en: "heat island" },
      { de: "der Bestand", tr: "yapı stoku", en: "building stock" },
      { de: "der Leerstand", tr: "boş kalma", en: "vacancy" },
      { de: "die Umnutzung", tr: "yeniden işlevlendirme", en: "change of use" },
      { de: "der Zielkonflikt", tr: "hedef çatışması", en: "conflict of goals" },
    ],
    segments: [
      {
        speaker: "Moderatorin",
        text: "Willkommen zu unserem Stadtgespräch. In den deutschen Großstädten fehlen nach aktuellen Schätzungen rund 550.000 Wohnungen. Zugleich heizen sich die Innenstädte im Sommer immer stärker auf. Frau Professor Wenzel, Sie sagen: Wir müssen dichter bauen. Warum?",
      },
      {
        speaker: "Professorin Wenzel",
        text: "Weil jede nicht gebaute Wohnung in der Stadt am Stadtrand doppelt gebaut wird – mit neuen Straßen, langen Pendelwegen und deutlich höherem Flächenverbrauch. Nachverdichtung heißt ja nicht, jeden Hof zuzubetonieren. Es heißt: Baulücken schließen, Gebäude aufstocken, eingeschossige Supermärkte mit Wohnungen überbauen. Allein durch Aufstockung ließen sich nach unseren Berechnungen bundesweit etwa 400.000 Wohnungen schaffen, ohne einen einzigen Quadratmeter zusätzlich zu versiegeln.",
      },
      {
        speaker: "Moderatorin",
        text: "Herr Roth, Sie sind Landschaftsarchitekt und sehen das kritischer.",
      },
      {
        speaker: "Herr Roth",
        text: "Ich widerspreche gar nicht grundsätzlich, aber die Praxis sieht anders aus. Verdichtet wird dort, wo es am billigsten ist: auf Grünflächen und in Innenhöfen. Genau diese Flächen kühlen aber die Stadt. Wenn wir Frischluftschneisen zubauen, verwandeln wir Quartiere in Hitzeinseln – und die Leidtragenden sind ältere Menschen und Familien, die sich keine Klimaanlage leisten können. Wohnungsbau gegen Klimaanpassung auszuspielen, halte ich für kurzsichtig.",
      },
      {
        speaker: "Professorin Wenzel",
        text: "Da bin ich völlig bei Ihnen – deshalb spreche ich von qualifizierter Dichte. Wer aufstockt, muss zugleich Dächer begrünen, Fassaden beschatten und Höfe entsiegeln. Und wir sollten endlich über den Bestand reden: Millionen Quadratmeter Büros stehen seit der Pandemie leer. Ihre Umnutzung zu Wohnraum wäre die klimafreundlichste Verdichtung überhaupt.",
      },
      {
        speaker: "Herr Roth",
        text: "Wenn Verdichtung so verstanden wird, trage ich sie mit. Meine Bedingung bleibt allerdings: Für jeden neuen Quadratmeter Wohnfläche muss die Stadt an anderer Stelle messbar grüner werden. Sonst lösen wir die Wohnungsnot und schaffen die nächste Krise gleich mit.",
      },
      {
        speaker: "Moderatorin",
        text: "Qualifizierte Dichte statt bloßer Masse – so weit scheint der Konsens zu reichen. Vielen Dank Ihnen beiden für dieses Gespräch.",
      },
    ],
    questions: [
      {
        text: "Mit welchem Argument begründet Professorin Wenzel die Nachverdichtung?",
        options: [
          "Wohnungen am Stadtrand sind für Familien unattraktiv geworden.",
          "Jede nicht gebaute Wohnung in der Stadt verursacht am Stadtrand höheren Flächenverbrauch.",
          "Innenhöfe und Grünflächen werden in Großstädten kaum genutzt.",
        ],
        answer: 1,
        explain: "Wenzel'in açılış argümanı: şehirde yapılmayan konut kenar mahallede „doppelt gebaut“ oluyor — yeni yollar, uzun mesafeler, daha çok arazi tüketimi.",
      },
      {
        text: "Wovor warnt Herr Roth?",
        options: [
          "Dass Verdichtung in der Praxis auf kühlenden Grünflächen stattfindet und Hitzeinseln erzeugt.",
          "Dass Aufstockungen die Statik älterer Gebäude gefährden.",
          "Dass Nachverdichtung die Mieten in den Innenstädten weiter erhöht.",
        ],
        answer: 0,
        explain: "Roth pratiğe itiraz ediyor: yoğunlaştırma en ucuz yerde, yani yeşil alanlarda oluyor; hava koridorları kapanınca mahalleler „Hitzeinseln“e dönüşüyor. Statik ve kira konusu hiç geçmiyor.",
      },
      {
        text: "Herr Roth lehnt jede Form von Nachverdichtung grundsätzlich ab.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kendisi açıkça „Ich widerspreche gar nicht grundsätzlich“ diyor ve sonda koşullu destek veriyor — itirazı ilkeye değil uygulamaya.",
      },
      {
        text: "Was versteht Wenzel unter „qualifizierter Dichte“?",
        options: [
          "Verdichtung nur in Vierteln mit hoher Nachfrage.",
          "Verdichtung, die mit Dachbegrünung, Beschattung und Entsiegelung einhergeht.",
          "Verdichtung ausschließlich durch den Neubau von Hochhäusern.",
        ],
        answer: 1,
        explain: "Wenzel kavramı tanımlıyor: kat çıkan „zugleich Dächer begrünen, Fassaden beschatten und Höfe entsiegeln“ zorunda — yoğunlaşma iklim önlemleriyle birlikte gitmeli.",
      },
      {
        text: "Beide Fachleute sehen in der Umnutzung leerstehender Büros eine sinnvolle Möglichkeit, Wohnraum zu schaffen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Wenzel boş ofislerin dönüşümünü „die klimafreundlichste Verdichtung überhaupt“ diye öneriyor; Roth da „Wenn Verdichtung so verstanden wird, trage ich sie mit“ diyerek katılıyor.",
      },
    ],
  },
  {
    id: "c1-l3",
    level: "C1",
    skill: "listening",
    title: "Künstliche Intelligenz in der Diagnostik",
    genre: "Akademik röportaj",
    intro: "Bir tıp bilişimi profesörüyle yapılan bu akademik söyleşide fırsatlarla riskler arasındaki dengeyi ve sorumluluk sorusunu izle.",
    minutes: 6,
    gloss: [
      { de: "die Diagnostik", tr: "tanı bilimi", en: "diagnostics" },
      { de: "die Treffsicherheit", tr: "isabet oranı", en: "accuracy" },
      { de: "etwas übersehen", tr: "gözden kaçırmak", en: "to overlook" },
      { de: "der Automatisierungsbias", tr: "otomasyon yanlılığı", en: "automation bias" },
      { de: "die Haftung", tr: "sorumluluk", en: "liability" },
      { de: "das Werkzeug", tr: "alet", en: "tool" },
      { de: "die Zulassung", tr: "ruhsat", en: "approval" },
      { de: "der Befund", tr: "tetkik sonucu", en: "test result" },
      { de: "etwas hinterfragen", tr: "sorgulamak", en: "to question" },
      { de: "die Entlastung", tr: "rahatlama", en: "relief" },
    ],
    segments: [
      {
        speaker: "Moderator",
        text: "Herr Professor Lehmann, Sie erforschen den Einsatz künstlicher Intelligenz in der medizinischen Diagnostik. Wie gut sind diese Systeme inzwischen wirklich?",
      },
      {
        speaker: "Professor Lehmann",
        text: "In eng umgrenzten Aufgaben erstaunlich gut. In unserer Heidelberger Studie hat ein Bilderkennungssystem verdächtige Hautveränderungen mit einer Treffsicherheit von 94 Prozent erkannt, erfahrene Fachärzte kamen auf 87 Prozent. Aber dieser Vergleich führt in die Irre, wenn man ihn absolut setzt. Die Maschine erkennt Muster in Bildern – sie kennt weder die Krankengeschichte noch die Lebensumstände des Patienten.",
      },
      {
        speaker: "Moderator",
        text: "Trotzdem klingt das nach einer klaren Verbesserung. Wo liegt das Problem?",
      },
      {
        speaker: "Professor Lehmann",
        text: "Im sogenannten Automatisierungsbias. Wir haben Ärztinnen und Ärzte absichtlich mit fehlerhaften Systemvorschlägen konfrontiert. Das Ergebnis hat uns beunruhigt: Fast ein Drittel übernahm die falsche Einschätzung, obwohl sie ohne das System richtig geurteilt hätte. Je überzeugender die Technik auftritt, desto eher schaltet der Mensch das eigene Urteil ab. Genau das Gegenteil dessen, was wir wollen.",
      },
      {
        speaker: "Moderator",
        text: "Wer haftet denn, wenn eine solche gemeinsame Entscheidung falsch ist?",
      },
      {
        speaker: "Professor Lehmann",
        text: "Rechtlich ist das eindeutig: die behandelnde Ärztin oder der behandelnde Arzt. Die Systeme sind als Unterstützung zugelassen, nicht als Entscheider. Deshalb sage ich meinen Studierenden immer: Die künstliche Intelligenz ist ein Werkzeug, kein Kollege. Ein Befund, den ich nicht hinterfragen kann, ist keine Entlastung, sondern ein Risiko.",
      },
      {
        speaker: "Moderator",
        text: "Was müsste sich ändern, damit die Technik verantwortungsvoll eingesetzt wird?",
      },
      {
        speaker: "Professor Lehmann",
        text: "Drei Dinge. Die Systeme müssen ihre Unsicherheit anzeigen, statt nur ein Ergebnis zu liefern. Der Umgang mit ihnen muss fester Teil des Medizinstudiums werden. Und wir brauchen eine fortlaufende Kontrolle nach der Zulassung, denn diese Systeme verändern sich mit neuen Daten. Unter diesen Bedingungen kann künstliche Intelligenz die Versorgung tatsächlich verbessern – vor allem dort, wo Fachärzte fehlen.",
      },
    ],
    questions: [
      {
        text: "Wie ordnet Lehmann das Heidelberger Studienergebnis ein?",
        options: [
          "Der Vergleich führt in die Irre, wenn man ihn absolut setzt, denn die Maschine kennt den Patienten nicht.",
          "Die Fachärzte schnitten besser ab als das System.",
          "Das System ist der ärztlichen Diagnose in jeder Hinsicht überlegen.",
        ],
        answer: 0,
        explain: "Sayılar sistemin lehine (yüzde 94'e karşı 87) ama Lehmann hemen sınırlıyor: makine yalnızca görüntü deseni tanıyor, „weder die Krankengeschichte noch die Lebensumstände“ biliyor.",
      },
      {
        text: "Was zeigte das Experiment mit den fehlerhaften Systemvorschlägen?",
        options: [
          "Die Ärzte erkannten fast alle fehlerhaften Vorschläge sofort.",
          "Fast ein Drittel der Ärzte übernahm die falsche Einschätzung des Systems.",
          "Nur unerfahrene Ärzte ließen sich von den Vorschlägen täuschen.",
        ],
        answer: 1,
        explain: "Otomasyon yanlılığı bulgusu: „Fast ein Drittel übernahm die falsche Einschätzung, obwohl sie ohne das System richtig geurteilt hätte.“ Deneyim ayrımı söyleşide geçmiyor.",
      },
      {
        text: "Rechtlich haftet bei einer falschen Entscheidung der Hersteller des Systems.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Lehmann net: sorumluluk „die behandelnde Ärztin oder der behandelnde Arzt“ta — sistemler karar verici olarak değil, „als Unterstützung“ ruhsatlı.",
      },
      {
        text: "Was meint Lehmann mit dem Satz „Die künstliche Intelligenz ist ein Werkzeug, kein Kollege“?",
        options: [
          "Die Technik ist noch zu unzuverlässig für den klinischen Alltag.",
          "Die Systeme sollten künftig eigenständig über Behandlungen entscheiden dürfen.",
          "Das ärztliche Urteil bleibt unverzichtbar; die Systemvorschläge müssen hinterfragbar sein.",
        ],
        answer: 2,
        explain: "Cümlenin devamı anahtarı veriyor: „Ein Befund, den ich nicht hinterfragen kann, ist keine Entlastung, sondern ein Risiko“ — araç destekler, hekimin yargısının yerine geçmez.",
      },
      {
        text: "Lehmann fordert unter anderem, dass die Systeme ihre eigene Unsicherheit anzeigen und nach der Zulassung fortlaufend kontrolliert werden.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Son cevaptaki üç talepten ikisi bunlar; üçüncüsü yapay zekâyla çalışmanın tıp eğitiminin sabit parçası olması.",
      },
    ],
  },
  {
    id: "c1-l4",
    level: "C1",
    skill: "listening",
    title: "Wildenhain: Ein Dorf erfindet sich neu",
    genre: "Radyo belgeseli",
    intro: "Bu radyo belgeselinde küçülen bir Doğu Almanya köyünün rakamlarını ve beklenmedik dönüş hikâyesini dinle.",
    minutes: 6,
    gloss: [
      { de: "die Landflucht", tr: "kırdan kente göç", en: "rural exodus" },
      { de: "die Ausdünnung", tr: "seyrekleşme", en: "thinning out" },
      { de: "der Wegzug", tr: "göçüp gitme", en: "departure" },
      { de: "die Überalterung", tr: "nüfusun yaşlanması", en: "population aging" },
      { de: "der Rückkehrer", tr: "geri dönen kişi", en: "returnee" },
      { de: "der Glasfaseranschluss", tr: "fiber optik bağlantı", en: "fiber optic connection" },
      { de: "der Gemeinschaftsraum", tr: "ortak kullanım mekânı", en: "common room" },
      { de: "die Genossenschaft", tr: "kooperatif", en: "cooperative" },
      { de: "tragfähig", tr: "sağlam", en: "viable" },
      { de: "die Trendwende", tr: "eğilimin tersine dönmesi", en: "trend reversal" },
      { de: "verhalten", tr: "ölçülü", en: "restrained" },
    ],
    segments: [
      {
        speaker: "Sprecherin",
        text: "Ein Montagmorgen in Wildenhain, einem Dorf im Norden Sachsens. Der Bäcker hat vor sieben Jahren geschlossen, die Grundschule vor fünf. Von den einst 1.900 Einwohnern sind noch knapp 1.100 geblieben, mehr als ein Drittel von ihnen ist älter als 65. Wildenhain ist kein Einzelfall – es ist der Normalfall in weiten Teilen des ländlichen Ostdeutschlands.",
      },
      {
        speaker: "Sprecherin",
        text: "Im Rathaus empfängt uns Bürgermeisterin Anke Petzold. Seit elf Jahren verwaltet sie die Ausdünnung ihres Ortes: erst gingen die Jungen, dann die Läden, zuletzt die Buslinie nach Torgau.",
      },
      {
        speaker: "Bürgermeisterin Petzold",
        text: "Das Schlimmste war nicht der Wegzug selbst, sondern die Stimmung, die er hinterlässt. Wenn die Schule schließt, sagt das jeder jungen Familie: Hier ist keine Zukunft. Gegen dieses Gefühl kämpfen wir bis heute an.",
      },
      {
        speaker: "Sprecherin",
        text: "Doch seit etwa drei Jahren registriert die Gemeinde etwas Neues. Erst waren es zwei Familien aus Leipzig, dann ein halbes Dutzend. Inzwischen zählt Wildenhain 74 Zugezogene – die meisten zwischen 30 und 45, viele davon mit Berufen, die nur einen Bildschirm brauchen. Möglich wurde das durch einen Zufall der Infrastrukturpolitik: Wildenhain bekam früher als die Nachbarorte einen flächendeckenden Glasfaseranschluss.",
      },
      {
        speaker: "Bürgermeisterin Petzold",
        text: "Die Neuen wollen kein Museumsdorf und keine Vorstadt, sie wollen Mitgestaltung. Sie haben den alten Konsum als Genossenschaft wiederbelebt, mit Dorfladen, Café und Arbeitsplätzen zum Mieten. Und plötzlich reden die Alteingesessenen und die Zugezogenen am selben Tresen miteinander.",
      },
      {
        speaker: "Sprecherin",
        text: "Forschende der Universität Halle beobachten solche Entwicklungen inzwischen in mehreren Regionen, warnen jedoch vor verfrühter Euphorie. Von einer Trendwende könne erst die Rede sein, wenn Kitas, Ärzte und Busverbindungen nachzögen – Zuzug allein mache noch keine tragfähige Infrastruktur. Bürgermeisterin Petzold formuliert es verhaltener: Wildenhain sei nicht gerettet, sagt sie. Aber es habe zum ersten Mal seit Jahrzehnten wieder eine Richtung.",
      },
    ],
    questions: [
      {
        text: "Was beschreibt die Sprecherin zu Beginn als „Normalfall“ im ländlichen Ostdeutschland?",
        options: [
          "Den wirtschaftlichen Aufschwung kleiner Gemeinden.",
          "Schrumpfung und Überalterung von Dörfern wie Wildenhain.",
          "Die Rückkehr junger Familien aus den Großstädten.",
        ],
        answer: 1,
        explain: "Giriş: 1.900 kişiden 1.100'e düşüş, üçte birden fazlası 65 üstü — „Wildenhain ist kein Einzelfall – es ist der Normalfall“.",
      },
      {
        text: "Was war für Bürgermeisterin Petzold das Schlimmste am Schrumpfen des Dorfes?",
        options: [
          "Die Stimmung der Zukunftslosigkeit, die der Wegzug hinterlässt.",
          "Der Verlust von Steuereinnahmen für die Gemeinde.",
          "Die Schließung der Buslinie nach Torgau.",
        ],
        answer: 0,
        explain: "Petzold'un sözleri: „Das Schlimmste war nicht der Wegzug selbst, sondern die Stimmung, die er hinterlässt“ — okulun kapanması genç ailelere ‚burada gelecek yok‘ mesajı veriyor.",
      },
      {
        text: "Der frühe Glasfaserausbau war ein entscheidender Grund dafür, dass Zugezogene nach Wildenhain kamen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Anlatıcı bunu „ein Zufall der Infrastrukturpolitik“ diye açıklıyor: köy komşularından önce yaygın fiber bağlantı aldı; gelenlerin çoğu „Berufe, die nur einen Bildschirm brauchen“ sahibi.",
      },
      {
        text: "Was haben die Zugezogenen im Dorf aufgebaut?",
        options: [
          "Ein Museumsdorf für Touristen aus Leipzig.",
          "Eine private Grundschule mit digitalem Unterricht.",
          "Eine Genossenschaft mit Dorfladen, Café und mietbaren Arbeitsplätzen.",
        ],
        answer: 2,
        explain: "Petzold anlatıyor: eski „Konsum“ mağazası kooperatif olarak canlandırıldı — „mit Dorfladen, Café und Arbeitsplätzen zum Mieten“. Müze köy tam da istemedikleri şey.",
      },
      {
        text: "Die Forschenden der Universität Halle sprechen bereits von einer gesicherten Trendwende für ländliche Regionen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Araştırmacılar „vor verfrühter Euphorie“ uyarıyor: kreşler, doktorlar ve otobüs hatları gelmedikçe eğilim dönmüş sayılmaz — Konjunktiv I („könne … die Rede sein“) temkinli aktarımı gösteriyor.",
      },
    ],
  },
  {
    id: "c1-l5",
    level: "C1",
    skill: "listening",
    title: "Englisch als Wissenschaftssprache: Gewinn oder Verlust?",
    genre: "Konferans",
    intro: "Bu üniversite konuşmasında bilimin İngilizceleşmesinin kazanç ve kayıp hanelerini konuşmacının nasıl tarttığını izle.",
    minutes: 6,
    gloss: [
      { de: "die Wissenschaftssprache", tr: "bilim dili", en: "language of science" },
      { de: "die Fachzeitschrift", tr: "bilimsel dergi", en: "specialist journal" },
      { de: "der Austausch", tr: "fikir alışverişi", en: "exchange" },
      { de: "der Domänenverlust", tr: "alan kaybı", en: "domain loss" },
      { de: "die Begriffsbildung", tr: "kavram oluşturma", en: "concept formation" },
      { de: "etwas verkümmern lassen", tr: "körelmeye bırakmak", en: "to let wither" },
      { de: "die Rechenschaftspflicht", tr: "hesap verme yükümlülüğü", en: "accountability" },
      { de: "der Steuerzahler", tr: "vergi mükellefi", en: "taxpayer" },
      { de: "die Erstsprache", tr: "ana dili", en: "first language" },
      { de: "das Plädoyer", tr: "savunma", en: "plea" },
    ],
    segments: [
      {
        text: "Sehr geehrte Damen und Herren, noch vor hundert Jahren war Deutsch eine führende Wissenschaftssprache – wer in Chemie oder Physik mitreden wollte, las deutsche Fachzeitschriften. Heute erscheinen über 95 Prozent der naturwissenschaftlichen Veröffentlichungen weltweit auf Englisch. Die Frage meines Vortrags lautet: Was gewinnen wir dadurch, und was verlieren wir?",
      },
      {
        text: "Beginnen wir mit den Gewinnen, denn sie sind erheblich. Eine gemeinsame Verkehrssprache macht Forschung weltweit anschlussfähig. Eine Doktorandin in Ankara, ein Labor in Seoul und eine Arbeitsgruppe in Leipzig können ohne Verzögerung aufeinander aufbauen. Diesen Zugewinn an Austausch und Überprüfbarkeit sollte niemand kleinreden, der internationale Zusammenarbeit ernst nimmt.",
      },
      {
        text: "Doch der Preis wird selten beziffert. Sprachwissenschaftler nennen ihn Domänenverlust: Eine Sprache, in der nicht mehr geforscht wird, hört allmählich auf, neue Fachbegriffe zu bilden. Wo das Deutsche keine eigenen Begriffe mehr entwickelt, können wir wissenschaftliche Sachverhalte irgendwann nur noch auf Englisch präzise verhandeln – im Labor mag das verschmerzbar sein, in der Gesellschaft ist es das nicht.",
      },
      {
        text: "Denn Wissenschaft hat eine Rechenschaftspflicht gegenüber denen, die sie finanzieren. Ob Impfstoffe, Energiewende oder künstliche Intelligenz: Die öffentliche Debatte über Forschung findet in der Landessprache statt. Wenn Fachleute ihre eigenen Ergebnisse nicht mehr allgemeinverständlich auf Deutsch erklären können, entsteht genau die Distanz zwischen Wissenschaft und Öffentlichkeit, über die wir uns anschließend beklagen.",
      },
      {
        text: "Hinzu kommt ein oft übersehener Befund aus der Lehr-Lern-Forschung: Studierende verarbeiten komplexe Inhalte in ihrer Erstsprache nachweislich tiefer. Wer die Lehre vollständig anglisiert, erleichtert den internationalen Austausch – und erschwert zugleich einem Teil der eigenen Studierenden das Verstehen.",
      },
      {
        text: "Mein Plädoyer ist daher kein nostalgisches. Publizieren wir auf Englisch, wo die Fachwelt unser Publikum ist. Aber lehren, erklären und debattieren wir auch in der Landessprache – nicht aus Traditionspflege, sondern weil eine Demokratie nur über Wissenschaft streiten kann, die sie sprachlich erreicht. Vielen Dank.",
      },
    ],
    questions: [
      {
        text: "Wie bewertet der Redner die gemeinsame Verkehrssprache Englisch?",
        options: [
          "Als bedauerlichen Irrweg, der rückgängig gemacht werden sollte.",
          "Als Übergangsphänomen ohne dauerhafte Bedeutung.",
          "Als erheblichen Gewinn für Austausch und Überprüfbarkeit der Forschung.",
        ],
        answer: 2,
        explain: "İkinci bölümde net: kazançlar „erheblich“, ortak dil araştırmayı dünya çapında „anschlussfähig“ kılıyor — konuşmacı bunu küçümseyene karşı çıkıyor.",
      },
      {
        text: "Was bezeichnet der Begriff „Domänenverlust“?",
        options: [
          "Eine Sprache, in der nicht mehr geforscht wird, bildet allmählich keine neuen Fachbegriffe mehr.",
          "Universitäten verlieren ganze Fachbereiche an ausländische Hochschulen.",
          "Deutsche Fachzeitschriften verlieren ihre internationalen Abonnenten.",
        ],
        answer: 0,
        explain: "Üçüncü bölümdeki tanım: araştırma yapılmayan dil „hört allmählich auf, neue Fachbegriffe zu bilden“ — kayıp kurumsal değil, dilsel.",
      },
      {
        text: "Laut Vortrag findet die öffentliche Debatte über Forschung überwiegend auf Englisch statt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tam tersi: „Die öffentliche Debatte über Forschung findet in der Landessprache statt“ — bilim insanları sonuçlarını Almanca anlatamazsa toplumla arasındaki mesafe büyüyor.",
      },
      {
        text: "Welcher Befund aus der Lehr-Lern-Forschung wird angeführt?",
        options: [
          "Englischsprachige Lehre verbessert die Karrierechancen aller Absolventen.",
          "Studierende verarbeiten komplexe Inhalte in ihrer Erstsprache tiefer.",
          "Studierende bevorzugen mehrheitlich englischsprachige Lehrveranstaltungen.",
        ],
        answer: 1,
        explain: "Beşinci bölüm: „Studierende verarbeiten komplexe Inhalte in ihrer Erstsprache nachweislich tiefer“ — tam İngilizceleşme bir kesimin anlamasını zorlaştırıyor.",
      },
      {
        text: "Der Redner fordert, wissenschaftliche Veröffentlichungen künftig wieder überwiegend auf Deutsch zu publizieren.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kapanış çağrısı ikili: „Publizieren wir auf Englisch, wo die Fachwelt unser Publikum ist“ — Almanca ise öğretim, açıklama ve kamusal tartışma için savunuluyor. Nostaljik bir geri dönüş talebi yok.",
      },
    ],
  },
  {
    id: "c1-l6",
    level: "C1",
    skill: "listening",
    title: "Tablets für alle – und dann?",
    genre: "Panel",
    intro: "Okullarda dijitalleşme panelinde bir eğitim araştırmacısı ile bir öğretmen sahadaki gerçeği tartışıyor — ortak vardıkları formülü yakala.",
    minutes: 6,
    gloss: [
      { de: "die Ausstattung", tr: "donanım", en: "equipment" },
      { de: "flächendeckend", tr: "her yeri kapsayan", en: "across the board" },
      { de: "der Mehrwert", tr: "katma değer", en: "added value" },
      { de: "die Ablenkung", tr: "dikkat dağınıklığı", en: "distraction" },
      { de: "das Endgerät", tr: "uç cihaz", en: "end device" },
      { de: "die Fortbildung", tr: "mesleki eğitim", en: "further training" },
      { de: "das Konzept", tr: "konsept", en: "concept" },
      { de: "etwas verstauben", tr: "tozlanmak", en: "to gather dust" },
      { de: "die Wartung", tr: "bakım", en: "maintenance" },
      { de: "die Lernwirkung", tr: "öğrenme etkisi", en: "learning effect" },
      { de: "didaktisch", tr: "didaktik", en: "pedagogical" },
    ],
    segments: [
      {
        speaker: "Moderator",
        text: "Willkommen zu unserer Runde über die digitale Schule. Milliarden aus dem Digitalpakt sind ausgegeben, viele Klassenzimmer flächendeckend mit Tablets ausgestattet. Frau Doktor Kaya, Sie haben die Lernwirkung untersucht. Hat sich die Investition gelohnt?",
      },
      {
        speaker: "Doktor Kaya",
        text: "Die unbequeme Antwort lautet: Das Gerät allein bewirkt nichts. Wir haben 120 Schulen über vier Jahre begleitet. Dort, wo Tablets lediglich das Arbeitsblatt ersetzten, blieben die Leistungen unverändert – in Mathematik gingen sie teilweise sogar leicht zurück, vor allem durch Ablenkung. Deutliche Lernzuwächse fanden wir nur an Schulen, die zuerst ein didaktisches Konzept entwickelt und dann die Technik angeschafft haben. Die Reihenfolge ist entscheidend.",
      },
      {
        speaker: "Moderator",
        text: "Herr Brandt, Sie unterrichten seit zwanzig Jahren an einer Gesamtschule in Dortmund. Deckt sich das mit Ihrer Erfahrung?",
      },
      {
        speaker: "Herr Brandt",
        text: "Vollkommen. Bei uns kamen vor drei Jahren 800 Tablets an – aber keine einzige Stunde Fortbildung, wie man damit sinnvoll unterrichtet. Ein halbes Jahr lang verstaubten die Koffer im Keller. Und niemand hatte an die Wartung gedacht: Ich bin Mathematiklehrer und nebenbei unbezahlter Techniker für 800 Geräte. Was mich an der Debatte stört, ist ihre Schieflage: Diskutiert wird über Endgeräte, nicht über Unterricht.",
      },
      {
        speaker: "Doktor Kaya",
        text: "Das bestätigen unsere Daten. Der stärkste Einzelfaktor war nicht die Zahl der Geräte, sondern die Zahl der Fortbildungsstunden pro Lehrkraft. Überspitzt gesagt: Ein Euro für Fortbildung bringt mehr Lernwirkung als drei Euro für Hardware.",
      },
      {
        speaker: "Herr Brandt",
        text: "Wobei ich die Geräte nicht verteufeln möchte. Wenn meine Schüler Messdaten im Physikunterricht selbst auswerten oder ein Erklärvideo für die Parallelklasse produzieren, passiert genau das, was Unterricht soll: Sie denken selbst. Das Tablet ist dann Werkzeug – nicht Belohnung und nicht Babysitter.",
      },
      {
        speaker: "Moderator",
        text: "Technik folgt dem Konzept, nicht umgekehrt – das scheint mir das Fazit dieser Runde. Vielen Dank Ihnen beiden.",
      },
    ],
    questions: [
      {
        text: "Was ist das zentrale Ergebnis der Studie von Doktor Kaya?",
        options: [
          "Tablets verbessern die Leistungen unabhängig vom Unterrichtskonzept.",
          "Lernzuwächse gab es nur an Schulen, die zuerst ein didaktisches Konzept entwickelten und dann die Technik anschafften.",
          "Digitale Geräte verschlechtern die Leistungen in allen Fächern erheblich.",
        ],
        answer: 1,
        explain: "Kaya'nın vurgusu: „Die Reihenfolge ist entscheidend“ — önce konsept, sonra teknoloji. Üçüncü şık aşırı genelleme: gerileme yalnızca matematikte ve „teilweise … leicht“.",
      },
      {
        text: "Welche Probleme schildert Herr Brandt aus seiner Schule?",
        options: [
          "Fehlende Fortbildung und ungeklärte Wartung der Geräte.",
          "Die Schüler lehnten die Arbeit mit den Tablets mehrheitlich ab.",
          "Die Schule erhielt deutlich weniger Geräte als zugesagt.",
        ],
        answer: 0,
        explain: "Brandt somut anlatıyor: 800 tablet geldi ama „keine einzige Stunde Fortbildung“; bakım da düşünülmemiş — kendisi ücretsiz teknisyene dönüşmüş.",
      },
      {
        text: "Laut Kaya bringt ein Euro für Fortbildung mehr Lernwirkung als drei Euro für Hardware.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Kaya bunu „überspitzt gesagt“ (bilerek keskinleştirilmiş) formülüyle söylüyor; en güçlü tekil faktör cihaz sayısı değil, öğretmen başına hizmet içi eğitim saati.",
      },
      {
        text: "Herr Brandt lehnt den Einsatz von Tablets im Unterricht grundsätzlich ab.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Wobei ich die Geräte nicht verteufeln möchte“ — fizik verisi değerlendirme ve açıklayıcı video örnekleriyle tableti savunuyor; itirazı araca değil, konseptsiz kullanıma.",
      },
      {
        text: "Welches Fazit zieht der Moderator am Ende?",
        options: [
          "Die Schulen brauchen vor allem mehr und neuere Endgeräte.",
          "Technik folgt dem Konzept, nicht umgekehrt.",
          "Der Digitalpakt sollte beendet werden.",
        ],
        answer: 1,
        explain: "Kapanış cümlesi birebir: „Technik folgt dem Konzept, nicht umgekehrt – das scheint mir das Fazit dieser Runde.“",
      },
    ],
  },

  // --------------------------------------------------------------- YAZMA
  {
    id: "c1-l7",
    level: "C1",
    skill: "listening",
    title: "Redaktionsgespräch",
    genre: "Toplantı",
    intro:
      "Hikâyenin devamı: yayınevinde çeviri tartışması masaya yatırılıyor. Kimin hangi çıkarı savunduğunu izle.",
    gloss: [
      { de: "die Auflage", tr: "baskı", en: "edition" },
      { de: "die Erwiderung", tr: "yanıt", en: "response" },
      { de: "die Deutungshoheit", tr: "yorum tekeli", en: "interpretive authority" },
      { de: "eskalieren", tr: "çığırından çıkmak", en: "to escalate" },
      { de: "die Fußnote", tr: "dipnot", en: "footnote" },
      { de: "aussitzen", tr: "geçmesini beklemek", en: "to sit out" },
      { de: "der Imageschaden", tr: "itibar zararı", en: "reputational damage" },
      { de: "einlenken", tr: "geri adım atmak", en: "to relent" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Programmleiter",
        text: "Wir haben drei Optionen: schweigen, eine kurze Erwiderung, oder Miriam schreibt selbst. Ich bin für Option eins. In vier Wochen redet niemand mehr darüber.",
      },
      {
        speaker: "Presse",
        text: "Das halte ich für falsch. Aussitzen funktioniert, wenn niemand nachlegt. Hier legen drei Feuilletons nach, und zwei davon haben Miriam gar nicht gelesen — die zitieren einander.",
      },
      { speaker: "Miriam", text: "Und einer von ihnen hat recht." },
      { speaker: "Programmleiter", text: "In welchem Punkt?" },
      {
        speaker: "Miriam",
        text: "Bei den Kürzungen. Ich habe in drei Kapiteln lange Sätze zerlegt. Das war eine Entscheidung über den Text hinweg, und sie war falsch.",
      },
      {
        speaker: "Programmleiter",
        text: "Wenn wir das zugeben, ist die Schlagzeile morgen: „Verlag räumt Fehler ein.“",
      },
      {
        speaker: "Presse",
        text: "Und wenn wir es nicht zugeben, ist die Schlagzeile in drei Wochen: „Verlag wusste davon.“ Die zweite ist teurer.",
      },
      {
        speaker: "Miriam",
        text: "Mir geht es nicht um die Schlagzeile. Wenn die zweite Auflage die Stellen korrigiert und wir die Liste veröffentlichen, ist es kein Eingeständnis, sondern Arbeit. So lesen es die Leute, die den Text kennen.",
      },
      {
        speaker: "Programmleiter",
        text: "Und der andere Vorwurf? Dass Sie das Buch nicht hätten übersetzen sollen?",
      },
      {
        speaker: "Miriam",
        text: "Dem widerspreche ich, und zwar öffentlich. Aber getrennt. Wenn ich beides in einem Text verteidige, klingt das Zugeständnis wie eine Taktik.",
      },
      { speaker: "Presse", text: "Damit kann ich arbeiten." },
      { speaker: "Programmleiter", text: "Gut. Dann Option drei — aber der Text geht vorher über meinen Tisch." },
    ],
    questions: [
      {
        text: "Welche Option bevorzugt der Programmleiter zunächst?",
        options: ["Schweigen", "Eine kurze Erwiderung", "Miriams eigenen Text"],
        answer: 0,
        explain: "„In vier Wochen redet niemand mehr darüber.“",
      },
      {
        text: "Womit begründet die Pressestelle ihren Widerspruch?",
        options: [
          "Drei Feuilletons legen nach und zitieren einander",
          "Der Verlag hat versprochen zu antworten",
          "Die Autorin verlangt es",
        ],
        answer: 0,
        explain: "Aussitzen ancak kimse üstüne gitmiyorsa işe yarar.",
      },
      {
        text: "In welchem Punkt gibt Miriam der Kritik recht?",
        options: [
          "Bei den Kürzungen langer Sätze",
          "Bei der Wahl des Buches",
          "Bei der Übersetzung des Titels",
        ],
        answer: 0,
        explain: "Üç bölümde uzun cümleleri parçalamış.",
      },
      {
        text: "Welches Argument der Pressestelle überzeugt am Ende?",
        options: [
          "Die spätere Schlagzeile wäre teurer als die heutige",
          "Der Verlag würde verklagt",
          "Die Buchhandlungen drohen",
        ],
        answer: 0,
        explain: "„Verlag wusste davon“ manşeti, „Verlag räumt Fehler ein“den pahalı.",
      },
      {
        text: "Warum will Miriam beide Punkte getrennt behandeln?",
        options: [
          "Sonst klingt das Zugeständnis wie eine Taktik",
          "Der Verlag verlangt es",
          "Zwei Texte bringen mehr Aufmerksamkeit",
        ],
        answer: 0,
        explain: "Kabul ile itirazı aynı metinde birleştirmek ikisini de zayıflatır.",
      },
    ],
  },
  {
    id: "c1-l8",
    level: "C1",
    skill: "listening",
    title: "Vortrag: Warum Übersetzungen altern",
    genre: "Konferans",
    intro:
      "Neden orijinal eskimezken çevirisi eskir? Edebiyat üzerine bir konuşma — tezin nasıl kurulduğuna dikkat et.",
    gloss: [
      { de: "altern", tr: "eskimek", en: "to age" },
      { de: "die Norm", tr: "norm", en: "norm" },
      { de: "der Zeitgeschmack", tr: "dönemin beğenisi", en: "taste of the era" },
      { de: "die Vorlage", tr: "şablon", en: "template" },
      { de: "die Instanz", tr: "merci", en: "authority" },
      { de: "verankert", tr: "sabitlenmiş", en: "anchored" },
      { de: "die Neuübersetzung", tr: "yeni çeviri", en: "retranslation" },
      { de: "unweigerlich", tr: "kaçınılmaz olarak", en: "inevitably" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Referent",
        text: "Es gibt eine Beobachtung, die jede Leserin gemacht hat und die trotzdem selten erklärt wird: Originale altern langsamer als ihre Übersetzungen. Ein Roman von 1890 wirkt alt, aber stimmig. Seine Übersetzung von 1955 wirkt oft einfach falsch.",
      },
      {
        speaker: "Referent",
        text: "Die übliche Erklärung lautet: Sprache verändert sich. Das ist richtig und erklärt zu wenig. Denn die Sprache des Originals verändert sich ebenso — nur hat das Original eine Instanz, die die Übersetzung nicht hat: Es ist selbst der Maßstab. Ein alter Satz von Fontane ist nicht veraltet, er ist Fontane.",
      },
      {
        speaker: "Referent",
        text: "Eine Übersetzung dagegen ist immer auch ein Dokument ihrer eigenen Zeit. Sie enthält nicht nur den fremden Text, sondern die Vorstellung ihrer Epoche davon, wie Literatur zu klingen hat. Die Nachkriegsübersetzungen sind glatter, höflicher, moralisch eindeutiger als ihre Originale — nicht aus Unfähigkeit, sondern weil der Zeitgeschmack im Text verankert wurde.",
      },
      {
        speaker: "Referent",
        text: "Daraus folgt, dass jede Übersetzung zwei Alterungsprozesse durchläuft: den der Sprache und den der Normen. Der zweite ist der schnellere.",
      },
      {
        speaker: "Referent",
        text: "Das erklärt auch, warum Neuübersetzungen selten „genauer“ sind, wie oft behauptet wird. Sie sind anders falsch — nach unseren Maßstäben besser, für spätere Leser genauso datiert. Wer eine Neuübersetzung als endgültig verkauft, hat den eigenen Befund nicht verstanden.",
      },
      {
        speaker: "Referent",
        text: "Ich schließe mit einer Einschränkung. Alles Gesagte gilt für Prosa. Bei Lyrik verhält es sich anders, und bei Gebrauchstexten gar nicht — eine Bedienungsanleitung altert nicht, sie wird ungültig. Wer meine These prüfen will, prüfe sie am Roman.",
      },
    ],
    questions: [
      {
        text: "Welche Beobachtung steht am Anfang?",
        options: [
          "Originale altern langsamer als ihre Übersetzungen",
          "Alte Bücher werden weniger gelesen",
          "Übersetzungen sind ungenauer geworden",
        ],
        answer: 0,
        explain: "1890 romanı eski ama tutarlı; 1955 çevirisi çoğu zaman yanlış hissettirir.",
      },
      {
        text: "Warum reicht „Sprache verändert sich“ als Erklärung nicht?",
        options: [
          "Das Original ist selbst der Maßstab",
          "Sprache verändert sich kaum",
          "Übersetzungen werden öfter überarbeitet",
        ],
        answer: 0,
        explain: "„Ein alter Satz von Fontane ist nicht veraltet, er ist Fontane.“",
      },
      {
        text: "Was enthält eine Übersetzung laut Vortrag zusätzlich?",
        options: [
          "Die Vorstellung ihrer Epoche davon, wie Literatur klingen soll",
          "Die Biografie der Übersetzerin",
          "Die Fehler des Originals",
        ],
        answer: 0,
        explain: "Savaş sonrası çeviriler daha pürüzsüz ve ahlaken daha netti.",
      },
      {
        text: "Welcher der beiden Alterungsprozesse ist schneller?",
        options: ["Der der Normen", "Der der Sprache", "Beide gleich"],
        answer: 0,
        explain: "Metin bunu açıkça söylüyor.",
      },
      {
        text: "Was folgt daraus für Neuübersetzungen?",
        options: [
          "Sie sind anders falsch, nicht endgültig genauer",
          "Sie sind objektiv genauer",
          "Sie sind überflüssig",
        ],
        answer: 0,
        explain: "Sonraki okurlar için onlar da tarihli olacak.",
      },
      {
        text: "Welche Einschränkung nennt der Referent?",
        options: [
          "Die These gilt für Prosa, nicht für Lyrik oder Gebrauchstexte",
          "Sie gilt nur für das Deutsche",
          "Sie gilt nur bis 1960",
        ],
        answer: 0,
        explain: "„eine Bedienungsanleitung altert nicht, sie wird ungültig.“",
      },
    ],
  },
  {
    id: "c1-l9",
    level: "C1",
    skill: "listening",
    title: "Podiumsdiskussion: Wem gehört die Stadt?",
    genre: "Sınav formatı",
    intro:
      "C1 dinleme sınavının uzun formatı: üç konuşmacı, kısmen örtüşen görüşler. Kimin neyi kabul edip neyi reddettiğini ayır.",
    gloss: [
      { de: "der Leerstand", tr: "boş kalma", en: "vacancy" },
      { de: "die Enteignung", tr: "kamulaştırma", en: "expropriation" },
      { de: "die Rendite", tr: "getiri", en: "yield" },
      { de: "der Bestand", tr: "konut stoku", en: "housing stock" },
      { de: "die Nachverdichtung", tr: "kentsel yoğunlaştırma", en: "infill development" },
      { de: "der Anreiz", tr: "teşvik", en: "incentive" },
      { de: "regulieren", tr: "düzenlemek", en: "to regulate" },
      { de: "die Umsetzung", tr: "uygulama", en: "implementation" },
    ],
    minutes: 7,
    segments: [
      {
        speaker: "Moderatorin",
        text: "Frau Kowal, Sie fordern strengere Regeln für Vermieter. Was genau?",
      },
      {
        speaker: "Kowal",
        text: "Zwei Dinge. Erstens ein wirksames Verbot von Leerstand über sechs Monate — mit Bußgeldern, die weh tun. Zweitens eine Obergrenze bei Neuvermietung, nicht nur bei bestehenden Verträgen. Ohne das zweite ist das erste wirkungslos.",
      },
      { speaker: "Moderatorin", text: "Herr Brandt?" },
      {
        speaker: "Brandt",
        text: "Beim Leerstand bin ich sofort dabei. Wer eine Wohnung jahrelang leer stehen lässt, spekuliert, und dafür gibt es kein Argument. Bei der Obergrenze halte ich es für einen Fehler: Sie senkt die Rendite genau dort, wo wir Investitionen brauchen, nämlich im Bestand.",
      },
      {
        speaker: "Kowal",
        text: "Das ist das Standardargument, und es wird seit fünfzehn Jahren durch die Praxis nicht bestätigt. Saniert wird dort, wo man die Kosten weitergeben kann — nicht dort, wo es nötig ist.",
      },
      {
        speaker: "Moderatorin",
        text: "Frau Demir, Sie forschen dazu. Wer hat recht?",
      },
      {
        speaker: "Demir",
        text: "Beide teilweise, was unbefriedigend klingt, aber der Datenlage entspricht. Mietobergrenzen wirken kurzfristig und zuverlässig für die, die drin wohnen. Sie senken mittelfristig die Zahl der angebotenen Wohnungen, und zwar messbar. Die eigentliche Frage ist deshalb nicht ob, sondern wie lange und mit welcher Begleitmaßnahme.",
      },
      { speaker: "Brandt", text: "Das ist der Punkt: Es wird nie eine Begleitmaßnahme beschlossen." },
      {
        speaker: "Demir",
        text: "Da stimme ich Ihnen zu. In fast allen Fällen, die ich untersucht habe, wurde reguliert und nicht gebaut. Das ist aber ein politisches Versäumnis, kein ökonomisches Gesetz.",
      },
      {
        speaker: "Kowal",
        text: "Damit kann ich leben. Regulierung plus Neubau — nur eben nicht Neubau als Ausrede, um zwanzig Jahre nichts zu tun.",
      },
    ],
    questions: [
      {
        text: "Was fordert Frau Kowal?",
        options: [
          "Leerstandsverbot und Obergrenze auch bei Neuvermietung",
          "Nur ein Leerstandsverbot",
          "Enteignung großer Vermieter",
        ],
        answer: 0,
        explain: "İkincisi olmadan birincinin etkisiz kalacağını söylüyor.",
      },
      {
        text: "Worin stimmt Herr Brandt ihr zu?",
        options: ["Beim Leerstand", "Bei der Obergrenze", "In nichts"],
        answer: 0,
        explain: "„Wer eine Wohnung jahrelang leer stehen lässt, spekuliert.“",
      },
      {
        text: "Wie kontert Kowal sein Renditeargument?",
        options: [
          "Saniert werde dort, wo man Kosten weitergeben kann — nicht wo es nötig ist",
          "Renditen seien unwichtig",
          "Investoren zahlten zu wenig Steuern",
        ],
        answer: 0,
        explain: "On beş yıllık pratiğin argümanı doğrulamadığını söylüyor.",
      },
      {
        text: "Was sagt die Forscherin zur Wirkung von Obergrenzen?",
        options: [
          "Kurzfristig wirksam für Mieter, mittelfristig weniger Angebot",
          "Sie wirken gar nicht",
          "Sie wirken dauerhaft positiv",
        ],
        answer: 0,
        explain: "Bu yüzden soru „olsun mu“ değil, „ne kadar süreyle ve neyle birlikte“.",
      },
      {
        text: "Worin sind sich Demir und Brandt einig?",
        options: [
          "Begleitmaßnahmen werden praktisch nie beschlossen",
          "Obergrenzen sind ökonomisch falsch",
          "Der Neubau ist Nebensache",
        ],
        answer: 0,
        explain: "Demir bunu „politisches Versäumnis, kein ökonomisches Gesetz“ diye niteliyor.",
      },
      {
        text: "Wie endet Kowals Beitrag?",
        options: [
          "Regulierung plus Neubau — Neubau aber nicht als Ausrede",
          "Sie zieht ihre Forderung zurück",
          "Sie fordert Enteignung",
        ],
        answer: 0,
        explain: "Kısmi bir uzlaşma ama uyarısıyla birlikte.",
      },
    ],
  },
  {
    id: "c1-l10",
    level: "C1",
    skill: "listening",
    title: "Verhandlung mit dem Verlag",
    genre: "Görüşme",
    intro:
      "Serbest çalışanın en zor konuşması: telif ve koşullar. Miriam sonraki kitap için pazarlık ediyor.",
    gloss: [
      { de: "das Honorar", tr: "telif ücreti", en: "fee" },
      { de: "die Beteiligung", tr: "pay", en: "share" },
      { de: "die Normseite", tr: "standart sayfa", en: "standard page", note: "Yayıncılıkta ücret hesabı için kullanılan sabit uzunlukta sayfa." },
      { de: "die Nennung", tr: "adının anılması", en: "credit" },
      { de: "der Vorschuss", tr: "avans", en: "advance" },
      { de: "die Klausel", tr: "sözleşme maddesi", en: "clause" },
      { de: "nachverhandeln", tr: "yeniden pazarlık etmek", en: "to renegotiate" },
      { de: "das Zugeständnis", tr: "taviz", en: "concession" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Verlag", text: "Wir bieten 24 Euro pro Normseite. Das ist unser Standard." },
      {
        speaker: "Miriam",
        text: "Für einen Text dieser Schwierigkeit ist das zu wenig. 28 wären angemessen. Und ich möchte über die Beteiligung sprechen.",
      },
      { speaker: "Verlag", text: "Eine Beteiligung geben wir erst ab 5.000 verkauften Exemplaren." },
      {
        speaker: "Miriam",
        text: "Das letzte Buch hat 9.000 verkauft. Die Schwelle ist also nicht das Problem — die Frage ist der Satz danach.",
      },
      { speaker: "Verlag", text: "0,5 Prozent." },
      {
        speaker: "Miriam",
        text: "Üblich ist ein Prozent, und bei diesem Titel bringe ich die Debatte mit. Das ist Aufmerksamkeit, für die Sie sonst zahlen müssten.",
      },
      { speaker: "Verlag", text: "Die Debatte war nicht ausschließlich angenehm." },
      {
        speaker: "Miriam",
        text: "Nein. Aber Sie haben die zweite Auflage verkauft, nicht trotz ihr.",
      },
      {
        speaker: "Verlag",
        text: "Ich kann 26 und 0,75 Prozent. Beim Vorschuss bleiben wir bei der Hälfte bei Vertragsschluss.",
      },
      {
        speaker: "Miriam",
        text: "Einverstanden — unter einer Bedingung: Mein Name kommt aufs Cover, nicht nur ins Impressum. Das kostet Sie nichts.",
      },
      {
        speaker: "Verlag",
        text: "Es kostet uns eine Diskussion mit der Gestaltung. Aber gut. Aufs Cover.",
      },
      { speaker: "Miriam", text: "Dann sind wir uns einig." },
    ],
    questions: [
      {
        text: "Was fordert Miriam beim Seitenhonorar?",
        options: ["28 statt 24 Euro", "24 statt 28 Euro", "30 Euro"],
        answer: 0,
        explain: "Metnin zorluk derecesini gerekçe gösteriyor.",
      },
      {
        text: "Warum ist die Schwelle von 5.000 Exemplaren für sie kein Problem?",
        options: [
          "Das letzte Buch verkaufte 9.000",
          "Die Schwelle gilt nicht für Übersetzungen",
          "Der Verlag hat sie gestrichen",
        ],
        answer: 0,
        explain: "Asıl mesele eşik değil, sonrasındaki oran.",
      },
      {
        text: "Wie argumentiert sie für einen höheren Satz?",
        options: [
          "Sie bringt Aufmerksamkeit mit, für die der Verlag sonst zahlen müsste",
          "Andere Verlage zahlen mehr",
          "Sie hat wenig Zeit",
        ],
        answer: 0,
        explain: "Tartışmanın kendisini bir değer olarak öne sürüyor.",
      },
      {
        text: "Wie kontert sie den Einwand zur Debatte?",
        options: [
          "Die zweite Auflage wurde nicht trotz ihr verkauft",
          "Die Debatte sei vorbei",
          "Der Verlag habe sie verursacht",
        ],
        answer: 0,
        explain: "Tek cümlelik ve etkili bir karşılık.",
      },
      {
        text: "Worauf einigen sie sich?",
        options: [
          "26 Euro, 0,75 Prozent, Name auf dem Cover",
          "28 Euro und ein Prozent",
          "24 Euro und Cover-Nennung",
        ],
        answer: 0,
        explain: "Avans koşulu değişmiyor.",
      },
      {
        text: "Warum ist die Cover-Forderung verhandlungstaktisch klug?",
        options: [
          "Sie kostet den Verlag kein Geld",
          "Sie ist gesetzlich vorgeschrieben",
          "Sie ersetzt die Beteiligung",
        ],
        answer: 0,
        explain: "„Das kostet Sie nichts“ — parasal olmayan taviz kolay verilir.",
      },
    ],
  },
  {
    id: "c1-l11",
    level: "C1",
    skill: "listening",
    title: "Podcast: Humor auf Deutsch",
    genre: "Podcast",
    intro:
      "„Almanların mizah anlayışı yok“ klişesi. Bir dilbilimci bunun neden bir çeviri sorunu olduğunu anlatıyor.",
    gloss: [
      { de: "der Humor", tr: "espri anlayışı", en: "sense of humor" },
      { de: "die Ironie", tr: "ironi", en: "irony" },
      { de: "die Untertreibung", tr: "hafife alma", en: "understatement" },
      { de: "das Wortspiel", tr: "kelime oyunu", en: "pun" },
      { de: "eindeutig", tr: "tek anlamlı", en: "unambiguous" },
      { de: "die Pointe", tr: "espri noktası", en: "punchline" },
      { de: "die Verzögerung", tr: "gecikme", en: "delay" },
      { de: "das Vorurteil", tr: "önyargı", en: "prejudice" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Host",
        text: "Das Klischee ist international: Deutsche haben keinen Humor. Woher kommt das?",
      },
      {
        speaker: "Linguistin",
        text: "Zum großen Teil aus der Struktur der Sprache — und aus dem Englischen als Vergleichsmaßstab. Britischer Humor lebt von Untertreibung und davon, dass man am Ende eines Satzes noch nicht weiß, wohin er läuft. Das Deutsche stellt das Verb oft ans Ende oder trennt es. Der Satz ist erst spät entschieden, aber wenn er entschieden ist, ist er eindeutig.",
      },
      { speaker: "Host", text: "Das klingt eher nach einem Vorteil für Pointen." },
      {
        speaker: "Linguistin",
        text: "Für die Pointe ja. Für die Ironie nein. Ironie braucht Mehrdeutigkeit, die stehen bleibt. Ein deutscher Satz erzwingt Klarheit — deshalb wird Ironie im Deutschen häufiger markiert, durch Ton, durch Partikeln, notfalls durch ein „ironisch gemeint“. Was markiert ist, wirkt weniger elegant.",
      },
      {
        speaker: "Host",
        text: "Und die Partikeln? „doch“, „mal“, „eben“ …",
      },
      {
        speaker: "Linguistin",
        text: "Das ist das eigentlich Komische am Klischee. Das Deutsche hat eines der feinsten Systeme, um Haltung in einen Satz zu legen — genau das, was Humor braucht. „Das hast du ja toll gemacht“ ist ohne „ja“ ein Lob. Nur überlebt das keine Übersetzung. Wer Deutsche auf Englisch erlebt, erlebt sie ohne ihre Werkzeuge.",
      },
      {
        speaker: "Host",
        text: "Also ein Übersetzungsproblem, kein Charakterproblem.",
      },
      {
        speaker: "Linguistin",
        text: "Weitgehend, ja. Wobei ich eine Sache einräume: Es gibt eine Vorliebe für Wortspiele, die anderswo als schwach gilt. Kalauer haben hier eine Toleranz, die ich selbst nicht ganz erklären kann.",
      },
    ],
    questions: [
      {
        text: "Woraus erklärt die Linguistin das Klischee?",
        options: [
          "Aus der Satzstruktur und aus dem Englischen als Maßstab",
          "Aus der Geschichte",
          "Aus dem Bildungssystem",
        ],
        answer: 0,
        explain: "İki nedeni birlikte veriyor.",
      },
      {
        text: "Was ist am deutschen Satzbau günstig für Pointen?",
        options: [
          "Der Satz entscheidet sich spät",
          "Der Satz ist immer kurz",
          "Das Verb steht vorn",
        ],
        answer: 0,
        explain: "Fiilin sonda olması ya da ayrılması gecikmeyi sağlıyor.",
      },
      {
        text: "Warum ist derselbe Zug für Ironie ungünstig?",
        options: [
          "Ironie braucht bleibende Mehrdeutigkeit, das Deutsche erzwingt Klarheit",
          "Ironie ist im Deutschen verboten",
          "Es gibt keine ironischen Wörter",
        ],
        answer: 0,
        explain: "Bu yüzden ironi işaretlenmek zorunda kalıyor ve zarafetini yitiriyor.",
      },
      {
        text: "Was nennt sie das eigentlich Komische am Klischee?",
        options: [
          "Das Deutsche hat mit Partikeln ein besonders feines Werkzeug für Haltung",
          "Deutsche lachen mehr als andere",
          "Das Klischee stammt aus Deutschland selbst",
        ],
        answer: 0,
        explain: "„Das hast du ja toll gemacht“ örneği bunu gösteriyor.",
      },
      {
        text: "Was passiert bei der Übersetzung ins Englische?",
        options: [
          "Die Werkzeuge gehen verloren",
          "Der Humor wird verstärkt",
          "Die Pointen werden klarer",
        ],
        answer: 0,
        explain: "„Wer Deutsche auf Englisch erlebt, erlebt sie ohne ihre Werkzeuge.“",
      },
      {
        text: "Was räumt sie am Ende ein?",
        options: [
          "Eine schwer erklärbare Toleranz für Kalauer",
          "Dass das Klischee ganz stimmt",
          "Dass Ironie hier fehlt",
        ],
        answer: 0,
        explain: "Kendi de tam açıklayamadığını söylüyor — dürüst bir sınır.",
      },
    ],
  },
  {
    id: "c1-l12",
    level: "C1",
    skill: "listening",
    title: "Die Preisrede",
    genre: "Konuşma",
    intro:
      "Hikâyenin sonu: Miriam çeviri ödülü alıyor. Bir teşekkür konuşmasının nasıl kurulduğunu ve nerede risk aldığını dinle.",
    gloss: [
      { de: "die Preisrede", tr: "ödül konuşması", en: "acceptance speech" },
      { de: "die Jury", tr: "jüri", en: "jury" },
      { de: "verdanken", tr: "borçlu olmak", en: "to owe" },
      { de: "die Sichtbarkeit", tr: "görünürlük", en: "visibility" },
      { de: "die Zumutung", tr: "eziyet", en: "imposition" },
      { de: "der Anlass", tr: "vesile", en: "occasion" },
      { de: "beharren", tr: "ısrar etmek", en: "to insist" },
      { de: "die Genugtuung", tr: "tatmin", en: "satisfaction" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Miriam",
        text: "Vielen Dank. Ich habe lange überlegt, ob ich diesen Preis annehmen kann, und ich will offen sagen, warum.",
      },
      {
        speaker: "Miriam",
        text: "Vor einem Jahr wurde mir öffentlich vorgeworfen, dieses Buch nicht übersetzen zu dürfen. Ein Teil dieser Kritik war unfair, und ein Teil war richtig. Wenn ich heute hier stehe und nur den fairen Teil erwähne, mache ich es mir zu leicht.",
      },
      {
        speaker: "Miriam",
        text: "Der richtige Teil lautete: Ich habe an drei Stellen geglättet, weil ich dem deutschen Publikum weniger zugetraut habe, als es verdient. Das ist ein Fehler, den man nicht mit Können erklären kann, sondern nur mit Vorsicht. Ich habe ihn korrigiert, und die Liste der Korrekturen ist veröffentlicht. Ich sage das hier, weil ein Preis der schlechteste Moment ist, um so etwas zu verschweigen.",
      },
      {
        speaker: "Miriam",
        text: "Der unfaire Teil lautete: Wer bestimmte Erfahrungen nicht gemacht hat, soll schweigen. Dem widerspreche ich weiterhin. Übersetzung ist keine Vertretung. Sie ist der Versuch, jemanden hörbar zu machen, der ohne sie nicht gehört würde — und dieser Versuch ist immer ein Eingriff. Wer das nicht aushält, sollte keine Bücher übersetzen. Wer es nicht bemerkt, erst recht nicht.",
      },
      {
        speaker: "Miriam",
        text: "Ich danke der Jury dafür, dass sie ein Buch ausgezeichnet hat, über das gestritten wurde. Das ist mutiger, als es klingt: Es wäre leichter gewesen, einen unstrittigen Titel zu wählen.",
      },
      {
        speaker: "Miriam",
        text: "Und ich danke einer Person, die heute nicht hier sein kann, weil sie 2019 gestorben ist. Sie hat den Roman geschrieben, für den ich hier stehe. Der Preis gehört ihr. Ich habe ihn nur ins Deutsche gebracht.",
      },
    ],
    questions: [
      {
        text: "Warum hat Miriam überlegt, ob sie den Preis annehmen kann?",
        options: [
          "Wegen der öffentlichen Kritik am Buch",
          "Wegen des Preisgeldes",
          "Wegen der Jury",
        ],
        answer: 0,
        explain: "Konuşmayı bu soruyla açıyor.",
      },
      {
        text: "Wie teilt sie die Kritik auf?",
        options: [
          "In einen fairen und einen unfairen Teil",
          "In eine literarische und eine politische",
          "In eine alte und eine neue",
        ],
        answer: 0,
        explain: "Ve yalnızca birine değinmenin işi kolaylaştırmak olacağını söylüyor.",
      },
      {
        text: "Womit erklärt sie ihren Fehler?",
        options: [
          "Mit Vorsicht, nicht mit fehlendem Können",
          "Mit Zeitdruck",
          "Mit dem Verlag",
        ],
        answer: 0,
        explain: "Alman okura hak ettiğinden azını yakıştırmış.",
      },
      {
        text: "Warum sagt sie das ausgerechnet bei der Preisverleihung?",
        options: [
          "Ein Preis ist der schlechteste Moment, so etwas zu verschweigen",
          "Die Jury hat es verlangt",
          "Der Verlag wollte es",
        ],
        answer: 0,
        explain: "Cümleyi kendisi böyle gerekçelendiriyor.",
      },
      {
        text: "Woran hält sie fest?",
        options: [
          "Übersetzung ist keine Vertretung",
          "Kritik schadet der Literatur",
          "Nur Muttersprachler sollten übersetzen",
        ],
        answer: 0,
        explain: "Adaletsiz bulduğu bölüme karşı çıkışını sürdürüyor.",
      },
      {
        text: "Wem widmet sie den Preis?",
        options: [
          "Der 2019 gestorbenen Autorin",
          "Der Jury",
          "Ihrem Verlag",
        ],
        answer: 0,
        explain: "„Der Preis gehört ihr. Ich habe ihn nur ins Deutsche gebracht.“",
      },
    ],
  },

  {
    id: "c1-w1",
    level: "C1",
    skill: "writing",
    title: "Grafikbeschreibung: Arbeiten im Homeoffice",
    genre: "Grafik yorumu",
    intro: "C1'in klasik görevi: bir grafiği akademik dille betimleyip yorumlayacaksın — önce iki kalıp cümle kur, sonra kompozisyonu yaz.",
    minutes: 14,
    gloss: [
      { de: "der Anteil", tr: "pay", en: "share" },
      { de: "sich verdreifachen", tr: "üç katına çıkmak", en: "to triple" },
      { de: "der Anstieg", tr: "artış", en: "increase" },
      { de: "etwas verzeichnen", tr: "kaydetmek", en: "to record" },
      { de: "die Erhebung", tr: "araştırma", en: "survey" },
      { de: "der Befragte", tr: "ankete katılan", en: "respondent" },
      { de: "etwas auf etwas zurückführen", tr: "bir şeye bağlamak", en: "to attribute" },
      { de: "die Vereinbarkeit", tr: "bağdaşabilirlik", en: "compatibility" },
      { de: "hervorgehen aus", tr: "anlaşılmak", en: "to emerge" },
      { de: "sich belaufen auf", tr: "ulaşmak", en: "to amount to" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Grafik, evden çalışanların payının 2019'dan bu yana üç katına çıktığını göstermektedir.",
        answer: "Die Grafik zeigt, dass sich der Anteil der im Homeoffice Arbeitenden seit 2019 verdreifacht hat.",
        hint: "Nominalleştirilmiş sıfat-fiil: „die im Homeoffice Arbeitenden“ = evden çalışanlar. „sich verdreifachen“ dönüşlü fiil, Perfekt'te „hat“ ile.",
      },
      {
        kind: "build",
        tr: "Bu gelişmenin nedenlerinden biri, pandemi sırasında dijital altyapının hızla genişletilmesidir.",
        answer: "Eine der Ursachen für diese Entwicklung ist der rasche Ausbau der digitalen Infrastruktur während der Pandemie.",
        alternatives: [
          "Der rasche Ausbau der digitalen Infrastruktur während der Pandemie ist eine der Ursachen für diese Entwicklung.",
        ],
        hint: "Nominalstil: fiil yerine isim — „der Ausbau der Infrastruktur“ (Genitiv zinciri). „eine der Ursachen“ + Genitiv çoğul kalıbını koru.",
      },
      {
        kind: "free",
        prompt: "Bir seminer ödevi için aşağıdaki anket verilerini yorumlayan kısa bir kompozisyon yaz: önce verileri betimle, sonra olası nedenleri tartış ve kendi değerlendirmenle bitir.",
        stimulus: "Erhebung des Instituts für Arbeitswelt (10.000 Befragte):\n\nAnteil der Beschäftigten, die mindestens teilweise im Homeoffice arbeiten: 2019: 13 Prozent — 2021: 31 Prozent — 2025: 39 Prozent.\n\nGewünschter Anteil laut Befragung 2025: 58 Prozent.\n\nHäufigste Gründe für den Wunsch: Wegfall des Arbeitswegs (71 Prozent), bessere Vereinbarkeit von Beruf und Familie (64 Prozent), konzentrierteres Arbeiten (48 Prozent).",
        checklist: [
          "Girişte grafiğin kaynağını, kapsamını ve konusunu tek cümlede tanıt",
          "En çarpıcı gelişmeyi sayılarla betimle (2019-2025 artışı, fiili ve arzu edilen oran arasındaki fark)",
          "En az iki olası neden tartış ve verideki gerekçelere bağla",
          "Kendi değerlendirmeni gerekçelendir (işveren-çalışan perspektifi, olası sakıncalar)",
          "Akademik register kullan: Nominalstil, „lässt sich“, „ist davon auszugehen“ gibi kalıplar",
        ],
        minWords: 130,
        phrases: [
          { de: "Aus der Grafik geht hervor, dass …", tr: "Grafikten anlaşılıyor ki …", en: "It emerges from the graph that …" },
          { de: "Ein deutlicher Anstieg ist zu verzeichnen.", tr: "Belirgin bir artış kaydediliyor.", en: "A clear increase can be observed." },
          { de: "Der Anteil beläuft sich auf …", tr: "Pay …'e ulaşıyor.", en: "The share amounts to …" },
          { de: "Im Vergleich zu 2019 …", tr: "2019'a kıyasla …", en: "Compared to 2019 …" },
          { de: "Dies lässt sich darauf zurückführen, dass …", tr: "Bu şuna bağlanabilir: …", en: "This can be attributed to the fact that …" },
          { de: "Auffällig ist die Diskrepanz zwischen …", tr: "… arasındaki fark dikkat çekici.", en: "The discrepancy between … is striking." },
          { de: "Es ist davon auszugehen, dass …", tr: "… olduğu varsayılabilir.", en: "It can be assumed that …" },
          { de: "Zusammenfassend lässt sich festhalten, dass …", tr: "Özetle şu saptanabilir: …", en: "In summary it can be stated that …" },
          { de: "Meines Erachtens …", tr: "Kanaatimce …", en: "In my view …" },
        ],
        sample: "Die vorliegende Erhebung des Instituts für Arbeitswelt, für die 10.000 Beschäftigte befragt wurden, dokumentiert die Entwicklung der Arbeit im Homeoffice zwischen 2019 und 2025.\n\nAus den Daten geht hervor, dass sich der Anteil der zumindest teilweise von zu Hause Arbeitenden in diesem Zeitraum verdreifacht hat: von 13 Prozent im Jahr 2019 auf 39 Prozent im Jahr 2025, wobei der stärkste Anstieg auf die Pandemiejahre entfällt. Auffällig ist die Diskrepanz zwischen tatsächlichem und gewünschtem Anteil – mit 58 Prozent würden deutlich mehr Beschäftigte gern mobil arbeiten, als es derzeit tun.\n\nDiese Entwicklung lässt sich zum einen auf den erzwungenen Digitalisierungsschub während der Pandemie zurückführen, der die technischen Voraussetzungen flächendeckend schuf. Zum anderen nennen die Befragten handfeste Gründe: der Wegfall des Arbeitswegs und die bessere Vereinbarkeit von Beruf und Familie stehen mit 71 beziehungsweise 64 Prozent an der Spitze.\n\nMeines Erachtens ist die Rückkehr zur reinen Präsenzkultur unwahrscheinlich. Allerdings sollten die Risiken – etwa die schleichende Entgrenzung von Arbeit und Privatleben – nicht ausgeblendet werden. Es ist davon auszugehen, dass hybride Modelle zum Normalfall werden; entscheidend wird sein, sie verbindlich und fair zu gestalten.",
      },
    ],
  },
  {
    id: "c1-w2",
    level: "C1",
    skill: "writing",
    title: "Formeller Widerspruch",
    genre: "Resmi itiraz",
    intro: "Haksız bir ücret talebine karşı resmi itiraz mektubu yazacaksın — kesin, mesafeli ve hukuki register burada her şey.",
    minutes: 13,
    gloss: [
      { de: "der Widerspruch", tr: "itiraz", en: "objection" },
      { de: "der Bescheid", tr: "resmi karar", en: "official decision" },
      { de: "fristgerecht", tr: "süresinde", en: "by the deadline" },
      { de: "die Erstattung", tr: "geri ödeme", en: "reimbursement" },
      { de: "die Teilnahmegebühr", tr: "katılım ücreti", en: "participation fee" },
      { de: "etwas aufheben", tr: "iptal etmek", en: "to revoke" },
      { de: "die Allgemeinen Geschäftsbedingungen", tr: "genel işlem koşulları", en: "general terms and conditions" },
      { de: "sich auf etwas berufen", tr: "bir şeye dayanmak", en: "to invoke" },
      { de: "rechtliche Schritte", tr: "hukuki yollar", en: "legal action" },
      { de: "die Anlage", tr: "ek", en: "attachment" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "İşbu yazıyla 3 Mayıs tarihli karara süresi içinde itiraz ediyorum.",
        answer: "Hiermit lege ich fristgerecht Widerspruch gegen den Bescheid vom dritten Mai ein.",
        alternatives: [
          "Hiermit lege ich gegen den Bescheid vom dritten Mai fristgerecht Widerspruch ein.",
        ],
        hint: "Resmi kalıp: „Widerspruch einlegen gegen“ + Akkusativ. „Hiermit“ mektubu açan tipik hukuk dili sinyali.",
      },
      {
        kind: "build",
        tr: "Görevli telefonda, ücretin iadesinin ne yazık ki mümkün olmadığını söyledi.",
        answer: "Der Sachbearbeiter erklärte am Telefon, eine Erstattung der Gebühr sei leider nicht möglich.",
        alternatives: [
          "Eine Erstattung der Gebühr sei leider nicht möglich, erklärte der Sachbearbeiter am Telefon.",
        ],
        hint: "Dolaylı aktarım Konjunktiv I ile: „sei“ (ist değil). İtiraz mektubunda karşı tarafın sözünü böyle aktarırsın.",
      },
      {
        kind: "free",
        prompt: "Kayıtlı olduğun „Wirtschaftsdeutsch C1“ kursu, halk eğitim merkezi tarafından ikinci haftada iptal edildi; buna rağmen 240 Euro'luk ücretin yalnızca yarısı iade edildi. Aşağıdaki yazıya resmi bir itiraz mektubu yaz: durumu özetle, tam iade talep et, gerekçelendir ve bir süre belirle.",
        stimulus: "Volkshochschule Neustadt, Bescheid vom 12. März:\n\nSehr geehrte Frau Aydın, der Kurs „Wirtschaftsdeutsch C1“ wurde aus organisatorischen Gründen nach der zweiten Woche eingestellt. Gemäß Abschnitt 7 unserer Allgemeinen Geschäftsbedingungen erstatten wir Ihnen 50 Prozent der Teilnahmegebühr, das heißt 120 Euro. Weitere Ansprüche bestehen nicht. Mit freundlichen Grüßen, Ihre Volkshochschule Neustadt",
        checklist: [
          "Konu satırı ve resmi hitapla başla; hangi karara itiraz ettiğini tarihiyle belirt",
          "Olayı tek paragrafta nesnel biçimde özetle (kursun iptali, kısmi iade)",
          "Talebini gerekçelendir: iptal senin kusurun değil, hizmetin büyük bölümü verilmedi",
          "Somut talep + süre koy (örn. 14 gün içinde kalan 120 Euro'nun iadesi)",
          "Mesafeli ama nazik kapanış: gerekirse hukuki yolları saklı tuttuğunu belirt",
        ],
        minWords: 120,
        phrases: [
          { de: "hiermit lege ich Widerspruch gegen … ein", tr: "işbu yazıyla …'e itiraz ediyorum", en: "I hereby lodge an objection against …" },
          { de: "ich beziehe mich auf Ihren Bescheid vom …", tr: "… tarihli kararınıza atıfta bulunuyorum", en: "I refer to your decision of …" },
          { de: "entgegen Ihrer Darstellung", tr: "beyanınızın aksine", en: "contrary to your account" },
          { de: "die Kündigung ist nicht von mir zu vertreten", tr: "fesih benim sorumluluğumda değil", en: "the termination is not my responsibility" },
          { de: "ich fordere Sie auf, … zu erstatten", tr: "…'i geri ödemenizi talep ediyorum", en: "I request you to reimburse …" },
          { de: "ich bitte Sie, den Bescheid aufzuheben", tr: "kararı iptal etmenizi rica ediyorum", en: "I ask you to revoke the decision" },
          { de: "innerhalb von 14 Tagen", tr: "14 gün içinde", en: "within 14 days" },
          { de: "andernfalls behalte ich mir rechtliche Schritte vor", tr: "aksi hâlde hukuki yollara başvurma hakkımı saklı tutarım", en: "otherwise I reserve the right to take legal action" },
          { de: "in der Anlage finden Sie …", tr: "ekte …'i bulabilirsiniz", en: "you will find … in the attachment" },
        ],
        sample: "Betreff: Widerspruch gegen Ihren Bescheid vom 12. März – Kurs „Wirtschaftsdeutsch C1“\n\nSehr geehrte Damen und Herren,\n\nhiermit lege ich fristgerecht Widerspruch gegen Ihren oben genannten Bescheid ein, mit dem Sie mir lediglich 50 Prozent der Teilnahmegebühr erstatten.\n\nZum Sachverhalt: Der Kurs, für den ich 240 Euro entrichtet habe, wurde nach nur zwei von zwölf Wochen aus organisatorischen Gründen eingestellt. Die Absage ist somit ausschließlich von Ihnen zu vertreten; mehr als achtzig Prozent der zugesagten Leistung wurden nie erbracht. Entgegen Ihrer Darstellung kann Abschnitt 7 Ihrer Allgemeinen Geschäftsbedingungen hier nicht greifen: Diese Klausel betrifft dem Wortlaut nach den Rücktritt der Teilnehmenden, nicht die Einstellung des Kurses durch den Anbieter. Eine pauschale Kürzung um die Hälfte steht zudem in keinem Verhältnis zum tatsächlich erbrachten Unterricht.\n\nIch fordere Sie daher auf, mir die verbleibenden 120 Euro innerhalb von 14 Tagen auf das Ihnen bekannte Konto zu erstatten. Sollte ich bis dahin keinen Zahlungseingang feststellen, behalte ich mir vor, rechtliche Schritte einzuleiten und die Verbraucherzentrale einzuschalten.\n\nIn der Anlage finden Sie die Anmeldebestätigung sowie den Zahlungsbeleg.\n\nMit freundlichen Grüßen\nElif Aydın",
      },
    ],
  },
  {
    id: "c1-w3",
    level: "C1",
    skill: "writing",
    title: "Erörterung: Künstliche Intelligenz im Studium",
    genre: "Tartışmalı deneme",
    intro: "C1 Schreiben'in kalbi: tartışmalı bir konuda tez-antitez-sentez kuran yapılandırılmış bir deneme yazacaksın.",
    minutes: 16,
    gloss: [
      { de: "die Erörterung", tr: "tartışma yazısı", en: "argumentative essay" },
      { de: "der Einsatz", tr: "kullanım", en: "use" },
      { de: "etwas aufwerfen", tr: "ortaya atmak", en: "to raise" },
      { de: "eigenständig", tr: "bağımsız", en: "independent" },
      { de: "die Schwächung", tr: "zayıflama", en: "weakening" },
      { de: "der Befürworter", tr: "savunucu", en: "advocate" },
      { de: "etwas ins Feld führen", tr: "öne sürmek", en: "to put forward" },
      { de: "einer Sache entgegenhalten", tr: "karşı çıkmak", en: "to counter" },
      { de: "etwas abwägen", tr: "tartmak", en: "to weigh up" },
      { de: "unter dem Strich", tr: "sonuç olarak", en: "on balance" },
      { de: "die Eigenleistung", tr: "kişisel katkı", en: "own contribution" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Yapay zekânın kullanımı, bilimsel yazmanın doğasına ilişkin temel sorular ortaya atmaktadır.",
        answer: "Der Einsatz künstlicher Intelligenz wirft grundlegende Fragen nach dem Wesen wissenschaftlichen Schreibens auf.",
        hint: "Nominalstil: „der Einsatz künstlicher Intelligenz“ (Genitiv, artikelsiz). Ayrılabilir fiil „aufwerfen“ — „wirft … auf“ çerçevesi.",
      },
      {
        kind: "build",
        tr: "Eleştirmenler, öğrencilerde bağımsız düşünmenin giderek zayıflamasından kaygı duymaktadır.",
        answer: "Kritiker befürchten eine allmähliche Schwächung des eigenständigen Denkens bei den Studierenden.",
        alternatives: [
          "Kritiker befürchten bei den Studierenden eine allmähliche Schwächung des eigenständigen Denkens.",
        ],
        hint: "Yan cümle yerine isimleştirme: „dass das Denken schwächer wird“ değil, „eine Schwächung des Denkens“ — C1 akademik üslubun imzası.",
      },
      {
        kind: "free",
        prompt: "Üniversitenin öğrenci dergisi için şu soruyu tartışan yapılandırılmış bir deneme yaz: „Sollten Studierende künstliche Intelligenz beim Verfassen von Hausarbeiten nutzen dürfen?“ Her iki tarafın argümanlarını tart, kendi konumunu gerekçelendir.",
        checklist: [
          "Girişte konunun güncelliğini ve tartışma sorusunu formüle et",
          "En az iki lehte argümanı örneklerle geliştir (verimlilik, dil desteği, gerçek çalışma hayatına hazırlık)",
          "En az iki aleyhte argümanı ciddiyetle ele al (Eigenleistung, düşünme becerisi, değerlendirme adaleti)",
          "Karşı argümanlara yanıt ver — çürüt ya da sınırla („dem ist entgegenzuhalten …“)",
          "Sonuçta net, gerekçeli ve nüanslı bir konum al; koşul veya öneri formüle et",
        ],
        minWords: 150,
        phrases: [
          { de: "Kaum eine Frage wird derzeit so kontrovers diskutiert wie …", tr: "Şu sıralar hiçbir soru … kadar çok tartışılmıyor.", en: "Hardly any question is currently discussed as controversially as …" },
          { de: "Befürworter führen ins Feld, dass …", tr: "Savunucular şunu öne sürüyor: …", en: "Advocates put forward the argument that …" },
          { de: "Es lässt sich nicht von der Hand weisen, dass …", tr: "… olduğu yadsınamaz.", en: "It cannot be denied that …" },
          { de: "Dem ist entgegenzuhalten, dass …", tr: "Buna karşı şu söylenmeli: …", en: "Against this it must be said that …" },
          { de: "Bei näherer Betrachtung zeigt sich, dass …", tr: "Daha yakından bakıldığında görülüyor ki …", en: "On closer inspection it becomes clear that …" },
          { de: "Zwar …, doch …", tr: "Gerçi …, ama …", en: "Admittedly …, but …" },
          { de: "Entscheidend ist letztlich, ob …", tr: "Sonuçta belirleyici olan … olup olmadığıdır.", en: "What ultimately matters is whether …" },
          { de: "Unter dem Strich überwiegen …", tr: "Sonuç olarak … ağır basıyor.", en: "On balance … prevail." },
          { de: "Daraus ergibt sich die Forderung, …", tr: "Buradan şu talep doğuyor: …", en: "From this arises the demand …" },
        ],
        sample: "Kaum eine Frage wird an den Hochschulen derzeit so kontrovers diskutiert wie der Umgang mit künstlicher Intelligenz: Dürfen Studierende sie beim Verfassen von Hausarbeiten nutzen – oder untergräbt das den Sinn des Studiums?\n\nBefürworter führen ins Feld, dass die Technologie längst zur beruflichen Realität gehört; ein Verbot bereite auf eine Arbeitswelt vor, die es nicht mehr gibt. Zudem wirken die Werkzeuge ausgleichend: Wer nicht in seiner Erstsprache studiert, erhält sprachliche Unterstützung, die früher teuren Lektoraten vorbehalten war.\n\nDem ist allerdings entgegenzuhalten, dass eine Hausarbeit kein Produkt, sondern eine Übung ist. Wer das Strukturieren von Argumenten vollständig delegiert, trainiert genau die Fähigkeit nicht, die das Studium vermitteln soll. Auch die Frage der Bewertungsgerechtigkeit wiegt schwer: Benotet würde sonst die Geschicklichkeit im Umgang mit dem Werkzeug, nicht die Eigenleistung.\n\nBei näherer Betrachtung erweist sich das Entweder-oder jedoch als Scheinalternative. Entscheidend ist nicht, ob die Technik genutzt wird, sondern wofür: Recherche und sprachliche Glättung sind legitim, die Auslagerung des Denkens ist es nicht. Unter dem Strich plädiere ich daher für eine Kennzeichnungspflicht statt eines Verbots – verbunden mit Prüfungsformen, etwa mündlichen Verteidigungen, in denen sich Eigenleistung nicht simulieren lässt.",
      },
    ],
  },
  {
    id: "c1-w4",
    level: "C1",
    skill: "writing",
    title: "Bewerbung um ein Stipendium",
    genre: "Başvuru mektubu",
    intro: "Bir değişim bursu için motivasyon mektubu yazacaksın — kendini övmeden ikna eden, resmi ama kişilikli bir metin.",
    minutes: 14,
    gloss: [
      { de: "die Ausschreibung", tr: "ilan", en: "call for applications" },
      { de: "sich um etwas bewerben", tr: "bir şeye başvurmak", en: "to apply for" },
      { de: "der Auslandsaufenthalt", tr: "yurt dışında kalış", en: "stay abroad" },
      { de: "die Vertiefung", tr: "derinleştirme", en: "deepening" },
      { de: "zu etwas beitragen", tr: "katkıda bulunmak", en: "to contribute" },
      { de: "die Voraussetzung", tr: "ön koşul", en: "prerequisite" },
      { de: "etwas nachweisen", tr: "belgelemek", en: "to prove" },
      { de: "das Vorhaben", tr: "plan", en: "plan" },
      { de: "die Förderung", tr: "destek", en: "funding" },
      { de: "zur Verfügung stehen", tr: "hazır bulunmak", en: "to be available" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "İlanınızda duyurulan burs için başvurumu sunmak isterim.",
        answer: "Hiermit möchte ich mich um das in Ihrer Ausschreibung angekündigte Stipendium bewerben.",
        hint: "Partizipialkonstruktion: „das in Ihrer Ausschreibung angekündigte Stipendium“ — ilişki cümlesi yerine sıfatlaşmış Partizip II. Fiil kalıbı: „sich bewerben um“.",
      },
      {
        kind: "build",
        tr: "Yurtdışında kalmak, dil yetkinliklerimin derinleşmesine önemli ölçüde katkı sağlayacaktır.",
        answer: "Ein Auslandsaufenthalt würde wesentlich zur Vertiefung meiner sprachlichen Kompetenzen beitragen.",
        hint: "„beitragen zu“ + isimleştirme: „zur Vertiefung meiner Kompetenzen“. Würde-formu burada kibar bir öngörü tonu katıyor.",
      },
      {
        kind: "free",
        prompt: "Aşağıdaki burs ilanına başvuran bir motivasyon mektubu yaz: motivasyonunu, akademik uygunluğunu ve dönüşte topluluğa nasıl katkı vereceğini somut örneklerle anlat.",
        stimulus: "Ausschreibung der Ida-Sommerfeld-Stiftung:\n\nDie Stiftung vergibt zum Wintersemester fünf Teilstipendien für ein Austauschsemester an einer deutschen Universität. Gefördert werden Studierende aller Fächer mit sehr guten Deutschkenntnissen, die ein klares Studienvorhaben verfolgen und bereit sind, nach ihrer Rückkehr ehrenamtlich in der Studienberatung der Stiftung mitzuwirken. Bewerbungen mit Motivationsschreiben richten Sie bitte an die Geschäftsstelle der Stiftung.",
        checklist: [
          "Resmi hitap ve ilk cümlede başvurunun konusu: hangi burs, hangi dönem",
          "Motivasyonunu somutlaştır: neden bu alan, neden Almanya, neden şimdi",
          "Uygunluğunu kanıtla: akademik başarı, dil düzeyi, önceki deneyimler — iddia değil örnek",
          "İlanın özel şartına yanıt ver: dönüşte öğrenci danışmanlığında gönüllü katkı",
          "Kendinden emin ama abartısız kapanış: görüşmeye hazır olduğunu belirt",
        ],
        minWords: 130,
        phrases: [
          { de: "mit großem Interesse habe ich Ihre Ausschreibung gelesen", tr: "ilanınızı büyük bir ilgiyle okudum", en: "I read your call for applications with great interest" },
          { de: "ich bewerbe mich um …", tr: "…'e başvuruyorum", en: "I am applying for …" },
          { de: "mein Studienvorhaben besteht darin, …", tr: "öğrenim planım şudur: …", en: "my study plan is to …" },
          { de: "wie Sie meinen Unterlagen entnehmen können", tr: "belgelerimden görebileceğiniz üzere", en: "as you can see from my documents" },
          { de: "meine Kenntnisse habe ich durch … nachgewiesen", tr: "bilgimi … ile belgeledim", en: "I have proven my skills through …" },
          { de: "darüber hinaus", tr: "bunun ötesinde", en: "furthermore" },
          { de: "ich bin gern bereit, …", tr: "…'e memnuniyetle hazırım", en: "I am happy to …" },
          { de: "für ein persönliches Gespräch stehe ich jederzeit zur Verfügung", tr: "kişisel bir görüşme için her zaman hazırım", en: "I am available at any time for a personal meeting" },
          { de: "über eine positive Rückmeldung würde ich mich sehr freuen", tr: "olumlu bir dönüş beni çok sevindirir", en: "I would be very pleased to receive a positive reply" },
        ],
        sample: "Sehr geehrte Damen und Herren,\n\nmit großem Interesse habe ich Ihre Ausschreibung gelesen und bewerbe mich hiermit um eines der Teilstipendien für ein Austauschsemester zum kommenden Wintersemester.\n\nIch studiere im fünften Semester Wirtschaftsinformatik an der Universität Istanbul und beschäftige mich in meiner Studienarbeit mit dem Einsatz künstlicher Intelligenz in der öffentlichen Verwaltung. Mein Studienvorhaben besteht darin, an der Universität Leipzig die dort angebotenen Module zur Datenethik zu belegen – ein Schwerpunkt, den es in dieser Form an meiner Heimatuniversität nicht gibt. Ein Semester in Deutschland würde daher nicht nur wesentlich zur Vertiefung meiner sprachlichen Kompetenzen beitragen, sondern meinem Studienprofil eine fachliche Richtung geben, die mir sonst verschlossen bliebe.\n\nMeine Deutschkenntnisse habe ich zuletzt durch ein Sprachzertifikat auf dem Niveau B2 mit der Note „sehr gut“ nachgewiesen; derzeit bereite ich mich auf die C1-Prüfung vor. Darüber hinaus bringe ich Erfahrung in der Beratung mit: Seit zwei Jahren betreue ich an meiner Fakultät Erstsemester als Mentorin. Umso mehr freue ich mich auf die Möglichkeit, nach meiner Rückkehr ehrenamtlich in der Studienberatung Ihrer Stiftung mitzuwirken und meine Erfahrungen an künftige Bewerberinnen und Bewerber weiterzugeben.\n\nFür ein persönliches Gespräch stehe ich jederzeit zur Verfügung. Über eine positive Rückmeldung würde ich mich sehr freuen.\n\nMit freundlichen Grüßen\nZeynep Kaya",
      },
    ],
  },
  {
    id: "c1-w5",
    level: "C1",
    skill: "writing",
    title: "Ein Angebot schreiben",
    genre: "İş yazışması",
    intro:
      "Serbest çalışan olarak teklif yazmak: fiyatı savunmak değil, kapsamı tanımlamak. Asıl beceri neyin dahil olmadığını yazmaktır.",
    gloss: [
      { de: "das Angebot", tr: "teklif", en: "offer" },
      { de: "der Leistungsumfang", tr: "hizmet kapsamı", en: "scope of services" },
      { de: "die Korrekturschleife", tr: "düzeltme turu", en: "revision round" },
      { de: "die Nutzungsrechte", tr: "kullanım hakları", en: "usage rights" },
      { de: "die Gültigkeit", tr: "geçerlilik", en: "validity" },
      { de: "zuzüglich", tr: "hariç", en: "plus" },
      { de: "der Zeitplan", tr: "zaman planı", en: "schedule" },
      { de: "die Mitwirkung", tr: "iş birliği", en: "cooperation" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Teklif iki revizyon turunu kapsar.",
        answer: "Das Angebot umfasst zwei Korrekturschleifen.",
        hint: "„umfassen“ Akkusativ ister; kapsamı tanımlayan standart fiil.",
      },
      {
        kind: "build",
        tr: "Fiyatlara KDV dahil değildir.",
        answer: "Die Preise verstehen sich zuzüglich Mehrwertsteuer.",
        hint: "„sich verstehen zuzüglich“ ticari yazışmanın kalıbıdır.",
      },
      {
        kind: "build",
        tr: "Bu teklif dört hafta geçerlidir.",
        answer: "Dieses Angebot ist vier Wochen gültig.",
        hint: "Süre Akkusativ olarak verilir: vier Wochen.",
      },
      {
        kind: "free",
        prompt:
          "Bir müşteriye teklif yaz (çeviri, tasarım, danışmanlık — kendin seç). Altı noktaya değin: neyi kapsadığı, neyi kapsamadığı, zaman planı ve müşterinin ne zaman ne yapması gerektiği, fiyat ve ödeme koşulları, kullanım hakları, teklifin geçerlilik süresi. Fiyatı savunma; kapsamı tanımla.",
        checklist: [
          "Kapsamı somut kalemlerle yazdın mı?",
          "Kapsam dışını açıkça belirttin mi?",
          "Müşteriden beklenen katkıyı (tarih dahil) yazdın mı?",
          "Ödeme koşulları ve KDV net mi?",
          "Kullanım haklarını tanımladın mı?",
          "Geçerlilik süresi var mı?",
        ],
        minWords: 150,
        phrases: [
          { de: "vielen Dank für Ihre Anfrage vom …", tr: "… tarihli talebiniz için çok teşekkür ederim", en: "thank you very much for your inquiry of …" },
          { de: "Das Angebot umfasst: …", tr: "Teklif şunları kapsıyor: …", en: "The offer includes: …" },
          { de: "Nicht enthalten sind …", tr: "Şunlar dahil değil: …", en: "Not included are …" },
          { de: "Voraussetzung für den Zeitplan ist, dass …", tr: "Zaman planının koşulu şudur: …", en: "The condition for the schedule is that …" },
          { de: "Die Preise verstehen sich zuzüglich …", tr: "Fiyatlara … dahil değildir.", en: "The prices are exclusive of …" },
          { de: "Dieses Angebot ist … gültig.", tr: "Bu teklif … geçerlidir.", en: "This offer is valid for …" },
        ],
        sample:
          "Sehr geehrte Frau Lorenz,\n\nvielen Dank für Ihre Anfrage vom 12. April. Gern unterbreite ich Ihnen folgendes Angebot.\n\nLeistungsumfang: Übersetzung Ihres Geschäftsberichts (ca. 78 Normseiten) aus dem Deutschen ins Türkische, einschließlich Terminologieliste und zwei Korrekturschleifen nach Ihrer Rückmeldung.\n\nNicht enthalten sind: Satz und Layout, die Übersetzung der Grafiken sowie kurzfristige Ergänzungen nach Abgabe. Diese rechne ich nach Aufwand ab (75 Euro pro Stunde).\n\nZeitplan: Lieferung sechs Wochen nach Auftragserteilung. Voraussetzung dafür ist, dass mir die finale Fassung bis zum 2. Mai vorliegt und Rückfragen innerhalb von drei Arbeitstagen beantwortet werden. Bei späterem Erhalt verschiebt sich der Termin entsprechend.\n\nHonorar: 26 Euro pro Normseite, insgesamt rund 2.030 Euro. Die Preise verstehen sich zuzüglich Mehrwertsteuer. Zahlbar sind 50 Prozent bei Auftragserteilung, der Rest 14 Tage nach Lieferung.\n\nNutzungsrechte: Sie erhalten das unbeschränkte Recht zur Nutzung der Übersetzung für Ihre Unternehmenskommunikation. Eine Weitergabe an Dritte zur Weiterverwertung ist gesondert zu vereinbaren.\n\nDieses Angebot ist vier Wochen gültig. Für Rückfragen stehe ich Ihnen gern zur Verfügung.\n\nMit freundlichen Grüßen\nMiriam Falk",
      },
    ],
  },
  {
    id: "c1-w6",
    level: "C1",
    skill: "writing",
    title: "Stellungnahme mit Daten",
    genre: "Sınav formatı",
    intro:
      "C1 yazma görevinin en zoru: bir veriyi doğru okuyup üzerine görüş kurmak. Veriyi abartmadan, ama arkasına da saklanmadan.",
    gloss: [
      { de: "die Erhebung", tr: "araştırma", en: "survey" },
      { de: "der Anteil", tr: "pay", en: "share" },
      { de: "hervorgehen aus", tr: "anlaşılmak", en: "to emerge" },
      { de: "relativieren", tr: "göreceleştirmek", en: "to put into perspective" },
      { de: "die Aussagekraft", tr: "açıklayıcı güç", en: "informative value" },
      { de: "zurückhaltend", tr: "temkinli", en: "cautious" },
      { de: "die Schlussfolgerung", tr: "çıkarım", en: "conclusion" },
      { de: "überinterpretieren", tr: "aşırı yorumlamak", en: "to overinterpret" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Araştırmadan, oranın %31'e yükseldiği anlaşılıyor.",
        answer: "Aus der Erhebung geht hervor, dass der Anteil auf 31 Prozent gestiegen ist.",
        hint: "„hervorgehen aus“ + dass yan cümlesi; fiil sonda.",
      },
      {
        kind: "build",
        tr: "Bu rakam ilk bakışta göründüğünden daha az şey söylüyor.",
        answer: "Diese Zahl sagt weniger aus, als es auf den ersten Blick scheint.",
        hint: "„als“ karşılaştırma cümlesinde fiil sonda.",
      },
      {
        kind: "build",
        tr: "Buna rağmen eğilim göz ardı edilemez.",
        answer: "Dennoch lässt sich die Tendenz nicht ignorieren.",
        hint: "„sich lassen“ + mastar; „dennoch“ başta olunca fiil ikinci sırada.",
      },
      {
        kind: "free",
        prompt:
          "Şu veriye dayanarak bir görüş yazısı yaz: „Bir ülkede 18–29 yaş arasında haberden aktif olarak kaçınanların oranı on yılda %16'dan %31'e çıktı. Aynı dönemde bu grubun sosyal medyada haber tüketimi iki katına çıktı.“ Beş noktaya değin: veriyi doğru aktar, en az bir alternatif açıklama sun, verinin ne söylemediğini belirt, kendi değerlendirmen, somut bir öneri.",
        checklist: [
          "Veriyi çarpıtmadan aktardın mı?",
          "En az bir alternatif açıklama sundun mu?",
          "Verinin sınırını (ne söylemediğini) yazdın mı?",
          "Kendi değerlendirmen veriden ayırt edilebiliyor mu?",
          "Önerin veriden çıkıyor mu?",
          "Aşırı yorumdan kaçındın mı?",
        ],
        minWords: 180,
        phrases: [
          { de: "Aus der Erhebung geht hervor, dass …", tr: "Araştırmadan … olduğu anlaşılıyor.", en: "It emerges from the survey that …" },
          { de: "Bemerkenswert ist dabei weniger …, sondern …", tr: "Burada dikkat çekici olan … değil, …", en: "What is remarkable here is not so much …, but …" },
          { de: "Denkbar wäre allerdings auch, dass …", tr: "Ancak … olması da düşünülebilir.", en: "It would also be conceivable that …" },
          { de: "Was die Zahlen nicht zeigen, ist …", tr: "Rakamların göstermediği şey …", en: "What the figures do not show is …" },
          { de: "Ich halte es daher für verfehlt, …", tr: "Bu nedenle …'i yanlış buluyorum.", en: "I therefore consider it mistaken to …" },
          { de: "Sinnvoller erscheint mir …", tr: "Bana daha anlamlı görünen …", en: "It seems more sensible to me …" },
        ],
        sample:
          "Aus der Erhebung geht hervor, dass der Anteil junger Erwachsener, die Nachrichten aktiv meiden, binnen zehn Jahren von 16 auf 31 Prozent gestiegen ist. Bemerkenswert ist dabei weniger die Höhe als die Gleichzeitigkeit: Im selben Zeitraum hat sich der Nachrichtenkonsum dieser Gruppe über soziale Medien verdoppelt.\n\nDie naheliegende Deutung — junge Menschen interessierten sich nicht mehr für Politik — lässt sich damit kaum halten. Wer Nachrichten meidet und gleichzeitig doppelt so viele über andere Kanäle aufnimmt, wendet sich nicht vom Thema ab, sondern vom Format.\n\nDenkbar wäre allerdings auch, dass sich schlicht die Definition verschoben hat. Wer Inhalte auf einer Plattform sieht, bezeichnet das möglicherweise selbst nicht als „Nachrichten“ und antwortet im Fragebogen entsprechend. Ein Teil des Anstiegs könnte damit ein Messeffekt sein.\n\nWas die Zahlen nicht zeigen, ist die Richtung. Sie sagen nichts darüber, ob das Format die Abwendung verursacht oder ob Menschen, die sich ohnehin belastet fühlen, das kürzere Format wählen.\n\nIch halte es daher für verfehlt, aus diesen Daten eine Krise des Journalismus abzuleiten — und ebenso verfehlt, sie zu beruhigen. Sinnvoller erscheint mir, die Erhebung um eine einfache Frage zu erweitern: Was genau meiden die Befragten? Solange wir das nicht wissen, diskutieren wir über eine Zahl, deren Gegenstand unklar ist.",
      },
    ],
  },
  {
    id: "c1-w7",
    level: "C1",
    skill: "writing",
    title: "Eine Rezension schreiben",
    genre: "Eleştiri",
    intro:
      "Eleştiri, beğeni bildirmek değildir: bir ölçüt kurup metni ona göre tartmaktır. Ölçütünü görünür kılacaksın.",
    gloss: [
      { de: "die Rezension", tr: "eleştiri yazısı", en: "review" },
      { de: "der Maßstab", tr: "ölçüt", en: "standard" },
      { de: "die Erzählperspektive", tr: "anlatı bakış açısı", en: "narrative perspective" },
      { de: "der Aufbau", tr: "yapı", en: "structure" },
      { de: "überzeugen", tr: "ikna etmek", en: "to convince" },
      { de: "die Schwäche", tr: "zayıflık", en: "weakness" },
      { de: "streckenweise", tr: "yer yer", en: "in places" },
      { de: "das Urteil", tr: "hüküm", en: "verdict" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kitap kendine yüksek bir ölçüt koyuyor.",
        answer: "Das Buch legt sich selbst einen hohen Maßstab an.",
        hint: "„sich einen Maßstab anlegen“ — refleksif Dativ.",
      },
      {
        kind: "build",
        tr: "Anlatıcı bakışı yer yer tutarsız.",
        answer: "Die Erzählperspektive ist streckenweise inkonsequent.",
        hint: "„streckenweise“ eleştiri dilinin sık kullandığı zarftır.",
      },
      {
        kind: "build",
        tr: "Bu itiraza rağmen kitabı öneriyorum.",
        answer: "Trotz dieses Einwands empfehle ich das Buch.",
        hint: "„trotz“ + Genitiv; başta olunca fiil ikinci sırada.",
      },
      {
        kind: "free",
        prompt:
          "Okuduğun bir kitap, izlediğin bir film ya da dizi hakkında eleştiri yaz. Beş noktaya değin: eserin ne yapmaya çalıştığı (ölçütün), bunu nerede başardığı, nerede başaramadığı — somut bir örnekle, kimin için olduğu, kendi hükmün. Özet yazma; hüküm ile gerekçe arasında bağ kur.",
        checklist: [
          "Ölçütünü görünür kıldın mı (eser ne yapmaya çalışıyor)?",
          "En az bir somut örnek verdin mi?",
          "Zayıf yönü de yazdın mı?",
          "Kimin için olduğunu söyledin mi?",
          "Hüküm gerekçelerden çıkıyor mu?",
          "Olay örgüsünü ele vermekten kaçındın mı?",
        ],
        minWords: 170,
        phrases: [
          { de: "… will mehr sein als …", tr: "… şundan fazlası olmak istiyor: …", en: "… wants to be more than …" },
          { de: "Das gelingt vor allem dort, wo …", tr: "Bu özellikle … olduğu yerde başarılı oluyor.", en: "This succeeds above all where …" },
          { de: "Schwächer wird der Text, sobald …", tr: "Metin … olduğu anda zayıflıyor.", en: "The text becomes weaker as soon as …" },
          { de: "Ein Beispiel: …", tr: "Bir örnek: …", en: "One example: …" },
          { de: "Wer … erwartet, wird enttäuscht.", tr: "… bekleyen hayal kırıklığına uğrar.", en: "Anyone who expects … will be disappointed." },
          { de: "Trotz dieses Einwands …", tr: "Bu itiraza rağmen …", en: "Despite this objection …" },
        ],
        sample:
          "Dieser Roman will mehr sein als eine Familiengeschichte: Er will zeigen, wie politische Gewalt in eine Sprache eindringt, die davon gar nicht sprechen will. An diesem Maßstab muss er sich messen lassen.\n\nDas gelingt vor allem dort, wo die Erzählerin schweigt. Die stärksten Passagen sind die, in denen zwei Figuren über etwas völlig Nebensächliches reden — über eine kaputte Waschmaschine, über den Preis von Tomaten — und der Leser mitliest, was nicht gesagt wird. Ein Beispiel: das Kapitel, in dem der Vater dreimal denselben Satz über den Weg zur Arbeit sagt. Nach dem dritten Mal ist klar, worüber er nicht spricht, ohne dass es je benannt wird.\n\nSchwächer wird der Text, sobald er dem eigenen Verfahren misstraut. Im letzten Drittel erklärt eine Nebenfigur auf zwei Seiten, was der Roman zuvor über zweihundert Seiten gezeigt hat. Die Erzählperspektive ist hier streckenweise inkonsequent — plötzlich weiß die Erzählerin Dinge, die sie vorher nicht wissen konnte.\n\nWer eine klare Auflösung erwartet, wird enttäuscht; das Buch verweigert sie bewusst und, wie ich finde, zu Recht.\n\nTrotz dieses Einwands empfehle ich den Roman — vor allem jenen, die glauben, über dieses Thema sei alles gesagt. Es ist nicht alles gesagt. Es ist nur meistens zu laut gesagt worden.",
      },
    ],
  },
  {
    id: "c1-w8",
    level: "C1",
    skill: "writing",
    title: "Die Dankesrede",
    genre: "Konuşma metni",
    intro:
      "Hikâyenin son parçası: Miriam'ın yerine geçip ödül konuşmasını yazacaksın. C1'de asıl sınav, teşekkürün içine bir düşünce ve bir risk koymaktır.",
    gloss: [
      { de: "die Dankesrede", tr: "teşekkür konuşması", en: "acceptance speech" },
      { de: "die Selbstgerechtigkeit", tr: "kendini haklı görme", en: "self-righteousness" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "verschweigen", tr: "gizlemek", en: "to conceal" },
      { de: "sich rechtfertigen", tr: "kendini haklı çıkarmak", en: "to justify oneself" },
      { de: "der Anlass", tr: "vesile", en: "occasion" },
      { de: "widmen", tr: "ithaf etmek", en: "to dedicate" },
      { de: "beharren auf", tr: "ısrar etmek", en: "to insist" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bir ödül, bunu susmak için en kötü andır.",
        answer: "Ein Preis ist der schlechteste Moment, um so etwas zu verschweigen.",
        hint: "„um … zu“ mastar cümlesi.",
      },
      {
        kind: "build",
        tr: "Eleştirinin bir kısmı haklıydı, bir kısmı değil.",
        answer: "Ein Teil der Kritik war berechtigt, ein Teil nicht.",
        hint: "İkinci bölümde fiil tekrar edilmez — konuşma dilinde doğal olan budur.",
      },
      {
        kind: "build",
        tr: "Bu ödülü, bugün burada olamayan birine ithaf ediyorum.",
        answer: "Ich widme diesen Preis jemandem, der heute nicht hier sein kann.",
        hint: "„widmen“ Dativ ister: jemandem.",
      },
      {
        kind: "free",
        prompt:
          "Bir ödül, mezuniyet ya da veda konuşması yaz (konuyu kendin seç). Beş noktaya değin: neden bu konuşmanın kolay olmadığı, hakkını teslim ettiğin bir eleştiri, ısrar ettiğin bir nokta, konuyu kendinden büyük bir şeye bağlaman, bir kişiye teşekkür. Kendini haklı çıkarma; ama her şeye de boyun eğme.",
        checklist: [
          "Konuşma bir zorlukla açılıyor mu (klişe teşekkürle değil)?",
          "Gerçekten bir şeyi kabul ettin mi?",
          "Bir noktada ısrar ettin mi?",
          "Konu kendinden büyük bir şeye bağlandı mı?",
          "Somut bir kişiye teşekkür var mı?",
          "Ton ölçülü mü (ne mağdur ne kibirli)?",
        ],
        minWords: 170,
        phrases: [
          { de: "Ich habe lange überlegt, ob …", tr: "… olup olmadığını uzun süre düşündüm.", en: "I thought for a long time about whether …" },
          { de: "Ein Teil der Kritik war berechtigt.", tr: "Eleştirinin bir kısmı haklıydı.", en: "Part of the criticism was justified." },
          { de: "Daran halte ich fest.", tr: "Bunda ısrarlıyım.", en: "I stand by that." },
          { de: "Es geht dabei nicht um mich, sondern um …", tr: "Burada mesele ben değilim, …", en: "This is not about me, but about …" },
          { de: "Ich danke … dafür, dass …", tr: "…'e … için teşekkür ederim.", en: "I thank … for …" },
          { de: "Ich widme diesen Preis …", tr: "Bu ödülü …'e ithaf ediyorum.", en: "I dedicate this prize to …" },
        ],
        sample:
          "Vielen Dank. Ich habe lange überlegt, ob ich diesen Preis annehmen kann, und ich möchte offen sagen, warum.\n\nVor einem Jahr wurde öffentlich bestritten, dass ich dieses Buch übersetzen durfte. Ein Teil der Kritik war berechtigt, ein Teil nicht. Wenn ich heute nur den unberechtigten Teil erwähne, mache ich es mir zu leicht — und ein Preis ist der schlechteste Moment, um so etwas zu verschweigen.\n\nBerechtigt war: Ich habe an drei Stellen geglättet, weil ich den Leserinnen weniger zugetraut habe, als sie verdienen. Das ist kein Fehler des Könnens, sondern der Vorsicht. Er ist korrigiert, die Liste ist veröffentlicht.\n\nUnberechtigt war der Satz, wer bestimmte Erfahrungen nicht gemacht habe, solle schweigen. Daran halte ich fest: Übersetzung ist keine Vertretung. Sie macht jemanden hörbar, der sonst nicht gehört würde, und sie ist dabei immer ein Eingriff. Wer das nicht aushält, sollte nicht übersetzen — wer es nicht bemerkt, erst recht nicht.\n\nEs geht dabei nicht um mich, sondern um die Frage, welche Bücher überhaupt bei uns ankommen. In diesem Jahr sind aus dem gesamten arabischen Sprachraum weniger Romane erschienen als aus Schweden.\n\nIch danke der Jury dafür, dass sie ein umstrittenes Buch ausgezeichnet hat. Und ich widme diesen Preis der Autorin, die 2019 gestorben ist. Er gehört ihr. Ich habe ihn nur ins Deutsche gebracht.",
      },
    ],
  },
];
